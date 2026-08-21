# Fiche 33 — Programmation linéaire en nombres entiers et séparation-évaluation

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 18 « Integer linear programming », 8 diapositives |
| **Difficulté** | Fondamental — court, mais c'est la porte de l'optimisation combinatoire |
| **Temps d'étude estimé** | 1 h 15 |
| **Prérequis** | Fiche 31 (unimodularité totale, relaxation exacte), fiche 24 (modélisation) |
| **Concepts clés** | Programme linéaire en nombres entiers, variables booléennes, relaxation linéaire, borne inférieure, séparation-évaluation, élagage |
| **Poids à l'examen** | Deux compétences : **modéliser** avec des variables booléennes (localisation, affectation, choix), et **dérouler un arbre de séparation-évaluation** en expliquant chaque élagage. |

## 🎯 Vue d'ensemble

La fiche 31 a montré un cas heureux : quand la matrice de contraintes est totalement unimodulaire, la contrainte d'intégrité est **gratuite**. Cette leçon traite le cas général, où elle ne l'est pas — et où le problème devient difficile.

La stratégie est universelle : **relaxer pour borner, séparer pour décider**.

```
RELAXER  : on retire x ∈ Zⁿ  →  un LP  →  BORNE INFÉRIEURE
SÉPARER  : on coupe P en morceaux (x₁ ≤ 2 / x₁ ≥ 3)  →  sous-problèmes
ÉLAGUER  : un sous-problème dont la borne est trop mauvaise est ABANDONNÉ
           sans être exploré
```

Ce que la relaxation apporte n'est donc pas une solution mais un **certificat d'inutilité** : elle permet de jeter des branches entières de l'arbre sans les visiter.

## 🟡 Concept 1 — Les trois formes

**Programme linéaire en nombres entiers (ILP)** :

$$\begin{array}{ll}\text{minimiser} & c^Tx\\ \text{sous} & Ax\preceq b\\ & x\in\mathbb{Z}^n\end{array}$$

**Programme linéaire mixte** : seules **certaines** variables sont entières.

**Programme linéaire 0-1 (booléen)** : les variables prennent les valeurs $0$ ou $1$.

**Le pouvoir de modélisation des variables booléennes.** Une variable $0/1$ encode une **décision** : ouvrir ou non un site, sélectionner ou non un objet, affecter ou non une tâche. Ce que le LP continu ne sait pas exprimer — « c'est tout ou rien » —, l'ILP l'exprime en une ligne. C'est ce qui le rend à la fois si expressif et si difficile.

## 🟠 Concept 2 — Exemple : le problème de localisation d'installations

**Les données.** $n$ emplacements possibles, $m$ clients ; $c_j$ est le coût d'ouverture d'une installation à l'emplacement $j$, et $d_{ij}$ le coût de service du client $i$ depuis l'emplacement $j$.

**Formulation en LP booléen :**

$$\begin{array}{ll}\text{minimiser} & \displaystyle\sum_{j=1}^n c_jy_j + \sum_{i=1}^m\sum_{j=1}^n d_{ij}x_{ij}\\[6pt] \text{sous} & \displaystyle\sum_{j=1}^n x_{ij} = 1, \qquad i=1,\dots,m\\[6pt] & x_{ij}\leq y_j, \qquad i=1,\dots,m,\ j=1,\dots,n\\[4pt] & x_{ij},\ y_j\in\{0,1\}\end{array}$$

**Les variables.** $x_{ij}=1$ si l'emplacement $j$ sert le client $i$ ; $y_j=1$ si l'emplacement $j$ est **sélectionné**.

**Les contraintes, une par une.**

- $\sum_j x_{ij}=1$ : chaque client est servi par **exactement un** emplacement ;
- $x_{ij}\leq y_j$ : on ne peut servir depuis un emplacement **que s'il est ouvert**. C'est la contrainte de **couplage**, et c'est elle qui donne toute sa structure au problème.

**Ce qu'il faut voir.** Le couplage $x_{ij}\leq y_j$ est le motif de modélisation le plus utile de tout l'ILP : « l'action $x$ n'est possible que si la décision $y$ est prise ». On le retrouve partout — coût fixe d'installation, capacité activée, option souscrite.

⚠️ Ce problème **n'est pas** un problème de réseau : sa matrice de contraintes n'est pas d'incidence, et la relaxation linéaire n'a **aucune raison** d'être entière. C'est exactement le cas difficile.

## 🔴 Concept 3 — La relaxation linéaire

**Définition.** Relâcher, c'est retirer la contrainte $x\in\mathbb{Z}^n$ (et remplacer $x\in\{0,1\}$ par $0\preceq x\preceq\mathbf1$).

**Deux propriétés.**

1. La relaxation fournit une **borne inférieure** sur la valeur optimale de l'ILP — on minimise sur un ensemble **plus grand**.
2. Si la solution de la relaxation est **entière**, alors elle résout l'ILP : elle est admissible pour le problème entier et optimale sur un ensemble plus grand.

**L'avertissement du cours, essentiel.** *Des formulations ILP équivalentes peuvent avoir des relaxations différentes.*

**Ce que cela signifie.** Deux modèles décrivant **exactement les mêmes points entiers** peuvent avoir des polyèdres relâchés très différents. Celui dont le polyèdre est le plus **serré** autour des points entiers donne une meilleure borne, donc un arbre de séparation plus petit. **La qualité d'une modélisation ILP se mesure à la qualité de sa relaxation**, pas seulement à sa correction.

**Le lien avec la fiche 31.** La relaxation est **exacte** (borne atteinte, solution entière) lorsque la matrice est totalement unimodulaire et les données entières. C'est le cas idéal ; hors de là, il reste un **saut d'intégrité** et il faut chercher la solution entière.

## 🔴 Concept 4 — L'algorithme de séparation-évaluation

**Cadre général.**

$$\min\ c^Tx \quad\text{sous}\quad x\in P$$

où $P$ est un ensemble **fini**.

**L'idée.**

- **partitionner récursivement** $P$ en sous-ensembles $P_i$, et résoudre les sous-problèmes $\min c^Tx$ s.c. $x\in P_i$ ;
- **utiliser les relaxations linéaires pour écarter** les sous-problèmes qui ne peuvent pas mener à une solution.

**Les trois raisons d'élaguer une branche.** À chaque nœud, on résout la relaxation et l'on compare sa valeur à la **meilleure solution entière connue** (l'incumbent) :

| Situation au nœud | Conclusion |
|---|---|
| relaxation **non admissible** | le sous-problème n'a aucune solution : **abandon** |
| valeur de la relaxation $\geq$ meilleure valeur entière connue | aucun descendant ne fera mieux : **abandon** |
| solution de la relaxation **entière** | on a une solution admissible : on met à jour l'incumbent, **pas besoin de descendre** |
| sinon | **séparer** sur une variable fractionnaire |

**Comment séparer.** Si $x_k^\star = 2{,}17$ dans la relaxation, aucune solution entière n'a $2 < x_k < 3$. On coupe donc en deux :

$$x_k\leq2 \qquad\text{ou}\qquad x_k\geq3$$

Les deux morceaux couvrent tous les points entiers, et **excluent** la solution fractionnaire courante — ce qui garantit la progression.

## 🔴 Concept 5 — L'exemple déroulé du cours

$$\min\ -2x_1-3x_2 \quad\text{sous}\quad x\in P, \qquad P = \Big\{x\in\mathbb{Z}^2_+ \ \Big|\ \frac{2x_1}{9}+\frac{x_2}{4}\leq1,\quad \frac{x_1}{7}+\frac{x_2}{3}\leq1\Big\}$$

**Le point optimal est $(2,2)$**, de valeur $-10$. Voici comment l'arbre le découvre.

| Nœud | Contraintes ajoutées | Solution de la relaxation | Valeur |
|---|---|---|---|
| $P_0$ | — | $(2{,}17,\ 2{,}07)$ | $-10{,}56$ |
| $P_1$ | $x_1\leq2$ | $(2{,}00,\ 2{,}14)$ | $-10{,}43$ |
| $P_2$ | $x_1\geq3$ | $(3{,}00,\ 1{,}33)$ | $-10{,}00$ |
| $P_3$ | $x_1\leq2$, $x_2\leq2$ | $(2{,}00,\ 2{,}00)$ | $-10{,}00$ |
| $P_4$ | $x_1\leq2$, $x_2\geq3$ | $(0{,}00,\ 3{,}00)$ | $-9{,}00$ |
| $P_5$ | $x_1\geq3$, $x_2\leq1$ | $(3{,}38,\ 1{,}00)$ | $-9{,}75$ |
| $P_6$ | $x_1\geq3$, $x_2\geq2$ | non admissible | $+\infty$ |
| $P_7$ | $\dots$, $x_1=3$ | $(3{,}00,\ 1{,}00)$ | $-9{,}00$ |
| $P_8$ | $\dots$, $x_1\geq4$ | $(4{,}00,\ 0{,}44)$ | $-9{,}33$ |
| $P_9$ | $\dots$, $x_2=0$ | $(4{,}50,\ 0{,}00)$ | $-9{,}00$ |
| $P_{10}$ | $\dots$, $x_2=1$ | non admissible | $+\infty$ |
| $P_{11}$ | $\dots$, $x_1=4$ | $(4{,}00,\ 0{,}00)$ | $-8{,}00$ |
| $P_{12}$ | $\dots$, $x_1\geq5$ | non admissible | $+\infty$ |

**Les conclusions tirées par le cours.**

- **$P_2$** ($x_1\geq3$) : la valeur optimale du sous-problème est $\geq-10{,}00$ — sa relaxation vaut déjà $-10{,}00$, donc **aucun** point entier de cette branche ne fera mieux que $-10$.
- **$P_3$** ($x_1\leq2$, $x_2\leq2$) : la solution de la relaxation est $(2,2)$, **entière** — c'est une solution admissible de l'ILP, de valeur $-10$.
- **$P_6$** ($x_1\geq3$, $x_2\geq2$) : le sous-problème est **non admissible**.

**Le résultat marquant.** Après avoir résolu les relaxations de $P_0$, $P_1$, $P_2$, $P_3$ et $P_4$ **seulement**, on peut conclure que $(2,2)$ est la solution optimale de l'ILP. Les nœuds $P_5$ à $P_{12}$ **n'auraient jamais eu besoin d'être explorés** : ils descendent de $P_2$, dont la borne $-10{,}00$ interdit déjà de battre l'incumbent.

**Le raisonnement complet, à savoir rédiger.**

1. $P_3$ fournit la solution entière $(2,2)$, de valeur $-10$ : **incumbent** $=-10$.
2. $P_4$ a une borne de $-9{,}00 > -10$ : cette branche est **élaguée**.
3. $P_2$ a une borne de $-10{,}00 \geq -10$ : cette branche entière est **élaguée** — et avec elle les huit nœuds qu'elle contient.
4. Tout l'arbre est donc traité, et $(2,2)$ est optimal. $\blacksquare$

⚠️ Notez que $P_2$ a une borne **égale** à l'incumbent. On élague quand même : une branche qui ne peut qu'**égaler** la meilleure solution connue n'apporte rien (à moins qu'on ne veuille énumérer **toutes** les solutions optimales).

### Comment résoudre l'exercice type (protocole)

1. **Résoudre la relaxation** à la racine : borne inférieure globale.
2. **Si la solution est entière** : c'est fini.
3. **Choisir une variable fractionnaire** $x_k^\star$ et **séparer** en $x_k\leq\lfloor x_k^\star\rfloor$ et $x_k\geq\lceil x_k^\star\rceil$.
4. **Résoudre la relaxation de chaque fils** et appliquer les trois tests d'élagage : non admissible, borne $\geq$ incumbent, solution entière.
5. **Mettre à jour l'incumbent** dès qu'une solution entière apparaît — plus il arrive tôt, plus on élaguera.
6. **Recommencer** sur les nœuds actifs jusqu'à ce qu'il n'en reste aucun.
7. **Conclure** : l'incumbent final est optimal, et l'on **justifie** chaque branche non explorée par sa borne.

### Comment reconnaître qu'il faut un ILP

| Signe dans l'énoncé | Modélisation |
|---|---|
| « ouvrir ou non », « choisir ou non » | variable booléenne $y_j\in\{0,1\}$ |
| Un **coût fixe** en plus d'un coût variable | couplage $x_{ij}\leq y_j$ (ou $x\leq My$) |
| « au plus $k$ parmi $n$ » | $\sum_j y_j\leq k$ |
| « si A alors B » | $y_A\leq y_B$ |
| Des quantités **indivisibles** (machines, personnes) | $x\in\mathbb{Z}^n$ |
| Un réseau, un couplage, un plus court chemin | **pas besoin** d'ILP — la relaxation suffit (fiche 31) |

### Exercices progressifs

**Niveau 1** — La relaxation d'un ILP de minimisation vaut $-7{,}3$. Que peut-on affirmer sur la valeur optimale entière ?

<details><summary>Correction</summary>

Elle est $\geq -7{,}3$ : la relaxation est une **borne inférieure**. Et comme la valeur optimale entière est ici forcément entière si $c$ l'est et $x$ aussi, on peut même écrire $\geq-7$. *Attention :* cet arrondi n'est licite que si l'objectif ne prend que des valeurs entières sur les points entiers.

</details>

**Niveau 2** — Traduisez : « le site 3 ne peut être ouvert que si le site 1 l'est aussi », et « au plus deux sites parmi cinq ».

<details><summary>Correction</summary>

$$y_3\leq y_1 \qquad\text{et}\qquad \sum_{j=1}^5 y_j\leq2$$

La première interdit $(y_1,y_3) = (0,1)$ et autorise les trois autres combinaisons — c'est exactement l'implication « $y_3=1\Rightarrow y_1=1$ ». C'est le même motif que le couplage $x_{ij}\leq y_j$ de la localisation.

</details>

**Niveau 3** — Au nœud courant, la relaxation donne $x^\star = (1{,}5,\ 3)$ de valeur $-8$, et l'incumbent vaut $-8$. Que fait-on ?

<details><summary>Correction</summary>

On **élague**. La borne du nœud ($-8$) n'est pas strictement meilleure que l'incumbent ($-8$) : aucun descendant ne pourra faire mieux que $-8$, puisque la valeur d'un sous-problème est toujours $\geq$ la borne de son parent. Inutile de séparer sur $x_1$. *(Si l'on cherchait **toutes** les solutions optimales, il faudrait au contraire explorer.)*

</details>

**Niveau 4 — type feuille d'exercices** — Sur l'exemple du concept 5, montrez que la branche $P_2$ pouvait être élaguée dès que $(2,2)$ a été trouvé, et évaluez l'économie.

<details><summary>Correction</summary>

**L'argument.** La relaxation de $P_2$ vaut $-10{,}00$. Or, pour tout sous-ensemble $Q\subseteq P_2$, la valeur optimale de l'ILP sur $Q$ est $\geq$ la valeur de la relaxation sur $P_2$ — les bornes ne peuvent que **croître** en descendant dans l'arbre (on ajoute des contraintes). Une fois l'incumbent fixé à $-10$ par $P_3$, aucun descendant de $P_2$ ne peut donner strictement mieux : la branche entière est inutile.

**L'économie.** La branche $P_2$ contient $P_5,P_6,P_7,P_8,P_9,P_{10},P_{11},P_{12}$, soit **huit** relaxations épargnées sur les treize nœuds de l'arbre — plus de **60 %** du travail. Et c'est le cas d'un tout petit exemple à deux variables ; sur un problème réel, la qualité des bornes fait la différence entre quelques secondes et plusieurs jours.

**La morale.** Deux leviers pour accélérer un branch-and-bound : trouver **tôt** une bonne solution entière (pour élaguer vite), et disposer de **bonnes bornes** — c'est-à-dire d'une formulation dont la relaxation est serrée. On retrouve l'avertissement du concept 3.

</details>

## 🔴 Common mistakes

1. **Arrondir la solution de la relaxation** — l'arrondi n'est en général **ni admissible ni optimal**. Il faut séparer.
2. **Prendre la relaxation pour une solution** — c'est une **borne**, sauf si elle tombe entière (ou si la matrice est totalement unimodulaire).
3. **Séparer sur une variable déjà entière** — on sépare sur une variable **fractionnaire**, sinon la coupe n'exclut rien et l'arbre ne progresse pas.
4. **Oublier de mettre à jour l'incumbent** — sans meilleure solution connue, aucun élagage par la borne n'est possible et l'arbre explose.
5. **Élaguer sur la mauvaise comparaison** — en minimisation, on élague si borne $\geq$ incumbent ; en maximisation, si borne $\leq$ incumbent.
6. **Croire que deux formulations équivalentes se valent** — elles donnent les mêmes points entiers mais des relaxations différentes, donc des arbres de tailles très différentes.
7. **Utiliser un ILP là où un LP suffit** — pour un problème de réseau (fiche 31), la relaxation est exacte : imposer l'intégrité serait une perte de temps pure.

## 📌 Ultimate Review

1. ILP : $\min c^Tx$ s.c. $Ax\preceq b$, $x\in\mathbb{Z}^n$ ; **mixte** si certaines variables seulement ; **booléen** si $x\in\{0,1\}^n$.
2. Motif de modélisation clé : $x_{ij}\leq y_j$ — « l'action n'est possible que si la décision est prise ».
3. **Relaxation** : retirer $x\in\mathbb{Z}^n$. Elle donne une **borne inférieure** ; si sa solution est entière, elle résout l'ILP.
4. Des formulations équivalentes ont des relaxations différentes : **la qualité de la borne est un choix de modélisation**.
5. **Séparation-évaluation** : partitionner récursivement, résoudre les relaxations, élaguer.
6. Trois motifs d'élagage : non-admissibilité, borne $\geq$ incumbent, solution entière trouvée.
7. Séparer sur une variable fractionnaire $x_k^\star$ : $x_k\leq\lfloor x_k^\star\rfloor$ ou $x_k\geq\lceil x_k^\star\rceil$.
8. Sur l'exemple du cours, cinq relaxations sur treize suffisent à prouver l'optimalité de $(2,2)$.

**Formulas to know**

$$\min c^Tx \ \text{s.c.}\ Ax\preceq b,\ x\in\mathbb{Z}^n \qquad x_{ij}\leq y_j \qquad x_k\leq\lfloor x_k^\star\rfloor \ \text{ ou }\ x_k\geq\lceil x_k^\star\rceil$$

**Methods to know** : le protocole de séparation-évaluation en 7 étapes ; les trois tests d'élagage ; les motifs de modélisation booléenne.

## 🧠 Active Recall

**Basic** — Qu'apporte la relaxation linéaire d'un ILP, et dans quel cas résout-elle le problème ?

<details><summary>Réponse</summary>

Elle fournit une **borne inférieure** sur la valeur optimale (on minimise sur un ensemble plus grand). Elle **résout** l'ILP si sa solution optimale se trouve être entière — en particulier lorsque la matrice de contraintes est totalement unimodulaire et les données entières (fiche 31).

</details>

**Understanding** — Pourquoi peut-on élaguer une branche dont la borne dépasse l'incumbent ?

<details><summary>Réponse</summary>

Parce que les bornes **croissent** en descendant dans l'arbre : chaque fils ajoute des contraintes, donc sa relaxation vaut au moins celle du parent. Si la borne du parent est déjà $\geq$ la meilleure valeur entière connue, aucun de ses descendants ne peut faire strictement mieux. On les jette tous d'un coup.

</details>

**Application** — La relaxation donne $x^\star = (3{,}0,\ 4{,}6)$. Sur quoi séparer, et comment ?

<details><summary>Réponse</summary>

Sur $x_2$, la seule variable fractionnaire : deux fils, $x_2\leq4$ et $x_2\geq5$. Ces deux morceaux couvrent tous les points entiers et excluent la solution courante $4{,}6$, ce qui garantit que l'arbre progresse. Séparer sur $x_1$, déjà entière, ne servirait à rien.

</details>

**Comparison** — Problème de réseau et problème de localisation : pourquoi l'un est-il facile et l'autre difficile ?

<details><summary>Réponse</summary>

Le problème de réseau a une matrice **d'incidence**, donc totalement unimodulaire : les sommets du polyèdre relâché sont entiers, la relaxation est **exacte** et un simple LP suffit. La localisation d'installations n'a pas cette structure ; sa relaxation donne des solutions fractionnaires et il faut un branch-and-bound. La différence n'est pas la taille, mais la **structure de la matrice**.

</details>

**Exam-style** — Modélisez : $n$ projets, chacun de coût $c_j$ et de gain $g_j$ ; budget $B$ ; le projet 2 exige le projet 1 ; on veut au plus trois projets.

<details><summary>Réponse</summary>

Variables booléennes $y_j\in\{0,1\}$ ($y_j=1$ si le projet $j$ est retenu) :

$$\begin{array}{ll}\text{maximiser} & \displaystyle\sum_{j=1}^n g_jy_j\\[4pt] \text{sous} & \displaystyle\sum_{j=1}^n c_jy_j\leq B \quad\text{(budget)}\\[4pt] & y_2\leq y_1 \quad\text{(précédence)}\\[4pt] & \displaystyle\sum_{j=1}^n y_j\leq3 \quad\text{(cardinalité)}\\[4pt] & y_j\in\{0,1\}\end{array}$$

C'est un **sac à dos** avec contraintes additionnelles — la matrice n'est pas totalement unimodulaire (les $c_j$ sont quelconques), donc la relaxation ne donnera qu'une borne et il faudra séparer.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| ILP ? | $\min c^Tx$ s.c. $Ax\preceq b$, $x\in\mathbb{Z}^n$ |
| LP mixte ? | Seules certaines variables sont entières |
| LP booléen ? | Variables dans $\{0,1\}$ |
| Que donne la relaxation linéaire ? | Une **borne inférieure** sur l'optimum entier |
| Quand résout-elle l'ILP ? | Quand sa solution est entière (ex. matrice totalement unimodulaire) |
| Deux formulations équivalentes ont-elles la même relaxation ? | **Non** — d'où l'importance de la qualité du modèle |
| Contrainte de couplage ? | $x_{ij}\leq y_j$ : servir depuis $j$ exige d'ouvrir $j$ |
| « au plus $k$ parmi $n$ » ? | $\sum_j y_j\leq k$ |
| « si A alors B » ? | $y_A\leq y_B$ |
| Idée du branch-and-bound ? | Partitionner récursivement, borner par les relaxations, élaguer |
| Les trois motifs d'élagage ? | Non admissible ; borne $\geq$ incumbent ; solution entière trouvée |
| Comment sépare-t-on ? | Sur une variable fractionnaire : $x_k\leq\lfloor x_k^\star\rfloor$ ou $x_k\geq\lceil x_k^\star\rceil$ |
| Les bornes évoluent comment dans l'arbre ? | Elles **croissent** en descendant (on ajoute des contraintes) |
| Peut-on arrondir la solution relâchée ? | Non — ni admissible ni optimale en général |
