#!/usr/bin/env node
/* =========================================================================
   Importe les fiches HTML de public/cours/fiches/ en Markdown + KaTeX.

   Les fiches ont été rédigées ailleurs et imprimées en PDF ; leur source HTML
   porte le LaTeX en clair ($…$, $$…$$, MathJax). On le récupère tel quel : le
   contenu n'est ni réécrit ni interprété — seule la mise en forme change,
   du HTML de la page imprimée vers le Markdown que rend l'application.

   Correspondances retenues :
     <h2 data-prio="must">        →  ## 🔴 …          (decorateFiche le relit)
     <p class="cal piege">        →  ⚠️ …             (.callout--warn)
     <div class="cal intu">       →  <div class="callout" data-kind="intu">
     <details class="cor">        →  <details> (la convention des fiches 1-23)
     <div class="rec">            →  déballé : la rubrique suffit
     $$…$$ au milieu d'un <p>     →  isolé sur sa ligne, pour être encadré

   Usage : node scripts/importer-fiches.mjs [--verifie]
   ========================================================================= */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const SOURCE = 'public/cours/fiches';
const CIBLE = 'src/content/fiches';

/* ----------------------------- petit DOM -------------------------------- */
/* Les fiches sont produites par un générateur : le balisage est régulier et
   se laisse analyser sans dépendance. On lit les balises une à une et on
   empile — assez pour ce sous-ensemble de HTML, et rien de plus. */

const VIDES = new Set(['br', 'hr', 'img', 'meta', 'link']);

function parse(html) {
  const racine = { tag: '#racine', attrs: {}, enfants: [] };
  const pile = [racine];
  const re = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g;
  let pos = 0;
  let m;
  while ((m = re.exec(html))) {
    const texte = html.slice(pos, m.index);
    if (texte) pile[pile.length - 1].enfants.push({ tag: '#texte', texte });
    pos = re.lastIndex;
    const [, fermant, tag, brut, auto] = m;
    const nom = tag.toLowerCase();
    if (fermant) {
      for (let i = pile.length - 1; i > 0; i--) {
        if (pile[i].tag === nom) {
          pile.length = i;
          break;
        }
      }
      continue;
    }
    const attrs = {};
    for (const a of brut.matchAll(/([\w-]+)\s*=\s*"([^"]*)"/g)) attrs[a[1]] = a[2];
    const noeud = { tag: nom, attrs, enfants: [] };
    pile[pile.length - 1].enfants.push(noeud);
    if (!auto && !VIDES.has(nom)) pile.push(noeud);
  }
  const reste = html.slice(pos);
  if (reste) pile[pile.length - 1].enfants.push({ tag: '#texte', texte: reste });
  return racine;
}

const ENTITES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  hellip: '…', mdash: '—', ndash: '–', laquo: '«', raquo: '»', times: '×',
  rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', deg: '°', eacute: 'é',
  egrave: 'è', agrave: 'à', ccedil: 'ç', minus: '−', larr: '←', rarr: '→',
};

function desechappe(s) {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (tout, code) => {
    if (code[0] === '#') {
      const n = code[1] === 'x' || code[1] === 'X'
        ? parseInt(code.slice(2), 16)
        : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : tout;
    }
    return ENTITES[code] ?? tout;
  });
}

/* --------------------------- maths protégées ---------------------------- */
/* Le LaTeX traverse la conversion sans une retouche : on le met de côté avant
   toute réécriture du texte, on le remet après. Un `_` ou un `*` de formule
   n'est pas de l'italique Markdown. */

/* Un jeton qu'aucun texte de fiche ne produit : un simple nombre entre
   espaces ferait un marqueur catastrophique. */
const JETON = '\u0000';

const MATH_RE = /\$\$[\s\S]*?\$\$|\$(?:\\.|[^$\\])+\$/g;

function protege(texte, coffre) {
  return texte.replace(MATH_RE, (formule) => {
    coffre.push(formule);
    return `${JETON}${coffre.length - 1}${JETON}`;
  });
}

function rend(texte, coffre) {
  return texte.replace(new RegExp(`${JETON}(\\d+)${JETON}`, 'g'), (_, i) => coffre[Number(i)]);
}

/* --------------------------- rendu en ligne ----------------------------- */

function enLigne(noeuds, coffre) {
  let out = '';
  for (const n of noeuds) {
    if (n.tag === '#texte') {
      // Le rendu accepte le HTML en ligne : un « < » resté nu ferait le début
      // d'une balise et emporterait la phrase. Les maths sont déjà à l'abri.
      out += protege(desechappe(n.texte), coffre).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    } else if (n.tag === 'strong' || n.tag === 'b') {
      const inner = enLigne(n.enfants, coffre).trim();
      out += inner ? `**${inner}**` : '';
    } else if (n.tag === 'em' || n.tag === 'i') {
      const inner = enLigne(n.enfants, coffre).trim();
      out += inner ? `*${inner}*` : '';
    } else if (n.tag === 'code') {
      out += `\`${desechappe(texteBrut(n))}\``;
    } else if (n.tag === 'a') {
      out += `[${enLigne(n.enfants, coffre)}](${n.attrs.href ?? ''})`;
    } else if (n.tag === 'br') {
      out += ' ';
    } else if (n.tag === 'span') {
      out += enLigne(n.enfants, coffre);
    } else {
      out += enLigne(n.enfants, coffre);
    }
  }
  return out;
}

function texteBrut(n) {
  if (n.tag === '#texte') return n.texte;
  return n.enfants.map(texteBrut).join('');
}

/** Une ligne de texte : espaces normalisés, maths rendues. */
function ligne(noeuds) {
  const coffre = [];
  const brut = enLigne(noeuds, coffre);
  return rend(brut.replace(/\s+/g, ' ').trim(), coffre);
}

/** Isole les formules en bloc : `$$…$$` doit se voir, donc vivre seul. */
function isoleBlocs(texte) {
  const parts = [];
  let reste = texte;
  const re = /\$\$([\s\S]*?)\$\$/g;
  let dernier = 0;
  let m;
  while ((m = re.exec(texte))) {
    const avant = texte.slice(dernier, m.index).trim();
    if (avant) parts.push(avant);
    parts.push(`$$${m[1].trim()}$$`);
    dernier = m.index + m[0].length;
  }
  reste = texte.slice(dernier).trim();
  if (parts.length === 0) return [texte.trim()];
  if (reste) parts.push(reste);
  return parts;
}

/* ----------------------------- rendu bloc ------------------------------- */

const PRIO_EMOJI = { must: '🔴', high: '🟠', mid: '🟡', low: '🟢' };
const RUBRIQUE_EMOJI = {
  "Vue d'ensemble": '🎯',
  'Common mistakes': '⚠️',
  'Ultimate Review': '📌',
  'Active Recall': '🧠',
  'Flashcards': '🃏',
};

function cellule(n) {
  // Le tube sépare les colonnes : dans une cellule il s'échappe, y compris
  // au milieu d'une formule ($|x|$ est fréquent).
  return ligne(n.enfants).replace(/\|/g, '\\|');
}

function tableau(n) {
  const entetes = [];
  const lignes = [];
  const parcours = (noeud) => {
    for (const e of noeud.enfants ?? []) {
      if (e.tag === 'tr') {
        const cells = e.enfants.filter((c) => c.tag === 'td' || c.tag === 'th');
        if (cells.every((c) => c.tag === 'th')) entetes.push(cells.map(cellule));
        else lignes.push(cells.map(cellule));
      } else parcours(e);
    }
  };
  parcours(n);
  const cols = Math.max(entetes[0]?.length ?? 0, ...lignes.map((l) => l.length), 1);
  const tete = entetes[0] ?? new Array(cols).fill('');
  const out = [
    `| ${tete.join(' | ')} |`,
    `|${new Array(cols).fill('---').join('|')}|`,
    ...lignes.map((l) => `| ${l.concat(new Array(cols - l.length).fill('')).join(' | ')} |`),
  ];
  return out.join('\n');
}

function liste(n, ordonnee, profondeur) {
  const debut = Number(n.attrs.start ?? 1);
  const items = n.enfants.filter((e) => e.tag === 'li');
  return items
    .map((li, i) => {
      const puce = ordonnee ? `${debut + i}.` : '-';
      const marge = '  '.repeat(profondeur);
      const sousListes = li.enfants.filter((e) => e.tag === 'ul' || e.tag === 'ol');
      const propre = { ...li, enfants: li.enfants.filter((e) => e.tag !== 'ul' && e.tag !== 'ol') };
      const texte = ligne(propre.enfants);
      const dessous = sousListes
        .map((s) => liste(s, s.tag === 'ol', profondeur + 1))
        .join('\n');
      return `${marge}${puce} ${texte}${dessous ? `\n${dessous}` : ''}`;
    })
    .join('\n');
}

function blocs(noeuds, ctx = {}) {
  const out = [];
  for (const n of noeuds) {
    if (n.tag === '#texte') {
      if (n.texte.trim()) out.push(ligne([n]));
      continue;
    }
    const cls = (n.attrs.class ?? '').split(/\s+/);
    switch (n.tag) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4': {
        const niveau = Number(n.tag[1]);
        let texte = ligne(n.enfants);
        const prio = n.attrs['data-prio'];
        const rubrique = RUBRIQUE_EMOJI[texte];
        const signe = prio ? PRIO_EMOJI[prio] : rubrique;
        out.push(`${'#'.repeat(niveau)} ${signe ? `${signe} ` : ''}${texte}`);
        break;
      }
      case 'p': {
        const alerte = cls.includes('piege');
        for (const part of isoleBlocs(ligne(n.enfants))) {
          if (!part) continue;
          out.push(alerte && !part.startsWith('$$') ? `⚠️ ${part}` : part);
        }
        break;
      }
      case 'ul':
      case 'ol':
        out.push(liste(n, n.tag === 'ol', 0));
        break;
      case 'pre': {
        const code = desechappe(texteBrut(n)).replace(/^\n+|\n+$/g, '');
        out.push(`\`\`\`\n${code}\n\`\`\``);
        break;
      }
      case 'table':
        out.push(tableau(n));
        break;
      case 'blockquote':
        out.push(
          blocs(n.enfants)
            .join('\n\n')
            .split('\n')
            .map((l) => (l ? `> ${l}` : '>'))
            .join('\n'),
        );
        break;
      case 'details': {
        const resume = n.enfants.find((e) => e.tag === 'summary');
        const corps = n.enfants.filter((e) => e.tag !== 'summary');
        out.push(
          [
            `<details><summary>${resume ? ligne(resume.enfants) : 'Réponse'}</summary>`,
            ...blocs(corps),
            '</details>',
          ].join('\n\n'),
        );
        break;
      }
      case 'div': {
        if (cls.includes('rec') || cls.includes('in')) {
          out.push(...blocs(n.enfants, ctx)); // simple emballage : on le retire
        } else if (cls.includes('cal')) {
          const genre = ['formel', 'piege', 'intu', 'methode', 'plus'].find((g) => cls.includes(g));
          const lab = n.enfants.find((e) => e.tag === 'span' && (e.attrs.class ?? '').includes('lab'));
          const corps = n.enfants.filter((e) => e !== lab);
          // Un ⚠️ dans l'étiquette veut dire « mise en garde » : c'est tout
          // l'encadré qui le devient. Laissé dans le texte, il ferait un second
          // cadre à l'intérieur du premier — decorateFiche encadre les
          // paragraphes qui commencent par ⚠️.
          const etiquette = lab ? ligne(lab.enfants) : '';
          const alerte = genre === 'piege' || /⚠/u.test(etiquette);
          const classe = alerte ? 'callout callout--warn' : 'callout';
          out.push(
            [
              `<div class="${classe}"${genre ? ` data-kind="${genre}"` : ''}>`,
              ...(etiquette
                ? [`<span class="callout__lab">${etiquette.replace(/⚠️?\s*/gu, '')}</span>`]
                : []),
              ...blocs(corps, ctx),
              '</div>',
            ].join('\n\n'),
          );
        } else {
          out.push(...blocs(n.enfants, ctx));
        }
        break;
      }
      case 'hr':
        break; // le filet du <h2> suffit — règle de CLAUDE.md
      case 'span':
      case 'main':
        out.push(...blocs(n.enfants, ctx));
        break;
      default:
        out.push(...blocs(n.enfants, ctx));
    }
  }
  return out.filter((b) => b && b.trim());
}

/* --------------------------- fiche d'identité --------------------------- */

function identite(md) {
  const champs = {};
  const re = /^\|\s*\*\*(.+?)\*\*\s*\|\s*(.*?)\s*\|$/gm;
  let m;
  while ((m = re.exec(md))) champs[m[1]] = m[2];
  return champs;
}

function minutes(texte) {
  const t = texte.toLowerCase().replace(/ /g, ' ');
  const hm = t.match(/(\d+)\s*h\s*(\d+)?/);
  if (hm) return Number(hm[1]) * 60 + Number(hm[2] ?? 0);
  const min = t.match(/(\d+)\s*min/);
  if (min) return Number(min[1]);
  return 90;
}

/* La ligne « Difficulté » des fiches mêle deux échelles : un niveau
   (« Fondamental ») et une priorité (« Must know », « High »). Le registre ne
   garde que le niveau ; quand la source n'en donne pas, le temps d'étude
   qu'elle annonce en tient lieu. La ligne complète reste lisible dans la
   fiche d'identité, en tête de la fiche — rien n'est perdu. */
function difficulte(texte, minutesEstimees) {
  const tete = texte.split('—')[0].replace(/[🔴🟠🟡🟢⚪]/gu, '').trim().toLowerCase();
  if (tete.startsWith('fondamental')) return 'fondamental';
  if (tete.startsWith('avanc')) return 'avance';
  return minutesEstimees <= 105 ? 'intermediaire' : 'avance';
}

const MATIERES = {
  'Maths · Optimisation': 'maths',
  'Maths · Économétrie': 'maths',
  'Maths · Finance de marché': 'cfa',
  'Code · Langage R': 'code',
  'Maths · Microéconomie avancée': 'maths',
};

/* Les huit cours d'où viennent ces fiches, nommés comme les trois premiers :
   « Auteur · Titre court ». Le libellé sert de titre de groupe dans les
   Documents ; il doit être court et stable, pas la référence complète. */
const COURS = [
  [/EE236A/, 'Vandenberghe · Programmation linéaire (EE236A)'],
  [/Convex Optimization/, 'Boyd & Vandenberghe · Optimisation convexe'],
  [/Subgradient/i, 'Boyd · Sous-gradients (EE364b)'],
  [/6\.231/, 'Bertsekas · Programmation dynamique (6.231)'],
  [/18\.S096/, 'MIT 18.S096 · Mathématiques financières'],
  [/18\.650/, 'Rigollet · Statistiques (18.650)'],
  [/15\.450/, 'Kogan · Analytics of Finance (15.450)'],
  [/Options, Futures/, 'Hull · Options, Futures, and Other Derivatives'],
];

/** Le cours source, réduit au libellé court qui range la fiche. */
function cours(texte) {
  const trouve = COURS.find(([re]) => re.test(texte));
  if (trouve) return trouve[1];
  const nu = texte.replace(/\*/g, '');
  return nu.split(/\s+—\s+|\s+\(/)[0].replace(/,\s*$/, '').trim();
}

/** Le chapitre : « Chapitre 2 · Convex sets », « Cours 12 · Simplex method ». */
function chapitre(texte) {
  const nu = texte.replace(/\*/g, '');
  const m = nu.match(/(chapitre|chapter|lecture|cours|§)\s*([\dIVX.]+(?:\s*(?:à|et)\s*§?[\d.]+)?)\s*(?:«\s*([^»]+?)\s*»)?/i);
  if (!m) {
    // Des notes de cours : pas de chapitre, l'intitulé du polycopié en tient lieu.
    const notes = nu.match(/notes\s+pour\s+(\S+)/i);
    return notes ? `Notes ${notes[1].replace(/[.,;]$/, '')}` : '';
  }
  const rubrique = /lecture|cours/i.test(m[1]) ? 'Cours' : m[1] === '§' ? '§' : 'Chapitre';
  const numero = m[2].replace(/\.$/, '');
  const tete = rubrique === '§' ? `§${numero}` : `${rubrique} ${numero}`;
  return m[3] ? `${tete} · ${m[3]}` : tete;
}

/* ------------------------------- import --------------------------------- */

const fichiers = readdirSync(SOURCE)
  .filter((f) => f.endsWith('.html'))
  .sort((a, b) => Number(a.split('-')[0]) - Number(b.split('-')[0]));

const metas = [];
for (const f of fichiers) {
  const html = readFileSync(join(SOURCE, f), 'utf8');
  const debut = html.indexOf('<main>');
  const fin = html.lastIndexOf('</main>');
  if (debut < 0 || fin < 0) throw new Error(`${f} : pas de <main>`);
  const arbre = parse(html.slice(debut + 6, fin));
  const md = `${blocs(arbre.enfants).join('\n\n')}\n`;

  const nom = basename(f, '.html');
  const numero = Number(nom.split('-')[0]);
  const id = nom.replace(/^\d+-/, '');
  const champs = identite(md);
  const dureeEstimee = minutes(champs["Temps d'étude estimé"] ?? '');
  const titreBrut = (md.match(/^# (.+)$/m) ?? ['', nom])[1];
  const titre = titreBrut.replace(/^Fiche \d+\s*—\s*/, '');

  writeFileSync(join(CIBLE, `${nom}.md`), md);
  metas.push({
    numero,
    id,
    file: `${nom}.md`,
    title: titre,
    chapter: chapitre(champs['Cours source'] ?? ''),
    subject: MATIERES[champs['Matière']] ?? 'maths',
    course: cours(champs['Cours source'] ?? ''),
    difficulty: difficulte(champs['Difficulté'] ?? '', dureeEstimee),
    minutes: dureeEstimee,
    concepts: (champs['Concepts clés'] ?? '')
      .split(/,\s*/)
      .map((c) => c.trim())
      .filter(Boolean)
      .slice(0, 6),
  });
}

const doublons = metas.map((m) => m.id).filter((id, i, a) => a.indexOf(id) !== i);
if (doublons.length) throw new Error(`identifiants en double : ${doublons.join(', ')}`);

metas.sort((a, b) => a.numero - b.numero);
// `numero` n'a servi qu'à ranger : le registre garde la forme de FicheMeta.
const registre = metas.map(({ numero: _, ...reste }) => reste);
writeFileSync('src/content/fiches-importees.json', `${JSON.stringify(registre, null, 2)}\n`);
console.log(`${metas.length} fiches importées dans ${CIBLE}/`);
for (const c of [...new Set(metas.map((m) => m.course))]) {
  const g = metas.filter((m) => m.course === c);
  console.log(`   ${String(g.length).padStart(3)} · ${c}  [${g[0].subject}]`);
}
