# Fiche 409 — Réduction de dimension par ACP : variance maximale, projection, ACP probabiliste

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 10 « Dimensionality Reduction with Principal Component Analysis » (p. 317-348) |
| **Difficulté** | Avancé — le **deuxième pilier**, la synthèse la plus complète du livre |
| **Temps d'étude estimé** | 140 min |
| **Prérequis** | Fiche 401 (base, changement de base) · Fiche 402 (projections) · Fiche 403 (valeurs propres, SVD, Eckart-Young) · Fiche 405 (gaussiennes) · Fiche 406 (optimisation sous contraintes) |
| **Concepts clés** | Matrice de covariance des données, code, sous-espace principal, matrice de projection, perspective de la variance maximale, composante principale, chargement, perspective de la projection, erreur de reconstruction, coordonnées optimales, complément orthogonal, approximation de rang faible, itération de la puissance, ACP en grande dimension, centrage, standardisation, ACP probabiliste (PPCA), processus génératif, échantillonnage ancestral, vraisemblance, a posteriori latente |
| **Poids à l'examen** | $S=\frac1N\sum_nx_nx_n^\top$ · $z_n=B^\top x_n$ et $\tilde x_n=BB^\top x_n$ · **$Sb_m=\lambda_mb_m$** et $V_m=\lambda_m$ · **$J_M=\sum_{j=M+1}^{D}\lambda_j$** · l'**équivalence** variance maximale $\Leftrightarrow$ erreur de reconstruction minimale · l'astuce $\frac1NX^\top X$ en grande dimension · **PPCA** : $p(x)=\mathcal N(\mu,BB^\top+\sigma^2I)$. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : DEUX dérivations, UNE seule réponse — les VECTEURS PROPRES de S

  §10.1 CADRE     données centrées x_n ∈ R^D ,  COVARIANCE  S = (1/N) Σn xn xnᵀ
        CODE            z_n = Bᵀ x_n ∈ R^M        (M < D)
        RECONSTRUCTION  x̃_n = B Bᵀ x_n ∈ R^D
        B = [b1,…,bM] ∈ R^(D×M) à colonnes ORTHONORMÉES
  §10.2 PERSPECTIVE « VARIANCE MAXIMALE »
        max_{b} bᵀ S b  s.c. ‖b‖² = 1   →  LAGRANGE  →  S b1 = λ1 b1
        ⚠️ V1 = b1ᵀ S b1 = λ1        la variance EST la valeur propre
        la m-ième CP : même résultat, sur les données DÉFLATÉES  Ŝ b_m = S b_m = λ_m b_m
        VARIANCE RETENUE par M composantes  =  λ1 + … + λM
  §10.3 PERSPECTIVE « PROJECTION »
        J_M = (1/N) Σn ‖x_n − x̃_n‖²        ← ERREUR DE RECONSTRUCTION
        COORDONNÉES OPTIMALES  z_in = b_iᵀ x_n     ← la PROJECTION ORTHOGONALE
        x_n − x̃_n vit ENTIÈREMENT dans le COMPLÉMENT ORTHOGONAL
        J_M = Σ_{j>M} b_jᵀ S b_j = tr( (Σ_{j>M} b_j b_jᵀ) S )  =  Σ_{j>M} λ_j
        ⚠️ MINIMISER l'erreur ⟺ MAXIMISER la variance retenue — MÊME SOLUTION
  §10.4 CALCUL     eigendécomposition de S  OU  SVD de X (⚠️ λi = σi²)
        ECKART-YOUNG : la meilleure approximation de rang M est la SVD TRONQUÉE
        ITÉRATION DE LA PUISSANCE  x_{k+1} = S x_k / ‖S x_k‖  → le 1er vecteur propre
  §10.5 GRANDE DIMENSION (N ≪ D)
        ⚠️ diagonaliser (1/N) XᵀX ∈ R^(N×N) au lieu de (1/N) XXᵀ ∈ R^(D×D)
        MÊMES valeurs propres non nulles ;  b_m se retrouve par  c_m = Xᵀ b_m
  §10.6 LES CINQ ÉTAPES EN PRATIQUE
        1. CENTRER   2. STANDARDISER   3. EIGENDÉCOMPOSITION
        4. PROJETER  z* = Bᵀ x*        5. DÉ-STANDARDISER pour revenir dans l'espace original
  §10.7 PERSPECTIVE VARIABLE LATENTE — l'ACP PROBABILISTE (PPCA)
        z ~ N(0, I) ,  x = Bz + µ + ε ,  ε ~ N(0, σ²I)
        VRAISEMBLANCE  p(x) = N(x | µ , B Bᵀ + σ² I)
        A POSTERIORI   p(z|x) = N(m, C) ,  m = Bᵀ(BBᵀ+σ²I)⁻¹(x−µ)
                                            C = I − Bᵀ(BBᵀ+σ²I)⁻¹B
        ⚠️ la covariance a posteriori NE DÉPEND PAS de x

LE RÉSULTAT UNIQUE   Les colonnes de B sont les M VECTEURS PROPRES de S
                     associés aux M PLUS GRANDES VALEURS PROPRES.
```

> **L'intuition fondatrice.** *« La réduction de dimension exploite une propriété des données de grande dimension (par exemple les images) : elles **résident souvent sur un SOUS-ESPACE de basse dimension**. »* L'exemple de la figure 10.1 : les données *« ne résident pas tout à fait sur une droite, mais elles **ne varient pas beaucoup dans la direction $x_2$**, si bien qu'on peut les exprimer **comme si** elles étaient sur une droite — **presque sans perte** »*.

> **Autres noms de l'ACP.** Dans la communauté du **traitement du signal**, l'ACP est aussi connue sous le nom de **transformée de KARHUNEN-LOÈVE**.

## 🟠 Concept 1 — Le cadre (§10.1)

**Le jeu de données** : $\mathcal X=\{x_1,\dots,x_N\}$, $x_n\in\mathbb R^D$, i.i.d., **de moyenne $0$**, avec la **matrice de covariance des données** :

$$\boxed{\;S=\frac1N\sum_{n=1}^{N}x_nx_n^\top\;}$$

**Les deux objets centraux :**

$$\boxed{\;\underbrace{z_n=B^\top x_n\in\mathbb R^M}_{\text{le CODE (représentation compressée)}}\qquad\underbrace{\tilde x_n=BB^\top x_n\in\mathbb R^D}_{\text{la RECONSTRUCTION}}\;}$$

avec la **matrice de projection** $B:=[b_1,\dots,b_M]\in\mathbb R^{D\times M}$ à colonnes **ORTHONORMÉES** : $b_i^\top b_j=0$ si $i\neq j$ et $b_i^\top b_i=1$.

> **L'objectif.** *« Trouver des projections $\tilde x_n$ des points $x_n$ qui soient **AUSSI SEMBLABLES QUE POSSIBLE** aux points originaux, mais qui aient une **dimensionnalité INTRINSÈQUE significativement PLUS BASSE**. »*

⚠️ **Trois espaces à distinguer** (figure 10.2) :

| Objet | Espace | Rôle |
|---|---|---|
| $x$ | $\mathbb R^D$ | **Original** |
| $z$ | $\mathbb R^M$ | **Compressé** — c'est ce que **l'ACP RENVOIE** |
| $\tilde x$ | $\mathbb R^D$ | **Reconstruit** — il **vit dans l'espace original** mais a une représentation intrinsèque de plus basse dimension |

> ⚠️ **La remarque clé.** *« Bien que $\tilde x_n$ soit un vecteur de dimension $D$, il **ne requiert qu'une SEULE coordonnée** $z_{1n}$ pour être représenté par rapport au vecteur de base $b_1\in\mathbb R^D$. »*

**Exemple 10.1 — coordonnées contre représentation.** Dans $\mathbb R^2$ avec la base canonique, $[5,3]^\top=5e_1+3e_2$ demande **deux** coordonnées. Mais un vecteur de la forme $\tilde x=[z,0]^\top$ **ne demande qu'UNE** coordonnée par rapport à $e_1$ : *« il vit dans un sous-espace de dimension 1 »*.

> **La remarque de notation, propre à ce chapitre.** *« Nous **NE suivons PAS** la convention de collecter les données en LIGNES de la matrice : nous les définissons comme les **COLONNES** de $X$. Notre matrice $X$ est donc **$D\times N$** et non $N\times D$. La raison : les **opérations algébriques se déroulent SANS AVOIR À TRANSPOSER** la matrice ni redéfinir les vecteurs comme vecteurs lignes. »*

## 🔴 Concept 2 — La perspective de la variance maximale (§10.2)

### 2.1 Le principe

> **L'idée.** *« Si l'on interprète le **contenu informationnel** des données comme leur caractère "**REMPLISSANT L'ESPACE**", alors on peut décrire l'information contenue en regardant l'**ÉTALEMENT** des données. La **VARIANCE** est un indicateur de cet étalement. »*
>
> $$\boxed{\;\text{Conserver le plus d'information}\ \equiv\ \text{capturer la PLUS GRANDE VARIANCE dans le code de basse dimension (Hotelling, 1933)}\;}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi le centrage est SANS PERTE DE GÉNÉRALITÉ.</span>

$$\mathbb V_z[z]=\mathbb V_x\big[B^\top(x-\mu)\big]=\mathbb V_x\big[B^\top x-B^\top\mu\big]=\mathbb V_x\big[B^\top x\big]$$

*« La variance du code de basse dimension **NE DÉPEND PAS de la MOYENNE** des données. »* Et avec cette hypothèse, la moyenne du code est aussi $0$ puisque $\mathbb E_z[z]=B^\top\mathbb E_x[x]=0$.

</div>

### 2.2 La direction de variance maximale

**Étape 1 — l'objectif.** On maximise la variance de la première coordonnée :

$$V_1:=\mathbb V[z_1]=\frac1N\sum_{n=1}^{N}z_{1n}^2\qquad\text{avec}\qquad z_{1n}=b_1^\top x_n$$

**Étape 2 — la réécriture matricielle.**

$$V_1=\frac1N\sum_{n=1}^{N}(b_1^\top x_n)^2=\frac1N\sum_{n=1}^{N}b_1^\top x_nx_n^\top b_1=b_1^\top\left(\frac1N\sum_{n=1}^{N}x_nx_n^\top\right)b_1$$

$$\boxed{\;V_1=b_1^\top Sb_1\;}$$

**Étape 3 — la contrainte.** *« **Augmenter arbitrairement la MAGNITUDE de $b_1$ AUGMENTE $V_1$** : un vecteur deux fois plus long peut donner un $V_1$ potentiellement **QUATRE fois plus grand**. On restreint donc toutes les solutions à $\lVert b_1\rVert^2=1$. »*

$$\boxed{\;\max_{b_1}\ b_1^\top Sb_1\quad\text{s.c.}\quad\lVert b_1\rVert^2=1\;}$$

**Étape 4 — le lagrangien** (§7.2) :

$$\mathfrak L(b_1,\lambda)=b_1^\top Sb_1+\lambda_1(1-b_1^\top b_1)$$

$$\frac{\partial\mathfrak L}{\partial b_1}=2b_1^\top S-2\lambda_1b_1^\top,\qquad\frac{\partial\mathfrak L}{\partial\lambda_1}=1-b_1^\top b_1$$

**Étape 5 — l'annulation.**

$$\boxed{\;Sb_1=\lambda_1b_1\qquad\text{et}\qquad b_1^\top b_1=1\;}$$

> **LA RÉVÉLATION.** *« En comparant avec la définition d'une décomposition en valeurs propres (§4.4), on voit que **$b_1$ est un VECTEUR PROPRE de la matrice de covariance $S$**, et que le **multiplicateur de LAGRANGE $\lambda_1$ joue le rôle de la VALEUR PROPRE** correspondante. »*

**Étape 6 — la conséquence.**

$$\boxed{\;V_1=b_1^\top Sb_1=\lambda_1b_1^\top b_1=\lambda_1\;}$$

> **LA CONCLUSION.** *« La variance des données projetées sur un sous-espace de dimension 1 **ÉGALE LA VALEUR PROPRE** associée au vecteur de base qui engendre ce sous-espace. Donc, pour **MAXIMISER** la variance du code, on choisit le vecteur de base associé à **LA PLUS GRANDE valeur propre** de $S$. Ce vecteur propre est la **PREMIÈRE COMPOSANTE PRINCIPALE**. »*

⚠️ **Vocabulaire.** *« La quantité $\sqrt{\lambda_1}$ est appelée le **CHARGEMENT** (*loading*) du vecteur unitaire $b_1$ et représente **l'ÉCART-TYPE** des données pris en compte par le sous-espace principal. »*

### 2.3 Le sous-espace de dimension $M$

**L'idée de DÉFLATION.** *« La $m$-ième composante principale se trouve en **SOUSTRAYANT l'effet des $m-1$ premières** composantes des données, essayant ainsi de trouver des composantes qui compressent **l'information RESTANTE**. »*

$$\boxed{\;\hat X:=X-\sum_{i=1}^{m-1}b_ib_i^\top X=X-B_{m-1}X\;}$$

où $B_{m-1}:=\sum_{i=1}^{m-1}b_ib_i^\top$ **projette sur le sous-espace engendré par $b_1,\dots,b_{m-1}$**. *« $\hat X$ contient l'information des données **qui n'a PAS ENCORE été compressée**. »*

**Le résultat remarquable.** Les vecteurs propres de $S$ et de $\hat S$ sont **IDENTIQUES** :

$$\hat Sb_i=\big(S-SB_{m-1}-B_{m-1}S+B_{m-1}SB_{m-1}\big)b_i$$

**Les deux cas :**

$$\boxed{\;B_{m-1}b_i=b_i\ \text{ si }i<m\qquad\qquad B_{m-1}b_i=0\ \text{ si }i\geqslant m\;}$$

| Cas | Résultat |
|---|---|
| $i\geqslant m$ | $\hat Sb_i=(S-B_{m-1}S)b_i=Sb_i=\lambda_ib_i$ — **même vecteur propre, MÊME valeur propre** |
| $i<m$ | $\hat Sb_i=0=0\cdot b_i$ — **valeur propre NULLE** : $b_1,\dots,b_{m-1}$ engendrent le **NOYAU de $\hat S$** |

> **La conclusion.** *« **Tout vecteur propre de $S$ est aussi vecteur propre de $\hat S$.** Mais si le vecteur propre fait partie du sous-espace principal de dimension $m-1$, sa valeur propre pour $\hat S$ est **$0$**. »* Donc $\lambda_m$ est **la plus grande** valeur propre de $\hat S$ **et** la **$m$-ième plus grande** de $S$.

$$\boxed{\;V_m=b_m^\top Sb_m=\lambda_m\qquad\Longrightarrow\qquad\text{Variance retenue par }M\text{ composantes}=\sum_{m=1}^{M}\lambda_m\;}$$

<details><summary>Vérification numérique complète des trois identités</summary>

Sur un jeu simulé ($D=4$, $N=200$, structure latente de rang 2 plus bruit) :

**Valeurs propres de $S$** : $[4{,}112758\ ;\ 1{,}937579\ ;\ 0{,}102982\ ;\ 0{,}093462]$, et $\operatorname{tr}(S)=6{,}246782=\sum_m\lambda_m$ (théorème 4.17)

**$V_m=b_m^\top Sb_m=\lambda_m$** :

| $m$ | $b_m^\top Sb_m$ | $\lambda_m$ | écart |
|---|---|---|---|
| $1$ | $4{,}11275820$ | $4{,}11275820$ | $8{,}9\cdot10^{-16}$ |
| $2$ | $1{,}93757947$ | $1{,}93757947$ | $0$ |
| $3$ | $0{,}10298190$ | $0{,}10298190$ | $3{,}5\cdot10^{-16}$ |
| $4$ | $0{,}09346227$ | $0{,}09346227$ | $6{,}9\cdot10^{-17}$ |

**Variance du code $=\sum_{m\leqslant M}\lambda_m$** :

| $M$ | Variance de $z$ mesurée | $\sum_{m\leqslant M}\lambda_m$ |
|---|---|---|
| $1$ | $4{,}11275820$ | $4{,}11275820$ |
| $2$ | $6{,}05033767$ | $6{,}05033767$ |
| $3$ | $6{,}15331957$ | $6{,}15331957$ |
| $4$ | $6{,}24678184$ | $6{,}24678184$ |

</details>

**Exemple 10.2 — les « 8 » de MNIST.** Sur tous les chiffres « 8 » de l'ensemble d'entraînement, *« on voit que **seules quelques** valeurs propres diffèrent significativement de $0$. Donc **l'essentiel de la variance est capturé par SEULEMENT quelques composantes principales**. »*

## 🔴 Concept 3 — La perspective de la projection (§10.3)

### 3.1 L'objectif

> **La reformulation.** *« On dérive l'ACP comme un algorithme qui **MINIMISE DIRECTEMENT l'ERREUR DE RECONSTRUCTION MOYENNE**. Cette perspective permet d'interpréter l'ACP comme un **AUTO-ENCODEUR LINÉAIRE OPTIMAL**. »*

Avec une **base orthonormée ordonnée** $(b_1,\dots,b_D)$ de $\mathbb R^D$ :

$$x=\sum_{d=1}^{D}\zeta_db_d=\underbrace{\sum_{m=1}^{M}\zeta_mb_m}_{\text{retenu}}+\underbrace{\sum_{j=M+1}^{D}\zeta_jb_j}_{\text{abandonné}}$$

$$\boxed{\;J_M:=\frac1N\sum_{n=1}^{N}\lVert x_n-\tilde x_n\rVert^2\;}$$

C'est l'**ERREUR DE RECONSTRUCTION** (Pearson, 1901). *« On rend explicite que $M$ est la dimension du sous-espace sur lequel on projette. »*

**La stratégie en deux temps :** *« D'abord on **optimise les COORDONNÉES $z_n$** pour une base orthonormée donnée ; ensuite on trouve la **base OPTIMALE**. »*

### 3.2 Les coordonnées optimales

$$\frac{\partial J_M}{\partial z_{in}}=\frac{\partial J_M}{\partial\tilde x_n}\frac{\partial\tilde x_n}{\partial z_{in}},\qquad\frac{\partial J_M}{\partial\tilde x_n}=-\frac2N(x_n-\tilde x_n)^\top,\qquad\frac{\partial\tilde x_n}{\partial z_{in}}=b_i$$

$$\frac{\partial J_M}{\partial z_{in}}=-\frac2N(x_n-\tilde x_n)^\top b_i\overset{\text{ONB}}{=}-\frac2N\big(x_n^\top b_i-z_{in}\big)$$

$$\boxed{\;z_{in}=x_n^\top b_i=b_i^\top x_n\;}$$

> **LA CONCLUSION GÉOMÉTRIQUE.** *« Les coordonnées de la projection optimale de $x_n$ par rapport aux vecteurs de base sont **les coordonnées de la PROJECTION ORTHOGONALE de $x_n$ sur le sous-espace principal**. »* C'est exactement le résultat du §3.8 (fiche 402), retrouvé ici **par le calcul**.

### 3.3 Le déplacement vit dans le complément orthogonal

$$\tilde x_n=\sum_{m=1}^{M}z_{mn}b_m=\sum_{m=1}^{M}(x_n^\top b_m)b_m=\left(\sum_{m=1}^{M}b_mb_m^\top\right)x_n$$

$$x_n=\left(\sum_{d=1}^{D}b_db_d^\top\right)x_n=\underbrace{\left(\sum_{m=1}^{M}b_mb_m^\top\right)x_n}_{=\tilde x_n}+\left(\sum_{j=M+1}^{D}b_jb_j^\top\right)x_n$$

$$\boxed{\;x_n-\tilde x_n=\left(\sum_{j=M+1}^{D}b_jb_j^\top\right)x_n\;}$$

> *« La différence est **EXACTEMENT la PROJECTION du point sur le COMPLÉMENT ORTHOGONAL** du sous-espace principal. Le vecteur de déplacement $x_n-\tilde x_n$ **vit dans le sous-espace ORTHOGONAL** au sous-espace principal. »*

> **Le lien avec Eckart-Young.** La matrice de projection est
>
> $$\boxed{\;\sum_{m=1}^{M}b_mb_m^\top=BB^\top\;}$$
>
> *« Par construction comme **somme de matrices de RANG 1** $b_mb_m^\top$, $BB^\top$ est **symétrique et de RANG $M$**. »* Et
>
> $$\frac1N\sum_{n=1}^{N}\lVert x_n-\tilde x_n\rVert^2=\frac1N\sum_{n=1}^{N}\big\lVert(I-BB^\top)x_n\big\rVert^2$$
>
> *« Trouver les $b_1,\dots,b_M$ qui minimisent la différence est **ÉQUIVALENT à trouver la MEILLEURE APPROXIMATION DE RANG $M$ de la MATRICE IDENTITÉ $I$** »* (§4.6).

<details><summary>Les quatre propriétés vérifiées numériquement</summary>

Avec $M=2$ et $D=4$ :

| Propriété | Test | Résultat |
|---|---|---|
| **Idempotence** de $BB^\top$ | $\max\lvert P^2-P\rvert$ | $0{,}0$ |
| **Symétrie** | $\max\lvert P-P^\top\rvert$ | $0{,}0$ |
| **Trace $=M$** | $\operatorname{tr}(BB^\top)$ | $2{,}0$ |
| **Déplacement orthogonal** | $\max_{n,m}\lvert(x_n-\tilde x_n)\cdot b_m\rvert$ | $0{,}0$ |

</details>

### 3.4 La reformulation de la perte — le point culminant

$$J_M=\frac1N\sum_{n=1}^{N}\left\lVert\sum_{j=M+1}^{D}(b_j^\top x_n)b_j\right\rVert^2\overset{\text{ONB}}{=}\frac1N\sum_{n=1}^{N}\sum_{j=M+1}^{D}(b_j^\top x_n)^2$$

En échangeant les sommes :

$$J_M=\sum_{j=M+1}^{D}b_j^\top\left(\frac1N\sum_{n=1}^{N}x_nx_n^\top\right)b_j=\sum_{j=M+1}^{D}b_j^\top Sb_j$$

Puis, par **linéarité et invariance CYCLIQUE de la trace** (fiche 403) :

$$\boxed{\;J_M=\sum_{j=M+1}^{D}\operatorname{tr}\big(b_j^\top Sb_j\big)=\operatorname{tr}\left(\underbrace{\left(\sum_{j=M+1}^{D}b_jb_j^\top\right)}_{\text{matrice de projection, de rang }D-M}S\right)\;}$$

> **L'ÉQUIVALENCE DES DEUX PERSPECTIVES, énoncée par le livre :** *« On peut formuler l'erreur de reconstruction quadratique moyenne comme **la COVARIANCE des données PROJETÉE sur le COMPLÉMENT ORTHOGONAL** du sous-espace principal. **Minimiser l'erreur de reconstruction moyenne est donc ÉQUIVALENT à MINIMISER la variance des données projetée sur le sous-espace QU'ON IGNORE** — ou, de façon équivalente, à **MAXIMISER la variance de la projection qu'on RETIENT**. »*
>
> $$\boxed{\;\text{ERREUR MINIMALE}\ \Longleftrightarrow\ \text{VARIANCE MAXIMALE}\ \Longrightarrow\ \text{MÊME SOLUTION}\;}$$

**La conséquence chiffrée** — l'équation (10.62) :

$$\boxed{\;J_M=\frac1N\sum_{n=1}^{N}\lVert x_n-\tilde x_n\rVert^2=\sum_{i=M+1}^{D}\lambda_i\;}$$

*« L'erreur de reconstruction est la **SOMME des valeurs propres ABANDONNÉES**. »*

<details><summary>Vérification exacte de l'équation (10.62)</summary>

| $M$ | $J_M$ mesurée | $\sum_{j>M}\lambda_j$ | écart |
|---|---|---|---|
| $1$ | $2{,}13402364$ | $2{,}13402364$ | $4{,}4\cdot10^{-16}$ |
| $2$ | $0{,}19644416$ | $0{,}19644416$ | $2{,}8\cdot10^{-17}$ |
| $3$ | $0{,}09346227$ | $0{,}09346227$ | $2{,}1\cdot10^{-16}$ |
| $4$ | $0{,}00000000$ | $0{,}00000000$ | $2{,}6\cdot10^{-31}$ |

⚠️ **Le contrôle de cohérence global** : pour tout $M$, on a **variance retenue $+$ erreur $=\operatorname{tr}(S)$**. En $M=2$ : $6{,}05034+0{,}19644=6{,}24678=\operatorname{tr}(S)$ — les deux perspectives partagent **le même budget total**.

</details>

## 🟠 Concept 4 — Calcul des vecteurs propres (§10.4)

### 4.1 Les deux voies

$$S=\frac1N\sum_{n=1}^{N}x_nx_n^\top=\frac1NXX^\top,\qquad X=[x_1,\dots,x_N]\in\mathbb R^{D\times N}$$

| Voie | Comment |
|---|---|
| **Eigendécomposition** | Directement sur $S$ (§4.2) |
| **SVD de $X$** | $X=U\Sigma V^\top$ ; *« Comme $S$ est symétrique et se factorise en $XX^\top$ (au facteur $\frac1N$ près), les **valeurs propres de $S$ sont les CARRÉS des valeurs SINGULIÈRES de $X$** »* |

$$\boxed{\;\lambda_i=\sigma_i^2\qquad\text{et}\qquad U=B\;}$$

### 4.2 Eckart-Young appliqué à l'ACP

*« Le théorème d'Eckart-Young (théorème 4.25) offre une façon **DIRECTE** d'estimer la représentation de basse dimension. »* La meilleure approximation de rang $M$

$$\tilde X_M:=\operatorname*{argmin}_{\operatorname{rk}(A)\leqslant M}\lVert X-A\rVert_2$$

est donnée par la **SVD TRONQUÉE au top-$M$** :

$$\boxed{\;\tilde X_M=U_M\Sigma_MV_M^\top\in\mathbb R^{D\times N}\;}$$

avec $U_M\in\mathbb R^{D\times M}$, $\Sigma_M\in\mathbb R^{M\times M}$ diagonale des $M$ plus grandes valeurs singulières, $V_M\in\mathbb R^{N\times M}$.

### 4.3 Aspects pratiques

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi on ne passe pas par le polynôme caractéristique.</span>

⚠️ *« Pour les matrices plus grandes que $4\times4$, ce n'est **PAS possible** : il faudrait trouver les racines d'un polynôme de degré 5 ou plus — et le **théorème d'ABEL-RUFFINI** (Ruffini 1799 ; Abel 1826) établit qu'il **n'existe AUCUNE solution ALGÉBRIQUE** à ce problème. »*

</div>

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ne pas tout calculer.</span>

*« Dans beaucoup d'applications on n'a besoin que de **quelques vecteurs propres**. Il serait **GASPILLEUR** de calculer la décomposition complète pour ensuite jeter tout le reste. Les **processus ITÉRATIFS** qui optimisent directement ces vecteurs propres sont **computationnellement plus efficaces**. »*

</div>

**L'ITÉRATION DE LA PUISSANCE** — le cas extrême du premier vecteur propre seul. On choisit $x_0$ **hors du noyau de $S$**, puis :

$$\boxed{\;x_{k+1}=\frac{Sx_k}{\lVert Sx_k\rVert},\qquad k=0,1,\dots\;}$$

*« Le vecteur est multiplié par $S$ à chaque itération puis **NORMALISÉ** — on a toujours $\lVert x_k\rVert=1$. Cette suite **CONVERGE vers le vecteur propre associé à la PLUS GRANDE valeur propre** de $S$. »*

<details><summary>Convergence de l'itération de la puissance</summary>

Après 300 itérations depuis un $x_0$ aléatoire :

$$\lvert x_k\cdot b_1\rvert=1{,}0000000000\quad\text{(alignement PARFAIT)}$$

Quotient de Rayleigh $x_k^\top Sx_k=4{,}1127582$ contre $\lambda_1=4{,}1127582$

</details>

## 🟠 Concept 5 — L'ACP en grande dimension (§10.5)

> **Le problème.** *« En $D$ dimensions, la covariance est une matrice $D\times D$ ; calculer ses valeurs et vecteurs propres coûte **CUBIQUEMENT en $D$**. Pour des images de $100\times100$ pixels, il faudrait diagonaliser une matrice **$10\,000\times10\,000$**. »*

**L'ASTUCE — quand $N\ll D$.** Partant de $Sb_m=\frac1NXX^\top b_m=\lambda_mb_m$, **multiplier à gauche par $X^\top\in\mathbb R^{N\times D}$** :

$$\frac1NX^\top X\,\underbrace{X^\top b_m}_{=:c_m}=\lambda_m\,X^\top b_m\qquad\Longleftrightarrow\qquad\boxed{\;\frac1NX^\top Xc_m=\lambda_mc_m\;}$$

> **Le gain.** *« $\frac1NX^\top X$ a **LES MÊMES valeurs propres NON NULLES** que la matrice de covariance $S$. Mais c'est maintenant une matrice **$N\times N$**, dont on peut calculer valeurs et vecteurs propres **BEAUCOUP plus efficacement**. »* On récupère ensuite $b_m$ en **remultipliant par $X$** et en normalisant.

<details><summary>Vérification et une inexactitude d'énoncé dans le livre</summary>

Avec $D=8$, $N=3$ :

| Matrice | Valeurs propres |
|---|---|
| $\frac1NXX^\top$ ($8\times8$) | $[5{,}102489\ ;\ 3{,}067560\ ;\ 0{,}453579\ ;\ 0;0;0;0;0]$ |
| $\frac1NX^\top X$ ($3\times3$) | $[5{,}102489\ ;\ 3{,}067560\ ;\ 0{,}453579]$ |

Les trois plus grandes **coïncident exactement**

> ⚠️ **Une inexactitude d'une unité dans l'énoncé du §10.5.** Le livre écrit : *« le rang de la matrice de covariance $S$ est $N$, elle a donc $D-N+1$ valeurs propres nulles »*. Les deux affirmations sont **incohérentes** : un rang $N$ donnerait $D-N$ zéros. Vérification numérique avec $D=8$, $N=3$ :
>
> | Données | Rang de $S$ | Nombre de valeurs propres nulles |
> |---|---|---|
> | **Non centrées** | $3=N$ | $5=D-N$ |
> | **CENTRÉES** (l'hypothèse du §10.5) | $2=N-1$ | $6=D-N+1$ |
>
> C'est donc le **comptage $D-N+1$ qui est CORRECT** — mais il découle du rang **$N-1$**, pas $N$ : le **CENTRAGE** fait perdre exactement un degré de liberté. Cela ne change rien à la validité de l'astuce.

</details>

## 🔴 Concept 6 — Les cinq étapes en pratique (§10.6)

**Étape 1 — SOUSTRACTION DE LA MOYENNE.** Calculer $\mu$ et le soustraire de chaque point. *« La soustraction de la moyenne n'est pas **strictement nécessaire**, mais elle **RÉDUIT le RISQUE de PROBLÈMES NUMÉRIQUES**. »*

**Étape 2 — STANDARDISATION.** Diviser par l'écart-type $\sigma_d$ de chaque dimension $d$. *« Les données sont maintenant **SANS UNITÉ** et de **variance 1 le long de chaque axe**. »*

**Étape 3 — EIGENDÉCOMPOSITION.** Calculer $S$, ses valeurs et vecteurs propres. *« Comme la covariance est **SYMÉTRIQUE**, le théorème spectral (4.15) garantit qu'on peut trouver une **ONB de vecteurs propres**. »* Sur la figure 10.11(d), *« les vecteurs propres sont mis à l'échelle par la magnitude de la valeur propre correspondante ; **le plus LONG engendre le sous-espace principal** »*.

**Étape 4 — PROJECTION.** **Standardiser d'abord** le point de test avec la moyenne **et** l'écart-type **des données d'ENTRAÎNEMENT** :

$$x_*^{(d)}\leftarrow\frac{x_*^{(d)}-\mu_d}{\sigma_d},\qquad d=1,\dots,D$$

$$\boxed{\;\tilde x_*=BB^\top x_*\qquad\text{avec les coordonnées}\qquad z_*=B^\top x_*\;}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">CE QUE L'ACP RENVOIE.</span>

⚠️ *« L'ACP renvoie **les COORDONNÉES $z_*$**, **PAS les projections $\tilde x_*$**. »*

</div>

**Étape 5 — DÉ-STANDARDISATION.** *« Ayant standardisé le jeu de données, $\tilde x_*=BB^\top x_*$ ne donne les projections que **dans le contexte du jeu STANDARDISÉ** »* — il faut **multiplier par $\sigma_d$ et rajouter $\mu_d$** pour revenir dans l'espace original.

**Exemple 10.4 — MNIST.** $60\,000$ chiffres manuscrits en images $28\times28=784$ pixels, donc $x\in\mathbb R^{784}$. Sur $5\,389$ images du chiffre « 8 » :

| Nombre de CP | Qualité de la reconstruction |
|---|---|
| $1$ | *« Une reconstruction **à moitié décente**, mais **FLOUE et GÉNÉRIQUE** »* |
| $10$, $100$ | *« Les reconstructions deviennent **plus NETTES**, plus de détails sont pris en compte »* |
| $500$ | *« Une reconstruction **quasi PARFAITE** »* |
| $784$ | *« On récupérerait le chiffre **EXACT, sans AUCUNE perte** de compression »* |

> *« L'importance des composantes principales **CHUTE RAPIDEMENT**, et seuls des gains marginaux s'obtiennent en ajoutant davantage de CP. »*

## 🔴 Concept 7 — L'ACP probabiliste (§10.7)

### 7.1 Les neuf raisons d'un modèle probabiliste

*« Une ACP dérivée sans notion de modèle probabiliste permet de **contourner toutes les difficultés mathématiques** de la théorie des probabilités, mais un modèle probabiliste offrirait **plus de FLEXIBILITÉ et des APERÇUS utiles ».* Il permettrait de :

1. Disposer d'une **fonction de VRAISEMBLANCE**, et traiter explicitement les **observations BRUITÉES**.
2. Faire de la **comparaison de modèles BAYÉSIENNE** via la vraisemblance marginale (§8.6).
3. Voir l'ACP comme un **modèle GÉNÉRATIF** — donc **SIMULER de nouvelles données**.
4. Établir des **connexions directes** avec des algorithmes apparentés.
5. Traiter les **dimensions MANQUANTES au hasard** en appliquant le théorème de Bayes.
6. Disposer d'une notion de **NOUVEAUTÉ** d'un point de donnée.
7. **Étendre** le modèle de façon principielle, par exemple à un **mélange de modèles d'ACP**.
8. Retrouver l'**ACP classique comme CAS PARTICULIER**.
9. Permettre un **traitement pleinement bayésien** en marginalisant les paramètres.

**La PPCA** a été proposée par **Tipping et Bishop (1999)**. *« La solution d'ACP obtenue en maximisant la variance ou en minimisant l'erreur de reconstruction est obtenue comme le **cas particulier du maximum de vraisemblance dans un cadre SANS BRUIT**. »*

### 7.2 Le processus génératif

$$\boxed{\;z\sim\mathcal N(0,I)\in\mathbb R^M\qquad x=Bz+\mu+\epsilon\in\mathbb R^D,\qquad\epsilon\sim\mathcal N(0,\sigma^2I)\;}$$

$$\boxed{\;p(x\mid z,B,\mu,\sigma^2)=\mathcal N\big(x\mid Bz+\mu,\ \sigma^2I\big)\;}$$

> **L'ÉCHANTILLONNAGE ANCESTRAL.** *« Pour générer un point typique : on échantillonne d'abord une variable latente $z_n$ de $p(z)$ ; **puis** on l'utilise pour échantillonner un point **CONDITIONNÉ** sur ce $z_n$. »*

Le **modèle probabiliste** (la loi jointe, §8.4) :

$$p(x,z\mid B,\mu,\sigma^2)=p(x\mid z,B,\mu,\sigma^2)\,p(z)$$

### 7.3 La vraisemblance

On **marginalise la variable latente** (§8.4.3) :

$$p(x\mid B,\mu,\sigma^2)=\int\mathcal N\big(x\mid Bz+\mu,\sigma^2I\big)\,\mathcal N(z\mid0,I)\,dz$$

**Les deux moments, par les règles des transformations affines** (§6.4.4) :

$$\mathbb E_x[x]=\mathbb E_z[Bz+\mu]+\mathbb E_\epsilon[\epsilon]=\mu$$

$$\mathbb V[x]=\mathbb V_z[Bz]+\sigma^2I=B\,\mathbb V_z[z]\,B^\top+\sigma^2I=BB^\top+\sigma^2I$$

$$\boxed{\;p(x\mid B,\mu,\sigma^2)=\mathcal N\big(x\mid\mu,\ BB^\top+\sigma^2I\big)\;}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi on ne peut PAS utiliser $p(x\mid z)$ directement.</span>

⚠️ *« On ne peut **pas** utiliser la loi conditionnelle pour le maximum de vraisemblance car elle **DÉPEND ENCORE des variables latentes**. La fonction de vraisemblance requise **ne doit dépendre QUE des données et des paramètres**. »*

</div>

**La loi jointe complète.** La covariance croisée manquante :

$$\operatorname{Cov}[x,z]=\operatorname{Cov}_z[Bz+\mu]=B\operatorname{Cov}_z[z,z]=B$$

$$\boxed{\;p(x,z\mid B,\mu,\sigma^2)=\mathcal N\left(\begin{bmatrix}x\\z\end{bmatrix}\ \middle|\ \begin{bmatrix}\mu\\0\end{bmatrix},\ \begin{bmatrix}BB^\top+\sigma^2I&B\\B^\top&I\end{bmatrix}\right)\;}$$

de vecteur moyenne de longueur $D+M$ et covariance $(D+M)\times(D+M)$.

<details class="details--riche">
<summary>

Contrôle de $\operatorname{Cov}[x]=BB^\top+\sigma^2I$

</summary>

Avec $B$ construite à partir des deux premières composantes principales mises à l'échelle par $\sqrt{\lambda_m}$, et $\sigma^2=0{,}09$, $D=4$ :

$$\operatorname{tr}\big(BB^\top+\sigma^2I\big)=6{,}410338$$

$$\lambda_1+\lambda_2+D\sigma^2=6{,}050338+4\times0{,}09=6{,}410338\quad\text{}$$

⚠️ La lecture est limpide : la trace de la covariance PPCA se **décompose exactement** en **variance expliquée par le sous-espace** ($\lambda_1+\lambda_2$) **plus bruit isotrope** ($D\sigma^2$).

</details>

### 7.4 L'a posteriori latente

Le **conditionnement gaussien** (§6.5.1) appliqué à la jointe donne immédiatement :

$$\boxed{\;p(z\mid x)=\mathcal N(z\mid m,C)\;}$$

$$\boxed{\;m=B^\top(BB^\top+\sigma^2I)^{-1}(x-\mu)\;}$$

$$\boxed{\;C=I-B^\top(BB^\top+\sigma^2I)^{-1}B\;}$$

> ⚠️ **LE POINT REMARQUABLE.** *« La covariance a posteriori **NE DÉPEND PAS des données observées $x$**. »* — exactement comme pour la régression bayésienne (fiche 408). *« Pour une nouvelle observation $x_*$, on utilise (10.73) pour déterminer la loi a posteriori de la variable latente correspondante $z_*$. La matrice de covariance $C$ permet d'**évaluer la CONFIANCE** dans l'encodage. »*

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Calculer la matrice de covariance » | **§10.1** | **CENTRER d'abord**, puis $S=\frac1N\sum_nx_nx_n^\top=\frac1NXX^\top$ |
| « Trouver la direction de variance maximale » | **§10.2.1** | Lagrangien $\Rightarrow Sb_1=\lambda_1b_1$ : le **vecteur propre dominant** |
| « Quelle variance conserve-t-on ? » | **§10.2.2** | $\sum_{m\leqslant M}\lambda_m$ ; en proportion : $\dfrac{\sum_{m\leqslant M}\lambda_m}{\operatorname{tr}S}$ |
| « Quelle est l'erreur de reconstruction ? » | **(10.62)** | $J_M=\sum_{j>M}\lambda_j$ — la **somme des vp ABANDONNÉES** |
| « Coder / décoder un point » | **§10.1** | Code $z=B^\top x$ ; reconstruction $\tilde x=BB^\top x$ |
| « Montrer que la projection est orthogonale » | **§10.3.2** | Dériver $J_M$ par $z_{in}$, annuler $\Rightarrow z_{in}=b_i^\top x_n$ |
| « Où vit le vecteur d'erreur ? » | **§10.3.3** | Dans le **COMPLÉMENT ORTHOGONAL** : $\big(\sum_{j>M}b_jb_j^\top\big)x_n$ |
| « Relier ACP et Eckart-Young » | **§10.4.1** | La **SVD tronquée** au top-$M$ est la meilleure approximation de rang $M$ |
| « Passer de la SVD aux valeurs propres » | **§10.4** | $\lambda_i=\sigma_i^2$ et $U=B$ |
| « $N\ll D$, comment faire ? » | **§10.5** | Diagonaliser $\frac1NX^\top X\in\mathbb R^{N\times N}$ ; puis $c_m=X^\top b_m$ |
| « Trouver seulement le premier vecteur propre » | **§10.4.2** | **Itération de la puissance** : $x_{k+1}=Sx_k/\lVert Sx_k\rVert$ |
| « Appliquer l'ACP à un nouveau point » | **§10.6** | Standardiser avec la **moyenne et l'écart-type d'ENTRAÎNEMENT** |
| « Écrire le modèle génératif de la PPCA » | **§10.7.1** | $z\sim\mathcal N(0,I)$, $x=Bz+\mu+\epsilon$ |
| « Quelle est la vraisemblance de la PPCA ? » | **§10.7.2** | $\mathcal N(x\mid\mu,\ BB^\top+\sigma^2I)$ |
| « Encoder probabilistiquement » | **§10.7.3** | $p(z\mid x)=\mathcal N(m,C)$ par **conditionnement gaussien** |

## Comment résoudre : les cinq méthodes pas-à-pas

**Méthode A — Faire une ACP complète.**

1. **Centrer** : $x_n\leftarrow x_n-\mu$.
2. **Standardiser** : $x_n^{(d)}\leftarrow x_n^{(d)}/\sigma_d$.
3. $S=\frac1NXX^\top$ ; vérifier la **symétrie**.
4. **Eigendécomposition** ; trier les $\lambda$ par ordre **décroissant**.
5. $B=$ les $M$ premiers vecteurs propres **en colonnes**.
6. **Coder** : $z_n=B^\top x_n$.
7. **Contrôles** : $\sum_m\lambda_m=\operatorname{tr}(S)$ ; variance du code $=\sum_{m\leqslant M}\lambda_m$ ; $J_M=\sum_{j>M}\lambda_j$.

**Méthode B — Choisir $M$.**

1. Tracer les $\lambda_m$ par ordre décroissant (le **spectre**).
2. Chercher le « **coude** » — la chute rapide.
3. Calculer la **variance cumulée** $\frac{\sum_{m\leqslant M}\lambda_m}{\operatorname{tr}S}$.
4. Choisir $M$ pour un seuil (90 %, 95 %…).
5. **Contrôle** : la variance perdue est **exactement** l'erreur de reconstruction.

**Méthode C — Dériver l'ACP par la variance maximale.**

1. Écrire $V_1=b_1^\top Sb_1$ en développant $\frac1N\sum(b_1^\top x_n)^2$.
2. **Imposer $\lVert b_1\rVert^2=1$**, sinon le problème est **non borné**.
3. Lagrangien $\mathfrak L=b_1^\top Sb_1+\lambda_1(1-b_1^\top b_1)$.
4. Annuler les deux dérivées partielles.
5. Reconnaître **l'équation aux valeurs propres**.
6. Conclure $V_1=\lambda_1$ : **prendre la plus grande**.

**Méthode D — Dériver l'ACP par la projection.**

1. Décomposer $x$ sur une ONB complète : partie **retenue** $+$ partie **abandonnée**.
2. Dériver $J_M$ par rapport à $z_{in}$ ; annuler $\Rightarrow z_{in}=b_i^\top x_n$.
3. Réinjecter : $\tilde x_n=BB^\top x_n$, donc $x_n-\tilde x_n=\big(\sum_{j>M}b_jb_j^\top\big)x_n$.
4. Développer $J_M$ en exploitant **l'orthonormalité**.
5. Échanger les sommes pour faire apparaître $S$.
6. Utiliser la **trace** et son invariance cyclique.
7. Conclure : **même problème** que la variance maximale.

**Méthode E — PPCA.**

1. Écrire le processus génératif.
2. **Marginaliser $z$** pour la vraisemblance ; utiliser $\mathbb E[Ax+b]=A\mu+b$ et $\mathbb V[Ax]=A\Sigma A^\top$.
3. Calculer la **covariance croisée** $\operatorname{Cov}[x,z]=B$.
4. Assembler la **jointe en blocs**.
5. **Conditionner** (§6.5.1) pour $p(z\mid x)$.
6. **Contrôle** : $C$ **ne dépend pas de $x$**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Oublier de centrer les données | $S=\frac1N\sum x_nx_n^\top$ n'est la covariance **que si la moyenne est $0$** |
| Croire que le centrage change la solution | **NON** : $\mathbb V[B^\top(x-\mu)]=\mathbb V[B^\top x]$ — c'est **sans perte de généralité** |
| Ranger les $x_n$ en lignes de $X$ | Dans **ce chapitre**, $X$ est **$D\times N$** — les points sont des **COLONNES** |
| Maximiser $b^\top Sb$ sans contrainte | Le problème serait **NON BORNÉ** : doubler $b$ **quadruple** l'objectif |
| Prendre le **plus PETIT** vecteur propre | On veut la **variance MAXIMALE**, donc la **plus GRANDE** valeur propre |
| Croire que $\hat S$ a d'autres vecteurs propres que $S$ | **Les mêmes** — seules les valeurs propres des CP déjà extraites passent à **$0$** |
| Croire que les deux perspectives donnent des résultats différents | **La MÊME solution** : minimiser l'erreur $\equiv$ maximiser la variance |
| Confondre variance retenue et erreur | Retenue $=\sum_{m\leqslant M}\lambda_m$ ; erreur $=\sum_{j>M}\lambda_j$ ; **somme $=\operatorname{tr}S$** |
| Croire que $BB^\top=I$ | **NON** : $B^\top B=I_M$ (colonnes orthonormées), mais $BB^\top$ est une **projection de rang $M$**, **singulière** |
| Croire que le vecteur d'erreur est arbitraire | Il vit **ENTIÈREMENT** dans le complément orthogonal |
| Rendre l'ACP $\tilde x$ au lieu de $z$ | *« L'ACP renvoie **les COORDONNÉES $z_*$**, pas les projections »* |
| Confondre $\lambda_i$ et $\sigma_i$ | $\lambda_i=\sigma_i^2$ — les valeurs propres sont les **CARRÉS** des valeurs singulières |
| Chercher les valeurs propres par le polynôme caractéristique | **Impossible** au-delà de $4\times4$ — **théorème d'ABEL-RUFFINI** |
| Calculer la décomposition complète pour $M$ petit | **Gaspillage** : préférer les méthodes **itératives** |
| Démarrer l'itération de la puissance dans le noyau de $S$ | Le livre l'exige explicitement : $x_0$ **hors du noyau** |
| Oublier de normaliser à chaque itération de la puissance | La suite **diverge ou s'effondre** sans normalisation |
| Diagonaliser $XX^\top$ quand $N\ll D$ | Diagonaliser $X^\top X$ ($N\times N$) : **mêmes valeurs propres non nulles** |
| Standardiser un point de test avec ses propres statistiques | Utiliser **la moyenne et l'écart-type d'ENTRAÎNEMENT** |
| Oublier de dé-standardiser | $BB^\top x_*$ vit dans **l'espace STANDARDISÉ** |
| Utiliser $p(x\mid z)$ pour le maximum de vraisemblance | Elle **dépend encore de $z$** — il faut **marginaliser** |
| Écrire $\mathbb V[x]=B^\top B+\sigma^2I$ | C'est $BB^\top+\sigma^2I$ — une matrice **$D\times D$** |
| Croire que $C$ dépend de l'observation | *« La covariance a posteriori **NE DÉPEND PAS** des données observées $x$ »* |
| Croire que la PPCA remplace l'ACP | L'ACP classique est le **CAS PARTICULIER sans bruit** de la PPCA |

## 📌 Ultimate Review

```
════════ LES SEPT FORMULES À SAVOIR SANS HÉSITER ════════
  1.  S = (1/N) Σn xn xnᵀ = (1/N) X Xᵀ          ⚠️ données CENTRÉES, X est D×N
  2.  CODE  z = Bᵀ x        RECONSTRUCTION  x̃ = B Bᵀ x
  3.  S b_m = λ_m b_m       et       V_m = b_mᵀ S b_m = λ_m
  4.  VARIANCE RETENUE = λ1 + … + λM
      ERREUR J_M = Σ_{j=M+1..D} λ_j            ⚠️ somme + retenue = tr(S)
  5.  COORDONNÉES OPTIMALES  z_in = b_iᵀ x_n   ← projection ORTHOGONALE
      x_n − x̃_n = (Σ_{j>M} b_j b_jᵀ) x_n       ← COMPLÉMENT ORTHOGONAL
  6.  SVD  X = U Σ Vᵀ  →  λi = σi²  et  B = U_M
      GRANDE DIM.  diagonaliser (1/N) XᵀX ∈ R^(N×N) ,  c_m = Xᵀ b_m
      PUISSANCE   x_{k+1} = S x_k / ‖S x_k‖
  7.  PPCA  z ~ N(0,I) ,  x = Bz + µ + ε
      p(x) = N(µ , BBᵀ + σ² I)
      p(z|x) = N( Bᵀ(BBᵀ+σ²I)⁻¹(x−µ) ,  I − Bᵀ(BBᵀ+σ²I)⁻¹B )
═════════════════════════════════════════════════════════
```

**LES DEUX PERSPECTIVES — même point d'arrivée :**

|  | **VARIANCE MAXIMALE** (§10.2) | **PROJECTION** (§10.3) |
|---|---|---|
| Objectif | $\max b^\top Sb$ s.c. $\lVert b\rVert=1$ | $\min\frac1N\sum_n\lVert x_n-\tilde x_n\rVert^2$ |
| Outil | **Multiplicateurs de Lagrange** (ch. 7) | **Dérivation** puis **trace** (ch. 5, 4) |
| Ce qu'on **retient** | $\sum_{m\leqslant M}\lambda_m$ | — |
| Ce qu'on **perd** | — | $\sum_{j>M}\lambda_j$ |
| Interprétation | Conserver **l'information** | **Auto-encodeur linéaire optimal** |
| Solution | **LES MÊMES $M$ vecteurs propres dominants de $S$** | **IDEM** |

**Ce que chaque chapitre antérieur apporte ici :**

| Chapitre | Ce qu'il fournit |
|---|---|
| **2** — base, changement de base | Le **code** comme coordonnées dans une nouvelle base |
| **3** — projections | $\tilde x=BB^\top x$, le **complément orthogonal**, l'ONB |
| **4** — valeurs propres, SVD | **La solution elle-même** · $\lambda_i=\sigma_i^2$ · **Eckart-Young** · trace $=\sum\lambda_i$ |
| **6** — gaussiennes | La **PPCA**, le conditionnement, les transformations affines |
| **7** — optimisation sous contraintes | Le **lagrangien** de la variance maximale |
| **8** — variables latentes | Le cadre de la **PPCA** et de l'algorithme EM |

**Les trois lectures d'une valeur propre $\lambda_m$ :**

| Lecture | Énoncé |
|---|---|
| **Variance** | La **variance des données projetées** sur $b_m$ |
| **Erreur** | Si $b_m$ est **abandonné**, sa contribution **exacte** à l'erreur de reconstruction |
| **Singulière** | $\lambda_m=\sigma_m^2$, le carré de la $m$-ième valeur singulière de $X$ |

## 🧠 Active Recall

**Cadre**

1. Écrire la matrice de covariance. Quelle hypothèse sur les données ?
2. Écrire le code et la reconstruction. Dans quels espaces vivent-ils ?
3. Quelle condition sur les colonnes de $B$ ?
4. Pourquoi $\tilde x_n$ a-t-il $D$ composantes mais une seule coordonnée pour $M=1$ ?
5. Quelle convention de notation ce chapitre adopte-t-il pour $X$ ? Pourquoi ?

**Variance maximale** 6. Pourquoi la variance mesure-t-elle l'information ? 7. Montrer que le centrage est sans perte de généralité. 8. Dériver $V_1=b_1^\top Sb_1$. 9. Pourquoi faut-il la contrainte $\lVert b_1\rVert^2=1$ ? 10. Écrire le lagrangien et ses deux dérivées partielles. 11. Que révèle l'annulation ? Quel est le rôle de $\lambda_1$ ? 12. Que vaut $V_1$ ? Quelle est la conclusion ? 13. Qu'est-ce que le chargement ? 14. Comment obtient-on la $m$-ième composante ? Qu'est-ce que $\hat X$ ? 15. Que valent $B_{m-1}b_i$ dans les deux cas ? 16. Quelle est la relation entre les vecteurs propres de $S$ et $\hat S$ ? 17. Que vaut la variance retenue par $M$ composantes ?

**Projection** 18. Écrire l'erreur de reconstruction. Quelle est la stratégie en deux temps ? 19. Dériver les coordonnées optimales. Quelle interprétation géométrique ? 20. Où vit le vecteur $x_n-\tilde x_n$ ? 21. Quelles sont les propriétés de $BB^\top$ ? 22. Quel lien avec l'approximation de rang faible de $I$ ? 23. Reformuler $J_M$ avec la trace. 24. Énoncer l'équivalence des deux perspectives. 25. Écrire l'équation (10.62).

**Calcul** 26. Quelles sont les deux voies de calcul ? Quel est le lien $\lambda_i$–$\sigma_i$ ? 27. Énoncer Eckart-Young appliqué à l'ACP. 28. Pourquoi ne peut-on pas passer par le polynôme caractéristique ? 29. Décrire l'itération de la puissance. Quelle condition sur $x_0$ ? 30. Décrire l'astuce de la grande dimension. Quel gain ?

**Pratique et PPCA** 31. Citer les cinq étapes de l'ACP en pratique. 32. Que renvoie l'ACP exactement ? 33. Comment standardiser un point de test ? 34. Citer cinq des neuf raisons d'une ACP probabiliste. 35. Écrire le processus génératif de la PPCA. 36. Qu'est-ce que l'échantillonnage ancestral ? 37. Dériver la vraisemblance de la PPCA. 38. Pourquoi ne peut-on pas utiliser $p(x\mid z)$ ? 39. Écrire la loi jointe en blocs. Que vaut $\operatorname{Cov}[x,z]$ ? 40. Écrire l'a posteriori latente. Quelle particularité de $C$ ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Autre nom de l'ACP en traitement du signal ? | La transformée de **KARHUNEN-LOÈVE** |
| Matrice de covariance des données ? | $S=\frac1N\sum_nx_nx_n^\top=\frac1NXX^\top$ — données **CENTRÉES** |
| Le code ? | $z_n=B^\top x_n\in\mathbb R^M$ |
| La reconstruction ? | $\tilde x_n=BB^\top x_n\in\mathbb R^D$ |
| Condition sur $B$ ? | Colonnes **ORTHONORMÉES** : $B^\top B=I_M$ |
| Que renvoie l'ACP ? | Les **COORDONNÉES $z$**, **PAS** les projections $\tilde x$ |
| Convention sur $X$ dans ce chapitre ? | $X\in\mathbb R^{D\times N}$ — les points sont les **COLONNES** |
| Pourquoi ? | Les opérations algébriques **se déroulent sans transposer** |
| Pourquoi la variance mesure-t-elle l'information ? | Elle mesure l'**ÉTALEMENT** — le caractère « remplissant l'espace » |
| Le centrage change-t-il la solution ? | **NON** : $\mathbb V[B^\top(x-\mu)]=\mathbb V[B^\top x]$ |
| $V_1$ en fonction de $S$ ? | $V_1=b_1^\top Sb_1$ |
| Pourquoi la contrainte $\lVert b_1\rVert=1$ ? | Sinon **non borné** : un $b$ deux fois plus long **quadruple** $V_1$ |
| Le lagrangien ? | $\mathfrak L=b_1^\top Sb_1+\lambda_1(1-b_1^\top b_1)$ |
| Ce que donne l'annulation ? | **$Sb_1=\lambda_1b_1$** — une **équation aux valeurs propres** |
| Le rôle du multiplicateur $\lambda_1$ ? | Il **EST la VALEUR PROPRE** |
| Que vaut $V_1$ ? | **$\lambda_1$** — la variance **EST** la valeur propre |
| Quelle valeur propre choisir ? | **LA PLUS GRANDE** |
| Première composante principale ? | Le vecteur propre de $S$ associé à $\lambda_{\max}$ |
| Le chargement (*loading*) ? | $\sqrt{\lambda_1}$ — l'**ÉCART-TYPE** pris en compte par le sous-espace |
| Comment trouver la $m$-ième CP ? | En **SOUSTRAYANT l'effet** des $m-1$ premières : $\hat X=X-B_{m-1}X$ |
| Que contient $\hat X$ ? | L'information **PAS ENCORE compressée** |
| $B_{m-1}b_i$ pour $i<m$ ? | $=b_i$ |
| $B_{m-1}b_i$ pour $i\geqslant m$ ? | $=0$ |
| Vecteurs propres de $S$ et $\hat S$ ? | **IDENTIQUES** ; mais ceux du sous-espace principal ont **valeur propre $0$** pour $\hat S$ |
| Que vaut $V_m$ ? | $\lambda_m$ |
| Variance retenue par $M$ composantes ? | $\sum_{m=1}^{M}\lambda_m$ |
| L'erreur de reconstruction ? | $J_M=\frac1N\sum_n\lVert x_n-\tilde x_n\rVert^2$ |
| Son autre nom ? | L'**auto-encodeur linéaire optimal** (Pearson, 1901) |
| Les coordonnées optimales ? | $z_{in}=b_i^\top x_n$ — la **PROJECTION ORTHOGONALE** |
| Où vit $x_n-\tilde x_n$ ? | **ENTIÈREMENT** dans le **COMPLÉMENT ORTHOGONAL** |
| Sa formule ? | $\big(\sum_{j=M+1}^{D}b_jb_j^\top\big)x_n$ |
| Les trois propriétés de $BB^\top$ ? | **Symétrique** · **idempotente** · de **RANG $M$** |
| Sa trace ? | $M$ |
| Le lien avec l'approximation de rang faible ? | Trouver $B$ $\equiv$ trouver la **meilleure approximation de rang $M$ de l'IDENTITÉ** |
| $J_M$ avec la trace ? | $\operatorname{tr}\big(\big(\sum_{j>M}b_jb_j^\top\big)S\big)$ |
| L'équivalence des deux perspectives ? | **Minimiser l'erreur $\equiv$ maximiser la variance retenue** |
| L'équation (10.62) ? | $J_M=\sum_{i=M+1}^{D}\lambda_i$ — la **somme des vp ABANDONNÉES** |
| Le contrôle de cohérence ? | **Variance retenue $+$ erreur $=\operatorname{tr}(S)$** |
| Les deux voies de calcul ? | **Eigendécomposition** de $S$ · **SVD** de $X$ |
| Le lien $\lambda$–$\sigma$ ? | $\lambda_i=\sigma_i^2$ |
| Eckart-Young appliqué ? | La meilleure approximation de rang $M$ est la **SVD TRONQUÉE** $U_M\Sigma_MV_M^\top$ |
| Pourquoi pas le polynôme caractéristique ? | **ABEL-RUFFINI** : pas de solution algébrique au-delà du degré 4 |
| L'itération de la puissance ? | $x_{k+1}=\dfrac{Sx_k}{\lVert Sx_k\rVert}$ |
| Vers quoi converge-t-elle ? | Le vecteur propre de **plus grande** valeur propre |
| La condition sur $x_0$ ? | **Hors du NOYAU** de $S$ |
| Le problème en grande dimension ? | Le coût est **CUBIQUE en $D$** |
| L'astuce quand $N\ll D$ ? | Diagonaliser $\frac1NX^\top X\in\mathbb R^{N\times N}$ |
| Pourquoi ça marche ? | **MÊMES valeurs propres NON NULLES** que $S$ |
| Comment retrouver $b_m$ ? | Via $c_m=X^\top b_m$, en remultipliant par $X$ et en normalisant |
| Les cinq étapes en pratique ? | **1.** centrer **2.** standardiser **3.** eigendécomposition **4.** projeter **5.** dé-standardiser |
| Le centrage est-il indispensable ? | Pas strictement, mais il **réduit le risque de problèmes NUMÉRIQUES** |
| Qu'apporte la standardisation ? | Données **SANS UNITÉ**, de **variance 1** sur chaque axe |
| Standardiser un point de test ? | Avec la moyenne et l'écart-type **d'ENTRAÎNEMENT** |
| MNIST : combien de dimensions ? | $28\times28=784$ pixels, donc $x\in\mathbb R^{784}$ |
| Reconstruction avec 1 CP ? | *« À moitié décente, mais **FLOUE et GÉNÉRIQUE** »* |
| Avec 784 CP ? | Le chiffre **EXACT, sans aucune perte** |
| Neuf raisons de la PPCA ? | Vraisemblance · comparaison bayésienne · **modèle GÉNÉRATIF** · connexions · **données manquantes** · nouveauté · extensions · ACP comme **cas particulier** · traitement pleinement bayésien |
| Qui a proposé la PPCA ? | **Tipping et Bishop (1999)** |
| L'a priori latente ? | $z\sim\mathcal N(0,I)$ |
| Le lien latent-observé ? | $x=Bz+\mu+\epsilon$ avec $\epsilon\sim\mathcal N(0,\sigma^2I)$ |
| L'échantillonnage ancestral ? | Échantillonner **$z_n$ D'ABORD**, puis $x_n$ **conditionné** sur $z_n$ |
| La vraisemblance de la PPCA ? | $p(x)=\mathcal N(x\mid\mu,\ BB^\top+\sigma^2I)$ |
| Sa moyenne ? | $\mu$ |
| Sa covariance ? | $BB^\top+\sigma^2I$ |
| Pourquoi pas $p(x\mid z)$ pour le MLE ? | Elle **dépend encore des variables LATENTES** |
| $\operatorname{Cov}[x,z]$ ? | $B$ |
| La loi jointe ? | $\mathcal N\!\left(\begin{bmatrix}\mu\\0\end{bmatrix},\begin{bmatrix}BB^\top+\sigma^2I&B\\B^\top&I\end{bmatrix}\right)$ |
| Sa taille ? | Moyenne de longueur $D+M$, covariance $(D+M)\times(D+M)$ |
| L'a posteriori latente ? | $p(z\mid x)=\mathcal N(m,C)$ |
| $m$ ? | $B^\top(BB^\top+\sigma^2I)^{-1}(x-\mu)$ |
| $C$ ? | $I-B^\top(BB^\top+\sigma^2I)^{-1}B$ |
| La particularité de $C$ ? | Elle **NE DÉPEND PAS des données observées $x$** |
| À quoi sert $C$ ? | Évaluer la **CONFIANCE** dans l'encodage |
| L'ACP classique dans ce cadre ? | Le **cas particulier du maximum de vraisemblance SANS BRUIT** |
