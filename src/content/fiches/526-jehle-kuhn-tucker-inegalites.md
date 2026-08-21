# Fiche 526 — Contraintes d'inégalité et conditions de Kuhn-Tucker

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — appendice mathématique, §A2.3.5 et §A2.3.6 (p. 591-601) |
| **Difficulté** | Avancé — l'outil de tous les programmes avec coins et non-négativité |
| **Temps d'étude estimé** | 125 min |
| **Prérequis** | [Fiche 525](525-jehle-lagrange-contraintes-egalite.md) — lagrangien, multiplicateurs, qualification des contraintes · [Fiche 522](522-jehle-fonctions-reelles-concavite.md) — quasiconcavité |
| **Concepts clés** | Contrainte d'inégalité, contrainte de non-négativité, contrainte saturée, solution intérieure, solution en coin, programmation non linéaire, programmation linéaire, gradient perpendiculaire au niveau, cône des combinaisons linéaires non négatives, conditions de Kuhn-Tucker, complémentarité des écarts, qualification des contraintes, programmation quasiconcave |
| **Poids à l'examen** | Le problème (A2.30) et **LES TROIS CAS de la figure A2.9** · **les trois conditions (A2.31)** et leur construction · l'**exemple A2.10** et sa **règle de pouce** · les conditions de minimisation **(A2.32)** · le **théorème A2.19** · **la dérivation GÉOMÉTRIQUE des conditions de Kuhn-Tucker** *(pentes, gradients, CÔNE)* · le **THÉORÈME A2.20** avec sa preuve · **la COMPLÉMENTARITÉ DES ÉCARTS** · **la QUALIFICATION DES CONTRAINTES** et le contre-exemple $g(x)=x^3\leq0$. |

## 🎯 Vue d'ensemble

```
LE FIL DU §A2.3.5 - §A2.3.6 : de la NON-NEGATIVITE a KUHN-TUCKER

  §A2.3.5  LE PROBLEME LE PLUS SIMPLE

     max f(x)   sous contrainte   x >= 0            (A2.30)

     LES TROIS CAS DE LA FIGURE A2.9 :

       CAS 1  le max global est en x1 < 0, INFAISABLE
              ->  x* = 0   ET   f'(x*) < 0
              «  LA CONTRAINTE EST SATUREE  »

       CAS 2  le max global est PILE en x* = 0
              ->  x* = 0   ET   f'(x*) = 0
              «  saturee, MAIS CELA N'A PAS D'IMPORTANCE  »

       CAS 3  le max est a l'INTERIEUR
              ->  x* > 0   ET   f'(x*) = 0
              «  LA CONTRAINTE N'EST PAS SATUREE  »

     LE POINT COMMUN :  DANS LES TROIS CAS, LE PRODUIT
     x* f'(x*)  EST NUL !

     ... mais cela ne suffit pas : le cas « GENANT » x~ = 0
     avec f'(x~) > 0 donne AUSSI un produit nul, et c'est
     un MINIMUM.  ->  on l'ECARTE en exigeant f' <= 0.

     LES TROIS CONDITIONS  (A2.31) :
        1.  f'(x*) <= 0
        2.  x* f'(x*) = 0
        3.  x* >= 0

     POUR UN MINIMUM  (A2.32) :  f'(x*) >= 0  ( SEUL LE 1 CHANGE )

     THEOREME A2.19  le cas a n variables : LES TROIS CONDITIONS
     TIENNENT POUR CHAQUE VARIABLE SEPAREMENT

  §A2.3.6  LE CAS GENERAL

     max f(x1, x2)  s.c.  g1 <= 0  ET  g2 <= 0        (A2.33)
     ->  UN PROBLEME DE PROGRAMMATION NON LINEAIRE

     LA DERIVATION GEOMETRIQUE :
       la pente du niveau de f est ENTRE celles de g1 et g2
       ->  (A2.34)
       le GRADIENT est PERPENDICULAIRE a son ensemble de niveau
       ->  GRADIENT(f) est DANS LE CONE engendre par
           GRADIENT(g1) et GRADIENT(g2)
       ->  GRADIENT(f) est une COMBINAISON LINEAIRE NON NEGATIVE
           des gradients des contraintes SATUREES

  THEOREME A2.20  (KUHN-TUCKER) :

     dL/dx_i = df/dx_i - SOMME_j lambda_j dg_j/dx_i = 0
     lambda_j >= 0        g_j(x*) <= 0
     lambda_j g_j(x*) = 0    <-  LA COMPLEMENTARITE DES ECARTS

     « Si une contrainte est LACHE, son multiplicateur est NUL ;
       si un multiplicateur est POSITIF, sa contrainte est
       SATUREE. »

     LA QUALIFICATION DES CONTRAINTES est INDISPENSABLE :
     le contre-exemple  max x  s.c.  x^3 <= 0
```

> ⚠️ **Note de transcription — spécifique à cette section.** Le PDF **PERD LES SYMBOLES « PRIME »** : *« $f(x^*)<0$ »* signifie **$f'(x^*)<0$**, et *« $x^*[f(x^*)]=0$ »* signifie **$x^*\,f'(x^*)=0$**. Il **exporte le PRODUIT CARTÉSIEN $\times$ comme un « + »** *(« $g^j:\mathbb{R}^n+A\to\mathbb{R}$ » signifie $\mathbb{R}^n\times A$, et « la matrice $K+n$ » signifie $K\times n$)*, **perd le barré de $\notin$** *(exporté « $\in/$ »)* et celui de $\neq$, et **rend le symbole $\nabla$ des figures par le caractère arabe `ٌ`**. Il perd également $\sum$. Les figures utilisent l'encodage Symbol Mac *(`ϭ` = « = », `Ͻ` = « &lt; », `Ͼ` = « &gt; »)*. **Réparation de transcription, non ajout de contenu.**

## 🟠 Concept 1 — §A2.3.5 : le problème le plus simple

### 1.1 Le motif

> *« Dans de nombreuses applications économiques, nous devons **maximiser ou minimiser quelque chose sous des contraintes QUI IMPLIQUENT DES INÉGALITÉS, AU LIEU DE — OU EN PLUS DE — simples égalités. Par exemple, UNE RESTRICTION DE BON SENS dans la plupart des problèmes est d'exiger que LES VARIABLES ÉCONOMIQUES NE SOIENT DISPONIBLES QU'EN QUANTITÉS NON NÉGATIVES.** »*

> *« **L'analyse lagrangienne DOIT ÊTRE MODIFIÉE pour accommoder ce genre de restrictions et d'autres, plus compliquées.** »*

### 1.2 Le programme de départ

> *« **Pour aider à fournir de l'intuition pour les problèmes plus compliqués À VENIR, nous commençons par LE PROBLÈME LE PLUS SIMPLE POSSIBLE : maximiser une fonction d'UNE variable sous UNE CONTRAINTE DE NON-NÉGATIVITÉ sur la variable de choix.** »*

$$\max_{x}\ f(x)\qquad\text{sous contrainte}\qquad x\geq0 \tag{A2.30}$$

> *« Si nous considérons le problème avec soin, **en gardant à l'esprit que LA RÉGION PERTINENTE pour les solutions est LA DEMI-DROITE RÉELLE NON NÉGATIVE, il semble que L'UNE DE TROIS CHOSES puisse se produire.** »*

## 🔴 Concept 2 — Les trois cas de la figure A2.9

### 2.1 Cas 1 — la contrainte est SATURÉE

> *« Le maximum (GLOBAL) est en $x_1$. **MAIS $x_1<0$ N'EST PAS RÉALISABLE parce qu'il VIOLE LA CONTRAINTE de non-négativité. CLAIREMENT, le maximum de $f$ sous $x\geq0$ est atteint SUR LA FRONTIÈRE de l'ensemble réalisable, en $x^*=0$. Ici, nous disons que LA CONTRAINTE EST SATURÉE.** »*

$$\textbf{CAS 1 :}\qquad x^*=0 \qquad\textbf{et}\qquad f'(x^*)<0$$

### 2.2 Cas 2 — saturée, mais SANS IMPORTANCE

> *« Le maximum global **est ATTEIGNABLE, MAIS TOUT JUSTE. La fonction est maximisée PILE AU POINT $x^*=0$, sur la frontière. LA CONTRAINTE EST DE NOUVEAU SATURÉE, MAIS CELA N'A PAS VRAIMENT D'IMPORTANCE.** »*

$$\textbf{CAS 2 :}\qquad x^*=0 \qquad\textbf{et}\qquad f'(x^*)=0$$

### 2.3 Cas 3 — la contrainte n'est PAS saturée

> *« **Le cas 3 SEUL correspond au genre que nous avons rencontré auparavant. Là, le maximum se produit en $x^*>0$, À L'INTÉRIEUR de l'ensemble réalisable. LA CONTRAINTE N'EST PAS SATURÉE, et nous disons que LE PROBLÈME ADMET UNE SOLUTION INTÉRIEURE parce que la solution est STRICTEMENT à l'intérieur de la région réalisable.** »*

$$\textbf{CAS 3 :}\qquad x^*>0 \qquad\textbf{et}\qquad f'(x^*)=0$$

| Le cas | La légende de la figure A2.9 |
|---|---|
| **(a) Cas 1** | *« **la contrainte est SATURÉE** »* |
| **(b) Cas 2** | *« **la contrainte est saturée MAIS SANS PERTINENCE** »* |
| **(c) Cas 3** | *« **la contrainte n'est PAS saturée** »* |

## 🔴 Concept 3 — Les trois conditions (A2.31)

### 3.1 Le point commun aux trois cas

> *« À ce stade, **la question se pose : Y A-T-IL UN ENSEMBLE COMMODE DE CONDITIONS que nous pouvons utiliser POUR RÉSUMER LES TROIS POSSIBILITÉS ?** »*

| Le cas | Les deux conditions |
|---|---|
| **1** | $x^*=0$ **et** $f'(x^*)<0$ |
| **2** | $x^*=0$ **et** $f'(x^*)=0$ |
| **3** | $x^*>0$ **et** $f'(x^*)=0$ |

> ⚠️ *« **Y a-t-il quelque chose de COMMUN AUX TROIS ? REGARDEZ ATTENTIVEMENT. DANS CHAQUE CAS, MULTIPLIEZ LES DEUX CONDITIONS ENSEMBLE et remarquez que LE PRODUIT SERA TOUJOURS ZÉRO !** »*

$$\boxed{\;x^*\big[f'(x^*)\big]=0 \qquad\textbf{dans les TROIS cas}\;}$$

### 🔴 3.2 Le cas « GÊNANT » qu'il faut écarter

> *« **CELA SEUL, CEPENDANT, NE SUFFIT PAS TOUT À FAIT. Regardez à nouveau le cas 3. CLAIREMENT, $\tilde{x}=0$ NE DONNE PAS un maximum de la fonction dans la région réalisable. Là, $f'(\tilde{x})>0$, donc en augmentant $x$ EN S'ÉLOIGNANT DE LA FRONTIÈRE ET EN ENTRANT DANS LA RÉGION RÉALISABLE, LA VALEUR DE LA FONCTION AUGMENTERA.** »*

> ⚠️ *« **NÉANMOINS, LE PRODUIT $\tilde{x}\,[f'(\tilde{x})]=0$ MÊME SI $\tilde{x}$ EST UN MINIMUM, PAS UN MAXIMUM, sous $x\geq0$. Nous pouvons ÉCARTER cette possibilité INDÉSIRABLE EN EXIGEANT SIMPLEMENT QUE LA FONCTION SOIT NON CROISSANTE quand nous augmentons $x$.** »*

### 3.3 Les trois conditions

> **LES CONDITIONS (A2.31) — maximisation sous $x\geq0$** Si $x^*$ résout (A2.30), alors **les trois doivent tenir** : **Condition 1.** $\ f'(x^*)\leq0$ **Condition 2.** $\ x^*\big[f'(x^*)\big]=0$ **Condition 3.** $\ x^*\geq0$

> ⚠️ *« **Notez que ces trois conditions, ENSEMBLE, ÉCARTENT le problème du « minimum » qu'on vient de décrire. En $\tilde{x}=0$, même si $\tilde{x}f'(\tilde{x})=0$, LA CONDITION 1 EST VIOLÉE parce que $f'(\tilde{x})>0$.** »*

<details class="details--riche">
<summary>

**EXEMPLE A2.10 — et LA RÈGLE DE POUCE**

</summary>

$$\max_{x}\ 6-x^2-4x \qquad\text{sous contrainte}\qquad x\geq0$$

**En dérivant** : $f'(x)=-2x-4$. Les conditions (A2.31) donnent

$$\textbf{1.}\ -2x^*-4\leq0 \qquad \textbf{2.}\ x^*\big[-2x^*-4\big]=0 \qquad \textbf{3.}\ x^*\geq0$$

> ⚠️ *« Essayer de résoudre des conditions comme celles-ci **peut parfois DEVENIR DÉSORDONNÉ. UNE RÈGLE DE POUCE QUI MARCHE HABITUELLEMENT EST DE SE CONCENTRER SUR LE TERME PRODUIT (2). RÉSOLVEZ-LE D'ABORD, PUIS ASSUREZ-VOUS QUE LES AUTRES CONDITIONS SONT SATISFAITES.** »*

**En multipliant par $-1$ et en factorisant un 2** :

$$2x^*\big[x^*+2\big]=0$$

> *« **Les seules valeurs qui satisfont ceci sont $x=0$ et $x=-2$. CEPENDANT, LA CONDITION 3 ÉCARTE $x=-2$, ne laissant que $x=0$ comme candidat. En s'assurant que ceci satisfait AUSSI la condition 1**, nous obtenons $0-4=-4\leq0$, donc **la solution doit être $x^*=0$.** »*

</details>

### 3.4 Les conditions de MINIMISATION

> *« Les conditions pour un **MINIMUM** de $f(x)$ sous $x\geq0$ peuvent aussi être facilement dérivées. **Le raisonnement est EXACTEMENT LE MÊME, sauf que CETTE FOIS LE CAS GÊNANT surgit SI LA FONCTION EST DÉCROISSANTE à la frontière. Nous l'écartons EN EXIGEANT QUE LA DÉRIVÉE SOIT NON NÉGATIVE.** »*

> **LES CONDITIONS (A2.32) — minimisation sous $x\geq0$** **Condition 1.** $\ f'(x^*)\geq0$ **Condition 2.** $\ x^*\big[f'(x^*)\big]=0$ **Condition 3.** $\ x^*\geq0$

⚠️ **SEULE LA CONDITION 1 CHANGE DE SENS.**

### 3.5 Le théorème A2.19

> *« De manière **TOUT À FAIT SENSÉE**, (A2.31) et (A2.32) **SE GÉNÉRALISENT au cas de l'optimisation de fonctions réelles de N'IMPORTE QUEL nombre de variables sous des contraintes de non-négativité sur TOUTES. Dans le cas multivarié, LES TROIS CONDITIONS DOIVENT TENIR POUR CHAQUE VARIABLE SÉPARÉMENT, avec LES DÉRIVÉES PARTIELLES de la fonction SUBSTITUÉES à la dérivée unique.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.19 — Conditions nécessaires pour les optima des fonctions réelles sous contraintes de non-négativité</span>

Soit $f(\mathbf{x})$ **continûment différentiable**. **1.** Si $\mathbf{x}^*$ **MAXIMISE** $f(\mathbf{x})$ sous $\mathbf{x}\geq\mathbf{0}$, alors pour $i=1,\dots,n$ :

$$\textbf{(i)}\ \frac{\partial f(\mathbf{x}^*)}{\partial x_i}\leq0 \qquad \textbf{(ii)}\ x_i^*\frac{\partial f(\mathbf{x}^*)}{\partial x_i}=0 \qquad \textbf{(iii)}\ x_i^*\geq0$$

**2.** Si $\mathbf{x}^*$ **MINIMISE** $f(\mathbf{x})$ sous $\mathbf{x}\geq\mathbf{0}$, alors pour $i=1,\dots,n$ :

$$\textbf{(i)}\ \frac{\partial f(\mathbf{x}^*)}{\partial x_i}\geq0 \qquad \textbf{(ii)}\ x_i^*\frac{\partial f(\mathbf{x}^*)}{\partial x_i}=0 \qquad \textbf{(iii)}\ x_i^*\geq0$$

</div>

> *« **Le théorème est DIRECT et sa preuve est laissée en exercice.** »*

## 🔴 Concept 4 — §A2.3.6 : le problème de programmation non linéaire

### 4.1 Le programme

> *« Considérons maintenant **l'optimisation sous DES CONTRAINTES D'INÉGALITÉ GÉNÉRALES.** »*

$$\max_{(x_1,x_2)\in\mathbb{R}^2}\ f(x_1,x_2)\qquad\text{s.c.}\qquad g^1(x_1,x_2)\leq0 \quad\text{et}\quad g^2(x_1,x_2)\leq0 \tag{A2.33}$$

### 🔴 4.2 Linéaire contre non linéaire

> *« Un tel problème est communément appelé **UN PROBLÈME DE PROGRAMMATION NON LINÉAIRE. Dans les problèmes de PROGRAMMATION LINÉAIRE, UNE FONCTION LINÉAIRE est optimisée SOUS DES CONTRAINTES D'INÉGALITÉ LINÉAIRES. Dans (A2.33), IL N'Y A PAS DE TELLES LIMITATIONS sur la forme de la fonction objectif et des relations de contrainte, de sorte que VOUS POUVEZ VOIR QUE LES PROBLÈMES DE PROGRAMMATION LINÉAIRE SONT UN CAS PARTICULIER DES NON LINÉAIRES.** »*

> ⚠️ *« **Les méthodes conçues pour traiter le problème général non linéaire DOIVENT BEAUCOUP À L'ÉTUDE PRÉCOCE DU CAS LINÉAIRE.** »*

### 4.3 Le cadre de la dérivation

> *« **Pour être SPÉCIFIQUE, nous supposerons que $f$, $g^1$ et $g^2$ sont STRICTEMENT CROISSANTES en chaque coordonnée.** »*

*(Fig. A2.10 : **« l'ensemble réalisable »** — la région hachurée est *« l'ensemble des points satisfaisant les DEUX contraintes »*.)*

> *« **Parce que $f$ est CROISSANTE, ses ensembles de niveau AUGMENTENT EN VALEUR quand nous nous éloignons de l'origine.** »* La figure A2.11 représente une situation où **$f$ est maximisée en $\mathbf{x}^*$**, où *« **les DEUX contraintes sont SATURÉES et égales à zéro** »*.

> ⚠️ *« **Notez qu'en $\mathbf{x}^*$, l'ensemble de niveau de $f$ N'EST TANGENT À AUCUNE des lignes sur lesquelles les contraintes sont satisfaites avec égalité.** »*

## 🔴 Concept 5 — La dérivation géométrique de Kuhn-Tucker

### 5.1 L'encadrement des pentes

> *« **Que pouvons-nous dire EN GÉNÉRAL de la PENTE de l'ensemble de niveau de $f$ en $\mathbf{x}^*$ ?** »*

| # | L'argument, mot pour mot |
|---|---|
| **1** | *« D'abord, **elle doit être FAIBLEMENT PLUS RAIDE que la pente de l'ensemble de niveau de $g^1$ en $\mathbf{x}^*$. AUTREMENT, IL Y AURAIT DES POINTS RÉALISABLES AU NORD-OUEST DE $\mathbf{x}^*$ QUI ATTEIGNENT UNE VALEUR PLUS ÉLEVÉE DE $f$.** ( **Assurez-vous de voir ceci avant de poursuivre !**) »* |
| **2** | *« De même, en $\mathbf{x}^*$, **la pente du niveau de $f$ doit être FAIBLEMENT PLUS PLATE que la pente du niveau de $g^2$.** »* |

**Les trois pentes** étant respectivement $\ -\dfrac{\partial f/\partial x_1}{\partial f/\partial x_2}$, $\ -\dfrac{\partial g^1/\partial x_1}{\partial g^1/\partial x_2}$ et $\ -\dfrac{\partial g^2/\partial x_1}{\partial g^2/\partial x_2}$, on obtient

$$-\frac{\partial g^1(\mathbf{x}^*)/\partial x_1}{\partial g^1(\mathbf{x}^*)/\partial x_2}\ \leq\ -\frac{\partial f(\mathbf{x}^*)/\partial x_1}{\partial f(\mathbf{x}^*)/\partial x_2}\ \leq\ -\frac{\partial g^2(\mathbf{x}^*)/\partial x_1}{\partial g^2(\mathbf{x}^*)/\partial x_2}$$

**puis, « après multiplication par $-1$ et passage aux inverses »** :

$$\boxed{\;\frac{\partial g^1(\mathbf{x}^*)/\partial x_2}{\partial g^1(\mathbf{x}^*)/\partial x_1}\ \leq\ \frac{\partial f(\mathbf{x}^*)/\partial x_2}{\partial f(\mathbf{x}^*)/\partial x_1}\ \leq\ \frac{\partial g^2(\mathbf{x}^*)/\partial x_2}{\partial g^2(\mathbf{x}^*)/\partial x_1}\;} \tag{A2.34}$$

### 🔴 5.2 Le rappel de géométrie vectorielle

> *« **Rappelons un peu de géométrie avec les vecteurs. UN VECTEUR $(z_1,z_2)$, ÉTANT LE SEGMENT DE DROITE DE L'ORIGINE AU POINT $(z_1,z_2)$, A POUR PENTE $z_2/z_1$.** »*

⟹ **les trois termes de (A2.34) sont LES PENTES DES TROIS GRADIENTS** $\nabla g^1(\mathbf{x}^*)$, $\nabla f(\mathbf{x}^*)$ et $\nabla g^2(\mathbf{x}^*)$.

> *« Par conséquent, **(A2.34) nous dit que LA PENTE DU VECTEUR GRADIENT $\nabla f(\mathbf{x}^*)$ SE TROUVE ENTRE LES PENTES DES VECTEURS GRADIENTS $\nabla g^1(\mathbf{x}^*)$ ET $\nabla g^2(\mathbf{x}^*)$.** »*

> *(Note 5.)* *« **Nous venons de montrer que LES PENTES DES VECTEURS GRADIENTS SONT LES INVERSES OPPOSÉS DES PENTES DE LEURS ENSEMBLES DE NIVEAU. PAR CONSÉQUENT, ILS SONT PERPENDICULAIRES À LEURS ENSEMBLES DE NIVEAU.** »*

### 🔴 5.3 LE CÔNE — le cœur de l'idée

*(Fig. A2.12 : **« les vecteurs gradients »**, dessinés *« COMME SI $\mathbf{x}^*$ ÉTAIT L'ORIGINE »*.)*

> ⚠️ *« **LE CÔNE HACHURÉ AU NORD-EST de la fig. A2.12 est L'ENSEMBLE DE TOUS LES VECTEURS qui peuvent s'écrire comme UNE COMBINAISON LINÉAIRE NON NÉGATIVE de $\nabla g^1(\mathbf{x}^*)$ et $\nabla g^2(\mathbf{x}^*)$. ÉVIDEMMENT, $\nabla f(\mathbf{x}^*)$ SE TROUVE DANS CET ENSEMBLE** »*.

⟹ **il existe des réels $\lambda_1^*,\lambda_2^*$ tels que**

$$\frac{\partial f(\mathbf{x}^*)}{\partial x_i}-\sum_{j=1}^{2}\lambda_j^*\frac{\partial g^j(\mathbf{x}^*)}{\partial x_i}=0\ \ (i=1,2),\qquad \lambda_1^*\geq0,\ \lambda_2^*\geq0$$

*« et bien sûr, dans notre exemple, **les contraintes sont satisfaites AVEC ÉGALITÉ** »* : $g^1(\mathbf{x}^*)=0$ et $g^2(\mathbf{x}^*)=0$.

### 🔴 5.4 Ce que le théorème doit encore couvrir

> *« **EN GÉNÉRAL, TOUTES LES CONTRAINTES N'ONT PAS BESOIN D'ÊTRE SATISFAITES AVEC ÉGALITÉ à la solution optimale. Le théorème de Kuhn-Tucker ci-dessous fournit des conditions nécessaires DU GENRE QUE NOUS VENONS DE DÉRIVER, TOUT EN TRAITANT AUSSI les situations où CERTAINES CONTRAINTES NE SONT PAS SATURÉES à l'optimum.** »*

$$\boxed{\;\textbf{« Le théorème montre qu'À L'OPTIMUM, LE GRADIENT DE $f$ PEUT S'EXPRIMER}\\\textbf{COMME UNE COMBINAISON LINÉAIRE NON NÉGATIVE DES GRADIENTS}\\\textbf{DES $g^j$ ASSOCIÉS AUX CONTRAINTES SATURÉES $j$. »}\;}$$

> ⚠️ *« **Nous énonçons le théorème POUR LES PROBLÈMES DE MAXIMISATION SEULEMENT parce que TOUT PROBLÈME DE MINIMISATION PEUT ÊTRE RÉSOLU EN MAXIMISANT LA NÉGATIVE de la fonction objectif SOUS LES MÊMES CONTRAINTES.** »*

## 🔴 Concept 6 — Le théorème A2.20 de Kuhn-Tucker

### 6.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.20 — (Kuhn-Tucker) Conditions nécessaires pour les maxima des fonctions réelles sous contraintes d'inégalité</span>

Soient $f(\mathbf{x})$ et $g^j(\mathbf{x})$, $j=1,\dots,m$, des fonctions réelles **continues** sur $D\subset\mathbb{R}^n$. Soit $\mathbf{x}^*$ **un point INTÉRIEUR de $D$** qui **maximise $f(\mathbf{x})$ sur $D$ sous les contraintes $g^j(\mathbf{x})\leq0$**, et supposons que **$f$ et chaque $g^j$ sont continûment différentiables sur un ouvert contenant $\mathbf{x}^*$**. **Si les vecteurs gradients $\nabla g^j(\mathbf{x}^*)$ associés aux contraintes $j$ QUI SONT SATURÉES en $\mathbf{x}^*$ sont LINÉAIREMENT INDÉPENDANTS**, alors **il existe un vecteur UNIQUE $\boldsymbol{\lambda}^*$** tel que $(\mathbf{x}^*,\boldsymbol{\lambda}^*)$ satisfait **les conditions de Kuhn-Tucker** :

$$\frac{\partial\mathcal{L}(\mathbf{x}^*,\boldsymbol{\lambda}^*)}{\partial x_i}=\frac{\partial f(\mathbf{x}^*)}{\partial x_i}-\sum_{j=1}^{m}\lambda_j^*\frac{\partial g^j(\mathbf{x}^*)}{\partial x_i}=0,\qquad i=1,\dots,n$$

$$\boxed{\;\lambda_j^*\geq0,\qquad g^j(\mathbf{x}^*)\leq0,\qquad \lambda_j^*\,g^j(\mathbf{x}^*)=0,\qquad j=1,\dots,m\;}$$

</div>

⚠️ **Trois différences avec Lagrange** *([fiche 525](525-jehle-lagrange-contraintes-egalite.md), théorème A2.16)* :

| # | La différence |
|---|---|
| **1** | **Les $\lambda_j^*$ doivent être NON NÉGATIFS** *(un signe, alors que Lagrange n'en impose aucun)* |
| **2** | **Les contraintes ne sont satisfaites qu'avec INÉGALITÉ** $g^j\leq0$ |
| **3** | **LA CONDITION DE COMPLÉMENTARITÉ $\lambda_j^*g^j(\mathbf{x}^*)=0$** |

### 6.2 La preuve

<details class="details--riche">
<summary>

**Étape 1 — la mise en place et l'ensemble $B$**

</summary>

> *« **SANS PERTE, supposons que LES $K\geq0$ PREMIÈRES contraintes sont SATURÉES et que les autres NE LE SONT PAS. Définissons $\lambda_j^*=0$ pour $j=K+1,\dots,m$. Par conséquent, QUELLES QUE SOIENT les valeurs de $\lambda_1^*,\dots,\lambda_K^*$, IL SERA VRAI QUE $\lambda_j^*g^j(\mathbf{x}^*)=0$ POUR TOUT $j$.** »*

**Définir le CÔNE** :

$$B=\Big\{\mathbf{b}\in\mathbb{R}^n\ \Big|\ \mathbf{b}=\sum_{j=1}^{K}\lambda_j\nabla g^j(\mathbf{x}^*),\ \text{pour certains } \lambda_1\geq0,\dots,\lambda_K\geq0\Big\}$$

⚠️ *« et notez que **$B$ est CONVEXE. On peut aussi montrer que $B$ est FERMÉ** *(voir l'exercice A2.29)*. »*

</details>

<details class="details--riche">
<summary>

**Étape 2 — pourquoi il suffit de montrer $\nabla f(\mathbf{x}^*)\in B$**

</summary>

> *« **SI $\nabla f(\mathbf{x}^*)\in B$, ALORS $\nabla f(\mathbf{x}^*)-\sum_{j=1}^{K}\lambda_j^*\nabla g^j(\mathbf{x}^*)=\mathbf{0}$ pour certains $\lambda_1^*\geq0,\dots,\lambda_K^*\geq0$.** »*

**L'UNICITÉ** : *« de tels $\lambda_i^*$ **SONT UNIQUES** car si l'on avait aussi $\nabla f(\mathbf{x}^*)-\sum_j\hat{\lambda}_j\nabla g^j(\mathbf{x}^*)=\mathbf{0}$, **alors en SOUSTRAYANT les deux égalités on obtient $\sum_{j=1}^{K}(\lambda_j^*-\hat{\lambda}_j)\nabla g^j(\mathbf{x}^*)=\mathbf{0}$. L'INDÉPENDANCE LINÉAIRE des $\nabla g^j(\mathbf{x}^*)$ implique $\lambda_j^*=\hat{\lambda}_j$.** »*

⟹ *« **il SUFFIT donc de montrer que $\nabla f(\mathbf{x}^*)$ EST CONTENU DANS $B$.** »*

</details>

<details class="details--riche">
<summary>

**Étape 3 — la contradiction, via le théorème de SÉPARATION**

</summary>

**Poser** $\mathbf{a}^*=\nabla f(\mathbf{x}^*)$ et **supposer par l'absurde** $\mathbf{a}^*\notin B$.

| Pas | L'argument |
|---|---|
| **1** | *« Alors **les deux ensembles CONVEXES FERMÉS $A=\{\mathbf{a}^*\}$ et $B$ sont DISJOINTS** »* ⟹ **par le THÉORÈME A2.24** *(un théorème de SÉPARATION, §A2.5)*, il existe $\mathbf{p}\in\mathbb{R}^n$ avec $\ \mathbf{p}\cdot\mathbf{a}^*>\mathbf{p}\cdot\mathbf{b}$ **pour tout $\mathbf{b}\in B$** **(P.1)** |
| **2** | *« **EN PARTICULIER, $\mathbf{p}\cdot\mathbf{a}^*>0$ PARCE QUE $\mathbf{0}\in B$** »* |
| **3** | *« De plus, **$\mathbf{p}\cdot\nabla g^j(\mathbf{x}^*)\leq0$ pour tout $j=1,\dots,K$**, car si cela échouait pour un tel $j$, **(P.1) serait VIOLÉE en posant $\mathbf{b}=\lambda\nabla g^j(\mathbf{x}^*)$ pour $\lambda>0$ ASSEZ GRAND** »* |
| **4** | ⟹ $\ \nabla f(\mathbf{x}^*)\cdot\mathbf{p}>0\ $ et $\ \nabla g^j(\mathbf{x}^*)\cdot\mathbf{p}\leq0$ **(P.2)** |

</details>

<details class="details--riche">
<summary>

**Étape 4 — le vecteur $\mathbf{z}$ et la direction admissible**

</summary>

> *« **Parce que $\nabla g^1(\mathbf{x}^*),\dots,\nabla g^K(\mathbf{x}^*)$ sont LINÉAIREMENT INDÉPENDANTS, la matrice $K\times n$ $G$ dont la $j$-ième ligne est $\nabla g^j(\mathbf{x}^*)$ A POUR IMAGE TOUT $\mathbb{R}^K$.** »* *(Note 6 : *« **c'est un fait de base d'ALGÈBRE LINÉAIRE. Cependant, il peut se prouver TRÈS DIRECTEMENT en utilisant le théorème A2.24 — une preuve QUE VOUS POURRIEZ VOULOIR ESSAYER.** »*)*

**En prenant $\mathbf{w}=(-1,-1,\dots,-1)$**, il existe $\mathbf{z}$ avec $G\mathbf{z}=\mathbf{w}$, donc

$$\nabla g^j(\mathbf{x}^*)\cdot\mathbf{z}<0\qquad\text{pour tout } j=1,\dots,K \tag{P.3}$$

**Par (P.2), on peut choisir $\delta>0$ assez petit pour que**

$$\nabla f(\mathbf{x}^*)\cdot(\mathbf{p}+\delta\mathbf{z})>0 \tag{P.4}$$

</details>

<details class="details--riche">
<summary>

**Étape 5 — la contradiction finale**

</summary>

> *« Parce que $\mathbf{x}^*$ est **à l'INTÉRIEUR de $D$**, $f\big(\mathbf{x}^*+\varepsilon(\mathbf{p}+\delta\mathbf{z})\big)$ est **bien définie** tant que $|\varepsilon|$ est assez petit. »*

| La contrainte | Pourquoi elle reste satisfaite |
|---|---|
| **Les NON saturées** $j=K+1,\dots,m$ | *« satisfaites pour $\varepsilon>0$ assez petit **PAR CONTINUITÉ** »* |
| **Les SATURÉES** $j=1,\dots,K$ | **par (P.2) et (P.3)** : $\ \dfrac{dg^j\big(\mathbf{x}^*+\varepsilon(\mathbf{p}+\delta\mathbf{z})\big)}{d\varepsilon}=\nabla g^j(\mathbf{x}^*)\cdot(\mathbf{p}+\delta\mathbf{z})<0$ |

> ⟹ *« pour $\varepsilon>0$ assez petit, **$\mathbf{x}^*+\varepsilon(\mathbf{p}+\delta\mathbf{z})$ EST RÉALISABLE et doit donc donner une valeur de $f$ QUI N'EST PAS SUPÉRIEURE au maximum $f(\mathbf{x}^*)$** »* ⟹

$$\left.\frac{df\big(\mathbf{x}^*+\varepsilon(\mathbf{p}+\delta\mathbf{z})\big)}{d\varepsilon}\right|_{\varepsilon=0}\leq0$$

> ⚠️ *« **Mais selon (P.4)**, cette dérivée vaut $\nabla f(\mathbf{x}^*)\cdot(\mathbf{p}+\delta\mathbf{z})>0$, **CE QUI EST LA CONTRADICTION RECHERCHÉE.** »* $\blacksquare$

⚠️ **L'idée de la preuve en une phrase** : si $\nabla f$ **sortait** du cône, **on pourrait construire une direction RÉALISABLE qui AUGMENTE $f$** — donc $\mathbf{x}^*$ ne serait pas un maximum.

</details>

### 🔴 6.3 Ce que le théorème NE donne PAS

> *« **Les conditions de Kuhn-Tucker du théorème A2.20 ne sont QUE DES CONDITIONS NÉCESSAIRES DU PREMIER ORDRE pour les optima LOCAUX. DES CONDITIONS SUFFISANTES SONT DISPONIBLES QUAND LA FONCTION OBJECTIF EST CONCAVE OU QUASICONCAVE. Le lecteur intéressé peut consulter LUENBERGER (1973) ou ARROW ET ENTHOVEN (1961) sur ce point. Pour nos besoins, les conditions nécessaires du théorème A2.20 SUFFISENT.** »*

### 6.4 Les contraintes de non-négativité

> *« Le théorème de Kuhn-Tucker est souvent écrit **avec les contraintes de non-négativité $x_1\geq0,\dots,x_n\geq0$ DONNÉES EXPLICITEMENT. Le théorème A2.20 S'APPLIQUE ENCORE puisque CHAQUE CONTRAINTE DE NON-NÉGATIVITÉ PEUT S'ÉCRIRE COMME UNE FONCTION DE CONTRAINTE $g^j$.** »*

> ⚠️ *« **En effet, si les contraintes de non-négativité sont LES SEULES contraintes, alors LE THÉORÈME A2.20 SE RÉDUIT AU THÉORÈME A2.19** *(voir l'exercice A2.30)*. »*

## 🔴 Concept 7 — La complémentarité des écarts

### 7.1 Le nom et le sens

> *« **La conclusion que $\lambda_j^*g^j(\mathbf{x}^*)=0$ pour $j=1,\dots,m$ est appelée LA COMPLÉMENTARITÉ DES ÉCARTS (« complementary slackness »).** »*

$$\boxed{\;\textbf{« Elle dit que SI UNE CONTRAINTE EST LÂCHE, SON MULTIPLICATEUR DE}\\\textbf{LAGRANGE ASSOCIÉ DOIT ÊTRE NUL, tandis que SI UN MULTIPLICATEUR}\\\textbf{EST POSITIF, SA CONTRAINTE ASSOCIÉE DOIT ÊTRE SATURÉE. »}\;}$$

| La situation | Ce qu'on en déduit |
|---|---|
| $g^j(\mathbf{x}^*)<0$ *(contrainte **LÂCHE**)* | **$\lambda_j^*=0$** |
| $\lambda_j^*>0$ | **$g^j(\mathbf{x}^*)=0$** *(contrainte **SATURÉE**)* |
| $g^j(\mathbf{x}^*)=0$ **et** $\lambda_j^*=0$ | **Possible** — le cas « saturée mais sans importance » *(cas 2 de la fig. A2.9)* |

### 7.2 L'interprétation économique du multiplicateur

> ⚠️ *« Comme il vous sera demandé de le montrer à l'exercice A2.33, **LE MULTIPLICATEUR DE LAGRANGE $\lambda_j^*$ PEUT S'INTERPRÉTER COMME L'AUGMENTATION MARGINALE DE LA FONCTION OBJECTIF QUAND LA $j$-IÈME CONTRAINTE EST RELÂCHÉE.** »*

⚠️ **C'est ce qui donne enfin son sens économique au multiplicateur** — *« seulement incident »* dans la [fiche 525](525-jehle-lagrange-contraintes-egalite.md), il devient ici **la VALEUR MARGINALE de la ressource rare**. *(La démonstration relève du **théorème de l'enveloppe**, §A2.4.)*

## 🔴 Concept 8 — La qualification des contraintes

### 8.1 Pourquoi elle est indispensable

> *« La condition d'indépendance linéaire du théorème A2.20 est **UNE PARMI TOUTE UNE VARIÉTÉ de QUALIFICATIONS DES CONTRAINTES possibles. Pour voir QU'UNE TELLE QUALIFICATION EST NÉCESSAIRE, considérez le problème** »* :

$$\max\ f(x)=x\qquad\text{sous contrainte}\qquad g(x)=x^3\leq0,\qquad D=(-\infty,\infty)$$

<details class="details--riche">
<summary>

**Le contre-exemple, décortiqué**

</summary>

| L'élément | Sa valeur |
|---|---|
| **La solution** | **$x^*=0$** *(car $x^3\leq0\iff x\leq0$, et $f=x$ y est maximisée en $0$)* |
| $\nabla g(x^*)$ | **$3(0)^2=0$** |
| $\nabla f(x^*)$ | **$1$** |

> ⚠️ *« **Par conséquent, LA CONCLUSION DU THÉORÈME A2.20 ÉCHOUE.** »* — il faudrait $1-\lambda\cdot0=0$, **impossible**.

> *« **Ceci NE CONTREDIT PAS le théorème, bien sûr, parce que L'ENSEMBLE SINGLETON DE GRADIENTS $\{\nabla g(x^*)\}$ correspondant à l'unique contrainte saturée N'EST PAS LINÉAIREMENT INDÉPENDANT.** »*

*( **Le vecteur nul n'est jamais linéairement indépendant** — c'est exactement le point.)*

> ⚠️ *« **Ainsi, ON NE PEUT PAS SIMPLEMENT SUPPRIMER LA QUALIFICATION DES CONTRAINTES.** »*

</details>

### 8.2 Il en existe d'autres

> *« **L'exercice A2.31 fournit PLUSIEURS QUALIFICATIONS DES CONTRAINTES, dont CHACUNE PEUT REMPLACER la condition d'indépendance linéaire du théorème A2.20 SANS CHANGER LA CONCLUSION du théorème, SAUF EN CE QUI CONCERNE L'UNICITÉ des multiplicateurs.** »*

⚠️ **Le prix à payer** : les qualifications plus faibles **préservent l'EXISTENCE des multiplicateurs, mais pas leur UNICITÉ.**

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « … sous contrainte $x\geq0$ » | **(A2.30)** | **Les TROIS conditions (A2.31)** |
| Un maximum hors du domaine réalisable | **Cas 1** | **Solution EN COIN** : $x^*=0$, $f'(x^*)<0$ |
| Un maximum pile sur la frontière | **Cas 2** | **Saturée MAIS SANS IMPORTANCE** |
| Un maximum strictement à l'intérieur | **Cas 3** | **SOLUTION INTÉRIEURE**, $f'=0$ |
| Un problème de MINIMISATION sous $x\geq0$ | **(A2.32)** | **Seule la condition 1 s'inverse : $f'\geq0$** |
| Plusieurs variables, non-négativité | **Théorème A2.19** | **Les trois conditions POUR CHAQUE VARIABLE** |
| « … s.c. $g^j(\mathbf{x})\leq0$ » | **(A2.33)** | **KUHN-TUCKER** *(thm A2.20)* |
| « la contrainte est-elle saturée ? » | **§A2.3.6** | **Regarder $\lambda_j^*$** — complémentarité |
| « que vaut le multiplicateur ? » | **§A2.3.6** | **La VALEUR MARGINALE du relâchement de la contrainte** |
| Un problème de MINIMISATION sous $g\leq0$ | **§A2.3.6** | **Maximiser $-f$ sous LES MÊMES contraintes** |
| Le gradient d'une contrainte s'annule | **Qualification** | **Kuhn-Tucker PEUT ÉCHOUER** — cf. $x^3\leq0$ |
| « $f$ quasiconcave, $g$ quasiconvexe » | **Exercice A2.32** | **Programmation QUASICONCAVE d'Arrow-Enthoven** |

**Les trois réflexes de cadrage :**

1. **Toujours écrire les contraintes sous la forme $g^j(\mathbf{x})\leq0$**, jamais $\geq$. **Le signe des $\lambda_j$ en dépend entièrement.**
2. **Attaquer par le terme PRODUIT.** *« Une RÈGLE DE POUCE qui marche habituellement est de se concentrer sur LE TERME PRODUIT. Résolvez-le d'abord, puis assurez-vous que les autres conditions sont satisfaites. »*
3. **Ne jamais oublier que Kuhn-Tucker n'est que NÉCESSAIRE.** *« Des conditions suffisantes sont disponibles quand la fonction objectif est CONCAVE OU QUASICONCAVE. »*

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Résoudre un problème sous contrainte de non-négativité

| Pas | L'action |
|---|---|
| **1** | **Écrire les trois conditions** — **$f'\leq0$ pour un MAX, $f'\geq0$ pour un MIN** |
| **2** | **Résoudre D'ABORD le produit $x^*f'(x^*)=0$** — il donne **$x^*=0$ OU $f'(x^*)=0$** |
| **3** | **Éliminer les racines qui violent $x^*\geq0$** |
| **4** | **Vérifier la condition 1 sur ce qui reste** |
| **5** | **Ne pas oublier que le cas $x^*=0$ avec $f'>0$ est UN MINIMUM déguisé** |

### Méthode 2 — Appliquer le théorème A2.19 à $n$ variables

⚠️ **Les trois conditions valent POUR CHAQUE $i$ SÉPARÉMENT** :

$$\frac{\partial f(\mathbf{x}^*)}{\partial x_i}\leq0 \qquad x_i^*\frac{\partial f(\mathbf{x}^*)}{\partial x_i}=0 \qquad x_i^*\geq0$$

⟹ **il faut donc examiner $n$ « alternatives » indépendantes**, chacune donnant **soit $x_i^*=0$, soit $\partial f/\partial x_i=0$**.

### Méthode 3 — Appliquer Kuhn-Tucker

1. **Réécrire toutes les contraintes sous la forme $g^j(\mathbf{x})\leq0$.**
2. **Former** $\ \mathcal{L}=f(\mathbf{x})-\sum_j\lambda_j g^j(\mathbf{x})$.
3. **Écrire les conditions** :

|  | La condition |
|---|---|
| **Stationnarité** | $\partial f/\partial x_i-\sum_j\lambda_j^*\,\partial g^j/\partial x_i=0$ |
| **Non-négativité des multiplicateurs** | $\lambda_j^*\geq0$ |
| **Réalisabilité** | $g^j(\mathbf{x}^*)\leq0$ |
| **Complémentarité** | $\lambda_j^*\,g^j(\mathbf{x}^*)=0$ |

4. **ÉNUMÉRER LES CAS** : pour chaque contrainte, **soit elle est saturée ($g^j=0$), soit son multiplicateur est nul ($\lambda_j^*=0$)**.
5. **Résoudre chaque cas et écarter ceux qui violent une condition.**

### Méthode 4 — Traiter un problème de MINIMISATION

⚠️ *« **Tout problème de minimisation peut être résolu EN MAXIMISANT LA NÉGATIVE de la fonction objectif SOUS LES MÊMES CONTRAINTES.** »*

$$\min f(\mathbf{x}) \ \text{ s.c. } \ g^j(\mathbf{x})\leq0 \qquad\Longleftrightarrow\qquad \max\big(-f(\mathbf{x})\big) \ \text{ s.c. } \ g^j(\mathbf{x})\leq0$$

⚠️ **Puis on renverse les signes dans les conditions obtenues.**

### Méthode 5 — Lire la complémentarité des écarts

| Ce qu'on observe | Ce qu'on conclut |
|---|---|
| Une contrainte **NON saturée** | **Son $\lambda_j^*$ est NUL** — elle **n'a aucun effet** sur la solution |
| Un $\lambda_j^*$ **STRICTEMENT positif** | **Sa contrainte est SATURÉE** — elle « mord » |
| Un $\lambda_j^*$ **grand** | **Relâcher cette contrainte apporterait BEAUCOUP** |

⚠️ **En pratique**, cela permet de **deviner quelles contraintes sont actives** avant de résoudre.

## Les exercices du livre (§A2.6) — ceux qui portent sur §A2.3.5-A2.3.6

> ⚠️ **Le livre NE FOURNIT PAS de corrigé.** Les énoncés sont **ceux de Jehle & Reny** *(exercices A2.26 à A2.32)*. **Les pistes de résolution sont un ENRICHISSEMENT PÉDAGOGIQUE.**

<details class="details--riche">
<summary>

**A2.26 — le coût de la contrainte**

</summary>

> *« **Représentez $f(x)=6-x^2-4x$. Trouvez le point où la fonction atteint son maximum (GLOBAL) NON CONTRAINT et calculez la valeur de la fonction en ce point. Comparez ceci à la valeur qu'elle atteint quand elle est maximisée SOUS LA CONTRAINTE DE NON-NÉGATIVITÉ $x\geq0$.** »*

> **Piste (hors cours).** **Le maximum NON contraint** : $f'(x)=-2x-4=0$ ⟹ **$x=-2$**, et $f(-2)=6-4+8=\mathbf{10}$. **Le maximum SOUS $x\geq0$** : c'est **l'exemple A2.10** ⟹ **$x^*=0$**, et $f(0)=\mathbf{6}$.
>
> $$\boxed{\;\textbf{La contrainte COÛTE } \ 10-6=\mathbf{4} \ \textbf{ unités de valeur objectif.}\;}$$
>
> ⚠️ **C'est exactement le CAS 1 de la figure A2.9** : le maximum libre est **infaisable**, et **la solution est EN COIN, avec $f'(0)=-4<0$**.

</details>

<details class="details--riche">
<summary>

**A2.27 — les trois cas du MINIMUM, et le cas « gênant »**

</summary>

> *« En minimisant $f(x)$ sous $x\geq0$, **il y a TROIS cas possibles. La contrainte peut être SATURÉE, SATURÉE MAIS SANS PERTINENCE, ou NON SATURÉE. Construisez trois graphes comme ceux de la fig. A2.9 pour illustrer ces trois cas. CONVAINQUEZ-VOUS que les trois conditions de (A2.32) rendent compte des trois cas. CONSTRUISEZ UN QUATRIÈME CAS montrant le cas « GÊNANT » évoqué dans le texte** […] »*

> **Piste (hors cours).**
>
> | Le cas | La configuration | Les conditions |
> |---|---|---|
> | **SATURÉE** | Le min libre est **en $x<0$** ; sur $x\geq0$, $f$ **croît** dès l'origine | $x^*=0$ **et** **$f'(0)>0$** |
> | **SATURÉE, SANS PERTINENCE** | Le min libre est **PILE en $0$** | $x^*=0$ **et** $f'(0)=0$ |
> | **NON SATURÉE** | Le min est **à l'intérieur** | $x^*>0$ **et** $f'(x^*)=0$ |
>
> ⚠️ **LE CAS GÊNANT** : $\tilde{x}=0$ **avec $f'(\tilde{x})<0$** — le produit $\tilde{x}f'(\tilde{x})$ **vaut ENCORE zéro**, mais **la fonction DÉCROÎT en entrant dans la région réalisable**, donc $\tilde{x}=0$ est **un MAXIMUM, pas un minimum**. **C'est précisément la condition 1 de (A2.32), $f'(x^*)\geq0$, qui l'écarte** — exactement le miroir de ce que fait $f'\leq0$ dans (A2.31).

</details>

<details class="details--riche">
<summary>

**A2.28 — énoncer Kuhn-Tucker pour un MINIMUM**

</summary>

> *« **Énoncez le théorème de Kuhn-Tucker pour le problème de minimisation suivant** »* :
>
> $$\min_{x_1,x_2}\ f(x_1,x_2)\qquad\text{s.c.}\qquad g(x_1,x_2)\leq0 \quad\text{et}\quad x_1\geq0,\ x_2\geq0$$

> **Piste (hors cours).** **La marche à suivre du livre** : *« tout problème de minimisation peut être résolu **EN MAXIMISANT LA NÉGATIVE** »*. On applique donc le théorème A2.20 à $-f$, avec les contraintes $g\leq0$ **et $-x_i\leq0$**.
>
> **Le résultat, avec $\mathcal{L}=f+\lambda g$** *( **noter le SIGNE PLUS**, conséquence du passage à $-f$)* — sous la qualification des contraintes, il existe $\lambda^*\geq0$ tel que :
>
> | # | La condition |
> |---|---|
> | **(i)** | $\dfrac{\partial f(\mathbf{x}^*)}{\partial x_i}+\lambda^*\dfrac{\partial g(\mathbf{x}^*)}{\partial x_i}\ \geq\ 0$, $i=1,2$ |
> | **(ii)** | $x_i^*\left[\dfrac{\partial f(\mathbf{x}^*)}{\partial x_i}+\lambda^*\dfrac{\partial g(\mathbf{x}^*)}{\partial x_i}\right]=0$ |
> | **(iii)** | $x_i^*\geq0$ |
> | **(iv)** | $\lambda^*\geq0$, $\ g(\mathbf{x}^*)\leq0$, $\ \lambda^*g(\mathbf{x}^*)=0$ |
>
> ⚠️ **La structure est EXACTEMENT celle du théorème A2.19(2) combinée à la complémentarité de Kuhn-Tucker** : les conditions de non-négativité produisent **des inégalités « $\geq0$ » avec complémentarité en $x_i$**, tandis que la contrainte $g$ produit **la complémentarité en $\lambda$**.

</details>

<details class="details--riche">
<summary>

**A2.30 — montrer que A2.20 REDONNE A2.19**

</summary>

> *« **Montrez que le théorème A2.20 se réduit au théorème A2.19 quand les seules contraintes sont $x_1\geq0,\dots,x_n\geq0$.** »*

> **Piste (hors cours) — le calcul complet.**
>
> **Écrire les contraintes sous la forme requise** : $\ g^i(\mathbf{x})=-x_i\leq0$, $i=1,\dots,n$. Alors
>
> $$\frac{\partial g^i}{\partial x_j}=\begin{cases}-1&\text{si } j=i\\0&\text{sinon}\end{cases}$$
>
> | La condition de Kuhn-Tucker | Ce qu'elle devient |
> |---|---|
> | $\dfrac{\partial f}{\partial x_i}-\sum_j\lambda_j^*\dfrac{\partial g^j}{\partial x_i}=0$ | $\dfrac{\partial f}{\partial x_i}+\lambda_i^*=0$ ⟹ $\dfrac{\partial f}{\partial x_i}=-\lambda_i^*$ |
> | $\lambda_i^*\geq0$ | ⟹ **$\dfrac{\partial f(\mathbf{x}^*)}{\partial x_i}\leq0$** *(condition (i) de A2.19)* |
> | $\lambda_i^*g^i(\mathbf{x}^*)=0$, soit $\lambda_i^*(-x_i^*)=0$ | ⟹ $\lambda_i^*x_i^*=0$ ⟹ **$x_i^*\dfrac{\partial f}{\partial x_i}=x_i^*(-\lambda_i^*)=0$** *(condition (ii))* |
> | $g^i(\mathbf{x}^*)\leq0$ | ⟹ **$x_i^*\geq0$** *(condition (iii))* |
>
> ⚠️ **Les trois conditions du théorème A2.19 sont EXACTEMENT les conditions de Kuhn-Tucker réécrites** — et le multiplicateur $\lambda_i^*$ **n'est autre que $-\partial f/\partial x_i$**, c'est-à-dire **la « pente perdue » à la frontière**.

</details>

<details class="details--riche">
<summary>

**A2.31 — les cinq qualifications des contraintes**

</summary>

> Avec **les $K$ premières contraintes SATURÉES** et une contrainte dite **LINÉAIRE si $g^j(\mathbf{x})=a_j+\mathbf{b}^j\cdot\mathbf{x}$**, le livre liste : **(i)** *« $\nabla g^1(\mathbf{x}^*),\dots,\nabla g^K(\mathbf{x}^*)$ sont **LINÉAIREMENT INDÉPENDANTS** »* **(ii)** *« **AUCUNE COMBINAISON CONVEXE** des $\nabla g^j(\mathbf{x}^*)$ n'est **le vecteur NUL** »* **(iii)** *« **il existe $\mathbf{z}$ tel que $\nabla g^j(\mathbf{x}^*)\cdot\mathbf{z}<0$ pour tout $j=1,\dots,K$** »* **(iv)** *« il existe $\mathbf{z}$ tel que $\nabla g^j(\mathbf{x}^*)\cdot\mathbf{z}\leq0$ pour tout $j$, **avec l'inégalité STRICTE pour les contraintes NON LINÉAIRES** »* **(v)** *(une condition de « courbe réalisable » différentiable)*
>
> **(a)** *« Montrez que **(i) ⟹ (ii) ⟹ (iii) ⟹ (iv) ⟹ (v)** »* · **(b)** *« Montrez que **(iv) est TOUJOURS satisfaite si TOUTES les contraintes sont LINÉAIRES** »* · **(c)** *« … prouvez que **si (v) tient, il existe des multiplicateurs NON NÉGATIFS** […] **Vous aurez donc GÉNÉRALISÉ le théorème A2.20.** »*

> **Piste (hors cours).** **La hiérarchie va DU PLUS FORT AU PLUS FAIBLE** : (i) est **la plus exigeante**, (v) **la plus faible**. **Plus la qualification est faible, plus le théorème s'applique largement** — **mais l'UNICITÉ des multiplicateurs se perd en chemin**, comme le livre le souligne : *« sauf en ce qui concerne l'unicité »*. **(iii) ⟹ (iv)** est immédiat *(une inégalité stricte partout implique a fortiori le mélange demandé)*. **(b)** : si toutes les contraintes sont linéaires, **(iv) n'exige plus AUCUNE inégalité stricte** — il suffit de prendre $\mathbf{z}=\mathbf{0}$, qui donne $\nabla g^j\cdot\mathbf{0}=0\leq0$ **La morale pratique** : **en programmation LINÉAIRE, la qualification est AUTOMATIQUE** — c'est pourquoi Kuhn-Tucker y fonctionne toujours.

</details>

<details class="details--riche">
<summary>

**A2.32 — la programmation QUASICONCAVE d'Arrow-Enthoven**

</summary>

> *« Arrow et Enthoven (1961) considèrent **le problème de PROGRAMMATION QUASICONCAVE** »* :
>
> $$\max_{\mathbf{x}}\ f(\mathbf{x})\qquad\text{s.c.}\qquad g(\mathbf{x})\leq0 \quad\text{et}\quad \mathbf{x}\geq\mathbf{0}$$
>
> *« où **$f(\mathbf{x})$ est QUASICONCAVE et $g(\mathbf{x})$ est QUASICONVEXE** ».* **(a)** *« **Montrez que si $\mathbf{x}^*$ est un maximum LOCAL, c'est aussi un maximum GLOBAL.** »* **(b)** *« **Montrez que si $f(\mathbf{x})$ est STRICTEMENT quasiconcave, alors le maximum global est UNIQUE.** »*

> **Piste (hors cours).**
>
> ⚠️ **L'observation préalable, décisive** : **L'ENSEMBLE RÉALISABLE EST CONVEXE.** En effet, $g$ **quasiconvexe** ⟹ **par le THÉORÈME A1.18**, **ses ensembles INFÉRIEURS $I(0)=\{g\leq0\}$ sont CONVEXES** ; et $\mathbb{R}^n_+$ est convexe ⟹ **leur INTERSECTION est convexe** *(théorème A1.1, [fiche 521](521-jehle-ensembles-applications.md))*.
>
> **(b) — LE PLUS DIRECT.** Si $\mathbf{x}^*$ et $\mathbf{x}'\neq\mathbf{x}^*$ étaient **deux maxima globaux**, on aurait $f(\mathbf{x}^*)=f(\mathbf{x}')=M$. **L'ensemble réalisable étant convexe**, $\mathbf{x}^t$ **est réalisable**, et **la STRICTE quasiconcavité** donne
>
> $$f(\mathbf{x}^t)>\min\big[f(\mathbf{x}^*),f(\mathbf{x}')\big]=M$$
>
> **ce qui CONTREDIT que $M$ soit le maximum.**
>
> **(a) — LE MÊME ARGUMENT, en local.** Si $\mathbf{x}'$ réalisable vérifiait $f(\mathbf{x}')>f(\mathbf{x}^*)$, alors pour $t$ **assez petit** $\mathbf{x}^t$ est **réalisable ET dans tout voisinage de $\mathbf{x}^*$**, et la quasiconcavité donne
>
> $$f(\mathbf{x}^t)\ \geq\ \min\big[f(\mathbf{x}'),f(\mathbf{x}^*)\big]=f(\mathbf{x}^*)$$
>
> <div class="callout" data-kind="plus">
>
> <span class="callout__lab">Enrichissement pédagogique (hors cours) — une réserve honnête sur (a).</span>
>
> Avec la quasiconcavité **SIMPLE**, l'argument ne fournit que **« $\geq$ »**, ce qui **ne contredit pas** un maximum local **au sens FAIBLE** *(« $f(\mathbf{x}^*)\geq f(\mathbf{x})$ dans un voisinage »)*. **Un témoin** : sur $[0,2]$, la fonction **constante sur $[0,1]$ puis croissante sur $[1,2]$** est **quasiconcave** *(elle est croissante au sens faible)*, et **tout point de $(0,1)$ est un maximum local faible SANS être global**. **La conclusion de (a) est correcte** dès que l'on lit *« maximum local »* **au sens STRICT**, ou dès que $f$ est **STRICTEMENT quasiconcave** — auquel cas l'inégalité devient $f(\mathbf{x}^t)>f(\mathbf{x}^*)$ et **la contradiction est immédiate**. **Le livre ne précise pas cette lecture ; il est prudent de l'expliciter dans une copie.**
>
> </div>
>
> ⚠️ **La portée** : c'est **ce résultat qui rend la microéconomie traitable** — on suppose **l'utilité QUASICONCAVE** et **les contraintes QUASICONVEXES** *(souvent linéaires)*, et **les conditions de Kuhn-Tucker deviennent alors SUFFISANTES pour un optimum GLOBAL.**

</details>

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Traiter $x\geq0$ comme une égalité | **Elle peut être SATURÉE ou NON** — c'est tout l'enjeu | Trois cas |
| 2 | Oublier le cas 2 | *« la contrainte est saturée **MAIS CELA N'A PAS VRAIMENT D'IMPORTANCE** »* | $x^*=0$ **et** $f'=0$ |
| 3 | Croire qu'une solution intérieure est la norme | *« **le CAS 3 SEUL correspond au genre que nous avons rencontré auparavant** »* |  |
| 4 | Ne retenir que $x^*f'(x^*)=0$ | *« **CELA SEUL NE SUFFIT PAS TOUT À FAIT** »* | Il faut **les TROIS conditions** |
| 5 | Oublier le cas « gênant » | **$\tilde{x}=0$ avec $f'>0$ donne AUSSI un produit nul — et c'est un MINIMUM** | D'où $f'\leq0$ |
| 6 | Inverser la condition 1 pour un min | **MAX : $f'\leq0$ · MIN : $f'\geq0$** | (A2.31) vs (A2.32) |
| 7 | Résoudre les conditions dans le désordre | **La RÈGLE DE POUCE : le TERME PRODUIT D'ABORD** | Exemple A2.10 |
| 8 | Garder une racine négative | **La condition 3 l'écarte** | $x=-2$ dans l'exemple A2.10 |
| 9 | Oublier de vérifier la condition 1 à la fin | *« **assurez-vous que les AUTRES conditions sont satisfaites** »* |  |
| 10 | Appliquer les conditions globalement à $n$ variables | *« **les trois conditions doivent tenir POUR CHAQUE VARIABLE SÉPARÉMENT** »* | Thm A2.19 |
| 11 | Croire que le théorème A2.19 est suffisant | **Ce sont des conditions NÉCESSAIRES** | Titre du théorème |
| 12 | Confondre programmation linéaire et non linéaire | *« **les problèmes LINÉAIRES sont UN CAS PARTICULIER des non linéaires** »* |  |
| 13 | Chercher une TANGENCE dans (A2.33) | *« en $\mathbf{x}^*$, **l'ensemble de niveau de $f$ N'EST TANGENT À AUCUNE** des lignes de contrainte »* | C'est un **coin** |
| 14 | Mal orienter les inégalités de pentes | *« **FAIBLEMENT PLUS RAIDE** que $g^1$ et **FAIBLEMENT PLUS PLATE** que $g^2$ »* | (A2.34) |
| 15 | Oublier de renverser en prenant les inverses | **Multiplier par $-1$ ET passer aux inverses renverse DEUX FOIS** | Le passage à (A2.34) |
| 16 | Croire que le gradient est tangent au niveau | **Il est PERPENDICULAIRE** *(note 5)* |  |
| 17 | Oublier la pente d'un vecteur | **Le vecteur $(z_1,z_2)$ a pour pente $z_2/z_1$** |  |
| 18 | Croire que le cône admet des coefficients négatifs | **COMBINAISON LINÉAIRE NON NÉGATIVE** | D'où $\lambda_j\geq0$ |
| 19 | Écrire $\lambda_j$ sans contrainte de signe | **Kuhn-Tucker EXIGE $\lambda_j^*\geq0$** — Lagrange non | La grande différence |
| 20 | Écrire les contraintes en $\geq0$ | **Le signe des $\lambda$ dépend de la convention $g^j\leq0$** |  |
| 21 | Oublier la complémentarité | **$\lambda_j^*g^j(\mathbf{x}^*)=0$** | La condition la plus caractéristique |
| 22 | Mal lire la complémentarité | *« si une contrainte est **LÂCHE**, son multiplicateur est **NUL** ; si un multiplicateur est **POSITIF**, sa contrainte est **SATURÉE** »* |  |
| 23 | Croire que $\lambda_j^*=0$ implique contrainte lâche | **NON** — le cas « saturée mais sans importance » a **les deux nuls** | Cas 2 |
| 24 | Croire Kuhn-Tucker suffisant | *« **QUE des conditions NÉCESSAIRES du PREMIER ORDRE pour les optima LOCAUX** »* |  |
| 25 | Ignorer où trouver les conditions suffisantes | *« **LUENBERGER (1973) ou ARROW ET ENTHOVEN (1961)** »* — quand $f$ est **concave ou quasiconcave** |  |
| 26 | Traiter les contraintes de non-négativité à part | *« **chaque contrainte de non-négativité peut s'écrire comme une fonction $g^j$** »* |  |
| 27 | Oublier que A2.20 ⟹ A2.19 | **Le théorème A2.19 est LE CAS PARTICULIER où $g^i=-x_i$** | Exercice A2.30 |
| 28 | Oublier la qualification des contraintes | **Le contre-exemple $g(x)=x^3\leq0$** | *« on ne peut pas simplement la supprimer »* |
| 29 | Croire le contre-exemple contradictoire | *« **CECI NE CONTREDIT PAS le théorème** parce que $\{\nabla g(x^*)\}=\{0\}$ **n'est PAS linéairement indépendant** »* |  |
| 30 | Croire l'indépendance linéaire seule possible | *« **UNE PARMI TOUTE UNE VARIÉTÉ** de qualifications »* | Exercice A2.31 |
| 31 | Croire les qualifications faibles gratuites | **Elles conservent l'EXISTENCE mais PAS l'UNICITÉ** |  |
| 32 | Croire que $\mathbf{x}^*$ peut être sur la frontière de $D$ | **Le théorème exige $\mathbf{x}^*$ INTÉRIEUR à $D$** | *(La contrainte, elle, peut être saturée)* |
| 33 | Oublier que $B$ doit être fermé | **Le théorème de séparation A2.24 l'exige** | Exercice A2.29 |
| 34 | Rater le rôle de $\mathbf{0}\in B$ | **C'est ce qui donne $\mathbf{p}\cdot\mathbf{a}^*>0$** | Pas 2 de la preuve |
| 35 | Oublier pourquoi $\lambda$ « assez grand » | **Si $\mathbf{p}\cdot\nabla g^j>0$, on peut faire exploser $\mathbf{p}\cdot\mathbf{b}$ et violer (P.1)** |  |
| 36 | Confondre $\mathbf{p}$ et $\mathbf{z}$ | **$\mathbf{p}$ vient de la SÉPARATION · $\mathbf{z}$ de la SURJECTIVITÉ de $G$** | Et l'on combine $\mathbf{p}+\delta\mathbf{z}$ |
| 37 | Croire les multiplicateurs sans signification | **Ils mesurent LA VALEUR MARGINALE du relâchement de la contrainte** | Exercice A2.33 |
| 38 | Minimiser directement avec les conditions de max | **Maximiser $-f$ SOUS LES MÊMES contraintes** |  |
| 39 | Croire l'ensemble réalisable toujours convexe | **Il l'est si $g$ est QUASICONVEXE** *(thm A1.18)* | Exercice A2.32 |
| 40 | Croire qu'un max local est global sans hypothèse | **Il faut $f$ QUASICONCAVE et l'ensemble réalisable CONVEXE** | Exercice A2.32(a) |

## 📌 Ultimate Review

**§A2.3.5 — LA NON-NÉGATIVITÉ.**

$$\max_x\ f(x)\qquad\text{s.c.}\qquad x\geq0 \tag{A2.30}$$

**LES TROIS CAS (figure A2.9)** :

| Le cas | La configuration | Les conditions |
|---|---|---|
| **1 — SATURÉE** | *« le maximum global est en $x_1<0$, **qui VIOLE la contrainte** »* | $x^*=0$, $f'(x^*)<0$ |
| **2 — saturée, SANS IMPORTANCE** | *« maximisée **PILE au point $x^*=0$** »* | $x^*=0$, $f'(x^*)=0$ |
| **3 — NON saturée** | *« **SOLUTION INTÉRIEURE** »* | $x^*>0$, $f'(x^*)=0$ |

⚠️ **LE POINT COMMUN** : *« **DANS CHAQUE CAS, MULTIPLIEZ LES DEUX CONDITIONS et remarquez que LE PRODUIT SERA TOUJOURS ZÉRO !** »*

⚠️ **LE CAS GÊNANT à écarter** : $\tilde{x}=0$ avec $f'(\tilde{x})>0$ — *« **le produit vaut ENCORE zéro MÊME SI $\tilde{x}$ est UN MINIMUM** »*.

$$\boxed{\;\textbf{(A2.31) — MAX} : \ f'(x^*)\leq0,\quad x^*f'(x^*)=0,\quad x^*\geq0\\\textbf{(A2.32) — MIN} : \ f'(x^*)\geq0,\quad x^*f'(x^*)=0,\quad x^*\geq0\;}$$

⚠️ **SEULE LA CONDITION 1 CHANGE DE SENS.**

**LA RÈGLE DE POUCE** *(exemple A2.10)* : *« **CONCENTREZ-VOUS SUR LE TERME PRODUIT. RÉSOLVEZ-LE D'ABORD, PUIS ASSUREZ-VOUS QUE LES AUTRES CONDITIONS SONT SATISFAITES.** »*

**THÉORÈME A2.19** : **les trois conditions tiennent POUR CHAQUE VARIABLE SÉPARÉMENT**, avec **les PARTIELLES à la place de la dérivée**.

**§A2.3.6 — KUHN-TUCKER.**

$$\max\ f(x_1,x_2)\qquad\text{s.c.}\qquad g^1\leq0,\ g^2\leq0 \tag{A2.33}$$

⚠️ **UN PROBLÈME DE PROGRAMMATION NON LINÉAIRE** — *« les problèmes LINÉAIRES en sont **UN CAS PARTICULIER** »*.

**LA DÉRIVATION GÉOMÉTRIQUE** :

1. La pente du niveau de $f$ est *« **FAIBLEMENT PLUS RAIDE** que celle de $g^1$ »* et *« **FAIBLEMENT PLUS PLATE** que celle de $g^2$ »* ⟹ **(A2.34)**
2. **Un vecteur $(z_1,z_2)$ a pour pente $z_2/z_1$** ⟹ **(A2.34) encadre LA PENTE DE $\nabla f$ entre celles de $\nabla g^1$ et $\nabla g^2$**
3. *(Note 5)* **le GRADIENT est PERPENDICULAIRE à son ensemble de niveau**
4. ⟹ **$\nabla f(\mathbf{x}^*)$ EST DANS LE CÔNE des COMBINAISONS LINÉAIRES NON NÉGATIVES de $\nabla g^1$ et $\nabla g^2$**

$$\boxed{\;\textbf{« À L'OPTIMUM, LE GRADIENT DE $f$ S'EXPRIME COMME UNE COMBINAISON}\\\textbf{LINÉAIRE NON NÉGATIVE DES GRADIENTS DES CONTRAINTES SATURÉES. »}\;}$$

**THÉORÈME A2.20 (KUHN-TUCKER)** — sous **l'INDÉPENDANCE LINÉAIRE des gradients des contraintes SATURÉES**, il existe **un $\boldsymbol{\lambda}^*$ UNIQUE** avec :

$$\frac{\partial f(\mathbf{x}^*)}{\partial x_i}-\sum_{j=1}^{m}\lambda_j^*\frac{\partial g^j(\mathbf{x}^*)}{\partial x_i}=0 \qquad\qquad \lambda_j^*\geq0,\quad g^j(\mathbf{x}^*)\leq0,\quad \lambda_j^*g^j(\mathbf{x}^*)=0$$

*La preuve* : poser $B$ = **le cône**, supposer $\nabla f\notin B$, **SÉPARER par le théorème A2.24** ⟹ **(P.1)-(P.2)** ; **l'indépendance linéaire rend $G$ SURJECTIVE** ⟹ **(P.3)** ; **combiner en $\mathbf{p}+\delta\mathbf{z}$** ⟹ **une direction RÉALISABLE qui AUGMENTE $f$** ⟹ **contradiction**.

⚠️ **LA COMPLÉMENTARITÉ DES ÉCARTS** : *« **si une contrainte est LÂCHE, son multiplicateur est NUL ; si un multiplicateur est POSITIF, sa contrainte est SATURÉE** »* — et **$\lambda_j^*$ mesure « L'AUGMENTATION MARGINALE de la fonction objectif quand la $j$-ième contrainte est RELÂCHÉE »**.

⚠️ **KUHN-TUCKER N'EST QUE NÉCESSAIRE** : *« des conditions SUFFISANTES sont disponibles quand la fonction objectif est **CONCAVE OU QUASICONCAVE** »* *(Luenberger 1973 · Arrow et Enthoven 1961)*.

**LA QUALIFICATION DES CONTRAINTES** — le contre-exemple :

$$\max\ x \quad\text{s.c.}\quad x^3\leq0 \qquad\Longrightarrow\qquad x^*=0,\ \ \nabla g(x^*)=0,\ \ \nabla f(x^*)=1$$

⚠️ **La conclusion du théorème ÉCHOUE** — mais **sans contradiction**, car $\{\mathbf{0}\}$ **n'est pas linéairement indépendant**. *« **On ne peut pas simplement supprimer la qualification des contraintes.** »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Pourquoi faut-il modifier l'analyse lagrangienne ?**

</summary>

> *« Dans de nombreuses applications économiques, nous devons optimiser **sous des contraintes QUI IMPLIQUENT DES INÉGALITÉS, AU LIEU DE — OU EN PLUS DE — simples égalités. Par exemple, UNE RESTRICTION DE BON SENS est d'exiger que LES VARIABLES ÉCONOMIQUES NE SOIENT DISPONIBLES QU'EN QUANTITÉS NON NÉGATIVES.** »*

⚠️ *« **L'analyse lagrangienne DOIT ÊTRE MODIFIÉE.** »* Le livre commence par *« **LE PROBLÈME LE PLUS SIMPLE POSSIBLE** »* : $\max_x f(x)$ s.c. $x\geq0$ **(A2.30)**.

</details>

<details class="details--riche">
<summary>

**2. Décrire les trois cas de la figure A2.9.**

</summary>

| Le cas | Ce que dit le livre | Les conditions |
|---|---|---|
| **1** | *« le max global est en $x_1$, **MAIS $x_1<0$ N'EST PAS RÉALISABLE** […] atteint **SUR LA FRONTIÈRE**. **LA CONTRAINTE EST SATURÉE.** »* | $x^*=0$, **$f'(x^*)<0$** |
| **2** | *« **ATTEIGNABLE, MAIS TOUT JUSTE** […] maximisée **PILE au point $x^*=0$**. Saturée, **mais cela n'a pas vraiment d'importance.** »* | $x^*=0$, $f'(x^*)=0$ |
| **3** | *« **le CAS 3 SEUL correspond au genre rencontré auparavant** […] **SOLUTION INTÉRIEURE** parce que la solution est **STRICTEMENT à l'intérieur** »* | $x^*>0$, $f'(x^*)=0$ |

</details>

<details class="details--riche">
<summary>

**3. Quel est le point commun aux trois cas ?**

</summary>

> *« **Y a-t-il quelque chose de COMMUN AUX TROIS ? REGARDEZ ATTENTIVEMENT. DANS CHAQUE CAS, MULTIPLIEZ LES DEUX CONDITIONS ENSEMBLE et remarquez que LE PRODUIT SERA TOUJOURS ZÉRO !** »*

$$x^*\big[f'(x^*)\big]=0$$

⚠️ **Mais** *« **CELA SEUL NE SUFFIT PAS TOUT À FAIT** »*.

</details>

<details class="details--riche">
<summary>

**4. Quel est le cas « GÊNANT », et comment l'écarter ?**

</summary>

> *« En $\tilde{x}=0$ avec **$f'(\tilde{x})>0$**, en augmentant $x$ **en s'éloignant de la frontière et en entrant dans la région réalisable, LA VALEUR DE LA FONCTION AUGMENTERA. NÉANMOINS, LE PRODUIT $\tilde{x}f'(\tilde{x})=0$ MÊME SI $\tilde{x}$ EST UN MINIMUM, PAS UN MAXIMUM.** »*

> ⚠️ *« Nous pouvons ÉCARTER cette possibilité **EN EXIGEANT SIMPLEMENT QUE LA FONCTION SOIT NON CROISSANTE** quand nous augmentons $x$ »* ⟹ **la condition $f'(x^*)\leq0$**.

</details>

<details class="details--riche">
<summary>

**5. Énoncer (A2.31) et (A2.32).**

</summary>

|  | MAXIMUM (A2.31) | MINIMUM (A2.32) |
|---|---|---|
| **1** | $f'(x^*)\leq0$ | $f'(x^*)\geq0$ |
| **2** | $x^*\big[f'(x^*)\big]=0$ | $x^*\big[f'(x^*)\big]=0$ |
| **3** | $x^*\geq0$ | $x^*\geq0$ |

⚠️ **Pour le minimum**, *« le cas gênant surgit **si la fonction est DÉCROISSANTE à la frontière**. Nous l'écartons **en exigeant que la dérivée soit NON NÉGATIVE** »*.

</details>

<details class="details--riche">
<summary>

**6. Refaire l'exemple A2.10 et énoncer la règle de pouce.**

</summary>

$\max\ 6-x^2-4x$ s.c. $x\geq0$ ⟹ $f'(x)=-2x-4$.

> ⚠️ *« **Une RÈGLE DE POUCE qui marche habituellement est de SE CONCENTRER SUR LE TERME PRODUIT. RÉSOLVEZ-LE D'ABORD, PUIS assurez-vous que les autres conditions sont satisfaites.** »*

$$2x^*\big[x^*+2\big]=0 \ \Longrightarrow\ x=0 \text{ ou } x=-2$$

⚠️ **La condition 3 écarte $x=-2$** ; **la condition 1 donne $-4\leq0$** ⟹ $x^*=0$.

</details>

<details class="details--riche">
<summary>

**7. Énoncer le théorème A2.19.**

</summary>

> *« De manière **TOUT À FAIT SENSÉE**, (A2.31) et (A2.32) se généralisent […] **LES TROIS CONDITIONS DOIVENT TENIR POUR CHAQUE VARIABLE SÉPARÉMENT, avec LES DÉRIVÉES PARTIELLES substituées à la dérivée unique.** »*

**MAX** : $\ \dfrac{\partial f(\mathbf{x}^*)}{\partial x_i}\leq0$, $\ x_i^*\dfrac{\partial f(\mathbf{x}^*)}{\partial x_i}=0$, $\ x_i^*\geq0$ **MIN** : $\ \dfrac{\partial f(\mathbf{x}^*)}{\partial x_i}\geq0$ *(les deux autres inchangées)*

</details>

<details class="details--riche">
<summary>

**8. Distinguer programmation linéaire et non linéaire.**

</summary>

> *« Un tel problème est communément appelé **UN PROBLÈME DE PROGRAMMATION NON LINÉAIRE. Dans les problèmes LINÉAIRES, UNE FONCTION LINÉAIRE est optimisée SOUS DES CONTRAINTES D'INÉGALITÉ LINÉAIRES. Dans (A2.33), IL N'Y A PAS DE TELLES LIMITATIONS, de sorte que LES PROBLÈMES LINÉAIRES SONT UN CAS PARTICULIER DES NON LINÉAIRES.** »*

⚠️ *« **Les méthodes pour le cas général DOIVENT BEAUCOUP À L'ÉTUDE PRÉCOCE DU CAS LINÉAIRE.** »*

</details>

<details class="details--riche">
<summary>

**9. Construire l'encadrement des pentes (A2.34).**

</summary>

**En $\mathbf{x}^*$ où les deux contraintes sont saturées**, la pente du niveau de $f$ doit être :

| # | La condition et sa raison |
|---|---|
| **1** | *« **FAIBLEMENT PLUS RAIDE** que celle de $g^1$. **AUTREMENT, IL Y AURAIT DES POINTS RÉALISABLES AU NORD-OUEST QUI ATTEIGNENT UNE VALEUR PLUS ÉLEVÉE.** »* |
| **2** | *« **FAIBLEMENT PLUS PLATE** que celle de $g^2$ »* |

**Après multiplication par $-1$ et passage aux inverses** :

$$\frac{\partial g^1/\partial x_2}{\partial g^1/\partial x_1}\leq\frac{\partial f/\partial x_2}{\partial f/\partial x_1}\leq\frac{\partial g^2/\partial x_2}{\partial g^2/\partial x_1} \tag{A2.34}$$

</details>

<details class="details--riche">
<summary>

**10. Passer des pentes aux GRADIENTS.**

</summary>

> *« **UN VECTEUR $(z_1,z_2)$, ÉTANT LE SEGMENT DE L'ORIGINE AU POINT, A POUR PENTE $z_2/z_1$.** »*

⟹ **les trois termes de (A2.34) sont les PENTES des trois gradients** ⟹ *« **la pente de $\nabla f(\mathbf{x}^*)$ SE TROUVE ENTRE celles de $\nabla g^1(\mathbf{x}^*)$ et $\nabla g^2(\mathbf{x}^*)$** »*.

> *(Note 5.)* *« **les pentes des vecteurs gradients sont LES INVERSES OPPOSÉS des pentes de leurs ensembles de niveau. PAR CONSÉQUENT, ILS SONT PERPENDICULAIRES À LEURS ENSEMBLES DE NIVEAU.** »*

</details>

<details class="details--riche">
<summary>

**11. Décrire le CÔNE et sa conséquence.**

</summary>

> *« **LE CÔNE HACHURÉ AU NORD-EST de la fig. A2.12 est L'ENSEMBLE DE TOUS LES VECTEURS qui peuvent s'écrire comme UNE COMBINAISON LINÉAIRE NON NÉGATIVE de $\nabla g^1(\mathbf{x}^*)$ et $\nabla g^2(\mathbf{x}^*)$. ÉVIDEMMENT, $\nabla f(\mathbf{x}^*)$ SE TROUVE DANS CET ENSEMBLE.** »*

⟹ **il existe $\lambda_1^*,\lambda_2^*\geq0$** avec $\ \nabla f(\mathbf{x}^*)-\sum_j\lambda_j^*\nabla g^j(\mathbf{x}^*)=\mathbf{0}$.

⚠️ *(Les gradients sont dessinés **« COMME SI $\mathbf{x}^*$ ÉTAIT L'ORIGINE »**.)*

</details>

<details class="details--riche">
<summary>

**12. Énoncer le théorème A2.20.**

</summary>

$\mathbf{x}^*$ **intérieur à $D$** maximise $f$ sous $g^j\leq0$ ; $f$ et les $g^j$ **continûment différentiables** au voisinage. **Si les $\nabla g^j(\mathbf{x}^*)$ des contraintes SATURÉES sont LINÉAIREMENT INDÉPENDANTS**, il existe **un $\boldsymbol{\lambda}^*$ UNIQUE** avec

$$\frac{\partial f}{\partial x_i}-\sum_{j=1}^{m}\lambda_j^*\frac{\partial g^j}{\partial x_i}=0 \qquad \lambda_j^*\geq0 \qquad g^j(\mathbf{x}^*)\leq0 \qquad \lambda_j^*g^j(\mathbf{x}^*)=0$$

⚠️ **Trois nouveautés par rapport à Lagrange** : **le SIGNE des $\lambda_j$**, **les contraintes en INÉGALITÉ**, **la COMPLÉMENTARITÉ**.

</details>

<details class="details--riche">
<summary>

**13. Résumer la preuve du théorème A2.20.**

</summary>

| Étape | L'argument |
|---|---|
| **1** | **Supposer les $K$ premières contraintes SATURÉES**, poser $\lambda_j^*=0$ pour les autres ⟹ **la complémentarité est automatique** |
| **2** | **Définir le cône** $B=\{\sum_{j\leq K}\lambda_j\nabla g^j(\mathbf{x}^*),\ \lambda_j\geq0\}$ — **CONVEXE et FERMÉ** |
| **3** | **Il SUFFIT de montrer $\nabla f(\mathbf{x}^*)\in B$** *(l'unicité venant de l'indépendance linéaire)* |
| **4** | **Par l'absurde** : si $\nabla f\notin B$, **le THÉORÈME A2.24 SÉPARE** ⟹ $\mathbf{p}\cdot\mathbf{a}^*>\mathbf{p}\cdot\mathbf{b}$ **(P.1)**, d'où $\nabla f\cdot\mathbf{p}>0$ et $\nabla g^j\cdot\mathbf{p}\leq0$ **(P.2)** |
| **5** | **L'indépendance linéaire rend $G$ SURJECTIVE** ⟹ il existe $\mathbf{z}$ avec $\nabla g^j\cdot\mathbf{z}<0$ **(P.3)** |
| **6** | **Combiner** : $\ \nabla f\cdot(\mathbf{p}+\delta\mathbf{z})>0$ **(P.4)**, mais $\mathbf{x}^*+\varepsilon(\mathbf{p}+\delta\mathbf{z})$ **est RÉALISABLE** ⟹ **CONTRADICTION** |

⚠️ **En une phrase** : **si $\nabla f$ sortait du cône, on construirait une direction réalisable qui augmente $f$.**

</details>

<details class="details--riche">
<summary>

**14. Énoncer la complémentarité des écarts.**

</summary>

> *« La conclusion que $\lambda_j^*g^j(\mathbf{x}^*)=0$ est appelée **LA COMPLÉMENTARITÉ DES ÉCARTS**. »*

> ⚠️ *« Elle dit que **SI UNE CONTRAINTE EST LÂCHE, SON MULTIPLICATEUR DOIT ÊTRE NUL, tandis que SI UN MULTIPLICATEUR EST POSITIF, SA CONTRAINTE DOIT ÊTRE SATURÉE.** »*

⚠️ **Et le sens économique** : *« **$\lambda_j^*$ peut s'interpréter comme L'AUGMENTATION MARGINALE DE LA FONCTION OBJECTIF QUAND LA $j$-IÈME CONTRAINTE EST RELÂCHÉE** »* *(exercice A2.33)*.

</details>

<details class="details--riche">
<summary>

**15. Que Kuhn-Tucker ne donne-t-il PAS ?**

</summary>

> *« **Les conditions de Kuhn-Tucker ne sont QUE DES CONDITIONS NÉCESSAIRES DU PREMIER ORDRE pour les optima LOCAUX. DES CONDITIONS SUFFISANTES SONT DISPONIBLES QUAND LA FONCTION OBJECTIF EST CONCAVE OU QUASICONCAVE** *(Luenberger 1973 ; Arrow et Enthoven 1961)*. **Pour nos besoins, les conditions nécessaires SUFFISENT.** »*

</details>

<details class="details--riche">
<summary>

**16. Comment le théorème A2.20 redonne-t-il A2.19 ?**

</summary>

> *« Le théorème A2.20 **s'applique encore** puisque **chaque contrainte de non-négativité peut s'écrire comme une fonction $g^j$. EN EFFET, si les contraintes de non-négativité sont LES SEULES, alors LE THÉORÈME A2.20 SE RÉDUIT AU THÉORÈME A2.19.** »*

**Le calcul** *(exercice A2.30)* : avec $g^i(\mathbf{x})=-x_i$, la stationnarité donne $\partial f/\partial x_i=-\lambda_i^*\leq0$, la complémentarité $\lambda_i^*x_i^*=0$ donne $x_i^*\partial f/\partial x_i=0$, et la réalisabilité $x_i^*\geq0$.

</details>

<details class="details--riche">
<summary>

**17. Le contre-exemple de la qualification des contraintes.**

</summary>

$$\max\ f(x)=x \qquad\text{s.c.}\qquad g(x)=x^3\leq0,\qquad D=(-\infty,\infty)$$

⟹ **$x^*=0$, $\nabla g(x^*)=0$, $\nabla f(x^*)=1$** ⟹ *« **LA CONCLUSION DU THÉORÈME A2.20 ÉCHOUE** »* *(on ne peut pas avoir $1-\lambda\cdot0=0$)*.

> *« **Ceci NE CONTREDIT PAS le théorème parce que l'ensemble singleton $\{\nabla g(x^*)\}$ N'EST PAS LINÉAIREMENT INDÉPENDANT. Ainsi, ON NE PEUT PAS SIMPLEMENT SUPPRIMER LA QUALIFICATION DES CONTRAINTES.** »*

⚠️ **L'indépendance linéaire est *« UNE PARMI TOUTE UNE VARIÉTÉ »*** — les autres *(exercice A2.31)* **préservent l'EXISTENCE mais PAS L'UNICITÉ** des multiplicateurs.

</details>

<details class="details--riche">
<summary>

**18. Traiter la programmation quasiconcave (exercice A2.32).**

</summary>

$\max f$ s.c. $g\leq0$, $\mathbf{x}\geq\mathbf{0}$, avec **$f$ QUASICONCAVE et $g$ QUASICONVEXE**.

⚠️ **L'observation clé** : **$g$ quasiconvexe** ⟹ *(théorème A1.18)* **$\{g\leq0\}$ est CONVEXE** ⟹ *(théorème A1.1)* **L'ENSEMBLE RÉALISABLE EST CONVEXE**.

**(b) L'unicité** : deux maxima globaux distincts $\mathbf{x}^*,\mathbf{x}'$ de même valeur $M$ donneraient, **par STRICTE quasiconcavité**, $f(\mathbf{x}^t)>\min=M$ ⟹ **contradiction**

**(a) Local ⟹ global** : le même argument donne $f(\mathbf{x}^t)\geq f(\mathbf{x}^*)$ — **strictement concluant si le maximum local est pris AU SENS STRICT, ou si $f$ est STRICTEMENT quasiconcave** *(enrichissement hors cours)*.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La restriction « de bon sens » ? | **Les quantités doivent être NON NÉGATIVES** |
| Le problème (A2.30) ? | $\max_x f(x)$ s.c. $x\geq0$ |
| Cas 1 de la fig. A2.9 ? | **$x^*=0$, $f'(x^*)<0$ — contrainte SATURÉE** |
| Cas 2 ? | $x^*=0$, $f'(x^*)=0$ — **saturée MAIS SANS IMPORTANCE** |
| Cas 3 ? | **$x^*>0$, $f'(x^*)=0$ — SOLUTION INTÉRIEURE** |
| Le point commun aux trois ? | **Le PRODUIT $x^*f'(x^*)$ est NUL** |
| Suffit-il ? | **NON — « pas tout à fait »** |
| Le cas « gênant » ? | **$\tilde{x}=0$ avec $f'>0$ — c'est un MINIMUM** |
| Comment l'écarter ? | **En exigeant $f'\leq0$** |
| Les trois conditions (A2.31) ? | $f'\leq0$ · $x^*f'=0$ · $x^*\geq0$ |
| Pour un MINIMUM (A2.32) ? | **$f'\geq0$** *(les deux autres inchangées)* |
| La règle de pouce ? | **RÉSOUDRE LE TERME PRODUIT D'ABORD** |
| La solution de l'exemple A2.10 ? | $x^*=0$ |
| Théorème A2.19 ? | **Les trois conditions POUR CHAQUE VARIABLE** |
| Ces conditions sont… ? | **NÉCESSAIRES** |
| Le problème (A2.33) ? | **PROGRAMMATION NON LINÉAIRE** |
| La programmation linéaire est… ? | **UN CAS PARTICULIER** |
| Y a-t-il tangence en $\mathbf{x}^*$ ? | **NON — « tangent à AUCUNE des lignes »** |
| La pente du niveau de $f$ vs $g^1$ ? | **FAIBLEMENT PLUS RAIDE** |
| vs $g^2$ ? | **FAIBLEMENT PLUS PLATE** |
| Pourquoi ? | **Sinon il y aurait des points réalisables MEILLEURS au NORD-OUEST** |
| La pente d'un vecteur $(z_1,z_2)$ ? | $z_2/z_1$ |
| Le gradient et son niveau ? | **PERPENDICULAIRES** |
| Ce qu'est le CÔNE ? | **Les COMBINAISONS LINÉAIRES NON NÉGATIVES des gradients** |
| Où se trouve $\nabla f(\mathbf{x}^*)$ ? | **DANS LE CÔNE** |
| Théorème A2.20, la stationnarité ? | $\partial f/\partial x_i-\sum_j\lambda_j^*\partial g^j/\partial x_i=0$ |
| Le signe des $\lambda_j^*$ ? | **$\geq0$** |
| La condition caractéristique ? | **$\lambda_j^*g^j(\mathbf{x}^*)=0$** |
| Son nom ? | **LA COMPLÉMENTARITÉ DES ÉCARTS** |
| Ce qu'elle dit ? | **Contrainte LÂCHE ⟹ multiplicateur NUL · multiplicateur POSITIF ⟹ contrainte SATURÉE** |
| Le sens économique de $\lambda_j^*$ ? | **L'augmentation MARGINALE de l'objectif quand la contrainte est RELÂCHÉE** |
| L'hypothèse sur $\mathbf{x}^*$ ? | **INTÉRIEUR à $D$** |
| L'hypothèse sur les gradients ? | **LINÉAIREMENT INDÉPENDANTS, pour les contraintes SATURÉES** |
| Combien de $\boldsymbol{\lambda}^*$ ? | **UN SEUL — il est UNIQUE** |
| L'outil central de la preuve ? | **LE THÉORÈME DE SÉPARATION A2.24** |
| Pourquoi $\mathbf{p}\cdot\mathbf{a}^*>0$ ? | **Parce que $\mathbf{0}\in B$** |
| Le rôle de $\mathbf{z}$ ? | **La SURJECTIVITÉ de $G$ donne $\nabla g^j\cdot\mathbf{z}<0$** |
| L'idée de la preuve en une phrase ? | **Hors du cône, on construit une direction RÉALISABLE qui AUGMENTE $f$** |
| Kuhn-Tucker est-il suffisant ? | **NON — seulement NÉCESSAIRE** |
| Quand a-t-on des conditions suffisantes ? | **Quand $f$ est CONCAVE ou QUASICONCAVE** |
| Les références citées ? | **Luenberger (1973) · Arrow et Enthoven (1961)** |
| Les contraintes $x_i\geq0$ ? | **S'écrivent $g^i=-x_i\leq0$** |
| A2.20 avec elles seules ? | **SE RÉDUIT à A2.19** |
| Le contre-exemple de la qualification ? | **$\max x$ s.c. $x^3\leq0$** |
| Pourquoi échoue-t-il ? | **$\nabla g(0)=0$ n'est PAS linéairement indépendant** |
| Peut-on supprimer la qualification ? | **NON** |
| D'autres qualifications existent-elles ? | **OUI — mais l'UNICITÉ se perd** |
| Comment minimiser ? | **Maximiser $-f$ sous LES MÊMES contraintes** |
| L'ensemble réalisable est convexe si… ? | **$g$ est QUASICONVEXE** *(thm A1.18)* |
| Programmation quasiconcave, (b) ? | **$f$ strictement quasiconcave ⟹ maximum global UNIQUE** |
| Le coût de la contrainte dans A2.26 ? | **$10-6=4$** |
