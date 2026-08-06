import { describe, it, expect } from 'vitest';
import {
  allWords,
  distractors,
  fold,
  lexThemes,
  searchWords,
  shortTheme,
  wordById,
  wordCount,
  wordsOfTheme,
} from './lexicon';

/** Même clé de déduplication que scripts/build-vocab.mjs. */
const dedupeKey = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/^(to|the|a|an)\s+/, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();

describe('lexique — intégrité des données', () => {
  it('contient plus de dix mille mots', () => {
    expect(wordCount()).toBeGreaterThan(10_000);
    expect(allWords()).toHaveLength(wordCount());
  });

  it('ne contient aucun doublon', () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const w of allWords()) {
      const k = dedupeKey(w.t);
      if (seen.has(k)) dupes.push(w.t);
      seen.add(k);
    }
    expect(dupes).toEqual([]);
  });

  it('donne à chaque mot un terme, une définition anglaise et un thème connu', () => {
    const themes = lexThemes();
    for (const w of allWords()) {
      expect(w.t.trim()).not.toBe('');
      expect(w.e.trim()).not.toBe('');
      expect(themes[w.th]).toBeDefined();
      expect(w.theme).toBe(themes[w.th].label);
    }
  });

  it('traduit en français la quasi-totalité du lexique', () => {
    const withFr = allWords().filter((w) => w.f.trim()).length;
    expect(withFr / wordCount()).toBeGreaterThan(0.95);
  });

  it('annonce des effectifs de thème exacts', () => {
    for (const t of lexThemes()) {
      expect(wordsOfTheme(t.id)).toHaveLength(t.count);
    }
    const sum = lexThemes().reduce((n, t) => n + t.count, 0);
    expect(sum).toBe(wordCount());
  });

  it('attribue des identifiants stables et retrouvables', () => {
    const w = allWords()[42];
    expect(wordById(w.id)).toBe(w);
    expect(wordById('w:inconnu')).toBeUndefined();
  });
});

describe('recherche', () => {
  it('normalise casse, accents et ponctuation', () => {
    expect(fold('  À l’Excès… ')).toBe('a l exces');
  });

  it('place la correspondance exacte en tête', () => {
    const term = allWords()[500].t;
    const hits = searchWords(term);
    expect(hits.length).toBeGreaterThan(0);
    expect(fold(hits[0].t)).toBe(fold(term));
  });

  it('trouve un mot depuis sa traduction française', () => {
    const target = allWords().find((w) => w.f.trim().length > 6)!;
    const hits = searchWords(target.f);
    expect(hits.some((h) => h.id === target.id)).toBe(true);
  });

  it('respecte le filtre par thème', () => {
    const theme = lexThemes()[3];
    for (const h of searchWords('a', { theme: theme.id, limit: 50 })) {
      expect(h.th).toBe(theme.id);
    }
  });

  it('rend la liste du thème quand la requête est vide', () => {
    const hits = searchWords('   ', { theme: 2, limit: 10 });
    expect(hits).toHaveLength(10);
    expect(hits.every((h) => h.th === 2)).toBe(true);
  });
});

describe('leurres de QCM', () => {
  it('propose trois distracteurs distincts, différents de la cible', () => {
    const target = allWords()[1234];
    const decoys = distractors(target, 3);
    expect(decoys).toHaveLength(3);
    expect(new Set(decoys.map((d) => d.id)).size).toBe(3);
    expect(decoys.some((d) => d.id === target.id)).toBe(false);
  });

  it('puise dans le même thème que la cible', () => {
    const target = allWords()[7000];
    expect(distractors(target, 3).every((d) => d.th === target.th)).toBe(true);
  });
});

describe('libellés courts de thème', () => {
  it('garde la tête de l’énumération', () => {
    expect(shortTheme('Finance, banque, investissement et comptabilité')).toBe('Finance');
    expect(shortTheme('Économie et politique économique')).toBe('Économie');
    expect(shortTheme('Verbes de registre soutenu')).toBe('Verbes');
  });

  it('reste court pour tous les thèmes du lexique', () => {
    for (const t of lexThemes()) {
      expect(shortTheme(t.label).length).toBeLessThanOrEqual(24);
    }
  });
});
