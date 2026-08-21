# Fiche 502 — Utilité indirecte et fonction de dépense : les deux faces de la dualité

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 1 « Consumer Theory », §1.4 « Indirect Utility and Expenditure » (p. 28-48) |
| **Difficulté** | Fondamental — la boîte à outils qui sert dans tout le reste du livre |
| **Temps d'étude estimé** | 140 min |
| **Prérequis** | Fiches 500 et 501 · théorème de l'enveloppe (thm A2.22) · théorème du maximum (thm A2.21) · quasiconvexité et concavité (fiches 34-35) |
| **Concepts clés** | Fonction d'utilité indirecte $v(p,y)$, fonction de valeur maximale, homogénéité de degré zéro, quasiconvexité en $(p,y)$, identité de Roy, fonction de dépense $e(p,u)$, fonction de valeur minimale, demande hicksienne $x^h(p,u)$, demande compensée, courbe d'isodépense, homogénéité de degré 1 en $p$, concavité en $p$, lemme de Shephard, inversion $e = v^{-1}$, dualité, théorèmes 1.8 et 1.9 |
| **Poids à l'examen** | Les **six propriétés de $v$** et les **sept de $e$**, avec la démonstration de chacune · l'**identité de Roy** et le **lemme de Shephard** (les deux via le théorème de l'enveloppe) · la **quasiconvexité de $v$** (preuve par les ensembles budgétaires) · la **concavité de $e$** (preuve par la minimisation) · les **quatre identités** des théorèmes 1.8 et 1.9 · l'**inversion** $e(p,u)=v^{-1}(p:u)$. |

## 🎯 Vue d'ensemble

```
LE FIL DU §1.4 : DEUX problemes, DEUX fonctions de valeur, QUATRE identites

  PROBLEME PRIMAL  (§1.4.1)          PROBLEME DUAL  (§1.4.2)
  ------------------------------     ------------------------------
  max u(x)  s.c.  p.x <= y           min p.x  s.c.  u(x) >= u
  prix et REVENU donnes              prix et UTILITE donnes
  on cherche l'UTILITE MAX           on cherche la DEPENSE MIN

  solution :  x(p,y)                 solution :  x^h(p,u)
     demande MARSHALLIENNE              demande HICKSIENNE (compensee)
     OBSERVABLE                         NON observable

  valeur :  v(p,y) = u(x(p,y))       valeur :  e(p,u) = p . x^h(p,u)
     UTILITE INDIRECTE                  FONCTION DE DEPENSE
     fonction de valeur MAXIMALE        fonction de valeur MINIMALE

  THEOREME 1.6 -- v(p,y)             THEOREME 1.7 -- e(p,u)
  1. continue                        1. nulle au plus bas niveau d'utilite
  2. HOMOGENE DE DEGRE 0 en (p,y)    2. continue
  3. STRICTEMENT CROISSANTE en y     3. str. croissante et NON BORNEE en u
  4. DECROISSANTE en p               4. croissante en p
  5. QUASICONVEXE en (p,y)           5. HOMOGENE DE DEGRE 1 en p
  6. IDENTITE DE ROY                 6. CONCAVE en p
                                     7. LEMME DE SHEPHARD
     xi(p,y) = - (dv/dpi)/(dv/dy)       xi^h(p,u) = de(p,u)/dpi

  LES DEUX MOTEURS DE PREUVE
     theoreme de l'ENVELOPPE (A2.22) -> proprietes 3 et 6 de v, 3 et 7 de e
     theoreme du MAXIMUM     (A2.21) -> continuite de v et de e

  LES QUATRE IDENTITES

     THEOREME 1.8  (les fonctions de valeur)
        e( p , v(p,y) ) = y            v( p , e(p,u) ) = u
        => e et v sont INVERSES l'une de l'autre en leur derniere variable
           e(p,u) = v^-1(p : u)        v(p,y) = e^-1(p : y)
           => UN SEUL probleme a resoudre, jamais deux

     THEOREME 1.9  (les demandes)
        x(p,y) = x^h( p , v(p,y) )     x^h(p,u) = x( p , e(p,u) )

  LE FIL ROUGE  --  au point optimal, TOUT coincide
     meme panier x* , meme droite ( budget = isodepense ) , meme point (p1,x1*)
     sur la demande marshallienne ET sur la demande hicksienne
```

> **La phrase-clé du §1.4.3.** *« Les deux sont conceptuellement les deux faces opposées d'une même pièce. Mathématiquement, la fonction d'utilité indirecte et la fonction de dépense sont simplement les **inverses convenablement choisies** l'une de l'autre. »*

> ⚠️ **Note de transcription — identique aux fiches 500 et 501.** Le PDF n'exporte pas $\succsim$, $\succ$, $\gg$, $\sum$, et rend l'inégalité vectorielle $\geq$ comme un « + ». Ces symboles sont rétablis à partir de la prose et des équations voisines. Une **coquille du livre** dans la preuve de la concavité de $e$ est signalée en cours de route.

## 🔴 Concept 1 — La fonction d'utilité indirecte (§1.4.1)

### 1.1 D'où elle vient

> *« La fonction d'utilité **ordinaire**, $u(x)$, est définie sur l'ensemble de consommation $X$ et représente les préférences du consommateur **directement**, comme nous l'avons vu. On l'appelle donc la **fonction d'utilité directe**. Étant donné des prix $p$ et un revenu $y$, le consommateur choisit un panier maximisant l'utilité $x(p,y)$. Le niveau d'utilité atteint lorsque $x(p,y)$ est choisi sera donc le plus élevé permis par la contrainte budgétaire du consommateur face aux prix $p$ et au revenu $y$. »*

Des prix ou des revenus différents donnent des contraintes budgétaires différentes, donc des choix différents, donc des niveaux d'utilité maximisée différents. **La relation entre prix, revenu et utilité maximale** se résume par une fonction $v : \mathbb{R}^n_+ \times \mathbb{R}_+ \to \mathbb{R}$ :

$$\boxed{\;v(p,y) = \max_{x\in\mathbb{R}^n_+} \ u(x) \quad\text{s.c.}\quad p\cdot x \leq y\;} \tag{1.12}$$

**Définition (dans le texte).** *« La fonction $v(p,y)$ est appelée la **fonction d'utilité indirecte**. C'est la **fonction de valeur maximale** correspondant au problème de maximisation de l'utilité du consommateur. »*

### 1.2 Pourquoi elle est bien définie

Le livre prend soin de justifier l'existence :

> *« Lorsque $u(x)$ est **continue**, $v(p,y)$ est bien définie pour tout $p\gg0$ et $y\geq0$ parce qu'une solution au problème de maximisation (1.12) est **garantie d'exister**. Si, de plus, $u(x)$ est **strictement quasiconcave**, alors la solution est **unique** et nous l'écrivons $x(p,y)$, la fonction de demande du consommateur. »*

D'où l'identité fondatrice :

$$\boxed{\;v(p,y) = u\big(x(p,y)\big)\;} \tag{1.13}$$

**Lecture géométrique (Fig. 1.13).** *« Nous pouvons penser à $v(p,y)$ comme donnant le niveau d'utilité de **la plus haute courbe d'indifférence que le consommateur peut atteindre**, étant donné les prix $p$ et le revenu $y$. »*

> ⚠️ **« Indirecte » ne veut pas dire « approximative ».** $v$ contient **exactement** la même information que $u$, simplement indexée autrement : $u$ range les paniers, $v$ range les **situations de marché** $(p,y)$. Le §2.1.3 du livre (fiche 504) montrera qu'on peut reconstruire $u$ à partir de $v$ — la correspondance est parfaite dans les deux sens.

## 🔴 Concept 2 — Théorème 1.6 : les six propriétés de $v(p,y)$

### 2.1 L'énoncé

> *« La continuité de la fonction de contrainte en $p$ et $y$ suffit à garantir que $v(p,y)$ sera continue en $p$ et $y$ sur $\mathbb{R}^n_{++}\times\mathbb{R}_+$. (Voir section A2.4.) Effectivement, la continuité de $v(p,y)$ découle de ce que, à des prix positifs, de "petits changements" dans l'un quelconque des paramètres $(p,y)$ fixant l'emplacement de la contrainte budgétaire ne mèneront qu'à de "petits changements" dans le niveau maximal d'utilité que le consommateur peut atteindre. »*

> **THEOREM 1.6 — Properties of the Indirect Utility Function.** If $u(x)$ is **continuous** and **strictly increasing** on $\mathbb{R}^n_+$, then $v(p,y)$ defined in (1.12) is
>
> 1. **Continuous** on $\mathbb{R}^n_{++}\times\mathbb{R}_+$,
> 2. **Homogeneous of degree zero** in $(p,y)$,
> 3. **Strictly increasing** in $y$,
> 4. **Decreasing** in $p$,
> 5. **Quasiconvex** in $(p,y)$. Moreover, it satisfies
> 6. **Roy's identity:** if $v(p,y)$ is differentiable at $(p^0,y^0)$ and $\partial v(p^0,y^0)/\partial y \neq 0$, then $$x_i(p^0,y^0) = -\frac{\partial v(p^0,y^0)/\partial p_i}{\partial v(p^0,y^0)/\partial y}, \qquad i=1,\dots,n.$$

> ⚠️ **Les hypothèses sont légères — et c'est important.** Seules la **continuité** et la **stricte croissance** de $u$ sont exigées. Ni la quasiconcavité, ni la stricte quasiconcavité. Les propriétés 1 à 6 valent donc bien au-delà de l'hypothèse 1.2. *(La stricte quasiconcavité servira seulement à garantir l'unicité de $x(p,y)$, donc à ce que l'identité de Roy pointe vers une fonction bien définie.)*
>
> **Notez aussi l'asymétrie des adverbes :** $v$ est **strictement** croissante en $y$, mais seulement **décroissante** (au sens large) en $p$. Ce n'est pas une négligence : si le bien $i$ n'est pas consommé à l'optimum, une hausse de $p_i$ peut laisser $v$ inchangée.

### 2.2 Propriété 1 — continuité

<div class="callout" data-kind="formel">

<span class="callout__lab">théorème A2.21</span>

*« La propriété 1 découle du (le théorème du maximum). Nous n'en poursuivrons pas les détails. »*

</div>

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que dit le théorème du maximum, en une phrase.</span>

Si l'objectif est continu et si la correspondance de contrainte est continue à valeurs compactes non vides, alors la **fonction de valeur** est continue. Ici l'objectif est $u$ (continue) et la contrainte est $B(p,y)$, qui varie continûment avec $(p,y)$ tant que $p\gg0$.

</div>

### 2.3 Propriété 2 — homogénéité de degré zéro

> *« La deuxième propriété est facile à prouver. Nous devons montrer que $v(p,y)=v(tp,ty)$ pour tout $t>0$. Mais $v(tp,ty) = \big[\max u(x)$ s.c. $tp\cdot x \leq ty\big]$, ce qui est clairement équivalent à $\big[\max u(x)$ s.c. $p\cdot x\leq y\big]$ parce que nous pouvons **diviser les deux membres de la contrainte par $t>0$** sans affecter l'ensemble des paniers qui la satisfont. (Voir Fig. 1.14.) Par conséquent, $v(tp,ty)=v(p,y)$. »*

$$\boxed{\;v(tp,ty)=v(p,y) \qquad \forall\,t>0\;}$$

> **La signification économique — « l'illusion monétaire n'existe pas ».** Doubler tous les prix **et** le revenu ne change rien : le même ensemble budgétaire, donc les mêmes choix, donc la même utilité. Géométriquement (Fig. 1.14), la droite de budget est **inchangée** : sa pente $-tp_1/tp_2 = -p_1/p_2$ et ses intercepts $ty/tp_i = y/p_i$ sont les mêmes.
>
> **Le corollaire pratique.** L'homogénéité de degré 0 permet de **normaliser** : on peut poser $y=1$, ou $p_n=1$, sans perte de généralité. Seuls les **prix relatifs** et le **revenu réel** comptent — c'est le sujet du §1.5.1 (fiche 503).

### 2.4 Propriétés 3 et 4 — l'intuition d'abord

> *« Intuitivement, les propriétés 3 et 4 disent simplement que **tout relâchement de la contrainte budgétaire du consommateur ne peut jamais faire baisser** le niveau maximal d'utilité atteignable, tandis que **tout resserrement de la contrainte budgétaire ne peut jamais le faire monter**. »*

### 2.5 Propriété 3 — strictement croissante en $y$ (par l'enveloppe)

Le livre est explicite sur le statut de cette preuve :

> *« Pour prouver 3 (et pour pratiquer les méthodes lagrangiennes), nous ferons quelques **hypothèses supplémentaires**, bien que la propriété 3 puisse être montrée sans elles. Pour garder les choses simples, nous supposerons pour l'instant que la solution de (1.12) est **strictement positive et différentiable**, où $(p,y)\gg0$, et que $u(\cdot)$ est différentiable avec $\partial u(x)/\partial x_i>0$ pour tout $x\gg0$. »*

**Pas 1 — la contrainte est saturée.** *« Comme nous l'avons remarqué auparavant, parce que $u(\cdot)$ est strictement croissante, la contrainte dans (1.12) doit être **active** à l'optimum. »* Donc (1.12) équivaut à

$$v(p,y) = \max_{x\in\mathbb{R}^n_+} u(x) \quad\text{s.c.}\quad p\cdot x = y \tag{P.1}$$

**Pas 2 — le lagrangien.**

$$\mathcal{L}(x,\lambda)=u(x)-\lambda\big(p\cdot x - y\big) \tag{P.2}$$

Pour $(p,y)\gg0$, soit $x^*=x(p,y)$ la solution de (P.1). Comme $x^*\gg0$, le théorème de Lagrange donne l'existence d'un $\lambda^*\in\mathbb{R}$ tel que

$$\frac{\partial\mathcal{L}(x^*,\lambda^*)}{\partial x_i}=\frac{\partial u(x^*)}{\partial x_i}-\lambda^* p_i = 0, \qquad i=1,\dots,n \tag{P.3}$$

*« Notez qu'à cause du fait que $p_i$ **et** $\partial u(x^*)/\partial x_i$ sont positifs, $\lambda^*$ l'est aussi. »*

**Pas 3 — le théorème de l'enveloppe.**

<div class="callout" data-kind="formel">

<span class="callout__lab">théorème de l'enveloppe</span>

*« Selon le [A2.22], la dérivée partielle de la fonction de valeur maximale $v(p,y)$ par rapport à $y$ est égale à la dérivée partielle du **lagrangien** par rapport à $y$, évaluée en $(x^*,\lambda^*)$ : »*

</div>

$$\boxed{\;\frac{\partial v(p,y)}{\partial y}=\frac{\partial\mathcal{L}(x^*,\lambda^*)}{\partial y}=\lambda^* > 0\;} \tag{P.4}$$

*« Ainsi, $v(p,y)$ est strictement croissante en $y>0$. Donc, parce que $v$ est continue, elle est alors strictement croissante sur $y\geq0$. »* $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que (P.4) démontre au passage — et c'est un résultat majeur du chapitre.</span>

$$\lambda^* = \frac{\partial v(p,y)}{\partial y}$$

**Le multiplicateur de Lagrange EST l'utilité marginale du revenu.** C'est la justification rigoureuse de la lecture « bang pour l'euro » de la fiche 501 (§3.5). Le multiplicateur, qui semblait un artifice de calcul, a une interprétation économique exacte.

⚠️ **Le calcul de $\partial\mathcal{L}/\partial y$ est trivial — c'est là toute la force du théorème de l'enveloppe.** $\mathcal{L}=u(x)-\lambda(p\cdot x-y)$ contient $y$ dans un seul terme, $+\lambda y$. Donc $\partial\mathcal{L}/\partial y=\lambda$. Le théorème de l'enveloppe dit qu'on peut **ignorer** la façon dont $x^*$ lui-même bouge quand $y$ change : les termes correspondants s'annulent, précisément parce que $x^*$ est optimal.

</div>

### 2.6 Propriété 4 — décroissante en $p$ (preuve élémentaire)

> *« Pour la propriété 4, on peut aussi employer le théorème de l'enveloppe. Cependant, nous donnerons une preuve **plus élémentaire** qui ne repose sur **aucune hypothèse supplémentaire**. »*

**La preuve du livre, développée.** Soit $p^0 \geq p^1$ (les prix baissent faiblement, coordonnée par coordonnée) et soit $x^0$ la solution de (1.12) quand $p=p^0$.

| Pas | Affirmation | Justification |
|---|---|---|
| 1 | $x^0 \geq 0$, donc $(p^0-p^1)\cdot x^0 \geq 0$ | produit de deux vecteurs à coordonnées $\geq0$ |
| 2 | donc $p^1\cdot x^0 \leq p^0\cdot x^0$ | réécriture du pas 1 |
| 3 | et $p^0\cdot x^0 \leq y$ | $x^0$ était réalisable aux prix $p^0$ |
| 4 | donc $p^1\cdot x^0 \leq y$ : **$x^0$ est réalisable aux prix $p^1$** | enchaînement 2-3 |
| 5 | donc $v(p^1,y) \geq u(x^0) = v(p^0,y)$ | $v$ est le **max** sur un ensemble contenant $x^0$ |

Conclusion : $p^0 \geq p^1 \Rightarrow v(p^1,y)\geq v(p^0,y)$, c'est-à-dire $v$ est **décroissante** en $p$. $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi le livre tient à cette preuve-là.</span>

Elle n'utilise **ni différentiabilité, ni lagrangien** — seulement le fait qu'une baisse de prix **agrandit** l'ensemble budgétaire, et qu'un max sur un ensemble plus grand ne peut pas être plus petit. C'est l'argument de « monotonie du max », et il resservira partout.

⚠️ **Pourquoi pas « strictement » décroissante ?** Parce qu'une baisse de $p_i$ ne fait rien si $x_i^0=0$ : le pas 1 donne alors une égalité. Sous l'hypothèse 1.2 avec des conditions d'Inada, la solution est intérieure et la décroissance devient stricte — mais le théorème 1.6, qui n'exige pas cela, ne peut affirmer que le sens large.

</div>

### 2.7 Propriété 5 — quasiconvexité en $(p,y)$

C'est la propriété la moins intuitive du théorème, et le livre lui consacre une page entière.

**L'énoncé en mots.** *« La propriété 5 dit qu'un consommateur **préférerait l'un ou l'autre de deux ensembles budgétaires extrêmes à n'importe quelle moyenne des deux**. »*

**Ce qu'il faut établir.**

$$v(p^t,y^t)\ \leq\ \max\big[v(p^1,y^1),\ v(p^2,y^2)\big] \qquad \forall\,t\in[0,1]$$

où $p^t \equiv tp^1+(1-t)p^2$ et $y^t \equiv ty^1+(1-t)y^2$. *(C'est exactement la définition de la quasiconvexité en $(p,y)$.)*

> *« **La clé de la preuve est de se concentrer sur les ensembles budgétaires.** »*

**L'idée, énoncée par le livre avant tout calcul :**

> *« Supposons que nous puissions montrer que **tout choix que le consommateur peut éventuellement faire lorsqu'il fait face au budget $B^t$ est un choix qu'il aurait pu faire lorsqu'il faisait face soit à $B^1$, soit à $B^2$**. Il serait alors le cas que tout niveau d'utilité qu'il peut atteindre face à $B^t$ est un niveau qu'il aurait pu atteindre soit face à $B^1$, soit face à $B^2$. Alors, bien sûr, le niveau maximal d'utilité qu'il peut atteindre sur $B^t$ ne pourrait pas être plus grand qu'au moins l'un des suivants : le maximum sur $B^1$, ou le maximum sur $B^2$. »*

**Le lemme à démontrer :**

$$\boxed{\;x \in B^t \ \Longrightarrow\ x\in B^1 \ \text{ ou } \ x \in B^2, \qquad \forall\,t\in[0,1]\;}$$

**La démonstration du lemme, par contraposée.** *« Si nous choisissons l'une ou l'autre valeur extrême de $t$, $B^t$ coïncide avec $B^1$ ou $B^2$, donc les relations tiennent trivialement. Il reste à montrer qu'elles tiennent pour tout $t\in(0,1)$. »*

Supposons le contraire : il existe $t\in(0,1)$ et $x\in B^t$ tels que $x\notin B^1$ et $x\notin B^2$. Alors

$$p^1\cdot x > y^1 \qquad\text{et}\qquad p^2\cdot x > y^2.$$

Comme $t\in(0,1)$, on peut multiplier la première par $t$ et la seconde par $(1-t)$ — **tous deux strictement positifs, donc les inégalités sont préservées** :

$$t\,p^1\cdot x > t\,y^1 \qquad\qquad (1-t)\,p^2\cdot x > (1-t)\,y^2$$

En **additionnant** :

$$\big(tp^1+(1-t)p^2\big)\cdot x > ty^1+(1-t)y^2 \qquad\text{c'est-à-dire}\qquad p^t\cdot x > y^t.$$

*« Mais cette dernière ligne dit que $x\notin B^t$, ce qui contredit notre hypothèse de départ. »* $\blacksquare$

> ⚠️ **Le point de vigilance : $t\in(0,1)$ STRICTEMENT.** Si $t=0$ ou $t=1$, l'un des deux facteurs est nul et l'inégalité stricte se perd (on obtiendrait $0>0$, faux). C'est pourquoi le livre traite d'abord les extrémités séparément — elles sont triviales, mais elles ne relèvent pas du même argument.
>
> **La géométrie de ce lemme.** L'union $B^1\cup B^2$ **contient** $B^t$ pour tout $t$ — alors que l'union de deux ensembles convexes n'est en général pas convexe et ne contient pas les combinaisons de ses points. Ce qui rend la chose possible ici, c'est que les $B$ sont des **demi-espaces intersectés avec l'orthant**, et que la combinaison porte sur les **paramètres** $(p,y)$, pas sur les points $x$.
>
> **Pourquoi « quasiconvexe » et non « convexe » ?** Parce qu'on ne compare $v(p^t,y^t)$ qu'au **maximum** des deux valeurs extrêmes, pas à leur moyenne pondérée. La convexité serait plus forte — et fausse en général.

<details class="details--riche">
<summary>

**Une lecture économique de la quasiconvexité — pourquoi ce résultat est utile**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours).</span>

</div>

Le livre démontre la propriété 5 sans en tirer d'interprétation au-delà de la phrase « le consommateur préférerait l'un des deux extrêmes ». Voici ce qu'elle signifie concrètement.

**Reformulation.** L'ensemble des situations $(p,y)$ où le consommateur atteint **au moins** un niveau $\bar u$ est le complémentaire de $\{(p,y) \mid v(p,y) < \bar u\}$. La quasiconvexité de $v$ dit exactement que ces ensembles **inférieurs** $\{(p,y) \mid v(p,y)\leq \bar u\}$ sont **convexes**.

**L'usage concret : l'aversion au risque de prix.** Supposons un consommateur qui doit choisir entre deux régimes : — **régime certain** : les prix seront $p^t = \tfrac12 p^1 + \tfrac12 p^2$ avec certitude ; — **régime risqué** : les prix seront $p^1$ ou $p^2$, chacun avec probabilité $\tfrac12$.

La quasiconvexité dit que $v(p^t,y)\leq\max\{v(p^1,y),v(p^2,y)\}$. Ce n'est **pas** encore une préférence pour la loterie — pour cela il faudrait la **convexité** de $v$, qui donnerait $v(p^t,y)\leq\tfrac12 v(p^1,y)+\tfrac12 v(p^2,y)$, c'est-à-dire une préférence stricte pour l'incertitude sur les prix.

> ⚠️ **La quasiconvexité seule ne permet PAS de conclure à une préférence pour la volatilité des prix.** C'est une erreur répandue. Elle dit seulement que le cas moyen n'est jamais meilleur que **le meilleur** des deux cas extrêmes — ce qui est une information beaucoup plus faible.

**Où la propriété 5 sert réellement dans le livre :** au §2.1.3 (fiche 504), pour reconstruire les préférences à partir de $v$. La quasiconvexité de $v$ en $(p,y)$ est l'une des conditions qui caractérisent les fonctions pouvant être des utilités indirectes.

</details>

### 2.8 Propriété 6 — l'identité de Roy

**L'énoncé en mots du livre.** *« Ceci dit que la demande marshallienne du consommateur pour le bien $i$ est simplement le **rapport des dérivées partielles de l'utilité indirecte par rapport à $p_i$ et à $y$**, après un changement de signe. (Notez le signe moins dans 6.) »*

$$\boxed{\;x_i(p,y) = -\frac{\partial v(p,y)/\partial p_i}{\partial v(p,y)/\partial y}\;}$$

**La preuve, par le théorème de l'enveloppe.** *(Le livre réinvoque les hypothèses supplémentaires du §2.5 ; il renvoie à l'exercice 1.35 pour une preuve qui s'en passe.)*

Soit $x^*=x(p,y)$ la solution strictement positive de (1.12) ; comme vu, il existe $\lambda^*$ vérifiant (P.3). Le théorème de l'enveloppe appliqué à $\partial v/\partial p_i$ donne

$$\frac{\partial v(p,y)}{\partial p_i} = \frac{\partial\mathcal{L}(x^*,\lambda^*)}{\partial p_i} = -\lambda^* x_i^* \tag{P.5}$$

*(Le calcul : $\mathcal{L}=u(x)-\lambda(p\cdot x - y)$ contient $p_i$ dans le seul terme $-\lambda p_i x_i$, dont la dérivée est $-\lambda x_i$.)*

Or par (P.4), $\lambda^* = \partial v(p,y)/\partial y > 0$. Donc (P.5) devient

$$-\frac{\partial v(p,y)/\partial p_i}{\partial v(p,y)/\partial y} = \frac{\lambda^* x_i^*}{\lambda^*} = x_i^* = x_i(p,y) \qquad\blacksquare$$

> **La démonstration tient en deux lignes — la vraie compréhension est ailleurs.** Retenez la **structure** :
>
> $$\frac{\partial v}{\partial p_i}=-\lambda^* x_i^* \qquad\qquad \frac{\partial v}{\partial y}=\lambda^*$$
>
> Les deux dérivées de $v$ font apparaître **le même $\lambda^*$**, qui se simplifie dans le rapport. C'est exactement le mécanisme qui rendait le TMS ordinal (fiche 500) et les demandes invariantes (fiche 501, exercice 1.22).
>
> **La lecture économique de $\partial v/\partial p_i = -\lambda^* x_i$.** Une hausse de $1$ € du prix du bien $i$ coûte au consommateur exactement $x_i$ euros de pouvoir d'achat (il en achète $x_i$ unités), et chaque euro perdu vaut $\lambda^*$ unités d'utilité. La perte d'utilité est donc $\lambda^* x_i$. **Et l'on peut négliger le réajustement du panier** — c'est le théorème de l'enveloppe qui l'autorise, parce que le panier était déjà optimal.
>
> ⚠️ **Le signe moins et la condition $\partial v/\partial y \neq 0$.** Le signe moins vient de ce que $\partial v/\partial p_i \leq 0$ (propriété 4) alors que $x_i \geq 0$. La condition $\partial v/\partial y\neq0$ est là pour que le rapport ait un sens ; sous l'hypothèse 1.2 elle est automatiquement satisfaite puisque $\partial v/\partial y=\lambda^*>0$.

### 2.9 Exemple 1.2 — l'utilité indirecte de la CES

**Le point de départ.** De l'exemple 1.1 (fiche 501), avec $r\equiv\rho/(\rho-1)$ :

$$x_1(p,y)=\frac{p_1^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}}, \qquad x_2(p,y)=\frac{p_2^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}} \tag{E.1}$$

**La méthode.** *« Par (1.13), nous pouvons former la fonction d'utilité indirecte en substituant celles-ci dans la fonction d'utilité directe. »*

$$v(p,y) = \Big[\big(x_1(p,y)\big)^\rho + \big(x_2(p,y)\big)^\rho\Big]^{1/\rho} = \left[\left(\frac{p_1^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}}\right)^{\!\rho} + \left(\frac{p_2^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}}\right)^{\!\rho}\right]^{1/\rho} \tag{E.2}$$

$$= y\,\frac{\big(p_1^{\,r}+p_2^{\,r}\big)^{1/\rho}}{\big(p_1^{\,r}+p_2^{\,r}\big)} = \boxed{\;y\,\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r}\;}$$

<details class="details--riche">
<summary>

**Le détail du calcul (E.2), laissé implicite par le livre**

</summary>

En factorisant $y$ et $\big(p_1^r+p_2^r\big)^{-1}$ :

$$v = y\big(p_1^r+p_2^r\big)^{-1}\Big[\big(p_1^{\,r-1}\big)^\rho + \big(p_2^{\,r-1}\big)^\rho\Big]^{1/\rho}.$$

Or $r-1 = \dfrac{1}{\rho-1}$ (fiche 501, §5.5), donc $(r-1)\rho = \dfrac{\rho}{\rho-1}=r$. Le crochet vaut donc $\big(p_1^r+p_2^r\big)^{1/\rho}$, et

$$v = y\,\big(p_1^r+p_2^r\big)^{(1/\rho)-1}.$$

Enfin $\dfrac{1}{\rho}-1 = \dfrac{1-\rho}{\rho} = -\dfrac{\rho-1}{\rho} = -\dfrac{1}{r}$, puisque $r=\dfrac{\rho}{\rho-1}$ donne $\dfrac1r = \dfrac{\rho-1}{\rho}$. D'où

$$v(p,y) = y\big(p_1^r+p_2^r\big)^{-1/r}. \quad$$

**Les deux identités à retenir pour tout calcul CES :**

$$r-1=\frac{1}{\rho-1} \qquad\qquad \frac{1}{\rho}-1 = -\frac{1}{r}$$

</details>

**Les vérifications faites par le livre.** *« Nous devrions vérifier que (E.2) satisfait toutes les propriétés d'une fonction d'utilité indirecte détaillées dans le théorème 1.6. »*

**Homogénéité de degré zéro :**

$$v(tp,ty)=ty\big((tp_1)^r+(tp_2)^r\big)^{-1/r} = ty\,\big(t^r(p_1^r+p_2^r)\big)^{-1/r} = ty\cdot t^{-1}\big(p_1^r+p_2^r\big)^{-1/r} = v(p,y) \quad$$

**Croissante en $y$, décroissante en $p$ :**

$$\frac{\partial v(p,y)}{\partial y}=\big(p_1^r+p_2^r\big)^{-1/r} \ >\ 0 \tag{E.3}$$

$$\frac{\partial v(p,y)}{\partial p_i}=-\big(p_1^r+p_2^r\big)^{(-1/r)-1}\,y\,p_i^{\,r-1} \ <\ 0, \qquad i=1,2 \tag{E.4}$$

**Identité de Roy :**

$$(-1)\frac{\partial v/\partial p_i}{\partial v/\partial y} = -(-1)\frac{\big(p_1^r+p_2^r\big)^{(-1/r)-1}\,y\,p_i^{\,r-1}}{\big(p_1^r+p_2^r\big)^{-1/r}} = \frac{y\,p_i^{\,r-1}}{p_1^r+p_2^r} = x_i(p,y) \quad$$

*« Nous laissons en exercice la tâche de vérifier que (E.2) est une fonction quasiconvexe de $(p,y)$. »* — c'est l'**exercice 1.31**.

> **Le résultat à mémoriser.**
>
> $$\boxed{\;u=\big(x_1^\rho+x_2^\rho\big)^{1/\rho} \quad\Longrightarrow\quad v(p,y)=y\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r}, \qquad r=\frac{\rho}{\rho-1}\;}$$
>
> Notez la forme : $v$ est **linéaire en $y$**, et le facteur $\big(p_1^r+p_2^r\big)^{-1/r}$ ne dépend que des prix. Ce n'est pas un hasard : les préférences **homothétiques** ont toujours une utilité indirecte de la forme $v(p,y)=y\cdot g(p)$. *(La CES est homogène de degré 1, donc homothétique.)*

## 🔴 Concept 3 — La fonction de dépense et la demande hicksienne (§1.4.2)

### 3.1 La question inversée

> *« La fonction d'utilité indirecte est une manière élégante et puissante de résumer une grande partie du comportement de marché du consommateur. Une mesure **compagne**, appelée la **fonction de dépense**, est tout aussi utile. Pour construire la fonction d'utilité indirecte, nous avons **fixé les prix de marché et le revenu**, et cherché le niveau **maximal** d'utilité que le consommateur pouvait atteindre. Pour construire la fonction de dépense, nous fixons à nouveau les prix, mais posons une question d'un autre genre : **quel est le niveau minimal de dépense monétaire que le consommateur doit faire, face à un ensemble de prix donné, pour atteindre un niveau d'utilité donné ?** »*

> *« Dans cette construction, nous **ignorons toute limitation imposée par le revenu du consommateur** et demandons simplement ce que le consommateur devrait dépenser pour atteindre un niveau d'utilité particulier. »*

|  | Problème primal (§1.4.1) | Problème dual (§1.4.2) |
|---|---|---|
| Ce qui est **donné** | prix $p$ **et revenu $y$** | prix $p$ **et utilité $u$** |
| Ce qui est **cherché** | l'utilité maximale | la dépense minimale |
| La fonction de valeur | $v(p,y)$, valeur **maximale** | $e(p,u)$, valeur **minimale** |
| La solution | $x(p,y)$, demande **marshallienne** | $x^h(p,u)$, demande **hicksienne** |
| Observable ? | **oui** | **non** |

### 3.2 La construction géométrique (Fig. 1.15)

> *« Chacune des droites parallèles de la Fig. 1.15 représente tous les paniers $x$ qui requièrent le **même niveau de dépense totale** pour être acquis face aux prix $p=(p_1,p_2)$. »*

Chaque **courbe d'isodépense** est définie implicitement par $e = p_1x_1+p_2x_2$, pour un niveau de dépense $e>0$. Toutes ont la même pente $-p_1/p_2$, mais des intercepts différents $e/p_1$ et $e/p_2$.

> *« Les courbes d'isodépense **plus éloignées** contiennent des paniers coûtant **plus cher** ; celles plus proches donnent des paniers coûtant moins. »*

**Le raisonnement de la figure, pas à pas :**

| Courbe | Situation | Conclusion |
|---|---|---|
| $e^3$ | **aucun** point commun avec la courbe d'indifférence $u$ | $e^3$ euros sont **insuffisants** pour atteindre $u$ |
| $e^1$, $e^2$ | au moins un point commun avec $u$ | ces dépenses **suffisent** |
| $e^*$ | la **plus basse** courbe d'isodépense ayant encore un point commun avec $u$ | c'est le **minimum** cherché |

Le panier de moindre coût atteignant $u$ aux prix $p$ est $x^h = \big(x_1^h(p,u),\ x_2^h(p,u)\big)$, et

$$e(p,u) = p_1x_1^h(p,u)+p_2x_2^h(p,u) = e^*.$$

### 3.3 La définition formelle

$$\boxed{\;e(p,u) \equiv \min_{x\in\mathbb{R}^n_+} \ p\cdot x \quad\text{s.c.}\quad u(x) \geq u\;} \tag{1.14}$$

pour tout $p\gg0$ et tout niveau d'utilité **atteignable** $u$.

**Le domaine.** *« Pour référence future, soit $\mathcal{U}=\{u(x) \mid x\in\mathbb{R}^n_+\}$ l'ensemble des niveaux d'utilité atteignables. Ainsi, le domaine de $e(\cdot)$ est $\mathbb{R}^n_{++}\times\mathcal{U}$. »*

**Pourquoi $e(p,u)$ est bien définie — le raisonnement du livre :**

> *« Notez que $e(p,u)$ est bien définie parce que, pour $p\in\mathbb{R}^n_{++}$ et $x\in\mathbb{R}^n_+$, on a $p\cdot x \geq 0$. Donc l'ensemble de nombres $\{e \mid e=p\cdot x \text{ pour un } x \text{ avec } u(x)\geq u\}$ est **minoré par zéro**. De plus, parce que $p\gg0$, cet ensemble peut être montré **fermé**. Donc il contient un plus petit élément. La valeur $e(p,u)$ est précisément ce plus petit nombre. »*

**L'unicité.** *« Si $u(x)$ est continue et **strictement quasiconcave**, la solution sera **unique**, de sorte que nous pouvons noter la solution comme la fonction $x^h(p,u)\geq0$. »*

$$\boxed{\;e(p,u)=p\cdot x^h(p,u)\;} \tag{1.15}$$

> ⚠️ **La contrainte est $u(x) \geq u$, pas $u(x)=u$.** L'écriture avec $\geq$ rend l'ensemble de contrainte **convexe** quand $u$ est quasiconcave — c'est l'ensemble supérieur $\succsim(x)$ de la fiche 500. Avec $=$, on aurait une surface, pas un convexe. La preuve de la propriété 3 (§4.4 ci-dessous) montre que la contrainte est **saturée** à l'optimum, ce qui permet ensuite de travailler avec $=$ ; mais ce n'est pas la définition.

### 3.4 La demande hicksienne — l'expérience de pensée

Le livre construit l'intuition avec soin. Voici son raisonnement, condensé.

> *« Considérons l'expérience mentale suivante. Si nous **fixons le niveau d'utilité** que le consommateur est autorisé à atteindre à un niveau arbitraire $u$, comment ses achats de chaque bien se comporteront-ils quand nous changeons les prix auxquels il fait face ? Le genre de "fonctions de demande" que nous imaginons ici sont donc des fonctions **à utilité constante**. »*

**Le mécanisme de compensation :**

> *« Chaque fois que nous **baissons** un prix, et conférons ainsi un **gain** d'utilité au consommateur, nous compensons en **réduisant son revenu**, conférant une perte d'utilité correspondante suffisante pour le ramener au niveau d'utilité initial. De même, chaque fois que nous **augmentons** un prix, causant une perte d'utilité, nous compensons en **augmentant son revenu** suffisamment pour donner un gain d'utilité égal à la perte. »*

**D'où les deux noms :**

| Nom | Origine |
|---|---|
| demandes **compensées** | *« parce qu'elles reflètent l'effet net de ce processus par lequel on apparie tout changement d'utilité dû à un changement de prix par un changement compensatoire d'utilité venant d'un ajustement hypothétique du revenu »* |
| demandes **hicksiennes** | *« parce que **John Hicks (1939)** fut le premier à écrire sur elles de cette manière »* |

> *« La solution $x^h(p,u)$ du problème de minimisation de la dépense est précisément le vecteur des demandes hicksiennes du consommateur. »*

**La construction de la courbe hicksienne (Fig. 1.16), pas à pas.**

| Étape | Panneau (a) | Panneau (b) |
|---|---|---|
| 1 | Utilité fixée à $u$, prix $(p_1^0,p_2^0)$ : la droite de pente $-p_1^0/p_2^0$ tangente à la courbe $u$ donne $x_1^h(p_1^0,p_2^0,u)$ | on reporte $\big(x_1^h(p_1^0,p_2^0,u),\ p_1^0\big)$ |
| 2 | On baisse $p_1$ à $p_1^1<p_1^0$ **en maintenant le consommateur sur la même courbe $u$** par une réduction de revenu appropriée : nouvelle pente $-p_1^1/p_2^0$ | on reporte $\big(x_1^h(p_1^1,p_2^0,u),\ p_1^1\big)$ |
| 3 | On fait varier $p_1$ partout | on trace la **courbe de demande hicksienne** du bien 1, pour le niveau $u$ |

> *« Clairement, il y aura **différentes courbes de demande hicksiennes pour différents niveaux d'utilité** — pour différentes courbes d'indifférence. La forme et la position de chacune, cependant, seront toujours déterminées par les préférences sous-jacentes. »*

> ⚠️ **Trois différences à ne jamais confondre.**
>
> |  | Marshallienne $x(p,y)$ | Hicksienne $x^h(p,u)$ |
> |---|---|---|
> | Second argument | **revenu** $y$, observable | **utilité** $u$, non observable |
> | Ce qui est maintenu constant quand $p$ varie | le **revenu monétaire** | le **niveau d'utilité** |
> | Contenu de la réponse à une baisse de prix | effet de **substitution + effet de revenu** | effet de **substitution seul** |
>
> Cette dernière ligne est la clé du §1.5 (équation de Slutsky, fiche 503) : la demande hicksienne **isole** l'effet de substitution, parce que la compensation annule par construction l'effet de revenu.
>
> **Pourquoi les hicksiennes sont-elles « non observables » ?** Parce qu'on ne peut pas mesurer $u$. On observe un consommateur acheter $x$ à des prix $p$ avec un revenu $y$ ; on ne l'observe jamais « à utilité constante ». C'est un objet **théorique** — mais un objet dont les propriétés (théorème 1.7) contraignent le comportement observable, ce qui le rend testable indirectement. C'est tout le programme du §1.5 et du chapitre 2.

**Le lien avec la figure 1.16 vu depuis la dépense :**

> *« Chacune des "contraintes budgétaires" hypothétiques auxquelles le consommateur fait face dans la Fig. 1.16 implique un niveau de dépense **exactement égal au minimum nécessaire**, aux prix donnés, pour atteindre le niveau d'utilité en question. »*

## 🔴 Concept 4 — Théorème 1.7 : les sept propriétés de $e(p,u)$

### 4.1 L'énoncé

> **THEOREM 1.7 — Properties of the Expenditure Function.** If $u(\cdot)$ is **continuous** and **strictly increasing**, then $e(p,u)$ defined in (1.14) is
>
> 1. **Zero** when $u$ takes on the lowest level of utility in $\mathcal{U}$,
> 2. **Continuous** on its domain $\mathbb{R}^n_{++}\times\mathcal{U}$,
> 3. For all $p\gg0$, **strictly increasing and unbounded above** in $u$,
> 4. **Increasing** in $p$,
> 5. **Homogeneous of degree 1** in $p$,
> 6. **Concave** in $p$. If, in addition, $u(\cdot)$ is **strictly quasiconcave**, we have
> 7. **Shephard's lemma:** $e(p,u)$ is differentiable in $p$ at $(p^0,u^0)$ with $p^0\gg0$, and $$\frac{\partial e(p^0,u^0)}{\partial p_i} = x_i^h(p^0,u^0), \qquad i=1,\dots,n.$$

> ⚠️ **La propriété 7 est la seule à exiger la stricte quasiconcavité** — parce qu'elle a besoin de l'**unicité** de $x^h$. Sans unicité, $e$ pourrait avoir un point anguleux en $p$ et ne serait pas différentiable.
>
> **Le contraste avec $v$ à mémoriser :**
>
> |  | $v(p,y)$ | $e(p,u)$ |
> |---|---|---|
> | Homogénéité | degré **0** en $(p,y)$ | degré **1** en $p$ seul |
> | Courbure en $p$ | **quasiconvexe** en $(p,y)$ | **concave** en $p$ |
> | Dérivée en $p_i$ | $-\lambda^* x_i$ (Roy, avec un **rapport**) | $x_i^h$ (Shephard, **directement**) |
>
> Shephard est plus simple que Roy : **pas de rapport, pas de signe moins**. C'est une des raisons pour lesquelles on préfère souvent partir de $e$.

### 4.2 Propriété 1 — nulle au plus bas niveau d'utilité

> *« Le plus bas niveau de $\mathcal{U}$ est $u(0)$ parce que $u(\cdot)$ est strictement croissante sur $\mathbb{R}^n_+$. Par conséquent, $e(p,u(0))=0$ parce que $x=0$ atteint l'utilité $u(0)$ et requiert une dépense de $p\cdot 0 = 0$. »* $\blacksquare$

### 4.3 Propriété 2 — continuité

<div class="callout" data-kind="formel">

<span class="callout__lab">théorème A2.21</span>

*« La propriété 2, la continuité, découle une fois encore du (le théorème du maximum). »* $\blacksquare$

</div>

### 4.4 Propriété 3 — strictement croissante et non bornée en $u$

**Les hypothèses supplémentaires, annoncées comme telles.** *« Bien que la propriété 3 tienne sans hypothèses supplémentaires, nous nous contenterons de la démontrer sous les hypothèses additionnelles que $x^h(p,u)\gg0$ est différentiable pour tout $p\gg0$, $u>u(0)$, et que $u(\cdot)$ est différentiable avec $\partial u(x)/\partial x_i>0$ pour tout $i$ sur $\mathbb{R}^n_{++}$. »*

**Pas 1 — la contrainte est saturée.** C'est l'argument le plus fin de la démonstration ; le voici en entier.

> *« Parce que $u(\cdot)$ est continue et strictement croissante, et que $p\gg0$, la contrainte dans (1.14) doit être **active**. »*

Le raisonnement, développé :

| Pas | Affirmation | Justification |
|---|---|---|
| a | Supposons $u(x^1)>u$ (contrainte **non** saturée) | hypothèse à réfuter |
| b | Il existe $t\in(0,1)$ assez proche de 1 tel que $u(tx^1)>u$ | **continuité** de $u$ |
| c | $u\geq u(0)$ implique $u(x^1)>u(0)$, donc $x^1\neq0$ | $u$ strictement croissante |
| d | Donc $p\cdot x^1 > 0$, et $p\cdot(tx^1)<p\cdot x^1$ | $p\gg0$ et $t<1$ |
| e | On a trouvé un panier **strictement moins cher** satisfaisant encore la contrainte | b + d |

> *« Par conséquent, quand la contrainte n'est **pas** active, il existe un panier strictement moins cher qui satisfait aussi la contrainte. Donc, à l'optimum, la contrainte doit être active. »*

On peut donc écrire :

$$e(p,u)\equiv\min_{x\in\mathbb{R}^n_+} \ p\cdot x \quad\text{s.c.}\quad u(x)=u \tag{P.1}$$

> **Le parallèle avec la fiche 501.** C'est exactement le même mécanisme que la saturation du budget dans le problème primal, mais retourné : là, on **augmentait** le panier pour améliorer l'utilité ; ici on le **contracte** pour réduire la dépense. Dans les deux cas, la monotonicité stricte de $u$ (plus $p\gg0$ ici) interdit qu'il reste du mou.

**Pas 2 — le lagrangien.**

$$\mathcal{L}(x,\lambda)=p\cdot x - \lambda\big[u(x)-u\big] \tag{P.2}$$

Pour $p\gg0$ et $u>u(0)$, $x^*=x^h(p,u)\gg0$ résout (P.1). Par le théorème de Lagrange, il existe $\lambda^*$ tel que

$$\frac{\partial\mathcal{L}(x^*,\lambda^*)}{\partial x_i}=p_i - \lambda^*\frac{\partial u(x^*)}{\partial x_i}=0, \qquad i=1,\dots,n \tag{P.3}$$

*« Notez alors que, parce que $p_i$ **et** $\partial u(x^*)/\partial x_i$ sont positifs, $\lambda^*$ l'est aussi. »*

**Pas 3 — le théorème de l'enveloppe.**

$$\boxed{\;\frac{\partial e(p,u)}{\partial u}=\frac{\partial\mathcal{L}(x^*,\lambda^*)}{\partial u}=\lambda^* > 0\;}$$

*(Le calcul : $\mathcal{L}=p\cdot x - \lambda u(x)+\lambda u$ contient $u$ dans le seul terme $+\lambda u$.)*

> *« Parce que ceci tient pour tout $u>u(0)$, et parce que $e(\cdot)$ est continue, nous pouvons conclure que pour tout $p\gg0$, $e(p,u)$ est strictement croissante en $u$ sur $\mathcal{U}$ (qui inclut $u(0)$). »* $\blacksquare$

> **Le pendant de $\lambda^*=\partial v/\partial y$.** Ici $\lambda^* = \partial e/\partial u$ est le **coût marginal de l'utilité** — combien d'euros supplémentaires il faut pour gagner une unité d'utilité. Les deux multiplicateurs sont inverses l'un de l'autre au point où les deux problèmes coïncident : $\dfrac{\partial e}{\partial u}=\left(\dfrac{\partial v}{\partial y}\right)^{-1}$, ce qui découle directement du théorème 1.8 par dérivation.

**La non-bornitude.** *« Que $e$ soit non bornée en $u$ peut être montré comme découlant du fait que $u(x)$ est continue et strictement croissante. On vous demande de le faire dans l'**exercice 1.34**. »*

### 4.5 Propriétés 4 et 5 — reportées par le livre

> *« Parce que la propriété 4 découle de la propriété 7, nous la différons pour le moment. La propriété 5 sera laissée en exercice [**1.35**]. »*

**Propriété 4, une fois Shephard acquis :** $\dfrac{\partial e(p,u)}{\partial p_i}=x_i^h(p,u)\geq0$, donc $e$ est croissante en $p$.

<details class="details--riche">
<summary>

**Exercice 1.35 — l'homogénéité de degré 1 en $p$**

</summary>

**Énoncé.** Compléter la preuve du théorème 1.7 en prouvant la propriété 5.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Ce qu'il faut montrer :** $e(tp,u)=t\,e(p,u)$ pour tout $t>0$.

$$e(tp,u)=\min_{x} \ (tp)\cdot x \quad\text{s.c.}\quad u(x)\geq u.$$

Or $(tp)\cdot x = t\,(p\cdot x)$, et **l'ensemble de contrainte $\{x \mid u(x)\geq u\}$ ne dépend pas de $p$**. Minimiser $t\,(p\cdot x)$ sur cet ensemble avec $t>0$ revient donc à minimiser $p\cdot x$ sur le même ensemble — la constante multiplicative positive ne change pas l'**argmin**, seulement la valeur :

$$e(tp,u)=t\,\min_x\{p\cdot x \mid u(x)\geq u\}=t\,e(p,u). \qquad\blacksquare$$

**Corollaire immédiat, souvent demandé :** l'argmin est inchangé, donc

$$\boxed{\;x^h(tp,u)=x^h(p,u)\;}$$

**la demande hicksienne est homogène de degré ZÉRO en $p$.**

> ⚠️ **Comparez les trois homogénéités — c'est un piège d'examen classique.**
>
> | Fonction | Degré | En quoi ? |
> |---|---|---|
> | $v(p,y)$ | **0** | en $(p,y)$ **conjointement** |
> | $x(p,y)$ | **0** | en $(p,y)$ **conjointement** |
> | $e(p,u)$ | **1** | en $p$ **seul** ($u$ est fixé) |
> | $x^h(p,u)$ | **0** | en $p$ **seul** |
>
> La raison de la différence : dans le problème primal, $y$ est un **prix implicite** qu'il faut échelonner avec $p$ ; dans le problème dual, $u$ n'est pas monétaire et n'a pas à être échelonné.
>
> **Vérification sur la CES.** $e(p,u)=u\big(p_1^r+p_2^r\big)^{1/r}$, donc $e(tp,u)=u\big(t^r(p_1^r+p_2^r)\big)^{1/r}=t\,e(p,u)$ .

</details>

<details class="details--riche">
<summary>

**Exercice 1.34 — la dépense n'est pas bornée en $u$**

</summary>

**Énoncé.** Montrer que si $u(x)$ est continue et strictement croissante, alors pour tout $p\gg0$, $e(p,u)$ est **non bornée supérieurement** en $u$.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Ce qu'il faut montrer :** pour tout $M>0$, il existe $u\in\mathcal{U}$ tel que $e(p,u)>M$.

**Construction.** Fixons $M>0$ et $p\gg0$. Posons

$$k \equiv \frac{2M}{\sum_{i}p_i} \qquad\text{et}\qquad \bar x \equiv k\,e = (k,\dots,k).$$

Alors $p\cdot\bar x = k\sum_i p_i = 2M$.

Posons $\bar u \equiv u(\bar x)$, qui appartient bien à $\mathcal{U}$ par définition.

**Minorer $e(p,\bar u)$.** Soit $x$ un panier quelconque avec $u(x)\geq\bar u = u(\bar x)$. Deux cas : — si $x \geq \bar x$, alors $p\cdot x \geq p\cdot\bar x = 2M > M$ ; — sinon, il existe $i$ avec $x_i < \bar x_i$. On ne peut pas conclure directement — d'où l'argument suivant.

**L'argument correct, par l'absurde.** Supposons $e(p,u)\leq M$ pour **tout** $u\in\mathcal{U}$. Alors, pour chaque $u$, le panier optimal $x^h(p,u)$ vérifie $p\cdot x^h(p,u)\leq M$, donc — comme au pas « borné » de l'exercice 1.15 —

$$x_i^h(p,u) \leq \frac{M}{p_i} \qquad\text{pour tout } i.$$

Tous les paniers $x^h(p,u)$, $u\in\mathcal{U}$, appartiennent donc au **compact** $K = \prod_i [0,\,M/p_i]$.

Comme $u$ est continue et $K$ compact, $u$ atteint sur $K$ un maximum $u_{\max}$ (Weierstrass). Or, par définition, $u\big(x^h(p,u)\big)\geq u$ pour tout $u\in\mathcal{U}$, donc

$$u \ \leq\ u_{\max} \qquad\text{pour tout } u\in\mathcal{U}.$$

$\mathcal{U}$ serait donc **majoré**. Mais $u$ est **strictement croissante** sur $\mathbb{R}^n_+$, qui est non borné : la suite $u(k\,e)$, $k=1,2,3,\dots$ est **strictement croissante**, et le livre a déjà noté (preuve du thm 1.8) que $u(\cdot)$ *« n'atteint pas de maximum »*. Il existe donc des éléments de $\mathcal{U}$ dépassant $u_{\max}$ — contradiction. $\blacksquare$

> **L'idée en une phrase.** Si la dépense était plafonnée, les paniers accessibles le seraient aussi, donc l'utilité atteignable le serait — ce qui contredit la stricte croissance de $u$ sur un domaine non borné.
>
> **Pourquoi cette propriété compte.** Elle garantit que $e(p,\cdot)$ est une bijection de $\mathcal{U}$ sur $[0,+\infty)$, donc **inversible** — ce qui est exactement ce dont on a besoin pour écrire $v(p,y)=e^{-1}(p:y)$ au §1.4.3.

</details>

### 4.6 Propriété 6 — concavité en $p$

**Ce qu'il faut établir.** Soient $p^1,p^2$ deux vecteurs de prix positifs, $t\in[0,1]$, et $p^t=tp^1+(1-t)p^2$. La fonction $e$ est concave en $p$ si

$$t\,e(p^1,u)+(1-t)\,e(p^2,u) \ \leq\ e(p^t,u) \tag{P.4}$$

**La preuve, remarquablement simple.** *« Pour voir que c'est bien le cas, concentrez-vous simplement sur **ce que signifie minimiser la dépense** à des prix donnés. »*

Soient : — $x^1$ le panier minimisant la dépense pour atteindre $u$ aux prix $p^1$ ; — $x^2$ celui aux prix $p^2$ ; — $x^*$ celui aux prix $p^t$.

Par définition de la minimisation, pour **tout** $x$ atteignant $u$ :

$$p^1\cdot x^1 \leq p^1\cdot x \qquad\qquad p^2\cdot x^2 \leq p^2\cdot x.$$

Or $x^*$ atteint $u$ lui aussi. Donc en particulier :

$$p^1\cdot x^1 \leq p^1\cdot x^* \qquad\qquad p^2\cdot x^2 \leq p^2\cdot x^*.$$

> *« Mais maintenant nous sommes tirés d'affaire. »* Comme $t\geq0$ et $(1-t)\geq0$, on multiplie la première par $t$, la seconde par $(1-t)$, et on **additionne** :

$$t\,p^1\cdot x^1 + (1-t)\,p^2\cdot x^2 \ \leq\ \big(tp^1+(1-t)p^2\big)\cdot x^* = p^t\cdot x^*.$$

Le membre de gauche est $t\,e(p^1,u)+(1-t)\,e(p^2,u)$ ; celui de droite est $e(p^t,u)$. C'est (P.4). $\blacksquare$

> ⚠️ **Une coquille du livre.** À la fin de cette preuve, le texte imprimé conclut *« in short, this is just the same as (P.5) »* alors que l'inégalité à établir portait le numéro **(P.4)** — il n'y a pas de (P.5) dans cette démonstration. Ce n'est pas une erreur de lecture de votre part.
>
> **L'intuition économique de la concavité — à savoir formuler.** Si les prix changent et que le consommateur **ne réajustait pas** son panier, sa dépense varierait **linéairement**. Mais il réajuste : il substitue vers les biens devenus relativement moins chers. Ce réajustement ne peut que **réduire** la dépense par rapport à la ligne droite. La fonction de dépense se situe donc **au-dessus** de la corde et **en dessous** de ses tangentes : elle est **concave**.
>
> **Le corollaire opérationnel.** La concavité de $e$ en $p$ implique que la matrice des dérivées secondes $\partial^2 e/\partial p_i\partial p_j$ est **semi-définie négative**. Or, par Shephard, cette matrice est $\partial x_i^h/\partial p_j$ — la **matrice de substitution**. C'est de là que viennent les théorèmes 1.12 à 1.15 du §1.5 (fiche 503) : termes de substitution propres négatifs, symétrie, semi-définie négativité. **Toute la théorie des restrictions sur la demande découle de cette seule propriété de concavité.**

### 4.7 Propriété 7 — le lemme de Shephard

**La preuve.** *« Pour prouver la propriété 7, nous faisons de nouveau appel au théorème de l'enveloppe, mais dérivons maintenant par rapport à $p_i$ : »*

$$\boxed{\;\frac{\partial e(p,u)}{\partial p_i}=\frac{\partial\mathcal{L}(x^*,\lambda^*)}{\partial p_i}=x_i^* \equiv x_i^h(p,u)\;}$$

*(Le calcul : $\mathcal{L}=p\cdot x - \lambda[u(x)-u]$ contient $p_i$ dans le seul terme $p_ix_i$.)*

> *« Parce que $x^h(p,u)\geq0$, cela prouve aussi la propriété 4. (Voir l'**exercice 1.37** pour une preuve de 7 qui ne requiert aucune hypothèse supplémentaire. Essayez aussi de prouver la propriété 4 sans hypothèses supplémentaires.) »*

> **La beauté du lemme de Shephard.** Il dit que **dériver la fonction de dépense par rapport à un prix redonne directement la quantité demandée**. Pas de rapport, pas de signe. À comparer avec l'identité de Roy, qui exige un quotient et un changement de signe.
>
> **L'intuition, sans calcul.** Si $p_i$ augmente de $1$ €, la dépense augmente d'environ $x_i^h$ euros — parce que le consommateur achète $x_i^h$ unités du bien $i$. Le réajustement du panier est du **second ordre** : c'est exactement ce que le théorème de l'enveloppe formalise.
>
> ⚠️ **Le lemme s'applique à $e$, pas à $v$.** L'analogue pour $v$ n'est pas $\partial v/\partial p_i = -x_i$ mais $\partial v/\partial p_i = -\lambda^* x_i$ (§2.8). C'est le facteur $\lambda^*$ qui oblige à passer par un rapport dans Roy — et c'est parce que $e$ est mesurée en **euros** (comme $p_i x_i$), alors que $v$ est mesurée en **utils**.

<details class="details--riche">
<summary>

**Exercice 1.37 — Shephard sans hypothèse de différentiabilité (indication du livre)**

</summary>

**Énoncé.** Fournir une preuve alternative du lemme de Shephard en complétant les étapes suivantes : (a) En utilisant la définition de $e$, montrer que si $p^0\gg0$ et $x^0=x^h(p^0,u^0)$, alors $e(p,u^0)\leq p\cdot x^0$ pour tout $p\gg0$, **avec égalité quand $p=p^0$**. (b) En conclure que $f(p)\equiv e(p,u)-p\cdot x^0$ est **maximisée** sur $\mathbb{R}^n_{++}$ en $p=p^0$. (c) En supposant $f$ différentiable en $p^0$, quelle valeur son gradient doit-il avoir en $p^0$ ? (d) En supposant $e(p,u)$ différentiable en $p$, prouver le lemme de Shephard à partir de (a)-(c).

**L'indication du livre EST l'énoncé lui-même** (c'est la structure de la preuve). Développement pédagogique.

**(a)** Par définition, $e(p,u^0)=\min\{p\cdot x \mid u(x)\geq u^0\}$. Or $x^0=x^h(p^0,u^0)$ atteint $u^0$, donc $x^0$ est **réalisable** pour ce problème quels que soient les prix $p$. Le minimum ne peut donc dépasser la valeur en $x^0$ :

$$e(p,u^0)\ \leq\ p\cdot x^0 \qquad \forall\,p\gg0.$$

Pour $p=p^0$, $x^0$ est **la** solution, donc $e(p^0,u^0)=p^0\cdot x^0$ : **égalité**.

**(b)** Posons $f(p)\equiv e(p,u^0)-p\cdot x^0$. Par (a), $f(p)\leq0$ pour tout $p$, et $f(p^0)=0$. Donc $f$ atteint son **maximum** (la valeur 0) en $p=p^0$.

**(c)** $p^0$ est un maximum **intérieur** de $f$ sur l'ouvert $\mathbb{R}^n_{++}$. Si $f$ y est différentiable, la condition nécessaire du premier ordre donne

$$\nabla f(p^0)=0.$$

**(d)** Or $\nabla f(p) = \nabla_p e(p,u^0) - x^0$. En $p=p^0$ :

$$\nabla_p e(p^0,u^0) = x^0 = x^h(p^0,u^0),$$

c'est-à-dire, coordonnée par coordonnée, $\dfrac{\partial e(p^0,u^0)}{\partial p_i}=x_i^h(p^0,u^0)$. $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi cette preuve est meilleure que celle du texte.</span>

Elle n'utilise **ni lagrangien, ni multiplicateur, ni hypothèse de différentiabilité de $x^h$** — seulement la définition de $e$ comme minimum et une condition du premier ordre sur $f$. C'est le schéma dit de « **l'enveloppe par le bas** », et il se généralise à toutes les fonctions de valeur.

**La structure (a)-(b) mérite un nom.** L'inégalité $e(p,u^0)\leq p\cdot x^0$ avec égalité en $p^0$ dit que la fonction linéaire $p\mapsto p\cdot x^0$ est une **majorante tangente** de $e(\cdot,u^0)$ en $p^0$. Une fonction admettant en chaque point une majorante linéaire tangente est **concave** — c'est une seconde démonstration de la propriété 6, et elle explique pourquoi propriétés 6 et 7 sont si intimement liées.

⚠️ **L'exercice 1.36 fait exactement la même chose pour l'identité de Roy**, avec $f(p)\equiv v(p,\,p\cdot x^0)$ **minimisée** en $p^0$. Comparez les deux : Shephard maximise, Roy minimise — reflet du fait que $e$ est concave et $v$ quasiconvexe.

</div>

</details>

### 4.8 Exemple 1.3 — la fonction de dépense de la CES

**Le problème.** *« Parce que les préférences sont monotones, nous pouvons formuler le problème de minimisation de la dépense »*

$$\min_{x_1,x_2} \ p_1x_1+p_2x_2 \quad\text{s.c.}\quad \big(x_1^\rho+x_2^\rho\big)^{1/\rho}-u=0, \quad x_1\geq0,\ x_2\geq0$$

$$\mathcal{L}(x_1,x_2,\lambda)=p_1x_1+p_2x_2-\lambda\Big[\big(x_1^\rho+x_2^\rho\big)^{1/\rho}-u\Big] \tag{E.1}$$

**Les conditions du premier ordre** (solution intérieure supposée) :

$$\frac{\partial\mathcal{L}}{\partial x_1}=p_1-\lambda\big(x_1^\rho+x_2^\rho\big)^{(1/\rho)-1}x_1^{\rho-1}=0 \tag{E.2}$$

$$\frac{\partial\mathcal{L}}{\partial x_2}=p_2-\lambda\big(x_1^\rho+x_2^\rho\big)^{(1/\rho)-1}x_2^{\rho-1}=0 \tag{E.3}$$

$$\frac{\partial\mathcal{L}}{\partial\lambda}=\big(x_1^\rho+x_2^\rho\big)^{1/\rho}-u=0 \tag{E.4}$$

**L'élimination de $\lambda$** donne exactement la même relation qu'à l'exemple 1.1 :

$$\frac{x_1}{x_2}=\left(\frac{p_1}{p_2}\right)^{1/(\rho-1)} \tag{E.5}$$

$$u=\big(x_1^\rho+x_2^\rho\big)^{1/\rho} \tag{E.6}$$

> ⚠️ **(E.5) est identique à (E.5) de l'exemple 1.1.** Ce n'est pas une coïncidence : la condition de tangence $\text{TMS}_{12}=p_1/p_2$ est la **même** dans les deux problèmes. Seule la **seconde** équation diffère : contrainte budgétaire $p\cdot x=y$ pour Marshall, contrainte d'utilité $u(x)=u$ pour Hicks. C'est la formulation la plus économique de la dualité : **même tangence, contrainte différente**.

**La résolution.** En substituant (E.5) dans (E.6) :

$$u = \left[x_2^\rho\left(\frac{p_1}{p_2}\right)^{\rho/(\rho-1)}+x_2^\rho\right]^{1/\rho} = x_2\left[\left(\frac{p_1}{p_2}\right)^{\rho/(\rho-1)}+1\right]^{1/\rho}$$

En résolvant pour $x_2$ et avec $r\equiv\rho/(\rho-1)$ :

$$x_2 = u\left[\left(\frac{p_1}{p_2}\right)^{r}+1\right]^{-1/\rho} = u\,\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/\rho}\,p_2^{\,1/(\rho-1)} = u\,\big(p_1^{\,r}+p_2^{\,r}\big)^{(1/r)-1}p_2^{\,r-1} \tag{E.7}$$

et par (E.5) :

$$x_1 = u\,\big(p_1^{\,r}+p_2^{\,r}\big)^{(1/r)-1}p_1^{\,r-1} \tag{E.8}$$

**Les demandes hicksiennes :**

$$\boxed{\;x_i^h(p,u)=u\,\big(p_1^{\,r}+p_2^{\,r}\big)^{(1/r)-1}\,p_i^{\,r-1}, \qquad i=1,2\;} \tag{E.9-E.10}$$

**La fonction de dépense**, par (1.15) :

$$e(p,u)=p_1x_1^h+p_2x_2^h = u\,\big(p_1^{\,r}+p_2^{\,r}\big)^{(1/r)-1}\Big[p_1\cdot p_1^{\,r-1}+p_2\cdot p_2^{\,r-1}\Big]$$

$$= u\,\big(p_1^{\,r}+p_2^{\,r}\big)^{(1/r)-1}\big(p_1^{\,r}+p_2^{\,r}\big)$$

$$\boxed{\;e(p,u)=u\,\big(p_1^{\,r}+p_2^{\,r}\big)^{1/r}\;} \tag{E.11}$$

*« Nous laissons en exercice la tâche de vérifier qu'elle possède les propriétés usuelles. »*

<details class="details--riche">
<summary>

**Vérifier (E.11) contre les sept propriétés du théorème 1.7**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre laisse cette vérification au lecteur.</span>

</div>

Posons $P \equiv \big(p_1^{\,r}+p_2^{\,r}\big)^{1/r}$, de sorte que $e(p,u)=u\,P$. *(La quantité $P$ est un **indice de prix** ; on la retrouvera au chapitre 3 sous le nom de fonction de coût unitaire.)*

| Propriété | Vérification |
|---|---|
| **1.** nulle au plus bas $u$ | Le plus bas niveau est $u(0)=0$, et $e(p,0)=0\cdot P=0$ |
| **2.** continue | Produit et somme de fonctions continues sur $\mathbb{R}^2_{++}\times\mathcal{U}$ |
| **3.** str. croissante et non bornée en $u$ | $\partial e/\partial u = P>0$ ; $e\to\infty$ quand $u\to\infty$ |
| **4.** croissante en $p$ | $\partial e/\partial p_i = u\,P^{1-r}p_i^{\,r-1}>0$ |
| **5.** homogène de degré 1 en $p$ | $e(tp,u)=u\big(t^r(p_1^r+p_2^r)\big)^{1/r}=t\,e(p,u)$ |
| **6.** concave en $p$ | $P$ est une **norme $\ell^r$** ; pour $r\leq1$ elle est concave sur l'orthant positif |
| **7.** Shephard | $\partial e/\partial p_i = u\,P^{1-r}\,p_i^{\,r-1} = u\big(p_1^r+p_2^r\big)^{(1/r)-1}p_i^{\,r-1}=x_i^h(p,u)$ |

**Le détail du calcul de la propriété 7** — c'est le contrôle le plus instructif :

$$\frac{\partial e}{\partial p_i}=u\cdot\frac{1}{r}\big(p_1^r+p_2^r\big)^{(1/r)-1}\cdot r\,p_i^{\,r-1}=u\,\big(p_1^r+p_2^r\big)^{(1/r)-1}p_i^{\,r-1}.$$

Les deux $r$ se simplifient — exactement comme les deux $\rho$ se simplifiaient dans le calcul de $\partial u/\partial x_1$ à l'exemple 1.1. C'est la même structure algébrique, une fois de plus.

**Le résultat coïncide avec (E.9)-(E.10)** — ce qui **confirme le lemme de Shephard** sur un cas concret.

> ⚠️ **Sur la propriété 6.** Le signe de $r$ dépend de $\rho$ : si $0<\rho<1$ alors $r<0$ ; si $\rho<0$ alors $0<r<1$. Dans les deux cas $r<1$, ce qui est bien la condition sous laquelle $\big(p_1^r+p_2^r\big)^{1/r}$ est concave sur $\mathbb{R}^2_{++}$. Le domaine $\rho<1$ de l'exemple 1.1 n'est donc pas arbitraire : il est **exactement** ce qu'il faut pour que la fonction de dépense soit concave, comme le théorème 1.7 l'exige.

</details>

## 🔴 Concept 5 — Les relations entre les deux (§1.4.3)

### 5.1 Les deux inégalités de départ

Le livre commence par établir deux inégalités par simple raisonnement sur les définitions.

**Première inégalité.** Fixons $(p,y)$ et posons $u=v(p,y)$.

> *« Par définition de $v$, cela dit qu'aux prix $p$, le niveau d'utilité $u$ est le **maximum** qui puisse être atteint quand le revenu du consommateur est $y$. Par conséquent, aux prix $p$, si le consommateur souhaitait atteindre un niveau d'utilité **au moins** $u$, alors le revenu $y$ serait certainement assez grand pour y parvenir. Mais rappelons maintenant que $e(p,u)$ est la **plus petite** dépense nécessaire pour atteindre au moins $u$. Donc nous devons avoir $e(p,u)\leq y$. »*

$$e\big(p,\,v(p,y)\big) \ \leq\ y \qquad \forall\,(p,y)\gg0 \tag{1.16}$$

**Seconde inégalité.** Fixons $(p,u)$ et posons $y=e(p,u)$.

> *« Par définition de $e$, cela dit qu'aux prix $p$, le revenu $y$ est le plus petit revenu permettant au consommateur d'atteindre au moins le niveau d'utilité $u$. Par conséquent, aux prix $p$, si le revenu du consommateur était en fait $y$, alors il pourrait atteindre au moins le niveau $u$. Parce que $v(p,y)$ est le plus grand niveau d'utilité atteignable aux prix $p$ avec le revenu $y$, cela implique $v(p,y)\geq u$. »*

$$v\big(p,\,e(p,u)\big) \ \geq\ u \qquad \forall\,(p,u)\in\mathbb{R}^n_{++}\times\mathcal{U} \tag{1.17}$$

> **Le schéma de raisonnement, qui vaut d'être isolé.** Chaque inégalité s'obtient en observant qu'**un candidat admissible pour un problème est fourni par la solution de l'autre**. C'est le mécanisme général de la dualité : le primal borne le dual et réciproquement. Le théorème 1.8 dit que, sous nos hypothèses, il n'y a **pas d'écart de dualité**.

### 5.2 Théorème 1.8 — les inégalités sont des égalités

> **THEOREM 1.8 — Relations Between Indirect Utility and Expenditure Functions.** Let $v(p,y)$ and $e(p,u)$ be the indirect utility and expenditure functions for a consumer whose utility function is **continuous** and **strictly increasing**. Then for all $p\gg0$, $y\geq0$, and $u\in\mathcal{U}$:
>
> 1. $e\big(p,\,v(p,y)\big) = y$
> 2. $v\big(p,\,e(p,u)\big) = u$

**La mise en place de la preuve.**

> *« Parce que $u(\cdot)$ est strictement croissante sur $\mathbb{R}^n_+$, elle atteint un **minimum** en $x=0$, mais **n'atteint pas de maximum**. De plus, parce que $u(\cdot)$ est continue, l'ensemble $\mathcal{U}$ des nombres d'utilité atteignables doit être un **intervalle**. Par conséquent, $\mathcal{U}=[u(0),\ \bar u)$ pour un $\bar u > u(0)$, où $\bar u$ peut être fini ou $+\infty$. »*

**Preuve du point 1.** Fixons $(p,y)\in\mathbb{R}^n_{++}\times\mathbb{R}_+$. Par (1.16), $e(p,v(p,y))\leq y$. Supposons par l'absurde l'inégalité **stricte** : $e(p,u)<y$, où $u=v(p,y)$.

| Pas | Affirmation | Justification |
|---|---|---|
| a | $u\in\mathcal{U}$, donc $u<\bar u$ | définition de $v$ |
| b | on peut choisir $\varepsilon>0$ assez petit pour que $u+\varepsilon<\bar u$ **et** $e(p,u+\varepsilon)<y$ | **continuité de $e$** (thm 1.7, propriété 2) |
| c | en posant $y_\varepsilon = e(p,u+\varepsilon)$, on a $v(p,y_\varepsilon)\geq u+\varepsilon$ | l'inégalité (1.17) |
| d | comme $y_\varepsilon<y$ et que $v$ est **strictement croissante en revenu** (thm 1.6, propriété 3) : $v(p,y)>v(p,y_\varepsilon)\geq u+\varepsilon$ | monotonie stricte de $v$ |
| e | mais $u=v(p,y)$, donc $u\geq u+\varepsilon$ — **contradiction** |  |

Donc $e(p,v(p,y))=y$. $\blacksquare$

**Preuve du point 2.** Fixons $(p,u)$. Par (1.17), $v(p,e(p,u))\geq u$. Supposons l'inégalité stricte.

> *« Il y a deux cas à considérer : $u=u(0)$ et $u>u(0)$. **Nous ne considérerons que le second, laissant le premier en exercice.** »*

Posons $y=e(p,u)$, de sorte que $v(p,y)>u$.

| Pas | Affirmation | Justification |
|---|---|---|
| a | $e(p,u(0))=0$ et $e$ est **strictement croissante en $u$**, donc $y=e(p,u)>0$ | thm 1.7, propriétés 1 et 3 |
| b | $v$ étant **continue** (thm 1.6), on peut choisir $\varepsilon>0$ assez petit pour que $y-\varepsilon>0$ et $v(p,y-\varepsilon)>u$ | continuité de $v$ |
| c | le revenu $y-\varepsilon$ suffit donc, aux prix $p$, pour dépasser $u$ ; donc $e(p,u)\leq y-\varepsilon$ | définition de $e$ comme **minimum** |
| d | mais $y=e(p,u)$ — **contradiction** |  |

$\blacksquare$

> **Le schéma commun aux deux preuves — à savoir reproduire.** Les deux sont **par l'absurde**, et les deux exploitent la **continuité** de la fonction opposée pour construire un $\varepsilon$ qui produit la contradiction. Notez la symétrie exacte :
>
> |  | Point 1 | Point 2 |
> |---|---|---|
> | Continuité utilisée | celle de **$e$** | celle de **$v$** |
> | Monotonie stricte utilisée | celle de **$v$** en $y$ | celle de **$e$** en $u$ |
>
> Chaque preuve utilise les **deux** théorèmes 1.6 et 1.7 — ce qui explique leur ordre de présentation dans le livre.

### 5.3 La conséquence pratique : ne résoudre qu'un seul problème

> *« Jusqu'à présent, si nous voulions dériver les fonctions d'utilité indirecte et de dépense d'un consommateur, nous aurions dû résoudre **deux problèmes d'optimisation sous contrainte distincts** : l'un un problème de maximisation, l'autre un problème de minimisation. Ce théorème, cependant, indique une **manière facile de dériver l'une à partir de l'autre**, ne nous demandant de résoudre **qu'un seul** problème d'optimisation, et nous laissant le choix de celui que nous préférons résoudre. »*

**Sens 1 — de $v$ vers $e$.** $v$ est **strictement croissante** en son argument de revenu ; à prix constants, vue comme fonction du seul revenu, elle est donc **inversible**. En notant $v^{-1}(p:\cdot)$ cette inverse et en l'appliquant aux deux membres de $v(p,e(p,u))=u$ :

$$\boxed{\;e(p,u)=v^{-1}(p:u)\;} \tag{1.18}$$

**Sens 2 — de $e$ vers $v$.** $e$ est **strictement croissante** en $u$, donc inversible en son argument d'utilité. En notant $e^{-1}(p:\cdot)$ cette inverse et en l'appliquant à $e(p,v(p,y))=y$ :

$$\boxed{\;v(p,y)=e^{-1}(p:y)\;} \tag{1.19}$$

> *« Les équations (1.18) et (1.19) illustrent à nouveau la relation étroite entre maximisation de l'utilité et minimisation de la dépense. Les deux sont conceptuellement **les deux faces opposées d'une même pièce**. Mathématiquement, la fonction d'utilité indirecte et la fonction de dépense sont simplement les **inverses convenablement choisies** l'une de l'autre. »*

> ⚠️ **L'inversion porte sur la DERNIÈRE variable seulement, à $p$ fixé.** La notation $v^{-1}(p:u)$ du livre — avec un deux-points — souligne que $p$ est un **paramètre** et non une variable à inverser. On n'inverse jamais $v$ « comme fonction de $(p,y)$ » : ce serait une application de $\mathbb{R}^{n+1}$ dans $\mathbb{R}$, non inversible.
>
> **Ce qui rend l'inversion légitime, et qu'il faut citer :** — pour (1.18) : $v$ est **strictement croissante en $y$** (thm 1.6, prop. 3) ; — pour (1.19) : $e$ est **strictement croissante et non bornée en $u$** (thm 1.7, prop. 3) — la non-bornitude (exercice 1.34) garantit que l'image couvre tous les revenus possibles.

### 5.4 Exemple 1.4 — l'inversion sur la CES, dans les deux sens

**Sens 1 — de $v$ vers $e$.** De l'exemple 1.2 :

$$v(p,y)=y\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r} \tag{E.1}$$

Pour un revenu égal à $e(p,u)$ :

$$v\big(p,e(p,u)\big)=e(p,u)\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r} \tag{E.2}$$

Par le théorème 1.8 point 2, $v(p,e(p,u))=u$ (E.3). En combinant :

$$e(p,u)\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r}=u \tag{E.4}$$

$$\Longrightarrow\qquad e(p,u)=u\big(p_1^{\,r}+p_2^{\,r}\big)^{1/r} \tag{E.5}$$

> *« Un rapide coup d'œil à l'exemple 1.3 confirme que c'est **la même expression** pour la fonction de dépense que celle obtenue en résolvant directement le problème de minimisation. »*

**Sens 2 — de $e$ vers $v$.** De l'exemple 1.3 :

$$e(p,u)=u\big(p_1^{\,r}+p_2^{\,r}\big)^{1/r} \tag{E.6}$$

Pour un niveau d'utilité $v(p,y)$ :

$$e\big(p,v(p,y)\big)=v(p,y)\big(p_1^{\,r}+p_2^{\,r}\big)^{1/r} \tag{E.7}$$

Par le théorème 1.8 point 1, $e(p,v(p,y))=y$ (E.8). En combinant :

$$v(p,y)\big(p_1^{\,r}+p_2^{\,r}\big)^{1/r}=y \tag{E.9}$$

$$\Longrightarrow\qquad v(p,y)=y\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r} \tag{E.10}$$

> *« Un coup d'œil à l'exemple 1.2 confirme que (E.10) est ce que nous avions obtenu en résolvant directement le problème de maximisation. »*

> **La leçon opérationnelle, en une ligne.** Sur la CES, l'inversion consiste à **échanger $y \leftrightarrow u$ et à retourner l'exposant $-1/r \leftrightarrow +1/r$**. Sur un examen, résoudre le problème le plus simple des deux puis inverser fait gagner la moitié du temps.
>
> ⚠️ **Attention à ne pas confondre les deux inversions.** Pour obtenir $e$ à partir de $v$, on part de l'identité **numéro 2** ($v\circ e = u$) ; pour obtenir $v$ à partir de $e$, on part de l'identité **numéro 1** ($e\circ v = y$). Prendre la mauvaise mène à une tautologie.

### 5.5 Théorème 1.9 — la dualité des demandes

> *« Nous pouvons pousser cette relation un peu plus loin en portant notre attention sur les **solutions** respectives de ces deux problèmes. Les solutions du problème de maximisation de l'utilité sont les demandes **marshalliennes**. Les solutions du problème de minimisation de la dépense sont les demandes **hicksiennes**. Vu la relation étroite entre les deux problèmes d'optimisation eux-mêmes, il est naturel de soupçonner qu'il existe une relation tout aussi étroite entre leurs solutions. »*

> **THEOREM 1.9 — Duality Between Marshallian and Hicksian Demand Functions.** Under Assumption 1.2, for $p\gg0$, $y\geq0$, $u\in\mathcal{U}$, and $i=1,\dots,n$:
>
> 1. $x_i(p,y) = x_i^h\big(p,\,v(p,y)\big)$
> 2. $x_i^h(p,u) = x_i\big(p,\,e(p,u)\big)$

**Les deux énoncés en mots, tels que le livre les donne :**

> *« La première relation dit que **la demande marshallienne aux prix $p$ et au revenu $y$ est égale à la demande hicksienne aux prix $p$ et au niveau d'utilité qui est le maximum atteignable à ces prix et ce revenu**. La seconde dit que **la demande hicksienne à des prix $p$ et un niveau d'utilité $u$ quelconques est la même que la demande marshallienne à ces prix et à un revenu égal à la dépense minimale nécessaire à ces prix pour atteindre ce niveau d'utilité**. »*

> *« Grossièrement, le théorème 1.9 dit que les solutions de (1.12) sont aussi des solutions de (1.14), et réciproquement. Plus précisément, si $x^*$ résout (1.12) en $(p,y)$, le théorème dit que $x^*$ résout (1.14) en $(p,u)$, où $u=u(x^*)$. Réciproquement, si $x^*$ résout (1.14) en $(p,u)$, alors $x^*$ résout (1.12) en $(p,y)$, où $y=p\cdot x^*$. »*

> *« La Fig. 1.17 illustre le théorème. Là, il est clair que $x^*$ peut être vu **soit** comme la solution de (1.12), **soit** comme la solution de (1.14). C'est en ce sens que $x^*$ a une **nature duale**. »*

**La preuve du point 1** *(le livre laisse le point 2 en exercice)*.

**Mise en place.** *« Notez que par l'hypothèse 1.2, $u(\cdot)$ est continue et strictement quasiconcave, de sorte que les solutions de (1.12) et (1.14) existent et sont uniques. Par conséquent, les fonctions de demande marshallienne et hicksienne sont bien définies. »*

Posons $x^0 = x(p^0,y^0)$ et $u^0=u(x^0)$.

| Pas | Affirmation | Justification |
|---|---|---|
| a | $v(p^0,y^0)=u^0$ | définition de $v$ (identité 1.13) |
| b | $p^0\cdot x^0 = y^0$ | $u(\cdot)$ **strictement croissante** ⇒ budget saturé |
| c | $e\big(p^0,v(p^0,y^0)\big)=y^0$, c'est-à-dire $e(p^0,u^0)=y^0$ | **théorème 1.8**, point 1 |
| d | $x^0$ atteint $u^0$ (pas a) et coûte exactement $y^0=e(p^0,u^0)$ (pas b + c) |  |
| e | donc $x^0$ **résout** (1.14) en $(p^0,u^0)$ | il atteint la contrainte au **coût minimal** |
| f | donc $x^0=x^h(p^0,u^0)$, c'est-à-dire $x(p^0,y^0)=x^h\big(p^0,v(p^0,y^0)\big)$ | unicité de la solution |

$\blacksquare$

> **Le cœur de la preuve est le pas (e), et il tient en une phrase.** $x^0$ atteint l'utilité $u^0$ ; sa dépense vaut $y^0$ ; et $y^0$ est **précisément** le minimum requis pour atteindre $u^0$ (par le théorème 1.8). Un panier qui atteint la cible au coût minimal **est** la solution du problème de minimisation. Il n'y a rien de plus.
>
> ⚠️ **L'hypothèse 1.2 est ici indispensable, contrairement aux théorèmes 1.6 à 1.8.** Il faut la **stricte quasiconcavité** pour que $x$ et $x^h$ soient des **fonctions** — sinon les identités porteraient sur des correspondances et « $x_i(p,y)=x_i^h(\cdot)$ » n'aurait pas de sens. C'est pourquoi le théorème 1.9 est le seul du §1.4 à invoquer l'hypothèse 1.2 en entier.

### 5.6 Exemple 1.5 — vérification de la dualité sur la CES

**Point 1 — de la hicksienne vers la marshallienne.** De l'exemple 1.3 et de l'exemple 1.2 :

$$x_i^h(p,u)=u\big(p_1^r+p_2^r\big)^{(1/r)-1}p_i^{\,r-1} \qquad v(p,y)=y\big(p_1^r+p_2^r\big)^{-1/r}$$

En substituant $v(p,y)$ à la place de $u$ :

$$x_i^h\big(p,v(p,y)\big) = y\big(p_1^r+p_2^r\big)^{-1/r}\cdot\big(p_1^r+p_2^r\big)^{(1/r)-1}p_i^{\,r-1} = y\,p_i^{\,r-1}\big(p_1^r+p_2^r\big)^{-1}$$

$$= \frac{y\,p_i^{\,r-1}}{p_1^{\,r}+p_2^{\,r}} = x_i(p,y) \quad$$

> **Le mécanisme algébrique :** les exposants $-1/r$ et $(1/r)-1$ **s'additionnent en $-1$**. C'est le point du calcul qu'il faut voir venir.

**Point 2 — de la marshallienne vers la hicksienne.** De l'exemple 1.1 et de l'exemple 1.3 :

$$x_i(p,y)=\frac{y\,p_i^{\,r-1}}{p_1^{\,r}+p_2^{\,r}} \qquad e(p,u)=u\big(p_1^r+p_2^r\big)^{1/r}$$

En substituant $e(p,u)$ à la place de $y$ :

$$x_i\big(p,e(p,u)\big)=\frac{u\big(p_1^r+p_2^r\big)^{1/r}\,p_i^{\,r-1}}{p_1^{\,r}+p_2^{\,r}} = u\,p_i^{\,r-1}\big(p_1^r+p_2^r\big)^{(1/r)-1} = x_i^h(p,u) \quad$$

### 5.7 La figure 1.18 — tout coïncide au point optimal

Le livre conclut le §1.4 en réunissant les quatre identités sur une seule figure. Voici son raisonnement.

**Panneau (a) — l'espace des biens.**

| Lecture | Ce qu'on voit |
|---|---|
| Problème primal | Revenu $y$, prix $p$ : le consommateur atteint l'utilité maximale $u$ en choisissant $x_1^*$ et $x_2^*$. Cette courbe d'indifférence donne donc le niveau $v(p,y)$ |
| Problème dual | On cherche la dépense minimale pour atteindre $u$. La plus basse courbe d'isodépense touchant $u$ aux prix $p$ **coïncide exactement avec la droite de budget** du problème primal, et les choix minimisant la dépense sont **à nouveau** $x_1^*$ et $x_2^*$ |

**Panneau (b) — le plan $(x_1,p_1)$.** Le point $(p_1,x_1^*)$ appartient **simultanément aux trois** courbes suivantes :

1. la demande **hicksienne** du bien 1 aux prix $p$ et au niveau $u$ ;
2. la demande **hicksienne** du bien 1 aux prix $p$ et au niveau $v(p,y)$ ;
3. la demande **marshallienne** du bien 1 aux prix $p$ et au revenu $y$.

> *« Ainsi, $x_1(p,y)=x_1^h(p,v(p,y))$ et $x_1^h(p,u)=x_1(p,e(p,u))$, comme nous l'espérions. »*

**Les quatre identités lues sur la figure :**

| Identité | Lecture géométrique |
|---|---|
| $y = e(p,v(p,y))$ | droite de budget et droite d'isodépense ont **les mêmes intercepts** |
| $u = v(p,y)$ | $u$ est le maximum atteignable aux prix $p$ et revenu $y$ |
| $u = v(p,e(p,u))$ | $u$ est aussi le maximum atteignable avec un revenu égal à la dépense minimale pour $u$ |
| $x_1^* = x_1(p,y)=x_1^h(p,u)$ | **un seul point** sur les deux courbes de demande |

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que la figure ne montre PAS — et c'est là tout l'enjeu du §1.5.</span>

⚠️ Les deux courbes de demande se **croisent** au point $(p_1,x_1^*)$, mais elles n'ont **pas la même pente**. La marshallienne intègre l'effet de revenu, la hicksienne non. La différence entre les deux pentes **est** l'équation de Slutsky (fiche 503) :

$$\frac{\partial x_i(p,y)}{\partial p_j}=\frac{\partial x_i^h(p,u)}{\partial p_j} - x_j(p,y)\frac{\partial x_i(p,y)}{\partial y}$$

⚠️ qui s'obtient précisément en **dérivant** l'identité 2 du théorème 1.9 par rapport à $p_j$. Retenez que le théorème 1.9 n'est pas une curiosité : c'est **l'équation dont Slutsky est la dérivée**.

</div>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Une $u$ explicite + « dériver $v(p,y)$ » | **Utilité indirecte directe** | Résoudre le primal (fiche 501), puis substituer dans $u$ via (1.13) |
| Une $u$ explicite + « dériver $e(p,u)$ » | **Dépense directe** | Résoudre le dual : lagrangien $p\cdot x - \lambda[u(x)-u]$, puis $e=p\cdot x^h$ |
| $v$ donnée + « trouver $e$ » (ou l'inverse) | **Inversion** | Ne rien recalculer : appliquer (1.18) ou (1.19) |
| « Vérifier que $v$ / $e$ satisfait les propriétés » | **Contrôle du théorème 1.6 ou 1.7** | Dérouler les 6 ou 7 propriétés une par une |
| « Retrouver la demande à partir de $v$ » | **Identité de Roy** | $x_i = -\dfrac{\partial v/\partial p_i}{\partial v/\partial y}$ |
| « Retrouver la demande à partir de $e$ » | **Lemme de Shephard** | $x_i^h = \dfrac{\partial e}{\partial p_i}$ — pas de rapport, pas de signe |
| « Montrer que $v$ est quasiconvexe » | **Preuve par les ensembles budgétaires** | Montrer $x\in B^t \Rightarrow x\in B^1$ ou $x\in B^2$ |
| « Montrer que $e$ est concave » | **Preuve par la minimisation** | $p^k\cdot x^k \leq p^k\cdot x^*$, pondérer et sommer |
| « Prouver une propriété **sans hypothèse supplémentaire** » | **Preuve élémentaire** | Passer par la définition (max ou min) et la comparaison d'ensembles — jamais par le lagrangien |

**Le réflexe qui économise le plus de temps.** Devant *« calculer $v$ **et** $e$ »*, **ne résolvez qu'un seul problème** — celui qui vous semble le plus simple — et obtenez l'autre par inversion (théorème 1.8). Sur la CES, l'inversion consiste à échanger $y\leftrightarrow u$ et à retourner l'exposant.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Construire $v(p,y)$

1. Résoudre le problème primal → $x(p,y)$ (méthode de la fiche 501).
2. Substituer dans la fonction d'utilité directe : $v(p,y)=u\big(x(p,y)\big)$, identité (1.13).
3. **Simplifier agressivement.** Sur une CES, factoriser $y$ et $\big(p_1^r+p_2^r\big)$ ; les identités $r-1=\frac{1}{\rho-1}$ et $\frac1\rho-1=-\frac1r$ font tout le travail.
4. **Vérifier trois propriétés** : homogénéité de degré 0, $\partial v/\partial y>0$, $\partial v/\partial p_i<0$.

### Méthode 2 — Construire $e(p,u)$

1. Écrire le lagrangien **du dual** : $\mathcal{L}=p\cdot x - \lambda\big[u(x)-u\big]$.
2. Conditions du premier ordre, puis **éliminer $\lambda$ par division** — on retrouve **la même** condition de tangence que dans le primal.
3. Substituer dans la **contrainte d'utilité** (et non dans le budget) pour obtenir $x^h(p,u)$.
4. Former $e(p,u)=p\cdot x^h(p,u)$.
5. **Vérifier** : homogénéité de degré 1 en $p$, $\partial e/\partial u>0$, et surtout **Shephard** ($\partial e/\partial p_i$ doit redonner $x_i^h$).

### Méthode 3 — Passer de l'une à l'autre par inversion

| On a | On veut | Identité de départ | Geste |
|---|---|---|---|
| $v$ | $e$ | $v\big(p,e(p,u)\big)=u$ (thm 1.8, **point 2**) | remplacer $y$ par $e(p,u)$ dans $v$, poser $=u$, résoudre en $e$ |
| $e$ | $v$ | $e\big(p,v(p,y)\big)=y$ (thm 1.8, **point 1**) | remplacer $u$ par $v(p,y)$ dans $e$, poser $=y$, résoudre en $v$ |

⚠️ Prendre la mauvaise identité de départ mène à une tautologie sans information.

### Méthode 4 — Roy et Shephard

**Identité de Roy** — quand on connaît $v$ :

$$x_i(p,y)=-\frac{\partial v/\partial p_i}{\partial v/\partial y}$$

*Contrôle :* le résultat doit être **positif** (les deux dérivées sont de signes opposés) et **homogène de degré 0**.

**Lemme de Shephard** — quand on connaît $e$ :

$$x_i^h(p,u)=\frac{\partial e}{\partial p_i}$$

*Contrôle :* le résultat doit être **positif** et **homogène de degré 0 en $p$**.

### Méthode 5 — Démontrer une propriété de courbure

**Quasiconvexité de $v$ en $(p,y)$ :**

1. Poser $B^1$, $B^2$, $B^t$ avec $p^t=tp^1+(1-t)p^2$ et $y^t=ty^1+(1-t)y^2$.
2. Traiter $t\in\{0,1\}$ séparément (trivial).
3. Pour $t\in(0,1)$ : supposer $x\in B^t$ avec $x\notin B^1$ et $x\notin B^2$ ; multiplier les deux inégalités strictes par $t$ et $1-t$ ; **additionner** ; obtenir $p^t\cdot x>y^t$ — contradiction.
4. Conclure : $v(p^t,y^t)\leq\max\{v(p^1,y^1),v(p^2,y^2)\}$.

**Concavité de $e$ en $p$ :**

1. Nommer $x^1,x^2,x^*$ les minimiseurs aux prix $p^1,p^2,p^t$.
2. Écrire que $x^*$ est **admissible** pour les problèmes en $p^1$ et $p^2$ : $p^k\cdot x^k\leq p^k\cdot x^*$.
3. Multiplier par $t$ et $(1-t)$, **additionner** : $t\,e(p^1,u)+(1-t)e(p^2,u)\leq p^t\cdot x^*=e(p^t,u)$.

> **Ces deux preuves ont la même architecture** — « pondérer deux inégalités et additionner » — mais **des sens opposés**, parce que l'une porte sur un max et l'autre sur un min.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que $v$ est « moins informative » que $u$ | $v$ contient **exactement** la même information, indexée par $(p,y)$ au lieu de $x$ | On peut reconstruire $u$ à partir de $v$ (§2.1.3) |
| 2 | Dire que $v$ est homogène de degré 0 **en $p$** | Elle l'est en $(p,y)$ **conjointement** : il faut échelonner le revenu aussi | $v(tp,ty)=v(p,y)$ |
| 3 | Dire que $e$ est homogène de degré 0 en $p$ | Elle est homogène de **degré 1** en $p$ | $e(tp,u)=t\,e(p,u)$ |
| 4 | Oublier que $x^h$ est homogène de degré **0** en $p$ | L'argmin ne change pas quand on multiplie l'objectif par $t>0$ | $x^h(tp,u)=x^h(p,u)$ |
| 5 | Écrire « $v$ est **strictement** décroissante en $p$ » | Le thm 1.6 ne dit que « décroissante » : si $x_i=0$, une hausse de $p_i$ ne change rien | Décroissante au sens **large** |
| 6 | Confondre quasiconvexité de $v$ et convexité | La quasiconvexité borne par le **max**, pas par la moyenne pondérée | $v(p^t,y^t)\leq\max\{v(p^1,y^1),v(p^2,y^2)\}$ |
| 7 | Conclure de la quasiconvexité que le consommateur **préfère** la volatilité des prix | Il faudrait la **convexité** pour cela | La quasiconvexité est une information plus faible |
| 8 | Dans la preuve de quasiconvexité, autoriser $t\in[0,1]$ dans la multiplication | Avec $t=0$ ou $t=1$, un facteur est nul et l'inégalité stricte se perd | Traiter les extrémités **séparément** |
| 9 | Oublier le **signe moins** de l'identité de Roy | $\partial v/\partial p_i\leq0$ alors que $x_i\geq0$ | $x_i=-\dfrac{\partial v/\partial p_i}{\partial v/\partial y}$ |
| 10 | Écrire Shephard avec un rapport ou un signe moins | $e$ est en euros comme $p_ix_i$ : la dérivée donne directement $x_i^h$ | $x_i^h=\dfrac{\partial e}{\partial p_i}$, sans plus |
| 11 | Appliquer Shephard à $v$ | $\partial v/\partial p_i = -\lambda^* x_i$, pas $-x_i$ | Le facteur $\lambda^*$ est ce qui oblige au rapport dans Roy |
| 12 | Croire que $\lambda^*$ est un artifice de calcul | Le thm de l'enveloppe démontre $\lambda^*=\partial v/\partial y$ | C'est l'**utilité marginale du revenu** |
| 13 | Dans le dual, écrire la contrainte $u(x)=u$ dès la définition | La définition (1.14) utilise $u(x)\geq u$, ce qui rend l'ensemble **convexe** | La saturation se **démontre** (thm 1.7, prop. 3) |
| 14 | Croire que la propriété 7 vaut sans stricte quasiconcavité | Sans unicité de $x^h$, $e$ peut avoir un point anguleux en $p$ | La prop. 7 est la **seule** à l'exiger |
| 15 | Utiliser le théorème 1.9 sans invoquer l'hypothèse 1.2 | Sans stricte quasiconcavité, $x$ et $x^h$ sont des **correspondances** | Le thm 1.9 est le seul du §1.4 à l'exiger en entier |
| 16 | Inverser $v$ « en $(p,y)$ » | On n'inverse qu'en la **dernière** variable, à $p$ fixé | La notation $v^{-1}(p:u)$ le rappelle |
| 17 | Partir de la mauvaise identité pour inverser | $v\to e$ part de $v\circ e=u$ ; $e\to v$ part de $e\circ v = y$ | Sinon : tautologie |
| 18 | Croire que les courbes marshallienne et hicksienne coïncident | Elles se **croisent** en un point, avec des pentes **différentes** | La différence des pentes **est** Slutsky |
| 19 | Traiter la demande hicksienne comme observable | On ne mesure pas $u$ ; $x^h$ est un objet **théorique** | Elle est testable **indirectement**, via ses propriétés |
| 20 | Ignorer la portée de la concavité de $e$ | Elle donne la semi-définie négativité de $\partial x_i^h/\partial p_j$ | C'est la **source** des théorèmes 1.12-1.15 du §1.5 |

## 📌 Ultimate Review

**Les deux problèmes.**

$$v(p,y)=\max_{x\in\mathbb{R}^n_+} u(x) \ \text{ s.c. } \ p\cdot x\leq y \tag{1.12}$$

$$e(p,u)=\min_{x\in\mathbb{R}^n_+} p\cdot x \ \text{ s.c. } \ u(x)\geq u \tag{1.14}$$

$$v(p,y)=u\big(x(p,y)\big) \quad \text{(1.13)} \qquad\qquad e(p,u)=p\cdot x^h(p,u) \quad \text{(1.15)}$$

**Théorème 1.6 — $v(p,y)$**, sous $u$ continue et strictement croissante :

| # | Propriété | Preuve |
|---|---|---|
| 1 | continue sur $\mathbb{R}^n_{++}\times\mathbb{R}_+$ | thm du maximum (A2.21) |
| 2 | **homogène de degré 0** en $(p,y)$ | diviser la contrainte par $t$ |
| 3 | **strictement croissante** en $y$ | enveloppe : $\partial v/\partial y=\lambda^*>0$ |
| 4 | **décroissante** en $p$ | $p^0\geq p^1$ ⇒ $x^0$ reste réalisable ⇒ le max ne baisse pas |
| 5 | **quasiconvexe** en $(p,y)$ | $x\in B^t \Rightarrow x\in B^1$ ou $x\in B^2$ |
| 6 | **identité de Roy** | enveloppe : $\partial v/\partial p_i=-\lambda^*x_i$ |

$$\boxed{\;x_i(p,y)=-\frac{\partial v(p,y)/\partial p_i}{\partial v(p,y)/\partial y}\;}$$

**Théorème 1.7 — $e(p,u)$**, mêmes hypothèses (+ stricte quasiconcavité pour 7) :

| # | Propriété | Preuve |
|---|---|---|
| 1 | nulle en $u(0)$ | $x=0$ atteint $u(0)$ au coût $0$ |
| 2 | continue sur $\mathbb{R}^n_{++}\times\mathcal{U}$ | thm du maximum |
| 3 | **str. croissante et non bornée** en $u$ | enveloppe : $\partial e/\partial u=\lambda^*>0$ ; exercice 1.34 |
| 4 | croissante en $p$ | découle de 7 : $\partial e/\partial p_i=x_i^h\geq0$ |
| 5 | **homogène de degré 1** en $p$ | $t(p\cdot x)$ a le même argmin |
| 6 | **concave** en $p$ | pondérer $p^k\cdot x^k\leq p^k\cdot x^*$ et sommer |
| 7 | **lemme de Shephard** | enveloppe : $\partial e/\partial p_i = x_i^*$ |

$$\boxed{\;x_i^h(p,u)=\frac{\partial e(p,u)}{\partial p_i}\;}$$

**Le tableau comparatif à mémoriser.**

|  | $v(p,y)$ | $e(p,u)$ |
|---|---|---|
| Nature | valeur **maximale** | valeur **minimale** |
| Homogénéité | degré **0** en $(p,y)$ | degré **1** en $p$ |
| Monotonie | ↑ strict en $y$, ↓ en $p$ | ↑ strict en $u$, ↑ en $p$ |
| Courbure en $p$ | **quasiconvexe** en $(p,y)$ | **concave** en $p$ |
| Multiplicateur | $\lambda^*=\partial v/\partial y$ = **utilité marginale du revenu** | $\lambda^*=\partial e/\partial u$ = **coût marginal de l'utilité** |
| Dérivée en $p_i$ | $-\lambda^*x_i$ ⇒ Roy (rapport, signe moins) | $x_i^h$ ⇒ Shephard (direct) |
| Solution | $x(p,y)$, **observable**, homogène degré 0 en $(p,y)$ | $x^h(p,u)$, **non observable**, homogène degré 0 en $p$ |

**Théorème 1.8 — les fonctions de valeur.**

$$e\big(p,v(p,y)\big)=y \qquad\qquad v\big(p,e(p,u)\big)=u$$

$$\Longrightarrow\qquad e(p,u)=v^{-1}(p:u) \quad \text{(1.18)} \qquad v(p,y)=e^{-1}(p:y) \quad \text{(1.19)}$$

**Théorème 1.9 — les demandes** (sous l'hypothèse 1.2) :

$$x_i(p,y)=x_i^h\big(p,v(p,y)\big) \qquad\qquad x_i^h(p,u)=x_i\big(p,e(p,u)\big)$$

**La CES, de bout en bout** — avec $r=\dfrac{\rho}{\rho-1}$, $r-1=\dfrac{1}{\rho-1}$, $\dfrac1\rho-1=-\dfrac1r$ :

| Objet | Expression |
|---|---|
| $u(x)$ | $\big(x_1^\rho+x_2^\rho\big)^{1/\rho}$, $\rho<1$, $\rho\neq0$ |
| $x_i(p,y)$ | $\dfrac{p_i^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}}$ |
| $v(p,y)$ | $y\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r}$ |
| $x_i^h(p,u)$ | $u\big(p_1^{\,r}+p_2^{\,r}\big)^{(1/r)-1}p_i^{\,r-1}$ |
| $e(p,u)$ | $u\big(p_1^{\,r}+p_2^{\,r}\big)^{1/r}$ |

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Définir la fonction d'utilité indirecte et dire ce qu'elle est du point de vue de l'optimisation.**

</summary>

$$v(p,y)=\max_{x\in\mathbb{R}^n_+} u(x) \quad\text{s.c.}\quad p\cdot x\leq y$$

C'est la **fonction de valeur maximale** du problème du consommateur. Elle vérifie $v(p,y)=u\big(x(p,y)\big)$ (identité 1.13).

Géométriquement : le niveau d'utilité de **la plus haute courbe d'indifférence atteignable** aux prix $p$ avec le revenu $y$.

</details>

<details class="details--riche">
<summary>

**2. Sous quelles hypothèses sur $u$ le théorème 1.6 vaut-il ?**

</summary>

$u$ **continue** et **strictement croissante** sur $\mathbb{R}^n_+$ — c'est tout.

⚠️ Ni quasiconcavité, ni stricte quasiconcavité. Les six propriétés valent donc bien au-delà de l'hypothèse 1.2. La stricte quasiconcavité ne servira qu'à garantir l'**unicité** de $x(p,y)$ dans l'identité de Roy.

</details>

<details class="details--riche">
<summary>

**3. Démontrer l'homogénéité de degré zéro de $v$.**

</summary>

$$v(tp,ty)=\Big[\max u(x) \ \text{ s.c. } \ tp\cdot x\leq ty\Big]$$

En **divisant les deux membres de la contrainte par $t>0$**, on obtient exactement la contrainte $p\cdot x\leq y$ : l'**ensemble** des paniers admissibles est identique. Donc $v(tp,ty)=v(p,y)$. $\blacksquare$

**Signification :** pas d'illusion monétaire. Géométriquement (Fig. 1.14), la droite de budget est inchangée : pente $-tp_1/tp_2=-p_1/p_2$, intercepts $ty/tp_i=y/p_i$.

</details>

<details class="details--riche">
<summary>

**4. Pourquoi $v$ est-elle strictement croissante en $y$, et que démontre-t-on au passage ?**

</summary>

Par le **théorème de l'enveloppe** appliqué à $\mathcal{L}=u(x)-\lambda(p\cdot x-y)$ :

$$\frac{\partial v(p,y)}{\partial y}=\frac{\partial\mathcal{L}(x^*,\lambda^*)}{\partial y}=\lambda^*>0$$

**Au passage on démontre que $\lambda^* = \partial v/\partial y$ : le multiplicateur de Lagrange EST l'utilité marginale du revenu.** C'est la justification rigoureuse de la lecture « bang pour l'euro » de la fiche 501.

</details>

<details class="details--riche">
<summary>

**5. Démontrer que $v$ est décroissante en $p$, sans utiliser de dérivée.**

</summary>

Soit $p^0\geq p^1$ et $x^0$ la solution aux prix $p^0$.

1. $x^0\geq0$ ⇒ $(p^0-p^1)\cdot x^0\geq0$ ⇒ $p^1\cdot x^0 \leq p^0\cdot x^0$.
2. $p^0\cdot x^0\leq y$ (réalisabilité aux prix $p^0$).
3. Donc $p^1\cdot x^0\leq y$ : $x^0$ est **encore réalisable** aux prix $p^1$.
4. Donc $v(p^1,y)\geq u(x^0)=v(p^0,y)$. $\blacksquare$

**L'argument s'appelle « monotonie du max » :** une baisse de prix agrandit l'ensemble budgétaire, et un max sur un ensemble plus grand ne peut pas baisser.

⚠️ Pas « strictement » : si $x_i^0=0$, une baisse de $p_i$ ne change rien.

</details>

<details class="details--riche">
<summary>

**6. Énoncer la quasiconvexité de $v$ et donner l'idée de la preuve en une phrase.**

</summary>

$$v(p^t,y^t)\leq\max\big[v(p^1,y^1),\,v(p^2,y^2)\big] \qquad\forall t\in[0,1]$$

**L'idée :** tout ce que le consommateur peut choisir dans $B^t$, il aurait pu le choisir dans $B^1$ **ou** dans $B^2$. Autrement dit $B^t \subseteq B^1\cup B^2$.

En mots du livre : *« un consommateur préférerait l'un de deux ensembles budgétaires extrêmes à n'importe quelle moyenne des deux. »*

</details>

<details class="details--riche">
<summary>

**7. Dérouler la preuve du lemme $B^t\subseteq B^1\cup B^2$.**

</summary>

Pour $t\in\{0,1\}$, $B^t$ **est** $B^1$ ou $B^2$ : trivial.

Pour $t\in(0,1)$, par l'absurde : soit $x\in B^t$ avec $x\notin B^1$ et $x\notin B^2$. Alors

$$p^1\cdot x>y^1 \qquad\text{et}\qquad p^2\cdot x>y^2.$$

Comme $t$ et $1-t$ sont **strictement positifs**, on peut multiplier sans perdre le sens strict, puis additionner :

$$\big(tp^1+(1-t)p^2\big)\cdot x > ty^1+(1-t)y^2, \qquad\text{soit}\qquad p^t\cdot x>y^t,$$

c'est-à-dire $x\notin B^t$ — contradiction. $\blacksquare$

⚠️ C'est la stricte positivité de $t$ et $1-t$ qui rend l'étape valide : d'où le traitement séparé des extrémités.

</details>

<details class="details--riche">
<summary>

**8. La quasiconvexité de $v$ implique-t-elle que le consommateur préfère la volatilité des prix ?**

</summary>

**Non.** Elle donne $v(p^t,y)\leq\max\{v(p^1,y),v(p^2,y)\}$ — le cas moyen n'est jamais meilleur que le **meilleur** des deux extrêmes.

Une préférence pour la loterie exigerait $v(p^t,y)\leq\tfrac12 v(p^1,y)+\tfrac12 v(p^2,y)$, c'est-à-dire la **convexité** de $v$ — une propriété plus forte, qui ne découle pas du théorème 1.6.

</details>

<details class="details--riche">
<summary>

**9. Énoncer et démontrer l'identité de Roy.**

</summary>

$$x_i(p,y)=-\frac{\partial v(p,y)/\partial p_i}{\partial v(p,y)/\partial y}$$

**Preuve.** Par le théorème de l'enveloppe sur $\mathcal{L}=u(x)-\lambda(p\cdot x-y)$ :

$$\frac{\partial v}{\partial p_i}=\frac{\partial\mathcal{L}(x^*,\lambda^*)}{\partial p_i}=-\lambda^*x_i^* \qquad\qquad \frac{\partial v}{\partial y}=\lambda^*$$

Le rapport élimine $\lambda^*$ et le signe moins rétablit la positivité. $\blacksquare$

**Lecture économique de $\partial v/\partial p_i=-\lambda^*x_i$ :** une hausse de $1$ € de $p_i$ coûte $x_i$ euros de pouvoir d'achat, et chaque euro vaut $\lambda^*$ utils. Le réajustement du panier est **du second ordre** — c'est ce que l'enveloppe autorise à négliger.

</details>

<details class="details--riche">
<summary>

**10. Écrire $v(p,y)$ pour la CES et vérifier Roy dessus.**

</summary>

$$v(p,y)=y\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r}, \qquad r=\frac{\rho}{\rho-1}$$

$$\frac{\partial v}{\partial y}=\big(p_1^r+p_2^r\big)^{-1/r} \qquad \frac{\partial v}{\partial p_i}=-\big(p_1^r+p_2^r\big)^{(-1/r)-1}y\,p_i^{\,r-1}$$

$$-\frac{\partial v/\partial p_i}{\partial v/\partial y}=\frac{y\,p_i^{\,r-1}}{p_1^{\,r}+p_2^{\,r}}=x_i(p,y) \quad$$

**Remarque de forme :** $v$ est **linéaire en $y$**, car la CES est homothétique. Toute préférence homothétique donne $v(p,y)=y\cdot g(p)$.

</details>

<details class="details--riche">
<summary>

**11. Définir la fonction de dépense et dire ce qu'elle ignore.**

</summary>

$$e(p,u)\equiv\min_{x\in\mathbb{R}^n_+} p\cdot x \quad\text{s.c.}\quad u(x)\geq u$$

C'est la **fonction de valeur minimale** du problème dual.

**Ce qu'elle ignore :** *« nous ignorons toute limitation imposée par le revenu du consommateur »*. On ne demande pas ce qu'il **peut** dépenser, mais ce qu'il **devrait** dépenser pour atteindre $u$.

</details>

<details class="details--riche">
<summary>

**12. Qu'est-ce qu'une courbe d'isodépense, et à quoi ressemble la figure 1.15 ?**

</summary>

L'ensemble des paniers coûtant le même montant total : $e=p_1x_1+p_2x_2$. Toutes ont la **même pente** $-p_1/p_2$ et des intercepts $e/p_1$, $e/p_2$.

Sur la Fig. 1.15 : $e^3$ ne touche pas la courbe $u$ (insuffisant) ; $e^1$ et $e^2$ la touchent (suffisants) ; $e^*$ est la **plus basse** à la toucher — c'est le minimum, atteint en $x^h$.

</details>

<details class="details--riche">
<summary>

**13. Qu'est-ce que la demande hicksienne, et pourquoi ces deux noms ?**

</summary>

$x^h(p,u)$ = la solution du problème de minimisation de la dépense. Ce sont des demandes **à utilité constante**.

| Nom | Origine |
|---|---|
| **compensée** | à chaque changement de prix on ajuste le revenu pour ramener le consommateur au même niveau d'utilité |
| **hicksienne** | **John Hicks (1939)** fut le premier à les décrire ainsi |

</details>

<details class="details--riche">
<summary>

**14. Les trois différences entre demande marshallienne et hicksienne.**

</summary>

|  | $x(p,y)$ | $x^h(p,u)$ |
|---|---|---|
| Second argument | **revenu**, observable | **utilité**, non observable |
| Ce qui reste constant quand $p$ varie | le **revenu monétaire** | le **niveau d'utilité** |
| Effets contenus | substitution **+** revenu | substitution **seul** |

C'est la troisième ligne qui fait tout l'intérêt de $x^h$ : elle **isole** l'effet de substitution, parce que la compensation annule par construction l'effet de revenu.

</details>

<details class="details--riche">
<summary>

**15. Pourquoi la contrainte est-elle écrite $u(x)\geq u$ et non $u(x)=u$ ?**

</summary>

Parce que $\{x \mid u(x)\geq u\}$ est **convexe** quand $u$ est quasiconcave — c'est l'ensemble supérieur $\succsim(x)$. Avec $=$, on aurait une **surface**, pas un convexe, et les théorèmes d'optimisation convexe ne s'appliqueraient pas.

La **saturation** $u(x^h)=u$ n'est pas posée : elle se **démontre** (thm 1.7, propriété 3).

</details>

<details class="details--riche">
<summary>

**16. Démontrer que la contrainte du dual est saturée.**

</summary>

Supposons $u(x^1)>u$. Par **continuité** de $u$, il existe $t\in(0,1)$ proche de 1 avec $u(tx^1)>u$.

Par ailleurs $u\geq u(0)$ et $u(x^1)>u$ impliquent $u(x^1)>u(0)$, donc $x^1\neq0$, donc — puisque $p\gg0$ — $p\cdot x^1>0$ et

$$p\cdot(tx^1)<p\cdot x^1.$$

On a donc trouvé un panier **strictement moins cher** satisfaisant encore la contrainte : $x^1$ n'était pas optimal. $\blacksquare$

**Le parallèle :** dans le primal on **augmentait** le panier pour améliorer l'utilité ; ici on le **contracte** pour réduire la dépense.

</details>

<details class="details--riche">
<summary>

**17. Lister les sept propriétés de $e(p,u)$.**

</summary>

1. Nulle quand $u$ prend la plus basse valeur de $\mathcal{U}$
2. Continue sur $\mathbb{R}^n_{++}\times\mathcal{U}$
3. **Strictement croissante et non bornée** en $u$
4. Croissante en $p$
5. **Homogène de degré 1** en $p$
6. **Concave** en $p$
7. **Lemme de Shephard** : $\partial e/\partial p_i = x_i^h$

⚠️ Seule la propriété **7** exige la stricte quasiconcavité de $u$ — elle a besoin de l'**unicité** de $x^h$.

</details>

<details class="details--riche">
<summary>

**18. Démontrer l'homogénéité de degré 1 de $e$ en $p$, et son corollaire.**

</summary>

$(tp)\cdot x = t(p\cdot x)$, et **l'ensemble de contrainte $\{x \mid u(x)\geq u\}$ ne dépend pas de $p$**. Multiplier l'objectif par $t>0$ ne change pas l'**argmin**, seulement la valeur :

$$e(tp,u)=t\,e(p,u).$$

**Corollaire :** l'argmin étant inchangé, $x^h(tp,u)=x^h(p,u)$ — la demande hicksienne est homogène de **degré 0** en $p$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**19. Comparer les quatre homogénéités du chapitre.**

</summary>

| Fonction | Degré | En quoi ? |
|---|---|---|
| $v(p,y)$ | **0** | en $(p,y)$ conjointement |
| $x(p,y)$ | **0** | en $(p,y)$ conjointement |
| $e(p,u)$ | **1** | en $p$ seul |
| $x^h(p,u)$ | **0** | en $p$ seul |

**La raison de l'asymétrie :** dans le primal, $y$ est monétaire et doit être échelonné avec $p$ ; dans le dual, $u$ n'est pas monétaire et reste fixe.

</details>

<details class="details--riche">
<summary>

**20. Démontrer la concavité de $e$ en $p$.**

</summary>

Soient $x^1,x^2,x^*$ les minimiseurs aux prix $p^1,p^2,p^t$. Comme $x^*$ atteint $u$, il est **admissible** pour les problèmes en $p^1$ et $p^2$ :

$$p^1\cdot x^1\leq p^1\cdot x^* \qquad\qquad p^2\cdot x^2\leq p^2\cdot x^*.$$

En multipliant par $t\geq0$ et $(1-t)\geq0$ puis en additionnant :

$$t\,e(p^1,u)+(1-t)\,e(p^2,u) \leq \big(tp^1+(1-t)p^2\big)\cdot x^* = e(p^t,u). \qquad\blacksquare$$

⚠️ Le livre écrit par erreur « (P.5) » là où il fallait lire « (P.4) » — la numérotation (P.5) n'existe pas dans cette preuve.

</details>

<details class="details--riche">
<summary>

**21. Donner l'intuition économique de la concavité de $e$, et son corollaire majeur.**

</summary>

**Intuition :** si le consommateur ne réajustait pas son panier, sa dépense varierait **linéairement** avec les prix. Mais il substitue vers les biens devenus relativement moins chers, ce qui ne peut que **réduire** la dépense sous la ligne droite. D'où une fonction au-dessus de ses cordes : **concave**.

**Corollaire majeur :** la concavité donne $\big[\partial^2 e/\partial p_i\partial p_j\big]$ **semi-définie négative**. Or par Shephard cette matrice est $\big[\partial x_i^h/\partial p_j\big]$ — la **matrice de substitution**.

**C'est de là que viennent tous les théorèmes 1.12 à 1.15 du §1.5** : termes de substitution propres négatifs, symétrie, semi-définie négativité de la matrice de Slutsky.

</details>

<details class="details--riche">
<summary>

**22. Énoncer et démontrer le lemme de Shephard.**

</summary>

$$\frac{\partial e(p,u)}{\partial p_i}=x_i^h(p,u)$$

**Preuve par l'enveloppe.** $\mathcal{L}=p\cdot x-\lambda[u(x)-u]$ contient $p_i$ dans le seul terme $p_ix_i$, donc

$$\frac{\partial e}{\partial p_i}=\frac{\partial\mathcal{L}(x^*,\lambda^*)}{\partial p_i}=x_i^*\equiv x_i^h(p,u). \qquad\blacksquare$$

**Intuition :** une hausse de $1$ € de $p_i$ augmente la dépense d'environ $x_i^h$ euros ; le réajustement du panier est du second ordre.

⚠️ **Pas de rapport, pas de signe moins** — contrairement à Roy. La raison : $e$ est mesurée en **euros** (comme $p_ix_i$), alors que $v$ est mesurée en **utils**.

</details>

<details class="details--riche">
<summary>

**23. Donner la preuve de Shephard qui n'exige aucune hypothèse supplémentaire (exercice 1.37).**

</summary>

Posons $x^0=x^h(p^0,u^0)$ et $f(p)\equiv e(p,u^0)-p\cdot x^0$.

**(a)** $x^0$ atteint $u^0$, donc il est admissible **quels que soient les prix** : $e(p,u^0)\leq p\cdot x^0$, avec **égalité** en $p=p^0$.

**(b)** Donc $f(p)\leq0$ partout et $f(p^0)=0$ : $f$ atteint son **maximum** en $p^0$.

**(c)** $p^0$ est un maximum intérieur sur l'ouvert $\mathbb{R}^n_{++}$, donc $\nabla f(p^0)=0$.

**(d)** Or $\nabla f(p)=\nabla_p e(p,u^0)-x^0$, d'où $\nabla_p e(p^0,u^0)=x^0=x^h(p^0,u^0)$. $\blacksquare$

**Le bonus :** (a) dit que $p\mapsto p\cdot x^0$ est une **majorante linéaire tangente** de $e(\cdot,u^0)$ en $p^0$ — ce qui redémontre au passage la **concavité** (propriété 6).

</details>

<details class="details--riche">
<summary>

**24. Écrire $x^h$ et $e$ pour la CES, et vérifier Shephard.**

</summary>

$$x_i^h(p,u)=u\big(p_1^{\,r}+p_2^{\,r}\big)^{(1/r)-1}p_i^{\,r-1} \qquad e(p,u)=u\big(p_1^{\,r}+p_2^{\,r}\big)^{1/r}$$

**Vérification :**

$$\frac{\partial e}{\partial p_i}=u\cdot\frac1r\big(p_1^r+p_2^r\big)^{(1/r)-1}\cdot r\,p_i^{\,r-1}=u\big(p_1^r+p_2^r\big)^{(1/r)-1}p_i^{\,r-1}=x_i^h(p,u) \quad$$

Les deux $r$ se simplifient — exactement comme les deux $\rho$ dans le calcul de $\partial u/\partial x_1$ à l'exemple 1.1.

</details>

<details class="details--riche">
<summary>

**25. Pourquoi la condition de tangence est-elle la même dans les deux problèmes ?**

</summary>

Parce que dans les deux cas, l'élimination de $\lambda$ par division des conditions du premier ordre donne

$$\frac{\partial u/\partial x_1}{\partial u/\partial x_2}=\frac{p_1}{p_2}.$$

**Seule la seconde équation diffère :** contrainte budgétaire $p\cdot x=y$ dans le primal, contrainte d'utilité $u(x)=u$ dans le dual.

**C'est la formulation la plus économique de la dualité : même tangence, contrainte différente.**

</details>

<details class="details--riche">
<summary>

**26. Établir les deux inégalités (1.16) et (1.17).**

</summary>

**(1.16)** Posons $u=v(p,y)$ : $u$ est le maximum atteignable avec le revenu $y$. Donc $y$ suffit à atteindre au moins $u$. Or $e(p,u)$ est le **minimum** requis pour cela. Donc

$$e\big(p,v(p,y)\big)\leq y.$$

**(1.17)** Posons $y=e(p,u)$ : $y$ est le minimum permettant d'atteindre au moins $u$. Donc avec $y$, le consommateur atteint au moins $u$. Or $v(p,y)$ est le **maximum** atteignable. Donc

$$v\big(p,e(p,u)\big)\geq u.$$

**Le mécanisme commun :** la solution d'un problème fournit un **candidat admissible** pour l'autre.

</details>

<details class="details--riche">
<summary>

**27. Démontrer le point 1 du théorème 1.8.**

</summary>

Par (1.16), $e(p,v(p,y))\leq y$. Supposons l'inégalité stricte : $e(p,u)<y$ avec $u=v(p,y)$.

1. $u\in\mathcal{U}=[u(0),\bar u)$, donc $u<\bar u$.
2. Par **continuité de $e$** (thm 1.7), on choisit $\varepsilon>0$ avec $u+\varepsilon<\bar u$ et $e(p,u+\varepsilon)<y$.
3. Posons $y_\varepsilon=e(p,u+\varepsilon)$. Par (1.17), $v(p,y_\varepsilon)\geq u+\varepsilon$.
4. $y_\varepsilon<y$ et $v$ **strictement croissante en $y$** (thm 1.6) donnent $v(p,y)>v(p,y_\varepsilon)\geq u+\varepsilon$.
5. Mais $u=v(p,y)$, donc $u\geq u+\varepsilon$ — contradiction. $\blacksquare$

**Le schéma :** par l'absurde, en utilisant la **continuité de la fonction opposée** pour fabriquer un $\varepsilon$.

</details>

<details class="details--riche">
<summary>

**28. Comment obtient-on $e$ à partir de $v$, et pourquoi est-ce légitime ?**

</summary>

$v$ est **strictement croissante en $y$** (thm 1.6, prop. 3), donc inversible en son argument de revenu à $p$ fixé. En appliquant $v^{-1}(p:\cdot)$ aux deux membres de $v\big(p,e(p,u)\big)=u$ :

$$e(p,u)=v^{-1}(p:u).$$

Symétriquement, $e$ est **strictement croissante et non bornée en $u$** (prop. 3 + exercice 1.34), donc

$$v(p,y)=e^{-1}(p:y).$$

⚠️ L'inversion porte sur la **dernière variable seulement**, à $p$ fixé — d'où la notation à deux-points du livre.

</details>

<details class="details--riche">
<summary>

**29. Sur la CES, faire l'inversion dans les deux sens.**

</summary>

**De $v$ vers $e$.** On part de l'identité **2** : $v(p,e(p,u))=u$, soit

$$e(p,u)\big(p_1^r+p_2^r\big)^{-1/r}=u \quad\Longrightarrow\quad e(p,u)=u\big(p_1^r+p_2^r\big)^{1/r}.$$

**De $e$ vers $v$.** On part de l'identité **1** : $e(p,v(p,y))=y$, soit

$$v(p,y)\big(p_1^r+p_2^r\big)^{1/r}=y \quad\Longrightarrow\quad v(p,y)=y\big(p_1^r+p_2^r\big)^{-1/r}.$$

**Le geste :** échanger $y\leftrightarrow u$ et retourner l'exposant $-1/r\leftrightarrow+1/r$.

⚠️ Prendre la mauvaise identité de départ donne une tautologie.

</details>

<details class="details--riche">
<summary>

**30. Énoncer le théorème 1.9 et dire pourquoi il exige l'hypothèse 1.2.**

</summary>

$$x_i(p,y)=x_i^h\big(p,v(p,y)\big) \qquad\qquad x_i^h(p,u)=x_i\big(p,e(p,u)\big)$$

**Pourquoi l'hypothèse 1.2 :** il faut la **stricte quasiconcavité** pour que $x$ et $x^h$ soient des **fonctions**. Sans unicité, les identités porteraient sur des correspondances et l'écriture « $x_i(p,y)=x_i^h(\cdot)$ » n'aurait pas de sens.

C'est le **seul** théorème du §1.4 à invoquer l'hypothèse 1.2 en entier.

</details>

<details class="details--riche">
<summary>

**31. Démontrer le point 1 du théorème 1.9.**

</summary>

Posons $x^0=x(p^0,y^0)$ et $u^0=u(x^0)$.

1. $v(p^0,y^0)=u^0$ (définition de $v$).
2. $p^0\cdot x^0=y^0$ ($u$ strictement croissante ⇒ budget saturé).
3. Par le **théorème 1.8**, $e(p^0,u^0)=e\big(p^0,v(p^0,y^0)\big)=y^0$.
4. Donc $x^0$ atteint $u^0$ et coûte exactement $y^0$, qui est le **minimum requis** pour atteindre $u^0$.
5. Donc $x^0$ résout le problème (1.14) : $x^0=x^h(p^0,u^0)$. $\blacksquare$

**Le cœur est le pas 4 :** un panier qui atteint la cible au coût minimal **est** la solution du problème de minimisation.

</details>

<details class="details--riche">
<summary>

**32. Sur la figure 1.18, qu'est-ce qui coïncide exactement ?**

</summary>

- La **droite de budget** du primal et la **droite d'isodépense** du dual : mêmes intercepts, même pente.
- Le **panier optimal** $x^*$ : c'est le même pour les deux problèmes.
- Le point $(p_1,x_1^*)$ appartient **simultanément** à trois courbes : la hicksienne au niveau $u$, la hicksienne au niveau $v(p,y)$, et la marshallienne au revenu $y$.

⚠️ **Ce qui ne coïncide pas :** les **pentes** des deux courbes de demande. Leur différence **est** l'équation de Slutsky.

</details>

<details class="details--riche">
<summary>

**33. Quel est le lien entre le théorème 1.9 et l'équation de Slutsky ?**

</summary>

L'équation de Slutsky s'obtient en **dérivant** l'identité 2 du théorème 1.9 par rapport à $p_j$ :

$$x_i^h(p,u)=x_i\big(p,e(p,u)\big) \quad\xrightarrow{\ \partial/\partial p_j\ }\quad \frac{\partial x_i^h}{\partial p_j}=\frac{\partial x_i}{\partial p_j}+\frac{\partial x_i}{\partial y}\cdot\frac{\partial e}{\partial p_j}$$

et en remplaçant $\partial e/\partial p_j$ par $x_j^h$ (**Shephard**), puis $x_j^h$ par $x_j$ (**théorème 1.9**) :

$$\frac{\partial x_i(p,y)}{\partial p_j}=\underbrace{\frac{\partial x_i^h(p,u)}{\partial p_j}}_{\text{substitution}} - \underbrace{x_j(p,y)\frac{\partial x_i(p,y)}{\partial y}}_{\text{revenu}}$$

**Le théorème 1.9 n'est donc pas une curiosité : c'est l'équation dont Slutsky est la dérivée.**

</details>

<details class="details--riche">
<summary>

**34. Résumer le contraste $v$ / $e$ en cinq lignes.**

</summary>

|  | $v(p,y)$ | $e(p,u)$ |
|---|---|---|
| Nature | valeur **maximale** | valeur **minimale** |
| Homogénéité | degré **0** en $(p,y)$ | degré **1** en $p$ |
| Courbure | **quasiconvexe** en $(p,y)$ | **concave** en $p$ |
| Multiplicateur | $\lambda^*=\partial v/\partial y$ | $\lambda^*=\partial e/\partial u$ |
| Dérivée en $p_i$ | $-\lambda^*x_i$ ⇒ **Roy** | $x_i^h$ ⇒ **Shephard** |

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Définition de $v(p,y)$ ? | $\max u(x)$ s.c. $p\cdot x\leq y$ — la **fonction de valeur maximale** |
| L'identité (1.13) ? | $v(p,y)=u\big(x(p,y)\big)$ |
| Hypothèses du théorème 1.6 ? | $u$ **continue** et **strictement croissante** — c'est tout |
| Propriété 1 de $v$ ? | Continue, par le **théorème du maximum** (A2.21) |
| Propriété 2 de $v$ ? | **Homogène de degré 0** en $(p,y)$ |
| Preuve de l'homogénéité de $v$ ? | Diviser la contrainte $tp\cdot x\leq ty$ par $t>0$ : même ensemble budgétaire |
| Propriété 3 de $v$ ? | **Strictement croissante** en $y$ |
| Que vaut $\partial v/\partial y$ ? | $\lambda^*$ — le multiplicateur **est** l'utilité marginale du revenu |
| Propriété 4 de $v$ ? | **Décroissante** en $p$ (au sens large) |
| Pourquoi pas « strictement » décroissante en $p$ ? | Si $x_i=0$, une hausse de $p_i$ ne change rien |
| Propriété 5 de $v$ ? | **Quasiconvexe** en $(p,y)$ |
| Le lemme-clé de la quasiconvexité ? | $x\in B^t \Rightarrow x\in B^1$ **ou** $x\in B^2$ |
| Pourquoi traiter $t\in\{0,1\}$ à part ? | Un facteur nul détruit l'inégalité stricte |
| La quasiconvexité implique-t-elle un goût pour la volatilité des prix ? | **Non** — il faudrait la **convexité** |
| L'identité de Roy ? | $x_i(p,y)=-\dfrac{\partial v/\partial p_i}{\partial v/\partial y}$ |
| Les deux dérivées qui la produisent ? | $\partial v/\partial p_i=-\lambda^*x_i$ et $\partial v/\partial y=\lambda^*$ |
| Lecture économique de $\partial v/\partial p_i=-\lambda^* x_i$ ? | $1$ € de hausse coûte $x_i$ € de pouvoir d'achat, chacun valant $\lambda^*$ utils |
| $v$ de la CES ? | $y\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r}$ |
| Forme de $v$ pour des préférences homothétiques ? | $v(p,y)=y\cdot g(p)$ — **linéaire en $y$** |
| Définition de $e(p,u)$ ? | $\min p\cdot x$ s.c. $u(x)\geq u$ — la **valeur minimale** |
| L'identité (1.15) ? | $e(p,u)=p\cdot x^h(p,u)$ |
| Pourquoi $u(x)\geq u$ et non $u(x)=u$ ? | L'ensemble supérieur est **convexe** ; la saturation se **démontre** |
| Une courbe d'isodépense ? | $\{x \mid p_1x_1+p_2x_2=e\}$ — pente $-p_1/p_2$, intercepts $e/p_i$ |
| Qu'est-ce que $x^h(p,u)$ ? | La demande **hicksienne** ou **compensée** — à utilité constante |
| Qui a introduit ces demandes ? | **John Hicks (1939)** |
| Ce que $x^h$ isole ? | L'effet de **substitution seul** — l'effet de revenu est annulé par compensation |
| Pourquoi $x^h$ est-elle non observable ? | On ne mesure pas $u$ ; c'est un objet **théorique** |
| Propriété 1 de $e$ ? | $e(p,u(0))=0$ |
| Propriété 3 de $e$ ? | **Strictement croissante et non bornée** en $u$ |
| Que vaut $\partial e/\partial u$ ? | $\lambda^*$ — le **coût marginal de l'utilité** |
| Propriété 5 de $e$ ? | **Homogène de degré 1** en $p$ |
| Homogénéité de $x^h$ en $p$ ? | Degré **0** — l'argmin est inchangé |
| Propriété 6 de $e$ ? | **Concave** en $p$ |
| Intuition de la concavité de $e$ ? | Le consommateur **substitue**, donc la dépense reste **sous** la ligne droite |
| Corollaire majeur de la concavité ? | $\big[\partial x_i^h/\partial p_j\big]$ **semi-définie négative** — source des thm 1.12-1.15 |
| Le lemme de Shephard ? | $x_i^h(p,u)=\dfrac{\partial e(p,u)}{\partial p_i}$ |
| Différence Shephard / Roy ? | Shephard : **direct**. Roy : **rapport + signe moins** |
| Pourquoi cette différence ? | $e$ est en **euros**, $v$ en **utils** — d'où le facteur $\lambda^*$ chez Roy |
| Quelle propriété exige la stricte quasiconcavité ? | La **7** seulement (unicité de $x^h$) |
| Preuve de Shephard sans hypothèses (ex. 1.37) ? | $f(p)=e(p,u)-p\cdot x^0$ est **maximisée** en $p^0$, donc $\nabla f(p^0)=0$ |
| $x^h$ de la CES ? | $u\big(p_1^{\,r}+p_2^{\,r}\big)^{(1/r)-1}p_i^{\,r-1}$ |
| $e$ de la CES ? | $u\big(p_1^{\,r}+p_2^{\,r}\big)^{1/r}$ |
| Pourquoi la même tangence dans les deux problèmes ? | L'élimination de $\lambda$ donne $\text{TMS}_{12}=p_1/p_2$ dans les deux cas |
| Ce qui diffère entre primal et dual ? | **La seconde équation** : budget $p\cdot x=y$ vs utilité $u(x)=u$ |
| L'inégalité (1.16) ? | $e\big(p,v(p,y)\big)\leq y$ |
| L'inégalité (1.17) ? | $v\big(p,e(p,u)\big)\geq u$ |
| Théorème 1.8 ? | Les deux inégalités sont des **égalités** |
| Schéma des preuves du thm 1.8 ? | Par l'absurde, avec la **continuité de la fonction opposée** pour fabriquer un $\varepsilon$ |
| L'inversion (1.18) ? | $e(p,u)=v^{-1}(p:u)$ |
| L'inversion (1.19) ? | $v(p,y)=e^{-1}(p:y)$ |
| Ce qui légitime l'inversion de $v$ ? | Sa **stricte croissance en $y$** |
| Ce qui légitime l'inversion de $e$ ? | Sa **stricte croissance et non-bornitude en $u$** |
| Sur quelle variable porte l'inversion ? | La **dernière seulement**, à $p$ **fixé** |
| Pour obtenir $e$ à partir de $v$, quelle identité ? | L'identité **2** : $v\circ e = u$ |
| Pour obtenir $v$ à partir de $e$ ? | L'identité **1** : $e\circ v = y$ |
| Théorème 1.9, point 1 ? | $x_i(p,y)=x_i^h\big(p,v(p,y)\big)$ |
| Théorème 1.9, point 2 ? | $x_i^h(p,u)=x_i\big(p,e(p,u)\big)$ |
| Pourquoi le thm 1.9 exige-t-il l'hypothèse 1.2 ? | Il faut l'**unicité** pour que $x$ et $x^h$ soient des **fonctions** |
| Le cœur de la preuve du thm 1.9 ? | Un panier atteignant $u^0$ au coût $e(p^0,u^0)$ **est** la solution du dual |
| Ce que la figure 1.18 fait coïncider ? | Droite de budget = droite d'isodépense · même $x^*$ · même point $(p_1,x_1^*)$ |
| Ce qui ne coïncide PAS sur la figure 1.18 ? | Les **pentes** des deux courbes de demande |
| D'où vient l'équation de Slutsky ? | De la **dérivation** de l'identité 2 du thm 1.9 par rapport à $p_j$ |
| Les deux identités CES à retenir ? | $r-1=\dfrac{1}{\rho-1}$ et $\dfrac1\rho-1=-\dfrac1r$ |
