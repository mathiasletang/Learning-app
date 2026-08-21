# Fiche 521 — Ensembles et applications : logique, topologie de $\mathbb{R}^n$, Weierstrass et Brouwer

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — appendice mathématique, chapitre A1 « Sets and Mappings » (p. 495-528) |
| **Difficulté** | Intermédiaire — la boîte à outils de tout le livre |
| **Temps d'étude estimé** | 130 min |
| **Prérequis** | Aucun formellement · une familiarité avec le calcul différentiel à une variable aide |
| **Concepts clés** | Nécessité et suffisance, contraposée, preuve constructive, preuve par l'absurde, contre-exemple, ensemble, sous-ensemble, complémentaire, union, intersection, produit cartésien, $\mathbb{R}^n$, orthant non négatif, combinaison convexe, ensemble convexe, relation binaire, complétude, transitivité, fonction, image, image réciproque, injection, surjection, métrique euclidienne, boule ouverte, boule fermée, ensemble ouvert, ensemble fermé, frontière, intérieur, ensemble borné, borne inférieure, borne supérieure, compacité, continuité de Cauchy, suite, sous-suite, théorème de Weierstrass, point fixe, théorème de Brouwer |
| **Poids à l'examen** | La distinction **nécessaire / suffisant** et la **contraposée** · les **trois types de preuve** · la **définition A1.1** de la convexité et le **théorème A1.1** · les **définitions A1.2-A1.3** *(complétude, transitivité)* · la **métrique euclidienne** · les **définitions A1.4-A1.8** et les **théorèmes A1.2 à A1.5** · la **définition A1.9 de Cauchy** et le **théorème A1.6** · le **théorème A1.9** *(caractérisation séquentielle)* · le **théorème A1.10 de Weierstrass** avec sa preuve · le **théorème A1.11 de Brouwer**. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE A1 : la boite a outils de TOUT le livre

  §A1.1  ELEMENTS DE LOGIQUE

     NECESSAIRE :  « A est necessaire pour B »  =  A <= B
                   = « A si B » = « A est IMPLIQUE par B »
     SUFFISANT  :  « A est suffisant pour B »   =  A => B
                   = « A SEULEMENT SI B »

     LA CONTRAPOSEE :  A => B   equivaut a   non-B => non-A
     « La contraposition RENVERSE le sens de l'implication. »

     TROIS TYPES DE PREUVE :
        CONSTRUCTIVE (directe) · CONTRAPOSITIVE · PAR L'ABSURDE

     « LA PREUVE PAR L'EXEMPLE N'EST PAS UNE PREUVE. »
     MAIS un SEUL CONTRE-EXEMPLE suffit a REFUTER.

  §A1.2  THEORIE DES ENSEMBLES

     appartenance, inclusion, egalite, ensemble VIDE, complementaire,
     DIFFERENCE, UNION, INTERSECTION, ensemble d'INDICES
     PRODUIT :  S x T = {(s, t) | s dans S, t dans T}
     R^n, l'ORTHANT NON NEGATIF R^n_+, les notations >= et >>

     DEF. A1.1  ENSEMBLE CONVEXE :  t x1 + (1 - t) x2 dans S
                pour tout t dans [0, 1]

     « Un ensemble est convexe SSI on peut relier deux points
       quelconques par un SEGMENT DROIT ENTIEREMENT DANS L'ENSEMBLE. »

     THEOREME A1.1  L'INTERSECTION d'ensembles convexes est CONVEXE

     RELATIONS et FONCTIONS
        DEF. A1.2  COMPLETUDE   DEF. A1.3  TRANSITIVITE
        image · image RECIPROQUE · graphe · INJECTIVE · SURJECTIVE

  §A1.3  UN PEU DE TOPOLOGIE

     LA METRIQUE EUCLIDIENNE :  d(x1, x2) = racine((x1-x2).(x1-x2))

     DEF. A1.4  BOULES ouverte et fermee
     DEF. A1.5  OUVERT :  autour de CHAQUE point, une boule DEDANS
     THM A1.2   vide, R^n, UNION quelconque, intersection FINIE
     THM A1.3   TOUT ouvert est une REUNION DE BOULES OUVERTES
     DEF. A1.6  FERME :  son COMPLEMENTAIRE est OUVERT
     THM A1.4   vide, R^n, union FINIE, INTERSECTION quelconque

     FRONTIERE et INTERIEUR :
        OUVERT  <=>  S = int S      FERME  <=>  S = int S U frontiere

     DEF. A1.7  BORNE       THM A1.5  g.l.b. et l.u.b.
     DEF. A1.8  COMPACT  =  FERME  ET  BORNE   (Heine-Borel)

     DEF. A1.9  CONTINUITE DE CAUCHY :
                f( B_delta(x0) INTER D ) INCLUS DANS B_epsilon(f(x0))

     THM A1.6   f CONTINUE  <=>  l'IMAGE RECIPROQUE de tout ouvert
                est OUVERTE  ->  « c'est de la RANGE vers le DOMAINE
                que l'on peut dire quelque chose »
     THM A1.7   l'IMAGE CONTINUE d'un COMPACT est COMPACTE

     SUITES : convergence, bornitude, SOUS-SUITES
     THM A1.8  toute suite BORNEE a une SOUS-SUITE CONVERGENTE
     THM A1.9  caracterisation SEQUENTIELLE des ouverts, fermes,
               et de la CONTINUITE

  §A1.3.2  LES THEOREMES D'EXISTENCE

     THEOREME A1.10 (WEIERSTRASS) : f CONTINUE sur un COMPACT
     NON VIDE atteint son MINIMUM et son MAXIMUM

     THEOREME A1.11 (BROUWER) : f CONTINUE d'un COMPACT CONVEXE
     NON VIDE DANS LUI-MEME a AU MOINS UN POINT FIXE

     « Au moins UNE MOLECULE de votre cafe est EXACTEMENT
       la ou elle etait au depart ! »
```

> ⚠️ **Note de transcription — spécifique à cet appendice.** Le PDF exporte **le symbole d'INTERSECTION $\cap$ comme un « + »** — c'est **le piège majeur** de ce chapitre : *« $S+T\equiv\{x\mid x\in S \textbf{ et } x\in T\}$ »* signifie **$S\cap T$**, et *« $B_\delta(x^0)+D$ »* signifie **$B_\delta(x^0)\cap D$**. Il perd aussi $\gg$ *(« $x\ 0$ » signifie $x\gg0$)*, le barré de $\notin$ *(exporté « $\in/$ »)*, $\sum$, $\varepsilon$ et $\varepsilon'$ *(souvent confondus)*. Les figures utilisent l'encodage Symbol Mac (`ʝ` = $\cap$, `ʜ` = $\cup$, `Ն` = $\geq$, `ϩ` = « + », `Ϫ` = « − », `ϱ` = $\infty$, `Ј` = « ′ »). **Réparation de transcription, non ajout de contenu.**

## 🟠 Concept 1 — §A1.1.1 : nécessité et suffisance

### 1.1 Pourquoi ce détour

> *« **Les idées importantes dans la littérature économique sont souvent énoncées sous forme de THÉORÈMES. Un théorème est simplement UN ÉNONCÉ DÉDUIT D'AUTRES ÉNONCÉS.** Les théorèmes fournissent **un format COMPACT et PRÉCIS** pour présenter les hypothèses et les conclusions d'arguments parfois longs, et **aident donc à identifier IMMÉDIATEMENT LA PORTÉE ET LES LIMITES du résultat présenté**. »*

### 🔴 1.2 La nécessité

> *« Quand nous disons « **$A$ est NÉCESSAIRE pour $B$** », nous voulons dire que **$A$ DOIT être vrai POUR QUE $B$ soit vrai**. […] Nous pourrions donc dire, à la place, que « **$A$ est vrai SI $B$ est vrai** », ou simplement que « **$A$ est IMPLIQUÉ par $B$** » ($A\Leftarrow B$). »*

$$\boxed{\;\textbf{« $A$ nécessaire pour $B$ »} \ \equiv\ \textbf{« $A$ SI $B$ »} \ \equiv\ \textbf{« $A$ est impliqué par $B$ »} \ \equiv\ A\Leftarrow B\;}$$

### 1.3 La suffisance

> *« Quand nous disons « **$A$ est SUFFISANT pour $B$** », nous voulons dire que **CHAQUE FOIS QUE $A$ tient, $B$ doit tenir**. Nous pouvons dire « **$A$ est vrai SEULEMENT SI $B$ est vrai** », ou que « **$A$ IMPLIQUE $B$** » ($A\Rightarrow B$). »*

⚠️ **Le « seulement si » est du côté SUFFISANT** — c'est le point que l'on inverse le plus souvent.

### 🔴 1.4 La contraposée

> *« Supposons que $A\Leftarrow B$ soit vrai. **Et si $A$ n'est PAS vrai ? Parce que $A$ est nécessaire pour $B$, quand $A$ n'est pas vrai, ALORS $B$ NE PEUT PAS ÊTRE VRAI non plus.** »*

$$\boxed{\;A\Leftarrow B \quad\text{équivaut à}\quad \sim\!B\Leftarrow\ \sim\!A\;}$$

> ⚠️ *« **LA CONTRAPOSITION DES ARGUMENTS RENVERSE LE SENS DE L'IMPLICATION pour un énoncé vrai.** »*

<details class="details--riche">
<summary>

**L'illustration du livre — l'entier inférieur à 10**

</summary>

Soit $A\equiv$ *« $x$ est un entier inférieur à 10 »* et $B\equiv$ *« $x$ est un entier inférieur à 8 »*.

⚠️ **$A$ est NÉCESSAIRE pour $B$** : *« « $x$ est un entier inférieur à 10 » est **impliqué par** « $x$ est un entier inférieur à 8 » »*.

**Le piège** : *« $\sim\!A$ devient « $x$ n'est PAS un entier inférieur à 10 » et $\sim\!B$ devient « $x$ n'est pas un entier inférieur à 8 ». **PRENEZ GARDE : l'énoncé $\sim\!A\Leftarrow\ \sim\!B$ est FAUX. La valeur de $x$ pourrait fort bien être 9.** »*

> *« **Nous devons RENVERSER le sens de l'implication** pour obtenir un énoncé contrapositif qui soit aussi vrai »* ⟹ $\sim\!B\Leftarrow\ \sim\!A$.

</details>

### 1.5 L'équivalence

> *« Deux implications, $A\Rightarrow B$ et $A\Leftarrow B$, peuvent **toutes deux être vraies**. Quand c'est le cas, nous disons que « **$A$ est NÉCESSAIRE ET SUFFISANT pour $B$** », ou que « **$A$ est vrai SI ET SEULEMENT SI $B$ est vrai** », ou « **$A$ ssi $B$** ». »*

<details class="details--riche">
<summary>

**L'illustration du citron**

</summary>

| Les énoncés | La relation |
|---|---|
| $A\equiv$ *« $X$ est JAUNE »* · $B\equiv$ *« $X$ est un CITRON »* | **$A$ est nécessaire, PAS suffisant** — *« juste parce que $X$ est jaune ne signifie pas que ce doit être un citron. **CE POURRAIT ÊTRE UNE BANANE.** »* |
| $A\equiv$ *« $X$ est un fruit ACIDE À PEAU JAUNE »* · $B\equiv$ *« $X$ est un citron »* | **$A$ est nécessaire ET suffisant** — *« il doit y avoir une **ÉQUIVALENCE entre les citrons et les fruits acides à peau jaune** »* |

</details>

## 🟠 Concept 2 — §A1.1.2 : théorèmes et preuves

### 2.1 Le vocabulaire

> *« Supposons le théorème $A\Rightarrow B$. Ici, **$A$ est appelée la PRÉMISSE et $B$ la CONCLUSION. PROUVER un théorème, c'est établir la validité de sa conclusion ÉTANT DONNÉE LA VÉRITÉ DE SA PRÉMISSE.** »*

### 🔴 2.2 Les trois méthodes

| La méthode | Sa description, mot pour mot |
|---|---|
| **CONSTRUCTIVE** *(directe)* | *« nous **supposons que $A$ est vraie**, en déduisons diverses conséquences, et les utilisons pour montrer que **$B$ doit aussi tenir** »* |
| **CONTRAPOSITIVE** | *« nous **supposons que $B$ NE tient PAS**, puis montrons que **$A$ ne peut pas tenir**. Ceci tire parti de **l'équivalence logique entre $A\Rightarrow B$ et $\sim\!B\Rightarrow\ \sim\!A$** »* |
| **PAR L'ABSURDE** *(reductio ad absurdum)* | *« **supposer $A$ vraie, supposer $B$ FAUSSE, et tenter de dériver une CONTRADICTION logique.** Ceci repose sur le fait que **si $A\Rightarrow\ \sim\!B$ est FAUSSE, alors $A\Rightarrow B$ doit être VRAIE** »* |

> ⚠️ *« **Parfois, les preuves par l'absurde peuvent faire le travail TRÈS EFFICACEMENT, mais parce qu'elles n'impliquent AUCUNE CHAÎNE CONSTRUCTIVE de raisonnement entre $A$ et $B$, ELLES ÉCLAIRENT RAREMENT LA RELATION entre la prémisse et la conclusion.** »*

### 2.3 Les équivalences exigent DEUX preuves

> *« Si nous affirmons que $A\Longleftrightarrow B$, **nous devons donner une preuve « DANS LES DEUX DIRECTIONS ». C'est-à-dire que $A\Rightarrow B$ ET $B\Rightarrow A$ doivent TOUS DEUX être établis** avant qu'une preuve complète ait été atteinte. »*

### 🔴 2.4 Exemples et contre-exemples

> *« **Il n'est jamais mauvais de garder à l'esprit le vieil adage qui dit : « LA PREUVE PAR L'EXEMPLE N'EST PAS UNE PREUVE ».** »*

**L'illustration** : avec $A\equiv$ *« $x$ est un étudiant »* et $B\equiv$ *« $x$ a les cheveux roux »*, *« **trouver UN étudiant aux cheveux roux et vous le montrer ne va vous convaincre de RIEN. LES EXEMPLES SONT BONS POUR ILLUSTRER, MAIS TYPIQUEMENT PAS POUR PROUVER.** »*

⚠️ **La réciproque, en revanche, est vraie :**

> *« **Alors que citer 100 exemples ne peut JAMAIS prouver qu'une propriété tient toujours, CITER UN SEUL CONTRE-EXEMPLE PEUT RÉFUTER que la propriété tient toujours.** »*

$$\boxed{\;\text{100 exemples ne PROUVENT rien} \qquad\qquad \text{1 contre-exemple RÉFUTE}\;}$$

## 🟠 Concept 3 — §A1.2.1 : les ensembles

### 3.1 Les notions de base

| La notion | Sa définition |
|---|---|
| **Ensemble** | *« **toute collection d'éléments** »* — défini par **énumération** ou par **description** |
| **Appartenance** | $5\in S$ |
| **Sous-ensemble** | $S\subset T$ si *« **chaque élément de $S$ est aussi un élément de $T$** »* ⟹ $x\in S\Rightarrow x\in T$ |
| **Égalité** | $S=T$ ssi $S\subset T$ **ET** $T\subset S$ |
| **Ensemble VIDE** | $\varnothing$ — *« il ne contient **aucun élément du tout** »* |
| **Complémentaire** | $S^c$ = *« tous les éléments de l'univers $U$ **qui ne sont pas dans $S$** »* |
| **Différence** | $S\setminus T$ = *« tous les éléments de $S$ **qui ne sont pas éléments de $T$** »* ⟹ $S^c=U\setminus S$ |

### 3.2 Union et intersection

> *« Les opérations de base sont **l'UNION et l'INTERSECTION. Elles correspondent aux notions logiques de « OU » et « ET », respectivement.** »*

$$S\cup T\equiv\{x\mid x\in S \textbf{ ou } x\in T\} \qquad\qquad S\cap T\equiv\{x\mid x\in S \textbf{ et } x\in T\}$$

> ⚠️ *(Note de bas de page 1.)* *« Dans le langage courant, le mot « **ou** » a **deux sens**. L'un, appelé le « ou » **EXCLUSIF**, porte le sens « **l'un OU l'autre, MAIS PAS LES DEUX** ». **En mathématiques, le mot « ou » est utilisé au sens INCLUSIF : « l'un ou l'autre OU LES DEUX ».** »*

**Les ensembles d'indices** : on collecte les entiers dans $I\equiv\{1,2,3,\dots\}$ et on note $\{S_i\}_{i\in I}$, avec $\bigcup_{i\in I}S_i$ et $\bigcap_{i\in I}S_i$.

### 3.3 Le produit cartésien et $\mathbb{R}^n$

$$S\times T\equiv\{(s,t)\mid s\in S,\ t\in T\}$$

> *« Un produit familier est **le PLAN CARTÉSIEN. C'est le plan dans lequel vous représentez communément les choses.** »*

$$\mathbb{R}\equiv\{x\mid-\infty<x<\infty\} \qquad \mathbb{R}^2\equiv\mathbb{R}\times\mathbb{R} \qquad \mathbb{R}^n\equiv\underbrace{\mathbb{R}\times\cdots\times\mathbb{R}}_{n \text{ fois}}$$

> *« Plus généralement, **tout $n$-uplet, ou VECTEUR, est un uplet ordonné à $n$ dimensions et peut être pensé comme un « POINT » dans l'ESPACE EUCLIDIEN À $n$ DIMENSIONS** »*. On note les vecteurs **en gras** : $\mathbf{x}\equiv(x_1,\dots,x_n)$.

### 🔴 3.4 Les deux notations d'inégalité vectorielle

**L'ORTHANT NON NÉGATIF** : $\mathbb{R}^n_+\equiv\{(x_1,\dots,x_n)\mid x_i\geq0,\ i=1,\dots,n\}\subset\mathbb{R}^n$.

$$\boxed{\;\mathbf{x}\geq\mathbf{y} \ \iff\ x_i\geq y_i \ \forall i \qquad\qquad \mathbf{x}\gg\mathbf{y} \ \iff\ x_i>y_i \ \forall i\;}$$

⚠️ **$\mathbf{x}\gg0$ signifie que CHAQUE composante est STRICTEMENT positive** — c'est la notation employée dans **tout** le livre *(fiches 500-520)*.

## 🟠 Concept 4 — §A1.2.2 : les ensembles convexes

### 4.1 Pourquoi ils comptent

> *« **Les ensembles convexes sont des BRIQUES DE BASE dans PRATIQUEMENT CHAQUE domaine de la théorie microéconomique. Dans le travail théorique, la convexité est le plus souvent supposée POUR GARANTIR QUE L'ANALYSE EST MATHÉMATIQUEMENT TRAITABLE et que les résultats sont NETS et « BIEN COMPORTÉS ».** »*

### 4.2 La définition A1.1

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.1 — Ensembles convexes dans $\mathbb{R}^n$</span>

$S\subset\mathbb{R}^n$ est un **ensemble convexe** si, pour tous $\mathbf{x}^1\in S$ et $\mathbf{x}^2\in S$ :

$$t\,\mathbf{x}^1+(1-t)\,\mathbf{x}^2\ \in\ S \qquad\textbf{pour tout } t \textbf{ dans l'intervalle } 0\leq t\leq1$$

</div>

> *« **Ce n'est pas aussi terrible qu'il n'y paraît.** Fondamentalement, cela dit qu'**un ensemble est convexe si, pour deux points quelconques de l'ensemble, TOUTES LES MOYENNES PONDÉRÉES de ces deux points (où les poids somment à 1) sont AUSSI des points du même ensemble.** »*

### 🔴 4.3 La combinaison convexe, décortiquée

> *« $z$ est une **COMBINAISON CONVEXE** de $\mathbf{x}^1$ et $\mathbf{x}^2$ si $z=t\mathbf{x}^1+(1-t)\mathbf{x}^2$ pour un $t$ entre zéro et 1. […] **Une combinaison convexe $z$ est donc un point qui, en un certain sens, « SE TROUVE ENTRE » les deux points.** »*

**La réécriture éclairante** :

$$z=t\mathbf{x}^1+(1-t)\mathbf{x}^2 \qquad\Longleftrightarrow\qquad \boxed{\;z=\mathbf{x}^2+t\big(\mathbf{x}^1-\mathbf{x}^2\big)\;}$$

> *« Si nous pensons $\mathbf{x}^2$ comme **le POINT DE DÉPART**, et la différence $(\mathbf{x}^1-\mathbf{x}^2)$ comme **la « DISTANCE » de $\mathbf{x}^2$ à $\mathbf{x}^1$**, alors cette expression dit que **$z$ est un point situé à l'endroit $\mathbf{x}^2$ PLUS UNE PROPORTION $t$ de la distance** entre $\mathbf{x}^2$ et $\mathbf{x}^1$. »*

<details class="details--riche">
<summary>

**L'exemple numérique du livre**

</summary>

Avec $x^1=8$ et $x^2=2$ dans $\mathbb{R}$, donc $x^1-x^2=6$ :

| $t$ | $z=2+t\cdot6$ | Interprétation |
|---|---|---|
| $0$ | $z=2=x^2$ | **coïncide avec $x^2$** |
| $\tfrac12$ | $z=2+3=5$ | *« le **MILIEU** de l'intervalle »* |
| $\tfrac23$ | $z=2+4=6$ | *« le point aux **DEUX TIERS** de la distance »* |
| $1$ | $z=8=x^1$ | **coïncide avec $x^1$** |

> *« **Les valeurs extrêmes de zéro et 1 font donc COÏNCIDER la combinaison convexe avec l'un des deux points. Les valeurs entre zéro et 1 la font prendre une valeur STRICTEMENT ENTRE les deux points.** »*

</details>

### 🔴 4.4 La règle simple et intuitive

> *« Regardez à nouveau la définition. **Lisez-la attentivement et vous verrez que nous aurions tout aussi bien pu dire qu'un ensemble est convexe s'il CONTIENT TOUTES LES COMBINAISONS CONVEXES DE CHAQUE PAIRE de points de l'ensemble.** »*

$$\boxed{\;\textbf{« Un ensemble est convexe SSI on peut relier deux points quelconques de}\\\textbf{l'ensemble par UNE LIGNE DROITE QUI SE TROUVE ENTIÈREMENT DANS L'ENSEMBLE. »}\;}$$

> *« **Notez que les ensembles convexes sont tous « BIEN COMPORTÉS ». Ils n'ont AUCUN TROU, AUCUNE CASSURE, et AUCUNE COURBURE MALADROITE sur leurs frontières. CE SONT DE JOLIS ENSEMBLES.** »*

### 4.5 Le théorème A1.1

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.1 — L'intersection d'ensembles convexes est convexe</span>

Soient $S$ et $T$ des ensembles **convexes** dans $\mathbb{R}^n$. Alors **$S\cap T$ est un ensemble convexe**.

</div>

<details class="details--riche">
<summary>

**La preuve — quatre lignes**

</summary>

Soient $\mathbf{x}^1,\mathbf{x}^2\in S\cap T$.

| Pas | L'argument |
|---|---|
| **1** | $\mathbf{x}^1\in S\cap T$ ⟹ $\mathbf{x}^1\in S$ **et** $\mathbf{x}^1\in T$ ; de même pour $\mathbf{x}^2$ |
| **2** | Soit $z=t\mathbf{x}^1+(1-t)\mathbf{x}^2$, $t\in[0,1]$ |
| **3** | **$S$ convexe** ⟹ $z\in S$ ; **$T$ convexe** ⟹ $z\in T$ |
| **4** | ⟹ $z\in S\cap T$. *« **Parce que TOUTE combinaison convexe de deux points de $S\cap T$ est aussi dans $S\cap T$, $S\cap T$ est un ensemble convexe.** »* $\blacksquare$ |

</details>

## 🟠 Concept 5 — §A1.2.3 : relations et fonctions

### 5.1 Les relations binaires

> *« **Toute collection de couples ordonnés** est dite constituer **une RELATION BINAIRE** entre les ensembles $S$ et $T$. »*

> *« Une relation binaire est définie en spécifiant **un RAPPORT SIGNIFIANT qui tient entre les éléments du couple**. »*

<details class="details--riche">
<summary>

**L'exemple des capitales**

</summary>

$S=\{$Washington, Londres, Marseille, Paris$\}$, $T=\{$États-Unis, Angleterre, France, Allemagne$\}$.

> *« L'énoncé « **est la capitale de** » définit alors une relation qui contient les éléments $\{$(Washington, États-Unis), (Londres, Angleterre), (Paris, France)$\}$. »*

⚠️ *« **Comme cet exemple le montre, une relation binaire $R$ sur $S\times T$ est TOUJOURS UN SOUS-ENSEMBLE de $S\times T$.** »*

**La notation** : $(s,t)\in R$ ou, plus communément, **$sRt$**.

</details>

> *« Quand une relation binaire est un sous-ensemble du produit d'un ensemble $S$ **avec lui-même**, nous disons que c'est **une relation SUR l'ensemble $S$** »*.

### 5.2 Les définitions A1.2 et A1.3

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.2 — Complétude</span>

Une relation $R$ sur $S$ est **complète** si, **pour tous éléments $x$ et $y$ de $S$**, $xRy$ **ou** $yRx$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.3 — Transitivité</span>

Une relation $R$ sur $S$ est **transitive** si, pour trois éléments quelconques $x$, $y$, $z$ de $S$, $xRy$ **et** $yRz$ implique $xRz$.

</div>

<details class="details--riche">
<summary>

**Le piège de la complétude — l'exemple du livre**

</summary>

Soit $S=\{1,2,\dots,10\}$ et la relation « **est strictement plus grand que** ».

> ⚠️ *« Cette relation **N'EST PAS complète** parce qu'on peut facilement trouver $x$ et $y$ où il n'est vrai NI que $x>y$ NI que $y>x$ : par exemple, on pourrait choisir **$x=y=1$**, ou $x=y=2$. »*

> ⚠️ *« **La définition de la complétude N'EXIGE PAS que les éléments $x$ et $y$ soient DISTINCTS — rien ne nous empêche de les choisir IDENTIQUES.** Parce qu'aucun entier ne peut être ni inférieur ni supérieur à lui-même, la relation « est plus grand que » **n'est PAS complète**. »*

**En revanche** : *« la relation « **est AU MOINS AUSSI GRAND QUE** » **EST complète** : pour deux entiers quelconques, **distincts ou non**, l'un sera toujours au moins aussi grand que l'autre »*.

</details>

### 5.3 Les fonctions

> *« **Une FONCTION est une relation TRÈS COMMUNE quoique TRÈS PARTICULIÈRE. Spécifiquement, une fonction est une relation qui associe à CHAQUE élément d'un ensemble UN SEUL élément UNIQUE d'un autre ensemble.** »*

| Le terme | Sa définition |
|---|---|
| $f:D\to R$ | $D$ est **le DOMAINE**, $R$ est **la RANGE** *(l'ensemble d'arrivée)* |
| **L'IMAGE** | $I\equiv\{y\mid y=f(x) \text{ pour un } x\in D\}\subset R$ |
| **L'IMAGE RÉCIPROQUE** | $f^{-1}(S)\equiv\{x\mid x\in D,\ f(x)\in S\}$ |
| **Le GRAPHE** | $G\equiv\{(x,y)\mid x\in D,\ y=f(x)\}$ |

<details class="details--riche">
<summary>

**Les exemples des figures A1.7 et A1.8**

</summary>

**Fig. A1.7(a)** *(pas une fonction)* : *« **PLUS D'UN point dans la range est assigné à des points du domaine** »*. **Fig. A1.7(b)** *(une fonction)* : *« **chaque point du domaine est assigné à un point UNIQUE de la range** »* — mais **$x^1$ et $x^2$ y sont tous deux envoyés sur $y^1$**, ce qui **ne viole pas** la définition.

**Fig. A1.8(a)** : $y=\sin(x)$ avec $D=R=\mathbb{R}$. *« La fonction sinus **ne prend jamais de valeurs supérieures à 1 ou inférieures à $-1$**. Son IMAGE est donc le sous-ensemble $I=[-1,1]$. »*

**Fig. A1.8(b)** : $f:[0,1]\to[0,1]$ donnée par $y=\tfrac12x$ ⟹ **l'image est $I=[0,\tfrac12]$**, un **sous-ensemble STRICT** de la range.

</details>

### 🔴 5.4 Injection, surjection, bijection

| Le terme | Sa définition, mot pour mot |
|---|---|
| **UN-À-UN** *(injective)* | *« si **CHAQUE point de la range est assigné à AU PLUS UN point du domaine** »* |
| **SUR** *(surjective)* | *« si **l'IMAGE ÉGALE la RANGE** — si **chaque point de la range est atteint par un point du domaine** »* |
| **Les deux** | *« alors **une fonction INVERSE $f^{-1}:R\to D$ EXISTE, qui est ELLE AUSSI un-à-un et sur** »* |

## 🟠 Concept 6 — §A1.3 : la métrique euclidienne

### 6.1 Métrique et espace métrique

> *« **Une MÉTRIQUE est simplement UNE MESURE DE DISTANCE. Un ESPACE MÉTRIQUE est juste un ENSEMBLE muni d'une notion de distance définie entre ses points.** »*

**Sur $\mathbb{R}$** : la **valeur absolue**, $d(x^1,x^2)=|x^1-x^2|$.

**Sur $\mathbb{R}^2$** : *« une notion naturelle est **HÉRITÉE DE PYTHAGORE** »*. Avec les côtés $a$ et $b$ du triangle rectangle :

$$d(\mathbf{x}^1,\mathbf{x}^2)=\sqrt{a^2+b^2}=\sqrt{\big(x^2_1-x^1_1\big)^2+\big(x^2_2-x^1_2\big)^2}$$

### 🔴 6.2 L'unification par le produit scalaire

> *« **Que cela soit évident ou non au premier coup d'œil, LES DEUX FORMULES peuvent en fait être vues comme des CAS PARTICULIERS DE LA MÊME FORMULE.** »*

| L'espace | La réécriture |
|---|---|
| $\mathbb{R}$ | $\|x^1-x^2\|=\sqrt{(x^1-x^2)(x^1-x^2)}$ |
| $\mathbb{R}^2$ | $(\mathbf{x}^1-\mathbf{x}^2)\cdot(\mathbf{x}^1-\mathbf{x}^2)=\big(x^1_1-x^2_1\big)^2+\big(x^1_2-x^2_2\big)^2$ |

> *« Notez que **ce produit vectoriel produit un SCALAIRE qui est PRÉCISÉMENT le même que celui sous le radical dans notre formule pythagoricienne**. »*

$$\boxed{\;d(\mathbf{x}^1,\mathbf{x}^2)\equiv\sqrt{(\mathbf{x}^1-\mathbf{x}^2)\cdot(\mathbf{x}^1-\mathbf{x}^2)}=\sqrt{\sum_{i=1}^{n}\big(x^1_i-x^2_i\big)^2}\ \equiv\ \|\mathbf{x}^1-\mathbf{x}^2\|\;}$$

> *« Nous appelons cette formule **la MÉTRIQUE EUCLIDIENNE ou NORME EUCLIDIENNE. Naturellement, les espaces métriques $\mathbb{R}^n$ qui l'utilisent sont appelés ESPACES EUCLIDIENS.** »*

## 🟠 Concept 7 — Boules, ouverts et fermés

### 7.1 La définition A1.4

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.4 — Boules ouvertes et fermées</span>

**1.** La **boule OUVERTE** de centre $\mathbf{x}^0$ et de rayon $\varepsilon>0$ :

$$B_\varepsilon(\mathbf{x}^0)\equiv\big\{\mathbf{x}\in\mathbb{R}^n\ \big|\ d(\mathbf{x}^0,\mathbf{x})\underbrace{<}_{\textbf{STRICTEMENT inférieur}}\varepsilon\big\}$$

**2.** La **boule FERMÉE** :

$$B_\varepsilon^*(\mathbf{x}^0)\equiv\big\{\mathbf{x}\in\mathbb{R}^n\ \big|\ d(\mathbf{x}^0,\mathbf{x})\underbrace{\leq}_{\textbf{inférieur OU ÉGAL}}\varepsilon\big\}$$

</div>

⚠️ *« Notez ATTENTIVEMENT que **TOUTE $\varepsilon$-boule est UN ENSEMBLE DE POINTS**. »*

| L'espace | La boule ouverte | La boule fermée |
|---|---|---|
| $\mathbb{R}$ | *« l'intervalle **OUVERT** $(x^0-\varepsilon,\ x^0+\varepsilon)$ »* | *« l'intervalle **FERMÉ** $[x^0-\varepsilon,\ x^0+\varepsilon]$ »* |
| $\mathbb{R}^2$ | *« un **DISQUE** — les points **à l'intérieur** du cercle »* | *« les points **à l'intérieur ET SUR LE BORD** »* |
| $\mathbb{R}^3$ | *« l'intérieur de la **SPHÈRE** »* | *« l'intérieur **ET LA SURFACE** »* |

> ⚠️ *« Dans $\mathbb{R}^4$ et au-delà, **l'intuition géométrique est plutôt DIFFICILE, mais L'IDÉE RESTE LA MÊME**. »*

### 7.2 La définition A1.5

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.5 — Ensembles ouverts dans $\mathbb{R}^n$</span>

$S\subset\mathbb{R}^n$ est **OUVERT** si, **pour tout $\mathbf{x}\in S$**, il existe **un $\varepsilon>0$** tel que $B_\varepsilon(\mathbf{x})\subset S$.

</div>

> *« **Un ensemble est ouvert si, AUTOUR DE N'IMPORTE QUEL POINT, nous pouvons dessiner une boule ouverte — SI PETIT QUE SON RAYON DOIVE ÊTRE — de sorte que TOUS ses points se trouvent ENTIÈREMENT DANS L'ENSEMBLE.** »*

<details class="details--riche">
<summary>

**La preuve que toute boule ouverte est un ensemble ouvert**

</summary>

Soit $S=B_\varepsilon(\mathbf{x}^0)$ et $\mathbf{x}\in S$ quelconque.

> *« Parce que $\mathbf{x}\in S$, **nous savons que $d(\mathbf{x}^0,\mathbf{x})<\varepsilon$. Ainsi, $\varepsilon-d(\mathbf{x}^0,\mathbf{x})>0$.** »*

**Poser** $\varepsilon'=\varepsilon-d(\mathbf{x}^0,\mathbf{x})>0$ :

> ⚠️ *« alors il sera **TOUJOURS le cas que $B_{\varepsilon'}(\mathbf{x})\subset S$, SI PRÈS DU BORD DU CERCLE QUE NOUS PRENIONS $\mathbf{x}$** »*.

</details>

### 7.3 Le théorème A1.2

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.2 — Sur les ensembles ouverts dans $\mathbb{R}^n$</span>

**1.** L'ensemble **vide** $\varnothing$ est ouvert. **2.** L'espace **entier** $\mathbb{R}^n$ est ouvert. **3.** **L'UNION d'ensembles ouverts** *(quelconque)* est un ensemble ouvert. **4.** **L'INTERSECTION d'un nombre FINI d'ensembles ouverts** est un ensemble ouvert.

</div>

⚠️ **La dissymétrie 3 / 4 est essentielle** : l'union est **quelconque**, l'intersection doit être **finie**.

<details class="details--riche">
<summary>

**Les preuves**

</summary>

**(2)** : *« si nous prenons un point de $\mathbb{R}^n$ et un $\varepsilon>0$, **l'ensemble $B_\varepsilon(\mathbf{x})$ consistera bien sûr entièrement en points de $\mathbb{R}^n$** »*.

**(1)** : *« il est **(VACUEUSEMENT)** vrai. **S'il n'y a AUCUN point dans $\varnothing$, alors il sera bien sûr vrai que « pour chaque point de $\varnothing$, nous pouvons trouver un $\varepsilon$… »** »*

**(3)** : soit $\mathbf{x}\in\bigcup_{i\in I}S_i$ ⟹ $\mathbf{x}\in S_i$ pour un $i$ ⟹ $S_i$ ouvert ⟹ $B_\varepsilon(\mathbf{x})\subset S_i\subset\bigcup_{i}S_i$. $\blacksquare$

</details>

### 🔴 7.4 Le théorème A1.3

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.3 — Tout ensemble ouvert est une collection de boules ouvertes</span>

Soit $S$ ouvert. Pour chaque $\mathbf{x}\in S$, choisir $\varepsilon_{\mathbf{x}}>0$ tel que $B_{\varepsilon_{\mathbf{x}}}(\mathbf{x})\subset S$. Alors

$$S=\bigcup_{\mathbf{x}\in S}B_{\varepsilon_{\mathbf{x}}}(\mathbf{x})$$

</div>

> *« **Suppose que nous partions d'un ensemble ouvert. Puisqu'il est ouvert, nous pouvons prendre CHAQUE point et l'« ENTOURER » d'une boule ouverte entièrement contenue. […] Pensez maintenant à L'UNION de toutes ces boules.** »*

> ⚠️ *« **Pouvez-vous penser à un point de l'ensemble de départ qui NE SOIT PAS dans cette union ? Pouvez-vous penser à un point de cette union qui NE SOIT PAS dans l'ensemble original ? Si vous avez répondu « NON » aux deux, VOUS VOUS ÊTES CONVAINCU QUE LES DEUX ENSEMBLES SONT LES MÊMES !** »*

⚠️ **Ce théorème sera l'outil clé du théorème A1.6** *(la caractérisation de la continuité)*.

### 7.5 Fermés, frontière et intérieur

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.6 — Ensembles fermés dans $\mathbb{R}^n$</span>

$S$ est **FERMÉ** si **son complémentaire $S^c$ est un ensemble OUVERT**.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.4 — Sur les ensembles fermés</span>

**1.** $\varnothing$ est fermé · **2.** $\mathbb{R}^n$ est fermé · **3.** **l'UNION d'une collection FINIE** de fermés est fermée · **4.** **l'INTERSECTION** *(quelconque)* de fermés est fermée.

</div>

⚠️ *« **$\varnothing$ et $\mathbb{R}^n$ sont les SEULS DEUX ensembles qui sont À LA FOIS ouverts ET fermés dans $\mathbb{R}^n$** »* — chacun étant **le complémentaire de l'autre**.

<details class="details--riche">
<summary>

**La preuve de (3) — et la loi de De Morgan**

</summary>

$S_i$ fermés, $I$ **fini**. Chaque $S_i^c$ est **ouvert** ⟹ **par le théorème A1.2(4)**, $\bigcap_{i\in I}S_i^c$ est **ouvert** *(l'intersection est finie)*.

> *« **La loi de DE MORGAN** *(exercice A1.4)* nous dit que **le complémentaire de l'INTERSECTION d'une collection d'ensembles ÉGALE l'UNION DES COMPLÉMENTAIRES** »* :

$$\Big(\bigcap_{i\in I}S_i^c\Big)^c=\bigcup_{i\in I}S_i$$

⟹ $\bigcup_i S_i$ est **le complémentaire d'un ouvert**, donc **fermé**. $\blacksquare$

</details>

### 🔴 7.6 Frontière et intérieur

| La notion | Sa définition |
|---|---|
| **POINT FRONTIÈRE** | *« $\mathbf{x}$ est un **point frontière** de $S$ si **TOUTE $\varepsilon$-boule centrée en $\mathbf{x}$ contient des points DE $S$ AINSI QUE des points HORS de $S$** »*. On note $\partial S$ |
| **POINT INTÉRIEUR** | *« $\mathbf{x}\in S$ est **intérieur** s'il existe **une $\varepsilon$-boule centrée en $\mathbf{x}$ ENTIÈREMENT contenue dans $S$** »*. On note $\operatorname{int}S$ |

$$\boxed{\;S \textbf{ est OUVERT} \iff S=\operatorname{int}S \qquad\qquad S \textbf{ est FERMÉ} \iff S=\operatorname{int}S\cup\partial S\;}$$

> *« **Grossièrement, un ensemble est OUVERT s'il ne contient AUCUN de ses points frontière, et FERMÉ s'il contient TOUS ses points frontière.** »*

## 🟠 Concept 8 — Bornitude, bornes et compacité

### 8.1 La définition A1.7

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.7 — Ensembles bornés</span>

$S\subset\mathbb{R}^n$ est **BORNÉ** s'il est **entièrement contenu dans une $\varepsilon$-boule** : $S\subset B_\varepsilon(\mathbf{x})$ pour un $\mathbf{x}\in\mathbb{R}^n$.

</div>

> *« La définition devient plus intuitive si nous nous confinons aux boules **centrées à l'ORIGINE**. De ce point de vue, **$S$ est borné s'il existe une DISTANCE FINIE $\varepsilon$ telle qu'AUCUN point de $S$ N'EST PLUS ÉLOIGNÉ DE L'ORIGINE que $\varepsilon$.** »*

### 🔴 8.2 Bornes inférieures et supérieures dans $\mathbb{R}$

| Le terme | Sa définition |
|---|---|
| **BORNE INFÉRIEURE** | *« tout réel $l$ **(que $l$ soit dans $S$ ou non)** pour lequel $l\leq x$ pour tout $x\in S$ »* |
| **BORNE SUPÉRIEURE** | *« tout réel $u$ **(dans $S$ ou non)** pour lequel $x\leq u$ pour tout $x\in S$ »* |
| **g.l.b.** | *« **le PLUS GRAND nombre parmi ces bornes inférieures** »* |
| **l.u.b.** | *« **le PLUS PETIT nombre parmi les bornes supérieures** »* |

⚠️ **L'exemple du livre** : avec $S=\{4,6,8\}$, *« le nombre **1** est une borne inférieure, **tout comme le nombre 4** ; $27\notin S$ est une borne supérieure, **tout comme le nombre $8\in S$** »*.

> *« Les axiomes de base du système des réels peuvent être utilisés pour montrer qu'**il EXISTERA TOUJOURS une g.l.b. et une l.u.b. pour tout sous-ensemble BORNÉ de $\mathbb{R}$** »*.

### 8.3 Le théorème A1.5

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.5 — Bornes dans les sous-ensembles de réels</span>

**1.** Si $S$ est un ensemble **OUVERT borné** de $\mathbb{R}$ de g.l.b. $a$ et l.u.b. $b$, alors **$a\notin S$ et $b\notin S$**. **2.** Si $S$ est un ensemble **FERMÉ borné** de g.l.b. $a$ et l.u.b. $b$, alors **$a\in S$ et $b\in S$**.

</div>

<details class="details--riche">
<summary>

**La preuve pour la g.l.b., dans les deux cas**

</summary>

**CAS OUVERT — par l'absurde.** Supposons $a\in S$.

> *« Parce que $a\in S$ et $S$ est **ouvert**, il existe $\varepsilon>0$ tel que $B_\varepsilon(a)\subset S$. **En particulier, le point $a-\tfrac12\varepsilon\in S$. Mais parce que $a-\tfrac12\varepsilon<a$ ET $a-\tfrac12\varepsilon\in S$, $a$ NE PEUT PAS ÊTRE UNE BORNE INFÉRIEURE.** »* Contradiction. $\blacksquare$

**CAS FERMÉ — par l'absurde aussi.** Si $a=x$ pour un $x\in S$, c'est fini. Sinon, $a<x$ pour tout $x\in S$ ⟹ $a\in S^c$, **qui est OUVERT** ⟹ il existe $\varepsilon>0$ avec $B_\varepsilon(a)=(a-\varepsilon,a+\varepsilon)\subset S^c$.

> ⚠️ *« Alors **tout point de $(a-\varepsilon,a+\varepsilon)$ doit être STRICTEMENT INFÉRIEUR à tout point de $S$**. **En particulier, $a+\tfrac12\varepsilon<x$ pour tout $x\in S$. Mais alors $a+\tfrac12\varepsilon$ est une borne inférieure ET $a+\tfrac12\varepsilon>a$ — donc $a$ n'est PAS la PLUS GRANDE borne inférieure.** »* Contradiction. $\blacksquare$

</details>

### 8.4 La compacité

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.8 — (Heine-Borel) Ensembles compacts</span>

$$\boxed{\;S\subset\mathbb{R}^n \textbf{ est COMPACT} \ \iff\ \textbf{il est FERMÉ ET BORNÉ}\;}$$

</div>

> *(Note 2.)* *« **La compacité est en fait une propriété TOPOLOGIQUE à part entière. Cependant, LE THÉORÈME DE HEINE-BOREL montre que, POUR LES ENSEMBLES DE $\mathbb{R}^n$, cette propriété ÉQUIVAUT à être fermé et borné.** »*

| L'ensemble | Compact ? |
|---|---|
| Un intervalle **ouvert** de $\mathbb{R}$ | **NON** — *« borné, mais **pas fermé** »* |
| Une boule **ouverte** de $\mathbb{R}^n$ | **NON** |
| Un intervalle **fermé borné** | **OUI** |
| Une boule **fermée de rayon FINI** | **OUI** |
| $\mathbb{R}^n$ tout entier | **NON** — *« **bien qu'il soit fermé, il n'est PAS BORNÉ** »* |

## 🟠 Concept 9 — §A1.3.1 : la continuité

### 9.1 La définition élémentaire

> *« **Intuitivement, nous savons ce qu'est une fonction continue. Fondamentalement, une fonction est continue si un « PETIT MOUVEMENT » dans le domaine ne cause pas un « GRAND SAUT » dans la range.** »*

**La définition d'une variable** : $f:\mathbb{R}\to\mathbb{R}$ est continue en $x^0$ si, **pour tout $\varepsilon>0$, il existe $\delta>0$** tel que $d(x,x^0)<\delta$ implique $d\big(f(x),f(x^0)\big)<\varepsilon$.

### 🔴 9.2 La définition A1.9, dans toute sa généralité

> *« Avant, nous supposions implicitement que **le domaine de $f$ était TOUT $\mathbb{R}$**. Quand c'est le cas, nous sommes assurés que $B_\delta(x^0)$ est **entièrement contenue dans le domaine**. **Cependant, quand le domaine $D$ n'est qu'un SOUS-ENSEMBLE de $\mathbb{R}^m$, nous n'avons pas à nous soucier de TOUS les points à distance $\delta$, mais SEULEMENT DE CEUX DANS $D$**, à savoir $B_\delta(x^0)\cap D$. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.9 — (Cauchy) Continuité</span>

Soit $D\subset\mathbb{R}^m$ et $f:D\to\mathbb{R}^n$. $f$ est **continue au point $\mathbf{x}^0\in D$** si, **pour tout $\varepsilon>0$, il existe $\delta>0$** tel que

$$\boxed{\;f\big(B_\delta(\mathbf{x}^0)\cap D\big)\ \subset\ B_\varepsilon\big(f(\mathbf{x}^0)\big)\;}$$

Si $f$ est continue **en tout point de $D$**, elle est appelée **une fonction continue**.

</div>

⚠️ **L'intersection avec $D$ est ESSENTIELLE** — c'est ce que le PDF exporte comme un « + ».

### 🔴 9.3 Ce que la continuité NE préserve PAS

> *« Notre intuition nous suggère qu'une fonction continue est **un animal suffisamment « RÉGULIER » et PRÉVISIBLE** pour que des propriétés de base comme l'ouverture et la fermeture soient probablement préservées. **MALHEUREUSEMENT, C'EST UNE INSTANCE OÙ L'INTUITION ÉCHOUE.** »*

> ⚠️ *« **Il N'EST PAS VRAI qu'une fonction continue envoie TOUJOURS un ouvert du domaine sur un ouvert de la range, ni les fermés sur les fermés.** »*

**Le contre-exemple** : *« la fonction continue **$f(x)=a$** envoie **CHAQUE point du domaine, donc chaque ENSEMBLE OUVERT du domaine, sur LE SEUL POINT $a$** de la range »* — et **un point unique est un ensemble FERMÉ, pas ouvert** *(exercice A1.25)*.

### 9.4 Ouverts et fermés RELATIFS

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.10 — Ensembles ouverts dans $D$</span>

$S\subset D$ est **ouvert DANS $D$** si, pour tout $\mathbf{x}\in S$, il existe $\varepsilon>0$ tel que $B_\varepsilon(\mathbf{x})\cap D\subset S$.

</div>

> *« Ainsi, **un ensemble est ouvert dans $D$ si, pour chaque point, tous les points VOISINS sont SOIT DANS L'ENSEMBLE SOIT HORS DE $D$**. »*

⚠️ *« Si $D=\mathbb{R}^m$, **ceci COÏNCIDE avec notre définition. Notez aussi que $D$ est TOUJOURS ouvert dans $D$.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.11 — Ensembles fermés dans $D$</span>

$S\subset D$ est **fermé dans $D$** si **son complémentaire DANS $D$**, l'ensemble $\{\mathbf{x}\in D\mid \mathbf{x}\notin S\}$, est **ouvert dans $D$**.

</div>

### 🔴 9.5 Le théorème A1.6

> *« Bien que nous ne puissions rien dire en général en allant du domaine vers la range, **nous pouvons dire BEAUCOUP sur ce qui arrive DANS L'AUTRE SENS — de la range vers le domaine**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.6 — Continuité et images réciproques</span>

Soit $D\subset\mathbb{R}^m$. Les conditions suivantes sont **équivalentes** : **1.** $f:D\to\mathbb{R}^n$ est **continue** ; **2.** pour toute **boule ouverte** $B$ de $\mathbb{R}^n$, $f^{-1}(B)$ est **ouverte dans $D$** ; **3.** pour tout **ensemble ouvert** $S$ de $\mathbb{R}^n$, $f^{-1}(S)$ est **ouvert dans $D$**.

</div>

<details class="details--riche">
<summary>

**La preuve — le cycle (1) ⟹ (2) ⟹ (3) ⟹ (1)**

</summary>

**(1) ⟹ (2).** Soit $B$ ouverte et $\mathbf{x}\in f^{-1}(B)$ ⟹ $f(\mathbf{x})\in B$ ⟹ **$B$ étant ouverte**, il existe $\varepsilon>0$ avec $B_\varepsilon(f(\mathbf{x}))\subset B$ ⟹ **par continuité**, il existe $\delta>0$ avec

$$f\big(B_\delta(\mathbf{x})\cap D\big)\subset B_\varepsilon\big(f(\mathbf{x})\big)\subset B$$

⟹ $B_\delta(\mathbf{x})\cap D\subset f^{-1}(B)$ ⟹ **$f^{-1}(B)$ est ouverte DANS $D$**.

**(2) ⟹ (3).** **Par le THÉORÈME A1.3**, $S=\bigcup_{i\in I}B_i$ *(une union de boules ouvertes)* ⟹

$$f^{-1}(S)=f^{-1}\Big(\bigcup_i B_i\Big)=\bigcup_i f^{-1}(B_i)$$

⟹ **une union d'ouverts dans $D$**, donc **ouverte dans $D$**.

**(3) ⟹ (1).** Soient $\mathbf{x}\in D$ et $\varepsilon>0$. **$B_\varepsilon(f(\mathbf{x}))$ étant ouverte**, (3) donne $f^{-1}\big(B_\varepsilon(f(\mathbf{x}))\big)$ **ouverte dans $D$** ⟹ il existe $\delta>0$ avec $B_\delta(\mathbf{x})\cap D\subset f^{-1}\big(B_\varepsilon(f(\mathbf{x}))\big)$ ⟹ $f\big(B_\delta(\mathbf{x})\cap D\big)\subset B_\varepsilon(f(\mathbf{x}))$ ⟹ **continuité en $\mathbf{x}$**. $\blacksquare$

</details>

### 9.6 Le théorème A1.7

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.7 — L'image continue d'un compact est compacte</span>

Si $D$ est un sous-ensemble **COMPACT** de $\mathbb{R}^m$ et $f:D\to\mathbb{R}^n$ est **CONTINUE**, alors **$f(D)$ est un sous-ensemble COMPACT de $\mathbb{R}^n$**.

</div>

> ⚠️ *« **ENFIN un résultat qui séduit l'intuition ! Malheureusement, la preuve nous emmène plus loin que nous ne souhaitons aller.** »* *(Voir Royden 1963.)*

⚠️ **C'est LE théorème qui rend Weierstrass possible.**

## 🟠 Concept 10 — Les suites

### 10.1 Les quatre définitions

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.12 — Suites dans $\mathbb{R}^n$</span>

Une **suite** est une fonction envoyant un **sous-ensemble INFINI $I$ d'entiers positifs** dans $\mathbb{R}^n$. On la note $\{\mathbf{x}^k\}_{k\in I}$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.13 — Suites convergentes</span>

$\{\mathbf{x}^k\}$ **converge** vers $\mathbf{x}$ si, **pour tout $\varepsilon>0$, il existe $\bar k$** tel que $\mathbf{x}^k\in B_\varepsilon(\mathbf{x})$ **pour tout $k>\bar k$**.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.14 — Suites bornées</span>

: $\|\mathbf{x}^k\|\leq M$ pour tout $k$. **DÉFINITION A1.15 — Sous-suites** : $\{\mathbf{x}^k\}_{k\in J}$ où **$J$ est un sous-ensemble INFINI de $I$**.

</div>

### 🔴 10.2 Les trois exemples du livre

| La suite | Son comportement |
|---|---|
| $1,\ \tfrac12,\ \tfrac13,\ \dots$ | **converge vers ZÉRO**, *« même si zéro n'est PAS un membre de la suite »* |
| $1,\ 2,\ 3,\ \dots$ | *« **ne converge vers AUCUN réel** »* |
| $1,\ -1,\ 1,\ -1,\ \dots$ | *« **BORNÉE, mais elle ne CONVERGE PAS. Si l'on ne considère qu'un terme sur deux, on obtient la SOUS-SUITE $1,1,1,\dots$ qui converge clairement vers 1** »* |

> *« **Cet exemple peut être GÉNÉRALISÉ en un résultat important.** »*

### 10.3 Les théorèmes A1.8 et A1.9

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.8 — Sur les suites bornées</span>

**TOUTE suite BORNÉE de $\mathbb{R}^n$ a une SOUS-SUITE CONVERGENTE.**

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.9 — Suites, ensembles et fonctions continues</span>

Soit $D\subset\mathbb{R}^n$ et $f:D\to\mathbb{R}^m$. Alors : **1.** $D$ est **OUVERT** ssi, pour chaque $\mathbf{x}\in D$, **si $\{\mathbf{x}^k\}$ converge vers $\mathbf{x}$, alors $\mathbf{x}^k\in D$ à partir d'un certain rang** ; **2.** $D$ est **FERMÉ** ssi, pour **toute** suite de points **de $D$** convergeant vers un $\mathbf{x}\in\mathbb{R}^n$, **on a aussi $\mathbf{x}\in D$** ; **3.** $f$ est **CONTINUE** ssi, chaque fois que $\{\mathbf{x}^k\}$ dans $D$ converge vers $\mathbf{x}\in D$, **$\{f(\mathbf{x}^k)\}$ converge vers $f(\mathbf{x})$**.

</div>

> *« **Il s'avère que nous AURIONS PU définir les ouverts et les fermés EN TERMES DE SUITES.** »*

⚠️ **La partie 2 est la caractérisation la plus utilisée en pratique** : **un fermé contient les limites de ses suites**.

## 🔴 Concept 11 — §A1.3.2 : Weierstrass

### 11.1 Ce qu'est un théorème d'existence

> *« **Un THÉORÈME D'EXISTENCE spécifie des conditions qui, si elles sont satisfaites, GARANTISSENT QUE QUELQUE CHOSE EXISTE. Deux points sont à garder à l'esprit.** »*

| # | Le point |
|---|---|
| **1** | *« les conditions sont généralement **SUFFISANTES, PAS NÉCESSAIRES. Si elles ne sont pas satisfaites, LE SUJET PEUT ENCORE EXISTER — nous ne pouvons simplement pas en être sûrs EN GÉNÉRAL et A PRIORI.** »* |
| **2** | *« bien qu'ils nous assurent que quelque chose existe, **ils ne nous donnent GÉNÉRALEMENT AUCUN INDICE de ce à quoi cela ressemble, NI OÙ LE TROUVER ! Ils fournissent donc des maillons PUISSANTS et souvent INDISPENSABLES dans la construction d'arguments « ABSTRAITS » rigoureux, MAIS UNE ASSISTANCE TRÈS FAIBLE pour résoudre des problèmes « PRATIQUES ».** »* |

### 11.2 Le théorème A1.10

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.10 — (Weierstrass) Existence de valeurs extrêmes</span>

Soit $f:S\to\mathbb{R}$ une fonction **réelle CONTINUE**, où $S$ est un sous-ensemble **NON VIDE et COMPACT** de $\mathbb{R}^n$. Alors **il existe $\mathbf{x}^*\in S$ et $\tilde{\mathbf{x}}\in S$** tels que

$$f(\tilde{\mathbf{x}})\ \leq\ f(\mathbf{x})\ \leq\ f(\mathbf{x}^*) \qquad\textbf{pour tout } \mathbf{x}\in S$$

</div>

### 🔴 11.3 La preuve — une chaîne de trois théorèmes

<details class="details--riche">
<summary>

**Les cinq lignes**

</summary>

| Pas | L'argument | L'outil |
|---|---|---|
| **1** | $f$ **continue** et $S$ **compact** ⟹ **$f(S)$ est COMPACT** | **THÉORÈME A1.7** |
| **2** | $f$ étant **réelle**, $f(S)\subset\mathbb{R}$ ; **compact** ⟹ **fermé ET borné** | **Définition A1.8** |
| **3** | ⟹ $f(S)$ **CONTIENT sa g.l.b. $a$ et sa l.u.b. $b$** | **THÉORÈME A1.5(2)** |
| **4** | Par définition de l'image, **il existe $\mathbf{x}^*$ avec $f(\mathbf{x}^*)=b$ et $\tilde{\mathbf{x}}$ avec $f(\tilde{\mathbf{x}})=a$** |  |
| **5** | Les définitions de g.l.b. et l.u.b. donnent l'encadrement | $\blacksquare$ |

⚠️ **La preuve est un simple ENCHAÎNEMENT** : A1.7 ⟹ compacité de l'image ⟹ A1.5 ⟹ les bornes **sont atteintes**.

</details>

### 🔴 11.4 Ce qui va mal sans compacité

> **La figure A1.18.** En **(a)**, $S=[1,2]$ est **fermé, borné, donc compact** ⟹ *« un minimum et un maximum coïncideront respectivement avec la **g.l.b.** et la **l.u.b.** de $f(S)$ »*.

> *« Pour voir ce qui peut mal tourner, considérez **(b)**. Là, $S=(1,2)$, **qui N'EST PAS compact — il est borné, mais PAS FERMÉ. Clairement, AUCUN minimum ni maximum n'existe.** »*

> ⚠️ *« **Parce que $S$ est OUVERT, nous pouvons nous rapprocher DE PLUS EN PLUS de l'une ou l'autre extrémité SANS JAMAIS ATTEINDRE L'EXTRÉMITÉ elle-même. Ces mouvements sont envoyés sur des valeurs de $f$ toujours plus basses ou plus élevées, N'ATTEIGNANT JAMAIS un minimum ou un maximum.** »*

## 🔴 Concept 12 — Les points fixes et Brouwer

### 12.1 Des systèmes d'équations aux points fixes

> *« Nous souhaitons trouver un vecteur $\mathbf{x}$ qui **résout SIMULTANÉMENT** chacune des $n$ équations **possiblement NON LINÉAIRES** : »*

$$g_1(x_1,\dots,x_n)=0,\ \dots,\ g_n(x_1,\dots,x_n)=0 \tag{A1.1}$$

**La réécriture** : en posant $f_i(\mathbf{x})=g_i(\mathbf{x})-x_i$, le système (A1.1) devient

$$f_1(\mathbf{x})=x_1,\ \dots,\ f_n(\mathbf{x})=x_n \tag{A1.2}$$

$$\boxed{\;\mathbf{x}^*\text{ résout le système} \ \iff\ f(\mathbf{x}^*)=\mathbf{x}^* \ : \ \mathbf{x}^* \textbf{ est un POINT FIXE de } f\;}$$

> *« Le terme est utilisé parce que **ce sera un point LAISSÉ INTACT, ou « NON DÉPLACÉ », par la fonction en allant du domaine à la range. La fonction $f$ prend simplement $\mathbf{x}^*$ ET LE RENVOIE SUR LUI-MÊME.** »*

### 🔴 12.2 La portée en économie

> *« **De nombreuses questions PROFONDES sur la cohérence des systèmes microéconomiques ont été RÉPONDUES en reformulant la question comme celle de l'EXISTENCE D'UN POINT FIXE.** »*

| Le résultat | Ce qu'il a fallu montrer |
|---|---|
| *« la vue d'une **économie concurrentielle** comme un système de marchés interreliés »* | qu'elle est **logiquement COHÉRENTE** *(fiche 510)* |
| *« le fameux **théorème du MINIMAX** »* | *(exercice 7.7, fiche 515)* |
| *« le **théorème d'existence de l'équilibre de NASH** »* | *(théorème 7.2, fiche 515)* |

> *« **Dans ces cas et d'autres, UNE FORME DE THÉORÈME DU POINT FIXE JOUE UN RÔLE CENTRAL.** »*

### 12.3 Le théorème A1.11

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.11 — Le théorème du point fixe de Brouwer</span>

Soit $S\subset\mathbb{R}^n$ un ensemble **NON VIDE, COMPACT ET CONVEXE**. Soit $f:S\to S$ une fonction **CONTINUE**. Alors **il existe AU MOINS UN point fixe de $f$ dans $S$** — au moins un $\mathbf{x}^*\in S$ tel que $\mathbf{x}^*=f(\mathbf{x}^*)$.

</div>

⚠️ **Les QUATRE hypothèses** : $S$ **non vide** · **compact** · **convexe** · et $f$ **continue DE $S$ DANS $S$**.

*(Le livre restreint sa preuve au cas où $S$ est **le simplexe unité** de $\mathbb{R}^n_+$.)*

### 🔴 12.4 La preuve du livre — le lemme de Sperner

> *« Nous restreindrons notre preuve du théorème de Brouwer au **cas particulier où $S$ est LE SIMPLEXE UNITÉ de $\mathbb{R}^n_+$** »* :

$$S=\Big\{(x_1,\dots,x_n)\in\mathbb{R}^n_+\ \Big|\ \textstyle\sum_i x_i=1\Big\}$$

<details class="details--riche">
<summary>

**Étape 1 — l'affirmation (P.1) et son exploitation**

</summary>

**L'affirmation (P.1)** : *pour tout $k=1,2,\dots$, il existe $n$ points $\mathbf{x}^{1,k},\dots,\mathbf{x}^{n,k}$ de $S$, **tous dans une SEULE boule de rayon $1/k$**, tels que*

$$x^{i,k}_i\ \geq\ f_i\big(\mathbf{x}^{i,k}\big) \qquad\text{pour } i=1,\dots,n$$

**Comment (P.1) donne le théorème :**

| Pas | L'argument |
|---|---|
| **1** | Les points étant *« **à distance $1/k$ les uns des autres**, les sous-suites doivent **converger vers LE MÊME point** $\mathbf{x}^*\in\mathbb{R}^n$ »* — *« (Prouvez-le !) »* |
| **2** | *« parce que **la COMPACITÉ de $S$ implique que $S$ est FERMÉ**, nous avons $\mathbf{x}^*\in S$ »* |
| **3** | Il existe donc **un sous-ensemble INFINI $K$ d'indices** tel que chacune des sous-suites $\{\mathbf{x}^{1,k}\}_{k\in K},\dots$ converge vers $\mathbf{x}^*\in S$ |
| **4** | En passant à la limite dans (P.1) : $\displaystyle x_i^*=\lim_{k\to\infty,\,k\in K}x^{i,k}_i\ \geq\ \lim_{k\to\infty,\,k\in K}f_i\big(\mathbf{x}^{i,k}\big)=f_i(\mathbf{x}^*)$ — *« la seconde égalité découle de **LA CONTINUITÉ de $f$** »* |
| **5** | D'où $\ x_i^*\geq f_i(\mathbf{x}^*)$ pour tout $i$ **(P.2)** |
| **6** | **LE COUP DE GRÂCE** : *« parce que **$\mathbf{x}^*$ ET $f(\mathbf{x}^*)$ sont TOUS DEUX dans $S$, leurs coordonnées SOMMENT À UN** — c'est-à-dire que **les deux membres de (P.2) somment à un. Mais ceci n'est POSSIBLE QUE SI chaque inégalité de (P.2) est EN FAIT UNE ÉGALITÉ** »* |
| **7** | ⟹ $\mathbf{x}^*=f(\mathbf{x}^*)$ — *« **comme désiré !** »* $\blacksquare$ |

⚠️ **C'est la contrainte de simplexe $\sum_i x_i=1$ qui transforme $n$ inégalités en $n$ égalités.**

</details>

<details class="details--riche">
<summary>

**Étape 2 — la subdivision et l'étiquetage réalisable (le cas $n=3$)**

</summary>

> *« Nous le ferons **seulement pour le cas particulier $n=3$. Les idées utilisées se GÉNÉRALISENT à un nombre quelconque de dimensions.** »*

$S=\{(x_1,x_2,x_3)\in\mathbb{R}^3_+\mid x_1+x_2+x_3=1\}$ est *« **la surface triangulaire PLATE** »* de la figure A1.19. Il s'agit de montrer qu'il existe **trois points $a,b,c\in S$ dans une même boule de rayon $1/k$** avec

$$a_1\geq f_1(a),\qquad b_2\geq f_2(b),\qquad c_3\geq f_3(c) \tag{P.3}$$

**La subdivision** : *« **fixez $k$ et divisez le triangle $S$, qui est ÉQUILATÉRAL, en TRIANGLES ÉQUILATÉRAUX PLUS PETITS. Choisissez la subdivision ASSEZ FINE pour que chacun des petits triangles TIENNE DANS UNE BOULE DE RAYON $1/k$.** »*

⚠️ **Le cas trivial est écarté d'emblée** : *« **si l'un des sommets de la subdivision EST un point fixe de $f$, nous pouvons prendre $a=b=c$ égal à ce point fixe et NOUS AVONS FINI. Nous pouvons donc supposer qu'AUCUN sommet n'est un point fixe.** »*

**LA RÈGLE D'ÉTIQUETAGE :**

$$\boxed{\;\textbf{« Le sommet } \mathbf{x} \textbf{ peut recevoir l'étiquette } i \textbf{ SEULEMENT SI } x_i>f_i(\mathbf{x}). \textbf{ »} \tag{P.4}\;}$$

**L'exemple du livre** : si $\mathbf{x}=(\tfrac14,\tfrac14,\tfrac12)$ et $f(\mathbf{x})=(0,\tfrac23,\tfrac13)$, alors *« nous pouvons assigner à $\mathbf{x}$ **l'étiquette 1 ou 3, MAIS PAS 2** »* — en effet $\tfrac14>0$ , $\tfrac14\not>\tfrac23$ , $\tfrac12>\tfrac13$ .

**Un étiquetage satisfaisant (P.4) est dit RÉALISABLE.** *« Il peut y en avoir **PLUS D'UN**. »*

⚠️ **Pourquoi il en existe toujours au moins un** : *« parce que **nous avons supposé qu'AUCUN sommet n'est un point fixe. Donc pour tout sommet $\mathbf{x}$, au moins un $i\in\{1,2,3\}$ doit satisfaire $x_i>f_i(\mathbf{x})$ (VOYEZ-VOUS POURQUOI ?)** »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — la réponse à « voyez-vous pourquoi ? »</span>

$\mathbf{x}$ et $f(\mathbf{x})$ sont **tous deux dans le simplexe**, donc leurs coordonnées **somment toutes deux à 1**. Si l'on avait $x_i\leq f_i(\mathbf{x})$ pour **tout** $i$, les sommes ne pourraient être égales **que** si toutes les inégalités étaient des égalités — c'est-à-dire si $\mathbf{x}$ était **un point fixe**, ce qui est exclu. Donc **au moins une coordonnée dépasse strictement**.

</div>

</details>

<details class="details--riche">
<summary>

**Étape 3 — les contraintes de bord**

</summary>

> *« Notez que **QUELLE QUE SOIT la fonction $f$**, les sommets $(1,0,0)$, $(0,1,0)$ et $(0,0,1)$ du triangle original $S$ **DOIVENT recevoir les étiquettes 1, 2 et 3 respectivement**. »*

| L'emplacement | Les étiquettes possibles | La raison |
|---|---|---|
| Le sommet $(1,0,0)$ | **1 uniquement** | ses autres coordonnées sont nulles |
| Le sommet $(0,1,0)$ | **2 uniquement** | idem |
| Le sommet $(0,0,1)$ | **3 uniquement** | idem |
| **L'arête du BAS** | **1 ou 2** | *« elle **NE PEUT PAS** recevoir l'étiquette 3 **parce que sa TROISIÈME COORDONNÉE EST NULLE** »* |
| **L'arête de GAUCHE** | **1 ou 3** | *« les étiquettes des sommets de l'arête gauche doivent être **1 ou 3** »* |
| **L'arête de DROITE** | **2 ou 3** | *« celles de l'arête droite doivent être **2 ou 3** »* |
| **L'INTÉRIEUR** | *« **1, 2 ou 3** — en principe »* | aucune coordonnée nulle |

⚠️ **Un sommet de coordonnée $x_i=0$ ne peut jamais porter l'étiquette $i$**, puisque (P.4) exigerait $0>f_i(\mathbf{x})\geq0$.

*(Le livre précise que l'arête du bas est constituée des sommets qui sont **« une combinaison convexe de $(1,0,0)$ et $(0,1,0)$ »**.)*

</details>

<details class="details--riche">
<summary>

**Étape 4 — l'argument de comptage des « arêtes 1-2 »**

</summary>

**L'objectif** : *« montrer que **pour TOUT étiquetage réalisable, au moins un des petits triangles doit être COMPLÈTEMENT ÉTIQUETÉ — doit avoir des sommets étiquetés 1, 2 ET 3** »*. Car alors (P.4) donne

$$a_1>f_1(a),\qquad b_2>f_2(b),\qquad c_3>f_3(c)$$

⟹ **(P.3) est satisfaite et la preuve est finie.**

**La méthode** : *« nous le ferons **par un ARGUMENT DE COMPTAGE SOIGNEUX**. Considérez chacun des petits triangles comme **LES PIÈCES D'UN PUZZLE. SÉPAREZ LES PIÈCES** en maintenant les étiquettes de leurs sommets. »*

**Une « ARÊTE 1-2 »** = *« une arête dont **une extrémité est étiquetée 1 et l'autre étiquetée 2** »*.

| Le triangle | Ses arêtes 1-2 |
|---|---|
| $1,2,3$ | **UNE** |
| $1,1,2$ | **deux** |
| $1,2,2$ | **deux** |
| $1,1,3$ | **zéro** |

**L'AFFIRMATION** : *« **le NOMBRE TOTAL d'arêtes 1-2 doit TOUJOURS ÊTRE IMPAIR** »*.

**(a) L'arête du BAS de $S$ en compte un nombre IMPAIR.** *(La marche du livre, depuis $(1,0,0)$ vers la droite.)*

| Le moment | Ce qui arrive au compteur |
|---|---|
| *« la **première fois** que nous rencontrons un 2 »* | il passe **de zéro à un** |
| *« un certain nombre de 2 **d'affilée** »* | **il ne change pas** |
| *« il n'augmentera à deux que **si nous rencontrons un sommet étiqueté 1** »* | il passe à **deux** |
| *« Mais **cela ne peut pas être la fin. Nous DEVONS finir par rencontrer un sommet étiqueté 2 PARCE QUE LE SOMMET LE PLUS À DROITE porte l'étiquette 2.** »* | il monte **au moins à trois** |

> ⚠️ *« **Le compte ne peut JAMAIS finir sur un nombre PAIR, parce que notre compte d'arêtes 1-2 devient pair PRÉCISÉMENT quand le sommet précédent porte l'étiquette 2 et le sommet courant porte l'étiquette 1. Il doit donc y avoir AU MOINS UNE arête 1-2 de plus, PUISQUE LA DERNIÈRE ÉTIQUETTE EST 2.** »*

*(Note 5 : **l'ordre n'importe pas** — une arête du bas « 2 à gauche, 1 à droite » **compte aussi** comme une arête 1-2.)*

**(b) Les DEUX AUTRES arêtes de $S$ n'en comptent AUCUNE** — les étiquettes y sont $\{1,3\}$ ou $\{2,3\}$.

**(c) L'INTÉRIEUR en compte un nombre PAIR.** *« **Toute arête intérieure a UNE JUMELLE adjacente PORTANT LES MÊMES ÉTIQUETTES.** Ceci parce que les deux extrémités d'une arête intérieure et de sa jumelle **sont EN FAIT LES DEUX MÊMES POINTS de $S$** et reçoivent donc **la même paire d'étiquettes. Par conséquent, les arêtes 1-2 intérieures VONT PAR PAIRES** et il doit y en avoir **un nombre PAIR**. »*

**Le bilan de la figure A1.22** : **3 arêtes 1-2 sur le bas** *(impair)* $+$ **12 à l'intérieur** *(pair)* $=$ **15, IMPAIR**.

</details>

<details class="details--riche">
<summary>

**Étape 5 — la conclusion, et le lemme de Sperner**

</summary>

> *« **L'étape finale est d'argumenter que S'IL Y A UN NOMBRE IMPAIR D'ARÊTES 1-2, alors il doit y avoir UN NOMBRE IMPAIR DE TRIANGLES COMPLÈTEMENT ÉTIQUETÉS (et donc AU MOINS UN !).** »*

**Le second comptage** :

| Le type de triangle | Ses arêtes 1-2 |
|---|---|
| **Non complètement étiqueté** | *« certains en ont **zéro**. Mais **TOUS LES AUTRES en ont EXACTEMENT DEUX**, parce que leurs étiquettes doivent être **$1,1,2$ ou $1,2,2$** »* ⟹ **total PAIR** |
| **Complètement étiqueté** | **EXACTEMENT UNE** |

$$\underbrace{\text{TOTAL IMPAIR}}_{\text{étape 4}}\ -\ \underbrace{\text{PAIR}}_{\text{triangles non complets}}\ =\ \underbrace{\text{IMPAIR}}_{\text{triangles complets}}\ \geq\ 1$$

⟹ **au moins un triangle complètement étiqueté** ⟹ **(P.3)** ⟹ **(P.1)** ⟹ **Brouwer**. $\blacksquare$

> *(Note 6.)* *« **Le fait qu'une subdivision réalisablement étiquetée du simplexe doive avoir un NOMBRE IMPAIR de sous-triangles complètement étiquetés s'appelle LE LEMME DE SPERNER, et il se GÉNÉRALISE à un nombre quelconque de dimensions.** »*

</details>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — une coquille probable dans la note 4.</span>

Le livre écrit que la subdivision peut toujours être obtenue *« en divisant chacun des trois côtés du triangle original en **$1/k$ intervalles égaux** »*. Un **nombre** d'intervalles ne peut pas valoir $1/k$ ; la construction visée est **$k$ intervalles égaux** *(ce qui donne des petits triangles de côté $1/k$)*. **Le raisonnement est correct** — seule la formulation du décompte est fautive. Fiez-vous à l'idée : *« joindre les marqueurs d'intervalle « OPPOSÉS » par des lignes PARALLÈLES AUX CÔTÉS du triangle »*, en prenant la subdivision **assez fine** pour que chaque petit triangle tienne dans une boule de rayon $1/k$.

</div>

### 🔴 12.5 Ce que Brouwer NE dit PAS

> **La figure A1.23.** Quand $S=[a,b]$, *« **si $f$ est une application continue de $[a,b]$ DANS LUI-MÊME, Brouwer garantit que LE GRAPHE DE $f$ CROISERA LA DROITE À $45°$ AU MOINS UNE FOIS** dans le carré $[a,b]\times[a,b]$. »*

> ⚠️ *« Dans l'illustration offerte, **$f$ effectue ce croisement TROIS FOIS. C'est pour vous ALERTER qu'AUCUNE référence n'est faite dans le théorème de Brouwer à L'UNICITÉ des points fixes, SEULEMENT à LEUR EXISTENCE.** »*

> *« En fait, **la figure A1.23 peut être prise comme UN CONTRE-EXEMPLE à tout « théorème » de ce genre que vous seriez tenté de construire vous-même !** »*

### 12.6 L’expérience de pensée du café

> *« **Nous vous laissons avec une modeste expérience de pensée que vous pouvez effectuer vous-même et méditer au matin.** »*

> ⚠️ *« **Considérez une TASSE DE CAFÉ. Pensez les molécules de ce café comme des points idéalisés de $\mathbb{R}^3$, et l'ensemble de toutes les molécules de votre tasse comme UN ENSEMBLE COMPACT CONVEXE de $\mathbb{R}^3$. Maintenant, soulevez la tasse et remuez-la DOUCEMENT de sorte que le café soit agité de manière « CONTINUE » — c'est-à-dire SANS ÉCLABOUSSURES ! Laissez les molécules revenir au repos.** »*

$$\boxed{\;\textbf{« LE THÉORÈME DE BROUWER GARANTIT QU'AU MOINS UNE MOLÉCULE DE VOTRE TASSE}\\\textbf{EST EXACTEMENT LÀ OÙ ELLE ÉTAIT AU DÉPART ! »}\;}$$

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « $A$ est nécessaire pour $B$ » | **§A1.1.1** | $A\Leftarrow B$ — « $A$ **SI** $B$ » |
| « $A$ est suffisant pour $B$ » | **§A1.1.1** | $A\Rightarrow B$ — « $A$ **SEULEMENT SI** $B$ » |
| « écrire la contraposée » | **§A1.1.1** | **Nier les DEUX et RENVERSER le sens** |
| « prouver que… » | **§A1.1.2** | **Directe**, **contrapositive** ou **par l'absurde** |
| « réfuter que… » | **§A1.1.2** | **UN SEUL contre-exemple suffit** |
| « cet ensemble est-il convexe ? » | **Déf. A1.1** | Prendre deux points, vérifier que **tout le segment** est dedans |
| « montrer qu'une intersection est convexe » | **Théorème A1.1** | Appliquer la convexité **à chacun** des deux ensembles |
| « cette relation est-elle complète ? » | **Déf. A1.2** | **Tester aussi $x=y$** |
| « calculer une distance dans $\mathbb{R}^n$ » | **§A1.3** | $\sqrt{(\mathbf{x}^1-\mathbf{x}^2)\cdot(\mathbf{x}^1-\mathbf{x}^2)}$ |
| « cet ensemble est-il ouvert ? » | **Déf. A1.5** | Autour de **chaque** point, une **boule entièrement dedans** |
| « … fermé ? » | **Déf. A1.6** | Regarder **le COMPLÉMENTAIRE** |
| « union / intersection d'ouverts » | **Théorème A1.2** | **Union quelconque**, **intersection FINIE** |
| « union / intersection de fermés » | **Théorème A1.4** | **Union FINIE**, **intersection quelconque** |
| « cet ensemble est-il compact ? » | **Déf. A1.8** | **FERMÉ ET BORNÉ** |
| « prouver la continuité » | **Déf. A1.9** ou **Thm A1.9(3)** | $\varepsilon$-$\delta$, ou **la caractérisation SÉQUENTIELLE** |
| « l'image réciproque est-elle ouverte ? » | **Théorème A1.6** | C'est **ÉQUIVALENT** à la continuité |
| « ce maximum existe-t-il ? » | **Théorème A1.10** | **CONTINUE sur un COMPACT NON VIDE** |
| Un système $g_i(\mathbf{x})=0$ | **Point fixe** | Poser $f_i=g_i+x_i$… ou $f_i(\mathbf{x})=g_i(\mathbf{x})-x_i$ selon la convention |
| « cette équation a-t-elle une solution ? » | **Théorème A1.11** | **NON VIDE, COMPACT, CONVEXE, $f$ CONTINUE DE $S$ DANS $S$** |

**Les trois réflexes de cadrage :**

1. **Vérifier les quatre hypothèses de Brouwer une par une.** Elles tombent souvent, et **chacune** est indispensable.
2. **Pour la compacité, TOUJOURS vérifier les DEUX conditions.** $\mathbb{R}^n$ est fermé mais **pas borné** ; un intervalle ouvert est borné mais **pas fermé**.
3. **Devant une continuité, préférer la caractérisation séquentielle.** Le théorème A1.9(3) est presque toujours plus rapide que $\varepsilon$-$\delta$.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Manipuler nécessité et suffisance

| L'énoncé | Sa traduction |
|---|---|
| « $A$ est **nécessaire** pour $B$ » | $A\Leftarrow B$ · « $A$ **si** $B$ » · « $B$ implique $A$ » |
| « $A$ est **suffisant** pour $B$ » | $A\Rightarrow B$ · « $A$ **seulement si** $B$ » |
| **La contraposée de $A\Rightarrow B$** | $\sim\!B\Rightarrow\ \sim\!A$ — **nier les deux ET renverser** |
| « $A$ ssi $B$ » | $A\Longleftrightarrow B$ — **DEUX preuves à faire** |

### Méthode 2 — Prouver qu'un ensemble est convexe

1. **Prendre $\mathbf{x}^1,\mathbf{x}^2\in S$ ARBITRAIRES.**
2. **Prendre $t\in[0,1]$ ARBITRAIRE** et former $z=t\mathbf{x}^1+(1-t)\mathbf{x}^2$.
3. **Montrer que $z$ satisfait la définition de $S$.**
4. **Conclure « pour TOUTE paire et TOUT $t$ »** — c'est ce que la définition exige.

**Le test visuel** : *« relier deux points quelconques par **une ligne droite entièrement dans l'ensemble** »*.

### Méthode 3 — Prouver qu'un ensemble est ouvert ou fermé

| L'objectif | La marche à suivre |
|---|---|
| **OUVERT** | Prendre $\mathbf{x}\in S$ **arbitraire**, **construire explicitement un $\varepsilon>0$** *(souvent une « distance au bord »)* et vérifier $B_\varepsilon(\mathbf{x})\subset S$ |
| **FERMÉ** | Montrer que **$S^c$ est OUVERT** · **ou** utiliser le **théorème A1.9(2)** : toute suite de $S$ qui converge a **sa limite dans $S$** |

⚠️ **L'astuce du théorème A1.2** : $\varepsilon'=\varepsilon-d(\mathbf{x}^0,\mathbf{x})>0$.

### Méthode 4 — Appliquer Weierstrass

| Pas | Ce qu'on vérifie |
|---|---|
| **1** | $S$ est-il **NON VIDE** ? |
| **2** | $S$ est-il **FERMÉ** ? |
| **3** | $S$ est-il **BORNÉ** ? ⟹ **(2)+(3) = COMPACT** |
| **4** | $f$ est-elle **CONTINUE** ? |
| **5** | ⟹ **le max ET le min sont ATTEINTS** |

⚠️ **La chaîne de la preuve** : **A1.7** *(image compacte)* ⟹ **A1.5(2)** *(les bornes appartiennent)*.

### Méthode 5 — Appliquer Brouwer

1. **Reformuler** le problème comme la recherche d'un **point fixe** $f(\mathbf{x}^*)=\mathbf{x}^*$.
2. **Vérifier que $S$ est NON VIDE.**
3. **Vérifier que $S$ est COMPACT** *(fermé + borné)*.
4. **Vérifier que $S$ est CONVEXE.**
5. **Vérifier que $f$ envoie $S$ DANS $S$** — c'est l'hypothèse la plus souvent oubliée.
6. **Vérifier que $f$ est CONTINUE.**
7. ⟹ **au moins un point fixe existe** — **PAS forcément unique**.

## Les exercices du livre (§A1.5) — ceux qui portent sur A1.1 à A1.3

> ⚠️ **Le livre NE FOURNIT PAS de corrigé pour ces exercices.** Les énoncés ci-dessous sont **ceux de Jehle & Reny** *(§A1.5, exercices A1.1 à A1.39 — les exercices A1.40 et suivants portent sur §A1.4, traité ailleurs)*. **Les pistes de résolution qui les accompagnent sont un ENRICHISSEMENT PÉDAGOGIQUE et ne proviennent pas du cours.**

### Bloc 1 — Théorie des ensembles (A1.1 à A1.7)

<details class="details--riche">
<summary>

**A1.1 à A1.4 — les lois algébriques des ensembles**

</summary>

**A1.1** *« Les opérations d'union et d'intersection obéissent à **la loi COMMUTATIVE** et à **la loi DISTRIBUTIVE**. »* — $S\cup T=T\cup S$, $S\cap T=T\cap S$ ; et pour trois ensembles $R,S,T$ : $R\cap(S\cap T)=(R\cap S)\cap T$, $R\cup(S\cup T)=(R\cup S)\cup T$. *« **Vérifiez ces lois à l'aide de diagrammes** semblables à ceux de la fig. A1.1. »*

**A1.2** *« Les énoncés suivants sont intuitivement « **ÉVIDENTS** ». **Donnez une preuve de chacun.** »* **(a)** $S\subset(S\cup T)$ · **(b)** $T\subset(S\cup T)$ · **(c)** $(S\cap T)\subset S$ · **(d)** $(S\cap T)\subset T$

**A1.3** *« **Les lois de DE MORGAN** nous disent que $(S\cap T)^c=S^c\cup T^c$ et $(S\cup T)^c=S^c\cap T^c$. **Prouvez-les.** »*

**A1.4** *« **Étendez les lois de De Morgan** au cas d'un nombre arbitraire d'ensembles »* : pour tout ensemble d'indices $I$,

$$\Big(\bigcap_{i\in I}S_i\Big)^c=\bigcup_{i\in I}S_i^c \qquad\qquad \Big(\bigcup_{i\in I}S_i\Big)^c=\bigcap_{i\in I}S_i^c$$

> **Piste (enrichissement pédagogique — hors cours).** Pour A1.2, revenir à la **définition de l'inclusion** : montrer que $x\in$ gauche $\Rightarrow x\in$ droite. Exemple pour (c) : $x\in S\cap T$ signifie $x\in S$ **et** $x\in T$, donc **en particulier** $x\in S$. Pour A1.3-A1.4, la double inclusion : $x\in(\bigcap_i S_i)^c$ ⟺ $x\notin\bigcap_i S_i$ ⟺ **il existe $i$ avec $x\notin S_i$** ⟺ $x\in\bigcup_i S_i^c$. **C'est exactement le pas utilisé dans la preuve du théorème A1.4(3).**

</details>

<details class="details--riche">
<summary>

**A1.5 et A1.6 — les limites du théorème A1.1**

</summary>

**A1.5** *« Soient $A$ et $B$ des ensembles **CONVEXES**. Montrez **PAR CONTRE-EXEMPLE** que $A\cup B$ **n'a pas besoin d'être** un ensemble convexe. »*

**A1.6** *« **Étendez le théorème A1.1** au cas d'un nombre arbitraire d'ensembles convexes. »*

> **Piste (hors cours).** **A1.5** : dans $\mathbb{R}$, prendre $A=[0,1]$ et $B=[2,3]$ — tous deux convexes. Le point $z=\tfrac12(1)+\tfrac12(2)=1{,}5$ est **une combinaison convexe** de $1\in A\cup B$ et $2\in A\cup B$, mais $1{,}5\notin A\cup B$. **UN SEUL contre-exemple suffit à réfuter** *(§A1.1.2)*. **A1.6** : la preuve du théorème A1.1 se transpose **mot pour mot** — si $\mathbf{x}^1,\mathbf{x}^2\in\bigcap_{i\in I}S_i$, alors pour **chaque** $i$ la convexité de $S_i$ donne $z\in S_i$ ; donc $z\in\bigcap_i S_i$. **Aucune finitude n'est requise ici** *(contrairement au théorème A1.2(4))*.

</details>

<details class="details--riche">
<summary>

**A1.7 — cinq ensembles à tester**

</summary>

> *« **Représentez graphiquement chacun des ensembles suivants. Si l'ensemble est convexe, donnez une PREUVE. S'il ne l'est pas, donnez un CONTRE-EXEMPLE.** »*

|  | L'ensemble | Convexe ? |
|---|---|---|
| **(a)** | $\{(x,y)\mid y=e^x\}$ |  |
| **(b)** | $\{(x,y)\mid y\geq e^x\}$ |  |
| **(c)** | $\{(x,y)\mid y\geq 2x-x^2;\ x>0,\ y>0\}$ |  |
| **(d)** | $\{(x,y)\mid xy\geq1;\ x>0,\ y>0\}$ |  |
| **(e)** | $\{(x,y)\mid y\leq\ln(x)\}$ |  |

> **Piste (hors cours).** **(a) NON** — c'est **une COURBE**. Le milieu de $(0,1)$ et $(1,e)$ est $(0{,}5;\ (1+e)/2\approx1{,}859)$, alors que $e^{0{,}5}\approx1{,}649$ : le point **n'est pas sur la courbe**. **(b) OUI** — c'est la région **AU-DESSUS** de $e^x$, qui est **une fonction CONVEXE**. **(c) NON** — c'est la région au-dessus de $2x-x^2$, **une PARABOLE RENVERSÉE**. Les points $(0{,}1;\ 0{,}19)$ et $(1{,}9;\ 0{,}19)$ sont dans l'ensemble ; leur milieu $(1;\ 0{,}19)$ ne l'est pas, car il faudrait $0{,}19\geq2(1)-1^2=1$. **(d) OUI** — la condition se réécrit $y\geq1/x$ avec $x>0$, et **$1/x$ est CONVEXE sur $x>0$**. **(e) OUI** — c'est la région **EN DESSOUS** de $\ln(x)$, qui est **CONCAVE**. **La règle générale** : *« au-dessus d'une fonction **convexe** »* et *« en dessous d'une fonction **concave** »* donnent des ensembles convexes. *(Ce sont les théorèmes A1.13 et suivants de §A1.4.)*

</details>

### Bloc 2 — Relations et fonctions (A1.8 à A1.18)

<details class="details--riche">
<summary>

**A1.8 — la relation « aime »**

</summary>

> *« Soit $S$ **l'ensemble de TOUTES LES PERSONNES SUR TERRE**. Soit la relation $R$ définie par l'énoncé « **AIME** ». **$R$ est-elle COMPLÈTE ? TRANSITIVE ?** »*

> **Piste (hors cours).** **COMPLÈTE ? NON.** Il faudrait que pour **tout** couple $(x,y)$ — **y compris $x=y$** *(cf. le piège de la définition A1.2)* — l'un aime l'autre. Deux parfaits inconnus fournissent **un contre-exemple immédiat**. **TRANSITIVE ? NON.** Que $x$ aime $y$ et que $y$ aime $z$ **n'entraîne nullement** que $x$ aime $z$. **L'intérêt de l'exercice** : montrer que **les propriétés de complétude et de transitivité sont des HYPOTHÈSES FORTES**, pas des évidences — ce qui compte quand on les impose aux préférences *(chapitre 1)* ou aux préférences sociales *(chapitre 6, fiche 513)*.

</details>

<details class="details--riche">
<summary>

**A1.9, A1.10, A1.13 à A1.15 — images directes et réciproques**

</summary>

**A1.9** *« Soient $A$ et $B$ deux ensembles du domaine $D$, avec $B\subset A$. Prouvez que $f(B)\subset f(A)$ pour toute application $f:D\to R$. »* **A1.10** *« Soient $A$ et $B$ deux ensembles de la range $R$, avec $B\subset A$. Prouvez que $f^{-1}(B)\subset f^{-1}(A)$. »* **A1.13** *« Prouvez que $f^{-1}(B^c)=\big(f^{-1}(B)\big)^c$. »* **A1.14** *« Montrez que $f^{-1}(A\cup B)=f^{-1}(A)\cup f^{-1}(B)$ et $f^{-1}(A\cap B)=f^{-1}(A)\cap f^{-1}(B)$. »* **A1.15** *« Soit $\{A_i\}_{i\in I}\subset R$ une collection **(finie ou INFINIE)** d'ensembles de la range. **Étendez votre preuve précédente** pour montrer que $f^{-1}\big(\bigcup_i A_i\big)=\bigcup_i f^{-1}(A_i)$ et $f^{-1}\big(\bigcap_i A_i\big)=\bigcap_i f^{-1}(A_i)$. »*

> **Piste (hors cours).** Toutes ces preuves suivent **le même schéma mécanique** — revenir à la définition $f^{-1}(S)=\{x\in D\mid f(x)\in S\}$ et suivre les équivalences :
>
> $$x\in f^{-1}(A\cup B) \iff f(x)\in A\cup B \iff f(x)\in A \textbf{ ou } f(x)\in B \iff x\in f^{-1}(A)\cup f^{-1}(B)$$
>
> **L'image RÉCIPROQUE commute avec TOUTES les opérations ensemblistes** *(union, intersection, complémentaire)* — **ce qui n'est PAS le cas de l'image directe**. C'est précisément **pourquoi le théorème A1.6 caractérise la continuité par les images réciproques** et non par les images directes. **A1.15 est l'étape utilisée dans la preuve (2)⟹(3) du théorème A1.6.**

</details>

<details class="details--riche">
<summary>

**A1.11 et A1.12 — injectivité, surjectivité, inverse**

</summary>

**A1.11** *« Considérez la fonction $f(x)=x^2$. **Décrivez l'ensemble IMAGE** et déterminez si la fonction est **UN-À-UN** et si elle est **SUR** dans les cas : (a) $D=\mathbb{R},R=\mathbb{R}$ · (b) $D=\mathbb{R},R=\mathbb{R}_+$ · (c) $D=\mathbb{R}_+,R=\mathbb{R}$ · (d) $D=\mathbb{R}_+,R=\mathbb{R}_+$. »*

**A1.12** *« **Une fonction inverse existe-t-elle** pour la fonction de la fig. A1.8(a) ? Et pour celle de la fig. A1.8(b) ? **Pourquoi ou pourquoi pas ?** »*

> **Piste (hors cours) — A1.11 :**
>
> | Cas | Image | Un-à-un ? | Sur ? |
> |---|---|---|---|
> | **(a)** $\mathbb{R}\to\mathbb{R}$ | $\mathbb{R}_+$ | *($f(-1)=f(1)$)* | *(les négatifs ne sont pas atteints)* |
> | **(b)** $\mathbb{R}\to\mathbb{R}_+$ | $\mathbb{R}_+$ |  |  |
> | **(c)** $\mathbb{R}_+\to\mathbb{R}$ | $\mathbb{R}_+$ |  |  |
> | **(d)** $\mathbb{R}_+\to\mathbb{R}_+$ | $\mathbb{R}_+$ |  | ⟹ **$f^{-1}(y)=\sqrt{y}$ EXISTE** |
>
> **A1.12** : **Fig. A1.8(a)** *(le sinus sur $\mathbb{R}$)* — **NON** : elle **n'est ni un-à-un** *(elle est périodique)* **ni sur** *(son image est $[-1,1]$)*. **Fig. A1.8(b)** *($y=\tfrac12x$ de $[0,1]$ dans $[0,1]$)* — **NON** : elle **est un-à-un mais PAS SUR**, son image étant $[0,\tfrac12]$. *(Elle admettrait une inverse **si l'on restreignait la range à son image**.)*

</details>

<details class="details--riche">
<summary>

**A1.16 à A1.18 — fabriquer des convexes**

</summary>

**A1.16** *« Soient $S$ et $T$ convexes. Prouvez que chacun des suivants est aussi convexe : (a) $-S\equiv\{\mathbf{x}\mid\mathbf{x}=-\mathbf{s},\ \mathbf{s}\in S\}$ · (b) $S-T\equiv\{\mathbf{x}\mid\mathbf{x}=\mathbf{s}-\mathbf{t},\ \mathbf{s}\in S,\ \mathbf{t}\in T\}$. »*

**A1.17** *« Soit $A_i\subset\mathbb{R}^m$ convexe pour $i=1,\dots,n$. Prouvez que chacun des suivants est convexe : (a) $\bigcap_{i=1}^n A_i$ · (b) $\times_{i=1}^n A_i$ **(le PRODUIT CARTÉSIEN)** · (c) $\sum_{i=1}^n A_i$ **(la SOMME d'ensembles)** · (d) $\sum_{i=1}^n\alpha_iA_i\equiv\{\sum_i\alpha_i\mathbf{a}_i\mid\alpha_i\in\mathbb{R},\ \mathbf{a}_i\in A_i\}$ **(la COMBINAISON LINÉAIRE d'ensembles)**. »*

**A1.18** *« Soit $f^i(\mathbf{x})=\mathbf{a}^i\cdot\mathbf{x}+b_i$ et considérez les inégalités $f^i(\mathbf{x})\geq0$, $i=1,\dots,n$. Soit $\Omega=\{\mathbf{x}\mid f^i(\mathbf{x})\geq0,\ i=1,\dots,n\}$ **l'ensemble des solutions de ces $n$ INÉGALITÉS LINÉAIRES. Montrez que $\Omega$ est un ensemble CONVEXE.** »*

> **Piste (hors cours).** Toutes reposent sur **le même calcul** : écrire $\mathbf{x}^1$ et $\mathbf{x}^2$ **sous la forme voulue**, former $t\mathbf{x}^1+(1-t)\mathbf{x}^2$ et **regrouper terme à terme**. Exemple pour **A1.16(b)** : $\mathbf{x}^1=\mathbf{s}^1-\mathbf{t}^1$ et $\mathbf{x}^2=\mathbf{s}^2-\mathbf{t}^2$ donnent
>
> $$t\mathbf{x}^1+(1-t)\mathbf{x}^2=\underbrace{\big[t\mathbf{s}^1+(1-t)\mathbf{s}^2\big]}_{\in\,S\ \text{par convexité}}-\underbrace{\big[t\mathbf{t}^1+(1-t)\mathbf{t}^2\big]}_{\in\,T\ \text{par convexité}}\ \in\ S-T \quad$$
>
> **A1.18** : chaque $\{\mathbf{x}\mid\mathbf{a}^i\cdot\mathbf{x}+b_i\geq0\}$ est **un DEMI-ESPACE**, donc convexe *(par linéarité : $\mathbf{a}\cdot(t\mathbf{x}^1+(1-t)\mathbf{x}^2)=t(\mathbf{a}\cdot\mathbf{x}^1)+(1-t)(\mathbf{a}\cdot\mathbf{x}^2)$)*. ⟹ **$\Omega$ est UNE INTERSECTION de convexes** ⟹ **théorème A1.1 / exercice A1.6**.

</details>

### Bloc 3 — Topologie (A1.19 à A1.32)

<details class="details--riche">
<summary>

**A1.19 et A1.20 — norme et intervalles**

</summary>

**A1.19** *« Nous écrivons parfois $\|\mathbf{x}\|\equiv\|\mathbf{x}-\mathbf{0}\|$ pour la distance de l'origine au point $\mathbf{x}$. Considérez un vecteur $t\mathbf{x}$ où **$t\geq0$ est un scalaire NON NÉGATIF. Prouvez que $\|t\mathbf{x}\|=t\|\mathbf{x}\|$.** »*

**A1.20** *« Considérez un intervalle ouvert $(a,b)$ quelconque. **Montrez que**

$$(a,b)=B_\varepsilon\Big(\frac{a+b}{2}\Big) \qquad\textbf{où } \varepsilon=\frac{b-a}{2}\textbf{. »}$$

> **Piste (hors cours).** **A1.19** : $\|t\mathbf{x}\|=\sqrt{\sum_i(tx_i)^2}=\sqrt{t^2\sum_i x_i^2}=|t|\,\|\mathbf{x}\|$, et **$|t|=t$ puisque $t\geq0$**. **A1.20** : avec $c=\tfrac{a+b}{2}$ et $\varepsilon=\tfrac{b-a}{2}$, $\ |x-c|<\varepsilon\iff c-\varepsilon<x<c+\varepsilon\iff a<x<b$. **Tout intervalle ouvert EST une boule ouverte de $\mathbb{R}$** — c'est ce qui rend le théorème A1.3 si concret en dimension 1.

</details>

<details class="details--riche">
<summary>

**A1.21 et A1.23 — le rôle de la FINITUDE**

</summary>

**A1.21** *« **Prouvez la partie 4 du théorème A1.2. L'intersection d'une INFINITÉ d'ensembles ouverts est-elle aussi un ensemble ouvert ?** »* **A1.23** *« **Prouvez la partie 4 du théorème A1.4.** »*

> **Piste (hors cours).** **A1.21, la preuve** : soit $\mathbf{x}\in\bigcap_{i=1}^n S_i$ avec chaque $S_i$ ouvert. Chaque $S_i$ fournit un $\varepsilon_i>0$ tel que $B_{\varepsilon_i}(\mathbf{x})\subset S_i$. **Poser $\varepsilon=\min\{\varepsilon_1,\dots,\varepsilon_n\}$ : c'est UN MINIMUM D'UN NOMBRE FINI DE RÉELS STRICTEMENT POSITIFS, donc $\varepsilon>0$.** Alors $B_\varepsilon(\mathbf{x})\subset S_i$ pour tout $i$. **A1.21, la question** : **NON.** Le contre-exemple canonique est $\bigcap_{n\geq1}\big(-\tfrac1n,\tfrac1n\big)=\{0\}$ — **une intersection d'ouverts qui vaut UN POINT UNIQUE, lequel est FERMÉ** *(exercice A1.25)*. **C'est exactement là que l'argument du minimum s'effondre : un infimum d'une infinité de $\varepsilon_i>0$ peut valoir ZÉRO.** **A1.23** : par **complémentation** — l'union quelconque des $S_i^c$ **ouverts** est ouverte *(théorème A1.2(3))*, et **De Morgan** donne $\big(\bigcup_i S_i^c\big)^c=\bigcap_i S_i$, **fermée**.

</details>

<details class="details--riche">
<summary>

**A1.22, A1.24 à A1.27 — ouverts, fermés et complémentaires dans $\mathbb{R}$**

</summary>

**A1.22** *« Considérez deux points $\mathbf{x}^1,\mathbf{x}^2\in\mathbb{R}^n$ et soit $B_\varepsilon(\mathbf{x}^1)$ une boule ouverte centrée en $\mathbf{x}^1$. (a) Soit $Z\equiv\{\mathbf{z}\mid\mathbf{z}=t\mathbf{x}^1+(1-t)\mathbf{x}^2,\ t\in[0,1]\}$ **l'ensemble de TOUTES les combinaisons convexes**. Prouvez que $B_\varepsilon(\mathbf{x}^1)\cap Z\neq\varnothing$. (b) Soit $Z^*$ le sous-ensemble de $Z$ **qui EXCLUT $\mathbf{x}^1$ et $\mathbf{x}^2$** *(c'est-à-dire $t\in(0,1)$)*. Prouvez que $B_\varepsilon(\mathbf{x}^1)\cap Z^*\neq\varnothing$. »*

**A1.24** *« Considérez les intervalles de $\mathbb{R}$ de la forme $[a,+\infty)$ et $(-\infty,b]$. **Prouvez qu'ils sont tous deux FERMÉS. Est-ce vrai aussi des intervalles de la forme $[a,c)$ et $(-c,b]$ pour $c$ FINI ?** »*

**A1.25** *« Soit $S\subset\mathbb{R}$ réduit à **UN SEUL POINT**, $S=\{s\}$. **Prouvez que $S$ est un ensemble FERMÉ et CONVEXE.** »*

**A1.26** *« Soit $(a,b)\subset\mathbb{R}$ un intervalle ouvert. Prouvez que son complémentaire vaut $(a,b)^c=(-\infty,a]\cup[b,+\infty)$. **Concluez que le complémentaire de tout intervalle ouvert est L'UNION DE DEUX ENSEMBLES FERMÉS.** »*

**A1.27** *« **Tout ensemble fermé de réels possède une propriété assez spéciale : il peut être vu comme UNE INTERSECTION (possiblement INFINIE) D'UNIONS D'INTERVALLES FERMÉS SIMPLES.** Spécifiquement, pour tout fermé $S\subset\mathbb{R}$,*

$$S=\bigcap_{i\in I}\big((-\infty,a_i]\cup[b_i,+\infty)\big)$$

*pour certains réels $a_i<b_i$ et un ensemble d'indices $I$. **Donnez une preuve de cette affirmation.** »*

> **Piste (hors cours).** **A1.22(a)** : **$\mathbf{x}^1$ LUI-MÊME est dans les deux** — il est dans $B_\varepsilon(\mathbf{x}^1)$ *(distance nulle)* et dans $Z$ *(prendre $t=1$)*. **A1.22(b)** : $\mathbf{x}^1$ est **exclu** de $Z^*$, donc il faut **un vrai calcul** : le point $\mathbf{z}_t=t\mathbf{x}^1+(1-t)\mathbf{x}^2$ vérifie $d(\mathbf{x}^1,\mathbf{z}_t)=(1-t)\,\|\mathbf{x}^1-\mathbf{x}^2\|$ *(par A1.19 !)*. **Il suffit de prendre $t$ assez proche de 1** pour rendre cette distance $<\varepsilon$. **A1.24** : $[a,+\infty)^c=(-\infty,a)$, **ouvert**. **Pour $[a,c)$ : NON** — son complémentaire $(-\infty,a)\cup[c,+\infty)$ **n'est pas ouvert** *(aucune boule autour de $c$ n'y tient)*. **Ce sont les intervalles « mi-ouverts » : NI ouverts NI fermés.** **A1.25** : $\{s\}^c=(-\infty,s)\cup(s,+\infty)$, **union de deux ouverts, donc ouvert** *(théorème A1.2(3))* ⟹ $\{s\}$ **fermé**. Convexe : **la seule paire disponible est $(s,s)$**, et toute combinaison vaut $s\in S$. **A1.27** : **La construction naturelle** — le complémentaire $S^c$ est **ouvert**, donc par **le théorème A1.3** c'est **une union de boules ouvertes**, c'est-à-dire *(par A1.20)* **une union d'intervalles ouverts $(a_i,b_i)$**. Prendre alors **le complémentaire** et appliquer **De Morgan** *(A1.4)* : $S=\big(\bigcup_i(a_i,b_i)\big)^c=\bigcap_i(a_i,b_i)^c$, et **A1.26** identifie chaque $(a_i,b_i)^c$ à $(-\infty,a_i]\cup[b_i,+\infty)$. **Cet exercice ENCHAÎNE A1.3, A1.20, A1.26 et A1.4 — c'est une synthèse de tout le bloc.**

</details>

<details class="details--riche">
<summary>

**A1.28 à A1.30 — ouverts et fermés RELATIFS, et les bornes**

</summary>

**A1.28** *« Soit $D\subset\mathbb{R}^n$. **Prouvez les analogues des théorèmes A1.2 et A1.4 pour les ensembles ouverts et fermés DANS $D$.** Par exemple, l'analogue de la partie 3 du théorème A1.2 se lirait « **l'union d'ouverts DANS $D$ est un ouvert DANS $D$** ». »*

**A1.29** *« Complétez ce qui suit. (a) Montrez que **$[0,1)$ est OUVERT dans $\mathbb{R}_+$ mais PAS dans $\mathbb{R}$**. (b) La partie (a) montre que les ouverts de $\mathbb{R}_+$ ne sont pas nécessairement ouverts dans $\mathbb{R}$. **Montrez cependant que les FERMÉS de $\mathbb{R}_+$ SONT fermés dans $\mathbb{R}$.** (c) Plus généralement, montrez que **si $D\subset\mathbb{R}^n$ est ouvert (fermé) dans $\mathbb{R}^n$, alors $S\subset D$ est ouvert (fermé) dans $D$ SI ET SEULEMENT SI il est ouvert (fermé) dans $\mathbb{R}^n$**. »*

**A1.30** *« Prouvez que **si $b$ est la l.u.b. de $S\subset\mathbb{R}$ et que $S$ est OUVERT, alors $b\notin S$**. Prouvez que **si $b$ est la l.u.b. de $S$ et que $S$ est FERMÉ, alors $b\in S$**. »*

> **Piste (hors cours).** **A1.29(a)** : **le point $0$ est le nœud**. Dans $\mathbb{R}_+$, la boule relative $B_\varepsilon(0)\cap\mathbb{R}_+=[0,\varepsilon)$ **tient dans $[0,1)$** pour $\varepsilon\leq1$ — mais dans $\mathbb{R}$, toute boule $(-\varepsilon,\varepsilon)$ contient **des négatifs**, hors de $[0,1)$ . **A1.30** : **C'est EXACTEMENT le théorème A1.5, énoncé pour la l.u.b. au lieu de la g.l.b.** — la preuve du cours se transpose en remplaçant $a-\tfrac12\varepsilon$ par $b+\tfrac12\varepsilon$ *(cas ouvert)* et $a+\tfrac12\varepsilon$ par $b-\tfrac12\varepsilon$ *(cas fermé)*. **Refaites-la vous-même : c'est le meilleur test de compréhension du théorème A1.5.**

</details>

<details class="details--riche">
<summary>

**A1.31 — « Look familiar? »**

</summary>

> *« Soient $\alpha_1>0$, $\alpha_2>0$ et $\beta>0$ des réels. Considérez le sous-ensemble de $\mathbb{R}^2$ donné par*
>
> $$\Omega\equiv\{\mathbf{x}\in\mathbb{R}^2_+\mid\alpha_1x_1+\alpha_2x_2\leq\beta\}$$
>
> *« **Prouvez que $\Omega$ est CONVEXE. Esquissez $\Omega$ dans le plan. Si $x_1=0$, quelle est la plus grande valeur que $x_2$ peut prendre ? Si $x_2=0$, quelle est la plus grande valeur de $x_1$ ? Marquez ces points sur votre croquis. (CELA VOUS RAPPELLE QUELQUE CHOSE ?) Prouvez que $\Omega$ est BORNÉ.** »*

> **Piste (hors cours).** **Convexité** : **$\Omega$ est l'INTERSECTION de trois demi-espaces fermés** — $\{x_1\geq0\}$, $\{x_2\geq0\}$ et $\{\alpha_1x_1+\alpha_2x_2\leq\beta\}$ — donc **convexe par le théorème A1.1** *(cf. A1.18)*. **Les deux intercepts** : $x_1=0\Rightarrow x_2\leq\beta/\alpha_2$ · $x_2=0\Rightarrow x_1\leq\beta/\alpha_1$. **« Cela vous rappelle quelque chose ? »** — **OUI : c'est L'ENSEMBLE BUDGÉTAIRE** du consommateur, avec $\alpha_i$ dans le rôle des **PRIX** et $\beta$ dans celui du **REVENU** *(chapitre 1)*. **Les intercepts sont les paniers de dépense totale en un seul bien.** **Bornitude** : $0\leq x_1\leq\beta/\alpha_1$ et $0\leq x_2\leq\beta/\alpha_2$ ⟹ **$\Omega\subset B_\varepsilon(\mathbf{0})$ pour $\varepsilon$ un peu plus grand que $\sqrt{(\beta/\alpha_1)^2+(\beta/\alpha_2)^2}$**. *(Joint à la fermeture, cela fait de l'ensemble budgétaire un **COMPACT** — l'hypothèse exacte dont Weierstrass a besoin pour garantir l'existence d'une demande optimale.)*

</details>

<details class="details--riche">
<summary>

**A1.32 — le simplexe unité**

</summary>

> *« L'ensemble $S^{n-1}\equiv\{\mathbf{x}\mid\sum_{i=1}^n x_i=1,\ x_i\geq0,\ i=1,\dots,n\}$ est appelé **le SIMPLEXE UNITÉ DE DIMENSION $(n-1)$**. (a) **Esquissez-le pour $n=2$.** (b) **Prouvez que $S^{n-1}$ est CONVEXE.** (c) **Prouvez que $S^{n-1}$ est COMPACT.** »*

> **Piste (hors cours).** **(a)** Pour $n=2$ : le **SEGMENT** joignant $(1,0)$ et $(0,1)$. **(b)** Si $\sum_i x^1_i=\sum_i x^2_i=1$ et $\mathbf{x}^1,\mathbf{x}^2\geq0$, alors $\sum_i\big[tx^1_i+(1-t)x^2_i\big]=t+(1-t)=1$ et **chaque coordonnée reste $\geq0$** . **(c)** **FERMÉ** : intersection de l'hyperplan $\{\sum x_i=1\}$ et de $\mathbb{R}^n_+$, **tous deux fermés** *(théorème A1.4(4))*. **BORNÉ** : **chaque $x_i\in[0,1]$** puisque les coordonnées sont non négatives de somme 1 ⟹ $\|\mathbf{x}\|\leq\sqrt{n}$. **C'est EXACTEMENT l'ensemble sur lequel le livre démontre le théorème de Brouwer** — et cet exercice vérifie qu'il satisfait bien **non vide, compact et convexe**.

</details>

### Bloc 4 — Continuité, Weierstrass et Brouwer (A1.33 à A1.39)

<details class="details--riche">
<summary>

**A1.33 et A1.34 — les analogues du théorème A1.6**

</summary>

**A1.33** *« **Prouvez l'analogue du théorème A1.6 POUR LES FERMÉS.** C'est-à-dire, montrez que les énoncés suivants sont équivalents : (i) $f:D\to\mathbb{R}^n$ est **continue** ; (ii) pour toute **BOULE FERMÉE** $B$ de $\mathbb{R}^n$, **l'image réciproque de $B$ est FERMÉE dans $D$** ; (iii) pour tout **sous-ensemble FERMÉ $S$** de $\mathbb{R}^n$, **l'image réciproque de $S$ est FERMÉE dans $D$**. »*

**A1.34** *« Prouvez que **$f:D\to\mathbb{R}^n$ est continue SI ET SEULEMENT SI $f^{-1}(T)$ est COMPACT dans le domaine $D\subset\mathbb{R}^m$ pour tout ensemble COMPACT $T$ de la range**. »*

> **Piste (hors cours).** **A1.33** : **Passer par les complémentaires**. $S$ fermé ⟺ $S^c$ ouvert ; et **l'exercice A1.13** donne $f^{-1}(S^c)=\big(f^{-1}(S)\big)^c$. Donc « $f^{-1}(S)$ fermée dans $D$ » ⟺ « $f^{-1}(S^c)$ ouverte dans $D$ » — et **le théorème A1.6 s'applique directement**. **A1.34** : **Attention, ce n'est PAS une conséquence immédiate du théorème A1.7** *(qui va dans l'autre sens : l'IMAGE d'un compact)*. **Le sens « ⟸ » est le plus délicat** : il faut exploiter que **les boules fermées sont compactes** pour retomber sur A1.33. **C'est un bon exercice de synthèse entre A1.33, A1.7 et la définition A1.8.**

</details>

<details class="details--riche">
<summary>

**A1.35 — les conditions de Weierstrass sont SUFFISANTES, pas NÉCESSAIRES**

</summary>

> *« **Pour vous convaincre que les conditions du théorème A1.10 sont SUFFISANTES MAIS PAS NÉCESSAIRES**, illustrez un cas simple comme ceux de la fig. A1.18 où **$f$ est réelle et CONTINUE, $S\subset D$ n'est PAS compact, et pourtant un minimum ET un maximum sur $S$ EXISTENT TOUS DEUX**. Illustrez un cas où **NI $S$ n'est compact, NI $f$ n'est continue, et pourtant maximum et minimum EXISTENT**. »*

> **Piste (hors cours).** **Premier cas** : prendre $S=(1,2)$ *(borné, pas fermé, donc **pas compact**)* et **$f$ CONSTANTE**, $f(x)=5$. **Le minimum et le maximum valent tous deux 5 et sont atteints en tout point.** **Second cas** : sur le même $S=(1,2)$, poser $f(x)=1$ pour $x\in(1;1{,}5)$ et $f(x)=2$ pour $x\in[1{,}5;2)$. **$f$ est DISCONTINUE en $1{,}5$ et $S$ n'est pas compact — pourtant le minimum 1 et le maximum 2 sont tous deux ATTEINTS.** **La morale, mot pour mot du cours** : *« si les conditions ne sont pas satisfaites, **LE SUJET PEUT ENCORE EXISTER — nous ne pouvons simplement pas en être sûrs EN GÉNÉRAL et A PRIORI** »*.

</details>

<details class="details--riche">
<summary>

**A1.36 — les demi-espaces**

</summary>

> *« **Tout HYPERPLAN divise $\mathbb{R}^n$ en deux « DEMI-ESPACES »** : l'ensemble des points « **sur et au-dessus** » de l'hyperplan, $H^+=\{\mathbf{x}\mid\mathbf{a}\cdot\mathbf{x}\geq\alpha\}$, et l'ensemble des points « **sur et en dessous** », $H^-=\{\mathbf{x}\mid\mathbf{a}\cdot\mathbf{x}\leq\alpha\}$. **Prouvez que chacun de ces deux demi-espaces est un ensemble FERMÉ et CONVEXE.** »*

> **Piste (hors cours).** **CONVEXE** : par **LINÉARITÉ** du produit scalaire, $\mathbf{a}\cdot\big(t\mathbf{x}^1+(1-t)\mathbf{x}^2\big)=t(\mathbf{a}\cdot\mathbf{x}^1)+(1-t)(\mathbf{a}\cdot\mathbf{x}^2)\geq t\alpha+(1-t)\alpha=\alpha$ . **FERMÉ** : **le plus rapide passe par les SUITES** *(théorème A1.9(2))* — si $\mathbf{x}^k\to\mathbf{x}$ avec $\mathbf{a}\cdot\mathbf{x}^k\geq\alpha$ pour tout $k$, alors **par continuité du produit scalaire** $\mathbf{a}\cdot\mathbf{x}\geq\alpha$, donc $\mathbf{x}\in H^+$. **Ce résultat est le socle des exercices A1.18 et A1.31**, et de toute la géométrie des ensembles budgétaires et des ensembles de production.

</details>

<details class="details--riche">
<summary>

**A1.37 et A1.38 — les conditions de Brouwer sont SUFFISANTES, pas NÉCESSAIRES**

</summary>

**A1.37** *« **Convainquez-vous que les conditions du théorème de Brouwer sont SUFFISANTES MAIS PAS NÉCESSAIRES** pour l'existence d'un point fixe, en illustrant les situations suivantes : (a) $S$ **compact**, $S$ **convexe**, $f$ **PAS continue**, et **un point fixe existe** · (b) $S$ compact, $S$ **PAS convexe**, $f$ continue, et un point fixe existe · (c) $S$ **PAS compact**, $S$ convexe, $f$ continue, et un point fixe existe · (d) $S$ **PAS compact**, $S$ **PAS convexe**, $f$ **PAS continue**, et un point fixe existe. »*

**A1.38** *« Soit $f(x)=x^2$ et supposons $S=(0,1)$. **Montrez que $f$ N'A AUCUN point fixe bien qu'elle soit une application CONTINUE de $S$ dans $S$. Cela CONTREDIT-IL le théorème de Brouwer ? Pourquoi ou pourquoi pas ?** »*

> **Piste (hors cours).** **A1.37 — des exemples possibles** : **(a)** $S=[0,1]$ et $f(x)=0$ pour $x\leq\tfrac12$, $f(x)=1$ pour $x>\tfrac12$ ⟹ **discontinue, mais $x^*=0$ est un point fixe** *(et $x^*=1$ aussi)*. **(b)** $S=[0,1]\cup[2,3]$ *(**compact mais PAS convexe**)* et $f=$ **l'identité** ⟹ **tout point est fixe**. **(c)** $S=(0,1)$ *(**convexe mais PAS compact**)* et $f=$ l'identité ⟹ **tout point est fixe**. **(d)** $S=(0,1)\cup(2,3)$ et $f$ discontinue valant l'identité sur $(0,1)$ et une constante de $(2,3)$ ailleurs ⟹ **des points fixes existent**. **A1.38** : les points fixes de $x^2$ résolvent $x^2=x$, soit **$x=0$ ou $x=1$ — NI L'UN NI L'AUTRE n'appartient à $(0,1)$**. Et $f$ envoie bien $(0,1)$ dans $(0,1)$ *(car $0<x<1\Rightarrow0<x^2<x<1$)* et **est continue**. **Aucune contradiction : $S=(0,1)$ N'EST PAS COMPACT** *(borné, mais **PAS FERMÉ**)*. **L'hypothèse de compacité tombe, donc le théorème ne s'applique tout simplement pas.**

</details>

<details class="details--riche">
<summary>

**A1.39 — Brouwer au travail, avec les nombres**

</summary>

> *« **Utilisez le théorème de Brouwer** pour montrer que l'équation $\cos(x)-x-\tfrac12=0$ **a une solution dans l'intervalle $0\leq x\leq\pi/4$**. »*

> **Piste (hors cours) — la reformulation en point fixe, pas à pas.**
>
> | Pas | L'argument |
> |---|---|
> | **1** | **Reformuler** : $\cos(x)-x-\tfrac12=0\iff\boxed{\cos(x)-\tfrac12=x}$, c'est-à-dire $f(x)=x$ avec $\ f(x)\equiv\cos(x)-\tfrac12$ |
> | **2** | $S=[0,\pi/4]$ est **NON VIDE**, **COMPACT** *(intervalle fermé borné)* et **CONVEXE** *(un intervalle)* |
> | **3** | $f$ est **CONTINUE** *(le cosinus l'est, moins une constante)* |
> | **4** | **$f$ envoie-t-elle $S$ DANS $S$ ?** $f$ est **décroissante** sur $[0,\pi/4]$, donc son image est $\big[f(\pi/4),\,f(0)\big]$ |
> | **5** | $f(0)=1-\tfrac12=\tfrac12$ et $f(\pi/4)=\tfrac{\sqrt2}{2}-\tfrac12\approx0{,}207$ ⟹ **image $\approx[0{,}207;\ 0{,}5]$** |
> | **6** | **Or $[0{,}207;\,0{,}5]\subset[0;\ \pi/4]$ puisque $\pi/4\approx0{,}785>0{,}5$** ⟹ **$f:S\to S$** |
> | **7** | ⟹ **Brouwer s'applique : il existe $x^*\in[0,\pi/4]$ avec $x^*=\cos(x^*)-\tfrac12$**, donc $\cos(x^*)-x^*-\tfrac12=0$ $\blacksquare$ |
>
> ⚠️ **L'étape 4-6 est celle que l'on oublie** — vérifier que **l'image reste DANS $S$**. C'est l'hypothèse « $f:S\to S$ ». **Et fidèlement à l'esprit du cours** : *« ils ne nous donnent **AUCUN INDICE de ce à quoi cela ressemble, NI OÙ LE TROUVER** »*. **Brouwer garantit la solution ; il ne la calcule pas.** *(Numériquement, elle vaut environ $0{,}415$.)*

</details>

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Confondre nécessaire et suffisant | **Nécessaire** : $A\Leftarrow B$ · **Suffisant** : $A\Rightarrow B$ | « $A$ **si** $B$ » vs « $A$ **seulement si** $B$ » |
| 2 | Mal former la contraposée | *« **la contraposition RENVERSE le sens de l'implication** »* | $A\Leftarrow B$ devient $\sim\!B\Leftarrow\ \sim\!A$ |
| 3 | Nier sans renverser | L'énoncé « $\sim\!A\Leftarrow\ \sim\!B$ » est **FAUX** — *« la valeur de $x$ pourrait fort bien être 9 »* | Le contre-exemple des entiers |
| 4 | Prouver une seule direction d'une équivalence | *« **les DEUX doivent être établis** »* | $A\Rightarrow B$ **ET** $B\Rightarrow A$ |
| 5 | Croire qu'un exemple prouve | *« **LA PREUVE PAR L'EXEMPLE N'EST PAS UNE PREUVE** »* | *« bons pour ILLUSTRER, pas pour prouver »* |
| 6 | Croire qu'un contre-exemple ne prouve rien | **L'inverse** — *« **UN SEUL contre-exemple peut RÉFUTER** »* | Asymétrie fondamentale |
| 7 | Croire que la preuve par l'absurde est toujours idéale | *« elle **N'ÉCLAIRE RAREMENT LA RELATION** entre la prémisse et la conclusion »* | Efficace mais **aveugle** |
| 8 | Lire « ou » au sens exclusif | *« **en mathématiques, le « ou » est INCLUSIF : l'un ou l'autre OU LES DEUX** »* | Note de bas de page 1 |
| 9 | Confondre $\geq$ et $\gg$ | $\mathbf{x}\gg\mathbf{y}$ exige **$x_i>y_i$ pour TOUT $i$** | Utilisé partout dans le livre |
| 10 | Croire que $t$ peut sortir de $[0,1]$ | La définition exige **$0\leq t\leq1$** | Sinon ce n'est plus une **moyenne** |
| 11 | Ne tester la convexité que sur quelques paires | Il faut **TOUTE paire et TOUT $t$** | *« toutes les combinaisons convexes de CHAQUE paire »* |
| 12 | Croire que l'UNION de convexes est convexe | **Seule l'INTERSECTION** l'est *(théorème A1.1)* | L'union de deux disques disjoints ne l'est pas |
| 13 | Croire que la complétude exige $x\neq y$ | *« **rien ne nous empêche de les choisir IDENTIQUES** »* | D'où l'échec de « $>$ » |
| 14 | Croire qu'une fonction est injective par définition | *« **rien n'interdit à PLUS D'UN élément du domaine d'être envoyé sur le MÊME élément** »* | $x^1$ et $x^2$ ↦ $y^1$ |
| 15 | Confondre image et range | **L'IMAGE $I\subset R$** — souvent **strictement** | Pour $y=\tfrac12x$ sur $[0,1]$ : $I=[0,\tfrac12]$ |
| 16 | Oublier ce qu'il faut pour une inverse | **UN-À-UN ET SUR** | Alors $f^{-1}$ l'est aussi |
| 17 | Écrire la distance sans racine | $d=\sqrt{(\mathbf{x}^1-\mathbf{x}^2)\cdot(\mathbf{x}^1-\mathbf{x}^2)}$ | Le produit scalaire donne **le carré** |
| 18 | Confondre boule ouverte et fermée | **$<$** pour l'ouverte, **$\leq$** pour la fermée | Définition A1.4 |
| 19 | Oublier qu'une boule est **un ensemble** | *« **Notez ATTENTIVEMENT que toute $\varepsilon$-boule est UN ENSEMBLE DE POINTS** »* | Pas un point |
| 20 | Croire qu'un même $\varepsilon$ marche partout | Le $\varepsilon$ **dépend du point** — *« si petit que son rayon doive être »* | D'où $\varepsilon_{\mathbf{x}}$ au thm A1.3 |
| 21 | Inverser les clauses de finitude du thm A1.2 | **UNION quelconque**, **INTERSECTION finie** | Pour les ouverts |
| 22 | Inverser celles du thm A1.4 | **UNION finie**, **INTERSECTION quelconque** | Pour les fermés |
| 23 | Croire qu'un ensemble est ouvert **ou** fermé | **$\varnothing$ et $\mathbb{R}^n$ sont LES DEUX** ; d'autres ne sont **NI l'un NI l'autre** | Ce ne sont **pas** des contraires |
| 24 | Oublier De Morgan dans le thm A1.4(3) | $\big(\bigcap_i S_i^c\big)^c=\bigcup_i S_i$ | C'est **le** pas de la preuve |
| 25 | Mal définir un point frontière | **Toute** $\varepsilon$-boule contient des points **de $S$ ET hors de $S$** | Il peut être **dans** ou **hors** de $S$ |
| 26 | Mal caractériser fermé par l'intérieur | $S=\operatorname{int}S\cup\partial S$ | Et **ouvert** ssi $S=\operatorname{int}S$ |
| 27 | Croire que la g.l.b. est dans l'ensemble | **Pour un OUVERT, elle N'y est PAS** *(thm A1.5(1))* | *« que $l$ soit dans $S$ ou non »* |
| 28 | Croire qu'un fermé est compact | **$\mathbb{R}^n$ est FERMÉ mais PAS BORNÉ** | Il faut **les deux** |
| 29 | Croire qu'un borné est compact | Un **intervalle ouvert** est borné, **pas fermé** | Il faut **les deux** |
| 30 | Croire que Heine-Borel est la définition | *« **la compacité est une propriété TOPOLOGIQUE à part entière** — Heine-Borel montre l'ÉQUIVALENCE dans $\mathbb{R}^n$ »* | Note 2 |
| 31 | Oublier l'intersection avec $D$ dans la déf. A1.9 | $f\big(B_\delta(\mathbf{x}^0)\cap D\big)\subset B_\varepsilon(f(\mathbf{x}^0))$ | Sinon la boule sort du domaine |
| 32 | Croire que la continuité préserve l'ouverture | ***« C'EST UNE INSTANCE OÙ L'INTUITION ÉCHOUE. »*** | Le contre-exemple $f(x)=a$ |
| 33 | Croire qu'un point est un ouvert | **Un point unique est FERMÉ** *(exercice A1.25)* | D'où le contre-exemple |
| 34 | Confondre ouvert et « ouvert dans $D$ » | **$D$ est TOUJOURS ouvert DANS $D$** | Définition A1.10 |
| 35 | Se tromper de sens dans le thm A1.6 | C'est **l'IMAGE RÉCIPROQUE** des ouverts qui est ouverte | *« de la RANGE vers le DOMAINE »* |
| 36 | Oublier le thm A1.3 dans (2)⟹(3) | **Tout ouvert est une UNION DE BOULES** | C'est là qu'il sert |
| 37 | Croire que l'image d'un fermé est fermée | **NON** — seul le résultat sur **les COMPACTS** vaut *(thm A1.7)* | Et il est « enfin intuitif » |
| 38 | Croire qu'une suite bornée converge | **NON** — $1,-1,1,-1,\dots$ | Mais elle a une **sous-suite** convergente |
| 39 | Croire que la limite est dans la suite | $1,\tfrac12,\tfrac13,\dots$ converge vers **0**, *« même si zéro n'est PAS un membre »* |  |
| 40 | Croire qu'une sous-suite peut être finie | $J$ doit être **un sous-ensemble INFINI de $I$** | Définition A1.15 |
| 41 | Mal énoncer le thm A1.9(2) | **Fermé** ssi **toute limite de suite de $D$ est DANS $D$** | La caractérisation la plus utile |
| 42 | Croire que les conditions d'existence sont nécessaires | *« elles sont **SUFFISANTES, PAS NÉCESSAIRES** »* | *« le sujet peut encore exister »* |
| 43 | Croire qu'un théorème d'existence aide à calculer | *« **AUCUN INDICE de ce à quoi cela ressemble, NI OÙ LE TROUVER** »* | *« assistance TRÈS FAIBLE »* |
| 44 | Oublier « non vide » dans Weierstrass | Sans lui, il n'y a **rien à maximiser** | Théorème A1.10 |
| 45 | Croire que Weierstrass exige la convexité | **NON** — seulement **continuité + compacité** | La convexité est pour **Brouwer** |
| 46 | Oublier « de $S$ DANS $S$ » dans Brouwer | **C'est l'hypothèse la plus souvent oubliée** | $f:S\to S$ |
| 47 | Oublier la convexité dans Brouwer | **Weierstrass** n'en a pas besoin, **Brouwer OUI** | Quatre hypothèses |
| 48 | Croire que le point fixe est unique | *« **AUCUNE référence n'est faite à L'UNICITÉ, SEULEMENT à L'EXISTENCE** »* | La fig. A1.23 croise **trois fois** |
| 49 | Croire que Brouwer donne la solution | Il donne **l'existence**, pas **la localisation** | Comme tout théorème d'existence |
| 50 | Se tromper dans la reformulation en point fixe | $f_i(\mathbf{x})=g_i(\mathbf{x})-x_i$ transforme $g_i=0$ en $f_i(\mathbf{x})=-x_i$… **suivre la convention du livre** : $f_i(\mathbf{x})=x_i$ | Vérifier l'équivalence à chaque fois |

## 📌 Ultimate Review

**§A1.1 — LA LOGIQUE.**

$$\boxed{\;\textbf{« $A$ NÉCESSAIRE pour $B$ »} = \textbf{« $A$ SI $B$ »} = A\Leftarrow B\\\textbf{« $A$ SUFFISANT pour $B$ »} = \textbf{« $A$ SEULEMENT SI $B$ »} = A\Rightarrow B\;}$$

**LA CONTRAPOSÉE** : *« **la contraposition RENVERSE le sens de l'implication** »* — $A\Rightarrow B$ équivaut à $\sim\!B\Rightarrow\ \sim\!A$.

**LES TROIS PREUVES** : **constructive** *(directe)* · **contrapositive** · **par l'absurde** — *« la dernière **ÉCLAIRE RAREMENT LA RELATION** »*.

⚠️ *« **LA PREUVE PAR L'EXEMPLE N'EST PAS UNE PREUVE.** »* Mais *« **UN SEUL contre-exemple peut RÉFUTER** »*.

**§A1.2 — LES ENSEMBLES.**

$S\cup T$ *(« ou », **INCLUSIF**)* · $S\cap T$ *(« et »)* · $S\times T$ · $\mathbb{R}^n$ · $\mathbb{R}^n_+$ · $\mathbf{x}\geq\mathbf{y}$ vs $\mathbf{x}\gg\mathbf{y}$.

**DÉF. A1.1 — CONVEXITÉ** : $t\mathbf{x}^1+(1-t)\mathbf{x}^2\in S$ **pour tout $t\in[0,1]$**.

**La réécriture éclairante** : $z=\mathbf{x}^2+t(\mathbf{x}^1-\mathbf{x}^2)$ — *« $\mathbf{x}^2$ **PLUS UNE PROPORTION $t$ de la distance** »*.

$$\boxed{\;\textbf{« Un ensemble est convexe SSI on peut relier deux points quelconques par}\\\textbf{UNE LIGNE DROITE ENTIÈREMENT DANS L'ENSEMBLE. »}\;}$$

⚠️ *« **Aucun trou, aucune cassure, aucune courbure maladroite. CE SONT DE JOLIS ENSEMBLES.** »*

**THÉORÈME A1.1** : **l'INTERSECTION de convexes est convexe** *(l'union, non)*.

**RELATIONS** : **DÉF. A1.2 complétude** *( **tester aussi $x=y$**)* · **DÉF. A1.3 transitivité**.

**FONCTIONS** : domaine, range, **IMAGE** $I\subset R$, **image RÉCIPROQUE** $f^{-1}(S)$, graphe · **UN-À-UN + SUR ⟹ $f^{-1}$ existe**.

**§A1.3 — LA TOPOLOGIE.**

$$d(\mathbf{x}^1,\mathbf{x}^2)=\sqrt{(\mathbf{x}^1-\mathbf{x}^2)\cdot(\mathbf{x}^1-\mathbf{x}^2)}=\|\mathbf{x}^1-\mathbf{x}^2\|$$

**DÉF. A1.4** : boule **OUVERTE** *(&lt;)*, boule **FERMÉE** *($\leq$)* — **ce sont des ENSEMBLES**.

**DÉF. A1.5 — OUVERT** : *« autour de **N'IMPORTE QUEL** point, **une boule ENTIÈREMENT dedans** »*.

| Théorème | Union | Intersection |
|---|---|---|
| **A1.2 (ouverts)** | **quelconque** | **FINIE** |
| **A1.4 (fermés)** | **FINIE** | **quelconque** |

⚠️ *« **$\varnothing$ et $\mathbb{R}^n$ sont LES SEULS DEUX ensembles À LA FOIS ouverts ET fermés.** »*

**THÉORÈME A1.3** : **tout ouvert est UNE RÉUNION DE BOULES OUVERTES** — *« pouvez-vous penser à un point qui ne soit pas dans l'un ? Si non, **vous vous êtes convaincu** »*.

**DÉF. A1.6 — FERMÉ** : **son COMPLÉMENTAIRE est OUVERT**.

$$\textbf{OUVERT} \iff S=\operatorname{int}S \qquad\qquad \textbf{FERMÉ} \iff S=\operatorname{int}S\cup\partial S$$

**DÉF. A1.7 — BORNÉ** · **THÉORÈME A1.5** : **un OUVERT ne contient PAS ses bornes ; un FERMÉ les contient** · **DÉF. A1.8 — COMPACT $=$ FERMÉ $+$ BORNÉ** *(Heine-Borel)*.

⚠️ **$\mathbb{R}^n$ est fermé MAIS PAS borné** ; **un intervalle ouvert est borné MAIS PAS fermé**.

**DÉF. A1.9 — CONTINUITÉ DE CAUCHY** :

$$f\big(B_\delta(\mathbf{x}^0)\cap D\big)\subset B_\varepsilon\big(f(\mathbf{x}^0)\big)$$

⚠️ *« **C'EST UNE INSTANCE OÙ L'INTUITION ÉCHOUE** : une fonction continue **N'envoie PAS forcément un ouvert sur un ouvert** »* — le contre-exemple $f(x)=a$, *« et **un point unique est FERMÉ** »*.

**THÉORÈME A1.6** — **de la RANGE vers le DOMAINE** :

$$f \textbf{ CONTINUE} \iff f^{-1}(\text{toute boule ouverte}) \textbf{ ouverte dans } D \iff f^{-1}(\text{tout ouvert}) \textbf{ ouvert dans } D$$

*(La preuve (2)⟹(3) utilise **le THÉORÈME A1.3**.)*

**THÉORÈME A1.7** : **l'image CONTINUE d'un COMPACT est COMPACTE** — *« ENFIN un résultat qui séduit l'intuition ! »*

**SUITES** : **A1.8** — **toute suite BORNÉE a une SOUS-SUITE CONVERGENTE** · **A1.9** — **fermé ssi toute limite de suite de $D$ est DANS $D$**, et **continue ssi $\mathbf{x}^k\to\mathbf{x}$ implique $f(\mathbf{x}^k)\to f(\mathbf{x})$**.

**§A1.3.2 — LES THÉORÈMES D'EXISTENCE.**

⚠️ *« Les conditions sont **SUFFISANTES, PAS NÉCESSAIRES** »* et *« ils ne donnent **AUCUN INDICE de ce à quoi cela ressemble, NI OÙ LE TROUVER** »*.

**THÉORÈME A1.10 (WEIERSTRASS)** :

$$\boxed{\;f \textbf{ CONTINUE sur } S \textbf{ NON VIDE et COMPACT} \ \Longrightarrow\ \exists\,\tilde{\mathbf{x}},\mathbf{x}^*\in S \ : \ f(\tilde{\mathbf{x}})\leq f(\mathbf{x})\leq f(\mathbf{x}^*)\;}$$

*Preuve : **A1.7** ⟹ $f(S)$ **compact** ⟹ **fermé et borné** ⟹ **A1.5(2)** ⟹ **il CONTIENT sa g.l.b. et sa l.u.b.**

⚠️ **Sans compacité** : *« sur $S=(1,2)$, **on peut se rapprocher DE PLUS EN PLUS de l'extrémité SANS JAMAIS L'ATTEINDRE** »*.

**LES POINTS FIXES** : $g_i(\mathbf{x})=0$ se réécrit $f_i(\mathbf{x})=x_i$ ⟹ *« $\mathbf{x}^*$ est **LAISSÉ INTACT, « NON DÉPLACÉ »** par la fonction »*.

⚠️ **Sa portée** : l'**existence de l'équilibre général**, le **théorème du minimax**, et **l'existence de l'équilibre de NASH** ont tous été démontrés ainsi.

**THÉORÈME A1.11 (BROUWER)** :

$$\boxed{\;S \textbf{ NON VIDE, COMPACT, CONVEXE} \ + \ f:S\to S \textbf{ CONTINUE} \ \Longrightarrow\ \exists\,\mathbf{x}^*=f(\mathbf{x}^*)\;}$$

⚠️ *« **AUCUNE référence n'est faite à L'UNICITÉ, SEULEMENT à L'EXISTENCE** »* — la fig. A1.23 croise la $45°$ **trois fois**.

> ⚠️ *« **Le théorème de Brouwer garantit qu'AU MOINS UNE MOLÉCULE DE VOTRE CAFÉ EST EXACTEMENT LÀ OÙ ELLE ÉTAIT AU DÉPART !** »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Distinguer nécessité et suffisance.**

</summary>

> *« Quand nous disons « **$A$ est NÉCESSAIRE pour $B$** », nous voulons dire que **$A$ DOIT être vrai POUR QUE $B$ soit vrai** »* ⟹ « **$A$ SI $B$** », « **$A$ est IMPLIQUÉ par $B$** », $A\Leftarrow B$.

> *« Quand nous disons « **$A$ est SUFFISANT pour $B$** », nous voulons dire que **chaque fois que $A$ tient, $B$ doit tenir** »* ⟹ « **$A$ SEULEMENT SI $B$** », $A\Rightarrow B$.

⚠️ **Le « seulement si » est du côté SUFFISANT.**

</details>

<details class="details--riche">
<summary>

**2. Former une contraposée correctement.**

</summary>

> *« **La contraposition des arguments RENVERSE LE SENS DE L'IMPLICATION pour un énoncé vrai.** »*

$$A\Leftarrow B \quad\text{équivaut à}\quad \sim\!B\Leftarrow\ \sim\!A$$

**Le contre-exemple du livre** : $A\equiv$ « $x$ entier $<10$ », $B\equiv$ « $x$ entier $<8$ ».

⚠️ *« **PRENEZ GARDE : $\sim\!A\Leftarrow\ \sim\!B$ est FAUX. La valeur de $x$ pourrait fort bien être 9.** »*

</details>

<details class="details--riche">
<summary>

**3. Illustrer nécessité et suffisance par le citron.**

</summary>

| Les énoncés | La relation |
|---|---|
| $A\equiv$ « $X$ est **JAUNE** », $B\equiv$ « $X$ est un **CITRON** » | **$A$ nécessaire, PAS suffisant** — *« **ce pourrait être une BANANE** »* |
| $A\equiv$ « fruit **ACIDE À PEAU JAUNE** », $B\equiv$ « **CITRON** » | **Nécessaire ET suffisant** ⟹ **une ÉQUIVALENCE** |

</details>

<details class="details--riche">
<summary>

**4. Décrire les trois méthodes de preuve.**

</summary>

| La méthode | Sa description |
|---|---|
| **CONSTRUCTIVE** | Supposer $A$, en **déduire** $B$ |
| **CONTRAPOSITIVE** | Supposer $\sim\!B$, montrer $\sim\!A$ — via **l'équivalence logique** |
| **PAR L'ABSURDE** | Supposer $A$ **ET** $\sim\!B$, dériver **une CONTRADICTION** |

⚠️ *« Les preuves par l'absurde peuvent être **TRÈS EFFICACES**, mais **parce qu'elles n'impliquent AUCUNE CHAÎNE CONSTRUCTIVE, ELLES ÉCLAIRENT RAREMENT LA RELATION** entre prémisse et conclusion. »*

⚠️ **Une équivalence exige DEUX preuves.**

</details>

<details class="details--riche">
<summary>

**5. Que dire des exemples et des contre-exemples ?**

</summary>

> *« **« LA PREUVE PAR L'EXEMPLE N'EST PAS UNE PREUVE ». […] Trouver UN étudiant aux cheveux roux ne va vous convaincre de RIEN. LES EXEMPLES SONT BONS POUR ILLUSTRER, MAIS TYPIQUEMENT PAS POUR PROUVER.** »*

> ⚠️ *« **Alors que citer 100 exemples ne peut JAMAIS prouver qu'une propriété tient toujours, CITER UN SEUL CONTRE-EXEMPLE PEUT RÉFUTER qu'elle tient toujours.** »*

</details>

<details class="details--riche">
<summary>

**6. Rappeler les notions de base des ensembles.**

</summary>

$S\subset T$ ssi $x\in S\Rightarrow x\in T$ · **$S=T$ ssi $S\subset T$ ET $T\subset S$** · $\varnothing$ · $S^c=U\setminus S$ · $S\setminus T$.

$$S\cup T=\{x\mid x\in S \textbf{ ou } x\in T\} \qquad S\cap T=\{x\mid x\in S \textbf{ et } x\in T\}$$

⚠️ *(Note 1)* *« **En mathématiques, le « ou » est INCLUSIF : l'un ou l'autre OU LES DEUX.** »*

</details>

<details class="details--riche">
<summary>

**7. Distinguer $\geq$ et $\gg$ dans $\mathbb{R}^n$.**

</summary>

$$\mathbb{R}^n_+\equiv\{(x_1,\dots,x_n)\mid x_i\geq0\ \forall i\}$$

$$\mathbf{x}\geq\mathbf{y} \iff x_i\geq y_i \ \forall i \qquad\qquad \mathbf{x}\gg\mathbf{y} \iff x_i>y_i \ \forall i$$

⚠️ **$\mathbf{x}\gg0$ signifie que CHAQUE composante est STRICTEMENT positive** — la notation employée dans **tout** le livre.

</details>

<details class="details--riche">
<summary>

**8. Énoncer la définition A1.1 et la traduire.**

</summary>

$S\subset\mathbb{R}^n$ est **convexe** si, pour tous $\mathbf{x}^1,\mathbf{x}^2\in S$ et **tout $t\in[0,1]$** :

$$t\mathbf{x}^1+(1-t)\mathbf{x}^2\in S$$

> *« **Un ensemble est convexe si, pour deux points quelconques, TOUTES LES MOYENNES PONDÉRÉES (où les poids somment à 1) sont AUSSI des points du même ensemble.** »*

⚠️ **La règle intuitive** : *« **on peut relier deux points quelconques par une LIGNE DROITE entièrement dans l'ensemble** »*.

</details>

<details class="details--riche">
<summary>

**9. Décortiquer la combinaison convexe.**

</summary>

$$z=t\mathbf{x}^1+(1-t)\mathbf{x}^2 \quad\Longleftrightarrow\quad z=\mathbf{x}^2+t\big(\mathbf{x}^1-\mathbf{x}^2\big)$$

> *« $\mathbf{x}^2$ comme **POINT DE DÉPART**, $(\mathbf{x}^1-\mathbf{x}^2)$ comme **la « DISTANCE »** ⟹ $z$ est **$\mathbf{x}^2$ PLUS UNE PROPORTION $t$ de la distance**. »*

**Avec $x^1=8$, $x^2=2$** : $t=0\Rightarrow z=2$ · $t=\tfrac12\Rightarrow z=5$ *(le milieu)* · $t=\tfrac23\Rightarrow z=6$ · $t=1\Rightarrow z=8$.

⚠️ *« **Les valeurs EXTRÊMES font COÏNCIDER la combinaison avec l'un des deux points.** »*

</details>

<details class="details--riche">
<summary>

**10. Démontrer le théorème A1.1.**

</summary>

Soient $S,T$ **convexes** et $\mathbf{x}^1,\mathbf{x}^2\in S\cap T$.

1. $\mathbf{x}^1,\mathbf{x}^2\in S$ **et** $\in T$.
2. Soit $z=t\mathbf{x}^1+(1-t)\mathbf{x}^2$, $t\in[0,1]$.
3. **$S$ convexe** ⟹ $z\in S$ ; **$T$ convexe** ⟹ $z\in T$.
4. ⟹ $z\in S\cap T$.

> *« **Parce que TOUTE combinaison convexe de deux points de $S\cap T$ est aussi dans $S\cap T$, $S\cap T$ est convexe.** »* $\blacksquare$

⚠️ **L'UNION, elle, ne l'est PAS en général.**

</details>

<details class="details--riche">
<summary>

**11. Définir une relation binaire, et donner l'exemple du livre.**

</summary>

> *« **Toute collection de couples ordonnés** est dite constituer **une RELATION BINAIRE**. […] Elle est définie en spécifiant **un RAPPORT SIGNIFIANT qui tient entre les éléments du couple**. »*

**L'exemple** : « **est la capitale de** » sur villes $\times$ pays donne $\{$(Washington, États-Unis), (Londres, Angleterre), (Paris, France)$\}$.

⚠️ *« **Une relation $R$ sur $S\times T$ est TOUJOURS UN SOUS-ENSEMBLE de $S\times T$.** »* On note $sRt$.

</details>

<details class="details--riche">
<summary>

**12. Énoncer complétude et transitivité, et le piège.**

</summary>

**DÉF. A1.2 — COMPLÉTUDE** : pour **tous** $x,y\in S$, $xRy$ **ou** $yRx$. **DÉF. A1.3 — TRANSITIVITÉ** : $xRy$ et $yRz$ ⟹ $xRz$.

⚠️ **LE PIÈGE** : sur $S=\{1,\dots,10\}$, la relation « **est plus grand que** » **n'est PAS complète** — *« on pourrait choisir **$x=y=1$** »*.

> *« **La définition N'EXIGE PAS que $x$ et $y$ soient DISTINCTS — RIEN ne nous empêche de les choisir IDENTIQUES.** »*

**En revanche**, « **est au moins aussi grand que** » **EST complète**.

</details>

<details class="details--riche">
<summary>

**13. Définir fonction, image et image réciproque.**

</summary>

> *« **Une fonction est une relation qui associe à CHAQUE élément d'un ensemble UN SEUL élément UNIQUE d'un autre ensemble.** »*

$f:D\to R$ · **IMAGE** $I\equiv\{y\mid y=f(x),\ x\in D\}\subset R$ · **IMAGE RÉCIPROQUE** $f^{-1}(S)\equiv\{x\in D\mid f(x)\in S\}$ · **GRAPHE** $G\equiv\{(x,y)\mid y=f(x)\}$.

⚠️ *« **Rien n'interdit à PLUS D'UN élément du domaine d'être envoyé sur LE MÊME élément de la range.** »*

**Exemples** : $\sin$ sur $\mathbb{R}$ a pour image $[-1,1]$ ; $y=\tfrac12x$ sur $[0,1]$ a pour image $[0,\tfrac12]$.

</details>

<details class="details--riche">
<summary>

**14. Définir injective, surjective, et la condition d'inversibilité.**

</summary>

| Le terme | La définition |
|---|---|
| **UN-À-UN** | *« chaque point de la range est atteint par **AU PLUS UN** point du domaine »* |
| **SUR** | *« **l'IMAGE ÉGALE LA RANGE** »* |

⚠️ *« **Si une fonction est un-à-un ET sur, alors une fonction INVERSE $f^{-1}:R\to D$ EXISTE, QUI EST ELLE AUSSI un-à-un et sur.** »*

</details>

<details class="details--riche">
<summary>

**15. Unifier les métriques de $\mathbb{R}$, $\mathbb{R}^2$ et $\mathbb{R}^n$.**

</summary>

| L'espace | La formule |
|---|---|
| $\mathbb{R}$ | $\|x^1-x^2\|=\sqrt{(x^1-x^2)(x^1-x^2)}$ |
| $\mathbb{R}^2$ | $\sqrt{a^2+b^2}$ — **Pythagore** |

⚠️ *« **Que cela soit évident ou non, LES DEUX FORMULES sont des CAS PARTICULIERS DE LA MÊME.** »* En effet, $(\mathbf{x}^1-\mathbf{x}^2)\cdot(\mathbf{x}^1-\mathbf{x}^2)$ *« **produit un SCALAIRE PRÉCISÉMENT le même que celui sous le radical** »*.

$$d(\mathbf{x}^1,\mathbf{x}^2)\equiv\sqrt{(\mathbf{x}^1-\mathbf{x}^2)\cdot(\mathbf{x}^1-\mathbf{x}^2)}\equiv\|\mathbf{x}^1-\mathbf{x}^2\|$$

</details>

<details class="details--riche">
<summary>

**16. Énoncer la définition A1.4, et donner les images en dimensions 1, 2, 3.**

</summary>

$$B_\varepsilon(\mathbf{x}^0)=\{\mathbf{x}\mid d<\varepsilon\} \qquad B_\varepsilon^*(\mathbf{x}^0)=\{\mathbf{x}\mid d\leq\varepsilon\}$$

⚠️ *« **Notez ATTENTIVEMENT que toute $\varepsilon$-boule est UN ENSEMBLE DE POINTS.** »*

| $n$ | Ouverte | Fermée |
|---|---|---|
| $1$ | l'intervalle **ouvert** | l'intervalle **fermé** |
| $2$ | le **disque** *(intérieur du cercle)* | intérieur **et bord** |
| $3$ | l'intérieur de la **sphère** | intérieur **et surface** |

⚠️ *« En dimension 4 et au-delà, **l'intuition est DIFFICILE, mais L'IDÉE RESTE LA MÊME**. »*

</details>

<details class="details--riche">
<summary>

**17. Démontrer que toute boule ouverte est un ensemble ouvert.**

</summary>

Soit $S=B_\varepsilon(\mathbf{x}^0)$ et $\mathbf{x}\in S$.

> *« Parce que $\mathbf{x}\in S$, **$d(\mathbf{x}^0,\mathbf{x})<\varepsilon$, donc $\varepsilon-d(\mathbf{x}^0,\mathbf{x})>0$** »*.

**En posant** $\varepsilon'=\varepsilon-d(\mathbf{x}^0,\mathbf{x})>0$ :

$$B_{\varepsilon'}(\mathbf{x})\subset S \qquad\textbf{« SI PRÈS DU BORD QUE NOUS PRENIONS } \mathbf{x} \textbf{ »}$$

⚠️ **C'est le « rayon restant jusqu'au bord ».**

</details>

<details class="details--riche">
<summary>

**18. Énoncer les théorèmes A1.2 et A1.4, et souligner la dissymétrie.**

</summary>

|  | **Ouverts (A1.2)** | **Fermés (A1.4)** |
|---|---|---|
| $\varnothing$ et $\mathbb{R}^n$ |  |  |
| **UNION** | **quelconque** | **FINIE** |
| **INTERSECTION** | **FINIE** | **quelconque** |

⚠️ *« **$\varnothing$ et $\mathbb{R}^n$ sont LES SEULS DEUX ensembles qui sont À LA FOIS ouverts ET fermés** — chacun étant **le complémentaire de l'autre**. »*

*(La preuve pour $\varnothing$ ouvert est **VACUEUSE** : *« s'il n'y a AUCUN point, il sera vrai que « pour chaque point… » »*.)*

</details>

<details class="details--riche">
<summary>

**19. Énoncer et justifier le théorème A1.3.**

</summary>

$$S=\bigcup_{\mathbf{x}\in S}B_{\varepsilon_{\mathbf{x}}}(\mathbf{x}) \qquad\textbf{pour tout ouvert } S$$

> *« Puisqu'il est ouvert, nous pouvons prendre **CHAQUE point et l'ENTOURER d'une boule ouverte entièrement contenue**. Pensez à **L'UNION** de toutes ces boules. »*

> ⚠️ *« **Pouvez-vous penser à un point de l'ensemble de départ qui NE SOIT PAS dans cette union ? Un point de cette union qui ne soit pas dans l'ensemble original ? Si vous avez répondu « NON » aux deux, VOUS VOUS ÊTES CONVAINCU.** »*

⚠️ **C'est l'outil clé du théorème A1.6.**

</details>

<details class="details--riche">
<summary>

**20. Définir fermé, frontière et intérieur.**

</summary>

**DÉF. A1.6** : $S$ est **FERMÉ** si **$S^c$ est OUVERT**.

| La notion | La définition |
|---|---|
| **Point FRONTIÈRE** | *« **TOUTE** $\varepsilon$-boule centrée en $\mathbf{x}$ contient des points **de $S$ ET hors de $S$** »* ⟹ $\partial S$ |
| **Point INTÉRIEUR** | *« il existe **une** $\varepsilon$-boule **entièrement dans $S$** »* ⟹ $\operatorname{int}S$ |

$$\textbf{OUVERT} \iff S=\operatorname{int}S \qquad \textbf{FERMÉ} \iff S=\operatorname{int}S\cup\partial S$$

> *« **Grossièrement, OUVERT s'il ne contient AUCUN de ses points frontière, FERMÉ s'il les contient TOUS.** »*

</details>

<details class="details--riche">
<summary>

**21. Énoncer et démontrer le théorème A1.5.**

</summary>

**Pour un OUVERT borné** : $a\notin S$ et $b\notin S$. **Pour un FERMÉ borné** : $a\in S$ et $b\in S$.

**Preuve (ouvert), par l'absurde** : si $a\in S$ et $S$ ouvert, il existe $\varepsilon>0$ avec $B_\varepsilon(a)\subset S$ ⟹ **$a-\tfrac12\varepsilon\in S$ ET $a-\tfrac12\varepsilon<a$** ⟹ **$a$ n'est PAS une borne inférieure**. Contradiction.

**Preuve (fermé)** : si $a<x$ pour tout $x\in S$, alors $a\in S^c$ **ouvert** ⟹ $B_\varepsilon(a)\subset S^c$ ⟹ **$a+\tfrac12\varepsilon$ est une borne inférieure PLUS GRANDE que $a$**. Contradiction.

</details>

<details class="details--riche">
<summary>

**22. Définir la compacité, et donner les exemples.**

</summary>

$$\textbf{COMPACT} \ = \ \textbf{FERMÉ ET BORNÉ} \qquad\text{(Heine-Borel)}$$

| L'ensemble | Compact ? |
|---|---|
| Intervalle **ouvert** | **NON** — borné mais **pas fermé** |
| Intervalle **fermé borné** |  |
| Boule **fermée de rayon fini** |  |
| $\mathbb{R}^n$ | **NON** — fermé mais **PAS BORNÉ** |

⚠️ *(Note 2)* *« **La compacité est une propriété TOPOLOGIQUE à part entière. Heine-Borel montre l'ÉQUIVALENCE POUR LES ENSEMBLES DE $\mathbb{R}^n$.** »*

</details>

<details class="details--riche">
<summary>

**23. Énoncer la définition A1.9 et justifier l'intersection avec $D$.**

</summary>

$$f\big(B_\delta(\mathbf{x}^0)\cap D\big)\subset B_\varepsilon\big(f(\mathbf{x}^0)\big)$$

> *« Quand **le domaine $D$ n'est qu'un SOUS-ENSEMBLE de $\mathbb{R}^m$, nous n'avons pas à nous soucier de TOUS les points à distance $\delta$, MAIS SEULEMENT DE CEUX DANS $D$** »*.

⚠️ **Sans l'intersection, la boule pourrait sortir du domaine et $f$ ne serait pas définie dessus.**

</details>

<details class="details--riche">
<summary>

**24. Pourquoi l'intuition échoue-t-elle sur la continuité ?**

</summary>

> *« Notre intuition suggère qu'une fonction continue est **un animal suffisamment RÉGULIER** pour que l'ouverture et la fermeture soient préservées. **MALHEUREUSEMENT, C'EST UNE INSTANCE OÙ L'INTUITION ÉCHOUE.** »*

**Le contre-exemple** : *« **$f(x)=a$ envoie CHAQUE ensemble ouvert du domaine sur LE SEUL POINT $a$** »* — et **un point unique est FERMÉ, pas ouvert** *(exercice A1.25)*.

⟹ *« **notre intuition nous fait défaut** »*.

</details>

<details class="details--riche">
<summary>

**25. Énoncer et démontrer le théorème A1.6.**

</summary>

$$f \textbf{ continue} \iff f^{-1}(\text{boule ouverte}) \textbf{ ouverte dans } D \iff f^{-1}(\text{ouvert}) \textbf{ ouvert dans } D$$

**(1)⟹(2)** : la continuité donne $\delta$ avec $f(B_\delta(\mathbf{x})\cap D)\subset B_\varepsilon(f(\mathbf{x}))\subset B$ ⟹ $B_\delta(\mathbf{x})\cap D\subset f^{-1}(B)$. **(2)⟹(3)** : **par le THÉORÈME A1.3**, $S=\bigcup_i B_i$ ⟹ $f^{-1}(S)=\bigcup_i f^{-1}(B_i)$ — **une union d'ouverts**. **(3)⟹(1)** : $B_\varepsilon(f(\mathbf{x}))$ ouverte ⟹ son image réciproque **ouverte dans $D$** ⟹ il existe $\delta$ ⟹ **continuité**.

> *« **Si nous savons quelque chose sur l'image réciproque, nous pouvons conclure sur la continuité — et RÉCIPROQUEMENT.** »*

</details>

<details class="details--riche">
<summary>

**26. Énoncer le théorème A1.7 et son commentaire.**

</summary>

**Si $D$ est COMPACT et $f$ CONTINUE, alors $f(D)$ est COMPACT.**

> ⚠️ *« **ENFIN, un résultat qui séduit l'intuition ! Malheureusement, la preuve nous emmène plus loin que nous ne souhaitons aller.** »* *(Royden 1963.)*

⚠️ **C'est LE théorème qui rend Weierstrass possible.**

</details>

<details class="details--riche">
<summary>

**27. Définir les suites et leurs propriétés.**

</summary>

**DÉF. A1.12** : une fonction d'un **sous-ensemble INFINI $I$ d'entiers positifs** dans $\mathbb{R}^n$. **DÉF. A1.13 — CONVERGENCE** : pour tout $\varepsilon>0$, **il existe $\bar k$** tel que $\mathbf{x}^k\in B_\varepsilon(\mathbf{x})$ **pour $k>\bar k$**. **DÉF. A1.14 — BORNÉE** : $\|\mathbf{x}^k\|\leq M$. **DÉF. A1.15 — SOUS-SUITE** : **$J$ est un sous-ensemble INFINI de $I$**.

**Les trois exemples** : $1,\tfrac12,\tfrac13,\dots\to0$ *( **zéro n'est PAS un membre**)* · $1,2,3,\dots$ **ne converge pas** · $1,-1,1,-1,\dots$ **bornée mais divergente**, de **sous-suite convergente**.

</details>

<details class="details--riche">
<summary>

**28. Énoncer les théorèmes A1.8 et A1.9.**

</summary>

**A1.8** : **TOUTE suite BORNÉE de $\mathbb{R}^n$ a une SOUS-SUITE CONVERGENTE.**

**A1.9** : **1.** $D$ **OUVERT** ssi toute suite convergeant vers un point de $D$ **finit par entrer dans $D$** ; **2.** $D$ **FERMÉ** ssi **toute limite de suite de points de $D$ est ELLE-MÊME dans $D$** ; **3.** $f$ **CONTINUE** ssi $\mathbf{x}^k\to\mathbf{x}$ implique $f(\mathbf{x}^k)\to f(\mathbf{x})$.

> *« **Il s'avère que nous AURIONS PU définir les ouverts et les fermés EN TERMES DE SUITES.** »*

</details>

<details class="details--riche">
<summary>

**29. Quels sont les deux avertissements sur les théorèmes d'existence ?**

</summary>

| # | L'avertissement |
|---|---|
| **1** | *« les conditions sont généralement **SUFFISANTES, PAS NÉCESSAIRES**. Si elles ne sont pas satisfaites, **LE SUJET PEUT ENCORE EXISTER — nous ne pouvons simplement pas en être sûrs EN GÉNÉRAL et A PRIORI** »* |
| **2** | *« bien qu'ils assurent que quelque chose existe, **ils ne donnent AUCUN INDICE de ce à quoi cela ressemble, NI OÙ LE TROUVER ! Ils fournissent des maillons PUISSANTS pour les arguments ABSTRAITS, mais UNE ASSISTANCE TRÈS FAIBLE pour les problèmes PRATIQUES** »* |

</details>

<details class="details--riche">
<summary>

**30. Énoncer et démontrer Weierstrass.**

</summary>

**$f:S\to\mathbb{R}$ CONTINUE, $S$ NON VIDE et COMPACT** ⟹ **il existe $\tilde{\mathbf{x}},\mathbf{x}^*$ avec $f(\tilde{\mathbf{x}})\leq f(\mathbf{x})\leq f(\mathbf{x}^*)$ partout.**

| Pas | L'argument | L'outil |
|---|---|---|
| **1** | $f(S)$ est **compact** | **THÉORÈME A1.7** |
| **2** | $f(S)\subset\mathbb{R}$ **fermé et borné** | **Déf. A1.8** |
| **3** | **il CONTIENT sa g.l.b. $a$ et sa l.u.b. $b$** | **THÉORÈME A1.5(2)** |
| **4** | Il existe $\mathbf{x}^*$ avec $f(\mathbf{x}^*)=b$ et $\tilde{\mathbf{x}}$ avec $f(\tilde{\mathbf{x}})=a$ | définition de l'image |

$\blacksquare$

</details>

<details class="details--riche">
<summary>

**31. Que se passe-t-il sans compacité ?**

</summary>

**Figure A1.18(b)** : $S=(1,2)$ — *« **borné, mais PAS FERMÉ. Clairement, AUCUN minimum ni maximum n'existe.** »*

> ⚠️ *« **Parce que $S$ est OUVERT, nous pouvons nous rapprocher DE PLUS EN PLUS de l'une ou l'autre extrémité SANS JAMAIS ATTEINDRE L'EXTRÉMITÉ. Ces mouvements sont envoyés sur des valeurs toujours plus basses ou plus élevées, N'ATTEIGNANT JAMAIS un minimum ou un maximum.** »*

</details>

<details class="details--riche">
<summary>

**32. Reformuler un système d'équations en problème de point fixe.**

</summary>

$$g_1(\mathbf{x})=0,\ \dots,\ g_n(\mathbf{x})=0 \tag{A1.1}$$

En posant $f_i(\mathbf{x})=g_i(\mathbf{x})-x_i$ :

$$f_1(\mathbf{x})=x_1,\ \dots,\ f_n(\mathbf{x})=x_n \tag{A1.2}$$

$$\mathbf{x}^* \text{ résout le système} \iff f(\mathbf{x}^*)=\mathbf{x}^*$$

> *« Le terme **POINT FIXE** est utilisé parce que ce sera un point **LAISSÉ INTACT, ou « NON DÉPLACÉ », par la fonction. $f$ prend simplement $\mathbf{x}^*$ ET LE RENVOIE SUR LUI-MÊME.** »*

</details>

<details class="details--riche">
<summary>

**33. Quelle est la portée des points fixes en économie ?**

</summary>

> *« **De nombreuses questions PROFONDES sur la COHÉRENCE des systèmes microéconomiques ont été RÉPONDUES en reformulant la question comme celle de L'EXISTENCE D'UN POINT FIXE.** »*

| Le résultat | Sa fiche |
|---|---|
| *« la vue d'une **économie concurrentielle** comme un système de marchés interreliés a été montrée **logiquement COHÉRENTE** »* | **510** |
| *« le fameux **théorème du MINIMAX** »* | **515** *(exercice 7.7)* |
| *« le **théorème d'existence de l'équilibre de NASH** »* | **515** *(théorème 7.2)* |

> *« **Dans ces cas et d'autres, UNE FORME DE THÉORÈME DU POINT FIXE JOUE UN RÔLE CENTRAL.** »*

</details>

<details class="details--riche">
<summary>

**34. Énoncer Brouwer et ses quatre hypothèses.**

</summary>

**$S\subset\mathbb{R}^n$ NON VIDE, COMPACT et CONVEXE ; $f:S\to S$ CONTINUE** ⟹ **il existe au moins un $\mathbf{x}^*=f(\mathbf{x}^*)$.**

| L'hypothèse | Souvent oubliée ? |
|---|---|
| **NON VIDE** |  |
| **COMPACT** *(fermé + borné)* |  |
| **CONVEXE** | **Weierstrass n'en a PAS besoin — Brouwer OUI** |
| **$f$ de $S$ DANS $S$** | **la plus souvent oubliée** |

*(Le livre prouve le cas du **simplexe unité**.)*

</details>

<details class="details--riche">
<summary>

**35. Que Brouwer NE dit-il PAS ?**

</summary>

> *« Quand $S=[a,b]$, **Brouwer garantit que LE GRAPHE croisera LA DROITE À $45°$ AU MOINS UNE FOIS**. Dans l'illustration, **$f$ effectue ce croisement TROIS FOIS**. »*

> ⚠️ *« **C'est pour vous ALERTER qu'AUCUNE référence n'est faite à L'UNICITÉ des points fixes, SEULEMENT à LEUR EXISTENCE. En fait, la figure A1.23 peut être prise comme UN CONTRE-EXEMPLE à tout « théorème » de ce genre que vous seriez TENTÉ DE CONSTRUIRE VOUS-MÊME !** »*

</details>

<details class="details--riche">
<summary>

**36. Raconter l'expérience de pensée du café.**

</summary>

> *« **Nous vous laissons avec une MODESTE EXPÉRIENCE DE PENSÉE que vous pouvez effectuer vous-même et MÉDITER AU MATIN.** »*

> *« **Considérez une TASSE DE CAFÉ. Pensez les molécules comme des points idéalisés de $\mathbb{R}^3$, et l'ensemble de toutes les molécules comme UN COMPACT CONVEXE de $\mathbb{R}^3$. Soulevez la tasse et remuez-la DOUCEMENT, de manière « CONTINUE » — SANS ÉCLABOUSSURES ! Laissez les molécules revenir au repos.** »*

> ⚠️ *« **LE THÉORÈME DE BROUWER GARANTIT QU'AU MOINS UNE MOLÉCULE DE VOTRE TASSE EST EXACTEMENT LÀ OÙ ELLE ÉTAIT AU DÉPART !** »*

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| « $A$ nécessaire pour $B$ » ? | $A\Leftarrow B$ — « $A$ **SI** $B$ » |
| « $A$ suffisant pour $B$ » ? | $A\Rightarrow B$ — « $A$ **SEULEMENT SI** $B$ » |
| Ce que fait la contraposition ? | Elle **RENVERSE le sens de l'implication** |
| La contraposée de $A\Leftarrow B$ ? | $\sim\!B\Leftarrow\ \sim\!A$ |
| Le contre-exemple du livre ? | « entier $<10$ » / « entier $<8$ » — **$x$ pourrait être 9** |
| L'exemple du citron ? | « **jaune** » est **nécessaire** ; « **acide à peau jaune** » est **nécessaire ET suffisant** |
| Les trois types de preuve ? | **Constructive** · **contrapositive** · **par l'absurde** |
| Le défaut de la preuve par l'absurde ? | *« elle **ÉCLAIRE RAREMENT LA RELATION** »* |
| Combien de preuves pour « ssi » ? | **DEUX** |
| L'adage sur les exemples ? | *« **La preuve par l'exemple n'est pas une preuve** »* |
| Et sur les contre-exemples ? | **UN SEUL suffit à RÉFUTER** |
| Le sens de « ou » en mathématiques ? | **INCLUSIF** — « l'un ou l'autre **OU LES DEUX** » |
| $S=T$ signifie ? | $S\subset T$ **ET** $T\subset S$ |
| $\mathbf{x}\geq\mathbf{y}$ ? | $x_i\geq y_i$ pour tout $i$ |
| $\mathbf{x}\gg\mathbf{y}$ ? | $x_i>y_i$ pour **TOUT** $i$ |
| Définition A1.1 ? | $t\mathbf{x}^1+(1-t)\mathbf{x}^2\in S$ pour **tout $t\in[0,1]$** |
| La réécriture de la combinaison convexe ? | $z=\mathbf{x}^2+t(\mathbf{x}^1-\mathbf{x}^2)$ |
| Ce que donnent $t=0$ et $t=1$ ? | Elle **COÏNCIDE** avec l'un des deux points |
| La règle intuitive de convexité ? | **Une LIGNE DROITE entièrement dans l'ensemble** |
| Le commentaire du livre sur les convexes ? | *« Ni trou, ni cassure — **CE SONT DE JOLIS ENSEMBLES** »* |
| Théorème A1.1 ? | **L'INTERSECTION** de convexes est convexe |
| Et l'union ? | **PAS forcément** |
| Ce qu'est une relation binaire ? | **Toujours un SOUS-ENSEMBLE de $S\times T$** |
| Définition A1.2 ? | Pour **tous** $x,y$ : $xRy$ **ou** $yRx$ |
| Le piège de la complétude ? | **Il faut tester $x=y$** |
| L'exemple qui échoue ? | « **est plus grand que** » sur les entiers |
| Définition A1.3 ? | $xRy$ et $yRz$ ⟹ $xRz$ |
| Ce qu'est une fonction ? | Une relation associant à chaque élément **UN SEUL élément UNIQUE** |
| Deux points peuvent-ils avoir la même image ? | **OUI** — rien ne l'interdit |
| L'image de $\sin$ sur $\mathbb{R}$ ? | $[-1,1]$ |
| Ce qu'il faut pour que $f^{-1}$ existe ? | **UN-À-UN ET SUR** |
| La métrique euclidienne ? | $\sqrt{(\mathbf{x}^1-\mathbf{x}^2)\cdot(\mathbf{x}^1-\mathbf{x}^2)}$ |
| Ce qu'unifie le produit scalaire ? | **La valeur absolue ET Pythagore** |
| Boule **ouverte** ? | $d<\varepsilon$ |
| Boule **fermée** ? | $d\leq\varepsilon$ |
| Une boule est ? | **UN ENSEMBLE DE POINTS** |
| Définition A1.5 ? | Autour de **chaque** point, **une boule entièrement dedans** |
| Le $\varepsilon'$ de la preuve ? | $\varepsilon-d(\mathbf{x}^0,\mathbf{x})>0$ |
| Théorème A1.2, l'union ? | **Quelconque** |
| Théorème A1.2, l'intersection ? | **FINIE** |
| Théorème A1.4, l'union ? | **FINIE** |
| Théorème A1.4, l'intersection ? | **Quelconque** |
| Les deux ensembles ouverts ET fermés ? | **$\varnothing$ et $\mathbb{R}^n$** |
| Pourquoi $\varnothing$ est ouvert ? | **Vacueusement** |
| Théorème A1.3 ? | **Tout ouvert est une RÉUNION DE BOULES OUVERTES** |
| Où sert-il ? | Dans la preuve du **théorème A1.6** |
| Définition A1.6 ? | **Son COMPLÉMENTAIRE est OUVERT** |
| L'outil de la preuve de A1.4(3) ? | **La loi de DE MORGAN** |
| Un point **frontière** ? | **Toute** boule contient des points **de $S$ ET hors de $S$** |
| Un point **intérieur** ? | Il existe **une** boule **entièrement dans $S$** |
| Ouvert en termes d'intérieur ? | $S=\operatorname{int}S$ |
| Fermé ? | $S=\operatorname{int}S\cup\partial S$ |
| Définition A1.7 ? | **Entièrement contenu dans une $\varepsilon$-boule** |
| La g.l.b. ? | **La PLUS GRANDE des bornes INFÉRIEURES** |
| Est-elle dans l'ensemble ? | **NON pour un OUVERT**, **OUI pour un FERMÉ** |
| Définition A1.8 ? | **COMPACT $=$ FERMÉ $+$ BORNÉ** |
| Son nom ? | **Heine-Borel** |
| $\mathbb{R}^n$ est-il compact ? | **NON — fermé mais PAS BORNÉ** |
| Un intervalle ouvert ? | **NON — borné mais PAS FERMÉ** |
| Définition A1.9 ? | $f\big(B_\delta(\mathbf{x}^0)\cap D\big)\subset B_\varepsilon(f(\mathbf{x}^0))$ |
| Pourquoi l'intersection avec $D$ ? | La boule pourrait **sortir du domaine** |
| La continuité préserve-t-elle l'ouverture ? | **NON — l'intuition ÉCHOUE** |
| Le contre-exemple ? | $f(x)=a$ — **un point est FERMÉ** |
| $D$ est-il ouvert dans $D$ ? | **TOUJOURS** |
| Théorème A1.6 ? | Continue $\iff$ **image réciproque d'un ouvert est ouverte** |
| Dans quel sens ça marche ? | **De la RANGE vers le DOMAINE** |
| Théorème A1.7 ? | **L'image continue d'un COMPACT est COMPACTE** |
| Le commentaire du livre ? | *« **ENFIN un résultat qui séduit l'intuition !** »* |
| Une sous-suite exige ? | $J$ **INFINI** |
| Une suite bornée converge-t-elle ? | **NON** — $1,-1,1,-1,\dots$ |
| Théorème A1.8 ? | Elle a **une SOUS-SUITE convergente** |
| Théorème A1.9(2) ? | **Fermé ssi toute limite de suite de $D$ est DANS $D$** |
| Théorème A1.9(3) ? | **Continue ssi $\mathbf{x}^k\to\mathbf{x}$ ⟹ $f(\mathbf{x}^k)\to f(\mathbf{x})$** |
| Les conditions d'existence sont ? | **SUFFISANTES, pas nécessaires** |
| Que ne donnent-elles pas ? | **Ni à quoi ça ressemble, NI OÙ LE TROUVER** |
| Théorème A1.10 ? | **(Weierstrass)** continue sur un compact **non vide** ⟹ **min et max atteints** |
| Les deux outils de sa preuve ? | **A1.7** puis **A1.5(2)** |
| Ce qui va mal sans compacité ? | *« se rapprocher **SANS JAMAIS ATTEINDRE** »* |
| Ce qu'est un point fixe ? | Un point **LAISSÉ INTACT** — $f(\mathbf{x}^*)=\mathbf{x}^*$ |
| Trois résultats démontrés par point fixe ? | **Équilibre général** · **minimax** · **équilibre de NASH** |
| Théorème A1.11 ? | **(Brouwer)** — au moins **un point fixe** |
| Ses quatre hypothèses ? | **Non vide** · **compact** · **convexe** · **$f:S\to S$ continue** |
| La plus souvent oubliée ? | **« DE $S$ DANS $S$ »** |
| Weierstrass exige-t-il la convexité ? | **NON** — **Brouwer OUI** |
| Le point fixe est-il unique ? | **NON** — *« aucune référence à l'unicité »* |
| Ce que montre la fig. A1.23 ? | **TROIS croisements** de la droite à $45°$ |
| L'expérience de pensée finale ? | **Au moins UNE MOLÉCULE DE VOTRE CAFÉ est exactement là où elle était** |
