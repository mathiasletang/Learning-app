# Fiche 523 — Calcul différentiel : gradient, hessienne, courbure et fonctions homogènes

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — appendice mathématique, §A2.1 « Calculus » (p. 551-566) |
| **Difficulté** | Intermédiaire — l'outillage analytique de toute l'optimisation |
| **Temps d'étude estimé** | 125 min |
| **Prérequis** | [Fiche 522](522-jehle-fonctions-reelles-concavite.md) — concavité, convexité, ensembles de niveau · [Fiche 521](521-jehle-ensembles-applications.md) — ensembles convexes, continuité |
| **Concepts clés** | Différentiabilité, dérivée, dérivée seconde, fonction $C^n$, règles de dérivation, courbure, droite tangente, dérivée partielle, dérivée directionnelle, gradient, dérivée partielle seconde, matrice hessienne, théorème de Young, forme quadratique, matrice semi-définie négative, matrice définie négative, matrice semi-définie positive, fonction homogène, homogénéité linéaire, homogénéité de degré zéro, fonction Cobb-Douglas, théorème d'Euler |
| **Poids à l'examen** | Le **théorème A2.1** *(concavité $\iff$ $f''\leq0$ $\iff$ inégalité de la tangente)* · la **définition A2.1** et le calcul pratique des partielles · la **dérivée directionnelle** $g'(0)=\nabla f(\mathbf{x})\mathbf{z}$ · la **matrice HESSIENNE** et le **théorème A2.2 de YOUNG** · le **théorème A2.3** *(le pont une variable / plusieurs variables)* · le **théorème A2.4** *(concavité $\iff$ hessienne SEMI-DÉFINIE NÉGATIVE)* avec sa preuve · le **théorème A2.5** · la **définition A2.2** et le **théorème A2.6** · le **THÉORÈME A2.7 D'EULER** avec sa preuve complète. |

## 🎯 Vue d'ensemble

```
LE FIL DU §A2.1 : de la derivee a la HESSIENNE, puis a EULER

  §A2.1.1  UNE SEULE VARIABLE

     DIFFERENTIABLE = « CONTINUE ET LISSE, SANS CASSURES NI PLIS »
     « La differentiabilite est une exigence PLUS STRINGENTE
       que la continuite. »

     dy/dx = f'(x)     d2y/dx2 = f''(x)
     f est de classe C^n si f', f'', ..., f^(n) sont CONTINUES

     LA COURBURE :  f'' donne « LE TAUX AUQUEL LA PENTE CHANGE »

     THEOREME A2.1  les TROIS enonces EQUIVALENTS :
        1.  f est CONCAVE
        2.  f''(x) <= 0  pour tout x non-extremite
        3.  f(x) <= f(x0) + f'(x0)(x - x0)   ->  LA TANGENTE
            EST TOUJOURS AU-DESSUS DU GRAPHE
        4.  si f''(x) < 0 partout, alors f est STRICTEMENT concave
            ( ... et LA RECIPROQUE DE 4 EST FAUSSE )

  §A2.1.2  PLUSIEURS VARIABLES

     DEF. A2.1  DERIVEE PARTIELLE : la derivee ordinaire par
     rapport a x_i, EN TRAITANT LES AUTRES COMME DES CONSTANTES

     LA DERIVEE DIRECTIONNELLE :  g(t) = f(x + tz)
        g'(0) = SOMME_i f_i(x) z_i = GRADIENT(f)(x) z

     « TOUTES les derivees PARTIELLES ne sont que des derivees
       DIRECTIONNELLES d'un genre PARTICULIER. »

     LA MATRICE HESSIENNE H(x) = toutes les partielles SECONDES
     THEOREME A2.2 (YOUNG)  L'ORDRE NE COMPTE PAS -> H SYMETRIQUE

     THEOREME A2.3  f CONCAVE  <=>  g(t) = f(x + tz) concave
                    POUR TOUT x ET TOUT z
                    -> « IL SUFFIT DE VERIFIER SUR LES DROITES »

     SEMI-DEFINIE NEGATIVE :  z' A z <= 0  pour tout z
     DEFINIE NEGATIVE      :  z' A z < 0   pour tout z NON NUL

     THEOREME A2.4  les TROIS enonces EQUIVALENTS :
        1.  f est CONCAVE
        2.  H(x) est SEMI-DEFINIE NEGATIVE partout
        3.  f(x) <= f(x0) + GRADIENT(f)(x0)(x - x0)
        4.  si H(x) est DEFINIE NEGATIVE, f est STRICTEMENT concave

     THEOREME A2.5  f concave => f_ii <= 0    ( NECESSAIRE
                    MAIS PAS SUFFISANT )

  §A2.1.3  LES FONCTIONS HOMOGENES

     DEF. A2.2  f(tx) = t^k f(x)  pour tout t > 0
        k = 1  ->  HOMOGENE LINEAIRE
        k = 0  ->  « les changements EQUIPROPORTIONNELS
                     LAISSENT LA VALEUR INCHANGEE »

     COBB-DOUGLAS  A x1^a x2^b   est homogene de degre  a + b

     THEOREME A2.6  les DERIVEES PARTIELLES d'une fonction
                    homogene de degre k sont homogenes
                    de degre  k - 1

     THEOREME A2.7 (EULER, « le theoreme d'ADDITIVITE ») :
        f est homogene de degre k   SI ET SEULEMENT SI
             k f(x) = SOMME_i  ( df/dx_i ) x_i

        pour k = 1 :   f(x) = SOMME_i ( df/dx_i ) x_i
```

> ⚠️ **Note de transcription — spécifique à ce chapitre.** Le PDF **PERD LES SYMBOLES « PRIME »** : *« la dérivée, $f(x)$ »* signifie **$f'(x)$**, et l'énoncé 2 du théorème A2.1, *« $f(x)\leq0$ »*, signifie **$f''(x)\leq0$**. Il exporte aussi **le symbole de PRODUIT $\times$ comme un « + »** : *« une matrice $n+n$ »* signifie **$n\times n$**, et *« $n+n=n^2$ dérivées partielles secondes »* signifie **$n\times n=n^2$**. Il **PERD $\sum$**, **déplace le radical $\sqrt{\ }$** *(le texte imprime « real-v√alued » à la place de « $y=\sqrt{z^2+w^2}$ »)*, et perd le barré de $\neq$ *(« $x_j$, $j=i$ » signifie $j\neq i$)*. Les symboles ont été restitués **à partir de la prose du livre elle-même**, qui les explicite mot pour mot. **Il s'agit d'une réparation de transcription, non d'un ajout de contenu.**

## 🟠 Concept 1 — §A2.1.1 : la dérivée et la classe $C^n$

### 1.1 Ce qu'est la différentiabilité

> *« Grossièrement parlant, **une fonction $y=f(x)$ est DIFFÉRENTIABLE si elle est À LA FOIS CONTINUE ET « LISSE », SANS CASSURES NI PLIS.** »*

*(Fig. A2.1 : **(a)** est **non différentiable en $x^0$** — elle y présente un pli — tandis que **(b)** est **partout différentiable**.)*

> ⚠️ *« **La différentiabilité est donc une exigence PLUS STRINGENTE que la continuité. C'est aussi une exigence que NOUS IMPOSONS SOUVENT parce qu'elle nous permet d'utiliser les outils familiers du calcul.** »*

### 1.2 Dérivée première et seconde

> *« **Le concept de la dérivée, $f'(x)$, vous est sans doute familier. LA DÉRIVÉE EST UNE FONCTION, ELLE AUSSI**, donnant, en chaque valeur de $x$, **LA PENTE ou LE TAUX DE VARIATION INSTANTANÉ** de $f(x)$. »*

$$\frac{dy}{dx}=f'(x) \tag{A2.1}$$

> *« pour indiquer que $f'(x)$ nous donne **le montant (instantané) $dy$ dont $y$ varie PAR UNITÉ de variation $dx$ de $x$** »*.

> *« **Si la dérivée (première) est une fonction différentiable, nous pouvons prendre SA dérivée aussi**, obtenant la dérivée seconde de la fonction d'origine »* :

$$\frac{d^2y}{dx^2}=f''(x) \tag{A2.2}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION (énoncée dans le texte) — Fonctions $C^n$</span>

*« Si une fonction possède **des dérivées CONTINUES $f',f'',\dots,f^{(n)}$, elle est appelée $n$-FOIS CONTINÛMENT DIFFÉRENTIABLE, ou UNE FONCTION $C^n$.** »*

</div>

### 1.3 Les règles de dérivation (figure A2.2)

| La règle | La formule |
|---|---|
| **Constantes** | $\dfrac{d}{dx}(\alpha)=0$ |
| **Sommes** | $\dfrac{d}{dx}\big[f(x)\pm g(x)\big]=f'(x)\pm g'(x)$ |
| **Puissances** | $\dfrac{d}{dx}\big(\alpha x^n\big)=n\alpha x^{n-1}$ |
| **Produit** | $\dfrac{d}{dx}\big[f(x)g(x)\big]=f(x)g'(x)+f'(x)g(x)$ |
| **Quotient** | $\dfrac{d}{dx}\left[\dfrac{f(x)}{g(x)}\right]=\dfrac{g(x)f'(x)-f(x)g'(x)}{[g(x)]^2}$ |
| **Composition** | $\dfrac{d}{dx}\big[f(g(x))\big]=f'(g(x))\,g'(x)$ |

## 🟠 Concept 2 — La courbure et la dérivée seconde

### 2.1 Ce que mesure $f''$

> *« De même que la dérivée $f'(x)$ donne **le taux de variation de $f(x)$** par unité de variation de $x$, **la dérivée seconde $f''(x)$ donne LE TAUX DE VARIATION DE $f'(x)$** par unité de variation de $x$. C'est-à-dire que **$f''(x)$ donne LE TAUX AUQUEL LA PENTE DE $f$ EST EN TRAIN DE CHANGER. Par conséquent, LA DÉRIVÉE SECONDE EST LIÉE À LA COURBURE de la fonction $f$.** »*

### 2.2 L'observation de la figure A2.3

> *« La fig. A2.3 représente **une fonction CONCAVE**. Le fait qu'elle soit **« COURBÉE VERS LE BAS » est capturé par le fait que LA PENTE DE LA FONCTION DÉCROÎT quand $x$ augmente**, c'est-à-dire **par le fait que sa dérivée seconde est NON POSITIVE**. (Notez que $f'(x^0)$, la pente de la droite $l_0$, **est plus grande que** $f'(x^1)$, la pente de la droite $l_1$.) »*

> *« Il apparaît qu'**une fonction est concave PRÉCISÉMENT QUAND sa dérivée seconde est TOUJOURS NON POSITIVE**. […] **Dessinez quelques fonctions concaves pour vous en convaincre.** »*

### 🔴 2.3 La seconde observation — la tangente est AU-DESSUS

> *« **Mais quelque chose d'AUTRE est aussi apparent** sur la fig. A2.3. **Notez que LES DEUX DROITES TANGENTES, $l_0$ et $l_1$, se trouvent ENTIÈREMENT AU-DESSUS (parfois seulement FAIBLEMENT au-dessus) de la fonction $f$.** »*

**La construction** : $l_0$ est *« une droite de pente $f'(x^0)$ passant par le point $(x^0,f(x^0))$ »*, donc

$$l_0(x)=f'(x^0)\,(x-x^0)+f(x^0)$$

> ⚠️ *« Or, dire que **la droite $l_0$ se trouve AU-DESSUS de $f$**, c'est simplement dire que $l_0(x)\geq f(x)$ pour tout $x$. Mais **ceci dit alors que** »*

$$\boxed{\;f(x)\ \leq\ f(x^0)+f'(x^0)\,(x-x^0)\qquad\textbf{pour tout } x\;}$$

> *« Ainsi, **cette inégalité semble DÉCOULER DE LA CONCAVITÉ de $f$**. »*

## 🔴 Concept 3 — Le théorème A2.1

### 3.1 L'énoncé

> *« Le théorème A2.1, **que nous énonçons SANS PREUVE**, réunit les observations précédentes pour **caractériser les fonctions concaves d'une seule variable DE DEUX FAÇONS : l'une en termes de LA DÉRIVÉE SECONDE, et l'autre en termes de LA DÉRIVÉE PREMIÈRE et des DROITES TANGENTES qu'elle engendre.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.1 — Concavité et dérivées première et seconde</span>

Soit $D$ un **intervalle NON DÉGÉNÉRÉ** de réels sur l'intérieur duquel $f$ est **deux fois continûment différentiable**. Les énoncés 1 à 3 sont **équivalents** : **1.** $f$ est **concave**. **2.** $f''(x)\leq0$ pour **tout $x\in D$ qui n'est pas une extrémité**. **3.** Pour tout $x^0\in D$ : $\ f(x)\leq f(x^0)+f'(x^0)(x-x^0)$ **pour tout $x\in D$**. De plus : **4.** **Si $f''(x)<0$ pour tout $x\in D$ non-extrémité, alors $f$ est STRICTEMENT CONCAVE.**

</div>

### 3.2 Le cas convexe — gratuit

> *« Parce qu'**une fonction est convexe si sa NÉGATIVE est concave** *(théorème A1.16)*, **le théorème A2.1 donne AUSSI une caractérisation des fonctions CONVEXES. Remplacez simplement le mot « CONCAVE » par « CONVEXE », ET RENVERSEZ LE SENS DE TOUTES LES INÉGALITÉS.** »*

$$f \textbf{ CONVEXE} \iff f''(x)\geq0 \iff f(x)\geq f(x^0)+f'(x^0)(x-x^0)$$

### 🔴 3.3 L'avertissement sur la réciproque de l'énoncé 4

> *« **On pourrait penser que LA RÉCIPROQUE de l'énoncé 4 est vraie**, c'est-à-dire que si $f$ est strictement concave, alors **sa dérivée seconde doit être STRICTEMENT NÉGATIVE PARTOUT. Il vous est demandé, à l'exercice A2.20, de montrer QUE CE N'EST PAS LE CAS.** »*

<details class="details--riche">
<summary>

**Le contre-exemple de l'exercice A2.20 — et une coquille du livre**

</summary>

**L'énoncé A2.20, mot pour mot** : *« Montrez que **les réciproques de l'énoncé 4 des théorèmes A2.1 et A2.4 ne sont PAS vraies**, en montrant que **$f(x)=-x^4$ est STRICTEMENT CONCAVE sur $\mathbb{R}$, mais que sa dérivée seconde n'est PAS partout STRICTEMENT POSITIVE**. »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — une coquille probable.</span>

L'énoncé 4 du théorème A2.1 porte sur la condition **$f''<0$** ; la réciproque à réfuter est donc *« $f$ strictement concave $\Rightarrow$ $f''$ **strictement NÉGATIVE** partout »*. Le mot **« positive »** de l'énoncé est **manifestement une coquille pour « négative »** — et **le contre-exemple, lui, fonctionne parfaitement** :

$$f(x)=-x^4 \qquad f''(x)=-12x^2$$

⚠️ **$f$ EST strictement concave sur $\mathbb{R}$**, **mais $f''(0)=0$ — donc $f''$ n'est PAS strictement négative partout.**

**La leçon** : la condition 4 est **SUFFISANTE mais PAS NÉCESSAIRE** pour la concavité stricte — exactement le genre d'asymétrie que le livre souligne pour tous ses théorèmes d'existence *(cf. [fiche 521](521-jehle-ensembles-applications.md), §A1.3.2)*.

</div>

</details>

## 🟠 Concept 4 — §A2.1.2 : les dérivées partielles

### 4.1 Pourquoi $n$ pentes plutôt qu'une

> *« Dans le cas à une variable, il est facile de penser la dérivée comme **donnant LA pente**. […] **Cependant, avec des fonctions réelles de $n$ variables, $y$ dépend de la valeur de TOUTES les $n$ variables. Il est donc PLUS DIFFICILE de penser la pente AU SINGULIER.** »*

> ⚠️ *« **Il est tout naturel, en revanche, de penser LA PENTE QUAND $x_1$ VARIE, et LA PENTE QUAND $x_2$ VARIE, et ainsi de suite. Plutôt que d'avoir UNE SEULE pente, une fonction de $n$ variables peut être pensée comme ayant $n$ PENTES PARTIELLES, chacune ne donnant que le taux auquel $y$ varierait SI UN SEUL $x_i$ VARIAIT.** »*

### 4.2 La définition A2.1

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A2.1 — Dérivées partielles</span>

Soit $D\subset\mathbb{R}^n$ et $f:D\to\mathbb{R}$. Si $\mathbf{x}$ est **un point INTÉRIEUR de $D$**, alors la **dérivée partielle de $f$ par rapport à $x_i$ en $\mathbf{x}$** est définie par

$$\frac{\partial f(\mathbf{x})}{\partial x_i}\ \equiv\ \lim_{h\to0}\frac{f(x_1,\dots,x_i+h,\dots,x_n)-f(x_1,\dots,x_i,\dots,x_n)}{h}$$

</div>

> *« Diverses autres notations sont parfois utilisées. **Parmi les plus communes : $\partial y/\partial x_i$ ou simplement $f_i(\mathbf{x})$.** »*

### 🔴 4.3 Les trois remarques du livre

| # | La remarque, mot pour mot |
|---|---|
| **1** | *« **il y en a $n$, UNE POUR CHAQUE variable $x_i$** »* |
| **2** | *« comme la dérivée dans le cas à une variable, **CHAQUE DÉRIVÉE PARTIELLE EST ELLE-MÊME UNE FONCTION. En particulier, chaque dérivée partielle est une fonction QUI DÉPEND DE LA VALEUR PRISE PAR TOUTES les variables $x_1,\dots,x_n$.** »* |
| **3** | *« la dérivée partielle est définie **pour mesurer comment la valeur de la fonction change quand UN $x_i$ change, LAISSANT LES VALEURS DES $(n-1)$ AUTRES INCHANGÉES** »* |

$$\boxed{\;\textbf{« Pour calculer la partielle par rapport à $x_i$, on prend simplement LA DÉRIVÉE}\\\textbf{ORDINAIRE par rapport à $x_i$, EN TRAITANT TOUTES LES AUTRES VARIABLES}\\\textbf{$x_j$, $j\neq i$, COMME DES CONSTANTES. »}\;}$$

<details class="details--riche">
<summary>

**EXEMPLE A2.1 — le calcul, pas à pas**

</summary>

Soit $f(x_1,x_2)=x_1^2+3x_1x_2-x_2^2$.

**La partielle par rapport à $x_1$** — *« en traitant chaque apparition de $x_2$ comme si c'était une constante »* :

$$\frac{\partial f(x_1,x_2)}{\partial x_1}=2x_1+3x_2$$

> *« Dans **le DEUXIÈME terme**, nous avons traité **les deux facteurs 3 ET $x_2$ comme des constantes**. Dans **le TROISIÈME terme**, **$x_1$ n'apparaît pas du tout**, donc **le terme entier est traité comme une constante. Parce que la dérivée d'une constante est ZÉRO, il contribue ZÉRO.** »*

**La partielle par rapport à $x_2$** — *« cette fois en traitant toutes les occurrences de $x_1$ comme des constantes »* :

$$\frac{\partial f(x_1,x_2)}{\partial x_2}=3x_1-2x_2$$

⚠️ **Le point à retenir** : *« **chaque partielle est une fonction DES DEUX variables. La valeur prise par chaque partielle sera donc DIFFÉRENTE en des valeurs différentes de $x_1$ et $x_2$.** »*

| Le point | $f_1$ | $f_2$ |
|---|---|---|
| $(1,2)$ | $f_1(1,2)=2(1)+3(2)=\mathbf{8}$ | $f_2(1,2)=3(1)-2(2)=\mathbf{-1}$ |
| $(2,1)$ | $f_1(2,1)=2(2)+3(1)=\mathbf{7}$ | $f_2(2,1)=3(2)-2(1)=\mathbf{4}$ |

</details>

## 🔴 Concept 5 — La dérivée directionnelle et le gradient

### 5.1 Le problème posé

> *« Chaque dérivée partielle nous dit si la fonction monte ou descend **quand nous changeons UNE variable seule**. Mais ceci revient à nous dire **comment la valeur change quand nous nous déplaçons DANS LA DIRECTION D'UN DES $n$ VECTEURS UNITAIRES. Il est parfois utile de savoir si la valeur monte ou descend quand nous nous déplaçons dans D'AUTRES DIRECTIONS.** »*

### 🔴 5.2 L'astuce : ramener à UNE variable

**Fixer $\mathbf{x}$ et une direction $\mathbf{z}=(z_1,\dots,z_n)$, puis définir**

$$g(t)=f(\mathbf{x}+t\mathbf{z}),\qquad t\in\mathbb{R}$$

> *« Notez que **$g(t)$ prend la valeur $f(\mathbf{x})$ quand $t=0$, et que lorsque $t$ augmente à partir de zéro, $\mathbf{x}+t\mathbf{z}$ SE DÉPLACE DANS LA DIRECTION $\mathbf{z}$.** Par conséquent, **si $g(t)$ AUGMENTE quand $t$ passe de zéro à positif, alors nous savons que $f$ AUGMENTE quand nous nous éloignons de $\mathbf{x}$ dans la direction $\mathbf{z}$.** Ainsi, **nous nous intéressons à savoir si $g'(0)$ est positif, négatif ou nul.** »*

### 5.3 Le calcul heuristique de $g'(0)$

> *« Nous donnons maintenant **une description HEURISTIQUE** de la manière de calculer $g'(0)$. »*

| Pas | L'argument, mot pour mot |
|---|---|
| **1** | *« par définition, **$g'(0)$ est juste LE TAUX AUQUEL $f$ CHANGE par unité de variation de $t$** »* |
| **2** | *« la $i$-ème coordonnée du domaine **augmente au taux $z_i$ par unité de variation de $t$** »* |
| **3** | *« le taux auquel $f$ change par unité de variation de la $i$-ème coordonnée **est juste $f_i(\mathbf{x})$** »* |
| **4** | ⟹ *« le taux auquel $f$ change par unité de $t$ **DÛ AU CHANGEMENT DE LA $i$-ÈME COORDONNÉE est $f_i(\mathbf{x})z_i$** »* |
| **5** | *« **Le taux de variation TOTAL de $f$ est alors juste LA SOMME de tous les changements induits par CHACUNE des $n$ coordonnées** »* |

$$g'(0)=\sum_{i=1}^{n}f_i(\mathbf{x})\,z_i$$

> *« Le terme de droite est connu comme **LA DÉRIVÉE DIRECTIONNELLE de $f$ en $\mathbf{x}$ dans la direction $\mathbf{z}$**. »* *(Note 1.)* *« **À strictement parler, pour que ce calcul soit correct, $f$ doit être CONTINÛMENT DIFFÉRENTIABLE.** »*

### 🔴 5.4 Le gradient

**La convention du livre sur les vecteurs** : *« **tous les vecteurs doivent être supposés être des VECTEURS COLONNES sauf mention contraire explicite. Dans le texte, nous écrivons $\mathbf{x}=(x_1,\dots,x_n)$ même si $\mathbf{x}$ peut être un vecteur colonne. Ceci nous épargne l'usage incommode et constant de la notation de TRANSPOSITION.** »*

> *« Assemblez toutes les $n$ dérivées partielles précédentes **en un VECTEUR LIGNE** »* :

$$\boxed{\;\nabla f(\mathbf{x})\equiv\big(f_1(\mathbf{x}),\dots,f_n(\mathbf{x})\big) \qquad\textbf{— LE GRADIENT de $f$ en $\mathbf{x}$}\;}$$

$$g'(0)=\nabla f(\mathbf{x})\,\mathbf{z} \tag{A2.3}$$

### 🔴 5.5 Les deux lectures de (A2.3)

> *« Notez que **la dérivée partielle de $f$ par rapport à $x_i$ n'est alors QUE la dérivée directionnelle de $f$ dans la direction $(0,\dots,0,1,0,\dots,0)$**, où le 1 apparaît en $i$-ème position. **Ainsi, TOUTES LES DÉRIVÉES PARTIELLES NE SONT QUE DES SORTES PARTICULIÈRES DE DÉRIVÉES DIRECTIONNELLES.** »*

> ⚠️ *« D'un autre côté, **(A2.3) nous dit que LE TAUX AUQUEL $f$ CHANGE DANS N'IMPORTE QUELLE DIRECTION EST DÉTERMINÉ PAR LE VECTEUR DES DÉRIVÉES PARTIELLES, c'est-à-dire par LE GRADIENT de $f$.** »*

> *« Ainsi, **il est utile de penser le gradient $\nabla f$ comme ANALOGUE À LA DÉRIVÉE d'une fonction d'une variable. Comme auparavant, le gradient EST LUI-MÊME UNE FONCTION**, car il envoie chaque $\mathbf{x}$ du domaine sur **un vecteur de $n$ « PENTES PARTIELLES »**. »*

## 🔴 Concept 6 — Les partielles secondes et la matrice hessienne

### 6.1 La construction

> *« Considérons **l'une des dérivées partielles**, par exemple celle par rapport à $x_1$. Nous notons d'abord que $\partial f(x_1,\dots,x_n)/\partial x_1$ **est ELLE-MÊME une fonction de $n$ variables. Des changements de N'IMPORTE LEQUEL des $x_i$ pourraient en principe affecter sa valeur. Ainsi, $f_1(\mathbf{x})$ A LUI-MÊME $n$ DÉRIVÉES PARTIELLES.** »*

> *« Il n'y a **aucune difficulté particulière** à les calculer : chacune est calculée **en traitant toutes les autres variables comme des constantes** et en appliquant les règles familières. »*

**Les trois notations** de la partielle seconde de $f$ par rapport à $x_1$ puis $x_i$ :

$$\frac{\partial}{\partial x_i}\left[\frac{\partial f(\mathbf{x})}{\partial x_1}\right] \qquad\text{ou}\qquad \frac{\partial^2f(\mathbf{x})}{\partial x_i\,\partial x_1} \qquad\text{ou}\qquad f_{1i}(\mathbf{x})$$

**Le gradient de $f_1$** :

$$\nabla f_1(\mathbf{x})=\left(\frac{\partial^2f(\mathbf{x})}{\partial x_1\partial x_1},\dots,\frac{\partial^2f(\mathbf{x})}{\partial x_n\partial x_1}\right)\equiv\big(f_{11}(\mathbf{x}),\dots,f_{1n}(\mathbf{x})\big)$$

### 6.2 La matrice hessienne

> *« En essence, **nous prenons LE « GRADIENT DU GRADIENT » de la fonction d'origine $f$**, en gardant simplement à l'esprit que **chaque partielle du $n$-vecteur gradient A ELLE-MÊME $n$ PARTIELLES**. Si nous arrangeons tous les $\nabla f_i(\mathbf{x})$ **en une MATRICE, en les EMPILANT l'un sur l'autre**, nous obtenons »* :

$$H(\mathbf{x})=\begin{pmatrix} f_{11}(\mathbf{x}) & f_{12}(\mathbf{x}) & \cdots & f_{1n}(\mathbf{x})\\ f_{21}(\mathbf{x}) & f_{22}(\mathbf{x}) & \cdots & f_{2n}(\mathbf{x})\\ \vdots & \vdots & \ddots & \vdots\\ f_{n1}(\mathbf{x}) & f_{n2}(\mathbf{x}) & \cdots & f_{nn}(\mathbf{x}) \end{pmatrix}$$

> *« **$H(\mathbf{x})$ contient TOUTES les dérivées partielles secondes possibles** de la fonction d'origine. $H(\mathbf{x})$ est appelée **LA MATRICE HESSIENNE** de $f(\mathbf{x})$. »*

> ⚠️ *« **En se souvenant que la hessienne a été obtenue en prenant LE GRADIENT DU GRADIENT, nous pouvons penser $H(\mathbf{x})$ comme ANALOGUE À LA DÉRIVÉE SECONDE d'une fonction d'une seule variable.** »*

⚠️ **La hessienne est elle aussi une FONCTION** : *« elle envoie chaque $\mathbf{x}$ du domaine sur $n\times n=n^2$ dérivées partielles secondes, et **les valeurs prises par chacun de ces éléments seront généralement DIFFÉRENTES en chaque $\mathbf{x}$** »*.

### 6.3 Le théorème A2.2 de Young

> *« Il y a **un théorème important** auquel nous aurons occasion de nous référer. Il dit que **L'ORDRE DANS LEQUEL LES DÉRIVÉES PARTIELLES SONT DIFFÉRENTIÉES NE FAIT AUCUNE DIFFÉRENCE. Le théorème est offert ici SANS PREUVE.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.2 — Théorème de Young</span>

Pour toute fonction **deux fois continûment différentiable** $f(\mathbf{x})$ :

$$\boxed{\;\frac{\partial^2f(\mathbf{x})}{\partial x_i\,\partial x_j}=\frac{\partial^2f(\mathbf{x})}{\partial x_j\,\partial x_i}\qquad\textbf{pour tous } i \textbf{ et } j\;}$$

</div>

⚠️ **La conséquence structurelle** : *« **le théorème de Young nous dit que LA HESSIENNE SERA SYMÉTRIQUE** »*.

<details class="details--riche">
<summary>

**EXEMPLE A2.2 — la vérification**

</summary>

Soit $f(x_1,x_2)=x_1x_2^2+x_1x_2$.

**Les deux partielles premières** :

$$f_1(\mathbf{x})=x_2^2+x_2 \qquad\qquad f_2(\mathbf{x})=2x_1x_2+x_1$$

**En différentiant $f_1$ par rapport à $x_2$** :

$$\frac{\partial^2f}{\partial x_2\,\partial x_1}\equiv f_{12}(\mathbf{x})=2x_2+1$$

**En différentiant $f_2$ par rapport à $x_1$** :

$$\frac{\partial^2f}{\partial x_1\,\partial x_2}\equiv f_{21}(\mathbf{x})=2x_2+1$$

> *« **Clairement, $f_{12}=f_{21}$ pour tout $\mathbf{x}$, EXACTEMENT COMME LE PROMETTAIT LE THÉORÈME DE YOUNG.** »*

</details>

## 🔴 Concept 7 — Le théorème A2.3 : le pont entre une et plusieurs variables

### 7.1 L'idée

> *« Dans le cas à une variable, **le théorème A2.1 a établi que la courbure d'une fonction concave était exprimée par sa dérivée seconde ainsi que par la relation de la fonction à ses droites tangentes. LES MÊMES CONCLUSIONS VALENT AUSSI DANS LE CAS MULTIVARIÉ. Une manière simple de le voir est de comprendre d'abord LE RÉSULTAT SUIVANT.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.3 — Concavité à une variable et à plusieurs variables</span>

Soit $f$ une fonction réelle définie sur le sous-ensemble **convexe** $D$ de $\mathbb{R}^n$. Alors **$f$ est (strictement) concave SI ET SEULEMENT SI, pour tout $\mathbf{x}\in D$ et tout $\mathbf{z}\in\mathbb{R}^n$ NON NUL, la fonction**

$$g(t)=f(\mathbf{x}+t\mathbf{z})$$

**est (strictement) concave sur $\{t\in\mathbb{R}\mid\mathbf{x}+t\mathbf{z}\in D\}$.**

</div>

### 7.2 La preuve

<details class="details--riche">
<summary>

**Le sens « $f$ concave ⟹ $g$ concave »**

</summary>

> *« **Nous prouvons UNE SEULE direction pour le cas concave, laissant le reste à l'exercice A2.21.** »*

Soit $C=\{t\in\mathbb{R}\mid\mathbf{x}+t\mathbf{z}\in D\}$. Choisir $t_0,t_1\in C$ et $\alpha\in[0,1]$. **Il faut montrer**

$$g\big(\alpha t_0+(1-\alpha)t_1\big)\geq\alpha g(t_0)+(1-\alpha)g(t_1) \tag{P.1}$$

⚠️ **D'abord** : *« **notez que $C$ est un ensemble CONVEXE**, de sorte que $\alpha t_0+(1-\alpha)t_1\in C$ et **$g$ y est donc DÉFINIE** »*.

**La chaîne de calcul** — *« pour établir l'inégalité voulue, **nous appliquons SIMPLEMENT LA DÉFINITION de $g$** »* :

$$\begin{aligned} g\big(\alpha t_0+(1-\alpha)t_1\big) &= f\big(\mathbf{x}+(\alpha t_0+(1-\alpha)t_1)\mathbf{z}\big)\\ &\underbrace{=}_{\ \text{le regroupement}} f\big(\alpha(\mathbf{x}+t_0\mathbf{z})+(1-\alpha)(\mathbf{x}+t_1\mathbf{z})\big)\\ &\underbrace{\geq}_{\ f\ \text{CONCAVE}} \alpha f(\mathbf{x}+t_0\mathbf{z})+(1-\alpha)f(\mathbf{x}+t_1\mathbf{z})\\ &= \alpha g(t_0)+(1-\alpha)g(t_1) \end{aligned}$$

*« **(Notez que parce que $t_i\in C$, $\mathbf{x}+t_i\mathbf{z}\in D$.)** »* $\blacksquare$

⚠️ **Le pivot du calcul** : l'égalité $\ \mathbf{x}+\big(\alpha t_0+(1-\alpha)t_1\big)\mathbf{z}=\alpha(\mathbf{x}+t_0\mathbf{z})+(1-\alpha)(\mathbf{x}+t_1\mathbf{z})$, qui tient parce que $\alpha+(1-\alpha)=1$.

</details>

### 🔴 7.3 Ce que le théorème permet

> *« Le théorème A2.3 dit, en effet, que **pour vérifier qu'une fonction MULTIVARIÉE est concave, IL SUFFIT DE VÉRIFIER, pour chaque point $\mathbf{x}$ du domaine et chaque direction $\mathbf{z}$, que LA FONCTION D'UNE SEULE VARIABLE définie par les valeurs prises par $f$ SUR LA DROITE passant par $\mathbf{x}$ dans la direction $\mathbf{z}$ EST CONCAVE.** »*

> *« Parce que **le théorème A2.1 caractérise les fonctions concaves d'une seule variable, nous pouvons alors METTRE LES THÉORÈMES A2.1 ET A2.3 ENSEMBLE** pour caractériser les fonctions concaves de plusieurs variables. »*

## 🔴 Concept 8 — Formes quadratiques et définitude

### 8.1 Le vocabulaire matriciel

> *« Avant de réunir les deux théorèmes, **il sera commode d'introduire un peu de terminologie d'ALGÈBRE MATRICIELLE.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITIONS (énoncées dans le texte)</span>

Une matrice $n\times n$ $A$ est **SEMI-DÉFINIE NÉGATIVE** si, **pour tous les vecteurs $\mathbf{z}\in\mathbb{R}^n$**,

$$\mathbf{z}^{T}A\,\mathbf{z}\ \leq\ 0$$

**Si l'inégalité est STRICTE pour tout $\mathbf{z}$ NON NUL**, alors $A$ est **DÉFINIE NÉGATIVE**. $A$ est **SEMI-DÉFINIE POSITIVE** *(respectivement DÉFINIE POSITIVE)* si **$-A$ est semi-définie négative** *(définie négative)*.

</div>

> *(Note 2.)* *« Si $a_{ij}$ désigne l'élément de la $i$-ème ligne et $j$-ème colonne de $A$, alors »*

$$\mathbf{z}^{T}A\,\mathbf{z}=\sum_{i=1}^{n}\sum_{j=1}^{n}z_i\,a_{ij}\,z_j$$

### 🔴 8.2 L'analogie à garder en tête

> *« **Pensez la semi-définitude négative comme LA GÉNÉRALISATION AUX MATRICES de la notion de NOMBRE NON POSITIF. En effet, notez qu'une matrice $1\times1$ (c'est-à-dire UN NOMBRE) est semi-définie négative SI ET SEULEMENT SI son unique entrée est non positive.** »*

$$\boxed{\;\textbf{« L'analogue d'une DÉRIVÉE SECONDE NON POSITIVE d'une fonction d'une variable}\\\textbf{serait une MATRICE HESSIENNE SEMI-DÉFINIE NÉGATIVE. »}\;}$$

## 🔴 Concept 9 — Le théorème A2.4

### 9.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.4 — Pente, courbure et concavité en plusieurs variables</span>

Soit $D$ un sous-ensemble **convexe** de $\mathbb{R}^n$ **d'intérieur non vide** sur lequel $f$ est **deux fois continûment différentiable**. Les énoncés 1 à 3 sont **équivalents** : **1.** $f$ est **concave**. **2.** **$H(\mathbf{x})$ est SEMI-DÉFINIE NÉGATIVE pour tout $\mathbf{x}$ dans l'intérieur de $D$.** **3.** Pour tout $\mathbf{x}^0\in D$ : $\ f(\mathbf{x})\leq f(\mathbf{x}^0)+\nabla f(\mathbf{x}^0)(\mathbf{x}-\mathbf{x}^0)$ **pour tout $\mathbf{x}\in D$**. De plus : **4.** **Si $H(\mathbf{x})$ est DÉFINIE NÉGATIVE pour tout $\mathbf{x}$ de $D$, alors $f$ est STRICTEMENT CONCAVE.**

</div>

⚠️ **C'est EXACTEMENT le théorème A2.1, avec $f''\to H$ et $f'\to\nabla f$.**

### 9.2 La preuve

<details class="details--riche">
<summary>

**Le montage — et les deux formules clés (P.3) et (P.4)**

</summary>

> *« Parce que $f$ est **deux fois continûment différentiable, il suffit d'établir le théorème SUR L'INTÉRIEUR de $D$. LA CONTINUITÉ S'OCCUPERA ALORS DES POINTS FRONTIÈRE.** »*

**Le montage** : fixer $\mathbf{x}\in\operatorname{int}D$ et $\mathbf{z}\in\mathbb{R}^n$ ; poser $C=\{t\mid\mathbf{x}+t\mathbf{z}\in D\}$ et $g(t)=f(\mathbf{x}+t\mathbf{z})$. *« **Notez que $g$ HÉRITE de $f$ la double différentiabilité continue.** »*

**Si 1 tient** *($f$ concave)*, **le théorème A2.3** donne $g$ concave sur $C$, et comme $\mathbf{x}$ est intérieur, **$C$ est un INTERVALLE NON DÉGÉNÉRÉ**, donc **le théorème A2.1** s'applique :

$$g''(t)\leq0\ \ \forall\,t\in C \tag{P.1}$$

$$g(t)\leq g(t_0)+g'(t_0)(t-t_0)\ \ \forall\,t,t_0\in C \tag{P.2}$$

⚠️ **LA PREMIÈRE FORMULE CLÉ** — *« $g'(t)$ est simplement **LA DÉRIVÉE DIRECTIONNELLE de $f$ au point $\mathbf{x}+t\mathbf{z}$ dans la direction $\mathbf{z}$** »* :

$$g'(t)=\nabla f(\mathbf{x}+t\mathbf{z})\,\mathbf{z} \tag{P.3}$$

⚠️ **LA SECONDE FORMULE CLÉ** — *« pour calculer $g''(t)$, **il est plus simple d'écrire d'abord $g'(t)=\sum_i f_i(\mathbf{x}+t\mathbf{z})z_i$, puis de différentier la somme TERME À TERME** »*. La dérivée de $f_i(\mathbf{x}+t\mathbf{z})$ par rapport à $t$ est **la dérivée directionnelle de $f_i$ dans la direction $\mathbf{z}$**, soit $\sum_j f_{ij}(\mathbf{x}+t\mathbf{z})z_j$. *« **En multipliant chacune par $z_i$ et en sommant sur $i$** »* :

$$g''(t)=\sum_{i=1}^{n}\sum_{j=1}^{n}z_i\,f_{ij}(\mathbf{x}+t\mathbf{z})\,z_j \qquad\text{c'est-à-dire}\qquad \boxed{\;g''(t)=\mathbf{z}^{T}H(\mathbf{x}+t\mathbf{z})\,\mathbf{z}\;} \tag{P.4}$$

</details>

<details class="details--riche">
<summary>

**1 ⟹ 2, et la preuve simultanée de 4**

</summary>

| Pas | L'argument |
|---|---|
| **1** | *« notez que **$0\in C$** »* ⟹ **par (P.1)**, $g''(0)\leq0$ |
| **2** | **Par (P.4)** avec $t=0$ : $\ \mathbf{z}^{T}H(\mathbf{x})\,\mathbf{z}\leq0$ |
| **3** | *« **Mais parce que $\mathbf{z}$ ET $\mathbf{x}$ étaient ARBITRAIRES, ceci signifie que $H(\mathbf{x})$ est semi-définie négative POUR TOUT $\mathbf{x}$.** »* |

> ⚠️ *« **Notez que ceci prouve AUSSI l'énoncé 4**, car si $H(\mathbf{x})$ est DÉFINIE NÉGATIVE pour tout $\mathbf{x}$, alors **quels que soient les $\mathbf{x}$ et $\mathbf{z}$ choisis, POURVU QUE $\mathbf{z}$ SOIT NON NUL, $g''(t)<0$ pour tout $t$**, de sorte que **par le théorème A2.3, $f$ doit être STRICTEMENT concave**. »*

</details>

<details class="details--riche">
<summary>

**1 ⟹ 3 — le choix astucieux de la direction**

</summary>

> *« Pour voir que 1 ⟹ 3, **nous devons utiliser (P.2). Choisissez n'importe quel $\mathbf{x}^0\in D$ et LAISSEZ LE $\mathbf{z}$ PRÉCÉDENT ÊTRE DONNÉ PAR $\mathbf{x}^0-\mathbf{x}$. (Rappelez-vous que $\mathbf{z}\in\mathbb{R}^n$ était ARBITRAIRE.)** »*

⚠️ **Avec ce choix, $\mathbf{0}$ ET $\mathbf{1}$ appartiennent tous deux à $C$** — car $\mathbf{x}+0\cdot\mathbf{z}=\mathbf{x}\in D$ et $\mathbf{x}+1\cdot\mathbf{z}=\mathbf{x}^0\in D$.

**(P.2) avec $t=0$ et $t_0=1$** donne alors

$$g(0)\leq g(1)-g'(1)$$

**En utilisant (P.3) et la définition de $g$** — $g(0)=f(\mathbf{x})$, $g(1)=f(\mathbf{x}^0)$, $g'(1)=\nabla f(\mathbf{x}^0)\mathbf{z}=\nabla f(\mathbf{x}^0)(\mathbf{x}^0-\mathbf{x})$ — *« **ceci dit juste que** »* :

$$f(\mathbf{x})\ \leq\ f(\mathbf{x}^0)+\nabla f(\mathbf{x}^0)\,(\mathbf{x}-\mathbf{x}^0)$$

> *« Donc **l'énoncé 3 tient parce que $\mathbf{x}$ ET $\mathbf{x}^0$ étaient ARBITRAIRES**. »* $\blacksquare$

> *« **Les preuves que 2 ⟹ 1 et 3 ⟹ 1 sont SEMBLABLES, et nous les laissons en exercice** *(A2.22)*. »*

</details>

### 🔴 9.3 Le résumé du livre

> *« Selon le théorème, **une fonction est CONCAVE ssi sa hessienne est SEMI-DÉFINIE NÉGATIVE en tous les points du domaine. Elle est donc CONVEXE ssi sa hessienne est SEMI-DÉFINIE POSITIVE en tous les points. En même temps, nous savons que la fonction sera STRICTEMENT concave (convexe) quand la hessienne est DÉFINIE négative (positive) sur le domaine, BIEN QUE LA RÉCIPROQUE DE CECI NE SOIT PAS VRAIE.** »*

| $f$ est… | $\iff$ $H(\mathbf{x})$ est… |
|---|---|
| **CONCAVE** | **SEMI-DÉFINIE NÉGATIVE** partout |
| **CONVEXE** | **SEMI-DÉFINIE POSITIVE** partout |
| **STRICTEMENT concave** | $\Longleftarrow$ **DÉFINIE NÉGATIVE** *( sens unique)* |
| **STRICTEMENT convexe** | $\Longleftarrow$ **DÉFINIE POSITIVE** *( sens unique)* |

### 🔴 9.4 Le renvoi du livre

> *« Il y a **BEAUCOUP DE TESTS** que l'on peut effectuer directement sur la matrice $H(\mathbf{x})$ pour déterminer la concavité, la convexité, la quasiconcavité ou la quasiconvexité de la fonction. **LES RÈGLES ET RÉGLEMENTATIONS DANS CE DOMAINE SONT NOTOIREMENT COMPLIQUÉES. Leur plus grande applicabilité surgit dans le contexte des PROBLÈMES D'OPTIMISATION, à considérer plus tard. Il semble donc préférable de REPORTER LES DÉTAILS de ces tests jusque-là.** »*

*(Ces tests — les mineurs principaux du théorème A2.11 — sont traités en §A2.2.2.)*

## 🟠 Concept 10 — Le théorème A2.5

### 10.1 L'énoncé

> *« **Une relation assez INTUITIVE entre la concavité/convexité d'une fonction et ses dérivées partielles secondes semble mériter d'être notée ici.** Dans le cas à une variable, une condition **NÉCESSAIRE ET SUFFISANTE** est que la dérivée seconde ne soit pas positive (négative). **Dans le cas multivarié, nous pouvons noter une condition NÉCESSAIRE, MAIS PAS SUFFISANTE, en termes des signes de toutes les dérivées partielles secondes « PROPRES ». La preuve est laissée en exercice** *(A2.23)*. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.5 — Concavité, convexité et dérivées partielles secondes propres</span>

Soit $f:D\to\mathbb{R}$ **deux fois différentiable**. **1.** Si $f$ est **CONCAVE**, alors $f_{ii}(\mathbf{x})\leq0$ pour tout $\mathbf{x}$ de l'intérieur de $D$, $i=1,\dots,n$. **2.** Si $f$ est **CONVEXE**, alors $f_{ii}(\mathbf{x})\geq0$ pour tout $\mathbf{x}$ de l'intérieur de $D$, $i=1,\dots,n$.

</div>

⚠️ **NÉCESSAIRE, PAS SUFFISANT** : des partielles propres toutes négatives **ne garantissent PAS** la concavité — **les termes croisés peuvent tout ruiner**.

<details class="details--riche">
<summary>

**Enrichissement pédagogique (hors cours) — la preuve suggérée par l'exercice A2.23**

</summary>

> **L'indication du livre** *(exercice A2.23)* : *« **Utilisez la partie 2 du théorème A2.4 pour prouver le théorème A2.5. En particulier, considérez le produit $\mathbf{z}^{T}H(\mathbf{x})\mathbf{z}$ quand $\mathbf{z}$ est L'UN DES $n$ VECTEURS UNITAIRES de $\mathbb{R}^n$.** »*

**Le calcul** : prendre $\mathbf{z}=\mathbf{e}_i=(0,\dots,0,1,0,\dots,0)$. Alors

$$\mathbf{e}_i^{T}H(\mathbf{x})\,\mathbf{e}_i=f_{ii}(\mathbf{x})$$

**Si $f$ est concave**, le théorème A2.4(2) donne $\mathbf{z}^{T}H\mathbf{z}\leq0$ **pour TOUT $\mathbf{z}$**, donc **en particulier pour $\mathbf{e}_i$** ⟹ $f_{ii}(\mathbf{x})\leq0$

⚠️ **Pourquoi ce n'est PAS suffisant** : la semi-définitude négative exige l'inégalité pour **TOUS** les $\mathbf{z}$, pas seulement pour les $n$ vecteurs unitaires. *(L'exercice A2.6 demande la version convexe : « prouvez que les dérivées partielles secondes propres d'une fonction convexe doivent toujours être non négatives ».)*

</details>

## 🔴 Concept 11 — §A2.1.3 : les fonctions homogènes

### 11.1 La définition A2.2

> *« **Les fonctions réelles HOMOGÈNES surgissent ASSEZ SOUVENT dans les applications microéconomiques.** Dans cette section, nous considérons brièvement les fonctions de ce type **et utilisons NOS OUTILS DE CALCUL pour établir certaines de leurs propriétés importantes.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A2.2 — Fonctions homogènes</span>

Une fonction réelle $f(\mathbf{x})$ est dite **homogène de degré $k$** si

$$\boxed{\;f(t\mathbf{x})\equiv t^{k}f(\mathbf{x}) \qquad\textbf{pour tout } t>0\;}$$

</div>

> *« **Deux cas particuliers méritent d'être notés** : $f(\mathbf{x})$ est **homogène de degré 1, ou HOMOGÈNE LINÉAIRE**, si $f(t\mathbf{x})\equiv tf(\mathbf{x})$ pour tout $t>0$ ; elle est **homogène de degré ZÉRO** si $f(t\mathbf{x})\equiv f(\mathbf{x})$ pour tout $t>0$. »*

### 🔴 11.2 La lecture économique

> *« Les fonctions homogènes affichent **UN COMPORTEMENT TRÈS RÉGULIER quand toutes les variables sont augmentées SIMULTANÉMENT ET DANS LA MÊME PROPORTION.** »*

| Le degré | Ce que dit le livre |
|---|---|
| **$k=1$** | *« **DOUBLER ou TRIPLER toutes les variables DOUBLE ou TRIPLE la valeur de la fonction** »* |
| **$k=0$** | *« **les changements ÉQUIPROPORTIONNELS de toutes les variables LAISSENT LA VALEUR DE LA FONCTION INCHANGÉE** »* |

<details class="details--riche">
<summary>

**EXEMPLE A2.3 — la fonction Cobb-Douglas**

</summary>

$$f(x_1,x_2)\equiv A\,x_1^{\alpha}x_2^{\beta},\qquad A>0,\ \alpha>0,\ \beta>0$$

> *« est connue comme **LA FONCTION COBB-DOUGLAS**. Nous pouvons vérifier si elle est homogène **en multipliant toutes les variables par le même facteur $t$ et en voyant ce que nous obtenons.** »*

$$f(tx_1,tx_2)\equiv A(tx_1)^{\alpha}(tx_2)^{\beta}\equiv t^{\alpha}t^{\beta}A\,x_1^{\alpha}x_2^{\beta}=t^{\alpha+\beta}f(x_1,x_2)$$

> ⚠️ *« Selon la définition, **la Cobb-Douglas est homogène de degré $\alpha+\beta$. Si les coefficients sont choisis de sorte que $\alpha+\beta=1$, ELLE EST HOMOGÈNE LINÉAIRE.** »*

</details>

## 🔴 Concept 12 — Le théorème A2.6

### 12.1 L'énoncé

> *« **Les dérivées partielles des fonctions homogènes sont ELLES AUSSI homogènes.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.6 — Dérivées partielles des fonctions homogènes</span>

$$\boxed{\;f(\mathbf{x}) \textbf{ homogène de degré } k \ \Longrightarrow\ \textbf{ses dérivées partielles sont homogènes de degré } k-1\;}$$

</div>

<details class="details--riche">
<summary>

**La preuve — trois lignes**

</summary>

Supposons $f(t\mathbf{x})\equiv t^{k}f(\mathbf{x})$ pour tout $t>0$ **(P.1)**.

**Différentier LE MEMBRE DE GAUCHE par rapport à $x_i$** — **par la règle de composition, avec $\partial(tx_i)/\partial x_i=t$** :

$$\frac{\partial}{\partial x_i}\big(f(t\mathbf{x})\big)=\frac{\partial f(t\mathbf{x})}{\partial(tx_i)}\cdot\frac{\partial(tx_i)}{\partial x_i}=\frac{\partial f(t\mathbf{x})}{\partial x_i}\cdot t \tag{P.2}$$

**Différentier LE MEMBRE DE DROITE par rapport à $x_i$** :

$$\frac{\partial}{\partial x_i}\big(t^{k}f(\mathbf{x})\big)=t^{k}\frac{\partial f(\mathbf{x})}{\partial x_i} \tag{P.3}$$

⚠️ *« **Parce que (P.1) est UNE IDENTITÉ, (P.2) doit égaler (P.3)** »* :

$$\frac{\partial f(t\mathbf{x})}{\partial x_i}\,t=t^{k}\frac{\partial f(\mathbf{x})}{\partial x_i} \qquad\xrightarrow{\ \div\,t\ }\qquad \boxed{\;\frac{\partial f(t\mathbf{x})}{\partial x_i}=t^{k-1}\frac{\partial f(\mathbf{x})}{\partial x_i}\;}$$

*« pour $i=1,\dots,n$ et $t>0$, **comme nous cherchions à le montrer** »*. $\blacksquare$

⚠️ **Le ressort** : c'est **le mot « IDENTITÉ »** qui autorise à différentier les deux membres.

</details>

### 🔴 12.2 Le cas $k=1$

> *« **Une application FRÉQUENTE surgit dans le cas des fonctions homogènes de degré 1.** Le théorème nous dit que leurs dérivées partielles satisfont »*

$$\frac{\partial f(t\mathbf{x})}{\partial x_i}=\frac{\partial f(\mathbf{x})}{\partial x_i}\qquad\forall\,t>0$$

> ⚠️ *« Ceci dit qu'**AUGMENTER (ou diminuer) TOUTES les variables DANS LA MÊME PROPORTION LAISSE LES $n$ DÉRIVÉES PARTIELLES INCHANGÉES.** »*

<details class="details--riche">
<summary>

**EXEMPLE A2.4 — la vérification sur la Cobb-Douglas**

</summary>

Soit $f(x_1,x_2)\equiv A\,x_1^{\alpha}x_2^{\beta}$ avec $\alpha+\beta=1$ *(homogène linéaire)*. La partielle par rapport à $x_1$ est

$$\frac{\partial f(x_1,x_2)}{\partial x_1}=\alpha A\,x_1^{\alpha-1}x_2^{\beta}$$

**En évaluant en $(tx_1,tx_2)$** :

$$\frac{\partial f(tx_1,tx_2)}{\partial x_1}=\alpha A(tx_1)^{\alpha-1}(tx_2)^{\beta}=t^{\alpha+\beta-1}\,\alpha A\,x_1^{\alpha-1}x_2^{\beta}=\frac{\partial f(x_1,x_2)}{\partial x_1}$$

> ⚠️ *« **comme requis, parce que $\alpha+\beta=1$ et $t^{\alpha+\beta-1}=t^{0}=1$** »*.

*(L'exercice A2.7 demande de **compléter l'exemple pour la partielle par rapport à $x_2$** — le calcul est identique et donne $t^{\alpha+\beta-1}\beta Ax_1^{\alpha}x_2^{\beta-1}$.)*

</details>

## 🔴 Concept 13 — Le théorème A2.7 d'Euler

### 13.1 L'énoncé

> *« Enfin, **LE THÉORÈME D'EULER — parfois appelé LE THÉORÈME D'ADDITIVITÉ (« adding-up theorem ») — nous donne UNE MANIÈRE INTÉRESSANTE DE CARACTÉRISER COMPLÈTEMENT les fonctions homogènes. Il dit qu'une fonction est homogène SI ET SEULEMENT SI elle peut toujours être écrite EN TERMES DE SES PROPRES DÉRIVÉES PARTIELLES ET DU DEGRÉ D'HOMOGÉNÉITÉ.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.7 — Théorème d'Euler</span>

$$\boxed{\;f(\mathbf{x}) \textbf{ est homogène de degré } k \quad\Longleftrightarrow\quad k\,f(\mathbf{x})=\sum_{i=1}^{n}\frac{\partial f(\mathbf{x})}{\partial x_i}\,x_i \quad\textbf{pour tout } \mathbf{x}\;}$$

</div>

### 13.2 La preuve complète

<details class="details--riche">
<summary>

**Le montage — la fonction auxiliaire $g(t)$**

</summary>

> *« **Il sera utile de définir la fonction de $t$** »*

$$g(t)\equiv f(t\mathbf{x}) \tag{P.1}$$

*« et **d'en noter quelques propriétés**. Spécifiquement, **pour $\mathbf{x}$ FIXÉ**, différentier par rapport à $t$ »* :

$$g'(t)=\sum_{i=1}^{n}\frac{\partial f(t\mathbf{x})}{\partial x_i}\,x_i \tag{P.2}$$

**et donc, en $t=1$** :

$$g'(1)=\sum_{i=1}^{n}\frac{\partial f(\mathbf{x})}{\partial x_i}\,x_i \tag{P.3}$$

> *(Note 3.)* *« **Au cas où ce ne serait pas parfaitement clair, rappelez-vous que parce que $g(t)\equiv f(tx_1,\dots,tx_n)$, $t$ MULTIPLIE LES $n$ VARIABLES, de sorte que son effet entre SÉPARÉMENT PAR CHACUNE D'ELLES. Pour obtenir la dérivée de $g(\cdot)$ par rapport à $t$, nous devons donc SOMMER LES EFFETS SÉPARÉS qu'un changement de $t$ aura sur $f(\cdot)$ par toutes ces avenues séparées. De plus, en calculant chacun d'eux, nous devons nous souvenir D'APPLIQUER LA RÈGLE DE COMPOSITION.** Ainsi »*
>
> $$g'(t)=\sum_{i=1}^{n}\frac{\partial f(tx_1,\dots,tx_n)}{\partial x_i}\cdot\frac{\partial(tx_i)}{\partial t}$$
>
> *« **Mais $\partial(tx_i)/\partial t=x_i$, d'où (P.2).** »*

</details>

<details class="details--riche">
<summary>

**La NÉCESSITÉ — homogène ⟹ la formule d'Euler**

</summary>

Supposons $f$ homogène de degré $k$, donc $f(t\mathbf{x})=t^{k}f(\mathbf{x})$.

| Pas | L'argument |
|---|---|
| **1** | **Par (P.1)**, $g(t)=t^{k}f(\mathbf{x})$ |
| **2** | **Différentier** *(à $\mathbf{x}$ fixé, donc $f(\mathbf{x})$ est une CONSTANTE)* : $\ g'(t)=k\,t^{k-1}f(\mathbf{x})$ |
| **3** | **Évaluer en $t=1$** : $\ g'(1)=k\,f(\mathbf{x})$ |
| **4** | **Comparer avec (P.3)** : $$k\,f(\mathbf{x})=\sum_{i=1}^{n}\frac{\partial f(\mathbf{x})}{\partial x_i}\,x_i \tag{P.4}$$ |

*« **ce qui prouve la nécessité** »*.

</details>

<details class="details--riche">
<summary>

**La SUFFISANCE — la formule d'Euler ⟹ homogène**

</summary>

Supposons (P.4). **Évaluer en $t\mathbf{x}$** *(et non en $\mathbf{x}$)* :

$$k\,f(t\mathbf{x})=\sum_{i=1}^{n}\frac{\partial f(t\mathbf{x})}{\partial x_i}\,t\,x_i \tag{P.5}$$

| Pas | L'argument |
|---|---|
| **1** | *« **Multiplier les deux membres de (P.2) par $t$, comparer à (P.5)** »* ⟹ $\ t\,g'(t)=k\,f(t\mathbf{x})$ |
| **2** | **Substituer (P.1)** : $$t\,g'(t)=k\,g(t) \tag{P.6}$$ |
| **3** | **LE TOUR DE FORCE** : *« considérez la fonction $t^{-k}g(t)$. Si nous la différentions par rapport à $t$, nous obtenons »* $$\frac{d}{dt}\big[t^{-k}g(t)\big]=t^{-k-1}\big[t\,g'(t)-k\,g(t)\big]$$ |
| **4** | *« **Au vu de (P.6), CETTE DÉRIVÉE DOIT ÊTRE NULLE**, donc nous concluons que $t^{-k}g(t)=c$ pour une certaine CONSTANTE $c$. » ⟹ $g(t)=t^{k}c$* |
| **5** | *« **Pour trouver $c$, évaluer en $t=1$** et noter $g(1)=c$. Puis **utiliser la définition (P.1)** pour obtenir $c=f(\mathbf{x})$ »* |
| **6** | ⟹ $g(t)=t^{k}f(\mathbf{x})$, et **en substituant (P.1) une fois de plus** : $\ f(t\mathbf{x})=t^{k}f(\mathbf{x})$ |

*« pour tout $\mathbf{x}$, **la preuve est donc complète** »*. $\blacksquare$

⚠️ **La clé de la suffisance** : reconnaître que **(P.6) est une équation différentielle** dont la solution générale est $g(t)=ct^{k}$ — le livre l'exploite en montrant que **$t^{-k}g(t)$ a une dérivée nulle, donc est constante**.

</details>

### 🔴 13.3 Le cas $k=1$ — la version « additivité »

> *« **Une fois encore, nous devrions noter les implications pour les fonctions HOMOGÈNES LINÉAIRES. Pour $k=1$, le théorème d'Euler nous dit que nous pouvons écrire $f(\mathbf{x})$ en termes de ses dérivées partielles ainsi :** »*

$$\boxed{\;f(\mathbf{x})=\sum_{i=1}^{n}\frac{\partial f(\mathbf{x})}{\partial x_i}\,x_i\;}$$

⚠️ **C'est le « théorème d'ADDITIVITÉ »** : *la valeur totale se répartit exactement entre les $n$ facteurs, chacun rémunéré à sa productivité marginale.*

<details class="details--riche">
<summary>

**EXEMPLE A2.5 — la vérification sur la Cobb-Douglas**

</summary>

Soit $f(x_1,x_2)=A\,x_1^{\alpha}x_2^{\beta}$ avec $\alpha+\beta=1$. Les partielles sont

$$\frac{\partial f}{\partial x_1}=\alpha A\,x_1^{\alpha-1}x_2^{\beta} \qquad\qquad \frac{\partial f}{\partial x_2}=\beta A\,x_1^{\alpha}x_2^{\beta-1}$$

> *« **Multiplier la première par $x_1$, la seconde par $x_2$, additionner, et utiliser le fait que $\alpha+\beta=1$** »* :

$$\frac{\partial f}{\partial x_1}x_1+\frac{\partial f}{\partial x_2}x_2=\alpha A\,x_1^{\alpha}x_2^{\beta}+\beta A\,x_1^{\alpha}x_2^{\beta}=(\alpha+\beta)A\,x_1^{\alpha}x_2^{\beta}=A\,x_1^{\alpha}x_2^{\beta}=f(x_1,x_2)$$

⚠️ **Exactement la formule d'Euler pour $k=1$.**

</details>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « dérivez la fonction suivante » | **§A2.1.1** | Appliquer les six règles de la **fig. A2.2** |
| « la fonction est-elle croissante en $x=2$ ? » | **§A2.1.1** | **Le SIGNE de $f'(2)$** |
| « localement concave ou convexe ? » | **Théorème A2.1** | **Le SIGNE de $f''(2)$** |
| « montrez que la tangente est au-dessus » | **Théorème A2.1(3)** | $f(x)\leq f(x^0)+f'(x^0)(x-x^0)$ |
| « $f$ strictement concave ⟹ $f''<0$ ? » | **NON** | Le contre-exemple **$-x^4$** *(A2.20)* |
| « trouvez toutes les partielles premières » | **Déf. A2.1** | **Traiter les autres variables comme des CONSTANTES** |
| « le taux de variation dans la direction $\mathbf{z}$ » | **(A2.3)** | $\nabla f(\mathbf{x})\mathbf{z}$ |
| « trouvez la matrice hessienne » | **§A2.1.2** | **Toutes les partielles SECONDES ; elle est SYMÉTRIQUE** |
| « construisez la forme quadratique » | **§A2.1.2** | $\mathbf{z}^{T}H(\mathbf{x})\mathbf{z}=\sum_i\sum_j z_ia_{ij}z_j$ |
| « vérifiez que $f_{12}=f_{21}$ » | **Théorème A2.2** | **YOUNG** |
| « $f$ est-elle concave ? » *(plusieurs variables)* | **Théorème A2.4** | **$H$ SEMI-DÉFINIE NÉGATIVE partout** |
| « $f$ est-elle strictement concave ? » | **Théorème A2.4(4)** | **$H$ DÉFINIE NÉGATIVE suffit** *(mais n'est pas nécessaire)* |
| « les partielles propres sont-elles $\leq0$ ? » | **Théorème A2.5** | **NÉCESSAIRE, pas SUFFISANT** |
| « cette fonction est-elle homogène ? de quel degré ? » | **Déf. A2.2** | **Remplacer $\mathbf{x}$ par $t\mathbf{x}$ et FACTORISER $t^k$** |
| « degré de $f\cdot g$ ? de $g(f,f)$ ? » | **Déf. A2.2** | **Le produit ADDITIONNE les degrés, la composition les MULTIPLIE** |
| « vérifiez le théorème d'Euler » | **Théorème A2.7** | $\sum_i(\partial f/\partial x_i)x_i=k\,f(\mathbf{x})$ |
| « fonction HOMOTHÉTIQUE » | **Exercice A2.10** | $h=g(f)$, $g$ **strictement croissante**, $f$ **homogène de degré 1** |

**Les trois réflexes de cadrage :**

1. **Pour la concavité en plusieurs variables, ne jamais partir de la définition.** Le chemin du livre est **théorème A2.3 puis A2.1**, ce qui donne **le théorème A2.4** : on regarde **la hessienne**, pas les combinaisons convexes.
2. **Pour l'homogénéité, TOUJOURS substituer $t\mathbf{x}$ et factoriser.** C'est le test en une ligne de la définition A2.2.
3. **Se souvenir que les conditions 4 des théorèmes A2.1 et A2.4 sont à SENS UNIQUE.** *« La réciproque de ceci n'est pas vraie. »*

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Classer une fonction d'une variable en un point

| Pas | L'action |
|---|---|
| **1** | **Calculer $f'(x)$** avec les règles de la fig. A2.2 |
| **2** | **Évaluer $f'$ au point** ⟹ $>0$ **croissante** · $<0$ **décroissante** · $=0$ **CONSTANTE (stationnaire)** |
| **3** | **Calculer $f''(x)$** et l'évaluer |
| **4** | ⟹ $f''<0$ **localement CONCAVE** · $f''>0$ **localement CONVEXE** · $f''=0$ **localement LINÉAIRE** |

### Méthode 2 — Calculer une hessienne et sa forme quadratique

1. **Calculer les $n$ partielles premières** $f_i(\mathbf{x})$.
2. **Dériver chacune par rapport à chacune des $n$ variables** ⟹ $n^2$ partielles secondes.
3. **Les ranger en matrice** — **YOUNG garantit la symétrie, donc il n'y a que $n(n+1)/2$ calculs distincts.**
4. **Former** $\mathbf{z}^{T}H\mathbf{z}=\sum_i\sum_j z_i f_{ij}z_j$.
5. **Chercher à l'écrire comme UNE SOMME DE CARRÉS** pour conclure au signe.

### Méthode 3 — Décider de la concavité par la hessienne

| Le verdict sur $\mathbf{z}^{T}H(\mathbf{x})\mathbf{z}$ | La conclusion |
|---|---|
| $\leq0$ **pour tout $\mathbf{z}$, en tout $\mathbf{x}$** | **$f$ est CONCAVE** *(thm A2.4(2))* |
| $<0$ **pour tout $\mathbf{z}\neq\mathbf{0}$, en tout $\mathbf{x}$** | **$f$ est STRICTEMENT concave** *(thm A2.4(4))* |
| $\geq0$ partout | **$f$ est CONVEXE** |
| **de signe variable** | **$f$ n'est NI concave NI convexe** |

⚠️ **Le test rapide de RÉFUTATION** : si **une seule** partielle propre $f_{ii}$ est $>0$ quelque part, **$f$ n'est PAS concave** *(thm A2.5, en contraposée)*.

### Méthode 4 — Tester l'homogénéité et trouver le degré

1. **Écrire $f(t\mathbf{x})$** en remplaçant chaque $x_i$ par $tx_i$.
2. **Factoriser toutes les puissances de $t$.**
3. **Si l'on obtient $t^{k}f(\mathbf{x})$**, $f$ est **homogène de degré $k$** ; **sinon, elle n'est pas homogène**.

| La combinaison | Le degré résultant |
|---|---|
| $f$ de degré $m$, $g$ de degré $n$ ⟹ **$f\cdot g$** | **$m+n$** |
| $f$ de degré $m$, $g$ de degré $n$ ⟹ **$k(\mathbf{x})=g\big(f(\mathbf{x}),f(\mathbf{x})\big)$** | **$m\cdot n$** *(exercice A2.9(e))* |
| $f$ de degré $k$ ⟹ **ses PARTIELLES** | **$k-1$** *(thm A2.6)* |

### Méthode 5 — Appliquer le théorème d'Euler

| Pas | L'action |
|---|---|
| **1** | **Établir le degré $k$** par la méthode 4 |
| **2** | **Calculer les $n$ partielles** $\partial f/\partial x_i$ |
| **3** | **Former $\sum_i(\partial f/\partial x_i)x_i$** |
| **4** | **Vérifier que la somme vaut $k\,f(\mathbf{x})$** |
| **5** | **Pour $k=1$, la somme vaut $f(\mathbf{x})$ LUI-MÊME** — c'est « l'additivité » |

## Les exercices du livre (§A2.6) — ceux qui portent sur §A2.1

> ⚠️ **Le livre NE FOURNIT PAS de corrigé.** Les énoncés sont **ceux de Jehle & Reny** *(exercices A2.1 à A2.10, plus A2.20 à A2.23)*. **Les pistes de résolution sont un ENRICHISSEMENT PÉDAGOGIQUE.**

<details class="details--riche">
<summary>

**A2.1 — dériver et classer en $x=2$**

</summary>

> *« **Dérivez les fonctions suivantes. Dites si la fonction est CROISSANTE, DÉCROISSANTE ou CONSTANTE au point $x=2$. Classez chacune comme localement CONCAVE, CONVEXE ou LINÉAIRE au point $x=2$.** »* **(a)** $11x^3-6x+8$ · **(b)** $(3x^2-x)(6x+1)$ · **(c)** $x^2-(1/x^3)$ · **(d)** $(x^2+2x)^3$ · **(e)** $\big[3x/(x^3+1)\big]^2$ · **(f)** $\big[(1/x^2+2)-(1/x-2)\big]^4$ · **(g)** $\displaystyle\int_{x}^{1}e^{t^2}\,dt$

> **Piste (hors cours) — le tableau complet.**
>
> |  | $f'(x)$ | $f'(2)$ | Sens | $f''(2)$ | Courbure |
> |---|---|---|---|---|---|
> | **(a)** | $33x^2-6$ | $\mathbf{126}$ | **croissante** | $66x\to\mathbf{132}$ | **CONVEXE** |
> | **(b)** | *(développer d'abord :* $18x^3-3x^2-x$*)* $54x^2-6x-1$ | $\mathbf{203}$ | **croissante** | $108x-6\to\mathbf{210}$ | **CONVEXE** |
> | **(c)** | $2x+3x^{-4}$ | $\mathbf{4{,}1875}$ | **croissante** | $2-12x^{-5}\to\mathbf{1{,}625}$ | **CONVEXE** |
> | **(d)** | $3(x^2+2x)^2(2x+2)$ | $3(64)(6)=\mathbf{1152}$ | **croissante** | $\mathbf{2112}$ | **CONVEXE** |
> | **(e)** | $2u\,u'$ avec $u=\tfrac{3x}{x^3+1}$ | $2\big(\tfrac23\big)\big(-\tfrac59\big)=\mathbf{-\tfrac{20}{27}}$ | **DÉCROISSANTE** | $\tfrac{114}{81}>0$ | **CONVEXE** |
> | **(f)** | $4u^3u'$ avec $u=x^{-2}-x^{-1}+4$ | $u'(2)=-\tfrac28+\tfrac14=\mathbf{0}$ | **CONSTANTE** | $4u^3u''=4\big(\tfrac{15}{4}\big)^3\big(\tfrac18\big)\approx\mathbf{26{,}4}$ | **CONVEXE** |
> | **(g)** | **$-e^{x^2}$** *(théorème fondamental — l'inconnue est la borne INFÉRIEURE, d'où le signe moins)* | $-e^{4}\approx\mathbf{-54{,}6}$ | **DÉCROISSANTE** | $-2xe^{x^2}\to-4e^{4}$ | **CONCAVE** |
>
> ⚠️ **Le cas (f) est le piège volontaire** : $u'(2)=0$ **exactement**, d'où la réponse **« constante »** que l'énoncé annonce comme possible. **Le cas (g) teste la règle de Leibniz** : puisque $x$ est **la borne du BAS**, $\ \frac{d}{dx}\int_x^1 h(t)\,dt=-h(x)$.

</details>

<details class="details--riche">
<summary>

**A2.2 — toutes les partielles premières**

</summary>

> *« **Trouvez toutes les dérivées partielles premières.** »*

> **Piste (hors cours).**
>
> |  | La fonction | $f_1$ | $f_2$ | $f_3$ |
> |---|---|---|---|---|
> | **(a)** | $2x_1-x_1^2-x_2^2$ | $2-2x_1$ | $-2x_2$ |  |
> | **(b)** | $x_1^2+2x_2^2-4x_2$ | $2x_1$ | $4x_2-4$ |  |
> | **(c)** | $x_1^3-x_2^2-2x_2$ | $3x_1^2$ | $-2x_2-2$ |  |
> | **(d)** | $4x_1+2x_2-x_1^2+x_1x_2-x_2^2$ | $4-2x_1+x_2$ | $2+x_1-2x_2$ |  |
> | **(e)** | $x_1^3-6x_1x_2+x_2^3$ | $3x_1^2-6x_2$ | $-6x_1+3x_2^2$ |  |
> | **(f)** | $3x_1^2-x_1x_2+x_2$ | $6x_1-x_2$ | $-x_1+1$ |  |
> | **(g)** | $\ln\big(x_1^2-x_2x_3-x_3^2\big)$ | $\dfrac{2x_1}{D}$ | $\dfrac{-x_3}{D}$ | $\dfrac{-x_2-2x_3}{D}$ |
>
> ⚠️ **Pour (g)**, $D\equiv x_1^2-x_2x_3-x_3^2$ — c'est **la règle de composition** appliquée à $\ln$.

</details>

<details class="details--riche">
<summary>

**A2.3 et A2.4 — deux identités à établir**

</summary>

**A2.3** *« Soit $g(x_a,x_b)=f(x_a+x_b,\ x_a-x_b)$, où $f$ est une fonction différentiable de deux variables, disons $f=f(x_u,x_v)$. **Montrez que** »*

$$\frac{\partial g}{\partial x_a}\cdot\frac{\partial g}{\partial x_b}=\left(\frac{\partial f}{\partial x_u}\right)^2-\left(\frac{\partial f}{\partial x_v}\right)^2$$

**A2.4** *« **Montrez que $y=x_1^2x_2+x_2^2x_3+x_3^2x_1$ satisfait l'équation** »*

$$\frac{\partial y}{\partial x_1}+\frac{\partial y}{\partial x_2}+\frac{\partial y}{\partial x_3}=(x_1+x_2+x_3)^2$$

> **Piste (hors cours).** **A2.3** — **la règle de composition avec $x_u=x_a+x_b$ et $x_v=x_a-x_b$** :
>
> $$\frac{\partial g}{\partial x_a}=f_u\cdot1+f_v\cdot1=f_u+f_v \qquad\qquad \frac{\partial g}{\partial x_b}=f_u\cdot1+f_v\cdot(-1)=f_u-f_v$$
>
> **Leur produit est L'IDENTITÉ REMARQUABLE** $(f_u+f_v)(f_u-f_v)=f_u^2-f_v^2$ **A2.4** — les trois partielles :
>
> $$\frac{\partial y}{\partial x_1}=2x_1x_2+x_3^2 \qquad \frac{\partial y}{\partial x_2}=x_1^2+2x_2x_3 \qquad \frac{\partial y}{\partial x_3}=x_2^2+2x_3x_1$$
>
> **Leur somme** $=x_1^2+x_2^2+x_3^2+2x_1x_2+2x_2x_3+2x_3x_1=(x_1+x_2+x_3)^2$

</details>

<details class="details--riche">
<summary>

**A2.5 et A2.6 — hessiennes et formes quadratiques**

</summary>

**A2.5** *« **Trouvez la matrice hessienne et construisez la forme quadratique $\mathbf{z}^{T}H(\mathbf{x})\mathbf{z}$** quand… »* **A2.6** *« **Prouvez que les dérivées partielles secondes PROPRES d'une fonction CONVEXE doivent toujours être NON NÉGATIVES.** »*

> **Piste (hors cours) — A2.5.**
>
> |  | $H(\mathbf{x})$ | $\mathbf{z}^{T}H\mathbf{z}$ | Le verdict |
> |---|---|---|---|
> | **(a)** $2x_1-x_1^2-x_2^2$ | $\begin{pmatrix}-2&0\\0&-2\end{pmatrix}$ | $-2z_1^2-2z_2^2$ | **DÉFINIE NÉGATIVE** ⟹ strictement concave |
> | **(b)** $x_1^2+2x_2^2-4x_2$ | $\begin{pmatrix}2&0\\0&4\end{pmatrix}$ | $2z_1^2+4z_2^2$ | **DÉFINIE POSITIVE** ⟹ strictement convexe |
> | **(c)** $x_1^3-x_2^2+2x_2$ | $\begin{pmatrix}6x_1&0\\0&-2\end{pmatrix}$ | $6x_1z_1^2-2z_2^2$ | **le signe DÉPEND de $x_1$** ⟹ ni concave ni convexe sur $\mathbb{R}^2$ |
> | **(d)** $4x_1+2x_2-x_1^2+x_1x_2-x_2^2$ | $\begin{pmatrix}-2&1\\1&-2\end{pmatrix}$ | $-2z_1^2+2z_1z_2-2z_2^2$ | $=-\big[(z_1-z_2)^2+z_1^2+z_2^2\big]$ ⟹ **DÉFINIE NÉGATIVE** |
> | **(e)** $x_1^3-6x_1x_2+x_2^3$ | $\begin{pmatrix}6x_1&-6\\-6&6x_2\end{pmatrix}$ | $6x_1z_1^2-12z_1z_2+6x_2z_2^2$ | **dépend de $\det=36(x_1x_2-1)$** |
>
> ⚠️ **Toutes ces hessiennes sont SYMÉTRIQUES — le théorème de YOUNG à l'œuvre.**
>
> **A2.6** — c'est **le théorème A2.5(2)**. La preuve *(indication de l'exercice A2.23)* : appliquer **le théorème A2.4(2) au cas convexe** avec $\mathbf{z}=\mathbf{e}_i$, ce qui donne $\ \mathbf{e}_i^{T}H\mathbf{e}_i=f_{ii}(\mathbf{x})\geq0$

</details>

<details class="details--riche">
<summary>

**A2.7 à A2.9 — homogénéité et Euler**

</summary>

**A2.7** *« **Complétez l'exemple A2.4 pour la partielle par rapport à $x_2$.** »* **A2.8** *« Supposons $f(x_1,x_2)=\sqrt{x_1^2+x_2^2}$. **(a)** Montrez qu'elle est **homogène de degré 1**. **(b)** Selon le théorème d'Euler, nous devrions avoir $f=(\partial f/\partial x_1)x_1+(\partial f/\partial x_2)x_2$. **Vérifiez-le.** »* **A2.9** *« Supposons $f(x_1,x_2)=(x_1x_2)^2$ et $g(x_1,x_2)=(x_1^2x_2)^3$. **(a)** Degré de $f$ ? **(b)** Degré de $g$ ? **(c)** Degré de $h=f\cdot g$ ? **(d)** Degré de $k(x_1,x_2)=g\big(f(x_1,x_2),f(x_1,x_2)\big)$ ? **(e)** Prouvez que si $f$ est homogène de degré $m$ et $g$ de degré $n$, alors $k$ est homogène de degré $mn$.** »*

> ⚠️ **Note de transcription pour A2.8.** Le PDF exporte l'énoncé comme *« $f(x_1,x_2)=x_1^2+x_2^2$ »*, **sans le RADICAL** — le même glyphe que le livre perd ailleurs *(le texte de §A1.4 imprime « real-v√alued » à la place de « $y=\sqrt{z^2+w^2}$ »)*. **Or $x_1^2+x_2^2$ est homogène de degré 2, pas 1**, alors que l'énoncé demande explicitement le degré 1 — la fonction visée est donc **$\sqrt{x_1^2+x_2^2}$**, qui est précisément **le deuxième exemple de fonction réelle donné par le livre en §A1.4**. *(Reconstruction de transcription, signalée comme telle.)*

> **Piste (hors cours).** **A2.7** : $\partial f/\partial x_2=\beta Ax_1^{\alpha}x_2^{\beta-1}$ ; en $(tx_1,tx_2)$ cela vaut $t^{\alpha+\beta-1}\beta Ax_1^{\alpha}x_2^{\beta-1}$, **égal à la partielle de départ puisque $\alpha+\beta=1$** **A2.8(a)** : $f(tx_1,tx_2)=\sqrt{t^2x_1^2+t^2x_2^2}=t\sqrt{x_1^2+x_2^2}=t\,f(x_1,x_2)$ **A2.8(b)** : $\ \dfrac{\partial f}{\partial x_i}=\dfrac{x_i}{\sqrt{x_1^2+x_2^2}}$, donc
>
> $$\frac{\partial f}{\partial x_1}x_1+\frac{\partial f}{\partial x_2}x_2=\frac{x_1^2+x_2^2}{\sqrt{x_1^2+x_2^2}}=\sqrt{x_1^2+x_2^2}=f(x_1,x_2) \quad$$
>
> **A2.9** :
>
> |  | Le calcul | Le degré |
> |---|---|---|
> | **(a)** | $f=x_1^2x_2^2$ | **4** |
> | **(b)** | $g=x_1^6x_2^3$ | **9** |
> | **(c)** | $h=f\cdot g$ | **13** *(les degrés s'ADDITIONNENT)* |
> | **(d)** | $k(t\mathbf{x})=g\big(t^4f,\ t^4f\big)=(t^4)^9\,k(\mathbf{x})$ | **36** $=4\times9$ |
>
> **(e) La preuve générale** : $\ k(t\mathbf{x})=g\big(f(t\mathbf{x}),f(t\mathbf{x})\big)=g\big(t^{m}f(\mathbf{x}),\,t^{m}f(\mathbf{x})\big)=\big(t^{m}\big)^{n}g\big(f(\mathbf{x}),f(\mathbf{x})\big)=t^{mn}k(\mathbf{x})$ **La règle** : **le PRODUIT additionne les degrés · la COMPOSITION les MULTIPLIE.**

</details>

<details class="details--riche">
<summary>

**A2.10 — les fonctions HOMOTHÉTIQUES**

</summary>

> *« Une fonction réelle $h$ sur $D\subset\mathbb{R}^n$ est dite **HOMOTHÉTIQUE si elle peut s'écrire sous la forme $g(f(\mathbf{x}))$, où $g:\mathbb{R}\to\mathbb{R}$ est STRICTEMENT CROISSANTE et $f:D\to\mathbb{R}$ est HOMOGÈNE DE DEGRÉ 1. Montrez que si la fonction différentiable $h$ est homothétique, alors pour tout $\mathbf{x}\in D$ et tous $i$ et $j$,*
>
> $$\frac{\partial h(t\mathbf{x})/\partial x_i}{\partial h(t\mathbf{x})/\partial x_j}$$
>
> *est CONSTANT en $t>0$. **QUE CELA DIT-IL DES ENSEMBLES DE NIVEAU de la fonction $h$ ?** »*

> **Piste (hors cours).**
>
> | Pas | L'argument |
> |---|---|
> | **1** | **Par la règle de composition** : $\ \dfrac{\partial h(t\mathbf{x})}{\partial x_i}=g'\big(f(t\mathbf{x})\big)\cdot\dfrac{\partial f(t\mathbf{x})}{\partial x_i}$ |
> | **2** | **$f$ homogène de degré 1** ⟹ **par le THÉORÈME A2.6**, ses partielles sont **homogènes de degré 0** : $\ \dfrac{\partial f(t\mathbf{x})}{\partial x_i}=\dfrac{\partial f(\mathbf{x})}{\partial x_i}$ |
> | **3** | ⟹ **dans le RAPPORT, le facteur $g'(f(t\mathbf{x}))$ SE SIMPLIFIE** : $$\frac{\partial h(t\mathbf{x})/\partial x_i}{\partial h(t\mathbf{x})/\partial x_j}=\frac{\partial f(\mathbf{x})/\partial x_i}{\partial f(\mathbf{x})/\partial x_j}$$ |
> | **4** | **Le membre de droite ne dépend PAS de $t$** |
>
> ⚠️ **La réponse à la question finale** : ce rapport est **le TAUX MARGINAL DE SUBSTITUTION**, c'est-à-dire **la PENTE de l'ensemble de niveau**. Qu'il soit constant en $t$ signifie que **le long de N'IMPORTE QUEL RAYON PARTANT DE L'ORIGINE, tous les ensembles de niveau ont LA MÊME PENTE.**
>
> $$\boxed{\;\textbf{Les ensembles de niveau d'une fonction HOMOTHÉTIQUE sont des}\\\textbf{DILATATIONS RADIALES les uns des autres.}\;}$$
>
> *(C'est exactement la propriété qui rend les demandes homothétiques linéaires en revenu — la « loi d'Engel » linéaire du chapitre 1.)*

</details>

<details class="details--riche">
<summary>

**A2.20 à A2.23 — compléter les preuves du cours**

</summary>

**A2.20** *« Montrez que **les réciproques de l'énoncé 4 des théorèmes A2.1 et A2.4 ne sont pas vraies**, en montrant que $f(x)=-x^4$ **est STRICTEMENT CONCAVE sur $\mathbb{R}$, mais que sa dérivée seconde n'est pas partout strictement [négative]**. »* **A2.21** *« **Complétez la preuve du théorème A2.3.** »* **A2.22** *« **Complétez la preuve du théorème A2.4.** »* **A2.23** *« **Utilisez la partie 2 du théorème A2.4 pour prouver le théorème A2.5. En particulier, considérez le produit $\mathbf{z}^{T}H(\mathbf{x})\mathbf{z}$ quand $\mathbf{z}$ est L'UN DES $n$ VECTEURS UNITAIRES de $\mathbb{R}^n$.** »*

> **Piste (hors cours).** **A2.20** : $f''(x)=-12x^2$ ⟹ **$f''(0)=0$**, donc $f''$ **n'est pas strictement négative partout** — bien que $-x^4$ **soit** strictement concave. *(Voir la note du concept 3 sur la coquille « positive » de l'énoncé imprimé.)* **A2.21** : il reste **le sens $g$ concave $\Rightarrow$ $f$ concave**, et **les deux cas STRICTS**. **Pour le sens manquant** : donnés $\mathbf{x}^1,\mathbf{x}^2\in D$, poser $\mathbf{x}=\mathbf{x}^2$ et $\mathbf{z}=\mathbf{x}^1-\mathbf{x}^2$ ; alors $g(t)=f(\mathbf{x}^2+t(\mathbf{x}^1-\mathbf{x}^2))$ satisfait $g(1)=f(\mathbf{x}^1)$, $g(0)=f(\mathbf{x}^2)$ et $g(t)=f(\mathbf{x}^t)$ — **la concavité de $g$ EST exactement celle de $f$ sur la corde**. **A2.22** : il reste **2 ⟹ 1 et 3 ⟹ 1**. Le montage est **identique** — on repart de (P.3) et (P.4) et on **remonte** par les théorèmes A2.1 puis A2.3. **A2.23** : voir l'enrichissement du concept 10 — **$\mathbf{e}_i^{T}H\mathbf{e}_i=f_{ii}(\mathbf{x})$**.

</details>

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que continu $=$ différentiable | *« la différentiabilité est une exigence **PLUS STRINGENTE** que la continuité »* | Fig. A2.1(a) : **continue mais pliée** |
| 2 | Oublier que $f'$ est **une fonction** | *« **LA DÉRIVÉE EST UNE FONCTION, ELLE AUSSI** »* | Sa valeur change avec $x$ |
| 3 | Confondre $C^n$ et « $n$ fois dérivable » | **$C^n$ exige des dérivées CONTINUES** | Définition du texte |
| 4 | Se tromper dans la règle du quotient | $\dfrac{g f'-f g'}{g^2}$ — **le numérateur commence par $g$** | Fig. A2.2 |
| 5 | Oublier $g'(x)$ dans la composition | $\big[f(g(x))\big]'=f'(g(x))\,g'(x)$ | Fig. A2.2 |
| 6 | Croire que $f''$ donne la pente | **$f''$ donne LE TAUX AUQUEL LA PENTE CHANGE** | C'est **la COURBURE** |
| 7 | Croire que la tangente est sous une concave | **Les tangentes d'une CONCAVE sont AU-DESSUS** | Thm A2.1(3) |
| 8 | Croire que « $f$ strictement concave » ⟹ $f''<0$ partout | **FAUX** — $-x^4$ | Exercice A2.20 |
| 9 | Oublier de renverser les inégalités pour le cas convexe | *« **remplacez « concave » par « convexe » ET RENVERSEZ LE SENS DE TOUTES LES INÉGALITÉS** »* |  |
| 10 | Croire qu'une partielle ne dépend que de $x_i$ | *« chaque partielle est une fonction **QUI DÉPEND DE TOUTES les variables** »* | Exemple A2.1 |
| 11 | Ne pas traiter les autres variables comme constantes | **C'est LA règle de calcul** | Déf. A2.1 |
| 12 | Oublier que la déf. A2.1 exige un point INTÉRIEUR | *« **si $\mathbf{x}$ est UN POINT INTÉRIEUR de $D$** »* | Sinon la limite n'est pas définie |
| 13 | Confondre dérivée directionnelle et partielle | **Les partielles sont les directionnelles dans les directions UNITAIRES** | *« des sortes PARTICULIÈRES »* |
| 14 | Écrire le gradient en colonne | *« **le VECTEUR LIGNE $\nabla f(\mathbf{x})$** »* — d'où $\nabla f(\mathbf{x})\mathbf{z}$ sans transposée | Convention du livre |
| 15 | Croire que $\nabla f$ est un vecteur fixe | *« **le gradient EST LUI-MÊME UNE FONCTION** »* | Il varie avec $\mathbf{x}$ |
| 16 | Se tromper d'ordre dans $f_{1i}$ | $f_{1i}=\partial^2f/\partial x_i\partial x_1$ | Mais **Young** rend l'ordre indifférent |
| 17 | Oublier que $H$ est symétrique | **YOUNG** *(thm A2.2)* | Cela DIVISE PAR DEUX les calculs |
| 18 | Appliquer Young sans hypothèse | Il exige $f$ **DEUX FOIS CONTINÛMENT différentiable** |  |
| 19 | Croire que la hessienne est une matrice constante | *« **les valeurs seront GÉNÉRALEMENT DIFFÉRENTES en chaque $\mathbf{x}$** »* | C'est une fonction |
| 20 | Confondre semi-définie et définie | **SEMI : $\leq0$ pour tout $\mathbf{z}$ · DÉFINIE : $<0$ pour tout $\mathbf{z}\neq\mathbf{0}$** |  |
| 21 | Oublier « $\mathbf{z}$ non nul » dans la définitude | **En $\mathbf{z}=\mathbf{0}$ la forme vaut 0** — la définition serait impossible |  |
| 22 | Confondre semi-définie positive et négative | $A$ semi-déf. **positive** ssi **$-A$** semi-déf. négative |  |
| 23 | Croire que le thm A2.3 exige de tester une seule droite | **Il faut TOUT $\mathbf{x}$ ET TOUT $\mathbf{z}$** |  |
| 24 | Oublier que $C$ est convexe dans la preuve A2.3 | Sans cela **$g$ n'est pas définie au point intermédiaire** |  |
| 25 | Se tromper de formule pour $g''$ | $g''(t)=\mathbf{z}^{T}H(\mathbf{x}+t\mathbf{z})\mathbf{z}$ **(P.4)** | Le pivot de la preuve A2.4 |
| 26 | Oublier d'évaluer en $t=0$ | *« notez que **$0\in C$** »* ⟹ $g''(0)\leq0$ |  |
| 27 | Rater le choix $\mathbf{z}=\mathbf{x}^0-\mathbf{x}$ | **C'est ce qui met $0$ ET $1$ dans $C$** | Preuve de 1 ⟹ 3 |
| 28 | Croire que $H$ définie négative est nécessaire | *« **la réciproque de ceci N'EST PAS VRAIE** »* | Sens unique |
| 29 | Conclure la concavité des seules $f_{ii}\leq0$ | **NÉCESSAIRE, PAS SUFFISANT** *(thm A2.5)* | Les **croisées** comptent |
| 30 | Tester l'homogénéité sur une seule variable | **Il faut multiplier TOUTES les variables par $t$** | Déf. A2.2 |
| 31 | Oublier « pour tout $t>0$ » | L'identité doit valoir **pour TOUT $t$ positif** |  |
| 32 | Croire homogène de degré 1 $=$ linéaire | **NON** — la Cobb-Douglas avec $\alpha+\beta=1$ est **homogène linéaire mais PAS linéaire** | Vocabulaire |
| 33 | Se tromper de degré pour la Cobb-Douglas | **$\alpha+\beta$** | Exemple A2.3 |
| 34 | Croire que les partielles gardent le degré $k$ | **Elles sont de degré $k-1$** *(thm A2.6)* |  |
| 35 | Oublier le $t$ de la règle de composition dans la preuve A2.6 | $\partial(tx_i)/\partial x_i=t$ | Le pas (P.2) |
| 36 | Écrire Euler sans le facteur $k$ | $k\,f(\mathbf{x})=\sum_i f_i(\mathbf{x})x_i$ | Le $k$ **ne disparaît que si $k=1$** |
| 37 | Évaluer (P.4) en $\mathbf{x}$ au lieu de $t\mathbf{x}$ | **La suffisance exige d'évaluer EN $t\mathbf{x}$** | Le pas (P.5) |
| 38 | Rater l'astuce de $t^{-k}g(t)$ | **Sa dérivée est nulle ⟹ elle est CONSTANTE** | Le cœur de la suffisance |
| 39 | Additionner les degrés dans une composition | **La composition MULTIPLIE** *(exercice A2.9(e))* | Le produit additionne |
| 40 | Confondre homogène et homothétique | **HOMOTHÉTIQUE $=$ $g(f)$ avec $g$ strictement croissante et $f$ homogène de degré 1** | Exercice A2.10 |

## 📌 Ultimate Review

**§A2.1.1 — UNE VARIABLE.**

**DIFFÉRENTIABLE** $=$ *« **continue ET LISSE, sans cassures ni plis** »* — *« une exigence **PLUS STRINGENTE** que la continuité »*.

$\dfrac{dy}{dx}=f'(x)$ · $\dfrac{d^2y}{dx^2}=f''(x)$ · **$C^n$** $=$ **dérivées $f',\dots,f^{(n)}$ CONTINUES**.

⚠️ **$f''$ donne « LE TAUX AUQUEL LA PENTE DE $f$ EST EN TRAIN DE CHANGER »** — c'est **la COURBURE**.

**THÉORÈME A2.1** — les trois énoncés **équivalents** :

$$\boxed{\;f \textbf{ CONCAVE} \iff f''(x)\leq0 \iff f(x)\leq f(x^0)+f'(x^0)(x-x^0)\;}$$

⚠️ **L'énoncé 3 dit que LES TANGENTES SONT AU-DESSUS DU GRAPHE.** **L'énoncé 4** : $f''<0$ **partout ⟹ strictement concave** — ***« la réciproque N'EST PAS vraie »*** *(le contre-exemple $-x^4$)*. **Pour le cas CONVEXE** : *« remplacez « concave » par « convexe » **et RENVERSEZ toutes les inégalités** »*.

**§A2.1.2 — PLUSIEURS VARIABLES.**

⚠️ *« Une fonction de $n$ variables peut être pensée comme ayant **$n$ PENTES PARTIELLES** »*.

**DÉF. A2.1** : $\ \dfrac{\partial f(\mathbf{x})}{\partial x_i}\equiv\lim_{h\to0}\dfrac{f(\dots,x_i+h,\dots)-f(\dots,x_i,\dots)}{h}$ — **$\mathbf{x}$ doit être INTÉRIEUR**.

⚠️ **La règle de calcul** : *« la dérivée ordinaire par rapport à $x_i$, **en traitant toutes les autres variables comme des CONSTANTES** »*.

**LA DÉRIVÉE DIRECTIONNELLE** : avec $g(t)=f(\mathbf{x}+t\mathbf{z})$,

$$g'(0)=\sum_{i=1}^{n}f_i(\mathbf{x})z_i=\nabla f(\mathbf{x})\,\mathbf{z} \tag{A2.3}$$

⚠️ **$\nabla f(\mathbf{x})\equiv(f_1(\mathbf{x}),\dots,f_n(\mathbf{x}))$ est UN VECTEUR LIGNE** — *« LE GRADIENT »*, *« **ANALOGUE À LA DÉRIVÉE** d'une fonction d'une variable »*, et **lui-même une fonction**.

⚠️ *« **TOUTES les dérivées PARTIELLES ne sont que des dérivées DIRECTIONNELLES d'un genre PARTICULIER** »* — celles dans les directions **unitaires**.

**LA HESSIENNE** $H(\mathbf{x})=\big(f_{ij}(\mathbf{x})\big)_{i,j}$ — *« **le GRADIENT DU GRADIENT** »*, **analogue à $f''$**, contenant $n\times n=n^2$ partielles secondes.

**THÉORÈME A2.2 (YOUNG)** : $\ \dfrac{\partial^2f}{\partial x_i\partial x_j}=\dfrac{\partial^2f}{\partial x_j\partial x_i}$ ⟹ **$H$ EST SYMÉTRIQUE**.

**THÉORÈME A2.3** : **$f$ concave $\iff$ $g(t)=f(\mathbf{x}+t\mathbf{z})$ concave POUR TOUT $\mathbf{x}$ ET TOUT $\mathbf{z}$** — *« **il suffit de vérifier SUR LES DROITES** »*.

**LA DÉFINITUDE** : $\ \mathbf{z}^{T}A\mathbf{z}\leq0$ **partout** $\Rightarrow$ **SEMI-DÉFINIE NÉGATIVE** · $<0$ **pour $\mathbf{z}\neq\mathbf{0}$** $\Rightarrow$ **DÉFINIE NÉGATIVE**.

⚠️ *« Pensez la semi-définitude négative comme **LA GÉNÉRALISATION AUX MATRICES DE LA NOTION DE NOMBRE NON POSITIF** »*.

**THÉORÈME A2.4** — les trois énoncés **équivalents** :

$$\boxed{\;f \textbf{ CONCAVE} \iff H(\mathbf{x}) \textbf{ SEMI-DÉFINIE NÉGATIVE} \iff f(\mathbf{x})\leq f(\mathbf{x}^0)+\nabla f(\mathbf{x}^0)(\mathbf{x}-\mathbf{x}^0)\;}$$

*Les deux formules de la preuve* : $\ g'(t)=\nabla f(\mathbf{x}+t\mathbf{z})\mathbf{z}$ **(P.3)** et $\ g''(t)=\mathbf{z}^{T}H(\mathbf{x}+t\mathbf{z})\mathbf{z}$ **(P.4)**.

**THÉORÈME A2.5** : $f$ concave $\Rightarrow$ $f_{ii}\leq0$ — **NÉCESSAIRE, PAS SUFFISANT**.

**§A2.1.3 — HOMOGÉNÉITÉ.**

**DÉF. A2.2** : $\ f(t\mathbf{x})\equiv t^{k}f(\mathbf{x})$ pour **tout $t>0$**.

| $k$ | Ce que cela signifie |
|---|---|
| **1** | *« **doubler ou tripler toutes les variables DOUBLE ou TRIPLE la valeur** »* |
| **0** | *« **les changements ÉQUIPROPORTIONNELS LAISSENT LA VALEUR INCHANGÉE** »* |

**COBB-DOUGLAS** $A x_1^{\alpha}x_2^{\beta}$ : **homogène de degré $\alpha+\beta$** ; **homogène LINÉAIRE si $\alpha+\beta=1$**.

**THÉORÈME A2.6** : **les partielles d'une fonction homogène de degré $k$ sont homogènes de degré $k-1$** ⟹ pour $k=1$, *« augmenter toutes les variables **laisse les partielles INCHANGÉES** »*.

**THÉORÈME A2.7 (EULER, « l'ADDITIVITÉ »)** :

$$\boxed{\;f \textbf{ homogène de degré } k \iff k\,f(\mathbf{x})=\sum_{i=1}^{n}\frac{\partial f(\mathbf{x})}{\partial x_i}x_i \qquad\qquad k=1:\ f(\mathbf{x})=\sum_i f_i(\mathbf{x})\,x_i\;}$$

*Les ressorts de la preuve* : poser $g(t)\equiv f(t\mathbf{x})$ ⟹ $g'(1)=\sum_i f_i(\mathbf{x})x_i$ **(P.3)** · **nécessité** : $g'(t)=kt^{k-1}f(\mathbf{x})$ ⟹ $g'(1)=kf(\mathbf{x})$ · **suffisance** : évaluer en $t\mathbf{x}$, obtenir $tg'(t)=kg(t)$ **(P.6)**, puis constater que **$\dfrac{d}{dt}\big[t^{-k}g(t)\big]=0$ ⟹ $t^{-k}g(t)$ est CONSTANTE**.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Définir la différentiabilité et la comparer à la continuité.**

</summary>

> *« **Une fonction $y=f(x)$ est DIFFÉRENTIABLE si elle est À LA FOIS CONTINUE ET « LISSE », SANS CASSURES NI PLIS.** »*

> ⚠️ *« **La différentiabilité est donc une exigence PLUS STRINGENTE que la continuité. C'est aussi une exigence que NOUS IMPOSONS SOUVENT parce qu'elle nous permet d'utiliser les outils familiers du calcul.** »*

*(Fig. A2.1(a) : **non différentiable en $x^0$** ; (b) : **partout différentiable**.)*

</details>

<details class="details--riche">
<summary>

**2. Rappeler ce qu'est la dérivée et ce qu'est une fonction $C^n$.**

</summary>

> *« **LA DÉRIVÉE EST UNE FONCTION, ELLE AUSSI**, donnant, en chaque valeur de $x$, **LA PENTE ou LE TAUX DE VARIATION INSTANTANÉ** »*.

$$\frac{dy}{dx}=f'(x) \qquad\qquad \frac{d^2y}{dx^2}=f''(x)$$

⚠️ *« Si une fonction possède **des dérivées CONTINUES $f',f'',\dots,f^{(n)}$**, elle est appelée **$n$-fois continûment différentiable, ou UNE FONCTION $C^n$** »*.

</details>

<details class="details--riche">
<summary>

**3. Réciter les six règles de dérivation (fig. A2.2).**

</summary>

|  |  |
|---|---|
| **Constantes** | $\dfrac{d}{dx}(\alpha)=0$ |
| **Sommes** | $f'(x)\pm g'(x)$ |
| **Puissances** | $\dfrac{d}{dx}(\alpha x^n)=n\alpha x^{n-1}$ |
| **Produit** | $f(x)g'(x)+f'(x)g(x)$ |
| **Quotient** | $\dfrac{g(x)f'(x)-f(x)g'(x)}{[g(x)]^2}$ |
| **Composition** | $f'(g(x))\,g'(x)$ |

</details>

<details class="details--riche">
<summary>

**4. Que mesure la dérivée seconde ?**

</summary>

> *« **$f''(x)$ donne LE TAUX AUQUEL LA PENTE DE $f$ EST EN TRAIN DE CHANGER. Par conséquent, LA DÉRIVÉE SECONDE EST LIÉE À LA COURBURE de la fonction.** »*

**Sur la fig. A2.3** *(fonction concave)* : *« le fait qu'elle soit **« COURBÉE VERS LE BAS » est capturé par le fait que LA PENTE DÉCROÎT quand $x$ augmente**, c'est-à-dire par le fait que **sa dérivée seconde est NON POSITIVE** »* — $f'(x^0)>f'(x^1)$.

</details>

<details class="details--riche">
<summary>

**5. Établir l'inégalité de la tangente.**

</summary>

La tangente en $x^0$ est $\ l_0(x)=f'(x^0)(x-x^0)+f(x^0)$.

> *« **Les deux droites tangentes se trouvent ENTIÈREMENT AU-DESSUS de la fonction $f$.** […] Dire que la droite $l_0$ se trouve au-dessus de $f$, **c'est juste dire que $l_0(x)\geq f(x)$ pour tout $x$** »* ⟹

$$f(x)\leq f(x^0)+f'(x^0)(x-x^0)$$

⚠️ **Cette inégalité DÉCOULE de la concavité — et lui est même ÉQUIVALENTE** *(thm A2.1(3))*.

</details>

<details class="details--riche">
<summary>

**6. Énoncer le théorème A2.1.**

</summary>

Sur un **intervalle NON DÉGÉNÉRÉ** $D$, avec $f$ **deux fois continûment différentiable**, les énoncés **1 à 3 sont ÉQUIVALENTS** :

**1.** $f$ **concave** · **2.** $f''(x)\leq0$ **pour tout $x$ non-extrémité** · **3.** $f(x)\leq f(x^0)+f'(x^0)(x-x^0)$.

**De plus, 4.** **$f''(x)<0$ partout ⟹ $f$ STRICTEMENT concave.**

⚠️ **Le livre l'énonce SANS PREUVE.**

</details>

<details class="details--riche">
<summary>

**7. Comment obtenir le cas convexe, et quelle est la limite de l'énoncé 4 ?**

</summary>

> *« **Remplacez simplement le mot « CONCAVE » par « CONVEXE », ET RENVERSEZ LE SENS DE TOUTES LES INÉGALITÉS.** »*

> ⚠️ *« On pourrait penser que **la réciproque de l'énoncé 4 est vraie** […] **Il vous est demandé, à l'exercice A2.20, de montrer QUE CE N'EST PAS LE CAS.** »*

**Le contre-exemple** : $f(x)=-x^4$ est **strictement concave**, **mais $f''(0)=0$**.

</details>

<details class="details--riche">
<summary>

**8. Pourquoi $n$ pentes plutôt qu'une ?**

</summary>

> *« Avec des fonctions réelles de $n$ variables, **$y$ dépend de la valeur de TOUTES les $n$ variables. Il est donc PLUS DIFFICILE de penser la pente AU SINGULIER.** »*

> *« **Plutôt que d'avoir UNE SEULE pente, une fonction de $n$ variables peut être pensée comme ayant $n$ PENTES PARTIELLES, chacune ne donnant que le taux auquel $y$ varierait SI UN SEUL $x_i$ VARIAIT.** »*

</details>

<details class="details--riche">
<summary>

**9. Énoncer la définition A2.1 et la règle de calcul.**

</summary>

$$\frac{\partial f(\mathbf{x})}{\partial x_i}\equiv\lim_{h\to0}\frac{f(x_1,\dots,x_i+h,\dots,x_n)-f(x_1,\dots,x_i,\dots,x_n)}{h}$$

⚠️ **$\mathbf{x}$ doit être UN POINT INTÉRIEUR de $D$.** Notations : $\partial y/\partial x_i$ ou $f_i(\mathbf{x})$.

> *« Pour calculer la partielle par rapport à $x_i$, **on prend simplement LA DÉRIVÉE ORDINAIRE par rapport à $x_i$, EN TRAITANT TOUTES LES AUTRES VARIABLES $x_j$, $j\neq i$, COMME DES CONSTANTES.** »*

</details>

<details class="details--riche">
<summary>

**10. Les trois remarques du livre sur les partielles.**

</summary>

**1.** *« **il y en a $n$, une pour chaque variable** »* **2.** *« **CHAQUE DÉRIVÉE PARTIELLE EST ELLE-MÊME UNE FONCTION […] QUI DÉPEND DE LA VALEUR PRISE PAR TOUTES les variables** »* **3.** *« elle mesure comment la valeur change quand **UN $x_i$ change, LAISSANT LES $(n-1)$ AUTRES INCHANGÉES** »*

**Exemple A2.1** : $f=x_1^2+3x_1x_2-x_2^2$ ⟹ $f_1=2x_1+3x_2$, $f_2=3x_1-2x_2$ ; en $(1,2)$ : **$8$ et $-1$** ; en $(2,1)$ : **$7$ et $4$**.

</details>

<details class="details--riche">
<summary>

**11. Construire la dérivée directionnelle.**

</summary>

**Poser** $g(t)=f(\mathbf{x}+t\mathbf{z})$.

> *« $g(t)$ prend la valeur $f(\mathbf{x})$ **quand $t=0$**, et quand $t$ augmente, **$\mathbf{x}+t\mathbf{z}$ SE DÉPLACE DANS LA DIRECTION $\mathbf{z}$** […] **nous nous intéressons à savoir si $g'(0)$ est positif, négatif ou nul.** »*

**Le raisonnement heuristique** : la $i$-ème coordonnée **augmente au taux $z_i$**, $f$ change au taux $f_i(\mathbf{x})$ par unité de cette coordonnée ⟹ **la contribution est $f_i(\mathbf{x})z_i$** ⟹ **le total est LA SOMME** :

$$g'(0)=\sum_{i=1}^{n}f_i(\mathbf{x})z_i$$

*(Note 1 : « **à strictement parler, $f$ doit être CONTINÛMENT DIFFÉRENTIABLE** ».)*

</details>

<details class="details--riche">
<summary>

**12. Définir le gradient et donner les deux lectures de (A2.3).**

</summary>

$$\nabla f(\mathbf{x})\equiv\big(f_1(\mathbf{x}),\dots,f_n(\mathbf{x})\big) \qquad\textbf{— UN VECTEUR LIGNE} \qquad\qquad g'(0)=\nabla f(\mathbf{x})\,\mathbf{z}$$

| # | La lecture |
|---|---|
| **1** | *« **TOUTES les dérivées PARTIELLES ne sont que des sortes PARTICULIÈRES de dérivées DIRECTIONNELLES** »* — dans les directions $(0,\dots,1,\dots,0)$ |
| **2** | *« **LE TAUX AUQUEL $f$ CHANGE DANS N'IMPORTE QUELLE DIRECTION EST DÉTERMINÉ PAR LE GRADIENT** »* |

⚠️ *« Il est utile de penser le gradient **comme ANALOGUE À LA DÉRIVÉE** d'une fonction d'une variable. […] **Le gradient EST LUI-MÊME UNE FONCTION.** »*

</details>

<details class="details--riche">
<summary>

**13. Construire la matrice hessienne.**

</summary>

Chaque $f_i(\mathbf{x})$ **a elle-même $n$ partielles** $f_{ij}(\mathbf{x})$, rangées en $\nabla f_i(\mathbf{x})$. En **empilant les $n$ gradients** :

$$H(\mathbf{x})=\begin{pmatrix} f_{11} & f_{12} & \cdots & f_{1n}\\ f_{21} & f_{22} & \cdots & f_{2n}\\ \vdots & \vdots & \ddots & \vdots\\ f_{n1} & f_{n2} & \cdots & f_{nn} \end{pmatrix}$$

> ⚠️ *« Nous prenons **LE « GRADIENT DU GRADIENT » ** […] nous pouvons penser $H(\mathbf{x})$ comme **ANALOGUE À LA DÉRIVÉE SECONDE** »*.

⚠️ **Elle est elle-même une fonction** : $n\times n=n^2$ entrées, *« généralement différentes en chaque $\mathbf{x}$ »*.

</details>

<details class="details--riche">
<summary>

**14. Énoncer et illustrer le théorème A2.2.**

</summary>

> **YOUNG** : pour toute $f$ **deux fois continûment différentiable**,
>
> $$\frac{\partial^2f(\mathbf{x})}{\partial x_i\,\partial x_j}=\frac{\partial^2f(\mathbf{x})}{\partial x_j\,\partial x_i}\qquad\forall\,i,j$$

⚠️ *« **L'ORDRE DANS LEQUEL LES PARTIELLES SONT DIFFÉRENTIÉES NE FAIT AUCUNE DIFFÉRENCE.** »* ⟹ **$H$ EST SYMÉTRIQUE**.

**Exemple A2.2** : $f=x_1x_2^2+x_1x_2$ ⟹ $f_1=x_2^2+x_2$, $f_2=2x_1x_2+x_1$ ⟹ **$f_{12}=f_{21}=2x_2+1$**

</details>

<details class="details--riche">
<summary>

**15. Énoncer et démontrer le théorème A2.3.**

</summary>

**$f$ (strictement) concave $\iff$ $g(t)=f(\mathbf{x}+t\mathbf{z})$ est (strictement) concave, POUR TOUT $\mathbf{x}\in D$ et TOUT $\mathbf{z}\neq\mathbf{0}$.**

**La preuve du sens ⟹** repose sur **UNE SEULE identité algébrique** :

$$\mathbf{x}+\big(\alpha t_0+(1-\alpha)t_1\big)\mathbf{z}=\alpha\big(\mathbf{x}+t_0\mathbf{z}\big)+(1-\alpha)\big(\mathbf{x}+t_1\mathbf{z}\big)$$

⟹ **la concavité de $f$ donne directement (P.1)**. *(Notez aussi que **$C$ est CONVEXE**, donc $g$ y est définie.)*

**La portée** : *« **pour vérifier qu'une fonction MULTIVARIÉE est concave, IL SUFFIT DE VÉRIFIER […] SUR LA DROITE passant par $\mathbf{x}$ dans la direction $\mathbf{z}$** »*.

</details>

<details class="details--riche">
<summary>

**16. Définir semi-définie et définie négative, et l'analogie du livre.**

</summary>

$A$ ($n\times n$) est **SEMI-DÉFINIE NÉGATIVE** si $\ \mathbf{z}^{T}A\mathbf{z}\leq0$ **pour tous les $\mathbf{z}$** ; **DÉFINIE NÉGATIVE** si **l'inégalité est STRICTE pour tout $\mathbf{z}$ NON NUL**. $A$ est **(semi-)définie POSITIVE** si **$-A$** est (semi-)définie négative.

$$\mathbf{z}^{T}A\mathbf{z}=\sum_{i=1}^{n}\sum_{j=1}^{n}z_i\,a_{ij}\,z_j$$

> ⚠️ *« **Pensez la semi-définitude négative comme LA GÉNÉRALISATION AUX MATRICES de la notion de NOMBRE NON POSITIF. Une matrice $1\times1$ (c'est-à-dire un NOMBRE) est semi-définie négative SSI son unique entrée est non positive.** »*

</details>

<details class="details--riche">
<summary>

**17. Énoncer le théorème A2.4.**

</summary>

Sur $D$ **convexe d'intérieur non vide**, $f$ **deux fois continûment différentiable**, les énoncés **1 à 3 sont équivalents** :

**1.** $f$ **concave** · **2.** **$H(\mathbf{x})$ SEMI-DÉFINIE NÉGATIVE sur $\operatorname{int}D$** · **3.** $f(\mathbf{x})\leq f(\mathbf{x}^0)+\nabla f(\mathbf{x}^0)(\mathbf{x}-\mathbf{x}^0)$.

**4.** **$H$ DÉFINIE NÉGATIVE ⟹ $f$ STRICTEMENT concave** *(sens unique)*.

⚠️ **C'est le théorème A2.1 avec $f''\to H$ et $f'\to\nabla f$.**

</details>

<details class="details--riche">
<summary>

**18. Les deux formules clés de la preuve du théorème A2.4.**

</summary>

Avec $g(t)=f(\mathbf{x}+t\mathbf{z})$ :

$$g'(t)=\nabla f(\mathbf{x}+t\mathbf{z})\,\mathbf{z} \tag{P.3}$$

$$g''(t)=\sum_i\sum_j z_i f_{ij}(\mathbf{x}+t\mathbf{z})z_j=\mathbf{z}^{T}H(\mathbf{x}+t\mathbf{z})\,\mathbf{z} \tag{P.4}$$

⚠️ **Comment obtenir (P.4)** : *« **écrire d'abord $g'(t)=\sum_i f_i(\mathbf{x}+t\mathbf{z})z_i$, puis différentier la somme TERME À TERME** »* — chaque terme donnant la **dérivée directionnelle de $f_i$**.

</details>

<details class="details--riche">
<summary>

**19. Démontrer 1 ⟹ 2 et 1 ⟹ 3 (théorème A2.4).**

</summary>

**1 ⟹ 2** : $f$ concave ⟹ *(thm A2.3)* $g$ concave ⟹ *(thm A2.1)* $g''(t)\leq0$ **(P.1)**. **Comme $0\in C$**, $g''(0)\leq0$, ce qui par **(P.4)** donne $\mathbf{z}^{T}H(\mathbf{x})\mathbf{z}\leq0$. *« **Mais parce que $\mathbf{z}$ et $\mathbf{x}$ étaient ARBITRAIRES** »* ⟹ semi-définitude négative partout.

**1 ⟹ 3** : **choisir $\mathbf{z}=\mathbf{x}^0-\mathbf{x}$**, de sorte que **$0$ ET $1$ soient dans $C$**. (P.2) avec $t=0$, $t_0=1$ donne $g(0)\leq g(1)-g'(1)$, c'est-à-dire

$$f(\mathbf{x})\leq f(\mathbf{x}^0)+\nabla f(\mathbf{x}^0)(\mathbf{x}-\mathbf{x}^0) \quad$$

*(2 ⟹ 1 et 3 ⟹ 1 sont laissés en exercice A2.22.)*

</details>

<details class="details--riche">
<summary>

**20. Résumer le lien hessienne / courbure.**

</summary>

| $f$ est… | $H(\mathbf{x})$ est… |
|---|---|
| **CONCAVE** | **SEMI-DÉFINIE NÉGATIVE** partout |
| **CONVEXE** | **SEMI-DÉFINIE POSITIVE** partout |
| **STRICTEMENT concave** | $\Longleftarrow$ **DÉFINIE NÉGATIVE** |
| **STRICTEMENT convexe** | $\Longleftarrow$ **DÉFINIE POSITIVE** |

⚠️ *« **bien que LA RÉCIPROQUE DE CECI NE SOIT PAS VRAIE** »*.

*(Le livre REPORTE les tests pratiques sur $H$ — *« les règles et réglementations dans ce domaine sont **NOTOIREMENT COMPLIQUÉES** »* — jusqu'aux problèmes d'optimisation.)*

</details>

<details class="details--riche">
<summary>

**21. Énoncer le théorème A2.5 et sa portée exacte.**

</summary>

**1.** $f$ **concave** ⟹ $f_{ii}(\mathbf{x})\leq0$ · **2.** $f$ **convexe** ⟹ $f_{ii}(\mathbf{x})\geq0$, sur $\operatorname{int}D$.

⚠️ *« Dans le cas multivarié, nous pouvons noter une condition **NÉCESSAIRE, MAIS PAS SUFFISANTE**, en termes des signes de toutes les dérivées partielles secondes « PROPRES ». »*

**La preuve** *(exercice A2.23)* : prendre $\mathbf{z}=\mathbf{e}_i$ dans le théorème A2.4(2) ⟹ **$\mathbf{e}_i^{T}H\mathbf{e}_i=f_{ii}(\mathbf{x})\leq0$**

</details>

<details class="details--riche">
<summary>

**22. Énoncer la définition A2.2 et ses deux cas particuliers.**

</summary>

$$f(t\mathbf{x})\equiv t^{k}f(\mathbf{x})\qquad\textbf{pour tout } t>0$$

| Le cas | Le nom | La lecture |
|---|---|---|
| $k=1$ | **HOMOGÈNE LINÉAIRE** | *« **doubler ou tripler toutes les variables DOUBLE ou TRIPLE la valeur** »* |
| $k=0$ | **homogène de degré zéro** | *« **les changements ÉQUIPROPORTIONNELS LAISSENT LA VALEUR INCHANGÉE** »* |

> *« Les fonctions homogènes affichent **UN COMPORTEMENT TRÈS RÉGULIER quand toutes les variables sont augmentées SIMULTANÉMENT ET DANS LA MÊME PROPORTION** »*.

</details>

<details class="details--riche">
<summary>

**23. Traiter l'exemple A2.3 (Cobb-Douglas).**

</summary>

$$f(x_1,x_2)\equiv Ax_1^{\alpha}x_2^{\beta},\quad A>0,\ \alpha>0,\ \beta>0$$

> *« Nous pouvons vérifier **en multipliant toutes les variables par le même facteur $t$** »* :

$$f(tx_1,tx_2)\equiv A(tx_1)^{\alpha}(tx_2)^{\beta}\equiv t^{\alpha}t^{\beta}Ax_1^{\alpha}x_2^{\beta}=t^{\alpha+\beta}f(x_1,x_2)$$

⚠️ **Homogène de degré $\alpha+\beta$** ; **homogène LINÉAIRE si $\alpha+\beta=1$**.

</details>

<details class="details--riche">
<summary>

**24. Énoncer et démontrer le théorème A2.6.**

</summary>

**$f$ homogène de degré $k$ ⟹ ses partielles sont homogènes de degré $k-1$.**

**La preuve** : de l'identité $f(t\mathbf{x})\equiv t^{k}f(\mathbf{x})$ **(P.1)**, différentier les deux membres par rapport à $x_i$ :

$$\underbrace{\frac{\partial f(t\mathbf{x})}{\partial x_i}\cdot t}_{\text{(P.2), par la règle de composition}}=\underbrace{t^{k}\frac{\partial f(\mathbf{x})}{\partial x_i}}_{\text{(P.3)}} \qquad\xrightarrow{\ \div\,t\ }\qquad \frac{\partial f(t\mathbf{x})}{\partial x_i}=t^{k-1}\frac{\partial f(\mathbf{x})}{\partial x_i}$$

⚠️ **C'est le mot « IDENTITÉ » qui autorise à différentier les deux membres**, et $\partial(tx_i)/\partial x_i=t$ qui fournit le facteur $t$.

</details>

<details class="details--riche">
<summary>

**25. Le cas $k=1$ du théorème A2.6, et l'exemple A2.4.**

</summary>

$$\frac{\partial f(t\mathbf{x})}{\partial x_i}=\frac{\partial f(\mathbf{x})}{\partial x_i}\qquad\forall\,t>0$$

> ⚠️ *« **augmenter (ou diminuer) TOUTES les variables DANS LA MÊME PROPORTION LAISSE LES $n$ DÉRIVÉES PARTIELLES INCHANGÉES** »*.

**Exemple A2.4** *(Cobb-Douglas avec $\alpha+\beta=1$)* :

$$\frac{\partial f(tx_1,tx_2)}{\partial x_1}=\alpha A(tx_1)^{\alpha-1}(tx_2)^{\beta}=t^{\alpha+\beta-1}\alpha Ax_1^{\alpha-1}x_2^{\beta}=\frac{\partial f(x_1,x_2)}{\partial x_1}$$

⚠️ *« **parce que $\alpha+\beta=1$ et $t^{\alpha+\beta-1}=t^{0}=1$** »*

</details>

<details class="details--riche">
<summary>

**26. Énoncer le théorème A2.7 d'Euler.**

</summary>

> *« **LE THÉORÈME D'EULER — parfois appelé LE THÉORÈME D'ADDITIVITÉ — nous donne une manière intéressante de CARACTÉRISER COMPLÈTEMENT les fonctions homogènes. Il dit qu'une fonction est homogène SSI elle peut toujours être écrite EN TERMES DE SES PROPRES DÉRIVÉES PARTIELLES ET DU DEGRÉ D'HOMOGÉNÉITÉ.** »*

$$f \textbf{ homogène de degré } k \iff k\,f(\mathbf{x})=\sum_{i=1}^{n}\frac{\partial f(\mathbf{x})}{\partial x_i}\,x_i \quad\textbf{pour tout } \mathbf{x}$$

</details>

<details class="details--riche">
<summary>

**27. Démontrer la NÉCESSITÉ d'Euler.**

</summary>

**Le montage** : $g(t)\equiv f(t\mathbf{x})$ **(P.1)**, d'où par la règle de composition *(note 3 : « **$t$ MULTIPLIE LES $n$ VARIABLES, donc son effet entre SÉPARÉMENT PAR CHACUNE** »)* :

$$g'(t)=\sum_i\frac{\partial f(t\mathbf{x})}{\partial x_i}x_i \quad \text{(P.2)} \qquad\qquad g'(1)=\sum_i\frac{\partial f(\mathbf{x})}{\partial x_i}x_i \quad \text{(P.3)}$$

**La nécessité** : si $f$ est homogène, $g(t)=t^{k}f(\mathbf{x})$ ⟹ **$g'(t)=kt^{k-1}f(\mathbf{x})$** ⟹ $g'(1)=kf(\mathbf{x})$. **En comparant à (P.3)** :

$$k\,f(\mathbf{x})=\sum_i\frac{\partial f(\mathbf{x})}{\partial x_i}x_i \tag{P.4}$$

</details>

<details class="details--riche">
<summary>

**28. Démontrer la SUFFISANCE d'Euler — l'astuce de $t^{-k}g(t)$.**

</summary>

| Pas | L'argument |
|---|---|
| **1** | **Évaluer (P.4) EN $t\mathbf{x}$** : $\ kf(t\mathbf{x})=\sum_i\dfrac{\partial f(t\mathbf{x})}{\partial x_i}\,t\,x_i$ **(P.5)** |
| **2** | *« **multiplier (P.2) par $t$, comparer à (P.5)** »* ⟹ $tg'(t)=kf(t\mathbf{x})$, puis **(P.1)** ⟹ $\ t\,g'(t)=k\,g(t)$ **(P.6)** |
| **3** | **Considérer $t^{-k}g(t)$** : $\ \dfrac{d}{dt}\big[t^{-k}g(t)\big]=t^{-k-1}\big[tg'(t)-kg(t)\big]$ |
| **4** | *« **Au vu de (P.6), cette dérivée doit être NULLE** »* ⟹ $t^{-k}g(t)=c$ **CONSTANTE** ⟹ $g(t)=t^{k}c$ |
| **5** | **En $t=1$** : $g(1)=c$, et **(P.1)** donne $c=f(\mathbf{x})$ ⟹ $g(t)=t^{k}f(\mathbf{x})$ ⟹ **$f(t\mathbf{x})=t^{k}f(\mathbf{x})$** |

$\blacksquare$

</details>

<details class="details--riche">
<summary>

**29. Le cas $k=1$ d'Euler et l'exemple A2.5.**

</summary>

$$f(\mathbf{x})=\sum_{i=1}^{n}\frac{\partial f(\mathbf{x})}{\partial x_i}\,x_i$$

**Exemple A2.5** *(Cobb-Douglas, $\alpha+\beta=1$)* : *« **multiplier la première partielle par $x_1$, la seconde par $x_2$, additionner, et utiliser $\alpha+\beta=1$** »* :

$$\alpha Ax_1^{\alpha}x_2^{\beta}+\beta Ax_1^{\alpha}x_2^{\beta}=(\alpha+\beta)Ax_1^{\alpha}x_2^{\beta}=f(x_1,x_2) \quad$$

⚠️ **C'est le « théorème d'ADDITIVITÉ »** : la valeur totale se répartit exactement entre les $n$ facteurs.

</details>

<details class="details--riche">
<summary>

**30. Qu'est-ce qu'une fonction HOMOTHÉTIQUE, et que dit-on de ses niveaux ?**

</summary>

*(Exercice A2.10.)* $h$ est **homothétique** si $h=g(f(\mathbf{x}))$ avec **$g$ STRICTEMENT CROISSANTE** et **$f$ HOMOGÈNE DE DEGRÉ 1**.

**Le résultat** : par le **théorème A2.6**, les partielles de $f$ sont **de degré 0**, donc le facteur $g'$ **se simplifie dans le rapport** :

$$\frac{\partial h(t\mathbf{x})/\partial x_i}{\partial h(t\mathbf{x})/\partial x_j}=\frac{\partial f(\mathbf{x})/\partial x_i}{\partial f(\mathbf{x})/\partial x_j} \qquad\textbf{— CONSTANT en } t$$

⚠️ **La conclusion sur les ensembles de niveau** : **le long de tout rayon issu de l'origine, la PENTE des niveaux est la MÊME** — les ensembles de niveau sont **des DILATATIONS RADIALES les uns des autres**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Ce qu'est « différentiable » ? | *« **continue ET LISSE, sans cassures ni plis** »* |
| Différentiabilité vs continuité ? | *« **PLUS STRINGENTE** »* |
| La dérivée est-elle un nombre ? | **NON — c'est UNE FONCTION** |
| $C^n$ ? | Dérivées $f',\dots,f^{(n)}$ **CONTINUES** |
| Règle du produit ? | $fg'+f'g$ |
| Règle du quotient ? | $\dfrac{gf'-fg'}{g^2}$ |
| Règle de composition ? | $f'(g(x))\,g'(x)$ |
| Ce que mesure $f''$ ? | **Le TAUX AUQUEL LA PENTE CHANGE** — la COURBURE |
| Équation de la tangente en $x^0$ ? | $l_0(x)=f'(x^0)(x-x^0)+f(x^0)$ |
| Où sont les tangentes d'une concave ? | **AU-DESSUS du graphe** |
| Théorème A2.1, énoncé 2 ? | $f''(x)\leq0$ |
| Théorème A2.1, énoncé 3 ? | $f(x)\leq f(x^0)+f'(x^0)(x-x^0)$ |
| Théorème A2.1, énoncé 4 ? | $f''<0$ **⟹ STRICTEMENT concave** |
| Sa réciproque ? | **FAUSSE** — le contre-exemple $-x^4$ |
| Comment obtenir le cas convexe ? | **RENVERSER TOUTES les inégalités** |
| Pourquoi $n$ pentes ? | *« il est **PLUS DIFFICILE** de penser la pente **AU SINGULIER** »* |
| Définition A2.1 ? | La limite du taux d'accroissement **en $x_i$ seul** |
| L'hypothèse cachée de la déf. A2.1 ? | **$\mathbf{x}$ doit être INTÉRIEUR** |
| La règle de calcul ? | **Traiter les autres variables comme CONSTANTES** |
| Une partielle dépend-elle de toutes les variables ? | **OUI** |
| Notations alternatives ? | $\partial y/\partial x_i$ ou $f_i(\mathbf{x})$ |
| La fonction auxiliaire de la dérivée directionnelle ? | $g(t)=f(\mathbf{x}+t\mathbf{z})$ |
| Sa dérivée en 0 ? | $g'(0)=\sum_i f_i(\mathbf{x})z_i$ |
| Le gradient ? | $\nabla f(\mathbf{x})=(f_1,\dots,f_n)$ — **UN VECTEUR LIGNE** |
| La formule (A2.3) ? | $g'(0)=\nabla f(\mathbf{x})\mathbf{z}$ |
| Les partielles sont… ? | **Des directionnelles dans les directions UNITAIRES** |
| Le gradient est analogue à… ? | **La DÉRIVÉE** d'une fonction d'une variable |
| La hessienne est analogue à… ? | **La DÉRIVÉE SECONDE** |
| Comment la construit-on ? | **Le GRADIENT DU GRADIENT**, empilé |
| Combien d'entrées ? | $n\times n=n^2$ |
| Théorème A2.2 ? | **YOUNG — l'ordre ne compte pas** |
| Sa conséquence ? | **$H$ est SYMÉTRIQUE** |
| Son hypothèse ? | **Deux fois CONTINÛMENT différentiable** |
| Théorème A2.3 ? | **$f$ concave $\iff$ $g(t)=f(\mathbf{x}+t\mathbf{z})$ concave pour TOUT $\mathbf{x}$, $\mathbf{z}$** |
| Sa portée ? | *« **il suffit de vérifier SUR LES DROITES** »* |
| L'identité de sa preuve ? | $\mathbf{x}+(\alpha t_0+(1-\alpha)t_1)\mathbf{z}=\alpha(\mathbf{x}+t_0\mathbf{z})+(1-\alpha)(\mathbf{x}+t_1\mathbf{z})$ |
| Semi-définie négative ? | $\mathbf{z}^{T}A\mathbf{z}\leq0$ **pour tout $\mathbf{z}$** |
| Définie négative ? | $<0$ **pour tout $\mathbf{z}$ NON NUL** |
| Semi-définie positive ? | **$-A$ semi-définie négative** |
| L'analogie du livre ? | **La généralisation matricielle du NOMBRE NON POSITIF** |
| Théorème A2.4, énoncé 2 ? | **$H(\mathbf{x})$ SEMI-DÉFINIE NÉGATIVE** |
| Théorème A2.4, énoncé 3 ? | $f(\mathbf{x})\leq f(\mathbf{x}^0)+\nabla f(\mathbf{x}^0)(\mathbf{x}-\mathbf{x}^0)$ |
| La formule (P.4) ? | $g''(t)=\mathbf{z}^{T}H(\mathbf{x}+t\mathbf{z})\mathbf{z}$ |
| Le choix de $\mathbf{z}$ pour prouver 1 ⟹ 3 ? | **$\mathbf{z}=\mathbf{x}^0-\mathbf{x}$** |
| $f$ convexe $\iff$ $H$… ? | **SEMI-DÉFINIE POSITIVE** |
| $H$ définie négative est-elle nécessaire ? | **NON** |
| Théorème A2.5 ? | $f$ concave ⟹ $f_{ii}\leq0$ |
| Sa portée ? | **NÉCESSAIRE, PAS SUFFISANT** |
| L'astuce de sa preuve ? | **$\mathbf{z}=\mathbf{e}_i$** ⟹ $\mathbf{e}_i^{T}H\mathbf{e}_i=f_{ii}$ |
| Définition A2.2 ? | $f(t\mathbf{x})\equiv t^{k}f(\mathbf{x})$ **pour tout $t>0$** |
| $k=1$ ? | **HOMOGÈNE LINÉAIRE** |
| $k=0$ ? | *« les changements **ÉQUIPROPORTIONNELS laissent la valeur INCHANGÉE** »* |
| Degré de $Ax_1^{\alpha}x_2^{\beta}$ ? | **$\alpha+\beta$** |
| Théorème A2.6 ? | **Les partielles sont de degré $k-1$** |
| Le pivot de sa preuve ? | $\partial(tx_i)/\partial x_i=t$, et **(P.1) est une IDENTITÉ** |
| Le cas $k=1$ ? | **Les partielles sont INCHANGÉES** |
| Théorème A2.7 ? | **EULER** : $k f(\mathbf{x})=\sum_i f_i(\mathbf{x})x_i$ |
| Son autre nom ? | **Le théorème d'ADDITIVITÉ** |
| La fonction auxiliaire ? | $g(t)\equiv f(t\mathbf{x})$ |
| La nécessité en une ligne ? | $g'(t)=kt^{k-1}f(\mathbf{x})$ ⟹ $g'(1)=kf(\mathbf{x})$ |
| L'astuce de la suffisance ? | **$\dfrac{d}{dt}\big[t^{-k}g(t)\big]=0$ ⟹ CONSTANTE** |
| L'équation (P.6) ? | $t\,g'(t)=k\,g(t)$ |
| Euler pour $k=1$ ? | $f(\mathbf{x})=\sum_i f_i(\mathbf{x})x_i$ |
| Degré de $f\cdot g$ ? | **$m+n$** |
| Degré de $g(f,f)$ ? | **$m\cdot n$** |
| Fonction HOMOTHÉTIQUE ? | **$g(f)$, $g$ strictement croissante, $f$ homogène de degré 1** |
| Ce qu'on en déduit sur ses niveaux ? | **Des DILATATIONS RADIALES les uns des autres** |
