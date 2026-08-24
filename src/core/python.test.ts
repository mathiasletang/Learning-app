import { describe, it, expect } from 'vitest';
import { existsSync, statSync } from 'node:fs';
import { COURS_PYTHON, COURS_PYTHON_PATH, chapitresPython, urlCoursPython } from './python';
import { LOCAL_PDFS, localPdfUrl } from './config';
import PARCOURS from '@/content/parcours.json';

describe('Le Cours Python — le manuel servi en PDF', () => {
  it('est bien le fichier déposé dans public/cours', () => {
    const rel = LOCAL_PDFS[COURS_PYTHON_PATH];
    expect(rel).toBe('cours/Cours_Python_complet.pdf');
    const fichier = `public/${rel}`;
    expect(existsSync(fichier), fichier).toBe(true);
    // Un PDF de 1,4 Mo : s'il tombe à quelques octets, c'est un pointeur LFS.
    expect(statSync(fichier).size).toBeGreaterThan(1_000_000);
  });

  it('donne un sommaire complet, sans trou ni page hors du document', () => {
    const chapitres = chapitresPython();
    expect(chapitres).toHaveLength(24);
    expect(chapitres.map((c) => c.numero)).toEqual(Array.from({ length: 24 }, (_, i) => i + 1));
    let precedente = 0;
    for (const c of chapitres) {
      expect(c.page, `chapitre ${c.numero}`).toBeGreaterThan(precedente);
      expect(c.page, `chapitre ${c.numero}`).toBeLessThanOrEqual(COURS_PYTHON.pages);
      expect(c.titre.length, `chapitre ${c.numero}`).toBeGreaterThan(3);
      precedente = c.page;
    }
    expect(COURS_PYTHON.parties).toHaveLength(4);
  });

  it('ouvre le document à la page du chapitre', () => {
    expect(localPdfUrl(COURS_PYTHON_PATH)).toContain('cours/Cours_Python_complet.pdf');
    expect(urlCoursPython()).not.toContain('#');
    expect(urlCoursPython(5)).toMatch(/cours\/Cours_Python_complet\.pdf#page=5$/);
    expect(urlCoursPython(169)).toMatch(/#page=169$/);
  });

  it('est aussi accroché au parcours Python, pas seulement aux Documents', () => {
    const etapes = (PARCOURS as Parcours).code.phases.flatMap((p) => p.steps);
    const citantes = etapes.filter((s) => (s.r ?? []).some(([chemin]) => chemin === COURS_PYTHON_PATH));
    expect(citantes.length).toBeGreaterThanOrEqual(4);
    // Le premier renvoi est celui de l'installation : le manuel ouvre la route.
    expect(citantes[0].id).toBe('k0b');
  });
});

interface Parcours {
  code: { phases: { steps: { id: string; r?: string[][] }[] }[] };
}
