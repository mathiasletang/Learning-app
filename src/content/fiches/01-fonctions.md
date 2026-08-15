# Fiche 1 — Fonctions de plusieurs variables

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Faccanoni, *Optimisation L3* (Univ. Toulon), chapitre 1, p. 3–14 |
| **Difficulté** | 🟢 Fondamental |
| **Temps d'étude estimé** | 45 min |
| **Prérequis** | Fonctions d'une variable (M11), lecture de graphes |
| **Concepts clés** | Domaine de définition, graphe, fonctions partielles, lignes de niveau |
| **Poids à l'examen** | Le domaine de définition et les lignes de niveau sont des questions quasi systématiques en début d'épreuve. |

---

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

---

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

**À retenir**
- Un domaine se construit *condition par condition*, puis par intersection.
- Toujours distinguer $\geq$ (frontière incluse) de $>$ (frontière exclue) — cette distinction deviendra cruciale pour Weierstrass (fiche 6 : fermé + borné = compact).

---

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

---

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

**À retenir**
- Niveau = équation $f(x,y) = k$, à discuter **selon $k$**.
- Serrage des courbes ⇔ raideur de la pente — lecture qualitative demandée en examen.
- Le gradient sera **orthogonal** aux lignes de niveau (fiche 3) : retenez l'image dès maintenant.

---

## ⚠️ Common mistakes

1. **Oublier une condition du domaine** — un dénominateur qui contient lui-même une racine impose *deux* conditions ($\geq 0$ ET $\neq 0$, donc $> 0$).
2. **Confondre graphe et courbe de niveau** : le graphe vit dans $\mathbb{R}^3$, les courbes de niveau dans le plan $\mathbb{R}^2$.
3. **Confondre $f_{x=a}$ et $\partial_x f$** — la première est une fonction partielle, la seconde une dérivée.
4. **Tracer un niveau vide** — vérifier l'existence de solutions avant de tracer.
5. **Frontières incluses/exclues mal marquées** — $\ln$ exige strictement $>0$, la racine accepte $=0$.

---

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

---

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

---

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Domaine de $\sqrt{u}$ ? de $\ln u$ ? de $1/u$ ? | $u \geq 0$ ; $u > 0$ ; $u \neq 0$ |
| Où vit le graphe d'une fonction de $n$ variables ? | Dans $\mathbb{R}^{n+1}$ |
| Fonction partielle $f_{y=b}$ ? | $x \mapsto f(x,b)$ : coupe verticale, $y$ figé à $b$ |
| Courbe de niveau $k$ ? | $\{(x,y) \in D \mid f(x,y)=k\}$ : coupe horizontale projetée |
| Courbes de niveau très resserrées ? | Variation rapide de $f$ (pente raide) |
| Isoquantes de Cobb-Douglas ? | Courbes de niveau de $f(w,k) = w^\alpha k^\beta$ : combinaisons de facteurs à production constante |
