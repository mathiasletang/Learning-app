/* =========================================================================
   Reconstruit le parcours « Optimisation » en une vraie progression
   L3 → M1 → M2, chaque étape adossée à un PDF réel du catalogue.

   Relancer après toute modification du catalogue :  node scripts/build-opt-track.mjs
   Le script échoue si une ressource pointe vers un fichier absent — c'est
   volontaire : mieux vaut casser le build qu'afficher un lien mort.
   ========================================================================= */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalogue = JSON.parse(readFileSync(resolve(root, 'src/content/catalogue.json'), 'utf8'));
const parcoursPath = resolve(root, 'src/content/parcours.json');
const parcours = JSON.parse(readFileSync(parcoursPath, 'utf8'));

/* Raccourcis de dossiers */
const FAC = '00_L3_Toulon_Faccanoni';
const L3 = '00_L3_Universite-Paris-Cite_Garrigos';
const DAU = '08_Cours-en-francais/Dauphine_Royer';
const EE236A = '04_UCLA_EE236A_Programmation-lineaire';
const BOYD = '01_Reference_Boyd_Vandenberghe';
const EE236B = '05_UCLA_EE236B_Optimisation-convexe';
const ALLAIRE = '08_Cours-en-francais/Polytechnique_Allaire';
const DOSSAL = '08_Cours-en-francais/Bordeaux_Dossal';
const ENS1 = '09_ENS-Paris_Aspremont/M1_ENS';
const EE364B = '03_Stanford_EE364b_Optimisation-convexe-II';
const EE236C = '06_UCLA_EE236C_Methodes-premier-ordre';
const ENS2 = '09_ENS-Paris_Aspremont/M2_MVA';
const BERT = '07_MIT-OpenCourseWare/6-253_Analyse-convexe-et-optimisation_Bertsekas';
const DP = '07_MIT-OpenCourseWare/6-231_Programmation-dynamique-et-controle-stochastique';

/** Ressource PDF : `p(dossier, fichier, libellé)`. Vérifiée contre le catalogue. */
const known = new Set(catalogue.flatMap(([f, files]) => files.map(([n]) => `${f}/${n}`)));
const missing = [];
const p = (folder, file, label) => {
  const path = `${folder}/${file}`;
  if (!known.has(path)) missing.push(path);
  return [path, label];
};
const cours = (id, label) => [`cours:${id}`, label];
const qcm = (bank, label) => [`qcm:${bank}`, label];

const POLY_FAC = 'cours_L3_Faccanoni.pdf';
const POLY_L3 = 'cours_optim_L3.pdf';
const POLY_DAU = '00_POLY_Methodes-doptimisation-pour-la-science-des-donnees.pdf';
const LIVRE = '00_LIVRE_Boyd-Vandenberghe_Convex-Optimization.pdf';

const phases = [
  /* ------------------------------- L3 --------------------------------- */
  {
    id: 'oL30',
    t: 'L3 · Point de départ — Faccanoni',
    d: "Le cours central : un recueil d'exercices entièrement corrigés (Gloria Faccanoni, Université de Toulon, 217 p.). Tout part des fonctions de plusieurs variables et monte jusqu'aux extrema liés — c'est par là qu'on reprend. Il s'ouvre directement dans l'application.",
    h: 50,
    steps: [
      {
        id: 'l30a',
        t: 'Chapitre 1 — Fonctions de plusieurs variables (p. 3-14)',
        r: [p(FAC, POLY_FAC, 'Faccanoni — chapitre 1'), cours('notations', 'Décodeur de notations')],
      },
      {
        id: 'l30b',
        t: 'Chapitre 2 — Limites et continuité, normes (p. 15-26)',
        r: [p(FAC, POLY_FAC, 'Faccanoni — chapitre 2')],
      },
      {
        id: 'l30c',
        t: 'Chapitre 3.1-3.2 — Dérivées partielles, gradient, différentiabilité (p. 27-40)',
        r: [p(FAC, POLY_FAC, 'Faccanoni — chapitre 3'), qcm('pre', 'QCM Prérequis')],
      },
      {
        id: 'l30d',
        t: 'Chapitre 3.3-3.4 — Hessienne et fonctions implicites (p. 41-88)',
        r: [p(FAC, POLY_FAC, 'Faccanoni — chapitre 3 (suite)'), cours('s0', 'Série 0 — Remise en route')],
      },
      {
        id: 'l30e',
        t: 'Chapitre 4.1 — Extrema libres (p. 89-96)',
        r: [p(FAC, POLY_FAC, 'Faccanoni — extrema libres')],
      },
      {
        id: 'l30f',
        t: 'Chapitre 4.2 — Extrema liés, multiplicateurs de Lagrange (p. 97-176)',
        r: [p(FAC, POLY_FAC, 'Faccanoni — extrema liés'), qcm('opt', 'QCM Optimisation')],
      },
      {
        id: 'l30g',
        t: 'Annexe A — Polynômes de Taylor et développements limités (p. 177+)',
        r: [p(FAC, POLY_FAC, 'Faccanoni — annexe A')],
      },
    ],
  },
  {
    id: 'oL3a',
    t: 'L3 · Le cours de référence',
    d: "Une fois Faccanoni digéré, le polycopié de Guillaume Garrigos (Université Paris Cité, 144 p.) reprend les mêmes notions avec plus de théorie et introduit la dualité. Il s'ouvre lui aussi directement dans l'application.",
    h: 45,
    steps: [
      {
        id: 'l3a1',
        t: 'Chapitre I — Algèbre linéaire et calcul différentiel (p. 9-28)',
        r: [p(L3, POLY_L3, 'Polycopié L3 — chapitre I'), cours('notations', 'Décodeur de notations'), qcm('pre', 'QCM Prérequis')],
      },
      {
        id: 'l3a2',
        t: "Chapitre II — Existence de minimiseurs et conditions d'optimalité (p. 29-42)",
        r: [p(L3, POLY_L3, 'Polycopié L3 — chapitre II'), cours('s0', 'Série 0 — Remise en route')],
      },
      {
        id: 'l3a3',
        t: 'Chapitre III — Optimisation convexe (p. 43-58)',
        r: [p(L3, POLY_L3, 'Polycopié L3 — chapitre III'), cours('s1', 'Série 1 — Convexité')],
      },
      {
        id: 'l3a4',
        t: 'Chapitre IV — Algorithmes de minimisation sans contrainte (p. 59-82)',
        r: [p(L3, POLY_L3, 'Polycopié L3 — chapitre IV')],
      },
      {
        id: 'l3a5',
        t: 'Chapitre V — Optimisation sous contraintes, Lagrange-KKT (p. 83-144)',
        r: [p(L3, POLY_L3, 'Polycopié L3 — chapitre V'), cours('s2', 'Série 2 — KKT'), qcm('opt', 'QCM Optimisation')],
      },
    ],
  },
  {
    id: 'oL3b',
    t: 'L3 · Dauphine — la référence pratique',
    d: 'Le cours de Clément Royer (Dauphine) reprend les mêmes notions côté pratique, avec douze séances courtes et surtout des TD entièrement corrigés. À faire en parallèle du polycopié.',
    h: 40,
    steps: [
      { id: 'l3b1', t: "Lire le polycopié de Royer en entier (57 p.)", r: [p(DAU, POLY_DAU, 'Royer — Méthodes d’optimisation')] },
      {
        id: 'l3b2',
        t: 'Séances 1 à 4 — bases et conditions d’optimalité',
        r: [p(DAU, 'Cours_seance01.pdf', 'Séance 1'), p(DAU, 'Cours_seance02.pdf', 'Séance 2'), p(DAU, 'Cours_seance04.pdf', 'Séance 4')],
      },
      {
        id: 'l3b3',
        t: 'TD 1 — chercher, puis lire le corrigé',
        r: [p(DAU, 'ZZ_TD01_CORRIGE.pdf', 'TD 1 corrigé')],
      },
      {
        id: 'l3b4',
        t: 'Séances 5 à 8 — convexité et méthodes de descente',
        r: [p(DAU, 'Cours_seance05.pdf', 'Séance 5'), p(DAU, 'Cours_seance06.pdf', 'Séance 6'), p(DAU, 'Cours_seance07.pdf', 'Séance 7'), p(DAU, 'Cours_seance08.pdf', 'Séance 8')],
      },
      { id: 'l3b5', t: 'TD 2 — chercher, puis lire le corrigé', r: [p(DAU, 'ZZ_TD02_CORRIGE.pdf', 'TD 2 corrigé')] },
      {
        id: 'l3b6',
        t: 'Séances 9 à 12 — contraintes et applications',
        r: [p(DAU, 'Cours_seance09.pdf', 'Séance 9'), p(DAU, 'Cours_seance10.pdf', 'Séance 10'), p(DAU, 'Cours_seance11.pdf', 'Séance 11'), p(DAU, 'Cours_seance12.pdf', 'Séance 12')],
      },
      { id: 'l3b7', t: 'TD 3 — chercher, puis lire le corrigé', r: [p(DAU, 'ZZ_TD03_CORRIGE.pdf', 'TD 3 corrigé')] },
      {
        id: 'l3b8',
        t: 'Se tester : examen Dauphine 2024-2025 en conditions réelles',
        r: [p(DAU, 'ZZ_Examen_2024-2025.pdf', 'Examen 2024-2025'), p(DAU, 'ZZ_Projet.pdf', 'Projet')],
      },
    ],
  },
  {
    id: 'oL3c',
    t: 'L3 · Programmation linéaire',
    d: "Le versant « recherche opérationnelle » du niveau L3 : polyèdres, simplexe, dualité. C'est le pont le plus direct vers les applications économiques.",
    h: 35,
    steps: [
      { id: 'l3c1', t: 'Introduction et modélisation', r: [p(EE236A, 'intro.pdf', 'EE236A — introduction'), p(EE236A, 'pwl.pdf', 'Fonctions affines par morceaux')] },
      { id: 'l3c2', t: 'Polyèdres et géométrie du problème', r: [p(EE236A, 'polyhedra.pdf', 'Polyèdres'), p(EE236A, 'convexity.pdf', 'Convexité')] },
      { id: 'l3c3', t: 'Dualité en programmation linéaire', r: [p(EE236A, 'duality.pdf', 'Dualité'), p(EE236A, 'duality2.pdf', 'Dualité (suite)')] },
      { id: 'l3c4', t: 'Algorithme du simplexe', r: [p(EE236A, 'simplex.pdf', 'Simplexe')] },
      { id: 'l3c5', t: 'Applications : réseaux, contrôle, ordonnancement', r: [p(EE236A, 'networks.pdf', 'Réseaux'), p(EE236A, 'control.pdf', 'Contrôle'), p(EE236A, 'ilp.pdf', 'Programmation en nombres entiers')] },
      { id: 'l3c6', t: 'Feuille d’exercices complète', r: [p(EE236A, 'ZZ_EXERCICES_problems.pdf', 'Exercices EE236A'), qcm('opt', 'QCM Optimisation')] },
    ],
  },

  /* ------------------------------- M1 --------------------------------- */
  {
    id: 'oM1a',
    t: 'M1 · Boyd & Vandenberghe — le socle international',
    d: "La référence mondiale. Les chapitres 2 à 5 constituent le cœur du M1 : ensembles convexes, fonctions convexes, mise en forme des problèmes, dualité. À lire avec les transparents en soutien.",
    h: 120,
    steps: [
      { id: 'm1a1', t: 'Chapitre 2 — Convex sets', r: [p(BOYD, LIVRE, 'Boyd — le livre'), p(EE236B, 'sets.pdf', 'Vandenberghe — ensembles')] },
      { id: 'm1a2', t: 'Chapitre 3 — Convex functions', r: [p(BOYD, LIVRE, 'Boyd — le livre'), p(EE236B, 'functions.pdf', 'Vandenberghe — fonctions')] },
      { id: 'm1a3', t: 'Chapitre 4 — Convex optimization problems', r: [p(BOYD, LIVRE, 'Boyd — le livre'), p(EE236B, 'problems.pdf', 'Vandenberghe — problèmes'), p(EE236B, 'geom.pdf', 'Programmes géométriques')] },
      { id: 'm1a4', t: 'Chapitre 5 — Duality (le morceau difficile)', r: [p(BOYD, LIVRE, 'Boyd — le livre'), p(EE236B, 'duality.pdf', 'Vandenberghe — dualité'), cours('s2', 'Série 2 — KKT')] },
      { id: 'm1a5', t: 'Exercices supplémentaires de Boyd', r: [p(BOYD, '03_EXERCICES-supplementaires-Boyd.pdf', 'Exercices Boyd')] },
      { id: 'm1a6', t: 'Auto-évaluation sur la banque Optimisation', r: [qcm('opt', 'QCM Optimisation')] },
    ],
  },
  {
    id: 'oM1b',
    t: 'M1 · Approfondir en français',
    d: 'Deux polycopiés français de niveau M1 pour consolider : Allaire (Polytechnique) pour la rigueur analytique, Dossal (Bordeaux) pour une synthèse compacte.',
    h: 55,
    steps: [
      { id: 'm1b1', t: 'Allaire — MAP435, le cours d’optimisation complet (240 p.)', r: [p(ALLAIRE, '00_POLY_MAP435_Optimisation.pdf', 'Allaire — MAP435')] },
      { id: 'm1b2', t: 'Allaire — chapitres 9 et 10 : optimisation et algorithmes', r: [p(ALLAIRE, 'MAP431_Analyse-numerique-et-optimisation_chapitre09.pdf', 'MAP431 — ch. 9'), p(ALLAIRE, 'MAP431_Analyse-numerique-et-optimisation_chapitre10.pdf', 'MAP431 — ch. 10')] },
      { id: 'm1b3', t: 'Dossal — polycopié M1, en entier (60 p.)', r: [p(DOSSAL, 'POLY_Optimisation-M1_Dossal.pdf', 'Dossal — Optimisation M1')] },
    ],
  },
  {
    id: 'oM1c',
    t: 'M1 · Algorithmes et calcul',
    d: "Le versant numérique : méthodes sans contrainte, points intérieurs, et la mise en pratique avec CVXPY. C'est ici que Python devient utile.",
    h: 60,
    steps: [
      { id: 'm1c1', t: 'Minimisation sans contrainte et méthode de Newton', r: [p(EE236B, 'unconstrained.pdf', 'Sans contrainte'), p(EE236B, 'equality.pdf', 'Contraintes d’égalité')] },
      { id: 'm1c2', t: 'Méthodes de barrière et points intérieurs', r: [p(EE236B, 'barrier.pdf', 'Barrière'), p(ENS1, 'InteriorPointENS.pdf', 'ENS — points intérieurs')] },
      { id: 'm1c3', t: 'Convexité vue par l’ENS (131 p.)', r: [p(ENS1, 'ConvexityENS.pdf', 'ENS — convexité')] },
      { id: 'm1c4', t: 'Installer CVXPY et résoudre les problèmes de Boyd', r: [p(BOYD, '13_Cours-court_4_Python-CVXPY.pdf', 'Boyd — Python / CVXPY'), p(BOYD, '12_Cours-court_3_Programmation-convexe-disciplinee.pdf', 'Programmation convexe disciplinée')] },
      { id: 'm1c5', t: 'Applications statistiques et approximation', r: [p(EE236B, 'approx.pdf', 'Approximation'), p(EE236B, 'stat.pdf', 'Estimation statistique'), p(ENS1, 'ApplicationsStats.pdf', 'ENS — applications stats')] },
    ],
  },

  /* ------------------------------- M2 --------------------------------- */
  {
    id: 'oM2a',
    t: 'M2 · Méthodes du premier ordre',
    d: "Le cœur de la recherche appliquée moderne : sous-gradients, méthodes proximales, accélération. Indispensable dès qu'on touche à l'apprentissage statistique.",
    h: 70,
    steps: [
      { id: 'm2a1', t: 'Gradient et sous-gradients', r: [p(EE236C, 'gradient.pdf', 'Gradient'), p(EE236C, 'subgradients.pdf', 'Sous-gradients')] },
      { id: 'm2a2', t: 'Opérateurs proximaux et gradient proximal', r: [p(EE236C, 'proxop.pdf', 'Opérateur proximal'), p(EE236C, 'proxgrad.pdf', 'Gradient proximal')] },
      { id: 'm2a3', t: 'Accélération : FISTA', r: [p(EE236C, 'fista.pdf', 'FISTA')] },
      { id: 'm2a4', t: 'Méthodes primales-duales et lissage', r: [p(EE236C, 'pd.pdf', 'Primal-dual'), p(EE236C, 'smoothing.pdf', 'Lissage')] },
      { id: 'm2a5', t: 'Méthodes stochastiques et quasi-Newton', r: [p(EE236C, 'sgmethod.pdf', 'Gradient stochastique'), p(EE236C, 'qnewton.pdf', 'Quasi-Newton')] },
    ],
  },
  {
    id: 'oM2b',
    t: 'M2 · Stanford EE364b et ENS/MVA',
    d: 'Le second cours de Boyd et le cours du master MVA : décomposition, méthodes de localisation, optimisation robuste, applications SDP.',
    h: 75,
    steps: [
      { id: 'm2b1', t: 'Méthodes de sous-gradient et de localisation', r: [p(EE364B, 'subgrad_method_notes.pdf', 'EE364b — sous-gradient'), p(EE364B, 'localization_methods_notes.pdf', 'Localisation')] },
      { id: 'm2b2', t: 'Décomposition et méthodes duales', r: [p(EE364B, 'decomposition_notes.pdf', 'Décomposition'), p(EE364B, 'decomposition_apps_slides.pdf', 'Applications')] },
      { id: 'm2b3', t: 'ADMM et opérateurs monotones', r: [p(EE364B, 'admm_slides.pdf', 'ADMM'), p(EE364B, 'monotone_slides.pdf', 'Opérateurs monotones')] },
      { id: 'm2b4', t: 'Optimisation robuste', r: [p(EE364B, 'robust_notes.pdf', 'Robuste — notes'), p(EE364B, 'robust_slides.pdf', 'Robuste — transparents')] },
      { id: 'm2b5', t: 'MVA — dualité et méthodes du premier ordre', r: [p(ENS2, 'Duality.pdf', 'MVA — dualité'), p(ENS2, 'FirstOrderMethods.pdf', 'MVA — premier ordre'), p(ENS2, 'FirstOrderMethodsPartTwo.pdf', 'MVA — premier ordre (2)')] },
      { id: 'm2b6', t: 'MVA — relaxations SDP et applications', r: [p(ENS2, 'SDPapps.pdf', 'MVA — SDP'), p(EE364B, 'sdp-relax_slides.pdf', 'Relaxations SDP')] },
    ],
  },
  {
    id: 'oM2c',
    t: 'M2 · Théorie et ouverture',
    d: "Pour aller au bout : l'analyse convexe de Bertsekas, la programmation dynamique, et les monographies de Nemirovski. C'est le niveau recherche.",
    h: 65,
    steps: [
      { id: 'm2c1', t: 'Bertsekas — analyse convexe et optimisation (MIT 6.253)', r: [p(BERT, 'MIT6_253S12_lec01.pdf', 'MIT 6.253 — cours 1'), p(BERT, 'MIT6_253S12_hw01.pdf', 'Devoir 1'), p(BERT, 'MIT6_253S12_hw01_sol.pdf', 'Devoir 1 — corrigé')] },
      { id: 'm2c2', t: 'Programmation dynamique et contrôle stochastique (MIT 6.231)', r: [p(DP, 'MIT6_231F15_Complete_Slide.pdf', 'MIT 6.231 — transparents complets')] },
      { id: 'm2c3', t: 'Optimisation stochastique (MVA)', r: [p(ENS2, 'Short_stochastic.pdf', 'MVA — optimisation stochastique')] },
      { id: 'm2c4', t: 'Lire une monographie de Nemirovski au choix', r: [p('12_Nemirovski_Georgia-Tech', '1311.6765.pdf', 'Nemirovski — monographie')] },
    ],
  },
];

if (missing.length) {
  console.error('✗ Ressources introuvables dans le catalogue :');
  for (const m of [...new Set(missing)]) console.error('   ', m);
  process.exit(1);
}

parcours.opt.phases = phases;
parcours.opt.heures = phases.reduce((n, ph) => n + ph.h, 0);
parcours.opt.cible = 'De la L3 au M2 en optimisation convexe';

writeFileSync(parcoursPath, JSON.stringify(parcours, null, 1), 'utf8');

const steps = phases.reduce((n, ph) => n + ph.steps.length, 0);
const res = phases.reduce((n, ph) => n + ph.steps.reduce((m, s) => m + (s.r?.length ?? 0), 0), 0);
console.log(`✓ ${phases.length} phases, ${steps} étapes, ${res} ressources, ${parcours.opt.heures} h`);
