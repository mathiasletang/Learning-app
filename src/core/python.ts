/* =========================================================================
   Le Cours Python — un manuel, pas une fiche.

   Cent soixante-seize pages ne se convertissent pas en Markdown : ce n'est
   pas une fiche de révision, c'est un livre. Il reste donc un PDF, servi par
   l'application (`public/cours/`), et l'application en donne le sommaire —
   on ouvre au chapitre voulu plutôt qu'à la première page.

   Le sommaire vient de la page 2 du document. Les numéros de page imprimés
   sont ceux du PDF (vérifié chapitre par chapitre), ce qui permet le
   fragment `#page=`.
   ========================================================================= */

import { localPdfUrl } from './config';

export interface ChapitrePython {
  numero: number;
  titre: string;
  /** Page du PDF où commence le chapitre. */
  page: number;
}

export interface PartiePython {
  titre: string;
  chapitres: ChapitrePython[];
}

/** Clé de catalogue du manuel — résolue par `LOCAL_PDFS`. */
export const COURS_PYTHON_PATH = 'CODE/Le Cours Python.pdf';

export const COURS_PYTHON = {
  path: COURS_PYTHON_PATH,
  titre: 'Le Cours Python',
  lead:
    'Un manuel en 24 chapitres construit à partir de la série « Python Tutorials » de Corey Schafer — réorganisé, traduit et modernisé pour Python 3.12, avec 116 exercices corrigés à coloration mathématique et financière.',
  pages: 176,
  parties: [
    {
      titre: 'Partie I — Démarrer',
      chapitres: [{ numero: 1, titre: 'Installer Python et lancer son premier programme', page: 5 }],
    },
    {
      titre: 'Partie II — Les fondamentaux',
      chapitres: [
        { numero: 2, titre: 'Variables et chaînes de caractères (strings)', page: 11 },
        { numero: 3, titre: 'Nombres : entiers et flottants', page: 19 },
        { numero: 4, titre: 'Listes, tuples et ensembles (sets)', page: 25 },
        { numero: 5, titre: 'Dictionnaires : clé-valeur', page: 34 },
        { numero: 6, titre: 'Conditions et booléens', page: 40 },
        { numero: 7, titre: 'Boucles et itérations', page: 47 },
        { numero: 8, titre: 'Les fonctions', page: 54 },
        { numero: 9, titre: 'Modules et bibliothèque standard', page: 61 },
      ],
    },
    {
      titre: 'Partie III — Python au quotidien',
      chapitres: [
        { numero: 10, titre: 'pip : installer des paquets tiers', page: 69 },
        { numero: 11, titre: 'Environnements virtuels : venv', page: 74 },
        { numero: 12, titre: 'Lire et écrire des fichiers', page: 79 },
        { numero: 13, titre: 'Gérer les erreurs : try / except', page: 86 },
        { numero: 14, titre: 'Les compréhensions', page: 94 },
        { numero: 15, titre: 'CSV : données tabulaires', page: 101 },
        { numero: 16, titre: 'JSON : données structurées et APIs', page: 109 },
        { numero: 17, titre: 'Dates et heures : datetime', page: 117 },
        { numero: 18, titre: 'Naviguer dans le système : os', page: 125 },
      ],
    },
    {
      titre: 'Partie IV — Programmation orientée objet',
      chapitres: [
        { numero: 19, titre: 'POO 1 : classes et instances', page: 134 },
        { numero: 20, titre: 'POO 2 : variables de classe', page: 141 },
        { numero: 21, titre: 'POO 3 : classmethods et staticmethods', page: 148 },
        { numero: 22, titre: "POO 4 : l'héritage", page: 154 },
        { numero: 23, titre: 'POO 5 : méthodes spéciales (dunder)', page: 162 },
        { numero: 24, titre: 'POO 6 : properties', page: 169 },
      ],
    },
  ] as PartiePython[],
};

/** Tous les chapitres à plat, dans l'ordre. */
export function chapitresPython(): ChapitrePython[] {
  return COURS_PYTHON.parties.flatMap((p) => p.chapitres);
}

/**
 * URL du manuel, ouvert à une page donnée. Le fragment `#page=` est honoré
 * par les lecteurs PDF de Chrome, Firefox et Android ; ailleurs le document
 * s'ouvre à sa première page — on perd le saut, jamais le document.
 */
export function urlCoursPython(page?: number): string {
  const base = localPdfUrl(COURS_PYTHON_PATH);
  if (!base) return '';
  return page ? `${base}#page=${page}` : base;
}
