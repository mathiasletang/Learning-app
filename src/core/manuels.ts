/* =========================================================================
   Les manuels — un livre n'est pas une fiche.

   Cent trente ou cent soixante-seize pages ne se convertissent pas en
   Markdown : ce n'est pas un texte de deux heures qu'on relit avant un
   examen, c'est un ouvrage qu'on parcourt. Il reste donc un PDF, servi par
   l'application, et l'application en donne le sommaire — on ouvre au
   chapitre voulu plutôt qu'à la première page.

   Les numéros de page sont ceux du PDF, relevés dans le document lui-même,
   ce qui permet le fragment `#page=`. Un test le vérifie.
   ========================================================================= */

import { localPdfUrl } from './config';
import type { SubjectId } from './subjects';

export interface ChapitreManuel {
  numero: number;
  titre: string;
  /** Page du PDF où commence le chapitre. */
  page: number;
}

export interface PartieManuel {
  /** Vide quand le manuel n'a qu'une suite de chapitres. */
  titre: string;
  chapitres: ChapitreManuel[];
}

export interface Manuel {
  /** Clé de catalogue — résolue par `LOCAL_PDFS`. */
  path: string;
  titre: string;
  lead: string;
  pages: number;
  parties: PartieManuel[];
}

const COURS_PYTHON: Manuel = {
  path: 'CODE/Le Cours Python.pdf',
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
  ],
};

const COURS_DAUPHINE: Manuel = {
  path: 'FIN/Dauphine — Produits et marchés financiers.pdf',
  titre: 'Produits et marchés financiers',
  lead:
    "Le cours de finance de marché de L3 à Paris-Dauphine (Philippe Gillet), pris en note et annoté : des fondements des marchés jusqu'aux marchés dérivés, en passant par le monétaire, l'obligataire et les actions.",
  pages: 133,
  parties: [
    {
      titre: '',
      chapitres: [
        { numero: 1, titre: 'Les fondements des marchés financiers', page: 1 },
        { numero: 2, titre: 'Rentabilité, risque et valeurs fondamentales des titres', page: 10 },
        { numero: 3, titre: 'Le marché monétaire', page: 30 },
        { numero: 4, titre: 'Organisation et fonctionnement des différents marchés', page: 48 },
        { numero: 5, titre: 'Le marché obligataire', page: 65 },
        { numero: 6, titre: 'Le marché des actions', page: 92 },
        { numero: 7, titre: 'La vie sur les marchés financiers', page: 104 },
        { numero: 8, titre: 'Les marchés dérivés', page: 115 },
      ],
    },
  ],
};

/** Le manuel qui ouvre une page de matière, quand elle en a un. */
export const MANUELS: Partial<Record<SubjectId, Manuel>> = {
  code: COURS_PYTHON,
  cfa: COURS_DAUPHINE,
};

/** Tous les chapitres d'un manuel, à plat et dans l'ordre. */
export function chapitresDe(manuel: Manuel): ChapitreManuel[] {
  return manuel.parties.flatMap((p) => p.chapitres);
}

/**
 * URL d'un manuel, ouvert à une page donnée. Le fragment `#page=` est honoré
 * par les lecteurs PDF de Chrome, Firefox et Android ; ailleurs le document
 * s'ouvre à sa première page — on perd le saut, jamais le document.
 */
export function urlManuel(manuel: Manuel, page?: number): string {
  const base = localPdfUrl(manuel.path);
  if (!base) return '';
  return page ? `${base}#page=${page}` : base;
}
