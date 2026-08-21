# Fiche 39 — Minimisation sans contrainte : gradient et Newton (Boyd, chapitre 9)

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Boyd & Vandenberghe, *Convex Optimization*, chapitre 9 « Unconstrained minimization », p. 457–520 |
| **Difficulté** | Must know — le premier chapitre algorithmique, et la base de tous les suivants |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 35 (conditions du second ordre), fiche 36 (critère d'optimalité), fiche 12 (descente de gradient, Garrigos) |
| **Concepts clés** | Suite minimisante, forte convexité, conditionnement, méthode de descente, recherche linéaire rétrograde, convergence linéaire, pas de Newton, décrément de Newton, convergence en deux phases, invariance affine |
| **Poids à l'examen** | Trois choses : **écrire** un algorithme de descente correctement (direction, recherche linéaire, critère d'arrêt), **analyser** sa vitesse en fonction du conditionnement, et **expliquer** pourquoi Newton est invariant par changement de coordonnées. |

## 🎯 Vue d'ensemble

On veut résoudre $\min f(x)$ avec $f$ convexe et deux fois continûment dérivable. La condition d'optimalité est

$$\nabla f(x^\star) = 0$$

c'est-à-dire un système de $n$ équations à $n$ inconnues. Sauf cas particuliers, on ne sait pas le résoudre analytiquement : il faut un **algorithme itératif** qui produit une **suite minimisante** $x^{(0)},x^{(1)},\dots$ avec $f(x^{(k)})\to p^\star$.

Tous les algorithmes du chapitre ont la même ossature, et ne diffèrent que par le **choix de la direction** :

```
répéter
  1. choisir une DIRECTION de descente Δx          ← c'est ici que les méthodes diffèrent
  2. RECHERCHE LINÉAIRE : choisir un pas t > 0
  3. mise à jour  x := x + tΔx
jusqu'au critère d'arrêt
```

| Direction | Méthode | Vitesse |
|---|---|---|
| $-\nabla f(x)$ | descente de gradient | **linéaire**, dégradée par le conditionnement |
| $-\nabla^2f(x)^{-1}\nabla f(x)$ | Newton | **quadratique** près de l'optimum, insensible au conditionnement |

## 🟡 Concept 1 — Le cadre et les hypothèses

**Le problème.** $\min f(x)$ avec $f:\mathbb{R}^n\to\mathbb{R}$ convexe et deux fois continûment dérivable — ce qui implique que $\mathbf{dom}\,f$ est **ouvert**. On suppose le problème **soluble** : il existe un point optimal $x^\star$, et l'on note $p^\star = f(x^\star)$.

**La condition d'optimalité (9.2).** $f$ étant dérivable et convexe, une condition **nécessaire et suffisante** d'optimalité est $\nabla f(x^\star)=0$ (fiche 36, §4.2.3).

**Point initial et sous-niveau.** Les méthodes exigent un $x^{(0)}\in\mathbf{dom}\,f$ tel que le sous-niveau initial

$$S = \{x\in\mathbf{dom}\,f \mid f(x)\leq f(x^{(0)})\}$$

soit **fermé**. C'est le cas pour tout $x^{(0)}$ si $f$ est **fermée** (tous ses sous-niveaux le sont) : par exemple si $\mathbf{dom}\,f=\mathbb{R}^n$ et $f$ continue, ou si $f$ est continue de domaine ouvert et tend vers $+\infty$ au bord.

**Trois exemples fondateurs (§9.1.1).**

| Problème | Objectif | Condition d'optimalité |
|---|---|---|
| Quadratique | $\tfrac12x^TPx+q^Tx+r$, $P\succeq0$ | $Px=-q$ ; si $P\succ0$, $x^\star=-P^{-1}q$ — **analytique** |
| Moindres carrés | $\\|Ax-b\\|_2^2$ | $A^TAx=A^Tb$ — les **équations normales** |
| GP sans contrainte | $\log\sum_ie^{a_i^Tx+b_i}$ | pas de solution analytique — itératif obligatoire |
| **Centre analytique** | $-\sum_i\log(b_i-a_i^Tx)$ | domaine $\{x\mid a_i^Tx<b_i\}$ ; $f$ est la **barrière logarithmique** |

> **Le cas quadratique est la clé du chapitre.** Comme on sait le résoudre exactement, on peut à chaque itération **remplacer $f$ par son approximation quadratique** et résoudre celle-ci : c'est exactement la méthode de Newton. Et le **centre analytique** reviendra au chapitre 11 comme brique des méthodes de points intérieurs.

## 🔴 Concept 2 — Forte convexité et conditionnement (§9.1.2)

**Hypothèse de forte convexité.** Il existe $m>0$ tel que

$$\nabla^2f(x) \succeq mI \qquad \forall x\in S \tag{9.7}$$

**Première conséquence — une meilleure minoration.** Par Taylor à l'ordre 2 avec reste,

$$f(y) \geq f(x)+\nabla f(x)^T(y-x)+\frac{m}{2}\|y-x\|_2^2 \tag{9.8}$$

Pour $m=0$ on retrouve la condition du premier ordre de la convexité ; pour $m>0$ la minoration est **strictement meilleure**.

**Deuxième conséquence — une borne de sous-optimalité.** Le membre de droite de (9.8) est une quadratique convexe en $y$, minimisée en $\tilde y = x-\tfrac1m\nabla f(x)$. En y évaluant :

$$p^\star \geq f(x) - \frac{1}{2m}\|\nabla f(x)\|_2^2 \tag{9.9}$$

> **C'est le critère d'arrêt de tous les algorithmes du chapitre.** *Si le gradient est petit, le point est presque optimal* :
>
> $$\|\nabla f(x)\|_2\leq(2m\varepsilon)^{1/2} \ \Longrightarrow\ f(x)-p^\star\leq\varepsilon \tag{9.10}$$

**Troisième conséquence — une borne sur la distance à l'optimum.** En appliquant (9.8) avec $y=x^\star$ et Cauchy-Schwarz :

$$\|x-x^\star\|_2 \leq \frac{2}{m}\|\nabla f(x)\|_2 \tag{9.11}$$

**Corollaire : $x^\star$ est unique.**

**Borne supérieure sur la hessienne.** L'inégalité (9.8) entraîne que $S$ est **borné** ; la plus grande valeur propre de $\nabla^2f$, continue sur $S$, y est donc majorée : il existe $M>0$ avec

$$\nabla^2f(x)\preceq MI \qquad \forall x\in S \tag{9.12}$$

d'où la majoration symétrique $f(y)\leq f(x)+\nabla f(x)^T(y-x)+\frac{M}{2}\|y-x\|_2^2$ et

$$p^\star \leq f(x)-\frac{1}{2M}\|\nabla f(x)\|_2^2 \tag{9.14}$$

**Le conditionnement.** Le rapport

$$\kappa = \frac{M}{m}$$

majore le **conditionnement** des sous-niveaux : c'est le rapport entre le plus grand et le plus petit axe des « ellipsoïdes » de niveau. C'est **la** quantité qui gouverne la vitesse de la descente de gradient.

## 🟠 Concept 3 — Méthodes de descente et recherche linéaire (§9.2)

**Le schéma général.**

$$x^{(k+1)} = x^{(k)} + t^{(k)}\Delta x^{(k)}$$

$\Delta x^{(k)}$ est le **pas** ou **direction de recherche** (le symbole $\Delta x$ se lit d'un bloc), $t^{(k)}>0$ la **longueur du pas**.

**Direction de descente.** Toutes les méthodes du chapitre sont des **méthodes de descente** : $f(x^{(k+1)})<f(x^{(k)})$ sauf à l'optimum. Par convexité, $\nabla f(x)^T(y-x)\geq0$ entraîne $f(y)\geq f(x)$ ; il faut donc que

$$\nabla f(x^{(k)})^T\Delta x^{(k)} < 0$$

c'est-à-dire que la direction fasse un **angle aigu avec l'opposé du gradient**.

**Algorithme 9.1 — méthode de descente générale.**

```
donné un point de départ x ∈ dom f
répéter
  1. déterminer une direction de descente Δx
  2. recherche linéaire : choisir un pas t > 0
  3. mise à jour : x := x + tΔx
jusqu'au critère d'arrêt
```

**Recherche linéaire exacte.** $t = \arg\min_{s>0}f(x+s\Delta x)$. Précise, mais coûteuse — réservée aux cas où ce sous-problème est analytique.

**Algorithme 9.2 — recherche linéaire rétrograde (*backtracking*).** C'est celle qu'on utilise en pratique.

```
donné une direction de descente Δx, α ∈ (0, 0.5), β ∈ (0, 1)
t := 1
tant que  f(x + tΔx) > f(x) + α t ∇f(x)ᵀΔx
    t := β t
```

**Comment la lire.** La droite $t\mapsto f(x)+t\nabla f(x)^T\Delta x$ est l'extrapolation **linéaire** de $f$ ; on en prend une version de pente $\alpha$ fois plus faible. La condition d'acceptation est que $f$ passe **sous** cette droite atténuée : on exige une décroissance au moins égale à une **fraction $\alpha$** de celle que prédit la linéarisation.

⚠️ Les paramètres ont un sens : $\alpha\in(0,0{,}5)$ — typiquement $0{,}01$ à $0{,}3$ — mesure l'exigence de décroissance ; $\beta\in(0,1)$ — typiquement $0{,}1$ à $0{,}8$ — la brutalité de la réduction. Prendre $\alpha\geq0{,}5$ peut faire rejeter le **pas de Newton complet**, ce qui détruit la convergence quadratique.

## 🔴 Concept 4 — Descente de gradient et rôle du conditionnement (§9.3)

**Algorithme 9.3.** On prend simplement $\Delta x = -\nabla f(x)$.

```
donné un point de départ x ∈ dom f
répéter
  1. Δx := −∇f(x)
  2. recherche linéaire (exacte ou rétrograde)
  3. x := x + tΔx
jusqu'à  ‖∇f(x)‖₂ ≤ η
```

Le critère d'arrêt se vérifie en général **après l'étape 1**, pas après la mise à jour.

**Analyse de convergence (recherche exacte).** De $\nabla^2f\preceq MI$ on tire la majoration quadratique

$$\tilde f(t) = f(x-t\nabla f(x)) \leq f(x)-t\|\nabla f(x)\|_2^2 + \frac{Mt^2}{2}\|\nabla f(x)\|_2^2 \tag{9.17}$$

Le membre de droite est minimisé en $t=1/M$, de valeur $f(x)-\frac{1}{2M}\|\nabla f(x)\|_2^2$. Donc

$$f(x^+) - p^\star \leq f(x)-p^\star-\frac{1}{2M}\|\nabla f(x)\|_2^2$$

En combinant avec $\|\nabla f(x)\|_2^2 \geq 2m\,(f(x)-p^\star)$ (issue de (9.9)) :

$$\boxed{\ f(x^{(k)})-p^\star \leq c^k\big(f(x^{(0)})-p^\star\big), \qquad c = 1-\frac{m}{M} = 1-\frac1\kappa\ } \tag{9.18}$$

**C'est une convergence *linéaire*** (ou géométrique) : l'erreur est multipliée par $c<1$ à chaque itération. Le nombre d'itérations pour atteindre une précision $\varepsilon$ est

$$\frac{\log\big((f(x^{(0)})-p^\star)/\varepsilon\big)}{\log(1/c)} \tag{9.19}$$

**Comment lire cette borne.** Le **numérateur** est le logarithme du rapport entre la sous-optimalité initiale et la précision voulue : il dit que la qualité du point de départ compte, mais seulement **logarithmiquement**. Le **dénominateur** dépend entièrement de $c$, donc de $\kappa=M/m$.

⚠️ **Le fléau du conditionnement.** Si $\kappa$ est grand, $c=1-1/\kappa$ est proche de $1$, $\log(1/c)\approx1/\kappa$, et le nombre d'itérations croît **proportionnellement à $\kappa$**. Sur des sous-niveaux très allongés, la descente de gradient **zigzague** : la direction $-\nabla f$ pointe perpendiculairement aux lignes de niveau, donc vers le flanc de la vallée, pas vers son fond.

## 🟠 Concept 5 — Descente la plus raide (§9.4)

On généralise en choisissant la direction **la plus raide au sens d'une norme** $\|\cdot\|$ :

$$\Delta x_{\text{nsd}} = \arg\min\{\nabla f(x)^Tv \mid \|v\|=1\}$$

| Norme choisie | Direction obtenue |
|---|---|
| euclidienne $\\|\cdot\\|_2$ | $-\nabla f(x)$ — la descente de gradient |
| quadratique $\\|u\\|_P = (u^TPu)^{1/2}$ | $-P^{-1}\nabla f(x)$ |
| norme 1 | $-\partial f/\partial x_i\cdot e_i$ pour la coordonnée $i$ de plus **grande** dérivée partielle en valeur absolue — une méthode de **descente par coordonnée** |

> **L'enseignement.** « La » direction de plus forte pente n'existe pas dans l'absolu : elle dépend de la **norme** avec laquelle on mesure les déplacements. Choisir $P$ revient à changer de coordonnées ; et la descente la plus raide en norme $\|\cdot\|_P$ converge d'autant plus vite que la hessienne, **après ce changement de coordonnées**, est bien conditionnée. D'où l'idée : prendre $P = \nabla^2f(x)$.

## 🔴 Concept 6 — La méthode de Newton (§9.5)

**Le pas de Newton.** Pour $x\in\mathbf{dom}\,f$,

$$\Delta x_{\text{nt}} = -\nabla^2f(x)^{-1}\nabla f(x)$$

C'est bien une direction de descente : $\nabla f(x)^T\Delta x_{\text{nt}} = -\nabla f(x)^T\nabla^2f(x)^{-1}\nabla f(x)<0$ dès que $\nabla f(x)\neq0$, par définie positivité de la hessienne.

**Trois interprétations, à connaître toutes les trois.**

*1. Minimiseur de l'approximation quadratique.* Le modèle du second ordre

$$\hat f(x+v) = f(x)+\nabla f(x)^Tv+\tfrac12v^T\nabla^2f(x)v \tag{9.28}$$

est une quadratique convexe en $v$, minimisée exactement en $v=\Delta x_{\text{nt}}$. **Si $f$ est quadratique, $x+\Delta x_{\text{nt}}$ est l'optimum exact.**

*2. Direction la plus raide pour la norme hessienne.* $\Delta x_{\text{nt}}$ est la direction de plus forte pente pour la norme quadratique $\|u\|_{\nabla^2f(x)} = (u^T\nabla^2f(x)u)^{1/2}$. Près de $x^\star$, on a $\nabla^2f(x)\approx\nabla^2f(x^\star)$ : c'est le **meilleur choix possible** de norme.

*3. Solution de la condition d'optimalité linéarisée.* En linéarisant $\nabla f(x+v)\approx\nabla f(x)+\nabla^2f(x)v = 0$, on obtient exactement $v = \Delta x_{\text{nt}}$.

**Le décrément de Newton.**

$$\lambda(x) = \big(\nabla f(x)^T\nabla^2f(x)^{-1}\nabla f(x)\big)^{1/2}$$

Il vérifie

$$f(x)-\inf_y\hat f(y) = f(x)-\hat f(x+\Delta x_{\text{nt}}) = \tfrac12\lambda(x)^2$$

**Donc $\lambda^2/2$ est une estimation de $f(x)-p^\star$**, fondée sur le modèle quadratique — c'est le **critère d'arrêt** de la méthode.

**Algorithme 9.5 — méthode de Newton.**

```
donné un point de départ x ∈ dom f, une tolérance ε > 0
répéter
  1. calculer le pas et le décrément :
       Δx_nt := −∇²f(x)⁻¹ ∇f(x)  ;  λ² := ∇f(x)ᵀ ∇²f(x)⁻¹ ∇f(x)
  2. arrêt : terminer si λ²/2 ≤ ε
  3. recherche linéaire rétrograde
  4. mise à jour : x := x + t Δx_nt
```

## 🔴 Concept 7 — Convergence en deux phases (§9.5.3)

**Hypothèses.** $f$ deux fois continûment dérivable, fortement convexe ($mI\preceq\nabla^2f\preceq MI$ sur $S$), **et** hessienne **lipschitzienne** :

$$\|\nabla^2f(x)-\nabla^2f(y)\|_2 \leq L\|x-y\|_2 \tag{9.31}$$

La constante $L$ borne en quelque sorte la **dérivée troisième** : elle mesure à quel point $f$ s'écarte d'une quadratique ($L=0$ pour une quadratique exacte). Intuitivement, Newton fonctionne très bien quand le modèle quadratique varie lentement, donc quand $L$ est petit.

**Le résultat.** Il existe $\eta$ avec $0<\eta\leq m^2/L$ et $\gamma>0$ tels que :

**Phase 1 — étape amortie** ($\|\nabla f(x^{(k)})\|_2\geq\eta$) :

$$f(x^{(k+1)}) - f(x^{(k)}) \leq -\gamma$$

L'objectif baisse d'au moins une **constante** à chaque itération. Cette phase dure donc au plus $(f(x^{(0)})-p^\star)/\gamma$ itérations.

**Phase 2 — convergence quadratique** ($\|\nabla f(x^{(k)})\|_2<\eta$) : la recherche linéaire accepte le **pas complet $t=1$**, et

$$\frac{L}{2m^2}\|\nabla f(x^{(k+1)})\|_2 \leq \Big(\frac{L}{2m^2}\|\nabla f(x^{(k)})\|_2\Big)^2 \tag{9.33}$$

Une fois cette phase atteinte, **on n'en sort plus** : l'erreur est **élevée au carré** à chaque itération, et le nombre de décimales exactes **double**. Il faut au plus $\log_2\log_2(\varepsilon_0/\varepsilon)$ itérations, avec $\varepsilon_0 = 2m^3/L^2$.

**Borne totale (9.36).**

$$\frac{f(x^{(0)})-p^\star}{\gamma} + \log_2\log_2(\varepsilon_0/\varepsilon)$$

> **Le terme $\log_2\log_2$ croît si lentement qu'on peut le tenir pour une constante — Boyd propose cinq ou six.** *Six itérations de la phase quadratique donnent une précision d'environ $5\cdot10^{-200}$.* D'où la formule mnémotechnique (9.37) :
>
> $$\text{nombre d'itérations de Newton} \ \lesssim \ \frac{f(x^{(0)})-p^\star}{\gamma} + 6$$

## 🟠 Concept 8 — Invariance affine (§9.5.4)

**La propriété qui distingue Newton.** La méthode est **indépendante de tout changement de coordonnées linéaire ou affine**. Si $T$ est inversible et $\bar f(y) = f(Ty)$, alors les itérés de Newton appliqués à $\bar f$ depuis $y^{(0)} = T^{-1}x^{(0)}$ sont exactement $y^{(k)} = T^{-1}x^{(k)}$ — avec les **mêmes** paramètres de recherche linéaire.

**Ce que cela implique.**

- Le **décrément de Newton** est lui aussi invariant : c'est un critère d'arrêt **sans unité**, contrairement à $\|\nabla f(x)\|_2$ qui dépend de l'échelle des variables.
- Newton est **insensible au conditionnement** : mal conditionner un problème par un changement d'échelle ne change rien à sa trajectoire. C'est exactement l'inverse de la descente de gradient, dont la vitesse est gouvernée par $\kappa=M/m$.

⚠️ **Le prix à payer.** Chaque itération de Newton exige de **former** la hessienne et de **résoudre** un système linéaire $n\times n$ — de l'ordre de $n^3$ opérations (ou $n^2$ en exploitant la structure creuse, §9.7). La descente de gradient ne coûte qu'un gradient. Newton fait **beaucoup moins d'itérations, beaucoup plus chères**.

### Comment résoudre l'exercice type (protocole)

1. **Vérifier le cadre** : $f$ convexe, $C^2$, $\mathbf{dom}\,f$ ouvert, sous-niveau initial fermé.
2. **Tenter l'analytique** : si $\nabla f(x)=0$ est un système **linéaire** (objectif quadratique), résoudre directement — pas d'algorithme.
3. **Sinon, estimer $m$ et $M$** : bornes sur les valeurs propres de $\nabla^2f$ sur $S$. En déduire $\kappa$.
4. **Choisir la méthode** : $\kappa$ modéré et $n$ grand $\to$ gradient ; $\kappa$ grand ou grande précision voulue $\to$ Newton.
5. **Écrire la direction** : $-\nabla f(x)$, ou $-\nabla^2f(x)^{-1}\nabla f(x)$ (résoudre le système, ne **jamais** inverser la matrice).
6. **Recherche linéaire rétrograde** avec $\alpha\in(0;0{,}5)$, $\beta\in(0;1)$.
7. **Critère d'arrêt** : $\|\nabla f(x)\|_2\leq(2m\varepsilon)^{1/2}$ pour le gradient ; $\lambda^2/2\leq\varepsilon$ pour Newton.
8. **Conclure sur la vitesse** : linéaire de facteur $1-1/\kappa$, ou quadratique après une phase amortie.

### Exercices progressifs

**Niveau 1** — Pour $f(x)=\tfrac12x^TPx+q^Tx+r$ avec $P\succ0$, que donne **une seule** itération de Newton depuis n'importe quel $x^{(0)}$ ?

<details><summary>Correction</summary>

$\nabla f(x) = Px+q$ et $\nabla^2f(x)=P$, donc

$$\Delta x_{\text{nt}} = -P^{-1}(Px+q) = -x - P^{-1}q$$

et $x+\Delta x_{\text{nt}} = -P^{-1}q = x^\star$. **Une itération suffit, depuis n'importe quel point.** C'est le cas $L=0$ : le modèle quadratique est exact. C'est précisément l'intuition qui fonde la méthode.

</details>

**Niveau 2** — Sur $f(x_1,x_2) = \tfrac12(x_1^2+\gamma x_2^2)$ avec $\gamma>0$, calculez $\kappa$ et le facteur $c$ de convergence du gradient.

<details><summary>Correction</summary>

$\nabla^2f = \mathbf{diag}(1,\gamma)$, constante. Donc $m=\min(1,\gamma)$, $M=\max(1,\gamma)$ et

$$\kappa = \max(\gamma,1/\gamma), \qquad c = 1-\frac{1}{\kappa}$$

Pour $\gamma=1$ : $\kappa=1$, $c=0$ — **une seule itération**, les lignes de niveau sont des cercles et $-\nabla f$ pointe droit vers l'origine. Pour $\gamma=100$ : $\kappa=100$, $c=0{,}99$ — il faut environ $\log(1/\varepsilon)/\log(1/0{,}99)\approx 230\log(1/\varepsilon)$ itérations. **Newton, lui, converge en une itération dans les deux cas** ($f$ est quadratique).

</details>

**Niveau 3** — Pourquoi impose-t-on $\alpha<0{,}5$ dans la recherche rétrograde ?

<details><summary>Correction</summary>

Pour une fonction **quadratique**, le pas complet $t=1$ dans la direction de Newton donne exactement

$$f(x+\Delta x_{\text{nt}}) = f(x) + \tfrac12\nabla f(x)^T\Delta x_{\text{nt}}$$

c'est-à-dire une décroissance égale à **la moitié** de celle prédite par la linéarisation. La condition d'acceptation $f(x+t\Delta x)\leq f(x)+\alpha t\nabla f(x)^T\Delta x$ est donc satisfaite en $t=1$ si et seulement si $\alpha\leq1/2$.

Avec $\alpha>0{,}5$, la recherche linéaire **rejetterait le pas de Newton complet** même sur une quadratique parfaite — et l'on perdrait la convergence quadratique, qui suppose $t=1$ (phase 2). D'où l'exigence $\alpha\in(0;0{,}5)$.

</details>

**Niveau 4 — type examen** — Comparez gradient et Newton sur le **centre analytique** $f(x) = -\sum_{i=1}^m\log(b_i-a_i^Tx)$ : gradient, hessienne, coût par itération, et méthode à préférer.

<details><summary>Correction</summary>

**Calculs.** Posons $s_i = b_i-a_i^Tx>0$ (les marges). Alors

$$\nabla f(x) = \sum_{i=1}^m\frac{1}{s_i}\,a_i = A^Td, \qquad d_i = 1/s_i$$

$$\nabla^2f(x) = \sum_{i=1}^m\frac{1}{s_i^2}\,a_ia_i^T = A^T\mathbf{diag}(d)^2A$$

La hessienne est bien $\succ0$ dès que $A$ est de rang $n$ — le problème est alors strictement convexe.

**Coût par itération.** *Gradient* : former $d$ et un produit $A^Td$, soit $O(mn)$. *Newton* : former $A^T\mathbf{diag}(d)^2A$ ($O(mn^2)$) puis factoriser par Cholesky ($O(n^3)$) — nettement plus cher.

**Conditionnement.** Quand $x$ s'approche du bord du polyèdre, certaines marges $s_i$ tendent vers $0$ et les termes $1/s_i^2$ **explosent** : la hessienne devient extrêmement mal conditionnée, $\kappa\to\infty$. La descente de gradient devient **arbitrairement lente**.

**Verdict : Newton, sans hésitation.** Son **invariance affine** le rend insensible à ce mauvais conditionnement, et sa phase quadratique donne une précision extrême en cinq ou six itérations de plus. C'est exactement pourquoi les **méthodes de points intérieurs** (chapitre 11) sont construites sur Newton appliqué à des barrières logarithmiques, et jamais sur le gradient.

</details>

## 🔴 Common mistakes

1. **Oublier de vérifier que le sous-niveau initial est fermé** — sans cette condition, la suite peut sortir du domaine et l'analyse s'effondre.
2. **Inverser la hessienne** — on **résout** $\nabla^2f(x)\Delta x = -\nabla f(x)$, par Cholesky. Inverser coûte plus cher et est numériquement moins stable.
3. **Prendre $\alpha\geq0{,}5$** — cela fait rejeter le pas de Newton complet et détruit la convergence quadratique.
4. **Utiliser $\|\nabla f(x)\|_2$ comme critère d'arrêt de Newton** — le bon critère est $\lambda^2/2\leq\varepsilon$, **invariant** par changement d'échelle.
5. **Croire la convergence de Newton quadratique dès la première itération** — il y a d'abord une **phase amortie**, dont la longueur dépend de $f(x^{(0)})-p^\star$.
6. **Ignorer le conditionnement dans le choix de la méthode** — le gradient est proportionnellement ralenti par $\kappa$, Newton n'y est pas sensible.
7. **Comparer les méthodes au nombre d'itérations seul** — une itération de Newton coûte $O(n^3)$ contre $O(n)$ pour un gradient.
8. **Confondre convergence linéaire et convergence quadratique** — linéaire : l'erreur est **multipliée** par $c$ ; quadratique : elle est **élevée au carré**.

## 📌 Ultimate Review

1. Problème : $\min f$, $f$ convexe $C^2$ ; condition $\nabla f(x^\star)=0$ ; résolution **itérative**, sous-niveau initial **fermé**.
2. **Forte convexité** $\nabla^2f\succeq mI$ : minoration (9.8), borne $p^\star\geq f(x)-\frac{1}{2m}\|\nabla f\|_2^2$, unicité de $x^\star$.
3. Critère d'arrêt : $\|\nabla f(x)\|_2\leq(2m\varepsilon)^{1/2}\Rightarrow f(x)-p^\star\leq\varepsilon$.
4. Borne supérieure $\nabla^2f\preceq MI$ ; **conditionnement** $\kappa=M/m$.
5. **Méthode de descente** : direction avec $\nabla f^T\Delta x<0$, recherche linéaire, mise à jour.
6. **Recherche rétrograde** : $t:=1$ ; tant que $f(x+t\Delta x)>f(x)+\alpha t\nabla f^T\Delta x$, $t:=\beta t$. $\alpha\in(0;0{,}5)$, $\beta\in(0;1)$.
7. **Gradient** : $\Delta x=-\nabla f(x)$ ; convergence **linéaire** $f(x^{(k)})-p^\star\leq c^k(f(x^{(0)})-p^\star)$, $c=1-1/\kappa$ ; ralentie proportionnellement à $\kappa$.
8. **Descente la plus raide** : dépend de la **norme** choisie ; norme quadratique $\to -P^{-1}\nabla f$ ; norme 1 $\to$ descente par coordonnée.
9. **Newton** : $\Delta x_{\text{nt}}=-\nabla^2f(x)^{-1}\nabla f(x)$ ; trois interprétations (modèle quadratique, norme hessienne, condition linéarisée).
10. **Décrément** $\lambda(x)=(\nabla f^T\nabla^2f^{-1}\nabla f)^{1/2}$ ; $\lambda^2/2$ estime $f(x)-p^\star$ ; critère d'arrêt.
11. **Deux phases** : amortie (baisse $\geq\gamma$ par itération), puis **quadratique** ($t=1$, l'erreur est mise au carré). Total $\approx(f(x^{(0)})-p^\star)/\gamma+6$.
12. **Invariance affine** de Newton — d'où son insensibilité au conditionnement, et un critère d'arrêt sans unité.

**Formulas to know**

$$p^\star\geq f(x)-\frac{1}{2m}\|\nabla f(x)\|_2^2 \qquad c = 1-\frac{m}{M} \qquad \Delta x_{\text{nt}}=-\nabla^2f(x)^{-1}\nabla f(x)$$

$$\lambda(x)^2=\nabla f(x)^T\nabla^2f(x)^{-1}\nabla f(x) \qquad \frac{f(x^{(0)})-p^\star}{\gamma}+\log_2\log_2(\varepsilon_0/\varepsilon)$$

**Methods to know** : le protocole en 8 étapes ; la recherche rétrograde ; l'analyse de convergence du gradient ; les deux phases de Newton.

## 🧠 Active Recall

**Basic** — Écrivez l'algorithme de recherche linéaire rétrograde et expliquez le rôle de $\alpha$ et $\beta$.

<details><summary>Réponse</summary>

$t:=1$ ; **tant que** $f(x+t\Delta x)>f(x)+\alpha t\nabla f(x)^T\Delta x$, faire $t:=\beta t$. $\alpha\in(0;0{,}5)$ fixe l'exigence de décroissance : on demande au moins une fraction $\alpha$ de ce que prédit la linéarisation. $\beta\in(0;1)$ fixe la vitesse de réduction du pas. $\alpha<0{,}5$ garantit que le pas complet de Newton est accepté sur une quadratique.

</details>

**Understanding** — Pourquoi la descente de gradient ralentit-elle quand $\kappa = M/m$ est grand ?

<details><summary>Réponse</summary>

Le facteur de contraction vaut $c = 1-m/M = 1-1/\kappa$ : plus $\kappa$ est grand, plus $c$ est proche de $1$, et le nombre d'itérations $\log((f(x^{(0)})-p^\star)/\varepsilon)/\log(1/c)$ croît **proportionnellement à $\kappa$**. Géométriquement, les sous-niveaux sont des ellipsoïdes très allongés ; $-\nabla f$ est perpendiculaire aux lignes de niveau, donc pointe vers le **flanc** de la vallée et non vers son fond : la trajectoire zigzague.

</details>

**Application** — Que vaut le décrément de Newton pour une fonction quadratique $\tfrac12x^TPx+q^Tx$, et que dit-il ?

<details><summary>Réponse</summary>

$\nabla f = Px+q$, $\nabla^2f = P$, donc $\lambda(x)^2 = (Px+q)^TP^{-1}(Px+q)$. Et

$$\tfrac12\lambda(x)^2 = \tfrac12(Px+q)^TP^{-1}(Px+q) = f(x)-p^\star$$

exactement : pour une quadratique, l'estimation $\lambda^2/2$ de la sous-optimalité est **exacte**, puisque le modèle quadratique est la fonction elle-même.

</details>

**Comparison** — Gradient et Newton : direction, coût, vitesse, sensibilité au conditionnement.

<details><summary>Réponse</summary>

|  | Gradient | Newton |
|---|---|---|
| Direction | $-\nabla f(x)$ | $-\nabla^2f(x)^{-1}\nabla f(x)$ |
| Coût par itération | $O(n)$ après le gradient | $O(n^3)$ (hessienne + Cholesky) |
| Vitesse | linéaire, facteur $1-1/\kappa$ | deux phases, puis **quadratique** |
| Conditionnement | vitesse $\propto\kappa$ | **insensible** (invariance affine) |

Verdict : Newton fait beaucoup moins d'itérations, beaucoup plus chères. Il s'impose dès que $\kappa$ est grand ou que $n$ reste modéré.

</details>

**Exam-style** — Décrivez les deux phases de la convergence de Newton et donnez la borne totale sur le nombre d'itérations.

<details><summary>Réponse</summary>

*Phase amortie*, tant que $\|\nabla f(x^{(k)})\|_2\geq\eta$ : le pas est réduit par la recherche linéaire, mais l'objectif baisse d'au moins une constante $\gamma$ à chaque itération. Elle dure donc au plus $(f(x^{(0)})-p^\star)/\gamma$ itérations.

*Phase quadratiquement convergente*, dès que $\|\nabla f(x^{(k)})\|_2<\eta$ : la recherche linéaire accepte $t=1$, on n'en sort plus, et $\frac{L}{2m^2}\|\nabla f(x^{(k+1)})\|_2\leq\big(\frac{L}{2m^2}\|\nabla f(x^{(k)})\|_2\big)^2$ — l'erreur est mise au carré, le nombre de décimales exactes **double** à chaque pas.

*Borne totale* : $\dfrac{f(x^{(0)})-p^\star}{\gamma}+\log_2\log_2(\varepsilon_0/\varepsilon)$, le second terme valant en pratique **cinq ou six**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Condition d'optimalité sans contrainte ? | $\nabla f(x^\star)=0$ — $n$ équations à $n$ inconnues |
| Condition sur le point de départ ? | $x^{(0)}\in\mathbf{dom}\,f$ et sous-niveau initial **fermé** |
| Forte convexité ? | $\nabla^2f(x)\succeq mI$ sur $S$, $m>0$ |
| Borne de sous-optimalité ? | $p^\star\geq f(x)-\frac{1}{2m}\\|\nabla f(x)\\|_2^2$ |
| Critère d'arrêt du gradient ? | $\\|\nabla f(x)\\|_2\leq(2m\varepsilon)^{1/2}$ |
| Conditionnement ? | $\kappa=M/m$, rapport des bornes sur la hessienne |
| Direction de descente ? | $\nabla f(x)^T\Delta x<0$ |
| Recherche rétrograde ? | $t:=1$ ; tant que $f(x+t\Delta x)>f(x)+\alpha t\nabla f^T\Delta x$, $t:=\beta t$ |
| Domaines de $\alpha$ et $\beta$ ? | $\alpha\in(0;0{,}5)$, $\beta\in(0;1)$ |
| Vitesse du gradient ? | Linéaire : $f(x^{(k)})-p^\star\leq c^k(f(x^{(0)})-p^\star)$, $c=1-1/\kappa$ |
| Pas de Newton ? | $\Delta x_{\text{nt}}=-\nabla^2f(x)^{-1}\nabla f(x)$ |
| Trois interprétations du pas de Newton ? | Minimiseur du modèle quadratique ; plus forte pente en norme hessienne ; condition d'optimalité linéarisée |
| Décrément de Newton ? | $\lambda(x)=(\nabla f^T\nabla^2f^{-1}\nabla f)^{1/2}$ ; $\lambda^2/2\approx f(x)-p^\star$ |
| Critère d'arrêt de Newton ? | $\lambda^2/2\leq\varepsilon$ |
| Les deux phases ? | Amortie (baisse $\geq\gamma$), puis quadratique ($t=1$, erreur au carré) |
| Borne totale d'itérations ? | $(f(x^{(0)})-p^\star)/\gamma + \log_2\log_2(\varepsilon_0/\varepsilon)$, soit $+6$ en pratique |
| Propriété clé de Newton ? | **Invariance affine** — insensible au conditionnement |
| Newton sur une quadratique ? | Une seule itération, depuis n'importe quel point |
