# Fiche 507 — La firme : production, substitution et coût

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 3 « Theory of the Firm », §3.1 « Primitive Notions », §3.2 « Production » et §3.3 « Cost » (p. 125-143) |
| **Difficulté** | Intermédiaire — formellement jumeau du chapitre 1, avec un vocabulaire neuf |
| **Temps d'étude estimé** | 130 min |
| **Prérequis** | Fiches 500 à 504 (l'analogie est exacte : $f\leftrightarrow u$, $c\leftrightarrow e$, $x(w,y)\leftrightarrow x^h(p,u)$) · fonctions homogènes et théorème d'Euler (A2.6, A2.7) · théorème de l'enveloppe (A2.22) |
| **Concepts clés** | Ensemble des possibilités de production, fonction de production, hypothèse 3.1, produit marginal, isoquante, taux marginal de substitution technique, séparabilité faible et forte, élasticité de substitution, CES, Cobb-Douglas, Leontief, théorème de Shephard sur l'homogénéité, rendements d'échelle globaux et locaux, élasticité d'échelle, fonction de coût, demande conditionnelle de facteurs, lemme de Shephard, technologie homothétique, coût unitaire, coût de court terme, courbe enveloppe |
| **Poids à l'examen** | L'**hypothèse 3.1** et l'interprétation de la stricte quasiconcavité · le **TMST** et sa parenté avec le TMS · l'**élasticité de substitution** et le calcul CES · le **théorème 3.1** (homogène de degré $\alpha\leq1$ ⟹ concave) · les **rendements d'échelle** globaux et locaux · les **7 propriétés du coût** (jumelles du thm 1.7) · le **théorème 3.4** (technologie homothétique) · l'**enveloppe** des coûts de court terme. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE 3 (premiere moitie) : la firme, sa TECHNOLOGIE et son COUT

  L'ANALOGIE AVEC LE CHAPITRE 1  --  a garder sous les yeux en permanence

     CONSOMMATEUR                        FIRME
     -----------------------------       -----------------------------
     u(x)   fonction d'utilite           f(x)   fonction de production
     hypothese 1.2                       hypothese 3.1
     courbe d'indifference               ISOQUANTE  Q(y)
     TMS_ij = (du/dxi)/(du/dxj)          TMST_ij = (df/dxi)/(df/dxj)
     e(p,u)  fonction de DEPENSE         c(w,y)  fonction de COUT
     x^h(p,u) demande HICKSIENNE         x(w,y)  demande CONDITIONNELLE
     lemme de Shephard                   lemme de Shephard (IDENTIQUE)

     « Mathematiquement, les deux fonctions sont IDENTIQUES. »

  §3.1  POURQUOI LE PROFIT ?
     objectif toujours le meme : MAXIMISER LE PROFIT
     quatre arguments : empirique · simplicite · les alternatives sont des
     TACTIQUES de court terme · les FORCES DE MARCHE (remplacer les dirigeants,
     racheter la firme) y contraignent meme les proprietaires reticents
     distinguer toujours l'OBJECTIF (invariant) des CONTRAINTES (variables)

  §3.2  LA TECHNOLOGIE
     le plus general : ENSEMBLE DES POSSIBILITES DE PRODUCTION Y inclus dans R^m
        convention : yi < 0 si la ressource i est CONSOMMEE, yi > 0 si PRODUITE
     un seul output : FONCTION DE PRODUCTION  y = f(x),  f : R^n_+ -> R_+

     HYPOTHESE 3.1   f continue, STRICTEMENT CROISSANTE, STRICTEMENT
                     QUASICONCAVE,  et  f(0) = 0

     produit marginal   MPi(x) = df/dxi
     ISOQUANTE          Q(y) = { x >= 0 | f(x) = y }
     TMST               TMST_ij(x) = (df/dxi) / (df/dxj)

     SEPARABILITE (def. 3.1)
        FAIBLE  : le TMST dans un groupe ne depend pas des autres groupes
        FORTE   : le TMST entre DEUX groupes ne depend d'aucun autre

     ELASTICITE DE SUBSTITUTION (def. 3.2)
        sigma_ij = variation % du rapport xj/xi pour 1 % de variation du TMST
        sigma -> infini : substituts PARFAITS (isoquantes lineaires)
        sigma = 0       : proportions FIXES (isoquantes en L)

     exemple 3.1  CES  y = (x1^rho + x2^rho)^(1/rho)  ->  sigma = 1/(1-rho)
        rho -> 1     : lineaire  (sigma infini)
        rho -> 0     : Cobb-Douglas  (sigma = 1)
        rho -> -inf  : Leontief  (sigma = 0)

     THEOREME 3.1 (Shephard)  f homogene de degre alpha dans (0,1]  ==>  f CONCAVE

  §3.2.1  RENDEMENTS
     a PROPORTIONS variables : on bouge HORIZONTALEMENT dans la carte
     d'ECHELLE               : on bouge le long d'un RAYON

     DEF. 3.3  rendements GLOBAUX
        constants   f(tx) = t f(x)   pour tout t > 0
        croissants  f(tx) > t f(x)   pour t > 1
        decroissants f(tx) < t f(x)  pour t > 1

     DEF. 3.4  rendements LOCAUX -- elasticite d'echelle
        mu(x) = somme_i fi(x) xi / f(x) = somme_i mu_i(x)
        = 1 constants · > 1 croissants · < 1 decroissants

  §3.3  LE COUT
     hypothese : la firme est PRENEUSE DE PRIX sur ses marches de FACTEURS

     DEF. 3.5   c(w,y) = min w . x  sous contrainte  f(x) >= y
                x(w,y) = DEMANDE CONDITIONNELLE de facteurs

     condition de tangence (3.2)  TMST_ij = wi / wj

     THEOREME 3.2  les SEPT proprietes de c(w,y) -- identiques au theoreme 1.7
     THEOREME 3.3  x(w,y) homogene de degre 0 ; matrice de substitution
                   SYMETRIQUE et SEMI-DEFINIE NEGATIVE
     THEOREME 3.4  technologie HOMOTHETIQUE
                   c(w,y) = h(y) c(w,1)     et    x(w,y) = h(y) x(w,1)
                   homogene de degre alpha : h(y) = y^(1/alpha)

     COURT TERME (def. 3.6)   sc(w,wbar,y;xbar) -- les facteurs fixes sont
     des PARAMETRES, pas des variables de choix
        => sc >= c TOUJOURS
        => egalite pour le niveau d'output dont xbar est l'optimum de long terme
        => memes PENTES en ce point (theoreme de l'enveloppe)
        ==> LE COUT DE LONG TERME EST L'ENVELOPPE INFERIEURE des couts
            de court terme
```

> **L'avertissement du livre, dès la première ligne du chapitre.** *« Vous verrez que nous pouvons maintenant avancer assez vite dans une grande partie de ce matériau parce qu'il y a **beaucoup de similarités formelles entre la théorie du producteur et la théorie du consommateur** que nous venons d'achever. »*

> ⚠️ **Note de transcription — identique aux fiches 500-506.** Le PDF n'exporte pas $\succsim$, $\gg$, $\sum$ ; il rend l'inégalité vectorielle $\geq$ comme un « + » et $\nabla$ comme un « + ». Ces symboles sont rétablis depuis la prose et les équations voisines.

## 🟠 Concept 1 — Qu'est-ce qu'une firme, et pourquoi le profit ? (§3.1)

### 1.1 La définition minimale

> *« Au plus simple, une **firme est une entité créée par des individus dans un certain but**. Cette entité acquerra typiquement des **inputs** et les combinera pour produire de l'**output**. Les inputs sont achetés sur des marchés de facteurs et ces dépenses sont les **coûts** de la firme. L'output est vendu sur des marchés de produits et la firme en tire des **recettes**. »*

### 1.2 Pourquoi la maximisation du profit — les quatre arguments

> *« La **maximisation du profit** est la réponse la plus commune qu'un économiste donnera, et elle est éminemment raisonnable. Le profit — la différence entre les recettes que la firme tire de la vente de son output et les dépenses qu'elle fait en achetant ses inputs — est un **revenu pour les propriétaires** de la firme. Ces gens sont aussi des consommateurs. »*

Le livre reconnaît d'abord les alternatives — *« maximisation des ventes, de la part de marché, ou même du prestige »* — puis donne **quatre raisons** de leur préférer le profit :

| # | Argument | Contenu |
|---|---|---|
| 1 | **empirique** | *« supposer que les firmes maximisent le profit mène à des prédictions du comportement des firmes qui sont **maintes fois confirmées par les faits** »* |
| 2 | **théorique — simplicité** | *« la vertu de la simplicité et de la **cohérence avec l'hypothèse de maximisation d'utilité** du côté des consommateurs »* |
| 3 | **hiérarchie des objectifs** | *« beaucoup d'hypothèses alternatives, comme la maximisation des ventes ou de la part de marché, peuvent être mieux vues comme des **tactiques de court terme dans une stratégie de long terme de maximisation du profit** »* |
| 4 | **forces de marché** | voir ci-dessous |

**Le quatrième argument, développé — c'est le plus intéressant :**

> *« Il y a des **forces de marché identifiables qui contraignent la firme vers la maximisation du profit**, même si ses propriétaires ou dirigeants n'y sont pas eux-mêmes intrinsèquement enclins. Supposons qu'une firme ne maximise pas le profit. Alors, **si la faute revient aux dirigeants**, et si au moins une majorité de travail des propriétaires sont des consommateurs non satiés, ces propriétaires ont un **intérêt commun clair à se débarrasser de cette direction** et à la remplacer par une direction maximisatrice de profit. **Si la faute revient aux propriétaires**, alors il y a une incitation évidente pour tout entrepreneur non satié extérieur à la firme à **l'acquérir et à changer ses pratiques**. »*

### 1.3 La distinction méthodologique à retenir

> *« Une pensée claire sur le comportement de la firme dépendra de la **distinction soigneuse entre l'objectif de la firme, qui reste toujours le même**, et ses **contraintes, qui sont variées et dépendent de réalités de marché hors de son contrôle**. »*

Les trois familles de contraintes, dans l'ordre où le livre les traitera :

| Contrainte | Où elle est traitée |
|---|---|
| ce qui est **technologiquement possible** | §3.2 (cette fiche) |
| les conditions sur ses **marchés de facteurs** | §3.3 (cette fiche) |
| les conditions sur son **marché de produit** | §3.5 (fiche 508) |

## 🔴 Concept 2 — La technologie (§3.2)

### 2.1 L'ensemble des possibilités de production

> *« La production est le processus de **transformation d'inputs en outputs**. La réalité fondamentale à laquelle les firmes doivent se confronter dans ce processus est la **faisabilité technologique**. »*

**La représentation la plus générale.** La firme a un **ensemble des possibilités de production** $Y\subset\mathbb{R}^m$, où chaque vecteur $y=(y_1,\dots,y_m)\in Y$ est un **plan de production**.

> **La convention de signe, à retenir.**
>
> $$\boxed{\;y_i<0 \ \text{ si la ressource } i \text{ est CONSOMMÉE} \qquad y_i>0 \ \text{ si elle est PRODUITE}\;}$$

> *« L'ensemble des possibilités de production est de loin la manière la plus générale de caractériser la technologie parce qu'il permet **de multiples inputs ET de multiples outputs**. »*

### 2.2 La fonction de production

Quand il n'y a **qu'un seul output** :

| Notation | Signification |
|---|---|
| $y$ | la quantité d'output |
| $x=(x_1,\dots,x_n)$ | le vecteur des inputs, $x\geq0$ |
| $y=f(x)$ | *« $y$ unités d'output (**et pas plus**) peuvent être produites avec le vecteur $x$ »* |

$$f:\mathbb{R}^n_+ \longrightarrow \mathbb{R}_+$$

### 2.3 L'hypothèse 3.1 — le jumeau de l'hypothèse 1.2

> **ASSUMPTION 3.1 — Properties of the Production Function.** The production function $f:\mathbb{R}^n_+\to\mathbb{R}_+$ is **continuous**, **strictly increasing**, and **strictly quasiconcave** on $\mathbb{R}^n_+$, and $f(0)=0$.

*(Le livre note en bas de page : « Comparez ceci à l'hypothèse 1.2 du chapitre 1. »)*

**Le commentaire propriété par propriété :**

| Propriété | Justification du livre |
|---|---|
| **continuité** | *« assure que de petits changements du vecteur d'inputs mènent à de petits changements de la quantité produite »* |
| **stricte croissance** | *« assure qu'employer strictement plus de **chaque** input donne strictement plus d'output »* |
| **stricte quasiconcavité** | *« supposée largement pour des raisons de **simplicité** »* — voir l'interprétation ci-dessous |
| $f(0)=0$ | *« une quantité positive d'output requiert des quantités positives de **certains** inputs »* |

**L'interprétation de la stricte quasiconcavité — un passage à connaître :**

> *« Une interprétation est que la stricte quasiconcavité implique la présence d'**au moins une certaine complémentarité** dans la production. Intuitivement, deux inputs — travail et capital, disons — sont dans une certaine mesure complémentaires si **très peu de production peut avoir lieu quand l'un des inputs est faible, même si l'autre est élevé**. En ce sens, **les deux inputs ensemble sont importants** pour la production. Dans une telle situation, la **moyenne** de deux vecteurs extrêmes — l'un à beaucoup de travail et peu de capital, l'autre à peu de travail et beaucoup de capital — produira strictement plus d'output qu'au moins l'un des deux extrêmes, et peut-être même les deux. »*

> ⚠️ **Comme au chapitre 1, la stricte quasiconcavité est une commodité, pas une nécessité.** *« Nous pourrions nous en passer ici sans grand changement dans les résultats que nous présenterons. »* Elle servira surtout à garantir l'**unicité** de la demande conditionnelle de facteurs (§7.2).

### 2.4 Produit marginal et isoquante

**Le produit marginal.**

$$\boxed{\;MP_i(x)\equiv\frac{\partial f(x)}{\partial x_i}\;}$$

> *« Si $f$ est strictement croissante et partout continûment différentiable, alors $\partial f(x)/\partial x_i>0$ pour **"presque tous"** les vecteurs d'inputs. Nous supposerons souvent, pour simplifier, que l'inégalité stricte tient toujours. »*

*(C'est exactement la même précaution qu'au §5.2 de la fiche 500 pour l'utilité marginale, avec le même contre-exemple implicite.)*

**L'isoquante.**

$$\boxed{\;Q(y)\equiv\{x\geq0 \mid f(x)=y\}\;}$$

> *« Une isoquante est donc juste un **ensemble de niveau** de $f$. […] Pour un vecteur $x$, l'isoquante passant par $x$ est l'ensemble des vecteurs produisant le même output que $x$, à savoir $Q\big(f(x)\big)$. »*

### 2.5 Le taux marginal de substitution technique

> *« Un analogue du taux marginal de substitution en théorie du consommateur est le **taux marginal de substitution technique (TMST)** en théorie du producteur. Il mesure **le taux auquel un input peut être substitué à un autre sans changer la quantité produite**. »*

$$\boxed{\;\text{TMST}_{ij}(x)=\frac{\partial f(x)/\partial x_i}{\partial f(x)/\partial x_j}\;}$$

> *« Dans le cas à deux inputs (Fig. 3.1), $\text{TMST}_{12}(x^1)$ est la **valeur absolue de la pente de l'isoquante** passant par $x^1$, au point $x^1$. »*

> **La correspondance à retenir.**
>
> | Consommateur | Producteur |
> |---|---|
> | $\text{TMS}_{ij}(x)=\dfrac{\partial u/\partial x_i}{\partial u/\partial x_j}$ | $\text{TMST}_{ij}(x)=\dfrac{\partial f/\partial x_i}{\partial f/\partial x_j}$ |
> | pente de la courbe d'**indifférence** | pente de l'**isoquante** |
> | ce que le consommateur est **prêt** à céder | ce que la technologie **permet** de céder |
>
> ⚠️ **Même convention d'indices que pour le TMS** (fiche 500, §5.3) : le **premier indice** est au **numérateur**. Vérifiez-le systématiquement.

### 2.6 La séparabilité

> *« En général, le TMST entre deux inputs quelconques dépend des quantités de **tous** les inputs employés. Cependant, il est assez commun — particulièrement en travail empirique — de supposer que les inputs peuvent être classés en un **nombre relativement petit de types**, le degré de substituabilité entre ceux d'un même type différant systématiquement du degré de substituabilité entre ceux de types différents. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 3.1 — Separable Production Functions.</span>

Soit $N=\{1,\dots,n\}$ l'ensemble des inputs, partitionné en $S>1$ sous-ensembles mutuellement exclusifs et exhaustifs $N_1,\dots,N_S$. La fonction de production est

**faiblement séparable** si le TMST entre deux inputs **du même groupe** est indépendant des inputs des autres groupes :

$$\frac{\partial\big(f_i(x)/f_j(x)\big)}{\partial x_k}=0 \qquad \text{pour tous } i,j\in N_s \text{ et } k\notin N_s;$$

**fortement séparable** (quand $S>2$) si le TMST entre deux inputs de **deux groupes quelconques**, y compris du même groupe, est indépendant de tous les inputs extérieurs à ces deux groupes :

$$\frac{\partial\big(f_i(x)/f_j(x)\big)}{\partial x_k}=0 \qquad \text{pour } i\in N_s,\ j\in N_t,\ k\notin N_s\cup N_t.$$

</div>

> ⚠️ **La différence tient à un seul mot : où vivent $i$ et $j$.** — **Faible** : $i$ et $j$ dans **le même** groupe $N_s$ ; $k$ hors de $N_s$. — **Forte** : $i\in N_s$, $j\in N_t$ dans **deux groupes quelconques** ; $k$ hors de $N_s\cup N_t$.
>
> La séparabilité forte est donc **plus exigeante** : elle contraint aussi les TMST **inter-groupes**. Notez qu'elle n'a de sens que si $S>2$ — avec deux groupes, « hors de $N_s\cup N_t$ » serait vide.

## 🔴 Concept 3 — L'élasticité de substitution

### 3.1 Pourquoi une élasticité

> *« Le TMST est une mesure **locale** de substituabilité entre inputs pour un niveau donné de production. Les économistes, cependant, ont un **penchant pour mesurer ces choses avec des élasticités sans unité**. Bien qu'il y ait plusieurs mesures de ce genre, de loin la plus commune est l'**élasticité de substitution** $\sigma$. »*

> **La définition en mots.** *« Toutes choses égales par ailleurs (autres inputs et niveau d'output constants), l'élasticité de substitution de l'input $j$ pour l'input $i$ est définie comme le **pourcentage de variation des proportions d'inputs $x_j/x_i$ associé à une variation de 1 % du TMST entre eux**. »*

### 3.2 La définition formelle

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 3.2 — The Elasticity of Substitution.</span>

Pour une fonction de production $f(x)$, l'élasticité de substitution de l'input $j$ pour l'input $i$ au point $x^0\in\mathbb{R}^n_{++}$ est

$$\boxed{\;\sigma_{ij}(x^0)\equiv\left(\frac{d\ln \text{TMST}_{ij}\big(x(r)\big)}{d\ln r}\right)^{-1}\Bigg|_{r=x_j^0/x_i^0}\;}$$

où $x(r)$ est **l'unique** vecteur d'inputs $x=(x_1,\dots,x_n)$ tel que (i) $x_j/x_i=r$, (ii) $x_k=x_k^0$ pour $k\neq i,j$, et (iii) $f(x)=f(x^0)$.

</div>

*(Note 2 du livre : « Que $x(r)$ existe et soit unique découle de l'hypothèse 3.1. »)*

> ⚠️ **Trois pièges dans cette définition.**
>
> 1. C'est un **inverse** : la dérivée logarithmique est celle du TMST **par rapport au ratio**, et l'élasticité est son inverse. Une élasticité **grande** correspond donc à un TMST **peu sensible** au ratio.
> 2. Les trois conditions (i)-(iii) disent qu'on se déplace **le long d'une isoquante**, à **autres inputs fixés**, en ne faisant varier que le rapport $x_j/x_i$.
> 3. Le point d'évaluation est $r=x_j^0/x_i^0$ — le rapport **au point de départ**.

### 3.3 L'interprétation géométrique

> *« $\sigma_{ij}(x^0)$ est une mesure de la **courbure** de l'isoquante $i$-$j$ passant par $x^0$. Quand la fonction de production est quasiconcave, l'élasticité de substitution ne peut jamais être négative, donc $\sigma_{ij}\geq0$. En général, **plus elle est proche de zéro, plus la substitution est "difficile"** ; **plus elle est grande, plus la substitution est "facile"**. »*

**Les trois cas de la figure 3.2 :**

| Panneau | Isoquante | $\sigma$ | Interprétation |
|---|---|---|---|
| (a) | **droite** | $\sigma\to\infty$ | **substituabilité parfaite** |
| (b) | courbe intermédiaire | $0<\sigma<\infty$ | substituabilité imparfaite |
| (c) | **angle droit** (en L) | $\sigma=0$ | **proportions fixes**, substitution impossible |

> *« Plus $\sigma$ est proche de zéro, plus les isoquantes sont **en forme de L** ; plus $\sigma$ est grand, plus les isoquantes sont **plates**. »*

### 3.4 Exemple 3.1 — d'où vient le sigle CES

> *« Nous connaissons la fonction d'utilité CES de la théorie de la demande. Il est peut-être temps de voir **d'où vient ce nom**. »*

$$y=\big(x_1^\rho+x_2^\rho\big)^{1/\rho}, \qquad \rho<1,\ \rho\neq0$$

**Pas 1 — calculer le TMST.**

$$\frac{\partial f}{\partial x_i}=\big(x_1^\rho+x_2^\rho\big)^{(1/\rho)-1}x_i^{\rho-1} \qquad\Longrightarrow\qquad \text{TMST}_{12}(x_1,x_2)=\left(\frac{x_2}{x_1}\right)^{1-\rho}$$

> *« Ici, **le rapport des deux inputs détermine à lui seul le TMST**, quelle que soit la quantité produite. »*

**Pas 2 — dériver en logarithme.** En posant $r=x_2/x_1$ :

$$\frac{d\ln \text{TMST}_{12}\big(x(r)\big)}{d\ln r}=\frac{d\ln r^{1-\rho}}{d\ln r}=(1-\rho)\frac{d\ln r}{d\ln r}=1-\rho$$

**Pas 3 — inverser.**

$$\boxed{\;\sigma=\frac{1}{1-\rho}\;}$$

> *« C'est une **constante**. Cela explique les initiales **CES**, qui signifient *constant elasticity of substitution*. »*

### 3.5 Les cas limites et la famille générale

**La forme à $n$ inputs.**

$$y=\left(\sum_{i=1}^n \alpha_ix_i^\rho\right)^{1/\rho}, \qquad \sum_{i=1}^n\alpha_i=1$$

*« est une forme CES avec $\sigma_{ij}=\dfrac{1}{1-\rho}$ pour tous $i\neq j$. »*

| Limite | $\sigma$ | Forme obtenue | Isoquantes |
|---|---|---|---|
| $\rho\to1$ | $\to\infty$ | **linéaire** $\sum_i\alpha_ix_i$ | droites — Fig. 3.2(a) |
| $\rho\to0$ | $\to1$ | **Cobb-Douglas** $\prod_i x_i^{\alpha_i}$ | courbes convexes |
| $\rho\to-\infty$ | $\to0$ | **Leontief** $\min\{x_1,\dots,x_n\}$ | angles droits — Fig. 3.2(c) |

> **La remarque critique du livre.** *« Avec la forme CES, **le degré de substituabilité entre inputs est toujours le même**, quel que soit le niveau d'output ou les proportions d'inputs. C'est donc une caractérisation **quelque peu restrictive** de la technologie. En revanche, différentes valeurs du paramètre $\rho$ peuvent représenter des technologies à substituabilité **très différentes** (bien que partout constante). »*
>
> ⚠️ **Notez le parallèle exact avec la fiche 501.** Les trois mêmes cas limites y apparaissaient pour l'**utilité** CES : substituts parfaits, Cobb-Douglas, compléments parfaits. C'est la même famille de fonctions, lue tantôt comme utilité, tantôt comme technologie.

## 🔴 Concept 4 — Théorème 3.1 : homogénéité et concavité

### 4.1 L'énoncé

> *« Toutes les fonctions de production CES (y compris les cas limites de Cobb-Douglas et Leontief) sont membres de la classe des fonctions de production **linéairement homogènes**, et celles-ci sont importantes en travail théorique et appliqué. **L'homogénéité linéaire impose une grande structure supplémentaire** à la fonction de production. Entre autres choses, **les fonctions de production linéairement homogènes seront toujours des fonctions concaves**. »*

> **THEOREM 3.1 — (Shephard) Homogeneous Production Functions are Concave.** Soit $f(x)$ une fonction de production satisfaisant l'hypothèse 3.1 et homogène de degré $\alpha\in(0,1]$. Alors $f(x)$ est une fonction **concave** de $x$.

### 4.2 La preuve — le cas $\alpha=1$

Prenons $x^1\gg0$, $x^2\gg0$, et posons $y^1=f(x^1)$, $y^2=f(x^2)$.

> *« Alors $y^1,y^2>0$ parce que $f(0)=0$ et $f$ est strictement croissante. »*

**Pas 1 — normaliser.** Par homogénéité de degré un :

$$f\!\left(\frac{x^1}{y^1}\right)=f\!\left(\frac{x^2}{y^2}\right)=1$$

**Pas 2 — appliquer la quasiconcavité.**

$$f\!\left(t\,\frac{x^1}{y^1}+(1-t)\,\frac{x^2}{y^2}\right)\geq1 \qquad \forall\,t\in[0,1] \tag{P.1}$$

**Pas 3 — le choix décisif de $t$.** Poser

$$\boxed{\;t^*=\frac{y^1}{y^1+y^2} \qquad\qquad 1-t^*=\frac{y^2}{y^1+y^2}\;}$$

Alors les deux dénominateurs $y^1$ et $y^2$ **se simplifient** et (P.1) devient

$$f\!\left(\frac{x^1}{y^1+y^2}+\frac{x^2}{y^1+y^2}\right)\geq1 \tag{P.2}$$

**Pas 4 — dé-normaliser.** En réinvoquant l'homogénéité linéaire (multiplier l'argument par $y^1+y^2$) :

$$\boxed{\;f(x^1+x^2)\geq y^1+y^2=f(x^1)+f(x^2)\;} \tag{P.3}$$

> *« Ainsi (P.3) tient pour tous $x^1,x^2\gg0$. Mais la **continuité** de $f$ implique alors que (P.3) tient pour tous $x^1,x^2\geq0$. »*

**Pas 5 — de la super-additivité à la concavité.** Pour $x^1,x^2\geq0$ et $t\in[0,1]$, l'homogénéité linéaire donne

$$f(tx^1)=t\,f(x^1) \quad \text{(P.4)} \qquad\qquad f\big((1-t)x^2\big)=(1-t)\,f(x^2) \quad \text{(P.5)}$$

En appliquant (P.3) aux vecteurs $tx^1$ et $(1-t)x^2$ puis (P.4)-(P.5) :

$$f\big(tx^1+(1-t)x^2\big)\geq t\,f(x^1)+(1-t)\,f(x^2) \qquad$$

### 4.3 L'extension à $\alpha\in(0,1]$

> *« Supposons maintenant que $f$ soit homogène de degré $\alpha\in(0,1]$. Alors $f^{1/\alpha}$ est homogène de **degré un** et satisfait l'hypothèse 3.1. Donc, par ce que nous venons de prouver, $f^{1/\alpha}$ est **concave**. Mais alors $f=\big(f^{1/\alpha}\big)^{\alpha}$ est concave **puisque $\alpha\leq1$**. »* $\blacksquare$

<details class="details--riche">
<summary>

**Les deux vérifications que le livre laisse implicites**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours).</span>

</div>

**1. Pourquoi $f^{1/\alpha}$ est-elle homogène de degré un ?**

$$\big(f(tx)\big)^{1/\alpha}=\big(t^\alpha f(x)\big)^{1/\alpha}=t\,\big(f(x)\big)^{1/\alpha} \quad$$

Elle satisfait aussi l'hypothèse 3.1 : $g\mapsto g^{1/\alpha}$ est strictement croissante sur $\mathbb{R}_+$ (car $\alpha>0$), donc la composée reste continue, strictement croissante et strictement quasiconcave, et vaut $0$ en $0$.

**2. Pourquoi $\big(f^{1/\alpha}\big)^\alpha$ est-elle concave quand $\alpha\leq1$ ?**

Posons $g=f^{1/\alpha}$, concave, et $\varphi(t)=t^\alpha$. Alors $f=\varphi\circ g$. Or $\varphi$ est **croissante et concave** sur $\mathbb{R}_+$ lorsque $0<\alpha\leq1$ :

$$\varphi'(t)=\alpha t^{\alpha-1}>0 \qquad \varphi''(t)=\alpha(\alpha-1)t^{\alpha-2}\leq0 \ \text{ car } \alpha\leq1$$

Et **une fonction croissante concave d'une fonction concave est concave** : pour $t\in[0,1]$,

$$\varphi\big(g(tx^1+(1-t)x^2)\big) \ \underset{g \text{ concave},\ \varphi \text{ croissante}}{\geq} \ \varphi\big(tg(x^1)+(1-t)g(x^2)\big) \ \underset{\varphi \text{ concave}}{\geq} \ t\varphi\big(g(x^1)\big)+(1-t)\varphi\big(g(x^2)\big) \quad$$

> ⚠️ **La condition $\alpha\leq1$ est essentielle.** Avec $\alpha>1$ — rendements d'échelle croissants — $\varphi(t)=t^\alpha$ est **convexe** et la seconde inégalité s'inverse. Une fonction de production homogène de degré $2$ n'est **pas** concave : penser à $f(x)=x^2$ à un input.
>
> **La lecture économique :** la concavité de $f$ correspond aux **rendements décroissants** ; on ne peut pas l'obtenir d'une technologie à rendements d'échelle croissants. Le théorème 3.1 dit que **quasiconcavité + rendements d'échelle non croissants ⟹ concavité**.

</details>

## 🟠 Concept 5 — Rendements à proportions variables et rendements d'échelle (§3.2.1)

### 5.1 La distinction — deux directions dans la carte des isoquantes

> *« Dans le **court terme**, la période pendant laquelle au moins un input est fixé, l'output ne peut varier qu'en changeant les quantités de certains inputs mais pas d'autres. […] Les **"rendements à proportions variables"** se réfèrent à la manière dont l'output répond dans cette situation. Dans le **long terme**, la firme est libre de faire varier tous les inputs, et classer les fonctions de production par leurs **"rendements d'échelle"** est une manière de décrire comment l'output répond dans cette situation. »*

**La lecture de la figure 3.3, à retenir :**

| Type de rendements | Direction du déplacement dans la carte |
|---|---|
| **à proportions variables** | **horizontale**, à $\bar x_2$ constant — on ne fait varier que $x_1$ |
| **d'échelle** | le long d'un **rayon** $OA$ — $x_1$ et $x_2$ varient ensemble, à $x_2/x_1=\alpha$ constant |

### 5.2 Les mesures locales à proportions variables

| Mesure | Définition |
|---|---|
| **produit marginal** | $MP_i(x)\equiv f_i(x)$ |
| **produit moyen** | $AP_i(x)\equiv f(x)/x_i$ |
| **élasticité d'output de l'input $i$** | $\mu_i(x)\equiv\dfrac{f_i(x)\,x_i}{f(x)}=\dfrac{MP_i(x)}{AP_i(x)}$ |

> *« $\mu_i$ mesure la réponse en pourcentage de l'output à une variation de 1 % de l'input $i$. Chacune de ces mesures est une mesure **locale**, définie en un point. »*

### 5.3 Les rendements d'échelle globaux

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 3.3 — (Global) Returns to Scale.</span>

Une fonction de production $f(x)$ a la propriété de rendements d'échelle (globalement)

1. **constants** si $f(tx)=t\,f(x)$ pour tout $t>0$ et tout $x$ ;
2. **croissants** si $f(tx)>t\,f(x)$ pour tout $t>1$ et tout $x$ ;
3. **décroissants** si $f(tx)<t\,f(x)$ pour tout $t>1$ et tout $x$.

</div>

> ⚠️ **Deux remarques du livre à ne pas manquer.**
>
> **(a)** *« Une fonction de production a des rendements **constants** si elle est une fonction **linéairement homogène**. »*
>
> **(b)** *« Notez **soigneusement**, cependant, que toute fonction de production homogène de degré **supérieur (inférieur) à un** doit avoir des rendements croissants (décroissants), **bien que la réciproque n'ait pas besoin de tenir**. »*
>
> Autrement dit : $\text{homogène de degré}>1 \Rightarrow \text{rendements croissants}$, mais **pas** l'inverse. Une technologie peut avoir des rendements croissants sans être homogène du tout.

> *« Notez que **beaucoup de fonctions de production satisfaisant l'hypothèse 3.1 ne tombent dans aucune** des trois catégories précédentes. Beaucoup de technologies exhibent des rendements croissants, constants et décroissants **sur certaines plages d'output seulement**. Il est donc utile d'avoir une mesure **locale** des rendements d'échelle. »*

### 5.4 Les rendements d'échelle locaux

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 3.4 — (Local) Returns to Scale.</span>

L'**élasticité d'échelle** au point $x$ est

$$\boxed{\;\mu(x)\equiv\lim_{t\to1}\frac{d\ln\big[f(tx)\big]}{d\ln(t)}=\frac{\displaystyle\sum_{i=1}^n f_i(x)\,x_i}{f(x)}\;}$$

Les rendements d'échelle sont localement **constants, croissants ou décroissants** selon que $\mu(x)$ est **égal à, supérieur à ou inférieur à un**.

</div>

**La relation-clé :**

$$\boxed{\;\mu(x)=\sum_{i=1}^n \mu_i(x)\;}$$

> **L'élasticité d'échelle est la SOMME des élasticités d'output des inputs.** C'est immédiat sur la définition : $\mu(x)=\dfrac{\sum_i f_ix_i}{f}=\sum_i\dfrac{f_ix_i}{f}=\sum_i\mu_i(x)$.
>
> ⚠️ **Le lien avec le théorème d'Euler.** Si $f$ est homogène de degré $\alpha$, Euler donne $\sum_i f_i(x)x_i=\alpha f(x)$, donc $\mu(x)=\alpha$ **partout**. L'élasticité d'échelle **est** le degré d'homogénéité — quand celui-ci existe.

### 5.5 Exemple 3.2 — une technologie à rendements variables

**La fonction.**

$$y=k\big(1+x_1^{-\alpha}x_2^{-\beta}\big)^{-1}, \qquad \alpha>0,\ \beta>0 \tag{E.1}$$

où *« $k$ est une **borne supérieure** sur le niveau d'output, de sorte que $0\leq y<k$ »*.

**Les élasticités d'output.**

$$\mu_1(x)=\alpha\big(1+x_1^{-\alpha}x_2^{-\beta}\big)^{-1}x_1^{-\alpha}x_2^{-\beta} \qquad \mu_2(x)=\beta\big(1+x_1^{-\alpha}x_2^{-\beta}\big)^{-1}x_1^{-\alpha}x_2^{-\beta}$$

*« chacune variant clairement avec **l'échelle et les proportions d'inputs** »*. Leur somme :

$$\mu(x)=(\alpha+\beta)\big(1+x_1^{-\alpha}x_2^{-\beta}\big)^{-1}x_1^{-\alpha}x_2^{-\beta}$$

**L'astuce du livre — réexprimer en fonction de $y$.**

> *« Des expressions **bien plus nettes** sont obtenues si l'on voit ces élasticités comme fonctions du **niveau d'output**. »*

De (E.1) on tire

$$x_1^{-\alpha}x_2^{-\beta}=\frac{k}{y}-1 \tag{E.2}$$

et en substituant :

$$\boxed{\;\mu_1(y)=\alpha\left(1-\frac{y}{k}\right) \qquad \mu_2(y)=\beta\left(1-\frac{y}{k}\right) \qquad \mu(y)=(\alpha+\beta)\left(1-\frac{y}{k}\right)\;}$$

<details class="details--riche">
<summary>

**Le détail du passage (E.1)-(E.2) vers les expressions en $y$**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre écrit seulement « en substituant de (E.1) et (E.2) ».</span>

</div>

Posons $z\equiv x_1^{-\alpha}x_2^{-\beta}$. Alors (E.1) s'écrit $y=\dfrac{k}{1+z}$ et (E.2) donne $z=\dfrac{k}{y}-1=\dfrac{k-y}{y}$.

L'expression de $\mu_1$ est $\mu_1=\alpha\,\dfrac{z}{1+z}$. Or

$$\frac{z}{1+z}=\frac{(k-y)/y}{1+(k-y)/y}=\frac{(k-y)/y}{k/y}=\frac{k-y}{k}=1-\frac{y}{k}$$

d'où $\mu_1(y)=\alpha\left(1-\dfrac{y}{k}\right)$ , et de même pour $\mu_2$ et $\mu$.

</details>

**La lecture du résultat.**

> *« Ici il est clair que **les rendements à chaque input, et les rendements d'échelle globaux, déclinent de façon monotone quand l'output augmente**. En $y=0$, $\mu(y)=(\alpha+\beta)>0$, et quand $y\to k$, $\mu(y)\to0$. »*

**La classification par plages d'output**, si $\alpha+\beta>1$ :

| Plage d'output | $\mu(y)$ | Rendements d'échelle |
|---|---|---|
| $0\leq y<k\big[1-\tfrac{1}{\alpha+\beta}\big]$ | $>1$ | **croissants** |
| $y=k\big[1-\tfrac{1}{\alpha+\beta}\big]$ | $=1$ | localement **constants** |
| $k\big[1-\tfrac{1}{\alpha+\beta}\big]<y<k$ | $<1$ | **décroissants** |

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que l'exemple illustre.</span>

C'est le profil des rendements que l'on enseigne en cours élémentaire — croissants puis décroissants — **obtenu ici d'une seule formule**, sans recollement de morceaux. La technologie est saturée en $y=k$ : plus on approche de la borne, plus il faut d'inputs pour gagner une unité.

⚠️ **Le seuil se lit directement de $\mu(y)=1$ :** $(\alpha+\beta)\big(1-\tfrac{y}{k}\big)=1 \Rightarrow \tfrac{y}{k}=1-\tfrac{1}{\alpha+\beta}$. Si $\alpha+\beta\leq1$, ce seuil est $\leq0$ et les rendements sont **décroissants partout**.

</div>

## 🔴 Concept 6 — La fonction de coût (§3.3)

### 6.1 Pourquoi minimiser le coût — un point valable pour TOUTES les firmes

> *« Si l'objet de la firme est de **maximiser le profit**, elle choisira nécessairement le plan de production **le moins coûteux** pour **chaque** niveau d'output. Notez que **ce sera vrai pour toutes les firmes** : monopoleurs, concurrents parfaits, ou n'importe quoi entre les deux. »*

> ⚠️ **C'est un point de méthode capital.** La minimisation du coût **ne présuppose pas la concurrence parfaite** sur le marché du produit. Elle découle de la seule maximisation du profit : quel que soit le niveau d'output finalement choisi, il vaut mieux le produire au moindre coût. C'est pourquoi le §3.3 précède le §3.5 — le coût est le socle commun à toutes les structures de marché.

### 6.2 L'hypothèse sur les marchés de facteurs

> *« La firme peut faire face à des **courbes d'offre croissantes** pour certains ou tous ses inputs. Alternativement, la firme peut être une force **petite et insignifiante** sur ses marchés de facteurs, et donc pouvoir embaucher autant ou aussi peu qu'elle veut sans affecter les prix de marché. Dans ce cas, nous disons qu'elle est **parfaitement concurrentielle sur ses marchés de facteurs**. »*

> *« **Nous supposerons partout que les firmes sont parfaitement concurrentielles sur leurs marchés de facteurs** et qu'elles font donc face à des **prix de facteurs fixes**. »*

Soit $w=(w_1,\dots,w_n)\geq0$ le vecteur des prix de facteurs.

### 6.3 La définition

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 3.5 — The Cost Function.</span>

La fonction de coût, définie pour tous prix de facteurs $w\gg0$ et tous niveaux d'output $y\in f(\mathbb{R}^n_+)$, est la **fonction de valeur minimale**

$$\boxed{\;c(w,y)\equiv\min_{x\in\mathbb{R}^n_+} \ w\cdot x \quad\text{s.c.}\quad f(x)\geq y\;}$$

Si $x(w,y)$ résout le problème, alors $c(w,y)=w\cdot x(w,y)$.

</div>

### 6.4 La résolution

**La contrainte est saturée.** *« Parce que $f$ est **strictement croissante**, la contrainte sera toujours active à la solution. »* Donc le problème équivaut à

$$\min_{x\in\mathbb{R}^n_+} \ w\cdot x \quad\text{s.c.}\quad y=f(x) \tag{3.1}$$

**Les conditions du premier ordre.** En supposant $x^*\gg0$, $f$ différentiable en $x^*$ et $\nabla f(x^*)\gg0$, le théorème de Lagrange donne un $\lambda^*\in\mathbb{R}$ tel que

$$w_i=\lambda^*\frac{\partial f(x^*)}{\partial x_i}, \qquad i=1,\dots,n$$

**La condition de tangence.** Comme $w_i>0$, on divise l'équation $i$ par l'équation $j$ :

$$\boxed{\;\frac{\partial f(x^*)/\partial x_i}{\partial f(x^*)/\partial x_j}=\frac{w_i}{w_j} \qquad\text{c'est-à-dire}\qquad \text{TMST}_{ij}(x^*)=\frac{w_i}{w_j}\;} \tag{3.2}$$

> *« Ainsi, **la minimisation du coût implique que le taux marginal de substitution technique entre deux inputs quelconques est égal au rapport de leurs prix**. »*

> **Le parallèle exact avec (1.11).** Chez le consommateur, la tangence était $\text{TMS}_{jk}=p_j/p_k$ ; ici c'est $\text{TMST}_{ij}=w_i/w_j$. **Même structure, même dérivation, même interprétation** : le taux d'échange que la **technologie** permet égale celui que le **marché** offre.

### 6.5 La demande conditionnelle de facteurs

> *« Parce que $w\gg0$ et que $f$ est **strictement quasiconcave**, la solution de (3.1) est **unique**. […] La solution $x(w,y)$ est appelée la **demande conditionnelle de facteurs** de la firme, parce qu'elle est **conditionnelle au niveau d'output $y$**, qui à ce stade est arbitraire et peut donc être ou ne pas être maximisateur de profit. »*

> ⚠️ **Le mot « conditionnelle » est le mot-clé.** $x(w,y)$ dit *« si vous voulez produire $y$, voici la façon la moins chère de le faire »*. Elle **ne dit pas** que $y$ est le bon niveau à produire — cette question est celle du §3.5 (fiche 508).
>
> **L'analogue exact chez le consommateur :** la demande **hicksienne** $x^h(p,u)$, qui dit *« si vous voulez atteindre $u$, voici la façon la moins chère »*, sans dire que $u$ est atteignable.

**La géométrie (Fig. 3.4).** *« Avec deux inputs, une solution intérieure correspond à un **point de tangence entre l'isoquante de niveau $y$ et une droite d'isocoût** de la forme $w\cdot x=\alpha$. »*

### 6.6 Exemple 3.3 — le coût de la technologie CES

**Le problème.**

$$\min_{x_1,x_2\geq0} \ w_1x_1+w_2x_2 \quad\text{s.c.}\quad \big(x_1^\rho+x_2^\rho\big)^{1/\rho}\geq y$$

**Les conditions du premier ordre, réduites :**

$$\frac{w_1}{w_2}=\left(\frac{x_1}{x_2}\right)^{\rho-1} \quad \text{(E.1)} \qquad\qquad y=\big(x_1^\rho+x_2^\rho\big)^{1/\rho} \quad \text{(E.2)}$$

> **Comparez avec l'exemple 1.1 (fiche 501).** Là on avait $\dfrac{x_1}{x_2}=\left(\dfrac{p_1}{p_2}\right)^{1/(\rho-1)}$ — **exactement la même relation**, écrite dans l'autre sens. Seule la **seconde** équation change : contrainte budgétaire là, contrainte de production ici.

**Les demandes conditionnelles.**

$$\boxed{\;x_i(w,y)=y\,w_i^{\,1/(\rho-1)}\big(w_1^{\,\rho/(\rho-1)}+w_2^{\,\rho/(\rho-1)}\big)^{-1/\rho}, \qquad i=1,2\;} \tag{E.3-E.4}$$

**La fonction de coût**, en substituant dans l'objectif :

$$\boxed{\;c(w,y)=y\,\big(w_1^{\,\rho/(\rho-1)}+w_2^{\,\rho/(\rho-1)}\big)^{(\rho-1)/\rho}\;}$$

> **Notez la forme : $c$ est LINÉAIRE en $y$.** Ce n'est pas un hasard — la CES est **homogène de degré un**, donc à rendements d'échelle constants, et le théorème 3.4(2) prédit exactement $c(w,y)=y^{1/1}c(w,1)=y\,c(w,1)$.

### 6.7 L'identité formelle avec la fonction de dépense

> *« Vous avez peut-être remarqué certaines similarités avec la théorie du consommateur. Ces similarités sont en fait **exactes** quand on compare la fonction de coût avec la fonction de dépense. »*

$$\text{Fonction de dépense :}\quad e(p,u)\equiv\min_{x\in\mathbb{R}^n_+} \ p\cdot x \quad\text{s.c.}\quad u(x)\geq u$$

$$\text{Fonction de coût :}\quad c(w,y)\equiv\min_{x\in\mathbb{R}^n_+} \ w\cdot x \quad\text{s.c.}\quad f(x)\geq y$$

> *« **Mathématiquement, les deux fonctions sont identiques.** Par conséquent, **pour chaque théorème que nous avons prouvé sur les fonctions de dépense, il y a un théorème équivalent pour les fonctions de coût**. Nous énoncerons ces théorèmes ici, mais **nous n'avons pas besoin de les prouver**. Leurs preuves sont identiques à celles données pour la fonction de dépense. »*

### 6.8 Théorème 3.2 — les sept propriétés du coût

> **THEOREM 3.2 — Properties of the Cost Function.** Si $f$ est **continue** et **strictement croissante**, alors $c(w,y)$ est
>
> 1. **nulle** quand $y=0$,
> 2. **continue** sur son domaine,
> 3. pour tout $w\gg0$, **strictement croissante et non bornée** supérieurement en $y$,
> 4. **croissante** en $w$,
> 5. **homogène de degré un** en $w$,
> 6. **concave** en $w$.
>
> De plus, si $f$ est **strictement quasiconcave** :
>
> 7. **Lemme de Shephard** : $c(w,y)$ est différentiable en $w$ en $(w^0,y^0)$ dès que $w^0\gg0$, et $$\boxed{\;\frac{\partial c(w^0,y^0)}{\partial w_i}=x_i(w^0,y^0), \qquad i=1,\dots,n\;}$$

> **Le dictionnaire complet avec le théorème 1.7 (fiche 502).**
>
> | Consommateur | Producteur |
> |---|---|
> | $e(p,u)$ nulle au plus bas niveau d'utilité | $c(w,y)$ nulle en $y=0$ |
> | str. croissante et non bornée en $u$ | str. croissante et non bornée en $y$ |
> | croissante, homogène de degré 1, **concave** en $p$ | idem en $w$ |
> | $\partial e/\partial p_i=x_i^h(p,u)$ | $\partial c/\partial w_i=x_i(w,y)$ |
>
> ⚠️ **Comme au théorème 1.7, seule la propriété 7 exige la stricte quasiconcavité** — elle a besoin de l'**unicité** de $x(w,y)$.

### 6.9 Exemple 3.4 — exploiter Shephard sur une forme Cobb-Douglas

**La donnée.** $c(w,y)=A\,w_1^\alpha w_2^\beta\,y$.

**Les demandes conditionnelles, par Shephard :**

$$x_1(w,y)=\frac{\partial c}{\partial w_1}=\alpha A w_1^{\alpha-1}w_2^\beta y=\frac{\alpha\,c(w,y)}{w_1} \tag{E.1}$$

$$x_2(w,y)=\frac{\partial c}{\partial w_2}=\beta A w_1^{\alpha}w_2^{\beta-1} y=\frac{\beta\,c(w,y)}{w_2} \tag{E.2}$$

**Le rapport des demandes.**

$$\boxed{\;\frac{x_1(w,y)}{x_2(w,y)}=\frac{\alpha}{\beta}\cdot\frac{w_2}{w_1}\;}$$

> *« Cela nous dit que **les proportions dans lesquelles une firme ayant cette fonction de coût utilisera ses inputs dépendent seulement des prix relatifs** des facteurs et sont **complètement indépendantes du niveau ou de l'échelle de production**. »*

**Les parts de facteurs.** En définissant $s_i\equiv\dfrac{w_ix_i(w,y)}{c(w,y)}$ :

$$s_1=\alpha \qquad\qquad s_2=\beta$$

> **Elles sont **constantes**.** C'est le pendant exact des parts budgétaires constantes de la Cobb-Douglas du consommateur (fiche 501, exercice 1.20).
>
> ⚠️ **Cet exemple part de $c$, pas de $f$.** C'est exactement ce que le §2.1 (fiche 504) autorisait : on peut spécifier la **fonction de coût** et en déduire tout le reste par différentiation, sans jamais écrire la fonction de production.

### 6.10 Théorème 3.3 — les propriétés des demandes conditionnelles

> **THEOREM 3.3 — Properties of Conditional Input Demands.** Supposons que la fonction de production satisfasse l'hypothèse 3.1 et que la fonction de coût associée soit deux fois continûment différentiable. Alors
>
> 1. $x(w,y)$ est **homogène de degré zéro** en $w$,
> 2. la **matrice de substitution** $$\sigma^*(w,y)\equiv\begin{pmatrix} \dfrac{\partial x_1(w,y)}{\partial w_1} & \cdots & \dfrac{\partial x_1(w,y)}{\partial w_n}\\[2mm] \vdots & \ddots & \vdots\\[2mm] \dfrac{\partial x_n(w,y)}{\partial w_1} & \cdots & \dfrac{\partial x_n(w,y)}{\partial w_n} \end{pmatrix}$$ est **symétrique** et **semi-définie négative**. En particulier, $\dfrac{\partial x_i(w,y)}{\partial w_i}\leq0$ pour tout $i$.

> *« Ce sont les analogues des propriétés des demandes hicksiennes compensées, donc là encore **il n'est pas nécessaire de répéter la preuve**. »*

> **La lecture économique de $\partial x_i/\partial w_i\leq0$.** Quand le prix d'un facteur monte, la firme en utilise **moins** (à output constant). C'est l'exact analogue du théorème 1.12 — et il découle de la même source : la **concavité** de $c$ en $w$.
>
> **Les trois résultats de la fiche 503 se transposent mot pour mot :**
>
> | Fiche 503 (consommateur) | Ici (producteur) |
> |---|---|
> | thm 1.12 : $\partial x_i^h/\partial p_i\leq0$ | $\partial x_i/\partial w_i\leq0$ |
> | thm 1.14 : symétrie (Young) | symétrie de $\sigma^*$ |
> | thm 1.15 : $\sigma$ semi-définie négative | $\sigma^*$ semi-définie négative |
>
> ⚠️ Et comme là-bas, $\sigma^*(w,y)\,w=0$ par homogénéité de degré 0 : **la matrice est singulière**, jamais définie négative.

## 🟠 Concept 7 — Théorème 3.4 : les technologies homothétiques

### 7.1 L'énoncé

> *« Les technologies de production **homogènes** ou, plus généralement, **homothétiques** sont assez courantes en travail théorique et appliqué. Les fonctions de coût et les demandes conditionnelles associées ont des **propriétés spéciales**. »*

> **THEOREM 3.4 — Cost and Conditional Input Demands when Production is Homothetic.**
>
> **1.** Quand la fonction de production satisfait l'hypothèse 3.1 et est **homothétique** : (a) la fonction de coût est **multiplicativement séparable** en prix et output :
>
> $$\boxed{\;c(w,y)=h(y)\,c(w,1)\;}$$
>
> où $h(y)$ est strictement croissante et $c(w,1)$ est la **fonction de coût unitaire** — le coût d'une unité d'output ; (b) les demandes conditionnelles le sont aussi :
>
> $$\boxed{\;x(w,y)=h(y)\,x(w,1)\;}$$
>
> où $h'(y)>0$ et $x(w,1)$ est la demande conditionnelle pour une unité d'output.
>
> **2.** Quand la fonction de production est **homogène de degré $\alpha>0$** : (a) $c(w,y)=y^{1/\alpha}\,c(w,1)$ ; (b) $x(w,y)=y^{1/\alpha}\,x(w,1)$.

### 7.2 La preuve du point 1(a)

*(Le livre note : « la partie 2 se prouve en imitant la preuve de la partie 1, donc c'est laissé en exercice. La partie 1(b) découle du lemme de Shephard, donc nous n'avons besoin de prouver que 1(a). »)*

**La mise en forme.** Soit $F$ la fonction de production. Étant **homothétique**, elle s'écrit

$$F(x)=f\big(g(x)\big)$$

où $f$ est **strictement croissante** et $g$ est **homogène de degré un**.

*(Le livre suppose pour simplifier que l'image de $F$ est tout $\mathbb{R}_+$, et renvoie à l'exercice 3.5 pour $f^{-1}(y)>0$ quand $y>0$.)*

**Le changement d'échelle.** Pour $y>0$, poser

$$t\equiv\frac{f^{-1}(1)}{f^{-1}(y)}>0$$

**La chaîne d'équivalences — le cœur de la preuve :**

$$f\big(g(x)\big)\geq y \iff g(x)\geq f^{-1}(y) \iff g(tx)\geq t\,f^{-1}(y)=f^{-1}(1) \iff f\big(g(tx)\big)\geq1$$

> ⚠️ **Le deuxième « ⟺ » est celui qui utilise l'homogénéité de degré un de $g$ :** $g(tx)=t\,g(x)$. C'est le seul endroit où l'homothétie sert, et c'est tout ce dont on a besoin.

**Le calcul.**

$$\begin{aligned} c(w,y) &= \min_{x} \ w\cdot x \quad\text{s.c.}\quad f\big(g(x)\big)\geq y\\ &= \min_{x} \ w\cdot x \quad\text{s.c.}\quad f\big(g(tx)\big)\geq 1\\ &= \frac1t\min_{x} \ w\cdot(tx) \quad\text{s.c.}\quad f\big(g(tx)\big)\geq 1\\ &= \frac1t\min_{z} \ w\cdot z \quad\text{s.c.}\quad f\big(g(z)\big)\geq 1 \qquad (z\equiv tx)\\ &= \frac{f^{-1}(y)}{f^{-1}(1)}\,c(w,1) \end{aligned}$$

> *« Parce que $f$ strictement croissante implique que $f^{-1}$ l'est aussi, le résultat voulu tient pour tout $y>0$. »*

**Le cas $y=0$.** *« Rappelons que $c(w,0)=0$, et notons que $g(0)=0$, la première égalité découlant de $F(0)=0$ et la seconde de l'homogénéité linéaire de $g$. »* $\blacksquare$

> **La fonction $h$ identifiée.**
>
> $$h(y)=\frac{f^{-1}(y)}{f^{-1}(1)}$$
>
> Dans le cas homogène de degré $\alpha$, on peut prendre $F(x)=\big(g(x)\big)^\alpha$, donc $f(s)=s^\alpha$ et $f^{-1}(y)=y^{1/\alpha}$, d'où $h(y)=y^{1/\alpha}$ — c'est le point 2.

### 7.3 Ce que le théorème 3.4 signifie

| Conséquence | Formulation |
|---|---|
| Le coût se **factorise** | tout l'effet de l'échelle est dans $h(y)$, tout l'effet des prix dans $c(w,1)$ |
| Les **proportions d'inputs** ne dépendent pas de $y$ | $\dfrac{x_i(w,y)}{x_j(w,y)}=\dfrac{x_i(w,1)}{x_j(w,1)}$ — le $h(y)$ se simplifie |
| Les **parts de facteurs** sont indépendantes de $y$ | $s_i=\dfrac{w_ix_i(w,y)}{c(w,y)}=\dfrac{w_ix_i(w,1)}{c(w,1)}$ |
| Le **sentier d'expansion** est un **rayon** | augmenter $y$ multiplie tous les inputs par le même facteur |

> ⚠️ **Le parallèle avec l'exercice 1.48 (fiche 503).** Là, une **dépense** multiplicativement séparable $e(p,u)=k(u)g(p)$ caractérisait les **préférences homothétiques** et donnait des élasticités-revenu toutes égales à 1. Ici, un **coût** multiplicativement séparable caractérise une **technologie homothétique** et donne des parts de facteurs indépendantes de l'échelle. **C'est le même théorème, lu deux fois.**
>
> **Vérification sur l'exemple 3.3 :** $c(w,y)=y\big(w_1^{\rho/(\rho-1)}+w_2^{\rho/(\rho-1)}\big)^{(\rho-1)/\rho}$. La CES est homogène de degré $1$, donc $h(y)=y^{1/1}=y$ .

## 🟠 Concept 8 — Le coût de court terme et l'enveloppe

### 8.1 La définition

> *« La forme générale de la fonction de coût que nous avons considérée jusqu'ici est plus proprement vue comme donnant les coûts de **long terme** de la firme, parce que nous avons supposé qu'en choisissant son plan de production, la firme peut **librement choisir la quantité de chaque input**. **Dans le court terme, la firme n'a pas ce luxe.** Elle doit généralement composer avec le fait qu'elle a pris des **engagements fixes** — en louant une usine d'une taille particulière ou des machines d'un type particulier. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 3.6 — The Short-Run, or Restricted, Cost Function.</span>

Soit la fonction de production $f(z)$ où $z\equiv(x,\bar x)$ ; $x$ est le sous-vecteur des inputs **variables** et $\bar x$ celui des inputs **fixes**. Soient $w$ et $\bar w$ les prix associés. La fonction de coût total de court terme, ou **restreinte**, est

$$\boxed{\;sc(w,\bar w,y;\bar x)\equiv\min_x \ w\cdot x+\bar w\cdot\bar x \quad\text{s.c.}\quad f(x,\bar x)\geq y\;}$$

Si $x(w,\bar w,y;\bar x)$ résout ce problème, alors $sc(w,\bar w,y;\bar x)=w\cdot x(w,\bar w,y;\bar x)+\bar w\cdot\bar x$.

Le coût optimisé des inputs variables, $w\cdot x(\cdot)$, est le **coût variable total**. Le coût des inputs fixes, $\bar w\cdot\bar x$, est le **coût fixe total**.

</div>

> *« Étudiez la définition **soigneusement**. Notez qu'elle ne diffère de celle des coûts de long terme **qu'en ce que les inputs fixes entrent comme paramètres plutôt que comme variables de choix**. »*

### 8.2 L'inégalité fondamentale

> *« Il devrait donc être clair que **pour un niveau d'output donné**, les coûts de long terme, où la firme est libre de choisir tous les inputs optimalement, **ne peuvent jamais être supérieurs** aux coûts de court terme, où la firme peut choisir certains mais pas tous les inputs optimalement. »*

$$\boxed{\;sc(w,\bar w,y;\bar x) \ \geq\ c(w,\bar w,y) \qquad \text{pour tout } y \text{ et tout } \bar x\;}$$

> **L'argument en une phrase :** le programme de court terme a **plus de contraintes** que celui de long terme (les $\bar x$ sont imposés), et un minimum sur un ensemble plus petit ne peut pas être plus bas.

### 8.3 Le point de tangence — et pourquoi ce n'est pas une coïncidence

**La lecture de la figure 3.5.** Avec $\bar x_2$ unités du facteur fixe, la firme utilise les combinaisons $A$, $C$, $E$ pour produire $y^1$, $y^2$, $y^3$ ; en long terme elle utiliserait $B$, $C$, $D$. On constate $sc(y^1)>c(y^1)$, $sc(y^3)>c(y^3)$, mais **$sc(y^2)=c(y^2)$**.

> *« Regardez à nouveau la Fig. 3.5. La coïncidence des coûts de long et de court terme à l'output $y^2$ est-elle **vraiment** une coïncidence ? **Non, pas vraiment.** […] C'est parce que $\bar x_2$ unités sont **exactement la quantité de $x_2$ que la firme choisirait d'utiliser en long terme** pour produire $y^2$ aux prix en vigueur. »*

> *« Notez de plus qu'il n'y a **rien de particulier** dans cette relation entre $\bar x_2$ et $y^2$. **Chaque niveau différent du facteur fixe donnerait lieu à une fonction de coût de court terme différente, et dans chaque cas les coûts de court et de long terme coïncideraient pour un niveau particulier d'output.** »*

### 8.4 La démonstration de l'enveloppe

**Pas 1 — l'identité.** Soit $\bar x(y)$ le choix optimal des facteurs fixes pour produire $y$. Alors

$$c(w,\bar w,y)\equiv sc\big(w,\bar w,y;\bar x(y)\big) \tag{3.3}$$

**Pas 2 — la condition du premier ordre.** Comme $\bar x(y)$ minimise le coût de court terme,

$$\frac{\partial\, sc\big(w,\bar w,y;\bar x(y)\big)}{\partial \bar x_i}\equiv0 \qquad \text{pour tout facteur fixe } i \tag{3.4}$$

**Pas 3 — dériver (3.3) et utiliser (3.4).**

$$\frac{dc(w,\bar w,y)}{dy}=\frac{\partial\, sc\big(w,\bar w,y;\bar x(y)\big)}{\partial y}+\sum_i \underbrace{\frac{\partial\, sc\big(\cdot\big)}{\partial\bar x_i}}_{=\,0 \text{ par (3.4)}}\cdot\frac{\partial\bar x_i(y)}{\partial y}$$

$$\boxed{\;\frac{dc(w,\bar w,y)}{dy}=\frac{\partial\, sc\big(w,\bar w,y;\bar x(y)\big)}{\partial y}\;} \tag{3.5}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">théorème A2.22, le théorème de l'enveloppe</span>

*« (En effet, nous aurions pu dériver ceci directement en faisant appel au .) »*

</div>

### 8.5 La conclusion

Le livre récapitule les trois éléments :

| # | Résultat | Signification géométrique |
|---|---|---|
| 1 | $sc\geq c$ toujours | la courbe de court terme est **au-dessus** |
| 2 | (3.3) : pour chaque $y$, il existe un $\bar x$ pour lequel $sc=c$ | elles se **touchent** |
| 3 | (3.5) : en ce point, les **pentes** sont égales | elles sont **tangentes** |

> *« Or, si deux fonctions prennent la même valeur au même point du plan, et si leurs pentes sont égales, alors **elles sont tangentes**. Ceci établit donc une proposition familière de la théorie intermédiaire : **la courbe de coût total de long terme est l'enveloppe inférieure de toute la famille des courbes de coût total de court terme !** »* (Fig. 3.6)

$$\boxed{\;c(w,\bar w,y)=\min_{\bar x} \ sc(w,\bar w,y;\bar x) \qquad\text{— l'enveloppe INFÉRIEURE}\;}$$

<details class="details--riche">
<summary>

**Pourquoi (3.4) et non pas simplement « $\bar x(y)$ est optimal »**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours).</span>

</div>

Le pas 2 est le seul qui demande un mot d'explication. On pourrait croire qu'il suffit de dire *« $\bar x(y)$ est optimal, donc les termes en $\partial\bar x_i/\partial y$ ne comptent pas »*. Ce serait exact mais imprécis. Voici l'argument rigoureux.

La fonction $y\mapsto \bar x(y)$ est définie comme

$$\bar x(y)\in\arg\min_{\bar x} \ sc(w,\bar w,y;\bar x)$$

Si ce minimum est **intérieur** et $sc$ différentiable en $\bar x$, la condition nécessaire du premier ordre donne $\dfrac{\partial\, sc}{\partial\bar x_i}=0$ **au point $\bar x(y)$** — c'est (3.4).

Dans la dérivation en chaîne de (3.3), les termes croisés portent précisément ce facteur, et s'annulent donc **exactement**, pas approximativement.

> **C'est le mécanisme du théorème de l'enveloppe, et rien d'autre.** On l'a déjà rencontré trois fois : — fiche 502, §2.5 : $\partial v/\partial y=\lambda^*$ ; — fiche 502, §4.7 : le lemme de Shephard ; — fiche 504, §5.2 : le théorème de Hotelling-Wold.
>
> **La formulation générale :** *quand on dérive une fonction de valeur par rapport à un paramètre, on peut ignorer la façon dont l'optimum se déplace — parce qu'il était déjà optimal.*
>
> ⚠️ **La condition d'intériorité compte.** Si le facteur fixe optimal était à une borne ($\bar x(y)=0$ par exemple), (3.4) deviendrait une inégalité et la tangence pourrait être remplacée par un simple contact anguleux.

</details>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Une $f(x)$ donnée + « calculer $\sigma$ » | **Élasticité de substitution** | Calculer le TMST, l'exprimer en $r=x_j/x_i$, dériver en $\ln$, **inverser** |
| « rendements d'échelle ? » | **Définitions 3.3 / 3.4** | Tester $f(tx)$ vs $t\,f(x)$ ; ou calculer $\mu(x)=\sum_i f_ix_i/f$ |
| « la technologie est-elle séparable ? » | **Définition 3.1** | Dériver $f_i/f_j$ par rapport à $x_k$ — **faible** si $i,j$ même groupe, **forte** sinon |
| Une $f$ homogène + « est-elle concave ? » | **Théorème 3.1** | Degré $\alpha\in(0,1]$ ⟹ oui ; $\alpha>1$ ⟹ **non** |
| « dériver $c(w,y)$ » | **Minimisation du coût** | Lagrangien, tangence $\text{TMST}_{ij}=w_i/w_j$, substituer dans la contrainte |
| Une $c(w,y)$ donnée + « les demandes » | **Lemme de Shephard** | $x_i=\partial c/\partial w_i$ — direct, pas de rapport |
| « vérifier les propriétés de $c$ » | **Théorème 3.2** | Les 7 propriétés, identiques au thm 1.7 |
| « technologie homothétique » | **Théorème 3.4** | $c(w,y)=h(y)c(w,1)$ ; parts de facteurs indépendantes de $y$ |
| Facteurs fixes, court terme | **Définition 3.6** | Les $\bar x$ sont des **paramètres** ; $sc\geq c$ toujours |
| « montrer que $c$ est l'enveloppe de $sc$ » | **Théorème de l'enveloppe** | (3.3) identité + (3.4) CPO ⟹ (3.5) égalité des pentes |

**Les trois questions de cadrage :**

1. **Quel est l'analogue chez le consommateur ?** Presque tout le §3.3 est le §1.4 réécrit. Identifier la correspondance fait gagner la moitié du raisonnement.
2. **Long terme ou court terme ?** Si un facteur est imposé, c'est $sc$ ; sinon c'est $c$.
3. **La technologie est-elle homogène / homothétique ?** Si oui, le théorème 3.4 factorise tout et le calcul se réduit à celui du **coût unitaire** $c(w,1)$.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Calculer l'élasticité de substitution

1. **Calculer les produits marginaux** $f_1$ et $f_2$.
2. **Former le TMST** : $\text{TMST}_{12}=f_1/f_2$.
3. **L'exprimer en fonction du seul rapport** $r=x_2/x_1$ si possible *(c'est le cas pour toute fonction **homothétique**)*.
4. **Dériver en logarithme** : $\dfrac{d\ln \text{TMST}}{d\ln r}$.
5. **Inverser** — l'élasticité est l'**inverse** de cette dérivée.

*Contrôle :* $\sigma\geq0$ toujours (sous quasiconcavité). $\sigma\to\infty$ pour des isoquantes droites, $\sigma=0$ pour des angles droits.

### Méthode 2 — Classer les rendements d'échelle

**Voie globale (définition 3.3) :** calculer $f(tx)$ et comparer à $t\,f(x)$ pour $t>1$.

**Voie locale (définition 3.4) :**

$$\mu(x)=\frac{\sum_i f_i(x)\,x_i}{f(x)}=\sum_i \mu_i(x)$$

| $\mu(x)$ | Rendements |
|---|---|
| $>1$ | croissants |
| $=1$ | constants |
| $<1$ | décroissants |

⚠️ **Si $f$ est homogène de degré $\alpha$**, Euler donne $\mu(x)=\alpha$ **partout** — le calcul est immédiat.

⚠️ **Si les rendements varient**, chercher à exprimer $\mu$ **en fonction de $y$** plutôt que de $x$ (astuce de l'exemple 3.2) : les expressions deviennent bien plus nettes, et le seuil se lit de $\mu(y)=1$.

### Méthode 3 — Dériver la fonction de coût

1. **Vérifier l'hypothèse 3.1** en une ligne (justifie l'unicité et la saturation).
2. **Lagrangien** : $\mathcal{L}=w\cdot x-\lambda\big[f(x)-y\big]$.
3. **Conditions du premier ordre**, puis **diviser** deux d'entre elles pour éliminer $\lambda$ : $\text{TMST}_{ij}=w_i/w_j$.
4. **Substituer dans la contrainte de production** $f(x)=y$ pour obtenir $x(w,y)$.
5. **Former** $c(w,y)=w\cdot x(w,y)$.
6. **Vérifier** : $\partial c/\partial w_i$ doit redonner $x_i(w,y)$ (Shephard), et $c(tw,y)=t\,c(w,y)$.

### Méthode 4 — Exploiter l'homothétie

1. **Reconnaître** l'homothétie : $F=f\circ g$ avec $g$ homogène de degré 1 et $f$ strictement croissante. *(Toute fonction homogène l'est ; l'inverse est faux.)*
2. **Résoudre le problème pour $y=1$ seulement** — on obtient $c(w,1)$ et $x(w,1)$.
3. **Multiplier par $h(y)$** : – cas homogène de degré $\alpha$ : $h(y)=y^{1/\alpha}$ ; – cas général : $h(y)=\dfrac{f^{-1}(y)}{f^{-1}(1)}$.
4. **Conclure** : parts de facteurs et proportions d'inputs **indépendantes de $y$**.

### Méthode 5 — Traiter le court terme

1. **Séparer** les inputs en variables $x$ et fixes $\bar x$.
2. **Minimiser sur les seuls $x$**, en traitant $\bar x$ comme un **paramètre**.
3. **Ajouter le coût fixe** $\bar w\cdot\bar x$ — il ne dépend pas de $y$.
4. **Comparer à $c$** : toujours $sc\geq c$, avec égalité au niveau d'output pour lequel $\bar x$ est le choix de long terme.
5. Pour l'enveloppe : dériver l'identité $c(y)=sc\big(y;\bar x(y)\big)$ et **annuler les termes croisés** par la condition du premier ordre.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Oublier la convention de signe de $Y$ | $y_i<0$ pour une ressource **consommée**, $y_i>0$ pour une ressource **produite** | Le préciser avant tout calcul sur $Y$ |
| 2 | Confondre l'ensemble $Y$ et la fonction $f$ | $Y$ permet **plusieurs outputs** ; $f$ n'en décrit qu'**un** | $f$ est le cas particulier mono-output |
| 3 | Croire que la stricte quasiconcavité est indispensable | *« supposée largement pour des raisons de simplicité »* | Elle sert surtout à l'**unicité** de $x(w,y)$ |
| 4 | Interpréter la quasiconcavité comme une substituabilité | C'est l'inverse : elle traduit une **complémentarité** | *« les deux inputs ensemble sont importants »* |
| 5 | Inverser les indices du TMST | Le **premier** indice est au **numérateur** | $\text{TMST}_{ij}=\dfrac{\partial f/\partial x_i}{\partial f/\partial x_j}$ |
| 6 | Confondre séparabilité faible et forte | **Faible** : $i,j$ **même** groupe · **Forte** : $i,j$ groupes **quelconques** | La forte n'a de sens que si $S>2$ |
| 7 | Oublier d'**inverser** dans la définition de $\sigma$ | La définition 3.2 est un **inverse** de dérivée logarithmique | $\sigma_{ij}=\big(d\ln \text{TMST}/d\ln r\big)^{-1}$ |
| 8 | Croire que $\sigma$ grand = substitution difficile | C'est l'inverse : **grand $\sigma$ = substitution facile** | $\sigma=0$ ⟹ proportions fixes |
| 9 | Écrire $\sigma=1-\rho$ pour la CES | La dérivée logarithmique vaut $1-\rho$ ; **$\sigma$ est son inverse** | $\sigma=\dfrac{1}{1-\rho}$ |
| 10 | Appliquer le théorème 3.1 à une $f$ homogène de degré $>1$ | L'énoncé exige $\alpha\in(0,1]$ | Avec $\alpha>1$, $f$ n'est **pas** concave |
| 11 | Dans la preuve du thm 3.1, mal choisir $t$ | Le choix $t^*=\dfrac{y^1}{y^1+y^2}$ est ce qui fait tout marcher | Il fait **disparaître** les dénominateurs |
| 12 | Confondre rendements à proportions variables et d'échelle | **Horizontale** dans la carte vs le long d'un **rayon** | Fig. 3.3 |
| 13 | Croire que « rendements croissants » ⟹ « homogène de degré $>1$ » | **La réciproque est fausse** — le livre le souligne | Homogène $>1$ ⟹ croissants, pas l'inverse |
| 14 | Croire que toute technologie tombe dans l'une des trois catégories | Beaucoup ont des rendements variables **par plages** | D'où la mesure **locale** $\mu(x)$ |
| 15 | Oublier que $\mu(x)=\sum_i\mu_i(x)$ | C'est immédiat sur la définition et souvent le plus rapide | L'élasticité d'échelle est la **somme** des élasticités d'output |
| 16 | Croire que la minimisation du coût suppose la concurrence sur le marché du produit | *« Ce sera vrai pour **toutes** les firmes : monopoleurs, concurrents parfaits… »* | Elle découle de la seule maximisation du profit |
| 17 | Croire que $x(w,y)$ est la demande « effective » de facteurs | Elle est **conditionnelle** à $y$, qui n'est pas encore choisi | Le vrai choix de $y$ est au §3.5 |
| 18 | Écrire Shephard avec un rapport ou un signe | Comme au thm 1.7, c'est **direct** | $x_i=\partial c/\partial w_i$ |
| 19 | Croire que $\sigma^*(w,y)$ peut être **définie** négative | $\sigma^*(w,y)\,w=0$ par homogénéité : elle est **singulière** | **Semi-**définie négative |
| 20 | Dans le thm 3.4, croire que $h(y)=y$ toujours | $h(y)=y^{1/\alpha}$ dans le cas homogène de degré $\alpha$ | $h(y)=f^{-1}(y)/f^{-1}(1)$ en général |
| 21 | Croire que homothétique = homogène | Homogène ⟹ homothétique, **pas l'inverse** | $F=f\circ g$ avec $f$ strictement croissante |
| 22 | Traiter $\bar x$ comme une variable dans $sc$ | C'est ce qui **définit** le court terme : $\bar x$ est un **paramètre** | *« les inputs fixes entrent comme paramètres »* |
| 23 | Croire que $sc$ et $c$ ne se touchent jamais | Elles coïncident au niveau d'output pour lequel $\bar x$ est le choix de long terme | Et **ce n'est pas une coïncidence** |
| 24 | Croire que $c$ est l'enveloppe **supérieure** | $sc\geq c$ toujours : $c$ est en **dessous** | Enveloppe **inférieure** |

## 📌 Ultimate Review

**§3.1 — la firme.** Objectif **invariant** : maximiser le profit. Quatre arguments : empirique · simplicité et cohérence · les alternatives sont des **tactiques** · les **forces de marché** (remplacer les dirigeants, racheter la firme). Toujours distinguer **objectif** et **contraintes**.

**§3.2 — la technologie.**

$$Y\subset\mathbb{R}^m \ \text{(} y_i<0 \text{ consommé, } y_i>0 \text{ produit)} \qquad\qquad f:\mathbb{R}^n_+\to\mathbb{R}_+$$

**HYPOTHÈSE 3.1** : $f$ **continue**, **strictement croissante**, **strictement quasiconcave**, $f(0)=0$. *(Stricte quasiconcavité ⟺ **complémentarité** entre inputs.)*

$$MP_i(x)=\frac{\partial f}{\partial x_i} \qquad Q(y)=\{x\geq0\mid f(x)=y\} \qquad \text{TMST}_{ij}(x)=\frac{\partial f/\partial x_i}{\partial f/\partial x_j}$$

**DÉFINITION 3.1 — séparabilité.** **Faible** : $\dfrac{\partial(f_i/f_j)}{\partial x_k}=0$ pour $i,j\in N_s$, $k\notin N_s$. **Forte** : idem pour $i\in N_s$, $j\in N_t$, $k\notin N_s\cup N_t$ (exige $S>2$).

**DÉFINITION 3.2 — élasticité de substitution.**

$$\sigma_{ij}(x^0)=\left(\frac{d\ln \text{TMST}_{ij}\big(x(r)\big)}{d\ln r}\right)^{-1}\Bigg|_{r=x_j^0/x_i^0}$$

$\sigma\to\infty$ : substituts parfaits · $\sigma=0$ : proportions fixes.

**Exemple 3.1 — CES.** $y=\big(x_1^\rho+x_2^\rho\big)^{1/\rho}$ ⟹ $\text{TMST}_{12}=\big(x_2/x_1\big)^{1-\rho}$ ⟹

$$\boxed{\sigma=\frac{1}{1-\rho}}$$

| $\rho\to1$ | $\rho\to0$ | $\rho\to-\infty$ |
|---|---|---|
| linéaire, $\sigma\to\infty$ | Cobb-Douglas, $\sigma\to1$ | Leontief, $\sigma\to0$ |

**THÉORÈME 3.1 (Shephard).** $f$ satisfaisant l'hyp. 3.1 et **homogène de degré $\alpha\in(0,1]$** ⟹ $f$ **concave**. *Preuve : normaliser par $y^i$, appliquer la quasiconcavité, choisir $t^*=y^1/(y^1+y^2)$, dé-normaliser ⟹ super-additivité ⟹ concavité. Pour $\alpha<1$ : $f^{1/\alpha}$ est homogène de degré 1 donc concave, et $t\mapsto t^\alpha$ est croissante concave.*

**§3.2.1 — rendements.**

$$\mu_i(x)=\frac{f_i(x)x_i}{f(x)}=\frac{MP_i}{AP_i} \qquad\qquad \mu(x)=\frac{\sum_i f_i(x)x_i}{f(x)}=\sum_i\mu_i(x)$$

| $\mu(x)$ | Rendements d'échelle locaux |
|---|---|
| $=1$ | constants |
| $>1$ | croissants |
| $<1$ | décroissants |

⚠️ Homogène de degré $>1$ ⟹ rendements croissants, **mais pas la réciproque**.

**Exemple 3.2.** $y=k\big(1+x_1^{-\alpha}x_2^{-\beta}\big)^{-1}$ ⟹ $\mu(y)=(\alpha+\beta)\big(1-\tfrac{y}{k}\big)$ : rendements **décroissant monotonement** avec $y$, seuil constant en $y=k\big[1-\tfrac{1}{\alpha+\beta}\big]$.

**§3.3 — le coût.**

$$\boxed{\;c(w,y)\equiv\min_{x\geq0} \ w\cdot x \ \text{ s.c. } \ f(x)\geq y \qquad\qquad \text{TMST}_{ij}=\frac{w_i}{w_j}\;}$$

$x(w,y)$ = **demande conditionnelle** de facteurs.

**Exemple 3.3 — CES.** $c(w,y)=y\big(w_1^{\rho/(\rho-1)}+w_2^{\rho/(\rho-1)}\big)^{(\rho-1)/\rho}$.

**THÉORÈME 3.2** — les **sept** propriétés, identiques au théorème 1.7 : nulle en $y=0$ · continue · str. croissante et non bornée en $y$ · croissante en $w$ · **homogène de degré 1** en $w$ · **concave** en $w$ · **Shephard** $\partial c/\partial w_i=x_i(w,y)$.

**THÉORÈME 3.3** — $x(w,y)$ homogène de **degré 0** en $w$ ; $\sigma^*(w,y)$ **symétrique** et **semi-définie négative**, donc $\partial x_i/\partial w_i\leq0$.

**THÉORÈME 3.4 — technologie homothétique.**

$$c(w,y)=h(y)\,c(w,1) \qquad\qquad x(w,y)=h(y)\,x(w,1)$$

avec $h(y)=\dfrac{f^{-1}(y)}{f^{-1}(1)}$, et $h(y)=y^{1/\alpha}$ si $F$ est homogène de degré $\alpha$.

⟹ proportions d'inputs et **parts de facteurs indépendantes de $y$** ; sentier d'expansion = **rayon**.

**DÉFINITION 3.6 — court terme.** $sc(w,\bar w,y;\bar x)$ : les $\bar x$ sont des **paramètres**. Coût variable total $w\cdot x(\cdot)$ + coût fixe total $\bar w\cdot\bar x$.

**Les trois résultats de l'enveloppe :**

$$sc\geq c \qquad\qquad c(y)=sc\big(y;\bar x(y)\big) \quad \text{(3.3)} \qquad\qquad \frac{dc}{dy}=\frac{\partial sc}{\partial y} \quad \text{(3.5)}$$

$$\boxed{\;\text{Le coût total de long terme est l'ENVELOPPE INFÉRIEURE des coûts de court terme.}\;}$$

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quels sont les quatre arguments du livre en faveur de la maximisation du profit ?**

</summary>

1. **Empirique** : les prédictions sont *« maintes fois confirmées par les faits »*.
2. **Théorique** : simplicité et **cohérence** avec la maximisation d'utilité des consommateurs.
3. **Hiérarchie** : ventes et part de marché sont des **tactiques de court terme** dans une stratégie de profit.
4. **Forces de marché** : si les **dirigeants** sont fautifs, les propriétaires ont intérêt à les remplacer ; si les **propriétaires** le sont, un entrepreneur extérieur a intérêt à racheter la firme.

</details>

<details class="details--riche">
<summary>

**2. Quelle distinction méthodologique le §3.1 pose-t-il ?**

</summary>

Entre l'**objectif**, *« qui reste toujours le même »* (maximiser le profit), et les **contraintes**, *« qui sont variées et dépendent de réalités de marché hors de son contrôle »*.

Les trois familles de contraintes : ce qui est **technologiquement possible** (§3.2), les conditions sur les **marchés de facteurs** (§3.3), les conditions sur le **marché du produit** (§3.5).

</details>

<details class="details--riche">
<summary>

**3. Quelle est la convention de signe dans l'ensemble des possibilités de production ?**

</summary>

$$y_i<0 \ \text{ si la ressource } i \text{ est CONSOMMÉE} \qquad y_i>0 \ \text{ si elle est PRODUITE}$$

$Y\subset\mathbb{R}^m$ est la représentation **la plus générale** : elle permet **plusieurs outputs**, contrairement à $f$.

</details>

<details class="details--riche">
<summary>

**4. Énoncer l'hypothèse 3.1 et justifier chaque clause.**

</summary>

$f:\mathbb{R}^n_+\to\mathbb{R}_+$ **continue**, **strictement croissante**, **strictement quasiconcave**, avec $f(0)=0$.

| Clause | Justification |
|---|---|
| continuité | petits changements d'inputs ⟹ petits changements d'output |
| stricte croissance | strictement plus de **chaque** input ⟹ strictement plus d'output |
| stricte quasiconcavité | *« largement pour des raisons de simplicité »* |
| $f(0)=0$ | un output positif requiert des inputs positifs |

</details>

<details class="details--riche">
<summary>

**5. Comment le livre interprète-t-il la stricte quasiconcavité de $f$ ?**

</summary>

Comme la présence d'**au moins une certaine complémentarité** :

> *« Deux inputs sont dans une certaine mesure complémentaires si **très peu de production peut avoir lieu quand l'un des inputs est faible, même si l'autre est élevé**. […] La **moyenne** de deux vecteurs extrêmes produira strictement plus d'output qu'au moins l'un des deux extrêmes. »*

⚠️ **Ce n'est pas une hypothèse de substituabilité** — c'est le contraire.

</details>

<details class="details--riche">
<summary>

**6. Définir isoquante et TMST, et donner leur analogue chez le consommateur.**

</summary>

$$Q(y)\equiv\{x\geq0\mid f(x)=y\} \qquad\qquad \text{TMST}_{ij}(x)=\frac{\partial f(x)/\partial x_i}{\partial f(x)/\partial x_j}$$

| Consommateur | Producteur |
|---|---|
| courbe d'indifférence | **isoquante** |
| $\text{TMS}_{ij}$ — ce qu'on est **prêt** à céder | $\text{TMST}_{ij}$ — ce que la technologie **permet** de céder |

Dans le cas à deux inputs, $\text{TMST}_{12}$ est la **valeur absolue de la pente** de l'isoquante.

</details>

<details class="details--riche">
<summary>

**7. Distinguer séparabilité faible et forte.**

</summary>

$$\frac{\partial\big(f_i(x)/f_j(x)\big)}{\partial x_k}=0$$

|  | $i$ et $j$ | $k$ |
|---|---|---|
| **faible** | dans **le même** groupe $N_s$ | hors de $N_s$ |
| **forte** | dans **deux groupes quelconques** $N_s$, $N_t$ | hors de $N_s\cup N_t$ |

La **forte** est plus exigeante (elle contraint aussi les TMST inter-groupes) et n'a de sens que si $S>2$.

</details>

<details class="details--riche">
<summary>

**8. Énoncer la définition 3.2 et ses trois pièges.**

</summary>

$$\sigma_{ij}(x^0)\equiv\left(\frac{d\ln \text{TMST}_{ij}\big(x(r)\big)}{d\ln r}\right)^{-1}\Bigg|_{r=x_j^0/x_i^0}$$

1. C'est un **inverse** de dérivée logarithmique.
2. Les conditions (i)-(iii) imposent de se déplacer **le long d'une isoquante**, autres inputs fixés.
3. Le point d'évaluation est le rapport **initial** $x_j^0/x_i^0$.

</details>

<details class="details--riche">
<summary>

**9. Que signifient $\sigma\to\infty$ et $\sigma=0$ ?**

</summary>

| $\sigma$ | Isoquantes | Interprétation |
|---|---|---|
| $\to\infty$ | **droites** | substituabilité **parfaite** |
| $0<\sigma<\infty$ | courbes | substituabilité imparfaite |
| $=0$ | **angles droits** (en L) | **proportions fixes** |

> *« Plus $\sigma$ est proche de zéro, plus les isoquantes sont **en L** et la substitution "difficile" ; plus $\sigma$ est grand, plus elles sont **plates** et la substitution "facile". »*

</details>

<details class="details--riche">
<summary>

**10. Calculer $\sigma$ pour la CES.**

</summary>

$$\text{TMST}_{12}(x_1,x_2)=\left(\frac{x_2}{x_1}\right)^{1-\rho}=r^{1-\rho}$$

$$\frac{d\ln r^{1-\rho}}{d\ln r}=1-\rho \qquad\Longrightarrow\qquad \boxed{\sigma=\frac{1}{1-\rho}}$$

**C'est une constante — d'où le sigle CES**, *constant elasticity of substitution*.

⚠️ **Ne pas confondre $1-\rho$ (la dérivée) et $\sigma$ (son inverse).**

</details>

<details class="details--riche">
<summary>

**11. Quelle critique le livre adresse-t-il à la forme CES ?**

</summary>

> *« Avec la forme CES, **le degré de substituabilité entre inputs est toujours le même**, quel que soit le niveau d'output ou les proportions d'inputs. C'est donc une caractérisation **quelque peu restrictive** de la technologie. »*

En contrepartie, *« différentes valeurs de $\rho$ peuvent représenter des technologies à substituabilité **très différentes** »*.

</details>

<details class="details--riche">
<summary>

**12. Énoncer le théorème 3.1 et donner l'idée de sa preuve.**

</summary>

$f$ satisfaisant l'hypothèse 3.1 et **homogène de degré $\alpha\in(0,1]$** ⟹ $f$ est **concave**.

**Idée (cas $\alpha=1$) :** normaliser $x^i/y^i$ de sorte que $f$ y vaille $1$ ; appliquer la quasiconcavité ; **choisir $t^*=\dfrac{y^1}{y^1+y^2}$**, ce qui fait disparaître les dénominateurs ; dé-normaliser ⟹ **super-additivité** $f(x^1+x^2)\geq f(x^1)+f(x^2)$ ; en déduire la concavité via (P.4)-(P.5).

**Extension :** $f^{1/\alpha}$ est homogène de degré 1 donc concave, et $t\mapsto t^\alpha$ est croissante **concave** pour $\alpha\leq1$.

</details>

<details class="details--riche">
<summary>

**13. Pourquoi le théorème 3.1 exige-t-il $\alpha\leq1$ ?**

</summary>

Parce que l'extension repose sur le fait que $\varphi(t)=t^\alpha$ est **concave** : $\varphi''(t)=\alpha(\alpha-1)t^{\alpha-2}\leq0$ **exige $\alpha\leq1$**.

Avec $\alpha>1$, $\varphi$ est **convexe** et l'argument s'inverse.

**La lecture économique :** la concavité de $f$ correspond aux **rendements décroissants** ; on ne peut pas l'obtenir d'une technologie à rendements d'échelle croissants. Contre-exemple : $f(x)=x^2$.

</details>

<details class="details--riche">
<summary>

**14. Distinguer rendements à proportions variables et rendements d'échelle.**

</summary>

Sur la carte des isoquantes (Fig. 3.3) :

| Type | Direction |
|---|---|
| **proportions variables** | **horizontale**, à $\bar x_2$ constant |
| **échelle** | le long d'un **rayon** $OA$, à $x_2/x_1$ constant |

Le premier relève du **court terme**, le second du **long terme**.

</details>

<details class="details--riche">
<summary>

**15. Énoncer la définition 3.3 et la mise en garde du livre.**

</summary>

| Rendements | Condition |
|---|---|
| constants | $f(tx)=t\,f(x)$ pour tout $t>0$ |
| croissants | $f(tx)>t\,f(x)$ pour $t>1$ |
| décroissants | $f(tx)<t\,f(x)$ pour $t>1$ |

⚠️ **La mise en garde :** *« toute fonction homogène de degré supérieur (inférieur) à un doit avoir des rendements croissants (décroissants), **bien que la réciproque n'ait pas besoin de tenir** »*.

Une technologie peut avoir des rendements croissants **sans être homogène du tout**.

</details>

<details class="details--riche">
<summary>

**16. Définir l'élasticité d'échelle et donner la relation aux élasticités d'output.**

</summary>

$$\mu(x)\equiv\lim_{t\to1}\frac{d\ln\big[f(tx)\big]}{d\ln t}=\frac{\sum_i f_i(x)\,x_i}{f(x)}$$

$$\boxed{\;\mu(x)=\sum_{i=1}^n \mu_i(x) \qquad\text{où}\qquad \mu_i(x)=\frac{f_ix_i}{f}=\frac{MP_i}{AP_i}\;}$$

**L'élasticité d'échelle est la SOMME des élasticités d'output.**

⚠️ Si $f$ est homogène de degré $\alpha$, **Euler** donne $\mu(x)=\alpha$ partout.

</details>

<details class="details--riche">
<summary>

**17. Quelle est l'astuce de l'exemple 3.2 ?**

</summary>

**Réexprimer les élasticités en fonction de $y$ au lieu de $x$.**

De $y=k\big(1+x_1^{-\alpha}x_2^{-\beta}\big)^{-1}$ on tire $x_1^{-\alpha}x_2^{-\beta}=\dfrac{k}{y}-1$, et les expressions deviennent

$$\mu_1(y)=\alpha\left(1-\frac yk\right) \qquad \mu_2(y)=\beta\left(1-\frac yk\right) \qquad \mu(y)=(\alpha+\beta)\left(1-\frac yk\right)$$

> *« Des expressions **bien plus nettes** sont obtenues. »*

Le seuil se lit de $\mu(y)=1$ : $y=k\big[1-\tfrac{1}{\alpha+\beta}\big]$.

</details>

<details class="details--riche">
<summary>

**18. Pourquoi la minimisation du coût vaut-elle pour toutes les firmes ?**

</summary>

> *« Si l'objet de la firme est de maximiser le profit, elle choisira nécessairement le plan de production le moins coûteux pour **chaque** niveau d'output. Notez que **ce sera vrai pour toutes les firmes** : monopoleurs, concurrents parfaits, ou n'importe quoi entre les deux. »*

⚠️ **La minimisation du coût ne présuppose pas la concurrence sur le marché du produit.** C'est pourquoi le §3.3 précède le §3.5.

</details>

<details class="details--riche">
<summary>

**19. Définir la fonction de coût et la condition de tangence.**

</summary>

$$c(w,y)\equiv\min_{x\in\mathbb{R}^n_+} \ w\cdot x \quad\text{s.c.}\quad f(x)\geq y$$

En éliminant $\lambda$ entre deux conditions du premier ordre :

$$\boxed{\;\text{TMST}_{ij}(x^*)=\frac{w_i}{w_j}\;} \tag{3.2}$$

**Exactement la même structure que (1.11) chez le consommateur.**

</details>

<details class="details--riche">
<summary>

**20. Qu'est-ce que la demande conditionnelle de facteurs, et pourquoi ce nom ?**

</summary>

$x(w,y)$ = le vecteur d'inputs minimisant le coût de produire $y$ aux prix $w$.

> *« Elle est appelée **conditionnelle** parce qu'elle est **conditionnelle au niveau d'output $y$**, qui à ce stade est arbitraire et peut donc être ou ne pas être maximisateur de profit. »*

**L'analogue exact :** la demande **hicksienne** $x^h(p,u)$, conditionnelle au niveau d'utilité.

</details>

<details class="details--riche">
<summary>

**21. Pourquoi la fonction de coût et la fonction de dépense sont-elles « identiques » ?**

</summary>

$$e(p,u)\equiv\min_x \ p\cdot x \ \text{ s.c. } \ u(x)\geq u \qquad\qquad c(w,y)\equiv\min_x \ w\cdot x \ \text{ s.c. } \ f(x)\geq y$$

> *« **Mathématiquement, les deux fonctions sont identiques.** Par conséquent, pour chaque théorème que nous avons prouvé sur les fonctions de dépense, il y a un **théorème équivalent** pour les fonctions de coût. »*

Le livre énonce donc les théorèmes 3.2 à 3.4 **sans les démontrer**.

</details>

<details class="details--riche">
<summary>

**22. Lister les sept propriétés de la fonction de coût.**

</summary>

1. nulle en $y=0$
2. continue
3. **strictement croissante et non bornée** en $y$
4. croissante en $w$
5. **homogène de degré un** en $w$
6. **concave** en $w$
7. **lemme de Shephard** : $\dfrac{\partial c(w,y)}{\partial w_i}=x_i(w,y)$

⚠️ Seule la **7** exige la stricte quasiconcavité (unicité de $x(w,y)$).

</details>

<details class="details--riche">
<summary>

**23. Que montre l'exemple 3.4 ?**

</summary>

Partant de $c(w,y)=Aw_1^\alpha w_2^\beta y$, **Shephard** donne directement

$$x_1=\frac{\alpha\,c(w,y)}{w_1} \qquad x_2=\frac{\beta\,c(w,y)}{w_2} \qquad\Longrightarrow\qquad \frac{x_1}{x_2}=\frac{\alpha}{\beta}\cdot\frac{w_2}{w_1}$$

Les **proportions d'inputs ne dépendent que des prix relatifs**, jamais de l'échelle. Les **parts de facteurs** valent $s_1=\alpha$, $s_2=\beta$ — **constantes**.

⚠️ **L'exemple part de $c$, pas de $f$** — c'est ce que le §2.1 (fiche 504) autorisait.

</details>

<details class="details--riche">
<summary>

**24. Énoncer le théorème 3.3 et sa source.**

</summary>

1. $x(w,y)$ est **homogène de degré zéro** en $w$.
2. La matrice de substitution $\sigma^*(w,y)=\big[\partial x_i/\partial w_j\big]$ est **symétrique** et **semi-définie négative** ; en particulier $\partial x_i/\partial w_i\leq0$.

**La source :** la **concavité de $c$ en $w$**, exactement comme les théorèmes 1.12-1.15 découlaient de la concavité de $e$ en $p$.

⚠️ $\sigma^*(w,y)\,w=0$ : la matrice est **singulière**, jamais définie négative.

</details>

<details class="details--riche">
<summary>

**25. Énoncer le théorème 3.4.**

</summary>

**Technologie homothétique :**

$$c(w,y)=h(y)\,c(w,1) \qquad\qquad x(w,y)=h(y)\,x(w,1)$$

avec $h$ strictement croissante et $c(w,1)$ la **fonction de coût unitaire**.

**Technologie homogène de degré $\alpha>0$ :** $h(y)=y^{1/\alpha}$, donc

$$c(w,y)=y^{1/\alpha}c(w,1) \qquad x(w,y)=y^{1/\alpha}x(w,1)$$

</details>

<details class="details--riche">
<summary>

**26. Quel est le pivot de la preuve du théorème 3.4 ?**

</summary>

Écrire $F=f\circ g$ avec $g$ **homogène de degré un**, poser $t=\dfrac{f^{-1}(1)}{f^{-1}(y)}$, et utiliser la chaîne

$$f\big(g(x)\big)\geq y \iff g(x)\geq f^{-1}(y) \iff g(tx)\geq t\,f^{-1}(y)=f^{-1}(1) \iff f\big(g(tx)\big)\geq1$$

⚠️ **Le deuxième « ⟺ » est le seul endroit où l'homothétie sert** : il utilise $g(tx)=t\,g(x)$.

Le changement de variable $z=tx$ transforme alors le problème en le problème unitaire, au facteur $1/t$ près.

</details>

<details class="details--riche">
<summary>

**27. Quelles sont les quatre conséquences de l'homothétie ?**

</summary>

1. Le coût se **factorise** : échelle dans $h(y)$, prix dans $c(w,1)$.
2. Les **proportions d'inputs** ne dépendent pas de $y$ (le $h(y)$ se simplifie).
3. Les **parts de facteurs** sont indépendantes de $y$.
4. Le **sentier d'expansion** est un **rayon** issu de l'origine.

**Le pendant exact** de l'exercice 1.48 (fiche 503) : préférences homothétiques ⟹ élasticités-revenu toutes égales à 1.

</details>

<details class="details--riche">
<summary>

**28. Comment le coût de court terme diffère-t-il du coût de long terme ?**

</summary>

> *« Elle ne diffère de celle des coûts de long terme **qu'en ce que les inputs fixes entrent comme paramètres plutôt que comme variables de choix**. »*

$$sc(w,\bar w,y;\bar x)\equiv\min_x \ w\cdot x+\bar w\cdot\bar x \quad\text{s.c.}\quad f(x,\bar x)\geq y$$

**Coût variable total** = $w\cdot x(\cdot)$ · **coût fixe total** = $\bar w\cdot\bar x$.

</details>

<details class="details--riche">
<summary>

**29. Pourquoi $sc\geq c$ toujours ?**

</summary>

Le programme de court terme a **plus de contraintes** (les $\bar x$ sont imposés), et un minimum sur un ensemble **plus petit** ne peut pas être plus bas.

> *« Pour un niveau d'output donné, les coûts de long terme, où la firme est libre de choisir tous les inputs optimalement, **ne peuvent jamais être supérieurs** aux coûts de court terme. »*

</details>

<details class="details--riche">
<summary>

**30. Démontrer que $c$ est l'enveloppe inférieure des $sc$.**

</summary>

Trois ingrédients :

1. $sc\geq c$ **toujours** — les courbes de court terme sont au-dessus.
2. **L'identité** $c(w,\bar w,y)\equiv sc\big(w,\bar w,y;\bar x(y)\big)$ (3.3) — elles se **touchent**.
3. **L'égalité des pentes** : en dérivant (3.3) et en annulant les termes croisés par la condition du premier ordre $\dfrac{\partial sc}{\partial\bar x_i}\equiv0$ (3.4) :

$$\frac{dc(w,\bar w,y)}{dy}=\frac{\partial sc\big(w,\bar w,y;\bar x(y)\big)}{\partial y} \tag{3.5}$$

> *« Si deux fonctions prennent la même valeur au même point et si leurs pentes sont égales, alors **elles sont tangentes**. »* $\blacksquare$

C'est le **théorème de l'enveloppe** (A2.22), comme le livre le note lui-même.

</details>

<details class="details--riche">
<summary>

**31. Le point de tangence entre $sc$ et $c$ est-il une coïncidence ?**

</summary>

> *« Est-ce **vraiment** une coïncidence ? **Non, pas vraiment.** […] C'est parce que $\bar x_2$ unités sont **exactement la quantité que la firme choisirait d'utiliser en long terme** pour produire $y^2$ aux prix en vigueur. »*

Et *« il n'y a **rien de particulier** dans cette relation : **chaque** niveau du facteur fixe donne une $sc$ différente, et dans **chaque** cas les deux coïncident pour un niveau d'output particulier »*.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Objectif de la firme, selon le livre ? | Maximiser le **profit** — toujours le même |
| Le quatrième argument en sa faveur ? | Les **forces de marché** : remplacer les dirigeants, ou racheter la firme |
| La distinction méthodologique du §3.1 ? | **Objectif** (invariant) vs **contraintes** (variables) |
| Convention de signe dans $Y$ ? | $y_i<0$ **consommé** · $y_i>0$ **produit** |
| Avantage de $Y$ sur $f$ ? | $Y$ permet **plusieurs outputs** |
| L'hypothèse 3.1 ? | $f$ continue, **str. croissante**, **str. quasiconcave**, $f(0)=0$ |
| Que traduit la stricte quasiconcavité de $f$ ? | Une **complémentarité** entre inputs — pas une substituabilité |
| Le produit marginal ? | $MP_i(x)=\partial f/\partial x_i$ |
| L'isoquante ? | $Q(y)=\{x\geq0\mid f(x)=y\}$ — un **ensemble de niveau** |
| Le TMST ? | $\text{TMST}_{ij}(x)=\dfrac{\partial f/\partial x_i}{\partial f/\partial x_j}$ |
| Séparabilité **faible** ? | TMST dans **le même** groupe indépendant des autres groupes |
| Séparabilité **forte** ? | TMST entre **deux groupes quelconques** indépendant du reste — exige $S>2$ |
| L'élasticité de substitution ? | $\sigma_{ij}=\big(d\ln \text{TMST}_{ij}/d\ln r\big)^{-1}$ |
| Piège de cette définition ? | C'est un **inverse** de dérivée logarithmique |
| $\sigma\to\infty$ ? | Substituts **parfaits**, isoquantes **droites** |
| $\sigma=0$ ? | **Proportions fixes**, isoquantes en **L** |
| $\sigma$ pour la CES ? | $\sigma=\dfrac{1}{1-\rho}$ — **constante**, d'où le sigle |
| Erreur fréquente sur ce calcul ? | Écrire $\sigma=1-\rho$ au lieu de son **inverse** |
| CES quand $\rho\to1$ ? | **Linéaire**, $\sigma\to\infty$ |
| CES quand $\rho\to0$ ? | **Cobb-Douglas**, $\sigma\to1$ |
| CES quand $\rho\to-\infty$ ? | **Leontief**, $\sigma\to0$ |
| La critique du livre à la CES ? | Substituabilité **toujours la même**, quels que soient output et proportions |
| Théorème 3.1 ? | $f$ homogène de degré $\alpha\in(0,1]$ ⟹ $f$ **concave** |
| Le choix décisif dans sa preuve ? | $t^*=\dfrac{y^1}{y^1+y^2}$ — il **fait disparaître les dénominateurs** |
| Résultat intermédiaire obtenu ? | La **super-additivité** $f(x^1+x^2)\geq f(x^1)+f(x^2)$ |
| Pourquoi $\alpha\leq1$ ? | $t\mapsto t^\alpha$ n'est **concave** que si $\alpha\leq1$ |
| Rendements à proportions variables ? | Déplacement **horizontal** dans la carte des isoquantes |
| Rendements d'échelle ? | Déplacement le long d'un **rayon** |
| Rendements d'échelle constants ? | $f(tx)=t\,f(x)$ pour tout $t>0$ |
| « Rendements croissants » ⟹ « homogène de degré $>1$ » ? | **Faux** — la réciproque seule est vraie |
| L'élasticité d'échelle ? | $\mu(x)=\dfrac{\sum_i f_i(x)x_i}{f(x)}$ |
| Sa relation aux élasticités d'output ? | $\mu(x)=\sum_i\mu_i(x)$ — une **somme** |
| $\mu(x)$ si $f$ est homogène de degré $\alpha$ ? | $\mu(x)=\alpha$ **partout** (Euler) |
| L'astuce de l'exemple 3.2 ? | Réexprimer les élasticités **en fonction de $y$**, pas de $x$ |
| Le seuil de rendements constants dans l'ex. 3.2 ? | $y=k\big[1-\tfrac{1}{\alpha+\beta}\big]$ |
| Pour quelles firmes la minimisation du coût vaut-elle ? | **Toutes** — monopoleurs compris |
| Hypothèse sur les marchés de facteurs ? | La firme est **preneuse de prix** : $w$ fixé |
| Définition de $c(w,y)$ ? | $\min w\cdot x$ s.c. $f(x)\geq y$ |
| La condition de tangence (3.2) ? | $\text{TMST}_{ij}=\dfrac{w_i}{w_j}$ |
| Qu'est-ce que $x(w,y)$ ? | La demande **conditionnelle** de facteurs |
| Pourquoi « conditionnelle » ? | Conditionnelle à $y$, **qui n'est pas encore choisi** |
| Son analogue chez le consommateur ? | La demande **hicksienne** $x^h(p,u)$ |
| $c(w,y)$ pour la CES ? | $y\big(w_1^{\rho/(\rho-1)}+w_2^{\rho/(\rho-1)}\big)^{(\rho-1)/\rho}$ |
| Pourquoi est-elle linéaire en $y$ ? | La CES est **homogène de degré 1** — thm 3.4(2) avec $\alpha=1$ |
| Rapport entre $c(w,y)$ et $e(p,u)$ ? | *« Mathématiquement, les deux fonctions sont **identiques** »* |
| Propriété 5 de $c$ ? | **Homogène de degré un** en $w$ |
| Propriété 6 de $c$ ? | **Concave** en $w$ |
| Le lemme de Shephard, version producteur ? | $\dfrac{\partial c(w,y)}{\partial w_i}=x_i(w,y)$ |
| Quelle propriété exige la stricte quasiconcavité ? | La **7** seulement |
| Ce que montre l'exemple 3.4 ? | Sous $c=Aw_1^\alpha w_2^\beta y$ : parts de facteurs **constantes** $s_1=\alpha$, $s_2=\beta$ |
| Théorème 3.3, point 1 ? | $x(w,y)$ **homogène de degré zéro** en $w$ |
| Théorème 3.3, point 2 ? | $\sigma^*(w,y)$ **symétrique** et **semi-définie négative** |
| Sa source ? | La **concavité de $c$ en $w$** — comme les thm 1.12-1.15 |
| $\sigma^*$ peut-elle être définie négative ? | **Non** — $\sigma^*(w,y)\,w=0$, elle est **singulière** |
| Théorème 3.4, cas homothétique ? | $c(w,y)=h(y)\,c(w,1)$ et $x(w,y)=h(y)\,x(w,1)$ |
| Cas homogène de degré $\alpha$ ? | $h(y)=y^{1/\alpha}$ |
| $h(y)$ dans le cas général ? | $h(y)=\dfrac{f^{-1}(y)}{f^{-1}(1)}$ |
| Le pivot de la preuve du thm 3.4 ? | $g(tx)=t\,g(x)$ — le **seul** endroit où l'homothétie sert |
| Les quatre conséquences de l'homothétie ? | Coût **factorisé** · proportions et **parts** indépendantes de $y$ · sentier d'expansion = **rayon** |
| Homothétique = homogène ? | **Non** : homogène ⟹ homothétique, pas l'inverse |
| Ce qui définit le court terme ? | Les $\bar x$ sont des **paramètres**, pas des variables de choix |
| Coût variable total ? | $w\cdot x(w,\bar w,y;\bar x)$ |
| Coût fixe total ? | $\bar w\cdot\bar x$ |
| Pourquoi $sc\geq c$ ? | Le programme de court terme a **plus de contraintes** |
| Où $sc$ et $c$ coïncident-elles ? | Au niveau d'output dont $\bar x$ est le **choix de long terme** |
| Est-ce une coïncidence ? | *« **Non, pas vraiment** »* — cela vaut pour **chaque** niveau de $\bar x$ |
| L'identité (3.3) ? | $c(w,\bar w,y)\equiv sc\big(w,\bar w,y;\bar x(y)\big)$ |
| La condition (3.4) ? | $\dfrac{\partial sc}{\partial\bar x_i}\equiv0$ — condition du premier ordre |
| Le résultat (3.5) ? | $\dfrac{dc}{dy}=\dfrac{\partial sc}{\partial y}$ — **égalité des pentes** |
| La conclusion ? | Le coût de long terme est l'**ENVELOPPE INFÉRIEURE** des coûts de court terme |
| Quel théorème général est à l'œuvre ? | Le **théorème de l'enveloppe** (A2.22) |
