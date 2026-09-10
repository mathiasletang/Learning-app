/* =========================================================================
   Actions de progression — écrivent dans IndexedDB ET mettent à jour la
   gamification (XP, série, badges). Couche « app » : peut dépendre du core
   et du store (le core reste pur).
   ========================================================================= */

import { db, getPrefs } from '@/core/db';
import { driveSearchUrl, localPdfUrl } from '@/core/config';
import {
  coursDepuisTexte,
  refusDeCalendrier,
  EDT_FRAICHEUR_MS,
  EDT_URL,
  type OrigineEdt,
} from '@/core/edt';
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
import { elapsedMinutes, isStudy, nextOccurrence, subjectMeta } from '@/core/planning';
import type {
  Question,
  QcmMode,
  QcmSession,
  Flashcard,
  Note,
  BankId,
  PlanEvent,
  Task,
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
  await app().registerWordsDone(1);
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
 * Ouvre une ressource, dans l'ordre de préférence :
 *   1. une vraie URL (http/https) → telle quelle ;
 *   2. un PDF hébergé par l'application (public/cours/) → ouverture directe ;
 *   3. sinon → recherche dans le dossier Google Drive de l'utilisateur.
 */
export function openResource(path: string): void {
  if (/^https?:\/\//i.test(path)) {
    window.open(path, '_blank', 'noopener');
    return;
  }
  const local = localPdfUrl(path);
  if (local) {
    window.open(local, '_blank', 'noopener');
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

/* ------------------------- Planning et tâches --------------------------- */

/**
 * Le planning et la liste de tâches sont un seul système vu de deux côtés :
 * une tâche devient une séance, et terminer la séance clôt la tâche. Toutes
 * les écritures passent par ici pour que ce lien ne se défasse jamais.
 */

const uid = (p: string) => `${p}:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export async function createTask(input: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  const task: Task = { ...input, id: uid('t'), createdAt: new Date().toISOString() };
  await db.tasks.put(task);
  return task;
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<void> {
  const current = await db.tasks.get(id);
  if (current) await db.tasks.put({ ...current, ...patch, id });
}

export async function deleteTask(id: string): Promise<void> {
  await db.tasks.delete(id);
  // La séance survit à sa tâche, mais cesse de s'y référer.
  const linked = await db.events.where('taskId').equals(id).toArray();
  await Promise.all(linked.map((e) => db.events.put({ ...e, taskId: undefined })));
}

/**
 * Cocher une tâche. Une tâche récurrente cochée fait naître son occurrence
 * suivante — on ne perd jamais le rendez-vous, et rien n'est supprimé.
 */
export async function toggleTask(task: Task): Promise<void> {
  const done = !task.doneAt;
  await db.tasks.put({ ...task, doneAt: done ? new Date().toISOString() : undefined });
  if (!done) return;

  const suivante = nextOccurrence(task);
  if (suivante) {
    await createTask({
      title: task.title,
      note: task.note,
      priority: task.priority,
      due: suivante,
      subject: task.subject,
      minutes: task.minutes,
      repeat: task.repeat,
    });
  }
  await app().registerActivity();
}

/** Reporter une tâche — jamais la supprimer parce qu'elle a pris du retard. */
export async function rescheduleTask(id: string, due: string): Promise<void> {
  await updateTask(id, { due });
}

export async function createEvent(input: Omit<PlanEvent, 'id' | 'createdAt'>): Promise<PlanEvent> {
  const event: PlanEvent = { ...input, id: uid('e'), createdAt: new Date().toISOString() };
  await db.events.put(event);
  return event;
}

export async function updateEvent(id: string, patch: Partial<PlanEvent>): Promise<void> {
  const current = await db.events.get(id);
  if (current) await db.events.put({ ...current, ...patch, id });
}

export async function deleteEvent(id: string): Promise<void> {
  await db.events.delete(id);
}

/** Placer une tâche dans la journée : la séance garde le lien vers la tâche. */
export async function scheduleTask(
  task: Task,
  date: string,
  start: string,
  minutes?: number,
): Promise<PlanEvent> {
  return createEvent({
    date,
    start,
    minutes: minutes ?? task.minutes ?? 60,
    title: task.title,
    subject: task.subject,
    taskId: task.id,
  });
}

/** Lancer une séance : c'est le départ du chronomètre, rien de plus. */
export async function startEvent(id: string): Promise<void> {
  await updateEvent(id, { startedAt: new Date().toISOString() });
}

/**
 * Terminer une séance. Le temps retenu est celui réellement passé quand la
 * séance a été lancée, sinon la durée prévue — dans les deux cas il rejoint
 * db.timeLogs, le même relevé que celui du Suivi. La tâche d'origine, s'il y
 * en a une, est cochée par la même occasion.
 */
export async function completeEvent(event: PlanEvent): Promise<number> {
  if (event.doneAt) return 0;
  const mesure = event.startedAt ? elapsedMinutes(event.startedAt) : 0;
  // Une séance oubliée ouverte toute la nuit ne vaut pas huit heures d'étude.
  const minutes = Math.max(1, Math.min(mesure > 0 ? mesure : event.minutes, 4 * 60));

  await db.events.put({ ...event, doneAt: new Date().toISOString(), doneMinutes: minutes });
  /* Un rendez-vous chez le médecin n'est pas du temps d'étude : seules les
     matières alimentent le relevé, sinon le chiffre ne veut plus rien dire. */
  if (isStudy(event.subject)) {
    await logTime(event.date, subjectMeta(event.subject).timeSubject, minutes);
  }

  if (event.taskId) {
    const task = await db.tasks.get(event.taskId);
    if (task && !task.doneAt) await toggleTask(task);
  }
  await app().registerActivity();
  await app().refreshBadges();
  return minutes;
}

/** Rouvrir une séance cochée par erreur — le temps déjà compté reste acquis. */
export async function reopenEvent(id: string): Promise<void> {
  await updateEvent(id, { doneAt: undefined, startedAt: undefined });
}

/* ---------------------------- Emploi du temps ---------------------------- */

export interface ResultatSynchro {
  ok: boolean;
  /** Nombre de cours lus — présent seulement en cas de succès. */
  cours?: number;
  erreur?: string;
}

/**
 * Écrit un calendrier en base, quelle que soit sa provenance.
 *
 * Remplacement en bloc, dans une transaction : une salle qui change, un cours
 * annulé, un rattrapage ajouté doivent disparaître ou apparaître, et fusionner
 * ligne à ligne laisserait les annulations à l'écran pour toujours.
 *
 * Rien n'est écrit tant que le texte n'a pas été jugé recevable : un fichier
 * qui n'est pas un calendrier, ou un calendrier sans le moindre cours, laisse
 * l'emploi du temps en place. Le remplacer par zéro cours serait pire que ne
 * rien faire.
 */
async function enregistreEdt(
  texte: string,
  origine: OrigineEdt,
  fichier?: string,
): Promise<ResultatSynchro> {
  const cours = coursDepuisTexte(texte);
  const refus = refusDeCalendrier(texte, cours);
  if (refus) {
    await app().patchPrefs({ edtSyncError: refus });
    return { ok: false, erreur: refus };
  }

  await db.transaction('rw', db.edt, async () => {
    await db.edt.clear();
    await db.edt.bulkPut(cours);
  });
  await app().patchPrefs({
    edtSyncedAt: new Date().toISOString(),
    edtSyncError: undefined,
    edtOrigine: origine,
    edtFichier: origine === 'fichier' ? fichier : undefined,
  });
  return { ok: true, cours: cours.length };
}

/**
 * Le contenu d'un fichier, en texte.
 *
 * `File.text()` ferait la même chose en une ligne, mais il manque aux Safari
 * antérieurs à 14 — donc à un iPhone qui n'a pas été mis à jour — et à jsdom,
 * où tournent les tests. `FileReader` est là depuis toujours.
 */
function texteDuFichier(fichier: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const lecteur = new FileReader();
    lecteur.onload = () => resolve(String(lecteur.result ?? ''));
    lecteur.onerror = () => reject(new Error('fichier illisible'));
    lecteur.readAsText(fichier);
  });
}

/**
 * Importe un fichier `.ics` choisi par l'utilisateur.
 *
 * C'est la voie principale, et la seule qui ne dépende de rien : ni du
 * serveur d'ADE, ni d'un relais, ni même d'une connexion. Le fichier
 * s'obtient depuis ADE — « Exporter » sur son planning — ou depuis n'importe
 * quel agenda qui sait produire un iCalendar.
 */
export async function importerEdt(fichier: File): Promise<ResultatSynchro> {
  try {
    return await enregistreEdt(await texteDuFichier(fichier), 'fichier', fichier.name);
  } catch (e) {
    const erreur = e instanceof Error ? e.message : 'fichier illisible';
    await app().patchPrefs({ edtSyncError: erreur });
    return { ok: false, erreur };
  }
}

/**
 * Relit l'emploi du temps sur le réseau, si le relais du site répond.
 *
 * Un échec ne détruit rien : les cours déjà en base restent affichés — c'est
 * tout l'intérêt de les avoir enregistrés plutôt que de les relire à chaque
 * ouverture. La fonction Netlify renvoie sa raison en clair dans le corps de
 * la réponse ; on la reprend telle quelle, faute de quoi il ne resterait que
 * « Failed to fetch », qui ne se diagnostique pas.
 */
export async function syncEdt(force = false): Promise<ResultatSynchro> {
  const prefs = await getPrefs();
  if (!force && prefs.edtSyncedAt) {
    const age = Date.now() - Date.parse(prefs.edtSyncedAt);
    if (age >= 0 && age < EDT_FRAICHEUR_MS) return { ok: true };
  }

  try {
    const reponse = await fetch(EDT_URL, { cache: 'no-store' });
    const texte = await reponse.text();
    if (!reponse.ok) {
      throw new Error(texte.trim().slice(0, 160) || `réponse ${reponse.status}`);
    }
    return await enregistreEdt(texte, 'reseau');
  } catch (e) {
    /* « Failed to fetch » : la requête n'a même pas abouti (relais absent,
       hors ligne). Le dire en français, avec la porte de sortie. */
    const erreur =
      e instanceof TypeError
        ? "le relais réseau n'a pas répondu — importez le fichier .ics"
        : e instanceof Error
          ? e.message
          : 'échec de la lecture';
    await app().patchPrefs({ edtSyncError: erreur });
    return { ok: false, erreur };
  }
}
