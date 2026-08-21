# Fiche 515 — Les jeux sous forme stratégique : dominance, équilibre de Nash et information incomplète

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 7 « Game Theory », §7.1 « Strategic Decision Making » et §7.2 « Strategic Form Games » (p. 305-325) |
| **Difficulté** | Avancé |
| **Temps d'étude estimé** | 145 min |
| **Prérequis** | Fiche 506 (utilité de von Neumann-Morgenstern, loteries, espérance d'utilité) · fiche 509 (duopoles de Cournot et de Bertrand) · fiche 510 (théorème du point fixe de Brouwer, A1.11) |
| **Concepts clés** | Décision stratégique, circularité, imprévisibilité, jeu sous forme stratégique, stratégie dominante stricte, stratégie strictement dominée, élimination itérative, dominance faible, « devine la moyenne », équilibre de Nash en stratégies pures, stratégie mixte, équilibre de Nash, tests simplifiés, existence de Nash, point fixe de Brouwer, jeu de coordination, deux interprétations des stratégies mixtes, information incomplète, types, croyances, a priori commun, jeu bayésien, jeu stratégique associé, équilibre bayésien-nashien |
| **Poids à l'examen** | Les **définitions 7.1 à 7.9** énoncées précisément · l'analyse **heuristique** du duel batteur-lanceur · le jeu **« devine la moyenne »** et ses tours d'élimination · le **théorème 7.1** et sa preuve *(les trois équivalences)* · la **preuve complète du théorème 7.2** — la construction de $f$, Brouwer, et le calcul algébrique du pas 3 · les **deux interprétations** des stratégies mixtes · la construction du **jeu stratégique associé $G^+$**. |

## 🎯 Vue d'ensemble

```
LE FIL DU §7.1 ET DU §7.2 :
comment des agents rationnels agissent quand chacun depend des autres

  §7.1  LA DECISION STRATEGIQUE

     « Chaque agent doit d'abord CONNAITRE la decision des autres
       avant de savoir quelle decision est la meilleure pour lui.
       CETTE CIRCULARITE est la MARQUE de la theorie des jeux. »

     LE DUEL BATTEUR-LANCEUR  (fig. 7.1)

              batteur : F      C
        lanceur  F   -1, 1    1, -1
                 C    1, -1  -1, 1

     Le raisonnement HEURISTIQUE :
        « toujours la balle rapide » est PREVISIBLE
        -> le batteur s'y prepare -> le lanceur devrait lancer la courbe
        -> CONTRADICTION avec l'hypothese de depart

     CONCLUSION : le comportement doit etre IMPREVISIBLE.
     « Tout bon joueur de poker le comprend bien --
       c'est un aspect essentiel du BLUFF reussi. »

  §7.2  LES JEUX SOUS FORME STRATEGIQUE

     DEF. 7.1  G = (S_i, u_i) pour i = 1..N
               joueurs, STRATEGIES, PAIEMENTS

  §7.2.1  LA DOMINANCE

     DEF. 7.2  strategie STRICTEMENT DOMINANTE  (rare !)
     DEF. 7.3  strategie STRICTEMENT DOMINEE  (une contre UNE autre)
     DEF. 7.4  ELIMINATION ITERATIVE stricte  (S_i^n)
     DEF. 7.5  dominance FAIBLE
     DEF. 7.6  elimination iterative FAIBLE  (W_i^n)

     « DEVINE LA MOYENNE » :  chacun choisit 1 a 100,
     le plus proche du TIERS de la moyenne gagne
        33 domine faiblement tout nombre superieur  (car moy/3 <= 33.33)
        puis 11, puis ...  ->  il ne reste que 1

  §7.2.2  L'EQUILIBRE DE NASH

     DEF. 7.7  Nash en STRATEGIES PURES :  u_i(s^) >= u_i(s_i, s^_-i)
        -> le duel batteur-lanceur n'en a AUCUN

     DEF. 7.8  STRATEGIE MIXTE = distribution de probabilite sur S_i
     DEF. 7.9  EQUILIBRE DE NASH  (en strategies mixtes)

     THEOREME 7.1  TESTS SIMPLIFIES -- trois enonces equivalents
        (b) INDIFFERENCE entre les pures de SUPPORT POSITIF
            (le plus utile pour CALCULER)
        (c) il suffit de tester les strategies PURES
            (le plus utile pour VERIFIER)

     EXEMPLE 7.1  le jeu de COORDINATION  (traitement de texte)
        deux equilibres PURS + un equilibre MIXTE  p = q = 1/3
        -> paiement 2/3, INEFFICACE

     LES DEUX INTERPRETATIONS d'une strategie mixte :
        (1) une ROULETTE -- randomisation deliberee
        (2) les CROYANCES des autres sur ce que je vais jouer

     THEOREME 7.2  (NASH)  TOUT jeu fini possede un equilibre de Nash
        preuve en 3 pas :  construire f  ->  BROUWER  ->  le point fixe
                           est un equilibre

  §7.2.3  L'INFORMATION INCOMPLETE  (Harsanyi 1967-68)

     On ajoute :  des TYPES T_i  et des CROYANCES p_i(t_-i | t_i)
     eventuellement issues d'un A PRIORI COMMUN p

     DEF. 7.10  JEU BAYESIEN  G = (p_i, T_i, S_i, u_i)
     DEF. 7.11  le JEU STRATEGIQUE ASSOCIE G+
                CHAQUE TYPE de chaque joueur devient UN JOUEUR
     DEF. 7.12  EQUILIBRE BAYESIEN-NASHIEN = Nash de G+

     THEOREME 7.3  tout jeu bayesien FINI en possede un
                   (corollaire immediat du theoreme 7.2)
```

> ⚠️ **Note de transcription — identique aux fiches 500-514.** Le PDF de ce chapitre perd le **barré du $\neq$** *(ainsi « $s_i=\hat s_i$ » dans la définition 7.2 signifie $s_i\neq\hat s_i$, et « $(x,a)\notin X$ » s'exporte parfois comme « $\in/$ »)*, ainsi que $\sum$, $\times$, $\gg$ et l'implication $\Longrightarrow$. Les exposants de la notation $S_i^{n}$ et $W_i^{n}$ sont parfois collés au symbole. Ces éléments sont rétablis depuis la prose et les équations voisines — **il s'agit d'une réparation de transcription, non d'un ajout de contenu**.

## 🔴 Concept 1 — §7.1 : ce qui rend une décision « stratégique »

### 1.1 L'ouverture du chapitre

<div class="callout" data-kind="methode">

<span class="callout__lab">comment marchandera-t-il avec le vendeur</span>

*« Quand un consommateur va acheter une nouvelle voiture, ? Si deux pays négocient un accord commercial, **quel en sera le résultat** ? Quelles stratégies suivront plusieurs compagnies pétrolières enchérissant chacune sur une parcelle offshore dans une **enchère à pli scellé** ? »*

</div>

> *« Dans des situations telles que celles-ci, **les actions qu'un agent quelconque peut prendre auront des conséquences pour les autres**. À cause de cela, **les agents ont une raison d'agir STRATÉGIQUEMENT**. »*

### 🔴 1.2 La définition de la théorie des jeux, et la CIRCULARITÉ

> *« **La théorie des jeux est l'étude systématique de la manière dont des agents RATIONNELS se comportent dans des situations stratégiques, ou dans des JEUX, où chaque agent doit d'abord CONNAÎTRE la décision des autres agents avant de savoir quelle décision est la meilleure pour lui-même.** »*

$$\boxed{\;\textbf{« CETTE CIRCULARITÉ est la MARQUE de la théorie des jeux. »}\;}$$

### 1.3 Le plan annoncé du chapitre

| Forme | Ce qu'elle décrit |
|---|---|
| **Forme stratégique** | *« des jeux dans lesquels les agents font **un choix unique et SIMULTANÉ** »* |
| **Forme extensive** | *« des jeux dans lesquels les joueurs peuvent faire des choix **EN SÉQUENCE** »* |

> *« Chemin faisant, nous rencontrerons **une variété de méthodes** pour déterminer l'issue d'un jeu. Vous verrez que **chaque méthode donne naissance à un CONCEPT DE SOLUTION particulier.** »*

**Les six concepts de solution annoncés :**

$$\text{dominance} \ \to\ \text{Nash} \ \to\ \text{Bayes-Nash} \ \to\ \text{induction à rebours} \ \to\ \text{perfection en sous-jeux} \ \to\ \text{équilibre séquentiel}$$

> *« **Chacun de ces concepts est plus SOPHISTIQUÉ que ses prédécesseurs, et savoir QUAND appliquer une solution plutôt qu'une autre est une part importante du métier de bon économiste appliqué.** »*

### 1.4 La distinction stratégique / non stratégique

> *« **La différence essentielle entre les décisions stratégiques et non stratégiques est que les dernières peuvent être prises « en ISOLEMENT », sans tenir compte des décisions que d'autres pourraient prendre.** »*

| Non stratégique | Stratégique |
|---|---|
| La **théorie du consommateur** *(chapitre 1)* : *« étant donnés les prix et le revenu, chaque consommateur agit **entièrement pour son compte, sans égard au comportement des autres** »* | Les modèles de **Cournot** et de **Bertrand** *(chapitre 4)* : *« chaque firme comprend bien que **son action optimale dépend de l'action prise par l'autre firme** »* |

## 🔴 Concept 2 — Le duel batteur-lanceur et l'argument d'imprévisibilité

### 2.1 La mise en place

> *« Considérez le **duel classique entre un batteur et un lanceur au baseball**. Pour garder les choses simples, supposons que le lanceur n'a que **deux lancers possibles — une BALLE RAPIDE (fastball) et une COURBE (curve)**. Supposons aussi qu'il est **bien connu que ce lanceur a la meilleure balle rapide de la ligue, mais que sa courbe n'est que MOYENNE**. »*

### 🔴 2.2 Pourquoi la décision non stratégique échoue

> *« Sur cette base, **il pourrait sembler préférable pour le lanceur de toujours lancer sa balle rapide**. Cependant, **une telle décision NON STRATÉGIQUE de la part du lanceur ne tient PAS compte de la décision du batteur. Car si le batteur s'attend à ce que le lanceur lance une balle rapide, alors, y étant préparé, IL LA FRAPPERA.** »*

> *« Par conséquent, **il serait sage pour le lanceur de tenir compte de la décision du batteur À PROPOS DU LANCER DU LANCEUR avant de décider quel lancer effectuer**. »*

### 2.3 La mise en nombres

> *« Pensez-y comme étant **la fin de la neuvième manche, avec un compte plein, les bases pleines, deux retraits, et l'équipe du lanceur menant d'un point**. Supposons aussi que le batteur soit **frappe un coup de circuit (et gagne le match) soit est retiré sur trois prises (et perd le match)**. Par conséquent, **il reste exactement un lancer dans le match**. »*

Chaque joueur tire une utilité de **$1$ d'une victoire** et de **$-1$ d'une défaite**.

> **La figure 7.1 — le jeu batteur-lanceur.**

|  | **Batteur : $F$** | **Batteur : $C$** |
|---|---|---|
| **Lanceur : $F$** | $-1,\ 1$ | $1,\ -1$ |
| **Lanceur : $C$** | $1,\ -1$ | $-1,\ 1$ |

> *« Le lanceur (P) choisit **la LIGNE**, $F$ (fastball) ou $C$ (curve), et le batteur (B) choisit **la COLONNE**. **Le batteur frappe un coup de circuit quand il se prépare pour le lancer que le lanceur a choisi, et est retiré sinon.** »*

⚠️ **La convention de lecture** : *« le paiement du lanceur étant **le PREMIER nombre** de chaque entrée et celui du batteur **le SECOND** »*.

### 🔴 2.4 L'argument d'imprévisibilité — à savoir dérouler

> *« Nous pouvons immédiatement tirer une conclusion **assez importante**, fondée uniquement sur les idées que **chaque joueur cherche à maximiser son paiement** et que **chacun raisonne stratégiquement**. Ici, **chaque joueur doit se comporter d'une manière « IMPRÉVISIBLE ». Pourquoi ?** »*

| Pas | Le raisonnement |
|---|---|
| **1** | *« Si le comportement du lanceur était **prévisible** en ce que, disons, **il lance toujours sa balle rapide**, alors le batteur, **en choisissant $F$, serait GARANTI de frapper un coup de circuit** et de gagner. »* |
| **2** | *« Mais ceci signifierait que **le comportement du batteur est prévisible aussi** — il se prépare **toujours** pour une balle rapide. »* |
| **3** | *« Par conséquent, **parce que le lanceur se comporte stratégiquement, il choisira optimalement de lancer sa COURBE**, retirant ainsi le batteur et gagnant le match. »* |
| **4** | *« **Mais ceci CONTREDIT notre supposition originelle que le lanceur lance toujours sa balle rapide !** »* |

> *« Nous concluons qu'**il ne peut pas être correctement prédit que le lanceur lance toujours une balle rapide. De même, il doit être incorrect de prédire qu'il lance toujours une courbe.** Ainsi, **quel que soit le comportement qui émerge finalement de ce scénario, il doit impliquer un certain MANQUE DE PRÉVISIBILITÉ.** »*

### 2.5 La leçon générale

> *« Ainsi, **quand des individus rationnels prennent des décisions stratégiquement, chacun tenant compte de la décision que l'autre prend, ils se comportent parfois d'une manière « IMPRÉVISIBLE ». Tout bon joueur de poker le comprend bien — c'est un aspect essentiel du BLUFF réussi.** »*

⚠️ *« Notez, cependant, qu'**il n'y a AUCUN tel avantage dans des cadres non stratégiques — quand vous êtes SEUL, il n'y a personne à « TROMPER »**. »*

> *« **Ceci n'est qu'un exemple de la manière dont les issues parmi des décideurs stratégiques peuvent différer TRÈS significativement de celles parmi des décideurs non stratégiques.** »*

## 🔴 Concept 3 — La définition d'un jeu sous forme stratégique

### 3.1 La recherche des éléments communs

> *« Le duel batteur-lanceur, ainsi que les duopoles de Cournot et de Bertrand, ne sont que **trois exemples** des sortes de situations stratégiques que les économistes souhaitent analyser. D'autres exemples incluent **le marchandage entre un syndicat et une firme**, **les guerres commerciales entre deux pays**, **les courses à la recherche-développement entre entreprises**, et ainsi de suite. »*

> *« Nous cherchons **un cadre UNIQUE capable de saisir les traits essentiels de chacun**. Nous devons donc chercher **les éléments qui leur sont COMMUNS**. »*

| L'élément | Le nom qu'on lui donne |
|---|---|
| *« un certain nombre de participants »* | les **JOUEURS** |
| *« une gamme d'actions possibles qui peuvent être prises »* | les **STRATÉGIES** |
| *« un paiement ou un autre selon **son propre** choix de stratégie **ainsi que** les stratégies choisies par chacun des autres »* | les **PAIEMENTS** |

> *« Comme le veut la tradition, nous nous référerons à une telle situation comme à un **JEU**, **même si les enjeux peuvent être fort SÉRIEUX**. »*

### 3.2 La définition 7.1

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.1 — Jeu sous forme stratégique</span>

Un **jeu sous forme stratégique** est un $n$-uplet $G=(S_i,u_i)_{i=1}^{N}$, où pour chaque joueur $i=1,\dots,N$, **$S_i$ est l'ensemble des stratégies disponibles pour le joueur $i$**, et

$$u_i:\ \prod_{j=1}^{N}S_j\ \longrightarrow\ \mathbb{R}$$

décrit **le paiement du joueur $i$ comme fonction des stratégies choisies par TOUS les joueurs**. Un jeu sous forme stratégique est **FINI** si l'ensemble de stratégies de chaque joueur contient **un nombre fini d'éléments**.

</div>

### 3.3 Le duel batteur-lanceur en forme stratégique

Avec le lanceur désigné comme joueur 1 :

$$S_1=S_2=\{F,C\}$$

$$u_1(F,F)=u_1(C,C)=-1, \qquad u_1(F,C)=u_1(C,F)=1$$

$$u_2(s_1,s_2)=-\,u_1(s_1,s_2) \qquad \forall\,(s_1,s_2)\in S_1\times S_2$$

⚠️ **La dernière ligne fait du jeu un jeu à SOMME NULLE** *(exercice 7.7)*.

> *« Notez que **les jeux sous forme stratégique à DEUX joueurs avec des ensembles de stratégies FINIS peuvent toujours être représentés sous forme MATRICIELLE**, les lignes indexant les stratégies du joueur 1, les colonnes celles du joueur 2, et les entrées désignant leurs paiements. »*

### 3.4 La notation qui servira partout

| Symbole | Ce qu'il désigne |
|---|---|
| $S=S_1\times\cdots\times S_N$ | *« l'ensemble des **stratégies pures JOINTES** »* |
| $-i$ | *« **tous les joueurs SAUF le joueur $i$** »* |
| $S_{-i}$ | $S_1\times\cdots\times S_{i-1}\times S_{i+1}\times\cdots\times S_N$ |
| $s_{-i}$ | un élément de $S_{-i}$ |

## 🔴 Concept 4 — §7.2.1 : la dominance stricte

### 4.1 Pourquoi on commence par là

> *« Chaque fois que nous tentons de prédire l'issue d'un jeu, **il est préférable de le faire SANS exiger que les joueurs en sachent beaucoup sur la manière dont leurs adversaires se comporteront. Ceci n'est pas toujours possible, mais quand ça l'est, la solution obtenue est particulièrement CONVAINCANTE.** »*

### 4.2 Le jeu de la figure 7.2

> **La figure 7.2 — stratégies strictement dominantes.**

|  | $L$ | $R$ |
|---|---|---|
| $U$ | $3,\ 0$ | $0,\ -4$ |
| $D$ | $2,\ 4$ | $-1,\ 8$ |

**Le joueur 2 doit raisonner stratégiquement :**

> *« Le choix maximisant le paiement du joueur 2 **dépend du choix fait par le joueur 1**. Si 1 choisit $U$, il est meilleur pour 2 de choisir $L$ ; si 1 choisit $D$, il est meilleur pour 2 de choisir $R$. »*

**Le joueur 1, lui, n'a pas à raisonner du tout :**

> *« Regardez de près les paiements et vous verrez que **le meilleur choix du joueur 1 est en fait INDÉPENDANT du choix fait par le joueur 2. Quel que soit le choix du joueur 2, $U$ est le meilleur pour le joueur 1.** »*

⟹ 1 choisit $U$ ; **l'ayant déduit**, 2 choisit $L$. *« Ainsi, **la seule issue sensée de ce jeu est la paire $(U,L)$**, de vecteur de paiements $(3,0)$. »*

### 4.3 La définition 7.2

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.2 — Stratégies strictement dominantes</span>

Une stratégie $\hat s_i$ pour le joueur $i$ est **strictement dominante** si

$$u_i(\hat s_i,s_{-i})>u_i(s_i,s_{-i}) \qquad \text{pour tout } (s_i,s_{-i})\in S \text{ avec } s_i\neq\hat s_i$$

</div>

⚠️ *« La présence d'une stratégie strictement dominante, **une qui est strictement supérieure à TOUTES les autres, est plutôt RARE**. »*

### 4.4 Le jeu de la figure 7.3 et la dominance d'une stratégie sur UNE autre

> **La figure 7.3 — stratégies strictement dominées.**

|  | $L$ | $M$ | $R$ |
|---|---|---|---|
| $U$ | $3,\ 0$ | $0,\ -5$ | $0,\ -4$ |
| $C$ | $1,\ -1$ | $3,\ 3$ | $-2,\ 4$ |
| $D$ | $2,\ 4$ | $4,\ 1$ | $-1,\ 8$ |

> *« **Aucun joueur ne possède ici de stratégie strictement dominante.** Pour le voir : le meilleur choix **unique** de 1 est $U$ quand 2 joue $L$, mais $D$ quand 2 joue $M$ ; et le meilleur choix unique de 2 est $L$ quand 1 joue $U$, mais $R$ quand 1 joue $D$. »*

**Mais chacun a une stratégie particulièrement peu attrayante :**

| Le joueur | La stratégie à éliminer | Pourquoi |
|---|---|---|
| **1** | $C$ | *« toujours surpassée par $D$ […] **quelle que soit** la stratégie choisie par 2 »* |
| **2** | $M$ | *« surpassée par $R$ **(vérifiez-le)** »* |

> *« Maintenant que $C$ et $M$ ont été retirées, vous remarquerez que **le jeu s'est RÉDUIT à celui de la figure 7.2**. Ainsi, comme avant, la seule issue sensée est $(3,0)$. »*

⚠️ *« Mais cette fois **nous nous sommes concentrés sur la dominance d'une stratégie sur UNE SEULE autre, plutôt que sur TOUTES les autres**. »*

### 4.5 La définition 7.3

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.3 — Stratégies strictement dominées</span>

La stratégie $\hat s_i$ du joueur $i$ **domine strictement** une autre de ses stratégies $\bar s_i$ si

$$u_i(\hat s_i,s_{-i})>u_i(\bar s_i,s_{-i}) \qquad \text{pour tout } s_{-i}\in S_{-i}$$

Dans ce cas, on dit aussi que **$\bar s_i$ est strictement dominée dans $S$**.

</div>

## 🔴 Concept 5 — L'élimination itérative

### 🔴 5.1 La revue des deux solutions — le point qui motive l'itération

**Dans le jeu de la figure 7.2 :**

> *« $U$ était strictement **dominante** pour 1. Nous avons donc pu éliminer $D$. Une fois fait, nous avons pu conclure que 2 choisirait $L$ — ou, ce qui revient au même, éliminer $R$. »*

> ⚠️ *« Notez que **bien que $R$ ne soit PAS strictement dominée dans le jeu ORIGINAL, elle EST strictement dominée (par $L$) dans le jeu RÉDUIT** dans lequel $D$ a été éliminée. »*

**Dans le jeu de la figure 7.3 :**

$$C \ \text{et} \ M \quad\to\quad D \quad\to\quad R \qquad\Longrightarrow\qquad (U,L)$$

> ⚠️ *« À nouveau, **$D$ n'est pas strictement dominée dans le jeu original, mais elle l'est dans le jeu réduit** dans lequel $C$ a été éliminée. De même, **$R$ ne devient strictement dominée qu'APRÈS que $C$ ET $D$ ont été éliminées**. »*

$$\boxed{\;\text{La dominance CRÉE de la dominance — d'où l'itération.}\;}$$

### 5.2 La construction formelle

Poser $S_i^0=S_i$ pour chaque joueur, et pour $n\geq1$, soit $S_i^n$ **l'ensemble des stratégies de $i$ survivant après le $n$-ième tour d'élimination** :

$$s_i\in S_i^n \quad\text{si}\quad s_i\in S_i^{n-1} \text{ n'est pas strictement dominée dans } S^{n-1}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.4 — Stratégies itérativement strictement non dominées</span>

Une stratégie $s_i$ est **itérativement strictement non dominée dans $S$** *(ou **survit à l'élimination itérative des stratégies strictement dominées**)* si $s_i\in S_i^n$ **pour tout $n\geq1$**.

</div>

### 5.3 La dominance faible

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.5 — Stratégies faiblement dominées</span>

La stratégie $\hat s_i$ **domine faiblement** $\bar s_i$ si

$$u_i(\hat s_i,s_{-i})\geq u_i(\bar s_i,s_{-i}) \quad \text{pour tout } s_{-i}\in S_{-i}, \quad \textbf{avec au moins une inégalité STRICTE}$$

</div>

> **La figure 7.4 — stratégies faiblement dominées.**

|  | $L$ | $R$ |
|---|---|---|
| $U$ | $1,\ 1$ | $0,\ 0$ |
| $D$ | $0,\ 0$ | $0,\ 0$ |

> *« Dans ce jeu, **aucun joueur n'a de stratégie strictement dominée**. Cependant, **$D$ et $R$ sont faiblement dominées par $U$ et $L$**, respectivement. Ainsi, **éliminer les stratégies strictement dominées n'a AUCUN effet ici**, alors qu'**éliminer les faiblement dominées isole la paire unique $(U,L)$**. »*

**La construction itérative** : $W_i^0=S_i$, et $s_i\in W_i^n$ si $s_i\in W_i^{n-1}$ n'est pas **faiblement** dominée dans $W^{n-1}=W_1^{n-1}\times\cdots\times W_N^{n-1}$.

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.6 — Stratégies itérativement faiblement non dominées</span>

$s_i$ est **itérativement faiblement non dominée dans $S$** si $s_i\in W_i^n$ pour tout $n\geq1$.

</div>

### 5.4 La relation entre les deux procédures

> *« **Il devrait être clair que l'ensemble des stratégies restant après l'application de la dominance faible itérative est CONTENU dans l'ensemble restant après l'application de la dominance stricte itérative.** »* *(C'est l'**exercice 7.6**.)*

$$\bigcap_n W_i^n \ \subseteq\ \bigcap_n S_i^n$$

⚠️ **La dominance faible élimine PLUS** — mais elle est aussi **plus fragile** : *« l'ordre dans lequel les stratégies faiblement dominées sont éliminées **peut affecter les issues qui restent** »* *(exercice 7.3(a))*, alors que pour la dominance **stricte**, *« l'ordre d'élimination **n'importe pas** »* *(exercice 7.3(b))*.

## 🔴 Concept 6 — Le jeu « devine la moyenne »

### 6.1 Les règles

> *« Pour avoir une idée du pouvoir **parfois SURPRENANT** des arguments de dominance itérative, considérez le jeu suivant appelé « **DEVINE LA MOYENNE** » dans lequel $N\geq2$ joueurs essaient de se surpasser mutuellement. »*

| La règle | Le détail |
|---|---|
| Le choix | *« Chaque joueur doit **simultanément** choisir **un entier entre 1 et 100**. »* |
| Le gagnant | *« La personne **la plus proche du TIERS de la moyenne** des propositions gagne **100 \$**, les autres n'obtiennent rien. »* |
| Les ex æquo | *« Le prix de 100 \$ est **partagé également** s'il y a égalité. »* |

> *« **Avant de lire plus loin, réfléchissez un moment à la manière dont VOUS joueriez ce jeu quand il y a, disons, 20 joueurs.** »*

### 🔴 6.2 La solution par dominance faible itérative

<details class="details--riche">
<summary>

**Le premier tour : pourquoi 33 domine faiblement tout nombre plus grand**

</summary>

> *« Notez que **choisir le nombre 33 domine FAIBLEMENT tous les nombres plus élevés**. »*

**La raison** : *« **le tiers de la moyenne des nombres doit être inférieur ou égal à $33\tfrac13$** »* — car la moyenne elle-même est au plus $100$.

| L'inégalité | La conséquence |
|---|---|
| $\dfrac{\text{moyenne}}{3}\leq\dfrac{100}{3}=33\tfrac13$ | *« **quels que soient les nombres annoncés par les autres, 33 n'est pas un plus mauvais choix qu'un nombre plus élevé** »* |
| Le cas de stricte inégalité | *« **si tous les autres joueurs choisissent le nombre 34**, alors le choix de 33 est **strictement meilleur** que tous les nombres plus élevés »* |

⚠️ **C'est exactement la structure de la définition 7.5** : $\geq$ partout, **avec au moins un cas strict**.

$$W_i^1\subseteq\{1,2,\dots,33\}$$

> *(Note de bas de page 1.)* *« **Selon le nombre de joueurs, d'autres nombres peuvent être faiblement dominés aussi.** Ceci est exploré dans les exercices. »*

</details>

<details class="details--riche">
<summary>

**Les tours suivants, et la conclusion**

</summary>

> *« Mais **un argument SEMBLABLE établit que tous les nombres au-dessus de 11 sont faiblement dominés dans $W^1$**. Ainsi $W_i^2\subseteq\{1,2,\dots,11\}$. »*

⚠️ **Pourquoi 11** : une fois que tout le monde choisit au plus $33$, la moyenne est au plus $33$, donc son tiers est au plus $11$.

$$100 \ \to\ 33 \ \to\ 11 \ \to\ \dots$$

> *« **En continuant de cette manière, on établit que pour chaque joueur, la seule stratégie survivant à la dominance faible itérative est le choix du nombre 1.** »*

**Ce que les exercices précisent** *(exercice 7.5)* :

- **(a)** *« aucune stratégie **pure** n'en domine strictement une autre »* ;
- **(b)** il existe cependant une **stratégie MIXTE** qui domine strictement $100$ ;
- **(c)** *« montrer que **99 n'est PAS strictement dominée** »* ;
- **(d)** la dominance **stricte** itérative aboutit aussi à $1$ — mais **en 99 tours** ;
- **(e)** avec $N=3$ joueurs, la dominance **faible** donne $W_i^1=\{1,\dots,14\}$, $W_i^2=\{1,2\}$, $W_i^3=\{1\}$.

</details>

### 🔴 6.3 Et le duel batteur-lanceur ?

> *« Si vous avez gardé le duel batteur-lanceur à l'esprit, vous avez peut-être remarqué que dans ce jeu, **aucune stratégie pour aucun joueur n'est strictement ou faiblement dominée**. Dès lors, **AUCUNE des procédures d'élimination décrites ne réduira les stratégies considérées**. »*

> *« Bien que ces procédures soient clairement très utiles dans certaines circonstances, **nous ne sommes pas plus près de résoudre le duel batteur-lanceur que lorsque nous l'avons mis de côté. Il est temps de changer cela.** »*

## 🔴 Concept 7 — §7.2.2 : l'équilibre de Nash en stratégies pures

### 7.1 L'analogie avec l'équilibre de marché

> *« Selon la théorie de l'offre et de la demande, la notion d'**équilibre de marché** où la demande égale l'offre est centrale. **L'attrait théorique du concept vient de ce que, dans une telle situation, il n'y a AUCUNE TENDANCE ni NÉCESSITÉ pour le comportement de qui que ce soit de CHANGER. Ces RÉGULARITÉS dans le comportement forment la base des PRÉDICTIONS.** »*

> *« Nous souhaitons décrire des régularités potentielles dans le comportement qui pourraient survenir dans un cadre stratégique. En même temps, nous souhaitons incorporer l'idée que **les joueurs sont « rationnels », à la fois au sens qu'ils agissent dans leur propre intérêt ET qu'ils sont pleinement conscients des régularités dans le comportement des autres**. »*

> *« En effet, **l'équilibre de Nash, introduit dans Nash (1951), est LE concept d'équilibre le plus important de toute la théorie des jeux**. »*

### 7.2 L'idée informelle, puis la définition

> *« Informellement, une stratégie jointe $\hat s\in S$ constitue un équilibre de Nash **du moment que CHAQUE individu, tout en étant PLEINEMENT CONSCIENT du comportement des autres, n'a AUCUNE INCITATION à changer le sien**. Ainsi, **un équilibre de Nash décrit un comportement qui peut être RATIONNELLEMENT SOUTENU**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.7 — Équilibre de Nash en stratégies pures</span>

Étant donné un jeu sous forme stratégique $G=(S_i,u_i)_{i=1}^{N}$, la stratégie jointe $\hat s\in S$ est un **équilibre de Nash en stratégies pures** de $G$ si, **pour chaque joueur $i$** :

$$u_i(\hat s)\geq u_i(s_i,\hat s_{-i}) \qquad \text{pour tout } s_i\in S_i$$

</div>

### 7.3 Le lien avec les figures 7.2 à 7.4

> *« Notez que dans **chacun** des jeux des figures 7.2 à 7.4, **la paire $(U,L)$ constitue un équilibre de Nash en stratégies pures**. »*

**La vérification pour la figure 7.2** : *« En passant à $D$, le paiement du joueur 1 **chute de 3 à 2**. Par conséquent, le joueur 1 ne peut pas améliorer son paiement. De même, le joueur 2 ne peut pas améliorer le sien en changeant de stratégie quand celle de 1 est fixée à $U$. »*

⚠️ **La multiplicité** : *« dans le jeu de la figure 7.4, **$(D,R)$ est AUSSI un équilibre de Nash en stratégies pures** »* — car aucun joueur ne peut **strictement** améliorer son paiement en changeant seul.

### 🔴 7.4 Le duel batteur-lanceur n'a AUCUN équilibre en stratégies pures

> **La figure 7.5 — reproduction de la figure 7.1.**

|  | $F$ | $C$ |
|---|---|---|
| $F$ | $-1,\ 1$ | $1,\ -1$ |
| $C$ | $1,\ -1$ | $-1,\ 1$ |

**La vérification de $(F,F)$, en entier :**

| Le joueur | Son paiement en $(F,F)$ | En déviant | Verdict |
|---|---|---|---|
| **Le batteur** | $1$ | vers $C$ ⟹ $(F,C)$ ⟹ **$-1$** | ne peut **pas** améliorer |
| **Le lanceur** | $-1$ | vers $C$ ⟹ $(C,F)$ ⟹ **$1$** | **améliore !** |

> *« Ainsi, **le lanceur peut améliorer son paiement en changeant unilatéralement sa stratégie, et donc $(F,F)$ n'est PAS un équilibre de Nash en stratégies pures. Un argument similaire s'applique aux trois autres possibilités.** »*

### 🔴 7.5 Pourquoi c'était prévisible

> *« Bien sûr, ceci était à attendre à la lumière de notre analyse **heuristique** du duel au début de ce chapitre. Là, nous avions conclu que **le batteur et le lanceur doivent tous deux se comporter d'une manière IMPRÉVISIBLE**. »*

> *« Mais **incorporé dans la définition d'un équilibre de Nash en stratégies pures est que CHAQUE JOUEUR SAIT PRÉCISÉMENT QUELLE STRATÉGIE CHACUN DES AUTRES CHOISIRA. C'est-à-dire que, dans un équilibre en stratégies pures, les choix de tout le monde sont PARFAITEMENT PRÉVISIBLES.** »*

$$\boxed{\;\text{équilibre en stratégies PURES} \ \Longleftrightarrow\ \text{prévisibilité parfaite}\;}$$

> *« Le duel batteur-lanceur **continue d'échapper à l'analyse. Mais nous nous en rapprochons rapidement.** »*

## 🔴 Concept 8 — Les stratégies mixtes

### 8.1 L'idée

> *« **Une manière infaillible de faire un choix que les autres ne peuvent pas prédire est de le faire d'une manière que VOUS-MÊME ne pouvez pas prédire. Et la manière la plus simple de faire cela est de RANDOMISER entre vos choix.** »*

> *« Par exemple, dans le duel batteur-lanceur, **tous deux peuvent éviter que leur choix soit prédit simplement en LANÇANT UNE PIÈCE** pour décider. »*

### 8.2 La vérification que c'est un équilibre

<details class="details--riche">
<summary>

**Le calcul complet pour le duel batteur-lanceur**

</summary>

**Le montage** : chacun a une **pièce équilibrée** ; face ⟹ $F$, pile ⟹ $C$. *« Chacun est **parfaitement conscient** que l'autre fait son choix de cette manière. »*

**L'hypothèse nécessaire** : *« supposons que **les paiements des joueurs sont en fait des utilités de von Neumann-Morgenstern**, et qu'ils se comporteront de manière à **maximiser leur espérance d'utilité** »*.

**Le calcul du lanceur.** Il sait que le batteur choisit $F$ et $C$ avec probabilité $\tfrac12$ chacune.

$$\mathbb{E}[F]=\tfrac12(-1)+\tfrac12(1)=0 \qquad\qquad \mathbb{E}[C]=\tfrac12(1)+\tfrac12(-1)=0$$

> *« Ainsi, étant donné que le batteur choisit $F$ et $C$ avec probabilité un demi chacune, **le lanceur est INDIFFÉRENT entre $F$ et $C$ lui-même**. »*

⚠️ **La conclusion décisive** : *« ainsi, **alors que choisir soit $F$ soit $C$ donnerait au lanceur son paiement le plus élevé possible de zéro, RANDOMISER entre eux avec probabilité un demi sur chacun le ferait AUSSI** »*.

**Symétriquement** pour le batteur.

> *« En bref, **les choix randomisés des joueurs forment un ÉQUILIBRE : chacun est conscient de la manière (randomisée) dont l'autre fait son choix, et NI L'UN NI L'AUTRE ne peut améliorer son paiement espéré en changeant unilatéralement la manière dont son choix est fait**. »*

</details>

### 8.3 La définition 7.8

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.8 — Stratégies mixtes</span>

Fixons un jeu sous forme stratégique **FINI** $G=(S_i,u_i)_{i=1}^{N}$. Une **stratégie mixte** $m_i$ pour le joueur $i$ est **une distribution de probabilité sur $S_i$**. C'est-à-dire, $m_i:S_i\to[0,1]$ assigne à chaque $s_i\in S_i$ **la probabilité $m_i(s_i)$ que $s_i$ soit jouée**. On note $M_i$ l'ensemble des stratégies mixtes de $i$ :

$$M_i=\Big\{m_i:S_i\to[0,1]\ \Big|\ \sum_{s_i\in S_i}m_i(s_i)=1\Big\}$$

**Désormais, on appelle $S_i$ l'ensemble des stratégies PURES du joueur $i$.**

</div>

### 8.4 L'image de la roulette, et l'inclusion

> *« Une manière de penser une stratégie mixte est **simplement comme une ROULETTE portant les noms de diverses stratégies pures imprimés sur des sections de la roue**. Différentes roulettes pourraient avoir des sections plus grandes assignées à une stratégie pure ou une autre, donnant différentes probabilités. **L'ensemble des stratégies mixtes est alors l'ensemble de toutes ces roulettes.** »*

⚠️ *« Notez que ceci donne à chaque joueur **STRICTEMENT PLUS de choix qu'avant**, parce que **chaque stratégie pure $\bar s_i\in S_i$ est représentée dans $M_i$ par la distribution (DÉGÉNÉRÉE) assignant la probabilité un à $\bar s_i$**. »*

### 8.5 Le paiement espéré

Si $u_i$ est une utilité **VNM** sur $S$ et que la stratégie $m\in M$ est jouée :

$$\boxed{\;u_i(m)\equiv\sum_{s\in S}m_1(s_1)\cdots m_N(s_N)\,u_i(s)\;}$$

> *« Cette formule découle du fait que **les joueurs choisissent leurs stratégies INDÉPENDAMMENT**. Par conséquent, **la probabilité que la stratégie pure $s=(s_1,\dots,s_N)$ soit choisie est le PRODUIT des probabilités** que chaque composante séparée soit choisie. »*

### 8.6 La définition 7.9

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.9 — Équilibre de Nash</span>

Étant donné un jeu sous forme stratégique **FINI** $G=(S_i,u_i)_{i=1}^{N}$, une stratégie jointe $\hat m\in M$ est un **équilibre de Nash** de $G$ si, pour chaque joueur $i$ :

$$u_i(\hat m)\geq u_i(m_i,\hat m_{-i}) \qquad \text{pour tout } m_i\in M_i$$

</div>

> *« Ainsi, dans un équilibre de Nash, **chaque joueur peut randomiser ses choix, et aucun joueur ne peut améliorer son paiement espéré en randomisant DIFFÉREMMENT de manière unilatérale**. »*

## 🔴 Concept 9 — Le théorème 7.1 : les tests simplifiés

### 9.1 Le problème que le théorème résout

> *« **Il pourrait sembler que vérifier un équilibre de Nash requiert de vérifier, pour chaque joueur $i$, CHAQUE stratégie dans l'ensemble INFINI $M_i$ contre $\hat m_i$.** Le résultat suivant **simplifie cette tâche en tirant parti de la LINÉARITÉ de $u_i$ en $m_i$**. »*

### 9.2 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 7.1 — Tests simplifiés pour l'équilibre de Nash</span>

Les énoncés suivants sont **équivalents** :

**(a)** $\hat m\in M$ est un **équilibre de Nash**.

**(b)** Pour chaque joueur $i$ : $u_i(\hat m)=u_i(s_i,\hat m_{-i})$ **pour toute $s_i\in S_i$ recevant un POIDS POSITIF de $\hat m_i$**, et $u_i(\hat m)\geq u_i(s_i,\hat m_{-i})$ **pour toute $s_i\in S_i$ recevant un POIDS NUL de $\hat m_i$**.

**(c)** Pour chaque joueur $i$ : $u_i(\hat m)\geq u_i(s_i,\hat m_{-i})$ **pour toute $s_i\in S_i$**.

</div>

### 🔴 9.3 À quoi sert chacun des deux tests

| L'énoncé | Son usage, selon le livre |
|---|---|
| **(b)** | *« **le plus utile pour CALCULER les équilibres de Nash**. Il dit qu'**un joueur doit être INDIFFÉRENT entre toutes les stratégies pures recevant un poids positif** et que chacune de celles-ci **ne doit pas être pire qu'une stratégie pure de poids nul**. »* |
| **(c)** | *« il **suffit de vérifier, pour chaque joueur, qu'AUCUNE STRATÉGIE PURE ne donne un paiement espéré plus élevé que sa stratégie mixte** »* |

$$\boxed{\;\textbf{(b) pour CALCULER} \qquad\qquad \textbf{(c) pour VÉRIFIER}\;}$$

### 9.4 La preuve

<details class="details--riche">
<summary>

**(a) ⟹ (b) — la partie non triviale**

</summary>

Supposons $\hat m$ équilibre de Nash, donc $u_i(\hat m)\geq u_i(m_i,\hat m_{-i})$ pour toute $m_i\in M_i$.

**Pas 1 — les stratégies pures.** *« En particulier, pour chaque $s_i\in S_i$, **nous pouvons choisir $m_i$ comme la stratégie donnant la probabilité UN à $s_i$** »*, de sorte que

$$u_i(\hat m)\geq u_i(s_i,\hat m_{-i}) \qquad \textbf{pour toute } s_i\in S_i$$

**Pas 2 — l'égalité sur le support.**

> ⚠️ *« Or, **si l'un de ces nombres différait de $u_i(\hat m)$, alors au moins un serait STRICTEMENT PLUS GRAND, parce que $u_i(\hat m)$ est une COMBINAISON CONVEXE STRICTE d'entre eux. Mais ceci contredirait l'inégalité qui vient d'être établie.** »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — pourquoi c'est une moyenne.</span>

Par la formule du §8.5, $u_i(\hat m)=\sum_{s_i}\hat m_i(s_i)\,u_i(s_i,\hat m_{-i})$ : le paiement de la stratégie mixte est **la moyenne pondérée** des paiements des stratégies pures du **support**, les poids étant les $\hat m_i(s_i)>0$. Une moyenne pondérée de nombres non tous égaux est **strictement inférieure au plus grand d'entre eux** — d'où la contradiction.

</div>

</details>

<details class="details--riche">
<summary>

**(b) ⟹ (c) et (c) ⟹ (a)**

</summary>

> *« **Parce qu'il est évident que (b) implique (c)**, il reste seulement à établir que **(c) implique (a)**. »*

Supposons $u_i(\hat m)\geq u_i(s_i,\hat m_{-i})$ pour toute $s_i\in S_i$ et tout joueur $i$. Fixons $i$ et $m_i\in M_i$.

> *« **Parce que le nombre $u_i(m_i,\hat m_{-i})$ est une COMBINAISON CONVEXE des nombres $\{u_i(s_i,\hat m_{-i})\}_{s_i\in S_i}$**, nous avons $u_i(\hat m)\geq u_i(m_i,\hat m_{-i})$. »*

> *« **Parce que le joueur ET la stratégie choisie étaient arbitraires**, $\hat m$ est un équilibre de Nash de $G$. »* $\blacksquare$

⚠️ **Toute la preuve repose sur un seul fait** : $u_i$ est **linéaire en $m_i$**, donc le paiement d'une mixte est **une moyenne pondérée** des paiements des pures.

</details>

## 🔴 Concept 10 — L'exemple 7.1 et les deux interprétations des stratégies mixtes

### 10.1 L'histoire

> *« Vous et un collègue devez assembler un rapport prêt dans une heure. Vous convenez de **partager le travail en deux moitiés**. À votre consternation mutuelle, **vous découvrez que le traitement de texte que vous utilisez n'est pas compatible avec celui de l'autre**. »*

> *« Bien sûr, **parce qu'il est coûteux de se familiariser avec un nouveau traitement de texte, chacun de vous préférerait que ce soit l'AUTRE qui change**. D'autre part, **chacun préfère changer plutôt que d'échouer à se coordonner du tout**. Enfin, supposons qu'**il n'y a pas de temps pour en discuter** — chacun doit décider **dans l'intimité de son propre bureau**. »*

> **La figure 7.6 — un jeu de coordination.**

|  | $WP$ | $MW$ |
|---|---|---|
| $WP$ | $2,\ 1$ | $0,\ 0$ |
| $MW$ | $0,\ 0$ | $1,\ 2$ |

| Le résultat | Le paiement |
|---|---|
| **Échec** de coordination | $0$ |
| Coordination **sur son PROPRE** logiciel | $2$ |
| Coordination **sur celui de l'AUTRE** | $1$ |

**Les deux équilibres purs** : $(WP,WP)$ et $(MW,MW)$.

### 10.2 Le calcul de l'équilibre mixte

<details class="details--riche">
<summary>

**Le calcul complet**

</summary>

> *« S'il y en a, **il est facile de voir que les deux joueurs doivent choisir chacune de leurs stratégies pures avec probabilité STRICTEMENT POSITIVE**. »*

Soit $p>0$ la probabilité que **1 choisisse $MW$** *(le logiciel de son collègue)* et $q>0$ celle que **2 choisisse $WP$** *(le logiciel de son collègue)*.

> *« **Par la partie (b) du théorème 7.1, chaque joueur doit être INDIFFÉRENT entre chacune de ses stratégies pures.** »*

**Pour le joueur 1 :**

$$q(2)+(1-q)(0)\ =\ q(0)+(1-q)(1)$$

*(à gauche : il joue $WP$ — il touche 2 si 2 joue $WP$, 0 sinon. À droite : il joue $MW$ — 0 si 2 joue $WP$, 1 sinon.)*

$$2q=1-q \quad\Longrightarrow\quad q=\tfrac13$$

**Pour le joueur 2 :**

$$(1-p)(1)+p(0)\ =\ (1-p)(0)+p(2) \quad\Longrightarrow\quad 1-p=2p \quad\Longrightarrow\quad p=\tfrac13$$

> *« Ainsi, la stratégie (mixte) dans laquelle **chaque joueur choisit le traitement de texte de son collègue avec probabilité $1/3$ et le sien avec probabilité $2/3$** est un **troisième** équilibre de Nash de ce jeu. **Il n'y en a pas d'autres.** »*

</details>

### 🔴 10.3 Les trois enseignements de l'exemple

> *« Le jeu de l'exemple 7.1 est intéressant à **plusieurs égards**. »*

| # | L'enseignement |
|---|---|
| **1** | *« il possède **de MULTIPLES équilibres de Nash, certains purs, d'autres non** »* |
| **2** | *« **l'un de ces équilibres est INEFFICACE**. Notez que dans l'équilibre en stratégies mixtes, **le paiement espéré de chaque joueur est $2/3$**, de sorte que **chacun serait strictement mieux loti si l'un OU l'autre des équilibres purs était joué**. »* |
| **3** | *« **un équilibre en stratégies mixtes est présent MÊME SI ce n'est pas un jeu dans lequel l'un des joueurs souhaite se comporter de manière imprévisible** »* |

### 10.4 Les deux interprétations d'une stratégie mixte

> *« **Devrions-nous alors IGNORER l'équilibre en stratégies mixtes trouvé ici, parce que les stratégies mixtes n'y servent pas le but pour lequel elles ont été introduites ? NON.** »*

> *« Bien que **nous ayons d'abord introduit les stratégies mixtes pour donner aux joueurs l'occasion de se comporter de manière imprévisible**, il y a **UNE AUTRE MANIÈRE d'interpréter le sens d'une stratégie mixte. Plutôt que de penser une stratégie mixte du joueur 1 comme une RANDOMISATION DÉLIBÉRÉE de sa part, pensez-la comme une EXPRESSION DES CROYANCES DES AUTRES JOUEURS concernant la stratégie pure que le joueur 1 choisira.** »*

**Appliqué à la figure 7.6** : *« la stratégie d'équilibre du joueur 1 plaçant la probabilité $1/3$ sur $MW$ et $2/3$ sur $WP$ **peut être interprétée comme reflétant l'INCERTITUDE DU JOUEUR 2** concernant la stratégie pure que le joueur 1 choisira. »*

| L'interprétation | Sa nature | Quand elle a du sens |
|---|---|---|
| **(1) La roulette** | *« des **dispositifs physiques réels** que les joueurs utilisent pour **randomiser délibérément** »* | *« dans les jeux comme le duel batteur-lanceur **dans lesquels les intérêts des joueurs sont OPPOSÉS** »* |
| **(2) Les croyances** | *« la stratégie mixte d'un joueur peut **simplement représenter les CROYANCES que les autres entretiennent** sur la stratégie pure qu'il pourrait choisir. **Dans cette interprétation, AUCUN joueur ne randomise explicitement.** »* | *« pour les jeux comme celui de la figure 7.6, **dans lesquels les intérêts des joueurs, dans une certaine mesure, COÏNCIDENT** »* |

> *« **Le fait que nous choisissions d'employer une interprétation ou l'autre dépend largement du CONTEXTE.** »*

## 🔴 Concept 11 — Le théorème 7.2 : l'existence d'un équilibre de Nash

### 11.1 L'énoncé

> *« **Tout jeu possède-t-il au moins un équilibre de Nash ?** Rappelez-vous que dans le cas des stratégies **pures**, la réponse est **NON** (le duel batteur-lanceur). **Cependant, une fois les stratégies mixtes introduites, la réponse est OUI, de manière tout à fait générale.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 7.2 — (Nash) Existence d'un équilibre de Nash</span>

**Tout jeu sous forme stratégique FINI possède au moins un équilibre de Nash.**

</div>

### 11.2 Le montage et la stratégie de preuve

Pour simplifier la notation, on suppose que **chaque joueur a le même nombre $n$ de stratégies pures**, indexées $S_i=\{1,2,\dots,n\}$. Alors

$$M_i=\Big\{(m_{i1},\dots,m_{in})\in\mathbb{R}^n_+\ \Big|\ \sum_{j=1}^{n}m_{ij}=1\Big\}$$

⚠️ *« Notez que **$M_i$ est NON VIDE, COMPACT et CONVEXE**. »* — les trois hypothèses de Brouwer.

> *« Nous montrerons qu'un équilibre existe **en démontrant l'existence d'un POINT FIXE d'une fonction dont les points fixes sont nécessairement des équilibres de $G$**. Ainsi, le reste de la preuve consiste en **TROIS PAS** : »*

$$\textbf{(1) construire la fonction} \quad\to\quad \textbf{(2) prouver qu'elle a un point fixe} \quad\to\quad \textbf{(3) montrer que ce point fixe est un équilibre}$$

### 11.3 La preuve

<details class="details--riche">
<summary>

**Pas 1 — la construction de $f$**

</summary>

Définir $f:M\to M$ ainsi. Pour chaque $m\in M$, chaque joueur $i$, et chaque stratégie pure $j$ :

$$\boxed{\;f_{ij}(m)=\frac{m_{ij}+\max\big(0,\ u_i(j,m_{-i})-u_i(m)\big)}{1+\displaystyle\sum_{j'=1}^{n}\max\big(0,\ u_i(j',m_{-i})-u_i(m)\big)}\;}$$

**Comment la lire** *(enrichissement)* : au numérateur, on **ajoute au poids actuel de $j$ l'excès de paiement** que la pure $j$ procurerait par rapport à la mixte $m_i$ — mais **seulement si cet excès est positif**. Au dénominateur, on **renormalise** pour que la somme fasse $1$. **La fonction pousse le poids vers les stratégies qui font mieux que la moyenne.**

Poser $f_i(m)=(f_{i1}(m),\dots,f_{in}(m))$ et $f(m)=(f_1(m),\dots,f_N(m))$.

> *« Notez que pour chaque joueur $i$, $\sum_{j=1}^{n}f_{ij}(m)=1$ et que $f_{ij}(m)\geq0$ pour tout $j$. **Donc $f_i(m)\in M_i$ pour tout $i$, et ainsi $f(m)\in M$.** »*

</details>

<details class="details--riche">
<summary>

**Pas 2 — l'application de Brouwer**

</summary>

> *« **Parce que le NUMÉRATEUR définissant $f_{ij}$ est continu en $m$, et que le DÉNOMINATEUR est à la fois continu en $m$ ET BORNÉ LOIN DE ZÉRO (en effet, il n'est JAMAIS inférieur à UN), $f_{ij}$ est une fonction CONTINUE de $m$ pour tous $i$ et $j$.** »*

⚠️ **Le détail qui compte** : chaque terme du dénominateur est un $\max(0,\cdot)\geq0$, donc le dénominateur vaut **au moins 1** — la division est **toujours licite**.

> *« Par conséquent, **$f$ est une fonction CONTINUE envoyant l'ensemble NON VIDE, COMPACT et CONVEXE $M$ DANS LUI-MÊME. Nous pouvons donc appliquer le THÉORÈME DU POINT FIXE DE BROUWER (théorème A1.11) pour conclure que $f$ a un point fixe $\hat m$.** »*

</details>

<details class="details--riche">
<summary>

**Pas 3 — le calcul algébrique qui conclut**

</summary>

Puisque $f(\hat m)=\hat m$, on a $f_{ij}(\hat m)=\hat m_{ij}$ pour tous $i,j$, donc

$$\hat m_{ij}=\frac{\hat m_{ij}+\max\big(0,u_i(j,\hat m_{-i})-u_i(\hat m)\big)}{1+\sum_{j'}\max\big(0,u_i(j',\hat m_{-i})-u_i(\hat m)\big)}$$

**En multipliant en croix et en simplifiant $\hat m_{ij}$ :**

$$\hat m_{ij}\sum_{j'=1}^{n}\max\big(0,u_i(j',\hat m_{-i})-u_i(\hat m)\big)\ =\ \max\big(0,u_i(j,\hat m_{-i})-u_i(\hat m)\big)$$

**L'astuce** : *« **multiplier les deux côtés de cette équation par $u_i(j,\hat m_{-i})-u_i(\hat m)$ et SOMMER sur $j$** »* :

$$\underbrace{\sum_{j=1}^{n}\hat m_{ij}\big[u_i(j,\hat m_{-i})-u_i(\hat m)\big]}_{\textbf{= 0, voir ci-dessous}}\ \cdot\sum_{j'=1}^{n}\max\big(0,\cdot\big)\ =\ \sum_{j=1}^{n}\big[u_i(j,\hat m_{-i})-u_i(\hat m)\big]\max\big(0,u_i(j,\hat m_{-i})-u_i(\hat m)\big) \tag{P.1}$$

**Pourquoi le membre de gauche est NUL :**

$$\sum_{j=1}^{n}\hat m_{ij}\big[u_i(j,\hat m_{-i})-u_i(\hat m)\big]=\sum_{j=1}^{n}\hat m_{ij}u_i(j,\hat m_{-i})-u_i(\hat m)=u_i(\hat m)-u_i(\hat m)=0$$

> *« où **la première égalité découle de ce que les $m_{ij}$ somment à un sur $j$** »*

**Donc (P.1) se réécrit :**

$$0=\sum_{j=1}^{n}\big[u_i(j,\hat m_{-i})-u_i(\hat m)\big]\max\big(0,u_i(j,\hat m_{-i})-u_i(\hat m)\big)$$

**La conclusion :**

> ⚠️ *« Mais **la somme de droite ne peut être nulle que si $u_i(j,\hat m_{-i})-u_i(\hat m)\leq0$ pour tout $j$**. **(Si $u_i(j,\hat m_{-i})-u_i(\hat m)>0$ pour un certain $j$, alors le $j$-ième terme de la somme est strictement positif. Parce qu'AUCUN terme de la somme n'est négatif, ceci rendrait la somme ENTIÈRE strictement positive.)** »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — pourquoi aucun terme n'est négatif.</span>

Chaque terme est de la forme $x\cdot\max(0,x)$, qui vaut $x^2\geq0$ si $x>0$ et $0$ si $x\leq0$ — donc **toujours $\geq0$**. Une somme de termes $\geq0$ est nulle **ssi chacun l'est**.

</div>

> *« Dès lors, **par la partie (c) du théorème 7.1, $\hat m$ est un équilibre de Nash**. »* $\blacksquare$

</details>

### 🔴 11.4 La portée du théorème 7.2

> *« **Le théorème 7.2 est tout à fait REMARQUABLE.** Il dit que **peu importe combien de joueurs sont impliqués, du moment que chacun possède un nombre FINI de stratégies pures, il y aura au moins un équilibre de Nash.** »*

| La portée | Le commentaire du livre |
|---|---|
| **Pratique** | *« la recherche d'un équilibre de Nash **ne sera pas VAINE** »* |
| **Conceptuelle** | *« **Plus important encore**, le théorème établit que **la notion d'équilibre de Nash est COHÉRENTE d'une manière profonde. Si les équilibres de Nash existaient RAREMENT, ceci indiquerait une INCOHÉRENCE FONDAMENTALE dans la définition. Que les équilibres de Nash existent TOUJOURS dans les jeux finis est UNE MESURE DE LA SOLIDITÉ DE L'IDÉE.** »* |

## 🔴 Concept 12 — §7.2.3 : l'information incomplète

### 12.1 La limitation qu'on lève

> *« Bien qu'une grande variété de situations puisse être modélisée comme des jeux sous forme stratégique, **notre analyse de ces jeux semble jusqu'ici sujette à une limitation assez importante**. Jusqu'à présent, […] **nous avons toujours supposé que CHAQUE joueur est parfaitement informé des paiements de TOUS les autres. Sinon, les joueurs n'auraient pas pu effectuer les calculs nécessaires pour dériver leurs stratégies optimales.** »*

> *« Mais **beaucoup de situations réelles impliquent des doses substantielles d'information INCOMPLÈTE sur les paiements des adversaires**. Considérez, par exemple, **deux firmes en concurrence sur le même marché. Il est très probable que l'une ou les deux soient imparfaitement informées des COÛTS DE PRODUCTION de l'autre.** »*

### 🔴 12.2 L'idée centrale de Harsanyi

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment analyser une telle situation ? L'IDÉE est de lui AJOUTER un ingrédient de plus, de sorte qu'elle devienne un JEU SOUS FORME STRATÉGIQUE. Nous serons alors capables d'appliquer n'importe laquelle des méthodes de solution que nous avons développées.</span>

*« Ces idées ont été inaugurées dans **Harsanyi (1967-1968)**. »*

</div>

$$\boxed{\;\text{On ne construit PAS une théorie nouvelle — on RAMÈNE le cas incomplet au cas complet.}\;}$$

### 12.3 L'ingrédient additionnel : les croyances

> *« **L'ingrédient additionnel est une spécification des CROYANCES de chaque firme sur le coût de l'autre.** »*

**L'exemple du livre, avec la corrélation :**

> *« Par exemple, nous pourrions spécifier que **la firme 1 croit qu'il est également probable que la firme 2 soit une firme à coût élevé ou à coût faible**. De plus, nous pourrions souhaiter capturer l'idée que **les coûts des deux firmes sont CORRÉLÉS** : quand le coût de la firme 1 est faible, il peut être plus probable que celui de 2 le soit aussi. Nous pourrions donc spécifier que **quand le coût de 1 est faible il croit que celui de 2 a deux fois plus de chances d'être faible qu'élevé**, et **quand son coût est élevé, l'inverse**. »*

### 12.4 Les types

Comme d'habitude : $N$ joueurs, un ensemble de stratégies pures $S_i$ pour chacun. En plus :

> *« il peut y avoir de **l'incertitude sur les PAIEMENTS** de certains d'entre eux. Pour saisir cela, **nous introduisons pour chaque joueur $i$ un ensemble FINI $T_i$ de « TYPES » possibles que ce joueur pourrait être**. »*

⚠️ **La dépendance du paiement est TRIPLE :**

$$u_i:\ S\times T\ \longrightarrow\ \mathbb{R}, \qquad\qquad T=\prod_{i=1}^{N}T_i$$

> *« Nous permettons au paiement d'un joueur de dépendre comme d'habitude **de la stratégie pure jointe choisie**, mais aussi **de SON PROPRE type ainsi que des types DES AUTRES**. »*

**Pourquoi cette dernière dépendance compte :**

> *« Permettre au paiement de $i$ de dépendre du type d'un AUTRE joueur nous permet d'analyser des situations **où l'information possédée par un joueur AFFECTE le paiement d'un autre**. Par exemple, **dans l'enchère de parcelles pétrolières offshore, le paiement d'un enchérisseur ainsi que son enchère optimale dépendront de la PROBABILITÉ QUE LA PARCELLE CONTIENNE DU PÉTROLE, quelque chose sur quoi d'autres enchérisseurs peuvent avoir de l'information**. »*

### 12.5 Les croyances

> *« L'ingrédient supplémentaire est **une spécification, pour chaque joueur $i$ et chacun de ses types $t_i$, des CROYANCES qu'il entretient sur les types que les autres pourraient être**. »*

$$p_i(t_{-i}\mid t_i)\in[0,1], \qquad \sum_{t_{-i}\in T_{-i}}p_i(t_{-i}\mid t_i)=1$$

### 🔴 12.6 L'a priori commun

> *« **Il est souvent utile de spécifier les croyances des joueurs de sorte qu'elles soient en un certain sens COHÉRENTES entre elles.** Par exemple, on peut souhaiter insister sur le fait que **deux joueurs seraient d'accord sur les types d'un TROISIÈME joueur qui ont une probabilité positive**. »*

**La méthode standard** : *« supposer que les croyances des joueurs sont **engendrées à partir d'une DISTRIBUTION DE PROBABILITÉ UNIQUE $p$ sur l'espace des types joints $T$** »*, avec $p(t)>0$ pour tout $t$ et $\sum_{t\in T}p(t)=1$.

> *« **Si nous pensons le vecteur de types $t\in T$ comme choisi par la NATURE selon $p$**, alors par la **règle de Bayes**, les croyances de $i$ se calculent depuis $p$ : »*

$$\boxed{\;p_i(t_{-i}\mid t_i)=\frac{p(t_i,t_{-i})}{\displaystyle\sum_{t'_{-i}\in T_{-i}}p(t_i,t'_{-i})}\;}$$

> *« Si tous les $p_i$ peuvent être calculés depuis $p$ selon cette formule, **on dit que $p$ est un A PRIORI COMMUN**. »*

**Les deux lectures de l'hypothèse d'a priori commun :**

| # | La lecture |
|---|---|
| **1** | *« $p$ est simplement une **distribution empirique OBJECTIVE** sur les types des joueurs, **confirmée par de nombreuses observations passées** »* |
| **2** | *« l'hypothèse reflète l'idée que **les différences de croyances ne proviennent QUE de différences d'INFORMATION**. Par conséquent, **AVANT que les joueurs soient conscients de leurs propres types — et se trouvent donc dans une position informationnellement SYMÉTRIQUE — les croyances de chaque joueur doivent être IDENTIQUES, et égales à $p$.** »* |

### 🔴 12.7 Le livre n'impose PAS l'a priori commun

> *« **Notre capacité à analyser une situation d'information incomplète NE REQUERRA PAS l'hypothèse d'a priori commun. Nous n'insisterons donc PAS pour que les croyances des joueurs soient engendrées à partir d'un a priori commun.** »*

> *« Ainsi, **nous permettons des situations dans lesquelles, par exemple, un certain type du joueur 1 assigne la probabilité ZÉRO à un type du joueur 3 qui reçoit toujours une probabilité POSITIVE du joueur 2, quel que soit son propre type**. »*

*(L'**exercice 7.20** demande de montrer que **cette situation est IMPOSSIBLE avec un a priori commun**.)*

### 12.8 La définition 7.10

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.10 — Jeu d'information incomplète (jeu bayésien)</span>

Un **jeu d'information incomplète** est un $n$-uplet $G=(p_i,T_i,S_i,u_i)_{i=1}^{N}$ où, pour chaque joueur $i$ :

- l'ensemble $T_i$ est **fini** ;
- $u_i:S\times T\to\mathbb{R}$ ;
- pour chaque $t_i\in T_i$, $p_i(\cdot\mid t_i)$ est une **distribution de probabilité sur $T_{-i}$**.

Si de plus **chaque $S_i$ est fini**, $G$ est un **jeu FINI d'information incomplète**. Un jeu d'information incomplète est aussi appelé un **JEU BAYÉSIEN**.

</div>

## 🔴 Concept 13 — Le jeu stratégique associé $G^+$

### 13.1 La réponse à la question

> *« **La question demeure : comment appliquer nos solutions précédemment développées aux jeux d'information incomplète ?** »*

$$\boxed{\;\textbf{La réponse : ASSOCIER à } G \textbf{ un jeu sous forme stratégique } G^+ \textbf{ dans lequel}\\\textbf{CHAQUE TYPE de chaque joueur est traité comme un JOUEUR SÉPARÉ.}\;}$$

> *« Nous pouvons alors appliquer **tous** nos résultats sur les jeux sous forme stratégique à $G^+$. **Bien sûr, nous devons vous convaincre que $G^+$ capture TOUS les aspects pertinents** de la situation d'information incomplète dont nous sommes partis. »*

### 13.2 L'exemple 7.2 — la construction en images

> *« **Deux firmes sont engagées dans une concurrence en prix à la Bertrand**, sauf que **l'une est incertaine du coût marginal constant de l'autre**. Le coût marginal de la firme 1 est **connu**, et celui de la firme 2 est **soit élevé soit faible, chaque possibilité étant également probable**. Il n'y a pas de coûts fixes. »*

| Firme | Ses types |
|---|---|
| **1** | **un seul** type |
| **2** | **deux** types — coût **élevé** et coût **faible** |

> *« Les deux firmes ont **le même ensemble de stratégies**, à savoir **l'ensemble des prix non négatifs**. **Le paiement de la firme 2 dépend de son type, mais celui de la firme 1 est INDÉPENDANT du type de la firme 2 ; il ne dépend que des prix choisis.** »*

**La construction, en mots :**

> *« **Imaginez qu'il y a en fait TROIS firmes plutôt que deux, à savoir : la firme 1, la firme 2 à COÛT ÉLEVÉ, et la firme 2 à COÛT FAIBLE. Imaginez aussi que chacune des trois doit SIMULTANÉMENT choisir un prix et que la firme 1 croit que chacune des firmes 2 est également susceptible d'être son unique concurrent.** »*

> ⚠️ *« **Un peu de réflexion vous convaincra que cette manière de voir les choses capture MAGNIFIQUEMENT tous les traits stratégiques pertinents de la situation originale.** En particulier, **la firme 1 doit choisir son prix SANS SAVOIR si son concurrent a des coûts élevés ou faibles. De plus, la firme 1 comprend que le prix du concurrent peut DIFFÉRER selon ses coûts.** »*

### 13.3 La construction formelle

**Les joueurs de $G^+$** : pour chaque $i$ et chaque $t_i\in T_i$, **$t_i$ est un joueur de $G^+$** dont l'ensemble fini de stratégies pures est **$S_i$**.

$$\text{joueurs de } G^+ \ = \ T_1\cup\cdots\cup T_N \qquad\qquad S^+=S_1^{T_1}\times\cdots\times S_N^{T_N}$$

> *(Note de bas de page 2.)* *« Nous supposons ici que **les ensembles de types $T_1,\dots,T_N$ sont MUTUELLEMENT DISJOINTS. Ceci est SANS PERTE DE GÉNÉRALITÉ** puisque les ensembles de types, **étant finis, peuvent toujours être définis comme des sous-ensembles d'entiers**, et nous pouvons toujours choisir ces entiers de sorte que $t_i<t_j$ si $i<j$. Dès lors, **il n'y a aucune AMBIGUÏTÉ à identifier un joueur de $G^+$ par son type seul**. »*

**Les paiements de $G^+$.** Soit $s_i(t_i)\in S_i$ la stratégie pure choisie par le joueur $t_i$. Étant donnée une stratégie pure jointe $s^+\in S^+$, le paiement du joueur $t_i$ est

$$\boxed{\;v_{t_i}(s^+)=\sum_{t_{-i}\in T_{-i}}p_i(t_{-i}\mid t_i)\ u_i\big(s_1(t_1),\dots,s_N(t_N),\ t_1,\dots,t_N\big)\;}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.11 — Le jeu stratégique associé</span>

Soit $G=(p_i,T_i,S_i,u_i)_{i=1}^{N}$ un jeu d'information incomplète. Le jeu $G^+$ défini ci-dessus est **le jeu sous forme stratégique ASSOCIÉ au jeu d'information incomplète $G$**.

</div>

### 🔴 13.4 Pourquoi cette formule capture bien la situation

> *« **La manière la plus simple de le voir est de comprendre la FORMULE DE PAIEMENT du joueur $i$.** »*

| Le morceau de la formule | Ce qu'il capture |
|---|---|
| $p_i(t_{-i}\mid t_i)$ | *« **le joueur $i$ est INCERTAIN des types des autres** — il l'utilise pour **évaluer leur probabilité** »* |
| $s_j(t_j)$ **dépend de $t_j$** | *« **le comportement des autres joueurs peut DÉPENDRE DE LEURS TYPES** »* |

$$\boxed{\;\text{En associant } G^+ \text{ à } G,\ \textbf{on a RÉDUIT l'étude des jeux d'information incomplète}\\\textbf{à celle des jeux d'information COMPLÈTE.}\;}$$

### 13.5 L'équilibre bayésien-nashien et son existence

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.12 — Équilibre bayésien-nashien</span>

Un **équilibre bayésien-nashien** d'un jeu d'information incomplète est **un équilibre de Nash du jeu sous forme stratégique associé**.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 7.3 — Existence d'un équilibre bayésien-nashien</span>

**Tout jeu FINI d'information incomplète possède au moins un équilibre bayésien-nashien.**

</div>

<details class="details--riche">
<summary>

**La preuve — trois lignes**

</summary>

> *« **Par la définition 7.12, il suffit de montrer que le jeu sous forme stratégique associé possède un équilibre de Nash. Parce que le jeu associé à un jeu FINI d'information incomplète est LUI-MÊME FINI, nous pouvons appliquer le THÉORÈME 7.2** pour conclure qu'il possède un équilibre de Nash. »* $\blacksquare$

⚠️ **C'est tout le bénéfice de la construction** : un théorème d'existence entièrement nouveau s'obtient **gratuitement**, par simple traduction.

</details>

## 🟠 Concept 14 — L'exemple 7.3 : Bertrand avec information incomplète

### 14.1 Les données

| L'élément | La valeur |
|---|---|
| Coût marginal de la **firme 1** | $0$ |
| Coûts possibles de la **firme 2** | $1$ *(faible)* ou $4$ *(élevé)*, **chacun avec probabilité $1/2$** |
| La demande de marché | $8-p$, où $p$ est **le prix le plus bas pratiqué** |
| Les prix admissibles | **seulement $1$, $4$ ou $6$** — *« pour garder les choses simples »* |

### 🔴 14.2 La convention de partage — à ne pas inventer

> *« **En accord avec la nature Bertrand du problème, nous avons institué la convention suivante pour déterminer les paiements quand les firmes choisissent le MÊME prix.** »*

| Le cas | Le partage |
|---|---|
| Les coûts des **deux** firmes sont **strictement inférieurs** au prix commun | *« **le marché est partagé également** entre elles »* |
| Sinon | *« **la firme 1 capture le marché ENTIER** au prix commun »* |

**La justification donnée par le livre :**

> *« **Ce partage inégal reflète l'idée que si le prix commun est au-dessus du coût de la SEULE firme 1, la firme 1 pourrait capturer le marché entier en BAISSANT LÉGÈREMENT son prix** (ce que, si on le lui permettait, elle pourrait faire tout en couvrant plus que ses coûts), **alors que la firme 2 ne baisserait PAS son prix (même si on le lui permettait) parce que cela entraînerait des PERTES**. »*

### 14.3 Le jeu d'information incomplète (figure 7.7)

> **La firme 2 est à COÛT FAIBLE ($c=1$).** *(paiement de 1, puis de $2_\ell$)*

|  | $p_\ell=6$ | $p_\ell=4$ | $p_\ell=1$ |
|---|---|---|---|
| $p_1=6$ | $6,\ 5$ | $0,\ 12$ | $0,\ 0$ |
| $p_1=4$ | $16,\ 0$ | $8,\ 6$ | $0,\ 0$ |
| $p_1=1$ | $7,\ 0$ | $7,\ 0$ | $7,\ 0$ |

> **La firme 2 est à COÛT ÉLEVÉ ($c=4$).** *(paiement de 1, puis de $2_h$)*

|  | $p_h=6$ | $p_h=4$ | $p_h=1$ |
|---|---|---|---|
| $p_1=6$ | $6,\ 2$ | $0,\ 0$ | $0,\ -21$ |
| $p_1=4$ | $16,\ 0$ | $16,\ 0$ | $0,\ -21$ |
| $p_1=1$ | $7,\ 0$ | $7,\ 0$ | $7,\ 0$ |

### 14.4 Le jeu stratégique associé (figure 7.8)

> *« Le jeu associé est un jeu à **TROIS joueurs : la firme 1, la firme $2_\ell$ (coût faible), et la firme $2_h$ (coût élevé)**. Chacune a le même ensemble de stratégies pures, à savoir $\{1,4,6\}$. »*

> *« Comme il y a trois joueurs, **le choix de prix de la firme 1 détermine LA MATRICE**, et les prix de $2_\ell$ et $2_h$ déterminent **la LIGNE et la COLONNE** de la matrice choisie. »*

**Matrice « la firme 1 choisit $p_1=6$ » :**

|  | $p_h=6$ | $p_h=4$ | $p_h=1$ |
|---|---|---|---|
| $p_\ell=6$ | $6,\ 5,\ 2$ | $3,\ 5,\ 0$ | $3,\ 5,\ -21$ |
| $p_\ell=4$ | $3,\ 12,\ 2$ | $0,\ 12,\ 0$ | $0,\ 12,\ -21$ |
| $p_\ell=1$ | $3,\ 0,\ 2$ | $0,\ 0,\ 0$ | $0,\ 0,\ -21$ |

**Matrice « la firme 1 choisit $p_1=4$ » :**

|  | $p_h=6$ | $p_h=4$ | $p_h=1$ |
|---|---|---|---|
| $p_\ell=6$ | $16,\ 0,\ 0$ | $16,\ 0,\ 0$ | $8,\ 0,\ -21$ |
| $p_\ell=4$ | $12,\ 6,\ 0$ | $12,\ 6,\ 0$ | $4,\ 6,\ -21$ |
| $p_\ell=1$ | $8,\ 0,\ 0$ | $8,\ 0,\ 0$ | $0,\ 0,\ -21$ |

**Matrice « la firme 1 choisit $p_1=1$ » :** toutes les entrées sont $7,\ 0,\ 0$.

### 🔴 14.5 Comment les paiements sont obtenus

**Pour $2_\ell$ et $2_h$ — par simple lecture :**

> *« Les paiements dans le jeu associé pour les firmes $2_\ell$ et $2_h$ peuvent être obtenus **en les LISANT SIMPLEMENT sur les matrices de la figure 7.7. C'est parce qu'il n'y a qu'UN SEUL « type » de firme 1.** »*

> *« Par exemple, si $2_\ell$ choisit $p_\ell=6$, elle reçoit $5$ si la firme 1 choisit $p_1=6$. **Notez que ceci est reflété dans le jeu associé, où le paiement de $2_\ell$ est $5$ […] QUEL QUE SOIT le prix choisi par $2_h$.** »*

**Pour la firme 1 — par ESPÉRANCE :**

> *« Les paiements de la firme 1 sont obtenus **en considérant ses CROYANCES sur les coûts de la firme 2**. »*

**L'exemple travaillé du livre** — $p_\ell=1$, $p_h=6$, $p_1=4$ :

| Si le coût de 2 est… | Le paiement de 1 *(fig. 7.7)* |
|---|---|
| **faible** *(elle affronte $2_\ell$ à $p_\ell=1$)* | $0$ |
| **élevé** *(elle affronte $2_h$ à $p_h=6$)* | $16$ |

$$\text{Espérance} \ =\ \tfrac12(0)+\tfrac12(16)\ =\ \boxed{8}$$

> *« **Ceci est précisément le paiement de la firme 1 correspondant à $p_1=4$, $p_\ell=1$ et $p_h=6$ dans la figure 7.8.** »*

### 14.6 La résolution

> *« Pour découvrir un équilibre bayésien-nashien, **nous devons chercher un équilibre de Nash du jeu associé de la figure 7.8**. »*

> *« **Trouver UN équilibre de Nash est particulièrement facile ici.** »*

| Le joueur | Sa stratégie | Son statut |
|---|---|---|
| $2_\ell$ | **prix $4$** | **faiblement dominante** |
| $2_h$ | **prix $6$** | **faiblement dominante** |
| $1$ | **prix $4$** | **strictement dominante** *une fois les autres éliminées* |

**La vérification pour la firme 1**, avec $p_\ell=4$ et $p_h=6$ :

$$p_1=6\ \Rightarrow\ 3 \qquad\qquad \boxed{p_1=4\ \Rightarrow\ 12} \qquad\qquad p_1=1\ \Rightarrow\ 7$$

> *« Par conséquent, **il y a un équilibre bayésien-nashien en stratégies PURES dans lequel DEUX des trois firmes choisissent un prix de 4 tandis que la troisième choisit un prix de 6**. »*

### 🔴 14.7 La leçon économique

> *« Notez qu'**EN CONTRASTE avec le cas de la concurrence de Bertrand en information COMPLÈTE, les PROFITS NE SONT PAS RAMENÉS À ZÉRO ici. En effet, seule la firme 2 à coût ÉLEVÉ gagne un profit nul dans l'équilibre décrit.** »*

**Comparez à la fiche 509** : en Bertrand avec information complète et coûts identiques, $p=c$ et les profits sont **nuls**. **L'incertitude sur les coûts du rival suffit à faire disparaître ce résultat.**

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « formuler le jeu sous forme stratégique » | **Définition 7.1** | Nommer $S_i$ et écrire $u_i$ comme fonction du **profil complet** |
| Une matrice à résoudre « par élimination » | **Déf. 7.3-7.6** | Chercher les **dominées**, éliminer, **recommencer** |
| « l'ordre d'élimination importe-t-il ? » | **Exercice 7.3** | **Oui** pour la faible, **non** pour la stricte |
| « une stratégie mixte peut-elle dominer ? » | **Exercice 7.4** | Chercher un **mélange** qui bat une pure — c'est possible |
| « devine la moyenne » | **§7.2.1** | $100\to33\to11\to\dots\to1$ |
| « trouver tous les équilibres de Nash » | **Théorème 7.1(b)** | Poser l'**indifférence** sur le support, résoudre |
| « vérifier que c'est un équilibre » | **Théorème 7.1(c)** | Tester **seulement les stratégies pures** |
| Aucun équilibre pur visible | **Stratégies mixtes** | Chercher un équilibre **complètement mixte** |
| Un jeu à **somme nulle** | **Exercice 7.7** | Théorème du **minimax** ; équilibres **interchangeables** ; **valeur** unique |
| Un jeu **symétrique** | **Exercice 7.8** | Il possède un équilibre **symétrique** |
| Des coûts / valeurs **privés** | **§7.2.3** | Construire $G^+$ : **un joueur par TYPE** |
| « croyances cohérentes » | **A priori commun** | Appliquer **Bayes** à $p$ |

**Les trois réflexes de cadrage :**

1. **Toujours chercher les dominées d'abord.** Elles réduisent le jeu **gratuitement**, et parfois le résolvent.
2. **Pour un équilibre mixte, poser l'indifférence — pas la maximisation.** C'est le théorème 7.1(b).
3. **Devant de l'information incomplète, compter les JOUEURS de $G^+$**, pas ceux de $G$. Un joueur à $k$ types en fournit $k$.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Résoudre par élimination itérative

1. **Balayer les lignes** *(joueur 1)* : une ligne est-elle **partout** strictement inférieure à une autre ?
2. **Balayer les colonnes** *(joueur 2)* de même.
3. **Éliminer**, redessiner la matrice réduite.
4. **Recommencer** — des dominances **nouvelles** apparaissent.
5. S'arrêter quand plus rien ne bouge.
6. Si l'on utilise la dominance **faible**, **noter l'ordre** — le résultat peut en dépendre.

### Méthode 2 — Trouver tous les équilibres de Nash d'un jeu $2\times2$

1. **Les purs** : pour chaque case, vérifier **deux** déviations unilatérales.
2. **Le mixte** : poser $p$ et $q$ les probabilités des **premières** stratégies.
3. **Écrire l'indifférence de 1** — **en fonction de $q$**, la probabilité de **l'AUTRE**.
4. **Écrire l'indifférence de 2** — en fonction de $p$.
5. **Résoudre les deux équations séparément** : chacune ne contient **qu'une** inconnue.
6. **Vérifier** $p,q\in(0,1)$ ; sinon il n'y a pas d'équilibre complètement mixte.

⚠️ **Le piège** : l'indifférence du joueur 1 détermine **$q$**, pas $p$.

### Méthode 3 — Dérouler la preuve du théorème 7.2

| Pas | Ce qu'on fait |
|---|---|
| **1** | Construire $f_{ij}(m)=\dfrac{m_{ij}+\max(0,u_i(j,m_{-i})-u_i(m))}{1+\sum_{j'}\max(0,u_i(j',m_{-i})-u_i(m))}$ ; vérifier $f(m)\in M$ |
| **2** | Numérateur **continu**, dénominateur **continu et $\geq1$** ⟹ $f$ continue ; $M$ **non vide, compact, convexe** ⟹ **BROUWER** |
| **3** | Au point fixe : multiplier en croix, **multiplier par $u_i(j,\hat m_{-i})-u_i(\hat m)$ et sommer sur $j$** ; le membre de gauche est **nul** ; chaque terme de droite est $x\max(0,x)\geq0$ ⟹ **tous nuls** ⟹ **théorème 7.1(c)** |

### Méthode 4 — Construire le jeu stratégique associé $G^+$

1. **Lister les types** de chaque joueur : $T_1,\dots,T_N$.
2. **Créer un joueur par type** — $|T_1|+\cdots+|T_N|$ joueurs en tout.
3. **Donner à $t_i$ l'ensemble de stratégies $S_i$** — celui de son joueur d'origine.
4. **Calculer les paiements** : pour chaque $t_i$, prendre **l'espérance sur $t_{-i}$** avec les poids $p_i(t_{-i}\mid t_i)$.
5. **Un joueur à type unique lit ses paiements DIRECTEMENT** ; ceux à plusieurs types les moyennent.
6. **Chercher un équilibre de Nash de $G^+$** — c'est l'équilibre bayésien-nashien.

### Méthode 5 — Reconnaître qu'un équilibre pur n'existe pas

1. **Encadrer, dans chaque colonne, le meilleur paiement du joueur en ligne.**
2. **Encadrer, dans chaque ligne, le meilleur paiement du joueur en colonne.**
3. **Un équilibre pur est une case DOUBLEMENT encadrée.**
4. S'il n'y en a aucune, **il faut passer aux mixtes** — et le théorème 7.2 garantit qu'il en existe.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Oublier ce qui définit une situation stratégique | *« chaque agent doit d'abord **connaître la décision des autres** avant de savoir laquelle est la meilleure pour lui »* | C'est **la circularité** |
| 2 | Croire que le meilleur lancer est la balle rapide | *« une telle décision **non stratégique** ne tient pas compte de la décision du batteur »* | Il la **frappera** |
| 3 | Croire que l'imprévisibilité est un choix | Elle est **forcée** par le raisonnement par l'absurde | Prévisible ⟹ contradiction |
| 4 | Croire que l'imprévisibilité aide toujours | *« **quand vous êtes SEUL, il n'y a personne à TROMPER** »* | Seulement en cadre **stratégique** |
| 5 | Confondre dominante et dominée | **Dominante** : bat **toutes** les autres · **dominée** : est battue par **une** autre | Déf. 7.2 vs 7.3 |
| 6 | Croire que les stratégies dominantes sont fréquentes | *« **plutôt RARE** »* | D'où l'intérêt de la dominance **d'une sur une** |
| 7 | Ne faire qu'un seul tour d'élimination | *« $R$ **n'est pas** strictement dominée dans le jeu ORIGINAL, mais elle l'est dans le jeu RÉDUIT »* | **La dominance crée de la dominance** |
| 8 | Oublier « au moins une inégalité stricte » dans la dominance faible | Sans elle, toute stratégie « dominerait » sa copie | Déf. 7.5 |
| 9 | Croire que dominance faible et stricte donnent le même résultat | Fig. 7.4 : la stricte n'élimine **rien**, la faible isole $(U,L)$ | Ce sont deux procédures |
| 10 | Croire que la faible élimine moins | Elle élimine **PLUS** : $\bigcap W_i^n\subseteq\bigcap S_i^n$ | Exercice 7.6 |
| 11 | Croire que l'ordre d'élimination est indifférent | **Pour la faible, il compte** *(ex. 7.3(a))* ; pour la stricte, non *(7.3(b))* | La faible est **fragile** |
| 12 | Dans « devine la moyenne », croire que 33 domine **strictement** | C'est une dominance **FAIBLE** — égalité dans la plupart des cas | Le cas strict : *« si tous les autres choisissent 34 »* |
| 13 | Croire que 99 est strictement dominée | *« montrer que **99 n'est PAS strictement dominée** »* *(ex. 7.5(c))* | Attention à la nuance |
| 14 | Croire qu'un équilibre pur existe toujours | **Le duel batteur-lanceur n'en a aucun** | D'où les mixtes |
| 15 | Croire que l'équilibre de Nash est unique | Fig. 7.4 a $(U,L)$ **et** $(D,R)$ ; l'exemple 7.1 en a **trois** | La multiplicité est la règle |
| 16 | Ne tester qu'une déviation par équilibre pur | Il en faut **une par joueur** | Fixer les autres, faire varier **un seul** |
| 17 | Oublier pourquoi le duel n'a pas d'équilibre pur | *« dans un équilibre pur, **les choix de tout le monde sont PARFAITEMENT PRÉVISIBLES** »* | Contradiction avec le §7.1 |
| 18 | Croire que les mixtes ajoutent seulement des mélanges | Elles donnent **strictement plus** de choix, les pures y étant les **distributions dégénérées** | $S_i\subset M_i$ |
| 19 | Oublier pourquoi $u_i(m)$ est un **produit** de probabilités | *« parce que **les joueurs choisissent leurs stratégies INDÉPENDAMMENT** »* | $m_1(s_1)\cdots m_N(s_N)$ |
| 20 | Croire qu'il faut tester toutes les mixtes | Le théorème 7.1(c) : **les pures suffisent** | Grâce à la **linéarité** |
| 21 | Mal appliquer le théorème 7.1(b) | **Égalité** sur le support, **$\geq$** hors du support | Deux conditions, pas une |
| 22 | Résoudre l'indifférence de 1 pour trouver $p$ | Elle donne **$q$** — la probabilité de **l'autre** | Le piège classique |
| 23 | Croire que l'équilibre mixte est efficace | Exemple 7.1 : paiement $2/3$, **pire que les deux purs** | Il est **inefficace** |
| 24 | Croire qu'un équilibre mixte signifie randomisation | **Deux** interprétations : la **roulette** ou les **croyances** | Le contexte tranche |
| 25 | Croire que le théorème 7.2 vaut pour tout jeu | **Jeux FINIS** seulement | Il faut $S_i$ fini |
| 26 | Oublier pourquoi $M$ satisfait Brouwer | **Non vide, compact, convexe** — les trois | Un simplexe |
| 27 | Oublier pourquoi le dénominateur de $f$ ne s'annule pas | *« il n'est **JAMAIS inférieur à UN** »* | Somme de $\max(0,\cdot)\geq0$, plus 1 |
| 28 | Se tromper dans le pas 3 | Il faut **multiplier par $u_i(j,\hat m_{-i})-u_i(\hat m)$ PUIS sommer sur $j$** | Sans cela, rien ne se simplifie |
| 29 | Ne pas voir pourquoi le membre de gauche est nul | $\sum_j\hat m_{ij}u_i(j,\hat m_{-i})=u_i(\hat m)$ — **les $m_{ij}$ somment à 1** | C'est la définition de $u_i(m)$ |
| 30 | Ne pas voir pourquoi chaque terme est $\geq0$ | $x\cdot\max(0,x)=\max(0,x)^2\geq0$ | Somme nulle ⟹ tous nuls |
| 31 | Sous-estimer la portée du théorème 7.2 | *« si les équilibres existaient rarement, ceci indiquerait une **INCOHÉRENCE FONDAMENTALE** dans la définition »* | Une **mesure de solidité** |
| 32 | Croire que l'information incomplète exige une théorie nouvelle | *« l'idée est de lui **AJOUTER un ingrédient** de sorte qu'elle devienne un jeu sous forme stratégique »* | Harsanyi (1967-68) |
| 33 | Croire que $u_i$ ne dépend que de son propre type | $u_i:S\times T\to\mathbb{R}$ — **elle dépend de TOUS les types** | Cf. l'enchère pétrolière |
| 34 | Croire que l'a priori commun est obligatoire | *« notre capacité à analyser **ne requerra PAS** l'hypothèse d'a priori commun »* | Le livre ne l'impose pas |
| 35 | Confondre les deux lectures de l'a priori commun | **(1)** distribution **empirique objective** · **(2)** *« les différences de croyances ne viennent **que** de différences d'information »* | Deux justifications distinctes |
| 36 | Dans $G^+$, garder $N$ joueurs | **Chaque TYPE devient UN JOUEUR** | $T_1\cup\cdots\cup T_N$ |
| 37 | Calculer les paiements de $G^+$ sans espérance | $v_{t_i}(s^+)=\sum_{t_{-i}}p_i(t_{-i}\mid t_i)\,u_i(\cdot)$ | Un joueur à type **unique** lit directement |
| 38 | Oublier que les $s_j$ **dépendent de $t_j$** | *« le comportement des autres **peut dépendre de leurs types** »* | C'est $s_j(t_j)$, pas $s_j$ |
| 39 | Croire que le théorème 7.3 exige une preuve nouvelle | **Trois lignes** — $G^+$ est fini, donc théorème 7.2 | Tout le bénéfice de la construction |
| 40 | Dans l'exemple 7.3, inventer la règle de partage | Elle est **stipulée** : partage égal si **les deux** coûts sont sous le prix, sinon **1 prend tout** | Elle a une **justification Bertrand** |
| 41 | Croire que Bertrand annule toujours les profits | *« **en contraste avec l'information complète, les profits NE SONT PAS ramenés à zéro** »* | Seule $2_h$ gagne zéro |

## 📌 Ultimate Review

**§7.1 — la décision stratégique.**

> *« **La théorie des jeux est l'étude systématique de la manière dont des agents rationnels se comportent dans des JEUX, où chaque agent doit d'abord CONNAÎTRE la décision des autres avant de savoir laquelle est la meilleure pour lui-même.** »*

$$\boxed{\;\textbf{« CETTE CIRCULARITÉ est la MARQUE de la théorie des jeux. »}\;}$$

**Les six concepts de solution du chapitre** : dominance → **Nash** → **Bayes-Nash** → induction à rebours → perfection en sous-jeux → équilibre séquentiel. *« Chacun est plus **sophistiqué** que ses prédécesseurs. »*

**LE DUEL BATTEUR-LANCEUR (fig. 7.1)** — chaque joueur gagne s'il **devine** l'autre :

|  | $F$ | $C$ |
|---|---|---|
| $F$ | $-1,1$ | $1,-1$ |
| $C$ | $1,-1$ | $-1,1$ |

**L'argument d'imprévisibilité** : « toujours $F$ » ⟹ le batteur prépare $F$ ⟹ le lanceur doit jouer $C$ ⟹ **contredit l'hypothèse**.

> *« **Tout bon joueur de poker le comprend bien — c'est un aspect essentiel du BLUFF réussi.** »* Mais *« quand vous êtes **seul**, il n'y a personne à **tromper** »*.

**§7.2 — la forme stratégique.**

**DÉF. 7.1** : $G=(S_i,u_i)_{i=1}^{N}$ avec $u_i:\prod_j S_j\to\mathbb{R}$. **FINI** si chaque $S_i$ l'est.

**Notation** : $S=S_1\times\cdots\times S_N$, et $-i$ = **tous sauf $i$**.

**§7.2.1 — la dominance.**

**DÉF. 7.2 — dominante stricte** : $u_i(\hat s_i,s_{-i})>u_i(s_i,s_{-i})$ pour **tous** $s_i\neq\hat s_i$ et tous $s_{-i}$. *« plutôt RARE »*. **DÉF. 7.3 — strictement dominée** : $\hat s_i$ bat $\bar s_i$ pour tout $s_{-i}$. **DÉF. 7.4 — itérativement non dominée** : $s_i\in S_i^n$ pour tout $n$. **DÉF. 7.5 — faiblement dominée** : $\geq$ partout, **avec au moins une STRICTE**. **DÉF. 7.6** : $s_i\in W_i^n$ pour tout $n$.

$$\bigcap_n W_i^n\ \subseteq\ \bigcap_n S_i^n \qquad\text{(exercice 7.6)}$$

⚠️ **Le fait moteur** : *« $R$ n'est pas dominée dans le jeu **original**, mais elle l'est dans le jeu **réduit** »* — **la dominance CRÉE de la dominance**.

⚠️ **Fragilité** : l'**ordre** compte pour la dominance **faible** *(ex. 7.3(a))*, pas pour la **stricte** *(7.3(b))*.

**« DEVINE LA MOYENNE »** : $N\geq2$ joueurs, entier de 1 à 100, le plus proche du **tiers de la moyenne** gagne.

$$100 \ \xrightarrow{\ \text{moy}/3\leq33\tfrac13\ } \ 33 \ \longrightarrow\ 11 \ \longrightarrow\ \dots \ \longrightarrow\ \boxed{1}$$

*(Exercice 7.5 : la dominance **stricte** y arrive aussi — **en 99 tours** ; avec $N=3$, la faible donne $14$, puis $2$, puis $1$.)*

**§7.2.2 — l'équilibre de Nash.**

**DÉF. 7.7 — en stratégies PURES** : $u_i(\hat s)\geq u_i(s_i,\hat s_{-i})$ pour tout $s_i$.

⚠️ **Le duel n'en a AUCUN** — car *« dans un équilibre pur, **les choix de tout le monde sont PARFAITEMENT PRÉVISIBLES** »*.

**DÉF. 7.8 — stratégie MIXTE** : $m_i:S_i\to[0,1]$ avec $\sum_{s_i}m_i(s_i)=1$. *« Une **ROULETTE**. »*

$$u_i(m)\equiv\sum_{s\in S}m_1(s_1)\cdots m_N(s_N)\,u_i(s) \qquad \text{(les choix sont INDÉPENDANTS)}$$

**DÉF. 7.9 — Nash** : $u_i(\hat m)\geq u_i(m_i,\hat m_{-i})$ pour toute $m_i\in M_i$.

**THÉORÈME 7.1 — les tests simplifiés.** Équivalence de :

**(a)** $\hat m$ est un équilibre · **(b)** **égalité** sur le support, **$\geq$** hors du support · **(c)** $u_i(\hat m)\geq u_i(s_i,\hat m_{-i})$ pour toute **pure** $s_i$.

$$\boxed{\;\textbf{(b) pour CALCULER} \qquad \textbf{(c) pour VÉRIFIER}\;}$$

*Preuve : (a)⟹(b) car $u_i(\hat m)$ est une **combinaison convexe stricte** des $u_i(s_i,\hat m_{-i})$ du support ; (c)⟹(a) car $u_i(m_i,\hat m_{-i})$ est une **combinaison convexe** des mêmes nombres. **Tout repose sur la LINÉARITÉ de $u_i$ en $m_i$.***

**EXEMPLE 7.1 — le jeu de coordination.**

|  | $WP$ | $MW$ |
|---|---|---|
| $WP$ | $2,1$ | $0,0$ |
| $MW$ | $0,0$ | $1,2$ |

Deux équilibres **purs** ; l'équilibre **mixte** résout $2q=1-q$ et $1-p=2p$ ⟹ $\boxed{p=q=\tfrac13}$.

⚠️ **Trois enseignements** : **multiplicité** · l'équilibre mixte est **INEFFICACE** *(paiement $2/3$)* · **un équilibre mixte existe même sans désir d'imprévisibilité**.

**LES DEUX INTERPRÉTATIONS d'une stratégie mixte :**

| Interprétation | Quand | Exemple |
|---|---|---|
| **La roulette** — randomisation délibérée | intérêts **OPPOSÉS** | duel batteur-lanceur |
| **Les croyances** des autres — *« aucun joueur ne randomise explicitement »* | intérêts qui **COÏNCIDENT** en partie | fig. 7.6 |

**THÉORÈME 7.2 — (Nash) existence.**

$$\boxed{\;\textbf{TOUT jeu sous forme stratégique FINI possède au moins un équilibre de Nash.}\;}$$

| Pas | Le contenu |
|---|---|
| **1** | $f_{ij}(m)=\dfrac{m_{ij}+\max(0,u_i(j,m_{-i})-u_i(m))}{1+\sum_{j'}\max(0,u_i(j',m_{-i})-u_i(m))}$ — elle **pousse le poids vers ce qui fait mieux que la moyenne** ; $f(m)\in M$ |
| **2** | Numérateur continu, dénominateur continu et **$\geq1$** ⟹ $f$ continue ; $M$ **non vide, compact, convexe** ⟹ **BROUWER (A1.11)** ⟹ point fixe $\hat m$ |
| **3** | $\hat m_{ij}\sum_{j'}\max(0,\cdot)=\max(0,\cdot)$ ; multiplier par $u_i(j,\hat m_{-i})-u_i(\hat m)$ et **sommer sur $j$** ; le membre de gauche vaut **0** ; chaque terme de droite est $x\max(0,x)\geq0$ ⟹ tous **nuls** ⟹ **thm 7.1(c)** |

⚠️ **La portée conceptuelle** : *« si les équilibres existaient rarement, ceci indiquerait une **incohérence fondamentale dans la définition**. Qu'ils existent toujours dans les jeux finis est **une mesure de la solidité de l'idée**. »*

**§7.2.3 — l'information incomplète.**

$$\boxed{\;\text{On ne construit pas une théorie nouvelle — on RAMÈNE l'incomplet au complet.}\;}$$

**Les objets nouveaux** : des **TYPES** $T_i$ finis, des paiements $u_i:S\times T\to\mathbb{R}$ *(dépendant de TOUS les types)*, et des **CROYANCES** $p_i(t_{-i}\mid t_i)$.

**L'A PRIORI COMMUN** : quand tous les $p_i$ viennent d'un même $p$ par **Bayes** :

$$p_i(t_{-i}\mid t_i)=\frac{p(t_i,t_{-i})}{\sum_{t'_{-i}}p(t_i,t'_{-i})}$$

**Ses deux lectures** : distribution **empirique objective** · ou *« les différences de croyances ne proviennent **que** de différences d'**information** »*. **Le livre NE l'impose PAS.**

**DÉF. 7.10** : $G=(p_i,T_i,S_i,u_i)_{i=1}^{N}$ — un **jeu bayésien**. **DÉF. 7.11 — le jeu associé $G^+$** : **chaque TYPE devient un JOUEUR**, avec $S_i$ pour stratégies et

$$v_{t_i}(s^+)=\sum_{t_{-i}\in T_{-i}}p_i(t_{-i}\mid t_i)\,u_i\big(s_1(t_1),\dots,s_N(t_N),t_1,\dots,t_N\big)$$

**DÉF. 7.12 — équilibre bayésien-nashien** = un **équilibre de Nash de $G^+$**. **THÉORÈME 7.3** : tout jeu bayésien **fini** en possède un — **trois lignes**, via le théorème 7.2.

**EXEMPLE 7.3 — Bertrand incomplet.** Coût de 1 : $0$. Coût de 2 : $1$ ou $4$, équiprobables. Demande $8-p$, prix dans $\{1,4,6\}$. **Trois joueurs** : $1$, $2_\ell$, $2_h$.

Les paiements de $2_\ell$ et $2_h$ **se lisent directement** *(1 n'a qu'un type)* ; ceux de $1$ sont des **espérances** — ex. $\tfrac12(0)+\tfrac12(16)=8$.

**L'équilibre** : $p_\ell=4$ et $p_h=6$ **faiblement dominantes**, puis $p_1=4$ **strictement dominante** *(paiements $3$, $12$, $7$)*.

⚠️ **La leçon** : *« **en contraste avec Bertrand en information complète, les profits NE SONT PAS ramenés à zéro** — seule la firme 2 à coût élevé gagne zéro »*.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Comment le livre définit-il la théorie des jeux ?**

</summary>

> *« **La théorie des jeux est l'étude systématique de la manière dont des agents RATIONNELS se comportent dans des situations stratégiques, ou dans des JEUX, où chaque agent doit d'abord CONNAÎTRE la décision des autres agents avant de savoir quelle décision est la meilleure pour lui-même.** »*

$$\textbf{« CETTE CIRCULARITÉ est la MARQUE de la théorie des jeux. »}$$

</details>

<details class="details--riche">
<summary>

**2. Quels concepts de solution le chapitre annonce-t-il ?**

</summary>

**Dominance** → **Nash** → **Bayes-Nash** → **induction à rebours** → **perfection en sous-jeux** → **équilibre séquentiel**.

> *« **Chacun de ces concepts est plus SOPHISTIQUÉ que ses prédécesseurs, et savoir QUAND appliquer une solution plutôt qu'une autre est une part importante du métier de bon économiste appliqué.** »*

</details>

<details class="details--riche">
<summary>

**3. Qu'est-ce qui distingue une décision stratégique d'une décision non stratégique ?**

</summary>

> *« **Les dernières peuvent être prises « en ISOLEMENT », sans tenir compte des décisions que d'autres pourraient prendre.** »*

| Non stratégique | Stratégique |
|---|---|
| La **théorie du consommateur** — *« chacun agit entièrement pour son compte, sans égard au comportement des autres »* | **Cournot** et **Bertrand** — *« son action optimale **dépend** de l'action prise par l'autre firme »* |

</details>

<details class="details--riche">
<summary>

**4. Décrire le duel batteur-lanceur et sa matrice.**

</summary>

Le lanceur a **la meilleure balle rapide de la ligue** mais **une courbe moyenne**. Fin de neuvième manche, compte plein, bases pleines, deux retraits, un point d'avance ⟹ **un seul lancer**. Circuit ⟹ victoire ; retrait ⟹ défaite. Utilités $\pm1$.

|  | Batteur $F$ | Batteur $C$ |
|---|---|---|
| Lanceur $F$ | $-1,\ 1$ | $1,\ -1$ |
| Lanceur $C$ | $1,\ -1$ | $-1,\ 1$ |

⚠️ *« Le batteur frappe un circuit **quand il se prépare pour le lancer que le lanceur a choisi**, et est retiré sinon. »*

</details>

<details class="details--riche">
<summary>

**5. Dérouler l'argument d'imprévisibilité.**

</summary>

1. Si le lanceur est **prévisible** — *« il lance toujours sa balle rapide »* — le batteur, **en choisissant $F$, est GARANTI de gagner**.
2. Mais alors **le batteur aussi est prévisible** — il prépare toujours $F$.
3. *« Par conséquent, **parce que le lanceur se comporte stratégiquement, il choisira optimalement de lancer sa COURBE** »* et gagne.
4. *« **Mais ceci CONTREDIT notre supposition originelle !** »*

> *« Nous concluons qu'**il ne peut pas être correctement prédit que le lanceur lance toujours une balle rapide. De même** pour la courbe. »*

</details>

<details class="details--riche">
<summary>

**6. Quelle est la leçon générale, et sa limite ?**

</summary>

> *« **Quand des individus rationnels prennent des décisions stratégiquement, ils se comportent parfois d'une manière « IMPRÉVISIBLE ». Tout bon joueur de poker le comprend bien — c'est un aspect essentiel du BLUFF réussi.** »*

⚠️ **La limite** : *« il n'y a **AUCUN tel avantage dans des cadres NON stratégiques — quand vous êtes SEUL, il n'y a personne à « TROMPER »**. »*

</details>

<details class="details--riche">
<summary>

**7. Énoncer la définition 7.1.**

</summary>

Un **jeu sous forme stratégique** est $G=(S_i,u_i)_{i=1}^{N}$ où $S_i$ est **l'ensemble des stratégies** de $i$ et

$$u_i:\prod_{j=1}^{N}S_j\to\mathbb{R}$$

décrit **le paiement de $i$ en fonction des stratégies choisies par TOUS**. Il est **FINI** si chaque $S_i$ contient un nombre fini d'éléments.

**Les trois éléments communs identifiés** : les **joueurs**, les **stratégies**, les **paiements**.

</details>

<details class="details--riche">
<summary>

**8. Écrire le duel batteur-lanceur en forme stratégique.**

</summary>

$$S_1=S_2=\{F,C\}$$

$$u_1(F,F)=u_1(C,C)=-1, \qquad u_1(F,C)=u_1(C,F)=1$$

$$u_2(s_1,s_2)=-u_1(s_1,s_2) \quad \forall(s_1,s_2)$$

⚠️ La dernière ligne en fait un jeu à **SOMME NULLE**.

> *« Les jeux à **deux joueurs** avec ensembles **finis** peuvent **toujours** être représentés sous forme **matricielle**. »*

</details>

<details class="details--riche">
<summary>

**9. Énoncer les définitions 7.2 et 7.3, et dire ce qui les distingue.**

</summary>

**DÉF. 7.2 — strictement DOMINANTE** : $u_i(\hat s_i,s_{-i})>u_i(s_i,s_{-i})$ pour **tout** $(s_i,s_{-i})\in S$ avec $s_i\neq\hat s_i$.

**DÉF. 7.3 — strictement DOMINÉE** : $\hat s_i$ **domine strictement** $\bar s_i$ si $u_i(\hat s_i,s_{-i})>u_i(\bar s_i,s_{-i})$ pour **tout** $s_{-i}\in S_{-i}$.

⚠️ **La différence** : la dominance stricte porte sur **une stratégie contre UNE autre** ; être **dominante** signifie battre **TOUTES** les autres.

> *« La présence d'une stratégie strictement dominante est **plutôt RARE**. »*

</details>

<details class="details--riche">
<summary>

**10. Analyser le jeu de la figure 7.2.**

</summary>

|  | $L$ | $R$ |
|---|---|---|
| $U$ | $3,0$ | $0,-4$ |
| $D$ | $2,4$ | $-1,8$ |

**Le joueur 2** doit raisonner : *« si 1 choisit $U$, il est meilleur pour 2 de choisir $L$ ; si 1 choisit $D$, de choisir $R$ »*.

⚠️ **Le joueur 1 n'a pas à raisonner** : *« son meilleur choix est en fait **INDÉPENDANT** du choix fait par 2. **Quel que soit** le choix de 2, $U$ est le meilleur. »*

⟹ 1 choisit $U$ ; **l'ayant déduit**, 2 choisit $L$ ⟹ **$(U,L)$, paiements $(3,0)$**.

</details>

<details class="details--riche">
<summary>

**11. Analyser le jeu de la figure 7.3.**

</summary>

|  | $L$ | $M$ | $R$ |
|---|---|---|---|
| $U$ | $3,0$ | $0,-5$ | $0,-4$ |
| $C$ | $1,-1$ | $3,3$ | $-2,4$ |
| $D$ | $2,4$ | $4,1$ | $-1,8$ |

⚠️ **Aucun joueur n'a de stratégie dominante.** Mais **$C$ est toujours surpassée par $D$** *(pour 1)* et **$M$ par $R$** *(pour 2)*.

> *« Maintenant que $C$ et $M$ ont été retirées, **le jeu s'est RÉDUIT à celui de la figure 7.2** »* ⟹ $(3,0)$.

</details>

<details class="details--riche">
<summary>

**12. Pourquoi faut-il ITÉRER l'élimination ?**

</summary>

> *« Notez que **bien que $R$ ne soit PAS strictement dominée dans le jeu ORIGINAL, elle EST strictement dominée (par $L$) dans le jeu RÉDUIT** dans lequel $D$ a été éliminée. »*

> *« De même, **$D$ n'est pas strictement dominée dans le jeu original, mais elle l'est dans le jeu réduit dans lequel $C$ a été éliminée**, et **$R$ ne devient strictement dominée qu'APRÈS que $C$ ET $D$ ont été éliminées**. »*

$$\boxed{\;\text{LA DOMINANCE CRÉE DE LA DOMINANCE.}\;}$$

</details>

<details class="details--riche">
<summary>

**13. Définir $S_i^n$ et $W_i^n$, et énoncer les définitions 7.4 et 7.6.**

</summary>

$S_i^0=S_i$ ; pour $n\geq1$, $s_i\in S_i^n$ si $s_i\in S_i^{n-1}$ **n'est pas strictement dominée dans $S^{n-1}$**.

**DÉF. 7.4** : $s_i$ est **itérativement strictement non dominée** si $s_i\in S_i^n$ **pour tout $n\geq1$**.

$W_i^0=S_i$ ; $s_i\in W_i^n$ si $s_i\in W_i^{n-1}$ n'est pas **faiblement** dominée dans $W^{n-1}$.

**DÉF. 7.6** : $s_i$ est **itérativement faiblement non dominée** si $s_i\in W_i^n$ pour tout $n\geq1$.

</details>

<details class="details--riche">
<summary>

**14. Énoncer la dominance faible, et illustrer la différence.**

</summary>

**DÉF. 7.5** : $\hat s_i$ **domine faiblement** $\bar s_i$ si $u_i(\hat s_i,s_{-i})\geq u_i(\bar s_i,s_{-i})$ pour tout $s_{-i}$, **avec au moins une inégalité STRICTE**.

**Figure 7.4** :

|  | $L$ | $R$ |
|---|---|---|
| $U$ | $1,1$ | $0,0$ |
| $D$ | $0,0$ | $0,0$ |

> *« **Aucun joueur n'a de stratégie strictement dominée.** Cependant, $D$ et $R$ sont **faiblement** dominées. Ainsi, **éliminer les strictement dominées n'a AUCUN effet, alors qu'éliminer les faiblement dominées isole $(U,L)$**. »*

</details>

<details class="details--riche">
<summary>

**15. Comparer les deux procédures d'élimination.**

</summary>

$$\bigcap_n W_i^n \ \subseteq\ \bigcap_n S_i^n \qquad\text{(exercice 7.6)}$$

> *« L'ensemble restant après la dominance **faible** itérative est **CONTENU** dans celui restant après la dominance **stricte** itérative. »*

⚠️ **La contrepartie** : *« l'**ORDRE** dans lequel les stratégies **faiblement** dominées sont éliminées **peut affecter les issues qui restent** »* *(ex. 7.3(a))*, alors que pour la **stricte**, *« l'ordre **n'importe pas** »* *(7.3(b))*.

</details>

<details class="details--riche">
<summary>

**16. Énoncer les règles de « devine la moyenne » et résoudre le premier tour.**

</summary>

$N\geq2$ joueurs choisissent **simultanément un entier entre 1 et 100** ; **le plus proche du TIERS de la moyenne** gagne 100 \$, partagés en cas d'égalité.

**Le premier tour** : *« choisir **33 domine FAIBLEMENT tous les nombres plus élevés** »*.

| Pourquoi $\geq$ | Le tiers de la moyenne est **au plus $33\tfrac13$** |
|---|---|
| Pourquoi **strict** quelque part | *« **si tous les autres choisissent 34**, 33 est **strictement meilleur** »* |

$$W_i^1\subseteq\{1,\dots,33\}$$

</details>

<details class="details--riche">
<summary>

**17. Terminer « devine la moyenne » et citer les résultats des exercices.**

</summary>

> *« Mais un argument semblable établit que **tous les nombres au-dessus de 11 sont faiblement dominés dans $W^1$** »* ⟹ $W_i^2\subseteq\{1,\dots,11\}$.

$$100\ \to\ 33\ \to\ 11\ \to\ \dots\ \to\ \boxed{1}$$

**Exercice 7.5** : **(a)** aucune pure n'en domine strictement une autre · **(b)** une **mixte** domine strictement $100$ · **(c)** **99 n'est PAS strictement dominée** · **(d)** la stricte itérative donne aussi $1$, **en 99 tours** · **(e)** avec $N=3$ : $W^1=\{1,\dots,14\}$, $W^2=\{1,2\}$, $W^3=\{1\}$.

</details>

<details class="details--riche">
<summary>

**18. Pourquoi la dominance ne résout-elle pas le duel batteur-lanceur ?**

</summary>

> *« Dans ce jeu, **aucune stratégie pour aucun joueur n'est strictement OU faiblement dominée**. Dès lors, **AUCUNE des procédures d'élimination décrites ne réduira les stratégies considérées**. »*

> *« Bien que ces procédures soient très utiles dans certaines circonstances, **nous ne sommes pas plus près de résoudre le duel qu'au moment où nous l'avons mis de côté. Il est temps de changer cela.** »*

</details>

<details class="details--riche">
<summary>

**19. Énoncer la définition 7.7, et l'analogie qui la motive.**

</summary>

**DÉF. 7.7** : $\hat s\in S$ est un **équilibre de Nash en stratégies pures** si, pour chaque $i$,

$$u_i(\hat s)\geq u_i(s_i,\hat s_{-i}) \qquad \forall\,s_i\in S_i$$

**L'analogie** : *« l'attrait théorique de l'équilibre de marché vient de ce qu'**il n'y a aucune TENDANCE ni NÉCESSITÉ pour le comportement de qui que ce soit de CHANGER. Ces RÉGULARITÉS forment la base des PRÉDICTIONS.** »*

**L'idée informelle** : *« **chaque individu, tout en étant PLEINEMENT CONSCIENT du comportement des autres, n'a AUCUNE INCITATION à changer le sien** »*.

</details>

<details class="details--riche">
<summary>

**20. Montrer que le duel n'a aucun équilibre en stratégies pures, et dire pourquoi.**

</summary>

**Vérification de $(F,F)$ :**

| Joueur | Paiement | En déviant vers $C$ | Verdict |
|---|---|---|---|
| Batteur | $1$ | $(F,C)$ ⟹ $-1$ | pas d'amélioration |
| Lanceur | $-1$ | $(C,F)$ ⟹ $1$ | **améliore** |

⟹ $(F,F)$ n'est pas un équilibre. *« Un argument similaire s'applique aux trois autres. »*

**Pourquoi c'était prévisible** : *« **incorporé dans la définition d'un équilibre en stratégies pures est que CHAQUE joueur SAIT PRÉCISÉMENT quelle stratégie chacun des autres choisira. Les choix de tout le monde sont PARFAITEMENT PRÉVISIBLES.** »* — ce que le §7.1 a exclu.

</details>

<details class="details--riche">
<summary>

**21. Vérifier que le mélange à $\tfrac12$-$\tfrac12$ résout le duel.**

</summary>

Chacun lance **une pièce équilibrée**, et **chacun le sait**. On suppose les paiements **VNM** et la maximisation de l'**espérance**.

**Pour le lanceur**, face à un batteur qui joue $\tfrac12$-$\tfrac12$ :

$$\mathbb{E}[F]=\tfrac12(-1)+\tfrac12(1)=0 \qquad \mathbb{E}[C]=\tfrac12(1)+\tfrac12(-1)=0$$

⟹ **il est INDIFFÉRENT**. *« Ainsi, **alors que choisir soit $F$ soit $C$ lui donnerait son paiement le plus élevé de zéro, RANDOMISER à $\tfrac12$-$\tfrac12$ le ferait AUSSI.** »*

**Symétriquement** pour le batteur ⟹ **c'est un équilibre**.

</details>

<details class="details--riche">
<summary>

**22. Énoncer la définition 7.8 et la formule du paiement espéré.**

</summary>

Une **stratégie mixte** est $m_i:S_i\to[0,1]$ avec $\sum_{s_i\in S_i}m_i(s_i)=1$ ; $M_i$ en est l'ensemble.

⚠️ *« Ceci donne à chaque joueur **STRICTEMENT PLUS de choix**, chaque pure $\bar s_i$ étant représentée par la distribution **DÉGÉNÉRÉE** de probabilité un. »*

$$u_i(m)\equiv\sum_{s\in S}m_1(s_1)\cdots m_N(s_N)\,u_i(s)$$

> ⚠️ *« Cette formule découle du fait que **les joueurs choisissent leurs stratégies INDÉPENDAMMENT** »* — d'où le **produit** des probabilités.

</details>

<details class="details--riche">
<summary>

**23. Énoncer le théorème 7.1 et dire à quoi sert chaque partie.**

</summary>

Sont équivalents : **(a)** $\hat m$ est un équilibre · **(b)** pour chaque $i$, **égalité** $u_i(\hat m)=u_i(s_i,\hat m_{-i})$ sur les pures de **poids positif**, et **$\geq$** sur celles de **poids nul** · **(c)** $u_i(\hat m)\geq u_i(s_i,\hat m_{-i})$ pour **toute pure**.

|  | Son usage |
|---|---|
| **(b)** | *« le plus utile pour **CALCULER** — un joueur doit être **INDIFFÉRENT** entre toutes les pures de son support »* |
| **(c)** | *« il **suffit de vérifier** qu'aucune **pure** ne fait mieux »* |

**Ce qu'il exploite** : *« la **LINÉARITÉ de $u_i$ en $m_i$** »*.

</details>

<details class="details--riche">
<summary>

**24. Démontrer (a) ⟹ (b).**

</summary>

**Pas 1** : dans $u_i(\hat m)\geq u_i(m_i,\hat m_{-i})$, *« nous pouvons choisir $m_i$ comme **la stratégie donnant la probabilité UN à $s_i$** »*, donc $u_i(\hat m)\geq u_i(s_i,\hat m_{-i})$ **pour toute pure**.

**Pas 2** : *« **si l'un de ces nombres différait de $u_i(\hat m)$, alors au moins un serait STRICTEMENT PLUS GRAND, parce que $u_i(\hat m)$ est une COMBINAISON CONVEXE STRICTE d'entre eux. Mais ceci contredirait l'inégalité qui vient d'être établie.** »*

*(Pourquoi c'est une moyenne : $u_i(\hat m)=\sum_{s_i}\hat m_i(s_i)u_i(s_i,\hat m_{-i})$.)*

</details>

<details class="details--riche">
<summary>

**25. Démontrer (c) ⟹ (a).**

</summary>

Supposons $u_i(\hat m)\geq u_i(s_i,\hat m_{-i})$ pour toute pure et tout $i$. Fixons $i$ et $m_i\in M_i$.

> *« **Parce que le nombre $u_i(m_i,\hat m_{-i})$ est une COMBINAISON CONVEXE des nombres $\{u_i(s_i,\hat m_{-i})\}$**, nous avons $u_i(\hat m)\geq u_i(m_i,\hat m_{-i})$. »*

*« Parce que **le joueur ET la stratégie étaient arbitraires**, $\hat m$ est un équilibre. »* $\blacksquare$

⚠️ **Une moyenne pondérée ne dépasse jamais le plus grand des nombres moyennés.**

</details>

<details class="details--riche">
<summary>

**26. Calculer l'équilibre mixte de l'exemple 7.1.**

</summary>

|  | $WP$ | $MW$ |
|---|---|---|
| $WP$ | $2,1$ | $0,0$ |
| $MW$ | $0,0$ | $1,2$ |

$p$ = proba que **1** joue $MW$ ; $q$ = proba que **2** joue $WP$. Par le **théorème 7.1(b)**, chacun est **indifférent**.

**Joueur 1** : $q(2)+(1-q)(0)=q(0)+(1-q)(1)$ ⟹ $2q=1-q$ ⟹ $\boxed{q=\tfrac13}$. **Joueur 2** : $(1-p)(1)+p(0)=(1-p)(0)+p(2)$ ⟹ $1-p=2p$ ⟹ $\boxed{p=\tfrac13}$.

⚠️ **Chaque joueur choisit le logiciel de son collègue avec probabilité $1/3$.** *« Il n'y en a pas d'autres. »*

</details>

<details class="details--riche">
<summary>

**27. Quels sont les trois enseignements de l'exemple 7.1 ?**

</summary>

| # | L'enseignement |
|---|---|
| **1** | Il possède **de multiples équilibres**, certains purs, d'autres non |
| **2** | **L'équilibre mixte est INEFFICACE** : chaque paiement espéré est $2/3$, donc *« chacun serait strictement mieux loti si **l'un OU l'autre** des équilibres purs était joué »* |
| **3** | *« un équilibre en stratégies mixtes est présent **MÊME SI ce n'est pas un jeu dans lequel l'un des joueurs souhaite se comporter de manière imprévisible** »* |

</details>

<details class="details--riche">
<summary>

**28. Quelles sont les deux interprétations d'une stratégie mixte ?**

</summary>

| # | L'interprétation | Quand elle convient |
|---|---|---|
| **1** | **La ROULETTE** — *« des dispositifs physiques réels que les joueurs utilisent pour **randomiser délibérément** »* | jeux à intérêts **OPPOSÉS** *(le duel)* |
| **2** | **Les CROYANCES** — *« une **expression des croyances des AUTRES joueurs** concernant la stratégie pure qu'il choisira. **Dans cette interprétation, aucun joueur ne randomise explicitement.** »* | jeux où les intérêts **COÏNCIDENT** en partie *(fig. 7.6)* |

> *« **Le fait de choisir une interprétation ou l'autre dépend largement du CONTEXTE.** »*

</details>

<details class="details--riche">
<summary>

**29. Énoncer le théorème 7.2 et la stratégie de sa preuve.**

</summary>

**Tout jeu sous forme stratégique FINI possède au moins un équilibre de Nash.**

> *« Nous montrerons qu'un équilibre existe **en démontrant l'existence d'un POINT FIXE d'une fonction dont les points fixes sont NÉCESSAIREMENT des équilibres**. »*

$$\textbf{(1) construire } f \quad\to\quad \textbf{(2) point fixe} \quad\to\quad \textbf{(3) c'est un équilibre}$$

Avec $S_i=\{1,\dots,n\}$ et $M_i=\{(m_{i1},\dots,m_{in})\in\mathbb{R}^n_+ : \sum_j m_{ij}=1\}$ — **non vide, compact, convexe**.

</details>

<details class="details--riche">
<summary>

**30. Écrire la fonction $f$ et expliquer ce qu'elle fait.**

</summary>

$$f_{ij}(m)=\frac{m_{ij}+\max\big(0,\ u_i(j,m_{-i})-u_i(m)\big)}{1+\sum_{j'=1}^{n}\max\big(0,\ u_i(j',m_{-i})-u_i(m)\big)}$$

**Sa lecture** : au numérateur, on **ajoute au poids de $j$ l'EXCÈS de paiement** de la pure $j$ sur la mixte $m_i$ — **s'il est positif** ; au dénominateur, on **renormalise**.

$$\boxed{\;f \textbf{ pousse le poids vers les stratégies qui font MIEUX que la moyenne.}\;}$$

*« Notez que $\sum_j f_{ij}(m)=1$ et $f_{ij}(m)\geq0$, donc **$f(m)\in M$**. »*

</details>

<details class="details--riche">
<summary>

**31. Justifier l'application de Brouwer.**

</summary>

> *« **Parce que le NUMÉRATEUR est continu en $m$, et que le DÉNOMINATEUR est à la fois continu ET BORNÉ LOIN DE ZÉRO (en effet, il n'est JAMAIS inférieur à UN), $f_{ij}$ est CONTINUE.** »*

⚠️ **Pourquoi le dénominateur est $\geq1$** : chaque terme est un $\max(0,\cdot)\geq0$, ajouté à $1$.

> *« $f$ est une fonction **continue** envoyant l'ensemble **non vide, compact et convexe** $M$ **DANS LUI-MÊME**. Nous pouvons donc appliquer le **théorème du point fixe de BROUWER (A1.11)**. »*

</details>

<details class="details--riche">
<summary>

**32. Dérouler le pas 3 de la preuve du théorème 7.2.**

</summary>

Au point fixe, en multipliant en croix et en simplifiant :

$$\hat m_{ij}\sum_{j'}\max\big(0,u_i(j',\hat m_{-i})-u_i(\hat m)\big)=\max\big(0,u_i(j,\hat m_{-i})-u_i(\hat m)\big)$$

**L'astuce** : multiplier par $u_i(j,\hat m_{-i})-u_i(\hat m)$ et **sommer sur $j$**. Le membre de gauche contient

$$\sum_j\hat m_{ij}\big[u_i(j,\hat m_{-i})-u_i(\hat m)\big]=u_i(\hat m)-u_i(\hat m)=0$$

*« où **la première égalité découle de ce que les $m_{ij}$ somment à un** »*. Donc

$$0=\sum_{j}\big[u_i(j,\hat m_{-i})-u_i(\hat m)\big]\max\big(0,u_i(j,\hat m_{-i})-u_i(\hat m)\big)$$

</details>

<details class="details--riche">
<summary>

**33. Conclure la preuve.**

</summary>

> *« **La somme ne peut être nulle que si $u_i(j,\hat m_{-i})-u_i(\hat m)\leq0$ pour tout $j$. (Si elle était $>0$ pour un $j$, le $j$-ième terme serait strictement positif. Parce qu'AUCUN terme n'est négatif, ceci rendrait la somme ENTIÈRE strictement positive.)** »*

**Pourquoi aucun terme n'est négatif** : chaque terme vaut $x\cdot\max(0,x)=\max(0,x)^2\geq0$.

> *« Dès lors, **par la partie (c) du théorème 7.1, $\hat m$ est un équilibre de Nash**. »* $\blacksquare$

</details>

<details class="details--riche">
<summary>

**34. Quelle est la portée du théorème 7.2 ?**

</summary>

> *« **Le théorème 7.2 est tout à fait remarquable.** Peu importe combien de joueurs, **du moment que chacun possède un nombre FINI de stratégies pures, il y aura au moins un équilibre de Nash.** »*

| Portée | Le commentaire |
|---|---|
| **Pratique** | *« la recherche d'un équilibre **ne sera pas VAINE** »* |
| **Conceptuelle** | *« **si les équilibres existaient RAREMENT, ceci indiquerait une INCOHÉRENCE FONDAMENTALE dans la définition. Qu'ils existent TOUJOURS dans les jeux finis est UNE MESURE DE LA SOLIDITÉ DE L'IDÉE.** »* |

</details>

<details class="details--riche">
<summary>

**35. Quelle limitation le §7.2.3 lève-t-il, et comment ?**

</summary>

> *« Nous avons **toujours supposé que chaque joueur est parfaitement informé des paiements de TOUS les autres. Sinon, les joueurs n'auraient pas pu effectuer les calculs nécessaires.** »*

> ⚠️ *« **L'IDÉE est de lui AJOUTER un ingrédient de plus, de sorte qu'elle devienne un JEU SOUS FORME STRATÉGIQUE.** Nous serons alors capables d'appliquer **n'importe laquelle** des méthodes développées. »* — **Harsanyi (1967-1968)**.

</details>

<details class="details--riche">
<summary>

**36. Qu'est-ce qu'un type, et de quoi dépend le paiement ?**

</summary>

*« Pour chaque joueur $i$, un ensemble **FINI $T_i$ de « TYPES » possibles** que ce joueur pourrait être. »*

$$u_i:\ S\times T\to\mathbb{R}, \qquad T=\prod_i T_i$$

⚠️ **Le paiement dépend du profil de stratégies, de SON type ET des types des AUTRES.**

**Pourquoi** : *« dans l'enchère de parcelles offshore, **le paiement d'un enchérisseur dépendra de la probabilité que la parcelle contienne du pétrole, quelque chose sur quoi d'AUTRES enchérisseurs peuvent avoir de l'information** »*.

</details>

<details class="details--riche">
<summary>

**37. Qu'est-ce qu'un a priori commun, et quelles sont ses deux lectures ?**

</summary>

Les croyances $p_i(t_{-i}\mid t_i)$ viennent d'une distribution unique $p$ sur $T$ par la **règle de Bayes** :

$$p_i(t_{-i}\mid t_i)=\frac{p(t_i,t_{-i})}{\sum_{t'_{-i}}p(t_i,t'_{-i})}$$

| # | La lecture |
|---|---|
| **1** | *« une distribution **empirique OBJECTIVE**, **confirmée par de nombreuses observations passées** »* |
| **2** | *« **les différences de croyances ne proviennent QUE de différences d'INFORMATION** : avant que les joueurs connaissent leur type — **position informationnellement SYMÉTRIQUE** — leurs croyances doivent être **identiques et égales à $p$** »* |

</details>

<details class="details--riche">
<summary>

**38. Le livre impose-t-il l'a priori commun ?**

</summary>

> *« **NON. Notre capacité à analyser une situation d'information incomplète NE REQUERRA PAS l'hypothèse d'a priori commun.** »*

> *« Ainsi, **nous permettons des situations dans lesquelles un certain type du joueur 1 assigne la probabilité ZÉRO à un type du joueur 3 qui reçoit toujours une probabilité POSITIVE du joueur 2** »*.

*(L'**exercice 7.20** demande de montrer que **cela est impossible avec un a priori commun**.)*

</details>

<details class="details--riche">
<summary>

**39. Énoncer la définition 7.10.**

</summary>

Un **jeu d'information incomplète (jeu BAYÉSIEN)** est $G=(p_i,T_i,S_i,u_i)_{i=1}^{N}$ où, pour chaque $i$ : $T_i$ est **fini**, $u_i:S\times T\to\mathbb{R}$, et pour chaque $t_i$, $p_i(\cdot\mid t_i)$ est une **distribution de probabilité sur $T_{-i}$**.

Il est **FINI** si de plus chaque $S_i$ est fini.

</details>

<details class="details--riche">
<summary>

**40. Comment construit-on $G^+$ ?**

</summary>

$$\boxed{\;\textbf{CHAQUE TYPE de chaque joueur devient UN JOUEUR SÉPARÉ.}\;}$$

- **Les joueurs** : $T_1\cup\cdots\cup T_N$ ; le joueur $t_i$ a pour stratégies pures **$S_i$**.
- **Les stratégies jointes** : $S^+=S_1^{T_1}\times\cdots\times S_N^{T_N}$.
- **Les paiements** :

$$v_{t_i}(s^+)=\sum_{t_{-i}\in T_{-i}}p_i(t_{-i}\mid t_i)\ u_i\big(s_1(t_1),\dots,s_N(t_N),t_1,\dots,t_N\big)$$

*(Note de bas de page : les $T_i$ sont supposés **disjoints**, ce qui est **sans perte de généralité** — on peut les définir comme des sous-ensembles d'entiers avec $t_i<t_j$ si $i<j$.)*

</details>

<details class="details--riche">
<summary>

**41. Pourquoi la formule de paiement de $G^+$ capture-t-elle bien la situation ?**

</summary>

| Le morceau | Ce qu'il capture |
|---|---|
| $p_i(t_{-i}\mid t_i)$ | *« **le joueur $i$ est INCERTAIN des types des autres** — il l'utilise pour évaluer leur probabilité »* |
| $s_j(t_j)$ | *« **le comportement des autres joueurs peut DÉPENDRE DE LEURS TYPES** »* |

> *« En associant $G^+$ à $G$, **nous avons RÉDUIT l'étude des jeux d'information INCOMPLÈTE à l'étude des jeux d'information COMPLÈTE**. »*

</details>

<details class="details--riche">
<summary>

**42. Énoncer les définitions 7.11-7.12 et le théorème 7.3.**

</summary>

**DÉF. 7.11** : $G^+$ est **le jeu sous forme stratégique associé** à $G$. **DÉF. 7.12** : un **équilibre bayésien-nashien** est **un équilibre de Nash de $G^+$**. **THÉORÈME 7.3** : **tout jeu FINI d'information incomplète en possède au moins un**.

**La preuve, en trois lignes** : *« il suffit de montrer que $G^+$ possède un équilibre de Nash. **Parce que le jeu associé à un jeu FINI est LUI-MÊME FINI**, on applique le **théorème 7.2**. »* $\blacksquare$

⚠️ **Tout le bénéfice de la construction** : un théorème d'existence entièrement nouveau, **gratuitement**.

</details>

<details class="details--riche">
<summary>

**43. Décrire l'exemple 7.2 et la manière de « voir » la construction.**

</summary>

Deux firmes en concurrence **à la Bertrand** ; **le coût marginal de 1 est connu**, celui de 2 est **élevé ou faible, équiprobables**. Firme 1 : **un type** ; firme 2 : **deux types**.

> ⚠️ *« **Imaginez qu'il y a en fait TROIS firmes** : la firme 1, la firme 2 à coût élevé, et la firme 2 à coût faible. **Imaginez que chacune doit SIMULTANÉMENT choisir un prix** et que la firme 1 croit que **chacune des firmes 2 est également susceptible d'être son unique concurrent**. »*

> *« **Un peu de réflexion vous convaincra que cette manière de voir capture MAGNIFIQUEMENT tous les traits stratégiques pertinents** : la firme 1 choisit **sans savoir** le type du concurrent, et **comprend que son prix peut différer selon ses coûts**. »*

</details>

<details class="details--riche">
<summary>

**44. Quelle convention de partage l'exemple 7.3 stipule-t-il, et pourquoi ?**

</summary>

| Le cas | Le partage |
|---|---|
| Les coûts des **deux** firmes sont **strictement sous** le prix commun | **partage égal** |
| Sinon | **la firme 1 prend tout** |

**La justification** : *« si le prix commun est au-dessus du coût de la **seule** firme 1, **la firme 1 pourrait capturer le marché entier en BAISSANT LÉGÈREMENT son prix** […] **alors que la firme 2 ne baisserait PAS le sien parce que cela entraînerait des PERTES** »*.

</details>

<details class="details--riche">
<summary>

**45. Comment obtient-on les paiements du jeu associé (figure 7.8) ?**

</summary>

**Pour $2_\ell$ et $2_h$** : *« **en les LISANT SIMPLEMENT** sur les matrices de la figure 7.7. **C'est parce qu'il n'y a qu'UN SEUL type de firme 1.** »* — leur paiement est le même **quel que soit** le prix de l'autre type.

**Pour la firme 1** : par **ESPÉRANCE**. Exemple travaillé avec $p_1=4$, $p_\ell=1$, $p_h=6$ :

| Coût de 2 | Paiement de 1 |
|---|---|
| faible | $0$ |
| élevé | $16$ |

$$\tfrac12(0)+\tfrac12(16)=\boxed{8}$$

</details>

<details class="details--riche">
<summary>

**46. Résoudre l'exemple 7.3 et en tirer la leçon économique.**

</summary>

| Firme | Stratégie | Statut |
|---|---|---|
| $2_\ell$ | prix $4$ | **faiblement dominante** |
| $2_h$ | prix $6$ | **faiblement dominante** |
| $1$ | prix $4$ | **strictement dominante** *une fois les autres éliminées* |

**La vérification pour 1**, avec $p_\ell=4$, $p_h=6$ : $p_1=6\Rightarrow3$ · $p_1=4\Rightarrow\boxed{12}$ · $p_1=1\Rightarrow7$.

⟹ *« **deux des trois firmes choisissent un prix de 4 tandis que la troisième choisit 6** »*.

⚠️ **La leçon** : *« **en contraste avec Bertrand en information COMPLÈTE, les profits NE SONT PAS ramenés à zéro. Seule la firme 2 à coût élevé gagne un profit nul.** »*

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La définition de la théorie des jeux ? | L'étude de **comment des agents rationnels se comportent dans des jeux** |
| Sa « marque » ? | **LA CIRCULARITÉ** — chacun doit connaître l'autre pour décider |
| Les six concepts de solution du chapitre ? | dominance · **Nash** · **Bayes-Nash** · induction à rebours · perfection en sous-jeux · équilibre séquentiel |
| Ce qui distingue le non stratégique ? | Les décisions se prennent **« en ISOLEMENT »** |
| Deux modèles stratégiques déjà vus ? | **Cournot** et **Bertrand** *(chapitre 4)* |
| Les deux lancers du duel ? | Balle rapide ($F$) et courbe ($C$) |
| Qui gagne dans le duel ? | Le **batteur** s'il **devine** le lancer ; sinon le lanceur |
| Pourquoi « toujours la rapide » échoue ? | Le batteur **s'y prépare et la frappe** |
| La structure de l'argument d'imprévisibilité ? | Par l'**absurde** : prévisible ⟹ contradiction |
| L'analogie du livre ? | *« un aspect essentiel du **BLUFF réussi** au poker »* |
| Sa limite ? | *« Quand vous êtes **seul**, il n'y a **personne à tromper** »* |
| Définition 7.1 ? | $G=(S_i,u_i)_{i=1}^N$ avec $u_i:\prod_j S_j\to\mathbb{R}$ |
| Ce qui rend $G$ **fini** ? | Chaque $S_i$ contient **finiment** d'éléments |
| Ce que signifie $-i$ ? | **Tous les joueurs SAUF $i$** |
| Définition 7.2 ? | $\hat s_i$ **strictement DOMINANTE** : bat **toutes** les autres, pour tout $s_{-i}$ |
| Sa fréquence ? | *« **plutôt RARE** »* |
| Définition 7.3 ? | $\hat s_i$ domine strictement $\bar s_i$ : $u_i(\hat s_i,s_{-i})>u_i(\bar s_i,s_{-i})$ pour tout $s_{-i}$ |
| La différence entre les deux ? | **Une contre TOUTES** vs **une contre UNE** |
| Le résultat de la fig. 7.2 ? | $(U,L)$, paiements $(3,0)$ |
| Ce que 1 n'a pas à faire dans la fig. 7.2 ? | **Raisonner** — son meilleur choix est **indépendant** de 2 |
| Ce qu'on élimine dans la fig. 7.3 ? | $C$ *(pour 1)* et $M$ *(pour 2)* |
| Le fait qui force l'itération ? | **La dominance CRÉE de la dominance** |
| L'exemple précis ? | $R$ n'est pas dominée dans l'original, mais l'est **une fois $D$ éliminée** |
| Définition 7.4 ? | $s_i\in S_i^n$ **pour tout $n\geq1$** |
| Définition 7.5 ? | $\geq$ partout, **avec au moins une STRICTE** |
| Ce que montre la figure 7.4 ? | La stricte n'élimine **rien** ; la faible isole $(U,L)$ |
| La relation entre les deux procédures ? | $\bigcap_n W_i^n\subseteq\bigcap_n S_i^n$ |
| Pour laquelle l'ORDRE compte ? | Pour la **FAIBLE** *(ex. 7.3(a))* — pas la stricte |
| La règle de « devine la moyenne » ? | Le plus proche du **tiers de la moyenne** gagne 100 \$ |
| Pourquoi 33 domine faiblement ? | Le tiers de la moyenne est **au plus $33\tfrac13$** |
| Le cas où c'est **strict** ? | *« si **tous les autres choisissent 34** »* |
| La suite des tours ? | $100\to33\to11\to\dots\to\boxed{1}$ |
| Combien de tours pour la dominance **stricte** ? | **99** *(ex. 7.5(d))* |
| 99 est-elle strictement dominée ? | **NON** *(ex. 7.5(c))* |
| Pourquoi la dominance ne résout pas le duel ? | **Aucune** stratégie n'y est dominée, ni strictement ni faiblement |
| L'analogie qui motive Nash ? | L'**équilibre de marché** — *« aucune tendance à changer »* |
| Définition 7.7 ? | $u_i(\hat s)\geq u_i(s_i,\hat s_{-i})$ pour tout $s_i$ |
| L'idée informelle ? | *« **pleinement conscient** du comportement des autres, **aucune incitation à changer** »* |
| Le duel a-t-il un équilibre pur ? | **AUCUN** |
| Pourquoi c'était prévisible ? | Un équilibre pur rend les choix **PARFAITEMENT PRÉVISIBLES** |
| Définition 7.8 ? | $m_i:S_i\to[0,1]$ avec $\sum_{s_i}m_i(s_i)=1$ |
| L'image du livre ? | Une **ROULETTE** portant les noms des stratégies pures |
| Les mixtes donnent-elles plus de choix ? | **Strictement plus** — les pures sont les **dégénérées** |
| La formule de $u_i(m)$ ? | $\sum_{s\in S}m_1(s_1)\cdots m_N(s_N)u_i(s)$ |
| Pourquoi un **produit** ? | Parce que les joueurs choisissent **INDÉPENDAMMENT** |
| Définition 7.9 ? | $u_i(\hat m)\geq u_i(m_i,\hat m_{-i})$ pour toute $m_i\in M_i$ |
| Le problème que résout le thm 7.1 ? | Il faudrait sinon tester **tout l'ensemble INFINI** $M_i$ |
| Ce qu'il exploite ? | La **LINÉARITÉ** de $u_i$ en $m_i$ |
| L'énoncé (b) ? | **Égalité** sur le support, **$\geq$** hors du support |
| L'énoncé (c) ? | Il suffit de tester **les stratégies PURES** |
| Lequel sert à CALCULER ? | **(b)** — l'**indifférence** |
| Lequel sert à VÉRIFIER ? | **(c)** |
| Le pas clé de (a)⟹(b) ? | $u_i(\hat m)$ est une **combinaison convexe STRICTE** des paiements du support |
| Le pas clé de (c)⟹(a) ? | $u_i(m_i,\hat m_{-i})$ est une **combinaison convexe** des mêmes nombres |
| Les paiements de l'exemple 7.1 ? | $0$ *(échec)* · $2$ *(son propre logiciel)* · $1$ *(celui de l'autre)* |
| Ses équilibres purs ? | $(WP,WP)$ et $(MW,MW)$ |
| L'équation d'indifférence de 1 ? | $2q=1-q$ |
| Celle de 2 ? | $1-p=2p$ |
| Le résultat ? | $p=q=\boxed{1/3}$ |
| Le paiement dans l'équilibre mixte ? | $2/3$ — **INEFFICACE** |
| Le troisième enseignement ? | Un équilibre mixte existe **même sans désir d'imprévisibilité** |
| Interprétation n°1 des mixtes ? | La **ROULETTE** — randomisation **délibérée** |
| Interprétation n°2 ? | Les **CROYANCES** des autres — personne ne randomise |
| Quand la n°1 convient ? | Intérêts **OPPOSÉS** *(le duel)* |
| Quand la n°2 ? | Intérêts qui **coïncident** en partie |
| Théorème 7.2 ? | **Tout jeu FINI possède au moins un équilibre de Nash** |
| Son auteur ? | **Nash (1951)** |
| Les trois pas de sa preuve ? | Construire $f$ · **BROUWER** · le point fixe est un équilibre |
| Ce que fait $f$ ? | Elle **pousse le poids vers ce qui fait mieux que la moyenne** |
| Pourquoi le dénominateur ne s'annule pas ? | Il n'est **jamais inférieur à UN** |
| Les trois propriétés de $M$ ? | **Non vide**, **compact**, **convexe** |
| Le numéro du théorème de Brouwer ? | **A1.11** |
| L'astuce du pas 3 ? | Multiplier par $u_i(j,\hat m_{-i})-u_i(\hat m)$ et **sommer sur $j$** |
| Pourquoi le membre de gauche est nul ? | Les $\hat m_{ij}$ **somment à 1** ⟹ $u_i(\hat m)-u_i(\hat m)=0$ |
| Pourquoi chaque terme de droite est $\geq0$ ? | $x\cdot\max(0,x)=\max(0,x)^2$ |
| Ce qui conclut ? | Le **théorème 7.1(c)** |
| La portée conceptuelle du thm 7.2 ? | *« **une mesure de la SOLIDITÉ de l'idée** »* |
| La limitation levée par le §7.2.3 ? | On supposait chacun **parfaitement informé** des paiements des autres |
| L'auteur de l'idée ? | **Harsanyi (1967-1968)** |
| L'idée en une phrase ? | **Ajouter un ingrédient** pour en refaire un jeu sous forme stratégique |
| Ce qu'est un **type** ? | Un élément de l'ensemble **fini** $T_i$ |
| De quoi dépend $u_i$ ? | De $S$ **ET de TOUS les types** — $u_i:S\times T\to\mathbb{R}$ |
| L'exemple qui le justifie ? | L'**enchère pétrolière** — l'info des autres affecte mon paiement |
| Ce qu'est une croyance ? | $p_i(t_{-i}\mid t_i)$, une distribution sur $T_{-i}$ |
| L'a priori commun ? | Tous les $p_i$ dérivés d'un **$p$ unique** par **Bayes** |
| Sa lecture n°1 ? | Une distribution **empirique objective** |
| Sa lecture n°2 ? | Les différences de croyances viennent **uniquement de l'information** |
| Le livre l'impose-t-il ? | **NON** |
| Ce qui devient impossible avec lui ? | Deux joueurs en **désaccord sur le support** d'un troisième *(ex. 7.20)* |
| Définition 7.10 ? | $G=(p_i,T_i,S_i,u_i)_{i=1}^N$ — un **jeu bayésien** |
| Le principe de $G^+$ ? | **Chaque TYPE devient un JOUEUR** |
| Les stratégies du joueur $t_i$ ? | **$S_i$** — celles de son joueur d'origine |
| La formule de $v_{t_i}$ ? | $\sum_{t_{-i}}p_i(t_{-i}\mid t_i)\,u_i\big(s_1(t_1),\dots,s_N(t_N),t\big)$ |
| Ce que capture $p_i(t_{-i}\mid t_i)$ ? | L'**incertitude** de $i$ sur les types des autres |
| Ce que capture $s_j(t_j)$ ? | Que **le comportement des autres dépend de leurs types** |
| Définition 7.12 ? | Un **équilibre de Nash de $G^+$** |
| Théorème 7.3 ? | Tout jeu bayésien **fini** possède un équilibre bayésien-nashien |
| Sa preuve ? | **Trois lignes** — $G^+$ est fini, donc **théorème 7.2** |
| Les trois joueurs de l'exemple 7.3 ? | $1$, $2_\ell$ *(coût faible)*, $2_h$ *(coût élevé)* |
| Les coûts ? | $0$ pour 1 ; $1$ ou $4$ pour 2, **équiprobables** |
| La demande ? | $8-p$ au **prix le plus bas** |
| Les prix admissibles ? | $\{1,\ 4,\ 6\}$ |
| La convention de partage ? | Égal si **les deux** coûts sont sous le prix ; **sinon 1 prend tout** |
| Comment lit-on les paiements de $2_\ell$, $2_h$ ? | **Directement** — la firme 1 n'a **qu'un type** |
| Comment calcule-t-on ceux de 1 ? | Par **ESPÉRANCE** — ex. $\tfrac12(0)+\tfrac12(16)=8$ |
| Les stratégies faiblement dominantes ? | $p_\ell=4$ et $p_h=6$ |
| Celle de la firme 1 ensuite ? | $p_1=4$, **strictement dominante** *(3, 12, 7)* |
| La leçon économique ? | **Les profits ne sont PAS ramenés à zéro** — seule $2_h$ gagne zéro |
