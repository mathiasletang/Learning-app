/* =========================================================================
   Matières — l'unité d'organisation de l'application.

   La navigation suit la journée de travail (Anglais, Maths, CFA), pas les
   outils. Chaque matière regroupe ses parcours, ses banques de questions,
   ses documents, ses erreurs et ses notes. L'anglais a son propre module
   (le lexique) ; ici ne vivent que les deux matières quantitatives.
   ========================================================================= */

import type { BankId, TrackId, Flashcard } from './types';

export type SubjectId = 'maths' | 'cfa';

export interface SubjectDef {
  id: SubjectId;
  path: string;
  label: string;
  colorVar: string;
  /** Banques de questions rattachées à la matière. */
  banks: BankId[];
  /** Parcours (feuilles de route) rattachés. */
  tracks: TrackId[];
  /** Sujets de notes et de temps correspondants. */
  noteSubjects: string[];
  lead: string;
}

export const SUBJECT_DEFS: Record<SubjectId, SubjectDef> = {
  maths: {
    id: 'maths',
    path: '/maths',
    label: 'Maths',
    colorVar: '--m-opt',
    banks: ['opt', 'pre', 'eco'],
    tracks: ['opt'],
    noteSubjects: ['opt', 'pre', 'eco', 'gen'],
    lead: "L'optimisation, de la L3 au M2 — le parcours, les documents, les questions et vos erreurs, au même endroit.",
  },
  cfa: {
    id: 'cfa',
    path: '/cfa',
    label: 'CFA · Finance',
    colorVar: '--m-cfa',
    banks: ['cfa', 'fin'],
    tracks: ['fin', 'cfa'],
    noteSubjects: ['cfa', 'fin'],
    lead: 'Le CFA Level I et les mathématiques financières — parcours, documents, questions et erreurs, au même endroit.',
  },
};

export const SUBJECT_ORDER: SubjectId[] = ['maths', 'cfa'];

/** Matière d'appartenance d'une banque de questions. */
export function bankSubject(bank: BankId): SubjectId {
  return SUBJECT_DEFS.cfa.banks.includes(bank) ? 'cfa' : 'maths';
}

/**
 * Une carte appartient à une matière par sa banque d'origine.
 * Les cartes libres (« manual ») restent côté Maths, la matière par défaut.
 */
export function cardInSubject(card: Flashcard, subject: SubjectId): boolean {
  const bank = card.bank ?? 'manual';
  if (bank === 'manual') return subject === 'maths';
  return SUBJECT_DEFS[subject].banks.includes(bank);
}

/** Sections internes d'une page matière — le gabarit commun. */
export type SubjectSection = 'parcours' | 'documents' | 'exercer' | 'revision' | 'notes';

export const SECTION_ORDER: SubjectSection[] = [
  'parcours',
  'documents',
  'exercer',
  'revision',
  'notes',
];

export const SECTION_LABEL: Record<SubjectSection, string> = {
  parcours: 'Parcours',
  documents: 'Documents',
  exercer: "S'exercer",
  revision: 'Révision',
  notes: 'Notes',
};
