# Fiche 525 — Optimisation sous contraintes d'égalité : la méthode de Lagrange

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — appendice mathématique, §A2.3.1 à §A2.3.4 (p. 577-591) |
| **Difficulté** | Avancé — la technique centrale de toute la microéconomie |
| **Temps d'étude estimé** | 130 min |
| **Prérequis** | [Fiche 524](524-jehle-optimisation-libre.md) — conditions du premier et du second ordre, mineurs principaux · [Fiche 523](523-jehle-calcul-differentiel-homogeneite.md) — gradient, différentielle totale · [Fiche 521](521-jehle-ensembles-applications.md) — théorème de Weierstrass |
| **Concepts clés** | Rareté, contrainte d'égalité, fonction objectif, maximande, variables de choix, ensemble réalisable, méthode de substitution, fonction lagrangienne, multiplicateur de Lagrange, différentielle totale, changements admissibles, indépendance linéaire des gradients, tangence, pente d'un ensemble de niveau, hessienne bordée, mineurs principaux bordés |
| **Poids à l'examen** | Le vocabulaire du programme (A2.4) · la **méthode de SUBSTITUTION** et ses limites · **la construction du LAGRANGIEN** et les conditions (A2.7)-(A2.9) · **l'argument de plausibilité par les différentielles totales** · l'**exemple A2.8** · le **cas général (A2.13)-(A2.15)** · le **THÉORÈME A2.16 de LAGRANGE** et sa condition d'**INDÉPENDANCE LINÉAIRE** · **l'interprétation par la TANGENCE (A2.19)-(A2.20)** · la **HESSIENNE BORDÉE**, la formule (A2.27) et le **théorème A2.17** · le **théorème A2.18** et son patron de signes. |

## 🎯 Vue d'ensemble

```
LE FIL DU §A2.3.1 - §A2.3.4 : la METHODE DE LAGRANGE

  §A2.3  POURQUOI DES CONTRAINTES ?

     « LA RARETE est un fait OMNIPRESENT de la vie economique --
       on pourrait meme DEFINIR L'ECONOMIE comme L'ETUDE DU
       COMPORTEMENT FACE A LA RARETE. »

     TROIS types de contraintes :  EGALITE · NON-NEGATIVITE ·
                                   INEGALITE quelconque

  §A2.3.1  LE PROBLEME  (A2.4)

     max f(x1, x2)   sous contrainte   g(x1, x2) = 0

     f  =  FONCTION OBJECTIF  ou  MAXIMANDE
     x1, x2  =  VARIABLES DE CHOIX
     g  =  CONTRAINTE ;  l'ensemble des x admissibles =
           ENSEMBLE DE CONTRAINTE  ou  ENSEMBLE REALISABLE

     LA METHODE DE SUBSTITUTION :  isoler  x2 = g~(x1)
     puis maximiser  f(x1, g~(x1))  SANS CONTRAINTE
     ->  MAIS elle echoue des que la contrainte est compliquee,
         ou qu'il y a PLUS DE DEUX variables ou PLUS D'UNE
         contrainte.

  §A2.3.2  L'IDEE DE LAGRANGE

     « Il existe TOUJOURS UN PROBLEME SANS CONTRAINTE que nous
       pouvons resoudre avec nos methodes habituelles et qui
       nous donne, COMME SOUS-PRODUIT, la solution cherchee. »

     LE LAGRANGIEN :   L(x1, x2, lambda) = f - lambda * g

     LES TROIS CONDITIONS DU PREMIER ORDRE  (A2.7) - (A2.9) :
        dL/dx1 = f1 - lambda g1 = 0
        dL/dx2 = f2 - lambda g2 = 0
        dL/dlambda = - g = 0     ->  LA CONTRAINTE ELLE-MEME

     LE CAS GENERAL :  n variables, m < n contraintes
        L(x, lambda) = f(x) - SOMME_j lambda_j g_j(x)
        ->  un systeme de  n + m  equations

  THEOREME A2.16 (LAGRANGE) : si les GRADIENTS des contraintes
  sont LINEAIREMENT INDEPENDANTS a l'optimum, alors les
  multiplicateurs EXISTENT et sont UNIQUES.

  §A2.3.3  LA LECTURE GEOMETRIQUE

     pente d'un niveau de f  =  - f1 / f2       (A2.17)
     pente de la contrainte  =  - g1 / g2       (A2.18)

     LES CPO DISENT :    f1 / f2  =  g1 / g2    (A2.19)
                         g(x1, x2) = 0          (A2.20)

     « Un point QUI EST SUR LA CONTRAINTE et OU LES PENTES SONT
       EGALES est, PAR DEFINITION, UN POINT DE TANGENCE. »

  §A2.3.4  LES CONDITIONS DU SECOND ORDRE

     « Nous pouvons REDUIRE LA DIMENSIONNALITE des exigences de
       courbure EN EXPLOITANT L'INTERDEPENDANCE entre les x
       imposee par les contraintes. »

     LA HESSIENNE BORDEE du lagrangien :

              |  0   g1   g2  |
        Hbar =| g1  L11  L12  |
              | g2  L21  L22  |

     d2y/dx1^2  =  (-1) / (g2)^2  *  DET(Hbar)       (A2.27)

     THEOREME A2.17  DET(Hbar) > 0  ->  MAXIMUM local
                     DET(Hbar) < 0  ->  MINIMUM local
                     ( ATTENTION : LES SIGNES SONT INVERSES )

     THEOREME A2.18  cas general : les  n - m  mineurs
        MAXIMUM  ->  ils ALTERNENT en commencant par POSITIF
        MINIMUM  ->  ils sont TOUS NEGATIFS
```

> ⚠️ **Note de transcription — spécifique à cette section.** Le PDF **BROUILLE COMPLÈTEMENT DEUX PARAGRAPHES** du §A2.3.2 *(les lettres de deux colonnes s'y entremêlent et donnent une bouillie illisible)* ; leur contenu est **restitué à partir du raisonnement encadrant, et signalé comme tel à chaque fois**. Il **PERD LE BARRÉ DE $\neq$** *(« supposons $\lambda^*=0$ » signifie $\lambda^*\neq0$, et « en supposant que $g_2=0$ » signifie $g_2\neq0$)*, perd $\sum$, et **place l'énoncé du théorème A2.17 en désordre** *(les fragments « $>0$ » et « $(<0)$ » y sont rejetés en tête de ligne)*. Les figures utilisent l'encodage Symbol Mac *(`ϭ` = « = », `Ϫ` = « − »)*. **Réparation de transcription, non ajout de contenu.**

## 🟠 Concept 1 — §A2.3 : pourquoi des contraintes ?

### 1.1 Le motif économique

> *« Auparavant, nous cherchions simplement à caractériser des points où une fonction atteint un optimum local **quand nous étions LIBRES de choisir les variables $\mathbf{x}$ COMME BON NOUS SEMBLAIT. En économie, NOUS N'AVONS HABITUELLEMENT PAS CE LUXE.** »*

> ⚠️ *« **LA RARETÉ est un fait OMNIPRÉSENT de la vie économique — ON POURRAIT MÊME DÉFINIR L'ÉCONOMIE COMME L'ÉTUDE DU COMPORTEMENT FACE À LA RARETÉ. La rareté s'exprime le plus communément comme DES CONTRAINTES sur les valeurs admissibles des variables économiques. Les agents sont alors représentés comme cherchant À FAIRE DE LEUR MIEUX (en quelque sens pertinent à la question traitée) À L'INTÉRIEUR DES CONTRAINTES QU'ILS AFFRONTENT.** »*

### 1.2 Les trois types de contraintes

> *« Il y a **TROIS TYPES DE BASE de contraintes** que nous rencontrerons. Ce sont **les contraintes d'ÉGALITÉ, les contraintes de NON-NÉGATIVITÉ, et, plus généralement, TOUTE FORME DE CONTRAINTE D'INÉGALITÉ.** »*

> ⚠️ *« **Nous confinerons la discussion aux problèmes de MAXIMISATION, en notant simplement les modifications (s'il y en a) pour les problèmes de minimisation.** »*

*(Cette fiche traite **les contraintes d'ÉGALITÉ** ; les deux autres types relèvent de §A2.3.5-A2.3.6.)*

## 🟠 Concept 2 — §A2.3.1 : le problème et la méthode de substitution

### 2.1 L'écriture formelle

> *« Considérez le choix de $x_1$ et $x_2$ pour maximiser $f(x_1,x_2)$, **quand $x_1$ et $x_2$ doivent satisfaire une relation particulière entre eux que nous écrivons SOUS FORME IMPLICITE $g(x_1,x_2)=0$.** »*

$$\max_{x_1,x_2}\ f(x_1,x_2)\qquad\text{sous contrainte}\qquad g(x_1,x_2)=0 \tag{A2.4}$$

### 🔴 2.2 Le vocabulaire, mot pour mot

| Le terme | Sa définition |
|---|---|
| **$f(x_1,x_2)$** | *« la **FONCTION OBJECTIF**, ou **MAXIMANDE** »* |
| **$x_1$, $x_2$** | *« les **VARIABLES DE CHOIX** […] **habituellement écrites SOUS l'opérateur « max » pour NOUS RAPPELER QUE CE SONT DES VALEURS DE $x_1$ ET $x_2$ QUE NOUS CHERCHONS** »* |
| **$g(x_1,x_2)$** | *« **LA CONTRAINTE**, et elle spécifie conjointement **les valeurs des variables de choix que nous sommes AUTORISÉS à considérer comme RÉALISABLES ou ADMISSIBLES** »* |
| **L'ensemble des $(x_1,x_2)$ admissibles** | *« **L'ENSEMBLE DE CONTRAINTE** ou **L'ENSEMBLE RÉALISABLE** »* |

### 2.3 La méthode de substitution

> *« **Une manière de résoudre ce problème est PAR SUBSTITUTION. Si la fonction de contrainte nous permet de résoudre pour l'un des $x_i$ en fonction de l'autre, nous pouvons RÉDUIRE le problème contraint à deux variables en un problème SANS CONTRAINTE, ET AVEC UNE VARIABLE DE MOINS.** »*

**Si $g(x_1,x_2)=0$ peut s'écrire** $\ x_2=\tilde{g}(x_1)$ **(A2.5)**, on substitue directement :

$$\max_{x_1}\ f\big(x_1,\ \tilde{g}(x_1)\big) \tag{A2.6}$$

⚠️ **LE PIÈGE DU CALCUL** : *« nous devons garder à l'esprit que **$x_1$ influence maintenant $f$ DE DEUX FAÇONS : « DIRECTEMENT » par sa PROPRE position dans $f$, et « INDIRECTEMENT » par la position d'origine de $x_2$. Ainsi, quand nous différentions (A2.6), nous devons nous souvenir que $f$ a DEUX dérivées partielles, et NOUS DEVONS NOUS SOUVENIR D'UTILISER LA RÈGLE DE COMPOSITION.** »*

$$\frac{\partial f\big(x_1^*,\tilde{g}(x_1^*)\big)}{\partial x_1}+\underbrace{\frac{\partial f\big(x_1^*,\tilde{g}(x_1^*)\big)}{\partial x_2}\cdot\frac{d\tilde{g}(x_1^*)}{dx_1}}_{\textbf{la règle de COMPOSITION}}=0$$

> *« Quand nous avons trouvé $x_1^*$, **nous le réinjectons dans la contrainte (A2.5) et trouvons $x_2^*=\tilde{g}(x_1^*)$. La paire $(x_1^*,x_2^*)$ résout alors le problème contraint, POURVU QUE LA CONDITION DU SECOND ORDRE APPROPRIÉE SOIT AUSSI REMPLIE.** »*

### 🔴 2.4 Pourquoi la substitution ne suffit pas

> *« **Malheureusement, IL EST FACILE D'IMAGINER DES CAS où la relation de contrainte est COMPLIQUÉE et où il n'est PAS SI FACILE de résoudre pour une variable en fonction de l'autre. QUI PLUS EST, de nombreux problèmes intéressants impliquent PLUS DE DEUX variables de choix et PLUS D'UNE contrainte. LA MÉTHODE DE SUBSTITUTION N'EST PAS BIEN ADAPTÉE à ces problèmes plus compliqués. Dans certains cas, la substitution serait INUTILEMENT LOURDE. Dans d'autres, elle serait SIMPLEMENT IMPOSSIBLE.** »*

> *« **Heureusement, il y a UNE MEILLEURE FAÇON — capable de traiter UNE CLASSE DE PROBLÈMES BEAUCOUP PLUS LARGE.** »*

## 🔴 Concept 3 — §A2.3.2 : la méthode de Lagrange

### 🔴 3.1 L'intuition fondatrice

> *« La méthode de Lagrange **jaillit d'UNE QUESTION SIMPLE : COMMENT POUVONS-NOUS UTILISER CE QUE NOUS SAVONS DÉJÀ sur l'optimisation des fonctions de plusieurs variables QUAND IL N'Y A PAS DE CONTRAINTES pour nous aider à résoudre les problèmes QUAND IL Y EN A ?** »*

> *« Nous savons que résoudre un problème sans contraintes **est une affaire FACILE. Nous trouvons simplement les partielles premières, les posons égales à zéro, et résolvons le système.** »*

$$\boxed{\;\textbf{« L'INTUITION DE LAGRANGE fut de voir qu'IL EXISTE TOUJOURS UN PROBLÈME}\\\textbf{SANS CONTRAINTE que nous pouvons résoudre avec nos méthodes habituelles}\\\textbf{et QUI NOUS DONNE, COMME SOUS-PRODUIT, LA SOLUTION QUE NOUS CHERCHONS}\\\textbf{au problème d'optimisation CONTRAINT. »}\;}$$

### 3.2 La construction du lagrangien

> *« Supposons que nous **multipliions l'équation de contrainte par une NOUVELLE VARIABLE, appelons-la $\lambda$ (lambda), QUE NOUS TIRONS SIMPLEMENT DU CHAPEAU parce qu'elle se révélera UTILE. Si nous SOUSTRAYONS ce produit de la fonction objectif**, nous aurons construit une nouvelle fonction, appelée **LA FONCTION LAGRANGIENNE**, ou **LAGRANGIEN** pour faire court, et notée $\mathcal{L}(\cdot)$. »*

$$\boxed{\;\mathcal{L}(x_1,x_2,\lambda)\ \equiv\ f(x_1,x_2)\ -\ \lambda\,g(x_1,x_2)\;}$$

⚠️ *« Cette nouvelle fonction a **TROIS variables au lieu de deux** : à savoir $x_1$, $x_2$ **ET $\lambda$**. »*

### 3.3 Les trois conditions du premier ordre

<div class="callout" data-kind="methode">

<span class="callout__lab">comment déterminerions-nous les points critiques de $\mathcal{L}(\cdot)$ SI C'ÉTAIT UNE FONCTION ORDINAIRE (NON CONTRAINTE) DE TROIS VARIABLES ? NOUS PRENDRIONS SES TROIS DÉRIVÉES PARTIELLES ET LES POSERIONS ÉGALES À ZÉRO.</span>

*« Maintenant, »*

</div>

$$\frac{\partial\mathcal{L}}{\partial x_1}=\frac{\partial f(x_1^*,x_2^*)}{\partial x_1}-\lambda^*\frac{\partial g(x_1^*,x_2^*)}{\partial x_1}=0 \tag{A2.7}$$

$$\frac{\partial\mathcal{L}}{\partial x_2}=\frac{\partial f(x_1^*,x_2^*)}{\partial x_2}-\lambda^*\frac{\partial g(x_1^*,x_2^*)}{\partial x_2}=0 \tag{A2.8}$$

$$\frac{\partial\mathcal{L}}{\partial\lambda}=-\,g(x_1^*,x_2^*)=0 \tag{A2.9}$$

⚠️ **La troisième condition N'EST RIEN D'AUTRE QUE LA CONTRAINTE ELLE-MÊME.** C'est ce qui garantit que la solution est **réalisable**.

> *« Ce sont **TROIS ÉQUATIONS À TROIS INCONNUES**, $x_1$, $x_2$ et $\lambda$. **La méthode de Lagrange AFFIRME que si nous pouvons trouver des valeurs $x_1^*$, $x_2^*$ et $\lambda^*$ qui résolvent ces trois équations SIMULTANÉMENT, alors nous aurons UN POINT CRITIQUE DE $f(x_1,x_2)$ LE LONG DE LA CONTRAINTE $g(x_1,x_2)=0$.** »*

## 🔴 Concept 4 — L'argument de plausibilité

### 4.1 Ce qu'il faut démontrer

> ⚠️ **Note de transcription.** Le paragraphe du livre qui introduit cet argument **est illisible dans le PDF** *(deux colonnes de texte s'y entremêlent lettre par lettre)*. **Ce qui en subsiste**, et que le raisonnement qui suit confirme mot pour mot, est : *« … **à cette contrainte est UN PEU PLUS DIFFICILE, MAIS CELA PEUT ÊTRE FAIT** »*, à propos du fait que la solution des conditions (A2.7)-(A2.9) **maximise effectivement $f$ SOUS LA CONTRAINTE** — la condition (A2.9) garantissant déjà, à elle seule, que **la contrainte est satisfaite**.

### 4.2 La différentielle totale du lagrangien

> *« Considérez notre fonction **« BRICOLÉE »** $\mathcal{L}(\cdot)$ et prenez **sa DIFFÉRENTIELLE TOTALE, en vous souvenant que $\lambda$ est UNE VARIABLE À PART ENTIÈRE de la fonction** »* :

$$d\mathcal{L}=\frac{\partial\mathcal{L}}{\partial x_1}dx_1+\frac{\partial\mathcal{L}}{\partial x_2}dx_2+\frac{\partial\mathcal{L}}{\partial\lambda}d\lambda$$

> *« **Par hypothèse, $x_1^*$, $x_2^*$ et $\lambda^*$ satisfont les conditions du premier ordre (A2.7) à (A2.9) pour un optimum de $\mathcal{L}$, donc $d\mathcal{L}$ évaluée là DOIT ÊTRE ÉGALE À ZÉRO.** »* En substituant :

$$d\mathcal{L}=f_1\,dx_1+f_2\,dx_2-g(x_1^*,x_2^*)\,d\lambda-\lambda^*\big[g_1\,dx_1+g_2\,dx_2\big]=0 \tag{A2.10}$$

**pour tous $dx_1$, $dx_2$ et $d\lambda$.**

### 🔴 4.3 Les deux simplifications

<details class="details--riche">
<summary>

**Simplification 1 — le terme en $d\lambda$ disparaît**

</summary>

> *« Une chose que nous pouvons faire **IMMÉDIATEMENT** pour simplifier est de remarquer à nouveau que **(A2.9) nous dit que LA CONTRAINTE EST SATISFAITE en $x_1^*$ et $x_2^*$, donc $g(x_1^*,x_2^*)=0$. Ceci signifie que LE TROISIÈME TERME DE (A2.10) EST NUL** »* ⟹ le problème se réduit à montrer que

$$d\mathcal{L}=f_1\,dx_1+f_2\,dx_2-\lambda^*\big[g_1\,dx_1+g_2\,dx_2\big]=0 \tag{A2.11}$$

*pour tous les $dx_i$* **implique** *$df=0$ pour ceux des $dx_i$ qui satisfont la contrainte $g$.*

</details>

<details class="details--riche">
<summary>

**Simplification 2 — quels sont les changements ADMISSIBLES ?**

</summary>

> *« Ensuite, **nous devons déterminer QUELLES SONT ces valeurs ADMISSIBLES de $dx_1$ et $dx_2$. Regardez à nouveau l'équation de contrainte. CLAIREMENT, SI $g(x_1,x_2)$ DOIT TOUJOURS ÉGALER ZÉRO, ALORS APRÈS QUE $x_1$ ET $x_2$ ONT CHANGÉ, ELLE DOIT DE NOUVEAU ÊTRE ÉGALE À ZÉRO.** »*

> ⚠️ *« Dit autrement, **les changements ADMISSIBLES de $x_1$ et $x_2$ sont CEUX QUI NE CONDUISENT À AUCUN CHANGEMENT dans la valeur de la fonction de contrainte.** »*

**Dire qu'il n'y a aucun changement de $g$, c'est dire que $dg=0$** :

$$dg=\frac{\partial g(x_1^*,x_2^*)}{\partial x_1}dx_1+\frac{\partial g(x_1^*,x_2^*)}{\partial x_2}dx_2=0 \tag{A2.12}$$

</details>

### 🔴 4.4 La conclusion

> *« **En mettant (A2.11) et (A2.12) ENSEMBLE, nous obtenons LE RÉSULTAT. Si nous ne considérons que des changements des variables qui satisfont (A2.12), alors LE TROISIÈME TERME DE (A2.11) DOIT ÊTRE NUL.** »* ⟹ en $(x_1^*,x_2^*)$, (A2.11) se réduit à

$$d\mathcal{L}=\frac{\partial f(x_1^*,x_2^*)}{\partial x_1}dx_1+\frac{\partial f(x_1^*,x_2^*)}{\partial x_2}dx_2=0$$

**pour tous $dx_1$ et $dx_2$ satisfaisant la contrainte.**

> ⚠️ *« **Mais C'EST PRÉCISÉMENT CE QUE NOUS VOULONS. Cela dit que les solutions $(x_1^*,x_2^*,\lambda^*)$ aux conditions du premier ordre pour un optimum NON CONTRAINT de la fonction de Lagrange GARANTISSENT QUE LA VALEUR DE LA FONCTION OBJECTIF $f$ NE PEUT ÊTRE NI AUGMENTÉE NI DIMINUÉE pour de petits changements de $x_1^*$ et $x_2^*$ QUI SATISFONT LA CONTRAINTE. Par conséquent, NOUS DEVONS ÊTRE À UN MAXIMUM OU À UN MINIMUM de la fonction objectif LE LONG DE LA CONTRAINTE.** »*

> ⚠️ **Note de transcription.** Le paragraphe suivant du livre **est lui aussi brouillé dans le PDF**. **Ce qui en reste lisible** et clôt l'argument est : *« **Les conditions du premier ordre (A2.7) à (A2.9) CARACTÉRISENT donc LES POINTS CRITIQUES de la fonction objectif LE LONG DE LA CONTRAINTE.** »*

### 🔴 4.5 La limite des conditions du premier ordre

> *« **Que ces points critiques soient des MAXIMA ou des MINIMA contraints NE PEUT PAS ÊTRE DÉTERMINÉ À PARTIR DES SEULES CONDITIONS DU PREMIER ORDRE. Distinguer entre les deux exige que nous connaissions LA « COURBURE » des relations objectif et contrainte au point critique en question. Nous examinerons ces questions PLUS TARD.** »* *(⟹ §A2.3.4.)*

<details class="details--riche">
<summary>

**EXEMPLE A2.8 — la méthode de Lagrange au travail**

</summary>

$$\max_{x_1,x_2}\ -ax_1^2-bx_2^2 \qquad\text{sous contrainte}\qquad x_1+x_2-1=0,\qquad a>0,\ b>0 \tag{E.1}$$

**Le lagrangien** :

$$\mathcal{L}(x_1,x_2,\lambda)\equiv -ax_1^2-bx_2^2-\lambda\big(x_1+x_2-1\big)$$

**Les trois conditions du premier ordre** :

$$\frac{\partial\mathcal{L}}{\partial x_1}=-2ax_1-\lambda=0 \tag{E.2}$$

$$\frac{\partial\mathcal{L}}{\partial x_2}=-2bx_2-\lambda=0 \tag{E.3}$$

$$\frac{\partial\mathcal{L}}{\partial\lambda}=-(x_1+x_2-1)=0 \tag{E.4}$$

| Pas | Le calcul |
|---|---|
| **1** | **(E.2) et (E.3) impliquent** $\ 2ax_1=2bx_2$, ou $\ x_1=\dfrac{b}{a}x_2$ **(E.5)** |
| **2** | **En substituant (E.5) dans (E.4)** : $\ x_2+\dfrac{b}{a}x_2=1$, ou $\ x_2=\dfrac{a}{a+b}$ **(E.6)** |
| **3** | **En reportant (E.6) dans (E.5)** : $\ x_1=\dfrac{b}{a+b}$ **(E.7)** |
| **4** | **En reportant dans (E.3)** : $\ -2b\dfrac{a}{a+b}-\lambda=0$, ou $\ \lambda=\dfrac{-2ab}{a+b}$ **(E.8)** |

$$\boxed{\;x_1^*=\frac{b}{a+b},\qquad x_2^*=\frac{a}{a+b},\qquad \lambda^*=\frac{-2ab}{a+b}\;} \tag{E.9}$$

> ⚠️ *« **SEULS $x_1$ et $x_2$ dans (E.9) sont des solutions CANDIDATES au problème (E.1). Le renseignement supplémentaire que nous avons acquis — la valeur du multiplicateur de Lagrange — n'est QU'« INCIDENT ».** »*

**La valeur atteinte** :

$$y^*=-a\left(\frac{b}{a+b}\right)^2-b\left(\frac{a}{a+b}\right)^2=\frac{-\big(ab^2+ba^2\big)}{(a+b)^2} \tag{E.10}$$

> ⚠️ *« **SOUVENEZ-VOUS : à partir des SEULES conditions du premier ordre, NOUS SOMMES INCAPABLES DE DIRE si c'est une valeur MAXIMALE OU MINIMALE.** »*

</details>

## 🔴 Concept 5 — Le cas général : $n$ variables, $m$ contraintes

### 5.1 Le programme

> *« **La méthode lagrangienne « MARCHE » pour des fonctions avec N'IMPORTE QUEL NOMBRE de variables, et dans des problèmes avec N'IMPORTE QUEL NOMBRE de contraintes, TANT QUE LE NOMBRE DE CONTRAINTES EST INFÉRIEUR AU NOMBRE DE VARIABLES CHOISIES.** »*

$$\max_{x_1,\dots,x_n}\ f(x_1,\dots,x_n)\qquad\text{s.c.}\qquad g^1(\mathbf{x})=0,\ \dots,\ g^m(\mathbf{x})=0,\qquad m<n \tag{A2.13}$$

### 5.2 Le lagrangien général

> *« **Formez le lagrangien en multipliant CHAQUE équation de contrainte $g^j$ par UN MULTIPLICATEUR DE LAGRANGE DIFFÉRENT $\lambda_j$ et en les soustrayant TOUS de la fonction objectif $f$.** »*

$$\boxed{\;\mathcal{L}(\mathbf{x},\boldsymbol{\lambda})=f(\mathbf{x})-\sum_{j=1}^{m}\lambda_j\,g^j(\mathbf{x})\;} \tag{A2.14}$$

⚠️ **C'est une fonction de $n+m$ variables.**

### 5.3 Le système de $n+m$ équations

$$\frac{\partial\mathcal{L}}{\partial x_i}=\frac{\partial f(\mathbf{x}^*)}{\partial x_i}-\sum_{j=1}^{m}\lambda_j^*\frac{\partial g^j(\mathbf{x}^*)}{\partial x_i}=0,\qquad i=1,\dots,n$$

$$\frac{\partial\mathcal{L}}{\partial\lambda_j}=-\,g^j(\mathbf{x}^*)=0,\qquad j=1,\dots,m \tag{A2.15}$$

> *« En principe, celles-ci peuvent être résolues pour les $n+m$ valeurs $\mathbf{x}^*$ et $\boldsymbol{\lambda}^*$. **Tous les vecteurs solution $\mathbf{x}^*$ seront alors des CANDIDATS à la solution.** »*

### 🔴 5.4 Les deux questions laissées ouvertes

> *« La méthode de Lagrange est **TRÈS INGÉNIEUSE et TRÈS UTILE. En effet, elle nous offre UN ALGORITHME pour identifier les optima contraints dans une vaste classe de problèmes pratiques. POURTANT, L'EXPOSÉ QUELQUE PEU DÉSINVOLTE donné ici PRÉSUPPOSE BEAUCOUP.** »*

| La question | La réponse du livre |
|---|---|
| **1. L'EXISTENCE d'une solution** | *« Si la fonction objectif est **RÉELLE et CONTINUE** (ce qu'elle doit être pour être différentiable), et si **l'ENSEMBLE DE CONTRAINTE défini par les équations de contrainte est COMPACT, nous sommes assurés PAR LE THÉORÈME DE WEIERSTRASS (théorème A1.10) que des optima EXISTENT** »* |
| **2. L'EXISTENCE des multiplicateurs** | *« **Comment savons-nous que les multiplicateurs que nous venons de « TIRER DU CHAPEAU » EXISTENT MÊME ? Plus précisément, comment savons-nous qu'il existe $\lambda^*$ tel que LES POINTS CRITIQUES DE $\mathcal{L}(\cdot,\lambda^*)$ COÏNCIDENT avec les optima contraints ? SÛREMENT, IL DOIT Y AVOIR DES CONDITIONS.** »* |

### 5.5 La condition sur l'ensemble de contrainte

> *« En fait, **il y a de telles conditions, et elles ont PRINCIPALEMENT À VOIR AVEC DES EXIGENCES SUR L'ENSEMBLE DE CONTRAINTE.** »*

| Le cas | La condition |
|---|---|
| **Deux variables, une contrainte** | *« ces conditions **SE RAMÈNENT à l'exigence QU'AU MOINS UNE des dérivées partielles de l'équation de contrainte soit STRICTEMENT NON NULLE** »* |
| **Le cas général** | *« ceci s'élargit à l'exigence que **LES VECTEURS GRADIENTS DES $m$ ÉQUATIONS DE CONTRAINTE, $\nabla g^j$, $j=1,\dots,m$, SOIENT LINÉAIREMENT INDÉPENDANTS** »* |

> *« **La plausibilité de cette restriction deviendra plus claire quand nous examinerons LA GÉOMÉTRIE de ce problème simple dans la prochaine section.** »*

### 5.6 Le théorème A2.16

> *« **Par souci de complétude et pour faciliter les références — SI CE N'EST PAR SOUCI D'ÉCLAIRCISSEMENT — nous énoncerons le théorème de Lagrange. La preuve exige des méthodes PLUS AVANCÉES que celles que nous avons tentées ici, et sera donc OMISE. Le lecteur intéressé la trouvera dans TOUT BON TEXTE de calcul multivarié.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.16 — Théorème de Lagrange</span>

Soient $f(\mathbf{x})$ et $g^j(\mathbf{x})$, $j=1,\dots,m$, des fonctions réelles **continûment différentiables** sur $D\subset\mathbb{R}^n$. Soit $\mathbf{x}^*$ **un point INTÉRIEUR de $D$** et supposons que $\mathbf{x}^*$ est **un optimum (maximum ou minimum) de $f$ sous les contraintes $g^j(\mathbf{x}^*)=0$**. **Si les vecteurs gradients $\nabla g^j(\mathbf{x}^*)$, $j=1,\dots,m$, sont LINÉAIREMENT INDÉPENDANTS**, alors **il existe $m$ nombres UNIQUES $\lambda_j^*$** tels que

$$\frac{\partial\mathcal{L}(\mathbf{x}^*,\boldsymbol{\lambda}^*)}{\partial x_i}=\frac{\partial f(\mathbf{x}^*)}{\partial x_i}-\sum_{j=1}^{m}\lambda_j^*\frac{\partial g^j(\mathbf{x}^*)}{\partial x_i}=0,\qquad i=1,\dots,n$$

</div>

⚠️ **L'indépendance linéaire des gradients est ce qu'on appelle la QUALIFICATION DES CONTRAINTES** — sans elle, **les multiplicateurs peuvent tout simplement ne pas exister.**

## 🔴 Concept 6 — §A2.3.3 : l'interprétation géométrique

### 6.1 La pente d'un ensemble de niveau

> *« Les conditions caractérisant la solution lagrangienne ont **une interprétation géométrique QUI DEVRAIT VOUS ÊTRE FAMILIÈRE DEPUIS VOS COURS D'ÉCONOMIE INTERMÉDIAIRE.** »*

**Sur un ensemble de niveau** $L(y^0)\equiv\{(x_1,x_2)\mid f(x_1,x_2)=y^0\}$, les changements admissibles vérifient

$$\frac{\partial f}{\partial x_1}dx_1+\frac{\partial f}{\partial x_2}dx_2=0 \tag{A2.16}$$

*« obtenu **en différentiant TOTALEMENT chaque membre de l'équation du niveau et en se souvenant que LA DIFFÉRENTIELLE TOTALE DE LA CONSTANTE $y^0$ EST NULLE** »*.

**En résolvant pour la pente « rise over run »** :

$$\boxed{\;\left.\frac{dx_2}{dx_1}\right|_{\text{le long de }L(y^0)}=(-1)\,\frac{f_1(x_1,x_2)}{f_2(x_1,x_2)}\;} \tag{A2.17}$$

⚠️ *« La notation $|_{\text{le long de}\dots}$ est utilisée **pour vous rappeler LE TYPE TRÈS PARTICULIER de changements $dx_1$ et $dx_2$ que nous considérons.** »*

### 6.2 La pente de la contrainte

> *« Par le même jeton, **nous pouvons penser LA FONCTION DE CONTRAINTE, ELLE AUSSI, COMME UNE SORTE D'ENSEMBLE DE NIVEAU** — l'ensemble de tous les $(x_1,x_2)$ tels que $g(x_1,x_2)=0$. »*

**Le même calcul** — *« en se souvenant que **la différentielle de (la constante) ZÉRO EST ZÉRO** »* — donne

$$\left.\frac{dx_2}{dx_1}\right|_{\text{le long de }g(\cdot)=0}=(-1)\,\frac{g_1(x_1,x_2)}{g_2(x_1,x_2)} \tag{A2.18}$$

### 🔴 6.3 L'élimination de $\lambda$

> *« Parce que **nous cherchons les valeurs solution des SEULES variables de choix, et n'avons AUCUN INTÉRÊT DIRECT pour la valeur du multiplicateur, nous pouvons réécrire (A2.7) à (A2.9) POUR ÉLIMINER $\lambda^*$.** »*

En réarrangeant : $\ f_1=\lambda^*g_1$, $\ f_2=\lambda^*g_2$, $\ g=0$.

> *« Pour les besoins de cette discussion, **supposons $\lambda^*\neq0$. En DIVISANT la première équation par la seconde, on élimine $\lambda^*$ COMPLÈTEMENT et il ne reste que DEUX conditions pour déterminer les DEUX variables** »* :

$$\boxed{\;\frac{f_1(x_1^*,x_2^*)}{f_2(x_1^*,x_2^*)}=\frac{g_1(x_1^*,x_2^*)}{g_2(x_1^*,x_2^*)}\;} \tag{A2.19}$$

$$g(x_1^*,x_2^*)=0 \tag{A2.20}$$

### 🔴 6.4 LA LECTURE : un point de TANGENCE

> *« **Que disent ces deux conditions ?** Le membre de gauche de (A2.19) est **$-1$ fois LA PENTE de l'ensemble de niveau DE LA FONCTION OBJECTIF** au point $(x_1^*,x_2^*)$. Le membre de droite est **$-1$ fois LA PENTE de l'ensemble de niveau DE LA FONCTION DE CONTRAINTE.** »*

> *« La condition dit que **les valeurs solution seront EN UN POINT OÙ LA PENTE DU NIVEAU DE L'OBJECTIF ET LA PENTE DU NIVEAU DE LA CONTRAINTE SONT ÉGALES. CE N'EST PAS TOUT, CEPENDANT. La SECONDE condition (A2.20) nous dit que NOUS DEVONS AUSSI ÊTRE SUR le niveau de l'équation de contrainte.** »*

$$\boxed{\;\textbf{« Un point QUI EST SUR LA CONTRAINTE et OÙ LA PENTE DU NIVEAU DE}\\\textbf{L'OBJECTIF ET LA PENTE DE LA CONTRAINTE SONT ÉGALES est, PAR DÉFINITION,}\\\textbf{UN POINT DE TANGENCE entre la contrainte et l'ensemble de niveau. »}\;}$$

> *« La situation pour un **MAXIMUM** est représentée en **fig. A2.8(a). CLAIREMENT, la plus haute valeur de $f$ le long de la contrainte est celle atteinte AU POINT DE TANGENCE choisi par (A2.19) et (A2.20)** […] **Les mêmes principes s'appliquent dans le cas des problèmes de MINIMISATION**, comme en fig. A2.8(b). »*

⚠️ **La condition de tangente, sous la forme du livre** :

$$\text{en un MAXIMUM :}\quad -\frac{f_1(\mathbf{x}^*)}{f_2(\mathbf{x}^*)}=-\frac{g_1(\mathbf{x}^*)}{g_2(\mathbf{x}^*)} \qquad\qquad \text{en un MINIMUM :}\quad -\frac{f_1(\tilde{\mathbf{x}})}{f_2(\tilde{\mathbf{x}})}=-\frac{g_1(\tilde{\mathbf{x}})}{g_2(\tilde{\mathbf{x}})}$$

*( **C'est ici que se voit la nécessité de la « qualification des contraintes »** : si **les deux** partielles $g_1$ et $g_2$ étaient nulles, **la contrainte n'aurait pas de pente définie** et la condition de tangence n'aurait aucun sens.)*

## 🔴 Concept 7 — §A2.3.4 : les conditions du second ordre

### 🔴 7.1 La réduction de dimensionnalité

> *« Les conditions du second ordre pour les problèmes lagrangiens sont **tout à fait dans le même esprit** que celles du premier ordre. **Au départ, on est TENTÉ de raisonner ainsi : si $(\mathbf{x}^*,\boldsymbol{\lambda}^*)$ satisfait les conditions du second ordre pour un maximum de la fonction NON CONTRAINTE $\mathcal{L}$, alors nous savons que nous avons un maximum local de $f$ sous les contraintes.** »*

> ⚠️ *« **C'est en fait UNE CONJECTURE CORRECTE, MAIS il s'avère que c'est une EXIGENCE BEAUCOUP PLUS STRINGENTE que ce dont nous avons RÉELLEMENT BESOIN pour savoir que nous avons localisé un optimum contraint.** »*

$$\boxed{\;\textbf{« En effet, nous pouvons RÉDUIRE LA « DIMENSIONNALITÉ » des exigences}\\\textbf{de courbure EN EXPLOITANT L'INTERDÉPENDANCE entre les $x$ imposée}\\\textbf{au problème PAR LES RELATIONS DE CONTRAINTE. »}\;}$$

> *« **Pour savoir que nous avons un maximum, TOUT CE DONT NOUS AVONS RÉELLEMENT BESOIN est que LA SECONDE DIFFÉRENTIELLE DE LA FONCTION OBJECTIF au point qui résout les conditions du premier ordre SOIT DÉCROISSANTE LE LONG DE LA CONTRAINTE.** »*

### 7.2 La dérivation, pas à pas

<details class="details--riche">
<summary>

**Étape 1 — la contrainte comme fonction implicite**

</summary>

> *« Supposons que nous voyions **ARBITRAIREMENT $x_1$ comme LIBRE de prendre n'importe quelle valeur** et pensions $x_2(x_1)$ comme **la valeur de $x_2$ IMPOSÉE PAR LA CONTRAINTE**. Nous pouvons alors penser la contrainte comme **L'IDENTITÉ** »*

$$g\big(x_1,\ x_2(x_1)\big)\equiv0$$

> *« Ici, **nous voyons l'équation de contrainte comme DÉFINISSANT $x_2$ COMME UNE FONCTION IMPLICITE DE $x_1$.** »* En différentiant par rapport à $x_1$ et en résolvant :

$$\frac{dx_2}{dx_1}=-\frac{g_1}{g_2} \tag{A2.21}$$

⚠️ **C'est exactement la pente (A2.18) de la contrainte.**

</details>

<details class="details--riche">
<summary>

**Étape 2 — la dérivée première le long de la contrainte**

</summary>

**Poser** $\ y=f\big(x_1,x_2(x_1)\big)$ — *« la valeur de la fonction objectif **SOUS LA CONTRAINTE** »* — **une fonction de LA SEULE variable $x_1$**.

$$\frac{dy}{dx_1}=f_1+f_2\frac{dx_2}{dx_1} \qquad\xrightarrow{\ \text{(A2.21)}\ }\qquad \boxed{\;\frac{dy}{dx_1}=f_1-f_2\frac{g_1}{g_2}\;} \tag{A2.22}$$

</details>

<details class="details--riche">
<summary>

**Étape 3 — la dérivée seconde, et sa réécriture**

</summary>

> *« **En différentiant à nouveau, EN SE SOUVENANT TOUJOURS QUE $x_2$ EST UNE FONCTION DE $x_1$, ET QUE LES $f_i$ ET LES $g_i$ DÉPENDENT TOUS DE $x_1$ À LA FOIS DIRECTEMENT ET PAR SON INFLUENCE SUR $x_2$** »* :

$$\frac{d^2y}{dx_1^2}=\left[f_{11}+f_{12}\frac{dx_2}{dx_1}\right]-\left[f_{21}+f_{22}\frac{dx_2}{dx_1}\right]\frac{g_1}{g_2}-f_2\,\frac{g_2\big[g_{11}+g_{12}\tfrac{dx_2}{dx_1}\big]-g_1\big[g_{21}+g_{22}\tfrac{dx_2}{dx_1}\big]}{g_2^2} \tag{A2.23}$$

⚠️ **LES TROIS SUBSTITUTIONS QUI SIMPLIFIENT TOUT** :

| # | Ce qu'on utilise |
|---|---|
| **1** | **Les conditions du premier ordre (A2.7)-(A2.9)** : $\ f_1=\lambda g_1$ **et** $f_2=\lambda g_2$ |
| **2** | **Le théorème de YOUNG** : $\ f_{12}=f_{21}$ **et** $g_{12}=g_{21}$ |
| **3** | **La relation (A2.21)**, plus *« un peu d'ALGÈBRE »* |

$$\frac{d^2y}{dx_1^2}=\frac{1}{(g_2)^2}\Big[\big(f_{11}-\lambda g_{11}\big)(g_2)^2-2\big(f_{12}-\lambda g_{12}\big)g_1g_2+\big(f_{22}-\lambda g_{22}\big)(g_1)^2\Big] \tag{A2.24}$$

</details>

<details class="details--riche">
<summary>

**Étape 4 — reconnaître les partielles du LAGRANGIEN**

</summary>

> *« **Regardez ATTENTIVEMENT les termes impliquant $\lambda$ à l'intérieur des crochets.** »* Rappelons que les partielles premières du lagrangien sont $\ \mathcal{L}_i=f_i-\lambda g_i$. **Donc les partielles SECONDES sont** :

$$\mathcal{L}_{11}=f_{11}-\lambda g_{11} \qquad \mathcal{L}_{12}=f_{12}-\lambda g_{12} \qquad \mathcal{L}_{22}=f_{22}-\lambda g_{22} \tag{A2.25}$$

> ⚠️ *« **Il est CLAIR que les termes impliquant $\lambda$ dans les crochets NE SONT QUE LES PARTIELLES SECONDES DU LAGRANGIEN par rapport aux $x_i$. Le terme entre crochets tout entier peut maintenant être vu comme impliquant ces partielles secondes PLUS LES PARTIELLES PREMIÈRES DE LA CONTRAINTE.** »*

> ⚠️ *« **À L'ŒIL EXERCÉ, l'expression QUADRATIQUE entre crochets peut être RECONNUE COMME LE DÉTERMINANT D'UNE MATRICE SYMÉTRIQUE.** »*

</details>

### 🔴 7.3 La hessienne bordée

$$\boxed{\;\bar{H}\equiv\begin{pmatrix}0&g_1&g_2\\g_1&\mathcal{L}_{11}&\mathcal{L}_{12}\\g_2&\mathcal{L}_{21}&\mathcal{L}_{22}\end{pmatrix}\;}$$

> *« Cette matrice est appelée **LA HESSIENNE BORDÉE de la fonction lagrangienne, parce qu'elle implique LES PARTIELLES SECONDES DE $\mathcal{L}$ BORDÉES PAR LES PARTIELLES PREMIÈRES DE L'ÉQUATION DE CONTRAINTE ET UN ZÉRO.** »*

**Son déterminant** *(« par exemple en développant le long de la dernière colonne »)* :

$$\bar{D}\equiv\begin{vmatrix}0&g_1&g_2\\g_1&\mathcal{L}_{11}&\mathcal{L}_{12}\\g_2&\mathcal{L}_{21}&\mathcal{L}_{22}\end{vmatrix}=-\Big[\mathcal{L}_{11}(g_2)^2-2\mathcal{L}_{12}g_1g_2+\mathcal{L}_{22}(g_1)^2\Big] \tag{A2.26}$$

### 🔴 7.4 LA FORMULE CENTRALE

**En combinant (A2.24), (A2.25) et (A2.26)** :

$$\boxed{\;\frac{d^2y}{dx_1^2}=\frac{(-1)}{(g_2)^2}\,\bar{D}\;} \tag{A2.27}$$

> *« Ainsi, **LA COURBURE DE LA FONCTION OBJECTIF LE LONG DE LA CONTRAINTE, indiquée par le SIGNE de $d^2y/dx_1^2$, PEUT ÊTRE DÉDUITE DIRECTEMENT DU SIGNE DU DÉTERMINANT DE LA HESSIENNE BORDÉE du lagrangien** (en supposant que $g_2\neq0$). »*

> ⚠️ *« **LA PRUDENCE S'IMPOSE parce que LE SIGNE DE L'UN SERA TOUJOURS OPPOSÉ AU SIGNE DE L'AUTRE, puisque le déterminant dans (A2.27) est MULTIPLIÉ PAR $-1$.** »*

### 7.5 Le théorème A2.17

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.17 — Une condition suffisante pour un optimum local dans le problème à deux variables et une contrainte</span>

Si $(x_1^*,x_2^*,\lambda^*)$ résout les conditions du premier ordre (A2.7)-(A2.9), et si

$$\bar{D}>0 \quad\textbf{(resp. } \bar{D}<0\textbf{)} \quad\text{dans (A2.26), évalué en } (x_1^*,x_2^*,\lambda^*),$$

alors $(x_1^*,x_2^*)$ est **un MAXIMUM local (resp. un MINIMUM local)** de $f(x_1,x_2)$ sous la contrainte $g(x_1,x_2)=0$.

</div>

⚠️ **LE PIÈGE DE SIGNE** : **$\bar{D}>0$ signifie un MAXIMUM** — c'est **l'inverse** de l'intuition du cas non contraint, et cela vient précisément du **$(-1)$ de la formule (A2.27)**.

<details class="details--riche">
<summary>

**EXEMPLE A2.9 — trancher l'exemple A2.8**

</summary>

> *« Considérons **si le point critique obtenu à l'exemple A2.8 est un MINIMUM ou un MAXIMUM.** »*

**Les partielles secondes du lagrangien** *(qui était $\mathcal{L}=-ax_1^2-bx_2^2-\lambda(x_1+x_2-1)$)* :

$$\mathcal{L}_{11}=-2a \qquad \mathcal{L}_{12}=0 \qquad \mathcal{L}_{21}=0 \qquad \mathcal{L}_{22}=-2b$$

**Les partielles de la contrainte** : $\ g_1=1$ et $g_2=1$.

**Le déterminant de la hessienne bordée** :

$$\bar{D}=\begin{vmatrix}-2a&0&1\\0&-2b&1\\1&1&0\end{vmatrix}=2(a+b)>0 \tag{A2.28}$$

> ⚠️ *« **Parce qu'ici $\bar{D}>0$ POUR TOUTES les valeurs de $x_1$, $x_2$ et $\lambda$, il doit en être ainsi À LA SOLUTION (E.9). La valeur de la fonction objectif en (E.10) doit donc être UN MAXIMUM SOUS LA CONTRAINTE.** »*

*( **Note** : le livre écrit ici la matrice **avec le zéro en bas à droite** plutôt qu'en haut à gauche. **Le déterminant est le même** — c'est **une permutation PAIRE** des lignes et des colonnes. En reprenant l'ordre de la définition, $\begin{vmatrix}0&1&1\\1&-2a&0\\1&0&-2b\end{vmatrix}=2a+2b$ )*

</details>

## 🔴 Concept 8 — Le théorème A2.18 : le cas général

### 8.1 La hessienne bordée générale

> *« Avec $n$ variables et $m<n$ contraintes, **les conditions suffisantes du second ordre nous disent à nouveau que nous aurons un MAXIMUM (MINIMUM) si LA SECONDE DIFFÉRENTIELLE DE LA FONCTION OBJECTIF EST INFÉRIEURE À ZÉRO (supérieure à zéro) au point où les conditions du premier ordre sont satisfaites.** »*

> *« Dans le cas multivarié et multicontraint, **LA HESSIENNE BORDÉE est à nouveau formée EN BORDANT LA MATRICE DES PARTIELLES SECONDES DE $\mathcal{L}$ PAR TOUTES LES PARTIELLES PREMIÈRES DES CONTRAINTES ET ASSEZ DE ZÉROS POUR FORMER UNE MATRICE SYMÉTRIQUE.** »*

$$\bar{H}=\begin{pmatrix} 0&\cdots&0&g_1^1&\cdots&g_n^1\\ \vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\ 0&\cdots&0&g_1^m&\cdots&g_n^m\\ g_1^1&\cdots&g_1^m&\mathcal{L}_{11}&\cdots&\mathcal{L}_{1n}\\ \vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\ g_n^1&\cdots&g_n^m&\mathcal{L}_{n1}&\cdots&\mathcal{L}_{nn} \end{pmatrix}$$

> *« Le test de définitude implique alors de vérifier le patron de signes sur **les mineurs principaux appropriés de cette matrice bordée (D'ASPECT MONSTRUEUX).** »*

### 🔴 8.2 QUELS mineurs regarder

> *« Ses mineurs principaux sont les déterminants des sous-matrices obtenues **en descendant la diagonale principale. LES $n-m$ MINEURS PRINCIPAUX QUI NOUS INTÉRESSENT ICI SONT CEUX QUI COMMENCENT AU $(2m+1)$-IÈME ET FINISSENT AU $(n+m)$-IÈME, c'est-à-dire LE DÉTERMINANT DE $\bar{H}$ TOUT ENTIER.** »*

$$\bar{D}_k=\begin{vmatrix} 0&\cdots&0&g_1^1&\cdots&g_k^1\\ \vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\ 0&\cdots&0&g_1^m&\cdots&g_k^m\\ g_1^1&\cdots&g_1^m&\mathcal{L}_{11}&\cdots&\mathcal{L}_{1k}\\ \vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\ g_k^1&\cdots&g_k^m&\mathcal{L}_{k1}&\cdots&\mathcal{L}_{kk} \end{vmatrix},\qquad k=m+1,\dots,n \tag{A2.29}$$

⚠️ **Il y en a exactement $n-m$** — **autant que de « degrés de liberté » qui restent une fois les $m$ contraintes imposées aux $n$ variables.**

### 8.3 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.18 — Conditions suffisantes pour les optima locaux avec contraintes d'égalité</span>

Soit la fonction objectif $f(\mathbf{x})$ et les $m<n$ contraintes $g^j(\mathbf{x})=0$. Soit le lagrangien donné par (A2.14) et $(\mathbf{x}^*,\boldsymbol{\lambda}^*)$ solution des conditions (A2.15). Alors : **1.** **$\mathbf{x}^*$ est un MAXIMUM local de $f$ sous les contraintes si les $n-m$ mineurs de (A2.29) ALTERNENT EN SIGNE EN COMMENÇANT PAR POSITIF** : $\bar{D}_{m+1}>0$, $\bar{D}_{m+2}<0$, …, évalués en $(\mathbf{x}^*,\boldsymbol{\lambda}^*)$. **2.** **$\mathbf{x}^*$ est un MINIMUM local si les $n-m$ mineurs sont TOUS NÉGATIFS** : $\bar{D}_{m+1}<0$, $\bar{D}_{m+2}<0$, ….

</div>

⚠️ **À COMPARER AU CAS NON CONTRAINT** *([fiche 524](524-jehle-optimisation-libre.md), théorème A2.12)* :

| Le cas | MAXIMUM | MINIMUM |
|---|---|---|
| **NON CONTRAINT** *(mineurs de $H$)* | **alternent dès NÉGATIF** | **tous POSITIFS** |
| **CONTRAINT** *(mineurs bordés de $\bar{H}$)* | **alternent dès POSITIF** | **tous NÉGATIFS** |

⚠️ **TOUT EST INVERSÉ** — c'est la conséquence directe du $(-1)$ de la formule (A2.27).

*(Vérification sur le cas $n=2$, $m=1$ : il y a $n-m=1$ mineur, celui d'ordre $k=2$, c'est-à-dire **$\bar{D}$ tout entier** ; le théorème A2.18(1) exige $\bar{D}_2>0$ — **exactement le théorème A2.17**. )*

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « max … sous contrainte … $=0$ » | **(A2.4)** | **Former le LAGRANGIEN** |
| Une contrainte facile à isoler | **§A2.3.1** | La **SUBSTITUTION** peut suffire — mais **penser à la règle de COMPOSITION** |
| Plus de deux variables, plusieurs contraintes | **(A2.13)** | **Un $\lambda_j$ par contrainte**, $n+m$ équations |
| « la solution existe-t-elle ? » | **§A2.3.2** | **WEIERSTRASS** : objectif continu $+$ ensemble de contrainte COMPACT |
| « les multiplicateurs existent-ils ? » | **Théorème A2.16** | **Les gradients $\nabla g^j$ doivent être LINÉAIREMENT INDÉPENDANTS** |
| « interprétez graphiquement » | **§A2.3.3** | **UN POINT DE TANGENCE** |
| « max ou min ? » *(contraint)* | **Théorème A2.17/A2.18** | **La HESSIENNE BORDÉE — ATTENTION, LES SIGNES SONT INVERSÉS** |
| « le TMS égale le rapport des prix » | **(A2.19)** | C'est **la condition de tangence** |
| « que vaut $\lambda$ ? » | **§A2.3.2** | *« seulement « INCIDENT » »* ici — *(son sens vient du théorème de l'enveloppe, §A2.4)* |

**Les trois réflexes de cadrage :**

1. **Écrire le lagrangien avec un SIGNE MOINS devant chaque contrainte**, et **poser TOUTES les partielles à zéro** — **y compris celles par rapport aux $\lambda_j$**, qui restituent les contraintes.
2. **Éliminer les $\lambda$ en divisant deux conditions.** C'est ce qui fait apparaître **la condition de TANGENCE** $f_1/f_2=g_1/g_2$, la forme économiquement lisible.
3. **Devant les conditions du second ordre contraintes, MÉMORISER L'INVERSION DES SIGNES.** *« Le signe de l'un sera TOUJOURS OPPOSÉ au signe de l'autre. »*

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — La substitution

| Pas | L'action |
|---|---|
| **1** | **Isoler une variable** dans la contrainte : $x_2=\tilde{g}(x_1)$ |
| **2** | **La substituer dans l'objectif** ⟹ un problème **SANS contrainte** à une variable |
| **3** | **Dériver EN UTILISANT LA RÈGLE DE COMPOSITION** — $x_1$ agit **directement ET indirectement** |
| **4** | **Résoudre pour $x_1^*$, puis retrouver $x_2^*=\tilde{g}(x_1^*)$** |
| **5** | **Ne pas oublier la condition du second ordre** |

### Méthode 2 — La méthode de Lagrange, en cinq gestes

1. **Écrire la contrainte sous forme implicite** $g(\mathbf{x})=0$.
2. **Former** $\ \mathcal{L}=f(\mathbf{x})-\sum_j\lambda_j g^j(\mathbf{x})$.
3. **Poser les $n+m$ partielles égales à zéro.**
4. **Résoudre le système** — **souvent en DIVISANT deux conditions pour éliminer $\lambda$**.
5. **Reporter dans les contraintes** pour achever la résolution, puis **calculer la valeur optimale**.

### Méthode 3 — Trancher par la hessienne bordée (2 variables, 1 contrainte)

| Pas | L'action |
|---|---|
| **1** | **Calculer $\mathcal{L}_{11}$, $\mathcal{L}_{12}$, $\mathcal{L}_{22}$** — **ce sont les partielles du LAGRANGIEN, pas de $f$** : $\mathcal{L}_{ij}=f_{ij}-\lambda g_{ij}$ |
| **2** | **Calculer $g_1$ et $g_2$** |
| **3** | **Former $\bar{H}=\begin{pmatrix}0&g_1&g_2\\g_1&\mathcal{L}_{11}&\mathcal{L}_{12}\\g_2&\mathcal{L}_{21}&\mathcal{L}_{22}\end{pmatrix}$ et calculer $\bar{D}$** |
| **4** | **$\bar{D}>0$ ⟹ MAXIMUM · $\bar{D}<0$ ⟹ MINIMUM** |

### Méthode 4 — Le cas général

1. **Compter** : $n$ variables, $m$ contraintes ⟹ **$n-m$ mineurs à examiner**.
2. **Les former** : $\bar{D}_k$ pour $k=m+1,\dots,n$ — du **$(2m+1)$-ième** au **$(n+m)$-ième** mineur principal de $\bar{H}$.
3. **Lire le patron** :

| Le patron | La conclusion |
|---|---|
| **Alternent DÈS POSITIF** : $\bar{D}_{m+1}>0$, $\bar{D}_{m+2}<0$, … | **MAXIMUM local** |
| **TOUS NÉGATIFS** | **MINIMUM local** |

### Méthode 5 — Lire économiquement la condition de tangence

$$\underbrace{\frac{f_1(\mathbf{x}^*)}{f_2(\mathbf{x}^*)}}_{\textbf{le TAUX MARGINAL DE SUBSTITUTION}}=\underbrace{\frac{g_1(\mathbf{x}^*)}{g_2(\mathbf{x}^*)}}_{\textbf{la PENTE de la contrainte}}$$

⚠️ **Dans le programme du consommateur** *(contrainte $p_1x_1+p_2x_2-y=0$)*, $g_1/g_2=p_1/p_2$ ⟹ **le TMS égale le rapport des prix**. **C'est le même calcul, écrit en langage économique.**

## L'exercice A2.25 du livre

> ⚠️ **Le livre NE FOURNIT PAS de corrigé.** L'énoncé est **celui de Jehle & Reny** ; **les résolutions sont un ENRICHISSEMENT PÉDAGOGIQUE.**

> *« **Résolvez les problèmes suivants. INDIQUEZ LA VALEUR OPTIMISÉE DE LA FONCTION à la solution.** »*

<details class="details--riche">
<summary>

**(a) $\min\ x_1^2+x_2^2$ sous contrainte $x_1x_2=1$**

</summary>

$\mathcal{L}=x_1^2+x_2^2-\lambda(x_1x_2-1)$ ⟹ $\ 2x_1-\lambda x_2=0$, $\ 2x_2-\lambda x_1=0$, $\ x_1x_2=1$.

⚠️ **En multipliant les deux premières** : $\ 4x_1x_2=\lambda^2x_1x_2$ ⟹ **$\lambda^2=4$** ⟹ $\lambda=\pm2$.

| $\lambda$ | La conséquence |
|---|---|
| $+2$ | $x_1=x_2$ ⟹ $x_1^2=1$ ⟹ **$(1,1)$ et $(-1,-1)$** |
| $-2$ | $x_1=-x_2$ ⟹ $-x_1^2=1$ **impossible en réels** |

$$\boxed{\;\text{La valeur minimale est } \ 1^2+1^2=\mathbf{2}\;}$$

</details>

<details class="details--riche">
<summary>

**(b) $\min\ x_1x_2$ sous contrainte $x_1^2+x_2^2=1$**

</summary>

$\mathcal{L}=x_1x_2-\lambda(x_1^2+x_2^2-1)$ ⟹ $\ x_2=2\lambda x_1$, $\ x_1=2\lambda x_2$ ⟹ $x_1=4\lambda^2x_1$ ⟹ **$\lambda=\pm\tfrac12$**.

| $\lambda$ | Le point | La valeur |
|---|---|---|
| $+\tfrac12$ | $x_2=x_1=\pm\tfrac{1}{\sqrt2}$ | $x_1x_2=+\tfrac12$ |
| $-\tfrac12$ | $x_2=-x_1$, $x_1=\pm\tfrac{1}{\sqrt2}$ | $x_1x_2=-\tfrac12$ |

$$\boxed{\;\text{La valeur MINIMALE est } \ \mathbf{-\tfrac12}, \text{ atteinte en } \left(\tfrac{1}{\sqrt2},-\tfrac{1}{\sqrt2}\right) \text{ et } \left(-\tfrac{1}{\sqrt2},\tfrac{1}{\sqrt2}\right)\;}$$

⚠️ **Les DEUX valeurs de $\lambda$ correspondent l'une au MAXIMUM, l'autre au MINIMUM** — c'est l'illustration parfaite de *« à partir des seules conditions du premier ordre, nous sommes incapables de dire »*.

</details>

<details class="details--riche">
<summary>

**(c) $\max\ x_1x_2^2$ sous contrainte $\dfrac{x_1^2}{a^2}+\dfrac{x_2^2}{b^2}=1$**

</summary>

$\mathcal{L}=x_1x_2^2-\lambda\left(\dfrac{x_1^2}{a^2}+\dfrac{x_2^2}{b^2}-1\right)$ ⟹

$$x_2^2-\frac{2\lambda x_1}{a^2}=0 \qquad\qquad 2x_1x_2-\frac{2\lambda x_2}{b^2}=0$$

**La seconde se factorise** : $\ 2x_2\left(x_1-\dfrac{\lambda}{b^2}\right)=0$ ⟹ **$x_2=0$** *(objectif nul — écarté)* **ou $\lambda=x_1b^2$**.

**Avec $\lambda=x_1b^2$**, la première donne $\ x_2^2=\dfrac{2x_1^2b^2}{a^2}$. **En reportant dans la contrainte** :

$$\frac{x_1^2}{a^2}+\frac{2x_1^2}{a^2}=1 \ \Longrightarrow\ \frac{3x_1^2}{a^2}=1 \ \Longrightarrow\ x_1^*=\frac{a}{\sqrt3},\qquad x_2^{*2}=\frac{2b^2}{3}$$

$$\boxed{\;y^*=x_1^*\,x_2^{*2}=\frac{a}{\sqrt3}\cdot\frac{2b^2}{3}=\frac{2ab^2}{3\sqrt3}=\frac{2\sqrt3\,ab^2}{9}\;}$$

</details>

<details class="details--riche">
<summary>

**(d) $\max\ x_1+x_2$ sous contrainte $x_1^4+x_2^4=1$**

</summary>

$\mathcal{L}=x_1+x_2-\lambda(x_1^4+x_2^4-1)$ ⟹ $\ 1-4\lambda x_1^3=0$ et $\ 1-4\lambda x_2^3=0$ ⟹ **$x_1^3=x_2^3$ ⟹ $x_1=x_2$**.

**La contrainte** : $\ 2x_1^4=1$ ⟹ $x_1=x_2=2^{-1/4}$.

$$\boxed{\;y^*=2\cdot2^{-1/4}=2^{3/4}\approx1{,}682\;}$$

</details>

<details class="details--riche">
<summary>

**(e) $\max\ x_1x_2^2x_3^3$ sous contrainte $x_1+x_2+x_3=1$**

</summary>

$\mathcal{L}=x_1x_2^2x_3^3-\lambda(x_1+x_2+x_3-1)$ ⟹

$$x_2^2x_3^3=\lambda \qquad 2x_1x_2x_3^3=\lambda \qquad 3x_1x_2^2x_3^2=\lambda$$

| La comparaison | Le résultat |
|---|---|
| **1ʳᵉ $=$ 2ᵉ** | $x_2^2x_3^3=2x_1x_2x_3^3$ ⟹ **$x_2=2x_1$** |
| **1ʳᵉ $=$ 3ᵉ** | $x_2^2x_3^3=3x_1x_2^2x_3^2$ ⟹ **$x_3=3x_1$** |

**La contrainte** : $\ x_1+2x_1+3x_1=1$ ⟹ $\ 6x_1=1$ ⟹

$$x_1^*=\frac16,\qquad x_2^*=\frac13,\qquad x_3^*=\frac12$$

$$\boxed{\;y^*=\frac16\cdot\frac19\cdot\frac18=\frac{1}{432}\;}$$

⚠️ **Le patron est remarquable** : **les parts optimales sont PROPORTIONNELLES AUX EXPOSANTS $(1,2,3)$** — c'est exactement le résultat Cobb-Douglas familier du chapitre 1.

</details>

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que la contrainte est une simple gêne | *« **on pourrait DÉFINIR L'ÉCONOMIE comme l'étude du comportement FACE À LA RARETÉ** »* | C'est **le cœur du sujet** |
| 2 | Écrire la contrainte sous forme explicite | Le livre l'écrit **SOUS FORME IMPLICITE $g(x_1,x_2)=0$** | Toute la méthode en dépend |
| 3 | Confondre objectif et contrainte | **$f$ est la MAXIMANDE · $g$ délimite l'ENSEMBLE RÉALISABLE** |  |
| 4 | Oublier la règle de composition dans la substitution | *« **$x_1$ influence $f$ DE DEUX FAÇONS : DIRECTEMENT et INDIRECTEMENT par $x_2$** »* | $f_1+f_2\tfrac{d\tilde g}{dx_1}=0$ |
| 5 | Croire la substitution toujours applicable | *« dans certains cas **INUTILEMENT LOURDE**, dans d'autres **SIMPLEMENT IMPOSSIBLE** »* |  |
| 6 | Écrire le lagrangien avec un $+$ | **Le livre SOUSTRAIT** : $\mathcal{L}=f-\lambda g$ | *(Un $+$ marche aussi, mais change le signe de $\lambda$)* |
| 7 | Oublier que $\lambda$ est une variable | *« $\lambda$ est **UNE VARIABLE À PART ENTIÈRE** de la fonction »* | D'où **$n+m$** équations |
| 8 | Oublier la condition $\partial\mathcal{L}/\partial\lambda=0$ | **C'est LA CONTRAINTE ELLE-MÊME** | Sans elle, rien ne garantit la réalisabilité |
| 9 | Croire que le lagrangien est maximisé | On cherche **UN POINT CRITIQUE de $\mathcal{L}$**, pas son maximum | *(En $\lambda$, c'est même un minimum)* |
| 10 | Croire que les CPO donnent un maximum | *« **QUE ces points critiques soient des MAXIMA ou des MINIMA NE PEUT PAS ÊTRE DÉTERMINÉ à partir des SEULES conditions du premier ordre** »* |  |
| 11 | Oublier pourquoi le terme en $d\lambda$ disparaît | **Parce que (A2.9) donne $g(x_1^*,x_2^*)=0$** |  |
| 12 | Mal identifier les changements admissibles | *« **ceux qui NE CONDUISENT À AUCUN CHANGEMENT de la fonction de contrainte** »*, soit $dg=0$ | (A2.12) |
| 13 | Croire $df=0$ pour TOUS les $dx_i$ | **Seulement pour ceux qui SATISFONT LA CONTRAINTE** |  |
| 14 | Utiliser plus de contraintes que de variables | *« **tant que le nombre de contraintes est INFÉRIEUR au nombre de variables** »* — $m<n$ |  |
| 15 | Utiliser le même $\lambda$ pour toutes les contraintes | **UN MULTIPLICATEUR DIFFÉRENT $\lambda_j$ par contrainte** | (A2.14) |
| 16 | Croire que l'existence de la solution va de soi | **Il faut WEIERSTRASS** : objectif continu $+$ ensemble de contrainte **COMPACT** | Thm A1.10 |
| 17 | Croire que les multiplicateurs existent toujours | *« **comment savons-nous qu'ils EXISTENT MÊME ?** »* | Il faut **le théorème A2.16** |
| 18 | Oublier la qualification des contraintes | **Les $\nabla g^j(\mathbf{x}^*)$ doivent être LINÉAIREMENT INDÉPENDANTS** |  |
| 19 | Croire qu'une seule partielle nulle suffit à ruiner Lagrange | **Il faut qu'AU MOINS UNE soit NON nulle** — ce sont **toutes** qui doivent s'annuler pour poser problème | Cas à 2 variables |
| 20 | Se tromper de signe dans (A2.17) | **La pente est $(-1)\,f_1/f_2$** |  |
| 21 | Oublier pourquoi la différentielle vaut zéro | **La différentielle totale d'une CONSTANTE est NULLE** | (A2.16) et (A2.18) |
| 22 | Diviser par $\lambda^*$ sans précaution | **Le livre suppose explicitement $\lambda^*\neq0$** |  |
| 23 | Ne retenir que l'égalité des pentes | **Il faut AUSSI être SUR la contrainte** *(A2.20)* | *« Ce n'est pas tout, cependant »* |
| 24 | Croire que $\lambda$ est un artefact inutile | Ici *« seulement **INCIDENT** »* — mais **le théorème de l'enveloppe lui donnera un sens économique** | §A2.4 |
| 25 | Appliquer les SOC non contraintes à $\mathcal{L}$ | *« **une exigence BEAUCOUP PLUS STRINGENTE que ce dont nous avons réellement besoin** »* | Il faut **réduire la dimensionnalité** |
| 26 | Oublier que $x_2$ dépend de $x_1$ dans (A2.23) | *« **les $f_i$ et les $g_i$ dépendent tous de $x_1$ À LA FOIS DIRECTEMENT ET par son influence sur $x_2$** »* |  |
| 27 | Utiliser $f_{ij}$ au lieu de $\mathcal{L}_{ij}$ | $\mathcal{L}_{ij}=f_{ij}-\lambda g_{ij}$ | (A2.25) |
| 28 | Border la hessienne par les mauvaises quantités | **Par les PARTIELLES PREMIÈRES DE LA CONTRAINTE et un ZÉRO** |  |
| 29 | Confondre avec la bordée d'Arrow-Enthoven | **Celle-là borde $f$ par SES PROPRES partielles** *(test de QUASICONCAVITÉ, exercice A2.18)* | Deux objets distincts |
| 30 | Oublier le $(-1)$ de (A2.27) | *« **LE SIGNE DE L'UN SERA TOUJOURS OPPOSÉ AU SIGNE DE L'AUTRE** »* | C'est **la source de tous les pièges de signe** |
| 31 | Croire que $\bar{D}<0$ signale un maximum | **NON — $\bar{D}>0$ ⟹ MAXIMUM** | Thm A2.17 |
| 32 | Oublier l'hypothèse $g_2\neq0$ | **La formule (A2.27) divise par $(g_2)^2$** |  |
| 33 | Regarder tous les mineurs bordés | **Seulement les $n-m$ qui vont du $(2m+1)$-ième au $(n+m)$-ième** | (A2.29) |
| 34 | Compter le mauvais nombre de mineurs | **$n-m$**, autant que de degrés de liberté restants |  |
| 35 | Inverser les patrons du théorème A2.18 | **MAX : alternent DÈS POSITIF · MIN : TOUS NÉGATIFS** | **L'inverse du cas non contraint** |
| 36 | Croire que les mineurs bordés commencent à $\bar{D}_1$ | **Ils commencent à $\bar{D}_{m+1}$** |  |
| 37 | Oublier de vérifier les deux racines de $\lambda$ | **Les deux valeurs correspondent souvent l'une au MAX, l'autre au MIN** | Exercice A2.25(b) |
| 38 | Oublier les solutions de bord dans les factorisations | $2x_2(x_1-\lambda/b^2)=0$ **a DEUX branches** | Exercice A2.25(c) |
| 39 | Croire qu'une contrainte d'égalité peut être ignorée | **Elle lie les variables — c'est exactement ce qu'exploite la réduction de dimensionnalité** |  |
| 40 | Confondre $\bar{D}$ et $D$ | **$\bar{D}$ est BORDÉ, $D$ ne l'est pas** — et **leurs règles de signe sont OPPOSÉES** |  |

## 📌 Ultimate Review

**§A2.3 — POURQUOI DES CONTRAINTES.**

⚠️ *« **LA RARETÉ est un fait OMNIPRÉSENT — on pourrait même DÉFINIR L'ÉCONOMIE comme L'ÉTUDE DU COMPORTEMENT FACE À LA RARETÉ.** »* **Trois types** : **égalité · non-négativité · inégalité quelconque**.

**§A2.3.1 — LE PROBLÈME.**

$$\max_{x_1,x_2}\ f(x_1,x_2) \qquad\text{s.c.}\qquad g(x_1,x_2)=0 \tag{A2.4}$$

**$f$ = OBJECTIF/MAXIMANDE · $x_i$ = VARIABLES DE CHOIX · $g$ = CONTRAINTE · l'ensemble admissible = ENSEMBLE RÉALISABLE.**

**LA SUBSTITUTION** : isoler $x_2=\tilde{g}(x_1)$, puis $\max_{x_1}f(x_1,\tilde{g}(x_1))$ — **en N'OUBLIANT PAS LA RÈGLE DE COMPOSITION** *(« $x_1$ influence $f$ DE DEUX FAÇONS »)*. **Elle échoue dès que la contrainte est compliquée, ou qu'il y a plus de deux variables ou plus d'une contrainte.**

**§A2.3.2 — LAGRANGE.**

$$\boxed{\;\textbf{« Il existe TOUJOURS UN PROBLÈME SANS CONTRAINTE que nous pouvons résoudre}\\\textbf{avec nos méthodes habituelles ET QUI NOUS DONNE, COMME SOUS-PRODUIT,}\\\textbf{LA SOLUTION QUE NOUS CHERCHONS. »}\;}$$

$$\mathcal{L}(x_1,x_2,\lambda)\equiv f(x_1,x_2)-\lambda\,g(x_1,x_2)$$

$$f_1-\lambda^*g_1=0 \quad\text{(A2.7)} \qquad f_2-\lambda^*g_2=0 \quad\text{(A2.8)} \qquad \underbrace{-g(x_1^*,x_2^*)=0}_{\ \textbf{LA CONTRAINTE}} \quad\text{(A2.9)}$$

**L'ARGUMENT DE PLAUSIBILITÉ** : $d\mathcal{L}=0$ **(A2.10)** ⟹ **le terme en $d\lambda$ disparaît par (A2.9)** ⟹ **(A2.11)** ; les **changements ADMISSIBLES** sont ceux avec $dg=0$ **(A2.12)** ⟹ **le terme en $\lambda^*$ disparaît aussi** ⟹ $df=0$ le long de la contrainte.

⚠️ *« **QUE ces points critiques soient des maxima ou des minima NE PEUT PAS être déterminé à partir des SEULES conditions du premier ordre.** »*

**LE CAS GÉNÉRAL** *($n$ variables, $m<n$ contraintes)* :

$$\mathcal{L}(\mathbf{x},\boldsymbol{\lambda})=f(\mathbf{x})-\sum_{j=1}^{m}\lambda_j g^j(\mathbf{x}) \tag{A2.14}$$

⟹ **un système de $n+m$ équations** *(A2.15)*.

**LES DEUX QUESTIONS OUVERTES** : **l'EXISTENCE de l'optimum** *(⟹ **WEIERSTRASS** : continu $+$ compact)* et **l'EXISTENCE des multiplicateurs**.

**THÉORÈME A2.16 (LAGRANGE)** : **si les $\nabla g^j(\mathbf{x}^*)$ sont LINÉAIREMENT INDÉPENDANTS**, alors **il existe $m$ nombres UNIQUES $\lambda_j^*$** tels que $\partial\mathcal{L}/\partial x_i=0$.

**§A2.3.3 — LA GÉOMÉTRIE.**

$$\left.\frac{dx_2}{dx_1}\right|_{L(y^0)}=(-1)\frac{f_1}{f_2} \quad\text{(A2.17)} \qquad\qquad \left.\frac{dx_2}{dx_1}\right|_{g=0}=(-1)\frac{g_1}{g_2} \quad\text{(A2.18)}$$

**En divisant (A2.7) par (A2.8)** *(avec $\lambda^*\neq0$)* :

$$\boxed{\;\frac{f_1(\mathbf{x}^*)}{f_2(\mathbf{x}^*)}=\frac{g_1(\mathbf{x}^*)}{g_2(\mathbf{x}^*)} \quad\text{(A2.19)} \qquad\qquad g(\mathbf{x}^*)=0 \quad\text{(A2.20)}\;}$$

⚠️ *« Un point **QUI EST SUR LA CONTRAINTE et OÙ LES PENTES SONT ÉGALES est, PAR DÉFINITION, UN POINT DE TANGENCE** »*.

**§A2.3.4 — LE SECOND ORDRE.**

⚠️ *« Nous pouvons **RÉDUIRE LA « DIMENSIONNALITÉ » des exigences de courbure EN EXPLOITANT L'INTERDÉPENDANCE entre les $x$ imposée par les contraintes** »* — il suffit que **la seconde différentielle soit décroissante LE LONG DE LA CONTRAINTE**.

*La chaîne* : $\dfrac{dx_2}{dx_1}=-\dfrac{g_1}{g_2}$ **(A2.21)** ⟹ $\dfrac{dy}{dx_1}=f_1-f_2\dfrac{g_1}{g_2}$ **(A2.22)** ⟹ **(A2.23)** ⟹ *(via les CPO $f_i=\lambda g_i$, **YOUNG**, et (A2.21))* ⟹ **(A2.24)**, où **les crochets font apparaître $\mathcal{L}_{ij}=f_{ij}-\lambda g_{ij}$** **(A2.25)**.

**LA HESSIENNE BORDÉE** — *« les partielles secondes de $\mathcal{L}$ **BORDÉES par les partielles PREMIÈRES de la CONTRAINTE et UN ZÉRO** »* :

$$\bar{H}=\begin{pmatrix}0&g_1&g_2\\g_1&\mathcal{L}_{11}&\mathcal{L}_{12}\\g_2&\mathcal{L}_{21}&\mathcal{L}_{22}\end{pmatrix} \qquad\qquad \bar{D}=-\Big[\mathcal{L}_{11}g_2^2-2\mathcal{L}_{12}g_1g_2+\mathcal{L}_{22}g_1^2\Big] \tag{A2.26}$$

$$\boxed{\;\frac{d^2y}{dx_1^2}=\frac{(-1)}{(g_2)^2}\,\bar{D} \tag{A2.27}\;}$$

⚠️ *« **LA PRUDENCE S'IMPOSE parce que LE SIGNE DE L'UN SERA TOUJOURS OPPOSÉ AU SIGNE DE L'AUTRE.** »*

**THÉORÈME A2.17** : $\ \bar{D}>0$ ⟹ **MAXIMUM local** · $\ \bar{D}<0$ ⟹ **MINIMUM local**.

*(**Exemple A2.9** : $\mathcal{L}_{11}=-2a$, $\mathcal{L}_{22}=-2b$, $\mathcal{L}_{12}=0$, $g_1=g_2=1$ ⟹ $\bar{D}=2(a+b)>0$ ⟹ **MAXIMUM**, **et ce pour TOUTES les valeurs des variables**.)*

**THÉORÈME A2.18** — **$n-m$ mineurs** $\bar{D}_k$, $k=m+1,\dots,n$ *(du $(2m+1)$-ième au $(n+m)$-ième)* :

|  | Le patron |
|---|---|
| **MAXIMUM** | **ALTERNENT en commençant par POSITIF** : $\bar{D}_{m+1}>0$, $\bar{D}_{m+2}<0$, … |
| **MINIMUM** | **TOUS NÉGATIFS** |

⚠️ **C'est L'INVERSE du cas non contraint** *(où max ⟹ alternance dès NÉGATIF, min ⟹ tous POSITIFS)* — **conséquence directe du $(-1)$ de (A2.27)**.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Pourquoi l'économie impose-t-elle des contraintes ?**

</summary>

> *« **LA RARETÉ est un fait OMNIPRÉSENT de la vie économique — ON POURRAIT MÊME DÉFINIR L'ÉCONOMIE COMME L'ÉTUDE DU COMPORTEMENT FACE À LA RARETÉ. La rareté s'exprime le plus communément comme DES CONTRAINTES sur les valeurs admissibles des variables économiques. Les agents sont alors représentés comme cherchant À FAIRE DE LEUR MIEUX À L'INTÉRIEUR DES CONTRAINTES QU'ILS AFFRONTENT.** »*

**Les trois types** : **ÉGALITÉ · NON-NÉGATIVITÉ · INÉGALITÉ quelconque**. *(Le livre se confine aux problèmes de MAXIMISATION.)*

</details>

<details class="details--riche">
<summary>

**2. Écrire le problème (A2.4) et nommer chaque élément.**

</summary>

$$\max_{x_1,x_2}\ f(x_1,x_2)\qquad\text{s.c.}\qquad g(x_1,x_2)=0$$

| L'élément | Le nom |
|---|---|
| $f$ | **FONCTION OBJECTIF ou MAXIMANDE** |
| $x_1,x_2$ | **VARIABLES DE CHOIX** — *« écrites sous « max » pour **nous rappeler que ce sont des valeurs de $x_1$ et $x_2$ que nous cherchons** »* |
| $g$ | **LA CONTRAINTE** |
| $\{(x_1,x_2)\mid g=0\}$ | **L'ENSEMBLE DE CONTRAINTE ou ENSEMBLE RÉALISABLE** |

</details>

<details class="details--riche">
<summary>

**3. Exposer la méthode de substitution et son piège.**

</summary>

Si $g=0$ permet d'écrire $x_2=\tilde{g}(x_1)$ **(A2.5)**, on substitue et on résout $\max_{x_1}f(x_1,\tilde{g}(x_1))$ **(A2.6)**, **sans contrainte et avec une variable de moins**.

⚠️ **LE PIÈGE** : *« **$x_1$ influence maintenant $f$ DE DEUX FAÇONS : « DIRECTEMENT » par sa propre position dans $f$, et « INDIRECTEMENT » par la position d'origine de $x_2$** »* ⟹

$$\frac{\partial f}{\partial x_1}+\underbrace{\frac{\partial f}{\partial x_2}\cdot\frac{d\tilde{g}}{dx_1}}_{\textbf{règle de COMPOSITION}}=0$$

</details>

<details class="details--riche">
<summary>

**4. Pourquoi la substitution ne suffit-elle pas ?**

</summary>

> *« **IL EST FACILE D'IMAGINER DES CAS où la relation de contrainte est COMPLIQUÉE** […] **QUI PLUS EST, de nombreux problèmes intéressants impliquent PLUS DE DEUX variables et PLUS D'UNE contrainte.** […] Dans certains cas, la substitution serait **INUTILEMENT LOURDE**. Dans d'autres, elle serait **SIMPLEMENT IMPOSSIBLE**. »*

</details>

<details class="details--riche">
<summary>

**5. Énoncer l'intuition de Lagrange.**

</summary>

> *« La méthode jaillit d'**UNE QUESTION SIMPLE : COMMENT UTILISER CE QUE NOUS SAVONS DÉJÀ sur l'optimisation SANS contraintes pour résoudre les problèmes AVEC contraintes ?** »*

> ⚠️ *« **L'INTUITION DE LAGRANGE fut de voir qu'IL EXISTE TOUJOURS UN PROBLÈME SANS CONTRAINTE que nous pouvons résoudre avec nos méthodes habituelles ET QUI NOUS DONNE, COMME SOUS-PRODUIT, LA SOLUTION QUE NOUS CHERCHONS.** »*

</details>

<details class="details--riche">
<summary>

**6. Construire le lagrangien et écrire les trois CPO.**

</summary>

> *« Multiplions la contrainte par **UNE NOUVELLE VARIABLE $\lambda$ QUE NOUS TIRONS SIMPLEMENT DU CHAPEAU parce qu'elle se révélera UTILE**, et SOUSTRAYONS ce produit de la fonction objectif. »*

$$\mathcal{L}(x_1,x_2,\lambda)\equiv f(x_1,x_2)-\lambda g(x_1,x_2)$$

$$f_1-\lambda^*g_1=0 \ \text{(A2.7)} \qquad f_2-\lambda^*g_2=0 \ \text{(A2.8)} \qquad -g(x_1^*,x_2^*)=0 \ \text{(A2.9)}$$

⚠️ **(A2.9) N'EST RIEN D'AUTRE QUE LA CONTRAINTE.**

</details>

<details class="details--riche">
<summary>

**7. Reconstituer l'argument de plausibilité.**

</summary>

| Pas | L'argument |
|---|---|
| **1** | $d\mathcal{L}=0$ en $(x_1^*,x_2^*,\lambda^*)$ **pour tous $dx_1$, $dx_2$, $d\lambda$** **(A2.10)** |
| **2** | **(A2.9) donne $g=0$** ⟹ **le terme en $d\lambda$ DISPARAÎT** ⟹ **(A2.11)** |
| **3** | Les changements **ADMISSIBLES** sont *« **ceux qui NE CONDUISENT À AUCUN CHANGEMENT de la contrainte** »*, soit $dg=g_1dx_1+g_2dx_2=0$ **(A2.12)** |
| **4** | ⟹ **le terme multiplié par $\lambda^*$ DISPARAÎT AUSSI** |
| **5** | ⟹ $f_1dx_1+f_2dx_2=0$ **pour tous les changements admissibles** |

> ⚠️ *« **La valeur de la fonction objectif NE PEUT ÊTRE NI AUGMENTÉE NI DIMINUÉE pour de petits changements QUI SATISFONT LA CONTRAINTE. Par conséquent, NOUS DEVONS ÊTRE À UN MAXIMUM OU À UN MINIMUM LE LONG DE LA CONTRAINTE.** »*

</details>

<details class="details--riche">
<summary>

**8. Refaire l'exemple A2.8.**

</summary>

$\max -ax_1^2-bx_2^2$ s.c. $x_1+x_2-1=0$, avec $a,b>0$.

$\mathcal{L}=-ax_1^2-bx_2^2-\lambda(x_1+x_2-1)$ ⟹ $-2ax_1-\lambda=0$, $-2bx_2-\lambda=0$, $x_1+x_2=1$.

**(E.2) et (E.3)** ⟹ $2ax_1=2bx_2$ ⟹ $x_1=\tfrac{b}{a}x_2$ **(E.5)** ⟹ **en reportant dans la contrainte** :

$$\boxed{\;x_1^*=\frac{b}{a+b},\qquad x_2^*=\frac{a}{a+b},\qquad \lambda^*=\frac{-2ab}{a+b},\qquad y^*=\frac{-(ab^2+ba^2)}{(a+b)^2}\;}$$

⚠️ *« **SEULS $x_1$ et $x_2$ sont des solutions CANDIDATES. La valeur du multiplicateur n'est QU'« INCIDENT ».** »*

</details>

<details class="details--riche">
<summary>

**9. Écrire le lagrangien général et compter les équations.**

</summary>

$$\mathcal{L}(\mathbf{x},\boldsymbol{\lambda})=f(\mathbf{x})-\sum_{j=1}^{m}\lambda_j\,g^j(\mathbf{x}) \tag{A2.14}$$

⚠️ **UN MULTIPLICATEUR DIFFÉRENT PAR CONTRAINTE** ⟹ **$n+m$ variables**, donc **$n+m$ équations** :

$$\frac{\partial f}{\partial x_i}-\sum_j\lambda_j^*\frac{\partial g^j}{\partial x_i}=0\ (i=1,\dots,n) \qquad -g^j(\mathbf{x}^*)=0\ (j=1,\dots,m)$$

⚠️ **La méthode marche *« tant que LE NOMBRE DE CONTRAINTES EST INFÉRIEUR AU NOMBRE DE VARIABLES »*** — $m<n$.

</details>

<details class="details--riche">
<summary>

**10. Quelles sont les deux questions laissées ouvertes ?**

</summary>

> *« **L'EXPOSÉ QUELQUE PEU DÉSINVOLTE donné ici PRÉSUPPOSE BEAUCOUP.** »*

| # | La question et sa réponse |
|---|---|
| **1** | **L'optimum EXISTE-t-il ?** *« si la fonction objectif est **RÉELLE et CONTINUE** et si **l'ensemble de contrainte est COMPACT, nous sommes assurés PAR LE THÉORÈME DE WEIERSTRASS** »* |
| **2** | **Les multiplicateurs EXISTENT-ils ?** *« comment savons-nous que les multiplicateurs **que nous venons de « TIRER DU CHAPEAU » EXISTENT MÊME** ? »* |

</details>

<details class="details--riche">
<summary>

**11. Énoncer le théorème A2.16 et sa condition.**

</summary>

$f$ et les $g^j$ **continûment différentiables**, $\mathbf{x}^*$ **intérieur** et **optimum de $f$ sous $g^j(\mathbf{x}^*)=0$**. **Si les $\nabla g^j(\mathbf{x}^*)$ sont LINÉAIREMENT INDÉPENDANTS**, alors **il existe $m$ nombres UNIQUES $\lambda_j^*$** avec $\partial\mathcal{L}(\mathbf{x}^*,\boldsymbol{\lambda}^*)/\partial x_i=0$.

| Le cas | La condition |
|---|---|
| **2 variables, 1 contrainte** | *« **AU MOINS UNE des partielles de la contrainte STRICTEMENT NON NULLE** »* |
| **Général** | **INDÉPENDANCE LINÉAIRE des $m$ gradients** |

*(La preuve *« exige des méthodes **PLUS AVANCÉES** »* et **est omise**.)*

</details>

<details class="details--riche">
<summary>

**12. Dériver la pente d'un ensemble de niveau et de la contrainte.**

</summary>

**En différentiant totalement** $f=y^0$ *( **la différentielle de la constante $y^0$ est NULLE**)* :

$$f_1\,dx_1+f_2\,dx_2=0 \ \text{(A2.16)} \qquad\Longrightarrow\qquad \left.\frac{dx_2}{dx_1}\right|_{L(y^0)}=(-1)\frac{f_1}{f_2} \ \text{(A2.17)}$$

**Le même calcul sur $g=0$** — *« nous pouvons penser **LA CONTRAINTE, ELLE AUSSI, COMME UNE SORTE D'ENSEMBLE DE NIVEAU** »* :

$$\left.\frac{dx_2}{dx_1}\right|_{g=0}=(-1)\frac{g_1}{g_2} \tag{A2.18}$$

</details>

<details class="details--riche">
<summary>

**13. Éliminer $\lambda$ et interpréter.**

</summary>

En réarrangeant les CPO : $f_1=\lambda^*g_1$, $f_2=\lambda^*g_2$. **En supposant $\lambda^*\neq0$ et en DIVISANT** :

$$\frac{f_1(\mathbf{x}^*)}{f_2(\mathbf{x}^*)}=\frac{g_1(\mathbf{x}^*)}{g_2(\mathbf{x}^*)} \ \text{(A2.19)} \qquad\qquad g(\mathbf{x}^*)=0 \ \text{(A2.20)}$$

> ⚠️ *« Le membre de gauche est **$-1$ fois LA PENTE du niveau de L'OBJECTIF** ; le droit, **$-1$ fois la pente du niveau de LA CONTRAINTE**. […] **CE N'EST PAS TOUT : (A2.20) nous dit que NOUS DEVONS AUSSI ÊTRE SUR le niveau de la contrainte.** »*

$$\textbf{« Un point sur la contrainte où les pentes sont égales est, PAR DÉFINITION, UN POINT DE TANGENCE. »}$$

</details>

<details class="details--riche">
<summary>

**14. Pourquoi RÉDUIRE la dimensionnalité au second ordre ?**

</summary>

> *« **Au départ, on est TENTÉ de raisonner ainsi : si $(\mathbf{x}^*,\boldsymbol{\lambda}^*)$ satisfait les conditions du second ordre pour un maximum de la fonction NON CONTRAINTE $\mathcal{L}$, alors nous avons un maximum contraint. C'est UNE CONJECTURE CORRECTE, MAIS c'est une exigence BEAUCOUP PLUS STRINGENTE que ce dont nous avons RÉELLEMENT BESOIN.** »*

> ⚠️ *« **Nous pouvons RÉDUIRE LA « DIMENSIONNALITÉ » des exigences de courbure EN EXPLOITANT L'INTERDÉPENDANCE entre les $x$ imposée par les contraintes. […] Tout ce dont nous avons besoin est que LA SECONDE DIFFÉRENTIELLE DE L'OBJECTIF SOIT DÉCROISSANTE LE LONG DE LA CONTRAINTE.** »*

</details>

<details class="details--riche">
<summary>

**15. Dérouler la chaîne (A2.21) → (A2.24).**

</summary>

**Voir la contrainte comme l'identité $g(x_1,x_2(x_1))\equiv0$** ⟹

$$\frac{dx_2}{dx_1}=-\frac{g_1}{g_2} \ \text{(A2.21)} \qquad \frac{dy}{dx_1}=f_1-f_2\frac{g_1}{g_2} \ \text{(A2.22)}$$

**En différentiant à nouveau** *( **les $f_i$ et $g_i$ dépendent de $x_1$ DIRECTEMENT ET par $x_2$**)* on obtient **(A2.23)**, puis, en substituant **les CPO ($f_i=\lambda g_i$)**, **YOUNG ($f_{12}=f_{21}$, $g_{12}=g_{21}$)** et **(A2.21)** :

$$\frac{d^2y}{dx_1^2}=\frac{1}{(g_2)^2}\Big[(f_{11}-\lambda g_{11})g_2^2-2(f_{12}-\lambda g_{12})g_1g_2+(f_{22}-\lambda g_{22})g_1^2\Big] \tag{A2.24}$$

</details>

<details class="details--riche">
<summary>

**16. Reconnaître les $\mathcal{L}_{ij}$ et construire la hessienne bordée.**

</summary>

> *« **Regardez ATTENTIVEMENT les termes impliquant $\lambda$ dans les crochets** […] **ce ne sont que LES PARTIELLES SECONDES DU LAGRANGIEN** »* :

$$\mathcal{L}_{11}=f_{11}-\lambda g_{11}\qquad \mathcal{L}_{12}=f_{12}-\lambda g_{12}\qquad \mathcal{L}_{22}=f_{22}-\lambda g_{22} \tag{A2.25}$$

> ⚠️ *« **À L'ŒIL EXERCÉ, l'expression QUADRATIQUE entre crochets peut être RECONNUE COMME LE DÉTERMINANT D'UNE MATRICE SYMÉTRIQUE.** »*

$$\bar{H}=\begin{pmatrix}0&g_1&g_2\\g_1&\mathcal{L}_{11}&\mathcal{L}_{12}\\g_2&\mathcal{L}_{21}&\mathcal{L}_{22}\end{pmatrix} \qquad\qquad \bar{D}=-\big[\mathcal{L}_{11}g_2^2-2\mathcal{L}_{12}g_1g_2+\mathcal{L}_{22}g_1^2\big]$$

⚠️ **Elle est bordée par LES PARTIELLES PREMIÈRES DE LA CONTRAINTE ET UN ZÉRO.**

</details>

<details class="details--riche">
<summary>

**17. Écrire la formule (A2.27) et son piège de signe.**

</summary>

$$\frac{d^2y}{dx_1^2}=\frac{(-1)}{(g_2)^2}\,\bar{D} \qquad\qquad (\text{en supposant } g_2\neq0)$$

> ⚠️ *« **LA PRUDENCE S'IMPOSE parce que LE SIGNE DE L'UN SERA TOUJOURS OPPOSÉ AU SIGNE DE L'AUTRE, puisque le déterminant est MULTIPLIÉ PAR $-1$.** »*

**THÉORÈME A2.17** : $\bar{D}>0$ ⟹ **MAXIMUM local** · $\bar{D}<0$ ⟹ **MINIMUM local**.

</details>

<details class="details--riche">
<summary>

**18. Refaire l'exemple A2.9.**

</summary>

Depuis l'exemple A2.8 : $\ \mathcal{L}_{11}=-2a$, $\mathcal{L}_{12}=\mathcal{L}_{21}=0$, $\mathcal{L}_{22}=-2b$, $g_1=g_2=1$.

$$\bar{D}=\begin{vmatrix}0&1&1\\1&-2a&0\\1&0&-2b\end{vmatrix}=2(a+b)>0$$

> ⚠️ *« **Parce qu'ici $\bar{D}>0$ POUR TOUTES les valeurs de $x_1$, $x_2$ et $\lambda$, il doit en être ainsi À LA SOLUTION. La valeur de la fonction objectif doit donc être UN MAXIMUM SOUS LA CONTRAINTE.** »*

</details>

<details class="details--riche">
<summary>

**19. Construire la hessienne bordée générale et dire QUELS mineurs regarder.**

</summary>

> *« **La HESSIENNE BORDÉE est formée EN BORDANT LA MATRICE DES PARTIELLES SECONDES DE $\mathcal{L}$ PAR TOUTES LES PARTIELLES PREMIÈRES DES CONTRAINTES ET ASSEZ DE ZÉROS pour former une matrice SYMÉTRIQUE.** »* *(D'aspect **« MONSTRUEUX »**.)*

> ⚠️ *« **LES $n-m$ MINEURS PRINCIPAUX QUI NOUS INTÉRESSENT sont ceux qui commencent au $(2m+1)$-IÈME et finissent au $(n+m)$-IÈME, c'est-à-dire LE DÉTERMINANT DE $\bar{H}$ TOUT ENTIER.** »*

$$\bar{D}_k,\qquad k=m+1,\dots,n \tag{A2.29}$$

⚠️ **Il y en a exactement $n-m$** — le nombre de **degrés de liberté restants**.

</details>

<details class="details--riche">
<summary>

**20. Énoncer le théorème A2.18 et le comparer au cas non contraint.**

</summary>

**1.** **MAXIMUM local** si les $n-m$ mineurs **ALTERNENT EN SIGNE EN COMMENÇANT PAR POSITIF** : $\bar{D}_{m+1}>0$, $\bar{D}_{m+2}<0$, … **2.** **MINIMUM local** si **ils sont TOUS NÉGATIFS**.

| Le cas | MAXIMUM | MINIMUM |
|---|---|---|
| **NON CONTRAINT** *(thm A2.12)* | alternent dès **NÉGATIF** | tous **POSITIFS** |
| **CONTRAINT** *(thm A2.18)* | alternent dès **POSITIF** | tous **NÉGATIFS** |

⚠️ **TOUT EST INVERSÉ — conséquence du $(-1)$ de (A2.27).**

*(Vérification : pour $n=2$, $m=1$, il n'y a **qu'un** mineur, $\bar{D}_2=\bar{D}$, et la condition « $>0$ » **redonne exactement le théorème A2.17**.)*

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Comment le livre définit-il l'économie ? | *« **l'étude du comportement FACE À LA RARETÉ** »* |
| Les trois types de contraintes ? | **Égalité · non-négativité · inégalité quelconque** |
| La forme du problème (A2.4) ? | $\max f(x_1,x_2)$ s.c. **$g(x_1,x_2)=0$ (forme IMPLICITE)** |
| $f$ s'appelle ? | **La MAXIMANDE** |
| L'ensemble admissible ? | **L'ENSEMBLE RÉALISABLE** |
| La méthode de substitution ? | Isoler $x_2=\tilde{g}(x_1)$ puis maximiser **sans contrainte** |
| Son piège ? | **La RÈGLE DE COMPOSITION** — $x_1$ agit **deux fois** |
| Ses limites ? | *« **inutilement lourde** ou **simplement IMPOSSIBLE** »* |
| L'intuition de Lagrange ? | *« il existe **TOUJOURS un problème SANS contrainte** qui donne la solution **COMME SOUS-PRODUIT** »* |
| Le lagrangien ? | $\mathcal{L}=f-\lambda g$ |
| D'où vient $\lambda$ ? | *« **tirée du chapeau parce qu'elle se révélera UTILE** »* |
| Combien de variables a $\mathcal{L}$ ? | **TROIS** *(dans le cas simple)* |
| Que dit (A2.9) ? | **LA CONTRAINTE ELLE-MÊME** |
| Pourquoi le terme en $d\lambda$ disparaît-il ? | **Parce que $g(x_1^*,x_2^*)=0$** |
| Les changements ADMISSIBLES ? | **Ceux avec $dg=0$** |
| Ce que les CPO ne disent PAS ? | **Si c'est un MAX ou un MIN** |
| Le lagrangien général ? | $f(\mathbf{x})-\sum_j\lambda_j g^j(\mathbf{x})$ |
| Combien de multiplicateurs ? | **UN PAR CONTRAINTE** |
| Combien d'équations ? | **$n+m$** |
| La condition sur $m$ ? | **$m<n$** |
| Qui garantit l'existence de l'optimum ? | **WEIERSTRASS** *(continu $+$ compact)* |
| Théorème A2.16 ? | **Gradients LINÉAIREMENT INDÉPENDANTS ⟹ $\lambda_j^*$ existent et sont UNIQUES** |
| Le cas 2 variables, 1 contrainte ? | **Au moins une partielle de $g$ non nulle** |
| La preuve du théorème A2.16 ? | **OMISE** — *« méthodes plus avancées »* |
| Pente d'un ensemble de niveau ? | $(-1)f_1/f_2$ |
| Pente de la contrainte ? | $(-1)g_1/g_2$ |
| Pourquoi la différentielle vaut 0 ? | **La différentielle d'une CONSTANTE est nulle** |
| Ce que disent (A2.19)-(A2.20) ? | **UN POINT DE TANGENCE** |
| L'hypothèse pour diviser ? | **$\lambda^*\neq0$** |
| Le statut de $\lambda$ ici ? | *« **seulement INCIDENT** »* |
| Pourquoi ne pas appliquer les SOC à $\mathcal{L}$ ? | *« **BEAUCOUP PLUS STRINGENT** que nécessaire »* |
| Ce qu'on exploite à la place ? | **L'INTERDÉPENDANCE entre les $x$ imposée par la contrainte** |
| Ce qu'il faut vraiment ? | **Que la seconde différentielle décroisse LE LONG DE LA CONTRAINTE** |
| $dx_2/dx_1$ le long de $g$ ? | $-g_1/g_2$ |
| $dy/dx_1$ ? | $f_1-f_2\,g_1/g_2$ |
| Les trois substitutions de (A2.24) ? | **Les CPO · YOUNG · (A2.21)** |
| $\mathcal{L}_{11}$ ? | **$f_{11}-\lambda g_{11}$** |
| La hessienne bordée ? | **$\mathcal{L}_{ij}$ bordées par $g_1,g_2$ et un ZÉRO** |
| La formule (A2.27) ? | $\dfrac{d^2y}{dx_1^2}=\dfrac{(-1)}{(g_2)^2}\bar{D}$ |
| Sa conséquence ? | **LES SIGNES SONT TOUJOURS OPPOSÉS** |
| Théorème A2.17, $\bar{D}>0$ ? | **MAXIMUM local** |
| $\bar{D}<0$ ? | **MINIMUM local** |
| L'hypothèse cachée ? | **$g_2\neq0$** |
| $\bar{D}$ de l'exemple A2.9 ? | **$2(a+b)>0$ ⟹ MAXIMUM** |
| Combien de mineurs bordés examiner ? | **$n-m$** |
| Du quel au quel ? | **Du $(2m+1)$-ième au $(n+m)$-ième** |
| Théorème A2.18, MAXIMUM ? | **Alternent en commençant par POSITIF** |
| MINIMUM ? | **TOUS NÉGATIFS** |
| Comparé au cas non contraint ? | **TOUT EST INVERSÉ** |
| La solution de A2.25(e) ? | $\left(\tfrac16,\tfrac13,\tfrac12\right)$, $y^*=\tfrac{1}{432}$ |
| Le patron qu'elle révèle ? | **Les parts sont PROPORTIONNELLES AUX EXPOSANTS** |
| Ce que révèlent les deux $\lambda$ de A2.25(b) ? | **L'un donne le MAX, l'autre le MIN** |
