# Fiche 38 — Dualité lagrangienne (Boyd, chapitre 5)

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Boyd & Vandenberghe, *Convex Optimization*, chapitre 5 « Duality », p. 215–290 |
| **Difficulté** | Must know — le morceau difficile, et le sommet du M1 |
| **Temps d'étude estimé** | 3 h |
| **Prérequis** | Fiches 34–37 (séparation, conjuguée, forme standard convexe), fiche 13 (KKT), fiche 28 (dualité LP) |
| **Concepts clés** | Lagrangien, fonction duale, borne inférieure, problème dual, dualité faible et forte, condition de Slater, point-selle, écarts complémentaires, conditions KKT, sensibilité |
| **Poids à l'examen** | C'est **le** chapitre qui départage : calculer une fonction duale, énoncer Slater, écrire et résoudre le système KKT, interpréter $\lambda^\star$. Tout le reste du livre s'y adosse. |

## 🎯 Vue d'ensemble

L'idée est d'une simplicité désarmante : **au lieu d'interdire la violation d'une contrainte, on la facture**. Chaque contrainte reçoit un prix, on l'ajoute à l'objectif, et le problème contraint devient un problème libre — paramétré par les prix.

```
LAGRANGIEN     L(x, λ, ν) = f₀(x) + Σ λᵢ fᵢ(x) + Σ νᵢ hᵢ(x)
FONCTION DUALE g(λ, ν) = inf_x L(x, λ, ν)     →  toujours CONCAVE
BORNE          g(λ, ν) ≤ p*  pour tout λ ≽ 0  →  DUALITÉ FAIBLE
PROBLÈME DUAL  max g(λ, ν) s.c. λ ≽ 0         →  toujours CONVEXE
                    d* ≤ p*, avec ÉGALITÉ sous la condition de Slater
```

**Trois choses valent d'être remarquées d'emblée.** La fonction duale est concave **même si le problème primal ne l'est pas**. La dualité faible vaut **sans aucune hypothèse**. Et de la dualité forte découlent les **conditions KKT**, qui unifient tout ce que les fiches 7, 13 et 28 avaient rencontré séparément.

## 🔴 Concept 1 — Le Lagrangien et la fonction duale

On part de la forme standard **quelconque** (5.1) — **la convexité n'est pas supposée** :

$$\begin{array}{ll}\text{minimiser} & f_0(x)\\ \text{sous} & f_i(x)\leq0, \quad i=1,\dots,m\\ & h_i(x)=0, \quad i=1,\dots,p\end{array}$$

de domaine $\mathcal{D}$ non vide et de valeur optimale $p^\star$.

**Le Lagrangien** $L:\mathbb{R}^n\times\mathbb{R}^m\times\mathbb{R}^p\to\mathbb{R}$ :

$$L(x,\lambda,\nu) = f_0(x) + \sum_{i=1}^m\lambda_i f_i(x) + \sum_{i=1}^p\nu_i h_i(x)$$

$\lambda_i$ est le **multiplicateur de Lagrange** de la $i$-ième inégalité, $\nu_i$ celui de la $i$-ième égalité ; $\lambda$ et $\nu$ sont les **variables duales**.

**La fonction duale de Lagrange** — le minimum du Lagrangien **sur $x$** :

$$g(\lambda,\nu) = \inf_{x\in\mathcal{D}} L(x,\lambda,\nu) = \inf_{x\in\mathcal{D}}\Big(f_0(x)+\sum_i\lambda_if_i(x)+\sum_i\nu_ih_i(x)\Big)$$

Quand le Lagrangien n'est pas minoré en $x$, on pose $g(\lambda,\nu)=-\infty$.

> **$g$ est toujours concave** — même si le problème primal ne l'est pas. C'est un **infimum de fonctions affines** de $(\lambda,\nu)$, et un infimum de fonctions affines est concave (fiche 35, §3.2.3). Retenez cet argument : il est court, et c'est lui qui rend la dualité universelle.

## 🔴 Concept 2 — La borne inférieure

**Propriété centrale (5.2).** Pour tout $\lambda\succeq0$ et tout $\nu$ :

$$g(\lambda,\nu) \leq p^\star$$

**Démonstration (trois lignes, à savoir refaire).** Soit $\tilde x$ admissible : $f_i(\tilde x)\leq0$ et $h_i(\tilde x)=0$. Pour $\lambda\succeq0$,

$$\sum_i\lambda_if_i(\tilde x) + \sum_i\nu_ih_i(\tilde x) \leq 0$$

(chaque terme de la première somme est $\leq0$, chaque terme de la seconde est nul). Donc $L(\tilde x,\lambda,\nu)\leq f_0(\tilde x)$, et

$$g(\lambda,\nu) = \inf_x L(x,\lambda,\nu) \leq L(\tilde x,\lambda,\nu) \leq f_0(\tilde x)$$

Ceci valant pour **tout** $\tilde x$ admissible, on obtient $g(\lambda,\nu)\leq p^\star$. $\blacksquare$

⚠️ La borne est **vide** quand $g(\lambda,\nu)=-\infty$. Elle n'est informative que si $\lambda\succeq0$ **et** $(\lambda,\nu)\in\mathbf{dom}\,g$. Un tel couple est dit **dual admissible**.

**L'interprétation par approximation linéaire (§5.1.4).** Réécrivons le problème sans contrainte à l'aide d'indicatrices :

$$\min\ f_0(x) + \sum_{i=1}^m I_-\big(f_i(x)\big) + \sum_{i=1}^p I_0\big(h_i(x)\big)$$

où $I_-(u)=0$ si $u\leq0$ et $+\infty$ sinon, $I_0(u)=0$ si $u=0$ et $+\infty$ sinon. L'indicatrice exprime une **irritation infinie** en cas de violation. Le Lagrangien remplace $I_-(u)$ par la fonction **linéaire** $\lambda_iu$ et $I_0(u)$ par $\nu_iu$ : c'est un **sous-estimateur** de l'indicatrice (pour $\lambda_i\geq0$), donc $L\leq$ l'objectif exact, donc $g\leq p^\star$.

> **Le mémo.** Le Lagrangien remplace une **interdiction** (coût infini) par une **facturation** (coût linéaire). Comme facturer coûte moins cher qu'interdire, on obtient une borne inférieure. La dualité forte dira quand la facturation reproduit exactement l'interdiction.

## 🔴 Concept 3 — Le problème dual

La meilleure borne s'obtient en optimisant sur les prix :

$$\begin{array}{ll}\text{maximiser} & g(\lambda,\nu)\\ \text{sous} & \lambda\succeq0\end{array} \tag{5.16}$$

C'est le **problème dual de Lagrange** ; le problème d'origine s'appelle alors le **primal**. Sa valeur optimale est notée $d^\star$, et un couple optimal $(\lambda^\star,\nu^\star)$ est dit **dual optimal** (ou **multiplicateurs de Lagrange optimaux**).

> **Le problème dual est toujours un problème d'optimisation convexe** — on maximise une fonction **concave** sous une contrainte **convexe** — **que le primal soit convexe ou non**. C'est le fait le plus remarquable du chapitre : à tout problème, même horriblement non convexe, la dualité associe un problème convexe qui le borne.

**Rendre les contraintes duales explicites (§5.2.1).** Le domaine de $g$ est souvent plus petit que $\{\lambda\succeq0\}$ : les $(\lambda,\nu)$ où $g=-\infty$ sont inutiles. On les écarte en écrivant explicitement les conditions qui rendent le Lagrangien minoré — c'est ainsi qu'apparaissent les contraintes du dual (par exemple $A^T\nu+c=0$ pour un LP, fiche 28).

## 🔴 Concept 4 — Dualité faible, dualité forte, Slater

**Dualité faible (5.23).**

$$d^\star \leq p^\star$$

**Elle vaut même si le problème primal n'est pas convexe.** Elle vaut aussi quand les valeurs sont infinies : si $p^\star=-\infty$ alors $d^\star=-\infty$ (le dual est non admissible) ; si $d^\star=+\infty$ alors $p^\star=+\infty$ (le primal est non admissible).

La différence $p^\star-d^\star\geq0$ s'appelle le **saut de dualité optimal**.

**Dualité forte (5.24).** On dit qu'elle est vérifiée si

$$d^\star = p^\star$$

c'est-à-dire si le saut de dualité est **nul** : la meilleure borne issue de la fonction duale est **exacte**.

⚠️ **La dualité forte n'est pas automatique**, même pour un problème convexe. Les conditions supplémentaires qui la garantissent s'appellent des **qualifications de contraintes**.

**Condition de Slater (5.26).** Pour un problème **convexe**

$$\min\ f_0(x) \quad\text{s.c.}\quad f_i(x)\leq0,\quad Ax=b$$

avec $f_0,\dots,f_m$ convexes, il suffit qu'il existe $x\in\mathbf{relint}\,\mathcal{D}$ tel que

$$f_i(x) < 0 \ \ (i=1,\dots,m), \qquad Ax = b$$

Un tel point est dit **strictement admissible**. **Théorème de Slater :** si le problème est convexe et si la condition de Slater est vérifiée, alors la **dualité forte** a lieu.

**Condition de Slater affinée (5.27).** Si les $k$ premières contraintes $f_1,\dots,f_k$ sont **affines**, il suffit qu'il existe $x\in\mathbf{relint}\,\mathcal{D}$ avec

$$f_i(x)\leq0 \ \ (i=1,\dots,k), \qquad f_i(x)<0 \ \ (i=k+1,\dots,m), \qquad Ax=b$$

*Les inégalités affines n'ont pas besoin d'être strictes.* En particulier, si **toutes** les contraintes sont des égalités et inégalités **linéaires** et si $\mathbf{dom}\,f_0$ est ouvert, la condition affinée se réduit à la simple **admissibilité** — c'est pourquoi la dualité forte est presque toujours acquise en programmation linéaire (fiche 28).

**Un bonus de Slater.** La condition n'implique pas seulement $d^\star=p^\star$ : elle garantit aussi que **l'optimum dual est atteint** dès que $d^\star>-\infty$ — il existe un couple dual admissible $(\lambda^\star,\nu^\star)$ avec $g(\lambda^\star,\nu^\star)=d^\star=p^\star$.

⚠️ **L'intérieur est *relatif*.** La condition porte sur $\mathbf{relint}\,\mathcal{D}$, pas sur $\mathbf{int}\,\mathcal{D}$ (fiche 34). Pour un problème dont le domaine est plat — contenu dans un hyperplan à cause d'égalités — l'intérieur ordinaire est vide et la condition serait toujours en défaut si l'on oubliait ce point.

## 🟠 Concept 5 — Interprétations : min-max, point-selle, prix

**Caractérisation min-max (§5.4.1).** Sans contraintes d'égalité, pour tout $x$ :

$$\sup_{\lambda\succeq0} L(x,\lambda) = \begin{cases} f_0(x) & \text{si } f_i(x)\leq0 \ \forall i\\ +\infty & \text{sinon}\end{cases}$$

(si $f_i(x)>0$ pour un $i$, prendre $\lambda_i\to\infty$ ; sinon l'optimum est $\lambda=0$). Par conséquent

$$p^\star = \inf_x\ \sup_{\lambda\succeq0} L(x,\lambda), \qquad d^\star = \sup_{\lambda\succeq0}\ \inf_x L(x,\lambda)$$

> **La dualité faible est donc l'inégalité générale $\sup\inf\leq\inf\sup$**, et la dualité forte l'affirmation que l'on peut **échanger** l'infimum et le supremum. C'est la formulation la plus mémorable du chapitre.

**Point-selle (§5.4.2).** La dualité forte avec optima atteints équivaut à l'existence d'un **point-selle** $(x^\star,\lambda^\star)$ du Lagrangien :

$$L(x^\star,\lambda) \leq L(x^\star,\lambda^\star) \leq L(x,\lambda^\star) \qquad \forall x,\ \forall\lambda\succeq0$$

$x^\star$ minimise $L(\cdot,\lambda^\star)$ et $\lambda^\star$ maximise $L(x^\star,\cdot)$ : ni l'un ni l'autre n'a intérêt à dévier — c'est l'équilibre d'un **jeu à somme nulle** (§5.4.3), comme à la fiche 29.

**Interprétation prix ou taxe (§5.4.4).** Soit $x$ le mode de fonctionnement d'une entreprise et $f_0(x)$ son coût (donc $-f_0(x)$ son profit) ; chaque contrainte $f_i(x)\leq0$ est une **limite** — de ressource (entrepôt, main-d'œuvre) ou réglementaire (environnement).

Imaginons maintenant que les limites **puissent** être dépassées, moyennant un paiement **linéaire** en le dépassement : l'entreprise paie $\lambda_if_i(x)$ pour la $i$-ième limite. Si $f_i(x)<0$ — la limite n'est pas atteinte — le terme est négatif : l'entreprise **reçoit** un paiement pour la part inutilisée. Le coefficient $\lambda_i\geq0$ est le **prix** de la violation, en euros par unité de dépassement.

Le coût total est alors exactement $L(x,\lambda)$, l'entreprise choisit $x$ pour le minimiser, et obtient $g(\lambda)$.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que la dualité forte dit dans ce langage.</span>

Il existe un jeu de prix $\lambda^\star$ pour lequel l'entreprise, **libre de dépasser les limites**, choisit spontanément de les respecter et réalise le même profit que sous contrainte stricte. *Il existe un système de prix qui rend la réglementation inutile.* C'est le théorème des prix implicites de l'économie, et le fondement des marchés de permis.

</div>

## 🔴 Concept 6 — Conditions d'optimalité

### Certificat de sous-optimalité (§5.5.1)

Pour tout $x$ primal admissible et $(\lambda,\nu)$ dual admissible :

$$f_0(x) - p^\star \leq f_0(x) - g(\lambda,\nu)$$

La quantité $f_0(x)-g(\lambda,\nu)$ est le **saut de dualité** du couple : $x$ est $\varepsilon$-sous-optimal avec $\varepsilon$ égal à ce saut. C'est un **critère d'arrêt** utilisable par un algorithme, sans connaître $p^\star$.

### Écarts complémentaires (§5.5.2)

Supposons la dualité forte, avec optima atteints en $x^\star$ et $(\lambda^\star,\nu^\star)$. La chaîne

$$f_0(x^\star) = g(\lambda^\star,\nu^\star) = \inf_x L(x,\lambda^\star,\nu^\star) \leq L(x^\star,\lambda^\star,\nu^\star) \leq f_0(x^\star)$$

est donc une chaîne d'**égalités**. On en tire **deux** conclusions majeures :

1. **$x^\star$ minimise $L(x,\lambda^\star,\nu^\star)$ sur $x$** (il peut y avoir d'autres minimiseurs) ;
2. $\sum_i\lambda_i^\star f_i(x^\star)=0$, et comme chaque terme est $\leq0$ : $$\boxed{\ \lambda_i^\star\,f_i(x^\star) = 0, \qquad i=1,\dots,m\ } \tag{5.48}$$

Ce sont les **écarts complémentaires** : $\lambda_i^\star>0\Rightarrow f_i(x^\star)=0$, et $f_i(x^\star)<0\Rightarrow\lambda_i^\star=0$. *Le multiplicateur optimal est nul, sauf si la contrainte est active à l'optimum.*

### Les conditions KKT (§5.5.3)

Supposons $f_0,\dots,f_m,h_1,\dots,h_p$ **dérivables** — **sans** hypothèse de convexité pour l'instant. Puisque $x^\star$ minimise $L(\cdot,\lambda^\star,\nu^\star)$, son gradient s'y annule. On obtient les conditions de **Karush-Kuhn-Tucker** (5.49) :

$$\begin{array}{ll} f_i(x^\star)\leq0, & i=1,\dots,m \qquad\text{(admissibilité primale)}\\ h_i(x^\star)=0, & i=1,\dots,p \qquad\text{(admissibilité primale)}\\ \lambda_i^\star\geq0, & i=1,\dots,m \qquad\text{(admissibilité duale)}\\ \lambda_i^\star f_i(x^\star)=0, & i=1,\dots,m \qquad\text{(complémentarité)}\end{array}$$

et la condition de **stationnarité** :

$$\nabla f_0(x^\star)+\sum_{i=1}^m\lambda_i^\star\nabla f_i(x^\star)+\sum_{i=1}^p\nu_i^\star\nabla h_i(x^\star)=0$$

**Le statut des KKT, en trois énoncés à ne pas confondre.**

| Hypothèses | Statut des KKT |
|---|---|
| dualité forte $+$ optima atteints $+$ fonctions dérivables (**problème quelconque**) | **nécessaires** |
| problème **convexe** ($f_i$ convexes, $h_i$ affines) $+$ dérivables | **suffisantes** |
| problème **convexe** $+$ **Slater** | **nécessaires et suffisantes** |

**Preuve de la suffisance dans le cas convexe (celle de Boyd).** Supposons $(\tilde x,\tilde\lambda,\tilde\nu)$ vérifiant les KKT. Les deux premières conditions disent que $\tilde x$ est primal admissible. Comme $\tilde\lambda\succeq0$ et que les $f_i$ sont convexes et les $h_i$ affines, $L(\cdot,\tilde\lambda,\tilde\nu)$ est **convexe en $x$** ; la condition de stationnarité dit que son gradient s'annule en $\tilde x$, donc $\tilde x$ **minimise** $L(\cdot,\tilde\lambda,\tilde\nu)$. Par conséquent

$$g(\tilde\lambda,\tilde\nu) = L(\tilde x,\tilde\lambda,\tilde\nu) = f_0(\tilde x) + \sum_i\tilde\lambda_if_i(\tilde x)+\sum_i\tilde\nu_ih_i(\tilde x) = f_0(\tilde x)$$

en utilisant $h_i(\tilde x)=0$ et la **complémentarité** $\tilde\lambda_if_i(\tilde x)=0$. Le saut de dualité est nul : $\tilde x$ est primal optimal et $(\tilde\lambda,\tilde\nu)$ dual optimal. $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi les KKT sont partout.</span>

Dans quelques cas, on peut résoudre le système KKT **analytiquement**, et donc le problème. Plus généralement, comme le note Boyd, **beaucoup d'algorithmes d'optimisation convexe sont conçus — ou s'interprètent — comme des méthodes de résolution des conditions KKT.**

</div>

## 🟠 Concept 7 — Perturbation et sensibilité (§5.6)

**Le problème perturbé.**

$$p^\star(u,v) = \inf\{f_0(x) \mid f_i(x)\leq u_i,\ h_i(x)=v_i\}$$

$u_i>0$ **relâche** la $i$-ième inégalité, $u_i<0$ la **resserre** ; $p^\star(0,0)=p^\star$.

**Inégalité globale (5.57).** Si la dualité forte a lieu et si l'optimum dual est atteint en $(\lambda^\star,\nu^\star)$, alors pour **tous** $u,v$ :

$$p^\star(u,v) \geq p^\star(0,0) - \lambda^{\star T}u - \nu^{\star T}v$$

**Sensibilité locale (5.58).** Si de plus $p^\star$ est **dérivable** en $(0,0)$ :

$$\lambda_i^\star = -\frac{\partial p^\star(0,0)}{\partial u_i}, \qquad \nu_i^\star = -\frac{\partial p^\star(0,0)}{\partial v_i}$$

**Les multiplicateurs optimaux sont exactement les sensibilités locales de la valeur optimale aux perturbations des contraintes.** Contrairement au cas non dérivable, l'interprétation est **symétrique** : resserrer la $i$-ième contrainte d'un petit $u_i<0$ **augmente** $p^\star$ d'environ $-\lambda_i^\star u_i$ ; la relâcher d'un petit $u_i>0$ **diminue** $p^\star$ d'environ $\lambda_i^\star u_i$.

> **La lecture, identique à celle de la fiche 29.** Un grand $\lambda_i^\star$ signale une contrainte **très pénalisante** : c'est elle qu'il faut desserrer en priorité. Un $\lambda_i^\star$ nul signale une contrainte **inopérante** — c'est la complémentarité.

## 🟢 Concept 8 — Théorèmes d'alternatives (§5.8)

La dualité fournit des **certificats d'infaisabilité**. Le principe : appliquer la dualité au problème de **faisabilité** (objectif $f_0\equiv0$). La fonction duale ne prend alors que les valeurs $0$ ou $-\infty$, et le dual devient une **condition d'infaisabilité** du primal.

On obtient des paires de systèmes dont **exactement un** est réalisable — les **alternatives faibles** en général, **fortes** sous une qualification de contraintes. C'est ainsi que se démontre le lemme de Farkas, et c'est ce lemme qui fonde la preuve de dualité forte en programmation linéaire (fiche 28).

### Comment résoudre l'exercice type (protocole)

1. **Écrire le problème en forme standard** : $f_i\leq0$, $h_i=0$.
2. **Former le Lagrangien** $L(x,\lambda,\nu)=f_0+\sum\lambda_if_i+\sum\nu_ih_i$.
3. **Minimiser en $x$** : annuler $\nabla_xL=0$ et reporter — c'est le calcul le plus long, et c'est là qu'apparaît souvent une **conjuguée** (fiche 35).
4. **Identifier $\mathbf{dom}\,g$** : pour quels $(\lambda,\nu)$ l'infimum est-il fini ? Ces conditions deviennent les **contraintes du dual**.
5. **Écrire le dual** : $\max g(\lambda,\nu)$ s.c. $\lambda\succeq0$ et les contraintes trouvées.
6. **Tester Slater** : existe-t-il un point strictement admissible ? (Les contraintes **affines** n'ont pas besoin d'être strictes.) Si oui, $d^\star=p^\star$ et le dual est atteint.
7. **Écrire le système KKT** et le résoudre — en s'appuyant sur la **complémentarité** pour discuter quelles contraintes sont actives.
8. **Interpréter $\lambda^\star$** : prix implicite, sensibilité $-\partial p^\star/\partial u_i$.

### Exercices progressifs

**Niveau 1** — Calculez la fonction duale de $\min\ x^Tx$ s.c. $Ax=b$.

<details><summary>Correction</summary>

$L(x,\nu)=x^Tx+\nu^T(Ax-b)$. On minimise en $x$ : $\nabla_xL = 2x+A^T\nu = 0$, donc $x = -\tfrac12A^T\nu$. En reportant :

$$g(\nu) = \tfrac14\nu^TAA^T\nu - \tfrac12\nu^TAA^T\nu - b^T\nu = -\tfrac14\nu^TAA^T\nu - b^T\nu$$

$g$ est une quadratique **concave** (la matrice $-\tfrac12AA^T$ est $\preceq0$). Le dual est $\max_\nu g(\nu)$, sans contrainte (pas d'inégalité). *Contrôle :* les contraintes sont **affines** et le problème convexe, donc Slater affiné se réduit à l'admissibilité — la dualité forte a lieu dès que $Ax=b$ a une solution.

</details>

**Niveau 2** — Pourquoi la fonction duale est-elle concave même pour un problème primal non convexe ?

<details><summary>Correction</summary>

Pour **chaque $x$ fixé**, l'application $(\lambda,\nu)\mapsto L(x,\lambda,\nu) = f_0(x)+\sum\lambda_if_i(x)+\sum\nu_ih_i(x)$ est **affine** en $(\lambda,\nu)$ — les $f_i(x)$ et $h_i(x)$ sont de simples **nombres**. La fonction duale est l'**infimum** de cette famille de fonctions affines, indexée par $x$ ; or un infimum de fonctions affines est **concave** (fiche 35, §3.2.3). La nature de $f_0$ et des $f_i$ n'intervient à aucun moment. $\blacksquare$

</details>

**Niveau 3** — Un problème convexe a un point admissible mais aucun point **strictement** admissible. Que peut-on dire ?

<details><summary>Correction</summary>

**La condition de Slater standard échoue**, donc le théorème ne s'applique pas : la dualité forte n'est **pas garantie** (elle peut néanmoins avoir lieu — Slater est suffisante, pas nécessaire).

**Deux réflexes.** *(1)* Vérifier la version **affinée** (5.27) : si les contraintes non strictement satisfaites sont **affines**, la condition est quand même remplie et la dualité forte a lieu. *(2)* Vérifier que l'on a bien travaillé dans l'**intérieur relatif** : si le domaine est plat, un point peut être strictement admissible au sens relatif sans l'être au sens ordinaire.

Si aucun des deux ne s'applique, il reste la **dualité faible** $d^\star\leq p^\star$, et le saut peut être strictement positif.

</details>

**Niveau 4 — type examen** — Résolvez par KKT : $\min\ \tfrac12x^Tx$ s.c. $a^Tx\geq1$, avec $a\neq0$.

<details><summary>Correction</summary>

**Étape 1 — forme standard.** $f_1(x) = 1-a^Tx\leq0$. Le problème est convexe (objectif quadratique convexe, contrainte affine).

**Étape 2 — Slater.** Le point $x = 2a/\|a\|_2^2$ donne $a^Tx = 2>1$ : strictement admissible. La contrainte étant de plus **affine**, la condition affinée suffirait. **Dualité forte, KKT nécessaires et suffisantes.**

**Étape 3 — système KKT.**

$$\begin{cases} 1-a^Tx^\star\leq0 & \text{(admissibilité)}\\ \lambda^\star\geq0 & \\ \lambda^\star(1-a^Tx^\star)=0 & \text{(complémentarité)}\\ x^\star - \lambda^\star a = 0 & \text{(stationnarité : } \nabla f_0 + \lambda\nabla f_1 = x-\lambda a)\end{cases}$$

**Étape 4 — discussion par la complémentarité.** *Cas $\lambda^\star=0$ :* la stationnarité donne $x^\star=0$, mais alors $a^Tx^\star = 0 < 1$ : **non admissible**. Ce cas est exclu. *Cas $\lambda^\star>0$ :* la complémentarité impose $a^Tx^\star=1$ (contrainte **active**). La stationnarité donne $x^\star=\lambda^\star a$, d'où $\lambda^\star\|a\|_2^2 = 1$, soit

$$\lambda^\star = \frac{1}{\|a\|_2^2}, \qquad x^\star = \frac{a}{\|a\|_2^2}, \qquad p^\star = \tfrac12\frac{1}{\|a\|_2^2}$$

**Étape 5 — interprétation.** $x^\star$ est le point du demi-espace $\{a^Tx\geq1\}$ **le plus proche de l'origine** : le pied de la perpendiculaire, à distance $1/\|a\|_2$. Et $\lambda^\star=1/\|a\|_2^2$ est la sensibilité : remplacer la contrainte par $a^Tx\geq1+u$ donnerait $p^\star(u) = \tfrac12(1+u)^2/\|a\|_2^2$, dont la dérivée en $0$ vaut $1/\|a\|_2^2 = \lambda^\star$ — au signe près de la convention (ici resserrer, c'est augmenter $u$).

**Ce que l'exercice enseigne.** La méthode ne consiste jamais à « résoudre le système » d'un bloc : on **discute les cas** ouverts par la complémentarité — contrainte active ou non — et l'on élimine ceux qui contredisent l'admissibilité. C'est la mécanique de tout exercice KKT.

</details>

## 🔴 Common mistakes

1. **Croire la dualité faible réservée aux problèmes convexes** — elle vaut **toujours**, et c'est ce qui la rend si utile en optimisation non convexe.
2. **Oublier $\lambda\succeq0$** — sans elle, la borne inférieure s'effondre : c'est la positivité des multiplicateurs qui rend $\sum\lambda_if_i(\tilde x)\leq0$.
3. **Mettre une contrainte de signe sur $\nu$** — les multiplicateurs d'**égalité** sont **libres** ; seuls ceux d'inégalité sont positifs.
4. **Croire la dualité forte automatique en convexe** — il faut une qualification de contraintes, typiquement **Slater**.
5. **Exiger des inégalités strictes sur les contraintes affines** — la version affinée (5.27) ne l'exige pas.
6. **Oublier l'intérieur *relatif*** dans Slater — sur un domaine plat, l'intérieur ordinaire est vide.
7. **Appliquer les KKT sans vérifier leur statut** — nécessaires sous dualité forte, suffisantes en convexe, les deux sous Slater. Confondre les trois est l'erreur la plus coûteuse.
8. **Résoudre le système KKT sans discuter la complémentarité** — c'est elle qui découpe le problème en cas ; sans elle on tourne en rond.
9. **Se tromper de signe dans la sensibilité** — $\lambda_i^\star = -\partial p^\star/\partial u_i$ : relâcher **diminue** la valeur minimale.

## 📌 Ultimate Review

1. $L(x,\lambda,\nu)=f_0(x)+\sum_i\lambda_if_i(x)+\sum_i\nu_ih_i(x)$ ; $g(\lambda,\nu)=\inf_xL$.
2. **$g$ est toujours concave** — infimum de fonctions affines de $(\lambda,\nu)$ — même si le primal ne l'est pas.
3. **Borne inférieure** : $g(\lambda,\nu)\leq p^\star$ pour tout $\lambda\succeq0$, sans aucune hypothèse.
4. **Problème dual** : $\max g(\lambda,\nu)$ s.c. $\lambda\succeq0$ — **toujours convexe**.
5. **Dualité faible** $d^\star\leq p^\star$, toujours ; **saut de dualité** $p^\star-d^\star$.
6. **Dualité forte** $d^\star=p^\star$ : garantie par la **condition de Slater** (problème convexe $+$ point strictement admissible dans $\mathbf{relint}\,\mathcal{D}$) ; version **affinée** pour les contraintes affines ; Slater garantit aussi que le **dual est atteint**.
7. $p^\star=\inf_x\sup_{\lambda\succeq0}L$ et $d^\star=\sup_{\lambda\succeq0}\inf_xL$ : la dualité forte, c'est **échanger $\inf$ et $\sup$** ; équivalent à un **point-selle**.
8. Lecture économique : $\lambda_i$ est un **prix** de violation ; la dualité forte dit qu'il existe des prix rendant la réglementation inutile.
9. **Écarts complémentaires** $\lambda_i^\star f_i(x^\star)=0$ ; $x^\star$ minimise $L(\cdot,\lambda^\star,\nu^\star)$.
10. **KKT** : admissibilité primale, $\lambda\succeq0$, complémentarité, **stationnarité** $\nabla f_0+\sum\lambda_i\nabla f_i+\sum\nu_i\nabla h_i=0$. Nécessaires (dualité forte), suffisantes (convexe), **les deux** (convexe $+$ Slater).
11. **Sensibilité** : $\lambda_i^\star=-\partial p^\star/\partial u_i$, $\nu_i^\star=-\partial p^\star/\partial v_i$ ; borne globale $p^\star(u,v)\geq p^\star-\lambda^{\star T}u-\nu^{\star T}v$.

**Formulas to know**

$$g(\lambda,\nu)=\inf_x\Big(f_0(x)+\sum_i\lambda_if_i(x)+\sum_i\nu_ih_i(x)\Big) \qquad g(\lambda,\nu)\leq p^\star \qquad d^\star\leq p^\star$$

$$\lambda_i^\star f_i(x^\star)=0 \qquad \nabla f_0(x^\star)+\sum_i\lambda_i^\star\nabla f_i(x^\star)+\sum_i\nu_i^\star\nabla h_i(x^\star)=0 \qquad \lambda_i^\star=-\frac{\partial p^\star}{\partial u_i}$$

**Methods to know** : le protocole en 8 étapes ; la preuve de la borne inférieure ; la preuve de suffisance des KKT ; la discussion par cas de la complémentarité.

## 🧠 Active Recall

**Basic** — Écrivez le Lagrangien, la fonction duale et le problème dual d'un problème en forme standard.

<details><summary>Réponse</summary>

$L(x,\lambda,\nu)=f_0(x)+\sum_{i=1}^m\lambda_if_i(x)+\sum_{i=1}^p\nu_ih_i(x)$ ; $g(\lambda,\nu)=\inf_{x\in\mathcal{D}}L(x,\lambda,\nu)$ ; dual : $\max\ g(\lambda,\nu)$ sous $\lambda\succeq0$ ($\nu$ libre).

</details>

**Understanding** — Démontrez que $g(\lambda,\nu)\leq p^\star$ pour $\lambda\succeq0$.

<details><summary>Réponse</summary>

Soit $\tilde x$ admissible. Comme $\lambda\succeq0$ et $f_i(\tilde x)\leq0$, chaque $\lambda_if_i(\tilde x)\leq0$ ; et $h_i(\tilde x)=0$ annule les autres termes. Donc $L(\tilde x,\lambda,\nu)\leq f_0(\tilde x)$, d'où

$$g(\lambda,\nu)=\inf_xL(x,\lambda,\nu)\leq L(\tilde x,\lambda,\nu)\leq f_0(\tilde x)$$

Ceci valant pour tout $\tilde x$ admissible, $g(\lambda,\nu)\leq\inf f_0 = p^\star$.

</details>

**Application** — Énoncez la condition de Slater et dites ce qu'elle garantit exactement.

<details><summary>Réponse</summary>

Pour un problème **convexe**, il existe $x\in\mathbf{relint}\,\mathcal{D}$ avec $f_i(x)<0$ pour tout $i$ et $Ax=b$. Elle garantit **(1)** la dualité forte $d^\star=p^\star$ et **(2)** que l'optimum **dual est atteint** dès que $d^\star>-\infty$. Version affinée : les contraintes **affines** peuvent être satisfaites avec inégalité **large**.

</details>

**Comparison** — Quel est le statut des conditions KKT selon les hypothèses ?

<details><summary>Réponse</summary>

*Problème quelconque, dérivable, dualité forte avec optima atteints* : **nécessaires**. *Problème convexe dérivable* : **suffisantes** — tout triplet vérifiant les KKT est primal-dual optimal, avec saut nul. *Problème convexe $+$ Slater* : **nécessaires et suffisantes**, donc une caractérisation complète de l'optimalité.

</details>

**Exam-style** — Expliquez l'interprétation économique de la dualité, et ce que dit la dualité forte dans ce langage.

<details><summary>Réponse</summary>

$x$ décrit le fonctionnement d'une entreprise, $f_0(x)$ son coût, chaque $f_i(x)\leq0$ une limite de ressource ou réglementaire. Dans le scénario dual, l'entreprise **peut** dépasser une limite en payant $\lambda_if_i(x)$ — et **reçoit** ce montant si elle n'utilise pas toute la ressource ($f_i(x)<0$). Son coût total est exactement $L(x,\lambda)$, qu'elle minimise pour obtenir $g(\lambda)$.

La dualité faible dit que ce scénario est **toujours au moins aussi avantageux** que le scénario contraint. La **dualité forte** dit qu'il existe un jeu de prix $\lambda^\star$ pour lequel les deux scénarios coïncident : *avec les bons prix, l'entreprise choisit spontanément de respecter les limites*. Les $\lambda_i^\star$ sont les **prix implicites** des ressources, égaux à $-\partial p^\star/\partial u_i$ — c'est le fondement théorique des marchés de permis et de la tarification des ressources rares.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Lagrangien ? | $L=f_0+\sum_i\lambda_if_i+\sum_i\nu_ih_i$ |
| Fonction duale ? | $g(\lambda,\nu)=\inf_xL(x,\lambda,\nu)$ |
| $g$ est-elle concave ? | **Toujours** — infimum de fonctions affines de $(\lambda,\nu)$ |
| Borne inférieure ? | $g(\lambda,\nu)\leq p^\star$ pour $\lambda\succeq0$ |
| Dual admissible ? | $\lambda\succeq0$ et $g(\lambda,\nu)>-\infty$ |
| Le problème dual est-il convexe ? | **Toujours**, même si le primal ne l'est pas |
| Dualité faible ? | $d^\star\leq p^\star$, sans hypothèse |
| Saut de dualité optimal ? | $p^\star-d^\star\geq0$ |
| Condition de Slater ? | Problème convexe $+$ un $x\in\mathbf{relint}\,\mathcal{D}$ strictement admissible |
| Version affinée de Slater ? | Les contraintes **affines** peuvent être satisfaites de façon large |
| Que garantit Slater en plus ? | L'**atteinte** de l'optimum dual |
| $p^\star$ et $d^\star$ en min-max ? | $p^\star=\inf_x\sup_{\lambda\succeq0}L$, $d^\star=\sup_{\lambda\succeq0}\inf_xL$ |
| Dualité forte $\iff$ ? | On peut **échanger** $\inf$ et $\sup$ — point-selle du Lagrangien |
| Écarts complémentaires ? | $\lambda_i^\star f_i(x^\star)=0$ |
| Les cinq conditions KKT ? | Admissibilité primale (2), $\lambda\succeq0$, complémentarité, stationnarité |
| Statut des KKT en convexe $+$ Slater ? | **Nécessaires et suffisantes** |
| Signe des multiplicateurs d'égalité ? | **Libre** — seuls ceux d'inégalité sont $\geq0$ |
| Sensibilité ? | $\lambda_i^\star=-\partial p^\star/\partial u_i$ |
| Inégalité globale de perturbation ? | $p^\star(u,v)\geq p^\star-\lambda^{\star T}u-\nu^{\star T}v$ |
| Interprétation économique de $\lambda_i$ ? | Le **prix** de violation de la contrainte $i$ |
