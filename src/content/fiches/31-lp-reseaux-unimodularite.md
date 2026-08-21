# Fiche 31 — Flots dans les réseaux et unimodularité totale

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 17 « Network flow optimization », 16 diapositives |
| **Difficulté** | Must know — c'est le pont entre programmation linéaire et optimisation combinatoire |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiche 26 (test du rang, points extrêmes), fiche 24 (problème d'affectation) |
| **Concepts clés** | Matrice d'incidence, flot, équations de conservation, flot de coût minimal, matrice totalement unimodulaire, intégralité des sommets, relaxation exacte |
| **Poids à l'examen** | Le résultat central — « unimodularité totale $+$ données entières $\Rightarrow$ sommets entiers » — explique **pourquoi** on peut résoudre certains problèmes combinatoires par un simple LP. C'est le théorème à savoir énoncer et appliquer. |

## 🎯 Vue d'ensemble

La fiche 24 a laissé une promesse en suspens : le problème d'affectation, combinatoire par nature ($N!$ candidats), se résout par un LP parce que « on peut montrer qu'à l'optimum $x_{ij}\in\{0,1\}$ ». Cette leçon **démontre** cette affirmation, et en donne la portée exacte.

Le mécanisme tient en trois maillons :

```
MATRICE D'INCIDENCE d'un graphe  →  TOTALEMENT UNIMODULAIRE
       + second membre et bornes ENTIERS
       →  tous les SOMMETS du polyèdre sont ENTIERS
       →  l'optimum du LP relâché est déjà entier : la RELAXATION EST EXACTE
```

Autrement dit : sur les problèmes de réseau, la frontière entre « continu, facile » et « entier, difficile » **disparaît**. C'est un des résultats les plus utiles de toute la programmation linéaire.

## 🟡 Concept 1 — Réseaux et matrice d'incidence

**Réseau** (graphe orienté, *digraph*) : $m$ nœuds reliés par $n$ **arcs** orientés. Les arcs sont des couples ordonnés $(i,j)$ de nœuds. Le cours suppose **au plus un arc** d'un nœud $i$ vers un nœud $j$, et **aucune boucle** (arc $(i,i)$).

**Matrice d'incidence arc-nœud** : la matrice $A$ de taille $m\times n$ définie par

$$A_{ij} = \begin{cases} 1 & \text{si l'arc } j \text{ part du nœud } i\\ -1 & \text{si l'arc } j \text{ arrive au nœud } i\\ 0 & \text{sinon}\end{cases}$$

**Sa structure, à retenir absolument.** Chaque **colonne** (un arc) a exactement **deux** entrées non nulles : un $+1$ à son origine, un $-1$ à son extrémité. Tout le reste de la leçon découle de cette seule observation.

## 🟠 Concept 2 — Flots et conservation

**Vecteur de flot** $x\in\mathbb{R}^n$ : $x_j$ est le flot (de matière, de trafic, de charge, d'information…) circulant dans l'arc $j$ — **positif** dans le sens de l'arc, **négatif** dans l'autre sens.

**Flot total sortant du nœud $i$** :

$$\sum_{j=1}^n A_{ij}x_j = (Ax)_i$$

Le produit $Ax$ compte automatiquement chaque flot **en positif** pour le nœud d'où il part et **en négatif** pour celui où il arrive.

**Vecteur d'approvisionnement** $b\in\mathbb{R}^m$ : $b_i$ est l'apport externe au nœud $i$ (une valeur **négative** représentant une demande). Il doit vérifier

$$\mathbf1^Tb = 0$$

c'est-à-dire **offre totale $=$ demande totale**.

**Équations de conservation :**

$$Ax = b$$

⚠️ La condition $\mathbf1^Tb = 0$ n'est pas cosmétique : les lignes de $A$ somment à zéro (chaque colonne contient un $+1$ et un $-1$), donc $\mathbf1^TAx = 0$ pour tout $x$. Si $\mathbf1^Tb\neq0$, le système $Ax=b$ est **sans solution**. C'est le premier réflexe de vérification.

## 🔴 Concept 3 — Le problème de flot de coût minimal

$$\begin{array}{ll}\text{minimiser} & c^Tx\\ \text{sous} & Ax = b\\ & l\preceq x\preceq u\end{array}$$

- $c_j$ est le **coût unitaire** du flot sur l'arc $j$ ;
- $l_j$ et $u_j$ bornent le flot sur l'arc $j$ (typiquement $l_j\leq0\leq u_j$) ;
- on suppose $l_j<u_j$, en autorisant $l_j=-\infty$ et $u_j=+\infty$ pour alléger les notations.

Ce modèle **contient comme cas particuliers** un grand nombre de problèmes d'optimisation dans les réseaux.

### Le problème de flot maximal

Maximiser le flot du nœud $1$ (la **source**) vers le nœud $m$ (le **puits**) :

$$\begin{array}{ll}\text{maximiser} & t\\ \text{sous} & Ax = t\,e\\ & l\preceq x\preceq u\end{array} \qquad\text{où } e = (1,0,\dots,0,-1)$$

**Mise sous forme de flot de coût minimal.** On ajoute un **arc artificiel** $n+1$ reliant le puits à la source, et l'on minimise $-t$ :

$$\begin{array}{ll}\text{minimiser} & -t\\ \text{sous} & \begin{pmatrix}A & -e\end{pmatrix}\begin{pmatrix}x\\t\end{pmatrix} = 0\\ & l\preceq x\preceq u\end{array}$$

**L'idée.** Refermer le réseau par un arc de retour transforme un problème de flot **avec** source et puits en un problème de **circulation** sans apport externe : tout ce qui sort revient. Le flot maximal devient le flot qui circule dans l'arc de retour.

## 🔴 Concept 4 — Matrices totalement unimodulaires

**Définition.** Une matrice est **totalement unimodulaire** si **tous ses mineurs** valent $-1$, $0$ ou $1$ (un mineur étant le déterminant d'une sous-matrice carrée).

**Exemple du cours.**

$$\begin{pmatrix} 1 & 0 & -1 & 0 & 1\\ 0 & -1 & 1 & -1 & -1\\ 0 & 0 & 0 & 1 & 1\end{pmatrix}$$

**Le théorème principal.** *La matrice d'incidence arc-nœud d'un graphe orienté est totalement unimodulaire.*

**Démonstration (celle du cours, par récurrence).** Soit $A$ une matrice d'incidence $m\times n$. Ses entrées valent $-1$, $0$ ou $1$, et chaque colonne a **exactement deux** entrées non nulles, un $-1$ et un $+1$. Soit $B$ une sous-matrice carrée $k\times k$ de $A$. Trois cas :

- si $B$ a une **colonne nulle**, alors $\det B = 0$ ;
- si **toutes** les colonnes de $B$ ont leurs deux entrées non nulles, alors $\mathbf1^TB = 0$ (chaque colonne somme à $-1+1=0$), donc les lignes sont liées et $\det B = 0$ ;
- sinon, $B$ possède une colonne $j$ avec **une seule** entrée non nulle $B_{ij}$, et le développement selon cette colonne donne $$\det B = (-1)^{i+j}\,B_{ij}\,\det C$$ où $C$, d'ordre $k-1$, s'obtient en supprimant la ligne $i$ et la colonne $j$ de $B$.

Par récurrence sur $k$, tous les mineurs valent donc $\pm1$ ou $0$. $\blacksquare$

**Deux propriétés utiles.**

- les entrées $A_{ij}$ (mineurs d'ordre 1) valent $-1$, $0$ ou $1$ ;
- **l'inverse de toute sous-matrice carrée inversible de $A$ est à coefficients entiers** ($\pm1$ ou $0$) — conséquence de la formule $B^{-1} = \frac{1}{\det B}\,\mathrm{com}(B)^T$ avec $\det B = \pm1$ et une comatrice entière.

C'est cette seconde propriété qui fait tout le travail au concept suivant.

## 🔴 Concept 5 — Intégralité des points extrêmes

**Théorème.** Soit $P$ le polyèdre de $\mathbb{R}^n$ défini par

$$Ax = b, \qquad l\preceq x\preceq u$$

où $A$ est **totalement unimodulaire**, $b$ un vecteur **entier**, et les bornes finies $l_k$, $u_k$ **entières**. Alors **tous les points extrêmes de $P$ sont des vecteurs entiers**.

**Démonstration (celle du cours).** On applique le test du rang (fiche 26) à un point $\hat x\in P$. Partitionnons $\{1,\dots,n\}$ en trois ensembles :

$$l_k<\hat x_k<u_k \ (k\in J_0), \qquad \hat x_k = l_k \ (k\in J_-), \qquad \hat x_k = u_k \ (k\in J_+)$$

et notons $A_0$, $A_-$, $A_+$ les sous-matrices correspondantes de $A$. Le test du rang donne

$$\mathbf{rank}\begin{pmatrix} 0 & I & 0\\ 0 & 0 & -I\\ A_0 & A_- & A_+\end{pmatrix} = n \qquad\Longleftrightarrow\qquad A_0 \text{ est de rang colonne plein}$$

L'intégralité s'ensuit : les composantes bloquées aux bornes sont entières par hypothèse, et les composantes libres se lisent sur

$$A_0\,\hat x_{J_0} = b - A_-\hat x_{J_-} - A_+\hat x_{J_+}$$

- le second membre est **entier** ($\hat x_k$ entier pour $k\in J_-\cup J_+$, $b$ entier, $A$ entière) ;
- l'inverse de toute sous-matrice carrée inversible de $A_0$ est à coefficients **entiers** (unimodularité totale).

Donc $\hat x_{J_0}$ est entier. $\blacksquare$

⚠️ Les **trois** hypothèses sont indispensables : unimodularité totale de $A$, **et** $b$ entier, **et** bornes entières. Retirez-en une et le résultat tombe — un sommet peut avoir des coordonnées fractionnaires.

## 🔴 Concept 6 — La conséquence : la relaxation est exacte

Considérons le **programme linéaire en nombres entiers**

$$\begin{array}{ll}\text{minimiser} & c^Tx\\ \text{sous} & Ax = b,\quad l\preceq x\preceq u\\ & x\in\mathbb{Z}^n\end{array}$$

En général, un tel problème est **très difficile**. Mais :

> **Si $A$ est totalement unimodulaire et si $b$, $l$, $u$ sont entiers**, ce problème est **équivalent** à sa **relaxation linéaire** — le même problème sans la contrainte $x\in\mathbb{Z}^n$.

**Pourquoi.** L'optimum du LP relâché est atteint en un **point extrême** (fiche 27) ; par le concept 5, ce point extrême est **entier** ; il est donc admissible pour le problème entier, et optimal puisqu'il minimise sur un ensemble plus grand.

**La portée du résultat.** On dispose donc d'une famille entière de problèmes combinatoires — tous ceux dont la matrice de contraintes est une matrice d'incidence — que l'on sait résoudre **en temps polynomial** par les méthodes de la programmation linéaire, alors que le problème entier général est NP-difficile.

⚠️ **Ne généralisez pas.** L'exactitude de la relaxation est **exceptionnelle**. Pour une matrice de contraintes quelconque, la relaxation ne donne qu'une **borne inférieure**, et l'écart (le *saut d'intégrité*) peut être arbitrairement grand.

## 🟠 Concept 7 — Trois applications

### Plus court chemin

Dans un graphe orienté de matrice d'incidence $A$, les chemins (orientés) du nœud $1$ au nœud $m$ se représentent par les vecteurs $x$ vérifiant

$$Ax = (1,0,\dots,0,-1), \qquad x\in\{0,1\}^n$$

Le plus court chemin est donc solution de

$$\min\ \mathbf1^Tx \quad\text{s.c.}\quad Ax = (1,0,\dots,0,-1),\quad x\in\{0,1\}^n$$

**Formulation LP :** on remplace $x\in\{0,1\}^n$ par $0\preceq x\preceq\mathbf1$. Les solutions optimales **extrêmes** vérifient automatiquement $x_i\in\{0,1\}$ — l'unité d'approvisionnement injectée en $1$ ressort en $m$ en suivant un chemin.

### Théorème de Birkhoff

Une matrice $X$ de taille $N\times N$ est **bistochastique** si $0\leq X_{ij}\leq1$ et

$$\sum_{i=1}^N X_{ij} = 1 \ (\forall j), \qquad \sum_{j=1}^N X_{ij} = 1 \ (\forall i)$$

L'ensemble de ces matrices est un polyèdre $P\subset\mathbb{R}^{N\times N}$.

**Théorème.** Les points extrêmes de $P$ sont exactement les **matrices de permutation**.

**Preuve par les réseaux (celle du cours).** On interprète $X$ comme un flot dans un graphe **biparti** à $N$ nœuds d'entrée et $N$ nœuds de sortie : $X_{ij}$ est le flot de l'entrée $i$ vers la sortie $j$, chaque entrée ayant un approvisionnement de $1$ et chaque sortie une demande de $1$. La matrice de contraintes est la matrice d'incidence de ce graphe biparti, donc **totalement unimodulaire** ; les données sont entières ; donc tout point extrême $X$ est **à coefficients entiers**, c'est-à-dire dans $\{0,1\}$ — une matrice de permutation. $\blacksquare$

*(La fiche 26 en donnait une preuve directe par échange le long d'un cycle ; celle-ci est immédiate une fois l'unimodularité acquise.)*

### Couplage biparti pondéré — la promesse tenue

$$\begin{array}{ll}\text{minimiser} & \displaystyle\sum_{i,j=1}^N A_{ij}X_{ij}\\[4pt] \text{sous} & \displaystyle\sum_{i=1}^N X_{ij} = 1, \quad j=1,\dots,N\\[4pt] & \displaystyle\sum_{j=1}^N X_{ij} = 1, \quad i=1,\dots,N\\[4pt] & 0\leq X_{ij}\leq1\end{array}$$

C'est **exactement** le problème d'affectation du slide 1-8 (fiche 24), en version relâchée. **Intégralité** : toute solution optimale extrême a ses entrées dans $\{0,1\}$. La promesse laissée en suspens à la leçon 1 est donc tenue seize leçons plus tard, et la raison est l'unimodularité totale de la matrice d'incidence du graphe biparti.

### Comment résoudre l'exercice type (protocole)

1. **Dessiner le graphe** : nœuds, arcs orientés, numéroter les arcs.
2. **Écrire la matrice d'incidence** $A$ : une colonne par arc, $+1$ à l'origine, $-1$ à l'extrémité.
3. **Vérifier $\mathbf1^Tb = 0$** — sinon le problème est immédiatement non admissible.
4. **Poser le LP** : $\min c^Tx$ sous $Ax=b$, $l\preceq x\preceq u$.
5. **Vérifier les hypothèses d'intégralité** : $A$ d'incidence (donc totalement unimodulaire), $b$, $l$, $u$ entiers.
6. **Conclure sur la relaxation** : si les hypothèses tiennent, la solution du LP est entière — inutile d'ajouter $x\in\mathbb{Z}^n$.
7. **Interpréter** : quel chemin, quelle affectation, quel flot le vecteur $x^\star$ décrit-il ?

### Comment reconnaître un problème de flot

| Signe dans l'énoncé | Modélisation |
|---|---|
| « acheminer », « transporter », « router » entre des sites | flot de coût minimal |
| « le plus court chemin de A à B » | flot unitaire, $b = e_1-e_m$ |
| « débit maximal entre une source et un puits » | flot maximal, arc de retour artificiel |
| « affecter $N$ personnes à $N$ tâches » | couplage biparti, intégralité automatique |
| Une contrainte « ce qui entre égale ce qui sort » | équations de conservation $Ax=b$ |
| Des capacités sur les liaisons | bornes $l\preceq x\preceq u$ |

### Exercices progressifs

**Niveau 1** — Un réseau a $b = (3,\ -1,\ -1)$. Le problème est-il bien posé ?

<details><summary>Correction</summary>

$\mathbf1^Tb = 3-1-1 = 1\neq0$ : offre et demande ne s'équilibrent pas. Comme $\mathbf1^TAx = 0$ pour tout $x$ (chaque colonne de $A$ somme à zéro), le système $Ax=b$ **n'a aucune solution**. Il faut corriger les données, par exemple $b=(2,-1,-1)$.

</details>

**Niveau 2** — Écrivez la matrice d'incidence du graphe à 3 nœuds et 3 arcs $1\to2$, $2\to3$, $1\to3$.

<details><summary>Correction</summary>

Une colonne par arc, dans l'ordre donné :

$$A = \begin{pmatrix} 1 & 0 & 1\\ -1 & 1 & 0\\ 0 & -1 & -1\end{pmatrix}$$

*Contrôles :* chaque colonne contient exactement un $+1$ et un $-1$ ; chaque ligne somme à… peu importe, mais **chaque colonne** somme à $0$, donc $\mathbf1^TA = 0$ .

</details>

**Niveau 3** — Sur ce graphe, avec $b = (1,0,-1)$, $l=0$, $u=\mathbf1$ et des coûts $c = (1,1,3)$, trouvez le plus court chemin de $1$ à $3$.

<details><summary>Correction</summary>

Les contraintes $Ax=b$ s'écrivent $x_1+x_3 = 1$, $-x_1+x_2 = 0$, $-x_2-x_3 = -1$. De la deuxième, $x_2=x_1$ ; en reportant dans la première, $x_3 = 1-x_1$ ; la troisième est alors automatiquement satisfaite. Le coût vaut

$$c^Tx = x_1 + x_2 + 3x_3 = 2x_1 + 3(1-x_1) = 3 - x_1$$

minimisé en $x_1 = 1$ (borne supérieure), soit $x = (1,1,0)$ de coût $2$ : le chemin $1\to2\to3$. La solution est **entière sans qu'on l'ait imposé** — matrice d'incidence, données entières. *Lecture :* le chemin direct $1\to3$ coûte $3$, le détour par $2$ coûte $1+1=2$. Le détour est plus court.

</details>

**Niveau 4 — type feuille d'exercices** — Donnez un exemple de LP en nombres entiers dont la relaxation **n'est pas** exacte, et expliquez quelle hypothèse est violée.

<details><summary>Correction</summary>

$$\max\ x_1+x_2 \quad\text{s.c.}\quad 2x_1+2x_2\leq3,\quad x_1,x_2\geq0,\quad x\in\mathbb{Z}^2$$

*Relaxation* : l'optimum continu est atteint sur tout le segment $x_1+x_2 = 3/2$, de valeur $3/2$ ; les sommets $(3/2,0)$ et $(0,3/2)$ sont **fractionnaires**. *Problème entier* : les points entiers admissibles sont $(0,0)$, $(1,0)$, $(0,1)$, de valeur maximale $1$. **Saut d'intégrité** : $3/2 - 1 = 1/2 > 0$ — la relaxation n'est pas exacte. *Hypothèse violée :* la matrice de contraintes $\begin{pmatrix}2&2\end{pmatrix}$ **n'est pas totalement unimodulaire** — son mineur d'ordre 1 vaut $2$. Ce n'est pas une matrice d'incidence : sa colonne ne contient pas un $+1$ et un $-1$.

</details>

## 🔴 Common mistakes

1. **Oublier $\mathbf1^Tb=0$** — sans équilibre offre/demande, $Ax=b$ n'a **aucune** solution.
2. **Se tromper de signe dans $A$** — $+1$ à l'origine de l'arc, $-1$ à son extrémité ; l'inverser retourne tous les flots.
3. **Croire toute matrice à coefficients $0,\pm1$ totalement unimodulaire** — c'est faux : la définition porte sur **tous les mineurs**, pas seulement ceux d'ordre 1.
4. **Oublier l'intégralité de $b$, $l$, $u$** — l'unimodularité de $A$ seule ne suffit pas : avec $b$ fractionnaire, les sommets le sont aussi.
5. **Généraliser l'exactitude de la relaxation** — elle est propre aux matrices totalement unimodulaires ; ailleurs on n'a qu'une **borne**.
6. **Confondre point extrême entier et solution entière quelconque** — le théorème porte sur les **sommets** ; un point intérieur du polyèdre peut être fractionnaire, et un solveur doit renvoyer un sommet.
7. **Modéliser un flot maximal sans arc de retour** — sans lui, la conservation ne peut pas s'écrire comme une circulation.

## 📌 Ultimate Review

1. Matrice d'incidence : $+1$ à l'origine, $-1$ à l'extrémité, **deux non-nuls par colonne**.
2. Conservation : $Ax = b$ avec $\mathbf1^Tb=0$ ; $(Ax)_i$ est le flot net sortant du nœud $i$.
3. Flot de coût minimal : $\min c^Tx$ s.c. $Ax=b$, $l\preceq x\preceq u$ — modèle générique.
4. Flot maximal : $\max t$ s.c. $Ax=te$, $e = e_1-e_m$ ; se ramène au précédent par un **arc de retour**.
5. **Totalement unimodulaire** : tous les mineurs valent $-1$, $0$ ou $1$. Toute matrice d'incidence l'est (preuve par récurrence sur l'ordre des mineurs).
6. Conséquence : l'inverse de toute sous-matrice carrée inversible est **entière**.
7. **Théorème d'intégralité** : $A$ totalement unimodulaire $+$ $b,l,u$ entiers $\Rightarrow$ tous les sommets sont entiers.
8. Donc la **relaxation linéaire d'un LP en nombres entiers est exacte** dans ce cadre.
9. Applications : plus court chemin, théorème de Birkhoff, couplage biparti — et la démonstration de l'intégralité du problème d'affectation annoncée à la leçon 1.

**Formulas to know**

$$A_{ij}\in\{1,-1,0\} \qquad Ax = b,\ \mathbf1^Tb = 0 \qquad \min c^Tx \ \text{s.c.}\ Ax=b,\ l\preceq x\preceq u \qquad A_0\hat x_{J_0} = b - A_-\hat x_{J_-} - A_+\hat x_{J_+}$$

**Methods to know** : le protocole de modélisation en 7 étapes ; la preuve d'unimodularité par développement selon une colonne ; l'argument d'intégralité par le test du rang.

## 🧠 Active Recall

**Basic** — Définissez une matrice totalement unimodulaire et donnez-en un exemple canonique.

<details><summary>Réponse</summary>

Une matrice dont **tous les mineurs** (déterminants de sous-matrices carrées) valent $-1$, $0$ ou $1$. Exemple canonique : la **matrice d'incidence arc-nœud** d'un graphe orienté.

</details>

**Understanding** — Pourquoi la structure « deux entrées non nulles par colonne » entraîne-t-elle l'unimodularité totale ?

<details><summary>Réponse</summary>

Elle permet une récurrence sur l'ordre du mineur. Pour une sous-matrice carrée $B$ : si une colonne est nulle, $\det B=0$ ; si toutes ont deux non-nuls, $\mathbf1^TB=0$ donc $\det B=0$ ; sinon une colonne a une seule entrée non nulle $B_{ij}=\pm1$, et $\det B = \pm\det C$ avec $C$ d'ordre inférieur. Les trois cas donnent $0$ ou $\pm1$.

</details>

**Application** — $A$ est d'incidence, $b=(1,-1)$, $l=0$, $u=(2{,}5,\ 3)$. Les sommets sont-ils entiers ?

<details><summary>Réponse</summary>

**Non garanti** : la borne $u_1 = 2{,}5$ n'est pas entière, et le théorème exige que les bornes **finies** le soient. Un sommet peut se placer sur cette borne fractionnaire. Il faudrait arrondir $u_1$ à $2$ (si les flots doivent rester entiers) pour retrouver la garantie.

</details>

**Comparison** — Relaxation linéaire d'un LP entier : quand est-elle exacte, et sinon que donne-t-elle ?

<details><summary>Réponse</summary>

**Exacte** si $A$ est totalement unimodulaire et $b$, $l$, $u$ entiers : l'optimum extrême du LP est déjà entier. **Sinon**, elle ne fournit qu'une **borne** (inférieure en minimisation), et l'écart avec l'optimum entier — le saut d'intégrité — peut être arbitrairement grand.

</details>

**Exam-style** — Démontrez que les points extrêmes de l'ensemble des matrices bistochastiques sont les matrices de permutation, par l'argument de flot.

<details><summary>Réponse</summary>

On voit $X$ comme un flot sur un graphe biparti : $N$ nœuds d'entrée d'approvisionnement $1$, $N$ nœuds de sortie de demande $1$, et un arc $(i,j)$ portant le flot $X_{ij}$. Les contraintes de somme de lignes et de colonnes sont exactement les équations de conservation $Ax=b$ de ce graphe, avec $b$ entier et $0\leq X_{ij}\leq1$. La matrice $A$ étant d'incidence, elle est **totalement unimodulaire** ; par le théorème d'intégralité, tout point extrême a ses entrées entières, donc dans $\{0,1\}$. Une matrice bistochastique à coefficients $0/1$ est une matrice de permutation. Réciproquement, une matrice de permutation est bien un sommet (elle ne s'écrit pas comme milieu de deux bistochastiques distinctes). $\blacksquare$

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Matrice d'incidence arc-nœud ? | $+1$ si l'arc part du nœud, $-1$ s'il y arrive, $0$ sinon |
| Combien d'entrées non nulles par colonne ? | Exactement deux : un $+1$ et un $-1$ |
| Équations de conservation ? | $Ax = b$, avec $\mathbf1^Tb = 0$ |
| Flot de coût minimal ? | $\min c^Tx$ s.c. $Ax=b$, $l\preceq x\preceq u$ |
| Flot maximal ? | $\max t$ s.c. $Ax = t(e_1-e_m)$, $l\preceq x\preceq u$ |
| Totalement unimodulaire ? | Tous les mineurs valent $-1$, $0$ ou $1$ |
| Les matrices d'incidence le sont-elles ? | Oui — preuve par récurrence sur l'ordre du mineur |
| Théorème d'intégralité ? | $A$ TU $+$ $b,l,u$ entiers $\Rightarrow$ tous les sommets sont entiers |
| Conséquence pour un LP entier ? | La relaxation linéaire est **exacte** |
| Plus court chemin en LP ? | $\min\mathbf1^Tx$ s.c. $Ax = e_1-e_m$, $0\preceq x\preceq\mathbf1$ |
| Points extrêmes des matrices bistochastiques ? | Les matrices de permutation (Birkhoff) |
| Pourquoi l'affectation se résout-elle par un LP ? | Sa matrice est celle d'un graphe biparti, donc TU |
| Que donne la relaxation hors du cadre TU ? | Une simple borne — le saut d'intégrité peut être grand |
