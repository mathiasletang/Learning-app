# Fiche 602 — Gradient, hessienne, Taylor à l'ordre 2 et existence en dimension $n$

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Montaru, *Optimisation*, TSE, 16 mars 2025 — **chapitre 4, §4.1 et §4.2**, p. 19–21 |
| **Difficulté** | Must know — les objets de tout le reste du cours |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 600 (compacts, coercivité) et 601 (Taylor-Young en dimension 1) |
| **Concepts clés** | $C^1$, $C^2$, gradient, Taylor-Young à l'ordre 1 et 2, matrice hessienne, forme quadratique, la fonction $\varphi(t)=f(a+th)$, existence sur un compact, coercivité sur un fermé non borné |
| **Poids à l'examen** | La **proposition 4.6** ($\varphi(t) = f(a+th)$) est la clé de toutes les preuves du chapitre : elle ramène la dimension $n$ à la dimension 1. Les **théorèmes 4.7 et 4.9** sont la question 1 de chaque exercice. |

> **Convention.** Les énoncés numérotés sont ceux de M. Montaru. Les démonstrations et les exemples chiffrés sont des **reconstructions** signalées comme telles — le polycopié annonce que les preuves sont faites au tableau.

## 🎯 Vue d'ensemble

```
LES DEUX OBJETS DU CHAPITRE 4

  GRADIENT  ∇f(a) ∈ ℝⁿ           un VECTEUR    — l'ordre 1
     ∇f(a) = ( ∂f/∂x₁(a), … , ∂f/∂xₙ(a) )ᵀ

  HESSIENNE H_f(a) ∈ Sₙ(ℝ)       une MATRICE SYMÉTRIQUE — l'ordre 2
     H_f(a)ᵢⱼ = ∂²f/∂xᵢ∂xⱼ (a)


LES DEUX FORMULES QUI LES METTENT EN JEU

  ordre 1 (prop. 4.3)   f(a+h) = f(a) + ⟨∇f(a), h⟩ + o(h)
  ordre 2 (prop. 4.5)   f(a+h) = f(a) + ⟨∇f(a), h⟩ + ½⟨h, H_f(a)h⟩ + ε(h)‖h‖²
                                   └─ linéaire ─┘   └── quadratique ──┘


LE PONT AVEC LA DIMENSION 1 (prop. 4.6) — la clé de toutes les preuves

  φ(t) = f(a + th)     « je regarde f le long de la droite qui part de a
                         dans la direction h »

  φ'(0)  = ⟨∇f(a), h⟩        ←  l'ordre 1 devient un nombre
  φ''(0) = ⟨h, H_f(a)h⟩      ←  l'ordre 2 devient un nombre

  ⟹  tout énoncé du chapitre 3 se transporte, direction par direction


L'EXISTENCE (§4.2) — deux théorèmes, exactement comme au chapitre 2

  A compact       + f continue                 → thm 4.7   min ET max
  A fermé NON borné + f continue + f coercive  → thm 4.9   min
                                  f → −∞       → thm 4.9   max

  ⚠ l'existence ne dit RIEN de l'UNICITÉ : f(x₁,x₂) = x₁² est minimale
     sur TOUTE la droite x₁ = 0
```

## 🔴 Concept 1 — Classes $C^1$, $C^2$ et gradient (déf. 4.1, 4.2)

**Définition 4.1 (cours).** Soit $U$ un ouvert de $\mathbb{R}^n$ et $f : U \to \mathbb{R}$.

- $f$ est de classe $C^1$ sur $U$ (noté $f \in C^1(U)$) si toutes les dérivées partielles **premières** de $f$ existent et sont **continues** sur $U$.
- $f$ est de classe $C^2$ sur $U$ si toutes les dérivées partielles premières **et secondes** existent et sont continues sur $U$.

**Définition 4.2 (cours).** Si $f \in C^1(U)$, on définit pour tout $x \in U$ le **gradient** de $f$ en $x$ par

$$\nabla f(x) = \begin{pmatrix} \dfrac{\partial f}{\partial x_1}(x) \\[4pt] \dfrac{\partial f}{\partial x_2}(x) \\[2pt] \vdots \\[2pt] \dfrac{\partial f}{\partial x_n}(x) \end{pmatrix}.$$

⚠️ **Le gradient est un vecteur COLONNE.** Le cours l'écrit ainsi, et ce n'est pas cosmétique : dans $\langle \nabla f(a), h\rangle$ les deux arguments sont des vecteurs de $\mathbb{R}^n$, et dans $\nabla f(a) + \sum \lambda_i \nabla g_i(a) = 0_{\mathbb{R}^n}$ (théorème des extrema liés, ch. 5), l'égalité est entre vecteurs colonnes. Écrire le gradient en ligne conduit vite à des produits matriciels qui ne se composent pas.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — ce que $C^1$ apporte de plus que « les dérivées partielles existent ».</span>

L'existence seule des dérivées partielles ne suffit pas à la différentiabilité. Le contre-exemple standard :

$$f(x,y) = \begin{cases} \dfrac{xy}{x^2+y^2} & \text{si } (x,y)\neq(0,0)\\[4pt] 0 & \text{sinon.}\end{cases}$$

Ses deux dérivées partielles existent en $(0,0)$ et valent $0$ (car $f$ est nulle sur les deux axes), et pourtant $f$ **n'est même pas continue** en $(0,0)$ : le long de $y=x$, $f(t,t) = \frac{t^2}{2t^2} = \frac12$ pour tout $t \neq 0$, donc $f$ tend vers $\frac12$ et non vers $0$.

**Contrôle numérique** : $f(0{,}001,\ 0{,}001) = 0{,}5$ exactement, alors que $f(0{,}001,\ 0) = 0$.

C'est pourquoi le cours ne travaille **jamais** avec « les dérivées partielles existent » mais toujours avec **$f \in C^1(U)$** : la **continuité** des dérivées partielles est ce qui garantit la formule de Taylor 4.3. Toutes les fonctions des exercices (polynômes, exponentielles, quotients à dénominateur non nul) sont $C^\infty$, donc la vérification est immédiate — mais elle doit figurer sur la copie.

</div>

## 🔴 Concept 2 — Taylor-Young à l'ordre 1 (prop. 4.3)

**Proposition 4.3 (cours) — formule de Taylor-Young à l'ordre 1.** Si $f \in C^1(U)$ et $a \in U$, on a le développement limité

$$f(a+h) = f(a) + \langle \nabla f(a), h\rangle + o(h)$$

où $o(h) = \epsilon(h)\lVert h \rVert$ avec $\epsilon(h) \xrightarrow[h\to0]{} 0$.

**Remarque (cours).** Cela veut dire que $f$ est **différentiable** en $a$ et que

$$df(a).h = \langle \nabla f(a), h\rangle .$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que la formule dit, en français.</span>

*Près de $a$, $f$ se comporte comme une fonction affine* : une constante $f(a)$ plus une forme linéaire en $h$. Le gradient est le **seul** vecteur qui réalise cette approximation — c'est ce qui le rend unique et intrinsèque.

**Le rôle du $\lVert h \rVert$ dans le reste.** Écrire $o(h) = \epsilon(h)\lVert h \rVert$ plutôt qu'un simple $\epsilon(h)$ est essentiel : le reste doit être négligeable **devant le terme linéaire**, qui est lui-même d'ordre $\lVert h \rVert$. C'est la transposition exacte de la définition 3.8 du chapitre 3.

</div>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — vérification numérique de la proposition 4.3.</span>

Prenons $f(x,y) = x^2 y + 3y$ en $a = (1,2)$.

$\dfrac{\partial f}{\partial x} = 2xy$ et $\dfrac{\partial f}{\partial y} = x^2+3$, donc $\nabla f(1,2) = \begin{pmatrix} 4 \\ 4\end{pmatrix}$ et $f(1,2) = 2+6 = 8$.

Pour $h = (0{,}01,\ 0{,}01)$ :

| Quantité | Valeur |
|---|---|
| $f(a+h) = f(1{,}01,\ 2{,}01)$ | $8{,}080401$ |
| $f(a) + \langle \nabla f(a),h\rangle = 8 + 4(0{,}01)+4(0{,}01)$ | $8{,}08$ |
| reste | $4{,}01\times10^{-4}$ |
| $\lVert h \rVert_2 = 0{,}01\sqrt2$ | $1{,}4142\times10^{-2}$ |
| $\epsilon(h) = \text{reste}/\lVert h \rVert$ | $2{,}836\times10^{-2}$ |

En divisant $h$ par $10$ ($h = (0{,}001,0{,}001)$), le reste passe à $4{,}001\times10^{-6}$ et $\epsilon(h)$ à $2{,}829\times10^{-3}$ : **$\epsilon(h)$ est bien divisé par $10$, donc tend vers $0$**. C'est précisément l'énoncé de la proposition 4.3.

</div>

## 🔴 Concept 3 — Hessienne et Taylor-Young à l'ordre 2 (déf. 4.4, prop. 4.5)

**Définition 4.4 (cours).** Si $f \in C^2(U)$, on définit pour tout $x \in U$ la **matrice hessienne** de $f$ en $x$ par

$$H_f(x) = \begin{pmatrix} \dfrac{\partial^2 f}{\partial x_1^2}(x) & \cdots & \dfrac{\partial^2 f}{\partial x_1 \partial x_n}(x) \\[6pt] \dfrac{\partial^2 f}{\partial x_2 \partial x_1}(x) & \cdots & \dfrac{\partial^2 f}{\partial x_2 \partial x_n}(x) \\[2pt] \vdots & \ddots & \vdots \\[2pt] \dfrac{\partial^2 f}{\partial x_n \partial x_1}(x) & \cdots & \dfrac{\partial^2 f}{\partial x_n^2}(x)\end{pmatrix} \;\in\; S_n(\mathbb{R}) \quad \text{(matrice symétrique)}.$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi elle est symétrique — le théorème de Schwarz.</span>

Le cours écrit directement $H_f(x) \in S_n(\mathbb{R})$ sans le justifier. La raison est le **théorème de Schwarz** : si $f \in C^2$, alors

$$\frac{\partial^2 f}{\partial x_i \partial x_j} = \frac{\partial^2 f}{\partial x_j \partial x_i} .$$

**L'hypothèse $C^2$ est ce qui le rend vrai** — c'est la deuxième raison, après Taylor, pour laquelle le cours impose la continuité des dérivées secondes.

**Conséquence pratique immédiate** : en dimension 2 on n'a que **trois** coefficients à calculer, pas quatre. Le cours les notera $r$, $s$, $t$ au théorème 4.16 :

$$H_f(a) = \begin{pmatrix} r & s \\ s & t\end{pmatrix}, \qquad r = \frac{\partial^2 f}{\partial x^2}(a),\quad t = \frac{\partial^2 f}{\partial y^2}(a),\quad s = \frac{\partial^2 f}{\partial x\partial y}(a).$$

</div>

**Proposition 4.5 (cours) — formule de Taylor-Young à l'ordre 2.** Si $f \in C^2(U)$,

$$f(a+h) = f(a) + \langle \nabla f(a), h\rangle + \tfrac12 \langle h, H_f(a)h\rangle + \epsilon(h)\lVert h \rVert^2, \qquad \epsilon(h)\xrightarrow[h\to0]{}0 .$$

**Remarque (cours).** $Q(h) = \langle h, H_f(a)h\rangle$ est une **forme quadratique** sur $\mathbb{R}^n$ :

$$Q(h) = \sum_{i,j=1\ldots n} \frac{\partial^2 f}{\partial x_i \partial x_j}(a)\, h_i h_j .$$

> **C'est LA formule du chapitre 4.** Tout ce qui suit en découle. Si $a$ est un point critique ($\nabla f(a)=0$), le terme linéaire disparaît et il reste
>
> $$f(a+h) - f(a) = \tfrac12 Q(h) + \epsilon(h)\lVert h \rVert^2 .$$
>
> **Le signe de $f(a+h)-f(a)$ est donc gouverné par le signe de la forme quadratique $Q$** — d'où toute la théorie des théorèmes 4.15 et 4.16 (fiche 603) :
>
> | $Q$ | Conclusion en $a$ |
> |---|---|
> | définie **positive** ($Q(h)>0$ pour $h\neq0$) | **minimum** local |
> | définie **négative** | **maximum** local |
> | **indéfinie** (change de signe) | **point selle** |
> | dégénérée ($Q(h)=0$ pour un $h\neq0$) | **on ne conclut pas** |
>
> La dernière ligne est le pendant exact du cas $f''(t_0)=0$ de la fiche 601.

## 🔴 Concept 4 — Le pont vers la dimension 1 : $\varphi(t) = f(a+th)$ (prop. 4.6)

**Proposition 4.6 (cours).** Soit $f \in C^2(U)$, $a \in U$ et $h \in \mathbb{R}^n$. On pose

$$\varphi(t) = f(a+th),$$

définie sur $\,]-\epsilon,\epsilon[$ pour $\epsilon$ assez petit. Alors

$$\varphi'(t) = \langle \nabla f(a+th), h\rangle = \sum_{i=1}^n \frac{\partial f}{\partial x_i}(a+th)\,h_i,$$

$$\varphi''(t) = \langle h, H_f(a+th)\,h\rangle = \sum_{i=1}^n\sum_{j=1}^n \frac{\partial^2 f}{\partial x_i \partial x_j}(a+th)\,h_i h_j .$$

En particulier, pour $t=0$ :

$$\varphi'(0) = \langle \nabla f(a), h\rangle, \qquad \varphi''(0) = \langle h, H_f(a)h\rangle .$$

> **C'est la proposition la plus utile du chapitre, et la plus discrète.** Elle dit : *pour comprendre $f$ en dimension $n$, il suffit de la regarder le long d'une droite à la fois, et on retombe sur le chapitre 3.*
>
> ```
>                       h
>              a ────────────────►      la droite  t ↦ a + th
>              │
>           φ(t) = f(a + th)            une fonction d'UNE variable
> 
>   φ'(0)  = ⟨∇f(a), h⟩       ← la PENTE de f dans la direction h
>   φ''(0) = ⟨h, H_f(a)h⟩     ← la COURBURE de f dans la direction h
> ```
>
> **Les trois usages qu'en fait le cours** — repérez-les, ils reviennent :
>
> 1. **Prop. 5.9 (fiche 604)** : la pente de $f$ dans la direction $h$ est $\varphi'(0) = \langle \nabla f(a), h\rangle$ ; le gradient normalisé est la direction de plus forte pente.
> 2. **Théorème des extrema liés (5.7, fiche 604)** : on compose $f$ avec une **courbe** $c$ tracée dans la contrainte, et on écrit $(f\circ c)'(0)=0$. Même idée, avec une courbe au lieu d'une droite.
> 3. **Théorème 4.15 (fiche 603)** : la nature d'un point critique se lit sur le signe de $\varphi''(0) = Q(h)$ **pour toutes les directions $h$**. Un point selle est un point où $\varphi$ a un minimum dans une direction et un maximum dans une autre.

> **Preuve reconstruite de $\varphi'(t) = \langle\nabla f(a+th),h\rangle$.** C'est la règle de dérivation composée : $\varphi = f \circ \gamma$ avec $\gamma(t) = a+th$, dont la dérivée est $\gamma'(t) = h$ (constante). La différentielle donne
>
> $$\varphi'(t) = df(\gamma(t)).\gamma'(t) = df(a+th).h = \langle \nabla f(a+th), h\rangle ,$$
>
> la dernière égalité étant la remarque de la proposition 4.3. Pour $\varphi''$, on redérive coordonnée par coordonnée :
>
> $$\varphi''(t) = \sum_i h_i \frac{d}{dt}\left[\frac{\partial f}{\partial x_i}(a+th)\right] = \sum_i h_i \sum_j \frac{\partial^2 f}{\partial x_j \partial x_i}(a+th)\,h_j = \langle h, H_f(a+th)h\rangle . \qquad \blacksquare$$

## 🔴 Concept 5 — L'existence sur un compact (thm 4.7)

**Théorème 4.7 (cours).** Supposons $f \in C(A)$ et $A$ **compacte**. Alors $f$ admet un minimum global sur $A$ **et** un maximum global sur $A$.

**Rappel (cours).** $A \subset \mathbb{R}^d$ est compacte ssi $A$ est **bornée et fermée** dans $\mathbb{R}^d$.

<div class="callout" data-kind="formel">

<span class="callout__lab">théorème 2.22 (Weierstrass)</span>

C'est mot pour mot le de la fiche 600, redonné ici parce qu'on va s'en servir constamment. Rien de neuf ; la seule chose à retenir est qu'il donne les **deux** extrema d'un coup.

</div>

## 🔴 Concept 6 — La coercivité sur un ensemble non borné (déf. 4.8, thm 4.9)

**Définition 4.8 (cours).** Supposons $A$ **non bornée** dans $\mathbb{R}^d$. La fonction $f : A \to \mathbb{R}$ est dite **coercive sur $A$** si

$$\lim_{\substack{\lVert x \rVert \to \infty \\ x \in A}} f(x) = +\infty .$$

⚠️ **Le « $x \in A$ » change tout par rapport à la définition 2.25.** Ici on ne demande le comportement de $f$ que **dans $A$**. Une fonction peut donc être coercive sur $A$ sans l'être sur $\mathbb{R}^d$ — et c'est exactement le cas de l'exercice 4.1 ci-dessous.

**Exercice 4.1 (cours).** Montrer que $f(x,y) = x^4 - y^2$ est coercive sur $A = \mathbb{R}_+ \times [0,1]$.

**Théorème 4.9 (cours).** Soit $A$ **fermée non bornée** dans $\mathbb{R}^d$ et $f \in C(A)$.

- Si $f$ est **coercive** sur $A$, alors $f$ admet un **minimum global** sur $A$.
- Si $\displaystyle\lim_{\lVert x \rVert\to\infty,\ x\in A} f(x) = -\infty$, alors $f$ admet un **maximum global** sur $A$.

**Encadré ATTENTION (cours).** *L'existence d'un extremum global ne garantit absolument pas l'unicité du point où cet extremum est pris.* Par exemple, $f(x_1,x_2) = x_1^2$ atteint son minimum global sur $\mathbb{R}^2$ (de valeur nulle) sur toute la droite $x_1=0$ : il y a une **infinité** de minima globaux.

<details class="details--riche">
<summary>

**Exercice résolu — exercice 4.1 du cours : coercivité de $x^4-y^2$ sur $\mathbb{R}_+\times[0,1]$**

</summary>

**Énoncé (cours, exercice 4.1).** Montrer que $f(x,y) = x^4 - y^2$ est coercive sur $A = \mathbb{R}_+ \times [0,1]$.

**Ce qui rend l'exercice intéressant.** Sur $\mathbb{R}^2$ tout entier, $f$ n'est **pas** coercive : le long de l'axe $x=0$, $f(0,y) = -y^2 \to -\infty$. C'est la restriction à $A$ qui sauve tout — et c'est précisément le point de la définition 4.8.

**Étape 1 — exploiter la borne sur $y$.** Sur $A$, on a $y \in [0,1]$, donc

$$0 \le y^2 \le 1 \qquad \Longrightarrow \qquad f(x,y) = x^4 - y^2 \;\ge\; x^4 - 1 .$$

Le terme parasite est **borné**, c'est tout ce dont on a besoin.

**Étape 2 — relier $x$ à la norme.** Pour $(x,y) \in A$ :

$$\lVert (x,y) \rVert_2^2 = x^2 + y^2 \le x^2 + 1 \qquad \Longrightarrow \qquad x^2 \ge \lVert (x,y) \rVert_2^2 - 1 .$$

Donc dès que $\lVert (x,y) \rVert_2 \ge 1$ (ce qui est le cas quand la norme tend vers l'infini) :

$$x^4 \ge \bigl(\lVert (x,y) \rVert_2^2 - 1\bigr)^2 .$$

**Étape 3 — conclure.** En combinant :

$$f(x,y) \;\ge\; \bigl(\lVert (x,y) \rVert_2^2 - 1\bigr)^2 - 1 \;=\; \varphi\bigl(\lVert (x,y) \rVert_2\bigr)$$

avec $\varphi(u) = (u^2-1)^2 - 1 \to +\infty$ quand $u\to+\infty$. **$f$ est donc coercive sur $A$** au sens de la définition 4.8. ∎

**La rédaction avec les quantificateurs** (si l'énoncé la demande) : soit $K>0$. Posons $R = \sqrt{1+\sqrt{K+1}}$. Alors $\lVert (x,y) \rVert_2 \ge R$ entraîne $\lVert (x,y) \rVert^2 - 1 \ge \sqrt{K+1}$, donc $x^4 \ge K+1$ et $f \ge (K+1)-1 = K$.

**Contrôle numérique.** Avec $K = 100$, la formule donne $R = \sqrt{1+\sqrt{101}} = 3{,}3241353$.

| $(x,y) \in A$ | $\lVert\cdot\rVert_2$ | $f(x,y)$ | $\ge 100$ ? |
|---|---|---|---|
| $(3{,}3241,\ 0)$ | $3{,}3241 = R$ | $122{,}0998$ | largement |
| $(3{,}1702,\ 1)$ | $3{,}3241 = R$ | $\mathbf{100{,}0000}$ | **exactement au seuil** |
| $(3{,}1623,\ 1)$ | $3{,}3166 < R$ | $99{,}0000$ | non — norme sous $R$ |

**La deuxième ligne montre que le $R$ trouvé est EXACTEMENT optimal**, pas seulement suffisant. C'est le pire cas de la contrainte ($y=1$, qui maximise le terme parasite $-y^2$) : pour lui, $x^2 = R^2-1 = \sqrt{101}$, donc $x^4 = 101$ et $f = 101 - 1 = 100 = K$, tout juste. Aucun $R$ plus petit ne conviendrait.

La troisième ligne, prise juste en dessous du seuil, donne $f = 99 < 100$ : la borne est **serrée des deux côtés**. Une chaîne de minorations qui produit une constante exactement optimale est le signe qu'aucune inégalité n'a été gaspillée.

**Étape 4 — ce qu'on en déduit.** $A = \mathbb{R}_+\times[0,1]$ est **fermé** (produit de deux fermés, ou intersection d'images réciproques de fermés par des fonctions continues — prop. 2.12) et **non borné** ($x$ n'est pas majoré). $f$ est polynomiale donc continue. Le **théorème 4.9** s'applique : **$f$ admet un minimum global sur $A$**.

⚠️ **Le théorème ne donne pas le maximum.** Et de fait il n'y en a pas : $f(x,0) = x^4 \to +\infty$ sur $A$. On ne peut pas non plus invoquer la seconde partie du théorème 4.9, qui exigerait $f \to -\infty$ — c'est l'inverse qui se produit.

**Où est ce minimum ?** Le chapitre 2 ne le dit pas ; c'est le travail de la fiche 603. Par curiosité : $f$ est minimale quand $x^4$ est le plus petit et $y^2$ le plus grand, soit $x=0$ et $y=1$, donnant $f(0,1) = -1$. Ce point est **sur le bord** de $A$ — le gradient $\nabla f = (4x^3,\ -2y)$ y vaut $(0,-2) \neq 0$. **La condition $\nabla f = 0$ ne s'y applique pas**, il faut l'inéquation d'Euler (prop. 4.14, fiche 603). C'est d'ailleurs pourquoi le cours reprend cette fonction dans l'exercice 4.3.

</details>

<details class="details--riche">
<summary>

**Exercice résolu — gradient, hessienne, Taylor à l'ordre 2 : la vérification complète**

</summary>

**Énoncé.** Soit $f(x,y) = x^3 + y^3 - 3xy$ (c'est la fonction de l'exercice 4.7 du cours). Calculer $\nabla f$ et $H_f$, puis vérifier numériquement la formule de Taylor-Young à l'ordre 2 en $a=(1,1)$.

**Étape 1 — les dérivées partielles premières.**

$$\frac{\partial f}{\partial x} = 3x^2 - 3y, \qquad \frac{\partial f}{\partial y} = 3y^2 - 3x, \qquad \nabla f(x,y) = \begin{pmatrix} 3x^2-3y \\ 3y^2-3x\end{pmatrix}.$$

En $a=(1,1)$ : $\nabla f(1,1) = \begin{pmatrix} 0 \\ 0\end{pmatrix}$ — **c'est un point critique**.

**Étape 2 — les dérivées partielles secondes.**

$$\frac{\partial^2 f}{\partial x^2} = 6x, \qquad \frac{\partial^2 f}{\partial y^2} = 6y, \qquad \frac{\partial^2 f}{\partial x \partial y} = -3 .$$

La dérivée croisée vaut $-3$ **dans les deux ordres** (dérivée de $3x^2-3y$ par rapport à $y$, ou de $3y^2-3x$ par rapport à $x$) : le théorème de Schwarz est vérifié à la main.

$$H_f(x,y) = \begin{pmatrix} 6x & -3 \\ -3 & 6y \end{pmatrix}, \qquad H_f(1,1) = \begin{pmatrix} 6 & -3 \\ -3 & 6\end{pmatrix}.$$

**Étape 3 — la formule de Taylor à l'ordre 2 en $(1,1)$.** Comme $\nabla f(1,1)=0$ et $f(1,1) = 1+1-3 = -1$ :

$$f(1+h_1,\ 1+h_2) = -1 + \tfrac12\bigl(6h_1^2 - 6h_1h_2 + 6h_2^2\bigr) + \epsilon(h)\lVert h \rVert^2 = -1 + 3\bigl(h_1^2 - h_1h_2 + h_2^2\bigr) + \epsilon(h)\lVert h \rVert^2 .$$

*(Le facteur $-6h_1h_2$ vient de $\langle h, H_f h\rangle = 6h_1^2 + 2\times(-3)h_1h_2 + 6h_2^2$ — les termes croisés apparaissent **deux fois** dans une forme quadratique. C'est l'erreur de calcul la plus fréquente du chapitre.)*

**Étape 4 — le reste est ici calculable EXACTEMENT.** $f$ est un polynôme de degré 3, donc son développement s'arrête à l'ordre 3 sans aucune approximation. En développant à la main :

$$f(1+h_1,\ 1+h_2) = -1 + 3\bigl(h_1^2 - h_1h_2 + h_2^2\bigr) + \bigl(h_1^3 + h_2^3\bigr) .$$

*(Les termes de degré 1 se simplifient exactement — c'est une autre façon de constater que $(1,1)$ est un point critique.)*

**Le reste de la proposition 4.5 vaut donc exactement $h_1^3+h_2^3$**, et on peut vérifier la formule au chiffre près.

**Étape 5 — vérification numérique.** Avec $h = (0{,}01,\ -0{,}02)$ :

| Quantité | Valeur |
|---|---|
| $f(1{,}01,\ 0{,}98)$ | $-0{,}997907$ |
| approximation d'ordre 2 : $-1 + 3(0{,}0001 + 0{,}0002 + 0{,}0004) = -1 + 0{,}0021$ | $-0{,}9979$ |
| reste observé | $-7{,}0\times10^{-6}$ |
| reste prédit $h_1^3+h_2^3 = 10^{-6} - 8\times10^{-6}$ | $-7{,}0\times10^{-6}$ |
| $\lVert h \rVert_2^2 = 10^{-4}+4\times10^{-4}$ | $5{,}0\times10^{-4}$ |
| $\epsilon(h)$ | $-1{,}4\times10^{-2}$ |

En divisant $h$ par $10$, soit $h=(0{,}001,\,-0{,}002)$ : reste $= -7{,}0\times10^{-9}$ (toujours $h_1^3+h_2^3$) et $\epsilon(h) = -1{,}4\times10^{-3}$. **$\epsilon(h)$ est divisé par exactement $10$ : il tend vers $0$**, comme l'annonce la proposition 4.5.

⚠️ **Notez que $\epsilon(h)$ est négatif.** Rien dans la proposition 4.5 n'impose un signe au reste — seulement qu'il tende vers $0$ après division par $\lVert h\rVert^2$. Ici le reste est même **plus grand en valeur absolue** que ce qu'un signe positif suggérerait naïvement, et c'est parfaitement conforme.

**Étape 5 — lire la nature du point critique sur $Q$.** La forme quadratique est

$$Q(h) = 6h_1^2 - 6h_1h_2 + 6h_2^2 = 6\left[\left(h_1 - \frac{h_2}{2}\right)^2 + \frac{3}{4}h_2^2\right]$$

(réduction de Gauss, la méthode que le cours mentionne au §4.4). Somme de deux carrés à coefficients **strictement positifs** : $Q$ est **définie positive**, donc $(1,1)$ est un **minimum local** (théorème 4.15, fiche 603).

**Contrôle par le critère $rt-s^2$ du théorème 4.16** : $r=6$, $t=6$, $s=-3$, donc

$$rt - s^2 = 36 - 9 = 27 > 0 \quad\text{et}\quad r = 6 > 0 \;\Longrightarrow\; \text{minimum local}. \ \checkmark$$

**Ce minimum local est-il global ?** **Non** : $f(t,t) = 2t^3 - 3t^2 \to -\infty$ quand $t\to-\infty$. Par exemple $f(-10,-10) = -2000-300 = -2300 < -1$. C'est la seconde question de l'exercice 4.7 du cours, traitée en fiche 603.

</details>

<details class="details--riche">
<summary>

**Exercice résolu — l'encadré ATTENTION : exister ne veut pas dire être unique**

</summary>

**Énoncé.** Illustrer l'encadré ATTENTION du cours avec $f(x_1,x_2)=x_1^2$, puis avec $g(x,y) = x^4+y^4-4xy$ : dans les deux cas, montrer l'existence du minimum global, et compter les points où il est atteint.

**Cas 1 — l'exemple du cours, $f(x_1,x_2)=x_1^2$.**

*Existence.* $f \ge 0$ et $f(0,0)=0$ : le minimum global vaut $0$, sans avoir besoin d'aucun théorème.

*Unicité.* $f(0,x_2) = 0$ pour **tout** $x_2 \in \mathbb{R}$. L'ensemble des minima globaux est la **droite $x_1=0$** tout entière : une infinité de points.

*Pourquoi les théorèmes ne pouvaient rien y faire.* $f$ n'est **pas coercive** sur $\mathbb{R}^2$ (elle est nulle sur une droite qui part à l'infini), donc le théorème 4.9 ne s'applique même pas. Le minimum existe pour une autre raison — $f$ est un carré. **L'existence et l'unicité sont deux questions entièrement séparées, et le cours ne fournit d'outil que pour la première.**

**Cas 2 — un cas moins évident, $g(x,y) = x^4+y^4-4xy$.**

*Existence par coercivité.* De $2\lvert xy \rvert \le x^2+y^2$ on tire $-4xy \ge -2(x^2+y^2)$, donc

$$g(x,y) \;\ge\; x^4+y^4-2(x^2+y^2).$$

La fonction $u \mapsto u^4 - 2u^2$ tend vers $+\infty$, donc le membre de droite tend vers $+\infty$ quand $\lVert (x,y)\rVert\to\infty$ : **$g$ est coercive**. Elle est polynomiale donc continue, et $\mathbb{R}^2$ est fermé non borné : le **théorème 4.9** donne un **minimum global**.

*Où est-il ?* Les points critiques annulent

$$\nabla g = \begin{pmatrix} 4x^3-4y \\ 4y^3-4x\end{pmatrix} = 0 \iff \begin{cases} y = x^3 \\ x = y^3\end{cases} \iff x = x^9 \iff x(x^8-1)=0 .$$

Donc $x \in \{0,\ 1,\ -1\}$, ce qui donne les trois points critiques

$$(0,0), \qquad (1,1), \qquad (-1,-1).$$

*Les valeurs.*

$$g(0,0) = 0, \qquad g(1,1) = 1+1-4 = -2, \qquad g(-1,-1) = 1+1-4 = -2 .$$

**Conclusion : le minimum global vaut $-2$ et il est atteint en DEUX points**, $(1,1)$ et $(-1,-1)$. L'existence était garantie ; l'unicité est fausse. Ici la raison est visible : $g(-x,-y) = g(x,y)$, la fonction est **paire** au sens vectoriel, donc ses minima vont par paires symétriques.

**Contrôle numérique.** Minimisation sur une grille de $[-3,3]^2$ au pas $10^{-3}$ : minimum $-2{,}000000$ atteint en $(1{,}000,\ 1{,}000)$ **et** en $(-1{,}000,\ -1{,}000)$, valeur en $(0,0)$ égale à $0$.

**Ce qu'il faut retenir pour la rédaction.** Quand un exercice demande *« déterminer le ou les minima »* — la formulation exacte du cours, notez le « **le ou les** » — c'est un avertissement : **comptez les points, ne vous arrêtez pas au premier**. Les énoncés 5.1, 5.2 et l'exemple 8 du cours ont tous plusieurs solutions.

</details>

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | La bonne réaction | L'outil |
|---|---|---|
| « Calculer le gradient » | vecteur **colonne** des dérivées partielles | déf. 4.2 |
| « Calculer la hessienne » | matrice **symétrique** : 3 coefficients en dimension 2 | déf. 4.4 |
| « Montrer que $f$ admet un minimum sur $A$ », $A$ borné | fermé + borné → compact | thm 4.7 |
| « … sur $A$ non borné » | **coercivité sur $A$** — pas sur $\mathbb{R}^d$ | déf. 4.8, thm 4.9 |
| « … un maximum sur $A$ non borné » | il faut $f \to -\infty$ | thm 4.9, 2ᵉ partie |
| « Développement limité de $f$ en $a$ » | ordre 1 ou 2 selon ce qui est demandé | prop. 4.3 / 4.5 |
| « Pente de $f$ dans la direction $h$ » | $\varphi'(0) = \langle\nabla f(a),h\rangle$ | prop. 4.6 |
| « Le ou les minima » | **il y en a probablement plusieurs** | encadré ATTENTION |

**Le signal de la coercivité restreinte.** Si l'ensemble $A$ **borne certaines variables** ($y\in[0,1]$, $x \le 3$…) et pas les autres, c'est le schéma de l'exercice 4.1 : *les variables bornées produisent un terme borné qu'on absorbe dans une constante ; seules les variables libres comptent pour la coercivité.*

## Comment résoudre ce type d'exercice

**Protocole « montrer que $f$ admet un extremum sur $A$ » en dimension $n$ — quatre étapes.**

1. **$f$ est-elle continue ?** Polynomiale, exponentielle, quotient à dénominateur non nul → une phrase. Préciser $C^1$ ou $C^2$ si la suite de l'exercice en a besoin.
2. **$A$ est-il fermé ?** Proposition 2.12 : décrit par des égalités ou des inégalités **larges** entre fonctions continues.
3. **$A$ est-il borné ?**
  - **Oui** → $A$ compact (thm 2.24) → **théorème 4.7** : minimum **et** maximum.
  - **Non** → passer à l'étape 4.
4. **Coercivité sur $A$** (déf. 4.8). Minorer $f$ par une fonction de la norme seule, **en exploitant les bornes que $A$ impose** : $$f(x) \;\ge\; \varphi\bigl(\lVert x \rVert\bigr), \qquad \varphi \to +\infty .$$ Puis **théorème 4.9** : minimum global. Pour un maximum, il faut $f\to-\infty$.

**Les trois minorations qui couvrent presque tous les exercices.**

| Situation | Minoration | Pourquoi elle marche |
|---|---|---|
| terme croisé $-cxy$ | $2\lvert xy\rvert \le x^2+y^2$ | ramène le croisé à des carrés |
| terme linéaire $-\langle b,x\rangle$ | $\lvert\langle b,x\rangle\rvert \le \lVert b\rVert\lVert x\rVert$ (Cauchy-Schwarz) | degré 1 contre degré $\ge 2$ |
| variable bornée par $A$ | remplacer par sa borne : $y\in[0,1] \Rightarrow -y^2 \ge -1$ | absorbe le terme dans une constante |

**Le calcul de la forme quadratique — l'erreur à ne pas faire.** En dimension 2,

$$\langle h, H_f(a)h\rangle = r\,h_1^2 + \mathbf{2}\,s\,h_1h_2 + t\,h_2^2 .$$

**Le facteur $2$ devant $s$** vient de ce que le terme croisé apparaît deux fois dans la matrice symétrique. L'oublier fausse toute la classification du point critique.

## 🔴 Common mistakes

1. **Écrire le gradient en ligne.** Le cours le définit en **colonne** (déf. 4.2) ; c'est ce qui rend cohérente l'égalité vectorielle du théorème des extrema liés.
2. **Confondre « les dérivées partielles existent » et « $f \in C^1$ ».** Le contre-exemple $\frac{xy}{x^2+y^2}$ a ses deux dérivées partielles en $(0,0)$ et n'y est même pas continue. Le cours travaille **toujours** avec $C^1$ ou $C^2$.
3. **Oublier le facteur $2$ du terme croisé** dans $\langle h,H_f h\rangle = rh_1^2 + 2sh_1h_2 + th_2^2$.
4. **Calculer les quatre coefficients de la hessienne en dimension 2.** Elle est **symétrique** (Schwarz) : trois suffisent, et vérifier l'égalité des croisées est un bon contrôle de calcul.
5. **Tester la coercivité sur $\mathbb{R}^d$ au lieu de $A$.** L'exercice 4.1 est fait pour ça : $x^4-y^2$ n'est pas coercive sur $\mathbb{R}^2$ mais l'est sur $\mathbb{R}_+\times[0,1]$. La définition 4.8 dit bien « **sur $A$** ».
6. **Appliquer le théorème 4.9 sur un ensemble non fermé.** L'hypothèse « $A$ fermée » y est explicite ; sans elle le minimum peut fuir vers un bord absent.
7. **Conclure à l'unicité après un théorème d'existence.** L'encadré ATTENTION est là pour ça : $x_1^2$ est minimale sur toute une droite, $x^4+y^4-4xy$ en deux points.
8. **Croire que le théorème 4.9 donne aussi le maximum.** Il faut alors $f\to-\infty$, une hypothèse **différente** — souvent fausse en même temps que la coercivité.
9. **Oublier que Taylor-Young est local.** Les propositions 4.3 et 4.5 valent **près de $a$**. Les utiliser pour un $h$ grand est sans fondement — c'est Taylor-Lagrange qu'il faudrait, avec son reste explicite.
10. **Confondre $o(h)$ et $\epsilon(h)$.** Le cours écrit $o(h) = \epsilon(h)\lVert h\rVert$ à l'ordre 1 et $\epsilon(h)\lVert h\rVert^2$ à l'ordre 2. C'est le **facteur en norme** qui donne son ordre au reste.
11. **Oublier que le minimum peut être sur le bord.** Dans l'exercice 4.1, il est en $(0,1)$, où $\nabla f = (0,-2) \neq 0$. Chercher les extrema par $\nabla f = 0$ seul l'aurait manqué.
12. **Utiliser la proposition 4.6 sans normaliser $h$ quand on parle de « pente ».** La proposition 5.9 précise que la direction est un vecteur de **norme 1** ; sans cela, $\varphi'(0)$ dépend de la longueur de $h$ et non seulement de sa direction.

## 📌 Ultimate Review

**Les paragraphes 4.1 et 4.2 en un paragraphe.** Le gradient est le vecteur colonne des dérivées partielles ; il donne l'approximation affine de $f$ près de $a$ (prop. 4.3). La hessienne est la matrice symétrique des dérivées secondes ; avec le gradient, elle donne l'approximation quadratique (prop. 4.5), dont le terme d'ordre 2 est la **forme quadratique** $Q(h) = \langle h, H_f(a)h\rangle$. **Le signe de $Q$ décidera de la nature des points critiques.** Pour démontrer quoi que ce soit, on regarde $f$ le long d'une droite : $\varphi(t)=f(a+th)$ ramène tout à la dimension 1 (prop. 4.6). Côté existence, deux théorèmes seulement : **4.7** (compact → min et max) et **4.9** (fermé non borné + coercivité **sur $A$** → min). Aucun des deux ne dit un mot de l'unicité, ni de la localisation.

**Les six énoncés à savoir citer.**

| N° | Énoncé | Usage |
|---|---|---|
| **4.2** | $\nabla f(x)$, vecteur colonne | l'ordre 1 |
| **4.3** | $f(a+h) = f(a)+\langle\nabla f(a),h\rangle+o(h)$ | différentiabilité |
| **4.4** | $H_f(x)$, symétrique | l'ordre 2 |
| **4.5** | $+\ \frac12\langle h,H_f(a)h\rangle + \epsilon(h)\lVert h\rVert^2$ | **la formule du chapitre** |
| **4.6** | $\varphi'(0)=\langle\nabla f(a),h\rangle$, $\varphi''(0)=\langle h,H_f(a)h\rangle$ | le pont vers la dimension 1 |
| **4.7 / 4.9** | compact → min et max ; coercive → min | l'existence |

**Les trois formules-réflexes.**

$$f(a+h) = f(a) + \langle\nabla f(a),h\rangle + \tfrac12\langle h,H_f(a)h\rangle + \epsilon(h)\lVert h\rVert^2,$$

$$\langle h,H_f(a)h\rangle = r h_1^2 + 2s h_1 h_2 + t h_2^2 \quad (n=2), \qquad 2\lvert xy\rvert \le x^2+y^2 .$$

**Ce que ces paragraphes préparent.** Le §4.3 utilisera 4.3 pour l'ordre 1 (équation et inéquation d'Euler), le §4.4 utilisera 4.5 pour l'ordre 2 (théorèmes 4.15 et 4.16), le chapitre 5 utilisera 4.6 pour le théorème des extrema liés. **Rien de ce chapitre n'est décoratif.**

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Définir $C^1(U)$ et donner une fonction dont les dérivées partielles existent sans qu'elle soit continue.**

</summary>

$f \in C^1(U)$ si toutes les dérivées partielles premières **existent et sont continues** sur $U$ (déf. 4.1).

Contre-exemple : $f(x,y) = \frac{xy}{x^2+y^2}$ prolongée par $f(0,0)=0$. Sur les deux axes $f$ est identiquement nulle, donc $\frac{\partial f}{\partial x}(0,0) = \frac{\partial f}{\partial y}(0,0) = 0$ : les deux dérivées partielles **existent**. Pourtant $f(t,t) = \frac12$ pour tout $t\neq0$, donc $f$ n'est **pas continue** en $(0,0)$.

**Moralité** : l'existence des dérivées partielles ne donne ni la continuité ni la différentiabilité. C'est la **continuité** des dérivées partielles ($C^1$) qui donne la formule 4.3.

</details>

<details class="details--riche">
<summary>

**2. Écrire les deux formules de Taylor-Young du cours, avec la forme exacte du reste.**

</summary>

**Ordre 1 (prop. 4.3)** : $f(a+h) = f(a) + \langle\nabla f(a),h\rangle + o(h)$, où $o(h) = \epsilon(h)\lVert h\rVert$ avec $\epsilon(h)\to0$.

**Ordre 2 (prop. 4.5)** : $f(a+h) = f(a) + \langle\nabla f(a),h\rangle + \frac12\langle h,H_f(a)h\rangle + \epsilon(h)\lVert h\rVert^2$, avec $\epsilon(h)\to0$.

La **puissance de la norme** dans le reste ($\lVert h\rVert$ puis $\lVert h\rVert^2$) est ce qui donne son ordre à la formule.

</details>

<details class="details--riche">
<summary>

**3. Pourquoi la hessienne est-elle symétrique ? Combien de coefficients faut-il calculer en dimension 2 et 3 ?**

</summary>

Par le **théorème de Schwarz** : si $f\in C^2$, alors $\frac{\partial^2 f}{\partial x_i\partial x_j} = \frac{\partial^2 f}{\partial x_j\partial x_i}$. L'hypothèse $C^2$ de la définition 4.4 est exactement ce qu'il faut.

En dimension 2 : **3 coefficients** ($r$, $s$, $t$), pas 4. En dimension 3 : **6**, pas 9. En dimension $n$ : $\frac{n(n+1)}{2}$.

Vérifier que la dérivée croisée donne bien la même chose dans les deux ordres est un excellent **contrôle de calcul**.

</details>

<details class="details--riche">
<summary>

**4. Écrire $\langle h, H_f(a)h\rangle$ en dimension 2 avec les notations $r$, $s$, $t$ du cours.**

</summary>

$$\langle h, H_f(a)h\rangle = r\,h_1^2 + 2s\,h_1h_2 + t\,h_2^2$$

avec $r = \frac{\partial^2 f}{\partial x^2}(a)$, $t = \frac{\partial^2 f}{\partial y^2}(a)$, $s = \frac{\partial^2 f}{\partial x\partial y}(a)$ (notations du théorème 4.16).

⚠️ **Le facteur 2** devant $s$ : le terme croisé apparaît une fois en position $(1,2)$ et une fois en $(2,1)$. L'oublier fausse la classification du point critique.

</details>

<details class="details--riche">
<summary>

**5. Qu'est-ce que $\varphi(t) = f(a+th)$ ? Que valent $\varphi'(0)$ et $\varphi''(0)$, et à quoi servent-ils ?**

</summary>

C'est la restriction de $f$ à la **droite** passant par $a$ dans la direction $h$ — une fonction d'une seule variable.

$$\varphi'(0) = \langle\nabla f(a),h\rangle \quad\text{(la pente)}, \qquad \varphi''(0) = \langle h, H_f(a)h\rangle \quad\text{(la courbure)}.$$

**Trois usages dans le cours** : la direction de plus forte pente (prop. 5.9) ; la preuve du théorème des extrema liés, avec une courbe au lieu d'une droite (thm 5.7) ; la classification des points critiques par le signe de $\varphi''(0)$ dans **toutes** les directions (thm 4.15).

C'est le mécanisme qui permet de transporter tout le chapitre 3 en dimension $n$.

</details>

<details class="details--riche">
<summary>

**6. Énoncer la définition 4.8 et expliquer pourquoi $x^4-y^2$ est coercive sur $\mathbb{R}_+\times[0,1]$ mais pas sur $\mathbb{R}^2$.**

</summary>

**Déf. 4.8** : $A$ non bornée, $f$ est coercive **sur $A$** si $f(x)\to+\infty$ quand $\lVert x\rVert\to\infty$ **avec $x\in A$**.

Sur $\mathbb{R}^2$ : le long de l'axe $x=0$, $f(0,y) = -y^2\to-\infty$. Pas coercive.

Sur $A=\mathbb{R}_+\times[0,1]$ : cette direction est **interdite**, car $y$ y est borné par $1$. Donc $y^2\le1$ et $f\ge x^4-1$. Comme $x^2 \ge \lVert(x,y)\rVert^2-1$ sur $A$, on obtient

$$f(x,y) \ge \bigl(\lVert(x,y)\rVert^2-1\bigr)^2 - 1 \longrightarrow +\infty .$$

**C'est tout l'intérêt du « sur $A$ » de la définition** : restreindre l'ensemble peut créer la coercivité.

</details>

<details class="details--riche">
<summary>

**7. Quelles sont les deux conclusions du théorème 4.9, et sous quelles hypothèses distinctes ?**

</summary>

$A$ **fermée non bornée** dans $\mathbb{R}^d$, $f \in C(A)$ :

- si $f$ est **coercive** sur $A$ ($f\to+\infty$) → **minimum global** ;
- si $f\to-\infty$ quand $\lVert x\rVert\to\infty$ dans $A$ → **maximum global**.

**Les deux hypothèses sont incompatibles** : une fonction ne peut pas tendre à la fois vers $+\infty$ et vers $-\infty$. Le théorème 4.9 ne donne donc **jamais** les deux extrema à la fois — contrairement au théorème 4.7 sur un compact.

</details>

<details class="details--riche">
<summary>

**8. Énoncer l'encadré ATTENTION du cours et donner deux exemples.**

</summary>

*« L'existence d'un extremum global ne garantit absolument pas l'unicité du point où cet extremum est pris. »*

**L'exemple du cours** : $f(x_1,x_2)=x_1^2$ atteint son minimum global $0$ sur **toute la droite $x_1=0$**.

**Un second** : $g(x,y)=x^4+y^4-4xy$ est coercive (donc a un minimum global par le thm 4.9), et ce minimum, égal à $-2$, est atteint en **deux points** : $(1,1)$ et $(-1,-1)$. Les trois points critiques sont $(0,0)$, $(1,1)$, $(-1,-1)$, de valeurs $0$, $-2$, $-2$.

**Le réflexe** : quand l'énoncé écrit « le ou les minima » — la formulation du cours — c'est un avertissement explicite.

</details>

<details class="details--riche">
<summary>

**9. Vous devez montrer qu'une fonction est coercive. Quelles sont les trois minorations à connaître ?**

</summary>

| Situation | Minoration |
|---|---|
| terme croisé $-cxy$ | $2\lvert xy\rvert \le x^2+y^2$ |
| terme linéaire $-\langle b,x\rangle$ | $\lvert\langle b,x\rangle\rvert \le \lVert b\rVert\,\lVert x\rVert$ (Cauchy-Schwarz) |
| variable bornée par $A$ | remplacer par sa borne ($y\in[0,1] \Rightarrow -y^2 \ge -1$) |

Le but est toujours le même : arriver à $f(x) \ge \varphi(\lVert x\rVert)$ avec $\varphi\to+\infty$, car c'est la seule chose que la définition 4.8 demande.

⚠️ Vérifier le long des axes **ne suffit pas** : $(x-y)^2$ y tend vers $+\infty$ sans être coercive.

</details>

<details class="details--riche">
<summary>

**10. Où se situe le minimum de $x^4-y^2$ sur $\mathbb{R}_+\times[0,1]$, et pourquoi $\nabla f = 0$ ne le trouve-t-il pas ?**

</summary>

$f$ est minimale quand $x^4$ est minimal et $y^2$ maximal, soit $x=0$ et $y=1$ : le minimum vaut $f(0,1) = -1$.

Or $\nabla f(x,y) = (4x^3,\ -2y)$, donc $\nabla f(0,1) = (0,-2) \neq 0$. **Le point n'est pas critique.**

La raison : $(0,1)$ est **sur la frontière** de $A$, pas à l'intérieur. La proposition 4.11 exige $a \in \mathring A$. Sur le bord, il faut l'**inéquation d'Euler** (prop. 4.14) avec le cône des directions admissibles — c'est l'objet de l'exercice 4.3 du cours et de la fiche 603.

**C'est la leçon centrale du chapitre 4** : chercher les extrema uniquement par $\nabla f = 0$ manque tous ceux qui sont au bord.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| $f \in C^1(U)$ ? | Dérivées partielles premières existent **et continues** |
| $f \in C^2(U)$ ? | Idem pour les secondes |
| Gradient (déf. 4.2) ? | Vecteur **colonne** des dérivées partielles |
| Dérivées partielles seules ⟹ continuité ? | **Non** — contre-exemple $\frac{xy}{x^2+y^2}$ |
| Sa valeur le long de $y=x$ ? | $\frac12$, alors que $f(0,0)=0$ |
| Taylor-Young ordre 1 ? | $f(a+h)=f(a)+\langle\nabla f(a),h\rangle+o(h)$ |
| Forme du reste ? | $\epsilon(h)\lVert h\rVert$ |
| Différentielle ? | $df(a).h = \langle\nabla f(a),h\rangle$ |
| Hessienne (déf. 4.4) ? | Matrice des dérivées secondes, **symétrique** |
| Pourquoi symétrique ? | Théorème de **Schwarz**, valable car $f\in C^2$ |
| Coefficients à calculer en dimension 2 ? | **3** : $r$, $s$, $t$ |
| Taylor-Young ordre 2 ? | $+\ \frac12\langle h,H_f(a)h\rangle+\epsilon(h)\lVert h\rVert^2$ |
| Forme quadratique ? | $Q(h)=\langle h,H_f(a)h\rangle$ |
| En dimension 2 ? | $rh_1^2+\mathbf{2}sh_1h_2+th_2^2$ |
| L'erreur classique ? | Oublier le **facteur 2** |
| Si $\nabla f(a)=0$, que reste-t-il ? | $f(a+h)-f(a)=\frac12 Q(h)+\epsilon(h)\lVert h\rVert^2$ |
| Donc la nature de $a$ dépend de ? | Le **signe de $Q$** |
| $\varphi(t)$ de la prop. 4.6 ? | $f(a+th)$ — $f$ le long d'une droite |
| $\varphi'(0)$ ? | $\langle\nabla f(a),h\rangle$ — la **pente** |
| $\varphi''(0)$ ? | $\langle h,H_f(a)h\rangle$ — la **courbure** |
| À quoi sert la prop. 4.6 ? | Ramener la dimension $n$ à la **dimension 1** |
| Théorème 4.7 ? | $A$ compact, $f$ continue ⟹ min **et** max |
| Théorème 4.9, 1ʳᵉ partie ? | $A$ fermé non borné + $f$ coercive ⟹ **minimum** |
| 2ᵉ partie ? | $f\to-\infty$ ⟹ **maximum** |
| Les deux à la fois ? | **Impossible** — hypothèses incompatibles |
| Coercive **sur $A$** (déf. 4.8) ? | $f\to+\infty$ quand $\lVert x\rVert\to\infty$ **dans $A$** |
| Exercice 4.1 du cours ? | $x^4-y^2$ coercive sur $\mathbb{R}_+\times[0,1]$ |
| Pourquoi pas sur $\mathbb{R}^2$ ? | $f(0,y)=-y^2\to-\infty$ |
| La minoration clé ? | $y\in[0,1]\Rightarrow f\ge x^4-1$ |
| Où est ce minimum ? | En $(0,1)$, valeur $-1$ — **sur le bord** |
| $\nabla f$ y vaut ? | $(0,-2)\neq0$ : pas un point critique |
| Ce que cela impose ? | L'**inéquation d'Euler** (prop. 4.14) |
| Encadré ATTENTION ? | Existence **n'implique pas** unicité |
| L'exemple du cours ? | $x_1^2$, minimale sur toute la droite $x_1=0$ |
| $x^4+y^4-4xy$ : points critiques ? | $(0,0)$, $(1,1)$, $(-1,-1)$ |
| Leurs valeurs ? | $0$, $-2$, $-2$ |
| Minimum global ? | $-2$, atteint en **deux** points |
| Sa coercivité vient de ? | $-4xy \ge -2(x^2+y^2)$ |
| Minoration d'un terme croisé ? | $2\lvert xy\rvert \le x^2+y^2$ |
| Minoration d'un terme linéaire ? | **Cauchy-Schwarz** |
| Minoration si $A$ borne une variable ? | Remplacer par sa **borne** |
| Taylor-Young est-il local ou global ? | **Local** — près de $a$ seulement |
| Pour du global chiffré ? | Taylor-**Lagrange** (fiche 601) |
| $H_f$ définie positive ⟹ ? | Minimum local (thm 4.15) |
| $H_f$ indéfinie ⟹ ? | **Point selle** |
| $H_f$ dégénérée ⟹ ? | **On ne conclut pas** |
|  |  |
