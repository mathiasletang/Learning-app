# Fiche 35 — Fonctions convexes (Boyd, chapitre 3)

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Boyd & Vandenberghe, *Convex Optimization*, chapitre 3 « Convex functions », p. 67–126 |
| **Difficulté** | Must know — avec le chapitre 2, tout le socle M1 |
| **Temps d'étude estimé** | 3 h |
| **Prérequis** | Fiche 34 (ensembles convexes, épigraphe, cônes), fiche 9 (hessienne) |
| **Concepts clés** | Convexité, extension à valeurs étendues, conditions du premier et du second ordre, épigraphe, sous-niveaux, Jensen, calcul de convexité, composition, minimisation partielle, perspective, conjuguée, quasiconvexité |
| **Poids à l'examen** | La question type est « cette fonction est-elle convexe ? » — et la bonne réponse passe **toujours** par le calcul de convexité (§3.2), jamais par la définition. Les règles de **composition** sont le point le plus discriminant. |

## 🎯 Vue d'ensemble

Le chapitre 3 refait, pour les fonctions, exactement ce que le chapitre 2 a fait pour les ensembles : un catalogue, puis un calcul. Mais il ajoute une idée qui les relie :

```
FONCTION convexe  ⟺  son ÉPIGRAPHE est un ensemble convexe
```

Tout le chapitre 2 devient donc disponible pour les fonctions, et réciproquement. Trois caractérisations coexistent, à utiliser selon ce dont on dispose :

| Ce que l'on a | Caractérisation |
|---|---|
| rien (fonction quelconque) | la **corde** est au-dessus du graphe |
| $f$ dérivable | la **tangente** est sous le graphe : $f(y)\geq f(x)+\nabla f(x)^T(y-x)$ |
| $f$ deux fois dérivable | la **hessienne** est $\succeq0$ |
| une construction | le **calcul de convexité** (§3.2) — la voie de loin la plus rapide |

## 🔴 Concept 1 — Définition et premières remarques

**Définition.** $f:\mathbb{R}^n\to\mathbb{R}$ est **convexe** si $\mathbf{dom}\,f$ est un ensemble convexe et si, pour tous $x,y\in\mathbf{dom}\,f$ et $\theta\in[0,1]$,

$$f(\theta x+(1-\theta)y) \leq \theta f(x) + (1-\theta)f(y) \tag{3.1}$$

Géométriquement : le segment joignant $(x,f(x))$ à $(y,f(y))$ — la **corde** — est **au-dessus** du graphe.

$f$ est **strictement convexe** si l'inégalité est stricte dès que $x\neq y$ et $0<\theta<1$ ; **concave** si $-f$ est convexe.

**Deux faits immédiats.**

- Toute fonction **affine** vérifie (3.1) avec **égalité** : elle est à la fois convexe et concave. Réciproquement, une fonction à la fois convexe et concave est affine.
- **Restriction à une droite** : $f$ est convexe **si et seulement si** pour tout $x\in\mathbf{dom}\,f$ et tout $v$, la fonction $g(t) = f(x+tv)$ est convexe (sur son domaine).

> **La restriction à une droite est l'outil de secours universel.** Quand aucune règle du §3.2 ne s'applique, on se ramène à une fonction d'**une** variable, où l'on sait tout faire. Boyd l'utilise pour $\log\det X$.

**Régularité.** Une fonction convexe est **continue sur l'intérieur relatif de son domaine** ; ses discontinuités ne peuvent se trouver que sur la frontière relative.

### Extension à valeurs étendues

On prolonge $f$ à tout $\mathbb{R}^n$ par

$$\tilde f(x) = \begin{cases} f(x) & x\in\mathbf{dom}\,f\\ +\infty & x\notin\mathbf{dom}\,f\end{cases}$$

et l'on retrouve $\mathbf{dom}\,f = \{x\mid\tilde f(x)<\infty\}$. L'intérêt est **notationnel** : l'inégalité (3.1) s'écrit alors pour **tous** $x,y$ sans préciser le domaine, et la somme $f_1+f_2$ a automatiquement pour domaine $\mathbf{dom}\,f_1\cap\mathbf{dom}\,f_2$.

*Exemple 3.1 — fonction indicatrice.* Pour $C$ convexe,

$$\tilde I_C(x) = \begin{cases}0 & x\in C\\ +\infty & x\notin C\end{cases}$$

**Le tour de passe-passe à retenir** : minimiser $f$ **sur $C$** revient à minimiser $f+\tilde I_C$ **sur $\mathbb{R}^n$** — une contrainte devient un terme de l'objectif.

## 🔴 Concept 2 — Condition du premier ordre

Si $f$ est dérivable (gradient défini sur $\mathbf{dom}\,f$ ouvert), alors $f$ est convexe **si et seulement si** $\mathbf{dom}\,f$ est convexe et

$$f(y) \geq f(x) + \nabla f(x)^T(y-x) \qquad \forall x,y\in\mathbf{dom}\,f \tag{3.2}$$

**Ce que cela dit.** L'approximation de Taylor au premier ordre est un **minorant global** de $f$. Réciproquement, si l'approximation de Taylor au premier ordre est toujours un minorant global, la fonction est convexe.

> **C'est la propriété la plus importante des fonctions convexes**, selon Boyd lui-même : *on déduit une information globale (un minorant partout) d'une information locale (valeur et dérivée en un point).* Conséquence immédiate : si $\nabla f(x)=0$, alors $f(y)\geq f(x)$ pour tout $y$ — **$x$ est un minimiseur global**.

**Variante stricte.** $f$ est strictement convexe ssi $f(y)>f(x)+\nabla f(x)^T(y-x)$ pour $x\neq y$.

**Démonstration (celle de Boyd, en deux temps).**

*Cas $n=1$.* Si $f$ est convexe, pour $0<t\leq1$ la convexité donne $f(x+t(y-x))\leq(1-t)f(x)+tf(y)$, soit après division par $t$

$$f(y)\geq f(x) + \frac{f(x+t(y-x))-f(x)}{t}$$

et la limite $t\to0$ donne (3.2). Réciproquement, en posant $z=\theta x+(1-\theta)y$ et en appliquant (3.2) deux fois, en $x$ puis en $y$ depuis $z$ :

$$f(x)\geq f(z)+f'(z)(x-z), \qquad f(y)\geq f(z)+f'(z)(y-z)$$

puis en multipliant par $\theta$ et $1-\theta$ et en additionnant, les termes en $f'(z)$ s'annulent et il reste $\theta f(x)+(1-\theta)f(y)\geq f(z)$.

*Cas général.* On restreint à la droite : $g(t)=f(ty+(1-t)x)$, avec $g'(t) = \nabla f(ty+(1-t)x)^T(y-x)$, et l'on applique le cas $n=1$ : $g(1)\geq g(0)+g'(0)$ est exactement (3.2). $\blacksquare$

## 🔴 Concept 3 — Condition du second ordre

Si $f$ est deux fois dérivable, $f$ est convexe **si et seulement si** $\mathbf{dom}\,f$ est convexe et

$$\nabla^2f(x)\succeq0 \qquad \forall x\in\mathbf{dom}\,f$$

Sur $\mathbb{R}$, cela se réduit à $f''(x)\geq0$ : la dérivée est croissante. Géométriquement, la courbure du graphe est dirigée vers le haut.

**Convexité stricte.** $\nabla^2f(x)\succ0$ partout **entraîne** la stricte convexité. La réciproque est **fausse** : $f(x)=x^4$ est strictement convexe mais $f''(0)=0$.

*Exemple 3.2 — fonctions quadratiques.* Pour $f(x)=\tfrac12x^TPx+q^Tx+r$ avec $P\in\mathbf{S}^n$, on a $\nabla^2f(x)=P$ partout, donc

$$f \text{ convexe} \iff P\succeq0, \qquad f \text{ strictement convexe} \iff P\succ0$$

<div class="callout callout--warn" data-kind="formel">

<span class="callout__lab">Remarque 3.1 de Boyd — l'hypothèse sur le domaine ne se retire pas.</span>

La fonction $f(x)=1/x^2$ de domaine $\{x\neq0\}$ vérifie $f''(x)>0$ **partout sur son domaine**, et pourtant elle **n'est pas convexe** : son domaine n'est pas convexe. Vérifier la hessienne sans vérifier le domaine est l'erreur la plus fréquente du chapitre.

</div>

## 🟠 Concept 4 — Le catalogue (§3.1.5)

**Sur $\mathbb{R}$.**

| Fonction | Convexité |
|---|---|
| $e^{ax}$ | convexe sur $\mathbb{R}$, pour tout $a\in\mathbb{R}$ |
| $x^a$ | convexe sur $\mathbb{R}_{++}$ si $a\geq1$ ou $a\leq0$ ; **concave** si $0\leq a\leq1$ |
| $\lvert x\rvert^p$, $p\geq1$ | convexe sur $\mathbb{R}$ |
| $\log x$ | concave sur $\mathbb{R}_{++}$ |
| $x\log x$ | convexe sur $\mathbb{R}_{++}$ (entropie négative) |

**Sur $\mathbb{R}^n$ et $\mathbf{S}^n$.**

| Fonction | Convexité | Preuve de Boyd |
|---|---|---|
| toute **norme** $\\|x\\|$ | convexe | $\\|\theta x+(1-\theta)y\\| \leq \\|\theta x\\|+\\|(1-\theta)y\\| = \theta\\|x\\|+(1-\theta)\\|y\\|$ — triangulaire $+$ homogénéité |
| $\max_i x_i$ | convexe | $\max_i(\theta x_i+(1-\theta)y_i)\leq\theta\max_ix_i+(1-\theta)\max_iy_i$ |
| $x^2/y$ (quadratique-sur-linéaire) | convexe sur $\mathbb{R}\times\mathbb{R}_{++}$ | $\nabla^2f = \frac{2}{y^3}\begin{pmatrix}y\\-x\end{pmatrix}\begin{pmatrix}y\\-x\end{pmatrix}^T\succeq0$ |
| $\log(e^{x_1}+\dots+e^{x_n})$ | convexe | hessienne $\frac{1}{(\mathbf1^Tz)^2}\big((\mathbf1^Tz)\mathbf{diag}(z)-zz^T\big)$, positive par **Cauchy-Schwarz** |
| $(\prod_ix_i)^{1/n}$ (moyenne géométrique) | **concave** sur $\mathbb{R}^n_{++}$ | même argument de Cauchy-Schwarz |
| $\log\det X$ | **concave** sur $\mathbf{S}^n_{++}$ | restriction à une droite |

**Le calcul de $\log\det$, à connaître.** Sur la droite $X = Z+tV$ avec $Z\succ0$ :

$$g(t) = \log\det(Z+tV) = \log\det\big(Z^{1/2}(I+tZ^{-1/2}VZ^{-1/2})Z^{1/2}\big) = \sum_{i=1}^n\log(1+t\lambda_i) + \log\det Z$$

où les $\lambda_i$ sont les valeurs propres de $Z^{-1/2}VZ^{-1/2}$. Donc

$$g'(t) = \sum_i\frac{\lambda_i}{1+t\lambda_i}, \qquad g''(t) = -\sum_i\frac{\lambda_i^2}{(1+t\lambda_i)^2} \leq 0$$

et $f$ est **concave**. $\blacksquare$

> **Le mémo du log-sum-exp.** $\max_i x_i \leq \log\sum_ie^{x_i}\leq\max_ix_i+\log n$ : c'est l'approximation **lisse** du maximum, et son gradient est le **softmax**. On la retrouve en apprentissage statistique et dans les modèles de choix discret.

## 🔴 Concept 5 — Sous-niveaux et épigraphe : le pont avec le chapitre 2

**Ensembles de sous-niveau.**

$$C_\alpha = \{x\in\mathbf{dom}\,f \mid f(x)\leq\alpha\}$$

Les sous-niveaux d'une fonction **convexe** sont **convexes**, pour tout $\alpha$. Preuve immédiate depuis (3.1).

⚠️ **La réciproque est fausse** : $f(x)=-e^x$ a tous ses sous-niveaux convexes (des intervalles) sans être convexe — elle est même strictement concave. Les fonctions dont tous les sous-niveaux sont convexes forment une classe plus large : les **quasiconvexes** (concept 9).

*Exemple 3.3 — inégalité arithmético-géométrique.* Avec $G(x) = (\prod x_i)^{1/n}$ et $A(x)=\frac1n\sum x_i$, l'ensemble $\{x\in\mathbb{R}^n_+ \mid G(x)\geq\alpha A(x)\}$ est convexe : c'est le sur-niveau $0$ de la fonction **concave** $G-\alpha A$. Il est de plus positivement homogène : c'est un **cône convexe**.

**Épigraphe.**

$$\mathbf{epi}\,f = \{(x,t) \mid x\in\mathbf{dom}\,f,\ f(x)\leq t\} \subseteq \mathbb{R}^{n+1}$$

> **Le théorème de liaison :** *une fonction est convexe **si et seulement si** son épigraphe est un ensemble convexe.* (Et concave ssi son **hypographe** $\{(x,t)\mid t\leq f(x)\}$ est convexe.)

*Exemple 3.4 — fonction matricielle fractionnaire.* $f(x,Y)=x^TY^{-1}x$ est convexe sur $\mathbb{R}^n\times\mathbf{S}^n_{++}$, car

$$\mathbf{epi}\,f = \Big\{(x,Y,t) \ \Big|\ \begin{pmatrix}Y & x\\ x^T & t\end{pmatrix}\succeq0,\ Y\succ0\Big\}$$

par la condition du **complément de Schur** — et c'est une LMI en $(x,Y,t)$, donc un convexe (fiche 34). Pour $n=1$ on retrouve $x^2/y$.

**Lecture géométrique de la condition du premier ordre.** Si $(y,t)\in\mathbf{epi}\,f$ alors $t\geq f(y)\geq f(x)+\nabla f(x)^T(y-x)$, ce qui s'écrit

$$\begin{pmatrix}\nabla f(x)\\ -1\end{pmatrix}^T\begin{pmatrix}y-x\\ t-f(x)\end{pmatrix}\leq0$$

Le vecteur $(\nabla f(x),-1)$ définit donc un **hyperplan d'appui** à $\mathbf{epi}\,f$ au point $(x,f(x))$ — la condition du premier ordre **est** le théorème d'appui du chapitre 2, appliqué à l'épigraphe.

## 🟠 Concept 6 — Inégalité de Jensen

L'inégalité (3.1) elle-même s'appelle **inégalité de Jensen**. Elle s'étend :

- aux combinaisons convexes finies : $f\big(\sum_i\theta_ix_i\big)\leq\sum_i\theta_if(x_i)$ ;
- aux intégrales : $f\big(\int_Sp(x)x\,dx\big)\leq\int_Sf(x)p(x)\,dx$ pour $p\geq0$ d'intégrale $1$ ;
- **à l'espérance**, forme la plus générale : $$f(\mathbb{E}\,x) \leq \mathbb{E}\,f(x) \tag{3.5}$$

**Cette inégalité caractérise la convexité** : si $f$ n'est pas convexe, il existe une variable aléatoire $x$ à valeurs dans $\mathbf{dom}\,f$ telle que $f(\mathbb{E}x)>\mathbb{E}f(x)$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarque 3.2 de Boyd, à retenir.</span>

Si $z$ est un vecteur aléatoire **centré**, alors $\mathbb{E}f(x+z)\geq f(x)$ : *ajouter un bruit centré ne peut pas faire baisser, en moyenne, la valeur d'une fonction convexe.* C'est la raison profonde pour laquelle le bruit dégrade un coût convexe.

</div>

**Applications classiques (§3.1.9).**

*Inégalité arithmético-géométrique.* $-\log$ est convexe ; Jensen avec $\theta=1/2$ donne

$$-\log\frac{a+b}{2} \leq \frac{-\log a-\log b}{2} \ \Longrightarrow\ \sqrt{ab}\leq\frac{a+b}{2}$$

La version générale $a^\theta b^{1-\theta}\leq\theta a+(1-\theta)b$ s'obtient avec un $\theta$ quelconque.

*Inégalité de Hölder.* Pour $p>1$ avec $1/p+1/q=1$ :

$$\sum_{i=1}^n x_iy_i \leq \Big(\sum_i|x_i|^p\Big)^{1/p}\Big(\sum_i|y_i|^q\Big)^{1/q}$$

Elle s'obtient en appliquant l'inégalité arithmético-géométrique générale à $a = |x_i|^p/\sum_j|x_j|^p$, $b=|y_i|^q/\sum_j|y_j|^q$ et $\theta=1/p$, puis en sommant sur $i$.

## 🔴 Concept 7 — Le calcul de convexité (§3.2)

C'est la section à maîtriser : elle rend inutile tout calcul de hessienne.

### Somme pondérée positive et composition affine

- $wf$ est convexe pour $w\geq0$ ; une **somme** de convexes est convexe. Les fonctions convexes forment donc elles-mêmes un **cône convexe**.
- Cela s'étend aux intégrales : si $f(x,y)$ est convexe en $x$ pour chaque $y$ et $w(y)\geq0$, alors $g(x)=\int_Aw(y)f(x,y)\,dy$ est convexe.
- **Composition affine** : si $f$ est convexe, $g(x) = f(Ax+b)$ l'est aussi.

### Maximum et supremum ponctuels

Si $f_1,\dots,f_m$ sont convexes, $f(x)=\max_i f_i(x)$ l'est. Et cela s'étend au **supremum sur un ensemble infini** :

$$g(x) = \sup_{y\in A} f(x,y) \quad\text{est convexe si } f(\cdot,y) \text{ l'est pour chaque } y \tag{3.7}$$

**En termes d'épigraphes** : $\mathbf{epi}\,g = \bigcap_{y\in A}\mathbf{epi}\,f(\cdot,y)$ — le résultat n'est que l'intersection de convexes du chapitre 2.

| Exemple | Fonction | Écriture en supremum |
|---|---|---|
| **3.5** affine par morceaux | $\max_i(a_i^Tx+b_i)$ | max de fonctions affines |
| **3.6** somme des $r$ plus grandes composantes | $\sum_{i=1}^r x_{[i]}$ | $\max\{x_{i_1}+\dots+x_{i_r}\}$ sur les choix d'indices |
| **3.7** fonction d'appui | $S_C(x)=\sup_{y\in C}x^Ty$ | sup de linéaires |
| **3.8** distance au point le plus éloigné | $\sup_{y\in C}\\|x-y\\|$ | sup de convexes |
| **3.10** plus grande valeur propre | $\lambda_{\max}(X) = \sup\{y^TXy \mid \\|y\\|_2=1\}$ | sup de **linéaires en $X$** |
| **3.11** norme spectrale | $\\|X\\|_2 = \sup\{u^TXv \mid \\|u\\|_2=\\|v\\|_2=1\}$ | sup de linéaires en $X$ |

*Exemple 3.9 (concavité par l'infimum).* Le coût optimal des moindres carrés pondérés $g(w) = \inf_x\sum_iw_i(a_i^Tx-b_i)^2$ est **concave** en $w$ : c'est un infimum de fonctions **linéaires** de $w$.

**La réciproque (importante).** Presque toute fonction convexe est le supremum ponctuel d'une famille de fonctions **affines** : si $f$ est convexe avec $\mathbf{dom}\,f=\mathbb{R}^n$,

$$f(x) = \sup\{g(x) \mid g \text{ affine},\ g(z)\leq f(z)\ \forall z\}$$

La preuve prend un **hyperplan d'appui** à $\mathbf{epi}\,f$ en $(x,f(x))$ et montre qu'il n'est pas vertical.

### Composition (§3.2.4) — le point technique

Pour $f = h\circ g$ avec $h:\mathbb{R}\to\mathbb{R}$ et $g:\mathbb{R}^n\to\mathbb{R}$, la dérivée seconde dans le cas scalaire régulier s'écrit

$$f''(x) = h''(g(x))\,g'(x)^2 + h'(g(x))\,g''(x) \tag{3.9}$$

d'où les **quatre règles** :

| $h$ | $g$ | $f = h\circ g$ |
|---|---|---|
| convexe et **croissante** | convexe | **convexe** |
| convexe et **décroissante** | concave | **convexe** |
| concave et **croissante** | concave | **concave** |
| concave et **décroissante** | convexe | **concave** |

⚠️ **La monotonie de $h$ ne s'oublie pas.** $h(u)=u^2$ est convexe mais pas croissante sur $\mathbb{R}$, donc $g$ convexe n'entraîne **pas** $g^2$ convexe : prendre $g(x)=x^2-1$, dont le carré $(x^2-1)^2$ n'est pas convexe. La monotonie doit s'entendre sur l'**extension à valeurs étendues** de $h$ — c'est la subtilité que Boyd détaille.

### Minimisation partielle (§3.2.5)

Si $f$ est convexe **en $(x,y)$** et $C$ un convexe non vide, alors

$$g(x) = \inf_{y\in C} f(x,y) \tag{3.16}$$

est convexe en $x$ (pourvu que $g(x)>-\infty$). Son domaine est la **projection** de $\mathbf{dom}\,f$ sur les coordonnées $x$.

> **La symétrie à retenir.** Le **sup** préserve la convexité même sur des fonctions séparées ; l'**inf** ne la préserve que si $f$ est convexe **conjointement** en $(x,y)$. C'est la différence entre l'intersection d'épigraphes et leur projection.

### Perspective d'une fonction (§3.2.6)

$$g(x,t) = t\,f(x/t), \qquad \mathbf{dom}\,g = \{(x,t)\mid x/t\in\mathbf{dom}\,f,\ t>0\}$$

La perspective **préserve la convexité** (et la concavité). Exemples classiques : la perspective de $x^Tx$ est $x^Tx/t$ (quadratique-sur-linéaire) ; celle de $-\log x$ est $t\log(t/x)$, l'**entropie relative**.

## 🟠 Concept 8 — La fonction conjuguée (§3.3)

**Définition.**

$$f^\star(y) = \sup_{x\in\mathbf{dom}\,f}\ \big(y^Tx - f(x)\big) \tag{3.18}$$

Son domaine est l'ensemble des $y$ pour lesquels le supremum est **fini**.

**$f^\star$ est toujours convexe**, que $f$ le soit ou non — c'est un supremum de fonctions **affines** de $y$.

**Lecture géométrique (figure 3.8).** $f^\star(y)$ est l'**écart maximal** entre la droite $y\mapsto yx$ et le graphe de $f$. Si $f$ est dérivable, cet écart est atteint là où $f'(x)=y$ : la conjuguée réindexe la fonction **par sa pente** au lieu de son abscisse.

**Inégalité de Fenchel** (dite de Young si $f$ est dérivable) — conséquence immédiate de la définition :

$$f(x) + f^\star(y) \geq x^Ty \qquad \forall x,y$$

*Exemple :* pour $f(x)=\tfrac12x^TQx$ avec $Q\succ0$, on obtient

$$x^Ty \leq \tfrac12x^TQx + \tfrac12y^TQ^{-1}y$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi c'est central.</span>

La conjuguée est l'outil qui produit les **fonctions duales** du chapitre 5 (fiche 37) : la fonction duale de Lagrange s'exprime presque toujours à l'aide d'une conjuguée. Retenir la définition et Fenchel suffit à ce stade.

</div>

## 🟠 Concept 9 — Quasiconvexité (§3.4)

**Définition.** $f$ est **quasiconvexe** (ou *unimodale*) si son domaine et **tous** ses sous-niveaux $S_\alpha=\{x\in\mathbf{dom}\,f\mid f(x)\leq\alpha\}$ sont convexes. $f$ est **quasiconcave** si $-f$ est quasiconvexe (tous les **sur-niveaux** convexes), et **quasilinéaire** si elle est les deux — auquel cas tous ses **ensembles de niveau** $\{f=\alpha\}$ sont convexes.

Sur $\mathbb{R}$, la quasiconvexité signifie que chaque sous-niveau est un **intervalle** : la fonction descend puis remonte, sans « bosse » intermédiaire.

**Convexe $\Rightarrow$ quasiconvexe**, jamais l'inverse : $-e^x$, $\log x$, $\lceil x\rceil$ sont quasiconvexes sans être convexes.

**Condition du premier ordre.** Si $f$ est dérivable, $f$ est quasiconvexe **si et seulement si** $\mathbf{dom}\,f$ est convexe et

$$f(y)\leq f(x) \ \Longrightarrow\ \nabla f(x)^T(y-x)\leq0 \tag{3.20}$$

**Comparez avec la condition du premier ordre convexe.** La convexité dit *combien* $f$ descend ; la quasiconvexité dit seulement *dans quelle direction*. C'est nettement plus faible — et c'est pourquoi $\nabla f(x)=0$ n'entraîne **pas** l'optimalité globale pour une fonction quasiconvexe.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi l'économiste s'y intéresse.</span>

La convexité des **préférences** n'est rien d'autre que la **quasiconcavité** de la fonction d'utilité : les courbes d'indifférence délimitent des sur-niveaux convexes. La microéconomie n'a jamais besoin de plus que la quasiconcavité — hypothèse strictement plus faible que la concavité.

</div>

### Comment résoudre l'exercice type (protocole)

1. **Vérifier le domaine** : est-il convexe ? Sinon, tout s'arrête là (remarque 3.1).
2. **Chercher dans le catalogue** (§3.1.5) : norme, max, log-sum-exp, quadratique-sur-linéaire, $\log\det$…
3. **Décomposer par le calcul** (§3.2) : somme positive ? composition affine ? max ou sup ? composition avec les règles de monotonie ? minimisation partielle ? perspective ?
4. **Sinon, restreindre à une droite** : poser $g(t)=f(x+tv)$ et étudier $g''$.
5. **Sinon seulement**, calculer la hessienne et étudier son signe.
6. **Pour la non-convexité**, exhiber deux points et un $\theta$ — ou un point où $\nabla^2f\not\succeq0$.
7. **Si l'objectif n'est pas convexe**, tester la **quasi**convexité par les sous-niveaux : cela suffit à beaucoup de méthodes.

### Exercices progressifs

**Niveau 1** — $f(x)=\|Ax-b\|_2^2$ est-elle convexe ?

<details><summary>Correction</summary>

**Oui**, par composition affine : $f = h\circ g$ avec $g(x)=Ax-b$ **affine** et $h(u)=\|u\|_2^2$ convexe. La composition d'une convexe avec une **affine** préserve la convexité **sans condition de monotonie** (§3.2.2). *Contrôle par la hessienne :* $\nabla^2f = 2A^TA\succeq0$ .

</details>

**Niveau 2** — $f(x) = e^{g(x)}$ avec $g$ convexe : convexe ?

<details><summary>Correction</summary>

**Oui.** $h(u)=e^u$ est convexe **et croissante**, $g$ est convexe : première ligne du tableau de composition, donc $f$ est convexe. *Contre-test :* si $h$ n'était pas croissante — par exemple $h(u)=u^2$ — la conclusion tomberait. Avec $g(x)=x^2-1$ convexe, $h(g(x)) = (x^2-1)^2$ a une dérivée seconde $12x^2-4$, négative en $0$ : **pas convexe**.

</details>

**Niveau 3** — Montrez que $f(x) = x^2/y$ est convexe sur $\mathbb{R}\times\mathbb{R}_{++}$, par **deux** méthodes.

<details><summary>Correction</summary>

*Méthode 1 — hessienne.* Pour $y>0$,

$$\nabla^2f(x,y) = \frac{2}{y^3}\begin{pmatrix}y^2 & -xy\\ -xy & x^2\end{pmatrix} = \frac{2}{y^3}\begin{pmatrix}y\\-x\end{pmatrix}\begin{pmatrix}y\\-x\end{pmatrix}^T$$

C'est $\frac{2}{y^3}vv^T$ avec $y^3>0$ : une matrice de la forme $vv^T$ est toujours $\succeq0$ (car $z^Tvv^Tz = (v^Tz)^2\geq0$).

*Méthode 2 — perspective.* $f$ est la **perspective** de $u\mapsto u^2$ : $g(x,y)=y\,(x/y)^2 = x^2/y$. La perspective préserve la convexité (§3.2.6), et $u^2$ est convexe.

*Méthode 3 — épigraphe.* $\mathbf{epi}\,f = \{(x,y,t)\mid \begin{pmatrix}y&x\\x&t\end{pmatrix}\succeq0,\ y>0\}$ par complément de Schur : une LMI, donc convexe (exemple 3.4).

</details>

**Niveau 4 — type examen** — Montrez que $f(X)=\lambda_{\max}(X)$ est convexe sur $\mathbf{S}^n$, puis que $g(X)=\lambda_{\min}(X)$ est **concave**.

<details><summary>Correction</summary>

**Convexité de $\lambda_{\max}$.** Par le quotient de Rayleigh,

$$\lambda_{\max}(X) = \sup\{y^TXy \mid \|y\|_2 = 1\}$$

Pour chaque $y$ fixé, $X\mapsto y^TXy$ est une fonction **linéaire** de $X$ (c'est $\mathbf{tr}(Xyy^T)$). Donc $\lambda_{\max}$ est un **supremum ponctuel de fonctions linéaires**, donc convexe (§3.2.3, exemple 3.10). $\blacksquare$

**Concavité de $\lambda_{\min}$.** De même,

$$\lambda_{\min}(X) = \inf\{y^TXy \mid \|y\|_2=1\}$$

est un **infimum** de fonctions linéaires, donc **concave**. (On peut aussi écrire $\lambda_{\min}(X) = -\lambda_{\max}(-X)$ et conclure par composition avec l'application affine $X\mapsto -X$.)

**Ce que l'exercice enseigne.** Une fonction définie par un problème d'optimisation hérite de la convexité de la **manière** dont on optimise : un $\sup$ de linéaires est convexe, un $\inf$ de linéaires est concave. Ce seul principe donne $\lambda_{\max}$, la norme spectrale, la fonction d'appui, et — au chapitre 5 — la **fonction duale de Lagrange**, qui est toujours concave pour cette exacte raison.

</details>

## 🔴 Common mistakes

1. **Oublier de vérifier que $\mathbf{dom}\,f$ est convexe** — la remarque 3.1 de Boyd est explicite : $1/x^2$ sur $\{x\neq0\}$ a une dérivée seconde positive et n'est pas convexe.
2. **Oublier la monotonie de $h$** dans les règles de composition — c'est l'erreur la plus fréquente du chapitre.
3. **Croire que $\nabla^2f\succ0$ est nécessaire à la stricte convexité** — $x^4$ est strictement convexe avec $f''(0)=0$.
4. **Croire que « tous les sous-niveaux convexes » implique convexe** — cela ne donne que la **quasi**convexité ($-e^x$).
5. **Appliquer l'inf à une fonction convexe en $x$ seulement** — la minimisation partielle exige la convexité **conjointe** en $(x,y)$.
6. **Confondre $f^\star$ et $f^{-1}$** — la conjuguée n'est pas une réciproque ; c'est une réindexation par la pente.
7. **Croire qu'un point stationnaire est optimal pour une quasiconvexe** — la condition du premier ordre quasiconvexe est bien plus faible que la convexe.
8. **Calculer une hessienne quand une règle suffit** — long, et souvent faux sur des fonctions matricielles.

## 📌 Ultimate Review

1. Définition : la **corde au-dessus du graphe**, avec $\mathbf{dom}\,f$ convexe.
2. $f$ convexe $\iff$ sa restriction à toute droite l'est.
3. **Premier ordre** : $f(y)\geq f(x)+\nabla f(x)^T(y-x)$ — la tangente minore globalement. D'où : $\nabla f(x)=0\Rightarrow$ minimum **global**.
4. **Second ordre** : $\nabla^2f\succeq0$ sur un domaine convexe. $\nabla^2f\succ0\Rightarrow$ strictement convexe, mais pas la réciproque.
5. **$f$ convexe $\iff$ $\mathbf{epi}\,f$ convexe** — le pont avec le chapitre 2. Les sous-niveaux sont convexes, mais la réciproque est fausse.
6. **Jensen** : $f(\mathbb{E}x)\leq\mathbb{E}f(x)$ ; il **caractérise** la convexité. AG et Hölder en découlent.
7. **Calcul** : somme positive, composition affine, max/sup ponctuel, composition (4 règles avec monotonie), minimisation partielle (convexité **conjointe**), perspective $tf(x/t)$.
8. Un **sup de linéaires** est convexe ; un **inf de linéaires** est concave — d'où $\lambda_{\max}$, la norme spectrale, la fonction d'appui.
9. **Conjuguée** $f^\star(y)=\sup_x(y^Tx-f(x))$ : toujours convexe ; **Fenchel** $f(x)+f^\star(y)\geq x^Ty$.
10. **Quasiconvexe** : tous les sous-niveaux convexes. Condition du premier ordre : $f(y)\leq f(x)\Rightarrow\nabla f(x)^T(y-x)\leq0$.

**Formulas to know**

$$f(\theta x+(1-\theta)y)\leq\theta f(x)+(1-\theta)f(y) \qquad f(y)\geq f(x)+\nabla f(x)^T(y-x) \qquad \nabla^2f\succeq0$$

$$\mathbf{epi}\,f=\{(x,t)\mid f(x)\leq t\} \qquad g(x,t)=tf(x/t) \qquad f^\star(y)=\sup_x\big(y^Tx-f(x)\big)$$

**Methods to know** : le protocole en 7 étapes ; les quatre règles de composition ; la restriction à une droite ; l'écriture en supremum de linéaires.

## 🧠 Active Recall

**Basic** — Énoncez les conditions du premier et du second ordre, avec leurs hypothèses.

<details><summary>Réponse</summary>

*Premier ordre* ($f$ dérivable, $\mathbf{dom}\,f$ ouvert et **convexe**) : $f$ convexe $\iff f(y)\geq f(x)+\nabla f(x)^T(y-x)$ pour tous $x,y\in\mathbf{dom}\,f$. *Second ordre* ($f$ deux fois dérivable, $\mathbf{dom}\,f$ ouvert et **convexe**) : $f$ convexe $\iff \nabla^2f(x)\succeq0$ pour tout $x\in\mathbf{dom}\,f$. Dans les deux cas, la convexité du **domaine** est une hypothèse séparée qui ne se déduit pas du reste.

</details>

**Understanding** — Pourquoi la condition du premier ordre est-elle « la propriété la plus importante » des fonctions convexes ?

<details><summary>Réponse</summary>

Parce qu'elle transforme une information **locale** (valeur et gradient en un point) en une information **globale** (un minorant valable partout). Conséquence directe : $\nabla f(x)=0$ entraîne $f(y)\geq f(x)$ pour **tout** $y$, donc l'optimalité **globale**. C'est ce qui rend l'optimisation convexe faisable : annuler le gradient suffit.

</details>

**Application** — $f(x)=\max\{x_1,\ \|x\|_2,\ e^{x_2}\}$ est-elle convexe ?

<details><summary>Réponse</summary>

**Oui.** Chacune des trois fonctions est convexe : $x_1$ est linéaire, $\|x\|_2$ est une norme, $e^{x_2}$ est convexe (exponentielle composée avec une forme linéaire). Le **maximum ponctuel** de fonctions convexes est convexe (§3.2.3). Aucun calcul de hessienne n'est nécessaire — et il serait d'ailleurs impossible, $f$ n'étant pas dérivable partout.

</details>

**Comparison** — Supremum et infimum : lequel préserve la convexité, et à quelles conditions ?

<details><summary>Réponse</summary>

Le **supremum** ponctuel d'une famille de convexes est convexe, sans autre hypothèse — c'est l'intersection des épigraphes. L'**infimum** ne préserve la convexité que dans le cas de la **minimisation partielle** : il faut que $f(x,y)$ soit convexe **conjointement** en $(x,y)$, et $C$ convexe. Un infimum de fonctions convexes en $x$ seulement n'a aucune raison d'être convexe.

</details>

**Exam-style** — Montrez que le log-sum-exp est convexe et encadrez-le par le maximum.

<details><summary>Réponse</summary>

*Convexité.* Avec $z=(e^{x_1},\dots,e^{x_n})$, la hessienne vaut

$$\nabla^2f(x) = \frac{1}{(\mathbf1^Tz)^2}\Big((\mathbf1^Tz)\,\mathbf{diag}(z) - zz^T\Big)$$

et pour tout $v$,

$$v^T\nabla^2f(x)v = \frac{1}{(\mathbf1^Tz)^2}\Big(\Big(\sum_iz_i\Big)\Big(\sum_iv_i^2z_i\Big) - \Big(\sum_iv_iz_i\Big)^2\Big)\geq0$$

par **Cauchy-Schwarz** $(a^Ta)(b^Tb)\geq(a^Tb)^2$ appliqué à $a_i=\sqrt{z_i}$ et $b_i = v_i\sqrt{z_i}$. Donc $\nabla^2f\succeq0$ et $f$ est convexe.

*Encadrement.* $e^{\max_ix_i}\leq\sum_ie^{x_i}\leq n\,e^{\max_ix_i}$, d'où en prenant le logarithme

$$\max_i x_i \ \leq\ \log\sum_ie^{x_i} \ \leq\ \max_ix_i+\log n$$

Le log-sum-exp est donc une approximation lisse du maximum, à $\log n$ près.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Définition de la convexité ? | $f(\theta x+(1-\theta)y)\leq\theta f(x)+(1-\theta)f(y)$, $\mathbf{dom}\,f$ convexe |
| Condition du premier ordre ? | $f(y)\geq f(x)+\nabla f(x)^T(y-x)$ — la tangente minore |
| Condition du second ordre ? | $\nabla^2f(x)\succeq0$ sur un domaine convexe |
| $\nabla^2f\succ0$ implique quoi ? | Stricte convexité — la réciproque est fausse ($x^4$) |
| $f$ convexe $\iff$ ? (ensembles) | Son **épigraphe** est convexe |
| Sous-niveaux convexes implique convexe ? | **Non** — seulement quasiconvexe ($-e^x$) |
| Inégalité de Jensen ? | $f(\mathbb{E}x)\leq\mathbb{E}f(x)$ — elle caractérise la convexité |
| Les quatre règles de composition ? | $h$ convexe croissante $\circ$ $g$ convexe ; convexe décroissante $\circ$ concave ; et les deux duales pour la concavité |
| Composition affine ? | $f(Ax+b)$ convexe si $f$ l'est — sans condition de monotonie |
| Sup ponctuel de convexes ? | Convexe — intersection des épigraphes |
| Minimisation partielle ? | $\inf_yf(x,y)$ convexe si $f$ convexe **conjointement** en $(x,y)$ |
| Perspective d'une fonction ? | $g(x,t)=tf(x/t)$, $t>0$ — préserve la convexité |
| Conjuguée ? | $f^\star(y)=\sup_x(y^Tx-f(x))$ — **toujours** convexe |
| Inégalité de Fenchel ? | $f(x)+f^\star(y)\geq x^Ty$ |
| $\lambda_{\max}(X)$ est ? | Convexe — sup de $y^TXy$ sur $\\|y\\|_2=1$, donc de linéaires |
| $\log\det X$ est ? | **Concave** sur $\mathbf{S}^n_{++}$ |
| Moyenne géométrique ? | **Concave** sur $\mathbb{R}^n_{++}$ |
| Quasiconvexe ? | Tous les sous-niveaux sont convexes |
| Condition du premier ordre quasiconvexe ? | $f(y)\leq f(x)\Rightarrow\nabla f(x)^T(y-x)\leq0$ |
