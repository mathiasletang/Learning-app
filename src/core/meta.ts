/* Métadonnées d'affichage du contenu (libellés, couleurs). Source : SCHEMA_DONNEES.md */

import type { BankId, TrackId } from './types';

export interface BankMeta {
  id: BankId;
  title: string;
  lang: 'fr' | 'en';
  short: string;
  colorVar: string; // variable CSS de la matière
  themeKey: BankId; // clé de couleur matière
}

export const BANKS: Record<BankId, BankMeta> = {
  opt: { id: 'opt', title: 'Optimisation', short: 'Optim', lang: 'fr', colorVar: '--m-opt', themeKey: 'opt' },
  fin: { id: 'fin', title: 'Mathématiques financières', short: 'Finance', lang: 'fr', colorVar: '--m-fin', themeKey: 'fin' },
  cfa: { id: 'cfa', title: 'CFA Level I', short: 'CFA', lang: 'en', colorVar: '--m-cfa', themeKey: 'cfa' },
  pre: { id: 'pre', title: 'Prérequis', short: 'Prérequis', lang: 'fr', colorVar: '--m-pre', themeKey: 'pre' },
  eco: { id: 'eco', title: 'Économie et économétrie', short: 'Éco', lang: 'fr', colorVar: '--m-eco', themeKey: 'eco' },
};

export const BANK_ORDER: BankId[] = ['opt', 'fin', 'cfa', 'pre', 'eco'];

/** Libellés de thèmes par banque (les codes peuvent se répéter entre banques). */
export const THEME_LABELS: Record<BankId, Record<string, string>> = {
  opt: {
    not: 'Notations',
    ens: 'Ensembles convexes',
    fon: 'Fonctions convexes',
    pro: 'Problèmes et mise en forme',
    dua: 'Dualité et KKT',
    alg: 'Algorithmes',
    lp: 'Programmation linéaire',
    eco: 'Applications économiques',
  },
  fin: {
    prob: 'Probabilités',
    stat: 'Statistiques',
    sto: 'Processus stochastiques',
    tf: 'Théorie financière',
    der: 'Produits dérivés',
  },
  cfa: {
    eth: 'Ethical & Professional Standards',
    qm: 'Quantitative Methods',
    eco: 'Economics',
    fsa: 'Financial Statement Analysis',
    ci: 'Corporate Issuers',
    eq: 'Equity Investments',
    fi: 'Fixed Income',
    der: 'Derivatives',
    ai: 'Alternative Investments',
    pm: 'Portfolio Management',
  },
  pre: {
    mat: 'Matrices et déterminants',
    vp: 'Valeurs propres et diagonalisation',
    der: 'Dérivées, gradient, hessienne',
    tay: 'Formes quadratiques et géométrie',
  },
  eco: {
    micro: 'Microéconomie',
    macro: 'Macroéconomie',
    metrie: 'Économétrie',
  },
};

export function themeLabel(bank: BankId, code: string): string {
  return THEME_LABELS[bank]?.[code] ?? code;
}

/** cours:<id> → fichier markdown. */
export const COURSE_FILE: Record<string, string> = {
  guide: '00_COMMENCER_ICI.md',
  notations: '01_NOTATIONS_le-decodeur.md',
  s0: '02_EXERCICES_Serie-0.md',
  s1: '03_EXERCICES_Serie-1.md',
  s2: '04_EXERCICES_Serie-2.md',
};

export const COURSE_TITLE: Record<string, string> = {
  guide: 'Commencer ici',
  notations: 'Le décodeur de notations',
  s0: 'Exercices — Série 0',
  s1: 'Exercices — Série 1',
  s2: 'Exercices — Série 2',
};

/** Parcours d'appartenance d'un dossier de la bibliothèque. */
export function folderTrack(folder: string): TrackId {
  const up = folder.toUpperCase();
  if (up.startsWith('20_MATHS-FIN') || up.startsWith('20_MATHS_FIN') || up.startsWith('20_MATHS'))
    return 'fin';
  if (up.startsWith('CFA')) return 'cfa';
  return 'opt';
}

export const TRACK_LABEL: Record<TrackId, string> = {
  opt: 'Optimisation',
  fin: 'Finance',
  cfa: 'CFA',
};

/** Matières pour les notes / le temps de travail. */
export const SUBJECTS = [
  { id: 'opt', label: 'Optimisation', colorVar: '--m-opt' },
  { id: 'fin', label: 'Maths financières', colorVar: '--m-fin' },
  { id: 'cfa', label: 'CFA', colorVar: '--m-cfa' },
  { id: 'pre', label: 'Prérequis', colorVar: '--m-pre' },
  { id: 'eco', label: 'Économie', colorVar: '--m-eco' },
  { id: 'gen', label: 'Général', colorVar: '--accent' },
] as const;

export function subjectLabel(id: string): string {
  return SUBJECTS.find((s) => s.id === id)?.label ?? id;
}
export function subjectColorVar(id: string): string {
  return SUBJECTS.find((s) => s.id === id)?.colorVar ?? '--accent';
}
