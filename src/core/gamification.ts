/* =========================================================================
   Gamification — XP, niveaux, badges (cahier des charges, annexes B et C)
   Module PUR et testé.
   ========================================================================= */

import type { QcmMode } from './types';
import type { Grade } from './srs';

/* ------------------------------- XP ------------------------------------- */

/** Bonne réponse QCM : difficulté × 4 (+4 en examen/chrono). */
export function xpForCorrect(difficulty: 1 | 2 | 3, mode: QcmMode): number {
  const bonus = mode === 'exam' || mode === 'timed' ? 4 : 0;
  return difficulty * 4 + bonus;
}

/** Carte/mot révisé, seulement si note ≥ Correct (grade ≥ 4). */
export function xpForReview(grade: Grade): number {
  if (grade >= 5) return 6;
  if (grade >= 4) return 5;
  return 0;
}

export const DAILY_WORD_GOAL = 20; // mots de vocabulaire par jour (page Anglais)
export const XP_STEP = 15; // étape de parcours cochée
export const XP_DOC = 3; // document lu
export const XP_NOTE = 5; // note créée

/** Minute travaillée ≈ 1/3 XP, plafonné (par défaut 40 XP/jour de temps). */
export function xpForMinutes(minutes: number, cap = 40): number {
  return Math.min(cap, Math.floor(minutes / 3));
}

/* ----------------------------- NIVEAUX ---------------------------------- */

const BASE = 100;
const GROWTH = 1.35;

/** Coût (XP) pour passer du niveau `level` au niveau suivant. */
export function levelIncrement(level: number): number {
  return Math.round(BASE * Math.pow(GROWTH, level - 1));
}

/** XP cumulé nécessaire pour atteindre `level` (niveau 1 = 0 XP). */
export function xpToReachLevel(level: number): number {
  let cum = 0;
  for (let l = 1; l < level; l++) cum += levelIncrement(l);
  return cum;
}

export interface LevelInfo {
  level: number;
  floor: number; // XP cumulé au début du niveau
  next: number; // XP cumulé pour le niveau suivant
  intoLevel: number; // XP acquis dans le niveau courant
  span: number; // XP total du niveau courant
  progress: number; // 0..1
}

export function levelFromXp(xp: number): LevelInfo {
  let level = 1;
  let floor = 0;
  // avance tant que l'XP suffit pour le niveau suivant
  for (;;) {
    const need = levelIncrement(level);
    if (floor + need <= xp) {
      floor += need;
      level += 1;
    } else {
      const next = floor + need;
      return {
        level,
        floor,
        next,
        intoLevel: xp - floor,
        span: need,
        progress: need > 0 ? (xp - floor) / need : 0,
      };
    }
  }
}

/* ------------------------------ BADGES ---------------------------------- */

export interface BadgeDef {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

/** Les 15 badges (annexe C). */
export const BADGES: BadgeDef[] = [
  { id: 'first', title: 'Premiers pas', desc: '1 question répondue', icon: '🌱' },
  { id: 'diligent', title: 'Assidu', desc: '50 questions répondues', icon: '📎' },
  { id: 'studious', title: 'Studieux', desc: '250 questions répondues', icon: '📚' },
  { id: 'erudite', title: 'Érudit', desc: '500 questions répondues', icon: '🎓' },
  { id: 'flawless', title: 'Sans-faute', desc: '20/20 dans une session', icon: '💯' },
  { id: 'onfire', title: 'En feu', desc: 'Série de 3 jours', icon: '🔥' },
  { id: 'week', title: 'Une semaine', desc: 'Série de 7 jours', icon: '🗓️' },
  { id: 'lvl5', title: 'Niveau 5', desc: 'Atteindre le niveau 5', icon: '⭐' },
  { id: 'lvl10', title: 'Niveau 10', desc: 'Atteindre le niveau 10', icon: '🌟' },
  { id: 'memory', title: 'Mémoire', desc: '50 cartes révisées', icon: '🧠' },
  { id: 'reader', title: 'Lecteur', desc: '10 documents lus', icon: '📖' },
  { id: 'phase', title: 'Une phase', desc: 'Une phase de parcours terminée', icon: '🏁' },
  { id: 'notetaker', title: 'Preneur de notes', desc: '1 note créée', icon: '📝' },
  { id: 'goal', title: 'Objectif atteint', desc: 'Objectif du jour rempli', icon: '🎯' },
  { id: 'explorer', title: 'Explorateur', desc: 'Une question dans chaque banque', icon: '🧭' },
];

export interface BadgeContext {
  questionsAnswered: number;
  hadPerfectSession: boolean;
  streak: number;
  level: number;
  srsReviews: number;
  docsRead: number;
  phaseCompleted: boolean;
  notesCount: number;
  goalReachedEver: boolean;
  banksCovered: number; // banques distinctes avec ≥ 1 réponse (sur 5)
}

/** Renvoie l'ensemble des ids de badges mérités pour l'état donné. */
export function evaluateBadges(ctx: BadgeContext): Set<string> {
  const earned = new Set<string>();
  const add = (id: string, cond: boolean) => {
    if (cond) earned.add(id);
  };
  add('first', ctx.questionsAnswered >= 1);
  add('diligent', ctx.questionsAnswered >= 50);
  add('studious', ctx.questionsAnswered >= 250);
  add('erudite', ctx.questionsAnswered >= 500);
  add('flawless', ctx.hadPerfectSession);
  add('onfire', ctx.streak >= 3);
  add('week', ctx.streak >= 7);
  add('lvl5', ctx.level >= 5);
  add('lvl10', ctx.level >= 10);
  add('memory', ctx.srsReviews >= 50);
  add('reader', ctx.docsRead >= 10);
  add('phase', ctx.phaseCompleted);
  add('notetaker', ctx.notesCount >= 1);
  add('goal', ctx.goalReachedEver);
  add('explorer', ctx.banksCovered >= 5);
  return earned;
}
