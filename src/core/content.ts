/* =========================================================================
   Chargement du contenu (data/*.json + cours/*.md) — Atelier

   Le contenu est fourni et EN LECTURE SEULE. Il est importé au build (bundle),
   donc disponible hors-ligne. La progression, elle, vit dans IndexedDB.
   ========================================================================= */

import qcmRaw from '@/content/qcm.json';
import vocabRaw from '@/content/vocabulaire.json';
import catalogueRaw from '@/content/catalogue.json';
import parcoursRaw from '@/content/parcours.json';

import type {
  QcmData,
  Question,
  BankId,
  VocabData,
  VocabCard,
  DeckId,
  RawCatalogue,
  LibDoc,
  ParcoursData,
  Course,
} from './types';
import {
  BANK_ORDER,
  themeLabel,
  folderTrack,
  folderLevel,
  sourceLabel,
  COURSE_FILE,
  COURSE_TITLE,
} from './meta';
import { estimateDifficulty } from './quiz';

/* --------------------------------- QCM ---------------------------------- */

const qcm = qcmRaw as QcmData;

let _questions: Question[] | null = null;

export function allQuestions(): Question[] {
  if (_questions) return _questions;
  const out: Question[] = [];
  for (const bank of BANK_ORDER) {
    const list = qcm[bank] ?? [];
    list.forEach((q, index) => {
      out.push({
        ...q,
        id: `${bank}:${q.theme}:${index}`,
        bank,
        index,
        difficulty: estimateDifficulty(q.question, q.options),
        themeLabel: themeLabel(bank, q.theme),
      });
    });
  }
  _questions = out;
  return out;
}

export function questionsByBank(bank: BankId): Question[] {
  return allQuestions().filter((q) => q.bank === bank);
}

export function questionById(id: string): Question | undefined {
  return allQuestions().find((q) => q.id === id);
}

export function bankCount(bank: BankId): number {
  return qcm[bank]?.length ?? 0;
}

/** Thèmes présents dans une banque, avec compte. */
export function themesOf(bank: BankId): { code: string; label: string; count: number }[] {
  const map = new Map<string, number>();
  for (const q of qcm[bank] ?? []) map.set(q.theme, (map.get(q.theme) ?? 0) + 1);
  return [...map.entries()].map(([code, count]) => ({
    code,
    label: themeLabel(bank, code),
    count,
  }));
}

/* ------------------------------ VOCABULAIRE ----------------------------- */

const vocab = vocabRaw as VocabData;

export function vocabDecks(): VocabData {
  return vocab;
}

export const DECK_ORDER: DeckId[] = ['finfr', 'verbs', 'nouns'];

let _vocabCards: VocabCard[] | null = null;

export function allVocabCards(): VocabCard[] {
  if (_vocabCards) return _vocabCards;
  const out: VocabCard[] = [];
  for (const deck of DECK_ORDER) {
    const d = vocab[deck];
    if (!d) continue;
    d.cards.forEach((c, index) => {
      out.push({ id: `v:${deck}:${index}`, deck, index, t: c.t, d: c.d });
    });
  }
  _vocabCards = out;
  return out;
}

export function vocabCardsOfDeck(deck: DeckId): VocabCard[] {
  return allVocabCards().filter((c) => c.deck === deck);
}

/* ------------------------------ BIBLIOTHÈQUE ---------------------------- */

const catalogue = catalogueRaw as RawCatalogue;

let _docs: LibDoc[] | null = null;

export function allDocs(): LibDoc[] {
  if (_docs) return _docs;
  const out: LibDoc[] = [];
  for (const [folder, files] of catalogue) {
    const track = folderTrack(folder);
    const level = folderLevel(folder);
    const source = sourceLabel(folder);
    for (const [name, pages] of files) {
      out.push({ path: `${folder}/${name}`, folder, name, pages, track, level, source });
    }
  }
  _docs = out;
  return out;
}

/** Documents d'un niveau donné (L3 / M1 / M2). */
export function docsByLevel(level: LibDoc['level']): LibDoc[] {
  return allDocs().filter((d) => d.level === level);
}

/** Compte par niveau, pour les onglets. */
export function levelCounts(): Record<LibDoc['level'], number> {
  const acc = { L3: 0, M1: 0, M2: 0 };
  for (const d of allDocs()) acc[d.level]++;
  return acc;
}

/** Regroupement par dossier source. */
export function docsByFolder(): { folder: string; docs: LibDoc[] }[] {
  const map = new Map<string, LibDoc[]>();
  for (const d of allDocs()) {
    const arr = map.get(d.folder) ?? [];
    arr.push(d);
    map.set(d.folder, arr);
  }
  return [...map.entries()].map(([folder, docs]) => ({ folder, docs }));
}

/* -------------------------------- PARCOURS ------------------------------ */

const parcours = parcoursRaw as ParcoursData;

export function getParcours(): ParcoursData {
  return parcours;
}

/** Tous les ids d'étapes d'un parcours (pour le calcul de progression). */
export function stepIdsOfTrack(track: keyof ParcoursData): string[] {
  const t = parcours[track];
  if (!t) return [];
  return t.phases.flatMap((p) => p.steps.map((s) => s.id));
}

/* --------------------------------- COURS -------------------------------- */

const courseFiles = import.meta.glob('../content/cours/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// filename -> id
const fileToId: Record<string, string> = Object.fromEntries(
  Object.entries(COURSE_FILE).map(([id, file]) => [file, id]),
);

const COURSE_ID_ORDER = ['guide', 'notations', 's0', 's1', 's2'];

let _courses: Course[] | null = null;

export function getCourses(): Course[] {
  if (_courses) return _courses;
  const byId = new Map<string, Course>();
  for (const [path, markdown] of Object.entries(courseFiles)) {
    const file = path.split('/').pop() ?? '';
    const id = fileToId[file];
    if (!id) continue;
    byId.set(id, { id, title: COURSE_TITLE[id] ?? file, file, markdown });
  }
  _courses = COURSE_ID_ORDER.filter((id) => byId.has(id)).map((id) => byId.get(id)!);
  return _courses;
}

export function getCourse(id: string): Course | undefined {
  return getCourses().find((c) => c.id === id);
}
