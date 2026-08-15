# Learning-app — consignes de travail

Application personnelle d'apprentissage (React + Vite + TypeScript, SPA, hors-ligne).
Ce fichier est lu automatiquement par Claude Code. Il fixe ce qui a déjà été
tranché, pour ne pas le retrancher à chaque session.

## Le principe qui commande tous les autres

**Le design est typographique, pas décoratif.** Hiérarchie par la taille, la
graisse, la couleur d'encre et le blanc — jamais par un ornement ajouté.
Quand une information a besoin d'un signe, ce signe se dessine en CSS avec les
jetons existants. Il ne se colle pas dans le texte.

## Interdits

### Pas d'émoji dans le produit

Ni dans les titres, ni en tête de paragraphe, ni dans une cellule de tableau,
ni dans un libellé d'interface. C'est la règle la plus enfreinte : un émoji est
rapide à écrire dans du Markdown, et c'est précisément le problème.

Un émoji couleur au milieu d'une page en niveaux de gris est le seul élément
criard de l'écran, et il ne s'aligne sur aucune ligne de base — il décale
optiquement le titre qui le suit.

À la place :

| Intention | Solution |
|---|---|
| Priorité d'un concept | `<h2 data-prio="must\|high\|mid\|low">` → pastille CSS (`prose.css`) |
| Mise en garde | paragraphe `.callout.callout--warn`, ou `.warn-mark` en plein texte |
| Rubrique récurrente | rien — le titre suffit |

Le contenu Markdown des fiches utilise encore les conventions 🔴 🟠 🟡 ⚠️ pour
la commodité d'écriture : `decorateFiche()` (`src/core/markdown.ts`) les
traduit en attributs stylables au rendu. **Ne jamais afficher un émoji brut :
si un nouveau signe apparaît dans le contenu, l'ajouter à `decorateFiche()`,
pas à la feuille de style comme un caractère.**

### Pas de valeur en dur

Espacements, couleurs, rayons, durées : uniquement des jetons de
`src/styles/tokens.css`. Une nouvelle couleur se déclare dans les **deux**
thèmes (clair et sombre) avant d'être utilisée.

### Pas de `localStorage` direct

Le stockage passe par `src/app/store.ts` et `src/core/db.ts`.

## Rendu long (fiches et cours)

- La feuille de référence est `src/styles/prose.css`. Y ajouter les styles de
  contenu — pas de CSS de prose dans les modules.
- **Un séparateur `---` juste avant un `##` fait double emploi** : `.prose h2`
  porte déjà un filet supérieur. Les mettre tous les deux produisait ~170 px de
  blanc et deux traits. Ne pas réintroduire de `---` avant un titre dans
  `src/content/**`.
- **Une formule en bloc doit se voir.** `$$…$$` est encadré (fond, filet
  d'accent, corps supérieur d'un cran) : on doit retrouver « la formule » en
  parcourant la page, sans lire. Une formule qui a exactement le poids d'un mot
  en gras est un bug.
- **Rien ne doit être rogné.** Blocs de code, tableaux et formules larges :
  vérifier `scrollWidth === clientWidth`, en 1440 px **et** en 390 px. Un
  contenu coupé sans indice de défilement est une perte d'information.
- Un comparatif à deux entrées est un **tableau**, pas un bloc de code aligné
  à l'espace. Le bloc de code est réservé aux schémas ASCII.
- Interligne : 1,82 pour la prose pure, **1,7 pour les fiches**
  (`.prose--fiche`). Les paragraphes truffés de maths en ligne ajoutent leur
  propre hauteur et se délitent à 1,82.

## Couleurs d'accent — ce n'est pas une incohérence

- `--accent` (indigo `#4148c8`) : l'application, la navigation, la marque.
- `--m-opt`, `--d-en`, `--m-cfa`… : la **matière** en cours. Les onglets d'une
  page de matière prennent la couleur de cette matière, volontairement.

Ne pas « harmoniser » les deux.

## Mobile

Tout écran se vérifie à **390 px**, pas seulement en 1440.

- Un tableau à deux colonnes s'empile (`.table--kv`) plutôt que d'étrangler sa
  première colonne.
- La barre collante `.topbar` doit rester lisible pendant le défilement :
  fond ≥ 96 % d'opacité, et repli opaque via `@supports not (backdrop-filter)`.
- Les titres portent `scroll-margin-top` pour ne pas atterrir sous la barre.

## Avant de dire que c'est fini

1. `npm run typecheck`
2. `npm test`
3. `npm run build`
4. **Regarder le résultat.** Une capture en 1440 px et une en 390 px, sur la
   page modifiée. Un changement visuel qui n'a pas été vu n'a pas été vérifié —
   la moitié des défauts de cette liste étaient invisibles dans le diff et
   sautaient aux yeux à l'écran.

## Contenu pédagogique

Les fiches sont produites **à partir d'un cours source, jamais inventées** :
définitions et théorèmes numérotés du cours, avec la référence (`déf. 4.6`,
`thm. 4.7`, pages). Ne pas ajouter de résultat qui n'est pas dans la source.

## Langue

Interface, contenu, commentaires de code et messages de commit : en français.
