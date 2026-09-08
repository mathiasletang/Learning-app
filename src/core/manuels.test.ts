import { describe, it, expect } from 'vitest';
import { existsSync, statSync } from 'node:fs';
import { MANUELS, chapitresDe, urlManuel } from './manuels';
import { LOCAL_PDFS, localPdfUrl } from './config';
import PARCOURS from '@/content/parcours.json';

const COURS_PYTHON = MANUELS.code!;
const COURS_DAUPHINE = MANUELS.cfa!;

describe('Les manuels — des livres servis en PDF, ouverts au chapitre', () => {
  it('désignent chacun un fichier réellement présent dans public/cours', () => {
    for (const manuel of Object.values(MANUELS)) {
      const rel = LOCAL_PDFS[manuel.path];
      expect(rel, manuel.titre).toBeTruthy();
      const fichier = `public/${rel}`;
      expect(existsSync(fichier), fichier).toBe(true);
      /* Un renommage depuis l'interface GitHub a déjà réduit un de ces PDF à
         deux octets : la taille est ce qui distingue un document d'un fichier
         vidé par accident. */
      expect(statSync(fichier).size, fichier).toBeGreaterThan(500_000);
    }
  });

  it('donnent un sommaire complet, sans trou ni page hors du document', () => {
    for (const manuel of Object.values(MANUELS)) {
      const chapitres = chapitresDe(manuel);
      expect(chapitres.length, manuel.titre).toBeGreaterThan(0);
      expect(chapitres.map((c) => c.numero)).toEqual(
        Array.from({ length: chapitres.length }, (_, i) => i + 1),
      );
      let precedente = 0;
      for (const c of chapitres) {
        expect(c.page, `${manuel.titre} — chapitre ${c.numero}`).toBeGreaterThan(precedente);
        expect(c.page, `${manuel.titre} — chapitre ${c.numero}`).toBeLessThanOrEqual(manuel.pages);
        expect(c.titre.length, `${manuel.titre} — chapitre ${c.numero}`).toBeGreaterThan(3);
        precedente = c.page;
      }
    }
    expect(chapitresDe(COURS_PYTHON)).toHaveLength(24);
    expect(chapitresDe(COURS_DAUPHINE)).toHaveLength(8);
  });

  it('ouvrent le document à la page du chapitre', () => {
    expect(localPdfUrl(COURS_PYTHON.path)).toContain('cours/Cours_Python_complet.pdf');
    expect(localPdfUrl(COURS_DAUPHINE.path)).toContain('cours/dauphine_finance_marche.pdf');
    expect(urlManuel(COURS_PYTHON)).not.toContain('#');
    expect(urlManuel(COURS_PYTHON, 5)).toMatch(/Cours_Python_complet\.pdf#page=5$/);
    expect(urlManuel(COURS_DAUPHINE, 115)).toMatch(/dauphine_finance_marche\.pdf#page=115$/);
  });

  it('accroche le manuel Python au parcours, pas seulement aux Documents', () => {
    const etapes = (PARCOURS as Parcours).code.phases.flatMap((p) => p.steps);
    const citantes = etapes.filter((s) => (s.r ?? []).some(([chemin]) => chemin === COURS_PYTHON.path));
    expect(citantes.length).toBeGreaterThanOrEqual(4);
    // Le premier renvoi est celui de l'installation : le manuel ouvre la route.
    expect(citantes[0].id).toBe('k0b');
  });
});

interface Parcours {
  code: { phases: { steps: { id: string; r?: string[][] }[] }[] };
}
