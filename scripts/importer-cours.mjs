#!/usr/bin/env node
/* =========================================================================
   Importe dans l'application les PDF dont le parcours a besoin.

   Le catalogue compte 718 documents (663 Mo) : ils vivent dans Google Drive
   et l'application les y cherche par leur nom. Mais les documents que le
   parcours pointe explicitement — une trentaine, 19 Mo — méritent de
   s'ouvrir d'un clic, sans détour par Drive.

   Ce script lit `src/content/parcours.json`, en extrait chaque PDF référencé, copie
   le fichier depuis le dossier de cours local vers `public/cours/`, et
   régénère `src/content/cours-locaux.json` (la table chemin du catalogue →
   fichier servi, lue par `src/core/config.ts`).

   Usage :
     node scripts/importer-cours.mjs [chemin/du/dossier/de/cours]

   Défaut : ~/Documents/Mathématiques avancées

   À relancer après `build-opt-track.mjs`, ou après toute modification du
   parcours qui ajoute ou retire une référence de document.
   ========================================================================= */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] ?? join(homedir(), 'Documents', 'Mathématiques avancées'));
const target = join(root, 'public', 'cours');
const table = join(root, 'src', 'content', 'cours-locaux.json');

/* Les notes Schweser du CFA sont un produit commercial de Kaplan : elles
   restent dans Drive et ne sont jamais servies par l'application. */
const EXCLUS = [/^CFA\//];

/** Chaque référence `["chemin/du/doc.pdf", "Libellé"]` du parcours. */
function referencesPdf(node, out = []) {
  if (Array.isArray(node)) {
    if (node.length === 2 && typeof node[0] === 'string' && typeof node[1] === 'string') {
      if (node[0].toLowerCase().endsWith('.pdf')) out.push(node[0]);
      return out;
    }
    for (const v of node) referencesPdf(v, out);
  } else if (node && typeof node === 'object') {
    for (const v of Object.values(node)) referencesPdf(v, out);
  }
  return out;
}

/** `05_UCLA_EE236B_…/duality.pdf` → `05-duality.pdf`. Court, stable, sans accent. */
function nomServi(chemin) {
  const parts = chemin.split('/');
  const slug = (s) =>
    s
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^A-Za-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
  const code = slug(parts[0].split('_')[0]);
  const base = slug(parts[parts.length - 1].replace(/\.pdf$/i, ''));
  return `${code}-${base}.pdf`;
}

if (!existsSync(source)) {
  console.error(`Dossier de cours introuvable : ${source}`);
  console.error('Passez son chemin en argument : node scripts/importer-cours.mjs "<chemin>"');
  process.exit(1);
}

/* Le parcours servi à l'application est `src/content/parcours.json` — celui
   que `build-opt-track.mjs` régénère. Le `parcours.json` de la racine en est
   une version ancienne et plus courte : lire celui-là ne ramènerait qu'un
   tiers des documents. */
const parcours = JSON.parse(readFileSync(join(root, 'src', 'content', 'parcours.json'), 'utf8'));
const chemins = [...new Set(referencesPdf(parcours))].filter((p) => !EXCLUS.some((re) => re.test(p)));

mkdirSync(target, { recursive: true });

const mapping = {};
let copies = 0;
let octets = 0;
const manquants = [];

for (const chemin of chemins) {
  const nom = nomServi(chemin);
  if (Object.values(mapping).includes(`cours/${nom}`)) {
    console.error(`Collision de nom servi : ${nom} (${chemin})`);
    process.exit(1);
  }
  const src = join(source, chemin);
  if (!existsSync(src)) {
    manquants.push(chemin);
    continue;
  }
  copyFileSync(src, join(target, nom));
  mapping[chemin] = `cours/${nom}`;
  copies += 1;
  octets += statSync(src).size;
}

writeFileSync(table, `${JSON.stringify(mapping, null, 2)}\n`, 'utf8');

console.log(`${copies} PDF copiés dans public/cours/ (${(octets / 1048576).toFixed(1)} Mo)`);
console.log(`Table écrite : src/content/cours-locaux.json`);
if (manquants.length) {
  console.log(`\n${manquants.length} document(s) introuvable(s) — ils resteront ouverts via Drive :`);
  for (const m of manquants) console.log(`  ${m}`);
}
