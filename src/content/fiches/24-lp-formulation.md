# Fiche 24 — Programmation linéaire : formulation et géométrie

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 1 « Introduction », 28 diapositives |
| **Difficulté** | Fondamental — la porte d'entrée du versant « recherche opérationnelle » |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Fiche 9 (matrices, produit scalaire), fiche 11 (convexité) |
| **Concepts clés** | Programme linéaire, formes scalaire/vectorielle/matricielle, admissibilité, valeur optimale, hyperplan, demi-espace, polyèdre |
| **Poids à l'examen** | Tout le reste du cours (dualité, simplexe, applications) suppose qu'on lit un LP dans les trois écritures **sans hésiter**. C'est la fiche à maîtriser avant d'ouvrir la feuille d'exercices `ZZ_EXERCICES_problems.pdf`. |

## 🎯 Vue d'ensemble

Un **programme linéaire** est le problème d'optimisation le plus simple qui reste utile : minimiser une fonction linéaire sous des contraintes linéaires. Deux idées portent toute la fiche.

D'abord, **la même chose s'écrit de trois façons**, et il faut passer de l'une à l'autre de tête : indices, produits scalaires, matrices. Ensuite, **la géométrie décide** : les contraintes découpent un polyèdre, l'objectif se lit comme une famille d'hyperplans parallèles, et on pousse cet hyperplan dans la direction $-c$ jusqu'à sortir du polyèdre. Le dernier point touché est la solution.

```
CONTRAINTES  →  intersection de demi-espaces  →  POLYÈDRE
OBJECTIF     →  hyperplans parallèles cᵀx = γ  →  on pousse dans la direction −c
SOLUTION     →  le dernier point du polyèdre touché  →  presque toujours un SOMMET
```

## 🔴 Concept 1 — Les trois écritures d'un LP

**Écriture scalaire** — celle des slides d'ouverture du cours :

$$\begin{array}{ll}\text{minimiser} & \displaystyle\sum_{j=1}^n c_j x_j \\[4pt] \text{sous} & \displaystyle\sum_{j=1}^n a_{ij}x_j \leq b_i, \quad i = 1,\dots,m \\[4pt] & \displaystyle\sum_{j=1}^n d_{ij}x_j = f_i, \quad i = 1,\dots,p\end{array}$$

- $n$ **variables** d'optimisation $x_1,\dots,x_n$ (des réels) ;
- les **données** du problème sont les coefficients $c_j$, $a_{ij}$, $b_i$, $d_{ij}$, $f_i$ ;
- $\sum_j c_jx_j$ est la **fonction de coût** (ou fonction objectif) ;
- $\sum_j a_{ij}x_j \leq b_i$ sont les contraintes d'**inégalité**, $\sum_j d_{ij}x_j = f_i$ celles d'**égalité**.

**Écriture par produits scalaires** — on regroupe chaque ligne dans un vecteur :

$$\begin{array}{ll}\text{minimiser} & c^Tx \\ \text{sous} & a_i^Tx \leq b_i, \quad i=1,\dots,m \\ & d_i^Tx = f_i, \quad i=1,\dots,p\end{array}$$

avec $c = (c_1,\dots,c_n)$, $a_i = (a_{i1},\dots,a_{in})$, $d_i = (d_{i1},\dots,d_{in})$.

**Écriture matricielle** — on empile les lignes :

$$\begin{array}{ll}\text{minimiser} & c^Tx \\ \text{sous} & Ax \preceq b \\ & Dx = f\end{array}$$

où $A \in \mathbb{R}^{m\times n}$ a pour lignes les $a_i^T$, $D \in \mathbb{R}^{p\times n}$ a pour lignes les $d_i^T$, et **l'inégalité est composante par composante**.

⚠️ $Ax \preceq b$ n'est pas une inégalité entre nombres : c'est $m$ inégalités simultanées. Le symbole $\preceq$ (ou $\leq$ entre vecteurs chez Vandenberghe) se lit « composante par composante » — jamais « la norme de $Ax$ est plus petite ».

## 🔴 Concept 2 — Le vocabulaire, et les deux valeurs pathologiques

Pour le problème $\min\ c^Tx$ sous $Ax \preceq b$, $Dx = f$ :

| Terme | Définition |
|---|---|
| $x$ **admissible** (*feasible*) | $x$ satisfait les contraintes $Ax \preceq b$ et $Dx = f$ |
| **Ensemble admissible** | l'ensemble de tous les points admissibles |
| $x^\star$ **optimal** | $x^\star$ admissible et $c^Tx^\star \leq c^Tx$ pour tout $x$ admissible |
| **Valeur optimale** $p^\star$ | $p^\star = c^Tx^\star$ |
| Problème **non borné** | $c^Tx$ n'est pas minorée sur l'ensemble admissible : $p^\star = -\infty$ |
| Problème **non admissible** | l'ensemble admissible est vide : $p^\star = +\infty$ |

**Pourquoi ces deux conventions.** Poser $p^\star = +\infty$ quand rien n'est admissible et $p^\star = -\infty$ quand on descend indéfiniment permet d'énoncer les théorèmes de dualité **sans cas particuliers** : $p^\star$ est toujours défini dans $[-\infty,+\infty]$. C'est une convention, pas un résultat — mais elle vous suivra jusqu'à la fiche sur la dualité.

⚠️ « Non borné » et « non admissible » sont deux échecs **opposés**, et un solveur les distingue. Un LP non borné a des solutions admissibles en quantité ; un LP non admissible n'en a aucune. Confondre les deux dans une conclusion d'exercice coûte tout le point.

## 🟠 Concept 3 — Pourquoi le LP est partout

Le cours ouvre sur trois arguments, à savoir citer.

**Faible complexité.** Des problèmes à plusieurs milliers de variables et de contraintes se résolvent en routine ; jusqu'à des millions de variables si les données sont **creuses**. Les logiciels sont largement disponibles, et la complexité théorique dans le pire des cas est **polynomiale**.

**Applicabilité très large.** Développé à l'origine pour l'économie et la gestion, le LP sert aujourd'hui dans toutes les branches de l'ingénierie, l'analyse de données et la finance. C'est aussi un outil clé de l'**optimisation combinatoire**.

**Théorie riche.** Il n'existe pas de formule simple donnant la solution — mais il existe une théorie complète et utile : la **dualité**.

**Repères historiques (slide « Brief history »).**

| Date | Apport |
|---|---|
| Années 1940 | Dantzig, Kantorovitch, Koopmans, von Neumann : fondations, motivées par l'économie et la logistique |
| 1947 | Dantzig : **algorithme du simplexe** |
| 1950–60 | diffusion dans les autres disciplines |
| 1979 | Khachiyan : algorithme de l'**ellipsoïde**, polynomial dans le pire cas, mais bien plus lent en pratique que le simplexe |
| 1984 | Karmarkar : algorithme **projectif** (points intérieurs), polynomial *et* efficace en pratique |
| depuis 1984 | variantes des méthodes de points intérieurs, logiciels grande échelle |

**Intuition à retenir de 1979 et 1984.** Le simplexe est exponentiel dans le pire cas et excellent en pratique ; l'ellipsoïde est l'inverse. Karmarkar est le premier à réunir les deux qualités — c'est pour cela que la date est retenue.

## 🟠 Concept 4 — Deux exemples fondateurs du cours

### Exemple 1 — commande en boucle ouverte (*open-loop control*)

Un système à une entrée $u(t)$ et une sortie $y(t)$, de réponse impulsionnelle $h_0,h_1,\dots$ :

$$y(t) = h_0u(t) + h_1u(t-1) + h_2u(t-2) + h_3u(t-3) + \cdots$$

On veut suivre une sortie désirée $y_{\text{des}}$ au mieux :

$$\min\ \max_{t=0,\dots,N} |y(t) - y_{\text{des}}(t)|$$

sous des contraintes d'**amplitude** et de **vitesse de variation** (*slew rate*) de la commande :

$$|u(t)| \leq U, \qquad |u(t+1)-u(t)| \leq S$$

Les variables sont $u(0),\dots,u(M)$, avec $u(t)=0$ pour $t<0$ et $t>M$. Le cours donne l'illustration numérique $U = 1{,}1$ et $S = 0{,}25$.

**Ce qu'il faut voir.** L'objectif est un **maximum de valeurs absolues** : ce n'est pas linéaire. Pourtant le problème « se formule comme un LP, donc se résout facilement ». *Comment* — c'est exactement l'objet de la fiche 25.

### Exemple 2 — problème d'affectation (*assignment problem*)

Affecter $N$ personnes à $N$ tâches, chaque personne à une tâche et chaque tâche à une personne ; affecter la personne $i$ à la tâche $j$ coûte $a_{ij}$.

**Formulation combinatoire** — $x_{ij} = 1$ si $i$ est affectée à $j$, $0$ sinon :

$$\begin{array}{ll}\text{minimiser} & \displaystyle\sum_{i,j=1}^N a_{ij}x_{ij} \\[4pt] \text{sous} & \displaystyle\sum_{i=1}^N x_{ij} = 1, \quad j = 1,\dots,N \\[4pt] & \displaystyle\sum_{j=1}^N x_{ij} = 1, \quad i = 1,\dots,N \\[4pt] & x_{ij} \in \{0,1\}\end{array}$$

Il y a $N!$ affectations possibles : **beaucoup trop pour énumérer**.

**Formulation linéaire (relaxation)** — on remplace $x_{ij}\in\{0,1\}$ par

$$0 \leq x_{ij} \leq 1$$

Le cours annonce le résultat : *on peut montrer qu'à l'optimum $x_{ij} \in \{0,1\}$* (démontré plus loin dans le cours). Donc **relâcher ne coûte rien**, et un problème combinatoire se résout efficacement par la programmation linéaire.

**Pourquoi c'est spectaculaire.** Relâcher une contrainte d'intégrité donne en général une borne, pas une solution entière. Ici, la structure particulière des contraintes d'affectation garantit que l'optimum du LP relâché est déjà entier. C'est le pont entre programmation linéaire et optimisation combinatoire, et la raison pour laquelle le LP est « un outil clé » de ce domaine.

## 🔴 Concept 5 — Hyperplans, demi-espaces, polyèdres

C'est la géométrie qui porte tout le cours.

**Hyperplan** — ensemble des solutions d'**une** équation linéaire, à vecteur de coefficients $a \neq 0$ :

$$G = \{x \mid a^Tx = b\}$$

**Demi-espace** — ensemble des solutions d'**une** inégalité linéaire, $a \neq 0$ :

$$H = \{x \mid a^Tx \leq b\}$$

$a$ s'appelle le **vecteur normal**.

**Interprétation géométrique (slide 1-22).** Posons $u = \dfrac{b}{\|a\|^2}\,a$ ; ce point vérifie $a^Tu = b$, il est donc sur l'hyperplan. Alors :

$$x \in G \iff a^T(x-u) = 0 \qquad\text{($x-u$ est orthogonal à $a$)}$$

$$x \in H \iff a^T(x-u) \leq 0 \qquad\text{(l'angle entre $x-u$ et $a$ est $\geq \pi/2$)}$$

**Le mémo.** Un hyperplan, c'est « tous les points qu'on atteint depuis $u$ en se déplaçant **perpendiculairement** à $a$ » ; un demi-espace, c'est « ceux du côté opposé à $a$ ». Le vecteur $a$ pointe vers l'extérieur du demi-espace.

**Polyèdre** — ensemble des solutions d'un **nombre fini** d'inégalités linéaires :

$$a_1^Tx \leq b_1,\quad a_2^Tx\leq b_2,\quad\dots,\quad a_m^Tx\leq b_m$$

- c'est l'**intersection d'un nombre fini de demi-espaces** ;
- en notation matricielle : $Ax \preceq b$ où les lignes de $A$ sont les $a_i^T$ ;
- **les égalités sont incluses** : $Fx = g$ équivaut à $Fx \preceq g$ **et** $-Fx \preceq -g$.

**Exemples du cours.** En dimension 2 : $x_1 + x_2 \leq 1$, $-2x_1+x_2\leq 2$, $x_1 \geq 0$, $x_2\geq0$. En dimension 3 : $0\leq x_i \leq 2$ pour $i=1,2,3$ et $x_1+x_2+x_3\leq 5$, dont le cours dessine les sommets $(2,2,1)$, $(1,2,2)$, $(2,1,2)$…

⚠️ Un polyèdre peut être **non borné** (un demi-plan est un polyèdre) et peut être **vide**. « Polyèdre » ne veut pas dire « solide fermé et borné » — le mot pour cela est *polytope*, et c'est un polyèdre borné.

## 🔴 Concept 6 — Lecture géométrique d'un LP

$$\min\ c^Tx \quad \text{sous} \quad Ax\preceq b$$

Les ensembles de niveau de l'objectif, $\{x \mid c^Tx = \gamma\}$, sont des **hyperplans parallèles** — les pointillés du slide 1-27. Minimiser $c^Tx$, c'est déplacer cet hyperplan dans la direction $-c$ aussi loin que possible **tout en touchant encore le polyèdre**. Le dernier point touché est la solution optimale.

**Trois conséquences immédiates.**

1. L'optimum est atteint **au bord** du polyèdre, jamais à l'intérieur (sauf si $c=0$) : dans un point intérieur, on peut toujours avancer un peu dans la direction $-c$.
2. Il est généralement atteint en un **sommet**. S'il l'est sur toute une arête ou une face, il y a une infinité de solutions optimales, toutes de même valeur.
3. Si le polyèdre est non borné dans la direction $-c$, on peut pousser indéfiniment : $p^\star = -\infty$.

**Exemple du cours (slide 1-28).**

$$\begin{array}{ll}\text{minimiser} & -x_1-x_2\\ \text{sous} & 2x_1+x_2\leq 3\\ & x_1+4x_2\leq 5\\ & x_1\geq0,\ x_2\geq0\end{array}$$

La solution optimale est $(1,1)$.

**Vérification par les sommets** — l'ensemble admissible est un quadrilatère :

| Sommet | Origine | $-x_1-x_2$ |
|---|---|---|
| $(0,0)$ | $x_1=0,\ x_2=0$ | $0$ |
| $(3/2,\,0)$ | $x_2=0$ et $2x_1+x_2=3$ | $-1{,}5$ |
| $(1,1)$ | $2x_1+x_2=3$ **et** $x_1+4x_2=5$ | $\mathbf{-2}$ |
| $(0,\,5/4)$ | $x_1=0$ et $x_1+4x_2=5$ | $-1{,}25$ |

Le minimum est bien $-2$, atteint en $(1,1)$ — le sommet où les **deux** contraintes d'inégalité sont **saturées** (actives). Retenez le réflexe : à l'optimum, on cherche quelles contraintes sont serrées.

### Comment résoudre l'exercice type (protocole)

1. **Nommer les variables** et leur unité ; préciser les signes ($x \succeq 0$ pour des quantités).
2. **Écrire l'objectif** : coût à minimiser ou profit à maximiser ($\max c^Tx = -\min(-c)^Tx$).
3. **Traduire chaque phrase de l'énoncé** en une inégalité ou une égalité linéaire. Une ressource limitée donne un $\leq$ ; une demande à satisfaire, un $\geq$ ; une composition imposée, un $=$.
4. **Vérifier la linéarité** : aucun produit de variables, aucun quotient, aucune valeur absolue non traitée (sinon, fiche 25).
5. **Passer en matriciel** : identifier $c$, $A$, $b$, $D$, $f$ — c'est ce que consomme un solveur.
6. **En dimension 2, dessiner** : le polyèdre, la direction $-c$, les sommets ; lire la solution.
7. **Conclure** : valeur optimale, contraintes actives, et interprétation en langage de l'énoncé.

### Comment reconnaître qu'un problème est un LP

| Signe dans l'énoncé | Verdict |
|---|---|
| Objectif et contraintes sont des sommes $\sum_j c_jx_j$ | LP directement |
| « maximiser le profit sous des capacités » | LP de production, la forme la plus classique |
| Un $\max$ ou une valeur absolue dans l'objectif | LP **après reformulation** (fiche 25) |
| Un produit $x_iy_j$ ou un quotient $x_i/x_j$ | pas un LP — il faut linéariser ou changer de cadre |
| Des variables entières ou binaires | programmation linéaire **en nombres entiers** — relaxation à étudier |
| Une norme euclidienne $\\|Ax-b\\|_2$ | pas un LP (c'est un problème quadratique) — mais $\\|\cdot\\|_1$ et $\\|\cdot\\|_\infty$, si |

### Exercices progressifs

**Niveau 1** — Mettez sous la forme $\min c^Tx$ s.c. $Ax \preceq b$ le problème : maximiser $3x_1+2x_2$ sous $x_1+x_2\leq 4$, $x_1\leq 3$, $x_1,x_2\geq0$.

<details><summary>Correction</summary>

Maximiser $3x_1+2x_2$, c'est minimiser $-3x_1-2x_2$, donc $c = (-3,-2)$. Les contraintes de positivité se réécrivent $-x_1\leq0$ et $-x_2\leq0$ :

$$A = \begin{pmatrix} 1 & 1\\ 1 & 0\\ -1 & 0\\ 0 & -1\end{pmatrix},\qquad b = \begin{pmatrix}4\\3\\0\\0\end{pmatrix}$$

Valeur optimale : le sommet $(3,1)$ donne $11$, le sommet $(0,4)$ donne $8$, $(3,0)$ donne $9$ ; l'optimum est $(3,1)$, de valeur $11$, soit $p^\star = -11$ pour le problème de minimisation.

</details>

**Niveau 2** — Le polyèdre $P = \{x\in\mathbb{R}^2 \mid x_1+x_2\leq 1,\ -2x_1+x_2\leq2,\ x_1\geq0,\ x_2\geq0\}$ (exemple du cours). Est-il borné ? Donnez ses sommets.

<details><summary>Correction</summary>

Sur $P$, $x_1\geq0$ et $x_2\geq0$ avec $x_1+x_2\leq1$ : donc $0\leq x_1\leq 1$ et $0\leq x_2\leq1$. **$P$ est borné** (c'est un polytope). La contrainte $-2x_1+x_2\leq2$ est alors **redondante** : sur $P$, $-2x_1+x_2 \leq x_2 \leq 1 < 2$. Sommets : $(0,0)$, $(1,0)$, $(0,1)$ — le triangle. *Leçon : une contrainte peut ne rien découper ; le repérer simplifie le dessin.*

</details>

**Niveau 3** — Soit $H = \{x\in\mathbb{R}^3 \mid a^Tx\leq b\}$ avec $a = (1,2,2)$ et $b = 9$. Le point $x = (1,1,1)$ est-il dans $H$ ? Quelle est sa distance à l'hyperplan frontière ?

<details><summary>Correction</summary>

$a^Tx = 1+2+2 = 5 \leq 9$ : **oui**, $x\in H$. Pour la distance, on utilise le point $u = \frac{b}{\|a\|^2}a$ du slide 1-22 : $\|a\|^2 = 1+4+4 = 9$, donc $u = \frac{9}{9}a = (1,2,2)$, et $a^Tu = 9$ . La distance d'un point à l'hyperplan $\{a^Tz=b\}$ vaut

$$\frac{|a^Tx - b|}{\|a\|} = \frac{|5-9|}{3} = \frac43$$

*Contrôle de cohérence : $x$ est strictement à l'intérieur de $H$, la distance est donc strictement positive.*

</details>

**Niveau 4 — type feuille d'exercices** — Une raffinerie produit de l'essence ($x_1$ barils) et du fioul ($x_2$ barils). Chaque baril d'essence demande 2 h de craquage et 1 h de raffinage, chaque baril de fioul 1 h et 4 h. On dispose de 3 h de craquage et 5 h de raffinage. Les marges sont de 1 par baril pour chacun. Formulez, résolvez graphiquement, identifiez les contraintes actives.

<details><summary>Correction</summary>

$$\max\ x_1+x_2 \quad\text{s.c.}\quad 2x_1+x_2\leq3,\quad x_1+4x_2\leq5,\quad x_1,x_2\geq0$$

C'est **exactement l'exemple du slide 1-28**, écrit en minimisation de $-x_1-x_2$. Optimum en $(1,1)$, marge $2$. **Les deux contraintes sont actives** : $2(1)+1 = 3$ et $1+4(1)=5$ — les deux ateliers sont saturés, aucune heure ne reste inutilisée. C'est le cas typique : à l'optimum d'un LP à deux variables, **deux** contraintes se coupent au sommet retenu. *(Suite naturelle : combien vaut une heure de craquage supplémentaire ? C'est la question de la dualité, fiche 26.)*

</details>

## 🔴 Common mistakes

1. **Lire $Ax\preceq b$ comme une inégalité scalaire** — c'est $m$ inégalités composante par composante.
2. **Oublier les contraintes de signe** — $x\succeq0$ fait partie du polyèdre et doit apparaître dans $A$ et $b$ ; c'est la source d'erreur n°1 en modélisation.
3. **Confondre non borné et non admissible** — $p^\star=-\infty$ contre $p^\star=+\infty$, deux diagnostics opposés.
4. **Chercher l'optimum à l'intérieur** du polyèdre — il est toujours au bord, et en général sur un sommet.
5. **Croire qu'un polyèdre est borné** — un demi-espace est un polyèdre. La bornitude se démontre.
6. **Oublier le vecteur normal non nul** — la définition d'un hyperplan et d'un demi-espace exige $a\neq0$ ; sinon $\{x \mid 0 = b\}$ est vide ou tout l'espace.
7. **Maximiser en gardant $c$** — $\max c^Tx$ devient $\min\,(-c)^Tx$, et la valeur optimale change de signe. Beaucoup de solveurs n'acceptent que la minimisation.

## 📌 Ultimate Review

1. LP $=$ objectif linéaire $+$ contraintes linéaires, en trois écritures équivalentes : indices, produits scalaires, matrices.
2. $Ax\preceq b$ : inégalité **composante par composante**.
3. Vocabulaire : admissible, ensemble admissible, optimal, $p^\star$ ; non borné $p^\star=-\infty$ ; non admissible $p^\star=+\infty$.
4. Hyperplan $\{a^Tx=b\}$, demi-espace $\{a^Tx\leq b\}$, $a\neq0$ vecteur normal ; $u = (b/\|a\|^2)a$ est le point de référence.
5. Polyèdre $=$ intersection finie de demi-espaces $=$ $\{x \mid Ax\preceq b\}$ ; une égalité vaut deux inégalités.
6. Géométrie du LP : pousser l'hyperplan $c^Tx=\gamma$ dans la direction $-c$ ; l'optimum est au bord, en général sur un sommet.
7. Relaxation de l'affectation : les contraintes d'affectation rendent l'optimum du LP automatiquement entier.
8. Histoire : simplexe (Dantzig 1947), ellipsoïde (Khachiyan 1979), points intérieurs (Karmarkar 1984).

**Formulas to know**

$$\min\ c^Tx \ \text{ s.c. } Ax\preceq b,\ Dx=f \qquad G=\{x\mid a^Tx=b\} \qquad H=\{x\mid a^Tx\leq b\} \qquad u=\frac{b}{\|a\|^2}a$$

**Methods to know** : le protocole de modélisation en 7 étapes ; la résolution graphique en dimension 2 par comparaison des sommets ; le passage $\max \to \min$.

## 🧠 Active Recall

**Basic** — Écrivez un LP général sous forme matricielle et nommez chaque objet.

<details><summary>Réponse</summary>

$\min\ c^Tx$ sous $Ax \preceq b$ et $Dx = f$. $x\in\mathbb{R}^n$ : variables ; $c\in\mathbb{R}^n$ : coefficients de coût ; $A\in\mathbb{R}^{m\times n}$, $b\in\mathbb{R}^m$ : contraintes d'inégalité ; $D\in\mathbb{R}^{p\times n}$, $f\in\mathbb{R}^p$ : contraintes d'égalité. L'inégalité est composante par composante.

</details>

**Understanding** — Pourquoi l'optimum d'un LP se trouve-t-il toujours au bord de l'ensemble admissible ?

<details><summary>Réponse</summary>

Si $x$ est intérieur et $c\neq0$, une petite boule autour de $x$ reste admissible ; en se déplaçant de $x$ vers $x - \varepsilon c$ on reste admissible et l'objectif baisse de $\varepsilon\|c\|^2$. Donc $x$ ne peut pas être optimal. Seul un point du bord bloque ce déplacement.

</details>

**Application** — Le problème $\min\ -x_1$ sous $x_1 - x_2 \leq 0$, $x_2\geq0$ : admissible ? borné ?

<details><summary>Réponse</summary>

Admissible : $(0,0)$ convient. Mais pour tout $t>0$, $(t,t)$ est admissible et l'objectif vaut $-t \to -\infty$. Le problème est **non borné**, $p^\star = -\infty$ : le polyèdre s'étend indéfiniment dans la direction $-c = (1,0)$.

</details>

**Comparison** — Formulation combinatoire et formulation linéaire du problème d'affectation : qu'est-ce qui change, et pourquoi est-ce sans conséquence ?

<details><summary>Réponse</summary>

Seule change la contrainte $x_{ij}\in\{0,1\}$, remplacée par $0\leq x_{ij}\leq 1$. La première rend le problème combinatoire ($N!$ candidats) ; la seconde en fait un LP. Le cours annonce qu'à l'optimum du LP relâché, les $x_{ij}$ **sont** automatiquement dans $\{0,1\}$ : la relaxation ne perd donc rien, et un problème combinatoire devient résoluble efficacement.

</details>

**Exam-style** — Décrivez géométriquement $\{x\in\mathbb{R}^2 \mid x_1+x_2 = 2\}$, $\{x \mid x_1+x_2\leq2\}$, puis leur intersection avec $x\succeq0$. Où se trouve le maximum de $x_1$ sur ce dernier ensemble ?

<details><summary>Réponse</summary>

Une droite de vecteur normal $a=(1,1)$ ; le demi-plan situé du côté opposé à $a$, sous cette droite ; l'intersection avec $x\succeq0$ est le **triangle** de sommets $(0,0)$, $(2,0)$, $(0,2)$. Maximiser $x_1$, c'est pousser l'hyperplan $x_1 = \gamma$ vers les $\gamma$ croissants : le dernier point touché est le sommet $(2,0)$, valeur $2$. Les contraintes actives y sont $x_1+x_2\leq2$ et $x_2\geq0$.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Forme matricielle d'un LP ? | $\min c^Tx$ s.c. $Ax\preceq b$, $Dx=f$ |
| Sens de $Ax\preceq b$ ? | Composante par composante : $a_i^Tx\leq b_i$ pour tout $i$ |
| $p^\star$ d'un problème non borné ? | $-\infty$ |
| $p^\star$ d'un problème non admissible ? | $+\infty$ |
| Hyperplan ? | $\{x\mid a^Tx=b\}$, $a\neq0$ ; $a$ est le vecteur normal |
| Demi-espace ? | $\{x\mid a^Tx\leq b\}$, $a\neq0$ |
| Polyèdre ? | Intersection d'un nombre fini de demi-espaces, $\{x\mid Ax\preceq b\}$ |
| Comment écrire une égalité dans un polyèdre ? | $Fx=g \iff Fx\preceq g$ et $-Fx\preceq -g$ |
| Où se trouve l'optimum d'un LP ? | Au bord, en général sur un sommet |
| Dans quelle direction pousse-t-on l'hyperplan objectif ? | $-c$ |
| Relaxation du problème d'affectation ? | $x_{ij}\in\{0,1\}$ devient $0\leq x_{ij}\leq1$ ; l'optimum reste entier |
| Trois dates de l'histoire du LP ? | Simplexe 1947 (Dantzig), ellipsoïde 1979 (Khachiyan), points intérieurs 1984 (Karmarkar) |
