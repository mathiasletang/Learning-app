/* Copie le contenu réel fourni (SPEC_DEVELOPPEUR/data/) vers src/content/,
   d'où l'application l'importe au build. À lancer après avoir déposé les vrais
   fichiers : `npm run sync-content`. Les fichiers factices sont alors remplacés.

   Le loader (src/core/content.ts) importe depuis src/content/ ; ce script est le
   seul point de couplage avec l'emplacement des données fournies. */
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(root, 'SPEC_DEVELOPPEUR/data');
const DEST = resolve(root, 'src/content');

if (!existsSync(SRC)) {
  console.error(`✗ Introuvable : ${SRC}`);
  console.error('  Dépose les fichiers de données fournis dans SPEC_DEVELOPPEUR/data/ puis relance.');
  process.exit(1);
}

const JSON_FILES = ['qcm.json', 'vocabulaire.json', 'catalogue.json', 'parcours.json'];
let copied = 0;

for (const f of JSON_FILES) {
  const from = resolve(SRC, f);
  if (existsSync(from)) {
    cpSync(from, resolve(DEST, f));
    console.log('✓', f);
    copied++;
  } else {
    console.warn('… absent, ignoré :', f);
  }
}

const coursSrc = resolve(SRC, 'cours');
if (existsSync(coursSrc)) {
  mkdirSync(resolve(DEST, 'cours'), { recursive: true });
  for (const f of readdirSync(coursSrc)) {
    if (f.endsWith('.md')) {
      cpSync(resolve(coursSrc, f), resolve(DEST, 'cours', f));
      console.log('✓ cours/' + f);
      copied++;
    }
  }
}

console.log(`\n${copied} fichier(s) synchronisé(s). Lance « npm run build » ou « npm run dev ».`);
