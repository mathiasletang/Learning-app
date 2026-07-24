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

## Brancher le vrai contenu

Le dépôt contient un **jeu de données factice** conforme au schéma, dans `src/content/`, pour que l'app tourne immédiatement. Pour utiliser le contenu réel :

1. Dépose les fichiers fournis dans `SPEC_DEVELOPPEUR/data/` :
   `qcm.json`, `vocabulaire.json`, `catalogue.json`, `parcours.json`, et `cours/*.md`.
2. Lance `npm run sync-content` (copie vers `src/content/`).
3. `npm run build` (ou `npm run dev`).

Le prototype de référence `ATELIER.html` peut rester à la racine ; il ne sert que de repère visuel et fonctionnel.

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
├── content/      # copie build du contenu (remplacée par sync-content)
└── styles/       # tokens (thème clair/sombre), styles globaux, prose
```

La **logique métier** (SM-2, XP/niveaux, mélange des options, calculs de progression) est isolée dans `core/` et couverte par des tests (`npm run test`).

## Installation sur l'appareil

- **iPad (Safari)** : ouvrir l'app → Partager → « Sur l'écran d'accueil ». Lancement plein écran, hors-ligne.
- **Windows (Edge/Chrome)** : icône d'installation dans la barre d'adresse.

Pense à **exporter** régulièrement ta progression (Planning → Données) : c'est le filet de sécurité, notamment face à la purge de stockage de Safari iOS.
