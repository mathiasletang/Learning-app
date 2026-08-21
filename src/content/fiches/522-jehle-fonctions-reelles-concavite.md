# Fiche 522 — Fonctions réelles : ensembles de niveau, concavité et quasiconcavité

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — appendice mathématique, §A1.4 « Real-Valued Functions » (p. 529-545) |
| **Difficulté** | Intermédiaire — le vocabulaire de toutes les fonctions d'utilité et de production |
| **Temps d'étude estimé** | 120 min |
| **Prérequis** | [Fiche 521](521-jehle-ensembles-applications.md) — ensembles convexes *(déf. A1.1)*, combinaison convexe, fonctions, image |
| **Concepts clés** | Fonction réelle, fonction croissante, strictement croissante, fortement croissante, fonction décroissante, ensemble de niveau, courbe d'indifférence, isoquante, ensemble supérieur, ensemble inférieur, ensemble strictement supérieur, ensemble strictement inférieur, fonction concave, corde, fonction strictement concave, fonction quasiconcave, fonction strictement quasiconcave, fonction convexe, fonction strictement convexe, fonction quasiconvexe, fonction strictement quasiconvexe |
| **Poids à l'examen** | La **hiérarchie croissante / strictement croissante / fortement croissante** *(déf. A1.17)* · les **définitions A1.19-A1.21** et le **théorème A1.12** · la **définition A1.22** de la concavité et **la règle de la CORDE** · le **théorème A1.13** avec sa preuve étendue · la **définition A1.24** de la quasiconcavité et le **théorème A1.14** *(ensembles supérieurs convexes)* · le **théorème A1.15** *(concavité ⟹ quasiconcavité, et PAS la réciproque)* · les **théorèmes A1.16 à A1.19** et **le tableau récapitulatif de la figure A1.35**. |

## 🎯 Vue d'ensemble

```
LE FIL DU §A1.4 : le vocabulaire de TOUTES les fonctions de la microeconomie

  DEF. A1.16  FONCTION REELLE :  f : D -> R  avec  R INCLUS DANS R

     « Les fonctions d'UTILITE du consommateur, les fonctions de
       PRODUCTION et de COUT de la firme n'en sont que quelques
       exemples parmi les plus FAMILIERS. »

  §A1.4  LA HIERARCHIE DE LA CROISSANCE  (DEF. A1.17)

     CROISSANTE            f(x0) >= f(x1)  des que  x0 >= x1
     STRICTEMENT CROIS.    inegalite STRICTE des que  x0 >> x1
     FORTEMENT CROIS.      f(x0) > f(x1)  des que  x0 DISTINCT
                           de x1  ET  x0 >= x1

     FORTEMENT  =>  STRICTEMENT  =>  CROISSANTE
     ... et AUCUNE reciproque n'est vraie.

  §A1.4.1  LES ENSEMBLES ASSOCIES

     DEF. A1.19  NIVEAU        L(y0) = {x | f(x) = y0}
     DEF. A1.20  NIVEAU relatif a un POINT  L(x0)
     DEF. A1.21  SUPERIEUR  S(y0) = {x | f(x) >= y0}
                 INFERIEUR  I(y0) = {x | f(x) <= y0}
                 et leurs versions STRICTES  S'(y0) et I'(y0)

     THEOREME A1.12  les huit relations, dont
        L(y0) = S(y0) INTER I(y0)   et   S'(y0) INTER I'(y0) = VIDE

     « DEUX ENSEMBLES DE NIVEAU DIFFERENTS NE PEUVENT
       JAMAIS SE CROISER. »  ->  les courbes d'indifference

  §A1.4.2  LA CONCAVITE   (hypothese A1.1 : D est CONVEXE)

     DEF. A1.22  CONCAVE :  f(xt) >= t f(x1) + (1-t) f(x2)

     LA REGLE DE LA CORDE :
     « f est concave SSI, pour CHAQUE PAIRE de points de son
       graphe, LA CORDE QUI LES JOINT EST SUR OU SOUS LE GRAPHE. »

     THEOREME A1.13  f CONCAVE  <=>  l'ensemble des points
                     « SUR ET SOUS » le graphe est CONVEXE

     DEF. A1.23  STRICTEMENT CONCAVE :  inegalite STRICTE,
                 x1 DISTINCT de x2,  t dans l'OUVERT (0, 1)
                 ->  cela INTERDIT LES SEGMENTS LINEAIRES

  §A1.4.3  LA QUASICONCAVITE  ( une restriction PLUS FAIBLE )

     DEF. A1.24  f(xt) >= min[ f(x1), f(x2) ]

     THEOREME A1.14  f QUASICONCAVE  <=>  les ensembles
                     SUPERIEURS S(y) sont CONVEXES

     DEF. A1.25  STRICTEMENT QUASICONCAVE  ->  PAS de segment
                 plat dans la FRONTIERE des ensembles superieurs

     THEOREME A1.15  CONCAVE  =>  QUASICONCAVE
                     ... mais LA RECIPROQUE EST FAUSSE

  §A1.4.4  LE REVERS DE LA MEDAILLE

     DEF. A1.26  CONVEXE :  f(xt) <= t f(x1) + (1-t) f(x2)
     DEF. A1.27  QUASICONVEXE :  f(xt) <= max[ f(x1), f(x2) ]

     THM A1.16  f (strictement) CONCAVE  <=>  -f (strict.) CONVEXE
     THM A1.17  f CONVEXE  <=>  les points « SUR ET AU-DESSUS »
                du graphe forment un CONVEXE
     THM A1.18  f QUASICONVEXE  <=>  les ensembles INFERIEURS
                I(y) sont CONVEXES
     THM A1.19  f (strict.) QUASICONCAVE <=> -f (strict.) QUASICONVEXE

  LE TABLEAU FINAL (FIGURE A1.35) :

     CONCAVE       <=>  points SOUS le graphe = convexe
     CONVEXE       <=>  points AU-DESSUS du graphe = convexe
     QUASICONCAVE  <=>  ensembles SUPERIEURS convexes
     QUASICONVEXE  <=>  ensembles INFERIEURS convexes
     CONCAVE  =>  QUASICONCAVE      CONVEXE  =>  QUASICONVEXE
```

> ⚠️ **Note de transcription — spécifique à cette section.** Le PDF exporte **le symbole d'INTERSECTION $\cap$ comme un « + »** *(« $L(y^0)=S(y^0)+I(y^0)$ » signifie $S(y^0)\cap I(y^0)$)*, **PERD le symbole $\gg$** *(« l'inégalité est stricte dès que $x^0\ x^1$ » signifie $x^0\gg x^1$)* et **PERD le barré de $\neq$** *(« pour tous $x^1=x^2$ dans $D$ » signifie $x^1\neq x^2$)*. Il perd également $\sum$, et les figures utilisent l'encodage Symbol Mac *(`ϭ` = « = », `ϩ` = « + », `Ϫ` = « − », `Ϳ` = « | »)*. Les symboles ont été restitués **à partir de la prose du livre lui-même**, qui les explicite mot pour mot : *« rappelez-vous comment nous utilisons les symboles $\geq$ et $\gg$ dans le cas des relations vectorielles »*. **Il s'agit d'une réparation de transcription, non d'un ajout de contenu.**

## 🟠 Concept 1 — §A1.4 : les fonctions réelles

### 1.1 La définition A1.16

> *« **Les fonctions RÉELLES sont couramment rencontrées en théorie microéconomique. Les fonctions d'UTILITÉ du consommateur, les fonctions de PRODUCTION de la firme et les fonctions de COÛT de la firme ne sont que quelques-uns des exemples LES PLUS FAMILIERS.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.16 — Fonctions réelles</span>

$f:D\to R$ est une **fonction réelle** si $D$ est **un ensemble quelconque** et $R\subset\mathbb{R}$.

</div>

> *« Simplement dit, **$f$ est réelle si elle envoie les éléments de son domaine DANS LA DROITE RÉELLE**. Si le domaine est un sous-ensemble de $\mathbb{R}^n$, **une fonction réelle envoie des VECTEURS de $\mathbb{R}^n$ sur des POINTS de $\mathbb{R}$**. »*

**Les trois exemples du livre** — *« tous des exemples de fonctions réelles **parce que dans chaque cas, le membre de gauche EST UN NOMBRE RÉEL** »* :

$$y=ax_1+bx_2 \qquad\qquad y=\sqrt{z^2+w^2} \qquad\qquad y=\sum_{i=1}^{n}a_ix_i^2$$

> *« **La classe des fonctions réelles est, bien sûr, EXTRÊMEMENT LARGE.** »*

### 🔴 1.2 La définition A1.17 — les TROIS degrés de croissance

> *« Les fonctions réelles dans les applications économiques typiques tendent à être celles qui **MONTENT ou DESCENDENT DE MANIÈRE RÉGULIÈRE sur leur domaine**. […] **Ici, nous distinguons entre TROIS TYPES DE FONCTION CROISSANTE.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.17 — Fonctions croissantes, strictement croissantes et fortement croissantes</span>

Soit $f:D\to\mathbb{R}$, où $D\subset\mathbb{R}^n$. Alors : **$f$ est CROISSANTE** si $f(\mathbf{x}^0)\geq f(\mathbf{x}^1)$ **dès que $\mathbf{x}^0\geq\mathbf{x}^1$**. **Si, de plus, l'inégalité est STRICTE dès que $\mathbf{x}^0\gg\mathbf{x}^1$**, on dit que $f$ est **STRICTEMENT CROISSANTE**. **Si, à la place, $f(\mathbf{x}^0)>f(\mathbf{x}^1)$ dès que $\mathbf{x}^0$ et $\mathbf{x}^1$ sont DISTINCTS et que $\mathbf{x}^0\geq\mathbf{x}^1$**, on dit que $f$ est **FORTEMENT CROISSANTE**.

</div>

⚠️ **Tout se joue sur le symbole d'inégalité vectorielle employé** *(cf. [fiche 521](521-jehle-ensembles-applications.md), concept 3)*.

### 🔴 1.3 La lecture littérale du livre

> *« **Regardez ATTENTIVEMENT ces définitions et rappelez-vous comment nous utilisons les symboles $\geq$ et $\gg$ dans le cas des relations vectorielles.** »*

| Le type | Ce que le livre en dit, mot pour mot |
|---|---|
| **CROISSANTE** | *« une augmentation **d'une ou plusieurs** des composantes $x_i$ **NE FAIT JAMAIS DÉCROÎTRE** la valeur de la fonction »* |
| **STRICTEMENT CROISSANTE** | *« une augmentation de **TOUTES les composantes** de $\mathbf{x}$ fait **STRICTEMENT AUGMENTER** la valeur de la fonction »* |
| **FORTEMENT CROISSANTE** | *« une augmentation **d'UNE OU PLUSIEURS** des $x_i$ fait **STRICTEMENT AUGMENTER** la valeur de la fonction »* |

### 🔴 1.4 LA HIÉRARCHIE — à connaître par cœur

> *« **Avant de poursuivre, notez LA HIÉRARCHIE ici** : une fonction croissante **n'a pas besoin** d'être strictement croissante, et une fonction strictement croissante **n'a pas besoin** d'être fortement croissante, **MAIS toute fonction FORTEMENT croissante est STRICTEMENT croissante, et toute fonction STRICTEMENT croissante est CROISSANTE.** »*

$$\boxed{\;\textbf{FORTEMENT croissante} \ \Longrightarrow\ \textbf{STRICTEMENT croissante} \ \Longrightarrow\ \textbf{CROISSANTE}\;}$$

$$\textbf{ Et AUCUNE des réciproques n'est vraie.}$$

<details class="details--riche">
<summary>

**Enrichissement pédagogique (hors cours) — pourquoi « fortement » est plus exigeant que « strictement »**

</summary>

**L'hypothèse de « strictement croissante » est PLUS FACILE à satisfaire**, parce qu'elle **n'exige quelque chose que dans le cas $\mathbf{x}^0\gg\mathbf{x}^1$** — le cas où **TOUTES** les coordonnées augmentent. « Fortement croissante » exige la même conclusion **dans le cas beaucoup plus large $\mathbf{x}^0\geq\mathbf{x}^1$, $\mathbf{x}^0\neq\mathbf{x}^1$** — où **une seule** coordonnée peut avoir augmenté.

**Le témoin classique** : $f(x_1,x_2)=\min[x_1,x_2]$ sur $\mathbb{R}^2_+$. Avec $\mathbf{x}^1=(1,1)$ et $\mathbf{x}^0=(2,1)$ : $\mathbf{x}^0\geq\mathbf{x}^1$, $\mathbf{x}^0\neq\mathbf{x}^1$, **mais** $f(\mathbf{x}^0)=1=f(\mathbf{x}^1)$ ⟹ **PAS fortement croissante**. Avec $\mathbf{x}^0=(2,2)\gg(1,1)$ : $f=2>1$ ⟹ **strictement croissante**.

⚠️ **C'est exactement pourquoi le livre distingue les deux : les préférences à compléments parfaits (Leontief) sont strictement croissantes SANS être fortement croissantes.** *(Ce diagnostic est un enrichissement : le livre ne donne pas cet exemple ici.)*

</details>

### 1.5 La définition A1.18 — le miroir

> *« **Les fonctions DÉCROISSANTES sont définies de manière ANALOGUE, et nous faisons des distinctions semblables.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.18 — Fonctions décroissantes, strictement décroissantes et fortement décroissantes</span>

Soit $f:D\to\mathbb{R}$, $D\subset\mathbb{R}^n$. **$f$ est DÉCROISSANTE** si $f(\mathbf{x}^0)\leq f(\mathbf{x}^1)$ **dès que $\mathbf{x}^0\geq\mathbf{x}^1$**. Si, de plus, **l'inégalité est stricte dès que $\mathbf{x}^0\gg\mathbf{x}^1$**, $f$ est **STRICTEMENT DÉCROISSANTE**. Si, à la place, $f(\mathbf{x}^0)<f(\mathbf{x}^1)$ **dès que $\mathbf{x}^0$ et $\mathbf{x}^1$ sont distincts et $\mathbf{x}^0\geq\mathbf{x}^1$**, $f$ est **FORTEMENT DÉCROISSANTE**.

</div>

⚠️ **Notez bien que la prémisse reste $\mathbf{x}^0\geq\mathbf{x}^1$** dans les trois cas — **seule la conclusion change de sens**.

## 🟠 Concept 2 — §A1.4.1 : les ensembles de niveau

### 2.1 Pourquoi ils comptent

> *« Nous avons vu qu'**une fonction est une sorte particulière de RELATION** entre deux ensembles. […] Il existe **d'autres ensembles associés à une fonction qui sont devenus COURANTS dans la boîte à outils et le lexique de la théorie économique**. Comme le graphe, certains ont **des représentations géométriques particulièrement simples** et nous fournissent souvent **des façons ÉQUIVALENTES MAIS PLUS SIMPLES de penser et de manipuler les fonctions elles-mêmes**. »*

> *« La notion d'**ENSEMBLE DE NIVEAU (ou COURBE DE NIVEAU)** vous est sans doute assez familière, **quoique peut-être SOUS UN AUTRE NOM. De nombreux objets familiers en microéconomie, tels que LES COURBES D'INDIFFÉRENCE, LES ISOQUANTES, LES DROITES D'ISO-PROFIT, et ainsi de suite, sont tous des ENSEMBLES DE NIVEAU de fonctions réelles.** »*

### 2.2 La définition A1.19

> *« **Un ensemble de niveau est L'ENSEMBLE DE TOUS LES ÉLÉMENTS DU DOMAINE d'une fonction qui s'envoient sur LE MÊME NOMBRE, ou « NIVEAU », dans la range. Ainsi, deux éléments quelconques du même ensemble de niveau vont, PAR DÉFINITION, générer exactement le même nombre** dans la range lorsqu'on les injecte dans la fonction. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.19 — Ensembles de niveau</span>

$L(y^0)$ est un **ensemble de niveau** de la fonction réelle $f:D\to R$ **ssi**

$$L(y^0)=\{\mathbf{x}\mid\mathbf{x}\in D,\ f(\mathbf{x})=y^0\},\qquad\text{où } y^0\in R\subset\mathbb{R}$$

</div>

### 🔴 2.3 Ce qu'ils font gagner

> *« Notez que **ce sont des ensembles DANS LE DOMAINE de la fonction**. Parce que nous pouvons construire un ensemble de niveau pour **chaque valeur de son image**, nous pouvons **REPRÉSENTER COMPLÈTEMENT la fonction par ces ensembles de son domaine, RÉDUISANT AINSI D'UNE UNITÉ le nombre de dimensions nécessaires** pour représenter la fonction. »*

> ⚠️ *« C'est cette caractéristique des ensembles de niveau que vous avez vue si souvent exploitée dans la construction des **CARTES D'INDIFFÉRENCE**, des **CARTES D'ISOQUANTES**, etc. : **les ensembles de niveau nous permettent d'étudier des fonctions de trois variables — qui exigent normalement des graphes TRIDIMENSIONNELS MALCOMMODES — en nous concentrant sur des ensembles DU SIMPLE PLAN À DEUX DIMENSIONS.** »*

*(Figure A1.24 : quelques ensembles de niveau de $y=f(x_1,x_2)$.)*

### 🔴 2.4 La propriété fondamentale : deux niveaux ne se croisent JAMAIS

> *« **Nous devrions noter une AUTRE PROPRIÉTÉ des ensembles de niveau.** Nous avons vu que l'application $f:D\to R$ est une fonction **si et seulement si elle assigne UN SEUL NOMBRE de la range à CHAQUE élément du domaine.** »*

> ⚠️ *« **Par conséquent, DEUX ENSEMBLES DE NIVEAU DIFFÉRENTS D'UNE FONCTION NE PEUVENT JAMAIS SE CROISER NI S'INTERSECTER. S'ils le faisaient, cela signifierait que DEUX NOMBRES DIFFÉRENTS sont assignés à cet unique élément du domaine où ils se croisent. Ceci, bien sûr, VIOLERAIT LA DÉFINITION D'UNE FONCTION.** »*

$$\boxed{\;\textbf{Deux courbes d'indifférence ne se coupent jamais} \ \Longleftarrow\ \textbf{$f$ est une FONCTION}\;}$$

### 2.5 La définition A1.20 — le niveau relatif à un point

> *« Pour de nombreux usages, il est **commode de penser en termes d'ensembles de niveau RELATIFS À DES POINTS PARTICULIERS DU DOMAINE, plutôt que relatifs à des points de la range**. Parce qu'une fonction réelle envoie tout point $\mathbf{x}^0$ de son domaine sur un point ou niveau $f(\mathbf{x}^0)=y^0$ de sa range, **c'est SIMPLEMENT UNE QUESTION DE COMMODITÉ NOTATIONNELLE**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.20 — Ensembles de niveau relatifs à un point</span>

$L(\mathbf{x}^0)$ est un **ensemble de niveau relatif à $\mathbf{x}^0$** si

$$L(\mathbf{x}^0)=\{\mathbf{x}\mid\mathbf{x}\in D,\ f(\mathbf{x})=f(\mathbf{x}^0)\}$$

</div>

<details class="details--riche">
<summary>

**La discussion de la figure A1.25 — de quel côté du niveau ?**

</summary>

Le point $\mathbf{x}^0$ est sur le niveau $y^0$, donc $f(\mathbf{x}^0)=y^0$. *« **Que savons-nous des points AILLEURS dans le domaine, comme $\mathbf{x}^1$ et $\mathbf{x}^2$ ?** »*

**Le premier pas — les points comparables à $\mathbf{x}^0$ :**

> *« **Si $f$ est STRICTEMENT CROISSANTE, nous savons que $f(\mathbf{x}^1)>f(\mathbf{x}^0)$ et que $f(\mathbf{x}^2)<f(\mathbf{x}^0)$.** Ceci est clair parce que **les coordonnées du vecteur $\mathbf{x}^1$ ($\mathbf{x}^2$) sont TOUTES strictement plus grandes (plus petites) que celles de $\mathbf{x}^0$**, et qu'une fonction strictement croissante assigne des nombres plus grands (plus petits) aux vecteurs à composantes plus grandes (plus petites). »*

⚠️ **Le second pas — les points NON comparables, comme $\mathbf{x}^3$ et $\mathbf{x}^4$ :**

> *« **Mais que savons-nous des AUTRES points du MÊME CÔTÉ de $L(y^0)$ que $\mathbf{x}^1$ ou $\mathbf{x}^2$, comme $\mathbf{x}^3$ ou $\mathbf{x}^4$ ?** Clairement, que la fonction soit croissante ou décroissante, **les points comme $\mathbf{x}^3$ et $\mathbf{x}^4$ doivent donner une valeur de la fonction QUI EST DANS LE MÊME RAPPORT à $y^0$** que celles données par $\mathbf{x}^1$ et $\mathbf{x}^2$ respectivement. »*

⚠️ **L'astuce du raisonnement — passer par un point INTERMÉDIAIRE $\mathbf{x}^5$ situé sur $L(y^0)$ :**

> *« Ceci est clair parce que, par exemple, **$\mathbf{x}^3$ est DANS LE MÊME RAPPORT à un AUTRE point de $L(y^0)$, disons $\mathbf{x}^5$, que $\mathbf{x}^1$ l'est à $\mathbf{x}^0$. Parce que $\mathbf{x}^0$ ET $\mathbf{x}^5$ sont TOUS DEUX sur $L(y^0)$, nous savons que $f(\mathbf{x}^0)=f(\mathbf{x}^5)=y^0$.** Nous pouvons alors faire le même genre d'argument qu'auparavant. »*

| Si $f$ est… | Alors |
|---|---|
| **STRICTEMENT CROISSANTE** | $f(\mathbf{x}^1)>f(\mathbf{x}^0)=y^0$ **et** $f(\mathbf{x}^3)>f(\mathbf{x}^5)=y^0$ |
| **STRICTEMENT DÉCROISSANTE** | $f(\mathbf{x}^1)<f(\mathbf{x}^0)=y^0$ **et** $f(\mathbf{x}^3)<f(\mathbf{x}^5)=y^0$ |

⚠️ **La leçon** : **l'ensemble de niveau PARTAGE le domaine en deux régions**, et le raisonnement par un point de comparaison **sur le niveau** permet de classer **même les points non comparables** au point de départ.

</details>

## 🟠 Concept 3 — Ensembles supérieurs et inférieurs

### 3.1 La définition A1.21

> *« **En raisonnant selon ces lignes, nous pouvons définir quelques ensembles supplémentaires pour DIVISER LE DOMAINE d'une fonction de manière utile.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.21 — Ensembles supérieurs et inférieurs</span>

**1.** $S(y^0)\equiv\{\mathbf{x}\mid\mathbf{x}\in D,\ f(\mathbf{x})\geq y^0\}$ est appelé **l'ensemble SUPÉRIEUR pour le niveau $y^0$**. **2.** $I(y^0)\equiv\{\mathbf{x}\mid\mathbf{x}\in D,\ f(\mathbf{x})\leq y^0\}$ est appelé **l'ensemble INFÉRIEUR pour le niveau $y^0$**. **3.** $S'(y^0)\equiv\{\mathbf{x}\mid\mathbf{x}\in D,\ f(\mathbf{x})>y^0\}$ est appelé **l'ensemble STRICTEMENT SUPÉRIEUR**. **4.** $I'(y^0)\equiv\{\mathbf{x}\mid\mathbf{x}\in D,\ f(\mathbf{x})<y^0\}$ est appelé **l'ensemble STRICTEMENT INFÉRIEUR**.

</div>

⚠️ **Les quatre sont des ensembles DU DOMAINE**, comme les ensembles de niveau.

### 3.2 Le théorème A1.12

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.12 — Ensembles supérieurs, inférieurs et de niveau</span>

Pour toute $f:D\to R$ et tout $y^0\in R$ : **1.** $L(y^0)\subset S(y^0)$ **2.** $L(y^0)\subset I(y^0)$ **3.** $L(y^0)=S(y^0)\cap I(y^0)$ **4.** $S'(y^0)\subset S(y^0)$ **5.** $I'(y^0)\subset I(y^0)$ **6.** $S'(y^0)\cap L(y^0)=\varnothing$ **7.** $I'(y^0)\cap L(y^0)=\varnothing$ **8.** $S'(y^0)\cap I'(y^0)=\varnothing$

</div>

> *« **Parce que l'ensemble de niveau lui-même contient tous les points qui donnent à la fonction la valeur $y^0$, CES ENSEMBLES SONT CLAIREMENT LIÉS.** […] **Sa preuve est laissée en exercice** *(A1.41)*. »*

<details class="details--riche">
<summary>

**Enrichissement pédagogique (hors cours) — la preuve, en une ligne chacune**

</summary>

> ⚠️ **Le livre ne fournit PAS cette preuve** *(il la laisse en exercice A1.41, avec la consigne : « pour les parties 3 et 6 à 8, souvenez-vous de prouver que $A\subset B$ ET $B\subset A$ »)*. **Ce qui suit est un enrichissement pédagogique.**

Tout découle de la trichotomie sur $\mathbb{R}$ : pour tout réel $a$, **exactement une** des relations $a<y^0$, $a=y^0$, $a>y^0$ tient.

| # | L'argument |
|---|---|
| **1-2** | $f(\mathbf{x})=y^0$ implique **à la fois** $f(\mathbf{x})\geq y^0$ et $f(\mathbf{x})\leq y^0$ |
| **3** | **Double inclusion.** ($\subset$) par 1 et 2. ($\supset$) si $f(\mathbf{x})\geq y^0$ **et** $f(\mathbf{x})\leq y^0$, alors $f(\mathbf{x})=y^0$ |
| **4-5** | $>$ implique $\geq$ ; $<$ implique $\leq$ |
| **6** | $f(\mathbf{x})>y^0$ **exclut** $f(\mathbf{x})=y^0$ |
| **7** | $f(\mathbf{x})<y^0$ **exclut** $f(\mathbf{x})=y^0$ |
| **8** | $f(\mathbf{x})>y^0$ **exclut** $f(\mathbf{x})<y^0$ |

⚠️ **Les parties 6, 7 et 8 disent ensemble que $\{S'(y^0),\ L(y^0),\ I'(y^0)\}$ forme UNE PARTITION du domaine.**

</details>

### 🔴 3.3 Où sont-ils situés ? (figure A1.26)

> *« La figure A1.26 illustre les ensembles supérieurs et inférieurs **pour DEUX fonctions différentes, l'une CROISSANTE et l'autre DÉCROISSANTE**. »*

| Si $f$ est… | $S(y^0)$ | $I(y^0)$ | $S'(y^0)$ | $I'(y^0)$ |
|---|---|---|---|---|
| **CROISSANTE** | *« **SUR ET AU-DESSUS** de $L(y^0)$ »* | *« **SUR ET EN DESSOUS** »* | *« **STRICTEMENT AU-DESSUS** »* | *« **STRICTEMENT EN DESSOUS** »* |
| **DÉCROISSANTE** | *« **SUR ET EN DESSOUS** de $L(y^0)$ »* | *« **SUR ET AU-DESSUS** »* | *« **STRICTEMENT EN DESSOUS** »* | *« **STRICTEMENT AU-DESSUS** »* |

⚠️ **Tout s'inverse quand la fonction décroît** — et le livre prend soin de préciser *« **$S'(y^0)$, S'IL N'EST PAS VIDE** »*.

## 🔴 Concept 4 — §A1.4.2 : les fonctions concaves

### 4.1 L'hypothèse A1.1 — le cadre de travail

> *« Pour le reste de cette section, **nous restreindrons notre attention aux fonctions réelles DONT LES DOMAINES SONT DES ENSEMBLES CONVEXES. Ce sera pratiquement toujours le cas dans le travail ultérieur et sera généralement supposé même si ce n'est PAS EXPLICITEMENT ÉNONCÉ.** »*

> **HYPOTHÈSE A1.1 — Fonctions réelles sur des ensembles convexes** Dans toute cette section, chaque fois que $f:D\to\mathbb{R}$ est une fonction réelle, **nous supposerons que $D\subset\mathbb{R}^n$ est UN ENSEMBLE CONVEXE**. Quand nous prenons $\mathbf{x}^1\in D$ et $\mathbf{x}^2\in D$, nous noterons
>
> $$\mathbf{x}^t\equiv t\mathbf{x}^1+(1-t)\mathbf{x}^2,\qquad t\in[0,1]$$
>
> la **combinaison convexe** de $\mathbf{x}^1$ et $\mathbf{x}^2$. **Parce que $D$ est un ensemble convexe, nous savons que $\mathbf{x}^t\in D$.**

⚠️ **C'est cette hypothèse qui garantit que $f(\mathbf{x}^t)$ a un sens** — c'est le point où **la [fiche 521](521-jehle-ensembles-applications.md) devient indispensable**.

### 4.2 La définition A1.22

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.22 — Fonctions concaves</span>

$f:D\to\mathbb{R}$ est une **fonction CONCAVE** si, pour tous $\mathbf{x}^1,\mathbf{x}^2\in D$,

$$f(\mathbf{x}^t)\ \geq\ t\,f(\mathbf{x}^1)+(1-t)\,f(\mathbf{x}^2) \qquad\forall\,t\in[0,1]$$

</div>

> *« Grossièrement, selon cette définition, **$f$ est concave si SA VALEUR EN UNE COMBINAISON CONVEXE DE DEUX POINTS N'EST PAS PLUS PETITE QUE LA COMBINAISON CONVEXE DES DEUX VALEURS.** »*

### 🔴 4.3 La lecture géométrique — la corde

> *« **La définition correspond JOLIMENT à une propriété géométrique TRÈS SIMPLE du graphe de la fonction.** »*

<details class="details--riche">
<summary>

**La construction de la figure A1.27, pas à pas**

</summary>

1. **Prendre deux points du graphe** $(x^1,y^1)$ et $(x^2,y^2)$, et **tracer LA CORDE qui les relie**.
2. *« Quand nous formons une combinaison convexe des éléments du domaine, nous obtenons un point $x^t$, **une certaine PROPORTION de la distance entre $x^1$ et $x^2$** »* *(cf. fiche 521, concept 4)*.
3. *« Si nous formons **LA MÊME combinaison convexe des éléments correspondants de la range** $y^1=f(x^1)$ et $y^2=f(x^2)$, nous obtenons un point $y^t=tf(x^1)+(1-t)f(x^2)$ **à la MÊME proportion de la distance** entre $f(x^1)$ et $f(x^2)$ »*.
4. &gt; *« Si nous plaçons le point $(x^t,y^t)$, **il doit donc se trouver SUR LA CORDE RECTILIGNE** reliant $(x^1,f(x^1))$ et $(x^2,f(x^2))$. **L'ABSCISSE de $(x^t,y^t)$ est la combinaison convexe de $x^1$ et $x^2$, et L'ORDONNÉE est la MÊME combinaison convexe des nombres engendrés quand $f$ est évaluée en $x^1$ et $x^2$.** »*
5. *« **Pour que $f$ soit concave, la distance verticale au point $(x^t,f(x^t))$ doit être AU MOINS AUSSI GRANDE que la distance verticale au point de la corde $(x^t,y^t)$** ; c'est-à-dire que nous devons avoir $f(x^t)\geq y^t=tf(x^1)+(1-t)f(x^2)$. »*
6. *« Si nous considérons maintenant **TOUTES les valeurs de $t\in[0,1]$, nous parcourons TOUS les points de l'abscisse entre $x^1$ et $x^2$**. Pour chaque valeur de $t$, le même argument tiendrait. »*

</details>

### 🔴 4.4 LA RÈGLE À RETENIR

> *« Ceci suggère **une règle TRÈS SIMPLE ET INTUITIVE** : »*

$$\boxed{\;\textbf{« Une fonction est CONCAVE SSI, pour CHAQUE PAIRE de points de son graphe,}\\\textbf{LA CORDE QUI LES JOINT SE TROUVE SUR OU EN DESSOUS DU GRAPHE. »}\;}$$

<details class="details--riche">
<summary>

**Ce qui arrive quand la concavité échoue — la figure A1.28**

</summary>

> *« Cette fonction **EST concave sur les régions $[0,x^1]$ et $[x^2,\infty)$**, comme vous pouvez le voir aisément en traçant des cordes entre points du graphe **à l'intérieur de chacune de ces régions**. »*

> ⚠️ *« **Elle N'EST PAS concave, cependant, sur la région $[x^1,x^2]$.** Ici nous pouvons construire la corde entre $(x^1,f(x^1))$ et $(x^2,f(x^2))$ et **trouver un $t$ (disons $t=1/2$) tel que la combinaison convexe des points du graphe, $(x^t,y^t)$, se trouve STRICTEMENT AU-DESSUS du point $(x^t,f(x^t))$**. »*

> ⚠️ *« **Parce que nous avons trouvé DEUX points du domaine et AU MOINS UN $t\in[0,1]$ tels que $f(x^t)<tf(x^1)+(1-t)f(x^2)$, LA DÉFINITION DE LA CONCAVITÉ EST VIOLÉE.** »*

**C'est un CONTRE-EXEMPLE au sens de §A1.1.2** : *« un seul contre-exemple peut réfuter »* *(cf. [fiche 521](521-jehle-ensembles-applications.md))*.

</details>

## 🔴 Concept 5 — Le théorème A1.13 : concavité et ensemble sous le graphe

### 5.1 L'intuition, telle que le livre la construit

> *« **Regardez à nouveau les figures A1.27 et A1.28. Pouvez-vous SENTIR ce qui distingue** la fonction concave de la fig. A1.27 de la fonction non concave de la fig. A1.28 ? **Regardez l'aire SOUS le graphe** de la fig. A1.27 et sous les régions concaves du graphe de la fig. A1.28. **Comparez-les à l'aire sous la région NON concave.** »*

> ⚠️ *« Les points sous le graphe de toutes les régions concaves apparaissent **« BIEN COMPORTÉS » d'une manière que nous avons DÉJÀ VUE. En particulier, l'ensemble des points sous le graphe des régions concaves des deux fonctions sont DES ENSEMBLES CONVEXES. L'ensemble des points sous la région NON concave de la fig. A1.28 N'EST PAS un ensemble convexe.** »*

> *« Cette relation **est en fait TRÈS GÉNÉRALE ET INTIME. Elle vaut pour TOUTES les fonctions concaves, pas seulement pour les fonctions d'UNE SEULE variable. Elle est assez importante pour mériter d'être énoncée COMME UN THÉORÈME.** »*

### 5.2 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.13 — Les points sur et sous le graphe d'une fonction concave forment un ensemble convexe</span>

Soit $A\equiv\{(\mathbf{x},y)\mid\mathbf{x}\in D,\ f(\mathbf{x})\geq y\}$ l'ensemble des points **« SUR ET SOUS »** le graphe de $f:D\to R$, où $D\subset\mathbb{R}^n$ est **convexe** et $R\subset\mathbb{R}$. Alors

$$\boxed{\;f \textbf{ est une fonction CONCAVE} \quad\Longleftrightarrow\quad A \textbf{ est un ensemble CONVEXE}\;}$$

</div>

> *« Nous rencontrerons bientôt **plusieurs théorèmes comme celui-ci**, établissant l'équivalence entre un certain type de fonction et des ensembles convexes associés. **Les preuves de certains seront OMISES et celles d'autres laissées en exercices. Parce qu'il est important de développer votre INTUITION pour ces relations, nous donnerons ici une preuve de ce théorème. Pour rendre les choses AUSSI CLAIRES QUE POSSIBLE, nous adopterons une approche ÉTENDUE ET SANS HÂTE.** »*

### 5.3 La preuve étendue

<details class="details--riche">
<summary>

**Première partie — $f$ concave ⟹ $A$ convexe**

</summary>

> *« Parce que le théorème affirme **UNE ÉQUIVALENCE**, nous devrons **le SCINDER et donner une preuve « DANS LES DEUX DIRECTIONS »**. »*

**Hypothèse** : $f$ est concave, donc pour $\mathbf{x}^t\equiv t\mathbf{x}^1+(1-t)\mathbf{x}^2$ :

$$f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\quad\text{pour tous }\mathbf{x}^1,\mathbf{x}^2\in D,\ t\in[0,1] \tag{P.1}$$

**Prendre deux points quelconques** $(\mathbf{x}^1,y^1)\in A$ et $(\mathbf{x}^2,y^2)\in A$. **Par définition de $A$** :

$$f(\mathbf{x}^1)\geq y^1 \qquad\text{et}\qquad f(\mathbf{x}^2)\geq y^2 \tag{P.2}$$

**Ce qu'il faut montrer** : $(\mathbf{x}^t,y^t)\equiv\big(t\mathbf{x}^1+(1-t)\mathbf{x}^2,\ ty^1+(1-t)y^2\big)\in A$.

| Pas | L'argument |
|---|---|
| **1** | *« Parce que **$D$ est un ensemble convexe PAR HYPOTHÈSE**, nous savons $\mathbf{x}^t\in D$ »* — **il ne reste donc qu'à montrer $f(\mathbf{x}^t)\geq y^t$** |
| **2** | *« **Mais c'est facile.** »* De (P.2), **multiplier la première par $t\geq0$** et **la seconde par $(1-t)\geq0$** : $\ tf(\mathbf{x}^1)\geq ty^1$ et $(1-t)f(\mathbf{x}^2)\geq(1-t)y^2$ |
| **3** | **Additionner** : $\ tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\geq ty^1+(1-t)y^2$ |
| **4** | **Utiliser (P.1)** et $y^t\equiv ty^1+(1-t)y^2$ : $\ f(\mathbf{x}^t)\geq y^t$ |
| **5** | ⟹ $(\mathbf{x}^t,y^t)\in A$ ⟹ **$A$ est un ensemble convexe** |

⚠️ **Le point délicat du pas 2** : c'est **la NON-NÉGATIVITÉ de $t$ et de $1-t$** qui permet de multiplier une inégalité sans en renverser le sens.

</details>

<details class="details--riche">
<summary>

**Seconde partie — $A$ convexe ⟹ $f$ concave**

</summary>

> *« **La STRATÉGIE de cette partie** est de prendre **deux points QUELCONQUES du domaine $D$ de $f$**, mais **DEUX POINTS PARTICULIERS de l'ensemble $A$** : à savoir **les deux points de $A$ qui sont SUR le graphe de $f$, plutôt qu'EN DESSOUS**, correspondant à ces deux points du domaine. Si nous pouvons utiliser la convexité de $A$ pour établir que $f$ satisfait la définition d'une fonction concave en ces deux points, **nous aurons établi l'affirmation EN GÉNÉRAL parce que ces deux points sont choisis ARBITRAIREMENT.** »*

Choisir $\mathbf{x}^1,\mathbf{x}^2\in D$ et poser

$$y^1=f(\mathbf{x}^1) \qquad\text{et}\qquad y^2=f(\mathbf{x}^2) \tag{P.3}$$

| Pas | L'argument |
|---|---|
| **1** | *« Les points $(\mathbf{x}^1,y^1)$ et $(\mathbf{x}^2,y^2)$ **sont donc dans $A$ parce qu'ils satisfont $\mathbf{x}^i\in D$ et $f(\mathbf{x}^i)\geq y^i$** »* — ici **avec ÉGALITÉ** |
| **2** | **Former la combinaison convexe** $(\mathbf{x}^t,y^t)$. **$A$ étant convexe**, $(\mathbf{x}^t,y^t)\in A$ pour tout $t\in[0,1]$ ⟹ $f(\mathbf{x}^t)\geq y^t$ **(P.4)** |
| **3** | Or $y^t\equiv ty^1+(1-t)y^2$ ; **substituer (P.3)** : $\ y^t=tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$ **(P.5)** |
| **4** | **Combiner (P.4) et (P.5)** : $\ f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$ pour tout $t\in[0,1]$ ⟹ **$f$ est concave** |

> *« **Parce que nous avons établi les affirmations DANS LES DEUX DIRECTIONS ($\Rightarrow$ et $\Leftarrow$), la preuve est COMPLÈTE.** »* $\blacksquare$

⚠️ **Le cœur de l'astuce** : choisir $y^i$ **exactement égal** à $f(\mathbf{x}^i)$ — **les points « au ras » du graphe** — pour que l'inégalité de $A$ redonne exactement l'inégalité de concavité.

</details>

### 🔴 5.4 Ce que le théorème apporte

> *« Nous avons maintenant **DEUX FAÇONS ÉQUIVALENTES DE PENSER LES FONCTIONS CONCAVES** : l'une en termes de **LA VALEUR que la fonction prend en une combinaison convexe** de deux points, et l'autre en termes de **LA « FORME » de l'ensemble inscrit par le graphe** de la fonction. **L'UNE OU L'AUTRE spécification DÉFINIT COMPLÈTEMENT une fonction concave.** »*

## 🟠 Concept 6 — La concavité STRICTE

### 6.1 Ce que la concavité simple autorise (figure A1.29)

> *« Selon la définition, **la figure A1.29 EST concave. RIEN dans la définition, ni dans le théorème A1.13, N'INTERDIT LES SEGMENTS LINÉAIRES dans le graphe de la fonction. L'ensemble en dessous est TOUJOURS CONVEXE.** »*

> ⚠️ *« En $x^t$, **la valeur de la fonction est EXACTEMENT ÉGALE à la combinaison convexe de $f(x^1)$ et $f(x^2)$**, donc l'inégalité $f(x^t)\geq tf(x^1)+(1-t)f(x^2)$ **TIENT TOUJOURS là. Géométriquement, le point $(x^t,f(x^t))$ se trouve simplement SUR la corde, plutôt que STRICTEMENT AU-DESSUS — ET C'EST TOUT À FAIT ADMISSIBLE.** »*

### 6.2 La définition A1.23

> *« **Il est parfois COMMODE D'EXCLURE la possibilité de segments linéaires** dans le graphe de la fonction. **La concavité STRICTE écarte ce genre de chose.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.23 — Fonctions strictement concaves</span>

$f:D\to\mathbb{R}$ est **strictement concave ssi**, pour tous $\mathbf{x}^1\neq\mathbf{x}^2$ dans $D$,

$$f(\mathbf{x}^t)\ >\ t\,f(\mathbf{x}^1)+(1-t)\,f(\mathbf{x}^2) \qquad\textbf{pour tout } t\in(0,1)$$

</div>

### 🔴 6.3 Les DEUX différences, mot pour mot

> *« **Notez TRÈS ATTENTIVEMENT les PETITES MAIS IMPORTANTES différences** entre les définitions de fonction concave et strictement concave. »*

| # | La différence |
|---|---|
| **1** | *« **D'abord, la concavité stricte exige que $f(\mathbf{x}^t)$ soit STRICTEMENT PLUS GRAND que la combinaison convexe** de $f(\mathbf{x}^1)$ et $f(\mathbf{x}^2)$, **plutôt que plus grand OU ÉGAL** »* |
| **2** | *« **Ensuite, l'inégalité stricte doit tenir pour tout $t$ dans L'INTERVALLE OUVERT $(0,1)$, plutôt que dans l'intervalle FERMÉ $[0,1]$** comme auparavant »* |

⚠️ **POURQUOI l'intervalle ouvert ?**

> *« **Cela a PARFAITEMENT SENS parce que si $t$ valait zéro ou un, la combinaison convexe $\mathbf{x}^t$ COÏNCIDERAIT avec $\mathbf{x}^2$ ou $\mathbf{x}^1$, ET L'INÉGALITÉ STRICTE DE LA DÉFINITION NE POURRAIT PAS TENIR.** »*

*(À $t=0$ ou $t=1$, les deux membres sont **égaux** — la définition deviendrait **impossible à satisfaire**.)*

### 6.4 La lecture géométrique

> *« Géométriquement, ces modifications exigent simplement que **LE GRAPHE DE LA FONCTION SE TROUVE STRICTEMENT AU-DESSUS DE LA CORDE reliant deux points quelconques du graphe, SAUF EN CES DEUX POINTS EUX-MÊMES. Ceci sert à ÉCARTER LES PORTIONS PLATES du graphe de la fonction.** »*

## 🔴 Concept 7 — §A1.4.3 : les fonctions quasiconcaves

### 🔴 7.1 Pourquoi affaiblir la concavité

> *« **La concavité, stricte ou non, est une restriction RELATIVEMENT FORTE à imposer à une fonction. Souvent, l'un des objectifs du travail théorique est d'identifier et d'imposer SEULEMENT LES RESTRICTIONS LES PLUS FAIBLES POSSIBLES nécessaires pour garantir le résultat recherché. La QUASICONCAVITÉ est une propriété APPARENTÉE MAIS PLUS FAIBLE qui est souvent tout ce qu'il faut pour nous mener là où nous voulons aller.** »*

### 7.2 La définition A1.24

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.24 — Fonctions quasiconcaves</span>

$f:D\to\mathbb{R}$ est **quasiconcave ssi**, pour tous $\mathbf{x}^1$ et $\mathbf{x}^2$ dans $D$,

$$f(\mathbf{x}^t)\ \geq\ \min\big[f(\mathbf{x}^1),\ f(\mathbf{x}^2)\big] \qquad\textbf{pour tout } t\in[0,1]$$

</div>

> *(Note 7.)* *« **L'opérateur $\min[a,b]$ signifie simplement « LE PLUS PETIT DE $a$ ET $b$ ». Si $a>b$, alors $\min[a,b]=b$. Si $a=b$, alors $\min[a,b]$ vaut $a$ ET $b$.** »*

> *« **Il faut l'admettre, cette définition semble plutôt MALCOMMODE au premier abord.** Elle dit que **si nous prenons deux points quelconques du domaine et formons une combinaison convexe quelconque, LA VALEUR DE LA FONCTION NE DOIT PAS ÊTRE PLUS BASSE QUE LA PLUS BASSE DES VALEURS qu'elle prend aux deux points.** »*

### 🔴 7.3 La lecture par les ensembles de niveau (figure A1.30)

> *« **Une AUTRE FAÇON de décrire les fonctions quasiconcaves est EN TERMES DE LEURS ENSEMBLES DE NIVEAU.** »*

> *« Supposons $y=f(x_1,x_2)$ et prenons deux points quelconques $\mathbf{x}^1$ et $\mathbf{x}^2$ de son domaine. Chacun **donne lieu à une valeur de la fonction et donc chacun se trouve SUR UN CERTAIN ENSEMBLE DE NIVEAU** dans le plan du domaine. Quand nous formons une combinaison convexe, nous obtenons un point $\mathbf{x}^t$ **quelque part sur la CORDE** reliant $\mathbf{x}^1$ et $\mathbf{x}^2$. La fonction a une certaine valeur en $\mathbf{x}^t$ aussi, **donc $\mathbf{x}^t$ se trouve sur un ensemble de niveau LUI AUSSI**. »*

⚠️ **Dans les deux panneaux de la figure A1.30, le livre suppose $f(\mathbf{x}^1)\geq f(\mathbf{x}^2)$.**

| Si $f$ est… | Elle est quasiconcave dès que… |
|---|---|
| **CROISSANTE** *(fig. A1.30(a))* | *« l'ensemble de niveau relatif à toute combinaison convexe, $L(\mathbf{x}^t)$, est **TOUJOURS SUR OU AU-DESSUS DU PLUS BAS des ensembles de niveau $L(\mathbf{x}^1)$ et $L(\mathbf{x}^2)$** »* |
| **DÉCROISSANTE** *(fig. A1.30(b))* | *« l'ensemble de niveau relatif à toute combinaison convexe est **TOUJOURS SUR OU EN DESSOUS DU PLUS HAUT des deux ensembles de niveau** »* |

### 🔴 7.4 L'annonce du théorème

> *« **Les ensembles de niveau de la figure A1.30 ont été dessinés JOLIMENT INCURVÉS POUR UNE BONNE RAISON.** Outre le positionnement relatif des ensembles de niveau déjà noté, **la quasiconcavité exige un COMPORTEMENT TRÈS RÉGULIER DE SES ENSEMBLES SUPÉRIEURS. Comme vous l'avez peut-être deviné, CEUX-CI DOIVENT ÊTRE CONVEXES.** »*

## 🔴 Concept 8 — Le théorème A1.14 : quasiconcavité et ensembles supérieurs

### 8.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.14 — Quasiconcavité et ensembles supérieurs</span>

$$\boxed{\;f:D\to\mathbb{R} \textbf{ est QUASICONCAVE} \quad\Longleftrightarrow\quad S(y) \textbf{ est un ensemble CONVEXE pour tout } y\in\mathbb{R}\;}$$

</div>

### 8.2 La preuve

<details class="details--riche">
<summary>

**Suffisance — $f$ quasiconcave ⟹ $S(y)$ convexe**

</summary>

Soit $y\in\mathbb{R}$ quelconque et $\mathbf{x}^1,\mathbf{x}^2\in S(y)$.

> ⚠️ *« **(Si $S(y)$ est VIDE, notre travail est IMMÉDIATEMENT terminé parce que L'ENSEMBLE VIDE EST CONVEXE.)** »*

| Pas | L'argument |
|---|---|
| **1** | Par définition de l'ensemble supérieur : $\ f(\mathbf{x}^1)\geq y$ et $f(\mathbf{x}^2)\geq y$ **(P.1)** |
| **2** | *« Nous savons $\mathbf{x}^t\in D$ **parce que nous supposons que $D$ est un ensemble CONVEXE** »* *(hypothèse A1.1)* |
| **3** | **Par quasiconcavité** : $\ f(\mathbf{x}^t)\geq\min[f(\mathbf{x}^1),f(\mathbf{x}^2)]\geq y$ **(P.2)** |
| **4** | *« **La PREMIÈRE inégalité est LA DÉFINITION de la quasiconcavité, et la SECONDE découle de (P.1)** »* |
| **5** | $\mathbf{x}^t\in D$ **et** $f(\mathbf{x}^t)\geq y$ ⟹ $\mathbf{x}^t\in S(y)$ ⟹ **$S(y)$ est convexe** |

⚠️ **Le pas 3 est l'essence même de la définition** : le minimum des deux valeurs est **déjà $\geq y$**, donc tout ce qui est au-dessus du minimum l'est aussi.

</details>

<details class="details--riche">
<summary>

**Nécessité — $S(y)$ convexe pour tout $y$ ⟹ $f$ quasiconcave**

</summary>

Soient $\mathbf{x}^1,\mathbf{x}^2\in D$. *« **SANS PERTE DE GÉNÉRALITÉ, supposons que nous ayons étiqueté les choses de sorte que** »*

$$f(\mathbf{x}^1)\geq f(\mathbf{x}^2) \tag{P.3}$$

| Pas | L'argument |
|---|---|
| **1** | **Le choix astucieux du niveau** : *« par hypothèse, $S(y)$ est convexe pour tout $y$, donc clairement **$S\big(f(\mathbf{x}^2)\big)$ doit être convexe AUSSI** »* |
| **2** | *« **Évidemment $\mathbf{x}^2\in S(f(\mathbf{x}^2))$** »* *(avec égalité)* *« **et, PAR (P.3), $\mathbf{x}^1\in S(f(\mathbf{x}^2))$** »* |
| **3** | ⟹ **par convexité**, toute combinaison convexe vérifie $\mathbf{x}^t\in S\big(f(\mathbf{x}^2)\big)$ |
| **4** | Par définition de $S\big(f(\mathbf{x}^2)\big)$ : $\ f(\mathbf{x}^t)\geq f(\mathbf{x}^2)$ |
| **5** | *« Mais **au vu de (P.3)**, ceci nous dit $f(\mathbf{x}^t)\geq\min[f(\mathbf{x}^1),f(\mathbf{x}^2)]$ »* — car (P.3) fait précisément de $f(\mathbf{x}^2)$ **le minimum** ⟹ **$f$ est quasiconcave** |

$\blacksquare$

</details>

### 🔴 8.3 Ce que l'équivalence signifie

> *« Ce théorème établit **UNE ÉQUIVALENCE entre fonctions quasiconcaves et ensembles supérieurs convexes. SUPPOSER qu'une fonction est quasiconcave, c'est donc EXACTEMENT LA MÊME CHOSE que supposer que LES ENSEMBLES SUPÉRIEURS SONT CONVEXES, et RÉCIPROQUEMENT.** »*

⚠️ **C'est le résultat qui justifie la « convexité des préférences » du chapitre 1** : les ensembles « au moins aussi bons » **sont convexes** ⟺ l'utilité est **quasiconcave**.

## 🟠 Concept 9 — La quasiconcavité STRICTE

### 🔴 9.1 Ce que la quasiconcavité simple autorise (figure A1.31)

> *« Notez, cependant, que **RIEN de ce que nous avons dit jusqu'ici n'écarte la possibilité d'avoir des « SEGMENTS LINÉAIRES », CETTE FOIS DANS LES ENSEMBLES DE NIVEAU. Tant la définition de la quasiconcavité QUE le théorème A1.14 sont COMPATIBLES avec la possibilité représentée en fig. A1.31.** »*

> ⚠️ *« Là, **$\mathbf{x}^1$ et $\mathbf{x}^2$ se trouvent sur une PORTION PLATE DU MÊME ensemble de niveau. La corde qui les relie COÏNCIDE avec le segment linéaire de l'ensemble de niveau, de sorte que TOUTES les combinaisons convexes se trouveront AUSSI sur le segment linéaire. Ici, $f(\mathbf{x}^1)=f(\mathbf{x}^2)=f(\mathbf{x}^t)$, donc l'inégalité $f(\mathbf{x}^t)\geq\min[f(\mathbf{x}^1),f(\mathbf{x}^2)]$ TIENT, MAIS AVEC ÉGALITÉ.** »*

> *« **Assez naturellement, ce genre de chose est ÉCARTÉ sous la quasiconcavité STRICTE.** »*

### 9.2 La définition A1.25

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.25 — Fonctions strictement quasiconcaves</span>

$f:D\to\mathbb{R}$ est **strictement quasiconcave ssi**, pour tous $\mathbf{x}^1\neq\mathbf{x}^2$ dans $D$,

$$f(\mathbf{x}^t)\ >\ \min\big[f(\mathbf{x}^1),\ f(\mathbf{x}^2)\big] \qquad\textbf{pour tout } t\in(0,1)$$

</div>

### 🔴 9.3 Les mêmes deux précautions

> *« **Une fois encore, nous exigeons que $t$ soit dans L'INTERVALLE OUVERT et que l'inégalité soit STRICTE. Contraindre $t$ à l'intervalle ouvert EMPÊCHE À NOUVEAU LA DÉFINITION DE DEVENIR VACUE.** »*

> ⚠️ *« En exigeant l'inégalité stricte, **nous INTERDISONS à la combinaison convexe de deux points DU MÊME ensemble de niveau de se trouver ELLE AUSSI DANS CET ensemble de niveau**, comme cela se produit en fig. A1.31. **À la place, de telles combinaisons convexes doivent se trouver dans des ensembles de niveau STRICTEMENT PLUS ÉLEVÉS**, comme en fig. A1.32. »*

$$\boxed{\;\textbf{« Les fonctions strictement quasiconcaves doivent avoir des ensembles supérieurs}\\\textbf{SANS AUCUN SEGMENT PLAT DANS LEUR FRONTIÈRE. »}\;}$$

*(Fig. A1.32 : **(a)** strictement quasiconcave et **croissante** · **(b)** strictement quasiconcave et **décroissante**.)*

## 🔴 Concept 10 — Le théorème A1.15 : concavité ⟹ quasiconcavité

### 10.1 L'énoncé, et l'avertissement

> *« Nous avons commencé à discuter les fonctions quasiconcaves en remarquant que **la quasiconcavité est une restriction PLUS FAIBLE que la concavité. On pourrait donc raisonner que SI une fonction est concave, elle satisfera TOUTES les propriétés d'une fonction quasiconcave. C'EST EFFECTIVEMENT LE CAS.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.15 — La concavité implique la quasiconcavité</span>

**Une fonction CONCAVE est TOUJOURS quasiconcave. Une fonction STRICTEMENT CONCAVE est TOUJOURS strictement quasiconcave.**

</div>

> ⚠️ *« **(Notez, cependant, que LA RÉCIPROQUE N'EST PAS VRAIE. UNE FONCTION QUASICONCAVE N'A PAS BESOIN D'ÊTRE CONCAVE.)** »*

### 10.2 La preuve

<details class="details--riche">
<summary>

**La preuve CONSTRUCTIVE du cas concave**

</summary>

> *« Nous donnerons **une preuve CONSTRUCTIVE du cas concave, laissant l'autre en exercice** *(A1.43)*. »*

Supposons $f:D\to\mathbb{R}$ **concave**. Prendre $\mathbf{x}^1,\mathbf{x}^2\in D$ et, **sans perte de généralité**, supposer

$$f(\mathbf{x}^1)\geq f(\mathbf{x}^2) \tag{P.1}$$

**De la définition de la concavité** :

$$f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\qquad\forall\,t\in[0,1] \tag{P.2}$$

⚠️ **LA MANIPULATION CLÉ** — *« **factoriser $t\geq0$ au membre de droite, RÉARRANGER, et exprimer (P.2) de façon ÉQUIVALENTE** »* :

$$f(\mathbf{x}^t)\ \geq\ f(\mathbf{x}^2)+t\big[f(\mathbf{x}^1)-f(\mathbf{x}^2)\big]\qquad\forall\,t\in[0,1] \tag{P.3}$$

| Pas | L'argument |
|---|---|
| **1** | *« Considérez **le terme PRODUIT** au membre de droite de (P.3). Nous savons que **$t\geq0$** et, **par (P.1), que $f(\mathbf{x}^1)-f(\mathbf{x}^2)\geq0$** »* |
| **2** | ⟹ *« **le dernier terme entier est NON NÉGATIF et peut être STRICTEMENT POSITIF. Dans l'un ou l'autre cas, tout le membre de droite doit être SUPÉRIEUR OU ÉGAL à $f(\mathbf{x}^2)$** »* |
| **3** | *« En même temps, nous savons **par (P.1) que $f(\mathbf{x}^2)=\min[f(\mathbf{x}^1),f(\mathbf{x}^2)]$** »* |
| **4** | ⟹ *« (P.1) et (P.3), ensemble, nous disent que $f(\mathbf{x}^t)\geq\min[f(\mathbf{x}^1),f(\mathbf{x}^2)]$ pour tout $t\in[0,1]$, **donc $f$ satisfait la définition d'une fonction quasiconcave** »* |

$\blacksquare$

**Le détail du réarrangement (P.2) ⟶ (P.3)** :

$$tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)=tf(\mathbf{x}^1)+f(\mathbf{x}^2)-tf(\mathbf{x}^2)=f(\mathbf{x}^2)+t\big[f(\mathbf{x}^1)-f(\mathbf{x}^2)\big] \quad$$

</details>

<details class="details--riche">
<summary>

**Enrichissement pédagogique (hors cours) — pourquoi la réciproque est FAUSSE**

</summary>

> **Le livre affirme que la réciproque est fausse mais ne donne PAS de contre-exemple ici.** Ce qui suit est **un enrichissement pédagogique**.

**Le témoin le plus simple** : $f(x)=x^3$ sur $D=\mathbb{R}$.

| La propriété | Le verdict |
|---|---|
| **QUASICONCAVE ?** | **OUI** — $x^3$ est **strictement croissante**, donc $f(x^t)$ est toujours entre $f(x^1)$ et $f(x^2)$, donc **$\geq$ le minimum** |
| **CONCAVE ?** | **NON** — prendre $x^1=0$, $x^2=2$, $t=\tfrac12$ : $f(x^t)=f(1)=1$, tandis que $\tfrac12f(0)+\tfrac12f(2)=\tfrac12(0)+\tfrac12(8)=4$. **Or $1<4$** |

⚠️ **La leçon générale** : **TOUTE fonction MONOTONE d'une variable est quasiconcave** *(exercice A1.49)*, **quelle que soit la courbure de son graphe** — alors que **la concavité est une contrainte sur la COURBURE**. C'est exactement pourquoi la quasiconcavité est *« une restriction plus faible »*.

</details>

## 🔴 Concept 11 — §A1.4.4 : convexité et quasiconvexité

### 🔴 11.1 L'avertissement terminologique

> *« Le dernier type de fonctions réelles que nous considérerons est celui des fonctions **CONVEXES et QUASICONVEXES**. Bien qu'**UNE CERTAINE CONFUSION SOIT POSSIBLE à cause de la terminologie, il est important de DISTINGUER entre le terme « CONVEXITÉ » tel que nous l'avons employé POUR UN ENSEMBLE et le même terme tel que nous l'appliquons maintenant à une FONCTION.** »*

> *« Fondamentalement, **la convexité d'une fonction est simplement « LE REVERS DE LA MÉDAILLE » de la concavité d'une fonction.** Parce que nous avons traité la concavité assez longuement, et parce que **la plupart des notions importantes sont des IMAGES EN MIROIR** de celles déjà rencontrées, **cette section peut être PLUS BRÈVE que la dernière.** »*

### 11.2 La définition A1.26

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.26 — Fonctions convexes et strictement convexes</span>

**1.** $f:D\to\mathbb{R}$ est une **fonction CONVEXE ssi**, pour tous $\mathbf{x}^1,\mathbf{x}^2\in D$,

$$f(\mathbf{x}^t)\ \leq\ t\,f(\mathbf{x}^1)+(1-t)\,f(\mathbf{x}^2)\qquad\textbf{pour tout } t\in[0,1]$$

**2.** $f:D\to\mathbb{R}$ est une **fonction STRICTEMENT CONVEXE ssi**, pour tous $\mathbf{x}^1\neq\mathbf{x}^2$ dans $D$,

$$f(\mathbf{x}^t)\ <\ t\,f(\mathbf{x}^1)+(1-t)\,f(\mathbf{x}^2)\qquad\textbf{pour tout } t\in(0,1)$$

</div>

### 11.3 La lecture géométrique (figure A1.33)

> *« La définition d'une fonction convexe exige que **la valeur de la fonction évaluée en la combinaison convexe de deux points quelconques NE SOIT PAS PLUS GRANDE que la valeur obtenue en formant la combinaison convexe correspondante des valeurs $f(\mathbf{x}^1)$ et $f(\mathbf{x}^2)$. Géométriquement, ceci ne sera le cas que si le point $\big(\mathbf{x}^t,\ tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\big)$ SUR LA CORDE n'est PAS PLUS BAS que le point $(\mathbf{x}^t,f(\mathbf{x}^t))$.** »*

$$\boxed{\;\textbf{CONCAVE : la corde est SOUS le graphe} \qquad\qquad \textbf{CONVEXE : la corde est AU-DESSUS du graphe}\;}$$

> ⚠️ *« Comme les exemples le montrent, **une fonction convexe PEUT avoir des « SEGMENTS LINÉAIRES » dans son graphe. Comme auparavant, LA CONVEXITÉ STRICTE est nécessaire pour écarter de telles choses.** »*

*(Fig. A1.33 : **(a)** et **(b)** sont convexes — **(a)** est **strictement** convexe ; **(c)** et **(d)** ne le sont pas.)*

### 11.4 Le théorème A1.16 — le miroir

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.16 — Fonctions concaves et convexes</span>

$$\boxed{\;f(\mathbf{x}) \textbf{ est (strictement) CONCAVE} \quad\Longleftrightarrow\quad -f(\mathbf{x}) \textbf{ est (strictement) CONVEXE}\;}$$

</div>

<details class="details--riche">
<summary>

**La preuve — une ligne**

</summary>

> *« **La preuve exige juste de MANIPULER LES DÉFINITIONS. Nous montrerons la suffisance et laisserons la nécessité au lecteur** *(exercice A1.45)*. »*

Si $f$ est concave : $\ f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$.

⚠️ **Multiplier par $-1$** *(ce qui RENVERSE l'inégalité)* :

$$-f(\mathbf{x}^t)\ \leq\ t\big(-f(\mathbf{x}^1)\big)+(1-t)\big(-f(\mathbf{x}^2)\big)$$

⟹ **$-f(\mathbf{x})$ est convexe** $\blacksquare$

</details>

### 11.5 Le théorème A1.17

> *« **Alors que la concavité exigeait que les points EN DESSOUS du graphe forment un ensemble convexe, la convexité exige que l'ensemble des points SUR ET AU-DESSUS du graphe soit un ensemble convexe.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.17 — Les points sur et au-dessus du graphe d'une fonction convexe forment un ensemble convexe</span>

Soit $A^*\equiv\{(\mathbf{x},y)\mid\mathbf{x}\in D,\ f(\mathbf{x})\leq y\}$ l'ensemble des points **« sur et au-dessus »** du graphe de $f:D\to R$, où $D\subset\mathbb{R}^n$ est convexe et $R\subset\mathbb{R}$. Alors

$$f \textbf{ est une fonction CONVEXE} \quad\Longleftrightarrow\quad A^* \textbf{ est un ensemble CONVEXE}$$

</div>

<details class="details--riche">
<summary>

**La preuve — le tour de passe-passe sur le signe de $y$**

</summary>

| Pas | L'argument |
|---|---|
| **1** | **Par le théorème A1.16**, $f$ est convexe **ssi** $-f$ est **concave** |
| **2** | **Par le théorème A1.13**, cela tient **ssi** l'ensemble $A\equiv\{(\mathbf{x},y)\mid\mathbf{x}\in D,\ -f(\mathbf{x})\geq y\}$ est **convexe** |
| **3** | **La réécriture** : *« notez que **parce que $y$ peut être un réel POSITIF OU NÉGATIF**, nous pouvons réécrire l'ensemble $A$ comme »* $$A\equiv\{(\mathbf{x},-y)\mid\mathbf{x}\in D,\ -f(\mathbf{x})\geq-y\}\equiv\{(\mathbf{x},-y)\mid\mathbf{x}\in D,\ f(\mathbf{x})\leq y\}$$ |
| **4** | ⟹ *« nous avons montré que **$f$ est convexe ssi l'ensemble $A\equiv\{(\mathbf{x},-y)\mid\mathbf{x}\in D,\ f(\mathbf{x})\leq y\}$ est convexe** »* |
| **5** | *« **Enfin, notez que $A$ est convexe SSI $A^*$ est convexe parce que $(\mathbf{x},y)\in A^*$ SSI $(\mathbf{x},-y)\in A$** »* |
| **6** | ⟹ **$f$ convexe $\iff$ $A^*$ convexe** $\blacksquare$ |

⚠️ **L'idée** : $A$ et $A^*$ sont **images l'un de l'autre par la SYMÉTRIE $y\mapsto-y$**, qui est **linéaire**, donc **préserve la convexité**.

</details>

## 🟠 Concept 12 — La quasiconvexité et le tableau récapitulatif

### 12.1 La définition A1.27

> *« Une fonction peut aussi être **QUASICONVEXE. Comme le nom le suggère, la quasiconvexité est une exigence PLUS FAIBLE que la convexité. Les définitions qui suivent sont FAMILIÈRES DANS LEUR FORME, mais PRÊTEZ UNE ATTENTION SOUTENUE AUX DÉTAILS.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A1.27 — Fonctions quasiconvexes et strictement quasiconvexes</span>

**1.** $f:D\to\mathbb{R}$ est **QUASICONVEXE ssi**, pour tous $\mathbf{x}^1,\mathbf{x}^2\in D$,

$$f(\mathbf{x}^t)\ \leq\ \max\big[f(\mathbf{x}^1),\ f(\mathbf{x}^2)\big]\qquad\forall\,t\in[0,1]$$

**2.** $f:D\to\mathbb{R}$ est **STRICTEMENT QUASICONVEXE ssi**, pour tous $\mathbf{x}^1\neq\mathbf{x}^2$ dans $D$,

$$f(\mathbf{x}^t)\ <\ \max\big[f(\mathbf{x}^1),\ f(\mathbf{x}^2)\big]\qquad\forall\,t\in(0,1)$$

</div>

> *(Note 8.)* *« **L'opérateur $\max[a,b]$ signifie « LE PLUS GRAND DE $a$ ET $b$ ». Si $a>b$, alors $\max[a,b]=a$. Si $a=b$, alors $\max[a,b]$ vaut $a$ ET $b$.** »*

⚠️ **Les deux inversions par rapport à la quasiconcavité** : $\geq\ \to\ \leq$ **et** $\min\ \to\ \max$.

### 12.2 Le théorème A1.18

> *« **Ici encore, celles-ci peuvent sembler plutôt MALCOMMODES. Heureusement, nous savons de nouveau quelque chose sur les ensembles de niveau et associés.** […] **Les résultats sont ESSENTIELLEMENT L'OPPOSÉ de ceux obtenus auparavant. Pour une fonction quasiconvexe, CE SONT LES ENSEMBLES INFÉRIEURS QUI SONT CONVEXES.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.18 — Quasiconvexité et ensembles inférieurs</span>

$$\boxed{\;f:D\to\mathbb{R} \textbf{ est QUASICONVEXE} \quad\Longleftrightarrow\quad I(y) \textbf{ est un ensemble CONVEXE pour tout } y\in\mathbb{R}\;}$$

</div>

> *« **Nous laissons la preuve du théorème suivant en exercice** *(A1.44)*. »*

⚠️ **Où se trouve l'ensemble inférieur ?** *« **Si la fonction quasiconvexe est CROISSANTE, ce sera l'ensemble des points EN DESSOUS de l'ensemble de niveau. Si elle est DÉCROISSANTE, ce sera l'ensemble des points AU-DESSUS.** »* *(Fig. A1.34.)*

*(Fig. A1.34 : **« les fonctions quasiconvexes ont des ensembles inférieurs CONVEXES. Les fonctions STRICTEMENT quasiconvexes n'ont AUCUN SEGMENT LINÉAIRE dans leurs ensembles de niveau. »** — **(a)** strictement quasiconvexe et croissante · **(b)** strictement quasiconvexe et décroissante.)*

### 12.3 Le théorème A1.19

> *« Comme nous l'avons vu, **il y a une ÉQUIVALENCE entre la concavité d'une fonction et la convexité de la NÉGATIVE de cette fonction. Il y a une équivalence SEMBLABLE reliant les fonctions quasiconcaves et quasiconvexes.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A1.19 — Fonctions quasiconcaves et quasiconvexes</span>

$$f(\mathbf{x}) \textbf{ est (strictement) QUASICONCAVE} \quad\Longleftrightarrow\quad -f(\mathbf{x}) \textbf{ est (strictement) QUASICONVEXE}$$

</div>

<details class="details--riche">
<summary>

**La preuve — l'identité $-\min=\max$**

</summary>

> *« **Encore une fois, nous montrerons juste la SUFFISANCE.** »*

Si $f$ est quasiconcave : $\ f(\mathbf{x}^t)\geq\min[f(\mathbf{x}^1),f(\mathbf{x}^2)]$.

**Multiplier par $-1$** :

$$-f(\mathbf{x}^t)\ \leq\ -\min\big[f(\mathbf{x}^1),f(\mathbf{x}^2)\big]\ \underbrace{=}_{}\ \max\big[-f(\mathbf{x}^1),\ -f(\mathbf{x}^2)\big]$$

⟹ **$-f(\mathbf{x})$ est quasiconvexe** — *« **La nécessité est TOUT AUSSI FACILE.** »* $\blacksquare$

⚠️ **L'identité au cœur de la preuve** : $\ -\min[a,b]=\max[-a,-b]$. **Changer tous les signes échange le plus petit et le plus grand.**

</details>

### 🔴 12.4 LE TABLEAU RÉCAPITULATIF (figure A1.35)

> *« Enfin, **plusieurs des relations importantes entre les diverses fonctions réelles que nous avons étudiées sont RÉSUMÉES en fig. A1.35.** »*

| La propriété de $f$ | L'équivalent, mot pour mot |
|---|---|
| **$f$ est CONCAVE** | $\Longleftrightarrow$ *« **l'ensemble des points SOUS le graphe est convexe** »* |
| **$f$ est CONVEXE** | $\Longleftrightarrow$ *« **l'ensemble des points AU-DESSUS du graphe est convexe** »* |
| **$f$ QUASICONCAVE** | $\Longleftrightarrow$ *« **les ensembles SUPÉRIEURS sont des ensembles convexes** »* |
| **$f$ QUASICONVEXE** | $\Longleftrightarrow$ *« **les ensembles INFÉRIEURS sont des ensembles convexes** »* |
| **$f$ CONCAVE** | $\Longrightarrow$ **$f$ QUASICONCAVE** *(et PAS la réciproque)* |
| **$f$ CONVEXE** | $\Longrightarrow$ **$f$ QUASICONVEXE** *(et PAS la réciproque)* |
| **$f$ (strictement) CONCAVE** | $\Longleftrightarrow$ **$-f$ (strictement) CONVEXE** |
| **$f$ (strictement) QUASICONCAVE** | $\Longleftrightarrow$ **$-f$ (strictement) QUASICONVEXE** |

⚠️ **Le moyen mnémotechnique** : **CONCAVE regarde vers le BAS** *(l'ensemble sous le graphe, les ensembles SUPÉRIEURS de niveau)* ; **CONVEXE regarde vers le HAUT** *(l'ensemble au-dessus du graphe, les ensembles INFÉRIEURS de niveau)*.

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « cette fonction est-elle croissante ? » | **Déf. A1.17** | **Identifier LEQUEL des trois degrés** est demandé |
| « strictement » vs « fortement » croissante | **Déf. A1.17** | **STRICTEMENT teste $\mathbf{x}^0\gg\mathbf{x}^1$ ; FORTEMENT teste $\mathbf{x}^0\geq\mathbf{x}^1$, $\mathbf{x}^0\neq\mathbf{x}^1$** |
| « esquissez les courbes d'indifférence » | **Déf. A1.19** | Résoudre $f(\mathbf{x})=y^0$ pour $x_2$ en fonction de $x_1$ |
| « deux courbes peuvent-elles se croiser ? » | **§A1.4.1** | **JAMAIS — cela violerait la définition d'une fonction** |
| « $S(y^0)$ », « ensemble « au moins aussi bon » » | **Déf. A1.21** | $\{f\geq y^0\}$ |
| « prouvez ces inclusions » | **Théorème A1.12** | **Double inclusion pour les parties 3 et 6-8** |
| « prouvez que $f$ est concave » | **Déf. A1.22** | **Prendre $\mathbf{x}^1,\mathbf{x}^2,t$ ARBITRAIRES et vérifier l'inégalité** |
| « montrez que l'ensemble sous le graphe est convexe » | **Théorème A1.13** | C'est **ÉQUIVALENT** à la concavité |
| « strictement concave ? » | **Déf. A1.23** | **$>$ strict, $\mathbf{x}^1\neq\mathbf{x}^2$, $t\in(0,1)$ OUVERT** |
| « prouvez que $f$ est quasiconcave » | **Déf. A1.24** ou **Thm A1.14** | **Le plus rapide : montrer que $S(y)$ est CONVEXE** |
| « les préférences sont convexes » | **Théorème A1.14** | ⟹ **l'utilité est QUASICONCAVE** |
| « $f$ concave ⟹ quasiconcave ? » | **Théorème A1.15** | **OUI. Et PAS la réciproque** |
| « prouvez que $f$ est convexe » | **Déf. A1.26** ou **Thm A1.16** | **Souvent plus court : montrer que $-f$ est CONCAVE** |
| « prouvez que $f$ est quasiconvexe » | **Théorème A1.18** | Montrer que **$I(y)$ est convexe** |
| « et pour $-f$ ? » | **Thm A1.16 / A1.19** | **Tout se retourne** |

**Les trois réflexes de cadrage :**

1. **Devant une quasiconcavité, passer par les ENSEMBLES SUPÉRIEURS.** Le théorème A1.14 transforme une inégalité sur $\min$ — pénible — en **une question de convexité d'ensemble**, souvent immédiate à voir.
2. **Devant « convexe » ou « quasiconvexe », prendre $-f$.** Les théorèmes A1.16 et A1.19 ramènent **tout** au cas concave, déjà traité.
3. **Ne jamais confondre CONVEXITÉ D'UN ENSEMBLE et CONVEXITÉ D'UNE FONCTION.** *« Une certaine confusion est possible à cause de la terminologie. »*

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Classer une fonction dans la hiérarchie de croissance

| Pas | Ce qu'on teste |
|---|---|
| **1** | $\mathbf{x}^0\geq\mathbf{x}^1\Rightarrow f(\mathbf{x}^0)\geq f(\mathbf{x}^1)$ ? ⟹ **CROISSANTE** |
| **2** | $\mathbf{x}^0\gg\mathbf{x}^1\Rightarrow f(\mathbf{x}^0)>f(\mathbf{x}^1)$ ? ⟹ **STRICTEMENT croissante** |
| **3** | $\mathbf{x}^0\geq\mathbf{x}^1$, $\mathbf{x}^0\neq\mathbf{x}^1\Rightarrow f(\mathbf{x}^0)>f(\mathbf{x}^1)$ ? ⟹ **FORTEMENT croissante** |
| **4** | Pour **RÉFUTER**, **un seul couple $(\mathbf{x}^0,\mathbf{x}^1)$ suffit** |

### Méthode 2 — Prouver la concavité par la définition

1. **Prendre $\mathbf{x}^1,\mathbf{x}^2\in D$ ARBITRAIRES et $t\in[0,1]$ ARBITRAIRE.**
2. **Écrire $\mathbf{x}^t=t\mathbf{x}^1+(1-t)\mathbf{x}^2$** et calculer $f(\mathbf{x}^t)$.
3. **Former $tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$.**
4. **Montrer que la différence $f(\mathbf{x}^t)-\big[tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\big]\geq0$** — souvent en la factorisant en **$t(1-t)\times(\text{un carré})$**.
5. **Pour la concavité STRICTE**, exiger $>$ avec $\mathbf{x}^1\neq\mathbf{x}^2$ et $t\in(0,1)$.

### Méthode 3 — Prouver la quasiconcavité par les ensembles supérieurs

| Pas | L'action |
|---|---|
| **1** | **Écrire $S(y)=\{\mathbf{x}\in D\mid f(\mathbf{x})\geq y\}$ EXPLICITEMENT** |
| **2** | **Reconnaître sa forme** : demi-espace ? intersection de demi-espaces ? région au-dessus d'une fonction convexe ? |
| **3** | **Conclure à la convexité** *(théorème A1.1 de la [fiche 521](521-jehle-ensembles-applications.md) si c'est une intersection)* |
| **4** | **Ne pas oublier le cas $S(y)=\varnothing$** — *« l'ensemble vide est convexe »* |
| **5** | ⟹ **par le théorème A1.14, $f$ est quasiconcave** |

### Méthode 4 — Passer de « concave » à « convexe » sans refaire le travail

| Ce qu'on veut | Ce qu'on montre à la place |
|---|---|
| $f$ **convexe** | $-f$ **CONCAVE** *(thm A1.16)* |
| $f$ **quasiconvexe** | $-f$ **QUASICONCAVE** *(thm A1.19)* |
| $A^*$ *(au-dessus)* convexe | $A$ *(sous)* convexe pour $-f$ *(thm A1.17)* |
| $I(y)$ convexe pour $f$ | $S(-y)$ convexe pour $-f$ |

### Méthode 5 — Prouver l'équivalence d'un « théorème d'ensembles »

⚠️ **Les théorèmes A1.13, A1.14, A1.17 et A1.18 sont tous des ÉQUIVALENCES** — donc, *« il faut une preuve DANS LES DEUX DIRECTIONS »* *(fiche 521, §A1.1.2)*.

| La direction | La technique du livre |
|---|---|
| **Fonction ⟹ ensemble** | Prendre **deux points QUELCONQUES de l'ensemble**, former la combinaison, **utiliser l'inégalité fonctionnelle** |
| **Ensemble ⟹ fonction** | Prendre **deux points PARTICULIERS : ceux qui sont AU RAS du graphe** *(avec $y^i=f(\mathbf{x}^i)$)* ou **le niveau $y=f(\mathbf{x}^2)$ où $\mathbf{x}^2$ réalise le minimum** |

⚠️ **C'est le même truc dans les deux preuves** : **choisir le point ou le niveau qui rend l'inégalité de l'ensemble EXACTEMENT l'inégalité voulue.**

## Les exercices du livre (§A1.5) — ceux qui portent sur §A1.4

> ⚠️ **Le livre NE FOURNIT PAS de corrigé.** Les énoncés ci-dessous sont **ceux de Jehle & Reny** *(exercices A1.40 à A1.49)*. **Les pistes de résolution sont un ENRICHISSEMENT PÉDAGOGIQUE et ne proviennent pas du cours.**

<details class="details--riche">
<summary>

**A1.40 — trois familles d'ensembles de niveau**

</summary>

> *« **Esquissez quelques ensembles de niveau** pour les fonctions suivantes : (a) $y=x_1x_2$ · (b) $y=x_1+x_2$ · (c) $y=\min[x_1,x_2]$. »*

> **Piste (hors cours).**
>
> |  | La forme des niveaux | Ce que cela représente en microéconomie |
> |---|---|---|
> | **(a)** $x_1x_2=y$ | **DES HYPERBOLES** $x_2=y/x_1$, convexes vers l'origine | **Cobb-Douglas** — les courbes d'indifférence usuelles |
> | **(b)** $x_1+x_2=y$ | **DES DROITES PARALLÈLES de pente $-1$** | **SUBSTITUTS PARFAITS** |
> | **(c)** $\min[x_1,x_2]=y$ | **DES ANGLES DROITS (« en L ») dont le coin est sur la diagonale $x_1=x_2$** | **COMPLÉMENTS PARFAITS (Leontief)** |
>
> ⚠️ **Les trois sont quasiconcaves** — leurs **ensembles supérieurs** sont convexes dans les trois cas *(théorème A1.14)*. **Mais (b) et (c) ont des SEGMENTS LINÉAIRES dans leurs niveaux**, donc **ne sont PAS strictement quasiconcaves** *(cf. fig. A1.31)*.

</details>

<details class="details--riche">
<summary>

**A1.41 — prouver le théorème A1.12**

</summary>

> *« **Prouvez le théorème A1.12. Souvenez-vous, pour les parties 3 et 6 à 8, de prouver que $A\subset B$ ET $B\subset A$.** »*

> **Piste (hors cours).** **La preuve complète est donnée en enrichissement dans le concept 3 de cette fiche.** Le ressort unique est **la trichotomie sur $\mathbb{R}$** : pour tout réel $a$, **exactement une** des relations $a<y^0$, $a=y^0$, $a>y^0$ tient. Les parties 6, 7 et 8 disent ensemble que $\{S'(y^0),\ L(y^0),\ I'(y^0)\}$ **PARTITIONNE le domaine**.

</details>

<details class="details--riche">
<summary>

**A1.42 — le calcul de concavité type**

</summary>

> *« Soit $D=[-2,2]$ et $f:D\to\mathbb{R}$ donnée par $y=4-x^2$. **Esquissez soigneusement cette fonction. En utilisant LA DÉFINITION d'une fonction concave, prouvez que $f$ est concave. Démontrez que l'ensemble $A$ est un ensemble convexe.** »*

> **Piste (hors cours) — le calcul complet.**
>
> Avec $x^t=tx^1+(1-t)x^2$, formons **la différence** :
>
> $$f(x^t)-\big[tf(x^1)+(1-t)f(x^2)\big]=\big[4-(x^t)^2\big]-\big[t(4-(x^1)^2)+(1-t)(4-(x^2)^2)\big]$$
>
> **Les « 4 » se simplifient** *(car $t+(1-t)=1$)*, il reste :
>
> $$t(x^1)^2+(1-t)(x^2)^2-\big[tx^1+(1-t)x^2\big]^2$$
>
> En développant le carré et en regroupant :
>
> $$=t(1-t)(x^1)^2+t(1-t)(x^2)^2-2t(1-t)x^1x^2=\boxed{\;t(1-t)\big(x^1-x^2\big)^2\;}$$
>
> **Ce produit est $\geq0$ pour tout $t\in[0,1]$** ⟹ **$f$ est CONCAVE** **Et il est STRICTEMENT positif dès que $t\in(0,1)$ et $x^1\neq x^2$** ⟹ **$f$ est même STRICTEMENT CONCAVE** *(déf. A1.23)* **L'ensemble $A$** : c'est **la région sous la parabole**, et **le théorème A1.13 donne immédiatement sa convexité** puisque $f$ est concave. **La factorisation en $t(1-t)(\Delta)^2$ est LE schéma à mémoriser** : c'est ainsi que se terminent presque tous les calculs de concavité de la méthode 2.

</details>

<details class="details--riche">
<summary>

**A1.43 à A1.45 — compléter les preuves du cours**

</summary>

**A1.43** *« **Complétez la preuve du théorème A1.15** »* — c'est-à-dire **le cas STRICT**. **A1.44** *« **Prouvez le théorème A1.18** »* — quasiconvexité ⟺ ensembles inférieurs convexes. **A1.45** *« **Complétez les preuves des théorèmes A1.16 et A1.19** »* — c'est-à-dire **la NÉCESSITÉ**.

> **Piste (hors cours).** **A1.43** : reprendre la preuve du cours **en remplaçant $\geq$ par $>$**. Avec $f(\mathbf{x}^1)\geq f(\mathbf{x}^2)$, la stricte concavité donne pour $\mathbf{x}^1\neq\mathbf{x}^2$ et $t\in(0,1)$ :
>
> $$f(\mathbf{x}^t)>f(\mathbf{x}^2)+t\big[f(\mathbf{x}^1)-f(\mathbf{x}^2)\big]\geq f(\mathbf{x}^2)=\min\big[f(\mathbf{x}^1),f(\mathbf{x}^2)\big] \quad$$
>
> **A1.44** : **le plus court passe par $-f$**. $I_f(y)=\{f\leq y\}=\{-f\geq-y\}=S_{-f}(-y)$. Donc « $I_f(y)$ convexe pour tout $y$ » ⟺ « $S_{-f}(z)$ convexe pour tout $z$ » ⟺ *(**théorème A1.14**)* « $-f$ quasiconcave » ⟺ *(**théorème A1.19**)* « $f$ quasiconvexe ». **A1.45** : dans les deux cas, **appliquer le raisonnement de suffisance à $-f$**. Pour A1.16 : si $-f$ est convexe, alors $-(-f)=f$ est concave **par le même calcul de multiplication par $-1$**. **C'est ce qu'entend le livre par « la nécessité est tout aussi facile ».**

</details>

<details class="details--riche">
<summary>

**A1.46 — les fonctions linéaires, cas frontière de tout**

</summary>

> *« Considérez une fonction linéaire quelconque $f(\mathbf{x})=\mathbf{a}\cdot\mathbf{x}+b$. (a) **Montrez que toute fonction linéaire est À LA FOIS concave ET convexe, quoique NI strictement concave NI strictement convexe.** (b) **Montrez que toute fonction linéaire est à la fois quasiconcave et quasiconvexe et, POUR $n>1$, ni l'une ni l'autre STRICTEMENT.** »*

> **Piste (hors cours).** **(a) Le calcul décisif** — la linéarité donne **L'ÉGALITÉ EXACTE** :
>
> $$f(\mathbf{x}^t)=\mathbf{a}\cdot\big[t\mathbf{x}^1+(1-t)\mathbf{x}^2\big]+b=t\big(\mathbf{a}\cdot\mathbf{x}^1+b\big)+(1-t)\big(\mathbf{a}\cdot\mathbf{x}^2+b\big)=tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$$
>
> **Une égalité satisfait À LA FOIS « $\geq$ » et « $\leq$ »** ⟹ **concave ET convexe**. Et **elle n'est JAMAIS stricte** ⟹ **ni strictement concave ni strictement convexe**. **(b)** Concave ⟹ quasiconcave et convexe ⟹ quasiconvexe *(théorème A1.15 et son miroir)*. **Pourquoi « pour $n>1$ » ?** Quand $n>1$, **l'hyperplan $\{\mathbf{a}\cdot\mathbf{x}=c\}$ est de dimension $n-1\geq1$**, donc **contient DEUX POINTS DISTINCTS $\mathbf{x}^1\neq\mathbf{x}^2$ de MÊME valeur**. Alors $f(\mathbf{x}^t)=f(\mathbf{x}^1)=\min=\max$, **sans inégalité stricte** ⟹ **ni strictement quasiconcave ni strictement quasiconvexe**. **Pour $n=1$ avec $a\neq0$, en revanche, $f$ EST strictement quasiconcave ET strictement quasiconvexe** — d'où la précaution du livre.

</details>

<details class="details--riche">
<summary>

**A1.47 — la composition, un outil qu'on retrouve partout**

</summary>

> *« Soit $f(\mathbf{x})$ une fonction réelle **concave (convexe)**. Soit $g(t)$ une fonction **CROISSANTE et concave (convexe)** d'une seule variable. **Montrez que la composée $h(\mathbf{x})=g\big(f(\mathbf{x})\big)$ est une fonction concave (convexe).** »*

> **Piste (hors cours) — la chaîne à DEUX maillons.**
>
> | Pas | L'argument | L'hypothèse utilisée |
> |---|---|---|
> | **1** | $f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$ | **$f$ CONCAVE** |
> | **2** | $g\big(f(\mathbf{x}^t)\big)\geq g\big(tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\big)$ | **$g$ CROISSANTE** — sans quoi le pas 1 serait inutilisable |
> | **3** | $\geq tg\big(f(\mathbf{x}^1)\big)+(1-t)g\big(f(\mathbf{x}^2)\big)$ | **$g$ CONCAVE** |
> | **4** | $\Longrightarrow h(\mathbf{x}^t)\geq th(\mathbf{x}^1)+(1-t)h(\mathbf{x}^2)$ |  |
>
> ⚠️ **LES DEUX hypothèses sur $g$ sont indispensables** : **la croissance** pour transporter l'inégalité du pas 1, **la concavité** pour celle du pas 3. Le cas convexe est identique **avec toutes les inégalités renversées** *(et $g$ toujours CROISSANTE)*.

</details>

<details class="details--riche">
<summary>

**A1.48 — la quasiconcavité par les ensembles supérieurs**

</summary>

> *« Soit $f(x_1,x_2)=-(x_1-5)^2-(x_2-5)^2$. **Prouvez que $f$ est quasiconcave.** »*

> **Piste (hors cours) — la méthode 3 en action.**
>
> $$S(y)=\big\{\mathbf{x}\ \big|\ -(x_1-5)^2-(x_2-5)^2\geq y\big\}=\big\{\mathbf{x}\ \big|\ (x_1-5)^2+(x_2-5)^2\leq-y\big\}$$
>
> | Le cas | $S(y)$ | Convexe ? |
> |---|---|---|
> | **$y\leq0$** | **LA BOULE FERMÉE de centre $(5,5)$ et de rayon $\sqrt{-y}$** | **une boule est convexe** |
> | **$y>0$** | **VIDE** *(une somme de carrés ne peut être $<0$)* | *« l'ensemble vide est convexe »* |
>
> ⟹ **$S(y)$ est convexe pour tout $y$** ⟹ **par le THÉORÈME A1.14, $f$ est quasiconcave**
>
> ⚠️ **Le raccourci qui ne marche pas ici** : essayer de vérifier $f(\mathbf{x}^t)\geq\min[\cdot,\cdot]$ **directement** est bien plus pénible. **C'est exactement l'intérêt du théorème A1.14.**

</details>

<details class="details--riche">
<summary>

**A1.49 — la caractérisation des quasiconcaves à une variable**

</summary>

> *« **Répondez à chacune des questions suivantes par « OUI » ou « NON », et JUSTIFIEZ votre réponse.** (a) Supposez $f(x)$ **CROISSANTE** d'une variable. **Est-elle quasiconcave ?** (b) Supposez $f(x)$ **DÉCROISSANTE**. Est-elle quasiconcave ? (c) Supposez qu'il existe un réel $b$ tel que $f$ soit **DÉCROISSANTE sur $(-\infty,b]$ et CROISSANTE sur $[b,+\infty)$**. Est-elle quasiconcave ? (d) Supposez $f$ **CROISSANTE sur $(-\infty,b]$ et DÉCROISSANTE sur $[b,+\infty)$**. Est-elle quasiconcave ? (e) **Vous devriez maintenant être capable de proposer UNE CARACTÉRISATION des fonctions quasiconcaves d'une variable, faisant intervenir les mots « CROISSANTE » et « DÉCROISSANTE ».** »*

> **Piste (hors cours).**
>
> |  | La réponse | La justification |
> |---|---|---|
> | **(a)** | **OUI** | $x^t$ **est TOUJOURS ENTRE $x^1$ et $x^2$** ; la monotonie place donc $f(x^t)$ **entre** $f(x^1)$ et $f(x^2)$, donc **$\geq$ le minimum** |
> | **(b)** | **OUI** | **Exactement le même argument** — seul le sens change |
> | **(c)** | **NON** | Forme en **« U »**. Contre-exemple : $f(x)=x^2$, $x^1=-1$, $x^2=1$, $t=\tfrac12$ ⟹ $f(0)=0<\min[1,1]=1$ *(elle est en revanche **QUASICONVEXE**)* |
> | **(d)** | **OUI** | Forme en **« U INVERSÉ »** — **UNIMODALE**. Tout point entre deux points reste **au moins aussi haut que le plus bas des deux** |
> | **(e)** | **LA CARACTÉRISATION** | *« Une fonction d'une variable est **QUASICONCAVE** si et seulement si elle est **CROISSANTE**, ou **DÉCROISSANTE**, ou **CROISSANTE PUIS DÉCROISSANTE** — c'est-à-dire s'il n'existe **AUCUN endroit où elle DÉCROÎT PUIS RECROÎT**. »* |
>
> ⚠️ **La lecture en une phrase** : **quasiconcave à une variable $=$ UNIMODALE (à pic unique)**. C'est bien **plus faible que concave** — cf. **$x^3$**, quasiconcave mais **pas concave** *(théorème A1.15, réciproque fausse)*.

</details>

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Confondre « strictement » et « fortement » croissante | **STRICTEMENT teste $\mathbf{x}^0\gg\mathbf{x}^1$ ; FORTEMENT teste $\mathbf{x}^0\geq\mathbf{x}^1$, $\mathbf{x}^0\neq\mathbf{x}^1$** | La seconde est **plus exigeante** |
| 2 | Inverser la hiérarchie | **FORTEMENT ⟹ STRICTEMENT ⟹ CROISSANTE** | Et **aucune réciproque** |
| 3 | Croire qu'une fonction croissante est strictement croissante | *« une fonction croissante **N'A PAS BESOIN** d'être strictement croissante »* | Ce sont **trois** notions |
| 4 | Changer la prémisse de la déf. A1.18 | **Décroissante s'écrit encore avec $\mathbf{x}^0\geq\mathbf{x}^1$** — c'est **la CONCLUSION** qui s'inverse | $f(\mathbf{x}^0)\leq f(\mathbf{x}^1)$ |
| 5 | Croire qu'un ensemble de niveau vit dans la range | *« **Notez que ce sont des ensembles DANS LE DOMAINE** »* | $L(y^0)\subset D$ |
| 6 | Croire que deux courbes d'indifférence peuvent se croiser | *« cela **VIOLERAIT LA DÉFINITION D'UNE FONCTION** »* | **Jamais** |
| 7 | Confondre $L(y^0)$ et $L(\mathbf{x}^0)$ | **Le premier est relatif à un NIVEAU, le second à un POINT** | *« simplement une question de commodité notationnelle »* |
| 8 | Confondre $S(y^0)$ et $S'(y^0)$ | **$\geq$ contre $>$** | Et $S'\subset S$ *(thm A1.12(4))* |
| 9 | Écrire $L(y^0)=S(y^0)\cup I(y^0)$ | **C'est L'INTERSECTION** *(thm A1.12(3))* | L'union vaudrait **tout le domaine** |
| 10 | Oublier de prouver les deux inclusions en A1.41 | Les parties **3 et 6-8** sont des **ÉGALITÉS** | *« prouvez que $A\subset B$ ET $B\subset A$ »* |
| 11 | Croire que $S(y^0)$ est toujours « au-dessus » | **Pour une fonction DÉCROISSANTE, il est EN DESSOUS** | Fig. A1.26(b) |
| 12 | Oublier l'hypothèse A1.1 | **Sans $D$ convexe, $\mathbf{x}^t$ pourrait SORTIR du domaine** et $f(\mathbf{x}^t)$ n'aurait pas de sens | *« nous supposerons $D\subset\mathbb{R}^n$ convexe »* |
| 13 | Confondre convexité d'un ENSEMBLE et d'une FONCTION | *« **une certaine confusion est possible à cause de la terminologie** »* | Ce sont **deux notions différentes** |
| 14 | Inverser le sens de l'inégalité de concavité | **CONCAVE : $f(\mathbf{x}^t)\geq$ la combinaison** | La **corde est SOUS** le graphe |
| 15 | Croire qu'une fonction concave n'a pas de partie droite | *« **RIEN dans la définition n'INTERDIT les SEGMENTS LINÉAIRES** »* | Fig. A1.29 |
| 16 | Écrire la concavité stricte avec $t\in[0,1]$ | **À $t=0$ ou $t=1$, les deux membres sont ÉGAUX** — la définition deviendrait **impossible** | **$t\in(0,1)$ OUVERT** |
| 17 | Oublier $\mathbf{x}^1\neq\mathbf{x}^2$ dans les définitions strictes | **Sinon les deux membres coïncident** | Déf. A1.23, A1.25, A1.26(2), A1.27(2) |
| 18 | Prouver une seule direction du thm A1.13 | **C'est une ÉQUIVALENCE** | *« une preuve DANS LES DEUX DIRECTIONS »* |
| 19 | Se tromper de points dans la seconde partie du thm A1.13 | **Il faut prendre les points AU RAS du graphe** : $y^i=f(\mathbf{x}^i)$ | *« deux points PARTICULIERS de $A$ »* |
| 20 | Renverser une inégalité en la multipliant par $t$ | **$t\geq0$ et $1-t\geq0$** — **le sens est PRÉSERVÉ** | Pas 2 de la preuve |
| 21 | Croire que le thm A1.13 vaut seulement à une variable | *« Elle vaut pour **TOUTES les fonctions concaves, pas seulement pour les fonctions d'UNE SEULE variable** »* | $D\subset\mathbb{R}^n$ |
| 22 | Écrire la quasiconcavité avec $\max$ | **QUASICONCAVE : $\geq\min$** | **QUASICONVEXE : $\leq\max$** |
| 23 | Croire que $\min[a,a]$ n'est pas défini | *« Si $a=b$, alors $\min[a,b]$ vaut **$a$ ET $b$** »* | Note 7 |
| 24 | Confondre les ensembles du thm A1.14 et du thm A1.18 | **QUASICONCAVE ⟺ ensembles SUPÉRIEURS convexes** ; **QUASICONVEXE ⟺ ensembles INFÉRIEURS convexes** | Fig. A1.35 |
| 25 | Oublier le cas $S(y)=\varnothing$ | *« notre travail est **immédiatement terminé** parce que **l'ensemble vide est convexe** »* | Un pas de la preuve du thm A1.14 |
| 26 | Choisir le mauvais niveau dans la nécessité du thm A1.14 | **Il faut prendre $y=f(\mathbf{x}^2)$, la PLUS PETITE des deux valeurs** | Grâce à (P.3) |
| 27 | Croire que la quasiconcavité interdit les segments plats | *« **RIEN n'écarte la possibilité de segments linéaires DANS LES ENSEMBLES DE NIVEAU** »* | Fig. A1.31 |
| 28 | Confondre où se trouvent les segments interdits | **STRICTEMENT CONCAVE interdit les plats DU GRAPHE ; STRICTEMENT QUASICONCAVE interdit les plats DE LA FRONTIÈRE des ensembles supérieurs** | Deux choses différentes |
| 29 | Croire que quasiconcave ⟹ concave | ***« LA RÉCIPROQUE N'EST PAS VRAIE. »*** | $x^3$ est quasiconcave, **pas concave** |
| 30 | Rater la factorisation de la preuve du thm A1.15 | $tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)=f(\mathbf{x}^2)+t\big[f(\mathbf{x}^1)-f(\mathbf{x}^2)\big]$ | **(P.3)** |
| 31 | Oublier « sans perte de généralité » | **Il FAUT fixer laquelle des deux valeurs est la plus grande** | Sinon $\min$ reste indéterminé |
| 32 | Croire qu'une fonction convexe est un ensemble convexe | **Une fonction convexe a l'ensemble AU-DESSUS de son graphe convexe** *(thm A1.17)* | Pas l'inverse |
| 33 | Se tromper de côté du graphe | **CONCAVE : les points SOUS. CONVEXE : les points AU-DESSUS** | Fig. A1.35 |
| 34 | Oublier de renverser l'inégalité au thm A1.16 | **Multiplier par $-1$ RENVERSE le sens** | C'est **toute** la preuve |
| 35 | Rater le tour du signe de $y$ au thm A1.17 | *« **parce que $y$ peut être un réel POSITIF OU NÉGATIF** »* | Le passage $A\to A^*$ |
| 36 | Croire que $-\min[a,b]=\min[-a,-b]$ | **NON** : $-\min[a,b]=\max[-a,-b]$ | Le cœur du thm A1.19 |
| 37 | Croire qu'une fonction linéaire est strictement concave | **Elle est concave ET convexe, mais JAMAIS strictement** *(exercice A1.46)* | L'égalité exacte |
| 38 | Oublier « $n>1$ » dans A1.46(b) | **À une variable avec $a\neq0$, une linéaire EST strictement quasiconcave** | La dimension compte |
| 39 | Oublier que $g$ doit être CROISSANTE dans A1.47 | **Sans la croissance, l'inégalité de $f$ ne se transporte pas** | Les **deux** hypothèses servent |
| 40 | Croire qu'une fonction en « U » est quasiconcave | **NON** — $x^2$ : $f(0)=0<\min[f(-1),f(1)]=1$. **Elle est QUASICONVEXE** | Exercice A1.49(c) |

## 📌 Ultimate Review

**§A1.4 — LES FONCTIONS RÉELLES.**

**DÉF. A1.16** : $f:D\to R$ avec $R\subset\mathbb{R}$. *« **Les fonctions d'UTILITÉ, de PRODUCTION et de COÛT** ne sont que quelques-uns des exemples **les plus familiers**. »*

**DÉF. A1.17 — LA HIÉRARCHIE DE CROISSANCE :**

| Le degré | La condition |
|---|---|
| **CROISSANTE** | $\mathbf{x}^0\geq\mathbf{x}^1\Rightarrow f(\mathbf{x}^0)\geq f(\mathbf{x}^1)$ |
| **STRICTEMENT** | **inégalité stricte dès que $\mathbf{x}^0\gg\mathbf{x}^1$** |
| **FORTEMENT** | **$f(\mathbf{x}^0)>f(\mathbf{x}^1)$ dès que $\mathbf{x}^0\neq\mathbf{x}^1$ et $\mathbf{x}^0\geq\mathbf{x}^1$** |

$$\boxed{\;\textbf{FORTEMENT} \Longrightarrow \textbf{STRICTEMENT} \Longrightarrow \textbf{CROISSANTE} \qquad \textbf{ et aucune réciproque}\;}$$

**§A1.4.1 — LES ENSEMBLES ASSOCIÉS.**

**DÉF. A1.19-A1.20** : $L(y^0)=\{f=y^0\}$ et $L(\mathbf{x}^0)=\{f=f(\mathbf{x}^0)\}$ — **des ensembles DU DOMAINE**.

⚠️ *« Les ensembles de niveau nous permettent d'étudier des fonctions **en RÉDUISANT D'UNE UNITÉ le nombre de dimensions** »* — ce sont **les courbes d'indifférence, les isoquantes, les droites d'iso-profit**.

$$\boxed{\;\textbf{« Deux ensembles de niveau différents NE PEUVENT JAMAIS SE CROISER »} \ \Longleftarrow\ \textbf{$f$ est une FONCTION}\;}$$

**DÉF. A1.21** : $S(y^0)=\{f\geq y^0\}$ · $I(y^0)=\{f\leq y^0\}$ · $S'=\{f>y^0\}$ · $I'=\{f<y^0\}$.

**THÉORÈME A1.12** : $L\subset S$ · $L\subset I$ · **$L=S\cap I$** · $S'\subset S$ · $I'\subset I$ · **$S'\cap L=I'\cap L=S'\cap I'=\varnothing$**.

⚠️ **Pour une fonction CROISSANTE, $S$ est « sur et au-dessus » ; pour une DÉCROISSANTE, « sur et en dessous ».**

**§A1.4.2 — LA CONCAVITÉ.** *( **HYPOTHÈSE A1.1 : $D$ est CONVEXE**, sinon $\mathbf{x}^t\notin D$.)*

**DÉF. A1.22** : $\ f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\ $ pour tout $t\in[0,1]$.

$$\boxed{\;\textbf{« $f$ est concave SSI, pour CHAQUE PAIRE de points du graphe,}\\\textbf{LA CORDE QUI LES JOINT EST SUR OU SOUS LE GRAPHE. »}\;}$$

**THÉORÈME A1.13** : **$f$ CONCAVE $\iff$ $A=\{(\mathbf{x},y)\mid f(\mathbf{x})\geq y\}$ est CONVEXE.**

*Les deux ressorts de la preuve* : ⟹ **multiplier (P.2) par $t\geq0$ et $(1-t)\geq0$ puis additionner** · ⟸ **choisir les points AU RAS du graphe, $y^i=f(\mathbf{x}^i)$**.

**DÉF. A1.23 — STRICTEMENT CONCAVE** : **$>$ strict**, **$\mathbf{x}^1\neq\mathbf{x}^2$**, **$t\in(0,1)$ OUVERT** ⟹ *« **ceci ÉCARTE LES PORTIONS PLATES du graphe** »*.

**§A1.4.3 — LA QUASICONCAVITÉ.** *« une propriété **APPARENTÉE MAIS PLUS FAIBLE** qui est souvent **tout ce qu'il faut** »*.

**DÉF. A1.24** : $\ f(\mathbf{x}^t)\geq\min\big[f(\mathbf{x}^1),f(\mathbf{x}^2)\big]$.

**THÉORÈME A1.14** :

$$\boxed{\;f \textbf{ QUASICONCAVE} \iff S(y) \textbf{ CONVEXE pour tout } y\;}$$

*« **SUPPOSER qu'une fonction est quasiconcave, c'est EXACTEMENT LA MÊME CHOSE que supposer que les ensembles supérieurs sont convexes.** »*

**DÉF. A1.25 — STRICTEMENT QUASICONCAVE** ⟹ *« **aucun SEGMENT PLAT dans la FRONTIÈRE des ensembles supérieurs** »*.

**THÉORÈME A1.15** : **CONCAVE ⟹ QUASICONCAVE** *(et STRICTEMENT ⟹ STRICTEMENT)*. ***« LA RÉCIPROQUE N'EST PAS VRAIE. »***

*Le pivot de la preuve* : $\ tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)=f(\mathbf{x}^2)+t\big[f(\mathbf{x}^1)-f(\mathbf{x}^2)\big]\geq f(\mathbf{x}^2)=\min$.

**§A1.4.4 — LE REVERS DE LA MÉDAILLE.**

**DÉF. A1.26** : **CONVEXE** $f(\mathbf{x}^t)\leq$ la combinaison · **DÉF. A1.27** : **QUASICONVEXE** $f(\mathbf{x}^t)\leq\max$.

**THÉORÈME A1.16** : $f$ (strictement) concave $\iff$ $-f$ (strictement) convexe — **multiplier par $-1$ RENVERSE**. **THÉORÈME A1.17** : $f$ convexe $\iff$ **$A^*=\{f(\mathbf{x})\leq y\}$ convexe** — *« parce que **$y$ peut être POSITIF OU NÉGATIF** »*. **THÉORÈME A1.18** : $f$ quasiconvexe $\iff$ **$I(y)$ convexe pour tout $y$**. **THÉORÈME A1.19** : $f$ (strictement) quasiconcave $\iff$ $-f$ (strictement) quasiconvexe — **$-\min[a,b]=\max[-a,-b]$**.

⚠️ **LE TABLEAU DE LA FIGURE A1.35 — à savoir par cœur :**

|  | L'équivalence |
|---|---|
| **CONCAVE** | $\iff$ **points SOUS le graphe** $=$ convexe |
| **CONVEXE** | $\iff$ **points AU-DESSUS du graphe** $=$ convexe |
| **QUASICONCAVE** | $\iff$ **ensembles SUPÉRIEURS** convexes |
| **QUASICONVEXE** | $\iff$ **ensembles INFÉRIEURS** convexes |
| **CONCAVE** $\Rightarrow$ **QUASICONCAVE** | **CONVEXE** $\Rightarrow$ **QUASICONVEXE** |
| **(strict.) CONCAVE** $\iff$ $-f$ **(strict.) CONVEXE** | **(strict.) QUASICONCAVE** $\iff$ $-f$ **(strict.) QUASICONVEXE** |

⚠️ **LE MOYEN MNÉMOTECHNIQUE** : **CONCAVE regarde vers le BAS** *(ensemble sous le graphe, ensembles SUPÉRIEURS de niveau)* · **CONVEXE regarde vers le HAUT** *(ensemble au-dessus, ensembles INFÉRIEURS)*.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Énoncer la définition A1.16 et donner les exemples du livre.**

</summary>

$f:D\to R$ est **réelle** si $D$ est **un ensemble quelconque** et **$R\subset\mathbb{R}$**.

> *« **Les fonctions d'UTILITÉ du consommateur, les fonctions de PRODUCTION de la firme et les fonctions de COÛT de la firme ne sont que quelques-uns des exemples LES PLUS FAMILIERS.** »*

**Les trois exemples** : $y=ax_1+bx_2$, $y=\sqrt{z^2+w^2}$, $y=\sum_i a_ix_i^2$ — *« **parce que dans chaque cas, le membre de gauche EST UN NOMBRE RÉEL** »*.

⚠️ *« Si le domaine est un sous-ensemble de $\mathbb{R}^n$, **une fonction réelle envoie des VECTEURS sur des POINTS de $\mathbb{R}$** »*.

</details>

<details class="details--riche">
<summary>

**2. Énoncer la définition A1.17 et distinguer les trois degrés.**

</summary>

| Le degré | La condition | La traduction du livre |
|---|---|---|
| **CROISSANTE** | $\mathbf{x}^0\geq\mathbf{x}^1\Rightarrow f(\mathbf{x}^0)\geq f(\mathbf{x}^1)$ | *« une hausse **d'une ou plusieurs** composantes **NE FAIT JAMAIS DÉCROÎTRE** la valeur »* |
| **STRICTEMENT** | **stricte dès que $\mathbf{x}^0\gg\mathbf{x}^1$** | *« une hausse de **TOUTES les composantes** fait **strictement augmenter** »* |
| **FORTEMENT** | **$f(\mathbf{x}^0)>f(\mathbf{x}^1)$ dès que $\mathbf{x}^0\neq\mathbf{x}^1$, $\mathbf{x}^0\geq\mathbf{x}^1$** | *« une hausse **d'UNE OU PLUSIEURS** $x_i$ fait **strictement augmenter** »* |

⚠️ *« **Regardez ATTENTIVEMENT ces définitions et rappelez-vous comment nous utilisons les symboles $\geq$ et $\gg$.** »*

</details>

<details class="details--riche">
<summary>

**3. Énoncer la hiérarchie de croissance.**

</summary>

> *« **Notez LA HIÉRARCHIE ici : une fonction croissante N'A PAS BESOIN d'être strictement croissante, et une fonction strictement croissante N'A PAS BESOIN d'être fortement croissante, MAIS toute fonction FORTEMENT croissante est STRICTEMENT croissante, et toute fonction STRICTEMENT croissante est CROISSANTE.** »*

$$\textbf{FORTEMENT} \Longrightarrow \textbf{STRICTEMENT} \Longrightarrow \textbf{CROISSANTE}$$

⚠️ **Aucune réciproque n'est vraie.** *(Le témoin classique : $\min[x_1,x_2]$ est strictement croissante sans être fortement croissante — enrichissement, hors cours.)*

</details>

<details class="details--riche">
<summary>

**4. Énoncer la définition A1.18.**

</summary>

**$f$ est DÉCROISSANTE** si $f(\mathbf{x}^0)\leq f(\mathbf{x}^1)$ **dès que $\mathbf{x}^0\geq\mathbf{x}^1$** · **STRICTEMENT** si l'inégalité est stricte dès que $\mathbf{x}^0\gg\mathbf{x}^1$ · **FORTEMENT** si $f(\mathbf{x}^0)<f(\mathbf{x}^1)$ dès que $\mathbf{x}^0\neq\mathbf{x}^1$ et $\mathbf{x}^0\geq\mathbf{x}^1$.

⚠️ **LA PRÉMISSE RESTE $\mathbf{x}^0\geq\mathbf{x}^1$** dans les trois cas — **seule la conclusion s'inverse**.

</details>

<details class="details--riche">
<summary>

**5. Définir un ensemble de niveau et dire ce qu'il représente.**

</summary>

$$L(y^0)=\{\mathbf{x}\mid\mathbf{x}\in D,\ f(\mathbf{x})=y^0\}$$

> *« **De nombreux objets familiers en microéconomie, tels que LES COURBES D'INDIFFÉRENCE, LES ISOQUANTES, LES DROITES D'ISO-PROFIT, sont tous des ENSEMBLES DE NIVEAU de fonctions réelles.** »*

⚠️ *« **Notez que ce sont des ensembles DANS LE DOMAINE.** »*

</details>

<details class="details--riche">
<summary>

**6. Quel est l'intérêt dimensionnel des ensembles de niveau ?**

</summary>

> *« Parce que nous pouvons construire un ensemble de niveau pour chaque valeur de son image, **nous pouvons REPRÉSENTER COMPLÈTEMENT la fonction par ces ensembles de son domaine, RÉDUISANT AINSI D'UNE UNITÉ le nombre de dimensions nécessaires.** »*

> ⚠️ *« **Les ensembles de niveau nous permettent d'étudier des fonctions de trois variables — qui exigent normalement des graphes TRIDIMENSIONNELS MALCOMMODES — en nous concentrant sur des ensembles DU SIMPLE PLAN À DEUX DIMENSIONS.** »*

</details>

<details class="details--riche">
<summary>

**7. Pourquoi deux ensembles de niveau ne se croisent-ils jamais ?**

</summary>

> *« L'application $f:D\to R$ est une fonction **si et seulement si elle assigne UN SEUL NOMBRE à CHAQUE élément du domaine**. »*

> ⚠️ *« **Par conséquent, DEUX ENSEMBLES DE NIVEAU DIFFÉRENTS NE PEUVENT JAMAIS SE CROISER NI S'INTERSECTER. S'ils le faisaient, cela signifierait que DEUX NOMBRES DIFFÉRENTS sont assignés à cet unique élément du domaine où ils se croisent. Ceci VIOLERAIT LA DÉFINITION D'UNE FONCTION.** »*

⚠️ **C'est la justification rigoureuse du fait que deux courbes d'indifférence ne se coupent pas.**

</details>

<details class="details--riche">
<summary>

**8. Énoncer la définition A1.20 et l'argument de la figure A1.25.**

</summary>

$$L(\mathbf{x}^0)=\{\mathbf{x}\mid\mathbf{x}\in D,\ f(\mathbf{x})=f(\mathbf{x}^0)\}$$

**Pour les points comparables** *($\mathbf{x}^1$ à coordonnées toutes plus grandes que $\mathbf{x}^0$)* : si $f$ est **strictement croissante**, $f(\mathbf{x}^1)>f(\mathbf{x}^0)$.

⚠️ **Pour les points NON comparables** *(comme $\mathbf{x}^3$)* : *« **$\mathbf{x}^3$ est DANS LE MÊME RAPPORT à un AUTRE point de $L(y^0)$, disons $\mathbf{x}^5$, que $\mathbf{x}^1$ l'est à $\mathbf{x}^0$. Parce que $\mathbf{x}^0$ ET $\mathbf{x}^5$ sont tous deux sur $L(y^0)$, $f(\mathbf{x}^0)=f(\mathbf{x}^5)=y^0$** »* ⟹ le même argument s'applique.

</details>

<details class="details--riche">
<summary>

**9. Énoncer la définition A1.21.**

</summary>

| L'ensemble | La définition |
|---|---|
| $S(y^0)$ | $\{\mathbf{x}\in D\mid f(\mathbf{x})\geq y^0\}$ — **SUPÉRIEUR** |
| $I(y^0)$ | $\{\mathbf{x}\in D\mid f(\mathbf{x})\leq y^0\}$ — **INFÉRIEUR** |
| $S'(y^0)$ | $\{\mathbf{x}\in D\mid f(\mathbf{x})>y^0\}$ — **STRICTEMENT supérieur** |
| $I'(y^0)$ | $\{\mathbf{x}\in D\mid f(\mathbf{x})<y^0\}$ — **STRICTEMENT inférieur** |

⚠️ **Les quatre sont des ensembles DU DOMAINE.**

</details>

<details class="details--riche">
<summary>

**10. Énoncer les huit parties du théorème A1.12.**

</summary>

**1.** $L(y^0)\subset S(y^0)$ · **2.** $L(y^0)\subset I(y^0)$ · **3.** $L(y^0)=S(y^0)\cap I(y^0)$ · **4.** $S'(y^0)\subset S(y^0)$ · **5.** $I'(y^0)\subset I(y^0)$ · **6.** $S'(y^0)\cap L(y^0)=\varnothing$ · **7.** $I'(y^0)\cap L(y^0)=\varnothing$ · **8.** $S'(y^0)\cap I'(y^0)=\varnothing$

⚠️ **Les parties 6-8 disent que $\{S',L,I'\}$ PARTITIONNE le domaine.** *(Preuve laissée en exercice A1.41 : « prouvez que $A\subset B$ ET $B\subset A$ ».)*

</details>

<details class="details--riche">
<summary>

**11. Où se situent $S$ et $I$ selon le sens de variation ?**

</summary>

| Si $f$ est… | $S(y^0)$ | $I(y^0)$ |
|---|---|---|
| **CROISSANTE** | *« **sur et AU-DESSUS** de $L(y^0)$ »* | *« sur et en dessous »* |
| **DÉCROISSANTE** | *« **sur et EN DESSOUS** »* | *« sur et AU-DESSUS »* |

Les versions **strictes** sont **strictement** au-dessus / en dessous — *« **$S'(y^0)$, S'IL N'EST PAS VIDE** »*.

</details>

<details class="details--riche">
<summary>

**12. Énoncer l'hypothèse A1.1 et dire pourquoi elle est indispensable.**

</summary>

> *« Nous supposerons **$D\subset\mathbb{R}^n$ est UN ENSEMBLE CONVEXE**. […] $\mathbf{x}^t\equiv t\mathbf{x}^1+(1-t)\mathbf{x}^2$ pour $t\in[0,1]$. **Parce que $D$ est un ensemble convexe, nous savons que $\mathbf{x}^t\in D$.** »*

⚠️ **Sans elle, $\mathbf{x}^t$ pourrait SORTIR du domaine et $f(\mathbf{x}^t)$ n'aurait aucun sens** — toutes les définitions qui suivent deviendraient vides.

> *« Ce sera **pratiquement toujours le cas** dans le travail ultérieur et **sera généralement supposé MÊME SI CE N'EST PAS EXPLICITEMENT ÉNONCÉ**. »*

</details>

<details class="details--riche">
<summary>

**13. Énoncer la définition A1.22 et la traduire.**

</summary>

$$f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\qquad\forall\,t\in[0,1]$$

> *« **$f$ est concave si SA VALEUR EN UNE COMBINAISON CONVEXE DE DEUX POINTS N'EST PAS PLUS PETITE QUE LA COMBINAISON CONVEXE DES DEUX VALEURS.** »*

</details>

<details class="details--riche">
<summary>

**14. Énoncer la règle de la corde et expliquer sa construction.**

</summary>

$$\boxed{\;\textbf{« Une fonction est concave SSI, pour CHAQUE PAIRE de points de son graphe,}\\\textbf{LA CORDE QUI LES JOINT SE TROUVE SUR OU EN DESSOUS DU GRAPHE. »}\;}$$

**Pourquoi** : le point $(x^t,y^t)$, dont **l'abscisse est la combinaison convexe des $x^i$** et **l'ordonnée LA MÊME combinaison des $f(x^i)$**, *« **doit donc se trouver SUR LA CORDE RECTILIGNE** »*. La concavité exige que *« **la distance verticale au point $(x^t,f(x^t))$ soit AU MOINS AUSSI GRANDE que la distance verticale au point de la corde** »*.

</details>

<details class="details--riche">
<summary>

**15. Comment la concavité échoue-t-elle (fig. A1.28) ?**

</summary>

La fonction *« **EST concave sur les régions $[0,x^1]$ et $[x^2,\infty)$** »* mais **pas sur $[x^1,x^2]$**.

> ⚠️ *« Nous pouvons construire la corde et **trouver un $t$ (disons $t=1/2$) tel que $(x^t,y^t)$ se trouve STRICTEMENT AU-DESSUS de $(x^t,f(x^t))$. Parce que nous avons trouvé DEUX points du domaine et AU MOINS UN $t$ tels que $f(x^t)<tf(x^1)+(1-t)f(x^2)$, LA DÉFINITION EST VIOLÉE.** »*

⚠️ **C'est un CONTRE-EXEMPLE** — et *« un seul contre-exemple peut réfuter »* *(§A1.1.2)*.

</details>

<details class="details--riche">
<summary>

**16. Énoncer le théorème A1.13.**

</summary>

Soit $A\equiv\{(\mathbf{x},y)\mid\mathbf{x}\in D,\ f(\mathbf{x})\geq y\}$ l'ensemble des points **« sur et sous »** le graphe. Alors

$$f \textbf{ CONCAVE} \iff A \textbf{ CONVEXE}$$

⚠️ *« Elle vaut pour **TOUTES les fonctions concaves, pas seulement pour les fonctions d'UNE SEULE variable** »*.

> *« **Nous avons maintenant DEUX FAÇONS ÉQUIVALENTES DE PENSER LES FONCTIONS CONCAVES** […] **L'UNE OU L'AUTRE spécification DÉFINIT COMPLÈTEMENT une fonction concave.** »*

</details>

<details class="details--riche">
<summary>

**17. Démontrer la première partie du théorème A1.13.**

</summary>

**$f$ concave ⟹ $A$ convexe.** Prendre $(\mathbf{x}^1,y^1),(\mathbf{x}^2,y^2)\in A$, donc $f(\mathbf{x}^1)\geq y^1$ et $f(\mathbf{x}^2)\geq y^2$ **(P.2)**.

| Pas | L'argument |
|---|---|
| **1** | **$D$ convexe** ⟹ $\mathbf{x}^t\in D$. **Il reste à montrer $f(\mathbf{x}^t)\geq y^t$** |
| **2** | **Multiplier (P.2) par $t\geq0$ et $(1-t)\geq0$** — le sens est **préservé** |
| **3** | **Additionner** : $tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\geq ty^1+(1-t)y^2=y^t$ |
| **4** | **Avec (P.1)** *(la concavité)* : $f(\mathbf{x}^t)\geq y^t$ ⟹ $(\mathbf{x}^t,y^t)\in A$ |

</details>

<details class="details--riche">
<summary>

**18. Démontrer la seconde partie du théorème A1.13.**

</summary>

**$A$ convexe ⟹ $f$ concave.** **LA STRATÉGIE** : *« prendre **deux points QUELCONQUES du domaine**, mais **DEUX POINTS PARTICULIERS de $A$** : ceux qui sont **SUR le graphe, plutôt qu'EN DESSOUS** »*.

Poser $y^1=f(\mathbf{x}^1)$, $y^2=f(\mathbf{x}^2)$ **(P.3)** ⟹ les deux points sont dans $A$ ⟹ **$A$ convexe** donne $(\mathbf{x}^t,y^t)\in A$, donc $f(\mathbf{x}^t)\geq y^t$ **(P.4)**.

Or $y^t=ty^1+(1-t)y^2=tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$ **(P.5)** ⟹ **$f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$**

⚠️ **Le choix $y^i=f(\mathbf{x}^i)$ est TOUT le truc.**

</details>

<details class="details--riche">
<summary>

**19. Énoncer la définition A1.23 et ses DEUX différences.**

</summary>

$$f(\mathbf{x}^t)>tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)\qquad\text{pour tous }\mathbf{x}^1\neq\mathbf{x}^2,\ \forall\,t\in(0,1)$$

| # | La différence |
|---|---|
| **1** | **STRICTEMENT plus grand, pas « plus grand ou égal »** |
| **2** | **$t$ dans l'intervalle OUVERT $(0,1)$, pas le fermé $[0,1]$** |

**Pourquoi l'ouvert ?** *« **Si $t$ valait zéro ou un, $\mathbf{x}^t$ COÏNCIDERAIT avec $\mathbf{x}^2$ ou $\mathbf{x}^1$, ET L'INÉGALITÉ STRICTE NE POURRAIT PAS TENIR.** »*

**L'effet** : *« **le graphe se trouve STRICTEMENT AU-DESSUS DE LA CORDE, sauf aux deux points eux-mêmes** — ceci ÉCARTE LES PORTIONS PLATES »*.

</details>

<details class="details--riche">
<summary>

**20. Une fonction concave peut-elle avoir un segment droit ?**

</summary>

⚠️ **OUI.** &gt; *« **RIEN dans la définition, ni dans le théorème A1.13, N'INTERDIT LES SEGMENTS LINÉAIRES dans le graphe. L'ensemble en dessous est TOUJOURS CONVEXE.** »*

> *« En $x^t$, **la valeur est EXACTEMENT ÉGALE à la combinaison convexe**, donc l'inégalité **TIENT TOUJOURS**. Le point se trouve simplement **SUR la corde, plutôt que STRICTEMENT AU-DESSUS — ET C'EST TOUT À FAIT ADMISSIBLE.** »*

*(Fig. A1.29 : **concave mais PAS strictement concave**.)*

</details>

<details class="details--riche">
<summary>

**21. Pourquoi introduire la quasiconcavité ?**

</summary>

> *« **La concavité est une restriction RELATIVEMENT FORTE. Souvent, l'un des objectifs du travail théorique est d'identifier et d'imposer SEULEMENT LES RESTRICTIONS LES PLUS FAIBLES POSSIBLES nécessaires pour garantir le résultat recherché. La QUASICONCAVITÉ est une propriété APPARENTÉE MAIS PLUS FAIBLE qui est souvent TOUT CE QU'IL FAUT pour nous mener là où nous voulons aller.** »*

</details>

<details class="details--riche">
<summary>

**22. Énoncer la définition A1.24 et la note 7.**

</summary>

$$f(\mathbf{x}^t)\geq\min\big[f(\mathbf{x}^1),f(\mathbf{x}^2)\big]\qquad\forall\,t\in[0,1]$$

> *(Note 7)* *« **$\min[a,b]$ signifie « LE PLUS PETIT DE $a$ ET $b$ ». Si $a>b$, $\min[a,b]=b$. Si $a=b$, $\min[a,b]$ vaut $a$ ET $b$.** »*

> *« Elle dit que **la valeur de la fonction NE DOIT PAS ÊTRE PLUS BASSE QUE LA PLUS BASSE DES VALEURS qu'elle prend aux deux points** »* — *« il faut l'admettre, **cette définition semble plutôt MALCOMMODE au premier abord** »*.

</details>

<details class="details--riche">
<summary>

**23. Lire la quasiconcavité sur les ensembles de niveau (fig. A1.30).**

</summary>

*(Le livre suppose $f(\mathbf{x}^1)\geq f(\mathbf{x}^2)$.)*

| Si $f$ est… | La condition |
|---|---|
| **CROISSANTE** | $L(\mathbf{x}^t)$ est *« **TOUJOURS SUR OU AU-DESSUS du PLUS BAS des ensembles de niveau** »* |
| **DÉCROISSANTE** | $L(\mathbf{x}^t)$ est *« **TOUJOURS SUR OU EN DESSOUS du PLUS HAUT des deux** »* |

> *« Les ensembles de niveau **ont été dessinés JOLIMENT INCURVÉS POUR UNE BONNE RAISON** […] **la quasiconcavité exige un COMPORTEMENT TRÈS RÉGULIER DE SES ENSEMBLES SUPÉRIEURS. CEUX-CI DOIVENT ÊTRE CONVEXES.** »*

</details>

<details class="details--riche">
<summary>

**24. Énoncer le théorème A1.14 et démontrer la suffisance.**

</summary>

$$f \textbf{ QUASICONCAVE} \iff S(y) \textbf{ CONVEXE pour tout } y\in\mathbb{R}$$

**Suffisance** : soient $\mathbf{x}^1,\mathbf{x}^2\in S(y)$. *« **Si $S(y)$ est VIDE, notre travail est immédiatement terminé parce que L'ENSEMBLE VIDE EST CONVEXE.** »*

$f(\mathbf{x}^1)\geq y$ et $f(\mathbf{x}^2)\geq y$ **(P.1)** ⟹ $\mathbf{x}^t\in D$ *(hypothèse A1.1)* et

$$f(\mathbf{x}^t)\geq\min\big[f(\mathbf{x}^1),f(\mathbf{x}^2)\big]\geq y \tag{P.2}$$

⚠️ *« **La PREMIÈRE inégalité est LA DÉFINITION de la quasiconcavité, la SECONDE découle de (P.1)** »* ⟹ $\mathbf{x}^t\in S(y)$

</details>

<details class="details--riche">
<summary>

**25. Démontrer la nécessité du théorème A1.14.**

</summary>

Soient $\mathbf{x}^1,\mathbf{x}^2\in D$ avec, **sans perte de généralité**, $f(\mathbf{x}^1)\geq f(\mathbf{x}^2)$ **(P.3)**.

| Pas | L'argument |
|---|---|
| **1** | **LE CHOIX DÉCISIF DU NIVEAU** : considérer **$S\big(f(\mathbf{x}^2)\big)$**, convexe par hypothèse |
| **2** | *« **Évidemment $\mathbf{x}^2\in S(f(\mathbf{x}^2))$ et, PAR (P.3), $\mathbf{x}^1\in S(f(\mathbf{x}^2))$** »* |
| **3** | ⟹ **par convexité**, $\mathbf{x}^t\in S\big(f(\mathbf{x}^2)\big)$, donc $f(\mathbf{x}^t)\geq f(\mathbf{x}^2)$ |
| **4** | **Au vu de (P.3), $f(\mathbf{x}^2)$ EST le minimum** ⟹ $f(\mathbf{x}^t)\geq\min[\cdot,\cdot]$ |

$\blacksquare$

</details>

<details class="details--riche">
<summary>

**26. Que signifie l'équivalence du théorème A1.14 pour la microéconomie ?**

</summary>

> *« **SUPPOSER qu'une fonction est quasiconcave, c'est donc EXACTEMENT LA MÊME CHOSE que supposer que LES ENSEMBLES SUPÉRIEURS SONT CONVEXES, et RÉCIPROQUEMENT.** »*

⚠️ **C'est le résultat qui justifie « la convexité des préférences »** : l'ensemble « **au moins aussi bon que $\mathbf{x}^0$** » **est convexe** ⟺ **l'utilité est quasiconcave**.

</details>

<details class="details--riche">
<summary>

**27. Énoncer la définition A1.25 et ce qu'elle interdit.**

</summary>

$$f(\mathbf{x}^t)>\min\big[f(\mathbf{x}^1),f(\mathbf{x}^2)\big]\qquad\text{pour tous }\mathbf{x}^1\neq\mathbf{x}^2,\ \forall\,t\in(0,1)$$

**Ce que la quasiconcavité SIMPLE autorise** *(fig. A1.31)* : *« $\mathbf{x}^1$ et $\mathbf{x}^2$ sur une **PORTION PLATE DU MÊME ensemble de niveau** […] $f(\mathbf{x}^1)=f(\mathbf{x}^2)=f(\mathbf{x}^t)$, donc l'inégalité **TIENT, MAIS AVEC ÉGALITÉ** »*.

⚠️ **Ce que la version STRICTE impose** : *« de telles combinaisons convexes doivent se trouver dans des ensembles de niveau **STRICTEMENT PLUS ÉLEVÉS** »* ⟹ *« **des ensembles supérieurs SANS AUCUN SEGMENT PLAT DANS LEUR FRONTIÈRE** »*.

</details>

<details class="details--riche">
<summary>

**28. Énoncer et démontrer le théorème A1.15.**

</summary>

**Une fonction CONCAVE est TOUJOURS quasiconcave. Une fonction STRICTEMENT concave est TOUJOURS strictement quasiconcave.**

⚠️ *« **(Notez, cependant, que LA RÉCIPROQUE N'EST PAS VRAIE. UNE FONCTION QUASICONCAVE N'A PAS BESOIN D'ÊTRE CONCAVE.)** »*

**La preuve** : avec $f(\mathbf{x}^1)\geq f(\mathbf{x}^2)$ **(P.1)**, **factoriser $t$ et réarranger la concavité** :

$$f(\mathbf{x}^t)\geq f(\mathbf{x}^2)+t\big[f(\mathbf{x}^1)-f(\mathbf{x}^2)\big] \tag{P.3}$$

⚠️ **$t\geq0$ et, par (P.1), $f(\mathbf{x}^1)-f(\mathbf{x}^2)\geq0$** ⟹ *« **le dernier terme est NON NÉGATIF** »* ⟹ le membre de droite est $\geq f(\mathbf{x}^2)=\min$

</details>

<details class="details--riche">
<summary>

**29. Énoncer la définition A1.26 et la lire géométriquement.**

</summary>

**CONVEXE** : $f(\mathbf{x}^t)\leq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$ pour $t\in[0,1]$. **STRICTEMENT CONVEXE** : $<$, pour $\mathbf{x}^1\neq\mathbf{x}^2$ et $t\in(0,1)$.

> *« Géométriquement, **ceci ne sera le cas que si le point sur LA CORDE n'est PAS PLUS BAS que le point $(\mathbf{x}^t,f(\mathbf{x}^t))$** »*.

$$\textbf{CONCAVE : corde SOUS le graphe} \qquad\qquad \textbf{CONVEXE : corde AU-DESSUS du graphe}$$

⚠️ *« **une fonction convexe PEUT avoir des SEGMENTS LINÉAIRES. La convexité STRICTE est nécessaire pour les écarter.** »*

</details>

<details class="details--riche">
<summary>

**30. Énoncer et démontrer le théorème A1.16.**

</summary>

$$f \textbf{ (strictement) CONCAVE} \iff -f \textbf{ (strictement) CONVEXE}$$

> *« **La preuve exige juste de MANIPULER LES DÉFINITIONS.** »* Si $f$ est concave, $f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$.

⚠️ **Multiplier par $-1$ RENVERSE l'inégalité** :

$$-f(\mathbf{x}^t)\leq t\big(-f(\mathbf{x}^1)\big)+(1-t)\big(-f(\mathbf{x}^2)\big) \quad$$

*(La nécessité est laissée en exercice A1.45.)*

</details>

<details class="details--riche">
<summary>

**31. Énoncer et démontrer le théorème A1.17.**

</summary>

Avec $A^*\equiv\{(\mathbf{x},y)\mid\mathbf{x}\in D,\ f(\mathbf{x})\leq y\}$ *(les points « **sur et au-dessus** »)* :

$$f \textbf{ CONVEXE} \iff A^* \textbf{ CONVEXE}$$

**La preuve enchaîne A1.16 puis A1.13** : $f$ convexe ⟺ $-f$ concave ⟺ $A=\{(\mathbf{x},y)\mid-f(\mathbf{x})\geq y\}$ convexe.

⚠️ **LE TOUR DU SIGNE** : *« **parce que $y$ peut être un réel POSITIF OU NÉGATIF**, nous pouvons réécrire $A\equiv\{(\mathbf{x},-y)\mid-f(\mathbf{x})\geq-y\}\equiv\{(\mathbf{x},-y)\mid f(\mathbf{x})\leq y\}$ »*, puis *« **$A$ est convexe SSI $A^*$ est convexe parce que $(\mathbf{x},y)\in A^*$ SSI $(\mathbf{x},-y)\in A$** »*.

</details>

<details class="details--riche">
<summary>

**32. Énoncer la définition A1.27 et la note 8.**

</summary>

**QUASICONVEXE** : $f(\mathbf{x}^t)\leq\max\big[f(\mathbf{x}^1),f(\mathbf{x}^2)\big]$, $t\in[0,1]$. **STRICTEMENT QUASICONVEXE** : $<$, pour $\mathbf{x}^1\neq\mathbf{x}^2$ et $t\in(0,1)$.

> *(Note 8)* *« **$\max[a,b]$ signifie « LE PLUS GRAND DE $a$ ET $b$ ».** »*

⚠️ **Les DEUX inversions par rapport à la quasiconcavité** : $\geq\ \to\ \leq$ **ET** $\min\ \to\ \max$.

> *« Les définitions **sont FAMILIÈRES DANS LEUR FORME, mais PRÊTEZ UNE ATTENTION SOUTENUE AUX DÉTAILS**. »*

</details>

<details class="details--riche">
<summary>

**33. Énoncer le théorème A1.18.**

</summary>

$$f \textbf{ QUASICONVEXE} \iff I(y) \textbf{ CONVEXE pour tout } y\in\mathbb{R}$$

> *« **Les résultats sont ESSENTIELLEMENT L'OPPOSÉ de ceux obtenus auparavant. Pour une fonction quasiconvexe, CE SONT LES ENSEMBLES INFÉRIEURS QUI SONT CONVEXES.** »*

⚠️ *« **Si la fonction est CROISSANTE, ce sera l'ensemble des points EN DESSOUS de l'ensemble de niveau ; si elle est DÉCROISSANTE, ce sera l'ensemble des points AU-DESSUS.** »*

*(La preuve est laissée en exercice A1.44.)*

</details>

<details class="details--riche">
<summary>

**34. Énoncer et démontrer le théorème A1.19.**

</summary>

$$f \textbf{ (strictement) QUASICONCAVE} \iff -f \textbf{ (strictement) QUASICONVEXE}$$

Si $f$ est quasiconcave, $f(\mathbf{x}^t)\geq\min[f(\mathbf{x}^1),f(\mathbf{x}^2)]$. **Multiplier par $-1$** :

$$-f(\mathbf{x}^t)\ \leq\ -\min\big[f(\mathbf{x}^1),f(\mathbf{x}^2)\big]\ \underbrace{=}_{}\ \max\big[-f(\mathbf{x}^1),-f(\mathbf{x}^2)\big]$$

⚠️ **L'IDENTITÉ CLÉ** : $-\min[a,b]=\max[-a,-b]$. *« **La nécessité est TOUT AUSSI FACILE.** »*

</details>

<details class="details--riche">
<summary>

**35. Réciter le tableau récapitulatif de la figure A1.35.**

</summary>

| La propriété | L'équivalence |
|---|---|
| **$f$ CONCAVE** | $\iff$ *« **l'ensemble des points SOUS le graphe est convexe** »* |
| **$f$ CONVEXE** | $\iff$ *« **l'ensemble des points AU-DESSUS du graphe est convexe** »* |
| **$f$ QUASICONCAVE** | $\iff$ *« **les ensembles SUPÉRIEURS sont convexes** »* |
| **$f$ QUASICONVEXE** | $\iff$ *« **les ensembles INFÉRIEURS sont convexes** »* |
| **$f$ CONCAVE** | $\Longrightarrow$ **$f$ QUASICONCAVE** |
| **$f$ CONVEXE** | $\Longrightarrow$ **$f$ QUASICONVEXE** |
| **$f$ (strict.) CONCAVE** | $\iff$ **$-f$ (strict.) CONVEXE** |
| **$f$ (strict.) QUASICONCAVE** | $\iff$ **$-f$ (strict.) QUASICONVEXE** |

⚠️ **CONCAVE regarde vers le BAS ; CONVEXE regarde vers le HAUT.**

</details>

<details class="details--riche">
<summary>

**36. Que faut-il retenir de la distinction terminologique ?**

</summary>

> *« Bien qu'**UNE CERTAINE CONFUSION SOIT POSSIBLE à cause de la terminologie, il est important de DISTINGUER entre le terme « CONVEXITÉ » tel que nous l'avons employé POUR UN ENSEMBLE et le même terme tel que nous l'appliquons maintenant à une FONCTION.** »*

> *« Fondamentalement, **la convexité d'une fonction est simplement « LE REVERS DE LA MÉDAILLE » de la concavité d'une fonction.** »*

⚠️ **Une fonction CONVEXE n'est PAS « un ensemble convexe » — c'est l'ensemble AU-DESSUS de son graphe qui l'est** *(théorème A1.17)*.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Définition A1.16 ? | $f:D\to R$ avec **$R\subset\mathbb{R}$** |
| Trois exemples économiques ? | **Utilité · production · coût** |
| $f$ CROISSANTE ? | $\mathbf{x}^0\geq\mathbf{x}^1\Rightarrow f(\mathbf{x}^0)\geq f(\mathbf{x}^1)$ |
| STRICTEMENT croissante ? | **stricte dès que $\mathbf{x}^0\gg\mathbf{x}^1$** |
| FORTEMENT croissante ? | **stricte dès que $\mathbf{x}^0\neq\mathbf{x}^1$ ET $\mathbf{x}^0\geq\mathbf{x}^1$** |
| La hiérarchie ? | **FORTEMENT ⟹ STRICTEMENT ⟹ CROISSANTE** |
| Les réciproques ? | **Aucune n'est vraie** |
| Prémisse de « décroissante » ? | **Toujours $\mathbf{x}^0\geq\mathbf{x}^1$** |
| Définition A1.19 ? | $L(y^0)=\{\mathbf{x}\in D\mid f(\mathbf{x})=y^0\}$ |
| Quatre noms économiques ? | **Courbes d'indifférence · isoquantes · droites d'iso-profit** |
| Où vivent les ensembles de niveau ? | **DANS LE DOMAINE** |
| Ce qu'ils font gagner ? | **UNE dimension** |
| Deux niveaux peuvent-ils se croiser ? | **JAMAIS — cela violerait la définition d'une fonction** |
| Définition A1.20 ? | $L(\mathbf{x}^0)=\{\mathbf{x}\mid f(\mathbf{x})=f(\mathbf{x}^0)\}$ |
| $S(y^0)$ ? | $\{f\geq y^0\}$ |
| $I(y^0)$ ? | $\{f\leq y^0\}$ |
| $S'(y^0)$ ? | $\{f>y^0\}$ — **STRICTEMENT supérieur** |
| Théorème A1.12, partie 3 ? | **$L=S\cap I$** *(pas l'union)* |
| Parties 6, 7, 8 ? | **Trois intersections VIDES** ⟹ une **PARTITION** |
| Où est $S(y^0)$ si $f$ croît ? | *« **sur et au-dessus** »* |
| Et si $f$ décroît ? | *« **sur et EN DESSOUS** »* |
| Hypothèse A1.1 ? | **$D$ est CONVEXE** |
| Pourquoi ? | **Sinon $\mathbf{x}^t$ sortirait du domaine** |
| Définition A1.22 ? | $f(\mathbf{x}^t)\geq tf(\mathbf{x}^1)+(1-t)f(\mathbf{x}^2)$ |
| La règle de la corde ? | **La corde est SUR OU SOUS le graphe** |
| Où se trouve $(x^t,y^t)$ ? | **SUR LA CORDE** |
| Comment réfuter la concavité ? | **UN couple et UN $t$ suffisent** |
| Théorème A1.13 ? | **$f$ concave $\iff$ les points SOUS le graphe forment un CONVEXE** |
| Vaut-il en dimension $n$ ? | *« **pas seulement pour les fonctions d'une seule variable** »* |
| Le pas clé du sens ⟹ ? | **Multiplier par $t\geq0$ et $(1-t)\geq0$, puis additionner** |
| Le pas clé du sens ⟸ ? | **Choisir $y^i=f(\mathbf{x}^i)$ — les points AU RAS du graphe** |
| Définition A1.23 ? | **$>$, $\mathbf{x}^1\neq\mathbf{x}^2$, $t\in(0,1)$ OUVERT** |
| Pourquoi l'intervalle ouvert ? | **À $t=0$ ou $1$, les deux membres COÏNCIDENT** |
| Ce que la stricte concavité écarte ? | **Les PORTIONS PLATES du GRAPHE** |
| Une concave peut-elle être plate ? | **OUI** *(fig. A1.29)* |
| Pourquoi la quasiconcavité ? | *« **les restrictions les PLUS FAIBLES possibles** »* |
| Définition A1.24 ? | $f(\mathbf{x}^t)\geq\min[f(\mathbf{x}^1),f(\mathbf{x}^2)]$ |
| Note 7 ? | $\min[a,b]$ = **« le plus petit de $a$ et $b$ »** |
| Théorème A1.14 ? | **quasiconcave $\iff$ les ensembles SUPÉRIEURS sont CONVEXES** |
| Le cas $S(y)=\varnothing$ ? | *« **l'ensemble vide est convexe** »* |
| Le niveau à choisir dans la nécessité ? | **$y=f(\mathbf{x}^2)$, la PLUS PETITE des deux valeurs** |
| Ce que l'équivalence signifie ? | *« **EXACTEMENT LA MÊME CHOSE** »* |
| Sa portée en micro ? | **La CONVEXITÉ DES PRÉFÉRENCES** |
| Définition A1.25 ? | **$>\min$, $\mathbf{x}^1\neq\mathbf{x}^2$, $t\in(0,1)$** |
| Ce qu'elle écarte ? | **Les SEGMENTS PLATS dans la FRONTIÈRE des ensembles supérieurs** |
| Ce que la quasiconcavité simple autorise ? | **Des segments plats dans LES NIVEAUX** *(fig. A1.31)* |
| Théorème A1.15 ? | **CONCAVE ⟹ QUASICONCAVE** |
| La réciproque ? | ***« N'EST PAS VRAIE »*** |
| Le pivot de sa preuve ? | $f(\mathbf{x}^2)+t\big[f(\mathbf{x}^1)-f(\mathbf{x}^2)\big]$ |
| Définition A1.26 ? | **CONVEXE** : $f(\mathbf{x}^t)\leq$ la combinaison |
| La corde d'une convexe ? | **AU-DESSUS du graphe** |
| Théorème A1.16 ? | $f$ concave $\iff$ **$-f$ CONVEXE** |
| Sa preuve ? | **Multiplier par $-1$ — cela RENVERSE** |
| Théorème A1.17 ? | $f$ convexe $\iff$ **$A^*$ (points AU-DESSUS) convexe** |
| Le tour de sa preuve ? | *« **$y$ peut être POSITIF OU NÉGATIF** »* |
| Définition A1.27 ? | **QUASICONVEXE** : $f(\mathbf{x}^t)\leq\max[\cdot,\cdot]$ |
| Les deux inversions ? | **$\geq\to\leq$ ET $\min\to\max$** |
| Théorème A1.18 ? | **quasiconvexe $\iff$ les ensembles INFÉRIEURS sont convexes** |
| Théorème A1.19 ? | $f$ quasiconcave $\iff$ **$-f$ QUASICONVEXE** |
| L'identité de sa preuve ? | **$-\min[a,b]=\max[-a,-b]$** |
| Le mnémotechnique de la fig. A1.35 ? | **CONCAVE regarde vers le BAS · CONVEXE vers le HAUT** |
| Une linéaire est… ? | **concave ET convexe, jamais STRICTEMENT** *(A1.46)* |
| Composée $g(f(\mathbf{x}))$ concave si… ? | **$f$ concave ET $g$ CROISSANTE CONCAVE** *(A1.47)* |
| Une fonction en « U » est… ? | **QUASICONVEXE, PAS quasiconcave** *(A1.49)* |
| Quasiconcave à une variable ? | **UNIMODALE — croissante, décroissante, ou croissante PUIS décroissante** |
| Le contre-exemple à « quasiconcave ⟹ concave » ? | **$x^3$** — monotone donc quasiconcave, mais **pas concave** |
