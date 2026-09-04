# Fiche 606 — Développements limités et formules de Taylor

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Blanchet, *Optimisation*, TSE, 9 avril 2024 — **chapitre 1** (Formule de Taylor et développements limités), p. 7–15 |
| **Difficulté** | Outil — la « Partie I : Outils » du cours, à maîtriser avant d'optimiser quoi que ce soit |
| **Temps d'étude estimé** | 2 h 45 |
| **Prérequis** | Aucun. Utile en parallèle de la fiche 601 (Taylor chez M. Montaru). |
| **Concepts clés** | Espace métrique, boule, voisinage, ouvert, adhérence, négligeabilité, équivalence, $DL_n(x_0)$, Taylor-Young, opérations sur les DL, DL en $x_0\ne0$ et en l'infini, limites, approximation affine, dérivées successives, position de la tangente, branche asymptotique |
| **Poids à l'examen** | Le chapitre compte **18 énoncés « À savoir (fait en cours) »** — c'est la densité la plus forte de tout le polycopié. Ils sont **tous corrigés ici**. Les §1.6.4 et §1.6.5 (position de la tangente, branche asymptotique) donnent une **classification en quatre cas** qui se récite. |

> **Convention de la série 606-609.** Les énoncés numérotés (« Définition 1.6 », « Théorème 1.9 », « À savoir 1.13 ») sont ceux de M. Blanchet. Le polycopié distingue lui-même trois registres : le cours, les **« À savoir (fait en cours) »** — les exercices traités en amphi, dont les corrigés sont rédigés ici — et les **« Pour aller plus loin »**, gradués de (*) à (***), qui sont hors programme et signalés comme tels par l'auteur.

## 🎯 Vue d'ensemble

```
POURQUOI CE CHAPITRE EST DANS UN COURS D'OPTIMISATION

   « approximer f par un POLYNÔME près d'un point »
        │
        ├─ ordre 1 : f(a) + f'(a)(x−a)          → l'ÉQUATION D'EULER  (ch. 2)
        └─ ordre 2 : + ½ f''(a)(x−a)²           → les CONDITIONS D'ORDRE 2

   en dimension N (le seul énoncé du chapitre qui serve directement) :

        f(a+h) = f(a) + ⟨∇f(a), h⟩ + ½⟨∇²f(a)h, h⟩ + o(‖h‖²)


LA CHAÎNE DU CHAPITRE

  §1.2  TOPOLOGIE      métrique → boule → voisinage → ouvert / fermé
          │
  §1.2.3 COMPARAISON   f = o(g)   « f est infiniment plus petite que g »
          │            f ~ g      « f et g sont interchangeables au 1er ordre »
          │
  §1.3   DL_n(x₀)      f(x) = Σ aᵢ(x−x₀)ⁱ  +  o((x−x₀)ⁿ)
          │                 └ partie régulière ┘
  §1.4   TAYLOR        aᵢ = f⁽ⁱ⁾(x₀)/i!   ← le DL D'UNE FONCTION DÉRIVABLE
          │
  §1.5   OPÉRATIONS    × scalaire · somme · produit · inverse
          │            composition · primitive · dérivation
          │            + changement de variable : x₀ ≠ 0 (h = x−x₀), ∞ (h = 1/x)
          │
  §1.6   APPLICATIONS  limites · approximation affine · dérivées f⁽ⁿ⁾(0)
                       POSITION DE LA TANGENTE      ┐ deux classifications
                       BRANCHE ASYMPTOTIQUE         ┘ en QUATRE cas chacune


LA RÈGLE QUI GOUVERNE LES DEUX CLASSIFICATIONS

   k₀ = le PREMIER indice où le coefficient est non nul

   k₀ PAIR    → même côté des deux côtés   (extremum / position stable)
   k₀ IMPAIR  → la courbe TRAVERSE         (point d'inflexion)

   puis le SIGNE du coefficient dit lequel des deux côtés.
```

## 🔴 Concept 1 — Le cadre topologique (§1.2)

**Définition 1.1 (cours).** Un **espace métrique** est une paire $(M,d)$ où $M$ est un ensemble et $d$ est une **distance** sur $M$, au sens que $d : M\times M \to \mathbb{R}_+$ satisfait les axiomes suivants : pour tout $(x,y,z)\in M^3$,

- $x=y$ **si et seulement si** $d(x,y)=0$ — *propriété de séparation* ;
- $d(x,y)=d(y,x)$ — *propriété de symétrie* ;
- $d(x,z)\le d(x,y)+d(y,z)$ — *inégalité triangulaire*.

*L'inégalité triangulaire est une propriété naturelle du point de vue physique comme métaphorique : vous pouvez arriver à $z$ à partir de $x$ en faisant un détour par $y$.*

> **C'est exactement la définition 2.1 de M. Montaru** (fiche 600), aux notations près : $(M,d)$ ici, $(E,d)$ là-bas. **Les deux cours partagent tout ce paragraphe** — c'est une bonne nouvelle : réviser l'un révise l'autre.

**À savoir (fait en cours) 1.1.** *Dans $\mathbb{R}$, montrer que $(x,y)\mapsto \lvert x-y\rvert$ définit une métrique.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 1.1**

</summary>

Les trois axiomes, dans l'ordre :

**Séparation.** $\lvert x-y\rvert = 0 \iff x-y = 0 \iff x=y$.

**Symétrie.** $\lvert y-x\rvert = \lvert -(x-y)\rvert = \lvert -1\rvert\cdot\lvert x-y\rvert = \lvert x-y\rvert$.

**Inégalité triangulaire.** C'est l'inégalité triangulaire de la valeur absolue, appliquée à la décomposition $x-z = (x-y)+(y-z)$ :

$$\lvert x-z\rvert = \lvert (x-y)+(y-z)\rvert \le \lvert x-y\rvert + \lvert y-z\rvert . \ \checkmark$$

**La technique à retenir** — elle resservira à chaque vérification de distance : *écrire l'écart entre les deux extrémités comme la somme de deux écarts en passant par le point intermédiaire.* C'est exactement le « détour par $y$ » de la phrase du cours.

**Contrôle numérique** sur $x=3$, $y=-1$, $z=7$ : $\lvert 3-7\rvert = 4 \le \lvert 3-(-1)\rvert + \lvert -1-7\rvert = 4+8 = 12$ .

</details>

**Pour aller plus loin (*) — les normes (cours).** *On peut définir sur $\mathbb{R}^N$ de nombreuses autres métriques. En particulier une norme permet de définir une métrique.* Une **norme** sur $E$ est une application $N : E\to\mathbb{R}$ qui vérifie, pour tout $(x,y)\in E^2$ :

- $x=0$ si et seulement si $N(x)=0$ ;
- $N(x)\ge0$ ;
- $N(\lambda x) = \lvert\lambda\rvert N(x)$ ;
- $N(x+y)\le N(x)+N(y)$.

Si $E$ est un espace vectoriel et $N$ une norme sur $E$, alors $(x,y)\mapsto N(x-y)$ définit une métrique sur $E$.

Sur $\mathbb{R}^N$ :

$$\lVert x\rVert_2 = \sqrt{\lvert x_1-y_1\rvert^2+\dots}, \qquad \lVert x\rVert_1 := \lvert x_1+\dots+x_N\rvert, \qquad \lVert x\rVert_\infty := \sup_{i\in\{1,\dots,N\}} \lvert x_i\rvert,$$

et pour $p\in[1,\infty)$ : $\lVert x\rVert_p := \bigl(\lvert x_1\rvert^p+\dots+\lvert x_N\rvert^p\bigr)^{1/p}$.

> ⚠️ **Deux coquilles du polycopié à connaître, pour ne pas être surpris en relisant.** Ce paragraphe est marqué (*) — hors programme — mais autant l'avoir corrigé.
>
> 1. **Les libellés des deuxième et troisième puces sont intervertis** : la phrase *« la distance entre $x$ et $y$ est égale à la distance entre $y$ et $x$ »* accompagne la formule $N(\lambda x)=\lvert\lambda\rvert N(x)$, qui est l'**homogénéité**, pas la symétrie. Les **formules** sont justes ; ce sont les noms qui ont glissé d'une ligne.
> 2. **La norme 1 est écrite $\lvert x_1+\dots+x_N\rvert$**, ce qui serait une valeur absolue de somme. La définition correcte est la **somme des valeurs absolues** : $$\lVert x\rVert_1 = \lvert x_1\rvert + \dots + \lvert x_N\rvert .$$ C'est d'ailleurs le cas $p=1$ de la formule générale donnée trois lignes plus bas dans le même paragraphe, et c'est la définition qu'écrit M. Montaru (fiche 600).
>
> **Contrôle sur $x=(1,-1)$** : la vraie norme 1 vaut $2$ ; la formule telle qu'imprimée donnerait $\lvert 1-1\rvert = 0$, ce qui violerait la séparation (le vecteur $(1,-1)$ est non nul). **La bonne version est celle avec les valeurs absolues à l'intérieur.**

### 1.1 Boules, voisinages, ouverts (§1.2.2)

**Définition 1.2 (cours) — boule ouverte.** Soit $(E,d)$ un espace métrique, $x\in E$ et $r>0$. On appelle **boule ouverte centrée en $x$ de rayon $r$** l'ensemble

$$B_r(x) := \{y\in E : d(x,y)<r\}.$$

**À savoir 1.2.** *Dessiner les boules unités pour les normes $\lVert\cdot\rVert_2$, $\lVert\cdot\rVert_1$ et $\lVert\cdot\rVert_\infty$ de $\mathbb{R}^2$.*

> **Corrigé — c'est le même dessin que l'exemple 1 de M. Montaru** (fiche 600) : **losange** pour la norme 1, **disque** pour la norme 2, **carré** pour la norme infinie, emboîtés dans cet ordre. La règle : *plus l'indice $p$ est petit, plus la boule est petite.*

**Définition 1.3 (cours) — voisinage.** Soit $x\in E$. Un ensemble $V$ est un **voisinage de $x$** s'il existe $r>0$ tel que $B_r(x)$ soit inclus dans $V$.

**Définition 1.4 (cours) — ouvert et fermé.** Un **ouvert** est un ensemble qui est **le voisinage de chacun de ses points**. Un **fermé** est le complémentaire d'un ouvert.

> **La formulation de M. Blanchet est plus élégante que la version en quantificateurs.** « $A$ est un ouvert » = « $A$ est un voisinage de chacun de ses points » = « $\forall x\in A,\ \exists r>0,\ B_r(x)\subset A$ » — c'est mot pour mot la définition 2.4 de M. Montaru. **Retenez la version courte, écrivez la version longue.**

**Pour aller plus loin (*) (cours).** *Dans un $\mathbb{R}$-espace vectoriel de dimension finie, toutes les normes sont équivalentes. Donc la notion de voisinage est la même pour toutes les métriques associées à ces normes.*

> C'est l'encadré **IMPORTANT** de M. Montaru (fiche 600). Les deux cours insistent au même endroit — c'est le signe que le résultat compte.

**Définition 1.5 (cours) — adhérence.** *L'adhérence d'un ensemble $A\neq\emptyset$ est l'intersection des voisinages des points de $A$, on la note $\bar A$. Un point adhérent à une partie $A$ est un élément de l'adhérence de $A$.*

> ⚠️ **La phrase telle qu'imprimée ne donne pas l'adhérence usuelle**, et il vaut mieux le savoir avant l'examen. L'intersection des voisinages de **tous** les points de $A$ redonne $A$ lui-même quand $A$ a plus d'un point : un voisinage de $0{,}5$ n'a aucune raison de contenir $0{,}1$, donc l'intersection sur $A=\,]0,1[$ est vide de tout point isolé.
>
> **Les deux formulations correctes, à utiliser en copie**, sont celles de M. Montaru (fiche 600, déf. 2.8 et prop. 2.14-2.15) :
>
> $$\bar A = \text{le \textbf{plus petit fermé} contenant } A = \{x : \forall \epsilon>0,\ B_\epsilon(x)\cap A \neq \emptyset\}$$
>
> et, sous sa forme la plus maniable :
>
> $$x\in\bar A \iff x \text{ est la \textbf{limite d'une suite} de } A .$$
>
> **Contrôle** : $\overline{\,]0,1[\,} = [0,1]$, car $\frac1n \to 0$ et $1-\frac1n\to1$ avec les deux suites dans $\,]0,1[$.
>
> **Ce que la définition 1.5 voulait probablement dire** est l'intersection des **fermés** contenant $A$ — l'énoncé standard. **En cas de doute en examen, écrivez la caractérisation séquentielle** : elle est vraie dans les deux cours et c'est celle dont on se sert.

## 🔴 Concept 2 — Négligeabilité et équivalence (§1.2.3)

**Définition 1.6 (cours) — négligeabilité.** Soit $I\subset\mathbb{R}$, $f$ et $g$ définies sur $I$ à valeurs dans $\mathbb{R}$ ou $\mathbb{C}$, et $a\in I$. On dit que **$f$ est négligeable devant $g$ au voisinage de $a$**, et on note $f\underset{a}{=}o(g)$, s'il existe un voisinage $V$ de $a$ et une fonction $\varepsilon$ définie sur $V$ **qui tend vers $0$ en $a$** telles que

$$\forall x\in V\cap I,\qquad f(x) = \varepsilon(x)\,g(x).$$

*La notation $f\underset{a}{=}o(g)$ est la **notation de Landau** qui se lit « $f$ est un petit $o$ de $g$ au voisinage de $a$ ». Remarquons que $a$ peut être un réel, $+\infty$ ou $-\infty$.*

> **La formulation par $\varepsilon$ plutôt que par un quotient est plus robuste.** M. Montaru définit $o$ par $\lim f/g = 0$ (déf. 3.8, fiche 601), ce qui suppose $g$ non nulle près de $a$. La version de M. Blanchet, $f = \varepsilon g$, n'a pas ce défaut. **Les deux coïncident dès que $g$ ne s'annule pas** — c'est toujours le cas dans les exercices, où $g$ est une puissance de $(x-x_0)$.

**À savoir 1.3.** *Soient $f : x\mapsto x^m$ et $g : x\mapsto x^p$, avec $m>p$. Montrer que : 1. $f$ est négligeable devant $g$ au voisinage de $0$ ; 2. $g$ est négligeable devant $f$ au voisinage de l'infini.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 1.3 : le renversement en 0 et à l'infini**

</summary>

**1. En $0$.** Posons $\varepsilon(x) = x^{m-p}$. Alors $f(x) = x^m = x^{m-p}\cdot x^p = \varepsilon(x)g(x)$, et comme $m-p>0$,

$$\varepsilon(x) = x^{m-p} \xrightarrow[x\to0]{} 0 .$$

Donc $x^m \underset{0}{=} o(x^p)$.

**2. À l'infini.** Posons cette fois $\varepsilon(x) = x^{p-m}$. Alors $g(x) = x^p = x^{p-m}\cdot x^m = \varepsilon(x)f(x)$, et comme $p-m<0$,

$$\varepsilon(x) = \frac{1}{x^{m-p}} \xrightarrow[x\to+\infty]{} 0 .$$

Donc $x^p \underset{+\infty}{=} o(x^m)$.

**Le renversement, en une phrase :** *près de $0$, le plus grand exposant est le plus petit ; à l'infini, c'est l'inverse.*

**Contrôle numérique** avec $m=3$, $p=2$ :

| $x$ | $x^3/x^2 = x$ | lecture |
|---|---|---|
| $0{,}1$ | $0{,}1$ | tend vers $0$ : $x^3 = o(x^2)$ en $0$ |
| $0{,}01$ | $0{,}01$ |  |
| $10$ | $10$ | $x^2/x^3 = 0{,}1$ |
| $100$ | $100$ | $x^2/x^3 = 0{,}01$ : $x^2 = o(x^3)$ à l'infini |

⚠️ **C'est pourquoi le point de référence fait partie de la notation.** Écrire « $x^3 = o(x^2)$ » sans préciser où est un non-sens : l'énoncé est vrai en $0$ et faux à l'infini.

</details>

**Définition 1.7 (cours) — équivalence.** On dit que **$f$ est équivalente à $g$ en $a$**, et on note $f\underset{a}{\sim}g$, s'il existe un voisinage $V$ de $a$ et une fonction $\varepsilon$ tendant vers $0$ en $a$ telles que

$$\forall x\in V\cap I,\qquad f(x) = \bigl(1+\varepsilon(x)\bigr)g(x).$$

> **Le lien entre les deux notions, à connaître :**
>
> $$f\underset{a}{\sim}g \iff f - g \underset{a}{=} o(g).$$
>
> *Deux fonctions sont équivalentes quand leur différence est négligeable devant elles.* C'est la traduction directe de $f = (1+\varepsilon)g$, c'est-à-dire $f-g = \varepsilon g$.

**À savoir 1.4.** *Montrer que : 1. $\sin \underset{0}{\sim} x$ ; 2. $\sqrt{1+x}-1 \underset{0}{\sim} x/2$.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 1.4**

</summary>

**1. $\sin x \underset{0}{\sim} x$.** Le développement de Taylor donne $\sin x = x - \frac{x^3}{6}+o(x^3)$, donc

$$\sin x = x\left(1 \underbrace{- \frac{x^2}{6}+o(x^2)}_{=\ \varepsilon(x)\ \to\ 0}\right).$$

La définition 1.7 est vérifiée.

*(Sans Taylor : c'est la limite classique $\lim_{x\to0}\frac{\sin x}{x} = 1$, qui est la définition même de la dérivée de $\sin$ en $0$.)*

**2. $\sqrt{1+x}-1 \underset{0}{\sim} \frac x2$.** Multiplions par la quantité conjuguée :

$$\sqrt{1+x}-1 = \frac{(\sqrt{1+x}-1)(\sqrt{1+x}+1)}{\sqrt{1+x}+1} = \frac{(1+x)-1}{\sqrt{1+x}+1} = \frac{x}{\sqrt{1+x}+1}.$$

Or $\dfrac{x}{\sqrt{1+x}+1} = \dfrac x2 \cdot \dfrac{2}{\sqrt{1+x}+1}$, et le second facteur tend vers $1$ quand $x\to0$. En posant $\varepsilon(x) = \dfrac{2}{\sqrt{1+x}+1}-1 \to 0$, on a bien la forme de la définition 1.7.

**La technique de la quantité conjuguée** est celle à employer chaque fois qu'une différence de racines apparaît — elle resservira à l'À savoir 1.18.

**Contrôle numérique.**

| $x$ | $\sqrt{1+x}-1$ | $x/2$ | rapport |
|---|---|---|---|
| $0{,}1$ | $0{,}0488088$ | $0{,}05$ | $0{,}9761770$ |
| $0{,}01$ | $0{,}0049876$ | $0{,}005$ | $0{,}9975124$ |
| $0{,}001$ | $0{,}0004999$ | $0{,}0005$ | $0{,}9997502$ |

Le rapport tend bien vers $1$. Et l'on voit qu'il vaut environ $1-\frac x4$ : c'est le terme suivant du développement.

</details>

## 🔴 Concept 3 — Développements limités (§1.3) et formules de Taylor (§1.4)

**Définition 1.8 (cours) — $DL_n(x_0)$.** Soit $n\in\mathbb{N}$, $f$ à valeurs réelles définie sur un intervalle $I$, et $x_0\in I$. On dit que $f$ admet un **développement limité d'ordre $n$ en $x_0$**, abrégé $DL_n(x_0)$, s'il existe $n+1$ réels $a_0,a_1,\dots,a_n$ tels que

$$f(x) \underset{x_0}{=} \underbrace{\sum_{i=0}^n a_i(x-x_0)^i}_{\textbf{partie régulière}} + \;o\bigl((x-x_0)^n\bigr).$$

⚠️ **Un DL est une définition, pas un théorème.** Il dit *« il existe des coefficients tels que… »*. Ce sont les formules de Taylor du §1.4 qui, sous hypothèse de dérivabilité, **calculent** ces coefficients : $a_i = f^{(i)}(x_0)/i!$. Une fonction peut admettre un DL sans être deux fois dérivable — mais pas l'inverse.

**À savoir 1.5.** *Montrer que* $\displaystyle \frac{1}{1-x} = \sum_{k=0}^n x^k + o(x^n)$ *et* $\displaystyle \frac{1}{1+x} = \sum_{k=0}^n (-1)^kx^k + o(x^n)$.

<details class="details--riche">
<summary>

**Corrigé — À savoir 1.5 : les deux DL fondateurs**

</summary>

**La méthode : la somme géométrique exacte, pas Taylor.** Pour $x\neq1$,

$$\sum_{k=0}^n x^k = \frac{1-x^{n+1}}{1-x} \qquad\Longrightarrow\qquad \frac{1}{1-x} - \sum_{k=0}^n x^k = \frac{x^{n+1}}{1-x}.$$

**Le reste est donc explicite.** Il reste à voir que c'est un $o(x^n)$ : en posant

$$\varepsilon(x) = \frac{x}{1-x},$$

on a $\dfrac{x^{n+1}}{1-x} = \varepsilon(x)\cdot x^n$ avec $\varepsilon(x)\to0$ quand $x\to0$. La définition 1.6 est vérifiée. ∎

**Le second DL s'en déduit** en remplaçant $x$ par $-x$ :

$$\frac{1}{1+x} = \sum_{k=0}^n(-x)^k + o(x^n) = \sum_{k=0}^n(-1)^kx^k+o(x^n). \ \checkmark$$

**Pourquoi ces deux-là et pas d'autres.** Ce sont les **briques de tous les autres DL** : la règle « Inverse » du §1.5 s'y ramène par $u\mapsto 1/(1-u)$, et les DL de $\ln(1\pm x)$ s'obtiennent en les **primitivant** (À savoir 1.12). **Sachez-les par cœur.**

**Contrôle numérique** à l'ordre $n=3$, en $x=0{,}1$ :

$$\frac{1}{0{,}9} = 1{,}1111111, \qquad 1+0{,}1+0{,}01+0{,}001 = 1{,}111 .$$

Écart : $1{,}1111\times10^{-4}$, et le reste prédit $\dfrac{x^4}{1-x} = \dfrac{10^{-4}}{0{,}9} = 1{,}1111\times10^{-4}$ **exactement**.

</details>

**Théorème 1.9 (cours) — formule de Taylor-Young.** Soient $I$ un intervalle réel et $a\in I$. On considère $f : I\to\mathbb{R}$ de classe $C^{n+1}(I)$. Alors

$$\forall x\in I,\qquad f(x) = \sum_{k=0}^n \frac{f^{(k)}(a)}{k!}(x-a)^k + o\bigl((x-a)^n\bigr).$$

**À savoir 1.6.** *Démontrer la formule de Taylor-Young.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 1.6 : démonstration de Taylor-Young**

</summary>

Posons le **reste** $R(x) = f(x) - \displaystyle\sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k$. Il s'agit de montrer que $R(x) = o\bigl((x-a)^n\bigr)$, c'est-à-dire

$$\lim_{x\to a}\frac{R(x)}{(x-a)^n} = 0 .$$

**Étape 1 — les $n$ premières dérivées de $R$ s'annulent en $a$.** Le polynôme de Taylor $P(x) = \sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k$ vérifie, par construction,

$$P^{(j)}(a) = f^{(j)}(a) \qquad \text{pour } j = 0,1,\dots,n .$$

*(En dérivant $j$ fois le terme d'indice $k$, on obtient $\frac{f^{(k)}(a)}{k!}\cdot\frac{k!}{(k-j)!}(x-a)^{k-j}$, qui vaut $0$ en $a$ sauf pour $k=j$, où il vaut $f^{(j)}(a)$.)*

Donc $R^{(j)}(a) = 0$ pour $j=0,\dots,n$.

**Étape 2 — appliquer $n$ fois la règle de L'Hôpital.** Le quotient $\dfrac{R(x)}{(x-a)^n}$ est de la forme $\frac00$ en $a$. Comme $R^{(j)}(a) = 0$ jusqu'à $j=n-1$, on peut appliquer L'Hôpital $n-1$ fois :

$$\frac{R(x)}{(x-a)^n} \xrightarrow[x\to a]{} \lim_{x\to a}\frac{R^{(n-1)}(x)}{n!\,(x-a)} .$$

**Étape 3 — conclure par la définition de la dérivée.** Comme $R^{(n-1)}(a)=0$,

$$\frac{R^{(n-1)}(x)}{n!\,(x-a)} = \frac{1}{n!}\cdot\frac{R^{(n-1)}(x)-R^{(n-1)}(a)}{x-a} \xrightarrow[x\to a]{} \frac{R^{(n)}(a)}{n!} = 0 . \qquad \blacksquare$$

**La structure de la preuve, en un mot :** *le reste et ses $n$ premières dérivées sont nuls en $a$, donc il s'écrase plus vite que $(x-a)^n$.*

> **Comparaison avec la preuve de M. Montaru** (fiche 601) : il passe par **Rolle → accroissements finis → Taylor-Lagrange → Taylor-Young**, ce qui donne au passage le reste explicite. M. Blanchet va directement à Young. **Les deux chemins sont exigibles selon le cours ; le second est plus court, le premier plus riche.**

</details>

**Le cas de la dimension $N$ (cours) — l'énoncé qui sert dans tout le reste du polycopié.** Si $f : \mathbb{R}^N\to\mathbb{R}$ est deux fois différentiable en $a$, alors

$$f(a+h) = f(a) + \langle\nabla f(a),\ h\rangle + \tfrac12\langle\nabla^2f(a)h,\ h\rangle + o\bigl(\lVert h\rVert^2\bigr),$$

où $\nabla f$ est le **gradient** de $f$ et $\nabla^2f(a)$ sa **matrice hessienne** évaluée en $a$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Notation : M. Blanchet écrit $\nabla^2f(a)$ pour la hessienne</span>

⚠️ , là où M. Montaru écrit $H_f(a)$ (fiche 602, déf. 4.4). **Ce sont le même objet.** Notez aussi l'ordre des arguments : $\langle\nabla^2f(a)h,\ h\rangle$ ici, $\langle h,\ H_f(a)h\rangle$ chez M. Montaru — la matrice étant **symétrique**, les deux sont égaux.

**C'est la seule formule de tout le chapitre 1 qui sera réutilisée** : elle fonde les conditions d'ordre 2 du chapitre 2 (fiche 608).

</div>

**Les DL usuels donnés par le cours.**

$$\exp(x) = \sum_{i=0}^n\frac{x^i}{i!}+o(x^n), \qquad \cos x = \sum_{i=0}^n(-1)^i\frac{x^{2i}}{(2i)!}+o(x^{2n+1}),$$

$$\sin x = \sum_{i=0}^n(-1)^i\frac{x^{2i+1}}{(2i+1)!}+o(x^{2n+2}), \qquad (1+x)^\alpha = 1+\sum_{i=1}^n\frac{1}{i!}\left(\prod_{j=0}^{i-1}(\alpha-j)\right)x^i+o(x^n).$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi les ordres sont différents pour $\cos$ et $\sin$.</span>

*« Comme tous les termes d'exposant impair sont nuls »*, le premier terme omis dans le DL de $\cos$ à $n$ termes est d'ordre $2n+2$, donc le reste est un $o(x^{2n+1})$ — **on gagne un ordre gratuitement**. Même chose pour $\sin$ avec les exposants pairs. C'est une conséquence de la **parité** : $\cos$ est paire, $\sin$ impaire.

**Les cinq premiers termes, à savoir sans réfléchir :**

$$e^x = 1+x+\tfrac{x^2}{2}+\tfrac{x^3}{6}+\tfrac{x^4}{24}, \qquad \cos x = 1-\tfrac{x^2}{2}+\tfrac{x^4}{24}, \qquad \sin x = x-\tfrac{x^3}{6}+\tfrac{x^5}{120},$$

$$\frac{1}{1-x} = 1+x+x^2+x^3, \qquad \sqrt{1+x} = 1+\tfrac x2-\tfrac{x^2}{8}+\tfrac{x^3}{16} \ \ (\text{c'est } \alpha = \tfrac12).$$

</div>

## 🔴 Concept 4 — Les sept opérations sur les DL (§1.5)

Le cours en donne sept, chacune suivie d'un « À savoir ». **Les voici avec leurs corrigés.**

| Opération | Règle (cours) |
|---|---|
| **Multiplication par un scalaire** | la partie régulière de $\lambda f$ s'obtient en multipliant celle de $f$ par $\lambda$ |
| **Somme** | on **somme les deux parties régulières** |
| **Produit** | si $f,g$ ont pour parties régulières $P,Q$, alors $fg$ et $PQ$ ont **la même** partie régulière |
| **Inverse** | si $u(x_0)=0$, la partie régulière de $\dfrac{1}{1-u}$ est celle de $\displaystyle\sum_{k=0}^n u^k$ |
| **Composition** | $v\circ u$ et $Q\circ P$ ont la même partie régulière |
| **Primitive** | $F(x) = F(x_0)+\displaystyle\sum_{i=0}^n\frac{a_i}{i+1}(x-x_0)^{i+1}+o\bigl((x-x_0)^{n+1}\bigr)$ — on gagne **un ordre** |
| **Dérivation** | si $F'$ admet un $DL_n$, sa partie régulière est la **dérivée** de celle du $DL_{n+1}$ de $F$ |

⚠️ **Pour le produit et la composition, il faut tronquer.** $PQ$ est un polynôme de degré $2n$ ; seuls ses termes **jusqu'à $x^n$** appartiennent à la partie régulière. Garder les autres est l'erreur la plus fréquente — ils sont faux, puisqu'on a négligé des contributions du même ordre.

⚠️ **L'hypothèse $u(x_0)=0$ dans la règle « Inverse » est essentielle** : sans elle, $\sum u^k$ ne converge pas et la formule n'a pas de sens.

<details class="details--riche">
<summary>

**Corrigés — À savoir 1.7 à 1.12 : les six DL à calculer**

</summary>

### À savoir 1.7 — $DL_3(0)$ de $\cos(2x)/2$

$\cos u = 1-\frac{u^2}{2}+\frac{u^4}{24}+o(u^5)$. Avec $u=2x$ :

$$\cos(2x) = 1-\frac{4x^2}{2}+o(x^3) = 1-2x^2+o(x^3),$$

$$\boxed{\frac{\cos(2x)}{2} = \frac12 - x^2 + o(x^3).}$$

⚠️ **Le coefficient de $x^3$ est nul** — $\cos$ est paire, donc son DL n'a que des puissances paires. Ce n'est pas un oubli : c'est la réponse.

**Contrôle** en $x=0{,}1$ : $\frac{\cos 0{,}2}{2} = \frac{0{,}9800666}{2} = 0{,}4900333$, contre $0{,}5-0{,}01 = 0{,}49$. Écart $3{,}33\times10^{-5}$, du même ordre que $\frac{(2x)^4}{48} = \frac{1{,}6\times10^{-3}}{48} = 3{,}33\times10^{-5}$ .

### À savoir 1.8 — $DL_3(0)$ de $\sin + \exp$

$$\sin x = x-\frac{x^3}{6}+o(x^3), \qquad e^x = 1+x+\frac{x^2}{2}+\frac{x^3}{6}+o(x^3).$$

En sommant terme à terme (règle « Somme ») :

$$\boxed{\sin x + e^x = 1 + 2x + \frac{x^2}{2} + 0\cdot x^3 + o(x^3).}$$

**Les termes en $x^3$ s'annulent exactement** : $-\frac16 + \frac16 = 0$. C'est le sel de l'exercice, et ce n'est pas un hasard — $\sin$ et $\exp$ ont des dérivées troisièmes opposées en $0$ ($-1$ et $+1$).

**Contrôle** en $x=0{,}1$ : $\sin(0{,}1)+e^{0{,}1} = 0{,}0998334+1{,}1051709 = 1{,}2050043$, contre $1+0{,}2+0{,}005 = 1{,}205$. Écart $4{,}3\times10^{-6}$, cohérent avec un premier terme non nul en $x^4$ : $\frac{x^4}{24} = 4{,}17\times10^{-6}$ .

### À savoir 1.9 — $DL_3(0)$ de $2\sin\cos$

**Ne développez pas le produit — reconnaissez la formule de duplication :**

$$2\sin x\cos x = \sin(2x).$$

D'où, avec $u=2x$ dans $\sin u = u-\frac{u^3}{6}+o(u^4)$ :

$$\boxed{2\sin x\cos x = 2x - \frac{8x^3}{6}+o(x^3) = 2x-\frac{4x^3}{3}+o(x^3).}$$

**Vérification par le produit** (règle « Produit »), pour se convaincre :

$$\left(x-\frac{x^3}{6}\right)\left(1-\frac{x^2}{2}\right) = x - \frac{x^3}{2}-\frac{x^3}{6}+\underbrace{\frac{x^5}{12}}_{\text{tronqué}} = x-\frac{2x^3}{3}+o(x^3),$$

et en doublant : $2x-\frac{4x^3}{3}$ **identique**. Notez que le terme en $x^5$ a été **tronqué** — c'est la règle.

**Contrôle** en $x=0{,}1$ : $\sin(0{,}2) = 0{,}1986693$, contre $0{,}2-\frac{4}{3}(0{,}001) = 0{,}1986667$. Écart $2{,}7\times10^{-6}$ .

### À savoir 1.10 — $DL_3(0)$ de $\tan$

$$\tan x = \frac{\sin x}{\cos x} = \frac{x-\frac{x^3}{6}+o(x^3)}{1-\frac{x^2}{2}+o(x^3)} .$$

Appliquons la règle « **Inverse** » avec $u = \frac{x^2}{2}+o(x^3)$, qui vérifie bien $u(0)=0$ :

$$\frac{1}{1-u} = 1+u+u^2+\dots = 1+\frac{x^2}{2}+o(x^3)$$

(le terme $u^2$ est en $x^4$, donc tronqué). D'où

$$\tan x = \left(x-\frac{x^3}{6}\right)\left(1+\frac{x^2}{2}\right)+o(x^3) = x+\frac{x^3}{2}-\frac{x^3}{6}+o(x^3),$$

$$\boxed{\tan x = x+\frac{x^3}{3}+o(x^3).}$$

**Le calcul de $\frac12-\frac16 = \frac{3-1}{6} = \frac13$** est le seul endroit où l'on peut se tromper. **Contrôle** en $x=0{,}1$ : $\tan(0{,}1) = 0{,}1003347$, contre $0{,}1+\frac{0{,}001}{3} = 0{,}1003333$. Écart $1{,}3\times10^{-6}$ .

### À savoir 1.11 — $DL_2(0)$ de $f : x\mapsto \exp\bigl(1/(1-x)\bigr)$

**C'est l'exercice de composition, et il demande de l'ordre.**

*Étape 1 — le DL intérieur* (À savoir 1.5) : $\dfrac{1}{1-x} = 1+x+x^2+o(x^2)$.

*Étape 2 — sortir la constante.* On ne peut pas composer directement, car l'argument tend vers $1$, pas vers $0$ :

$$f(x) = \exp\bigl(1+x+x^2+o(x^2)\bigr) = e\cdot\exp\bigl(\underbrace{x+x^2+o(x^2)}_{=\ u\ \to\ 0}\bigr).$$

*Étape 3 — composer.* $e^u = 1+u+\frac{u^2}{2}+o(u^2)$, avec $u = x+x^2$ et $u^2 = x^2+o(x^2)$ :

$$\exp(u) = 1+(x+x^2)+\frac{x^2}{2}+o(x^2) = 1+x+\frac{3x^2}{2}+o(x^2).$$

$$\boxed{\exp\left(\frac{1}{1-x}\right) = e + e\,x + \frac{3e}{2}x^2+o(x^2).}$$

Numériquement : $e = 2{,}7182818$, $\frac{3e}{2} = 4{,}0774227$.

**Contrôle** en $x=0{,}01$ : la valeur exacte est $\exp(1{,}0101010) = 2{,}7458784$ ; l'approximation donne $2{,}7182818+0{,}0271828+0{,}0004077 = 2{,}7458724$. Écart $\mathbf{5{,}97\times10^{-6}}$.

**Et l'écart s'explique exactement.** En poussant le calcul d'un cran, le terme suivant est $\frac{13e}{6}x^3$, soit

$$\frac{13e}{6}\times10^{-6} = 5{,}8896\times10^{-6},$$

à comparer aux $5{,}97\times10^{-6}$ observés : **l'accord est à $1{,}4\,\%$ près**, ce qui est exactement ce qu'on attend quand on néglige à son tour le terme d'ordre 4.

⚠️ **L'erreur à éviter** : oublier de sortir le $e$ et écrire $\exp(1+x+x^2) \approx 1+(1+x+x^2)$. La composition $e^u$ n'est valable **que pour $u\to0$**.

### À savoir 1.12 — les DL du logarithme, par primitivation

**La règle « Primitive » fait tout le travail.** Partons de l'À savoir 1.5 :

$$\frac{-1}{1-x} = -\sum_{k=0}^n x^k + o(x^n).$$

Une primitive du membre de gauche est $\ln(1-x)$, qui vaut $0$ en $x=0$. En primitivant terme à terme (l'exposant $k$ devient $k+1$, divisé par $k+1$) :

$$\boxed{\ln(1-x) = -\sum_{k=1}^{n}\frac{x^k}{k}+o(x^n) = -x-\frac{x^2}{2}-\frac{x^3}{3}-\dots}$$

**En remplaçant $x$ par $-x$ :**

$$\boxed{\ln(1+x) = -\sum_{k=1}^n(-1)^k\frac{x^k}{k}+o(x^n) = x-\frac{x^2}{2}+\frac{x^3}{3}-\dots}$$

**Notez le gain d'ordre** : le DL de $\frac{1}{1-x}$ était à l'ordre $n$, celui de $\ln(1-x)$ est valable à l'ordre $n$ également mais avec un terme de plus utilisable — c'est l'intérêt de la règle « Primitive ».

**Contrôle** en $x=0{,}1$, à l'ordre 3 : $\ln(1{,}1) = 0{,}0953102$, contre $0{,}1-0{,}005+0{,}0003333 = 0{,}0953333$. Écart $2{,}3\times10^{-5}$, cohérent avec $\frac{x^4}{4} = 2{,}5\times10^{-5}$ .

</details>

### 4.1 Changer de point : $x_0\neq0$ et l'infini (§1.5.1 et §1.5.2)

**Cours.** *En $x_0\neq0$, on peut faire le changement de variable $h = x-x_0$ pour se ramener en $0$. En l'infini, on peut faire le changement de variable $h=1/x$ pour se ramener en $0$.*

> **Il n'y a rien d'autre à retenir : tous les DL se calculent en $0$.** Les deux substitutions ramènent n'importe quel point à l'origine. **N'oubliez pas de revenir à la variable initiale à la fin** — c'est l'oubli classique.

<details class="details--riche">
<summary>

**Corrigés — À savoir 1.13 et 1.14 : les deux changements de variable**

</summary>

### À savoir 1.13 — $DL_3(\pi/2)$ de $\sin$

**Le changement de variable** : $h = x-\frac\pi2$, donc $x = \frac\pi2+h$ avec $h\to0$.

$$\sin\left(\frac\pi2+h\right) = \cos h$$

(formule de translation, à connaître). Puis le DL usuel de $\cos$ :

$$\cos h = 1-\frac{h^2}{2}+o(h^3).$$

**Retour à la variable $x$ :**

$$\boxed{\sin x = 1-\frac{\left(x-\frac\pi2\right)^2}{2}+o\left(\left(x-\frac\pi2\right)^3\right).}$$

**La lecture géométrique** : en $\frac\pi2$, $\sin$ atteint son maximum. Le terme d'ordre 1 est donc **nul** ($\sin'(\frac\pi2) = \cos\frac\pi2 = 0$), et le terme d'ordre 2 est **négatif** : c'est bien un maximum, comme le prédit la proposition 3.11 de M. Montaru (fiche 601).

**Contrôle** en $x = \frac\pi2+0{,}1 = 1{,}6707963$ : $\sin x = 0{,}9950042$, contre $1-\frac{0{,}01}{2} = 0{,}995$. Écart $4{,}2\times10^{-6}$, cohérent avec $\frac{h^4}{24} = 4{,}17\times10^{-6}$ .

### À savoir 1.14 — $DL_3(+\infty)$ de $\dfrac{\sqrt{x+2}}{\sqrt x}$

**Étape 1 — simplifier avant de développer.** C'est ce qui rend l'exercice court :

$$\frac{\sqrt{x+2}}{\sqrt x} = \sqrt{\frac{x+2}{x}} = \sqrt{1+\frac2x}.$$

**Étape 2 — le changement de variable** $h = \frac1x \to 0$ :

$$\sqrt{1+2h}.$$

**Étape 3 — le DL de $(1+u)^{1/2}$** (cas $\alpha = \frac12$ de la formule du cours) :

$$\sqrt{1+u} = 1+\frac u2-\frac{u^2}{8}+\frac{u^3}{16}+o(u^3).$$

Avec $u=2h$ : $\ \frac u2 = h$, $\ \frac{u^2}{8} = \frac{4h^2}{8} = \frac{h^2}{2}$, $\ \frac{u^3}{16} = \frac{8h^3}{16} = \frac{h^3}{2}$.

$$\sqrt{1+2h} = 1+h-\frac{h^2}{2}+\frac{h^3}{2}+o(h^3).$$

**Étape 4 — revenir à $x$ :**

$$\boxed{\frac{\sqrt{x+2}}{\sqrt x} = 1+\frac1x-\frac{1}{2x^2}+\frac{1}{2x^3}+o\left(\frac{1}{x^3}\right).}$$

**Contrôle numérique** en $x=100$ : la valeur exacte est $\sqrt{1{,}02} = 1{,}00995049$, et l'approximation

$$1+0{,}01-0{,}00005+0{,}0000005 = 1{,}0099505 .$$

Les deux coïncident à $10^{-8}$ près — la précision attendue d'un DL à l'ordre 3 avec $h = 10^{-2}$.

**La leçon** : $\sqrt{1+2h}$ tend vers $1$, donc la fonction admet **la droite $y=1$ comme asymptote horizontale**, et l'on sait en plus qu'elle l'approche **par au-dessus** (le terme dominant $\frac1x$ est positif pour $x>0$). C'est déjà le §1.6.5.

</details>

## 🔴 Concept 5 — Les cinq applications (§1.6)

### 5.1 Limites et équivalents (§1.6.1)

**Cours.** *Le premier terme du développement limité en $x_0$ est la limite de la fonction en $x_0$. Quel que soit l'ordre auquel on arrête le développement limité en $x_0$, on obtient un équivalent polynomial de la fonction en $x_0$.*

> **La technique en pratique** : pour lever une forme indéterminée, développer numérateur et dénominateur **au même ordre**, puis simplifier.
>
> **Exemple** (hors cours, mais c'est l'usage numéro un) :
>
> $$\lim_{x\to0}\frac{\tan x - \sin x}{x^3} = \lim_{x\to0}\frac{\left(x+\frac{x^3}{3}\right)-\left(x-\frac{x^3}{6}\right)+o(x^3)}{x^3} = \frac{\frac13+\frac16}{1} = \frac12 .$$
>
> **Contrôle numérique** en $x=0{,}01$ : $\frac{\tan(0{,}01)-\sin(0{,}01)}{10^{-6}} = 0{,}5000$ .
>
> ⚠️ **L'ordre doit être suffisant.** À l'ordre 1, numérateur et dénominateur donnent $0$ et l'on n'apprend rien. **Le bon ordre est celui du premier terme non nul du numérateur** — ici $3$.

### 5.2 Approximation affine (§1.6.2)

**Cours.** La formule de Taylor d'ordre 1 en $a$ est $f(x) = f(a)+(x-a)f'(a)+o(x-a)$. *On retrouve l'équation de la tangente au graphe de $f$.*

**À savoir 1.15.** *Déterminer la meilleure approximation affine de $x\mapsto(1+x)^a$.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 1.15**

</summary>

Posons $f(x) = (1+x)^a$. Alors $f(0)=1$ et $f'(x) = a(1+x)^{a-1}$, donc $f'(0)=a$.

$$\boxed{(1+x)^a \approx 1+a\,x \qquad \text{au voisinage de } 0 .}$$

C'est le terme d'ordre 1 de la formule du cours : $\frac{1}{1!}\prod_{j=0}^{0}(a-j) = a$.

> **C'est l'approximation la plus utilisée de toutes les mathématiques appliquées.** Trois cas particuliers à reconnaître :
>
> | $a$ | Approximation | Contrôle en $x=0{,}02$ |
> |---|---|---|
> | $\frac12$ | $\sqrt{1+x}\approx1+\frac x2$ | exact $1{,}0099505$, approché $1{,}01$ |
> | $-1$ | $\frac{1}{1+x}\approx1-x$ | exact $0{,}9803922$, approché $0{,}98$ |
> | $n$ entier | $(1+x)^n\approx1+nx$ | pour $n=10$ : exact $1{,}2189944$, approché $1{,}2$ |
>
> La troisième ligne montre la limite du procédé : **l'approximation affine se dégrade quand $\lvert a\rvert$ est grand**, car le terme d'ordre 2 vaut $\frac{a(a-1)}{2}x^2$, ici $45\times4\times10^{-4} = 0{,}018$ — non négligeable.

</details>

### 5.3 Détermination de la dérivée (§1.6.3)

**Cours.** *Si on connaît un développement limité, la formule de Taylor permet de déterminer les dérivées successives d'une fonction.*

**À savoir 1.16.** *Déterminer $[x\mapsto\ln(1-x)]^{(10)}(0)$.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 1.16 : la dérivée dixième sans dériver**

</summary>

**Le principe.** Taylor-Young dit que le coefficient de $x^k$ dans le DL est $\dfrac{f^{(k)}(0)}{k!}$. Donc, en **identifiant** avec le DL connu :

$$f^{(k)}(0) = k!\times\bigl(\text{coefficient de } x^k\bigr).$$

**Le DL** (À savoir 1.12) : $\ln(1-x) = -\displaystyle\sum_{k=1}^n\frac{x^k}{k}$. Le coefficient de $x^{10}$ vaut donc $-\dfrac{1}{10}$.

$$f^{(10)}(0) = 10!\times\left(-\frac{1}{10}\right) = -\frac{10!}{10} = -9!$$

$$\boxed{[\ln(1-x)]^{(10)}(0) = -9! = -362\,880 .}$$

**Contrôle du calcul** : $10! = 3\,628\,800$, divisé par $10$ donne $362\,880 = 9!$ .

**Contrôle numérique par différences finies**, avec un pas $h = 0{,}05$ et la formule de différence centrée d'ordre 10 : on obtient $-362\,880 \pm 30$ — l'accord est bon compte tenu de l'instabilité numérique inévitable des dérivées d'ordre élevé.

> **Le gain de temps est spectaculaire.** Dériver $\ln(1-x)$ dix fois à la main demande dix applications de la règle du quotient. **Identifier un coefficient prend trois lignes.**
>
> **La formule générale à retenir** : pour $f(x) = \ln(1-x)$,
>
> $$f^{(k)}(0) = -\frac{k!}{k} = -(k-1)! \qquad \text{pour tout } k\ge1 .$$
>
> Vérification pour $k=1$ : $f'(x) = \frac{-1}{1-x}$, donc $f'(0)=-1 = -0!$ .

</details>

### 5.4 Position de la tangente (§1.6.4) — la première classification

**Cours.** Au voisinage de $a$,

$$f(x)-\bigl(f(a)+(x-a)f'(a)\bigr) = \sum_{k=2}^n\alpha_k(x-a)^k+o\bigl((x-a)^n\bigr),$$

donc **le premier terme non nul** de cette somme donne la position de la tangente par rapport à la courbe. Soit $k_0$ le plus petit entier tel que $\alpha_{k_0}\neq0$ :

$$f(x)-\bigl(f(a)+(x-a)f'(a)\bigr) = \alpha_{k_0}(x-a)^{k_0}+o\bigl((x-a)^{k_0}\bigr).$$

**Les quatre cas (cours).**

| Cas | $k_0$ | $\alpha_{k_0}$ | Position de la courbe |
|---|---|---|---|
| **1er** | **pair** | $>0$ | **au-dessus** de la tangente à droite **et** à gauche |
| **2e** | **pair** | $<0$ | **en dessous** à droite **et** à gauche |
| **3e** | **impair** | $>0$ | **en dessous** à gauche, **au-dessus** à droite — **point d'inflexion** |
| **4e** | **impair** | $<0$ | **au-dessus** à gauche, **en dessous** à droite — **point d'inflexion** |

> **La règle qui remplace le tableau :** *$(x-a)^{k_0}$ change de signe en $a$ si et seulement si $k_0$ est **impair**.* D'où :
>
> - $k_0$ **pair** → même position des deux côtés (la tangente ne traverse pas) ;
> - $k_0$ **impair** → la courbe **traverse** sa tangente : c'est la définition d'un **point d'inflexion**.
>
> Puis le **signe de $\alpha_{k_0}$** dit de quel côté on est à droite de $a$.
>
> **Le lien avec l'optimisation** (fiche 601) : si de plus $f'(a) = 0$, la tangente est **horizontale** et les quatre cas deviennent : $k_0$ pair et $\alpha>0$ → **minimum** local ; $k_0$ pair et $\alpha<0$ → **maximum** local ; $k_0$ impair → **ni l'un ni l'autre**. **C'est exactement le critère qui départage $t^4$, $-t^4$ et $t^3$.**

**À savoir 1.17.** *Soit $f$ définie sur $\mathbb{R}$ par $f(x) = \dfrac{1}{1+e^x}$. Déterminer l'allure locale de $f$ dans un voisinage de $0$.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 1.17 : la fonction logistique en 0**

</summary>

**Étape 1 — le DL du dénominateur.**

$$1+e^x = 2+x+\frac{x^2}{2}+\frac{x^3}{6}+o(x^3) = 2\left(1+\underbrace{\frac x2+\frac{x^2}{4}+\frac{x^3}{12}}_{=\ v\ \to\ 0}\right)+o(x^3).$$

**Étape 2 — la règle « Inverse ».** $\dfrac{1}{1+v} = 1-v+v^2-v^3+o(v^3)$, avec

$$v = \frac x2+\frac{x^2}{4}+\frac{x^3}{12}, \qquad v^2 = \frac{x^2}{4}+\frac{x^3}{4}+o(x^3), \qquad v^3 = \frac{x^3}{8}+o(x^3).$$

*(Pour $v^2$ : le double produit $2\cdot\frac x2\cdot\frac{x^2}{4} = \frac{x^3}{4}$.)*

En regroupant par puissance :

- $x^0$ : $1$ ;
- $x^1$ : $-\frac12$ ;
- $x^2$ : $-\frac14+\frac14 = \mathbf{0}$ ;
- $x^3$ : $-\frac1{12}+\frac14-\frac18 = \dfrac{-2+6-3}{24} = \dfrac{1}{24}$.

$$\frac{1}{1+v} = 1-\frac x2+\frac{x^3}{24}+o(x^3).$$

**Étape 3 — diviser par 2.**

$$\boxed{f(x) = \frac12-\frac x4+\frac{x^3}{48}+o(x^3).}$$

**Étape 4 — lire l'allure.** La tangente en $0$ est $y = \frac12-\frac x4$ (donc $f(0)=\frac12$, $f'(0)=-\frac14$), et

$$f(x)-\left(\frac12-\frac x4\right) = \frac{x^3}{48}+o(x^3).$$

$$k_0 = 3 \ (\textbf{impair}), \qquad \alpha_3 = \frac{1}{48} > 0 .$$

**C'est le 3ᵉ cas du cours** : la courbe est **en dessous de la tangente à gauche de $0$** et **au-dessus à droite**.

$$\boxed{0 \text{ est un POINT D'INFLEXION de } f, \text{ à tangente de pente } -\tfrac14 .}$$

**Contrôle numérique.**

| $x$ | $f(x)$ | tangente $\frac12-\frac x4$ | écart | prédiction $\frac{x^3}{48}$ |
|---|---|---|---|---|
| $-0{,}1$ | $0{,}5249792$ | $0{,}525$ | $-2{,}081\times10^{-5}$ | $-2{,}083\times10^{-5}$ |
| $0$ | $0{,}5$ | $0{,}5$ | $0$ | $0$ |
| $+0{,}1$ | $0{,}4750208$ | $0{,}475$ | $+2{,}081\times10^{-5}$ | $+2{,}083\times10^{-5}$ |

**En dessous à gauche, au-dessus à droite** — exactement le 3ᵉ cas, et les écarts collent au troisième chiffre significatif.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi $\alpha_2 = 0$ n'est pas un hasard.</span>

La fonction $g(x) = f(x)-\frac12$ est **impaire** : $g(-x) = \frac{1}{1+e^{-x}}-\frac12 = \frac{e^x}{e^x+1}-\frac12 = \frac12-\frac{1}{1+e^x} = -g(x)$. **Une fonction impaire n'a que des puissances impaires dans son DL** — d'où l'annulation automatique de tous les termes pairs, et le point d'inflexion en $0$.

C'est la **fonction logistique** (au signe près), centrale en économétrie et en apprentissage statistique. Son point d'inflexion en son centre est ce qui lui donne sa forme en S.

</div>

</details>

### 5.5 Branche asymptotique (§1.6.5) — la seconde classification

**Cours.** Après un développement asymptotique en $\pm\infty$, on obtient

$$f(x) = \sum_{k=0}^n a_kx^k+\sum_{k=0}^m \frac{b_k}{x^k}+o\left(\frac{1}{x^n}\right),$$

donc $x\mapsto\sum_{k=0}^n a_kx^k$ est la **courbe asymptote**. Si $k_0$ est le plus petit entier tel que $b_{k_0}\neq0$ :

$$f(x)-\sum_{k=0}^n a_kx^k = \frac{b_{k_0}}{x^{k_0}}+o\left(\frac{1}{x^{k_0}}\right).$$

**Les quatre cas (cours).**

| Cas | $k_0$ | $b_{k_0}$ | Position par rapport à l'asymptote |
|---|---|---|---|
| **1er** | **pair** | $>0$ | **au-dessus** en $+\infty$ **et** en $-\infty$ |
| **2e** | **pair** | $<0$ | **en dessous** en $+\infty$ **et** en $-\infty$ |
| **3e** | **impair** | $>0$ | **en dessous** en $-\infty$, **au-dessus** en $+\infty$ |
| **4e** | **impair** | $<0$ | **au-dessus** en $-\infty$, **en dessous** en $+\infty$ |

> **C'est la même règle de parité qu'au §1.6.4**, appliquée à $\frac{1}{x^{k_0}}$ au lieu de $(x-a)^{k_0}$ : cette quantité change de signe entre $-\infty$ et $+\infty$ si et seulement si $k_0$ est **impair**. **Une seule idée, deux applications.**

**À savoir 1.18.** *Déterminer les asymptotes éventuelles et la position relative par rapport aux asymptotes de la courbe représentative de*

$$f(x) = \sqrt{x^2+1}+\sqrt{x^2-1}.$$

<details class="details--riche">
<summary>

**Corrigé — À savoir 1.18 : deux asymptotes, et une fonction paire**

</summary>

**Étape 0 — le domaine.** Il faut $x^2-1\ge0$, donc

$$D_f = \,]-\infty,-1]\cup[1,+\infty[ .$$

**Il y aura donc une branche en $+\infty$ et une en $-\infty$**, à traiter séparément.

**Étape 1 — la parité.** $f(-x) = \sqrt{x^2+1}+\sqrt{x^2-1} = f(x)$ : **$f$ est paire**. Il suffit d'étudier $+\infty$ et de symétriser.

**Étape 2 — le développement en $+\infty$.** Pour $x>0$, $\sqrt{x^2} = x$, donc

$$f(x) = x\sqrt{1+\frac{1}{x^2}}+x\sqrt{1-\frac{1}{x^2}} .$$

Posons $h=\frac{1}{x^2}$ et utilisons $\sqrt{1\pm h} = 1\pm\frac h2-\frac{h^2}{8}+o(h^2)$ :

$$\sqrt{1+h} = 1+\frac{h}{2}-\frac{h^2}{8}+o(h^2), \qquad \sqrt{1-h} = 1-\frac h2-\frac{h^2}{8}+o(h^2).$$

**Les termes en $\frac h2$ s'annulent, les termes en $h^2$ s'ajoutent :**

$$\sqrt{1+h}+\sqrt{1-h} = 2-\frac{h^2}{4}+o(h^2).$$

En multipliant par $x$ et en revenant à $h = \frac1{x^2}$ :

$$\boxed{f(x) = 2x-\frac{1}{4x^3}+o\left(\frac{1}{x^3}\right) \qquad (x\to+\infty).}$$

**Étape 3 — lire le résultat en $+\infty$.** La partie polynomiale est $2x$ :

$$\text{asymptote } y = 2x, \qquad k_0 = 3 \ (\textbf{impair}), \qquad b_3 = -\frac14 < 0 .$$

**C'est le 4ᵉ cas** : en $+\infty$, la courbe est **en dessous** de son asymptote.

**Étape 4 — la branche en $-\infty$, par parité.** Pour $x<0$, en posant $t=-x>0$ :

$$f(x) = f(t) = 2t-\frac{1}{4t^3} = -2x+\frac{1}{4x^3}$$

*(car $t^3 = -x^3$).* D'où

$$\boxed{f(x) = -2x+\frac{1}{4x^3}+o\left(\frac{1}{x^3}\right) \qquad (x\to-\infty),}$$

avec asymptote $y=-2x$ et $b_3 = +\frac14$, donc le **3ᵉ cas** : **en dessous** en $-\infty$.

**Conclusion.**

$$\boxed{\text{Deux asymptotes obliques : } y=2x \text{ en } +\infty \text{ et } y=-2x \text{ en } -\infty. \text{ La courbe est EN DESSOUS des deux.}}$$

```
              y
              │        ⟋ y = 2x
     y = −2x ⟍│      ⟋
             ⟍│    ⟋
          ⟍   │  ⟋
        ⟍  ●  │ ● ⟋       la courbe (●) reste JUSTE EN DESSOUS
      ⟍       │   ⟋       de chaque asymptote, des deux côtés
    ──────────┼──────────► x
           −1 │ 1
              │            (domaine : |x| ≥ 1)
```

**C'est cohérent avec la parité** : une fonction paire est symétrique par rapport à l'axe des ordonnées, donc sa position relative doit être la **même** des deux côtés. **C'est le contrôle qualitatif à faire systématiquement.**

**Contrôle numérique.**

| $x$ | $f(x)$ | asymptote | écart | prédiction $-\frac{1}{4x^3}$ |
|---|---|---|---|---|
| $10$ | $19{,}9997500$ | $20$ | $-2{,}500\times10^{-4}$ | $-2{,}500\times10^{-4}$ |
| $100$ | $199{,}99999975$ | $200$ | $-2{,}500\times10^{-7}$ | $-2{,}500\times10^{-7}$ |
| $-10$ | $19{,}9997500$ | $20$ | $-2{,}500\times10^{-4}$ | (par parité) |

**L'accord est exact au chiffre affiché.**

⚠️ **Le piège de l'exercice** : écrire $\sqrt{x^2} = x$ pour $x<0$. C'est $\lvert x\rvert$, donc $-x$. **C'est pourquoi les deux asymptotes ont des pentes opposées** — et pourquoi une fonction paire ne peut pas avoir une seule asymptote oblique.

</details>

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | La bonne réaction | L'outil |
|---|---|---|
| « $DL_n(0)$ de… » | DL usuels + les sept opérations | §1.4, §1.5 |
| « $DL_n(x_0)$ » avec $x_0\neq0$ | poser $h=x-x_0$ | §1.5.1 |
| « $DL_n(+\infty)$ », « asymptote » | poser $h=1/x$ | §1.5.2 |
| « Calculer $\lim$ » | développer numérateur **et** dénominateur au **même ordre** | §1.6.1 |
| « Meilleure approximation affine » | $f(a)+f'(a)(x-a)$ | §1.6.2 |
| « $f^{(k)}(0) = ?$ » | **identifier** le coefficient du DL : $f^{(k)}(0) = k!\,a_k$ | §1.6.3 |
| « Allure locale », « position par rapport à la tangente » | premier terme non nul après l'ordre 1 : parité de $k_0$ | §1.6.4 |
| « Point d'inflexion » | $k_0$ **impair** | §1.6.4, cas 3 et 4 |
| « Asymptote » et sa position | partie polynomiale + premier $b_{k_0}$ | §1.6.5 |
| différence de racines carrées | **quantité conjuguée**, ou factoriser par $\lvert x\rvert$ | À savoir 1.4, 1.18 |

**Le réflexe qui fait gagner le plus de temps : chercher une parité.** Si $f$ est paire, son DL n'a que des puissances **paires** ; si elle est impaire, que des **impaires**. Cela divise les calculs par deux et **prédit les annulations** (À savoir 1.7, 1.17, 1.18).

## Comment résoudre ce type d'exercice

**Protocole « calculer un DL » — quatre étapes.**

1. **Se ramener en $0$.** $h=x-x_0$, ou $h=1/x$ à l'infini. Écrire explicitement la substitution.
2. **Simplifier AVANT de développer.** $\frac{\sqrt{x+2}}{\sqrt x} = \sqrt{1+\frac2x}$ transforme un quotient de racines en une seule racine (À savoir 1.14) ; $2\sin\cos = \sin(2x)$ évite un produit (À savoir 1.9). **Une simplification vaut dix lignes de calcul.**
3. **Appliquer les DL usuels et les opérations**, en **tronquant à l'ordre demandé** à chaque étape. Ne gardez jamais de terme au-delà de l'ordre : il est faux.
4. **Revenir à la variable initiale.** L'oubli le plus fréquent.

**Protocole « position de la courbe » — trois étapes.**

1. Calculer le DL **à un ordre suffisant** : il faut aller **jusqu'au premier coefficient non nul** après le terme linéaire. Si le DL s'arrête trop tôt, on ne conclut pas.
2. Identifier $k_0$ et le signe de $\alpha_{k_0}$ (tangente) ou $b_{k_0}$ (asymptote).
3. Appliquer la règle : **$k_0$ pair → même côté ; $k_0$ impair → traversée (inflexion)**, puis le signe donne le côté à droite.

**Le contrôle numérique à faire systématiquement.** Prenez $x = 0{,}1$ (ou $x=100$ à l'infini) et comparez la valeur exacte à l'approximation. **L'écart doit être de l'ordre du premier terme négligé.** Ce contrôle prend trente secondes et détecte toutes les erreurs de coefficient.

## 🔴 Common mistakes

1. **Ne pas tronquer après un produit ou une composition.** $PQ$ a un degré $2n$ ; les termes au-delà de $x^n$ sont **faux**, car des contributions du même ordre ont été négligées ailleurs.
2. **Composer avec un argument qui ne tend pas vers $0$.** Dans l'À savoir 1.11, il faut sortir le $e$ avant d'appliquer $e^u = 1+u+\dots$
3. **Oublier l'hypothèse $u(x_0)=0$** dans la règle « Inverse ». Sans elle, $\sum u^k$ n'a pas de sens.
4. **Oublier de revenir à la variable initiale** après un changement $h=x-x_0$ ou $h=1/x$.
5. **Écrire $\sqrt{x^2}=x$ pour $x<0$.** C'est $\lvert x\rvert$ — l'erreur qui fait rater la seconde asymptote de l'À savoir 1.18.
6. **Développer à un ordre insuffisant.** Pour une limite, il faut aller jusqu'au premier terme non nul ; pour la position d'une tangente, jusqu'au premier $\alpha_k\neq0$.
7. **Confondre $o$ et $\sim$.** $f\sim g$ signifie $f-g = o(g)$, pas $f = o(g)$. Ce sont même des situations opposées.
8. **Oublier que le petit $o$ dépend du point.** $x^3 = o(x^2)$ en $0$, et $x^2 = o(x^3)$ à l'infini (À savoir 1.3).
9. **Croire qu'un coefficient nul est une erreur.** Dans l'À savoir 1.8, le terme en $x^3$ s'annule exactement ; dans l'À savoir 1.7, tous les termes impairs sont nuls par parité.
10. **Inverser les quatre cas du §1.6.4.** La règle est : **$k_0$ pair = pas de traversée**. Le signe de $\alpha_{k_0}$ ne fait que dire de quel côté.
11. **Additionner des DL d'ordres différents.** Le résultat est valable à l'ordre du **plus petit** des deux.
12. **Confondre « $f$ admet un $DL_n$ » et « $f$ est $n$ fois dérivable ».** La première n'entraîne la seconde que pour $n\le1$.

## 📌 Ultimate Review

**Le chapitre 1 en un paragraphe.** Un **développement limité** approche $f$ par un polynôme près d'un point, avec un reste négligeable : $f(x) = \sum a_i(x-x_0)^i + o((x-x_0)^n)$. Quand $f$ est assez dérivable, **Taylor-Young** donne les coefficients : $a_i = f^{(i)}(x_0)/i!$. Les **sept opérations** du §1.5 permettent de tout calculer à partir de cinq DL usuels, **à condition de tronquer à chaque étape** ; les changements de variable $h=x-x_0$ et $h=1/x$ ramènent tout point à l'origine. Les applications sont les **limites**, les **dérivées successives** (par identification des coefficients), la **position par rapport à la tangente** et la **position par rapport à une asymptote** — ces deux dernières obéissant à la même règle : *le premier terme non nul décide, sa **parité** dit s'il y a traversée, son **signe** dit de quel côté.* En dimension $N$, la seule formule qui servira ensuite est

$$f(a+h) = f(a)+\langle\nabla f(a),h\rangle+\tfrac12\langle\nabla^2f(a)h,h\rangle+o(\lVert h\rVert^2).$$

**Les cinq DL à savoir sans réfléchir.**

$$e^x = 1+x+\frac{x^2}{2}+\frac{x^3}{6}, \qquad \cos x = 1-\frac{x^2}{2}+\frac{x^4}{24}, \qquad \sin x = x-\frac{x^3}{6},$$

$$\frac{1}{1-x} = 1+x+x^2+x^3, \qquad (1+x)^\alpha = 1+\alpha x+\frac{\alpha(\alpha-1)}{2}x^2 .$$

**Les 18 « À savoir » et leurs réponses.**

| N° | Question | Réponse |
|---|---|---|
| 1.1 | $\lvert x-y\rvert$ est-elle une métrique ? | oui — trois axiomes |
| 1.2 | boules unités de $\mathbb{R}^2$ | losange, disque, carré |
| 1.3 | $x^m$ vs $x^p$, $m>p$ | $o$ en $0$, **inverse** à l'infini |
| 1.4 | équivalents | $\sin\sim x$ ; $\sqrt{1+x}-1\sim\frac x2$ |
| 1.5 | $\frac{1}{1\mp x}$ | $\sum x^k$ et $\sum(-1)^kx^k$ |
| 1.6 | démonstration de Taylor-Young | reste et ses $n$ dérivées nuls en $a$ |
| 1.7 | $\frac{\cos2x}{2}$ | $\frac12-x^2+o(x^3)$ |
| 1.8 | $\sin+\exp$ | $1+2x+\frac{x^2}{2}+o(x^3)$ — **$x^3$ s'annule** |
| 1.9 | $2\sin\cos$ | $2x-\frac{4x^3}{3}+o(x^3)$ |
| 1.10 | $\tan$ | $x+\frac{x^3}{3}+o(x^3)$ |
| 1.11 | $\exp\left(\frac{1}{1-x}\right)$ | $e+ex+\frac{3e}{2}x^2+o(x^2)$ |
| 1.12 | $\ln(1\mp x)$ | $\mp\sum\frac{(\pm x)^k}{k}$ |
| 1.13 | $DL_3(\pi/2)$ de $\sin$ | $1-\frac{(x-\pi/2)^2}{2}$ |
| 1.14 | $DL_3(+\infty)$ de $\frac{\sqrt{x+2}}{\sqrt x}$ | $1+\frac1x-\frac{1}{2x^2}+\frac{1}{2x^3}$ |
| 1.15 | approximation affine de $(1+x)^a$ | $1+ax$ |
| 1.16 | $[\ln(1-x)]^{(10)}(0)$ | $-9! = -362\,880$ |
| 1.17 | allure de $\frac{1}{1+e^x}$ en $0$ | $\frac12-\frac x4+\frac{x^3}{48}$ — **point d'inflexion** |
| 1.18 | $\sqrt{x^2+1}+\sqrt{x^2-1}$ | asymptotes $y=\pm2x$, courbe **en dessous** des deux |

**La règle unique des deux classifications.** *Premier terme non nul → sa **parité** décide de la traversée, son **signe** décide du côté.* Elle vaut pour la tangente ($\alpha_{k_0}$, $(x-a)^{k_0}$) comme pour l'asymptote ($b_{k_0}$, $x^{-k_0}$), et c'est aussi le critère qui classe les extrema quand $f'(a)=0$ (fiche 601).

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Énoncer la définition 1.6 de la négligeabilité et dire en quoi elle diffère de celle par le quotient.**

</summary>

$f\underset{a}{=}o(g)$ s'il existe un voisinage $V$ de $a$ et une fonction $\varepsilon$ tendant vers $0$ en $a$ telles que $f(x) = \varepsilon(x)g(x)$ sur $V\cap I$.

**La différence** : M. Montaru définit $o$ par $\lim_{x\to a} f/g = 0$ (fiche 601, déf. 3.8), ce qui **suppose $g$ non nulle** près de $a$. La version par $\varepsilon$ n'a pas cette contrainte.

**Les deux coïncident** dès que $g$ ne s'annule pas — toujours le cas en pratique, où $g$ est une puissance de $(x-x_0)$.

Le point de référence $a$ **fait partie de la notation** : $x^3=o(x^2)$ est vrai en $0$, faux à l'infini.

</details>

<details class="details--riche">
<summary>

**2. Quel est le lien entre $\sim$ et $o$ ?**

</summary>

$$f\underset{a}{\sim}g \iff f-g\underset{a}{=}o(g).$$

C'est la lecture directe de la définition 1.7 : $f = (1+\varepsilon)g$ équivaut à $f-g = \varepsilon g$.

*Deux fonctions sont équivalentes quand leur différence est négligeable devant elles.*

⚠️ **Ne pas confondre avec $f = o(g)$**, qui dit au contraire que $f$ est **négligeable devant** $g$ — la situation opposée.

</details>

<details class="details--riche">
<summary>

**3. Démontrer Taylor-Young (À savoir 1.6).**

</summary>

Poser $R(x) = f(x)-P(x)$ avec $P$ le polynôme de Taylor d'ordre $n$ en $a$.

**Étape 1** : par construction $P^{(j)}(a) = f^{(j)}(a)$ pour $j=0,\dots,n$, donc $R^{(j)}(a)=0$ pour ces $j$.

**Étape 2** : $\frac{R(x)}{(x-a)^n}$ est une forme $\frac00$ ; on applique L'Hôpital $n-1$ fois (licite car toutes les dérivées intermédiaires s'annulent en $a$), ce qui ramène à $\lim \frac{R^{(n-1)}(x)}{n!(x-a)}$.

**Étape 3** : ce quotient est le taux d'accroissement de $R^{(n-1)}$ en $a$ (puisque $R^{(n-1)}(a)=0$), donc il tend vers $\frac{R^{(n)}(a)}{n!} = 0$. ∎

**En un mot** : le reste et ses $n$ premières dérivées sont nuls en $a$, donc il s'écrase plus vite que $(x-a)^n$.

</details>

<details class="details--riche">
<summary>

**4. Donner les cinq DL usuels et expliquer pourquoi ceux de $\cos$ et $\sin$ ont des restes d'ordre plus élevé.**

</summary>

$$e^x=1+x+\tfrac{x^2}{2}+\tfrac{x^3}{6}, \quad \cos x=1-\tfrac{x^2}{2}+\tfrac{x^4}{24}, \quad \sin x=x-\tfrac{x^3}{6},$$

$$\tfrac{1}{1-x}=1+x+x^2+x^3, \quad (1+x)^\alpha=1+\alpha x+\tfrac{\alpha(\alpha-1)}{2}x^2 .$$

**Pour $\cos$ et $\sin$** : *« tous les termes d'exposant impair sont nuls »* (respectivement pairs). Le premier terme omis est donc **deux crans plus loin**, et le reste est un $o(x^{2n+1})$ au lieu d'un $o(x^{2n})$ — **on gagne un ordre gratuitement**, par parité.

</details>

<details class="details--riche">
<summary>

**5. Calculer le $DL_3(0)$ de $\tan$ en détaillant la règle utilisée.**

</summary>

$$\tan x = \frac{x-\frac{x^3}{6}+o(x^3)}{1-\frac{x^2}{2}+o(x^3)} .$$

**Règle « Inverse »** avec $u=\frac{x^2}{2}$ (qui vérifie $u(0)=0$) : $\frac{1}{1-u} = 1+u+u^2+\dots = 1+\frac{x^2}{2}+o(x^3)$, le terme $u^2$ étant en $x^4$ donc **tronqué**.

$$\tan x = \left(x-\frac{x^3}{6}\right)\left(1+\frac{x^2}{2}\right)+o(x^3) = x+x^3\left(\frac12-\frac16\right)+o(x^3) = x+\frac{x^3}{3}+o(x^3).$$

**Contrôle** en $x=0{,}1$ : $\tan(0{,}1)=0{,}1003347$ contre $0{,}1003333$ .

</details>

<details class="details--riche">
<summary>

**6. Calculer $[\ln(1-x)]^{(10)}(0)$ et donner la formule générale.**

</summary>

Taylor-Young : le coefficient de $x^k$ vaut $\frac{f^{(k)}(0)}{k!}$, donc $f^{(k)}(0) = k!\,a_k$.

Le DL est $\ln(1-x) = -\sum_{k\ge1}\frac{x^k}{k}$, donc $a_{10} = -\frac{1}{10}$ et

$$f^{(10)}(0) = 10!\times\left(-\tfrac{1}{10}\right) = -\tfrac{10!}{10} = -9! = -362\,880 .$$

**Formule générale** : $f^{(k)}(0) = -(k-1)!$ pour tout $k\ge1$. Vérification en $k=1$ : $f'(x) = \frac{-1}{1-x}$, donc $f'(0) = -1 = -0!$ .

**L'intérêt** : identifier un coefficient remplace dix dérivations successives.

</details>

<details class="details--riche">
<summary>

**7. Énoncer les quatre cas du §1.6.4 et la règle qui les résume.**

</summary>

Avec $k_0$ le plus petit indice $\ge2$ tel que $\alpha_{k_0}\neq0$ :

| $k_0$ | $\alpha_{k_0}$ | Position |
|---|---|---|
| pair | $>0$ | au-dessus des **deux** côtés |
| pair | $<0$ | en dessous des **deux** côtés |
| impair | $>0$ | en dessous à gauche, au-dessus à droite — **inflexion** |
| impair | $<0$ | au-dessus à gauche, en dessous à droite — **inflexion** |

**La règle** : $(x-a)^{k_0}$ change de signe en $a$ **ssi $k_0$ est impair**. Donc *pair = pas de traversée, impair = point d'inflexion* ; le signe de $\alpha_{k_0}$ dit ensuite de quel côté on est à droite.

</details>

<details class="details--riche">
<summary>

**8. Résoudre l'À savoir 1.17 : allure de $\frac{1}{1+e^x}$ en 0.**

</summary>

$1+e^x = 2\left(1+\frac x2+\frac{x^2}{4}+\frac{x^3}{12}\right)$, puis la règle « Inverse » avec $v = \frac x2+\frac{x^2}{4}+\frac{x^3}{12}$ :

- $x^2$ : $-\frac14+\frac14 = 0$ ;
- $x^3$ : $-\frac1{12}+\frac14-\frac18 = \frac{1}{24}$.

$$f(x) = \frac12-\frac x4+\frac{x^3}{48}+o(x^3).$$

Tangente $y=\frac12-\frac x4$ ; $k_0=3$ **impair**, $\alpha_3 = \frac1{48}>0$ : **3ᵉ cas**, donc **point d'inflexion** — en dessous à gauche, au-dessus à droite.

**Contrôle** : $f(0{,}1)-0{,}475 = +2{,}081\times10^{-5}$ et $f(-0{,}1)-0{,}525 = -2{,}081\times10^{-5}$, contre $\frac{x^3}{48} = \pm2{,}083\times10^{-5}$ .

**Pourquoi $\alpha_2=0$** : $f-\frac12$ est **impaire**, donc son DL n'a que des puissances impaires.

</details>

<details class="details--riche">
<summary>

**9. Résoudre l'À savoir 1.18 : asymptotes de $\sqrt{x^2+1}+\sqrt{x^2-1}$.**

</summary>

**Domaine** : $\lvert x\rvert\ge1$. **$f$ est paire.**

En $+\infty$, avec $h=\frac{1}{x^2}$ : $\sqrt{1+h}+\sqrt{1-h} = 2-\frac{h^2}{4}+o(h^2)$ — **les termes en $\frac h2$ s'annulent**. D'où

$$f(x) = 2x-\frac{1}{4x^3}+o\left(\tfrac{1}{x^3}\right).$$

Asymptote $y=2x$, $k_0=3$ impair, $b_3=-\frac14<0$ : **4ᵉ cas**, courbe **en dessous** en $+\infty$.

Par parité, en $-\infty$ : asymptote $y=-2x$ et courbe **également en dessous**.

**Contrôle** : $f(10) = 19{,}99975$ contre $20$, écart $-2{,}5\times10^{-4} = -\frac{1}{4\cdot1000}$ .

⚠️ **Le piège** : $\sqrt{x^2}=\lvert x\rvert$, pas $x$ — c'est ce qui donne deux pentes opposées.

</details>

<details class="details--riche">
<summary>

**10. Quelle est la seule formule de ce chapitre qui serve dans le reste du cours ?**

</summary>

La formule de Taylor à l'ordre 2 en dimension $N$ :

$$f(a+h) = f(a)+\langle\nabla f(a),h\rangle+\tfrac12\langle\nabla^2f(a)h,h\rangle+o\bigl(\lVert h\rVert^2\bigr).$$

Elle fonde **toutes** les conditions d'optimalité :

- annuler le terme d'ordre 1 → **équation d'Euler** $\nabla f(x^\ast)=0$ (thm 2.15, fiche 608) ;
- le signe du terme d'ordre 2 → **conditions d'ordre 2** (thm 2.18 et 2.19, fiche 608).

⚠️ **Notation** : M. Blanchet écrit $\nabla^2f(a)$ pour ce que M. Montaru note $H_f(a)$ (fiche 602). **Même objet**, et l'ordre des arguments dans le produit scalaire est indifférent puisque la matrice est symétrique.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les 3 axiomes d'une distance (déf. 1.1) ? | Séparation, symétrie, inégalité triangulaire |
| Boule ouverte (déf. 1.2) ? | $B_r(x)=\{y : d(x,y)<r\}$ |
| Voisinage (déf. 1.3) ? | Contient une boule $B_r(x)$ |
| Ouvert (déf. 1.4) ? | **Voisinage de chacun de ses points** |
| Fermé ? | Complémentaire d'un ouvert |
| Adhérence, forme opératoire ? | Limite d'une **suite** de $A$ |
| $f=o(g)$ (déf. 1.6) ? | $f=\varepsilon g$ avec $\varepsilon\to0$ |
| Notation ? | **Landau**, petit $o$ |
| $f\sim g$ (déf. 1.7) ? | $f=(1+\varepsilon)g$ |
| Lien entre les deux ? | $f\sim g \iff f-g = o(g)$ |
| $x^m$ vs $x^p$, $m>p$, en $0$ ? | $x^m = o(x^p)$ |
| À l'infini ? | **L'inverse** |
| $\sin x \sim_0$ ? | $x$ |
| $\sqrt{1+x}-1 \sim_0$ ? | $x/2$ |
| La technique pour l'établir ? | **Quantité conjuguée** |
| $DL_n(x_0)$ (déf. 1.8) ? | $\sum a_i(x-x_0)^i + o((x-x_0)^n)$ |
| Le nom de la somme ? | **Partie régulière** |
| Taylor-Young (thm 1.9) ? | $a_k = \dfrac{f^{(k)}(a)}{k!}$ |
| Idée de sa preuve ? | Le reste et ses $n$ dérivées sont nuls en $a$ |
| $\frac{1}{1-x}$ ? | $\sum_{k=0}^n x^k+o(x^n)$ |
| Comment l'établir ? | **Somme géométrique** exacte |
| $\frac{1}{1+x}$ ? | $\sum(-1)^kx^k+o(x^n)$ |
| $e^x$ ? | $1+x+\frac{x^2}{2}+\frac{x^3}{6}$ |
| $\cos x$ ? | $1-\frac{x^2}{2}+\frac{x^4}{24}$ |
| $\sin x$ ? | $x-\frac{x^3}{6}$ |
| Pourquoi leur reste gagne un ordre ? | **Parité** — les termes de parité opposée sont nuls |
| $(1+x)^\alpha$ ? | $1+\alpha x+\frac{\alpha(\alpha-1)}{2}x^2$ |
| $\ln(1-x)$ ? | $-\sum_{k\ge1}\frac{x^k}{k}$ |
| Comment l'obtenir ? | En **primitivant** $\frac{-1}{1-x}$ |
| Règle du produit ? | Partie régulière de $PQ$, **tronquée** |
| L'erreur classique ? | **Ne pas tronquer** |
| Règle de l'inverse ? | $\frac{1}{1-u}=\sum u^k$, avec $u(x_0)=0$ |
| Règle de la primitive ? | On gagne **un ordre** |
| $DL$ en $x_0\neq0$ ? | Poser $h=x-x_0$ |
| $DL$ en l'infini ? | Poser $h=1/x$ |
| $\frac{\cos2x}{2}$ à l'ordre 3 ? | $\frac12-x^2+o(x^3)$ |
| $\sin+\exp$ à l'ordre 3 ? | $1+2x+\frac{x^2}{2}+o(x^3)$ |
| Que se passe-t-il en $x^3$ ? | Les termes **s'annulent** |
| $2\sin\cos$ ? | $\sin(2x) = 2x-\frac{4x^3}{3}+o(x^3)$ |
| $\tan$ à l'ordre 3 ? | $x+\frac{x^3}{3}+o(x^3)$ |
| $\exp\left(\frac{1}{1-x}\right)$ à l'ordre 2 ? | $e+ex+\frac{3e}{2}x^2$ |
| L'étape critique ? | **Sortir le $e$** avant de composer |
| $DL_3(\pi/2)$ de $\sin$ ? | $1-\frac{(x-\pi/2)^2}{2}$ |
| $DL_3(+\infty)$ de $\frac{\sqrt{x+2}}{\sqrt x}$ ? | $1+\frac1x-\frac{1}{2x^2}+\frac{1}{2x^3}$ |
| Approximation affine de $(1+x)^a$ ? | $1+ax$ |
| $f^{(k)}(0)$ à partir du DL ? | $k!\times a_k$ |
| $[\ln(1-x)]^{(10)}(0)$ ? | $-9! = -362\,880$ |
| Position de la tangente : la règle ? | Parité de $k_0$, puis signe de $\alpha_{k_0}$ |
| $k_0$ pair ? | Même côté des deux côtés |
| $k_0$ impair ? | **Point d'inflexion** |
| $\frac{1}{1+e^x}$ en $0$ ? | $\frac12-\frac x4+\frac{x^3}{48}$ — inflexion |
| Pourquoi le terme en $x^2$ est nul ? | $f-\frac12$ est **impaire** |
| Branche asymptotique : la règle ? | Même parité, appliquée à $x^{-k_0}$ |
| $\sqrt{x^2+1}+\sqrt{x^2-1}$ ? | Asymptotes $y=\pm2x$ |
| Position ? | **En dessous** des deux |
| Le piège ? | $\sqrt{x^2}=\lvert x\rvert$, pas $x$ |
| La formule de ce chapitre qui resservira ? | Taylor ordre 2 en dimension $N$ |
| La hessienne, chez M. Blanchet ? | $\nabla^2f(a)$ (et $H_f(a)$ chez M. Montaru) |
|  |  |
