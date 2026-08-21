# Fiche 28 — Dualité en programmation linéaire

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 6 « Duality », 23 diapositives |
| **Difficulté** | Must know — le sommet théorique du cours |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiches 24–27 (formes d'un LP, faces, cônes de récession), fiche 13 (KKT) |
| **Poids à l'examen** | Le certificat d'optimalité par le dual et les **écarts complémentaires** sont les deux outils qui permettent de *prouver* qu'une solution est optimale sans rien recalculer. C'est aussi le pont direct vers la théorie économique des prix. |
| **Concepts clés** | Problème dual, dualité faible, saut de dualité, dualité forte, écarts complémentaires, ensemble optimal, complémentarité stricte |

## 🎯 Vue d'ensemble

À tout LP (le **primal**) correspond un second LP (le **dual**), construit avec les mêmes données $c$, $A$, $b$. Deux faits en découlent, et ils suffisent à structurer tout le chapitre.

**Dualité faible** — toute solution admissible du dual fournit une **borne inférieure** sur la valeur optimale du primal. C'est gratuit, sans hypothèse.

**Dualité forte** — la meilleure de ces bornes est **exacte** : $p^\star = d^\star$, sauf dans un seul cas pathologique (primal et dual tous deux non admissibles).

```
PRIMAL  min cᵀx  s.c. Ax ≼ b        →  valeur p*
DUAL    max −bᵀz  s.c. Aᵀz + c = 0, z ≽ 0  →  valeur d*
                    dualité faible :  d* ≤ p*  (toujours)
                    dualité forte  :  d* = p*  (sauf exception)
```

**Ce que ça change en pratique.** Vous n'avez plus besoin de résoudre pour prouver : il suffit d'**exhiber** un $z$ dual admissible dont la valeur égale celle de votre $x$. C'est un **certificat** vérifiable en quelques produits scalaires.

## 🔴 Concept 1 — Le couple primal-dual

Le cours définit deux LP à partir des **mêmes** paramètres $c\in\mathbb{R}^n$, $A\in\mathbb{R}^{m\times n}$, $b\in\mathbb{R}^m$.

**LP sous forme d'inégalités** (le primal) :

$$\begin{array}{ll}\text{minimiser} & c^Tx\\ \text{sous} & Ax\preceq b\end{array}$$

**LP sous forme standard** (le dual) :

$$\begin{array}{ll}\text{maximiser} & -b^Tz\\ \text{sous} & A^Tz + c = 0\\ & z\succeq0\end{array}$$

Le second s'appelle le **dual** du premier ; dans ce contexte, le premier s'appelle le problème **primal**.

**Le mémo de construction.** Le dual a **une variable par contrainte du primal** ($z\in\mathbb{R}^m$, autant que de lignes de $A$) et **une contrainte par variable du primal** ($A^Tz+c=0$, autant d'équations que de colonnes de $A$). Les rôles de $b$ et $c$ s'échangent : $b$ passe dans l'objectif, $c$ dans les contraintes.

**Notations.** $p^\star$ est la valeur optimale primale, $d^\star$ la duale, avec les conventions de la fiche 24 :

|  | Primal | Dual |
|---|---|---|
| non admissible | $p^\star=+\infty$ | $d^\star=-\infty$ |
| non borné | $p^\star=-\infty$ | $d^\star=+\infty$ |

## 🔴 Concept 2 — Dualité faible

**Propriété de borne inférieure.** Si $x$ est primal admissible et $z$ dual admissible, alors

$$c^Tx \geq -b^Tz$$

**Démonstration (une ligne, à savoir refaire).** De $Ax\preceq b$, $A^Tz+c=0$ et $z\succeq0$ :

$$0 \leq z^T(b-Ax) = b^Tz - z^TAx = b^Tz - (A^Tz)^Tx = b^Tz + c^Tx$$

(la première inégalité vient du produit de deux vecteurs positifs composante par composante ; la dernière égalité de $A^Tz = -c$). $\blacksquare$

La quantité

$$c^Tx + b^Tz$$

s'appelle le **saut de dualité** (*duality gap*) associé au couple admissible $(x,z)$ : il est **toujours positif ou nul**.

**Conséquence immédiate — dualité faible :**

$$d^\star \leq p^\star \qquad\text{(sans exception)}$$

⚠️ La dualité faible ne demande **aucune hypothèse** : ni admissibilité, ni bornitude, ni régularité. C'est la seule chose qu'on puisse affirmer avant tout calcul — et c'est déjà énorme, car elle transforme « trouver l'optimum » en « faire coïncider deux bornes ».

## 🔴 Concept 3 — Dualité forte et le théorème de dualité

**Théorème de dualité (énoncé du cours).** Si le problème primal **ou** le dual est admissible, alors

$$p^\star = d^\star$$

De plus, si cette valeur commune est **finie**, les optima primal et dual sont **atteints**.

> La seule exception à $p^\star=d^\star$ se produit quand primal **et** dual sont tous deux non admissibles.

**Dualité forte.** Si primal et dual sont tous deux admissibles, il existe $x^\star$ et $z^\star$ vérifiant

$$c^Tx^\star = -b^Tz^\star, \qquad Ax^\star\preceq b, \qquad A^Tz^\star+c = 0, \qquad z^\star\succeq0$$

Combiné à la borne inférieure, cela donne : $x^\star$ est primal optimal, $z^\star$ dual optimal, et $p^\star = c^Tx^\star = -b^Tz^\star = d^\star$, **finie**.

**Structure de la preuve (celle du cours).** On veut montrer l'existence de $(x,z)$ solution de

$$\begin{pmatrix}A & 0\\ 0 & -I\\ c^T & b^T\end{pmatrix}\begin{pmatrix}x\\z\end{pmatrix} \preceq \begin{pmatrix}b\\0\\0\end{pmatrix}, \qquad -A^Tz = c$$

La propriété de borne inférieure impose que toute solution vérifie en fait $c^Tx+b^Tz = 0$. Pour prouver l'existence, on montre que le **système alternatif**

$$u\succeq0,\quad t\geq0,\quad A^Tu + tc = 0,\quad Aw\preceq tb,\quad b^Tu + c^Tw < 0$$

n'a **aucune** solution (c'est un lemme d'alternative de type Farkas, établi à la leçon précédente). Trois cas :

- si $t>0$, poser $\tilde x = w/t$ et $\tilde z = u/t$ donne un couple admissible avec $c^T\tilde x < -b^T\tilde z$ : contradiction avec la borne inférieure ;
- si $t=0$ et $b^Tu<0$, alors $u\succeq0$, $A^Tu=0$, $b^Tu<0$ contredit l'**admissibilité du primal** ;
- si $t=0$ et $c^Tw<0$, alors $Aw\preceq0$, $c^Tw<0$ contredit l'**admissibilité du dual**. $\blacksquare$

### Les cas dégénérés

**Primal non admissible.** Si $p^\star=+\infty$, alors $d^\star=+\infty$ ou $d^\star=-\infty$. *Preuve :* la non-admissibilité du primal fournit $w$ avec $w\succeq0$, $A^Tw=0$, $b^Tw<0$. Si le dual est admissible en $z$, alors pour tout $t\geq0$ :

$$z+tw\succeq0, \qquad A^T(z+tw)+c = A^Tz+c = 0$$

donc $z+tw$ reste dual admissible, et $-b^T(z+tw) = -b^Tz - t\,b^Tw \to +\infty$ : **le dual est non borné**.

**Dual non admissible.** Si $d^\star=-\infty$, alors $p^\star=-\infty$ ou $p^\star=+\infty$. *Preuve :* la non-admissibilité du dual fournit $y$ avec $Ay\preceq0$, $c^Ty<0$. Si le primal est admissible en $x$, alors $A(x+ty)\preceq b$ pour tout $t\geq0$, et $c^T(x+ty) = c^Tx + t\,c^Ty\to-\infty$ : **le primal est non borné**.

**L'exception, en un exemple.** Le cours donne le seul cas où $p^\star = +\infty$ et $d^\star=-\infty$ coexistent :

$$\text{primal :}\quad \min\ x \ \text{ s.c. } 0\cdot x \leq -1 \qquad\qquad \text{dual :}\quad \max\ z \ \text{ s.c. } 0\cdot z + 1 = 0,\ z\geq0$$

La contrainte primale $0\leq-1$ est impossible : $p^\star=+\infty$. La contrainte duale $1=0$ est impossible : $d^\star=-\infty$. Les deux problèmes sont non admissibles, et $p^\star\neq d^\star$.

**Le tableau de synthèse (slide 6-11).**

|  | $p^\star=+\infty$ | $p^\star$ finie | $p^\star=-\infty$ |
|---|---|---|---|
| $d^\star=+\infty$ | **primal non adm.** | exclu | exclu |
| $d^\star$ finie | exclu | **valeurs égales, atteintes** | exclu |
| $d^\star=-\infty$ | **exception** | exclu | **primal non borné / dual non adm.** |

Toute la partie supérieure droite est exclue par la **dualité faible** ($d^\star\leq p^\star$). La première colonne et la dernière ligne viennent des deux cas dégénérés ci-dessus, le centre de la dualité forte.

## 🟠 Concept 4 — Les variantes

Le cours donne les duaux des deux autres formes usuelles. Ils s'obtiennent en convertissant le primal en forme d'inégalités, et **les mêmes résultats de dualité s'appliquent**.

**LP avec inégalités et égalités :**

$$\begin{array}{ll}\text{minimiser} & c^Tx\\ \text{sous} & Ax\preceq b\\ & Cx = d\end{array} \qquad\longleftrightarrow\qquad \begin{array}{ll}\text{maximiser} & -b^Tz - d^Ty\\ \text{sous} & A^Tz + C^Ty + c = 0\\ & z\succeq0\end{array}$$

**LP en forme standard :**

$$\begin{array}{ll}\text{minimiser} & c^Tx\\ \text{sous} & Ax = b\\ & x\succeq0\end{array} \qquad\longleftrightarrow\qquad \begin{array}{ll}\text{maximiser} & b^Ty\\ \text{sous} & A^Ty\preceq c\end{array}$$

⚠️ Retenez la règle de signe : une variable duale associée à une **inégalité** est **contrainte en signe** ($z\succeq0$) ; celle associée à une **égalité** est **libre** ($y$ sans contrainte). C'est la source d'erreur la plus fréquente en dualisation.

## 🟠 Concept 5 — Deux duaux à connaître

### Minimisation affine par morceaux

$$\min_x\ f(x) = \max_{i=1,\dots,m}(a_i^Tx+b_i)$$

La formulation LP (fiche 25) est $\min t$ s.c. $\begin{pmatrix}A & -\mathbf1\end{pmatrix}\binom{x}{t}\preceq -b$. Son **dual** est

$$\begin{array}{ll}\text{maximiser} & b^Tz\\ \text{sous} & A^Tz = 0\\ & \mathbf1^Tz = 1\\ & z\succeq0\end{array}$$

**Interprétation (le cours la détaille).** Pour tout $z\succeq0$ avec $\sum_iz_i=1$, un maximum majore toute moyenne pondérée :

$$f(x) = \max_i(a_i^Tx+b_i) \geq z^T(Ax+b) \qquad \text{pour tout } x$$

En minimisant les deux membres :

$$\min_x f(x) \geq \min_x z^T(Ax+b) = \begin{cases} b^Tz & \text{si } A^Tz = 0\\ -\infty & \text{sinon}\end{cases}$$

Le dual consiste donc à **chercher la meilleure borne inférieure de ce type**, et la dualité forte affirme qu'elle est **exacte**.

### Approximation en norme infinie

$$\min_x\ \|Ax-b\|_\infty$$

La formulation LP (fiche 25) donne un dual à deux blocs $u,v$, que le cours simplifie en

$$\begin{array}{ll}\text{maximiser} & b^Tz\\ \text{sous} & A^Tz = 0,\quad \|z\|_1\leq1\end{array}$$

**Équivalence des deux duaux (preuve du cours).** Si $(u,v)$ est admissible pour la version à deux blocs, $z = v-u$ convient : $\|z\|_1 = \sum_i|v_i-u_i| \leq \mathbf1^Tv+\mathbf1^Tu = 1$, et les objectifs coïncident, $b^Tz = b^T(v-u)$. Réciproquement, si $\|z\|_1\leq1$, on pose

$$u_i = \max\{z_i,0\}+\gamma, \qquad v_i = \max\{-z_i,0\}+\gamma, \qquad \gamma = \frac{1-\|z\|_1}{2m}$$

qui sont admissibles avec le même objectif. $\blacksquare$

**Interprétation.** Le lemme $u^Tv \leq \|u\|_1\|v\|_\infty$ donne, pour tout $z$ avec $\|z\|_1\leq1$,

$$\|Ax-b\|_\infty \geq z^T(Ax-b)$$

d'où la même mécanique : minimiser à droite donne $-b^Tz$ si $A^Tz=0$, et le dual cherche la meilleure de ces bornes.

**Le motif commun.** Dans les deux cas, le dual est né d'une **inégalité de dualité entre normes** ou entre max et moyenne, et il consiste à optimiser le paramètre de cette inégalité. C'est la façon la plus rapide de deviner un dual sans calcul matriciel.

## 🔴 Concept 6 — Conditions d'optimalité et écarts complémentaires

Pour le couple primal-dual général (inégalités + égalités), $x$ et $(y,z)$ sont primal et dual optimaux **si et seulement si** :

1. $x$ est **primal admissible** : $Ax\preceq b$ et $Cx = d$ ;
2. $(y,z)$ est **dual admissible** : $A^Tz+C^Ty+c=0$ et $z\succeq0$ ;
3. le **saut de dualité est nul** : $c^Tx = -b^Tz-d^Ty$.

**Réécriture du saut de dualité.** Pour $x$ primal admissible et $(y,z)$ dual admissible :

$$c^Tx + b^Tz + d^Ty = (b-Ax)^Tz + (d-Cx)^Ty = (b-Ax)^Tz = \sum_{i=1}^m z_i\,(b_i - a_i^Tx)$$

(le terme en $y$ disparaît car $Cx=d$).

**Écarts complémentaires (*complementary slackness*).** Chaque terme de la somme est $\geq0$ ; la somme est nulle **si et seulement si** chaque terme l'est :

$$\boxed{\ z_i\,(b_i - a_i^Tx) = 0, \qquad i=1,\dots,m\ }$$

Autrement dit, à l'optimum, $b-Ax$ et $z$ ont des **supports complémentaires** :

$$z_i>0 \ \Longrightarrow\ a_i^Tx = b_i, \qquad\qquad a_i^Tx<b_i \ \Longrightarrow\ z_i = 0$$

**En français.** Une contrainte **non saturée** a un prix dual **nul** (elle ne coûte rien : il en reste). Une contrainte de **prix strictement positif** est nécessairement **saturée**. C'est l'énoncé mathématique de « seules les ressources rares ont un prix ».

### Interprétation géométrique

Exemple du cours dans $\mathbb{R}^2$ : à l'optimum, deux contraintes sont actives, $a_1^Tx^\star=b_1$ et $a_2^Tx^\star=b_2$. La solution duale vérifie $A^Tz+c=0$, $z\succeq0$, $z_i=0$ pour $i\notin\{1,2\}$, autrement dit

$$-c = z_1a_1 + z_2a_2, \qquad z_1\geq0,\ z_2\geq0$$

**Lecture.** $-c$ (la direction de descente) appartient au **cône engendré par les normales des contraintes actives**. Si ce n'était pas le cas, une direction admissible ferait encore baisser l'objectif. C'est exactement la condition de stationnarité de KKT (fiche 13), ici en version purement linéaire — et le lien avec la colinéarité des gradients de Lagrange (fiche 7) est direct : les $z_i$ sont les multiplicateurs.

### Exemple complet du cours

$$\begin{array}{ll}\text{minimiser} & -4x_1-5x_2\\ \text{sous} & -x_1\leq0,\quad 2x_1+x_2\leq3,\quad -x_2\leq0,\quad x_1+2x_2\leq3\end{array}$$

**Montrons que $x^\star=(1,1)$ est optimal.**

*Étape 1 — contraintes actives.* $-1<0$, $2+1=3$ , $-1<0$, $1+2=3$ : les contraintes **2 et 4** sont actives.

*Étape 2 — support imposé au dual.* Par complémentarité, tout $z$ dual optimal est de la forme $z = (0,z_2,0,z_4)$.

*Étape 3 — admissibilité duale.* La condition $A^Tz+c=0$ s'écrit, avec $a_2 = (2,1)$ et $a_4 = (1,2)$ :

$$\begin{pmatrix}2&1\\1&2\end{pmatrix}\begin{pmatrix}z_2\\z_4\end{pmatrix} = \begin{pmatrix}4\\5\end{pmatrix}, \qquad z_2\geq0,\ z_4\geq0$$

*Étape 4 — résolution.* $2z_2+z_4=4$ et $z_2+2z_4=5$ donnent $3z_2 = 3$, soit $z_2 = 1$ et $z_4 = 2$, tous deux positifs.

*Conclusion.* $z^\star=(0,1,0,2)$ est dual admissible **avec le bon support** : cela **prouve** que $x^\star=(1,1)$ est optimal. Vérification des valeurs : $c^Tx^\star = -9$ et $-b^Tz^\star = -(0\cdot0+3\cdot1+0\cdot0+3\cdot2) = -9$ .

## 🟠 Concept 7 — Ensemble optimal et complémentarité stricte

**Structure de l'ensemble optimal.** Supposons la valeur optimale finie, soit $(y^\star,z^\star)$ une solution duale optimale quelconque et $J = \{i \mid z_i^\star>0\}$. Alors $x$ est optimal **si et seulement si** il est admissible et satisfait la complémentarité avec $z^\star$ :

$$a_i^Tx = b_i \ \text{ pour } i\in J, \qquad a_i^Tx\leq b_i \ \text{ pour } i\notin J, \qquad Cx = d$$

**Conclusion (du cours).** L'ensemble optimal est une **face** du polyèdre $\{x\mid Ax\preceq b,\ Cx=d\}$ — au sens exact de la fiche 26. Un LP n'a donc jamais « quelques » solutions optimales éparpillées : soit une seule (un sommet), soit toute une face (arête, facette…).

**Complémentarité stricte.** Les solutions optimales ne sont pas forcément uniques, et tout couple optimal vérifie $z_i(b_i-a_i^Tx)=0$, ce qui laisse **trois** situations possibles pour chaque $i$ :

$$a_i^Tx<b_i \text{ et } z_i=0 \qquad\text{ou}\qquad a_i^Tx=b_i \text{ et } z_i>0 \qquad\text{ou}\qquad a_i^Tx=b_i \text{ et } z_i=0$$

Un couple est dit **strictement complémentaire** si le troisième cas (le cas « dégénéré ») ne se produit pour aucun $i$. Le cours signale qu'**il existe toujours** des solutions strictement complémentaires dès que la valeur optimale est finie (exercice 72).

### Comment résoudre l'exercice type (protocole)

1. **Mettre le primal dans une forme reconnue** — inégalités, standard, ou mixte.
2. **Écrire le dual** : une variable par contrainte, une contrainte par variable ; $z\succeq0$ pour les inégalités, $y$ libre pour les égalités ; $b$ et $c$ échangent leurs rôles.
3. **Vérifier l'admissibilité** du candidat primal $x$ et calculer $c^Tx$.
4. **Repérer les contraintes actives** en $x$ : c'est ce qui impose le **support** de $z$.
5. **Résoudre le système dual restreint** $A_J^Tz_J = -c$ avec $z_J\succeq0$.
6. **Conclure** : si un tel $z$ existe, $x$ est optimal — le certificat est complet. Si le système n'a pas de solution positive, $x$ **n'est pas** optimal.
7. **Vérifier** que $c^Tx = -b^Tz$ : le saut de dualité doit être exactement nul.

### Comment reconnaître qu'il faut passer au dual

| Situation | Réflexe |
|---|---|
| « Montrez que $x$ est optimal » | Certificat dual : contraintes actives, puis $A_J^Tz_J=-c$, $z_J\succeq0$ |
| « Quelle est la valeur d'une unité de ressource ? » | $z_i$ — le prix implicite de la contrainte $i$ |
| Le primal a beaucoup de contraintes et peu de variables | Le dual a peu de contraintes : il peut être plus facile à résoudre |
| « Le problème est-il non borné ? » | Si le primal est non borné, le dual est **non admissible** — et c'est souvent plus rapide à voir |
| « Bornez la valeur optimale » | N'importe quel $z$ dual admissible donne la borne $-b^Tz$ |

### Exercices progressifs

**Niveau 1** — Écrivez le dual de $\min\ 3x_1+2x_2$ sous $x_1+x_2\geq1$, $x\succeq0$.

<details><summary>Correction</summary>

Mettons sous la forme $Ax\preceq b$ : $-x_1-x_2\leq-1$, $-x_1\leq0$, $-x_2\leq0$, avec $c=(3,2)$, $b=(-1,0,0)$ et

$$A = \begin{pmatrix}-1&-1\\-1&0\\0&-1\end{pmatrix}$$

Le dual est $\max -b^Tz = z_1$ sous $A^Tz+c=0$, $z\succeq0$, soit

$$-z_1-z_2+3 = 0,\quad -z_1-z_3+2=0,\quad z\succeq0$$

donc $z_2 = 3-z_1\geq0$ et $z_3 = 2-z_1\geq0$ : le dual se réduit à $\max z_1$ sous $0\leq z_1\leq2$. Valeur $d^\star = 2$. *Contrôle :* le primal, minimiser $3x_1+2x_2$ sur $x_1+x_2\geq1$, $x\succeq0$, est optimal en $(0,1)$ de valeur $2$ — on prend tout du bien le moins cher.

</details>

**Niveau 2** — Sur le LP du concept 6, montrez que $x = (0,3/2)$ **n'est pas** optimal, par le dual.

<details><summary>Correction</summary>

Admissibilité : $-0\leq0$ , $0+3/2 = 3/2\leq3$ , $-3/2\leq0$ , $0+3 = 3\leq3$ : $x$ est admissible, valeur $c^Tx = -15/2$. Contraintes actives : la **1** ($-x_1 = 0$) et la **4** ($x_1+2x_2=3$). Le dual devrait donc être porté par $\{1,4\}$ :

$$z_1a_1 + z_4a_4 = -c \iff z_1\begin{pmatrix}-1\\0\end{pmatrix} + z_4\begin{pmatrix}1\\2\end{pmatrix} = \begin{pmatrix}4\\5\end{pmatrix}$$

La deuxième ligne donne $2z_4 = 5$, soit $z_4 = 5/2$ ; la première $-z_1+5/2 = 4$, soit $z_1 = -3/2 < 0$. **La positivité échoue** : aucun certificat n'existe, $x$ n'est pas optimal. *Confirmation :* $c^Tx = -7{,}5 > -9 = c^Tx^\star$. Géométriquement, $-c=(4,5)$ n'est **pas** dans le cône engendré par $a_1$ et $a_4$.

</details>

**Niveau 3** — Un LP a $p^\star = -\infty$. Que peut-on dire de son dual ? Et si le dual est non admissible, que peut-on dire du primal ?

<details><summary>Correction</summary>

Si $p^\star=-\infty$, la dualité faible $d^\star\leq p^\star$ force $d^\star=-\infty$ : le dual est **non admissible** (un problème de maximisation de valeur $-\infty$ est vide). Réciproquement, si le dual est non admissible ($d^\star=-\infty$), le théorème du slide 6-9 donne deux possibilités : $p^\star=-\infty$ (primal non borné) **ou** $p^\star=+\infty$ (primal non admissible aussi — c'est l'exception). **On ne peut donc pas conclure dans ce sens** sans vérifier l'admissibilité du primal.

</details>

**Niveau 4 — type feuille d'exercices** — Une usine maximise $4x_1+5x_2$ sous $2x_1+x_2\leq3$ (heures machine A), $x_1+2x_2\leq3$ (heures machine B), $x\succeq0$. Résolvez, donnez les prix implicites des deux machines, et dites laquelle il faut agrandir en priorité.

<details><summary>Correction</summary>

C'est le LP du concept 6 écrit en maximisation. L'optimum est $x^\star=(1,1)$, profit $9$, et les deux machines sont **saturées**.

**Prix implicites** : les variables duales $z_2 = 1$ (machine A) et $z_4 = 2$ (machine B) — trouvées en résolvant $2z_2+z_4=4$, $z_2+2z_4=5$.

**Lecture économique.** Une heure supplémentaire sur la machine A rapporterait environ $1$ ; une heure sur la machine B, environ $2$. **C'est la machine B qu'il faut agrandir en priorité** : son heure marginale vaut deux fois plus. On vérifie la cohérence globale : $3\times1 + 3\times2 = 9$, soit exactement le profit — **toute la valeur créée se répartit entre les ressources rares**, à leur prix implicite. C'est le théorème de dualité forte lu en économiste.

*(La sensibilité au-delà d'une unité, et jusqu'où le prix implicite reste valable, est l'objet de la fiche 29.)*

</details>

## 🔴 Common mistakes

1. **Se tromper de sens dans la borne** — le dual **minore** le primal : $-b^Tz \leq c^Tx$. Écrire l'inverse rend tous les certificats faux.
2. **Contraindre le signe d'une variable duale d'égalité** — $z\succeq0$ pour les **inégalités** seulement ; la variable $y$ d'une égalité est **libre**.
3. **Oublier une contrainte de signe du primal** — $x\succeq0$ est une contrainte comme une autre, avec sa propre variable duale.
4. **Croire à $p^\star=d^\star$ sans condition** — l'exception existe : primal et dual tous deux non admissibles.
5. **Conclure « $x$ optimal » sans vérifier $z\succeq0$** — le système $A_J^Tz_J=-c$ peut avoir une solution **négative** : le certificat échoue alors (exercice de niveau 2).
6. **Chercher $z$ sur toutes les composantes** — la complémentarité impose $z_i=0$ hors des contraintes actives : cela réduit le système à résoudre.
7. **Confondre les trois cas de complémentarité** — $a_i^Tx=b_i$ **et** $z_i=0$ est parfaitement possible : c'est le cas dégénéré, exclu seulement par la complémentarité **stricte**.

## 📌 Ultimate Review

1. Primal $\min c^Tx$ s.c. $Ax\preceq b$ ; dual $\max -b^Tz$ s.c. $A^Tz+c=0$, $z\succeq0$.
2. Une variable duale par contrainte primale, une contrainte duale par variable primale ; $b$ et $c$ échangent leurs rôles.
3. **Dualité faible** $c^Tx\geq-b^Tz$, donc $d^\star\leq p^\star$ — sans aucune hypothèse. Saut de dualité $= c^Tx+b^Tz\geq0$.
4. **Dualité forte** : si l'un des deux est admissible, $p^\star=d^\star$ ; si finie, les optima sont atteints. Seule exception : les deux non admissibles.
5. Primal non admissible $\Rightarrow$ dual non borné ou non admissible ; dual non admissible $\Rightarrow$ primal non borné ou non admissible.
6. Variables duales : $z\succeq0$ pour une inégalité, $y$ libre pour une égalité.
7. **Écarts complémentaires** : $z_i(b_i-a_i^Tx)=0$ — une contrainte non saturée a un prix nul.
8. Géométrie : $-c$ appartient au cône engendré par les normales des contraintes actives.
9. L'ensemble optimal est une **face** du polyèdre admissible ; il existe toujours un couple **strictement complémentaire**.

**Formulas to know**

$$c^Tx \geq -b^Tz \qquad \text{saut} = c^Tx+b^Tz = (b-Ax)^Tz \qquad z_i(b_i-a_i^Tx)=0 \qquad -c = \sum_{i\in J} z_ia_i,\ z_J\succeq0$$

**Methods to know** : le protocole du certificat dual en 7 étapes ; la lecture des prix implicites ; le tableau des cas dégénérés.

## 🧠 Active Recall

**Basic** — Écrivez le dual de $\min c^Tx$ s.c. $Ax\preceq b$ et démontrez la dualité faible.

<details><summary>Réponse</summary>

Dual : $\max -b^Tz$ s.c. $A^Tz+c=0$, $z\succeq0$. Preuve : si $Ax\preceq b$ et $z\succeq0$, alors $z^T(b-Ax)\geq0$ ; en développant, $b^Tz - (A^Tz)^Tx = b^Tz + c^Tx \geq 0$, donc $c^Tx\geq -b^Tz$.

</details>

**Understanding** — Pourquoi une contrainte non saturée a-t-elle nécessairement un prix dual nul ?

<details><summary>Réponse</summary>

Le saut de dualité vaut $\sum_i z_i(b_i-a_i^Tx)$, somme de termes positifs. À l'optimum il est nul, donc chaque terme l'est. Si la contrainte $i$ n'est pas saturée, $b_i-a_i^Tx>0$, ce qui force $z_i=0$. Économiquement : une ressource dont il reste ne vaut rien à la marge.

</details>

**Application** — Le primal est admissible et non borné. Que vaut $d^\star$, et le dual est-il admissible ?

<details><summary>Réponse</summary>

$p^\star=-\infty$ ; par dualité faible $d^\star\leq p^\star = -\infty$, donc $d^\star=-\infty$ : le dual est **non admissible**. Autrement dit, l'existence d'une seule solution duale admissible suffirait à borner le primal.

</details>

**Comparison** — Dualité faible et dualité forte : quelles hypothèses, quelle utilité ?

<details><summary>Réponse</summary>

*Faible* : aucune hypothèse, valable toujours ; elle donne des **bornes** et exclut la moitié du tableau des cas. *Forte* : exige qu'un des deux problèmes soit admissible ; elle donne l'**égalité** $p^\star=d^\star$ et l'atteinte des optima, donc l'existence d'un certificat exact. La faible borne, la forte certifie.

</details>

**Exam-style** — Sur $\min -4x_1-5x_2$ s.c. $2x_1+x_2\leq3$, $x_1+2x_2\leq3$, $x\succeq0$, prouvez que $(1,1)$ est optimal sans résoudre le primal.

<details><summary>Réponse</summary>

Les deux contraintes de capacité sont actives en $(1,1)$, les contraintes de signe ne le sont pas. Le certificat dual doit donc être porté par ces deux contraintes : on résout $2z_2+z_4=4$ et $z_2+2z_4=5$, d'où $z_2=1\geq0$ et $z_4=2\geq0$. Ce $z$ est dual admissible, avec $-b^Tz = -(3+6) = -9 = c^Tx$. Le saut de dualité est nul : $(1,1)$ est optimal. $\blacksquare$

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Dual de $\min c^Tx$ s.c. $Ax\preceq b$ ? | $\max -b^Tz$ s.c. $A^Tz+c=0$, $z\succeq0$ |
| Dual de la forme standard $\min c^Tx$, $Ax=b$, $x\succeq0$ ? | $\max b^Ty$ s.c. $A^Ty\preceq c$ |
| Dualité faible ? | $c^Tx\geq -b^Tz$, donc $d^\star\leq p^\star$ — toujours |
| Saut de dualité ? | $c^Tx+b^Tz = (b-Ax)^Tz \geq 0$ |
| Théorème de dualité ? | Si primal **ou** dual admissible, $p^\star=d^\star$ ; si finie, optima atteints |
| Seule exception à $p^\star=d^\star$ ? | Primal **et** dual tous deux non admissibles |
| Primal non admissible $\Rightarrow$ ? | Dual non borné ou non admissible |
| Signe des variables duales ? | $\succeq0$ pour une inégalité ; libre pour une égalité |
| Écarts complémentaires ? | $z_i(b_i-a_i^Tx)=0$ pour tout $i$ |
| $z_i>0$ implique quoi ? | La contrainte $i$ est **active** : $a_i^Tx=b_i$ |
| Interprétation géométrique de l'optimalité ? | $-c$ est dans le cône engendré par les normales actives |
| Nature de l'ensemble optimal ? | Une **face** du polyèdre admissible |
| Complémentarité stricte ? | Pour tout $i$ : soit contrainte inactive et $z_i=0$, soit active et $z_i>0$ |
