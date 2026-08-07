/* =========================================================================
   Lexique anglais — 11 233 mots uniques, dédupliqués, avec définition
   anglaise et traduction française.

   Produit par scripts/build-vocab.mjs. Chargé en un bloc (≈1 Mo) mais indexé
   paresseusement : les structures de recherche ne sont bâties qu'au premier
   usage, pour ne pas ralentir le démarrage de l'application.
   ========================================================================= */

import lexRaw from '@/content/lexique.json';
import type { LexData, LexEntry, LexTheme } from './types';
import { LEX_THEMES, WORD_COUNT } from './lexicon-meta';

export { shortTheme } from './lexicon-meta';

const data = lexRaw as LexData;

let _entries: LexEntry[] | null = null;

export function allWords(): LexEntry[] {
  if (_entries) return _entries;
  const themes = data.themes;
  _entries = data.words.map((w, index) => ({
    ...w,
    id: `w:${index}`,
    index,
    theme: themes[w.th]?.label ?? 'Divers',
  }));
  return _entries;
}

export function lexThemes(): LexTheme[] {
  return LEX_THEMES;
}

export function wordCount(): number {
  return WORD_COUNT;
}

let _byId: Map<string, LexEntry> | null = null;

export function wordById(id: string): LexEntry | undefined {
  if (!_byId) _byId = new Map(allWords().map((w) => [w.id, w]));
  return _byId.get(id);
}

export function wordsOfTheme(themeId: number | 'all'): LexEntry[] {
  return themeId === 'all' ? allWords() : allWords().filter((w) => w.th === themeId);
}

/* ------------------------------ Recherche -------------------------------- */

/** Forme normalisée : minuscules, sans accents ni ponctuation. */
export function fold(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

interface SearchIndex {
  terms: string[];
  french: string[];
  english: string[];
}
let _index: SearchIndex | null = null;

function index(): SearchIndex {
  if (_index) return _index;
  const words = allWords();
  _index = {
    terms: words.map((w) => fold(w.t)),
    french: words.map((w) => fold(w.f)),
    english: words.map((w) => fold(w.e)),
  };
  return _index;
}

export interface SearchOptions {
  theme?: number | 'all';
  limit?: number;
}

/**
 * Recherche instantanée. Les correspondances en début de terme remontent en
 * premier, puis le terme, puis le français, puis la définition anglaise.
 */
export function searchWords(query: string, opts: SearchOptions = {}): LexEntry[] {
  const { theme = 'all', limit = 200 } = opts;
  const words = allWords();
  const q = fold(query);

  if (!q) {
    const base = theme === 'all' ? words : words.filter((w) => w.th === theme);
    return base.slice(0, limit);
  }

  const idx = index();
  const exact: LexEntry[] = [];
  const starts: LexEntry[] = [];
  const inTerm: LexEntry[] = [];
  const inFrench: LexEntry[] = [];
  const inEnglish: LexEntry[] = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (theme !== 'all' && w.th !== theme) continue;
    const t = idx.terms[i];
    if (t === q) exact.push(w);
    else if (t.startsWith(q)) starts.push(w);
    else if (t.includes(q)) inTerm.push(w);
    else if (idx.french[i].includes(q)) inFrench.push(w);
    else if (idx.english[i].includes(q)) inEnglish.push(w);
    // On peut s'arrêter tôt : les meilleurs résultats sont déjà réunis.
    if (exact.length + starts.length + inTerm.length >= limit) break;
  }

  return [...exact, ...starts, ...inTerm, ...inFrench, ...inEnglish].slice(0, limit);
}

/* ------------------------- Tirages pour les modes ------------------------ */

export function shuffled<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Trois leurres plausibles pour une question à choix multiple : puisés dans
 * le même thème quand c'est possible, pour que le choix reste exigeant.
 */
export function distractors(target: LexEntry, count = 3): LexEntry[] {
  const pool = wordsOfTheme(target.th).filter((w) => w.id !== target.id);
  const source = pool.length >= count ? pool : allWords().filter((w) => w.id !== target.id);
  const picked: LexEntry[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (picked.length < count && guard++ < count * 40) {
    const w = source[Math.floor(Math.random() * source.length)];
    if (!w || seen.has(w.id)) continue;
    seen.add(w.id);
    picked.push(w);
  }
  return picked;
}
