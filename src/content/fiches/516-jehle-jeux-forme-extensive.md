# Fiche 516 — Les jeux sous forme extensive : induction à rebours, perfection en sous-jeux et équilibre séquentiel

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 7 « Game Theory », §7.3 « Extensive Form Games » (p. 325-364) |
| **Difficulté** | Avancé — la section la plus technique du chapitre |
| **Temps d'étude estimé** | 155 min |
| **Prérequis** | Fiche 515 (jeu sous forme stratégique, équilibre de Nash, stratégies mixtes, théorèmes 7.1 et 7.2) · notions de partition et de suite convergente · règle de Bayes |
| **Concepts clés** | Jeu sous forme extensive, nœud, histoire, ensemble d'information, arbre de jeu, information parfaite et imparfaite, stratégie de forme extensive, forme stratégique de $\Gamma$, induction à rebours, menace non crédible, sous-jeu, équilibre parfait en sous-jeux, stratégie comportementale, mémoire parfaite, système de croyances, évaluation, cohérence, règle de Bayes, indépendance, croyances communes, rationalité séquentielle, équilibre séquentiel |
| **Poids à l'examen** | La **définition 7.13** et le rôle de chacun de ses huit éléments · l'analyse de **take-away** *(positions perdantes)* · la **définition 7.14** et le contre-exemple des échecs · le **théorème 7.4 (Kuhn)** et sa preuve · la **menace non crédible** de l'entrant-incumbent · les **définitions 7.16-7.17** et la preuve du **théorème 7.5** · **mixte vs comportementale** et la **mémoire parfaite** · les **trois principes** sur les croyances et la **définition 7.20** · les **définitions 7.21-7.22** et l'exemple 7.7. |

## 🎯 Vue d'ensemble

```
LE FIL DU §7.3 : le temps entre dans le jeu

  §7.3    LA FORME EXTENSIVE

     Deux exemples fondateurs :
        TAKE-AWAY   21 pieces, on en retire 1, 2 ou 3, qui prend
                    la derniere PERD -> INFORMATION PARFAITE
        LA VOITURE D'OCCASION : le vendeur REPARE ou non, puis
                    fixe un PRIX ; l'acheteur voit le PRIX
                    mais PAS la reparation -> INFO IMPARFAITE

     DEF. 7.13  huit elements : N, A, X, chance (pi), E, iota, I, u_i

  §7.3.1  L'ARBRE DE JEU
     ensembles d'information = ELLIPSES en pointilles
     tous SINGLETONS  ->  INFORMATION PARFAITE
     sinon             ->  information IMPARFAITE

  §7.3.2  TAKE-AWAY, INFORMELLEMENT
     positions PERDANTES : 1, 5, 9, 13, 17, 21
     -> avec 21 pieces, le SECOND joueur gagne TOUJOURS
     La technique : partir de LA FIN  ->  INDUCTION A REBOURS

  §7.3.3  DEF. 7.14  une STRATEGIE = une fonction s_i : I_i -> A
     « une description COMPLETE de la facon de jouer »
     l'exemple des ECHECS : il faut repondre a TOUTE ouverture

  §7.3.4  la FORME STRATEGIQUE de Gamma  ->  on peut appliquer
          TOUS les concepts du §7.2

  §7.3.5  INFORMATION PARFAITE et INDUCTION A REBOURS
     l'ENTRANT et l'INCUMBENT :
        equilibre par induction : ENTRER / ACQUIESCER
        MAIS il existe un AUTRE equilibre de Nash :
        RESTER DEHORS / COMBATTRE  ->  MENACE NON CREDIBLE

     DEF. 7.15  strategies d'INDUCTION A REBOURS
     THEOREME 7.4 (KUHN)  toute telle strategie est un NASH
     COROLLAIRE 7.1  tout jeu fini a info PARFAITE a un
                     equilibre de Nash en STRATEGIES PURES

  §7.3.6  SOUS-JEUX et PERFECTION EN SOUS-JEUX  (Selten 1965, 1975)
     DEF. 7.16  un SOUS-JEU : I(x) = {x} et tout l'ensemble
                d'information de tout suiveur suit x
     DEF. 7.17  s induit un NASH dans TOUT sous-jeu
     THEOREME 7.5  en info parfaite, PERFECTION = INDUCTION A REBOURS

     MIXTE vs COMPORTEMENTALE :
        mixte          = randomiser UNE FOIS, au depart
        comportementale = randomiser A CHAQUE TOUR
        DEF. 7.18  MEMOIRE PARFAITE  ->  les deux sont EQUIVALENTES

     DEF. 7.19 + THEOREME 7.6 (SELTEN)  existence en comportementales

  §7.3.7  L'EQUILIBRE SEQUENTIEL  (Kreps et Wilson 1982)

     Le probleme (fig. 7.27) : la perfection en sous-jeux NE
     DISCIPLINE PAS le comportement sur un ensemble d'information
     NON ATTEINT qui n'est pas un singleton.

     La solution : donner des CROYANCES p(x) aux joueurs.
     Une EVALUATION = un couple (p, b).

     LES TROIS PRINCIPES sur les croyances :
        (1) BAYES quand c'est possible
        (2) INDEPENDANCE
        (3) CROYANCES COMMUNES

     DEF. 7.20  COHERENCE : limite de strategies COMPLETEMENT MIXTES
     DEF. 7.21  RATIONALITE SEQUENTIELLE : optimal a CHAQUE
                ensemble d'information -- meme NON ATTEINT
     DEF. 7.22  EQUILIBRE SEQUENTIEL = COHERENT + SEQ. RATIONNEL

     THEOREME 7.7 (KREPS-WILSON)  existence, et tout equilibre
     sequentiel est PARFAIT EN SOUS-JEUX
```

> ⚠️ **Note de transcription — identique aux fiches 500-515.** Le PDF de cette section perd le **barré du $\neq$**, le symbole $\notin$ *(qui s'exporte « $\in/$ »)*, $\sum$, $\times$ et $\Gamma$ *(dont il ne reste souvent rien — ainsi « le jeu » désigne $\Gamma$, et « $\Gamma_x$ » s'exporte « $x$ »)*. Les étiquettes des figures utilisent l'encodage Symbol Mac (`Ϫ` = « − », `Ј` = « ′ », `Љ` = « ″ », `␣` = $\alpha$, `␤` = $\beta$, `␥` = $\gamma$). Les nombres des arbres sont **redistribués en colonnes** par l'extracteur ; les valeurs citées ici sont celles que **la prose du livre nomme explicitement**. Ces éléments sont rétablis depuis la prose voisine — **il s'agit d'une réparation de transcription, non d'un ajout de contenu**.

## 🔴 Concept 1 — Pourquoi la forme extensive

### 1.1 L'annonce

> *« Jusqu'ici, nous n'avons considéré que des cadres stratégiques dans lesquels **les joueurs doivent choisir leurs stratégies SIMULTANÉMENT**. Nous amenons maintenant **la DYNAMIQUE explicitement dans le tableau**, et considérons des situations dans lesquelles **les joueurs peuvent faire des choix EN SÉQUENCE**. »*

### 1.2 Le jeu de « take-away » (le retrait)

> *« Dans le jeu de « **take-away** », il y a **21 pièces** sur une table. Vous et votre adversaire les **retirez ALTERNATIVEMENT**. La seule stipulation est qu'**à chaque tour, une, deux ou trois pièces doivent être retirées. Il n'est pas possible de passer.** **La personne qui retire la DERNIÈRE pièce PERD.** »*

> *« **Quelle est la manière OPTIMALE de jouer, et si les deux joueurs jouent optimalement, QUI gagne ?** Nous découvrirons finalement les réponses aux deux questions. »*

> *« Notez que dans take-away, **les joueurs jouent en séquence, avec pleine connaissance des choix faits dans le passé**. Par conséquent, **notre modèle de jeu sous forme stratégique — dans lequel les joueurs choisissent simultanément, dans l'IGNORANCE des choix des autres — ne semble PAS fournir un cadre adéquat**. »*

### 🔴 1.3 Le second exemple : la voiture d'occasion

> *« Dans beaucoup de jeux de société, les joueurs jouent à tour de rôle et sont **parfaitement informés de tous les choix précédents**. Mais dans d'autres jeux — de société et économiques — **un joueur peut ne PAS avoir une connaissance parfaite de chaque coup passé**. »*

> *« Considérez une situation dans laquelle **un acheteur souhaite acquérir une voiture d'occasion**. **Le vendeur a le choix de la RÉPARER ou non.** Après avoir décidé, **il choisit le PRIX** de la voiture. Ensuite, **il informe l'acheteur du prix. Cependant, l'acheteur n'a AUCUN moyen de savoir si les réparations ont été entreprises.** »*

> *(Note de bas de page 4.)* *« Ceci suppose qu'il est **impossible pour le vendeur de PROUVER** que la voiture a été réparée. **En pratique, ce n'est pas si loin de la vérité.** **Des prix plus élevés sont-ils un SIGNAL que la voiture a été réparée ? Si oui, comment un vendeur peu scrupuleux se comporterait-il ?** »*

⚠️ **C'est l'annonce du chapitre 8** *(asymétries d'information, fiches 517-518)*.

## 🔴 Concept 2 — La définition 7.13 : les huit éléments

### 2.1 Les éléments, informellement

> *« Informellement, les éléments d'un jeu sous forme extensive sont **(i) les JOUEURS ; (ii) la NATURE (ou le hasard) ; (iii) les « RÈGLES » du jeu, y compris l'ORDRE de jeu et l'INFORMATION que chaque joueur possède sur les coups précédents des autres quand c'est à lui de jouer ; et (iv) les PAIEMENTS**. »*

### 2.2 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.13 — Jeu sous forme extensive</span>

Un jeu sous forme extensive, noté $\Gamma$, est composé des éléments suivants.

**1.** Un ensemble **fini** de joueurs, $N$.

**2.** Un ensemble d'**actions**, $A$, qui inclut toutes les actions qui pourraient potentiellement être prises à un moment du jeu. **$A$ n'a PAS besoin d'être fini.**

**3.** Un ensemble de **nœuds**, ou **histoires**, $X$, où : **(i)** $X$ contient un élément distingué $x_0$, le **nœud initial** ou **histoire vide** ; **(ii)** chaque $x\in X\setminus\{x_0\}$ prend la forme $x=(a_1,a_2,\dots,a_k)$ pour un nombre fini d'actions $a_i\in A$ ; **(iii)** si $(a_1,\dots,a_k)\in X\setminus\{x_0\}$ pour $k>1$, alors $(a_1,\dots,a_{k-1})\in X\setminus\{x_0\}$.

*« Un nœud, ou histoire, est alors **simplement une description COMPLÈTE des actions qui ont été prises jusqu'ici** dans le jeu. »* On pose

$$A(x)\equiv\{a\in A\mid(x,a)\in X\}$$

**4.** Un ensemble $A(x_0)\subseteq A$ et une **distribution de probabilité $\pi$** sur $A(x_0)$ pour décrire le rôle du hasard. **Le hasard joue TOUJOURS EN PREMIER, et UNE SEULE FOIS.**

**5.** Un ensemble de **nœuds terminaux** $E\equiv\{x\in X\mid(x,a)\notin X \text{ pour tout } a\in A\}$. *« Chaque nœud terminal décrit **une partie complète particulière du jeu, du début à la fin**. »*

**6.** Une fonction $\iota:X\setminus(E\cup\{x_0\})\to N$ qui indique **à qui c'est le tour** à chaque nœud de décision. On pose $X_i\equiv\{x\mid\iota(x)=i\}$.

**7.** Une **partition** $\mathcal{I}$ de $X\setminus(E\cup\{x_0\})$ telle que si $x$ et $x'$ sont dans le **même élément** de la partition, alors **(i)** $\iota(x)=\iota(x')$ et **(ii)** $A(x)=A(x')$. Les éléments sont les **ENSEMBLES D'INFORMATION** ; celui contenant $x$ est noté $I(x)$. On pose $\mathcal{I}_i\equiv\{I(x)\mid\iota(x)=i\}$.

**8.** Pour chaque $i\in N$, une fonction de paiement **de von Neumann-Morgenstern** $u_i:E\to\mathbb{R}$.

$$\Gamma=\big\langle N,\ A,\ X,\ E,\ \iota,\ \pi,\ \mathcal{I},\ (u_i)_{i\in N}\big\rangle$$

Si $A$ et $X$ sont **finis**, $\Gamma$ est un **jeu fini sous forme extensive**.

</div>

### 🔴 2.3 Ce que l'ensemble d'information signifie

> *« Quand le nœud $x$ est atteint dans le jeu, **le joueur $\iota(x)$ doit prendre une action après avoir été informé que l'histoire de jeu est L'UN DES ÉLÉMENTS de $I(x)$**. Ainsi, **$I(x)$ décrit l'INFORMATION disponible pour le joueur $\iota(x)$**. »*

**Le rôle des deux conditions de la partition :**

| Condition | Ce qu'elle garantit |
|---|---|
| **(i)** $\iota(x)=\iota(x')$ | *« le joueur **ne peut pas distinguer** entre les histoires de $I(x)$ **selon que c'est ou non son tour de jouer** »* |
| **(ii)** $A(x)=A(x')$ | *« … ni **selon l'ensemble des actions disponibles** »* |

⚠️ **Sans ces deux conditions, l'ensemble d'information révélerait de l'information par sa seule structure.**

### 2.4 La note du livre sur le hasard qui ne joue qu'une fois

> *« **Permettre au hasard un seul coup au début du jeu pourrait paraître RESTRICTIF. Ça ne l'est pas.** Considérez, par exemple, le jeu de société **MONOPOLY**. Supposons que dans une partie typique de 2 heures, **les dés ne sont pas lancés plus d'une fois toutes les 5 secondes**. Une borne supérieure prudente est donc de **2000 lancers**. »*

> *« **Nous pourrions alors tout aussi bien jouer au Monopoly en faisant lancer les dés par un ARBITRE qui choisirait SECRÈTEMENT 2000 nombres entre 1 et 12 AU DÉBUT du jeu, puis les révélerait UN À LA FOIS au fur et à mesure. De cette manière, c'est SANS PERTE DE GÉNÉRALITÉ que le hasard peut être supposé jouer exactement une fois au début.** »*

### 2.5 L'invitation du livre

> *« **Certes, cette définition paraît assez complexe, mais relisez-la deux ou trois fois. Vous commencerez bientôt à apprécier à quel point elle est remarquablement COMPACTE, surtout quand vous réaliserez que virtuellement CHAQUE jeu de société jamais joué — sans parler d'une pléthore d'applications en sciences sociales — est couvert par elle !** »*

## 🔴 Concept 3 — Les exemples 7.4 et 7.5

### 3.1 Take-away formalisé (exemple 7.4)

| L'élément | Sa valeur |
|---|---|
| $N$ | $\{1,2\}$ |
| $A$ | $\{\bar a,\ r_1,\ r_2,\ r_3\}$ où $r_k$ = **retirer $k$ pièces** |
| $A(x_0)$ | $\{\bar a\}$ — *« pour modéliser formellement que **le hasard ne joue aucun rôle** »*, on lui donne **une seule** action |

**Un nœud typique** : $\bar x=(\bar a,r_1,r_2,r_1,r_3,r_3)$.

> *« Ceci indiquerait que jusqu'à ce point, les nombres de pièces retirées alternativement furent 1, 2, 1, 3 et 3. Par conséquent, **il reste 11 pièces et c'est le tour du joueur 2** (parce que le joueur 1 retire la première pièce). Ainsi $\iota(\bar x)=2$. »*

⚠️ **L'information parfaite** : *« parce que **chaque joueur est pleinement informé de tous les coups passés**, $I(x)=\{x\}$ pour tout $x\in X$ »*.

**Deux nœuds terminaux** :

$$e_1=(\bar a,r_1,r_2,r_1,r_3,r_3,r_3,r_3,r_3,r_2) \qquad e_2=(\bar a,r_3,r_3,r_3,r_3,r_3,r_3,r_2,r_1)$$

> *« parce que **chacun indique que les 21 pièces ont été retirées**. Le premier indique une **victoire pour le joueur 2** (parce que le joueur 1 a retiré les deux dernières pièces), et le second une **victoire pour le joueur 1**. »*

$$u_1(e_1)=u_2(e_2)=-1 \qquad\qquad u_1(e_2)=u_2(e_1)=1$$

### 3.2 La voiture d'occasion formalisée (exemple 7.5)

| L'élément | Sa valeur |
|---|---|
| $N$ | $\{S,B\}$ — vendeur *(seller)* et acheteur *(buyer)* |
| $A$ | $\{$**réparer**, **ne pas réparer**, **prix élevé**, **prix bas**, **accepter**, **refuser**$\}$ |
| Le hasard | *« ne jouant aucun rôle, **plutôt que de lui donner une seule action, nous ÉLIMINONS simplement le hasard** »* |

**Le nœud décisif** : $x=(\text{réparer},\ \text{prix élevé})$, avec $\iota(x)=B$.

> ⚠️ *« Parce qu'à ce nœud **l'acheteur est informé du PRIX choisi par le vendeur, mais PAS de sa décision de RÉPARATION** : »*

$$I(x)=\big\{(\text{réparer},\text{prix élevé}),\ (\text{ne pas réparer},\text{prix élevé})\big\}$$

> *« C'est-à-dire que **quand le nœud $x$ est atteint, l'acheteur est informé seulement que l'UNE des deux histoires de $I(x)$ est survenue ; il n'est PAS informé de laquelle.** »*

## 🔴 Concept 4 — §7.3.1 : l'arbre de jeu et la distinction information parfaite / imparfaite

### 4.1 Les conventions de dessin

> **La figure 7.9 — l'arbre d'une version à QUATRE pièces de take-away.**

| L'objet graphique | Ce qu'il représente |
|---|---|
| Les **petits cercles noircis** | les **nœuds** |
| Les **lignes** qui les joignent | les **actions** prises |
| Le **label** de chaque nœud de décision | **à qui c'est le tour** |
| Le nœud initial étiqueté **$C$** | *« indiquant que le jeu commence par un coup du **hasard** »* |
| Le **vecteur** après chaque nœud terminal | les **paiements**, la $i$-ième entrée étant celle du joueur $i$ |

> ⚠️ *« Parce que le hasard ne joue en fait aucun rôle ici, **nous aurions pu simplifier le diagramme en L'ÉLIMINANT complètement. Désormais nous suivrons cette convention chaque fois que le hasard ne joue aucun rôle.** »*

### 4.2 Les ensembles d'information sur le dessin

> **La figure 7.10 — le jeu acheteur-vendeur**, *« mais les paiements ont été laissés non spécifiés »*.

> *« Le trait nouveau est la présence des **ELLIPSES composées de LIGNES EN POINTILLÉS** qui enferment divers nœuds. **Chacune de ces ellipses représente un ENSEMBLE D'INFORMATION.** »*

⚠️ **La convention à retenir :**

> *« Par convention, **les ensembles d'information SINGLETONS — ceux contenant exactement UN nœud — ne sont PAS représentés en enfermant le nœud dans un cercle en pointillés. Un nœud membre d'un singleton est simplement LAISSÉ TEL QUEL.** »*

> *« **Chaque ensemble d'information est étiqueté avec l'UNIQUE joueur dont c'est le tour** dès qu'un nœud de cet ensemble est atteint. Dans ce jeu, **seul l'ACHETEUR a des ensembles d'information qui ne sont pas des singletons**. »*

### 🔴 4.3 La définition qui structure tout le §7.3

$$\boxed{\;\text{TOUS les ensembles d'information sont des SINGLETONS} \ \Longleftrightarrow\ \textbf{INFORMATION PARFAITE}\;}$$

> *« Les jeux sous forme extensive dans lesquels **chaque ensemble d'information est un singleton**, comme dans take-away, sont appelés **JEUX À INFORMATION PARFAITE**. **TOUS les autres jeux**, comme le jeu acheteur-vendeur, sont appelés **jeux à INFORMATION IMPARFAITE**. »*

## 🔴 Concept 5 — §7.3.2 : l'analyse informelle de take-away

### 5.1 Les deux idées à dégager

> *« Nous souhaitons développer **informellement DEUX idées fondamentales**. **La première est la notion de STRATÉGIE de forme extensive, et la seconde est la notion d'INDUCTION À REBOURS.** »*

<div class="callout" data-kind="methode">

<span class="callout__lab">comment DEUX « EXPERTS » joueraient</span>

*« Notre but est de comprendre . En particulier, nous cherchons à découvrir **la « meilleure » ligne de conduite pour CHAQUE contingence possible**. Dans le langage de la forme extensive, nous souhaitons **déterminer une action optimale pour chaque joueur À CHAQUE nœud de décision**. »*

</div>

### 🔴 5.2 Ce qu'est une stratégie — et ce que ce n'est pas

> *« Une stratégie pour le joueur 1 dans take-away doit lister **un premier coup ; un second coup contingent à CHAQUE premier coup potentiel de 1 ET à CHAQUE réponse potentielle de 2, et ainsi de suite**. »*

> *« Par conséquent, **armé d'une stratégie, un joueur peut la consulter chaque fois que c'est son tour, et elle fournit un coup suggéré ÉTANT DONNÉE L'HISTOIRE DE JEU jusqu'à ce point**. »*

⚠️ **Le point le plus souvent oublié :**

> *« En particulier, **la stratégie d'un joueur CONTINUE de fournir des conseils MÊME S'IL en a (par erreur ou délibérément) DÉVIÉ dans le passé**. »*

**L'exemple donné** : *« « **Retirer une pièce si le nombre restant est IMPAIR, et deux pièces s'il est PAIR** ». **Même si le joueur 1 dévie de cette stratégie en retirant deux pièces à son premier coup, la stratégie continue de fournir des conseils pour le reste du jeu.** »*

### 5.3 La résolution par les positions perdantes

> *« À première vue, **avec 21 pièces sur la table, il n'est pas du tout clair combien de pièces le premier joueur devrait retirer.** […] **Il est difficile de répondre immédiatement parce qu'il reste beaucoup de coups. Ainsi, NOUS NE POUVONS PAS JUGER DE LA SOLIDITÉ DU PREMIER COUP SANS SAVOIR COMMENT LE JEU SE POURSUIVRA ENSUITE.** »*

<details class="details--riche">
<summary>

**La construction, position par position**

</summary>

| Pièces restantes | Statut | Pourquoi |
|---|---|---|
| **1** | **PERDANTE** | *« le joueur dont c'est le tour **perdrait, parce qu'il serait forcé de retirer la dernière pièce** »* |
| **2** | **gagnante** | *« il peut retirer une pièce, laissant **une pièce**, ce que nous savons déjà être une position perdante pour l'autre »* |
| **3** et **4** | **gagnantes** | *« retirer deux et trois pièces, respectivement, place l'adversaire dans la position perdante de **une pièce** »* |
| **5** | **PERDANTE** | *« retirer une, deux ou trois pièces place l'adversaire dans les positions **GAGNANTES** quatre, trois ou deux »* |

> *« **En continuant de cette manière, DES POSITIONS LES PLUS PROCHES DE LA FIN vers celles les plus proches du début**, on montre que : »*

$$\boxed{\;\textbf{Les positions PERDANTES sont } 1,\ 5,\ 9,\ 13,\ 17,\ 21 \ ;\ \text{toutes les autres sont GAGNANTES.}\;}$$

</details>

### 🔴 5.4 La conclusion : le SECOND joueur gagne toujours

> *« Par conséquent, **si deux experts jouent take-away avec 21 pièces, LE SECOND JOUEUR PEUT TOUJOURS GARANTIR UNE VICTOIRE, quelle que soit la manière dont le premier joue.** »*

**La stratégie gagnante, mot pour mot :**

> *« « **Chaque fois que c'est possible, retirer toujours JUSTE ASSEZ de pièces pour que la position résultante soit l'une des positions PERDANTES, à savoir 1, 5, 9, 13, 17, 21 ; SINON, retirer UNE pièce.** » »*

> *« Nous laissons au lecteur le soin de vérifier que **si le second joueur a fait ainsi à chacun de ses tours précédents, il peut toujours rendre la position perdante pour son adversaire. Parce que son adversaire COMMENCE dans une position perdante (21), ceci complète l'argument.** »*

### 5.5 La leçon de méthode

> *« **Notez bien la technique employée. Plutôt que de commencer au DÉBUT du jeu avec les 21 pièces, nous avons commencé l'analyse à la FIN — avec une pièce restante, puis deux, et ainsi de suite.** »*

$$\boxed{\;\textbf{« Cette technique est AU CŒUR de nombreux concepts de solution}\\\textbf{pour les jeux sous forme extensive. Elle s'appelle l'INDUCTION À REBOURS. »}\;}$$

## 🔴 Concept 6 — §7.3.3 : la définition 7.14 d'une stratégie

### 6.1 L'énoncé

> *« Une stratégie (pure) est **une description COMPLÈTE des choix qu'un joueur ferait dans TOUTE contingence qui pourrait survenir au cours du jeu ; c'est un ENSEMBLE COMPLET D'INSTRUCTIONS qui pourrait être exécuté par QUELQU'UN D'AUTRE pour le compte de ce joueur**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.14 — Stratégie de jeu sous forme extensive</span>

Une **stratégie pure** pour le joueur $i$ dans $\Gamma$ est une **fonction**

$$s_i:\ \mathcal{I}_i\ \longrightarrow\ A \qquad\text{satisfaisant}\qquad s_i(I(x))\in A(x) \ \text{ pour tout } x \text{ avec } \iota(x)=i$$

On note $S_i$ l'ensemble des stratégies pures de $i$ dans $\Gamma$.

</div>

### 🔴 6.2 Pourquoi le domaine est $\mathcal{I}_i$ et non $X_i$

> *« **Le fait que le choix d'action d'un joueur ne puisse dépendre QUE de l'ensemble d'information auquel il fait face (par opposition, disons, aux HISTOIRES à l'intérieur de cet ensemble) garantit que la stratégie reflète correctement les CONTRAINTES INFORMATIONNELLES auxquelles le joueur fait face.** »*

**Sur le dessin** : *« les stratégies pures peuvent être facilement représentées **en plaçant des FLÈCHES sur les actions à prendre quand chaque ensemble d'information est atteint** »* *(figure 7.11)*.

### 🔴 6.3 L'exemple des échecs — le contre-exemple à connaître

> *« Supposons que vous jouiez les **NOIRS aux échecs**. **Une très petite partie de votre stratégie pure exige de spécifier quel coup jouer après le premier coup des blancs.** »*

> *« **Il ne suffit PAS de spécifier comment vous réagiriez à UNE SEULE ouverture des blancs — disons P-K4 — MÊME SI vous êtes virtuellement CERTAIN que ce sera leur premier coup.** »*

<div class="callout" data-kind="methode">

<span class="callout__lab">comment vous réagiriez à CHAQUE ouverture possible des blancs. En effet, vous devez spécifier comment vous réagiriez à CHAQUE SÉQUENCE (légale) POSSIBLE de coups se terminant par un coup des blancs. Alors SEULEMENT aurez-vous spécifié UNE SEULE stratégie pure pour les noirs aux échecs.</span>

*« Spécifier une stratégie pure exige de dire »*

</div>

> *« Les exercices vous demandent de formuler des stratégies pures pour les jeux considérés jusqu'ici. **Vous verrez que cela seul peut être un DÉFI.** »*

## 🔴 Concept 7 — §7.3.4 : la forme stratégique de $\Gamma$

### 7.1 Comment une stratégie jointe détermine une issue

> *« Notez qu'**une fois qu'une stratégie pure a été choisie pour chaque joueur, les actions de chaque joueur au cours du jeu sont COMPLÈTEMENT DÉTERMINÉES, sauf pour la manière dont elles peuvent être affectées par les coups du HASARD**. Ainsi, **une fois le coup du hasard déterminé, l'issue du jeu est complètement déterminée par les stratégies pures**. »*

**Le déroulement, pas à pas :**

| Étape | Ce qui se passe |
|---|---|
| Le hasard joue $a_0$ | ⟹ l'histoire $x^1=a_0$ et l'ensemble $I(x^1)$ appartenant à $\iota(x^1)=1$, disons |
| $1$ joue $a_1=s_1(I(x^1))$ | ⟹ $x^2=(x^1,a_1)$ et $I(x^2)$ appartenant à $\iota(x^2)=2$, disons |
| $2$ joue $a_2=s_2(I(x^2))$ | ⟹ $x^3=(x^2,a_2)$ … |

> *« Nous pouvons continuer ce processus jusqu'à atteindre **INÉVITABLEMENT (parce que le jeu est FINI) un nœud terminal $e$**, donnant le paiement $u_i(e)$. Par conséquent, **étant donnée une stratégie jointe $s$, la distribution $\pi$ de la Nature sur $A(x_0)$ détermine l'ESPÉRANCE d'utilité du joueur $i$, que nous noterons $u_i(s)$**. »*

### 🔴 7.2 Le résultat structurel

$$\boxed{\;(S_i,u_i)_{i\in N} \textbf{ est un JEU SOUS FORME STRATÉGIQUE : c'est LA FORME STRATÉGIQUE DE } \Gamma.\;}$$

> *« Il suffit de noter que **nous pouvons donc appliquer TOUS nos concepts de solution de forme stratégique aux jeux finis sous forme extensive**. Par exemple, **une stratégie dominante dans le jeu sous forme extensive est simplement une stratégie dominante dans la FORME STRATÉGIQUE de $\Gamma$ ; un équilibre de Nash pour le jeu sous forme extensive est simplement un équilibre de Nash de la forme stratégique de $\Gamma$**, et ainsi de suite. »*

### 7.3 La note de bas de page à ne pas manquer

> *(Note de bas de page 9.)* *« Notez que nous avons **TRANSFORMÉ un jeu fini sous forme extensive ARBITRAIRE (qui peut fort bien refléter une situation dynamique très complexe) EN un jeu sous forme STRATÉGIQUE**. Ainsi, **notre impression antérieure que les jeux sous forme stratégique n'étaient utiles que pour modéliser des situations sans dynamique explicite était plutôt NAÏVE**. »*

> *« En effet, **on pourrait soutenir exactement l'INVERSE : que d'un point de vue théorique, il SUFFIT de considérer les jeux sous forme stratégique, parce que TOUS les jeux sous forme extensive peuvent leur être RÉDUITS !** **Que la forme stratégique d'un jeu extensif soit ou non SUFFISANTE pour en mener l'analyse est un SUJET DE RECHERCHE ACTUEL parmi les théoriciens des jeux.** »*

⚠️ **C'est exactement la question que le reste du §7.3 va trancher par la négative en pratique** : l'équilibre de Nash de la forme stratégique laisse passer des comportements absurdes que seule la structure **dynamique** permet d'éliminer.

## 🔴 Concept 8 — §7.3.5 : l'induction à rebours et le théorème de Kuhn

### 8.1 Le jeu de l'entrant et de l'incumbent

> *« **Il y a deux firmes en concurrence dans une seule industrie. L'une produit actuellement (l'INCUMBENT), et l'autre non (l'ENTRANT).** L'entrant doit décider **d'entrer ou de rester dehors**. Si l'entrant reste dehors, **le statu quo prévaut** et le jeu se termine. Si l'entrant entre, **l'incumbent doit décider de COMBATTRE en inondant le marché et en faisant baisser le prix, ou d'ACQUIESCER**. »*

> **La figure 7.12 — le jeu entrant-incumbent.**

| L'issue | Paiement de l'entrant | Paiement de l'incumbent |
|---|---|---|
| **Rester dehors** *(statu quo)* | $0$ | $2$ |
| Entrer, l'incumbent **combat** | $-1$ | $-1$ |
| Entrer, l'incumbent **acquiesce** | $1$ | $1$ |

### 8.2 La résolution

> *« Clairement, **l'incumbent aimerait garder l'entrant dehors pour continuer à jouir de ses profits de MONOPOLE de 2. L'entrant restera-t-il en fait dehors ? Cela dépend évidemment de la manière dont l'incumbent RÉAGIT à l'entrée.** »*

> *« Ainsi, **tout se ramène à la manière dont l'incumbent réagira à l'entrée.** »*

> *(Note de bas de page 10.)* *« Notez la **similitude avec notre investigation de take-away**. **Ici comme là, on ne peut pas évaluer la solidité des coups précoces sans d'abord analyser comment le jeu se poursuivra plus tard.** »*

**La résolution à rebours** : supposons l'entrant entré. *« **Il est évidemment meilleur pour l'incumbent d'ACQUIESCER, car ce faisant il reçoit 1 plutôt que $-1$.** »* Le jeu se **réduit** à la figure 7.13, où le nœud de l'incumbent est **remplacé par le vecteur de paiements $(1,1)$** ; l'entrant choisit alors **d'entrer** *(1 plutôt que 0)*.

$$\boxed{\;\text{L'entrant ENTRE ; l'incumbent ACQUIESCE en cas d'entrée.}\;}$$

### 8.3 Un exercice d'induction à rebours plus complexe (figures 7.14-7.16)

<details class="details--riche">
<summary>

**Les trois réductions successives**

</summary>

> *« Nous commençons par analyser **les nœuds de décision précédant SEULEMENT des nœuds terminaux**. Il y a **deux tels nœuds PÉNULTIÈMES**, étiquetés $x$ et $y$. **Tous deux appartiennent au joueur 1.** »*

| Réduction | Ce qui est décidé |
|---|---|
| **1ʳᵉ** *(fig. 7.14 → 7.15)* | *« En $x$, le joueur 1 fait mieux de choisir $R'$, et en $y$ il fait mieux de choisir $L''$ »* — on remplace $x$ et $y$ **par les paiements devenus INÉVITABLES** |
| **2ᵉ** *(fig. 7.15 → 7.16)* | Les nœuds $w$ et $z$ *(du joueur 2)* deviennent pénultièmes : *« si $w$ est atteint, 2 fait mieux de choisir $r$ ; si $z$ est atteint, il fait mieux de choisir $l'$ »* |
| **3ᵉ** *(fig. 7.16)* | *« il est clair que **le joueur 1 choisira $R$** »* |

**Les stratégies obtenues** : le joueur 1 joue $(R,\ R',\ L'')$ et le joueur 2 joue $(r,\ l')$.

> *(Note de bas de page 11.)* *« La notation $(R,R',L'')$ signifie que **le joueur 1 choisira $R$ à son premier coup, $R'$ si le nœud $x$ est atteint, et $L''$ si le nœud $y$ est atteint**. »*

**L'issue** : *« chaque joueur recevra un paiement de **ZÉRO** »*.

</details>

### 🔴 8.4 L'objection naturelle — et sa réfutation

> *« **Il peut paraître un peu ÉTRANGE que la solution donne à chaque joueur un paiement de zéro alors qu'il est possible pour chacun de dériver un paiement de 3 en jouant « à DROITE » chaque fois que possible.** »*

> *« **Cependant, ce serait sûrement une ERREUR pour le joueur 2 de jouer $r'$ si le nœud $z$ est atteint, parce que LE JOUEUR 1 CHOISIRA RATIONNELLEMENT $L''$ en $y$, NON $R''$, car le premier lui donne un paiement plus élevé.** Ainsi, **le joueur 2, ANTICIPANT CORRECTEMENT ceci, fait mieux de choisir $l'$, car cela lui donne zéro, ce qui SURPASSE l'alternative de $-1$**. »*

> *(Note de bas de page 12.)* *« On pourrait arguer que **les joueurs devraient conclure un ACCORD CONTRAIGNANT pour garantir le vecteur $(3,3)$. Cependant, PAR DÉFINITION, le jeu sous forme extensive inclut TOUTES les actions disponibles. Par conséquent, s'il était possible de conclure des accords contraignants, cela DEVRAIT être inclus dans le jeu dès le départ. Parce que ce n'est pas présent dans le jeu représenté, ce n'est simplement PAS disponible.** »*

### 8.5 La définition 7.15

Vocabulaire préparatoire : $y$ **suit strictement** $x$ si $y=(x,a_1,\dots,a_k)$ ; $y$ **suit immédiatement** $x$ si $k=1$ ; $y$ **suit faiblement** $x$ si $y=x$ ou $y$ suit strictement $x$.

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.15 — Stratégies d'induction à rebours</span>

La stratégie jointe $s$ est une **stratégie d'induction à rebours** pour le jeu fini à **information parfaite** $\Gamma$ si elle est dérivée comme suit. Appeler un nœud $x$ **pénultième** si **tous les nœuds le suivant immédiatement sont terminaux**. Pour chaque nœud pénultième $x$, poser $s_{\iota(x)}(x)$ = **une action menant à un nœud terminal qui MAXIMISE le paiement du joueur $\iota(x)$** parmi les actions disponibles en $x$. Soit $u^x$ le vecteur de paiements résultant. **Retirer** les nœuds et actions **suivant strictement** chaque nœud pénultième et **assigner le paiement $u^x$ à $x$**, qui devient alors un nœud terminal. **Répéter** jusqu'à ce qu'une action ait été assignée à **chaque** nœud de décision.

</div>

> *(Note de bas de page 13.)* *« **La finitude du jeu garantit que ce processus se TERMINE.** »*

> *« Cette méthode est appelée **l'ALGORITHME D'INDUCTION À REBOURS**. **Reflétée dans les stratégies d'induction à rebours est l'idée que LES DÉCISIONS PRISES TÔT DANS LE JEU DOIVENT TENIR COMPTE DU JEU OPTIMAL DES JOUEURS FUTURS.** »*

### 8.6 Le théorème 7.4 (Kuhn)

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 7.4 — (Kuhn) Induction à rebours et équilibre de Nash</span>

Si $s$ est une stratégie d'induction à rebours pour le jeu fini à **information parfaite** $\Gamma$, alors **$s$ est un équilibre de Nash de $\Gamma$**.

</div>

<details class="details--riche">
<summary>

**La preuve — par l'absurde, en localisant un nœud sans suiveur strict**

</summary>

> *« Parce qu'un équilibre de Nash de $\Gamma$ est simplement **un équilibre de Nash de sa forme stratégique** $(S_i,u_i)_{i\in N}$, il suffit de montrer $u_i(s)\geq u_i(s_i',s_{-i})$ pour tout $i$ et tout $s_i'$. »*

**Pas 1 — la supposition absurde.** Supposons $u_i(s_i',s_{-i})>u_i(s)$ pour un $i$ et un $s_i'$.

> *« Par conséquent, **il doit y avoir une action $a_1$ prise par la NATURE telle que les nœuds terminaux $e$ et $e'$ induits respectivement par $s$ et $s'=(s_i',s_{-i})$ étant donnée cette action, satisfont $u_i(e')>u_i(e)$**. »*

**Pas 2 — l'ensemble critique.**

> *« Donc, **l'ensemble des nœuds de décision $x$ où, si le jeu commençait là, le joueur $i$ pourrait faire MIEUX en utilisant une stratégie différente de $s_i$, est NON VIDE**, parce que $x=a_1$ en est membre. »*

⚠️ **Soit $\bar x$ un membre de cet ensemble N'AYANT AUCUN SUIVEUR STRICT dans l'ensemble.**

> *(Note 14.)* *« Un tel $\bar x$ existe (**bien qu'il n'ait pas besoin d'être unique**) parce que l'ensemble dont il est choisi est **fini et non vide**. »*

**Pas 3 — les deux propriétés de $\bar x$.**

> *« Parce que $\bar x$ n'a **aucun suiveur strict** parmi l'ensemble d'où il a été choisi : **(1) $\bar x$ appartient au joueur $i$**, et **(2) toutes les actions dictées par $s_i$ aux nœuds de $i$ suivant STRICTEMENT $\bar x$ NE PEUVENT PAS ÊTRE AMÉLIORÉES**. »*

**Pas 4 — la contradiction.**

> *« Nous pouvons donc conclure que **quand le jeu commence en $\bar x$ et que les autres emploient $s_{-i}$, le paiement de $i$ s'il prend l'action en $\bar x$ spécifiée par $s_i'$ mais emploie ENSUITE $s_i$, EXCÈDE celui obtenu en employant $s_i$ dès $\bar x$**. »*

> ⚠️ *« **Mais ce dernier paiement est le PAIEMENT D'INDUCTION À REBOURS de $i$ quand l'algorithme atteint le nœud $\bar x$, et doit donc être le PLUS GRAND paiement que $i$ peut obtenir parmi les actions disponibles en $\bar x$ étant donné que $s$ sera employée ensuite. CETTE CONTRADICTION COMPLÈTE LA PREUVE.** »* $\blacksquare$

</details>

### 8.7 Le corollaire 7.1

<div class="callout" data-kind="formel">

<span class="callout__lab">COROLLAIRE 7.1 — Existence d'un équilibre de Nash en stratégies pures</span>

**Tout jeu fini sous forme extensive à information parfaite possède un équilibre de Nash en stratégies PURES.**

</div>

⚠️ **Pourquoi c'est immédiat** : *« **parce que l'algorithme d'induction à rebours se TERMINE toujours dans les jeux finis à information parfaite** »* — il produit donc toujours au moins une stratégie jointe, qui par le théorème 7.4 est un équilibre.

**Comparez à la fiche 515** : le duel batteur-lanceur, jeu **simultané**, n'a **aucun** équilibre en stratégies pures. **L'information parfaite change tout.**

### 🔴 8.8 La réciproque est FAUSSE — la menace non crédible

> *« **Bien que chaque stratégie d'induction à rebours soit un équilibre de Nash, TOUT équilibre de Nash N'EST PAS une stratégie d'induction à rebours.** »*

**Dans le jeu entrant-incumbent**, à côté de la solution par induction à rebours, il existe l'équilibre de Nash suivant :

$$\text{l'entrant RESTE DEHORS, et l'incumbent COMBAT si l'entrant entre}$$

> *« Notez qu'**étant donnée la stratégie de l'autre, AUCUN joueur ne peut augmenter son paiement en changeant de stratégie. Ainsi, les stratégies forment bien un équilibre de Nash.** »*

**Mais :**

> ⚠️ *« **Ce dernier équilibre de Nash est ABSURDE parce qu'il implique une MENACE de combattre de la part de l'incumbent qui N'EST PAS CRÉDIBLE. La menace manque de crédibilité parce qu'il ne serait PAS DANS L'INTÉRÊT de l'incumbent de la METTRE À EXÉCUTION si l'occasion lui en était donnée. L'entrant devrait voir à travers cela et ENTRER.** »*

> *« **C'est précisément cette capacité d'ANTICIPATION de l'entrant qui est AUTOMATIQUEMENT INCORPORÉE dans les stratégies d'induction à rebours.** »*

> *« Comme nous le verrons, **quand il y a de multiples équilibres de Nash, on peut souvent en éliminer un ou plusieurs au motif qu'ils impliquent des MENACES NON CRÉDIBLES** comme celles-ci. »*

$$\boxed{\;\textbf{L'induction à rebours = un RAFFINEMENT de l'équilibre de Nash qui élimine}\\\textbf{les menaces non crédibles.}\;}$$

## 🔴 Concept 9 — §7.3.6 : pourquoi l'induction à rebours ne suffit plus

### 9.1 Le jeu qui met la méthode en échec (figure 7.17)

> **La figure 7.17 — un jeu de coordination avec option.** Le joueur 1 choisit d'abord **OUT** *(paiements $(2,2)$)* ou **IN**. S'il joue IN, **il choisit ensuite $L$ ou $R$** ; puis **le joueur 2, sans savoir lequel**, choisit $l$ ou $r$.

|  | $l$ | $r$ |
|---|---|---|
| $L$ | $1,\ 3$ | $0,\ 0$ |
| $R$ | $0,\ 0$ | $3,\ 1$ |

### 9.2 Le blocage

> *« Le premier pas est de localiser tous les ensembles d'information tels que, **quelle que soit l'action choisie, le jeu se termine ensuite**. »* Ici c'est **l'ensemble d'information du joueur 2**.

> *« Maintenant, selon l'algorithme, le pas suivant est de **choisir une action OPTIMALE pour le joueur 2**. **Mais nous voici en difficulté, car il n'est PAS DU TOUT clair quelle action est optimale.** C'est parce que **la meilleure action de 2 dépend de l'action prise par 1** : si 1 a choisi $L$, la meilleure action est $l$ ; s'il a choisi $R$, c'est $r$. »*

> *« **Il n'y a AUCUNE échappatoire immédiate parce que, PAR DÉFINITION de l'ensemble d'information, le joueur 2 NE SAIT PAS quelle action le joueur 1 a prise.** »*

### 🔴 9.3 La circularité mise à nu

> *« **Rappelez-vous POURQUOI nous résolvons le jeu à rebours. Nous le faisons parce que, pour déterminer le jeu optimal TÔT, nous devons d'abord comprendre comment le jeu se poursuivra TARD.** »*

> *« **Mais dans l'exemple présent, L'INVERSE est AUSSI vrai. Pour déterminer le jeu optimal TARD (à l'ensemble d'information de 2), nous devons d'abord comprendre comment le jeu se déroule TÔT (1 a-t-il choisi $L$ ou $R$ ?).** »*

> *« Ainsi, dans ce jeu — **et dans les jeux à information imparfaite tout à fait généralement** — **nous devons, au moins dans une certaine mesure, déterminer SIMULTANÉMENT le jeu optimal en des points à la fois PLUS TÔT et PLUS TARD dans le jeu**. »*

### 9.4 L'idée de Selten

> *« **L'idée, développée d'abord dans Selten (1965, 1975), est de considérer LE SOUS-JEU COMME UN JEU À PART ENTIÈRE.** »*

**Le sous-jeu de la figure 7.18** *(celui qui commence au second nœud du joueur 1)* possède **deux équilibres de Nash en stratégies pures** : $(L,l)$ et $(R,r)$.

> *(Note de bas de page 16.)* *« Il y a **aussi un équilibre en stratégies MIXTES**, mais la discussion sera simplifiée si nous l'ignorons pour le moment. »*

**On suppose que l'un d'eux est joué — disons $(L,l)$**, de paiements $(1,3)$.

> *« Nous pouvons maintenant procéder **analoguement à l'algorithme d'induction à rebours en REMPLAÇANT LE SOUS-JEU ENTIER par le vecteur de paiements résultant $(1,3)$** *(figure 7.19)*. Une fois fait, **il est clair que le joueur 1 choisira OUT à son premier nœud**, parce qu'il obtient alors 2 plutôt que 1. »*

**Les stratégies obtenues** : pour 1, **OUT** à son premier nœud et **$L$** à son second ; pour 2, **$l$**.

### 9.5 Les deux similitudes avec le cas parfait

| # | La similitude |
|---|---|
| **1** | *« ces stratégies reflètent **la capacité d'ANTICIPATION** de 1 : son jeu au premier nœud est optimal **fondé sur le jeu d'équilibre de Nash PLUS TARD**. Ainsi, **non seulement 1 anticipe, mais il comprend que le jeu futur sera « RATIONNEL » au sens qu'il constitue un équilibre de Nash dans le sous-jeu** »* |
| **2** | *« ces stratégies **forment un équilibre de Nash du jeu ORIGINAL** »* |

⚠️ *« Comme vous vous en souvenez, **il y avait DEUX équilibres purs dans le sous-jeu, et nous en avons ARBITRAIREMENT choisi un. Si nous avions choisi l'autre, les stratégies résultantes seraient tout à fait DIFFÉRENTES. Néanmoins, elles seraient AUSSI parfaites en sous-jeux.** »*

## 🔴 Concept 10 — Les définitions 7.16 et 7.17, et le théorème 7.5

### 10.1 Ce qu'est un sous-jeu

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.16 — Sous-jeux</span>

Un nœud $x$ **définit un sous-jeu** de $\Gamma$ si **(i)** $I(x)=\{x\}$ *(c'est un singleton)*, **et** **(ii)** **chaque fois que $y$ est un nœud de décision suivant $x$, et que $z$ est dans l'ensemble d'information contenant $y$, alors $z$ suit AUSSI $x$**.

</div>

> *« Ainsi, **si un nœud $x$ définit un sous-jeu, alors CHAQUE joueur, à CHAQUE tour, SAIT si $x$ a été atteint**. »*

> **Les figures 7.20(a) et (b).** En **(a)**, $x$ définit un sous-jeu : *« chaque nœud de l'ensemble d'information NON SINGLETON du joueur 1 suit $x$ »*. En **(b)**, $x$ n'en définit pas : *« les nœuds $y$ et $z$ sont tous deux membres de l'ensemble d'information du joueur 3, **et pourtant SEUL $y$ suit $x$** »*.

**Notation** : le sous-jeu défini par $x$ est noté $\Gamma_x$. *« $\Gamma_x$ consiste en tous les nœuds suivant $x$, et **il HÉRITE de sa structure informationnelle et de ses paiements du jeu original $\Gamma$** »* *(figure 7.21)*.

⚠️ **La stratégie induite** : *« étant donnée une stratégie jointe $s$ pour $\Gamma$, **$s$ induit naturellement une stratégie jointe dans CHAQUE sous-jeu $\Gamma_x$** : pour chaque ensemble d'information $I$ de $\Gamma_x$, la stratégie induite prend **la même action** en $I$ que celle spécifiée par $s$. »*

### 10.2 La définition 7.17

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.17 — Équilibre parfait en sous-jeux en stratégies pures</span>

Une stratégie jointe pure $s$ est un **équilibre parfait en sous-jeux en stratégies pures** de $\Gamma$ si **$s$ induit un ÉQUILIBRE DE NASH dans CHAQUE sous-jeu de $\Gamma$**.

</div>

### 🔴 10.3 Un raffinement STRICT de Nash

> *« Notez que **parce que, pour tout jeu $\Gamma$, LE JEU LUI-MÊME EST UN SOUS-JEU, un équilibre parfait en sous-jeux est AUSSI un équilibre de Nash. Par conséquent, le concept de perfection en sous-jeux est un RAFFINEMENT du concept d'équilibre de Nash. En effet, ce raffinement est STRICT.** »*

**La figure 7.22** : la stratégie représentée par les flèches en **(a)** *« est un équilibre de Nash parce qu'aucun joueur ne peut améliorer son paiement en changeant de stratégie »*. Mais elle **n'est pas parfaite en sous-jeux** : en **(b)**, *« le sous-jeu a été isolé et **la DOUBLE FLÈCHE indique une déviation qui améliore STRICTEMENT le paiement du joueur 2 DANS LE SOUS-JEU** »*.

> ⚠️ *(Note de bas de page 17 — le passage le plus éclairant.)* *« Notez que **bien que le paiement du joueur 2 puisse être augmenté DANS LE SOUS-JEU, il ne peut PAS l'être dans le jeu ORIGINAL. C'est parce que le sous-jeu en question N'EST PAS ATTEINT par les stratégies originales.** En effet, **les stratégies d'équilibre de Nash du jeu original induisent des équilibres de Nash dans TOUS les sous-jeux QUI SONT ATTEINTS. Ainsi, c'est PRÉCISÉMENT LE TRAITEMENT PAR LA PERFECTION EN SOUS-JEUX DES SOUS-JEUX NON ATTEINTS qui explique sa distinction d'avec l'équilibre de Nash.** »*

$$\boxed{\;\text{Nash discipline les sous-jeux ATTEINTS ; la perfection discipline AUSSI les autres.}\;}$$

### 10.4 Le théorème 7.5

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 7.5 — La perfection en sous-jeux généralise l'induction à rebours</span>

Pour **tout jeu fini sous forme extensive à information PARFAITE**, l'ensemble des stratégies d'**induction à rebours** COÏNCIDE avec l'ensemble des **équilibres parfaits en sous-jeux en stratégies pures**.

</div>

<details class="details--riche">
<summary>

**Sens 1 — toute stratégie d'induction à rebours est parfaite en sous-jeux**

</summary>

Soit $s$ une stratégie d'induction à rebours.

> *« Parce que **dans un jeu à information parfaite CHAQUE nœud définit un sous-jeu** (voir les exercices), nous devons montrer que $s$ induit un équilibre de Nash dans le sous-jeu défini par $x$, **pour tout $x$**. »*

> *« Mais pour chaque $x$, **$\Gamma_x$ est bien sûr un jeu à INFORMATION PARFAITE, et la stratégie induite par $s$ est clairement une stratégie d'INDUCTION À REBOURS pour le sous-jeu**. »*

> *« **(Pour le voir, pensez à COMMENT la stratégie $s$ est construite, puis pensez à comment les stratégies d'induction à rebours pour le SOUS-JEU seraient construites.)** »*

> *« Par conséquent, **nous pouvons appliquer le THÉORÈME 7.4** et conclure que les stratégies induites forment un équilibre de Nash de $\Gamma_x$. »*

</details>

<details class="details--riche">
<summary>

**Sens 2 — tout équilibre parfait en sous-jeux est une stratégie d'induction à rebours**

</summary>

Soit $s$ parfaite en sous-jeux. *« Il suffit de vérifier que **$s$ peut être dérivée par l'algorithme d'induction à rebours**. »*

**Pas 1 — les nœuds pénultièmes.**

> *« Considérons **tout nœud de décision pénultième. Ce nœud définit un sous-jeu À UN SEUL JOUEUR**, et parce que $s$ est parfaite en sous-jeux, **elle doit y assigner un choix MAXIMISANT LE PAIEMENT du joueur dont c'est le tour (sinon ce ne serait pas un équilibre de Nash du sous-jeu à un joueur)**. »*

⟹ *« l'action spécifiée par $s$ y est **cohérente avec l'algorithme** »*.

**Pas 2 — la remontée.**

> *« Considérons maintenant **tout nœud $x$ n'ayant que des nœuds pénultièmes après lui. Ce nœud définit un sous-jeu dans lequel, à tous les nœuds qui le suivent, $s$ spécifie une action d'induction à rebours. Parce que $s$ induit un équilibre de Nash dans ce sous-jeu, elle doit spécifier un choix maximisant le paiement pour $\iota(x)$ en $x$ ÉTANT DONNÉ que les choix à suivre sont des choix d'induction à rebours.** »*

> *« **En remontant l'arbre de cette manière, on établit le résultat.** »* $\blacksquare$

</details>

### 🔴 10.5 La non-existence en stratégies pures

> *« Tout comme les équilibres de Nash en stratégies pures peuvent ne pas exister dans certains jeux sous forme stratégique, **les équilibres parfaits en sous-jeux en stratégies pures n'existent PAS toujours**. »*

> **La figure 7.23 — un jeu sans équilibre parfait en sous-jeux en stratégies pures.** C'est **matching pennies en séquence** :

|  | $l$ | $r$ |
|---|---|---|
| $L$ | $1,\ -1$ | $-1,\ 1$ |
| $R$ | $-1,\ 1$ | $1,\ -1$ |

> *« **Parce que le SEUL sous-jeu est le jeu lui-même, l'ensemble des équilibres parfaits en sous-jeux en stratégies pures COÏNCIDE avec l'ensemble des équilibres de Nash purs. Cependant, il est facile de vérifier que parmi les quatre stratégies jointes pures possibles, AUCUNE ne constitue un équilibre de Nash.** »*

> *« **Pour garantir l'existence d'au moins un équilibre parfait en sous-jeux, nous devons donner aux joueurs l'occasion de RANDOMISER.** »*

## 🔴 Concept 11 — Stratégies mixtes, comportementales et mémoire parfaite

### 11.1 Les deux manières de randomiser

> *« Dans les jeux sous forme stratégique, **il y a UNE SEULE manière naturelle de randomiser** — assigner des probabilités à chaque stratégie pure puis employer un dispositif de randomisation. **En revanche, il y a DEUX manières de randomiser dans un jeu sous forme extensive.** »*

| Type | Le mécanisme | Le nom |
|---|---|---|
| **1** | *« Assigner à chaque stratégie **pure** une probabilité et, **AVANT que le jeu commence**, employer le dispositif approprié pour choisir l'une de vos stratégies pures. **Avec cette méthode, vous randomisez UNE FOIS POUR TOUTES au début du jeu.** Une fois la pure choisie, **votre comportement est déterminé pour TOUT le jeu ; aucune randomisation supplémentaire n'est entreprise.** »* | **Stratégie MIXTE** |
| **2** | *« Employer un dispositif de randomisation **CHAQUE FOIS que c'est votre tour de jouer**. Plutôt que de randomiser une fois pour toutes sur vos stratégies pures, **vous randomisez, à chaque tour, sur votre ensemble COURANT d'actions disponibles.** […] **Vous pouvez choisir un dispositif DIFFÉRENT à chaque tour.** »* | **Stratégie COMPORTEMENTALE** |

### 11.2 Les définitions formelles

**Stratégie mixte** : $m_i(s_i)\in[0,1]$ pour chaque $s_i\in S_i$, avec $\sum_{s_i\in S_i}m_i(s_i)=1$.

**Stratégie comportementale** : pour **chaque ensemble d'information $I$** de $i$, une distribution sur les actions disponibles :

$$b_i(a,I)\in[0,1], \qquad \sum_{a\in A(I)}b_i(a,I)=1$$

**Sur le dessin** : *« en spécifiant **à côté de chaque action la probabilité avec laquelle elle est choisie (entre PARENTHÈSES)** »*.

### 🔴 11.3 L'équivalence — et son prix

> *« **Bien que nous n'en donnions pas de preuve, il s'avère que POUR TOUS LES JEUX QUI NOUS CONCERNENT DANS CE TEXTE, IL N'Y A AUCUNE DIFFÉRENCE que les joueurs emploient des stratégies mixtes ou comportementales. D'UN POINT DE VUE STRATÉGIQUE, ELLES SONT ENTIÈREMENT ÉQUIVALENTES.** »*

> *« C'est-à-dire, **pour chaque stratégie mixte $m_i$, il y a une stratégie comportementale donnant à $i$ PRÉCISÉMENT le même paiement espéré, QUELLES QUE SOIENT les stratégies employées par les autres. De même, pour chaque comportementale il y a une mixte équivalente.** »*

> *(Note de bas de page 18.)* *« **Certaines mixtes (comportementales) peuvent admettre PLUSIEURS comportementales (mixtes) équivalentes.** Voir **Kuhn (1953)** pour une analyse complète. »*

<details class="details--riche">
<summary>

**L'exemple 7.6 — convertir une mixte en comportementale**

</summary>

Les trois stratégies pures de 1 dans le jeu de la figure 7.24 sont $LL$, $RL$ et $RR$. Considérons la mixte plaçant $\tfrac12$, $\tfrac13$ et $\tfrac16$ sur celles-ci.

> *« **Pour trouver l'équivalente comportementale, nous calculons simplement la probabilité INDUITE que chaque action soit prise CONDITIONNELLEMENT à ce que l'ensemble d'information où elle est disponible AIT ÉTÉ ATTEINT.** »*

| L'ensemble d'information | Le calcul |
|---|---|
| **Le premier** *(nécessairement atteint)* | $L$ avec probabilité $\tfrac12$ *(la pure $LL$)*, $R$ avec $\tfrac13+\tfrac16=\tfrac12$ |
| **Le second** | *« il n'est atteint que par les pures **$RL$ et $RR$** »* ⟹ conditionnellement : $L$ avec $\dfrac{1/3}{1/3+1/6}=\boxed{\tfrac23}$ et $R$ avec $\boxed{\tfrac13}$ |

> **La figure 7.24(d)** représente donc : $L$ et $R$ à $\tfrac12$ au premier ensemble, $L$ à $\tfrac23$ et $R$ à $\tfrac13$ au second.

⚠️ **La méthode générale** : diviser la probabilité totale des pures qui **prennent l'action** par celle des pures qui **atteignent l'ensemble d'information**.

</details>

### 11.4 La mémoire parfaite

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.18 — Mémoire parfaite</span>

*(perfect recall)* $\Gamma$ a la **mémoire parfaite** si, chaque fois que deux nœuds $x$ et $y=(x,a,a_1,\dots,a_k)$ appartiennent **à un même joueur**, alors **chaque nœud dans le même ensemble d'information que $y$ est de la forme**

$$w=(z,\ a,\ a_1',\dots,a_l')$$

**pour un certain nœud $z$ dans le même ensemble d'information que $x$**.

</div>

> *« **La mémoire parfaite dit que CHAQUE JOUEUR SE SOUVIENT TOUJOURS DE CE QU'IL SAVAIT DANS LE PASSÉ sur l'histoire du jeu.** »*

> *« En particulier, la définition implique que **deux histoires quelconques que l'ensemble d'information d'un joueur ne lui permet pas de distinguer ne peuvent différer QUE PAR LES ACTIONS PRISES PAR LES AUTRES JOUEURS. Donc, en particulier, AUCUN joueur n'OUBLIE JAMAIS une action qu'il a lui-même prise.** »*

<details class="details--riche">
<summary>

**Le contre-exemple de la figure 7.25 — quand l'équivalence tombe**

</summary>

> **La figure 7.25 — un jeu SANS mémoire parfaite.** *« La mémoire parfaite échoue parce que $x$ et $y=(x,L)$ appartiennent tous deux au joueur 1, et pourtant $w=(x,R)$ est dans le MÊME ensemble d'information que $y$. Ainsi, **le joueur 1 ne peut pas distinguer entre les deux histoires $(x,L)$ et $(x,R)$ MÊME SI ELLES DIFFÈRENT PAR UNE ACTION PASSÉE DE LUI-MÊME**. »*

**Pourquoi l'équivalence tombe** : considérons la mixte plaçant $\tfrac12$ sur chacune des pures $Ll$ et $Rr$.

> *« **Il n'y a AUCUNE stratégie comportementale équivalente**, parce que toute telle comportementale **doit placer une probabilité positive sur $L$ ET $R$** au premier ensemble d'information, et **aussi sur $l$ ET $r$** au second. **Mais elle placera alors AUSSI une probabilité positive sur les nœuds terminaux $(L,r)$ et $(R,l)$, ce que la mixte originale ne fait PAS.** »*

⚠️ **La mixte crée une CORRÉLATION entre les deux ensembles d'information que la comportementale, qui randomise indépendamment à chaque tour, ne peut pas reproduire.**

</details>

> *« **À cause de l'équivalence dans les jeux à mémoire parfaite, nous avons le LUXE d'utiliser celle qui est la plus commode. Par conséquent, nous restreindrons notre attention aux ensembles de stratégies COMPORTEMENTALES.** »*

## 🔴 Concept 12 — La définition 7.19 et le théorème 7.6 (Selten)

### 12.1 La définition

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.19 — Équilibre parfait en sous-jeux</span>

Une stratégie comportementale jointe $b$ est un **équilibre parfait en sous-jeux** du jeu fini $\Gamma$ si **elle induit un équilibre de Nash dans CHAQUE sous-jeu de $\Gamma$**.

</div>

⚠️ **Deux conséquences pratiques de l'équivalence :**

> *« **Parce que comportementales et mixtes sont équivalentes dans les jeux à mémoire parfaite, LE THÉORÈME 7.1 garantit qu'une comportementale constitue un équilibre de Nash d'un jeu (ou d'un sous-jeu) SI AUCUN JOUEUR N'A DE STRATÉGIE PURE donnant un paiement plus élevé** étant données les comportementales des autres. **Ce fait est utile à la fois pour VÉRIFIER et pour CALCULER les équilibres parfaits en sous-jeux.** »*

> *« L'équivalence garantit aussi que **dans les jeux à mémoire parfaite, TOUT équilibre parfait en sous-jeux est un équilibre de Nash**. »*

### 12.2 Le théorème 7.6

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 7.6 — (Selten) Existence d'un équilibre parfait en sous-jeux</span>

**Tout jeu fini sous forme extensive à MÉMOIRE PARFAITE possède un équilibre parfait en sous-jeux.**

</div>

<details class="details--riche">
<summary>

**La preuve — un algorithme à rebours sur les sous-jeux**

</summary>

> *« La preuve emploie **une technique rappelant l'algorithme d'induction à rebours**. Nous construirons la stratégie comportementale désirée **par étapes, en travaillant de la FIN du jeu vers le DÉBUT**. »*

| Pas | Le contenu |
|---|---|
| **1** | *« **Choisir un sous-jeu qui ne contient AUCUN sous-jeu sauf lui-même.** Ceci est toujours possible parce que **le jeu est fini**. »* |
| **2** | *« Par le **théorème 7.2**, ce sous-jeu a un équilibre de Nash **en stratégies mixtes**. »* |
| **3** | *« Parce que **le jeu original a la mémoire parfaite, le sous-jeu l'a aussi**, et donc la mixte a **une contrepartie COMPORTEMENTALE équivalente**. Bien sûr, **étant équivalente, elle constitue aussi un équilibre de Nash** dans le sous-jeu. »* |
| **4** | *« **Remplacer le sous-jeu par le vecteur de paiements déterminé par la stratégie d'équilibre.** Nous avons ainsi **réduit la TAILLE du jeu** et **déterminé cette partie de la stratégie comportementale globale**. »* |
| **5** | *« **Répéter** le processus pour le jeu réduit, et ainsi de suite. **Cet algorithme doit se TERMINER parce que le jeu est fini.** »* |

> *« Que la stratégie ainsi déterminée constitue un équilibre parfait en sous-jeux **découle d'une manière qui PARALLÈLE la première moitié de la preuve du théorème 7.5** — vous êtes invité à en remplir les détails en exercice. »* $\blacksquare$

⚠️ **L'hypothèse de mémoire parfaite est INDISPENSABLE** : *« **il est important de noter que l'hypothèse de mémoire parfaite ne peut PAS être abandonnée. Dans un jeu sans elle, un équilibre parfait en sous-jeux peut ne PAS exister.** »*

</details>

**L'illustration** *(figures 7.26(a)-(c))* : on isole le sous-jeu du joueur 2, on y trouve un équilibre, on le remplace par son vecteur de paiements ; le jeu réduit *« a un unique équilibre de Nash : **le joueur 1 choisit $M$ et $R$ avec probabilité $\tfrac12$ chacune, et le joueur 2 choisit $l$ et $r$ avec probabilité $\tfrac12$ chacune** »*.

> *« Notez comment **la perfection en sous-jeux fait écho au thème de l'induction à rebours, à savoir que LE JEU OPTIMAL TÔT est déterminé par CELUI PLUS TARD**. »*

## 🔴 Concept 13 — §7.3.7 : ce que la perfection en sous-jeux ne discipline pas

### 13.1 Le jeu de la figure 7.27

> **La figure 7.27 — « Tous les équilibres parfaits en sous-jeux ne sont pas sensés ».** Le joueur 1 choisit $L$ *(paiements $(0,5)$)*, $M$ *(vers le nœud $x$)* ou $R$ *(vers le nœud $y$)*. Le joueur 2, **sans savoir lequel de $x$ et $y$**, choisit $l$, $m$ ou $r$.

|  | $l$ | $m$ | $r$ |
|---|---|---|---|
| Après $M$ *(nœud $x$)* | $4,\ 0$ | $-1,\ 1$ | $0,\ 4$ |
| Après $R$ *(nœud $y$)* | $0,\ 4$ | $-1,\ 1$ | $4,\ 0$ |

⚠️ *« **Parce que le jeu n'a que LUI-MÊME comme sous-jeu, chacun de ses équilibres de Nash est AUSSI parfait en sous-jeux. Mais chacun de ces équilibres est-il SENSÉ ?** »*

### 13.2 L'équilibre absurde

> *« Considérez l'équilibre dans lequel **1 choisit $L$ et 2 choisit $m$. C'est clairement un équilibre de Nash** parce qu'aucun ne peut améliorer son paiement unilatéralement. **En particulier, 1 ne joue ni $M$ ni $R$ parce que 2 répondra par $m$, ce qui donnerait à 1 un paiement de $-1$ plutôt que le 0 obtenu en jouant $L$.** »*

> *« **Ainsi, LA MENACE que 2 jouera $m$ s'il en a l'occasion suffit à convaincre 1 de jouer $L$. MAIS LA MENACE DE 2 EST-ELLE CRÉDIBLE ?** »*

### 🔴 13.3 La réfutation par les croyances

Soient $p(x)$ et $p(y)$ les probabilités que 2 attribue aux nœuds $x$ et $y$ **sachant que c'est son tour** *(donc $p(x)+p(y)=1$)*. Ses espérances d'utilité sont

$$\mathbb{E}[l]=4\,p(y) \qquad \mathbb{E}[m]=1 \qquad \mathbb{E}[r]=4\,p(x)$$

> *« Parce qu'à ce stade nous ne connaissons pas les croyances de 2, **nous ne pouvons pas déterminer son choix. Cependant, NOUS POUVONS DIRE QU'IL NE CHOISIRA JAMAIS $m$.** C'est-à-dire, **QUELLES QUE SOIENT les valeurs de $p(x)$ et $p(y)$, $m$ ne maximise PAS son espérance d'utilité.** »*

**La démonstration, en une ligne** : la stratégie mixte $\tfrac12 l+\tfrac12 r$ donne

$$p(x)\Big[\tfrac12(0)+\tfrac12(4)\Big]+p(y)\Big[\tfrac12(4)+\tfrac12(0)\Big]=2\big(p(x)+p(y)\big)=\boxed{2}\ >\ 1$$

> *« **Ainsi, quelles que soient les croyances que 2 pourrait entretenir, AU MOINS L'UNE de $l$ ou $r$ produit une espérance STRICTEMENT plus élevée que $m$.** Par conséquent, contrairement à l'équilibre donné, **2 ne jouera PAS $m$ s'il est atteint. Cet équilibre parfait en sous-jeux n'est donc PAS sensé.** »*

### 13.4 Le diagnostic

> ⚠️ *« **La raison pour laquelle cet équilibre parfait en sous-jeux échoue à être sensé est que LA PERFECTION EN SOUS-JEUX NE DISCIPLINE PAS LE COMPORTEMENT DU JOUEUR 2 À SON ENSEMBLE D'INFORMATION NON ATTEINT. Elle échoue à le discipliner parce que cet ensemble non atteint N'EST PAS UN SINGLETON et NE DÉFINIT DONC PAS UN SOUS-JEU.** »*

> *« Cependant, **en introduisant des CROYANCES pour le joueur 2 sur les nœuds de son ensemble d'information une fois celui-ci atteint, nous POUVONS sensément discipliner son comportement. Ceci peut avoir un IMPACT PROFOND sur l'ensemble des issues d'équilibre.** »*

*(L'exercice associé demande de montrer que **le seul** équilibre parfait en sous-jeux où $m$ reçoit la probabilité zéro a **1 jouant $L$ avec probabilité zéro**.)*

## 🔴 Concept 14 — Les croyances et les trois principes

### 14.1 Le système de croyances et l'évaluation

Pour un nœud de décision $x$, $p(x)$ désigne **la probabilité que le joueur $\iota(x)$ assigne à l'histoire $x$ CONDITIONNELLEMENT à ce que $I(x)$ ait été atteint**, avec

$$\sum_{x\in I(y)}p(x)=1 \qquad\text{pour tout nœud de décision } y$$

> *« La fonction $p(\cdot)$ est appelée un **SYSTÈME DE CROYANCES** parce qu'elle **incorpore les croyances de TOUS les joueurs à CHACUN de leurs ensembles d'information** sur l'histoire du jeu. »*

**Sur le dessin** : *« en plaçant la probabilité assignée à chaque nœud **à côté du nœud et entre CROCHETS** »*.

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION DE VOCABULAIRE.</span>

⚠️ *« Il est commode de donner le nom d'**ÉVALUATION** *(assessment)* à un couple système de croyances / stratégie comportementale $(p,b)$. **Les croyances $p$ sont interprétées comme celles entretenues par les joueurs ÉTANT DONNÉ que la stratégie $b$ est jouée.** »*

</div>

**La question** : *« **QUELLES ÉVALUATIONS SONT SENSÉES ?** »*

### 14.2 Le premier principe : la règle de Bayes

> *« Pour qu'une évaluation $(p,b)$ soit sensée, **le système de croyances $p$ doit être DÉRIVÉ de la stratégie $b$ en utilisant la RÈGLE DE BAYES CHAQUE FOIS QUE C'EST POSSIBLE**. »*

En notant $P(x\mid b)$ la probabilité que $x$ soit atteint étant donné $b$ :

$$\boxed{\;p(x)=\frac{P(x\mid b)}{\displaystyle\sum_{y\in I}P(y\mid b)}\;}$$

> *« **chaque fois que le dénominateur est positif — c'est-à-dire chaque fois que l'ensemble d'information est atteint avec probabilité POSITIVE selon $b$.** »*

$$\textbf{PRINCIPE 1 : « Les croyances doivent être dérivées des stratégies par la règle de Bayes QUAND C'EST POSSIBLE. »}$$

<details class="details--riche">
<summary>

**La figure 7.28 — l'illustration par les fréquences**

</summary>

La stratégie du joueur 1 place les probabilités $\tfrac4{15}$ et $\tfrac2{15}$ sur ses deux choix les plus à gauche, et $\tfrac3{15}$, $\tfrac1{15}$, $\tfrac5{15}$ sur les trois autres. L'ensemble d'information du joueur 2 contient **les trois nœuds de droite**.

> *« **Pour voir pourquoi la règle de Bayes a du sens, imaginez ce jeu joué 1500 FOIS avec la stratégie représentée.** Sur les 1500 parties, en moyenne, **les deux choix les plus à gauche surviendraient $400+200=600$ fois, et les autres $300+100+500=900$ fois. Donc l'ensemble d'information de 2 serait atteint 900 fois.** »*

> *« Sur ces 900, **le nœud de gauche est atteint 300 fois, celui du milieu 100 fois, et celui de droite 500 fois. Ainsi, D'UN POINT DE VUE FRÉQUENTISTE** : »*

$$\alpha=\frac{300}{900}=\frac13 \qquad \beta=\frac{100}{900}=\frac19 \qquad \gamma=\frac{500}{900}=\frac59$$

</details>

### 🔴 14.3 Quand Bayes ne s'applique pas (figure 7.29)

> **La figure 7.29 — une restriction au-delà de Bayes.** Le joueur 1 joue **gauche avec probabilité $1$**, droite avec $0$. Le joueur 2 joue **gauche avec $\tfrac13$**, droite avec $\tfrac23$. L'ensemble d'information du joueur 3 porte les croyances $[\alpha]$ et $[1-\alpha]$.

> *« Étant données les stratégies, **l'ensemble d'information du joueur 3 N'EST PAS ATTEINT** (il l'est avec probabilité zéro). **Nous ne pouvons donc PAS appliquer formellement la règle de Bayes. Néanmoins, étant donnée la stratégie de 2, il SEMBLE y avoir une unique croyance sensée pour 3, à savoir $\alpha=\tfrac13$.** »*

**Le raisonnement, mot pour mot :**

> ⚠️ *« La raison est que **la stratégie comportementale de 2, STRICTEMENT INTERPRÉTÉE, signifie qu'il jouera à gauche avec probabilité $\tfrac13$ SI 1 JOUE À DROITE, même si 1 est censé jouer à gauche avec probabilité un. Ainsi, l'action mixte de 2 TIENT DÉJÀ COMPTE du fait que 1 doit DÉVIER de sa stratégie pour que celle de 2 entre en jeu.** »*

> *« **Par conséquent, quand 3 est atteint, sa seule croyance sensée est de placer la probabilité $\tfrac13$ sur le fait que 2 a joué à gauche.** »*

### 14.4 Les deux autres principes

> *« **Y a-t-il encore d'autres restrictions ? Eh bien, en un mot, OUI.** »*

Dans les jeux des **figures 7.30 et 7.31**, *« **tout choix de $\alpha$ et $\beta$ entre zéro et un suffit à rendre l'évaluation compatible avec Bayes**, et le type d'argument de la figure 7.29 est **simplement INDISPONIBLE**. **Néanmoins, il y a de bonnes raisons d'insister pour que dans chaque cas $\alpha=\beta$.** »*

> **PRINCIPE 2 — INDÉPENDANCE.** *« Les croyances doivent refléter que **les joueurs choisissent leurs stratégies INDÉPENDAMMENT**. »* **PRINCIPE 3 — CROYANCES COMMUNES.** *« Les joueurs ayant une **information identique** ont des **croyances identiques**. »*

<details class="details--riche">
<summary>

**Comment les deux principes donnent $\alpha=\beta$**

</summary>

**Dans la figure 7.30** — les deux principes sont nécessaires :

| Pas | L'argument |
|---|---|
| **1** | *« Quand l'ensemble de 2 est atteint, **$\alpha$ est la probabilité que 2 place sur le fait que 1 a choisi $L$** »* |
| **2** | *« Par le principe des **CROYANCES COMMUNES**, **le joueur 3 place AUSSI la probabilité $\alpha$ sur $L$ par 1 à ce point du jeu** (i.e. quand il reçoit exactement la même information que 2) »* |
| **3** | *« Mais **par INDÉPENDANCE des stratégies, apprendre le choix de stratégie du joueur 2 ne fournit à 3 AUCUNE information sur la stratégie choisie par 1** »* |
| **4** | *« Par conséquent, **les croyances de 3 sur 1 doivent rester INCHANGÉES même après avoir appris que 2 a choisi $L$. Mais ceci signifie $\beta=\alpha$.** »* |

**Dans la figure 7.31** — l'indépendance suffit :

> *« **Apprendre si 1 a joué Gauche ou Droite ne devrait PAS (par indépendance) affecter les croyances de 3 sur la probabilité que 2 ait choisi Gauche plutôt que Milieu**, c'est-à-dire $\alpha=\beta$. **Notez que le principe des croyances communes n'est PAS nécessaire ici parce que LES DEUX ENSEMBLES D'INFORMATION EN QUESTION APPARTIENNENT AU MÊME JOUEUR.** »*

> ⚠️ *(Note de bas de page 20.)* *« L'indépendance s'applique **même si l'ensemble unique de 2 en fig. 7.30 est scindé en DEUX singletons**. Dans ce cas, la décision de 2 **peut** dépendre du choix de 1, et apprendre si 2 a choisi $l$ ou $r$ **fournit** de l'information sur 1. **Mais ceci ne viole PAS l'indépendance parce que, dans le NOUVEAU jeu, l'ensemble de stratégies de 2 est $\{ll,lr,rl,rr\}$, PAS $\{l,r\}$** — et l'indépendance porte sur **quelle STRATÉGIE** 2 a choisie. »*

</details>

### 14.5 La définition 7.20 : la cohérence

**Vocabulaire** : une stratégie comportementale est **complètement mixte** si elle *« assigne une probabilité STRICTEMENT POSITIVE à CHAQUE action à CHAQUE ensemble d'information »*.

⚠️ *« Sous une stratégie complètement mixte, **CHAQUE ensemble d'information est atteint avec probabilité strictement positive. Par conséquent, pour de telles stratégies, LA RÈGLE DE BAYES SEULE détermine de manière UNIQUE les croyances.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.20 — Évaluations cohérentes</span>

Une évaluation $(p,b)$ est **cohérente** s'il existe **une suite de stratégies comportementales COMPLÈTEMENT MIXTES $b^n$ convergeant vers $b$**, telle que **la suite associée de systèmes de croyances $p^n$ INDUITS PAR LA RÈGLE DE BAYES converge vers $p$**.

</div>

### 🔴 14.6 Comment la cohérence formalise les trois principes

| Principe | Comment la cohérence le capture |
|---|---|
| **Bayes** | *« **la cohérence IMPLIQUE Bayes** »* *(exercice 7.43)*. *« En effet, **la cohérence est STRICTEMENT plus restrictive que Bayes, et même plus restrictive que Bayes DANS CHAQUE SOUS-JEU.** »* |
| **Indépendance** | *« en insistant pour que **les croyances soient dérivées de LIMITES DE STRATÉGIES COMPLÈTEMENT MIXTES, qui, PAR DÉFINITION, incorporent l'indépendance** »* |
| **Croyances communes** | *« chaque stratégie mixte jointe de la suite peut être pensée comme **une CROYANCE COMMUNE que — avant le jeu, quand tous les joueurs ont la même information — TOUS partagent sur la manière dont la stratégie pure jointe est choisie. L'évaluation limite est donc AUSSI une croyance commune.** »* |

### 14.7 L'équivalence de Kohlberg et Reny (1997)

> *« On pourrait craindre que **la définition plutôt MATHÉMATIQUE de la cohérence n'aille au-delà de ces principes de manières possiblement non voulues. Cependant, il s'avère que la cohérence peut être montrée ÉQUIVALENTE aux principes suivants.** »*

| # | Le principe |
|---|---|
| **(i)** | *« Les joueurs sont capables d'assigner des **probabilités RELATIVES, POSSIBLEMENT INFINIES**, à toute paire de stratégies pures jointes. »* |
| **(ii)** | *« Ces probabilités relatives satisfont **les lois standard de probabilité** (e.g. la règle de Bayes). »* |
| **(iii)** | *« Elles **coïncident avec celles d'un OBSERVATEUR EXTÉRIEUR** (croyances communes). »* |
| **(iv)** | *« Les probabilités relatives de l'observateur extérieur **NE CHANGERAIENT PAS après avoir observé l'issue d'un nombre FINI quelconque de situations stratégiques IDENTIQUES** (une forme d'indépendance liée à l'« **EXPÉRIENCE INFINIE** »). »* |

> ⚠️ *« **À notre avis, cette équivalence indique que la cohérence est une restriction IDÉALISÉE sur les croyances. Bien sûr, tous les cadres pratiques ne se conformeront pas à ces idéaux et il faut donc être PRUDENT à ne pas appliquer la cohérence de manière inappropriée. Cependant, si l'on vise à comprendre le comportement stratégique parmi des joueurs « rationnels » idéalisés, la cohérence est entièrement raisonnable.** »*

## 🔴 Concept 15 — La rationalité séquentielle et l'équilibre séquentiel

### 15.1 Le paiement conditionnel à un ensemble d'information

> *« Pour vérifier que $b_i$ est optimale **une fois $I$ atteint**, nous devons pouvoir calculer le paiement de toute autre stratégie qu'il pourrait employer **une fois $I$ atteint**. »*

**La construction** : pour chaque nœud $x$ de $I$, on calcule le paiement de $i$ **en partant de $x$** — *« **traitez simplement $x$ COMME S'IL définissait un sous-jeu** »* — noté $u_i(b\mid x)$. Puis, **les croyances donnant les poids** :

$$\boxed{\;v_i(p,b\mid I)\ \equiv\ \sum_{x\in I}p(x)\,u_i(b\mid x)\;}$$

<details class="details--riche">
<summary>

**Le calcul des figures 7.32 et 7.33 — l'exemple travaillé du livre**

</summary>

L'ensemble d'information $I$ du joueur 1 contient trois nœuds $x$, $y$, $z$, de croyances $p(x)=\tfrac12$, $p(y)=\tfrac13$, $p(z)=\tfrac16$. En traitant chacun séparément :

$$u_1(b\mid x)=\tfrac13(6)+\tfrac23(3)=4$$

$$u_1(b\mid y)=\tfrac13\Big[\tfrac34(8)+\tfrac14(12)\Big]+\tfrac23\big[0\big]=3$$

$$u_1(b\mid z)=\tfrac13\big[6\big]+\tfrac23\Big[\tfrac34(4)+\tfrac14(12)\Big]=6$$

D'où

$$v_1(p,b\mid I)=\tfrac12(4)+\tfrac13(3)+\tfrac16(6)=2+1+1=\boxed{4}$$

⚠️ **Deux niveaux d'espérance** : d'abord **à l'intérieur** de chaque nœud *(selon $b$)*, puis **entre** les nœuds *(selon $p$)*.

</details>

### 15.2 La définition 7.21

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.21 — Rationalité séquentielle</span>

Une évaluation $(p,b)$ est **séquentiellement rationnelle** si, **pour chaque joueur $i$, CHAQUE ensemble d'information $I$ de $i$, et chaque stratégie comportementale $b_i'$** :

$$v_i(p,b\mid I)\ \geq\ v_i\big(p,(b_i',b_{-i})\mid I\big)$$

On appelle aussi **$b$ séquentiellement rationnelle** s'il existe **un** système de croyances $p$ rendant $(p,b)$ séquentiellement rationnelle.

</div>

### 🔴 15.3 Le membre de phrase qui fait toute la différence

> *« Ainsi, une évaluation est séquentiellement rationnelle si **aucun joueur, EN AUCUN POINT DU JEU, n'a jamais d'incitation à changer sa stratégie**. »*

> ⚠️ *« **Notez bien que la phrase en italique « en aucun point du jeu » ne se réfère PAS SEULEMENT aux ensembles d'information atteints avec probabilité positive par $b$, MAIS À TOUS LES ENSEMBLES D'INFORMATION.** »*

**Appliqué à la figure 7.27 :**

> *« L'équilibre parfait en sous-jeux où 1 joue $L$ et 2 joue $m$ était absurde **précisément parce que 2 voudrait changer de $m$ SI son ensemble d'information était atteint**. **Cet équilibre absurde ne serait PAS éliminé si nous ne vérifiions l'optimalité qu'aux ensembles atteints avec probabilité positive. Mais quand nous insistons sur TOUS les ensembles, il EST éliminé.** »*

$$\text{Formellement : il n'existe AUCUN } p \text{ rendant cette } b \text{ séquentiellement rationnelle.}$$

### 🔴 15.4 Mais la rationalité séquentielle SEULE ne suffit pas (figure 7.34)

> *« **Y a-t-il des jeux possédant des stratégies séquentiellement rationnelles qui NE SONT PAS des équilibres parfaits en sous-jeux ? La réponse est OUI.** »*

> **La figure 7.34 — « matching pennies ».** *« Chaque joueur a une pièce et peut choisir de la placer **Face ou Pile** dans sa paume. **Le joueur 1 gagne la pièce de 2 si les pièces CORRESPONDENT**, et 2 gagne celle de 1 sinon. **Le joueur 1 choisit en premier, mais garde sa paume FERMÉE jusqu'à ce que 2 ait choisi.** »*

> *(Note de bas de page 22.)* *« **En effet, les joueurs font leurs choix SIMULTANÉMENT. Ce jeu extensif est donc ÉQUIVALENT au jeu sous forme stratégique** […] que nous avons appelé **le duel batteur-lanceur** ; il est plus communément connu dans la littérature sous le nom de **matching pennies**. **En ce sens, TOUT jeu sous forme stratégique peut être modélisé comme un jeu sous forme extensive dans lequel chaque joueur joue une fois dans un ordre fixe (mais arbitraire) et où aucun joueur n'est informé du choix des précédents.** »*

**L'unique équilibre de Nash (et donc parfait en sous-jeux)** : les deux randomisent à $\tfrac12$-$\tfrac12$.

**L'évaluation problématique** : *« **les deux joueurs choisissent Face avec probabilité 1, et les croyances de 2 placent la probabilité 1 sur le fait que 1 a choisi PILE** »*.

> *« Cette évaluation, **bien que N'ÉTANT PAS un équilibre de Nash, EST séquentiellement rationnelle** parce que **1 obtient son paiement le plus élevé possible, et que SELON LES CROYANCES DE 2, lui aussi obtient son paiement le plus élevé possible. C'est parce que, selon ses croyances, 1 a choisi Pile avec probabilité un. Par conséquent, en choisissant Face, le paiement de 2 est maximisé — À NOUVEAU, SELON SES CROYANCES.** »*

> ⚠️ *« Ainsi, **les évaluations séquentiellement rationnelles ne sont même pas nécessairement des équilibres de Nash. La difficulté avec cet exemple est clairement que LES CROYANCES DE 2 NE SONT PAS DÉRIVÉES DES STRATÉGIES VIA LA RÈGLE DE BAYES.** »*

### 15.5 La définition 7.22 et le théorème 7.7

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 7.22 — Équilibre séquentiel</span>

Une évaluation pour un jeu fini sous forme extensive est un **ÉQUILIBRE SÉQUENTIEL** si elle est **à la fois COHÉRENTE et SÉQUENTIELLEMENT RATIONNELLE**.

</div>

*(Introduit dans **Kreps et Wilson (1982)**.)*

$$\boxed{\;\textbf{ÉQUILIBRE SÉQUENTIEL} \ = \ \textbf{COHÉRENCE} \ + \ \textbf{RATIONALITÉ SÉQUENTIELLE}\;}$$

⚠️ **Appliqué à matching pennies** : *« parce que **les évaluations cohérentes satisfont bien Bayes**, l'unique équilibre séquentiel a **chaque joueur choisissant Face avec probabilité $\tfrac12$** »*.

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 7.7 — (Kreps et Wilson) Existence d'un équilibre séquentiel</span>

**Tout jeu fini sous forme extensive à MÉMOIRE PARFAITE possède au moins un équilibre séquentiel.** De plus, **si une évaluation $(p,b)$ est un équilibre séquentiel, alors la stratégie comportementale $b$ est un équilibre PARFAIT EN SOUS-JEUX.**

</div>

> *« Ce théorème, **d'une part indique la COHÉRENCE D'ENSEMBLE de la notion d'équilibre séquentiel, et d'autre part montre que l'équilibre séquentiel est bien une EXTENSION DE L'INDUCTION À REBOURS aux jeux extensifs généraux**. »*

**La hiérarchie complète des raffinements :**

$$\text{Nash} \ \supsetneq\ \text{parfait en sous-jeux} \ \supsetneq\ \text{séquentiel} \qquad\qquad \text{(et, en information parfaite : perfection} = \text{induction à rebours)}$$

## 🟠 Concept 16 — L'exemple 7.7 : « matching pennies sophistiqué »

### 16.1 Les règles

> *« Il y a **trois joueurs**, chacun en possession d'une pièce. **Le joueur 3 souhaite CORRESPONDRE au choix du joueur 1, et le joueur 1 souhaite exactement l'INVERSE. Le rôle du joueur 2 est d'« AIDER » 3 à deviner le choix de 1.** Vous pouvez penser 2 et 3 comme **des coéquipiers (bien que faisant des choix INDÉPENDANTS)** jouant contre 1. **Il y a quatre dollars en jeu.** »*

| Étape | Ce qui se passe |
|---|---|
| **1** | *« Le joueur 1 place **secrètement** sa pièce Face ou Pile. »* |
| **2** | *« Le joueur 2 fait de même. »* |
| **3** | *« 1 et 2 révèlent leurs pièces **à un ARBITRE** (en prenant soin de ne les révéler à 3). »* |
| **4** | *« **L'arbitre informe alors 3 de si les pièces de 1 et 2 CORRESPONDENT ou NON.** »* |
| **5** | *« 3 doit alors décider Face ou Pile. »* |

**Les paiements** : *« si le choix de 3 correspond à celui de 1, **1 paie 2 dollars à CHACUN de 2 et 3**. Sinon, **2 et 3 paient chacun 2 dollars à 1**. »*

**L'option de quitter** : *« **Quitter coûte deux dollars.** Si 1 quitte, il paie **un dollar** à chacun de 2 et 3 ; si 2 quitte, 2 et 3 paient chacun **un dollar** à 1. »*

⚠️ **L'information de 3** : il a **deux** ensembles d'information — *« bêta »* *(les pièces de 1 et 2 diffèrent)* et *« gamma »* *(elles correspondent)*.

### 16.2 Les inconnues

| Symbole | Ce qu'il désigne |
|---|---|
| $x$, $\bar x$ | probabilités que **1** joue Face, Pile |
| $y$, $\bar y$ | probabilités que **2** joue Face, Pile |
| $z_\beta$, $z_\gamma$ | probabilités que **3** joue Face à ses ensembles **bêta** et **gamma** |
| $\alpha_i$ | croyances de **2** |
| $\beta_i$, $\gamma_i$ | croyances de **3** |

> *« Nous chercherons un équilibre séquentiel dans lequel **chacun de $x,\bar x,y,\bar y,z_\beta,z_\gamma$ est STRICTEMENT entre zéro et un** et dans lequel **1 et 2 ne quittent JAMAIS**. **Bien sûr, il n'y a aucune garantie qu'un tel équilibre existe. Mais s'il y en a un, notre recherche le découvrira.** »*

### 16.3 La cohérence par Bayes

Sous ces hypothèses, *« **chaque ensemble d'information est atteint avec probabilité positive**, et donc pour que l'évaluation soit cohérente, **il SUFFIT que les croyances soient dérivées par la règle de Bayes** »* :

$$\alpha_1=x, \qquad \beta_1=\frac{x\bar y}{x\bar y+y\bar x}, \qquad \gamma_1=\frac{xy}{xy+\bar x\bar y} \tag{E.1}$$

### 🔴 16.4 Le principe de calcul

> *« La rationalité séquentielle exige que la stratégie de chaque joueur soit **maximisatrice à CHACUN de ses ensembles d'information**. Mais rappelez-vous le **FAIT IMPORTANT** que **SI UN JOUEUR MÉLANGE entre plusieurs choix ET qu'il maximise son paiement, ALORS IL DOIT ÊTRE INDIFFÉRENT entre ces choix. Nous utiliserons ce fait pour déterminer les stratégies.** »*

<details class="details--riche">
<summary>

**Les paiements conditionnels (E.2) et (E.3)**

</summary>

**Pour le joueur 1**, à son ensemble $I_1$ :

$$v_1(H\mid I_1)=y\big(-4z_\gamma+4(1-z_\gamma)\big)+\bar y\big(-4z_\beta+4(1-z_\beta)\big)$$

$$v_1(T\mid I_1)=y\big(4z_\beta-4(1-z_\beta)\big)+\bar y\big(4z_\gamma-4(1-z_\gamma)\big)$$

**Pour le joueur 2**, à son ensemble $I_2$ :

$$v_2(H\mid I_2)=x\big(2z_\gamma-2(1-z_\gamma)\big)+\bar x\big(-2z_\beta+2(1-z_\beta)\big)$$

$$v_2(T\mid I_2)=x\big(2z_\beta-2(1-z_\beta)\big)+\bar x\big(-2z_\gamma+2(1-z_\gamma)\big)$$

**Pour le joueur 3**, à ses deux ensembles :

$$v_3(H\mid I_3^\beta)=\frac{x\bar y}{x\bar y+y\bar x}(2)+\frac{y\bar x}{x\bar y+y\bar x}(-2) \qquad v_3(T\mid I_3^\beta)=\frac{x\bar y}{x\bar y+y\bar x}(-2)+\frac{y\bar x}{x\bar y+y\bar x}(2)$$

$$v_3(H\mid I_3^\gamma)=\frac{xy}{xy+\bar x\bar y}(2)+\frac{\bar x\bar y}{xy+\bar x\bar y}(-2) \qquad v_3(T\mid I_3^\gamma)=\frac{xy}{xy+\bar x\bar y}(-2)+\frac{\bar x\bar y}{xy+\bar x\bar y}(2)$$

</details>

### 16.5 La résolution

**Les quatre indifférences :**

$$v_1(H\mid I_1)=v_1(T\mid I_1), \quad v_2(H\mid I_2)=v_2(T\mid I_2), \quad v_3(H\mid I_3^\beta)=v_3(T\mid I_3^\beta), \quad v_3(H\mid I_3^\gamma)=v_3(T\mid I_3^\gamma)$$

> *« Parce que nous supposons qu'aucun ne quitte, $\bar x=1-x$ et $\bar y=1-y$. **Avec cela à l'esprit, nous pouvons utiliser les DEUX DERNIÈRES indifférences pour résoudre en $x$ et $y$, obtenant** »*

$$x=\bar x=y=\bar y=\tfrac12$$

> *« **Étant donné cela, les deux PREMIÈRES indifférences impliquent que $z_\beta=z_\gamma=\tfrac12$ également.** »*

**La vérification finale :**

> *« **Parce que 3 a exactement deux choix à chaque ensemble et qu'il est indifférent entre eux, son comportement est maximisateur.** Il reste seulement à vérifier que **1 et 2 maximisent — c'est-à-dire qu'aucun ne fait mieux en QUITTANT. C'est bien le cas parce qu'en quittant, ils obtiennent un paiement NÉGATIF, alors que choisir Face ou Pile donne un paiement de ZÉRO.** »*

$$\boxed{\;\text{L'évaluation dont CHAQUE entrée vaut } \tfrac12 \text{ est un ÉQUILIBRE SÉQUENTIEL.}\;}$$

### 🔴 16.6 La leçon économique

> *« Notez que dans cet équilibre, **chaque joueur reçoit un paiement de ZÉRO. Ainsi, LE JOUEUR 3 NE REÇOIT EN FAIT AUCUNE AIDE SIGNIFICATIVE DU JOUEUR 2, parce que sans le joueur 2, le jeu serait un matching pennies standard entre 1 et 3.** »*

> *« Dans les exercices, il vous est demandé de trouver **tous les autres équilibres séquentiels. Vous découvrirez que les joueurs 2 et 3 s'en tirent MIEUX dans d'autres équilibres.** »*

### 16.7 L'évaluation qui satisfait Bayes mais n'est PAS cohérente

<details class="details--riche">
<summary>

**L'exemple final — et pourquoi l'indépendance l'exclut**

</summary>

Considérons $(\alpha_1,\beta_1,\gamma_1;x,\bar x,y,\bar y,z_\beta,z_\gamma)=(1,0,0;\ 1,0,\ 0,0,\ 0,0)$ : **1 joue Face avec probabilité 1, 2 QUITTE avec probabilité 1, et 3 joue Pile avec probabilité 1.**

> *« Cette évaluation **semble plutôt STUPIDE** : bien que 1 soit sûr de jouer Face et que 3 veuille correspondre, **3 choisit Pile, quel que soit le choix de 2. Malgré cela, l'évaluation est SÉQUENTIELLEMENT RATIONNELLE et satisfait BAYES !** »*

| Joueur | Pourquoi il maximise |
|---|---|
| **1** | *« il maximise certainement **puisque 2 quitte** »* |
| **2** | *« étant données **ses croyances** (probabilité 1 sur Face par 1) et **la stratégie de 3** (Pile quoi qu'il arrive), **3 est certain de NE PAS correspondre. Il est donc préférable pour 2 de QUITTER.** »* |
| **3** | *« étant donné qu'il croit à chacun de ses ensembles que **1 a choisi Pile**, il est bien préférable de choisir Pile lui aussi »* |

**Bayes est satisfait** : *« le seul ensemble non singleton **atteint** par la stratégie est **celui de 2**, et ses croyances sont bien celles induites par Bayes »*.

> ⚠️ *« **Bien que cette évaluation satisfasse Bayes et soit séquentiellement rationnelle, ce N'EST PAS un équilibre séquentiel. En effet, elle n'est PAS COHÉRENTE.** »*

**L'argument intuitif par l'indépendance :**

Soient $b_1,b_2$ les nœuds gauche/droite de l'ensemble bêta de 3, et $g_1,g_2$ ceux de l'ensemble gamma.

| La question de 3 | La réponse forcée |
|---|---|
| *« Quelle est la vraisemblance de $g_1$ **relativement à** $b_2$ ? »* | **$g_1$ est INFINIMENT plus vraisemblable.** *(Reformulée : « Étant donné que 2 joue Face, quelle est la vraisemblance que 1 joue Face plutôt que Pile ? » — **par INDÉPENDANCE**, la réponse doit être la même que pour « Étant donné que 2 QUITTE… », et là **Face est infiniment plus vraisemblable**.)* |
| *« $b_1$ relativement à $g_2$ ? »* | *« Un argument analogue »* : $b_1$ est **infiniment** plus vraisemblable |
| *« $g_1$ relativement à $b_1$ ? »* | **Deux cas seulement.** Si $g_1$ est plus vraisemblable, alors *(via $b_1\ggg g_2$)* **$\gamma_2=0$**. Sinon, *(via $g_1\ggg b_2$)* **$\beta_2=0$**. |

> *« Par conséquent, **l'indépendance implique que SOIT $\gamma_2=0$, SOIT $\beta_2=0$. (Or les deux valent 1 dans l'évaluation donnée.)** »*

> *(Note 23.)* *« Dire qu'un événement est **infiniment plus vraisemblable** qu'un autre signifie simplement que **conditionnellement à ce que l'un des deux soit survenu, l'un reçoit la probabilité UN et l'autre la probabilité ZÉRO**. »*

</details>

<details class="details--riche">
<summary>

**La preuve formelle — l'identité algébrique de la CLAIM**

</summary>

> **CLAIM.** Si $(\alpha_1,\beta_1,\gamma_1,x,\bar x,y,\bar y,z_\beta,z_\gamma)$ est une évaluation **cohérente** pour matching pennies sophistiqué, alors les croyances satisfont
>
> $$\boxed{\;(\alpha_1)^2\,\beta_2\,\gamma_2\ =\ (\alpha_2)^2\,\beta_1\,\gamma_1\;}$$

⚠️ *« Notez que **quand $\alpha_1=1$** (comme dans l'évaluation analysée), **l'équation dit que l'un de $\beta_2$ ou $\gamma_2$ doit être ZÉRO** — précisément comme nous l'avons argumenté par l'indépendance. »*

**Preuve.** Par la définition 7.20, il existe une suite **complètement mixte** $x^n,\bar x^n,y^n,\bar y^n,z_\beta^n,z_\gamma^n$ convergeant vers les valeurs données, dont les croyances de Bayes $\alpha_1^n,\beta_1^n,\gamma_1^n$ convergent vers $\alpha_1,\beta_1,\gamma_1$.

**Pas 1 — l'identité.** *« Parce que toutes les probabilités sont **strictement positives** le long de la suite, nous avons l'IDENTITÉ »*

$$\left(\frac{x^n}{\bar x^n}\right)^{\!2}\cdot\frac{\bar x^ny^n}{x^n\bar y^n}\cdot\frac{\bar x^n\bar y^n}{x^ny^n}\ =\ 1 \qquad\text{pour tout } n$$

*(Vérification : les $y^n\bar y^n$ se simplifient, et $(x^n)^2/(\bar x^n)^2\cdot(\bar x^n)^2/(x^n)^2=1$.)*

**Pas 2 — Bayes le long de la suite.**

$$\frac{\alpha_1^n}{\alpha_2^n}=\frac{x^n}{\bar x^n}, \qquad \frac{\beta_2^n}{\beta_1^n}=\frac{\bar x^ny^n}{x^n\bar y^n}, \qquad \frac{\gamma_2^n}{\gamma_1^n}=\frac{\bar x^n\bar y^n}{x^ny^n}$$

**Pas 3 — substituer et réarranger.**

$$\big(\alpha_1^n\big)^2\beta_2^n\gamma_2^n=\big(\alpha_2^n\big)^2\beta_1^n\gamma_1^n \qquad\text{pour tout } n$$

> *« **Le résultat désiré suit maintenant en prenant la LIMITE des deux côtés quand $n$ tend vers l'infini.** »* $\blacksquare$

</details>

### 16.8 Le mot de la fin du chapitre

> *« **Nous avons exploré beaucoup d'idées dans ce chapitre, de la dominance à l'équilibre de Nash, jusqu'à l'équilibre séquentiel. Chemin faisant, nous espérons avoir donné au lecteur un sens de la RICHESSE de la théorie des jeux ainsi que de son TRÉMENDOUS POUVOIR d'éclairer les issues des situations stratégiques impliquant des joueurs rationnels.** »*

> *« **Dans le prochain chapitre, nous ferons bon usage des idées de théorie des jeux développées ici pour comprendre les CONSÉQUENCES ÉCONOMIQUES IMPORTANTES DES ASYMÉTRIES D'INFORMATION.** »*

⚠️ **C'est l'annonce des fiches 517-518** — et la réponse promise à la question de la voiture d'occasion du §7.3.

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « formuler ce jeu sous forme extensive » | **Définition 7.13** | Lister $N$, $A$, quelques histoires, $\iota$, les $I(x)$, les $u_i$ |
| « combien de stratégies pures ? » | **Définition 7.14** | Compter $\prod_{I\in\mathcal{I}_i}\|A(I)\|$ — **une action par ENSEMBLE**, pas par nœud |
| Un jeu séquentiel à information parfaite | **Induction à rebours** | Partir des **nœuds pénultièmes**, remplacer, recommencer |
| « qui gagne à ce jeu de retrait ? » | **Take-away** | Identifier les **positions perdantes** en remontant de la fin |
| « cet équilibre est-il crédible ? » | **Menace non crédible** | Vérifier si la menace serait **exécutée** si l'occasion venait |
| Un ensemble d'information non singleton | **L'induction à rebours ÉCHOUE** | Passer aux **sous-jeux** |
| « ce nœud définit-il un sous-jeu ? » | **Définition 7.16** | **Deux** conditions : singleton **et** clôture des ensembles d'information |
| « trouver les équilibres parfaits en sous-jeux » | **Définition 7.17/7.19** | Résoudre **chaque sous-jeu**, remplacer, remonter |
| Une stratégie mixte à convertir | **Exemple 7.6** | Diviser par la proba **d'atteindre** l'ensemble d'information |
| « ce jeu a-t-il la mémoire parfaite ? » | **Définition 7.18** | Un joueur **oublie-t-il** une de ses propres actions passées ? |
| Un ensemble d'information **non atteint** | **Équilibre séquentiel** | Introduire des **croyances** et exiger l'optimalité **là aussi** |
| « ces croyances sont-elles cohérentes ? » | **Définition 7.20** | Construire une suite **complètement mixte** et passer à la limite |
| Une évaluation à vérifier | **Définition 7.22** | **Cohérence ET rationalité séquentielle** — les deux |

**Les trois réflexes de cadrage :**

1. **Compter les ensembles d'information, pas les nœuds.** C'est la seule chose qui compte pour définir une stratégie.
2. **Chercher d'abord si le nœud est un singleton.** Sinon, ce n'est pas un sous-jeu, et l'induction à rebours ne s'y applique pas.
3. **Devant un équilibre suspect, demander : « ce sous-jeu est-il ATTEINT ? »** Si non, c'est là que Nash échoue et que la perfection — ou la séquentialité — mord.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Résoudre par induction à rebours

1. **Identifier tous les nœuds PÉNULTIÈMES** — ceux dont tous les suivants immédiats sont terminaux.
2. **Pour chacun, choisir l'action maximisant le paiement du joueur dont c'est le tour** ; noter $u^x$ le vecteur résultant.
3. **Effacer** tout ce qui suit strictement, et **remplacer $x$ par $u^x$** — $x$ devient terminal.
4. **Recommencer** sur le jeu réduit.
5. S'arrêter quand **chaque nœud de décision** a reçu une action.
6. **Écrire la stratégie COMPLÈTE**, y compris aux nœuds **non atteints** en équilibre.

### Méthode 2 — Compter les stratégies pures d'un joueur

$$|S_i|=\prod_{I\in\mathcal{I}_i}\big|A(I)\big|$$

⚠️ **Le produit porte sur les ENSEMBLES D'INFORMATION.** Un joueur ayant trois ensembles à deux actions chacun a $2^3=8$ stratégies pures — **même si certains ensembles ne sont jamais atteints**.

### Méthode 3 — Trouver les équilibres parfaits en sous-jeux

1. **Repérer tous les sous-jeux** *(définition 7.16 : singleton + clôture)*.
2. **Choisir un sous-jeu MINIMAL** — n'en contenant aucun autre que lui-même.
3. **Y trouver TOUS les équilibres de Nash** *(purs et mixtes)*.
4. **Pour chacun**, remplacer le sous-jeu par son vecteur de paiements.
5. **Remonter** ; recommencer.
6. **Chaque choix d'équilibre dans un sous-jeu engendre un équilibre parfait DIFFÉRENT** — les énumérer tous.

### Méthode 4 — Convertir mixte ↔ comportementale

**Mixte → comportementale**, pour l'action $a$ à l'ensemble $I$ :

$$b_i(a,I)=\frac{\text{probabilité totale des pures qui ATTEIGNENT } I \text{ ET jouent } a}{\text{probabilité totale des pures qui ATTEIGNENT } I}$$

⚠️ **Vérifier d'abord la MÉMOIRE PARFAITE** — sans elle, la conversion peut être impossible *(figure 7.25)*.

### Méthode 5 — Chercher un équilibre séquentiel complètement mixte

| Pas | Ce qu'on fait |
|---|---|
| **1** | **Poser les inconnues** : une probabilité par action, une croyance par nœud |
| **2** | **Écrire Bayes** pour chaque ensemble d'information *(atteint avec probabilité positive puisque tout est mixte)* — la **cohérence** s'y réduit |
| **3** | **Écrire les INDIFFÉRENCES** : un joueur qui mélange et maximise est **indifférent** entre les choix de son support |
| **4** | **Résoudre le système** — souvent en commençant par les indifférences du **dernier** joueur |
| **5** | **Vérifier les actions HORS support** *(ici : quitter)* — elles doivent donner **moins** |
| **6** | **Conclure** que l'évaluation est cohérente **et** séquentiellement rationnelle |

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que la forme extensive remplace la forme stratégique | **Tout jeu extensif fini A une forme stratégique** *(§7.3.4)* | Elles coexistent |
| 2 | Croire que le hasard peut jouer plusieurs fois | *« Chance **joue toujours en premier, et JUSTE UNE FOIS** »* | L'exemple du **Monopoly** montre que c'est sans perte |
| 3 | Croire que la condition sur le hasard est restrictive | *« **Ça ne l'est pas.** »* | 2000 nombres tirés d'avance |
| 4 | Oublier une des deux conditions de la partition $\mathcal{I}$ | $\iota(x)=\iota(x')$ **ET** $A(x)=A(x')$ | Sinon l'ensemble **révélerait** de l'information |
| 5 | Enfermer les singletons dans une ellipse | *« un nœud membre d'un singleton est **simplement laissé tel quel** »* | Convention de dessin |
| 6 | Confondre information parfaite et complète | **Parfaite** = tous les $I(x)$ sont **singletons** | « Complète » concerne les **paiements** *(§7.2.3)* |
| 7 | Croire qu'une stratégie ne prescrit qu'aux nœuds atteints | *« elle **continue de fournir des conseils MÊME s'il en a DÉVIÉ** dans le passé »* | Une stratégie est **complète** |
| 8 | Aux échecs, ne répondre qu'à l'ouverture attendue | *« il ne suffit PAS […] **MÊME SI vous êtes virtuellement certain** »* | Répondre à **toute séquence légale** |
| 9 | Faire dépendre l'action du **nœud** et non de l'ensemble | $s_i:\mathcal{I}_i\to A$ — le domaine est l'ensemble des **ensembles d'information** | Sinon on viole les contraintes informationnelles |
| 10 | Dans take-away, croire que le premier joueur gagne | **21 est une position PERDANTE** | Le **SECOND** joueur gagne toujours |
| 11 | Se tromper de positions perdantes | $1,5,9,13,17,21$ — **de 4 en 4** | On les trouve **en partant de la fin** |
| 12 | Croire que l'induction à rebours part du début | *« nous avons commencé l'analyse à la **FIN** »* | C'est toute la technique |
| 13 | Croire que tout équilibre de Nash est sensé | « rester dehors / combattre » est un **Nash** absurde | **Menace non crédible** |
| 14 | Définir la crédibilité par l'équilibre | *« il ne serait pas **dans l'intérêt** de l'incumbent de la **METTRE À EXÉCUTION** »* | On teste **l'exécution** |
| 15 | Croire que l'induction à rebours donne une **unique** solution | Le $\bar x$ de la preuve du thm 7.4 *« **n'a pas besoin d'être unique** »* ; les optima peuvent être **ex æquo** | Plusieurs stratégies possibles |
| 16 | Croire que le corollaire 7.1 vaut pour tout jeu | **Information PARFAITE** seulement | Le duel n'a **aucun** équilibre pur |
| 17 | Appliquer l'induction à rebours à un ensemble non singleton | *« **il n'est PAS DU TOUT clair quelle action est optimale** »* | Il faut la **perfection en sous-jeux** |
| 18 | Ne retenir qu'une condition dans la définition 7.16 | **Singleton** ET **tous les $z$ de $I(y)$ suivent $x$** | Fig. 7.20(b) est le contre-exemple |
| 19 | Croire que la perfection est un raffinement **faible** | *« ce raffinement est **STRICT** »* | Fig. 7.22 |
| 20 | Ne pas voir ce que la perfection ajoute | *« c'est **précisément son traitement des SOUS-JEUX NON ATTEINTS** »* | Nash discipline les sous-jeux **atteints** |
| 21 | Croire qu'un équilibre parfait en pures existe toujours | Fig. 7.23 *(matching pennies séquentiel)* n'en a **aucun** | Il faut **randomiser** |
| 22 | Confondre mixte et comportementale | **Mixte** : randomiser **une fois** au départ · **comportementale** : **à chaque tour** | Deux mécanismes distincts |
| 23 | Croire qu'elles sont toujours équivalentes | **Seulement avec la MÉMOIRE PARFAITE** | Fig. 7.25 est le contre-exemple |
| 24 | Convertir sans conditionner | Il faut **diviser par la probabilité d'ATTEINDRE l'ensemble** | D'où le $\tfrac23$ de l'exemple 7.6 |
| 25 | Mal énoncer la mémoire parfaite | *« **aucun joueur n'OUBLIE JAMAIS une action qu'il a lui-même prise** »* | Les histoires ne diffèrent que par les **autres** |
| 26 | Croire qu'on peut se passer de la mémoire parfaite au thm 7.6 | *« elle **ne peut PAS être abandonnée** »* | Sans elle, la perfection peut **ne pas exister** |
| 27 | Croire que la perfection suffit à tout | Fig. 7.27 : elle **ne discipline pas** un ensemble non atteint non singleton | D'où l'équilibre **séquentiel** |
| 28 | Ne pas voir pourquoi $m$ est exclu en fig. 7.27 | La mixte $\tfrac12l+\tfrac12r$ donne **2 quelles que soient les croyances**, contre 1 | Argument **indépendant des croyances** |
| 29 | Confondre système de croyances et stratégie | Une **évaluation** est **le COUPLE** $(p,b)$ | Vocabulaire du livre |
| 30 | Appliquer Bayes partout | *« **quand c'est possible** »* — seulement aux ensembles de probabilité **positive** | Fig. 7.29 |
| 31 | En fig. 7.29, croire que $\alpha$ est libre | La stratégie de 2, **strictement interprétée**, force $\alpha=\tfrac13$ | Elle tient déjà compte de la **déviation** de 1 |
| 32 | Oublier les principes d'indépendance et de croyances communes | Ils imposent $\alpha=\beta$ en fig. 7.30 et 7.31 | Bayes seul ne suffit pas |
| 33 | Croire que les croyances communes sont toujours nécessaires | En fig. 7.31, **non** — les deux ensembles sont **du même joueur** | Seule l'indépendance sert |
| 34 | Mal énoncer la cohérence | Suite **complètement mixte** $b^n\to b$ **et** croyances de Bayes $p^n\to p$ | Les **deux** convergences |
| 35 | Croire que cohérence = Bayes | *« **strictement plus restrictive**, et même plus que Bayes **dans chaque sous-jeu** »* | Cf. la CLAIM de l'exemple 7.7 |
| 36 | Ne tester la rationalité qu'aux ensembles atteints | *« **PAS SEULEMENT** […] **MAIS À TOUS** »* | C'est tout l'intérêt |
| 37 | Croire que la rationalité séquentielle suffit | Fig. 7.34 : elle n'est même pas **un équilibre de Nash** | Il faut **aussi** la cohérence |
| 38 | Oublier une des deux composantes de la définition 7.22 | **COHÉRENT + SÉQUENTIELLEMENT RATIONNEL** | Les deux, toujours |
| 39 | Croire qu'un équilibre séquentiel peut ne pas être parfait en sous-jeux | **Théorème 7.7** : il l'est **toujours** | La hiérarchie est stricte |
| 40 | Dans l'exemple 7.7, poser des maximisations | **Poser des INDIFFÉRENCES** — un joueur qui mélange est indifférent | Le « fait important » |
| 41 | Oublier de vérifier les actions hors support | Il faut montrer que **quitter donne moins** | Paiement **négatif** vs **zéro** |
| 42 | Croire que le joueur 2 aide vraiment le joueur 3 | *« **3 ne reçoit AUCUNE aide significative** »* — chacun a zéro | Mais **d'autres équilibres** existent |

## 📌 Ultimate Review

**§7.3 — pourquoi la forme extensive.**

Deux exemples fondateurs : **TAKE-AWAY** *(21 pièces, on en retire 1, 2 ou 3, **qui prend la dernière PERD**)* — information **parfaite** ; et **LA VOITURE D'OCCASION** *(le vendeur répare ou non, puis fixe un prix ; l'acheteur voit **le prix** mais **pas la réparation**)* — information **imparfaite**.

**DÉFINITION 7.13 — les huit éléments :**

$$\Gamma=\big\langle N,\ A,\ X,\ E,\ \iota,\ \pi,\ \mathcal{I},\ (u_i)_{i\in N}\big\rangle$$

| # | L'élément | Le point à retenir |
|---|---|---|
| **1** | $N$ | **fini** |
| **2** | $A$ | **pas forcément fini** |
| **3** | $X$ | des **histoires** $(a_1,\dots,a_k)$, **fermées par troncature** ; $A(x)=\{a\mid(x,a)\in X\}$ |
| **4** | $A(x_0)$, $\pi$ | **le hasard joue EN PREMIER et UNE SEULE FOIS** *(cf. Monopoly)* |
| **5** | $E$ | les **nœuds terminaux** — *« une partie complète du début à la fin »* |
| **6** | $\iota$ | **à qui c'est le tour** |
| **7** | $\mathcal{I}$ | les **ensembles d'information** — **deux** conditions : même joueur, mêmes actions |
| **8** | $u_i:E\to\mathbb{R}$ | des utilités **VNM** |

> *« Vous apprécierez à quel point elle est **remarquablement COMPACTE**, surtout quand vous réaliserez que **virtuellement CHAQUE jeu de société jamais joué** est couvert par elle ! »*

**§7.3.1 — l'arbre.** Les ensembles d'information sont des **ellipses en pointillés** ; **les singletons ne sont PAS dessinés**.

$$\boxed{\;\text{tous les } I(x) \text{ sont SINGLETONS} \iff \textbf{INFORMATION PARFAITE}\;}$$

**§7.3.2 — take-away.** Les positions **PERDANTES** : $1,5,9,13,17,21$.

⟹ **avec 21 pièces, LE SECOND JOUEUR gagne toujours.** Sa stratégie : *« retirer **juste assez** pour laisser une position perdante ; **sinon, retirer UNE pièce** »*.

> *« Nous avons commencé l'analyse **à la FIN**. **Cette technique est au cœur de nombreux concepts de solution. Elle s'appelle l'INDUCTION À REBOURS.** »*

**§7.3.3 — DÉFINITION 7.14.** Une stratégie pure est **une FONCTION** $s_i:\mathcal{I}_i\to A$ avec $s_i(I(x))\in A(x)$.

⚠️ *« Elle **continue de fournir des conseils même s'il en a DÉVIÉ** dans le passé. »* Et l'exemple des **échecs** : il faut répondre à **toute séquence légale**, *« même si vous êtes virtuellement certain »* de l'ouverture.

**§7.3.4** — $(S_i,u_i)_{i\in N}$ est **LA FORME STRATÉGIQUE DE $\Gamma$** ⟹ **tous les concepts du §7.2 s'appliquent**.

**§7.3.5 — l'induction à rebours.**

**L'ENTRANT ET L'INCUMBENT** : statu quo $(0,2)$ · entrer + combattre $(-1,-1)$ · entrer + acquiescer $(1,1)$. ⟹ **par induction : ENTRER / ACQUIESCER.**

**DÉFINITION 7.15** : partir des nœuds **PÉNULTIÈMES**, choisir l'action maximisante, **remplacer par $u^x$**, répéter. *« La **finitude** garantit que le processus se termine. »*

**THÉORÈME 7.4 (KUHN)** :

$$\boxed{\;\text{toute stratégie d'induction à rebours est un ÉQUILIBRE DE NASH}\;}$$

*Preuve : par l'absurde, l'ensemble des nœuds où $i$ ferait mieux est **non vide** ; prendre $\bar x$ **sans suiveur strict** dans cet ensemble ⟹ (1) $\bar x$ appartient à $i$, (2) tout ce qui suit est déjà optimal ⟹ le paiement en $\bar x$ **est le paiement d'induction à rebours, donc le plus grand possible** ⟹ contradiction.*

**COROLLAIRE 7.1** : **tout jeu fini à information PARFAITE a un équilibre de Nash en stratégies PURES.**

⚠️ **MAIS LA RÉCIPROQUE EST FAUSSE.** « Rester dehors / **combattre** » est aussi un équilibre de Nash — **absurde**, car

> *« il ne serait **PAS DANS L'INTÉRÊT** de l'incumbent de **METTRE À EXÉCUTION** la menace si l'occasion lui en était donnée »*

$$\text{INDUCTION À REBOURS} = \text{le raffinement qui élimine les MENACES NON CRÉDIBLES}$$

**§7.3.6 — la perfection en sous-jeux** *(Selten 1965, 1975)*.

**Le blocage** *(fig. 7.17)* : à un ensemble non singleton, *« il n'est **pas du tout clair** quelle action est optimale »*. *« **Pour déterminer le jeu optimal TARD, nous devons d'abord comprendre comment le jeu se déroule TÔT.** »*

**L'idée de Selten** : *« **considérer le SOUS-JEU comme un jeu à part entière** »*.

**DÉFINITION 7.16 — un sous-jeu** : **(i)** $I(x)=\{x\}$ **et (ii)** tout $z$ dans l'ensemble d'information d'un suiveur $y$ de $x$ **suit aussi $x$**. ⟹ *« **chaque joueur, à chaque tour, SAIT si $x$ a été atteint** »*.

**DÉFINITION 7.17/7.19** : $s$ *(ou $b$)* induit **un équilibre de Nash dans CHAQUE sous-jeu**.

⚠️ **Raffinement STRICT de Nash** — et la raison, mot pour mot :

> *« **C'est PRÉCISÉMENT le traitement par la perfection en sous-jeux des SOUS-JEUX NON ATTEINTS qui explique sa distinction d'avec l'équilibre de Nash.** »*

**THÉORÈME 7.5** : en information **parfaite**, **perfection en sous-jeux $=$ induction à rebours**.

**Fig. 7.23** : **un équilibre parfait en PURES peut ne pas exister** *(matching pennies séquentiel)*.

**MIXTE vs COMPORTEMENTALE :**

|  | Le mécanisme |
|---|---|
| **Mixte** $m_i$ | randomiser **UNE FOIS POUR TOUTES**, avant le jeu, sur $S_i$ |
| **Comportementale** $b_i(a,I)$ | randomiser **À CHAQUE TOUR**, sur $A(I)$ |

⚠️ **Elles sont ÉQUIVALENTES — sous la MÉMOIRE PARFAITE (déf. 7.18)** : *« aucun joueur n'oublie jamais une action qu'il a lui-même prise »*.

**La conversion** *(exemple 7.6)* : diviser par la probabilité **d'ATTEINDRE** l'ensemble d'information ⟹ le $\tfrac23$ de la figure 7.24(d).

**THÉORÈME 7.6 (SELTEN)** : **tout jeu fini à mémoire parfaite possède un équilibre parfait en sous-jeux.**

*Preuve : prendre un sous-jeu **minimal** ⟹ **thm 7.2** donne un Nash mixte ⟹ **mémoire parfaite** ⟹ contrepartie comportementale ⟹ remplacer par le vecteur de paiements ⟹ répéter.*

⚠️ *« **La mémoire parfaite ne peut PAS être abandonnée.** »*

**§7.3.7 — l'équilibre séquentiel** *(Kreps et Wilson 1982)*.

**Le problème (fig. 7.27)** : $L$ / $m$ est parfait en sous-jeux *(le jeu n'a que lui-même comme sous-jeu)* **mais absurde**. Car quelles que soient les croyances $p(x),p(y)$ :

$$\mathbb{E}[l]=4p(y),\quad \mathbb{E}[m]=1,\quad \mathbb{E}[r]=4p(x) \qquad\text{et}\qquad \tfrac12l+\tfrac12r \text{ donne } \boxed{2}>1$$

> ⚠️ *« **La perfection en sous-jeux NE DISCIPLINE PAS le comportement de 2 à son ensemble NON ATTEINT, parce que celui-ci N'EST PAS UN SINGLETON et NE DÉFINIT DONC PAS UN SOUS-JEU.** »*

**LES OBJETS NOUVEAUX** : un **système de croyances** $p(x)$, et une **ÉVALUATION** $=(p,b)$.

**LES TROIS PRINCIPES sur les croyances :**

| # | Le principe |
|---|---|
| **1** | **BAYES** *« quand c'est possible »* : $p(x)=P(x\mid b)/\sum_{y\in I}P(y\mid b)$ |
| **2** | **INDÉPENDANCE** : *« les joueurs choisissent leurs stratégies **indépendamment** »* |
| **3** | **CROYANCES COMMUNES** : *« des joueurs ayant une **information identique** ont des **croyances identiques** »* |

**DÉFINITION 7.20 — COHÉRENCE** : il existe **une suite COMPLÈTEMENT MIXTE $b^n\to b$** dont les croyances **de Bayes $p^n$ convergent vers $p$**.

⚠️ *« **strictement plus restrictive que Bayes, et même plus restrictive que Bayes DANS CHAQUE SOUS-JEU** »*.

**L'équivalence de Kohlberg-Reny (1997)** — la cohérence équivaut à : **(i)** probabilités relatives **possiblement infinies** · **(ii)** lois standard de probabilité · **(iii)** coïncidence avec un **observateur extérieur** · **(iv)** invariance après **un nombre fini d'observations identiques**.

**Le paiement conditionnel :**

$$v_i(p,b\mid I)=\sum_{x\in I}p(x)\,u_i(b\mid x)$$

⚠️ **Deux niveaux d'espérance** : selon $b$ **à l'intérieur** de chaque nœud, selon $p$ **entre** les nœuds.

**DÉFINITION 7.21 — RATIONALITÉ SÉQUENTIELLE** : $v_i(p,b\mid I)\geq v_i(p,(b_i',b_{-i})\mid I)$ **pour TOUT ensemble d'information — atteint OU NON.**

**Fig. 7.34** : **la rationalité séquentielle SEULE ne suffit pas** — une évaluation où 2 croit *(à tort)* que 1 a joué Pile est séquentiellement rationnelle **sans même être un Nash**, *« parce que ses croyances ne sont pas dérivées par Bayes »*.

**DÉFINITION 7.22 :**

$$\boxed{\;\textbf{ÉQUILIBRE SÉQUENTIEL} = \textbf{COHÉRENT} + \textbf{SÉQUENTIELLEMENT RATIONNEL}\;}$$

**THÉORÈME 7.7 (KREPS-WILSON)** : **existence** dans tout jeu fini à **mémoire parfaite** ; et **tout équilibre séquentiel est parfait en sous-jeux**.

$$\text{Nash} \ \supsetneq\ \text{parfait en sous-jeux} \ \supsetneq\ \text{séquentiel}$$

**EXEMPLE 7.7 — matching pennies sophistiqué.** 3 veut **correspondre** à 1, 1 veut l'inverse, 2 « aide » 3 ; l'arbitre dit à 3 **si les pièces de 1 et 2 correspondent** ⟹ 3 a **deux** ensembles d'information, **bêta** et **gamma**. 1 et 2 peuvent **quitter** *(coût 2 \$)*.

**La méthode** : *« **si un joueur MÉLANGE et maximise, il est INDIFFÉRENT** »* ⟹ **poser les indifférences**, pas les maximisations.

**La solution** : $x=\bar x=y=\bar y=z_\beta=z_\gamma=\tfrac12$ et toutes les croyances $=\tfrac12$ ; **paiement zéro pour tous**.

⚠️ *« **3 ne reçoit AUCUNE aide significative de 2** — sans 2, ce serait un matching pennies standard entre 1 et 3. »*

**LA CLAIM finale** — une évaluation cohérente doit satisfaire

$$(\alpha_1)^2\beta_2\gamma_2=(\alpha_2)^2\beta_1\gamma_1$$

*Preuve : l'identité $\big(\tfrac{x^n}{\bar x^n}\big)^2\cdot\tfrac{\bar x^ny^n}{x^n\bar y^n}\cdot\tfrac{\bar x^n\bar y^n}{x^ny^n}=1$, plus Bayes le long de la suite, puis **passage à la limite**.*

⚠️ **Quand $\alpha_1=1$, elle force $\beta_2=0$ ou $\gamma_2=0$** — exactement ce que **l'indépendance** dictait intuitivement.

> *« Dans le prochain chapitre, nous ferons bon usage de ces idées pour comprendre **les conséquences économiques importantes des ASYMÉTRIES D'INFORMATION**. »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quels deux exemples ouvrent le §7.3, et que montrent-ils ?**

</summary>

**TAKE-AWAY** : 21 pièces, on en retire 1, 2 ou 3 alternativement, **il est impossible de passer**, **qui prend la dernière PERD**. Les joueurs jouent *« avec **pleine connaissance** des choix passés »* ⟹ **information PARFAITE**.

**LA VOITURE D'OCCASION** : le vendeur **répare ou non**, puis **fixe un prix**, puis l'informe. *« **L'acheteur n'a AUCUN moyen de savoir si les réparations ont été entreprises.** »* ⟹ **information IMPARFAITE**.

*(Note 4 : *« **Des prix plus élevés sont-ils un SIGNAL que la voiture a été réparée ? Si oui, comment un vendeur peu scrupuleux se comporterait-il ?** »* — l'annonce du chapitre 8.)*

</details>

<details class="details--riche">
<summary>

**2. Énoncer les huit éléments de la définition 7.13.**

</summary>

**1.** $N$ **fini** · **2.** $A$ *( pas forcément fini)* · **3.** $X$ : les **histoires**, avec $x_0$ et la clôture par **troncature** · **4.** $A(x_0)$ et $\pi$ pour **le hasard** · **5.** $E$ les **terminaux** · **6.** $\iota$ *(à qui le tour)* · **7.** $\mathcal{I}$ la **partition en ensembles d'information** · **8.** $u_i:E\to\mathbb{R}$ **VNM**.

$$\Gamma=\langle N,A,X,E,\iota,\pi,\mathcal{I},(u_i)_{i\in N}\rangle$$

*« Un nœud, ou histoire, est **simplement une description COMPLÈTE des actions prises jusqu'ici** »*, et $A(x)\equiv\{a\in A\mid(x,a)\in X\}$.

</details>

<details class="details--riche">
<summary>

**3. Pourquoi la partition $\mathcal{I}$ impose-t-elle DEUX conditions ?**

</summary>

Si $x,x'$ sont dans le même élément, alors **(i)** $\iota(x)=\iota(x')$ et **(ii)** $A(x)=A(x')$.

> *« Elles garantissent que **le joueur $\iota(x)$ ne peut PAS distinguer entre les histoires de $I(x)$** — ni **selon que c'est ou non son tour**, ni **selon l'ensemble des actions disponibles**. »*

⚠️ **Sans elles, la STRUCTURE de l'ensemble d'information révélerait de l'information.**

</details>

<details class="details--riche">
<summary>

**4. Pourquoi le hasard ne joue-t-il qu'une fois, et est-ce restrictif ?**

</summary>

> *« **Permettre au hasard un seul coup pourrait paraître restrictif. ÇA NE L'EST PAS.** »*

**L'argument du Monopoly** : dans une partie de 2 heures avec un lancer toutes les 5 secondes au plus, **2000 lancers** suffisent.

> *« **Nous pourrions faire choisir SECRÈTEMENT à un arbitre 2000 nombres AU DÉBUT, puis les révéler UN À LA FOIS. De cette manière, c'est SANS PERTE DE GÉNÉRALITÉ.** »*

</details>

<details class="details--riche">
<summary>

**5. Formaliser take-away.**

</summary>

$N=\{1,2\}$ ; $A=\{\bar a,r_1,r_2,r_3\}$ où $r_k$ = retirer $k$ pièces ; $A(x_0)=\{\bar a\}$ — *« pour modéliser formellement que **le hasard ne joue aucun rôle** »*.

Un nœud typique $\bar x=(\bar a,r_1,r_2,r_1,r_3,r_3)$ : *« il reste **11 pièces** et c'est le tour de **2** »*, donc $\iota(\bar x)=2$.

⚠️ **$I(x)=\{x\}$ pour TOUT $x$** — information parfaite.

Deux nœuds terminaux ont **21 pièces retirées** ; le gagnant reçoit $1$, le perdant $-1$.

</details>

<details class="details--riche">
<summary>

**6. Formaliser la voiture d'occasion, et écrire l'ensemble d'information clé.**

</summary>

$N=\{S,B\}$ ; $A=\{$réparer, ne pas réparer, prix élevé, prix bas, accepter, refuser$\}$ ; le hasard est **simplement éliminé**.

Au nœud $x=(\text{réparer},\text{prix élevé})$, $\iota(x)=B$, et

$$I(x)=\big\{(\text{réparer},\text{prix élevé}),\ (\text{ne pas réparer},\text{prix élevé})\big\}$$

> *« Quand $x$ est atteint, **l'acheteur est informé seulement que l'UNE des deux histoires est survenue ; il n'est PAS informé de laquelle**. »*

</details>

<details class="details--riche">
<summary>

**7. Quelles sont les conventions de dessin, et laquelle piège le plus ?**

</summary>

Cercles noircis = **nœuds** · lignes = **actions** · label = **à qui le tour** · nœud initial $C$ = **hasard** · vecteur après chaque terminal = **paiements**.

Les ensembles d'information sont des **ellipses en pointillés**.

⚠️ **La convention qui piège** : *« **les SINGLETONS ne sont PAS représentés en enfermant le nœud dans un cercle en pointillés. Un nœud membre d'un singleton est simplement LAISSÉ TEL QUEL.** »*

Et : *« quand le hasard ne joue aucun rôle, **nous l'éliminons complètement du diagramme** »*.

</details>

<details class="details--riche">
<summary>

**8. Définir information parfaite et imparfaite.**

</summary>

> *« Les jeux dans lesquels **chaque ensemble d'information est un SINGLETON** sont appelés **jeux à INFORMATION PARFAITE**. **TOUS les autres** sont des jeux à **information IMPARFAITE**. »*

⚠️ **Ne pas confondre avec l'information COMPLÈTE** *(§7.2.3)*, qui porte sur la connaissance des **paiements**.

</details>

<details class="details--riche">
<summary>

**9. Qu'est-ce qu'une stratégie doit contenir, informellement ?**

</summary>

*« Un premier coup ; un second coup **contingent à CHAQUE premier coup potentiel de 1 ET à chaque réponse potentielle de 2**, et ainsi de suite. »*

⚠️ **Le point capital** :

> *« **La stratégie d'un joueur CONTINUE de fournir des conseils MÊME S'IL en a (par erreur ou délibérément) DÉVIÉ dans le passé.** »*

**L'exemple** : *« retirer une pièce si le nombre restant est impair, deux s'il est pair »* — *« **même si 1 dévie en retirant deux pièces à son premier coup, la stratégie continue de fournir des conseils** »*.

</details>

<details class="details--riche">
<summary>

**10. Résoudre take-away.**

</summary>

| Pièces | Statut | Pourquoi |
|---|---|---|
| **1** | **PERDANTE** | *« il serait **forcé de retirer la dernière** »* |
| **2, 3, 4** | gagnantes | on peut laisser **1** à l'adversaire |
| **5** | **PERDANTE** | retirer 1, 2 ou 3 laisse **4, 3 ou 2** — toutes gagnantes |

$$\boxed{\;\text{Positions PERDANTES : } 1,\ 5,\ 9,\ 13,\ 17,\ 21\;}$$

⚠️ **21 étant perdante, LE SECOND JOUEUR gagne toujours.** Sa stratégie : *« **retirer juste assez pour laisser une position perdante ; sinon, retirer UNE pièce** »*.

</details>

<details class="details--riche">
<summary>

**11. Quelle est la leçon de méthode de take-away ?**

</summary>

> *« **Notez bien la technique. Plutôt que de commencer au DÉBUT avec les 21 pièces, nous avons commencé l'analyse à la FIN — avec une pièce, puis deux, et ainsi de suite.** »*

> *« **Cette technique est AU CŒUR de nombreux concepts de solution pour les jeux sous forme extensive. Elle s'appelle l'INDUCTION À REBOURS.** »*

</details>

<details class="details--riche">
<summary>

**12. Énoncer la définition 7.14 et justifier son domaine.**

</summary>

$$s_i:\ \mathcal{I}_i\to A \qquad\text{avec}\qquad s_i(I(x))\in A(x) \ \text{ pour tout } x \text{ tel que } \iota(x)=i$$

⚠️ **Pourquoi le domaine est $\mathcal{I}_i$ et non $X_i$** :

> *« **Le fait que le choix d'action ne puisse dépendre QUE de l'ENSEMBLE D'INFORMATION (par opposition aux HISTOIRES à l'intérieur) garantit que la stratégie reflète correctement les CONTRAINTES INFORMATIONNELLES.** »*

</details>

<details class="details--riche">
<summary>

**13. Que montre l'exemple des échecs ?**

</summary>

> *« Une **très petite partie** de votre stratégie pure exige de spécifier quel coup jouer après le premier coup des blancs. **Il ne suffit PAS de spécifier comment vous réagiriez à UNE SEULE ouverture — MÊME SI vous êtes VIRTUELLEMENT CERTAIN que ce sera leur premier coup.** »*

<div class="callout" data-kind="methode">

<span class="callout__lab">comment vous réagiriez à CHAQUE SÉQUENCE LÉGALE POSSIBLE de coups se terminant par un coup des blancs. ALORS SEULEMENT aurez-vous spécifié UNE SEULE stratégie pure.</span>

*« Vous devez spécifier »*

</div>

</details>

<details class="details--riche">
<summary>

**14. Comment une stratégie jointe détermine-t-elle un paiement ?**

</summary>

Le hasard joue $a_0$ ⟹ $x^1=a_0$ ⟹ $I(x^1)$ appartient à un joueur ⟹ il joue $s_1(I(x^1))$ ⟹ $x^2$ ⟹ …

> *« Nous continuons jusqu'à atteindre **INÉVITABLEMENT (parce que le jeu est FINI) un nœud terminal $e$** […] **La distribution $\pi$ de la Nature détermine l'ESPÉRANCE d'utilité $u_i(s)$.** »*

⟹ $(S_i,u_i)_{i\in N}$ est **LA FORME STRATÉGIQUE DE $\Gamma$** ⟹ **tous les concepts du §7.2 s'y appliquent**.

</details>

<details class="details--riche">
<summary>

**15. Quelle remarque de fond la note 9 contient-elle ?**

</summary>

> *« Notre impression antérieure que **les jeux sous forme stratégique n'étaient utiles que pour des situations sans dynamique** était plutôt **NAÏVE**. »*

> ⚠️ *« On pourrait soutenir **exactement l'INVERSE : que d'un point de vue théorique, il SUFFIT de considérer les jeux sous forme stratégique, parce que TOUS les jeux extensifs peuvent leur être RÉDUITS !** **Que la forme stratégique soit ou non SUFFISANTE pour mener l'analyse est un SUJET DE RECHERCHE ACTUEL.** »*

*(Le reste du §7.3 montre en pratique que non : Nash sur la forme stratégique laisse passer des menaces non crédibles.)*

</details>

<details class="details--riche">
<summary>

**16. Résoudre le jeu entrant-incumbent, et énoncer la conclusion.**

</summary>

| L'issue | Entrant | Incumbent |
|---|---|---|
| Rester dehors | $0$ | $2$ |
| Entrer + **combattre** | $-1$ | $-1$ |
| Entrer + **acquiescer** | $1$ | $1$ |

*« Supposons l'entrant entré. **Il est évidemment meilleur pour l'incumbent d'ACQUIESCER, car il reçoit 1 plutôt que $-1$.** »* Le jeu se réduit ⟹ l'entrant **entre** *(1 plutôt que 0)*.

$$\boxed{\;\text{ENTRER / ACQUIESCER}\;}$$

*(Note 10 : *« ici comme dans take-away, **on ne peut évaluer la solidité des coups précoces sans d'abord analyser le jeu tardif** »*.)*

</details>

<details class="details--riche">
<summary>

**17. Énoncer la définition 7.15.**

</summary>

Un nœud $x$ est **PÉNULTIÈME** si **tous les nœuds le suivant immédiatement sont terminaux**.

**L'algorithme** : pour chaque pénultième, poser $s_{\iota(x)}(x)$ = **une action maximisant le paiement de $\iota(x)$** ; noter $u^x$ le résultat ; **retirer** ce qui suit strictement et **assigner $u^x$ à $x$**, qui devient terminal ; **répéter**.

*(Note 13 : *« **la finitude garantit que ce processus se termine** »*.)*

> *« **Reflétée dans ces stratégies est l'idée que LES DÉCISIONS PRISES TÔT DOIVENT TENIR COMPTE DU JEU OPTIMAL DES JOUEURS FUTURS.** »*

</details>

<details class="details--riche">
<summary>

**18. Démontrer le théorème 7.4 (Kuhn).**

</summary>

**Par l'absurde** : $u_i(s_i',s_{-i})>u_i(s)$ pour un $i$.

1. Il existe une action $a_1$ de **la Nature** telle que les terminaux $e$ et $e'$ induits satisfont $u_i(e')>u_i(e)$.
2. ⟹ **l'ensemble des nœuds $x$ où $i$ ferait mieux avec une autre stratégie est NON VIDE** *(il contient $x=a_1$)*.
3. **Prendre $\bar x$ dans cet ensemble N'AYANT AUCUN SUIVEUR STRICT dedans** *(existe car l'ensemble est fini et non vide ; **pas forcément unique**)*.
4. ⟹ **(1)** $\bar x$ appartient à $i$ ; **(2)** *« toutes les actions dictées par $s_i$ aux nœuds de $i$ suivant strictement $\bar x$ **ne peuvent pas être améliorées** »*.
5. ⟹ dévier **en $\bar x$ seulement** ferait strictement mieux. **Mais le paiement de $s_i$ en $\bar x$ EST le paiement d'induction à rebours, donc le PLUS GRAND possible.** Contradiction. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**19. Énoncer le corollaire 7.1, et le comparer au §7.2.**

</summary>

**Tout jeu fini sous forme extensive à information PARFAITE possède un équilibre de Nash en stratégies PURES.**

**Pourquoi** : *« **l'algorithme d'induction à rebours se termine TOUJOURS** »* ⟹ il produit une stratégie jointe, qui par le **théorème 7.4** est un Nash.

⚠️ **Le contraste** : le **duel batteur-lanceur** *(jeu simultané, fiche 515)* **n'a AUCUN équilibre pur**. **L'information parfaite change tout.**

</details>

<details class="details--riche">
<summary>

**20. Qu'est-ce qu'une menace non crédible ?**

</summary>

Dans le jeu entrant-incumbent, à côté de l'induction à rebours, il existe l'équilibre de Nash **« l'entrant reste dehors / l'incumbent combat en cas d'entrée »**.

> *« **Ce dernier est ABSURDE parce qu'il implique une MENACE de combattre qui N'EST PAS CRÉDIBLE. La menace manque de crédibilité parce qu'il ne serait PAS DANS L'INTÉRÊT de l'incumbent de la METTRE À EXÉCUTION si l'occasion lui en était donnée. L'entrant devrait voir à travers cela et ENTRER.** »*

> *« **C'est précisément cette capacité d'ANTICIPATION qui est AUTOMATIQUEMENT INCORPORÉE dans les stratégies d'induction à rebours.** »*

</details>

<details class="details--riche">
<summary>

**21. Pourquoi l'objection au résultat $(0,0)$ de la figure 7.14 ne tient-elle pas ?**

</summary>

> *« Il peut paraître **ÉTRANGE** que la solution donne zéro à chacun alors qu'il est possible d'obtenir **3** en jouant « à droite » chaque fois que possible. »*

> *« **Cependant, ce serait sûrement une ERREUR pour le joueur 2 de jouer $r'$, parce que LE JOUEUR 1 CHOISIRA RATIONNELLEMENT $L''$ en $y$, non $R''$.** Ainsi, **2, ANTICIPANT correctement, fait mieux de choisir $l'$, ce qui lui donne zéro, SURPASSANT l'alternative de $-1$.** »*

⚠️ *(Note 12 :* *« si des **accords contraignants** étaient possibles, cela **DEVRAIT être inclus dans le jeu dès le départ**. Ce n'est pas présent, donc **ce n'est simplement pas disponible**. »*)*

</details>

<details class="details--riche">
<summary>

**22. Pourquoi l'induction à rebours échoue-t-elle à la figure 7.17 ?**

</summary>

À l'ensemble d'information du joueur 2, *« **il n'est PAS DU TOUT clair quelle action est optimale**, parce que **sa meilleure action dépend de l'action prise par 1** »* — et *« **PAR DÉFINITION de l'ensemble d'information, 2 NE SAIT PAS** laquelle »*.

**La circularité** :

> *« Nous résolvons à rebours parce que **pour déterminer le jeu optimal TÔT, il faut comprendre le jeu TARD. Mais ici, L'INVERSE est AUSSI vrai : pour déterminer le jeu TARD, il faut comprendre le jeu TÔT.** »*

⟹ *« nous devons **déterminer SIMULTANÉMENT** le jeu optimal en des points plus tôt et plus tard »*.

</details>

<details class="details--riche">
<summary>

**23. Comment Selten résout-il le blocage ?**

</summary>

> *« **L'idée est de considérer LE SOUS-JEU COMME UN JEU À PART ENTIÈRE.** »*

Le sous-jeu de la figure 7.18 a **deux équilibres purs** : $(L,l)\to(1,3)$ et $(R,r)\to(3,1)$. En choisissant $(L,l)$, on **remplace le sous-jeu par $(1,3)$** ; alors 1 choisit **OUT** *(2 plutôt que 1)*.

**Les stratégies** : 1 joue **OUT** puis **$L$** ; 2 joue **$l$**.

⚠️ *« Si nous avions choisi l'AUTRE équilibre du sous-jeu, **les stratégies seraient tout à fait différentes. Néanmoins, elles seraient AUSSI parfaites en sous-jeux.** »*

</details>

<details class="details--riche">
<summary>

**24. Énoncer la définition 7.16 et l'illustrer.**

</summary>

$x$ **définit un sous-jeu** si **(i)** $I(x)=\{x\}$ et **(ii)** *« chaque fois que $y$ est un nœud de décision suivant $x$, et que $z$ est dans l'ensemble d'information contenant $y$, **alors $z$ suit AUSSI $x$** »*.

> *« Ainsi, **chaque joueur, à chaque tour, SAIT si $x$ a été atteint**. »*

**Fig. 7.20(b) — le contre-exemple** : *« $y$ et $z$ sont tous deux dans l'ensemble d'information du joueur 3, **et pourtant SEUL $y$ suit $x$** »*.

Le sous-jeu $\Gamma_x$ *« **hérite** de sa structure informationnelle et de ses paiements de $\Gamma$ »*.

</details>

<details class="details--riche">
<summary>

**25. Qu'est-ce que la perfection ajoute exactement à Nash ?**

</summary>

**DÉF. 7.17/7.19** : $s$ *(ou $b$)* induit **un Nash dans CHAQUE sous-jeu**. C'est un raffinement **STRICT** *(fig. 7.22)*.

> ⚠️ *(Note 17.)* *« Bien que le paiement de 2 puisse être augmenté **dans le sous-jeu**, il ne peut PAS l'être dans le jeu original, **parce que le sous-jeu N'EST PAS ATTEINT par les stratégies originales**. En effet, **les équilibres de Nash induisent des Nash dans TOUS les sous-jeux ATTEINTS. Ainsi, C'EST PRÉCISÉMENT LE TRAITEMENT DES SOUS-JEUX NON ATTEINTS qui explique la distinction.** »*

</details>

<details class="details--riche">
<summary>

**26. Démontrer le théorème 7.5.**

</summary>

**Sens 1 (induction ⟹ perfection).** *« Dans un jeu à information parfaite, **CHAQUE nœud définit un sous-jeu** »* ; $\Gamma_x$ est **encore à information parfaite** et la stratégie induite y est **encore d'induction à rebours** ⟹ **théorème 7.4** ⟹ c'est un Nash de $\Gamma_x$.

**Sens 2 (perfection ⟹ induction).**

- Un nœud **pénultième** définit un **sous-jeu à UN SEUL JOUEUR** ⟹ la perfection y force **un choix maximisant** ⟹ **cohérent avec l'algorithme**.
- Un nœud $x$ n'ayant que des pénultièmes après lui définit un sous-jeu où tout ce qui suit est déjà d'induction ⟹ la perfection force **un choix maximisant EN $x$, étant donné que les choix suivants sont d'induction**.
- *« **En remontant l'arbre de cette manière, on établit le résultat.** »* $\blacksquare$

</details>

<details class="details--riche">
<summary>

**27. Un équilibre parfait en stratégies pures existe-t-il toujours ?**

</summary>

⚠️ **NON.** **Figure 7.23** — matching pennies joué en séquence :

|  | $l$ | $r$ |
|---|---|---|
| $L$ | $1,-1$ | $-1,1$ |
| $R$ | $-1,1$ | $1,-1$ |

> *« **Parce que le SEUL sous-jeu est le jeu lui-même, l'ensemble des équilibres parfaits purs COÏNCIDE avec celui des Nash purs. Or parmi les quatre stratégies jointes possibles, AUCUNE n'est un Nash.** »*

⟹ *« **nous devons donner aux joueurs l'occasion de RANDOMISER** »*.

</details>

<details class="details--riche">
<summary>

**28. Opposer stratégie mixte et stratégie comportementale.**

</summary>

|  | Le mécanisme |
|---|---|
| **MIXTE** | *« Assigner à chaque **pure** une probabilité et, **AVANT que le jeu commence**, choisir l'une d'elles. **Vous randomisez UNE FOIS POUR TOUTES.** Une fois la pure choisie, **aucune randomisation supplémentaire**. »* |
| **COMPORTEMENTALE** | *« Employer un dispositif **CHAQUE FOIS que c'est votre tour**, sur votre **ensemble COURANT d'actions**. **Vous pouvez choisir un dispositif DIFFÉRENT à chaque tour.** »* |

$$m_i:S_i\to[0,1],\ \textstyle\sum_{s_i}m_i(s_i)=1 \qquad\qquad b_i(a,I)\in[0,1],\ \textstyle\sum_{a\in A(I)}b_i(a,I)=1$$

</details>

<details class="details--riche">
<summary>

**29. Quand sont-elles équivalentes, et comment convertir ?**

</summary>

> *« **Pour tous les jeux qui nous concernent, il n'y a AUCUNE différence. D'un point de vue stratégique, elles sont ENTIÈREMENT ÉQUIVALENTES** »* — c'est-à-dire **sous la MÉMOIRE PARFAITE**.

**La conversion mixte → comportementale** *(exemple 7.6)* : *« **calculer la probabilité INDUITE que chaque action soit prise CONDITIONNELLEMENT à ce que l'ensemble d'information ait été ATTEINT** »*.

Avec $\tfrac12$ sur $LL$, $\tfrac13$ sur $RL$, $\tfrac16$ sur $RR$ : au **premier** ensemble, $L$ et $R$ à $\tfrac12$ ; au **second** *(atteint seulement par $RL$ et $RR$)*, $L$ à $\dfrac{1/3}{1/2}=\tfrac23$ et $R$ à $\tfrac13$.

</details>

<details class="details--riche">
<summary>

**30. Énoncer la mémoire parfaite et son contre-exemple.**

</summary>

**DÉF. 7.18** : si $x$ et $y=(x,a,a_1,\dots,a_k)$ appartiennent au **même joueur**, alors tout nœud dans l'ensemble de $y$ est de la forme $w=(z,a,a_1',\dots,a_l')$ avec $z$ dans l'ensemble de $x$.

> *« **Chaque joueur SE SOUVIENT TOUJOURS de ce qu'il savait dans le passé. […] AUCUN joueur n'OUBLIE JAMAIS une action qu'il a lui-même prise.** »*

**Fig. 7.25** : $x$ et $y=(x,L)$ sont à 1, mais $w=(x,R)$ est dans **le même ensemble que $y$** ⟹ *« 1 ne peut pas distinguer $(x,L)$ de $(x,R)$ **même si elles diffèrent par une action PASSÉE DE LUI-MÊME** »*.

**La conséquence** : la mixte $\tfrac12 Ll+\tfrac12 Rr$ **n'a AUCUNE comportementale équivalente** — toute comportementale mettrait aussi du poids sur $(L,r)$ et $(R,l)$.

</details>

<details class="details--riche">
<summary>

**31. Démontrer le théorème 7.6 (Selten).**

</summary>

**Tout jeu fini à MÉMOIRE PARFAITE possède un équilibre parfait en sous-jeux.**

1. *« **Choisir un sous-jeu qui ne contient AUCUN sous-jeu sauf lui-même** — toujours possible parce que le jeu est fini. »*
2. Par le **théorème 7.2**, il a un Nash **en mixtes**.
3. *« Parce que le jeu original a la mémoire parfaite, **le sous-jeu l'a aussi**, donc la mixte a **une contrepartie COMPORTEMENTALE équivalente** — qui est **aussi un Nash**. »*
4. **Remplacer** le sous-jeu par le vecteur de paiements ⟹ le jeu est **réduit**.
5. **Répéter** ; *« l'algorithme doit se **TERMINER** parce que le jeu est fini »*.

⚠️ *« **La mémoire parfaite ne peut PAS être abandonnée.** »*

</details>

<details class="details--riche">
<summary>

**32. Pourquoi l'équilibre $L$/$m$ de la figure 7.27 est-il absurde ?**

</summary>

Il **est** parfait en sous-jeux *(le jeu n'a que lui-même comme sous-jeu)*. Mais avec des croyances $p(x),p(y)$ :

$$\mathbb{E}[l]=4p(y), \qquad \mathbb{E}[m]=1, \qquad \mathbb{E}[r]=4p(x)$$

**La mixte $\tfrac12l+\tfrac12r$ donne**

$$p(x)\Big[\tfrac12(0)+\tfrac12(4)\Big]+p(y)\Big[\tfrac12(4)+\tfrac12(0)\Big]=2\big(p(x)+p(y)\big)=2\ >\ 1$$

⚠️ *« **Ainsi, QUELLES QUE SOIENT ses croyances, AU MOINS L'UNE de $l$ ou $r$ produit strictement plus que $m$.** »* ⟹ **2 ne jouera JAMAIS $m$.**

</details>

<details class="details--riche">
<summary>

**33. Quel est le diagnostic exact de cet échec ?**

</summary>

> ⚠️ *« **LA PERFECTION EN SOUS-JEUX NE DISCIPLINE PAS le comportement du joueur 2 à son ensemble d'information NON ATTEINT. Elle échoue parce que cet ensemble N'EST PAS UN SINGLETON et NE DÉFINIT DONC PAS UN SOUS-JEU.** »*

> *« Cependant, **en introduisant des CROYANCES pour 2 sur les nœuds de son ensemble, nous POUVONS sensément discipliner son comportement. Ceci peut avoir un IMPACT PROFOND sur l'ensemble des issues d'équilibre.** »*

</details>

<details class="details--riche">
<summary>

**34. Définir le système de croyances et l'évaluation.**

</summary>

$p(x)$ = *« la probabilité que $\iota(x)$ assigne à l'histoire $x$ **conditionnellement à ce que $I(x)$ ait été atteint** »*, avec $\sum_{x\in I(y)}p(x)=1$.

> *« $p(\cdot)$ est un **SYSTÈME DE CROYANCES** parce qu'il incorpore les croyances de **tous les joueurs à chacun de leurs ensembles** sur l'histoire du jeu. »*

⚠️ **ÉVALUATION** *(assessment)* $=$ **le COUPLE $(p,b)$** — *« les croyances $p$ sont celles entretenues **étant donné que $b$ est jouée** »*.

**Sur le dessin** : les croyances entre **CROCHETS**, les probabilités d'action entre **PARENTHÈSES**.

</details>

<details class="details--riche">
<summary>

**35. Énoncer le premier principe et l'illustrer par les fréquences.**

</summary>

$$\textbf{« Les croyances doivent être dérivées des stratégies par la RÈGLE DE BAYES QUAND C'EST POSSIBLE. »}$$

$$p(x)=\frac{P(x\mid b)}{\sum_{y\in I}P(y\mid b)} \qquad\text{si le dénominateur est positif}$$

**Fig. 7.28** : sur **1500 parties**, les deux choix gauches surviennent $400+200=600$ fois, les trois autres $300+100+500=900$ fois ⟹ l'ensemble de 2 est atteint **900** fois ⟹

$$\alpha=\tfrac{300}{900}=\tfrac13, \qquad \beta=\tfrac{100}{900}=\tfrac19, \qquad \gamma=\tfrac{500}{900}=\tfrac59$$

</details>

<details class="details--riche">
<summary>

**36. Que se passe-t-il quand Bayes ne s'applique pas (figure 7.29) ?**

</summary>

L'ensemble du joueur 3 est atteint **avec probabilité zéro** ⟹ *« nous ne pouvons pas appliquer formellement Bayes »*. Pourtant $\alpha=\tfrac13$ est la **seule** croyance sensée.

> ⚠️ *« La raison est que **la stratégie de 2, STRICTEMENT INTERPRÉTÉE, signifie qu'il jouera à gauche avec probabilité $\tfrac13$ SI 1 JOUE À DROITE, même si 1 est censé jouer à gauche avec probabilité un. Ainsi, l'action mixte de 2 TIENT DÉJÀ COMPTE du fait que 1 doit DÉVIER pour que la sienne entre en jeu.** »*

</details>

<details class="details--riche">
<summary>

**37. Énoncer les deux autres principes et montrer qu'ils donnent $\alpha=\beta$.**

</summary>

**INDÉPENDANCE** : *« les croyances doivent refléter que **les joueurs choisissent leurs stratégies indépendamment** »*. **CROYANCES COMMUNES** : *« des joueurs ayant une **information identique** ont des **croyances identiques** »*.

**Fig. 7.30** *(les deux sont nécessaires)* : par **croyances communes**, 3 place aussi $\alpha$ sur $L$ par 1 ; **par indépendance, apprendre la stratégie de 2 ne dit RIEN sur celle de 1** ⟹ les croyances de 3 restent $\alpha$ ⟹ **$\beta=\alpha$**.

**Fig. 7.31** *(l'indépendance suffit)* : *« **les deux ensembles en question appartiennent au MÊME joueur** »*.

</details>

<details class="details--riche">
<summary>

**38. Énoncer la définition 7.20 et son rapport aux trois principes.**

</summary>

$(p,b)$ est **COHÉRENTE** s'il existe une suite de stratégies **COMPLÈTEMENT MIXTES** $b^n\to b$ dont les croyances **induites par Bayes** $p^n\to p$.

*(Une comportementale est **complètement mixte** si elle donne une probabilité **strictement positive à CHAQUE action à CHAQUE ensemble** ⟹ **tous les ensembles sont atteints** ⟹ **Bayes seul détermine $p^n$**.)*

| Principe | Comment la cohérence le capture |
|---|---|
| **Bayes** | *« la cohérence l'IMPLIQUE — et est **strictement plus restrictive**, même que Bayes **dans chaque sous-jeu** »* |
| **Indépendance** | Les $b^n$ **complètement mixtes** *« incorporent l'indépendance PAR DÉFINITION »* |
| **Croyances communes** | Chaque $b^n$ est *« **une croyance commune que TOUS partagent avant le jeu** »* ⟹ la limite aussi |

</details>

<details class="details--riche">
<summary>

**39. Quels sont les quatre principes équivalents de Kohlberg et Reny (1997) ?**

</summary>

**(i)** *« probabilités **relatives, possiblement INFINIES**, à toute paire de stratégies pures jointes »* · **(ii)** *« les **lois standard de probabilité** »* · **(iii)** *« coïncidence avec un **OBSERVATEUR EXTÉRIEUR** »* *(croyances communes)* · **(iv)** *« invariance après avoir observé **un nombre FINI de situations identiques** »* *(indépendance, « **expérience infinie** »)*.

> ⚠️ *« **La cohérence est une restriction IDÉALISÉE. Il faut être PRUDENT à ne pas l'appliquer de manière inappropriée. Mais si l'on vise à comprendre le comportement de joueurs « rationnels » idéalisés, elle est entièrement raisonnable.** »*

</details>

<details class="details--riche">
<summary>

**40. Calculer un paiement conditionnel à un ensemble d'information.**

</summary>

$$v_i(p,b\mid I)=\sum_{x\in I}p(x)\,u_i(b\mid x)$$

où $u_i(b\mid x)$ se calcule en *« **traitant $x$ COMME S'IL définissait un sous-jeu** »*.

**L'exemple des fig. 7.32-7.33** : $u_1(b\mid x)=\tfrac13(6)+\tfrac23(3)=4$ · $u_1(b\mid y)=\tfrac13\big[\tfrac34(8)+\tfrac14(12)\big]+\tfrac23[0]=3$ · $u_1(b\mid z)=\tfrac13[6]+\tfrac23\big[\tfrac34(4)+\tfrac14(12)\big]=6$, puis

$$v_1(p,b\mid I)=\tfrac12(4)+\tfrac13(3)+\tfrac16(6)=\boxed{4}$$

⚠️ **Deux niveaux d'espérance** : selon $b$, puis selon $p$.

</details>

<details class="details--riche">
<summary>

**41. Énoncer la rationalité séquentielle et souligner ce qui la distingue.**

</summary>

**DÉF. 7.21** : pour tout $i$, **tout ensemble $I$ de $i$**, et toute $b_i'$ :

$$v_i(p,b\mid I)\geq v_i\big(p,(b_i',b_{-i})\mid I\big)$$

> ⚠️ *« **Notez bien que « en aucun point du jeu » ne se réfère PAS SEULEMENT aux ensembles atteints avec probabilité positive, MAIS À TOUS LES ENSEMBLES D'INFORMATION.** »*

> *« **Cet équilibre absurde [fig. 7.27] ne serait PAS éliminé si nous ne vérifiions que les ensembles atteints. Mais quand nous insistons sur TOUS, il EST éliminé.** »*

</details>

<details class="details--riche">
<summary>

**42. Montrer que la rationalité séquentielle seule ne suffit pas.**

</summary>

**Fig. 7.34 — matching pennies.** L'unique équilibre de Nash *(et parfait)* est $\tfrac12$-$\tfrac12$.

**L'évaluation problématique** : *« les deux choisissent **Face** avec probabilité 1, et **les croyances de 2 placent la probabilité 1 sur PILE par 1** »*.

> *« Cette évaluation, **bien que N'ÉTANT PAS un équilibre de Nash, EST séquentiellement rationnelle** : 1 obtient son meilleur paiement, et **SELON SES CROYANCES**, 2 aussi. »*

⚠️ *« **La difficulté est clairement que les croyances de 2 NE SONT PAS DÉRIVÉES des stratégies via BAYES.** »*

*(Note 22 : **tout jeu sous forme stratégique peut être modélisé en forme extensive** en faisant jouer les joueurs dans un ordre arbitraire sans qu'aucun ne soit informé.)*

</details>

<details class="details--riche">
<summary>

**43. Énoncer la définition 7.22 et le théorème 7.7.**

</summary>

$$\boxed{\;\textbf{ÉQUILIBRE SÉQUENTIEL} = \textbf{COHÉRENT} \ + \ \textbf{SÉQUENTIELLEMENT RATIONNEL}\;}$$

*(Kreps et Wilson, 1982.)*

**THÉORÈME 7.7** : **existence** dans tout jeu fini à **mémoire parfaite** ; et **tout équilibre séquentiel est PARFAIT EN SOUS-JEUX**.

> *« Ce théorème, d'une part indique **la COHÉRENCE D'ENSEMBLE** de la notion, d'autre part montre qu'elle est bien **une EXTENSION de l'induction à rebours aux jeux extensifs généraux**. »*

$$\text{Nash} \supsetneq \text{parfait en sous-jeux} \supsetneq \text{séquentiel}$$

</details>

<details class="details--riche">
<summary>

**44. Décrire les règles de « matching pennies sophistiqué ».**

</summary>

**Trois joueurs.** *« **3 souhaite CORRESPONDRE au choix de 1, et 1 souhaite l'INVERSE. Le rôle de 2 est d'« AIDER » 3.** »* Quatre dollars en jeu.

**La séquence** : 1 place secrètement sa pièce · 2 fait de même · tous deux révèlent **à un ARBITRE** · **l'arbitre informe 3 de si les pièces de 1 et 2 CORRESPONDENT** · 3 choisit.

⟹ **3 a DEUX ensembles d'information** : « **bêta** » *(elles diffèrent)* et « **gamma** » *(elles correspondent)*.

**Les paiements** : si 3 correspond à 1, **1 paie 2 \$ à chacun** ; sinon **2 et 3 paient 2 \\$ chacun à 1**. **Quitter coûte 2 \$** *(1 \\$ à chacun des deux autres)*.

</details>

<details class="details--riche">
<summary>

**45. Quelle est la méthode de résolution, et quel est le résultat ?**

</summary>

**La cohérence** *(tous les ensembles atteints avec probabilité positive)* se réduit à **Bayes** :

$$\alpha_1=x, \qquad \beta_1=\frac{x\bar y}{x\bar y+y\bar x}, \qquad \gamma_1=\frac{xy}{xy+\bar x\bar y}$$

**Le principe de calcul** : *« **si un joueur MÉLANGE entre plusieurs choix ET maximise, alors IL DOIT ÊTRE INDIFFÉRENT entre eux** »* ⟹ **poser les quatre indifférences**.

Les **deux dernières** *(celles de 3)* donnent $x=\bar x=y=\bar y=\tfrac12$ ; **les deux premières** donnent alors $z_\beta=z_\gamma=\tfrac12$.

**La vérification** : *« **quitter donne un paiement NÉGATIF, alors que Face ou Pile donne ZÉRO** »*.

$$\boxed{\;\text{TOUTE entrée de l'évaluation vaut } \tfrac12\;}$$

⚠️ **La leçon** : *« **3 ne reçoit AUCUNE aide significative de 2** — sans 2, ce serait un matching pennies standard. »* *(Mais d'autres équilibres existent, où 2 et 3 font mieux.)*

</details>

<details class="details--riche">
<summary>

**46. Pourquoi l'évaluation « 1 joue Face, 2 quitte, 3 joue Pile » n'est-elle pas un équilibre séquentiel ?**

</summary>

Elle **est** séquentiellement rationnelle **et satisfait Bayes** : 1 maximise *(2 quitte)* · 2 maximise *(3 ne correspondra jamais, donc quitter)* · 3 maximise *(il croit que 1 a joué Pile)* · et le seul ensemble non singleton **atteint** est celui de 2, dont les croyances **sont** celles de Bayes.

⚠️ **Mais elle n'est pas COHÉRENTE — elle viole l'INDÉPENDANCE.**

L'argument : *« Étant donné que 2 joue **Face**, quelle est la vraisemblance que 1 joue Face **plutôt que** Pile ? »* — **par indépendance**, la réponse doit être la même que pour *« étant donné que 2 **QUITTE** »*, où **Face est infiniment plus vraisemblable**. ⟹ $g_1\ggg b_2$, et de même $b_1\ggg g_2$ ⟹ **soit $\gamma_2=0$, soit $\beta_2=0$** — alors que les deux valent 1.

</details>

<details class="details--riche">
<summary>

**47. Démontrer la CLAIM formellement.**

</summary>

> **CLAIM.** Une évaluation cohérente satisfait $(\alpha_1)^2\beta_2\gamma_2=(\alpha_2)^2\beta_1\gamma_1$.

**Preuve.** La cohérence donne une suite **complètement mixte** convergente.

**Pas 1 — l'identité**, valable car toutes les probabilités sont **strictement positives** :

$$\left(\frac{x^n}{\bar x^n}\right)^{\!2}\cdot\frac{\bar x^ny^n}{x^n\bar y^n}\cdot\frac{\bar x^n\bar y^n}{x^ny^n}=1$$

**Pas 2 — Bayes le long de la suite** :

$$\frac{\alpha_1^n}{\alpha_2^n}=\frac{x^n}{\bar x^n}, \qquad \frac{\beta_2^n}{\beta_1^n}=\frac{\bar x^ny^n}{x^n\bar y^n}, \qquad \frac{\gamma_2^n}{\gamma_1^n}=\frac{\bar x^n\bar y^n}{x^ny^n}$$

**Pas 3 — substituer** ⟹ $(\alpha_1^n)^2\beta_2^n\gamma_2^n=(\alpha_2^n)^2\beta_1^n\gamma_1^n$ pour tout $n$ ⟹ **passer à la limite**. $\blacksquare$

⚠️ **Quand $\alpha_1=1$** *(donc $\alpha_2=0$)*, l'équation force **$\beta_2=0$ ou $\gamma_2=0$** — exactement la conclusion de l'argument intuitif.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Ce qu'apporte la forme extensive ? | La **DYNAMIQUE** — les joueurs choisissent **en séquence** |
| La règle de take-away ? | 21 pièces, on en retire **1, 2 ou 3** ; **qui prend la dernière PERD** |
| Ce que l'acheteur de voiture voit ? | **Le PRIX**, mais **pas la RÉPARATION** |
| Les huit éléments de $\Gamma$ ? | $N$, $A$, $X$, $E$, $\iota$, $\pi$, $\mathcal{I}$, $(u_i)$ |
| Ce qu'est un nœud ? | *« Une description **COMPLÈTE des actions prises jusqu'ici** »* |
| $A(x)$ ? | $\{a\in A\mid(x,a)\in X\}$ — les actions disponibles après $x$ |
| Quand le hasard joue-t-il ? | **EN PREMIER et UNE SEULE FOIS** |
| L'argument qui le justifie ? | Le **MONOPOLY** — 2000 nombres tirés d'avance |
| Les deux conditions de $\mathcal{I}$ ? | $\iota(x)=\iota(x')$ **et** $A(x)=A(x')$ |
| Ce qu'elles garantissent ? | Le joueur ne peut distinguer **ni par le tour, ni par les actions** |
| Le type des $u_i$ ? | Des utilités **de von Neumann-Morgenstern** |
| La convention de dessin qui piège ? | Les **SINGLETONS ne sont PAS entourés** |
| Information **parfaite** ? | **TOUS** les $I(x)$ sont des **singletons** |
| Le contraste avec « complète » ? | « Complète » concerne les **paiements** *(§7.2.3)* |
| Les positions perdantes de take-away ? | $1,\ 5,\ 9,\ 13,\ 17,\ 21$ |
| Qui gagne avec 21 pièces ? | **LE SECOND JOUEUR**, toujours |
| Sa stratégie ? | *« Retirer **juste assez** pour laisser une perdante ; sinon **une** pièce »* |
| La technique employée ? | Partir **de la FIN** — l'**INDUCTION À REBOURS** |
| Définition 7.14 ? | Une **FONCTION** $s_i:\mathcal{I}_i\to A$ avec $s_i(I(x))\in A(x)$ |
| Le domaine est-il $X_i$ ? | **NON** — c'est $\mathcal{I}_i$, les **ensembles d'information** |
| Une stratégie prescrit-elle après une déviation ? | **OUI** — *« même s'il en a dévié dans le passé »* |
| Ce que montre l'exemple des échecs ? | Il faut répondre à **CHAQUE séquence légale**, pas à l'ouverture attendue |
| Ce qu'est la forme stratégique de $\Gamma$ ? | $(S_i,u_i)_{i\in N}$ — **tous les concepts du §7.2 s'y appliquent** |
| La question ouverte de la note 9 ? | *« La forme stratégique est-elle **SUFFISANTE** ? »* — sujet de **recherche actuel** |
| Le jeu entrant-incumbent, statu quo ? | $(0,\ 2)$ |
| Entrer + combattre ? | $(-1,-1)$ |
| Entrer + acquiescer ? | $(1,\ 1)$ |
| Sa solution par induction ? | **ENTRER / ACQUIESCER** |
| Ce qu'est un nœud **pénultième** ? | Tous ses suivants **immédiats** sont **terminaux** |
| L'algorithme d'induction à rebours ? | Optimiser aux pénultièmes, **remplacer par $u^x$**, répéter |
| Ce qui garantit qu'il se termine ? | La **FINITUDE** du jeu |
| Théorème 7.4 ? | **Toute stratégie d'induction à rebours est un ÉQUILIBRE DE NASH** |
| Son auteur ? | **Kuhn** |
| Le pas clé de sa preuve ? | Prendre $\bar x$ **sans suiveur strict** dans l'ensemble critique |
| $\bar x$ est-il unique ? | *« **il n'a pas besoin d'être unique** »* |
| Corollaire 7.1 ? | Tout jeu fini à **info PARFAITE** a un Nash **en stratégies PURES** |
| Le contraste avec le §7.2 ? | Le **duel batteur-lanceur** n'en a **aucun** |
| La réciproque du thm 7.4 ? | **FAUSSE** |
| L'exemple ? | *« Rester dehors / **COMBATTRE** »* |
| Pourquoi c'est absurde ? | **MENACE NON CRÉDIBLE** |
| Le test de crédibilité ? | Serait-elle **MISE À EXÉCUTION** si l'occasion venait ? |
| Ce que la note 12 rappelle ? | Les **accords contraignants** devraient être **DANS le jeu** dès le départ |
| Pourquoi l'induction échoue en info imparfaite ? | La meilleure action de 2 **dépend de ce que 1 a fait** — qu'il ne sait pas |
| La circularité mise à nu ? | Il faudrait connaître **TARD** pour décider **TÔT**, et **TÔT** pour décider **TARD** |
| L'idée de Selten ? | **Traiter le sous-jeu comme un jeu à part entière** |
| Ses références ? | **Selten (1965, 1975)** |
| Définition 7.16, les deux conditions ? | **(i)** $I(x)=\{x\}$ · **(ii)** tout $z$ dans $I(y)$ pour $y$ suivant $x$ **suit aussi $x$** |
| Ce qu'elle garantit ? | *« Chaque joueur **SAIT si $x$ a été atteint** »* |
| Ce dont $\Gamma_x$ hérite ? | Sa **structure informationnelle** et ses **paiements** |
| Définition 7.17/7.19 ? | Induit un **Nash dans CHAQUE sous-jeu** |
| Le raffinement est-il strict ? | **OUI** *(fig. 7.22)* |
| Ce qui explique la distinction avec Nash ? | **Le traitement des sous-jeux NON ATTEINTS** |
| Théorème 7.5 ? | En info **parfaite**, **perfection $=$ induction à rebours** |
| Le pas clé du sens ⟸ ? | Un pénultième définit un **sous-jeu à UN SEUL joueur** |
| Un équilibre parfait en PURES existe-t-il toujours ? | **NON** *(fig. 7.23)* |
| Stratégie **mixte** ? | Randomiser **UNE FOIS**, au départ, sur $S_i$ |
| Stratégie **comportementale** ? | Randomiser **À CHAQUE TOUR**, sur $A(I)$ |
| Quand sont-elles équivalentes ? | Sous la **MÉMOIRE PARFAITE** |
| La recette de conversion ? | Diviser par la probabilité **d'ATTEINDRE** l'ensemble d'information |
| Le résultat de l'exemple 7.6 ? | $\tfrac12$-$\tfrac12$ au premier ensemble, $\tfrac23$-$\tfrac13$ au second |
| Définition 7.18 ? | Chaque joueur **se souvient de ce qu'il savait** |
| Sa conséquence la plus parlante ? | *« **Aucun joueur n'oublie une action qu'il a lui-même prise** »* |
| Ce qui échoue en fig. 7.25 ? | La mixte $\tfrac12Ll+\tfrac12Rr$ **n'a aucune comportementale équivalente** |
| Pourquoi ? | La comportementale mettrait du poids sur $(L,r)$ et $(R,l)$ |
| Théorème 7.6 ? | **(Selten)** existence d'un équilibre parfait, sous **mémoire parfaite** |
| Le pas 1 de sa preuve ? | Prendre un sous-jeu **MINIMAL** |
| Le pas 2 ? | **Théorème 7.2** donne un Nash **mixte** |
| Le pas 3 ? | La **mémoire parfaite** donne l'équivalent **comportemental** |
| Peut-on abandonner la mémoire parfaite ? | **NON** — l'équilibre peut ne **pas exister** |
| Le problème de la figure 7.27 ? | $L$/$m$ est **parfait** mais **absurde** |
| Les trois espérances de 2 ? | $4p(y)$, $\ 1$, $\ 4p(x)$ |
| La mixte qui réfute $m$ ? | $\tfrac12l+\tfrac12r$, qui donne **2** |
| Pourquoi cet argument est fort ? | Il vaut **QUELLES QUE SOIENT** les croyances |
| Le diagnostic ? | L'ensemble non atteint **n'est pas un singleton** ⟹ **pas un sous-jeu** |
| Ce qu'est $p(x)$ ? | La probabilité de $x$ **conditionnelle** à l'atteinte de $I(x)$ |
| Ce qu'est une **ÉVALUATION** ? | **Le COUPLE $(p,b)$** |
| Les notations graphiques ? | Croyances entre **CROCHETS**, probabilités entre **PARENTHÈSES** |
| Le principe 1 ? | **BAYES** *« quand c'est possible »* |
| Que signifie « quand c'est possible » ? | Aux ensembles atteints avec probabilité **POSITIVE** |
| L'illustration de la fig. 7.28 ? | **1500 parties** ⟹ $\alpha=\tfrac13$, $\beta=\tfrac19$, $\gamma=\tfrac59$ |
| Ce que force la fig. 7.29 ? | $\alpha=\tfrac13$ — la stratégie de 2 **tient déjà compte de la déviation de 1** |
| Le principe 2 ? | **INDÉPENDANCE** des choix de stratégie |
| Le principe 3 ? | **CROYANCES COMMUNES** |
| Ce qu'ils imposent en fig. 7.30 et 7.31 ? | $\alpha=\beta$ |
| En fig. 7.31, a-t-on besoin des croyances communes ? | **NON** — les deux ensembles sont **du même joueur** |
| Ce qu'est une stratégie **complètement mixte** ? | Probabilité **strictement positive à chaque action à chaque ensemble** |
| Sa propriété ? | **Tous les ensembles sont atteints** ⟹ **Bayes seul** détermine $p$ |
| Définition 7.20 ? | Limite de **$b^n$ complètement mixtes** avec **$p^n$ de Bayes** convergentes |
| Cohérence $=$ Bayes ? | **NON** — *« strictement plus restrictive »*, même **par sous-jeu** |
| Les quatre principes équivalents ? | Probabilités **relatives infinies** · lois de proba · **observateur extérieur** · **expérience infinie** |
| Leurs auteurs ? | **Kohlberg et Reny (1997)** |
| Le jugement du livre là-dessus ? | Une restriction **IDÉALISÉE** — *« être prudent à ne pas l'appliquer inappropriément »* |
| La formule de $v_i(p,b\mid I)$ ? | $\sum_{x\in I}p(x)\,u_i(b\mid x)$ |
| Combien de niveaux d'espérance ? | **DEUX** — selon $b$, puis selon $p$ |
| Définition 7.21 ? | $v_i(p,b\mid I)\geq v_i(p,(b_i',b_{-i})\mid I)$ |
| Pour quels ensembles ? | **TOUS** — atteints **OU NON** |
| Ce que montre la fig. 7.34 ? | Séquentiellement rationnel **sans être un Nash** |
| Pourquoi ? | Les croyances de 2 **ne viennent pas de Bayes** |
| Ce que rappelle la note 22 ? | **Tout jeu stratégique** peut s'écrire en forme **extensive** |
| Définition 7.22 ? | **COHÉRENT + SÉQUENTIELLEMENT RATIONNEL** |
| Ses auteurs ? | **Kreps et Wilson (1982)** |
| Théorème 7.7 ? | **Existence** sous mémoire parfaite, et **tout séquentiel est parfait en sous-jeux** |
| La hiérarchie complète ? | Nash $\supsetneq$ **parfait en sous-jeux** $\supsetneq$ **séquentiel** |
| Ce que fait l'arbitre en matching pennies sophistiqué ? | Il dit à 3 **si les pièces de 1 et 2 correspondent** |
| Combien d'ensembles pour 3 ? | **DEUX** — « bêta » et « gamma » |
| Le principe de calcul d'un équilibre mixte ? | **Poser des INDIFFÉRENCES**, pas des maximisations |
| La solution de l'exemple 7.7 ? | **Toute entrée vaut $\tfrac12$** |
| Le paiement de chacun ? | **Zéro** |
| La leçon économique ? | **3 ne reçoit aucune aide significative de 2** |
| Ce qui manque à l'évaluation « 1 Face, 2 quitte, 3 Pile » ? | La **COHÉRENCE** — elle viole l'**indépendance** |
| L'égalité de la CLAIM ? | $(\alpha_1)^2\beta_2\gamma_2=(\alpha_2)^2\beta_1\gamma_1$ |
| Ce qu'elle force quand $\alpha_1=1$ ? | **$\beta_2=0$ ou $\gamma_2=0$** |
| L'annonce du chapitre 8 ? | Les **ASYMÉTRIES D'INFORMATION** |
