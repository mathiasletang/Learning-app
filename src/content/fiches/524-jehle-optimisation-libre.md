# Fiche 524 — Optimisation libre : conditions du premier et du second ordre

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — appendice mathématique, §A2.2 « Optimisation » (p. 566-577) |
| **Difficulté** | Avancé — le socle de tous les programmes du consommateur et de la firme |
| **Temps d'étude estimé** | 120 min |
| **Prérequis** | [Fiche 523](523-jehle-calcul-differentiel-homogeneite.md) — gradient, hessienne, définitude, théorème A2.4 · [Fiche 522](522-jehle-fonctions-reelles-concavite.md) — concavité stricte |
| **Concepts clés** | Maximum local, maximum global, optimum unique, optimum intérieur, optimum de frontière, condition nécessaire du premier ordre (FONC), condition nécessaire du second ordre (SONC), point critique, conditions suffisantes, point d'inflexion, mineur principal, hessienne définie négative, théorème local-global, unicité de l'optimum global |
| **Poids à l'examen** | Le vocabulaire **local / global / unique / intérieur / de frontière** · le **théorème A2.8** *(FONC et SONC à une variable)* · **l'astuce $g(t)=f(\mathbf{x}^*+t\mathbf{z})$**, qui porte TOUTES les preuves · le **théorème A2.9** *($\nabla f(\mathbf{x}^*)=\mathbf{0}$)* · le **théorème A2.10** *(hessienne semi-définie)* · les **MINEURS PRINCIPAUX** et le **théorème A2.11** avec sa preuve à deux variables · le **théorème A2.12** *(conditions SUFFISANTES)* · le **THÉORÈME A2.13 LOCAL-GLOBAL** · les **théorèmes A2.14 et A2.15** *(unicité)*. |

## 🎯 Vue d'ensemble

```
LE FIL DU §A2.2 : de la condition NECESSAIRE a l'unicite GLOBALE

  LE VOCABULAIRE  (figure A2.4)

     MAXIMUM LOCAL   f(x*) >= f(x)  dans un VOISINAGE
     MAXIMUM GLOBAL  f(x*) >= f(x)  dans TOUT LE DOMAINE
     UNIQUE          l'inegalite est STRICTE pour x DIFFERENT de x*
     INTERIEUR       le point est DANS L'INTERIEUR du domaine
     DE FRONTIERE    le point est SUR UN « BORD » du domaine

     « En theorie economique, nous n'avons que RAREMENT besoin
       de CALCULER les optima. Nous voulons juste
       LES CARACTERISER. »

  THEOREME A2.8  UNE VARIABLE  ( toutes NECESSAIRES )

     MAXIMUM  =>  f'(x*) = 0   (FONC)   et  f''(x*) <= 0  (SONC)
     MINIMUM  =>  f'(x~) = 0   (FONC)   et  f''(x~) >= 0  (SONC)

  L'ASTUCE QUI PORTE TOUTES LES PREUVES :

     g(t) = f(x* + t z)     ->    g atteint un extremum en t = 0
     g'(0) = GRADIENT(f)(x*) z          g''(0) = z' H(x*) z

  §A2.2.1  THEOREME A2.9  ( FONC )

     « L'equation UNIQUE f'(x*) = 0 se GENERALISE au SYSTEME
       de n equations SIMULTANEES  GRADIENT(f)(x*) = 0 . »

  §A2.2.2  THEOREME A2.10  ( SONC )

     MAXIMUM  =>  H(x*) SEMI-DEFINIE NEGATIVE
     MINIMUM  =>  H(x~) SEMI-DEFINIE POSITIVE

  ... mais les conditions NECESSAIRES NE SUFFISENT PAS.

  LES MINEURS PRINCIPAUX  D_1(x), D_2(x), ..., D_n(x)

  THEOREME A2.11  ( SUFFISANT pour la DEFINITUDE )
     (-1)^i D_i(x) > 0  pour tout i   ->  DEFINIE NEGATIVE
                                      ->  les mineurs ALTERNENT
                                          EN COMMENCANT PAR NEGATIF
     D_i(x) > 0  pour tout i          ->  DEFINIE POSITIVE

  THEOREME A2.12  ( SUFFISANT pour l'OPTIMUM LOCAL )
     f_i(x*) = 0  ET  (-1)^i D_i(x*) > 0   ->  MAXIMUM local
     f_i(x~) = 0  ET  D_i(x~) > 0          ->  MINIMUM local

  THEOREME A2.13  LOCAL-GLOBAL   ( f CONCAVE )
     GRADIENT(f)(x*) = 0  <=>  max LOCAL  <=>  max GLOBAL

  THEOREME A2.14  f STRICTEMENT concave  ->  le maximiseur
                  global est UNIQUE

  THEOREME A2.15  f STRICTEMENT concave ET GRADIENT nul
                  ->  UNIQUE MAXIMISEUR GLOBAL
```

> ⚠️ **Note de transcription — spécifique à cette section.** Le PDF **PERD LES SYMBOLES « PRIME »** : *« $f(x^*)=0$ »* dans le théorème A2.8 signifie **$f'(x^*)=0$**, et *« $f(x^*)\leq0$ »* signifie **$f''(x^*)\leq0$**. Il **PERD LE BARRÉ DE $\neq$** *(« pour tout $x=x^*$ » signifie $x\neq x^*$)*, **PERD $\gg$** *(« pour tout $\mathbf{x}\ 0$ » signifie $\mathbf{x}\gg0$)*, perd $\sum$, et **brouille l'ordre des mots** dans un paragraphe de l'exemple A2.6 *(la phrase sur la méthode de substitution ressort comme une bouillie de lettres)*. Les figures utilisent l'encodage Symbol Mac *(`ϭ` = « = », `Ͼ` = « &gt; », `Ͻ` = « &lt; », `Ն` = $\geq$, `Յ` = $\leq$)*. **Réparation de transcription, non ajout de contenu.**

## 🟠 Concept 1 — Le programme du chapitre et le vocabulaire

### 1.1 Ce que le livre annonce

> *« Cette section est consacrée à **L'APPROCHE PAR LE CALCUL des problèmes d'OPTIMISATION, LA FORME DE PROBLÈME LA PLUS COMMUNE EN THÉORIE MICROÉCONOMIQUE.** »*

> ⚠️ *« Bien que nous ne nous attardions pas ici assez longtemps pour acquérir **une maîtrise TRÈS SOPHISTIQUÉE** de tous les points fins mathématiques, **NOUS VISERONS QUELQUE CHOSE DE PLUS PROFOND QU'UNE SIMPLE COMPRÉHENSION « LIVRE DE RECETTES » des techniques impliquées. Notre but sera de bâtir, À PARTIR D'UNE BONNE COMPRÉHENSION DU CAS À UNE VARIABLE, une SAISIE INTUITIVE FORTE des principes à l'œuvre.** »*

### 🔴 1.2 Les six définitions, mot pour mot

| Le terme | La définition du livre |
|---|---|
| **MAXIMUM LOCAL** en $x^*$ | *« $f(x^*)\geq f(x)$ pour tout $x$ **DANS UN VOISINAGE de $x^*$** »* |
| **MAXIMUM GLOBAL** en $x^*$ | *« $f(x^*)\geq f(x)$ pour tout $x$ **DANS LE DOMAINE de la fonction** »* |
| **MAXIMUM LOCAL UNIQUE** | *« $f(x^*)>f(x)$ pour tout $x\neq x^*$ dans un voisinage »* |
| **MAXIMUM GLOBAL UNIQUE** | *« $f(x^*)>f(x)$ pour tout $x\neq x^*$ dans le domaine »* |
| **MINIMUM (local/global)** en $\tilde{x}$ | *« $f(\tilde{x})\leq f(x)$ »* — **strictement pour les versions uniques** |

### 🔴 1.3 Intérieur contre frontière (figure A2.4)

> *« La fonction atteint **des maxima LOCAUX en $x_1$, $x_3$ et $x_5$ ; un maximum GLOBAL est atteint en $x_3$. Le maximum global en $x_3$, CEPENDANT, N'EST PAS UNIQUE.** »*

> ⚠️ *« Les maxima locaux en $x_1$ et $x_3$ sont appelés **MAXIMA INTÉRIEURS**, parce que $x_1$ et $x_3$ sont **DANS L'INTÉRIEUR du domaine $D$, PAS À SES « BORDS ». Les maxima comme celui atteint en $x_5$ sont appelés MAXIMA DE FRONTIÈRE.** »*

> *« De même, en $x_0$, $x_2$ et $x_4$, il y a **des minima locaux ; en $x_4$, un minimum global. Ceux en $x_2$ et $x_4$ sont des minima INTÉRIEURS, et celui en $x_0$ est un minimum DE FRONTIÈRE.** »*

⚠️ **Tout le §A2.2 ne traite QUE des optima INTÉRIEURS.** *(Les optima de frontière relèvent du §A2.3.)*

### 🔴 1.4 Le programme du théoricien

> *« Dans vos cours de calcul, **l'accent tendait à porter sur L'APPLICATION de ces tests et l'apprentissage du CALCUL des optima. En théorie économique, cependant, NOUS N'AVONS QUE RAREMENT BESOIN DE CALCULER effectivement les optima. À la place, nous voulons habituellement JUSTE LES CARACTÉRISER — ÉPELER LES CONDITIONS QUI DOIVENT TENIR À L'OPTIMUM, et travailler ENSUITE AVEC CES CONDITIONS, plutôt qu'avec des nombres spécifiques.** »*

## 🟠 Concept 2 — Le théorème A2.8 : le cas d'une variable

### 2.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.8 — Conditions nécessaires pour les optima intérieurs locaux dans le cas à une variable</span>

Soit $f(x)$ **deux fois continûment différentiable**. Alors $f(x)$ atteint un **optimum intérieur local** : **1.** un **MAXIMUM** en $x^*$ $\Rightarrow$ $\ f'(x^*)=0$ **(FONC)** et $\ f''(x^*)\leq0$ **(SONC)** **2.** un **MINIMUM** en $\tilde{x}$ $\Rightarrow$ $\ f'(\tilde{x})=0$ **(FONC)** et $\ f''(\tilde{x})\geq0$ **(SONC)**

</div>

⚠️ **FONC** $=$ *first-order necessary conditions* · **SONC** $=$ *second-order necessary conditions*.

### 2.2 Le contenu géométrique (figure A2.5)

| Le panneau | Ce que le livre écrit |
|---|---|
| **(a) — un MAXIMUM** | *« $f'(x^*)=0$ et **$f'(x)$ est DÉCROISSANTE** là où $f(x)$ atteint un maximum »* — avec $f'(x^1)>0$, $f'(x^2)<0$, $f''(x^*)\leq0$ |
| **(b) — un MINIMUM** | *« $f'(\tilde{x})=0$ et **$f'(x)$ est CROISSANTE** là où $f(x)$ atteint un minimum »* — avec $f'(x^1)<0$, $f'(x^2)>0$, $f''(\tilde{x})\geq0$ |

## 🔴 Concept 3 — §A2.2.1 : la généralisation à $n$ variables

### 3.1 Les définitions par $\varepsilon$-boules

> *« **Beaucoup de l'intuition et de la terminologie familière SE TRANSPOSE.** […] La fonction atteint **un maximum local en $\mathbf{x}^*$ si AUCUN PETIT MOUVEMENT s'éloignant de $\mathbf{x}^*$ DANS QUELQUE DIRECTION QUE CE SOIT ne fait AUGMENTER la valeur de la fonction.** »*

> *« Dans $\mathbb{R}^n$, **une $\varepsilon$-boule centrée en $\mathbf{x}^*$, $B_\varepsilon(\mathbf{x}^*)$, contient tous les points AUSSI PROCHES DE $\mathbf{x}^*$ QUE NOUS CHOISISSONS DE LES RENDRE.** »*

$$\textbf{MAX LOCAL} : \exists\,\varepsilon>0 \ \text{tel que} \ f(\mathbf{x}^*)\geq f(\mathbf{x}) \ \forall\,\mathbf{x}\in B_\varepsilon(\mathbf{x}^*)$$

$$\textbf{MAX GLOBAL} : f(\mathbf{x}^*)\geq f(\mathbf{x}) \ \forall\,\mathbf{x}\in D$$

⚠️ **Les versions UNIQUES** remplacent $\geq$ par $>$ **pour tout $\mathbf{x}\neq\mathbf{x}^*$**. *(Cf. la définition A1.4 des boules, [fiche 521](521-jehle-ensembles-applications.md).)*

### 🔴 3.2 L'ASTUCE — celle qui porte toutes les preuves du chapitre

> *« Nous avons **déjà vu** comment on peut faire bon usage de la fonction $g(t)=f(\mathbf{x}+t\mathbf{z})$ pour divers vecteurs $\mathbf{x}$ et $\mathbf{z}$ **afin de RÉDUIRE UNE QUESTION SUR LES FONCTIONS DE PLUSIEURS VARIABLES À UNE QUESTION SUR LES FONCTIONS D'UNE SEULE VARIABLE. LA MÊME TECHNIQUE SERA UTILISÉE ICI.** »*

$$\boxed{\;\textbf{« LA CLÉ est de noter que si la fonction $f$ de plusieurs variables est MAXIMISÉE}\\\textbf{en $\mathbf{x}^*$, alors POUR TOUT VECTEUR $\mathbf{z}$, la fonction d'une seule variable}\\\textbf{$g(t)=f(\mathbf{x}^*+t\mathbf{z})$ SERA MAXIMISÉE EN $t=0$. »}\;}$$

> *« Ainsi, **nous pouvons appliquer les conditions nécessaires du premier et du second ordre pour les fonctions d'une seule variable à $g$ AU POINT $t=0$. Ceci conduira alors à des conditions sur LE GRADIENT et LA HESSIENNE de la fonction $f$ au point $\mathbf{x}^*$.** »*

### 3.3 L'intuition du gradient nul

> *« **L'analogue de la dérivée qui s'annule à un optimum sera que LE VECTEUR GRADIENT DOIT ÊTRE NUL à un optimum.** Ceci est **assez INTUITIF**, car cela dit simplement que **si $f$ est maximisée en $\mathbf{x}^*$, alors IL VAUDRAIT MIEUX QU'IL NE SOIT PAS POSSIBLE D'AUGMENTER LA VALEUR DE $f$ EN AUGMENTANT OU EN DIMINUANT L'UN QUELCONQUE DES $x_i$ EN LAISSANT TOUS LES AUTRES FIXÉS.** »*

$$\boxed{\;\textbf{« L'équation UNIQUE du premier ordre $f'(x^*)=0$ SE GÉNÉRALISE au}\\\textbf{SYSTÈME DU PREMIER ORDRE DE $n$ ÉQUATIONS SIMULTANÉES, $\nabla f(\mathbf{x}^*)=\mathbf{0}$. »}\;}$$

## 🔴 Concept 4 — Le théorème A2.9 (FONC)

### 4.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.9 — Condition nécessaire du premier ordre pour les optima intérieurs locaux des fonctions réelles</span>

Si la fonction **différentiable** $f(\mathbf{x})$ atteint **un maximum OU un minimum intérieur local** en $\mathbf{x}^*$, alors $\mathbf{x}^*$ **résout le système d'équations simultanées**

$$\frac{\partial f(\mathbf{x}^*)}{\partial x_1}=0,\qquad \frac{\partial f(\mathbf{x}^*)}{\partial x_2}=0,\qquad \dots,\qquad \frac{\partial f(\mathbf{x}^*)}{\partial x_n}=0$$

</div>

### 4.2 La preuve

<details class="details--riche">
<summary>

**La preuve — et pourquoi le livre choisit la version « pas la plus simple »**

</summary>

> ⚠️ *« **La preuve que nous donnons N'EST PAS LA PLUS SIMPLE, MAIS ELLE SERA UTILE quand nous considérerons LES CONDITIONS DU SECOND ORDRE.** »*

**Choisir $\mathbf{z}\in\mathbb{R}^n$ quelconque** et poser

$$g(t)=f(\mathbf{x}^*+t\mathbf{z}) \tag{P.1}$$

| Pas | L'argument, mot pour mot |
|---|---|
| **1** | *« pour $t\neq0$, **$\mathbf{x}^*+t\mathbf{z}$ est juste UN VECTEUR DIFFÉRENT de $\mathbf{x}^*$**, donc $g(t)$ coïncide avec une valeur de $f$ »* |
| **2** | *« pour $t=0$, $\mathbf{x}^*+t\mathbf{z}$ **est le MÊME que $\mathbf{x}^*$**, donc $g(0)$ coïncide avec la valeur de $f$ en $\mathbf{x}^*$ »* |
| **3** | *« **$g(t)$ DOIT atteindre un extremum local en $t=0$ parce que nous avons supposé que $f$ atteint un extremum en $\mathbf{x}^*$** »* |
| **4** | **Par le THÉORÈME A2.8**, $\ g'(0)=0$ |
| **5** | **Par la règle de composition** : $\ g'(t)=\sum_i\dfrac{\partial f(\mathbf{x}^*+t\mathbf{z})}{\partial x_i}z_i$ |
| **6** | **En $t=0$** : $\ g'(0)=\sum_i\dfrac{\partial f(\mathbf{x}^*)}{\partial x_i}z_i=\nabla f(\mathbf{x}^*)\mathbf{z}=0$ |
| **7** | ***« Parce que ceci doit tenir POUR TOUT vecteur $\mathbf{z}$ de $\mathbb{R}^n$ — EN PARTICULIER POUR CHACUN DES $n$ VECTEURS UNITAIRES — cela implique que CHACUNE des partielles de $f$ doit être NULLE »*** ⟹ $\nabla f(\mathbf{x}^*)=\mathbf{0}$ |

$\blacksquare$

</details>

<details class="details--riche">
<summary>

**EXEMPLE A2.6 — trouver un point critique, avec l'inversion matricielle**

</summary>

Soit $\ y=x_2-4x_1^2+3x_1x_2-x_2^2$. **Les deux partielles** :

$$\frac{\partial f}{\partial x_1}=-8x_1+3x_2 \qquad\qquad \frac{\partial f}{\partial x_2}=1+3x_1-2x_2$$

> *« Nous aurons un point critique en un vecteur $(x_1^*,x_2^*)$ **où ces deux-là s'annulent SIMULTANÉMENT** »* :

$$-8x_1^*+3x_2^*=0 \qquad\qquad 1+3x_1^*-2x_2^*=0 \tag{E.1}$$

> ⚠️ *« **Parce que le système est (COMMODÉMENT) LINÉAIRE, nous pouvons FAIRE UN PEU PLUS ÉLABORÉ** »* — l'écrire **sous forme matricielle** :

$$\underbrace{\begin{pmatrix}-8&3\\3&-2\end{pmatrix}}_{A}\begin{pmatrix}x_1\\x_2\end{pmatrix}=\begin{pmatrix}0\\-1\end{pmatrix} \tag{E.2}$$

**L'inversion** — *« parce que le déterminant $|A|=16-9=7$ »* :

$$A^{-1}=\frac{1}{|A|}\begin{pmatrix}-2&-3\\-3&-8\end{pmatrix}=\begin{pmatrix}-\tfrac27&-\tfrac37\\[2pt]-\tfrac37&-\tfrac87\end{pmatrix}$$

**En prémultipliant (E.2) par $A^{-1}$** :

$$\begin{pmatrix}x_1^*\\x_2^*\end{pmatrix}=\begin{pmatrix}-\tfrac27&-\tfrac37\\[2pt]-\tfrac37&-\tfrac87\end{pmatrix}\begin{pmatrix}0\\-1\end{pmatrix}=\begin{pmatrix}\tfrac37\\[2pt]\tfrac87\end{pmatrix}$$

> ⚠️ *« Ainsi, la fonction atteint **un POINT CRITIQUE en $x_1^*=3/7$ et $x_2^*=8/7$. NOUS NE SAVONS PAS ENCORE si nous avons trouvé un MAXIMUM ou un MINIMUM. POUR CELA, IL FAUT REGARDER LES CONDITIONS DU SECOND ORDRE.** »*

*( **Le paragraphe du livre qui précède (E.2) est illisible dans le PDF — les lettres y sont mélangées.** D'après le contexte et l'exercice A2.15, il y est question de **LA MÉTHODE DE SUBSTITUTION** : résoudre une équation pour $x_2^*$, la reporter dans l'autre, et obtenir $x_1^*$. Le calcul donne bien $x_2^*=\tfrac{8x_1^*}{3}$ puis $3-7x_1^*=0$, soit $x_1^*=3/7$ — **le même résultat**.)*

</details>

## 🔴 Concept 5 — §A2.2.2 : le théorème A2.10 (SONC)

### 5.1 L'intuition

> *« Intuitivement, **les conditions du second ordre dans le cas multivarié SONT LES MÊMES QUE DANS LE CAS À UNE VARIABLE. Une fois que nous avons trouvé un point où $\nabla f(\mathbf{x})=\mathbf{0}$, nous savons que nous avons UN MAXIMUM si la fonction est « LOCALEMENT CONCAVE » là, et UN MINIMUM si elle est « LOCALEMENT CONVEXE ».** »*

> *« **Le théorème A2.4 a souligné que LA COURBURE DÉPEND DE LA PROPRIÉTÉ DE DÉFINITUDE DE LA HESSIENNE.** »* ⟹ localement **concave** si $H$ **semi-définie négative**, localement **convexe** si **semi-définie positive**.

### 5.2 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.10 — Condition nécessaire du second ordre pour les optima intérieurs locaux des fonctions réelles</span>

Soit $f(\mathbf{x})$ **deux fois continûment différentiable**. **1.** Si $f(\mathbf{x})$ atteint un **MAXIMUM intérieur local** en $\mathbf{x}^*$, alors **$H(\mathbf{x}^*)$ est SEMI-DÉFINIE NÉGATIVE.** **2.** Si $f(\mathbf{x})$ atteint un **MINIMUM intérieur local** en $\tilde{\mathbf{x}}$, alors **$H(\tilde{\mathbf{x}})$ est SEMI-DÉFINIE POSITIVE.**

</div>

### 5.3 La preuve

<details class="details--riche">
<summary>

**La preuve — elle recycle exactement le montage du théorème A2.9**

</summary>

> *« **Nous pouvons bâtir DIRECTEMENT à partir de la preuve du théorème A2.9.** »*

Avec $g(t)=f(\mathbf{x}+t\mathbf{z})$ et $\mathbf{x}$ **point critique de $f$** : *« si $f$ atteint un point critique en $\mathbf{x}$, alors **$g$ atteint un point critique en $t=0$** »*, et $g'(t)=\sum_i f_i(\mathbf{x}+t\mathbf{z})z_i$.

**En différentiant une seconde fois** *(règle de composition à nouveau)* :

$$g''(t)=\sum_{j=1}^{n}\sum_{i=1}^{n}\frac{\partial^2f(\mathbf{x}+t\mathbf{z})}{\partial x_i\partial x_j}\,z_iz_j \tag{P.1}$$

| Pas | L'argument |
|---|---|
| **1** | Si $f$ est **maximisée** en $\mathbf{x}^*$, alors **par le THÉORÈME A2.8**, $\ g''(0)\leq0$ |
| **2** | **Évaluer (P.1) en $\mathbf{x}^*$ et $t=0$** : $\ g''(0)=\sum_j\sum_i\dfrac{\partial^2f(\mathbf{x}^*)}{\partial x_i\partial x_j}z_iz_j\leq0$, c'est-à-dire $\ \mathbf{z}^{T}H(\mathbf{x}^*)\mathbf{z}\leq0$ |
| **3** | *« **Parce que $\mathbf{z}$ était ARBITRAIRE, ceci signifie que $H(\mathbf{x}^*)$ est SEMI-DÉFINIE NÉGATIVE.** »* |
| **4** | *« De même, **si $f$ est minimisée en $\tilde{\mathbf{x}}$, alors $g''(0)\geq0$**, de sorte que $H(\tilde{\mathbf{x}})$ est semi-définie positive »* |

$\blacksquare$

⚠️ **C'est ici que se paie le choix de la preuve « pas la plus simple » du théorème A2.9** : le montage $g(t)$ se réutilise **tel quel**.

</details>

## 🔴 Concept 6 — Nécessaire n'est pas suffisant

### 6.1 Ce que les théorèmes A2.9 et A2.10 permettent — et ne permettent pas

> *« Les théorèmes A2.9 et A2.10 sont **importants et utiles. Nous pouvons les utiliser pour CARACTÉRISER un optimum (intérieur) CHAQUE FOIS QUE NOUS SAVONS, OU SUPPOSONS, QU'IL EN EXISTE UN. LES DEUX SONT DES CONDITIONS NÉCESSAIRES**, nous permettant de faire des énoncés comme : « **SI $\mathbf{x}^*$ maximise $f(\mathbf{x})$, ALORS $f_i(\mathbf{x}^*)=0$ et $H(\mathbf{x}^*)$ est semi-définie négative** ». »*

> ⚠️ *« Ces conditions peuvent aider à **LOCALISER des maxima (ou minima) POTENTIELS**, mais **POUR VÉRIFIER QU'ILS MAXIMISENT (ou minimisent) EFFECTIVEMENT la fonction, NOUS AVONS BESOIN DE CONDITIONS SUFFISANTES.** »*

### 6.2 Ce que les conditions suffisantes permettent

> *« Les conditions suffisantes nous permettent de faire des énoncés comme : « **SI TELLE ET TELLE CHOSE se produit en $\mathbf{x}$, ALORS $\mathbf{x}$ OPTIMISE la fonction** ». Avec de telles conditions, **nous pourrions RÉSOUDRE pour $\mathbf{x}$ ET SAVOIR que la fonction y est optimisée. […] Comme on peut le suspecter, ELLES SONT PLUS STRINGENTES que les conditions nécessaires.** »*

**Les conditions suffisantes, énoncées simplement** :

| # | La condition |
|---|---|
| **1** | *« Si $f_i(\mathbf{x}^*)=0$ pour $i=1,\dots,n$ **ET $H(\mathbf{x}^*)$ est DÉFINIE NÉGATIVE** en $\mathbf{x}^*$, alors $f(\mathbf{x})$ atteint **un MAXIMUM local** en $\mathbf{x}^*$ »* |
| **2** | *« si $f_i(\tilde{\mathbf{x}})=0$ **ET $H(\tilde{\mathbf{x}})$ est DÉFINIE POSITIVE**, alors $f(\mathbf{x})$ atteint **un MINIMUM local** en $\tilde{\mathbf{x}}$ »* |

> ⚠️ *« Les conditions suffisantes exigent que le point en question soit **UN POINT CRITIQUE**, et exigent que **LES CONDITIONS DE COURBURE TIENNENT DANS LEURS FORMES STRICTES. (CECI SERT À ÉCARTER LA POSSIBILITÉ DE PRENDRE UN POINT D'INFLEXION POUR UN OPTIMUM.)** Par exemple, quand $H(\mathbf{x}^*)$ est définie négative, **la fonction sera STRICTEMENT CONCAVE DANS UNE BOULE autour de $\mathbf{x}^*$**. »*

### 🔴 6.3 Le nœud pratique

> *« **LOCALISER UN POINT CRITIQUE EST FACILE. Nous posons simplement toutes les dérivées partielles premières égales à zéro et résolvons le système de $n$ équations. DÉTERMINER SI LA HESSIENNE EST DÉFINIE NÉGATIVE OU POSITIVE LÀ SERA GÉNÉRALEMENT MOINS FACILE.** »*

## 🔴 Concept 7 — Les mineurs principaux et le théorème A2.11

### 7.1 La définition

> *« **Divers tests** pour déterminer la propriété de définitude de la hessienne **portent sur LE PATRON DE SIGNES affiché par LES DÉTERMINANTS DE CERTAINES SOUS-MATRICES formées à partir d'elle** au point (ou dans la région) en question. **Ces déterminants sont appelés LES MINEURS PRINCIPAUX de la hessienne.** »*

$$D_1(\mathbf{x})\equiv|f_{11}|=f_{11} \qquad D_2(\mathbf{x})\equiv\begin{vmatrix}f_{11}&f_{12}\\f_{21}&f_{22}\end{vmatrix} \qquad \dots \qquad D_n(\mathbf{x})\equiv\begin{vmatrix}f_{11}&\cdots&f_{1n}\\\vdots&\ddots&\vdots\\f_{n1}&\cdots&f_{nn}\end{vmatrix}$$

> ⚠️ *« Chacun est **LE DÉTERMINANT DE LA MATRICE OBTENUE QUAND LES $(n-i)$ DERNIÈRES LIGNES ET COLONNES de la hessienne $H(\mathbf{x})$ SONT SUPPRIMÉES**, pour $i=1,\dots,n$. **On les appelle mineurs PRINCIPAUX parce qu'ils sont obtenus à partir de sous-matrices formées EN DESCENDANT LA DIAGONALE PRINCIPALE de la hessienne.** »*

### 7.2 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.11 — Conditions suffisantes de définitude négative et positive de la hessienne</span>

Soit $f(\mathbf{x})$ **deux fois continûment différentiable**, et $D_i(\mathbf{x})$ le mineur principal d'ordre $i$ de $H(\mathbf{x})$. **1.** **Si $(-1)^{i}D_i(\mathbf{x})>0$ pour $i=1,\dots,n$, alors $H(\mathbf{x})$ est DÉFINIE NÉGATIVE.** **2.** **Si $D_i(\mathbf{x})>0$ pour $i=1,\dots,n$, alors $H(\mathbf{x})$ est DÉFINIE POSITIVE.** **Si la condition 1 tient pour TOUT $\mathbf{x}$ du domaine, alors $f$ est STRICTEMENT CONCAVE. Si la condition 2 tient pour tout $\mathbf{x}$, alors $f$ est STRICTEMENT CONVEXE.**

</div>

### 🔴 7.3 La lecture en clair

> *« En particulier, ce théorème dit que **la fonction sera STRICTEMENT CONCAVE si LES MINEURS PRINCIPAUX DE LA HESSIENNE ALTERNENT TOUJOURS EN SIGNE, EN COMMENÇANT PAR NÉGATIF. Elle sera STRICTEMENT CONVEXE si les mineurs principaux sont TOUS POSITIFS.** »*

$$\boxed{\;\textbf{DÉFINIE NÉGATIVE} : \ D_1<0,\ D_2>0,\ D_3<0,\ \dots \qquad\qquad \textbf{DÉFINIE POSITIVE} : \ D_i>0 \ \forall i\;}$$

### 7.4 La preuve, cas de deux variables

<details class="details--riche">
<summary>

**L'aveu du livre, puis la preuve complète**

</summary>

> *« **Une preuve COMPLÈTEMENT GÉNÉRALE invoquerait la partie 4 du théorème A2.4** puis réduirait le problème à établir que si les mineurs principaux d'une matrice alternent en signe, alors la forme quadratique correspondante est définie négative. **Ceci, à son tour, EST UN RÉSULTAT BIEN CONNU EN ALGÈBRE LINÉAIRE. Le lecteur intéressé peut consulter tout texte standard sur ce point. Par exemple, voir Hohn (1973). ICI, NOUS DONNERONS UNE PREUVE SIMPLE POUR LE CAS DE DEUX VARIABLES.** »*

Avec $y=f(x_1,x_2)$, **les deux mineurs** — *« où nous avons utilisé le fait que $f_{12}=f_{21}$ »* *(YOUNG)* :

$$D_1(\mathbf{x})\equiv f_{11} \qquad\qquad D_2(\mathbf{x})\equiv f_{11}f_{22}-(f_{12})^2 \tag{P.1}$$

**La forme quadratique**, pour $\mathbf{z}=(z_1,z_2)\neq(0,0)$ :

$$\mathbf{z}^{T}H(\mathbf{x})\mathbf{z}=\sum_{j=1}^{2}\sum_{i=1}^{2}f_{ij}z_iz_j=f_{11}(z_1)^2+2f_{12}z_1z_2+f_{22}(z_2)^2 \tag{P.2}$$

⚠️ **LE TOUR DE FORCE — compléter le carré.** Supposer $z_2\neq0$. *« Notez que nous pouvons **AJOUTER ET SOUSTRAIRE LA MÊME CHOSE** au membre de droite de (P.2) **SANS RIEN CHANGER** »* — à savoir la quantité $(f_{12})^2(z_2)^2/f_{11}$ :

$$\mathbf{z}^{T}H\mathbf{z}=\underbrace{f_{11}(z_1)^2+2f_{12}z_1z_2+\frac{(f_{12})^2(z_2)^2}{f_{11}}}_{\text{on factorise }f_{11}}+\underbrace{f_{22}(z_2)^2-\frac{(f_{12})^2(z_2)^2}{f_{11}}}_{\text{on factorise }(z_2)^2}$$

*« **En reconnaissant le premier terme comme UN CARRÉ et en mettant le second sur un DÉNOMINATEUR COMMUN** »* :

$$\boxed{\;\mathbf{z}^{T}H(\mathbf{x})\mathbf{z}=f_{11}\left(z_1+\frac{f_{12}}{f_{11}}z_2\right)^{2}+\frac{f_{11}f_{22}-(f_{12})^2}{f_{11}}\,(z_2)^2\;} \tag{P.3}$$

| Le cas | La lecture de (P.3) |
|---|---|
| **Les mineurs ALTERNENT, en commençant NÉGATIF** *($f_{11}<0$, $D_2>0$)* | *« **le premier produit est NON POSITIF** »* *(car $f_{11}<0$ multiplie un carré)* **et** *« **le dernier est STRICTEMENT NÉGATIF parce que $z_2\neq0$ et parce que LE NUMÉRATEUR ET LE DÉNOMINATEUR ont des SIGNES OPPOSÉS** »* ⟹ $\mathbf{z}^{T}H\mathbf{z}<0$ |
| **Les deux mineurs POSITIFS** | *« **les deux termes sont NON NÉGATIFS ET L'UN EST POSITIF** »* ⟹ $\mathbf{z}^{T}H\mathbf{z}>0$ |

$\blacksquare$

⚠️ **Le rôle exact de $D_2$** : c'est **le NUMÉRATEUR $f_{11}f_{22}-(f_{12})^2$** du second terme — et **son signe opposé à celui de $f_{11}$** est précisément ce qui rend le terme strictement négatif.

</details>

## 🔴 Concept 8 — Le théorème A2.12 : les conditions suffisantes

### 8.1 L'énoncé

> *« Nous sommes maintenant prêts à énoncer les conditions suffisantes. **Ces conditions DÉCOULENT DIRECTEMENT de ce qui a déjà été établi, de sorte qu'elles n'ont besoin d'AUCUNE JUSTIFICATION SUPPLÉMENTAIRE. Nous rassemblons simplement les fils et écrivons les conditions DE MANIÈRE COMPACTE pour faciliter les références futures.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.12 — Conditions suffisantes pour les optima intérieurs locaux des fonctions réelles</span>

Soit $f(\mathbf{x})$ **deux fois continûment différentiable**. **1.** **Si $f_i(\mathbf{x}^*)=0$ ET $(-1)^{i}D_i(\mathbf{x}^*)>0$, $i=1,\dots,n$, alors $f(\mathbf{x})$ atteint un MAXIMUM LOCAL en $\mathbf{x}^*$.** **2.** **Si $f_i(\tilde{\mathbf{x}})=0$ ET $D_i(\tilde{\mathbf{x}})>0$, $i=1,\dots,n$, alors $f(\mathbf{x})$ atteint un MINIMUM LOCAL en $\tilde{\mathbf{x}}$.**

</div>

<details class="details--riche">
<summary>

**EXEMPLE A2.7 — la vérification du point critique de l'exemple A2.6**

</summary>

Avec $f(x_1,x_2)=x_2-4x_1^2+3x_1x_2-x_2^2$, **les partielles secondes** :

$$\frac{\partial^2f}{\partial x_1^2}=-8 \qquad \frac{\partial^2f}{\partial x_1\partial x_2}=3 \qquad \frac{\partial^2f}{\partial x_2\partial x_1}=3 \qquad \frac{\partial^2f}{\partial x_2^2}=-2$$

$$H(\mathbf{x})=\begin{pmatrix}-8&3\\3&-2\end{pmatrix}$$

**Les mineurs principaux** :

$$D_1(\mathbf{x})=|-8|=-8<0 \qquad\qquad D_2(\mathbf{x})=\begin{vmatrix}-8&3\\3&-2\end{vmatrix}=16-9=7>0$$

> ⚠️ *« **Parce qu'ils ALTERNENT EN SIGNE, EN COMMENÇANT PAR NÉGATIF, le théorème A2.12 nous dit que $\mathbf{x}^*=(3/7,\,8/7)$ est UN MAXIMUM LOCAL.** »*

**La remarque qui prépare la suite** :

> ⚠️ *« Vous avez peut-être remarqué dans cet exemple que **LA HESSIENNE ÉTAIT COMPLÈTEMENT INDÉPENDANTE DE $\mathbf{x}$. Nous obtiendrions donc le même patron alternant PEU IMPORTE OÙ nous les évaluons. Au théorème A2.11, nous avons observé que CECI SUFFIT À GARANTIR QUE LA FONCTION EST STRICTEMENT CONCAVE. Essayez maintenant d'imaginer le graphe d'une telle fonction strictement concave en trois dimensions. S'IL A LA MOINDRE COLLINE, IL SEMBLE QU'IL NE PEUT EN AVOIR QU'UNE, ET CELLE-CI DOIT AVOIR UN SEUL POINT LE PLUS HAUT.** »*

</details>

## 🔴 Concept 9 — Le théorème A2.13 : local-global

### 9.1 L'intuition

> *« En effet, à partir de la fig. A2.5, **il est INTUITIVEMENT CLAIR que TOUT MAXIMUM (MINIMUM) LOCAL d'une fonction CONCAVE (CONVEXE) DOIT AUSSI ÊTRE UN MAXIMUM (MINIMUM) GLOBAL. Cette intuition s'étend AUSSI au cas multivarié. Dans les problèmes d'optimisation (NON CONTRAINTE) multivariés, LES OPTIMA LOCAUX ET GLOBAUX COÏNCIDENT quand la fonction est SOIT CONCAVE SOIT CONVEXE.** »*

> *« **Comme d'habitude, nous ne traitons que le cas des fonctions CONCAVES.** »*

### 9.2 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.13 — Théorème LOCAL-GLOBAL (non contraint)</span>

Soit $f$ une fonction réelle **deux fois continûment différentiable et CONCAVE** sur $D$. Les énoncés suivants sont **équivalents**, où $\mathbf{x}^*$ est **un point INTÉRIEUR de $D$** : **1.** $\nabla f(\mathbf{x}^*)=\mathbf{0}$. **2.** $f$ atteint **un MAXIMUM LOCAL** en $\mathbf{x}^*$. **3.** **$f$ atteint un MAXIMUM GLOBAL en $\mathbf{x}^*$.**

</div>

### 9.3 La preuve

<details class="details--riche">
<summary>

**La preuve — cinq lignes, et le seul pas non trivial**

</summary>

> *« **Clairement, 3 ⟹ 2, et par le théorème A2.9, 2 ⟹ 1. Il ne reste donc qu'à montrer que 1 ⟹ 3.** »*

| Pas | L'argument |
|---|---|
| **1** | **Supposer** $\nabla f(\mathbf{x}^*)=\mathbf{0}$ |
| **2** | *« Parce que **$f$ est CONCAVE, le THÉORÈME A2.4 implique que POUR TOUT $\mathbf{x}$ du domaine** »* : $$f(\mathbf{x})\leq f(\mathbf{x}^*)+\nabla f(\mathbf{x}^*)(\mathbf{x}-\mathbf{x}^*)$$ |
| **3** | **Le terme du gradient s'ANNULE** ⟹ *« ensemble, ces deux relations impliquent que **pour tout $\mathbf{x}$, $f(\mathbf{x})\leq f(\mathbf{x}^*)$** »* |
| **4** | ⟹ *« **$f$ atteint un maximum GLOBAL en $\mathbf{x}^*$** »* |

$\blacksquare$

⚠️ **Tout repose sur l'énoncé 3 du théorème A2.4** — *« la tangente est au-dessus du graphe »*. **Si le plan tangent est HORIZONTAL, il plafonne la fonction PARTOUT, pas seulement localement.**

</details>

### 🔴 9.4 La limite du théorème A2.13

> *« Le théorème A2.13 dit que **sous convexité ou concavité, TOUT OPTIMUM LOCAL EST UN OPTIMUM GLOBAL. NOTEZ, CEPENDANT, QU'IL EST TOUJOURS POSSIBLE QUE LA VALEUR LA PLUS BASSE (LA PLUS HAUTE) SOIT ATTEINTE EN PLUS D'UN POINT DU DOMAINE. Si nous voulons que la valeur la plus haute ou la plus basse soit atteinte EN UN POINT UNIQUE, NOUS DEVONS IMPOSER LA CONCAVITÉ OU LA CONVEXITÉ STRICTE.** »*

## 🔴 Concept 10 — Les théorèmes A2.14 et A2.15 : l'unicité

### 10.1 Le théorème A2.14

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.14 — Concavité/convexité stricte et unicité des optima globaux</span>

**1.** Si $\mathbf{x}^*$ **maximise la fonction STRICTEMENT CONCAVE $f$**, alors $\mathbf{x}^*$ est **LE maximiseur global UNIQUE** : $f(\mathbf{x}^*)>f(\mathbf{x})$ pour tout $\mathbf{x}\in D$, $\mathbf{x}\neq\mathbf{x}^*$. **2.** Si $\tilde{\mathbf{x}}$ **minimise la fonction STRICTEMENT CONVEXE $f$**, alors $\tilde{\mathbf{x}}$ est **LE minimiseur global UNIQUE**.

</div>

<details class="details--riche">
<summary>

**La preuve — par l'absurde**

</summary>

> *« **Nous supposons à nouveau LE CONTRAIRE et dérivons une CONTRADICTION.** »*

| Pas | L'argument |
|---|---|
| **1** | *« Si $\mathbf{x}^*$ est un maximiseur global **MAIS N'EST PAS UNIQUE**, alors **il existe un autre point $\mathbf{x}'\neq\mathbf{x}^*$ tel que $f(\mathbf{x}')=f(\mathbf{x}^*)$** »* |
| **2** | Poser $\mathbf{x}^{t}=t\mathbf{x}'+(1-t)\mathbf{x}^*$. **La CONCAVITÉ STRICTE exige** : $$f(\mathbf{x}^{t})>tf(\mathbf{x}')+(1-t)f(\mathbf{x}^*)\qquad\forall\,t\in(0,1)$$ |
| **3** | *« **Parce que $f(\mathbf{x}')=f(\mathbf{x}^*)$** »*, le membre de droite devient $\ tf(\mathbf{x}')+(1-t)f(\mathbf{x}')=f(\mathbf{x}')$ |
| **4** | ⟹ $\ f(\mathbf{x}^{t})>f(\mathbf{x}')$ |
| **5** | *« **Ceci CONTREDIT cependant l'hypothèse que $\mathbf{x}'$ est un maximiseur GLOBAL de $f$.** »* |

> *« Ainsi, **tout maximiseur global d'une fonction strictement concave DOIT ÊTRE UNIQUE.** »* $\blacksquare$

⚠️ **Le pivot** : **deux maximiseurs distincts de même valeur** engendrent, par stricte concavité, **un point INTERMÉDIAIRE STRICTEMENT MEILLEUR** — donc aucun des deux n'était le maximum.

</details>

### 10.2 Le théorème A2.15

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.15 — Condition suffisante d'optima globaux uniques</span>

Soit $f(\mathbf{x})$ **deux fois continûment différentiable** sur l'intérieur de son domaine $D$, avec $\mathbf{x}^*$ et $\tilde{\mathbf{x}}$ **intérieurs**. **1.** **Si $f(\mathbf{x})$ est STRICTEMENT CONCAVE et $f_i(\mathbf{x}^*)=0$ pour $i=1,\dots,n$, alors $\mathbf{x}^*$ est LE MAXIMISEUR GLOBAL UNIQUE de $f(\mathbf{x})$.** **2.** **Si $f(\mathbf{x})$ est STRICTEMENT CONVEXE et $f_i(\tilde{\mathbf{x}})=0$, alors $\tilde{\mathbf{x}}$ est LE MINIMISEUR GLOBAL UNIQUE.**

</div>

<details class="details--riche">
<summary>

**La preuve — l'enchaînement de deux théorèmes**

</summary>

> *« **Ce théorème a UN ATTRAIT INTUITIF ÉNORME.** Comme d'habitude, nous ne traitons que les fonctions strictement concaves, **laissant les strictement convexes pour vous** *(exercice A2.17)*. »*

| Pas | L'argument | L'outil |
|---|---|---|
| **1** | **Une fonction strictement concave EST concave** ⟹ **le théorème A2.13 s'applique** ; comme $\nabla f(\mathbf{x}^*)=\mathbf{0}$, **$f$ atteint un maximum GLOBAL en $\mathbf{x}^*$** | **THÉORÈME A2.13** |
| **2** | ⟹ *« **le théorème A2.14 implique alors que $\mathbf{x}^*$ est LE MAXIMISEUR GLOBAL UNIQUE** »* | **THÉORÈME A2.14** |

$\blacksquare$

$$\boxed{\;\textbf{GRADIENT NUL} + \textbf{STRICTE CONCAVITÉ} \ \Longrightarrow\ \textbf{MAXIMUM GLOBAL UNIQUE}\;}$$

⚠️ **C'est LE résultat pratique du chapitre** : il transforme **une condition locale VÉRIFIABLE** *(un gradient qui s'annule)* **en une conclusion GLOBALE et d'UNICITÉ.**

</details>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « trouvez les points critiques » | **Théorème A2.9** | **Résoudre $\nabla f(\mathbf{x})=\mathbf{0}$** — un système de $n$ équations |
| « maximum ou minimum ? » | **Théorème A2.12** | **Regarder le patron de signes des MINEURS PRINCIPAUX** |
| « classez les points stationnaires » | **Théorème A2.12** | **max · min · NI L'UN NI L'AUTRE** *(selle ou inflexion)* |
| « les mineurs alternent en signe » | **Théorème A2.11(1)** | ⟹ **DÉFINIE NÉGATIVE** ⟹ maximum |
| « les mineurs sont tous positifs » | **Théorème A2.11(2)** | ⟹ **DÉFINIE POSITIVE** ⟹ minimum |
| « ce maximum local est-il global ? » | **Théorème A2.13** | **OUI si $f$ est CONCAVE** |
| « ce maximum est-il unique ? » | **Théorèmes A2.14/A2.15** | **OUI si $f$ est STRICTEMENT concave** |
| « l'ensemble des maximiseurs est-il convexe ? » | **Exercice A2.12** | Passer par **la définition de la concavité** |
| « et pour $F(f(\mathbf{x}))$ ? » | **Exercice A2.11** | **Une transformation CROISSANTE préserve les optima** |
| « $D_i$ bordés par les partielles PREMIÈRES » | **Exercice A2.18** | C'est **la HESSIENNE BORDÉE d'Arrow-Enthoven** — test de **QUASICONCAVITÉ** |
| « cette fonction est-elle concave ? quasiconcave ? » | **Exercice A2.19** | **Deux questions DISTINCTES** *(thm A1.15 : concave ⟹ quasiconcave, pas l'inverse)* |

**Les trois réflexes de cadrage :**

1. **Toujours faire les DEUX étapes.** Le gradient nul **localise** ; **seuls les mineurs principaux TRANCHENT**. Un point critique peut être **un point d'inflexion ou une selle**.
2. **Vérifier si la hessienne dépend de $\mathbf{x}$.** **Si elle est CONSTANTE et définie négative, on a directement la STRICTE CONCAVITÉ GLOBALE** — donc, par A2.15, **le maximum global unique**, sans autre travail.
3. **Ne jamais conclure « c'est un maximum » à partir des seules conditions NÉCESSAIRES.** *« Pour vérifier qu'ils maximisent effectivement, nous avons besoin de conditions SUFFISANTES. »*

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Trouver les points critiques

| Pas | L'action |
|---|---|
| **1** | **Calculer les $n$ partielles premières** |
| **2** | **Les poser TOUTES égales à zéro** ⟹ un système de $n$ équations |
| **3** | **Le résoudre** — **par SUBSTITUTION**, ou, **si le système est LINÉAIRE, par INVERSION MATRICIELLE** *(exemple A2.6)* |
| **4** | **Ne pas conclure encore** : *« nous ne savons pas encore si nous avons trouvé un maximum ou un minimum »* |

### Méthode 2 — Trancher par les mineurs principaux

1. **Calculer les $n^2$ partielles secondes** et **former $H(\mathbf{x})$** *( symétrique, par Young)*.
2. **L'évaluer AU POINT CRITIQUE.**
3. **Calculer $D_1,D_2,\dots,D_n$** — chacun en **supprimant les $(n-i)$ dernières lignes ET colonnes**.
4. **Lire le patron** :

| Le patron | La conclusion |
|---|---|
| $D_1<0,\ D_2>0,\ D_3<0,\dots$ | **MAXIMUM local** |
| $D_1>0,\ D_2>0,\ D_3>0,\dots$ | **MINIMUM local** |
| **Un $D_i$ NUL** | **LE TEST EST MUET** — il faut examiner la fonction directement |
| **Un autre patron** | **NI max NI min** *(point-selle)* |

### Méthode 3 — Passer du local au global

| Ce qu'on a | Ce qu'on peut conclure |
|---|---|
| $\nabla f(\mathbf{x}^*)=\mathbf{0}$ **et $f$ CONCAVE** | **MAXIMUM GLOBAL** *(thm A2.13)* |
| $\nabla f(\mathbf{x}^*)=\mathbf{0}$ **et $f$ STRICTEMENT concave** | **MAXIMUM GLOBAL UNIQUE** *(thm A2.15)* |
| **$H$ définie négative PARTOUT** | **$f$ est strictement concave** *(thm A2.11)* ⟹ **on est dans le cas précédent** |

### Méthode 4 — Réfuter la concavité rapidement

⚠️ **Le test le plus rapide** : par **le théorème A2.5**, si **une seule** partielle propre $f_{ii}$ est **strictement positive** quelque part, **$f$ n'est PAS concave**.

*(Exemple : $f=(x_1x_2)^2$ a $f_{11}=2x_2^2>0$ ⟹ **pas concave** — exercice A2.19.)*

### Méthode 5 — Prouver l'unicité par l'absurde

1. **Supposer** qu'il existe **deux** maximiseurs globaux $\mathbf{x}^*$ et $\mathbf{x}'$, donc $f(\mathbf{x}^*)=f(\mathbf{x}')$.
2. **Former $\mathbf{x}^{t}$** avec $t\in(0,1)$.
3. **Invoquer la STRICTE concavité** : $f(\mathbf{x}^{t})>tf(\mathbf{x}')+(1-t)f(\mathbf{x}^*)$.
4. **Les deux valeurs étant ÉGALES**, le membre de droite **vaut simplement $f(\mathbf{x}')$**.
5. ⟹ $f(\mathbf{x}^{t})>f(\mathbf{x}')$ — **contradiction avec la maximalité globale**.

## Les exercices du livre (§A2.6) — ceux qui portent sur §A2.2

> ⚠️ **Le livre NE FOURNIT PAS de corrigé.** Les énoncés sont **ceux de Jehle & Reny** *(exercices A2.11 à A2.19 et A2.24)*. **Les pistes de résolution sont un ENRICHISSEMENT PÉDAGOGIQUE.**

<details class="details--riche">
<summary>

**A2.11 — les transformations croissantes préservent les optima**

</summary>

> *« Soit $F(z)$ **une fonction CROISSANTE de la seule variable $z$**. Formez la composée $F(f(\mathbf{x}))$. **Montrez que $\mathbf{x}^*$ est un maximum (minimum) local de $f(\mathbf{x})$ SI ET SEULEMENT SI $\mathbf{x}^*$ est un maximum (minimum) local de $F(f(\mathbf{x}))$.** »*

> **Piste (hors cours).** **Le sens ⟹** : si $f(\mathbf{x}^*)\geq f(\mathbf{x})$ sur $B_\varepsilon(\mathbf{x}^*)$, alors **$F$ croissante** donne $F(f(\mathbf{x}^*))\geq F(f(\mathbf{x}))$ sur la même boule **Le sens ⟸** : **il faut que $F$ soit STRICTEMENT croissante.** *(Si $F$ était CONSTANTE — ce que la définition A1.17 d'une fonction « croissante » autorise —, tout point serait un maximum de $F\circ f$ sans l'être de $f$.)* Avec $F$ strictement croissante, $F(f(\mathbf{x}^*))\geq F(f(\mathbf{x}))$ **force** $f(\mathbf{x}^*)\geq f(\mathbf{x})$, sans quoi $f(\mathbf{x})>f(\mathbf{x}^*)$ donnerait $F(f(\mathbf{x}))>F(f(\mathbf{x}^*))$. **La portée économique** : c'est **exactement ce qui justifie qu'on maximise $\ln u(\mathbf{x})$ au lieu de $u(\mathbf{x})$** — et, plus profondément, **que l'utilité soit ORDINALE** *(chapitre 1)*.

</details>

<details class="details--riche">
<summary>

**A2.12 à A2.14 — convexité de l'ensemble des solutions, et unicité**

</summary>

**A2.12** *« Supposez que $f(\mathbf{x})$ est **CONCAVE** et que $M$ est **l'ensemble de tous les points de $\mathbb{R}^n$ qui donnent des MAXIMA GLOBAUX** de $f$. **Prouvez que $M$ est un ensemble CONVEXE.** »* **A2.13** *« Soit $f(\mathbf{x})$ **CONVEXE**. Prouvez que $f$ atteint **un minimum LOCAL en $\tilde{\mathbf{x}}$ SI ET SEULEMENT SI** elle atteint **un minimum GLOBAL** en $\tilde{\mathbf{x}}$. »* **A2.14** *« Prouvez que si $f(\mathbf{x})$ est **STRICTEMENT CONVEXE** et si $\tilde{\mathbf{x}}$ est un minimiseur global, alors $\tilde{\mathbf{x}}$ est **LE minimiseur global UNIQUE**. »*

> **Piste (hors cours).** **A2.12** : soient $\mathbf{x}^1,\mathbf{x}^2\in M$, donc $f(\mathbf{x}^1)=f(\mathbf{x}^2)=m$ **le maximum**. Par concavité, $f(\mathbf{x}^{t})\geq tm+(1-t)m=m$. **Mais $m$ EST le maximum**, donc $f(\mathbf{x}^{t})\leq m$ ⟹ **$f(\mathbf{x}^{t})=m$** ⟹ $\mathbf{x}^{t}\in M$ **La leçon** : *l'ensemble des solutions d'un programme concave est convexe* — **il peut y en avoir plusieurs, mais elles forment un « plateau » convexe** *(c'est exactement la limite du théorème A2.13 soulignée en §9.4)*. **A2.13** : le sens ⟸ est trivial. **⟹ par l'absurde** : si $f(\mathbf{x}')<f(\tilde{\mathbf{x}})$ pour un $\mathbf{x}'$, alors pour $t$ **assez petit**, $\mathbf{x}^{t}=t\mathbf{x}'+(1-t)\tilde{\mathbf{x}}$ est **dans TOUT voisinage de $\tilde{\mathbf{x}}$**, et la convexité donne $f(\mathbf{x}^{t})\leq tf(\mathbf{x}')+(1-t)f(\tilde{\mathbf{x}})<f(\tilde{\mathbf{x}})$ ⟹ **contradiction avec la minimalité LOCALE** **A2.14** : **c'est le miroir exact du théorème A2.14(1)** — reprendre la preuve par l'absurde en renversant les inégalités.

</details>

<details class="details--riche">
<summary>

**A2.15 — vérifier l'exemple A2.6 et calculer $y^*$**

</summary>

> *« **Vérifiez les calculs de l'exemple A2.6 en utilisant LA MÉTHODE DE SUBSTITUTION** pour résoudre le système des partielles premières. **Puis évaluez la fonction en $x_1^*=3/7$ et $x_2^*=8/7$ et trouvez $y^*$. Vérifiez ce que nous avons trouvé à l'exemple A2.7 en évaluant la fonction en n'importe quel AUTRE point et en comparant à $y^*$.** »*

> **Piste (hors cours).** **La substitution** : de $-8x_1^*+3x_2^*=0$ vient $x_2^*=\tfrac{8x_1^*}{3}$. En reportant dans $1+3x_1^*-2x_2^*=0$ :
>
> $$1+3x_1^*-\frac{16x_1^*}{3}=0 \ \Longrightarrow\ 3+9x_1^*-16x_1^*=0 \ \Longrightarrow\ 3-7x_1^*=0 \ \Longrightarrow\ x_1^*=\frac37,\quad x_2^*=\frac87 \quad$$
>
> **La valeur optimale** — avec $f=x_2-4x_1^2+3x_1x_2-x_2^2$ :
>
> $$y^*=\frac87-4\cdot\frac{9}{49}+3\cdot\frac37\cdot\frac87-\frac{64}{49}=\frac{56}{49}-\frac{36}{49}+\frac{72}{49}-\frac{64}{49}=\frac{28}{49}=\boxed{\frac47}$$
>
> **La vérification** : en $(0,0)$, $f=0<\tfrac47$ ; en $(1,1)$, $f=1-4+3-1=-1<\tfrac47$ **Et comme la hessienne est CONSTANTE et définie négative, $\tfrac47$ n'est pas seulement un maximum local : c'est LE MAXIMUM GLOBAL UNIQUE** *(thm A2.11 puis A2.15)*.

</details>

<details class="details--riche">
<summary>

**A2.16 et A2.24 — les cinq fonctions, points critiques ET classification**

</summary>

**A2.16** *« **Trouvez les points critiques quand…** »* · **A2.24** *« **Trouvez les valeurs extrêmes locales et CLASSEZ les points stationnaires comme MAXIMA, MINIMA ou NI L'UN NI L'AUTRE.** »* **(a)** $2x_1-x_1^2-x_2^2$ · **(b)** $x_1^2+2x_2^2-4x_2$ · **(c)** $x_1^3-x_2^2+2x_2$ · **(d)** $4x_1+2x_2-x_1^2+x_1x_2-x_2^2$ · **(e)** $x_1^3-6x_1x_2+x_2^3$

> **Piste (hors cours) — le tableau complet.**
>
> |  | Le(s) point(s) critique(s) | $H$ au point | $D_1$ | $D_2$ | Le verdict | La valeur |
> |---|---|---|---|---|---|---|
> | **(a)** | $(1,0)$ | $\begin{pmatrix}-2&0\\0&-2\end{pmatrix}$ | $-2$ | $4$ | **MAXIMUM** *(alternance)* | $f=1$ |
> | **(b)** | $(0,1)$ | $\begin{pmatrix}2&0\\0&4\end{pmatrix}$ | $2$ | $8$ | **MINIMUM** *(tous $>0$)* | $f=-2$ |
> | **(c)** | $(0,1)$ | $\begin{pmatrix}0&0\\0&-2\end{pmatrix}$ | $\mathbf{0}$ | $\mathbf{0}$ | **LE TEST EST MUET** — et de fait **NI L'UN NI L'AUTRE** | $f=1$ |
> | **(d)** | $\big(\tfrac{10}{3},\tfrac83\big)$ | $\begin{pmatrix}-2&1\\1&-2\end{pmatrix}$ | $-2$ | $3$ | **MAXIMUM** | $f=\tfrac{28}{3}$ |
> | **(e)** | $(0,0)$ **et** $(2,2)$ | $\begin{pmatrix}6x_1&-6\\-6&6x_2\end{pmatrix}$ |  |  | **voir ci-dessous** |  |
>
> **Le détail de (c)** : $f_1=3x_1^2=0\Rightarrow x_1=0$ ; $f_2=-2x_2+2=0\Rightarrow x_2=1$. **En $(0,1)$, $D_1=f_{11}=6x_1=0$** — **aucune des deux conditions du théorème A2.12 n'est satisfaite**. **Il faut regarder la fonction elle-même** : le long de $x_2=1$, $f=x_1^3+1$, **qui CROÎT en traversant $x_1=0$** — c'est **un POINT D'INFLEXION dans la direction $x_1$**, donc **ni maximum ni minimum**. *(C'est exactement le danger que les formes STRICTES sont censées écarter : « ceci sert à écarter la possibilité de prendre un POINT D'INFLEXION pour un optimum ».)*
>
> **Le détail de (e)** : $f_1=3x_1^2-6x_2=0\Rightarrow x_2=\tfrac{x_1^2}{2}$ ; $f_2=-6x_1+3x_2^2=0\Rightarrow x_1=\tfrac{x_2^2}{2}$. En substituant : $x_1=\tfrac{x_1^4}{8}$ ⟹ $x_1(x_1^3-8)=0$ ⟹ **$x_1=0$ ou $x_1=2$**.
>
> | Le point | $H$ | $D_1$ | $D_2$ | Le verdict |
> |---|---|---|---|---|
> | $(0,0)$ | $\begin{pmatrix}0&-6\\-6&0\end{pmatrix}$ | $0$ | $-36$ | **INDÉFINIE** ⟹ **POINT-SELLE, ni max ni min** |
> | $(2,2)$ | $\begin{pmatrix}12&-6\\-6&12\end{pmatrix}$ | $12$ | $108$ | **MINIMUM local**, $f=8-24+8=-8$ |

</details>

<details class="details--riche">
<summary>

**A2.18 — la hessienne BORDÉE d'Arrow-Enthoven (test de quasiconcavité)**

</summary>

> *« Soit $f(\mathbf{x})$ définie sur $\mathbb{R}^n_+$, et considérez la matrice*
>
> $$H^*\equiv\begin{pmatrix}0&f_1&\cdots&f_n\\f_1&f_{11}&\cdots&f_{1n}\\\vdots&\vdots&\ddots&\vdots\\f_n&f_{n1}&\cdots&f_{nn}\end{pmatrix}$$
>
> *« **C'est un type DIFFÉRENT de hessienne bordée de celui que nous avons considéré dans le texte. Ici, la matrice des partielles SECONDES est bordée par les partielles PREMIÈRES et un ZÉRO pour compléter la matrice carrée.** » Les mineurs principaux sont $D_2=\begin{vmatrix}0&f_1\\f_1&f_{11}\end{vmatrix}$, $D_3=\begin{vmatrix}0&f_1&f_2\\f_1&f_{11}&f_{12}\\f_2&f_{21}&f_{22}\end{vmatrix}$, …, $D_n=|H^*|$.*
>
> *« **Arrow et Enthoven (1961) utilisent le patron de signes de ces mineurs principaux pour établir les résultats utiles suivants :** »* **(i)** *« Si $f(\mathbf{x})$ est **QUASICONCAVE**, ces mineurs **ALTERNENT en signe ainsi : $D_2\leq0$, $D_3\geq0$, …** »* **(ii)** *« Si, **pour tout $\mathbf{x}\geq0$**, ces mineurs alternent en signe **EN COMMENÇANT PAR STRICTEMENT NÉGATIF : $D_2<0$, $D_3>0$, …**, alors $f(\mathbf{x})$ est **QUASICONCAVE sur l'orthant non négatif**. De plus, **si, pour tout $\mathbf{x}\gg0$, on a ce même patron alternant, alors $f(\mathbf{x})$ est STRICTEMENT QUASICONCAVE sur l'orthant (strictement) positif.** »*
>
> **(a)** *« La fonction $f(x_1,x_2)=x_1x_2+x_1$ est quasiconcave sur $\mathbb{R}^2_+$. **Vérifiez que ses mineurs principaux alternent en signe comme en (ii).** »* **(b)** *« Soit $f(x_1,x_2)=a\ln(x_1+x_2)+b$, où $a>0$. **Est-elle STRICTEMENT quasiconcave pour $\mathbf{x}\gg0$ ? Est-elle quasiconcave ? Et pour $\mathbf{x}\geq0$ mais non nul ? JUSTIFIEZ.** »*

> **Piste (hors cours).** **Attention à la NUMÉROTATION** : ces mineurs **commencent à $D_2$**, pas à $D_1$ — la bordure ajoute une ligne et une colonne.
>
> **(a)** $f_1=x_2+1$, $f_2=x_1$, $f_{11}=0$, $f_{12}=f_{21}=1$, $f_{22}=0$.
>
> $$D_2=\begin{vmatrix}0&x_2+1\\x_2+1&0\end{vmatrix}=-(x_2+1)^2\ \boxed{<0}$$
>
> $$D_3=\begin{vmatrix}0&x_2+1&x_1\\x_2+1&0&1\\x_1&1&0\end{vmatrix}=2x_1(x_2+1)\ \boxed{>0}\ \text{ pour } x_1>0$$
>
> **Le patron alterne en commençant strictement négatif** ⟹ **quasiconcave**, conformément à (ii)
>
> **(b)** Avec $s=x_1+x_2$ : $f_1=f_2=\tfrac{a}{s}$ et **toutes les partielles secondes valent $-\tfrac{a}{s^2}$**.
>
> $$D_2=-\left(\frac{a}{s}\right)^2<0 \quad \qquad\qquad D_3=0 \quad$$
>
> *(car **les deux dernières lignes de $H^*$ sont IDENTIQUES**.)* ⟹ **La condition SUFFISANTE (ii) ÉCHOUE** — mais **la condition NÉCESSAIRE (i) est satisfaite** *($D_2\leq0$, $D_3\geq0$)*. **La réponse directe** : $\ln$ étant **concave** et $x_1+x_2$ **linéaire**, **$f$ est CONCAVE, donc QUASICONCAVE** *(théorème A1.15)*. **Mais elle N'EST PAS STRICTEMENT quasiconcave** : ses ensembles de niveau sont **les droites $x_1+x_2=\text{cte}$**, donc **deux points distincts d'un même niveau donnent $f(\mathbf{x}^{t})=\min$, avec ÉGALITÉ** *(exactement la situation de la fig. A1.31, [fiche 522](522-jehle-fonctions-reelles-concavite.md))*. **La même réponse vaut sur $\mathbf{x}\gg0$ et sur $\mathbf{x}\geq0$ non nul.** **La morale** : **$D_3=0$ n'est PAS une anomalie de calcul — c'est la signature exacte des SEGMENTS LINÉAIRES dans les ensembles de niveau.**

</details>

<details class="details--riche">
<summary>

**A2.19 — concave ? quasiconcave ?**

</summary>

> *« Soit $f(x_1,x_2)=(x_1x_2)^2$. **$f(\mathbf{x})$ est-elle CONCAVE sur $\mathbb{R}^2_+$ ? Est-elle QUASICONCAVE sur $\mathbb{R}^2_+$ ?** »*

> **Piste (hors cours).** **CONCAVE ? NON.** **Le test le plus rapide est le THÉORÈME A2.5** : $f_1=2x_1x_2^2$ donc $f_{11}=2x_2^2$, **strictement POSITIF dès que $x_2\neq0$** — or la concavité exigerait $f_{11}\leq0$. **QUASICONCAVE ? OUI.** Par **le théorème A1.14**, il suffit que les **ensembles supérieurs** soient convexes :
>
> $$S(y)=\big\{\mathbf{x}\geq0\ \big|\ (x_1x_2)^2\geq y\big\}=\big\{\mathbf{x}\geq0\ \big|\ x_1x_2\geq\sqrt{y}\big\}\quad (y\geq0)$$
>
> **C'est la région au-dessus d'une HYPERBOLE, exactement l'ensemble convexe de l'exercice A1.7(d)** *(et pour $y<0$, $S(y)=\mathbb{R}^2_+$, convexe)*. **La leçon** : cet exercice **illustre précisément que la réciproque du théorème A1.15 est fausse** — quasiconcave **sans** être concave.

</details>

<details class="details--riche">
<summary>

**A2.17 — compléter le théorème A2.15**

</summary>

> *« **Prouvez le théorème A2.15 pour le cas des fonctions STRICTEMENT CONVEXES.** »*

> **Piste (hors cours).** **L'enchaînement est le miroir exact** : $f$ **strictement convexe** ⟹ $f$ convexe ⟹ **par le théorème A2.13 appliqué à $-f$** *(qui est concave, théorème A1.16)*, le gradient nul donne **un minimum GLOBAL** ; puis **le théorème A2.14(2)** donne **l'unicité**.

</details>

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Confondre local et global | **LOCAL : dans un VOISINAGE · GLOBAL : dans TOUT LE DOMAINE** | Fig. A2.4 |
| 2 | Croire qu'un maximum global est unique | *« **le maximum global en $x_3$, CEPENDANT, N'EST PAS UNIQUE** »* | Il faut $>$ strict |
| 3 | Oublier la distinction intérieur / frontière | **Tout le §A2.2 ne traite QUE des optima INTÉRIEURS** | $x_5$ est un max **de frontière** |
| 4 | Appliquer les FONC à un point de frontière | **Le gradient n'a aucune raison d'y être nul** | C'est l'objet du §A2.3 |
| 5 | Écrire la SONC d'un max avec $\geq$ | **MAX : $f''(x^*)\leq0$ · MIN : $f''(\tilde{x})\geq0$** | Thm A2.8 |
| 6 | Croire que les conditions de A2.8 sont suffisantes | **NÉCESSAIRES** *(FONC et SONC)* |  |
| 7 | Ne pas voir l'astuce $g(t)$ | *« **LA CLÉ est de noter que si $f$ est maximisée en $\mathbf{x}^*$, alors POUR TOUT $\mathbf{z}$, $g(t)=f(\mathbf{x}^*+t\mathbf{z})$ SERA MAXIMISÉE EN $t=0$** »* | Elle porte **toutes** les preuves |
| 8 | Oublier de prendre les vecteurs unitaires | **C'est ce qui fait passer de $\nabla f\,\mathbf{z}=0$ à $\nabla f=\mathbf{0}$** | Pas 7 de la preuve A2.9 |
| 9 | Croire qu'une équation suffit à $n$ variables | **$\nabla f(\mathbf{x}^*)=\mathbf{0}$ est un SYSTÈME de $n$ ÉQUATIONS SIMULTANÉES** |  |
| 10 | Se tromper de signe en inversant $A$ | $A^{-1}=\tfrac{1}{\|A\|}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ pour $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ | Exemple A2.6 |
| 11 | Conclure au maximum après les seules FONC | *« **nous ne savons pas encore si nous avons trouvé un maximum ou un minimum** »* |  |
| 12 | Écrire A2.10 avec « définie » au lieu de « semi-définie » | **La condition NÉCESSAIRE est SEMI-définie** | La SUFFISANTE est **définie** |
| 13 | Oublier que $\mathbf{z}$ est arbitraire | **C'est ce qui donne la semi-définitude** | Pas 3 de la preuve A2.10 |
| 14 | Croire que nécessaire $=$ suffisant | *« **pour VÉRIFIER qu'ils maximisent effectivement, nous avons besoin de conditions SUFFISANTES** »* |  |
| 15 | Oublier pourquoi les formes strictes | *« **ceci sert à écarter la possibilité de prendre UN POINT D'INFLEXION pour un optimum** »* |  |
| 16 | Croire que trouver la définitude est facile | *« **localiser un point critique est FACILE. Déterminer si la hessienne est définie sera GÉNÉRALEMENT MOINS FACILE** »* |  |
| 17 | Mal former $D_i$ | **Supprimer les $(n-i)$ dernières LIGNES ET COLONNES** | *« en descendant la DIAGONALE PRINCIPALE »* |
| 18 | Inverser les deux patrons de A2.11 | **NÉGATIVE : $(-1)^iD_i>0$ (alternance dès $D_1<0$) · POSITIVE : tous $D_i>0$** |  |
| 19 | Croire que l'alternance commence par positif | *« **en commençant par NÉGATIF** »* | $D_1=f_{11}<0$ |
| 20 | Croire A2.11 nécessaire | **Ce sont des conditions SUFFISANTES** | Titre du théorème |
| 21 | Oublier Young dans (P.1) | $D_2=f_{11}f_{22}-(f_{12})^2$ **utilise $f_{12}=f_{21}$** |  |
| 22 | Rater le complètement du carré | **Ajouter ET soustraire $(f_{12})^2(z_2)^2/f_{11}$** | (P.3) |
| 23 | Oublier l'hypothèse $z_2\neq0$ | **Elle rend le second terme STRICTEMENT négatif** |  |
| 24 | Conclure quand un $D_i$ est nul | **Le théorème A2.12 exige des inégalités STRICTES — le test est alors MUET** | Exercice A2.24(c) |
| 25 | Croire qu'un point critique est un optimum | **Il peut être un POINT-SELLE** *(A2.24(e) en $(0,0)$)* ou **une INFLEXION** |  |
| 26 | Oublier l'hypothèse de concavité dans A2.13 | **Sans elle, local $\neq$ global** |  |
| 27 | Croire que A2.13 donne l'unicité | *« **il est toujours possible que la valeur la plus haute soit atteinte EN PLUS D'UN POINT** »* | Il faut la **stricte** concavité |
| 28 | Se tromper d'outil dans la preuve de A2.13 | **C'est l'ÉNONCÉ 3 du théorème A2.4** *(l'inégalité de la tangente)* |  |
| 29 | Croire que 1 ⟹ 3 est trivial | *« **il ne reste qu'à montrer que 1 ⟹ 3** »* — les deux autres implications le sont |  |
| 30 | Prouver A2.14 directement | **Le livre passe PAR L'ABSURDE** | *« nous supposons le CONTRAIRE »* |
| 31 | Oublier $t\in(0,1)$ OUVERT dans A2.14 | **La stricte concavité l'exige** *(déf. A1.23)* |  |
| 32 | Croire que A2.15 exige de vérifier la globalité | **Le gradient nul $+$ stricte concavité SUFFISENT** | Thm A2.13 puis A2.14 |
| 33 | Croire qu'une transformation croissante change les optima | **NON** *(exercice A2.11)* — d'où le caractère **ORDINAL** de l'utilité |  |
| 34 | Croire que $M$ *(l'ensemble des maximiseurs)* est un point | **C'est un ensemble CONVEXE** *(A2.12)* | Un « plateau » |
| 35 | Confondre les deux hessiennes bordées | **Celle d'A2.18 est bordée par les partielles PREMIÈRES et un ZÉRO** | *« un type DIFFÉRENT »* |
| 36 | Numéroter les mineurs bordés à partir de 1 | **Ils commencent à $D_2$** |  |
| 37 | Confondre les conditions (i) et (ii) d'Arrow-Enthoven | **(i) est NÉCESSAIRE ($\leq$, $\geq$) · (ii) est SUFFISANTE (strictes)** |  |
| 38 | Conclure « pas quasiconcave » quand $D_3=0$ | **Seule la condition SUFFISANTE échoue** — cf. $a\ln(x_1+x_2)+b$, **qui EST quasiconcave** |  |
| 39 | Croire que « pas concave » ⟹ « pas quasiconcave » | **NON** — $(x_1x_2)^2$ *(A2.19)* | Thm A1.15, réciproque fausse |
| 40 | Tester la concavité sans passer par A2.5 | **Une seule $f_{ii}>0$ SUFFIT à réfuter** | Le test le plus rapide |

## 📌 Ultimate Review

**LE VOCABULAIRE (fig. A2.4).**

**LOCAL** *(dans un voisinage)* · **GLOBAL** *(dans tout le domaine)* · **UNIQUE** *(inégalité STRICTE pour $\mathbf{x}\neq\mathbf{x}^*$)* · **INTÉRIEUR** *(« dans l'intérieur du domaine, pas à ses bords »)* · **DE FRONTIÈRE**.

⚠️ *« En théorie économique, **nous n'avons que RAREMENT besoin de CALCULER les optima. Nous voulons juste LES CARACTÉRISER.** »*

**THÉORÈME A2.8 — UNE VARIABLE (toutes NÉCESSAIRES).**

| L'optimum | FONC | SONC |
|---|---|---|
| **MAXIMUM** | $f'(x^*)=0$ | $f''(x^*)\leq0$ |
| **MINIMUM** | $f'(\tilde{x})=0$ | $f''(\tilde{x})\geq0$ |

⚠️ **L'ASTUCE CENTRALE :**

$$\boxed{\;g(t)=f(\mathbf{x}^*+t\mathbf{z}) \quad\textbf{atteint un extremum en } t=0 \qquad g'(0)=\nabla f(\mathbf{x}^*)\mathbf{z} \qquad g''(0)=\mathbf{z}^{T}H(\mathbf{x}^*)\mathbf{z}\;}$$

**THÉORÈME A2.9 (FONC)** : **$\nabla f(\mathbf{x}^*)=\mathbf{0}$** — *« l'équation UNIQUE se GÉNÉRALISE au SYSTÈME de $n$ ÉQUATIONS SIMULTANÉES »*. *La preuve conclut **en prenant les $n$ VECTEURS UNITAIRES pour $\mathbf{z}$**.*

**THÉORÈME A2.10 (SONC)** : **MAX ⟹ $H(\mathbf{x}^*)$ SEMI-DÉFINIE NÉGATIVE** · **MIN ⟹ $H(\tilde{\mathbf{x}})$ SEMI-DÉFINIE POSITIVE**.

⚠️ **NÉCESSAIRE $\neq$ SUFFISANT** : *« ces conditions peuvent aider à LOCALISER des optima POTENTIELS, mais pour VÉRIFIER, **nous avons besoin de conditions SUFFISANTES** »*, qui exigent **les formes STRICTES de la courbure** — *« ceci sert à écarter la possibilité de prendre **UN POINT D'INFLEXION** pour un optimum »*.

**LES MINEURS PRINCIPAUX** : $D_i(\mathbf{x})$ = le déterminant obtenu **en supprimant les $(n-i)$ DERNIÈRES LIGNES ET COLONNES** de $H(\mathbf{x})$ — *« en descendant **LA DIAGONALE PRINCIPALE** »*.

**THÉORÈME A2.11 (SUFFISANT pour la définitude)** :

$$\boxed{\;(-1)^{i}D_i(\mathbf{x})>0 \ \forall i \ \Rightarrow \ \textbf{DÉFINIE NÉGATIVE} \qquad\qquad D_i(\mathbf{x})>0 \ \forall i \ \Rightarrow \ \textbf{DÉFINIE POSITIVE}\;}$$

⚠️ *« la fonction sera **STRICTEMENT CONCAVE** si les mineurs **ALTERNENT TOUJOURS EN SIGNE, EN COMMENÇANT PAR NÉGATIF** »*.

*Le pivot de la preuve à deux variables* — **compléter le carré** :

$$\mathbf{z}^{T}H\mathbf{z}=f_{11}\left(z_1+\frac{f_{12}}{f_{11}}z_2\right)^{2}+\frac{\overbrace{f_{11}f_{22}-(f_{12})^2}^{=\,D_2}}{f_{11}}(z_2)^2 \tag{P.3}$$

**THÉORÈME A2.12 (SUFFISANT pour l'optimum local)** : $f_i(\mathbf{x}^*)=0$ **ET** $(-1)^iD_i(\mathbf{x}^*)>0$ ⟹ **MAXIMUM local** · $f_i(\tilde{\mathbf{x}})=0$ **ET** $D_i(\tilde{\mathbf{x}})>0$ ⟹ **MINIMUM local**.

*(**Exemple A2.7** : $H=\begin{pmatrix}-8&3\\3&-2\end{pmatrix}$, $D_1=-8<0$, $D_2=7>0$ ⟹ **maximum en $(3/7,\,8/7)$** ; **et comme $H$ ne dépend PAS de $\mathbf{x}$, $f$ est STRICTEMENT CONCAVE partout**.)*

**THÉORÈME A2.13 — LOCAL-GLOBAL** *(pour $f$ CONCAVE)* :

$$\boxed{\;\nabla f(\mathbf{x}^*)=\mathbf{0} \iff \textbf{MAXIMUM LOCAL} \iff \textbf{MAXIMUM GLOBAL}\;}$$

*La preuve de 1 ⟹ 3* : **le théorème A2.4(3)** donne $f(\mathbf{x})\leq f(\mathbf{x}^*)+\nabla f(\mathbf{x}^*)(\mathbf{x}-\mathbf{x}^*)$, **et le terme du gradient s'annule**.

⚠️ **Sa limite** : *« il est toujours possible que la valeur la plus haute soit atteinte **EN PLUS D'UN POINT** »*.

**THÉORÈME A2.14** : **STRICTEMENT concave ⟹ le maximiseur global est UNIQUE.** *(Par l'absurde : deux maximiseurs de même valeur engendrent un point intermédiaire **strictement meilleur**.)*

**THÉORÈME A2.15** :

$$\boxed{\;\textbf{STRICTEMENT CONCAVE} \ + \ \nabla f(\mathbf{x}^*)=\mathbf{0} \ \Longrightarrow \ \textbf{MAXIMISEUR GLOBAL UNIQUE}\;}$$

*« **Ce théorème a UN ATTRAIT INTUITIF ÉNORME** »* — il enchaîne simplement **A2.13 puis A2.14**.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Définir maximum local, global, unique.**

</summary>

| Le terme | La définition |
|---|---|
| **MAXIMUM LOCAL** | *« $f(x^*)\geq f(x)$ pour tout $x$ **DANS UN VOISINAGE de $x^*$** »* — en $\mathbb{R}^n$ : $\exists\,\varepsilon>0$ tel que $f(\mathbf{x}^*)\geq f(\mathbf{x})$ **pour tout $\mathbf{x}\in B_\varepsilon(\mathbf{x}^*)$** |
| **MAXIMUM GLOBAL** | *« pour tout $x$ **DANS LE DOMAINE** »* |
| **UNIQUE** | **L'inégalité est STRICTE pour tout $\mathbf{x}\neq\mathbf{x}^*$** |

</details>

<details class="details--riche">
<summary>

**2. Distinguer optimum intérieur et de frontière (fig. A2.4).**

</summary>

> *« Les maxima locaux en $x_1$ et $x_3$ sont appelés **MAXIMA INTÉRIEURS**, parce que $x_1$ et $x_3$ sont **DANS L'INTÉRIEUR du domaine $D$, PAS À SES « BORDS ». Les maxima comme celui atteint en $x_5$ sont appelés MAXIMA DE FRONTIÈRE.** »*

⚠️ *« Le maximum global en $x_3$, **CEPENDANT, N'EST PAS UNIQUE** »*.

⚠️ **Tout le §A2.2 ne traite QUE des optima INTÉRIEURS.**

</details>

<details class="details--riche">
<summary>

**3. Quel est le programme du théoricien ?**

</summary>

> *« Dans vos cours de calcul, **l'accent tendait à porter sur L'APPLICATION de ces tests et l'apprentissage du CALCUL des optima. En théorie économique, cependant, NOUS N'AVONS QUE RAREMENT BESOIN DE CALCULER effectivement les optima. À la place, nous voulons habituellement JUSTE LES CARACTÉRISER — ÉPELER LES CONDITIONS QUI DOIVENT TENIR À L'OPTIMUM, et travailler ENSUITE AVEC CES CONDITIONS, plutôt qu'avec des NOMBRES SPÉCIFIQUES.** »*

</details>

<details class="details--riche">
<summary>

**4. Énoncer le théorème A2.8 et son contenu géométrique.**

</summary>

$f$ **deux fois continûment différentiable** atteint un **optimum intérieur local** :

**1.** **MAXIMUM** en $x^*$ ⟹ $f'(x^*)=0$ **(FONC)** et $f''(x^*)\leq0$ **(SONC)** **2.** **MINIMUM** en $\tilde{x}$ ⟹ $f'(\tilde{x})=0$ **(FONC)** et $f''(\tilde{x})\geq0$ **(SONC)**

**Fig. A2.5(a)** : *« $f'(x^*)=0$ et **$f'(x)$ est DÉCROISSANTE** là où $f$ atteint un maximum »* — $f'(x^1)>0$, $f'(x^2)<0$. **Fig. A2.5(b)** : *« $f'(\tilde{x})=0$ et **$f'(x)$ est CROISSANTE** là où $f$ atteint un minimum »*.

</details>

<details class="details--riche">
<summary>

**5. Énoncer L'ASTUCE qui porte toutes les preuves.**

</summary>

> *« **LA CLÉ est de noter que si la fonction $f$ de plusieurs variables est MAXIMISÉE en $\mathbf{x}^*$, alors POUR TOUT VECTEUR $\mathbf{z}$, la fonction d'une seule variable $g(t)=f(\mathbf{x}^*+t\mathbf{z})$ SERA MAXIMISÉE EN $t=0$.** »*

> *« Ainsi, nous pouvons **appliquer les conditions du premier et du second ordre pour les fonctions d'une SEULE variable à $g$ AU POINT $t=0$. Ceci conduira alors à des conditions sur LE GRADIENT et LA HESSIENNE de $f$ en $\mathbf{x}^*$.** »*

$$g'(0)=\nabla f(\mathbf{x}^*)\,\mathbf{z} \qquad\qquad g''(0)=\mathbf{z}^{T}H(\mathbf{x}^*)\,\mathbf{z}$$

</details>

<details class="details--riche">
<summary>

**6. Pourquoi le gradient doit-il être nul ? (l'intuition du livre)**

</summary>

> *« Ceci est **assez INTUITIF**, car cela dit simplement que **si $f$ est maximisée en $\mathbf{x}^*$, alors IL VAUDRAIT MIEUX QU'IL NE SOIT PAS POSSIBLE D'AUGMENTER LA VALEUR DE $f$ EN AUGMENTANT OU EN DIMINUANT L'UN QUELCONQUE DES $x_i$ EN LAISSANT TOUS LES AUTRES FIXÉS.** »*

> *« **L'équation UNIQUE du premier ordre $f'(x^*)=0$ SE GÉNÉRALISE au SYSTÈME DU PREMIER ORDRE DE $n$ ÉQUATIONS SIMULTANÉES, $\nabla f(\mathbf{x}^*)=\mathbf{0}$.** »*

</details>

<details class="details--riche">
<summary>

**7. Démontrer le théorème A2.9.**

</summary>

> ⚠️ *« **La preuve que nous donnons N'EST PAS LA PLUS SIMPLE, MAIS ELLE SERA UTILE quand nous considérerons LES CONDITIONS DU SECOND ORDRE.** »*

Poser $g(t)=f(\mathbf{x}^*+t\mathbf{z})$ **(P.1)**. *« **$g(t)$ DOIT atteindre un extremum local en $t=0$ parce que nous avons supposé que $f$ atteint un extremum en $\mathbf{x}^*$** »* ⟹ **par le théorème A2.8**, $g'(0)=0$ ⟹

$$g'(0)=\sum_i\frac{\partial f(\mathbf{x}^*)}{\partial x_i}z_i=\nabla f(\mathbf{x}^*)\mathbf{z}=0$$

⚠️ *« Parce que ceci doit tenir **POUR TOUT vecteur $\mathbf{z}$ — EN PARTICULIER POUR CHACUN DES $n$ VECTEURS UNITAIRES** — cela implique que **CHACUNE des partielles doit être NULLE** »*

</details>

<details class="details--riche">
<summary>

**8. Refaire l'exemple A2.6.**

</summary>

$f=x_2-4x_1^2+3x_1x_2-x_2^2$ ⟹ $f_1=-8x_1+3x_2$, $f_2=1+3x_1-2x_2$.

**Le système** : $-8x_1^*+3x_2^*=0$ et $3x_1^*-2x_2^*=-1$, soit $A\mathbf{x}=(0,-1)^T$ avec $A=\begin{pmatrix}-8&3\\3&-2\end{pmatrix}$, $|A|=16-9=7$.

$$A^{-1}=\frac17\begin{pmatrix}-2&-3\\-3&-8\end{pmatrix} \qquad\Longrightarrow\qquad \mathbf{x}^*=\left(\frac37,\ \frac87\right)$$

⚠️ *« **Nous ne savons pas encore si nous avons trouvé un maximum ou un minimum. POUR CELA, IL FAUT REGARDER LES CONDITIONS DU SECOND ORDRE.** »*

</details>

<details class="details--riche">
<summary>

**9. Énoncer et démontrer le théorème A2.10.**

</summary>

**MAX intérieur local en $\mathbf{x}^*$ ⟹ $H(\mathbf{x}^*)$ SEMI-DÉFINIE NÉGATIVE · MIN ⟹ SEMI-DÉFINIE POSITIVE.**

**La preuve** *« bâtit DIRECTEMENT à partir de celle du théorème A2.9 »* : en différentiant $g'(t)=\sum_i f_i(\mathbf{x}+t\mathbf{z})z_i$ une seconde fois,

$$g''(t)=\sum_j\sum_i\frac{\partial^2f(\mathbf{x}+t\mathbf{z})}{\partial x_i\partial x_j}z_iz_j \tag{P.1}$$

⚠️ **Par le théorème A2.8, $g''(0)\leq0$** ⟹ $\mathbf{z}^{T}H(\mathbf{x}^*)\mathbf{z}\leq0$ ⟹ *« **parce que $\mathbf{z}$ était ARBITRAIRE** »*, semi-définitude négative

</details>

<details class="details--riche">
<summary>

**10. Distinguer conditions nécessaires et suffisantes.**

</summary>

> **NÉCESSAIRES** : *« nous permettant de faire des énoncés comme « **SI $\mathbf{x}^*$ maximise $f$, ALORS $f_i(\mathbf{x}^*)=0$ et $H(\mathbf{x}^*)$ est semi-définie négative** ». Ces conditions peuvent aider à **LOCALISER des maxima POTENTIELS** »*.

> ⚠️ **SUFFISANTES** : *« « **SI TELLE ET TELLE CHOSE se produit en $\mathbf{x}$, ALORS $\mathbf{x}$ OPTIMISE la fonction** ». […] **Comme on peut le suspecter, ELLES SONT PLUS STRINGENTES.** »*

⚠️ **Elles exigent LES FORMES STRICTES** : *« **ceci sert à écarter la possibilité de prendre UN POINT D'INFLEXION pour un optimum** »*, et alors *« la fonction sera **STRICTEMENT CONCAVE DANS UNE BOULE autour de $\mathbf{x}^*$** »*.

</details>

<details class="details--riche">
<summary>

**11. Quelle est la difficulté pratique ?**

</summary>

> *« **LOCALISER UN POINT CRITIQUE EST FACILE. Nous posons simplement toutes les dérivées partielles premières égales à zéro et résolvons le système de $n$ équations. DÉTERMINER SI LA HESSIENNE EST DÉFINIE NÉGATIVE OU POSITIVE LÀ SERA GÉNÉRALEMENT MOINS FACILE.** »*

</details>

<details class="details--riche">
<summary>

**12. Définir les mineurs principaux.**

</summary>

$$D_1=f_{11} \qquad D_2=\begin{vmatrix}f_{11}&f_{12}\\f_{21}&f_{22}\end{vmatrix} \qquad \dots \qquad D_n=|H(\mathbf{x})|$$

> ⚠️ *« Chacun est le déterminant de la matrice obtenue **quand les $(n-i)$ DERNIÈRES LIGNES ET COLONNES de $H(\mathbf{x})$ sont SUPPRIMÉES**. […] **On les appelle mineurs PRINCIPAUX parce qu'ils sont obtenus à partir de sous-matrices formées EN DESCENDANT LA DIAGONALE PRINCIPALE.** »*

</details>

<details class="details--riche">
<summary>

**13. Énoncer le théorème A2.11.**

</summary>

**1.** $(-1)^{i}D_i(\mathbf{x})>0$ pour $i=1,\dots,n$ ⟹ **$H(\mathbf{x})$ DÉFINIE NÉGATIVE** **2.** $D_i(\mathbf{x})>0$ pour $i=1,\dots,n$ ⟹ **$H(\mathbf{x})$ DÉFINIE POSITIVE**

⚠️ **Si la condition tient POUR TOUT $\mathbf{x}$ du domaine, $f$ est STRICTEMENT concave (resp. convexe).**

> *« la fonction sera strictement concave si **les mineurs principaux ALTERNENT TOUJOURS EN SIGNE, EN COMMENÇANT PAR NÉGATIF**. Elle sera strictement convexe si **ils sont TOUS POSITIFS** »*.

</details>

<details class="details--riche">
<summary>

**14. Démontrer le théorème A2.11 à deux variables.**

</summary>

> *« Une preuve **complètement générale** invoquerait la partie 4 du théorème A2.4 […] **c'est un RÉSULTAT BIEN CONNU EN ALGÈBRE LINÉAIRE** *(voir Hohn 1973)*. **ICI, NOUS DONNERONS UNE PREUVE SIMPLE POUR LE CAS DE DEUX VARIABLES.** »*

Avec $D_1=f_{11}$ et $D_2=f_{11}f_{22}-(f_{12})^2$ *( **en utilisant $f_{12}=f_{21}$, Young**)*, et $\mathbf{z}^{T}H\mathbf{z}=f_{11}z_1^2+2f_{12}z_1z_2+f_{22}z_2^2$ **(P.2)** :

⚠️ **AJOUTER ET SOUSTRAIRE $(f_{12})^2(z_2)^2/f_{11}$**, factoriser, et **reconnaître un carré** :

$$\mathbf{z}^{T}H\mathbf{z}=f_{11}\left(z_1+\frac{f_{12}}{f_{11}}z_2\right)^{2}+\frac{f_{11}f_{22}-(f_{12})^2}{f_{11}}(z_2)^2 \tag{P.3}$$

**Si les mineurs alternent dès négatif** : le premier produit est **non positif** et le second **strictement négatif** *(car $z_2\neq0$ et « **le numérateur et le dénominateur ont des SIGNES OPPOSÉS** »)* ⟹ $\mathbf{z}^{T}H\mathbf{z}<0$

</details>

<details class="details--riche">
<summary>

**15. Énoncer le théorème A2.12 et refaire l'exemple A2.7.**

</summary>

**1.** $f_i(\mathbf{x}^*)=0$ **et** $(-1)^{i}D_i(\mathbf{x}^*)>0$ ⟹ **MAXIMUM local** **2.** $f_i(\tilde{\mathbf{x}})=0$ **et** $D_i(\tilde{\mathbf{x}})>0$ ⟹ **MINIMUM local**

**Exemple A2.7** : $H=\begin{pmatrix}-8&3\\3&-2\end{pmatrix}$, $D_1=-8<0$, $D_2=16-9=7>0$ ⟹ *« **parce qu'ils ALTERNENT EN SIGNE, EN COMMENÇANT PAR NÉGATIF, $\mathbf{x}^*=(3/7,\ 8/7)$ est UN MAXIMUM LOCAL** »*

⚠️ **La remarque décisive** : *« **la hessienne était COMPLÈTEMENT INDÉPENDANTE DE $\mathbf{x}$** […] **ceci SUFFIT à garantir que la fonction est STRICTEMENT CONCAVE. […] S'IL A LA MOINDRE COLLINE, IL SEMBLE QU'IL NE PEUT EN AVOIR QU'UNE, ET CELLE-CI DOIT AVOIR UN SEUL POINT LE PLUS HAUT.** »*

</details>

<details class="details--riche">
<summary>

**16. Énoncer et démontrer le théorème A2.13.**

</summary>

Pour $f$ **CONCAVE** et $\mathbf{x}^*$ **INTÉRIEUR**, les trois énoncés sont **équivalents** :

**1.** $\nabla f(\mathbf{x}^*)=\mathbf{0}$ · **2.** **MAXIMUM LOCAL** · **3.** **MAXIMUM GLOBAL**

**La preuve** : *« clairement, **3 ⟹ 2**, et par le théorème A2.9, **2 ⟹ 1**. Il ne reste donc qu'à montrer que **1 ⟹ 3** »*.

⚠️ **Par le THÉORÈME A2.4(3)** : $\ f(\mathbf{x})\leq f(\mathbf{x}^*)+\nabla f(\mathbf{x}^*)(\mathbf{x}-\mathbf{x}^*)$. **Le terme du gradient s'ANNULE** ⟹ $f(\mathbf{x})\leq f(\mathbf{x}^*)$ **pour tout $\mathbf{x}$**

</details>

<details class="details--riche">
<summary>

**17. Quelle est la limite du théorème A2.13 ?**

</summary>

> *« Le théorème A2.13 dit que sous convexité ou concavité, **tout optimum local est un optimum global. NOTEZ, CEPENDANT, QU'IL EST TOUJOURS POSSIBLE QUE LA VALEUR LA PLUS BASSE (LA PLUS HAUTE) SOIT ATTEINTE EN PLUS D'UN POINT DU DOMAINE. Si nous voulons que la valeur soit atteinte EN UN POINT UNIQUE, NOUS DEVONS IMPOSER LA CONCAVITÉ OU LA CONVEXITÉ STRICTE.** »*

*(L'exercice A2.12 précise que **l'ensemble des maximiseurs globaux d'une fonction concave est un ensemble CONVEXE** — un « plateau ».)*

</details>

<details class="details--riche">
<summary>

**18. Énoncer et démontrer le théorème A2.14.**

</summary>

**$\mathbf{x}^*$ maximise une fonction STRICTEMENT CONCAVE ⟹ c'est LE maximiseur global UNIQUE.**

**La preuve, par l'absurde** :

| Pas | L'argument |
|---|---|
| **1** | S'il existe $\mathbf{x}'\neq\mathbf{x}^*$ avec $f(\mathbf{x}')=f(\mathbf{x}^*)$… |
| **2** | **la stricte concavité donne** $f(\mathbf{x}^{t})>tf(\mathbf{x}')+(1-t)f(\mathbf{x}^*)$ pour $t\in(0,1)$ |
| **3** | **les deux valeurs étant ÉGALES**, le membre de droite **vaut $f(\mathbf{x}')$** |
| **4** | ⟹ $f(\mathbf{x}^{t})>f(\mathbf{x}')$ — *« **ceci CONTREDIT l'hypothèse que $\mathbf{x}'$ est un maximiseur GLOBAL** »* |

</details>

<details class="details--riche">
<summary>

**19. Énoncer et démontrer le théorème A2.15.**

</summary>

**1.** $f$ **STRICTEMENT CONCAVE** et $f_i(\mathbf{x}^*)=0$ ⟹ **$\mathbf{x}^*$ est LE MAXIMISEUR GLOBAL UNIQUE.** **2.** $f$ **STRICTEMENT CONVEXE** et $f_i(\tilde{\mathbf{x}})=0$ ⟹ **$\tilde{\mathbf{x}}$ est LE MINIMISEUR GLOBAL UNIQUE.**

> *« **Ce théorème a UN ATTRAIT INTUITIF ÉNORME.** »*

**La preuve enchaîne deux théorèmes** : $f$ strictement concave est **concave** ⟹ **théorème A2.13** ⟹ **maximum GLOBAL** ; puis **théorème A2.14** ⟹ **UNICITÉ**.

$$\boxed{\;\textbf{GRADIENT NUL} + \textbf{STRICTE CONCAVITÉ} \ \Longrightarrow \ \textbf{MAXIMUM GLOBAL UNIQUE}\;}$$

</details>

<details class="details--riche">
<summary>

**20. Que se passe-t-il quand un mineur principal est NUL ?**

</summary>

⚠️ **Le théorème A2.12 exige des inégalités STRICTES** — **il ne dit alors RIEN**.

**Le cas type** *(exercice A2.24(c))* : $f=x_1^3-x_2^2+2x_2$ a un point critique en $(0,1)$, où $D_1=6x_1=0$ **et** $D_2=0$.

⚠️ **Il faut examiner la fonction directement** : le long de $x_2=1$, $f=x_1^3+1$, **qui CROÎT en traversant $x_1=0$** ⟹ **NI maximum NI minimum** — c'est **un POINT D'INFLEXION**, exactement ce que les formes strictes servent à écarter.

</details>

<details class="details--riche">
<summary>

**21. Reconnaître un point-selle.**

</summary>

*(Exercice A2.24(e).)* $f=x_1^3-6x_1x_2+x_2^3$ a **deux points critiques** : $(0,0)$ et $(2,2)$.

| Le point | $H$ | $D_1$ | $D_2$ | Le verdict |
|---|---|---|---|---|
| $(0,0)$ | $\begin{pmatrix}0&-6\\-6&0\end{pmatrix}$ | $0$ | $-36<0$ | **INDÉFINIE ⟹ POINT-SELLE** |
| $(2,2)$ | $\begin{pmatrix}12&-6\\-6&12\end{pmatrix}$ | $12>0$ | $108>0$ | **MINIMUM local**, $f=-8$ |

⚠️ **$D_2<0$ pour une matrice symétrique $2\times2$ signale TOUJOURS l'indéfinitude** — donc ni max ni min.

</details>

<details class="details--riche">
<summary>

**22. Pourquoi les transformations croissantes ne changent rien ?**

</summary>

*(Exercice A2.11.)* Si $F$ est **croissante**, $\mathbf{x}^*$ est un optimum local de $f$ **ssi** il l'est de $F(f(\mathbf{x}))$.

**Le sens ⟹** : $f(\mathbf{x}^*)\geq f(\mathbf{x})$ ⟹ **$F$ croissante** ⟹ $F(f(\mathbf{x}^*))\geq F(f(\mathbf{x}))$ **Le sens ⟸ exige que $F$ soit STRICTEMENT croissante** — sinon une $F$ constante rendrait tout point optimal. *(Enrichissement, hors cours.)*

⚠️ **La portée** : c'est **ce qui justifie de maximiser $\ln u$ au lieu de $u$**, et plus profondément **le caractère ORDINAL de l'utilité**.

</details>

<details class="details--riche">
<summary>

**23. Distinguer les DEUX hessiennes bordées.**

</summary>

*(Exercice A2.18.)* La matrice d'Arrow-Enthoven

$$H^*\equiv\begin{pmatrix}0&f_1&\cdots&f_n\\f_1&f_{11}&\cdots&f_{1n}\\\vdots&\vdots&\ddots&\vdots\\f_n&f_{n1}&\cdots&f_{nn}\end{pmatrix}$$

⚠️ *« **C'est un type DIFFÉRENT de hessienne bordée de celui que nous avons considéré dans le texte. Ici, la matrice des partielles SECONDES est bordée par les partielles PREMIÈRES et un ZÉRO** »*.

⚠️ **Ses mineurs commencent à $D_2$** et servent à tester **la QUASICONCAVITÉ** *(et non la concavité)* : **(i)** $f$ quasiconcave ⟹ $D_2\leq0$, $D_3\geq0$, … *(**NÉCESSAIRE**)* **(ii)** $D_2<0$, $D_3>0$, … pour tout $\mathbf{x}\geq0$ ⟹ **$f$ quasiconcave** *(**SUFFISANT**)* ; et **pour $\mathbf{x}\gg0$** ⟹ **STRICTEMENT quasiconcave** sur l'orthant positif.

</details>

<details class="details--riche">
<summary>

**24. Traiter l'exercice A2.19.**

</summary>

$f(x_1,x_2)=(x_1x_2)^2$ sur $\mathbb{R}^2_+$.

**CONCAVE ? NON** — **par le théorème A2.5** : $f_{11}=2x_2^2>0$ dès que $x_2\neq0$, alors que la concavité exigerait $f_{11}\leq0$.

**QUASICONCAVE ? OUI** — **par le théorème A1.14** : $S(y)=\{x_1x_2\geq\sqrt{y}\}$ pour $y\geq0$ est **la région au-dessus d'une hyperbole**, convexe *(exercice A1.7(d))*.

⚠️ **L'illustration parfaite que la réciproque du théorème A1.15 est fausse.**

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Maximum LOCAL ? | $f(\mathbf{x}^*)\geq f(\mathbf{x})$ **sur $B_\varepsilon(\mathbf{x}^*)$** |
| Maximum GLOBAL ? | **sur TOUT LE DOMAINE** |
| Maximum UNIQUE ? | **$>$ STRICT pour $\mathbf{x}\neq\mathbf{x}^*$** |
| Maximum INTÉRIEUR ? | *« dans l'intérieur du domaine, **PAS À SES BORDS** »* |
| Le §A2.2 traite… ? | **UNIQUEMENT les optima INTÉRIEURS** |
| Ce que veut le théoricien ? | *« **JUSTE LES CARACTÉRISER** »*, pas les calculer |
| FONC d'un max, une variable ? | $f'(x^*)=0$ |
| SONC d'un max ? | $f''(x^*)\leq0$ |
| SONC d'un min ? | $f''(\tilde{x})\geq0$ |
| Ces conditions sont… ? | **NÉCESSAIRES** |
| L'astuce centrale du chapitre ? | **$g(t)=f(\mathbf{x}^*+t\mathbf{z})$ est optimisée en $t=0$** |
| $g'(0)$ ? | $\nabla f(\mathbf{x}^*)\mathbf{z}$ |
| $g''(0)$ ? | $\mathbf{z}^{T}H(\mathbf{x}^*)\mathbf{z}$ |
| Théorème A2.9 ? | **$\nabla f(\mathbf{x}^*)=\mathbf{0}$** |
| Combien d'équations ? | **$n$, SIMULTANÉES** |
| Le pas final de sa preuve ? | **Prendre les $n$ VECTEURS UNITAIRES pour $\mathbf{z}$** |
| Pourquoi cette preuve « pas la plus simple » ? | **Elle se réutilise pour les SONC** |
| Le point critique de l'exemple A2.6 ? | $(3/7,\ 8/7)$ |
| Le déterminant y ? | $\|A\|=16-9=7$ |
| La valeur optimale $y^*$ ? | **$4/7$** *(exercice A2.15)* |
| Théorème A2.10, cas max ? | **$H(\mathbf{x}^*)$ SEMI-DÉFINIE NÉGATIVE** |
| Cas min ? | **SEMI-DÉFINIE POSITIVE** |
| Le pas clé de sa preuve ? | *« **parce que $\mathbf{z}$ était ARBITRAIRE** »* |
| Conditions nécessaires — à quoi servent-elles ? | **À LOCALISER des optima POTENTIELS** |
| Conditions suffisantes — que permettent-elles ? | **De CONCLURE : « alors $\mathbf{x}$ optimise »** |
| Pourquoi les formes STRICTES ? | *« **écarter la possibilité de prendre UN POINT D'INFLEXION pour un optimum** »* |
| Ce qui est facile ? difficile ? | **FACILE : trouver un point critique · DIFFICILE : la définitude** |
| Comment forme-t-on $D_i$ ? | **En supprimant les $(n-i)$ dernières LIGNES ET COLONNES** |
| Pourquoi « principaux » ? | *« en descendant **LA DIAGONALE PRINCIPALE** »* |
| Théorème A2.11(1) ? | $(-1)^iD_i>0$ ⟹ **DÉFINIE NÉGATIVE** |
| Théorème A2.11(2) ? | $D_i>0$ ⟹ **DÉFINIE POSITIVE** |
| Le patron d'une définie négative ? | **$D_1<0$, $D_2>0$, $D_3<0$, …** |
| Si la condition tient PARTOUT ? | **$f$ est STRICTEMENT concave (ou convexe)** |
| L'astuce de la preuve à 2 variables ? | **COMPLÉTER LE CARRÉ** |
| Ce qu'on ajoute et soustrait ? | $(f_{12})^2(z_2)^2/f_{11}$ |
| Ce qu'est le numérateur du 2ᵉ terme ? | **$D_2$ lui-même** |
| Théorème A2.12(1) ? | **$f_i=0$ ET $(-1)^iD_i>0$ ⟹ MAXIMUM local** |
| Les mineurs de l'exemple A2.7 ? | $D_1=-8$, $D_2=7$ |
| Ce qu'ils prouvent ? | **MAXIMUM local en $(3/7,\ 8/7)$** |
| Ce que la hessienne constante ajoute ? | **STRICTE CONCAVITÉ GLOBALE** |
| Théorème A2.13 ? | **Pour $f$ CONCAVE : gradient nul $\iff$ max local $\iff$ max GLOBAL** |
| L'outil de sa preuve ? | **Le théorème A2.4(3)** *(l'inégalité de la tangente)* |
| Sa limite ? | *« la valeur peut être atteinte **EN PLUS D'UN POINT** »* |
| L'ensemble des maximiseurs est… ? | **CONVEXE** *(exercice A2.12)* |
| Théorème A2.14 ? | **STRICTEMENT concave ⟹ maximiseur global UNIQUE** |
| Sa méthode de preuve ? | **PAR L'ABSURDE** |
| Le pivot de la contradiction ? | **Le point intermédiaire est STRICTEMENT MEILLEUR** |
| Théorème A2.15 ? | **Gradient nul $+$ stricte concavité ⟹ MAX GLOBAL UNIQUE** |
| Comment se prouve-t-il ? | **A2.13 puis A2.14** |
| Que faire si un $D_i=0$ ? | **Le test est MUET — examiner la fonction** |
| Le cas type ? | $x_1^3-x_2^2+2x_2$ en $(0,1)$ — **inflexion** |
| Ce que signale $D_2<0$ (2 variables) ? | **INDÉFINIE ⟹ POINT-SELLE** |
| Une transformation croissante… ? | **PRÉSERVE les optima** *(A2.11)* |
| Sa portée économique ? | **Le caractère ORDINAL de l'utilité** |
| La hessienne bordée d'A2.18 ? | **Bordée par les partielles PREMIÈRES et un ZÉRO** |
| Ce qu'elle teste ? | **La QUASICONCAVITÉ** |
| Ses mineurs commencent à… ? | **$D_2$** |
| $(x_1x_2)^2$ est-elle concave sur $\mathbb{R}^2_+$ ? | **NON** — $f_{11}=2x_2^2>0$ |
| Est-elle quasiconcave ? | **OUI** — ses ensembles supérieurs sont **au-dessus d'une hyperbole** |
| Le test le plus rapide pour réfuter la concavité ? | **Une seule $f_{ii}>0$ suffit** *(thm A2.5)* |
