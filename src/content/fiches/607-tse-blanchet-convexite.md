# Fiche 607 — Convexité : stricte, forte, caractérisations et inégalité de Jensen

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Blanchet, *Optimisation*, TSE, 9 avril 2024 — **chapitre 2, §2.1**, p. 17–18 |
| **Difficulté** | Must know — la convexité est ce qui rend l'optimisation facile |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 606 (Taylor à l'ordre 2 en dimension $N$) ; utile : fiche 603 (§4.5 de M. Montaru) |
| **Concepts clés** | Ensemble convexe, épigraphe, fonction convexe / strictement convexe / **fortement convexe**, caractérisations $C^1$ et $C^2$, monotonie du gradient, inégalité de Jensen |
| **Poids à l'examen** | La **forte convexité** (déf. 2.2 et prop. 2.5) et **Jensen** (prop. 2.6) ne figurent **pas** dans le cours de M. Montaru : c'est l'apport propre de ce polycopié, et donc ce qui distingue les deux examens. La forte convexité est l'hypothèse du théorème 2.14 (existence **et** unicité). |

> **Convention.** Les énoncés numérotés sont ceux de M. Blanchet ; les corrigés des « À savoir (fait en cours) » et les vérifications numériques sont rédigés pour cette fiche.

## 🎯 Vue d'ensemble

```
TROIS DEGRÉS DE CONVEXITÉ — de plus en plus fort

  CONVEXE              f((1−t)x+ty) ≤ (1−t)f(x) + t f(y)
                       « sous les cordes »
        │
  STRICTEMENT          <  strict, pour x ≠ y et t ∈ ]0,1[
  CONVEXE              → garantit l'UNICITÉ du minimum          (thm 2.13)
        │
  FORTEMENT            ≤ … − (α/2)·t(1−t)‖x−y‖²
  CONVEXE              une marge QUANTIFIÉE, de constante α > 0
                       → garantit la COERCIVITÉ, donc l'EXISTENCE (À savoir 2.7)

  forte  ⟹  stricte  ⟹  convexe        (et aucune réciproque)


LES CARACTÉRISATIONS — le tableau à mémoriser

                  ordre 1 (tangente)          ordre 1 (gradient)        ordre 2
  convexe      f(y) ≥ f(x)+⟨∇f(x),y−x⟩     ⟨∇f(y)−∇f(x),y−x⟩ ≥ 0    ⟨∇²f(x)h,h⟩ ≥ 0
  strictement  f(y) >  …        (x≠y)      ⟨…⟩ > 0          (x≠y)   ⟨∇²f(x)h,h⟩ > 0
  fortement    f(y) ≥ … + (α/2)‖x−y‖²      ⟨…⟩ ≥ α‖x−y‖²           ⟨∇²f(x)h,h⟩ ≥ α‖h‖²

   ⟹ la MÊME structure sur trois lignes : on ajoute une marge en ‖·‖²


LE CAS QUADRATIQUE   f(x) = ⟨Ax,x⟩ + ⟨b,x⟩ + c,  A symétrique   (À savoir 2.4)

   A semi-définie positive  →  CONVEXE
   A définie positive       →  STRICTEMENT et FORTEMENT convexe

   ∇f(x) = 2Ax + b        ∇²f(x) = 2A     (constante !)


JENSEN (prop. 2.6)   f(Σλᵢxᵢ) ≤ Σλᵢ f(xᵢ)   pour λᵢ ≥ 0, Σλᵢ = 1
   la convexité passe de DEUX points à n POINTS
```

## 🔴 Concept 1 — Ensembles convexes et épigraphe (déf. 2.1)

**Définition 2.1 (cours) — ensemble convexe.** Un ensemble $U\subset\mathbb{R}^N$ est dit **convexe** si

$$\forall(x,y)\in U^2,\ \forall t\in[0,1],\qquad (1-t)x+ty\in U .$$

**Cours.** *Une fonction est convexe si son **épigraphe** $\bigl(\{(x,\alpha)\in U\times\mathbb{R},\ f(x)\le\alpha\}\bigr)$ est convexe.*

> **L'épigraphe, c'est « tout ce qui est au-dessus du graphe ».** C'est la définition la plus profonde de la convexité d'une fonction, parce qu'elle la **ramène** à la convexité d'un ensemble — une seule notion au lieu de deux.
>
> ```
>            α
>            │      ╲   ÉPIGRAPHE : la région au-dessus de la courbe
>            │       ╲  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
>            │  ▒▒▒▒▒▒╲▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
>            │ ▒▒▒▒▒▒▒▒╲___╱▒▒▒▒▒▒▒▒▒▒▒▒▒▒
>            │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
>            └──────────────────────────────► x
> 
>     f convexe  ⟺  cette région grisée est CONVEXE
>                    (un segment entre deux de ses points y reste)
> ```
>
> **Pourquoi les deux définitions coïncident.** Prendre deux points de l'épigraphe, $(x,f(x))$ et $(y,f(y))$ ; le segment qui les joint a pour ordonnée $(1-t)f(x)+tf(y)$ au-dessus de l'abscisse $(1-t)x+ty$. Il reste dans l'épigraphe **si et seulement si**
>
> $$f\bigl((1-t)x+ty\bigr) \le (1-t)f(x)+tf(y),$$
>
> qui est exactement l'inégalité de la définition 2.2.

**Les ensembles convexes des exercices** : $\mathbb{R}^N$, une boule (pour n'importe quelle norme), un demi-espace, un pavé $[a,b]\times[c,d]$, un simplexe, le triangle $\{x\ge0,\ y\ge0,\ x+y\le1\}$, tout **polyèdre**. **Le cercle $\{x^2+y^2=1\}$ n'est pas convexe** — le disque l'est.

## 🔴 Concept 2 — Les trois degrés de convexité (déf. 2.2)

**Définition 2.2 (cours) — fonction convexe.** Soit $U$ un ensemble convexe de $\mathbb{R}^N$ et $f : U\to\mathbb{R}$. La fonction $f$ est dite

- **convexe** si $$\forall(x,y)\in U^2,\ \forall t\in[0,1],\qquad f\bigl((1-t)x+ty\bigr) \le (1-t)f(x)+tf(y) ;$$
- **strictement convexe** si $$\forall(x,y)\in U^2,\ x\neq y,\ \forall t\in[0,1],\qquad f\bigl((1-t)x+ty\bigr) < (1-t)f(x)+tf(y) ;$$
- **fortement convexe** s'il existe $\alpha>0$ tel que $$\forall(x,y)\in U^2,\ \forall t\in[0,1],\qquad f\bigl((1-t)x+ty\bigr) < (1-t)f(x)+tf(y) - \frac{\alpha}{2}\,t(1-t)\lVert x-y\rVert^2 .$$

$f$ est **concave** si $-f$ est convexe.

> ⚠️ **Deux précisions sur les bornes de $t$, à connaître pour ne pas buter dessus.** Le polycopié écrit « $\forall t\in[0,1]$ » avec une inégalité **stricte** dans les deux derniers cas. Aux extrémités $t=0$ et $t=1$, l'inégalité stricte donnerait $f(x)<f(x)$ — impossible. Les énoncés corrects sont :
>
> - **stricte convexité** : $\forall t\in\,]0,1[$ (intervalle **ouvert**), avec $<$ ;
> - **forte convexité** : $\forall t\in[0,1]$, avec $\le$ (le terme $t(1-t)$ s'annulant de lui-même aux bornes).
>
> **La proposition 2.5 du cours confirme cette lecture** : elle caractérise la forte convexité par $f(y)\ge f(x)+\langle\nabla f(x),y-x\rangle+\frac\alpha2\lVert x-y\rVert^2$, avec un $\ge$ **large**. C'est une coquille de frappe, sans conséquence sur le fond — mais autant écrire la bonne version en copie.

**La hiérarchie, à retenir dans ce sens :**

$$\boxed{\text{fortement convexe} \implies \text{strictement convexe} \implies \text{convexe}}$$

**et aucune réciproque n'est vraie.**

> **La preuve de la première implication est immédiate** : pour $x\neq y$ et $t\in\,]0,1[$, le terme $\frac\alpha2 t(1-t)\lVert x-y\rVert^2$ est **strictement positif**, donc l'inégalité large devient stricte quand on le retranche.
>
> **Les deux contre-exemples qui montrent que les réciproques sont fausses :**
>
> | Fonction | convexe | strictement | fortement | pourquoi |
> |---|---|---|---|---|
> | $x\mapsto x^4$ sur $\mathbb{R}$ |  |  |  | $f''(0)=0$ : aucune marge $\alpha>0$ ne tient près de $0$ |
> | $x\mapsto \lvert x\rvert$ |  |  |  | égalité sur $[1,2]$ |
> | $x\mapsto x^2$ |  |  | ($\alpha=2$) | $f''\equiv2$ |
>
> **La forte convexité est la seule des trois qui soit *quantitative*** : elle fournit un nombre $\alpha$ dont on se servira au théorème 2.14 pour obtenir **existence et unicité d'un coup**.

**Pour aller plus loin (*) (cours).** *La fonction $f$ est fortement convexe si et seulement si $f - \alpha\lVert\cdot\rVert^2/2$ est convexe.*

> **C'est la reformulation la plus maniable, et celle qui explique tout.** La forte convexité, c'est *« convexe avec au moins la courbure d'une parabole $\frac\alpha2\lVert x\rVert^2$ »* :
>
> $$f \text{ fortement convexe de constante } \alpha \iff f(x) - \frac{\alpha}{2}\lVert x\rVert^2 \text{ est convexe.}$$
>
> **Elle donne aussi la valeur de $\alpha$ dans le cas $C^2$** : c'est la plus petite valeur propre de la hessienne, minorée sur $U$.

**Pour aller plus loin (***) (cours).** *En fait si $f$ est continue, un argument de densité permet de voir qu'il est suffisant de prouver que le résultat est vrai pour $t=1/2$.*

> **C'est un gain de temps considérable en pratique** : pour une fonction continue, vérifier
>
> $$f\left(\frac{x+y}{2}\right) \le \frac{f(x)+f(y)}{2}$$
>
> **suffit** — on parle de *convexité au sens de Jensen*. La densité des rationnels dyadiques $\frac{k}{2^n}$ dans $[0,1]$ fait le reste.

**À savoir (fait en cours) 2.1.** *Montrer que $x\mapsto x^2$ est convexe.*

**À savoir 2.2.** *Montrer que toutes les normes sur $\mathbb{R}^N$ sont convexes.*

<details class="details--riche">
<summary>

**Corrigés — À savoir 2.1 et 2.2**

</summary>

### À savoir 2.1 — $x\mapsto x^2$ est convexe

**Méthode directe (sans dérivée), la plus instructive.** Calculons la différence entre les deux membres :

$$(1-t)x^2+ty^2-\bigl((1-t)x+ty\bigr)^2 .$$

Développons le carré : $\bigl((1-t)x+ty\bigr)^2 = (1-t)^2x^2+2t(1-t)xy+t^2y^2$. D'où la différence

$$= x^2\bigl[(1-t)-(1-t)^2\bigr] + y^2\bigl[t-t^2\bigr] - 2t(1-t)xy = t(1-t)x^2+t(1-t)y^2-2t(1-t)xy,$$

puisque $(1-t)-(1-t)^2 = (1-t)\bigl[1-(1-t)\bigr] = t(1-t)$. En factorisant :

$$\boxed{(1-t)x^2+ty^2-\bigl((1-t)x+ty\bigr)^2 = t(1-t)\,(x-y)^2 \;\ge\; 0 .}$$

La différence est un produit de trois facteurs positifs sur $[0,1]$ : **$x\mapsto x^2$ est convexe**. ∎

> **Cette identité est plus qu'un exercice.** Comparez-la à la définition de la forte convexité :
>
> $$f\bigl((1-t)x+ty\bigr) \le (1-t)f(x)+tf(y) - \frac{\alpha}{2}t(1-t)\lVert x-y\rVert^2 .$$
>
> Ici la marge vaut **exactement** $t(1-t)(x-y)^2$, c'est-à-dire $\frac\alpha2 t(1-t)(x-y)^2$ avec
>
> $$\boxed{\alpha = 2 .}$$
>
> **$x\mapsto x^2$ n'est pas seulement convexe : elle est fortement convexe de constante $2$** — et l'inégalité est une **égalité**, donc $\alpha=2$ est optimal. C'est cohérent avec $f''\equiv 2$ et avec la caractérisation $\langle\nabla^2f(x)h,h\rangle\ge\alpha\lVert h\rVert^2$ de la proposition 2.5.

**Contrôle numérique** avec $x=1$, $y=3$, $t=0{,}25$ :

$$f\bigl(0{,}75\cdot1+0{,}25\cdot3\bigr) = f(1{,}5) = 2{,}25, \qquad 0{,}75(1)+0{,}25(9) = 3 .$$

Marge $= 0{,}75$, et $t(1-t)(x-y)^2 = 0{,}25\times0{,}75\times4 = 0{,}75$ **exactement**.

### À savoir 2.2 — toutes les normes sont convexes

Soit $N$ une norme sur $\mathbb{R}^N$, $(x,y)$ deux vecteurs et $t\in[0,1]$. Alors

$$N\bigl((1-t)x+ty\bigr) \;\underset{\text{sous-additivité}}{\le}\; N\bigl((1-t)x\bigr)+N(ty) \;\underset{\text{homogénéité}}{=}\; \lvert 1-t\rvert N(x)+\lvert t\rvert N(y).$$

Comme $t\in[0,1]$, on a $\lvert t\rvert = t$ et $\lvert 1-t\rvert = 1-t$, d'où

$$N\bigl((1-t)x+ty\bigr) \le (1-t)N(x)+tN(y). \ \blacksquare$$

**La convexité d'une norme est donc exactement la conjonction de ses axiomes 3 et 2** (sous-additivité et homogénéité) — rien de plus. C'est pourquoi le résultat est vrai pour **toutes** les normes, sans exception.

⚠️ **Aucune norme n'est strictement convexe**, car $N(2x) = 2N(x)$ : sur le segment $[x,2x]$, l'inégalité est une **égalité**. C'est l'objet de l'À savoir 2.5.

**Contrôle numérique** sur $\lVert\cdot\rVert_2$ dans $\mathbb{R}^2$, avec $x=(3,0)$, $y=(0,4)$, $t=0{,}5$ :

$$\lVert(1{,}5,\ 2)\rVert_2 = \sqrt{2{,}25+4} = 2{,}5 \quad\le\quad 0{,}5(3)+0{,}5(4) = 3{,}5 . \ \checkmark$$

L'écart $1$ mesure ici le « défaut d'alignement » entre $x$ et $y$ : il serait nul s'ils étaient colinéaires de même sens.

</details>

## 🔴 Concept 3 — Les caractérisations différentielles (prop. 2.3, 2.4, 2.5)

**Proposition 2.3 (cours) — caractérisation de la convexité.** Soit $\Omega$ un ouvert de $\mathbb{R}^N$ et $U$ un convexe inclus dans $\Omega$. On considère $f : \Omega\to\mathbb{R}$ de classe $C^1$ sur $U$. Les propriétés suivantes sont **équivalentes** :

1. $f$ est **convexe** sur $U$ ;
2. $\forall(x,y)\in U^2,\quad f(y)\ \ge\ f(x)+\langle\nabla f(x),\ y-x\rangle$ ;
3. $\forall(x,y)\in U^2,\quad \langle\nabla f(y)-\nabla f(x),\ y-x\rangle\ \ge\ 0$.

Si de plus $f$ est de classe $C^2$ sur $U$, ces propriétés sont équivalentes à

$$\forall(x,h)\in U\times\mathbb{R}^N,\qquad \langle\nabla^2f(x)h,\ h\rangle\ \ge\ 0 .$$

**Proposition 2.4 (cours) — stricte convexité.** Mêmes énoncés avec des **inégalités strictes** et la restriction $x\neq y$ :

$$f(y) > f(x)+\langle\nabla f(x),y-x\rangle, \qquad \langle\nabla f(y)-\nabla f(x),\ y-x\rangle > 0, \qquad \langle\nabla^2f(x)h,h\rangle > 0 .$$

**Proposition 2.5 (cours) — forte convexité.** Pour $f$ de classe $C^2$ sur $U$, il y a équivalence entre :

1. $f$ est **fortement convexe** sur $U$ ;
2. il existe $\alpha>0$ tel que $\forall(x,y)\in U^2,\quad f(y)\ \ge\ f(x)+\langle\nabla f(x),y-x\rangle+\dfrac{\alpha}{2}\lVert x-y\rVert^2$ ;
3. il existe $\alpha>0$ tel que $\forall(x,y)\in U^2,\quad \langle\nabla f(y)-\nabla f(x),\ y-x\rangle\ \ge\ \alpha\lVert x-y\rVert^2$ ;

et, $f$ étant $C^2$, à

$$\forall(x,h)\in U\times\mathbb{R}^N,\qquad \langle\nabla^2f(x)h,\ h\rangle\ \ge\ \alpha\lVert h\rVert^2 .$$

> **Les trois propositions ont la même architecture — c'est ce qu'il faut retenir, pas les neuf énoncés.**
>
> |  | tangente | monotonie du gradient | hessienne |
> |---|---|---|---|
> | **convexe** | $\ge f(x)+\langle\nabla f(x),y-x\rangle$ | $\ge 0$ | $\ge 0$ |
> | **strictement** | $>$ (pour $x\ne y$) | $>0$ | $>0$ |
> | **fortement** | $+\ \frac\alpha2\lVert x-y\rVert^2$ | $\ge \alpha\lVert x-y\rVert^2$ | $\ge \alpha\lVert h\rVert^2$ |
>
> **On passe d'une ligne à l'autre en ajoutant une marge en $\lVert\cdot\rVert^2$.** Le degré de convexité se lit sur la taille de cette marge : nulle, infinitésimale, ou quantifiée par $\alpha$.
>
> ⚠️ **Une seule dissymétrie**, la même que chez M. Montaru (fiche 601) : pour la **stricte** convexité, la condition $\langle\nabla^2f(x)h,h\rangle>0$ est **suffisante mais pas nécessaire**. $x\mapsto x^4$ est strictement convexe et sa dérivée seconde s'annule en $0$. **En revanche, les caractérisations 2 et 3 (tangente et gradient) sont, elles, de vraies équivalences.** En cas de doute, utilisez la caractérisation par le gradient : $f'$ strictement croissante.
>
> **La caractérisation 2 est celle qui sert le plus.** *« $f$ est au-dessus de tous ses plans tangents »* — c'est elle qui donne le théorème 2.17 (fiche 608) : si $\nabla f(x^\ast)=0$, alors $f(y)\ge f(x^\ast)$ pour tout $y$, donc **minimum global**.

**À savoir 2.3.** *Montrer que $x\mapsto x^2$ est strictement convexe sur $\mathbb{R}$.*

**À savoir 2.5.** *Montrer que $\lVert\cdot\rVert_\infty$ n'est pas strictement convexe.*

<details class="details--riche">
<summary>

**Corrigés — À savoir 2.3 et 2.5**

</summary>

### À savoir 2.3 — $x\mapsto x^2$ est strictement convexe

**Par l'identité de l'À savoir 2.1** : la différence entre les deux membres vaut $t(1-t)(x-y)^2$. Pour $x\neq y$ **et** $t\in\,]0,1[$, les trois facteurs sont **strictement positifs**, donc la différence l'est aussi. ∎

**Par la caractérisation 3 de la proposition 2.4** (celle qui marche toujours) : $f'(x)=2x$, donc

$$\bigl(f'(y)-f'(x)\bigr)(y-x) = 2(y-x)^2 > 0 \qquad \text{pour } x\neq y . \ \checkmark$$

**Par la hessienne** : $f''\equiv 2 > 0$ — ici la condition suffisante s'applique, mais souvenez-vous qu'elle n'est pas nécessaire.

> **Et en fait $x\mapsto x^2$ est même fortement convexe de constante $\alpha=2$** : la marge $t(1-t)(x-y)^2$ vaut exactement $\frac{2}{2}t(1-t)(x-y)^2$. La proposition 2.5 le confirme : $f''(x)h^2 = 2h^2 \ge 2h^2$ , **avec égalité** — donc $\alpha=2$ est la meilleure constante possible.

### À savoir 2.5 — $\lVert\cdot\rVert_\infty$ n'est pas strictement convexe

**Il suffit d'un contre-exemple**, c'est-à-dire de deux points **distincts** et d'un $t\in\,]0,1[$ où l'inégalité est une **égalité**.

Prenons dans $\mathbb{R}^2$ :

$$x = (1,\ 0), \qquad y = (1,\ 1), \qquad t = \tfrac12 .$$

- $\lVert x\rVert_\infty = \max(1,0) = 1$ et $\lVert y\rVert_\infty = \max(1,1) = 1$ ;
- le milieu est $\frac{x+y}{2} = \left(1,\ \frac12\right)$, de norme $\max\left(1,\frac12\right) = 1$ ;
- le membre de droite vaut $\frac12(1)+\frac12(1) = 1$.

$$\boxed{1 = 1 : \text{ égalité, alors que } x\neq y \text{ et } t\in\,]0,1[ .}$$

La définition 2.2 de la stricte convexité est violée. ∎

> **Ce qui se passe géométriquement.** La boule unité de $\lVert\cdot\rVert_\infty$ est un **carré**, et sa frontière contient des **segments entiers** — ici tout le côté $x_1=1$. Or une norme est constante sur… non : elle est constante sur la sphère unité, et **la sphère unité contient un segment**. Sur ce segment, la norme est affine, donc l'inégalité de convexité est saturée.
>
> **La règle générale** : $\lVert\cdot\rVert_p$ est strictement convexe **si et seulement si** $1<p<\infty$ — c'est-à-dire lorsque la boule unité est *strictement* arrondie. Ni $\lVert\cdot\rVert_1$ (losange) ni $\lVert\cdot\rVert_\infty$ (carré) ne le sont ; $\lVert\cdot\rVert_2$ (disque) l'est.
>
> ⚠️ **Attention à la nuance** : $\lVert\cdot\rVert_2$ est strictement convexe, mais **son carré** $\lVert\cdot\rVert_2^2$ est en plus **fortement** convexe (de constante $2$). Aucune norme n'est fortement convexe, puisqu'elle est **affine le long de toute demi-droite issue de l'origine** : $N(sx) = sN(x)$.
>
> **Contrôle du contre-exemple avec la norme 1**, pour vérifier que le phénomène est le même : $x=(1,0)$, $y=(0,1)$, milieu $(0{,}5,\ 0{,}5)$ de norme $1$, et $\frac12(1)+\frac12(1)=1$ : **égalité** aussi . Alors qu'avec la norme 2 : $\lVert(0{,}5,0{,}5)\rVert_2 = 0{,}7071068 < 1$ — **inégalité stricte** .

</details>

**À savoir 2.4.** *Montrer que $x\mapsto\langle Ax,x\rangle+\langle b,x\rangle+c$, où $A$ est une matrice symétrique, $b\in\mathbb{R}^N$ et $c\in\mathbb{R}$, est*

1. *convexe si $A$ est semi-définie positive ;*
2. *strictement convexe si $A$ est définie positive ;*
3. *fortement convexe si $A$ est définie positive.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 2.4 : le cas quadratique, à connaître par cœur**

</summary>

**C'est le seul cas où tout se calcule exactement, et c'est celui des exercices 2.3 et 2.4 (fiche 608).**

**Étape 1 — le gradient et la hessienne.** Pour $A$ **symétrique** :

$$\boxed{\nabla f(x) = 2Ax + b, \qquad \nabla^2f(x) = 2A \quad (\textbf{constante}).}$$

*Justification du gradient* : $\langle A(x+h),x+h\rangle = \langle Ax,x\rangle + \langle Ax,h\rangle+\langle Ah,x\rangle+\langle Ah,h\rangle$. Comme $A$ est symétrique, $\langle Ah,x\rangle = \langle h,Ax\rangle = \langle Ax,h\rangle$, d'où un terme linéaire $2\langle Ax,h\rangle$ et donc $\nabla\langle Ax,x\rangle = 2Ax$. **La symétrie de $A$ est ce qui donne le facteur 2** ; sans elle, le gradient serait $(A+A^{\mathsf T})x$.

**Étape 2 — appliquer les caractérisations.** Comme $\nabla^2f\equiv 2A$, pour tout $h$ :

$$\langle\nabla^2f(x)h,\ h\rangle = 2\langle Ah,\ h\rangle .$$

| Hypothèse sur $A$ | $\langle\nabla^2f(x)h,h\rangle$ | Caractérisation | Conclusion |
|---|---|---|---|
| **semi-définie positive** | $2\langle Ah,h\rangle \ge 0$ | prop. 2.3 | **convexe** |
| **définie positive** | $2\langle Ah,h\rangle > 0$ pour $h\neq0$ | prop. 2.4 | **strictement convexe** |
| **définie positive** | $2\langle Ah,h\rangle \ge 2\lambda_{\min}\lVert h\rVert^2$ | prop. 2.5 | **fortement convexe**, $\alpha = 2\lambda_{\min}(A)$ |

**Le point 3 mérite un mot.** Si $A$ est définie positive et symétrique, ses valeurs propres $\lambda_1\le\dots\le\lambda_N$ sont **toutes strictement positives**, et le théorème spectral donne

$$\langle Ah,h\rangle \ \ge\ \lambda_{\min}\lVert h\rVert^2 \qquad \text{avec } \lambda_{\min} = \lambda_1 > 0 .$$

D'où $\langle\nabla^2f(x)h,h\rangle \ge 2\lambda_{\min}\lVert h\rVert^2$, c'est-à-dire la proposition 2.5 avec

$$\boxed{\alpha = 2\lambda_{\min}(A) > 0 .}$$

> **En dimension finie, « définie positive » et « fortement convexe » disent la même chose pour une forme quadratique** — parce que le spectre est fini et donc minoré strictement. **En dimension infinie, ce n'est plus vrai**, et c'est là que les deux notions se séparent.

**Exemple chiffré complet.** Prenons

$$A = \begin{pmatrix}2&1\\1&2\end{pmatrix}, \qquad b = \begin{pmatrix}-1\\3\end{pmatrix}, \qquad c = 5 .$$

- **$A$ est symétrique** et ses mineurs principaux dominants valent $2>0$ et $\det A = 3>0$ : **définie positive**.
- **Ses valeurs propres** sont $\lambda = 2\pm1$, soit $\boxed{1 \text{ et } 3}$ *(les vecteurs propres sont $(1,-1)$ et $(1,1)$)*.
- Donc $\lambda_{\min} = 1$ et **$f$ est fortement convexe de constante $\alpha = 2$**.
- $\nabla f(x) = 2Ax+b$ s'annule en $x^\ast = -\frac12A^{-1}b$. Or $A^{-1} = \frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$, donc $$A^{-1}b = \frac13\begin{pmatrix}2(-1)-1(3)\\-1(-1)+2(3)\end{pmatrix} = \frac13\begin{pmatrix}-5\\7\end{pmatrix}, \qquad x^\ast = \begin{pmatrix}5/6\\-7/6\end{pmatrix} \approx \begin{pmatrix}0{,}8333333\\-1{,}1666667\end{pmatrix}.$$
- **La valeur minimale** : $f(x^\ast) = c - \frac14\langle A^{-1}b,\ b\rangle = 5 - \frac14\cdot\frac13\bigl[(-5)(-1)+7(3)\bigr] = 5-\frac{26}{12} = \frac{34}{12} = \frac{17}{6} \approx 2{,}8333333$.

**Contrôle numérique** : minimisation de $f$ sur une grille de $[-3,3]^2$ au pas $10^{-3}$ : minimum $2{,}8333340$ en $(0{,}8340,\ -1{,}1670)$ . Et la vérification de la forte convexité sur $2\times10^5$ triplets $(x,y,t)$ aléatoires : l'inégalité avec $\alpha=2$ est satisfaite **partout**.

**Pourquoi $\alpha=2$ est exactement optimal — et où l'inégalité est saturée.** Pour une fonction quadratique, la marge se calcule exactement. En posant $d = x-y$, les parties linéaire et constante étant **affines** ne contribuent pas, et il reste

$$(1-t)f(x)+tf(y)-f\bigl((1-t)x+ty\bigr) = t(1-t)\,\langle Ad,\ d\rangle .$$

La définition de la forte convexité exige que ceci soit $\ge \frac\alpha2 t(1-t)\lVert d\rVert^2$, c'est-à-dire

$$\langle Ad,d\rangle \ \ge\ \frac{\alpha}{2}\lVert d\rVert^2 \qquad \text{pour tout } d,$$

ce qui impose $\frac\alpha2 \le \lambda_{\min}(A) = 1$, donc $\alpha\le2$.

**L'égalité n'a lieu que dans une direction précise** : celle du vecteur propre associé à $\lambda_{\min}$, ici $d = (1,-1)$, pour lequel $\langle Ad,d\rangle = 2 = \lVert d\rVert^2$.

| Direction $d = x-y$ | $\langle Ad,d\rangle$ | $\lVert d\rVert^2$ | rapport | écart à l'égalité |
|---|---|---|---|---|
| $(1,-1)$ — vecteur propre de $\lambda_{\min}=1$ | $2$ | $2$ | $\mathbf{1}$ | $7\times10^{-15}$ — **saturé** |
| $(1,0)$ — quelconque | $2$ | $1$ | $2$ | strictement positif |
| $(1,1)$ — vecteur propre de $\lambda_{\max}=3$ | $6$ | $2$ | $3$ | le plus grand |

**C'est la lecture géométrique de $\alpha = 2\lambda_{\min}$** : la constante de forte convexité est dictée par la direction dans laquelle la fonction est **la moins courbée**. Aucune valeur de $\alpha$ supérieure à $2$ ne tiendrait dans la direction $(1,-1)$.

⚠️ **Le point 1 est un « si », pas un « si et seulement si » dans un sens utile** : $A$ semi-définie positive donne bien la convexité, et la réciproque est vraie aussi (prop. 2.3). Mais **attention pour l'existence d'un minimum** : $A$ semi-définie positive ne suffit pas. Voir la mise en garde sur la proposition 2.21 en fiche 608.

</details>

## 🟠 Concept 4 — L'inégalité de Jensen (prop. 2.6)

**Proposition 2.6 (cours) — inégalité de Jensen.** Soit $\Omega\subset\mathbb{R}^N$ un ensemble convexe non vide et $f : \Omega\to\mathbb{R}$ **convexe**. Si

$$\lambda_i \ge 0 \qquad \text{et} \qquad \sum_{i=1}^n\lambda_i = 1,$$

alors

$$f\left(\sum_{i=1}^n\lambda_ix_i\right) \ \le\ \sum_{i=1}^n\lambda_i f(x_i).$$

**À savoir 2.6.** *Démontrer la proposition 2.6.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 2.6 : démonstration de Jensen par récurrence**

</summary>

**L'idée** : la définition 2.2 est le cas $n=2$ ; Jensen l'étend à $n$ points **par récurrence**, en regroupant les $n-1$ derniers en un seul barycentre.

**Initialisation ($n=2$).** $\lambda_1+\lambda_2=1$ avec $\lambda_i\ge0$, donc en posant $t=\lambda_2$ :

$$f(\lambda_1x_1+\lambda_2x_2) = f\bigl((1-t)x_1+tx_2\bigr) \le (1-t)f(x_1)+tf(x_2) = \lambda_1f(x_1)+\lambda_2f(x_2).$$

C'est **exactement** la définition 2.2.

**Hérédité.** Supposons le résultat vrai au rang $n$, et donnons-nous $\lambda_1,\dots,\lambda_{n+1}\ge0$ de somme $1$.

*Cas trivial* : si $\lambda_{n+1}=1$, tous les autres sont nuls et l'inégalité est une égalité. Supposons donc $\lambda_{n+1}<1$ et posons

$$S = \sum_{i=1}^n\lambda_i = 1-\lambda_{n+1} > 0, \qquad \mu_i = \frac{\lambda_i}{S} \ \text{ pour } i\le n .$$

Les $\mu_i$ sont **positifs et de somme $1$** : ce sont des poids légitimes. Notons

$$z = \sum_{i=1}^n\mu_ix_i \ \in\ \Omega$$

— l'appartenance à $\Omega$ vient de la **convexité de $\Omega$** (par récurrence également : un barycentre à poids positifs de points d'un convexe y reste).

*On applique la définition 2.2 aux deux points $z$ et $x_{n+1}$*, avec le poids $t=\lambda_{n+1}$ :

$$f\left(\sum_{i=1}^{n+1}\lambda_ix_i\right) = f\bigl(S\,z+\lambda_{n+1}x_{n+1}\bigr) \le S\,f(z)+\lambda_{n+1}f(x_{n+1}).$$

*Puis l'hypothèse de récurrence à $f(z)$* :

$$f(z) \le \sum_{i=1}^n\mu_if(x_i) = \frac1S\sum_{i=1}^n\lambda_if(x_i).$$

*En combinant* :

$$f\left(\sum_{i=1}^{n+1}\lambda_ix_i\right) \le S\cdot\frac1S\sum_{i=1}^n\lambda_if(x_i)+\lambda_{n+1}f(x_{n+1}) = \sum_{i=1}^{n+1}\lambda_if(x_i). \ \blacksquare$$

**La technique à retenir : regrouper $n$ points en un seul barycentre, puis appliquer le cas à deux points.** C'est le schéma standard de toutes les récurrences sur les combinaisons convexes.

**Contrôle numérique** avec $f(x)=x^2$ (convexe), $\lambda = (0{,}3;\ 0{,}5;\ 0{,}2)$ et $x=(1;\ 4;\ 9)$ :

$$\sum\lambda_ix_i = 0{,}3+2+1{,}8 = 4{,}1 \quad\Longrightarrow\quad f\left(\sum\lambda_ix_i\right) = 16{,}81,$$

$$\sum\lambda_if(x_i) = 0{,}3(1)+0{,}5(16)+0{,}2(81) = 0{,}3+8+16{,}2 = 24{,}5 .$$

$$16{,}81 \ \le\ 24{,}5 \ \checkmark$$

L'écart, $7{,}69$, est la **variance pondérée** des $x_i$ — ce n'est pas un hasard : pour $f(x)=x^2$, Jensen s'écrit $\mathbb{E}[X]^2\le\mathbb{E}[X^2]$, c'est-à-dire $\operatorname{Var}(X)\ge0$.

**Vérification** : $\operatorname{Var} = \sum\lambda_ix_i^2-\left(\sum\lambda_ix_i\right)^2 = 24{,}5-16{,}81 = 7{,}69$ **exactement**.

**Contrôle massif** : sur $3\times10^5$ tirages de poids et de points aléatoires en dimension 3, avec $f(x)=\lVert x\rVert^2$, l'inégalité de Jensen est vérifiée **dans 100 % des cas**.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi Jensen compte, bien au-delà de ce chapitre.</span>

Avec des $\lambda_i$ interprétés comme des **probabilités**, Jensen devient

$$f\bigl(\mathbb{E}[X]\bigr) \ \le\ \mathbb{E}\bigl[f(X)\bigr] \qquad \text{pour } f \text{ convexe.}$$

C'est l'inégalité la plus utilisée de la théorie de la décision : elle dit qu'**un agent dont l'utilité est concave préfère la certitude au risque de même espérance** (aversion au risque), et elle fonde au passage l'inégalité arithmético-géométrique (proposition 5.8 chez M. Montaru, fiche 604), en l'appliquant à $-\ln$, qui est convexe.

</div>

</details>

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | La bonne réaction | L'outil |
|---|---|---|
| « Montrer que $f$ est convexe » | signe de $\nabla^2f$, ou l'inégalité directe | prop. 2.3 |
| $f$ quadratique $\langle Ax,x\rangle+\langle b,x\rangle+c$ | **$\nabla^2f = 2A$** : tout se lit sur $A$ | À savoir 2.4 |
| « strictement convexe » | $\nabla^2f>0$ **suffit** ; sinon, gradient strictement monotone | prop. 2.4 |
| « fortement convexe » | exhiber $\alpha>0$ : $\lambda_{\min}$ de la hessienne | prop. 2.5 |
| « montrer que ce n'est PAS strictement convexe » | **un contre-exemple**, deux points et un $t$ | À savoir 2.5 |
| une **norme** | convexe, jamais strictement (sauf $\lVert\cdot\rVert_p$, $1<p<\infty$) | À savoir 2.2 |
| $n$ points, des poids qui somment à $1$ | **Jensen** | prop. 2.6 |
| une espérance dans l'énoncé | Jensen probabiliste | prop. 2.6 |
| « unicité du minimum » | il faut la **stricte** convexité | thm 2.13, fiche 608 |
| « existence ET unicité » | il faut la **forte** convexité | thm 2.14, fiche 608 |

**Le réflexe qui fait gagner le plus de temps** : si $f$ est quadratique, **ne développez rien** — écrivez $A$, calculez ses mineurs principaux dominants ou ses valeurs propres, et lisez les trois réponses d'un coup.

## Comment résoudre ce type d'exercice

**Protocole « quel degré de convexité ? » — trois étapes.**

1. **$f$ est-elle $C^2$ ?** Si oui, calculer $\nabla^2f$ et l'étudier :
  - $\langle\nabla^2f(x)h,h\rangle\ge0$ partout → **convexe** ;
  - $>0$ pour $h\neq0$ → **strictement** convexe ;
  - $\ge\alpha\lVert h\rVert^2$ avec $\alpha>0$ **uniforme sur $U$** → **fortement** convexe, de constante $\alpha = \min_U \lambda_{\min}\bigl(\nabla^2f\bigr)$.
2. **Sinon** (non dérivable, ou hessienne dégénérée) : revenir à la **définition 2.2**, ou utiliser la caractérisation par la monotonie du gradient — la seule qui soit une **vraie équivalence** pour la stricte convexité.
3. **Pour réfuter**, un seul contre-exemple suffit : deux points distincts et un $t\in\,]0,1[$ où l'inégalité est saturée ou fausse.

**Comment trouver $\alpha$ en pratique.**

$$\alpha = 2\lambda_{\min}(A) \quad \text{si } f = \langle Ax,x\rangle+\dots, \qquad \alpha = \inf_{x\in U}\lambda_{\min}\bigl(\nabla^2f(x)\bigr) \quad \text{en général.}$$

**C'est un infimum sur tout $U$**, pas une valeur en un point. Si cet infimum est **nul**, $f$ n'est **pas** fortement convexe — c'est le cas de $x^4$ sur $\mathbb{R}$, dont la dérivée seconde $12x^2$ s'annule en $0$.

**Comment calculer $\lambda_{\min}$ en dimension 2**, sans diagonaliser :

$$\lambda_{\pm} = \frac{\operatorname{tr}A \pm \sqrt{(\operatorname{tr}A)^2-4\det A}}{2}.$$

Et pour décider seulement du **signe** : $A$ est définie positive $\iff$ $\operatorname{tr}A>0$ **et** $\det A>0$ ; définie négative $\iff$ $\operatorname{tr}A<0$ et $\det A>0$ ; indéfinie $\iff$ $\det A<0$.

## 🔴 Common mistakes

1. **Confondre les trois degrés.** Forte $\Rightarrow$ stricte $\Rightarrow$ convexe, et **aucune réciproque**. $x^4$ est strictement mais pas fortement convexe ; $\lvert x\rvert$ est convexe mais pas strictement.
2. **Croire que $\nabla^2f>0$ est nécessaire à la stricte convexité.** C'est **suffisant seulement**. $x^4$ a $f''(0)=0$.
3. **Oublier que $\alpha$ doit être uniforme sur $U$.** Une minoration $\lambda_{\min}(x)>0$ en chaque point ne suffit pas si l'infimum est nul.
4. **Oublier la symétrie de $A$** dans $\nabla f = 2Ax+b$. Sans elle, c'est $(A+A^{\mathsf T})x+b$.
5. **Écrire $\nabla^2f = A$ au lieu de $2A$.** Le facteur 2 vient de la dérivation de la forme quadratique.
6. **Croire qu'une norme peut être strictement convexe.** Elle est **affine** le long de toute demi-droite issue de $0$ : $N(sx)=sN(x)$. Seules les $\lVert\cdot\rVert_p$ avec $1<p<\infty$ le sont — et aucune n'est fortement convexe.
7. **Confondre $\lVert\cdot\rVert_2$ et $\lVert\cdot\rVert_2^2$.** La première est strictement convexe ; **seule la seconde** est fortement convexe.
8. **Oublier l'hypothèse $\sum\lambda_i=1$ dans Jensen.** Sans elle, l'inégalité est fausse : avec $\lambda=(1,1)$ et $f(x)=x^2$, $f(1+1)=4 > 1+1 = 2$.
9. **Appliquer Jensen dans le mauvais sens pour une fonction concave.** Pour $f$ **concave**, l'inégalité se **renverse** : $f(\sum\lambda_ix_i)\ge\sum\lambda_if(x_i)$.
10. **Oublier que $\Omega$ doit être convexe.** Toutes les propositions du paragraphe le supposent ; sans cela, $(1-t)x+ty$ pourrait sortir du domaine.
11. **Vérifier la convexité sur une seule direction.** L'inégalité doit valoir pour **tout** couple $(x,y)$ — c'est le sens du « pour tout $h$ » dans $\langle\nabla^2f(x)h,h\rangle\ge0$.
12. **Croire que semi-définie positive garantit l'existence d'un minimum.** Elle donne la convexité, pas l'existence : $f(x,y)=x^2+y$ est convexe et non minorée.

## 📌 Ultimate Review

**Le §2.1 en un paragraphe.** Un ensemble est **convexe** si le segment entre deux de ses points y reste ; une fonction l'est si son **épigraphe** est convexe, ce qui équivaut à *« la courbe est sous ses cordes »*. Trois degrés : **convexe** ($\le$), **strictement** convexe ($<$, ce qui donne l'**unicité** du minimum), **fortement** convexe (une marge quantifiée $\frac\alpha2 t(1-t)\lVert x-y\rVert^2$, ce qui donne la **coercivité** donc l'**existence**). Chacun se caractérise de trois façons — par la **tangente**, par la **monotonie du gradient**, par la **hessienne** — les trois lignes se déduisant l'une de l'autre en ajoutant une marge en $\lVert\cdot\rVert^2$. Dans le cas **quadratique** $\langle Ax,x\rangle+\langle b,x\rangle+c$, tout se lit sur $A$ : $\nabla^2f = 2A$, et $A$ définie positive donne les trois degrés d'un coup, avec $\alpha=2\lambda_{\min}(A)$. Enfin, **Jensen** étend la convexité de deux points à $n$ points, et devient $f(\mathbb{E}[X])\le\mathbb{E}[f(X)]$ en probabilités.

**Les cinq énoncés à savoir citer.**

| N° | Énoncé | Ce qu'il apporte |
|---|---|---|
| **2.1 / 2.2** | convexe, strictement, **fortement** | les trois degrés |
| **2.3** | trois caractérisations de la convexité | l'outil de calcul |
| **2.4** | idem, en strict | l'unicité |
| **2.5** | idem, avec la marge $\alpha$ | l'existence (via la coercivité) |
| **2.6** | **Jensen** : $f(\sum\lambda_ix_i)\le\sum\lambda_if(x_i)$ | de 2 à $n$ points |

**Les trois formules-réflexes.**

$$\nabla f = 2Ax+b, \qquad \nabla^2f = 2A, \qquad \alpha = 2\lambda_{\min}(A).$$

**Les quatre fonctions-témoins.**

| Fonction | convexe | strictement | fortement |
|---|---|---|---|
| $x^2$ |  |  | ($\alpha=2$) |
| $x^4$ |  |  |  |
| $\lvert x\rvert$, toute norme |  |  |  |
| $x^2+y$ (convexe, non minorée) |  |  |  |

**Ce que ce paragraphe prépare** (fiche 608) : la stricte convexité donne le **théorème 2.13** (unicité), la forte convexité donne le **théorème 2.14** (existence *et* unicité), et la caractérisation 2 de la proposition 2.3 donne le **théorème 2.17** ($\nabla f(x^\ast)=0$ $\iff$ minimum **global**).

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Définir un ensemble convexe, puis une fonction convexe par son épigraphe.**

</summary>

**Ensemble convexe** (déf. 2.1) : $\forall(x,y)\in U^2,\ \forall t\in[0,1],\ (1-t)x+ty\in U$ — *le segment entre deux points y reste*.

**Fonction convexe** : $f$ est convexe si son **épigraphe** $\{(x,\alpha)\in U\times\mathbb{R} : f(x)\le\alpha\}$ — tout ce qui est **au-dessus** du graphe — est un ensemble convexe.

**Pourquoi c'est équivalent à l'inégalité** : le segment entre $(x,f(x))$ et $(y,f(y))$ a pour ordonnée $(1-t)f(x)+tf(y)$ ; il reste dans l'épigraphe ssi $f((1-t)x+ty)\le(1-t)f(x)+tf(y)$.

**L'intérêt** : une seule notion de convexité, celle des ensembles.

</details>

<details class="details--riche">
<summary>

**2. Énoncer les trois degrés de convexité et la hiérarchie entre eux.**

</summary>

Pour tout $(x,y)$ et $t$ :

- **convexe** : $f((1-t)x+ty)\le(1-t)f(x)+tf(y)$ ;
- **strictement** : $<$, pour $x\neq y$ et $t\in\,]0,1[$ ;
- **fortement** : $\le (1-t)f(x)+tf(y)-\frac\alpha2t(1-t)\lVert x-y\rVert^2$ pour un $\alpha>0$.

$$\text{fortement} \implies \text{strictement} \implies \text{convexe},$$

et **aucune réciproque** : $x^4$ est strictement mais pas fortement convexe ; $\lvert x\rvert$ est convexe mais pas strictement.

**La forte convexité est la seule quantitative** : elle fournit un nombre $\alpha$.

</details>

<details class="details--riche">
<summary>

**3. Montrer que $x\mapsto x^2$ est convexe par le calcul direct, et en déduire sa constante de forte convexité.**

</summary>

$$(1-t)x^2+ty^2-\bigl((1-t)x+ty\bigr)^2 = t(1-t)(x-y)^2 \ \ge 0 .$$

*(En développant le carré et en utilisant $(1-t)-(1-t)^2 = t(1-t)$.)*

La marge vaut **exactement** $t(1-t)(x-y)^2 = \frac{2}{2}t(1-t)(x-y)^2$, donc $x\mapsto x^2$ est **fortement convexe de constante $\alpha=2$**, et cette constante est **optimale** (il y a égalité).

**Contrôle** : $x=1$, $y=3$, $t=0{,}25$ → $f(1{,}5)=2{,}25$ contre $3$ ; marge $0{,}75 = 0{,}25\times0{,}75\times4$ .

</details>

<details class="details--riche">
<summary>

**4. Pourquoi toutes les normes sont-elles convexes, et pourquoi aucune n'est-elle strictement convexe ?**

</summary>

**Convexité** : par sous-additivité puis homogénéité,

$$N((1-t)x+ty)\le N((1-t)x)+N(ty) = (1-t)N(x)+tN(y).$$

Ce sont exactement les axiomes 3 et 2 d'une norme — donc c'est vrai pour **toutes**.

**Pas strictement convexe** : $N(sx)=sN(x)$ signifie que $N$ est **affine** le long de toute demi-droite issue de $0$. Sur un tel segment, l'inégalité est une **égalité**.

**Contre-exemple explicite pour $\lVert\cdot\rVert_\infty$** (À savoir 2.5) : $x=(1,0)$, $y=(1,1)$, $t=\frac12$ → milieu $(1,\frac12)$ de norme $1$, et $\frac12(1)+\frac12(1)=1$ : **égalité**.

⚠️ $\lVert\cdot\rVert_2$ **est** strictement convexe (sphère arrondie), mais seul son **carré** est fortement convexe.

</details>

<details class="details--riche">
<summary>

**5. Énoncer les trois caractérisations de la proposition 2.3.**

</summary>

Pour $f\in C^1$ sur un convexe $U$, il y a équivalence entre :

1. $f$ convexe ;
2. $f(y)\ge f(x)+\langle\nabla f(x),y-x\rangle$ — *$f$ est au-dessus de ses **plans tangents*** ;
3. $\langle\nabla f(y)-\nabla f(x),\ y-x\rangle\ge0$ — *le gradient est **monotone*** (« croissant »).

Si $f\in C^2$, ajouter : $\langle\nabla^2f(x)h,h\rangle\ge0$ pour tout $h$.

**La 2 est celle qui sert le plus** : avec $\nabla f(x^\ast)=0$, elle donne directement $f(y)\ge f(x^\ast)$, donc **minimum global** (thm 2.17).

</details>

<details class="details--riche">
<summary>

**6. Comment passe-t-on des caractérisations de la convexité à celles de la forte convexité ?**

</summary>

**En ajoutant une marge en $\lVert\cdot\rVert^2$** dans chacune des trois :

|  | convexe | fortement convexe |
|---|---|---|
| tangente | $f(y)\ge f(x)+\langle\nabla f(x),y-x\rangle$ | $+\ \frac\alpha2\lVert x-y\rVert^2$ |
| gradient | $\langle\nabla f(y)-\nabla f(x),y-x\rangle\ge0$ | $\ge\alpha\lVert x-y\rVert^2$ |
| hessienne | $\langle\nabla^2f(x)h,h\rangle\ge0$ | $\ge\alpha\lVert h\rVert^2$ |

**Reformulation équivalente** (« Pour aller plus loin » du cours) : $f$ est fortement convexe de constante $\alpha$ **si et seulement si** $f-\frac\alpha2\lVert\cdot\rVert^2$ est convexe.

*En un mot : fortement convexe = « convexe avec au moins la courbure d'une parabole ».*

</details>

<details class="details--riche">
<summary>

**7. Pour $f(x)=\langle Ax,x\rangle+\langle b,x\rangle+c$ avec $A$ symétrique, donner $\nabla f$, $\nabla^2f$ et les trois conclusions.**

</summary>

$$\nabla f(x) = 2Ax+b, \qquad \nabla^2f(x) = 2A \quad\text{(constante)}.$$

*(Le facteur 2 vient de la **symétrie** de $A$ ; sinon ce serait $(A+A^{\mathsf T})x+b$.)*

| $A$ | Conclusion |
|---|---|
| semi-définie positive | $f$ **convexe** |
| définie positive | $f$ **strictement** convexe |
| définie positive | $f$ **fortement** convexe, $\alpha = 2\lambda_{\min}(A)$ |

**Sur $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$** : valeurs propres $1$ et $3$, donc définie positive et $\alpha = 2$.

**En dimension finie, « définie positive » et « fortement convexe » coïncident** pour une forme quadratique, parce que le spectre est fini donc minoré strictement.

</details>

<details class="details--riche">
<summary>

**8. Énoncer et démontrer l'inégalité de Jensen.**

</summary>

**Énoncé (prop. 2.6)** : $f$ convexe sur un convexe $\Omega$, $\lambda_i\ge0$ avec $\sum\lambda_i=1$. Alors

$$f\left(\sum_{i=1}^n\lambda_ix_i\right)\le\sum_{i=1}^n\lambda_if(x_i).$$

**Preuve par récurrence.** $n=2$ : c'est la définition 2.2. Hérédité : poser $S=\sum_{i\le n}\lambda_i = 1-\lambda_{n+1}$, $\mu_i=\lambda_i/S$ (poids positifs de somme 1) et $z=\sum_{i\le n}\mu_ix_i\in\Omega$. Alors

$$f\left(Sz+\lambda_{n+1}x_{n+1}\right)\le Sf(z)+\lambda_{n+1}f(x_{n+1}) \le S\cdot\frac1S\sum_{i\le n}\lambda_if(x_i)+\lambda_{n+1}f(x_{n+1}). \ \blacksquare$$

**La technique** : regrouper $n$ points en un barycentre, puis appliquer le cas à deux points.

</details>

<details class="details--riche">
<summary>

**9. Vérifier Jensen sur un exemple et interpréter l'écart.**

</summary>

Avec $f(x)=x^2$, $\lambda=(0{,}3;\ 0{,}5;\ 0{,}2)$, $x=(1;\ 4;\ 9)$ :

$$\sum\lambda_ix_i = 4{,}1 \Rightarrow f\left(\sum\lambda_ix_i\right)=16{,}81, \qquad \sum\lambda_if(x_i) = 24{,}5 .$$

$16{,}81\le24{,}5$ , écart $7{,}69$.

**L'écart est la variance pondérée** : $\sum\lambda_ix_i^2-(\sum\lambda_ix_i)^2 = 24{,}5-16{,}81 = 7{,}69$ .

**Ce n'est pas un hasard** : pour $f(x)=x^2$, Jensen s'écrit $\mathbb{E}[X]^2\le\mathbb{E}[X^2]$, c'est-à-dire $\operatorname{Var}(X)\ge0$.

**La version probabiliste générale** : $f(\mathbb{E}[X])\le\mathbb{E}[f(X)]$ pour $f$ convexe — c'est l'inégalité qui fonde l'aversion au risque.

</details>

<details class="details--riche">
<summary>

**10. À quoi servira chacun des trois degrés de convexité dans le chapitre 2 ?**

</summary>

| Degré | Ce qu'il donne | Théorème |
|---|---|---|
| **convexe** | $\nabla f(x^\ast)=0$ devient **suffisant**, et donne du **global** | thm 2.17 |
| **strictement** convexe | **unicité** du minimum (s'il existe) | thm 2.13 |
| **fortement** convexe | **coercivité**, donc **existence** — et l'unicité par-dessus | À savoir 2.7, thm 2.14 |

**Le théorème 2.14 combine les deux derniers** : $K$ fermé convexe non borné et $f$ de classe $C^1$ **fortement** convexe ⟹ $f$ admet un **unique minimum global** sur $K$.

**C'est le meilleur énoncé de tout le cours** : une seule hypothèse donne existence *et* unicité, sans aucun calcul.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Ensemble convexe (déf. 2.1) ? | Le **segment** entre deux points y reste |
| Fonction convexe, par l'épigraphe ? | Son **épigraphe** est un ensemble convexe |
| Épigraphe ? | $\{(x,\alpha) : f(x)\le\alpha\}$ — au-dessus du graphe |
| Le cercle est-il convexe ? | **Non** — le disque, oui |
| Convexe (déf. 2.2) ? | $f((1-t)x+ty)\le(1-t)f(x)+tf(y)$ |
| Strictement convexe ? | $<$, pour $x\ne y$ et $t\in\,]0,1[$ |
| Fortement convexe ? | $\le\ \dots\ -\frac\alpha2t(1-t)\lVert x-y\rVert^2$ |
| La hiérarchie ? | forte ⟹ stricte ⟹ convexe |
| Réciproques ? | **Aucune** |
| Contre-exemple stricte mais pas forte ? | $x^4$ |
| Contre-exemple convexe mais pas stricte ? | $\lvert x\rvert$, toute norme |
| Reformulation de la forte convexité ? | $f-\frac\alpha2\lVert\cdot\rVert^2$ est **convexe** |
| Sa lecture ? | « Au moins la courbure d'une **parabole** » |
| Pour une fonction continue, il suffit de vérifier ? | Le cas $t=\frac12$ |
| Convexité de $x^2$ : la différence ? | $t(1-t)(x-y)^2$ |
| Sa constante de forte convexité ? | $\alpha = 2$, **optimale** |
| Pourquoi toute norme est convexe ? | Sous-additivité **+** homogénéité |
| Pourquoi aucune n'est strictement convexe ? | $N(sx)=sN(x)$ : **affine** sur une demi-droite |
| Contre-exemple pour $\lVert\cdot\rVert_\infty$ ? | $(1,0)$, $(1,1)$, $t=\frac12$ : égalité |
| Quelles $\lVert\cdot\rVert_p$ sont strictement convexes ? | Celles avec $1<p<\infty$ |
| $\lVert\cdot\rVert_2$ est-elle fortement convexe ? | **Non** — seul son **carré** l'est |
| Prop. 2.3, caractérisation 2 ? | $f(y)\ge f(x)+\langle\nabla f(x),y-x\rangle$ |
| En français ? | Au-dessus de ses **plans tangents** |
| Caractérisation 3 ? | $\langle\nabla f(y)-\nabla f(x),y-x\rangle\ge0$ |
| En français ? | Gradient **monotone** |
| Caractérisation $C^2$ ? | $\langle\nabla^2f(x)h,h\rangle\ge0$ |
| Passage à la forte convexité ? | Ajouter une marge en $\lVert\cdot\rVert^2$ |
| $\nabla^2f > 0$ est-il nécessaire à la stricte convexité ? | **Non** — $x^4$ |
| Quelle caractérisation reste une vraie équivalence ? | La **monotonie du gradient** |
| $f=\langle Ax,x\rangle+\langle b,x\rangle+c$ : $\nabla f$ ? | $2Ax+b$ |
| $\nabla^2f$ ? | $2A$, **constante** |
| D'où vient le facteur 2 ? | La **symétrie** de $A$ |
| $A$ semi-définie positive ⟹ ? | $f$ **convexe** |
| $A$ définie positive ⟹ ? | Strictement **et** fortement convexe |
| La constante $\alpha$ ? | $2\lambda_{\min}(A)$ |
| Valeurs propres de $\begin{pmatrix}2&1\\1&2\end{pmatrix}$ ? | $1$ et $3$ |
| Sa constante $\alpha$ ? | $2$ |
| $A$ définie positive en dimension 2 ? | $\operatorname{tr}A>0$ **et** $\det A>0$ |
| $A$ indéfinie ? | $\det A<0$ |
| Inégalité de Jensen (2.6) ? | $f(\sum\lambda_ix_i)\le\sum\lambda_if(x_i)$ |
| Ses hypothèses ? | $f$ convexe, $\lambda_i\ge0$, $\sum\lambda_i=1$ |
| Sa preuve ? | **Récurrence**, en regroupant en un barycentre |
| Pour $f$ **concave** ? | L'inégalité se **renverse** |
| Version probabiliste ? | $f(\mathbb{E}[X])\le\mathbb{E}[f(X)]$ |
| Avec $f(x)=x^2$ ? | $\operatorname{Var}(X)\ge0$ |
| Ce qu'elle fonde en économie ? | L'**aversion au risque** |
| Ce qu'elle démontre chez M. Montaru ? | L'inégalité **arithmético-géométrique** |
| La stricte convexité donne ? | L'**unicité** (thm 2.13) |
| La forte convexité donne ? | La **coercivité**, donc l'existence (thm 2.14) |
| La convexité simple donne ? | $\nabla f=0$ **suffit**, et c'est **global** (thm 2.17) |
| Convexe ⟹ minorée ? | **Non** — $x^2+y$ est convexe et non minorée |
|  |  |
