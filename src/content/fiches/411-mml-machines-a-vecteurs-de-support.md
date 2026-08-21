# Fiche 411 — Classification par machines à vecteurs de support : marge, dualité, noyaux

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 12 « Classification with Support Vector Machines » (p. 370-396) |
| **Difficulté** | Avancé — le **quatrième et dernier pilier**, et le point de convergence de tout le livre |
| **Temps d'étude estimé** | 140 min |
| **Prérequis** | Fiche 401 (hyperplan affine) · Fiche 402 (produit intérieur, projection orthogonale) · Fiche 406 (Lagrange, dualité, programmation quadratique) · Fiche 407 (minimisation du risque empirique) |
| **Concepts clés** | Classification binaire, hyperplan séparateur, vecteur normal, règle de décision, marge, SVM à marge dure, échelle de la marge, théorème 12.1, SVM à marge souple, variable d'écart, paramètre de régularisation $C$, perte $0$-$1$, perte charnière, sous-gradient, SVM dual, multiplicateurs $\alpha$ et $\gamma$, théorème du représentant, vecteurs de support, contraintes de boîte, enveloppe convexe, noyau, application d'attributs canonique, astuce du noyau, matrice de Gram, programmation quadratique |
| **Poids à l'examen** | $y_n(\langle w,x_n\rangle+b)\geqslant1$ · $r=\frac{1}{\lVert w\rVert}$ · la **marge dure** $\min\frac12\lVert w\rVert^2$ · la **marge souple** avec $C\sum_n\xi_n$ · la **perte CHARNIÈRE** $\max\{0,1-t\}$ · le **DUAL** et ses **contraintes de boîte** · le **THÉORÈME DU REPRÉSENTANT** $w=\sum_n\alpha_ny_nx_n$ · l'**astuce du noyau**. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : classer en RAISONNANT GÉOMÉTRIQUEMENT

  §12.1 HYPERPLAN SÉPARATEUR    f(x) = ⟨w, x⟩ + b ,  hyperplan = {x : f(x) = 0}
        ⚠️ w est le VECTEUR NORMAL — orthogonal à tout vecteur de l'hyperplan
        RÈGLE  ⟨w,xn⟩+b ≥ 0 si yn = +1  ·  < 0 si yn = −1   →   yn(⟨w,xn⟩+b) ≥ 0
  §12.2 SVM PRIMAL
        MARGE = distance de l'hyperplan aux exemples LES PLUS PROCHES
        ⚠️ il faut CHOISIR UNE ÉCHELLE — deux conventions ÉQUIVALENTES :
           (a) ‖w‖ = 1  →  max r  s.c. yn(⟨w,xn⟩+b) ≥ r
           (b) marge = 1 →  min ½‖w‖²  s.c. yn(⟨w,xn⟩+b) ≥ 1        (Th. 12.1)
        car  ⚠️ r = 1/‖w‖
        MARGE SOUPLE  min ½‖w‖² + C Σn ξn   s.c. yn(⟨w,xn⟩+b) ≥ 1 − ξn ,  ξn ≥ 0
              ⚠️ GRAND C = FAIBLE régularisation
        VUE PERTE   min ½‖w‖² + C Σn max{0, 1 − yn f(xn)}     ← PERTE CHARNIÈRE
              ⚠️ la MARGE EST le RÉGULARISATEUR
  §12.3 SVM DUAL      (Lagrange : α pour la marge, γ pour ξn ≥ 0)
        min_α  ½ ΣiΣj yi yj αi αj ⟨xi,xj⟩ − Σi αi
        s.c.   Σi yi αi = 0    et    0 ≤ αi ≤ C          ← CONTRAINTES DE BOÎTE
        THÉORÈME DU REPRÉSENTANT   w* = Σn αn yn xn
        ⚠️ les xn avec αn > 0 sont les VECTEURS DE SUPPORT — les seuls qui comptent
        b* = yn − ⟨w*, xn⟩  pour un xn exactement sur la marge (0 < αn < C)
        VUE ENVELOPPE CONVEXE : l'hyperplan BISSECTE le segment entre les deux enveloppes
  §12.4 NOYAUX     ⚠️ le dual ne contient QUE des produits intérieurs ⟨xi, xj⟩
        k(xi, xj) = ⟨φ(xi), φ(xj)⟩_H         ← ASTUCE DU NOYAU
        MATRICE DE GRAM K, SYMÉTRIQUE SEMI-DÉFINIE POSITIVE
        ⚠️ la frontière devient NON LINÉAIRE, mais on résout TOUJOURS un hyperplan
  §12.5 RÉSOLUTION NUMÉRIQUE
        vue perte → SOUS-GRADIENT (la charnière n'est pas différentiable en t = 1)
        primal et dual → PROGRAMMES QUADRATIQUES CONVEXES

LA DIFFÉRENCE DE PHILOSOPHIE AVEC LE CHAPITRE 9
  Vraisemblance max : on part d'un MODÈLE PROBABILISTE, on en dérive une optimisation.
  SVM              : on CONÇOIT D'ABORD une fonction à optimiser, par INTUITION GÉOMÉTRIQUE.
```

> **Les deux raisons du choix des SVM par les auteurs.** *« Premièrement, le SVM permet une **façon GÉOMÉTRIQUE de penser** l'apprentissage supervisé... il s'appuie fortement sur les **produits intérieurs et les PROJECTIONS** (ch. 3). Deuxièmement, contrairement au chapitre 9, **le problème d'optimisation du SVM N'ADMET PAS de solution ANALYTIQUE** : il faut recourir à la variété d'outils d'optimisation du chapitre 7. »*

## 🟠 Concept 1 — Classification binaire et hyperplan séparateur (§12.1)

**Le cadre.** Un prédicteur $f:\mathbb R^D\to\{+1,-1\}$, à partir de paires exemple-étiquette $\{(x_1,y_1),\dots,(x_N,y_N)\}$.

> ⚠️ **Une mise en garde sur les signes.** *« Il faut prendre garde à **ne PAS inférer des attributs intuitifs de "positivité"** de la classe $+1$. Par exemple, dans une tâche de détection de cancer, **un patient ATTEINT est souvent étiqueté $+1$**. »* En principe, deux valeurs distinctes quelconques conviennent : $\{$vrai, faux$\}$, $\{0,1\}$, $\{$rouge, bleu$\}$. *« Pour les modèles PROBABILISTES, il est mathématiquement commode d'utiliser $\{0,1\}$. »*

**L'hyperplan.**

$$f:\mathbb R^D\to\mathbb R,\qquad x\mapsto f(x):=\langle w,x\rangle+b$$

$$\boxed{\;\text{L'hyperplan séparateur}=\{x\in\mathbb R^D:f(x)=0\}\;}$$

paramétré par $w\in\mathbb R^D$ (le **vecteur NORMAL**) et $b\in\mathbb R$ (l'**ordonnée à l'origine**).

**La preuve que $w$ est normal.** Pour deux exemples $x_a,x_b$ **sur** l'hyperplan :

$$f(x_a)-f(x_b)=\langle w,x_a\rangle+b-\big(\langle w,x_b\rangle+b\big)=\langle w,\ x_a-x_b\rangle$$

Comme $f(x_a)=f(x_b)=0$, on obtient $\langle w,x_a-x_b\rangle=0$. *« $w$ est **orthogonal à TOUT vecteur DE l'hyperplan**. »*

<details><summary>Vérification numérique de l'orthogonalité</summary>

Avec $w=[2;-1;0{,}5]$, $b=-1$, et deux points construits sur l'hyperplan :

$$f(x_a)=0{,}0\qquad f(x_b)=0{,}0\qquad\langle w,\ x_a-x_b\rangle=0{,}0$$

⚠️ **Exactement zéro** — la démonstration en deux lignes du livre est confirmée.

</details>

> ⚠️ **La remarque sur les deux natures de vecteur.** *« Dans ce chapitre, on pense au vecteur de paramètres $w$ comme à une **FLÈCHE indiquant une DIRECTION** — un **vecteur GÉOMÉTRIQUE**. En revanche, on pense au vecteur d'exemple $x$ comme à un **POINT de donnée** — les **COORDONNÉES** d'un vecteur dans la base standard. »*

**La règle de décision, en trois écritures :**

$$\langle w,x_n\rangle+b\geqslant0\ \text{ si }y_n=+1\qquad\langle w,x_n\rangle+b<0\ \text{ si }y_n=-1$$

$$\boxed{\;y_n\big(\langle w,x_n\rangle+b\big)\geqslant0\;}$$

*« Les deux conditions sont souvent présentées en **UNE SEULE équation** »* — on multiplie chacune par $y_n=\pm1$.

## 🔴 Concept 2 — Le SVM primal : la marge (§12.2)

### 2.1 Pourquoi la marge

> **Le problème.** *« Pour un jeu **linéairement séparable**, on a une **INFINITÉ d'hyperplans candidats** (figure 12.3). Pour trouver une solution **UNIQUE**, une idée est de choisir l'hyperplan séparateur qui **MAXIMISE la MARGE** entre exemples positifs et négatifs. »*

> **La justification théorique.** *« Un classifieur à **GRANDE MARGE** se révèle **BIEN GÉNÉRALISER** »* (Steinwart & Christmann, 2008).

> **La marge.** *« La **DISTANCE de l'hyperplan séparateur aux exemples LES PLUS PROCHES** du jeu de données, en supposant celui-ci linéairement séparable. »* Le point le plus proche de l'hyperplan s'obtient par **PROJECTION ORTHOGONALE** (§3.8).

> ⚠️ **LE PIÈGE TECHNIQUE, signalé explicitement.** *« En essayant de formaliser cette distance, il y a une **SUBTILITÉ TECHNIQUE qui peut prêter à confusion** : il faut définir **UNE ÉCHELLE à laquelle mesurer la distance**. Une échelle possible serait celle des données, c'est-à-dire les valeurs brutes de $x_n$. **Il y a des problèmes avec cela** : on pourrait **CHANGER LES UNITÉS de mesure** de $x_n$, changer ses valeurs et donc **changer la distance** à l'hyperplan. On définit l'échelle **à partir de l'ÉQUATION DE L'HYPERPLAN elle-même**. »*

### 2.2 Première convention : $\lVert w\rVert=1$

Par **addition vectorielle** (§2.4), avec $x_a'$ la projection orthogonale de $x_a$ :

$$\boxed{\;x_a=x_a'+r\,\frac{w}{\lVert w\rVert}\;}$$

⚠️ *« Une autre façon de penser à $r$ : c'est **LA COORDONNÉE de $x_a$ dans le sous-espace engendré par $w/\lVert w\rVert$**. »*

En imposant $\lVert w\rVert=1$ — *« puisque seule la DIRECTION nous intéresse »*, et *« cela permet une interprétation plus intuitive de $r$, qui est alors le **facteur d'échelle d'un vecteur de longueur 1** »* :

$$\boxed{\;\max_{w,b,r}\ \underbrace{r}_{\text{marge}}\quad\text{s.c.}\quad\underbrace{y_n(\langle w,x_n\rangle+b)\geqslant r}_{\text{ajustement aux données}},\quad\underbrace{\lVert w\rVert=1}_{\text{normalisation}},\quad r>0\;}$$

### 2.3 Seconde convention : la marge vaut 1

> **Le changement d'hypothèse.** *« Au lieu de choisir que le vecteur de paramètres est **NORMALISÉ**, on choisit une **ÉCHELLE POUR LES DONNÉES** : telle que la valeur du prédicteur $\langle w,x\rangle+b$ **vaille 1 à l'exemple le plus proche**. »*

**La dérivation de $r$.** Comme $x_a'$ est sur l'hyperplan, $\langle w,x_a'\rangle+b=0$. En substituant $x_a'=x_a-r\frac{w}{\lVert w\rVert}$ :

$$\left\langle w,\ x_a-r\frac{w}{\lVert w\rVert}\right\rangle+b=0\ \overset{\text{bilinéarité}}{\Longrightarrow}\ \underbrace{\langle w,x_a\rangle+b}_{=1\text{ par hypothèse d'échelle}}-\underbrace{r\frac{\langle w,w\rangle}{\lVert w\rVert}}_{=r\lVert w\rVert}=0$$

$$\boxed{\;r=\frac{1}{\lVert w\rVert}\;}$$

> ⚠️ **La remarque du livre sur le caractère contre-intuitif.** *« À première vue cette équation est **contre-intuitive**, car on semble avoir dérivé la distance en termes de la **LONGUEUR du vecteur $w$**, qu'on **ne connaît pas encore**. Une façon d'y penser : considérer $r$ comme une **VARIABLE TEMPORAIRE** qui ne sert qu'à cette dérivation. »*
>
> On peut aussi *« penser à la distance comme à l'**ERREUR DE PROJECTION** encourue en projetant $x_a$ sur l'hyperplan »*.

<details class="details--riche">
<summary>

Vérification numérique de $r=1/\lVert w\rVert$

</summary>

Avec $w=[2;-1;0{,}5]$, $b=-1$ et $x_a$ construit tel que $\langle w,x_a\rangle+b=1$ :

| Quantité | Valeur |
|---|---|
| $\langle w,x_a\rangle+b$ | $1{,}0$ |
| $\langle w,x_a'\rangle+b$ (projection) | $0{,}0$ |
| $\lVert x_a-x_a'\rVert$ | $0{,}4364357805$ |
| $1/\lVert w\rVert$ | $0{,}4364357805$ |

⚠️ **Écart : $5{,}6\cdot10^{-17}$** — l'identité est exacte.

</details>

**Le SVM à MARGE DURE :**

$$\max_{w,b}\ \frac{1}{\lVert w\rVert}\quad\text{s.c.}\quad y_n(\langle w,x_n\rangle+b)\geqslant1$$

$$\boxed{\;\min_{w,b}\ \frac12\lVert w\rVert^2\quad\text{s.c.}\quad y_n\big(\langle w,x_n\rangle+b\big)\geqslant1\quad\text{pour tout }n\;}$$

> **Trois justifications de cette forme.** (i) On **minimise le carré** plutôt que de maximiser l'inverse. (ii) On inclut le facteur $\frac12$ *« qui **n'affecte pas** le $w,b$ optimal mais donne une forme **plus propre** quand on calcule le gradient »*. (iii) *« La norme au carré donne un **problème de PROGRAMMATION QUADRATIQUE CONVEXE** »* (§12.5).

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi « DURE ».</span>

⚠️ *« Parce que la formulation **N'AUTORISE AUCUNE violation** de la condition de marge. »*

</div>

### 2.4 L'équivalence — Théorème 12.1

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 12.1.</span>

Maximiser la marge $r$ avec **poids normalisés**

$$\max_{w,b,r}\ r\quad\text{s.c.}\quad y_n(\langle w,x_n\rangle+b)\geqslant r,\quad\lVert w\rVert=1,\quad r>0$$

**est ÉQUIVALENT à** mettre les données à l'échelle telle que **la marge vaille l'unité** :

$$\min_{w,b}\ \frac12\lVert w\rVert^2\quad\text{s.c.}\quad y_n(\langle w,x_n\rangle+b)\geqslant1$$

</div>

**Les trois pas de la preuve :**

1. *« Le **CARRÉ est une transformation strictement monotone** pour des arguments non négatifs : le maximum reste le même si l'on considère $r^2$. »*
2. *« Puisque $\lVert w\rVert=1$, on peut **REPARAMÉTRISER** avec un nouveau vecteur $w'$ **non normalisé** en utilisant explicitement $\frac{w'}{\lVert w'\rVert}$. »*
3. *« $r$ est **strictement positif** (on a supposé la séparabilité linéaire), donc on peut **DIVISER la première contrainte par $r$** »* — ce qui donne $\lVert w'\rVert=1/r$ et transforme le max en min.

<details><summary>Vérification de l'équivalence sur un jeu séparable</summary>

Sur 8 points de $\mathbb R^2$ (4 positifs, 4 négatifs, linéairement séparables), recherche exhaustive sur $3\,600$ directions unitaires :

**Formulation (a), $\lVert w\rVert=1$** : $r^*=2{,}49999965$, $w=[0{,}799685\ ;\ 0{,}600420]$, $b=-0{,}300210$

**Formulation (b)**, en posant $w'=w/r$ et $b'=b/r$ :

| Contrôle | Valeur |
|---|---|
| $w'$ | $[0{,}319874\ ;\ 0{,}240168]$ |
| $\lVert w'\rVert$ | $0{,}40000006$ |
| $1/r^*$ | $0{,}40000006$ |
| $\min_ny_n(\langle w',x_n\rangle+b')$ | **$1{,}00000000$** |
| $\frac12\lVert w'\rVert^2$ | $0{,}08000002$ |

⚠️ **La contrainte devient exactement $\geqslant1$** et $\lVert w'\rVert=1/r$ : les deux formulations décrivent **le même hyperplan**.

</details>

## 🔴 Concept 3 — La marge souple (§12.2.4-12.2.5)

### 3.1 La vue géométrique

> **Le besoin.** *« Quand les données **ne sont PAS linéairement séparables**, on peut vouloir permettre à certains exemples de tomber **DANS la région de marge**, ou même **du MAUVAIS CÔTÉ** de l'hyperplan. »*

> **L'idée clé.** *« Introduire une **VARIABLE D'ÉCART** (*slack variable*) $\xi_n$ pour **chaque** paire $(x_n,y_n)$. On **SOUSTRAIT $\xi_n$ de la marge**, en contraignant $\xi_n$ à être **non négative**. Pour **encourager la classification correcte**, on **AJOUTE $\xi_n$ à l'objectif**. »*

$$\boxed{\;\min_{w,b,\xi}\ \frac12\lVert w\rVert^2+C\sum_{n=1}^{N}\xi_n\quad\text{s.c.}\quad y_n(\langle w,x_n\rangle+b)\geqslant1-\xi_n,\quad\xi_n\geqslant0\;}$$

> ⚠️ **LE SENS DE $C$, contre-intuitif.** *« Le paramètre $C>0$ **ARBITRE entre la TAILLE de la marge et la quantité totale d'écart**. On l'appelle le **PARAMÈTRE DE RÉGULARISATION** puisque le terme de marge **EST un terme de régularisation**. Le terme $\lVert w\rVert^2$ est le **RÉGULARISATEUR**, et dans beaucoup de livres d'optimisation numérique le paramètre de régularisation **MULTIPLIE CE TERME-LÀ** — c'est en contraste avec notre formulation. Ici, une **GRANDE valeur de $C$ implique une FAIBLE régularisation**, puisqu'on donne **plus de poids aux variables d'écart**, donnant plus de priorité aux exemples qui ne sont pas du bon côté de la marge. »*

⚠️ *« Cette formulation est aussi souvent appelée le **$C$-SVM**. »*

### 3.2 La vue fonction de perte

> **La perspective.** On suit le **principe de MINIMISATION DU RISQUE EMPIRIQUE** (§8.2), avec les **hyperplans comme classe d'hypothèses**. *« On verra que **LA MARGE CORRESPOND AU TERME DE RÉGULARISATION**. Reste la question : quelle est la **fonction de PERTE** ? »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi pas la perte quadratique.</span>

⚠️ *« La perte quadratique utilisée en régression **n'est PAS appropriée** à la classification binaire. »*

</div>

**La perte idéale — et pourquoi on ne l'utilise pas.**

$$\boxed{\;\text{PERTE }0\text{-}1\ :\ \mathbb 1\big(f(x_n)\neq y_n\big)\;}$$

⚠️ *« Malheureusement, la perte $0$-$1$ donne un problème d'**OPTIMISATION COMBINATOIRE** pour trouver les meilleurs $w,b$. Les problèmes combinatoires sont en général **PLUS DIFFICILES à résoudre** que les problèmes continus. »*

**LA PERTE CHARNIÈRE (*hinge loss*) :**

$$\boxed{\;\ell(t)=\max\{0,\ 1-t\}\qquad\text{où}\qquad t=y\,f(x)=y\big(\langle w,x\rangle+b\big)\;}$$

**Sa lecture en trois régimes :**

| Régime | Situation | Perte |
|---|---|---|
| $t\geqslant1$ | Du **bon côté** et **plus loin que la distance 1** | **$0$** |
| $0<t<1$ | Du bon côté mais **DANS la marge** | Positive |
| $t<0$ | Du **MAUVAIS côté** | Encore plus grande, **croissance LINÉAIRE** |

> *« On **PAIE une pénalité dès qu'on est plus proche que la marge**, **MÊME SI la prédiction est CORRECTE**, et la pénalité croît **linéairement**. »*

**L'écriture en deux morceaux linéaires :**

$$\ell(t)=\begin{cases}0&\text{si }t\geqslant1\\1-t&\text{si }t<1\end{cases}\qquad\qquad\underbrace{\ell(t)=\begin{cases}0&\text{si }t\geqslant1\\\infty&\text{si }t<1\end{cases}}_{\text{la perte de la MARGE DURE}}$$

> **La propriété qui justifie tout.** *« La perte charnière est un **MAJORANT CONVEXE de la perte $0$-$1$**. »*

<details class="details--riche">
<summary>

Vérification que la charnière majore la perte $0$-$1$

</summary>

| $t$ | Perte $0$-$1$ | Charnière | Majoration |
|---|---|---|---|
| $-2{,}0$ | $1{,}0$ | $3{,}000$ |  |
| $-0{,}5$ | $1{,}0$ | $1{,}500$ |  |
| $0{,}0$ | $1{,}0$ | $1{,}000$ | (égalité) |
| $0{,}5$ | $0{,}0$ | $0{,}500$ | ( **pénalité alors que la prédiction est CORRECTE**) |
| $1{,}0$ | $0{,}0$ | $0{,}000$ | (égalité) |
| $1{,}5$ | $0{,}0$ | $0{,}000$ |  |
| $3{,}0$ | $0{,}0$ | $0{,}000$ |  |

⚠️ La ligne $t=0{,}5$ montre l'essentiel : la charnière **pénalise une prédiction correcte mais peu confiante** — c'est ce qui **crée** la marge.

</details>

**Le problème SANS contraintes :**

$$\boxed{\;\min_{w,b}\ \underbrace{\frac12\lVert w\rVert^2}_{\text{RÉGULARISATEUR}}+C\sum_{n=1}^{N}\underbrace{\max\big\{0,\ 1-y_n(\langle w,x_n\rangle+b)\big\}}_{\text{PERTE}}\;}$$

> **LA LECTURE.** *« Le terme $\frac12\lVert w\rVert^2$ **provient DIRECTEMENT de la MARGE**. Autrement dit, **la MAXIMISATION de la MARGE peut être interprétée comme une RÉGULARISATION**. »*

**L'équivalence avec la forme contrainte** — le pas de traduction :

$$\min_t\max\{0,1-t\}\qquad\Longleftrightarrow\qquad\min_{\xi,t}\ \xi\quad\text{s.c.}\quad\xi\geqslant0,\ \ \xi\geqslant1-t$$

⚠️ *« En substituant cette expression et en réarrangeant une des contraintes, on obtient **EXACTEMENT le SVM à marge souple**. »*

## 🔴 Concept 4 — Le SVM dual (§12.3)

### 4.1 Pourquoi le dual

> **Le problème de dimension.** *« Puisque $w$ est de la **même dimension que $x$**, le nombre de paramètres **croît LINÉAIREMENT avec le nombre d'ATTRIBUTS**. »*

> **Les trois avantages du dual.**
>
> 1. Il est **INDÉPENDANT du nombre d'ATTRIBUTS** ; le nombre de paramètres croît avec le **nombre d'EXEMPLES**.
> 2. *« Utile pour les problèmes où l'on a **plus d'attributs que d'exemples**. »*
> 3. *« Il permet **FACILEMENT d'appliquer les NOYAUX**. »*

### 4.2 La dérivation

⚠️ **Deux multiplicateurs**, avec la notation usuelle de la littérature SVM (et non $\lambda$) :

| Multiplicateur | Contrainte associée |
|---|---|
| $\alpha_n\geqslant0$ | La classification correcte : $y_n(\langle w,x_n\rangle+b)\geqslant1-\xi_n$ |
| $\gamma_n\geqslant0$ | La non-négativité de l'écart : $\xi_n\geqslant0$ |

$$\mathfrak L(w,b,\xi,\alpha,\gamma)=\frac12\lVert w\rVert^2+C\sum_n\xi_n-\sum_n\alpha_n\big(y_n(\langle w,x_n\rangle+b)-1+\xi_n\big)-\sum_n\gamma_n\xi_n$$

**Les trois dérivées, annulées :**

$$\frac{\partial\mathfrak L}{\partial w}=w^\top-\sum_n\alpha_ny_nx_n^\top=0\quad\Longrightarrow\quad\boxed{\;w=\sum_{n=1}^{N}\alpha_ny_nx_n\;}$$

$$\frac{\partial\mathfrak L}{\partial b}=-\sum_n\alpha_ny_n=0\quad\Longrightarrow\quad\boxed{\;\sum_{n=1}^{N}y_n\alpha_n=0\;}$$

$$\frac{\partial\mathfrak L}{\partial\xi_n}=C-\alpha_n-\gamma_n=0\quad\overset{\gamma_n\geqslant0}{\Longrightarrow}\quad\boxed{\;\alpha_n\leqslant C\;}$$

> **LE THÉORÈME DU REPRÉSENTANT.** La première équation dit que **$w$ est une COMBINAISON LINÉAIRE DES DONNÉES**. C'est la clé qui rend les noyaux possibles.

**Le dual obtenu :**

$$\boxed{\;\min_\alpha\ \frac12\sum_{i=1}^{N}\sum_{j=1}^{N}y_iy_j\alpha_i\alpha_j\langle x_i,x_j\rangle-\sum_{i=1}^{N}\alpha_i\;}$$

$$\boxed{\;\text{s.c.}\quad\sum_{i=1}^{N}y_i\alpha_i=0\quad\text{et}\quad0\leqslant\alpha_i\leqslant C\;}$$

⚠️ *« On **MAXIMISE le problème dual**, ce qui **équivaut à MINIMISER le dual NÉGATIF** — d'où la forme ci-dessus. »*

> **Les CONTRAINTES DE BOÎTE.** *« Ces inégalités sont appelées "**contraintes de BOÎTE**" parce qu'elles limitent le vecteur $\alpha\in\mathbb R^N$ à être **dans la boîte définie par $0$ et $C$ sur chaque axe**. Ces boîtes **alignées sur les axes** sont **particulièrement efficaces** à implémenter dans les solveurs numériques »* (Dostál, 2009).

### 4.3 Récupérer les paramètres primaux

$$w^*=\sum_n\alpha_ny_nx_n$$

Pour $b^*$ : *« considérer un exemple $x_n$ qui se trouve **EXACTEMENT sur la frontière de la marge** »*, c'est-à-dire $\langle w^*,x_n\rangle+b=y_n$ :

$$\boxed{\;b^*=y_n-\langle w^*,x_n\rangle\;}$$

> ⚠️ **Le cas où aucun exemple n'est exactement sur la marge.** *« En principe, il peut n'y avoir **aucun** exemple exactement sur la marge. Dans ce cas, on devrait calculer $|y_n-\langle w^*,x_n\rangle|$ pour **tous les vecteurs de support** et prendre la **MÉDIANE** de cette différence absolue. »*

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment reconnaître ces exemples.</span>

*« Les exemples qui se trouvent exactement sur la marge sont ceux dont les paramètres duaux sont **STRICTEMENT à l'INTÉRIEUR** des contraintes de boîte : $0<\alpha_i<C$. Cela se dérive des conditions de **KARUSH-KUHN-TUCKER**. »*

</div>

<details><summary>Résolution complète du dual par SMO et retour au primal</summary>

Sur le même jeu de 8 points, dual à marge dure ($C$ très grand), résolu par **mises à jour par PAIRES** (SMO simplifié — ce qui préserve exactement $\sum_iy_i\alpha_i=0$) :

$$\alpha=[0{,}08\ ;\ 0\ ;\ 0\ ;\ 0\ ;\ 0{,}08\ ;\ 0\ ;\ 0\ ;\ 0]$$

| Contrôle | Valeur |
|---|---|
| $\sum_iy_i\alpha_i$ | $0{,}000000000000$ |
| Objectif dual | $-0{,}08000000$ |
| **Vecteurs de support** | **indices 0 et 4 seulement** : $[2;2]$ ($y=+1$) et $[-2;-1]$ ($y=-1$) |
| Les **6 autres** | $\alpha=0$ — **ils n'influencent PAS la solution** |
| $w^*=\sum\alpha_ny_nx_n$ | $[0{,}320000\ ;\ 0{,}240000]$ |
| $b^*$ | $-0{,}120000$ |
| $\lVert w^*\rVert$ | $0{,}400000$ |
| Marge $1/\lVert w^*\rVert$ | **$2{,}500000$** |
| $y_n(\langle w^*,x_n\rangle+b^*)$ aux deux SV | $1{,}00000000$ et $1{,}00000000$ |

**LA DUALITÉ FORTE, vérifiée numériquement** — comparaison avec la recherche exhaustive du primal :

|  | $w$ | $b$ | Marge |
|---|---|---|---|
| **Primal** (grille de $3\,600$ directions) | $[0{,}319874\ ;\ 0{,}240168]$ | $-0{,}120084$ | $2{,}500000$ |
| **Dual** (SMO) | $[0{,}320000\ ;\ 0{,}240000]$ | $-0{,}120000$ | $2{,}500000$ |

⚠️ **Écart relatif sur $w$ : $5\cdot10^{-4}$** — imputable à la résolution de $0{,}1^\circ$ de la grille du primal. Et l'objectif dual $-0{,}08$ est **exactement l'opposé** du primal $\frac12\lVert w\rVert^2=\frac12(0{,}4)^2=0{,}08$ : **les deux problèmes ont la même valeur optimale** (dualité forte, §7.3).

</details>

### 4.4 La vue enveloppe convexe

> **L'idée.** *« Considérer l'ensemble des exemples de même étiquette et construire un **ENSEMBLE CONVEXE les contenant tous, LE PLUS PETIT possible** — c'est l'**ENVELOPPE CONVEXE**. »*

**La construction, en montant en dimension :**

| Points | Objet engendré |
|---|---|
| $x_1,x_2$ avec $\alpha_1+\alpha_2=1$, $\alpha_i\geqslant0$ | *« Chaque point sur **une LIGNE** entre $x_1$ et $x_2$ »* |
| $x_1,x_2,x_3$ | *« Une **AIRE bidimensionnelle** ; l'enveloppe est le **TRIANGLE** formé par les arêtes »* |
| Plus de points que de dimensions | *« **Certains points seront À L'INTÉRIEUR** de l'enveloppe »* |

$$\boxed{\;\operatorname{conv}(X)=\left\{\sum_{n=1}^{N}\alpha_nx_n\ :\ \sum_{n=1}^{N}\alpha_n=1\ \text{ et }\ \alpha_n\geqslant0\right\}\;}$$

> **La troisième interprétation du SVM.** *« Un hyperplan qui **BISSECTE le SEGMENT entre les ENVELOPPES CONVEXES** correspondant aux exemples positifs et négatifs. »*

## 🔴 Concept 5 — Les noyaux (§12.4)

### 5.1 L'observation qui rend tout possible

> ⚠️ **LE POINT DE DÉPART.** *« Remarquer que **le produit intérieur dans l'objectif n'apparaît QU'ENTRE exemples $x_i$ et $x_j$**. Il n'y a **AUCUN produit intérieur entre les exemples et les PARAMÈTRES**. Donc, si l'on considère un ensemble d'attributs $\phi(x_i)$, **le SEUL changement dans le SVM dual sera de REMPLACER le produit intérieur**. »*

> **La modularité.** *« Cette **MODULARITÉ** — où le choix de la **méthode de classification** (le SVM) et le choix de la **représentation d'attributs** $\phi(x)$ peuvent être considérés **SÉPARÉMENT** — offre la flexibilité d'**explorer les deux problèmes INDÉPENDAMMENT**. »*

### 5.2 La définition

> **Un NOYAU** est une fonction $k:\mathcal X\times\mathcal X\to\mathbb R$ *« pour laquelle il **EXISTE un espace de HILBERT $\mathcal H$** et une application d'attributs $\phi:\mathcal X\to\mathcal H$ telle que »*
>
> $$\boxed{\;k(x_i,x_j)=\big\langle\phi(x_i),\ \phi(x_j)\big\rangle_{\mathcal H}\;}$$

*« Au lieu de définir explicitement une application non linéaire $\phi(\cdot)$ **et** de calculer le produit intérieur résultant, on définit une **FONCTION DE SIMILARITÉ** $k(x_i,x_j)$. Pour une certaine classe de fonctions de similarité — les **NOYAUX** — la fonction de similarité **définit IMPLICITEMENT une application d'attributs NON LINÉAIRE**. »*

**Le vocabulaire :**

| Terme | Définition |
|---|---|
| **Application d'attributs CANONIQUE** | $\phi(x)=k(\cdot,x)$ — *« il existe un **espace de Hilbert à noyau REPRODUISANT (RKHS) UNIQUE** associé à chaque noyau »* (Aronszajn, 1950) |
| **ASTUCE DU NOYAU** (*kernel trick*) | La généralisation du produit intérieur à $k$, *« car elle **CACHE l'application non linéaire EXPLICITE** »* |
| **Matrice de GRAM** (ou matrice de noyau) | $K\in\mathbb R^{N\times N}$ résultant de l'application de $k(\cdot,\cdot)$ au jeu de données |

**La condition sur les noyaux :**

$$\boxed{\;\text{Les noyaux doivent être SYMÉTRIQUES et SEMI-DÉFINIS POSITIFS}\ :\ \forall z\in\mathbb R^N,\ z^\top Kz\geqslant0\;}$$

<details><summary>Vérification des deux propriétés de la matrice de Gram</summary>

Avec le noyau linéaire $k(x_i,x_j)=\langle x_i,x_j\rangle$ sur les 8 points :

| Propriété | Test | Résultat |
|---|---|---|
| **Symétrie** | $\max_{i,j}\lvert K_{ij}-K_{ji}\rvert$ | **exactement $0$** |
| **Semi-définie positivité** | $\min z^\top Kz$ sur $20\,000$ tirages gaussiens | $+0{,}000112>0$ |

⚠️ Ce n'est pas un hasard : $K=X^\top X$ est **toujours** symétrique semi-définie positive (théorème 4.14, fiche 403).

</details>

**Les noyaux usuels cités** pour $x_i\in\mathbb R^D$ : le **noyau POLYNOMIAL**, le **noyau GAUSSIEN à base radiale (RBF)**, le **noyau QUADRATIQUE RATIONNEL**.

> ⚠️ **LA MISE EN GARDE ESSENTIELLE.** *« **Note that we are still solving for HYPERPLANES** : la classe d'hypothèses de fonctions **reste LINÉAIRE**. **Les surfaces NON LINÉAIRES sont dues à la FONCTION NOYAU.** »*

> ⚠️ **Les TROIS sens du mot « noyau », signalés par le livre.**
>
> 1. Ici : le **RKHS** (Aronszajn 1950 ; Saitoh 1988).
> 2. En **algèbre linéaire** (§2.7.3) : un **autre mot pour l'ESPACE NUL** (fiche 401).
> 3. En **estimation de densité à noyau** (§11.5) : le **noyau LISSANT**.

> **Le choix du noyau.** *« Le choix du noyau, ainsi que ses paramètres, est souvent fait par **VALIDATION CROISÉE IMBRIQUÉE** (§8.6.1). »* Et : *« un praticien conçoit souvent la fonction noyau de sorte qu'elle puisse être **calculée PLUS EFFICACEMENT** que le produit intérieur entre applications d'attributs explicites. »*

## 🟠 Concept 6 — La résolution numérique (§12.5)

### 6.1 La vue perte : le sous-gradient

> **Le problème.** *« La vue fonction de perte est un problème d'optimisation **CONVEXE SANS contraintes**, mais la **perte charnière N'EST PAS DIFFÉRENTIABLE**. On applique donc une approche par **SOUS-GRADIENT**. »*

⚠️ *« La charnière est différentiable **PRESQUE PARTOUT, sauf en UN SEUL point : la charnière $t=1$**. En ce point, le gradient est un **ENSEMBLE de valeurs possibles entre $0$ et $-1$**. »*

$$\boxed{\;g(t)=\begin{cases}-1&t<1\\ [-1,\ 0]&t=1\\ 0&t>1\end{cases}\;}$$

Avec ce sous-gradient, on applique les **méthodes du §7.1** (descente de gradient, momentum, SGD).

### 6.2 Les programmes quadratiques

> **Le choix stratégique.** *« Le SVM **PRIMAL** a des variables d'optimisation de la taille de la **DIMENSION $D$** des exemples. Le SVM **DUAL** a des variables de la taille du **NOMBRE $N$ d'exemples**. »* — on choisit selon lequel est le plus petit.

**La mise en forme standard du primal** (§7.3.2), avec le produit scalaire :

$$\min_{w,b,\xi}\ \frac12\lVert w\rVert^2+C\sum_n\xi_n\quad\text{s.c.}\quad-y_nx_n^\top w-y_nb-\xi_n\leqslant-1,\quad-\xi_n\leqslant0$$

⚠️ *« En **CONCATÉNANT** les variables $w$, $b$, $\xi_n$ en un **SEUL vecteur** et en collectant soigneusement les termes, on obtient la forme matricielle. »* Les deux problèmes sont des **programmes quadratiques CONVEXES**.

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Montrer que $w$ est normal à l'hyperplan » | **§12.1** | Prendre $x_a,x_b$ sur l'hyperplan, calculer $f(x_a)-f(x_b)=\langle w,x_a-x_b\rangle=0$ |
| « Écrire la règle de décision » | **§12.1** | En **une seule** inégalité : $y_n(\langle w,x_n\rangle+b)\geqslant0$ |
| « Calculer la distance d'un point à l'hyperplan » | **§12.2.1** | **Projection orthogonale** ; $r=\dfrac{\lvert\langle w,x\rangle+b\rvert}{\lVert w\rVert}$ |
| « Pourquoi faut-il fixer une échelle ? » | **§12.2.1** | Changer les **UNITÉS de $x_n$** changerait la distance |
| « Écrire le SVM à marge dure » | **§12.2.2** | $\min\frac12\lVert w\rVert^2$ s.c. $y_n(\langle w,x_n\rangle+b)\geqslant1$ |
| « Montrer l'équivalence des deux formulations » | **Th. 12.1** | Carré monotone · reparamétriser par $w'/\lVert w'\rVert$ · **diviser par $r>0$** |
| « Les données ne sont pas séparables » | **§12.2.4** | **Marge souple** : ajouter $\xi_n\geqslant0$ et $C\sum_n\xi_n$ |
| « Quel est l'effet d'un grand $C$ ? » | **§12.2.4** | **FAIBLE régularisation** — plus de poids aux écarts |
| « Écrire la perte du SVM » | **§12.2.5** | **CHARNIÈRE** : $\max\{0,1-yf(x)\}$ |
| « Pourquoi pas la perte $0$-$1$ ? » | **§12.2.5** | Problème **COMBINATOIRE** |
| « Dériver le dual » | **§12.3.1** | Lagrangien avec $\alpha$ **et** $\gamma$ ; annuler en $w$, $b$, $\xi$ ; substituer |
| « Que valent les contraintes du dual ? » | **§12.3.1** | $\sum_iy_i\alpha_i=0$ (de $\partial b$) et $0\leqslant\alpha_i\leqslant C$ (de $\partial\xi$ plus $\gamma_i\geqslant0$) |
| « Retrouver $w$ à partir de $\alpha$ » | **Représentant** | $w^*=\sum_n\alpha_ny_nx_n$ |
| « Retrouver $b$ » | **§12.3.1** | $b^*=y_n-\langle w^*,x_n\rangle$ pour un $n$ avec $0<\alpha_n<C$ |
| « Identifier les vecteurs de support » | **§12.3.1** | Ceux avec $\alpha_n>0$ ; les autres **n'influencent pas** la solution |
| « Rendre le classifieur non linéaire » | **§12.4** | Remplacer $\langle x_i,x_j\rangle$ par $k(x_i,x_j)$ — **rien d'autre à changer** |
| « Cette fonction est-elle un noyau valide ? » | **§12.4** | **Symétrique** et **semi-définie positive** : $z^\top Kz\geqslant0$ |
| « Comment optimiser la perte charnière ? » | **§12.5** | **SOUS-GRADIENT** (non différentiable en $t=1$) |
| « Primal ou dual ? » | **§12.5** | Primal : $D$ variables. Dual : $N$ variables. **Choisir le plus petit** |

## Comment résoudre : les cinq méthodes pas-à-pas

**Méthode A — Calculer une marge.**

1. Vérifier que les données sont **linéairement séparables**.
2. Choisir une convention d'échelle : $\lVert w\rVert=1$ **ou** marge $=1$.
3. Projeter orthogonalement le point le plus proche : $x_a'=x_a-\frac{\langle w,x_a\rangle+b}{\lVert w\rVert^2}w$.
4. $r=\lVert x_a-x_a'\rVert$.
5. **Contrôle** : $r=\frac{1}{\lVert w\rVert}$ si l'on a normalisé les données ; $r=\frac{\lvert\langle w,x_a\rangle+b\rvert}{\lVert w\rVert}$ en général.

**Méthode B — Passer du primal au dual.**

1. Écrire le lagrangien avec **UN multiplicateur par contrainte** ($\alpha_n$ **et** $\gamma_n$).
2. Dériver par rapport à **chaque** variable primale : $w$, $b$, $\xi$.
3. **Annuler** les trois : on obtient le **représentant**, la contrainte $\sum y_n\alpha_n=0$, et $\alpha_n+\gamma_n=C$.
4. **Substituer** dans le lagrangien ; les termes en $b$ et en $\xi$ **disparaissent**.
5. Traduire « maximiser le dual » en « minimiser son opposé ».
6. **Contrôles** : le dual ne contient **que des produits intérieurs entre exemples** ; les contraintes forment une **boîte**.

**Méthode C — Résoudre le dual et revenir au primal.**

1. Construire la **matrice de Gram** $K_{ij}=\langle x_i,x_j\rangle$ (ou $k(x_i,x_j)$).
2. Résoudre le PQ sous $\sum_iy_i\alpha_i=0$ et $0\leqslant\alpha_i\leqslant C$. Les mises à jour **par PAIRES** préservent la contrainte d'égalité.
3. Identifier les **vecteurs de support** : $\alpha_n>0$.
4. $w^*=\sum_n\alpha_ny_nx_n$.
5. $b^*$ depuis un SV **strictement intérieur** ($0<\alpha_n<C$), ou la **médiane** sinon.
6. **Contrôles** : $\sum_iy_i\alpha_i=0$ ; $y_n(\langle w^*,x_n\rangle+b^*)=1$ aux SV ; objectif dual $=-\frac12\lVert w^*\rVert^2$ (dualité forte).

**Méthode D — Appliquer un noyau.**

1. Vérifier que $k$ est **symétrique**.
2. Vérifier que la matrice de Gram est **semi-définie positive**.
3. Remplacer $\langle x_i,x_j\rangle$ par $k(x_i,x_j)$ **dans le dual** — **rien d'autre à modifier**.
4. **Le prédicteur s'écrit alors** $f(x)=\sum_n\alpha_ny_nk(x_n,x)+b$ — on **n'a jamais besoin de $w$ explicitement**.
5. Choisir noyau et hyperparamètres par **validation croisée imbriquée**.

**Méthode E — Diagnostiquer un SVM entraîné.**

1. Compter les **vecteurs de support** : beaucoup $\Rightarrow$ problème difficile ou $C$ trop petit.
2. Regarder les $\alpha_n=C$ : ce sont les points **dans la marge ou mal classés**.
3. Regarder les $0<\alpha_n<C$ : ceux **exactement sur la marge** — ils donnent $b$.
4. Regarder les $\alpha_n=0$ : **sans influence**, on pourrait les supprimer du jeu.
5. Calculer la marge $1/\lVert w\rVert$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire que la classe $+1$ est « la bonne » | En détection de cancer, **le patient ATTEINT est étiqueté $+1$** |
| Utiliser $\{0,1\}$ dans les formules du SVM | Le SVM exige $\{+1,-1\}$ pour que $y_n(\cdots)\geqslant1$ fonctionne ; $\{0,1\}$ est pour les modèles **probabilistes** |
| Croire que $w$ est un point de données | $w$ est une **FLÈCHE** (vecteur géométrique) ; $x$ est un **POINT** (coordonnées) |
| Mesurer la marge à l'échelle des données | Changer les **UNITÉS** changerait la marge — il faut l'échelle de **l'ÉQUATION de l'hyperplan** |
| Croire les deux conventions différentes | **Théorème 12.1** : elles sont **ÉQUIVALENTES** |
| Oublier $r>0$ dans la preuve du théorème 12.1 | C'est ce qui **autorise la division par $r$** ; garanti par la séparabilité |
| Croire que le $\frac12$ change la solution | Il **n'affecte pas** l'optimum — il rend seulement le gradient plus propre |
| Croire qu'un grand $C$ régularise fort | **L'INVERSE** : grand $C$ = **FAIBLE** régularisation |
| Placer $C$ sur $\lVert w\rVert^2$ | Ici $C$ multiplie **les ÉCARTS** — c'est l'inverse de la convention des livres d'optimisation |
| Oublier $\xi_n\geqslant0$ | Sans elle, on pourrait « gagner » de la marge avec des $\xi$ négatifs |
| Utiliser la perte quadratique | **Inadaptée** à la classification binaire |
| Utiliser la perte $0$-$1$ | Problème **COMBINATOIRE**, beaucoup plus difficile |
| Croire que la charnière ne pénalise que les erreurs | Elle pénalise **DÈS $t<1$**, même quand la prédiction est **correcte** |
| Oublier que la charnière majore la perte $0$-$1$ | C'est un **majorant CONVEXE** — c'est ce qui rend l'optimisation traitable |
| Oublier que la marge **est** la régularisation | $\frac12\lVert w\rVert^2$ **provient de la marge** et **joue le rôle** de régularisateur |
| N'utiliser qu'un multiplicateur dans le dual | Il en faut **DEUX** : $\alpha_n$ **et** $\gamma_n$ |
| Oublier d'où vient $\alpha_i\leqslant C$ | De $C-\alpha_n-\gamma_n=0$ **avec** $\gamma_n\geqslant0$ |
| Oublier la contrainte $\sum_iy_i\alpha_i=0$ | Elle vient de $\partial\mathfrak L/\partial b=0$ ; c'est elle qui impose des mises à jour **par PAIRES** |
| Croire que tous les points contribuent à $w$ | **Seuls les VECTEURS DE SUPPORT** ($\alpha_n>0$) — les autres ont $\alpha_n=0$ |
| Prendre $b$ depuis n'importe quel SV | Il faut $0<\alpha_n<C$ ; sinon **médiane** sur tous les SV |
| Croire que le dual a autant de variables que le primal | Primal : **$D$** (attributs). Dual : **$N$** (exemples) |
| Croire que le noyau rend le modèle non linéaire | *« On résout **TOUJOURS** un hyperplan »* — c'est la **frontière** qui devient non linéaire |
| Confondre les trois sens de « noyau » | **RKHS** (ici) · **espace nul** (algèbre linéaire) · **noyau lissant** (estimation de densité) |
| Utiliser une fonction de similarité arbitraire | Un noyau doit être **symétrique ET semi-défini positif** |
| Calculer $\phi(x)$ explicitement | Tout l'intérêt de **l'astuce du noyau** est de **ne jamais le faire** |
| Appliquer une descente de gradient à la charnière | Elle **n'est pas différentiable en $t=1$** — utiliser le **SOUS-GRADIENT** |
| Croire que la charnière n'est différentiable nulle part | Elle l'est **presque partout**, sauf en **UN point** |

## 📌 Ultimate Review

```
════════ LES HUIT FORMULES À SAVOIR SANS HÉSITER ════════
  1.  HYPERPLAN   {x : ⟨w,x⟩ + b = 0} ,  w = VECTEUR NORMAL
      RÈGLE       yn(⟨w,xn⟩ + b) ≥ 0
  2.  DISTANCE    xa = xa' + r w/‖w‖    →    r = 1/‖w‖
  3.  MARGE DURE  min ½‖w‖²   s.c.  yn(⟨w,xn⟩+b) ≥ 1
  4.  MARGE SOUPLE min ½‖w‖² + C Σn ξn  s.c. yn(⟨w,xn⟩+b) ≥ 1 − ξn , ξn ≥ 0
      ⚠️ GRAND C = FAIBLE régularisation
  5.  PERTE CHARNIÈRE  ℓ(t) = max{0, 1 − t} ,  t = y f(x)
      min ½‖w‖² + C Σn max{0, 1 − yn f(xn)}       ← MARGE = RÉGULARISATEUR
  6.  DUAL   min_α ½ ΣiΣj yi yj αi αj ⟨xi,xj⟩ − Σi αi
             s.c.  Σi yi αi = 0  ,  0 ≤ αi ≤ C     ← BOÎTE
  7.  REPRÉSENTANT   w* = Σn αn yn xn      b* = yn − ⟨w*, xn⟩  (0 < αn < C)
      VECTEURS DE SUPPORT : les xn avec αn > 0
  8.  NOYAU   k(xi,xj) = ⟨φ(xi), φ(xj)⟩_H   ·   K symétrique semi-déf. positive
      PRÉDICTEUR À NOYAU  f(x) = Σn αn yn k(xn, x) + b
═════════════════════════════════════════════════════════
```

**LES TROIS VUES DU MÊME SVM :**

| Vue | Point de départ | Ce qu'elle éclaire |
|---|---|---|
| **GÉOMÉTRIQUE** (§12.2.4) | Variables d'écart $\xi_n$ | L'**intuition** : distance, marge, violations |
| **PERTE** (§12.2.5) | Minimisation du risque empirique | La **marge EST la régularisation** ; connexion au chapitre 8 |
| **ENVELOPPE CONVEXE** (§12.3.2) | Le dual | L'hyperplan **BISSECTE** le segment entre enveloppes |

**PRIMAL contre DUAL :**

|  | **PRIMAL** | **DUAL** |
|---|---|---|
| Variables | $w\in\mathbb R^D$, $b$, $\xi\in\mathbb R^N$ | $\alpha\in\mathbb R^N$ |
| Taille | Croît avec les **ATTRIBUTS** | Croît avec les **EXEMPLES** |
| Contraintes | $2N$ inégalités | $1$ égalité $+$ **boîte** |
| Bon quand | $D<N$ | $D>N$ |
| Noyaux | **Impossible** directement | **Immédiat** |
| Nature | PQ convexe | PQ convexe |

**Les correspondances avec les chapitres antérieurs :**

| Chapitre | Ce qu'il fournit |
|---|---|
| **2** — hyperplan affine | La **définition même** de l'objet à trouver |
| **3** — produit intérieur, projection | La **marge**, le vecteur normal, la distance |
| **4** — matrices SDP | La condition sur la **matrice de Gram** |
| **5** — gradients | Les trois dérivées du lagrangien |
| **7** — Lagrange, dualité, PQ | **Toute la §12.3** ; sous-gradient ; forme standard |
| **8** — risque empirique, régularisation | La **vue perte** ; validation croisée imbriquée |
| **9** — application d'attributs $\phi$ | Le pont vers les **noyaux** |

**Le classement des points par leur $\alpha_n$ :**

| $\alpha_n$ | Position du point | Rôle |
|---|---|---|
| $\alpha_n=0$ | **Au-delà** de la marge, bien classé | **AUCUNE influence** — supprimable |
| $0<\alpha_n<C$ | **Exactement SUR** la marge | Vecteur de support ; **sert à calculer $b$** |
| $\alpha_n=C$ | **Dans** la marge ou **mal classé** | Vecteur de support ; $\xi_n>0$ |

## 🧠 Active Recall

**Hyperplan**

1. Quelle mise en garde le livre donne-t-il sur l'étiquette $+1$ ?
2. Écrire $f$ et définir l'hyperplan séparateur.
3. Démontrer que $w$ est orthogonal à tout vecteur de l'hyperplan.
4. Quelle distinction le livre fait-il entre $w$ et $x$ ?
5. Écrire la règle de décision en une seule inégalité.

**Marge** 6. Pourquoi maximiser la marge ? Que garantit-elle ? 7. Quelle est la subtilité technique de la définition de la marge ? 8. Écrire la décomposition $x_a=x_a'+r\frac{w}{\lVert w\rVert}$ et interpréter $r$. 9. Écrire la formulation avec $\lVert w\rVert=1$. 10. Dériver $r=1/\lVert w\rVert$ sous l'hypothèse d'échelle. 11. Pourquoi cette équation est-elle contre-intuitive ? Comment le livre la justifie-t-il ? 12. Écrire le SVM à marge dure et justifier ses trois choix de forme. 13. Énoncer le théorème 12.1 et donner les trois pas de sa preuve. 14. Pourquoi « dure » ?

**Marge souple** 15. Quel est le besoin ? Quelle est l'idée clé ? 16. Écrire le SVM à marge souple. 17. Que fait le paramètre $C$ ? Un grand $C$ régularise-t-il fort ? 18. Pourquoi appelle-t-on la marge un régularisateur ? 19. Pourquoi la perte quadratique est-elle inadaptée ? 20. Qu'est-ce que la perte $0$-$1$ ? Pourquoi ne l'utilise-t-on pas ? 21. Écrire la perte charnière et ses trois régimes. 22. Quelle est sa propriété par rapport à la perte $0$-$1$ ? 23. Écrire le problème sans contraintes et identifier ses deux termes. 24. Comment montre-t-on l'équivalence avec la forme contrainte ?

**Dual** 25. Donner les trois avantages du dual. 26. Quels sont les deux multiplicateurs et à quelles contraintes correspondent-ils ? 27. Écrire les trois dérivées annulées et ce que chacune donne. 28. Écrire le dual complet. 29. Pourquoi « contraintes de boîte » ? Quel avantage numérique ? 30. Énoncer le théorème du représentant. 31. Comment calcule-t-on $b^*$ ? Que faire si aucun point n'est sur la marge ? 32. Comment reconnaît-on les points exactement sur la marge ? 33. Qu'est-ce qu'une enveloppe convexe ? Quelle troisième interprétation donne-t-elle ?

**Noyaux et numérique** 34. Quelle observation sur le dual rend les noyaux possibles ? 35. Qu'est-ce que la modularité évoquée par le livre ? 36. Définir un noyau. Qu'est-ce que l'application d'attributs canonique ? 37. Qu'est-ce que l'astuce du noyau ? la matrice de Gram ? 38. Quelles sont les deux conditions sur un noyau ? 39. La frontière devient non linéaire — que résout-on toujours ? 40. Citer les trois sens du mot « noyau ». 41. Comment choisir le noyau et ses paramètres ? 42. Pourquoi faut-il un sous-gradient ? Écrire $g(t)$. 43. Comment choisir entre primal et dual pour la résolution ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le quatrième pilier ? | La **CLASSIFICATION** |
| Les valeurs d'étiquette ? | $\{+1,-1\}$ — $\{0,1\}$ est réservé aux modèles **probabilistes** |
| La mise en garde sur $+1$ ? | En détection de cancer, **le patient ATTEINT est $+1$** — ne rien inférer de « positif » |
| L'hyperplan séparateur ? | $\{x\in\mathbb R^D:\langle w,x\rangle+b=0\}$ |
| Que représente $w$ ? | Le **VECTEUR NORMAL** à l'hyperplan |
| La preuve de l'orthogonalité ? | $f(x_a)-f(x_b)=\langle w,x_a-x_b\rangle=0$ pour $x_a,x_b$ sur l'hyperplan |
| $w$ et $x$, deux natures ? | $w$ = **FLÈCHE** (vecteur géométrique) · $x$ = **POINT** (coordonnées) |
| La règle de décision ? | $y_n(\langle w,x_n\rangle+b)\geqslant0$ |
| La marge ? | La **distance de l'hyperplan aux exemples LES PLUS PROCHES** |
| Pourquoi la maximiser ? | Un classifieur à **grande marge GÉNÉRALISE bien** (Steinwart & Christmann) |
| La subtilité technique ? | Il faut **DÉFINIR UNE ÉCHELLE** — sinon changer les **unités** changerait la marge |
| La décomposition vectorielle ? | $x_a=x_a'+r\dfrac{w}{\lVert w\rVert}$ |
| Que représente $r$ ? | La **COORDONNÉE de $x_a$** dans le sous-espace engendré par $w/\lVert w\rVert$ |
| La formulation avec $\lVert w\rVert=1$ ? | $\max_{w,b,r}r$ s.c. $y_n(\langle w,x_n\rangle+b)\geqslant r$, $\lVert w\rVert=1$, $r>0$ |
| L'autre convention d'échelle ? | Le prédicteur vaut **1 à l'exemple le plus proche** |
| Le résultat qui les relie ? | $r=\dfrac{1}{\lVert w\rVert}$ |
| Pourquoi contre-intuitif ? | On dérive la distance en fonction de $\lVert w\rVert$, **qu'on ne connaît pas encore** |
| La justification du livre ? | Voir $r$ comme une **VARIABLE TEMPORAIRE** de la dérivation |
| Autre lecture de la distance ? | L'**ERREUR DE PROJECTION** sur l'hyperplan |
| Le SVM à marge dure ? | $\min\frac12\lVert w\rVert^2$ s.c. $y_n(\langle w,x_n\rangle+b)\geqslant1$ |
| Pourquoi le carré ? | Il donne un **programme quadratique CONVEXE** |
| Pourquoi le $\frac12$ ? | Il **n'affecte pas** l'optimum — il rend le **gradient plus propre** |
| Pourquoi « dure » ? | **Aucune violation** de la condition de marge n'est autorisée |
| Théorème 12.1 ? | Les deux formulations (**$\lVert w\rVert=1$** et **marge $=1$**) sont **ÉQUIVALENTES** |
| Ses trois pas de preuve ? | Le **carré** est monotone · **reparamétriser** par $w'/\lVert w'\rVert$ · **diviser par $r>0$** |
| Où sert la séparabilité linéaire ? | Elle garantit $r>0$, donc la **division licite** |
| Le besoin de la marge souple ? | Données **non linéairement séparables** |
| L'idée clé ? | Une **VARIABLE D'ÉCART $\xi_n$** par exemple, **soustraite de la marge** |
| Le SVM à marge souple ? | $\min\frac12\lVert w\rVert^2+C\sum_n\xi_n$ s.c. $y_n(\cdots)\geqslant1-\xi_n$, $\xi_n\geqslant0$ |
| Que fait $C$ ? | Il **arbitre** entre taille de la marge et quantité totale d'écart |
| Grand $C$ ? | **FAIBLE régularisation** — plus de poids aux écarts |
| Où $C$ est-il placé ? | Sur **les ÉCARTS** — l'inverse de la convention des livres d'optimisation |
| Autre nom de cette formulation ? | Le **$C$-SVM** |
| Le régularisateur ? | $\lVert w\rVert^2$ — **le terme de MARGE** |
| Pourquoi pas la perte quadratique ? | **Inadaptée** à la classification binaire |
| La perte $0$-$1$ ? | $\mathbb 1(f(x_n)\neq y_n)$ |
| Pourquoi l'éviter ? | Elle donne un problème d'optimisation **COMBINATOIRE** |
| La perte charnière ? | $\ell(t)=\max\{0,1-t\}$ avec $t=y f(x)$ |
| Régime $t\geqslant1$ ? | Perte **nulle** |
| Régime $0<t<1$ ? | Perte **positive alors que la prédiction est CORRECTE** — on est **dans la marge** |
| Régime $t<0$ ? | Perte **croissant linéairement** — mauvais côté |
| Sa propriété-clé ? | C'est un **MAJORANT CONVEXE de la perte $0$-$1$** |
| La perte de la marge dure ? | $0$ si $t\geqslant1$, **$\infty$** si $t<1$ |
| Le problème sans contraintes ? | $\min\frac12\lVert w\rVert^2+C\sum_n\max\{0,1-y_nf(x_n)\}$ |
| Sa lecture ? | **Maximiser la marge = RÉGULARISER** |
| L'équivalence avec la forme contrainte ? | $\min_t\max\{0,1-t\}\iff\min_\xi\xi$ s.c. $\xi\geqslant0$, $\xi\geqslant1-t$ |
| Les trois avantages du dual ? | Indépendant du **nombre d'attributs** · bon si **$D>N$** · permet les **NOYAUX** |
| Les deux multiplicateurs ? | $\alpha_n$ (classification correcte) et $\gamma_n$ (non-négativité de $\xi_n$) |
| Ce que donne $\partial\mathfrak L/\partial w=0$ ? | Le **THÉORÈME DU REPRÉSENTANT** $w=\sum_n\alpha_ny_nx_n$ |
| Ce que donne $\partial\mathfrak L/\partial b=0$ ? | $\sum_ny_n\alpha_n=0$ |
| Ce que donne $\partial\mathfrak L/\partial\xi_n=0$ ? | $C-\alpha_n-\gamma_n=0$, donc $\alpha_n\leqslant C$ |
| Le SVM dual ? | $\min_\alpha\frac12\sum_i\sum_jy_iy_j\alpha_i\alpha_j\langle x_i,x_j\rangle-\sum_i\alpha_i$ |
| Ses contraintes ? | $\sum_iy_i\alpha_i=0$ et $0\leqslant\alpha_i\leqslant C$ |
| Leur nom ? | Les **CONTRAINTES DE BOÎTE** |
| Leur avantage ? | Boîtes **alignées sur les axes** — très efficaces dans les solveurs |
| Pourquoi minimiser et non maximiser ? | On minimise le **dual NÉGATIF** — équivalent |
| Les vecteurs de support ? | Les $x_n$ avec **$\alpha_n>0$** |
| Les autres points ? | $\alpha_n=0$ — ils **n'influencent PAS** la solution |
| Comment calculer $b^*$ ? | $b^*=y_n-\langle w^*,x_n\rangle$ pour un $x_n$ **sur la marge** |
| Si aucun n'y est exactement ? | Prendre la **MÉDIANE** de $\lvert y_n-\langle w^*,x_n\rangle\rvert$ sur les SV |
| Comment reconnaître les points sur la marge ? | $0<\alpha_n<C$ (**strictement à l'intérieur** de la boîte), par les conditions **KKT** |
| L'enveloppe convexe ? | $\big\{\sum_n\alpha_nx_n:\sum_n\alpha_n=1,\ \alpha_n\geqslant0\big\}$ |
| La troisième interprétation du SVM ? | L'hyperplan **BISSECTE le segment** entre les deux enveloppes convexes |
| L'observation qui rend les noyaux possibles ? | Le dual ne contient **QUE des produits intérieurs ENTRE EXEMPLES** |
| La modularité ? | Choix du **classifieur** et choix de la **représentation** sont **SÉPARABLES** |
| Définition d'un noyau ? | $k(x_i,x_j)=\langle\phi(x_i),\phi(x_j)\rangle_{\mathcal H}$ pour un espace de **HILBERT** $\mathcal H$ |
| L'application d'attributs canonique ? | $\phi(x)=k(\cdot,x)$, dans le **RKHS unique** associé |
| L'astuce du noyau ? | Elle **CACHE l'application non linéaire explicite** |
| La matrice de Gram ? | $K\in\mathbb R^{N\times N}$ des $k(x_i,x_j)$ ; aussi « matrice de noyau » |
| Les deux conditions sur un noyau ? | **SYMÉTRIQUE** et **SEMI-DÉFINI POSITIF** ($z^\top Kz\geqslant0$) |
| Trois noyaux usuels ? | **Polynomial** · **gaussien RBF** · **quadratique rationnel** |
| Que résout-on avec un noyau ? | **TOUJOURS un HYPERPLAN** — c'est la **frontière** qui devient non linéaire |
| Les trois sens de « noyau » ? | **RKHS** (ici) · **ESPACE NUL** (algèbre linéaire) · **noyau LISSANT** (densité) |
| Comment choisir le noyau ? | Par **VALIDATION CROISÉE IMBRIQUÉE** (§8.6.1) |
| Le prédicteur à noyau ? | $f(x)=\sum_n\alpha_ny_nk(x_n,x)+b$ — **$w$ n'est jamais formé explicitement** |
| Pourquoi un sous-gradient ? | La charnière **n'est pas différentiable en $t=1$** |
| Le sous-gradient ? | $-1$ si $t<1$ · $[-1,0]$ si $t=1$ · $0$ si $t>1$ |
| Où est-elle différentiable ? | **PRESQUE PARTOUT** — un seul point pose problème |
| Taille du primal ? | La **dimension $D$** des exemples |
| Taille du dual ? | Le **nombre $N$** d'exemples |
| Nature des deux problèmes ? | Des **programmes quadratiques CONVEXES** |
| La différence de philosophie avec le ch. 9 ? | Vraisemblance : partir d'un **modèle probabiliste**. SVM : **CONCEVOIR d'abord** l'objectif par **intuition géométrique** |
