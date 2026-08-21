/* =========================================================================
   Fiches de révision — registre et chargement.

   Chaque fiche est un document Markdown + KaTeX produit à partir d'un cours
   source (jamais inventé) : définitions numérotées du cours, méthodes de
   résolution pas à pas, pièges, Ultimate Review, Active Recall, flashcards.
   Les métadonnées vivent ici ; le contenu dans src/content/fiches/*.md.
   ========================================================================= */

import type { SubjectId } from './subjects';
import importees from '@/content/fiches-importees.json';

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
const COURSE_QUICKSHEET = 'Schweser · QuickSheet CFA Level 1 (2024)';

/** Les vingt-trois premières fiches, écrites à la main dans l'application. */
const FICHES_ECRITES: FicheMeta[] = [
  {
    id: 'fonctions',
    file: '01-fonctions.md',
    title: 'Fonctions de plusieurs variables',
    chapter: 'Chapitre 1',
    subject: 'maths',
    course: COURSE_FACCANONI,
    difficulty: 'fondamental',
    minutes: 60,
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
    minutes: 100,
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
    minutes: 120,
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
    minutes: 120,
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
    minutes: 60,
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
    minutes: 150,
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
    minutes: 150,
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
    minutes: 80,
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
    minutes: 80,
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
    minutes: 100,
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
    minutes: 120,
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
    minutes: 120,
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
    minutes: 150,
    concepts: ['Contraintes actives', 'Qualification', 'Stationnarité', 'Complémentarité', 'Système KKT'],
  },
  {
    id: 'cfa-ethique',
    file: '14-cfa-ethique.md',
    title: 'Éthique : le Code, les Standards et GIPS',
    chapter: 'Ethics · p. 1',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'fondamental',
    minutes: 60,
    concepts: ['Standards I–VII', 'Sous-standards', 'GIPS', 'Composites', 'Vérification'],
  },
  {
    id: 'cfa-quant',
    file: '15-cfa-quant.md',
    title: 'Méthodes quantitatives : rendements, probabilités, tests',
    chapter: 'Quantitative Methods · p. 1–2',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'intermediaire',
    minutes: 120,
    concepts: ['HPR', 'Moyennes', 'Variance de portefeuille', 'Loi normale', 'Tests', 'Régression'],
  },
  {
    id: 'cfa-economie',
    file: '16-cfa-economie.md',
    title: 'Économie : marchés, cycle, politique, change',
    chapter: 'Economics · p. 2',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'fondamental',
    minutes: 80,
    concepts: ['Structures de marché', 'Cycle', 'Politique monétaire', 'Balance des paiements', 'Change'],
  },
  {
    id: 'cfa-fsa',
    file: '17-cfa-fsa.md',
    title: 'Analyse des états financiers : cadre, ratios, DuPont',
    chapter: 'Financial Statement Analysis · p. 2–3',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'avance',
    minutes: 150,
    concepts: ['EPS dilué', 'CFO', 'Ratios', 'Cash conversion cycle', 'DuPont', 'LIFO/FIFO'],
  },
  {
    id: 'cfa-corporate',
    file: '18-cfa-corporate.md',
    title: 'Corporate Issuers : gouvernance, investissement, WACC',
    chapter: 'Corporate Issuers · p. 3',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'intermediaire',
    minutes: 80,
    concepts: ['Gouvernance', 'NPV/IRR', 'ROIC', 'Options réelles', 'WACC', 'Structure du capital'],
  },
  {
    id: 'cfa-portfolio',
    file: '19-cfa-portfolio.md',
    title: 'Portfolio Management : frontière, CAPM, biais',
    chapter: 'Portfolio Management · p. 4',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'intermediaire',
    minutes: 100,
    concepts: ['IPS', 'Frontière efficiente', 'CAPM/SML', 'Sharpe vs Treynor', 'Biais comportementaux'],
  },
  {
    id: 'cfa-equity',
    file: '20-cfa-equity.md',
    title: 'Equity : marchés, efficience, DDM et multiples',
    chapter: 'Equity Investments · p. 4–5',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'intermediaire',
    minutes: 120,
    concepts: ['Marge', 'Indices', 'EMH', 'Porter/PESTLE', 'Gordon', 'Multiples'],
  },
  {
    id: 'cfa-fixed-income',
    file: '21-cfa-fixed-income.md',
    title: 'Fixed Income : pricing, rendements, duration, crédit',
    chapter: 'Fixed Income · p. 5–6',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'avance',
    minutes: 150,
    concepts: ['Full/flat price', 'YTM et spreads', 'Duration', 'Convexité', 'Crédit', 'Titrisation'],
  },
  {
    id: 'cfa-derives',
    file: '22-cfa-derives.md',
    title: 'Dérivés : arbitrage, forwards, options, parité',
    chapter: 'Derivatives · p. 6',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'intermediaire',
    minutes: 80,
    concepts: ['Prix unique', 'Valeur du forward', 'FRA/Swaps', 'Options', 'Put-call parity'],
  },
  {
    id: 'cfa-alternatifs',
    file: '23-cfa-alternatifs.md',
    title: 'Alternatifs : structures, frais, hedge funds, réel',
    chapter: 'Alternative Investments · p. 6',
    subject: 'cfa',
    course: COURSE_QUICKSHEET,
    difficulty: 'fondamental',
    minutes: 80,
    concepts: ['Cycle de vie', 'Frais et waterfalls', 'Hedge funds', 'Private capital', 'Commodities'],
  },
];

/**
 * Les fiches importées : produites par `npm run fiches` à partir du HTML
 * d'origine (public/cours/fiches/*.html), qui porte le LaTeX en clair.
 * `src/content/fiches-importees.json` est généré — il ne s'édite pas à la main.
 * Les valeurs de `subject` et `difficulty` sont vérifiées par les tests.
 */
const FICHES_IMPORTEES = importees as FicheMeta[];

export const FICHES: FicheMeta[] = [...FICHES_ECRITES, ...FICHES_IMPORTEES];

/* Le contenu se charge à la demande : quatre-vingt-cinq fiches représentent
   plus de trois méga-octets de Markdown, qui n'ont rien à faire dans le paquet
   d'ouverture. Une fiche ouverte tient dans son propre morceau, mis en cache
   par le service worker au premier passage. */
const ficheFiles = import.meta.glob('../content/fiches/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

const cache = new Map<string, string>();

/** Le Markdown d'une fiche. Vide si le fichier a disparu du dossier. */
export async function ficheMarkdown(file: string): Promise<string> {
  const enCache = cache.get(file);
  if (enCache !== undefined) return enCache;
  const entry = Object.entries(ficheFiles).find(([path]) => path.endsWith(`/${file}`));
  const md = entry ? await entry[1]() : '';
  cache.set(file, md);
  return md;
}

export function getFiches(): FicheMeta[] {
  return FICHES;
}

export function fichesOfSubject(subject: SubjectId): FicheMeta[] {
  return FICHES.filter((f) => f.subject === subject);
}

export function getFiche(id: string): FicheMeta | undefined {
  return FICHES.find((f) => f.id === id);
}
