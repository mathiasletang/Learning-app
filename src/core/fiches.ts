/* =========================================================================
   Fiches de révision — registre et chargement.

   Chaque fiche est un document Markdown + KaTeX produit à partir d'un cours
   source (jamais inventé) : définitions numérotées du cours, méthodes de
   résolution pas à pas, pièges, Ultimate Review, Active Recall, flashcards.
   Les métadonnées vivent ici ; le contenu dans src/content/fiches/*.md.
   ========================================================================= */

import type { SubjectId } from './subjects';

export type FicheDifficulty = 'fondamental' | 'intermediaire' | 'avance';

export interface FicheMeta {
  id: string;
  file: string;
  title: string;
  /** Chapitre du cours source. */
  chapter: string;
  subject: SubjectId;
  course: string;
  difficulty: FicheDifficulty;
  /** Temps d'étude estimé, en minutes. */
  minutes: number;
  concepts: string[];
}

export const DIFFICULTY_LABEL: Record<FicheDifficulty, string> = {
  fondamental: 'Fondamental',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
};

const COURSE_FACCANONI = 'Faccanoni · Optimisation L3';
const COURSE_GARRIGOS = 'Garrigos · Optimisation L3';

export const FICHES: FicheMeta[] = [
  {
    id: 'fonctions',
    file: '01-fonctions.md',
    title: 'Fonctions de plusieurs variables',
    chapter: 'Chapitre 1',
    subject: 'maths',
    course: COURSE_FACCANONI,
    difficulty: 'fondamental',
    minutes: 45,
    concepts: ['Domaine de définition', 'Fonctions partielles', 'Lignes de niveau'],
  },
  {
    id: 'limites',
    file: '02-limites.md',
    title: 'Limites et continuité',
    chapter: 'Chapitre 2',
    subject: 'maths',
    course: COURSE_FACCANONI,
    difficulty: 'intermediaire',
    minutes: 75,
    concepts: ['Normes et boules', 'Restrictions à des courbes', 'Coordonnées polaires', 'Prolongement'],
  },
  {
    id: 'derivees',
    file: '03-derivees.md',
    title: 'Dérivées partielles, gradient et chain rule',
    chapter: 'Chapitre 3 · §3.1',
    subject: 'maths',
    course: COURSE_FACCANONI,
    difficulty: 'avance',
    minutes: 90,
    concepts: ['Dérivées partielles', 'Gradient', 'Règle de la chaîne', 'Dérivée directionnelle', 'Élasticité'],
  },
  {
    id: 'differentiabilite',
    file: '04-differentiabilite.md',
    title: 'Différentiabilité, plan tangent et hessienne',
    chapter: 'Chapitre 3 · §3.2–3.3',
    subject: 'maths',
    course: COURSE_FACCANONI,
    difficulty: 'avance',
    minutes: 90,
    concepts: ['Différentiabilité', 'Plan tangent', 'Schwarz', 'Hessienne', 'Convexité'],
  },
  {
    id: 'implicites',
    file: '05-implicites.md',
    title: 'Fonctions implicites',
    chapter: 'Chapitre 3 · §3.4',
    subject: 'maths',
    course: COURSE_FACCANONI,
    difficulty: 'intermediaire',
    minutes: 45,
    concepts: ['Théorème des fonctions implicites', 'Dérivation implicite', 'Tangente à un niveau'],
  },
  {
    id: 'extrema-libres',
    file: '06-extrema-libres.md',
    title: 'Extrema libres',
    chapter: 'Chapitre 4 · §4.1',
    subject: 'maths',
    course: COURSE_FACCANONI,
    difficulty: 'avance',
    minutes: 120,
    concepts: ['Weierstrass', 'Fermat', 'Points critiques', 'Condition du 2ᵉ ordre', 'Moindres carrés'],
  },
  {
    id: 'extrema-lies',
    file: '07-extrema-lies.md',
    title: 'Extrema liés : Lagrange et réduction',
    chapter: 'Chapitre 4 · §4.2',
    subject: 'maths',
    course: COURSE_FACCANONI,
    difficulty: 'avance',
    minutes: 120,
    concepts: ['Multiplicateurs de Lagrange', 'Lagrangien', 'Méthode de réduction', 'Interprétation de λ'],
  },
  {
    id: 'taylor',
    file: '08-taylor.md',
    title: 'Taylor et développements limités',
    chapter: 'Annexe A',
    subject: 'maths',
    course: COURSE_FACCANONI,
    difficulty: 'intermediaire',
    minutes: 60,
    concepts: ['Linéarisation', 'Polynôme de Taylor', "Borne d'erreur", 'DL usuels'],
  },
  {
    id: 'boite-a-outils',
    file: '09-boite-a-outils.md',
    title: 'Boîte à outils : matrices, Taylor, quadratiques',
    chapter: 'Chapitre I',
    subject: 'maths',
    course: COURSE_GARRIGOS,
    difficulty: 'intermediaire',
    minutes: 60,
    concepts: ['Rayleigh', 'Définie positive', 'Taylor-Lagrange', 'Fonctions quadratiques'],
  },
  {
    id: 'existence',
    file: '10-existence.md',
    title: 'Existence de minimiseurs et coercivité',
    chapter: 'Chapitre II',
    subject: 'maths',
    course: COURSE_GARRIGOS,
    difficulty: 'avance',
    minutes: 75,
    concepts: ['Infimum vs minimum', 'Coercivité', "Théorème d'existence", "Conditions d'optimalité"],
  },
  {
    id: 'convexite',
    file: '11-convexite.md',
    title: 'Optimisation convexe et forte convexité',
    chapter: 'Chapitre III',
    subject: 'maths',
    course: COURSE_GARRIGOS,
    difficulty: 'avance',
    minutes: 90,
    concepts: ['Caractérisations de la convexité', 'Min local = global', 'Forte convexité', 'Existence + unicité'],
  },
  {
    id: 'descente-gradient',
    file: '12-descente-gradient.md',
    title: 'Algorithmes : descente de gradient et Newton',
    chapter: 'Chapitre IV',
    subject: 'maths',
    course: COURSE_GARRIGOS,
    difficulty: 'avance',
    minutes: 90,
    concepts: ['Directions de descente', 'Méthode du gradient', 'Newton', 'Conditionnement'],
  },
  {
    id: 'kkt',
    file: '13-kkt.md',
    title: 'Optimisation sous contraintes : Lagrange-KKT',
    chapter: 'Chapitre V',
    subject: 'maths',
    course: COURSE_GARRIGOS,
    difficulty: 'avance',
    minutes: 120,
    concepts: ['Contraintes actives', 'Qualification', 'Stationnarité', 'Complémentarité', 'Système KKT'],
  },
];

const ficheFiles = import.meta.glob('../content/fiches/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function markdownOf(file: string): string {
  const entry = Object.entries(ficheFiles).find(([path]) => path.endsWith(`/${file}`));
  return entry ? entry[1] : '';
}

export interface Fiche extends FicheMeta {
  markdown: string;
}

let _fiches: Fiche[] | null = null;

export function getFiches(): Fiche[] {
  if (_fiches) return _fiches;
  _fiches = FICHES.map((meta) => ({ ...meta, markdown: markdownOf(meta.file) })).filter(
    (f) => f.markdown.length > 0,
  );
  return _fiches;
}

export function fichesOfSubject(subject: SubjectId): Fiche[] {
  return getFiches().filter((f) => f.subject === subject);
}

export function getFiche(id: string): Fiche | undefined {
  return getFiches().find((f) => f.id === id);
}
