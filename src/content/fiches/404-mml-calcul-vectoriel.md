# Fiche 404 — Calcul vectoriel : gradients, jacobiennes, rétropropagation, Taylor multivarié

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 5 « Vector Calculus » (p. 139-178) |
| **Difficulté** | Avancé — l'outil qui rend l'apprentissage possible |
| **Temps d'étude estimé** | 140 min |
| **Prérequis** | Fiche 401 (matrices, applications linéaires) · Fiche 403 (déterminant, trace) |
| **Concepts clés** | Quotient différentiel, dérivée, polynôme de Taylor, série de Taylor, série de Maclaurin, fonction analytique, règles de dérivation, dérivée partielle, gradient, règle de la chaîne multivariée, fonction à valeurs vectorielles, jacobienne, disposition au numérateur, déterminant jacobien, gradient de matrices, tenseur, identités utiles, rétropropagation, différentiation automatique, mode direct et mode inverse, graphe de calcul, variables intermédiaires, dérivées d'ordre supérieur, hessienne, linéarisation, série de Taylor multivariée, produit extérieur d'ordre $k$ |
| **Poids à l'examen** | Le **gradient est un VECTEUR LIGNE** $1\times n$ · la **jacobienne** $J(i,j)=\partial f_i/\partial x_j$ de taille $m\times n$ · la **règle de la chaîne** $\frac{\partial}{\partial x}g(f(x))=\frac{\partial g}{\partial f}\frac{\partial f}{\partial x}$ · $\|\det J\|$ = **facteur d'échelle des volumes** · les **dix identités** de gradients matriciels · la **rétropropagation** = mode INVERSE de la différentiation automatique · la **hessienne symétrique** · le **Taylor multivarié** $\sum_k\frac{D^k_xf(x_0)}{k!}\delta^k$. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : dériver — de R→R jusqu'aux TENSEURS

  §5.1 UNIVARIÉ            df/dx := lim_{h→0} (f(x+h) − f(x))/h
        TAYLOR   Tn(x) = Σ_{k≤n} f^(k)(x0)/k! (x − x0)^k     x0 = 0 → MACLAURIN
        RÈGLES   produit · quotient · somme · CHAÎNE (g∘f)' = g'(f) f'
  §5.2 DÉRIVÉES PARTIELLES ET GRADIENT      ∇x f = df/dx ∈ R^(1×n)   ⚠️ VECTEUR LIGNE
        CHAÎNE MULTIVARIÉE   ∂g/∂x = (∂g/∂f)(∂f/∂x)   ← « les dimensions voisines s'annulent »
  §5.3 FONCTIONS À VALEURS VECTORIELLES     f : R^n → R^m
        JACOBIENNE  J = df/dx ∈ R^(m×n) ,  J(i,j) = ∂fi/∂xj    (disposition au NUMÉRATEUR)
        |det J| = facteur d'échelle des AIRES / VOLUMES
        f: R→R scalaire · f: R^D→R ligne 1×D · f: R→R^E colonne E×1 · f: R^D→R^E matrice E×D
  §5.4 GRADIENTS DE MATRICES               résultat = TENSEUR multidimensionnel
        astuce : APLATIR (isomorphisme R^(m×n) ≅ R^(mn)) → la chaîne redevient un produit matriciel
  §5.5 DIX IDENTITÉS UTILES                 tr, det, inverse, x^T a, a^T X b, x^T B x…
  §5.6 RÉTROPROPAGATION ET DIFF. AUTOMATIQUE
        réseau profond y = (fK ∘ … ∘ f1)(x)  ,  L(θ) = ‖y − fK(θ,x)‖²
        ∂L/∂θi = (∂L/∂fK)(∂fK/∂f^{K−1})…(∂f^{i+1}/∂θi)     ← on RÉUTILISE les calculs
        MODE INVERSE = rétropropagation (⚠️ le moins cher quand entrée ≫ sortie)
        MODE DIRECT = les gradients suivent le flot des données
  §5.7 ORDRE SUPÉRIEUR      HESSIENNE H = ∇²f ∈ R^(n×n) , SYMÉTRIQUE si f deux fois C¹
  §5.8 LINÉARISATION ET TAYLOR MULTIVARIÉ
        f(x) ≈ f(x0) + (∇x f)(x0)(x − x0)
        f(x) = Σ_k D^k_x f(x0)/k! δ^k  ,  δ := x − x0  ,  δ^k = produit EXTÉRIEUR k fois
        k=0 : f(x0)   k=1 : ∇f·δ   k=2 : ½ δᵀ H δ   k=3 : tenseur d'ordre 3

LE MOT D'ORDRE   « LE GRADIENT POINTE DANS LA DIRECTION DE LA PLUS FORTE PENTE »
```

> **La phrase-programme.** *« Nous discuterons de comment calculer les gradients de fonctions, ce qui est souvent essentiel pour faciliter l'apprentissage dans les modèles d'apprentissage automatique, puisque **le gradient pointe dans la direction de la plus forte montée**. Le calcul vectoriel est donc l'un des outils mathématiques fondamentaux dont nous avons besoin. »*

> ⚠️ **L'hypothèse de travail.** *« Dans tout ce livre, nous supposons que les fonctions sont **DIFFÉRENTIABLES**. »* Les extensions aux **sous-différentiels** (fonctions continues mais non différentiables en certains points) et aux fonctions **avec contraintes** (ch. 7) ne sont pas couvertes ici.

## 🔴 Concept 1 — Dérivation d'une fonction d'une variable (§5.1)

### 1.1 Quotient différentiel et dérivée

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 5.1 (Quotient différentiel).</span>

$$\boxed{\;\frac{\delta y}{\delta x}:=\frac{f(x+\delta x)-f(x)}{\delta x}\;}$$

calcule la **pente de la SÉCANTE** passant par deux points du graphe de $f$.

</div>

C'est aussi la **pente MOYENNE** de $f$ entre $x$ et $x+\delta x$, si l'on suppose $f$ linéaire. À la limite $\delta x\to0$, on obtient la **TANGENTE**.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 5.2 (Dérivée).</span>

Pour $h>0$, la dérivée de $f$ en $x$ est la limite

$$\boxed{\;\frac{df}{dx}:=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}\;}$$

et la sécante devient une **tangente**.

</div>

> **La phrase à retenir.** *« La dérivée de $f$ pointe dans la direction de la **PLUS FORTE MONTÉE** de $f$. »*

**Exemple 5.2 — la dérivée de $x^n$ retrouvée par la définition.** On sait que la réponse est $nx^{n-1}$, mais le livre la **dérive** à partir de la limite du quotient différentiel, via le développement du binôme de $(x+h)^n$ : tous les termes en $h^2$ et au-delà s'annulent à la limite, seul $nx^{n-1}h/h$ survit.

### 1.2 Séries de Taylor

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 5.3 (Polynôme de Taylor).</span>

Le **polynôme de Taylor de degré $n$** de $f:\mathbb R\to\mathbb R$ en $x_0$ est

$$\boxed{\;T_n(x):=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k\;}$$

où $f^{(k)}(x_0)$ est la $k$-ième dérivée de $f$ en $x_0$ (supposée exister) et $\frac{f^{(k)}(x_0)}{k!}$ les **coefficients** du polynôme.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 5.4 (Série de Taylor).</span>

Pour $f\in C^\infty$ (indéfiniment continûment différentiable),

$$\boxed{\;T_\infty(x)=\sum_{k=0}^{\infty}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k\;}$$

Pour $x_0=0$, on obtient la **SÉRIE DE MACLAURIN**. Si $f(x)=T_\infty(x)$, alors $f$ est dite **ANALYTIQUE**.

</div>

> ⚠️ **La remarque critique.** *« En général, un polynôme de Taylor de degré $n$ est une **APPROXIMATION** d'une fonction, qui n'a pas à être un polynôme. Le polynôme de Taylor est similaire à $f$ **dans un VOISINAGE de $x_0$**. Cependant, un polynôme de Taylor de degré $n$ est une **REPRÉSENTATION EXACTE** d'un polynôme $f$ de degré $k\leqslant n$, puisque toutes les dérivées $f^{(i)}$, $i>k$, s'annulent. »*

**Exemple 5.3 — le cas exact.** $f(x)=x^4$ et $T_6$ en $x_0=1$. Les coefficients :

$$f(1)=1,\quad f'(1)=4,\quad f''(1)=12,\quad f^{(3)}(1)=24,\quad f^{(4)}(1)=24,\quad f^{(5)}(1)=f^{(6)}(1)=0$$

$$T_6(x)=1+4(x-1)+\frac{12}{2!}(x-1)^2+\frac{24}{3!}(x-1)^3+\frac{24}{4!}(x-1)^4=x^4$$

⚠️ **$T_6$ reproduit $f$ EXACTEMENT** : il n'y a **aucune erreur d'approximation**, car $f$ est un polynôme de degré $4\leqslant6$.

<details><summary>Contrôle numérique en cinq points</summary>

$T_6(x)-x^4$ évalué en $x=0{,}3$ ; $1{,}0$ ; $2{,}0$ ; $-1{,}5$ ; $3{,}7$ donne **$0$ partout** (à la précision machine). Le polynôme de Taylor coïncide donc **globalement**, pas seulement au voisinage de $1$

</details>

**Exemple 5.4 — la série de Maclaurin de $\sin+\cos$.** Pour $f(x)=\sin(x)+\cos(x)\in C^\infty$ en $x_0=0$ :

$$f(0)=1,\quad f'(0)=1,\quad f''(0)=-1,\quad f^{(3)}(0)=-1,\quad f^{(4)}(0)=f(0)=1,\ \dots$$

> **Le motif.** *« Les coefficients de notre série de Taylor sont **uniquement $\pm1$** (puisque $\sin(0)=0$), chacun apparaissant **DEUX FOIS** avant de basculer sur l'autre. De plus, $f^{(k+4)}(0)=f^{(k)}(0)$ »* — période 4.

$$T_\infty(x)=1+x-\frac{1}{2!}x^2-\frac{1}{3!}x^3+\frac{1}{4!}x^4+\frac{1}{5!}x^5-\dots$$

En regroupant :

$$\boxed{\;T_\infty(x)=\underbrace{\sum_{k=0}^{\infty}\frac{(-1)^k}{(2k)!}x^{2k}}_{=\cos(x)}+\underbrace{\sum_{k=0}^{\infty}\frac{(-1)^k}{(2k+1)!}x^{2k+1}}_{=\sin(x)}\;}$$

<details class="details--riche">
<summary>

Contrôle : $T_{13}$ contre la valeur exacte

</summary>

$f(0{,}7)=\sin(0{,}7)+\cos(0{,}7)=1{,}4090598745$ et $T_{13}(0{,}7)=1{,}4090598745$ — **identiques à 10 décimales** Les coefficients utilisés sont bien $[1,1,-1,-1,1,1,-1,-1,\dots]$, de période 4.

</details>

### 1.3 Les quatre règles de dérivation

$$\text{Produit :}\qquad\big(f(x)g(x)\big)'=f'(x)g(x)+f(x)g'(x)$$

$$\text{Quotient :}\qquad\left(\frac{f(x)}{g(x)}\right)'=\frac{f'(x)g(x)-f(x)g'(x)}{\big(g(x)\big)^2}$$

$$\text{Somme :}\qquad\big(f(x)+g(x)\big)'=f'(x)+g'(x)$$

$$\boxed{\;\text{CHAÎNE :}\qquad\big(g(f(x))\big)'=(g\circ f)'(x)=g'(f(x))\,f'(x)\;}$$

où $g\circ f$ dénote la composition $x\mapsto f(x)\mapsto g(f(x))$.

**Exemple 5.5.** Pour $h(x)=(2x+1)^4$ : on pose $f(x)=2x+1$ et $g(f)=f^4$, d'où $f'(x)=2$ et $g'(f)=4f^3$ :

$$h'(x)=g'(f)f'(x)=4f^3\cdot2=4(2x+1)^3\cdot2=\boxed{8(2x+1)^3}$$

<details><summary>Contrôle par différences finies centrées</summary>

| $x$ | dérivée numérique | $8(2x+1)^3$ |
|---|---|---|
| $0{,}3$ | $32{,}768$ | $32{,}768$ |
| $-1{,}2$ | $-21{,}952$ | $-21{,}952$ |
| $2{,}0$ | $1000{,}0$ | $1000{,}0$ |

</details>

## 🔴 Concept 2 — Dérivées partielles et gradient (§5.2)

> **La méthode.** *« On trouve le gradient de $f$ relativement à $x$ en **faisant varier UNE variable à la fois et en gardant les autres CONSTANTES**. Le gradient est alors la collection de ces dérivées partielles. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 5.5 (Dérivée partielle).</span>

Pour $f:\mathbb R^n\to\mathbb R$ de $n$ variables $x_1,\dots,x_n$ :

$$\frac{\partial f}{\partial x_1}=\lim_{h\to0}\frac{f(x_1+h,x_2,\dots,x_n)-f(x)}{h},\quad\dots,\quad\frac{\partial f}{\partial x_n}=\lim_{h\to0}\frac{f(x_1,\dots,x_{n-1},x_n+h)-f(x)}{h}$$

et on les rassemble dans le **VECTEUR LIGNE**

$$\boxed{\;\nabla_xf=\operatorname{grad}f=\frac{df}{dx}=\begin{bmatrix}\dfrac{\partial f(x)}{\partial x_1}&\dfrac{\partial f(x)}{\partial x_2}&\cdots&\dfrac{\partial f(x)}{\partial x_n}\end{bmatrix}\in\mathbb R^{1\times n}\;}$$

Ce vecteur ligne est le **GRADIENT** de $f$, ou la **JACOBIENNE**.

</div>

> ⚠️ **La convention du livre — à ne surtout pas oublier.** *« Il n'est pas rare dans la littérature de définir le vecteur gradient comme un **vecteur COLONNE**, suivant la convention que les vecteurs sont généralement des colonnes. La raison pour laquelle nous définissons le gradient comme un **vecteur LIGNE** est double :*
>
> 1. *on peut généraliser le gradient de façon **cohérente** aux fonctions à valeurs vectorielles $f:\mathbb R^n\to\mathbb R^m$ (le gradient devient alors une **matrice**) ;*
> 2. *on peut appliquer **immédiatement** la règle de la chaîne multivariée **sans se soucier de la dimension** du gradient. »*

**Exemple 5.6 — dérivées partielles avec la règle de la chaîne.** Pour $f(x,y)=(x+2y^3)^2$ :

$$\frac{\partial f}{\partial x}=2(x+2y^3)\frac{\partial}{\partial x}(x+2y^3)=2(x+2y^3)$$

$$\frac{\partial f}{\partial y}=2(x+2y^3)\frac{\partial}{\partial y}(x+2y^3)=12(x+2y^3)y^2$$

**Exemple 5.7 — un gradient complet.** Pour $f(x_1,x_2)=x_1^2x_2+x_1x_2^3\in\mathbb R$ :

$$\frac{\partial f}{\partial x_1}=2x_1x_2+x_2^3,\qquad\frac{\partial f}{\partial x_2}=x_1^2+3x_1x_2^2$$

$$\boxed{\;\frac{df}{dx}=\begin{bmatrix}2x_1x_2+x_2^3&x_1^2+3x_1x_2^2\end{bmatrix}\in\mathbb R^{1\times2}\;}$$

<details><summary>Contrôles numériques des exemples 5.6 et 5.7</summary>

**Ex. 5.6**, en $(x,y)=(0{,}4;1{,}1)$ : $\partial f/\partial x$ numérique $=6{,}124$ contre $2(x+2y^3)=6{,}124$ ; $\partial f/\partial y$ numérique $=44{,}46024$ contre $12(x+2y^3)y^2=44{,}46024$ (idem en $(-1{,}0;0{,}5)$ : $-1{,}5$ et $-2{,}25$).

**Ex. 5.7**, en $(1{,}3;0{,}7)$ : $2{,}163$ contre $2x_1x_2+x_2^3=2{,}163$ et $3{,}601$ contre $x_1^2+3x_1x_2^2=3{,}601$

</details>

### 2.2 Les règles multivariées

> ⚠️ **L'avertissement.** *« Quand on calcule des dérivées **relativement à des vecteurs** $x\in\mathbb R^n$, il faut faire attention : nos gradients impliquent maintenant des **vecteurs et des matrices**, et la multiplication matricielle **n'est PAS commutative** — l'ORDRE COMPTE. »*

$$\text{Produit :}\qquad\frac{\partial}{\partial x}\big(f(x)g(x)\big)=\frac{\partial f}{\partial x}g(x)+f(x)\frac{\partial g}{\partial x}$$

$$\text{Somme :}\qquad\frac{\partial}{\partial x}\big(f(x)+g(x)\big)=\frac{\partial f}{\partial x}+\frac{\partial g}{\partial x}$$

$$\boxed{\;\text{CHAÎNE :}\qquad\frac{\partial}{\partial x}\big(g(f(x))\big)=\frac{\partial g}{\partial f}\frac{\partial f}{\partial x}\;}$$

> **Le mnémonique des « dimensions voisines ».** *« La règle de la chaîne ressemble aux règles de multiplication matricielle où les **dimensions voisines** doivent correspondre. En allant de gauche à droite, $\partial f$ apparaît au « **dénominateur** » du premier facteur et au « **numérateur** » du second. En multipliant les facteurs, la multiplication est définie, les dimensions de $\partial f$ correspondent, et $\partial f$ **« s'annule »**, laissant $\partial g/\partial x$. »*

> ⚠️ *« Ce n'est **qu'une INTUITION**, pas mathématiquement correct, puisque la dérivée partielle **n'est PAS une fraction**. »*

### 2.3 La règle de la chaîne appliquée

**Cas 1 — $f:\mathbb R^2\to\mathbb R$ avec $x_1(t)$, $x_2(t)$ :**

$$\frac{df}{dt}=\begin{bmatrix}\dfrac{\partial f}{\partial x_1}&\dfrac{\partial f}{\partial x_2}\end{bmatrix}\begin{bmatrix}\dfrac{\partial x_1(t)}{\partial t}\\[6pt]\dfrac{\partial x_2(t)}{\partial t}\end{bmatrix}=\frac{\partial f}{\partial x_1}\frac{\partial x_1}{\partial t}+\frac{\partial f}{\partial x_2}\frac{\partial x_2}{\partial t}$$

**Exemple 5.8.** Pour $f(x_1,x_2)=x_1^2+2x_2$ avec $x_1=\sin t$, $x_2=\cos t$ :

$$\frac{df}{dt}=2\sin t\cdot\cos t+2\cdot(-\sin t)=2\sin t\cos t-2\sin t=\boxed{2\sin t\,(\cos t-1)}$$

<details><summary>Contrôle numérique</summary>

| $t$ | dérivée numérique | $2\sin t(\cos t-1)$ |
|---|---|---|
| $0{,}4$ | $-0{,}061481$ | $-0{,}061481$ |
| $1{,}9$ | $-2{,}504458$ | $-2{,}504458$ |
| $-0{,}8$ | $0{,}435139$ | $0{,}435139$ |

</details>

**Cas 2 — $x_1(s,t)$ et $x_2(s,t)$ :**

$$\frac{\partial f}{\partial s}=\frac{\partial f}{\partial x_1}\frac{\partial x_1}{\partial s}+\frac{\partial f}{\partial x_2}\frac{\partial x_2}{\partial s},\qquad\frac{\partial f}{\partial t}=\frac{\partial f}{\partial x_1}\frac{\partial x_1}{\partial t}+\frac{\partial f}{\partial x_2}\frac{\partial x_2}{\partial t}$$

et, sous forme de **produit matriciel** :

$$\frac{df}{d(s,t)}=\underbrace{\frac{\partial f}{\partial x}}_{1\times2}\underbrace{\frac{\partial x}{\partial(s,t)}}_{2\times2}$$

> ⚠️ **Le contrôle de sécurité recommandé.** *« Cette écriture compacte n'est correcte que si l'on est attentif à la **DÉFINITION du gradient**. »* Vérifier systématiquement les **dimensions** de chaque facteur.

## 🔴 Concept 3 — Gradients de fonctions à valeurs vectorielles (§5.3)

### 3.1 La jacobienne

Pour $f:\mathbb R^n\to\mathbb R^m$ (un **champ de vecteurs**), $f(x)=[f_1(x),\dots,f_m(x)]^\top$ : chaque $f_i:\mathbb R^n\to\mathbb R$ se dérive **exactement comme au §5.2**.

La dérivée partielle relativement à $x_i$ est un **vecteur COLONNE** :

$$\frac{\partial f}{\partial x_i}=\begin{bmatrix}\partial f_1/\partial x_i\\\vdots\\\partial f_m/\partial x_i\end{bmatrix}\in\mathbb R^m$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 5.6 (Jacobienne).</span>

La collection de **toutes** les dérivées partielles du **premier ordre** d'une fonction à valeurs vectorielles $f:\mathbb R^n\to\mathbb R^m$ est la **JACOBIENNE**. C'est une matrice $m\times n$ :

$$\boxed{\;J=\nabla_xf=\frac{df(x)}{dx}=\begin{bmatrix}\dfrac{\partial f_1(x)}{\partial x_1}&\cdots&\dfrac{\partial f_1(x)}{\partial x_n}\\\vdots&&\vdots\\\dfrac{\partial f_m(x)}{\partial x_1}&\cdots&\dfrac{\partial f_m(x)}{\partial x_n}\end{bmatrix},\qquad J(i,j)=\frac{\partial f_i}{\partial x_j}\;}$$

</div>

> ⚠️ **La convention de disposition.** *« Dans ce livre, nous utilisons la **DISPOSITION AU NUMÉRATEUR** : la dérivée $df/dx$ de $f\in\mathbb R^m$ relativement à $x\in\mathbb R^n$ est une matrice $m\times n$, où **les éléments de $f$ définissent les LIGNES** et **les éléments de $x$ définissent les COLONNES**. Il existe aussi la **disposition au DÉNOMINATEUR**, qui en est la **TRANSPOSÉE**. »*

### 3.2 Le tableau des dimensions (figure 5.6) — à mémoriser

| Fonction | Gradient | Taille |
|---|---|---|
| $f:\mathbb R\to\mathbb R$ | Un **scalaire** | $1\times1$ |
| $f:\mathbb R^D\to\mathbb R$ | Un **vecteur LIGNE** | $1\times D$ |
| $f:\mathbb R\to\mathbb R^E$ | Un **vecteur COLONNE** | $E\times1$ |
| $f:\mathbb R^D\to\mathbb R^E$ | Une **MATRICE** | $E\times D$ |

> **Le réflexe méthodologique du livre.** Dans chaque exemple, il **commence par déterminer la DIMENSION du gradient cherché**, avant tout calcul. C'est le meilleur garde-fou.

### 3.3 Le déterminant jacobien comme facteur d'échelle

**Le problème.** Les vecteurs $b_1=[1,0]^\top$, $b_2=[0,1]^\top$ engendrent le carré unité d'aire $\det\begin{bmatrix}1&0\\0&1\end{bmatrix}=1$. Les vecteurs $c_1=[-2,1]^\top$, $c_2=[1,1]^\top$ engendrent un parallélogramme d'aire

$$\left|\det\begin{bmatrix}-2&1\\1&1\end{bmatrix}\right|=|-3|=3$$

**Approche 1 — algèbre linéaire.** C'est un **changement de base** de $(b_1,b_2)$ vers $(c_1,c_2)$, de matrice

$$J=\begin{bmatrix}-2&1\\1&1\end{bmatrix}\qquad\text{telle que}\qquad Jb_1=c_1,\ Jb_2=c_2$$

et $|\det(J)|=3$.

**Approche 2 — dérivées partielles** (celle qui **se généralise au non linéaire**). Avec $y_1=-2x_1+x_2$ et $y_2=x_1+x_2$ :

$$\frac{\partial y_1}{\partial x_1}=-2,\quad\frac{\partial y_1}{\partial x_2}=1,\quad\frac{\partial y_2}{\partial x_1}=1,\quad\frac{\partial y_2}{\partial x_2}=1\qquad\Longrightarrow\qquad J=\begin{bmatrix}-2&1\\1&1\end{bmatrix}$$

> **Le résultat général.** *« La jacobienne représente la transformation de coordonnées cherchée. Elle est **EXACTE si la transformation est LINÉAIRE**. Si la transformation est **NON LINÉAIRE**, la jacobienne **approche localement** cette transformation par une transformation linéaire. »*
>
> $$\boxed{\;|\det(J)|=\text{le facteur par lequel les AIRES ou VOLUMES sont mis à l'échelle}\;}$$

> ⚠️ **Où cela resservira.** *« Le déterminant jacobien et les transformations de variables deviendront pertinents au **§6.7**, quand on transformera des variables aléatoires et des lois de probabilité. Ces transformations sont extrêmement pertinentes en apprentissage automatique dans le contexte de l'entraînement de réseaux profonds par la **REPARAMÉTRISATION**, aussi appelée analyse de perturbation infinitésimale. »*

### 3.4 Trois exemples fondateurs

**Exemple 5.9 — le gradient de $f(x)=Ax$.**

**Étape 1 — la dimension.** $f:\mathbb R^N\to\mathbb R^M$, donc $df/dx\in\mathbb R^{M\times N}$.

**Étape 2 — les partielles.** $f_i(x)=\sum_{j=1}^{N}A_{ij}x_j$ donne $\dfrac{\partial f_i}{\partial x_j}=A_{ij}$.

**Étape 3 — le résultat.**

$$\boxed{\;\frac{df}{dx}=A\in\mathbb R^{M\times N}\;}$$

⚠️ Le résultat est **la matrice $A$ elle-même** — l'analogue matriciel de $(ax)'=a$.

**Exemple 5.10 — chaîne avec composition.** Pour $h=f\circ g$ avec

$$f:\mathbb R^2\to\mathbb R,\ f(x)=\exp(x_1x_2^2)\qquad g:\mathbb R\to\mathbb R^2,\ x=g(t)=\begin{bmatrix}t\cos t\\t\sin t\end{bmatrix}$$

**Les dimensions d'abord** : $\dfrac{\partial f}{\partial x}\in\mathbb R^{1\times2}$ et $\dfrac{\partial g}{\partial t}\in\mathbb R^{2\times1}$.

$$\frac{dh}{dt}=\frac{\partial f}{\partial x}\frac{\partial x}{\partial t}=\begin{bmatrix}\exp(x_1x_2^2)x_2^2&2\exp(x_1x_2^2)x_1x_2\end{bmatrix}\begin{bmatrix}\cos t-t\sin t\\\sin t+t\cos t\end{bmatrix}$$

$$\boxed{\;\frac{dh}{dt}=\exp(x_1x_2^2)\Big[x_2^2(\cos t-t\sin t)+2x_1x_2(\sin t+t\cos t)\Big]\;}$$

avec $x_1=t\cos t$ et $x_2=t\sin t$.

<details><summary>Contrôle numérique de l'exemple 5.10</summary>

| $t$ | dérivée numérique de $h$ | formule (5.74c) |
|---|---|---|
| $0{,}6$ | $0{,}435521$ | $0{,}435521$ |
| $1{,}4$ | $-2{,}358059$ | $-2{,}358059$ |

</details>

**Exemple 5.11 — le gradient d'une perte des moindres carrés.** Le modèle linéaire

$$y=\Phi\theta,\qquad\theta\in\mathbb R^D,\ \Phi\in\mathbb R^{N\times D},\ y\in\mathbb R^N$$

avec

$$L(e):=\lVert e\rVert^2,\qquad e(\theta):=y-\Phi\theta$$

**Étape 1 — la dimension.** $\dfrac{\partial L}{\partial\theta}\in\mathbb R^{1\times D}$.

**Étape 2 — la chaîne.** $\dfrac{\partial L}{\partial\theta}=\dfrac{\partial L}{\partial e}\dfrac{\partial e}{\partial\theta}$, dont le $d$-ième élément est $\sum_{n=1}^{N}\dfrac{\partial L}{\partial e}[n]\,\dfrac{\partial e}{\partial\theta}[n,d]$.

**Étape 3 — les deux facteurs.** Comme $\lVert e\rVert^2=e^\top e$ :

$$\frac{\partial L}{\partial e}=2e^\top\in\mathbb R^{1\times N},\qquad\frac{\partial e}{\partial\theta}=-\Phi\in\mathbb R^{N\times D}$$

**Étape 4 — le résultat.**

$$\boxed{\;\frac{\partial L}{\partial\theta}=-2e^\top\Phi=-2\underbrace{(y^\top-\theta^\top\Phi^\top)}_{1\times N}\underbrace{\Phi}_{N\times D}\in\mathbb R^{1\times D}\;}$$

> ⚠️ **La remarque du livre.** *« On aurait obtenu le même résultat **sans la règle de la chaîne**, en regardant directement $L_2(\theta):=\lVert y-\Phi\theta\rVert^2=(y-\Phi\theta)^\top(y-\Phi\theta)$. Cette approche reste praticable pour des fonctions simples comme $L_2$, mais devient **IMPRATICABLE pour des compositions PROFONDES**. »*

## 🟠 Concept 4 — Gradients de matrices et identités (§5.4-5.5)

### 4.1 Le problème du tenseur

Le gradient d'une matrice $m\times n$ relativement à une matrice $p\times q$ est une jacobienne de taille $(m\times n)\times(p\times q)$ — un **tenseur à QUATRE dimensions**, d'entrées $J_{ijkl}=\partial A_{ij}/\partial B_{kl}$.

> **L'astuce de l'aplatissement.** *« Puisque les matrices représentent des applications linéaires, on peut exploiter le fait qu'il existe un **ISOMORPHISME d'espaces vectoriels** entre $\mathbb R^{m\times n}$ et $\mathbb R^{mn}$. On peut donc **remodeler** nos matrices en vecteurs de longueurs $mn$ et $pq$, et le gradient devient une jacobienne de taille $mn\times pq$. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi c'est préférable.</span>

⚠️ *« En pratique, il est souvent souhaitable de remodeler la matrice en vecteur : la **règle de la chaîne se réduit à une simple MULTIPLICATION MATRICIELLE**, alors qu'avec une jacobienne-tenseur, il faut faire davantage attention **aux dimensions sur lesquelles sommer**. »*

</div>

**Exemple 5.12 — $f=Ax$, gradient relativement à $A$.**

**Étape 1 — la dimension.** $\dfrac{df}{dA}\in\mathbb R^{M\times(M\times N)}$.

**Étape 2 — expliciter.** $f_i=\sum_{j=1}^{N}A_{ij}x_j$, donc

$$\frac{\partial f_i}{\partial A_{iq}}=x_q,\qquad\frac{\partial f_i}{\partial A_{kq}}=0\ \text{ pour } k\neq i$$

**Étape 3 — le résultat.** $\dfrac{\partial f_i}{\partial A_{i,:}}=x^\top\in\mathbb R^{1\times1\times N}$ et $0^\top$ pour les autres lignes.

**Exemple 5.13 — $f(R)=R^\top R=:K$, gradient relativement à $R$.**

**Étape 1 — la dimension.** $\dfrac{dK}{dR}\in\mathbb R^{(N\times N)\times(M\times N)}$, un **tenseur**, avec $\dfrac{dK_{pq}}{dR}\in\mathbb R^{1\times M\times N}$.

**Étape 2 — expliciter.** En notant $r_i$ la $i$-ème colonne de $R$, chaque entrée de $K$ est un produit scalaire de deux colonnes :

$$K_{pq}=r_p^\top r_q=\sum_{m=1}^{M}R_{mp}R_{mq}$$

**Étape 3 — la partielle, par cas.**

$$\boxed{\;\frac{\partial K_{pq}}{\partial R_{ij}}=\partial_{pqij}=\begin{cases}R_{iq}&\text{si } j=p,\ p\neq q\\ R_{ip}&\text{si } j=q,\ p\neq q\\ 2R_{iq}&\text{si } j=p,\ p=q\\ 0&\text{sinon}\end{cases}\;}$$

⚠️ Le facteur **$2$** apparaît **seulement sur la diagonale** ($p=q$), où $R_{mp}$ et $R_{mq}$ sont **la même variable**.

### 4.2 Les dix identités à connaître

Avec $\operatorname{tr}(\cdot)$ la trace, $\det(\cdot)$ le déterminant et $f(X)^{-1}$ l'inverse (supposé exister) :

$$\frac{\partial}{\partial X}f(X)^\top=\left(\frac{\partial f(X)}{\partial X}\right)^\top$$

$$\frac{\partial}{\partial X}\operatorname{tr}\big(f(X)\big)=\operatorname{tr}\left(\frac{\partial f(X)}{\partial X}\right)$$

$$\frac{\partial}{\partial X}\det\big(f(X)\big)=\det\big(f(X)\big)\operatorname{tr}\left(f(X)^{-1}\frac{\partial f(X)}{\partial X}\right)$$

$$\frac{\partial}{\partial X}f(X)^{-1}=-f(X)^{-1}\frac{\partial f(X)}{\partial X}f(X)^{-1}$$

$$\frac{\partial\,a^\top X^{-1}b}{\partial X}=-(X^{-1})^\top ab^\top(X^{-1})^\top$$

$$\frac{\partial\,x^\top a}{\partial x}=a^\top\qquad\qquad\frac{\partial\,a^\top x}{\partial x}=a^\top$$

$$\frac{\partial\,a^\top Xb}{\partial X}=ab^\top$$

$$\boxed{\;\frac{\partial\,x^\top Bx}{\partial x}=x^\top(B+B^\top)\;}$$

$$\boxed{\;\frac{\partial}{\partial s}(x-As)^\top W(x-As)=-2(x-As)^\top WA\quad\text{pour } W\text{ SYMÉTRIQUE}\;}$$

> ⚠️ **Deux pièges dans cette liste.** (i) $\dfrac{\partial x^\top Bx}{\partial x}=x^\top(B+B^\top)$, **pas $2x^\top B$** — sauf si $B$ est **symétrique**. (ii) La dernière identité exige explicitement **$W$ symétrique** ; c'est elle qui donne le gradient des moindres carrés pondérés.

> ⚠️ **La remarque sur les tenseurs.** *« Ce livre ne couvre que les traces et transposées **de matrices**. Mais les dérivées peuvent être des tenseurs de dimension supérieure, où la trace et la transposée usuelles **ne sont pas définies**. Dans ces cas, la trace d'un tenseur $D\times D\times E\times F$ serait une matrice de dimension $E\times F$ — un cas particulier de **CONTRACTION TENSORIELLE**. De même, « transposer » un tenseur veut dire **échanger les deux premières dimensions**. »*

## 🔴 Concept 5 — Rétropropagation et différentiation automatique (§5.6)

### 5.1 Le problème

Considérons

$$f(x)=\sqrt{x^2+\exp(x^2)}+\cos\big(x^2+\exp(x^2)\big)$$

Par la règle de la chaîne :

$$\frac{df}{dx}=\frac{2x+2x\exp(x^2)}{2\sqrt{x^2+\exp(x^2)}}-\sin\big(x^2+\exp(x^2)\big)\big(2x+2x\exp(x^2)\big)$$

$$=2x\left(\frac{1}{2\sqrt{x^2+\exp(x^2)}}-\sin\big(x^2+\exp(x^2)\big)\right)\big(1+\exp(x^2)\big)$$

> ⚠️ **Le diagnostic.** *« Écrire le gradient explicitement de cette façon est souvent **impraticable**, car cela donne une expression très longue. En pratique, si l'on n'est pas prudent, l'implémentation du gradient pourrait être **SIGNIFICATIVEMENT PLUS COÛTEUSE que le calcul de la fonction elle-même** — ce qui impose une surcharge inutile. »*

<details><summary>Contrôle de la formule (5.110)</summary>

| $x$ | dérivée numérique | formule (5.110) |
|---|---|---|
| $0{,}5$ | $-1{,}360431$ | $-1{,}360431$ |
| $1{,}1$ | $11{,}713402$ | $11{,}713402$ |
| $-0{,}7$ | $1{,}874002$ | $1{,}874002$ |

</details>

### 5.2 Gradients dans un réseau profond

Un réseau profond calcule

$$y=(f_K\circ f_{K-1}\circ\dots\circ f_1)(x)=f_K\big(f_{K-1}(\dots(f_1(x))\dots)\big)$$

où $x$ sont les entrées (par exemple des images), $y$ les observations (par exemple des étiquettes de classe), et **chaque $f_i$ possède ses propres paramètres**.

Dans un réseau multicouche, $f_i(x_{i-1})=\sigma(A_{i-1}x_{i-1}+b_{i-1})$ où $\sigma$ est une **fonction d'activation** : **sigmoïde** $\frac{1}{1+e^{-x}}$, **tanh**, ou **ReLU** (*rectified linear unit*).

$$f_0:=x,\qquad f_i:=\sigma_i(A_{i-1}f_{i-1}+b_{i-1}),\quad i=1,\dots,K$$

et on minimise la **perte quadratique**

$$L(\theta)=\lVert y-f_K(\theta,x)\rVert^2,\qquad\theta=\{A_0,b_0,\dots,A_{K-1},b_{K-1}\}$$

**Les gradients par la règle de la chaîne :**

$$\frac{\partial L}{\partial\theta_{K-1}}=\frac{\partial L}{\partial f_K}\frac{\partial f_K}{\partial\theta_{K-1}}$$

$$\frac{\partial L}{\partial\theta_{K-2}}=\frac{\partial L}{\partial f_K}\frac{\partial f_K}{\partial f_{K-1}}\frac{\partial f_{K-1}}{\partial\theta_{K-2}}$$

$$\frac{\partial L}{\partial\theta_{K-3}}=\frac{\partial L}{\partial f_K}\frac{\partial f_K}{\partial f_{K-1}}\frac{\partial f_{K-1}}{\partial f_{K-2}}\frac{\partial f_{K-2}}{\partial\theta_{K-3}}$$

$$\boxed{\;\frac{\partial L}{\partial\theta_i}=\frac{\partial L}{\partial f_K}\frac{\partial f_K}{\partial f_{K-1}}\cdots\frac{\partial f_{i+2}}{\partial f_{i+1}}\frac{\partial f_{i+1}}{\partial\theta_i}\;}$$

> **La lecture des deux types de termes.** Les termes $\dfrac{\partial f_{j+1}}{\partial f_j}$ sont les dérivées partielles de la **sortie d'une couche relativement à ses ENTRÉES** ; le dernier terme $\dfrac{\partial f_{i+1}}{\partial\theta_i}$ est la dérivée de la sortie d'une couche relativement à ses **PARAMÈTRES**.

> **L'idée centrale de la rétropropagation.** *« En supposant qu'on a **déjà calculé** les dérivées partielles $\partial L/\partial\theta_{i+1}$, **l'ESSENTIEL DU CALCUL PEUT ÊTRE RÉUTILISÉ** pour calculer $\partial L/\partial\theta_i$. »*

**La chronologie.** *Kelley (1960), Bryson (1961), Dreyfus (1962), Rumelhart* et al. *(1986).*

### 5.3 La différentiation automatique

> **Le statut.** *« Il se trouve que la **rétropropagation est un CAS PARTICULIER** d'une technique générale de l'analyse numérique appelée **DIFFÉRENTIATION AUTOMATIQUE**. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que c'est.</span>

*« Un ensemble de techniques pour évaluer **NUMÉRIQUEMENT (par opposition à SYMBOLIQUEMENT) le gradient EXACT (à la précision machine près)** d'une fonction, en travaillant avec des **variables intermédiaires** et en appliquant la règle de la chaîne. »* Elle applique une série d'opérations arithmétiques élémentaires (addition, multiplication) et de fonctions élémentaires ($\sin$, $\cos$, $\exp$, $\log$).

</div>

> ⚠️ **Trois choses différentes, à ne pas confondre :**
>
> $$\text{différentiation AUTOMATIQUE}\neq\text{différentiation SYMBOLIQUE}\neq\text{approximation NUMÉRIQUE (différences finies)}$$

**Les deux modes.** Pour un graphe $x\to a\to b\to y$, la chaîne donne $\dfrac{dy}{dx}=\dfrac{dy}{db}\dfrac{db}{da}\dfrac{da}{dx}$. Par **associativité** du produit matriciel, on peut choisir l'ordre :

$$\boxed{\;\text{MODE INVERSE :}\quad\frac{dy}{dx}=\left(\frac{dy}{db}\frac{db}{da}\right)\frac{da}{dx}\;}$$

$$\boxed{\;\text{MODE DIRECT :}\quad\frac{dy}{dx}=\frac{dy}{db}\left(\frac{db}{da}\frac{da}{dx}\right)\;}$$

| Mode | Sens | Quand l'utiliser |
|---|---|---|
| **INVERSE** (*reverse*) | Les gradients se propagent **EN ARRIÈRE**, à rebours du flot des données | **C'est la RÉTROPROPAGATION.** Significativement **moins cher** quand la dimension d'**entrée est BEAUCOUP PLUS GRANDE** que celle de la sortie — le cas des réseaux de neurones |
| **DIRECT** (*forward*) | Les gradients suivent les données, de gauche à droite | Moins cher dans le cas inverse (peu d'entrées, beaucoup de sorties) |

*Référence donnée : Baydin* et al. *(2018) pour un panorama de la différentiation automatique en apprentissage automatique.*

### 5.4 Exemple 5.14 — le graphe de calcul en pratique

Pour la fonction $f(x)=\sqrt{x^2+\exp(x^2)}+\cos\big(x^2+\exp(x^2)\big)$, on introduit des **variables intermédiaires** :

$$a=x^2,\quad b=\exp(a),\quad c=a+b,\quad d=\sqrt c,\quad e=\cos(c),\quad f=d+e$$

> *« C'est le même processus de pensée qui se produit quand on applique la règle de la chaîne. Et cet ensemble d'équations demande **MOINS d'opérations** qu'une implémentation directe. »*

**Les dérivées élémentaires** (chacune **triviale**) :

$$\frac{\partial a}{\partial x}=2x,\quad\frac{\partial b}{\partial a}=\exp(a),\quad\frac{\partial c}{\partial a}=1=\frac{\partial c}{\partial b},\quad\frac{\partial d}{\partial c}=\frac{1}{2\sqrt c},\quad\frac{\partial e}{\partial c}=-\sin(c),\quad\frac{\partial f}{\partial d}=1=\frac{\partial f}{\partial e}$$

**La remontée** — en travaillant **à rebours depuis la sortie** :

$$\frac{\partial f}{\partial c}=\frac{\partial f}{\partial d}\frac{\partial d}{\partial c}+\frac{\partial f}{\partial e}\frac{\partial e}{\partial c}=1\cdot\frac{1}{2\sqrt c}+1\cdot(-\sin c)$$

$$\frac{\partial f}{\partial b}=\frac{\partial f}{\partial c}\frac{\partial c}{\partial b}=\frac{\partial f}{\partial c}\cdot1$$

$$\frac{\partial f}{\partial a}=\frac{\partial f}{\partial b}\frac{\partial b}{\partial a}+\frac{\partial f}{\partial c}\frac{\partial c}{\partial a}=\frac{\partial f}{\partial b}\exp(a)+\frac{\partial f}{\partial c}\cdot1$$

$$\frac{\partial f}{\partial x}=\frac{\partial f}{\partial a}\frac{\partial a}{\partial x}=\frac{\partial f}{\partial a}\cdot2x$$

> **L'observation contre-intuitive du livre.** *« En pensant à chacune de ces dérivées comme à une **variable**, on observe que **le calcul requis pour obtenir la dérivée est de COMPLEXITÉ SIMILAIRE au calcul de la fonction elle-même**. C'est assez contre-intuitif, puisque l'expression mathématique de la dérivée est **significativement plus compliquée** que celle de la fonction. »*

⚠️ Noter les **deux chemins** dans $\partial f/\partial c$ et $\partial f/\partial a$ : le nœud $c$ est utilisé **deux fois** ($d$ et $e$), donc les contributions **s'additionnent**.

### 5.5 Le formalisme général

Soient $x_1,\dots,x_d$ les variables d'**entrée**, $x_{d+1},\dots,x_{D-1}$ les variables **intermédiaires**, et $x_D$ la variable de **sortie**. Le graphe de calcul s'écrit

$$\boxed{\;\text{Pour } i=d+1,\dots,D:\qquad x_i=g_i\big(x_{\operatorname{Pa}(x_i)}\big)\;}$$

où les $g_i$ sont des fonctions élémentaires et $x_{\operatorname{Pa}(x_i)}$ les **nœuds PARENTS** de $x_i$. Avec $f=x_D$, on a $\dfrac{\partial f}{\partial x_D}=1$, puis, **à rebours** :

$$\boxed{\;\frac{\partial f}{\partial x_i}=\sum_{x_j:\,x_i\in\operatorname{Pa}(x_j)}\frac{\partial f}{\partial x_j}\frac{\partial x_j}{\partial x_i}\;}$$

- L'équation $x_i=g_i(x_{\operatorname{Pa}(x_i)})$ est la **PROPAGATION AVANT** de la fonction.
- L'équation de la somme est la **RÉTROPROPAGATION** du gradient à travers le graphe.

> ⚠️ **Les limites.** *« L'approche fonctionne dès qu'on a une fonction exprimable comme un graphe de calcul dont les fonctions élémentaires sont différentiables. En fait, ce peut même ne pas être une fonction mathématique mais un **PROGRAMME INFORMATIQUE**. Cependant, tous les programmes ne peuvent pas être automatiquement différentiés — par exemple si l'on ne trouve pas de fonctions élémentaires différentiables. Les structures de programmation comme les **boucles for** et les **instructions if** demandent aussi plus de soin. »*

## 🟠 Concept 6 — Dérivées d'ordre supérieur et hessienne (§5.7)

**La notation, pour $f:\mathbb R^2\to\mathbb R$ de variables $x,y$ :**

| Notation | Signification |
|---|---|
| $\dfrac{\partial^2f}{\partial x^2}$ | Dérivée partielle **seconde** de $f$ relativement à $x$ |
| $\dfrac{\partial^nf}{\partial x^n}$ | Dérivée partielle **$n$-ième** relativement à $x$ |
| $\dfrac{\partial^2f}{\partial y\,\partial x}=\dfrac{\partial}{\partial y}\left(\dfrac{\partial f}{\partial x}\right)$ | D'abord relativement à **$x$**, **PUIS** relativement à **$y$** |
| $\dfrac{\partial^2f}{\partial x\,\partial y}$ | D'abord **$y$**, puis **$x$** |

> **Le théorème de symétrie.** Si $f(x,y)$ est **deux fois (continûment) différentiable**, alors
>
> $$\boxed{\;\frac{\partial^2f}{\partial x\,\partial y}=\frac{\partial^2f}{\partial y\,\partial x}\;}$$
>
> *« l'ORDRE de différentiation N'IMPORTE PAS »*, et la matrice hessienne est **SYMÉTRIQUE**.

> **La hessienne.** C'est la **collection de toutes les dérivées partielles du SECOND ordre** :
>
> $$\boxed{\;H=\begin{bmatrix}\dfrac{\partial^2f}{\partial x^2}&\dfrac{\partial^2f}{\partial x\,\partial y}\\[8pt]\dfrac{\partial^2f}{\partial x\,\partial y}&\dfrac{\partial^2f}{\partial y^2}\end{bmatrix}\;}$$
>
> notée $\nabla^2_{x,y}f(x,y)$. En général, pour $x\in\mathbb R^n$ et $f:\mathbb R^n\to\mathbb R$, $H$ est une matrice $n\times n$.

> **Ce qu'elle mesure.** *« La hessienne mesure la **COURBURE** de la fonction localement autour de $(x,y)$. »* Elle est requise par la **méthode de Newton** pour l'optimisation (Nocedal & Wright 2006).

> ⚠️ **Cas vectoriel.** *« Si $f:\mathbb R^n\to\mathbb R^m$ est un champ de vecteurs, la hessienne est un TENSEUR $(m\times n\times n)$. »*

## 🔴 Concept 7 — Linéarisation et série de Taylor multivariée (§5.8)

### 7.1 La linéarisation

$$\boxed{\;f(x)\approx f(x_0)+(\nabla_xf)(x_0)(x-x_0)\;}$$

C'est une **approximation LOCALEMENT LINÉAIRE** de $f$ autour de $x_0$ — le **Taylor d'ordre 1**. Elle n'est bonne **qu'au voisinage** de $x_0$.

### 7.2 La série de Taylor multivariée

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 5.7 (Série de Taylor multivariée).</span>

Pour $f:\mathbb R^D\to\mathbb R$ lisse en $x_0$, en posant $\delta:=x-x_0$ :

$$\boxed{\;f(x)=\sum_{k=0}^{\infty}\frac{D_x^kf(x_0)}{k!}\,\delta^k\;}$$

où $D_x^kf(x_0)$ est la **$k$-ième dérivée TOTALE** de $f$ relativement à $x$, évaluée en $x_0$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 5.8 (Polynôme de Taylor).</span>

Le polynôme de Taylor de degré $n$ contient les **$n+1$ premières** composantes :

$$T_n(x)=\sum_{k=0}^{n}\frac{D_x^kf(x_0)}{k!}\,\delta^k$$

</div>

> ⚠️ **La notation $\delta^k$ est « légèrement relâchée ».** *« $\delta^k$ n'est pas défini pour des vecteurs $x\in\mathbb R^D$, $D>1$, et $k>1$. »* En réalité, $D_x^kf$ **et** $\delta^k$ sont des **TENSEURS d'ordre $k$**. Le tenseur $\delta^k\in\mathbb R^{D\times D\times\dots\times D}$ ($k$ fois) est le **produit EXTÉRIEUR** $k$-uple, noté $\otimes$ :
>
> $$\delta^2:=\delta\otimes\delta=\delta\delta^\top,\quad\delta^2[i,j]=\delta[i]\delta[j]$$
>
> $$\delta^3:=\delta\otimes\delta\otimes\delta,\quad\delta^3[i,j,k]=\delta[i]\delta[j]\delta[k]$$

**Les quatre premiers termes, explicitement :**

$$k=0:\quad D_x^0f(x_0)\delta^0=f(x_0)\in\mathbb R$$

$$k=1:\quad D_x^1f(x_0)\delta^1=\underbrace{\nabla_xf(x_0)}_{1\times D}\underbrace{\delta}_{D\times1}=\sum_{i=1}^{D}\nabla_xf(x_0)[i]\,\delta[i]\in\mathbb R$$

$$\boxed{\;k=2:\quad D_x^2f(x_0)\delta^2=\operatorname{tr}\big(\underbrace{H(x_0)}_{D\times D}\underbrace{\delta}_{D\times1}\underbrace{\delta^\top}_{1\times D}\big)=\delta^\top H(x_0)\,\delta=\sum_{i=1}^{D}\sum_{j=1}^{D}H[i,j]\,\delta[i]\delta[j]\;}$$

$$k=3:\quad D_x^3f(x_0)\delta^3=\sum_{i=1}^{D}\sum_{j=1}^{D}\sum_{k=1}^{D}D_x^3f(x_0)[i,j,k]\,\delta[i]\delta[j]\delta[k]\in\mathbb R$$

⚠️ Le terme $D_x^kf(x_0)\delta^k$ contient **exactement des polynômes d'ordre $k$**.

*Le livre note aussi les implémentations `np.einsum('i,i',Df1,d)`, `np.einsum('ij,i,j',Df2,d,d)`, `np.einsum('ijk,i,j,k',Df3,d,d,d)`.*

### 7.3 Exemple 5.15 — le développement complet en deux variables

$$f(x,y)=x^2+2xy+y^3\qquad\text{autour de }(x_0,y_0)=(1,2)$$

> **La prédiction avant le calcul.** *« La fonction est un polynôme de degré 3. On cherche un développement de Taylor, qui est lui-même une combinaison linéaire de polynômes. On **ne s'attend donc PAS** à ce que le développement contienne des termes d'ordre 4 ou plus. Il devrait suffire de déterminer les **QUATRE PREMIERS termes** pour une représentation **EXACTE**. »*

**Ordre 0 :** $f(1,2)=1+4+8=13$

**Ordre 1 :**

$$\frac{\partial f}{\partial x}=2x+2y\ \Rightarrow\ \frac{\partial f}{\partial x}(1,2)=6,\qquad\frac{\partial f}{\partial y}=2x+3y^2\ \Rightarrow\ \frac{\partial f}{\partial y}(1,2)=14$$

$$\frac{D_{x,y}^1f(1,2)}{1!}\,\delta=\begin{bmatrix}6&14\end{bmatrix}\begin{bmatrix}x-1\\y-2\end{bmatrix}=6(x-1)+14(y-2)$$

**Ordre 2 :**

$$\frac{\partial^2f}{\partial x^2}=2,\qquad\frac{\partial^2f}{\partial y^2}=6y,\qquad\frac{\partial^2f}{\partial y\,\partial x}=\frac{\partial^2f}{\partial x\,\partial y}=2$$

$$H=\begin{bmatrix}2&2\\2&6y\end{bmatrix}\qquad\Longrightarrow\qquad H(1,2)=\begin{bmatrix}2&2\\2&12\end{bmatrix}$$

$$\frac{D_{x,y}^2f(1,2)}{2!}\,\delta^2=\frac12\delta^\top H(1,2)\delta=(x-1)^2+2(x-1)(y-2)+6(y-2)^2$$

**Ordre 3 :** la seule dérivée troisième non nulle est $\dfrac{\partial^3f}{\partial y^3}=6$, donc

$$D_{x,y}^3f[:,:,1]=\begin{bmatrix}0&0\\0&0\end{bmatrix},\qquad D_{x,y}^3f[:,:,2]=\begin{bmatrix}0&0\\0&6\end{bmatrix}$$

$$\frac{D_{x,y}^3f(1,2)}{3!}\,\delta^3=\frac{6}{6}(y-2)^3=(y-2)^3$$

**Le résultat final :**

$$\boxed{\;f(x,y)=13+6(x-1)+14(y-2)+(x-1)^2+2(x-1)(y-2)+6(y-2)^2+(y-2)^3\;}$$

<details><summary>Vérification que le développement est EXACT partout</summary>

| $(x,y)$ | $f(x,y)$ | $T_3(x,y)$ | écart |
|---|---|---|---|
| $(0{,}3\ ;\ 1{,}4)$ | $3{,}674000$ | $3{,}674000$ | $0$ |
| $(2{,}5\ ;\ -1{,}0)$ | $0{,}250000$ | $0{,}250000$ | $0$ |
| $(1{,}0\ ;\ 2{,}0)$ | $13{,}000000$ | $13{,}000000$ | $0$ |
| $(-3{,}0\ ;\ 4{,}5)$ | $73{,}125000$ | $73{,}125000$ | $0$ |

⚠️ L'écart est **nul même TRÈS LOIN** de $(1,2)$ : c'est la marque d'un développement de Taylor d'un **polynôme** de degré $\leqslant n$ — il est **exact globalement**, pas seulement localement.

Contrôles intermédiaires : $f(1,2)=13$ ; $f_x(1,2)=2\cdot1+2\cdot2=6$ ; $f_y(1,2)=2\cdot1+3\cdot4=14$ ; $H(1,2)=\begin{bmatrix}2&2\\2&12\end{bmatrix}$ ; $\partial^3f/\partial y^3=6$

</details>

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Calculer $f'(x)$ » | **§5.1.2** | Produit / quotient / somme / chaîne |
| « Développement de Taylor de degré $n$ en $x_0$ » | **Déf. 5.3** | Calculer $f^{(k)}(x_0)$ pour $k\leqslant n$, puis $\sum f^{(k)}(x_0)(x-x_0)^k/k!$ |
| « Série de Maclaurin » | **Déf. 5.4** | Taylor en $x_0=0$ ; chercher un **motif périodique** dans les dérivées |
| « Calculer le gradient de $f:\mathbb R^n\to\mathbb R$ » | **Déf. 5.5** | Une partielle par variable, rangées en **vecteur LIGNE $1\times n$** |
| « Calculer la jacobienne » | **Déf. 5.6** | $J(i,j)=\partial f_i/\partial x_j$, taille $m\times n$ ( $m$ = sorties, $n$ = entrées) |
| « $f$ dépend de $x(t)$ » | **Chaîne multivariée** | $\dfrac{df}{dt}=\dfrac{\partial f}{\partial x}\dfrac{\partial x}{\partial t}$ ; **vérifier les dimensions** |
| « De combien l'aire est-elle multipliée ? » | **Déterminant jacobien** | $\|\det J\|$ |
| « Gradient de $Ax$ relativement à $x$ » | **Ex. 5.9** | $\dfrac{d(Ax)}{dx}=A$ |
| « Gradient d'une perte des moindres carrés » | **Ex. 5.11** | Poser $L(e)=\lVert e\rVert^2$, $e(\theta)=y-\Phi\theta$, puis $\dfrac{\partial L}{\partial\theta}=-2e^\top\Phi$ |
| « Dérivée relativement à une MATRICE » | **§5.4** | Déterminer la taille du **tenseur** ; envisager d'**aplatir** |
| « $\dfrac{\partial}{\partial X}\operatorname{tr}$ / $\det$ / $X^{-1}$ » | **§5.5** | Chercher dans la table des **dix identités** |
| « Rétropropager le gradient » | **§5.6** | Graphe de calcul, variables intermédiaires, remontée depuis la sortie |
| « Mode direct ou inverse ? » | **§5.6.2** | Entrée $\gg$ sortie $\Rightarrow$ **INVERSE** (rétropropagation) |
| « Calculer la hessienne » | **§5.7** | Toutes les partielles **secondes** ; elle est **symétrique** si $f$ est deux fois $C^1$ |
| « Linéariser $f$ autour de $x_0$ » | **§5.8** | $f(x_0)+(\nabla_xf)(x_0)(x-x_0)$ |
| « Développement de Taylor multivarié » | **Déf. 5.7** | $k=0$ : $f(x_0)$ ; $k=1$ : $\nabla f\cdot\delta$ ; $k=2$ : $\frac12\delta^\top H\delta$ ; $k=3$ : tenseur |

## Comment résoudre : les cinq méthodes pas-à-pas

**Méthode A — Tout calcul de gradient (le protocole du livre).**

1. **DÉTERMINER LA DIMENSION du résultat AVANT tout calcul** — $f:\mathbb R^n\to\mathbb R^m$ donne $m\times n$.
2. Décomposer en fonctions élémentaires.
3. Calculer les partielles **une variable à la fois**.
4. Ranger dans la jacobienne : **lignes = sorties, colonnes = entrées**.
5. Contrôle : la dimension obtenue correspond-elle à l'étape 1 ?

**Méthode B — Règle de la chaîne multivariée.**

1. Identifier la composition $x\to f\to g$.
2. Écrire les **dimensions** de $\partial g/\partial f$ et $\partial f/\partial x$.
3. Vérifier que les **dimensions voisines s'annulent**.
4. Multiplier **dans le bon ordre** : $\dfrac{\partial g}{\partial f}\dfrac{\partial f}{\partial x}$ — jamais l'inverse.
5. Substituer les variables intermédiaires par leurs expressions.
6. Contrôle numérique par **différences finies centrées** sur deux ou trois points.

**Méthode C — Taylor univarié.**

1. Calculer $f^{(k)}(x_0)$ pour $k=0,\dots,n$.
2. Chercher un **motif** ou une **périodicité** (Ex. 5.4 : période 4).
3. Assembler $\sum_k f^{(k)}(x_0)(x-x_0)^k/k!$.
4. Si $f$ est un **polynôme de degré $\leqslant n$**, le développement est **EXACT** : le vérifier en développant.

**Méthode D — Taylor multivarié.**

1. Poser $\delta=x-x_0$.
2. $k=0$ : $f(x_0)$.
3. $k=1$ : $\nabla_xf(x_0)\,\delta$ — un produit $(1\times D)(D\times1)$.
4. $k=2$ : $\frac{1}{2}\delta^\top H(x_0)\delta$ — développer explicitement en $\sum_{i,j}H[i,j]\delta_i\delta_j/2$.
5. $k=3$ : identifier les **rares** dérivées troisièmes non nulles.
6. Contrôle : si $f$ est un polynôme de degré $d$, s'arrêter à $n=d$ et vérifier l'**égalité exacte**.

**Méthode E — Rétropropagation.**

1. Construire le **graphe de calcul** avec des variables intermédiaires.
2. **Propagation avant** : évaluer chaque nœud.
3. Initialiser $\partial f/\partial x_D=1$ à la sortie.
4. Remonter : pour chaque nœud, **SOMMER sur tous ses enfants** $\sum_j\dfrac{\partial f}{\partial x_j}\dfrac{\partial x_j}{\partial x_i}$.
5. Un nœud utilisé **plusieurs fois** reçoit **plusieurs contributions additives**.
6. Contrôle : comparer à une **différence finie** sur un point.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Écrire le gradient en **colonne** | Dans ce livre, le gradient est un **VECTEUR LIGNE** $1\times n$ — c'est ce qui rend la chaîne automatique |
| Confondre disposition au numérateur et au dénominateur | Elles sont **TRANSPOSÉES** l'une de l'autre ; le livre utilise la disposition au **numérateur** |
| Inverser lignes et colonnes de la jacobienne | $J(i,j)=\partial f_i/\partial x_j$ : **lignes = SORTIES**, **colonnes = ENTRÉES** |
| Multiplier les facteurs de la chaîne dans le mauvais ordre | $\dfrac{\partial g}{\partial f}\dfrac{\partial f}{\partial x}$, jamais $\dfrac{\partial f}{\partial x}\dfrac{\partial g}{\partial f}$ — la multiplication matricielle n'est **pas commutative** |
| Traiter $\partial f/\partial x$ comme une **fraction** | Le livre le dit : *« ce n'est qu'une intuition, pas mathématiquement correct »* |
| Se lancer dans le calcul sans vérifier les dimensions | **Toujours déterminer la taille du résultat en PREMIER** — c'est le protocole du livre |
| Croire qu'un polynôme de Taylor est toujours approximatif | Pour un **polynôme de degré $k\leqslant n$**, $T_n=f$ **EXACTEMENT** (Ex. 5.3 et 5.15) |
| Croire que Taylor converge partout | Le polynôme est similaire à $f$ **dans un VOISINAGE de $x_0$** ; hors voisinage, il peut diverger |
| Oublier le $k!$ au dénominateur | Il vient de la dérivation répétée de $(x-x_0)^k$ |
| Écrire $\dfrac{\partial x^\top Bx}{\partial x}=2x^\top B$ | C'est $x^\top(B+B^\top)$ — l'égalité avec $2x^\top B$ n'a lieu que si $B$ est **symétrique** |
| Oublier la condition « $W$ symétrique » | L'identité $\dfrac{\partial}{\partial s}(x-As)^\top W(x-As)=-2(x-As)^\top WA$ l'exige explicitement |
| Écrire $\dfrac{\partial}{\partial X}f(X)^{-1}=-f(X)^{-2}\dfrac{\partial f}{\partial X}$ | C'est $-f(X)^{-1}\dfrac{\partial f}{\partial X}f(X)^{-1}$ — l'inverse **encadre** la dérivée des deux côtés |
| Oublier le facteur 2 sur la diagonale dans l'exemple 5.13 | Quand $p=q$, $\partial K_{pq}/\partial R_{ij}=2R_{iq}$ car la variable apparaît **deux fois** |
| Négliger les **chemins multiples** en rétropropagation | Un nœud utilisé plusieurs fois reçoit **une contribution ADDITIVE par chemin** |
| Croire que la rétropropagation est propre aux réseaux de neurones | C'est un **cas particulier** de la différentiation automatique en **mode inverse** |
| Confondre différentiation automatique et symbolique | Trois choses distinctes : **automatique** (numérique exacte), **symbolique**, **différences finies** (approchée) |
| Utiliser le mode direct pour un réseau profond | Le **mode INVERSE** est bien moins cher quand la dimension d'entrée dépasse celle de la sortie |
| Croire que tout programme est différentiable automatiquement | Les **boucles for** et **instructions if** demandent du soin ; certaines fonctions élémentaires ne sont pas différentiables |
| Croire la hessienne toujours symétrique | Elle l'est si $f$ est **deux fois continûment différentiable** — l'hypothèse compte |
| Croire la hessienne toujours une matrice | Pour un **champ de vecteurs** $f:\mathbb R^n\to\mathbb R^m$, c'est un **TENSEUR** $(m\times n\times n)$ |
| Écrire $\delta^2$ comme $\delta$ au carré | C'est le **produit EXTÉRIEUR** $\delta\delta^\top$, une matrice $D\times D$ |
| Oublier le $\frac12$ du terme quadratique de Taylor | $\dfrac{D_x^2f(x_0)}{2!}\delta^2=\dfrac12\delta^\top H\delta$ |
| Croire $\|\det J\|$ exact pour une transformation non linéaire | La jacobienne approche **LOCALEMENT** la transformation ; elle n'est exacte que dans le cas **linéaire** |
| Croire que calculer un gradient coûte bien plus cher que la fonction | Avec la diff. automatique, le coût est de **complexité SIMILAIRE** — le livre insiste sur ce point contre-intuitif |

## 📌 Ultimate Review

```
═════════ LES NEUF FORMULES À SAVOIR SANS HÉSITER ═════════
  1.  df/dx := lim_{h→0} (f(x+h) − f(x))/h
  2.  Tn(x) = Σ_{k=0..n} f^(k)(x0)/k! · (x − x0)^k        x0 = 0 → Maclaurin
  3.  CHAÎNE   (g∘f)' = g'(f) f'      ∂/∂x g(f(x)) = (∂g/∂f)(∂f/∂x)
  4.  ∇x f = df/dx ∈ R^(1×n)                     ⚠️ VECTEUR LIGNE
  5.  JACOBIENNE  J(i,j) = ∂fi/∂xj ∈ R^(m×n)     lignes = sorties
  6.  |det J| = facteur d'échelle des volumes
  7.  d(Ax)/dx = A         ∂(xᵀBx)/∂x = xᵀ(B + Bᵀ)
      ∂L/∂θ = −2 eᵀ Φ      pour L = ‖y − Φθ‖²
  8.  H = ∇²f  SYMÉTRIQUE si f deux fois C¹  ·  mesure la COURBURE
  9.  TAYLOR MULTIVARIÉ  f(x) = Σ_k D^k f(x0)/k! · δ^k   ,   δ = x − x0
      k=0 : f(x0)   k=1 : ∇f·δ   k=2 : ½ δᵀ H δ
═══════════════════════════════════════════════════════════
```

**Le tableau des dimensions — la référence de survie :**

| $f$ | $df/dx$ | Taille |
|---|---|---|
| $\mathbb R\to\mathbb R$ | scalaire | $1\times1$ |
| $\mathbb R^D\to\mathbb R$ | vecteur **ligne** | $1\times D$ |
| $\mathbb R\to\mathbb R^E$ | vecteur **colonne** | $E\times1$ |
| $\mathbb R^D\to\mathbb R^E$ | **matrice** | $E\times D$ |
| $\mathbb R^{m\times n}\to\mathbb R^{p\times q}$ | **tenseur** | $(p\times q)\times(m\times n)$ |

**Les trois façons de calculer une dérivée :**

| Méthode | Nature | Coût | Exactitude |
|---|---|---|---|
| **Symbolique** | Expression fermée | Explosion de la taille de l'expression | Exacte |
| **Différences finies** | $\frac{f(x+h)-f(x-h)}{2h}$ | Une évaluation par variable | **Approchée** |
| **Automatique** | Graphe + chaîne | **Même ordre que $f$** | Exacte à la précision machine |

**Les deux modes de la différentiation automatique :**

|  | Mode DIRECT | Mode INVERSE (= rétropropagation) |
|---|---|---|
| Sens | Avec le flot des données | **À rebours** |
| Parenthésage | $\frac{dy}{db}\left(\frac{db}{da}\frac{da}{dx}\right)$ | $\left(\frac{dy}{db}\frac{db}{da}\right)\frac{da}{dx}$ |
| Bon quand | Peu d'entrées, beaucoup de sorties | **Beaucoup d'entrées, peu de sorties** (réseaux de neurones) |

**Où chaque notion resservira dans le livre :**

| Notion du ch. 5 | Suite |
|---|---|
| Gradient, descente de gradient | **Optimisation continue** (ch. 7) |
| Déterminant jacobien | **Transformation de variables aléatoires** (§6.7), reparamétrisation |
| Perte des moindres carrés et son gradient | **Régression linéaire** (ch. 9) |
| Hessienne | **Méthode de Newton**, convexité (ch. 7) |
| Rétropropagation | Entraînement des **réseaux profonds** |
| Taylor multivarié | Approximations locales, **Laplace**, méthodes du second ordre |

## 🧠 Active Recall

**Dérivation univariée**

1. Écrire le quotient différentiel. Que calcule-t-il géométriquement ?
2. Écrire la définition de la dérivée. Que devient la sécante ?
3. Dans quelle direction pointe la dérivée ?
4. Écrire le polynôme de Taylor de degré $n$ et la série de Taylor.
5. Qu'est-ce que la série de Maclaurin ? Une fonction analytique ?
6. Quand un polynôme de Taylor est-il une représentation **exacte** ?
7. Dans l'exemple 5.3, pourquoi $T_6=x^4$ exactement ?
8. Quel motif suivent les coefficients dans l'exemple 5.4 ? Quelle est la période ?
9. Donner les quatre règles de dérivation.
10. Détailler l'exemple 5.5.

**Dérivées partielles et gradient** 11. Comment calcule-t-on une dérivée partielle ? 12. Quelle est la taille du gradient de $f:\mathbb R^n\to\mathbb R$ ? 13. Donner les **deux raisons** pour lesquelles le livre choisit un vecteur ligne. 14. Écrire la règle de la chaîne multivariée. 15. Expliquer le mnémonique des « dimensions voisines ». Quelle réserve le livre y met-il ? 16. Écrire $df/dt$ quand $f(x_1,x_2)$ avec $x_1(t)$, $x_2(t)$. 17. Détailler l'exemple 5.8.

**Jacobienne** 18. Définir la jacobienne. Quelle est sa taille ? Quelle convention de disposition ? 19. Donner le tableau des quatre dimensions de gradient. 20. Que représente $|\det J|$ ? 21. La jacobienne est-elle exacte pour une transformation non linéaire ? 22. Que vaut le gradient de $f(x)=Ax$ ? 23. Détailler l'exemple 5.10 (les deux dimensions, puis le produit). 24. Détailler l'exemple 5.11 : dimension, chaîne, les deux facteurs, résultat. 25. Pourquoi le livre dit-il que l'approche directe devient impraticable ?

**Gradients de matrices** 26. Quelle est la taille du gradient d'une matrice $m\times n$ relativement à une $p\times q$ ? 27. Quelle astuce le livre propose-t-il et pourquoi ? 28. Détailler l'exemple 5.13. D'où vient le facteur $2$ ? 29. Écrire les identités pour $\operatorname{tr}$, $\det$ et $f(X)^{-1}$. 30. Écrire $\dfrac{\partial x^\top Bx}{\partial x}$ et $\dfrac{\partial a^\top Xb}{\partial X}$. 31. Que devient la trace pour un tenseur ? Et la transposée ?

**Rétropropagation** 32. Pourquoi écrire un gradient explicitement est-il impraticable ? 33. Écrire la composition d'un réseau profond et sa perte. 34. Citer trois fonctions d'activation. 35. Écrire $\partial L/\partial\theta_i$. Quel est l'apport de la rétropropagation ? 36. Qu'est-ce que la différentiation automatique ? De quoi diffère-t-elle ? 37. Distinguer mode direct et mode inverse. Lequel est la rétropropagation ? 38. Pourquoi le mode inverse est-il moins cher pour les réseaux ? 39. Détailler les six variables intermédiaires de l'exemple 5.14. 40. Quelle est l'observation contre-intuitive sur le coût ? 41. Écrire la formule générale de la propagation avant et de la rétropropagation. 42. Quelles sont les limites de la différentiation automatique ?

**Ordre supérieur et Taylor multivarié** 43. Distinguer $\dfrac{\partial^2f}{\partial y\,\partial x}$ et $\dfrac{\partial^2f}{\partial x\,\partial y}$. 44. Sous quelle condition la hessienne est-elle symétrique ? 45. Que mesure la hessienne ? Quelle est sa taille pour $f:\mathbb R^n\to\mathbb R$ ? Pour un champ de vecteurs ? 46. Écrire la linéarisation de $f$ autour de $x_0$. 47. Écrire la série de Taylor multivariée. Qu'est-ce que $\delta$ ? 48. Qu'est-ce que $\delta^k$ exactement ? 49. Écrire les termes $k=0,1,2,3$. 50. Détailler l'exemple 5.15 : ordre 0, 1, 2, 3. 51. Pourquoi le développement est-il exact et pas seulement local ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Quotient différentiel ? | $\dfrac{f(x+\delta x)-f(x)}{\delta x}$ — la pente de la **SÉCANTE** |
| Dérivée ? | $\dfrac{df}{dx}=\lim_{h\to0}\dfrac{f(x+h)-f(x)}{h}$ — la **TANGENTE** |
| Direction de la dérivée ? | La **plus forte MONTÉE** |
| Polynôme de Taylor de degré $n$ ? | $T_n(x)=\sum_{k=0}^{n}\dfrac{f^{(k)}(x_0)}{k!}(x-x_0)^k$ |
| Série de Taylor ? | La même somme, jusqu'à $\infty$, pour $f\in C^\infty$ |
| Série de Maclaurin ? | Taylor en **$x_0=0$** |
| Fonction analytique ? | $f(x)=T_\infty(x)$ |
| Quand $T_n$ est-il exact ? | Pour un **polynôme de degré $k\leqslant n$** — toutes les dérivées $f^{(i)}$, $i>k$, s'annulent |
| $T_6$ de $x^4$ en $x_0=1$ ? | $=x^4$ **exactement** ; coefficients $1,4,12,24,24,0,0$ |
| Motif des coefficients de $\sin+\cos$ ? | Seulement $\pm1$, chacun **DEUX FOIS**, avec $f^{(k+4)}(0)=f^{(k)}(0)$ |
| Règle du produit ? | $(fg)'=f'g+fg'$ |
| Règle du quotient ? | $\left(\dfrac fg\right)'=\dfrac{f'g-fg'}{g^2}$ |
| Règle de la chaîne ? | $(g\circ f)'(x)=g'(f(x))f'(x)$ |
| Dérivée de $(2x+1)^4$ ? | $8(2x+1)^3$ |
| Comment calcule-t-on une partielle ? | **Une variable à la fois**, les autres **constantes** |
| Taille du gradient de $f:\mathbb R^n\to\mathbb R$ ? | $1\times n$ — un **VECTEUR LIGNE** |
| Les deux raisons du vecteur ligne ? | Généralisation **cohérente** aux fonctions vectorielles · application **immédiate** de la chaîne |
| Autres noms du gradient ? | $\nabla_xf$, $\operatorname{grad}f$, $df/dx$, la **jacobienne** |
| Chaîne multivariée ? | $\dfrac{\partial}{\partial x}g(f(x))=\dfrac{\partial g}{\partial f}\dfrac{\partial f}{\partial x}$ |
| Le mnémonique ? | Les **dimensions voisines** correspondent, $\partial f$ « s'annule » |
| La réserve du livre ? | *« Ce n'est qu'une intuition »* — $\partial f/\partial x$ **n'est pas une fraction** |
| Gradient de l'exemple 5.7 ? | $\begin{bmatrix}2x_1x_2+x_2^3&x_1^2+3x_1x_2^2\end{bmatrix}$ |
| Résultat de l'exemple 5.8 ? | $2\sin t(\cos t-1)$ |
| Jacobienne ? | La collection des partielles du **premier ordre**, $J(i,j)=\partial f_i/\partial x_j$ |
| Sa taille ? | $m\times n$ : **lignes = SORTIES**, **colonnes = ENTRÉES** |
| Disposition au numérateur ? | $df/dx\in\mathbb R^{m\times n}$ — la disposition au **dénominateur** en est la **transposée** |
| Gradient de $f:\mathbb R^D\to\mathbb R$ ? | Vecteur **ligne** $1\times D$ |
| Gradient de $f:\mathbb R\to\mathbb R^E$ ? | Vecteur **colonne** $E\times1$ |
| Gradient de $f:\mathbb R^D\to\mathbb R^E$ ? | **Matrice** $E\times D$ |
| $\|\det J\|$ ? | Le facteur d'échelle des **AIRES / VOLUMES** |
| Exact ou approché ? | **Exact** si linéaire · approximation **LOCALE** si non linéaire |
| $\|\det J\|$ dans l'exemple du §5.3 ? | $3$ (matrice $\begin{bmatrix}-2&1\\1&1\end{bmatrix}$) |
| Où le déterminant jacobien resservira-t-il ? | **§6.7** — transformation de variables aléatoires, **reparamétrisation** |
| $d(Ax)/dx$ ? | $A$ |
| Le protocole du livre avant tout calcul ? | **Déterminer la DIMENSION du gradient** |
| $\partial L/\partial\theta$ pour $L=\lVert y-\Phi\theta\rVert^2$ ? | $-2e^\top\Phi=-2(y^\top-\theta^\top\Phi^\top)\Phi\in\mathbb R^{1\times D}$ |
| $\partial L/\partial e$ pour $L=\lVert e\rVert^2$ ? | $2e^\top\in\mathbb R^{1\times N}$ |
| Gradient d'une matrice relativement à une matrice ? | Un **TENSEUR** $(m\times n)\times(p\times q)$ |
| L'astuce du livre ? | **Aplatir** : $\mathbb R^{m\times n}$ est isomorphe à $\mathbb R^{mn}$ |
| Pourquoi ? | La chaîne redevient une **simple multiplication matricielle** |
| Le facteur $2$ de l'exemple 5.13 ? | Quand $p=q$, la variable $R_{iq}$ apparaît **deux fois** dans $K_{pp}=\sum_m R_{mp}^2$ |
| $\dfrac{\partial}{\partial X}\operatorname{tr}(f(X))$ ? | $\operatorname{tr}\left(\dfrac{\partial f(X)}{\partial X}\right)$ |
| $\dfrac{\partial}{\partial X}\det(f(X))$ ? | $\det(f(X))\operatorname{tr}\left(f(X)^{-1}\dfrac{\partial f(X)}{\partial X}\right)$ |
| $\dfrac{\partial}{\partial X}f(X)^{-1}$ ? | $-f(X)^{-1}\dfrac{\partial f(X)}{\partial X}f(X)^{-1}$ |
| $\dfrac{\partial x^\top a}{\partial x}$ ? | $a^\top$ |
| $\dfrac{\partial a^\top Xb}{\partial X}$ ? | $ab^\top$ |
| $\dfrac{\partial x^\top Bx}{\partial x}$ ? | $x^\top(B+B^\top)$ — **pas** $2x^\top B$ |
| $\dfrac{\partial}{\partial s}(x-As)^\top W(x-As)$ ? | $-2(x-As)^\top WA$ pour $W$ **SYMÉTRIQUE** |
| Trace d'un tenseur $D\times D\times E\times F$ ? | Une matrice $E\times F$ — une **contraction tensorielle** |
| « Transposer » un tenseur ? | **Échanger les deux premières dimensions** |
| Composition d'un réseau profond ? | $y=(f_K\circ\dots\circ f_1)(x)$, $f_i=\sigma(A_{i-1}f_{i-1}+b_{i-1})$ |
| Trois fonctions d'activation ? | **Sigmoïde** $\frac{1}{1+e^{-x}}$ · **tanh** · **ReLU** |
| La perte quadratique ? | $L(\theta)=\lVert y-f_K(\theta,x)\rVert^2$ |
| $\partial L/\partial\theta_i$ ? | $\dfrac{\partial L}{\partial f_K}\dfrac{\partial f_K}{\partial f_{K-1}}\cdots\dfrac{\partial f_{i+1}}{\partial\theta_i}$ |
| L'idée-clé de la rétropropagation ? | **RÉUTILISER** les calculs déjà faits pour la couche $i+1$ |
| Les auteurs cités ? | **Kelley (1960), Bryson (1961), Dreyfus (1962), Rumelhart et al. (1986)** |
| Différentiation automatique ? | Évaluation **numérique** du gradient **EXACT** (à la précision machine) via variables intermédiaires + chaîne |
| Elle diffère de ? | La différentiation **symbolique** et les **différences finies** |
| Mode inverse ? | Les gradients remontent **à rebours** du flot des données — c'est la **rétropropagation** |
| Mode direct ? | Les gradients suivent les données de gauche à droite |
| Quand le mode inverse gagne-t-il ? | Quand la dimension d'**entrée est bien plus grande** que celle de la sortie |
| Sur quoi repose le choix de mode ? | L'**ASSOCIATIVITÉ** du produit matriciel |
| Les six variables de l'exemple 5.14 ? | $a=x^2$, $b=\exp(a)$, $c=a+b$, $d=\sqrt c$, $e=\cos(c)$, $f=d+e$ |
| L'observation contre-intuitive ? | Le calcul du gradient est de **complexité SIMILAIRE** à celui de la fonction |
| Propagation avant, formule générale ? | $x_i=g_i(x_{\operatorname{Pa}(x_i)})$ pour $i=d+1,\dots,D$ |
| Rétropropagation, formule générale ? | $\dfrac{\partial f}{\partial x_i}=\sum_{j:\,x_i\in\operatorname{Pa}(x_j)}\dfrac{\partial f}{\partial x_j}\dfrac{\partial x_j}{\partial x_i}$ |
| Initialisation de la remontée ? | $\partial f/\partial x_D=1$ |
| Les limites de la diff. automatique ? | **Boucles for**, **instructions if**, fonctions élémentaires non différentiables |
| $\dfrac{\partial^2f}{\partial y\,\partial x}$ signifie ? | D'abord relativement à **$x$**, PUIS à **$y$** |
| Quand l'ordre n'importe-t-il pas ? | Si $f$ est **deux fois (continûment) différentiable** |
| Hessienne ? | La collection de **toutes** les partielles du **SECOND ordre**, notée $\nabla^2f$ |
| Sa taille ? | $n\times n$ pour $f:\mathbb R^n\to\mathbb R$ ; un **tenseur** $(m\times n\times n)$ pour un champ de vecteurs |
| Que mesure-t-elle ? | La **COURBURE** locale |
| Où sert-elle ? | La **méthode de NEWTON** pour l'optimisation |
| Linéarisation ? | $f(x)\approx f(x_0)+(\nabla_xf)(x_0)(x-x_0)$ |
| Série de Taylor multivariée ? | $f(x)=\sum_{k=0}^{\infty}\dfrac{D_x^kf(x_0)}{k!}\delta^k$ avec $\delta:=x-x_0$ |
| Qu'est-ce que $\delta^k$ ? | Le **produit EXTÉRIEUR** $k$-uple : $\delta^2=\delta\delta^\top$, $\delta^3[i,j,k]=\delta_i\delta_j\delta_k$ |
| Terme $k=1$ ? | $\nabla_xf(x_0)\,\delta$ — produit $(1\times D)(D\times1)$ |
| Terme $k=2$ ? | $\dfrac12\delta^\top H(x_0)\delta=\dfrac12\operatorname{tr}(H\delta\delta^\top)$ |
| Ordre des polynômes dans le terme $k$ ? | **Exactement $k$** |
| $f(1,2)$ dans l'exemple 5.15 ? | $13$ |
| Gradient en $(1,2)$ ? | $\begin{bmatrix}6&14\end{bmatrix}$ |
| Hessienne en $(1,2)$ ? | $\begin{bmatrix}2&2\\2&12\end{bmatrix}$ |
| Seule dérivée troisième non nulle ? | $\partial^3f/\partial y^3=6$ |
| Le développement complet ? | $13+6(x-1)+14(y-2)+(x-1)^2+2(x-1)(y-2)+6(y-2)^2+(y-2)^3$ |
| Est-il exact ? | **OUI, globalement** — car $f$ est un polynôme de degré 3 |
