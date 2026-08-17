/* Métadonnées d'affichage du contenu (libellés, couleurs). Source : SCHEMA_DONNEES.md */

import type { BankId, TrackId, Level } from './types';

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
  code: 'Programmation',
};

/** Couleur d'un parcours. Les trois premiers empruntent celle de leur banque
    éponyme ; le parcours Code n'a pas de banque et porte la sienne. */
export const TRACK_COLOR: Record<TrackId, string> = {
  opt: '--m-opt',
  fin: '--m-fin',
  cfa: '--m-cfa',
  code: '--m-code',
};

/* ------------------------- Niveau des documents -------------------------- */

/**
 * Niveau d'étude estimé, par dossier source. Le classement s'appuie sur le
 * niveau réel du cours d'origine (numéro de cours MIT/Stanford/UCLA, mention
 * M1/M2 pour l'ENS), pas sur une devinette à partir du titre.
 *
 * L3 — bases : probabilités, recherche opérationnelle, théorie financière I.
 * M1 — cœur du programme : convexité, dualité, statistiques, investissements.
 * M2 — avancé et recherche : algorithmes, contrôle stochastique, articles.
 */
const LEVEL_BY_FOLDER: Record<string, Level> = {
  // ---- Optimisation ----
  '00_L3_Toulon_Faccanoni': 'L3',
  '00_L3_Universite-Paris-Cite_Garrigos': 'L3',
  '01_Reference_Boyd_Vandenberghe': 'M1',
  '02_Stanford_EE364a_Optimisation-convexe-I': 'M1',
  '03_Stanford_EE364b_Optimisation-convexe-II': 'M2',
  '04_UCLA_EE236A_Programmation-lineaire': 'L3',
  '05_UCLA_EE236B_Optimisation-convexe': 'M1',
  '06_UCLA_EE236C_Methodes-premier-ordre': 'M2',
  '07_MIT-OpenCourseWare/15-053_Optimisation-en-sciences-de-gestion': 'L3',
  '07_MIT-OpenCourseWare/15-084_Programmation-non-lineaire-avancee': 'M2',
  '07_MIT-OpenCourseWare/15-093_Methodes-doptimisation': 'M2',
  '07_MIT-OpenCourseWare/18-433_Optimisation-combinatoire': 'M2',
  '07_MIT-OpenCourseWare/6-079_Introduction-a-loptimisation-convexe': 'M1',
  '07_MIT-OpenCourseWare/6-231_Programmation-dynamique-et-controle-stochastique': 'M2',
  '07_MIT-OpenCourseWare/6-252_Programmation-non-lineaire': 'M1',
  '07_MIT-OpenCourseWare/6-253_Analyse-convexe-et-optimisation_Bertsekas': 'M2',
  '07_MIT-OpenCourseWare/6-854_Algorithmes-avances': 'M2',
  '08_Cours-en-francais/Bordeaux_Dossal': 'M1',
  '08_Cours-en-francais/Dauphine_Royer': 'L3', // référence pratique du niveau L3
  '08_Cours-en-francais/Polytechnique_Allaire': 'M1',
  '09_ENS-Paris_Aspremont/M1_ENS': 'M1',
  '09_ENS-Paris_Aspremont/M2_MVA': 'M2',
  '10_Cornell_ORIE6334_Optimisation-combinatoire-approchee': 'M2',
  '11_Articles-de-reference': 'M2',
  '12_Nemirovski_Georgia-Tech': 'M2',
  // ---- Mathématiques financières ----
  '20_MATHS-FINANCIERES/21_Probabilites/MIT-18.440_Probabilites': 'L3',
  '20_MATHS-FINANCIERES/21_Probabilites/MIT-18.600_Probabilites-et-variables-aleatoires': 'L3',
  '20_MATHS-FINANCIERES/21_Probabilites/MIT-6.041_Systemes-probabilistes': 'L3',
  '20_MATHS-FINANCIERES/22_Statistiques/MIT-18.650_Statistiques-appliquees': 'M1',
  '20_MATHS-FINANCIERES/23_Processus-stochastiques/MIT-15.070_Processus-stochastiques-avances': 'M2',
  '20_MATHS-FINANCIERES/24_Finance/MIT-15.401_Theorie-financiere-I': 'L3',
  '20_MATHS-FINANCIERES/24_Finance/MIT-15.433_Investissements': 'M1',
  '20_MATHS-FINANCIERES/24_Finance/MIT-15.450_Analytique-de-la-finance': 'M2',
  '20_MATHS-FINANCIERES/24_Finance/MIT-18.S096_Mathematiques-pour-la-finance': 'M1',
  // ---- CFA ----
  CFA: 'M1',
};

export function folderLevel(folder: string): Level {
  const exact = LEVEL_BY_FOLDER[folder];
  if (exact) return exact;
  // Repli : une mention explicite dans le chemin l'emporte, sinon M1.
  const up = folder.toUpperCase();
  if (up.includes('/L3') || up.includes('_L3') || up.startsWith('L3')) return 'L3';
  if (up.includes('M2')) return 'M2';
  return 'M1';
}

export const LEVELS: Level[] = ['L3', 'M1', 'M2'];

export const LEVEL_DESC: Record<Level, string> = {
  L3: 'Les bases — probabilités, programmation linéaire, théorie financière.',
  M1: 'Le cœur du programme — convexité, dualité, statistiques, investissements.',
  M2: 'Avancé et recherche — algorithmes, contrôle stochastique, articles.',
};

/** Libellé lisible d'une source, à partir du nom de dossier. */
export function sourceLabel(folder: string): string {
  const last = folder.split('/').pop() ?? folder;
  return last
    .replace(/^\d+[_-]/, '')
    .replace(/[_-]/g, ' ')
    .trim();
}

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
