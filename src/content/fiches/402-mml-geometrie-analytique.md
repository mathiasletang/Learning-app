# Fiche 402 — Géométrie analytique : normes, produits scalaires, projections, rotations

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 3 « Analytic Geometry » (p. 70-96) |
| **Difficulté** | Intermédiaire — la fondation qui donne un SENS GÉOMÉTRIQUE à l'algèbre linéaire |
| **Temps d'étude estimé** | 120 min |
| **Prérequis** | Fiche 401 — algèbre linéaire (bases, matrices, sous-espaces, applications linéaires) |
| **Concepts clés** | Norme, norme de Manhattan, norme euclidienne, application bilinéaire, produit scalaire, produit intérieur, matrice symétrique définie positive, longueur, distance, métrique, inégalité de Cauchy-Schwarz, angle, orthogonalité, orthonormalité, matrice orthogonale, base orthonormée, complément orthogonal, vecteur normal, produit intérieur de fonctions, projection orthogonale, matrice de projection, équation normale, pseudo-inverse, erreur de projection, Gram-Schmidt, projection affine, rotation, matrice de rotation, rotation de Givens |
| **Poids à l'examen** | Les **trois axiomes d'une norme** · les **trois propriétés d'un produit intérieur** · $\cos\omega=\frac{\langle x,y\rangle}{\lVert x\rVert\lVert y\rVert}$ · $AA^\top=I=A^\top A$ pour les matrices orthogonales · l'**équation normale** $B^\top B\lambda=B^\top x$ et $P_\pi=B(B^\top B)^{-1}B^\top$ · **Gram-Schmidt** · les **matrices de rotation** en $\mathbb R^2$ et $\mathbb R^3$. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : donner LONGUEUR, ANGLE et DISTANCE à un espace vectoriel

  §3.1 NORME ‖·‖                 3 axiomes : homogénéité absolue · inég. triangulaire · définie positive
        ℓ1 = Manhattan  Σ|xi|        ℓ2 = euclidienne  √(xᵀx)     ← défaut du livre
  §3.2 PRODUIT INTÉRIEUR ⟨·,·⟩   bilinéaire + SYMÉTRIQUE + DÉFINI POSITIF
        cas particulier : PRODUIT SCALAIRE xᵀy = Σ xi yi
        ⟨x,y⟩ = x̂ᵀ A ŷ  ⟺  A SYMÉTRIQUE DÉFINIE POSITIVE       (théorème 3.5)
  §3.3 LONGUEUR ET DISTANCE      ‖x‖ := √⟨x,x⟩       d(x,y) := ‖x−y‖
        Cauchy-Schwarz  |⟨x,y⟩| ≤ ‖x‖‖y‖      métrique : déf. pos. · symétrique · inég. triangulaire
  §3.4 ANGLE ET ORTHOGONALITÉ    cos ω = ⟨x,y⟩ / (‖x‖‖y‖)      x ⊥ y ⟺ ⟨x,y⟩ = 0
        matrice ORTHOGONALE : AAᵀ = I = AᵀA  ⟹  A⁻¹ = Aᵀ   (préserve longueurs ET angles)
  §3.5 BASE ORTHONORMÉE (ONB)    ⟨bi,bj⟩ = 0 pour i≠j   et   ⟨bi,bi⟩ = 1
  §3.6 COMPLÉMENT ORTHOGONAL U⊥  dim U⊥ = D − M ,  U ∩ U⊥ = {0} ,  vecteur NORMAL d'un plan
  §3.7 PRODUIT INTÉRIEUR DE FONCTIONS   ⟨u,v⟩ := ∫ₐᵇ u(x)v(x) dx      sin ⊥ cos sur [−π,π]
  §3.8 PROJECTION ORTHOGONALE    π ∘ π = π
        DROITE :        λ = bᵀx/‖b‖²        Pπ = bbᵀ/(bᵀb)
        SOUS-ESPACE :   B ᵀB λ = Bᵀx  (ÉQUATION NORMALE)  →  Pπ = B(BᵀB)⁻¹Bᵀ
        ONB : tout se simplifie      λ = Bᵀx     πU(x) = BBᵀx
        GRAM-SCHMIDT :  u1 := b1 ,  uk := bk − π_span[u1..uk−1](bk)
        AFFINE :        πL(x) = x0 + πU(x − x0)
  §3.9 ROTATIONS                 R(θ) = [[cos θ, −sin θ],[sin θ, cos θ]]
        R3 : R1, R2, R3 autour de e1, e2, e3      Rn : rotation de GIVENS Rij(θ)

LE DIAGRAMME DES DÉPENDANCES (figure 3.1)
  produit intérieur → NORME → orthogonalité → BASE ORTHONORMÉE → projection
  norme → longueurs → distances → ANGLES → rotations
```

> **La phrase d'ouverture.** *« Au chapitre 2, nous avons étudié les vecteurs, les espaces vectoriels et les applications linéaires **à un niveau général et abstrait**. Dans ce chapitre, nous **ajoutons de la géométrie**. »* Concrètement : longueurs, distances, angles — et le tout servira aux **SVM** (ch. 12), à l'**ACP** (ch. 10) et à la **régression linéaire** (ch. 9).

## 🔴 Concept 1 — Les normes (§3.1)

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.1 (Norme).</span>

Une **norme** sur un espace vectoriel $V$ est une fonction

$$\lVert\cdot\rVert:V\to\mathbb R,\qquad x\mapsto\lVert x\rVert$$

qui assigne à chaque vecteur $x$ sa **longueur** $\lVert x\rVert\in\mathbb R$, telle que pour tout $\lambda\in\mathbb R$ et $x,y\in V$ :

1. **Absolument homogène** : $\lVert\lambda x\rVert=|\lambda|\,\lVert x\rVert$
2. **Inégalité triangulaire** : $\lVert x+y\rVert\leqslant\lVert x\rVert+\lVert y\rVert$
3. **Définie positive** : $\lVert x\rVert\geqslant0$ et $\lVert x\rVert=0\iff x=0$

</div>

> **La lecture géométrique de l'inégalité triangulaire.** *« Pour n'importe quel triangle, la somme des longueurs de deux côtés quelconques doit être **supérieure ou égale** à la longueur du côté restant. »* Autrement dit $c\leqslant a+b$.

> ⚠️ **Homogène ABSOLUMENT** : c'est $|\lambda|$, valeur absolue, pas $\lambda$. Sinon $\lVert-x\rVert$ serait négatif.

**Exemple 3.1 — la norme de Manhattan.**

$$\boxed{\;\lVert x\rVert_1:=\sum_{i=1}^{n}|x_i|\;}$$

où $|\cdot|$ est la valeur absolue. Aussi appelée **norme $\ell_1$**. Le lieu $\lVert x\rVert_1=1$ dans $\mathbb R^2$ est un **losange** (carré tourné de $45^\circ$).

**Exemple 3.2 — la norme euclidienne.**

$$\boxed{\;\lVert x\rVert_2:=\sqrt{\sum_{i=1}^{n}x_i^2}=\sqrt{x^\top x}\;}$$

Elle calcule la **distance euclidienne** de $x$ à l'origine. Aussi appelée **norme $\ell_2$**. Le lieu $\lVert x\rVert_2=1$ dans $\mathbb R^2$ est le **cercle unité**.

> **Convention du livre.** *« Dans tout ce livre, nous utiliserons la norme euclidienne **par défaut** sauf mention contraire. »*

> ⚠️ **Le champ d'application.** La définition 3.1 est donnée pour un espace vectoriel $V$ général, mais *« dans ce livre nous ne considérerons que l'espace vectoriel de dimension finie $\mathbb R^n$ »*.

## 🔴 Concept 2 — Produits intérieurs (§3.2)

### 2.1 Pourquoi

> *« Les produits intérieurs permettent d'introduire des concepts géométriques intuitifs, comme la **longueur** d'un vecteur et l'**angle** ou la **distance** entre deux vecteurs. Un objectif majeur des produits intérieurs est de déterminer si des vecteurs sont **ORTHOGONAUX** entre eux. »*

### 2.2 Le produit scalaire (cas particulier)

$$\boxed{\;x^\top y=\sum_{i=1}^{n}x_iy_i\;}$$

Appelé **produit scalaire** (*scalar product*) ou **produit point** (*dot product*) dans $\mathbb R^n$. Le livre insiste : *« les produits intérieurs sont des concepts **plus généraux**, avec des propriétés spécifiques. »*

### 2.3 Applications bilinéaires

Une application $\Omega$ à **deux arguments** est **bilinéaire** si elle est linéaire **en chaque argument** : pour tout $x,y,z\in V$, $\lambda,\psi\in\mathbb R$,

$$\Omega(\lambda x+\psi y,\,z)=\lambda\Omega(x,z)+\psi\Omega(y,z)\qquad\text{(linéaire au 1er argument)}$$

$$\Omega(x,\,\lambda y+\psi z)=\lambda\Omega(x,y)+\psi\Omega(x,z)\qquad\text{(linéaire au 2e argument)}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.2.</span>

Soit $\Omega:V\times V\to\mathbb R$ bilinéaire. Alors :

- $\Omega$ est **symétrique** si $\Omega(x,y)=\Omega(y,x)$ pour tous $x,y\in V$ — *l'ordre des arguments n'importe pas*.
- $\Omega$ est **définie positive** si $$\forall x\in V\setminus\{0\}:\ \Omega(x,x)>0,\qquad \Omega(0,0)=0$$

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.3 (Produit intérieur).</span>

Une application bilinéaire **définie positive et symétrique** $\Omega:V\times V\to\mathbb R$ est un **produit intérieur** sur $V$. On note $\langle x,y\rangle$ plutôt que $\Omega(x,y)$.

- Le couple $(V,\langle\cdot,\cdot\rangle)$ est un **espace de produit intérieur** (ou *espace vectoriel avec produit intérieur*).
- Si $\langle\cdot,\cdot\rangle$ est le **produit scalaire**, $(V,\langle\cdot,\cdot\rangle)$ est un **espace vectoriel euclidien**.

</div>

**Exemple 3.3 — un produit intérieur qui n'est PAS le produit scalaire.** Sur $V=\mathbb R^2$ :

$$\boxed{\;\langle x,y\rangle:=x_1y_1-(x_1y_2+x_2y_1)+2x_2y_2\;}$$

est un produit intérieur, **différent** du produit scalaire.

<details><summary>Écriture matricielle et vérification de la définie positivité</summary>

$$\langle x,y\rangle=x^\top\begin{bmatrix}1&-1\\-1&2\end{bmatrix}y$$

Symétrie de la matrice (donc $\Omega$ symétrique). Définie positivité :

$$x^\top Ax=x_1^2-2x_1x_2+2x_2^2=(x_1-x_2)^2+x_2^2>0\quad\text{sauf si } x_1=x_2=0$$

C'est une **somme de deux carrés** qui ne s'annule simultanément qu'en $x=0$

</details>

### 2.4 Matrices symétriques définies positives

Soient $V$ de dimension $n$, un produit intérieur $\langle\cdot,\cdot\rangle$ et une base ordonnée $B=(b_1,\dots,b_n)$. Tout $x=\sum_i\psi_ib_i$ et $y=\sum_j\lambda_jb_j$. Par **bilinéarité** :

$$\langle x,y\rangle=\left\langle\sum_{i=1}^{n}\psi_ib_i,\ \sum_{j=1}^{n}\lambda_jb_j\right\rangle=\sum_{i=1}^{n}\sum_{j=1}^{n}\psi_i\,\langle b_i,b_j\rangle\,\lambda_j=\hat x^\top A\hat y$$

avec $A_{ij}:=\langle b_i,b_j\rangle$, et $\hat x,\hat y$ les **coordonnées** de $x,y$ dans la base $B$.

> **Deux conséquences immédiates.** (i) Le produit intérieur est **uniquement déterminé par $A$**. (ii) La **symétrie** du produit intérieur entraîne que **$A$ est symétrique**. (iii) La **définie positivité** entraîne
>
> $$\forall x\in V\setminus\{0\}:\quad x^\top Ax>0$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.4 (Matrice symétrique définie positive).</span>

Une matrice **symétrique** $A\in\mathbb R^{n\times n}$ satisfaisant $x^\top Ax>0$ pour tout $x\neq0$ est dite **symétrique définie positive** (ou simplement **définie positive**). Si seul $\geqslant$ est vérifié, $A$ est **symétrique semi-définie positive**.

</div>

**Exemple 3.4.**

$$A_1=\begin{bmatrix}9&6\\6&5\end{bmatrix},\qquad A_2=\begin{bmatrix}9&6\\6&3\end{bmatrix}$$

$A_1$ est définie positive car symétrique et

$$x^\top A_1x=9x_1^2+12x_1x_2+5x_2^2=(3x_1+2x_2)^2+x_2^2>0\quad\forall x\neq0$$

$A_2$ est symétrique **mais PAS définie positive** car

$$x^\top A_2x=9x_1^2+12x_1x_2+3x_2^2=(3x_1+2x_2)^2-x_2^2$$

peut être $<0$, par exemple pour $x=[2,-3]^\top$.

<details><summary>Contrôle numérique du contre-exemple</summary>

Pour $x=[2,-3]^\top$ : $3x_1+2x_2=6-6=0$, donc

$$x^\top A_2x=0^2-(-3)^2=-9<0\quad\text{ (calcul direct : } 9\cdot4+12\cdot2\cdot(-3)+3\cdot9=36-72+27=-9)$$

Et pour la même valeur, $x^\top A_1x=0^2+(-3)^2=+9>0$ (direct : $36-72+45=9$). La **complétion du carré** est la technique : la seule différence entre les deux matrices est le signe du terme résiduel $\pm x_2^2$.

</details>

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 3.5.</span>

Pour un espace vectoriel réel de dimension finie $V$ et une base ordonnée $B$ de $V$ :

$$\boxed{\;\langle\cdot,\cdot\rangle:V\times V\to\mathbb R\text{ est un produit intérieur}\iff\exists A\in\mathbb R^{n\times n}\text{ symétrique définie positive avec }\langle x,y\rangle=\hat x^\top A\hat y\;}$$

</div>

**Les deux propriétés qui découlent** d'une matrice $A$ symétrique définie positive :

- **Le noyau de $A$ est réduit à $\{0\}$**, puisque $x^\top Ax>0$ pour tout $x\neq0$ ; donc $Ax\neq0$ dès que $x\neq0$. ( En conséquence, $A$ est **inversible**.)
- **Les éléments diagonaux $a_{ii}$ sont positifs**, car $a_{ii}=e_i^\top Ae_i>0$, où $e_i$ est le $i$-ème vecteur de la base canonique.

## 🔴 Concept 3 — Longueurs et distances (§3.3)

**Tout produit intérieur induit une norme :**

$$\boxed{\;\lVert x\rVert:=\sqrt{\langle x,x\rangle}\;}$$

> ⚠️ **La réciproque est FAUSSE.** *« Toute norme n'est pas induite par un produit intérieur. La **norme de Manhattan** est un exemple de norme sans produit intérieur correspondant. »*

> **Inégalité de Cauchy-Schwarz.** Pour un espace de produit intérieur $(V,\langle\cdot,\cdot\rangle)$, la norme induite satisfait
>
> $$\boxed{\;|\langle x,y\rangle|\leqslant\lVert x\rVert\,\lVert y\rVert\;}$$

**Exemple 3.5 — la longueur dépend du produit intérieur choisi.** Soit $x=[1,1]^\top\in\mathbb R^2$.

Avec le **produit scalaire** :

$$\lVert x\rVert=\sqrt{x^\top x}=\sqrt{1^2+1^2}=\sqrt2$$

Avec le produit intérieur

$$\langle x,y\rangle:=x^\top\begin{bmatrix}1&-\tfrac12\\-\tfrac12&1\end{bmatrix}y=x_1y_1-\tfrac12(x_1y_2+x_2y_1)+x_2y_2$$

on obtient

$$\langle x,x\rangle=x_1^2-x_1x_2+x_2^2=1-1+1=1\quad\Longrightarrow\quad\lVert x\rVert=\sqrt1=1$$

$x$ est donc **« plus court »** avec ce produit intérieur qu'avec le produit scalaire.

> **La règle de comportement de ce produit intérieur** : il renvoie des valeurs **plus petites** que le produit scalaire quand $x_1$ et $x_2$ ont **le même signe** ($x_1x_2>0$), et **plus grandes** sinon.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.6 (Distance et métrique).</span>

Dans un espace de produit intérieur $(V,\langle\cdot,\cdot\rangle)$,

$$\boxed{\;d(x,y):=\lVert x-y\rVert=\sqrt{\langle x-y,\ x-y\rangle}\;}$$

est la **distance** entre $x$ et $y$. Avec le **produit scalaire**, c'est la **distance euclidienne**. L'application

$$d:V\times V\to\mathbb R,\qquad(x,y)\mapsto d(x,y)$$

est appelée une **métrique**.

</div>

**Une métrique satisfait trois propriétés :**

1. **Définie positive** : $d(x,y)\geqslant0$ pour tous $x,y\in V$, et $d(x,y)=0\iff x=y$.
2. **Symétrique** : $d(x,y)=d(y,x)$ pour tous $x,y\in V$.
3. **Inégalité triangulaire** : $d(x,z)\leqslant d(x,y)+d(y,z)$ pour tous $x,y,z\in V$.

> ⚠️ **Une norme suffit pour une distance.** *« Comme pour la longueur d'un vecteur, la distance entre vecteurs **ne nécessite pas de produit intérieur** : une norme suffit. »*

> ⚠️ **Le piège de similarité entre les deux listes de propriétés.** *« Au premier abord, les listes de propriétés des produits intérieurs et des métriques se ressemblent beaucoup. Mais en comparant les définitions 3.3 et 3.6, on observe que $\langle x,y\rangle$ et $d(x,y)$ se comportent dans des **DIRECTIONS OPPOSÉES** : des $x$ et $y$ très similaires donneront une **GRANDE** valeur du produit intérieur et une **PETITE** valeur de la métrique. »*

## 🔴 Concept 4 — Angles et orthogonalité (§3.4)

### 4.1 L'angle entre deux vecteurs

Grâce à Cauchy-Schwarz, le quotient ci-dessous est dans $[-1,1]$ ; comme $\cos$ restreinte à $[0,\pi]$ est une bijection sur $[-1,1]$, il existe un **unique** $\omega\in[0,\pi]$ avec

$$\boxed{\;\cos\omega=\frac{\langle x,y\rangle}{\lVert x\rVert\,\lVert y\rVert}\;}$$

$\omega$ est l'**angle** entre $x$ et $y$.

> **L'intuition.** *« L'angle entre deux vecteurs nous dit **à quel point leurs orientations sont similaires**. »* Avec le produit scalaire, l'angle entre $x$ et $y=4x$ (une version mise à l'échelle de $x$) vaut $0$ : **même orientation**.

**Exemple 3.6.** Pour $x=[1,1]^\top$ et $y=[1,2]^\top$ avec le produit scalaire :

$$\cos\omega=\frac{x^\top y}{\sqrt{x^\top x}\sqrt{y^\top y}}=\frac{3}{\sqrt{10}}$$

$$\omega=\arccos\!\left(\frac{3}{\sqrt{10}}\right)\approx0{,}32\ \text{rad}\approx18^\circ$$

<details><summary>Recalcul complet</summary>

$x^\top y=1\cdot1+1\cdot2=3$ ; $\lVert x\rVert=\sqrt2$ ; $\lVert y\rVert=\sqrt5$ ; produit $=\sqrt{10}$.

$\cos\omega=3/\sqrt{10}=0{,}9486833$, $\omega=0{,}3217506$ rad $=18{,}4349^\circ$. Cohérent avec les « $0{,}32$ rad, environ $18^\circ$ » du livre.

</details>

### 4.2 Orthogonalité

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.7 (Orthogonalité).</span>

Deux vecteurs $x$ et $y$ sont **orthogonaux** si et seulement si $\langle x,y\rangle=0$, ce qu'on note $x\perp y$. Si de plus $\lVert x\rVert=1=\lVert y\rVert$ (vecteurs **unitaires**), $x$ et $y$ sont **ORTHONORMÉS**.

</div>

> ⚠️ **Une implication immédiate** : *« le vecteur $0$ est orthogonal à **tout** vecteur de l'espace vectoriel. »*

> **Orthogonalité = perpendicularité généralisée.** *« L'orthogonalité est la généralisation de la perpendicularité à des formes bilinéaires qui n'ont pas à être le produit scalaire. Géométriquement, on peut penser à des vecteurs orthogonaux comme formant un **angle droit relativement à un produit intérieur SPÉCIFIQUE**. »*

**Exemple 3.7 — l'orthogonalité DÉPEND du produit intérieur.** Soient $x=[1,1]^\top$ et $y=[-1,1]^\top$.

| Produit intérieur | Résultat |
|---|---|
| Produit scalaire | $\langle x,y\rangle=-1+1=0$, angle $=90^\circ$, donc $x\perp y$ |
| $\langle x,y\rangle=x^\top\begin{bmatrix}2&0\\0&1\end{bmatrix}y$ | $\cos\omega=-\tfrac13$, $\omega\approx1{,}91$ rad $\approx109{,}5^\circ$ — **PAS orthogonaux** |

> ⚠️ **La conclusion du livre, à retenir mot pour mot** : *« Des vecteurs orthogonaux relativement à **un** produit intérieur n'ont pas à être orthogonaux relativement à un **autre** produit intérieur. »*

<details><summary>Recalcul de l'exemple 3.7</summary>

Avec $A=\operatorname{diag}(2,1)$ : $\langle x,y\rangle=2\cdot1\cdot(-1)+1\cdot1\cdot1=-2+1=-1$.

$\langle x,x\rangle=2+1=3$ ; $\langle y,y\rangle=2+1=3$. Donc $\cos\omega=-1/\sqrt{3\cdot3}=-1/3$

$\omega=\arccos(-1/3)=1{,}9106$ rad $=109{,}471^\circ$ (l'angle « tétraédrique » classique).

</details>

### 4.3 Matrices orthogonales

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.8 (Matrice orthogonale).</span>

Une matrice carrée $A\in\mathbb R^{n\times n}$ est **orthogonale** si et seulement si ses **colonnes sont ORTHONORMÉES**, ce qui donne

$$\boxed{\;AA^\top=I=A^\top A\quad\Longrightarrow\quad A^{-1}=A^\top\;}$$

**l'inverse s'obtient par simple transposition.**

</div>

> ⚠️ **Le nom est trompeur.** *« Il est conventionnel d'appeler ces matrices « orthogonales », mais une description plus précise serait « **ORTHONORMÉES** ». »*

**Les deux invariances — la raison d'être de ces matrices.**

**Longueurs préservées** (pour le produit scalaire) :

$$\lVert Ax\rVert^2=(Ax)^\top(Ax)=x^\top A^\top Ax=x^\top Ix=x^\top x=\lVert x\rVert^2$$

**Angles préservés** : le $\cos\omega$ entre $Ax$ et $Ay$ vaut

$$\cos\omega=\frac{(Ax)^\top(Ay)}{\lVert Ax\rVert\lVert Ay\rVert}=\frac{x^\top A^\top Ay}{\sqrt{x^\top A^\top Ax\ \,y^\top A^\top Ay}}=\frac{x^\top y}{\lVert x\rVert\lVert y\rVert}$$

> *« Les transformations par matrices orthogonales **préservent les distances ET les angles**. »* C'est exactement ce que font les **rotations** (§3.9) et les **réflexions**.

## 🟠 Concept 5 — Base orthonormée et complément orthogonal (§3.5-3.6)

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.9 (Base orthonormée, ONB).</span>

Pour $V$ de dimension $n$ et une base $\{b_1,\dots,b_n\}$ de $V$, si

$$\langle b_i,b_j\rangle=0\ \text{ pour } i\neq j\qquad\text{et}\qquad\langle b_i,b_i\rangle=1$$

pour tous $i,j$, la base est une **base orthonormée** (*orthonormal basis*, **ONB**). Si **seule** la première condition est satisfaite, c'est une **base orthogonale**.

</div>

⚠️ La seconde condition impose que **chaque vecteur de base ait une longueur de $1$**.

**Comment en construire une.** Partant de vecteurs $\{\tilde b_1,\dots,\tilde b_n\}$ non orthogonaux et non normalisés, on les concatène dans $\tilde B=[\tilde b_1,\dots,\tilde b_n]$ et on applique l'élimination de Gauss à la matrice augmentée $[\tilde B\tilde B^\top\mid\tilde B]$. La construction itérative correspondante s'appelle le **procédé de Gram-Schmidt** (§3.8.3).

**Exemple 3.8.** La base canonique de $\mathbb R^n$ est une ONB pour le produit scalaire. Dans $\mathbb R^2$, une autre ONB :

$$b_1=\frac{1}{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},\qquad b_2=\frac{1}{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}$$

car $b_1^\top b_2=\tfrac12(1-1)=0$ et $\lVert b_1\rVert=1=\lVert b_2\rVert$.

> **Où cela servira** : les **SVM** (ch. 12) et l'**ACP** (ch. 10).

### 5.2 Le complément orthogonal

Pour $V$ de dimension $D$ et $U\subseteq V$ un sous-espace de dimension $M$ :

| Objet | Propriété |
|---|---|
| $U^\perp$ | Sous-espace **orthogonal** de dimension $\boxed{D-M}$ |
| Contenu | **Tous** les vecteurs de $V$ orthogonaux à **chaque** vecteur de $U$ |
| Intersection | $\boxed{U\cap U^\perp=\{0\}}$ |

**Décomposition unique.** Tout $x\in V$ s'écrit **de façon unique**

$$\boxed{\;x=\sum_{m=1}^{M}\lambda_mb_m+\sum_{j=1}^{D-M}\psi_jb_j^\perp,\qquad\lambda_m,\psi_j\in\mathbb R\;}$$

où $(b_1,\dots,b_M)$ est une base de $U$ et $(b_1^\perp,\dots,b_{D-M}^\perp)$ une base de $U^\perp$.

**Le vecteur normal.** Un **plan** $U$ (sous-espace de dimension 2) dans un espace de dimension 3 se décrit par son complément orthogonal, de dimension $3-2=1$ : le vecteur $w$ avec $\lVert w\rVert=1$, orthogonal au plan, est le **vecteur de base** de $U^\perp$. On l'appelle le **vecteur NORMAL** de $U$. *« Tous les vecteurs orthogonaux à $w$ doivent (par construction) se trouver dans le plan $U$. »*

> **Généralisation.** *« Les compléments orthogonaux servent à décrire des **HYPERPLANS** dans les espaces vectoriels et affines de dimension $n$. »* C'est le fondement géométrique du chapitre 10 (réduction de dimension) et du chapitre 12 (SVM).

## 🟡 Concept 6 — Produit intérieur de fonctions (§3.7)

**L'idée.** Un vecteur $x\in\mathbb R^n$ peut être vu comme une **fonction à $n$ valeurs**. En passant à un nombre **infini** d'entrées (dénombrable, puis continu), la **somme** sur les composantes devient une **intégrale** :

$$\boxed{\;\langle u,v\rangle:=\int_a^b u(x)\,v(x)\,dx\;}$$

pour des bornes $a,b<\infty$. Comme pour le produit intérieur usuel, on définit **normes** et **orthogonalité** à partir de là : si l'intégrale vaut $0$, les fonctions $u$ et $v$ sont **orthogonales**.

**Exemple 3.9.** Avec $u=\sin(x)$ et $v=\cos(x)$, l'intégrande $f(x)=\sin(x)\cos(x)$ est une fonction **impaire** : $f(-x)=-f(x)$. L'intégrale sur $[-\pi,\pi]$ vaut donc $0$.

$$\boxed{\;\int_{-\pi}^{\pi}\sin(x)\cos(x)\,dx=0\quad\Longrightarrow\quad\sin\perp\cos\;}$$

**La famille orthogonale.** *« La collection de fonctions $\{1,\ \cos(x),\ \cos(2x),\ \cos(3x),\dots\}$ est orthogonale si l'on intègre de $-\pi$ à $\pi$ »* — toute paire de fonctions y est orthogonale. Cette famille engendre un grand sous-espace des fonctions **paires** et **périodiques** sur $[-\pi,\pi)$ ; en y projetant, on obtient la **série de Fourier**.

> ⚠️ **La mise en garde de rigueur du livre.** *« Pour rendre ce produit intérieur mathématiquement précis, il faut s'occuper des **mesures** et de la définition des **intégrales**, ce qui conduit à la définition d'un **espace de Hilbert**. De plus, contrairement aux produits intérieurs sur des vecteurs de dimension finie, les produits intérieurs de fonctions peuvent **DIVERGER** (valoir l'infini). Tout cela demande de plonger dans des détails plus fins d'analyse réelle et fonctionnelle, que nous ne couvrons pas. »*

## 🔴 Concept 7 — Projections orthogonales (§3.8)

### 7.1 Pourquoi et définition

> **La motivation ML.** *« Les données de grande dimension possèdent souvent la propriété que **seules quelques dimensions contiennent la majeure partie de l'information**, et que la plupart des autres dimensions ne sont pas essentielles. Quand on compresse ou visualise des données de grande dimension, on **perd de l'information**. Pour minimiser cette perte de compression, on cherche idéalement les dimensions **les plus informatives**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.10 (Projection).</span>

Soient $V$ un espace vectoriel et $U\subseteq V$ un sous-espace. Une application linéaire $\pi:V\to U$ est une **projection** si

$$\boxed{\;\pi^2=\pi\circ\pi=\pi\;}$$

Comme toute application linéaire s'exprime par une matrice, cela s'applique aux **matrices de projection** $P_\pi$, qui vérifient $P_\pi^2=P_\pi$.

</div>

> **La propriété-clé.** *« Pour un sous-espace de dimension inférieure donné, les projections orthogonales de données de grande dimension **retiennent autant d'information que possible** et **minimisent la différence/erreur** entre les données originales et leur projection. »*

### 7.2 Projection sur une droite (sous-espace de dimension 1)

Soit une droite $U\subseteq\mathbb R^n$ passant par l'origine, engendrée par $b\in\mathbb R^n$. On cherche $\pi_U(x)\in U$ **le plus proche** de $x$.

**Les deux propriétés caractéristiques :**

- $\pi_U(x)$ est **le plus proche** de $x$ : la distance $\lVert x-\pi_U(x)\rVert$ est **minimale**. Il s'ensuit que le segment $\pi_U(x)-x$ est **orthogonal à $U$**, donc au vecteur de base $b$ : $\langle\pi_U(x)-x,\ b\rangle=0$.
- $\pi_U(x)\in U$, donc c'est un **multiple** de $b$ : $\pi_U(x)=\lambda b$ pour un $\lambda\in\mathbb R$. Ce $\lambda$ est la **coordonnée** de $\pi_U(x)$ relativement à $b$.

**Étape 1 — trouver la coordonnée $\lambda$.**

$$\langle x-\pi_U(x),\ b\rangle=0\ \overset{\pi_U(x)=\lambda b}{\Longleftrightarrow}\ \langle x-\lambda b,\ b\rangle=0$$

Par **bilinéarité** :

$$\langle x,b\rangle-\lambda\langle b,b\rangle=0\quad\Longleftrightarrow\quad\boxed{\;\lambda=\frac{\langle x,b\rangle}{\langle b,b\rangle}=\frac{\langle b,x\rangle}{\lVert b\rVert^2}\;}$$

Avec le **produit scalaire** :

$$\lambda=\frac{b^\top x}{b^\top b}=\frac{b^\top x}{\lVert b\rVert^2}$$

⚠️ Si $\lVert b\rVert=1$, alors simplement $\lambda=b^\top x$.

**Étape 2 — trouver le point projeté.**

$$\boxed{\;\pi_U(x)=\lambda b=\frac{\langle x,b\rangle}{\lVert b\rVert^2}\,b=\frac{b^\top x}{\lVert b\rVert^2}\,b\;}$$

(la dernière égalité ne vaut que pour le produit scalaire). Sa longueur :

$$\lVert\pi_U(x)\rVert=\lVert\lambda b\rVert=|\lambda|\,\lVert b\rVert$$

et, pour le produit scalaire,

$$\lVert\pi_U(x)\rVert=\frac{|b^\top x|}{\lVert b\rVert^2}\lVert b\rVert=|\cos\omega|\;\lVert x\rVert\;\frac{\lVert b\rVert\lVert b\rVert}{\lVert b\rVert^2}=|\cos\omega|\,\lVert x\rVert$$

> **Le lien avec la trigonométrie du lycée.** Si $\lVert x\rVert=1$, $x$ est sur le cercle unité, et la projection sur l'axe horizontal engendré par $b$ vaut **exactement $\cos\omega$**.

**Étape 3 — la matrice de projection.** Puisque la projection est **linéaire**, il existe $P_\pi$ avec $\pi_U(x)=P_\pi x$ :

$$\pi_U(x)=\lambda b=b\lambda=b\,\frac{b^\top x}{\lVert b\rVert^2}=\frac{bb^\top}{\lVert b\rVert^2}\,x$$

$$\boxed{\;P_\pi=\frac{bb^\top}{\lVert b\rVert^2}=\frac{bb^\top}{b^\top b}\;}$$

⚠️ $bb^\top$ est une **matrice symétrique de rang 1** (produit extérieur), et $\lVert b\rVert^2$ est un **scalaire** : ne pas confondre les deux.

**Exemple 3.10.** Projection sur la droite engendrée par $b=[1,2,2]^\top$. On a $b^\top b=1+4+4=9$, donc

$$P_\pi=\frac{bb^\top}{b^\top b}=\frac19\begin{bmatrix}1\\2\\2\end{bmatrix}\begin{bmatrix}1&2&2\end{bmatrix}=\frac19\begin{bmatrix}1&2&2\\2&4&4\\2&4&4\end{bmatrix}$$

Pour $x=[1,1,1]^\top$ :

$$\pi_U(x)=P_\pi x=\frac19\begin{bmatrix}1&2&2\\2&4&4\\2&4&4\end{bmatrix}\begin{bmatrix}1\\1\\1\end{bmatrix}=\frac19\begin{bmatrix}5\\10\\10\end{bmatrix}\in\operatorname{span}\left[\begin{bmatrix}1\\2\\2\end{bmatrix}\right]$$

<details><summary>Vérifications : appartenance au span et idempotence</summary>

$\frac19[5,10,10]^\top=\frac59[1,2,2]^\top$ : c'est bien un **multiple de $b$**, avec $\lambda=\frac59$ Et directement : $\lambda=b^\top x/b^\top b=(1+2+2)/9=5/9$

**Idempotence** : $P_\pi^2=P_\pi$ vérifié en arithmétique exacte (fractions). *« L'application de $P_\pi$ à $\pi_U(x)$ ne change rien : $P_\pi\pi_U(x)=\pi_U(x)$. »* C'est la définition 3.10.

</details>

### 7.3 Projection sur un sous-espace général

Soit $U\subseteq\mathbb R^n$ avec $\dim(U)=m\geqslant1$ et $(b_1,\dots,b_m)$ une **base ordonnée** de $U$.

> ⚠️ **Avertissement du livre.** *« Si $U$ est donné par un ensemble de vecteurs générateurs qui **ne forment pas une base**, assurez-vous de déterminer une base $b_1,\dots,b_m$ avant de continuer. »* (Méthode : fiche 401, colonnes de pivot.)

**Étape 1 — les coordonnées $\lambda$.** On écrit

$$\pi_U(x)=\sum_{i=1}^{m}\lambda_ib_i=B\lambda,\qquad B=[b_1,\dots,b_m]\in\mathbb R^{n\times m},\quad\lambda=[\lambda_1,\dots,\lambda_m]^\top\in\mathbb R^m$$

« Le plus proche » signifie que le vecteur reliant $\pi_U(x)$ à $x$ doit être orthogonal **à tous** les vecteurs de base, d'où **$m$ conditions simultanées** :

$$b_1^\top(x-B\lambda)=0,\quad\dots,\quad b_m^\top(x-B\lambda)=0$$

En empilant :

$$B^\top(x-B\lambda)=0\quad\Longleftrightarrow\quad\boxed{\;B^\top B\lambda=B^\top x\;}$$

C'est l'**ÉQUATION NORMALE**. Comme $b_1,\dots,b_m$ forment une base (donc sont indépendants), $B^\top B\in\mathbb R^{m\times m}$ est **régulière** et inversible :

$$\boxed{\;\lambda=(B^\top B)^{-1}B^\top x\;}$$

La matrice $(B^\top B)^{-1}B^\top$ est la **pseudo-inverse** de $B$ ; elle se calcule pour des $B$ **non carrées**. Elle demande seulement que $B^\top B$ soit définie positive, ce qui est le cas si **$B$ est de rang plein**.

> **La note pratique.** *« Dans les applications (par exemple la **régression linéaire**), on ajoute souvent un « terme de gigue » $\epsilon I$ à $B^\top B$ pour garantir une **stabilité numérique accrue** et la définie positivité. Cette « **ridge** » peut être rigoureusement dérivée par l'**inférence bayésienne** (chapitre 9). »*

**Étape 2 — le point projeté.**

$$\boxed{\;\pi_U(x)=B\lambda=B(B^\top B)^{-1}B^\top x\;}$$

**Étape 3 — la matrice de projection.**

$$\boxed{\;P_\pi=B(B^\top B)^{-1}B^\top\;}$$

> **Le cas 1D est un cas particulier.** Si $\dim(U)=1$, $B^\top B\in\mathbb R$ est un **scalaire**, et $P_\pi=B(B^\top B)^{-1}B^\top$ se réécrit $P_\pi=\dfrac{BB^\top}{B^\top B}$ — exactement (3.46).

**Exemple 3.11.** Pour $U=\operatorname{span}\!\left[[1,1,1]^\top,\ [0,1,2]^\top\right]\subseteq\mathbb R^3$ et $x=[6,0,0]^\top$.

**Premièrement**, la famille génératrice est bien une base (indépendance), et

$$B=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix}$$

**Deuxièmement** :

$$B^\top B=\begin{bmatrix}3&3\\3&5\end{bmatrix},\qquad B^\top x=\begin{bmatrix}6\\0\end{bmatrix}$$

**Troisièmement**, l'équation normale $B^\top B\lambda=B^\top x$ :

$$\begin{bmatrix}3&3\\3&5\end{bmatrix}\begin{bmatrix}\lambda_1\\\lambda_2\end{bmatrix}=\begin{bmatrix}6\\0\end{bmatrix}\quad\Longleftrightarrow\quad\lambda=\begin{bmatrix}5\\-3\end{bmatrix}$$

**Quatrièmement**, la projection :

$$\pi_U(x)=B\lambda=\begin{bmatrix}5\\2\\-1\end{bmatrix}$$

L'**erreur de projection** (aussi appelée **erreur de reconstruction**) :

$$\lVert x-\pi_U(x)\rVert=\left\lVert[1,-2,1]^\top\right\rVert=\sqrt6$$

**Cinquièmement**, la matrice de projection :

$$P_\pi=B(B^\top B)^{-1}B^\top=\frac16\begin{bmatrix}5&2&-1\\2&2&2\\-1&2&5\end{bmatrix}$$

<details><summary>Recalcul intégral en fractions exactes</summary>

$B^\top B=\begin{bmatrix}3&3\\3&5\end{bmatrix}$, $\det=15-9=6$, $(B^\top B)^{-1}=\frac16\begin{bmatrix}5&-3\\-3&3\end{bmatrix}$.

$\lambda=\frac16\begin{bmatrix}5&-3\\-3&3\end{bmatrix}\begin{bmatrix}6\\0\end{bmatrix}=\frac16\begin{bmatrix}30\\-18\end{bmatrix}=\begin{bmatrix}5\\-3\end{bmatrix}$

$\pi_U(x)=5[1,1,1]^\top-3[0,1,2]^\top=[5,\,5-3,\,5-6]^\top=[5,2,-1]^\top$

$x-\pi_U(x)=[6-5,\,0-2,\,0+1]^\top=[1,-2,1]^\top$, norme $=\sqrt{1+4+1}=\sqrt6\approx2{,}4495$

$P_\pi=\begin{bmatrix}5/6&1/3&-1/6\\1/3&1/3&1/3\\-1/6&1/3&5/6\end{bmatrix}$, soit $\frac16\begin{bmatrix}5&2&-1\\2&2&2\\-1&2&5\end{bmatrix}$ et $P_\pi^2=P_\pi$ vérifié exactement

**Les deux contrôles recommandés par le livre** : (a) le vecteur de déplacement $\pi_U(x)-x$ est orthogonal à tous les vecteurs de base — $[-1,2,-1]\cdot[1,1,1]=0$ et $[-1,2,-1]\cdot[0,1,2]=0+2-2=0$ ; (b) $P_\pi=P_\pi^2$

</details>

**Deux remarques essentielles :**

> ⚠️ *« Les projections $\pi_U(x)$ sont **toujours des vecteurs de $\mathbb R^n$** bien qu'elles vivent dans un sous-espace $U$ de dimension $m$. Cependant, pour **représenter** un vecteur projeté, on n'a besoin que des **$m$ coordonnées** $\lambda_1,\dots,\lambda_m$. »* C'est **toute l'idée de la compression** (chapitre 10).

> **La simplification avec une ONB.** Si $\{b_1,\dots,b_k\}$ est une **base ORTHONORMÉE**, alors $B^\top B=I$ et tout se simplifie :
>
> $$\boxed{\;\lambda=B^\top x\qquad\qquad\pi_U(x)=BB^\top x\;}$$
>
> *« On n'a plus besoin de calculer l'inverse, ce qui **économise du temps de calcul**. »*

### 7.4 Le lien avec les systèmes insolubles — les moindres carrés

*« Les projections permettent de traiter les situations où l'on a un système $Ax=b$ **sans solution**. Cela veut dire que $b$ **n'appartient pas au span des colonnes de $A$**. Comme on ne peut pas résoudre exactement, on cherche une solution **approchée** : le vecteur du sous-espace engendré par les colonnes de $A$ **le plus proche de $b$**, c'est-à-dire la **projection orthogonale** de $b$ sur ce sous-espace. »*

$$\boxed{\;\text{Solution des MOINDRES CARRÉS d'un système surdéterminé}\;}$$

> Développé au **§9.4** (régression linéaire). Et l'utilisation des **erreurs de reconstruction** est une façon de dériver l'**analyse en composantes principales** (§10.3).

### 7.5 Orthogonalisation de Gram-Schmidt

> **Le procédé.** Il transforme **constructivement** toute base $(b_1,\dots,b_n)$ d'un espace $V$ de dimension $n$ en une base **orthogonale / orthonormée** $(u_1,\dots,u_n)$, avec $\operatorname{span}[b_1,\dots,b_n]=\operatorname{span}[u_1,\dots,u_n]$ :

$$\boxed{\;u_1:=b_1\;}$$

$$\boxed{\;u_k:=b_k-\pi_{\operatorname{span}[u_1,\dots,u_{k-1}]}(b_k),\qquad k=2,\dots,n\;}$$

**Le mécanisme.** *« Le $k$-ième vecteur de base $b_k$ est projeté sur le sous-espace engendré par les $k-1$ vecteurs orthogonaux déjà construits $u_1,\dots,u_{k-1}$. Cette projection est ensuite **soustraite** de $b_k$, ce qui donne un vecteur $u_k$ **orthogonal** au sous-espace de dimension $k-1$ engendré par $u_1,\dots,u_{k-1}$. »* En **normalisant** les $u_k$, on obtient une **ONB** avec $\lVert u_k\rVert=1$.

**Exemple 3.12.** Base $(b_1,b_2)$ de $\mathbb R^2$ avec $b_1=[2,0]^\top$, $b_2=[1,1]^\top$ (produit scalaire) :

$$u_1:=b_1=\begin{bmatrix}2\\0\end{bmatrix}$$

$$u_2:=b_2-\pi_{\operatorname{span}[u_1]}(b_2)=b_2-\frac{u_1u_1^\top}{\lVert u_1\rVert^2}b_2=\begin{bmatrix}1\\1\end{bmatrix}-\begin{bmatrix}1&0\\0&0\end{bmatrix}\begin{bmatrix}1\\1\end{bmatrix}=\begin{bmatrix}0\\1\end{bmatrix}$$

⚠️ On vérifie immédiatement que $u_1^\top u_2=0$.

<details><summary>Détail du calcul de la matrice de projection</summary>

$u_1u_1^\top=\begin{bmatrix}2\\0\end{bmatrix}\begin{bmatrix}2&0\end{bmatrix}=\begin{bmatrix}4&0\\0&0\end{bmatrix}$ et $\lVert u_1\rVert^2=4$, d'où $\dfrac{u_1u_1^\top}{\lVert u_1\rVert^2}=\begin{bmatrix}1&0\\0&0\end{bmatrix}$.

$\pi_{\operatorname{span}[u_1]}(b_2)=[1,0]^\top$, donc $u_2=[1,1]^\top-[1,0]^\top=[0,1]^\top$ et $u_1^\top u_2=2\cdot0+0\cdot1=0$

Pour obtenir une **ONB**, on normalise : $\hat u_1=[1,0]^\top$, $\hat u_2=[0,1]^\top$ — ici la base canonique.

</details>

### 7.6 Projection sur un sous-espace affine

Soit $L=x_0+U$ un espace affine, avec $b_1,b_2$ une base de $U$. La stratégie du livre : **ramener le problème à un problème connu**.

**Étape 1.** Soustraire le **point de support** $x_0$ de $x$ **et** de $L$ : $L-x_0=U$ est exactement le sous-espace vectoriel $U$.

**Étape 2.** Appliquer la projection sur un sous-espace (§3.8.2) : $\pi_U(x-x_0)$.

**Étape 3.** Retranslater dans $L$ en rajoutant $x_0$ :

$$\boxed{\;\pi_L(x)=x_0+\pi_U(x-x_0)\;}$$

**La distance.** Elle est **identique** à celle de $x-x_0$ à $U$ :

$$d(x,L)=\lVert x-\pi_L(x)\rVert=\lVert x-(x_0+\pi_U(x-x_0))\rVert=d(x-x_0,\ \pi_U(x-x_0))=d(x-x_0,\ U)$$

> **Où cela servira** : la dérivation de l'**hyperplan séparateur** au §12.1 (SVM).

## 🟠 Concept 8 — Rotations (§3.9)

### 8.1 Définition et convention

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Une **rotation** est une application linéaire (plus précisément un **automorphisme d'un espace vectoriel euclidien**) qui fait tourner un plan d'un angle $\theta$ **autour de l'origine** — l'origine est donc un **point fixe**.

</div>

> ⚠️ **La convention de sens.** *« Pour un angle **positif** $\theta>0$, par convention courante, on tourne dans le sens **ANTI-HORAIRE** (*counterclockwise*). »*

**Le contexte.** Longueur et angle préservés (§3.4) sont les deux caractéristiques des applications linéaires à matrice de transformation **orthogonale** ; les rotations en sont un cas particulier. **Applications** : infographie et **robotique** (savoir comment tourner les articulations d'un bras robotique pour saisir ou placer un objet).

### 8.2 Rotations dans $\mathbb R^2$

On fait tourner la base canonique $e_1=[1,0]^\top$, $e_2=[0,1]^\top$ d'un angle $\theta$. *« Les vecteurs tournés restent linéairement indépendants et forment donc une base de $\mathbb R^2$ : une rotation effectue un **CHANGEMENT DE BASE**. »*

Par trigonométrie :

$$\Phi(e_1)=\begin{bmatrix}\cos\theta\\\sin\theta\end{bmatrix},\qquad\Phi(e_2)=\begin{bmatrix}-\sin\theta\\\cos\theta\end{bmatrix}$$

$$\boxed{\;R(\theta)=\big[\Phi(e_1)\ \ \Phi(e_2)\big]=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}\;}$$

**L'exemple de la figure 3.14** — une rotation de $112{,}5^\circ$ :

$$R=\begin{bmatrix}-0{,}38&-0{,}92\\0{,}92&-0{,}38\end{bmatrix}$$

<details><summary>Contrôle : les valeurs imprimées sont ARRONDIES</summary>

$\cos(112{,}5^\circ)=-0{,}38268$, $\sin(112{,}5^\circ)=0{,}92388$. Les valeurs imprimées $-0{,}38$ et $0{,}92$ en sont les arrondis à deux décimales.

Conséquence à connaître : avec les valeurs **arrondies**, $\det R=(-0{,}38)^2+(0{,}92)^2=0{,}9908\neq1$ et les colonnes ont pour norme $0{,}99539\neq1$ — la matrice imprimée **n'est donc pas exactement orthogonale**. C'est un artefact d'arrondi ; la matrice exacte $R(112{,}5^\circ)$ l'est. $\arctan_2(0{,}92,\,-0{,}38)=112{,}44^\circ$, cohérent avec les $112{,}5^\circ$ annoncés.

</details>

### 8.3 Rotations dans $\mathbb R^3$

*« Contrairement au cas $\mathbb R^2$, dans $\mathbb R^3$ on peut faire tourner **n'importe quel plan de dimension 2 autour d'un axe de dimension 1**. »* Méthode : spécifier comment les images $Re_1,Re_2,Re_3$ de la base canonique doivent tourner, en s'assurant qu'elles restent **orthonormées**.

> ⚠️ **La convention en dimension $>2$.** *« Une rotation « anti-horaire » (plane) autour d'un axe désigne une rotation autour de cet axe **quand on regarde l'axe de face, depuis son extrémité vers l'origine**. »*

**Rotation autour de l'axe $e_1$** — la coordonnée $e_1$ est **fixe**, la rotation se fait dans le plan $e_2e_3$ :

$$R_1(\theta)=\begin{bmatrix}1&0&0\\0&\cos\theta&-\sin\theta\\0&\sin\theta&\cos\theta\end{bmatrix}$$

**Rotation autour de l'axe $e_2$** — noter l'**inversion des signes** : *« si l'on fait tourner le plan $e_1e_3$ autour de l'axe $e_2$, il faut regarder l'axe $e_2$ depuis sa « pointe » vers l'origine »* :

$$R_2(\theta)=\begin{bmatrix}\cos\theta&0&\sin\theta\\0&1&0\\-\sin\theta&0&\cos\theta\end{bmatrix}$$

**Rotation autour de l'axe $e_3$** :

$$R_3(\theta)=\begin{bmatrix}\cos\theta&-\sin\theta&0\\\sin\theta&\cos\theta&0\\0&0&1\end{bmatrix}$$

> ⚠️ **Le piège classique** : $R_2$ est la seule des trois où $+\sin\theta$ est **au-dessus** de la diagonale. Vérification mnémotechnique : dans $R_1$ et $R_3$, le bloc $2\times2$ actif reproduit $R(\theta)$ de $\mathbb R^2$ tel quel ; dans $R_2$, il est **transposé**.

### 8.4 Rotations en dimension $n$ — les rotations de Givens

**L'idée.** *« Fixer $n-2$ dimensions et restreindre la rotation à un plan de dimension 2 dans l'espace de dimension $n$. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.11 (Rotation de Givens).</span>

Soient $V$ euclidien de dimension $n$ et $\Phi:V\to V$ un automorphisme de matrice de transformation

$$R_{ij}(\theta):=\begin{bmatrix}I_{i-1}&0&\cdots&0&0\\0&\cos\theta&\cdots&-\sin\theta&0\\0&\cdots&I_{j-i-1}&\cdots&0\\0&\sin\theta&\cdots&\cos\theta&0\\0&0&\cdots&0&I_{n-j}\end{bmatrix}\in\mathbb R^{n\times n}$$

pour $1\leqslant i<j\leqslant n$ et $\theta\in\mathbb R$. C'est une **rotation de Givens**.

</div>

**En clair** : $R_{ij}(\theta)$ est **l'identité $I_n$** avec seulement quatre coefficients modifiés :

$$\boxed{\;r_{ii}=\cos\theta,\quad r_{ij}=-\sin\theta,\quad r_{ji}=\sin\theta,\quad r_{jj}=\cos\theta\;}$$

⚠️ En dimension $n=2$, on retrouve $R(\theta)$ comme cas particulier.

### 8.5 Les quatre propriétés des rotations

Toutes se déduisent du fait que les rotations sont des **matrices orthogonales** (définition 3.8) :

1. **Les rotations préservent les distances** : $\lVert x-y\rVert=\lVert R_\theta(x)-R_\theta(y)\rVert$. *« La distance entre deux points quelconques est inchangée après la transformation. »*
2. **Les rotations préservent les angles** : l'angle entre $R_\theta x$ et $R_\theta y$ est égal à l'angle entre $x$ et $y$.
3. **En dimension 3 (ou plus), les rotations ne commutent GÉNÉRALEMENT PAS.** *« L'ordre dans lequel les rotations sont appliquées **compte**, même si elles tournent autour du même point. »*
4. **En dimension 2 seulement**, les rotations **commutent** : $R(\phi)R(\theta)=R(\theta)R(\phi)$ pour tous $\phi,\theta\in[0,2\pi)$. Elles forment un **groupe abélien** (pour la multiplication) — mais **seulement si elles tournent autour du même point** (par exemple l'origine).

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Montrer que $\langle\cdot,\cdot\rangle$ est un produit intérieur » | **Vérif. déf. 3.3** | Bilinéarité + **symétrie** + **définie positivité** (compléter le carré) |
| « Cette matrice est-elle définie positive ? » | **Déf. 3.4** | Symétrie, puis $x^\top Ax$ écrit comme somme de carrés ; sinon exhiber un $x$ avec $x^\top Ax<0$ |
| « Calculer la longueur / la norme de $x$ » | **Norme induite** | $\lVert x\rVert=\sqrt{\langle x,x\rangle}=\sqrt{x^\top Ax}$ — **avec le bon produit intérieur** |
| « Calculer la distance entre $x$ et $y$ » | **Déf. 3.6** | $d(x,y)=\lVert x-y\rVert$ |
| « Calculer l'angle entre $x$ et $y$ » | **§3.4** | $\cos\omega=\dfrac{\langle x,y\rangle}{\lVert x\rVert\lVert y\rVert}$, puis $\arccos$ ; résultat dans $[0,\pi]$ |
| « $x$ et $y$ sont-ils orthogonaux ? » | **Déf. 3.7** | $\langle x,y\rangle=0$ ? **la réponse dépend du produit intérieur** |
| « Cette matrice est-elle orthogonale ? » | **Déf. 3.8** | Vérifier $A^\top A=I$ (colonnes orthonormées). Si oui, $A^{-1}=A^\top$ |
| « Projeter $x$ sur la droite engendrée par $b$ » | **§3.8.1** | $\lambda=\dfrac{b^\top x}{b^\top b}$, $\pi_U(x)=\lambda b$, $P_\pi=\dfrac{bb^\top}{b^\top b}$ |
| « Projeter $x$ sur $U=\operatorname{span}[\dots]$ » | **§3.8.2** | Base de $U$ en colonnes de $B$ ; équation normale $B^\top B\lambda=B^\top x$ ; $\pi_U(x)=B\lambda$ ; $P_\pi=B(B^\top B)^{-1}B^\top$ |
| « Calculer l'erreur de projection » | **§3.8.2** | $\lVert x-\pi_U(x)\rVert$ (= erreur de reconstruction) |
| « Orthonormaliser cette base » | **Gram-Schmidt** | $u_1=b_1$ ; $u_k=b_k-\pi_{\operatorname{span}[u_1..u_{k-1}]}(b_k)$ ; puis **normaliser** |
| « Projeter sur l'espace affine $L=x_0+U$ » | **§3.8.4** | $\pi_L(x)=x_0+\pi_U(x-x_0)$ — ne pas oublier de **retranslater** |
| « Le système $Ax=b$ n'a pas de solution » | **Moindres carrés** | Projeter $b$ sur le span des **colonnes** de $A$ |
| « Faire tourner le vecteur de $\theta$ » | **§3.9** | $R(\theta)=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}$ en $\mathbb R^2$ ; $R_1,R_2,R_3$ en $\mathbb R^3$ |
| « Trouver le complément orthogonal / le vecteur normal » | **§3.6** | $\dim U^\perp=D-M$ ; résoudre $B^\top w=0$ puis normaliser |
| « Ces fonctions sont-elles orthogonales ? » | **§3.7** | Calculer $\int_a^b u(x)v(x)dx$ ; chercher la **parité** de l'intégrande |

## Comment résoudre : les quatre méthodes pas-à-pas

**Méthode A — Prouver qu'une forme est un produit intérieur.**

1. Écrire la forme matriciellement : $\langle x,y\rangle=x^\top Ay$.
2. **Symétrie** : vérifier $A=A^\top$.
3. **Bilinéarité** : automatique dès que la forme s'écrit $x^\top Ay$.
4. **Définie positivité** : développer $x^\top Ax$ et le **compléter en somme de carrés**.
5. Conclure par le **théorème 3.5**.

**Méthode B — Projection sur un sous-espace (le schéma en 5 temps du livre).**

1. Vérifier que les générateurs de $U$ forment une **base** ; les mettre en colonnes de $B$.
2. Calculer $B^\top B$ et $B^\top x$.
3. Résoudre l'**équation normale** $B^\top B\lambda=B^\top x$.
4. $\pi_U(x)=B\lambda$ ; erreur $=\lVert x-\pi_U(x)\rVert$.
5. $P_\pi=B(B^\top B)^{-1}B^\top$.
6. **Les deux contrôles** : (a) $\pi_U(x)-x$ orthogonal à **tous** les $b_i$ ; (b) $P_\pi=P_\pi^2$.

**Méthode C — Gram-Schmidt.**

1. $u_1:=b_1$.
2. Pour $k=2,\dots,n$ : calculer $\pi_{\operatorname{span}[u_1,\dots,u_{k-1}]}(b_k)$ — comme les $u_i$ sont **déjà orthogonaux**, c'est simplement $\sum_{i<k}\dfrac{u_i^\top b_k}{u_i^\top u_i}u_i$.
3. $u_k:=b_k-$ cette projection.
4. Contrôle : $u_i^\top u_j=0$ pour tous $i\neq j$, et $\operatorname{span}$ inchangé.
5. Pour une **ONB**, diviser chaque $u_k$ par $\lVert u_k\rVert$.

**Méthode D — Rotations.**

1. Identifier la **dimension** et l'**axe** (en $\mathbb R^3$).
2. Écrire la matrice : $R(\theta)$, $R_1$, $R_2$ ou $R_3$ — attention à $R_2$, dont les signes sont inversés.
3. Multiplier : $x'=Rx$.
4. **Contrôles** : $\det R=+1$ ; $R^\top R=I$ ; $\lVert x'\rVert=\lVert x\rVert$.
5. Composition : appliquer dans le **bon ordre** (non commutatif en dimension $\geqslant3$).

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Écrire $\lVert\lambda x\rVert=\lambda\lVert x\rVert$ | C'est $\|\lambda\|\,\lVert x\rVert$ — **valeur absolue** |
| Croire que toute norme vient d'un produit intérieur | Faux : la **norme de Manhattan** n'a pas de produit intérieur correspondant |
| Utiliser le produit scalaire quand un autre produit intérieur est donné | Longueurs, distances **et orthogonalité** changent. Exemple 3.7 : $[1,1]$ et $[-1,1]$ sont orthogonaux pour l'un, à $109{,}5^\circ$ pour l'autre |
| Oublier la **symétrie** dans la vérification d'un produit intérieur | Bilinéaire + définie positive **ne suffit pas** : il faut $\Omega(x,y)=\Omega(y,x)$ |
| Conclure « définie positive » d'une matrice non symétrique | La définition 3.4 exige **d'abord** la symétrie |
| Croire que $x^\top Ax>0$ pour toute matrice symétrique | Contre-exemple 3.4 : $A_2=\begin{bmatrix}9&6\\6&3\end{bmatrix}$ donne $-9$ en $x=[2,-3]^\top$ |
| Confondre produit intérieur et métrique | Ils vont dans des **directions opposées** : $x\approx y$ donne un **grand** produit intérieur et une **petite** distance |
| Chercher $\omega$ hors de $[0,\pi]$ | $\arccos$ renvoie un **unique** angle dans $[0,\pi]$ — c'est la convention |
| Croire que « matrice orthogonale » signifie « colonnes orthogonales » | **ORTHONORMÉES** : orthogonales **et de norme 1**. Le livre le signale explicitement |
| Écrire $P_\pi=\dfrac{b^\top b}{bb^\top}$ | Inverse : $P_\pi=\dfrac{bb^\top}{b^\top b}$ — numérateur **matrice** $n\times n$, dénominateur **scalaire** |
| Utiliser des générateurs non indépendants dans $B$ | $B^\top B$ devient **singulière** : extraire d'abord une **base** |
| Oublier que $\lambda$ vit dans $\mathbb R^m$ et $\pi_U(x)$ dans $\mathbb R^n$ | La projection est un vecteur de $\mathbb R^n$ ; ses **coordonnées** sont $m$ nombres |
| Inverser $B^\top B$ quand la base est une ONB | Inutile : $B^\top B=I$, donc $\lambda=B^\top x$ et $\pi_U(x)=BB^\top x$ |
| Oublier de retranslater dans la projection affine | $\pi_L(x)=x_0+\pi_U(x-x_0)$ — les **deux** $x_0$ comptent |
| Croire que $P_\pi$ est inversible | Une projection sur un sous-espace strict est **singulière** : $P_\pi^2=P_\pi$ et $P_\pi\neq I$ imposent $\det P_\pi=0$ |
| Projeter avec Gram-Schmidt sans normaliser puis parler d'ONB | Gram-Schmidt donne une base **orthogonale** ; l'ONB demande l'étape de **normalisation** |
| Se tromper de signes dans $R_2(\theta)$ | $R_2$ est la seule des trois avec $+\sin\theta$ **au-dessus** de la diagonale |
| Composer des rotations 3D dans n'importe quel ordre | **Non commutatives** en dimension $\geqslant3$ ; commutatives **seulement en 2D**, autour du même point |
| Croire $\dim U^\perp=\dim U$ | $\dim U^\perp=D-M$ |
| Croire que la réunion $U\cup U^\perp$ est $V$ | C'est la **somme directe** : tout $x$ se **décompose** de façon unique, $U\cap U^\perp=\{0\}$ |
| Croire que le produit intérieur de fonctions converge toujours | Il peut **DIVERGER** — d'où les espaces de Hilbert |

## 📌 Ultimate Review

```
════════════ LES HUIT FORMULES À SAVOIR SANS HÉSITER ════════════
  1.  ‖x‖1 = Σ|xi|          ‖x‖2 = √(Σ xi²) = √(xᵀx)
  2.  ⟨x,y⟩ = x̂ᵀ A ŷ   avec A SYMÉTRIQUE DÉFINIE POSITIVE     (Th. 3.5)
  3.  ‖x‖ := √⟨x,x⟩          d(x,y) := ‖x−y‖
  4.  |⟨x,y⟩| ≤ ‖x‖‖y‖                              Cauchy-Schwarz
  5.  cos ω = ⟨x,y⟩ / (‖x‖‖y‖)          x ⊥ y ⟺ ⟨x,y⟩ = 0
  6.  A orthogonale : AAᵀ = I = AᵀA ⟹ A⁻¹ = Aᵀ
  7.  DROITE   λ = bᵀx/(bᵀb)          Pπ = bbᵀ/(bᵀb)
      SOUS-ESP. BᵀBλ = Bᵀx            Pπ = B(BᵀB)⁻¹Bᵀ
      ONB      λ = Bᵀx                πU(x) = BBᵀx
      AFFINE   πL(x) = x0 + πU(x − x0)
  8.  R(θ) = [[cos θ, −sin θ],[sin θ, cos θ]]
═════════════════════════════════════════════════════════════════
```

**Le tableau comparatif des trois listes d'axiomes — la source d'erreur numéro un :**

|  | **Norme** $\lVert\cdot\rVert$ | **Produit intérieur** $\langle\cdot,\cdot\rangle$ | **Métrique** $d$ |
|---|---|---|---|
| Arguments | 1 vecteur | 2 vecteurs | 2 vecteurs |
| Axiome 1 | Absolument homogène $\lVert\lambda x\rVert=\|\lambda\|\lVert x\rVert$ | **Bilinéaire** | **Définie positive** $d\geqslant0$, $d=0\iff x=y$ |
| Axiome 2 | **Inégalité triangulaire** | **Symétrique** | **Symétrique** |
| Axiome 3 | **Définie positive** | **Définie positive** | **Inégalité triangulaire** |
| Sens | Similaires : **petit** | Similaires : **GRAND** | Similaires : **petit** |

**Le tableau de synthèse des projections :**

| Cible | Coordonnées $\lambda$ | Point projeté | Matrice $P_\pi$ |
|---|---|---|---|
| **Droite** $\operatorname{span}[b]$ | $\dfrac{b^\top x}{b^\top b}$ | $\lambda b$ | $\dfrac{bb^\top}{b^\top b}$ |
| **Sous-espace** (base quelconque) | $(B^\top B)^{-1}B^\top x$ | $B\lambda$ | $B(B^\top B)^{-1}B^\top$ |
| **Sous-espace** (ONB) | $B^\top x$ | $BB^\top x$ | $BB^\top$ |
| **Espace affine** $x_0+U$ | — | $x_0+\pi_U(x-x_0)$ | — ( pas linéaire) |

**Ce qui est préservé par quoi :**

| Transformation | Longueurs | Angles | Commutative |
|---|---|---|---|
| **Matrice orthogonale** |  |  | pas en général |
| **Rotation en $\mathbb R^2$** |  |  | (même centre) |
| **Rotation en $\mathbb R^{n\geqslant3}$** |  |  | **NON** |
| **Projection** |  |  | — (mais $P_\pi^2=P_\pi$) |
| **Application affine bijective** | en général | en général | dimension et parallélisme préservés |

**Où chaque notion resservira dans le livre :**

| Notion du ch. 3 | Suite |
|---|---|
| Matrice symétrique définie positive | **Décompositions matricielles** (§4.3), **noyaux** (§12.4) |
| Base orthonormée | **ACP** (ch. 10), **SVM** (ch. 12) |
| Complément orthogonal, vecteur normal | **Réduction de dimension** (ch. 10), **hyperplan séparateur** (§12.1) |
| Produit intérieur de fonctions | **Méthodes à noyaux**, processus gaussiens (ch. 12) |
| Équation normale, pseudo-inverse | **Régression linéaire** (§9.4) |
| Erreur de reconstruction | **ACP** (§10.3) |
| Projection sur un sous-espace affine | **Hyperplan séparateur** (§12.1) |
| Orthogonalité des résidus | **Gradients conjugués, GMRES** |

## 🧠 Active Recall

**Normes**

1. Donner les trois axiomes d'une norme.
2. Que dit géométriquement l'inégalité triangulaire ?
3. Écrire la norme de Manhattan et la norme euclidienne. Quels sont leurs autres noms ?
4. Quelle norme le livre utilise-t-il par défaut ?
5. À quoi ressemble le lieu $\lVert x\rVert_1=1$ dans $\mathbb R^2$ ? Et $\lVert x\rVert_2=1$ ?

**Produits intérieurs** 6. Écrire les deux conditions de bilinéarité. 7. Quelles sont les trois exigences pour qu'une forme bilinéaire soit un produit intérieur ? 8. Qu'est-ce qu'un espace vectoriel euclidien ? 9. Écrire $\langle x,y\rangle$ en fonction des coordonnées et d'une matrice ; que vaut $A_{ij}$ ? 10. Énoncer la définition 3.4. 11. Pourquoi $A_2=\begin{bmatrix}9&6\\6&3\end{bmatrix}$ n'est-elle pas définie positive ? Donner un $x$ témoin. 12. Énoncer le théorème 3.5. 13. Que vaut le noyau d'une matrice symétrique définie positive ? Pourquoi ses éléments diagonaux sont-ils positifs ?

**Longueurs, distances, angles** 14. Comment un produit intérieur induit-il une norme ? La réciproque est-elle vraie ? 15. Énoncer l'inégalité de Cauchy-Schwarz. 16. Dans l'exemple 3.5, pourquoi $\lVert x\rVert$ passe-t-il de $\sqrt2$ à $1$ ? 17. Donner les trois propriétés d'une métrique. 18. En quoi produit intérieur et métrique se comportent-ils « en directions opposées » ? 19. Écrire la formule de l'angle. Dans quel intervalle vit $\omega$ ? 20. Quel est l'angle entre $x$ et $4x$ ? 21. Définir orthogonalité et orthonormalité. 22. À quoi le vecteur $0$ est-il orthogonal ? 23. Deux vecteurs orthogonaux pour un produit intérieur le sont-ils pour tous ?

**Matrices orthogonales et ONB** 24. Définir une matrice orthogonale. Quelle est son inverse ? 25. Pourquoi le livre dit-il que le nom est mal choisi ? 26. Démontrer que $\lVert Ax\rVert=\lVert x\rVert$ pour $A$ orthogonale. 27. Donner les deux conditions d'une ONB. Que devient-il si seule la première tient ? 28. Donner une ONB de $\mathbb R^2$ autre que la base canonique.

**Complément orthogonal** 29. Quelle est la dimension de $U^\perp$ ? Que vaut $U\cap U^\perp$ ? 30. Écrire la décomposition unique d'un $x\in V$. 31. Qu'est-ce que le vecteur normal d'un plan ?

**Produit intérieur de fonctions** 32. Écrire le produit intérieur de deux fonctions. 33. Pourquoi $\sin$ et $\cos$ sont-ils orthogonaux sur $[-\pi,\pi]$ ? 34. Citer la famille orthogonale donnée par le livre. 35. Quelles sont les deux difficultés techniques signalées par le livre ?

**Projections** 36. Donner la définition 3.10. Que vérifie $P_\pi$ ? 37. Quelles sont les deux propriétés caractéristiques de $\pi_U(x)$ sur une droite ? 38. Dériver $\lambda$ à partir de la condition d'orthogonalité. 39. Écrire $P_\pi$ pour une droite. Que vaut-il pour $b=[1,2,2]^\top$ ? 40. Écrire l'équation normale et en déduire $\lambda$. 41. Qu'est-ce que la pseudo-inverse ? Quelle condition demande-t-elle ? 42. Qu'est-ce que le « terme de gigue » $\epsilon I$ et pourquoi l'ajoute-t-on ? 43. Écrire $P_\pi$ pour un sous-espace général. Comment le cas 1D s'y ramène-t-il ? 44. Dans l'exemple 3.11, que valent $\lambda$, $\pi_U(x)$ et l'erreur de projection ? 45. Quels sont les deux contrôles de fin d'exercice recommandés ? 46. Que devient tout cela si la base est une ONB ? 47. Quel est le lien entre projection et moindres carrés ? 48. Écrire les deux formules de Gram-Schmidt. 49. Comment obtient-on une ONB à la fin de Gram-Schmidt ? 50. Écrire la formule de la projection affine et celle de la distance à $L$.

**Rotations** 51. Qu'est-ce qu'une rotation ? Quel point est fixe ? 52. Quelle est la convention de sens pour $\theta>0$ ? 53. Écrire $R(\theta)$ en $\mathbb R^2$. 54. Pourquoi une rotation est-elle un changement de base ? 55. Écrire $R_1$, $R_2$, $R_3$ en $\mathbb R^3$. Laquelle a des signes inversés ? 56. Quelle est la convention pour « anti-horaire » en dimension $>2$ ? 57. Définir une rotation de Givens ; quels sont ses quatre coefficients modifiés ? 58. Donner les quatre propriétés des rotations. 59. Quand les rotations forment-elles un groupe abélien ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les trois axiomes d'une norme ? | **Absolument homogène** · **inégalité triangulaire** · **définie positive** |
| Homogénéité absolue ? | $\lVert\lambda x\rVert=\|\lambda\|\lVert x\rVert$ — **valeur absolue** |
| Inégalité triangulaire ? | $\lVert x+y\rVert\leqslant\lVert x\rVert+\lVert y\rVert$ |
| Définie positive (norme) ? | $\lVert x\rVert\geqslant0$ et $\lVert x\rVert=0\iff x=0$ |
| Norme de Manhattan ? | $\lVert x\rVert_1=\sum_i\|x_i\|$ — la norme **$\ell_1$** |
| Norme euclidienne ? | $\lVert x\rVert_2=\sqrt{\sum_i x_i^2}=\sqrt{x^\top x}$ — la norme **$\ell_2$** |
| Norme par défaut du livre ? | La **norme euclidienne** |
| Lieu $\lVert x\rVert_1=1$ dans $\mathbb R^2$ ? | Un **losange** (carré tourné de $45^\circ$) |
| Lieu $\lVert x\rVert_2=1$ ? | Le **cercle unité** |
| Produit scalaire ? | $x^\top y=\sum_i x_iy_i$ |
| Bilinéaire ? | Linéaire **en chaque argument** séparément |
| Les trois exigences d'un produit intérieur ? | **Bilinéaire** · **SYMÉTRIQUE** · **DÉFINIE POSITIVE** |
| Notation ? | $\langle x,y\rangle$ plutôt que $\Omega(x,y)$ |
| Espace de produit intérieur ? | Le couple $(V,\langle\cdot,\cdot\rangle)$ |
| Espace vectoriel euclidien ? | $(V,\langle\cdot,\cdot\rangle)$ **avec le produit scalaire** |
| Écriture matricielle d'un produit intérieur ? | $\langle x,y\rangle=\hat x^\top A\hat y$ avec $A_{ij}=\langle b_i,b_j\rangle$ |
| Matrice symétrique définie positive ? | $A=A^\top$ et $x^\top Ax>0$ pour tout $x\neq0$ |
| Semi-définie positive ? | Seul $\geqslant$ tient |
| Théorème 3.5 ? | $\langle\cdot,\cdot\rangle$ est un produit intérieur **si et seulement si** il existe $A$ symétrique définie positive avec $\langle x,y\rangle=\hat x^\top A\hat y$ |
| Noyau d'une matrice définie positive ? | **Réduit à $\{0\}$** — donc elle est inversible |
| Éléments diagonaux d'une définie positive ? | **Positifs** : $a_{ii}=e_i^\top Ae_i>0$ |
| Contre-exemple 3.4 ? | $A_2=\begin{bmatrix}9&6\\6&3\end{bmatrix}$, avec $x=[2,-3]^\top$ donne $x^\top A_2x=-9$ |
| La technique de preuve ? | **Compléter le carré** : $(3x_1+2x_2)^2\pm x_2^2$ |
| Norme induite ? | $\lVert x\rVert:=\sqrt{\langle x,x\rangle}$ |
| Toute norme vient-elle d'un produit intérieur ? | **NON** — contre-exemple : la norme de **Manhattan** |
| Cauchy-Schwarz ? | $\|\langle x,y\rangle\|\leqslant\lVert x\rVert\lVert y\rVert$ |
| Distance ? | $d(x,y)=\lVert x-y\rVert=\sqrt{\langle x-y,x-y\rangle}$ |
| Distance euclidienne ? | La distance obtenue **avec le produit scalaire** |
| Les trois propriétés d'une métrique ? | **Définie positive** · **symétrique** · **inégalité triangulaire** |
| Faut-il un produit intérieur pour une distance ? | **NON** — une **norme** suffit |
| Produit intérieur contre métrique ? | **Directions opposées** : $x\approx y$ donne un produit intérieur **grand** et une distance **petite** |
| Formule de l'angle ? | $\cos\omega=\dfrac{\langle x,y\rangle}{\lVert x\rVert\lVert y\rVert}$ |
| Où vit $\omega$ ? | Dans $[0,\pi]$ — **unique** |
| Angle entre $x$ et $4x$ ? | $0$ : **même orientation** |
| Angle de l'exemple 3.6 ? | $\arccos(3/\sqrt{10})\approx0{,}32$ rad $\approx18^\circ$ |
| Orthogonaux ? | $\langle x,y\rangle=0$, noté $x\perp y$ |
| Orthonormés ? | Orthogonaux **et** $\lVert x\rVert=1=\lVert y\rVert$ |
| À quoi $0$ est-il orthogonal ? | À **tout** vecteur |
| L'orthogonalité dépend-elle du produit intérieur ? | **OUI** — exemple 3.7 : $90^\circ$ ou $109{,}5^\circ$ selon le choix |
| Angle de l'exemple 3.7 avec $A=\operatorname{diag}(2,1)$ ? | $\cos\omega=-\tfrac13$, $\omega\approx1{,}91$ rad $\approx109{,}5^\circ$ |
| Matrice orthogonale ? | Colonnes **ORTHONORMÉES** : $AA^\top=I=A^\top A$ |
| Son inverse ? | $A^{-1}=A^\top$ — **la transposée** |
| Le nom exact serait ? | « **orthonormée** » — le livre le signale |
| Que préservent les matrices orthogonales ? | **Distances ET angles** |
| Base orthonormée (ONB) ? | $\langle b_i,b_j\rangle=0$ pour $i\neq j$ **et** $\langle b_i,b_i\rangle=1$ |
| Base orthogonale ? | Seule la **première** condition |
| ONB de $\mathbb R^2$ non canonique ? | $\frac{1}{\sqrt2}[1,1]^\top$ et $\frac{1}{\sqrt2}[1,-1]^\top$ |
| Comment construire une ONB ? | Le **procédé de Gram-Schmidt** |
| Dimension de $U^\perp$ ? | $D-M$ |
| $U\cap U^\perp$ ? | $\{0\}$ |
| Décomposition d'un $x\in V$ ? | $x=\sum_m\lambda_mb_m+\sum_j\psi_jb_j^\perp$, **unique** |
| Vecteur normal d'un plan ? | Le vecteur unitaire $w$ **orthogonal au plan** ; il engendre $U^\perp$ |
| Produit intérieur de fonctions ? | $\langle u,v\rangle=\int_a^b u(x)v(x)\,dx$ |
| $\sin$ et $\cos$ sur $[-\pi,\pi]$ ? | **Orthogonaux** — l'intégrande $\sin x\cos x$ est **impaire** |
| La famille orthogonale citée ? | $\{1,\cos(x),\cos(2x),\cos(3x),\dots\}$ sur $[-\pi,\pi]$ |
| Les deux difficultés techniques ? | Il faut des **mesures** (espace de **Hilbert**) · le produit peut **DIVERGER** |
| Définition d'une projection ? | Application linéaire $\pi:V\to U$ avec $\pi^2=\pi\circ\pi=\pi$ |
| Propriété de $P_\pi$ ? | $P_\pi^2=P_\pi$ (**idempotente**) |
| $P_\pi$ est-elle inversible ? | **NON** (sauf $P_\pi=I$) : $\det P_\pi=0$ |
| Les deux propriétés de $\pi_U(x)$ sur une droite ? | Distance $\lVert x-\pi_U(x)\rVert$ **minimale** (donc $x-\pi_U(x)\perp b$) · $\pi_U(x)=\lambda b$ |
| Coordonnée sur une droite ? | $\lambda=\dfrac{\langle x,b\rangle}{\langle b,b\rangle}=\dfrac{b^\top x}{\lVert b\rVert^2}$ |
| Si $\lVert b\rVert=1$ ? | Simplement $\lambda=b^\top x$ |
| Matrice de projection sur une droite ? | $P_\pi=\dfrac{bb^\top}{b^\top b}$ |
| Longueur de la projection ? | $\lVert\pi_U(x)\rVert=\|\lambda\|\lVert b\rVert=\|\cos\omega\|\,\lVert x\rVert$ |
| $P_\pi$ pour $b=[1,2,2]^\top$ ? | $\frac19\begin{bmatrix}1&2&2\\2&4&4\\2&4&4\end{bmatrix}$ |
| $\pi_U([1,1,1]^\top)$ dans ce cas ? | $\frac19[5,10,10]^\top=\frac59[1,2,2]^\top$ |
| L'équation normale ? | $B^\top B\lambda=B^\top x$ |
| Solution des coordonnées ? | $\lambda=(B^\top B)^{-1}B^\top x$ |
| Nom de $(B^\top B)^{-1}B^\top$ ? | La **pseudo-inverse** de $B$ |
| Sa condition d'existence ? | $B$ de **rang plein** (donc $B^\top B$ définie positive) |
| Le « terme de gigue » ? | $\epsilon I$ ajouté à $B^\top B$ pour la **stabilité numérique** — c'est la **ridge**, dérivable bayésiennement |
| Matrice de projection générale ? | $P_\pi=B(B^\top B)^{-1}B^\top$ |
| Le cas 1D en découle-t-il ? | Oui : $B^\top B$ scalaire, donc $P_\pi=\dfrac{BB^\top}{B^\top B}$ |
| $\lambda$ de l'exemple 3.11 ? | $[5,-3]^\top$ |
| $\pi_U(x)$ de l'exemple 3.11 ? | $[5,2,-1]^\top$ |
| Erreur de projection de l'exemple 3.11 ? | $\lVert[1,-2,1]^\top\rVert=\sqrt6$ |
| Autre nom de l'erreur de projection ? | L'**erreur de RECONSTRUCTION** |
| $P_\pi$ de l'exemple 3.11 ? | $\frac16\begin{bmatrix}5&2&-1\\2&2&2\\-1&2&5\end{bmatrix}$ |
| Les deux contrôles à faire ? | (a) $\pi_U(x)-x$ **orthogonal à tous les $b_i$** · (b) $P_\pi=P_\pi^2$ |
| Combien de nombres pour représenter une projection ? | Seulement les **$m$ coordonnées**, pas les $n$ composantes |
| Si la base est une ONB ? | $\lambda=B^\top x$ et $\pi_U(x)=BB^\top x$ — **plus d'inverse à calculer** |
| Projection et système insoluble ? | On projette $b$ sur le **span des colonnes** de $A$ : solution des **MOINDRES CARRÉS** |
| Gram-Schmidt, initialisation ? | $u_1:=b_1$ |
| Gram-Schmidt, récurrence ? | $u_k:=b_k-\pi_{\operatorname{span}[u_1,\dots,u_{k-1}]}(b_k)$ |
| Gram-Schmidt préserve-t-il le span ? | $\operatorname{span}[b_1,\dots,b_n]=\operatorname{span}[u_1,\dots,u_n]$ |
| Comment obtenir une ONB ? | **Normaliser** chaque $u_k$ |
| Résultat de l'exemple 3.12 ? | $u_1=[2,0]^\top$, $u_2=[0,1]^\top$ |
| Projection affine ? | $\pi_L(x)=x_0+\pi_U(x-x_0)$ |
| Distance à un espace affine ? | $d(x,L)=d(x-x_0,\ U)$ |
| Rotation ? | Automorphisme d'un espace euclidien qui tourne un plan de $\theta$ **autour de l'origine** |
| Convention pour $\theta>0$ ? | Sens **ANTI-HORAIRE** |
| $R(\theta)$ en $\mathbb R^2$ ? | $\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}$ |
| Images de la base canonique ? | $\Phi(e_1)=[\cos\theta,\sin\theta]^\top$, $\Phi(e_2)=[-\sin\theta,\cos\theta]^\top$ |
| Une rotation est-elle un changement de base ? | **OUI** — les vecteurs tournés restent une base |
| $R_1(\theta)$ ? | $\begin{bmatrix}1&0&0\\0&\cos\theta&-\sin\theta\\0&\sin\theta&\cos\theta\end{bmatrix}$ — plan $e_2e_3$ |
| $R_2(\theta)$ ? | $\begin{bmatrix}\cos\theta&0&\sin\theta\\0&1&0\\-\sin\theta&0&\cos\theta\end{bmatrix}$ — **signes inversés** |
| $R_3(\theta)$ ? | $\begin{bmatrix}\cos\theta&-\sin\theta&0\\\sin\theta&\cos\theta&0\\0&0&1\end{bmatrix}$ — plan $e_1e_2$ |
| Convention « anti-horaire » en dim $>2$ ? | Regarder l'axe **de face, depuis son extrémité vers l'origine** |
| Rotation de Givens ? | $I_n$ avec $r_{ii}=\cos\theta$, $r_{ij}=-\sin\theta$, $r_{ji}=\sin\theta$, $r_{jj}=\cos\theta$, pour $i<j$ |
| L'idée en dimension $n$ ? | **Fixer $n-2$ dimensions**, tourner dans un plan de dimension 2 |
| Les rotations préservent quoi ? | **Distances ET angles** |
| Les rotations 3D commutent-elles ? | **NON** en général — l'**ordre compte** |
| Quand forment-elles un groupe abélien ? | **En 2D seulement**, autour du **même point** |
| Domaines d'application cités ? | **Infographie** et **robotique** (bras robotique) |
