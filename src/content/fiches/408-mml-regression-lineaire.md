# Fiche 408 — Régression linéaire : MLE, MAP, régression bayésienne, projection orthogonale

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 9 « Linear Regression » (p. 289-320) |
| **Difficulté** | Avancé — le **premier pilier**, celui qui mobilise les six fondations d'un coup |
| **Temps d'étude estimé** | 140 min |
| **Prérequis** | Fiche 402 (projection orthogonale, équation normale) · Fiche 405 (gaussiennes, conjugaison) · Fiche 407 (MLE, MAP, régularisation) |
| **Concepts clés** | Modèle de régression, vraisemblance gaussienne, bruit i.i.d., linéarité **en les paramètres**, matrice de conception, estimateur du maximum de vraisemblance, équations normales, application d'attributs, régression polynomiale, matrice d'attributs, estimation de la variance du bruit, RMSE, surapprentissage, estimation MAP, a priori gaussien, moindres carrés régularisés, LASSO, régression linéaire bayésienne, prédictions a priori, loi a posteriori des paramètres, prédictions a posteriori, loi sur les fonctions, vraisemblance marginale, projection orthogonale |
| **Poids à l'examen** | $\theta_{\text{ML}}=(\Phi^\top\Phi)^{-1}\Phi^\top y$ · $\theta_{\text{MAP}}=\big(\Phi^\top\Phi+\tfrac{\sigma^2}{b^2}I\big)^{-1}\Phi^\top y$ · $\sigma^2_{\text{ML}}=\tfrac1N\sum_n(y_n-\phi^\top(x_n)\theta)^2$ · le **théorème 9.1** ($S_N$, $m_N$) · $p(y_*\mid\mathcal X,\mathcal Y,x_*)=\mathcal N\big(\phi^\top(x_*)m_N,\ \phi^\top(x_*)S_N\phi(x_*)+\sigma^2\big)$ · **MLE $=$ PROJECTION ORTHOGONALE**. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : trois niveaux de sophistication sur le MÊME modèle

  §9.1 FORMULATION      y = f(x) + ε ,  ε ~ N(0, σ²)  i.i.d.
        VRAISEMBLANCE   p(y | x, θ) = N(y | φᵀ(x)θ, σ²)
        ⚠️ « LINÉAIRE » veut dire LINÉAIRE EN LES PARAMÈTRES — pas en x
  §9.2 ESTIMATION PONCTUELLE
        MLE   L(θ) = (1/2σ²)‖y − Φθ‖²        →  θML = (ΦᵀΦ)⁻¹ Φᵀ y   ← ÉQUATIONS NORMALES
              σ²ML = (1/N) Σn (yn − φᵀ(xn)θ)²
              ⚠️ SURAPPRENTISSAGE : à M = N−1 le polynôme passe par CHAQUE point
              RMSE = √((1/N)‖y − Φθ‖²)   ← comparable entre jeux, MÊMES UNITÉS que y
        MAP   a priori N(0, b²I)   →  θMAP = (ΦᵀΦ + (σ²/b²) I)⁻¹ Φᵀ y
              ⚠️ SEULE différence : le terme (σ²/b²)I qui rend l'inverse TOUJOURS possible
        RLS   min ‖y − Φθ‖² + λ‖θ‖²  →  θRLS = (ΦᵀΦ + λI)⁻¹ Φᵀ y
              ⚠️ IDENTIQUE au MAP pour λ = σ²/b²
  §9.3 RÉGRESSION LINÉAIRE BAYÉSIENNE — on ne fixe PLUS aucun paramètre
        MODÈLE      p(θ) = N(m0, S0)      p(y|x,θ) = N(y | φᵀ(x)θ, σ²)
        A PRIORI    p(y* | x*) = N(φᵀ(x*)m0 , φᵀ(x*)S0φ(x*) + σ²)
        A POSTERIORI (Th. 9.1)   SN = (S0⁻¹ + σ⁻² ΦᵀΦ)⁻¹ ,  mN = SN(S0⁻¹m0 + σ⁻²Φᵀy)
        PRÉDICTION  p(y*|X,Y,x*) = N(φᵀ(x*)mN , φᵀ(x*)SN φ(x*) + σ²)
                    ⚠️ la MOYENNE prédictive COÏNCIDE avec la prédiction du MAP
        SANS BRUIT  même moyenne, variance SANS le +σ²
        VRAISEMBLANCE MARGINALE   p(Y|X) = N(y | X m0 , X S0 Xᵀ + σ²I)
  §9.4 GÉOMÉTRIE      MLE = PROJECTION ORTHOGONALE de y sur l'espace des COLONNES de Φ
        Pπ = Φ(ΦᵀΦ)⁻¹Φᵀ    ·   si les φk sont ORTHONORMÉES, Pπ = ΦΦᵀ

LA HIÉRARCHIE DES TROIS RÉPONSES
  MLE   un point                  · sur-apprend en régime de petites données
  MAP   un point BIAISÉ           · l'a priori JOUE le rôle du régularisateur
  BAYES une LOI COMPLÈTE          · aucune estimation, on MOYENNE sur tous les θ plausibles
```

> **Le programme du chapitre.** Après le pont du chapitre 8, la régression linéaire est le **premier pilier** — et le seul où **tout est calculable en forme fermée**. Elle mobilise l'**algèbre linéaire** (ch. 2), la **projection orthogonale** (ch. 3), le **calcul de gradients** (ch. 5), les **gaussiennes et la conjugaison** (ch. 6) et l'**optimisation** (ch. 7).

## 🔴 Concept 1 — La formulation du problème (§9.1)

### 1.1 Le modèle

$$\boxed{\;p(y\mid x)=\mathcal N\big(y\mid f(x),\ \sigma^2\big)\quad\Longleftrightarrow\quad y=f(x)+\epsilon,\qquad\epsilon\sim\mathcal N(0,\sigma^2)\;}$$

avec $x\in\mathbb R^D$ les **entrées** et $y\in\mathbb R$ les **valeurs de fonction bruitées** (les **cibles**). Le bruit $\epsilon$ est **i.i.d. gaussien** de moyenne $0$ et variance $\sigma^2$.

> **L'objectif.** *« Trouver une fonction **PROCHE de la fonction INCONNUE $f$** qui a généré les données et **qui GÉNÉRALISE bien**. »*

**Le cas linéaire :**

$$\boxed{\;p(y\mid x,\theta)=\mathcal N\big(y\mid x^\top\theta,\ \sigma^2\big)\quad\Longleftrightarrow\quad y=x^\top\theta+\epsilon\;}$$

> ⚠️ **LA DÉFINITION EXACTE DE « LINÉAIRE ».** *« La régression linéaire désigne les modèles qui sont **"LINÉAIRES EN LES PARAMÈTRES"**, c'est-à-dire les modèles qui décrivent une fonction par une **COMBINAISON LINÉAIRE D'ATTRIBUTS d'entrée**. »* Un **attribut** est une **représentation $\phi(x)$** des entrées $x$.
>
> $$\boxed{\;y=\phi^\top(x)\theta+\epsilon\ \text{ EST une régression linéaire, même si }\phi\text{ est NON LINÉAIRE}\;}$$

**Exemple 9.1.** Pour $x,\theta\in\mathbb R$, le modèle décrit des **droites passant par l'origine**, et $\theta$ est la **PENTE**.

> ⚠️ **La seule source d'incertitude.** *« La seule source d'incertitude vient du **BRUIT D'OBSERVATION** (puisque $x$ et $\theta$ sont supposés connus). **Sans bruit d'observation**, la relation entre $x$ et $y$ serait **DÉTERMINISTE** et la vraisemblance serait un **DELTA DE DIRAC** »* — une fonction nulle partout sauf en un point, d'intégrale 1, qu'on peut voir comme une gaussienne à la limite $\sigma^2\to0$.

**Les hypothèses de travail :** on considère des **modèles PARAMÉTRIQUES**, et *« pour le moment, on suppose que la variance du bruit $\sigma^2$ est **CONNUE** »*.

### 1.2 La factorisation de la vraisemblance

Avec $\mathcal D:=\{(x_1,y_1),\dots,(x_N,y_N)\}$ :

> **La clé graphique.** *« $y_i$ et $y_j$ sont **CONDITIONNELLEMENT INDÉPENDANTES sachant leurs entrées respectives** $x_i,x_j$, de sorte que la vraisemblance **SE FACTORISE** »* :

$$\boxed{\;p(\mathcal Y\mid\mathcal X,\theta)=\prod_{n=1}^{N}p(y_n\mid x_n,\theta)=\prod_{n=1}^{N}\mathcal N\big(y_n\mid x_n^\top\theta,\ \sigma^2\big)\;}$$

Et une fois $\theta^*$ trouvé, la prédiction en une entrée de test $x_*$ est

$$p(y_*\mid x_*,\theta^*)=\mathcal N\big(y_*\mid x_*^\top\theta^*,\ \sigma^2\big)$$

*Le modèle graphique (figure 9.3) : $\theta$ et $\sigma$ en haut, une **plaque** sur $n=1,\dots,N$ contenant $x_n$ et $y_n$ ; les variables **observées** sont **grisées**, les valeurs **déterministes/connues** sont **sans cercle**.*

## 🔴 Concept 2 — Le maximum de vraisemblance (§9.2.1)

### 2.1 La dérivation

$$\theta_{\text{ML}}\in\arg\max_\theta p(\mathcal Y\mid\mathcal X,\theta)$$

> ⚠️ **LA REMARQUE À CONNAÎTRE.** *« La vraisemblance $p(y\mid x,\theta)$ **n'est PAS une loi de probabilité en $\theta$** : c'est simplement une **FONCTION** des paramètres, elle **n'intègre PAS à 1** (elle est non normalisée), et elle **peut même ne pas être INTÉGRABLE** par rapport à $\theta$. En revanche, la vraisemblance **EST une loi normalisée en $y$**. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi la transformation logarithmique</span>

(deux raisons données) :

- **(a)** *« Elle **ne souffre PAS de SOUS-DÉBORDEMENT NUMÉRIQUE** (*underflow*) »* — un produit de $N$ densités devient vite inférieur à la précision machine.
- **(b)** *« Les règles de dérivation se révéleront **PLUS SIMPLES** »* — un produit devient une somme.

</div>

**La log-vraisemblance négative :**

$$\boxed{\;L(\theta):=\frac{1}{2\sigma^2}\sum_{n=1}^{N}(y_n-x_n^\top\theta)^2=\frac{1}{2\sigma^2}(y-X\theta)^\top(y-X\theta)=\frac{1}{2\sigma^2}\lVert y-X\theta\rVert^2\;}$$

*« La log-vraisemblance négative est aussi appelée la **FONCTION D'ERREUR**. »*

| Objet | Définition |
|---|---|
| **Matrice de conception** (*design matrix*) | $X:=[x_1,\dots,x_N]^\top\in\mathbb R^{N\times D}$ — **la $n$-ième LIGNE est l'entrée $x_n$** |
| Vecteur des cibles | $y:=[y_1,\dots,y_N]^\top\in\mathbb R^N$ |

> **L'observation décisive.** *« $L$ est **QUADRATIQUE en $\theta$**. Cela signifie qu'on peut trouver une **solution GLOBALE UNIQUE** $\theta_{\text{ML}}$. »*

**Le gradient :**

$$\frac{dL}{d\theta}=\frac{1}{2\sigma^2}\frac{d}{d\theta}\big(y^\top y-2y^\top X\theta+\theta^\top X^\top X\theta\big)=\frac{1}{\sigma^2}\big(-y^\top X+\theta^\top X^\top X\big)\in\mathbb R^{1\times D}$$

**L'annulation :**

$$\frac{dL}{d\theta}=0^\top\iff\theta_{\text{ML}}^\top X^\top X=y^\top X\iff\theta_{\text{ML}}^\top=y^\top X(X^\top X)^{-1}$$

$$\boxed{\;\theta_{\text{ML}}=(X^\top X)^{-1}X^\top y\;}$$

> ⚠️ **Les trois justifications à ne pas sauter :**
>
> 1. *« On a pu multiplier à droite par $(X^\top X)^{-1}$ parce que **$X^\top X$ est DÉFINIE POSITIVE si $\operatorname{rk}(X)=D$** »* — ce qui est le cas si $N\geqslant D$ *« en ignorant la possibilité de points de données dupliqués »*.
> 2. *« Annuler le gradient est une condition **NÉCESSAIRE ET SUFFISANTE**, et l'on obtient un **MINIMUM GLOBAL** puisque la hessienne $\nabla^2_\theta L(\theta)=X^\top X$ est **définie positive**. »*
> 3. *« La solution requiert de résoudre un **système linéaire** $A\theta=b$ avec $A=X^\top X$ et $b=X^\top y$. »* En pratique on **résout le système**, on **n'inverse pas** la matrice.

### 2.2 La régression polynomiale — Exemple 9.3

**L'application d'attributs.** *« On "**SOULÈVE**" l'espace d'entrée unidimensionnel original dans un espace d'attributs de dimension $K$ constitué de **tous les MONÔMES** $x^k$ »* :

$$\phi(x)=\big[\phi_0(x),\phi_1(x),\dots,\phi_{K-1}(x)\big]^\top=\big[1,x,x^2,x^3,\dots,x^{K-1}\big]^\top\in\mathbb R^K$$

$$\boxed{\;f(x)=\sum_{k=0}^{K-1}\theta_kx^k=\phi^\top(x)\theta\;}$$

**La matrice d'attributs** (aussi appelée **matrice de conception**) :

$$\boxed{\;\Phi:=\begin{bmatrix}\phi^\top(x_1)\\\vdots\\\phi^\top(x_N)\end{bmatrix}=\begin{bmatrix}\phi_0(x_1)&\cdots&\phi_{K-1}(x_1)\\\vdots&&\vdots\\\phi_0(x_N)&\cdots&\phi_{K-1}(x_N)\end{bmatrix}\in\mathbb R^{N\times K},\qquad\Phi_{ij}=\phi_j(x_i)\;}$$

**La conséquence — il n'y a RIEN à refaire :**

$$-\log p(\mathcal Y\mid\mathcal X,\theta)=\frac{1}{2\sigma^2}(y-\Phi\theta)^\top(y-\Phi\theta)+\text{const}$$

> *« En comparant avec la log-vraisemblance négative du modèle "sans attributs", on voit immédiatement qu'il suffit de **REMPLACER $X$ par $\Phi$** »* :

$$\boxed{\;\theta_{\text{ML}}=(\Phi^\top\Phi)^{-1}\Phi^\top y\;}$$

⚠️ **La condition devient** $\operatorname{rk}(\Phi)=K$, pour que $\Phi^\top\Phi\in\mathbb R^{K\times K}$ soit **inversible**.

### 2.3 Estimer la variance du bruit

Même procédure : écrire la log-vraisemblance, dériver **par rapport à $\sigma^2$**, annuler, résoudre.

$$\log p(\mathcal Y\mid\mathcal X,\theta,\sigma^2)=-\frac N2\log\sigma^2-\frac{1}{2\sigma^2}\underbrace{\sum_{n=1}^{N}(y_n-\phi^\top(x_n)\theta)^2}_{=:s}+\text{const}$$

$$\frac{\partial}{\partial\sigma^2}=-\frac{N}{2\sigma^2}+\frac{1}{2\sigma^4}s=0\iff\frac{N}{2\sigma^2}=\frac{s}{2\sigma^4}$$

$$\boxed{\;\sigma^2_{\text{ML}}=\frac sN=\frac1N\sum_{n=1}^{N}\big(y_n-\phi^\top(x_n)\theta\big)^2\;}$$

> **L'interprétation.** *« L'estimation du maximum de vraisemblance de la variance du bruit est la **MOYENNE EMPIRIQUE des DISTANCES au CARRÉ** entre les valeurs de fonction **SANS BRUIT** $\phi^\top(x_n)\theta$ et les observations **BRUITÉES** correspondantes $y_n$. »*

<details class="details--riche">
<summary>

Contrôle numérique : $\sqrt{\sigma^2_{\text{ML}}}$ est exactement la RMSE d'entraînement

</summary>

Sur un jeu simulé de $N=10$ points ($f(x)=\sin x+0{,}3x$, bruit $\sigma=0{,}4$), ajustement polynomial de degré 4 :

$$\sigma^2_{\text{ML}}=0{,}094126\qquad\sqrt{\sigma^2_{\text{ML}}}=0{,}3068$$

et la RMSE d'entraînement calculée indépendamment vaut **$0{,}3068$** — les deux quantités **coïncident par construction**.

</details>

### 2.4 La RMSE et le surapprentissage

$$\boxed{\;\text{RMSE}=\sqrt{\frac1N\lVert y-\Phi\theta\rVert^2}=\sqrt{\frac1N\sum_{n=1}^{N}\big(y_n-\phi^\top(x_n)\theta\big)^2}\;}$$

> **Ses deux vertus.** *« (a) Elle permet de **COMPARER les erreurs de jeux de TAILLES DIFFÉRENTES** ; (b) elle a **la MÊME ÉCHELLE et les MÊMES UNITÉS** que les valeurs observées $y_n$. »* L'exemple du livre : si l'on ajuste un modèle codes postaux $\to$ prix immobiliers en EUR, *« la RMSE est **aussi en EUR**, alors que l'erreur quadratique est en **EUR au CARRÉ** »*. *« La log-vraisemblance négative, elle, est **SANS UNITÉ**. »*

**L'expérience de la figure 9.5-9.6** ($N=10$ points, test sur **200 points** sur une grille linéaire de $[-5,5]$) :

| Degré $M$ | Ce qu'on observe |
|---|---|
| $M=0,1$ | *« Ajustent **MAL** les données, mauvaises représentations de la vraie fonction »* — **SOUS-AJUSTEMENT** |
| $M=3,\dots,6$ | *« Les ajustements semblent **PLAUSIBLES** et interpolent les données de façon **LISSE** »* |
| $M$ grand | *« Ils ajustent les données **de mieux en mieux** »* — sur l'entraînement |
| $M=N-1=9$ | *« La fonction **PASSE PAR CHAQUE point de donnée**. Mais ces polynômes de haut degré **OSCILLENT SAUVAGEMENT** et sont une mauvaise représentation de la fonction sous-jacente : on souffre de **SURAPPRENTISSAGE**. »* |

**L'erreur de TEST, elle, raconte une autre histoire :** *« elle **décroît d'abord**... pour les polynômes d'ordre 4 elle est relativement basse et reste constante jusqu'au degré 5. **Mais à partir du degré 6 elle AUGMENTE SIGNIFICATIVEMENT**, et les polynômes d'ordre élevé ont de **très mauvaises propriétés de généralisation**. »*

<details><summary>Reproduction indépendante de la courbe train/test</summary>

Simulation ($N=10$ points d'entraînement, 200 de test, $\sigma=0{,}4$) :

| $M$ | RMSE entraînement | RMSE test |
|---|---|---|
| $0$ | $1{,}2148$ | $1{,}1032$ |
| $1$ | $0{,}8094$ | $0{,}8764$ |
| $3$ | $0{,}3339$ | $0{,}8436$ |
| $5$ | $0{,}1255$ | **$0{,}7795$** ← minimum |
| $7$ | $0{,}1071$ | $1{,}1490$ |
| $8$ | $0{,}0056$ | $8{,}5955$ |
| $9$ | **$0{,}0000$** | **$9{,}0400$** |

⚠️ **Les deux signatures du surapprentissage sont là** : l'erreur d'entraînement **décroît MONOTONEMENT** jusqu'à $0$ exactement en $M=N-1=9$, tandis que l'erreur de test **explose d'un facteur $\sim12$** à partir du degré 8.

</details>

> ⚠️ **Le cas $M=N-1$ est extrême** *« au sens où, autrement, le NOYAU du système linéaire correspondant serait non trivial et l'on aurait une INFINITÉ de solutions optimales »*. Et pour $M\geqslant N$ : *« on aurait **plus de paramètres que de points de données** et il faudrait résoudre un **système SOUS-DÉTERMINÉ** — $\Phi^\top\Phi$ ne serait **plus inversible** — donc une **infinité** d'estimateurs du maximum de vraisemblance. »*

## 🔴 Concept 3 — Le maximum a posteriori (§9.2.3-9.2.4)

### 3.1 La dérivation

> **Le diagnostic.** *« On observe souvent que la **MAGNITUDE des valeurs des paramètres devient RELATIVEMENT GRANDE** en cas de surapprentissage »* (Bishop, 2006). *« Pour atténuer l'effet d'énormes valeurs de paramètres, on peut placer une **loi A PRIORI $p(\theta)$**. »*

> **La lecture concrète d'un a priori.** *« Un a priori gaussien $p(\theta)=\mathcal N(0,1)$ sur un paramètre unique $\theta$ encode que les valeurs sont attendues dans l'intervalle $[-2,2]$ »* — **deux écarts-types** autour de la moyenne.

$$p(\theta\mid\mathcal X,\mathcal Y)=\frac{p(\mathcal Y\mid\mathcal X,\theta)p(\theta)}{p(\mathcal Y\mid\mathcal X)}$$

$$\log p(\theta\mid\mathcal X,\mathcal Y)=\log p(\mathcal Y\mid\mathcal X,\theta)+\log p(\theta)+\text{const}$$

> **Le compromis rendu visible.** *« La log-a-posteriori est la **SOMME** de la log-vraisemblance et du **LOG-A-PRIORI**, de sorte que l'estimation MAP sera un **"COMPROMIS" entre l'A PRIORI** (notre suggestion de valeurs plausibles **avant** d'observer les données) **et la VRAISEMBLANCE dépendante des données**. »*

$$\theta_{\text{MAP}}\in\arg\min_\theta\big\{-\log p(\mathcal Y\mid\mathcal X,\theta)-\log p(\theta)\big\}$$

**Avec l'a priori conjugué gaussien $p(\theta)=\mathcal N(0,b^2I)$** :

$$\boxed{\;\theta_{\text{MAP}}=\left(\Phi^\top\Phi+\frac{\sigma^2}{b^2}I\right)^{-1}\Phi^\top y\;}$$

> **LA COMPARAISON À RETENIR.** *« En comparant avec l'estimation du maximum de vraisemblance $\theta_{\text{ML}}=(\Phi^\top\Phi)^{-1}\Phi^\top y$, on voit que **la SEULE différence entre les deux solutions est le terme additionnel $\frac{\sigma^2}{b^2}I$** dans la matrice à inverser. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ce terme est décisif.</span>

⚠️ *« $\Phi^\top\Phi$ est symétrique et **SEMI**-définie positive. Le terme additionnel est **STRICTEMENT DÉFINI POSITIF**, de sorte que **l'INVERSE EXISTE** »* — la somme $\Phi^\top\Phi+\frac{\sigma^2}{b^2}I$ est *« symétrique et **strictement définie positive** : son inverse existe, et l'estimation MAP est **l'UNIQUE solution** d'un système linéaire. De plus, **elle reflète l'impact du RÉGULARISATEUR**. »*

</div>

$$\boxed{\;\text{L'a priori RÉSOUT à la fois le SURAPPRENTISSAGE ET l'éventuelle NON-INVERSIBILITÉ.}\;}$$

### 3.2 MAP $=$ moindres carrés régularisés

**Les moindres carrés régularisés :**

$$\boxed{\;\min_\theta\ \underbrace{\lVert y-\Phi\theta\rVert^2}_{\text{terme d'AJUSTEMENT (\emph{misfit})}}+\underbrace{\lambda\lVert\theta\rVert_2^2}_{\text{RÉGULARISATEUR}}\;}$$

avec $\lambda\geqslant0$ contrôlant *« la "**SÉVÉRITÉ**" de la régularisation »*. Le premier terme est *« **proportionnel à la log-vraisemblance négative** »*.

**La solution :**

$$\boxed{\;\theta_{\text{RLS}}=(\Phi^\top\Phi+\lambda I)^{-1}\Phi^\top y\;}$$

**L'IDENTITÉ EXACTE.** Avec $p(\theta)=\mathcal N(0,b^2I)$, le log-a-priori gaussien négatif vaut

$$-\log p(\theta)=\frac{1}{2b^2}\lVert\theta\rVert_2^2+\text{const}$$

$$\boxed{\;\text{Pour }\lambda=\frac{1}{2b^2},\ \text{le régularisateur ET le log-a-priori négatif sont IDENTIQUES}\;}$$

⚠️ Et en comparant les deux solutions : $\theta_{\text{RLS}}=\theta_{\text{MAP}}$ **exactement** lorsque $\lambda=\dfrac{\sigma^2}{b^2}$.

> **Le choix de la norme.** *« Au lieu de la norme euclidienne, on peut choisir **n'importe quelle $p$-norme**. En pratique, des **valeurs plus PETITES de $p$** conduisent à des solutions **plus PARCIMONIEUSES** — "parcimonieux" signifiant que **beaucoup de $\theta_d=0$**, ce qui est utile pour la **SÉLECTION DE VARIABLES**. Pour $p=1$, le régularisateur s'appelle le **LASSO** (*least absolute shrinkage and selection operator*), proposé par **Tibshirani (1996)**. »*

<details><summary>Double vérification numérique</summary>

**1. L'a priori réduit bien la magnitude.** Ajustement polynomial de degré 9 sur $N=10$ points :

$$\lVert\theta_{\text{ML}}\rVert=1{,}7638\qquad\lVert\theta_{\text{MAP}}\rVert=0{,}8652$$

⚠️ La norme est **divisée par 2** — exactement l'effet annoncé par le livre.

**2. MAP $=$ RLS, à la précision machine.** Avec $\lambda=\sigma^2/b^2=0{,}125$ et $K=5$, les deux calculs donnent

$$\theta=[-0{,}155749\ ;\ 1{,}030929\ ;\ 0{,}091578\ ;\ -0{,}058583\ ;\ -0{,}005083]$$

et la comparaison bit à bit renvoie **True**

</details>

## 🔴 Concept 4 — La régression linéaire bayésienne (§9.3)

### 4.1 Le changement de perspective

> **LE SAUT CONCEPTUEL.** *« La régression linéaire bayésienne pousse l'idée de l'a priori **UN CRAN PLUS LOIN** et **n'essaie même PAS de calculer une estimation ponctuelle** des paramètres : c'est la **LOI A POSTERIORI COMPLÈTE** qui est prise en compte pour faire des prédictions. **On n'AJUSTE aucun paramètre**, on calcule une **MOYENNE sur TOUS les réglages plausibles** (selon l'a posteriori). »*

**Le modèle :**

$$\boxed{\;\text{a priori : }p(\theta)=\mathcal N(m_0,S_0)\qquad\text{vraisemblance : }p(y\mid x,\theta)=\mathcal N\big(y\mid\phi^\top(x)\theta,\ \sigma^2\big)\;}$$

⚠️ *« On place explicitement un a priori gaussien sur $\theta$, ce qui **TRANSFORME le vecteur de paramètres en VARIABLE ALÉATOIRE**. »* Le modèle probabiliste complet est la **loi jointe** :

$$p(y,\theta\mid x)=p(y\mid x,\theta)\,p(\theta)$$

### 4.2 Les prédictions a priori

$$\boxed{\;p(y_*\mid x_*)=\int p(y_*\mid x_*,\theta)\,p(\theta)\,d\theta=\mathbb E_\theta\big[p(y_*\mid x_*,\theta)\big]\;}$$

*« La **prédiction MOYENNE** de $y_*\mid x_*,\theta$ pour tous les $\theta$ plausibles selon l'a priori. »* *« Les prédictions avec l'a priori ne requièrent de spécifier que l'entrée $x_*$, **AUCUNE donnée d'entraînement**. »*

**Le résultat, en forme fermée grâce à la conjugaison :**

$$\boxed{\;p(y_*\mid x_*)=\mathcal N\Big(\phi^\top(x_*)m_0,\ \ \phi^\top(x_*)S_0\phi(x_*)+\sigma^2\Big)\;}$$

**Les trois ingrédients de la dérivation :**

1. La prédiction est **gaussienne** par **CONJUGAISON** (§6.6) et par la propriété de **MARGINALISATION** des gaussiennes (§6.5).
2. Le bruit gaussien est **indépendant**, donc $\mathbb V[y_*]=\mathbb V_\theta[\phi^\top(x_*)\theta]+\mathbb V_\epsilon[\epsilon]$.
3. $y_*$ est une **transformation LINÉAIRE de $\theta$** : on applique (6.50) et (6.51), soit $A\mu$ et $A\Sigma A^\top$.

⚠️ **Le terme $\phi^\top(x_*)S_0\phi(x_*)$** est la contribution de l'incertitude **sur les paramètres** ; le $+\sigma^2$ est celle du **bruit de mesure**.

### 4.3 L'a posteriori des paramètres — le théorème 9.1

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 9.1 (A posteriori des paramètres).</span>

Dans le modèle (9.35), l'a posteriori se calcule **EN FORME FERMÉE** :

$$\boxed{\;p(\theta\mid\mathcal X,\mathcal Y)=\mathcal N(\theta\mid m_N,S_N)\;}$$

$$\boxed{\;S_N=\big(S_0^{-1}+\sigma^{-2}\Phi^\top\Phi\big)^{-1}\;}$$

$$\boxed{\;m_N=S_N\big(S_0^{-1}m_0+\sigma^{-2}\Phi^\top y\big)\;}$$

*« L'indice $N$ indique la **TAILLE de l'ensemble d'entraînement**. »*

</div>

**La vraisemblance marginale (évidence) au dénominateur :**

$$p(\mathcal Y\mid\mathcal X)=\int p(\mathcal Y\mid\mathcal X,\theta)p(\theta)\,d\theta=\mathbb E_\theta\big[p(\mathcal Y\mid\mathcal X,\theta)\big]$$

⚠️ *« Elle est **indépendante de $\theta$** et assure que l'a posteriori est **NORMALISÉ**. On peut y penser comme à la **vraisemblance MOYENNÉE sur tous les réglages possibles** de paramètres (selon l'a priori). »*

**La lecture des deux formules :**

| Formule | Lecture |
|---|---|
| $S_N^{-1}=S_0^{-1}+\sigma^{-2}\Phi^\top\Phi$ | Les **PRÉCISIONS S'AJOUTENT** : celle de l'a priori **plus** celle apportée par les données. La covariance a posteriori **ne peut que DIMINUER** |
| $m_N=S_N(S_0^{-1}m_0+\sigma^{-2}\Phi^\top y)$ | Une **moyenne PONDÉRÉE par les précisions** entre l'a priori $m_0$ et le terme de données $\Phi^\top y$ |

⚠️ **Le cas limite** : si $S_0=b^2I$ et $m_0=0$, on retrouve $m_N=\big(\Phi^\top\Phi+\frac{\sigma^2}{b^2}I\big)^{-1}\Phi^\top y=\theta_{\text{MAP}}$.

<details class="details--riche">
<summary>

Vérification que $m_N=\theta_{\text{MAP}}$ exactement

</summary>

Avec $K=4$, $\sigma^2=0{,}16$, $b^2=1$, $m_0=0$, $S_0=I$ :

|  | Valeurs |
|---|---|
| $m_N$ (par le théorème 9.1) | $[-0{,}00698999\ ;\ 1{,}02724769\ ;\ 0{,}0096369\ ;\ -0{,}0583119]$ |
| $\theta_{\text{MAP}}$ (par la formule 9.31) | $[-0{,}00698999\ ;\ 1{,}02724769\ ;\ 0{,}0096369\ ;\ -0{,}0583119]$ |

**Écart maximal : $0{,}0$** Les deux voies de calcul — inversion de $S_0^{-1}+\sigma^{-2}\Phi^\top\Phi$ d'un côté, formule directe de l'autre — **coïncident à la précision machine**.

</details>

### 4.4 Les prédictions a posteriori

$$\boxed{\;p(y_*\mid\mathcal X,\mathcal Y,x_*)=\int p(y_*\mid x_*,\theta)\,p(\theta\mid\mathcal X,\mathcal Y)\,d\theta=\mathcal N\Big(\phi^\top(x_*)m_N,\ \ \phi^\top(x_*)S_N\phi(x_*)+\sigma^2\Big)\;}$$

> **LE PONT AVEC LE MAP.** *« La **MOYENNE prédictive $\phi^\top(x_*)m_N$ COÏNCIDE avec les prédictions faites avec l'estimation MAP** $\theta_{\text{MAP}}$. »*
>
> $$\boxed{\;\mathbb E[y_*\mid\mathcal X,\mathcal Y,x_*]=\phi^\top(x_*)m_N=\phi^\top(x_*)\theta_{\text{MAP}}\;}$$
>
> **Ce que le MAP perd**, c'est donc **uniquement la VARIANCE** — le terme $\phi^\top(x_*)S_N\phi(x_*)$, qui *« reflète l'incertitude a posteriori associée aux paramètres »*. Noter que $S_N$ **dépend des entrées d'entraînement** via $\Phi$.

**Les valeurs de fonction SANS bruit.** Pour $f(x_*)=\phi^\top(x_*)\theta$ :

$$\mathbb E[f(x_*)\mid\mathcal X,\mathcal Y]=\phi^\top(x_*)m_N\qquad\mathbb V_\theta[f(x_*)\mid\mathcal X,\mathcal Y]=\phi^\top(x_*)S_N\phi(x_*)$$

> *« La moyenne prédictive est **LA MÊME** que pour les observations bruitées, puisque le bruit est de moyenne $0$. La variance prédictive ne diffère que de **$\sigma^2$** : quand on prédit des valeurs **bruitées**, il faut inclure $\sigma^2$ comme **source d'incertitude**, mais **PAS** pour les prédictions sans bruit — la seule incertitude restante vient alors de **l'a posteriori des paramètres**. »*

> **UNE LOI SUR LES FONCTIONS.** *« Le fait qu'on **INTÈGRE les paramètres INDUIT une LOI SUR LES FONCTIONS** : si l'on échantillonne $\theta_i\sim p(\theta\mid\mathcal X,\mathcal Y)$, on obtient **une réalisation de fonction** $\theta_i^\top\phi(\cdot)$. »* C'est le germe des **processus gaussiens**.

> ⚠️ **Marginale contre prédictive a posteriori — les DEUX différences.** *« (i) La vraisemblance marginale peut être vue comme **prédisant les cibles d'ENTRAÎNEMENT $y$**, et **non** les cibles de test $y_*$ ; (ii) la vraisemblance marginale moyenne **par rapport à l'A PRIORI**, et non à l'a posteriori. »*

### 4.5 La vraisemblance marginale

**Le processus génératif :** $\theta\sim\mathcal N(m_0,S_0)$, puis $y_n\mid x_n,\theta\sim\mathcal N(x_n^\top\theta,\sigma^2)$.

**Le calcul en deux étapes.**

**Étape 1 — montrer qu'elle est GAUSSIENNE.** *« (i) Le **produit de deux gaussiennes** est une gaussienne (non normalisée) ; (ii) une **transformation LINÉAIRE** d'une gaussienne est gaussienne. »* L'intégrale se résout alors en forme fermée et *« le résultat est **la CONSTANTE DE NORMALISATION** du produit des deux gaussiennes — laquelle a elle-même une forme gaussienne »*.

**Étape 2 — moyenne et covariance**, par les règles des transformations affines (§6.4.4) :

$$\mathbb E[\mathcal Y\mid\mathcal X]=\mathbb E_{\theta,\epsilon}[X\theta+\epsilon]=X\,\mathbb E_\theta[\theta]=Xm_0$$

$$\operatorname{Cov}[\mathcal Y\mid\mathcal X]=\operatorname{Cov}_\theta[X\theta]+\sigma^2I=X\operatorname{Cov}_\theta[\theta]X^\top+\sigma^2I=XS_0X^\top+\sigma^2I$$

$$\boxed{\;p(\mathcal Y\mid\mathcal X)=\mathcal N\big(y\mid Xm_0,\ XS_0X^\top+\sigma^2I\big)\;}$$

> *« Étant donné la proximité avec la loi prédictive a posteriori, la **forme fonctionnelle** de la vraisemblance marginale **ne devrait pas trop surprendre**. »*

## 🔴 Concept 5 — Le MLE comme projection orthogonale (§9.4)

### 5.1 Le cas unidimensionnel

Pour $y=x\theta+\epsilon$ — des droites $f:\mathbb R\to\mathbb R$ **passant par l'origine** :

$$\theta_{\text{ML}}=(X^\top X)^{-1}X^\top y=\frac{X^\top y}{X^\top X}\in\mathbb R$$

**La reconstruction optimale** des cibles d'entraînement :

$$\boxed{\;X\theta_{\text{ML}}=X\frac{X^\top y}{X^\top X}=\underbrace{\frac{XX^\top}{X^\top X}}_{\text{MATRICE DE PROJECTION}}\,y\;}$$

> **L'IDENTIFICATION, terme à terme avec le §3.8.** *« La régression linéaire par maximum de vraisemblance effectue une **PROJECTION ORTHOGONALE**. »*

| Objet de la régression | Objet géométrique du chapitre 3 |
|---|---|
| $\dfrac{XX^\top}{X^\top X}$ | La **MATRICE DE PROJECTION** $P_\pi$ |
| $\theta_{\text{ML}}$ | Les **COORDONNÉES** de la projection dans le sous-espace de dimension 1 engendré par $X$ |
| $X\theta_{\text{ML}}$ | La **PROJECTION ORTHOGONALE de $y$** sur ce sous-espace |

> **La conclusion.** *« La solution du maximum de vraisemblance fournit aussi une **solution GÉOMÉTRIQUEMENT OPTIMALE** : elle trouve les vecteurs, dans le sous-espace engendré par $X$, qui sont **"LES PLUS PROCHES" des observations $y$** — "proche" au sens de la **plus petite distance QUADRATIQUE**. C'est ce qu'accomplissent les projections orthogonales. »*

⚠️ *« La régression linéaire peut donc être vue comme une **méthode pour RÉSOUDRE des systèmes d'équations linéaires** »* — insoluble exactement, résolu au sens des moindres carrés (fiche 402, §3.8).

### 5.2 Le cas général et le cas orthonormé

Pour $y=\phi^\top(x)\theta+\epsilon$ avec $\phi(x)\in\mathbb R^K$ :

$$y\approx\Phi\theta_{\text{ML}},\qquad\theta_{\text{ML}}=(\Phi^\top\Phi)^{-1}\Phi^\top y$$

$$\boxed{\;P_\pi=\Phi(\Phi^\top\Phi)^{-1}\Phi^\top\;}$$

*« Une projection sur un sous-espace de dimension $K$ de $\mathbb R^N$, engendré par **les COLONNES de la matrice d'attributs $\Phi$** »* (§3.8.2).

**Le cas particulier ORTHONORMÉ.** *« Si les fonctions d'attributs $\phi_k$ sont **ORTHONORMÉES**, les colonnes de $\Phi$ forment une **base orthonormée**, si bien que $\Phi^\top\Phi=I$ »* :

$$\boxed{\;\Phi(\Phi^\top\Phi)^{-1}\Phi^\top y=\Phi\Phi^\top y\;}$$

⚠️ **Plus aucune inversion** — c'est exactement la simplification annoncée à la fiche 402 pour les bases orthonormées.

<details class="details--riche">
<summary>

Vérification des quatre propriétés de $P_\pi$

</summary>

Sur les données simulées avec $K=4$ attributs polynomiaux et $N=10$ points :

| Propriété | Test | Résultat |
|---|---|---|
| **Idempotence** $P_\pi^2=P_\pi$ | $\max\lvert P_\pi^2-P_\pi\rvert$ | $0{,}0$ |
| **Symétrie** $P_\pi=P_\pi^\top$ | $\max\lvert P_\pi-P_\pi^\top\rvert$ | $0{,}0$ |
| **Trace $=$ rang** | $\operatorname{tr}(P_\pi)$ | $4{,}0=K$ |
| **Résidu orthogonal** | $\max_j\lvert(\Phi^\top r)_j\rvert$ avec $r=y-\Phi\theta_{\text{ML}}$ | $0{,}0$ |

⚠️ La dernière ligne **EST** l'équation normale : $\Phi^\top(y-\Phi\theta)=0\iff\Phi^\top\Phi\theta=\Phi^\top y$. **La condition d'optimalité du MLE et la condition d'orthogonalité de la projection sont LA MÊME ÉQUATION.**

</details>

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Ce modèle est-il une régression linéaire ? » | **§9.1** | Vérifier la linéarité **EN LES PARAMÈTRES** — $\phi$ peut être non linéaire |
| « Écrire la vraisemblance » | **§9.1** | $\prod_n\mathcal N(y_n\mid\phi^\top(x_n)\theta,\sigma^2)$ — la **conditionnelle indépendance** justifie la factorisation |
| « Trouver $\theta_{\text{ML}}$ » | **§9.2.1** | $\theta_{\text{ML}}=(\Phi^\top\Phi)^{-1}\Phi^\top y$ ; en pratique **résoudre** $\Phi^\top\Phi\theta=\Phi^\top y$ |
| « Régression polynomiale de degré $M$ » | **Ex. 9.3** | $\phi(x)=[1,x,\dots,x^M]^\top$, $K=M+1$ ; **remplacer $X$ par $\Phi$** |
| « Estimer la variance du bruit » | **§9.2.1** | $\sigma^2_{\text{ML}}=\frac1N\sum_n(y_n-\phi^\top(x_n)\theta)^2$ |
| « Comparer deux modèles » | **RMSE** | $\sqrt{\frac1N\lVert y-\Phi\theta\rVert^2}$ ; **mêmes unités que $y$** |
| « Le modèle sur-apprend » | **§9.2.2** | Signes : **$\lVert\theta\rVert$ grande** · train $\to0$ · **test qui explose** |
| « Trouver $\theta_{\text{MAP}}$ » | **§9.2.3** | $\big(\Phi^\top\Phi+\frac{\sigma^2}{b^2}I\big)^{-1}\Phi^\top y$ |
| « Moindres carrés régularisés » | **§9.2.4** | $\theta_{\text{RLS}}=(\Phi^\top\Phi+\lambda I)^{-1}\Phi^\top y$ ; **identique au MAP** pour $\lambda=\sigma^2/b^2$ |
| « On veut des solutions parcimonieuses » | **§9.2.4** | Norme $\ell_1$ : le **LASSO** |
| « Prédire sans données d'entraînement » | **§9.3.2** | Prédiction **a priori** : $\mathcal N(\phi^\top(x_*)m_0,\ \phi^\top(x_*)S_0\phi(x_*)+\sigma^2)$ |
| « Calculer l'a posteriori des paramètres » | **Th. 9.1** | $S_N=(S_0^{-1}+\sigma^{-2}\Phi^\top\Phi)^{-1}$, $m_N=S_N(S_0^{-1}m_0+\sigma^{-2}\Phi^\top y)$ |
| « Prédire avec incertitude » | **§9.3.4** | $\mathcal N(\phi^\top(x_*)m_N,\ \phi^\top(x_*)S_N\phi(x_*)+\sigma^2)$ |
| « Valeurs de fonction sans bruit » | **§9.3.4** | **Même moyenne**, variance **sans le $+\sigma^2$** |
| « Calculer la vraisemblance marginale » | **§9.3.5** | $\mathcal N(y\mid Xm_0,\ XS_0X^\top+\sigma^2I)$ |
| « Interpréter géométriquement » | **§9.4** | **PROJECTION ORTHOGONALE** de $y$ sur l'espace des colonnes de $\Phi$ |
| « Les attributs sont orthonormés » | **§9.4** | $\Phi^\top\Phi=I$, donc $P_\pi=\Phi\Phi^\top$ — **plus d'inversion** |

## Comment résoudre : les cinq méthodes pas-à-pas

**Méthode A — Ajuster un modèle par maximum de vraisemblance.**

1. Choisir les **attributs** $\phi$ ; construire $\Phi\in\mathbb R^{N\times K}$ ligne par ligne.
2. **Vérifier** $\operatorname{rk}(\Phi)=K$ (sinon $\Phi^\top\Phi$ n'est pas inversible).
3. Former $A=\Phi^\top\Phi$ et $b=\Phi^\top y$.
4. **Résoudre** $A\theta=b$ ( pas d'inversion explicite).
5. **Contrôles** : la hessienne $\Phi^\top\Phi$ est définie positive $\Rightarrow$ minimum **global** ; le résidu $y-\Phi\theta$ doit être **orthogonal à toutes les colonnes** de $\Phi$.
6. Si nécessaire : $\sigma^2_{\text{ML}}=\frac1N\lVert y-\Phi\theta\rVert^2$.

**Méthode B — Diagnostiquer et corriger le surapprentissage.**

1. Calculer la **RMSE d'entraînement ET de test** pour plusieurs degrés $M$.
2. Chercher le **point de divergence** : train qui continue de baisser, test qui remonte.
3. Vérifier $\lVert\theta\rVert$ : elle **explose** en surapprentissage.
4. Placer un a priori $\mathcal N(0,b^2I)$ ou ajouter $\lambda\lVert\theta\rVert^2$.
5. Recalculer $\theta_{\text{MAP}}=(\Phi^\top\Phi+\frac{\sigma^2}{b^2}I)^{-1}\Phi^\top y$.
6. **Contrôle** : $\lVert\theta_{\text{MAP}}\rVert<\lVert\theta_{\text{ML}}\rVert$.

**Méthode C — Régression bayésienne complète.**

1. Fixer l'a priori $(m_0,S_0)$ et $\sigma^2$.
2. Construire $\Phi$.
3. $S_N^{-1}=S_0^{-1}+\sigma^{-2}\Phi^\top\Phi$, puis **inverser** pour $S_N$.
4. $m_N=S_N(S_0^{-1}m_0+\sigma^{-2}\Phi^\top y)$.
5. Prédire : moyenne $\phi^\top(x_*)m_N$, variance $\phi^\top(x_*)S_N\phi(x_*)+\sigma^2$.
6. **Contrôles** : $S_N\preceq S_0$ (l'observation **réduit** l'incertitude) ; si $m_0=0$ et $S_0=b^2I$, alors $m_N=\theta_{\text{MAP}}$.

**Méthode D — Passer d'un langage à l'autre.**

1. Perte quadratique $\longleftrightarrow$ **vraisemblance gaussienne**.
2. $\lambda\lVert\theta\rVert^2$ $\longleftrightarrow$ **a priori $\mathcal N(0,b^2I)$**, avec $\lambda=\frac{1}{2b^2}$ pour les objectifs et $\lambda=\frac{\sigma^2}{b^2}$ pour les solutions.
3. $\theta_{\text{ML}}$ $\longleftrightarrow$ **projection orthogonale**.
4. Équation normale $\longleftrightarrow$ **condition d'orthogonalité du résidu**.
5. $\theta_{\text{MAP}}$ $\longleftrightarrow$ **moyenne a posteriori $m_N$**.

**Méthode E — Vérification géométrique.**

1. Calculer $P_\pi=\Phi(\Phi^\top\Phi)^{-1}\Phi^\top$.
2. **Idempotence** : $P_\pi^2=P_\pi$.
3. **Symétrie** : $P_\pi=P_\pi^\top$.
4. **Trace $=$ rang $=K$**.
5. **Résidu** : $\Phi^\top(y-\Phi\theta_{\text{ML}})=0$.
6. Si attributs orthonormés : vérifier $\Phi^\top\Phi=I$ et $P_\pi=\Phi\Phi^\top$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire que « linéaire » veut dire linéaire en $x$ | Cela veut dire **LINÉAIRE EN LES PARAMÈTRES** — $\phi$ peut être un polynôme, une sinusoïde… |
| Traiter la vraisemblance comme une loi en $\theta$ | Elle **n'intègre PAS à 1** en $\theta$ et **peut même ne pas être intégrable** |
| Ne pas passer au logarithme | **SOUS-DÉBORDEMENT numérique** garanti pour $N$ grand, et dérivées inutilement compliquées |
| Ranger les $x_n$ en colonnes de $X$ | La **$n$-ième LIGNE** de $X$ est $x_n$ — $X\in\mathbb R^{N\times D}$ |
| Inverser $\Phi^\top\Phi$ explicitement | **Résoudre le système** $\Phi^\top\Phi\theta=\Phi^\top y$ est plus stable |
| Oublier de vérifier $\operatorname{rk}(\Phi)=K$ | Sinon **pas d'inverse** et une **infinité** de solutions |
| Prendre $K>N$ | Système **SOUS-DÉTERMINÉ** : infinité d'estimateurs |
| Croire que $M=N-1$ est le meilleur ajustement | Le polynôme **passe par chaque point** (train $=0$) mais **oscille sauvagement** |
| Juger un modèle sur l'erreur d'entraînement | Elle **décroît MONOTONEMENT** avec $M$ — elle ne détecte **jamais** le surapprentissage |
| Comparer des erreurs quadratiques brutes | Utiliser la **RMSE** : comparable entre tailles, **mêmes unités que $y$** |
| Croire la log-vraisemblance interprétable en unités | Elle est **SANS UNITÉ** |
| Oublier le $\frac1N$ dans $\sigma^2_{\text{ML}}$ | C'est une **moyenne empirique** des carrés des résidus |
| Écrire $\theta_{\text{MAP}}=(\Phi^\top\Phi)^{-1}\Phi^\top y+\text{qqch}$ | Le terme s'ajoute **DANS l'inverse** : $\big(\Phi^\top\Phi+\frac{\sigma^2}{b^2}I\big)^{-1}$ |
| Croire que $\Phi^\top\Phi$ est toujours inversible | Elle est **SEMI**-définie positive ; c'est **le terme de régularisation** qui garantit l'inverse |
| Confondre $\lambda=\frac{1}{2b^2}$ et $\lambda=\frac{\sigma^2}{b^2}$ | Le premier identifie les **objectifs**, le second les **solutions** |
| Croire que la norme $\ell_2$ donne de la parcimonie | **NON** — il faut $p$ petit ; $p=1$ est le **LASSO** |
| Croire que la régression bayésienne ajuste des paramètres | *« On **n'ajuste AUCUN paramètre** »* — on **moyenne** sur tous les $\theta$ plausibles |
| Oublier le $+\sigma^2$ dans la variance prédictive | Il représente le **bruit de mesure** ; il **disparaît** pour les valeurs de fonction sans bruit |
| Croire $S_N$ indépendante des données | Elle dépend des **entrées d'entraînement** via $\Phi$ (mais **pas** des cibles $y$) |
| Croire que la variance prédictive est constante | $\phi^\top(x_*)S_N\phi(x_*)$ **dépend de $x_*$** : l'incertitude **grandit loin des données** |
| Croire que MAP et bayésien donnent la même chose | **Même MOYENNE prédictive**, mais le MAP **perd toute la VARIANCE** |
| Confondre vraisemblance marginale et prédictive a posteriori | La marginale prédit les cibles **d'ENTRAÎNEMENT** et moyenne selon **l'A PRIORI** |
| Croire que la projection orthogonale est une analogie | C'est une **IDENTITÉ** : l'équation normale **EST** la condition d'orthogonalité du résidu |
| Oublier que $P_\pi$ est singulière | $P_\pi^2=P_\pi$ et $P_\pi\neq I$ : $\det P_\pi=0$, $\operatorname{tr}P_\pi=K<N$ |
| Inverser $\Phi^\top\Phi$ quand les attributs sont orthonormés | $\Phi^\top\Phi=I$ : la projection est **simplement $\Phi\Phi^\top$** |

## 📌 Ultimate Review

```
════════ LES HUIT FORMULES À SAVOIR SANS HÉSITER ════════
  1.  MODÈLE     y = φᵀ(x)θ + ε ,  ε ~ N(0,σ²)  i.i.d.
      ⚠️ « linéaire » = LINÉAIRE EN LES PARAMÈTRES
  2.  ERREUR     L(θ) = (1/2σ²) ‖y − Φθ‖²
  3.  MLE        θML  = (ΦᵀΦ)⁻¹ Φᵀ y            ← ÉQUATIONS NORMALES
      BRUIT      σ²ML = (1/N) ‖y − Φθ‖²
      RMSE       √((1/N) ‖y − Φθ‖²)
  4.  MAP        θMAP = (ΦᵀΦ + (σ²/b²) I)⁻¹ Φᵀ y
      RLS        θRLS = (ΦᵀΦ + λ I)⁻¹ Φᵀ y      ← IDENTIQUE pour λ = σ²/b²
  5.  A POSTERIORI (Th. 9.1)
      SN = (S0⁻¹ + σ⁻² ΦᵀΦ)⁻¹      mN = SN (S0⁻¹ m0 + σ⁻² Φᵀ y)
  6.  PRÉDICTION A PRIORI     N(φᵀ(x*)m0 , φᵀ(x*)S0φ(x*) + σ²)
      PRÉDICTION A POSTERIORI N(φᵀ(x*)mN , φᵀ(x*)SN φ(x*) + σ²)
      ⚠️ moyenne prédictive = φᵀ(x*) θMAP
  7.  VRAISEMBLANCE MARGINALE  N(y | X m0 , X S0 Xᵀ + σ² I)
  8.  GÉOMÉTRIE   Pπ = Φ(ΦᵀΦ)⁻¹Φᵀ   ·  attributs ORTHONORMÉS → Pπ = ΦΦᵀ
═════════════════════════════════════════════════════════
```

**LES TROIS NIVEAUX, terme à terme :**

|  | **MLE** | **MAP** | **BAYÉSIEN** |
|---|---|---|---|
| Ce qu'on obtient | Un **point** | Un **point biaisé** | Une **LOI COMPLÈTE** |
| A priori | Aucun | $\mathcal N(0,b^2I)$ | $\mathcal N(m_0,S_0)$ |
| Solution | $(\Phi^\top\Phi)^{-1}\Phi^\top y$ | $(\Phi^\top\Phi+\frac{\sigma^2}{b^2}I)^{-1}\Phi^\top y$ | $\mathcal N(m_N,S_N)$ |
| Inversibilité | exige $\operatorname{rk}\Phi=K$ | **toujours** garantie | toujours |
| Surapprentissage | **oui**, surtout si $N$ petit | atténué | **intrinsèquement traité** |
| Incertitude prédictive | $\sigma^2$ seul | $\sigma^2$ seul | $\phi^\top S_N\phi+\sigma^2$ |
| Coût | Un système linéaire | Un système linéaire | Une **inversion de $K\times K$** |

**LE DICTIONNAIRE PROBABILISTE / GÉOMÉTRIQUE / OPTIMISATION :**

| Probabiliste (ch. 6, 8) | Géométrique (ch. 3) | Optimisation (ch. 7) |
|---|---|---|
| Vraisemblance gaussienne | Distance quadratique | Objectif quadratique |
| Maximiser la vraisemblance | **Projection orthogonale** | Minimum global (hessienne $\succ0$) |
| A priori $\mathcal N(0,b^2I)$ | — | **Régularisation** $\lambda\lVert\theta\rVert^2$ |
| Annuler le gradient | **Résidu $\perp$ colonnes de $\Phi$** | Condition d'optimalité |
| Conjugaison gaussienne | — | Forme fermée |

**Ce que chaque chapitre antérieur apporte ici :**

| Chapitre | Ce qu'il fournit |
|---|---|
| **2** — algèbre linéaire | Matrice de conception, rang, systèmes linéaires |
| **3** — géométrie | **Projection orthogonale**, équation normale, pseudo-inverse |
| **4** — décompositions | Définie positivité de $\Phi^\top\Phi$, inversibilité |
| **5** — calcul vectoriel | Le gradient de $\lVert y-\Phi\theta\rVert^2$, la hessienne |
| **6** — probabilités | Gaussiennes, conjugaison, transformations affines des moments |
| **7** — optimisation | Minimum global d'un objectif quadratique |
| **8** — le pont | MLE, MAP, régularisation, surapprentissage |

## 🧠 Active Recall

**Formulation**

1. Écrire le modèle de régression et la vraisemblance.
2. Que signifie exactement « linéaire » en régression linéaire ?
3. Quelle est la seule source d'incertitude ? Que se passerait-il sans bruit ?
4. Pourquoi la vraisemblance se factorise-t-elle ?
5. Que représente $\theta$ dans l'exemple 9.1 ?

**Maximum de vraisemblance** 6. Pourquoi la vraisemblance n'est-elle pas une loi en $\theta$ ? 7. Donner les deux raisons de la transformation logarithmique. 8. Écrire la log-vraisemblance négative sous ses trois formes. 9. Qu'est-ce que la matrice de conception ? Comment sont rangés les $x_n$ ? 10. Calculer le gradient et en déduire $\theta_{\text{ML}}$. 11. Donner les trois justifications de la dérivation. 12. Qu'est-ce qu'une application d'attributs ? Écrire $\phi$ pour la régression polynomiale. 13. Que devient $\theta_{\text{ML}}$ avec des attributs ? Quelle condition de rang ? 14. Dériver $\sigma^2_{\text{ML}}$ et l'interpréter. 15. Écrire la RMSE. Donner ses deux vertus. 16. Décrire l'expérience des figures 9.5-9.6. Que se passe-t-il à $M=N-1$ ? 17. Pourquoi $M\geqslant N$ est-il impossible ?

**MAP et régularisation** 18. Quel est le signe empirique du surapprentissage ? 19. Que signifie concrètement un a priori $\mathcal N(0,1)$ ? 20. Écrire la log-a-posteriori. Pourquoi parle-t-on de « compromis » ? 21. Écrire $\theta_{\text{MAP}}$. Quelle est la seule différence avec $\theta_{\text{ML}}$ ? 22. Quelles sont les DEUX choses que ce terme additionnel résout ? 23. Écrire les moindres carrés régularisés et leur solution. 24. Pour quelle valeur de $\lambda$ le régularisateur et le log-a-priori négatif coïncident-ils ? 25. Qu'apporte la norme $\ell_1$ ? Comment s'appelle-t-elle ?

**Régression bayésienne** 26. En quoi la régression bayésienne diffère-t-elle du MAP ? 27. Écrire le modèle (a priori et vraisemblance). 28. Écrire la prédiction a priori. Que faut-il fournir ? 29. Donner les trois ingrédients de sa dérivation. 30. Énoncer le théorème 9.1. 31. Comment lire $S_N^{-1}$ ? et $m_N$ ? 32. Que vaut $m_N$ quand $m_0=0$ et $S_0=b^2I$ ? 33. Écrire la prédiction a posteriori. Que vaut sa moyenne ? 34. Que change-t-on pour des valeurs de fonction sans bruit ? 35. Qu'est-ce qu'une « loi sur les fonctions » ? 36. Donner les deux différences entre vraisemblance marginale et prédictive a posteriori. 37. Dériver la vraisemblance marginale en deux étapes.

**Géométrie** 38. Écrire $X\theta_{\text{ML}}$ dans le cas 1D et identifier les trois objets géométriques. 39. Quelle est la formule générale de $P_\pi$ ? 40. Que devient-elle si les attributs sont orthonormés ? 41. Quelles sont les quatre propriétés de $P_\pi$ ? 42. Pourquoi l'équation normale et la condition d'orthogonalité sont-elles la même équation ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le modèle de régression ? | $y=f(x)+\epsilon$ avec $\epsilon\sim\mathcal N(0,\sigma^2)$ **i.i.d.** |
| La vraisemblance ? | $p(y\mid x,\theta)=\mathcal N(y\mid\phi^\top(x)\theta,\ \sigma^2)$ |
| Que signifie « linéaire » ? | **LINÉAIRE EN LES PARAMÈTRES** — une **combinaison linéaire d'ATTRIBUTS** |
| $y=\phi^\top(x)\theta$ avec $\phi$ non linéaire est-il linéaire ? | **OUI** — c'est bien une régression linéaire |
| La seule source d'incertitude ? | Le **BRUIT D'OBSERVATION** |
| Sans bruit ? | Relation **DÉTERMINISTE** ; la vraisemblance serait un **DELTA DE DIRAC** |
| Delta de Dirac ? | Nul partout sauf en un point, d'intégrale 1 — une gaussienne à la limite $\sigma^2\to0$ |
| Pourquoi la vraisemblance se factorise-t-elle ? | Les $y_i$ sont **conditionnellement indépendantes sachant leurs $x_i$** |
| Que représente $\theta$ pour $x,\theta\in\mathbb R$ ? | La **PENTE** de la droite (passant par l'origine) |
| La vraisemblance est-elle une loi en $\theta$ ? | **NON** — non normalisée, **peut même ne pas être intégrable** |
| En $y$ ? | **OUI**, elle est normalisée |
| Les deux raisons du logarithme ? | Éviter le **SOUS-DÉBORDEMENT numérique** · **simplifier les dérivées** |
| La log-vraisemblance négative ? | $L(\theta)=\frac{1}{2\sigma^2}\lVert y-X\theta\rVert^2$ |
| Son autre nom ? | La **FONCTION D'ERREUR** |
| Matrice de conception ? | $X=[x_1,\dots,x_N]^\top\in\mathbb R^{N\times D}$ — la **$n$-ième LIGNE** est $x_n$ |
| Le gradient de $L$ ? | $\frac{1}{\sigma^2}(-y^\top X+\theta^\top X^\top X)\in\mathbb R^{1\times D}$ |
| L'estimateur du maximum de vraisemblance ? | $\theta_{\text{ML}}=(X^\top X)^{-1}X^\top y$ |
| Le nom de cette équation ? | Les **ÉQUATIONS NORMALES** |
| Pourquoi peut-on inverser $X^\top X$ ? | Elle est **définie positive** si $\operatorname{rk}(X)=D$ |
| Nécessaire et suffisant ? | **OUI** — la hessienne $X^\top X$ est **définie positive**, donc **minimum GLOBAL** |
| Que faut-il faire en pratique ? | **Résoudre** $A\theta=b$, **pas inverser** |
| L'application d'attributs polynomiale ? | $\phi(x)=[1,x,x^2,\dots,x^{K-1}]^\top$ |
| Ce qu'elle fait ? | Elle **SOULÈVE** l'espace 1D en un espace de dimension $K$ de **MONÔMES** |
| Matrice d'attributs ? | $\Phi\in\mathbb R^{N\times K}$ avec $\Phi_{ij}=\phi_j(x_i)$ |
| $\theta_{\text{ML}}$ avec attributs ? | $(\Phi^\top\Phi)^{-1}\Phi^\top y$ — **il suffit de remplacer $X$ par $\Phi$** |
| La condition de rang ? | $\operatorname{rk}(\Phi)=K$ |
| $\sigma^2_{\text{ML}}$ ? | $\frac1N\sum_n(y_n-\phi^\top(x_n)\theta)^2$ |
| Son interprétation ? | La **moyenne empirique des distances au carré** entre valeurs **sans bruit** et observations **bruitées** |
| La RMSE ? | $\sqrt{\frac1N\lVert y-\Phi\theta\rVert^2}$ |
| Ses deux vertus ? | Comparer des jeux de **tailles différentes** · **mêmes unités que $y$** |
| La log-vraisemblance a-t-elle des unités ? | **NON** — elle est **sans unité** |
| Que se passe-t-il à $M=N-1$ ? | Le polynôme **PASSE PAR CHAQUE POINT** ; RMSE d'entraînement $=0$ |
| Et pour la généralisation ? | **Oscillations sauvages** — mauvaise représentation, **SURAPPRENTISSAGE** |
| À partir de quel degré le test se dégrade-t-il ? | **Degré 6** dans l'expérience du livre |
| Pourquoi $M\geqslant N$ est-il impossible ? | Système **SOUS-DÉTERMINÉ** ; $\Phi^\top\Phi$ **non inversible** ; **infinité** de solutions |
| Le signe empirique du surapprentissage ? | La **MAGNITUDE des paramètres devient GRANDE** |
| Que signifie l'a priori $\mathcal N(0,1)$ ? | Les valeurs sont attendues dans $[-2,2]$ — **deux écarts-types** |
| La log-a-posteriori ? | $\log p(\mathcal Y\mid\mathcal X,\theta)+\log p(\theta)+\text{const}$ |
| Pourquoi un « compromis » ? | C'est une **SOMME** : l'a priori **plus** la vraisemblance |
| $\theta_{\text{MAP}}$ ? | $\big(\Phi^\top\Phi+\frac{\sigma^2}{b^2}I\big)^{-1}\Phi^\top y$ |
| La seule différence avec le MLE ? | Le terme $\frac{\sigma^2}{b^2}I$ **DANS l'inverse** |
| Les DEUX problèmes qu'il résout ? | Le **surapprentissage** ET l'**existence de l'INVERSE** |
| Pourquoi ? | $\Phi^\top\Phi$ est **SEMI**-définie positive ; le terme ajouté est **STRICTEMENT** défini positif |
| Les moindres carrés régularisés ? | $\min_\theta\lVert y-\Phi\theta\rVert^2+\lambda\lVert\theta\rVert_2^2$ |
| Le nom du premier terme ? | Le terme d'**AJUSTEMENT** (*misfit*) |
| $\theta_{\text{RLS}}$ ? | $(\Phi^\top\Phi+\lambda I)^{-1}\Phi^\top y$ |
| Quand RLS $=$ MAP ? | Pour $\lambda=\dfrac{\sigma^2}{b^2}$ |
| Quand le régularisateur $=$ le log-a-priori négatif ? | Pour $\lambda=\dfrac{1}{2b^2}$ |
| Qu'apporte une norme $p$ petite ? | Des solutions **PARCIMONIEUSES** (beaucoup de $\theta_d=0$) — utile pour la **sélection de variables** |
| Le régularisateur $\ell_1$ ? | Le **LASSO** (Tibshirani, 1996) |
| Ce que fait la régression bayésienne ? | Elle **n'ajuste AUCUN paramètre** — elle **MOYENNE** sur tous les $\theta$ plausibles |
| Le modèle bayésien ? | $p(\theta)=\mathcal N(m_0,S_0)$ et $p(y\mid x,\theta)=\mathcal N(y\mid\phi^\top(x)\theta,\sigma^2)$ |
| Que devient $\theta$ ? | Une **VARIABLE ALÉATOIRE** |
| La prédiction a priori ? | $\mathcal N\big(\phi^\top(x_*)m_0,\ \phi^\top(x_*)S_0\phi(x_*)+\sigma^2\big)$ |
| Que faut-il fournir ? | **Seulement $x_*$** — **aucune donnée d'entraînement** |
| Les trois ingrédients de sa dérivation ? | **Conjugaison** + marginalisation gaussienne · **indépendance** du bruit · **transformation linéaire** de gaussienne |
| Théorème 9.1, la covariance ? | $S_N=\big(S_0^{-1}+\sigma^{-2}\Phi^\top\Phi\big)^{-1}$ |
| Théorème 9.1, la moyenne ? | $m_N=S_N\big(S_0^{-1}m_0+\sigma^{-2}\Phi^\top y\big)$ |
| Comment lire $S_N^{-1}$ ? | Les **PRÉCISIONS S'AJOUTENT** : a priori **plus** données |
| Comment lire $m_N$ ? | Une **moyenne pondérée par les PRÉCISIONS** |
| $m_N$ si $m_0=0$ et $S_0=b^2I$ ? | **$=\theta_{\text{MAP}}$ exactement** |
| Rôle de la vraisemblance marginale ? | Elle **NORMALISE** l'a posteriori ; c'est la vraisemblance **moyennée sur l'a priori** |
| La prédiction a posteriori ? | $\mathcal N\big(\phi^\top(x_*)m_N,\ \phi^\top(x_*)S_N\phi(x_*)+\sigma^2\big)$ |
| Sa moyenne ? | **$=\phi^\top(x_*)\theta_{\text{MAP}}$** — le MAP ne perd que la **VARIANCE** |
| Que reflète $\phi^\top(x_*)S_N\phi(x_*)$ ? | L'**incertitude a posteriori sur les PARAMÈTRES** |
| $S_N$ dépend-elle des données ? | **De $\Phi$ oui** (les entrées), **des cibles $y$ non** |
| Valeurs de fonction sans bruit ? | **Même moyenne**, variance **SANS le $+\sigma^2$** |
| Pourquoi la moyenne est-elle la même ? | Le **bruit est de moyenne $0$** |
| Loi sur les fonctions ? | Échantillonner $\theta_i\sim p(\theta\mid\mathcal X,\mathcal Y)$ donne **une réalisation de FONCTION** $\theta_i^\top\phi(\cdot)$ |
| Marginale contre prédictive a posteriori ? | La marginale prédit les cibles **d'ENTRAÎNEMENT** · elle moyenne sur **l'A PRIORI** |
| La vraisemblance marginale ? | $\mathcal N\big(y\mid Xm_0,\ XS_0X^\top+\sigma^2I\big)$ |
| Sa moyenne ? | $\mathbb E_{\theta,\epsilon}[X\theta+\epsilon]=Xm_0$ |
| Sa covariance ? | $X S_0X^\top+\sigma^2I$ |
| $X\theta_{\text{ML}}$ en 1D ? | $\dfrac{XX^\top}{X^\top X}y$ |
| Les trois identifications géométriques ? | $\frac{XX^\top}{X^\top X}=P_\pi$ · $\theta_{\text{ML}}=$ **coordonnées** · $X\theta_{\text{ML}}=$ **projection orthogonale** |
| Que fait le MLE, géométriquement ? | Une **PROJECTION ORTHOGONALE** de $y$ sur l'espace des **COLONNES** de $\Phi$ |
| $P_\pi$ dans le cas général ? | $\Phi(\Phi^\top\Phi)^{-1}\Phi^\top$ |
| Sur quel sous-espace projette-t-on ? | Le sous-espace de **dimension $K$** de $\mathbb R^N$ engendré par les **colonnes de $\Phi$** |
| Si les attributs sont orthonormés ? | $\Phi^\top\Phi=I$, donc $P_\pi=\Phi\Phi^\top$ — **plus d'inversion** |
| Les quatre propriétés de $P_\pi$ ? | **Idempotente** · **symétrique** · $\operatorname{tr}=\operatorname{rang}=K$ · **singulière** |
| Le lien entre équation normale et orthogonalité ? | $\Phi^\top(y-\Phi\theta)=0\iff\Phi^\top\Phi\theta=\Phi^\top y$ — **la MÊME équation** |
| Ce qu'est fondamentalement la régression linéaire ? | Une **méthode pour résoudre des SYSTÈMES d'équations linéaires** insolubles, au sens des moindres carrés |
