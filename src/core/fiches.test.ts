import { describe, it, expect } from 'vitest';
import { FICHES, getFiches, getFiche, fichesOfSubject } from './fiches';
import { renderMarkdown } from './markdown';

describe('fiches de révision — intégrité', () => {
  it('charge toutes les fiches déclarées, sans fichier manquant', () => {
    expect(getFiches()).toHaveLength(FICHES.length);
    for (const f of getFiches()) {
      expect(f.markdown.length).toBeGreaterThan(2000);
    }
  });

  it('couvre les chapitres des deux cours sources', () => {
    const facc = getFiches().filter((f) => f.course.startsWith('Faccanoni'));
    const gar = getFiches().filter((f) => f.course.startsWith('Garrigos'));
    const chFacc = new Set(facc.map((f) => f.chapter.split(' ·')[0]));
    for (const c of ['Chapitre 1', 'Chapitre 2', 'Chapitre 3', 'Chapitre 4', 'Annexe A']) {
      expect(chFacc).toContain(c);
    }
    const chGar = new Set(gar.map((f) => f.chapter.split(' ·')[0]));
    for (const c of ['Chapitre I', 'Chapitre II', 'Chapitre III', 'Chapitre IV', 'Chapitre V']) {
      expect(chGar).toContain(c);
    }
  });

  it('respecte le gabarit pédagogique dans chaque fiche', () => {
    for (const f of getFiches()) {
      expect(f.markdown).toContain("Vue d'ensemble");
      expect(f.markdown).toContain('Common mistakes');
      expect(f.markdown).toContain('Ultimate Review');
      expect(f.markdown).toContain('Active Recall');
      expect(f.markdown).toContain('Flashcards');
      // Les réponses d'auto-interrogation sont repliées.
      expect(f.markdown).toContain('<details>');
    }
  });

  it('rend le Markdown avec les formules KaTeX composées', () => {
    const fiche = getFiche('extrema-libres')!;
    const html = renderMarkdown(fiche.markdown);
    expect(html).toContain('katex');
    expect(html).not.toContain('$$');
  });

  it('retrouve les fiches par matière et par id', () => {
    expect(fichesOfSubject('maths').length).toBe(13);
    expect(fichesOfSubject('cfa')).toHaveLength(0);
    expect(getFiche('extrema-lies')?.title).toContain('Lagrange');
    expect(getFiche('kkt')?.course).toContain('Garrigos');
    expect(getFiche('inconnue')).toBeUndefined();
  });
});
