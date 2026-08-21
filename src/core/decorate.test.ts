// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderMarkdown, decorateFiche } from './markdown';
import { FICHES, ficheMarkdown } from './fiches';

/* Le rendu complet passe par jsdom : sur quatre-vingt-cinq fiches il coûterait
   des minutes. On garde ici un échantillon qui traverse les trois origines —
   les fiches écrites à la main, celles importées des cours de Boyd, celles de
   Hull — et le corpus entier est vérifié formule à formule dans fiches.test.ts. */
const ECHANTILLON = ['kkt', 'cfa-quant', 'lp-formulation', 'boyd-dualite', 'lettres-grecques'];
const corpus = await Promise.all(
  FICHES.filter((f) => ECHANTILLON.includes(f.id)).map(async (f) => ({
    id: f.id,
    markdown: await ficheMarkdown(f.file),
  })),
);

describe('decorateFiche — les conventions émoji deviennent des attributs stylables', () => {
  it("traduit la priorité d'un titre en data-prio et retire l'émoji", () => {
    const html = decorateFiche(renderMarkdown('## 🔴 Concept 1 — Gradient\n\ntexte'));
    expect(html).toContain('data-prio="must"');
    expect(html).not.toContain('🔴');
  });

  it('marque les titres de mise en garde et encadre les paragraphes ⚠️', () => {
    const html = decorateFiche(
      renderMarkdown('## ⚠️ Common mistakes\n\n⚠️ Ne pas confondre X et Y.'),
    );
    expect(html).toContain('data-warn');
    expect(html).toContain('callout--warn');
    expect(html).not.toContain('⚠');
  });

  it('supprime les <hr> qui doublent le filet des titres', () => {
    const html = decorateFiche(renderMarkdown('un\n\n---\n\n## Titre'));
    expect(html).not.toContain('<hr');
  });

  it('convertit les pastilles de cellule et marque les tableaux clé-valeur', () => {
    const html = decorateFiche(
      renderMarkdown('| | |\n|---|---|\n| **Difficulté** | 🟢 Fondamental |'),
    );
    expect(html).toContain('prio-dot');
    expect(html).toContain('table--kv');
    expect(html).not.toContain('🟢');
  });

  it("aucun émoji brut ne survit au rendu d'une fiche réelle", () => {
    for (const f of corpus) {
      const html = decorateFiche(renderMarkdown(f.markdown));
      expect(html, f.id).not.toMatch(/[🔴🟠🟡🟢⚪🎯📌🧠🃏]|⚠/u);
    }
  });

  it("plus aucun --- ne précède un titre dans le contenu", () => {
    for (const f of corpus) {
      expect(f.markdown, f.id).not.toMatch(/\n---\n\n#{2,3} /);
    }
  });

  it("garde les encadrés étiquetés lisibles comme du Markdown", () => {
    const html = decorateFiche(
      renderMarkdown(
        '<div class="callout" data-kind="intu">\n\n' +
          '<span class="callout__lab">Pourquoi c\'est important.</span>\n\n' +
          'Le **front** de Pareto, avec $x \\preceq y$.\n\n</div>',
      ),
    );
    expect(html).toContain('callout__lab');
    expect(html).toContain('data-kind="intu"');
    expect(html).toContain('<strong>front</strong>'); // le corps reste du Markdown
    expect(html).toContain('katex'); // et ses formules sont composées
  });
});
