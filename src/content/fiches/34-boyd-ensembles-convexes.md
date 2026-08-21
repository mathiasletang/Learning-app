# Fiche 34 — Ensembles convexes (Boyd, chapitre 2)

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Boyd & Vandenberghe, *Convex Optimization*, chapitre 2 « Convex sets », p. 21–66 |
| **Difficulté** | Must know — le socle de tout le M1 |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 11 (convexité, Garrigos), fiche 26 (polyèdres, faces) |
| **Concepts clés** | Ensemble affine, ensemble convexe, cône convexe, enveloppes, hyperplan, ellipsoïde, cône de norme, polyèdre, cône PSD, opérations préservant la convexité, perspective, inégalités généralisées, hyperplan séparateur, cône dual |
| **Poids à l'examen** | Deux réflexes s'évaluent : **reconnaître** un ensemble convexe dans une liste, et surtout **le démontrer par le calcul de convexité** (§2.3) plutôt que par la définition. Le théorème de séparation est l'outil de toutes les preuves de dualité (fiche 37). |

## 🎯 Vue d'ensemble

Boyd construit la convexité en trois temps, et c'est cette architecture qu'il faut retenir — pas la liste des exemples.

```
1. DÉFINIR    affine ⊂ convexe,  et le cas particulier des CÔNES
2. CATALOGUER une dizaine d'ensembles convexes de référence (§2.2)
3. CALCULER   des opérations qui préservent la convexité (§2.3)
              →  un ensemble est convexe s'il se construit par ces opérations
                 À PARTIR du catalogue — plus jamais par la définition
```

Puis viennent deux prolongements qui serviront à la dualité : les **inégalités généralisées** (comparer des vecteurs ou des matrices, pas seulement des nombres) et les **hyperplans séparateurs** (la version géométrique du théorème de dualité).

## 🟡 Concept 1 — Affine, convexe, cône : trois familles emboîtées

Tout part d'une combinaison $\theta_1x_1+\dots+\theta_kx_k$ ; **seule la contrainte sur les coefficients change.**

| Combinaison | Contrainte sur les $\theta_i$ | Ensemble stable | Enveloppe |
|---|---|---|---|
| **linéaire** | aucune | sous-espace | — |
| **affine** | $\sum_i\theta_i = 1$ | ensemble **affine** | $\mathbf{aff}\,C$ |
| **convexe** | $\theta_i\geq0$ et $\sum_i\theta_i=1$ | ensemble **convexe** | $\mathbf{conv}\,C$ |
| **conique** | $\theta_i\geq0$ | **cône convexe** | enveloppe conique |

**Droite et segment.** Pour $x_1\neq x_2$ dans $\mathbb{R}^n$, les points $y = \theta x_1+(1-\theta)x_2$ décrivent la **droite** passant par $x_1$ et $x_2$ quand $\theta$ parcourt $\mathbb{R}$, et le **segment** quand $\theta\in[0,1]$. L'écriture $y = x_2+\theta(x_1-x_2)$ donne l'autre lecture : point de base $x_2$ plus direction $x_1-x_2$ mise à l'échelle par $\theta$.

**Ensemble affine.** $C$ est affine si la **droite** passant par deux points distincts de $C$ est dans $C$. *Exemple 2.1 :* l'ensemble solution $\{x\mid Ax=b\}$ d'un système linéaire est affine, et **réciproquement tout affine s'écrit ainsi**. Si $x_0\in C$, alors $V = C-x_0$ est un **sous-espace** indépendant du choix de $x_0$, et l'on pose $\dim C := \dim V$.

**Ensemble convexe.** $C$ est convexe si le **segment** entre deux points de $C$ est dans $C$. Image de Boyd : *un ensemble est convexe si tout point y voit tout autre point, le long d'un chemin droit non obstrué*. Tout affine est convexe.

**Cône.** $C$ est un **cône** si $x\in C$ et $\theta\geq0$ impliquent $\theta x\in C$ ; c'est un **cône convexe** s'il est de plus convexe, c'est-à-dire si

$$x_1,x_2\in C,\ \theta_1,\theta_2\geq0 \ \Longrightarrow\ \theta_1x_1+\theta_2x_2\in C$$

Géométriquement, ces points forment la **part de tarte** de sommet $0$ et de bords passant par $x_1$ et $x_2$ (figure 2.4).

**Généralisation aux sommes infinies.** Si $\theta_i\geq0$ avec $\sum_{i=1}^\infty\theta_i=1$ et $x_i\in C$ convexe, alors $\sum_i\theta_ix_i\in C$ (si la série converge). Plus généralement, si $p\geq0$ sur $C$ avec $\int_Cp(x)\,dx=1$, alors $\int_Cp(x)x\,dx\in C$. **Forme la plus générale :** si $x$ est un vecteur aléatoire à valeurs dans $C$ convexe avec probabilité $1$, alors $\mathbb{E}x\in C$.

> **La conséquence à retenir.** L'espérance d'une variable aléatoire à valeurs dans un convexe reste dans le convexe. C'est ce fait qui fait le lien avec l'inégalité de Jensen (fiche 35) et avec toute la théorie des moyennes.

**Dimension affine et intérieur relatif.** La dimension affine de $C$ est celle de $\mathbf{aff}\,C$. Attention : le cercle unité de $\mathbb{R}^2$ a pour enveloppe affine tout $\mathbb{R}^2$, donc une dimension affine de **deux**, alors que la plupart des définitions lui donnent la dimension un. L'**intérieur relatif** est l'intérieur pris dans $\mathbf{aff}\,C$ :

$$\mathbf{relint}\,C = \{x\in C \mid B(x,r)\cap\mathbf{aff}\,C\subseteq C \ \text{pour un } r>0\}$$

*Exemple 2.2.* Le carré $C = \{x\in\mathbb{R}^3 \mid |x_1|\leq1,\ |x_2|\leq1,\ x_3=0\}$ a un intérieur **vide** dans $\mathbb{R}^3$, mais son intérieur relatif est le carré ouvert dans le plan $x_3=0$.

⚠️ Confondre intérieur et intérieur relatif est l'erreur classique dès qu'un ensemble est plat (contenu dans un hyperplan). En optimisation, la condition de Slater (fiche 37) s'énonce sur l'intérieur **relatif** précisément pour cette raison.

## 🟠 Concept 2 — Le catalogue (§2.2)

**Les cas triviaux.** $\emptyset$, un singleton $\{x_0\}$ et $\mathbb{R}^n$ tout entier sont affines donc convexes. Toute **droite** est affine (et un sous-espace si elle passe par $0$). Un **segment** est convexe mais pas affine. Un **rayon** $\{x_0+\theta v\mid\theta\geq0\}$, $v\neq0$, est convexe, et c'est un cône si $x_0=0$. Tout **sous-espace** est affine et un cône convexe.

### Hyperplans et demi-espaces

$$\text{hyperplan}: \{x\mid a^Tx = b\}, \qquad \text{demi-espace}: \{x\mid a^Tx\leq b\}, \qquad a\neq0$$

En posant $x_0$ un point de l'hyperplan ($a^Tx_0=b$) :

$$\{x\mid a^T(x-x_0)=0\} = x_0 + a^\perp, \qquad a^\perp = \{v\mid a^Tv=0\}$$

Un hyperplan est donc « un décalage $x_0$ plus tous les vecteurs orthogonaux à la normale $a$ ». Le demi-espace s'écrit $\{x\mid a^T(x-x_0)\leq0\}$ : c'est $x_0$ plus tout vecteur faisant un angle **obtus** avec $a$. Les hyperplans sont affines et convexes ; les demi-espaces sont convexes mais **pas affines**.

### Boules et ellipsoïdes

$$B(x_c,r) = \{x \mid \|x-x_c\|_2\leq r\} = \{x_c+ru \mid \|u\|_2\leq1\}$$

$$\mathcal{E} = \{x\mid (x-x_c)^TP^{-1}(x-x_c)\leq1\}, \qquad P = P^T\succ0$$

Les longueurs des demi-axes de $\mathcal{E}$ sont les $\sqrt{\lambda_i}$, où les $\lambda_i$ sont les **valeurs propres** de $P$ ; une boule est l'ellipsoïde avec $P = r^2I$. Autre représentation :

$$\mathcal{E} = \{x_c+Au \mid \|u\|_2\leq1\}, \qquad A \text{ carrée inversible}$$

(on peut supposer $A$ symétrique définie positive en prenant $A = P^{1/2}$). Si $A$ est semi-définie positive **singulière**, on parle d'ellipsoïde **dégénéré** : sa dimension affine vaut $\mathbf{rank}(A)$, et il reste convexe.

*La preuve de convexité de la boule*, que Boyd déroule, n'utilise que l'homogénéité et l'inégalité triangulaire :

$$\|\theta x_1+(1-\theta)x_2-x_c\|_2 \leq \theta\|x_1-x_c\|_2 + (1-\theta)\|x_2-x_c\|_2 \leq r$$

### Boules de norme et cônes de norme

Pour **toute** norme $\|\cdot\|$, la boule $\{x\mid\|x-x_c\|\leq r\}$ est convexe, et le **cône de norme**

$$C = \{(x,t)\in\mathbb{R}^{n+1} \mid \|x\|\leq t\}$$

est un cône convexe. *Exemple 2.3 :* le **cône du second ordre** est le cône de norme de la norme euclidienne,

$$C = \{(x,t)\in\mathbb{R}^{n+1}\mid \|x\|_2\leq t\}$$

également appelé cône **quadratique**, cône de **Lorentz** ou cône **glace** (*ice-cream cone*).

### Polyèdres et simplexes

$$P = \{x \mid a_j^Tx\leq b_j,\ j=1,\dots,m,\quad c_j^Tx = d_j,\ j=1,\dots,p\} = \{x\mid Ax\preceq b,\ Cx=d\}$$

Un polyèdre est l'intersection d'un nombre **fini** de demi-espaces et d'hyperplans ; les affines, rayons, segments et demi-espaces en sont. Un polyèdre borné s'appelle parfois **polytope** — mais Boyd prévient que certains auteurs utilisent la convention inverse.

*Exemple 2.4 :* l'**orthant positif** $\mathbb{R}^n_+ = \{x\mid x\succeq0\}$ est un polyèdre **et** un cône : un **cône polyédral**.

**Simplexes.** Si $v_0,\dots,v_k$ sont **affinement indépendants** ($v_1-v_0,\dots,v_k-v_0$ libres), le simplexe qu'ils déterminent est

$$C = \mathbf{conv}\{v_0,\dots,v_k\} = \{\theta_0v_0+\dots+\theta_kv_k \mid \theta\succeq0,\ \mathbf1^T\theta=1\}$$

de dimension affine $k$. *Exemple 2.5 :* un simplexe de dimension 1 est un segment, de dimension 2 un triangle plein, de dimension 3 un tétraèdre. Le **simplexe unité** est $\{x\mid x\succeq0,\ \mathbf1^Tx\leq1\}$ ; le **simplexe de probabilité** est $\{x\mid x\succeq0,\ \mathbf1^Tx=1\}$ — ses éléments sont les distributions de probabilité sur $n$ éléments.

> **La représentation compte (fait souligné par Boyd).** La boule unité de la norme infinie, $C = \{x\mid |x_i|\leq1\}$, se décrit avec **$2n$** inégalités $\pm e_i^Tx\leq1$ ; sa description par enveloppe convexe demande **$2^n$** points (tous les vecteurs de $\pm1$). Pour $n=30$, c'est 60 contre plus d'un milliard. Le choix de la représentation a des conséquences pratiques majeures.

### Le cône semi-défini positif

$$\mathbf{S}^n = \{X\in\mathbb{R}^{n\times n}\mid X = X^T\}, \qquad \mathbf{S}^n_+ = \{X\in\mathbf{S}^n\mid X\succeq0\}, \qquad \mathbf{S}^n_{++} = \{X\in\mathbf{S}^n\mid X\succ0\}$$

$\mathbf{S}^n$ est un espace vectoriel de dimension $n(n+1)/2$. **$\mathbf{S}^n_+$ est un cône convexe** : si $\theta_1,\theta_2\geq0$ et $A,B\succeq0$, alors pour tout $x$,

$$x^T(\theta_1A+\theta_2B)x = \theta_1x^TAx + \theta_2x^TBx \geq 0$$

*Exemple 2.6 :* dans $\mathbf{S}^2$, $\begin{pmatrix}x & y\\ y& z\end{pmatrix}\succeq0 \iff x\geq0,\ z\geq0,\ xz\geq y^2$.

## 🔴 Concept 3 — Le calcul de convexité (§2.3)

C'est **la** section utile : elle permet d'établir la convexité **sans jamais revenir à la définition**.

### Intersection

Si $S_1$ et $S_2$ sont convexes, $S_1\cap S_2$ l'est ; et cela vaut pour une intersection **quelconque**, même infinie. Un polyèdre est convexe pour cette seule raison.

*Exemple 2.7 :* $\mathbf{S}^n_+ = \bigcap_{z\neq0}\{X\in\mathbf{S}^n\mid z^TXz\geq0\}$ — une intersection d'une **infinité de demi-espaces** de $\mathbf{S}^n$, donc convexe.

*Exemple 2.8 :* $S = \{x\in\mathbb{R}^m \mid |p(t)|\leq1 \text{ pour } |t|\leq\pi/3\}$ avec $p(t)=\sum_kx_k\cos kt$ est l'intersection d'une infinité de **tranches** $S_t = \{x\mid -1\leq(\cos t,\dots,\cos mt)^Tx\leq1\}$.

> **La réciproque (§2.5.1).** Tout convexe **fermé** est l'intersection de **tous** les demi-espaces qui le contiennent. Description externe et interne se rejoignent.

### Fonctions affines

Si $f(x)=Ax+b$ et $S$ est convexe, alors l'**image** $f(S)$ et l'**image réciproque** $f^{-1}(S)$ sont convexes. Cas particuliers : mise à l'échelle $\alpha S$, translation $S+a$, **projection** sur une partie des coordonnées, **somme** $S_1+S_2$, **produit cartésien** $S_1\times S_2$, sommes partielles.

| Exemple | Ce qu'on montre |
|---|---|
| **2.9** Polyèdre | $\{x\mid Ax\preceq b,\ Cx=d\}$ est l'image réciproque de $\mathbb{R}^m_+\times\{0\}$ par $f(x) = (b-Ax,\ d-Cx)$ |
| **2.10** Inégalité matricielle linéaire (LMI) | $\{x\mid A(x)\preceq B\}$ avec $A(x)=x_1A_1+\dots+x_nA_n$ est l'image réciproque de $\mathbf{S}^m_+$ par $f(x) = B-A(x)$ |
| **2.11** Cône hyperbolique | $\{x\mid x^TPx\leq(c^Tx)^2,\ c^Tx\geq0\}$ est l'image réciproque du cône du second ordre par $f(x) = (P^{1/2}x,\ c^Tx)$ |
| **2.12** Ellipsoïde | image de la boule unité par $f(u) = P^{1/2}u+x_c$ |

> **La LMI est le motif à retenir.** Une contrainte $A(x)\preceq B$, affine en $x$ à valeurs matricielles, définit toujours un **convexe** — c'est la brique de toute la programmation semi-définie.

### Perspective et fonctions linéaires-fractionnaires

**Fonction perspective** $P:\mathbb{R}^{n+1}\to\mathbb{R}^n$, de domaine $\mathbb{R}^n\times\mathbb{R}_{++}$ :

$$P(z,t) = z/t$$

Elle normalise le vecteur pour que la dernière composante vaille $1$, puis la supprime. **Interprétation (remarque 2.1) : c'est une caméra à sténopé.** Un objet en $x$ au-dessus du plan opaque $x_3=0$ percé à l'origine forme son image en $-P(x)$ sur le plan $x_3=-1$.

Si $C\subseteq\mathbf{dom}\,P$ est convexe, $P(C)$ l'est ; et si $C$ est convexe, $P^{-1}(C) = \{(x,t)\mid x/t\in C,\ t>0\}$ l'est aussi. *Un objet convexe, vu par une caméra à sténopé, donne une image convexe.*

**La clé de la preuve.** Les segments sont envoyés sur des segments :

$$P\big(\theta x+(1-\theta)y\big) = \mu P(x)+(1-\mu)P(y), \qquad \mu = \frac{\theta x_{n+1}}{\theta x_{n+1}+(1-\theta)y_{n+1}}\in[0,1]$$

et la correspondance $\theta\mapsto\mu$ est **monotone** : quand $\theta$ balaye $[0,1]$, $\mu$ aussi.

**Fonction linéaire-fractionnaire** : composée de la perspective avec une affine,

$$f(x) = \frac{Ax+b}{c^Tx+d}, \qquad \mathbf{dom}\,f = \{x\mid c^Tx+d>0\}$$

Si $c=0$ et $d>0$, $f$ est affine : les fonctions affines et linéaires sont des cas particuliers. Images et images réciproques de convexes par $f$ sont convexes.

## 🟠 Concept 4 — Inégalités généralisées (§2.4)

**Cône propre.** $K\subseteq\mathbb{R}^n$ est un **cône propre** s'il est **convexe**, **fermé**, **plein** (*solid* : d'intérieur non vide) et **pointu** (*pointed* : il ne contient aucune droite, c'est-à-dire $x\in K$ et $-x\in K$ entraînent $x=0$).

Un cône propre définit une **inégalité généralisée**, c'est-à-dire un ordre **partiel** :

$$x\preceq_K y \iff y-x\in K, \qquad x\prec_K y \iff y-x\in\mathbf{int}\,K$$

| Cône | Inégalité obtenue |
|---|---|
| $K=\mathbb{R}^n_+$ | inégalité **composante par composante** : $x\preceq y \iff x_i\leq y_i\ \forall i$ |
| $K=\mathbf{S}^n_+$ | inégalité **matricielle** : $X\preceq Y \iff Y-X$ semi-définie positive |
| $K$ = polynômes $\geq0$ sur $[0,1]$ (exemple 2.16) | $c\preceq_K d \iff \sum_ic_it^{i-1}\leq\sum_id_it^{i-1}$ pour tout $t\in[0,1]$ |

**Propriétés conservées** : $\preceq_K$ est préservée par addition, par multiplication par un scalaire $\geq0$, par passage à la limite ; elle est transitive, réflexive et **antisymétrique**.

⚠️ **Ce qui est perdu.** L'ordre $\leq$ sur $\mathbb{R}$ est **total** : deux points sont toujours comparables. Une inégalité généralisée ne l'est **pas** — d'où la distinction suivante, qui n'existe pas sur $\mathbb{R}$.

**Élément minimum et élément minimal.**

- $x\in S$ est **l'élément minimum** si $x\preceq_K y$ pour **tout** $y\in S$. De façon équivalente : $S\subseteq x+K$. S'il existe, il est **unique**.
- $x\in S$ est **un élément minimal** si ($y\in S$ et $y\preceq_K x$) implique $y=x$. De façon équivalente : $(x-K)\cap S = \{x\}$. Un ensemble peut en avoir **beaucoup**.

*Exemple 2.17, dans $\mathbb{R}^2_+$.* « $x$ est le minimum » signifie que tous les autres points de $S$ sont **en haut à droite** de $x$. « $x$ est minimal » signifie qu'aucun point de $S$ n'est **en bas à gauche** de $x$.

*Exemple 2.18.* $S = \{P\in\mathbf{S}^n_{++} \mid v_i^TP^{-1}v_i\leq1\}$ est l'ensemble des ellipsoïdes centrés contenant les points $v_1,\dots,v_k$. Il **n'a pas** d'élément minimum : pour tout ellipsoïde contenant les points on en trouve un autre qui les contient et qui ne lui est pas comparable. Un ellipsoïde est **minimal** s'il contient les points et qu'aucun ellipsoïde plus petit ne le fait.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi c'est important.</span>

L'optimisation **vectorielle** (plusieurs objectifs) repose entièrement sur cette distinction : on cherche rarement un minimum (il n'existe presque jamais), on cherche les points **minimaux** — le front de Pareto.

</div>

## 🔴 Concept 5 — Hyperplans séparateurs et d'appui (§2.5)

**Théorème de l'hyperplan séparateur.** Si $C$ et $D$ sont convexes, non vides et **disjoints**, il existe $a\neq0$ et $b$ tels que

$$a^Tx\leq b \ \ \forall x\in C, \qquad a^Tx\geq b \ \ \forall x\in D$$

La fonction affine $a^Tx-b$ est donc négative ou nulle sur $C$ et positive ou nulle sur $D$.

**Preuve (cas où la distance est atteinte, celle de Boyd).** Supposons $\mathrm{dist}(C,D)>0$ atteinte en $c\in C$ et $d\in D$. Posons

$$a = d-c, \qquad b = \frac{\|d\|_2^2-\|c\|_2^2}{2}$$

de sorte que $f(x) = a^Tx-b = (d-c)^T\big(x-\tfrac12(d+c)\big)$. L'hyperplan est **perpendiculaire** au segment $[c,d]$ et passe par son **milieu**. Si $f$ était strictement négative en un $u\in D$, on aurait $(d-c)^T(u-d)<0$, donc

$$\frac{d}{dt}\Big\|d+t(u-d)-c\Big\|_2^2\Big|_{t=0} = 2(d-c)^T(u-d)<0$$

et pour $t>0$ petit le point $d+t(u-d)$ — qui est dans $D$ par convexité — serait **plus proche de $c$** que $d$, contredisant la minimalité. $\blacksquare$

**Séparation stricte.** L'hyperplan construit ci-dessus vérifie en fait $a^Tx<b$ sur $C$ et $a^Tx>b$ sur $D$. En général, deux convexes disjoints ne sont **pas** strictement séparables, même fermés. *Exemple 2.20 :* mais un **point $x_0\notin C$** et un convexe **fermé** $C$ le sont toujours.

**Conséquence majeure.** Un convexe fermé est **l'intersection de tous les demi-espaces qui le contiennent**. (Sinon un point extérieur serait strictement séparable, donc exclu par l'un de ces demi-espaces.)

**Réciproque partielle.** La réciproque est fausse en général (prendre $C=D=\{0\}$). Mais : *deux convexes dont l'un au moins est ouvert sont disjoints si et seulement s'il existe un hyperplan séparateur.*

**Hyperplan d'appui.** Si $x_0\in\mathbf{bd}\,C$ et si $a\neq0$ vérifie $a^Tx\leq a^Tx_0$ pour tout $x\in C$, l'hyperplan $\{x\mid a^Tx = a^Tx_0\}$ est un **hyperplan d'appui** de $C$ en $x_0$ : il est tangent à $C$ en $x_0$, et le demi-espace $\{x\mid a^Tx\leq a^Tx_0\}$ contient $C$.

**Théorème de l'hyperplan d'appui.** Pour tout convexe **non vide** $C$ et tout $x_0\in\mathbf{bd}\,C$, il existe un hyperplan d'appui à $C$ en $x_0$.

## 🟠 Concept 6 — Cônes duaux (§2.6)

**Définition.** Pour un cône $K$,

$$K^\star = \{y \mid x^Ty\geq0 \ \text{ pour tout } x\in K\}$$

$K^\star$ est un cône, et il est **toujours convexe**, même si $K$ ne l'est pas. Géométriquement, $y\in K^\star$ si et seulement si $-y$ est la normale d'un hyperplan qui **appuie $K$ à l'origine**.

**Exemples fondamentaux.**

| $K$ | $K^\star$ |
|---|---|
| $\mathbb{R}^n_+$ | $\mathbb{R}^n_+$ — **auto-dual** |
| $\mathbf{S}^n_+$ | $\mathbf{S}^n_+$ — **auto-dual** (avec le produit $\mathbf{tr}(YX)$) |
| cône de norme $\{(x,t)\mid\\|x\\|\leq t\}$ | cône de la **norme duale** $\{(u,v)\mid\\|u\\|_\star\leq v\}$ |
| un sous-espace $V$ | $V^\perp$ |

*Preuve de l'auto-dualité de $\mathbf{S}^n_+$ (celle de Boyd).* Pour $X,Y\succeq0$, en décomposant $X = \sum_i\lambda_iq_iq_i^T$ avec $\lambda_i\geq0$ :

$$\mathbf{tr}(YX) = \mathbf{tr}\Big(Y\sum_i\lambda_iq_iq_i^T\Big) = \sum_i\lambda_i\,q_i^TYq_i \geq 0$$

**Propriétés des cônes duaux.** $K^\star$ est **fermé et convexe** ; $K_1\subseteq K_2$ implique $K_2^\star\subseteq K_1^\star$ ; si $K$ est d'intérieur non vide, $K^\star$ est pointu ; si l'adhérence de $K$ est pointue, $K^\star$ est d'intérieur non vide ; et $K^{\star\star}$ est l'adhérence de l'enveloppe convexe de $K$. **Donc si $K$ est un cône propre, $K^\star$ aussi, et $K^{\star\star}=K$.**

**Inégalités généralisées duales.** $\preceq_{K^\star}$ est le dual de $\preceq_K$, et

$$x\preceq_K y \iff \lambda^Tx\leq\lambda^Ty \ \text{ pour tout } \lambda\succeq_{K^\star}0$$

$$x\prec_K y \iff \lambda^Tx<\lambda^Ty \ \text{ pour tout } \lambda\succeq_{K^\star}0,\ \lambda\neq0$$

**Caractérisation duale des éléments minimum et minimaux.**

- *Minimum* : $x$ est **l'élément minimum** de $S$ si et seulement si, **pour tout** $\lambda\succ_{K^\star}0$, $x$ est l'**unique** minimiseur de $\lambda^Tz$ sur $S$. (La convexité de $S$ n'est **pas** requise.)
- *Minimal, sens facile* : si $\lambda\succ_{K^\star}0$ et si $x$ minimise $\lambda^Tz$ sur $S$, alors $x$ est **minimal**.
- *Minimal, réciproque* : elle est **fausse** en général ; mais si $S$ est **convexe**, tout élément minimal $x$ minimise $\lambda^Tz$ sur $S$ pour un certain $\lambda\succeq_{K^\star}0$ **non nul** (démonstration par le théorème de séparation appliqué à $(x-K)\setminus\{x\}$ et $S$). On **ne peut pas** renforcer en $\lambda\succ_{K^\star}0$.

> **La lecture pratique.** Scalariser un problème multi-objectif par une pondération $\lambda\succ0$ donne toujours un point **Pareto-minimal** ; mais on n'atteint **tous** les points minimaux par scalarisation que si le problème est **convexe** — et encore, certains ne s'obtiennent qu'avec un $\lambda$ ayant des composantes nulles.

### Comment résoudre l'exercice type (protocole)

1. **Chercher d'abord dans le catalogue** (§2.2) : est-ce un demi-espace, une boule, un ellipsoïde, un polyèdre, un cône de norme, le cône PSD ?
2. **Sinon, décomposer** : l'ensemble est-il une **intersection** de convexes ? une **image** ou une **image réciproque** par une fonction affine, une perspective, une linéaire-fractionnaire ?
3. **N'utiliser la définition qu'en dernier recours** — prendre $x_1,x_2$ dans l'ensemble, $\theta\in[0,1]$, et vérifier.
4. **Pour prouver la non-convexité**, exhiber **deux points et un $\theta$** : c'est toujours plus rapide qu'un argument général.
5. **Pour un cône**, vérifier séparément la stabilité par $\theta\geq0$ et la convexité.
6. **Pour une contrainte matricielle**, chercher la forme LMI $A(x)\preceq B$ avec $A$ affine.

### Exercices progressifs

**Niveau 1** — L'ensemble $\{x\in\mathbb{R}^2 \mid x_1x_2\geq1,\ x\succ0\}$ est-il convexe ?

<details><summary>Correction</summary>

**Oui.** Sur $x_1>0$, la condition s'écrit $x_2\geq1/x_1$ : c'est l'**épigraphe** de $x_1\mapsto1/x_1$, convexe sur $\mathbb{R}_{++}$ (dérivée seconde $2/x_1^3>0$). Un épigraphe de fonction convexe est convexe (fiche 35). *Attention :* sans la condition $x\succ0$, l'ensemble $\{x_1x_2\geq1\}$ a **deux** branches et n'est pas convexe.

</details>

**Niveau 2** — Montrez que $\{x \mid \|x-a\|_2\leq\|x-b\|_2\}$ est un **demi-espace**.

<details><summary>Correction</summary>

Élevons au carré (les deux membres sont positifs) :

$$\|x\|_2^2-2a^Tx+\|a\|_2^2 \leq \|x\|_2^2-2b^Tx+\|b\|_2^2$$

Les termes $\|x\|_2^2$ **s'annulent** — c'est tout l'intérêt du calcul — et il reste

$$2(b-a)^Tx \leq \|b\|_2^2-\|a\|_2^2$$

soit un demi-espace de normale $a' = 2(b-a)$, donc convexe. *Interprétation :* les points plus proches de $a$ que de $b$ forment le demi-espace délimité par la **médiatrice** du segment $[a,b]$.

</details>

**Niveau 3** — Montrez que $\{X\in\mathbf{S}^n \mid \lambda_{\max}(X)\leq1\}$ est convexe, sans passer par la définition.

<details><summary>Correction</summary>

$\lambda_{\max}(X)\leq1$ équivaut à $x^TXx\leq\|x\|_2^2$ pour tout $x$, c'est-à-dire à

$$I - X \succeq 0$$

C'est une **LMI** en $X$ (exemple 2.10) : l'ensemble est l'image réciproque du cône $\mathbf{S}^n_+$ par la fonction affine $X\mapsto I-X$, donc **convexe**. *Le réflexe :* traduire une condition spectrale en inégalité matricielle. On aurait aussi pu écrire l'ensemble comme l'intersection des demi-espaces $\{X\mid x^TXx\leq\|x\|_2^2\}$ pour $x$ parcourant $\mathbb{R}^n$ (exemple 2.7).

</details>

**Niveau 4 — type examen** — Soit $K$ un cône propre. Démontrez que $x\preceq_K y$ si et seulement si $\lambda^Tx\leq\lambda^Ty$ pour tout $\lambda\succeq_{K^\star}0$.

<details><summary>Correction</summary>

**($\Rightarrow$)** Si $x\preceq_Ky$, alors $y-x\in K$. Par définition du cône dual, $\lambda^T(y-x)\geq0$ pour tout $\lambda\in K^\star$, c'est-à-dire $\lambda^Tx\leq\lambda^Ty$.

**($\Leftarrow$)** Supposons $\lambda^T(y-x)\geq0$ pour tout $\lambda\in K^\star$. Cela signifie exactement que $y-x$ appartient au **bidual** $K^{\star\star}$. Or $K$ est un cône propre, donc convexe et fermé, et $K^{\star\star}=K$. Donc $y-x\in K$, c'est-à-dire $x\preceq_Ky$. $\blacksquare$

**Ce que l'exercice enseigne.** Une inégalité vectorielle (difficile, partielle) se **teste par une famille d'inégalités scalaires** (faciles, totales), indexée par le cône dual. C'est le principe même de la dualité : remplacer un objet par la famille des formes linéaires qui le testent — on le retrouvera à la fiche 37 sous le nom de fonction duale de Lagrange.

</details>

## 🔴 Common mistakes

1. **Prouver la convexité par la définition** alors que le calcul du §2.3 la donne en une ligne — c'est plus long et plus fragile.
2. **Confondre affine et convexe** — l'affine contient la **droite**, le convexe seulement le **segment**. Affine $\Rightarrow$ convexe, jamais l'inverse.
3. **Oublier $\sum\theta_i=1$ ou $\theta_i\geq0$** — l'une donne un cône, l'autre l'enveloppe affine ; les quatre types de combinaisons ne se mélangent pas.
4. **Confondre intérieur et intérieur relatif** — pour un ensemble plat, l'intérieur est vide et seul l'intérieur relatif a un sens.
5. **Croire les éléments minimaux uniques** — seul l'élément **minimum** l'est, et il n'existe presque jamais dès qu'on quitte $\mathbb{R}$.
6. **Utiliser la perspective hors de son domaine** — elle exige $t>0$ strictement.
7. **Croire que deux convexes disjoints sont toujours strictement séparables** — c'est faux même pour des fermés ; il faut par exemple qu'un des deux soit compact.
8. **Prendre $\lambda\succ0$ dans la réciproque des éléments minimaux** — on n'obtient que $\lambda\succeq0$ non nul, et c'est indépassable.

## 📌 Ultimate Review

1. Quatre combinaisons, une seule différence : les contraintes sur les $\theta_i$ — linéaire, affine ($\sum=1$), convexe ($\succeq0$, $\sum=1$), conique ($\succeq0$).
2. Affine $=$ contient la droite ; convexe $=$ contient le segment ; cône convexe $=$ stable par combinaisons positives.
3. $\mathbb{E}x\in C$ si $x\in C$ presque sûrement et $C$ convexe — la forme la plus générale de la combinaison convexe.
4. Catalogue : hyperplans et demi-espaces, boules et ellipsoïdes ($P\succ0$, demi-axes $\sqrt{\lambda_i}$), boules et cônes de norme (second ordre), polyèdres et simplexes, $\mathbf{S}^n_+$.
5. **Calcul de convexité** : intersection (même infinie), fonctions affines (image et image réciproque), perspective $P(z,t)=z/t$, linéaire-fractionnaire.
6. LMI $A(x)\preceq B$ : image réciproque de $\mathbf{S}^m_+$ par une affine — toujours convexe.
7. **Cône propre** : convexe, fermé, plein, pointu. Il induit $\preceq_K$, ordre **partiel**.
8. **Minimum** (unique, $S\subseteq x+K$) contre **minimal** ($({x-K})\cap S=\{x\}$, possiblement multiple).
9. **Séparation** : deux convexes disjoints admettent un hyperplan séparateur ; un convexe fermé est l'intersection des demi-espaces qui le contiennent ; **hyperplan d'appui** en tout point du bord.
10. **Cône dual** $K^\star=\{y\mid x^Ty\geq0\ \forall x\in K\}$ ; $\mathbb{R}^n_+$ et $\mathbf{S}^n_+$ sont **auto-duaux** ; $K^{\star\star}=K$ pour un cône propre.

**Formulas to know**

$$\mathcal{E} = \{x\mid(x-x_c)^TP^{-1}(x-x_c)\leq1\} \qquad P(z,t)=z/t \qquad f(x)=\frac{Ax+b}{c^Tx+d}$$

$$x\preceq_Ky\iff y-x\in K \qquad K^\star=\{y\mid x^Ty\geq0\ \forall x\in K\}$$

**Methods to know** : le protocole en 6 étapes ; la preuve de séparation par le segment de distance minimale ; la traduction d'une condition spectrale en LMI.

## 🧠 Active Recall

**Basic** — Donnez les définitions d'ensemble affine, d'ensemble convexe et de cône convexe, en une phrase chacune.

<details><summary>Réponse</summary>

*Affine* : contient la **droite** passant par deux quelconques de ses points. *Convexe* : contient le **segment** entre deux quelconques de ses points. *Cône convexe* : contient toutes les **combinaisons positives** $\theta_1x_1+\theta_2x_2$, $\theta_i\geq0$, de ses points.

</details>

**Understanding** — Pourquoi le calcul de convexité (§2.3) est-il plus utile que la définition ?

<details><summary>Réponse</summary>

Parce qu'il **compose** : une fois établi que le catalogue du §2.2 est convexe, tout ensemble obtenu par intersection, image ou image réciproque affine, perspective ou linéaire-fractionnaire l'est automatiquement. On prouve la convexité par **construction**, sans jamais manipuler $\theta x_1+(1-\theta)x_2$ — ce qui serait souvent très pénible (essayez sur le cône PSD).

</details>

**Application** — L'ensemble $\{(x,t)\mid \|x\|_1\leq t\}$ est-il convexe ? De quel type ?

<details><summary>Réponse</summary>

Oui : c'est le **cône de norme** associé à $\|\cdot\|_1$, donc un cône convexe. Son dual est le cône de la norme duale, ici $\|\cdot\|_\infty$ : $K^\star = \{(u,v)\mid\|u\|_\infty\leq v\}$.

</details>

**Comparison** — Élément minimum et élément minimal : définitions, unicité, et pourquoi la distinction n'existe pas sur $\mathbb{R}$.

<details><summary>Réponse</summary>

*Minimum* : $x\preceq_Ky$ pour **tout** $y\in S$, soit $S\subseteq x+K$ ; **unique** s'il existe. *Minimal* : aucun $y\in S$ n'est strictement plus petit, soit $(x-K)\cap S=\{x\}$ ; il peut y en avoir **beaucoup**. Sur $\mathbb{R}$ avec $K=\mathbb{R}_+$, l'ordre est **total** : tout est comparable, et les deux notions coïncident. Dès que l'ordre est partiel, elles se séparent.

</details>

**Exam-style** — Énoncez le théorème de l'hyperplan séparateur et donnez sa construction dans le cas où la distance entre les deux convexes est atteinte.

<details><summary>Réponse</summary>

*Énoncé.* Si $C$ et $D$ sont convexes non vides et disjoints, il existe $a\neq0$ et $b$ avec $a^Tx\leq b$ sur $C$ et $a^Tx\geq b$ sur $D$.

*Construction.* Soient $c\in C$ et $d\in D$ réalisant $\mathrm{dist}(C,D) = \|c-d\|_2>0$. On pose $a=d-c$ et $b = (\|d\|_2^2-\|c\|_2^2)/2$, de sorte que

$$f(x) = a^Tx-b = (d-c)^T\big(x-\tfrac12(d+c)\big)$$

L'hyperplan $\{f=0\}$ est perpendiculaire au segment $[c,d]$ et passe par son milieu. Si $f$ était négative en un point $u\in D$, on montrerait que $d+t(u-d)\in D$ est plus proche de $c$ que $d$ pour $t>0$ petit — contradiction.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Ensemble affine ? | Contient la **droite** passant par deux de ses points |
| Ensemble convexe ? | Contient le **segment** entre deux de ses points |
| Cône convexe ? | Stable par combinaisons **positives** $\theta_1x_1+\theta_2x_2$, $\theta_i\geq0$ |
| Enveloppe convexe ? | Ensemble des combinaisons convexes — le plus petit convexe contenant $C$ |
| Intérieur relatif ? | Intérieur pris dans $\mathbf{aff}\,C$ |
| Ellipsoïde ? | $\{x\mid(x-x_c)^TP^{-1}(x-x_c)\leq1\}$, $P\succ0$ ; demi-axes $\sqrt{\lambda_i}$ |
| Cône du second ordre ? | $\{(x,t)\mid\\|x\\|_2\leq t\}$ — aussi dit de Lorentz ou « glace » |
| Simplexe de probabilité ? | $\{x\mid x\succeq0,\ \mathbf1^Tx=1\}$ |
| Le cône PSD est-il convexe ? | Oui — intersection des demi-espaces $\{X\mid z^TXz\geq0\}$ |
| Opérations préservant la convexité ? | Intersection, affine (image et image réciproque), perspective, linéaire-fractionnaire |
| Fonction perspective ? | $P(z,t)=z/t$, $t>0$ — une caméra à sténopé |
| LMI ? | $A(x)=x_1A_1+\dots+x_nA_n\preceq B$ — ensemble solution convexe |
| Cône propre ? | Convexe, fermé, plein, pointu |
| $x\preceq_K y$ ? | $y-x\in K$ |
| Élément minimum vs minimal ? | $S\subseteq x+K$ (unique) contre $(x-K)\cap S=\{x\}$ (multiple) |
| Théorème de séparation ? | Deux convexes disjoints admettent un hyperplan séparateur |
| Un convexe fermé est ? | L'intersection de **tous** les demi-espaces qui le contiennent |
| Hyperplan d'appui ? | En tout point du bord d'un convexe, il en existe un |
| Cône dual ? | $K^\star=\{y\mid x^Ty\geq0\ \forall x\in K\}$ — toujours convexe et fermé |
| Cônes auto-duaux ? | $\mathbb{R}^n_+$ et $\mathbf{S}^n_+$ |
