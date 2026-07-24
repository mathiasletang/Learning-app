/* =========================================================================
   Répétition espacée — SM-2 (cahier des charges, annexe A)

   Notes à 4 niveaux mappées sur une échelle de qualité :
     Encore = 0, Difficile = 3, Correct = 4, Facile = 5.

   État initial : ef = 2.5, reps = 0, interval = 0, due = aujourd'hui, lapses = 0.
   Une carte est « mémorisée » (mature) si interval >= 21.

   Ce module est PUR (aucun effet de bord) et couvert par des tests.
   ========================================================================= */

import type { SrsState } from './types';
import { addDays, toDayStr } from './date';

export const MATURE_INTERVAL = 21;

/** Les 4 boutons de notation → qualité SM-2. */
export const GRADE = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
} as const;

export type Grade = 0 | 1 | 2 | 3 | 4 | 5;

export function initialSrs(today: string = toDayStr()): SrsState {
  return { ef: 2.5, reps: 0, interval: 0, due: today, lapses: 0 };
}

/**
 * Planifie la prochaine échéance à partir de l'état courant et de la note.
 * Retourne un NOUVEL objet (immuable).
 */
export function schedule(state: SrsState, grade: Grade, today: string = toDayStr()): SrsState {
  let { ef, reps, interval, lapses } = state;

  if (grade < 3) {
    reps = 0;
    interval = 1;
    lapses += 1;
  } else {
    ef = Math.max(1.3, ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));
    reps += 1;
    if (reps === 1) {
      interval = 1;
    } else if (reps === 2) {
      interval = grade === 3 ? 4 : 6;
    } else {
      const factor = grade === 3 ? 0.8 : grade === 5 ? 1.15 : 1;
      interval = Math.round(interval * ef * factor);
    }
  }

  return {
    ef,
    reps,
    interval,
    lapses,
    due: addDays(today, interval),
  };
}

export function isMature(state: SrsState): boolean {
  return state.interval >= MATURE_INTERVAL;
}

/** Une carte est due si son échéance est aujourd'hui ou passée. */
export function isDue(state: SrsState, today: string = toDayStr()): boolean {
  return state.due <= today;
}
