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
  Certaines formules dépassent quoi qu'on fasse (une récurrence de Bellman ne
  se coupe pas en deux) : elles défilent, et un voile d'ombre apparaît du côté
  où il reste à lire — deux dégradés, l'un `local` l'autre `scroll`, sans
  script. Le voile n'est possible que sur un bloc qui a **son propre fond**
  (`pre`, `.katex-display`) : peint sur un tableau, il laisserait une plaque
  plate sur le dégradé de la page. Les tableaux gardent la barre de
  défilement, rendue visible (`scrollbar-width: thin`).
- Un comparatif à deux entrées est un **tableau**, pas un bloc de code aligné
  à l'espace. Le bloc de code est réservé aux schémas ASCII.
- Interligne : 1,82 pour la prose pure, **1,7 pour les fiches**
  (`.prose--fiche`). Les paragraphes truffés de maths en ligne ajoutent leur
  propre hauteur et se délitent à 1,82.

## Les fiches : d'où elles viennent, comment on en ajoute

Les fiches 1 à 23 ont été écrites dans l'application ; leurs métadonnées sont
dans `FICHES_ECRITES` (`src/core/fiches.ts`). Les suivantes ont été rédigées
ailleurs et **importées**.

- L'entrée est le **HTML d'origine**, dans `public/cours/fiches/*.html`. Il
  porte le LaTeX en clair (`$…$`, MathJax) : c'est ce qui rend l'import fidèle.
  Le PDF imprimé depuis ce HTML, lui, ne sert à rien — Chrome y trace les
  formules en **courbes**, aucun texte n'en ressort. Une fiche sans son HTML
  n'est pas importable, il faut le demander.
- `npm run fiches` écrit `src/content/fiches/NN-*.md` et le registre
  `src/content/fiches-importees.json`. **Les deux sont générés** : on corrige
  `scripts/importer-fiches.mjs`, jamais le résultat.
- Le convertisseur ne réécrit rien. Il traduit les conventions :
  `<h2 data-prio="must">` → `## 🔴 …`, `<p class="cal piege">` → un paragraphe
  `⚠️` (que `decorateFiche` encadre), `<div class="cal …">` → un
  `<div class="callout" data-kind="…">` avec son étiquette, `<details class="cor">`
  → le `<details>` des fiches écrites à la main, et un `$$…$$` pris au milieu
  d'un paragraphe est isolé sur sa ligne — sinon il ne serait pas encadré.
- **Le contenu se charge à la demande.** Cent soixante-six fiches font plus de
  huit méga-octets de Markdown : `import.meta.glob` sans `eager`, un morceau
  par fiche. Ne pas revenir à un chargement global « pour simplifier ».
- Le HTML d'origine est une **source de compilation**, pas une page : il est
  exclu du précache du service worker (`globIgnores`, `vite.config.ts`).
- La garantie qui compte est dans `fiches.test.ts` : les 66 000 formules du
  corpus sont composées par KaTeX avec `throwOnError`. Ces fiches viennent d'un
  rendu MathJax, plus permissif — une macro inconnue s'afficherait en rouge en
  pleine page.

### Les quatre pièges de la conversion, tous déjà payés

1. **Le dollar qui n'est pas une formule.** « coût 2 $ », l'opérateur R `$<-`,
   un montant `\$` : un `$` isolé ouvre une formule fantôme qui avale la moitié
   de la fiche. Hors formule il s'échappe (`\$`) ; et toute recherche de
   formule doit refuser de démarrer sur un `$` déjà échappé — d'où les
   `(?<!\\)` du convertisseur **et** du test.
2. **Le Markdown ne se relit pas sur la ligne d'ouverture d'un bloc HTML.** Un
   `<details><summary>**Étape 1 — $c$…**</summary>` afficherait ses astérisques
   et son LaTeX en clair. Les résumés qui portent du balisage descendent dans
   un paragraphe entouré de lignes vides (`details--riche`).
3. **Un accent grave dans un accent grave.** Les fiches R citent `` `[`(x, 2) ``
   ; la clôture d'un code en ligne compte un accent de plus que la plus longue
   suite intérieure.
4. **KaTeX n'accepte qu'un `\tag` par bloc.** Deux formules numérotées côte à
   côte deviennent deux `\text{(n)}`, posés contre leur formule.

Ces quatre-là ne se voient pas dans le diff : ils se voient dans le rendu. D'où
le test qui regarde le **texte tel qu'il arrive à l'écran** — ni `**`, ni `$$`,
ni `katex-error` — en plus du test qui compose les formules.

## Couleurs d'accent — ce n'est pas une incohérence

- `--accent` (indigo `#4148c8`) : l'application, la navigation, la marque.
- `--m-opt`, `--d-en`, `--m-cfa`… : la **matière** en cours. Les onglets d'une
  page de matière prennent la couleur de cette matière, volontairement.

Ne pas « harmoniser » les deux — **dans les modes Clair, Sombre et
Automatique**. C'est la règle d'origine, et elle tient.

Le mode **Personnalisé** l'écarte, sur décision de l'utilisateur : la couleur
choisie emporte aussi les couleurs de matière (`paletteVars`,
`src/core/palette.ts`), pour que la page entière soit à lui. Ne pas
« rétablir » les couleurs de matière dans ce mode en croyant corriger un
oubli.

Ce qui est **sémantique** échappe aux deux régimes et ne suit jamais une
couleur préférée : `--positive`, `--negative`, `--warn` (mise en garde,
priorité haute) et `--warn-soft` (priorité moyenne). Un avertissement doit se
lire comme un avertissement. Ne pas rebrancher `prose.css` sur `--m-cfa` /
`--m-fin` : c'est précisément ce qui a été démêlé.

## Planning et tâches — un seul système

`src/core/planning.ts` (pur, testé) + `src/modules/planning/`. Quatre vues d'un
même jeu de données : Jour, Semaine, Mois, Tâches. Pas deux entrées de
navigation.

- Le planning n'est pas réservé à l'étude : `PLAN_SUBJECTS` porte un drapeau
  `study`. Cours et TD, personnel, sport et rendez-vous se posent dans la
  journée mais **ne comptent ni dans les objectifs ni dans `db.timeLogs`** —
  gonfler le temps d'étude avec un rendez-vous chez le dentiste le rendrait
  inutile. `autre` reste du côté travail : c'est le fourre-tout d'une séance
  posée sans préciser la matière.
- La semaine est une vraie grille horaire au-dessus de 900 px, une liste par
  jour en dessous : sept colonnes d'heures sur un téléphone sont illisibles.
- Une séance hors étude n'a ni « Commencer » ni chronomètre : elle se coche.

- Une tâche placée dans la journée **devient** une séance (`PlanEvent.taskId`).
  Terminer la séance coche la tâche — `completeEvent()` dans `actions.ts` est le
  seul endroit qui noue les deux. Ne pas dupliquer cette logique dans l'UI.
- Une tâche déjà planifiée ne s'affiche pas **aussi** dans les tâches du jour :
  la séance la représente. Sinon la journée paraît deux fois plus chargée.
- Le temps d'une séance terminée part dans `db.timeLogs`, le relevé que lisait
  déjà le Suivi. Pas de second compteur de temps.
- Les chiffres du jour (`dayGoals`) se déduisent des séances posées, des tâches
  dues et du temps enregistré. **Ne pas inventer d'objectif** : s'il n'y a rien
  de prévu, les jauges restent à zéro.
- Une tâche non faite n'est jamais supprimée ni déplacée d'office : on propose
  de la reporter. Une tâche récurrente cochée fait naître son occurrence
  suivante.

## Mobile

Tout écran se vérifie à **390 px**, pas seulement en 1440.

- Un tableau à deux colonnes s'empile (`.table--kv`) plutôt que d'étrangler sa
  première colonne.
- La barre collante `.topbar` doit rester lisible pendant le défilement :
  fond ≥ 96 % d'opacité, et repli opaque via `@supports not (backdrop-filter)`.
- Les titres portent `scroll-margin-top` pour ne pas atterrir sous la barre.

## Où vivent les PDF

Le catalogue compte 718 documents, **663 Mo**. Ils ne sont pas dans le repo, et
il ne faut pas les y mettre : git conserve chaque version pour toujours, ne
compresse pas les PDF, et Netlify reclone le dépôt à chaque build — y compris
pour chaque aperçu de PR.

Trois niveaux, dans cet ordre (`openResource`, `src/app/actions.ts`) :

1. une URL `http(s)` → ouverture directe ;
2. un PDF de `public/cours/` → servi par l'application ;
3. sinon → recherche par nom dans le dossier Drive de l'utilisateur.

Le niveau 2 contient **uniquement les documents que `parcours.json` pointe
explicitement** — une trentaine, 19 Mo. `npm run cours` les copie depuis le
dossier de cours local et régénère `src/content/cours-locaux.json`. À relancer
après toute modification de `parcours.json` qui ajoute ou retire une référence.

Ne jamais héberger les notes Schweser du CFA : produit commercial de Kaplan,
sur un dépôt et des aperçus publics. `scripts/importer-cours.mjs` les exclut,
un test le vérifie. Seule exception, décidée par l'utilisateur pour son dépôt
passé en privé : le QuickSheet (`CFA/2024 L1 Quick Sheet.pdf`), écrit à la
main dans `config.ts`. Même prudence pour `11_Articles-de-reference` (articles
de revues). MIT OCW est en CC BY-NC-SA, redistribuable avec attribution.

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
