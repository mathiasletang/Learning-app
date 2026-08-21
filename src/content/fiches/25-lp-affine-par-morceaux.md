# Fiche 25 — Optimisation affine par morceaux : tout ramener à un LP

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 2 « Piecewise-linear optimization », 24 diapositives |
| **Difficulté** | Must know — la technique la plus rentable du cours |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 24 (forme matricielle d'un LP), fiche 11 (convexité) |
| **Concepts clés** | Fonction affine par morceaux, variable auxiliaire, épigraphe, approximation en norme 1 et en norme infinie, parcimonie, classification linéaire |
| **Poids à l'examen** | C'est **la** compétence transférable : reconnaître qu'un problème non linéaire en apparence est un LP déguisé, et écrire la reformulation. Presque tous les exercices de modélisation de `ZZ_EXERCICES_problems.pdf` se jouent là. |

## 🎯 Vue d'ensemble

Un objectif écrit avec des $\max$, des valeurs absolues, des normes $\|\cdot\|_1$ ou $\|\cdot\|_\infty$ **n'est pas linéaire** — et pourtant le problème est un LP. La technique tient en une phrase, et elle se répète à l'identique dans tout le cours :

```
OBJECTIF NON LINÉAIRE  →  on ajoute une VARIABLE AUXILIAIRE t
                       →  on impose « t majore chaque morceau »
                       →  on minimise t
```

Pourquoi ça marche : à $x$ fixé, la contrainte $t \geq$ (chaque morceau) force $t \geq f(x)$, et comme on minimise $t$, l'optimum prend $t = f(x)$. **On n'a rien changé au problème, on a juste déplacé la difficulté dans les contraintes** — là où elle devient linéaire. C'est le passage à l'**épigraphe**.

## 🟡 Concept 1 — Linéaire, affine, affine par morceaux

**Fonction linéaire.** $f:\mathbb{R}^n\to\mathbb{R}$ est linéaire si

$$f(\alpha x + \beta y) = \alpha f(x) + \beta f(y) \qquad \forall x,y\in\mathbb{R}^n,\ \forall\alpha,\beta\in\mathbb{R}$$

*Propriété :* $f$ est linéaire **si et seulement si** $f(x) = a^Tx$ pour un certain $a$.

**Fonction affine.** $f$ est affine si

$$f\big(\alpha x + (1-\alpha)y\big) = \alpha f(x) + (1-\alpha)f(y) \qquad \forall x,y\in\mathbb{R}^n,\ \forall\alpha\in\mathbb{R}$$

*Propriété :* $f$ est affine **si et seulement si** $f(x) = a^Tx + b$ pour certains $a$ et $b$.

⚠️ La différence tient au coefficient : linéaire autorise **toutes** les combinaisons $\alpha,\beta$ ; affine n'autorise que celles dont les poids somment à $1$. Une fonction affine avec $b\neq0$ n'est pas linéaire, bien que son graphe soit une droite. Le cours parle de « fonction linéaire » pour l'objectif d'un LP, alors qu'un $+b$ ne changerait rien à l'argmin.

**Fonction affine par morceaux (convexe).** $f:\mathbb{R}^n\to\mathbb{R}$ est dite affine par morceaux convexe si

$$f(x) = \max_{i=1,\dots,m}\ \big(a_i^Tx + b_i\big)$$

Elle est paramétrée par $m$ vecteurs $a_i \in \mathbb{R}^n$ et $m$ scalaires $b_i$. Son graphe est l'enveloppe supérieure de $m$ hyperplans : une surface « en toit », anguleuse aux intersections.

> Le cours note lui-même que *piecewise-affine* serait plus juste que *piecewise-linear*, mais que le second est l'usage.

## 🔴 Concept 2 — La reformulation reine : minimiser un maximum

$$\min_x\ f(x) = \max_{i=1,\dots,m}\big(a_i^Tx+b_i\big)$$

**LP équivalent** (variables $x$ **et** un scalaire auxiliaire $t$) :

$$\begin{array}{ll}\text{minimiser} & t\\ \text{sous} & a_i^Tx + b_i \leq t, \quad i = 1,\dots,m\end{array}$$

**Pourquoi c'est équivalent.** À $x$ fixé, les $m$ contraintes disent exactement $t \geq \max_i(a_i^Tx+b_i) = f(x)$. Comme on minimise $t$, l'optimum choisit la plus petite valeur permise : $t^\star = f(x)$. Minimiser en $(x,t)$ revient donc à minimiser $f$ en $x$.

**Écriture matricielle.** En posant $\tilde x = \begin{pmatrix}x\\t\end{pmatrix}$ :

$$\tilde c = \begin{pmatrix}0\\1\end{pmatrix},\qquad \tilde A = \begin{pmatrix} a_1^T & -1\\ \vdots & \vdots\\ a_m^T & -1\end{pmatrix},\qquad \tilde b = \begin{pmatrix}-b_1\\ \vdots\\ -b_m\end{pmatrix}$$

et le problème est $\min\ \tilde c^T\tilde x$ sous $\tilde A\tilde x \preceq \tilde b$ — un LP standard à $n+1$ variables et $m$ contraintes.

### Somme de deux fonctions affines par morceaux

$$\min_x\ f(x)+g(x) = \max_{i=1,\dots,m}(a_i^Tx+b_i) + \max_{j=1,\dots,p}(c_j^Tx+d_j)$$

**Première idée (mauvaise).** La somme est encore affine par morceaux :

$$f(x)+g(x) = \max_{\substack{i=1,\dots,m\\ j=1,\dots,p}}\ (a_i+c_j)^Tx + (b_i+d_j)$$

mais c'est un maximum de $mp$ fonctions affines : le LP aurait $mp$ contraintes.

**Bonne idée : une variable auxiliaire par morceau.**

$$\begin{array}{ll}\text{minimiser} & t_1 + t_2\\ \text{sous} & a_i^Tx+b_i \leq t_1, \quad i=1,\dots,m\\ & c_j^Tx+d_j\leq t_2, \quad j=1,\dots,p\end{array}$$

soit **$m+p$** contraintes au lieu de $mp$. À $x$ fixé, les optima sont $t_1 = f(x)$ et $t_2 = g(x)$.

**La leçon générale.** Ajouter des variables auxiliaires **réduit** la taille du problème au lieu de l'augmenter. C'est contre-intuitif et c'est central : ne développez jamais un produit de maxima, introduisez une variable par terme.

## 🔴 Concept 3 — Approximation en norme infinie (Tchebychev)

$$\min_x\ \|Ax-b\|_\infty, \qquad A\in\mathbb{R}^{m\times n},\ b\in\mathbb{R}^m$$

La norme infinie d'un vecteur $y\in\mathbb{R}^m$ s'écrit comme un maximum de fonctions affines :

$$\|y\|_\infty = \max_{i=1,\dots,m}|y_i| = \max_{i=1,\dots,m}\ \max\{y_i,\ -y_i\}$$

**LP équivalent** (variables $x$ et un scalaire $t$) :

$$\begin{array}{ll}\text{minimiser} & t\\ \text{sous} & -t\mathbf{1} \preceq Ax-b \preceq t\mathbf{1}\end{array}$$

À $x$ fixé, l'optimum est $t = \|Ax-b\|_\infty$.

**Forme matricielle.** Avec $\tilde x = (x,t)$ :

$$\min\ \begin{pmatrix}0\\1\end{pmatrix}^T\tilde x \quad\text{sous}\quad \begin{pmatrix} A & -\mathbf{1}\\ -A & -\mathbf{1}\end{pmatrix}\begin{pmatrix}x\\t\end{pmatrix} \preceq \begin{pmatrix}b\\-b\end{pmatrix}$$

## 🔴 Concept 4 — Approximation en norme 1

$$\min_x\ \|Ax-b\|_1$$

Ici la norme est une **somme** de valeurs absolues :

$$\|y\|_1 = \sum_{i=1}^m|y_i| = \sum_{i=1}^m \max\{y_i,-y_i\}$$

On applique donc la leçon du concept 2 : **une variable auxiliaire par terme**, c'est-à-dire un **vecteur** $u\in\mathbb{R}^m$ et non un scalaire.

**LP équivalent :**

$$\begin{array}{ll}\text{minimiser} & \displaystyle\sum_{i=1}^m u_i\\ \text{sous} & -u \preceq Ax-b \preceq u\end{array}$$

À $x$ fixé, l'optimum est $u_i = |(Ax-b)_i|$.

**Forme matricielle.** Avec $\tilde x = (x,u)$ :

$$\min\ \begin{pmatrix}0\\ \mathbf{1}\end{pmatrix}^T \tilde x \quad\text{sous}\quad \begin{pmatrix} A & -I\\ -A & -I\end{pmatrix}\begin{pmatrix}x\\u\end{pmatrix}\preceq\begin{pmatrix}b\\-b\end{pmatrix}$$

⚠️ Ne confondez pas les deux reformulations : **norme infinie $\to$ un scalaire $t$** (on borne le pire résidu), **norme 1 $\to$ un vecteur $u$** (on borne chaque résidu séparément). Utiliser un scalaire pour la norme 1 donnerait $m\cdot\max_i|y_i|$, ce qui n'est pas $\|y\|_1$.

### Ce que chaque norme fait aux résidus

Le cours compare les histogrammes des résidus $Ax-b$ pour $A\in\mathbb{R}^{200\times80}$ tirée au hasard, entre $x_{\text{mc}} = \arg\min\|Ax-b\|_2$ (moindres carrés) et $x_1 = \arg\min\|Ax-b\|_1$.

| Norme minimisée | Ce qu'elle produit | Quand la choisir |
|---|---|---|
| $\\|\cdot\\|_2$ (moindres carrés) | résidus étalés en cloche, tous petits mais **aucun nul** | bruit gaussien, pas de valeur aberrante |
| $\\|\cdot\\|_1$ | beaucoup de résidus **exactement nuls**, mais quelques grands | données avec valeurs aberrantes ; on veut un ajustement **robuste** |
| $\\|\cdot\\|_\infty$ | tous les résidus **de même amplitude** maximale | on veut garantir une erreur **maximale** faible (conception, tolérances) |

**Intuition.** La norme 1 ne pénalise pas davantage un gros écart qu'un petit à somme égale : elle « laisse tomber » quelques points aberrants pour coller parfaitement aux autres. La norme 2 punit le carré : elle refuse tout gros écart et le répartit. La norme infinie ne regarde **que** le pire. C'est le même phénomène qui rend la norme 1 favorable à la **parcimonie** (concept 6).

## 🟠 Concept 5 — Ajustement de données

**Ajuster une fonction affine** $f(t) = \alpha + \beta t$ à $m$ points $(t_i,y_i)$ : c'est un problème d'approximation $Ax\approx b$ avec

$$A = \begin{pmatrix}1 & t_1\\ \vdots & \vdots\\ 1 & t_m\end{pmatrix},\qquad x = \begin{pmatrix}\alpha\\ \beta\end{pmatrix},\qquad b = \begin{pmatrix}y_1\\ \vdots\\ y_m\end{pmatrix}$$

Minimiser $\|Ax-b\|_1$ donne une régression **robuste** (résistante aux points aberrants) ; $\|Ax-b\|_\infty$ donne l'ajustement **minimax** ; les deux sont des LP.

## 🟠 Concept 6 — Reconstruction de signaux parcimonieux

**Le problème.** $\hat x\in\mathbb{R}^n$ est un signal inconnu, connu pour être **très parcimonieux** (*sparse*). On dispose de mesures linéaires $y = A\hat x$ avec $A\in\mathbb{R}^{m\times n}$ et $m < n$ : le système est **sous-déterminé**, il a une infinité de solutions.

**Les deux problèmes.**

$$\begin{array}{ll}\text{minimiser} & \mathbf{card}(x)\\ \text{sous} & Ax = y\end{array} \qquad\qquad \begin{array}{ll}\text{minimiser} & \|x\|_1\\ \text{sous} & Ax=y\end{array}$$

où $\mathbf{card}(x)$ est le nombre de composantes non nulles. Le premier est combinatoire et hors de portée ; le second est un **LP**. Quand sont-ils équivalents ?

**Définition (du cours).** $A$ **permet la reconstruction exacte des vecteurs $k$-parcimonieux** si

$$\hat x = \arg\min_{Ax=y}\ \|x\|_1 \qquad\text{dès que}\quad y = A\hat x \ \text{ et } \ \mathbf{card}(\hat x)\leq k$$

(l'argmin désignant l'unique minimiseur). C'est une propriété **du noyau** de la matrice de mesure $A$.

**Condition du noyau (nécessaire et suffisante).** Pour tout $z\in\mathbf{nullspace}(A)\setminus\{0\}$ et tout ensemble de support $I$ avec $|I|\leq k$ :

$$\|P_Iz\|_1 < \tfrac12\|z\|_1$$

où $P_I$ met à zéro les composantes hors de $I$ ; de façon équivalente, $|z_{(1)}|+\dots+|z_{(k)}| < \frac12\|z\|_1$ pour les $k$ plus grandes composantes en valeur absolue.

**Preuve de la suffisance (celle du cours, à savoir refaire).** Soit $\hat x$ $k$-parcimonieux de support $I$ (donc $P_I\hat x = \hat x$) et $y = A\hat x$. Soit $x$ admissible ($Ax=y$), différent de $\hat x$ ; posons $z = x-\hat x$, vecteur non nul du noyau de $A$. Alors

$$\|x\|_1 = \|\hat x + z\|_1 \geq \|\hat x + P_Iz\|_1 - \|P_Iz\|_1$$

$$= \sum_{k\in I}|\hat x_k + z_k| + \sum_{k\notin I}|z_k| - \|P_Iz\|_1 \geq \|\hat x\|_1 + \|z\|_1 - 2\|P_Iz\|_1 > \|\hat x\|_1$$

La deuxième ligne utilise l'inégalité triangulaire, la dernière la condition du noyau. Donc $\hat x$ est bien l'unique minimiseur.

**Nécessité.** Si la condition échoue, il existe $z\neq0$ dans le noyau et $I$ avec $|I|\leq k$ tels que $\|P_Iz\|_1 \geq \frac12\|z\|_1$. On pose $\hat x = -P_Iz$ ($k$-parcimonieux) et $y = A\hat x$ ; alors $x = \hat x + z$ vérifie $Ax=y$ et

$$\|x\|_1 = \|-P_Iz + z\|_1 = \|z\|_1 - \|P_Iz\|_1 \leq 2\|P_Iz\|_1 - \|P_Iz\|_1 = \|\hat x\|_1$$

donc $\hat x$ n'est pas l'unique minimiseur en norme 1.

**Pourquoi c'est important.** C'est le fondement du *compressed sensing* et l'explication théorique du LASSO : remplacer un comptage combinatoire par une norme 1 **ne perd rien**, sous une condition portant uniquement sur la matrice de mesure.

## 🟠 Concept 7 — Classification linéaire

On dispose de points $v_1,\dots,v_N$ avec des étiquettes binaires $s_i\in\{-1,1\}$, et l'on cherche un hyperplan qui sépare **strictement** les deux classes : trouver $a$ et $b$ tels que

$$s_i\,(a^Tv_i + b) > 0 \quad \text{pour tout } i$$

Quand les classes ne sont pas séparables, on minimise la somme des violations, avec la **perte charnière** (*hinge loss*) :

$$\min_{a,b}\ \sum_{i=1}^N \max\{0,\ 1 - s_i(a^Tv_i+b)\}$$

C'est une somme de $N$ fonctions affines par morceaux (chacune un maximum de deux affines) : par le concept 2, c'est un **LP** à $N$ variables auxiliaires :

$$\begin{array}{ll}\text{minimiser} & \displaystyle\sum_{i=1}^N u_i\\ \text{sous} & u_i \geq 0,\quad u_i \geq 1 - s_i(a^Tv_i+b),\qquad i=1,\dots,N\end{array}$$

## 🟢 Concept 8 — Les outils de modélisation

Le cours termine sur les logiciels de modélisation, qui « simplifient la formulation des LP (et d'autres problèmes) » : ils acceptent l'écriture **naturelle** ($\max$, $\|\cdot\|_1$, valeurs absolues) et effectuent eux-mêmes la conversion en forme standard. On écrit par exemple, directement,

$$\min\ \|Ax-b\|_1 \quad\text{sous}\quad 0\leq x_k\leq1,\ k=1,\dots,n$$

et l'outil fabrique le LP à variables auxiliaires du concept 4.

⚠️ Savoir écrire la reformulation **à la main** reste indispensable : c'est ce qui est demandé en examen, et c'est ce qui permet de comprendre pourquoi un problème passe ou ne passe pas.

### Comment résoudre l'exercice type (protocole)

1. **Repérer la non-linéarité** : $\max$, $\min$, $|\cdot|$, $\|\cdot\|_1$, $\|\cdot\|_\infty$, ou une somme de tels termes.
2. **Vérifier le sens** : on minimise un **max** (ou un $\|\cdot\|$), ou on maximise un **min**. Dans l'autre sens (minimiser un min, maximiser un max), la reformulation **ne marche pas** — le problème n'est pas convexe.
3. **Compter les variables auxiliaires** : un seul scalaire $t$ si l'objectif est **un** maximum ; un vecteur $u$ si c'est une **somme** de maxima (un par terme).
4. **Écrire les contraintes de majoration** : chaque morceau $\leq$ la variable auxiliaire associée.
5. **Remplacer l'objectif** par la variable auxiliaire (ou leur somme).
6. **Vérifier l'équivalence** : à $x$ fixé, l'optimum des auxiliaires reconstitue bien la valeur d'origine.
7. **Mettre sous forme matricielle** $\min \tilde c^T\tilde x$ s.c. $\tilde A\tilde x\preceq\tilde b$.

### Le tableau des reformulations à connaître par cœur

| Objectif | Variables ajoutées | Contraintes ajoutées | Nouvel objectif |
|---|---|---|---|
| $\max_i(a_i^Tx+b_i)$ | $t\in\mathbb{R}$ | $a_i^Tx+b_i\leq t$ | $t$ |
| $f(x)+g(x)$, deux max | $t_1,t_2\in\mathbb{R}$ | chaque morceau $\leq t_1$ ou $t_2$ | $t_1+t_2$ |
| $\\|Ax-b\\|_\infty$ | $t\in\mathbb{R}$ | $-t\mathbf 1\preceq Ax-b\preceq t\mathbf 1$ | $t$ |
| $\\|Ax-b\\|_1$ | $u\in\mathbb{R}^m$ | $-u\preceq Ax-b\preceq u$ | $\mathbf 1^Tu$ |
| $\sum_i\max\{0,\,\ell_i(x)\}$ | $u\in\mathbb{R}^N$ | $u_i\geq0$, $u_i\geq \ell_i(x)$ | $\mathbf 1^Tu$ |
| $\max\ \min_i(a_i^Tx+b_i)$ | $t\in\mathbb{R}$ | $a_i^Tx+b_i\geq t$ | $t$ (à maximiser) |

### Exercices progressifs

**Niveau 1** — Reformulez en LP : $\min_x\ |x_1-1| + |x_2+2|$.

<details><summary>Correction</summary>

Somme de deux valeurs absolues, donc **deux** auxiliaires :

$$\min\ u_1+u_2 \quad\text{s.c.}\quad -u_1\leq x_1-1\leq u_1,\quad -u_2\leq x_2+2\leq u_2$$

Optimum évident : $x=(1,-2)$, valeur $0$. *L'intérêt est la méthode, pas le résultat.*

</details>

**Niveau 2** — Reformulez $\min_x\ \max\{|x_1|,\ |x_2|,\ |x_1+x_2-1|\}$.

<details><summary>Correction</summary>

C'est **un** maximum, donc **un** scalaire $t$, et chaque valeur absolue donne deux inégalités :

$$\min\ t \quad\text{s.c.}\quad -t\leq x_1\leq t,\quad -t\leq x_2\leq t,\quad -t\leq x_1+x_2-1\leq t$$

*Valeur optimale :* par symétrie $x_1=x_2=s$, on minimise $\max\{|s|,|2s-1|\}$ ; l'égalité $s = 1-2s$ donne $s=1/3$ et $t = 1/3$.

</details>

**Niveau 3** — Le problème de suivi de sortie de la fiche 24 : $\min \max_{t=0,\dots,N}|y(t)-y_{\text{des}}(t)|$ sous $|u(t)|\leq U$ et $|u(t+1)-u(t)|\leq S$, avec $y = Hu$ linéaire en $u$. Écrivez le LP.

<details><summary>Correction</summary>

Les variables sont $u(0),\dots,u(M)$ et un scalaire $s$ :

$$\begin{array}{ll}\text{minimiser} & s\\ \text{sous} & -s \leq y(t)-y_{\text{des}}(t) \leq s, \quad t=0,\dots,N\\ & -U\leq u(t)\leq U\\ & -S\leq u(t+1)-u(t)\leq S\end{array}$$

Tout est linéaire en $u$ puisque $y(t) = \sum_k h_k u(t-k)$. **C'est la réponse à la promesse laissée en suspens au slide 1-4** : le problème de commande « se formule comme un LP ».

</details>

**Niveau 4 — type feuille d'exercices** — Montrez que $\min_x \|Ax-b\|_\infty$ et $\min_x\|Ax-b\|_1$ ont, en général, des solutions différentes, sur $A = \begin{pmatrix}1\\1\\1\end{pmatrix}$ et $b = (0,\,1,\,10)$.

<details><summary>Correction</summary>

Ici $x$ est un scalaire et $Ax-b = (x,\ x-1,\ x-10)$.

*Norme 1* : $\|Ax-b\|_1 = |x|+|x-1|+|x-10|$ — somme de valeurs absolues d'une variable, minimisée à la **médiane** des points $\{0,1,10\}$, soit $x_1^\star = 1$, valeur $1+0+9 = 10$.

*Norme infinie* : $\|Ax-b\|_\infty = \max\{|x|,|x-1|,|x-10|\}$, minimisé au **milieu de l'étendue**, soit $x_\infty^\star = 5$, valeur $5$.

**Les deux solutions diffèrent** ($1$ contre $5$), et l'écart raconte la différence de philosophie : la norme 1 suit la masse des points et ignore l'aberrant $10$ ; la norme infinie se place à mi-chemin des extrêmes pour minimiser le pire écart. *(Pour comparaison, les moindres carrés donneraient la moyenne, $11/3\approx3{,}67$.)*

</details>

## 🔴 Common mistakes

1. **Un scalaire là où il faut un vecteur** — norme 1 et somme de max exigent **une auxiliaire par terme** ; seule une norme infinie ou un max unique se contente d'un scalaire.
2. **Reformuler dans le mauvais sens** — on minimise un $\max$ et on maximise un $\min$. Minimiser un $\min$ ne se ramène pas à un LP : le problème n'est pas convexe.
3. **Oublier le double sens de la valeur absolue** — $|z|\leq t$ vaut **deux** inégalités $-t\leq z\leq t$. N'en écrire qu'une est l'erreur la plus fréquente.
4. **Développer un produit de maxima** — $mp$ contraintes au lieu de $m+p$ : correct mais inutilement coûteux, et souvent hors délai.
5. **Croire que la norme 2 se met en LP** — $\|Ax-b\|_2$ n'est pas affine par morceaux ; c'est un problème quadratique (ou SOCP), pas un LP.
6. **Oublier les contraintes de positivité des auxiliaires** dans la perte charnière — $u_i\geq0$ **et** $u_i\geq 1-s_i(a^Tv_i+b)$ : c'est le max de deux termes.
7. **Confondre $\mathbf{card}(x)$ et $\|x\|_1$ sans condition** — leur équivalence n'est pas gratuite : elle exige la condition du noyau sur $A$.

## 📌 Ultimate Review

1. Affine par morceaux convexe : $f(x)=\max_i(a_i^Tx+b_i)$.
2. Recette centrale : minimiser $f$ $\iff$ minimiser $t$ sous $a_i^Tx+b_i\leq t$ — passage à l'épigraphe.
3. Somme de deux max : **une auxiliaire par terme**, $m+p$ contraintes au lieu de $mp$.
4. $\|Ax-b\|_\infty$ : un scalaire $t$, contrainte $-t\mathbf1\preceq Ax-b\preceq t\mathbf1$.
5. $\|Ax-b\|_1$ : un vecteur $u$, contrainte $-u\preceq Ax-b\preceq u$, objectif $\mathbf1^Tu$.
6. Norme 1 $\to$ ajustement robuste et résidus nuls ; norme 2 $\to$ résidus étalés ; norme infinie $\to$ résidus tous égaux au pire.
7. Parcimonie : $\min\mathbf{card}(x)$ et $\min\|x\|_1$ sous $Ax=y$ coïncident **ssi** $\|P_Iz\|_1<\frac12\|z\|_1$ pour tout $z$ du noyau et $|I|\leq k$.
8. Classification : perte charnière $\sum_i\max\{0,1-s_i(a^Tv_i+b)\}$, donc un LP.

**Formulas to know**

$$f(x)=\max_i(a_i^Tx+b_i) \qquad \min t \ \text{ s.c. } a_i^Tx+b_i\leq t \qquad -u\preceq Ax-b\preceq u \qquad \|P_Iz\|_1<\tfrac12\|z\|_1$$

**Methods to know** : le protocole de reformulation en 7 étapes ; le tableau des six reformulations ; la preuve de suffisance de la condition du noyau.

## 🧠 Active Recall

**Basic** — Écrivez le LP équivalent à $\min_x \max_{i}(a_i^Tx+b_i)$.

<details><summary>Réponse</summary>

$\min\ t$ sous $a_i^Tx + b_i \leq t$ pour $i=1,\dots,m$, avec variables $(x,t)$. À $x$ fixé, l'optimum est $t=f(x)$.

</details>

**Understanding** — Pourquoi ajouter des variables auxiliaires **réduit-il** la taille du problème pour une somme de deux maxima ?

<details><summary>Réponse</summary>

Développer $\max_i + \max_j$ en un seul maximum donne $mp$ fonctions affines, donc $mp$ contraintes. Avec une auxiliaire par terme ($t_1$ pour $f$, $t_2$ pour $g$), on n'écrit que $m$ contraintes pour $f$ et $p$ pour $g$ : $m+p$ au total. Chaque terme est traité séparément au lieu d'être croisé avec l'autre.

</details>

**Application** — Reformulez $\min_x\ \|Ax-b\|_1 + \|x\|_\infty$.

<details><summary>Réponse</summary>

Deux termes, deux jeux d'auxiliaires : un vecteur $u\in\mathbb{R}^m$ pour la norme 1 et un scalaire $t$ pour la norme infinie.

$$\min\ \mathbf 1^Tu + t \quad\text{s.c.}\quad -u\preceq Ax-b\preceq u,\quad -t\mathbf 1\preceq x\preceq t\mathbf 1$$

</details>

**Comparison** — Norme 1 ou norme infinie pour ajuster des données contenant deux capteurs défaillants ?

<details><summary>Réponse</summary>

**Norme 1.** Elle produit un ajustement robuste : elle accepte de laisser deux gros résidus sur les capteurs défaillants pour coller aux autres points. La norme infinie ferait l'inverse — elle ne regarde que le pire résidu, donc elle serait **entièrement dictée par les capteurs défaillants**.

</details>

**Exam-style** — Montrez que $\min_x\|Ax-b\|_\infty$ et $\min_{x,t}\ t$ s.c. $-t\mathbf1\preceq Ax-b\preceq t\mathbf 1$ ont la même valeur optimale.

<details><summary>Réponse</summary>

Si $(x,t)$ est admissible pour le second, alors $|(Ax-b)_i|\leq t$ pour tout $i$, donc $\|Ax-b\|_\infty\leq t$ : la valeur optimale du second **majore** celle du premier. Réciproquement, pour tout $x$, le couple $(x,\ \|Ax-b\|_\infty)$ est admissible pour le second, dont la valeur optimale **minore** donc $\min_x\|Ax-b\|_\infty$. Les deux valeurs coïncident, et à l'optimum $t^\star = \|Ax^\star-b\|_\infty$.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Fonction affine par morceaux convexe ? | $f(x)=\max_{i=1..m}(a_i^Tx+b_i)$ |
| $f$ linéaire $\iff$ ? | $f(x)=a^Tx$ |
| $f$ affine $\iff$ ? | $f(x)=a^Tx+b$ |
| Reformulation de $\min\max_i(a_i^Tx+b_i)$ ? | $\min t$ s.c. $a_i^Tx+b_i\leq t$ |
| Somme de deux max : combien de contraintes ? | $m+p$ avec deux auxiliaires (et non $mp$) |
| LP pour $\\|Ax-b\\|_\infty$ ? | $\min t$ s.c. $-t\mathbf1\preceq Ax-b\preceq t\mathbf1$ |
| LP pour $\\|Ax-b\\|_1$ ? | $\min \mathbf1^Tu$ s.c. $-u\preceq Ax-b\preceq u$ |
| Scalaire ou vecteur d'auxiliaires ? | Un max $\to$ scalaire ; une somme de max $\to$ vecteur |
| Effet de la norme 1 sur les résidus ? | Beaucoup de résidus nuls, quelques grands — ajustement robuste |
| Effet de la norme infinie ? | Tous les résidus de même amplitude maximale |
| Condition du noyau (parcimonie) ? | $\\|P_Iz\\|_1<\frac12\\|z\\|_1$ pour tout $z\in\mathbf{nullspace}(A)\setminus\{0\}$, $\vert I\vert\leq k$ |
| Perte charnière ? | $\sum_i\max\{0,\ 1-s_i(a^Tv_i+b)\}$ — un LP |
| $\\|Ax-b\\|_2$ est-il un LP ? | Non — quadratique, pas affine par morceaux |
