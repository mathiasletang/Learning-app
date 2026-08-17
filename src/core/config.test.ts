import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LOCAL_PDFS, localPdfUrl, driveSearchUrl } from './config';

/** Chaque référence `["chemin/doc.pdf", "Libellé"]` du parcours. */
function referencesPdf(node: unknown, out: string[] = []): string[] {
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

/* Le parcours servi à l'application, pas le `parcours.json` de la racine —
   celui-ci est une version ancienne et trois fois plus courte. */
const parcours = JSON.parse(readFileSync(join(process.cwd(), 'src/content/parcours.json'), 'utf8'));
const refs = new Set(referencesPdf(parcours));

describe('documents du parcours — hébergement local', () => {
  it('ne sert aucun fichier absent de public/cours/', () => {
    for (const rel of Object.values(LOCAL_PDFS)) {
      const f = join(process.cwd(), 'public', rel);
      expect(() => readFileSync(f), `public/${rel} manquant`).not.toThrow();
    }
  });

  it('ne sert que des documents que le parcours pointe — pas d’orphelins', () => {
    const codes = new Set([
      // Les entrées écrites à la main dans config.ts.
      '00_L3_Toulon_Faccanoni/cours_L3_Faccanoni.pdf',
      '00_L3_Universite-Paris-Cite_Garrigos/cours_optim_L3.pdf',
      'CFA/2024 L1 Quick Sheet.pdf',
    ]);
    for (const path of Object.keys(LOCAL_PDFS)) {
      if (codes.has(path)) continue;
      expect(refs.has(path), `${path} est servi mais n’est référencé nulle part`).toBe(true);
    }
  });

  it('laisse les notes Schweser du CFA à Drive — produit commercial de Kaplan', () => {
    /* Seule exception, décidée explicitement par l'utilisateur (dépôt privé) :
       le QuickSheet, déposé à la main dans public/cours/. Les SchweserNotes
       (les cinq volumes) ne doivent jamais être servies par l'application. */
    const exception = 'CFA/2024 L1 Quick Sheet.pdf';
    for (const p of [...refs].filter((x) => x.startsWith('CFA/') && x !== exception)) {
      expect(localPdfUrl(p)).toBeNull();
    }
    for (const p of Object.keys(LOCAL_PDFS)) {
      if (p === exception) continue;
      expect(p.startsWith('CFA/'), `${p} ne doit pas être hébergé`).toBe(false);
    }
  });

  it('retombe sur une recherche Drive pour un document non hébergé', () => {
    expect(localPdfUrl('99_Inexistant/pas-importe.pdf')).toBeNull();
    expect(driveSearchUrl('ROBook.pdf')).toContain('drive.google.com');
  });
});
