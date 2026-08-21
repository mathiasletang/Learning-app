# Fiche 406 — Optimisation continue : descente de gradient, Lagrange, convexité, dualité

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 7 « Continuous Optimization » (p. 225-246) |
| **Difficulté** | Avancé — la dernière des six fondations, celle qui fait tourner l'apprentissage |
| **Temps d'étude estimé** | 120 min |
| **Prérequis** | Fiche 403 (matrices définies positives, valeurs singulières) · Fiche 404 (gradient, hessienne) |
| **Concepts clés** | Point stationnaire, minimum global et local, descente de gradient, pas / taux d'apprentissage, conditionnement, préconditionneur, momentum, descente de gradient stochastique, mini-lot, optimisation sous contraintes, multiplicateurs de Lagrange, lagrangien, problème primal et dual, inégalité minimax, dualité faible, dualité forte, ensemble convexe, fonction convexe, épigraphe, inégalité de Jensen, programme linéaire, programme quadratique, transformée de Legendre-Fenchel, conjugué convexe, hyperplan d'appui |
| **Poids à l'examen** | $x_{i+1}=x_i-\gamma_i\big((\nabla f)(x_i)\big)^\top$ · le **conditionnement** $\kappa=\sigma_{\max}/\sigma_{\min}$ · le **lagrangien** $\mathfrak L(x,\lambda)=f(x)+\lambda^\top g(x)$ · l'**inégalité minimax** et la **dualité faible** · les **trois caractérisations** de la convexité · les duaux du **PL** et du **PQ** · le **conjugué convexe** $f^*(s)=\sup_x(\langle s,x\rangle-f(x))$. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : trouver le MINIMUM d'une fonction objectif

  DEUX BRANCHES     optimisation SANS contraintes  ·  optimisation SOUS contraintes
  CONVENTION        en apprentissage on MINIMISE ; le gradient pointe VERS LE HAUT,
                    donc on descend dans la direction du gradient NÉGATIF

  §7.1 DESCENTE DE GRADIENT      xi+1 = xi − γi ((∇f)(xi))ᵀ
        algorithme du PREMIER ORDRE  ·  le gradient est ORTHOGONAL aux lignes de niveau
        PAS γ   trop petit → lent  ·  trop grand → dépassement, divergence
                deux heuristiques ADAPTATIVES : annuler et réduire / augmenter
        CONDITIONNEMENT  κ = σmax/σmin  → vallées longues et minces → ZIGZAG
        MOMENTUM   xi+1 = xi − γi((∇f)(xi))ᵀ + α Δxi     ← une MÉMOIRE, α ∈ [0,1]
        SGD        L(θ) = Σn Ln(θ)  →  MINI-LOT au lieu du lot complet
                   grands lots : précis, stable, coûteux ; petits lots : bruités,
                   rapides, ⚠️ le BRUIT aide à SORTIR des mauvais minima locaux
  §7.2 CONTRAINTES ET LAGRANGE
        min f(x)  s.c.  gi(x) ≤ 0
        LAGRANGIEN  L(x,λ) = f(x) + λᵀ g(x)  ,  λ ≥ 0
        l'idée : remplacer la fonction INDICATRICE (marche infinie) par une LINÉAIRE
        PRIMAL  min_x max_{λ≥0} L      DUAL  max_{λ≥0} min_x L = max D(λ)
        MINIMAX  max min φ ≤ min max φ    ⟹  DUALITÉ FAIBLE
        ⚠️ D(λ) est CONCAVE même si f et gi sont non convexes
        ÉGALITÉS  hj(x) = 0  →  deux inégalités  →  multiplicateurs NON CONTRAINTS
  §7.3 OPTIMISATION CONVEXE      f convexe + contraintes convexes → DUALITÉ FORTE
        ENSEMBLE convexe   θx + (1−θ)y ∈ C
        FONCTION convexe   f(θx + (1−θ)y) ≤ θf(x) + (1−θ)f(y)      = JENSEN
        au 1er ordre  f(y) ≥ f(x) + ∇f(x)ᵀ(y − x)       (la tangente est SOUS f)
        au 2e ordre   ∇²f(x) SEMI-DÉFINIE POSITIVE
        ÉPIGRAPHE : le convexe « rempli d'eau »
        PL   min cᵀx  s.c. Ax ≤ b        dual : max −bᵀλ  s.c. c + Aᵀλ = 0, λ ≥ 0
        PQ   min ½xᵀQx + cᵀx  s.c. Ax ≤ b   dual : max −½(c+Aᵀλ)ᵀQ⁻¹(c+Aᵀλ) − λᵀb
        LEGENDRE-FENCHEL  f*(s) = sup_x (⟨s,x⟩ − f(x))       ← le CONJUGUÉ CONVEXE
                          min_x f(Ax) + g(x) = max_u −f*(u) − g*(−Aᵀu)

LE MESSAGE CENTRAL   ⚠️ POUR LES FONCTIONS CONVEXES, TOUS LES MINIMA LOCAUX
                     SONT DES MINIMA GLOBAUX
```

> **La phrase-programme.** *« Entraîner un modèle d'apprentissage automatique revient souvent à **trouver un bon jeu de paramètres**. La notion de « bon » est déterminée par la fonction objectif ou le modèle probabiliste. Étant donnée une fonction objectif, trouver la meilleure valeur se fait par des **algorithmes d'optimisation**. »*

> **L'image directrice.** *« Trouver la meilleure valeur, c'est comme **trouver les VALLÉES** de la fonction objectif — et les gradients nous indiquent la montée. L'idée est de **descendre** (à l'opposé du gradient) en espérant trouver le point le plus profond. »*

## 🔴 Concept 1 — Le problème et l'exemple d'ouverture

### 1.1 Points stationnaires

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Les **points stationnaires** sont les **racines réelles de la dérivée**, c'est-à-dire les points de **gradient nul**.

</div>

**Le polynôme de la figure 7.2 :**

$$\ell(x)=x^4+7x^3+5x^2-17x+3,\qquad\frac{d\ell(x)}{dx}=4x^3+21x^2+10x-17$$

*« Cubique, elle a en général **trois solutions** quand on l'annule. Dans l'exemple, **deux sont des minima et une est un maximum** (vers $x=-1{,}4$). »* Pour trancher, on **dérive une seconde fois** et on regarde le signe.

$$\frac{d^2\ell(x)}{dx^2}=12x^2+42x+10$$

<details><summary>Les trois points stationnaires, calculés exactement</summary>

Racines de $\ell'$ par bissection sur $[-8,4]$ :

| $x$ | $\ell(x)$ | $\ell''(x)$ | Nature |
|---|---|---|---|
| $-4{,}4803$ | $-47{,}0748$ | $+62{,}70$ | **MINIMUM GLOBAL** |
| $-1{,}4321$ | $+21{,}2467$ | $-25{,}54$ | **MAXIMUM** |
| $+0{,}6624$ | $-3{,}8399$ | $+43{,}09$ | **minimum local** |

⚠️ Cohérent avec le livre : *« un minimum global vers $x=-4{,}5$, de valeur environ $-47$ »* ; *« un autre minimum local vers $x=0{,}7$ »* ; *« un maximum vers $x=-1{,}4$ »*

</details>

> ⚠️ **Le piège du point de départ.** *« Pour $x>-1$, le gradient négatif pointe vers le minimum **DE DROITE**, qui a une **valeur objectif PLUS GRANDE**. »* Si l'on démarre à $x_0=0$, on aboutit donc au **mauvais minimum**.

> **La limite algébrique.** *« Selon le **théorème d'ABEL-RUFFINI**, il n'existe **en général PAS de solution ALGÉBRIQUE** pour les polynômes de degré $\geqslant5$ (Abel, 1826). »* D'où l'obligation de méthodes **numériques**.

> **LE MESSAGE DU CHAPITRE.** *« Pour les FONCTIONS CONVEXES, **tous les minima locaux SONT des minima globaux**. Il se trouve que beaucoup de fonctions objectifs en apprentissage automatique sont **conçues pour être convexes**. »*

## 🔴 Concept 2 — La descente de gradient (§7.1)

### 2.1 L'algorithme

**Le problème :** $\displaystyle\min_x f(x)$ avec $f:\mathbb R^d\to\mathbb R$ **différentiable**, sans solution analytique.

> **La descente de gradient** est un **algorithme du PREMIER ORDRE** : *« pour trouver un minimum local, on fait des pas **proportionnels au gradient NÉGATIF** de la fonction au point courant. »*

> **La lecture par les lignes de niveau.** *« Le gradient pointe dans une direction **ORTHOGONALE aux LIGNES DE NIVEAU** »* — les courbes $f(x)=c$.

**Le fait fondateur :** $f(x_0)$ **décroît le plus vite** si l'on part de $x_0$ dans la direction $-\big((\nabla f)(x_0)\big)^\top$. Donc pour $\gamma\geqslant0$ petit :

$$x_1=x_0-\gamma\big((\nabla f)(x_0)\big)^\top\quad\Longrightarrow\quad f(x_1)\leqslant f(x_0)$$

**L'algorithme :**

$$\boxed{\;x_{i+1}=x_i-\gamma_i\big((\nabla f)(x_i)\big)^\top\;}$$

⚠️ **La transposition n'est pas décorative** : le gradient est un **vecteur LIGNE** (convention du ch. 5), et $x$ un vecteur **colonne** — *« sinon les dimensions ne marchent pas ».*

Pour un pas $\gamma_i$ convenable, la suite $f(x_0)\geqslant f(x_1)\geqslant\dots$ **converge vers un minimum LOCAL**.

**Exemple 7.1 — la quadratique bidimensionnelle.**

$$f\!\begin{bmatrix}x_1\\x_2\end{bmatrix}=\frac12\begin{bmatrix}x_1\\x_2\end{bmatrix}^\top\begin{bmatrix}2&1\\1&20\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix}-\begin{bmatrix}5\\3\end{bmatrix}^\top\begin{bmatrix}x_1\\x_2\end{bmatrix}$$

$$\nabla f\!\begin{bmatrix}x_1\\x_2\end{bmatrix}=\begin{bmatrix}x_1\\x_2\end{bmatrix}^\top\begin{bmatrix}2&1\\1&20\end{bmatrix}-\begin{bmatrix}5\\3\end{bmatrix}^\top$$

Partant de $x_0=[-3,-1]^\top$ avec $\gamma=0{,}085$, *« le gradient négatif en $x_0$ pointe **au NORD et à l'EST** »*, menant à

$$x_1=[-1{,}98\ ;\ 1{,}21]^\top,\qquad x_2=[-1{,}32\ ;\ -0{,}42]^\top,\ \dots$$

<details><summary>Recalcul de l'itération et du conditionnement</summary>

$\nabla f(x_0)^\top=Qx_0-c=[2(-3)+1(-1)-5,\ 1(-3)+20(-1)-3]^\top=[-12,\ -26]^\top$

⚠️ Les **deux composantes du gradient négatif sont positives** ($+12$, $+26$) : cela confirme « **nord et est** »

$x_1=[-3+0{,}085\cdot12,\ -1+0{,}085\cdot26]^\top=[-1{,}98\ ;\ 1{,}21]^\top$ **exactement** les valeurs du livre.

Itérations suivantes : $x_2=[-1{,}3213\ ;\ -0{,}4237]$ (le livre écrit $[-1{,}32;-0{,}42]$), $x_3=[-0{,}6356\ ;\ 0{,}6639]$, $x_4=[-0{,}1590\ ;\ -0{,}1557]$.

**Le minimum exact** est la solution de $Qx=c$ : $x^*=[2{,}487179\ ;\ 0{,}025641]^\top$.

**Le conditionnement de $Q$** : valeurs propres $20{,}055$ et $1{,}945$, donc $\kappa=10{,}31$. C'est **exactement** ce qui produit le zigzag visible sur la figure 7.3 : la surface est **dix fois plus courbée** dans une direction que dans l'autre.

</details>

> ⚠️ **La faiblesse de la méthode.** *« La descente de gradient peut être relativement **LENTE près du minimum** : son taux de convergence asymptotique est **inférieur à beaucoup d'autres méthodes**. Quand la surface est une **vallée LONGUE et MINCE**, le problème est **mal conditionné**. Pour ces problèmes, la descente de gradient **ZIGZAGUE de plus en plus**, les gradients pointant presque **orthogonalement** à la direction la plus courte vers le minimum. »*

### 2.2 Le choix du pas

> ⚠️ **Le dilemme.** *« Si le pas est **trop PETIT**, la descente est **lente**. S'il est **trop GRAND**, la descente peut **DÉPASSER (overshoot), ne pas converger, voire DIVERGER**. »* Le pas est aussi appelé le **TAUX D'APPRENTISSAGE**.

**Les deux heuristiques adaptatives** (Toussaint, 2012) :

1. **La valeur de la fonction AUGMENTE après un pas** $\Rightarrow$ le pas était **trop grand**. **ANNULER le pas** et **diminuer** le pas.
2. **La valeur DIMINUE** $\Rightarrow$ le pas aurait pu être **plus grand**. Essayer de l'**augmenter**.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi le « annuler » n'est pas un gaspillage.</span>

*« Bien que l'étape d'annulation semble un gaspillage de ressources, cette heuristique **GARANTIT une convergence MONOTONE**. »*

</div>

**Exemple 7.2 — résoudre $Ax=b$ par descente.** En pratique on minimise l'erreur quadratique

$$\lVert Ax-b\rVert^2=(Ax-b)^\top(Ax-b),\qquad\nabla_x=2(Ax-b)^\top A$$

⚠️ Pour ce cas particulier, *« il existe une **solution ANALYTIQUE**, qu'on trouve en annulant le gradient »* (chapitre 9).

> **Le conditionnement — la clé de la vitesse.**
>
> $$\boxed{\;\kappa=\frac{\sigma(A)_{\max}}{\sigma(A)_{\min}}\;}$$
>
> *« Le rapport de la plus grande à la plus petite **valeur SINGULIÈRE** de $A$. Le conditionnement mesure essentiellement le rapport de la **direction la plus courbée** à la **moins courbée** — ce qui correspond à notre image des problèmes mal conditionnés comme des **vallées longues et minces : très courbées dans une direction, très plates dans l'autre**. »*

**Le remède — le préconditionnement.** Au lieu de résoudre $Ax=b$, résoudre

$$\boxed{\;P^{-1}(Ax-b)=0\;}$$

où $P$ est le **PRÉCONDITIONNEUR**. *« Le but est de concevoir $P^{-1}$ tel que $P^{-1}A$ ait un **MEILLEUR conditionnement**, tout en restant **FACILE à calculer**. »* C'est un compromis : le préconditionneur idéal serait $P=A$, mais alors $P^{-1}$ coûte autant que le problème initial.

### 2.3 Le momentum

> **Le diagnostic.** *« La convergence peut être très lente si la courbure est telle qu'il y a des régions **mal ÉCHELONNÉES**. Les pas **sautent d'un mur à l'autre de la vallée** et approchent l'optimum par petits pas. Le remède proposé est de **DONNER À LA DESCENTE DE GRADIENT UNE MÉMOIRE**. »*

$$\boxed{\;x_{i+1}=x_i-\gamma_i\big((\nabla f)(x_i)\big)^\top+\alpha\,\Delta x_i\;}$$

$$\boxed{\;\Delta x_i=x_i-x_{i-1}=\alpha\,\Delta x_{i-1}-\gamma_{i-1}\big((\nabla f)(x_{i-1})\big)^\top\;}$$

avec $\alpha\in[0,1]$.

> **L'analogie physique.** *« Le terme de momentum **émule le phénomène d'une BALLE LOURDE, réticente à changer de direction**. L'idée est d'avoir une mise à jour de gradient avec mémoire, qui implémente une **MOYENNE MOBILE**. »* Cela **amortit les oscillations** et **lisse** les mises à jour.

> **Le second usage.** *« Parfois on ne connaît le gradient qu'**APPROXIMATIVEMENT**. Dans ces cas, le terme de momentum est utile car il **MOYENNE différentes estimations BRUITÉES** du gradient. »* — la transition vers le SGD.

*Référence : Rumelhart* et al. *(1986).*

### 2.4 La descente de gradient stochastique (SGD)

> **La définition.** *« Une **APPROXIMATION STOCHASTIQUE** de la descente de gradient pour minimiser une fonction objectif écrite comme une **SOMME de fonctions différentiables**. Le mot « stochastique » reconnaît qu'on **ne connaît pas le gradient précisément**, mais seulement une **approximation BRUITÉE**. »*

**La structure exploitée.** Avec $N$ points de données :

$$\boxed{\;L(\theta)=\sum_{n=1}^{N}L_n(\theta)\;}$$

Exemple en régression (ch. 9) — la **log-vraisemblance négative** :

$$L(\theta)=-\sum_{n=1}^{N}\log p(y_n\mid x_n,\theta)$$

⚠️ La descente de gradient standard est une méthode **« PAR LOT » (*batch*)** : l'optimisation utilise **l'ensemble complet** d'entraînement à chaque mise à jour.

> **La garantie théorique.** *« Quand le taux d'apprentissage décroît à un rythme approprié, et sous des hypothèses relativement douces, la descente de gradient stochastique converge **PRESQUE SÛREMENT** vers un minimum local (Bottou, 1998). »*

**Le compromis de la taille de mini-lot — le tableau décisif :**

|  | **GRANDS mini-lots** | **PETITS mini-lots** |
|---|---|---|
| Précision du gradient | **Estimations précises**, variance réduite | **Bruitées** |
| Convergence | Plus **STABLE** | Plus erratique |
| Coût par pas | **Plus cher** | **Rapide** à estimer |
| Vectorisation | Profite des **opérations matricielles hautement optimisées** | Moins |
| Minima locaux | Peut **rester coincé** | **Le BRUIT permet de SORTIR de mauvais optima locaux** |

> **La justification profonde.** *« En apprentissage automatique, les méthodes d'optimisation servent à minimiser une objectif **sur les données d'ENTRAÎNEMENT**, mais le but global est d'améliorer la performance de **GÉNÉRALISATION** (ch. 8). Puisque le but ne requiert pas nécessairement une estimation **précise** du minimum, les gradients approchés par mini-lots ont été **largement adoptés**. »*

**Les raisons pratiques :** les contraintes d'implémentation — *« la taille de la mémoire CPU/GPU ou les limites de temps de calcul »*. Le livre note l'analogie avec l'estimation de **moyennes empiriques** (§6.4.1) : la taille du sous-échantillon joue le même rôle.

**Les domaines d'application cités :** réseaux profonds sur des **millions d'images** (Dean *et al.*, 2012), **modèles de sujets** (Hoffman *et al.*, 2013), **apprentissage par renforcement** (Mnih *et al.*, 2015), **processus gaussiens à grande échelle** (Hensman *et al.*, 2013 ; Gal *et al.*, 2014).

## 🔴 Concept 3 — Contraintes et multiplicateurs de Lagrange (§7.2)

### 3.1 Le problème et l'idée

$$\boxed{\;\min_x f(x)\quad\text{sous contrainte}\quad g_i(x)\leqslant0\ \text{ pour } i=1,\dots,m\;}$$

⚠️ *« $f$ et les $g_i$ peuvent être **NON CONVEXES en général** »* — la convexité vient au §7.3.

**La solution naïve, impraticable.** Transformer en un problème sans contraintes avec une **fonction INDICATRICE** valant $0$ si la contrainte est satisfaite et $+\infty$ sinon. *« Cela donne une **pénalité INFINIE** si la contrainte n'est pas satisfaite, et donnerait donc la même solution. Mais cette **fonction en MARCHE INFINIE est tout aussi difficile à optimiser**. »*

> **L'IDÉE DES MULTIPLICATEURS DE LAGRANGE : REMPLACER LA FONCTION EN MARCHE PAR UNE FONCTION LINÉAIRE.**

$$\boxed{\;\mathfrak L(x,\lambda)=f(x)+\sum_{i=1}^{m}\lambda_ig_i(x)=f(x)+\lambda^\top g(x),\qquad\lambda_i\geqslant0\;}$$

### 3.2 La dualité lagrangienne

> **La dualité en général.** *« En optimisation, la **DUALITÉ** est l'idée de **CONVERTIR** un problème d'optimisation en un ensemble de variables $x$ (les **variables PRIMALES**) en un autre problème en des variables différentes $\lambda$ (les **variables DUALES**). »* Le livre présente **deux** dualités : la **lagrangienne** (§7.2) et la **Legendre-Fenchel** (§7.3.3).

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 7.1.</span>

Le problème

$$\min_x f(x)\quad\text{s.c.}\quad g_i(x)\leqslant0$$

est le **PROBLÈME PRIMAL**. Le **PROBLÈME DUAL LAGRANGIEN** associé est

$$\boxed{\;\max_{\lambda\in\mathbb R^m}D(\lambda)\quad\text{s.c.}\quad\lambda\geqslant0,\qquad\text{où}\quad D(\lambda)=\min_{x\in\mathbb R^d}\mathfrak L(x,\lambda)\;}$$

</div>

**L'INÉGALITÉ MINIMAX** — le résultat général sous-jacent : pour **toute** fonction à deux arguments $\varphi(x,y)$,

$$\boxed{\;\max_y\min_x\varphi(x,y)\ \leqslant\ \min_x\max_y\varphi(x,y)\;}$$

*« Le **MAXIMIN est inférieur au MINIMAX**. »*

<details><summary>La preuve en deux lignes (celle du livre)</summary>

Pour **tous** $x,y$ : $\displaystyle\min_x\varphi(x,y)\leqslant\max_y\varphi(x,y)$.

Prendre le **maximum sur $y$** du membre de gauche préserve l'inégalité (elle est vraie pour tout $y$). Prendre ensuite le **minimum sur $x$** du membre de droite donne l'inégalité minimax

</details>

**LA DUALITÉ FAIBLE.** Comme $\mathfrak L$ **relâche l'indicatrice en une fonction linéaire**, pour $\lambda\geqslant0$ le lagrangien est une **BORNE INFÉRIEURE** de $J(x)$. Le maximum de $\mathfrak L$ par rapport à $\lambda$ redonne le primal, et par minimax :

$$\boxed{\;\underbrace{\min_{x\in\mathbb R^d}\max_{\lambda\geqslant0}\mathfrak L(x,\lambda)}_{\text{PRIMAL}}\ \geqslant\ \underbrace{\max_{\lambda\geqslant0}\min_{x\in\mathbb R^d}\mathfrak L(x,\lambda)}_{\text{DUAL}}\;}$$

*« Les valeurs primales sont **toujours supérieures ou égales** aux valeurs duales. »*

### 3.3 Pourquoi le dual est facile

**Trois faits en cascade :**

1. Pour un $\lambda$ donné, $\min_x\mathfrak L(x,\lambda)$ est un problème **SANS CONTRAINTES**. *« Si le résoudre est facile, alors le problème global est facile. »*
2. $\mathfrak L(x,\lambda)$ est **AFFINE en $\lambda$**. Donc $\min_x\mathfrak L(x,\lambda)$ est un **minimum ponctuel de fonctions affines de $\lambda$**, et **$D(\lambda)$ est CONCAVE — même si $f$ et les $g_i$ sont NON CONVEXES**.
3. Le problème externe, maximiser $\lambda$, est le **maximum d'une fonction concave** : il **se calcule efficacement**.

**La recette** (si $f$ et $g_i$ sont différentiables) : *« dériver le lagrangien par rapport à $x$, annuler la différentielle, et résoudre pour la valeur optimale. »*

### 3.4 Les contraintes d'égalité

$$\min_xf(x)\quad\text{s.c.}\quad g_i(x)\leqslant0\ (i=1,\dots,m)\quad\text{et}\quad h_j(x)=0\ (j=1,\dots,n)$$

> **L'astuce.** *« On modélise les contraintes d'égalité en les **remplaçant par DEUX inégalités** : pour chaque $h_j(x)=0$, on met $h_j(x)\leqslant0$ **ET** $h_j(x)\geqslant0$. Il se trouve que les multiplicateurs de Lagrange résultants sont alors **NON CONTRAINTS**. »*

$$\boxed{\;\lambda_i\geqslant0\text{ pour les INÉGALITÉS}\qquad\text{multiplicateurs LIBRES pour les ÉGALITÉS}\;}$$

## 🔴 Concept 4 — L'optimisation convexe (§7.3)

### 4.1 Ensembles et fonctions convexes

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 7.2 (Ensemble convexe).</span>

$\mathcal C$ est **convexe** si pour tous $x,y\in\mathcal C$ et tout scalaire $\theta$ avec $0\leqslant\theta\leqslant1$ :

$$\boxed{\;\theta x+(1-\theta)y\in\mathcal C\;}$$

</div>

*« Les ensembles convexes sont ceux tels que **la ligne droite reliant deux éléments de l'ensemble reste À L'INTÉRIEUR** de l'ensemble. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 7.3 (Fonction convexe).</span>

$f:\mathbb R^D\to\mathbb R$ de domaine convexe est **CONVEXE** si pour tous $x,y$ du domaine et tout $\theta\in[0,1]$ :

$$\boxed{\;f\big(\theta x+(1-\theta)y\big)\leqslant\theta f(x)+(1-\theta)f(y)\;}$$

</div>

*« Les fonctions convexes sont celles telles qu'une **ligne droite entre deux points de la fonction reste AU-DESSUS** de la fonction. »* Une fonction **CONCAVE** est **l'opposée** d'une convexe.

> **L'ÉPIGRAPHE — le pont entre les deux notions.** *« Une fonction convexe est un objet **en forme de BOL**, et on imagine y **verser de l'eau** pour le remplir. Cet ensemble rempli est appelé l'**ÉPIGRAPHE** de la fonction convexe, et c'est un **ENSEMBLE CONVEXE**. »*

### 4.2 Les trois caractérisations

| Ordre | Condition | Hypothèse |
|---|---|---|
| **0** | $f(\theta x+(1-\theta)y)\leqslant\theta f(x)+(1-\theta)f(y)$ | aucune |
| **1** | $\boxed{f(y)\geqslant f(x)+\nabla_xf(x)^\top(y-x)}$ | $f$ **différentiable** |
| **2** | $\boxed{\nabla_x^2f(x)\ \text{SEMI-DÉFINIE POSITIVE}}$ | $f$ **deux fois différentiable** |

> **La lecture de la condition d'ordre 1.** La **TANGENTE** en $x$ reste **SOUS** la fonction, partout. C'est ce qui garantit qu'un point de gradient nul est un **minimum GLOBAL**.

**Exemple 7.3 — l'entropie négative $f(x)=x\log_2x$, convexe pour $x>0$.**

**Test par la définition 7.3**, avec $x=2$, $y=4$, $\theta=0{,}5$ :

$$\text{gauche : }f(0{,}5\cdot2+0{,}5\cdot4)=f(3)=3\log_23\approx4{,}75$$

$$\text{droite : }0{,}5(2\log_22)+0{,}5(4\log_24)=1+4=5$$

⚠️ $4{,}75\leqslant5$ la définition est satisfaite.

**Test par la condition d'ordre 1.** La dérivée :

$$\nabla_x(x\log_2x)=1\cdot\log_2x+x\cdot\frac{1}{x\log_e2}=\log_2x+\frac{1}{\log_e2}$$

Avec $x=2$, $y=4$ :

$$\text{gauche : }f(4)=8$$

$$\text{droite : }f(2)+\nabla f(2)\cdot(4-2)=2+\left(1+\frac{1}{\log_e2}\right)\cdot2\approx6{,}9$$

⚠️ $8\geqslant6{,}9$

> ⚠️ **La mise en garde du livre.** *« Pour PROUVER la convexité de $f(x)$, il faudrait vérifier **pour TOUS les points** $x\in\mathbb R$. »* Deux points ne font qu'**illustrer**.

<details><summary>Recalcul exact des quatre quantités</summary>

$f(3)=3\log_23=4{,}754888$ (le livre : « $\approx4{,}75$ »)

$0{,}5f(2)+0{,}5f(4)=0{,}5\cdot2+0{,}5\cdot8=1+4=5{,}0$

$f(4)=4\log_24=8{,}0$

$f(2)+f'(2)\cdot2=2+(1+1/\ln2)\cdot2=2+(1+1{,}442695)\cdot2=6{,}885390$ (le livre : « $\approx6{,}9$ »)

Les deux inégalités sont vérifiées

</details>

### 4.3 Les opérations qui préservent la convexité

> **La stratégie pratique.** *« On peut vérifier qu'une fonction ou un ensemble est convexe **depuis les premiers principes**. En pratique, on s'appuie souvent sur des **OPÉRATIONS QUI PRÉSERVENT LA CONVEXITÉ**. Bien que les détails soient très différents, c'est de nouveau l'idée de **CLÔTURE** introduite au chapitre 2 pour les espaces vectoriels. »*

**Exemple 7.4 — une somme pondérée NON NÉGATIVE de fonctions convexes est convexe.**

**Étape 1 — la multiplication scalaire.** Si $f$ est convexe et $\alpha\geqslant0$, alors $\alpha f$ est convexe : on **multiplie $\alpha$ des deux côtés** de la définition 7.3, et *« multiplier par un nombre **NON NÉGATIF** ne change pas l'inégalité »*. C'est là qu'intervient la **non-négativité**.

**Étape 2 — la somme.** Pour $f_1,f_2$ convexes :

$$f_1(\theta x+(1-\theta)y)\leqslant\theta f_1(x)+(1-\theta)f_1(y)$$

$$f_2(\theta x+(1-\theta)y)\leqslant\theta f_2(x)+(1-\theta)f_2(y)$$

En **sommant** puis en **réarrangeant** le membre de droite :

$$\theta\big(f_1(x)+f_2(x)\big)+(1-\theta)\big(f_1(y)+f_2(y)\big)$$

ce qui **achève la preuve**.

**Conclusion :** $\alpha f_1(x)+\beta f_2(x)$ est convexe pour $\alpha,\beta\geqslant0$.

> **L'INÉGALITÉ DE JENSEN.** *« Les inégalités de ce type — les résultats obtenus en prenant des **combinaisons convexes de fonctions convexes** — sont toutes appelées **inégalité de JENSEN**. »*

### 4.4 La définition du problème convexe

$$\boxed{\;\min_xf(x)\quad\text{s.c.}\quad g_i(x)\leqslant0,\quad h_j(x)=0\;}$$

où **toutes** les $f$ et $g_i$ sont **convexes** et tous les $h_j(x)=0$ sont des **ensembles convexes**.

> **LA PROPRIÉTÉ QUI CHANGE TOUT — LA DUALITÉ FORTE.** *« Dans ce cadre, on a la **DUALITÉ FORTE** : la solution optimale du problème DUAL est **LA MÊME** que la solution optimale du problème PRIMAL. »*

> ⚠️ **Le flou terminologique.** *« La distinction entre **fonctions convexes** et **ensembles convexes** n'est souvent pas présentée strictement dans la littérature d'apprentissage automatique, mais on peut souvent inférer le sens du contexte. »*

## 🟠 Concept 5 — Programmation linéaire et quadratique

### 5.1 Le programme linéaire

$$\boxed{\;\min_{x\in\mathbb R^d}c^\top x\quad\text{s.c.}\quad Ax\leqslant b\;}$$

avec $A\in\mathbb R^{m\times d}$, $b\in\mathbb R^m$ : **$d$ variables** et **$m$ contraintes linéaires**.

> *« Les programmes linéaires sont **l'une des approches les plus utilisées dans l'industrie**. »*

**La dérivation du dual, en quatre pas.**

**Étape 1 — le lagrangien.** $\mathfrak L(x,\lambda)=c^\top x+\lambda^\top(Ax-b)$

**Étape 2 — réarranger en $x$.** $\mathfrak L(x,\lambda)=(c+A^\top\lambda)^\top x-\lambda^\top b$

**Étape 3 — annuler la dérivée en $x$.** $c+A^\top\lambda=0$

**Étape 4 — le lagrangien dual.** $D(\lambda)=-\lambda^\top b$, d'où

$$\boxed{\;\max_{\lambda\in\mathbb R^m}-b^\top\lambda\quad\text{s.c.}\quad c+A^\top\lambda=0,\ \ \lambda\geqslant0\;}$$

> **Le choix stratégique.** *« C'est **AUSSI un programme linéaire, mais avec $m$ variables**. On a le choix de résoudre le primal ou le dual **selon que $m$ ou $d$ est plus grand** »* — $d$ = nombre de variables, $m$ = nombre de contraintes du primal.

⚠️ **La convention** : *« on MINIMISE le primal et on MAXIMISE le dual. »*

**Exemple 7.5.**

$$\min_{x\in\mathbb R^2}-\begin{bmatrix}5\\3\end{bmatrix}^\top\begin{bmatrix}x_1\\x_2\end{bmatrix}\quad\text{s.c.}\quad\begin{bmatrix}2&2\\2&-4\\-2&1\\0&-1\\0&1\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix}\leqslant\begin{bmatrix}33\\8\\-5\\-1\\8\end{bmatrix}$$

Traduites en langage lisible (la légende de la figure 7.9) :

$$2x_2\leqslant33-2x_1,\qquad4x_2\geqslant2x_1-8,\qquad x_2\leqslant2x_1-5,\qquad x_2\geqslant1,\qquad x_2\leqslant8$$

> *« La fonction objectif est **linéaire**, ce qui donne des **lignes de niveau LINÉAIRES**. La valeur optimale doit se trouver dans la région **RÉALISABLE** (ombrée). »*

<details><summary>Résolution par énumération des sommets (le livre ne donne pas la valeur)</summary>

En intersectant les contraintes deux à deux et en gardant les points **réalisables**, le polygone a **cinq sommets** :

$$(3;1),\quad(6;1),\quad(6{,}5;8),\quad(8{,}5;8),\quad\left(\tfrac{37}{3};\tfrac{25}{6}\right)=(12{,}3\overline3\ ;\ 4{,}1\overline6)$$

⚠️ **L'optimum d'un PL est TOUJOURS atteint en un SOMMET** (l'objectif étant linéaire). En évaluant $-5x_1-3x_2$ :

$$f\left(\tfrac{37}{3},\tfrac{25}{6}\right)=-5\cdot\tfrac{37}{3}-3\cdot\tfrac{25}{6}=-\tfrac{185}{3}-\tfrac{25}{2}=-\tfrac{445}{6}\approx-74{,}1\overline6$$

C'est le minimum sur les cinq sommets. Ce sommet est l'intersection de $2x_1+2x_2=33$ et $2x_1-4x_2=8$, **les deux contraintes ACTIVES** à l'optimum. Ce point est **hors du cadre $[0,8]^2$** dessiné dans l'extrait de la figure 7.9.

</details>

### 5.2 Le programme quadratique

$$\boxed{\;\min_{x\in\mathbb R^d}\frac12x^\top Qx+c^\top x\quad\text{s.c.}\quad Ax\leqslant b\;}$$

avec $A\in\mathbb R^{m\times d}$, $b\in\mathbb R^m$, $c\in\mathbb R^d$, et $Q\in\mathbb R^{d\times d}$ **symétrique DÉFINIE POSITIVE** — *« et donc la fonction objectif est CONVEXE ».*

**La dérivation du dual, en quatre pas.**

**Étape 1 — le lagrangien.** $\mathfrak L(x,\lambda)=\frac12x^\top Qx+(c+A^\top\lambda)^\top x-\lambda^\top b$

**Étape 2 — annuler la dérivée.** $Qx+(c+A^\top\lambda)=0$

**Étape 3 — $Q$ est définie positive, DONC INVERSIBLE :**

$$\boxed{\;x=-Q^{-1}(c+A^\top\lambda)\;}$$

**Étape 4 — substituer dans $\mathfrak L$ :**

$$\boxed{\;D(\lambda)=-\frac12(c+A^\top\lambda)^\top Q^{-1}(c+A^\top\lambda)-\lambda^\top b\;}$$

$$\boxed{\;\max_{\lambda\in\mathbb R^m}\ -\frac12(c+A^\top\lambda)^\top Q^{-1}(c+A^\top\lambda)-\lambda^\top b\quad\text{s.c.}\quad\lambda\geqslant0\;}$$

⚠️ Le dual d'un PQ est **encore un PQ**, en $\lambda$.

**Exemple 7.6.**

$$\min_{x\in\mathbb R^2}\frac12\begin{bmatrix}x_1\\x_2\end{bmatrix}^\top\begin{bmatrix}2&1\\1&4\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix}+\begin{bmatrix}5\\3\end{bmatrix}^\top\begin{bmatrix}x_1\\x_2\end{bmatrix}\quad\text{s.c.}\quad\begin{bmatrix}1&0\\-1&0\\0&1\\0&-1\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix}\leqslant\begin{bmatrix}1\\1\\1\\1\end{bmatrix}$$

Les quatre contraintes forment la **boîte** $-1\leqslant x_1\leqslant1$, $-1\leqslant x_2\leqslant1$. *« L'objectif est quadratique, ce qui donne des **lignes de niveau ELLIPTIQUES**. »*

<details><summary>Résolution exacte (le livre ne donne pas la valeur)</summary>

**Le minimum SANS contraintes** est la solution de $Qx=-c$ :

$$x_{\text{libre}}=[-2{,}428571\ ;\ -0{,}142857]^\top=\left[-\tfrac{17}{7};-\tfrac17\right]^\top$$

⚠️ Il est **HORS de la boîte** ($x_1<-1$), donc l'optimum contraint est **sur le bord**.

**Sur la face $x_1=-1$**, l'objectif devient $2x_2^2+2x_2-4$, de dérivée $4x_2+2=0$, d'où $x_2=-\tfrac12$ — **intérieur** à $[-1,1]$

$$\boxed{\;x^*=\left[-1\ ;\ -\tfrac12\right]^\top,\qquad f(x^*)=-\tfrac92=-4{,}5\;}$$

**Contrôle :** $\frac12\big(2\cdot1+2\cdot(-1)(-\tfrac12)+4\cdot\tfrac14\big)+5(-1)+3(-\tfrac12)=\frac12(2+1+1)-5-1{,}5=2-6{,}5=-4{,}5$

**Contrôle de convexité :** valeurs propres de $Q$ : $3\pm\sqrt2$, soit $4{,}414$ et $1{,}586$ — **toutes deux $>0$**, donc $Q$ est **définie positive**

</details>

> ⚠️ **Une inexactitude de rédaction dans le livre.** L'exemple 7.6 décrit $Q$ comme *« semi-définie positive »*, alors que le §7.3.2 exige explicitement **définie positive** — et $Q=\begin{bmatrix}2&1\\1&4\end{bmatrix}$ **est bien définie positive** ($3\pm\sqrt2>0$). C'est la version définie positive qui compte : elle seule garantit l'inversibilité de $Q$ utilisée à l'étape 3 de la dérivation du dual.

## 🟠 Concept 6 — Legendre-Fenchel et le conjugué convexe (§7.3.3)

### 6.1 L'idée géométrique

**La chaîne de raisonnement du livre, en cinq maillons :**

1. Un **ensemble convexe** peut être décrit de façon équivalente par ses **HYPERPLANS D'APPUI** (*supporting hyperplanes*).
2. Un **hyperplan d'appui** d'un ensemble convexe **l'intersecte** et laisse l'ensemble **entièrement d'un seul côté**.
3. L'**épigraphe** d'une fonction convexe est un ensemble convexe.
4. Donc les **fonctions convexes** se décrivent aussi par leurs hyperplans d'appui.
5. Or *« l'hyperplan d'appui **touche juste** la fonction convexe : c'est en fait la **TANGENTE** en ce point. »*

$$\boxed{\;\text{Une fonction convexe peut être décrite de façon ÉQUIVALENTE par une FONCTION DE SON GRADIENT.}\;}$$

> **La transformée de Legendre-Fenchel** est *« une transformation (au sens d'une transformée de Fourier) d'une fonction convexe différentiable $f(x)$ vers une fonction qui dépend des **TANGENTES** $s(x)=\nabla_xf(x)$. »* *« C'est une transformation **DE LA FONCTION** $f(\cdot)$ — **PAS de la variable $x$**, ni de la fonction évaluée en $x$. »*

### 6.2 La définition

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 7.4 (Conjugué convexe).</span>

$$\boxed{\;f^*(s)=\sup_{x\in\mathbb R^D}\big(\langle s,x\rangle-f(x)\big)\;}$$

</div>

⚠️ *« Cette définition **ne requiert PAS** que $f$ soit convexe **ni différentiable**. »*

**La construction géométrique en une dimension.** Pour $f(x)=x^2$ (un hyperplan devient une **droite**) :

- Fixer la pente $s\in\mathbb R$ et considérer la droite $y=sx+c$.
- Pour chaque point $(x_0,f(x_0))$, trouver **la valeur MINIMALE de $c$** telle que la droite intersecte encore $(x_0,f(x_0))$ — c'est là où une droite de pente $s$ « **touche juste** » la fonction.
- La droite passant par $(x_0,f(x_0))$ de pente $s$ est $y-f(x_0)=s(x-x_0)$, d'**ordonnée à l'origine** $-sx_0+f(x_0)$.
- Le minimum de $c$ est donc $\displaystyle\inf_{x_0}\big(-sx_0+f(x_0)\big)$.

$$\boxed{\;\text{Le conjugué convexe est, PAR CONVENTION, l'OPPOSÉ de cette quantité}\;}$$

⚠️ Ce raisonnement *« ne reposait pas sur le fait que la fonction soit unidimensionnelle, convexe et différentiable : il vaut pour $f:\mathbb R^D\to\mathbb R$ **non convexes et non différentiables** ».*

### 6.3 Deux exemples de machine learning

**Exemple 7.7 — la forme quadratique à noyau.** Pour $K\in\mathbb R^{n\times n}$ **définie positive**, variable primale $y\in\mathbb R^n$, duale $\alpha\in\mathbb R^n$ :

$$f(y)=\frac\lambda2y^\top K^{-1}y$$

$$f^*(\alpha)=\sup_{y\in\mathbb R^n}\left(\langle y,\alpha\rangle-\frac\lambda2y^\top K^{-1}y\right)$$

**Étape 1 — annuler la dérivée.** $\dfrac{\partial}{\partial y}\left(\langle y,\alpha\rangle-\frac\lambda2y^\top K^{-1}y\right)=(\alpha-\lambda K^{-1}y)^\top=0$, d'où $y=\dfrac1\lambda K\alpha$.

**Étape 2 — substituer.**

$$f^*(\alpha)=\frac1\lambda\alpha^\top K\alpha-\frac\lambda2\left(\frac1\lambda K\alpha\right)^\top K^{-1}\left(\frac1\lambda K\alpha\right)$$

$$\boxed{\;f^*(\alpha)=\frac{1}{2\lambda}\alpha^\top K\alpha\;}$$

<details><summary>Contrôle numérique</summary>

Avec $\lambda=2$, $K=\begin{bmatrix}3&1\\1&2\end{bmatrix}$ et $\alpha=[1;-0{,}5]^\top$ :

$y^*=\tfrac12K\alpha=\tfrac12[2{,}5\ ;\ 0]^\top=[1{,}25\ ;\ 0]^\top$

Valeur du supremum : $\langle y^*,\alpha\rangle-\tfrac\lambda2(y^*)^\top K^{-1}y^*=\mathbf{0{,}625}$

Formule (7.62) : $\tfrac{1}{2\lambda}\alpha^\top K\alpha=\tfrac14(3-1-0{,}5+0{,}5)=\mathbf{0{,}625}$ **Identiques.**

</details>

**Exemple 7.8 — le conjugué d'une SOMME de pertes.** *« En apprentissage automatique on utilise souvent des sommes de fonctions : l'objectif d'entraînement inclut une somme des pertes pour chaque exemple. »* Avec $L(t)=\sum_{i=1}^{n}\ell_i(t_i)$ :

$$L^*(z)=\sup_{t\in\mathbb R^n}\left(\langle z,t\rangle-\sum_{i=1}^{n}\ell_i(t_i)\right)=\sup_{t\in\mathbb R^n}\sum_{i=1}^{n}\big(z_it_i-\ell_i(t_i)\big)$$

⚠️ **Le pas clé** : chaque terme ne dépend que de $t_i$, donc le supremum **se décompose terme à terme** :

$$\boxed{\;L^*(z)=\sum_{i=1}^{n}\ell_i^*(z_i)\;}$$

*« Le conjugué d'une somme séparable est la **SOMME des conjugués**. »*

### 6.4 La dualité de Fenchel

**Exemple 7.9.** Pour $f(y)$ et $g(x)$ **convexes** et $A$ une matrice réelle telle que $Ax=y$ :

$$\min_xf(Ax)+g(x)=\min_{Ax=y}f(y)+g(x)$$

**Étape 1 — introduire le multiplicateur $u$ :**

$$\min_{Ax=y}f(y)+g(x)=\min_{x,y}\max_uf(y)+g(x)+(Ax-y)^\top u$$

**Étape 2 — échanger max et min.** *« Cette dernière étape est due au fait que $f(y)$ et $g(x)$ sont des fonctions CONVEXES »* — c'est la **dualité FORTE** :

$$=\max_u\min_{x,y}f(y)+g(x)+(Ax-y)^\top u$$

**Étape 3 — séparer le produit scalaire et regrouper :**

$$=\max_u\left[\min_y\big(-y^\top u+f(y)\big)+\min_x\big(x^\top A^\top u+g(x)\big)\right]$$

**Étape 4 — reconnaître les conjugués** (les produits scalaires sont symétriques) :

$$\boxed{\;\min_xf(Ax)+g(x)=\max_u\ -f^*(u)-g^*(-A^\top u)\;}$$

> **L'usage.** *« Le conjugué de Legendre-Fenchel se révèle très utile pour les problèmes d'apprentissage exprimables comme des problèmes d'optimisation convexe. En particulier, **pour des fonctions de PERTE CONVEXES appliquées INDÉPENDAMMENT à chaque exemple, la PERTE CONJUGUÉE est une façon commode de dériver un problème DUAL**. »*

> ⚠️ **La généralisation.** *« Pour des produits intérieurs généraux, $A^\top$ est remplacé par l'**ADJOINT $A^*$**. »*

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Trouver les points stationnaires » | **§7.0** | Annuler $f'$ ; classer par le **signe de $f''$** |
| « Minimiser $f$, pas de contraintes » | **§7.1** | $x_{i+1}=x_i-\gamma_i(\nabla f(x_i))^\top$ |
| « Le pas est-il bon ? » | **§7.1.1** | Si $f$ **augmente** : annuler et **réduire**. Si $f$ diminue : essayer d'**augmenter** |
| « Pourquoi la convergence est-elle lente ? » | **Conditionnement** | Calculer $\kappa=\sigma_{\max}/\sigma_{\min}$ ; grand $\kappa$ $\Rightarrow$ **vallée longue et mince** $\Rightarrow$ zigzag |
| « Comment accélérer ? » | **Momentum** | Ajouter $\alpha\Delta x_i$ avec $\alpha\in[0,1]$ |
| « L'objectif est une somme sur $N$ exemples » | **SGD** | Estimer le gradient sur un **mini-lot** |
| « Minimiser sous contraintes $g_i\leqslant0$ » | **§7.2** | Lagrangien $f(x)+\lambda^\top g(x)$ avec $\lambda\geqslant0$ |
| « Contrainte d'égalité $h_j=0$ » | **§7.2** | La scinder en $h_j\leqslant0$ et $h_j\geqslant0$ ; multiplicateur **NON contraint** |
| « Écrire le problème dual » | **Déf. 7.1** | $\max_\lambda D(\lambda)$ avec $D(\lambda)=\min_x\mathfrak L(x,\lambda)$ ; contrainte $\lambda\geqslant0$ |
| « Comparer primal et dual » | **Dualité faible** | $\min\max\geqslant\max\min$ — le dual **minore** toujours le primal |
| « Y a-t-il un écart de dualité ? » | **§7.3** | **NON** si le problème est **convexe** — dualité **FORTE** |
| « Cet ensemble est-il convexe ? » | **Déf. 7.2** | $\theta x+(1-\theta)y\in\mathcal C$ pour tout $\theta\in[0,1]$ |
| « Cette fonction est-elle convexe ? » | **Déf. 7.3** | Trois options : la définition · la **tangente sous $f$** · la **hessienne SDP** |
| « Montrer qu'une combinaison est convexe » | **Ex. 7.4** | Somme pondérée **NON NÉGATIVE** de convexes ; le signe de $\alpha$ compte |
| « Objectif et contraintes linéaires » | **PL** | $\min c^\top x$ s.c. $Ax\leqslant b$ ; l'optimum est en un **SOMMET** |
| « Objectif quadratique, contraintes affines » | **PQ** | Vérifier $Q$ définie positive ; dual : $-\frac12(c+A^\top\lambda)^\top Q^{-1}(c+A^\top\lambda)-\lambda^\top b$ |
| « Calculer le conjugué convexe » | **Déf. 7.4** | $f^*(s)=\sup_x(\langle s,x\rangle-f(x))$ : dériver, annuler, substituer |
| « Conjugué d'une somme de pertes » | **Ex. 7.8** | **Somme des conjugués** — le supremum se décompose |

## Comment résoudre : les cinq méthodes pas-à-pas

**Méthode A — Descente de gradient à la main.**

1. Écrire $\nabla f$ explicitement.
2. Vérifier ses **dimensions** (vecteur ligne $1\times d$) et **transposer** pour la mise à jour.
3. Évaluer $\nabla f(x_0)$ ; la direction de descente est **l'OPPOSÉE**.
4. $x_1=x_0-\gamma\nabla f(x_0)^\top$.
5. **Contrôle** : $f(x_1)\leqslant f(x_0)$ ? Sinon, **le pas est trop grand**.
6. Pour une quadratique, le minimum exact est la solution de $Qx=c$ — comparer.

**Méthode B — Écrire un problème dual.**

1. Mettre le primal sous forme standard : $\min f(x)$ s.c. $g_i(x)\leqslant0$.
2. Scinder les **égalités** en deux inégalités (multiplicateurs libres).
3. $\mathfrak L(x,\lambda)=f(x)+\lambda^\top g(x)$.
4. **Regrouper les termes en $x$**.
5. $\partial\mathfrak L/\partial x=0$ ; résoudre pour $x^*(\lambda)$.
6. **Substituer** dans $\mathfrak L$ pour obtenir $D(\lambda)$.
7. Le dual : $\max_\lambda D(\lambda)$ s.c. $\lambda\geqslant0$ **plus** les équations issues de l'étape 5.
8. **Contrôle** : $D$ doit être **CONCAVE**.

**Méthode C — Prouver la convexité.**

1. Le domaine est-il un **ensemble convexe** ?
2. Si $f$ est deux fois différentiable : calculer $\nabla^2f$ et tester la **semi-définie positivité** (le plus rapide).
3. Sinon, si différentiable : vérifier $f(y)\geqslant f(x)+\nabla f(x)^\top(y-x)$.
4. Sinon : la définition 7.3 directement.
5. **Alternative** : décomposer $f$ en briques convexes connues et invoquer les **opérations qui préservent la convexité**.

**Méthode D — Résoudre un PL à deux variables.**

1. Tracer les demi-plans ; identifier la **région réalisable**.
2. **Énumérer les SOMMETS** en intersectant les contraintes **deux à deux**.
3. Écarter les intersections **non réalisables**.
4. Évaluer $c^\top x$ en chaque sommet ; l'optimum est **toujours en un sommet**.
5. **Contrôle** : identifier les contraintes **ACTIVES** à l'optimum.

**Méthode E — Résoudre un PQ à contraintes de boîte.**

1. Vérifier que $Q$ est **définie positive** (valeurs propres $>0$).
2. Calculer le **minimum libre** : $Qx=-c$.
3. S'il est **dans** la boîte, c'est fini.
4. Sinon, minimiser sur chaque **face** (fixer une variable à sa borne, optimiser l'autre).
5. Retenir la meilleure face ; vérifier que la variable libre reste **dans ses bornes**.
6. **Contrôle** : recalculer $f(x^*)$ directement.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Monter dans la direction du gradient | Le gradient pointe vers la **MONTÉE** — pour minimiser, prendre son **OPPOSÉ** |
| Oublier la transposition dans la mise à jour | Le gradient est un **vecteur LIGNE** ; sans $^\top$ *« les dimensions ne marchent pas »* |
| Croire que la descente trouve le minimum global | Elle trouve un minimum **LOCAL** — sauf si $f$ est **convexe** |
| Ignorer le point de départ | Figure 7.2 : partir de $x_0=0$ mène au **mauvais minimum** |
| Chercher une solution algébrique pour un polynôme de degré $\geqslant5$ | **Théorème d'ABEL-RUFFINI** : il n'y en a **pas en général** |
| Prendre un pas trop grand pour aller plus vite | Risque de **dépassement, non-convergence, DIVERGENCE** |
| Utiliser un pas fixe sur un problème mal conditionné | Grand $\kappa$ $\Rightarrow$ **ZIGZAG** ; recourir au **momentum** ou au **préconditionnement** |
| Confondre conditionnement et déterminant | $\kappa=\sigma_{\max}/\sigma_{\min}$ — un rapport de **valeurs SINGULIÈRES** |
| Choisir $P=A$ comme préconditionneur | Le conditionnement serait parfait mais $P^{-1}$ **coûte autant que le problème** |
| Croire que $\alpha>1$ accélère le momentum | $\alpha\in[0,1]$ |
| Croire que les grands mini-lots sont toujours meilleurs | Le **BRUIT** des petits lots aide à **sortir des mauvais minima locaux** |
| Chercher une estimation très précise du minimum | Le but réel est la **GÉNÉRALISATION** — d'où l'acceptabilité des gradients approchés |
| Utiliser la fonction indicatrice comme pénalité | La **marche infinie est tout aussi difficile à optimiser** — c'est pourquoi on la **relâche en une LINÉAIRE** |
| Autoriser $\lambda<0$ pour une inégalité | $\lambda_i\geqslant0$ est **obligatoire** pour les inégalités |
| Contraindre les multiplicateurs des égalités | Ils sont **LIBRES** (résultat des deux inégalités opposées) |
| Écrire la dualité faible dans le mauvais sens | $\min\max\geqslant\max\min$ : le **PRIMAL MAJORE le DUAL** |
| Croire que $D(\lambda)$ hérite de la non-convexité de $f$ | $D$ est **TOUJOURS CONCAVE** — c'est un minimum ponctuel de fonctions **affines** en $\lambda$ |
| Supposer la dualité forte en général | Elle exige un problème **CONVEXE** |
| Confondre ensemble convexe et fonction convexe | Ensemble : la **corde reste dedans**. Fonction : la **corde reste AU-DESSUS** |
| Croire une somme de convexes toujours convexe | Seulement pour des **poids NON NÉGATIFS** |
| Prouver la convexité sur deux points | Il faut **tous** les points — deux points ne font qu'**illustrer** |
| Exiger $\nabla^2f\succ0$ | La convexité demande seulement $\nabla^2f\succeq0$ (**semi**-définie positive) |
| Chercher l'optimum d'un PL à l'intérieur | Il est **toujours atteint en un SOMMET** |
| Inverser $Q$ sans vérifier sa définie positivité | C'est **elle** qui garantit l'inversibilité à l'étape 3 du dual du PQ |
| Résoudre systématiquement le primal | Choisir **selon que $m$ ou $d$ est plus grand** |
| Croire que le conjugué exige la convexité | La définition 7.4 ne requiert **ni convexité ni différentiabilité** |
| Croire que Legendre-Fenchel transforme la variable | C'est une transformation **DE LA FONCTION**, pas de $x$ ni de $f(x)$ |
| Oublier le signe dans $g^*(-A^\top u)$ | Le **moins** vient du regroupement de l'étape 3 de l'exemple 7.9 |

## 📌 Ultimate Review

```
════════ LES HUIT FORMULES À SAVOIR SANS HÉSITER ════════
  1.  xi+1 = xi − γi ((∇f)(xi))ᵀ              descente de gradient
  2.  κ = σmax / σmin                          CONDITIONNEMENT
  3.  MOMENTUM  xi+1 = xi − γi(∇f)ᵀ + α Δxi ,  α ∈ [0,1]
  4.  SGD       L(θ) = Σn Ln(θ)  →  gradient sur un MINI-LOT
  5.  LAGRANGIEN  L(x,λ) = f(x) + λᵀ g(x) ,  λ ≥ 0
      DUAL        D(λ) = min_x L(x,λ)      max_{λ≥0} D(λ)
  6.  MINIMAX / DUALITÉ FAIBLE   min max L ≥ max min L
  7.  CONVEXITÉ   f(θx+(1−θ)y) ≤ θf(x)+(1−θ)f(y)
                  f(y) ≥ f(x) + ∇f(x)ᵀ(y−x)         (tangente SOUS f)
                  ∇²f ⪰ 0                            (hessienne SDP)
  8.  CONJUGUÉ    f*(s) = sup_x (⟨s,x⟩ − f(x))
                  min_x f(Ax)+g(x) = max_u −f*(u) − g*(−Aᵀu)
═════════════════════════════════════════════════════════
```

**Le tableau des trois variantes de descente :**

| Méthode | Mise à jour | Ce qu'elle apporte |
|---|---|---|
| **Descente simple** | $x_i-\gamma(\nabla f)^\top$ | La base ; **zigzague** si mal conditionné |
| **Momentum** | $+\ \alpha\Delta x_i$ | Une **MÉMOIRE** : amortit les oscillations, moyenne les gradients bruités |
| **SGD** | Gradient sur un **mini-lot** | **Passage à l'échelle** ; le bruit aide à s'échapper des minima locaux |

**Le tableau primal / dual :**

|  | **PRIMAL** | **DUAL** |
|---|---|---|
| Variables | $x\in\mathbb R^d$ | $\lambda\in\mathbb R^m$ |
| Sens | **MIN** | **MAX** |
| Contraintes | $g_i(x)\leqslant0$ | $\lambda\geqslant0$ |
| Nature de l'objectif | quelconque | **TOUJOURS CONCAVE** |
| Relation | $\geqslant$ | dualité **FAIBLE** en général, **FORTE** si convexe |
| **PL** $\min c^\top x$ s.c. $Ax\leqslant b$ | $d$ variables, $m$ contraintes | $\max-b^\top\lambda$ s.c. $c+A^\top\lambda=0$, $\lambda\geqslant0$ |
| **PQ** $\min\frac12x^\top Qx+c^\top x$ | $Q\succ0$ | $\max-\frac12(c+A^\top\lambda)^\top Q^{-1}(c+A^\top\lambda)-\lambda^\top b$ |

**Les deux dualités du chapitre :**

|  | **Lagrangienne** (§7.2) | **Legendre-Fenchel** (§7.3.3) |
|---|---|---|
| Point de départ | Le problème **AVEC contraintes** | La fonction, **SANS contraintes** |
| Mécanisme | Relâcher l'indicatrice en une **linéaire** | Décrire $f$ par ses **hyperplans d'appui** |
| Objet dual | Les multiplicateurs $\lambda$ | Le conjugué $f^*$ dépendant du **gradient** |
| Résultat | $\max_\lambda\min_x\mathfrak L$ | $\min_xf(Ax)+g(x)=\max_u-f^*(u)-g^*(-A^\top u)$ |

**Où chaque notion resservira dans le livre :**

| Notion du ch. 7 | Suite |
|---|---|
| Descente de gradient, SGD | Entraînement de **tous** les modèles (ch. 9-12) |
| Moindres carrés et gradient | **Régression linéaire** (ch. 9) |
| Optimisation convexe, dualité | **Réduction de dimension** (ch. 10) |
| Multiplicateurs de Lagrange | **ACP** (ch. 10), **estimation de densité** (ch. 11) |
| Programme quadratique, dual | **SVM** (ch. 12) — le PQ dual **est** le SVM |
| Conjugué convexe des pertes | Dérivation des **problèmes duaux** de classification |

## 🧠 Active Recall

**Cadre et descente de gradient**

1. Quelles sont les deux branches de l'optimisation continue ?
2. Quelle est la convention de sens en apprentissage automatique ?
3. Qu'est-ce qu'un point stationnaire ? Comment le classer ?
4. Combien de points stationnaires a $\ell(x)=x^4+7x^3+5x^2-17x+3$, et de quelle nature ?
5. Que dit le théorème d'Abel-Ruffini et pourquoi est-ce pertinent ?
6. Quelle est LA propriété des fonctions convexes qui motive tout le chapitre ?
7. Écrire l'algorithme de descente de gradient. Pourquoi la transposition ?
8. Comment le gradient se situe-t-il par rapport aux lignes de niveau ?
9. Détailler la première itération de l'exemple 7.1.
10. Pourquoi la descente zigzague-t-elle ? Quelle grandeur mesure ce phénomène ?
11. Quels sont les deux dangers du mauvais choix de pas ?
12. Donner les deux heuristiques adaptatives. Que garantit l'étape d'annulation ?
13. Écrire le conditionnement. Que mesure-t-il ?
14. Qu'est-ce qu'un préconditionneur ? Quel est le double objectif ?
15. Écrire la mise à jour avec momentum. Quel est l'intervalle de $\alpha$ ?
16. Donner les deux justifications du momentum.
17. Qu'est-ce que le SGD ? Que signifie « stochastique » ici ?
18. Écrire la forme de l'objectif exploitée. Donner l'exemple de la régression.
19. Comparer grands et petits mini-lots sur cinq critères.
20. Pourquoi une estimation imprécise du minimum est-elle acceptable ?

**Contraintes et dualité** 21. Écrire le problème contraint standard. 22. Pourquoi la fonction indicatrice est-elle impraticable ? Quelle est l'idée de Lagrange ? 23. Écrire le lagrangien. Quelle contrainte pèse sur $\lambda$ ? 24. Définir le problème dual lagrangien. 25. Énoncer l'inégalité minimax et la démontrer. 26. Qu'est-ce que la dualité faible ? Dans quel sens va l'inégalité ? 27. Pourquoi $D(\lambda)$ est-elle toujours concave ? 28. Comment traiter les contraintes d'égalité ? Que deviennent leurs multiplicateurs ?

**Convexité** 29. Définir un ensemble convexe et une fonction convexe. 30. Qu'est-ce que l'épigraphe ? Quel lien fait-il ? 31. Donner les caractérisations d'ordre 1 et d'ordre 2. 32. Vérifier la convexité de $x\log_2x$ sur $x=2$ et $x=4$, par les deux méthodes. 33. Montrer qu'une somme pondérée non négative de convexes est convexe. 34. Qu'est-ce que l'inégalité de Jensen ? 35. Définir un problème d'optimisation convexe. Que garantit-il ?

**PL, PQ, conjugué** 36. Écrire le PL standard. Dériver son dual en quatre pas. 37. Comment choisir entre primal et dual ? 38. Écrire le PQ standard. Quelle condition sur $Q$ et pourquoi ? 39. Dériver le dual du PQ. 40. Où se situe l'optimum d'un PL ? 41. Qu'est-ce qu'un hyperplan d'appui ? 42. Expliquer la chaîne de raisonnement menant à Legendre-Fenchel. 43. Écrire la définition 7.4. Quelles hypothèses sont requises ? 44. Détailler la construction géométrique en une dimension. 45. Calculer le conjugué de $\frac\lambda2y^\top K^{-1}y$. 46. Que vaut le conjugué d'une somme séparable de pertes ? 47. Énoncer la dualité de Fenchel de l'exemple 7.9. Où intervient la convexité ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les deux branches de l'optimisation continue ? | **Sans contraintes** et **sous contraintes** |
| Convention en apprentissage automatique ? | On **MINIMISE** — le meilleur est le **minimum** |
| Direction du gradient ? | Vers la **MONTÉE** — on descend dans son **opposé** |
| Point stationnaire ? | Une **racine réelle de la dérivée** — gradient **nul** |
| Comment classer un point stationnaire ? | Le **signe de la dérivée SECONDE** |
| Le polynôme de la figure 7.2 ? | $x^4+7x^3+5x^2-17x+3$ : min global $\approx-4{,}5$ (valeur $\approx-47$), max $\approx-1{,}4$, min local $\approx0{,}7$ |
| Théorème d'Abel-Ruffini ? | **Pas de solution ALGÉBRIQUE** en général pour les polynômes de degré $\geqslant5$ (Abel, 1826) |
| LA propriété des fonctions convexes ? | **Tous les minima LOCAUX sont GLOBAUX** |
| Algorithme de descente de gradient ? | $x_{i+1}=x_i-\gamma_i\big((\nabla f)(x_i)\big)^\top$ |
| Pourquoi la transposition ? | Le gradient est un **vecteur LIGNE** — sinon les dimensions ne marchent pas |
| Ordre de l'algorithme ? | **PREMIER ordre** — il n'utilise pas la courbure |
| Le gradient et les lignes de niveau ? | Il leur est **ORTHOGONAL** |
| $x_1$ dans l'exemple 7.1 ? | $[-1{,}98\ ;\ 1{,}21]^\top$, depuis $x_0=[-3,-1]$ avec $\gamma=0{,}085$ |
| Direction du gradient négatif en $x_0$ ? | **Nord et est** (les deux composantes sont positives) |
| Pourquoi le zigzag ? | Problème **MAL CONDITIONNÉ** : vallée **longue et mince** |
| Conditionnement ? | $\kappa=\dfrac{\sigma_{\max}}{\sigma_{\min}}$ — rapport des **valeurs SINGULIÈRES** |
| Ce qu'il mesure ? | Le rapport **direction la plus courbée / la moins courbée** |
| $\kappa$ dans l'exemple 7.1 ? | $\approx10{,}31$ (valeurs propres $20{,}06$ et $1{,}94$) |
| Pas trop petit ? | La descente est **LENTE** |
| Pas trop grand ? | **Dépassement, non-convergence, DIVERGENCE** |
| Autre nom du pas ? | Le **TAUX D'APPRENTISSAGE** |
| Heuristique 1 ? | $f$ **augmente** $\Rightarrow$ **ANNULER** le pas et le **réduire** |
| Heuristique 2 ? | $f$ **diminue** $\Rightarrow$ essayer de l'**augmenter** |
| Ce que garantit l'annulation ? | Une convergence **MONOTONE** |
| Préconditionneur ? | $P$ tel qu'on résolve $P^{-1}(Ax-b)=0$ |
| Son double objectif ? | $P^{-1}A$ **mieux conditionnée** **ET** $P^{-1}$ **facile à calculer** |
| Mise à jour avec momentum ? | $x_{i+1}=x_i-\gamma_i(\nabla f(x_i))^\top+\alpha\Delta x_i$ |
| Intervalle de $\alpha$ ? | $[0,1]$ |
| L'analogie physique ? | Une **BALLE LOURDE**, réticente à changer de direction |
| Ce qu'implémente le momentum ? | Une **MOYENNE MOBILE** — une mémoire |
| Son second usage ? | **MOYENNER des estimations BRUITÉES** du gradient |
| SGD ? | Approximation **stochastique** du gradient, sur un **MINI-LOT** |
| La forme d'objectif exploitée ? | $L(\theta)=\sum_{n=1}^{N}L_n(\theta)$ |
| Exemple en régression ? | $L(\theta)=-\sum_n\log p(y_n\mid x_n,\theta)$ — la **log-vraisemblance négative** |
| Descente standard = quelle méthode ? | Une méthode **PAR LOT** (*batch*) |
| Garantie de convergence du SGD ? | **Presque sûrement** vers un minimum local, si le taux décroît convenablement (Bottou, 1998) |
| Avantages des grands mini-lots ? | Gradient **précis**, convergence **stable**, **vectorisation** optimisée |
| Avantages des petits mini-lots ? | **Rapides** ; le **BRUIT** aide à **SORTIR de mauvais minima locaux** |
| Pourquoi tolérer l'imprécision ? | Le but réel est la **GÉNÉRALISATION**, pas le minimum exact |
| Problème contraint standard ? | $\min_xf(x)$ s.c. $g_i(x)\leqslant0$ |
| Pourquoi pas la fonction indicatrice ? | La **MARCHE INFINIE est tout aussi difficile à optimiser** |
| L'idée de Lagrange ? | **Remplacer la marche par une fonction LINÉAIRE** |
| Le lagrangien ? | $\mathfrak L(x,\lambda)=f(x)+\lambda^\top g(x)$ avec $\lambda\geqslant0$ |
| Variables primales / duales ? | $x$ / $\lambda$ |
| Le problème dual ? | $\max_{\lambda\geqslant0}D(\lambda)$ avec $D(\lambda)=\min_x\mathfrak L(x,\lambda)$ |
| Inégalité minimax ? | $\max_y\min_x\varphi\leqslant\min_x\max_y\varphi$ — le **maximin $\leqslant$ minimax** |
| Dualité faible ? | $\min_x\max_\lambda\mathfrak L\geqslant\max_\lambda\min_x\mathfrak L$ — **le primal MAJORE le dual** |
| $D(\lambda)$ est-elle concave ? | **TOUJOURS** — minimum ponctuel de fonctions **AFFINES** en $\lambda$ |
| Même si $f$ est non convexe ? | **OUI** |
| Traiter une égalité $h_j=0$ ? | La scinder en $h_j\leqslant0$ **et** $h_j\geqslant0$ |
| Le multiplicateur qui en résulte ? | **NON CONTRAINT** (libre) |
| Ensemble convexe ? | $\theta x+(1-\theta)y\in\mathcal C$ — la **corde reste DEDANS** |
| Fonction convexe ? | $f(\theta x+(1-\theta)y)\leqslant\theta f(x)+(1-\theta)f(y)$ — la **corde reste AU-DESSUS** |
| Fonction concave ? | L'**opposée** d'une convexe |
| Épigraphe ? | La fonction convexe « **remplie d'eau** » — un **ENSEMBLE convexe** |
| Convexité d'ordre 1 ? | $f(y)\geqslant f(x)+\nabla_xf(x)^\top(y-x)$ — la **TANGENTE reste SOUS $f$** |
| Convexité d'ordre 2 ? | $\nabla_x^2f(x)$ **SEMI-définie positive** |
| $x\log_2x$ en $x=2,4$, $\theta=0{,}5$ ? | Gauche $=3\log_23\approx4{,}75$ ; droite $=5$ ; $4{,}75\leqslant5$ |
| Sa dérivée ? | $\log_2x+\dfrac{1}{\log_e2}$ |
| Test d'ordre 1 en $x=2,y=4$ ? | $f(4)=8\geqslant f(2)+f'(2)\cdot2\approx6{,}9$ |
| Suffit-il de tester deux points ? | **NON** — il faut **tous** les points |
| Somme pondérée de convexes ? | Convexe **si les poids sont NON NÉGATIFS** |
| Le nom de ces inégalités ? | L'**inégalité de JENSEN** |
| Ce que garantit un problème convexe ? | La **DUALITÉ FORTE** : primal et dual ont **la même** solution optimale |
| Programme linéaire ? | $\min c^\top x$ s.c. $Ax\leqslant b$ |
| Son lagrangien réarrangé ? | $(c+A^\top\lambda)^\top x-\lambda^\top b$ |
| La condition d'optimalité en $x$ ? | $c+A^\top\lambda=0$ |
| Le dual du PL ? | $\max-b^\top\lambda$ s.c. $c+A^\top\lambda=0$, $\lambda\geqslant0$ |
| Combien de variables au dual ? | **$m$** (le nombre de contraintes du primal) |
| Comment choisir primal ou dual ? | Selon que **$m$ ou $d$ est plus grand** |
| Où est l'optimum d'un PL ? | Toujours en un **SOMMET** du polyèdre réalisable |
| Programme quadratique ? | $\min\frac12x^\top Qx+c^\top x$ s.c. $Ax\leqslant b$, avec $Q$ **définie positive** |
| Pourquoi $Q\succ0$ ? | L'objectif est **CONVEXE** et $Q$ est **INVERSIBLE** (nécessaire au dual) |
| $x$ optimal du lagrangien ? | $x=-Q^{-1}(c+A^\top\lambda)$ |
| Le dual du PQ ? | $\max-\frac12(c+A^\top\lambda)^\top Q^{-1}(c+A^\top\lambda)-\lambda^\top b$ s.c. $\lambda\geqslant0$ |
| Hyperplan d'appui ? | Il **intersecte** le convexe et le laisse **entièrement d'un côté** |
| Que touche-t-il exactement ? | Il **est la TANGENTE** en ce point |
| L'idée de Legendre-Fenchel ? | Décrire une fonction convexe par une **FONCTION DE SON GRADIENT** |
| Conjugué convexe ? | $f^*(s)=\sup_x\big(\langle s,x\rangle-f(x)\big)$ |
| Ses hypothèses ? | **AUCUNE** — ni convexité ni différentiabilité requises |
| De quoi est-ce une transformation ? | De la **FONCTION** $f$ — pas de $x$ ni de $f(x)$ |
| L'ordonnée à l'origine de la tangente ? | $-sx_0+f(x_0)$ ; le conjugué est **l'OPPOSÉ** de son infimum |
| Conjugué de $\frac\lambda2y^\top K^{-1}y$ ? | $\dfrac{1}{2\lambda}\alpha^\top K\alpha$ |
| Le $y$ qui atteint le supremum ? | $y=\dfrac1\lambda K\alpha$ |
| Conjugué d'une somme séparable ? | $L^*(z)=\sum_i\ell_i^*(z_i)$ — la **SOMME des conjugués** |
| Dualité de Fenchel ? | $\min_xf(Ax)+g(x)=\max_u-f^*(u)-g^*(-A^\top u)$ |
| Où intervient la convexité ? | Dans l'**échange de max et min** (dualité forte) |
| Pour un produit intérieur général ? | $A^\top$ devient l'**ADJOINT $A^*$** |
| L'usage en apprentissage ? | Pour des **pertes convexes appliquées indépendamment**, la **perte conjuguée** donne le **problème DUAL** |
