// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderMarkdown, decorateFiche } from './markdown';
import { getFiches } from './fiches';

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
    for (const f of getFiches()) {
      const html = decorateFiche(renderMarkdown(f.markdown));
      expect(html).not.toMatch(/[🔴🟠🟡🟢⚪🎯📌🧠🃏]|⚠/u);
    }
  });

  it("plus aucun --- ne précède un titre dans le contenu", () => {
    for (const f of getFiches()) {
      expect(f.markdown).not.toMatch(/\n---\n\n#{2,3} /);
    }
  });
});
