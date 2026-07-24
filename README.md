# Atelier

Application personnelle d'apprentissage — **optimisation mathématique, mathématiques financières, CFA Level I et vocabulaire anglais**.

PWA locale-first (installable sur ordinateur **et** iPad), hors-ligne complet, sans compte ni serveur. Les données de progression vivent dans le navigateur (IndexedDB) et sont exportables/importables en JSON.

## Pile technique

- **Vite + React + TypeScript**
- **PWA** : `vite-plugin-pwa` (service worker, manifeste, hors-ligne)
- **Stockage** : IndexedDB via **Dexie** (progression) — le contenu pédagogique est importé au build
- **Maths** : **KaTeX** embarqué (aucun CDN)
- **Markdown** : `markdown-it` + KaTeX
- **Police** : **Inter** auto-hébergée (`@fontsource-variable/inter`)
- **État** : Zustand · **Tests** : Vitest + Testing Library

## Démarrer

```bash
npm install
npm run dev        # serveur de développement
npm run build      # build de production (PWA)
npm run preview    # prévisualiser le build
npm run test       # tests (logique métier + rendu)
npm run typecheck  # vérification des types
```

## Contenu

Le contenu pédagogique réel (897 QCM, 929 mots, 1 262 documents, 3 parcours, 5 cours) vit dans **`src/content/`** :

```
src/content/
├── qcm.json            # 897 questions (opt, fin, cfa, pre, eco)
├── vocabulaire.json    # 929 cartes (finfr, verbs, nouns)
├── catalogue.json      # 1 262 documents
├── parcours.json       # 3 parcours (opt, fin, cfa)
└── cours/*.md          # 5 cours (Markdown + LaTeX)
```

C'est la source unique consommée par le chargeur (`src/core/content.ts`) et embarquée au build (donc disponible hors-ligne). Pour mettre à jour le contenu, remplace ces fichiers (le format est décrit dans `SCHEMA_DONNEES.md`) et relance `npm run build`.

Le prototype de référence `ATELIER.html` reste à la racine ; il ne sert que de repère visuel et fonctionnel.

## Architecture

```
src/
├── app/          # bootstrap, routing, layout, store (Zustand), actions de progression
├── core/         # logique métier PURE et testée
│   ├── srs.ts            # SM-2 (répétition espacée)
│   ├── gamification.ts   # XP, niveaux, badges
│   ├── quiz.ts           # mélange des options, difficulté
│   ├── db.ts             # IndexedDB (Dexie), export/import
│   ├── content.ts        # chargement de data/*.json + cours/*.md
│   ├── markdown.ts       # Markdown + KaTeX + corrigés repliables
│   └── meta.ts, date.ts, open.ts, types.ts
├── modules/      # un module par écran (dashboard, tracks, courses, quiz,
│                 #   flashcards, vocab, library, notes, stats, planner)
├── ui/           # design system (Button, Card, Tag, Ring, Modal…)
├── content/      # contenu pédagogique (qcm, vocab, catalogue, parcours, cours)
└── styles/       # tokens (thème clair/sombre), styles globaux, prose
```

La **logique métier** (SM-2, XP/niveaux, mélange des options, calculs de progression) est isolée dans `core/` et couverte par des tests (`npm run test`).

## Installation sur l'appareil

- **iPad (Safari)** : ouvrir l'app → Partager → « Sur l'écran d'accueil ». Lancement plein écran, hors-ligne.
- **Windows (Edge/Chrome)** : icône d'installation dans la barre d'adresse.

Pense à **exporter** régulièrement ta progression (Planning → Données) : c'est le filet de sécurité, notamment face à la purge de stockage de Safari iOS.
