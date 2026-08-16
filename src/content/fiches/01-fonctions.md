# Fiche 1 — Fonctions de plusieurs variables

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Faccanoni, *Optimisation L3* (Univ. Toulon), chapitre 1, p. 3–14 |
| **Difficulté** | 🟢 Fondamental |
| **Temps d'étude estimé** | 1 h |
| **Prérequis** | Fonctions d'une variable (M11), lecture de graphes |
| **Concepts clés** | Domaine de définition, graphe, fonctions partielles, lignes de niveau |
| **Poids à l'examen** | Le domaine de définition et les lignes de niveau sont des questions quasi systématiques en début d'épreuve. |

## 🎯 Vue d'ensemble

Ce chapitre étend aux fonctions de **plusieurs variables** ce que vous savez des fonctions d'une variable. Pourquoi c'est important : toute la suite du cours — dérivées partielles, différentiabilité, extrema, Lagrange — travaille sur ces objets. Si vous ne savez pas dire *où vit* une fonction (son domaine) et *à quoi elle ressemble* (ses coupes et ses niveaux), rien de ce qui suit ne tiendra.

Structure du chapitre :

```
Fonction f : Rⁿ → R
├── Domaine de définition Df          (où f a un sens)
├── Graphe / surface représentative   (dans Rⁿ⁺¹)
└── Comment la « voir » quand n = 2
    ├── Coupes verticales  → fonctions partielles
    └── Coupes horizontales → lignes de niveau
```

**Connexion** : fonctions partielles → dérivées partielles (fiche 3) ; lignes de niveau → gradient orthogonal aux niveaux (fiche 3) → interprétation géométrique de Lagrange (fiche 7). Ce chapitre plante les décors de tout le cours.

## 🔴 Concept 1 — Fonction de plusieurs variables et domaine de définition

**Définition (Faccanoni, déf. 1.1).**
> Une fonction $f$ de $\mathbb{R}^n$ à valeurs réelles fait correspondre à tout point $x \equiv (x_1, \dots, x_n)$ de $\mathbb{R}^n$ **au plus un** réel $f(x)$.
> - Le **domaine de définition** est $D_f \subset \mathbb{R}^n$, l'ensemble des points qui ont une image.
> - L'**image** est $\operatorname{Im}_f(D_f) = \{\, r \in \mathbb{R} \mid r = f(x),\ x \in D_f \,\} \subset \mathbb{R}$.
> - La **surface représentative** est $S = \{\,(x, f(x)) \mid x \in D_f\,\} \subset \mathbb{R}^{n+1}$ — l'analogue de la courbe représentative en une variable.

**Intuition.** Une fonction de deux variables est un *relief* : à chaque point $(x,y)$ de la carte correspond une altitude $z = f(x,y)$. La température $T(x, y, t)$ (latitude, longitude, temps) ou la production $P = f(K, W)$ (capital, travail) sont des exemples naturels du cours.

**Exemple (du cours).** $f(x,y) = \sqrt{x+y}$ : le domaine est $D_f = \{(x,y) \in \mathbb{R}^2 \mid x + y \geq 0\}$, un demi-plan. L'image est $\mathbb{R}_+$.

**Contre-exemple.** « $f(x,y) = \pm\sqrt{x+y}$ » n'est **pas** une fonction : un point aurait deux images. *Au plus une* image par point, c'est la définition même.

### Comment déterminer un domaine de définition ?

1. **Repérer chaque opération interdite** : racine paire ($\geq 0$ dessous), logarithme ($> 0$ dedans), dénominateur ($\neq 0$).
2. **Écrire une condition par interdiction**, puis prendre l'**intersection** de toutes.
3. **Représenter** $D_f$ dans le plan : hachurer la région, tracer les frontières (pleines si incluses, pointillées sinon).

**Exemple complet (exercice 1.1 du cours).** $f(x,y) = \dfrac{\sqrt{-y + x^2}}{\sqrt{y}}$ :
racine du numérateur → $-y + x^2 \geq 0$, soit $y \leq x^2$ ; racine du dénominateur, qui ne doit pas s'annuler → $y > 0$. Donc

$$D = \{(x,y) \in \mathbb{R}^2 \mid y \leq x^2 \text{ et } y > 0\}$$

la région entre l'axe des $x$ (exclu) et la parabole $y = x^2$ (incluse).

### Exemples gradués — tous tirés de l'exercice 1.1 du cours

**Exemple 1 — simple.** $f(x,y) = \ln(x+y)$ : une seule interdiction, $x + y > 0$. Donc $D = \{(x,y) \mid y > -x\}$ — le demi-plan strictement au-dessus de la droite $y = -x$, frontière **exclue** (log strict).

**Exemple 2 — intermédiaire.** $f(x,y) = \dfrac{\ln(y)}{\sqrt{x-y}}$ : deux interdictions — $y > 0$ (log) et $x - y > 0$ (racine **au dénominateur**, donc strictement). $D = \{(x,y) \mid y > 0 \text{ et } x > y\}$ : le secteur entre l'axe des $x$ et la première bissectrice, toutes frontières exclues.

**Exemple 3 — trois variables.** $f(x,y,z) = \dfrac{\ln(x^2+1)}{yz}$ : $x^2 + 1 > 0$ est **toujours vrai** — aucune condition sur $x$ ; restent $y \neq 0$ et $z \neq 0$. $D = \{(x,y,z) \mid y \neq 0,\ z \neq 0\}$ : l'espace privé de deux plans. Leçon : ne pas écrire de condition inutile.

**Exemple 4 — le piège.** Pour $\dfrac{\sqrt{-y+x^2}}{\sqrt{y}}$ (l'exemple complet ci-dessus), l'erreur classique est d'écrire $y \geq 0$ pour la racine du bas.
- *Approche fausse* : « racine ⟹ $\geq 0$ », donc $y \geq 0$.
- *Pourquoi c'est faux* : cette racine est **au dénominateur** — elle doit exister **et** ne pas s'annuler.
- *Approche correcte* : $y \geq 0$ **et** $\sqrt{y} \neq 0$, soit $y > 0$. Une racine au dénominateur passe toujours du large ($\geq$) au strict ($>$).

### Exercices — domaines

**🟢 Niveau 1** — $f(x,y) = \sqrt{x+y}$.
<details><summary>Correction</summary>

Une condition : $x + y \geq 0$, demi-plan $y \geq -x$, frontière **incluse** (la racine accepte $0$). C'est l'exemple de la déf. 1.1 du cours.
</details>

**🟡 Niveau 2** — $f(x,y) = \dfrac{\ln(y)}{\sqrt{x-y}}$ : domaine, puis dites lesquelles des frontières appartiennent à $D$.
<details><summary>Correction</summary>

$y > 0$ et $x > y$ (exemple 2 ci-dessus). **Aucune** frontière n'appartient à $D$ : l'axe $y = 0$ est exclu par le log, la droite $x = y$ par le dénominateur. $D$ est un ouvert — vocabulaire qui servira pour Weierstrass (fiche 6).
</details>

**🟠 Niveau 3** — Construisez une fonction dont le domaine est exactement la couronne $1 \leq x^2 + y^2 < 4$.
<details><summary>Correction</summary>

Il faut un $\geq$ pour le bord intérieur et un $>$ pour le bord extérieur : $f(x,y) = \sqrt{x^2+y^2-1} + \ln(4 - x^2 - y^2)$ convient — la racine inclut le cercle de rayon 1, le log exclut celui de rayon 2. **Interprétation** : chaque outil (racine/log) grave son type de frontière ; c'est le sens du point « incluses/exclues » de la méthode.
</details>

**À retenir**
- Un domaine se construit *condition par condition*, puis par intersection.
- Toujours distinguer $\geq$ (frontière incluse) de $>$ (frontière exclue) — cette distinction deviendra cruciale pour Weierstrass (fiche 6 : fermé + borné = compact).
- Une racine au **dénominateur** impose le strict ; une expression toujours positive ($x^2+1$) n'impose rien.

## 🟠 Concept 2 — Fonctions partielles (les coupes verticales)

**Définition (Faccanoni, déf. 1.2).**
> Soit $f : \mathbb{R}^2 \to \mathbb{R}$ et $(a,b) \in D_f$. Les **fonctions partielles** associées à $f$ en $(a,b)$ sont les fonctions d'une variable
> $$f_{y=b} : x \mapsto f(x, b) \qquad \text{et} \qquad f_{x=a} : y \mapsto f(a, y).$$

**Intuition.** On fige une variable et on regarde ce qui reste : c'est l'intersection de la surface avec un plan vertical parallèle à un axe. Une tranche de relief.

**Exemple (du cours).** $f(x,y) = x^2 + y^2$ : la partielle $f_{y=b}(x) = x^2 + b^2$ est une parabole pour chaque $b$ — en empilant ces paraboles on devine le paraboloïde.

**Pourquoi c'est important.** La **dérivée partielle** (fiche 3) est exactement la dérivée d'une fonction partielle. Comprendre la coupe, c'est comprendre la dérivée partielle.

**À retenir**
- Fonction partielle = une variable figée, fonction d'**une** variable qui en résulte.
- Ne pas confondre $f_{x=a}$ (fonction partielle) et $f_{,x} = \partial_x f$ (dérivée partielle) — le cours met explicitement en garde contre cette confusion de notation.

## 🔴 Concept 3 — Lignes de niveau (les coupes horizontales)

**Définition (Faccanoni, déf. 1.3).**
> Soit $k \in \mathbb{R}$. La **courbe de niveau** $k$ de $f$ est la projection sur le plan $z=0$ de l'intersection de la surface avec le plan horizontal $z = k$ :
> $$\{\,(x,y) \in D \mid f(x,y) = k\,\}.$$

**Intuition.** C'est la carte topographique : chaque courbe relie les points de même altitude. Courbes **resserrées** = pente raide ; courbes **espacées** = pente douce (exercice 1.7 du cours). En météo, ce sont les isothermes et les isobares ; en finance, les courbes d'iso-utilité $\mu - \alpha\sigma^2 = k$ d'un investisseur averse au risque (exemple du cours) ; en production, les **isoquantes** de Cobb-Douglas.

### Comment déterminer les courbes de niveau ?

1. Poser $f(x,y) = k$.
2. **Résoudre en $y$** (ou en $x$) pour reconnaître une famille de courbes connues, en discutant selon $k$.
3. Tracer 3 ou 4 valeurs de $k$ pour visualiser la progression.

**Exemple complet (exercice 1.3 du cours).** $f(x,y) = \ln(x - y^2)$.
- Domaine : $x - y^2 > 0$, l'intérieur de la parabole couchée $x = y^2$.
- Niveaux : $f(x,y) = k \iff x - y^2 = e^k \iff x = y^2 + e^k$ — des paraboles couchées, translatées de $e^k$ vers la droite. Quand $k \to -\infty$, $e^k \to 0^+$ : les courbes s'accumulent contre la frontière du domaine.

**Contre-exemple.** Pour $f(x,y) = x^2 + y^2$, la « courbe » de niveau $k = -1$ est **vide** : toujours vérifier pour quels $k$ le niveau est non vide.

### La gamme complète de l'exercice 1.2 — cinq formes à reconnaître

| Fonction | Niveau $f = \kappa$ | Courbes | Surface |
|---|---|---|---|
| $f = x$ | $x = \kappa$ | Droites verticales | Plan |
| $f = y + 1$ | $y = \kappa - 1$ | Droites horizontales | Plan |
| $f = x + y - 1$ | $y = -x + (\kappa+1)$ | Droites de pente $-1$ | Plan |
| $f = e^{\,y - x^2}$ | $y = x^2 + \ln\kappa$ ($\kappa > 0$) | Paraboles translatées | Vallée parabolique |
| $f = y - \cos x$ | $y = \cos x + \kappa$ | Sinusoïdes translatées | Tôle ondulée |

Lecture : une fonction **affine** a des niveaux en droites parallèles (graphe plan) ; une exponentielle composée hérite des niveaux de son argument (ici $y - x^2 = \ln\kappa$, mêmes paraboles que l'exemple $\ln(x - y^2)$ mais couchées dans l'autre sens) ; ajouter une constante à $f$ **translate les étiquettes** des niveaux, pas les courbes.

### Exercices — courbes de niveau

**🟢 Niveau 1** — Niveaux de $f(x,y) = x + y - 1$ : forme, pente, effet de $\kappa$.
<details><summary>Correction</summary>

$y = -x + (\kappa + 1)$ : droites parallèles de pente $-1$ ; $\kappa$ ne fait que translater verticalement. Espacement constant ⟹ pente du relief constante ⟹ le graphe est un plan (correction de l'ex. 1.2).
</details>

**🟡 Niveau 2** — Pour $f(x,y) = e^{\,y-x^2}$, pourquoi la discussion « selon $\kappa$ » est-elle indispensable ?
<details><summary>Correction</summary>

$e^{\,y-x^2} = \kappa$ n'a de solution que si $\kappa > 0$ (une exponentielle est strictement positive) ; alors $y = x^2 + \ln\kappa$. Pour $\kappa \leq 0$ le niveau est **vide** — exactement le piège du contre-exemple ci-dessus.
</details>

**🟠 Niveau 3** — Deux fonctions différentes peuvent-elles avoir les mêmes courbes de niveau ? Justifiez avec $f = x^2 + y^2$ et $g = e^{x^2+y^2}$.
<details><summary>Correction</summary>

Oui : les niveaux de $g$ sont $x^2 + y^2 = \ln\kappa$ — les **mêmes cercles** que ceux de $f$, seules les étiquettes $\kappa$ changent. Les courbes de niveau déterminent la *forme* du relief, pas l'altitude exacte. **Interprétation** : c'est pour cela que maximiser $f$ ou maximiser $e^f$ donne les mêmes points optimaux — idée réutilisée en optimisation.
</details>

**🔴 Niveau 4 — type examen** — Carte d'isothermes : les courbes sont concentriques autour d'un point $A$, très resserrées à l'est de $A$, espacées à l'ouest. Décrivez le champ de température et dites de quel côté le refroidissement est le plus brutal quand on s'éloigne de $A$.
<details><summary>Correction</summary>

$A$ est un extremum local de température (les niveaux l'entourent). À l'est, les niveaux serrés signifient qu'un même écart de température est franchi sur une courte distance : la variation y est la plus brutale. C'est la lecture qualitative des cartes météo du cours (exemples « cartes météorologiques » et exercice 1.4), et l'image du **gradient** de la fiche 3 : il pointe vers la variation la plus rapide, perpendiculairement aux niveaux.
</details>

**À retenir**
- Niveau = équation $f(x,y) = k$, à discuter **selon $k$**.
- Serrage des courbes ⇔ raideur de la pente — lecture qualitative demandée en examen.
- Le gradient sera **orthogonal** aux lignes de niveau (fiche 3) : retenez l'image dès maintenant.
- Composer $f$ par une fonction croissante conserve les courbes de niveau (seules les étiquettes changent).

## 🟡 Quelle coupe pour quelle question ?

Les trois outils du chapitre répondent à trois questions différentes — savoir lequel dégainer est la moitié du travail en examen :

| L'énoncé demande… | Outil | Pourquoi |
|---|---|---|
| « Où $f$ est-elle définie ? » | Domaine $D_f$ | Intersection des conditions d'existence |
| « Que devient $f$ quand $y$ est fixé ? », « comportement le long d'un axe » | Fonction partielle | Coupe verticale : ramène à une variable |
| « Décrivez/tracez les ensembles $f = k$ », « carte », « isoquantes » | Courbes de niveau | Coupe horizontale : géométrie dans le plan |

Indices dans les énoncés : *« représentez le domaine »* ⟹ dessin dans $\mathbb{R}^2$ avec frontières marquées ; *« esquissez le graphe »* ⟹ empiler les courbes de niveau (méthode de l'ex. 1.2) ; toute carte (météo, topographie, indifférence) ⟹ lecture de niveaux.

## ⚠️ Common mistakes

1. **Oublier une condition du domaine** — un dénominateur qui contient lui-même une racine impose *deux* conditions ($\geq 0$ ET $\neq 0$, donc $> 0$).
2. **Confondre graphe et courbe de niveau** : le graphe vit dans $\mathbb{R}^3$, les courbes de niveau dans le plan $\mathbb{R}^2$.
3. **Confondre $f_{x=a}$ et $\partial_x f$** — la première est une fonction partielle, la seconde une dérivée.
4. **Tracer un niveau vide** — vérifier l'existence de solutions avant de tracer.
5. **Frontières incluses/exclues mal marquées** — $\ln$ exige strictement $>0$, la racine accepte $=0$.

## 📌 Ultimate Review

1. Une fonction $\mathbb{R}^n \to \mathbb{R}$ associe **au plus un** réel à chaque point ; son graphe vit dans $\mathbb{R}^{n+1}$.
2. Domaine = intersection des conditions (racines $\geq 0$, log $> 0$, dénominateurs $\neq 0$).
3. Fonction partielle = coupe verticale = une variable figée.
4. Ligne de niveau $k$ = $\{f(x,y) = k\}$ = coupe horizontale projetée.
5. Courbes de niveau resserrées ⇔ variation rapide.
6. Exemples économiques à connaître : Cobb-Douglas $f(w,k) = w^\alpha k^\beta$ (isoquantes), utilité moyenne-variance $\mu - \alpha\sigma^2$ (courbes d'indifférence).
7. Ce chapitre nourrit directement : dérivées partielles (coupes), gradient ⊥ niveaux, Lagrange (tangence de niveaux).

**Definitions to know** : fonction de plusieurs variables, domaine, image, surface représentative (déf. 1.1) ; fonctions partielles (déf. 1.2) ; lignes de niveau (déf. 1.3).

**Methods to know** : détermination et représentation d'un domaine ; détermination des courbes de niveau avec discussion selon $k$.

## 🧠 Active Recall

**Basic** — Définissez le domaine de définition et donnez celui de $f(x,y) = \dfrac{\ln(y)}{\sqrt{x - y}}$.
<details><summary>Réponse</summary>

$D = \{(x,y) \in \mathbb{R}^2 \mid y > 0 \text{ et } x > y\}$ : le log impose $y>0$, la racine au dénominateur impose $x - y > 0$ strictement. (Exercice 1.1.2 du cours.)
</details>

**Understanding** — Pourquoi les courbes de niveau resserrées indiquent-elles une pente raide ?
<details><summary>Réponse</summary>

Entre deux courbes consécutives, l'altitude varie d'un pas fixe $\Delta k$. Si elles sont proches, ce même $\Delta k$ est franchi sur une courte distance horizontale : la variation par unité de distance — la pente — est grande.
</details>

**Application** — Déterminez les courbes de niveau de $f(x,y) = e^{y - x^2}$ et décrivez-les.
<details><summary>Réponse</summary>

$f = \kappa$ ($\kappa > 0$) $\iff y = x^2 + \ln \kappa$ : des paraboles translatées verticalement de $\ln\kappa$. (Exercice 1.2 du cours.)
</details>

**Comparison** — Quelle est la différence entre fonction partielle et ligne de niveau ?
<details><summary>Réponse</summary>

Toutes deux sont des coupes de la surface : la fonction partielle est une coupe **verticale** (plan $x = a$ ou $y = b$), la ligne de niveau une coupe **horizontale** (plan $z = k$) projetée sur le plan des variables.
</details>

**Exam-style** — On vous donne une carte d'isobares et deux villes. Comment décider où le vent est le plus fort ?
<details><summary>Réponse</summary>

Là où les isobares sont les plus **rapprochées** : le gradient de pression y est le plus intense (exercice 1.4 du cours — réponse : San Francisco).
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Domaine de $\sqrt{u}$ ? de $\ln u$ ? de $1/u$ ? | $u \geq 0$ ; $u > 0$ ; $u \neq 0$ |
| Où vit le graphe d'une fonction de $n$ variables ? | Dans $\mathbb{R}^{n+1}$ |
| Fonction partielle $f_{y=b}$ ? | $x \mapsto f(x,b)$ : coupe verticale, $y$ figé à $b$ |
| Courbe de niveau $k$ ? | $\{(x,y) \in D \mid f(x,y)=k\}$ : coupe horizontale projetée |
| Courbes de niveau très resserrées ? | Variation rapide de $f$ (pente raide) |
| Isoquantes de Cobb-Douglas ? | Courbes de niveau de $f(w,k) = w^\alpha k^\beta$ : combinaisons de facteurs à production constante |
