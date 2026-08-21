# Fiche 401 — Algèbre linéaire : systèmes, matrices, bases, applications linéaires

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 2 « Linear Algebra » (p. 17-69) |
| **Difficulté** | Intermédiaire — la fondation n° 1, réutilisée par les onze chapitres suivants |
| **Temps d'étude estimé** | 150 min |
| **Prérequis** | Fiche 400 — introduction et carte du livre |
| **Concepts clés** | Système linéaire, matrice, produit matriciel, inverse, transposée, élimination de Gauss, forme échelonnée (réduite), astuce du $-1$, groupe, $GL(n,\mathbb R)$, espace vectoriel, sous-espace, combinaison linéaire, indépendance linéaire, famille génératrice, span, base, rang, application linéaire, isomorphisme, coordonnées, matrice de transformation, changement de base, équivalence, similitude, image, noyau, théorème du rang, sous-espace affine, hyperplan, application affine |
| **Poids à l'examen** | L'**élimination de Gauss** (REF/RREF, pivots, variables libres) · le triptyque **solution particulière + noyau = solution générale** · l'**astuce du $-1$** · le **rang** et ses sept propriétés · la **matrice de transformation** $A_\Phi$ et le **changement de base** $\tilde A_\Phi=T^{-1}A_\Phi S$ · le **théorème du rang** $\dim\ker\Phi+\dim\operatorname{Im}\Phi=\dim V$. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : de « résoudre un système » à « comprendre les applications linéaires »

  §2.1 SYSTÈME LINÉAIRE            a11x1+...+a1nxn = b1        0, 1 ou ∞ solutions
                                    ...                        (jamais 2, jamais 17)
  §2.2 MATRICES                     Ax = b            forme compacte
        + · inverse · transposée · symétrie · scalaire
  §2.3 RÉSOUDRE                     Gauss ⇝ REF ⇝ RREF ⇝ astuce du −1
        solution GÉNÉRALE = solution PARTICULIÈRE + noyau (toutes les sol. de Ax=0)
  §2.4 ESPACE VECTORIEL             (V,+,·)  = groupe abélien + 4 axiomes
        groupe → GL(n,R) → espace vectoriel → SOUS-espace
  §2.5 INDÉPENDANCE LINÉAIRE        seule la combinaison TRIVIALE donne 0
        test : mettre en colonnes, Gauss, regarder les PIVOTS
  §2.6 BASE ET RANG                 base = génératrice MINIMALE = indép. MAXIMALE
        rk(A) = nb de colonnes indépendantes = nb de lignes indépendantes
  §2.7 APPLICATIONS LINÉAIRES       Φ(λx+ψy) = λΦ(x)+ψΦ(y)
        coordonnées → matrice AΦ → changement de base T⁻¹AΦS
        image = span des COLONNES ;  noyau = solutions de Ax=0
        THÉORÈME DU RANG  dim ker Φ + dim Im Φ = dim V
  §2.8 ESPACES AFFINES              L = x0 + U   (décalé de l'origine, PAS un sev)
        droite (dim 1) · plan (dim 2) · HYPERPLAN (dim n−1)

LES DEUX LECTURES D'UNE MATRICE  — à ne JAMAIS confondre —
  (a) une APPLICATION LINÉAIRE       (b) une COLLECTION DE VECTEURS mis en colonnes

LA CHAÎNE D'ÉQUIVALENCES POUR A ∈ R^(n×n)
  A régulière ⟺ rk(A) = n ⟺ ker(A) = {0} ⟺ colonnes indépendantes ⟺ A ∈ GL(n,R)
  ⟺ Ax = b a une solution UNIQUE pour tout b ⟺ RREF(A) = In
```

> **La phrase d'ouverture du chapitre.** *« Lorsqu'on formalise des concepts intuitifs, une approche courante consiste à construire un **ensemble d'objets (des symboles)** et un **ensemble de règles** pour les manipuler. C'est ce qu'on appelle une **algèbre**. »* Et la définition de travail du vecteur : *« des objets qu'on peut **additionner** entre eux et **multiplier par un scalaire**, et le résultat reste un objet du même type. »*

## 🔴 Concept 1 — Systèmes d'équations linéaires (§2.1)

### 1.1 Le problème général

$$a_{11}x_1+\dots+a_{1n}x_n=b_1$$

$$\vdots$$

$$a_{m1}x_1+\dots+a_{mn}x_n=b_m$$

avec $a_{ij}\in\mathbb R$ et $b_i\in\mathbb R$ **connus**, et $x_1,\dots,x_n$ **inconnus**. Toute solution est un $n$-uplet $(x_1,\dots,x_n)\in\mathbb R^n$ satisfaisant **les $m$ équations simultanément**.

> **Le mot d'ordre du livre.** *« Les systèmes d'équations linéaires jouent un **rôle central** en algèbre linéaire. **De nombreux problèmes peuvent être formulés comme des systèmes d'équations linéaires**, et l'algèbre linéaire nous donne les outils pour les résoudre. »*

### 1.2 Exemple 2.1 — le problème de production qui motive tout

Une entreprise produit des biens $N_1,\dots,N_n$ à partir de ressources $R_1,\dots,R_m$. Produire **une unité** du bien $N_j$ consomme $a_{ij}$ unités de la ressource $R_i$. On dispose de $b_i$ unités de $R_i$. On cherche un **plan de production optimal** : combien d'unités $x_j$ de chaque bien produire pour **épuiser exactement** les ressources ?

- Produire $x_j$ unités de $N_j$ consomme $a_{ij}x_j$ unités de $R_i$.
- Consommation totale de $R_i$ : $a_{i1}x_1+a_{i2}x_2+\dots+a_{in}x_n$.
- Plan optimal $\Rightarrow$ cette consommation vaut **exactement** $b_i$.

$$\boxed{\;a_{i1}x_1+a_{i2}x_2+\dots+a_{in}x_n=b_i\quad\text{pour } i=1,\dots,m\;}$$

> ⚠️ **Une contrainte que le système linéaire n'exprime pas** : les $x_j$ doivent être $\geqslant 0$ et entiers. Le système linéaire est un **modèle simplifié** — c'est exactement l'esprit du chapitre 1.

### 1.3 Exemple 2.2 — les trois cas, sur trois systèmes concrets

Le **même membre de gauche** avec trois membres de droite différents :

| Système | Manipulation | Résultat |
|---|---|---|
| $x_1+x_2+x_3=3$ ; $x_1-x_2+2x_3=2$ ; $2x_1+3x_3=1$ | $(1)+(2)$ donne $2x_1+3x_3=5$, en contradiction avec $(3)$ : $2x_1+3x_3=1$ | **AUCUNE solution** |
| $x_1+x_2+x_3=3$ ; $x_1-x_2+2x_3=2$ ; $x_2+x_3=2$ | $(1)+(2)$ donne $2x_1+3x_3=5$ ; avec $(1)$ et $(3)$ | **UNE solution** : $(1,1,1)$ |
| $x_1+x_2+x_3=3$ ; $x_1-x_2+2x_3=2$ ; $2x_1+3x_3=5$ | $(3)$ est redondante ; on pose $x_3=a$ libre | **INFINITÉ** de solutions |

La famille du troisième cas, écrite mot pour mot par le livre :

$$\left(\tfrac52-\tfrac32a,\;\; \tfrac12+\tfrac12a,\;\; a\right),\qquad a\in\mathbb R$$

<details><summary>Vérification directe de la famille à un paramètre</summary>

Avec $x_1=\frac52-\frac32a$, $x_2=\frac12+\frac12a$, $x_3=a$ :

- $x_1+x_2+x_3=\frac52-\frac32a+\frac12+\frac12a+a=3+(-\frac32+\frac12+1)a=3+0\cdot a=3$
- $x_1-x_2+2x_3=\frac52-\frac32a-\frac12-\frac12a+2a=2+(-\frac32-\frac12+2)a=2$
- $2x_1+3x_3=5-3a+3a=5$

Le coefficient de $a$ **s'annule identiquement** dans les trois équations : c'est **exactement** la définition d'un élément du noyau. On voit déjà en germe le découpage *solution particulière* ($a=0$ : $(\frac52,\frac12,0)$) $+$ *noyau* ($a\cdot(-\frac32,\frac12,1)$).

</details>

### 1.4 L'interprétation géométrique — pourquoi « 0, 1 ou infini » et rien d'autre

**Deux inconnues.** Chaque équation linéaire définit une **droite** de $\mathbb R^2$. Comme une solution doit satisfaire toutes les équations, l'ensemble solution est l'**intersection** de ces droites. Trois cas seulement :

| Configuration | Ensemble solution |
|---|---|
| Droites sécantes | **Un point** |
| Droites parallèles distinctes | **Vide** |
| Droites confondues | **Une droite entière** (infinité) |

Exemple du livre : $4x_1+4x_2=5$ et $2x_1-4x_2=1$ se coupent en

$$\boxed{(x_1,x_2)=\left(1,\;\tfrac14\right)}$$

<details><summary>Le calcul</summary>

Addition des deux équations : $6x_1=6\Rightarrow x_1=1$. Puis $4+4x_2=5\Rightarrow x_2=\frac14$. Contrôle dans la deuxième : $2\cdot1-4\cdot\frac14=2-1=1$ (RREF calculée : $\begin{bmatrix}1&0&1\\0&1&\frac14\end{bmatrix}$).

</details>

**Trois inconnues.** Chaque équation définit un **plan** de $\mathbb R^3$. L'intersection peut être un **plan**, une **droite**, un **point**, ou **vide**.

> **La règle générale, énoncée par le livre** : *« Pour un système d'équations linéaires réel, la solution est soit **aucune**, soit **exactement une**, soit **une infinité**. »* La régression linéaire (chapitre 9) résout le cas où **aucune** solution exacte n'existe.

## 🔴 Concept 2 — Les matrices (§2.2)

### 2.1 Définition et vectorisation

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.1 (Matrice).</span>

Avec $m,n\in\mathbb N$, une **matrice réelle $(m,n)$** est un tuple ordonné de $m\cdot n$ éléments $a_{ij}\in\mathbb R$, rangé en un schéma rectangulaire de $m$ **lignes** et $n$ **colonnes** :

</div>

$$A=\begin{bmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\ a_{21}&a_{22}&\cdots&a_{2n}\\ \vdots&\vdots&&\vdots\\ a_{m1}&a_{m2}&\cdots&a_{mn}\end{bmatrix}\in\mathbb R^{m\times n}$$

Convention : $(1,n)$ = **vecteur ligne**, $(m,1)$ = **vecteur colonne**.

> **Le point subtil.** $A\in\mathbb R^{m\times n}$ peut être représenté **de façon équivalente** par $a\in\mathbb R^{mn}$ en **empilant les $n$ colonnes** en un long vecteur. Ainsi $\mathbb R^{4\times2}$ correspond à $\mathbb R^{8}$. La justification profonde viendra du **théorème 2.17** : deux espaces de même dimension sont isomorphes.

### 2.2 Addition et produit

**Addition** (élément par élément, mêmes dimensions obligatoires) :

$$A+B:=\begin{bmatrix}a_{11}+b_{11}&\cdots&a_{1n}+b_{1n}\\ \vdots&&\vdots\\ a_{m1}+b_{m1}&\cdots&a_{mn}+b_{mn}\end{bmatrix}\in\mathbb R^{m\times n}$$

**Produit** — pour $A\in\mathbb R^{m\times n}$, $B\in\mathbb R^{n\times k}$, le produit $C=AB\in\mathbb R^{m\times k}$ a pour éléments

$$\boxed{\;c_{ij}=\sum_{l=1}^{n}a_{il}\,b_{lj},\qquad i=1,\dots,m,\quad j=1,\dots,k\;}$$

> ⚠️ **Ce n'est PAS un produit élément par élément.** Le produit élément par élément existe, s'appelle le **produit de Hadamard**, et n'est **pas** le produit matriciel. C'est la source d'erreur numéro un en programmation.

> **La règle des « dimensions voisines ».** Seules des matrices dont les dimensions **se touchent** peuvent être multipliées :
>
> $$\underbrace{A}_{n\times k}\ \underbrace{B}_{k\times m}=\underbrace{C}_{n\times m}$$
>
> $AB$ est défini **seulement si** le nombre de colonnes de $A$ est égal au nombre de lignes de $B$.

**Mnémonique du livre.** $c_{ij}$ est le produit de la **$i$-ème ligne** de $A$ par la **$j$-ème colonne** de $B$ — le « produit scalaire » de ces deux vecteurs (voir §3.2 pour le vrai produit scalaire).

**Exemple 2.3 — le produit n'est PAS commutatif.**

$$A=\begin{bmatrix}1&2&3\\3&2&1\end{bmatrix}\in\mathbb R^{2\times3},\qquad B=\begin{bmatrix}0&2\\1&-1\\0&1\end{bmatrix}\in\mathbb R^{3\times2}$$

$$AB=\begin{bmatrix}2&3\\2&5\end{bmatrix}\in\mathbb R^{2\times2},\qquad BA=\begin{bmatrix}6&4&2\\-2&0&2\\3&2&1\end{bmatrix}\in\mathbb R^{3\times3}$$

<details><summary>Recalcul intégral des deux produits</summary>

$AB$ : $(AB)_{11}=1\cdot0+2\cdot1+3\cdot0=2$ ; $(AB)_{12}=1\cdot2+2\cdot(-1)+3\cdot1=3$ ; $(AB)_{21}=3\cdot0+2\cdot1+1\cdot0=2$ ; $(AB)_{22}=3\cdot2+2\cdot(-1)+1\cdot1=5$.

$BA$ : ligne 1 de $B$ est $(0,2)$ donne $(0\cdot1+2\cdot3,\ 0\cdot2+2\cdot2,\ 0\cdot3+2\cdot1)=(6,4,2)$ ; ligne 2 est $(1,-1)$ donne $(1-3,\ 2-2,\ 3-1)=(-2,0,2)$ ; ligne 3 est $(0,1)$ donne $(3,2,1)$ Les deux résultats n'ont **même pas la même taille**.

</details>

> ⚠️ **Trois pièges d'un coup** : (i) $AB\neq BA$ en général ; (ii) même quand les deux produits existent, **les tailles diffèrent** ; (iii) « $AB$ existe » n'implique pas que $BA$ existe.

### 2.3 Matrice identité et propriétés algébriques

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.2 (Matrice identité).</span>

$I_n\in\mathbb R^{n\times n}$ contient des $1$ sur la diagonale et des $0$ partout ailleurs.

</div>

| Propriété | Énoncé | Réf. |
|---|---|---|
| **Associativité** | $\forall A\in\mathbb R^{m\times n},B\in\mathbb R^{n\times p},C\in\mathbb R^{p\times q}:\ (AB)C=A(BC)$ | (2.18) |
| **Distributivité** | $(A+B)C=AC+BC$ ; $A(C+D)=AC+AD$ | (2.19) |
| **Élément neutre** | $\forall A\in\mathbb R^{m\times n}:\ I_mA=AI_n=A$ | (2.20) |

> ⚠️ Dans (2.20), $I_m\neq I_n$ dès que $m\neq n$ : **l'identité de gauche et celle de droite ne sont pas la même matrice.**

### 2.4 Inverse

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.3 (Inverse).</span>

Pour $A\in\mathbb R^{n\times n}$ **carrée**, si $B\in\mathbb R^{n\times n}$ vérifie $AB=I_n=BA$, alors $B$ est l'**inverse** de $A$, notée $A^{-1}$.

</div>

**Vocabulaire.** Si $A^{-1}$ existe : $A$ est **régulière / inversible / non singulière**. Sinon : **singulière / non inversible**. Quand l'inverse existe, il est **unique**.

**Le cas $2\times2$, démontré.** Pour $A=\begin{bmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{bmatrix}$, on pose $A'=\begin{bmatrix}a_{22}&-a_{12}\\-a_{21}&a_{11}\end{bmatrix}$. Alors

$$AA'=\begin{bmatrix}a_{11}a_{22}-a_{12}a_{21}&0\\0&a_{11}a_{22}-a_{12}a_{21}\end{bmatrix}=(a_{11}a_{22}-a_{12}a_{21})\,I$$

$$\boxed{\;A^{-1}=\frac{1}{a_{11}a_{22}-a_{12}a_{21}}\begin{bmatrix}a_{22}&-a_{12}\\-a_{21}&a_{11}\end{bmatrix}\quad\text{si et seulement si}\quad a_{11}a_{22}-a_{12}a_{21}\neq0\;}$$

La quantité $a_{11}a_{22}-a_{12}a_{21}$ est le **déterminant** (chapitre 4), qui sert en général à tester l'inversibilité.

**Exemple 2.4.**

$$A=\begin{bmatrix}1&2&1\\4&4&5\\6&7&7\end{bmatrix},\qquad B=\begin{bmatrix}-7&-7&6\\2&1&-1\\4&5&-4\end{bmatrix},\qquad AB=I=BA$$

<details><summary>Contrôle de AB = I, ligne par ligne</summary>

Ligne 1 de $A$ égale $(1,2,1)$ : $1\cdot(-7)+2\cdot2+1\cdot4=-7+4+4=1$ ; $1\cdot(-7)+2\cdot1+1\cdot5=-7+2+5=0$ ; $1\cdot6+2\cdot(-1)+1\cdot(-4)=6-2-4=0$

Ligne 2 égale $(4,4,5)$ : $-28+8+20=0$ ; $-28+4+25=1$ ; $24-4-20=0$

Ligne 3 égale $(6,7,7)$ : $-42+14+28=0$ ; $-42+7+35=0$ ; $36-7-28=1$

</details>

### 2.5 Transposée et symétrie

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.4 (Transposée).</span>

Pour $A\in\mathbb R^{m\times n}$, la matrice $B\in\mathbb R^{n\times m}$ avec $b_{ij}=a_{ji}$ est la **transposée**, notée $A^\top$. En pratique : **les colonnes de $A$ deviennent les lignes de $A^\top$**.

</div>

**Les six propriétés du livre, mot pour mot :**

$$AA^{-1}=I=A^{-1}A$$

$$(AB)^{-1}=B^{-1}A^{-1}$$

$$(A+B)^{-1}\neq A^{-1}+B^{-1}$$

$$(A^\top)^\top=A$$

$$(AB)^\top=B^\top A^\top$$

$$(A+B)^\top=A^\top+B^\top$$

> ⚠️ **Le retournement de l'ordre.** $(AB)^{-1}=B^{-1}A^{-1}$ et $(AB)^\top=B^\top A^\top$ : **l'ordre s'inverse**. Écrire $A^{-1}B^{-1}$ est l'erreur classique.

> ⚠️ **L'inverse d'une somme.** Le livre donne même le contre-exemple scalaire, pour ancrer : $\dfrac{1}{2+4}=\dfrac16\neq\dfrac12+\dfrac14$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.5 (Matrice symétrique).</span>

$A\in\mathbb R^{n\times n}$ est **symétrique** si $A=A^\top$. Seules des matrices $(n,n)$ — dites **carrées** — peuvent l'être.

</div>

Si $A$ est inversible, $A^\top$ l'est aussi et $(A^{-1})^\top=(A^\top)^{-1}=:A^{-\top}$.

> ⚠️ **Somme oui, produit non.** La somme de deux matrices symétriques est **toujours** symétrique. Leur **produit** est toujours défini mais **généralement pas symétrique** :
>
> $$\begin{bmatrix}1&0\\0&0\end{bmatrix}\begin{bmatrix}1&1\\1&1\end{bmatrix}=\begin{bmatrix}1&1\\0&0\end{bmatrix}$$
>
> ⚠️ Les deux facteurs sont symétriques ; le produit ne l'est pas.

### 2.6 Multiplication par un scalaire

Pour $A\in\mathbb R^{m\times n}$ et $\lambda\in\mathbb R$ : $\lambda A=K$ avec $K_{ij}=\lambda\,a_{ij}$ — **$\lambda$ met à l'échelle chaque élément**.

| Loi | Énoncé |
|---|---|
| Associativité | $(\lambda\psi)C=\lambda(\psi C)$ |
| Déplacement du scalaire | $\lambda(BC)=(\lambda B)C=B(\lambda C)=(BC)\lambda$ |
| Transposée | $(\lambda C)^\top=C^\top\lambda^\top=C^\top\lambda=\lambda C^\top$ car $\lambda=\lambda^\top$ |
| Distributivité | $(\lambda+\psi)C=\lambda C+\psi C$ ; $\lambda(B+C)=\lambda B+\lambda C$ |

**Exemple 2.5.** Avec $C=\begin{bmatrix}1&2\\3&4\end{bmatrix}$ :

$$(\lambda+\psi)C=\begin{bmatrix}\lambda+\psi&2\lambda+2\psi\\3\lambda+3\psi&4\lambda+4\psi\end{bmatrix}=\begin{bmatrix}\lambda&2\lambda\\3\lambda&4\lambda\end{bmatrix}+\begin{bmatrix}\psi&2\psi\\3\psi&4\psi\end{bmatrix}=\lambda C+\psi C$$

### 2.7 L'écriture compacte $Ax=b$ — et sa lecture profonde

$$2x_1+3x_2+5x_3=1,\quad 4x_1-2x_2-7x_3=8,\quad 9x_1+5x_2-3x_3=2$$

devient

$$\begin{bmatrix}2&3&5\\4&-2&-7\\9&5&-3\end{bmatrix}\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix}=\begin{bmatrix}1\\8\\2\end{bmatrix}$$

> **La lecture qui change tout.** *« $x_1$ met à l'échelle la **première colonne**, $x_2$ la **deuxième**, $x_3$ la **troisième**. »* Donc **un système est l'écriture de $b$ comme combinaison linéaire des COLONNES de $A$** :
>
> $$Ax=x_1c_1+x_2c_2+\dots+x_nc_n$$
>
> Toute la §2.3 découle de ce point de vue.

## 🔴 Concept 3 — Résoudre $Ax=b$ (§2.3)

### 3.1 Solution particulière et solution générale

**Le système jouet (2.38)** — deux équations, quatre inconnues, donc *a priori* une infinité de solutions :

$$\begin{bmatrix}1&0&8&-4\\0&1&2&12\end{bmatrix}\begin{bmatrix}x_1\\x_2\\x_3\\x_4\end{bmatrix}=\begin{bmatrix}42\\8\end{bmatrix}$$

**Étape 1 — la solution particulière, par inspection.** Les deux premières colonnes sont $c_1=[1,0]^\top$ et $c_2=[0,1]^\top$ :

$$b=\begin{bmatrix}42\\8\end{bmatrix}=42\begin{bmatrix}1\\0\end{bmatrix}+8\begin{bmatrix}0\\1\end{bmatrix}\;\Longrightarrow\;x_{\text{part}}=[42,8,0,0]^\top$$

C'est la **solution particulière** (ou **solution spéciale**).

**Étape 2 — fabriquer $0$ de façon NON TRIVIALE.** Il faut exprimer les colonnes non triviales avec $c_1,c_2$. Troisième colonne :

$$\begin{bmatrix}8\\2\end{bmatrix}=8\begin{bmatrix}1\\0\end{bmatrix}+2\begin{bmatrix}0\\1\end{bmatrix}\;\Longrightarrow\;0=8c_1+2c_2-1c_3+0c_4\;\Longrightarrow\;(8,2,-1,0)$$

**Étape 3 — toute mise à l'échelle marche aussi.** Pour tout $\lambda_1\in\mathbb R$ : $\lambda_1(8c_1+2c_2-c_3)=0$.

**Étape 4 — même travail sur la quatrième colonne.**

$$\begin{bmatrix}-4\\12\end{bmatrix}=-4c_1+12c_2\;\Longrightarrow\;\lambda_2(-4c_1+12c_2-c_4)=0$$

**Étape 5 — la solution générale (2.43).**

$$\boxed{\;\left\{x\in\mathbb R^4:\;x=\begin{bmatrix}42\\8\\0\\0\end{bmatrix}+\lambda_1\begin{bmatrix}8\\2\\-1\\0\end{bmatrix}+\lambda_2\begin{bmatrix}-4\\12\\0\\-1\end{bmatrix},\ \lambda_1,\lambda_2\in\mathbb R\right\}\;}$$

> **La recette en trois pas, énoncée par le livre :**
>
> 1. Trouver **une** solution particulière de $Ax=b$.
> 2. Trouver **toutes** les solutions de $Ax=0$.
> 3. **Combiner** 1. et 2. pour obtenir la solution générale.

> ⚠️ *« Ni la solution générale ni la solution particulière ne sont uniques. »* L'**ensemble** solution, lui, l'est.

### 3.2 Les transformations élémentaires

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Les **transformations élémentaires** préservent l'ensemble solution tout en simplifiant le système :

1. **Échange** de deux équations (lignes).
2. **Multiplication** d'une équation (ligne) par une constante $\lambda\in\mathbb R\setminus\{0\}$.
3. **Addition** de deux équations (lignes).

</div>

> ⚠️ Le $\lambda\neq0$ n'est pas décoratif : multiplier une ligne par $0$ **détruit** de l'information et change l'ensemble solution.

**La matrice augmentée** $\big[\,A\mid b\,\big]$ — barre verticale séparant le membre de gauche du membre de droite — permet d'oublier les $x$ et de travailler sur les seuls nombres. Le symbole $\rightsquigarrow$ note une transformation élémentaire.

### 3.3 Exemple 2.6 — l'élimination de Gauss en entier

**Le système**, pour $a\in\mathbb R$ :

$$-2x_1+4x_2-2x_3-x_4+4x_5=-3$$

$$4x_1-8x_2+3x_3-3x_4+x_5=2$$

$$x_1-2x_2+x_3-x_4+x_5=0$$

$$x_1-2x_2-3x_4+4x_5=a$$

**Étape 1 — matrice augmentée :**

$$\left[\begin{array}{ccccc|c}-2&4&-2&-1&4&-3\\4&-8&3&-3&1&2\\1&-2&1&-1&1&0\\1&-2&0&-3&4&a\end{array}\right]$$

**Étape 2 — échanger $R_1$ et $R_3$** (pour amener un pivot $1$ en haut à gauche) :

$$\left[\begin{array}{ccccc|c}1&-2&1&-1&1&0\\4&-8&3&-3&1&2\\-2&4&-2&-1&4&-3\\1&-2&0&-3&4&a\end{array}\right]\begin{array}{l}\\ -4R_1\\ +2R_1\\ -R_1\end{array}$$

**Étape 3 — appliquer les trois opérations indiquées :**

$$\left[\begin{array}{ccccc|c}1&-2&1&-1&1&0\\0&0&-1&1&-3&2\\0&0&0&-3&6&-3\\0&0&-1&-2&3&a\end{array}\right]\begin{array}{l}\\ \\ \\ -R_2-R_3\end{array}$$

**Étape 4 — normaliser les pivots** ($R_2$ multipliée par $-1$, $R_3$ par $-\tfrac13$) :

$$\left[\begin{array}{ccccc|c}1&-2&1&-1&1&0\\0&0&1&-1&3&-2\\0&0&0&1&-2&1\\0&0&0&0&0&a+1\end{array}\right]$$

**Étape 5 — lire la condition de compatibilité.** La dernière ligne dit $0=a+1$.

$$\boxed{\;\text{Le système a une solution}\iff a=-1\;}$$

**Étape 6 — la solution particulière par les colonnes de pivot.** On cherche $\lambda_1,\lambda_2,\lambda_3$ avec

$$\lambda_1\begin{bmatrix}1\\0\\0\\0\end{bmatrix}+\lambda_2\begin{bmatrix}1\\1\\0\\0\end{bmatrix}+\lambda_3\begin{bmatrix}-1\\-1\\1\\0\end{bmatrix}=\begin{bmatrix}0\\-2\\1\\0\end{bmatrix}$$

**En partant de la DROITE** (la colonne de pivot la plus à droite) : $\lambda_3=1$, puis $\lambda_2=-1$, puis $\lambda_1=2$. En remettant $0$ pour les colonnes non pivots :

$$x_{\text{part}}=[2,\,0,\,-1,\,1,\,0]^\top$$

**Étape 7 — la solution générale (2.47) :**

$$\boxed{\;\left\{x\in\mathbb R^5:\;x=\begin{bmatrix}2\\0\\-1\\1\\0\end{bmatrix}+\lambda_1\begin{bmatrix}2\\1\\0\\0\\0\end{bmatrix}+\lambda_2\begin{bmatrix}2\\0\\-1\\2\\1\end{bmatrix},\ \lambda_1,\lambda_2\in\mathbb R\right\}\;}$$

<details><summary>Vérification indépendante (RREF exacte en fractions)</summary>

RREF de la matrice augmentée avec $a=-1$ :

$$\left[\begin{array}{ccccc|c}1&-2&0&0&-2&2\\0&0&1&0&1&-1\\0&0&0&1&-2&1\\0&0&0&0&0&0\end{array}\right]$$

Variables de base $x_1,x_3,x_4$ ; variables libres $x_2,x_5$. D'où $x_1=2+2x_2+2x_5$, $x_3=-1-x_5$, $x_4=1+2x_5$. En posant $(x_2,x_5)=(0,0)$ : $x_{\text{part}}=[2,0,-1,1,0]$. En posant $(x_2,x_5)=(1,0)$ puis $(0,1)$ : les deux vecteurs $[2,1,0,0,0]$ et $[2,0,-1,2,1]$. **Identique à (2.47).**

Contrôle direct : $A\,x_{\text{part}}$ donne $(-3,\,2,\,0,\,-1)$, c'est-à-dire $b$ avec $a=-1$ . Avec $a\neq-1$ la RREF de la matrice augmentée a un pivot **dans la colonne de $b$** — signature algébrique de l'incompatibilité.

</details>

### 3.4 Forme échelonnée (REF) et échelonnée réduite (RREF)

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarque (pivots et structure en escalier).</span>

Le **coefficient dominant** d'une ligne (premier nombre non nul en partant de la gauche) s'appelle le **pivot**, et il est **toujours strictement à droite** du pivot de la ligne au-dessus. D'où la structure en **escalier**.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.6 (Forme échelonnée en lignes, REF).</span>

Une matrice est en forme échelonnée si :

1. Toutes les lignes **entièrement nulles** sont **en bas** ; toutes les lignes ayant au moins un élément non nul sont au-dessus des lignes nulles.
2. En ne regardant que les lignes non nulles, le **premier nombre non nul en partant de la gauche** (le **pivot** ou **coefficient dominant**) est **toujours strictement à droite** du pivot de la ligne au-dessus.

</div>

> ⚠️ *« Dans d'autres textes, il est parfois exigé que le pivot vaille $1$. »* Chez Deisenroth et al., **ce n'est pas exigé** pour la REF ; ça l'est pour la RREF.

> **Variables de base et variables libres.** Les variables correspondant aux **pivots** sont les **variables de base** ; les autres sont les **variables libres**. Dans (2.45) : $x_1,x_3,x_4$ de base, $x_2,x_5$ libres.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (Forme échelonnée réduite, RREF).</span>

Un système est en forme échelonnée réduite (aussi *row-reduced echelon form*, *row canonical form*) si :

1. Il est en **forme échelonnée** ;
2. **Chaque pivot vaut $1$** ;
3. Le pivot est **le seul élément non nul de sa colonne**.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarque (Élimination de Gauss).</span>

*« L'élimination de Gauss est un algorithme qui effectue des transformations élémentaires pour amener un système d'équations linéaires en forme échelonnée réduite. »*

</div>

**Exemple 2.7 — une RREF, pivots en gras :**

$$A=\begin{bmatrix}\mathbf 1&3&0&0&3\\0&0&\mathbf 1&0&9\\0&0&0&\mathbf 1&-4\end{bmatrix}$$

**Exemple 2.8 — lire le noyau sur une RREF.** L'idée clé : exprimer les **colonnes non pivots** comme combinaisons des **colonnes de pivot**.

- Colonne 2 (non pivot) vaut $3\times$ colonne 1, donc $0=3c_1-c_2$, d'où $[3,-1,0,0,0]^\top$.
- Colonne 5 (non pivot) vaut $3\times$(1re colonne de pivot) $+9\times$(2e) $-4\times$(3e), c'est-à-dire $3c_1+9c_3-4c_4$, d'où $[3,0,9,-4,-1]^\top$.

$$\boxed{\;\left\{x\in\mathbb R^5:\;x=\lambda_1\begin{bmatrix}3\\-1\\0\\0\\0\end{bmatrix}+\lambda_2\begin{bmatrix}3\\0\\9\\-4\\-1\end{bmatrix},\ \lambda_1,\lambda_2\in\mathbb R\right\}\;}$$

<details><summary>Contrôle : les deux vecteurs annulent bien A</summary>

$A\,[3,-1,0,0,0]^\top$ : ligne 1 vaut $1\cdot3+3\cdot(-1)=0$ ; lignes 2 et 3 valent $0$

$A\,[3,0,9,-4,-1]^\top$ : ligne 1 vaut $3+0+0+0+3\cdot(-1)=0$ ; ligne 2 vaut $9+9\cdot(-1)=0$ ; ligne 3 vaut $-4+(-4)(-1)=0$

</details>

> ⚠️ **Le suivi des indices.** *« Il faut garder trace des indices des colonnes de pivot »* : la « 2e colonne de pivot » est la colonne 3 de $A$, pas la colonne 2. Écrire les coefficients aux mauvaises positions est l'erreur systématique.

### 3.5 L'astuce du $-1$ (§2.3.3)

Un procédé mécanique pour lire les solutions de $Ax=0$ avec $A\in\mathbb R^{k\times n}$ **en RREF sans ligne nulle**.

**La procédure.**

**Étape 1.** Écrire $A$ en RREF, sans ligne nulle.

**Étape 2.** **Augmenter** $A$ par des lignes de la forme $\begin{bmatrix}0&\cdots&0&-1&0&\cdots&0\end{bmatrix}$ pour obtenir une matrice $\tilde A\in\mathbb R^{n\times n}$ contenant un $-1$ sur la diagonale **aux positions des colonnes non pivots**.

**Étape 3.** Les colonnes de $\tilde A$ qui portent un $-1$ sur la diagonale sont **exactement une base du noyau** de $A$.

**Sur l'exemple 2.7.** Les colonnes 2 et 5 sont non pivots, on insère donc deux lignes :

$$\tilde A=\begin{bmatrix}1&3&0&0&3\\0&-1&0&0&0\\0&0&1&0&9\\0&0&0&1&-4\\0&0&0&0&-1\end{bmatrix}$$

Les colonnes 2 et 5 (celles portant un $-1$ diagonal) donnent

$$\ker A=\operatorname{span}\left[\begin{bmatrix}3\\-1\\0\\0\\0\end{bmatrix},\ \begin{bmatrix}3\\0\\9\\-4\\-1\end{bmatrix}\right]$$

> **Le livre le souligne** : c'est **identique** à la solution (2.50) obtenue « par intuition ». L'astuce du $-1$ est simplement l'automatisation du raisonnement sur les colonnes non pivots.

### 3.6 Calculer l'inverse par l'élimination de Gauss

Pour trouver $A^{-1}$ avec $A\in\mathbb R^{n\times n}$, on cherche $X$ tel que $AX=I_n$ ; on résout **simultanément** les $n$ systèmes $X=[x_1|\cdots|x_n]$ :

$$\boxed{\;\big[\,A\mid I_n\,\big]\;\rightsquigarrow\;\cdots\;\rightsquigarrow\;\big[\,I_n\mid A^{-1}\,\big]\;}$$

> *« Déterminer l'inverse d'une matrice **équivaut** à résoudre des systèmes d'équations linéaires. »*

**Exemple 2.9.**

$$A=\begin{bmatrix}1&0&2&0\\1&1&0&0\\1&2&0&1\\1&1&1&1\end{bmatrix}\qquad\Longrightarrow\qquad A^{-1}=\begin{bmatrix}-1&2&-2&2\\1&-1&2&-2\\1&-1&1&-1\\-1&0&-1&2\end{bmatrix}$$

<details><summary>Recalcul exact de l'inverse (Gauss-Jordan en fractions)</summary>

L'élimination de Gauss-Jordan sur $[A\mid I_4]$ produit exactement la matrice ci-dessus — recalculée en arithmétique **exacte** (fractions), sans arrondi. Contrôle partiel : ligne 1 de $A$ vaut $(1,0,2,0)$ ; produit avec la colonne 1 de $A^{-1}$ : $-1+0+2\cdot1+0=1$ ; avec la colonne 2 : $2+0+2\cdot(-1)+0=0$ ; avec la colonne 3 : $-2+0+2\cdot1+0=0$ ; avec la colonne 4 : $2+0+2\cdot(-1)+0=0$

</details>

### 3.7 Les algorithmes de résolution en pratique (§2.3.4)

| Méthode | Formule / idée | Quand |
|---|---|---|
| **Inverse directe** | $x=A^{-1}b$ | Seulement si $A$ est **carrée ET inversible** — « souvent pas le cas » |
| **Pseudo-inverse de Moore-Penrose** | $Ax=b\iff A^\top Ax=A^\top b\iff x=(A^\top A)^{-1}A^\top b$ | Si $A$ a des **colonnes linéairement indépendantes**. Donne la solution **des moindres carrés de norme minimale** |
| **Élimination de Gauss** | Transformations élémentaires | Intuitive et constructive, jusqu'à **des milliers** de variables |
| **Méthodes itératives stationnaires** | Richardson, Jacobi, Gauß-Seidel, sur-relaxation successive | Systèmes à **des millions** de variables |
| **Méthodes de sous-espace de Krylov** | Gradients conjugués, GMRES, gradients biconjugués | Idem, grande échelle |

> ⚠️ **L'avertissement numérique.** *« Pour des raisons de précision numérique, il n'est généralement **PAS recommandé** de calculer l'inverse ou la pseudo-inverse. »* Le produit $A^\top A$ et son inversion coûtent cher **et** dégradent le conditionnement.

> ⚠️ **Le coût de Gauss.** Pour des systèmes à des millions de variables, l'élimination de Gauss est **impraticable** : le nombre d'opérations arithmétiques croît **cubiquement** en le nombre d'équations simultanées.

**L'idée commune des méthodes itératives.** Soit $x_*$ une solution de $Ax=b$. On construit une itération

$$x^{(k+1)}=Cx^{(k)}+d$$

pour un $C$ et un $d$ bien choisis, qui **réduit l'erreur résiduelle** $\lVert x^{(k+1)}-x_*\rVert$ à chaque itération et converge vers $x_*$. (Les normes arrivent au §3.1.)

> **Où sert l'élimination de Gauss dans le reste du livre** : calcul des **déterminants** (§4.1), test d'**indépendance linéaire** (§2.5), calcul de l'**inverse** (§2.2.2), calcul du **rang** (§2.6.2), détermination d'une **base** (§2.6.1).

## 🟠 Concept 4 — Espaces vectoriels (§2.4)

### 4.1 Groupes

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.7 (Groupe).</span>

Soit un ensemble $\mathcal G$ et une opération $\otimes:\mathcal G\times\mathcal G\to\mathcal G$. Alors $G:=(\mathcal G,\otimes)$ est un **groupe** si :

1. **Clôture** : $\forall x,y\in\mathcal G:\ x\otimes y\in\mathcal G$
2. **Associativité** : $\forall x,y,z\in\mathcal G:\ (x\otimes y)\otimes z=x\otimes(y\otimes z)$
3. **Élément neutre** : $\exists e\in\mathcal G\ \forall x\in\mathcal G:\ x\otimes e=x$ et $e\otimes x=x$
4. **Élément inverse** : $\forall x\in\mathcal G\ \exists y\in\mathcal G:\ x\otimes y=e$ et $y\otimes x=e$, noté $x^{-1}$

</div>

Si de plus $\forall x,y\in\mathcal G:\ x\otimes y=y\otimes x$, le groupe est **abélien** (commutatif).

> ⚠️ *« L'élément inverse est défini **par rapport à l'opération** et ne signifie pas nécessairement $\frac1x$. »*

**Exemple 2.10 — le catalogue.**

| Ensemble et opération | Groupe ? | Pourquoi |
|---|---|---|
| $(\mathbb Z,+)$ | **abélien** | — |
| $(\mathbb N_0,+)$ |  | neutre $0$ présent, mais **inverses manquants** |
| $(\mathbb Z,\cdot)$ |  | neutre $1$ présent, mais pas d'inverse pour $z\neq\pm1$ |
| $(\mathbb R,\cdot)$ |  | **$0$ n'a pas d'inverse** |
| $(\mathbb R\setminus\{0\},\cdot)$ | abélien | — |
| $(\mathbb R^n,+)$, $(\mathbb Z^n,+)$ | abélien | neutre $e=(0,\dots,0)$, inverse $(-x_1,\dots,-x_n)$ |
| $(\mathbb R^{m\times n},+)$ | abélien | addition élément par élément |
| $(\mathbb R^{n\times n},\cdot)$ | en général | neutre $I_n$ oui, mais **l'inverse n'existe pas toujours** |

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.8 (Groupe linéaire général).</span>

L'ensemble des matrices **régulières (inversibles)** $A\in\mathbb R^{n\times n}$ **est** un groupe pour la multiplication matricielle : c'est le **groupe linéaire général** $GL(n,\mathbb R)$. Comme la multiplication matricielle n'est pas commutative, **ce groupe n'est PAS abélien**.

</div>

### 4.2 Espaces vectoriels

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.9 (Espace vectoriel).</span>

Un **espace vectoriel réel** $V=(\mathcal V,+,\cdot)$ est un ensemble $\mathcal V$ muni de deux opérations

$$+:\mathcal V\times\mathcal V\to\mathcal V\qquad\qquad \cdot:\mathbb R\times\mathcal V\to\mathcal V$$

tel que :

1. $(\mathcal V,+)$ est un **groupe abélien**
2. **Distributivité** : (a) $\forall\lambda\in\mathbb R,x,y\in\mathcal V:\ \lambda\cdot(x+y)=\lambda\cdot x+\lambda\cdot y$ ; (b) $\forall\lambda,\psi\in\mathbb R,x\in\mathcal V:\ (\lambda+\psi)\cdot x=\lambda\cdot x+\psi\cdot x$
3. **Associativité (opération externe)** : $\forall\lambda,\psi\in\mathbb R,x\in\mathcal V:\ \lambda\cdot(\psi\cdot x)=(\lambda\psi)\cdot x$
4. **Neutre de l'opération externe** : $\forall x\in\mathcal V:\ 1\cdot x=x$

</div>

**Vocabulaire.** Les $x\in\mathcal V$ sont les **vecteurs** ; le neutre de $(\mathcal V,+)$ est le **vecteur nul** $0=[0,\dots,0]^\top$ ; $+$ est l'**addition vectorielle** ; les $\lambda\in\mathbb R$ sont les **scalaires** ; l'opération externe est la **multiplication par un scalaire**.

> ⚠️ **Opération interne contre opération externe.** L'addition est **interne** ($\mathcal V\times\mathcal V\to\mathcal V$) ; la multiplication scalaire est **externe** ($\mathbb R\times\mathcal V\to\mathcal V$). C'est ce qui distingue un espace vectoriel d'un simple groupe.

> ⚠️ **« La multiplication de vecteurs $ab$ n'est pas définie. »** Seuls deux produits existent pour $a,b\in\mathbb R^n$ :
>
> $$ab^\top\in\mathbb R^{n\times n}\ \text{(produit EXTÉRIEUR)}\qquad a^\top b\in\mathbb R\ \text{(produit INTÉRIEUR / scalaire / point)}$$
>
> ⚠️ Le produit élément par élément $c_j=a_jb_j$ (« multiplication de tableaux ») est courant en programmation mais **a un sens mathématique limité**.

**Exemple 2.11 — les espaces vectoriels de référence.**

- $V=\mathbb R^n$ : addition et multiplication scalaire composante par composante.
- $V=\mathbb R^{m\times n}$ : addition élément par élément, $\lambda A$ élément par élément.
- $V=\mathbb C$ avec l'addition standard des nombres complexes.

### 4.3 Sous-espaces vectoriels

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.10 (Sous-espace vectoriel).</span>

$\mathcal U\subseteq\mathcal V$ non vide avec $(\mathcal U,+,\cdot)$ vérifiant les axiomes restreints à $\mathcal U\times\mathcal U$ et $\mathbb R\times\mathcal U$ est un **sous-espace vectoriel** de $V$, noté $U\subseteq V$.

</div>

$U$ **hérite** de $V$ : les propriétés de groupe abélien, la distributivité, l'associativité, l'élément neutre. **Il ne reste donc que trois choses à vérifier :**

$$\boxed{\;\text{(1) } \mathcal U\neq\varnothing,\text{ en particulier } 0\in\mathcal U\qquad\text{(2a) } \forall\lambda\in\mathbb R\ \forall x\in\mathcal U:\ \lambda x\in\mathcal U\qquad\text{(2b) } \forall x,y\in\mathcal U:\ x+y\in\mathcal U\;}$$

**Exemple 2.12 et figure 2.6.** Sur les quatre sous-ensembles de $\mathbb R^2$ dessinés :

| Cas | Verdict | Raison |
|---|---|---|
| A |  | **clôture violée** |
| B |  | **ne contient pas $0$** |
| C |  | **clôture violée** |
| D |  | seul sous-espace |

**Faits à retenir :**

- Pour tout espace vectoriel $V$, les **sous-espaces triviaux** sont $V$ lui-même et $\{0\}$.
- *« L'ensemble solution d'un **système homogène** $Ax=0$ avec $n$ inconnues **est** un sous-espace de $\mathbb R^n$. »*
- *« La solution d'un système **inhomogène** $Ax=b$, $b\neq0$, **n'est PAS** un sous-espace de $\mathbb R^n$. »* (Elle sera un **sous-espace affine**, §2.8.)
- L'**intersection** de deux sous-espaces est un sous-espace. ( Pas la réunion.)
- **Réciproque, à connaître** : *« Tout sous-espace $U\subseteq(\mathbb R^n,+,\cdot)$ est l'espace des solutions d'un système homogène $Ax=0$. »*

## 🔴 Concept 5 — Indépendance linéaire (§2.5)

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.11 (Combinaison linéaire).</span>

Dans un espace vectoriel $V$ avec $x_1,\dots,x_k\in V$, tout $v\in V$ de la forme

$$v=\lambda_1x_1+\dots+\lambda_kx_k=\sum_{i=1}^{k}\lambda_ix_i\in V$$

avec $\lambda_1,\dots,\lambda_k\in\mathbb R$ est une **combinaison linéaire** des $x_1,\dots,x_k$.

</div>

Le vecteur $0$ s'écrit **toujours** comme combinaison linéaire : $0=\sum_{i=1}^{k}0\,x_i$. C'est la combinaison **triviale**. Tout l'enjeu est de savoir s'il en existe une **non triviale**.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.12 (Indépendance linéaire).</span>

Dans $V$, avec $k\in\mathbb N$ et $x_1,\dots,x_k\in V$ :

- S'il existe une combinaison linéaire **non triviale** telle que $0=\sum_{i=1}^{k}\lambda_ix_i$ avec **au moins un** $\lambda_i\neq0$ : les vecteurs sont **linéairement DÉPENDANTS**.
- Si **seule** la solution triviale $\lambda_1=\dots=\lambda_k=0$ existe : ils sont **linéairement INDÉPENDANTS**.

</div>

> **L'intuition du livre.** *« Une famille de vecteurs linéairement indépendants est une famille **sans redondance** : si l'on retire l'un d'eux, **on perd quelque chose**. »*

**Exemple 2.13 — l'exemple géographique.** De Nairobi à Kigali : « 506 km au nord-ouest jusqu'à Kampala, puis 374 km au sud-ouest ». Ces deux vecteurs sont **linéairement indépendants** — le vecteur sud-ouest ne se décrit pas à partir du vecteur nord-ouest. Ajouter « c'est environ 751 km à l'ouest d'ici » est **vrai mais redondant** : ce troisième vecteur est linéairement **dépendant** des deux premiers. *(Le plan géographique est un espace vectoriel de dimension 2, en ignorant l'altitude et la courbure terrestre.)*

### 5.1 La boîte à outils du test

| Fait | Énoncé |
|---|---|
| **Dichotomie** | $k$ vecteurs sont **soit** dépendants **soit** indépendants. Il n'y a **pas de troisième option** |
| **Le vecteur nul** | Si **au moins un** des $x_i$ est $0$, ils sont **dépendants**. Idem si **deux vecteurs sont identiques** |
| **Critère pratique** | Des vecteurs non nuls, $k\geqslant2$, sont dépendants **si et seulement si (au moins) l'un d'eux est combinaison linéaire des autres** |
| **Le test opérationnel** | Écrire les vecteurs **en colonnes** d'une matrice, faire l'élimination de Gauss jusqu'à la forme échelonnée |
| **Lecture des pivots** | **Les colonnes de pivot** indiquent les vecteurs **indépendants des vecteurs situés à leur gauche**. **L'ordre des vecteurs compte** au moment de bâtir la matrice |
| **Conclusion** | **Toutes** les colonnes sont des colonnes de pivot : **indépendants**. **Au moins une** colonne non pivot : **dépendants** |

**Exemple 2.14.** Les vecteurs

$$x_1=\begin{bmatrix}1\\2\\-3\\4\end{bmatrix},\quad x_2=\begin{bmatrix}1\\1\\0\\2\end{bmatrix},\quad x_3=\begin{bmatrix}-1\\-2\\1\\1\end{bmatrix}$$

En colonnes puis Gauss :

$$\begin{bmatrix}1&1&-1\\2&1&-2\\-3&0&1\\4&2&1\end{bmatrix}\rightsquigarrow\cdots\rightsquigarrow\begin{bmatrix}1&1&-1\\0&1&0\\0&0&1\\0&0&0\end{bmatrix}$$

**Chaque** colonne est une colonne de pivot, donc pas de solution non triviale, donc $x_1,x_2,x_3$ sont **linéairement indépendants**.

<details><summary>RREF exacte recalculée</summary>

$$\text{RREF}=\begin{bmatrix}1&0&0\\0&1&0\\0&0&1\\0&0&0\end{bmatrix},\qquad\text{pivots en colonnes } 1,2,3.$$

Rang $=3=$ nombre de vecteurs, donc indépendance confirmée.

</details>

### 5.2 Combinaisons linéaires de vecteurs indépendants

Soient $b_1,\dots,b_k$ **linéairement indépendants** et $m$ combinaisons linéaires

$$x_j=\sum_{i=1}^{k}\lambda_{ij}b_i,\qquad j=1,\dots,m$$

Avec $B=[b_1,\dots,b_k]$ on écrit $x_j=B\lambda_j$ avec $\lambda_j=[\lambda_{1j},\dots,\lambda_{kj}]^\top$. Pour tester l'indépendance des $x_j$ on regarde $\sum_j\psi_jx_j=0$ :

$$\sum_{j=1}^{m}\psi_jx_j=\sum_{j=1}^{m}\psi_jB\lambda_j=B\sum_{j=1}^{m}\psi_j\lambda_j$$

$$\boxed{\;\{x_1,\dots,x_m\}\text{ indépendants}\iff\{\lambda_1,\dots,\lambda_m\}\text{ indépendants}\;}$$

> **Conséquence de comptage.** *« Dans un espace vectoriel $V$, $m$ combinaisons linéaires de $k$ vecteurs $x_1,\dots,x_k$ sont **linéairement dépendantes si $m>k$**. »*

**Exemple 2.15.** Avec $b_1,b_2,b_3,b_4\in\mathbb R^n$ indépendants :

$$x_1=b_1-2b_2+b_3-b_4$$

$$x_2=-4b_1-2b_2+4b_4$$

$$x_3=2b_1+3b_2-b_3-3b_4$$

$$x_4=17b_1-10b_2+11b_3+b_4$$

La matrice des coefficients et sa RREF :

$$A=\begin{bmatrix}1&-4&2&17\\-2&-2&3&-10\\1&0&-1&11\\-1&4&-3&1\end{bmatrix}\rightsquigarrow\begin{bmatrix}1&0&0&-7\\0&1&0&-15\\0&0&1&-18\\0&0&0&0\end{bmatrix}$$

⚠️ **La dernière colonne n'est PAS une colonne de pivot**, donc le système homogène a une solution non triviale :

$$\boxed{\;x_4=-7x_1-15x_2-18x_3\;}$$

Donc $x_1,\dots,x_4$ sont **linéairement dépendants**.

<details><summary>Double vérification : reconstruction de la colonne 4</summary>

$-7\,[1,-2,1,-1]-15\,[-4,-2,0,4]-18\,[2,3,-1,-3]$ $=[-7+60-36,\ \ 14+30-54,\ \ -7+0+18,\ \ 7-60+54]=[17,\,-10,\,11,\,1]$

C'est **exactement** la quatrième colonne de $A$. La RREF exacte a été recalculée en fractions : $\begin{bmatrix}1&0&0&-7\\0&1&0&-15\\0&0&1&-18\\0&0&0&0\end{bmatrix}$, pivots en colonnes $1,2,3$.

</details>

## 🔴 Concept 6 — Base et rang (§2.6)

### 6.1 Famille génératrice, span, base

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.13 (Famille génératrice et span).</span>

Dans $V=(\mathcal V,+,\cdot)$ avec $\mathcal A=\{x_1,\dots,x_k\}\subseteq\mathcal V$ : si **tout** $v\in V$ s'écrit comme combinaison linéaire de $x_1,\dots,x_k$, alors $\mathcal A$ est une **famille génératrice** de $V$. L'ensemble de toutes les combinaisons linéaires est le **span** de $\mathcal A$, noté $V=\operatorname{span}[\mathcal A]$ ou $V=\operatorname{span}[x_1,\dots,x_k]$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.14 (Base).</span>

Une famille génératrice $\mathcal A$ de $V$ est **minimale** s'il n'existe pas de $\tilde{\mathcal A}\subsetneq\mathcal A\subseteq\mathcal V$ qui engendre encore $V$. **Toute famille génératrice linéairement indépendante est minimale et s'appelle une BASE de $V$.**

</div>

> **Les quatre caractérisations ÉQUIVALENTES d'une base $\mathcal B\subseteq\mathcal V$, $\mathcal B\neq\varnothing$ :**
>
> 1. $\mathcal B$ est une **base** de $V$ ;
> 2. $\mathcal B$ est une **famille génératrice MINIMALE** ;
> 3. $\mathcal B$ est une **famille linéairement indépendante MAXIMALE** — ajouter n'importe quel autre vecteur la rend dépendante ;
> 4. **Tout** $x\in V$ est combinaison linéaire de vecteurs de $\mathcal B$, et cette combinaison est **UNIQUE** : si $x=\sum_i\lambda_ib_i=\sum_i\psi_ib_i$, alors $\lambda_i=\psi_i$ pour tout $i$.

**Exemple 2.16.** Dans $\mathbb R^3$, la **base canonique / standard** :

$$\mathcal B=\left\{\begin{bmatrix}1\\0\\0\end{bmatrix},\begin{bmatrix}0\\1\\0\end{bmatrix},\begin{bmatrix}0\\0\\1\end{bmatrix}\right\}$$

D'autres bases de $\mathbb R^3$ :

$$\mathcal B_1=\left\{\begin{bmatrix}1\\0\\0\end{bmatrix},\begin{bmatrix}1\\1\\0\end{bmatrix},\begin{bmatrix}1\\1\\1\end{bmatrix}\right\},\qquad \mathcal B_2=\left\{\begin{bmatrix}0.5\\0.8\\0.4\end{bmatrix},\begin{bmatrix}1.8\\0.3\\0.3\end{bmatrix},\begin{bmatrix}-2.2\\-1.3\\3.5\end{bmatrix}\right\}$$

Et l'ensemble

$$\mathcal A=\left\{\begin{bmatrix}1\\2\\3\\4\end{bmatrix},\begin{bmatrix}2\\-1\\0\\2\end{bmatrix},\begin{bmatrix}1\\1\\0\\-4\end{bmatrix}\right\}$$

est **linéairement indépendant** mais **PAS une famille génératrice de $\mathbb R^4$** : trois vecteurs ne peuvent pas engendrer un espace de dimension 4.

<details><summary>Contrôles numériques</summary>

$\mathcal B_1$ est triangulaire supérieure à diagonale $(1,1,1)$ : RREF $=I_3$, pivots $1,2,3$, donc base.

$\det\mathcal B_2=-\frac{138}{25}=-5{,}52\neq0$ (calcul exact par la formule de Leibniz sur les $6$ permutations), donc base.

$\mathcal A$ : la RREF de la matrice $4\times3$ est $\begin{bmatrix}1&0&0\\0&1&0\\0&0&1\\0&0&0\end{bmatrix}$, rang $3$. Indépendants , mais $\dim\operatorname{span}[\mathcal A]=3<4$

</details>

**Faits complémentaires sur les bases.**

- Une base est une famille génératrice **minimale** et une famille indépendante **maximale**.
- **Tout** espace vectoriel $V$ possède une base $\mathcal B$ ; il peut en avoir **beaucoup** — mais **toutes ont le même nombre d'éléments**, la **dimension** $\dim(V)$.
- Si $U\subseteq V$ est un sous-espace, alors $\dim(U)\leqslant\dim(V)$, avec $\dim(U)=\dim(V)$ **si et seulement si** $U=V$.
- *« La dimension d'un espace vectoriel correspond au nombre de **vecteurs de base**, **PAS au nombre d'éléments d'un vecteur**. »* Contre-exemple du livre : le sous-espace $U=\operatorname{span}\!\big[[0,1]^\top\big]$ est **de dimension 1** bien que ses vecteurs aient **deux** composantes.

### 6.2 Déterminer une base — Exemple 2.17

Une base d'un sous-espace $U=\operatorname{span}[x_1,\dots,x_m]\subseteq\mathbb R^n$ se trouve en trois pas :

**Étape 1.** Écrire les vecteurs générateurs **en COLONNES** d'une matrice $A$. **Étape 2.** Amener $A$ en **forme échelonnée**. **Étape 3.** Les **colonnes de pivot** désignent les vecteurs qui forment une **base** de $U$.

**Application.** Avec

$$x_1=\begin{bmatrix}1\\2\\-1\\-1\\-1\end{bmatrix},\ x_2=\begin{bmatrix}2\\-1\\1\\2\\-2\end{bmatrix},\ x_3=\begin{bmatrix}3\\-4\\3\\5\\-3\end{bmatrix},\ x_4=\begin{bmatrix}-1\\8\\-5\\-6\\1\end{bmatrix}\in\mathbb R^5$$

$$[x_1,x_2,x_3,x_4]=\begin{bmatrix}1&2&3&-1\\2&-1&-4&8\\-1&1&3&-5\\-1&2&5&-6\\-1&-2&-3&1\end{bmatrix}\rightsquigarrow\cdots\rightsquigarrow\begin{bmatrix}1&2&3&-1\\0&1&2&-2\\0&0&0&1\\0&0&0&0\\0&0&0&0\end{bmatrix}$$

Colonnes de pivot : **1, 2, 4**, donc $\{x_1,x_2,x_4\}$ est une **base** de $U$.

<details><summary>RREF exacte : pivots confirmés</summary>

$$\text{RREF}=\begin{bmatrix}1&0&-1&0\\0&1&2&0\\0&0&0&1\\0&0&0&0\\0&0&0&0\end{bmatrix},\qquad\text{pivots en colonnes }1,\,2,\,4.$$

Bonus lisible directement : $x_3=-x_1+2x_2$. Contrôle : $-[1,2,-1,-1,-1]+2[2,-1,1,2,-2]=[3,-4,3,5,-3]=x_3$

</details>

### 6.3 Le rang

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (Rang).</span>

*« Le nombre de **colonnes** linéairement indépendantes d'une matrice $A\in\mathbb R^{m\times n}$ **égale** le nombre de **lignes** linéairement indépendantes ; ce nombre est le **RANG** de $A$, noté $\operatorname{rk}(A)$. »*

</div>

**Les sept propriétés du rang — à connaître par cœur :**

$$\textbf{1.}\quad \operatorname{rk}(A)=\operatorname{rk}(A^\top)\qquad\text{(rang-colonnes} = \text{rang-lignes)}$$

**2.** Les **colonnes** de $A\in\mathbb R^{m\times n}$ engendrent un sous-espace $U\subseteq\mathbb R^m$ avec $\dim(U)=\operatorname{rk}(A)$. Ce sous-espace s'appellera l'**image** (ou *range*). Une **base** de $U$ s'obtient en appliquant Gauss à $A$ et en identifiant les **colonnes de pivot**.

**3.** Les **lignes** de $A\in\mathbb R^{m\times n}$ engendrent un sous-espace $W\subseteq\mathbb R^n$ avec $\dim(W)=\operatorname{rk}(A)$. Une base de $W$ s'obtient en appliquant Gauss à $A^\top$.

$$\textbf{4.}\quad\forall A\in\mathbb R^{n\times n}:\quad A\text{ est régulière (inversible)}\iff\operatorname{rk}(A)=n$$

$$\textbf{5.}\quad\forall A\in\mathbb R^{m\times n},\ b\in\mathbb R^m:\quad Ax=b\text{ a une solution}\iff\operatorname{rk}(A)=\operatorname{rk}(A\mid b)$$

$$\textbf{6.}\quad\forall A\in\mathbb R^{m\times n}:\quad\dim\{x:Ax=0\}=n-\operatorname{rk}(A)\qquad\text{(le NOYAU / espace nul)}$$

**7.** $A\in\mathbb R^{m\times n}$ est de **rang plein** si $\operatorname{rk}(A)=\min(m,n)$ — le plus grand rang possible pour ces dimensions. Sinon elle est **déficiente en rang**.

**Exemple 2.18.**

$$A=\begin{bmatrix}1&0&1\\0&1&1\\0&0&0\end{bmatrix}\;\Rightarrow\;\operatorname{rk}(A)=2\qquad\qquad A=\begin{bmatrix}1&2&1\\-2&-3&1\\3&5&0\end{bmatrix}\rightsquigarrow\begin{bmatrix}1&2&1\\0&1&3\\0&0&0\end{bmatrix}\;\Rightarrow\;\operatorname{rk}(A)=2$$

## 🔴 Concept 7 — Applications linéaires (§2.7)

### 7.1 Définition et vocabulaire

Une application $\Phi:V\to W$ **préserve la structure** d'espace vectoriel si

$$\Phi(x+y)=\Phi(x)+\Phi(y)\qquad\qquad\Phi(\lambda x)=\lambda\Phi(x)$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.15 (Application linéaire).</span>

$\Phi:V\to W$ est une **application linéaire** (aussi **homomorphisme d'espaces vectoriels** ou **transformation linéaire**) si

$$\boxed{\;\forall x,y\in V\ \forall\lambda,\psi\in\mathbb R:\quad \Phi(\lambda x+\psi y)=\lambda\Phi(x)+\psi\Phi(y)\;}$$

</div>

> ⚠️ **Le rappel crucial.** *« Quand on travaille avec des matrices, il faut garder en tête **ce que la matrice représente** : une **application linéaire**, ou une **collection de vecteurs**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.16 (Injective, surjective, bijective).</span>

Pour $\Phi:\mathcal V\to\mathcal W$ (ensembles quelconques) :

- **Injective** si $\forall x,y\in\mathcal V:\ \Phi(x)=\Phi(y)\Rightarrow x=y$
- **Surjective** si $\Phi(\mathcal V)=\mathcal W$
- **Bijective** si injective **et** surjective

</div>

Si $\Phi$ est surjective, **tout** élément de $\mathcal W$ est « atteignable » depuis $\mathcal V$. Si $\Phi$ est bijective, elle peut être « défaite » : il existe $\Psi:\mathcal W\to\mathcal V$ avec $\Psi\circ\Phi(x)=x$ ; on note $\Psi=\Phi^{-1}$.

**Les cas particuliers d'applications linéaires :**

| Nom | Définition |
|---|---|
| **Isomorphisme** | $\Phi:V\to W$ linéaire **et bijective** |
| **Endomorphisme** | $\Phi:V\to V$ linéaire (même espace au départ et à l'arrivée) |
| **Automorphisme** | $\Phi:V\to V$ linéaire **et bijective** |
| **Application identité** | $\operatorname{id}_V:V\to V,\ x\mapsto x$ — l'*automorphisme identité* |

**Exemple 2.19 — les complexes comme $\mathbb R^2$.** $\Phi:\mathbb R^2\to\mathbb C$, $\Phi(x)=x_1+ix_2$ est un homomorphisme :

$$\Phi\!\left(\begin{bmatrix}x_1\\x_2\end{bmatrix}+\begin{bmatrix}y_1\\y_2\end{bmatrix}\right)=(x_1+y_1)+i(x_2+y_2)=\Phi\!\begin{bmatrix}x_1\\x_2\end{bmatrix}+\Phi\!\begin{bmatrix}y_1\\y_2\end{bmatrix}$$

$$\Phi\!\left(\lambda\begin{bmatrix}x_1\\x_2\end{bmatrix}\right)=\lambda x_1+\lambda ix_2=\lambda(x_1+ix_2)=\lambda\Phi\!\begin{bmatrix}x_1\\x_2\end{bmatrix}$$

> ⚠️ *« Note : nous n'avons montré que la **linéarité**, pas la **bijection**. »* Le livre est explicite sur ce point.

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 2.17</span>

(théorème 3.59 dans Axler, 2015). **Deux espaces vectoriels de dimension finie $V$ et $W$ sont ISOMORPHES si et seulement si $\dim(V)=\dim(W)$.**

</div>

> **L'intuition.** *« Des espaces vectoriels de même dimension sont en quelque sorte **la même chose**, car on peut les transformer l'un en l'autre **sans aucune perte**. »* C'est ce théorème qui **justifie** de traiter $\mathbb R^{m\times n}$ et $\mathbb R^{mn}$ comme identiques : les deux ont dimension $mn$.

**Stabilité (trois faits).** Pour $V,W,X$ :

- $\Phi:V\to W$ et $\Psi:W\to X$ linéaires donnent $\Psi\circ\Phi:V\to X$ **linéaire**.
- $\Phi:V\to W$ isomorphisme donne $\Phi^{-1}:W\to V$ **aussi** isomorphisme.
- $\Phi,\Psi:V\to W$ linéaires donnent $\Phi+\Psi$ et $\lambda\Phi$ ($\lambda\in\mathbb R$) **linéaires**.

### 7.2 Coordonnées

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarque de notation, à ne jamais perdre de vue :</span>

- $B=(b_1,\dots,b_n)$ — un **$n$-uplet ORDONNÉ** : la **base ordonnée** ;
- $\mathcal B=\{b_1,\dots,b_n\}$ — un **ensemble** (base non ordonnée) ;
- $\boldsymbol B=[b_1,\dots,b_n]$ — une **MATRICE** dont les colonnes sont $b_1,\dots,b_n$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.18 (Coordonnées).</span>

Pour une base ordonnée $B=(b_1,\dots,b_n)$ de $V$, tout $x\in V$ admet une **représentation UNIQUE**

$$x=\alpha_1b_1+\dots+\alpha_nb_n$$

Les $\alpha_1,\dots,\alpha_n$ sont les **coordonnées** de $x$ relativement à $B$, et $\alpha=[\alpha_1,\dots,\alpha_n]^\top\in\mathbb R^n$ est le **vecteur de coordonnées / la représentation en coordonnées** de $x$ relativement à $B$.

</div>

> **Une base définit un système de coordonnées.** Le système cartésien à deux dimensions est celui de la base canonique $(e_1,e_2)$. Mais **toute** base de $\mathbb R^2$ définit un système de coordonnées valide, et **le même vecteur $x$ a des coordonnées DIFFÉRENTES selon la base**.

**Exemple 2.20.** Soit $x\in\mathbb R^2$ de coordonnées $[2,3]^\top$ dans la base canonique : $x=2e_1+3e_2$. Dans la base $b_1=[1,-1]^\top$, $b_2=[1,1]^\top$, les coordonnées deviennent

$$\boxed{\;x=-\tfrac12\,b_1+\tfrac52\,b_2\quad\Longrightarrow\quad [x]_B=\left[-\tfrac12,\ \tfrac52\right]^\top\;}$$

<details><summary>Résolution du système de coordonnées</summary>

On cherche $\alpha_1,\alpha_2$ avec $\alpha_1[1,-1]^\top+\alpha_2[1,1]^\top=[2,3]^\top$, soit $\alpha_1+\alpha_2=2$ et $-\alpha_1+\alpha_2=3$. Addition : $2\alpha_2=5$ donc $\alpha_2=\frac52$ ; puis $\alpha_1=2-\frac52=-\frac12$.

Contrôle : $-\frac12[1,-1]+\frac52[1,1]=[-\frac12+\frac52,\ \frac12+\frac52]=[2,3]$

⚠️ **Le même objet géométrique, deux vecteurs de coordonnées différents.** $[2,3]^\top$ dans une base, $[-\frac12,\frac52]^\top$ dans l'autre — **le vecteur n'a pas bougé**.

</details>

### 7.3 La matrice de transformation

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.19 (Matrice de transformation).</span>

Soient $V,W$ munis des bases ordonnées $B=(b_1,\dots,b_n)$ et $C=(c_1,\dots,c_m)$, et $\Phi:V\to W$ linéaire. Pour $j\in\{1,\dots,n\}$,

$$\Phi(b_j)=\alpha_{1j}c_1+\dots+\alpha_{mj}c_m=\sum_{i=1}^{m}\alpha_{ij}c_i$$

est **l'unique** représentation de $\Phi(b_j)$ relativement à $C$. La matrice $m\times n$ notée $A_\Phi$ et définie par

$$\boxed{\;A_\Phi(i,j)=\alpha_{ij}\;}$$

est la **matrice de transformation de $\Phi$** (relativement aux bases ordonnées $B$ de $V$ et $C$ de $W$).

</div>

> **La règle de lecture.** *« Les **coordonnées de $\Phi(b_j)$** relativement à la base ordonnée $C$ de $W$ sont **la $j$-ème COLONNE** de $A_\Phi$. »*

Et la propriété fondamentale : si $\hat x$ est le vecteur de coordonnées de $x\in V$ relativement à $B$, et $\hat y$ celui de $y=\Phi(x)\in W$ relativement à $C$, alors

$$\boxed{\;\hat y=A_\Phi\,\hat x\;}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que cela signifie exactement</span>

⚠️ : la matrice de transformation envoie **des COORDONNÉES relativement à une base ordonnée de $V$** sur **des COORDONNÉES relativement à une base ordonnée de $W$**. Elle n'agit pas sur les « vecteurs abstraits » mais sur leurs **représentations**.

</div>

**Exemple 2.21.** Avec $B=(b_1,b_2,b_3)$ de $V$ et $C=(c_1,\dots,c_4)$ de $W$, et

$$\Phi(b_1)=c_1-c_2+3c_3-c_4,\qquad \Phi(b_2)=2c_1+c_2+7c_3+2c_4,\qquad \Phi(b_3)=3c_2+c_3+4c_4$$

$$A_\Phi=[\alpha_1,\alpha_2,\alpha_3]=\begin{bmatrix}1&2&0\\-1&1&3\\3&7&1\\-1&2&4\end{bmatrix}$$

⚠️ Les **coefficients de $\Phi(b_j)$ se rangent EN COLONNE $j$**, pas en ligne. C'est l'erreur de transposition la plus fréquente du chapitre.

**Exemple 2.22 — trois transformations géométriques de $\mathbb R^2$.**

$$A_1=\begin{bmatrix}\cos\frac{\pi}{4}&-\sin\frac{\pi}{4}\\ \sin\frac{\pi}{4}&\cos\frac{\pi}{4}\end{bmatrix},\qquad A_2=\begin{bmatrix}2&0\\0&1\end{bmatrix},\qquad A_3=\frac12\begin{bmatrix}3&-1\\1&-1\end{bmatrix}$$

| Matrice | Effet sur 400 vecteurs disposés en carré |
|---|---|
| $A_1$ | **Rotation de $45^\circ$** — le carré tourne |
| $A_2$ | **Étirement d'un facteur 2** de la coordonnée $x_1$ — le carré devient un rectangle |
| $A_3$ | Une **combinaison de réflexion, rotation et étirement** |

### 7.4 Changement de base (§2.7.2)

**La question.** Comment change $A_\Phi$ si l'on change **la base de $V$** ($B$ vers $\tilde B$) **et celle de $W$** ($C$ vers $\tilde C$) ?

**Exemple 2.23 — la motivation, en deux lignes.** Soit

$$A=\begin{bmatrix}2&1\\1&2\end{bmatrix}\quad\text{(base canonique de }\mathbb R^2)$$

Dans la nouvelle base $B=\left(\begin{bmatrix}1\\1\end{bmatrix},\begin{bmatrix}1\\-1\end{bmatrix}\right)$, la matrice devient **DIAGONALE** :

$$\tilde A=\begin{bmatrix}3&0\\0&1\end{bmatrix}$$

<details><summary>Pourquoi la nouvelle matrice est diagonale</summary>

$A\begin{bmatrix}1\\1\end{bmatrix}=\begin{bmatrix}3\\3\end{bmatrix}=3\begin{bmatrix}1\\1\end{bmatrix}$ : le premier vecteur de base est **envoyé sur lui-même, multiplié par 3**.

$A\begin{bmatrix}1\\-1\end{bmatrix}=\begin{bmatrix}1\\-1\end{bmatrix}=1\cdot\begin{bmatrix}1\\-1\end{bmatrix}$ : le second est **fixe**.

Les colonnes de $\tilde A$ sont donc $[3,0]^\top$ et $[0,1]^\top$. On vient de calculer les **vecteurs propres** de $A$ (chapitre 4) sans le dire. La leçon : *« $\tilde A$ est plus facile à manipuler que $A$. »*

</details>

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 2.20 (Changement de base).</span>

Pour $\Phi:V\to W$ linéaire, des bases ordonnées $B=(b_1,\dots,b_n)$, $\tilde B=(\tilde b_1,\dots,\tilde b_n)$ de $V$, $C=(c_1,\dots,c_m)$, $\tilde C=(\tilde c_1,\dots,\tilde c_m)$ de $W$, et $A_\Phi$ la matrice de transformation de $\Phi$ relativement à $B$ et $C$, la matrice $\tilde A_\Phi$ relativement à $\tilde B$ et $\tilde C$ est

$$\boxed{\;\tilde A_\Phi=T^{-1}A_\Phi S\;}$$

Ici $S\in\mathbb R^{n\times n}$ est la matrice de transformation de $\operatorname{id}_V$ qui envoie les coordonnées **relativement à $\tilde B$** sur les coordonnées **relativement à $B$**, et $T\in\mathbb R^{m\times m}$ celle de $\operatorname{id}_W$ qui envoie les coordonnées **relativement à $\tilde C$** sur celles **relativement à $C$**.

</div>

**Comment construire $S$ et $T$.** On écrit les nouveaux vecteurs de base comme combinaisons des anciens :

$$\tilde b_j=s_{1j}b_1+\dots+s_{nj}b_n=\sum_{i=1}^{n}s_{ij}b_i,\qquad j=1,\dots,n$$

$$\tilde c_k=t_{1k}c_1+\dots+t_{mk}c_m=\sum_{l=1}^{m}t_{lk}c_l,\qquad k=1,\dots,m$$

> **La $j$-ème COLONNE de $S$ est la représentation en coordonnées de $\tilde b_j$ dans la base $B$.** Idem pour $T$ avec $\tilde c_k$ dans $C$. Quand $B$ est la base **canonique**, cette lecture est immédiate ; sinon il faut **résoudre un système linéaire**.

**La décomposition en trois étapes (figure 2.11).** L'application $\Phi_{\tilde C\tilde B}$ se factorise :

$$\Phi_{\tilde C\tilde B}=\Xi_{\tilde CC}\circ\Phi_{CB}\circ\Psi_{B\tilde B}$$

c'est-à-dire, en matrices : d'abord $S$ (des coordonnées $\tilde B$ vers $B$), puis $A_\Phi$ (de $B$ vers $C$), puis $T^{-1}$ (de $C$ vers $\tilde C$).

**Exemple 2.24 — le calcul complet.** $\Phi:\mathbb R^3\to\mathbb R^4$ avec

$$A_\Phi=\begin{bmatrix}1&2&0\\-1&1&3\\3&7&1\\-1&2&4\end{bmatrix}\quad\text{relativement aux bases CANONIQUES } B \text{ et } C$$

Nouvelles bases :

$$\tilde B=\left(\begin{bmatrix}1\\1\\0\end{bmatrix},\begin{bmatrix}0\\1\\1\end{bmatrix},\begin{bmatrix}1\\0\\1\end{bmatrix}\right),\qquad \tilde C=\left(\begin{bmatrix}1\\1\\0\\0\end{bmatrix},\begin{bmatrix}1\\0\\1\\0\end{bmatrix},\begin{bmatrix}0\\1\\1\\0\end{bmatrix},\begin{bmatrix}1\\0\\0\\1\end{bmatrix}\right)$$

D'où (colonnes = nouveaux vecteurs de base, puisque $B$ et $C$ sont canoniques) :

$$S=\begin{bmatrix}1&0&1\\1&1&0\\0&1&1\end{bmatrix},\qquad T=\begin{bmatrix}1&1&0&1\\1&0&1&0\\0&1&1&0\\0&0&0&1\end{bmatrix}$$

$$\tilde A_\Phi=T^{-1}A_\Phi S=\begin{bmatrix}-4&-4&-2\\6&0&0\\4&8&4\\1&6&3\end{bmatrix}$$

<details><summary>Recalcul intégral en arithmétique exacte</summary>

$$T^{-1}=\frac12\begin{bmatrix}1&1&-1&-1\\1&-1&1&-1\\-1&1&1&1\\0&0&0&2\end{bmatrix}$$

$$T^{-1}A_\Phi=\begin{bmatrix}-1&-3&-1\\3&3&-3\\0&4&4\\-1&2&4\end{bmatrix}$$

$$\big(T^{-1}A_\Phi\big)S=\begin{bmatrix}-4&-4&-2\\6&0&0\\4&8&4\\1&6&3\end{bmatrix}$$

**Identique à (2.121b)** (calcul en fractions exactes, aucun arrondi).

</details>

> **À quoi cela servira.** *« Au chapitre 4, nous exploiterons le changement de base pour trouver une base dans laquelle la matrice de transformation d'un endomorphisme prend une forme particulièrement simple (**DIAGONALE**). Au chapitre 10, nous chercherons une base commode sur laquelle **projeter** les données en **minimisant la perte de compression**. »*

### 7.5 Équivalence et similitude

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.21 (Équivalence).</span>

Deux matrices $A,\tilde A\in\mathbb R^{m\times n}$ sont **équivalentes** s'il existe des matrices **régulières** $S\in\mathbb R^{n\times n}$ et $T\in\mathbb R^{m\times m}$ telles que $\tilde A=T^{-1}AS$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.22 (Similitude).</span>

Deux matrices $A,\tilde A\in\mathbb R^{n\times n}$ sont **semblables** s'il existe une matrice régulière $S\in\mathbb R^{n\times n}$ avec $\tilde A=S^{-1}AS$.

</div>

> ⚠️ **Le sens de l'implication.** *« Les matrices semblables sont **toujours** équivalentes. Mais les matrices équivalentes ne sont **pas nécessairement** semblables. »*
>
> $$\text{semblables}\;\Longrightarrow\;\text{équivalentes},\qquad \text{équivalentes}\;\not\Longrightarrow\;\text{semblables}$$
>
> ⚠️ La similitude, c'est **la même** matrice $S$ des deux côtés, c'est-à-dire **la même base changée au départ et à l'arrivée** (cas d'un endomorphisme).

### 7.6 Image et noyau

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.23 (Image et noyau).</span>

Pour $\Phi:V\to W$ :

$$\ker(\Phi):=\Phi^{-1}(0_W)=\{v\in V:\Phi(v)=0_W\}\qquad\text{(NOYAU / espace nul)}$$

$$\operatorname{Im}(\Phi):=\Phi(V)=\{w\in W\mid\exists v\in V:\Phi(v)=w\}\qquad\text{(IMAGE / range)}$$

$V$ est le **domaine** et $W$ le **codomaine** de $\Phi$.

</div>

**Intuition.** Le **noyau** est l'ensemble des vecteurs de $V$ que $\Phi$ envoie sur $0_W$. L'**image** est l'ensemble des vecteurs de $W$ « atteignables » depuis $V$.

**Les quatre faits :**

- $\Phi(0_V)=0_W$ **toujours**, donc $0_V\in\ker(\Phi)$ : **le noyau n'est JAMAIS vide.**
- $\operatorname{Im}(\Phi)\subseteq W$ est un **sous-espace** de $W$ ; $\ker(\Phi)\subseteq V$ est un **sous-espace** de $V$.
- $$\boxed{\;\Phi\text{ est INJECTIVE}\iff\ker(\Phi)=\{0\}\;}$$

**Traduction matricielle** — pour $A\in\mathbb R^{m\times n}$ et $\Phi:\mathbb R^n\to\mathbb R^m$, $x\mapsto Ax$, avec $A=[a_1,\dots,a_n]$ :

$$\operatorname{Im}(\Phi)=\{Ax:x\in\mathbb R^n\}=\left\{\sum_{i=1}^{n}x_ia_i:x_1,\dots,x_n\in\mathbb R\right\}=\operatorname{span}[a_1,\dots,a_n]\subseteq\mathbb R^m$$

| Objet | Description | Où il vit | Dimension |
|---|---|---|---|
| **Image** = **espace des colonnes** | Le **span des COLONNES** de $A$ | dans $\mathbb R^m$ — $m$ est la **hauteur** de la matrice | $\operatorname{rk}(A)$ |
| **Noyau** = **espace nul** | La solution générale de $Ax=0$ | dans $\mathbb R^n$ — $n$ est la **largeur** de la matrice | $n-\operatorname{rk}(A)$ |

> *« Le **noyau** se concentre sur la **relation entre les colonnes** : on peut l'utiliser pour déterminer si/comment une colonne s'exprime comme combinaison linéaire des autres. »*

**Exemple 2.25.** Pour

$$\Phi:\mathbb R^4\to\mathbb R^2,\quad x\mapsto\begin{bmatrix}1&2&-1&0\\1&0&0&1\end{bmatrix}x=\begin{bmatrix}x_1+2x_2-x_3\\x_1+x_4\end{bmatrix}$$

**Image :**

$$\operatorname{Im}(\Phi)=\operatorname{span}\left[\begin{bmatrix}1\\1\end{bmatrix},\begin{bmatrix}2\\0\end{bmatrix},\begin{bmatrix}-1\\0\end{bmatrix},\begin{bmatrix}0\\1\end{bmatrix}\right]=\mathbb R^2$$

**Noyau :** RREF de $A$ :

$$\begin{bmatrix}1&2&-1&0\\1&0&0&1\end{bmatrix}\rightsquigarrow\cdots\rightsquigarrow\begin{bmatrix}1&0&0&1\\0&1&-\tfrac12&-\tfrac12\end{bmatrix}$$

Colonnes non pivots : 3 et 4. On les exprime avec les colonnes de pivot :

- $a_3=-\tfrac12a_2$, donc $0=a_3+\tfrac12a_2$
- $a_4=a_1-\tfrac12a_2$, donc $0=a_1-\tfrac12a_2-a_4$

$$\boxed{\;\ker(\Phi)=\operatorname{span}\left[\begin{bmatrix}0\\ \tfrac12\\1\\0\end{bmatrix},\ \begin{bmatrix}-1\\ \tfrac12\\0\\1\end{bmatrix}\right]\;}$$

<details><summary>Contrôle direct des deux vecteurs du noyau</summary>

$A\,[0,\tfrac12,1,0]^\top$ : $\;0+2\cdot\tfrac12-1+0=0$ ; $\;0+0+0+0=0$

$A\,[-1,\tfrac12,0,1]^\top$ : $\;-1+2\cdot\tfrac12-0+0=0$ ; $\;-1+0+0+1=0$

RREF exacte recalculée : $\begin{bmatrix}1&0&0&1\\0&1&-\frac12&-\frac12\end{bmatrix}$, pivots en colonnes $1,2$ Cohérence avec le théorème du rang : $\operatorname{rk}(A)=2$, $n=4$, donc $\dim\ker=4-2=2$

</details>

### 7.7 Le théorème du rang

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 2.24 (Théorème du rang / rank-nullity theorem).</span>

Pour des espaces vectoriels $V,W$ et une application linéaire $\Phi:V\to W$ :

$$\boxed{\;\dim\big(\ker(\Phi)\big)+\dim\big(\operatorname{Im}(\Phi)\big)=\dim(V)\;}$$

</div>

Aussi appelé **théorème fondamental des applications linéaires** (Axler 2015, théorème 3.22).

**Les trois conséquences directes :**

**1.** Si $\dim(\operatorname{Im}\Phi)<\dim(V)$, alors $\ker(\Phi)$ est **non trivial** : il contient plus que $0_V$, et $\dim(\ker\Phi)\geqslant1$.

**2.** Si $A_\Phi$ est la matrice de transformation de $\Phi$ relativement à une base ordonnée et $\dim(\operatorname{Im}\Phi)<\dim(V)$, alors $A_\Phi x=0$ a **une infinité de solutions**.

**3.** Si $\dim(V)=\dim(W)$, on a l'**équivalence à trois branches**

$$\Phi\text{ injective}\iff\Phi\text{ surjective}\iff\Phi\text{ bijective}$$

puisque $\operatorname{Im}(\Phi)\subseteq W$.

> ⚠️ **La condition $\dim(V)=\dim(W)$ n'est pas optionnelle.** Sans elle, l'équivalence tombe : $\Phi:\mathbb R^2\to\mathbb R^3$ peut être injective sans jamais être surjective.

## 🟠 Concept 8 — Espaces affines (§2.8)

> **La mise en garde préalable du livre.** *« Dans la littérature de l'apprentissage automatique, la distinction entre **linéaire** et **affine** n'est parfois pas claire, si bien qu'on trouve des références à des **espaces/applications affines qualifiés de linéaires**. »*

### 8.1 Sous-espaces affines

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.25 (Sous-espace affine).</span>

Soient $V$ un espace vectoriel, $x_0\in V$ et $U\subseteq V$ un **sous-espace**. Alors

$$L=x_0+U:=\{x_0+u:u\in U\}=\{v\in V\mid\exists u\in U:v=x_0+u\}\subseteq V$$

est un **sous-espace affine** ou **variété linéaire** de $V$. $U$ est la **direction** ou **espace directeur**, et $x_0$ est le **point de support**. Au chapitre 12, un tel sous-espace sera appelé **hyperplan**.

</div>

> ⚠️ **Le point critique.** *« La définition d'un sous-espace affine **EXCLUT $0$** si $x_0\notin U$. Un sous-espace affine n'est donc **PAS** un sous-espace (vectoriel) de $V$ lorsque $x_0\notin U$. »*

Exemples : les **points**, **droites** et **plans** de $\mathbb R^3$ qui ne passent **pas** (nécessairement) par l'origine.

**Inclusion.** Pour $L=x_0+U$ et $\tilde L=\tilde x_0+\tilde U$ :

$$L\subseteq\tilde L\iff U\subseteq\tilde U\ \text{ et }\ x_0-\tilde x_0\in\tilde U$$

**Équation paramétrique.** Si $(b_1,\dots,b_k)$ est une base ordonnée de $U$ (donc $L$ de dimension $k$), tout $x\in L$ s'écrit **de façon unique**

$$\boxed{\;x=x_0+\lambda_1b_1+\dots+\lambda_kb_k\;}$$

C'est l'**équation paramétrique** de $L$, de **vecteurs directeurs** $b_1,\dots,b_k$ et de **paramètres** $\lambda_1,\dots,\lambda_k$.

**Exemple 2.26 — le catalogue par dimension.**

| Dimension | Nom | Équation paramétrique | Ce qui la définit |
|---|---|---|---|
| $1$ | **Droite** (*line*) | $y=x_0+\lambda b_1$, $U=\operatorname{span}[b_1]$ | un point de support **et** un vecteur de direction |
| $2$ | **Plan** | $y=x_0+\lambda_1b_1+\lambda_2b_2$, $U=\operatorname{span}[b_1,b_2]$ | un point de support **et** deux vecteurs indépendants |
| $n-1$ | **Hyperplan** | $y=x_0+\sum_{i=1}^{n-1}\lambda_ib_i$ | un point de support **et** $n-1$ vecteurs indépendants |

<div class="callout callout--warn" data-kind="piege">

<span class="callout__lab">Attention au relativisme dimensionnel</span>

: *« Dans $\mathbb R^2$, une **droite** est aussi un hyperplan. Dans $\mathbb R^3$, un **plan** est aussi un hyperplan. »* « Hyperplan » veut dire **codimension 1**, pas « dimension 2 ».

</div>

**Le lien avec les systèmes inhomogènes :**

- Pour $A\in\mathbb R^{m\times n}$ et $x\in\mathbb R^m$, la solution de $A\lambda=x$ est **soit l'ensemble vide, soit un sous-espace affine de $\mathbb R^n$ de dimension $n-\operatorname{rk}(A)$**.
- En particulier, la solution de $\lambda_1b_1+\dots+\lambda_nb_n=x$, avec $(\lambda_1,\dots,\lambda_n)\neq(0,\dots,0)$, est un **hyperplan** de $\mathbb R^n$.
- Réciproquement, dans $\mathbb R^n$, **tout** sous-espace affine de dimension $k$ est la solution d'un système inhomogène $Ax=b$ avec $\operatorname{rk}(A)=n-k$.
- Pour un système **homogène** $Ax=0$, la solution est un **sous-espace vectoriel** — cas particulier de sous-espace affine avec $x_0=0$.

### 8.2 Applications affines

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.26 (Application affine).</span>

Pour $V,W$ espaces vectoriels, $\Phi:V\to W$ **linéaire** et $a\in W$, l'application

$$\phi:V\to W,\qquad x\mapsto a+\Phi(x)$$

est une **application affine** de $V$ dans $W$. Le vecteur $a$ est le **vecteur de translation**.

</div>

**Les trois propriétés :**

- Toute application affine $\phi:V\to W$ est la **composition** d'une application linéaire $\Phi:V\to W$ et d'une **translation** $\tau:W\to W$, avec $\phi=\tau\circ\Phi$. Les applications $\Phi$ et $\tau$ sont **uniquement déterminées**.
- La composition $\phi'\circ\phi$ d'applications affines $\phi:V\to W$, $\phi':W\to X$ est **affine**.
- Si $\phi$ est **bijective**, les applications affines **laissent la structure géométrique invariante** : elles **préservent la dimension et le parallélisme**.

> ⚠️ **Une application affine n'est linéaire que si $a=0$**, car $\phi(0)=a\neq0$ viole $\Phi(0)=0$. C'est exactement le même piège que « un sous-espace affine n'est pas un sous-espace ».

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Résoudre le système… », « pour quelles valeurs de $a$… » | **Gauss + compatibilité** | Matrice augmentée, puis REF, puis lire la dernière ligne : « $0=$ quelque chose » donne la condition sur $a$ |
| « Donner **toutes** les solutions », « la solution générale » | **Particulière + noyau** | 1. Une solution particulière (colonnes de pivot, en partant de la **droite**) ; 2. base du noyau (astuce du $-1$) ; 3. combiner |
| « Ces vecteurs sont-ils indépendants ? » | **Rang par les pivots** | En **colonnes**, Gauss, compter les colonnes de pivot. Toutes pivots : indépendants |
| « Donner une base de $U=\operatorname{span}[\dots]$ » | **Extraction de base** | En **colonnes**, Gauss, garder les vecteurs des **colonnes de pivot** (les originaux, pas les colonnes transformées) |
| « Calculer $\operatorname{rk}(A)$ » | **Rang** | Gauss, puis compter les lignes non nulles (nombre de pivots) |
| « $A$ est-elle inversible ? » | **Critère de rang** | $A$ carrée $n\times n$ : inversible si et seulement si $\operatorname{rk}(A)=n$, si et seulement si $\ker(A)=\{0\}$, si et seulement si $\det A\neq0$ (ch. 4) |
| « Calculer $A^{-1}$ » | **Gauss-Jordan** | $[A\mid I_n]$ vers $[I_n\mid A^{-1}]$ |
| « Donner les coordonnées de $x$ dans la base $B$ » | **Système de coordonnées** | Résoudre $\boldsymbol B\alpha=x$, c'est-à-dire $\alpha=\boldsymbol B^{-1}x$ |
| « Écrire la matrice de $\Phi$ relativement à $B$ et $C$ » | **Matrice de transformation** | Calculer $\Phi(b_j)$, l'exprimer dans $C$, **ranger les coefficients EN COLONNE $j$** |
| « Quelle est la matrice dans les nouvelles bases ? » | **Changement de base** | $\tilde A_\Phi=T^{-1}A_\Phi S$ ; colonnes de $S$ = les $\tilde b_j$ dans $B$ ; colonnes de $T$ = les $\tilde c_k$ dans $C$ |
| « $A$ et $\tilde A$ sont-elles semblables / équivalentes ? » | **Déf. 2.21 / 2.22** | Équivalentes : $\tilde A=T^{-1}AS$ (deux matrices). Semblables : $\tilde A=S^{-1}AS$ (**une seule**, carrées) |
| « Déterminer $\ker\Phi$ et $\operatorname{Im}\Phi$ » | **Noyau / image** | Image : span des **colonnes** ; noyau : solutions de $Ax=0$ ; contrôle par $\dim\ker+\dim\operatorname{Im}=n$ |
| « Montrer que $U$ est un sous-espace » | **Trois vérifications** | $0\in U$ ; stable par multiplication scalaire ; stable par addition |
| « Est-ce un groupe ? un espace vectoriel ? » | **Vérif. d'axiomes** | Groupe : clôture, associativité, neutre, inverse. Le point qui tombe le plus souvent : **l'inverse** |
| « Droite / plan / hyperplan passant par… » | **Sous-espace affine** | $x=x_0+\sum\lambda_ib_i$ ; hyperplan si et seulement si dimension $n-1$ |

## Comment résoudre : les cinq méthodes pas-à-pas

**Méthode A — Résoudre $Ax=b$ complètement.**

1. Écrire la matrice augmentée $[A\mid b]$.
2. Élimination de Gauss jusqu'à la **REF** ; noter les colonnes de pivot.
3. **Compatibilité** : s'il existe une ligne $[0\ \cdots\ 0\mid c]$ avec $c\neq0$, il n'y a **aucune** solution. Stop.
4. Continuer jusqu'à la **RREF**.
5. **Solution particulière** : exprimer $b$ avec les colonnes de pivot, **en partant de la colonne de pivot la plus à DROITE** ; mettre $0$ aux positions non pivots.
6. **Noyau** : astuce du $-1$ (ou exprimer chaque colonne non pivot dans les colonnes de pivot).
7. **Solution générale** = étape 5 + span de l'étape 6.
8. **Contrôle** : la dimension du noyau doit valoir $n-\operatorname{rk}(A)$, et $A x_{\text{part}}$ doit redonner $b$.

**Méthode B — Base d'un span.**

1. Vecteurs **en colonnes** (l'ordre compte).
2. Gauss jusqu'à la REF.
3. Repérer les **colonnes de pivot**.
4. La base est constituée des **vecteurs ORIGINAUX** situés à ces positions. Pas des colonnes de la matrice transformée.
5. $\dim U$ = nombre de pivots = rang.

**Méthode C — Matrice de transformation.**

1. Pour chaque $j$, calculer $\Phi(b_j)$.
2. Écrire $\Phi(b_j)=\sum_{i}\alpha_{ij}c_i$ (résoudre un système si $C$ n'est pas canonique).
3. Ranger $(\alpha_{1j},\dots,\alpha_{mj})^\top$ **en colonne $j$**.
4. $A_\Phi$ est $m\times n$ : **$m$ = taille de la base d'arrivée**, **$n$ = taille de la base de départ**.
5. Contrôle : $\hat y=A_\Phi\hat x$ sur un vecteur test.

**Méthode D — Changement de base.**

1. Construire $S$ : colonne $j$ = coordonnées de $\tilde b_j$ **dans $B$**.
2. Construire $T$ : colonne $k$ = coordonnées de $\tilde c_k$ **dans $C$**.
3. Inverser $T$ (Gauss-Jordan).
4. $\tilde A_\Phi=T^{-1}A_\Phi S$ — respecter l'ordre : $T^{-1}$ à **gauche**, $S$ à **droite**.
5. Contrôle dimensionnel : $T^{-1}$ est $m\times m$, $A_\Phi$ est $m\times n$, $S$ est $n\times n$, donc $\tilde A_\Phi$ est $m\times n$

**Méthode E — Noyau et image.**

1. $\operatorname{Im}\Phi$ = span des colonnes de $A$ ; en extraire une base par la méthode B.
2. $\operatorname{rk}(A)=\dim\operatorname{Im}\Phi$.
3. $\ker\Phi$ : RREF puis astuce du $-1$.
4. Contrôle par le **théorème du rang** : $\dim\ker+\operatorname{rk}=n$ (le nombre de **colonnes**).
5. $\Phi$ injective si et seulement si $\ker=\{0\}$ ; si $\dim V=\dim W$, injective si et seulement si surjective, si et seulement si bijective.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Confondre produit matriciel et produit **élément par élément** | Le produit élément par élément est le **produit de Hadamard** ; le produit matriciel est $c_{ij}=\sum_l a_{il}b_{lj}$ |
| Croire $AB=BA$ | Faux en général. Exemple 2.3 : $AB\in\mathbb R^{2\times2}$ et $BA\in\mathbb R^{3\times3}$ — **pas même la même taille** |
| Écrire $(AB)^{-1}=A^{-1}B^{-1}$ | C'est $(AB)^{-1}=B^{-1}A^{-1}$ — **l'ordre s'inverse**. Idem $(AB)^\top=B^\top A^\top$ |
| Écrire $(A+B)^{-1}=A^{-1}+B^{-1}$ | Faux. Le contre-exemple scalaire du livre : $\frac{1}{2+4}=\frac16\neq\frac12+\frac14$ |
| Croire que le produit de deux matrices symétriques est symétrique | Non : $\begin{bmatrix}1&0\\0&0\end{bmatrix}\begin{bmatrix}1&1\\1&1\end{bmatrix}=\begin{bmatrix}1&1\\0&0\end{bmatrix}$. La **somme**, elle, l'est toujours |
| Multiplier une ligne par $0$ dans Gauss | La transformation élémentaire exige $\lambda\in\mathbb R\setminus\{0\}$ ; sinon l'ensemble solution change |
| Prendre les **colonnes transformées** comme base du span | Prendre les **vecteurs ORIGINAUX** situés aux positions des colonnes de pivot |
| Oublier le suivi des indices de pivot dans l'astuce du $-1$ | La « 2e colonne de pivot » n'est pas la colonne 2 ; **noter les positions** avant de composer |
| Chercher la solution particulière en partant de la gauche | La lecture est **beaucoup plus simple en partant de la colonne de pivot la plus à DROITE** |
| Croire que la solution de $Ax=b$, $b\neq0$, est un sous-espace | C'est un sous-espace **AFFINE** — il ne contient pas $0$. Seul $Ax=0$ donne un sous-espace |
| Oublier de vérifier $0\in U$ | C'est **le** test qui élimine le cas B de la figure 2.6 |
| Croire que la réunion de deux sous-espaces est un sous-espace | C'est l'**intersection** qui l'est |
| Confondre dimension et nombre de composantes | $\operatorname{span}\!\big[[0,1]^\top\big]$ est de **dimension 1** bien que ses vecteurs aient 2 composantes |
| Ranger $\Phi(b_j)$ en **ligne** $j$ de $A_\Phi$ | En **COLONNE** $j$. Erreur de transposition classique |
| Écrire $\tilde A_\Phi=S^{-1}A_\Phi T$ | C'est $\tilde A_\Phi=T^{-1}A_\Phi S$ : $T$ concerne l'**arrivée** ($W$), $S$ le **départ** ($V$) |
| Dire « équivalentes donc semblables » | L'implication ne va **que** dans l'autre sens : semblables implique équivalentes |
| Appliquer « injective si et seulement si surjective » sans condition | Valable **seulement si** $\dim(V)=\dim(W)$ |
| Chercher l'image dans $\mathbb R^n$ et le noyau dans $\mathbb R^m$ | Inverse : **image dans $\mathbb R^m$** (hauteur), **noyau dans $\mathbb R^n$** (largeur) |
| Dire que le noyau peut être vide | Jamais : $\Phi(0_V)=0_W$, donc $0_V\in\ker\Phi$ toujours |
| Utiliser $x=A^{-1}b$ systématiquement | $A$ doit être **carrée ET inversible** ; et numériquement, calculer l'inverse **n'est pas recommandé** |
| Croire l'élimination de Gauss universelle | Coût **CUBIQUE** : impraticable au-delà de quelques milliers de variables. Au-delà : méthodes itératives / Krylov |
| Appeler « linéaire » une application affine | $\phi(x)=a+\Phi(x)$ n'est linéaire que si $a=0$ ; le livre signale explicitement ce flou dans la littérature ML |
| Croire qu'un hyperplan est toujours un plan | **Hyperplan = dimension $n-1$** : une droite dans $\mathbb R^2$, un plan dans $\mathbb R^3$ |

## 📌 Ultimate Review

```
════════════ LES SEPT FORMULES À SAVOIR SANS HÉSITER ════════════
  1.  cij = Σ_l ail blj                        produit matriciel
  2.  A⁻¹ = 1/(a11a22−a12a21) · [[a22,−a12],[−a21,a11]]     inverse 2×2
  3.  (AB)⁻¹ = B⁻¹A⁻¹        (AB)ᵀ = BᵀAᵀ      ordre INVERSÉ
  4.  [A | In]  ⇝  [In | A⁻¹]                  inverse par Gauss-Jordan
  5.  ŷ = AΦ x̂                                 matrice de transformation
  6.  ÃΦ = T⁻¹ AΦ S                            changement de base
  7.  dim ker Φ + dim Im Φ = dim V             THÉORÈME DU RANG
═════════════════════════════════════════════════════════════════
```

**La structure logique du chapitre en une page.**

| Niveau | Objet | Défini par |
|---|---|---|
| 0 | **Groupe** | clôture · associativité · neutre · inverse |
| 1 | **Groupe abélien** | + commutativité |
| 2 | **Espace vectoriel** | groupe abélien pour $+$ + distributivité (deux formes) + associativité externe + $1\cdot x=x$ |
| 3 | **Sous-espace** $U\subseteq V$ | $0\in U$ + clôture externe + clôture interne |
| 4 | **Base** de $V$ | famille génératrice **et** linéairement indépendante |
| 5 | **Dimension** | nombre d'éléments de **toute** base |
| 6 | **Application linéaire** | $\Phi(\lambda x+\psi y)=\lambda\Phi(x)+\psi\Phi(y)$ |
| 7 | **Matrice de transformation** | coordonnées vers coordonnées, colonne $j$ = $\Phi(b_j)$ dans $C$ |
| 8 | **Sous-espace affine** | $L=x_0+U$ — **pas** un sous-espace si $x_0\notin U$ |

**Les trois lectures du rang, à savoir passer de l'une à l'autre :**

| Lecture | Énoncé |
|---|---|
| **Algébrique** | Nombre de **pivots** dans la forme échelonnée |
| **Colonnes** | Dimension du **span des colonnes**, égale à $\dim\operatorname{Im}$ |
| **Lignes** | Dimension du **span des lignes** — et **c'est le même nombre** : $\operatorname{rk}(A)=\operatorname{rk}(A^\top)$ |

**Le tableau des correspondances système / application linéaire.**

| Langage « système » | Langage « application » |
|---|---|
| Colonnes de $A$ | Générateurs de $\operatorname{Im}\Phi$ |
| Solutions de $Ax=0$ | $\ker\Phi$ |
| $Ax=b$ compatible | $b\in\operatorname{Im}\Phi$, c'est-à-dire $\operatorname{rk}(A)=\operatorname{rk}(A\mid b)$ |
| Solution unique | $\ker\Phi=\{0\}$, c'est-à-dire $\Phi$ injective |
| Infinité de solutions | $\dim\ker\Phi\geqslant1$ |
| Nombre de variables libres | $\dim\ker\Phi=n-\operatorname{rk}(A)$ |
| Ensemble solution de $Ax=b$ | Sous-espace **affine** $x_{\text{part}}+\ker\Phi$ |

**Où chaque notion resservira dans le livre :**

| Notion du ch. 2 | Suite |
|---|---|
| Élimination de Gauss | Déterminants (§4.1), rang, inverse, bases |
| Changement de base | **Diagonalisation** (ch. 4), **ACP** (ch. 10) |
| Produit intérieur $a^\top b$ | **Normes, angles, projections** (ch. 3) |
| Pseudo-inverse $(A^\top A)^{-1}A^\top$ | **Régression linéaire** (ch. 9) |
| Hyperplan $L=x_0+U$ | **SVM** (ch. 12) |
| $\mathbb R^{m\times n}$ isomorphe à $\mathbb R^{mn}$ (Th. 2.17) | Vectorisation des données |

## 🧠 Active Recall

**Systèmes et Gauss**

1. Quelles sont les seules cardinalités possibles de l'ensemble solution d'un système linéaire réel ?
2. Quelles sont les trois transformations élémentaires, et quelle restriction pèse sur la deuxième ?
3. Donner les deux conditions de la définition 2.6 (forme échelonnée).
4. Qu'ajoute la forme échelonnée **réduite** ?
5. Comment distingue-t-on variables **de base** et variables **libres** ?
6. Dans l'exemple 2.6, pour quelle valeur de $a$ le système est-il compatible, et pourquoi ?
7. Quelle est la recette en trois pas pour la solution générale ?
8. Depuis quel côté lit-on les $\lambda_i$ pour la solution particulière, et pourquoi ?
9. Énoncer l'astuce du $-1$ en trois étapes.
10. Comment calcule-t-on $A^{-1}$ par élimination de Gauss ?
11. Quel est le coût asymptotique de l'élimination de Gauss ?
12. Citer trois méthodes itératives stationnaires et trois méthodes de Krylov.
13. Pourquoi le livre déconseille-t-il de calculer la pseudo-inverse ?

**Matrices** 14. Écrire la formule du produit matriciel et énoncer la règle des dimensions voisines. 15. Quel est le nom du produit élément par élément ? 16. Donner la formule de l'inverse $2\times2$ et sa condition d'existence. 17. Écrire les six propriétés (2.26)-(2.31). 18. La somme de deux matrices symétriques est-elle symétrique ? Et le produit ? 19. Que signifie « $Ax$ est une combinaison linéaire des colonnes de $A$ » ?

**Espaces vectoriels** 20. Donner les quatre axiomes de groupe. 21. $(\mathbb N_0,+)$, $(\mathbb Z,\cdot)$, $(\mathbb R,\cdot)$ : lequel est un groupe et pourquoi les autres non ? 22. Qu'est-ce que $GL(n,\mathbb R)$ ? Est-il abélien ? 23. Énoncer les quatre conditions de la définition 2.9. 24. Quelles sont les **trois seules** vérifications pour un sous-espace ? 25. Quels sont les deux sous-espaces triviaux ? 26. La solution de $Ax=b$ avec $b\neq0$ est-elle un sous-espace ? 27. Quels sont les deux seuls produits définis pour $a,b\in\mathbb R^n$ ?

**Indépendance, base, rang** 28. Distinguer combinaison linéaire triviale et non triviale. 29. Donner le test opérationnel de l'indépendance linéaire. 30. Que signale une colonne **non** pivot ? 31. Que se passe-t-il si $m>k$ pour $m$ combinaisons linéaires de $k$ vecteurs ? 32. Donner les quatre caractérisations équivalentes d'une base. 33. Toutes les bases d'un espace ont-elles le même cardinal ? 34. Quelle est la dimension de $\operatorname{span}\big[[0,1]^\top\big]$ ? Pourquoi est-ce un piège ? 35. Énoncer les sept propriétés du rang. 36. Que veut dire « de rang plein » ? « déficiente en rang » ?

**Applications linéaires** 37. Écrire la définition 2.15 en une ligne. 38. Distinguer isomorphisme, endomorphisme, automorphisme. 39. Énoncer le théorème 2.17 et dire ce qu'il justifie. 40. Que sont les coordonnées d'un vecteur ? 41. Distinguer $B$, $\mathcal B$ et $\boldsymbol B$. 42. Où se rangent les coefficients de $\Phi(b_j)$ dans $A_\Phi$ ? 43. Quelle est la taille de $A_\Phi$ en fonction des bases ? 44. Énoncer le théorème 2.20 et dire ce que représentent $S$ et $T$. 45. Comment se construit la colonne $j$ de $S$ ? 46. Différence entre matrices **équivalentes** et **semblables** ? Quel sens a l'implication ? 47. Définir image et noyau ; dire dans quel espace chacun vit. 48. Le noyau peut-il être vide ? 49. L'injectivité équivaut à quelle condition sur le noyau ? 50. Énoncer le théorème du rang et ses trois conséquences.

**Espaces affines** 51. Définir un sous-espace affine ; pourquoi n'est-ce pas un sous-espace ? 52. Qu'est-ce que la direction ? le point de support ? 53. Quelle est la dimension d'un hyperplan de $\mathbb R^n$ ? 54. Écrire l'équation paramétrique d'un plan. 55. La solution de $A\lambda=x$ est de quelle dimension ? 56. Définir une application affine et son vecteur de translation. 57. Quelles propriétés géométriques une application affine bijective préserve-t-elle ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Nombre de solutions d'un système linéaire réel ? | **0, 1 ou une INFINITÉ** — jamais autre chose |
| Les trois transformations élémentaires ? | **Échange** de lignes · **multiplication** par $\lambda\neq0$ · **addition** de deux lignes |
| Restriction sur $\lambda$ ? | $\lambda\in\mathbb R\setminus\{0\}$ |
| Qu'est-ce qu'un pivot ? | Le **premier nombre non nul en partant de la gauche** d'une ligne (coefficient dominant) |
| Position des pivots en REF ? | **Strictement à droite** du pivot de la ligne au-dessus, d'où l'**escalier** |
| Où sont les lignes nulles en REF ? | **En bas** |
| Les deux conditions ajoutées par la RREF ? | Chaque pivot vaut **1** · le pivot est le **seul non nul de sa colonne** |
| Variables de base ? | Celles des **colonnes de PIVOT** |
| Variables libres ? | **Toutes les autres** |
| Ce qu'est l'élimination de Gauss ? | L'algorithme qui amène un système en **RREF** par transformations élémentaires |
| La recette en trois pas ? | **1.** solution particulière **2.** toutes les solutions de $Ax=0$ **3.** combiner |
| Ces deux solutions sont-elles uniques ? | **NON** — seul l'ensemble solution l'est |
| Sens de lecture pour la solution particulière ? | De la colonne de pivot **la plus à DROITE** vers la gauche |
| Solution particulière de l'exemple 2.6 ? | $[2,0,-1,1,0]^\top$ |
| Condition de compatibilité de l'exemple 2.6 ? | $a=-1$ (dernière ligne : $0=a+1$) |
| L'astuce du $-1$, en une phrase ? | Compléter la RREF par des lignes $[0\ \cdots\ -1\ \cdots\ 0]$ pour obtenir $\tilde A\in\mathbb R^{n\times n}$ ; les colonnes portant $-1$ **sur la diagonale** forment une base du noyau |
| Calcul de $A^{-1}$ par Gauss ? | $[A\mid I_n]$ se transforme en $[I_n\mid A^{-1}]$ |
| $A^{-1}$ de l'exemple 2.9 ? | $\begin{bmatrix}-1&2&-2&2\\1&-1&2&-2\\1&-1&1&-1\\-1&0&-1&2\end{bmatrix}$ |
| Formule du produit matriciel ? | $c_{ij}=\sum_{l=1}^{n}a_{il}b_{lj}$ |
| Règle des dimensions ? | $(n\times k)(k\times m)=(n\times m)$ — **les dimensions voisines doivent coïncider** |
| Nom du produit élément par élément ? | Le **produit de Hadamard** — pas le produit matriciel |
| $AB$ et $BA$ de l'exemple 2.3 ? | $AB=\begin{bmatrix}2&3\\2&5\end{bmatrix}$, $BA=\begin{bmatrix}6&4&2\\-2&0&2\\3&2&1\end{bmatrix}$ — **tailles différentes** |
| L'inverse d'un produit ? | $(AB)^{-1}=B^{-1}A^{-1}$ — **ordre inversé** |
| La transposée d'un produit ? | $(AB)^\top=B^\top A^\top$ |
| L'inverse d'une somme ? | $(A+B)^{-1}\neq A^{-1}+B^{-1}$ |
| Inverse $2\times2$ ? | $\dfrac{1}{a_{11}a_{22}-a_{12}a_{21}}\begin{bmatrix}a_{22}&-a_{12}\\-a_{21}&a_{11}\end{bmatrix}$ |
| Condition d'existence ? | $a_{11}a_{22}-a_{12}a_{21}\neq0$ — c'est le **déterminant** |
| Matrice symétrique ? | $A=A^\top$ ; seules les matrices **carrées** peuvent l'être |
| Produit de deux symétriques ? | **Généralement PAS symétrique** |
| La transposée de l'inverse ? | $(A^{-1})^\top=(A^\top)^{-1}=:A^{-\top}$ |
| Sens profond de $Ax=b$ ? | Écrire $b$ comme **combinaison linéaire des COLONNES** de $A$ |
| Les quatre axiomes de groupe ? | **Clôture · associativité · neutre · inverse** |
| Groupe abélien ? | Groupe + **commutativité** |
| $(\mathbb R,\cdot)$ est-il un groupe ? | **NON** — $0$ n'a pas d'inverse |
| $(\mathbb N_0,+)$ ? | **NON** — pas d'inverses |
| $GL(n,\mathbb R)$ ? | Le groupe des matrices **régulières** $n\times n$ pour la multiplication — **non abélien** |
| Opération interne contre externe ? | Addition $\mathcal V\times\mathcal V\to\mathcal V$ (interne) · multiplication scalaire $\mathbb R\times\mathcal V\to\mathcal V$ (externe) |
| Les deux seuls produits de vecteurs ? | $ab^\top\in\mathbb R^{n\times n}$ (**extérieur**) · $a^\top b\in\mathbb R$ (**intérieur**) |
| Les trois vérifications d'un sous-espace ? | $0\in U$ · $\lambda x\in U$ · $x+y\in U$ |
| Sous-espaces triviaux ? | $V$ et $\{0\}$ |
| Solution de $Ax=0$ ? | Un **sous-espace** de $\mathbb R^n$ |
| Solution de $Ax=b$, $b\neq0$ ? | **PAS** un sous-espace — un sous-espace **AFFINE** |
| Intersection de deux sous-espaces ? | Un **sous-espace** — pas la réunion |
| Combinaison linéaire triviale ? | Tous les $\lambda_i=0$ |
| Linéairement dépendants ? | Il existe une combinaison **non triviale** égale à $0$ |
| Linéairement indépendants ? | **Seule** la combinaison triviale donne $0$ |
| Le test pratique ? | Vecteurs **en colonnes**, Gauss, regarder les **colonnes de pivot** |
| Que dit une colonne de pivot ? | Ce vecteur est **indépendant de ceux à sa gauche** — l'**ordre** compte |
| Si l'un des vecteurs est nul ? | Les vecteurs sont **dépendants** |
| Si deux vecteurs sont identiques ? | **Dépendants** |
| $m$ combinaisons de $k$ vecteurs avec $m>k$ ? | **Dépendantes** |
| Résultat de l'exemple 2.15 ? | $x_4=-7x_1-15x_2-18x_3$, donc **dépendants** |
| Famille génératrice ? | Tout $v\in V$ est combinaison linéaire de ses éléments |
| Span ? | L'ensemble de **toutes** les combinaisons linéaires |
| Base ? | Famille génératrice **linéairement indépendante** |
| Les quatre caractérisations ? | Base · génératrice **minimale** · indépendante **maximale** · représentation **UNIQUE** de tout $x$ |
| Toutes les bases ont-elles même taille ? | **OUI** — c'est la **dimension** |
| Dimension de $\operatorname{span}[[0,1]^\top]$ ? | **1**, pas 2 : la dimension compte les **vecteurs de base** |
| $U\subseteq V$, quand a-t-on $\dim U=\dim V$ ? | **Si et seulement si $U=V$** |
| Comment extraire une base d'un span ? | En colonnes, Gauss, garder les **vecteurs ORIGINAUX** des colonnes de pivot |
| Base de $U$ dans l'exemple 2.17 ? | $\{x_1,x_2,x_4\}$ (pivots en colonnes **1, 2, 4**) |
| Définition du rang ? | Le nombre de **colonnes** indépendantes, égal au nombre de **lignes** indépendantes |
| Rang de $A$ contre rang de $A^\top$ ? | **Égaux** |
| $A\in\mathbb R^{n\times n}$ inversible équivaut à ? | $\operatorname{rk}(A)=n$ |
| $Ax=b$ soluble équivaut à ? | $\operatorname{rk}(A)=\operatorname{rk}(A\mid b)$ |
| Dimension de la solution de $Ax=0$ ? | $n-\operatorname{rk}(A)$ |
| Rang plein ? | $\operatorname{rk}(A)=\min(m,n)$ |
| Application linéaire ? | $\Phi(\lambda x+\psi y)=\lambda\Phi(x)+\psi\Phi(y)$ |
| Autres noms ? | **Homomorphisme d'espaces vectoriels** · **transformation linéaire** |
| Isomorphisme ? | Linéaire **et bijective**, de $V$ vers $W$ |
| Endomorphisme ? | Linéaire, de $V$ vers $V$ |
| Automorphisme ? | Linéaire **et bijective**, de $V$ vers $V$ |
| Injective équivaut à ? | $\ker\Phi=\{0\}$ |
| Théorème 2.17 ? | $V$ et $W$ de dimension finie sont **isomorphes** si et seulement si $\dim V=\dim W$ |
| Ce qu'il justifie ? | Traiter $\mathbb R^{m\times n}$ et $\mathbb R^{mn}$ comme **la même chose** |
| Coordonnées de $x$ dans $B$ ? | Les $\alpha_i$ de l'unique écriture $x=\sum\alpha_ib_i$ |
| $B$, $\mathcal B$, $\boldsymbol B$ ? | **Uplet ordonné** · **ensemble** · **matrice de colonnes** |
| Coordonnées de $[2,3]^\top$ dans $([1,-1]^\top,[1,1]^\top)$ ? | $[-\tfrac12,\ \tfrac52]^\top$ |
| Où se range $\Phi(b_j)$ dans $A_\Phi$ ? | En **COLONNE $j$** |
| Taille de $A_\Phi$ ? | $m\times n$ avec $m=\dim W$, $n=\dim V$ |
| La relation fondamentale ? | $\hat y=A_\Phi\hat x$ (coordonnées vers coordonnées) |
| $A_\Phi$ de l'exemple 2.21 ? | $\begin{bmatrix}1&2&0\\-1&1&3\\3&7&1\\-1&2&4\end{bmatrix}$ |
| Effet de $A_2=\operatorname{diag}(2,1)$ ? | **Étirement d'un facteur 2** sur l'axe horizontal |
| Théorème 2.20 ? | $\tilde A_\Phi=T^{-1}A_\Phi S$ |
| Que fait $S$ ? | Coordonnées de $\tilde B$ vers $B$ (côté **départ**, $V$) |
| Que fait $T$ ? | Coordonnées de $\tilde C$ vers $C$ (côté **arrivée**, $W$) |
| Colonne $j$ de $S$ ? | Coordonnées de $\tilde b_j$ **dans la base $B$** |
| $\tilde A_\Phi$ de l'exemple 2.24 ? | $\begin{bmatrix}-4&-4&-2\\6&0&0\\4&8&4\\1&6&3\end{bmatrix}$ |
| La matrice de l'exemple 2.23 dans la nouvelle base ? | $\operatorname{diag}(3,1)$ — **diagonale**, donc plus simple |
| Matrices équivalentes ? | $\tilde A=T^{-1}AS$ avec $S,T$ **régulières** |
| Matrices semblables ? | $\tilde A=S^{-1}AS$ — **la MÊME** $S$ des deux côtés |
| Sens de l'implication ? | Semblables implique équivalentes ; **pas la réciproque** |
| Image de $\Phi$ ? | $\Phi(V)$ — le **span des COLONNES** de $A$, dans $\mathbb R^m$ |
| Autre nom de l'image ? | L'**espace des colonnes** (*column space*), le *range* |
| Noyau de $\Phi$ ? | $\{v:\Phi(v)=0_W\}$ — les solutions de $Ax=0$, dans $\mathbb R^n$ |
| Hauteur ou largeur ? | Image dans $\mathbb R^m$ (**hauteur**) · noyau dans $\mathbb R^n$ (**largeur**) |
| Le noyau peut-il être vide ? | **JAMAIS** — $\Phi(0_V)=0_W$ |
| Dimension de l'image ? | $\operatorname{rk}(A)$ |
| Noyau de l'exemple 2.25 ? | $\operatorname{span}\big[[0,\tfrac12,1,0]^\top,\ [-1,\tfrac12,0,1]^\top\big]$ |
| Théorème du rang ? | $\dim\ker\Phi+\dim\operatorname{Im}\Phi=\dim V$ |
| Autre nom ? | **Théorème fondamental des applications linéaires** |
| Conséquence si l'image est de dimension $<\dim V$ ? | $\ker\Phi$ **non trivial** ; $A_\Phi x=0$ a une **infinité** de solutions |
| L'équivalence à trois branches ? | Si $\dim V=\dim W$ : injective, surjective et bijective coïncident |
| Sous-espace affine ? | $L=x_0+U$, $U$ sous-espace, $x_0$ **point de support** |
| Pourquoi pas un sous-espace ? | Il **ne contient pas $0$** si $x_0\notin U$ |
| Autre nom ? | **Variété linéaire** (*linear manifold*) |
| Direction ? | Le sous-espace $U$ (**espace directeur**) |
| Équation paramétrique ? | $x=x_0+\lambda_1b_1+\dots+\lambda_kb_k$ |
| Droite ? | Dimension **1** : $y=x_0+\lambda b_1$ |
| Plan ? | Dimension **2** : $y=x_0+\lambda_1b_1+\lambda_2b_2$ |
| Hyperplan de $\mathbb R^n$ ? | Dimension **$n-1$** — une **droite** dans $\mathbb R^2$, un **plan** dans $\mathbb R^3$ |
| Dimension de la solution de $A\lambda=x$ ? | $n-\operatorname{rk}(A)$ — ou l'**ensemble vide** |
| Application affine ? | $\phi(x)=a+\Phi(x)$ avec $\Phi$ **linéaire** |
| Comment s'appelle $a$ ? | Le **vecteur de translation** |
| Décomposition d'une application affine ? | $\phi=\tau\circ\Phi$ — translation composée avec linéaire, **uniquement déterminées** |
| Ce que préserve une affine bijective ? | La **dimension** et le **parallélisme** |
| Quand une affine est-elle linéaire ? | **Seulement si $a=0$** |
| Coût de l'élimination de Gauss ? | **CUBIQUE** en le nombre d'équations |
| Alternatives à grande échelle ? | **Jacobi, Gauß-Seidel, Richardson, sur-relaxation** · **gradients conjugués, GMRES, gradients biconjugués** |
| Pseudo-inverse de Moore-Penrose ? | $(A^\top A)^{-1}A^\top$ — solution des **moindres carrés de norme minimale** |
| Sa condition ? | $A$ doit avoir des **colonnes linéairement indépendantes** |
| L'avertissement du livre ? | Calculer l'inverse ou la pseudo-inverse **n'est pas recommandé numériquement** |
