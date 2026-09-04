# Fiche 601 — Fonctions d'une variable : conditions d'ordre 1 et 2, Taylor, convexité

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Montaru, *Optimisation*, TSE, 16 mars 2025 — **chapitre 3** (Fonctions d'une variable réelle), p. 13–17 |
| **Difficulté** | Must know — tout le chapitre 4 est la copie de celui-ci en dimension $n$ |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 600 (intérieur, continuité, compacts) |
| **Concepts clés** | Dérivée, tangente, extremum local, condition du 1er ordre **au bord**, Rolle, accroissements finis, Taylor-Lagrange, négligeabilité, Taylor-Young, conditions du 2nd ordre, convexité |
| **Poids à l'examen** | La **proposition 3.4** est l'unique endroit du cours où l'on voit *pourquoi* $f'=0$ tombe au bord : elle prépare l'inéquation d'Euler (ch. 4) et KKT (ch. 6). Le **contre-exemple $t^3$** est demandé chaque année. |

> **Convention.** Les énoncés numérotés (« Définition 3.1 », « Théorème 3.5 ») sont ceux de M. Montaru, mot pour mot. Le polycopié précise que *« les preuves seront faites au tableau »* : celles écrites ici sont donc des **reconstructions**, signalées comme telles, ainsi que tous les exemples chiffrés.

## 🎯 Vue d'ensemble

```
LE PLAN DU CHAPITRE 3 — et pourquoi il est dans cet ordre

  §3.1  DÉRIVÉE          l'outil
          │
  §3.2  ORDRE 1          f'(t₀) = 0   ... mais SEULEMENT à l'intérieur
          │              au bord :  min en a ⟹ f'(a) ≥ 0
          │                         min en b ⟹ f'(b) ≤ 0     ← prop. 3.4
          │              ⚠ RÉCIPROQUE FAUSSE : f(t) = t³ en 0
          │
  §3.3  L'OUTILLAGE      Rolle (3.5) ──► accroissements finis (3.6)
          │                              ──► Taylor-Lagrange (3.7)
          │                              ──► Taylor-Young (3.9)
          │              chaque théorème est le suivant à un cran
          │
  §3.4  ORDRE 2          nécessaire   min ⟹ f''(t₀) ≥ 0
          │              suffisant    f'(t₀)=0 et f''(t₀) > 0 ⟹ min strict
          │              ⚠ l'un a un ≥, l'autre un > — ce n'est PAS un oubli
          │
  §3.5  CONVEXITÉ        f'' ≥ 0  ⟺  convexe  ⟺  au-dessus des tangentes
                         le cas où l'ordre 1 suffit à tout


LA CORRESPONDANCE AVEC LE CHAPITRE 4 — à garder sous les yeux toute l'année

     dimension 1                       dimension n
     ───────────                       ───────────
     f'(t₀) = 0                        ∇f(a) = 0            (prop. 4.11)
     f''(t₀) ≥ 0                       H_f(a) ⪰ 0           (semi-définie ⩾)
     f''(t₀) > 0                       H_f(a) ≻ 0           (définie positive)
     f' croissante                     ⟨∇f(x)−∇f(y), x−y⟩ ≥ 0
     Taylor-Young ordre 2              f(a+h) = f(a) + ⟨∇f(a),h⟩ + ½⟨h,H_f(a)h⟩ + o(‖h‖²)
```

## 🔴 Concept 1 — Dérivée et tangente (déf. 3.1, 3.2)

**Définition 3.1 (cours).** Soit $t_0 \in \mathring{I}$, c'est-à-dire $\exists \epsilon > 0$ tel que $\,]t_0-\epsilon, t_0+\epsilon[\, \subset I$. Pour $t \in \,]t_0-\epsilon, t_0+\epsilon[$ avec $t \neq t_0$, on pose

$$\Delta(t) = \frac{f(t)-f(t_0)}{t-t_0}.$$

$f$ est **dérivable en $t_0$** si $\lim_{t\to t_0}\Delta(t)$ existe. C'est cette limite qu'on note $f'(t_0)$.

**Définition 3.2 (cours).** Si $I$ est un ouvert de $\mathbb{R}$, $f$ est **dérivable sur $I$** si elle est dérivable en tout $t_0 \in I$.

**Remarque (cours) — les dérivées au bord.** Si $I = [a,b]$, les définitions précédentes définissent la dérivée sur $\,]a,b[$. On définit en plus la dérivée **à droite en $a$** et **à gauche en $b$** :

$$f'(a) = \lim_{t\to a,\ t>a} \frac{f(t)-f(a)}{t-a}, \qquad f'(b) = \lim_{t\to b,\ t<b} \frac{f(t)-f(b)}{t-b}.$$

> **Ne sautez pas cette remarque.** Elle a l'air anodine et c'est elle qui rend la proposition 3.4 possible : sans dérivée au bord, on ne pourrait rien dire des extrema en $a$ et $b$. **Toute la logique de KKT est déjà là** — au bord, on ne peut regarder que d'un côté, donc on obtient une **inégalité** et non une égalité.

**Équation de la tangente (cours).** Si $f$ est dérivable en $t_0$ :

$$y = f(t_0) + f'(t_0)(t-t_0).$$

> **C'est le développement de Taylor à l'ordre 1**, et c'est le même objet qu'on retrouvera sous le nom de « plan tangent » puis d'« hyperplan tangent » au chapitre 5. La proposition 4.18 caractérisera la convexité par *« $f$ au-dessus de ses plans tangents »* — la version en dimension $n$ de la proposition 3.13 ci-dessous.

## 🔴 Concept 2 — Condition nécessaire du premier ordre (déf. 3.3, prop. 3.4)

**Définition 3.3 (cours).** Soit $t_0 \in I$.

- $t_0$ est un **minimum local** de $f$ s'il existe $\epsilon>0$ tel que $\forall t \in I \cap \,]t_0-\epsilon, t_0+\epsilon[,\ f(t) \ge f(t_0)$.
- $t_0$ est un **maximum local** s'il existe $\epsilon>0$ tel que $\forall t \in I \cap \,]t_0-\epsilon, t_0+\epsilon[,\ f(t) \le f(t_0)$.
- $t_0$ est un **extremum local** si c'est l'un des deux.

⚠️ **L'intersection avec $I$ est essentielle.** On ne compare $f(t_0)$ qu'aux points **qui sont dans $I$**. C'est pourquoi un extremum peut parfaitement se produire en $a$ ou en $b$ : de ce côté-là, il n'y a rien à comparer.

**Proposition 3.4 (cours) — l'énoncé central du chapitre.** Soit $f : [a,b] \to \mathbb{R}$ dérivable sur $[a,b]$.

> **Si $f$ admet un minimum local $t_0 \in [a,b]$ :**
>
> - si $t_0 = a$ alors $f'(a) \ge 0$ ;
> - si $t_0 \in \,]a,b[$ alors $f'(t_0) = 0$ ;
> - si $t_0 = b$ alors $f'(b) \le 0$.
>
> **Si $f$ admet un maximum local $t_0 \in [a,b]$ :**
>
> - si $t_0 = a$ alors $f'(a) \le 0$ ;
> - si $t_0 \in \,]a,b[$ alors $f'(t_0) = 0$ ;
> - si $t_0 = b$ alors $f'(b) \ge 0$.

> **Preuve reconstruite — et la façon de retenir les six signes sans les apprendre.**
>
> *Cas $t_0 = a$, minimum.* Pour $t > a$ proche de $a$, on a $f(t) \ge f(a)$ et $t - a > 0$, donc le taux d'accroissement
>
> $$\Delta(t) = \frac{f(t)-f(a)}{t-a} \ge 0 .$$
>
> En passant à la limite $t \to a^+$ (une limite de quantités positives est positive) : $f'(a) \ge 0$.
>
> *Cas $t_0 = b$, minimum.* Pour $t < b$ proche de $b$, $f(t) \ge f(b)$ mais $t - b < 0$, donc $\Delta(t) \le 0$, et à la limite $f'(b) \le 0$.
>
> *Cas $t_0 \in \,]a,b[$, minimum.* On peut approcher **des deux côtés** : le premier calcul donne $f'(t_0) \ge 0$, le second $f'(t_0) \le 0$. Donc $f'(t_0) = 0$. ∎
>
> **La mnémotechnique qui remplace les six lignes.** Ne mémorisez pas les signes : mémorisez *« pour un minimum, $f$ doit monter quand on rentre dans l'intervalle »*.
>
> ```
>   minimum en a          minimum en b          minimum à l'intérieur
>   on ne peut aller      on ne peut aller      on peut aller des DEUX côtés
>   que vers la DROITE    que vers la GAUCHE
>       f doit monter          f doit monter        f doit monter dans les deux
>       vers la droite         vers la gauche       → f' ≥ 0 ET f' ≤ 0
>       f'(a) ≥ 0              f'(b) ≤ 0            → f'(t₀) = 0
> ```
>
> **Et voilà déjà KKT.** *À l'intérieur, on a une égalité parce qu'on peut bouger dans les deux sens ; au bord, on n'a qu'une inégalité parce qu'un seul sens est permis.* C'est mot pour mot ce que dira l'inéquation d'Euler (prop. 4.14) avec le cône des directions admissibles, puis la condition $\mu_j \ge 0$ de KKT (thm 6.1).

**Encadré ATTENTION (cours).** *La réciproque est fausse, il est possible que $f'(t_0)=0$ sans que $t_0$ soit un extremum local. Par exemple, $t_0 = 0$ pour $f(t) = t^3$.*

> **Le détail du contre-exemple.** $f(t)=t^3$, $f'(t) = 3t^2$, donc $f'(0)=0$. Mais dans **tout** voisinage de $0$ :
>
> $$f(-\eta) = -\eta^3 < 0 = f(0) < \eta^3 = f(\eta) \quad \text{pour } \eta > 0 .$$
>
> **Contrôle numérique** avec $\eta = 0{,}1$ : $f(-0{,}1) = -0{,}001$ et $f(0{,}1) = +0{,}001$. La valeur $f(0)=0$ est dépassée dans les deux sens : ni min ni max local.
>
> **Le vocabulaire à employer :** $0$ est un **point critique** de $f$ (déf. 4.12 en dimension $n$) mais pas un extremum. La condition $f'=0$ **filtre** les candidats, elle ne **conclut** jamais.

## 🔴 Concept 3 — La chaîne Rolle → accroissements finis → Taylor (§3.3)

Le cours annonce l'objectif : *« obtenir le théorème de Taylor-Young qui donne le développement limité d'une fonction autour d'un point […] Ceci nous sera utile pour déterminer des conditions du second ordre nécessaires ou suffisantes »*. Trois théorèmes s'enchaînent pour y arriver.

**Théorème 3.5 (cours) — Rolle.** Soit $f \in C([a,b])$ dérivable sur $\,]a,b[$ telle que $f(a)=f(b)$. Alors $\exists c \in \,]a,b[,\ f'(c)=0$.

**Théorème 3.6 (cours) — accroissements finis.** Soit $f \in C([a,b])$ dérivable sur $\,]a,b[$. Alors

$$\exists c \in \,]a,b[,\quad f(b) = f(a) + f'(c)(b-a), \qquad \text{soit} \qquad f'(c) = \frac{f(b)-f(a)}{b-a}.$$

> **Preuve reconstruite de Rolle — elle utilise TOUT le chapitre 2.**
>
> $f$ est continue sur le compact $[a,b]$ (thm 2.23) : par **Weierstrass (2.22)**, elle y atteint son minimum $m$ et son maximum $M$.
>
> - *Si $m = M$*, alors $f$ est constante et $f' \equiv 0$ sur $\,]a,b[$ : n'importe quel $c$ convient.
> - *Sinon*, l'une des deux bornes est différente de la valeur commune $f(a)=f(b)$. Elle est donc atteinte en un point $c$ qui **n'est ni $a$ ni $b$**, donc $c \in \,]a,b[$ : c'est un extremum **intérieur**. La **proposition 3.4** donne $f'(c)=0$. ∎
>
> **C'est le seul endroit du cours où le chapitre 2 sert à démontrer autre chose que de l'existence** : Weierstrass fournit ici le point $c$ dont on a besoin. Retenez l'enchaînement : *compacité → Weierstrass → l'extremum est intérieur → prop. 3.4 → dérivée nulle*.

> **Preuve reconstruite des accroissements finis — Rolle appliqué à la bonne fonction.** Posons
>
> $$g(t) = f(t) - f(a) - \frac{f(b)-f(a)}{b-a}\,(t-a).$$
>
> $g$ est continue sur $[a,b]$, dérivable sur $\,]a,b[$, et $g(a) = 0 = g(b)$ (vérification directe). Rolle donne $c$ avec $g'(c)=0$, c'est-à-dire
>
> $$f'(c) - \frac{f(b)-f(a)}{b-a} = 0 . \qquad \blacksquare$$
>
> **L'idée :** $g$ est *« $f$ moins sa corde »*. On redresse la corde à l'horizontale pour pouvoir appliquer Rolle. Ce truc — retrancher ce qui gêne pour retomber sur un théorème connu — est le plus fréquent en analyse.

**Théorème 3.7 (cours) — Taylor-Lagrange.** Soit $f \in C^n([a,b])$ dont la dérivée $(n+1)$-ième existe sur $\,]a,b[$. Alors $\exists c \in \,]a,b[$,

$$f(b) = f(a) + f'(a)(b-a) + \sum_{k=2}^{n} \frac{f^{(k)}(a)}{k!}(b-a)^k + \frac{f^{(n+1)}(c)}{(n+1)!}(b-a)^{n+1}.$$

**Remarque (cours).** Le théorème des accroissements finis est lui-même un **cas particulier** de Taylor-Lagrange, pour $n=0$.

> **Vérifiez-le à la main** : pour $n=0$, la somme est vide et il reste $f(b) = f(a) + \frac{f'(c)}{1!}(b-a)$, qui est exactement le théorème 3.6.

## 🔴 Concept 4 — Négligeabilité et Taylor-Young (déf. 3.8, thm 3.9)

**Définition 3.8 (cours).** Supposons $g(t) \neq 0$ sur un voisinage de $t_0$ sauf éventuellement en $t_0$. On dit que $f$ est **négligeable** par rapport à $g$ au voisinage de $t_0$ si

$$\lim_{t\to t_0}\frac{f(t)}{g(t)} = 0,$$

ce qu'on note $f(t) = \underset{t_0}{o}\bigl(g(t)\bigr)$. *Cela veut dire intuitivement que $f(t)$ est infiniment plus petite que $g(t)$ quand $t$ tend vers $t_0$.*

**Exemples du cours.** Si $f(t) = (t-1)^3$ et $g(t)=(t-1)^2$, alors $f = \underset{1}{o}(g)$. De même, si $f(t)=(t-t_0)^p$ et $g(t)=(t-t_0)^n$ avec $p > n$, alors $f = \underset{t_0}{o}(g)$.

> **Le sens à retenir en une phrase :** *plus l'exposant est grand, plus le terme est négligeable près du point*. Attention, c'est **l'inverse à l'infini** : loin de $0$, $t^3$ écrase $t^2$. Le petit $o$ dépend toujours du point où l'on se place, d'où le $t_0$ sous le $o$ dans la notation de M. Montaru.
>
> **Contrôle numérique** de $(t-1)^3 = \underset{1}{o}\bigl((t-1)^2\bigr)$ : le rapport vaut $t-1$, qui vaut $0{,}1$ en $t=1{,}1$, puis $0{,}01$ en $t=1{,}01$, puis $0{,}001$ en $t=1{,}001$. Il tend bien vers $0$.

**Théorème 3.9 (cours) — Taylor-Young.** Soit $f : \,]a,b[\, \to \mathbb{R}$ et $t_0 \in \,]a,b[$. Si $f$ est de classe $C^n$ sur $\,]a,b[$, alors

$$f(t) = f(t_0) + f'(t_0)(t-t_0) + \sum_{k=2}^{n}\frac{f^{(k)}(t_0)}{k!}(t-t_0)^k + \underset{t_0}{o}\bigl((t-t_0)^n\bigr).$$

**Exemple du cours :** $e^t = 1 + t + \dfrac{t^2}{2} + \underset{t\to0}{o}(t^2)$.

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle numérique de l'exemple du cours.</span>

En $t = 0{,}1$ :

$$e^{0{,}1} = 1{,}1051709\ldots \qquad \text{contre} \qquad 1 + 0{,}1 + 0{,}005 = 1{,}105 .$$

L'écart vaut $1{,}709\times10^{-4}$, soit environ $t^3/6 = 1{,}667\times10^{-4}$ — le terme suivant. En $t=0{,}01$ : $e^{0{,}01} = 1{,}010050167$, approximation $1{,}01005$, écart $1{,}67\times10^{-7}$, soit $t^3/6$ à nouveau. **L'écart est divisé par $1000$ quand $t$ est divisé par $10$ : c'est la signature d'un $o(t^2)$**, et même d'un $O(t^3)$.

</div>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — Taylor-Lagrange contre Taylor-Young, la distinction qui compte.</span>

|  | Taylor-Lagrange (3.7) | Taylor-Young (3.9) |
|---|---|---|
| Le reste | $\dfrac{f^{(n+1)}(c)}{(n+1)!}(b-a)^{n+1}$ — **explicite** | $o\bigl((t-t_0)^n\bigr)$ — **qualitatif** |
| Le point $c$ | existe, mais **inconnu** | pas de point |
| Hypothèse | $f^{(n+1)}$ existe | $f$ de classe $C^n$ seulement |
| Portée | **globale** sur $[a,b]$ | **locale** autour de $t_0$ |
| Sert à | **majorer une erreur** | **calculer une limite**, classer un extremum |

**La règle de choix :** si l'énoncé demande *« majorer »*, *« à $10^{-3}$ près »*, *« combien de termes faut-il »* → **Lagrange**. Si l'énoncé demande *« la nature de l'extremum »*, *« la limite de »*, *« la position par rapport à la tangente »* → **Young**.

Le cours n'utilisera plus que **Young** à partir d'ici : les propositions 3.10 et 3.11, puis les formules 4.3 et 4.5 en dimension $n$, sont toutes des Taylor-Young.

</div>

## 🔴 Concept 5 — Conditions du second ordre (prop. 3.10 et 3.11)

Cadre du cours : $t_0$ est un extremum local, et **on suppose $t_0 \in \mathring{I}$**, c'est-à-dire $\exists\epsilon>0,\ ]t_0-\epsilon,t_0+\epsilon[\,\subset I$. On sait déjà que nécessairement $f'(t_0)=0$.

**Proposition 3.10 (cours) — condition NÉCESSAIRE du second ordre.** Supposons $f$ de classe $C^2$ sur $\,]t_0-\epsilon,t_0+\epsilon[$.

- Si $t_0$ est un **minimum local**, alors $f''(t_0) \ge 0$.
- Si $t_0$ est un **maximum local**, alors $f''(t_0) \le 0$.

**Proposition 3.11 (cours) — condition SUFFISANTE du second ordre.** Supposons $f$ de classe $C^2$ sur $\,]t_0-\epsilon,t_0+\epsilon[$ **et que $f'(t_0)=0$**.

- Si $f''(t_0) > 0$ alors $t_0$ est un **minimum local strict**.
- Si $f''(t_0) < 0$ alors $t_0$ est un **maximum local strict**.

⚠️ **Le décalage entre les deux propositions n'est pas une coquille.** La nécessaire a un **$\ge$**, la suffisante un **$>$ strict**. C'est exactement ce qui laisse le cas $f''(t_0)=0$ **sans conclusion** :

| $f$ | $f'(0)$ | $f''(0)$ | Nature de $0$ |
|---|---|---|---|
| $t^4$ | $0$ | $0$ | **minimum** strict |
| $-t^4$ | $0$ | $0$ | **maximum** strict |
| $t^3$ | $0$ | $0$ | **ni l'un ni l'autre** |

**Les trois ont $f'(0)=f''(0)=0$ et trois natures différentes.** Aucun critère d'ordre 2 ne peut les séparer : il faut monter à l'ordre supérieur, ou étudier le signe directement.

> **Preuve reconstruite de la proposition 3.11 (cas $f''(t_0)>0$).** Taylor-Young à l'ordre 2 en $t_0$, avec $f'(t_0)=0$ :
>
> $$f(t) - f(t_0) = \frac{f''(t_0)}{2}(t-t_0)^2 + o\bigl((t-t_0)^2\bigr) = (t-t_0)^2\left[\frac{f''(t_0)}{2} + \varepsilon(t)\right]$$
>
> avec $\varepsilon(t) \to 0$. Comme $f''(t_0)/2 > 0$, il existe $\eta>0$ tel que $\lvert \varepsilon(t) \rvert < f''(t_0)/4$ pour $\lvert t-t_0 \rvert < \eta$. Le crochet est alors $\ge f''(t_0)/4 > 0$, et
>
> $$f(t)-f(t_0) \;\ge\; \frac{f''(t_0)}{4}(t-t_0)^2 \;>\; 0 \qquad \text{pour } 0 < \lvert t-t_0 \rvert < \eta .$$
>
> Donc $t_0$ est un minimum local **strict**. ∎
>
> **Où le « strict » de l'hypothèse est utilisé :** exactement à la ligne « il existe $\eta$ tel que… ». Si $f''(t_0)$ valait $0$, le crochet serait $\varepsilon(t)$, de signe inconnu, et l'argument tomberait. C'est *toute* la raison du décalage entre 3.10 et 3.11.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le critère qui tranche quand $f''(t_0)=0$.</span>

Soit $k \ge 2$ le **premier** ordre tel que $f^{(k)}(t_0) \neq 0$ (les précédentes étant nulles). Taylor-Young donne

$$f(t)-f(t_0) \sim \frac{f^{(k)}(t_0)}{k!}(t-t_0)^k .$$

- $k$ **pair** et $f^{(k)}(t_0) > 0$ → **minimum** local strict ;
- $k$ **pair** et $f^{(k)}(t_0) < 0$ → **maximum** local strict ;
- $k$ **impair** → **ni l'un ni l'autre** (le signe change en traversant $t_0$).

**Sur les trois exemples du tableau** : $t^4$ a $k=4$ pair, $f^{(4)}(0)=24>0$ → minimum ; $-t^4$ a $f^{(4)}(0)=-24<0$ → maximum ; $t^3$ a $k=3$ **impair** → rien .

⚠️ Ce critère **n'est pas au programme du cours** — mais il explique pourquoi le tableau ci-dessus se comporte ainsi, et le raisonnement (« regarder le premier terme non nul du DL ») est, lui, exactement celui que le cours emploie. On retrouvera d'ailleurs la même classification par parité au §1.6.4 du cours de M. Blanchet (fiche 606), pour la position d'une courbe par rapport à sa tangente.

</div>

## 🟠 Concept 6 — Fonctions convexes (déf. 3.12 à prop. 3.15)

**Définition 3.12 (cours).** Soit $I$ un intervalle de $\mathbb{R}$. $f$ est **convexe** sur $I$ si

$$\forall (t,t') \in I^2,\ \forall \lambda \in [0,1],\quad f\bigl(\lambda t + (1-\lambda)t'\bigr) \le \lambda f(t) + (1-\lambda) f(t').$$

*Géométriquement, cela signifie que la courbe de $f$ est au-dessous de toutes ses cordes.*

**Proposition 3.13 (cours).** Soit $I$ un intervalle **ouvert**. Si $f$ est dérivable sur $I$, alors $f$ est convexe sur $I$

$$\iff \text{la courbe de } f \text{ est au-dessus de chacune de ses tangentes} \iff f' \text{ est croissante sur } I .$$

Si $f$ est 2 fois dérivable sur $I$ : $f$ convexe sur $I \iff f'' \ge 0$ sur $I$.

**Définition 3.14 (cours).** $f$ est **strictement convexe** sur $I$ si

$$\forall (t,t') \in I^2 \text{ avec } t \neq t',\ \forall \lambda \in \,]0,1[,\quad f\bigl(\lambda t + (1-\lambda)t'\bigr) < \lambda f(t) + (1-\lambda)f(t').$$

*Géométriquement : la courbe est strictement au-dessous de toutes ses cordes.*

**Proposition 3.15 (cours).** Sur un intervalle ouvert, $f$ dérivable est strictement convexe

$$\iff \text{la courbe est strictement au-dessus de chacune de ses tangentes (sauf au point de contact)} \iff f' \text{ strictement croissante} .$$

Si $f$ est 2 fois dérivable : $f$ strictement convexe $\iff f'' > 0$ sur $I$.

⚠️ **Le piège de la proposition 3.15 (à connaître absolument).** L'énoncé du cours écrit bien $f'' > 0$ pour la stricte convexité **avec un « ⟺ »**. Il faut le lire avec l'énoncé exact : c'est une équivalence pour *« $f'$ strictement croissante »*, pas une équivalence en tout point. En pratique :

- $f'' > 0$ sur $I$ **⟹** $f$ strictement convexe. **Toujours vrai, c'est le sens qui sert.**
- $f$ strictement convexe **n'impose pas** $f''>0$ partout : $f(t)=t^4$ est strictement convexe sur $\mathbb{R}$ alors que $f''(0)=0$.

**Contrôle sur $t^4$** : $f''(t)=12t^2$, nulle en $0$ ; et pourtant $\lambda t^4 + (1-\lambda)t'^4 > (\lambda t + (1-\lambda)t')^4$ dès que $t\neq t'$ et $\lambda \in\,]0,1[$. Par exemple $t=-1$, $t'=1$, $\lambda = 1/2$ : $\tfrac12(1)+\tfrac12(1) = 1 > 0 = f(0)$.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — pourquoi la convexité est le seul cas confortable.</span>

Pour une fonction convexe dérivable sur un intervalle ouvert :

$$f'(t_0) = 0 \iff t_0 \text{ est un minimum } \textbf{global} .$$

**Preuve** : si $f$ est au-dessus de ses tangentes (prop. 3.13), alors pour tout $t$,

$$f(t) \ge f(t_0) + f'(t_0)(t-t_0) = f(t_0) \quad \text{lorsque } f'(t_0)=0 .$$

Autrement dit : **la condition nécessaire du premier ordre devient suffisante, et donne du global directement.** Plus besoin d'ordre 2, plus besoin de comparer des candidats.

C'est **exactement** le théorème 4.20 du chapitre 4 en dimension $n$ (*« $a$ est un minimum global de $f$ ssi $\nabla f(a) = 0$ »*), et c'est la raison pour laquelle toute l'optimisation appliquée cherche à se ramener à un problème convexe.

</div>

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | La bonne réaction | L'outil |
|---|---|---|
| « Déterminer les extrema de $f$ sur $[a,b]$ » | traiter **l'intérieur ET les deux bords** séparément | prop. 3.4 (trois cas) |
| « Montrer qu'il existe $c$ tel que $f'(c)=\dots$ » | trouver la bonne fonction auxiliaire | Rolle 3.5 / TAF 3.6 |
| « Majorer $\lvert f(b) - P(b) \rvert$ », « à $10^{-3}$ près » | reste **explicite** | Taylor-**Lagrange** 3.7 |
| « Calculer $\lim$ », « nature de l'extremum » | reste **qualitatif** | Taylor-**Young** 3.9 |
| « $f'(t_0)=0$, conclure » | **on ne conclut pas** : c'est un candidat | contre-exemple $t^3$ |
| « $f''(t_0)=0$ » | ordre 2 **muet** — monter en ordre ou étudier le signe | tableau $t^4/-t^4/t^3$ |
| « Montrer que $f$ est convexe » | dériver deux fois, signe de $f''$ | prop. 3.13 |
| « $f$ convexe et $f'(t_0)=0$ » | c'est un minimum **global**, terminé | prop. 3.13 |

<details class="details--riche">
<summary>

**Exercice résolu — extrema sur un segment : les trois cas de la proposition 3.4**

</summary>

**Énoncé.** Déterminer les extrema de $f(t) = t^3 - 3t$ sur $[0,3]$, en distinguant explicitement les trois situations de la proposition 3.4.

**Étape 1 — existence.** $[0,3]$ est compact (thm 2.23) et $f$ est polynomiale donc continue. **Weierstrass (2.22)** : $f$ atteint un minimum et un maximum sur $[0,3]$.

**Étape 2 — les candidats intérieurs.** $f'(t) = 3t^2-3 = 3(t-1)(t+1)$. Sur $\,]0,3[$, la seule racine est $t=1$. Par la proposition 3.4, **tout extremum intérieur est parmi $\{1\}$**.

**Étape 3 — les bords.** Les points $t=0$ et $t=3$ sont candidats **sans condition sur $f'$** — la proposition 3.4 y donne seulement une inégalité, qu'on peut vérifier après coup.

**Étape 4 — comparer les trois valeurs.**

$$f(0) = 0, \qquad f(1) = 1 - 3 = -2, \qquad f(3) = 27 - 9 = 18 .$$

**Conclusion.** Le **minimum** vaut $-2$, atteint en $t=1$ (intérieur) ; le **maximum** vaut $18$, atteint en $t=3$ (bord droit).

**Étape 5 — la vérification par la proposition 3.4** (c'est elle qui rapporte le point de rédaction) :

| Point | Situation | Ce que prédit 3.4 | Vérification |
|---|---|---|---|
| $t=1$ | minimum **intérieur** | $f'(1)=0$ | $3(1)-3 = 0$ |
| $t=3$ | maximum en $b$ | $f'(b) \ge 0$ | $f'(3) = 27-3 = 24 \ge 0$ |
| $t=0$ | ni min ni max | rien à vérifier | $f'(0) = -3$, et $f$ décroît vers la droite |

**Le contrôle de cohérence** : en $t=0$, $f'(0) = -3 < 0$. Si $0$ était un minimum local, la proposition 3.4 exigerait $f'(0) \ge 0$ — c'est faux, donc $0$ n'est **pas** un minimum. Si $0$ était un maximum local, elle exigerait $f'(0) \le 0$ — vérifié, donc **on ne peut pas exclure** un maximum *local*. Et de fait $f(t) < f(0)$ pour $t$ juste après $0$ : $0$ **est** un maximum local, mais pas global.

⚠️ **L'erreur classique sur cet exercice** : ne chercher que les racines de $f'$ et répondre « minimum $-2$ en $1$, pas de maximum ». **Le maximum est au bord**, et il est le double en valeur de tout le reste. La proposition 3.4 existe précisément pour vous forcer à regarder les bords.

**Confirmation numérique** sur une grille de $[0,3]$ au pas $10^{-4}$ : minimum $-2{,}000000$ atteint en $t=1{,}0000$, maximum $18{,}000000$ atteint en $t=3{,}0000$.

</details>

<details class="details--riche">
<summary>

**Exercice résolu — quand $f''(t_0)=0$ : le tableau des trois destins, démontré**

</summary>

**Énoncé.** Pour $f(t)=t^4$, $g(t)=-t^4$ et $h(t)=t^3$, montrer que $f'(0)=f''(0)=0$ dans les trois cas, puis déterminer la nature de $0$ pour chacune. Que peut-on en conclure sur les propositions 3.10 et 3.11 ?

**Les dérivées.**

|  | $f=t^4$ | $g=-t^4$ | $h=t^3$ |
|---|---|---|---|
| dérivée première | $4t^3$ | $-4t^3$ | $3t^2$ |
| en $0$ | $0$ | $0$ | $0$ |
| dérivée seconde | $12t^2$ | $-12t^2$ | $6t$ |
| en $0$ | $0$ | $0$ | $0$ |

Les trois vérifient donc $f'(0) = f''(0) = 0$ : **la proposition 3.11 ne s'applique à aucune** (elle exige une inégalité stricte).

**Nature, par étude directe du signe.**

- $f(t) - f(0) = t^4 > 0$ pour tout $t \neq 0$ → **minimum global strict**.
- $g(t) - g(0) = -t^4 < 0$ pour tout $t \neq 0$ → **maximum global strict**.
- $h(t) - h(0) = t^3$, **du signe de $t$** → ni min ni max.

**Contrôle numérique en $t = \pm 0{,}1$.**

|  | $t=-0{,}1$ | $t=0$ | $t=+0{,}1$ | lecture |
|---|---|---|---|---|
| $t^4$ | $10^{-4}$ | $0$ | $10^{-4}$ | creux des deux côtés → min |
| $-t^4$ | $-10^{-4}$ | $0$ | $-10^{-4}$ | bosse des deux côtés → max |
| $t^3$ | $-10^{-3}$ | $0$ | $+10^{-3}$ | traverse → rien |

**Ce qu'on en conclut sur les deux propositions.**

1. **La 3.10 est bien vérifiée** dans les trois cas — et ne dit rien d'utile. Pour $f=t^4$ (minimum), elle affirme $f''(0)\ge0$ : vrai, $f''(0)=0$. Pour $g=-t^4$ (maximum), elle affirme $g''(0)\le0$ : vrai aussi, $g''(0)=0$. **Une condition nécessaire non stricte ne discrimine rien quand elle est saturée.**
2. **La 3.11 ne s'applique pas**, et c'est une bonne chose : si elle s'appliquait, elle serait fausse, puisque les trois fonctions ont les mêmes valeurs de $f'(0)$ et $f''(0)$ pour trois natures différentes. **Le « strict » de son hypothèse est ce qui la rend vraie.**

**La leçon de méthode.** Quand l'ordre 2 est muet ($f''(t_0)=0$), **le cours ne donne aucun théorème** : il faut revenir au signe de $f(t)-f(t_0)$, ce qui est toujours possible et souvent immédiat. C'est exactement ce que dira l'encadré du chapitre 4 pour le cas $rt-s^2=0$ : *« on ne peut rien conclure »* — comprendre : par ce critère, pas en général.

</details>

<details class="details--riche">
<summary>

**Exercice résolu — les accroissements finis comme outil de majoration**

</summary>

**Énoncé.** Montrer que pour tous réels $x,y$ : $\lvert \sin x - \sin y \rvert \le \lvert x-y \rvert$. Puis majorer $\lvert e^{0{,}1} - 1{,}105 \rvert$ à l'aide de Taylor-Lagrange.

**Partie 1 — l'inégalité sur le sinus.** Supposons $x < y$ (le cas $x=y$ est trivial, et l'inégalité est symétrique). La fonction $\sin$ est continue sur $[x,y]$ et dérivable sur $\,]x,y[$. Le **théorème 3.6** donne $c \in \,]x,y[$ tel que

$$\sin y - \sin x = \cos(c)\,(y-x).$$

Comme $\lvert \cos c \rvert \le 1$ :

$$\lvert \sin y - \sin x \rvert = \lvert \cos c \rvert \cdot \lvert y - x \rvert \le \lvert y-x \rvert . \qquad \blacksquare$$

**Contrôle numérique.** Pour $x=0$ et $y=1$ : $\lvert \sin 1 - \sin 0 \rvert = 0{,}8414710 \le 1$ .

Pour $x=1$, $y=1{,}001$ : l'écart vaut $0{,}00053988$, contre $\lvert y-x \rvert = 0{,}001$ . **Et on peut ici exhiber le $c$ du théorème**, ce qui est rare : le rapport

$$\frac{\sin(1{,}001)-\sin(1)}{0{,}001} = 0{,}5398815 = \cos(c)$$

donne $c = \arccos(0{,}5398815) = 1{,}0005000$, effectivement dans $\,]1\,;\,1{,}001[$ — et pratiquement **au milieu** de l'intervalle, ce qui est le comportement attendu quand l'intervalle est petit.

⚠️ Notez que $\cos(1) = 0{,}5403023 \neq 0{,}5398815$ : le $c$ du TAF n'est **pas** l'extrémité gauche. Confondre les deux est une erreur fréquente — le théorème affirme qu'un tel $c$ **existe** dans l'intervalle **ouvert**, pas qu'il vaut $a$.

**La formulation à retenir.** Le TAF **transforme un contrôle sur la dérivée en un contrôle sur la fonction**. C'est la définition d'une fonction lipschitzienne : $\lvert f' \rvert \le M$ sur un intervalle $\Rightarrow$ $f$ est $M$-lipschitzienne dessus.

**Partie 2 — majorer l'erreur du DL de l'exponentielle.** Appliquons **Taylor-Lagrange (3.7)** à $f=\exp$ entre $a=0$ et $b=0{,}1$, avec $n=2$ :

$$e^{0{,}1} = 1 + 0{,}1 + \frac{0{,}1^2}{2} + \frac{e^{c}}{3!}\,0{,}1^3 \quad \text{pour un } c \in \,]0,\,0{,}1[ .$$

Le terme d'erreur est donc $\dfrac{e^c}{6}\times 10^{-3}$ avec $0 < c < 0{,}1$, donc $1 < e^c < e^{0{,}1} < 1{,}106$ :

$$\frac{10^{-3}}{6} < \text{erreur} < \frac{1{,}106 \times 10^{-3}}{6}, \qquad \text{soit} \qquad 1{,}667\times10^{-4} < \text{erreur} < 1{,}843\times10^{-4}.$$

**Vérification exacte.** $e^{0{,}1} = 1{,}1051709180756477$ et $1 + 0{,}1 + 0{,}005 = 1{,}105$, donc l'erreur réelle vaut

$$1{,}7091807564771\times10^{-4},$$

bien dans l'encadrement $[1{,}667 ; 1{,}843]\times10^{-4}$.

**Ce que Taylor-Young n'aurait pas pu faire.** Young dit seulement que l'erreur est un $o(t^2)$ — un renseignement **qualitatif**, sans aucun nombre. Ici l'énoncé demandait une **majoration chiffrée** : seul Lagrange, avec son reste explicite, la fournit. **C'est le critère de choix entre les deux théorèmes.**

</details>

<details class="details--riche">
<summary>

**Exercice résolu — convexité : trois fonctions, trois statuts**

</summary>

**Énoncé.** Étudier la convexité de $f_1(t)=t^2$, $f_2(t)=t^4$, $f_3(t)=\lvert t \rvert$ sur $\mathbb{R}$. Laquelle est strictement convexe ? Pour lesquelles la proposition 3.13 s'applique-t-elle ?

**$f_1(t)=t^2$.** $f_1'' (t)= 2 > 0$ partout. Par la **proposition 3.15**, $f_1$ est **strictement convexe**. Son unique point critique est $t=0$ ($f_1'(0)=0$), donc **minimum global** — et par stricte convexité, il est unique.

**$f_2(t)=t^4$.** $f_2''(t) = 12t^2 \ge 0$ partout : la **proposition 3.13** donne la **convexité**. Mais $f_2''(0)=0$, donc la caractérisation par $f''>0$ de la proposition 3.15 **ne s'applique pas en $0$**.

$f_2$ est-elle strictement convexe pour autant ? **Oui** — il faut le voir sur $f_2' = 4t^3$, qui est **strictement croissante** sur $\mathbb{R}$ (c'est le critère du milieu de la proposition 3.15, celui qui marche ici). Une vérification directe : pour $t=-1$, $t'=1$, $\lambda=\tfrac12$,

$$f_2\left(\tfrac{-1+1}{2}\right) = f_2(0) = 0 \quad < \quad \tfrac12 f_2(-1) + \tfrac12 f_2(1) = \tfrac12 + \tfrac12 = 1 . \ \checkmark$$

**C'est la démonstration que « $f''>0$ » est suffisant mais non nécessaire à la stricte convexité.** Retenez cet exemple : c'est le pendant exact du cas $f''(t_0)=0$ de la proposition 3.11.

**$f_3(t)=\lvert t \rvert$.** Elle **n'est pas dérivable en $0$** : ni 3.13 ni 3.15 ne s'appliquent. Il faut revenir à la **définition 3.12** :

$$\lvert \lambda t + (1-\lambda)t' \rvert \le \lambda\lvert t \rvert + (1-\lambda)\lvert t' \rvert$$

est vraie pour tout $\lambda \in [0,1]$ — c'est l'inégalité triangulaire combinée à l'homogénéité, soit exactement les axiomes 2 et 3 de la **définition 2.2** d'une norme (fiche 600). **Toute norme est convexe.**

Est-elle *strictement* convexe ? **Non** : pour $t=1$, $t'=2$, $\lambda=\tfrac12$,

$$f_3(1{,}5) = 1{,}5 = \tfrac12(1) + \tfrac12(2) = 1{,}5 .$$

Il y a **égalité**, alors que $t \neq t'$ et $\lambda \in \,]0,1[$ : la définition 3.14 est violée. La corde **coïncide** avec la courbe sur $[1,2]$.

**Le bilan.**

|  | $f''$ | convexe | strictement convexe | dérivable |
|---|---|---|---|---|
| $t^2$ | $2>0$ |  |  |  |
| $t^4$ | $12t^2 \ge 0$, nulle en $0$ |  | (par $f'$ str. croissante) |  |
| $\lvert t \rvert$ | n'existe pas en $0$ | (par la déf. 3.12) |  | en $0$ |

**Ce que l'exercice enseigne.** Les propositions 3.13 et 3.15 sont des **outils de calcul commodes**, pas la définition. Quand elles ne s'appliquent pas — non-dérivabilité, ou $f''$ qui s'annule — **on revient à la définition 3.12**, qui, elle, marche toujours.

</details>

## Comment résoudre ce type d'exercice

**Protocole « déterminer les extrema de $f$ sur $I$ » en dimension 1 — six étapes.**

1. **Existence** (fiche 600). $I$ compact → Weierstrass. Sinon, coercivité, ou étude des limites aux bornes.
2. **Dérivabilité.** Où $f$ est-elle dérivable ? Les points de non-dérivabilité sont des **candidats à part entière** (comme $0$ pour $\lvert t \rvert$).
3. **Points critiques intérieurs.** Résoudre $f'(t)=0$ sur $\mathring I$. **Ce sont des candidats, pas des réponses** (contre-exemple $t^3$).
4. **Les bords.** Ajouter les extrémités de $I$ à la liste. Ne jamais les oublier — la proposition 3.4 y donne une inégalité, pas une égalité.
5. **Classer chaque candidat intérieur.**
  - $f''(t_0)>0$ → min local strict ; $f''(t_0)<0$ → max local strict (prop. 3.11).
  - $f''(t_0)=0$ → **aucun théorème** : signe de $f(t)-f(t_0)$, ou tableau de variations.
6. **Comparer toutes les valeurs** $f$(candidats) $\cup$ $f$(bords) pour trancher le global.

**Le raccourci quand $f$ est convexe.** Étapes 3 et 5 fusionnent : $f'(t_0)=0$ **suffit**, et donne le minimum **global** d'emblée. Vérifier la convexité en premier ($f''\ge0$) fait souvent gagner la moitié de l'exercice.

**Comment choisir la fonction auxiliaire pour Rolle.** L'énoncé demande $\exists c,\ \Phi(c) = 0$. On cherche $g$ telle que $g' = \Phi$ et $g(a)=g(b)$. Les deux cas usuels :

- $\Phi(c) = f'(c) - \dfrac{f(b)-f(a)}{b-a}$ → prendre $g = f - $ la corde (c'est la preuve du TAF) ;
- $\Phi(c) = f'(c)g(c) - \dots$ → penser à un produit ou un quotient.

## 🔴 Common mistakes

1. **Écrire $f'(t_0)=0$ pour un extremum au bord.** Faux : la proposition 3.4 donne $f'(a)\ge0$ ou $f'(b)\le0$ pour un minimum. L'égalité est réservée à l'**intérieur**.
2. **Conclure d'un point critique qu'il est un extremum.** $t^3$ en $0$ : $f'(0)=0$ et ce n'est ni un min ni un max. C'est l'encadré ATTENTION du cours.
3. **Oublier les bords dans la liste des candidats.** Dans l'exercice $t^3-3t$ sur $[0,3]$, le maximum est en $t=3$ et vaut $18$, contre $-2$ pour l'unique point critique.
4. **Conclure quand $f''(t_0)=0$.** La proposition 3.11 exige une inégalité **stricte**. $t^4$, $-t^4$ et $t^3$ ont les mêmes $f'(0)$ et $f''(0)$ pour trois natures différentes.
5. **Confondre 3.10 et 3.11.** La nécessaire ($\ge$) sert à **éliminer** ; la suffisante ($>$) sert à **conclure**. Les utiliser à l'envers est l'erreur la plus coûteuse du chapitre.
6. **Confondre Taylor-Lagrange et Taylor-Young.** Lagrange a un reste **explicite** avec un point $c$ inconnu et sert à **majorer** ; Young a un $o$ et sert à **classer** ou **calculer une limite**.
7. **Croire que le $c$ de Rolle ou du TAF est unique ou calculable.** Les théorèmes affirment son **existence**, rien de plus. Chercher à le calculer est presque toujours hors sujet.
8. **Oublier l'hypothèse $f(a)=f(b)$ dans Rolle.** Sans elle, l'énoncé est faux ($f(t)=t$ sur $[0,1]$ n'a aucun point à dérivée nulle).
9. **Écrire $f$ strictement convexe $\Rightarrow f''>0$.** Faux : $t^4$ est strictement convexe et $f''(0)=0$. Seul le sens $f''>0 \Rightarrow$ strictement convexe est utilisable.
10. **Oublier que $\lvert t \rvert$ est convexe.** La non-dérivabilité n'empêche pas la convexité : la définition 3.12 ne parle pas de dérivée.
11. **Se tromper de sens dans le petit $o$.** $(t-1)^3 = o((t-1)^2)$ **près de $1$** ; à l'infini, c'est l'inverse. Le point de référence fait partie de la notation.
12. **Utiliser la proposition 3.4 sans dérivabilité au bord.** L'énoncé suppose $f$ dérivable **sur $[a,b]$**, dérivées unilatérales comprises (voir la remarque qui suit la définition 3.2).

## 📌 Ultimate Review

**Le chapitre 3 en un paragraphe.** À l'intérieur d'un intervalle, un extremum annule la dérivée ; **au bord, il ne donne qu'une inégalité de signe** — c'est la proposition 3.4, et c'est déjà l'idée de KKT. La réciproque est fausse ($t^3$). Pour aller plus loin, on construit l'outillage : Rolle (démontré par Weierstrass), qui donne les accroissements finis, qui se généralisent en Taylor-Lagrange, dont la version locale est Taylor-Young. Celle-ci fournit les conditions d'ordre 2 : $f''(t_0)\ge0$ est **nécessaire** pour un minimum, $f''(t_0)>0$ est **suffisant** — et le cas $f''(t_0)=0$ n'est traité par aucun théorème. Enfin, si $f$ est convexe ($f''\ge0$), tout se simplifie : $f'(t_0)=0$ devient nécessaire **et** suffisant, et donne le minimum **global**.

**Les six énoncés à savoir citer.**

| N° | Énoncé | Ce qu'il apporte |
|---|---|---|
| **3.4** | extremum : $f'=0$ à l'intérieur, **inégalité** au bord | le seul énoncé qui distingue bord et intérieur |
| **3.5** | **Rolle** : $f(a)=f(b) \Rightarrow \exists c,\ f'(c)=0$ | démontré par Weierstrass + prop. 3.4 |
| **3.6** | **TAF** : $f(b)=f(a)+f'(c)(b-a)$ | majorer $f$ en majorant $f'$ |
| **3.7** | **Taylor-Lagrange** : reste explicite en $c$ | erreurs **chiffrées** |
| **3.9** | **Taylor-Young** : reste en $o$ | limites, nature des extrema |
| **3.11** | $f'(t_0)=0$ et $f''(t_0)>0$ ⟹ min local **strict** | conclure — avec un $>$ strict |

**Les trois formules-réflexes.**

$$y = f(t_0)+f'(t_0)(t-t_0), \qquad e^t = 1+t+\frac{t^2}{2}+\underset{0}{o}(t^2), \qquad f \text{ convexe} \iff f'' \ge 0 .$$

**Les trois fonctions à connaître par cœur.** $t^3$ (point critique sans extremum) · $t^4$ (extremum avec $f''=0$, et strictement convexe sans $f''>0$) · $\lvert t \rvert$ (convexe sans être dérivable).

**Ce qui se transporte au chapitre 4.** Tout, terme à terme : $f' \to \nabla f$, $f'' \to H_f$, « $\ge 0$ » → « semi-définie positive », « $>0$ » → « définie positive », « au-dessus de ses tangentes » → « au-dessus de ses plans tangents ». **Si vous maîtrisez ce chapitre, le chapitre 4 n'a presque rien de neuf.**

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Énoncer la proposition 3.4 dans ses six cas, puis la résumer en une phrase.**

</summary>

Pour $f$ dérivable sur $[a,b]$ admettant un **minimum** local en $t_0$ : $f'(a)\ge0$ si $t_0=a$ ; $f'(t_0)=0$ si $t_0\in\,]a,b[$ ; $f'(b)\le0$ si $t_0=b$. Pour un **maximum**, les trois signes s'inversent : $f'(a)\le0$, $f'(t_0)=0$, $f'(b)\ge0$.

**En une phrase** : *pour un minimum, $f$ doit monter quand on rentre dans l'intervalle* — à l'intérieur on peut rentrer des deux côtés, donc les deux inégalités se combinent en une égalité.

</details>

<details class="details--riche">
<summary>

**2. Donner le contre-exemple du cours à la réciproque de la proposition 3.4, et le justifier numériquement.**

</summary>

$f(t)=t^3$ en $t_0=0$ : $f'(t)=3t^2$ donc $f'(0)=0$, mais dans tout voisinage de $0$, $f(-\eta)=-\eta^3<0<\eta^3=f(\eta)$.

**Numériquement** avec $\eta=0{,}1$ : $f(-0{,}1)=-0{,}001 < f(0)=0 < f(0{,}1)=0{,}001$. La valeur en $0$ est dépassée dans les deux sens : ni minimum ni maximum local.

Vocabulaire : $0$ est un **point critique** sans être un extremum.

</details>

<details class="details--riche">
<summary>

**3. Démontrer le théorème de Rolle. Quel théorème du chapitre 2 y intervient ?**

</summary>

$f$ continue sur le compact $[a,b]$ (thm 2.23) : par **Weierstrass (2.22)**, elle y atteint son minimum $m$ et son maximum $M$.

- Si $m=M$, $f$ est constante et $f'\equiv0$ sur $\,]a,b[$.
- Sinon, l'une des deux bornes diffère de $f(a)=f(b)$, donc elle est atteinte en un point $c \notin \{a,b\}$, c'est-à-dire $c\in\,]a,b[$. C'est un extremum **intérieur** : la proposition 3.4 donne $f'(c)=0$. ∎

C'est **Weierstrass** qui intervient — le seul endroit du cours où le chapitre 2 sert à autre chose qu'une question d'existence.

</details>

<details class="details--riche">
<summary>

**4. Déduire le théorème des accroissements finis de celui de Rolle.**

</summary>

Poser $g(t) = f(t) - f(a) - \dfrac{f(b)-f(a)}{b-a}(t-a)$, c'est-à-dire « $f$ moins sa corde ».

$g$ est continue sur $[a,b]$, dérivable sur $\,]a,b[$, et $g(a)=g(b)=0$. Rolle donne $c\in\,]a,b[$ avec $g'(c)=0$, soit $f'(c)=\dfrac{f(b)-f(a)}{b-a}$. ∎

**Le principe général** : retrancher le terme gênant pour retomber sur les hypothèses d'un théorème connu.

</details>

<details class="details--riche">
<summary>

**5. Quelle est la différence entre Taylor-Lagrange (3.7) et Taylor-Young (3.9) ? Quand utiliser chacun ?**

</summary>

**Lagrange** : reste **explicite** $\dfrac{f^{(n+1)}(c)}{(n+1)!}(b-a)^{n+1}$ avec $c$ existant mais inconnu ; résultat **global** sur $[a,b]$ ; sert à **majorer une erreur chiffrée**.

**Young** : reste $o\bigl((t-t_0)^n\bigr)$, purement **qualitatif** ; résultat **local** autour de $t_0$ ; hypothèse plus faible ($f \in C^n$ suffit) ; sert à **calculer des limites** et à **classer les extrema**.

**Le critère** : « à $10^{-3}$ près », « majorer » → Lagrange. « Nature de l'extremum », « limite » → Young.

Le TAF (3.6) est Taylor-Lagrange pour $n=0$.

</details>

<details class="details--riche">
<summary>

**6. Pourquoi la proposition 3.10 a-t-elle un $\ge$ et la 3.11 un $>$ strict ?**

</summary>

Parce que le cas $f''(t_0)=0$ est **indécidable** à l'ordre 2. Les trois fonctions $t^4$, $-t^4$, $t^3$ ont toutes $f'(0)=f''(0)=0$ et sont respectivement un minimum strict, un maximum strict, et ni l'un ni l'autre.

- La **3.10** ($\ge$) reste vraie dans les trois cas — et n'apprend rien : elle **élimine** seulement les candidats à $f''<0$.
- La **3.11** ($>$) exclut délibérément le cas $0$ ; c'est ce qui la rend vraie. Dans sa preuve, la stricte positivité sert à absorber le $\varepsilon(t)$ du reste de Taylor-Young : sans elle, le signe du crochet est inconnu.

</details>

<details class="details--riche">
<summary>

**7. Énoncer les trois caractérisations de la convexité de la proposition 3.13.**

</summary>

Sur un intervalle **ouvert** $I$, pour $f$ dérivable, il y a équivalence entre :

1. $f$ est convexe sur $I$ ;
2. la courbe de $f$ est **au-dessus de chacune de ses tangentes** ;
3. $f'$ est **croissante** sur $I$.

Si $f$ est deux fois dérivable, on ajoute : $f$ convexe $\iff f'' \ge 0$ sur $I$.

La définition 3.12, elle, dit que la courbe est **au-dessous de ses cordes** — ne confondez pas les deux : au-dessus des **tangentes**, au-dessous des **cordes**.

</details>

<details class="details--riche">
<summary>

**8. Montrer que « $f$ strictement convexe » n'entraîne pas « $f'' > 0$ partout ».**

</summary>

Contre-exemple : $f(t)=t^4$ sur $\mathbb{R}$. On a $f''(t) = 12t^2$, donc $f''(0)=0$.

Pourtant $f$ est strictement convexe, car $f'(t)=4t^3$ est **strictement croissante** sur $\mathbb{R}$ (deuxième caractérisation de la proposition 3.15).

Vérification directe avec $t=-1$, $t'=1$, $\lambda=\frac12$ : $f(0)=0 < \frac12 f(-1)+\frac12 f(1) = 1$.

**Seul le sens $f''>0 \Rightarrow$ strictement convexe est utilisable.**

</details>

<details class="details--riche">
<summary>

**9. Si $f$ est convexe et dérivable sur un ouvert, que devient la condition $f'(t_0)=0$ ?**

</summary>

Elle devient **nécessaire et suffisante**, et donne un minimum **global** — pas seulement local.

**Preuve** : $f$ convexe est au-dessus de ses tangentes (prop. 3.13), donc pour tout $t$,

$$f(t) \ge f(t_0) + f'(t_0)(t-t_0) = f(t_0) \quad \text{si } f'(t_0)=0 .$$

**Conséquences pratiques** : plus besoin de la condition d'ordre 2, plus besoin de comparer plusieurs candidats. C'est le théorème 4.20 en dimension $n$, et la raison d'être de toute l'optimisation convexe.

</details>

<details class="details--riche">
<summary>

**10. Établir la correspondance terme à terme entre ce chapitre et le chapitre 4.**

</summary>

| Dimension 1 (ch. 3) | Dimension $n$ (ch. 4) |
|---|---|
| $f'(t_0)=0$ | $\nabla f(a)=0$ — équation d'Euler (prop. 4.11) |
| $f''(t_0) \ge 0$ | $H_f(a)$ semi-définie positive (prop. 4.11) |
| $f''(t_0) > 0$ | $H_f(a)$ définie positive (thm 4.15) |
| $f''(t_0) < 0$ | $H_f(a)$ définie négative (thm 4.15) |
| aucun équivalent | $H_f(a)$ **indéfinie** → point **selle** (thm 4.15) |
| $f'$ croissante | $\langle \nabla f(x)-\nabla f(y),\,x-y\rangle \ge 0$ (prop. 4.18) |
| au-dessus des tangentes | au-dessus des **plans tangents** (prop. 4.18) |
| $f'(t_0)=0$ + convexe ⟹ min global | thm 4.20 |
| condition **au bord** (prop. 3.4) | **inéquation d'Euler** sur le cône $C(a)$ (prop. 4.14) |

**La seule nouveauté du chapitre 4** est le **point selle** : en dimension 1, une dérivée seconde est un nombre, elle a un signe ; en dimension $n$, une hessienne peut être positive dans une direction et négative dans une autre.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Taux d'accroissement (déf. 3.1) ? | $\Delta(t)=\dfrac{f(t)-f(t_0)}{t-t_0}$ |
| Équation de la tangente ? | $y=f(t_0)+f'(t_0)(t-t_0)$ |
| Minimum local intérieur ⟹ ? | $f'(t_0)=0$ |
| Minimum local en $a$ ⟹ ? | $f'(a)\ge0$ |
| Minimum local en $b$ ⟹ ? | $f'(b)\le0$ |
| Maximum local en $a$ ⟹ ? | $f'(a)\le0$ |
| Maximum local en $b$ ⟹ ? | $f'(b)\ge0$ |
| La phrase qui résume 3.4 ? | Pour un minimum, $f$ doit **monter en rentrant** |
| Ce que 3.4 annonce ? | L'inéquation d'Euler (4.14) et **KKT** |
| Réciproque de « $f'(t_0)=0$ » ? | **Fausse** |
| Le contre-exemple du cours ? | $f(t)=t^3$ en $t_0=0$ |
| Nom de $t_0$ tel que $f'(t_0)=0$ ? | **Point critique** |
| Théorème de Rolle ? | $f(a)=f(b) \Rightarrow \exists c\in\,]a,b[,\ f'(c)=0$ |
| Il se démontre avec ? | **Weierstrass** + proposition 3.4 |
| Accroissements finis ? | $f(b)=f(a)+f'(c)(b-a)$ |
| Sa preuve ? | Rolle appliqué à « $f$ moins sa corde » |
| Le TAF est Taylor-Lagrange pour ? | $n=0$ |
| Reste de Taylor-Lagrange ? | $\dfrac{f^{(n+1)}(c)}{(n+1)!}(b-a)^{n+1}$ |
| Reste de Taylor-Young ? | $o\bigl((t-t_0)^n\bigr)$ |
| Lequel pour majorer une erreur ? | **Lagrange** |
| Lequel pour la nature d'un extremum ? | **Young** |
| Définition de $f=o(g)$ en $t_0$ ? | $f/g \to 0$ quand $t\to t_0$ |
| $(t-1)^3$ par rapport à $(t-1)^2$ en $1$ ? | **Négligeable** |
| DL de $e^t$ à l'ordre 2 ? | $1+t+\dfrac{t^2}{2}+o(t^2)$ |
| Erreur en $t=0{,}1$ ? | $1{,}709\times10^{-4}$, soit $\approx t^3/6$ |
| Condition **nécessaire** d'ordre 2 (min) ? | $f''(t_0)\ge0$ |
| Condition **suffisante** d'ordre 2 (min) ? | $f'(t_0)=0$ **et** $f''(t_0)>0$ |
| Pourquoi l'une $\ge$ et l'autre $>$ ? | Le cas $f''(t_0)=0$ est **indécidable** |
| Les trois fonctions à $f'(0)=f''(0)=0$ ? | $t^4$ (min), $-t^4$ (max), $t^3$ (rien) |
| Que faire si $f''(t_0)=0$ ? | Signe de $f(t)-f(t_0)$ — aucun théorème |
| Définition 3.12 de la convexité ? | Sous les **cordes** |
| Caractérisation par les tangentes ? | Au-**dessus** de ses tangentes |
| Caractérisation par $f'$ ? | $f'$ **croissante** |
| Caractérisation par $f''$ ? | $f''\ge0$ |
| Stricte convexité par $f''$ ? | $f''>0$ **suffit**, n'est pas nécessaire |
| Le contre-exemple ? | $t^4$ : strictement convexe, $f''(0)=0$ |
| $\lvert t \rvert$ est-elle convexe ? | **Oui** — par la définition 3.12 |
| Strictement convexe ? | **Non** — égalité sur $[1,2]$ |
| Toute norme est ? | **Convexe** (axiomes 2 et 3 de la déf. 2.2) |
| $f$ convexe et $f'(t_0)=0$ ⟹ ? | Minimum **global** |
| Pourquoi ? | $f(t)\ge f(t_0)+f'(t_0)(t-t_0)=f(t_0)$ |
| Son équivalent en dimension $n$ ? | **Théorème 4.20** |
| $f'' \to$ dimension $n$ ? | La matrice **hessienne** $H_f$ |
| « $f''>0$ » $\to$ dimension $n$ ? | Hessienne **définie positive** |
| La nouveauté du chapitre 4 ? | Le **point selle** (hessienne indéfinie) |
| $\lvert \sin x - \sin y \rvert \le$ ? | $\lvert x-y \rvert$, par le TAF |
| Extrema de $t^3-3t$ sur $[0,3]$ ? | min $-2$ en $t=1$, max $18$ en $t=3$ |
| L'erreur classique sur cet exercice ? | **Oublier le bord** $t=3$ |
|  |  |
