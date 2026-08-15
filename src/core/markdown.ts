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

/* ------------------- Décoration des fiches de révision ------------------- */

/** 🔴 🟠 🟡 🟢 ⚪ → niveau de priorité stylable. */
const PRIO_OF: Record<string, string> = {
  '🔴': 'must',
  '🟠': 'high',
  '🟡': 'mid',
  '🟢': 'low',
  '⚪': 'low',
};

/* Émojis de rubrique : le titre suffit, le signe disparaît. */
const RUBRIC_RE = /[🎯📌🧠🃏]\s*/gu;
const DOT_RE = /[🔴🟠🟡🟢⚪]/gu;
const WARN_RE = /⚠️?\s*/gu;

/**
 * Traduit les conventions d'écriture des fiches (🔴 🟠 🟡 ⚠️ …) en attributs
 * et en éléments stylables par prose.css — aucun émoji brut ne doit rester à
 * l'écran. Fait aussi la toilette structurelle : retire les <hr> qui doublent
 * le filet des <h2>, et marque les tableaux clé-valeur pour l'empilement
 * mobile. Format-agnostique (DOM), comme collapseCorriges.
 */
export function decorateFiche(html: string): string {
  if (typeof DOMParser === 'undefined') return html;
  const doc = new DOMParser().parseFromString(`<div id="__root">${html}</div>`, 'text/html');
  const root = doc.getElementById('__root');
  if (!root) return html;

  /* 1. <hr> immédiatement suivi d'un titre : le filet du titre suffit. */
  for (const hr of Array.from(root.querySelectorAll('hr'))) {
    const next = hr.nextElementSibling;
    if (next && /^H[1-4]$/.test(next.tagName)) hr.remove();
  }

  /* 2. Titres : priorité, mise en garde, rubriques. */
  for (const h of Array.from(root.querySelectorAll('h1, h2, h3, h4'))) {
    const text = h.textContent ?? '';
    const dot = text.match(DOT_RE)?.[0];
    if (dot) h.setAttribute('data-prio', PRIO_OF[dot]);
    if (/⚠/u.test(text)) h.setAttribute('data-warn', '');
    h.innerHTML = h.innerHTML
      .replace(DOT_RE, '')
      .replace(WARN_RE, '')
      .replace(RUBRIC_RE, '')
      .replace(/^(\s|&nbsp;)+/, '');
  }

  /* 3. Paragraphes d'avertissement : ⚠️ en tête → encadré de mise en garde. */
  for (const p of Array.from(root.querySelectorAll('p, li'))) {
    const raw = p.textContent ?? '';
    if (!/⚠/u.test(raw)) continue;
    if (p.tagName === 'P' && /^\s*⚠/u.test(raw)) {
      p.classList.add('callout', 'callout--warn');
      p.innerHTML = p.innerHTML.replace(WARN_RE, '');
    } else {
      // en plein texte : un signe dessiné, pas un caractère couleur
      p.innerHTML = p.innerHTML.replace(WARN_RE, '<span class="warn-mark" aria-hidden="true"></span> ');
    }
  }

  /* 4. Pastilles en plein texte et dans les cellules (🟢 Fondamental…).
        replace est sans effet quand rien ne correspond : pas de test préalable
        (les regex globales gardent un lastIndex, .test() serait piégeux). */
  for (const el of Array.from(root.querySelectorAll('td, th, p, li, summary'))) {
    el.innerHTML = el.innerHTML
      .replace(DOT_RE, (d) => `<span class="prio-dot" data-prio="${PRIO_OF[d]}" aria-hidden="true"></span>`)
      .replace(RUBRIC_RE, '');
  }

  /* 5. Tableaux clé-valeur (en-tête vide, deux colonnes) : empilables. */
  for (const table of Array.from(root.querySelectorAll('table'))) {
    const headCells = Array.from(table.querySelectorAll('thead th'));
    const twoCols = headCells.length === 2;
    const emptyHead = twoCols && headCells.every((th) => (th.textContent ?? '').trim() === '');
    if (emptyHead) {
      table.classList.add('table--kv');
      table.querySelector('thead')?.remove();
    }
  }

  return root.innerHTML;
}
