/* =========================================================================
   Types du domaine — Atelier
   Deux catégories : CONTENU (fourni, lecture seule) et PROGRESSION (persistée).
   ========================================================================= */

/* ------------------------------- CONTENU -------------------------------- */

export type BankId = 'opt' | 'fin' | 'cfa' | 'pre' | 'eco';
export type TrackId = 'opt' | 'fin' | 'cfa' | 'code';
export type DeckId = 'finfr' | 'verbs' | 'nouns';

/** Une question telle que fournie dans qcm.json. */
export interface RawQuestion {
  theme: string;
  question: string;
  options: string[]; // toujours 4
  answer: number; // index 0-3 dans l'ordre d'origine
  explanation: string;
}

export type QcmData = Record<BankId, RawQuestion[]>;

/** Une question enrichie d'un identifiant stable et de métadonnées calculées. */
export interface Question extends RawQuestion {
  id: string; // `${bank}:${theme}:${index}`
  bank: BankId;
  index: number;
  difficulty: 1 | 2 | 3;
  themeLabel: string;
}

export interface RawVocabDeck {
  titre: string;
  court: string;
  desc: string;
  cards: { t: string; d: string }[];
}

export type VocabData = Record<DeckId, RawVocabDeck>;

export interface VocabCard {
  id: string; // `v:${deck}:${index}`
  deck: DeckId;
  index: number;
  t: string; // terme (recto)
  d: string; // définition (verso)
}

/* --------------------------- Lexique anglais ---------------------------- */

/** Une entrée du lexique, telle que stockée dans lexique.json. */
export interface RawLexEntry {
  t: string; // terme anglais
  e: string; // définition anglaise
  f: string; // traduction / définition française
  th: number; // index du thème
}

export interface LexTheme {
  id: number;
  label: string;
  count: number;
}

export interface LexData {
  themes: LexTheme[];
  words: RawLexEntry[];
}

/** Entrée enrichie d'un identifiant stable, utilisée par l'application. */
export interface LexEntry extends RawLexEntry {
  id: string; // `w:${index}`
  index: number;
  theme: string; // libellé du thème
}

/** Sens d'interrogation d'une carte. */
export type LexDirection = 'en-fr' | 'fr-en';

/** catalogue.json : [dossier, [[nom, pages], …]][] */
export type RawCatalogue = [string, [string, number][]][];

/** Niveau d'étude estimé d'un document. */
export type Level = 'L3' | 'M1' | 'M2';

export interface LibDoc {
  path: string; // dossier/nom (relatif au dossier parent)
  folder: string;
  name: string;
  pages: number;
  track: TrackId; // parcours d'appartenance
  level: Level; // niveau estimé (L3 / M1 / M2)
  source: string; // libellé lisible de la source
}

export interface Step {
  id: string;
  t: string;
  r?: [string, string][]; // [ressource, label]
}

export interface Phase {
  id: string;
  t: string;
  d: string;
  h: number;
  steps: Step[];
}

export interface Track {
  titre: string;
  court: string;
  cible: string;
  heures: number;
  phases: Phase[];
}

export type ParcoursData = Record<TrackId, Track>;

export interface Course {
  id: string; // guide | notations | s0 | s1 | s2
  title: string;
  file: string;
  markdown: string;
}

/* ----------------------------- PROGRESSION ------------------------------ */

export interface UserPrefs {
  key: 'prefs';
  theme: 'light' | 'dark' | 'auto';
  dailyGoal: number; // nombre de questions
  sidebarCollapsed: boolean;
  installPromptDismissed?: boolean;
  persistedRequested?: boolean;
}

export interface Gamification {
  key: 'gam';
  xp: number;
  streak: number;
  lastDay: string; // YYYY-MM-DD
  goalDoneToday: number; // questions faites aujourd'hui
  goalDoneDay: string; // le jour auquel goalDoneToday se rapporte
  days: Record<string, number>; // date -> xp gagné ce jour
  reviewsCount: number; // total de révisions SRS (flashcards + vocab)
  goalReachedEver: boolean; // objectif du jour déjà atteint au moins une fois
  /** Mots de vocabulaire travaillés aujourd'hui (objectif quotidien anglais).
      Optionnels : les données déjà en base ne les ont pas. */
  wordsDoneToday?: number;
  wordsDay?: string;
}

export interface StepProgress {
  stepId: string;
  done: boolean;
  at?: string;
}

export interface DocRead {
  path: string;
  read: boolean;
  at?: string;
}

/** 1 = juste, 2 = à revoir */
export interface QcmResult {
  qid: string;
  status: 1 | 2;
  at: string;
}

export interface QcmSession {
  id?: number;
  date: string;
  bank: BankId;
  theme: string | null;
  mode: QcmMode;
  score: number; // bonnes réponses
  total: number;
  durationSec: number;
}

export type QcmMode = 'train' | 'exam' | 'timed' | 'review';

/** Carte SRS (SM-2). Utilisée pour flashcards ET vocabulaire (stores séparés). */
export interface SrsState {
  ef: number;
  reps: number;
  interval: number;
  due: string; // YYYY-MM-DD
  lapses: number;
}

export interface Flashcard extends SrsState {
  id: string;
  front: string;
  back: string;
  expl?: string;
  bank?: BankId | 'manual';
  createdAt: string;
}

export interface VocabSrs extends SrsState {
  id: string; // `v:${deck}:${index}`
}

export interface Note {
  id: string;
  title: string;
  body: string;
  subject: string; // 'opt' | 'fin' | 'cfa' | 'gen' ...
  updatedAt: string;
}

export interface TimeLog {
  id?: number;
  date: string; // YYYY-MM-DD
  subject: string;
  minutes: number;
}

export interface Badge {
  id: string;
  at: string; // date d'obtention
}
