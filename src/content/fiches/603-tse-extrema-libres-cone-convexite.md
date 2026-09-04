# Fiche 603 — Extrema en dimension $n$ : points critiques, cône admissible, point selle, convexité

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Montaru, *Optimisation*, TSE, 16 mars 2025 — **chapitre 4, §4.3 à §4.5**, p. 21–24 |
| **Difficulté** | Must know — le chapitre le plus dense en exercices du polycopié |
| **Temps d'étude estimé** | 3 h |
| **Prérequis** | Fiches 600 (compacité), 601 (ordres 1 et 2 en dimension 1), 602 (gradient, hessienne, forme quadratique) |
| **Concepts clés** | Équation d'Euler, point critique, cône des directions admissibles, inéquation d'Euler, condition suffisante d'ordre 2, point selle, critère $rt-s^2$, ensembles et fonctions convexes |
| **Poids à l'examen** | **Six exercices du polycopié** (4.2 à 4.7) sont dans ce paragraphe — tous corrigés ici. Le **cône admissible** (§4.3.2) est la notion que le cours reprendra explicitement au §6.4 : *« revenir sur les exercices 3 et 4 du TD3 où nous avions employé la condition nécessaire de minimum local faisant appel à la notion de cône admissible »*. |

> **Convention.** Les énoncés numérotés sont ceux de M. Montaru, mot pour mot. Les **corrigés des exercices 4.2 à 4.7 sont rédigés pour cette fiche** — le polycopié en donne les énoncés seuls, la résolution étant faite en TD. Ils sont signalés comme tels.

## 🎯 Vue d'ensemble

```
LA QUESTION : où sont les extrema de f sur A ?

  ┌───────────────────────────────────────────────────────────────────┐
  │  LE POINT EST-IL À L'INTÉRIEUR DE A ?                             │
  └───────────────────────────────────────────────────────────────────┘
          │                                        │
       OUI, a ∈ Å                              NON, a ∈ Fr(A)
          │                                        │
   ÉQUATION d'Euler                        INÉQUATION d'Euler
   ∇f(a) = 0            (prop. 4.11)        ∀h ∈ C(a), ⟨∇f(a),h⟩ ≥ 0   (prop. 4.14)
   H_f(a) ⪰ 0 si min                        C(a) = cône des directions
          │                                         admissibles (déf. 4.13)
          │                                        │
   ORDRE 2 SUFFISANT (thm 4.15)              pas de condition d'ordre 2
   H_f(a) définie POSITIVE → min local        dans le cours
   H_f(a) définie NÉGATIVE → max local
   H_f(a) INDÉFINIE       → POINT SELLE
   H_f(a) dégénérée       → RIEN

   en dimension 2 (thm 4.16) : r = ∂²f/∂x², t = ∂²f/∂y², s = ∂²f/∂x∂y
          rt − s² > 0 et r > 0  →  minimum local
          rt − s² > 0 et r < 0  →  maximum local
          rt − s² < 0           →  point selle
          rt − s² = 0           →  on ne peut RIEN conclure

  ┌───────────────────────────────────────────────────────────────────┐
  │  RACCOURCI : SI f EST CONVEXE (§4.5)                              │
  │     ∇f(a) = 0  ⟺  a est un minimum GLOBAL     (thm 4.20)          │
  │     plus d'ordre 2, plus de comparaison de candidats              │
  └───────────────────────────────────────────────────────────────────┘
```

## 🔴 Concept 1 — Extremum local et point intérieur (déf. 4.10, prop. 4.11, déf. 4.12)

**Définition 4.10 (cours).** Soit $A \subset \mathbb{R}^d$ et $f : A \to \mathbb{R}$.

- $a \in A$ est un **minimum local** de $f$ s'il existe $\epsilon>0$ tel que $\forall x \in B(a,\epsilon)\cap A,\ f(x) \ge f(a)$.
- $a \in A$ est un **maximum local** s'il existe $\epsilon>0$ tel que $\forall x \in B(a,\epsilon)\cap A,\ f(x) \le f(a)$.

⚠️ **Le $\cap A$ est décisif.** On ne compare $f(a)$ qu'aux points **de $A$** proches de $a$. C'est ce qui permet à un extremum d'être sur la frontière : de l'autre côté, il n'y a rien à comparer.

**Proposition 4.11 (cours).** Soit $a \in \mathring{A}$ un extremum local de $f$.

- Si $f$ est de classe $C^1$ sur un voisinage de $a$, alors $$\nabla f(a) = 0 \qquad \textbf{(équation d'Euler)}.$$
- Si $f$ est de classe $C^2$ sur un voisinage de $a$ :
  - si $a$ est un **minimum** local, alors $H_f(a) \succeq 0$ (la hessienne de $f$ en $a$ est une forme quadratique **semi-définie positive**) ;
  - si $a$ est un **maximum** local, alors $H_f(a) \preceq 0$ (**semi-définie négative**).

**Définition 4.12 (cours).** Un point $a$ tel que $\nabla f(a) = 0$ est appelé **point critique** de $f$.

> **Preuve reconstruite de l'équation d'Euler — deux lignes, avec la proposition 4.6.** Soit $h \in \mathbb{R}^d$ quelconque. Comme $a \in \mathring{A}$, la fonction $\varphi(t) = f(a+th)$ est définie sur un voisinage $\,]-\epsilon,\epsilon[$ de $0$, et $0$ est un extremum local de $\varphi$ — **à l'intérieur** de cet intervalle. La proposition 3.4 (fiche 601) donne
>
> $$\varphi'(0) = 0, \qquad \text{c'est-à-dire} \qquad \langle \nabla f(a), h\rangle = 0 .$$
>
> Ceci vaut **pour tout $h$**, donc $\nabla f(a) = 0$ (prendre $h = \nabla f(a)$ : on obtient $\lVert \nabla f(a)\rVert^2 = 0$). ∎
>
> De même, la proposition 3.10 donne $\varphi''(0) \ge 0$ pour un minimum, soit $\langle h, H_f(a)h\rangle \ge 0$ pour tout $h$ : c'est exactement la semi-définie positivité. ∎
>
> **Observez le mécanisme** : on n'a rien démontré de neuf, on a **transporté** le chapitre 3 le long de chaque droite. C'est l'unique usage de la proposition 4.6 dans les preuves du §4.3, et il est décisif.

**Encadré ATTENTION (cours).** *Ces conditions sont valables pour un extremum local $a$ qui est un **point intérieur** de $A$. Nous allons obtenir des conditions nécessaires lorsque l'extremum local est pris « sur le bord de $A$ ».*

<details class="details--riche">
<summary>

**Corrigé — exercice 4.2 du cours : points critiques de $f(x,y)=xy(x+y-1)$**

</summary>

**Énoncé (cours, exercice 4.2).** Trouver les points critiques de $f(x,y) = xy(x+y-1)$.

**Étape 1 — développer.** $f(x,y) = x^2y + xy^2 - xy$. C'est un polynôme, donc $f \in C^\infty(\mathbb{R}^2)$.

**Étape 2 — le gradient, factorisé.**

$$\frac{\partial f}{\partial x} = 2xy + y^2 - y = y\,(2x+y-1), \qquad \frac{\partial f}{\partial y} = x^2 + 2xy - x = x\,(x+2y-1).$$

**Factoriser est ce qui rend l'exercice faisable.** Le système $\nabla f = 0$ devient

$$\begin{cases} y\,(2x+y-1) = 0 \\ x\,(x+2y-1) = 0\end{cases}$$

c'est-à-dire un **produit nul dans chaque équation** : quatre combinaisons à examiner.

**Étape 3 — les quatre cas.**

| Cas | Première équation | Seconde équation | Solution |
|---|---|---|---|
| 1 | $y=0$ | $x=0$ | $(0,0)$ |
| 2 | $y=0$ | $x+2y-1=0 \Rightarrow x=1$ | $(1,0)$ |
| 3 | $2x+y-1=0$ | $x=0 \Rightarrow y=1$ | $(0,1)$ |
| 4 | $2x+y=1$ | $x+2y=1$ | $(1/3,\ 1/3)$ |

Pour le cas 4 : en soustrayant les deux équations, $x - y = 0$, donc $x=y$ ; en reportant, $3x=1$.

**Il y a donc quatre points critiques :**

$$(0,0), \qquad (1,0), \qquad (0,1), \qquad \left(\tfrac13, \tfrac13\right).$$

**Étape 4 — leur nature (au-delà de ce que l'énoncé demande, mais c'est la suite naturelle).** Les dérivées secondes :

$$r = \frac{\partial^2 f}{\partial x^2} = 2y, \qquad t = \frac{\partial^2 f}{\partial y^2} = 2x, \qquad s = \frac{\partial^2 f}{\partial x\partial y} = 2x+2y-1 .$$

| Point | $r$ | $t$ | $s$ | $rt-s^2$ | Nature (thm 4.16) |
|---|---|---|---|---|---|
| $(0,0)$ | $0$ | $0$ | $-1$ | $-1 < 0$ | **point selle** |
| $(1,0)$ | $0$ | $2$ | $1$ | $-1 < 0$ | **point selle** |
| $(0,1)$ | $2$ | $0$ | $1$ | $-1 < 0$ | **point selle** |
| $(1/3,1/3)$ | $2/3$ | $2/3$ | $1/3$ | $\tfrac49-\tfrac19 = \tfrac13 > 0$, $r>0$ | **minimum local** |

$$f\left(\tfrac13,\tfrac13\right) = \tfrac13\cdot\tfrac13\cdot\left(\tfrac13+\tfrac13-1\right) = \tfrac19 \cdot \left(-\tfrac13\right) = -\tfrac{1}{27} \approx -0{,}037037 .$$

**Contrôle numérique.** La valeur $-1/27 = -0{,}0370370$ est bien atteinte en $(1/3,\ 1/3)$. Mais sur la fenêtre $[-0{,}5;\ 1{,}5]^2$ au pas $10^{-4}$, le minimum de la grille vaut $-0{,}500000$ — **treize fois plus bas** : $(1/3,1/3)$ n'est qu'un minimum **local**, et il ne l'emporte même pas sur cette petite fenêtre. À plus grande échelle, $f(t,t) = t^2(2t-1) \to -\infty$ quand $t\to-\infty$ ; par exemple $f(-10,-10) = 100\times(-21) = -2100$.

⚠️ **Trois des quatre points critiques ne sont pas des extrema.** C'est la situation normale, et c'est exactement pourquoi la définition 4.12 leur donne un nom distinct. Répondre « les extrema sont les quatre points critiques » vaut zéro.

</details>

## 🔴 Concept 2 — Le cône des directions admissibles (déf. 4.13, prop. 4.14)

C'est **la notion neuve du chapitre**, et celle que le cours annonce vouloir remplacer par KKT au §6.4.

**Définition 4.13 (cours).** Soit $a \in A$. On dit que $h \in \mathbb{R}^d$ est une **direction admissible** pour $a$ s'il existe $\alpha > 0$ tel que

$$\forall t \in [0,\alpha],\quad a + th \in A .$$

On note $C(a)$ l'ensemble des directions admissibles pour $a$ — *c'est un cône, d'où la notation*.

**Remarque (cours).** *Le cône en un point contient au minimum la direction $0$ et au maximum toutes les directions de $\mathbb{R}^d$.* Voici les cas extrêmes :

- si $a \in \mathring{A}$, alors $C(a) = \mathbb{R}^d$ ;
- si $A$ est un **cercle** (pas un disque), alors en chaque point $a$ du cercle, $C(a) = \{0\}$ — *car si on part de $a$ dans n'importe quelle direction, on sort du cercle*.

**Exemple 4 (cours).** Regarder l'exemple où $A$ est un **carré plein**.

> **Réponse à l'exemple 4** (fait au tableau ; le voici, car il sert à l'exercice 4.4). Prenons $A = [0,2]^2$. Il y a **trois types de points**, donc trois cônes :
>
> ```
>      D(0,2) ┌──────────────┐ C(2,2)
>             │              │      SOMMET (0,0) : C(a) = { h₁ ≥ 0 et h₂ ≥ 0 }
>             │      ●       │        un QUART de plan
>             │  intérieur   │
>        ●    │              │      ARÊTE x=0, 0<y<2 : C(a) = { h₁ ≥ 0 }
>      arête  │              │        un DEMI-plan (h₂ libre)
>             │              │
>      O(0,0) └──────────────┘ B(2,0)   INTÉRIEUR : C(a) = ℝ²
>        ●                                tout le plan
>      sommet
> ```
>
> **La règle générale à retenir :** *le cône ne retient que les contraintes **actives** en $a$ — celles qui sont saturées.* Au sommet $(0,0)$, deux contraintes sont saturées ($x\ge0$ et $y\ge0$), d'où deux inégalités sur $h$. Sur l'arête, une seule. À l'intérieur, aucune, d'où $C(a)=\mathbb{R}^2$.
>
> **C'est déjà la notion de contrainte active du §6.1**, avec l'ensemble $J(a)$ des indices actifs. Le cône est la version géométrique, KKT la version calculatoire — le cours le dira lui-même au §6.4.

**Proposition 4.14 (cours) — inéquation d'Euler.** Supposons $f$ différentiable en $a$.

- Si $a \in A$ est un **minimum** local de $f$, alors $$\forall h \in C(a),\quad \langle \nabla f(a), h\rangle \ge 0 .$$
- Si $a \in A$ est un **maximum** local de $f$, alors $$\forall h \in C(a),\quad \langle \nabla f(a), h\rangle \le 0 .$$

> **Preuve reconstruite.** Soit $h \in C(a)$ et $\alpha>0$ tel que $a+th \in A$ pour $t\in[0,\alpha]$. La fonction $\varphi(t) = f(a+th)$ est définie sur $[0,\alpha]$, et $0$ est un minimum local de $\varphi$ **à l'extrémité gauche** de cet intervalle. La **proposition 3.4** (cas $t_0 = a$) donne
>
> $$\varphi'(0) \ge 0, \qquad \text{c'est-à-dire} \qquad \langle \nabla f(a), h\rangle \ge 0 . \qquad \blacksquare$$
>
> **Tout est dans le mot « extrémité ».** À l'intérieur, $0$ était au milieu de l'intervalle et la proposition 3.4 donnait une **égalité**. Ici il est au bord et on n'obtient qu'une **inégalité**. La fiche 601 l'annonçait ; c'est maintenant démontré en dimension $n$.

**La cohérence des deux propositions.** Si $a \in \mathring A$, alors $C(a)=\mathbb{R}^d$, et l'inéquation d'Euler appliquée à $h$ **et** à $-h$ donne $\langle\nabla f(a),h\rangle \ge 0$ et $\le 0$, donc $=0$ pour tout $h$ : on retrouve $\nabla f(a)=0$. **La proposition 4.14 contient la proposition 4.11.**

<details class="details--riche">
<summary>

**Corrigé — exercice 4.3 du cours : $f(x,y)=x^4-y^2$ sur $A = \mathbb{R}_+\times[0,1]$**

</summary>

**Énoncé (cours, exercice 4.3).** Soit $f(x,y) = x^4-y^2$ définie sur $A = \mathbb{R}_+ \times [0,1]$.

1. Montrer que $f$ admet un minimum sur $A$.
2. Déterminer le ou les minima.
3. Retrouver facilement les résultats par le calcul.

**1. Existence.** C'est l'exercice 4.1, traité en fiche 602 : sur $A$, $y^2 \le 1$ donc $f \ge x^4-1$, et $x^2 \ge \lVert(x,y)\rVert^2-1$, d'où

$$f(x,y) \ge \bigl(\lVert(x,y)\rVert^2-1\bigr)^2 - 1 \longrightarrow +\infty .$$

$f$ est **coercive sur $A$** (déf. 4.8). $A$ est fermé (produit de deux fermés) et non borné, $f$ est polynomiale donc continue : le **théorème 4.9** donne un **minimum global** sur $A$. ∎

**2. Détermination — la voie directe.** Sur $A$ :

$$f(x,y) = x^4 - y^2 \ \ge\ 0 - 1 \ =\ -1,$$

puisque $x^4 \ge 0$ et $y^2 \le 1$. **Il y a égalité si et seulement si** $x^4 = 0$ **et** $y^2 = 1$, c'est-à-dire $x=0$ et $y=1$ (la racine $y=-1$ est exclue par $y \in [0,1]$).

$$\boxed{\text{Le minimum vaut } -1, \text{ atteint au SEUL point } (0,1).}$$

Ici l'unicité est vraie — mais elle a demandé un argument (le cas d'égalité), elle n'était pas donnée par le théorème 4.9.

**3. « Retrouver par le calcul » — c'est l'inéquation d'Euler qu'on demande.**

*Le point est-il intérieur ?* $A = \mathbb{R}_+\times[0,1]$ a pour intérieur $\mathring A = \,]0,+\infty[\times\,]0,1[$. Le point $(0,1)$ **n'y est pas** : il est sur la frontière, au « coin » où $x=0$ et $y=1$ sont **toutes deux saturées**. La proposition 4.11 ne s'applique donc pas — et de fait

$$\nabla f(x,y) = \begin{pmatrix} 4x^3 \\ -2y\end{pmatrix}, \qquad \nabla f(0,1) = \begin{pmatrix} 0 \\ -2\end{pmatrix} \neq 0 .$$

*Le cône en $(0,1)$.* On cherche les $h=(h_1,h_2)$ tels que $(0,1)+t(h_1,h_2) \in A$ pour $t\in[0,\alpha]$ :

- $th_1 \ge 0$ pour $t>0$ ⟹ $h_1 \ge 0$ ;
- $1+th_2 \in [0,1]$ ⟹ $th_2 \le 0$ ⟹ $h_2 \le 0$.

$$C(0,1) = \{(h_1,h_2) : h_1 \ge 0,\ h_2 \le 0\} \quad \text{— un quart de plan.}$$

*L'inéquation d'Euler.* Pour $h \in C(0,1)$ :

$$\langle \nabla f(0,1),\ h\rangle = 0\cdot h_1 + (-2)\cdot h_2 = -2h_2 \ \ge\ 0 \quad \text{car } h_2 \le 0 . \ \checkmark$$

La **proposition 4.14** est vérifiée : $(0,1)$ passe le test du minimum local.

**Le contrôle qui prouve qu'on a compris — un autre point du bord.** Prenons $(0,0)$, où

$$\nabla f(0,0) = (0,0) : \textbf{c'est un point critique}.$$

Le cône y vaut $C(0,0) = \{h_1\ge0,\ h_2\ge0\}$, et $\langle(0,0),h\rangle = 0 \ge 0$ : **l'inéquation d'Euler est satisfaite aussi.**

Et pourtant $(0,0)$ **n'est pas un minimum local** : pour $y>0$ petit, $f(0,y) = -y^2 < 0 = f(0,0)$. Par exemple $f(0;\,0{,}1) = -0{,}01 < 0$.

⚠️ **C'est le point à retenir de tout le paragraphe :** la proposition 4.14 est une condition **nécessaire**, jamais suffisante. Elle **filtre** les candidats, elle ne conclut pas. Comme au chapitre 3 avec $t^3$, il faut ensuite comparer les valeurs — ce que fait l'étape 2.

**Confirmation numérique.** Minimisation de $f$ sur une grille de $A' = [0,4]\times[0,1]$ au pas $2\times10^{-3}$ : minimum $-1{,}000000$ atteint en $(0{,}000,\ 1{,}000)$, valeur en $(0,0)$ égale à $0$.

</details>

<details class="details--riche">
<summary>

**Corrigé — exercice 4.4 du cours : le carré plein, et la lecture géométrique**

</summary>

**Énoncé (cours, exercice 4.4).** Soit $A$ le carré plein formé à partir des points $O(0,0)$, $B(2,0)$, $C(2,2)$ et $D(0,2)$. On considère $f(x,y) = x^2+y^2-8x-2y+17$.

1. Montrer que $f$ admet un minimum et un maximum global sur $A$.
2. Déterminer le ou les points où ces extrema sont atteints.
3. Retrouver facilement les résultats géométriquement en interprétant $f$ à l'aide d'une distance.

**Traduction.** $A = [0,2]^2$.

**1. Existence.** $A = [0,2]\times[0,2]$ est **fermé** (produit de segments fermés) et **borné** ($\lVert(x,y)\rVert_\infty \le 2$), donc **compact** dans $\mathbb{R}^2$ (thm 2.24). $f$ est polynomiale donc continue. Le **théorème 4.7 (Weierstrass)** donne un minimum **et** un maximum globaux, tous deux atteints. ∎

**3. Commençons par la question 3 — elle donne les réponses.** Complétons les carrés :

$$f(x,y) = (x^2-8x) + (y^2-2y) + 17 = (x-4)^2 - 16 + (y-1)^2 - 1 + 17 = (x-4)^2 + (y-1)^2 .$$

$$\boxed{f(x,y) = d\bigl((x,y),\ P\bigr)^2 \quad \text{avec} \quad P = (4,1).}$$

**$f$ est le carré de la distance au point $P(4,1)$**, qui est **hors du carré** (à droite). L'exercice devient : *quel point du carré est le plus proche de $P$ ? le plus éloigné ?*

```
        y
        2 ┤ D┌──────────┐C
          │  │          │
        1 ┤  │          │●(2,1)  ────────── ● P(4,1)
          │  │          │   le plus proche
        0 ┤ O└──────────┘B
          └──┴─────┴────┴───────┴──────────► x
             0     1    2       3    4

   les DEUX plus éloignés : O(0,0) et D(0,2), à égale distance de P
```

- **Le plus proche** : on projette $P$ sur le carré coordonnée par coordonnée. Pour $x$, le point de $[0,2]$ le plus proche de $4$ est $2$. Pour $y$, le point de $[0,2]$ le plus proche de $1$ est $1$ lui-même (il est déjà dedans). D'où $(2,1)$, et $f(2,1) = (2-4)^2+(1-1)^2 = 4$.
- **Le plus éloigné** : le maximum de la distance sur un convexe compact est atteint en un **sommet**. Pour $x$, le plus éloigné de $4$ dans $[0,2]$ est $0$. Pour $y$, le plus éloigné de $1$ dans $[0,2]$ est $0$ **ou** $2$ — **les deux sont à distance $1$**. D'où **deux** maxima : $(0,0)$ et $(0,2)$, avec $f = 16+1 = 17$ dans les deux cas.

**2. Vérification par le calcul direct.**

$$f(2,1) = 4+1-16-2+17 = 4, \qquad f(0,0) = 0+0-0-0+17 = 17, \qquad f(0,2) = 0+4-0-4+17 = 17 . \ \checkmark$$

$$\boxed{\min_A f = 4 \text{ en } (2,1) ; \qquad \max_A f = 17 \text{ en } (0,0) \textbf{ et } (0,2).}$$

**La vérification par l'inéquation d'Euler** (c'est la méthode que le cours veut faire pratiquer). On a $\nabla f(x,y) = (2x-8,\ 2y-2)$.

| Point | Position | $\nabla f$ | $C(a)$ | $\langle\nabla f,h\rangle$ | Conclusion |
|---|---|---|---|---|---|
| $(2,1)$ | **arête** $x=2$ | $(-4,\ 0)$ | $\{h_1 \le 0\}$ | $-4h_1 \ge 0$ | compatible **min** |
| $(0,0)$ | **sommet** | $(-8,\ -2)$ | $\{h_1\ge0,\ h_2\ge0\}$ | $-8h_1-2h_2 \le 0$ | compatible **max** |
| $(0,2)$ | **sommet** | $(-8,\ +2)$ | $\{h_1\ge0,\ h_2\le0\}$ | $-8h_1+2h_2 \le 0$ | compatible **max** |

Les trois passent le test de la proposition 4.14 — chacun dans le bon sens.

**Le contrôle décisif : y a-t-il un point critique ?** $\nabla f = 0$ donnerait $x=4$, $y=1$ — c'est-à-dire $P$ lui-même, qui **n'est pas dans $A$**. Il n'y a donc **aucun point critique dans $A$** : *tous* les extrema sont nécessairement sur la frontière. Une résolution qui se contenterait de $\nabla f = 0$ ne trouverait **rien du tout**.

⚠️ **C'est l'exercice qui justifie l'existence du §4.3.2.** Sans le cône, on n'a aucun outil ici.

**Confirmation numérique** sur une grille de $[0,2]^2$ au pas $10^{-3}$ : minimum $4{,}000000$ en $(2{,}000,\ 1{,}000)$ ; maximum $17{,}000000$ atteint en **deux** points, $(0{,}000,\ 0{,}000)$ et $(0{,}000,\ 2{,}000)$.

</details>

## 🔴 Concept 3 — La condition suffisante d'ordre 2 et le point selle (thm 4.15)

**Théorème 4.15 (cours).** Soit $U$ un ouvert de $\mathbb{R}^n$, $f \in C^2(U)$ et $a \in U$ tel que $\nabla f(a)=0$.

1. Si $H_f(a)$ est une forme quadratique **définie positive**, alors $a$ est un **minimum local** de $f$.
2. Si $H_f(a)$ est une forme quadratique **définie négative**, alors $a$ est un **maximum local** de $f$.
3. Si $H_f(a)$ est une forme quadratique **non dégénérée et indéfinie**, alors $a$ est un **point selle** (aussi appelé **point col**).

*Pour savoir si une forme quadratique est définie négative, définie positive, ou pas, on peut par exemple faire la **réduction de Gauss** de la forme quadratique ou bien calculer la **signature** grâce aux **mineurs principaux**.*

> **La nouveauté par rapport au chapitre 3, c'est le point 3.** En dimension 1, $f''(t_0)$ est un nombre : il est positif, négatif, ou nul. En dimension $n$, la forme quadratique peut être **positive dans une direction et négative dans une autre** — c'est le point selle.
>
> ```
>   POINT SELLE : la surface z = x² − y² près de (0,0)
> 
>       le long de y = 0 :  φ(t) = t²   →  MINIMUM
>       le long de x = 0 :  φ(t) = −t²  →  MAXIMUM
> 
>       ╲                   ╱          la forme d'une selle de cheval,
>        ╲_______________╱             ou d'un col de montagne :
>        ╱               ╲             on monte dans un sens,
>       ╱                 ╲            on descend dans l'autre
> ```
>
> **Le vocabulaire du cours :** *point selle* et *point col* désignent la même chose. « Col » vient de la géographie — un col est bien un maximum le long du chemin et un minimum le long de la crête.

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment décider en pratique — les deux méthodes citées par le cours.</span>

**Méthode 1 : les mineurs principaux dominants** (la plus rapide). Notons $\Delta_k$ le déterminant de la sous-matrice $k\times k$ en haut à gauche de $H_f(a)$.

| Signes des $\Delta_k$ | Conclusion |
|---|---|
| tous $> 0$ : $\Delta_1>0,\ \Delta_2>0,\ \dots$ | **définie positive** → minimum |
| alternés en commençant par $<0$ : $\Delta_1<0,\ \Delta_2>0,\ \Delta_3<0,\dots$ | **définie négative** → maximum |
| un $\Delta_k$ nul | critère **inapplicable** (cas dégénéré) |
| autre configuration, tous non nuls | **indéfinie** → point selle |

**Méthode 2 : la réduction de Gauss** — écrire $Q$ comme une combinaison de carrés de formes linéaires indépendantes et lire les signes des coefficients. Plus longue, mais elle donne la **signature** complète et fonctionne toujours.

**En dimension 2**, le cours donne un raccourci dédié : c'est le théorème 4.16 ci-dessous. Utilisez-le.

</div>

**Théorème 4.16 (cours) — le cas $n=2$.** Soit $f = f(x,y)$, $f\in C^2(U)$ et $a\in U$ tel que $\nabla f(a)=0$, c'est-à-dire $\frac{\partial f}{\partial x}(a) = \frac{\partial f}{\partial y}(a) = 0$. On note

$$r = \frac{\partial^2 f}{\partial x^2}(a), \qquad t = \frac{\partial^2 f}{\partial y^2}(a), \qquad s = \frac{\partial^2 f}{\partial x\partial y}(a).$$

1. Si $rt-s^2 > 0$ et $r > 0$, alors $a$ est un **minimum local** de $f$.
2. Si $rt-s^2 > 0$ et $r < 0$, alors $a$ est un **maximum local** de $f$.

**Remarques (cours) :**

- si $rt-s^2 < 0$, $a$ est dit un **point selle** ou **point col** ;
- si $rt-s^2 = 0$, **on ne peut rien conclure**.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ce critère marche.</span>

$rt-s^2 = \det H_f(a)$ et $r = \Delta_1$. La condition « $\det > 0$ » force les deux valeurs propres à être de **même signe** ; le signe de $r$ dit alors lequel. Si $\det < 0$, les valeurs propres sont de **signes opposés** : indéfinie, donc selle. Si $\det = 0$, une valeur propre est nulle : cas dégénéré, exclu par le théorème 4.15.

**Le cas $rt-s^2 = 0$ est le pendant exact du cas $f''(t_0)=0$** de la fiche 601 — et se traite de la même façon : à la main, en étudiant le signe de $f(a+h)-f(a)$.

</div>

<details class="details--riche">
<summary>

**Corrigé — exercices 4.5 et 4.6 du cours : le critère des mineurs en dimension 3**

</summary>

### Exercice 4.5 — $f(x,y,z) = x^4+y^4+z^4-4x-4y-4z$

**Étape 1 — les points critiques.**

$$\nabla f = \begin{pmatrix} 4x^3-4 \\ 4y^3-4 \\ 4z^3-4\end{pmatrix} = 0 \iff x^3=y^3=z^3=1 \iff x=y=z=1$$

(la fonction $u\mapsto u^3$ est une bijection de $\mathbb{R}$ sur $\mathbb{R}$ : **une seule racine réelle**).

**Un unique point critique : $(1,1,1)$.**

**Étape 2 — la hessienne.** $\frac{\partial^2 f}{\partial x^2} = 12x^2$, idem pour $y$ et $z$, et **toutes les dérivées croisées sont nulles** (les variables sont séparées) :

$$H_f(x,y,z) = \begin{pmatrix} 12x^2 & 0 & 0\\ 0 & 12y^2 & 0\\ 0&0&12z^2\end{pmatrix}, \qquad H_f(1,1,1) = 12\,I_3 .$$

**Étape 3 — la nature.** Les mineurs principaux dominants valent $\Delta_1 = 12 > 0$, $\Delta_2 = 144>0$, $\Delta_3 = 1728>0$ : **tous strictement positifs**, donc $H_f(1,1,1)$ est **définie positive**. Par le **théorème 4.15**, $(1,1,1)$ est un **minimum local**.

$$f(1,1,1) = 1+1+1-4-4-4 = -9 .$$

**Étape 4 — est-il global ?** **Oui**, et voici l'argument complet.

- $f$ est **coercive** : $f(x,y,z) \ge x^4+y^4+z^4 - 4(\lvert x\rvert+\lvert y\rvert+\lvert z\rvert)$, et chaque $u^4-4\lvert u\rvert \to +\infty$. Le **théorème 4.9** (ou 2.26) donne l'existence d'un minimum global sur $\mathbb{R}^3$.
- $\mathbb{R}^3$ est **ouvert**, donc ce minimum global est un point **intérieur** : la proposition 4.11 s'applique et il est **critique**.
- Il n'y a **qu'un** point critique : c'est donc lui.

$$\boxed{\min_{\mathbb{R}^3} f = -9, \text{ atteint uniquement en } (1,1,1).}$$

> **Retenez ce raisonnement en trois temps** — *existence globale + le domaine est ouvert + un seul point critique ⟹ c'est lui*. Il évite toute étude de nature, et le cours l'emploiera à l'identique dans la méthodologie du §6.4. **C'est le schéma le plus rentable de tout le cours.**

**Contrôle numérique** : minimisation sur une grille de $[-2,2]^3$ au pas $10^{-2}$ : minimum $-9{,}000000$ en $(1{,}00,\ 1{,}00,\ 1{,}00)$. Et $f(0,0,0)=0 > -9$, $f(2,2,2) = 48-24=24 > -9$.

### Exercice 4.6 — $f(x,y,z) = x^3-3x+y^2+z^2+yz$

**Étape 1 — les points critiques.**

$$\nabla f = \begin{pmatrix} 3x^2-3 \\ 2y+z \\ 2z+y\end{pmatrix} = 0 .$$

- $3x^2 = 3 \Rightarrow x = \pm1$ — **deux valeurs**, contrairement à l'exercice 4.5.
- Le système $\begin{cases}2y+z=0\\ y+2z=0\end{cases}$ a pour déterminant $4-1 = 3 \neq 0$ : **solution unique** $y=z=0$.

**Deux points critiques : $(1,0,0)$ et $(-1,0,0)$.**

**Étape 2 — la hessienne.**

$$H_f(x,y,z) = \begin{pmatrix} 6x & 0 & 0 \\ 0 & 2 & 1 \\ 0 & 1 & 2 \end{pmatrix}.$$

Elle est **diagonale par blocs** : un bloc $1\times1$ en $x$, un bloc $2\times2$ en $(y,z)$. Les deux blocs s'analysent séparément — c'est ce qui rend l'exercice court.

Le bloc $\begin{pmatrix}2&1\\1&2\end{pmatrix}$ a pour déterminant $3>0$ et pour trace $4>0$ : **défini positif** (ses valeurs propres sont $3$ et $1$). Il est le même aux deux points.

**Étape 3 — en $(1,0,0)$ : $6x = 6 > 0$.** Mineurs dominants : $\Delta_1 = 6$, $\Delta_2 = 12$, $\Delta_3 = 6\times3 = 18$ — tous $>0$. **Définie positive** ⟹ **minimum local**.

$$f(1,0,0) = 1-3 = -2 .$$

**Étape 4 — en $(-1,0,0)$ : $6x = -6 < 0$.** Les valeurs propres de $H_f(-1,0,0)$ sont $-6$, $3$ et $1$ : de **signes opposés**, toutes non nulles. La forme est **non dégénérée et indéfinie** ⟹ **point selle** (théorème 4.15, point 3).

$$f(-1,0,0) = -1+3 = 2 .$$

**Contrôle direct du point selle** — c'est ce qui rend la conclusion tangible :

$$f(-1+u,\,0,\,0) - f(-1,0,0) = (-1+u)^3 - 3(-1+u) + 2 = u^3 - 3u^2 \approx -3u^2 < 0$$

(on **descend** dans la direction $x$), tandis que

$$f(-1,\,v,\,0) - f(-1,0,0) = v^2 > 0$$

(on **monte** dans la direction $y$). Les deux directions donnent des signes opposés : c'est bien une selle.

**Contrôle numérique** : $f(-0{,}9;\,0;\,0) = -0{,}729+2{,}7 = 1{,}971 < 2$ et $f(-1;\,0{,}1;\,0) = 2{,}01 > 2$.

**Étape 5 — extrema globaux ?** **Aucun.** Le long de l'axe $x$, $f(x,0,0) = x^3-3x$, qui tend vers $-\infty$ en $-\infty$ et vers $+\infty$ en $+\infty$. Par exemple $f(-10,0,0) = -1000+30 = -970$ et $f(10,0,0) = 1000-30 = 970$. **La question ne demandait que les extrema locaux** — et c'est heureux.

⚠️ **La différence entre 4.5 et 4.6 tient à un seul détail** : $x^4$ (degré pair, coercive) contre $x^3$ (degré impair, non bornée). Le premier a un minimum global, le second n'a aucun extremum global. **Regardez toujours le degré du terme dominant avant de commencer.**

</details>

<details class="details--riche">
<summary>

**Corrigé — exercice 4.7 du cours : $f(x,y)=x^3+y^3-3xy$, et la question « sont-ils globaux ? »**

</summary>

**Énoncé (cours, exercice 4.7).** Déterminer les extrema locaux de $f(x,y) = x^3+y^3-3xy$. Sont-ils globaux ?

**Étape 1 — points critiques.**

$$\nabla f = \begin{pmatrix} 3x^2-3y \\ 3y^2-3x \end{pmatrix} = 0 \iff \begin{cases} y = x^2 \\ x = y^2 \end{cases}$$

En substituant : $x = (x^2)^2 = x^4$, donc $x(x^3-1) = 0$, d'où $x = 0$ ou $x = 1$ (seules racines réelles).

**Deux points critiques : $(0,0)$ et $(1,1)$.**

**Étape 2 — le critère $rt-s^2$ (théorème 4.16).**

$$r = 6x, \qquad t = 6y, \qquad s = -3 .$$

| Point | $r$ | $t$ | $s$ | $rt-s^2$ | Conclusion |
|---|---|---|---|---|---|
| $(0,0)$ | $0$ | $0$ | $-3$ | $0-9 = -9 < 0$ | **point selle** |
| $(1,1)$ | $6$ | $6$ | $-3$ | $36-9 = 27 > 0$, $r=6>0$ | **minimum local** |

$$f(0,0) = 0, \qquad f(1,1) = 1+1-3 = -1 .$$

**Étape 3 — « Sont-ils globaux ? » — NON, et il faut le prouver.**

Le point selle n'est évidemment pas un extremum. Reste le minimum local $(1,1)$, de valeur $-1$. Cherchons une direction où $f$ descend plus bas. Le long de la **diagonale** $y=x$ :

$$f(t,t) = 2t^3 - 3t^2 \xrightarrow[t\to-\infty]{} -\infty .$$

**Une valeur explicite suffit à conclure** : $f(-10,-10) = 2(-1000) - 3(100) = -2000-300 = -2300 \;<\; -1$.

$$\boxed{(1,1) \text{ est un minimum LOCAL et non global. } f \text{ n'a ni minimum ni maximum global.}}$$

(Pas de maximum non plus : $f(t,0) = t^3 \to +\infty$.)

**Le contrôle du point selle en $(0,0)$**, direct :

$$f(u,u) = 2u^3-3u^2 < 0 \text{ pour } u \text{ petit} > 0, \qquad f(u,-u) = u^3-u^3+3u^2 = 3u^2 > 0 .$$

Deux directions, deux signes opposés : c'est bien une selle. Numériquement, $f(0{,}1;\,0{,}1) = 0{,}002-0{,}03 = -0{,}028 < 0$ et $f(0{,}1;\,-0{,}1) = 0{,}03 > 0$.

**Confirmation numérique globale** sur $[-3,3]^2$ au pas $10^{-3}$ : le minimum de la grille vaut $-81{,}000$, atteint au coin $(-3,-3)$ — c'est-à-dire **sur le bord de la fenêtre**, ce qui est la signature d'une fonction non minorée (agrandir la fenêtre ferait encore baisser le minimum). La valeur $-1$ en $(1,1)$ est bien un minimum **local** seulement.

> **La leçon de méthode.** Quand un énoncé demande *« sont-ils globaux ? »*, la réponse attendue n'est presque jamais « oui » sans argument. **Deux réflexes** :
>
> 1. la fonction est-elle **coercive** ? (si oui, le minimum global existe — thm 4.9) ;
> 2. sinon, **exhiber une direction** où elle descend plus bas, avec une valeur numérique. Une seule valeur suffit à réfuter.

</details>

## 🟠 Concept 4 — Ensembles et fonctions convexes (§4.5)

**Définition 4.17 (cours).** Soit $C \subset \mathbb{R}^n$. $C$ est **convexe** si

$$\forall (x,y)\in C^2,\ \forall \alpha\in[0,1],\quad \alpha x + (1-\alpha)y \in C .$$

Si $C$ est convexe et $f : C\to\mathbb{R}$, on dit que $f$ est **convexe** si

$$\forall (x,y)\in C^2,\ \forall\alpha\in[0,1],\quad f\bigl(\alpha x+(1-\alpha)y\bigr) \le \alpha f(x) + (1-\alpha)f(y).$$

> **En français** : un ensemble est convexe si le **segment** entre deux de ses points y reste ; une fonction est convexe si son graphe reste **sous ses cordes**. C'est exactement la définition 3.12 de la fiche 601, écrite avec des vecteurs.
>
> **Les ensembles convexes des exercices du cours** : $\mathbb{R}^n$, une boule, un demi-espace $\{ \langle a,x\rangle \le b\}$, un pavé $[0,2]^2$, le triangle $\{x\ge0,\ y\ge0,\ x+y\le1\}$ du §6.1. **Le cercle $\{x^2+y^2=1\}$ n'est PAS convexe** — le segment entre deux points en sort. C'est pourquoi le chapitre 5 (contraintes d'égalité) est un tout autre problème.

**Proposition 4.18 (cours).** Soit $U$ ouvert de $\mathbb{R}^n$ **convexe** et $f\in C^1(U)$. Il y a équivalence entre :

1. $f$ convexe ;
2. $\forall(x,y)\in U^2,\quad f(y) \ge f(x) + \langle\nabla f(x),\ y-x\rangle$ — *($f$ au-dessus de ses plans tangents)* ;
3. $\forall(x,y)\in U^2,\quad \langle\nabla f(x)-\nabla f(y),\ x-y\rangle \ge 0$ — *(gradient « croissant »)*.

**Proposition 4.19 (cours).** Soit $U$ ouvert convexe et $f\in C^2(U)$. Il y a équivalence entre :

1. $f$ convexe ;
2. $\forall x\in U$, $H_f(x) \succeq 0$ — *($H_f(x)$ est une forme quadratique semi-définie positive)*.

**Théorème 4.20 (cours).** Soit $U$ ouvert convexe et $f\in C^1(U)$ **convexe**. Alors $a\in U$ est un **minimum global** de $f$ **si et seulement si** $\nabla f(a) = 0$.

**Théorème 4.21 (cours).** Soit $U$ ouvert convexe et $f\in C^1(U)$ **concave**. Alors $a\in U$ est un **maximum global** de $f$ si et seulement si $\nabla f(a)=0$.

> **Preuve reconstruite du théorème 4.20.** Le sens $\Rightarrow$ est la proposition 4.11 ($U$ ouvert donc $a$ intérieur). Pour $\Leftarrow$, la caractérisation 2 de la proposition 4.18 avec $x=a$ donne, pour **tout** $y \in U$ :
>
> $$f(y) \ge f(a) + \langle \underbrace{\nabla f(a)}_{=\,0},\ y-a\rangle = f(a) . \qquad \blacksquare$$
>
> **Trois lignes, et c'est le résultat le plus utile du chapitre.** La condition **nécessaire** d'ordre 1 devient **suffisante**, et elle donne du **global** — pas du local. Plus d'ordre 2 à calculer, plus de candidats à comparer.
>
> **La correspondance exacte avec le chapitre 3** : c'est la proposition 3.13 (« $f$ convexe ⟺ au-dessus de ses tangentes ») transposée, et la conclusion est celle de la fiche 601 : *« $f'(t_0)=0$ et $f$ convexe ⟹ minimum global »*.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — pourquoi c'est le résultat qui organise toute l'optimisation appliquée.</span>

Comparez les deux protocoles :

|  | Cas général | Cas convexe |
|---|---|---|
| Résoudre $\nabla f = 0$ | donne des **candidats** | donne **la réponse** |
| Calculer $H_f$ à chaque point | **obligatoire** | inutile |
| Comparer les valeurs | **obligatoire** | inutile |
| Ce qu'on obtient | du **local** | du **global** |
| Points selles possibles | **oui** | **aucun** |

C'est la raison pour laquelle un praticien commence toujours par se demander si son problème est convexe. Au chapitre 6, la condition de qualification de **Slater** (déf. 6.6) ne s'appliquera d'ailleurs qu'aux problèmes convexes — et le corollaire final de M. Blanchet (fiche 609) montrera que dans ce cas, **KKT devient suffisant**.

</div>

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | La bonne réaction | L'outil |
|---|---|---|
| « Trouver les points critiques » | résoudre $\nabla f = 0$, **factoriser** | déf. 4.12 |
| « Déterminer les extrema locaux » | points critiques **puis** nature | thm 4.15 / 4.16 |
| « … sur $[a,b]\times[c,d]$ » | **le bord aussi** — cône admissible | prop. 4.14 |
| « Sont-ils globaux ? » | coercivité, **ou** une direction qui descend | thm 4.9 |
| « Retrouver par le calcul » | c'est l'inéquation d'Euler qu'on veut | prop. 4.14 |
| « Retrouver géométriquement » | compléter les carrés → une **distance** | exercice 4.4 |
| dimension 2 | critère $rt-s^2$ | thm 4.16 |
| dimension $\ge 3$ | **mineurs principaux** ou Gauss | thm 4.15 |
| $rt-s^2 = 0$ | **aucun théorème** : étudier le signe | remarque du thm 4.16 |
| « $f$ est convexe » (donné ou à montrer) | $\nabla f = 0$ **suffit** et donne du global | thm 4.20 |

**Deux signaux qui doivent déclencher le cône :**

1. L'ensemble est décrit par des **inégalités** ($x\ge0$, $x+y\le1$, un carré, un pavé) — il a une frontière épaisse.
2. Il n'y a **aucun point critique dans $A$** — comme dans l'exercice 4.4, où $\nabla f = 0$ donne $(4,1)\notin A$. Alors *tous* les extrema sont sur le bord.

## Comment résoudre ce type d'exercice

**Le protocole complet « extrema de $f$ sur $A$ » — sept étapes.**

1. **Existence** (fiche 600/602). Compact → thm 4.7 ; fermé non borné + coercivité → thm 4.9. Cette étape rapporte un point et **change la suite** : si l'existence est acquise et qu'il n'y a qu'un candidat, c'est lui, sans étude de nature.
2. **$f$ est-elle convexe ?** Si oui ($H_f \succeq 0$ partout, prop. 4.19), **passez directement au théorème 4.20** : $\nabla f = 0$ donne le minimum global. Les étapes 3 à 7 tombent.
3. **Points critiques intérieurs.** Résoudre $\nabla f = 0$ sur $\mathring A$. **Factorisez** le gradient avant de résoudre — c'est ce qui rend l'exercice 4.2 faisable en trois lignes.
4. **Nature de chacun.**
  - $n=2$ : $rt-s^2$ et signe de $r$ (thm 4.16) ;
  - $n\ge3$ : mineurs principaux dominants, ou réduction de Gauss (thm 4.15) ;
  - cas dégénéré ($rt-s^2=0$, ou un mineur nul) : **à la main**, signe de $f(a+h)-f(a)$.
5. **La frontière.** Déterminer $C(a)$ point par point (ou par morceaux : intérieur, arêtes, sommets) et appliquer l'inéquation d'Euler (prop. 4.14) pour **éliminer** des candidats.
6. **Comparer toutes les valeurs** des candidats retenus.
7. **Global ?** Si l'étape 1 a donné l'existence, oui. Sinon, chercher une direction où $f$ descend (ou monte) plus loin, avec une **valeur numérique explicite**.

**Comment calculer $C(a)$ sans se tromper — la règle des contraintes actives.**

$$A = \{h_1 \le 0,\ \dots,\ h_q \le 0\} \quad \Longrightarrow \quad C(a) \supset \{h : \langle \nabla h_j(a), h\rangle < 0 \text{ pour tout } j \text{ actif en } a\}$$

Concrètement, pour un pavé :

| Position de $a$ | Contraintes saturées | $C(a)$ |
|---|---|---|
| intérieur | aucune | $\mathbb{R}^n$ |
| face $x_i = $ borne inférieure | une | $\{h_i \ge 0\}$ |
| face $x_i = $ borne supérieure | une | $\{h_i \le 0\}$ |
| sommet | toutes | l'intersection des demi-espaces |

**Le contrôle de cohérence à faire systématiquement.** Si $a$ est intérieur, $C(a) = \mathbb{R}^n$ et l'inéquation d'Euler doit redonner $\nabla f(a) = 0$. Si ce n'est pas le cas, votre cône est faux.

## 🔴 Common mistakes

1. **Appliquer $\nabla f(a)=0$ sur la frontière.** La proposition 4.11 exige $a \in \mathring A$. Dans l'exercice 4.3, le minimum est en $(0,1)$ où $\nabla f = (0,-2) \neq 0$.
2. **Oublier complètement la frontière.** Dans l'exercice 4.4, il n'y a **aucun** point critique dans $A$ : une résolution par $\nabla f=0$ seul ne trouve rien.
3. **Confondre point critique et extremum.** Trois des quatre points critiques de l'exercice 4.2 sont des selles.
4. **Oublier le carré dans $rt-s^2$.** C'est $rt - s^2$, pas $rt-s$. Et $s$ est la dérivée croisée, pas son double.
5. **Conclure quand $rt-s^2=0$.** Le cours écrit explicitement *« on ne peut rien conclure »*. Il faut alors étudier le signe de $f(a+h)-f(a)$ directement.
6. **Oublier de vérifier le signe de $r$ quand $rt-s^2>0$.** Sans lui, on ne sait pas si c'est un minimum ou un maximum.
7. **Croire qu'un minimum local est global.** L'exercice 4.7 est fait pour ça : $(1,1)$ vaut $-1$, et $f(-10,-10) = -2300$.
8. **Prendre les mineurs dans le mauvais ordre.** Ce sont les mineurs **principaux dominants** (en haut à gauche), et il faut vérifier **tous** les ordres $1$ à $n$, pas seulement le déterminant.
9. **Croire que l'inéquation d'Euler est suffisante.** Dans l'exercice 4.3, elle est vérifiée en $(0,0)$ qui n'est pourtant pas un minimum local.
10. **Oublier que $C(a)$ contient toujours $0$.** L'inéquation d'Euler en $h=0$ est triviale ($0 \ge 0$) et n'apprend rien : ce sont les directions **non nulles** qui informent.
11. **Croire le cercle convexe.** $\{x^2+y^2=1\}$ n'est pas convexe (le **disque** l'est). La proposition 4.18 exige $U$ convexe.
12. **Utiliser le théorème 4.20 sans vérifier la convexité de $U$ ET de $f$.** Les deux hypothèses y sont, et la première est souvent oubliée.

## 📌 Ultimate Review

**Le §4.3 à §4.5 en un paragraphe.** À l'intérieur d'un ensemble, un extremum local annule le gradient (**équation d'Euler**, prop. 4.11) et sa hessienne y est semi-définie du bon signe. Sur la frontière, on ne dispose que des **directions admissibles** — le cône $C(a)$ — et la condition s'affaiblit en **inéquation d'Euler** : $\langle\nabla f(a),h\rangle \ge 0$ pour tout $h$ admissible (prop. 4.14). Réciproquement, une hessienne **définie** positive ou négative en un point critique **conclut** (thm 4.15) ; si elle est indéfinie, c'est un **point selle** — la nouveauté par rapport à la dimension 1. En dimension 2, tout se lit sur $rt-s^2$ et le signe de $r$ (thm 4.16), avec le cas $rt-s^2=0$ laissé sans conclusion. Enfin, si $f$ est **convexe** sur un ouvert convexe, $\nabla f(a)=0$ devient **nécessaire et suffisant** et donne le minimum **global** (thm 4.20).

**Les sept énoncés à savoir citer.**

| N° | Énoncé | Usage |
|---|---|---|
| **4.11** | $a\in\mathring A$ extremum ⟹ $\nabla f(a)=0$ | **équation** d'Euler |
| **4.12** | $\nabla f(a)=0$ : **point critique** | le vocabulaire |
| **4.13** | $C(a)$ : directions admissibles | la frontière |
| **4.14** | $\forall h\in C(a),\ \langle\nabla f(a),h\rangle\ge0$ (min) | **inéquation** d'Euler |
| **4.15** | $H_f$ définie positive/négative/indéfinie ⟹ min/max/**selle** | conclure |
| **4.16** | $rt-s^2>0$ et $r>0$ ⟹ min ; $<0$ ⟹ selle ; $=0$ ⟹ **rien** | dimension 2 |
| **4.20** | $f$ convexe : $\nabla f(a)=0 \iff$ min **global** | le raccourci |

**Les six exercices du polycopié, avec leurs réponses.**

| Ex. | Fonction | Réponse |
|---|---|---|
| **4.2** | $xy(x+y-1)$ | 4 points critiques ; seul $(1/3,1/3)$ est un min local, $-1/27$ |
| **4.3** | $x^4-y^2$ sur $\mathbb{R}_+\times[0,1]$ | min $-1$ en $(0,1)$, **sur le bord**, $\nabla f \neq 0$ |
| **4.4** | $(x-4)^2+(y-1)^2$ sur $[0,2]^2$ | min $4$ en $(2,1)$ ; max $17$ en $(0,0)$ **et** $(0,2)$ |
| **4.5** | $x^4+y^4+z^4-4x-4y-4z$ | min **global** $-9$ en $(1,1,1)$, unique point critique |
| **4.6** | $x^3-3x+y^2+z^2+yz$ | min local $-2$ en $(1,0,0)$ ; **selle** en $(-1,0,0)$ ; aucun global |
| **4.7** | $x^3+y^3-3xy$ | selle en $(0,0)$ ; min local $-1$ en $(1,1)$, **non global** |

**Le raisonnement le plus rentable du cours** (exercice 4.5) : *existence globale (coercivité) + domaine ouvert + un seul point critique ⟹ c'est lui.* Aucune étude de nature nécessaire.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Énoncer l'équation d'Euler et sa démonstration en deux lignes.**

</summary>

**Prop. 4.11** : si $a \in \mathring A$ est un extremum local de $f$, de classe $C^1$ au voisinage de $a$, alors $\nabla f(a) = 0$.

**Preuve** : pour tout $h$, la fonction $\varphi(t) = f(a+th)$ est définie sur un voisinage de $0$ (car $a$ est **intérieur**) et $0$ y est un extremum local intérieur. La proposition 3.4 donne $\varphi'(0)=0$, soit $\langle\nabla f(a),h\rangle = 0$. Vrai pour tout $h$ (prendre $h=\nabla f(a)$) : $\nabla f(a)=0$. ∎

C'est le chapitre 3 **transporté le long de chaque droite**, via la proposition 4.6.

</details>

<details class="details--riche">
<summary>

**2. Définir le cône $C(a)$ et le donner pour l'intérieur, une arête et un sommet de $[0,2]^2$.**

</summary>

**Déf. 4.13** : $h \in C(a)$ s'il existe $\alpha>0$ tel que $a+th \in A$ pour tout $t\in[0,\alpha]$.

Pour $A=[0,2]^2$ :

| Position | $C(a)$ |
|---|---|
| intérieur | $\mathbb{R}^2$ |
| arête $x=0$, $0<y<2$ | $\{h_1 \ge 0\}$ (demi-plan, $h_2$ libre) |
| sommet $(0,0)$ | $\{h_1\ge0,\ h_2\ge0\}$ (quart de plan) |

**La règle** : le cône ne retient que les contraintes **saturées** en $a$ — c'est déjà la notion de contrainte active du §6.1.

Cas extrêmes du cours : $a$ intérieur ⟹ $C(a)=\mathbb{R}^d$ ; $A$ un **cercle** ⟹ $C(a)=\{0\}$ en tout point.

</details>

<details class="details--riche">
<summary>

**3. Énoncer l'inéquation d'Euler et montrer qu'elle contient l'équation d'Euler.**

</summary>

**Prop. 4.14** : si $a\in A$ est un minimum local, alors $\forall h\in C(a),\ \langle\nabla f(a),h\rangle \ge 0$. (Pour un maximum : $\le 0$.)

**Elle contient la prop. 4.11** : si $a\in\mathring A$, alors $C(a) = \mathbb{R}^d$. Appliquée à $h$ **et** à $-h$, elle donne $\langle\nabla f(a),h\rangle \ge 0$ et $\langle\nabla f(a),-h\rangle \ge 0$, donc $\langle\nabla f(a),h\rangle = 0$ pour tout $h$, c'est-à-dire $\nabla f(a)=0$.

**Preuve de 4.14** : $\varphi(t)=f(a+th)$ est définie sur $[0,\alpha]$ et $0$ est un minimum à **l'extrémité gauche** ; la proposition 3.4 (cas $t_0=a$) donne $\varphi'(0)\ge0$.

</details>

<details class="details--riche">
<summary>

**4. Qu'est-ce qu'un point selle ? Donner l'exemple canonique et le vérifier.**

</summary>

Un point critique où la hessienne est **non dégénérée et indéfinie** (thm 4.15, point 3) : positive dans certaines directions, négative dans d'autres. Aussi appelé **point col**.

**Exemple canonique** : $f(x,y)=x^2-y^2$ en $(0,0)$. Le gradient $(2x,-2y)$ s'y annule ; $r=2$, $t=-2$, $s=0$, donc $rt-s^2 = -4 < 0$.

**Vérification directe** : $f(u,0)=u^2 > 0$ (on monte le long de $x$) et $f(0,v)=-v^2 < 0$ (on descend le long de $y$). La valeur $f(0,0)=0$ est dépassée dans les deux sens.

**C'est la seule nouveauté de la dimension $n$** : en dimension 1, $f''(t_0)$ est un nombre et ne peut pas changer de signe.

</details>

<details class="details--riche">
<summary>

**5. Énoncer le théorème 4.16 dans ses quatre cas.**

</summary>

Pour $n=2$, en un point critique $a$, avec $r=\frac{\partial^2f}{\partial x^2}(a)$, $t=\frac{\partial^2f}{\partial y^2}(a)$, $s=\frac{\partial^2f}{\partial x\partial y}(a)$ :

| Condition | Conclusion |
|---|---|
| $rt-s^2>0$ et $r>0$ | **minimum** local |
| $rt-s^2>0$ et $r<0$ | **maximum** local |
| $rt-s^2<0$ | **point selle** (ou col) |
| $rt-s^2=0$ | **on ne peut rien conclure** |

$rt-s^2 = \det H_f(a)$ : positif ⟹ valeurs propres de même signe, négatif ⟹ signes opposés, nul ⟹ cas dégénéré.

</details>

<details class="details--riche">
<summary>

**6. Résoudre l'exercice 4.2 : points critiques de $xy(x+y-1)$.**

</summary>

$f = x^2y+xy^2-xy$, donc

$$\frac{\partial f}{\partial x} = y(2x+y-1), \qquad \frac{\partial f}{\partial y} = x(x+2y-1).$$

**Factoriser est l'étape clé.** Quatre combinaisons : $(y=0,\ x=0) \to (0,0)$ ; $(y=0,\ x=1) \to (1,0)$ ; $(2x+y=1,\ x=0) \to (0,1)$ ; $(2x+y=1,\ x+2y=1) \to (1/3,1/3)$.

**Natures** avec $r=2y$, $t=2x$, $s=2x+2y-1$ : les trois premiers ont $rt-s^2=-1<0$ (**selles**) ; le dernier a $rt-s^2 = \frac49-\frac19=\frac13>0$ avec $r=\frac23>0$ : **minimum local**, de valeur $-\frac1{27}$.

</details>

<details class="details--riche">
<summary>

**7. Dans l'exercice 4.3, pourquoi ne peut-on pas utiliser $\nabla f = 0$ ? Que donne l'inéquation d'Euler ?**

</summary>

Le minimum est en $(0,1)$, qui est sur la **frontière** de $A = \mathbb{R}_+\times[0,1]$ (deux contraintes saturées). La proposition 4.11 exige $a\in\mathring A$. Et de fait $\nabla f(0,1) = (0,-2) \neq 0$.

**Le cône** : $h_1 \ge 0$ (pour rester dans $x\ge0$) et $h_2\le0$ (pour rester dans $y\le1$), soit $C(0,1) = \{h_1\ge0,\ h_2\le0\}$.

**L'inéquation** : $\langle(0,-2),h\rangle = -2h_2 \ge 0$ car $h_2\le0$. Le point passe le test.

⚠️ **Mais le test n'est pas suffisant** : en $(0,0)$, $\nabla f = (0,0)$ et l'inéquation est vérifiée aussi, alors que $f(0,y)=-y^2 < 0 = f(0,0)$ : ce n'est pas un minimum local.

</details>

<details class="details--riche">
<summary>

**8. Résoudre l'exercice 4.4 par la voie géométrique.**

</summary>

$f(x,y) = x^2+y^2-8x-2y+17 = (x-4)^2+(y-1)^2$ : c'est le **carré de la distance au point $P(4,1)$**, situé hors du carré $A=[0,2]^2$.

- **Plus proche** : projeter $P$ coordonnée par coordonnée sur $[0,2]$ → $(2,1)$, avec $f=4$.
- **Plus éloigné** : un sommet. Pour $x$, le plus loin de $4$ est $0$ ; pour $y$, le plus loin de $1$ dans $[0,2]$ est $0$ **ou** $2$, **à égale distance**. D'où **deux** maxima : $(0,0)$ et $(0,2)$, avec $f=17$.

**Contrôle** : $f(2,1)=4+1-16-2+17=4$ ; $f(0,0)=17$ ; $f(0,2)=4-4+17=17$.

**Le point crucial** : $\nabla f = 0$ donnerait $(4,1) \notin A$. Il n'y a **aucun point critique dans $A$**, donc tous les extrema sont sur le bord — d'où la nécessité du cône.

</details>

<details class="details--riche">
<summary>

**9. Quel est le raisonnement en trois temps de l'exercice 4.5, et pourquoi est-il si économique ?**

</summary>

Pour $f(x,y,z)=x^4+y^4+z^4-4x-4y-4z$ :

1. **Existence** : $f$ est coercive, donc elle admet un minimum global sur $\mathbb{R}^3$ (thm 4.9).
2. **Le domaine $\mathbb{R}^3$ est ouvert**, donc ce minimum est intérieur, donc **critique** (prop. 4.11).
3. **Il n'y a qu'un point critique**, $(1,1,1)$ (car $u\mapsto u^3$ est une bijection). C'est donc lui, avec $f(1,1,1) = -9$.

**Pourquoi c'est économique** : aucune hessienne à calculer, aucune nature à étudier, aucune comparaison de valeurs. **L'existence + l'unicité du candidat concluent seules.**

C'est le schéma que reprendra la méthodologie du §6.4 (fiche 605).

</details>

<details class="details--riche">
<summary>

**10. Énoncer le théorème 4.20 et expliquer pourquoi il change tout.**

</summary>

**Thm 4.20** : si $U$ est un ouvert **convexe** et $f\in C^1(U)$ **convexe**, alors $a$ est un minimum **global** de $f$ **ssi** $\nabla f(a)=0$.

**Preuve du sens réciproque** : par la proposition 4.18 (caractérisation 2), $f(y) \ge f(a) + \langle\nabla f(a), y-a\rangle = f(a)$ pour tout $y$, puisque $\nabla f(a)=0$. ∎

**Ce que ça change** :

|  | Cas général | Cas convexe |
|---|---|---|
| $\nabla f = 0$ donne | des candidats | **la réponse** |
| Hessienne à calculer | oui | non |
| Valeurs à comparer | oui | non |
| Portée | locale | **globale** |
| Points selles | possibles | **aucun** |

C'est la transposition du résultat de la fiche 601 en dimension 1, et le fondement de toute l'optimisation convexe.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Équation d'Euler (4.11) ? | $a\in\mathring A$ extremum ⟹ $\nabla f(a)=0$ |
| Son hypothèse indispensable ? | $a$ **intérieur** |
| Sa preuve ? | $\varphi(t)=f(a+th)$ + proposition 3.4 |
| Point critique (4.12) ? | $\nabla f(a)=0$ |
| Point critique ⟹ extremum ? | **Non** |
| Condition d'ordre 2 nécessaire (min) ? | $H_f(a)$ **semi-définie positive** |
| Direction admissible (4.13) ? | $\exists\alpha>0,\ \forall t\in[0,\alpha],\ a+th\in A$ |
| $C(a)$ si $a$ intérieur ? | $\mathbb{R}^d$ |
| $C(a)$ si $A$ est un **cercle** ? | $\{0\}$ |
| $C(a)$ au sommet de $[0,2]^2$ ? | Un **quart** de plan |
| $C(a)$ sur une arête ? | Un **demi**-plan |
| La règle générale ? | Seules comptent les contraintes **saturées** |
| Inéquation d'Euler, min (4.14) ? | $\forall h\in C(a),\ \langle\nabla f(a),h\rangle\ge0$ |
| Pour un maximum ? | $\le 0$ |
| Elle contient 4.11 car ? | $C(a)=\mathbb{R}^d$ : $h$ **et** $-h$ ⟹ égalité |
| Est-elle suffisante ? | **Non** — cf. $(0,0)$ dans l'exercice 4.3 |
| $H_f(a)$ définie positive ⟹ ? | **Minimum** local (4.15) |
| Définie négative ⟹ ? | **Maximum** local |
| Non dégénérée et indéfinie ⟹ ? | **Point selle** (ou col) |
| L'exemple canonique ? | $x^2-y^2$ en $(0,0)$ |
| Les deux méthodes citées par le cours ? | Réduction de **Gauss**, **mineurs principaux** |
| Critère en dimension 2 ? | $rt-s^2$ et le signe de $r$ |
| $rt-s^2>0$, $r>0$ ? | **Minimum** local |
| $rt-s^2>0$, $r<0$ ? | **Maximum** local |
| $rt-s^2<0$ ? | **Point selle** |
| $rt-s^2=0$ ? | **On ne peut rien conclure** |
| $rt-s^2$ vaut ? | $\det H_f(a)$ |
| Exercice 4.2 : combien de points critiques ? | **Quatre** |
| Lesquels ? | $(0,0)$, $(1,0)$, $(0,1)$, $(1/3,1/3)$ |
| Combien sont des extrema ? | **Un seul** — $(1/3,1/3)$, min local $-1/27$ |
| Exercice 4.3 : le minimum ? | $-1$ en $(0,1)$ |
| $\nabla f$ y vaut ? | $(0,-2)\neq0$ — **c'est le bord** |
| Exercice 4.4 : $f$ s'écrit ? | $(x-4)^2+(y-1)^2$ |
| C'est donc ? | Le carré de la **distance à $(4,1)$** |
| Le minimum ? | $4$ en $(2,1)$ |
| Le maximum ? | $17$ en $(0,0)$ **et** $(0,2)$ |
| Pourquoi le cône est-il indispensable ici ? | Il n'y a **aucun point critique dans $A$** |
| Exercice 4.5 : réponse ? | Min global $-9$ en $(1,1,1)$ |
| Le raisonnement ? | Coercivité + ouvert + **un seul** point critique |
| Exercice 4.6 : les deux points ? | $(1,0,0)$ min local $-2$ ; $(-1,0,0)$ **selle** |
| Extrema globaux ? | **Aucun** — $x^3$ n'est pas minorée |
| La différence 4.5 / 4.6 ? | Degré **pair** contre **impair** du terme dominant |
| Exercice 4.7 : les points ? | $(0,0)$ selle ; $(1,1)$ min local $-1$ |
| Global ? | **Non** : $f(-10,-10)=-2300$ |
| Ensemble convexe (4.17) ? | Le **segment** entre deux points y reste |
| Le cercle est-il convexe ? | **Non** — le disque, oui |
| Prop. 4.18, caractérisation 2 ? | $f(y)\ge f(x)+\langle\nabla f(x),y-x\rangle$ |
| En français ? | Au-dessus de ses **plans tangents** |
| Prop. 4.19 ? | $f$ convexe $\iff H_f(x)\succeq0$ partout |
| Théorème 4.20 ? | $f$ convexe : $\nabla f(a)=0 \iff$ min **global** |
| Théorème 4.21 ? | $f$ concave : $\nabla f(a)=0 \iff$ max **global** |
| Ce que la convexité supprime ? | Ordre 2, comparaisons, **et les points selles** |
|  |  |
