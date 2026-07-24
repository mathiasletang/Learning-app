/* =========================================================================
   Moteur QCM (pur, testé) — mélange des options + difficulté.

   Le mélange est DÉTERMINISTE (PRNG à graine) pour être testable et
   reproductible sur une session. Il ne modifie jamais les données d'origine :
   `answer` reste l'index dans le tableau `options` fourni ; on renvoie sa
   nouvelle position d'affichage.
   ========================================================================= */

/** PRNG mulberry32 — rapide, déterministe, suffisant pour un mélange. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash déterministe d'une chaîne (pour dériver une graine stable). */
export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Fisher-Yates avec RNG fourni — renvoie une permutation des indices 0..n-1. */
export function permutation(n: number, rng: () => number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface ShuffledOptions {
  options: string[]; // options dans l'ordre d'affichage
  answer: number; // index de la bonne réponse dans l'ordre d'affichage
  order: number[]; // order[displayPos] = index d'origine
}

/**
 * Mélange les options pour l'affichage. `seed` rend le mélange reproductible ;
 * omettez-le pour un mélange aléatoire réel.
 */
export function shuffleOptions(
  options: string[],
  answer: number,
  seed?: number,
): ShuffledOptions {
  const rng = seed === undefined ? Math.random : mulberry32(seed);
  const order = permutation(options.length, rng);
  return {
    options: order.map((i) => options[i]),
    answer: order.indexOf(answer),
    order,
  };
}

/**
 * Difficulté estimée par la longueur (énoncé + options), comme le prototype :
 * < 170 caractères = 1, < 260 = 2, sinon 3.
 */
export function estimateDifficulty(question: string, options: string[]): 1 | 2 | 3 {
  const len = question.length + options.reduce((n, o) => n + o.length, 0);
  if (len < 170) return 1;
  if (len < 260) return 2;
  return 3;
}
