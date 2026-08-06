/* =========================================================================
   Construit le lexique anglais unifié à partir du CSV fourni et des anciens
   paquets, en supprimant tous les doublons.

     node scripts/build-vocab.mjs

   Sortie : src/content/lexique.json
     { themes: [{id, label, count}], words: [{t, e, f, th}] }
       t  = terme anglais
       e  = définition anglaise
       f  = traduction / définition française
       th = index du thème

   Déduplication : sur une forme normalisée du terme (minuscules, accents et
   ponctuation retirés, article ou « to » initial ignoré). En cas de collision,
   la première occurrence gagne ; on complète seulement ses champs vides.
   ========================================================================= */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CSV = resolve(root, 'Vocabulaire_anglais_10785_mots.csv');
const LEGACY = resolve(root, 'src/content/vocabulaire.json');
const OUT = resolve(root, 'src/content/lexique.json');
const OUT_META = resolve(root, 'src/content/lexique-meta.json');

/* ----------------------------- Analyse CSV ------------------------------ */
/** Lecteur CSV minimal, gère les guillemets et les virgules internes. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (c !== '\r') field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/** Forme normalisée servant de clé de déduplication. */
function key(s) {
  return (s || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/^(to|the|a|an)\s+/, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

/* ------------------------------ Collecte -------------------------------- */
const themes = [];
const themeIndex = new Map();
const themeId = (label) => {
  if (!themeIndex.has(label)) {
    themeIndex.set(label, themes.length);
    themes.push(label);
  }
  return themeIndex.get(label);
};

const byKey = new Map();
let skipped = 0;

function add(term, meaning, french, theme) {
  const t = clean(term);
  if (!t) return;
  const k = key(t);
  if (!k) return;
  const existing = byKey.get(k);
  if (existing) {
    // Complète uniquement ce qui manque, sans écraser.
    if (!existing.e && meaning) existing.e = clean(meaning);
    if (!existing.f && french) existing.f = clean(french);
    skipped++;
    return;
  }
  byKey.set(k, { t, e: clean(meaning), f: clean(french), th: themeId(theme) });
}

/* 1. Le CSV fourni — source principale, la plus complète. */
const rows = parseCsv(readFileSync(CSV, 'utf8').replace(/^﻿/, ''));
const header = rows.shift().map(clean);
const col = (name) => header.indexOf(name);
const [cTheme, cEn, cMean, cFr] = [
  col('Theme'),
  col('English'),
  col('English meaning'),
  col('Francais'),
];
if ([cTheme, cEn, cMean, cFr].some((i) => i < 0)) {
  console.error('✗ Colonnes attendues absentes :', header);
  process.exit(1);
}
for (const r of rows) {
  if (!r[cEn]) continue;
  add(r[cEn], r[cMean], r[cFr], clean(r[cTheme]) || 'Divers');
}
const fromCsv = byKey.size;

/* 2. Les anciens paquets — on ne garde que ce qui n'existe pas déjà.
      Ils n'ont pas de traduction française : le champ reste vide. */
const LEGACY_THEME = {
  finfr: 'Finance, banque, investissement et comptabilité',
  verbs: 'Verbes de registre soutenu',
  nouns: 'Noms abstraits, idées et société',
};
if (existsSync(LEGACY)) {
  const legacy = JSON.parse(readFileSync(LEGACY, 'utf8'));
  for (const [deck, d] of Object.entries(legacy)) {
    for (const c of d.cards ?? []) add(c.t, c.d, '', LEGACY_THEME[deck] ?? d.titre);
  }
}

/* ------------------------------- Sortie --------------------------------- */
const words = [...byKey.values()].sort((a, b) =>
  a.t.localeCompare(b.t, 'en', { sensitivity: 'base' }),
);

const counts = new Array(themes.length).fill(0);
for (const w of words) counts[w.th]++;

const themeList = themes.map((label, i) => ({
  id: i,
  label,
  count: counts[i],
}));

writeFileSync(OUT, JSON.stringify({ themes: themeList, words }), 'utf8');

/* Un résumé léger (quelques centaines d'octets) : les pages qui n'ont besoin
   que du nombre de mots ou de la liste des thèmes n'embarquent pas le méga-octet. */
writeFileSync(OUT_META, JSON.stringify({ count: words.length, themes: themeList }), 'utf8');

const withFr = words.filter((w) => w.f).length;
const withEn = words.filter((w) => w.e).length;
console.log(`✓ ${words.length} mots uniques (${skipped} doublons écartés)`);
console.log(`  ${fromCsv} issus du CSV, ${words.length - fromCsv} des anciens paquets`);
console.log(`  ${withEn} avec définition anglaise, ${withFr} avec traduction française`);
console.log(`  ${themes.length} thèmes`);
