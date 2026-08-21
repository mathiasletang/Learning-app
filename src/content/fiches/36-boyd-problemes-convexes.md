# Fiche 36 — Problèmes d'optimisation convexe (Boyd, §4.1–4.2)

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Boyd & Vandenberghe, *Convex Optimization*, §4.1 « Optimization problems » et §4.2 « Convex optimization », p. 127–146 |
| **Difficulté** | Must know — c'est ici que le vocabulaire du domaine se fixe |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 34 et 35 (ensembles et fonctions convexes) |
| **Concepts clés** | Forme standard, admissibilité, valeur optimale, optimum local et global, contraintes actives, problèmes équivalents, critère d'optimalité du premier ordre, optimisation quasiconvexe |
| **Poids à l'examen** | Deux choses s'évaluent : **mettre un problème en forme standard convexe** (et détecter ce qui l'empêche), et **appliquer le critère d'optimalité** $\nabla f_0(x^\star)^T(y-x^\star)\geq0$. C'est aussi la fiche qui prépare toute la dualité. |

## 🎯 Vue d'ensemble

Un problème d'optimisation convexe n'est pas seulement « un problème dont les données sont convexes » : c'est un problème **écrit** d'une certaine façon. Boyd insiste sur ce point, et c'est la source de la moitié des erreurs du chapitre.

```
FORME STANDARD    min f₀(x)  s.c.  fᵢ(x) ≤ 0,  hᵢ(x) = 0
CONVEXE si :      f₀ convexe,  fᵢ convexes,  hᵢ AFFINES
                                              ↑ trois exigences, pas deux
```

Deux résultats en découlent, et ils justifient tout le reste du livre :

1. **tout optimum local est global** — il n'y a rien à comparer, rien dont on puisse rester prisonnier ;
2. **un critère d'optimalité du premier ordre** entièrement calculable, qui se spécialise en $\nabla f_0(x^\star)=0$ dans le cas sans contrainte.

## 🟡 Concept 1 — La forme standard et son vocabulaire

$$\begin{array}{ll}\text{minimiser} & f_0(x)\\ \text{sous} & f_i(x)\leq0, \quad i=1,\dots,m\\ & h_i(x) = 0, \quad i=1,\dots,p\end{array} \tag{4.1}$$

| Terme | Définition |
|---|---|
| **variable d'optimisation** | $x\in\mathbb{R}^n$ |
| **fonction objectif** (ou de coût) | $f_0:\mathbb{R}^n\to\mathbb{R}$ |
| **contraintes d'inégalité** | $f_i(x)\leq0$ |
| **contraintes d'égalité** | $h_i(x)=0$ |
| **problème sans contrainte** | $m=p=0$ |
| **domaine** $\mathcal{D}$ | $\bigcap_{i=0}^m\mathbf{dom}\,f_i \cap \bigcap_{i=1}^p\mathbf{dom}\,h_i$ |
| $x$ **admissible** | $x\in\mathcal{D}$ et satisfait toutes les contraintes |
| problème **admissible** | il existe au moins un point admissible |
| **valeur optimale** $p^\star$ | $\inf\{f_0(x)\mid x \text{ admissible}\}$ |

**Conventions sur $p^\star$.** Si le problème est **non admissible**, $p^\star=+\infty$ (l'infimum de l'ensemble vide). S'il existe des $x_k$ admissibles avec $f_0(x_k)\to-\infty$, alors $p^\star=-\infty$ et le problème est dit **non minoré**.

**Points optimaux.** $x^\star$ est **optimal** s'il est admissible et $f_0(x^\star)=p^\star$ ; l'ensemble des points optimaux est $X_{\text{opt}}$. Si $X_{\text{opt}}\neq\emptyset$, la valeur optimale est **atteinte** et le problème est **soluble**. Un point admissible $x$ avec $f_0(x)\leq p^\star+\varepsilon$ est dit **$\varepsilon$-sous-optimal**.

**Optimalité locale.** $x$ admissible est **localement optimal** s'il existe $R>0$ tel que

$$f_0(x) = \inf\{f_0(z) \mid z \text{ admissible},\ \|z-x\|_2\leq R\}$$

*Dans tout le livre, « optimal » signifie **globalement** optimal.*

**Contraintes.** $f_i(x)\leq0$ est **active** en $x$ si $f_i(x)=0$, **inactive** si $f_i(x)<0$. Les contraintes d'égalité sont actives en **tout** point admissible. Une contrainte est **redondante** si la supprimer ne change pas l'ensemble admissible.

*Exemple 4.1 — trois problèmes sans contrainte sur $\mathbf{dom}\,f_0=\mathbb{R}_{++}$.*

| $f_0(x)$ | $p^\star$ | Commentaire |
|---|---|---|
| $1/x$ | $0$ | **non atteinte** — l'infimum existe, le minimum non |
| $-\log x$ | $-\infty$ | problème **non minoré** |
| $x\log x$ | $-1/e$ | atteinte en l'unique point $x^\star = 1/e$ |

⚠️ Les trois cas sont différents et il faut les nommer correctement : valeur optimale **non atteinte**, problème **non minoré**, problème **soluble**.

**Problème de faisabilité.** Si $f_0\equiv0$, la valeur optimale vaut $0$ (ensemble admissible non vide) ou $+\infty$ (vide). On écrit alors

$$\text{trouver } x \quad\text{s.c.}\quad f_i(x)\leq0,\ h_i(x)=0$$

Il s'agit de déterminer si les contraintes sont **compatibles**, et le cas échéant d'en exhiber une solution.

**Mise en forme standard.** Les seconds membres sont **toujours** nuls : $g_i(x)=\tilde g_i(x)$ devient $h_i(x)=g_i(x)-\tilde g_i(x)=0$, et $f_i(x)\geq0$ devient $-f_i(x)\leq0$.

*Exemple 4.2 — contraintes de boîte.* $l_i\leq x_i\leq u_i$ s'écrit en $2n$ contraintes d'inégalité : $l_i-x_i\leq0$ et $x_i-u_i\leq0$.

**Maximisation.** On maximise $f_0$ en minimisant $-f_0$ ; l'objectif s'appelle alors **utilité** ou niveau de **satisfaction** plutôt que coût, et $x$ est $\varepsilon$-sous-optimal si $f_0(x)\geq p^\star-\varepsilon$.

## 🟠 Concept 2 — Problèmes équivalents (§4.1.3)

Deux problèmes sont **équivalents** si, de la solution de l'un, on tire immédiatement celle de l'autre — et réciproquement. Ce n'est **pas** l'égalité des problèmes : les fonctions peuvent différer.

**Mise à l'échelle.** Multiplier $f_0$ et les $f_i$ par des constantes $\alpha_i>0$ et les $h_i$ par des $\beta_i\neq0$ donne un problème équivalent : l'ensemble admissible est **identique**, et les points optimaux aussi.

**Changement de variable.** Si $\phi$ est injective d'image couvrant $\mathcal{D}$, poser $x=\phi(z)$ et $\tilde f_i = f_i\circ\phi$, $\tilde h_i=h_i\circ\phi$ donne un problème équivalent : $x^\star$ optimal $\iff z^\star=\phi^{-1}(x^\star)$ optimal.

**Transformation des fonctions.** Si $\psi_0$ est **croissante**, si $\psi_i(u)\leq0\iff u\leq0$ pour $i=1,\dots,m$, et si $\psi_{m+i}(u)=0\iff u=0$, alors remplacer $f_i$ par $\psi_i\circ f_i$ et $h_i$ par $\psi_{m+i}\circ h_i$ donne un problème équivalent.

> **L'exemple qui sert tout le temps.** Minimiser $\|Ax-b\|_2$ et minimiser $\|Ax-b\|_2^2$ sont **équivalents** ($\psi_0(u)=u^2$ est croissante sur $\mathbb{R}_+$) — mais la seconde est dérivable partout et convexe quadratique. Choisir la bonne écriture est la moitié du travail de modélisation.

**Autres transformations classiques du §4.1.3** : introduction de **variables d'écart** ($f_i(x)\leq0$ devient $f_i(x)+s_i=0$, $s_i\geq0$) ; **élimination** de contraintes d'égalité linéaires ; **introduction** de contraintes d'égalité pour découpler ; forme **épigraphe** (minimiser $t$ sous $f_0(x)\leq t$) ; **minimisation partielle** sur une partie des variables.

⚠️ Une transformation équivalente peut **détruire la convexité** si l'on n'y prend pas garde. Le changement de variable $\phi$ doit être compatible, et $\psi_0$ **croissante** : sinon le problème obtenu n'est plus convexe, même si l'ancien l'était.

## 🔴 Concept 3 — Le problème d'optimisation convexe

**Définition (4.15).** Un problème d'optimisation **convexe** est de la forme

$$\begin{array}{ll}\text{minimiser} & f_0(x)\\ \text{sous} & f_i(x)\leq0, \quad i=1,\dots,m\\ & a_i^Tx = b_i, \quad i=1,\dots,p\end{array}$$

avec $f_0,\dots,f_m$ **convexes**. Par rapport à la forme standard générale, il y a **trois** exigences supplémentaires :

1. la fonction objectif doit être **convexe** ;
2. les fonctions de contrainte d'inégalité doivent être **convexes** ;
3. les fonctions de contrainte d'égalité doivent être **affines**.

**Conséquence immédiate.** L'ensemble admissible d'un problème convexe est **convexe** : c'est l'intersection du domaine $\mathcal{D}$ (convexe), de $m$ sous-niveaux de fonctions convexes (convexes) et de $p$ hyperplans (convexes). *On minimise donc une fonction convexe sur un ensemble convexe.*

⚠️ **L'exigence d'affinité des égalités n'est pas négociable.** Une contrainte $h(x)=0$ avec $h$ **convexe non affine** définit un ensemble en général **non convexe** : $\{x\mid h(x)=0\}$ est l'intersection de $\{h\leq0\}$ (convexe) et de $\{h\geq0\}$ (généralement pas). Exemple : $x_1^2+x_2^2=1$ est un cercle, pas un disque.

> **Le point de vocabulaire à retenir.** Un problème peut avoir un ensemble admissible convexe **sans être un problème convexe au sens de Boyd** — parce qu'il n'est pas **écrit** en forme standard convexe. Exemple donné par le livre : $\min\ x_1^2+x_2^2$ sous $x_1/(1+x_2^2)\leq0$, $(x_1+x_2)^2=0$. L'ensemble admissible est $\{x\mid x_1\leq0,\ x_1=-x_2\}$, parfaitement convexe ; mais $f_1$ n'est pas convexe et $h_1$ n'est pas affine. Le problème **n'est pas convexe**, bien qu'il soit **équivalent** à un problème convexe. La convexité est une propriété de l'**écriture**.

## 🔴 Concept 4 — Tout optimum local est global (§4.2.2)

**Propriété fondamentale.** Dans un problème d'optimisation convexe, **tout point localement optimal est globalement optimal**.

**Démonstration (celle de Boyd, à savoir refaire).** Soit $x$ localement optimal : $x$ est admissible et

$$f_0(x) = \inf\{f_0(z) \mid z \text{ admissible},\ \|z-x\|_2\leq R\}$$

pour un $R>0$. Supposons $x$ non globalement optimal : il existe $y$ admissible avec $f_0(y)<f_0(x)$. Nécessairement $\|y-x\|_2>R$ (sinon la définition locale donnerait $f_0(x)\leq f_0(y)$). Posons

$$z = (1-\theta)x + \theta y, \qquad \theta = \frac{R}{2\|y-x\|_2} \in\ ]0,\tfrac12[$$

Alors $\|z-x\|_2 = R/2 < R$, et $z$ est **admissible** par convexité de l'ensemble admissible. Par convexité de $f_0$,

$$f_0(z) \leq (1-\theta)f_0(x)+\theta f_0(y) < f_0(x)$$

ce qui contredit l'optimalité locale de $x$. $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que la preuve exploite.</span>

Deux ingrédients, et deux seulement : la **convexité de l'ensemble admissible** (pour que $z$ soit admissible) et la **convexité de $f_0$** (pour que $f_0(z)<f_0(x)$). C'est exactement pourquoi les trois exigences du concept 3 sont indispensables.

</div>

## 🔴 Concept 5 — Le critère d'optimalité du premier ordre (§4.2.3)

Supposons $f_0$ **dérivable**. Notons $X$ l'ensemble admissible. Alors

$$\boxed{\ x^\star \text{ est optimal} \iff x^\star\in X \ \text{ et } \ \nabla f_0(x^\star)^T(y-x^\star)\geq0 \quad \forall y\in X\ } \tag{4.21}$$

**Interprétation géométrique.** Si $\nabla f_0(x^\star)\neq0$, la condition dit que $-\nabla f_0(x^\star)$ définit un **hyperplan d'appui** à l'ensemble admissible en $x^\star$ : toutes les directions admissibles font un angle **aigu ou droit** avec le gradient, donc aucune ne fait descendre l'objectif.

**Démonstration (celle de Boyd).**

*($\Leftarrow$)* Si $x^\star\in X$ vérifie (4.21), alors pour tout $y\in X$, la condition du premier ordre de la convexité (§3.1.3) donne

$$f_0(y)\geq f_0(x^\star)+\nabla f_0(x^\star)^T(y-x^\star)\geq f_0(x^\star)$$

donc $x^\star$ est optimal.

*($\Rightarrow$)* Si (4.21) échoue, il existe $y\in X$ avec $\nabla f_0(x^\star)^T(y-x^\star)<0$. Le point $z(t)=ty+(1-t)x^\star$ est admissible pour $t\in[0,1]$ (convexité de $X$), et

$$\frac{d}{dt}f_0(z(t))\Big|_{t=0} = \nabla f_0(x^\star)^T(y-x^\star) < 0$$

donc $f_0(z(t))<f_0(x^\star)$ pour $t>0$ petit : $x^\star$ n'est pas optimal. $\blacksquare$

### Les trois spécialisations à connaître

| Problème | Critère (4.21) devient |
|---|---|
| **Sans contrainte** | $\nabla f_0(x^\star) = 0$ |
| **Contraintes d'égalité seules** ($Ax=b$) | $\nabla f_0(x^\star)\perp\mathbf{nullspace}(A)$, c'est-à-dire $\nabla f_0(x^\star) = A^T\nu$ pour un $\nu$ |
| **Orthant positif** ($x\succeq0$) | $x^\star\succeq0$, $\nabla f_0(x^\star)\succeq0$, et $\nabla f_0(x^\star)_i\,x_i^\star = 0$ pour tout $i$ |

**Le troisième cas mérite le détour.** La condition $\nabla f_0(x^\star)^T(y-x^\star)\geq0$ pour tout $y\succeq0$ contient le terme $\nabla f_0(x^\star)^Ty$, linéaire en $y$ et **non minoré** sur $\{y\succeq0\}$ à moins que $\nabla f_0(x^\star)\succeq0$. La condition se réduit alors à $-\nabla f_0(x^\star)^Tx^\star\geq0$ ; comme les deux vecteurs sont positifs, leur produit scalaire l'est aussi, d'où l'**égalité** et la **complémentarité** composante par composante.

> **On vient de retrouver KKT.** Ces conditions — positivité, positivité du gradient, complémentarité — sont exactement celles des fiches 13 et 28. Le chapitre 5 (fiche 38) les obtiendra en toute généralité par la dualité.

## 🟠 Concept 6 — Optimisation quasiconvexe (§4.2.5)

Un problème **quasiconvexe** a la même forme que (4.15) mais avec $f_0$ seulement **quasiconvexe** (les $f_i$ restant convexes, les égalités affines).

⚠️ **La propriété du concept 4 tombe** : un problème quasiconvexe peut avoir des optima **locaux non globaux**. C'est la différence essentielle, et elle justifie une méthode de résolution entièrement différente.

**La méthode : bissection sur la valeur.** On utilise une représentation des sous-niveaux de $f_0$ par une famille de fonctions **convexes** $\phi_t$ (§3.4.5) telles que

$$f_0(x)\leq t \iff \phi_t(x)\leq0$$

avec $\phi_t(x)$ **décroissante en $t$** (si $s\geq t$, alors $\phi_s(x)\leq\phi_t(x)$).

Le problème de **faisabilité convexe**

$$\text{trouver } x \quad\text{s.c.}\quad \phi_t(x)\leq0,\quad f_i(x)\leq0,\quad Ax=b \tag{4.26}$$

tranche alors :

- s'il est **admissible**, alors $p^\star\leq t$ ;
- s'il est **non admissible**, alors $p^\star\geq t$.

**L'algorithme.** Partant d'un encadrement $[l,u]$ de $p^\star$, on teste $t=(l+u)/2$ et l'on remplace $u$ ou $l$ selon le verdict. Chaque itération **divise l'intervalle par deux** ; après $k$ itérations, l'incertitude est $(u-l)/2^k$. Il faut donc

$$\Big\lceil \log_2\frac{u-l}{\varepsilon}\Big\rceil \ \text{ résolutions d'un problème convexe}$$

pour atteindre une précision $\varepsilon$.

> **La leçon.** On ne sait pas minimiser directement une fonction quasiconvexe, mais on sait **tester** si sa valeur optimale dépasse un seuil — et cela suffit. Transformer une optimisation en une suite de problèmes de faisabilité est un schéma qui resservira (méthodes de points intérieurs).

### Comment résoudre l'exercice type (protocole)

1. **Identifier les variables** et écrire l'objectif et toutes les contraintes.
2. **Mettre en forme standard** : seconds membres nuls, $\leq$ pour les inégalités, maximisation transformée en minimisation.
3. **Tester les trois exigences** : $f_0$ convexe ? tous les $f_i$ convexes ? tous les $h_i$ **affines** ?
4. **Si l'une échoue, chercher une écriture équivalente** : changement de variable, transformation croissante de l'objectif, variables d'écart, forme épigraphe.
5. **Vérifier l'admissibilité** et le caractère minoré avant de chercher un optimum.
6. **Appliquer le critère (4.21)** — ou sa spécialisation si le problème est sans contrainte, à égalités seules, ou sur l'orthant.
7. **Conclure** : la solution locale trouvée **est** globale (concept 4). Si $f_0$ n'est que quasiconvexe, cette conclusion **tombe** — passer à la bissection.

### Exercices progressifs

**Niveau 1** — Le problème $\min\ x_1^2+x_2^2$ s.c. $x_1^2+x_2^2 = 1$ est-il convexe ?

<details><summary>Correction</summary>

**Non.** La contrainte d'égalité $h(x)=x_1^2+x_2^2-1$ n'est **pas affine** : c'est la troisième exigence qui échoue. L'ensemble admissible est le **cercle** unité, qui n'est pas convexe. *Remarque :* le problème reste facile (l'objectif vaut $1$ partout sur le cercle !), mais il ne relève pas de la théorie convexe. Si la contrainte était $x_1^2+x_2^2\leq1$, le problème **serait** convexe.

</details>

**Niveau 2** — Montrez que $\min\ \|Ax-b\|_2$ et $\min\ \|Ax-b\|_2^2$ sont équivalents, et dites lequel préférer.

<details><summary>Correction</summary>

$\psi_0(u)=u^2$ est **croissante sur $\mathbb{R}_+$**, et $\|Ax-b\|_2\geq0$ toujours. Par la transformation de l'objectif (§4.1.3), les deux problèmes ont **le même ensemble admissible et les mêmes points optimaux** ; seules les valeurs optimales diffèrent ($p^\star$ et $(p^\star)^2$).

**Préférer la version au carré** : elle est **dérivable partout** (la norme ne l'est pas en $0$), et c'est une quadratique convexe $x^TA^TAx-2b^TAx+b^Tb$ dont le gradient s'annule en $A^TAx = A^Tb$ — les équations normales.

</details>

**Niveau 3** — Sur $\min f_0(x)$ s.c. $Ax=b$, montrez que le critère (4.21) équivaut à l'existence de $\nu$ avec $\nabla f_0(x^\star) = A^T\nu$.

<details><summary>Correction</summary>

L'ensemble admissible est $X = \{x\mid Ax=b\}$. Pour $x^\star\in X$, les points de $X$ s'écrivent $y = x^\star+v$ avec $v\in\mathbf{nullspace}(A)$. Le critère devient

$$\nabla f_0(x^\star)^Tv\geq0 \qquad \forall v\in\mathbf{nullspace}(A)$$

Mais le noyau est un **sous-espace** : si $v$ y est, $-v$ aussi. L'inégalité pour $v$ et pour $-v$ force donc l'**égalité** :

$$\nabla f_0(x^\star)^Tv = 0 \qquad \forall v\in\mathbf{nullspace}(A)$$

c'est-à-dire $\nabla f_0(x^\star)\in\mathbf{nullspace}(A)^\perp = \mathbf{range}(A^T)$, soit $\nabla f_0(x^\star)=A^T\nu$ pour un certain $\nu$.

**C'est la condition de Lagrange** : $\nabla f_0 + A^T(-\nu) = 0$, avec $-\nu$ dans le rôle des multiplicateurs. Retenez le mécanisme : sur un **sous-espace**, une inégalité variationnelle devient une **égalité**, et c'est pour cela que les multiplicateurs d'égalité sont de **signe libre**.

</details>

**Niveau 4 — type examen** — Un problème a $f_0$ convexe, $f_1$ convexe et $h_1$ affine, et l'on y trouve deux points optimaux distincts $x^{(1)}$ et $x^{(2)}$. Que peut-on dire de l'ensemble optimal ? Et si $f_0$ est **strictement** convexe ?

<details><summary>Correction</summary>

**L'ensemble optimal est convexe.** Il s'écrit $X_{\text{opt}} = \{x\in X \mid f_0(x)\leq p^\star\}$ : c'est l'intersection de l'ensemble admissible $X$ (convexe) et d'un **sous-niveau** de $f_0$ (convexe, §3.1.6). Donc tout le **segment** $[x^{(1)},x^{(2)}]$ est optimal, et il y a en fait une infinité de solutions.

**Si $f_0$ est strictement convexe**, c'est impossible : pour $\theta\in\ ]0,1[$,

$$f_0\big(\theta x^{(1)}+(1-\theta)x^{(2)}\big) < \theta f_0(x^{(1)})+(1-\theta)f_0(x^{(2)}) = p^\star$$

et ce point est admissible — ce qui contredirait la définition de $p^\star$. **L'optimum est donc unique** s'il existe.

**Ce que l'exercice enseigne.** La stricte convexité n'améliore pas l'existence (elle ne garantit rien : $e^x$ est strictement convexe sans minimum), mais elle garantit l'**unicité**. Existence et unicité sont deux questions séparées : l'existence vient de la compacité ou de la coercivité (fiche 10), l'unicité de la stricte convexité (fiche 11).

</details>

## 🔴 Common mistakes

1. **Croire qu'un ensemble admissible convexe suffit** — la convexité du **problème** porte sur l'écriture : $f_i$ convexes et $h_i$ **affines**.
2. **Accepter une contrainte d'égalité non affine** — $h(x)=0$ avec $h$ convexe non affine donne presque toujours un ensemble non convexe.
3. **Confondre « non atteinte » et « non minoré »** — $\inf 1/x = 0$ n'est pas atteint ; $\inf(-\log x) = -\infty$ n'existe pas. Deux situations distinctes.
4. **Transformer l'objectif par une fonction non croissante** — cela change l'ensemble des optima et peut détruire la convexité.
5. **Appliquer $\nabla f_0(x^\star)=0$ à un problème contraint** — c'est la spécialisation au cas **sans contrainte** ; avec contraintes, l'optimum est souvent au bord et le gradient n'y est pas nul.
6. **Chercher des optima locaux « à comparer »** — dans un problème convexe il n'y en a pas : local $=$ global.
7. **Étendre local $=$ global au quasiconvexe** — c'est faux, et c'est toute la raison d'être de la méthode par bissection.
8. **Oublier que la convexité de l'ensemble optimal ne donne pas l'unicité** — il faut la **stricte** convexité de $f_0$.

## 📌 Ultimate Review

1. Forme standard : $\min f_0(x)$ s.c. $f_i(x)\leq0$, $h_i(x)=0$ ; domaine $\mathcal{D}$, ensemble admissible, $p^\star$.
2. Conventions : $p^\star=+\infty$ si non admissible, $p^\star=-\infty$ si non minoré ; valeur **atteinte** ou non.
3. Contrainte **active** si $f_i(x)=0$ ; les égalités sont actives partout ; **redondante** si sa suppression ne change rien.
4. **Problèmes équivalents** : mise à l'échelle, changement de variable, transformation **croissante** de l'objectif, variables d'écart, forme épigraphe, minimisation partielle.
5. **Problème convexe** : $f_0$ convexe, $f_i$ convexes, $h_i$ **affines** — trois exigences. L'ensemble admissible est alors convexe.
6. La convexité est une propriété de l'**écriture**, pas seulement de l'ensemble admissible.
7. **Tout optimum local est global** — preuve par un point du segment à distance $R/2$.
8. **Critère d'optimalité** : $\nabla f_0(x^\star)^T(y-x^\star)\geq0$ pour tout $y$ admissible ; $-\nabla f_0(x^\star)$ appuie l'ensemble admissible.
9. Spécialisations : $\nabla f_0=0$ (sans contrainte) ; $\nabla f_0 = A^T\nu$ (égalités seules) ; positivité $+$ complémentarité (orthant).
10. **Quasiconvexe** : local $\neq$ global ; résolution par **bissection** sur $t$, avec $\lceil\log_2((u-l)/\varepsilon)\rceil$ problèmes de faisabilité convexes.

**Formulas to know**

$$p^\star=\inf\{f_0(x)\mid f_i(x)\leq0,\ h_i(x)=0\} \qquad \nabla f_0(x^\star)^T(y-x^\star)\geq0 \ \ \forall y\in X$$

$$f_0(x)\leq t \iff \phi_t(x)\leq0 \qquad \big\lceil\log_2\tfrac{u-l}{\varepsilon}\big\rceil \text{ itérations de bissection}$$

**Methods to know** : le protocole en 7 étapes ; la preuve local $=$ global ; les trois spécialisations du critère d'optimalité.

## 🧠 Active Recall

**Basic** — Quelles sont les trois exigences qui font d'un problème en forme standard un problème **convexe** ?

<details><summary>Réponse</summary>

$f_0$ **convexe**, les $f_i$ des contraintes d'inégalité **convexes**, et les contraintes d'égalité **affines** ($h_i(x)=a_i^Tx-b_i$). La troisième est la plus souvent oubliée.

</details>

**Understanding** — Démontrez que tout optimum local d'un problème convexe est global.

<details><summary>Réponse</summary>

Soit $x$ localement optimal sur une boule de rayon $R$, et supposons $y$ admissible avec $f_0(y)<f_0(x)$ ; alors $\|y-x\|_2>R$. Le point $z=(1-\theta)x+\theta y$ avec $\theta = R/(2\|y-x\|_2)$ est admissible (convexité de $X$) et vérifie $\|z-x\|_2 = R/2<R$. Par convexité de $f_0$, $f_0(z)\leq(1-\theta)f_0(x)+\theta f_0(y)<f_0(x)$ — contradiction avec l'optimalité locale.

</details>

**Application** — Sur $\min f_0(x)$ s.c. $x\succeq0$, quelle forme prend le critère d'optimalité ?

<details><summary>Réponse</summary>

$$x^\star\succeq0, \qquad \nabla f_0(x^\star)\succeq0, \qquad \nabla f_0(x^\star)_i\,x_i^\star = 0 \ \ \forall i$$

Les deux premières viennent de ce que $\nabla f_0(x^\star)^Ty$ doit être minoré sur l'orthant ; la troisième est la **complémentarité**, obtenue parce que le produit de deux vecteurs positifs est nul si et seulement si chaque terme l'est.

</details>

**Comparison** — Problème convexe et problème quasiconvexe : qu'est-ce qui change, et comment résout-on le second ?

<details><summary>Réponse</summary>

Le convexe garantit **local $=$ global** ; le quasiconvexe **non** — il peut avoir des minima locaux parasites. On le résout donc indirectement : on représente les sous-niveaux par des inégalités convexes $\phi_t(x)\leq0$, et l'on **bissecte** sur $t$, chaque test étant un problème de **faisabilité convexe**. Le coût est logarithmique en la précision.

</details>

**Exam-style** — Un problème a un ensemble admissible convexe mais des fonctions de contrainte non convexes. Est-il « un problème convexe » ? Justifiez.

<details><summary>Réponse</summary>

**Non**, au sens de Boyd : la définition (4.15) porte sur les **fonctions** de l'écriture, pas sur l'ensemble qu'elles décrivent. L'exemple du livre est $\min x_1^2+x_2^2$ s.c. $x_1/(1+x_2^2)\leq0$ et $(x_1+x_2)^2=0$ : l'ensemble admissible $\{x_1\leq0,\ x_1=-x_2\}$ est convexe, mais $f_1$ n'est pas convexe et $h_1$ n'est pas affine.

Le problème est cependant **équivalent** au problème convexe $\min x_1^2+x_2^2$ s.c. $x_1\leq0$, $x_1+x_2=0$. La distinction est pratique : les algorithmes et les théorèmes (dualité, KKT) s'appliquent à l'**écriture**, pas à l'ensemble — d'où l'importance de savoir réécrire.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Forme standard ? | $\min f_0(x)$ s.c. $f_i(x)\leq0$, $h_i(x)=0$ |
| Domaine du problème ? | $\bigcap_i\mathbf{dom}\,f_i\cap\bigcap_i\mathbf{dom}\,h_i$ |
| $p^\star$ si non admissible ? | $+\infty$ |
| $p^\star$ si non minoré ? | $-\infty$ |
| Contrainte active ? | $f_i(x)=0$ ; les égalités le sont partout |
| Les trois exigences de convexité ? | $f_0$ convexe, $f_i$ convexes, $h_i$ **affines** |
| L'ensemble admissible d'un problème convexe ? | Convexe — intersection de sous-niveaux et d'hyperplans |
| Propriété fondamentale ? | Tout optimum **local** est **global** |
| Critère d'optimalité du premier ordre ? | $\nabla f_0(x^\star)^T(y-x^\star)\geq0$ pour tout $y$ admissible |
| Cas sans contrainte ? | $\nabla f_0(x^\star)=0$ |
| Cas $Ax=b$ ? | $\nabla f_0(x^\star)=A^T\nu$ pour un $\nu$ |
| Cas $x\succeq0$ ? | $\nabla f_0\succeq0$ et $\nabla f_0(x^\star)_ix_i^\star=0$ |
| L'ensemble optimal est-il convexe ? | Oui — intersection de $X$ et d'un sous-niveau |
| Quand l'optimum est-il unique ? | Si $f_0$ est **strictement** convexe |
| Problème quasiconvexe ? | $f_0$ quasiconvexe ; local $\neq$ global |
| Résolution du quasiconvexe ? | Bissection sur $t$, tests de faisabilité convexe $\phi_t(x)\leq0$ |
| Coût de la bissection ? | $\lceil\log_2((u-l)/\varepsilon)\rceil$ problèmes convexes |
