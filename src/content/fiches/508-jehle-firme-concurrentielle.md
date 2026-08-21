# Fiche 508 — Dualité en production et la firme concurrentielle

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 3 « Theory of the Firm », §3.4 « Duality in Production » et §3.5 « The Competitive Firm » (p. 143-154) |
| **Difficulté** | Intermédiaire — la fonction de profit est **convexe**, contrairement à tout ce qui précède |
| **Temps d'étude estimé** | 120 min |
| **Prérequis** | Fiche 507 (fonction de coût, lemme de Shephard) · fiche 504 (théorèmes 2.1, 2.2, 2.6 — les preuves sont identiques) · théorème de Young (A2.2) |
| **Concepts clés** | Dualité production-coût, concavification, récupération de la fonction de production, intégrabilité des demandes conditionnelles, preneur de prix sur les deux marchés, maximisation du profit, produit marginal en valeur, prix égale coût marginal, fonction de profit, non-existence sous rendements croissants, convexité en $(p,w)$, lemme de Hotelling, fonction d'offre, demandes de facteurs non conditionnelles, matrice de substitution semi-définie **positive**, profit restreint, coût variable moyen, règle de fermeture |
| **Poids à l'examen** | Le **théorème 3.5** et son enjeu pour la recherche appliquée · le **théorème 3.6** (intégrabilité des demandes conditionnelles) · l'**argument de non-existence** du profit sous rendements croissants · la **convexité** de $\pi$ et sa preuve · le **lemme de Hotelling** avec le **signe moins** sur les inputs · le **théorème 3.8** et la matrice **semi-définie positive** · la **règle de fermeture** $p\geq avc$. |

## 🎯 Vue d'ensemble

```
LE FIL DU §3.4-3.5 : remonter du COUT a la TECHNOLOGIE, puis choisir l'OUTPUT

  §3.4  DUALITE EN PRODUCTION  --  le §2.1 transpose mot pour mot

     THEOREME 3.5   partir de c(w,y) et RECUPERER f
         f(x) = max { y >= 0 | w . x >= c(w,y) pour tout w >> 0 }
         (l'analogue exact de la construction A(u) du theoreme 2.1)
         f est croissante, non bornee, QUASICONCAVE
         et la fonction de cout qu'elle engendre EST c

     si la f de depart n'etait pas quasiconcave, la f recuperee en est une
     « CONCAVIFICATION »  --  meme phenomene qu'au §2.1.2

     L'ENJEU APPLIQUE, souligne par le livre :
         plus besoin de connaitre la technologie ni d'obtenir des donnees
         d'ingenierie obscures.  On ESTIME c(w,y) sur des prix de facteurs
         et des niveaux d'output OBSERVABLES, puis on RECUPERE f.

     THEOREME 3.6   INTEGRABILITE pour les fonctions de cout
         x(w,y) est une demande conditionnelle engendree par une technologie
         SI ET SEULEMENT SI
            (1) homogene de degre 0 en w
            (2) matrice de substitution SYMETRIQUE et SEMI-DEFINIE NEGATIVE
            (3) w . x(w,y) STRICTEMENT CROISSANTE en y

  §3.5  LA FIRME CONCURRENTIELLE  --  preneuse de prix sur les DEUX marches

     pourquoi elle prend le prix de vente comme donne :
        vendre plus cher -> AUCUNE vente (les consommateurs sont informes)
        vendre moins cher -> aucun interet (elle ecoule tout au prix courant)
     idem sur les facteurs, en miroir

  §3.5.1  LA MAXIMISATION DU PROFIT

     (3.6)   max  p y - w . x   sous contrainte  f(x) >= y
     (3.7)   max  p f(x) - w . x        (la contrainte est saturee)

     CPO :   p . df/dxi = wi
             le membre de gauche = PRODUIT MARGINAL EN VALEUR de l'input i

     en divisant deux CPO :  TMST_ij = wi / wj
     -> EXACTEMENT la condition (3.2) de minimisation du COUT

     LA PROCEDURE EN DEUX TEMPS -- equivalente
     (3.8)   max  p y - c(w,y)     ->   p = dc/dy   PRIX = COUT MARGINAL
             CSO : le cout marginal doit etre NON DECROISSANT

  §3.5.2  LA FONCTION DE PROFIT

     DEF. 3.7   pi(p,w) = max  p y - w . x   s.c.  f(x) >= y
     y(p,w) = fonction d'OFFRE  ·  x(p,w) = demandes de facteurs
     ATTENTION : ce sont de VRAIES demandes, pas les demandes CONDITIONNELLES

     LE PROBLEME D'EXISTENCE
        rendements CROISSANTS  ->  AUCUN maximum : multiplier les inputs par
        t > 1 augmente toujours le profit
        rendements CONSTANTS   ->  profit maximal = 0, mais ECHELLE INDETERMINEE

     THEOREME 3.7   pi(p,w) est  croissante en p · decroissante en w
                    HOMOGENE DE DEGRE UN en (p,w)
                    CONVEXE en (p,w)      <-- l'oppose de e et c !
                    LEMME DE HOTELLING
                        d pi / d p  =  y(p,w)
                        - d pi / d wi  =  xi(p,w)     <-- SIGNE MOINS

     THEOREME 3.8   homogeneite de degre ZERO de y et x
                    dy/dp >= 0   et   dxi/dwi <= 0
                    matrice de substitution SYMETRIQUE et SEMI-DEFINIE POSITIVE

  COURT TERME (thm 3.9)
     certains inputs FIXES -> le profit maximal redevient BIEN DEFINI
     meme sous rendements d'echelle constants ou croissants
     toutes les proprietes survivent SAUF l'homogeneite en prix des facteurs

  LA REGLE DE FERMETURE
     produire y1 > 0 seulement si   p . y1 - tvc(y1) >= 0
     c'est-a-dire seulement si      p >= avc(y1)
     sinon : FERMER, et supporter la perte -tfc
```

> **L'annonce du §3.4.** *« Étant donné la similarité structurelle évidente entre le problème de minimisation du coût de la firme et celui de minimisation de la dépense de l'individu, **il ne devrait pas être surprenant qu'il y ait une dualité entre production et coût tout comme il y en a une entre utilité et dépense. Les principes sont identiques.** »*

> ⚠️ **Note de transcription — identique aux fiches 500-507.** Le PDF n'exporte pas $\gg$, $\sum$ ; il rend l'inégalité vectorielle $\geq$ comme un « + ». Ces symboles sont rétablis depuis la prose. Une **coquille du livre** dans l'énoncé du théorème 3.9 est signalée sur place.

## 🔴 Concept 1 — La dualité en production (§3.4)

### 1.1 Le principe, énoncé en prose

> *« Si nous partons d'une fonction de production et dérivons sa fonction de coût, nous pouvons prendre cette fonction de coût et l'utiliser pour **engendrer une fonction de production**. Si la fonction de production originale est **quasiconcave**, la fonction dérivée lui sera **identique**. Si elle ne l'est pas, la fonction dérivée en est une **"concavification"**. De plus, **toute fonction ayant toutes les propriétés d'une fonction de coût engendre une fonction de production dont elle est la fonction de coût**. »*

> ⚠️ **C'est mot pour mot le §2.1.2 (fiche 504), transposé.** Là, $w(x)$ était la « concavification » de $u(x)$ ; ici la $f$ récupérée est la concavification de la $f$ de départ. Le mécanisme est identique : la minimisation du coût ne « voit » que l'**enveloppe convexe** des ensembles de niveau.

### 1.2 L'enjeu pour la recherche appliquée — le passage à retenir

> *« Ce dernier fait marque **l'un des développements les plus significatifs de la théorie moderne** et a eu des implications importantes pour le travail appliqué. »*

> *« Les chercheurs appliqués **n'ont plus besoin de commencer leur étude de la firme avec une connaissance détaillée de la technologie** et avec accès à des **données d'ingénierie relativement obscures**. À la place, ils peuvent **estimer la fonction de coût** en employant des **prix de facteurs et des niveaux d'output observables sur le marché**. Ils peuvent ensuite **"récupérer" la fonction de production sous-jacente** à partir de la fonction de coût estimée. »*

$$\boxed{\;\underbrace{\text{données de marché}}_{w,\ y,\ \text{dépenses}} \ \longrightarrow\ \underbrace{c(w,y)}_{\text{estimée}} \ \longrightarrow\ \underbrace{f(x)}_{\text{récupérée}}\;}$$

### 1.3 Théorème 3.5 — récupérer la fonction de production

> **THEOREM 3.5 — Recovering a Production Function from a Cost Function.** Soit $c:\mathbb{R}^n_{++}\times\mathbb{R}_+\to\mathbb{R}_+$ satisfaisant les propriétés 1 à 7 d'une fonction de coût données au théorème 3.2. Alors la fonction $f:\mathbb{R}^n_+\to\mathbb{R}_+$ définie par
>
> $$\boxed{\;f(x)\equiv\max\{\,y\geq0 \mid w\cdot x\geq c(w,y),\ \forall\,w\gg0\,\}\;}$$
>
> est **croissante, non bornée supérieurement et quasiconcave**. De plus, **la fonction de coût engendrée par $f$ est $c$**.

> *« Nous pouvons faire bon usage de l'équivalence entre fonctions de coût et fonctions de dépense en énonçant le théorème suivant, qui **combine les analogues des théorèmes 2.1 et 2.2**, et dont la preuve découle des leurs. »*

> **La correspondance terme à terme avec la fiche 504.**
>
> | Consommateur (§2.1.1) | Producteur (§3.4) |
> |---|---|
> | $A(u)=\bigcap_{p\gg0}\{x \mid p\cdot x\geq E(p,u)\}$ | $\{x \mid w\cdot x\geq c(w,y)\ \forall w\gg0\}$ |
> | $u(x)=\max\{u\geq0 \mid x\in A(u)\}$ | $f(x)=\max\{y\geq0 \mid w\cdot x\geq c(w,y)\ \forall w\gg0\}$ |
> | **thm 2.1** : $u$ croissante, non bornée, quasiconcave | idem pour $f$ |
> | **thm 2.2** : la dépense engendrée par $u$ **est** $E$ | le coût engendré par $f$ **est** $c$ |
>
> Le théorème 3.5 **fusionne les deux** en un seul énoncé.
>
> ⚠️ **La lecture de la formule.** $f(x)$ est **le plus grand output** que $x$ pourrait produire sans contredire la fonction de coût : pour tout système de prix, la dépense $w\cdot x$ doit couvrir au moins le coût minimal $c(w,y)$.

### 1.4 Théorème 3.6 — l'intégrabilité pour les fonctions de coût

**La question posée.**

> *« Si $x(w,y)$ résume le comportement de demande conditionnelle de facteurs d'une firme, **sous quelles conditions peut-on conclure que ce comportement est cohérent avec l'hypothèse que chaque niveau d'output a été produit au coût minimal ?** »*

**Le système à résoudre** — exactement le même que celui de Hurwicz-Uzawa (fiche 504, §6.6) :

$$\frac{\partial c(w,y)}{\partial w_i}=x_i(w,y), \qquad i=1,\dots,n$$

> **THEOREM 3.6 — Integrability for Cost Functions.** Une fonction continûment différentiable $x(w,y)$ de $\mathbb{R}^n_{++}\times\mathbb{R}_+$ dans $\mathbb{R}^n_+$ est la fonction de demande conditionnelle de facteurs engendrée par une fonction de production **strictement croissante et quasiconcave** **si et seulement si**
>
> 1. elle est **homogène de degré zéro** en $w$ ;
> 2. sa **matrice de substitution** $\big[\partial x_i(w,y)/\partial w_j\big]$ est **symétrique** et **semi-définie négative** ;
> 3. $w\cdot x(w,y)$ est **strictement croissante** en $y$.

*(Le livre invite le lecteur à s'en convaincre en imitant la preuve esquissée du théorème 2.6.)*

> ⚠️ **La troisième condition n'a pas d'analogue direct au théorème 2.6.** Elle correspond à la propriété 3 du théorème 3.2 — *« $c$ strictement croissante en $y$ »* — car $w\cdot x(w,y)=c(w,y)$. Chez le consommateur, l'équivalent était assuré par la stricte croissance de $e$ en $u$, qui n'apparaissait pas dans la liste des trois conditions parce qu'elle y était garantie par l'équilibre budgétaire.
>
> **Notez aussi que l'homogénéité est ici une condition SÉPARÉE**, alors qu'au théorème 2.6 elle était **impliquée** par les autres (théorème 2.5). La raison : il n'y a pas ici d'analogue de l'« équilibre budgétaire » qui la produirait gratuitement.

## 🔴 Concept 2 — La firme concurrentielle (§3.5)

### 2.1 La double hypothèse

> *« Dans cette section, nous examinons le comportement quand la firme est **à la fois un concurrent parfait sur les marchés de facteurs et un concurrent parfait sur son marché de produit**. Elle est un concurrent parfait sur le marché du produit si elle croit que la quantité qu'elle produit et vend **n'aura aucun effet sur les prix de marché en vigueur**. »*

$$\boxed{\;\text{La firme concurrentielle est PRENEUSE DE PRIX sur les DEUX marchés.}\;}$$

### 2.2 Pourquoi elle prend les prix comme donnés — l'argument du livre

Le livre justifie l'hypothèse en la dérivant d'un raisonnement de choix, plutôt qu'en la postulant.

**Sur le marché du produit :**

| Si la firme… | Alors… |
|---|---|
| tente de vendre **au-dessus** du prix courant | *« elle ne fera **aucune vente**, parce que sur un marché concurrentiel les consommateurs sont **parfaitement informés** du prix plus bas du produit identique ailleurs »* |
| pourrait vendre **en dessous** | *« elle peut vendre **tout ce qu'elle désire** au prix en vigueur, elle n'a donc **aucune incitation** à demander moins »* |

> *« Par conséquent, **il est toujours optimal pour la firme de choisir le prix de son output égal au prix en vigueur**. Ainsi, la firme **agit comme si** elle prenait son prix comme donné. »*

**Sur les marchés de facteurs, en miroir :**

> *« La firme ne pourrait pas réduire les salaires payés aux facteurs en dessous des taux en vigueur, parce que les propriétaires de ces facteurs **vendraient alors leurs services ailleurs**, au taux plus élevé. Et parce qu'elle n'a **aucune incitation à payer plus** que le taux en vigueur, elle choisira optimalement de payer exactement ce taux. »*

> **L'honnêteté du livre sur la portée de l'hypothèse.** *« Bien que l'hypothèse de comportement preneur de prix et les conditions qui y mènent soient **extrêmes**, elles fournissent un **modèle traitable** de la firme, capable de produire des intuitions importantes. »*

## 🔴 Concept 3 — La maximisation du profit (§3.5.1)

### 3.1 Le problème

Les recettes de la firme concurrentielle : $R(y)=py$. Le coût d'un vecteur d'inputs $x$ : $w\cdot x$.

> *« Il y a **deux choses** à noter. D'abord, l'output $y^0$ **peut ne pas être le meilleur niveau** à produire. Ensuite, **même s'il l'était**, les niveaux d'inputs $x^0$ **peuvent ne pas être la meilleure façon** de le produire. La firme doit donc prendre deux décisions : **quel niveau d'output produire** et **quelles quantités de quels facteurs** utiliser. »*

$$\max_{(x,y)\geq0} \ py-w\cdot x \quad\text{s.c.}\quad f(x)\geq y \tag{3.6}$$

**La contrainte est saturée** (la fonction de production est strictement croissante), donc $y=f(x)$ et le problème se réécrit **en la seule variable $x$** :

$$\max_{x\in\mathbb{R}^n_+} \ p\,f(x)-w\cdot x \tag{3.7}$$

### 3.2 Les conditions du premier ordre — et un vocabulaire neuf

En supposant une solution intérieure $x^*\gg0$, **il n'y a aucune contrainte** dans (3.7), donc le gradient de la fonction objectif doit être nul :

$$\boxed{\;p\,\frac{\partial f(x^*)}{\partial x_i}=w_i, \qquad i=1,\dots,n\;}$$

> *« Le terme de gauche, le **produit du prix de l'output par le produit marginal de l'input $i$**, est souvent appelé le **produit marginal en valeur** (*marginal revenue product*) de l'input $i$. Il donne le taux auquel les recettes augmentent par unité supplémentaire d'input $i$ employée. À l'optimum, **il doit égaler le coût par unité d'input $i$**, à savoir $w_i$. »*

**Et en divisant deux de ces conditions :**

$$\frac{\partial f(x^*)/\partial x_i}{\partial f(x^*)/\partial x_j}=\frac{w_i}{w_j} \qquad\text{c'est-à-dire}\qquad \text{TMST}_{ij}=\frac{w_i}{w_j}$$

> *« C'est **précisément la même** que la condition nécessaire pour le choix d'inputs minimisant le coût, obtenue en (3.2). »*

> ⚠️ **Ce n'est pas une redondance mais une confirmation.** La maximisation du profit **contient** la minimisation du coût : quel que soit le $y$ finalement choisi, la firme le produit au moindre coût. C'est ce que le §3.3 avait annoncé (« vrai pour toutes les firmes »), et qui se vérifie ici.

### 3.3 La procédure en deux temps

> *« Il est possible de reformuler le problème de manière à souligner **la nécessité de la minimisation du coût**. Au lieu de penser à maximiser les profits **en une étape**, considérons la procédure **en deux étapes** suivante. D'abord, calculer **pour chaque niveau d'output possible le coût (minimal) de le produire**. Ensuite, choisir **l'output qui maximise la différence** entre les recettes qu'il engendre et son coût. »*

La première étape est déjà faite : c'est $c(w,y)$. La seconde :

$$\max_{y\geq0} \ py-c(w,y) \tag{3.8}$$

*(L'exercice 3.51 demande de vérifier que (3.7) et (3.8) sont équivalents.)*

**La condition du premier ordre :**

$$p-\frac{dc(w,y^*)}{dy}=0 \qquad\Longleftrightarrow\qquad \boxed{\;p=\text{coût marginal}\;}$$

**La condition du second ordre :**

> *« Les conditions du second ordre exigent que **le coût marginal soit non décroissant** à l'optimum, c'est-à-dire $\dfrac{d^2c(y^*)}{dy^2}\geq0$. »*

> **La lecture de la figure 3.7.** La courbe de coût marginal $mc(y)$ coupe la droite horizontale $p$ en **deux** points. Seul celui où **$mc$ est croissante** ($dmc/dy>0$) est un maximum ; l'autre, où $dmc/dy<0$, est un **minimum** local de profit.
>
> ⚠️ **« Prix = coût marginal » ne suffit donc pas.** Il faut ajouter **« et le coût marginal est non décroissant »**. Un exercice qui ne retient que la première condition peut désigner le pire point plutôt que le meilleur.

## 🔴 Concept 4 — La fonction de profit et son problème d'existence (§3.5.2)

### 4.1 Les objets

> *« Quand $f$ satisfait l'hypothèse 3.1 et est **en plus strictement concave**, les solutions du problème (3.6) — **quand elles existent** — seront **uniques** pour chaque vecteur de prix $(p,w)$. »*

| Objet | Nom |
|---|---|
| $y^*\equiv y(p,w)$ | la **fonction d'offre** de la firme |
| $x^*\equiv x(p,w)$ | les **fonctions de demande de facteurs** |

> ⚠️ **Le point de vocabulaire décisif.** *« Ce sont des fonctions de demande **à part entière** parce que, contrairement aux demandes **conditionnelles** qui dépendent en partie de l'output, ces demandes de facteurs **atteignent l'objectif ultime de la firme : elles maximisent son profit**. »*
>
> |  | Argument | Ce qu'elle suppose |
> |---|---|---|
> | $x(w,y)$ **conditionnelle** | $(w,y)$ | $y$ est **donné**, pas choisi |
> | $x(p,w)$ **non conditionnelle** | $(p,w)$ | $y$ est **choisi optimalement** |
>
> Le lien entre les deux : $x(p,w)=x\big(w,\,y(p,w)\big)$.

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 3.7 — The Profit Function.</span>

$$\boxed{\;\pi(p,w)\equiv\max_{(x,y)\geq0} \ py-w\cdot x \quad\text{s.c.}\quad f(x)\geq y\;}$$

C'est une **fonction de valeur maximale**, qui ne dépend que des prix.

</div>

### 4.2 Le problème d'existence — un passage essentiel

> *« L'utilité de la fonction de profit dépend de la satisfaction de certaines préconditions. **Non des moindres parmi celles-ci est qu'un maximum de profit existe réellement.** Ce n'est pas aussi pointilleux que cela peut paraître. »*

**L'argument, sous rendements croissants.** Supposons que $x'$ et $y'=f(x')$ maximisent le profit à $(p,w)$. Avec des rendements croissants :

$$f(tx')>t\,f(x') \qquad \forall\,t>1$$

En multipliant par $p>0$, en soustrayant $w\cdot tx'$ des deux membres et en réarrangeant *(en utilisant $t>1$ et la non-négativité du profit)* :

$$\boxed{\;p\,f(tx')-w\cdot tx' \ > \ p\,f(x')-w\cdot x' \qquad \forall\,t>1\;}$$

> *« Ceci dit qu'**un profit plus élevé peut toujours être obtenu en augmentant les inputs dans la proportion $t>1$** — contredisant notre hypothèse que $x'$ et $f(x')$ maximisaient le profit. »*

**Le cas des rendements constants.**

> *« Notez que dans le cas spécial des **rendements constants**, aucun problème de ce genre ne surgit **si le niveau maximal de profit se trouve être zéro**. Dans ce cas cependant, **l'échelle de l'opération de la firme est indéterminée**, parce que $(y',x')$ et $(ty',tx')$ donnent le même niveau de profit nul pour tout $t>0$. »*

> **Le tableau à mémoriser.**
>
> | Rendements d'échelle | La fonction de profit… |
> |---|---|
> | **décroissants** | est **bien définie** et l'optimum est unique |
> | **constants** | est définie **si** $\pi_{\max}=0$, mais l'**échelle est indéterminée** |
> | **croissants** | **n'existe pas** — le profit est non borné |
>
> ⚠️ **C'est une différence radicale avec le consommateur.** Chez lui, la contrainte budgétaire **bornait** toujours l'ensemble des choix (fiche 501, exercice 1.15). Ici, il n'y a **aucune contrainte de ressources** : rien n'empêche la firme de grossir indéfiniment, sauf la technologie elle-même.

<details class="details--riche">
<summary>

**Le détail de la manipulation algébrique de l'argument de non-existence**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre écrit « en multipliant, soustrayant, réarrangeant et en utilisant $t>1$ et la non-négativité du profit ».</span>

</div>

Partons de $f(tx')>t\,f(x')$ et multiplions par $p>0$ :

$$p\,f(tx') \ > \ t\,p\,f(x')$$

Soustrayons $w\cdot tx'=t\,(w\cdot x')$ des deux membres :

$$p\,f(tx')-t\,(w\cdot x') \ > \ t\,p\,f(x')-t\,(w\cdot x') = t\Big[\underbrace{p\,f(x')-w\cdot x'}_{=\ \pi'\ \geq\ 0}\Big]$$

Le crochet est le profit initial $\pi'$, supposé **non négatif** *(sinon la firme fermerait)*. Comme $t>1$ :

$$t\,\pi' \ \geq \ \pi'$$

En enchaînant :

$$p\,f(tx')-w\cdot(tx') \ > \ t\,\pi' \ \geq \ \pi' = p\,f(x')-w\cdot x' \quad$$

> **Où chaque hypothèse sert :** — $p>0$ : préserve le sens de l'inégalité à la multiplication ; — $t>1$ : donne $t\pi'\geq\pi'$ ; — $\pi'\geq0$ : sans quoi $t\pi'\leq\pi'$ et l'argument s'inverse.
>
> ⚠️ **Si $\pi'<0$, l'argument échoue** — mais alors la firme ferait mieux de ne rien produire, et le profit maximal serait $0$, atteint en $x=0$.

</details>

## 🔴 Concept 5 — Théorème 3.7 : les propriétés de la fonction de profit

### 5.1 L'énoncé

> **THEOREM 3.7 — Properties of the Profit Function.** Si $f$ satisfait l'hypothèse 3.1, alors pour $p\geq0$ et $w\geq0$, la fonction de profit $\pi(p,w)$, là où elle est bien définie, est **continue** et
>
> 1. **croissante** en $p$,
> 2. **décroissante** en $w$,
> 3. **homogène de degré un** en $(p,w)$,
> 4. **convexe** en $(p,w)$,
> 5. **différentiable** en $(p,w)\gg0$.
>
> De plus, sous l'hypothèse additionnelle que $f$ est **strictement concave** (**lemme de Hotelling**) :
>
> $$\boxed{\;\frac{\partial\pi(p,w)}{\partial p}=y(p,w) \qquad\qquad -\frac{\partial\pi(p,w)}{\partial w_i}=x_i(p,w)\;}$$

> ⚠️ **La propriété 4 est le point le plus important de toute la fiche.**
>
> | Fonction | Courbure |
> |---|---|
> | $e(p,u)$ — dépense | **concave** en $p$ |
> | $c(w,y)$ — coût | **concave** en $w$ |
> | $v(p,y)$ — utilité indirecte | **quasiconvexe** en $(p,y)$ |
> | $\pi(p,w)$ — profit | **CONVEXE** en $(p,w)$ |
>
> **La conséquence en cascade :** la hessienne de $\pi$ est **semi-définie POSITIVE**, alors que celle de $e$ et $c$ était semi-définie **négative**. Tous les signes du théorème 3.8 s'en déduisent — et s'inversent par rapport au chapitre 1.

### 5.2 La preuve de la convexité

> *« Les preuves de chaque propriété suivent des schémas familiers et sont donc laissées en exercices pour la plupart. **Ici nous donnons juste une preuve rapide de la convexité.** »*

Soient $(y,x)$ maximisant le profit à $(p,w)$, et $(y',x')$ à $(p',w')$. Définissons

$$p^t\equiv tp+(1-t)p' \qquad w^t\equiv tw+(1-t)w' \qquad 0\leq t\leq1$$

et soient $(y^*,x^*)$ maximisant le profit à $(p^t,w^t)$.

**Les deux inégalités d'optimalité** — chacune dit que le plan optimal fait au moins aussi bien que $(y^*,x^*)$ à ses propres prix :

$$\pi(p,w)=py-w\cdot x \ \geq\ py^*-w\cdot x^*$$

$$\pi(p',w')=p'y'-w'\cdot x' \ \geq\ p'y^*-w'\cdot x^*$$

**Pondérer et additionner.** Pour $0\leq t\leq1$ :

$$t\,\pi(p,w)+(1-t)\,\pi(p',w') \ \geq\ \big(tp+(1-t)p'\big)y^*-\big(tw+(1-t)w'\big)\cdot x^* = \pi(p^t,w^t)$$

ce qui **est** la définition de la convexité. $\blacksquare$

> **Le schéma est exactement celui de la concavité de $e$ (fiche 502, §4.6)** — « pondérer deux inégalités d'optimalité et additionner » — **mais le sens de l'inégalité est inversé**, parce qu'ici on **maximise** au lieu de minimiser.
>
> **L'intuition économique.** Si les prix changent et que la firme **ne réajustait pas** son plan, son profit varierait **linéairement**. Mais elle réajuste : elle produit davantage quand $p$ monte, et substitue vers les facteurs devenus relativement moins chers. Ce réajustement ne peut qu'**augmenter** le profit au-dessus de la ligne droite. D'où la **convexité**.

### 5.3 Le lemme de Hotelling

> *« Notez que par le lemme de Hotelling, **l'offre d'output et les demandes de facteurs peuvent être obtenues directement par simple différentiation**. »*

$$\frac{\partial\pi}{\partial p}=y(p,w) \qquad\qquad \frac{\partial\pi}{\partial w_i}=-\,x_i(p,w)$$

> ⚠️ **Le signe moins est le piège n° 1 de cette fiche.** Il vient du fait que $w_i$ apparaît dans $\pi=py-w\cdot x$ avec un signe **négatif** : $\partial\pi/\partial w_i=-x_i$ par le théorème de l'enveloppe. L'énoncé du livre l'écrit sous la forme $-\dfrac{\partial\pi}{\partial w_i}=x_i(p,w)$ précisément pour que **la demande soit positive**.
>
> **Comparez les trois lemmes de la série :**
>
> | Lemme | Formule | Signe |
> |---|---|---|
> | **Shephard** (dépense) | $\partial e/\partial p_i=x_i^h$ | $+$ |
> | **Shephard** (coût) | $\partial c/\partial w_i=x_i(w,y)$ | $+$ |
> | **Hotelling** (profit) | $\partial\pi/\partial w_i=-x_i(p,w)$ | **$-$** |
> | **Hotelling** (profit) | $\partial\pi/\partial p=y(p,w)$ | $+$ |
>
> La règle : le signe est celui avec lequel le prix **entre dans la fonction objectif**.

## 🔴 Concept 6 — Théorème 3.8 : offre et demandes de facteurs

### 6.1 L'énoncé

> **THEOREM 3.8 — Properties of Output Supply and Input Demand Functions.** Supposons que $f$ soit **strictement concave** et satisfasse l'hypothèse 3.1, et que $\pi$ soit deux fois continûment différentiable. Alors, pour tout $p>0$ et $w\gg0$ où elles sont bien définies :
>
> **1. Homogénéité de degré zéro :**
>
> $$y(tp,tw)=y(p,w) \qquad x_i(tp,tw)=x_i(p,w) \qquad \forall\,t>0$$
>
> **2. Effets de prix propres :**
>
> $$\boxed{\;\frac{\partial y(p,w)}{\partial p}\geq0 \qquad\qquad \frac{\partial x_i(p,w)}{\partial w_i}\leq0\;}$$
>
> **3. La matrice de substitution**
>
> $$\begin{pmatrix} \dfrac{\partial y}{\partial p} & \dfrac{\partial y}{\partial w_1} & \cdots & \dfrac{\partial y}{\partial w_n}\\[2mm] -\dfrac{\partial x_1}{\partial p} & -\dfrac{\partial x_1}{\partial w_1} & \cdots & -\dfrac{\partial x_1}{\partial w_n}\\[2mm] \vdots & \vdots & \ddots & \vdots\\[2mm] -\dfrac{\partial x_n}{\partial p} & -\dfrac{\partial x_n}{\partial w_1} & \cdots & -\dfrac{\partial x_n}{\partial w_n} \end{pmatrix}$$
>
> est **symétrique** et **semi-définie POSITIVE**.

*(Le livre note en bas de page à propos du point 2 : « Bien que cela découle de 3, nous l'avons énoncé explicitement pour insister. »)*

### 6.2 La preuve

**Point 1 — l'homogénéité.** *« Elle découle du lemme de Hotelling et de l'homogénéité de la fonction de profit. »*

$\pi$ est homogène de **degré un** ; par le théorème A2.6, ses dérivées partielles sont homogènes de degré **zéro**. Or ces dérivées **sont** $y$ et $-x_i$.

**Point 2 — les signes.** En exprimant offre et demandes par Hotelling :

$$y(p,w)=\frac{\partial\pi(p,w)}{\partial p} \qquad\qquad x_i(p,w)=(-1)\frac{\partial\pi(p,w)}{\partial w_i}$$

et en dérivant à nouveau *(ces identités valent pour tout $p$ et $w$)* :

$$\frac{\partial y(p,w)}{\partial p}=\frac{\partial^2\pi(p,w)}{\partial p^2}\ \geq\ 0 \qquad\qquad \frac{\partial x_i(p,w)}{\partial w_i}=(-1)\frac{\partial^2\pi(p,w)}{\partial w_i^2}\ \leq\ 0$$

> *« Chaque dérivée de droite est une dérivée partielle seconde **propre** (signée) de $\pi(p,w)$. Parce que $\pi(p,w)$ est **convexe** en $p$ et $w$, ses dérivées secondes propres sont toutes **non négatives**, d'où les signes indiqués. »*

**Point 3 — la matrice.**

> *« Il devrait être clair maintenant que la matrice de substitution du point 3 **est égale à la matrice hessienne** des dérivées secondes de la fonction de profit. Elle doit être **symétrique** par le **théorème de Young**, et **semi-définie positive** par la **convexité** de la fonction de profit. »*

> ⚠️ **L'avertissement du livre, en toutes lettres :** *« **Attention** : notez le signe de chaque terme impliquant une fonction de demande de facteurs. »*
>
> **Les signes moins de la matrice viennent tous de Hotelling.** La matrice est la hessienne de $\pi$ ; ses entrées $\partial^2\pi/\partial w_i\partial w_j$ valent $-\partial x_i/\partial w_j$, d'où les moins. Recopier la matrice sans les moins donne une matrice semi-définie **négative** — le contraire du résultat.

### 6.3 La lecture économique des trois points

| Point | Ce qu'il dit économiquement |
|---|---|
| **1** | **Pas d'illusion monétaire** : doubler tous les prix ne change ni l'offre ni les demandes |
| **2a** $\partial y/\partial p\geq0$ | **la courbe d'offre est croissante** — sans exception, contrairement à la demande du consommateur |
| **2b** $\partial x_i/\partial w_i\leq0$ | **les demandes de facteurs sont décroissantes en leur propre prix** — sans exception |
| **3** symétrie | $\dfrac{\partial y}{\partial w_i}=-\dfrac{\partial x_i}{\partial p}$ : l'effet d'un prix de facteur sur l'offre égale (au signe près) l'effet du prix de vente sur la demande de ce facteur |

> **Le contraste avec le consommateur est frappant.** Là-bas, aucune prédiction inconditionnelle de signe n'était possible sur la demande marshallienne : il fallait passer par Slutsky, et le cas de Giffen restait ouvert (fiche 503). **Ici, les signes sont inconditionnels.**
>
> **Pourquoi ?** Parce qu'il n'y a **pas d'effet de revenu** chez la firme. Elle n'a pas de budget à répartir ; elle maximise une différence, pas une fonction sous contrainte de ressources. C'est ce qui rend $\pi$ convexe là où $v$ n'était que quasiconvexe.

## 🟠 Concept 7 — Exemple 3.5 : la CES à rendements décroissants

**La technologie.**

$$y=\big(x_1^\rho+x_2^\rho\big)^{\beta/\rho}, \qquad \beta<1,\ \ \rho<1,\ \rho\neq0$$

*(L'exercice 3.13 demande de montrer que $\beta<1$ donne des rendements d'échelle **décroissants**.)*

**Les conditions du premier ordre**, solution intérieure supposée :

$$-w_1+p\beta\big(x_1^\rho+x_2^\rho\big)^{(\beta-\rho)/\rho}x_1^{\rho-1}=0 \tag{E.1}$$

$$-w_2+p\beta\big(x_1^\rho+x_2^\rho\big)^{(\beta-\rho)/\rho}x_2^{\rho-1}=0 \tag{E.2}$$

$$\big(x_1^\rho+x_2^\rho\big)^{\beta/\rho}-y=0 \tag{E.3}$$

**Le rapport (E.1)/(E.2)** élimine le facteur commun **et** $p\beta$ :

$$x_1=x_2\left(\frac{w_1}{w_2}\right)^{1/(\rho-1)}$$

**En substituant dans (E.3)** :

$$x_i=y^{1/\beta}\big(w_1^{\,\rho/(\rho-1)}+w_2^{\,\rho/(\rho-1)}\big)^{-1/\rho}w_i^{\,1/(\rho-1)}, \qquad i=1,2 \tag{E.4}$$

> **Notez que (E.4) est exactement la demande CONDITIONNELLE** — elle dépend de $y$. Comparez avec (E.3)-(E.4) de l'exemple 3.3 (fiche 507) : c'est la même chose, avec $y^{1/\beta}$ au lieu de $y$ *(l'exposant $1/\beta$ vient du théorème 3.4(2), la technologie étant homogène de degré $\beta$)*.

**L'offre**, en substituant (E.4) dans (E.1) :

$$\boxed{\;y=(p\beta)^{-\beta/(\beta-1)}\big(w_1^{\,\rho/(\rho-1)}+w_2^{\,\rho/(\rho-1)}\big)^{\beta(\rho-1)/\rho(\beta-1)}\;} \tag{E.5}$$

**Les demandes de facteurs non conditionnelles**, en combinant (E.4) et (E.5) :

$$x_i=w_i^{\,1/(\rho-1)}(p\beta)^{-1/(\beta-1)}\big(w_1^{\,\rho/(\rho-1)}+w_2^{\,\rho/(\rho-1)}\big)^{(\rho-\beta)/\rho(\beta-1)} \tag{E.6}$$

**La fonction de profit**, en substituant dans l'objectif, avec $r\equiv\dfrac{\rho}{\rho-1}$ :

$$\boxed{\;\pi(p,w)=p^{-1/(\beta-1)}\big(w_1^{\,r}+w_2^{\,r}\big)^{\beta/r(\beta-1)}\,\beta^{-\beta/(\beta-1)}\,(1-\beta)\;} \tag{E.7}$$

### 7.1 Le commentaire du livre sur les cas $\beta\geq1$ — à retenir

> *« Notez que **si $\beta=1$**, la fonction de production a des **rendements constants** et **la fonction de profit est indéfinie**, comme nous l'avons conclu plus tôt. »*

> *« **Si $\beta>1$**, et que la fonction de production exhibe des rendements croissants, nous pourrions certainement former (E.7) comme nous l'avons fait, **mais que nous donnerait-elle ?** Si vous regardez de près, et vérifiez les conditions du second ordre, vous trouverez que **(E.5) et (E.6) donnent un MINIMUM local de profit, pas un maximum**. Le profit maximal avec rendements croissants est de même indéfini. »*

> ⚠️ **C'est un avertissement méthodologique majeur.** Les conditions du premier ordre se calculent **toujours** ; elles ne garantissent **rien** sans les conditions du second ordre. Ici, la formule (E.7) est **algébriquement correcte** et **économiquement vide** dès que $\beta\geq1$.
>
> **Le test rapide :** vérifiez que $\beta<1$, c'est-à-dire que la technologie est à **rendements décroissants**, avant d'interpréter quoi que ce soit.

<details class="details--riche">
<summary>

**Vérifier (E.7) par le lemme de Hotelling**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre ne fait pas cette vérification, qui est pourtant le meilleur contrôle disponible.</span>

</div>

Posons $W\equiv\big(w_1^{\,r}+w_2^{\,r}\big)^{1/r}$ et $K\equiv\beta^{-\beta/(\beta-1)}(1-\beta)$, de sorte que

$$\pi(p,w)=K\,p^{-1/(\beta-1)}\,W^{\,\beta/(\beta-1)}$$

**Contrôle 1 — l'offre.**

$$\frac{\partial\pi}{\partial p}=K\left(\frac{-1}{\beta-1}\right)p^{-1/(\beta-1)-1}W^{\,\beta/(\beta-1)}$$

Comme $\beta<1$, on a $\beta-1<0$, donc $\dfrac{-1}{\beta-1}>0$ : **l'offre est positive** . Et l'exposant de $p$ vaut $-\dfrac{1}{\beta-1}-1=-\dfrac{\beta}{\beta-1}>0$ : **l'offre croît avec $p$** *(c'est le point 2 du théorème 3.8)*.

**Contrôle 2 — l'homogénéité.** Remplaçons $(p,w)$ par $(tp,tw)$. Comme $W(tw)=t\,W(w)$ :

$$\pi(tp,tw)=K\,t^{-1/(\beta-1)}p^{-1/(\beta-1)}\,t^{\beta/(\beta-1)}W^{\beta/(\beta-1)}=t^{\frac{\beta-1}{\beta-1}}\,\pi(p,w)=t\,\pi(p,w) \quad$$

**$\pi$ est bien homogène de degré UN** — propriété 3 du théorème 3.7.

**Contrôle 3 — le signe de $\pi$.** Le facteur $(1-\beta)>0$ et tous les autres sont positifs : $\pi>0$ — cohérent avec des rendements décroissants, où la firme dégage une rente.

> ⚠️ **Que se passe-t-il quand $\beta\to1$ ?** Le facteur $(1-\beta)\to0$ mais l'exposant $-\beta/(\beta-1)\to+\infty$ : l'expression devient indéterminée. C'est la manifestation algébrique de la non-existence annoncée.

</details>

## 🟠 Concept 8 — Le profit de court terme et la règle de fermeture

### 8.1 Pourquoi le court terme est utile ici

> *« La fonction de profit que nous avons définie jusqu'ici est vraiment mieux vue comme la fonction de profit **de long terme**. […] La fonction de profit restreinte peut être un outil puissant pour plusieurs raisons. »*

| # | Raison |
|---|---|
| 1 | *« dans beaucoup d'applications, il est très raisonnable de supposer qu'**au moins certains inputs sont en offre fixe** »* |
| 2 | *« l'existence de ces inputs fixes **élimine généralement l'indétermination et la non-bornitude** des profits maximaux »* |
| 3 | *« **la plupart des propriétés** de la fonction de profit générale **sont préservées** par rapport au prix de l'output et aux prix des inputs variables »* |

> **La raison 2 est la plus importante.** Fixer un facteur **borne** ce que la firme peut faire, ce qui restaure l'existence d'un maximum **même sous rendements d'échelle constants ou croissants**. L'exemple 3.6 le montre sur une Cobb-Douglas à rendements constants.

### 8.2 Théorème 3.9

> **THEOREM 3.9 — The Short-Run, or Restricted, Profit Function.** Supposons $f:\mathbb{R}^n_+\to\mathbb{R}_+$ strictement concave et satisfaisant l'hypothèse 3.1. Pour $k<n$, soit $\bar x\in\mathbb{R}^k_+$ un sous-vecteur d'inputs **fixes**. Alors
>
> $$\boxed{\;\pi(p,w,\bar w,\bar x)\equiv\max_{y,x} \ py-w\cdot x-\bar w\cdot\bar x \quad\text{s.c.}\quad f(x,\bar x)\geq y\;}$$
>
> Les solutions $y(p,w,\bar w,\bar x)$ et $x(p,w,\bar w,\bar x)$ sont les fonctions d'**offre restreinte** et de **demande d'inputs variables**.
>
> Pour tout $p>0$ et $w\gg0$, $\pi$ est **continue** en $p$ et $w$, **croissante en $p$**, **décroissante en $w$**, et **convexe en $(p,w)$**. Si $\pi$ est deux fois continûment différentiable, $y$ et $x$ possèdent **les trois propriétés du théorème 3.8** par rapport au prix de l'output et aux prix des inputs variables.

> ⚠️ **Une coquille du livre.** L'énoncé imprimé renvoie aux *« trois propriétés listées au **théorème 5.8** »* — il faut évidemment lire **théorème 3.8**. Ce n'est pas une erreur de lecture de votre part.

**La preuve, telle que le livre l'indique :**

> *« Les propriétés de $\pi(p,w,\bar w,\bar x)$ peuvent être établies simplement en **imitant la preuve** des propriétés correspondantes de $\pi(p,w)$ au théorème 3.7. **La seule qui ne se transpose pas est l'homogénéité en les prix des inputs.** »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi l'homogénéité tombe.</span>

Multiplier $(p,w)$ par $t$ **sans multiplier $\bar w$** casse la structure : le terme $-\bar w\cdot\bar x$ n'est pas échelonné. Il faudrait multiplier $\bar w$ aussi — mais $\bar w$ n'est pas une variable du problème, c'est un paramètre.

</div>

### 8.3 Exemple 3.6 — Cobb-Douglas à rendements constants

**Le problème.** $x_2$ est fixé à $\bar x_2$ :

$$\max_{y,x_1} \ py-w_1x_1-\bar w_2\bar x_2 \quad\text{s.c.}\quad x_1^\alpha\bar x_2^{1-\alpha}\geq y, \qquad 0<\alpha<1$$

**La contrainte est saturée**, donc en substituant $y$ :

$$\max_{x_1} \ p\,x_1^\alpha\bar x_2^{1-\alpha}-w_1x_1-\bar w_2\bar x_2 \tag{E.1}$$

**La condition du premier ordre.**

$$\alpha p\,x_1^{\alpha-1}\bar x_2^{1-\alpha}-w_1=0 \qquad\Longrightarrow\qquad x_1=p^{1/(1-\alpha)}w_1^{1/(\alpha-1)}\alpha^{1/(1-\alpha)}\bar x_2 \tag{E.2}$$

**Le profit de court terme**, en substituant dans (E.1) :

$$\boxed{\;\pi(p,w_1,\bar w_2,\bar x_2)=p^{1/(1-\alpha)}w_1^{\alpha/(\alpha-1)}\alpha^{\alpha/(1-\alpha)}(1-\alpha)\,\bar x_2-\bar w_2\bar x_2\;} \tag{E.3}$$

> *« Notez que **parce que $\alpha<1$, les profits de court terme sont bien définis même si la fonction de production exhibe des rendements d'échelle constants (de long terme)**. »*

> ⚠️ **C'est exactement la raison 2 du §8.1, sur un cas concret.** La Cobb-Douglas $x_1^\alpha x_2^{1-\alpha}$ est homogène de degré 1 — donc à rendements constants, donc à profit de long terme **indéfini**. En fixant $x_2$, la technologie devient $x_1\mapsto x_1^\alpha\bar x_2^{1-\alpha}$, **homogène de degré $\alpha<1$** : rendements décroissants, profit bien défini.

**L'offre de court terme, par Hotelling :**

$$y(p,w_1,\bar w_2,\bar x_2)=\frac{\partial\pi}{\partial p}=p^{\alpha/(1-\alpha)}w_1^{\alpha/(\alpha-1)}\alpha^{\alpha/(1-\alpha)}\bar x_2$$

**La vérification du signe :**

$$\frac{\partial y}{\partial p}=\frac{\alpha}{1-\alpha}\,p^{(2\alpha-1)/(1-\alpha)}w_1^{\alpha/(\alpha-1)}\alpha^{\alpha/(1-\alpha)}\bar x_2 \ > \ 0$$

*« comme attendu »* — c'est le point 2 du théorème 3.8.

### 8.4 La règle de fermeture

**Le cadre.** En subsumant le choix des inputs dans le coût de court terme :

$$\pi(p,w,\bar w,\bar x)=\max_y \ py-sc(y,w,\bar w,\bar x)$$

$$\text{CPO :}\qquad p=\frac{d\,sc(y^*)}{dy} \qquad\text{— prix égale coût marginal de court terme}$$

**La question.**

> *« "Prix égale coût marginal" est-elle une règle **infaillible** pour la firme concurrentielle ? »*

Décomposons le coût de court terme en **coût variable total** $tvc(y)$ et **coût fixe total** $tfc$ :

$$\pi^1\equiv p\,y^1-tvc(y^1)-tfc$$

> *« **Et si $\pi^1$ est négatif ?** Est-il encore préférable pour la firme de produire $y^1$ même si elle fait une perte ? »*

**Les deux options.**

| Option | Profit |
|---|---|
| produire $y^1>0$ | $\pi^1=py^1-tvc(y^1)-tfc$ |
| **fermer**, $y=0$ | $\pi^0=p\cdot0-tvc(0)-tfc=-tfc<0$ |

> *« La firme a **toujours l'option de fermer et de ne rien produire**. Si elle produit $y=0$, elle n'aura aucune recette et n'aura besoin d'acheter aucun input variable, donc les coûts variables sont nuls. **Cependant, la firme doit encore payer les coûts fixes.** »*

**Le critère.** Produire $y^1>0$ seulement si $\pi^1-\pi^0\geq0$, c'est-à-dire

$$p\,y^1-tvc(y^1)\geq0$$

ce qui équivaut à

$$\boxed{\;p \ \geq\ \frac{tvc(y^1)}{y^1}\equiv avc(y^1) \qquad\text{— le COÛT VARIABLE MOYEN}\;}$$

### 8.5 La description complète du choix d'output à court terme

> *« Nous avons maintenant une **description complète** du choix d'output à court terme. **Si la firme produit une quantité positive d'output**, alors elle produira une quantité où — **le prix égale le coût marginal** (et le coût marginal est **non décroissant**), et — le prix n'est **pas inférieur au coût variable moyen** à ce niveau d'output. **Si le prix est inférieur au coût variable moyen** là où prix égale coût marginal, **la firme fermera** et ne produira aucun output. »*

$$\boxed{\begin{array}{ll} \text{produire } y^*>0 \text{ tel que } p=mc(y^*) & \text{si } p\geq avc(y^*) \text{ et } mc \text{ non décroissante}\\[2mm] \text{fermer } (y=0) & \text{si } p<avc(y^*) \end{array}}$$

> ⚠️ **Les coûts fixes n'interviennent PAS dans la décision de fermer.** Ils sont payés dans les deux cas — ils sont **irrécupérables** à court terme. Le critère est $p\geq avc$, **pas** $p\geq atc$ (coût total moyen). C'est l'erreur la plus fréquente sur ce point.
>
> **La lecture économique :** tant que le prix couvre le coût **variable** moyen, chaque unité produite contribue positivement au paiement des coûts fixes. Fermer reviendrait à renoncer à cette contribution.

### 8.6 La note finale du livre sur la dualité

> *« Un dernier commentaire sur les fonctions de profit. Tout comme pour les fonctions de coût, il y a un **ensemble complet de relations de dualité entre fonctions de profit et fonctions de production**. Dans ses formes de long **et** de court terme, **toute fonction ayant les propriétés requises est la fonction de profit d'une certaine fonction de production** ayant les propriétés usuelles. L'analyste peut donc choisir de commencer **soit** par une spécification de la technologie, **soit** par une spécification de la fonction de profit pertinente. »*

Références données : **Diewert (1974)** pour les détails, et l'**exercice 3.53** pour un résultat d'intégrabilité.

> **Le bilan de la dualité, sur l'ensemble des chapitres 1 à 3.**
>
> | Point de départ possible | Chapitre |
> |---|---|
> | $u(x)$ ou $\succsim$ | 1 |
> | $e(p,u)$ | 2 (thm 2.1-2.2) |
> | $v(p,y)$ | 2 (thm 2.3) |
> | $x(p,y)$ | 2 (thm 2.6) |
> | $f(x)$ | 3 |
> | $c(w,y)$ | 3 (thm 3.5) |
> | $x(w,y)$ | 3 (thm 3.6) |
> | $\pi(p,w)$ | 3 (Diewert 1974) |
>
> **Tous ces points de départ sont équivalents.** C'est le résultat le plus profond de cette partie du livre.

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Une $c(w,y)$ donnée + « récupérer $f$ » | **Théorème 3.5** | $f(x)=\max\{y\geq0 \mid w\cdot x\geq c(w,y)\ \forall w\gg0\}$ |
| Une $x(w,y)$ donnée + « est-elle rationalisable ? » | **Théorème 3.6** | Tester les **trois** conditions, dont $w\cdot x(w,y)$ croissante en $y$ |
| Une $f$ + « dériver l'offre et les demandes » | **Maximisation du profit** | (3.7) ou la voie en deux temps (3.8) |
| Une $\pi(p,w)$ donnée | **Lemme de Hotelling** | $y=\partial\pi/\partial p$ · $x_i=-\partial\pi/\partial w_i$ — **signe moins** |
| Rendements croissants ou constants | **Non-existence** | Vérifier avant tout calcul : le profit peut être **indéfini** |
| « la firme doit-elle produire ? » | **Règle de fermeture** | Comparer $p$ à $avc$, **jamais** à $atc$ |
| Facteurs fixes | **Théorème 3.9** | Toutes les propriétés sauf l'**homogénéité** en prix des facteurs |
| Une matrice de dérivées de $y$ et $x$ | **Théorème 3.8** | Symétrique et **semi-définie POSITIVE** — avec les signes moins |

**Les trois réflexes de cadrage :**

1. **Vérifier les rendements d'échelle AVANT tout calcul.** Si $\beta\geq1$ (ou plus généralement si les rendements ne sont pas décroissants), le profit de long terme peut être **indéfini**, et les conditions du premier ordre peuvent désigner un **minimum**.
2. **Distinguer $x(w,y)$ de $x(p,w)$.** La première est **conditionnelle** ; la seconde suppose $y$ optimalement choisi. Lien : $x(p,w)=x\big(w,y(p,w)\big)$.
3. **Se rappeler que $\pi$ est CONVEXE.** Tous les signes du théorème 3.8 en découlent, et ils sont **inverses** de ceux du chapitre 1.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Dériver offre et demandes à partir de $f$

**Voie directe (3.7).**

1. Vérifier que $f$ est **strictement concave** (rendements décroissants) — sinon, s'arrêter.
2. Écrire $\max_x \ p\,f(x)-w\cdot x$ — **sans contrainte**.
3. CPO : $p\,\dfrac{\partial f}{\partial x_i}=w_i$ pour chaque $i$.
4. **Diviser deux CPO** pour éliminer $p$ : $\text{TMST}_{ij}=w_i/w_j$ ⟹ relation entre les $x_i$.
5. Réinjecter dans une CPO pour obtenir $x_i(p,w)$, puis $y(p,w)=f\big(x(p,w)\big)$.
6. Former $\pi(p,w)=p\,y(p,w)-w\cdot x(p,w)$.

**Voie en deux temps (3.8)** — souvent plus rapide si $c(w,y)$ est connue :

1. Calculer $c(w,y)$ (méthode de la fiche 507).
2. Résoudre $\max_y \ py-c(w,y)$ ⟹ $p=\dfrac{\partial c}{\partial y}$.
3. **Vérifier la CSO** : $\dfrac{\partial^2c}{\partial y^2}\geq0$.
4. Résoudre pour $y(p,w)$, puis $x(p,w)=x\big(w,y(p,w)\big)$.

### Méthode 2 — Exploiter le lemme de Hotelling

$$y(p,w)=\frac{\partial\pi}{\partial p} \qquad\qquad x_i(p,w)=-\frac{\partial\pi}{\partial w_i}$$

**Les quatre contrôles à faire ensuite :**

| Contrôle | Ce qu'il vérifie |
|---|---|
| $y>0$ et $x_i>0$ | les signes de Hotelling ont été correctement appliqués |
| $\pi(tp,tw)=t\,\pi(p,w)$ | homogénéité de **degré un** |
| $y(tp,tw)=y(p,w)$ | homogénéité de **degré zéro** des solutions |
| $\partial y/\partial p\geq0$ et $\partial x_i/\partial w_i\leq0$ | théorème 3.8, point 2 |

### Méthode 3 — Tester l'existence du profit maximal

1. **Calculer le degré d'homogénéité** de $f$ (ou l'élasticité d'échelle $\mu$).
2. Conclure :

| Rendements | Verdict |
|---|---|
| **décroissants** ($\mu<1$) | $\pi$ bien définie, solution unique |
| **constants** ($\mu=1$) | $\pi$ définie **seulement si** $\pi_{\max}=0$ ; échelle **indéterminée** |
| **croissants** ($\mu>1$) | **$\pi$ n'existe pas** — les CPO donnent un **minimum** |

3. Si les rendements ne sont pas décroissants, **passer au court terme** (théorème 3.9) : fixer un facteur restaure l'existence.

### Méthode 4 — Décider de produire ou de fermer

1. Trouver $y^*$ tel que $p=mc(y^*)$, **avec $mc$ non décroissante**.
2. Calculer $avc(y^*)=\dfrac{tvc(y^*)}{y^*}$.
3. Comparer :

$$\begin{cases} p\geq avc(y^*) & \Longrightarrow \ \text{produire } y^*\\ p<avc(y^*) & \Longrightarrow \ \text{FERMER}, \ y=0, \text{ perte } =-tfc \end{cases}$$

⚠️ **Ne jamais comparer $p$ à $atc$** — les coûts fixes sont payés dans les deux cas.

### Méthode 5 — Récupérer $f$ à partir de $c$

1. **Vérifier les 7 propriétés** du théorème 3.2 sur la $c$ donnée.
2. Appliquer la formule du théorème 3.5 : $$f(x)=\max\{\,y\geq0 \mid w\cdot x\geq c(w,y),\ \forall w\gg0\,\}$$
3. En pratique, pour une $c$ homothétique $c(w,y)=h(y)\,c(w,1)$, la condition devient $h(y)\leq\dfrac{w\cdot x}{c(w,1)}$ pour tout $w$, donc $$f(x)=h^{-1}\left(\min_{w\gg0}\frac{w\cdot x}{c(w,1)}\right)$$
4. **Vérifier** en recalculant $c$ à partir de la $f$ obtenue.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que le théorème 3.5 récupère **exactement** la $f$ de départ | Si elle n'était pas quasiconcave, on obtient sa **concavification** | Identique **seulement si** $f$ était quasiconcave |
| 2 | Oublier la troisième condition du théorème 3.6 | $w\cdot x(w,y)$ **strictement croissante en $y$** est une condition à part entière | Elle traduit la propriété 3 du thm 3.2 |
| 3 | Croire que l'homogénéité est redondante au thm 3.6 | Elle l'était au thm 2.6 (via le budget), **pas ici** | Trois conditions, pas deux |
| 4 | Traiter (3.7) comme un problème **sous contrainte** | La contrainte a déjà été substituée : $y=f(x)$ | Le gradient de l'objectif doit être **nul** |
| 5 | Oublier la condition du second ordre sur $mc$ | « $p=mc$ » désigne **deux** points sur la Fig. 3.7, dont un **minimum** | Ajouter « et $mc$ non décroissante » |
| 6 | Confondre $x(w,y)$ et $x(p,w)$ | La première est **conditionnelle** à $y$ | $x(p,w)=x\big(w,y(p,w)\big)$ |
| 7 | Appliquer la théorie sans vérifier les rendements | Sous rendements **croissants**, le profit maximal **n'existe pas** | Vérifier $\mu<1$ d'abord |
| 8 | Croire que rendements constants ⟹ profit bien défini | Il l'est **seulement si** $\pi_{\max}=0$, et l'**échelle reste indéterminée** | Le livre le dit explicitement |
| 9 | Écrire que $\pi$ est **concave** en $(p,w)$ | Elle est **CONVEXE** — c'est l'opposé de $e$ et $c$ | Hessienne **semi-définie positive** |
| 10 | Oublier le **signe moins** du lemme de Hotelling | $w_i$ entre dans $\pi$ avec un signe négatif | $x_i(p,w)=-\dfrac{\partial\pi}{\partial w_i}$ |
| 11 | Recopier la matrice du thm 3.8 sans les signes moins | Sans eux, elle devient semi-définie **négative** | *« Attention : notez le signe de chaque terme impliquant une demande de facteurs »* |
| 12 | Croire que $\partial y/\partial p$ peut être négative | **Jamais** — c'est une dérivée seconde propre d'une fonction convexe | La courbe d'offre est **toujours** croissante |
| 13 | Chercher un « effet de revenu » chez la firme | Il n'y en a **pas** — la firme n'a pas de budget à répartir | C'est pourquoi les signes sont inconditionnels |
| 14 | Dans l'exemple 3.5, interpréter (E.7) pour $\beta\geq1$ | *« (E.5) et (E.6) donnent un **minimum** local de profit »* | La formule est correcte et **vide** |
| 15 | Croire que $\pi$ de court terme est homogène en $(p,w)$ | **La seule propriété qui ne se transpose pas** — $\bar w\cdot\bar x$ n'est pas échelonné | Toutes les autres survivent |
| 16 | Renvoyer au « théorème 5.8 » comme le fait le livre | C'est une **coquille** : lire **théorème 3.8** | Le signaler si vous citez l'énoncé |
| 17 | Comparer $p$ à $atc$ pour décider de fermer | Les coûts fixes sont payés **dans les deux cas** | Le critère est $p\geq avc$ |
| 18 | Croire que fermer donne un profit nul | Fermer donne $\pi^0=-tfc<0$ | On choisit la **moindre perte** |
| 19 | Croire que la firme concurrentielle « choisit » son prix | Elle le prend comme **donné** — le livre en donne l'argument | Vendre plus cher : aucune vente ; moins cher : aucun intérêt |
| 20 | Oublier que la maximisation du profit **contient** la minimisation du coût | Les deux donnent $\text{TMST}_{ij}=w_i/w_j$ | Ce n'est pas une redondance mais une **confirmation** |

## 📌 Ultimate Review

**§3.4 — dualité en production.**

**THÉORÈME 3.5.**

$$f(x)\equiv\max\{\,y\geq0 \mid w\cdot x\geq c(w,y),\ \forall\,w\gg0\,\}$$

$f$ est croissante, non bornée, **quasiconcave**, et **le coût qu'elle engendre est $c$**. *(Fusion des théorèmes 2.1 et 2.2.)*

**L'enjeu appliqué :** estimer $c(w,y)$ sur des **données de marché observables**, puis **récupérer** $f$ — plus besoin de données d'ingénierie.

**THÉORÈME 3.6 — intégrabilité.** $x(w,y)$ est une demande conditionnelle **ssi**

1. **homogène de degré zéro** en $w$ ;
2. matrice de substitution **symétrique** et **semi-définie négative** ;
3. $w\cdot x(w,y)$ **strictement croissante** en $y$.

**§3.5 — la firme concurrentielle.** Preneuse de prix sur les **deux** marchés. *(Vendre plus cher : aucune vente. Moins cher : aucun intérêt. Idem en miroir sur les facteurs.)*

**§3.5.1 — la maximisation du profit.**

$$\max_{(x,y)\geq0} py-w\cdot x \ \text{ s.c. } f(x)\geq y \quad \text{(3.6)} \qquad\Longleftrightarrow\qquad \max_{x\geq0} \ p\,f(x)-w\cdot x \quad \text{(3.7)}$$

$$\text{CPO :}\quad \boxed{p\,\frac{\partial f(x^*)}{\partial x_i}=w_i} \quad\text{— le PRODUIT MARGINAL EN VALEUR égale le prix du facteur}$$

En divisant deux CPO : $\text{TMST}_{ij}=w_i/w_j$ — **la condition (3.2) de minimisation du coût**.

**La voie en deux temps.**

$$\max_{y\geq0} \ py-c(w,y) \tag{3.8} \qquad\Longrightarrow\qquad \boxed{p=\frac{dc(w,y^*)}{dy}} \quad\text{avec } \frac{d^2c}{dy^2}\geq0$$

**§3.5.2 — la fonction de profit.**

$$\pi(p,w)\equiv\max_{(x,y)\geq0} \ py-w\cdot x \ \text{ s.c. } f(x)\geq y$$

$y(p,w)$ = **offre** · $x(p,w)$ = **demandes de facteurs non conditionnelles** *(à ne pas confondre avec $x(w,y)$)*.

**L'existence.**

| Rendements | Verdict |
|---|---|
| décroissants | $\pi$ définie, solution unique |
| constants | définie **ssi** $\pi_{\max}=0$ ; **échelle indéterminée** |
| croissants | **$\pi$ n'existe pas** : $p\,f(tx')-w\cdot tx'>p\,f(x')-w\cdot x'$ pour tout $t>1$ |

**THÉORÈME 3.7.** $\pi$ est continue · **croissante en $p$** · **décroissante en $w$** · **homogène de degré UN** en $(p,w)$ · **CONVEXE** en $(p,w)$ · différentiable.

$$\boxed{\;\text{LEMME DE HOTELLING :}\qquad \frac{\partial\pi}{\partial p}=y(p,w) \qquad -\frac{\partial\pi}{\partial w_i}=x_i(p,w)\;}$$

*Preuve de la convexité : pondérer deux inégalités d'optimalité et additionner — mais en sens **inverse** de la concavité de $e$, parce qu'on **maximise**.*

**THÉORÈME 3.8.**

1. $y$ et $x$ **homogènes de degré zéro** en $(p,w)$.
2. $\dfrac{\partial y}{\partial p}\geq0$ et $\dfrac{\partial x_i}{\partial w_i}\leq0$ — **inconditionnellement**.
3. La matrice de substitution (avec les **signes moins** sur les lignes d'inputs) est **symétrique** et **semi-définie POSITIVE**.

**Exemple 3.5 — CES.** $y=\big(x_1^\rho+x_2^\rho\big)^{\beta/\rho}$, $\beta<1$ :

$$\pi(p,w)=p^{-1/(\beta-1)}\big(w_1^{\,r}+w_2^{\,r}\big)^{\beta/r(\beta-1)}\beta^{-\beta/(\beta-1)}(1-\beta), \qquad r=\frac{\rho}{\rho-1}$$

⚠️ **Si $\beta=1$ : indéfinie. Si $\beta>1$ : les CPO donnent un MINIMUM.**

**THÉORÈME 3.9 — court terme.** Fixer des facteurs **restaure l'existence** du maximum, même sous rendements constants ou croissants. Toutes les propriétés du thm 3.7 et 3.8 survivent **sauf l'homogénéité en prix des facteurs**.

**Exemple 3.6.** Cobb-Douglas à rendements constants, $x_2$ fixé :

$$\pi=p^{1/(1-\alpha)}w_1^{\alpha/(\alpha-1)}\alpha^{\alpha/(1-\alpha)}(1-\alpha)\bar x_2-\bar w_2\bar x_2$$

*« bien définie même si la production a des rendements constants de long terme »* — la technologie restreinte est homogène de degré $\alpha<1$.

**LA RÈGLE DE FERMETURE.**

| Option | Profit |
|---|---|
| produire $y^1$ | $py^1-tvc(y^1)-tfc$ |
| fermer | $-tfc$ |

$$\boxed{\;\text{produire } y^* \text{ tel que } p=mc(y^*) \ \textbf{si} \ p\geq avc(y^*) \ ; \ \text{sinon FERMER}\;}$$

⚠️ Le critère est $avc$, **pas** $atc$ : les coûts fixes sont payés dans les deux cas.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Que dit le principe de dualité en production ?**

</summary>

> *« Si nous partons d'une fonction de production et dérivons sa fonction de coût, nous pouvons prendre cette fonction de coût et l'utiliser pour **engendrer une fonction de production**. Si la fonction originale est **quasiconcave**, la fonction dérivée lui sera **identique** ; sinon, elle en est une **"concavification"**. De plus, **toute fonction ayant les propriétés d'une fonction de coût engendre une fonction de production dont elle est la fonction de coût**. »*

C'est le §2.1 (fiche 504) transposé mot pour mot.

</details>

<details class="details--riche">
<summary>

**2. Quel est l'enjeu du théorème 3.5 pour la recherche appliquée ?**

</summary>

> *« Les chercheurs appliqués **n'ont plus besoin de commencer avec une connaissance détaillée de la technologie** et avec accès à des **données d'ingénierie relativement obscures**. À la place, ils peuvent **estimer la fonction de coût** en employant des **prix de facteurs et des niveaux d'output observables**, puis **"récupérer" la fonction de production**. »*

$$\text{données de marché} \ \longrightarrow\ c(w,y) \ \longrightarrow\ f(x)$$

Le livre parle de *« l'un des développements les plus significatifs de la théorie moderne »*.

</details>

<details class="details--riche">
<summary>

**3. Énoncer le théorème 3.5.**

</summary>

Si $c$ satisfait les 7 propriétés du théorème 3.2, alors

$$f(x)\equiv\max\{\,y\geq0 \mid w\cdot x\geq c(w,y),\ \forall\,w\gg0\,\}$$

est **croissante, non bornée supérieurement, quasiconcave**, et **la fonction de coût engendrée par $f$ est $c$**.

**Lecture :** $f(x)$ est le **plus grand output** que $x$ pourrait produire sans contredire $c$.

Le théorème **fusionne** les analogues des théorèmes 2.1 et 2.2.

</details>

<details class="details--riche">
<summary>

**4. Énoncer le théorème 3.6 et comparer au théorème 2.6.**

</summary>

$x(w,y)$ est engendrée par une technologie strictement croissante et quasiconcave **ssi**

1. **homogène de degré zéro** en $w$ ;
2. matrice de substitution **symétrique** et **semi-définie négative** ;
3. $w\cdot x(w,y)$ **strictement croissante** en $y$.

**Deux différences avec le théorème 2.6 :** — la condition 3 **n'a pas d'analogue direct** : elle traduit la propriété 3 du thm 3.2 ($c$ croissante en $y$) ; — l'**homogénéité est ici une condition séparée**, alors qu'au thm 2.6 elle était **impliquée** (thm 2.5, via l'équilibre budgétaire). Il n'y a pas d'équivalent du budget chez la firme.

</details>

<details class="details--riche">
<summary>

**5. Pourquoi la firme concurrentielle prend-elle les prix comme donnés ?**

</summary>

**Sur le marché du produit :** — vendre **plus cher** ⟹ *« **aucune vente**, parce que les consommateurs sont parfaitement informés du prix plus bas ailleurs »* ; — vendre **moins cher** ⟹ aucun intérêt, *« elle peut vendre tout ce qu'elle désire au prix en vigueur »*.

**Sur les marchés de facteurs, en miroir :** payer moins ⟹ les propriétaires vendent ailleurs ; payer plus ⟹ aucun intérêt.

> *« Bien que ces conditions soient **extrêmes**, elles fournissent un **modèle traitable** capable de produire des intuitions importantes. »*

</details>

<details class="details--riche">
<summary>

**6. Écrire le problème de maximisation du profit sous ses deux formes.**

</summary>

$$\max_{(x,y)\geq0} \ py-w\cdot x \quad\text{s.c.}\quad f(x)\geq y \tag{3.6}$$

La contrainte est **saturée** ($f$ strictement croissante), donc $y=f(x)$ et

$$\max_{x\in\mathbb{R}^n_+} \ p\,f(x)-w\cdot x \tag{3.7}$$

⚠️ **(3.7) est SANS CONTRAINTE** : le gradient de l'objectif doit être **nul**.

</details>

<details class="details--riche">
<summary>

**7. Qu'est-ce que le produit marginal en valeur ?**

</summary>

La condition du premier ordre de (3.7) s'écrit

$$p\,\frac{\partial f(x^*)}{\partial x_i}=w_i$$

> *« Le terme de gauche, le **produit du prix de l'output par le produit marginal de l'input $i$**, est appelé le **produit marginal en valeur** de l'input $i$. Il donne le taux auquel les recettes augmentent par unité supplémentaire d'input $i$. À l'optimum, il doit **égaler le coût par unité**, $w_i$. »*

</details>

<details class="details--riche">
<summary>

**8. Que retrouve-t-on en divisant deux conditions du premier ordre ?**

</summary>

$$\frac{\partial f(x^*)/\partial x_i}{\partial f(x^*)/\partial x_j}=\frac{w_i}{w_j} \qquad\text{soit}\qquad \text{TMST}_{ij}=\frac{w_i}{w_j}$$

> *« C'est **précisément la même** que la condition nécessaire pour le choix minimisant le coût, obtenue en (3.2). »*

⚠️ **Ce n'est pas une redondance mais une confirmation** : la maximisation du profit **contient** la minimisation du coût.

</details>

<details class="details--riche">
<summary>

**9. Décrire la procédure en deux temps.**

</summary>

> *« D'abord, calculer **pour chaque niveau d'output le coût minimal** de le produire. Ensuite, choisir **l'output qui maximise la différence** entre recettes et coût. »*

$$\max_{y\geq0} \ py-c(w,y) \tag{3.8} \qquad\Longrightarrow\qquad p=\frac{dc(w,y^*)}{dy}$$

**Condition du second ordre :** $\dfrac{d^2c(y^*)}{dy^2}\geq0$ — le coût marginal doit être **non décroissant**.

</details>

<details class="details--riche">
<summary>

**10. Pourquoi « prix = coût marginal » ne suffit-il pas ?**

</summary>

Sur la figure 3.7, la courbe $mc(y)$ coupe la droite $p$ en **deux** points. Celui où $\dfrac{dmc}{dy}<0$ est un **minimum** local de profit ; seul celui où $\dfrac{dmc}{dy}>0$ est un maximum.

⚠️ Il faut donc **toujours** ajouter « **et le coût marginal est non décroissant** ».

</details>

<details class="details--riche">
<summary>

**11. Distinguer $x(w,y)$ et $x(p,w)$.**

</summary>

|  | Arguments | Statut de $y$ |
|---|---|---|
| $x(w,y)$ — **conditionnelle** | prix de facteurs et **output** | **donné**, pas choisi |
| $x(p,w)$ — **non conditionnelle** | prix de facteurs et **du produit** | **choisi optimalement** |

> *« Ce sont des fonctions de demande **à part entière** parce que, contrairement aux demandes conditionnelles, elles **atteignent l'objectif ultime de la firme : elles maximisent son profit**. »*

Lien : $x(p,w)=x\big(w,\,y(p,w)\big)$.

</details>

<details class="details--riche">
<summary>

**12. Démontrer que le profit maximal n'existe pas sous rendements croissants.**

</summary>

Supposons $x'$ optimal, avec $\pi'=p\,f(x')-w\cdot x'\geq0$. Les rendements croissants donnent $f(tx')>t\,f(x')$ pour $t>1$. En multipliant par $p>0$ et en soustrayant $t\,(w\cdot x')$ :

$$p\,f(tx')-w\cdot(tx') \ > \ t\big[p\,f(x')-w\cdot x'\big]=t\,\pi' \ \geq\ \pi'$$

*(la dernière inégalité parce que $t>1$ et $\pi'\geq0$).*

> *« Un profit plus élevé peut **toujours** être obtenu en augmentant les inputs dans la proportion $t>1$ — contredisant l'hypothèse. »* $\blacksquare$

</details>

<details class="details--riche">
<summary>

**13. Que se passe-t-il sous rendements d'échelle constants ?**

</summary>

> *« Aucun problème ne surgit **si le niveau maximal de profit se trouve être zéro**. Dans ce cas cependant, **l'échelle de l'opération est indéterminée**, parce que $(y',x')$ et $(ty',tx')$ donnent le même profit nul pour tout $t>0$. »*

$$\text{rendements constants} \ \Longrightarrow \ \pi_{\max}=0 \text{ et échelle indéterminée}$$

</details>

<details class="details--riche">
<summary>

**14. Lister les propriétés de la fonction de profit.**

</summary>

Continue, et

1. **croissante** en $p$
2. **décroissante** en $w$
3. **homogène de degré un** en $(p,w)$
4. **CONVEXE** en $(p,w)$
5. différentiable en $(p,w)\gg0$

Plus, sous stricte concavité de $f$, le **lemme de Hotelling**.

⚠️ **La propriété 4 est l'inverse de celle de $e$ et $c$**, qui étaient **concaves**.

</details>

<details class="details--riche">
<summary>

**15. Démontrer la convexité de $\pi$.**

</summary>

Soient $(y,x)$ optimal à $(p,w)$, $(y',x')$ à $(p',w')$, et $(y^*,x^*)$ à $(p^t,w^t)$.

**Deux inégalités d'optimalité :**

$$\pi(p,w)=py-w\cdot x\geq py^*-w\cdot x^* \qquad \pi(p',w')=p'y'-w'\cdot x'\geq p'y^*-w'\cdot x^*$$

En pondérant par $t$ et $1-t$ et en additionnant :

$$t\pi(p,w)+(1-t)\pi(p',w')\geq\big(tp+(1-t)p'\big)y^*-\big(tw+(1-t)w'\big)\cdot x^*=\pi(p^t,w^t) \qquad\blacksquare$$

**Même schéma que la concavité de $e$, mais en sens inverse — parce qu'on maximise.**

</details>

<details class="details--riche">
<summary>

**16. Donner l'intuition économique de la convexité de $\pi$.**

</summary>

Si les prix changent et que la firme **ne réajustait pas** son plan, le profit varierait **linéairement**. Mais elle réajuste : elle produit davantage quand $p$ monte, et substitue vers les facteurs devenus moins chers. Ce réajustement ne peut qu'**augmenter** le profit au-dessus de la ligne droite.

> **C'est l'argument miroir de celui de la concavité de $e$** (fiche 502, §4.6), où le réajustement **réduisait** la dépense sous la ligne droite.

</details>

<details class="details--riche">
<summary>

**17. Énoncer le lemme de Hotelling en soignant les signes.**

</summary>

$$\frac{\partial\pi(p,w)}{\partial p}=y(p,w) \qquad\qquad -\frac{\partial\pi(p,w)}{\partial w_i}=x_i(p,w)$$

⚠️ **Le signe moins** vient de ce que $w_i$ entre dans $\pi=py-w\cdot x$ **négativement**.

**La règle générale :** le signe est celui avec lequel le prix entre dans la fonction objectif. C'est pourquoi Shephard ($\partial e/\partial p_i=+x_i^h$) n'a pas de signe moins et Hotelling en a un.

</details>

<details class="details--riche">
<summary>

**18. Énoncer les trois points du théorème 3.8.**

</summary>

1. **Homogénéité de degré zéro** : $y(tp,tw)=y(p,w)$ et $x_i(tp,tw)=x_i(p,w)$.
2. **Effets de prix propres** : $\dfrac{\partial y}{\partial p}\geq0$ et $\dfrac{\partial x_i}{\partial w_i}\leq0$.
3. La **matrice de substitution** (avec les signes moins sur les lignes d'inputs) est **symétrique** et **semi-définie POSITIVE**.

</details>

<details class="details--riche">
<summary>

**19. D'où viennent les signes du point 2 ?**

</summary>

Par Hotelling puis dérivation :

$$\frac{\partial y}{\partial p}=\frac{\partial^2\pi}{\partial p^2}\geq0 \qquad\qquad \frac{\partial x_i}{\partial w_i}=(-1)\frac{\partial^2\pi}{\partial w_i^2}\leq0$$

> *« Chaque dérivée de droite est une dérivée seconde **propre** de $\pi$. Parce que $\pi$ est **convexe**, ses dérivées secondes propres sont **non négatives**. »*

Le signe moins de la seconde vient de Hotelling.

</details>

<details class="details--riche">
<summary>

**20. Pourquoi la matrice du théorème 3.8 est-elle semi-définie POSITIVE ?**

</summary>

Parce qu'elle **est** la matrice hessienne de $\pi$, et que $\pi$ est **convexe**.

La symétrie vient du **théorème de Young**.

⚠️ **L'avertissement du livre :** *« **Attention** : notez le signe de chaque terme impliquant une fonction de demande de facteurs. »* Sans les signes moins, la matrice devient semi-définie **négative** — le contraire du résultat.

</details>

<details class="details--riche">
<summary>

**21. Pourquoi les signes du théorème 3.8 sont-ils inconditionnels, contrairement au chapitre 1 ?**

</summary>

Parce qu'il **n'y a pas d'effet de revenu** chez la firme. Elle n'a **pas de budget à répartir** ; elle maximise une **différence**, pas une fonction sous contrainte de ressources.

C'est ce qui rend $\pi$ **convexe** là où $v$ n'était que **quasiconvexe**, et qui élimine le cas de Giffen : la courbe d'offre est **toujours** croissante, les demandes de facteurs **toujours** décroissantes en leur propre prix.

</details>

<details class="details--riche">
<summary>

**22. Quel est le domaine de validité de l'exemple 3.5 ?**

</summary>

$y=\big(x_1^\rho+x_2^\rho\big)^{\beta/\rho}$ avec $\beta<1$ (rendements **décroissants**) et $\rho<1$, $\rho\neq0$.

| Cas | Verdict du livre |
|---|---|
| $\beta<1$ | tout fonctionne |
| $\beta=1$ | rendements constants — **la fonction de profit est indéfinie** |
| $\beta>1$ | *« (E.5) et (E.6) donnent un **minimum** local de profit, pas un maximum »* |

**La formule (E.7) reste algébriquement calculable et économiquement vide.**

</details>

<details class="details--riche">
<summary>

**23. Pourquoi le court terme restaure-t-il l'existence du profit maximal ?**

</summary>

> *« L'existence de ces inputs fixes **élimine généralement l'indétermination et la non-bornitude** des profits maximaux. »*

Fixer un facteur **borne** ce que la firme peut faire. Techniquement, la technologie restreinte a un **degré d'homogénéité plus faible**.

**Exemple 3.6 :** la Cobb-Douglas $x_1^\alpha x_2^{1-\alpha}$ est homogène de degré 1 (profit de long terme indéfini) ; en fixant $x_2$, elle devient $x_1\mapsto x_1^\alpha\bar x_2^{1-\alpha}$, **homogène de degré $\alpha<1$** ⟹ profit bien défini.

</details>

<details class="details--riche">
<summary>

**24. Quelle propriété ne se transpose pas au court terme ?**

</summary>

> *« La seule qui ne se transpose pas est **l'homogénéité en les prix des inputs**. »*

**Pourquoi :** multiplier $(p,w)$ par $t$ **sans multiplier $\bar w$** casse la structure — le terme $-\bar w\cdot\bar x$ n'est pas échelonné. Or $\bar w$ est un **paramètre**, pas une variable du problème.

Toutes les autres propriétés survivent : continuité, croissance en $p$, décroissance en $w$, **convexité**, et les trois points du théorème 3.8.

⚠️ *(L'énoncé imprimé renvoie au « théorème 5.8 » — coquille pour **3.8**.)*

</details>

<details class="details--riche">
<summary>

**25. Dérouler l'exemple 3.6.**

</summary>

$\max_{y,x_1} \ py-w_1x_1-\bar w_2\bar x_2$ s.c. $x_1^\alpha\bar x_2^{1-\alpha}\geq y$.

La contrainte étant saturée, on substitue et on maximise en $x_1$ seul :

$$\alpha p\,x_1^{\alpha-1}\bar x_2^{1-\alpha}=w_1 \qquad\Longrightarrow\qquad x_1=p^{1/(1-\alpha)}w_1^{1/(\alpha-1)}\alpha^{1/(1-\alpha)}\bar x_2$$

$$\pi=p^{1/(1-\alpha)}w_1^{\alpha/(\alpha-1)}\alpha^{\alpha/(1-\alpha)}(1-\alpha)\,\bar x_2-\bar w_2\bar x_2$$

Par Hotelling, $y=\partial\pi/\partial p$, et l'on vérifie $\partial y/\partial p>0$ .

</details>

<details class="details--riche">
<summary>

**26. Énoncer et démontrer la règle de fermeture.**

</summary>

Deux options :

| Option | Profit |
|---|---|
| produire $y^1$ | $\pi^1=py^1-tvc(y^1)-tfc$ |
| fermer | $\pi^0=-tfc<0$ |

Produire seulement si $\pi^1-\pi^0\geq0$, c'est-à-dire $py^1-tvc(y^1)\geq0$, soit

$$\boxed{\;p\geq\frac{tvc(y^1)}{y^1}\equiv avc(y^1)\;}$$

</details>

<details class="details--riche">
<summary>

**27. Pourquoi le critère est-il $avc$ et non $atc$ ?**

</summary>

⚠️ Parce que **les coûts fixes sont payés dans les deux cas** — ils sont **irrécupérables** à court terme. Ils n'entrent donc pas dans la comparaison.

**La lecture économique :** tant que $p\geq avc$, chaque unité produite **contribue positivement** au paiement des coûts fixes. Fermer reviendrait à renoncer à cette contribution.

</details>

<details class="details--riche">
<summary>

**28. Donner la description complète du choix d'output à court terme.**

</summary>

> *« **Si la firme produit une quantité positive**, elle produira une quantité où **le prix égale le coût marginal** (et le coût marginal est **non décroissant**) et où **le prix n'est pas inférieur au coût variable moyen**. **Si le prix est inférieur au coût variable moyen** là où prix égale coût marginal, **la firme fermera**. »*

$$\begin{cases} y^* \text{ tel que } p=mc(y^*), \ mc \text{ non décroissante} & \text{si } p\geq avc(y^*)\\ y=0 & \text{si } p<avc(y^*) \end{cases}$$

</details>

<details class="details--riche">
<summary>

**29. Quels sont tous les points de départ équivalents pour la théorie ?**

</summary>

| Point de départ | Chapitre / théorème |
|---|---|
| $u(x)$ ou $\succsim$ | 1 |
| $e(p,u)$ | thm 2.1-2.2 |
| $v(p,y)$ | thm 2.3 |
| $x(p,y)$ | thm 2.6 |
| $f(x)$ | 3 |
| $c(w,y)$ | thm 3.5 |
| $x(w,y)$ | thm 3.6 |
| $\pi(p,w)$ | Diewert (1974), exercice 3.53 |

> *« L'analyste peut donc choisir de commencer **soit** par une spécification de la technologie, **soit** par une spécification de la fonction de profit pertinente. »*

</details>

<details class="details--riche">
<summary>

**30. Résumer le contraste $e$ / $c$ / $\pi$ en trois lignes.**

</summary>

| Fonction | Type | Courbure en prix | Lemme | Hessienne |
|---|---|---|---|---|
| $e(p,u)$, $c(w,y)$ | valeur **minimale** | **concave** | Shephard, signe $+$ | semi-déf. **négative** |
| $v(p,y)$ | valeur **maximale** | **quasiconvexe** | Roy (rapport, signe $-$) | — |
| $\pi(p,w)$ | valeur **maximale** | **CONVEXE** | Hotelling, signe $-$ sur les inputs | semi-déf. **POSITIVE** |

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le principe de dualité en production ? | Partir de $c$ et **récupérer** $f$ — si $f$ était quasiconcave, on la retrouve **exactement** |
| Sinon, qu'obtient-on ? | Sa **« concavification »** — comme au §2.1.2 |
| L'enjeu appliqué du thm 3.5 ? | Estimer $c$ sur **données de marché**, puis récupérer $f$ — plus de données d'ingénierie |
| La formule du théorème 3.5 ? | $f(x)=\max\{y\geq0 \mid w\cdot x\geq c(w,y)\ \forall w\gg0\}$ |
| Quels théorèmes le thm 3.5 fusionne-t-il ? | Les analogues de **2.1 et 2.2** |
| Les trois conditions du théorème 3.6 ? | Homogénéité degré 0 · matrice **symétrique et SDN** · $w\cdot x(w,y)$ **croissante en $y$** |
| Différence avec le thm 2.6 ? | L'**homogénéité** y est une condition **séparée** (pas d'équivalent du budget) |
| Pourquoi la firme est-elle preneuse de prix ? | Vendre plus cher : **aucune vente** · moins cher : **aucun intérêt** |
| Le problème (3.6) ? | $\max py-w\cdot x$ s.c. $f(x)\geq y$ |
| Le problème (3.7) ? | $\max_x \ p\,f(x)-w\cdot x$ — **sans contrainte** |
| La condition du premier ordre ? | $p\,\dfrac{\partial f}{\partial x_i}=w_i$ |
| Le nom du membre de gauche ? | Le **produit marginal en valeur** de l'input $i$ |
| Que donne la division de deux CPO ? | $\text{TMST}_{ij}=w_i/w_j$ — **la condition (3.2)** de minimisation du coût |
| La voie en deux temps ? | $\max_y \ py-c(w,y)$ ⟹ $p=\dfrac{dc}{dy}$ |
| La condition du second ordre ? | Le **coût marginal doit être non décroissant** |
| Pourquoi « $p=mc$ » ne suffit-il pas ? | La droite $p$ coupe $mc$ en **deux** points, dont un **minimum** |
| $x(w,y)$ vs $x(p,w)$ ? | **Conditionnelle** à $y$ vs $y$ **choisi optimalement** |
| Le lien entre les deux ? | $x(p,w)=x\big(w,y(p,w)\big)$ |
| La définition de $\pi(p,w)$ ? | $\max py-w\cdot x$ s.c. $f(x)\geq y$ — fonction de valeur **maximale** |
| Rendements croissants ⟹ ? | **Le profit maximal n'existe pas** |
| L'argument ? | $p\,f(tx')-w\cdot tx'>p\,f(x')-w\cdot x'$ pour tout $t>1$ |
| Où sert $\pi'\geq0$ dans cet argument ? | À obtenir $t\pi'\geq\pi'$ — sans quoi l'inégalité s'inverse |
| Rendements constants ⟹ ? | $\pi_{\max}=0$ possible, mais **échelle indéterminée** |
| Les cinq propriétés de $\pi$ ? | Croissante en $p$ · décroissante en $w$ · **homogène degré 1** · **CONVEXE** · différentiable |
| Courbure de $\pi$ vs celle de $e$ et $c$ ? | $\pi$ **convexe** · $e$ et $c$ **concaves** |
| Le lemme de Hotelling, offre ? | $y(p,w)=\dfrac{\partial\pi}{\partial p}$ |
| Le lemme de Hotelling, demandes ? | $x_i(p,w)=-\dfrac{\partial\pi}{\partial w_i}$ — **signe moins** |
| La règle générale des signes ? | Celui avec lequel le prix **entre dans l'objectif** |
| La preuve de la convexité de $\pi$ ? | Pondérer **deux inégalités d'optimalité** et additionner |
| L'intuition économique ? | Le **réajustement** du plan augmente le profit **au-dessus** de la ligne droite |
| Théorème 3.8, point 1 ? | $y$ et $x$ **homogènes de degré zéro** en $(p,w)$ |
| Théorème 3.8, point 2 ? | $\dfrac{\partial y}{\partial p}\geq0$ et $\dfrac{\partial x_i}{\partial w_i}\leq0$ |
| Théorème 3.8, point 3 ? | Matrice **symétrique** et **semi-définie POSITIVE** |
| D'où vient « positive » ? | La matrice **est** la hessienne de $\pi$, qui est **convexe** |
| L'avertissement du livre sur cette matrice ? | *« Notez le **signe** de chaque terme impliquant une demande de facteurs »* |
| Pourquoi les signes sont-ils inconditionnels ici ? | Il n'y a **pas d'effet de revenu** chez la firme |
| Domaine de validité de l'exemple 3.5 ? | $\beta<1$ — rendements **décroissants** |
| Si $\beta=1$ ? | La fonction de profit est **indéfinie** |
| Si $\beta>1$ ? | Les CPO donnent un **MINIMUM** local de profit |
| Pourquoi le court terme restaure-t-il l'existence ? | Fixer un facteur **borne** la firme et abaisse le degré d'homogénéité |
| L'exemple 3.6 en une ligne ? | Cobb-Douglas à rendements **constants** ⟹ profit de court terme **bien défini** car $\alpha<1$ |
| Quelle propriété ne survit pas au court terme ? | L'**homogénéité en prix des facteurs** ($\bar w\cdot\bar x$ n'est pas échelonné) |
| La coquille du théorème 3.9 ? | Il renvoie au « théorème **5.8** » — lire **3.8** |
| Profit si la firme ferme ? | $\pi^0=-tfc<0$ — les coûts fixes restent dus |
| Le critère de production ? | $py^1-tvc(y^1)\geq0$, soit $p\geq avc(y^1)$ |
| Pourquoi $avc$ et non $atc$ ? | Les **coûts fixes sont payés dans les deux cas** |
| La lecture économique de ce critère ? | Chaque unité produite **contribue** au paiement des coûts fixes |
| La description complète du choix de court terme ? | $p=mc$ (non décroissante) **et** $p\geq avc$ ; sinon **fermer** |
| Combien de points de départ équivalents la théorie admet-elle ? | **Huit** : $u$, $e$, $v$, $x(p,y)$, $f$, $c$, $x(w,y)$, $\pi$ |
| La référence pour la dualité du profit ? | **Diewert (1974)** · exercice 3.53 |
