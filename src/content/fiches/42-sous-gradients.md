# Fiche 42 — Sous-gradients et sous-différentiel

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Boyd, Duchi, Pilanci & Vandenberghe, *Subgradients* — notes pour EE364b, Stanford, printemps 2021-22 |
| **Difficulté** | Must know — la porte d'entrée de tout l'optimisation non lisse |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiche 35 (condition du premier ordre, épigraphe), fiche 34 (hyperplan d'appui) |
| **Concepts clés** | Sous-gradient, sous-différentiel, existence, condition d'optimalité $0\in\partial f(x^\star)$, dérivée directionnelle, calcul faible et fort, maximum ponctuel, minimisation partielle |
| **Poids à l'examen** | Deux compétences : **calculer** un sous-différentiel (valeur absolue, norme 1, maximum, $\lambda_{\max}$) et **énoncer la condition d'optimalité** $0\in\partial f(x^\star)$, avec sa version contrainte. |

## 🎯 Vue d'ensemble

Toutes les méthodes vues jusqu'ici supposent $f$ **dérivable**. Or les objectifs les plus utiles ne le sont pas : $\|x\|_1$ (parcimonie), $\max_i(a_i^Tx+b_i)$ (pire cas), $\lambda_{\max}(A(x))$ (spectral), la perte charnière (classification). Le **sous-gradient** étend le gradient à ces fonctions, sans rien perdre de l'essentiel.

```
GRADIENT      ∇f(x)  →  UNE tangente, sous la courbe
SOUS-GRADIENT g      →  UNE des tangentes possibles, toutes sous la courbe
SOUS-DIFFÉRENTIEL ∂f(x) = l'ENSEMBLE de ces g  →  convexe, fermé
OPTIMALITÉ    ∇f(x*) = 0   devient   0 ∈ ∂f(x*)
```

Le prix à payer : $\partial f(x)$ est un **ensemble**, pas un vecteur, et $-g$ n'est plus nécessairement une direction de descente. C'est ce qui rendra les algorithmes du chapitre suivant (fiche 43) fondamentalement plus lents.

## 🔴 Concept 1 — Définition et interprétations

**Définition.** Un vecteur $g\in\mathbb{R}^n$ est un **sous-gradient** de $f:\mathbb{R}^n\to\mathbb{R}$ en $x\in\mathbf{dom}\,f$ si, pour tout $z\in\mathbf{dom}\,f$ :

$$f(z) \geq f(x) + g^T(z-x) \tag{1}$$

**Trois lectures.**

1. **Minorant affine global** : la fonction affine $z\mapsto f(x)+g^T(z-x)$ minore $f$ **partout**, avec égalité en $x$.
2. **Hyperplan d'appui** : $g$ est un sous-gradient en $x$ si et seulement si $(g,-1)$ définit un hyperplan d'appui à $\mathbf{epi}\,f$ au point $(x,f(x))$ — exactement la lecture géométrique de la fiche 35, mais sans exiger la différentiabilité.
3. **Généralisation du gradient** : si $f$ est convexe et dérivable, $\nabla f(x)$ **est** un sous-gradient (c'est la condition du premier ordre).

**Sous-différentiel.** L'ensemble des sous-gradients de $f$ en $x$ :

$$\partial f(x) = \{g \mid f(z)\geq f(x)+g^T(z-x)\ \ \forall z\in\mathbf{dom}\,f\}$$

$f$ est **sous-différentiable** en $x$ si $\partial f(x)\neq\emptyset$.

**Exemple fondateur — la valeur absolue.** Pour $f(z)=|z|$ :

$$\partial f(x) = \begin{cases}\{-1\} & x<0\\ [-1,\ 1] & x=0\\ \{1\} & x>0\end{cases}$$

En $x=0$, la condition $|z|\geq gz$ pour tout $z$ équivaut à $g\in[-1,1]$. **Le sous-différentiel est un intervalle : toutes les pentes des droites passant sous la courbe.**

## 🟠 Concept 2 — Propriétés de base

**$\partial f(x)$ est toujours un ensemble convexe fermé**, même si $f$ n'est pas convexe. En effet, c'est une **intersection de demi-espaces** :

$$\partial f(x) = \bigcap_{z\in\mathbf{dom}\,f}\{g \mid f(z)\geq f(x)+g^T(z-x)\}$$

— chacune de ces conditions étant linéaire en $g$ (fiche 34).

**Bornitude.** Si $f$ est **continue** en $x$, alors $\partial f(x)$ est **borné**. *Preuve par l'absurde :* si $\partial f(x)$ était non borné, il existerait $g_n\in\partial f(x)$ avec $\|g_n\|_2\to\infty$ ; en prenant $y_n = x+\epsilon g_n/\|g_n\|_2$,

$$f(y_n)\geq f(x)+g_n^T(y_n-x) = f(x)+\epsilon\|g_n\|_2 \to\infty$$

ce qui contredit la bornitude de $f$ au voisinage de $x$.

**Existence (§2.1).** Si $f$ est **convexe** et $x\in\mathbf{int}\,\mathbf{dom}\,f$, alors $\partial f(x)$ est **non vide et borné**.

*Démonstration.* On applique le **théorème de l'hyperplan d'appui** (fiche 34) à l'ensemble convexe $\mathbf{epi}\,f$ au point du bord $(x,f(x))$ : il existe $(a,b)\neq0$ tel que

$$a^T(z-x) + b\,(t-f(x)) \leq 0 \qquad \forall (z,t)\in\mathbf{epi}\,f$$

Cela impose $b\leq0$. Si $b\neq0$, on divise par $|b|$ et l'on obtient $f(z)\geq f(x)-(a/b)^T(z-x)$, c'est-à-dire $-a/b\in\partial f(x)$. Reste à exclure $b=0$ : on aurait alors $a^T(z-x)\leq0$ pour tout $z\in\mathbf{dom}\,f$, ce qui est **impossible** si $x$ est **intérieur** au domaine. $\blacksquare$

> **Le mot clé est « non vertical ».** Une fonction convexe admet un sous-gradient en $x$ dès qu'il existe un hyperplan d'appui **non vertical** à son épigraphe en $(x,f(x))$. Aux points du bord du domaine, l'hyperplan d'appui peut être vertical, et le sous-différentiel vide.

**Cas dérivable (§2.2).** Si $f$ est convexe et **dérivable** en $x$, alors $\partial f(x)=\{\nabla f(x)\}$ : le gradient est **l'unique** sous-gradient. **Réciproquement**, si $f$ est convexe et $\partial f(x)=\{g\}$ est un singleton, alors $f$ est dérivable en $x$ et $g=\nabla f(x)$.

> **L'équivalence est totale : « dérivable » = « sous-différentiel réduit à un point ».** C'est la meilleure façon de retenir le lien entre les deux notions.

## 🔴 Concept 3 — La condition d'optimalité

**Sans contrainte (§2.3).** Un point $x^\star$ minimise $f$ (convexe ou non !) **si et seulement si** $f$ est sous-différentiable en $x^\star$ et

$$\boxed{\ 0 \in \partial f(x^\star)\ }$$

*Démonstration, immédiate dans les deux sens.* Si $x^\star$ est un minimiseur, $f(x)\geq f(x^\star) = f(x^\star)+0^T(x-x^\star)$ pour tout $x$ : le vecteur nul vérifie la définition (1). Réciproquement, si $0\in\partial f(x^\star)$, la même inégalité donne $f(x)\geq f(x^\star)$ pour tout $x$. $\blacksquare$

⚠️ Cette caractérisation vaut pour des fonctions **non convexes**, mais elle n'y est pas utile : on ne sait généralement pas calculer le sous-différentiel d'une fonction non convexe. Et pour $f$ convexe **dérivable**, elle se réduit à $\nabla f(x^\star)=0$.

**Avec contraintes (§2.5).** Pour minimiser $f$ sur un **convexe fermé** $X$, $x^\star$ est optimal **si et seulement s'il existe** un sous-gradient $g\in\partial f(x^\star)$ tel que

$$g^T(y-x^\star)\geq0 \qquad \forall y\in X$$

**Comparez avec la fiche 36.** Le critère différentiable était $\nabla f_0(x^\star)^T(y-x^\star)\geq0$ pour tout $y$ admissible. Ici, il ne suffit **pas** que l'inégalité vaille pour un $g$ quelconque : il faut qu'**il existe** un sous-gradient qui la satisfasse. La quantification change, et c'est essentiel.

*Le sens facile :* si un tel $g$ existe, alors pour $x\in X$, $f(x)\geq f(x^\star)+g^T(x-x^\star)\geq f(x^\star)$. *Le sens difficile* passe par la dérivée directionnelle et un échange min-max, licite parce que $\partial f(x^\star)$ est **borné**.

## 🟠 Concept 4 — Dérivée directionnelle (§2.4)

Pour $f$ convexe, la **dérivée directionnelle** en $x$ dans la direction $v$ est

$$f'(x;v) = \lim_{t\downarrow0}\frac{f(x+tv)-f(x)}{t}$$

**Cette limite existe toujours** pour $f$ convexe (éventuellement $\pm\infty$), car le rapport est **croissant en $t$**. La preuve tient en une ligne de convexité : pour $0<t_1\leq t_2$,

$$f(x+t_1v) = f\Big(\tfrac{t_1}{t_2}(x+t_2v)+\big(1-\tfrac{t_1}{t_2}\big)x\Big) \leq \tfrac{t_1}{t_2}f(x+t_2v)+\big(1-\tfrac{t_1}{t_2}\big)f(x)$$

d'où, après réarrangement, $\dfrac{f(x+t_1v)-f(x)}{t_1}\leq\dfrac{f(x+t_2v)-f(x)}{t_2}$.

**Le lien avec le sous-différentiel :**

$$f'(x;v) = \sup_{g\in\partial f(x)} g^Tv$$

La dérivée directionnelle est la **fonction d'appui** du sous-différentiel (fiche 35, exemple 3.7).

> **Conséquence.** $v$ est une direction de descente si et seulement si $f'(x;v)<0$, c'est-à-dire si **tous** les sous-gradients font un angle obtus avec $v$. Il ne suffit **pas** qu'un seul le fasse — d'où le fait, capital pour la fiche 43, que $-g$ n'est pas nécessairement une direction de descente.

## 🔴 Concept 5 — Le calcul des sous-gradients (§3)

Les notes distinguent **deux niveaux**, et cette distinction est structurante :

| Calcul | But | Usage |
|---|---|---|
| **faible** | produire **un** sous-gradient, même s'il en existe d'autres | suffit en pratique : les méthodes de sous-gradient, de localisation et de plans sécants n'en demandent qu'**un** |
| **fort** | décrire **tout** l'ensemble $\partial f(x)$ | théorie, conditions d'optimalité précises |

**Les règles.**

| Opération | Règle (calcul fort) |
|---|---|
| Multiplication positive | $\partial(\alpha f)(x) = \alpha\,\partial f(x)$, $\alpha\geq0$ |
| **Somme** | $\partial(f_1+\dots+f_m)(x) = \partial f_1(x)+\dots+\partial f_m(x)$ (somme d'ensembles) |
| **Composition affine** | $h(x)=f(Ax+b)$ $\Rightarrow$ $\partial h(x) = A^T\partial f(Ax+b)$ |
| **Maximum ponctuel** | $\partial f(x) = \mathbf{Co}\bigcup\{\partial f_i(x) \mid f_i(x)=f(x)\}$ |
| **Supremum** (index compact, s.c.s.) | $\partial f(x) = \mathbf{Co}\bigcup\{\partial f_\alpha(x)\mid f_\alpha(x)=f(x)\}$ |
| **Minimisation partielle** | $\partial f(x) = \{g \mid (g,0)\in\partial F(x,y)$ pour un $y\in Y_x\}$ |

**La règle du maximum, en version faible — celle qu'on utilise.** Soit $f = \max_i f_i$. Choisir **un** indice $k$ **actif** ($f_k(x)=f(x)$) et **un** sous-gradient $g\in\partial f_k(x)$ : alors $g\in\partial f(x)$. La preuve tient en une ligne :

$$f(z)\geq f_k(z)\geq f_k(x)+g^T(z-x) = f(x)+g^T(z-x)$$

> **En pratique, on ne calcule jamais tout le sous-différentiel.** On identifie une fonction active, on prend son gradient, et c'est terminé. Le calcul **fort** (enveloppe convexe des actifs) ne sert qu'à écrire des conditions d'optimalité exactes.

### Exemple 1 — la norme 1

$$f(x)=\|x\|_1 = \max\{s^Tx \mid s\in\{-1,1\}^n\}$$

C'est un maximum de $2^n$ fonctions **linéaires**. Pour obtenir un sous-gradient, on identifie un $s$ actif :

$$g_i = \begin{cases}+1 & x_i>0\\ -1 & x_i<0\\ +1 \text{ ou } -1 & x_i=0\end{cases}$$

Et le sous-différentiel complet est

$$\partial\|x\|_1 = \{g \mid \|g\|_\infty\leq1,\ g^Tx = \|x\|_1\}$$

> **C'est la formule qui fonde le LASSO.** La condition d'optimalité $0\in\partial(\tfrac12\|Ax-b\|_2^2+\lambda\|x\|_1)$ s'écrit $A^T(b-Ax) \in \lambda\,\partial\|x\|_1$, c'est-à-dire $|(A^T(b-Ax))_i|\leq\lambda$ avec **égalité et signe imposé** dès que $x_i\neq0$. C'est cette « marge » sur les coordonnées nulles qui produit la **parcimonie**.

### Exemple 2 — la plus grande valeur propre

Soit $f(x)=\lambda_{\max}(A(x))$ avec $A(x)=A_0+x_1A_1+\dots+x_nA_n$, $A_i\in\mathbf{S}^m$. On l'écrit en supremum (fiche 35) :

$$f(x) = \sup_{\|y\|_2=1} y^TA(x)y$$

Chaque $f_y(x)=y^TA(x)y$ est **affine en $x$** :

$$y^TA(x)y = y^TA_0y + x_1y^TA_1y+\dots+x_ny^TA_ny$$

donc dérivable, de gradient $\big(y^TA_1y,\dots,y^TA_ny\big)$. Les fonctions **actives** sont celles associées aux **vecteurs propres de la plus grande valeur propre**. D'où la recette :

> **Pour obtenir un sous-gradient de $\lambda_{\max}(A(x))$ :** calculer un vecteur propre unitaire $y$ associé à $\lambda_{\max}(A(x))$, et prendre
>
> $$g = \big(y^TA_1y,\ y^TA_2y,\ \dots,\ y^TA_ny\big)$$
>
> L'ensemble d'indices $\{y \mid \|y\|_2=1\}$ étant **compact**, le sous-différentiel complet est l'enveloppe convexe des $g$ obtenus sur tous les vecteurs propres dominants.

### Comment résoudre l'exercice type (protocole)

1. **Repérer la non-différentiabilité** : valeur absolue, $\max$, norme 1 ou infinie, valeur propre.
2. **Écrire $f$ comme un maximum ou un supremum** de fonctions plus simples — c'est presque toujours possible.
3. **Identifier les fonctions actives** au point considéré.
4. **Calcul faible** (le cas usuel) : prendre **une** active, calculer son gradient, c'est un sous-gradient.
5. **Calcul fort** (si l'énoncé le demande) : enveloppe convexe des sous-différentiels actifs.
6. **Composer** si nécessaire : somme (somme d'ensembles), composition affine ($A^T\partial f$), multiplication positive.
7. **Pour l'optimalité** : écrire $0\in\partial f(x^\star)$, ou la version contrainte $\exists g\in\partial f(x^\star)$, $g^T(y-x^\star)\geq0$ sur $X$.

### Exercices progressifs

**Niveau 1** — Calculez $\partial f(0)$ pour $f(x)=\max\{x,\ -2x\}$ sur $\mathbb{R}$.

<details><summary>Correction</summary>

Les deux fonctions $f_1(x)=x$ et $f_2(x)=-2x$ sont **actives** en $0$ (elles y valent toutes deux $0$), de gradients $1$ et $-2$. Par la règle du maximum,

$$\partial f(0) = \mathbf{Co}\{1,\ -2\} = [-2,\ 1]$$

*Contrôle :* $0\in[-2,1]$, donc $x=0$ est bien le minimiseur — ce qui est évident puisque $f\geq0$ avec égalité en $0$.

</details>

**Niveau 2** — Donnez un sous-gradient de $f(x)=\|Ax-b\|_1$ en un point $x$.

<details><summary>Correction</summary>

Composition affine : avec $h(u)=\|u\|_1$ et $u=Ax-b$, la règle donne

$$\partial f(x) = A^T\,\partial h(Ax-b)$$

Un sous-gradient explicite : poser $s_i = \mathbf{sign}\big((Ax-b)_i\big)$ (n'importe quelle valeur de $[-1,1]$ si la composante est nulle), puis

$$g = A^Ts$$

*Cas particulier utile :* si aucune composante du résidu n'est nulle, $f$ est **dérivable** en $x$ et $g$ est le gradient.

</details>

**Niveau 3** — Montrez que si $f$ est convexe et $\partial f(x)$ est réduit à un point, alors $f$ est dérivable en $x$.

<details><summary>Correction</summary>

C'est le sens réciproque du §2.2. L'argument passe par la dérivée directionnelle : pour $f$ convexe,

$$f'(x;v) = \sup_{g\in\partial f(x)}g^Tv$$

Si $\partial f(x)=\{g_0\}$, alors $f'(x;v)=g_0^Tv$ pour **toute** direction $v$ : la dérivée directionnelle est **linéaire** en $v$. En particulier $f'(x;v) = -f'(x;-v)$, ce qui signifie que les dérivées à droite et à gauche coïncident dans chaque direction. Une fonction convexe dont la dérivée directionnelle est linéaire est **différentiable**, de gradient $g_0$. $\blacksquare$

**La lecture à retenir :** un sous-différentiel « épais » mesure exactement l'écart à la différentiabilité, et sa **taille** est la largeur de l'angle formé par le graphe au point anguleux.

</details>

**Niveau 4 — type examen** — Écrivez la condition d'optimalité du LASSO $\min_x\ \tfrac12\|Ax-b\|_2^2+\lambda\|x\|_1$ et expliquez d'où vient la parcimonie.

<details><summary>Correction</summary>

**Étape 1 — somme.** Par la règle de la somme, avec le premier terme **dérivable** :

$$\partial f(x) = \{A^T(Ax-b)\} + \lambda\,\partial\|x\|_1$$

**Étape 2 — condition d'optimalité.** $0\in\partial f(x^\star)$ équivaut à

$$A^T(b-Ax^\star) \in \lambda\,\partial\|x^\star\|_1$$

**Étape 3 — expliciter, coordonnée par coordonnée.** En notant $c = A^T(b-Ax^\star)$ le **résidu corrélé** et en utilisant $\partial\|x\|_1$ de l'exemple 1 :

$$\begin{cases} c_i = \lambda\,\mathbf{sign}(x_i^\star) & \text{si } x_i^\star\neq0\\ |c_i| \leq \lambda & \text{si } x_i^\star = 0\end{cases}$$

**Étape 4 — d'où vient la parcimonie.** Sur les coordonnées **non nulles**, la condition est une **égalité** : elle détermine $x_i^\star$. Sur les coordonnées **nulles**, c'est une **inégalité large** : il y a une **marge** de manœuvre de largeur $2\lambda$. Une coordonnée peut donc rester exactement à zéro sur tout un intervalle de valeurs de $c_i$ — et c'est **stable** : une petite perturbation des données ne la fait pas bouger.

**Comparaison avec la régularisation en norme 2.** Avec $\lambda\|x\|_2^2$, le terme est dérivable et la condition devient $A^T(b-Ax^\star)=2\lambda x^\star$ : une **égalité partout**, qui ne s'annule que pour une valeur exacte de $c_i$ — événement de mesure nulle. Aucune coordonnée n'est jamais **exactement** nulle.

**La morale :** la parcimonie du LASSO ne vient pas d'une astuce numérique mais de la **géométrie du sous-différentiel** de $\|\cdot\|_1$, qui est un ensemble **épais** ($[-1,1]$) précisément là où la coordonnée s'annule.

</details>

## 🔴 Common mistakes

1. **Traiter $\partial f(x)$ comme un vecteur** — c'est un **ensemble** ; on écrit $g\in\partial f(x)$, jamais $g=\partial f(x)$.
2. **Croire que $-g$ est une direction de descente** — c'est faux dès que $f$ n'est pas dérivable en $x$ ; il faut $f'(x;v)<0$, c'est-à-dire que **tous** les sous-gradients s'opposent à $v$.
3. **Se tromper de quantificateur dans la condition contrainte** — il faut qu'**il existe** $g\in\partial f(x^\star)$ avec $g^T(y-x^\star)\geq0$, pas que **tout** $g$ le vérifie.
4. **Oublier que le sous-différentiel peut être vide** — au bord du domaine, l'hyperplan d'appui peut être **vertical**.
5. **Calculer le sous-différentiel complet quand un seul sous-gradient suffit** — le calcul **faible** est bien plus rapide et suffit à tous les algorithmes.
6. **Prendre une fonction non active dans la règle du maximum** — seules les $f_i$ **atteignant** le maximum au point considéré comptent.
7. **Oublier l'enveloppe convexe** dans la version forte de la règle du maximum — l'union des sous-différentiels actifs n'est pas convexe en général.
8. **Confondre sous-gradient et gradient d'une approximation lisse** — le sous-gradient est exact ; le lissage (fiche 35, log-sum-exp) est une autre stratégie.

## 📌 Ultimate Review

1. **Sous-gradient** : $f(z)\geq f(x)+g^T(z-x)$ pour tout $z$ — un **minorant affine global**, exact en $x$.
2. Géométrie : $(g,-1)$ définit un hyperplan d'appui **non vertical** à $\mathbf{epi}\,f$ en $(x,f(x))$.
3. **Sous-différentiel** $\partial f(x)$ : toujours **convexe fermé** (intersection de demi-espaces) ; **borné** si $f$ est continue en $x$.
4. **Existence** : $f$ convexe et $x\in\mathbf{int}\,\mathbf{dom}\,f$ $\Rightarrow$ $\partial f(x)$ non vide et borné (par le théorème d'appui).
5. $f$ dérivable en $x$ $\iff$ $\partial f(x)$ est un **singleton**, et alors $\partial f(x)=\{\nabla f(x)\}$.
6. **Optimalité** : $0\in\partial f(x^\star)$ ; version contrainte sur $X$ convexe : **il existe** $g\in\partial f(x^\star)$ avec $g^T(y-x^\star)\geq0$ sur $X$.
7. **Dérivée directionnelle** : existe toujours pour $f$ convexe (rapport croissant en $t$) et vaut $f'(x;v)=\sup_{g\in\partial f(x)}g^Tv$.
8. **Calcul** : somme (somme d'ensembles), composition affine ($A^T\partial f$), multiplication positive, **maximum** (enveloppe convexe des actifs), minimisation partielle.
9. **Calcul faible contre fort** : un seul sous-gradient suffit aux algorithmes ; l'ensemble complet sert à la théorie.
10. $\partial\|x\|_1 = \{g\mid\|g\|_\infty\leq1,\ g^Tx=\|x\|_1\}$ ; sous-gradient de $\lambda_{\max}(A(x))$ : $g_i = y^TA_iy$ pour $y$ vecteur propre dominant unitaire.

**Formulas to know**

$$f(z)\geq f(x)+g^T(z-x) \qquad 0\in\partial f(x^\star) \qquad f'(x;v)=\sup_{g\in\partial f(x)}g^Tv$$

$$\partial(f_1+f_2) = \partial f_1+\partial f_2 \qquad \partial\big(f(Ax+b)\big)=A^T\partial f(Ax+b) \qquad \partial\max_i f_i(x)=\mathbf{Co}\bigcup_{i \text{ actif}}\partial f_i(x)$$

**Methods to know** : le protocole en 7 étapes ; la règle faible du maximum ; le calcul de $\partial\|x\|_1$ et du sous-gradient de $\lambda_{\max}$.

## 🧠 Active Recall

**Basic** — Définissez un sous-gradient et donnez son interprétation géométrique.

<details><summary>Réponse</summary>

$g$ est un sous-gradient de $f$ en $x$ si $f(z)\geq f(x)+g^T(z-x)$ pour tout $z\in\mathbf{dom}\,f$ : la fonction affine associée est un **minorant global** de $f$, exact en $x$. Géométriquement, $(g,-1)$ définit un **hyperplan d'appui** à l'épigraphe de $f$ au point $(x,f(x))$.

</details>

**Understanding** — Pourquoi $\partial f(x)$ est-il toujours convexe et fermé ?

<details><summary>Réponse</summary>

Parce que c'est une **intersection de demi-espaces** :

$$\partial f(x) = \bigcap_{z\in\mathbf{dom}\,f}\{g \mid g^T(z-x)\leq f(z)-f(x)\}$$

Chaque condition est une inégalité **linéaire en $g$**, donc définit un demi-espace fermé ; une intersection quelconque de convexes fermés est convexe fermée (fiche 34). Ce raisonnement ne suppose **pas** $f$ convexe.

</details>

**Application** — Donnez $\partial f(x)$ pour $f(x)=\|x\|_1$ en $x=(2,\,0,\,-1)$.

<details><summary>Réponse</summary>

Coordonnée par coordonnée : $x_1=2>0$ impose $g_1=1$ ; $x_3=-1<0$ impose $g_3=-1$ ; $x_2=0$ laisse $g_2$ libre dans $[-1,1]$. Donc

$$\partial f(x) = \{1\}\times[-1,1]\times\{-1\}$$

On vérifie la formule générale : $\|g\|_\infty\leq1$ et $g^Tx = 2+0+1 = 3 = \|x\|_1$ .

</details>

**Comparison** — Condition d'optimalité sans contrainte et avec contrainte : quelle différence essentielle ?

<details><summary>Réponse</summary>

*Sans contrainte* : $0\in\partial f(x^\star)$ — le vecteur nul doit **appartenir** au sous-différentiel. *Sur un convexe fermé $X$* : **il existe** $g\in\partial f(x^\star)$ tel que $g^T(y-x^\star)\geq0$ pour tout $y\in X$.

La différence essentielle est le **quantificateur existentiel** : il suffit qu'un sous-gradient « pointe vers l'extérieur » de $X$. Sans contrainte, $X=\mathbb{R}^n$ et la condition force $g=0$, donc $0\in\partial f(x^\star)$ — on retrouve le premier cas.

</details>

**Exam-style** — Comment obtient-on un sous-gradient de $f(x)=\max_{i}(a_i^Tx+b_i)$, et quel est le sous-différentiel complet ?

<details><summary>Réponse</summary>

*Calcul faible.* Identifier un indice **actif** $k$, c'est-à-dire tel que $a_k^Tx+b_k = f(x)$, et prendre $g = a_k$. En effet

$$f(z)\geq a_k^Tz+b_k = a_k^Tx+b_k+a_k^T(z-x) = f(x)+g^T(z-x)$$

*Calcul fort.* $\partial f(x) = \mathbf{Co}\{a_i \mid a_i^Tx+b_i = f(x)\}$ — l'enveloppe convexe des $a_i$ **actifs**. Là où un seul indice est actif, $f$ est **dérivable** de gradient $a_k$ ; là où plusieurs le sont, $\partial f(x)$ est un **polyèdre**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Sous-gradient ? | $g$ tel que $f(z)\geq f(x)+g^T(z-x)$ pour tout $z$ |
| Interprétation géométrique ? | $(g,-1)$ définit un hyperplan d'appui à $\mathbf{epi}\,f$ en $(x,f(x))$ |
| Sous-différentiel ? | $\partial f(x)$, l'**ensemble** des sous-gradients |
| Nature de $\partial f(x)$ ? | Convexe **fermé** — intersection de demi-espaces |
| Quand est-il non vide et borné ? | $f$ convexe et $x\in\mathbf{int}\,\mathbf{dom}\,f$ |
| $\partial f(x)$ singleton signifie ? | $f$ est **dérivable** en $x$, et $\partial f(x)=\{\nabla f(x)\}$ |
| $\partial\|x\|$ en $0$ ? | $[-1,\ 1]$ |
| Condition d'optimalité ? | $0\in\partial f(x^\star)$ |
| Version contrainte sur $X$ ? | **Il existe** $g\in\partial f(x^\star)$ avec $g^T(y-x^\star)\geq0$ sur $X$ |
| Dérivée directionnelle ? | $f'(x;v)=\sup_{g\in\partial f(x)}g^Tv$ |
| Règle de la somme ? | $\partial(f_1+f_2)=\partial f_1+\partial f_2$ (somme d'ensembles) |
| Règle affine ? | $\partial f(Ax+b) \to A^T\partial f(Ax+b)$ |
| Règle du maximum (faible) ? | Prendre un sous-gradient d'une fonction **active** |
| Règle du maximum (forte) ? | Enveloppe convexe des sous-différentiels actifs |
| $\partial\\|x\\|_1$ ? | $\{g\mid\\|g\\|_\infty\leq1,\ g^Tx=\\|x\\|_1\}$ |
| Sous-gradient de $\lambda_{\max}(A(x))$ ? | $g_i=y^TA_iy$, $y$ vecteur propre dominant unitaire |
| $-g$ est-il une direction de descente ? | **Pas nécessairement** — c'est la difficulté centrale du non lisse |
