# Fiche 608 — Optimisation libre : existence, unicité, équation d'Euler, conditions d'ordre 2

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Blanchet, *Optimisation*, TSE, 9 avril 2024 — **chapitre 2, §2.2**, p. 19–22 |
| **Difficulté** | Must know — le cœur de la « Partie I » |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiches 606 (Taylor ordre 2) et 607 (convexité, forte convexité) |
| **Concepts clés** | Infimum et minimum, argmin, coercivité, existence, **unicité**, équation et inéquation d'Euler, condition nécessaire d'ordre 2, condition suffisante, classification de la hessienne, formes quadratiques |
| **Poids à l'examen** | Le **théorème 2.14** (existence **et** unicité sous forte convexité) est l'énoncé le plus économique du polycopié. La **procédure de recherche en quatre points** du §2.2.3 est le plan de rédaction attendu. Les **propositions 2.20 et 2.21** sont deux classifications en cinq cas, à réciter. |

> **Convention.** Les énoncés numérotés sont ceux de M. Blanchet ; les corrigés des « À savoir » et des exercices 2.1 à 2.4, ainsi que les vérifications numériques, sont rédigés pour cette fiche.

## 🎯 Vue d'ensemble

```
LE PROBLÈME (2.1)          min f(x)   pour x ∈ K ⊂ Ω


ÉTAPE 1 — L'EXISTENCE     §2.2.2
   K fermé + BORNÉ                          ─┐
   K fermé + NON BORNÉ + f COERCITIVE       ─┴─►  thm 2.12
   f fortement convexe  ⟹  f coercitive          (À savoir 2.7)

ÉTAPE 2 — L'UNICITÉ
   f STRICTEMENT convexe  ⟹  au plus un minimum   thm 2.13

   ══════════ LES DEUX D'UN COUP ══════════
   K fermé CONVEXE non borné + f de classe C¹ FORTEMENT convexe
        ⟹  UNIQUE minimum global                  thm 2.14
   ════════════════════════════════════════

ÉTAPE 3 — LA LOCALISATION  §2.2.3
   x* INTÉRIEUR       ∇f(x*) = 0                  thm 2.15  (Euler)
   K convexe          ⟨∇f(x*), x − x*⟩ ≥ 0        lemme 2.16 (inéquation)
   f CONVEXE          ∇f(x*) = 0  ⟺  min GLOBAL   thm 2.17

ÉTAPE 4 — L'ORDRE 2
   nécessaire   ∇²f(x*) ⪰ 0                       thm 2.18
   suffisant    ∇f(x*)=0 ET ∇²f(x*) ≻ 0           thm 2.19  → min local STRICT


LA PROCÉDURE EN QUATRE POINTS (cours, §2.2.3)
   1. analyser théoriquement si l'on peut espérer un minimum
   2. déterminer les points stationnaires : ∇f(x) = 0
   3. ne garder que ceux avec ∇²f(x) ⪰ 0        (⪯ 0 pour un maximum)
   4. comparer les valeurs des candidats restants
```

## 🔴 Concept 1 — Le vocabulaire : inf, min, argmin (§2.2.1)

**Définition 2.7 (cours) — borne inférieure.** Soit $E\subset\mathbb{R}$ non vide. La **borne inférieure** d'une partie $F$ de $E$ est **le plus grand des minorants** de $F$ dans $E$. Elle est notée $\inf(F)$.

**Définition 2.8 (cours) — minimum d'un ensemble.** Un élément d'une partie $A$ est le **plus petit élément**, ou **minimum** de $A$, s'il **appartient à $A$** et est inférieur à tout autre élément de $A$.

**Définition 2.9 (cours) — infimum et minimum d'une fonction.** Soit $f:\Omega\to\mathbb{R}$.

- On appelle **infimum de $f$ sur $K$** la borne inférieure de $f(K)$, notée $\inf_{x\in K}f(x)$.
- On appelle, **s'il existe**, **minimum de $f$ sur $K$** le minimum de $f(K)$, noté $\min_{x\in K}f(x)$.
- Le point en lequel le minimum est atteint est appelé l'**argument de minimum**, noté $\operatorname{Argmin}_{x\in K}f(x)$.

> ⚠️ **La distinction inf / min est le point de tout le paragraphe, et elle tombe en question de cours.**
>
> |  | Existe toujours ? | Est-ce un nombre ou un point ? |
> |---|---|---|
> | $\inf_K f$ | **oui** (dans $\mathbb{R}\cup\{-\infty\}$), dès que $f(K)\neq\emptyset$ | un **nombre** |
> | $\min_K f$ | **non** — seulement s'il est **atteint** | un **nombre** |
> | $\operatorname{Argmin}_K f$ | non, et il peut contenir **plusieurs** points | un **ensemble de points** |
>
> **Les trois exemples à retenir :**
>
> | $f$, $K$ | $\inf$ | $\min$ | $\operatorname{Argmin}$ |
> |---|---|---|---|
> | $f(x)=e^x$ sur $\mathbb{R}$ | $0$ | **n'existe pas** | $\emptyset$ |
> | $f(x)=x$ sur $\,]0,1[$ | $0$ | **n'existe pas** | $\emptyset$ |
> | $f(x,y)=x^2$ sur $\mathbb{R}^2$ | $0$ | $0$ | **toute la droite $x=0$** |
>
> **Tout le §2.2.2 sert à garantir que l'infimum est atteint**, c'est-à-dire que le minimum existe. Le mot « $\operatorname{Argmin}$ » écrit au pluriel dans la définition (« le point ») cache d'ailleurs qu'il peut y en avoir plusieurs — c'est le §2.2.2 encore, avec le théorème 2.13, qui règle cette question.

**Définition 2.10 (cours) — minimum local et global.** Soient $f:\Omega\to\mathbb{R}$ et $K\subset\Omega$.

- $x^\ast$ est un point de **minimum local** de $f$ sur $K$ s'il existe un voisinage $V$ de $x^\ast$ tel que $f(x^\ast) = \min_{V\cap K}f(x)$ ;
- **minimum local strict** si de plus $\forall y\in V,\ f(y)>f(x^\ast)$ ;
- **minimum global** si $f(x^\ast) = \min_K f(x)$ ;
- $x^\ast$ est un point de **maximum local** (resp. **global**) de $f$ sur $K$ si c'est un point de minimum local (resp. global) de $-f$ sur $K$.

*Un **point extremum** est ou bien un point de maximum ou bien un point de minimum.*

> **La définition du maximum par $-f$ est systématique dans ce cours** — et c'est un bon réflexe : elle divise par deux le nombre d'énoncés à retenir. **La seule exception de tout le cursus** est la condition $\mu_j\ge0$ de KKT (fiche 605), qui n'est pas symétrique.

## 🔴 Concept 2 — Coercivité et existence (§2.2.2)

**Définition 2.11 (cours) — fonction coercitive.** Soit $K$ un **ouvert non borné** de $\mathbb{R}^N$ et $f:K\to\mathbb{R}$. La fonction $f$ est dite **coercitive sur $K$** si

$$\lim_{x\in K,\ \lVert x\rVert\to+\infty} f(x) = +\infty .$$

> C'est la définition 4.8 de M. Montaru (fiche 602). **Les deux cours coïncident**, à ceci près que M. Blanchet la pose sur un ouvert et M. Montaru sur un ensemble quelconque non borné.

**À savoir (fait en cours) 2.7.** *Soit $K$ un ouvert non borné de $\mathbb{R}^N$ et $f:K\to\mathbb{R}$. Démontrer que si $f$ est **fortement convexe** sur $K$ alors $f$ est **coercitive** sur $K$.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 2.7 : la forte convexité entraîne la coercivité**

</summary>

**C'est le résultat qui justifie l'existence de la notion de forte convexité** : il transforme une propriété de courbure en une propriété de comportement à l'infini.

**La preuve, en trois lignes.** Fixons un point $x_0\in K$ quelconque. La caractérisation 2 de la **proposition 2.5** (fiche 607) donne, pour tout $x\in K$ :

$$f(x) \ \ge\ f(x_0)+\langle\nabla f(x_0),\ x-x_0\rangle+\frac{\alpha}{2}\lVert x-x_0\rVert^2 .$$

Minorons le terme linéaire par **Cauchy-Schwarz** :

$$\langle\nabla f(x_0),\ x-x_0\rangle \ \ge\ -\lVert\nabla f(x_0)\rVert\cdot\lVert x-x_0\rVert .$$

En posant $r = \lVert x-x_0\rVert$ et $M = \lVert\nabla f(x_0)\rVert$ (une **constante**, puisque $x_0$ est fixé) :

$$f(x) \ \ge\ f(x_0) - M\,r + \frac{\alpha}{2}r^2 .$$

**Le membre de droite est un trinôme du second degré en $r$, de coefficient dominant $\frac\alpha2 > 0$** : il tend vers $+\infty$ quand $r\to+\infty$. Et $\lVert x\rVert\to+\infty$ entraîne $r = \lVert x-x_0\rVert\to+\infty$ (par l'inégalité triangulaire $r \ge \lVert x\rVert - \lVert x_0\rVert$). Donc $f(x)\to+\infty$ : **$f$ est coercitive**. ∎

> **L'idée en une phrase : le terme quadratique $\frac\alpha2 r^2$ écrase le terme linéaire $-Mr$.** C'est exactement la même mécanique que la minoration $\lVert x\rVert^2-\lVert b\rVert\lVert x\rVert$ de la fiche 600 — et c'est pourquoi **$\alpha>0$ est indispensable** : avec $\alpha=0$ (convexité simple), le trinôme devient une droite décroissante et l'argument tombe.

**Le contre-exemple qui montre que la convexité simple ne suffit pas** : $f(x,y)=x^2+y$ est convexe (sa hessienne $\begin{pmatrix}2&0\\0&0\end{pmatrix}$ est semi-définie positive) mais $f(0,-1000) = -1000$ : elle n'est **ni coercitive ni minorée**. Sa plus petite valeur propre de hessienne est $0$ : elle n'est pas fortement convexe.

**Contrôle numérique** sur $f(x) = \langle Ax,x\rangle+\langle b,x\rangle+c$ avec $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$, $b=(-1,3)$, $c=5$ (l'exemple de la fiche 607, fortement convexe de constante $\alpha=2$) :

| $\lVert x\rVert$ | $\min f$ sur le cercle de ce rayon | minoration $f(x_0)-Mr+r^2$ avec $x_0=0$ |
|---|---|---|
| $1$ | $4{,}00$ | $5 - 3{,}16 + 1 = 2{,}84$ |
| $5$ | $28{,}2$ | $5-15{,}8+25 = 14{,}2$ |
| $20$ | $\approx 400$ | $5-63{,}2+400 = 341{,}8$ |

La minoration est valide et **diverge**, ce qui est tout ce que la coercivité demande.

</details>

**Théorème 2.12 (cours) — condition suffisante, $K$ fermé.** On considère $K$ un ensemble **non vide et fermé** de $\mathbb{R}^N$ et $f$ une fonction **continue** sur $K$. Le problème $(2.1)$ admet une solution si l'une des deux conditions est satisfaite :

- la contrainte $K$ est **bornée** ;
- la contrainte $K$ est **non bornée** et $f$ est **coercitive**.

**À savoir 2.8.** *Démontrer le théorème 2.12.*

> **Corrigé.** *Premier cas* : $K$ fermé et borné dans $\mathbb{R}^N$ donc **compact** ; $f$ continue y atteint ses bornes — c'est **Weierstrass** (thm 2.22 chez M. Montaru, fiche 600).
>
> *Second cas* : c'est mot pour mot le théorème 2.26 de M. Montaru. Posons $K_0 = f(x_0)+1$ pour un $x_0\in K$ fixé. Par coercivité, il existe $R>0$ tel que $\lVert x\rVert\ge R \Rightarrow f(x) > f(x_0)$. L'ensemble $K\cap\bar B(0,R)$ est fermé et borné, donc **compact** ; $f$ y atteint un minimum en un point $a$, et $f(a)\le f(x_0)$. Hors de la boule, $f(x)>f(x_0)\ge f(a)$. Donc $a$ est un minimum **global** sur $K$. ∎
>
> **L'idée : la coercivité enferme le minimum dans une boule, et sur la boule c'est Weierstrass.**

**Pour aller plus loin (*) (cours).** *Dans le cas $K$ ouvert, on peut prouver facilement que s'il existe $x_0\in K$ tel que*

$$\forall x\in\partial K,\qquad f(x) > f(x_0)$$

*où $\partial K = \bar K\setminus K$, alors le problème $(2.1)$ admet une solution.*

> **C'est la version « ouverte » du théorème 2.28 de M. Montaru** (fiche 600), sous une forme plus faible mais plus maniable : au lieu d'exiger $f\to+\infty$ au bord, il suffit que $f$ y soit **partout plus grande qu'en un point témoin $x_0$**. Le minimum ne peut alors pas s'échapper par le bord.

**Théorème 2.13 (cours) — unicité dans le cas strictement convexe.** Soit $K$ un ensemble **convexe** et $f:K\to\mathbb{R}$ **strictement convexe** sur $K$. Si $f$ admet un minimum sur $K$, alors ce minimum est **unique**.

**À savoir 2.9.** *Démontrer le théorème 2.13.*

<details class="details--riche">
<summary>

**Corrigé — À savoir 2.9 : l'unicité, par l'absurde en trois lignes**

</summary>

**Supposons par l'absurde** qu'il existe **deux** points de minimum distincts $x_1\neq x_2$, de valeur commune $m = f(x_1)=f(x_2) = \min_K f$.

$K$ étant **convexe**, le milieu $\dfrac{x_1+x_2}{2}$ appartient à $K$. Appliquons la **stricte convexité** avec $t=\frac12$ (licite car $x_1\neq x_2$ et $\frac12\in\,]0,1[$) :

$$f\left(\frac{x_1+x_2}{2}\right) \ <\ \frac12 f(x_1)+\frac12 f(x_2) \ =\ \frac{m+m}{2} \ =\ m .$$

**On a trouvé un point de $K$ où $f$ est strictement inférieure au minimum** — contradiction. ∎

> **Les deux hypothèses servent chacune une fois, et l'exercice est fait pour le montrer :**
>
> - la **convexité de $K$** garantit que le milieu est encore admissible ;
> - la **stricte convexité de $f$** donne l'inégalité **stricte**, qui seule produit la contradiction.
>
> Avec la convexité simple, on obtiendrait $f\left(\frac{x_1+x_2}{2}\right)\le m$, donc **l'égalité** — pas de contradiction. Et de fait, une fonction convexe peut avoir une infinité de minima : $f(x,y)=x^2$ est minimale sur toute la droite $x=0$.
>
> ⚠️ **Le théorème 2.13 ne donne PAS l'existence.** Il dit « **si** $f$ admet un minimum, alors il est unique ». $f(x)=e^x$ est strictement convexe sur $\mathbb{R}$ et n'a **aucun** minimum. **Existence et unicité sont deux questions séparées** — c'est le théorème 2.14 qui les réunit.

**Contrôle numérique.** Sur $f(x,y) = x^2+y^2$ (strictement convexe) restreinte au disque unité : le minimum $0$ est atteint en **un seul** point, $(0,0)$. Sur $f(x,y)=x^2$ (convexe non stricte) : le minimum $0$ est atteint sur **tout le segment** $\{0\}\times[-1,1]$, soit une infinité de points.

</details>

**Théorème 2.14 (cours) — existence ET unicité.** Soit $K$ un **fermé convexe non borné** de $\mathbb{R}^N$. On considère $f:K\to\mathbb{R}$ de classe $C^1$ qui est **fortement convexe** sur $K$. Alors $f$ admet un **unique minimum global** sur $K$.

**À savoir 2.10.** *Démontrer le théorème 2.14.*

> **Corrigé — c'est un assemblage des trois résultats précédents.**
>
> 1. $f$ fortement convexe $\Rightarrow$ $f$ **coercitive** (À savoir 2.7).
> 2. $K$ fermé non borné $+$ $f$ continue $+$ $f$ coercitive $\Rightarrow$ **le minimum existe** (théorème 2.12, second cas).
> 3. $f$ fortement convexe $\Rightarrow$ $f$ **strictement** convexe (fiche 607) ; $K$ convexe $\Rightarrow$ **le minimum est unique** (théorème 2.13). ∎
>
> ⚠️ **C'est le meilleur énoncé de tout le polycopié.** *Une seule hypothèse — la forte convexité — donne existence **et** unicité, sans le moindre calcul.* Repérez-la dès l'énoncé d'un exercice : si $f$ est quadratique de matrice **définie positive**, tout est réglé (À savoir 2.4, fiche 607).
>
> **Le cas d'application le plus fréquent** : $f(x) = \langle Ax,x\rangle+\langle b,x\rangle+c$ avec $A$ symétrique définie positive. Alors $f$ est fortement convexe de constante $2\lambda_{\min}(A)$, et le théorème 2.14 donne directement l'unique minimum global — que l'on calcule ensuite par $\nabla f = 0$, c'est-à-dire $x^\ast = -\frac12A^{-1}b$.

## 🔴 Concept 3 — Équation et inéquation d'Euler (§2.2.3)

**Théorème 2.15 (cours) — équation d'Euler.** Soit $K$ un ensemble non vide de $\mathbb{R}^N$ et $f:K\to\mathbb{R}$ de classe $C^1$ sur $K$. Soit $x^\ast$ un point de minimum local de $f$ sur $K$. **Si $x^\ast$ est à l'intérieur de $K$**, alors

$$\nabla f(x^\ast) = 0 .$$

**Lemme 2.16 (cours) — inéquation d'Euler.** Soit $K$ un **convexe** de $\mathbb{R}^N$ et $f:K\to\mathbb{R}$ de classe $C^1$. Si $x^\ast$ est un point de minimum local de $f$ sur $K$, alors

$$\forall x\in K,\qquad \langle\nabla f(x^\ast),\ x-x^\ast\rangle \ \ge\ 0 .$$

**Pour aller plus loin (cours).** *L'hypothèse de convexité de $K$ n'est pas nécessaire. Il suffit alors de remplacer l'inégalité par* $\langle\nabla f(x^\ast),\ d\rangle\ge0$ *pour toute **direction admissible** $d$*, où $d\in\mathbb{R}^N$ est dite **direction admissible** s'il existe $\eta$ tel que $x^\ast+\alpha d$ soit dans $K$ pour tout $\alpha\in[0,\eta[$.

> **C'est exactement le cône $C(a)$ de M. Montaru** (déf. 4.13, fiche 603) et l'inéquation d'Euler de sa proposition 4.14. **Les deux cours disent la même chose**, M. Blanchet privilégiant le cas convexe (où les directions admissibles sont simplement les $x-x^\ast$ pour $x\in K$) et M. Montaru le cas général.
>
> ⚠️ Le polycopié écrit « $\exists\eta < 0$ » ; il faut lire **$\eta>0$**, sans quoi l'intervalle $[0,\eta[$ serait vide. Coquille de signe sans conséquence.

**À savoir 2.11.** *Démontrer le lemme 2.16.* **À savoir 2.12.** *Démontrer le théorème 2.15.*

<details class="details--riche">
<summary>

**Corrigés — À savoir 2.11 et 2.12 : les deux démonstrations, dans le bon ordre**

</summary>

**Attention à l'ordre logique** : le cours écrit « Repose sur » entre le théorème 2.15 et le lemme 2.16. **C'est le lemme qu'il faut démontrer d'abord**, et le théorème s'en déduit.

### À savoir 2.11 — le lemme 2.16

Soit $x\in K$ quelconque. Comme $K$ est **convexe**, le segment $[x^\ast,x]$ est dans $K$ :

$$\forall t\in[0,1],\qquad x^\ast + t(x-x^\ast) = (1-t)x^\ast+tx \ \in\ K .$$

Posons $\varphi(t) = f\bigl(x^\ast+t(x-x^\ast)\bigr)$, définie sur $[0,1]$. Comme $x^\ast$ est un minimum **local** de $f$ sur $K$, la fonction $\varphi$ admet un minimum local en $t=0$ — **à l'extrémité gauche** de $[0,1]$.

Le taux d'accroissement est donc positif : pour $t>0$ petit,

$$\frac{\varphi(t)-\varphi(0)}{t} \ \ge\ 0 ,$$

et en passant à la limite $t\to0^+$ :

$$\varphi'(0) \ \ge\ 0 .$$

Or la règle de dérivation composée (proposition 4.6 chez M. Montaru, fiche 602) donne

$$\varphi'(0) = \langle\nabla f(x^\ast),\ x-x^\ast\rangle .$$

D'où $\langle\nabla f(x^\ast),\ x-x^\ast\rangle\ge0$. ∎

### À savoir 2.12 — le théorème 2.15

Supposons maintenant $x^\ast$ **à l'intérieur** de $K$. Il existe alors $\epsilon>0$ tel que $B(x^\ast,\epsilon)\subset K$.

Soit $h\in\mathbb{R}^N$ quelconque, de norme assez petite pour que $x^\ast\pm h\in K$. Le lemme 2.16 appliqué **successivement** à $x = x^\ast+h$ puis à $x = x^\ast-h$ donne

$$\langle\nabla f(x^\ast),\ h\rangle \ \ge\ 0 \qquad \text{et} \qquad \langle\nabla f(x^\ast),\ -h\rangle \ \ge\ 0 ,$$

c'est-à-dire $\langle\nabla f(x^\ast),h\rangle \ge 0$ **et** $\le 0$, donc

$$\langle\nabla f(x^\ast),\ h\rangle = 0 \qquad \text{pour tout } h .$$

En prenant $h = \nabla f(x^\ast)$ (à un facteur d'échelle près), on obtient $\lVert\nabla f(x^\ast)\rVert^2 = 0$, donc $\nabla f(x^\ast)=0$. ∎

> **Le mécanisme est celui de tout le cursus, et il vaut la peine d'être énoncé une fois pour toutes :**
>
> ```
>    x* À L'INTÉRIEUR         on peut aller dans les DEUX sens (h et −h)
>                             ⟹  deux inégalités opposées  ⟹  ÉGALITÉ
> 
>    x* AU BORD               on ne peut aller que dans UN sens
>                             ⟹  une seule inégalité       ⟹  INÉGALITÉ
> ```
>
> C'était la proposition 3.4 en dimension 1 (fiche 601), la proposition 4.14 en dimension $n$ (fiche 603), et ce sera la condition $\mu_j\ge0$ de KKT (fiche 605). **Un seul principe, quatre écritures.**

</details>

**Théorème 2.17 (cours) — condition nécessaire ET suffisante, cas convexe.** Soit $K$ un **convexe** de $\mathbb{R}^N$ et $f:K\to\mathbb{R}$ **convexe** de classe $C^1$ sur $K$. Supposons que $x^\ast$ est un point **intérieur** à $K$. Alors $x^\ast$ est un point de minimum **global** de $f$ sur $K$ **si et seulement si**

$$\nabla f(x^\ast) = 0 .$$

**Pour aller plus loin (cours).** *En fait, sans supposer que $x^\ast$ est un point intérieur, on a : $x^\ast$ est un point de minimum global de $f$ sur $K$ si et seulement si*

$$\forall x\in K,\qquad \langle\nabla f(x^\ast),\ x-x^\ast\rangle \ \ge\ 0 .$$

**À savoir 2.13.** *Démontrer le théorème 2.17.*

> **Corrigé.** Le sens $\Rightarrow$ est le théorème 2.15. Pour $\Leftarrow$, on utilise la **caractérisation 2 de la proposition 2.3** (fiche 607) : $f$ convexe est **au-dessus de ses plans tangents**, donc pour tout $x\in K$,
>
> $$f(x) \ \ge\ f(x^\ast)+\langle\underbrace{\nabla f(x^\ast)}_{=\,0},\ x-x^\ast\rangle \ =\ f(x^\ast). \ \blacksquare$$
>
> **Trois lignes, et c'est le résultat le plus utile du chapitre.** La condition **nécessaire** d'ordre 1 devient **suffisante**, et elle donne du **global**, pas du local. *La version « Pour aller plus loin » est encore plus forte : elle vaut même au bord, avec l'inéquation.*
>
> **C'est le théorème 4.20 de M. Montaru** (fiche 603). Les deux cours convergent ici, et pour cause : c'est le fondement de toute l'optimisation convexe.

## 🔴 Concept 4 — Les conditions d'ordre 2 (thm 2.18, 2.19) et les classifications

**Théorème 2.18 (cours) — condition nécessaire d'ordre 2 en un point intérieur.** Soit $K$ un **ouvert** de $\mathbb{R}^N$ et $f:K\to\mathbb{R}$. Si $x^\ast$ est un point de minimum local de $f$ sur $K$ qui est à l'intérieur de $K$, alors

$$\nabla^2f(x^\ast) \ \succeq\ 0 \qquad \text{(semi-définie positive)}.$$

**Pour aller plus loin (cours).** *Il est facile de déterminer une condition nécessaire d'ordre 2 : si $x^\ast$ est un point de minimum local de $f$ sur $K$, alors $\langle\nabla^2f(x^\ast)d,\ d\rangle\ge0$ pour toutes directions admissibles telles que $\langle\nabla f(x^\ast),d\rangle = 0$.*

**Théorème 2.19 (cours) — condition suffisante.** Soit $K$ un **ouvert convexe** de $\mathbb{R}^N$ et $f:K\to\mathbb{R}$ de classe $C^1$ sur $K$. Soit $x^\ast$ un point intérieur de $K$. Si

$$\nabla f(x^\ast) = 0 \qquad \textbf{et} \qquad \nabla^2f(x^\ast) \succ 0 \quad \text{(définie positive)},$$

alors $x^\ast$ est un point de minimum local **strict** de $f$ sur $K$.

⚠️ **Le décalage $\succeq$ / $\succ$ est le même qu'en dimension 1** (fiche 601, propositions 3.10 et 3.11) : la condition nécessaire est **large**, la suffisante est **stricte**, et le cas dégénéré $\nabla^2f(x^\ast)$ **semi-définie mais non définie** n'est traité par aucun théorème.

**La procédure de recherche (cours, §2.2.3).**

> *Ces résultats conduisent à la procédure suivante de recherche de minimum :*
>
> 1. *Analyser théoriquement si on peut espérer déterminer un minimum ;*
> 2. *Déterminer les points stationnaires de $f$ en résolvant $\nabla f(x)=0$ ;*
> 3. *Pour chacun de ces points stationnaires $x$, déterminer ceux tels que $\nabla^2f(x)\succeq 0$ ;*
> 4. *Comparer les valeurs de chacun des candidats restants.*
>
> *Si on cherche à déterminer un maximum, la procédure est la même exceptée le 3ᵉ point où l'on ne conserve que les points critiques tels que $\nabla^2f(x)\preceq0$.*

**Proposition 2.20 (cours) — classification en un point critique.** Soit $f:\mathbb{R}^N\to\mathbb{R}$ de classe $C^2$ et $x^\ast$ un point critique. Alors :

| $\nabla^2f(x^\ast)$ | Conclusion |
|---|---|
| **définie positive** | $x^\ast$ est un point de **minimum local strict** |
| **définie négative** | $x^\ast$ est un point de **maximum local strict** |
| **semi-définie positive** | $x^\ast$ n'est **pas** un maximum local, mais **peut** être un minimum local |
| **semi-définie négative** | $x^\ast$ n'est **pas** un minimum local, mais **peut** être un maximum local |
| **indéfinie** | $x^\ast$ n'est **ni** un minimum **ni** un maximum local |

**Proposition 2.21 (cours) — le cas quadratique.** Soit $f:\mathbb{R}^N\to\mathbb{R}$ de la forme $x\mapsto\langle Ax,x\rangle+\langle b,x\rangle+c$ avec $A$ **symétrique**, $b\in\mathbb{R}^N$, $c\in\mathbb{R}$. On a :

| $A$ | Conclusion |
|---|---|
| **définie positive** | $f$ admet un **unique minimum global strict** sur $\mathbb{R}^N$ |
| **définie négative** | $f$ admet un **unique maximum global strict** |
| **semi-définie positive** | $f$ admet un **minimum global** |
| **semi-définie négative** | $f$ admet un **maximum global** |
| **indéfinie** | $f$ n'admet **ni minimum ni maximum** |

> ⚠️ **Les deux lignes semi-définies demandent une hypothèse supplémentaire, à connaître.** Prenons
>
> $$A = \begin{pmatrix}1&0\\0&0\end{pmatrix} \ \ (\text{semi-définie positive}), \qquad b = \begin{pmatrix}0\\1\end{pmatrix}, \qquad c=0 .$$
>
> ⚠️ Alors $f(x,y) = x^2+y$, qui est bien convexe — mais $f(0,-1000) = -1000$ : **elle n'a aucun minimum global**.
>
> **La condition manquante** est que $b$ appartienne à l'**image** de $A$. Concrètement : si $A$ est semi-définie positive et que $b$ a une composante dans le **noyau** de $A$, $f$ est **affine non constante** dans cette direction, donc non minorée.
>
> **Les trois autres lignes (définie positive, définie négative, indéfinie) sont, elles, exactes sans réserve** — et ce sont les seules qui servent dans les exercices, où $A$ est toujours inversible. **Retenez la mise en garde, utilisez les trois lignes sûres.**

<details class="details--riche">
<summary>

**Corrigés — exercices 2.1 et 2.2 du cours**

</summary>

### Exercice 2.1 — minimiser $f(x,y)=x^2+y^2$ sur $[1,9]\times[1,+\infty)$

**Étape 1 — existence.** $K = [1,9]\times[1,+\infty)$ est **fermé** (produit de deux fermés) et **non borné** ($y$ n'est pas majoré). $f(x,y)=\lVert(x,y)\rVert^2$ est continue et **coercitive**. Le **théorème 2.12**, second cas, donne l'existence d'un minimum.

*Remarque : $K$ est de plus **convexe**, et $f$ est **fortement convexe** de constante $\alpha=2$ (fiche 607). Le **théorème 2.14** s'applique donc et donne existence **et unicité** d'un coup — c'est le chemin le plus court.*

**Étape 2 — les points stationnaires.** $\nabla f = (2x,2y) = 0$ donne $(0,0)$, qui **n'appartient pas à $K$**. **Aucun point stationnaire dans $K$** : le minimum est donc nécessairement **au bord**.

**Étape 3 — la résolution directe, par séparation des variables.** $f(x,y)=x^2+y^2$ est une **somme de deux fonctions d'une variable**, et les contraintes sont **séparées** :

- minimiser $x^2$ sur $[1,9]$ : la fonction est croissante sur $[1,9]$ (car $x\ge1>0$), donc le minimum est en $x=1$, valeur $1$ ;
- minimiser $y^2$ sur $[1,+\infty)$ : idem, minimum en $y=1$, valeur $1$.

$$\boxed{\min_K f = 2, \text{ atteint au seul point } (1,1).}$$

**Étape 4 — la vérification par l'inéquation d'Euler (lemme 2.16).** $K$ est convexe, $\nabla f(1,1) = (2,2)$. Pour tout $(x,y)\in K$, on a $x\ge1$ et $y\ge1$, donc

$$\langle\nabla f(1,1),\ (x,y)-(1,1)\rangle = 2(x-1)+2(y-1) \ \ge\ 0 . \ \checkmark$$

L'inéquation d'Euler est vérifiée, et **elle est ici suffisante** puisque $f$ est convexe (« Pour aller plus loin » du théorème 2.17).

**Contrôle numérique** sur une grille de $[1,9]\times[1,20]$ au pas $10^{-3}$ : minimum $2{,}000000$ en $(1{,}000,\ 1{,}000)$ .

> **Le point de méthode** : $(1,1)$ est un **coin** de $K$, où **deux** contraintes sont actives. C'est le cas le plus contraint possible, et c'est pourquoi $\nabla f$ n'y est pas nul.

### Exercice 2.2 — minimiser $f(x,y)=x+y$ sur le disque $x^2+y^2\le1$

*(L'énoncé du cours dit « sur le cercle $x^2+y^2\le1$ » ; l'inégalité indique qu'il s'agit du **disque** fermé.)*

**Étape 1 — existence.** $K$ est fermé et borné, donc **compact** ; $f$ est continue. **Théorème 2.12**, premier cas.

**Étape 2 — points stationnaires.** $\nabla f = (1,1) \neq 0$ **partout** : aucun point stationnaire. Le minimum est donc **sur le bord** $\{x^2+y^2=1\}$.

**Étape 3 — la résolution.** Sur le cercle, paramétré par $x=\cos\theta$, $y=\sin\theta$ :

$$f = \cos\theta+\sin\theta = \sqrt2\,\cos\left(\theta-\frac\pi4\right) \ \in\ \left[-\sqrt2,\ \sqrt2\right].$$

$$\boxed{\min_K(x+y) = -\sqrt2 \approx -1{,}4142136, \text{ atteint en } \left(-\tfrac{1}{\sqrt2},\ -\tfrac{1}{\sqrt2}\right) \approx (-0{,}7071068,\ -0{,}7071068).}$$

**Étape 4 — la vérification par l'inéquation d'Euler.** $K$ est convexe et $\nabla f = (1,1)$ partout. Au point $x^\ast = -\frac{1}{\sqrt2}(1,1)$, pour tout $(x,y)\in K$ :

$$\langle(1,1),\ (x,y)-x^\ast\rangle = x+y+\sqrt2 \ \ge\ -\sqrt2+\sqrt2 = 0 \ \checkmark$$

puisque $x+y\ge-\sqrt2$ sur tout le disque. **Et comme $f$ est convexe (elle est affine), cette inéquation est suffisante** : $x^\ast$ est bien le minimum **global**.

> **C'est exactement l'exemple 11 de M. Montaru** (fiche 605), résolu là-bas par KKT avec $\mu = \frac{1}{\sqrt2}$. **Les deux cours posent le même problème** — et les deux méthodes donnent le même point. Le fait que $f$ soit **affine** garantit ici que le minimum est sur le bord : une fonction affine non constante n'a jamais d'extremum intérieur.

**Contrôle numérique** sur le disque discrétisé (rayon et angle au pas $10^{-3}$) : minimum $-1{,}4142136$ .

</details>

<details class="details--riche">
<summary>

**Corrigé — exercice 2.3 du cours : trois formes quadratiques, trois destins**

</summary>

**Énoncé.** *Est-ce que les fonctions suivantes ont un maximum global ? Un minimum global ?*

1. $f(x,y) = x^2+2y^2-2xy+6x-8y+10$
2. $f(x,y) = x^2-y^2-2xy+6x-8y+10$
3. $f(x,y,z) = x^2+y^2+z^2-2xy-2xz+4yz+6x-8y+10$

**La méthode : la proposition 2.21.** Tout se lit sur la **hessienne** (constante, puisque $f$ est quadratique).

### 1. $x^2+2y^2-2xy+6x-8y+10$

$$\nabla^2f = \begin{pmatrix}2&-2\\-2&4\end{pmatrix}, \qquad \operatorname{tr} = 6>0, \qquad \det = 8-4 = 4>0 .$$

Trace et déterminant strictement positifs ⟹ **définie positive**. *(Valeurs propres : $\lambda = 3\pm\sqrt5$, soit $\mathbf{0{,}7639320}$ et $\mathbf{5{,}2360680}$ — toutes deux $>0$ .)*

**Proposition 2.21, ligne 1 : $f$ admet un unique minimum global strict, et aucun maximum.**

*Le point* : $\nabla f = (2x-2y+6,\ 4y-2x-8) = 0$ donne $x-y=-3$ et $2y-x=4$, d'où en substituant $x=y-3$ : $2y-(y-3)=4$, soit $y=1$ et $x=-2$.

$$f(-2,1) = 4+2+4-12-8+10 = \boxed{0} .$$

**Contrôle** : $x^2=4$, $2y^2=2$, $-2xy = -2(-2)(1)=+4$, $6x=-12$, $-8y=-8$, $+10$. Somme $=0$ .

### 2. $x^2-y^2-2xy+6x-8y+10$

$$\nabla^2f = \begin{pmatrix}2&-2\\-2&-2\end{pmatrix}, \qquad \det = -4-4 = -8 < 0 .$$

Déterminant **négatif** ⟹ **indéfinie**. *(Valeurs propres $\pm2\sqrt2 = \pm\mathbf{2{,}8284271}$ — de signes opposés .)*

**Proposition 2.21, ligne 5 : $f$ n'admet ni minimum ni maximum global.**

*Le point critique existe pourtant* : $\nabla f = (2x-2y+6,\ -2y-2x-8)=0$ donne $x-y=-3$ et $x+y=-4$, d'où $x = -\frac72$, $y=-\frac12$, et $f\left(-\frac72,-\frac12\right) = \frac32$. **C'est un point selle** (proposition 2.20, ligne 5).

**Vérification directe du caractère selle** : le long de la direction propre associée à $+2\sqrt2$, $f$ **monte** ; le long de celle associée à $-2\sqrt2$, elle **descend**.

### 3. $x^2+y^2+z^2-2xy-2xz+4yz+6x-8y+10$

$$\nabla^2f = \begin{pmatrix}2&-2&-2\\-2&2&4\\-2&4&2\end{pmatrix}.$$

⚠️ **Ici le critère des mineurs principaux dominants ÉCHOUE.** Ils valent

$$\Delta_1 = 2, \qquad \Delta_2 = \det\begin{pmatrix}2&-2\\-2&2\end{pmatrix} = 4-4 = \mathbf{0}, \qquad \Delta_3 = -8 .$$

⚠️ **Un mineur nul rend le critère inapplicable** — on ne peut conclure ni « définie positive » ni « définie négative » ni même « indéfinie » par ce chemin. **Il faut passer aux valeurs propres.**

$$\text{Valeurs propres : } \ \mathbf{-2}, \quad \mathbf{0{,}5358984}, \quad \mathbf{7{,}4641016}.$$

**Une valeur propre strictement négative et deux strictement positives ⟹ indéfinie.**

**Proposition 2.21, ligne 5 : ni minimum ni maximum global.**

*(On pouvait aussi conclure sans diagonaliser : $\det\nabla^2f = -8 < 0$ pour une matrice $3\times3$ signifie que le produit des trois valeurs propres est négatif, donc il y en a une ou trois négatives ; or la **trace** vaut $6>0$, ce qui interdit qu'elles soient toutes trois négatives. Donc exactement une l'est : **indéfinie**. **C'est le raccourci à retenir en dimension 3.**)*

*Le point critique* est $(-5,-3,1)$, de valeur $f = 7$ — c'est un **point selle**.

**Le bilan de l'exercice.**

|  | Hessienne | Nature | Minimum global | Maximum global |
|---|---|---|---|---|
| **1** | définie positive ($0{,}764$ ; $5{,}236$) | minimum strict en $(-2,1)$ | **oui**, $=0$ | non |
| **2** | indéfinie ($\pm2{,}828$) | selle en $\left(-\frac72,-\frac12\right)$, $f=\frac32$ | **non** | **non** |
| **3** | indéfinie ($-2$ ; $0{,}536$ ; $7{,}464$) | selle en $(-5,-3,1)$, $f=7$ | **non** | **non** |

> **La leçon de méthode.** Pour une fonction **quadratique**, il ne faut **jamais** commencer par chercher le point critique : commencez par la **hessienne**. Elle est constante, elle répond aux deux questions d'un coup, et elle vous dit si le calcul du point critique a le moindre intérêt.
>
> **Et en dimension $\ge3$, méfiez-vous du critère des mineurs** : un mineur nul, comme au point 3, le rend muet. **Trace et déterminant, ou les valeurs propres, sont plus sûrs.**

</details>

<details class="details--riche">
<summary>

**Corrigé — exercice 2.4 du cours : et sa parenté avec l'exemple 12 de M. Montaru**

</summary>

**Énoncé.** *Minimiser $f(x,y) = -x-2y-2xy+\dfrac{x^2}{2}+\dfrac{y^2}{2}$ sur l'ensemble tel que $x\ge0$, $y\ge0$ et $x+y\le1$.*

> **Une observation qui vaut la peine d'être faite d'emblée.** Comparez avec l'**exemple 12 du chapitre 6 de M. Montaru** (fiche 605), qui minimise $g(x,y) = x^2+y^2-4xy-2x-4y$ sur **le même triangle**. Or
>
> $$\frac{g(x,y)}{2} = \frac{x^2}{2}+\frac{y^2}{2}-2xy-x-2y = f(x,y) \qquad \textbf{exactement.}$$
>
> **Les deux professeurs posent le même exercice, à un facteur $\frac12$ près.** Le point optimal est donc le **même**, et la valeur est **la moitié**. C'est une vérification croisée gratuite — et une bonne raison de travailler les deux polycopiés ensemble.

**Étape 1 — existence.** Le triangle $K = \{x\ge0,\ y\ge0,\ x+y\le1\}$ est **fermé** (intersection de trois demi-plans fermés) et **borné**, donc **compact** ; $f$ est polynomiale donc continue. **Théorème 2.12**, premier cas : le minimum existe.

**Étape 2 — $f$ est-elle convexe ?** **Non**, et c'est important :

$$\nabla^2f = \begin{pmatrix}1&-2\\-2&1\end{pmatrix}, \qquad \det = 1-4 = -3 < 0 \quad \Longrightarrow \quad \textbf{indéfinie}.$$

*(Valeurs propres $1\pm2$, soit $3$ et $-1$.)* **On ne peut donc pas utiliser le théorème 2.17** ; il faudra comparer les candidats.

**Étape 3 — points stationnaires intérieurs.**

$$\nabla f = \begin{pmatrix}-1-2y+x\\-2-2x+y\end{pmatrix} = 0 \iff \begin{cases}x-2y=1\\ y-2x=2\end{cases}$$

En substituant $x = 1+2y$ dans la seconde : $y-2-4y = 2$, soit $-3y=4$, donc $y = -\frac43 < 0$. **Le point stationnaire n'est pas dans le triangle** — pas de candidat intérieur.

**Étape 4 — le bord.** Puisqu'aucun point stationnaire n'est admissible, le minimum est sur $\partial K$. Traitons les trois arêtes et les trois sommets — ou, plus rapidement, appliquons **KKT** (fiche 605), les contraintes étant **affines** donc qualifiées par (QCA).

Avec $h_1 = -x$, $h_2 = -y$, $h_3 = x+y-1$, le balayage des configurations donne **un seul point admissible** :

$$\boxed{\left(\tfrac13,\ \tfrac23\right) \quad \text{avec } \mu_3 = 2 \ge 0, \ \mu_1=\mu_2=0 .}$$

*Le calcul, sur l'arête $x+y=1$* : en soustrayant les deux lignes de KKT (ce qui élimine $\mu_3$),

$$(-1-2y+x)-(-2-2x+y) = 3x-3y+1 = 0 \iff y = x+\tfrac13,$$

et avec $x+y=1$ : $2x+\frac13=1$, donc $x=\frac13$, $y=\frac23$. Puis $\mu_3 = -(-1-\frac43+\frac13) = 2 \ge 0$ .

**Étape 5 — comparer.**

| Point | Statut | $f$ |
|---|---|---|
| $\left(\frac13,\ \frac23\right)$ | KKT, arête $x+y=1$ | $\mathbf{-\frac{11}{6}} \approx -1{,}8333333$ |
| $(0,0)$ | sommet | $0$ |
| $(1,0)$ | sommet | $-\frac12$ |
| $(0,1)$ | sommet | $-\frac32$ |

$$\boxed{\min_K f = -\frac{11}{6} \approx -1{,}833, \text{ atteint en } \left(\frac13,\ \frac23\right).}$$

**Le détail du calcul de la valeur :**

$$f\left(\tfrac13,\tfrac23\right) = -\tfrac13-\tfrac43-2\cdot\tfrac13\cdot\tfrac23+\tfrac{1/9}{2}+\tfrac{4/9}{2} = -\tfrac53-\tfrac49+\tfrac{5}{18} = \frac{-30-8+5}{18} = -\frac{33}{18} = -\frac{11}{6} . \ \checkmark$$

**Contrôle numérique** sur le triangle discrétisé au pas $10^{-4}$ : minimum $-1{,}83333333$ en $(0{,}3333,\ 0{,}6667)$ .

**Et la vérification croisée annoncée** : M. Montaru trouve $-\frac{11}{3}$ au même point (fiche 605). Or $-\frac{11}{3}\div2 = -\frac{11}{6}$ **exactement**. Les deux résolutions, menées indépendamment par deux méthodes présentées différemment, concordent au chiffre près.

</details>

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | La bonne réaction | L'outil |
|---|---|---|
| « Montrer qu'il existe un minimum » | $K$ fermé : borné ? sinon coercivité | thm 2.12 |
| « … et qu'il est unique » | **stricte** convexité | thm 2.13 |
| « existence et unicité » | **forte** convexité — un seul argument | thm 2.14 |
| $f$ quadratique $\langle Ax,x\rangle+\langle b,x\rangle+c$ | tout se lit sur $A$, **avant** tout calcul | prop. 2.21 |
| « maximum global ? minimum global ? » | classification de la hessienne | prop. 2.20, 2.21 |
| $K$ **ouvert**, $f$ convexe | $\nabla f=0$ **suffit** et donne du global | thm 2.17 |
| $K$ convexe fermé, minimum au bord | **inéquation** d'Euler | lemme 2.16 |
| $\nabla^2f(x^\ast)$ semi-définie non définie | **aucun théorème** — étudier à la main | thm 2.18 / 2.19 |
| dimension $\ge3$ | mineurs **risqués** : trace + déterminant, ou valeurs propres | exercice 2.3.3 |
| contraintes $\ge$, $\le$ | **KKT** | fiche 605 |

**Le réflexe qui structure toute la fiche** : *les questions **existence**, **unicité** et **localisation** sont trois questions séparées, avec trois outils différents.* Ne les mélangez pas — et traitez-les dans cet ordre, car l'existence acquise dispense souvent d'étudier la nature des candidats.

## Comment résoudre ce type d'exercice

**Le protocole du cours (§2.2.3), enrichi de l'étape 0.**

**0. Repérer si $f$ est convexe.** Si oui — et surtout si elle est **fortement** convexe — le théorème 2.14 donne existence et unicité, et le théorème 2.17 fait de $\nabla f=0$ une condition **suffisante et globale**. **Toute la suite tombe.** Ce test coûte trois lignes et peut économiser toute une page.

**1. Existence.** $K$ fermé borné → thm 2.12 cas 1. $K$ fermé non borné + coercivité → cas 2. $K$ ouvert → la variante « Pour aller plus loin ».

**2. Points stationnaires.** Résoudre $\nabla f(x)=0$ **sur l'intérieur de $K$**. Vérifier que les solutions y sont bien.

**3. Filtrer par l'ordre 2.** Ne garder que ceux avec $\nabla^2f(x)\succeq0$ (minimum) ou $\preceq0$ (maximum).

**4. Le bord.** Si $K$ n'est pas ouvert, ajouter les candidats du bord : inéquation d'Euler (lemme 2.16) si $K$ est convexe, KKT sinon.

**5. Comparer** les valeurs de tous les candidats retenus.

**Comment décider de la nature d'une matrice symétrique — par ordre de rapidité.**

| Dimension | Méthode | Critère |
|---|---|---|
| $2$ | trace et déterminant | $\det>0$ et $\operatorname{tr}>0$ → définie positive ; $\det<0$ → indéfinie |
| $2$ | valeurs propres | $\lambda_\pm = \dfrac{\operatorname{tr}\pm\sqrt{\operatorname{tr}^2-4\det}}{2}$ |
| $3$ et plus | mineurs principaux dominants | **muet si l'un est nul** |
| $3$ et plus | trace et déterminant | $\det<0$ et $\operatorname{tr}>0$ en dimension 3 → **indéfinie** |
| toutes | valeurs propres | toujours concluant |

⚠️ **L'exercice 2.3.3 est construit exactement pour piéger le critère des mineurs** : $\Delta_2 = 0$ le rend inapplicable, alors que le raisonnement « $\det<0$ et $\operatorname{tr}>0$ » conclut en une ligne.

## 🔴 Common mistakes

1. **Confondre inf et min.** L'infimum existe toujours ; le minimum seulement s'il est **atteint**. $\inf_{\mathbb{R}}e^x = 0$ n'est jamais atteint.
2. **Croire que le théorème 2.13 donne l'existence.** Il dit « **si** $f$ admet un minimum, il est unique ». $e^x$ est strictement convexe sans minimum.
3. **Oublier la convexité de $K$ dans le théorème 2.13.** Sans elle, le milieu $\frac{x_1+x_2}{2}$ pourrait sortir de $K$ et la preuve tombe.
4. **Oublier l'hypothèse « intérieur » du théorème 2.15.** Au bord, on n'a que l'**inéquation** (lemme 2.16). Dans l'exercice 2.1, le minimum est en $(1,1)$ où $\nabla f = (2,2)\neq0$.
5. **Confondre les conditions d'ordre 2.** La nécessaire est $\succeq$ (thm 2.18), la suffisante est $\succ$ (thm 2.19). Le cas semi-défini non défini n'est traité par **aucune**.
6. **Appliquer le critère des mineurs quand l'un est nul.** L'exercice 2.3.3 a $\Delta_2=0$ : le critère est **muet**, pas négatif.
7. **Croire qu'une hessienne semi-définie positive garantit un minimum global.** $f(x,y)=x^2+y$ est convexe et non minorée : la proposition 2.21 exige alors $b\in\operatorname{Im}A$.
8. **Chercher le point critique d'une forme quadratique avant d'examiner $A$.** La hessienne répond aux deux questions d'un coup, et dit si le calcul en vaut la peine.
9. **Oublier que $\nabla^2f$ est constante pour une fonction quadratique.** Il n'y a rien à évaluer « au point » — c'est ce qui rend ces exercices immédiats.
10. **Oublier de vérifier que le point stationnaire est dans $K$.** Dans l'exercice 2.4, il vaut $y=-\frac43$ : hors du triangle.
11. **Traiter un maximum sans passer à $-f$.** Le cours définit systématiquement le maximum comme le minimum de $-f$ (déf. 2.10), et la procédure du §2.2.3 le rappelle explicitement.
12. **Négliger l'étape 0.** Si $f$ est fortement convexe, le théorème 2.14 règle existence et unicité en une phrase — et le théorème 2.17 remplace tout le reste.

## 📌 Ultimate Review

**Le §2.2 en un paragraphe.** L'**infimum** existe toujours, le **minimum** seulement s'il est atteint — et tout le paragraphe sert à garantir qu'il l'est. Le **théorème 2.12** donne l'existence quand $K$ est fermé et *soit* borné, *soit* accompagné d'une fonction **coercitive** ; le **théorème 2.13** donne l'unicité sous **stricte** convexité ; et le **théorème 2.14** réunit les deux sous la seule hypothèse de **forte** convexité, puisque celle-ci entraîne la coercivité (À savoir 2.7). Pour localiser : à l'intérieur, $\nabla f(x^\ast)=0$ (**équation** d'Euler, thm 2.15) ; sur un convexe, $\langle\nabla f(x^\ast),x-x^\ast\rangle\ge0$ (**inéquation**, lemme 2.16) — la première se déduisant de la seconde en l'appliquant à $h$ **et** $-h$. Si $f$ est **convexe**, $\nabla f(x^\ast)=0$ devient **nécessaire et suffisant** et donne du **global** (thm 2.17). À l'ordre 2, $\nabla^2f(x^\ast)\succeq0$ est **nécessaire**, $\succ 0$ est **suffisant**, et le cas intermédiaire n'est couvert par aucun théorème.

**Les huit énoncés à savoir citer.**

| N° | Énoncé | Usage |
|---|---|---|
| **2.9** | inf, min, **Argmin** | le vocabulaire exact |
| **2.11** | coercivité | l'hypothèse d'existence sur un non-borné |
| **2.12** | fermé borné, ou fermé + coercif ⟹ **existence** | la question 1 |
| **2.13** | strictement convexe ⟹ **unicité** | la question 2 |
| **2.14** | fermé convexe + **fortement** convexe ⟹ **existence ET unicité** | le raccourci |
| **2.15 / 2.16** | équation (intérieur) et **inéquation** (convexe) d'Euler | la localisation |
| **2.17** | $f$ convexe : $\nabla f=0 \iff$ min **global** | le cas confortable |
| **2.18 / 2.19** | $\succeq$ nécessaire, $\succ$ suffisant | l'ordre 2 |

**Les deux classifications en cinq cas.**

| $\nabla^2f(x^\ast)$ ou $A$ | Point critique (2.20) | Forme quadratique (2.21) |
|---|---|---|
| définie **positive** | minimum local **strict** | unique minimum **global** strict |
| définie **négative** | maximum local **strict** | unique maximum **global** strict |
| **semi**-définie positive | pas un max ; **peut-être** un min | minimum global *(si $b\in\operatorname{Im}A$)* |
| **semi**-définie négative | pas un min ; **peut-être** un max | maximum global *(idem)* |
| **indéfinie** | **ni** min **ni** max | **ni** min **ni** max |

**Les réponses des quatre exercices.**

| Ex. | Problème | Réponse |
|---|---|---|
| **2.1** | $x^2+y^2$ sur $[1,9]\times[1,\infty)$ | $\min = 2$ en $(1,1)$, **un coin**, $\nabla f\neq0$ |
| **2.2** | $x+y$ sur le disque | $\min = -\sqrt2$ en $-\frac{1}{\sqrt2}(1,1)$ |
| **2.3.1** | définie positive ($0{,}764$ ; $5{,}236$) | min global $0$ en $(-2,1)$ ; pas de max |
| **2.3.2** | indéfinie ($\pm2{,}828$) | **ni** min **ni** max ; selle en $\left(-\frac72,-\frac12\right)$ |
| **2.3.3** | indéfinie ($-2$ ; $0{,}536$ ; $7{,}464$) | **ni** min **ni** max ; $\Delta_2 = 0$ |
| **2.4** | triangle | $\min = -\frac{11}{6}$ en $\left(\frac13,\frac23\right)$ — **la moitié** de l'exemple 12 de M. Montaru |

**Le principe unique du paragraphe.** *À l'intérieur, on bouge dans les deux sens : égalité. Au bord, dans un seul : inégalité.* C'est la démonstration du théorème 2.15 à partir du lemme 2.16, et c'est le même principe qu'en dimension 1 (fiche 601) et qu'en KKT (fiche 605).

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Distinguer infimum, minimum et Argmin, avec un exemple pour chaque situation.**

</summary>

- **Infimum** : le plus grand des minorants de $f(K)$. **Existe toujours** dans $\mathbb{R}\cup\{-\infty\}$. C'est un **nombre**.
- **Minimum** : l'infimum **lorsqu'il est atteint**, c'est-à-dire lorsqu'il appartient à $f(K)$. C'est un **nombre**.
- **Argmin** : le ou **les** points où le minimum est atteint. C'est un **ensemble**.

| $f$, $K$ | inf | min | Argmin |
|---|---|---|---|
| $e^x$ sur $\mathbb{R}$ | $0$ | **n'existe pas** | $\emptyset$ |
| $x$ sur $\,]0,1[$ | $0$ | **n'existe pas** | $\emptyset$ |
| $x^2$ sur $\mathbb{R}^2$ (variable $x$) | $0$ | $0$ | **la droite $x=0$** |

Tout le §2.2.2 sert à garantir que l'infimum est **atteint**.

</details>

<details class="details--riche">
<summary>

**2. Démontrer que la forte convexité entraîne la coercivité (À savoir 2.7).**

</summary>

Fixons $x_0$. La caractérisation 2 de la proposition 2.5 donne

$$f(x)\ \ge\ f(x_0)+\langle\nabla f(x_0),x-x_0\rangle+\frac\alpha2\lVert x-x_0\rVert^2 .$$

Par **Cauchy-Schwarz**, $\langle\nabla f(x_0),x-x_0\rangle \ge -M r$ avec $M = \lVert\nabla f(x_0)\rVert$ et $r=\lVert x-x_0\rVert$. D'où

$$f(x)\ \ge\ f(x_0)-Mr+\frac\alpha2 r^2 \xrightarrow[r\to+\infty]{} +\infty .$$

**Le terme quadratique écrase le terme linéaire** — et c'est précisément $\alpha>0$ qui le permet. Avec $\alpha=0$ (convexité simple), le minorant devient une droite décroissante et l'argument tombe : $f(x,y)=x^2+y$ est convexe et non minorée.

</details>

<details class="details--riche">
<summary>

**3. Énoncer le théorème 2.12 et son idée de preuve.**

</summary>

$K$ **non vide fermé**, $f$ **continue** sur $K$. Le problème admet une solution si :

- $K$ est **borné** ; ou
- $K$ est **non borné** et $f$ est **coercitive**.

**Preuve** — cas 1 : fermé + borné = **compact**, donc **Weierstrass**.

Cas 2 : la coercivité fournit $R$ tel que $f(x)>f(x_0)$ hors de $\bar B(0,R)$. Sur le compact $K\cap\bar B(0,R)$, Weierstrass donne un minimum en $a$ avec $f(a)\le f(x_0)$ ; hors de la boule, $f > f(x_0)\ge f(a)$. Donc $a$ est un minimum **global**.

**L'idée : la coercivité enferme le minimum dans une boule, et sur la boule c'est Weierstrass.**

</details>

<details class="details--riche">
<summary>

**4. Démontrer le théorème 2.13 (unicité) et dire où chaque hypothèse sert.**

</summary>

Par l'absurde : soient $x_1\neq x_2$ deux minima de valeur $m$. Comme **$K$ est convexe**, le milieu est dans $K$. Par **stricte convexité** avec $t=\frac12$ :

$$f\left(\frac{x_1+x_2}{2}\right) < \frac12 m+\frac12 m = m,$$

ce qui contredit la minimalité de $m$. ∎

**Où sert chaque hypothèse** : la convexité de $K$ pour que le milieu soit admissible ; la **stricte** convexité pour obtenir l'inégalité **stricte**. Avec la convexité simple, on n'obtient que $\le m$ — pas de contradiction, et de fait $x^2$ (en dimension 2) a une infinité de minima.

⚠️ Le théorème ne donne **pas** l'existence : $e^x$ est strictement convexe sans minimum.

</details>

<details class="details--riche">
<summary>

**5. Énoncer le théorème 2.14 et expliquer pourquoi il est le plus économique du cours.**

</summary>

$K$ **fermé convexe non borné**, $f$ de classe $C^1$ **fortement convexe** sur $K$ ⟹ $f$ admet un **unique minimum global** sur $K$.

**Preuve — un assemblage :**

1. fortement convexe ⟹ **coercitive** (À savoir 2.7) ;
2. 
  - $K$ fermé non borné ⟹ **existence** (thm 2.12) ;
3. fortement ⟹ strictement convexe, + $K$ convexe ⟹ **unicité** (thm 2.13). ∎

**Pourquoi il est économique** : *une seule hypothèse* donne les deux résultats, **sans aucun calcul**. Cas d'application type : $f = \langle Ax,x\rangle+\langle b,x\rangle+c$ avec $A$ **définie positive**, où $\alpha = 2\lambda_{\min}(A)$ et $x^\ast = -\frac12A^{-1}b$.

</details>

<details class="details--riche">
<summary>

**6. Démontrer le lemme 2.16, puis en déduire le théorème 2.15.**

</summary>

**Lemme 2.16.** Soit $x\in K$. Par convexité de $K$, $x^\ast+t(x-x^\ast)\in K$ pour $t\in[0,1]$. La fonction $\varphi(t) = f(x^\ast+t(x-x^\ast))$ a un minimum local en $t=0$, **extrémité gauche** de $[0,1]$, donc son taux d'accroissement est positif et $\varphi'(0)\ge0$, c'est-à-dire

$$\langle\nabla f(x^\ast),\ x-x^\ast\rangle\ \ge\ 0 . \ \blacksquare$$

**Théorème 2.15.** Si $x^\ast$ est **intérieur**, on peut appliquer le lemme à $x=x^\ast+h$ **et** à $x=x^\ast-h$ pour $h$ petit : on obtient $\langle\nabla f(x^\ast),h\rangle\ge0$ et $\le0$, donc $=0$ pour tout $h$, donc $\nabla f(x^\ast)=0$. ∎

**Le principe** : *deux sens autorisés ⟹ égalité ; un seul ⟹ inégalité.*

</details>

<details class="details--riche">
<summary>

**7. Énoncer le théorème 2.17 et le démontrer.**

</summary>

$K$ convexe, $f$ **convexe** $C^1$, $x^\ast$ **intérieur**. Alors $x^\ast$ est un minimum **global** ssi $\nabla f(x^\ast)=0$.

**Preuve** — sens $\Rightarrow$ : théorème 2.15. Sens $\Leftarrow$ : par la caractérisation 2 de la proposition 2.3 ($f$ au-dessus de ses plans tangents),

$$f(x)\ \ge\ f(x^\ast)+\langle\nabla f(x^\ast),x-x^\ast\rangle = f(x^\ast) \qquad \text{pour tout } x\in K . \ \blacksquare$$

**Version « Pour aller plus loin », sans l'hypothèse d'intériorité** : $x^\ast$ est un minimum global ssi $\langle\nabla f(x^\ast),x-x^\ast\rangle\ge0$ pour tout $x\in K$.

**C'est le théorème 4.20 de M. Montaru** — les deux cours convergent, et pour cause : c'est le fondement de l'optimisation convexe.

</details>

<details class="details--riche">
<summary>

**8. Pourquoi le théorème 2.18 a-t-il un $\succeq$ et le théorème 2.19 un $\succ$ ?**

</summary>

Parce que le cas **semi-défini mais non défini** est **indécidable** à l'ordre 2, exactement comme le cas $f''(t_0)=0$ en dimension 1 (fiche 601).

- **2.18** ($\succeq$, nécessaire) : sert à **éliminer** les candidats dont la hessienne a une valeur propre strictement négative.
- **2.19** ($\succ$, suffisant) : sert à **conclure** — et la stricte positivité est ce qui rend l'énoncé vrai, car elle absorbe le reste $o(\lVert h\rVert^2)$ de Taylor.

Entre les deux, **aucun théorème** : il faut étudier le signe de $f(x^\ast+h)-f(x^\ast)$ directement. C'est ce que dit la proposition 2.20 en écrivant « **peut** éventuellement être un point de minimum local ».

</details>

<details class="details--riche">
<summary>

**9. Résoudre l'exercice 2.3 et dire où le critère des mineurs échoue.**

</summary>

|  | Hessienne | Valeurs propres | Conclusion |
|---|---|---|---|
| **1** | $\begin{pmatrix}2&-2\\-2&4\end{pmatrix}$ | $3\pm\sqrt5$ : $0{,}764$ ; $5{,}236$ | **définie positive** → min global $0$ en $(-2,1)$ |
| **2** | $\begin{pmatrix}2&-2\\-2&-2\end{pmatrix}$ | $\pm2\sqrt2 = \pm2{,}828$ | **indéfinie** → ni min ni max ; selle en $\left(-\frac72,-\frac12\right)$ |
| **3** | $\begin{pmatrix}2&-2&-2\\-2&2&4\\-2&4&2\end{pmatrix}$ | $-2$ ; $0{,}536$ ; $7{,}464$ | **indéfinie** → ni min ni max ; selle en $(-5,-3,1)$ |

⚠️ **Au point 3, les mineurs dominants valent $2$, $\mathbf{0}$, $-8$** : le **deuxième est nul**, ce qui rend le critère **inapplicable**.

**Le raccourci qui conclut quand même** : $\det = -8<0$ pour une matrice $3\times3$ signifie une ou trois valeurs propres négatives ; la **trace** vaut $6>0$, ce qui interdit les trois. Donc exactement une : **indéfinie**.

</details>

<details class="details--riche">
<summary>

**10. Résoudre l'exercice 2.4 et le relier au cours de M. Montaru.**

</summary>

$f(x,y) = -x-2y-2xy+\frac{x^2}{2}+\frac{y^2}{2}$ sur le triangle $\{x\ge0,\ y\ge0,\ x+y\le1\}$.

**Observation clé** : $f = \frac12 g$ où $g(x,y)=x^2+y^2-4xy-2x-4y$ est **exactement** la fonction de l'exemple 12 du chapitre 6 de M. Montaru, sur **le même triangle**.

*Existence* : triangle **compact**, $f$ continue → thm 2.12. *Convexité* : $\nabla^2f = \begin{pmatrix}1&-2\\-2&1\end{pmatrix}$, $\det=-3<0$ : **indéfinie**, donc $f$ **n'est pas convexe** — le théorème 2.17 ne s'applique pas.

*Point stationnaire* : $y=-\frac43$, **hors du triangle**. Le minimum est au bord.

*KKT* (contraintes affines, donc qualifiées) : un seul point admissible, $\left(\frac13,\frac23\right)$ avec $\mu_3 = 2\ge0$.

| Point | $f$ |
|---|---|
| $\left(\frac13,\frac23\right)$ | $\mathbf{-\frac{11}{6}} \approx -1{,}833$ |
| $(0,0)$ / $(1,0)$ / $(0,1)$ | $0$ / $-\frac12$ / $-\frac32$ |

**Vérification croisée** : M. Montaru trouve $-\frac{11}{3}$ au même point, et $-\frac{11}{3}\div2 = -\frac{11}{6}$ .

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Infimum (déf. 2.7) ? | Le plus grand des **minorants** |
| Existe-t-il toujours ? | **Oui** |
| Minimum (déf. 2.8) ? | L'infimum **atteint** |
| Existe-t-il toujours ? | **Non** |
| Argmin (déf. 2.9) ? | Le ou **les points** où le minimum est atteint |
| $\inf_{\mathbb{R}}e^x$ ? | $0$, **jamais atteint** |
| Maximum, dans ce cours ? | Le minimum de $-f$ (déf. 2.10) |
| Coercitive (déf. 2.11) ? | $f\to+\infty$ quand $\lVert x\rVert\to+\infty$ dans $K$ |
| Fortement convexe ⟹ ? | **Coercitive** (À savoir 2.7) |
| L'argument ? | $f\ge f(x_0)-Mr+\frac\alpha2r^2$, trinôme |
| Convexe ⟹ coercitive ? | **Non** — $x^2+y$ |
| Théorème 2.12, cas 1 ? | $K$ fermé **borné** → Weierstrass |
| Cas 2 ? | $K$ fermé non borné + $f$ **coercitive** |
| Théorème 2.13 ? | Strictement convexe ⟹ **unicité** |
| Sa preuve ? | Par l'absurde, avec le **milieu** |
| Donne-t-il l'existence ? | **Non** — $e^x$ |
| Théorème 2.14 ? | Fermé convexe + **fortement** convexe ⟹ existence **et** unicité |
| Pourquoi il est le plus utile ? | **Une** hypothèse, **deux** conclusions, **zéro** calcul |
| Théorème 2.15 ? | $x^\ast$ **intérieur** ⟹ $\nabla f(x^\ast)=0$ |
| Lemme 2.16 ? | $K$ convexe ⟹ $\langle\nabla f(x^\ast),x-x^\ast\rangle\ge0$ |
| Lequel se démontre en premier ? | Le **lemme** |
| Comment 2.15 en découle ? | Appliquer à $h$ **et** $-h$ |
| Le principe ? | Deux sens ⟹ égalité ; un seul ⟹ inégalité |
| Direction admissible ? | $x^\ast+\alpha d\in K$ pour $\alpha\in[0,\eta[$ |
| Son équivalent chez M. Montaru ? | Le **cône** $C(a)$ (déf. 4.13) |
| Théorème 2.17 ? | $f$ convexe : $\nabla f(x^\ast)=0 \iff$ min **global** |
| Sa preuve ? | $f$ au-dessus de ses **plans tangents** |
| Sa version au bord ? | $\langle\nabla f(x^\ast),x-x^\ast\rangle\ge0$ |
| Théorème 2.18 ? | Nécessaire : $\nabla^2f(x^\ast)\succeq0$ |
| Théorème 2.19 ? | Suffisant : $\nabla f=0$ **et** $\nabla^2f\succ0$ |
| Le cas intermédiaire ? | **Aucun théorème** |
| La procédure en 4 points ? | Espérer · stationnaires · filtrer par $\nabla^2f$ · comparer |
| Pour un maximum ? | Point 3 avec $\preceq0$ |
| Prop. 2.20, hessienne indéfinie ? | **Ni** min **ni** max local |
| Semi-définie positive ? | Pas un max ; **peut-être** un min |
| Prop. 2.21, $A$ définie positive ? | Unique minimum **global strict** |
| $A$ indéfinie ? | **Ni** min **ni** max |
| La réserve sur les cas semi-définis ? | Il faut $b\in\operatorname{Im}A$ |
| Le contre-exemple ? | $x^2+y$ : convexe, non minorée |
| $\nabla^2f$ d'une quadratique ? | $2A$, **constante** |
| Exercice 2.1 : réponse ? | $2$ en $(1,1)$ — **un coin** |
| $\nabla f$ y est-il nul ? | **Non**, $(2,2)$ |
| Exercice 2.2 : réponse ? | $-\sqrt2$ en $-\frac{1}{\sqrt2}(1,1)$ |
| Son équivalent chez M. Montaru ? | **Exemple 11** du chapitre 6 |
| Exercice 2.3.1 : valeurs propres ? | $0{,}764$ et $5{,}236$ — définie positive |
| Son minimum ? | $0$ en $(-2,1)$ |
| Exercice 2.3.2 ? | $\pm2{,}828$ — **indéfinie** |
| Exercice 2.3.3 : le piège ? | $\Delta_2 = 0$ : mineurs **muets** |
| Le raccourci qui sauve ? | $\det<0$ **et** $\operatorname{tr}>0$ en dimension 3 |
| Ses valeurs propres ? | $-2$ ; $0{,}536$ ; $7{,}464$ |
| Exercice 2.4 : réponse ? | $-\frac{11}{6}$ en $\left(\frac13,\frac23\right)$ |
| $f$ y est-elle convexe ? | **Non** — hessienne indéfinie |
| Sa parenté avec M. Montaru ? | **Exactement la moitié** de l'exemple 12 |
|  |  |
