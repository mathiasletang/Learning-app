# Commencer ici

Ce fichier répond à une seule question : **dans quel ordre travailler pour ne pas être perdu.**

---

## 1. Où tu en es, concrètement

Tu m'as dit : dérivées, gradient, matrices, valeurs propres, hessienne, formes quadratiques — tu maîtrises, mais tu n'y as pas touché depuis deux mois. Lagrangien et KKT : jamais vraiment vu.

C'est une bonne nouvelle, et elle a une conséquence directe : **tu n'as pas besoin d'un programme de remise à niveau de cinq mois.** Tu as déjà les prérequis de l'optimisation convexe. Il te manque essentiellement une chose — la dualité lagrangienne et les conditions KKT — plus une semaine de dérouillage.

L'optimisation convexe demande :

- algèbre linéaire (produit scalaire, valeurs propres, matrices symétriques, formes quadratiques) → **tu as**
- calcul différentiel à plusieurs variables (gradient, hessienne, Taylor à l'ordre 2) → **tu as**
- rien d'autre.

Elle ne demande **ni probabilités, ni statistiques, ni intégration**. C'est un point que le plan que tu m'as transmis rate complètement, et je vais y revenir.

---

## 2. Ce que vaut le programme de ChatGPT

Tu m'as demandé de trier. Je le fais franchement.

### Ce qui est juste et qu'on garde

| Élément | Pourquoi c'est bon |
|---|---|
| **Strang, MIT 18.06** (algèbre linéaire) | Le meilleur cours d'algèbre linéaire qui existe en accès libre. À garder même si tu maîtrises : les chapitres sur les matrices symétriques et les formes quadratiques sont exactement ce qui sert en optimisation. |
| **MIT 18.02** (calcul multivariable) | Correct pour le dérouillage gradient/hessienne. |
| **Boyd, *Convex Optimization*** | C'est le bon livre. Vraiment. |
| **Dossal (Bordeaux)** | Bon point d'entrée en français. |
| **CVXPY / Python** | Excellente idée, et sous-estimée : coder un problème d'optimisation est le test le plus honnête de savoir si tu l'as compris. |
| **L'honnêteté sur les durées** | 4 à 6 mois pour un socle solide, c'est réaliste. Beaucoup de plans mentent là-dessus. |
| **« N'achète aucun autre livre »** | Bon conseil. Tu as déjà de quoi travailler deux ans. |

### Ce qui est faux ou inutile pour toi

**a) Le séquencement te fait perdre quatre mois.**

Le plan place l'optimisation au mois 5, après analyse → algèbre → probabilités → statistiques. C'est un ordre logique si tu pars de zéro. Tu ne pars pas de zéro. Et surtout : les probabilités et les statistiques ne sont **pas** des prérequis de l'optimisation convexe déterministe. Elles le deviennent seulement pour l'optimisation stochastique, qui est un chapitre avancé. Rien ne t'empêche d'ouvrir Boyd cette semaine.

**b) La majorité des URL ne mènent nulle part d'exploitable.**

`stat.berkeley.edu`, `math.ethz.ch`, `lse.ac.uk`, `princeton.edu`, `maths.cam.ac.uk`, `math.uchicago.edu`… ce sont des pages d'accueil de départements. Il n'y a pas de cours derrière, juste des annuaires et des annonces de séminaires. Sur la soixantaine de liens de la liste, une douzaine pointent vers quelque chose que tu peux réellement étudier. Le reste donne l'illusion d'une bibliothèque.

C'est d'ailleurs ce qu'on a constaté en construisant ta banque : les portails généralistes n'ont rien donné, et tout le contenu est venu de pages personnelles d'enseignants.

**c) Les liens Springer ne sont pas des livres gratuits.**

Shreve I & II, Nesterov, Glasserman, Lamberton & Lapeyre, Brigo & Mercurio : les liens `link.springer.com` sont payants (ou nécessitent un accès institutionnel). Ils sont présentés dans la section « livres gratuits indispensables ». Ce n'est pas le cas. Vérifie via ta bibliothèque universitaire — beaucoup d'universités ont un abonnement Springer, et tu y auras accès légalement.

**d) « Faire au moins 500 exercices » ne veut rien dire.**

Le nombre n'est pas la variable qui compte. Ce qui compte, c'est de refaire le *même type* d'exercice jusqu'à ce qu'il devienne automatique. Vingt exercices sur les conditions KKT, repris trois fois à une semaine d'intervalle, valent mieux que cinq cents exercices survolés une fois.

**e) Il n'y a aucun mécanisme de vérification.**

Tu l'as identifié toi-même : « juste les cours comme ça, c'est difficile ». Le plan ne propose rien pour savoir si tu as compris. C'est le trou principal, et c'est ce que les fichiers d'exercices de ce dossier viennent combler.

**f) Il ne dit rien sur la difficulté réelle.**

Le vrai obstacle quand on vient de l'économie n'est pas le niveau mathématique. C'est le **langage** : les notations, la structure des énoncés, le mode de rédaction des preuves. Personne ne l'enseigne, et c'est pourtant là que tout le monde décroche. D'où le fichier `01_NOTATIONS_le-decodeur.md`.

**g) Il mélange deux objectifs.**

« Mathématiques pour la finance » et « optimisation pour l'économie » ne se recouvrent que partiellement. Tu m'as dit vouloir mener les deux de front — très bien, mais il faut alors deux fils distincts, pas un seul programme qui mélange tout. C'est ce que propose la section suivante.

---

## 3. Le parcours

Tu as choisi de mener l'optimisation et les probabilités en parallèle. Voici la structure. Les durées supposent **10 à 12 heures par semaine**. Si tu en fais moins, étire — ne compresse pas.

### Semaine 0 — Dérouillage (3 à 4 jours)

Tu as dit que ça reviendrait en deux ou trois jours. Fais-le proprement avant d'attaquer.

> **Fais la `Série 0`** (`02_EXERCICES_Serie-0.md`). C'est un diagnostic : gradient, hessienne, valeurs propres, formes quadratiques, Taylor.
>
> - Tu fais 8/10 ou plus → tu passes directement à la phase 1.
> - Tu fais moins → reprends les chapitres 5 et 6 de Strang (18.06) sur les matrices symétriques et les formes quadratiques avant de continuer. Deux jours suffiront.

En parallèle, lis `01_NOTATIONS_le-decodeur.md` en entier. Une heure. Reviens-y dès que tu bloques sur un symbole.

---

### FIL A — Optimisation (le fil principal)

#### Phase 1 — Prendre pied en français (2 semaines)

**Fichier :** `08_Cours-en-francais/Bordeaux_Dossal/POLY_Optimisation-M1_Dossal.pdf` (60 p.)

Lis-le en entier. C'est court, c'est en français, et ça te donne le vocabulaire avant d'affronter l'anglais. Ne cherche pas à tout maîtriser — l'objectif est de savoir *de quoi on parle*.

Puis **`08_Cours-en-francais/Dauphine_Royer/00_POLY_...pdf`** avec ses TD corrigés. C'est la seule ressource française de la banque qui ait des corrigés. Fais les TD 1 à 3.

> **Fais la `Série 1`** (convexité) après cette phase.

#### Phase 2 — Le socle (6 à 8 semaines) ← le cœur

**Fichier :** `01_Reference_Boyd_Vandenberghe/00_LIVRE_...pdf`, **chapitres 2 à 5 uniquement.**

C'est ici que tout se joue. Découpage :

| Semaines | Chapitre | Contenu | Difficulté |
|---|---|---|---|
| 1–2 | **Ch. 2** — Convex sets | Ensembles convexes, cônes, hyperplans séparateurs | Facile à moyen |
| 2–3 | **Ch. 3** — Convex functions | Fonctions convexes, conditions du 1er et 2e ordre, opérations conservant la convexité | Moyen |
| 1–2 | **Ch. 4** — Convex optimization problems | LP, QP, SOCP, SDP — la mise en forme des problèmes | Moyen |
| 2–3 | **Ch. 5** — Duality | Lagrangien, dualité, **KKT** | **Difficile — le morceau** |

Méthode, à chaque chapitre :

1. Lis le chapitre.
2. Regarde les slides correspondants (`01_Slides-integrales-du-livre.pdf`) — ils condensent l'essentiel.
3. Fais 5 à 8 exercices de fin de chapitre. Les solutions officielles de nombreux exercices sont dans `03_EXERCICES-supplementaires-Boyd.pdf`.
4. Si un passage résiste : ouvre `05_UCLA_EE236B` sur le même sujet. Vandenberghe traite la même matière plus sèchement — souvent, un second angle débloque.

> **Fais la `Série 2`** (Lagrangien, dualité, KKT) pendant le chapitre 5. C'est le point le plus important de tout le parcours, et le seul sujet du programme que tu n'as jamais vu. Prends ton temps.

**Le chapitre 5 est celui qui compte le plus pour un économiste.** Le multiplicateur de Lagrange que tu as croisé en microéconomie y prend enfin son vrai sens : c'est un **prix implicite**. La dualité, c'est la théorie des prix sous forme mathématique. Quand tu auras compris ça, la micro que tu as apprise changera de couleur.

#### Phase 3 — Renforcer (4 semaines)

Deux directions au choix selon ce qui t'attire :

- **Vers la rigueur mathématique** → `07_MIT-OpenCourseWare/6-253` (Bertsekas). Séparation, cônes, conjugaison de Fenchel. C'est le langage mathématique dans sa forme la plus pure. Exigeant.
- **Vers l'économie** → `04_UCLA_EE236A` (programmation linéaire). Polyèdres, dualité en PL, simplexe. La dualité en programmation linéaire *est* la théorie des prix. C'est le pont le plus direct vers ta discipline.

Je conseille EE236A en premier si ton objectif reste l'économie.

#### Phase 4 — Algorithmes (4 semaines)

`06_UCLA_EE236C` : gradient, sous-gradient, méthodes proximales, Newton. Indispensable dès que tu fais de l'économétrie en grande dimension ou du machine learning.

C'est aussi ici que **Python devient utile**. Installe CVXPY et résous les problèmes de Boyd numériquement. Rien ne révèle mieux une incompréhension qu'un solveur qui refuse ton problème.

---

### FIL B — Probabilités (le fil finance, 3 à 4 h/semaine)

À mener en parallèle, sans presser. Il n'alimente pas l'optimisation avant longtemps — c'est la piste finance.

1. **Harvard Stat 110** (Blitzstein) — le meilleur cours de probabilités en accès libre. Vidéos + livre + exercices corrigés. Environ 12 semaines à ce rythme.
2. Ensuite seulement : Hull, puis le CFA.
3. Le calcul stochastique (Shreve) vient **après** Stat 110. Pas avant. C'est la principale erreur des autodidactes en finance quantitative : attaquer Itô sans maîtriser l'espérance conditionnelle.

Une remarque : ce fil n'a pas besoin d'être synchronisé avec le fil A. Si l'optimisation te passionne, mets 80 % de ton temps dessus et laisse les probabilités mijoter. Mieux vaut un fil maîtrisé et un fil lent que deux fils bâclés.

---

## 4. Calendrier réaliste

| Mois | Fil A (optimisation) | Fil B (probabilités) |
|---|---|---|
| 1 | Dérouillage + Dossal + Royer | Stat 110, semaines 1–4 |
| 2 | Boyd ch. 2–3 | Stat 110, semaines 5–8 |
| 3 | Boyd ch. 4–5 (**KKT**) | Stat 110, semaines 9–12 |
| 4 | EE236A ou MIT 6.253 | Hull, début |
| 5 | EE236C + Python/CVXPY | Hull, suite |
| 6 | Consolidation, projets | CFA I, début |

**Au bout de 6 mois** tu auras un niveau d'optimisation convexe comparable à celui d'un bon M1, et les bases de probabilités pour attaquer la finance quantitative.

Ce n'est ni rapide ni lent. C'est le rythme réel.

---

## 5. Trois principes qui font la différence

**Écris les preuves à la main.** Lire une démonstration donne l'illusion de comprendre. Referme le livre et réécris-la : tu verras immédiatement où ça casse. C'est désagréable et c'est le seul mécanisme qui fonctionne.

**Reviens en arrière.** Reprends la Série 1 deux semaines après l'avoir faite, sans regarder les corrigés. Ce que tu retrouves, tu l'as acquis. Le reste, non — et il vaut mieux le savoir maintenant.

**Ne cherche pas à tout comprendre du premier coup.** Boyd se lit trois fois. La première pour la carte, la deuxième pour les mécanismes, la troisième pour les détails. Vouloir tout saisir au premier passage est la meilleure façon de s'arrêter au chapitre 2.

---

## 6. Ce que tu ne dois PAS faire maintenant

- **`12_Nemirovski_Georgia-Tech`** — 14 400 pages de niveau doctorat. C'est un trésor, mais y entrer maintenant te découragerait en une heure. Reviens-y dans un an.
- **`03_Stanford_EE364b`** — c'est la suite de Boyd, pas le début.
- **`09_ENS-Paris_Aspremont/M2_MVA`** — niveau M2, suppose Boyd acquis.
- **`10_Cornell_ORIE6334`** — optimisation combinatoire, sujet différent.
- **Le poly CNRS de ton dossier `BASE OPTIMISATION A VOIR EN 1ER`** — c'est un cours de **L1 économie**. Tu es largement au-dessus. Garde-le comme aide-mémoire de géométrie, rien de plus.

---

## 7. Les fichiers de ce dossier

| Fichier | Quand l'utiliser |
|---|---|
| `00_COMMENCER_ICI.md` | Ce fichier. Relis la section 3 à chaque changement de phase. |
| `01_NOTATIONS_le-decodeur.md` | Tout de suite, puis en permanence à côté de toi. |
| `02_EXERCICES_Serie-0.md` | Semaine 0 — diagnostic de remise en route. |
| `03_EXERCICES_Serie-1.md` | Après la phase 1 — convexité. |
| `04_EXERCICES_Serie-2.md` | Pendant Boyd chapitre 5 — Lagrangien, dualité, KKT. |
| `05_AUTO-EVALUATION.html` | Quand tu veux tester si tu as retenu. À ouvrir dans ton navigateur. |

---

**Prochaine action : ouvre `01_NOTATIONS_le-decodeur.md`, puis fais la Série 0.**
