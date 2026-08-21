# Fiche 30 — L'algorithme du simplexe

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 12 « Simplex method », 31 diapositives |
| **Difficulté** | Must know — l'algorithme historique, et le seul qu'on sache dérouler à la main |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 26 (test du rang, points extrêmes), fiche 28 (dualité, écarts complémentaires) |
| **Concepts clés** | Sommets adjacents, direction d'arête, test du rapport minimal, itération du simplexe, dégénérescence, cyclage, règle de Bland, phase I |
| **Poids à l'examen** | Savoir **dérouler une itération à la main** — calculer $z$, choisir $k$, calculer $\Delta x$, faire le test du rapport minimal — est la compétence évaluée. Le reste (cyclage, phase I) s'énonce. |

## 🎯 Vue d'ensemble

Le théorème de décomposition (fiche 27) a réduit un LP à un problème **fini** : l'optimum est en un sommet, il y en a un nombre fini, il « suffit » de les comparer. Mais leur nombre croît exponentiellement — les énumérer est hors de question.

**L'idée de Dantzig (1947)** : ne pas énumérer, mais **descendre**. On part d'un sommet, on se déplace vers un sommet **voisin** de coût strictement plus bas, et on recommence. Comme les sommets sont en nombre fini et que le coût décroît strictement, on s'arrête.

```
SOMMET COURANT x, contraintes actives J
  1. calculer z          → si z ≽ 0 : STOP, optimal (certificat dual)
  2. choisir k avec z_k < 0, calculer la direction Δx
                         → si AΔx ≼ 0 : STOP, non borné
  3. test du rapport minimal → pas α̂, contrainte entrante j
  J := (J \ {k}) ∪ {j},  x := x + α̂ Δx
```

Le critère d'arrêt **est** le certificat dual de la fiche 28 : le simplexe fabrique simultanément une solution primale et une solution duale, et s'arrête quand elles se rejoignent.

## 🟡 Concept 1 — Format et hypothèses

Le cours travaille sur la **forme d'inégalités**

$$\min\ c^Tx \quad\text{sous}\quad Ax\preceq b, \qquad A\in\mathbb{R}^{m\times n}$$

**Hypothèse.** L'ensemble admissible est **non vide** et **pointu** — c'est-à-dire $\mathbf{rank}(A) = n$ (fiche 26). Sans pointure il n'y a aucun sommet, et l'algorithme n'a rien à visiter.

**Condition suffisante commode.** Il suffit que les contraintes contiennent, pour chaque variable $x_k$, une **borne simple** $x_k\geq l_k$ et/ou $x_k\leq u_k$ : ces lignes fournissent à elles seules $n$ directions indépendantes.

**Variables libres.** Une variable sans borne se scinde en deux variables positives :

$$x_k = x_k^+ - x_k^-, \qquad x_k^+\geq0,\ x_k^-\geq0$$

> Historique : le simplexe est inventé en **1947 par George Dantzig**. Il se présente habituellement sur la forme standard (« simplexe primal ») ; le cours expose la variante pour la forme d'inégalités, dite **simplexe dual**.

**Les quatre questions que pose une itération**, et où elles se règlent :

| Question | Réponse |
|---|---|
| Comment caractériser un sommet ? | Test du rang (fiche 26) |
| Comment trouver un sommet voisin de coût plus bas ? | Concepts 3 et 4 |
| Quand s'arrête-t-on ? | Quand $z\succeq0$ (optimal) ou $A\Delta x\preceq0$ (non borné) |
| Comment trouver un sommet initial ? | La **phase I** (concept 7) |

## 🟠 Concept 2 — Dégénérescence et adjacence

**Sommet non dégénéré.** Un point extrême $x$ est **non dégénéré** si **exactement $n$** inégalités y sont actives. Alors $A_J$ est **carrée et inversible**, et

$$x = A_J^{-1}b_J$$

**Sommet dégénéré** : plus de $n$ inégalités actives. $A_J$ est de rang $n$ mais **rectangulaire**.

⚠️ Distinction importante du cours : l'**extrémalité** est une propriété **géométrique** de l'ensemble $P=\{x\mid Ax\preceq b\}$ ; la **(non-)dégénérescence** dépend en plus de la **description** choisie, c'est-à-dire de $A$ et $b$. Ajouter une inégalité redondante peut rendre un sommet dégénéré sans changer le polyèdre.

*Jusqu'au concept 6, on suppose tous les sommets non dégénérés.*

**Sommets adjacents.** Deux points extrêmes sont **adjacents** s'ils ont $n-1$ contraintes actives **communes** — géométriquement, ils sont reliés par une **arête** du polyèdre.

**Exemple du cours.** Pour le polyèdre de $\mathbb{R}^2$ défini par $-x_2\leq0$, $-x_1-x_2\leq-1$, $-x_1\leq0$, $-x_1+x_2\leq2$ :

| $x$ | $b - Ax$ | $J$ |
|---|---|---|
| $(1,0)$ | $(0,0,1,3)$ | $\{1,2\}$ |
| $(0,1)$ | $(1,0,0,1)$ | $\{2,3\}$ |
| $(0,2)$ | $(2,1,0,0)$ | $\{3,4\}$ |

$(1,0)$ et $(0,1)$ partagent la contrainte $2$ : ils sont **adjacents**. $(1,0)$ et $(0,2)$ n'ont aucune contrainte commune : ils ne le sont pas.

**Le mémo.** $b - Ax$ est le vecteur des **marges** ; ses zéros repèrent les contraintes actives. Le calculer à chaque étape est le réflexe de base.

## 🔴 Concept 3 — Se déplacer vers un sommet adjacent

**Données** : un sommet $x$ d'ensemble actif $J$, et un indice $k\in J$ qu'on décide de **relâcher**. **But** : trouver le sommet adjacent $\hat x$ dont l'ensemble actif contient $J\setminus\{k\}$.

**Étape 1 — la direction d'arête.** Résoudre le système de $n$ équations à $n$ inconnues

$$a_i^T\Delta x = 0 \ \text{ pour } i\in J\setminus\{k\}, \qquad a_k^T\Delta x = -1$$

On reste sur les $n-1$ contraintes conservées, et on **quitte** la contrainte $k$ vers l'intérieur (le $-1$ garantit que la marge $b_k - a_k^Tx$ augmente). Le système est **résoluble** car $A_J$ est inversible.

**Étape 2 — cas non borné.** Si $A\Delta x\preceq0$, alors pour tout $\alpha\geq0$ :

$$A(x+\alpha\Delta x) = Ax + \alpha A\Delta x \preceq b$$

La demi-droite $\{x+\alpha\Delta x \mid \alpha\geq0\}$ est **entièrement admissible** : c'est une arête infinie du polyèdre.

**Étape 3 — le test du rapport minimal.** Sinon, on avance jusqu'à ce qu'une nouvelle contrainte devienne active :

$$\hat x = x + \hat\alpha\,\Delta x, \qquad \hat\alpha = \min_{i\,:\,a_i^T\Delta x>0}\ \frac{b_i - a_i^Tx}{a_i^T\Delta x}$$

C'est le $\alpha$ maximal tel que $A(x+\alpha\Delta x)\preceq b$ : chaque contrainte $i$ dont la marge diminue impose une limite, et **la plus contraignante gagne**.

**Discussion (points du cours à retenir).**

- $\hat\alpha>0$ : par construction $A_J\Delta x\preceq0$, donc $a_i^T\Delta x>0$ entraîne $i\notin J$, donc $b_i - a_i^Tx>0$ : tous les rapports sont **strictement positifs**.
- Le nouvel ensemble actif est $\hat J = (J\setminus\{k\})\cup I$ avec $I = \{i \mid a_i^T\Delta x>0,\ (b_i-a_i^Tx)/(a_i^T\Delta x) = \hat\alpha\}$.
- $\hat x$ est bien un **point extrême** : pour $j\in I$, on a $a_j^T\Delta x>0$ alors que $a_i^T\Delta x = 0$ pour $i\in J\setminus\{k\}$ ; donc $a_j$ est linéairement indépendant des $a_i$, $i\in J\setminus\{k\}$, et $\mathbf{rank}(A_{\hat J}) = n$.
- Sous l'hypothèse de non-dégénérescence, $|I| = 1$ : **le minimum du test est unique**.

### Exemple du cours

Sur le polyèdre ci-dessus, cherchons les sommets adjacents à $x=(1,0)$, $J=\{1,2\}$.

**Retirer $k=1$.** Le système $a_2^T\Delta x = 0$, $a_1^T\Delta x = -1$ s'écrit

$$\begin{pmatrix}0&-1\\-1&-1\end{pmatrix}\begin{pmatrix}\Delta x_1\\ \Delta x_2\end{pmatrix} = \begin{pmatrix}-1\\0\end{pmatrix} \ \Longrightarrow\ \Delta x = (-1,1)$$

Test du rapport minimal : $A\Delta x = (-1,0,1,2)$, donc seuls $i=3$ et $i=4$ comptent :

$$\hat\alpha = \min\Big\{\frac{1}{1},\ \frac{3}{2}\Big\} = 1$$

Nouveau sommet : $\hat x = (1,0)+1\cdot(-1,1) = (0,1)$, d'ensemble actif $\{2,3\}$.

**Retirer $k=2$.** On obtient $\Delta x = (1,0)$ et $A\Delta x = (0,-1,-1,-1)\preceq0$ : la demi-droite $\{(1,0)+\alpha(1,0) \mid \alpha\geq0\}$ est une **arête non bornée** du polyèdre.

## 🔴 Concept 4 — Choisir une direction qui fait baisser le coût

**Le calcul du vecteur dual.** Étant donné le sommet $x$ d'ensemble actif $J$, on définit $z\in\mathbb{R}^m$ par

$$A_J^Tz_J + c = 0, \qquad z_j = 0 \ \text{ pour } j\notin J$$

C'est exactement le **candidat dual** de la fiche 28 : admissibilité duale sur le support $J$, écarts complémentaires ailleurs.

**Test d'optimalité.** Si $z\succeq0$, alors $x$ et $z$ sont primal et dual **optimaux** — le certificat est complet, on s'arrête.

**Sinon.** On choisit $k$ avec $z_k<0$ et on construit $\Delta x$ comme au concept 3. Le coût varie alors selon

$$c^T(x+\alpha\Delta x) = c^Tx - \alpha\,z_J^TA_J\Delta x = c^Tx + \alpha\,z_k$$

(en utilisant $c = -A_J^Tz_J$ et $A_J\Delta x = -(e_k)_J$). Comme $z_k<0$, **le coût décroît strictement** dans la direction $\Delta x$.

**Le point à comprendre.** $z_k$ est exactement le **taux de décroissance** du coût le long de l'arête qui quitte la contrainte $k$. Le vecteur $z$ n'est donc pas seulement un certificat : c'est le tableau des pentes disponibles, et le signe de ses composantes dit s'il reste une descente possible.

## 🔴 Concept 5 — Une itération complète, et la convergence

**L'itération (encadré du cours).** Donné un sommet $x$ d'ensemble actif $J$ :

1. Calculer $z$ par $A_J^Tz_J+c=0$ et $z_j=0$ pour $j\notin J$. **Si $z\succeq0$ : terminer**, $x$ et $z$ sont primal et dual optimaux.
2. Choisir $k$ avec $z_k<0$ et calculer $\Delta x$ par $a_i^T\Delta x=0$ ($i\in J\setminus\{k\}$), $a_k^T\Delta x = -1$. **Si $A\Delta x\preceq0$ : terminer**, le LP est non borné ($p^\star=-\infty$).
3. Poser $J := (J\setminus\{k\})\cup\{j\}$ et $x := x+\hat\alpha\Delta x$ où $$j = \arg\min_{i\,:\,a_i^T\Delta x>0}\frac{b_i-a_i^Tx}{a_i^T\Delta x}, \qquad \hat\alpha = \frac{b_j-a_j^Tx}{a_j^T\Delta x}$$

**Choix du pivot (étape 2).** Si plusieurs $z_k$ sont négatifs, plusieurs variantes existent :

- prendre le $z_k$ **le plus négatif** ;
- prendre celui qui donne la **plus forte baisse** du coût, $\hat\alpha z_k$ ;
- prendre le **plus petit indice** $k$.

Les trois fonctionnent **si tous les sommets sont non dégénérés**.

**Convergence.** Elle découle de deux faits :

- le nombre de points extrêmes est **fini** ;
- le coût **décroît strictement** à chaque étape (car $\hat\alpha>0$ et $z_k<0$), donc aucun sommet n'est visité deux fois.

### Exemple déroulé (celui du cours, 5 itérations)

$$\min\ x_1+x_2-x_3 \quad\text{sous}\quad 0\leq x_i\leq2\ (i=1,2,3),\quad x_1+x_2+x_3\leq5$$

Les sept contraintes, dans l'ordre : $-x_1\leq0$, $-x_2\leq0$, $-x_3\leq0$, $x_1\leq2$, $x_2\leq2$, $x_3\leq2$, $x_1+x_2+x_3\leq5$. L'optimum est $x^\star=(0,0,2)$ ; on démarre au sommet $x=(2,2,0)$.

| It. | $x$ | $J$ | $z$ | $k$ retiré | $\Delta x$ | $\hat\alpha$ | $j$ entrant |
|---|---|---|---|---|---|---|---|
| 1 | $(2,2,0)$ | $\{3,4,5\}$ | $(0,0,-1,-1,-1,0,0)$ | $3$ | $(0,0,1)$ | $1$ | $7$ |
| 2 | $(2,2,1)$ | $\{4,5,7\}$ | $(0,0,0,-2,-2,0,1)$ | $5$ | $(0,-1,1)$ | $1$ | $6$ |
| 3 | $(2,1,2)$ | $\{4,6,7\}$ | $(0,0,0,0,0,2,-1)$ | $7$ | $(0,-1,0)$ | $1$ | $2$ |
| 4 | $(2,0,2)$ | $\{2,4,6\}$ | $(0,1,0,-1,0,1,0)$ | $4$ | $(-1,0,0)$ | $2$ | $1$ |
| 5 | $(0,0,2)$ | $\{1,2,6\}$ | $(1,1,0,0,0,1,0)$ | — | — | — | **optimal** |

**Détail de l'itération 1, à savoir refaire.** Marges : $b-Ax = (2,2,0,0,0,2,1)$, donc $J=\{3,4,5\}$. *Calcul de $z$* : $A_J^Tz_J = -c = (-1,-1,1)$ avec $a_3=(0,0,-1)$, $a_4=(1,0,0)$, $a_5=(0,1,0)$, d'où $z_4=-1$, $z_5=-1$, $z_3=-1$. Il y a des composantes négatives : **pas optimal**, on retire $k=3$. *Calcul de $\Delta x$* : $a_4^T\Delta x=0 \Rightarrow \Delta x_1=0$ ; $a_5^T\Delta x=0\Rightarrow \Delta x_2=0$ ; $a_3^T\Delta x=-1\Rightarrow -\Delta x_3=-1$, donc $\Delta x=(0,0,1)$ — on fait croître $x_3$, ce qui est cohérent avec le coût $-x_3$. *Test du rapport* : $A\Delta x = (0,0,-1,0,0,1,1)$ ; les indices actifs du test sont $6$ (rapport $2/1=2$) et $7$ (rapport $1/1=1$). Donc $\hat\alpha=1$ et $j=7$. *Nouveau sommet* : $x=(2,2,1)$, $J=\{4,5,7\}$.

**À l'itération 5**, $z = (1,1,0,0,0,1,0)\succeq0$ : le certificat dual est valide, $x^\star=(0,0,2)$ est optimal, de coût $-2$.

## 🟠 Concept 6 — Dégénérescence, cyclage et règle de Bland

**Ce qui casse.** Si $x$ est dégénéré, $A_J$ a le rang $n$ mais **n'est pas carrée** ; et si le point suivant est dégénéré, il y a **égalité** dans le test du rapport minimal.

**La parade du cours.**

- définir $J$ comme un **sous-ensemble de $n$ contraintes actives linéairement indépendantes** — $A_J$ redevient carrée, les étapes 1 et 2 fonctionnent comme avant ;
- à l'étape 3, **casser les égalités arbitrairement**.

**Le problème qui subsiste.** On peut obtenir $\hat\alpha = 0$ : le point **ne bouge pas**, seul $J$ change. Cela pourrait être acceptable tant que $J$ continue de changer — mais rien ne le garantit.

**Le cyclage.** Le cours donne l'exemple

$$\min\ -3x_1+5x_2-x_3+2x_4$$

sous sept contraintes, démarré au sommet dégénéré $x = (0,0,0,0)$ avec $J=\{4,5,6,7\}$. Sept itérations plus tard, avec $\hat\alpha = 0$ à chaque fois, on retrouve **exactement** $J = \{4,5,6,7\}$ : l'algorithme **boucle indéfiniment** sans jamais bouger.

**La règle de Bland (« plus petit indice »).** Aucun cyclage ne se produit si l'on applique :

- à l'étape 2, choisir le **plus petit** $k$ pour lequel $z_k<0$ ;
- à l'étape 3, en cas d'égalité, choisir le **plus petit** $j$.

**Structure de la preuve (par l'absurde).** Supposons un cycle : pour $q>p$,

$$x^{(p)}=\dots=x^{(q)}, \qquad J^{(p)}=\dots=J^{(q)}=J^{(p)}$$

Notons $k_s$ l'indice retiré et $j_s$ l'indice ajouté à l'itération $s$, puis $\bar k = \max_{p\leq s\leq q-1}k_s$, $r$ l'itération où $\bar k$ est retiré et $t$ celle où il est réintroduit. En $r$ : $z^{(r)}_{\bar k}<0$, $z^{(r)}_i\geq0$ pour $i\notin J^{(r)}$ avec $i<\bar k$ (sinon on aurait retiré $i$), et $z_i^{(r)}=0$ pour $i\notin J^{(r)}$. En $t$ : $a_{\bar k}^T\Delta x^{(t)}>0$, $a_i^T\Delta x^{(t)}\leq0$ pour $i\notin J^{(r)}$ avec $i<\bar k$, et $a_i^T\Delta x^{(t)}=0$ pour $i\notin J^{(r)}$ avec $i>\bar k$. On en déduit $z^{(r)T}A\Delta x^{(t)}<0$ — contradiction, car $-z^{(r)T}A\Delta x^{(t)} = c^T\Delta x^{(t)}\leq0$. $\blacksquare$

**Sur le même exemple**, la règle de Bland sort du piège : après cinq itérations à $\hat\alpha=0$, l'itération 5 donne enfin $\hat\alpha = 1$ et le point bouge ; l'algorithme se termine à l'itération 8 avec $z\succeq0$.

⚠️ **En pratique.** La règle de Bland garantit la terminaison mais elle est **lente** : les implémentations utilisent une règle rapide (plus négatif, plus forte baisse) et ne basculent sur Bland qu'en cas de blocage détecté.

## 🟠 Concept 7 — Initialisation : la phase I

Le simplexe a besoin d'un **sommet de départ admissible**. Pour un LP à variables bornées

$$\min\ c^Tx \quad\text{sous}\quad Ax\preceq b,\ x\succeq0$$

(une variable libre se scindant en $x_k = x_k^+-x_k^-$), on résout d'abord le **problème de phase I** :

$$\begin{array}{ll}\text{minimiser} & t\\ \text{sous} & Ax\preceq(1-t)\,b\\ & x\succeq0,\quad 0\leq t\leq1\end{array}$$

**Pourquoi ça marche.**

- $x = 0$, $t=1$ est un **point extrême** du problème de phase I : les contraintes $Ax\preceq0$ y sont satisfaites, et il est admissible d'office. On a donc un point de départ **gratuit**.
- On résout la phase I par le simplexe, ce qui donne un sommet optimal $(x^\star,t^\star)$.
- Si $t^\star>0$ : le problème d'origine est **non admissible**.
- Si $t^\star=0$ : $x^\star$ est un **point extrême du problème d'origine** — on démarre la phase II avec lui.

**Le mémo.** La phase I mesure « de combien il faut relâcher $b$ pour que le problème devienne admissible ». Si zéro suffit, le problème l'était déjà.

## 🟢 Concept 8 — Implémentation et complexité

**Le coût dominant** d'une itération est la résolution de **deux** systèmes linéaires :

$$A_J^Tz_J = -c, \qquad A_J\Delta x = -(e_k)_J$$

où $e_k$ est le $k$-ième vecteur de base.

**L'observation clé.** D'une itération à l'autre, **une seule ligne de $A_J$ change**. On ne refactorise donc pas : on **propage une factorisation LU** de $A_J$.

- avec la factorisation, chaque système se résout en $O(n^2)$ opérations ;
- la mise à jour de la factorisation après changement d'une ligne coûte $O(n^2)$ ;
- coût total : $O(n^2)$ par itération — **beaucoup moins si $A$ est creuse**.

**Complexité.**

*Dans le pire des cas* : pour la plupart des règles de pivotage, il existe des exemples où le nombre d'itérations croît **exponentiellement** avec $n$ et $m$. Savoir s'il existe une règle de pivotage garantissant un nombre **polynomial** d'itérations est une **question ouverte**.

*En pratique* : très efficace — le nombre d'itérations croît typiquement de façon **linéaire** en $m$ et $n$.

**Le paradoxe à retenir.** Le simplexe est exponentiel en théorie et excellent en pratique ; l'ellipsoïde (1979) est l'inverse. C'est ce paradoxe qui a motivé les méthodes de points intérieurs (1984), polynomiales **et** rapides.

### Comment résoudre l'exercice type (protocole d'une itération)

1. **Calculer les marges** $b - Ax$ ; les zéros donnent $J$.
2. **Vérifier** que $|J| = n$ et que $A_J$ est inversible (sommet non dégénéré).
3. **Résoudre** $A_J^Tz_J = -c$ ; compléter par $z_j=0$ hors de $J$.
4. **Tester** $z\succeq0$ : si oui, c'est fini — écrire le certificat.
5. **Choisir $k$** avec $z_k<0$ (plus négatif, ou plus petit indice si l'on veut Bland).
6. **Résoudre** $A_J\Delta x = -(e_k)_J$, c'est-à-dire $a_i^T\Delta x=0$ pour $i\in J\setminus\{k\}$ et $a_k^T\Delta x=-1$.
7. **Calculer $A\Delta x$** : si $\preceq0$, le LP est non borné ; sinon faire le **test du rapport minimal** sur les $i$ avec $a_i^T\Delta x>0$.
8. **Mettre à jour** $x$ et $J$, puis recommencer. Vérifier au passage que le coût a bien baissé de $\hat\alpha|z_k|$.

### Exercices progressifs

**Niveau 1** — Au sommet courant, $z = (0,\ 2,\ -1,\ 0,\ 3)$. Que fait-on ?

<details><summary>Correction</summary>

$z$ a une composante négative, $z_3=-1$ : le sommet **n'est pas optimal**. On retire $k=3$ de l'ensemble actif et l'on calcule la direction d'arête correspondante. Si toutes les composantes avaient été $\geq0$, on se serait arrêté avec le certificat dual.

</details>

**Niveau 2** — Sur le polyèdre du concept 2, partez de $x=(0,2)$ avec $J=\{3,4\}$ et faites une itération pour $\min\ x_1 - x_2$.

<details><summary>Correction</summary>

$c = (1,-1)$, $a_3 = (-1,0)$, $a_4=(-1,1)$. *Étape 1* : $A_J^Tz_J = -c = (-1,1)$ donne $-z_3-z_4 = -1$ et $z_4 = 1$, d'où $z_3 = 0$. Donc $z = (0,0,0,1)\succeq0$ : **$x=(0,2)$ est déjà optimal**, de coût $-2$. *Vérification* : la contrainte $-x_1+x_2\leq2$ plafonne $x_2 - x_1$ à $2$, et le coût vaut $x_1-x_2 = -(x_2-x_1)\geq-2$.

</details>

**Niveau 3** — Pourquoi $\hat\alpha>0$ est-il garanti quand le sommet courant est non dégénéré ?

<details><summary>Correction</summary>

Par construction, $A_J\Delta x\preceq0$ : les contraintes actives ne voient pas leur marge diminuer. Donc si $a_i^T\Delta x>0$, nécessairement $i\notin J$, et alors la marge $b_i-a_i^Tx$ est **strictement positive** (contrainte inactive). Tous les rapports du test sont donc strictement positifs, et leur minimum $\hat\alpha$ aussi. **C'est la non-dégénérescence qui garantit cette stricte positivité** : avec un sommet dégénéré, une contrainte active hors de $J$ peut donner une marge nulle, donc $\hat\alpha=0$.

</details>

**Niveau 4 — type feuille d'exercices** — Déroulez l'itération 2 de l'exemple du concept 5 : $x=(2,2,1)$, $J=\{4,5,7\}$.

<details><summary>Correction</summary>

*Marges* : $b-Ax = (2,2,1,0,0,1,0)$ — les contraintes $4$ ($x_1\leq2$), $5$ ($x_2\leq2$) et $7$ ($x_1+x_2+x_3\leq5$) sont actives .

*Étape 1 — calcul de $z$.* $a_4=(1,0,0)$, $a_5=(0,1,0)$, $a_7=(1,1,1)$ et $-c = (-1,-1,1)$ :

$$z_4\begin{pmatrix}1\\0\\0\end{pmatrix}+z_5\begin{pmatrix}0\\1\\0\end{pmatrix}+z_7\begin{pmatrix}1\\1\\1\end{pmatrix} = \begin{pmatrix}-1\\-1\\1\end{pmatrix}$$

La troisième ligne donne $z_7=1$ ; les deux premières $z_4 = -2$ et $z_5=-2$. Donc $z = (0,0,0,-2,-2,0,1)$ . Deux composantes négatives : on retire par exemple $k=5$.

*Étape 2 — direction.* $a_4^T\Delta x = 0\Rightarrow \Delta x_1=0$ ; $a_7^T\Delta x=0\Rightarrow \Delta x_1+\Delta x_2+\Delta x_3=0$ ; $a_5^T\Delta x=-1\Rightarrow \Delta x_2=-1$. D'où $\Delta x = (0,-1,1)$ — on échange une unité de $x_2$ contre une de $x_3$, ce qui fait baisser le coût $x_1+x_2-x_3$ de $2$ par unité, c'est-à-dire $|z_5|$ .

*Étape 3 — rapport minimal.* $A\Delta x = (0,1,-1,0,-1,1,0)$ ; les indices avec $a_i^T\Delta x>0$ sont $2$ (rapport $2/1=2$) et $6$ (rapport $1/1=1$). Donc $\hat\alpha=1$, $j=6$.

*Mise à jour* : $x = (2,2,1)+(0,-1,1) = (2,1,2)$, $J = \{4,6,7\}$ . Le coût passe de $3$ à $1$, soit une baisse de $\hat\alpha|z_5| = 2$ .

</details>

## 🔴 Common mistakes

1. **Faire le test du rapport sur toutes les contraintes** — seulement celles avec $a_i^T\Delta x>0$ : les autres voient leur marge augmenter ou rester constante.
2. **Oublier le signe $-1$** dans $a_k^T\Delta x=-1$ — c'est lui qui fait **quitter** la contrainte $k$ vers l'intérieur ; avec $+1$ on sort du polyèdre.
3. **Conclure « non borné » trop vite** — il faut $A\Delta x\preceq0$ **en entier**, pas seulement quelques composantes.
4. **Confondre extrémalité et dégénérescence** — la première est géométrique, la seconde dépend de la description $(A,b)$.
5. **Utiliser un $J$ de taille $\neq n$ en cas de dégénérescence** — il faut en extraire $n$ contraintes actives **indépendantes**.
6. **Croire qu'un pas nul est une erreur** — $\hat\alpha=0$ est normal en dégénérescence ; le danger est qu'il se répète en boucle (cyclage).
7. **Oublier la phase I** — le simplexe ne démarre pas sans sommet admissible, et $x=0$ ne l'est pas en général.

## 📌 Ultimate Review

1. Hypothèse : ensemble admissible non vide et **pointu** ($\mathbf{rank}(A)=n$) ; variables libres scindées en $x^+-x^-$.
2. Sommet **non dégénéré** : exactement $n$ contraintes actives, $A_J$ carrée inversible, $x=A_J^{-1}b_J$.
3. Sommets **adjacents** : $n-1$ contraintes actives communes — reliés par une arête.
4. Direction d'arête : $a_i^T\Delta x=0$ ($i\in J\setminus\{k\}$), $a_k^T\Delta x=-1$.
5. **Test du rapport minimal** : $\hat\alpha = \min_{i:a_i^T\Delta x>0}(b_i-a_i^Tx)/(a_i^T\Delta x)$.
6. Certificat : $A_J^Tz_J+c=0$, $z_j=0$ hors de $J$ ; **$z\succeq0$ $\Rightarrow$ optimal** ; $A\Delta x\preceq0$ $\Rightarrow$ non borné.
7. Baisse du coût : $c^T(x+\alpha\Delta x) = c^Tx+\alpha z_k$, avec $z_k<0$.
8. Convergence : nombre fini de sommets $+$ décroissance stricte. **Dégénérescence $\Rightarrow$ pas nul possible $\Rightarrow$ cyclage** ; parade : **règle de Bland** (plus petit indice partout).
9. **Phase I** : $\min t$ s.c. $Ax\preceq(1-t)b$, $x\succeq0$, $0\leq t\leq1$ ; départ $(0,1)$ ; $t^\star>0$ $\Rightarrow$ non admissible.
10. Implémentation : LU propagée, $O(n^2)$ par itération. Exponentiel dans le pire cas, linéaire en pratique.

**Formulas to know**

$$A_J^Tz_J+c=0 \qquad a_i^T\Delta x = 0\ (i\in J\setminus\{k\}),\ a_k^T\Delta x=-1 \qquad \hat\alpha=\min_{i:a_i^T\Delta x>0}\frac{b_i-a_i^Tx}{a_i^T\Delta x}$$

**Methods to know** : le protocole d'itération en 8 étapes ; le test du rapport minimal ; la règle de Bland ; la construction de la phase I.

## 🧠 Active Recall

**Basic** — Quels sont les deux critères d'arrêt du simplexe, et que signifient-ils ?

<details><summary>Réponse</summary>

**$z\succeq0$** à l'étape 1 : le candidat dual est admissible et complémentaire, donc $x$ est **optimal** — c'est le certificat de la fiche 28. **$A\Delta x\preceq0$** à l'étape 2 : la demi-droite $x+\alpha\Delta x$ est entièrement admissible et le coût y décroît sans borne, donc le LP est **non borné**.

</details>

**Understanding** — Pourquoi le coût décroît-il exactement de $\hat\alpha\,|z_k|$ à chaque itération ?

<details><summary>Réponse</summary>

Parce que $c = -A_J^Tz_J$ et $A_J\Delta x = -(e_k)_J$, d'où $c^T\Delta x = -z_J^TA_J\Delta x = z_k$. Le coût le long de l'arête vaut donc $c^Tx+\alpha z_k$, et après un pas $\hat\alpha$ il a baissé de $\hat\alpha|z_k|$, puisque $z_k<0$.

</details>

**Application** — À un sommet, $J = \{2,5\}$ dans $\mathbb{R}^2$, et on retire $k=2$. Quelles équations définissent $\Delta x$ ?

<details><summary>Réponse</summary>

$a_5^T\Delta x = 0$ (on reste sur la contrainte conservée) et $a_2^T\Delta x = -1$ (on quitte la contrainte $2$ vers l'intérieur). Deux équations, deux inconnues, système inversible car $A_J$ l'est.

</details>

**Comparison** — Règle du « plus négatif » et règle de Bland : quels avantages respectifs ?

<details><summary>Réponse</summary>

*Plus négatif* : progression rapide en pratique, mais **aucune garantie** contre le cyclage en présence de dégénérescence. *Bland* : terminaison **garantie**, mais souvent beaucoup plus lente. En pratique on utilise la première et l'on bascule sur Bland si un blocage est détecté.

</details>

**Exam-style** — Expliquez le rôle de la phase I et ce qu'on conclut de sa valeur optimale.

<details><summary>Réponse</summary>

La phase I résout $\min t$ s.c. $Ax\preceq(1-t)b$, $x\succeq0$, $0\leq t\leq1$, dont $(x,t)=(0,1)$ est un sommet admissible **immédiat**. Sa valeur optimale $t^\star$ mesure le relâchement minimal nécessaire : si $t^\star>0$, aucun $x$ ne satisfait $Ax\preceq b$, le problème d'origine est **non admissible** ; si $t^\star=0$, le $x^\star$ obtenu est un **point extrême admissible** du problème d'origine, et sert de départ à la phase II.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Qui et quand a inventé le simplexe ? | George Dantzig, 1947 |
| Hypothèse de départ ? | Ensemble admissible non vide et **pointu** ($\mathbf{rank}(A)=n$) |
| Sommet non dégénéré ? | Exactement $n$ contraintes actives ; $A_J$ carrée inversible |
| Sommets adjacents ? | $n-1$ contraintes actives communes |
| Équations de la direction d'arête ? | $a_i^T\Delta x=0$ pour $i\in J\setminus\{k\}$, $a_k^T\Delta x=-1$ |
| Test du rapport minimal ? | $\hat\alpha=\min_{i:a_i^T\Delta x>0}(b_i-a_i^Tx)/(a_i^T\Delta x)$ |
| Comment calcule-t-on $z$ ? | $A_J^Tz_J+c=0$ et $z_j=0$ hors de $J$ |
| Critère d'optimalité ? | $z\succeq0$ |
| Critère de non-bornitude ? | $A\Delta x\preceq0$ |
| Baisse du coût par itération ? | $\hat\alpha\,\vert z_k\vert$ |
| D'où vient la convergence ? | Nombre fini de sommets + décroissance stricte du coût |
| Qu'est-ce que le cyclage ? | Une suite d'itérations à $\hat\alpha=0$ qui revient au même $J$ |
| Règle de Bland ? | Plus petit $k$ avec $z_k<0$ ; plus petit $j$ en cas d'égalité |
| Problème de phase I ? | $\min t$ s.c. $Ax\preceq(1-t)b$, $x\succeq0$, $0\leq t\leq1$ |
| Coût d'une itération ? | $O(n^2)$ via une factorisation LU propagée |
| Complexité dans le pire cas ? | Exponentielle pour la plupart des règles ; polynomiale en pratique |
