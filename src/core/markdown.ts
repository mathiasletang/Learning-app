/* Rendu Markdown + KaTeX (embarqué, hors-ligne) — Atelier */

import MarkdownIt from 'markdown-it';
import katexPlugin from '@vscode/markdown-it-katex';

const md: MarkdownIt = new MarkdownIt({
  html: true, // les champs contiennent du HTML léger (<b>, <details>…) à rendre tel quel
  linkify: true,
  typographer: true,
  breaks: false,
});

md.use(katexPlugin);

/** Rend une chaîne Markdown (avec LaTeX) en HTML. */
export function renderMarkdown(src: string): string {
  return md.render(src ?? '');
}

/** Rend une portion « inline » (une ligne, sans <p>). Pour les notes en aperçu court. */
export function renderInline(src: string): string {
  return md.renderInline(src ?? '');
}

const CORRIGE_RE = /^(corrig[ée]|solution|réponse|reponse)\b/i;

/**
 * Replie les corrigés : toute rubrique dont le titre commence par « Corrigé N »
 * (ou Solution/Réponse) est enveloppée dans un <details> fermé, du titre jusqu'au
 * prochain titre de niveau supérieur ou égal. Format-agnostique (DOM).
 * Les <details> déjà présents dans la source sont laissés tels quels.
 */
export function collapseCorriges(html: string): string {
  if (typeof DOMParser === 'undefined') return html;
  const doc = new DOMParser().parseFromString(`<div id="__root">${html}</div>`, 'text/html');
  const root = doc.getElementById('__root');
  if (!root) return html;

  const headingLevel = (el: Element): number => {
    const m = /^H([1-6])$/.exec(el.tagName);
    return m ? Number(m[1]) : 0;
  };

  const children = Array.from(root.children);
  for (const node of children) {
    const lvl = headingLevel(node);
    if (lvl === 0) continue;
    const text = (node.textContent ?? '').trim();
    if (!CORRIGE_RE.test(text)) continue;
    if (node.parentElement?.tagName === 'DETAILS') continue;

    const details = doc.createElement('details');
    details.className = 'corrige';
    const summary = doc.createElement('summary');
    summary.textContent = text;
    details.appendChild(summary);

    // déplace les frères suivants jusqu'au prochain titre de niveau <= lvl
    let sib = node.nextElementSibling;
    root.insertBefore(details, node);
    node.remove();
    while (sib) {
      const next = sib.nextElementSibling;
      const sibLvl = headingLevel(sib);
      if (sibLvl !== 0 && sibLvl <= lvl) break;
      details.appendChild(sib);
      sib = next;
    }
  }
  return root.innerHTML;
}
