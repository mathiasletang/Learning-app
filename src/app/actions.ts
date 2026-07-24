/* =========================================================================
   Actions de progression — écrivent dans IndexedDB ET mettent à jour la
   gamification (XP, série, badges). Couche « app » : peut dépendre du core
   et du store (le core reste pur).
   ========================================================================= */

import { db } from '@/core/db';
import { driveSearchUrl } from '@/core/config';
import { toDayStr } from '@/core/date';
import { schedule, initialSrs, type Grade } from '@/core/srs';
import {
  xpForCorrect,
  xpForReview,
  xpForMinutes,
  XP_STEP,
  XP_DOC,
  XP_NOTE,
} from '@/core/gamification';
import type {
  Question,
  QcmMode,
  QcmSession,
  Flashcard,
  Note,
  BankId,
} from '@/core/types';
import { useApp } from './store';

const app = () => useApp.getState();

/* --------------------------------- QCM ---------------------------------- */

export interface AnswerEntry {
  q: Question;
  correct: boolean;
}

/**
 * Finalise une session QCM : écrit les résultats, la session, attribue l'XP
 * (en un seul lot), fait progresser l'objectif du jour et recalcule les badges.
 * Retourne l'XP gagné (pour l'affichage des résultats).
 */
export async function finalizeQcm(
  bank: BankId,
  theme: string | null,
  mode: QcmMode,
  answers: AnswerEntry[],
  durationSec: number,
): Promise<number> {
  const now = new Date().toISOString();
  await db.qcmResults.bulkPut(
    answers.map((a) => ({ qid: a.q.id, status: (a.correct ? 1 : 2) as 1 | 2, at: now })),
  );

  const score = answers.filter((a) => a.correct).length;
  const xp = answers.reduce((n, a) => (a.correct ? n + xpForCorrect(a.q.difficulty, mode) : n), 0);

  await db.qcmSessions.add({
    date: toDayStr(),
    bank,
    theme,
    mode,
    score,
    total: answers.length,
    durationSec,
  } as QcmSession);

  if (xp > 0) await app().addXp(xp);
  await app().registerQuestionsDone(answers.length);
  await app().refreshBadges();
  return xp;
}

/** Ids des questions déjà ratées (statut 2) — pour le mode révision. */
export async function failedQuestionIds(): Promise<Set<string>> {
  const rows = await db.qcmResults.where('status').equals(2).toArray();
  return new Set(rows.map((r) => r.qid));
}

/* ------------------------------ Flashcards ------------------------------ */

function correctText(q: Question): string {
  return q.options[q.answer] ?? '';
}

/** Convertit des questions ratées en flashcards (dédupliquées par qid). */
export async function createFlashcardsFromQuestions(questions: Question[]): Promise<number> {
  const now = new Date().toISOString();
  const today = toDayStr();
  let created = 0;
  for (const q of questions) {
    const id = `fc:${q.id}`;
    const existing = await db.flashcards.get(id);
    if (existing) continue;
    const card: Flashcard = {
      id,
      front: q.question,
      back: correctText(q),
      expl: q.explanation,
      bank: q.bank,
      createdAt: now,
      ...initialSrs(today),
    };
    await db.flashcards.put(card);
    created++;
  }
  await app().refreshBadges();
  return created;
}

export async function createManualFlashcard(front: string, back: string, bank?: BankId): Promise<void> {
  const today = toDayStr();
  const id = `fc:manual:${Date.now()}`;
  await db.flashcards.put({
    id,
    front,
    back,
    bank: bank ?? 'manual',
    createdAt: new Date().toISOString(),
    ...initialSrs(today),
  });
  await app().refreshBadges();
}

export async function reviewFlashcard(card: Flashcard, grade: Grade): Promise<void> {
  const today = toDayStr();
  const next = schedule(card, grade, today);
  await db.flashcards.put({ ...card, ...next });
  await app().incReviews(1);
  const xp = xpForReview(grade);
  if (xp > 0) await app().addXp(xp);
  else await app().registerActivity();
}

export async function deleteFlashcard(id: string): Promise<void> {
  await db.flashcards.delete(id);
}

/* ------------------------------ Vocabulaire ----------------------------- */

export async function reviewVocab(id: string, grade: Grade): Promise<void> {
  const today = toDayStr();
  const current = (await db.vocabSrs.get(id)) ?? { id, ...initialSrs(today) };
  const next = schedule(current, grade, today);
  await db.vocabSrs.put({ id, ...next });
  await app().incReviews(1);
  const xp = xpForReview(grade);
  if (xp > 0) await app().addXp(xp);
  else await app().registerActivity();
}

/* -------------------------------- Parcours ------------------------------ */

export async function setStepDone(stepId: string, done: boolean): Promise<void> {
  await db.steps.put({ stepId, done, at: done ? new Date().toISOString() : undefined });
  if (done) await app().addXp(XP_STEP);
  await app().refreshBadges();
}

/* ------------------------------ Bibliothèque ---------------------------- */

/**
 * Ouvre une ressource. Si c'est une vraie URL (http/https), on l'ouvre.
 * Sinon c'est un PDF de la bibliothèque : on lance une recherche dans le
 * dossier Google Drive de l'utilisateur, sur le nom du fichier.
 */
export function openResource(path: string): void {
  if (/^https?:\/\//i.test(path)) {
    window.open(path, '_blank', 'noopener');
    return;
  }
  const name = path.split('/').pop() ?? path;
  window.open(driveSearchUrl(name), '_blank', 'noopener');
}

export async function setDocRead(path: string, read: boolean): Promise<void> {
  const existing = await db.docs.get(path);
  const wasRead = existing?.read ?? false;
  await db.docs.put({ path, read, at: read ? new Date().toISOString() : undefined });
  if (read && !wasRead) await app().addXp(XP_DOC);
  await app().refreshBadges();
}

/* --------------------------------- Notes -------------------------------- */

export async function saveNote(note: Note): Promise<void> {
  const existing = await db.notes.get(note.id);
  await db.notes.put(note);
  if (!existing) {
    await app().addXp(XP_NOTE);
    await app().refreshBadges();
  }
}

export async function deleteNote(id: string): Promise<void> {
  await db.notes.delete(id);
}

/* --------------------------------- Temps -------------------------------- */

export async function logTime(date: string, subject: string, minutes: number): Promise<void> {
  if (minutes <= 0) return;
  await db.timeLogs.add({ date, subject, minutes });
  const xp = xpForMinutes(minutes);
  if (xp > 0) await app().addXp(xp);
}
