# Fiche 26 — Polyèdres : faces, points extrêmes, test du rang

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 3 « Polyhedra », 29 diapositives |
| **Difficulté** | Must know — c'est la géométrie qui justifie le simplexe |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 24 (polyèdre, demi-espace), fiche 9 (rang, valeurs propres) |
| **Concepts clés** | Sous-espace, rang, ensemble affine, espace de linéalité, polyèdre pointu, face, face minimale, point extrême, test du rang |
| **Poids à l'examen** | Le **test du rang** est l'outil calculatoire central : c'est lui qui répond à « ce point est-il un sommet ? », donc lui qui légitime l'algorithme du simplexe. |

## 🎯 Vue d'ensemble

La fiche 24 a défini le polyèdre $P = \{x \mid Ax\preceq b,\ Cx = d\}$ et observé que l'optimum d'un LP se trouve « en général sur un sommet ». Cette leçon donne un contenu **précis** à « sommet », et un **test calculable** pour le reconnaître.

Le fil est le suivant : on saturé certaines inégalités, ce qui définit une **face** ; les faces les plus petites sont les **faces minimales** ; quand le polyèdre ne contient aucune droite (il est **pointu**), ces faces minimales sont réduites à un point — ce sont les **points extrêmes**, c'est-à-dire les sommets. Et tout se teste par un **rang de matrice**.

```
SATURER des inégalités   →  FACE
face qui n'en contient plus →  FACE MINIMALE  (= ensemble affine)
polyèdre POINTU          →  face minimale = un point = POINT EXTRÊME
TEST : rang des contraintes actives = n
```

## 🟡 Concept 1 — Le rappel d'algèbre linéaire, en six définitions

**Sous-espace.** Une partie non vide $S\subseteq\mathbb{R}^n$ est un sous-espace si

$$x,y\in S,\ \alpha,\beta\in\mathbb{R} \ \Longrightarrow\ \alpha x + \beta y\in S$$

Cela s'étend par récurrence à toute combinaison linéaire. **Tout sous-espace contient l'origine.** Deux sous-espaces associés à $A\in\mathbb{R}^{m\times n}$ :

$$\mathbf{range}(A) = \{x\in\mathbb{R}^m \mid x = Ay \text{ pour un } y\}, \qquad \mathbf{nullspace}(A) = \{x\in\mathbb{R}^n\mid Ax=0\}$$

Réciproquement, **tout** sous-espace peut s'écrire comme une image ou un noyau.

**Indépendance linéaire.** $\{v_1,\dots,v_k\}$ est libre si $\alpha_1v_1+\dots+\alpha_kv_k = 0$ entraîne $\alpha_1=\dots=\alpha_k=0$. Conséquences : les coefficients d'une combinaison linéaire sont **uniques**, et aucun $v_i$ n'est combinaison des autres.

**Base et dimension.** $\{v_1,\dots,v_k\}\subseteq S$ est une base de $S$ si tout $x\in S$ s'écrit comme combinaison linéaire des $v_i$ **et** si la famille est libre — de façon équivalente, si tout $x\in S$ s'écrit **d'exactement une façon**. La **dimension** $\dim S$ est le nombre de vecteurs d'une base. Toutes les bases ont la même taille ; une famille libre de $S$ ne peut dépasser $\dim S$ éléments ; et $0\leq\dim S\leq n$ si $S\subseteq\mathbb{R}^n$.

**Image, noyau et équations linéaires.** Pour $Ax=b$ :

| Sous-espace | Ce qu'il gouverne |
|---|---|
| $\mathbf{range}(A)$ | l'**existence** : soluble ssi $b\in\mathbf{range}(A)$ ; si $\mathbf{range}(A)=\mathbb{R}^m$, soluble pour tout $b$ |
| $\mathbf{nullspace}(A)$ | l'**unicité** : si $\hat x$ est solution, l'ensemble des solutions est $\{\hat x + v \mid Av = 0\}$ ; unicité ssi $\mathbf{nullspace}(A)=\{0\}$ |

**Rang.** $\mathbf{rank}(A) = \dim\mathbf{range}(A)$. Propriétés : $\mathbf{rank}(A)=\mathbf{rank}(A^T)$ ; $\mathbf{rank}(A)\leq\min\{m,n\}$ (égalité : matrice **de rang plein**) ; et la formule du rang

$$\dim\mathbf{nullspace}(A) = n - \mathbf{rank}(A)$$

**Inversibilité à gauche et à droite.**

|  | Définition | Équivalences | Conséquence |
|---|---|---|---|
| **Inversible à gauche** | il existe $X$ avec $XA=I$ | $\mathbf{rank}(A)=n$ ; $\mathbf{nullspace}(A)=\{0\}$ ; colonnes libres ; $Ax=b$ a **au plus** une solution | $m\geq n$ |
| **Inversible à droite** | il existe $Y$ avec $AY=I$ | $\mathbf{rank}(A)=m$ ; $\mathbf{range}(A)=\mathbb{R}^m$ ; lignes libres ; $Ax=b$ a **au moins** une solution | $m\leq n$ |
| **Inversible** | les deux | nécessairement carrée ; $Ax=b$ a **exactement** une solution | $m=n$ |

Si les deux inverses existent, ils sont égaux et uniques : $X = X(AY) = (XA)Y = Y$, d'où la notation $A^{-1}$.

## 🟠 Concept 2 — Ensembles affines

**Définition.** $S\subseteq\mathbb{R}^n$ est **affine** si

$$x,y\in S,\ \alpha+\beta=1 \ \Longrightarrow\ \alpha x + \beta y\in S$$

Autrement dit : la **droite entière** passant par deux points distincts de $S$ est dans $S$ (et non seulement le segment). Cela s'étend aux combinaisons affines de plus de deux points.

**Sous-espace parallèle.** $S$ non vide est affine **si et seulement si** $L = S - \hat x$ est un sous-espace, pour $\hat x\in S$ quelconque. Ce $L$ **ne dépend pas** du choix de $\hat x$, et l'on définit $\dim S := \dim L$.

⚠️ Un ensemble affine n'est **pas** un sous-espace en général : il ne contient pas l'origine. Un sous-espace est un ensemble affine passant par $0$. Le mot « dimension » d'un ensemble affine se lit toujours sur le sous-espace parallèle.

**Deux représentations.** L'ensemble des solutions d'un système linéaire $S=\{x\mid Ax=b\}$ est affine, et **tout** affine s'écrit ainsi. La paramétrisation par une image $S=\{x\mid x = Ay+c\ \text{pour un } y\}$ est affine, et **tout** affine non vide s'écrit ainsi. Les deux descriptions sont duales l'une de l'autre : par équations, par paramètres.

**Enveloppe affine.** $\mathbf{aff}\,C$ est le plus petit ensemble affine contenant $C$ ; de façon équivalente, l'ensemble des combinaisons affines de points de $C$ :

$$\mathbf{aff}\,C = \{\theta_1v_1+\dots+\theta_kv_k \mid k\geq1,\ v_i\in C,\ \theta_1+\dots+\theta_k = 1\}$$

*Exemple du cours :* l'enveloppe affine du cercle $C=\{(x,y,z)\mid x^2+y^2=1,\ z=1\}$ est **le plan entier** $\{(x,y,z)\mid z=1\}$.

**Indépendance affine.** $\{v_1,\dots,v_k\}$ est affinement libre si

$$\mathbf{rank}\begin{pmatrix} v_1 & v_2 & \cdots & v_k\\ 1 & 1 & \cdots & 1\end{pmatrix} = k$$

De façon équivalente, $\{v_2-v_1,\dots,v_k-v_1\}$ est linéairement libre ; l'enveloppe affine est alors de dimension $k-1$, ce qui impose $k\leq n+1$.

**Le mémo de la ligne de 1.** Ajouter une ligne de $1$ transforme une question affine en une question linéaire. On retrouvera exactement cette astuce dans le théorème de Carathéodory (fiche 27) et dans la mise en forme standard.

## 🔴 Concept 3 — Espace de linéalité et polyèdres pointus

On considère désormais $P = \{x \mid Ax\preceq b,\ Cx=d\}$, supposé **non vide**, $A$ de taille $m\times n$ et de lignes $a_i^T$.

⚠️ Le mot **fini** dans la définition d'un polyèdre est essentiel. Le cours donne le contre-exemple : la solution du système **infini** $a^Tx\leq1$ pour tout $a$ de norme $1$ est la boule unité $\{x\mid\|x\|\leq1\}$, qui **n'est pas** un polyèdre.

**Espace de linéalité.**

$$L = \mathbf{nullspace}\begin{pmatrix}A\\C\end{pmatrix}$$

Si $x\in P$ et $v\in L$, alors $x+\alpha v\in P$ pour **tout** $\alpha\in\mathbb{R}$ :

$$A(x+\alpha v) = Ax \preceq b, \qquad C(x+\alpha v) = Cx = d$$

**Polyèdre pointu.** $P$ est **pointu** si $L = \{0\}$ — de façon équivalente, s'il ne contient **aucune droite entière**.

| Exemples **non** pointus | Espace de linéalité |
|---|---|
| un demi-espace $\{x\mid a^Tx\leq b\}$ ($n\geq2$) | $\{x\mid a^Tx=0\}$ |
| une « tranche » $\{x\mid -1\leq a^Tx\leq1\}$ ($n\geq2$) | $\{x\mid a^Tx=0\}$ |
| $\{(x,y,z)\mid \|x\|\leq1,\ \|y\|\leq1\}$ | $\{(0,0,z)\mid z\in\mathbb{R}\}$ |

| Exemples pointus |
|---|
| le **simplexe de probabilité** $\{x\in\mathbb{R}^n\mid \mathbf 1^Tx=1,\ x\succeq0\}$ |
| $\{(x,y,z)\mid \|x\|\leq z,\ \|y\|\leq z\}$ |

## 🔴 Concept 4 — Faces

**Définition.** Pour $J\subseteq\{1,\dots,m\}$, on pose

$$F_J = \{x\in P \mid a_i^Tx = b_i \ \text{ pour } i\in J\}$$

Si $F_J$ est **non vide**, on l'appelle une **face** de $P$ : on a saturé (rendu actives) les inégalités indexées par $J$.

**Propriétés.**

- $F_J$ est un polyèdre non vide, décrit par $a_i^Tx = b_i$ pour $i\in J$, $a_i^Tx\leq b_i$ pour $i\notin J$, et $Cx=d$.
- Les faces de $F_J$ sont aussi des faces de $P$.
- **Toutes les faces ont le même espace de linéalité que $P$.**
- Le nombre de faces est fini et vaut au moins $1$ : $P$ est lui-même une face, $P = F_\emptyset$.

**Exemple 1 du cours (simplexe).** $-x_i\leq0$ pour $i=1,2,3$ et $x_1+x_2+x_3=1$ : le triangle du simplexe de probabilité, avec les faces $F_{\{1\}},F_{\{2\}},F_{\{3\}}$ (les arêtes) et $F_{\{1,2\}},F_{\{1,3\}},F_{\{2,3\}}$ (les trois sommets).

**Exemple 2 du cours (non pointu).** Le polyèdre $P = \{x\in\mathbb{R}^3 \mid |x_1-x_2| + |x_3| \leq 1\}$, décrit par les quatre inégalités $\pm(x_1-x_2)\pm x_3\leq1$.

- espace de linéalité : la droite $L = \{(t,t,0)\mid t\in\mathbb{R}\}$ — ajouter $(t,t,0)$ ne change ni $x_1-x_2$ ni $x_3$ ;
- face de dimension 3 : $P$ lui-même ;
- faces de dimension 2 : $F_{\{1\}},\dots,F_{\{4\}}$, par exemple $F_{\{1\}} = \{x\mid x_1-x_2+x_3=1,\ x_1\geq x_2,\ x_3\geq0\}$ ;
- faces de dimension 1 : $F_{\{1,2\}} = \{x\mid x_1-x_2=1,\ x_3=0\}$, $F_{\{1,3\}} = \{x\mid x_1=x_2,\ x_3=1\}$, $F_{\{2,4\}} = \{x\mid x_1=x_2,\ x_3=-1\}$, $F_{\{3,4\}} = \{x\mid x_1-x_2=-1,\ x_3=0\}$ ;
- $F_J$ est **vide** pour tout autre $J$.

**Ce que montre cet exemple.** Un polyèdre non pointu **n'a aucun sommet** : ses plus petites faces sont des droites (translatées de $L$). C'est exactement pourquoi la notion de point extrême exige la « pointure ».

## 🔴 Concept 5 — Faces minimales

**Définition.** Une face de $P$ est **minimale** si elle ne contient aucune autre face de $P$.

**Propriétés.**

- Une face est minimale **si et seulement si** c'est un ensemble **affine**.
- Toutes les faces minimales sont des **translatées de l'espace de linéalité** de $P$ (puisque toutes les faces ont le même espace de linéalité).

**Démonstration (celle du cours).** Soit $F_J$ la face définie par $a_i^Tx=b_i$ ($i\in J$), $a_i^Tx\leq b_i$ ($i\notin J$), $Cx=d$. Partitionnons les inégalités d'indice $i\notin J$ en trois groupes :

1. $i\in J_1$ si $a_i^Tx = b_i$ pour **tout** $x\in F_J$ ;
2. $i\in J_2$ si $a_i^Tx < b_i$ pour **tout** $x\in F_J$ ;
3. $i\in J_3$ s'il existe $\hat x,\tilde x\in F_J$ avec $a_i^T\hat x< b_i$ et $a_i^T\tilde x = b_i$.

Les inégalités de $J_2$ sont **redondantes** : on peut les omettre sans changer $F_J$. Si $J_3\neq\emptyset$ et $j\in J_3$, alors $F_{J\cup\{j\}}$ est une face **propre** de $F_J$ : elle est non vide (elle contient $\tilde x$) et différente de $F_J$ (elle ne contient pas $\hat x$). Donc si $F_J$ est minimale, $J_3=\emptyset$ et $F_J$ est l'ensemble des solutions du **système d'égalités**

$$a_i^Tx = b_i \ \text{ pour } i\in J_1\cup J, \qquad Cx = d$$

c'est-à-dire un ensemble affine. $\blacksquare$

## 🔴 Concept 6 — Points extrêmes et test du rang

**Définition.** Un **point extrême** (ou **sommet**) est une face minimale d'un polyèdre **pointu**. Comme les faces minimales sont des translatées de $L=\{0\}$, ce sont bien des points isolés.

**Test du rang.** Soit $\hat x\in P$. Notons $J(\hat x)$ l'ensemble des indices des **contraintes actives** en $\hat x$ :

$$a_i^T\hat x = b_i \ \text{ pour } i\in J(\hat x), \qquad a_i^T\hat x < b_i \ \text{ pour } i\notin J(\hat x)$$

Alors $\hat x$ est un point extrême **si et seulement si**

$$\mathbf{rank}\begin{pmatrix}A_{J(\hat x)}\\ C\end{pmatrix} = n$$

où $A_{J(\hat x)}$ est la sous-matrice de $A$ formée des lignes $a_i^T$, $i\in J(\hat x)$.

**Démonstration (celle du cours).** La face $F_{J(\hat x)}$ est l'ensemble des $x$ vérifiant $(1)$ : $a_i^Tx = b_i$ pour $i\in J(\hat x)$, $a_i^Tx\leq b_i$ pour $i\notin J(\hat x)$, $Cx=d$. Le point $\hat x$ vérifie $(1)$ par définition de $J(\hat x)$.

- Si la condition de rang est vraie, le système d'égalités n'a qu'une solution : $\hat x$ est **le seul** point vérifiant $(1)$, donc $F_{J(\hat x)}$ est une face minimale de dimension $0$.
- Sinon, il existe $v\neq0$ avec $a_i^Tv = 0$ pour $i\in J(\hat x)$ et $Cv=0$. Alors $x = \hat x \pm tv$ vérifie encore $(1)$ pour $t>0$ petit (les inégalités non actives ont de la marge). La face $F_{J(\hat x)}$ contient donc un segment : $\dim F_{J(\hat x)}>0$, elle n'est pas minimale. $\blacksquare$

**Exemple du cours.** $P$ défini par $-x_1\leq0$, $2x_1+x_2\leq3$, $-x_2\leq0$, $x_1+2x_2\leq3$, et $\hat x = (1,1)$ :

- les valeurs des quatre membres de gauche sont $-1$, $3$, $-1$, $3$ ; les seconds membres $0,3,0,3$ ;
- les contraintes **actives** sont donc $J(\hat x)=\{2,4\}$ ;
- $A_{J(\hat x)} = \begin{pmatrix}2&1\\1&2\end{pmatrix}$, de rang $2 = n$ : **$\hat x$ est un point extrême.**

**Exemple du simplexe.** Le polyèdre $\{x\succeq0,\ \mathbf1^Tx=1\}$ de $\mathbb{R}^3$ a trois points extrêmes : $(1,0,0)$, $(0,1,0)$, $(0,0,1)$. Pour $(1,0,0)$, les contraintes actives sont $J=\{2,3\}$ (les deux dernières coordonnées nulles) et

$$\mathbf{rank}\begin{pmatrix}0&-1&0\\0&0&-1\\1&1&1\end{pmatrix} = 3 = n \ \checkmark$$

### Comment résoudre l'exercice type (protocole)

1. **Écrire $P$ sous la forme** $Ax\preceq b$, $Cx=d$ — toutes les contraintes de signe comprises.
2. **Tester la pointure** : calculer $\mathbf{nullspace}\binom{A}{C}$. Si $\neq\{0\}$, il n'y a **aucun** point extrême, et il est inutile d'aller plus loin.
3. **Pour un point $\hat x$ donné** : vérifier d'abord qu'il est admissible.
4. **Lister les contraintes actives** $J(\hat x)$ — évaluer chaque ligne, comparer à $b_i$.
5. **Empiler** $A_{J(\hat x)}$ et $C$, calculer le rang (pivot de Gauss, ou déterminant si la matrice est carrée).
6. **Conclure** : rang $=n$ $\Rightarrow$ point extrême ; rang $<n$ $\Rightarrow$ le point est sur une face de dimension $\geq1$, et $v$ dans le noyau donne la direction dans laquelle on peut bouger.
7. **Pour énumérer les sommets** en petite dimension : choisir $n$ contraintes, résoudre le système d'égalités, vérifier l'admissibilité du point obtenu, recommencer.

### Le cas standard : $x\succeq0$, $Cx=d$

Le cours en fait un exercice, dont la solution est instructive. Un polyèdre en **forme standard** est **toujours pointu** (quels que soient $C$ et $d$), car $\mathbf{nullspace}\binom{-I}{C} = \{0\}$.

**Critère.** $\hat x$ est un point extrême si $\hat x\in P$ et

$$\mathbf{rank}\begin{pmatrix}c_{i_1} & c_{i_2} & \cdots & c_{i_k}\end{pmatrix} = k$$

où $c_j$ est la $j$-ième **colonne** de $C$ et $\{i_1,\dots,i_k\} = \{i \mid \hat x_i > 0\}$ : les colonnes correspondant aux **composantes strictement positives** doivent être linéairement indépendantes.

**Corollaire (à retenir).** Un point extrême a **au plus $\mathbf{rank}(C)$ composantes non nulles.** C'est la clé de tout l'algorithme du simplexe : on cherche des solutions à support petit.

**Preuve (celle du cours).** Quitte à renuméroter, $\{i_1,\dots,i_k\}=\{1,\dots,k\}$. On applique le test du rang à $\binom{-I}{C}$ : les inégalités $k+1,\dots,n$ (celles $-x_i\leq0$ avec $\hat x_i = 0$) sont actives, donc la sous-matrice active est $\begin{pmatrix}0 & -I_{n-k}\\ D & E\end{pmatrix}$ avec $D = (c_1\ \cdots\ c_k)$ et $E = (c_{k+1}\ \cdots\ c_n)$. Son rang vaut $n-k+\mathbf{rank}(D)$, et l'égalité à $n$ équivaut à $\mathbf{rank}(D)=k$. $\blacksquare$

### Exercices progressifs

**Niveau 1** — Le demi-plan $\{(x_1,x_2)\mid x_1\geq0\}$ a-t-il des points extrêmes ?

<details><summary>Correction</summary>

Non. Sous la forme $-x_1\leq0$, on a $A = (-1\ \ 0)$ et $\mathbf{nullspace}(A) = \{(0,t)\mid t\in\mathbb{R}\}\neq\{0\}$ : le polyèdre n'est **pas pointu**, il contient des droites verticales entières. Un polyèdre non pointu n'a aucun point extrême — ses faces minimales sont des droites.

</details>

**Niveau 2** — Le point $\hat x = (0,3)$ du polyèdre $\{x\succeq0,\ 2x_1+x_2\leq3,\ x_1+2x_2\leq3\}$ est-il un sommet ?

<details><summary>Correction</summary>

D'abord, est-il admissible ? $2(0)+3 = 3\leq3$ mais $0+2(3) = 6 > 3$ . **$\hat x$ n'est même pas dans $P$** — la question du sommet ne se pose pas. *Leçon : l'étape 3 du protocole (vérifier l'admissibilité) n'est pas une formalité.* Le vrai sommet de cette arête est $(0,\ 3/2)$ : contraintes actives $\{x_1\geq0,\ x_1+2x_2\leq3\}$, matrice $\begin{pmatrix}-1&0\\1&2\end{pmatrix}$ de rang $2$ .

</details>

**Niveau 3** — Dans le polyèdre standard $\{x\in\mathbb{R}^4 \mid x\succeq0,\ Cx=d\}$ avec $C = \begin{pmatrix}1&1&1&0\\0&1&0&1\end{pmatrix}$ et $d = (2,1)$, le point $\hat x = (1,1,0,0)$ est-il extrême ?

<details><summary>Correction</summary>

Admissible : $1+1+0 = 2$ et $1+0 = 1$ , et $\hat x\succeq0$ . Composantes strictement positives : $\{1,2\}$. Colonnes correspondantes :

$$D = \begin{pmatrix}1&1\\0&1\end{pmatrix}, \qquad \det D = 1 \neq 0 \ \Rightarrow\ \mathbf{rank}(D)=2=k$$

**$\hat x$ est un point extrême.** *Contrôle par le corollaire :* $\mathbf{rank}(C)=2$, donc un sommet a au plus $2$ composantes non nulles — ici exactement $2$ .

</details>

**Niveau 4 — théorème de Birkhoff (exercice du cours)** — Une matrice $X$ de taille $n\times n$ est **bistochastique** si $X_{ij}\geq0$, $X\mathbf1 = \mathbf1$ et $X^T\mathbf1 = \mathbf1$. Montrez que l'ensemble des matrices bistochastiques est un polyèdre pointu, et identifiez ses points extrêmes.

<details><summary>Correction</summary>

**Polyèdre pointu.** Les contraintes sont des inégalités ($X_{ij}\geq0$) et des égalités linéaires (sommes de lignes et de colonnes égales à $1$) : c'est un polyèdre de $\mathbb{R}^{n\times n}$, en **forme standard** $X\succeq0$ plus égalités — donc pointu (voir l'encadré ci-dessus).

**Points extrêmes = matrices de permutation.** Le cours pose la question ; voici l'argument. Une matrice de permutation est bistochastique à coefficients $0/1$. Réciproquement, si $X$ est bistochastique et **n'est pas** une matrice de permutation, elle possède un coefficient $0 < X_{ij} < 1$ ; comme la ligne $i$ somme à $1$, elle contient un second coefficient strictement entre $0$ et $1$, et de même pour les colonnes. On construit ainsi un **cycle** alternant de positions à coefficients strictement fractionnaires, le long duquel on peut ajouter $+\varepsilon$ et $-\varepsilon$ en alternance : les sommes de lignes et de colonnes sont préservées, et pour $\varepsilon$ assez petit les coefficients restent $\geq0$. On obtient $X = \frac12(X_+ + X_-)$ avec $X_\pm$ bistochastiques distinctes : $X$ n'est pas extrême.

**Pourquoi c'est le théorème qui compte.** C'est la version géométrique du résultat annoncé au slide 1-8 de la fiche 24 : la relaxation du **problème d'affectation** a ses sommets aux points entiers. Comme l'optimum d'un LP est atteint en un sommet, minimiser un coût linéaire sur les matrices bistochastiques donne automatiquement une **permutation**.

</details>

## 🔴 Common mistakes

1. **Chercher des sommets dans un polyèdre non pointu** — un demi-espace ou une tranche n'en a aucun. Tester l'espace de linéalité **d'abord**.
2. **Confondre contrainte active et contrainte satisfaite** — active veut dire **égalité** ; une contrainte largement satisfaite ne compte pas dans $J(\hat x)$.
3. **Oublier $C$ dans le test du rang** — c'est $\mathbf{rank}\binom{A_{J}}{C} = n$, égalités comprises. Les oublier fait rater des sommets.
4. **Croire que « face » signifie « facette »** — $P$ lui-même est une face ($J=\emptyset$), et les sommets sont des faces de dimension $0$.
5. **Confondre sous-espace et ensemble affine** — un affine ne contient pas $0$ en général ; sa dimension est celle du sous-espace parallèle.
6. **Oublier la finitude** dans la définition d'un polyèdre — une infinité d'inégalités linéaires peut décrire une boule, qui n'est pas un polyèdre.
7. **Tester le rang sans vérifier l'admissibilité** — un point hors de $P$ peut très bien saturer $n$ contraintes indépendantes.

## 📌 Ultimate Review

1. $\dim\mathbf{nullspace}(A) = n-\mathbf{rank}(A)$ ; image $\to$ existence, noyau $\to$ unicité.
2. Ensemble affine : contient la **droite** entière ; $\dim S = \dim(S-\hat x)$ ; deux descriptions, par équations ou par paramètres.
3. Indépendance affine : rang $k$ de la matrice des $v_i$ **avec une ligne de $1$** ; d'où $k\leq n+1$.
4. Espace de linéalité $L = \mathbf{nullspace}\binom{A}{C}$ ; $P$ **pointu** $\iff L=\{0\}$ $\iff$ $P$ ne contient aucune droite.
5. Face $F_J$ : on sature les inégalités de $J$. Toutes les faces ont le même espace de linéalité ; $P$ est une face.
6. Face **minimale** $\iff$ ensemble affine ; toutes sont des translatées de $L$.
7. **Point extrême** = face minimale d'un polyèdre pointu. **Test du rang** : $\mathbf{rank}\binom{A_{J(\hat x)}}{C}=n$.
8. Forme standard $x\succeq0$, $Cx=d$ : toujours pointue ; sommet $\iff$ colonnes des composantes $>0$ libres ; **au plus $\mathbf{rank}(C)$ composantes non nulles**.

**Formulas to know**

$$L = \mathbf{nullspace}\begin{pmatrix}A\\C\end{pmatrix} \qquad F_J = \{x\in P\mid a_i^Tx=b_i,\ i\in J\} \qquad \mathbf{rank}\begin{pmatrix}A_{J(\hat x)}\\C\end{pmatrix}=n$$

**Methods to know** : le protocole en 7 étapes ; le critère des colonnes en forme standard ; l'énumération des sommets par choix de $n$ contraintes.

## 🧠 Active Recall

**Basic** — Qu'est-ce qu'une face $F_J$, et pourquoi $P$ en est-elle une ?

<details><summary>Réponse</summary>

$F_J = \{x\in P\mid a_i^Tx = b_i,\ i\in J\}$ si cet ensemble est non vide : on impose l'égalité sur les contraintes indexées par $J$. Pour $J=\emptyset$ on n'impose rien, donc $F_\emptyset = P$ : le polyèdre est une face de lui-même.

</details>

**Understanding** — Pourquoi un polyèdre non pointu n'a-t-il aucun point extrême ?

<details><summary>Réponse</summary>

Toutes les faces ont le même espace de linéalité $L$ que $P$. Si $L\neq\{0\}$, toute face contient une droite entière (translatée de $L$) et ne peut donc être réduite à un point. Les faces minimales sont des translatées de $L$, de dimension $\dim L\geq1$.

</details>

**Application** — Le point $(0,0)$ du polyèdre $\{x\succeq0,\ x_1+x_2\leq1\}$ est-il extrême ?

<details><summary>Réponse</summary>

Contraintes actives : $-x_1\leq0$ et $-x_2\leq0$ (la troisième donne $0<1$, non active). La matrice active est $\begin{pmatrix}-1&0\\0&-1\end{pmatrix}$, de rang $2 = n$ : **oui**, $(0,0)$ est un point extrême.

</details>

**Comparison** — Test du rang général et critère des colonnes en forme standard : quel est le lien ?

<details><summary>Réponse</summary>

C'est le **même test**, spécialisé. En forme standard, les contraintes actives sont les $x_i\geq0$ pour les composantes **nulles** ; la matrice active se met par blocs, son rang vaut $n-k+\mathbf{rank}(D)$ où $D$ regroupe les colonnes des composantes **strictement positives**. Exiger un rang $n$ revient donc à exiger $\mathbf{rank}(D)=k$.

</details>

**Exam-style** — Montrez qu'un point extrême de $\{x\succeq0,\ Cx=d\}$ a au plus $\mathbf{rank}(C)$ composantes non nulles, et dites pourquoi ce fait fonde l'algorithme du simplexe.

<details><summary>Réponse</summary>

Si $\hat x$ est extrême avec $k$ composantes non nulles, les $k$ colonnes correspondantes de $C$ sont libres, donc $k\leq\mathbf{rank}(C)$. Conséquence algorithmique : les sommets sont des solutions **à support petit** — au plus $\mathbf{rank}(C)$ variables « en base », toutes les autres nulles. Le simplexe ne parcourt que ces solutions de base, en échangeant une variable entrante contre une sortante, au lieu d'explorer tout le polyèdre.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Formule du rang ? | $\dim\mathbf{nullspace}(A) = n-\mathbf{rank}(A)$ |
| Ensemble affine ? | Contient la **droite** passant par deux de ses points |
| Dimension d'un ensemble affine ? | Celle du sous-espace parallèle $L = S-\hat x$ |
| Indépendance affine de $v_1,\dots,v_k$ ? | Rang $k$ de la matrice des $v_i$ surmontée d'une ligne de $1$ |
| Espace de linéalité ? | $L=\mathbf{nullspace}\binom{A}{C}$ |
| Polyèdre pointu ? | $L=\{0\}$ : il ne contient aucune droite |
| Face $F_J$ ? | $\{x\in P\mid a_i^Tx=b_i,\ i\in J\}$, si non vide |
| Face minimale ? | Face ne contenant aucune autre face $\iff$ ensemble affine |
| Point extrême ? | Face minimale d'un polyèdre **pointu** |
| Test du rang ? | $\mathbf{rank}\binom{A_{J(\hat x)}}{C} = n$ avec $J(\hat x)$ les contraintes actives |
| Un polyèdre en forme standard est-il pointu ? | Oui, toujours |
| Nombre max de composantes non nulles d'un sommet standard ? | $\mathbf{rank}(C)$ |
| La boule unité est-elle un polyèdre ? | Non — il faudrait une infinité d'inégalités |
