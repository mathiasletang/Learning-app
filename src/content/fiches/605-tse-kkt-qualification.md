# Fiche 605 — Contraintes d'inégalité : Karush-Kuhn-Tucker, qualification et méthodologie

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Montaru, *Optimisation*, TSE, 16 mars 2025 — **chapitre 6**, p. 33–36 |
| **Difficulté** | Must know — le point d'arrivée de tout le cours |
| **Temps d'étude estimé** | 3 h |
| **Prérequis** | Fiches 600 (compacité), 603 (cône admissible), 604 (extrema liés, multiplicateurs) |
| **Concepts clés** | Contrainte active, ensemble $J(a)$, théorème KKT, admissibilité $\mu_j\ge0$, complémentarité, Mangasarian-Fromovitz, contraintes affines (QCA), condition de Slater, méthodologie en 5 étapes |
| **Poids à l'examen** | C'est **le dernier chapitre**, donc celui qui structure le sujet. Le cours annonce explicitement qu'on va **refaire les exercices 3 et 4 du TD3** (les exercices 4.3 et 4.4 du chapitre 4) avec KKT : les deux résolutions comparées sont ci-dessous. La condition $\mu_j\ge0$ et son asymétrie min/max sont **la** question de cours. |

> **Convention.** Les énoncés numérotés et les explications encadrées sont ceux de M. Montaru. Les corrigés des exemples 11 à 14 et les résolutions comparées sont rédigés pour cette fiche.

## 🎯 Vue d'ensemble

```
LA CONTRAINTE GÉNÉRALE     A = { x ∈ U :  g₁ = … = g_p = 0        (ÉGALITÉS)
                                          h₁ ≤ 0, … , h_q ≤ 0 }   (INÉGALITÉS)

  ⚠ TOUJOURS réécrire les inégalités sous la forme « ≤ 0 »
     x ≥ 0        devient    h = −x  ≤ 0
     x + y ≤ 1    devient    h = x+y−1 ≤ 0


CONTRAINTE ACTIVE EN a       hⱼ(a) = 0   →  j ∈ J(a)
CONTRAINTE INACTIVE EN a     hⱼ(a) < 0   →  j ∉ J(a)


LE THÉORÈME KKT (6.1)   a qualifié,  a MINIMUM local de f  ⟹

     ∇f(a) + Σᵢ λᵢ ∇gᵢ(a) + Σⱼ μⱼ ∇hⱼ(a) = 0

     μⱼ ≥ 0                (ADMISSIBILITÉ)      ← nouveau, et ASYMÉTRIQUE
     μⱼ · hⱼ(a) = 0        (COMPLÉMENTARITÉ)    ← nouveau

  la complémentarité dit :  contrainte INACTIVE  ⟹  μⱼ = 0
                            μⱼ > 0              ⟹  contrainte ACTIVE
  → seules les contraintes SATURÉES pèsent dans l'équation


POUR UN MAXIMUM : appliquer le théorème à −f.
  ⚠ On ne peut PAS se contenter de changer le signe des μⱼ :
     la condition μⱼ ≥ 0 n'est PAS symétrique.
     C'est la SEULE dissymétrie min/max de tout le cours.


QUALIFICATION (§6.3) — trois conditions suffisantes, à tester dans cet ordre

  1. QCA (déf. 6.4)     toutes les contraintes AFFINES  →  tout est qualifié
                        (le cas le plus fréquent, et le plus rapide à écrire)
  2. SLATER (déf. 6.6)  cas CONVEXE + un point strictement admissible
                        → TOUTE la contrainte est qualifiée d'un coup
  3. M.-F. (déf. 6.2)   les ∇gᵢ libres + une direction v qui « rentre »


LA MÉTHODOLOGIE (§6.4) — cinq étapes
  1. gᵢ, hⱼ de classe C¹ ?
  2. le minimum EXISTE-t-il ?     (Weierstrass ou coercivité)
  3. A₀ = les points NON qualifiés
  4. A₁ = les points qualifiés vérifiant KKT
  5. évaluer f sur A₀ ∪ A₁ et comparer
```

## 🔴 Concept 1 — Contraintes actives et l'ensemble $J(a)$ (§6.1)

Dans ce chapitre, la contrainte est définie par des **égalités et des inégalités** :

$$A = \{x\in U,\ g_1(x)=0,\ \dots,\ g_p(x)=0,\ h_1(x)\le0,\ \dots,\ h_q(x)\le0\}$$

où $U$ est un ouvert de $\mathbb{R}^n$, $(g_1,\dots,g_p)\in C^1(U)^p$ et $(h_1,\dots,h_q)\in C^1(U)^q$.

**L'exemple du cours, à connaître par cœur.** L'ensemble

$$A = \{(x,y)\in\mathbb{R}^2,\ x\ge0,\ y\ge0,\ x+y\le1\}$$

sera **pensé comme**

$$A = \{(x,y)\in\mathbb{R}^2,\ -x\le0,\ -y\le0,\ x+y-1\le0\}$$

donc

$$h_1(x,y) = -x, \qquad h_2(x,y) = -y, \qquad h_3(x,y) = x+y-1 .$$

⚠️ **Cette réécriture est la première chose à faire, et elle est source d'erreurs de signe.** Une contrainte « $\ge$ » se retourne en multipliant par $-1$. Une contrainte « $\le c$ » devient « $\cdots - c \le 0$ ». **Tant que toutes les inégalités ne sont pas de la forme $h_j \le 0$, ne commencez pas KKT.**

**Définition (cours).** On définit la notion de **contrainte active** pour un point $a\in A$ :

- si $h_j(a) = 0$, on dit que la **contrainte $j$ est active en $a$** ;
- si $h_j(a) < 0$, on dit que la **contrainte $j$ est inactive en $a$**.

On note $J(a)$ l'ensemble des $j$ tels que la contrainte $j$ est active.

**Les deux exemples du cours**, sur le triangle ci-dessus :

- si $a = \left(\frac12,\frac12\right)$, **seule la contrainte 3 est active** donc $J\left(\frac12,\frac12\right) = \{3\}$ ;
- si $a=(1,0)$, **les contraintes 2 et 3 sont actives** donc $J(1,0) = \{2,3\}$.

> **Vérifions les deux, coordonnée par coordonnée** — c'est le geste à automatiser.
>
> | Point | $h_1 = -x$ | $h_2 = -y$ | $h_3 = x+y-1$ | $J(a)$ |
> |---|---|---|---|---|
> | $\left(\frac12,\frac12\right)$ | $-\frac12 < 0$ | $-\frac12<0$ | $\frac12+\frac12-1 = 0$ | $\{3\}$ |
> | $(1,0)$ | $-1<0$ | $0$ | $1+0-1=0$ | $\{2,3\}$ |
> | $(0,0)$ | $0$ | $0$ | $-1<0$ | $\{1,2\}$ |
> | $\left(\frac14,\frac14\right)$ | $-\frac14<0$ | $-\frac14<0$ | $-\frac12<0$ | $\emptyset$ |
>
> ```
>         y
>         1 ┤●(0,1)          J = {1,3}
>           │╲
>           │ ╲              sur l'HYPOTÉNUSE (hors sommets) : J = {3}
>           │  ╲   ● (½,½)
>           │   ╲
>           │ ●  ╲           à l'INTÉRIEUR : J = ∅
>           │(¼,¼)╲
>         0 ┤●─────●         J = {1,2} en (0,0),  J = {2,3} en (1,0)
>           │(0,0) (1,0)
>           └──────┴──────► x
>                  1
> ```
>
> **La règle** : $\lvert J(a)\rvert$ = le nombre de « murs » que le point touche. À l'intérieur, aucun ; sur une arête, un ; à un sommet, deux.
>
> **Et le lien avec le cône du §4.3.2 (fiche 603) est exact** : le cône $C(a)$ ne retenait que les contraintes saturées. $J(a)$ est la **version calculatoire** de la même idée — c'est précisément pourquoi le cours annonce au §6.4 qu'on va refaire les exercices du cône avec KKT.

## 🔴 Concept 2 — Le théorème de Karush-Kuhn-Tucker (thm 6.1)

Le cours prévient : *« Définir la qualification de la contrainte demanderait de faire toute la théorie qui mène à ce théorème, ce que nous ne ferons pas dans le cadre de ce cours. En revanche, nous donnerons différentes conditions qui assurent qu'un point de la contrainte est qualifié. Nous pourrons alors appliquer le théorème à ce point. »*

**Théorème 6.1 (cours) — Karush-Kuhn-Tucker.**

> Soit $U$ ouvert de $\mathbb{R}^n$, $(g_1,\dots,g_p)\in C^1(U)^p$ et $(h_1,\dots,h_q)\in C^1(U)^q$. Soit $a\in A$ un point **qualifié** de $A$. On suppose que
>
> $$a \text{ est un \textbf{minimum local} de } f .$$
>
> Alors il existe $(\lambda_1,\dots,\lambda_p)\in\mathbb{R}^p$ et $(\mu_1,\dots,\mu_q)\in\mathbb{R}^q$ tels que
>
> $$\nabla f(a) + \sum_{i=1}^p \lambda_i\nabla g_i(a) + \sum_{j=1}^q \mu_j\nabla h_j(a) = 0_{\mathbb{R}^n}$$
>
> vérifiant les conditions suivantes :
>
> $$\forall j = 1,\dots,q \qquad \mu_j \ge 0 \qquad \textbf{(admissibilité de } \mu_j\textbf{)}$$
>
> $$\forall j = 1,\dots,q \qquad \mu_j\, h_j(a) = 0 \qquad \textbf{(complémentarité)}$$

**Explication des conditions (cours, mot pour mot).**

> - **La condition de complémentarité s'explique ainsi :** si la contrainte est inactive en $a$ (c'est-à-dire $h_j(a)<0$), cela veut dire qu'elle ne sert pas à décrire l'ensemble $A$ localement (on pourrait l'enlever car $a$ ne « sent » pas cette contrainte) donc elle ne va pas apparaître dans la condition de minimum, d'où $\mu_j = 0$. Et si la contrainte est active, $h_j(a)=0$.
> - **La condition d'admissibilité de $\mu_j$ ($\mu_j\ge0$) s'explique ainsi :** si la contrainte $j$ est inactive, $\mu_j=0$. Si la contrainte $j$ est active, comme $a$ est un minimum local de $f$, $f$ doit augmenter quand on part de $a$ pour rentrer dans $A$ donc le gradient de $f$ en $a$ doit être orienté dans le sens **opposé** au gradient de $h_j$ puisque la condition est $h_j(x)\le0$. **Faire un dessin.**

> **Le dessin annoncé par le cours.**
>
> ```
>        la contrainte hⱼ ≤ 0                 ∇hⱼ  (pointe vers hⱼ CROISSANT,
>                                              ↑     donc vers l'EXTÉRIEUR de A)
>     ────────────●a────────────  hⱼ = 0       │
>          DEDANS │  DEHORS                    │
>           hⱼ<0  │   hⱼ>0                     ●a
>                 │                            │
>       pour un MINIMUM en a, f doit           ↓
>       AUGMENTER quand on rentre dans A      ∇f  (pointe vers f croissant,
>                                                  donc vers l'INTÉRIEUR)
> 
>       ∇f et ∇hⱼ sont de sens OPPOSÉS
>       ∇f = −μ ∇hⱼ  avec  μ ≥ 0
> ```
>
> **La lecture en une phrase :** *à un minimum, la contrainte « pousse » dans le sens où $f$ voudrait descendre — sinon on descendrait sans sortir de $A$, et $a$ ne serait pas un minimum.* Le signe de $\mu_j$ encode cette orientation, et c'est pour cela qu'il ne peut pas être quelconque.

**La complémentarité, sous sa forme utilisable.** L'égalité $\mu_j h_j(a)=0$ signifie : **au moins l'un des deux facteurs est nul**. D'où la disjonction qui structure toute résolution :

$$\boxed{\text{pour chaque } j : \qquad \mu_j = 0 \quad \textbf{ou} \quad h_j(a) = 0}$$

- contrainte **inactive** ($h_j(a)<0$) $\Longrightarrow$ **$\mu_j = 0$** ;
- $\mu_j > 0$ $\Longrightarrow$ contrainte **active** ($h_j(a)=0$).

**Remarque importante (cours).** *Le théorème peut être utilisé pour le cas d'un **maximum** local de $f$ en $a$ en l'appliquant à la fonction $-f$ qui a du coup un minimum local en $a$.*

**Encadré Attention (cours).** *Contrairement au théorème des extrema liés qui s'applique à tout extremum local, la condition d'admissibilité $\mu_j\ge0$ **oblige à distinguer les cas des minima et des maxima locaux** de $f$.*

> ⚠️ **C'est la seule dissymétrie min/max de tout le cours, et elle tombe en examen.**
>
> |  | Extrema liés (thm 5.7) | KKT (thm 6.1) |
> |---|---|---|
> | S'applique à | **tout** extremum local | un **minimum** local |
> | Signe des multiplicateurs | **quelconque** | $\mu_j \ge 0$ **imposé** |
> | Pour un maximum | rien à changer | **refaire** avec $-f$ |
>
> **La raison profonde** : une contrainte d'**égalité** contraint des deux côtés, donc son multiplicateur n'a pas de sens privilégié. Une contrainte d'**inégalité** ne contraint que d'un côté — et ce côté distingue le haut du bas. C'est exactement ce que disait déjà la proposition 3.4 (fiche 601) : *à l'intérieur, une égalité ; au bord, une inégalité dont le sens dépend de min ou max*.
>
> ⚠️ **L'erreur à ne pas faire** : croire qu'il suffit de changer $\mu_j \ge 0$ en $\mu_j \le 0$ pour traiter un maximum. **C'est vrai en pratique, mais seulement si l'on garde le même $\nabla f$** ; le cours demande d'appliquer le théorème à $-f$, ce qui est plus sûr et ne demande aucune gymnastique. **Faites comme le cours.**

## 🔴 Concept 3 — Les trois conditions de qualification (§6.3)

Le cours en donne trois. Elles sont **suffisantes** pour la qualification, jamais nécessaires.

**Définition 6.2 (cours) — Mangasarian-Fromovitz.** On dit que la contrainte $A$ vérifie la condition de **Mangasarian-Fromovitz** en $a\in A$ si :

1. $(\nabla g_1(a),\dots,\nabla g_p(a))$ est une famille **libre** de $\mathbb{R}^n$ ;
2. si $J(a)\neq\emptyset$, il existe $v\in\mathbb{R}^n$ tel que
  - (a) $\forall i=1\dots p,\quad \langle \nabla g_i(a),\ v\rangle = 0$ ;
  - (b) $\forall j\in J(a),\quad \langle\nabla h_j(a),\ v\rangle < 0$.

**Proposition 6.3 (cours).** Si la condition de Mangasarian-Fromovitz est satisfaite en $a\in A$, alors $a$ est **qualifié**.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que $v$ est, géométriquement :</span>

*une direction qui **longe** toutes les égalités (condition a) et qui **rentre strictement** dans toutes les inégalités actives (condition b).* On l'appelle parfois une direction de **descente admissible stricte**. Son existence garantit que la contrainte n'a pas de « pointe » en $a$ — c'est l'analogue en présence d'inégalités de la liberté des $\nabla g_i$ du chapitre 5.

Le signe **strictement négatif** en (b) n'est pas décoratif : $\langle\nabla h_j(a),v\rangle < 0$ signifie que $h_j$ **décroît** dans la direction $v$, donc qu'on s'enfonce dans $\{h_j<0\}$.

</div>

**Définition 6.4 (cours) — QCA.** On dit que la contrainte $A$ vérifie la condition de **qualification de contraintes affines (QCA)** en $a\in A$ si les fonctions $(g_i)_{i=1\dots p}$ et $(h_j)_{j=1\dots q}$ sont **affines** dans un voisinage ouvert de $a$.

**Proposition 6.5 (cours).** Si (QCA) est satisfaite en $a\in A$, alors $a$ est **qualifié**.

> **C'est la condition la plus rentable du cours.** Un polyèdre — un triangle, un carré, un pavé, un simplexe, le domaine d'un programme linéaire, l'ensemble du transport optimal du §1.6 — a **toutes** ses contraintes affines. Une seule phrase suffit alors :
>
> *« Toutes les contraintes sont affines, donc la condition (QCA) de la définition 6.4 est vérifiée en tout point de $A$ : par la proposition 6.5, tout point de $A$ est qualifié. »*
>
> **Vérifiez QCA en premier, systématiquement.** Si elle passe, l'étape 3 de la méthodologie ($A_0 = \emptyset$) est réglée en une ligne.

**Le cadre convexe.** La condition suivante *« ne s'applique qu'aux problèmes d'optimisation convexe et différentiable, c'est-à-dire si »* :

- $U$ est un **convexe** de $\mathbb{R}^n$ ;
- les fonctions $(g_i)_{i=1\dots p}$ sont **affines** sur $U$ ;
- les fonctions $(h_j)_{j=1\dots q}$ sont **convexes** sur $U$.

**Définition 6.6 (cours) — condition de Slater.** On dit que la contrainte $A$ vérifie la **condition de Slater** s'il existe $a_0\in A$ tel que

$$\forall j=1\dots q,\qquad h_j(a_0) < 0 .$$

**Proposition 6.7 (cours).** Si la condition de Slater est satisfaite, alors **toute la contrainte $A$ est qualifiée**.

**Remarque (cours).** *Cette condition s'applique notamment pour les problèmes d'optimisation linéaire.*

> **Slater est la plus économique des trois** : **un seul point à exhiber**, et c'est **tout $A$** qui devient qualifié — pas seulement ce point. Comparez :
>
> | Condition | Ce qu'on vérifie | Ce qu'on obtient | Cadre |
> |---|---|---|---|
> | **QCA** (6.4) | les $g_i$, $h_j$ sont affines | qualifié **en $a$** (donc partout si partout affine) | polyèdres |
> | **Slater** (6.6) | **un** point $a_0$ avec toutes les $h_j(a_0)<0$ | **toute** la contrainte $A$ | convexe |
> | **M.-F.** (6.2) | $\nabla g_i$ libres + une direction $v$ | qualifié **en $a$** | général |
>
> **Comment exhiber le point de Slater** : c'est un point **strictement intérieur** aux inégalités. Sur le triangle $\{x\ge0,\ y\ge0,\ x+y\le1\}$, prendre $a_0 = \left(\frac14,\frac14\right)$ : $h_1 = -\frac14<0$, $h_2=-\frac14<0$, $h_3 = -\frac12<0$. **Trois inégalités strictes, et c'est fini.**
>
> ⚠️ Slater exige **toutes** les $h_j$ strictement négatives **au même point**. Un point qui touche un seul mur ne convient pas.

## 🔴 Concept 4 — La méthodologie du §6.4

Le cours donne la marche à suivre en cinq points. **C'est le plan de rédaction de tout exercice du chapitre.**

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthodologie (cours).</span>

1. Vérifier que les fonctions $(g_i)_{i=1\dots p}$ et $(h_j)_{j=1\dots q}$ sont de classe $C^1$ sur $U$.
2. Prouver que $f$ admet un **minimum global** sur $A$ (ou un maximum global) — par exemple via le théorème de Weierstrass ou par un argument de coercivité.
3. Chercher les points de $A$ qui **ne sont pas qualifiés**. On notera leur ensemble $A_0$.
4. Chercher parmi les points qualifiés ceux vérifiant les **conditions de KKT**. On notera leur ensemble $A_1$.
5. Évaluer $f$ en les points de $A_0$ **et** $A_1$ pour identifier le ou les minima de $f$ (ou maxima).

</div>

**Ce que le cours annonce ensuite.** *« Nous allons maintenant traiter quelques exemples, et notamment **revenir sur les exercices 3 et 4 du TD3** où nous avions employé la condition nécessaire de minimum local faisant appel à la notion de **cône admissible**. Nous allons voir qu'avec le théorème KKT, cela se résout simplement. »*

Ce sont les **exercices 4.3 et 4.4** du chapitre 4 (fiche 603). Les deux résolutions comparées sont ci-dessous — c'est le meilleur usage possible de cette fiche.

> **La structure de l'étape 4, celle qui fait tout le travail.** La complémentarité $\mu_jh_j(a)=0$ impose, pour chaque $j$, de choisir entre $\mu_j=0$ et $h_j(a)=0$. Avec $q$ inégalités, cela fait $2^q$ **configurations d'activité** — mais elles s'éliminent presque toutes immédiatement :
>
> ```
> POUR CHAQUE ensemble J ⊂ {1,…,q} de contraintes SUPPOSÉES actives :
> 
>    1. poser  μⱼ = 0  pour j ∉ J
>    2. poser  hⱼ(a) = 0  pour j ∈ J
>    3. résoudre le système linéaire/polynomial obtenu
>    4. ÉLIMINER si :  ─ le point trouvé n'est pas dans A
>                      ─ un μⱼ trouvé est < 0            ← le filtre le plus efficace
>                      ─ une contrainte supposée inactive est en fait saturée
>    5. ce qui survit entre dans A₁
> ```
>
> **En pratique, la condition $\mu_j\ge0$ élimine la grande majorité des cas** — souvent tous sauf un. C'est elle qui fait de KKT une méthode et pas une énumération.

<details class="details--riche">
<summary>

**Corrigé — l'exercice 4.3 refait avec KKT, comme le cours l'annonce**

</summary>

**Le problème.** Minimiser $f(x,y) = x^4-y^2$ sur $A = \mathbb{R}_+\times[0,1]$.

**Rappel de la résolution du chapitre 4** (fiche 603) : il fallait deviner que le minimum était en $(0,1)$, calculer le cône $C(0,1) = \{h_1\ge0,\ h_2\le0\}$, vérifier l'inéquation d'Euler, puis constater que le test passait aussi en $(0,0)$ — sans conclure. **La méthode ne produisait pas les candidats, elle les vérifiait.**

**Étape 0 — réécrire les contraintes en « $\le0$ ».**

$$A = \{x\ge0,\ y\ge0,\ y\le1\} \quad\Longrightarrow\quad h_1 = -x,\qquad h_2 = -y,\qquad h_3 = y-1 .$$

$$\nabla h_1 = \begin{pmatrix}-1\\0\end{pmatrix},\qquad \nabla h_2 = \begin{pmatrix}0\\-1\end{pmatrix},\qquad \nabla h_3 = \begin{pmatrix}0\\1\end{pmatrix}.$$

**Étape 1 — régularité.** $h_1,h_2,h_3$ sont **affines**, donc $C^\infty$. $f$ est polynomiale.

**Étape 2 — existence.** Traitée en fiche 602 : $f$ est **coercive sur $A$** (car $y^2\le1$ y borne le terme parasite) et $A$ est fermé non borné, donc le **théorème 4.9** donne un minimum global.

**Étape 3 — points non qualifiés.** **Toutes les contraintes sont affines** : la condition (QCA) de la définition 6.4 est vérifiée en tout point, donc par la proposition 6.5, **tout point de $A$ est qualifié**.

$$\boxed{A_0 = \emptyset .}$$

*(Une ligne, là où le chapitre 4 demandait une analyse géométrique du bord.)*

**Étape 4 — les conditions KKT.** Avec $\nabla f = \begin{pmatrix}4x^3\\-2y\end{pmatrix}$ :

$$\begin{pmatrix}4x^3\\-2y\end{pmatrix} + \mu_1\begin{pmatrix}-1\\0\end{pmatrix} + \mu_2\begin{pmatrix}0\\-1\end{pmatrix} + \mu_3\begin{pmatrix}0\\1\end{pmatrix} = \begin{pmatrix}0\\0\end{pmatrix}$$

soit

$$\text{(L1)}\quad 4x^3 - \mu_1 = 0, \qquad\qquad \text{(L2)}\quad -2y - \mu_2 + \mu_3 = 0 .$$

**La ligne 1 se résout seule.** De (L1), $\mu_1 = 4x^3$. La complémentarité $\mu_1 x = 0$ (car $h_1 = -x$, donc $\mu_1h_1 = -\mu_1 x$) donne

$$4x^4 = 0 \qquad\Longrightarrow\qquad \boxed{x = 0} \quad\text{et}\quad \mu_1 = 0 \ (\ge 0 \ \checkmark).$$

**Remarquable : la première coordonnée est déterminée sans aucune disjonction de cas.** Le chapitre 4 n'offrait rien de tel.

**La ligne 2 demande trois cas**, selon la position de $y$ dans $[0,1]$.

| Cas | Actives | Ce que donne (L2) | Verdict |
|---|---|---|---|
| $0<y<1$ | aucune ($\mu_2=\mu_3=0$) | $-2y = 0 \Rightarrow y=0$ | **contradiction** avec $y>0$ |
| $y=0$ | $h_2$ ($\mu_3=0$) | $-0-\mu_2 = 0 \Rightarrow \mu_2=0 \ge0$ | **KKT point** $(0,0)$ |
| $y=1$ | $h_3$ ($\mu_2=0$) | $-2+\mu_3=0 \Rightarrow \mu_3=2 \ge0$ | **KKT point** $(0,1)$ |

$$\boxed{A_1 = \{(0,0),\ (0,1)\}}$$

**Étape 5 — comparer.**

$$f(0,0) = 0, \qquad f(0,1) = 0 - 1 = -1 .$$

$$\boxed{\min_A f = -1, \text{ atteint en } (0,1).}$$

L'existence acquise à l'étape 2 et le fait que $A_0=\emptyset$ garantissent que le minimum est dans $A_1$ : **c'est donc le plus petit des deux, sans autre argument**.

**La comparaison des deux méthodes — c'est le point de l'exercice.**

|  | Chapitre 4 (cône) | Chapitre 6 (KKT) |
|---|---|---|
| Qualification | pas de notion | **une ligne** (QCA) |
| Produit-il les candidats ? | **non** — il faut les deviner | **oui** — le système les donne |
| $(0,0)$ | passe le test, sans conclusion | apparaît comme candidat, éliminé par comparaison |
| $x=0$ | à deviner géométriquement | **sort de la ligne 1** |
| Cas à traiter | tout le bord, point par point | **trois**, mécaniques |

**KKT transforme une analyse géométrique en une résolution algébrique.** C'est exactement ce que le cours promet.

**Contrôle numérique** : minimisation sur une grille de $[0,4]\times[0,1]$ au pas $2\times10^{-3}$ : minimum $-1{,}000000$ en $(0{,}000,\ 1{,}000)$ ; valeur en $(0,0)$ égale à $0$.

</details>

<details class="details--riche">
<summary>

**Corrigé — l'exercice 4.4 refait avec KKT (minimum ET maximum)**

</summary>

**Le problème.** $f(x,y) = x^2+y^2-8x-2y+17 = (x-4)^2+(y-1)^2$ sur le carré $A = [0,2]^2$.

**Étape 0 — les quatre contraintes.**

$$h_1 = -x,\quad h_2 = -y,\quad h_3 = x-2,\quad h_4 = y-2,$$

$$\nabla h_1 = \begin{pmatrix}-1\\0\end{pmatrix},\ \nabla h_2 = \begin{pmatrix}0\\-1\end{pmatrix},\ \nabla h_3 = \begin{pmatrix}1\\0\end{pmatrix},\ \nabla h_4 = \begin{pmatrix}0\\1\end{pmatrix}.$$

**Étapes 1 à 3.** Toutes affines, donc $C^\infty$ et **(QCA)** : $A_0 = \emptyset$, tout est qualifié. $A$ est compact et $f$ continue : **Weierstrass** donne un minimum **et** un maximum (thm 4.7).

**Étape 4a — KKT pour le MINIMUM.** $\nabla f = \begin{pmatrix}2x-8\\2y-2\end{pmatrix}$, et les contraintes sont **séparées** ($h_1,h_3$ ne concernent que $x$ ; $h_2,h_4$ que $y$) : le système se scinde en deux problèmes indépendants.

**Coordonnée $x$ :** $\ 2x-8-\mu_1+\mu_3 = 0$.

| Position | Actives | Équation | Verdict |
|---|---|---|---|
| $0<x<2$ | aucune | $2x-8=0 \Rightarrow x=4$ | **hors de $[0,2]$** |
| $x=0$ | $h_1$ ($\mu_3=0$) | $-8 = \mu_1$ | $\mu_1<0$ |
| $x=2$ | $h_3$ ($\mu_1=0$) | $-4+\mu_3 = 0 \Rightarrow \mu_3 = 4$ | $\ge0$ **retenu** |

**Coordonnée $y$ :** $\ 2y-2-\mu_2+\mu_4=0$.

| Position | Actives | Équation | Verdict |
|---|---|---|---|
| $0<y<2$ | aucune | $2y-2=0 \Rightarrow y=1$ | $\in\,]0,2[$ **retenu** |
| $y=0$ | $h_2$ ($\mu_4=0$) | $-2 = \mu_2$ | $\mu_2<0$ |
| $y=2$ | $h_4$ ($\mu_2=0$) | $2+\mu_4=0 \Rightarrow \mu_4=-2$ | $<0$ |

$$\boxed{A_1^{\min} = \{(2,1)\}, \qquad f(2,1) = 4 .}$$

**Un seul candidat, et le minimum existe : c'est lui.** (Le chapitre 4 donnait la même réponse au prix d'une discussion sur trois types de points du bord.)

**Étape 4b — KKT pour le MAXIMUM : on applique le théorème à $-f$.** C'est la remarque importante du cours.

$$\nabla(-f) = \begin{pmatrix}8-2x\\2-2y\end{pmatrix}.$$

**Coordonnée $x$ :** $\ 8-2x-\mu_1+\mu_3=0$.

| Position | Équation | Verdict |
|---|---|---|
| $0<x<2$ | $8-2x=0\Rightarrow x=4$ | hors |
| $x=0$ | $8 = \mu_1$ | $\ge0$ **retenu** |
| $x=2$ | $4+\mu_3=0\Rightarrow\mu_3=-4$ | $<0$ |

**Coordonnée $y$ :** $\ 2-2y-\mu_2+\mu_4=0$.

| Position | Équation | Verdict |
|---|---|---|
| $0<y<2$ | $2-2y=0\Rightarrow y=1$ | **retenu** |
| $y=0$ | $2=\mu_2$ | $\ge0$ **retenu** |
| $y=2$ | $-2+\mu_4=0\Rightarrow\mu_4=2$ | $\ge0$ **retenu** |

**Trois candidats cette fois :**

$$A_1^{\max} = \{(0,0),\ (0,1),\ (0,2)\}.$$

**Étape 5 — évaluer.**

$$f(0,0) = 17, \qquad f(0,1) = 0+1-0-2+17 = 16, \qquad f(0,2) = 0+4-0-4+17 = 17 .$$

$$\boxed{\max_A f = 17, \text{ atteint en } (0,0) \textbf{ et } (0,2).}$$

⚠️ **Le point $(0,1)$ vérifie KKT et n'est PAS un maximum.** C'est la démonstration en acte que **KKT est une condition nécessaire, jamais suffisante** — exactement comme $f'(t_0)=0$ au chapitre 3 et le théorème 5.7 au chapitre 5. C'est pourquoi l'étape 5 de la méthodologie existe : **il faut comparer les valeurs**.

*(Géométriquement, $(0,1)$ est le point du bord gauche le plus proche de $P(4,1)$ à $x$ fixé : c'est un maximum le long de $x$ mais un **minimum** le long de $y$ — un point selle du bord.)*

**Contrôle numérique** sur $[0,2]^2$ au pas $10^{-3}$ : minimum $4{,}000000$ en $(2{,}000,\ 1{,}000)$ ; maximum $17{,}000000$ atteint en **deux** points, $(0,0)$ et $(0,2)$ ; et $f(0,1) = 16{,}000000$.

</details>

## 🟠 Concept 5 — Les quatre exemples du §6.4

<details class="details--riche">
<summary>

**Corrigé — exemples 11 et 12 du cours**

</summary>

### Exemple 11 — minimiser $f(x,y) = x+y$ sur $A = \{(x,y)\in\mathbb{R}^2,\ x^2+y^2\le1\}$

*(Le polycopié écrit « $f(x,y,z)$ » dans les exemples 11 à 13 par report d'une même en-tête ; ici l'ensemble est dans $\mathbb{R}^2$, donc $f(x,y)=x+y$.)*

**Étape 0.** Une seule inégalité : $h(x,y) = x^2+y^2-1 \le 0$. Le **disque fermé**, pas le cercle.

**Étapes 1–2.** $h$ est polynomiale donc $C^\infty$. $A$ est fermé (image réciproque de $\,]-\infty,0]$ par $h$ continue) et borné, donc **compact** : Weierstrass donne minimum et maximum.

**Étape 3 — qualification.** $h$ est **convexe** (somme de carrés), $U=\mathbb{R}^2$ est convexe, il n'y a pas d'égalité : le cadre de **Slater** s'applique. Le point $a_0=(0,0)$ vérifie $h(0,0) = -1 < 0$. **Par la proposition 6.7, toute la contrainte est qualifiée.**

$$A_0 = \emptyset .$$

**Étape 4 — KKT.** $\nabla f = \begin{pmatrix}1\\1\end{pmatrix}$, $\nabla h = \begin{pmatrix}2x\\2y\end{pmatrix}$ :

$$\begin{pmatrix}1\\1\end{pmatrix} + \mu\begin{pmatrix}2x\\2y\end{pmatrix} = 0 .$$

**Cas $\mu = 0$** (contrainte inactive, point intérieur) : l'équation devient $(1,1)=(0,0)$, **impossible**. *Il n'y a donc aucun candidat à l'intérieur du disque — ce qui était prévisible, $f$ étant linéaire non constante.*

**Cas $\mu>0$** : la complémentarité impose $h=0$, donc $x^2+y^2=1$. De l'équation, $x = y = -\dfrac{1}{2\mu}$. En reportant :

$$\frac{2}{4\mu^2} = 1 \iff \mu^2 = \frac12 \iff \mu = \frac{1}{\sqrt2} \quad (\text{on garde } \mu>0).$$

$$x = y = -\frac{1}{2}\sqrt2 = -\frac{1}{\sqrt2} \approx -0{,}7071068 .$$

$$\boxed{\min_A(x+y) = -\sqrt2 \approx -1{,}4142136,\ \text{ atteint en } \left(-\tfrac{1}{\sqrt2},\ -\tfrac{1}{\sqrt2}\right).}$$

**Contrôle** : le point est bien sur le cercle ($\frac12+\frac12=1$ ) et $f = -\frac{2}{\sqrt2} = -\sqrt2$ . C'est cohérent avec l'exemple 9 du chapitre 5, où le **maximum** de $x+y$ sur le **cercle** valait $+\sqrt2$ (fiche 604) : ici l'inégalité sélectionne le seul des deux points de tangence qui minimise.

⚠️ **La condition $\mu\ge0$ a fait tout le travail** : sans elle, $\mu = -\frac{1}{\sqrt2}$ serait également solution du système et donnerait $\left(\frac{1}{\sqrt2},\frac{1}{\sqrt2}\right)$ — le **maximum**. **Le signe de $\mu$ est ce qui sépare les deux.** C'est l'illustration la plus nette de la remarque du cours sur la dissymétrie min/max.

### Exemple 12 — minimiser $f(x,y) = x^2+y^2-4xy-2x-4y$ sur $A = \{x\ge0,\ y\ge0,\ x+y\le1\}$

**Étape 0.** C'est **le triangle du §6.1** : $h_1=-x$, $h_2=-y$, $h_3=x+y-1$, avec

$$\nabla h_1 = \begin{pmatrix}-1\\0\end{pmatrix},\quad \nabla h_2 = \begin{pmatrix}0\\-1\end{pmatrix},\quad \nabla h_3 = \begin{pmatrix}1\\1\end{pmatrix}.$$

**Étapes 1–3.** Contraintes **affines** : $C^\infty$ et **(QCA)**, donc $A_0=\emptyset$. $A$ est compact (fermé, borné) et $f$ polynomiale : **Weierstrass** donne min et max.

**Étape 4 — KKT.** $\nabla f = \begin{pmatrix}2x-4y-2\\2y-4x-4\end{pmatrix}$, et le système est

$$\text{(L1)}\quad 2x-4y-2 - \mu_1 + \mu_3 = 0, \qquad \text{(L2)}\quad 2y-4x-4 - \mu_2 + \mu_3 = 0 .$$

Il y a $2^3 = 8$ configurations, mais la géométrie du triangle en réduit à **sept réalisables** (les trois contraintes ne peuvent pas être actives ensemble). Passons-les en revue.

| $J(a)$ | Point | Système | Verdict |
|---|---|---|---|
| $\emptyset$ | intérieur | $2x-4y-2=0$ et $2y-4x-4=0$ | $y = -\frac43 < 0$ : **hors du triangle** |
| $\{1\}$ | $x=0$, $0<y<1$ | $2y-4 = 0 \Rightarrow y=2$ | **hors** ($y<1$) |
| $\{2\}$ | $y=0$, $0<x<1$ | $2x-2=0\Rightarrow x=1$ | **hors** ($x<1$) |
| $\{3\}$ | $x+y=1$, $x,y>0$ | voir ci-dessous | **retenu** |
| $\{1,2\}$ | $(0,0)$ | $\mu_1=-2$, $\mu_2=-4$ | **négatifs** |
| $\{2,3\}$ | $(1,0)$ | $\mu_3=0$ puis $\mu_2=-8$ | **négatif** |
| $\{1,3\}$ | $(0,1)$ | $\mu_3=2$ puis $\mu_1=-4$ | **négatif** |

**Le seul cas qui survit, $J(a)=\{3\}$ :** avec $\mu_1=\mu_2=0$, on soustrait (L2) de (L1) — le $\mu_3$ disparaît :

$$(2x-4y-2)-(2y-4x-4) = 0 \iff 6x-6y+2 = 0 \iff y = x+\tfrac13 .$$

Avec la contrainte $x+y=1$ : $2x+\frac13 = 1$, donc

$$\boxed{x = \tfrac13, \qquad y = \tfrac23 .}$$

Et $\mu_3 = -(2x-4y-2) = -\left(\tfrac23-\tfrac83-2\right) = -\left(-4\right) = 4 \ \ge 0$ .

Les deux coordonnées sont bien strictement positives, donc $h_1,h_2$ sont bien inactives : la configuration est cohérente.

$$A_1 = \left\{\left(\tfrac13,\ \tfrac23\right)\right\}, \qquad f\left(\tfrac13,\tfrac23\right) = \tfrac19+\tfrac49-\tfrac89-\tfrac23-\tfrac83 = -\tfrac13-\tfrac{10}{3} = \boxed{-\tfrac{11}{3}} \approx -3{,}6666667 .$$

**Étape 5.** $A_0=\emptyset$ et $A_1$ est un singleton ; le minimum existe (étape 2) : **c'est donc lui**.

$$\boxed{\min_A f = -\tfrac{11}{3} \approx -3{,}667, \text{ en } \left(\tfrac13,\ \tfrac23\right).}$$

**Contrôle numérique** sur le triangle au pas $10^{-4}$ : minimum $-3{,}6666667$ en $(0{,}3333,\ 0{,}6667)$ . Et les valeurs aux trois sommets : $f(0,0)=0$, $f(1,0)=-1$, $f(0,1)=-3$ — **toutes supérieures** au minimum trouvé.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que cet exemple enseigne : $\mu_j\ge0$ est un filtre redoutable.</span>

Six configurations sur sept ont été éliminées, dont **trois par le seul signe des multiplicateurs**. Sans cette condition, les trois sommets resteraient candidats et il faudrait tous les évaluer. **C'est la valeur ajoutée de KKT sur une énumération naïve du bord.**

**Le réflexe de rédaction** : présentez la discussion **sous forme de tableau**, une ligne par configuration $J(a)$. C'est lisible, exhaustif, et cela montre au correcteur qu'aucun cas n'a été oublié.

</div>

</details>

<details class="details--riche">
<summary>

**Corrigé — exemples 13 et 14 du cours**

</summary>

### Exemple 13 — minimiser $f(x,y,z) = x+2y+3z$ sur $A = \{x^2+y^2+z^2=1,\ x+y+z\le0\}$

**Le premier exemple avec une égalité ET une inégalité.**

**Étape 0.**

$$g(x,y,z) = x^2+y^2+z^2-1 \quad (\text{égalité}), \qquad h(x,y,z) = x+y+z \quad (\text{inégalité } \le 0).$$

$$\nabla g = \begin{pmatrix}2x\\2y\\2z\end{pmatrix}, \qquad \nabla h = \begin{pmatrix}1\\1\\1\end{pmatrix}.$$

**Étapes 1–2.** $g$ et $h$ sont polynomiales. $A$ est fermé (intersection de deux images réciproques de fermés) et borné (inclus dans la sphère unité) donc **compact** : **Weierstrass**, minimum et maximum existent.

**Étape 3 — qualification par Mangasarian-Fromovitz.** *(Slater ne s'applique pas : $g$ est quadratique, pas affine.)*

1. La famille $(\nabla g(a))$ est libre $\iff \nabla g(a)\neq0 \iff a \neq (0,0,0)$ — toujours vrai sur la sphère.
2. Si $J(a) = \{1\}$ (c'est-à-dire $x+y+z=0$), il faut $v$ avec $\langle\nabla g(a),v\rangle=0$ et $\langle\nabla h(a),v\rangle<0$. Comme $\nabla g(a)=2a$ et $\nabla h = (1,1,1)$ ne sont **pas colinéaires** — ils le seraient pour $a = t(1,1,1)$, ce qui exigerait $3t=0$ (par $h=0$) donc $a=0$, exclu — le plan $\{v : \langle a,v\rangle = 0\}$ n'est pas contenu dans $\{v : \langle(1,1,1),v\rangle=0\}$, et l'on peut y choisir $v$ avec $\langle(1,1,1),v\rangle<0$.

**Tous les points de $A$ sont qualifiés**, donc $A_0=\emptyset$.

**Étape 4 — KKT.**

$$\begin{pmatrix}1\\2\\3\end{pmatrix} + \lambda\begin{pmatrix}2x\\2y\\2z\end{pmatrix} + \mu\begin{pmatrix}1\\1\\1\end{pmatrix} = 0 \iff \begin{cases}1+2\lambda x+\mu = 0\\ 2+2\lambda y+\mu=0\\ 3+2\lambda z+\mu=0\end{cases}$$

**$\lambda \neq 0$ nécessairement** : sinon les deux premières lignes donneraient $\mu=-1$ et $\mu=-2$. D'où

$$x = -\frac{1+\mu}{2\lambda}, \qquad y = -\frac{2+\mu}{2\lambda}, \qquad z = -\frac{3+\mu}{2\lambda}.$$

**Cas 1 — la contrainte d'inégalité est ACTIVE ($x+y+z=0$, donc $\mu\ge0$ possible).** En sommant :

$$x+y+z = -\frac{(1+\mu)+(2+\mu)+(3+\mu)}{2\lambda} = -\frac{6+3\mu}{2\lambda} = 0 \iff 6+3\mu = 0 \iff \mu = -2 .$$

$$\mu = -2 < 0 : \textbf{la condition d'admissibilité est VIOLÉE.} \ \text{}$$

**Aucun candidat avec la contrainte active.**

**Cas 2 — la contrainte est INACTIVE**, donc $\mu = 0$ par complémentarité :

$$x = -\frac{1}{2\lambda},\quad y = -\frac{2}{2\lambda} = -\frac{1}{\lambda},\quad z = -\frac{3}{2\lambda}.$$

La contrainte d'égalité donne

$$\frac{1+4+9}{4\lambda^2} = 1 \iff \lambda^2 = \frac{14}{4} \iff \lambda = \pm\frac{\sqrt{14}}{2} .$$

Il faut encore vérifier que la contrainte d'inégalité est bien **strictement** satisfaite :

$$x+y+z = -\frac{6}{2\lambda} = -\frac{3}{\lambda} < 0 \iff \lambda > 0 .$$

Donc $\lambda = \frac{\sqrt{14}}{2} \approx 1{,}8708287$, et

$$(x,y,z) = -\frac{(1,2,3)}{\sqrt{14}} \approx (-0{,}2672612,\ -0{,}5345225,\ -0{,}8017837).$$

$$f = -\frac{1+4+9}{\sqrt{14}} = -\frac{14}{\sqrt{14}} = \boxed{-\sqrt{14} \approx -3{,}7416574}$$

**Étape 5.** Un seul candidat, minimum garanti par Weierstrass : c'est lui.

**Contrôles.**

- Sur la sphère : $\frac{1+4+9}{14} = 1$ .
- Contrainte d'inégalité : $x+y+z = -\frac{6}{\sqrt{14}} \approx -1{,}6035675 < 0$ **strictement**, donc bien inactive, cohérent avec $\mu=0$.
- $f = -\sqrt{14} = -\lVert(1,2,3)\rVert$ : **c'est le minimum de la forme linéaire sur la sphère entière**, et il se trouve qu'il satisfait déjà l'inégalité. **La contrainte d'inégalité ne mord pas.**

> **La leçon** : quand une contrainte d'inégalité est **inactive à l'optimum**, le problème se ramène exactement au chapitre 5. Le cas 1 sert uniquement à **prouver** qu'elle est inactive — et c'est le signe de $\mu$ qui le prouve. **C'est le rôle principal de la condition $\mu_j\ge0$ dans les exercices mixtes.**

### Exemple 14 — minimiser $f(x,y) = x^2+(y+1)^2$ sur $A = \{(x,y)\in\mathbb{R}^2,\ y^2\le x^2\}$

**Le seul exemple du chapitre avec un point NON qualifié — d'où son intérêt.**

**Étape 0.** $h(x,y) = y^2-x^2 \le 0$, donc $\nabla h = \begin{pmatrix}-2x\\2y\end{pmatrix}$.

**Ce qu'est $A$ :** $y^2\le x^2 \iff \lvert y\rvert \le \lvert x\rvert$ — la réunion de deux secteurs opposés (un « nœud papillon » ouvert autour de l'axe des abscisses), délimités par les droites $y=\pm x$.

**Étapes 1–2 — existence.** $h$ est polynomiale. $f(x,y) = x^2+(y+1)^2$ est le **carré de la distance au point $Q(0,-1)$** : elle est coercive sur $\mathbb{R}^2$, donc sur $A$. $A$ est fermé (image réciproque de $\,]-\infty,0]$ par $h$ continue, prop. 2.12) et **non borné**. Le **théorème 4.9** donne un minimum global.

**Étape 3 — les points non qualifiés.** Il n'y a pas d'égalité, donc Mangasarian-Fromovitz se réduit à sa condition 2. En un point où la contrainte est active, il faut $v$ avec $\langle\nabla h(a),v\rangle<0$ — ce qui est possible **si et seulement si $\nabla h(a) \neq 0$**. Or

$$\nabla h(x,y) = (-2x,\ 2y) = (0,0) \iff (x,y) = (0,0),$$

et $(0,0) \in A$ (car $0\le0$).

$$\boxed{A_0 = \{(0,0)\} .}$$

*(Géométriquement : $(0,0)$ est le point de croisement des deux droites $y=\pm x$ — l'ensemble y a une pointe, il n'y est pas lisse. C'est le même phénomène que dans l'exemple 8 du chapitre 5, fiche 604.)*

**Étape 4 — KKT sur les points qualifiés.** $\nabla f = \begin{pmatrix}2x\\2(y+1)\end{pmatrix}$ :

$$\begin{pmatrix}2x\\2(y+1)\end{pmatrix} + \mu\begin{pmatrix}-2x\\2y\end{pmatrix} = 0 \iff \begin{cases} 2x(1-\mu) = 0 \\ 2(y+1) + 2\mu y = 0\end{cases}$$

**La première équation donne $x=0$ ou $\mu=1$.**

- **Si $x=0$** : la contrainte $y^2\le x^2 = 0$ force $y=0$, donc le point $(0,0)$ — **exclu**, il n'est pas qualifié. *(Ce cas est traité à part, en étape 5.)*
- **Si $\mu=1$** : la seconde équation donne $2(y+1)+2y = 0$, soit $4y=-2$, donc $y = -\frac12$. Comme $\mu=1>0$, la **complémentarité** impose $h=0$, c'est-à-dire $y^2=x^2$, donc $x^2 = \frac14$ et $$x = \pm\frac12 .$$

$$A_1 = \left\{\left(\tfrac12,\ -\tfrac12\right),\ \left(-\tfrac12,\ -\tfrac12\right)\right\}, \qquad \mu = 1 \ge 0 \ \checkmark$$

**Étape 5 — évaluer sur $A_0 \cup A_1$**, comme la méthodologie l'exige.

| Point | Statut | $f = x^2+(y+1)^2$ |
|---|---|---|
| $\left(\frac12,-\frac12\right)$ | KKT | $\frac14+\frac14 = \mathbf{0{,}5}$ |
| $\left(-\frac12,-\frac12\right)$ | KKT | $\frac14+\frac14 = \mathbf{0{,}5}$ |
| $(0,0)$ | **non qualifié** | $0+1 = 1$ |

$$\boxed{\min_A f = \tfrac12, \text{ atteint en } \left(\pm\tfrac12,\ -\tfrac12\right).}$$

**Vérification géométrique.** $f$ est le carré de la distance à $Q(0,-1)$, qui **n'est pas dans $A$** ($1 \le 0$ est faux). La distance de $Q$ à la droite $y=x$ (soit $x-y=0$) vaut $\frac{\lvert 0-(-1)\rvert}{\sqrt2} = \frac{1}{\sqrt2}$, dont le carré vaut $\frac12$ . Le projeté orthogonal de $(0,-1)$ sur cette droite est $\left(-\frac12,-\frac12\right)$ , et par symétrie $\left(\frac12,-\frac12\right)$ sur $y=-x$ . **Les deux pieds sont à égale distance : d'où les deux minima.**

**Contrôle numérique** sur une grille de $[-3,3]^2$ restreinte à $A$, au pas $10^{-3}$ : minimum $0{,}500000$ atteint en $(-0{,}500,-0{,}500)$ **et** $(0{,}500,-0{,}500)$ ; $f(0,0)=1$.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi le cours termine par cet exemple.</span>

Il réunit **les trois pièges** du chapitre en une seule question :

1. un point **non qualifié** qu'il faut chercher et évaluer à part ;
2. une **multiplicité** de minima ;
3. une résolution où la complémentarité ($\mu=1>0 \Rightarrow h=0$) est ce qui **détermine** $x$.

Ici $(0,0)$ n'était pas le minimum — mais rien ne le garantissait. Si $Q$ avait été en $(0,0)$, le minimum aurait été le point non qualifié, **que KKT n'aurait jamais trouvé**.

</div>

</details>

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | La bonne réaction | L'outil |
|---|---|---|
| contraintes $\le$, $\ge$, « positif », « au plus » | **KKT** | thm 6.1 |
| égalités **seulement** | extrema liés — pas besoin de KKT | thm 5.7, fiche 604 |
| polyèdre : triangle, carré, pavé, simplexe | **(QCA)** en une ligne | déf. 6.4 |
| $h_j$ convexes, $g_i$ affines | **Slater** : un point strictement intérieur | déf. 6.6 |
| $g$ quadratique (sphère) + inégalité | **Mangasarian-Fromovitz** | déf. 6.2 |
| $h$ se factorise ($y^2-x^2$, $xy$) | **cherchez $\nabla h = 0$ dans $A$** | exemple 14 |
| « le ou les minima » | il y en a **plusieurs** | exemples 12, 14 |
| on demande un **maximum** | refaire **tout** avec $-f$ | remarque du thm 6.1 |
| programmation linéaire | contraintes affines : QCA **et** Slater | remarque du §6.3 |

**Les trois signaux qui doivent déclencher une vigilance particulière :**

1. **Une contrainte non affine et non convexe** → ni QCA ni Slater : il faut Mangasarian-Fromovitz.
2. **$\nabla h_j = 0$ admet une solution dans $A$** → point non qualifié, à traiter à part (exemple 14).
3. **L'énoncé demande min ET max** → deux résolutions KKT complètes, la seconde avec $-f$ (exercice 4.4).

## Comment résoudre ce type d'exercice

**Le protocole — c'est la méthodologie du §6.4, détaillée.**

**Étape 0 (préalable, non numérotée par le cours mais indispensable).** Réécrire **toutes** les inégalités sous la forme $h_j \le 0$. Lister les $\nabla g_i$ et $\nabla h_j$. **Ne rien commencer avant.**

**Étape 1.** Vérifier que les $g_i$ et $h_j$ sont $C^1$. Une phrase (polynomiales, affines…).

**Étape 2 — existence.** $A$ compact → Weierstrass (thm 4.7), min **et** max. $A$ fermé non borné + coercivité → thm 4.9, min seulement. **Cette étape vous dispensera de toute étude de nature à l'étape 5.**

**Étape 3 — $A_0$, les points non qualifiés.**

1. **Testez (QCA) d'abord** : toutes les contraintes affines ? → $A_0=\emptyset$, une ligne, terminé.
2. Sinon, **Slater** : cadre convexe et un point $a_0$ avec toutes les $h_j(a_0)<0$ ? → $A_0=\emptyset$.
3. Sinon, **Mangasarian-Fromovitz** point par point. En pratique, cherchez où la famille $\{\nabla g_i(a)\}\cup\{\nabla h_j(a),\ j\in J(a)\}$ dégénère — le plus souvent, là où un $\nabla h_j$ s'annule.

**Étape 4 — $A_1$, les points KKT.** Écrire le système, puis **balayer les configurations d'activité** $J \subset \{1,\dots,q\}$ :

- pour $j\notin J$ : poser $\mu_j = 0$ ;
- pour $j\in J$ : poser $h_j(a) = 0$ ;
- résoudre, **puis éliminer** si le point sort de $A$, si un $\mu_j$ est négatif, ou si une contrainte supposée inactive se trouve saturée.

**Étape 5 — évaluer $f$ sur $A_0 \cup A_1$ et comparer.** Ne jamais oublier $A_0$.

**Les trois raccourcis qui font gagner le plus de temps.**

| Situation | Raccourci |
|---|---|
| contraintes **séparées** par variable | traiter chaque coordonnée **indépendamment** (exercice 4.4 : $3+3$ cas au lieu de $16$) |
| deux lignes contenant le même $\mu_j$ | les **soustraire** pour l'éliminer (exemple 12) |
| une équation se factorise | disjonction immédiate (exemple 14 : $2x(1-\mu)=0$) |

**Le contrôle de cohérence à faire sur chaque candidat retenu**, dans cet ordre :

1. le point est-il **dans $A$** (toutes les contraintes, actives ou non) ?
2. tous les $\mu_j$ sont-ils $\ge 0$ ?
3. la **complémentarité** est-elle vraie pour chaque $j$ ($\mu_j = 0$ ou $h_j = 0$) ?

**Un candidat qui échoue à l'un des trois n'est pas un candidat.** Ces vérifications prennent trente secondes et rattrapent l'essentiel des erreurs.

## 🔴 Common mistakes

1. **Ne pas réécrire les inégalités en « $\le 0$ ».** $x\ge0$ donne $h=-x$, donc $\nabla h = (-1,0)$ — **pas** $(1,0)$. Une erreur de signe ici fausse tous les $\mu_j$.
2. **Oublier la condition $\mu_j\ge0$.** C'est elle qui élimine la majorité des configurations (six sur sept dans l'exemple 12) et qui distingue min de max.
3. **Traiter un maximum en gardant $\mu_j\ge0$ avec $f$.** Le cours est explicite : appliquer le théorème à $-f$.
4. **Oublier la complémentarité.** Sans $\mu_jh_j(a)=0$, le système est sous-déterminé et n'a aucune raison d'avoir une solution isolée.
5. **Oublier de vérifier que les contraintes supposées inactives le sont vraiment.** Dans l'exemple 13, il faut contrôler que $x+y+z<0$ **strictement** au point trouvé — sinon la configuration est incohérente.
6. **Sauter la qualification.** C'est une hypothèse **explicite** du théorème 6.1, et l'étape 3 de la méthodologie.
7. **Oublier d'évaluer $f$ sur $A_0$.** L'étape 5 dit « les points de $A_0$ **et** $A_1$ ». Dans l'exemple 14, $(0,0)$ doit figurer au tableau final.
8. **Croire KKT suffisant.** Dans l'exercice 4.4 refait, $(0,1)$ vérifie KKT pour le maximum et vaut $16 < 17$. **C'est une condition nécessaire.**
9. **Appliquer Slater hors du cadre convexe.** La définition 6.6 exige $U$ convexe, les $g_i$ **affines** et les $h_j$ **convexes**. Sur une sphère ($g$ quadratique), elle ne s'applique pas.
10. **Chercher un point de Slater qui touche un mur.** Il faut **toutes** les $h_j$ strictement négatives **au même point**.
11. **Oublier les configurations mixtes.** Avec $q$ inégalités il y a $2^q$ cas ; en oublier un peut faire manquer le minimum. Le **tableau** est la parade.
12. **Confondre $\lambda$ et $\mu$.** Les $\lambda_i$ (égalités) sont de **signe quelconque** ; les $\mu_j$ (inégalités) sont **positifs ou nuls**. Mélanger les deux est l'erreur structurelle du chapitre.

## 📌 Ultimate Review

**Le chapitre 6 en un paragraphe.** Avec des inégalités $h_j\le0$, seules comptent en un point $a$ les contraintes **actives** ($h_j(a)=0$), rassemblées dans $J(a)$. Le théorème **KKT** dit alors qu'en un **minimum** local qualifié, $\nabla f(a)$ est une combinaison des gradients des contraintes, avec deux conditions nouvelles : les multiplicateurs d'inégalité sont **positifs** ($\mu_j\ge0$, *admissibilité*) et **nuls sur les contraintes inactives** ($\mu_jh_j(a)=0$, *complémentarité*). L'admissibilité est **asymétrique** : pour un maximum, il faut refaire la résolution avec $-f$. La qualification s'obtient par l'une de trois conditions suffisantes — **(QCA)** si tout est affine, **Slater** dans le cadre convexe avec un point strictement admissible, **Mangasarian-Fromovitz** sinon. La méthodologie tient en cinq étapes, dont les deux essentielles sont : chercher les points **non qualifiés** $A_0$, et **comparer $f$ sur $A_0\cup A_1$**.

**Les cinq énoncés à savoir citer.**

| N° | Énoncé | Usage |
|---|---|---|
| **6.1** | KKT : $\nabla f + \sum\lambda_i\nabla g_i+\sum\mu_j\nabla h_j = 0$, $\mu_j\ge0$, $\mu_jh_j=0$ | **le théorème** |
| **6.2 / 6.3** | Mangasarian-Fromovitz : $\nabla g_i$ libres $+$ une direction $v$ | cas général |
| **6.4 / 6.5** | **(QCA)** : contraintes affines ⟹ qualifié | polyèdres — le plus rapide |
| **6.6 / 6.7** | **Slater** : cadre convexe $+$ un point strictement admissible ⟹ **tout $A$** qualifié | optimisation convexe et linéaire |
| **§6.4** | la méthodologie en 5 étapes | le plan de rédaction |

**Les six problèmes traités, avec leurs réponses.**

| Problème | Contraintes | Réponse |
|---|---|---|
| **Ex. 4.3** refait | $x\ge0$, $0\le y\le1$ | $A_1=\{(0,0),(0,1)\}$ ; $\min = -1$ en $(0,1)$ |
| **Ex. 4.4** refait | carré $[0,2]^2$ | $\min = 4$ en $(2,1)$ ; $\max = 17$ en $(0,0)$ **et** $(0,2)$, avec $(0,1)$ candidat non retenu |
| **Ex. 11** | disque fermé | $\min(x+y) = -\sqrt2$ en $-\frac{1}{\sqrt2}(1,1)$ |
| **Ex. 12** | triangle | $\min = -\frac{11}{3}$ en $\left(\frac13,\frac23\right)$ ; **6 configurations sur 7 éliminées** |
| **Ex. 13** | sphère $+$ demi-espace | $\min = -\sqrt{14}$ ; l'inégalité est **inactive** ($\mu=-2<0$ dans l'autre cas) |
| **Ex. 14** | $y^2\le x^2$ | $\min = \frac12$ en $\left(\pm\frac12,-\frac12\right)$ ; $(0,0)$ **non qualifié**, $f=1$ |

**Le tableau qui résume les trois chapitres 4-5-6.**

|  | Contrainte | Condition en un extremum | Multiplicateurs |
|---|---|---|---|
| **Ch. 4** intérieur | aucune | $\nabla f(a) = 0$ | — |
| **Ch. 4** bord | quelconque | $\langle\nabla f(a),h\rangle\ge0$ sur $C(a)$ | — |
| **Ch. 5** | $g_i = 0$ | $\nabla f + \sum\lambda_i\nabla g_i = 0$ | $\lambda_i$ **quelconques** |
| **Ch. 6** | $g_i=0$, $h_j\le0$ | idem $+\sum\mu_j\nabla h_j$ | $\mu_j \ge 0$ **et** $\mu_jh_j=0$ |

**La phrase qui relie tout le cours.** *À l'intérieur, on peut bouger dans les deux sens : égalité. Au bord, dans un seul : inégalité — et son sens distingue le minimum du maximum.* C'était la proposition 3.4 en dimension 1 (fiche 601), l'inéquation d'Euler en dimension $n$ (fiche 603), et c'est la condition $\mu_j\ge0$ ici. **Un seul principe, trois écritures.**

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Écrire l'ensemble $\{x\ge0,\ y\ge0,\ x+y\le1\}$ sous la forme du cours, et donner $J(a)$ en trois points.**

</summary>

$$h_1(x,y)=-x, \qquad h_2(x,y)=-y, \qquad h_3(x,y)=x+y-1,$$

et $A = \{h_1\le0,\ h_2\le0,\ h_3\le0\}$.

| Point | $h_1$ | $h_2$ | $h_3$ | $J(a)$ |
|---|---|---|---|---|
| $\left(\frac12,\frac12\right)$ | $-\frac12$ | $-\frac12$ | $0$ | $\{3\}$ |
| $(1,0)$ | $-1$ | $0$ | $0$ | $\{2,3\}$ |
| $\left(\frac14,\frac14\right)$ | $-\frac14$ | $-\frac14$ | $-\frac12$ | $\emptyset$ |

Les deux premiers sont les exemples du cours. $\lvert J(a)\rvert$ compte les « murs » que le point touche.

</details>

<details class="details--riche">
<summary>

**2. Énoncer le théorème KKT avec ses deux conditions.**

</summary>

Si $a\in A$ est **qualifié** et est un **minimum local** de $f$, alors il existe $\lambda\in\mathbb{R}^p$ et $\mu\in\mathbb{R}^q$ tels que

$$\nabla f(a) + \sum_{i=1}^p\lambda_i\nabla g_i(a) + \sum_{j=1}^q\mu_j\nabla h_j(a) = 0_{\mathbb{R}^n},$$

avec, pour tout $j$ :

- $\mu_j \ge 0$ — **admissibilité** ;
- $\mu_j\,h_j(a) = 0$ — **complémentarité**.

Les $\lambda_i$ (égalités) sont de **signe quelconque** ; seuls les $\mu_j$ sont contraints.

</details>

<details class="details--riche">
<summary>

**3. Expliquer la condition de complémentarité comme le fait le cours.**

</summary>

Si la contrainte $j$ est **inactive** en $a$ ($h_j(a)<0$), elle ne sert pas à décrire $A$ localement — *« on pourrait l'enlever car $a$ ne sent pas cette contrainte »* — donc elle ne doit pas apparaître dans la condition de minimum : $\mu_j = 0$.

Si elle est **active**, $h_j(a)=0$ et le produit $\mu_jh_j(a)$ est nul quelle que soit la valeur de $\mu_j$.

**Sous forme utilisable** : pour chaque $j$, $\mu_j=0$ **ou** $h_j(a)=0$. C'est la disjonction qui structure toute résolution — avec $q$ inégalités, elle engendre $2^q$ configurations à balayer.

</details>

<details class="details--riche">
<summary>

**4. Expliquer la condition $\mu_j\ge0$ et pourquoi elle brise la symétrie min/max.**

</summary>

**L'explication du cours** : si la contrainte $j$ est active et $a$ est un **minimum**, $f$ doit **augmenter** quand on rentre dans $A$. Or $\nabla h_j$ pointe vers l'extérieur (là où $h_j$ croît). Il faut donc que $\nabla f$ et $\nabla h_j$ soient de **sens opposés**, ce qu'encode $\mu_j\ge0$ dans $\nabla f = -\mu_j\nabla h_j$.

**Pourquoi c'est asymétrique** : une égalité contraint des deux côtés, donc son multiplicateur n'a pas de sens privilégié ($\lambda_i$ quelconque). Une inégalité ne contraint que d'un côté, et ce côté distingue le haut du bas.

**Conséquence pratique** : pour un maximum, on applique le théorème à $-f$ (remarque du cours). C'est la **seule** dissymétrie min/max de tout le cours.

</details>

<details class="details--riche">
<summary>

**5. Citer les trois conditions de qualification et dire laquelle tester en premier.**

</summary>

| Condition | Hypothèse | Portée |
|---|---|---|
| **(QCA)** (déf. 6.4) | toutes les $g_i$, $h_j$ **affines** au voisinage de $a$ | qualifié en $a$ |
| **Slater** (déf. 6.6) | cadre **convexe** ($U$ convexe, $g_i$ affines, $h_j$ convexes) + un $a_0$ avec toutes les $h_j(a_0)<0$ | **toute** la contrainte |
| **Mangasarian-Fromovitz** (déf. 6.2) | $\nabla g_i(a)$ libres + $\exists v$ avec $\langle\nabla g_i,v\rangle=0$ et $\langle\nabla h_j,v\rangle<0$ sur $J(a)$ | qualifié en $a$ |

**Tester (QCA) en premier** : sur un polyèdre (triangle, carré, simplexe, programme linéaire), elle règle l'étape 3 en une ligne. Puis Slater si le problème est convexe. M.-F. en dernier recours.

</details>

<details class="details--riche">
<summary>

**6. Énoncer les cinq étapes de la méthodologie du §6.4.**

</summary>

1. Vérifier que les $g_i$ et $h_j$ sont de classe $C^1$ sur $U$.
2. Prouver que $f$ admet un **minimum global** sur $A$ (Weierstrass ou coercivité).
3. Chercher les points de $A$ **non qualifiés** : $A_0$.
4. Chercher parmi les points qualifiés ceux vérifiant **KKT** : $A_1$.
5. Évaluer $f$ sur $A_0$ **et** $A_1$ et comparer.

**Les deux étapes qu'on oublie** : la 3 (chercher $A_0$) et le « $A_0$ **et** » de la 5. L'exemple 14 est construit pour les sanctionner.

</details>

<details class="details--riche">
<summary>

**7. Refaire l'exercice 4.3 avec KKT et dire ce que la méthode apporte par rapport au cône.**

</summary>

$\min x^4-y^2$ sur $\{x\ge0,\ 0\le y\le1\}$, soit $h_1=-x$, $h_2=-y$, $h_3=y-1$ — **toutes affines**, donc (QCA) : $A_0=\emptyset$.

Ligne 1 : $4x^3 = \mu_1$, et la complémentarité $\mu_1x=0$ donne $4x^4=0$, donc **$x=0$** — sans aucune disjonction.

Ligne 2 : $-2y-\mu_2+\mu_3=0$. Trois cas : $0<y<1$ impossible ; $y=0$ donne $\mu_2=0$ ; $y=1$ donne $\mu_3=2$ .

$A_1=\{(0,0),(0,1)\}$, avec $f=0$ et $f=-1$. **Minimum $-1$ en $(0,1)$.**

**Ce que KKT apporte** : la méthode **produit** les candidats au lieu de les vérifier, la qualification tient en une ligne, et $x=0$ sort du calcul au lieu d'être deviné géométriquement.

</details>

<details class="details--riche">
<summary>

**8. Dans l'exemple 12, combien de configurations sont éliminées, et par quoi ?**

</summary>

Sept configurations réalisables, **une seule survit**.

- **Trois** éliminées parce que le point sort du triangle : $J=\emptyset$ (donne $y=-\frac43$), $J=\{1\}$ ($y=2$), $J=\{2\}$ ($x=1$).
- **Trois** éliminées par $\mu_j<0$ : les trois **sommets** $(0,0)$, $(1,0)$, $(0,1)$.
- **Une** retenue : $J=\{3\}$, donnant $\left(\frac13,\frac23\right)$ avec $\mu_3=4\ge0$ et $f=-\frac{11}{3}\approx-3{,}667$.

**La condition $\mu_j\ge0$ élimine à elle seule les trois sommets** — sans elle, il faudrait les évaluer tous. C'est la valeur ajoutée de KKT sur une énumération du bord.

</details>

<details class="details--riche">
<summary>

**9. Dans l'exemple 13, comment prouve-t-on que la contrainte d'inégalité est inactive ?**

</summary>

On suppose d'abord qu'elle est **active** ($x+y+z=0$). En sommant les trois lignes du système KKT :

$$x+y+z = -\frac{(1+\mu)+(2+\mu)+(3+\mu)}{2\lambda} = -\frac{6+3\mu}{2\lambda} = 0 \implies \mu = -2 .$$

$\mu=-2 < 0$ **viole l'admissibilité** : aucun candidat n'a la contrainte active.

Donc elle est inactive, $\mu=0$, et le problème se réduit au chapitre 5 : $\lambda = \frac{\sqrt{14}}2$, point $-\frac{(1,2,3)}{\sqrt{14}}$, minimum $-\sqrt{14}\approx-3{,}7417$.

**Contrôle** : au point trouvé, $x+y+z = -\frac{6}{\sqrt{14}} \approx -1{,}604 < 0$ strictement , cohérent avec $\mu=0$.

**C'est le rôle principal du signe de $\mu$ dans les problèmes mixtes** : prouver quelle contrainte mord.

</details>

<details class="details--riche">
<summary>

**10. Pourquoi l'exemple 14 est-il le meilleur exercice du chapitre ?**

</summary>

$\min x^2+(y+1)^2$ sur $\{y^2\le x^2\}$ réunit **les trois pièges** :

1. **Un point non qualifié** : $\nabla h = (-2x,2y)$ s'annule en $(0,0) \in A$ — le croisement des droites $y=\pm x$. Il faut le chercher (étape 3) et l'évaluer (étape 5) : $f(0,0)=1$.
2. **Une multiplicité de minima** : $\left(\pm\frac12,-\frac12\right)$, tous deux à $f=\frac12$.
3. **La complémentarité détermine la solution** : l'équation $2x(1-\mu)=0$ force $x=0$ (exclu) ou $\mu=1>0$, ce qui **impose** $h=0$ donc $y^2=x^2$, d'où $x=\pm\frac12$.

**Et le contrôle géométrique** : $f$ est le carré de la distance à $Q(0,-1)\notin A$ ; les deux minima sont les projetés orthogonaux de $Q$ sur les droites $y=\pm x$, à distance $\frac{1}{\sqrt2}$, donc $f=\frac12$ .

Si $Q$ avait été en $(0,0)$, le minimum aurait été le point **non qualifié** — que KKT n'aurait jamais trouvé.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La contrainte du chapitre 6 ? | $g_i = 0$ **et** $h_j \le 0$ |
| Le geste préalable ? | Réécrire toutes les inégalités en $h_j \le 0$ |
| $x\ge0$ devient ? | $h = -x \le 0$, donc $\nabla h = (-1,0)$ |
| $x+y\le1$ devient ? | $h = x+y-1 \le 0$ |
| Contrainte **active** en $a$ ? | $h_j(a) = 0$ |
| Contrainte **inactive** ? | $h_j(a) < 0$ |
| $J(a)$ ? | Les indices des contraintes **actives** |
| $J\left(\frac12,\frac12\right)$ sur le triangle ? | $\{3\}$ |
| $J(1,0)$ ? | $\{2,3\}$ |
| $\lvert J(a)\rvert$ compte ? | Les « murs » que le point touche |
| Théorème KKT ? | $\nabla f + \sum\lambda_i\nabla g_i + \sum\mu_j\nabla h_j = 0$ |
| Ses hypothèses ? | $a$ **qualifié**, $a$ **minimum** local |
| Condition d'admissibilité ? | $\mu_j \ge 0$ |
| Condition de complémentarité ? | $\mu_j\,h_j(a) = 0$ |
| Signe des $\lambda_i$ ? | **Quelconque** |
| Signe des $\mu_j$ ? | **Positif ou nul** |
| Contrainte inactive ⟹ ? | $\mu_j = 0$ |
| $\mu_j > 0$ ⟹ ? | Contrainte **active** |
| Pourquoi $\mu_j\ge0$ ? | $\nabla f$ et $\nabla h_j$ de **sens opposés** |
| Pour un maximum ? | Appliquer le théorème à **$-f$** |
| La dissymétrie min/max vient de ? | La condition $\mu_j\ge0$ |
| Est-elle présente au chapitre 5 ? | **Non** — $\lambda$ quelconque |
| KKT est-il suffisant ? | **Non** — cf. $(0,1)$ dans l'exercice 4.4 |
| Mangasarian-Fromovitz (6.2) ? | $\nabla g_i$ libres + $\exists v$ qui longe les $g_i$ et **rentre** dans les $h_j$ actives |
| La condition (b) de M.-F. ? | $\langle\nabla h_j(a),v\rangle < 0$, **strictement** |
| (QCA) (déf. 6.4) ? | Toutes les contraintes **affines** |
| Sa portée ? | Qualifié **en $a$** |
| Quand l'utiliser ? | Polyèdres — à tester **en premier** |
| Slater (déf. 6.6) ? | Un $a_0$ avec **toutes** les $h_j(a_0)<0$ |
| Son cadre ? | $U$ convexe, $g_i$ **affines**, $h_j$ **convexes** |
| Sa portée ? | **Toute** la contrainte $A$ |
| Un point de Slater sur le triangle ? | $\left(\frac14,\frac14\right)$ |
| Slater s'applique notamment à ? | L'**optimisation linéaire** |
| Étape 1 de la méthodologie ? | Les $g_i$, $h_j$ sont-elles $C^1$ ? |
| Étape 2 ? | Prouver l'**existence** |
| Étape 3 ? | $A_0$ = les points **non qualifiés** |
| Étape 4 ? | $A_1$ = les points vérifiant KKT |
| Étape 5 ? | Évaluer $f$ sur $A_0$ **et** $A_1$ |
| Les deux étapes qu'on oublie ? | La **3**, et le « $A_0$ et » de la **5** |
| Exercice 4.3 par KKT : $A_1$ ? | $\{(0,0),\ (0,1)\}$, minimum $-1$ |
| Ce qui donne $x=0$ ? | $\mu_1 = 4x^3$ et $\mu_1 x = 0$ |
| Exercice 4.4 : minimum ? | $4$ en $(2,1)$ — **un seul** candidat |
| Maximum ? | $17$ en $(0,0)$ et $(0,2)$ |
| Le candidat non retenu ? | $(0,1)$, où $f=16$ |
| Exemple 11 : réponse ? | $-\sqrt2$ en $-\frac{1}{\sqrt2}(1,1)$ |
| Ce qui sélectionne le bon point ? | Le **signe** de $\mu$ |
| Exemple 12 : réponse ? | $-\frac{11}{3}$ en $\left(\frac13,\frac23\right)$, $\mu_3=4$ |
| Combien de cas éliminés ? | **6 sur 7**, dont **3 par $\mu_j<0$** |
| Exemple 13 : réponse ? | $-\sqrt{14} \approx -3{,}7417$ |
| L'inégalité y est ? | **Inactive** — l'autre cas donnait $\mu=-2$ |
| Exemple 14 : le point non qualifié ? | $(0,0)$, où $\nabla h = (0,0)$ |
| Le minimum ? | $\frac12$ en $\left(\pm\frac12,\ -\frac12\right)$ |
| Sa lecture géométrique ? | Distance de $(0,-1)$ aux droites $y=\pm x$ |
| Le principe unique des chapitres 3 à 6 ? | Égalité à l'intérieur, **inégalité** au bord |
|  |  |
