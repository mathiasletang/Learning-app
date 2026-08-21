# Fiche 403 — Décompositions matricielles : déterminant, valeurs propres, Cholesky, SVD

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 4 « Matrix Decompositions » (p. 97-140) |
| **Difficulté** | Avancé — le chapitre le plus outillé de la partie I |
| **Temps d'étude estimé** | 150 min |
| **Prérequis** | Fiche 401 (algèbre linéaire) · Fiche 402 (matrices symétriques définies positives, matrices orthogonales, Gram-Schmidt) |
| **Concepts clés** | Déterminant, règle de Sarrus, développement de Laplace, mineur, cofacteur, matrice triangulaire, volume signé, trace, polynôme caractéristique, valeur propre, vecteur propre, espace propre, spectre, multiplicité algébrique, multiplicité géométrique, matrice défective, théorème spectral, décomposition de Cholesky, facteur de Cholesky, matrice diagonalisable, décomposition en valeurs propres, SVD, valeurs singulières, vecteurs singuliers gauches et droits, SVD réduite et tronquée, approximation de rang $k$, norme spectrale, théorème d'Eckart-Young, phylogénie des matrices |
| **Poids à l'examen** | $\det(A)\neq0\iff\operatorname{rk}(A)=n\iff A$ **inversible** · le **développement de Laplace** · $p_A(\lambda)=\det(A-\lambda I)$ · $\det A=\prod\lambda_i$ et $\operatorname{tr}A=\sum\lambda_i$ · le **théorème spectral** · $A=PDP^{-1}$ · $A=U\Sigma V^\top$ (existe **toujours**) · $A^{(k)}=\sum_{i=1}^k\sigma_iu_iv_i^\top$ et **Eckart-Young**. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : caractériser une matrice, puis la FACTORISER

  §4.1 DÉTERMINANT & TRACE
        det : matrices CARRÉES seulement · VOLUME SIGNÉ du parallélépipède des colonnes
        det(A) ≠ 0 ⟺ rk(A) = n ⟺ A inversible                        (Th. 4.1 / 4.3)
        Sarrus (3×3) · LAPLACE (récursif) · triangulaire → produit des diagonaux
        tr(A) = Σ aii  ·  tr(AB) = tr(BA)  ·  INVARIANTE par changement de base
        POLYNÔME CARACTÉRISTIQUE  pA(λ) := det(A − λI)   c0 = det A , cn−1 = (−1)^(n−1) tr A
  §4.2 VALEURS ET VECTEURS PROPRES        Ax = λx  ,  x ≠ 0
        λ vp ⟺ racine de pA ⟺ rk(A − λI) < n ⟺ det(A − λI) = 0
        Eλ = ker(A − λI)   ·   mult. GÉOMÉTRIQUE ≤ mult. ALGÉBRIQUE
        DÉFECTIVE = moins de n vecteurs propres indépendants
        THÉORÈME SPECTRAL : A symétrique ⟹ ONB de vecteurs propres, vp RÉELLES
        det A = Π λi        tr A = Σ λi
  §4.3 CHOLESKY            A sym. déf. pos.  ⟹  A = LLᵀ , L triangulaire inf., diag > 0
  §4.4 EIGENDECOMPOSITION  A = P D P⁻¹   ⟺  les vecteurs propres forment une BASE
        A symétrique ⟹ TOUJOURS diagonalisable, et P orthogonale : A = P D Pᵀ
        A^k = P D^k P⁻¹        det A = Π dii
  §4.5 SVD                 A = U Σ Vᵀ    ⚠️ EXISTE POUR TOUTE MATRICE m×n
        vi = vecteurs propres de AᵀA  ·  ui = vecteurs propres de AAᵀ  ·  σi = √λi
        ÉQUATION SINGULIÈRE  A vi = σi ui
  §4.6 APPROXIMATION       A = Σ σi ui viᵀ   →   A(k) = Σ_{i≤k} σi ui viᵀ
        ‖A‖2 = σ1 (norme spectrale) · ECKART-YOUNG : ‖A − A(k)‖2 = σ_{k+1}, et c'est le MINIMUM
  §4.7 PHYLOGÉNIE          non carrée → SVD ; carrée → det → régulière → normale → orthogonale
                           symétrique → déf. positive → Cholesky ; diagonale → identité

LES DEUX FACTORISATIONS EN UN COUP D'ŒIL
  EIGEN  A = P D P⁻¹   carrée · non défective · P pas forcément orthogonale · D peut être complexe
  SVD    A = U Σ Vᵀ    TOUTE matrice · U,V ORTHOGONALES · Σ réelle ≥ 0 · deux bases DIFFÉRENTES
```

> **La phrase-programme du chapitre.** Après les vecteurs (ch. 2) et la géométrie (ch. 3), *« nous regardons les caractéristiques fondamentales des matrices et des applications linéaires »* : trois façons de **résumer** une matrice (déterminant, trace, spectre) et quatre façons de la **factoriser** (Cholesky, eigendécomposition, SVD, approximation de rang faible).

## 🔴 Concept 1 — Le déterminant (§4.1)

### 1.1 Ce que c'est

> **Le déterminant** d'une matrice **carrée** $A\in\mathbb R^{n\times n}$ est une fonction qui envoie $A$ sur un **nombre réel**. On le note $\det(A)$ ou $|A|$.

> ⚠️ **Deux restrictions immédiates.** (i) *« Les déterminants ne sont définis QUE pour les matrices carrées »* ; (ii) *« la notation $|A|$ ne doit pas être confondue avec la valeur absolue. »*

**Exemple 4.1 — le déterminant naît du test d'inversibilité.**

| Taille | Inverse | Condition |
|---|---|---|
| $1\times1$ | $A=a\Rightarrow A^{-1}=\tfrac1a$ | $a\neq0$ |
| $2\times2$ | $A^{-1}=\dfrac{1}{a_{11}a_{22}-a_{12}a_{21}}\begin{bmatrix}a_{22}&-a_{12}\\-a_{21}&a_{11}\end{bmatrix}$ | $a_{11}a_{22}-a_{12}a_{21}\neq0$ |

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.1.</span>

Pour toute matrice carrée $A\in\mathbb R^{n\times n}$ : $A$ est **inversible si et seulement si $\det(A)\neq0$**.

</div>

### 1.2 Les formules explicites

**$n=1$ :** $\det(A)=a_{11}$.

**$n=2$ :**

$$\boxed{\;\begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix}=a_{11}a_{22}-a_{12}a_{21}\;}$$

**$n=3$ — la règle de Sarrus :**

$$\boxed{\;\begin{aligned}\begin{vmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{vmatrix}&=a_{11}a_{22}a_{33}+a_{21}a_{32}a_{13}+a_{31}a_{12}a_{23}\\&\quad-a_{31}a_{22}a_{13}-a_{11}a_{32}a_{23}-a_{21}a_{12}a_{33}\end{aligned}\;}$$

**Matrices triangulaires.** $T$ est **triangulaire supérieure** si $T_{ij}=0$ pour $i>j$ (zéros **sous** la diagonale) ; **triangulaire inférieure** si les zéros sont **au-dessus**. Dans les deux cas :

$$\boxed{\;\det(T)=\prod_{i=1}^{n}T_{ii}\;}$$

> ⚠️ La règle de Sarrus **ne se généralise PAS** au-delà de $3\times3$. Pour $n>3$ il faut Laplace ou Gauss.

### 1.3 Le déterminant comme volume signé — Exemple 4.2

> **L'intuition centrale.** *« Le déterminant $\det(A)$ est le **VOLUME SIGNÉ** d'un parallélépipède de dimension $n$ formé par les COLONNES de la matrice $A$. »*

| Dimension | Objet | Quantité |
|---|---|---|
| $n=2$ | **Parallélogramme** de sommets $0,b,g,b+g$ | $\|\det[b,g]\|$ = son **aire** |
| $n=3$ | **Parallélépipède** d'arêtes $r,b,g$ | $\|\det[r,b,g]\|$ = son **volume** |

**Les faits à retenir :**

- Quand l'angle entre les vecteurs **diminue**, l'aire **diminue** aussi.
- Si $b,g$ sont **linéairement dépendants** ($b=\lambda g$), ils ne forment plus un parallélogramme de dimension 2 : **l'aire vaut $0$**.
- Si $b=[b,0]^\top$ et $g=[0,g]^\top$ (multiples de la base canonique), $\det=bg-0=bg$ — la formule familière **aire $=$ hauteur $\times$ longueur**.
- **Le SIGNE indique l'ORIENTATION** des vecteurs générateurs relativement à la base canonique. Échanger l'ordre en $g,b$ échange les colonnes et **renverse l'orientation**.

**Le calcul numérique.** Avec

$$r=\begin{bmatrix}2\\0\\-8\end{bmatrix},\quad g=\begin{bmatrix}6\\1\\0\end{bmatrix},\quad b=\begin{bmatrix}1\\4\\-1\end{bmatrix}\qquad A=[r,g,b]=\begin{bmatrix}2&6&1\\0&1&4\\-8&0&-1\end{bmatrix}$$

$$\boxed{\;V=|\det(A)|=186\;}$$

<details><summary>Recalcul par développement sur la première ligne</summary>

$\det A=2(1\cdot(-1)-4\cdot0)-6(0\cdot(-1)-4\cdot(-8))+1(0\cdot0-1\cdot(-8))$ $=2(-1)-6(0+32)+1(8)=-2-192+8=-186$

Donc $|\det A|=186$ Le **signe négatif** indique que $(r,g,b)$ a l'orientation **opposée** à la base canonique.

</details>

### 1.4 Le développement de Laplace

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.2 (Développement de Laplace).</span>

Pour $A\in\mathbb R^{n\times n}$ et tout $j=1,\dots,n$ : **1. Développement selon la COLONNE $j$**

$$\det(A)=\sum_{k=1}^{n}(-1)^{k+j}a_{kj}\det(A_{k,j})$$

**2. Développement selon la LIGNE $j$**

$$\det(A)=\sum_{k=1}^{n}(-1)^{k+j}a_{jk}\det(A_{j,k})$$

Ici $A_{k,j}\in\mathbb R^{(n-1)\times(n-1)}$ est la **sous-matrice** obtenue en **supprimant la ligne $k$ et la colonne $j$**.

</div>

**Vocabulaire :** $\det(A_{k,j})$ est un **MINEUR** ; $(-1)^{k+j}\det(A_{k,j})$ est un **COFACTEUR**.

> **La puissance du théorème.** Il **réduit** le calcul d'un déterminant $n\times n$ à des déterminants $(n-1)\times(n-1)$. En l'appliquant **récursivement**, on descend jusqu'à des déterminants $2\times2$.

**Exemple 4.3.** Pour

$$A=\begin{bmatrix}1&2&3\\3&1&2\\0&0&1\end{bmatrix}$$

Développement selon la **première ligne** :

$$\det(A)=(-1)^{1+1}\cdot1\begin{vmatrix}1&2\\0&1\end{vmatrix}+(-1)^{1+2}\cdot2\begin{vmatrix}3&2\\0&1\end{vmatrix}+(-1)^{1+3}\cdot3\begin{vmatrix}3&1\\0&0\end{vmatrix}$$

$$=1(1-0)-2(3-0)+3(0-0)=1-6+0=-5$$

**Contrôle par Sarrus :**

$$\det(A)=1\cdot1\cdot1+3\cdot0\cdot3+0\cdot2\cdot2-0\cdot1\cdot3-1\cdot0\cdot2-3\cdot2\cdot1=1-6=-5\quad\text{}$$

<details><summary>Les deux calculs recalculés indépendamment</summary>

Laplace : $1\cdot(1\cdot1-2\cdot0)-2\cdot(3\cdot1-2\cdot0)+3\cdot(3\cdot0-1\cdot0)=1-6+0=\mathbf{-5}$

Sarrus : $1+0+0-0-0-6=\mathbf{-5}$ Les deux méthodes concordent.

</details>

### 1.5 Les sept propriétés du déterminant

| Propriété | Énoncé |
|---|---|
| **Produit** | $\det(AB)=\det(A)\det(B)$ |
| **Transposition** | $\det(A)=\det(A^\top)$ — le déterminant est **invariant par transposition** |
| **Inverse** | Si $A$ est régulière, $\det(A^{-1})=\dfrac{1}{\det(A)}$ |
| **Similitude** | Des matrices **semblables** ont le **même déterminant**. Conséquence : pour une application linéaire $\Phi:V\to V$, **toutes** les matrices de transformation $A_\Phi$ ont le **même déterminant** — le déterminant est **invariant par changement de base** |
| **Combinaison** | Ajouter un multiple d'une colonne/ligne à une autre **ne change pas** $\det(A)$ |
| **Mise à l'échelle** | Multiplier une colonne/ligne par $\lambda$ multiplie $\det(A)$ par $\lambda$. En particulier $\boxed{\det(\lambda A)=\lambda^n\det(A)}$ |
| **Échange** | Échanger deux lignes/colonnes **change le SIGNE** de $\det(A)$ |

> **La conséquence pratique des trois dernières.** *« On peut utiliser l'élimination de Gauss pour calculer $\det(A)$ en amenant $A$ en forme échelonnée. On peut s'arrêter quand $A$ est **triangulaire**, et le déterminant est alors le produit des éléments diagonaux. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.3.</span>

$A\in\mathbb R^{n\times n}$ a $\det(A)\neq0$ **si et seulement si** $\operatorname{rk}(A)=n$. Autrement dit, **$A$ est inversible si et seulement si elle est de RANG PLEIN**.

</div>

> ⚠️ **La mise en perspective du livre.** *« Quand les mathématiques se faisaient surtout à la main, le calcul du déterminant était une façon essentielle d'analyser l'inversibilité. Mais les approches contemporaines en apprentissage automatique utilisent des **méthodes numériques directes** qui ont supplanté le calcul explicite du déterminant. »* L'intérêt du déterminant est donc **théorique** — surtout via le **polynôme caractéristique**.

## 🔴 Concept 2 — Trace et polynôme caractéristique

### 2.1 La trace

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.4 (Trace).</span>

Pour $A\in\mathbb R^{n\times n}$ :

$$\boxed{\;\operatorname{tr}(A):=\sum_{i=1}^{n}a_{ii}\;}$$

C'est la **somme des éléments diagonaux**.

</div>

**Les quatre propriétés :**

$$\operatorname{tr}(A+B)=\operatorname{tr}(A)+\operatorname{tr}(B),\qquad A,B\in\mathbb R^{n\times n}$$

$$\operatorname{tr}(\alpha A)=\alpha\operatorname{tr}(A),\qquad\alpha\in\mathbb R$$

$$\operatorname{tr}(I_n)=n$$

$$\boxed{\;\operatorname{tr}(AB)=\operatorname{tr}(BA)\quad\text{pour } A\in\mathbb R^{n\times k},\ B\in\mathbb R^{k\times n}\;}$$

> **Un fait remarquable.** *« On peut montrer qu'une **SEULE** fonction satisfait ces quatre propriétés ensemble — la trace. »*

**L'invariance cyclique**, plus générale :

$$\boxed{\;\operatorname{tr}(AKL)=\operatorname{tr}(KLA)\;}$$

pour $A\in\mathbb R^{a\times k}$, $K\in\mathbb R^{k\times l}$, $L\in\mathbb R^{l\times a}$ — et cela s'étend à un **nombre arbitraire** de matrices. Cas particulier, pour $x,y\in\mathbb R^n$ :

$$\operatorname{tr}(xy^\top)=\operatorname{tr}(y^\top x)=y^\top x\in\mathbb R$$

**L'invariance par changement de base.** Si $B=S^{-1}AS$ (changement de base, §2.7.2) :

$$\operatorname{tr}(B)=\operatorname{tr}(S^{-1}AS)=\operatorname{tr}(ASS^{-1})=\operatorname{tr}(A)$$

> *« Alors que les représentations matricielles d'applications linéaires **dépendent de la base**, la TRACE d'une application linéaire $\Phi$ est **INDÉPENDANTE de la base**. »* Comme le déterminant et le spectre.

### 2.2 Le polynôme caractéristique

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.5 (Polynôme caractéristique).</span>

Pour $\lambda\in\mathbb R$ et $A\in\mathbb R^{n\times n}$ :

$$\boxed{\;p_A(\lambda):=\det(A-\lambda I)=c_0+c_1\lambda+c_2\lambda^2+\dots+c_{n-1}\lambda^{n-1}+(-1)^n\lambda^n\;}$$

avec $c_0,\dots,c_{n-1}\in\mathbb R$. En particulier :

$$\boxed{\;c_0=\det(A)\qquad\qquad c_{n-1}=(-1)^{n-1}\operatorname{tr}(A)\;}$$

</div>

> ⚠️ **Le coefficient dominant est $(-1)^n$**, pas $1$ : le polynôme caractéristique n'est **pas unitaire** avec cette convention.

## 🔴 Concept 3 — Valeurs propres et vecteurs propres (§4.2)

### 3.1 Définitions

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.6.</span>

Soit $A\in\mathbb R^{n\times n}$ carrée. Alors $\lambda\in\mathbb R$ est une **VALEUR PROPRE** de $A$ et $x\in\mathbb R^n\setminus\{0\}$ le **VECTEUR PROPRE** correspondant si

$$\boxed{\;Ax=\lambda x\;}$$

C'est l'**équation aux valeurs propres**.

</div>

*« **Eigen** est un mot allemand signifiant « caractéristique », « propre » ou « à soi ». »*

> ⚠️ **$x\neq0$ est obligatoire** : sinon $A\cdot0=\lambda\cdot0$ serait vrai pour tout $\lambda$ et la notion serait vide.

> ⚠️ **Sur l'ordre.** *« Dans la littérature et les logiciels, il est souvent conventionnel de trier les valeurs propres par ordre DÉCROISSANT... Cependant les manuels et publications peuvent avoir des notions d'ordre différentes ou aucune. Nous ne présumons pas d'un ordre dans ce livre si ce n'est pas explicitement précisé. »*

**Les QUATRE énoncés ÉQUIVALENTS** — à savoir enchaîner :

$$\boxed{\;\lambda\text{ est valeur propre de }A\iff\exists x\neq0:\ (A-\lambda I_n)x=0\iff\operatorname{rk}(A-\lambda I_n)<n\iff\det(A-\lambda I_n)=0\;}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.7 (Colinéarité et codirection).</span>

Deux vecteurs pointant dans la **même** direction sont **codirigés**. Deux vecteurs sont **colinéaires** s'ils pointent dans la **même OU l'opposée** direction.

</div>

> ⚠️ **Non-unicité des vecteurs propres.** Si $x$ est vecteur propre pour $\lambda$, alors pour tout $c\in\mathbb R\setminus\{0\}$ :
>
> $$A(cx)=cAx=c\lambda x=\lambda(cx)$$
>
> ⚠️ Donc **tous les vecteurs colinéaires à $x$ sont aussi vecteurs propres** de $A$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.8.</span>

$\lambda\in\mathbb R$ est une valeur propre de $A$ **si et seulement si** $\lambda$ est une **RACINE** du polynôme caractéristique $p_A(\lambda)$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.9 (Multiplicité algébrique).</span>

La **multiplicité algébrique** de $\lambda_i$ est le **nombre de fois que la racine apparaît** dans le polynôme caractéristique.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.10 (Espace propre et spectre).</span>

L'ensemble de tous les vecteurs propres de $A$ associés à $\lambda$ **engendre un sous-espace** de $\mathbb R^n$, appelé l'**ESPACE PROPRE** de $A$ relativement à $\lambda$, noté $E_\lambda$. L'ensemble de toutes les valeurs propres est l'**EIGENSPECTRE** (ou simplement le **spectre**) de $A$.

</div>

$$\boxed{\;E_\lambda=\ker(A-\lambda I)\;}$$

> **L'interprétation géométrique.** *« Le vecteur propre correspondant à une valeur propre non nulle pointe dans une direction qui est **ÉTIRÉE** par l'application linéaire. **La valeur propre est le FACTEUR d'étirement.** Si la valeur propre est **négative**, la direction de l'étirement est **RETOURNÉE**. »*

**Exemple 4.4 — le cas de l'identité.** $p_I(\lambda)=\det(I-\lambda I)=(1-\lambda)^n=0$ : **une seule** valeur propre $\lambda=1$, de multiplicité $n$. Comme $Ix=1\cdot x$ pour **tout** $x\neq0$, l'unique espace propre $E_1$ est de **dimension $n$**, et **les $n$ vecteurs de la base canonique** sont vecteurs propres de $I$.

### 3.2 Quatre propriétés utiles

- *« $A$ et $A^\top$ possèdent **les mêmes valeurs propres**, mais **pas nécessairement les mêmes vecteurs propres**. »*
- $E_\lambda=\ker(A-\lambda I)$, puisque $Ax=\lambda x\iff(A-\lambda I)x=0\iff x\in\ker(A-\lambda I)$.
- Des **matrices semblables** possèdent les **mêmes valeurs propres**. Donc les valeurs propres d'une application linéaire sont **indépendantes du choix de la base** — comme le déterminant et la trace, ce sont des **paramètres caractéristiques** invariants par changement de base.
- **Les matrices symétriques définies positives ont toujours des valeurs propres RÉELLES et POSITIVES.**

### 3.3 Exemple 4.5 — la procédure en trois étapes

Pour

$$A=\begin{bmatrix}4&2\\1&3\end{bmatrix}$$

**Étape 1 — le polynôme caractéristique.** Puisque $x\neq0$, le noyau de $A-\lambda I$ doit contenir plus que $0$, donc $A-\lambda I$ **n'est pas inversible**, donc $\det(A-\lambda I)=0$.

**Étape 2 — les valeurs propres.**

$$p_A(\lambda)=\det\begin{bmatrix}4-\lambda&2\\1&3-\lambda\end{bmatrix}=(4-\lambda)(3-\lambda)-2\cdot1=10-7\lambda+\lambda^2=(2-\lambda)(5-\lambda)$$

$$\boxed{\;\lambda_1=2,\qquad\lambda_2=5\;}$$

**Étape 3 — les vecteurs propres et espaces propres.** On résout $(A-\lambda I)x=0$.

Pour $\lambda=5$ :

$$\begin{bmatrix}-1&2\\1&-2\end{bmatrix}x=0\quad\Longrightarrow\quad E_5=\operatorname{span}\left[\begin{bmatrix}2\\1\end{bmatrix}\right]$$

Pour $\lambda=2$ :

$$\begin{bmatrix}2&2\\1&1\end{bmatrix}x=0\quad\Longrightarrow\quad E_2=\operatorname{span}\left[\begin{bmatrix}1\\-1\end{bmatrix}\right]$$

Les deux espaces propres sont **de dimension 1** (un seul vecteur de base chacun).

<details><summary>Contrôle direct de l'équation aux valeurs propres</summary>

$\lambda=5$ : $A[2,1]^\top=[4\cdot2+2\cdot1,\ 1\cdot2+3\cdot1]^\top=[10,5]^\top=5[2,1]^\top$

$\lambda=2$ : $A[1,-1]^\top=[4-2,\ 1-3]^\top=[2,-2]^\top=2[1,-1]^\top$

Contrôles globaux : $\det A=12-2=10=2\times5$ (Th. 4.16) ; $\operatorname{tr}A=4+3=7=2+5$ (Th. 4.17)

</details>

### 3.4 Multiplicité géométrique et matrices défectives

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.11 (Multiplicité géométrique).</span>

La **multiplicité géométrique** de $\lambda_i$ est le **nombre de vecteurs propres linéairement indépendants** associés à $\lambda_i$ — autrement dit la **DIMENSION de l'espace propre** $E_{\lambda_i}$.

</div>

> ⚠️ **L'encadrement à connaître par cœur :**
>
> $$\boxed{\;1\leqslant\text{multiplicité GÉOMÉTRIQUE}\leqslant\text{multiplicité ALGÉBRIQUE}\;}$$
>
> ⚠️ *« Elle est au moins 1 car toute valeur propre a au moins un vecteur propre associé. Elle **ne peut pas excéder** la multiplicité algébrique, mais elle peut être **inférieure**. »*

**Exemple 4.6 — la matrice de cisaillement.**

$$A=\begin{bmatrix}2&1\\0&2\end{bmatrix}$$

a **deux valeurs propres répétées** $\lambda_1=\lambda_2=2$, donc une multiplicité **algébrique** de 2. Mais elle n'a qu'**un seul** vecteur propre unitaire distinct $x_1=[1,0]^\top$, donc une multiplicité **géométrique** de **1**.

*(Les propriétés de préservation d'aire de ce type de cisaillement parallèle à un axe s'appellent en géométrie le **principe de Cavalieri** d'égalité des aires pour les parallélogrammes.)*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.13 (Matrice défective).</span>

$A\in\mathbb R^{n\times n}$ est **DÉFECTIVE** si elle possède **moins de $n$ vecteurs propres linéairement indépendants**.

</div>

**Caractérisation.** Une matrice non défective ne demande pas $n$ valeurs propres **distinctes**, mais que les vecteurs propres forment une **base** de $\mathbb R^n$. Pour une matrice défective, **la somme des dimensions des espaces propres est $<n$** : il existe au moins une $\lambda_i$ de multiplicité algébrique $m>1$ et de multiplicité géométrique $<m$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.12.</span>

Les vecteurs propres $x_1,\dots,x_n$ d'une matrice $A\in\mathbb R^{n\times n}$ ayant **$n$ valeurs propres DISTINCTES** sont **linéairement indépendants**. Ils forment donc une base de $\mathbb R^n$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Corollaire.</span>

⚠️ *« Une matrice défective ne peut pas avoir $n$ valeurs propres distinctes, puisque des valeurs propres distinctes ont des vecteurs propres linéairement indépendants. »*

</div>

### 3.5 L'intuition graphique en deux dimensions — les cinq matrices de la figure 4.4

| Matrice | Valeurs propres | $\det$ | Effet |
|---|---|---|---|
| $A_1=\begin{bmatrix}\tfrac12&0\\0&2\end{bmatrix}$ | $\lambda_1=2$, $\lambda_2=\tfrac12$ | $1$ | Vecteurs propres = **axes canoniques** ; vertical **étiré $\times2$**, horizontal **comprimé $\times\tfrac12$**. **Préserve l'aire** |
| $A_2=\begin{bmatrix}1&\tfrac12\\0&1\end{bmatrix}$ | $\lambda_1=\lambda_2=1$ | $1$ | **CISAILLEMENT** horizontal. Vecteurs propres **colinéaires** : l'application n'agit que **selon UNE direction**. Préserve l'aire |
| $A_3=\begin{bmatrix}\cos\frac\pi6&-\sin\frac\pi6\\\sin\frac\pi6&\cos\frac\pi6\end{bmatrix}=\frac12\begin{bmatrix}\sqrt3&-1\\1&\sqrt3\end{bmatrix}$ | $0{,}87\mp0{,}5i$ — **COMPLEXES** | $1$ | **ROTATION** de $\frac\pi6$ rad $=30^\circ$. Pas de vecteur propre réel — une rotation **doit** préserver le volume |
| $A_4=\begin{bmatrix}1&-1\\-1&1\end{bmatrix}$ | $\lambda_1=0$, $\lambda_2=2$ | $\mathbf 0$ | **EFFONDREMENT** de $\mathbb R^2$ sur une dimension. La direction de $\lambda_1=0$ s'effondre ; l'orthogonale est étirée $\times2$. **Aire de l'image nulle** |
| $A_5=\begin{bmatrix}1&\tfrac12\\\tfrac12&1\end{bmatrix}$ | $\lambda_1=0{,}5$, $\lambda_2=1{,}5$ | $0{,}75$ | **Cisaillement-étirement** : l'espace est ramené à **75 %**. Étiré $\times1{,}5$ selon un vecteur propre, comprimé $\times0{,}5$ selon l'orthogonal |

> **Les trois leçons.** (i) $\det=1\Rightarrow$ **aire préservée**. (ii) $\det=0\Rightarrow$ **effondrement dimensionnel**, et $0$ est valeur propre. (iii) Des valeurs propres **complexes** signalent une **rotation** — aucune direction réelle n'est simplement étirée.

## 🔴 Concept 4 — Le théorème spectral et les liens det/trace

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.14.</span>

Étant donnée $A\in\mathbb R^{m\times n}$, on peut **toujours** obtenir une matrice **symétrique semi-définie positive** $S\in\mathbb R^{n\times n}$ en posant

$$\boxed{\;S:=A^\top A\;}$$

Si $\operatorname{rk}(A)=n$, alors $S$ est symétrique **définie positive**.

</div>

<details><summary>La preuve, en deux lignes (donnée par le livre)</summary>

**Symétrie** : $S=A^\top A=A^\top(A^\top)^\top=(A^\top A)^\top=S^\top$

**Semi-définie positivité** : $x^\top Sx=x^\top A^\top Ax=(x^\top A^\top)(Ax)=(Ax)^\top(Ax)\geqslant0$, *« parce que le produit scalaire calcule une somme de carrés, qui sont eux-mêmes non négatifs. »*

</details>

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.15 (THÉORÈME SPECTRAL).</span>

Si $A\in\mathbb R^{n\times n}$ est **SYMÉTRIQUE**, il existe une **BASE ORTHONORMÉE** de l'espace vectoriel correspondant, **constituée de vecteurs propres de $A$**, et **chaque valeur propre est RÉELLE**.

</div>

> **L'implication directe.** L'eigendécomposition d'une matrice symétrique **existe** (avec des valeurs propres réelles), et on peut trouver une **ONB de vecteurs propres**, si bien que
>
> $$\boxed{\;A=PDP^\top\;}$$
>
> où $D$ est diagonale et les colonnes de $P$ contiennent les vecteurs propres.

**Exemple 4.8 — le théorème spectral en action.**

$$A=\begin{bmatrix}3&2&2\\2&3&2\\2&2&3\end{bmatrix},\qquad p_A(\lambda)=-(\lambda-1)^2(\lambda-7)$$

Valeurs propres $\lambda_1=1$ (**répétée**) et $\lambda_2=7$. Espaces propres :

$$E_1=\operatorname{span}\left[\underbrace{\begin{bmatrix}-1\\1\\0\end{bmatrix}}_{=:x_1},\underbrace{\begin{bmatrix}-1\\0\\1\end{bmatrix}}_{=:x_2}\right],\qquad E_7=\operatorname{span}\left[\underbrace{\begin{bmatrix}1\\1\\1\end{bmatrix}}_{=:x_3}\right]$$

⚠️ **Le problème.** $x_3$ est orthogonal à $x_1$ et $x_2$, mais $x_1^\top x_2=1\neq0$ : $x_1$ et $x_2$ **ne sont PAS orthogonaux**. Le théorème spectral affirme qu'une base orthogonale existe — mais **celle-ci n'en est pas une**.

**La solution — Gram-Schmidt.** L'argument-clé : pour tous $\alpha,\beta\in\mathbb R$,

$$A(\alpha x_1+\beta x_2)=Ax_1\alpha+Ax_2\beta=\lambda(\alpha x_1+\beta x_2)$$

Donc **toute combinaison linéaire de $x_1$ et $x_2$ est encore un vecteur propre associé à $\lambda$**. On peut donc appliquer Gram-Schmidt sans quitter $E_1$ :

$$x_1'=\begin{bmatrix}-1\\1\\0\end{bmatrix},\qquad x_2'=\frac12\begin{bmatrix}-1\\-1\\2\end{bmatrix}$$

qui sont **orthogonaux entre eux**, **orthogonaux à $x_3$**, et **vecteurs propres de $A$** pour $\lambda_1=1$.

<details><summary>Vérification intégrale</summary>

**Vecteurs propres** : $A[-1,1,0]^\top=[-3+2,\,-2+3,\,-2+2]^\top=[-1,1,0]^\top=1\cdot x_1$ ; $A[-1,0,1]^\top=[-1,0,1]^\top$ ; $A[1,1,1]^\top=[7,7,7]^\top=7x_3$

**Non-orthogonalité** : $x_1^\top x_2=1+0+0=1\neq0$ (alors que $x_1^\top x_3=0$ et $x_2^\top x_3=0$)

**Gram-Schmidt** : $\lambda=\dfrac{x_1^\top x_2}{x_1^\top x_1}=\dfrac12$, donc $x_2'=x_2-\tfrac12x_1=[-1,0,1]^\top-[-\tfrac12,\tfrac12,0]^\top=[-\tfrac12,-\tfrac12,1]^\top=\tfrac12[-1,-1,2]^\top$

**$x_2'$ est bien vecteur propre** : $A[-\tfrac12,-\tfrac12,1]^\top=[-\tfrac32-1+2,\ -1-\tfrac32+2,\ -1-1+3]^\top=[-\tfrac12,-\tfrac12,1]^\top=1\cdot x_2'$

**Contrôles globaux** : $\det A=1\cdot1\cdot7=7$ et $\operatorname{tr}A=3+3+3=9=1+1+7$

</details>

### 4.2 Déterminant et trace via le spectre

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.16.</span>

Le déterminant d'une matrice $A\in\mathbb R^{n\times n}$ est le **PRODUIT de ses valeurs propres** :

$$\boxed{\;\det(A)=\prod_{i=1}^{n}\lambda_i\;}$$

où les $\lambda_i\in\mathbb C$ sont les valeurs propres (**éventuellement répétées**).

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.17.</span>

La trace d'une matrice $A\in\mathbb R^{n\times n}$ est la **SOMME de ses valeurs propres** :

$$\boxed{\;\operatorname{tr}(A)=\sum_{i=1}^{n}\lambda_i\;}$$

</div>

> **L'intuition géométrique (figure 4.6).** Soit $A\in\mathbb R^{2\times2}$ avec deux vecteurs propres $x_1,x_2$ formant une **ONB** — le carré qu'ils engendrent a une aire de $1$.
>
> - Les images $v_1=Ax_1=\lambda_1x_1$ et $v_2=Ax_2=\lambda_2x_2$ restent **orthogonales**, et le rectangle qu'elles engendrent a une aire de $\boxed{|\lambda_1\lambda_2|}$ — c'est le **déterminant**.
> - Le périmètre passe de $2(1+1)$ à $\boxed{2(|\lambda_1|+|\lambda_2|)}$ — **la somme des valeurs absolues des valeurs propres dit comment le périmètre change**.

**Exemple 4.9 — le PageRank de Google.** Google utilise **le vecteur propre associé à la valeur propre MAXIMALE** d'une matrice $A$ pour classer une page. L'idée (Larry Page et Sergey Brin, Stanford, 1996) : *« l'importance de toute page web peut être approchée par l'importance des pages qui pointent vers elle. »*

- Tous les sites forment un **graphe orienté** géant : qui pointe vers qui.
- Le poids (importance) $x_i\geqslant0$ d'un site $a_i$ compte le nombre de pages pointant vers $a_i$, **pondéré par l'importance de celles-ci**.
- Le comportement de navigation est modélisé par une **matrice de transition** $A$ : la probabilité (de clic) d'aboutir sur un autre site.
- **La propriété clé** : pour tout vecteur de rang initial $x$, la suite $x,\ Ax,\ A^2x,\dots$ **converge** vers un vecteur $x_*$, le **PageRank**, qui satisfait

$$\boxed{\;Ax_*=x_*\;}$$

c'est-à-dire un **vecteur propre de valeur propre $1$**. Après normalisation ($\lVert x_*\rVert=1$), on interprète les entrées comme des **probabilités**.

## 🟠 Concept 5 — La décomposition de Cholesky (§4.3)

> **L'analogie du livre.** *« Dans les réels positifs, on a l'opération racine carrée qui donne une décomposition du nombre en composantes identiques, par exemple $9=3\cdot3$. Pour les matrices, il faut faire attention à ne calculer une opération de type racine carrée que sur des quantités positives. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.18 (Décomposition de Cholesky).</span>

Une matrice **symétrique DÉFINIE POSITIVE** $A$ peut être factorisée en

$$\boxed{\;A=LL^\top\;}$$

où $L$ est **triangulaire INFÉRIEURE** à **éléments diagonaux POSITIFS**. $L$ est le **facteur de Cholesky** de $A$, et **il est UNIQUE**.

</div>

**Exemple 4.10 — la construction en $3\times3$.** On cherche

$$A=\begin{bmatrix}a_{11}&a_{21}&a_{31}\\a_{21}&a_{22}&a_{32}\\a_{31}&a_{32}&a_{33}\end{bmatrix}=LL^\top=\begin{bmatrix}l_{11}&0&0\\l_{21}&l_{22}&0\\l_{31}&l_{32}&l_{33}\end{bmatrix}\begin{bmatrix}l_{11}&l_{21}&l_{31}\\0&l_{22}&l_{32}\\0&0&l_{33}\end{bmatrix}$$

En développant le membre de droite :

$$LL^\top=\begin{bmatrix}l_{11}^2&l_{21}l_{11}&l_{31}l_{11}\\l_{21}l_{11}&l_{21}^2+l_{22}^2&l_{31}l_{21}+l_{32}l_{22}\\l_{31}l_{11}&l_{31}l_{21}+l_{32}l_{22}&l_{31}^2+l_{32}^2+l_{33}^2\end{bmatrix}$$

**Le motif sur la DIAGONALE :**

$$\boxed{\;l_{11}=\sqrt{a_{11}},\qquad l_{22}=\sqrt{a_{22}-l_{21}^2},\qquad l_{33}=\sqrt{a_{33}-(l_{31}^2+l_{32}^2)}\;}$$

**Le motif SOUS la diagonale** ($l_{ij}$, $i>j$) :

$$\boxed{\;l_{21}=\frac{1}{l_{11}}a_{21},\qquad l_{31}=\frac{1}{l_{11}}a_{31},\qquad l_{32}=\frac{1}{l_{22}}(a_{32}-l_{31}l_{21})\;}$$

> **La réalisation-clé.** *« On peut calculer À REBOURS ce que les composantes $l_{ij}$ de $L$ doivent être, à partir des valeurs $a_{ij}$ de $A$ et des valeurs de $l_{ij}$ **précédemment calculées**. »* C'est un algorithme **séquentiel** : colonne par colonne, de gauche à droite et de haut en bas.

**Les trois usages en apprentissage automatique :**

1. **Échantillonner une gaussienne.** La **matrice de covariance** d'une gaussienne multivariée (§6.5) est symétrique définie positive ; sa factorisation de Cholesky permet de **générer des échantillons** de la loi.
2. **Transformer linéairement des variables aléatoires** — lourdement exploité pour calculer des **gradients dans les modèles stochastiques profonds**, comme l'**auto-encodeur variationnel** (Jimenez Rezende *et al.* 2014 ; Kingma & Welling 2014).
3. **Calculer un déterminant très efficacement** :

$$\det(A)=\det(L)\det(L^\top)=\det(L)^2=\prod_i l_{ii}^2$$

puisque $L$ est **triangulaire**. *« De nombreux logiciels numériques utilisent la décomposition de Cholesky pour rendre les calculs plus efficaces. »*

## 🔴 Concept 6 — Décomposition en valeurs propres et diagonalisation (§4.4)

### 6.1 Pourquoi les matrices diagonales

Une **matrice diagonale** $D=\operatorname{diag}(c_1,\dots,c_n)$ permet un calcul **rapide** de trois choses :

| Quantité | Formule |
|---|---|
| **Déterminant** | Le **produit** des entrées diagonales |
| **Puissance** $D^k$ | Chaque élément diagonal **élevé à la puissance $k$** |
| **Inverse** $D^{-1}$ | Le **réciproque** de chaque élément diagonal, si tous sont non nuls |

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.19 (Diagonalisable).</span>

$A\in\mathbb R^{n\times n}$ est **diagonalisable** si elle est **semblable** à une matrice diagonale, c'est-à-dire s'il existe $P\in\mathbb R^{n\times n}$ inversible telle que $D=P^{-1}AP$.

</div>

### 6.2 Le mécanisme

Soient $\lambda_1,\dots,\lambda_n$ des scalaires, $p_1,\dots,p_n\in\mathbb R^n$, $P:=[p_1,\dots,p_n]$ et $D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$. Alors

$$AP=PD$$

**si et seulement si** les $\lambda_i$ sont les valeurs propres de $A$ et les $p_i$ les vecteurs propres correspondants. En effet :

$$AP=A[p_1,\dots,p_n]=[Ap_1,\dots,Ap_n]$$

$$PD=[p_1,\dots,p_n]\operatorname{diag}(\lambda_1,\dots,\lambda_n)=[\lambda_1p_1,\dots,\lambda_np_n]$$

L'égalité colonne par colonne donne exactement $Ap_i=\lambda_ip_i$.

⚠️ La définition exige que $P$ soit **inversible**, donc de **rang plein** (Th. 4.3) : il faut **$n$ vecteurs propres linéairement indépendants**, formant une base de $\mathbb R^n$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.20 (Décomposition en valeurs propres).</span>

$A\in\mathbb R^{n\times n}$ se factorise en

$$\boxed{\;A=PDP^{-1}\;}$$

où $D$ est diagonale avec les valeurs propres de $A$ sur la diagonale, **si et seulement si les vecteurs propres de $A$ forment une BASE de $\mathbb R^n$**.

</div>

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que le théorème implique</span>

⚠️ : *« seules les matrices NON DÉFECTIVES peuvent être diagonalisées »*, et les **colonnes de $P$ sont les $n$ vecteurs propres** de $A$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.21.</span>

Une matrice **SYMÉTRIQUE** $S\in\mathbb R^{n\times n}$ peut **TOUJOURS** être diagonalisée.

</div>

Cela découle directement du théorème spectral. De plus, comme l'ONB de vecteurs propres rend $P$ **orthogonale**, on a $P^{-1}=P^\top$ et donc

$$\boxed{\;D=P^\top AP\qquad\text{et}\qquad A=PDP^\top\;}$$

> ⚠️ **Le cas défectif.** *« La forme normale de Jordan offre une décomposition qui fonctionne pour les matrices défectives (Lang, 1987), mais elle dépasse le cadre de ce livre. »*

### 6.3 L'intuition géométrique en trois temps (figure 4.7)

$$\underbrace{P^{-1}}_{\text{3. changement de base : canonique}\to\text{propre}}\quad\underbrace{D}_{\text{2. mise à l'échelle par les }\lambda_i}\quad\underbrace{P}_{\text{1. retour à la base canonique}}$$

Lu de droite à gauche dans $A=PDP^{-1}$, appliqué à un vecteur :

1. **$P^{-1}$** effectue un **changement de base** de la base canonique vers la **base propre** (une opération de type rotation).
2. **$D$** effectue une **mise à l'échelle** le long de ces axes remappés, par les valeurs propres $\lambda_i$ — un cercle devient une **ellipse**.
3. **$P$** **défait** le changement de base et restitue le repère original, donnant $\lambda_ip_i$.

### 6.4 Exemple 4.11 — la procédure complète

$$A=\frac12\begin{bmatrix}5&-2\\-2&5\end{bmatrix}$$

**Étape 1 — valeurs et vecteurs propres.**

$$\det(A-\lambda I)=\left(\tfrac52-\lambda\right)^2-1=\lambda^2-5\lambda+\tfrac{21}{4}=\left(\lambda-\tfrac72\right)\left(\lambda-\tfrac32\right)$$

$$\lambda_1=\tfrac72,\qquad\lambda_2=\tfrac32$$

Vecteurs propres **normalisés**, via $Ap_1=\tfrac72p_1$ et $Ap_2=\tfrac32p_2$ :

$$p_1=\frac{1}{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix},\qquad p_2=\frac{1}{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix}$$

**Étape 2 — vérifier l'existence.** $p_1,p_2$ forment une base de $\mathbb R^2$, donc $A$ est diagonalisable.

**Étape 3 — construire $P$.**

$$P=[p_1,p_2]=\frac{1}{\sqrt2}\begin{bmatrix}1&1\\-1&1\end{bmatrix}\qquad\Longrightarrow\qquad P^{-1}AP=\begin{bmatrix}\tfrac72&0\\0&\tfrac32\end{bmatrix}=D$$

Et, puisque $p_1,p_2$ forment ici une **ONB**, $P^{-1}=P^\top$ :

$$\frac12\begin{bmatrix}5&-2\\-2&5\end{bmatrix}=\frac{1}{\sqrt2}\begin{bmatrix}1&1\\-1&1\end{bmatrix}\begin{bmatrix}\tfrac72&0\\0&\tfrac32\end{bmatrix}\frac{1}{\sqrt2}\begin{bmatrix}1&-1\\1&1\end{bmatrix}$$

<details><summary>Contrôles numériques</summary>

$Ap_1$ avec $p_1=\tfrac{1}{\sqrt2}[1,-1]^\top$ : $A[0{,}7071,-0{,}7071]^\top=[2{,}4749,-2{,}4749]^\top$ et $\tfrac72p_1=[2{,}4749,-2{,}4749]^\top$

$Ap_2$ : $[1{,}0607,1{,}0607]^\top=\tfrac32p_2$

$\det A=\tfrac{25}{4}-1=\tfrac{21}{4}=5{,}25=\tfrac72\cdot\tfrac32$ ; $\operatorname{tr}A=5=\tfrac72+\tfrac32$

</details>

### 6.5 Les deux gains de l'eigendécomposition

**Puissances de matrices.**

$$\boxed{\;A^k=(PDP^{-1})^k=PD^kP^{-1}\;}$$

*« Calculer $D^k$ est efficace car on applique l'opération individuellement à chaque élément diagonal. »*

**Déterminants.**

$$\det(A)=\det(P)\det(D)\det(P^{-1})=\det(D)=\prod_i d_{ii}$$

⚠️ Les deux facteurs $\det(P)$ et $\det(P^{-1})$ **se compensent exactement**.

## 🔴 Concept 7 — La décomposition en valeurs singulières (§4.5)

### 7.1 Le théorème

> **Le statut de la SVD.** *« Elle a été appelée le "**théorème fondamental de l'algèbre linéaire**" (Strang, 1993) parce qu'elle s'applique à **TOUTES les matrices**, pas seulement aux matrices carrées, et qu'elle **existe TOUJOURS**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.22 (Théorème de la SVD).</span>

Soit $A\in\mathbb R^{m\times n}$ une matrice rectangulaire de rang $r\in[0,\min(m,n)]$. La **SVD** de $A$ est une décomposition de la forme

$$\boxed{\;A=U\Sigma V^\top\;}$$

avec :

- $U\in\mathbb R^{m\times m}$ **ORTHOGONALE**, de colonnes $u_i$, $i=1,\dots,m$ ;
- $V\in\mathbb R^{n\times n}$ **ORTHOGONALE**, de colonnes $v_j$, $j=1,\dots,n$ ;
- $\Sigma\in\mathbb R^{m\times n}$ avec $\Sigma_{ii}=\sigma_i\geqslant0$ et $\Sigma_{ij}=0$ pour $i\neq j$.

Les $\sigma_i$ sont les **VALEURS SINGULIÈRES**, les $u_i$ les **vecteurs singuliers GAUCHES**, les $v_j$ les **vecteurs singuliers DROITS**. Par convention, elles sont **ordonnées** : $\sigma_1\geqslant\sigma_2\geqslant\dots\geqslant\sigma_r\geqslant0$.

</div>

> ⚠️ **Le point délicat de $\Sigma$.** *« $\Sigma$ est **RECTANGULAIRE**, de la **même taille que $A$**. Elle a donc une sous-matrice diagonale contenant les valeurs singulières, et a besoin d'un **REMPLISSAGE PAR DES ZÉROS**. »*
>
> - Si $m>n$ : structure diagonale jusqu'à la ligne $n$, puis des lignes de $0^\top$ des lignes $n+1$ à $m$.
> - Si $m<n$ : structure diagonale jusqu'à la colonne $m$, puis des colonnes de $0$ des colonnes $m+1$ à $n$.

> **La matrice $\Sigma$ est UNIQUE.** Ce n'est pas le cas de $U$ et $V$ en général.

### 7.2 L'intuition géométrique — trois opérations

La SVD décompose l'application linéaire $\Phi:\mathbb R^n\to\mathbb R^m$ en **trois opérations** :

**1. $V^\top$ — changement de base dans le DOMAINE $\mathbb R^n$.** $V$ passe de $\tilde B$ à la base canonique $B$ ; $V^\top=V^{-1}$ fait l'inverse, de $B$ vers $\tilde B$. Les vecteurs sont **alignés sur la base canonique**.

**2. $\Sigma$ — mise à l'échelle ET changement de dimension.** Les nouvelles coordonnées sont mises à l'échelle par les $\sigma_i$, et des dimensions sont **ajoutées ou supprimées**. $\Sigma$ est la matrice de transformation de $\Phi$ relativement à $\tilde B$ et $\tilde C$.

**3. $U$ — changement de base dans le CODOMAINE $\mathbb R^m$.** De $\tilde C$ vers la base canonique de $\mathbb R^m$ — une rotation qui sort les vecteurs du plan $e_1e_2$.

> ⚠️ **Le contraste crucial avec l'eigendécomposition.** *« La SVD exprime un changement de base **DANS LE DOMAINE ET DANS LE CODOMAINE**. C'est en contraste avec l'eigendécomposition, qui opère **dans le même espace vectoriel**, où **le même changement de base est appliqué puis défait**. Ce qui rend la SVD spéciale, c'est que ces **DEUX bases DIFFÉRENTES** sont **simultanément liées par la matrice des valeurs singulières $\Sigma$**. »*

**Exemple 4.12.** Pour une grille de vecteurs de $\mathbb R^2$ dans une boîte $2\times2$ centrée à l'origine, avec

$$A=\begin{bmatrix}1&-0{,}8\\0&1\\1&0\end{bmatrix}=U\Sigma V^\top$$

$$U=\begin{bmatrix}-0{,}79&0&-0{,}62\\0{,}38&-0{,}78&-0{,}49\\-0{,}48&-0{,}62&0{,}62\end{bmatrix},\quad\Sigma=\begin{bmatrix}1{,}62&0\\0&1{,}0\\0&0\end{bmatrix},\quad V^\top=\begin{bmatrix}-0{,}78&-0{,}62\\0{,}62&-0{,}78\end{bmatrix}$$

Le trajet : $V^\top$ **fait tourner** $\mathcal X$ ; $\Sigma$ envoie dans $\mathbb R^3$ en **étirant** — **la troisième coordonnée est toujours $0$**, tous les vecteurs restent dans le plan $x_1x_2$ ; $U$ effectue une **rotation dans $\mathbb R^3$** qui sort les vecteurs de ce plan (ils restent néanmoins **sur un plan**).

<details><summary>Contrôle des valeurs singulières</summary>

$A^\top A=\begin{bmatrix}2&-0{,}8\\-0{,}8&1{,}64\end{bmatrix}$, $\operatorname{tr}=3{,}64$, $\det=3{,}28-0{,}64=2{,}64$.

Valeurs propres : $\lambda=\dfrac{3{,}64\pm\sqrt{3{,}64^2-4\cdot2{,}64}}{2}$, donc $\lambda_1=2{,}64$ et $\lambda_2=1{,}0$.

$\sigma_1=\sqrt{2{,}64}=1{,}6248$ et $\sigma_2=1{,}0$ Cohérent avec les $1{,}62$ et $1{,}0$ imprimés (arrondis à deux décimales).

</details>

### 7.3 La construction de la SVD

> **Le lien fondateur.** Comparer l'eigendécomposition d'une matrice **SDP** $S=S^\top=PDP^\top$ avec sa SVD $S=U\Sigma V^\top$ : en posant $U=P=V$ et $D=\Sigma$, on voit que
>
> $$\boxed{\;\text{la SVD d'une matrice SDP EST son eigendécomposition}\;}$$

**Le plan de construction (dans l'ordre du livre) :**

**Étape 1 — les vecteurs singuliers DROITS $v_1,\dots,v_n\in\mathbb R^n$.** Par le théorème 4.14, $A^\top A\in\mathbb R^{n\times n}$ est **toujours** symétrique semi-définie positive ; par le théorème spectral elle est **diagonalisable** avec une ONB de vecteurs propres :

$$A^\top A=PDP^\top$$

En injectant la SVD supposée :

$$A^\top A=(U\Sigma V^\top)^\top(U\Sigma V^\top)=V\Sigma^\top U^\top U\Sigma V^\top=V\Sigma^\top\Sigma V^\top=V\operatorname{diag}(\sigma_1^2,\dots,\sigma_n^2)V^\top$$

⚠️ **Donc $V=P$** : *« les vecteurs propres de $A^\top A$ sont les vecteurs singuliers DROITS. »* Et $\sigma_i^2=\lambda_i$.

**Étape 2 — les vecteurs singuliers GAUCHES.** Le même raisonnement sur $AA^\top\in\mathbb R^{m\times m}$ donne $AA^\top=U\operatorname{diag}(\sigma_1^2,\dots,\sigma_m^2)U^\top$ : *« les vecteurs propres orthonormés de $AA^\top$ sont les vecteurs singuliers GAUCHES $U$. »*

> *« Puisque $AA^\top$ et $A^\top A$ ont **les mêmes valeurs propres non nulles**, les entrées non nulles des matrices $\Sigma$ sont **les mêmes dans les deux cas**. »*

**Étape 3 — le lien.** Les images des $v_i$ sous $A$ sont **orthogonales** : pour $i\neq j$,

$$(Av_i)^\top(Av_j)=v_i^\top(A^\top A)v_j=v_i^\top(\lambda_jv_j)=\lambda_jv_i^\top v_j=0$$

Pour $m\geqslant r$, $\{Av_1,\dots,Av_r\}$ est une base d'un sous-espace de dimension $r$ de $\mathbb R^m$. On **normalise** :

$$\boxed{\;u_i:=\frac{Av_i}{\lVert Av_i\rVert}=\frac{1}{\sqrt{\lambda_i}}Av_i=\frac{1}{\sigma_i}Av_i\;}$$

D'où l'**ÉQUATION SINGULIÈRE** :

$$\boxed{\;Av_i=\sigma_iu_i,\qquad i=1,\dots,r\;}$$

> *« Les vecteurs propres de $A^\top A$ — les vecteurs singuliers droits $v_i$ — et leurs images normalisées sous $A$ — les vecteurs singuliers gauches $u_i$ — forment **deux ONB auto-cohérentes**, connectées par la matrice des valeurs singulières $\Sigma$. »*

### 7.4 Exemple 4.13 — le calcul complet

$$A=\begin{bmatrix}1&0&1\\-2&1&0\end{bmatrix}$$

**Étape 1 — vecteurs singuliers droits comme base propre de $A^\top A$.**

$$A^\top A=\begin{bmatrix}5&-2&1\\-2&1&0\\1&0&1\end{bmatrix}=PDP^\top$$

avec $D=\operatorname{diag}(6,1,0)$ et

$$V=P=\begin{bmatrix}\tfrac{5}{\sqrt{30}}&0&\tfrac{-1}{\sqrt6}\\[3pt]\tfrac{-2}{\sqrt{30}}&\tfrac{1}{\sqrt5}&\tfrac{-2}{\sqrt6}\\[3pt]\tfrac{1}{\sqrt{30}}&\tfrac{2}{\sqrt5}&\tfrac{1}{\sqrt6}\end{bmatrix}$$

**Étape 2 — la matrice des valeurs singulières.** Les $\sigma_i$ sont les **racines carrées** des valeurs propres de $A^\top A$. Comme $\operatorname{rk}(A)=2$, il n'y a que **deux** valeurs singulières non nulles :

$$\sigma_1=\sqrt6,\qquad\sigma_2=1\qquad\Longrightarrow\qquad\Sigma=\begin{bmatrix}\sqrt6&0&0\\0&1&0\end{bmatrix}$$

⚠️ $\Sigma$ doit avoir **la même taille que $A$** ($2\times3$), d'où la colonne de zéros.

**Étape 3 — vecteurs singuliers gauches comme images normalisées.**

$$u_1=\frac{1}{\sigma_1}Av_1=\frac{1}{\sqrt5}\begin{bmatrix}1\\-2\end{bmatrix},\qquad u_2=\frac{1}{\sigma_2}Av_2=\frac{1}{\sqrt5}\begin{bmatrix}2\\1\end{bmatrix}$$

$$U=[u_1,u_2]=\frac{1}{\sqrt5}\begin{bmatrix}1&2\\-2&1\end{bmatrix}$$

<details><summary>Vérification intégrale</summary>

$A^\top A=\begin{bmatrix}5&-2&1\\-2&1&0\\1&0&1\end{bmatrix}$ ; $\det(A^\top A)=0$ (rang 2, donc une valeur propre nulle) ; $\operatorname{tr}(A^\top A)=7=6+1+0$

$AA^\top=\begin{bmatrix}2&-2\\-2&5\end{bmatrix}$, $\operatorname{tr}=7$, $\det=10-4=6$, valeurs propres $6$ et $1$ — **les mêmes valeurs propres non nulles que $A^\top A$**, comme annoncé.

$Av_1=[1{,}09545,-2{,}19089]^\top$, de norme $2{,}44949=\sqrt6=\sigma_1$ $Av_2=[0{,}89443,0{,}44721]^\top$, de norme $1{,}0=\sigma_2$ $Av_3=[0,0]^\top$ — $v_3$ engendre $\ker A$, cohérent avec $\sigma_3=0$.

$u_1=Av_1/\sqrt6=[0{,}44721,-0{,}89443]^\top=\tfrac{1}{\sqrt5}[1,-2]^\top$ $u_2=Av_2/1=[0{,}89443,0{,}44721]^\top=\tfrac{1}{\sqrt5}[2,1]^\top$

</details>

> ⚠️ **L'avertissement numérique du livre.** *« Sur un ordinateur, l'approche illustrée ici a un **mauvais comportement numérique**, et la SVD de $A$ est normalement calculée **SANS recourir à la décomposition en valeurs propres de $A^\top A$**. »*

### 7.5 Eigendécomposition contre SVD — le tableau décisif

|  | **Eigendécomposition** $A=PDP^{-1}$ | **SVD** $A=U\Sigma V^\top$ |
|---|---|---|
| **Existence** | Seulement pour des matrices **carrées**, et seulement si une base de vecteurs propres existe | **TOUJOURS**, pour toute $A\in\mathbb R^{m\times n}$ |
| **Orthogonalité des bases** | Les colonnes de $P$ **ne sont pas nécessairement orthogonales** — le changement de base n'est pas une simple rotation-échelle | $U$ et $V$ sont **orthonormées** : elles représentent bien des **rotations** |
| **Espaces** | Domaine = codomaine, **le même** | Domaine et codomaine peuvent être de **DIMENSIONS DIFFÉRENTES** |
| **Relation entre les deux matrices de base** | $P$ et $P^{-1}$ sont **inverses l'une de l'autre** | $U$ et $V$ ne sont **généralement PAS inverses** (bases dans des espaces différents) |
| **Diagonale** | $D$ peut contenir des valeurs **complexes ou négatives** | $\Sigma$ est **réelle et NON NÉGATIVE** |
| **Structure commune** | Trois applications : **1.** changement de base dans le domaine **2.** mise à l'échelle indépendante de chaque nouveau vecteur de base + envoi domaine → codomaine **3.** changement de base dans le codomaine | idem |

**Les trois liens entre les deux :**

$$\boxed{\;u_i\text{ = vecteurs propres de }AA^\top\qquad v_i\text{ = vecteurs propres de }A^\top A\qquad\sigma_i=\sqrt{\lambda_i}\;}$$

où les $\lambda_i$ sont les valeurs propres **non nulles** de $AA^\top$ **et** de $A^\top A$ (les mêmes).

> **Le cas de coïncidence.** *« Pour les matrices SYMÉTRIQUES $A\in\mathbb R^{n\times n}$, la décomposition en valeurs propres et la SVD sont **une seule et même chose**, ce qui découle du théorème spectral 4.15. »*

### 7.6 Les trois conventions de SVD

| Nom | Forme | Avantage |
|---|---|---|
| **SVD complète** (*full SVD*) — celle du livre | $U\in\mathbb R^{m\times m}$, $\Sigma\in\mathbb R^{m\times n}$, $V\in\mathbb R^{n\times n}$ | Les deux matrices de vecteurs singuliers sont **carrées** |
| **SVD réduite** (*reduced SVD*) | Pour $m\geqslant n$ : $U\in\mathbb R^{m\times n}$, $\Sigma\in\mathbb R^{n\times n}$, $V\in\mathbb R^{n\times n}$ | $\Sigma$ est **diagonale**, comme dans l'eigendécomposition |
| **SVD tronquée** (*truncated SVD*) — §4.6 | Pour $\operatorname{rk}(A)=r$ : $U\in\mathbb R^{m\times r}$, $\Sigma\in\mathbb R^{r\times r}$, $V\in\mathbb R^{r\times n}$ | $\Sigma$ n'a **que des entrées non nulles** sur la diagonale |

> ⚠️ *« Ces différences peuvent prêter à confusion, mais **les mathématiques restent invariantes**. »* Et : *« la restriction $m>n$ est pratiquement inutile ; quand $m<n$, la SVD donne un $\Sigma$ avec **plus de colonnes nulles que de lignes**, et les valeurs singulières $\sigma_{m+1},\dots,\sigma_n$ sont $0$. »*

**Exemple 4.14 — les notes de films.** Trois spectateurs (Ali, Beatrix, Chandra) notent quatre films (*Star Wars*, *Blade Runner*, *Amélie*, *Delicatessen*) de $0$ à $5$, dans une matrice $A\in\mathbb R^{4\times3}$ (lignes = films, colonnes = utilisateurs).

**Les trois hypothèses que fait la SVD ici :**

1. **Tous** les spectateurs notent les films de façon cohérente, avec la **même application linéaire**.
2. Les erreurs ou effets de bruit sont ignorés.
3. On suppose que les vecteurs singuliers gauches $u_i$ sont des **films stéréotypiques** et les vecteurs singuliers droits $v_j$ des **spectateurs stéréotypiques**.

**L'interprétation.**

| Objet | Lecture |
|---|---|
| $u_1$ | Grandes valeurs absolues pour les **deux films de science-fiction** → un **thème science-fiction** |
| $\sigma_1=9{,}6438$ | La grande valeur singulière associée : ce thème **domine** |
| $v_1$ | Grandes valeurs absolues pour **Ali et Beatrix**, qui notent haut la science-fiction → $v_1$ reflète le **« amateur de science-fiction »** |
| $u_2$ | Un thème **film d'art et essai français** |
| $\sigma_2=6{,}3639$ | La deuxième valeur singulière |
| $v_2$ | **Chandra** est proche de l'amateur idéalisé de ces films |

> *« Un amateur idéalisé de science-fiction est un **puriste** : il donne une note de zéro à tout sauf à la science-fiction — cette logique est **impliquée par la sous-structure DIAGONALE de $\Sigma$**. »* Un film est donc représenté par sa **décomposition linéaire en films stéréotypiques** ; une personne par sa décomposition en **thèmes de films**.

> ⚠️ **La condition de validité.** *« Ces deux "espaces" ne sont significativement engendrés par les données de spectateurs et de films que si les données elles-mêmes couvrent une **DIVERSITÉ SUFFISANTE** de spectateurs et de films. »*

## 🔴 Concept 8 — Approximation matricielle (§4.6)

### 8.1 La somme de matrices de rang 1

Les **matrices de rang 1** $A_i:=u_iv_i^\top$ permettent de réécrire la SVD :

$$\boxed{\;A=\sum_{i=1}^{r}\sigma_iu_iv_i^\top=\sum_{i=1}^{r}\sigma_iA_i\;}$$

**Pourquoi.** *« La structure diagonale de $\Sigma$ ne multiplie que les vecteurs singuliers gauches et droits **correspondants** $u_iv_i^\top$ et les met à l'échelle par $\sigma_i$. Tous les termes $\Sigma_{ij}u_iv_j^\top$ **s'annulent pour $i\neq j$** puisque $\Sigma$ est diagonale. Tous les termes $i>r$ s'annulent car les valeurs singulières correspondantes sont $0$. »*

### 8.2 L'approximation de rang $k$

$$\boxed{\;A^{(k)}:=\sum_{i=1}^{k}\sigma_iu_iv_i^\top=\sum_{i=1}^{k}\sigma_iA_i,\qquad\operatorname{rk}\big(A^{(k)}\big)=k\;}$$

**Le calcul de compression de l'image de Stonehenge (figure 4.12).**

| Quantité | Valeur |
|---|---|
| Image originale $A$ | $1\,432\times1\,910=\mathbf{2\,735\,120}$ nombres |
| Approximation de rang 5 | $5\cdot(1\,432+1\,910+1)=\mathbf{16\,715}$ nombres |
| Ratio | **juste au-dessus de $0{,}6\,\%$** de l'original |

*« La forme des rochers devient de plus en plus visible et clairement reconnaissable dès l'approximation de rang 5. »*

<details><summary>Vérification du décompte</summary>

Pour chaque $i\leqslant k$ on stocke : le vecteur $u_i$ ($1\,432$ nombres), le vecteur $v_i$ ($1\,910$ nombres) et la valeur singulière $\sigma_i$ ($1$ nombre), soit $3\,343$ par terme.

$5\times3\,343=16\,715$ et $16\,715/2\,735\,120=0{,}00611=0{,}611\,\%$

</details>

### 8.3 La norme spectrale et Eckart-Young

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.23 (Norme spectrale).</span>

Pour $x\in\mathbb R^n\setminus\{0\}$, la **norme spectrale** de $A\in\mathbb R^{m\times n}$ est

$$\boxed{\;\lVert A\rVert_2:=\max_x\frac{\lVert Ax\rVert_2}{\lVert x\rVert_2}\;}$$

</div>

*« La norme spectrale détermine **de combien un vecteur $x$ peut au plus s'allonger** quand il est multiplié par $A$. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.24.</span>

$\boxed{\lVert A\rVert_2=\sigma_1}$ — **la norme spectrale de $A$ est sa plus grande valeur singulière.**

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 4.25 (Théorème d'ECKART-YOUNG, 1936).</span>

Soit $A\in\mathbb R^{m\times n}$ de rang $r$ et $B\in\mathbb R^{m\times n}$ de rang $k$. Pour tout $k\leqslant r$, avec $A^{(k)}=\sum_{i=1}^{k}\sigma_iu_iv_i^\top$ :

$$\boxed{\;A^{(k)}=\operatorname*{argmin}_{\operatorname{rk}(B)=k}\lVert A-B\rVert_2\;}$$

$$\boxed{\;\big\lVert A-A^{(k)}\big\rVert_2=\sigma_{k+1}\;}$$

</div>

> **L'interprétation.** *« Le théorème d'Eckart-Young énonce **explicitement l'erreur** qu'on introduit en approchant $A$ par une approximation de rang $k$. On peut interpréter cette approximation comme une **PROJECTION** de la matrice de rang plein $A$ sur un espace de dimension inférieure de matrices de rang au plus $k$. **De toutes les projections possibles, la SVD MINIMISE l'erreur** (au sens de la norme spectrale). »*

<details><summary>Pourquoi (4.95) est vraie — la démonstration en une ligne</summary>

$$A-A^{(k)}=\sum_{i=k+1}^{r}\sigma_iu_iv_i^\top$$

C'est **exactement la SVD de la matrice différence**, dont la plus grande valeur singulière est $\sigma_{k+1}$ (les $\sigma_i$ étant ordonnées décroissantes). Par le théorème 4.24, $\lVert A-A^{(k)}\rVert_2=\sigma_{k+1}$

</details>

**Exemple 4.15 — retour aux notes de films.** L'approximation de rang 1 $A_1=u_1v_1^\top$ *« nous dit qu'Ali et Beatrix aiment les films de science-fiction comme Star Wars et Blade Runner (entrées $>0{,}4$), mais **échoue à capturer les notes des autres films par Chandra**. »* La deuxième, $A_2=u_2v_2^\top$, *« capture bien les notes et types de films de Chandra, mais pas les films de science-fiction »*. C'est en **combinant** les deux, dans $A^{(2)}=\sigma_1A_1+\sigma_2A_2$, qu'on retrouve l'essentiel de la structure.

## 🟠 Concept 9 — La phylogénie des matrices (§4.7)

> *« Le mot "phylogénétique" décrit comment on capture les relations entre individus ou groupes ; il dérive des mots grecs pour "**tribu**" et "**source**". »* Les flèches noires de la figure 4.13 signifient « **est un sous-ensemble de** ».

```
                    A ∈ R^(n×m)  TOUTES les matrices réelles
                              │
                  n ≠ m ──────┴────── n = m (CARRÉE)
                    │                      │
                   SVD               det(A) ≠ 0 ?
              (existe toujours)            │
                                    RÉGULIÈRE (inversible)  ∃ A⁻¹
                                           │
                              n vecteurs propres indépendants ?
                                           │
                                  NON DÉFECTIVE → EIGENDÉCOMPOSITION
                                           │
                                  AᵀA = AAᵀ  →  NORMALE
                                           │
                          ┌────────────────┴────────────────┐
                  AᵀA = AAᵀ = I                        S = Sᵀ
                  ORTHOGONALE                        SYMÉTRIQUE
                  Aᵀ = A⁻¹                        (vp toutes RÉELLES)
                       │                                  │
                   ROTATION              ┌────────────────┴──────────┐
                                  xᵀPx > 0                      DIAGONALE
                              DÉFINIE POSITIVE                       │
                              CHOLESKY, vp > 0                   IDENTITÉ
                              toujours inversible
```

**Les points à ne pas manquer :**

- *« **Non singulière** et **non défective** ne sont pas la même chose.** Par exemple, une **matrice de ROTATION** sera inversible (déterminant non nul) mais **NON diagonalisable dans les réels** (les valeurs propres ne sont pas garanties réelles). »*
- Une matrice est **NORMALE** si $A^\top A=AA^\top$. Si la condition plus restrictive $A^\top A=AA^\top=I$ tient, elle est **ORTHOGONALE**. Les matrices orthogonales sont un **sous-ensemble des matrices régulières** et satisfont $A^\top=A^{-1}$.
- Les **matrices symétriques** sont un sous-ensemble fréquent des matrices normales ; elles n'ont **que des valeurs propres RÉELLES**.
- Les **définies positives** $P$ ($x^\top Px>0$ pour tout $x\neq0$) sont un sous-ensemble des symétriques : elles admettent une **décomposition de Cholesky UNIQUE**, n'ont que des **valeurs propres POSITIVES** et sont **toujours inversibles**.
- Les **matrices diagonales** sont fermées pour la multiplication et l'addition, mais **ne forment pas nécessairement un groupe** — seulement si toutes les entrées diagonales sont non nulles (donc la matrice inversible). Cas spécial : l'**identité**.

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Calculer $\det(A)$ pour $n=3$ » | **Sarrus** | Six produits de trois termes, trois positifs et trois négatifs |
| « Calculer $\det(A)$ pour $n\geqslant4$ » | **Laplace ou Gauss** | Développer sur la ligne/colonne ayant **le plus de zéros**, ou trianguler par Gauss |
| « $A$ est-elle inversible ? » | **Th. 4.1 / 4.3** | $\det(A)\neq0\iff\operatorname{rk}(A)=n\iff$ inversible |
| « Quel est le volume engendré ? » | **Ex. 4.2** | $\|\det[v_1,\dots,v_n]\|$ — la **valeur absolue** |
| « Calculer le polynôme caractéristique » | **Déf. 4.5** | $p_A(\lambda)=\det(A-\lambda I)$ ; contrôle : $c_0=\det A$, $c_{n-1}=(-1)^{n-1}\operatorname{tr}A$ |
| « Trouver les valeurs propres » | **Th. 4.8** | Racines de $p_A$ ; contrôle par $\sum\lambda_i=\operatorname{tr}A$ et $\prod\lambda_i=\det A$ |
| « Trouver les vecteurs propres / l'espace propre » | **Déf. 4.10** | Résoudre $(A-\lambda I)x=0$ ; $E_\lambda=\ker(A-\lambda I)$ |
| « $A$ est-elle défective ? » | **Déf. 4.13** | Comparer mult. **géométrique** et **algébrique** de chaque $\lambda_i$ ; défective si une géométrique est **strictement inférieure** |
| « $A$ est-elle diagonalisable ? » | **Th. 4.20 / 4.21** | Oui $\iff$ les vecteurs propres forment une base. **$A$ symétrique $\Rightarrow$ TOUJOURS oui** |
| « Diagonaliser $A$ » | **Ex. 4.11** | 1. vp et vecteurs propres 2. vérifier l'existence 3. $P=[p_1,\dots,p_n]$, $D=\operatorname{diag}(\lambda_i)$ ; contrôle $AP=PD$ |
| « Calculer $A^k$ » | **§4.4** | $A^k=PD^kP^{-1}$ — élever **seulement la diagonale** à la puissance $k$ |
| « Décomposition de Cholesky de $A$ » | **Th. 4.18** | Vérifier symétrique **et** définie positive, puis appliquer les motifs $l_{ii}$ et $l_{ij}$ ; contrôle $LL^\top=A$ |
| « Calculer la SVD » | **Ex. 4.13** | 1. $V$ = base propre de $A^\top A$ 2. $\sigma_i=\sqrt{\lambda_i}$, $\Sigma$ **de la taille de $A$** 3. $u_i=Av_i/\sigma_i$ |
| « Meilleure approximation de rang $k$ » | **Eckart-Young** | $A^{(k)}=\sum_{i\leqslant k}\sigma_iu_iv_i^\top$ ; erreur $=\sigma_{k+1}$ |
| « Norme spectrale de $A$ » | **Th. 4.24** | $\lVert A\rVert_2=\sigma_1$ |
| « Quel est le taux de compression ? » | **§4.6** | $k(m+n+1)$ nombres contre $mn$ |

## Comment résoudre : les cinq méthodes pas-à-pas

**Méthode A — Déterminant d'une matrice $n\times n$.**

1. Si triangulaire : **produit des diagonaux**. Fin.
2. Si $n\leqslant3$ : formule directe / Sarrus.
3. Sinon : chercher la **ligne ou colonne avec le plus de zéros**, développer par Laplace le long de celle-ci.
4. Alternative : Gauss jusqu'à forme triangulaire, en **comptant les échanges** (chacun change le signe) et les **mises à l'échelle** (chacune multiplie).
5. Contrôle : $\det(A^\top)=\det(A)$.

**Méthode B — Diagonaliser une matrice.**

1. $p_A(\lambda)=\det(A-\lambda I)$ ; factoriser.
2. Racines $\Rightarrow$ valeurs propres avec leurs **multiplicités algébriques**.
3. Pour chaque $\lambda_i$ : $E_{\lambda_i}=\ker(A-\lambda_iI)$ par Gauss ; noter la **multiplicité géométrique**.
4. **Test d'existence** : $\sum$ des multiplicités géométriques $=n$ ? Si non, **défective**, non diagonalisable.
5. $P=[p_1,\dots,p_n]$ (colonnes = vecteurs propres, **dans le même ordre** que $D$), $D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$.
6. Contrôles : $AP=PD$ ; $\prod\lambda_i=\det A$ ; $\sum\lambda_i=\operatorname{tr}A$.
7. Si $A$ **symétrique** : normaliser (et Gram-Schmidter les vecteurs d'un même espace propre) pour obtenir $P$ orthogonale et $A=PDP^\top$.

**Méthode C — Cholesky.**

1. Vérifier $A=A^\top$ et $A$ définie positive.
2. $l_{11}=\sqrt{a_{11}}$, puis toute la **première colonne** : $l_{i1}=a_{i1}/l_{11}$.
3. $l_{22}=\sqrt{a_{22}-l_{21}^2}$, puis la deuxième colonne : $l_{i2}=(a_{i2}-l_{i1}l_{21})/l_{22}$.
4. Répéter : $l_{jj}=\sqrt{a_{jj}-\sum_{k<j}l_{jk}^2}$ et $l_{ij}=\big(a_{ij}-\sum_{k<j}l_{ik}l_{jk}\big)/l_{jj}$.
5. Contrôle : $LL^\top=A$ ; un $l_{jj}$ **imaginaire** signale que $A$ n'est pas définie positive.

**Méthode D — SVD à la main.**

1. Calculer $A^\top A$ (taille $n\times n$).
2. Ses valeurs propres $\lambda_i\geqslant0$ ; ses vecteurs propres orthonormés forment **$V$**.
3. $\sigma_i=\sqrt{\lambda_i}$, triées **décroissantes**. Construire $\Sigma$ **de la taille de $A$**, avec remplissage par des zéros.
4. Pour $i\leqslant r$ : $u_i=Av_i/\sigma_i$.
5. Si $r<m$, compléter $U$ en une ONB de $\mathbb R^m$ (Gram-Schmidt).
6. Contrôles : $U^\top U=I$, $V^\top V=I$, $U\Sigma V^\top=A$, $\lVert Av_i\rVert=\sigma_i$.
7. **Raccourci** : si $m<n$, il est plus court de partir de $AA^\top$.

**Méthode E — Approximation de rang faible.**

1. SVD de $A$.
2. $A^{(k)}=\sum_{i=1}^{k}\sigma_iu_iv_i^\top$ — chaque terme est un **produit extérieur** $m\times n$ de rang 1.
3. Erreur $=\sigma_{k+1}$ (Eckart-Young).
4. Choix de $k$ : regarder la **décroissance du spectre** ($\sigma_{k+1}/\sigma_1$).
5. Coût de stockage : $k(m+n+1)$ contre $mn$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Calculer un déterminant de matrice non carrée | Le déterminant n'est défini **QUE pour les matrices carrées** |
| Confondre $\|A\|$ et la valeur absolue | $\|A\|=\det(A)$ peut être **négatif** — le livre le signale explicitement |
| Étendre Sarrus au-delà de $3\times3$ | **Faux**. Utiliser Laplace ou Gauss |
| Écrire $\det(\lambda A)=\lambda\det(A)$ | C'est $\det(\lambda A)=\lambda^n\det(A)$ |
| Écrire $\det(A+B)=\det A+\det B$ | Faux. Seul $\det(AB)=\det(A)\det(B)$ est vrai |
| Oublier le signe $(-1)^{k+j}$ dans Laplace | Le **cofacteur** porte ce signe, pas le **mineur** |
| Oublier que l'échange de deux lignes change le signe | Erreur fatale quand on calcule un déterminant par Gauss |
| Croire $\operatorname{tr}(ABC)=\operatorname{tr}(ACB)$ | Seules les permutations **CYCLIQUES** sont permises : $\operatorname{tr}(ABC)=\operatorname{tr}(BCA)=\operatorname{tr}(CAB)$ |
| Accepter $x=0$ comme vecteur propre | La définition 4.6 exige $x\in\mathbb R^n\setminus\{0\}$ |
| Croire que $A$ et $A^\top$ ont les mêmes vecteurs propres | Elles ont les mêmes **valeurs propres**, pas nécessairement les mêmes vecteurs |
| Confondre multiplicité algébrique et géométrique | $1\leqslant$ géométrique $\leqslant$ algébrique. Exemple 4.6 : algébrique 2, géométrique **1** |
| Croire qu'une matrice inversible est diagonalisable | **Non** : une matrice de **rotation** est inversible mais pas diagonalisable dans $\mathbb R$ |
| Croire qu'une matrice non diagonalisable est singulière | Idem : $\begin{bmatrix}2&1\\0&2\end{bmatrix}$ a $\det=4\neq0$ et est **défective** |
| Exiger $n$ valeurs propres **distinctes** pour diagonaliser | Il suffit que les vecteurs propres forment **une base** — l'identité a une seule valeur propre et est diagonale |
| Mélanger l'ordre des colonnes de $P$ et de $D$ | La colonne $i$ de $P$ doit être le vecteur propre de $\lambda_i$, **la $i$-ème entrée de $D$** |
| Appliquer Cholesky à une matrice non définie positive | Le théorème 4.18 exige symétrique **ET** définie positive ; sinon on obtient une racine d'un nombre négatif |
| Écrire $A=L^\top L$ | C'est $A=LL^\top$ avec $L$ **triangulaire INFÉRIEURE** |
| Croire que $\Sigma$ est carrée | Dans la SVD **complète**, $\Sigma$ a **la même taille que $A$**, avec remplissage par des zéros |
| Croire que $U$ et $V$ sont inverses l'une de l'autre | Elles agissent dans des **espaces différents** ($\mathbb R^m$ et $\mathbb R^n$) |
| Croire que la SVD n'existe que pour certaines matrices | Elle **EXISTE TOUJOURS**, pour **toute** matrice $m\times n$ |
| Accepter des $\sigma_i$ négatives | Les valeurs singulières sont **toujours $\geqslant0$** — ce sont des racines carrées |
| Prendre $\sigma_i=\lambda_i$ | $\sigma_i=\sqrt{\lambda_i}$, où $\lambda_i$ est valeur propre de $A^\top A$ |
| Calculer la SVD numériquement via $A^\top A$ | Le livre l'écrit : **mauvais comportement numérique**. Les bibliothèques ne le font pas |
| Croire que l'erreur de $A^{(k)}$ est $\sigma_k$ | C'est $\sigma_{k+1}$ — **la première valeur singulière ABANDONNÉE** |
| Oublier que $A^{(k)}$ est **optimale** | Eckart-Young : **aucune** matrice de rang $k$ ne fait mieux en norme spectrale |
| Croire que « normale » implique « symétrique » | L'inverse : symétrique $\Rightarrow$ normale. Une matrice de rotation est normale sans être symétrique |

## 📌 Ultimate Review

```
═════════════ LES DIX FORMULES À SAVOIR SANS HÉSITER ═════════════
  1.  det(A) ≠ 0  ⟺  rk(A) = n  ⟺  A inversible          (Th. 4.1 / 4.3)
  2.  LAPLACE   det(A) = Σ_k (−1)^(k+j) a_kj det(A_k,j)
  3.  det(AB) = det(A)det(B)   det(Aᵀ) = det(A)   det(λA) = λⁿ det(A)
  4.  tr(AB) = tr(BA)          tr(S⁻¹AS) = tr(A)      ← invariance
  5.  pA(λ) := det(A − λI)     c0 = det A     c_{n−1} = (−1)^(n−1) tr A
  6.  Ax = λx ,  x ≠ 0         Eλ = ker(A − λI)
  7.  det A = Π λi             tr A = Σ λi          (Th. 4.16 / 4.17)
  8.  CHOLESKY  A = LLᵀ  ,  det A = Π lii²
  9.  EIGEN     A = P D P⁻¹  ,  A^k = P D^k P⁻¹  ; A sym ⟹ A = P D Pᵀ
 10.  SVD       A = U Σ Vᵀ  ,  A vi = σi ui  ,  σi = √λi(AᵀA)
      A(k) = Σ_{i≤k} σi ui viᵀ    ‖A‖2 = σ1    ‖A − A(k)‖2 = σ_{k+1}
══════════════════════════════════════════════════════════════════
```

**Les trois invariants d'une application linéaire** (indépendants de la base choisie) :

$$\boxed{\;\det\qquad\operatorname{tr}\qquad\text{le SPECTRE}\;}$$

**Le tableau des multiplicités :**

|  | Définition | Valeurs possibles |
|---|---|---|
| **Algébrique** | Nombre de fois que $\lambda_i$ est racine de $p_A$ | $\geqslant1$ |
| **Géométrique** | $\dim E_{\lambda_i}$ = nombre de vecteurs propres indépendants | $1\leqslant\text{géo}\leqslant\text{alg}$ |
| **Défective** | Somme des géométriques $<n$ | Non diagonalisable |

**L'arbre de décision « quelle décomposition utiliser ? » :**

| Situation | Décomposition |
|---|---|
| $A$ **non carrée** | **SVD** — la seule option |
| $A$ carrée **défective** | SVD (ou forme normale de Jordan, hors cadre) |
| $A$ carrée **non défective** | **Eigendécomposition** $A=PDP^{-1}$ |
| $A$ **symétrique** | Eigendécomposition **orthogonale** $A=PDP^\top$ (= sa SVD) |
| $A$ **symétrique définie positive** | **Cholesky** $A=LL^\top$ (la plus efficace numériquement) |
| Il faut **compresser / réduire le rang** | **SVD tronquée** $A^{(k)}$ (optimale par Eckart-Young) |

**Ce que chaque décomposition coûte et rapporte :**

| Décomposition | Existe pour | Ce qu'elle donne |
|---|---|---|
| **Cholesky** | Symétriques définies positives | $\det$ facile, échantillonnage gaussien, transformations de variables aléatoires |
| **Eigen** | Carrées non défectives | Puissances $A^k$, $\det$, interprétation en directions étirées |
| **SVD** | **TOUTES** | Rang, norme spectrale, pseudo-inverse, meilleure approximation de rang faible |

**Où chaque notion resservira dans le livre :**

| Notion du ch. 4 | Suite |
|---|---|
| Matrices symétriques définies positives, Cholesky | **Gaussienne multivariée** (§6.5), auto-encodeurs variationnels |
| Eigendécomposition, théorème spectral | **ACP** (ch. 10), **estimation de densité** (ch. 11) |
| SVD, approximation de rang faible | **Réduction de dimension** (ch. 10) |
| Déterminant | Changement de variables, **jacobien** (ch. 6) |
| Trace, invariance cyclique | Calcul de gradients matriciels (ch. 5) |

## 🧠 Active Recall

**Déterminant**

1. Pour quelles matrices le déterminant est-il défini ?
2. Énoncer le théorème 4.1 et le théorème 4.3.
3. Écrire la formule $2\times2$ et la règle de Sarrus.
4. Que vaut le déterminant d'une matrice triangulaire ?
5. Quelle est l'interprétation géométrique de $|\det(A)|$ ? Et de son **signe** ?
6. Que vaut $|\det[r,g,b]|$ dans l'exemple 4.2 ?
7. Énoncer le développement de Laplace. Que sont un mineur et un cofacteur ?
8. Donner les sept propriétés du déterminant.
9. Comment Gauss permet-il de calculer un déterminant ?
10. Pourquoi le livre dit-il que le déterminant est aujourd'hui surtout **théorique** ?

**Trace et polynôme caractéristique** 11. Définir la trace. Donner ses quatre propriétés. 12. Qu'est-ce que l'invariance cyclique ? Que vaut $\operatorname{tr}(xy^\top)$ ? 13. Pourquoi la trace d'une application linéaire est-elle indépendante de la base ? 14. Écrire le polynôme caractéristique. Que valent $c_0$ et $c_{n-1}$ ?

**Valeurs propres** 15. Écrire l'équation aux valeurs propres. Quelle contrainte pèse sur $x$ ? 16. Donner les quatre énoncés équivalents à « $\lambda$ est valeur propre ». 17. Distinguer colinéaire et codirigé. 18. Pourquoi les vecteurs propres ne sont-ils pas uniques ? 19. Que sont l'espace propre et le spectre ? Comment $E_\lambda$ s'écrit-il ? 20. Quelle est l'interprétation géométrique d'une valeur propre ? D'une valeur propre négative ? 21. Quel est le spectre de $I_n$ ? Quelle est la dimension de son espace propre ? 22. Détailler les trois étapes de l'exemple 4.5. 23. Distinguer multiplicité algébrique et géométrique. Quelle inégalité les relie ? 24. Donner l'exemple 4.6 et ses deux multiplicités. 25. Qu'est-ce qu'une matrice défective ? Peut-elle avoir $n$ valeurs propres distinctes ? 26. Énoncer le théorème 4.12. 27. Que signale un déterminant nul dans la figure 4.4 ? Des valeurs propres complexes ?

**Théorème spectral** 28. Énoncer le théorème 4.14 et sa preuve en deux lignes. 29. Énoncer le théorème spectral. Que garantit-il exactement ? 30. Dans l'exemple 4.8, quel est le problème et comment le livre le résout-il ? 31. Pourquoi peut-on appliquer Gram-Schmidt à l'intérieur d'un espace propre ? 32. Énoncer les théorèmes 4.16 et 4.17 et leur intuition géométrique. 33. Expliquer le PageRank en termes de valeur propre.

**Cholesky** 34. Énoncer le théorème 4.18. Quelles sont les trois conditions sur $L$ ? 35. $L$ est-elle unique ? 36. Écrire les motifs pour $l_{11}$, $l_{22}$, $l_{33}$ et pour $l_{21}$, $l_{31}$, $l_{32}$. 37. Citer les trois usages en apprentissage automatique. 38. Comment Cholesky donne-t-il le déterminant ?

**Eigendécomposition** 39. Que permettent de calculer rapidement les matrices diagonales ? 40. Définir « diagonalisable ». 41. Montrer que $AP=PD$ équivaut à « les $p_i$ sont vecteurs propres ». 42. Énoncer le théorème 4.20 et le théorème 4.21. 43. Décrire les trois temps de l'intuition géométrique (figure 4.7). 44. Détailler les trois étapes de l'exemple 4.11. 45. Écrire $A^k$ et $\det(A)$ via l'eigendécomposition.

**SVD** 46. Énoncer le théorème 4.22. Quelles matrices sont orthogonales ? 47. Quelle est la taille de $\Sigma$ ? Pourquoi ? 48. Quelle matrice de la SVD est unique ? 49. Décrire les trois opérations géométriques de la SVD. 50. Quelle est la différence essentielle avec l'eigendécomposition ? 51. Comment se construisent $V$, puis $\Sigma$, puis $U$ ? 52. Écrire l'équation singulière. 53. Détailler les trois étapes de l'exemple 4.13. 54. Donner les trois liens entre SVD et eigendécomposition. 55. Quand les deux coïncident-elles ? 56. Distinguer SVD complète, réduite et tronquée. 57. Quelles hypothèses fait la SVD dans l'exemple des notes de films ?

**Approximation** 58. Écrire $A$ comme somme de matrices de rang 1. 59. Écrire $A^{(k)}$. Quel est son rang ? 60. Quel est le taux de compression de l'exemple de Stonehenge ? 61. Définir la norme spectrale. Que vaut-elle ? 62. Énoncer le théorème d'Eckart-Young et son interprétation. 63. Pourquoi $\lVert A-A^{(k)}\rVert_2=\sigma_{k+1}$ ?

**Phylogénie** 64. Qu'est-ce qu'une matrice normale ? orthogonale ? 65. « Non singulière » et « non défective » sont-ils synonymes ? Donner le contre-exemple du livre. 66. Les matrices diagonales forment-elles un groupe ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le déterminant est défini pour quelles matrices ? | **CARRÉES uniquement** |
| $\det(A)\neq0$ équivaut à ? | $\operatorname{rk}(A)=n$, c'est-à-dire **$A$ inversible** (Th. 4.1 / 4.3) |
| Formule $2\times2$ ? | $a_{11}a_{22}-a_{12}a_{21}$ |
| Règle de Sarrus ? | $a_{11}a_{22}a_{33}+a_{21}a_{32}a_{13}+a_{31}a_{12}a_{23}-a_{31}a_{22}a_{13}-a_{11}a_{32}a_{23}-a_{21}a_{12}a_{33}$ |
| S'étend-elle à $4\times4$ ? | **NON** |
| Déterminant d'une triangulaire ? | Le **produit des éléments diagonaux** |
| Triangulaire supérieure ? | $T_{ij}=0$ pour $i>j$ — zéros **sous** la diagonale |
| Interprétation géométrique de $\|\det A\|$ ? | Le **VOLUME** du parallélépipède engendré par les **COLONNES** |
| Interprétation du signe ? | L'**ORIENTATION** relativement à la base canonique |
| $\|\det\|$ de l'exemple 4.2 ? | $186$ |
| Si les colonnes sont dépendantes ? | Le volume, donc le déterminant, vaut **$0$** |
| Développement de Laplace ? | $\det(A)=\sum_{k}(-1)^{k+j}a_{kj}\det(A_{k,j})$ (colonne $j$) ou selon la ligne |
| Qu'est-ce que $A_{k,j}$ ? | La sous-matrice obtenue en **supprimant la ligne $k$ et la colonne $j$** |
| Mineur contre cofacteur ? | Mineur $=\det(A_{k,j})$ · cofacteur $=(-1)^{k+j}\det(A_{k,j})$ |
| $\det(AB)$ ? | $\det(A)\det(B)$ |
| $\det(A^\top)$ ? | $\det(A)$ — **invariant par transposition** |
| $\det(A^{-1})$ ? | $1/\det(A)$ |
| $\det(\lambda A)$ ? | $\lambda^n\det(A)$ |
| Effet d'un échange de lignes ? | **Change le SIGNE** |
| Effet d'ajouter un multiple d'une ligne à une autre ? | **Aucun** |
| Matrices semblables et déterminant ? | **Même déterminant** — invariant par changement de base |
| Définition de la trace ? | $\operatorname{tr}(A)=\sum_i a_{ii}$ |
| $\operatorname{tr}(AB)$ ? | $\operatorname{tr}(BA)$ |
| Invariance cyclique ? | $\operatorname{tr}(AKL)=\operatorname{tr}(KLA)$ |
| $\operatorname{tr}(xy^\top)$ ? | $y^\top x\in\mathbb R$ |
| La trace dépend-elle de la base ? | **NON** : $\operatorname{tr}(S^{-1}AS)=\operatorname{tr}(A)$ |
| Combien de fonctions vérifient les 4 propriétés de la trace ? | **Une seule** — la trace |
| Polynôme caractéristique ? | $p_A(\lambda):=\det(A-\lambda I)$ |
| Coefficient dominant ? | $(-1)^n$ |
| $c_0$ ? | $\det(A)$ |
| $c_{n-1}$ ? | $(-1)^{n-1}\operatorname{tr}(A)$ |
| Équation aux valeurs propres ? | $Ax=\lambda x$ avec **$x\neq0$** |
| Que signifie « eigen » ? | Allemand : « **caractéristique** », « **propre** », « **à soi** » |
| Les quatre équivalences ? | $\lambda$ vp $\iff\exists x\neq0:(A-\lambda I)x=0\iff\operatorname{rk}(A-\lambda I)<n\iff\det(A-\lambda I)=0$ |
| Colinéaire ? | Même direction **OU** direction opposée |
| Codirigé ? | **Même** direction seulement |
| Les vecteurs propres sont-ils uniques ? | **NON** — tout multiple $cx$, $c\neq0$, en est un |
| Espace propre $E_\lambda$ ? | $\ker(A-\lambda I)$ |
| Spectre ? | L'**ensemble de toutes les valeurs propres** |
| Interprétation géométrique de $\lambda$ ? | Le **FACTEUR D'ÉTIREMENT** de la direction propre |
| Si $\lambda<0$ ? | La direction de l'étirement est **RETOURNÉE** |
| Spectre de $I_n$ ? | Une seule valeur propre $\lambda=1$, de multiplicité $n$ ; $\dim E_1=n$ |
| $A$ et $A^\top$ ? | **Mêmes valeurs propres**, pas forcément les mêmes vecteurs |
| Matrices semblables et spectre ? | **Mêmes valeurs propres** |
| Valeurs propres d'une matrice SDP ? | **Réelles ET positives** |
| Valeurs propres de l'exemple 4.5 ? | $\lambda_1=2$, $\lambda_2=5$, avec $E_5=\operatorname{span}[[2,1]^\top]$ et $E_2=\operatorname{span}[[1,-1]^\top]$ |
| Multiplicité algébrique ? | Le nombre de fois que la racine apparaît dans $p_A$ |
| Multiplicité géométrique ? | $\dim E_{\lambda_i}$ = nombre de vecteurs propres **indépendants** |
| L'inégalité entre les deux ? | $1\leqslant$ **géométrique** $\leqslant$ **algébrique** |
| L'exemple 4.6 ? | $\begin{bmatrix}2&1\\0&2\end{bmatrix}$ : algébrique **2**, géométrique **1** |
| Matrice défective ? | Moins de $n$ vecteurs propres **linéairement indépendants** |
| Une défective peut-elle avoir $n$ vp distinctes ? | **NON** (Th. 4.12) |
| Théorème 4.12 ? | $n$ valeurs propres **distinctes** $\Rightarrow$ vecteurs propres **indépendants** |
| $\det=1$ dans la figure 4.4 signifie ? | **Aire préservée** |
| $\det=0$ signifie ? | **Effondrement** dimensionnel ; $0$ est valeur propre |
| Valeurs propres complexes ? | Une **ROTATION** — aucune direction réelle simplement étirée |
| Théorème 4.14 ? | $S:=A^\top A$ est **toujours** symétrique semi-définie positive |
| Quand $A^\top A$ est-elle définie positive ? | Si $\operatorname{rk}(A)=n$ |
| Théorème spectral ? | $A$ **symétrique** $\Rightarrow$ **ONB de vecteurs propres**, valeurs propres **RÉELLES** |
| Son implication ? | $A=PDP^\top$ avec $P$ **orthogonale** |
| Le problème de l'exemple 4.8 ? | Les deux vecteurs propres de $E_1$ ne sont **pas orthogonaux** ($x_1^\top x_2=1$) |
| La solution ? | **Gram-Schmidt à l'intérieur de l'espace propre** — toute combinaison reste vecteur propre |
| Théorème 4.16 ? | $\det(A)=\prod_i\lambda_i$ |
| Théorème 4.17 ? | $\operatorname{tr}(A)=\sum_i\lambda_i$ |
| L'intuition géométrique ? | Aire du carré unité $\times\|\lambda_1\lambda_2\|$ ; périmètre $\times$ selon $\|\lambda_1\|+\|\lambda_2\|$ |
| PageRank ? | Le vecteur propre de **valeur propre maximale** ; $Ax_*=x_*$, donc $\lambda=1$ |
| Ses inventeurs ? | **Larry Page et Sergey Brin**, Stanford, **1996** |
| Théorème de Cholesky ? | $A$ symétrique **définie positive** $\Rightarrow A=LL^\top$, $L$ triangulaire **inférieure**, diagonale **positive** |
| $L$ est-elle unique ? | **OUI** |
| Le motif diagonal ? | $l_{jj}=\sqrt{a_{jj}-\sum_{k<j}l_{jk}^2}$ |
| Le motif sous-diagonal ? | $l_{ij}=\big(a_{ij}-\sum_{k<j}l_{ik}l_{jk}\big)/l_{jj}$ |
| $\det(A)$ via Cholesky ? | $\prod_i l_{ii}^2$ |
| Les trois usages ML ? | **Échantillonner une gaussienne** · transformer des **variables aléatoires** (VAE) · **déterminants efficaces** |
| Ce que permet une matrice diagonale ? | $\det$ = produit · $D^k$ élément par élément · $D^{-1}$ = réciproques |
| Diagonalisable ? | Semblable à une diagonale : $\exists P$ inversible avec $D=P^{-1}AP$ |
| Théorème 4.20 ? | $A=PDP^{-1}$ **si et seulement si** les vecteurs propres forment une **base** |
| Que contient $P$ ? | Les **$n$ vecteurs propres**, en colonnes |
| Théorème 4.21 ? | Une matrice **symétrique** peut **TOUJOURS** être diagonalisée |
| Et alors $P$ est ? | **Orthogonale**, donc $D=P^\top AP$ |
| Le cas défectif ? | La **forme normale de Jordan** (hors cadre du livre) |
| Les trois temps géométriques ? | $P^{-1}$ **change de base** vers la base propre · $D$ **met à l'échelle** · $P$ **revient** |
| Valeurs propres de l'exemple 4.11 ? | $\lambda_1=\tfrac72$, $\lambda_2=\tfrac32$, avec $p_1=\tfrac{1}{\sqrt2}[1,-1]^\top$, $p_2=\tfrac{1}{\sqrt2}[1,1]^\top$ |
| $A^k$ ? | $PD^kP^{-1}$ |
| $\det(A)$ via l'eigendécomposition ? | $\prod_i d_{ii}$ — les $\det(P)$ **se compensent** |
| Théorème de la SVD ? | $A=U\Sigma V^\top$, $U$ et $V$ **orthogonales**, $\Sigma_{ii}=\sigma_i\geqslant0$ |
| Pour quelles matrices existe-t-elle ? | **TOUTES**, y compris rectangulaires — le « théorème fondamental de l'algèbre linéaire » |
| Taille de $\Sigma$ ? | **La même que $A$**, avec remplissage par des zéros |
| Quelle matrice est unique ? | **$\Sigma$** |
| Convention d'ordre ? | $\sigma_1\geqslant\sigma_2\geqslant\dots\geqslant\sigma_r\geqslant0$ |
| Les trois opérations ? | $V^\top$ change de base dans le **domaine** · $\Sigma$ **met à l'échelle et change de dimension** · $U$ change de base dans le **codomaine** |
| La différence essentielle avec l'eigendécomposition ? | La SVD change de base dans **DEUX espaces différents**, liés par $\Sigma$ |
| D'où viennent les $v_i$ ? | Ce sont les **vecteurs propres de $A^\top A$** |
| D'où viennent les $u_i$ ? | Ce sont les **vecteurs propres de $AA^\top$** |
| Relation entre $\sigma_i$ et $\lambda_i$ ? | $\sigma_i=\sqrt{\lambda_i}$ |
| Équation singulière ? | $Av_i=\sigma_iu_i$ pour $i=1,\dots,r$ |
| Formule pour $u_i$ ? | $u_i=\dfrac{Av_i}{\lVert Av_i\rVert}=\dfrac{1}{\sigma_i}Av_i$ |
| SVD de l'exemple 4.13 ? | $\sigma_1=\sqrt6$, $\sigma_2=1$ ; $U=\tfrac{1}{\sqrt5}\begin{bmatrix}1&2\\-2&1\end{bmatrix}$ |
| Doit-on calculer la SVD via $A^\top A$ ? | **NON** en pratique — mauvais comportement numérique |
| Quand SVD et eigendécomposition coïncident-elles ? | Pour les matrices **SYMÉTRIQUES** |
| SVD réduite ? | Pour $m\geqslant n$ : $U\in\mathbb R^{m\times n}$, $\Sigma\in\mathbb R^{n\times n}$ — $\Sigma$ **diagonale** |
| SVD tronquée ? | $U\in\mathbb R^{m\times r}$, $\Sigma\in\mathbb R^{r\times r}$, $V\in\mathbb R^{r\times n}$ |
| $A$ comme somme ? | $A=\sum_{i=1}^{r}\sigma_iu_iv_i^\top$ — somme de **matrices de rang 1** |
| Approximation de rang $k$ ? | $A^{(k)}=\sum_{i=1}^{k}\sigma_iu_iv_i^\top$, de rang exactement $k$ |
| Compression de Stonehenge ? | $16\,715$ nombres contre $2\,735\,120$, soit **$0{,}6\,\%$** |
| Coût de stockage de $A^{(k)}$ ? | $k(m+n+1)$ nombres |
| Norme spectrale ? | $\lVert A\rVert_2=\max_x\dfrac{\lVert Ax\rVert_2}{\lVert x\rVert_2}$ |
| Que vaut-elle ? | $\sigma_1$, la **plus grande valeur singulière** (Th. 4.24) |
| Ce qu'elle mesure ? | De combien un vecteur peut **au plus s'allonger** sous $A$ |
| Théorème d'Eckart-Young ? | $A^{(k)}=\operatorname{argmin}_{\operatorname{rk}(B)=k}\lVert A-B\rVert_2$ et $\lVert A-A^{(k)}\rVert_2=\sigma_{k+1}$ |
| Son année ? | **1936** |
| Pourquoi $\sigma_{k+1}$ ? | Car $A-A^{(k)}=\sum_{i>k}\sigma_iu_iv_i^\top$, dont la plus grande valeur singulière est $\sigma_{k+1}$ |
| Matrice normale ? | $A^\top A=AA^\top$ |
| Matrice orthogonale ? | $A^\top A=AA^\top=I$, donc $A^\top=A^{-1}$ |
| Valeurs propres d'une symétrique ? | Toutes **RÉELLES** |
| « Non singulière » = « non défective » ? | **NON** : une **rotation** est inversible mais non diagonalisable dans $\mathbb R$ |
| Les diagonales forment-elles un groupe ? | Seulement si **toutes** les entrées diagonales sont non nulles |
| Origine du mot « phylogénétique » ? | Grec : « **tribu** » et « **source** » |
