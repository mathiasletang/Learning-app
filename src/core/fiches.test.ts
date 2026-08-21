import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { FICHES, getFiches, getFiche, fichesOfSubject, ficheMarkdown } from './fiches';
import { renderMarkdown } from './markdown';
import { SUBJECT_ORDER } from './subjects';

/** Le corpus entier, chargé une fois pour toutes les vérifications. */
const corpus = await Promise.all(
  FICHES.map(async (f) => ({ ...f, markdown: await ficheMarkdown(f.file) })),
);

const MATH = /\$\$([\s\S]*?)\$\$|\$((?:\\.|[^$\\])+)\$/g;

describe('fiches de révision — intégrité', () => {
  it('charge toutes les fiches déclarées, sans fichier manquant', () => {
    expect(getFiches()).toHaveLength(FICHES.length);
    for (const f of corpus) {
      expect(f.markdown.length, f.file).toBeGreaterThan(2000);
    }
  });

  it('tient un registre valide : identifiants uniques, matières et niveaux connus', () => {
    const ids = FICHES.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of FICHES) {
      expect(SUBJECT_ORDER, f.id).toContain(f.subject);
      expect(['fondamental', 'intermediaire', 'avance'], f.id).toContain(f.difficulty);
      expect(f.minutes, f.id).toBeGreaterThan(0);
      expect(f.title.length, f.id).toBeGreaterThan(5);
      expect(f.concepts.length, f.id).toBeGreaterThan(0);
      expect(f.course.length, f.id).toBeGreaterThan(3);
    }
  });

  it('couvre les dix topics du QuickSheet CFA', () => {
    const cfa = getFiches().filter((f) => f.course.startsWith('Schweser'));
    const topics = new Set(cfa.map((f) => f.chapter.split(' ·')[0]));
    for (const t of [
      'Ethics',
      'Quantitative Methods',
      'Economics',
      'Financial Statement Analysis',
      'Corporate Issuers',
      'Portfolio Management',
      'Equity Investments',
      'Fixed Income',
      'Derivatives',
      'Alternative Investments',
    ]) {
      expect(topics).toContain(t);
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

  it('range les fiches importées derrière leurs huit cours sources', () => {
    const cours = new Set(getFiches().map((f) => f.course));
    for (const c of [
      'Vandenberghe · Programmation linéaire (EE236A)',
      'Boyd & Vandenberghe · Optimisation convexe',
      'Boyd · Sous-gradients (EE364b)',
      'Bertsekas · Programmation dynamique (6.231)',
      'MIT 18.S096 · Mathématiques financières',
      'Rigollet · Statistiques (18.650)',
      'Kogan · Analytics of Finance (15.450)',
      'Hull · Options, Futures, and Other Derivatives',
    ]) {
      expect(cours).toContain(c);
    }
  });

  it('respecte le gabarit pédagogique dans chaque fiche', () => {
    for (const f of corpus) {
      expect(f.markdown, f.file).toContain("Vue d'ensemble");
      expect(f.markdown, f.file).toContain('Common mistakes');
      expect(f.markdown, f.file).toContain('Ultimate Review');
      expect(f.markdown, f.file).toContain('Active Recall');
      expect(f.markdown, f.file).toContain('Flashcards');
      // Les réponses d'auto-interrogation sont repliées.
      expect(f.markdown, f.file).toContain('<details>');
      // Le titre porte le numéro de la fiche.
      expect(f.markdown.startsWith('# Fiche '), f.file).toBe(true);
    }
  });

  it('compose toutes les formules du corpus sans une seule erreur KaTeX', () => {
    /* C'est la garantie qui compte : ces fiches viennent d'un rendu MathJax,
       plus permissif. Une macro que KaTeX ignore afficherait du rouge en
       pleine page — on le sait ici, pas devant la fiche. */
    const fautes: string[] = [];
    let total = 0;
    for (const f of corpus) {
      for (const m of f.markdown.matchAll(MATH)) {
        total++;
        const source = (m[1] ?? m[2]).trim();
        try {
          katex.renderToString(source, { throwOnError: true, displayMode: Boolean(m[1]) });
        } catch (e) {
          fautes.push(`${f.file} : ${source.slice(0, 60)} — ${(e as Error).message.slice(0, 60)}`);
        }
      }
    }
    expect(total).toBeGreaterThan(20000);
    expect(fautes).toEqual([]);
  });

  it('rend le Markdown avec les formules KaTeX composées', () => {
    const fiche = corpus.find((f) => f.id === 'extrema-libres')!;
    const html = renderMarkdown(fiche.markdown);
    expect(html).toContain('katex');
    expect(html).not.toContain('$$');
  });

  it('retrouve les fiches par matière et par id', () => {
    expect(fichesOfSubject('maths').length).toBe(51);
    expect(fichesOfSubject('cfa').length).toBe(34);
    expect(getFiche('extrema-lies')?.title).toContain('Lagrange');
    expect(getFiche('kkt')?.course).toContain('Garrigos');
    expect(getFiche('cfa-fixed-income')?.course).toContain('Schweser');
    expect(getFiche('lp-simplexe')?.title).toContain('simplexe');
    expect(getFiche('black-scholes-merton')?.subject).toBe('cfa');
    expect(getFiche('inconnue')).toBeUndefined();
  });
});
