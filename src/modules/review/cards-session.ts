/* =========================================================================
   Mode Cartes — l'état d'une session de parcours.

   Cet état est ÉPHÉMÈRE. Il ne dit rien de la mémorisation, seulement où
   l'on en est dans un paquet : il n'a donc rien à faire en base (db.ts), qui
   ne conserve que la progression durable. Il vit dans sessionStorage — le
   temps d'un onglet — pour qu'un rafraîchissement malencontreux ne perde pas
   quatre-vingts cartes. C'est le seul fichier de l'application qui y touche.

   Rien ici n'écrit dans l'état SRS d'une carte : le mode Cartes lit
   db.flashcards, il ne le modifie jamais.
   ========================================================================= */

/** Le classement d'une carte pendant la session. Rien n'est planifié. */
export type CardVerdict = 'known' | 'again';

export interface CardsSession {
  /** Identifiant du paquet — une matière. */
  deck: string;
  /** Ids des cartes, dans l'ordre courant (mélange compris). */
  order: string[];
  /** Position ; `index === order.length` signifie « paquet parcouru ». */
  index: number;
  /** Classement par carte. Absent = pas encore vue. */
  verdicts: Record<string, CardVerdict>;
  /** Taille du paquet à l'ouverture — sert à détecter qu'il a changé. */
  size: number;
  /** 0 = paquet entier, ≥ 1 = reprise des cartes à revoir. */
  round: number;
}

const PREFIX = 'cartes:';

/** Mélange de Fisher-Yates, sur une copie. */
export function shuffleIds(ids: string[]): string[] {
  const a = [...ids];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function newSession(deck: string, ids: string[], shuffled = false): CardsSession {
  return {
    deck,
    order: shuffled ? shuffleIds(ids) : [...ids],
    index: 0,
    verdicts: {},
    size: ids.length,
    round: 0,
  };
}

/** Les deux compteurs de session, déduits des classements — jamais stockés en double. */
export function tally(s: CardsSession): { known: number; again: number } {
  let known = 0;
  let again = 0;
  for (const v of Object.values(s.verdicts)) {
    if (v === 'known') known += 1;
    else again += 1;
  }
  return { known, again };
}

/**
 * Reprend la session du paquet si elle est encore valable.
 * Une carte ajoutée ou supprimée entre-temps rend l'ordre mémorisé caduc :
 * on repart alors d'une session neuve plutôt que de parcourir un fantôme.
 */
export function loadSession(deck: string, ids: string[]): CardsSession | null {
  const raw = read(PREFIX + deck);
  if (!raw) return null;
  try {
    const s = JSON.parse(raw) as CardsSession;
    const known = new Set(ids);
    const ok =
      s?.deck === deck &&
      Array.isArray(s.order) &&
      s.size === ids.length &&
      s.order.every((id) => known.has(id)) &&
      typeof s.index === 'number' &&
      s.index >= 0 &&
      s.index <= s.order.length &&
      s.verdicts !== null &&
      typeof s.verdicts === 'object';
    return ok ? s : null;
  } catch {
    return null;
  }
}

export function saveSession(s: CardsSession): void {
  write(PREFIX + s.deck, JSON.stringify(s));
}

export function clearSession(deck: string): void {
  remove(PREFIX + deck);
}

/* Navigation privée, quota plein, stockage refusé : le mode Cartes doit
   continuer de fonctionner, il perd seulement la reprise après rechargement. */
function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* sans mémoire de session, on continue */
  }
}

function remove(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* idem */
  }
}
