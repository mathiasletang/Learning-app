# Fiche 512 — L'équilibre général avec production et les plans contingents

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 5 « General Equilibrium », §5.3 « Equilibrium in Production » et §5.4 « Contingent Plans » (p. 220-239) |
| **Difficulté** | Avancé |
| **Temps d'étude estimé** | 145 min |
| **Prérequis** | Fiche 507 (ensemble de possibilités de production $Y$, fonction de profit) · fiche 510 (excédent de demande, théorèmes 5.3-5.5, loi de Walras) · fiche 511 (les deux théorèmes du bien-être en échange pur) · théorème du maximum (A2.21) |
| **Concepts clés** | Plan de production $y^j$, convention de signe, hypothèse 5.2, forte convexité, ensemble agrégé $Y$, maximisation agrégée du profit, économie de propriété privée, parts $\theta^{ij}$, revenu $m^i(p)$, excédent de demande avec production, théorème 5.13, économie de Robinson Crusoé, WEA avec production, efficacité de Pareto avec production, théorèmes 5.14 et 5.15, transferts $T_i$, bornitude des ensembles de production, correspondances et Kakutani, biens datés, biens contingents à l'état, marché de contrats à la date zéro |
| **Poids à l'examen** | L'**hypothèse 5.2** et le rôle exact de chacune de ses trois conditions · le **théorème 5.11** (décomposition de la maximisation agrégée) · la **nouvelle condition d'existence** $y+\sum_i e^i\gg0$ et le pas de preuve qu'elle sert · l'**exemple 5.2 complet** (Robinson Crusoé, calcul de $w^*$) · les **preuves des théorèmes 5.14 et 5.15** · l'argument **contre** la bornitude des ensembles de production · la **réinterprétation en contrats** du §5.4. |

## 🎯 Vue d'ensemble

```
LE FIL DU §5.3 ET DU §5.4 : le modele encaisse la production, le temps
                            et l'incertitude SANS changer de structure

  §5.3.1  LES PRODUCTEURS

     J firmes, y^j dans R^n = un PLAN DE PRODUCTION
        convention de signe :  y^j_k < 0  =>  INPUT
                               y^j_k > 0  =>  OUTPUT
        (« pas de distinction a priori entre inputs et outputs »)

     HYPOTHESE 5.2  1. 0 dans Y^j  (profit borne par 0 en bas)
                    2. Y^j FERME et BORNE
                    3. Y^j FORTEMENT CONVEXE  (=> plan optimal UNIQUE)

     THEOREME 5.9   y^j(p) unique et continue ;  Pi^j(p) continue

     Y = SOMME des Y^j  ->  THEOREME 5.10 : Y herite de tout

     THEOREME 5.11  ybar maximise le profit AGREGE
                    <=>  ybar se DECOMPOSE en plans individuels optimaux

  §5.3.2  LES CONSOMMATEURS

     ECONOMIE DE PROPRIETE PRIVEE : parts theta^ij, somme sur i = 1

     m^i(p) = p . e^i + SOMME_j theta^ij Pi^j(p)
              ^^^^^^^   ^^^^^^^^^^^^^^^^^^^^^^^
              dotations       profits distribues

     THEOREME 5.12  x^i(p, m^i(p)) existe, unique, continue

     L'economie complete : (u^i, e^i, theta^ij, Y^j)

  §5.3.3  L'EQUILIBRE

     z_k(p) = SOMME_i x^i_k  -  SOMME_j y^j_k  -  SOMME_i e^i_k
                                ^^^^^^^^^^^^^
                                LE terme nouveau

     THEOREME 5.13  EXISTENCE avec production
        condition AFFAIBLIE :  y + SOMME_i e^i  >>  0
                               pour UN plan agrege y realisable
        (au lieu de SOMME_i e^i >> 0)

     EXEMPLE 5.2   ROBINSON CRUSOE  ->  w* calcule explicitement

     puis : POURQUOI il faut se DEBARRASSER de la bornitude
            (« on a coupe le lien entre PRIX et DEMANDE »)

  §5.3.4  LE BIEN-ETRE

     DEF. 5.8   WEA avec production = le COUPLE (x(p*), y(p*))
     DEF. 5.9   efficacite de Pareto avec production

     THEOREME 5.14  PREMIER theoreme du bien-etre AVEC PRODUCTION
     THEOREME 5.15  SECOND theoreme, avec des TRANSFERTS T_i, somme = 0
                    l'astuce : Ybar^j = Y^j - {yhat^j}

  §5.4  LES PLANS CONTINGENTS

     L'IDEE UNIQUE :  RAFFINER la notion de BIEN

        5.4.1  bien + DATE     ->  x_kt
        5.4.2  bien + ETAT     ->  x_ks
        5.4.3  bien + DATE + ETAT  ->  x_kts,  n = N x M biens

     Un EQUILIBRE WALRASIEN de cette economie s'implemente par un
     MARCHE DE CONTRATS a la DATE ZERO ; ensuite, plus AUCUN echange.

        UNE SEULE contrainte budgetaire, GLOBALE  (5.7)
        =>  deficit a une date/etat  =  EMPRUNT ou ASSURANCE

     Les TROIS hypotheses cachees : monitoring parfait (pas de faillite),
     information parfaite sur l'etat, contrats parfaitement executes.
```

> ⚠️ **Note de transcription — identique aux fiches 500-511.** Le PDF n'exporte ni $\succsim$, ni $\gg$, ni $\sum$, ni $\Pi$ ; il rend l'inégalité vectorielle $\geq$ comme un « + » et fait disparaître la lettre $\Pi$ (qui apparaît tantôt comme « ( », tantôt comme rien du tout). Les étiquettes des figures 5.7 et 5.8 utilisent un encodage Symbol Mac (`ϭ` = « = », `Ϫ` = « − », `ϩ` = « + », `␲` = $\pi$). Ces symboles sont rétablis depuis la prose et les équations voisines — **il s'agit d'une réparation de transcription, non d'un ajout de contenu**.

## 🔴 Concept 1 — Ce que la production change, et ce qu'elle ne change pas

### 1.1 L'annonce du livre

> *« Nous élargissons maintenant notre description de l'économie pour inclure **la production** aussi bien que la consommation. Nous trouverons que **la plupart des propriétés importantes des systèmes de marché concurrentiels mises au jour plus haut continuent de valoir**. Cependant, la production apporte avec elle **plusieurs questions nouvelles** qui doivent être traitées. »*

**Les deux questions nouvelles, nommément :**

| # | La question | Comment le livre la traite |
|---|---|---|
| 1 | *« les **profits** gagnés par les firmes doivent être **redistribués** aux consommateurs qui les possèdent »* | Les **parts** $\theta^{ij}$ et le revenu $m^i(p)$ (§5.3.2) |
| 2 | *« dans une firme unique, la distinction entre input et output est habituellement claire. **Cette distinction devient floue quand on regarde à travers les firmes** […] L'input d'une firme peut fort bien être l'output d'une autre. »* | La **convention de signe** (§5.3.1) |

### 1.2 Le choix méthodologique décisif

> *« Pour éviter de nous empêtrer désespérément dans la notation, **il semble préférable de résister à faire une quelconque distinction a priori entre inputs et outputs**, et de laisser plutôt la distinction **dépendre du contexte**. Ainsi, nous verrons chaque type de bien ou de service **de façon neutre**, comme simplement un **type différent de marchandise**. »*

⚠️ **C'est un choix de modélisation, pas un détail technique.** Il y a $n$ marchandises, un point. Ce qui distingue un input d'un output est **le signe** de sa coordonnée dans le plan de production.

### 1.3 Le cadre concurrentiel est inchangé

> *« À nouveau, nous formalisons la structure concurrentielle de l'économie en supposant que **les consommateurs agissent pour maximiser leur utilité sous leurs contraintes budgétaires** et que **les firmes cherchent à maximiser leur profit**. **Consommateurs et firmes sont tous deux preneurs de prix.** »*

## 🔴 Concept 2 — Les producteurs : la convention de signe et l'hypothèse 5.2

### 2.1 Le plan de production

$J$ firmes, indexées par $\mathcal{J}=\{1,\dots,J\}$. Un **plan de production** de la firme $j$ est un vecteur

$$y^j\in\mathbb{R}^n$$

**LA CONVENTION DE SIGNE :**

$$\boxed{\;y^j_k<0\ \Longrightarrow\ \text{la marchandise } k \text{ est un INPUT}\qquad y^j_k>0\ \Longrightarrow\ \text{c'est un OUTPUT}\;}$$

> *« Si, par exemple, il y a deux marchandises et $y^j=(-7,3)$, alors le plan de production **requiert 7 unités de la marchandise un comme input**, pour **produire 3 unités de la marchandise deux comme output**. »*

⚠️ **Cette convention n'est pas cosmétique.** Elle fait que $p\cdot y^j$ est **exactement** le profit :

> *« Notez comment notre convention de signe garantit que **les inputs sont comptabilisés dans les profits comme des coûts et les outputs comme des recettes**. »*

Les inputs, ayant coordonnée **négative**, contribuent $p_k y^j_k<0$ — un **coût**. Les outputs contribuent $p_k y^j_k>0$ — une **recette**.

### 2.2 L'hypothèse 5.2

> **HYPOTHÈSE 5.2 — La firme individuelle** **1.** $0\in Y^j\subseteq\mathbb{R}^n$. **2.** $Y^j$ est **fermé et borné**. **3.** $Y^j$ est **fortement convexe**. C'est-à-dire : pour tous $y^1,y^2\in Y^j$ **distincts** et tout $t\in(0,1)$, il existe $\bar y\in Y^j$ tel que
>
> $$\bar y\geq t\,y^1+(1-t)\,y^2 \quad\text{et l'égalité ne vaut pas.}$$

### 2.3 Le rôle exact de chaque condition — le livre le dit lui-même

| Condition | Ce qu'elle garantit, mot pour mot |
|---|---|
| **1.** $0\in Y^j$ | *« La première d'entre elles garantit que **les profits des firmes sont bornés inférieurement par zéro** »* — la firme peut toujours ne rien faire |
| **2a.** borné | *« et la seconde que **la production d'output requiert toujours des inputs** »* |
| **2b.** fermé | *« La partie fermeture de la seconde condition **impose la continuité**. Elle dit que **les limites de plans de production possibles sont elles-mêmes des plans de production possibles**. »* |
| **3.** fortement convexe | *« **la forte convexité exclut les rendements d'échelle constants et croissants** dans la production et **garantit que le plan de production maximisant le profit est UNIQUE** »* |

### 🔴 2.4 L'avertissement du livre sur la bornitude

> *« La partie bornitude de cette condition est **très restrictive** et n'est faite que pour garder l'analyse simple à suivre. **Ne soyez pas tenté de penser qu'elle exprime simplement l'idée que les ressources sont limitées.** Pour le moment, considérez-la comme une hypothèse **simplificatrice quoique dispensable**. »*

**Le livre y revient longuement au §5.3.3 (Concept 7) — c'est un des passages les plus importants du chapitre.**

### 2.5 Le statut particulier de la forte convexité

> *« La troisième hypothèse, la forte convexité, est **nouvelle**. **À la différence de toutes les autres, qui sont des restrictions assez faibles sur la technologie, la forte convexité est une exigence plus contraignante.** »*

> **Note du livre.** *« Bien que l'hypothèse 5.2 ne l'impose pas, tous nos résultats à suivre sont **cohérents** avec l'hypothèse de « **production libre impossible** » (i.e. $Y^j\cap\mathbb{R}^n_+=\{0\}$). »*

### 2.6 Le problème de la firme et le théorème 5.9

Chaque firme fait face à $p\geq0$ et résout

$$\max_{y^j\in Y^j}\ p\cdot y^j \tag{5.3}$$

> *« Parce que **la fonction objectif est continue** et **l'ensemble de contraintes fermé et borné**, un maximum du profit de la firme **existera**. »*

Pour $p\geq0$, la **fonction de profit** est

$$\Pi^j(p)\equiv\max_{y^j\in Y^j}\ p\cdot y^j$$

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 5.9 — Propriétés de base de l'offre et des profits</span>

Si $Y^j$ satisfait les conditions 1 à 3 de l'hypothèse 5.2, alors **pour tout prix $p\gg0$, la solution du problème (5.3) est unique**, notée $y^j(p)$. De plus, $y^j(p)$ est **continue** sur $\mathbb{R}^n_{++}$. En outre, $\Pi^j(p)$ est **bien définie et continue** sur $\mathbb{R}^n_+$.

</div>

**La chaîne d'arguments derrière ce théorème :**

| Propriété | Sa source |
|---|---|
| Existence du max | Objectif **continu** + contrainte **fermée bornée** |
| $\Pi^j(p)$ continue sur $\mathbb{R}^n_+$ | **Théorème A2.21** — le **théorème du maximum** |
| $y^j(p)$ **unique** pour $p\gg0$ | La **forte convexité** *(c'est l'exercice 5.23)* |
| $y^j(p)$ continue sur $\mathbb{R}^n_{++}$ | À nouveau le **théorème du maximum** |

### 2.7 Vocabulaire et homogénéités

> *« Notez que pour $p\gg0$, $y^j(p)$ est une **fonction à valeurs vectorielles dont les composantes sont les fonctions d'offre d'output et de demande d'input de la firme**. Cependant, nous nous référons souvent simplement à $y^j(p)$ comme **la fonction d'offre de la firme $j$**. »*

| Objet | Degré d'homogénéité en $p$ | Référence |
|---|---|---|
| Profit maximal $\Pi^j(p)$ | **1** | Théorème 3.7 |
| Offre d'output et demande d'input | **0** | Théorème 3.8 |

## 🔴 Concept 3 — L'agrégation de la production (théorèmes 5.10 et 5.11)

### 3.1 L'ensemble agrégé

En supposant **aucune externalité de production entre firmes** :

$$Y\equiv\Big\{y \ \Big|\ y=\sum_{j\in\mathcal{J}}y^j,\ \text{où } y^j\in Y^j\Big\}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 5.10 — Propriétés de $Y$</span>

Si chaque $Y^j$ satisfait l'hypothèse 5.2, alors l'ensemble agrégé de possibilités de production $Y$ **satisfait aussi l'hypothèse 5.2**.

</div>

### 🔴 3.2 Le point délicat de ce théorème

Le livre laisse la preuve en exercice *(exercice 5.24)* mais prévient :

> *« Les conditions 1, 3 et la **bornitude** de $Y$ découlent directement de ces propriétés des $Y^j$. **La FERMETURE de $Y$ ne découle PAS simplement de la fermeture des $Y^j$ individuels.** Cependant, sous notre hypothèse supplémentaire que les $Y^j$ sont **bornés**, $Y$ peut être montré fermé. »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — pourquoi la fermeture résiste.</span>

Une somme d'ensembles fermés n'est pas fermée en général : dans $\mathbb{R}^2$, l'hyperbole $\{(t,1/t):t>0\}$ et l'axe $\{(s,0)\}$ sont tous deux fermés, mais leur somme contient des points arbitrairement proches de l'axe sans le contenir. Ce qui sauve la situation ici est la **compacité** : une somme finie d'ensembles **compacts** est compacte, donc fermée. C'est exactement pourquoi le livre a besoin de la bornitude, et c'est le prix payé pour la simplicité annoncée au §2.4.

</div>

### 3.3 Ce que le théorème 5.10 permet immédiatement

> *« Sous le théorème 5.10, un maximum de $p\cdot y$ sur l'ensemble agrégé $Y$ **existera et sera unique** quand $p\gg0$. De plus, **le plan agrégé maximisant le profit $y(p)$ sera une fonction continue de $p$**. »*

### 3.4 Le théorème 5.11 — la décomposition

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 5.11 — Maximisation agrégée du profit</span>

Pour tous prix $p\geq0$ :

$$p\cdot\bar y\ \geq\ p\cdot y \quad\text{pour tout } y\in Y$$

**si et seulement si**, pour certains $\bar y^{\,j}\in Y^j$, $j\in\mathcal{J}$, on peut écrire $\bar y=\sum_{j\in\mathcal{J}}\bar y^{\,j}$ et

$$p\cdot\bar y^{\,j}\ \geq\ p\cdot y^j \quad\text{pour tout } y^j\in Y^j,\ j\in\mathcal{J}.$$

</div>

**En mots, exactement comme le livre le formule :**

> *« Le théorème dit que $\bar y\in Y$ **maximise le profit agrégé si et seulement s'il peut être décomposé en plans de production maximisant le profit des firmes individuelles**. »*

### 3.5 La preuve, dans les deux sens

<details class="details--riche">
<summary>

**Sens ⟹ : l'optimum agrégé se décompose en optima individuels**

</summary>

Soit $\bar y\in Y$ maximisant le profit agrégé au prix $p$, avec $\bar y\equiv\sum_{j}\bar y^{\,j}$.

**Par l'absurde.** Si $\bar y^{\,k}$ **ne maximise pas** le profit de la firme $k$, il existe $\tilde y^{\,k}\in Y^k$ donnant à $k$ un profit **plus élevé**.

Mais alors le vecteur agrégé

$$\tilde y=\tilde y^{\,k}+\sum_{j\neq k}\bar y^{\,j}\ \in\ Y$$

*« doit donner un profit agrégé plus élevé que le vecteur agrégé $\bar y$, **contredisant l'hypothèse que $\bar y$ maximise le profit agrégé au prix $p$** ».* $\blacksquare$

⚠️ **Le pas qui compte** : $\tilde y$ est bien dans $Y$ — c'est la **définition** de $Y$ comme ensemble des sommes.

</details>

<details class="details--riche">
<summary>

**Sens ⟸ : la somme d'optima individuels est un optimum agrégé**

</summary>

Supposons $\bar y^{\,1},\dots,\bar y^{\,J}$ maximisant le profit au prix $p$ pour chaque firme :

$$p\cdot\bar y^{\,j}\geq p\cdot y^j \qquad \text{pour } y^j\in Y^j,\ j\in\mathcal{J}$$

**Sommer sur toutes les firmes :**

$$\sum_{j\in\mathcal{J}}p\cdot\bar y^{\,j}\ \geq\ \sum_{j\in\mathcal{J}}p\cdot y^j$$

**Réarranger** *(linéarité du produit scalaire)* :

$$p\cdot\sum_{j\in\mathcal{J}}\bar y^{\,j}\ \geq\ p\cdot\sum_{j\in\mathcal{J}}y^j$$

*« Mais d'après les définitions de $\bar y$ et de $Y$, ceci dit simplement $p\cdot\bar y\geq p\cdot y$ pour $y\in Y$, donc $\bar y$ maximise le profit agrégé au prix $p$, ce qui achève la preuve. »* $\blacksquare$

</details>

### 3.6 Pourquoi ce théorème est central

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — la portée du théorème 5.11.</span>

C'est **la version « production » de la décentralisation**. Le résultat dit qu'un planificateur qui voudrait choisir le meilleur plan agrégé n'a **rien à coordonner** : il suffit que chaque firme, isolément et sans savoir ce que font les autres, maximise son propre profit aux prix affichés. Comparez avec le théorème 5.6 côté consommateurs (fiche 511) : c'est le même message, du côté de l'offre. Il sera **réutilisé tel quel** dans la preuve du théorème 5.13.

</div>

## 🔴 Concept 4 — Les consommateurs dans une économie de propriété privée

### 4.1 Ce qui ne change pas

> *« Formellement, la description des consommateurs est **exactement comme elle l'a toujours été**. Cependant, nous devons modifier certains détails pour tenir compte de **la distribution des profits des firmes**, parce que **les firmes sont possédées par les consommateurs**. »*

$\mathcal{I}\equiv\{1,\dots,I\}$ indexe les consommateurs, $u^i$ est l'utilité sur $\mathbb{R}^n_+$.

### 🔴 4.2 Le travail est déjà dans le modèle

> *« Notez que notre hypothèse que les paniers des consommateurs sont **non négatifs** **n'exclut pas** la possibilité que les consommateurs **fournissent** des biens et services au marché. En effet, **les services de travail sont facilement inclus en dotant le consommateur d'un nombre fixe d'heures disponibles à la consommation**. Celles qui ne sont pas consommées comme « **loisir** » sont alors **fournies comme services de travail**. »*

> *« Si la seule source de revenu du consommateur est sa dotation, alors **exactement comme avant**, qu'un consommateur soit un **demandeur net** ou un **offreur net** d'un bien dépend de si sa demande **(totale)** est inférieure ou supérieure à sa dotation en ce bien. »*

⚠️ **C'est ce qui fait fonctionner l'exemple de Robinson Crusoé.** Robinson est doté de $T$ heures ; ce qu'il ne consomme pas comme loisir, il le vend.

### 4.3 Les parts de propriété

$\theta^{ij}$ = la proportion des profits de la firme $j$ à laquelle les actions du consommateur $i$ lui donnent droit :

$$0\leq\theta^{ij}\leq1 \quad \forall\,i\in\mathcal{I},\ j\in\mathcal{J} \qquad\text{et}\qquad \boxed{\;\sum_{i\in\mathcal{I}}\theta^{ij}=1 \quad \forall\,j\in\mathcal{J}\;}$$

> *« Bien sûr, ces parts, **sommées sur tous les consommateurs de l'économie, doivent sommer à 1**. »*

### 4.4 Les deux sources de revenu et la contrainte budgétaire

> *« Dans notre économie avec production et propriété privée des firmes, le revenu d'un consommateur peut provenir de **deux sources** — de **la vente d'une dotation de marchandises déjà possédées**, et de **parts dans les profits d'un nombre quelconque de firmes**. »*

$$p\cdot x^i\ \leq\ \underbrace{p\cdot e^i}_{\text{dotations}}+\underbrace{\sum_{j\in\mathcal{J}}\theta^{ij}\Pi^j(p)}_{\text{profits distribués}} \tag{5.4}$$

En notant $m^i(p)$ le membre de droite de (5.4), le problème du consommateur est

$$\max_{x^i\in\mathbb{R}^n_+}\ u^i(x^i) \quad\text{s.c.}\quad p\cdot x^i\leq m^i(p) \tag{5.5}$$

### 4.5 Pourquoi une solution existe — la chaîne exacte

> *« Or, sous l'hypothèse 5.2, **chaque firme gagnera des profits non négatifs** parce que chacune peut toujours **choisir le vecteur de production nul**. Par conséquent, $m^i(p)\geq0$ parce que $p\geq0$ et $e^i\geq0$. Donc, sous les hypothèses 5.1 et 5.2, une solution à (5.5) **existera et sera unique** dès que $p\gg0$. »*

⚠️ **Remarquez la dépendance** : c'est **la condition 1 de l'hypothèse 5.2** ($0\in Y^j$) qui garantit $\Pi^j(p)\geq0$, donc $m^i(p)\geq0$, donc que le budget est non vide.

### 4.6 La continuité, et le théorème 5.12

> *« Rappelez-vous du chapitre 1 que sous les hypothèses que nous y avons faites (et aussi ici), $x^i(p,y)$ est **continue en $(p,y)$**. Par conséquent, **tant que $m^i(p)$ est continue en $p$, $x^i(p,m^i(p))$ sera continue en $p$**. En faisant appel au **théorème 5.9**, nous voyons que $m^i(p)$ est **continue sur $\mathbb{R}^n_+$** sous l'hypothèse 5.2. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 5.12 — Propriété de base de la demande avec parts de profit</span>

Si chaque $Y^j$ satisfait l'hypothèse 5.2 et si $u^i$ satisfait l'hypothèse 5.1, alors une solution au problème (5.5) **existe et est unique** pour tout $p\gg0$. En la notant $x^i(p,m^i(p))$, on a de plus que **$x^i(p,m^i(p))$ est continue en $p$** sur $\mathbb{R}^n_{++}$. En outre, **$m^i(p)$ est continue sur $\mathbb{R}^n_+$**.

</div>

### 4.7 L'économie complète

> *« Ceci complète la description de l'économie. En tout, nous pouvons la représenter comme la collection »*

$$\boxed{\;\big(u^i,\ e^i,\ \theta^{ij},\ Y^j\big)_{i\in\mathcal{I},\,j\in\mathcal{J}}\;}$$

**Comparez à l'économie d'échange pur de la fiche 510** : $(u^i,e^i)_{i\in\mathcal{I}}$. Les **deux** nouveaux objets sont $\theta^{ij}$ et $Y^j$.

## 🔴 Concept 5 — L'équilibre avec production et le théorème 5.13

### 5.1 L'excédent de demande

$$z_k(p)\ \equiv\ \sum_{i\in\mathcal{I}}x^i_k\big(p,m^i(p)\big)\ -\ \underbrace{\sum_{j\in\mathcal{J}}y^j_k(p)}_{\textbf{le terme nouveau}}\ -\ \sum_{i\in\mathcal{I}}e^i_k$$

$$z(p)\equiv\big(z_1(p),\dots,z_n(p)\big)$$

⚠️ **Grâce à la convention de signe, ce seul terme fait tout le travail.** Si la marchandise $k$ est un **output** de la firme $j$, alors $y^j_k>0$ et le terme **réduit** l'excédent de demande — c'est de l'offre. Si c'est un **input**, $y^j_k<0$ et le terme **augmente** l'excédent de demande — c'est de la demande. **Aucune formule séparée n'est nécessaire.**

La définition d'équilibre est **inchangée** *(définition 5.5, fiche 510)* : $p^*\gg0$ est un équilibre walrasien si $z(p^*)=0$.

### 5.2 Le théorème d'existence

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 5.13 — Existence de l'équilibre walrasien avec production</span>

Considérons l'économie $(u^i,e^i,\theta^{ij},Y^j)_{i\in\mathcal{I},j\in\mathcal{J}}$. Si chaque $u^i$ satisfait l'**hypothèse 5.1**, chaque $Y^j$ satisfait l'**hypothèse 5.2**, et

$$y+\sum_{i\in\mathcal{I}}e^i\ \gg\ 0 \qquad\text{pour un certain plan agrégé } y\in\sum_{j\in\mathcal{J}}Y^j,$$

alors il existe au moins un vecteur de prix $p^*\gg0$ tel que $z(p^*)=0$.

</div>

### 🔴 5.3 La condition est AFFAIBLIE, pas renforcée

> *« Rappelez-vous que **quand il n'y avait pas de production, nous exigions que le vecteur de dotation agrégée soit strictement positif** pour garantir l'existence. **Avec la production, cette condition peut être AFFAIBLIE** en exigeant qu'**il existe un vecteur de production réalisable pour cette économie dont le résultat net est une quantité strictement positive de chaque bien**. »*

| Sans production *(thm 5.4-5.5)* | Avec production *(thm 5.13)* |
|---|---|
| $\displaystyle\sum_{i}e^i\gg0$ | $\displaystyle y+\sum_{i}e^i\gg0$ **pour un** $y\in Y$ |
| Il faut **posséder** un peu de chaque bien | Il suffit de **pouvoir en produire** le solde net |

**Pourquoi c'est plus faible :** en prenant $y=0\in Y$ *(licite par la condition 1 de l'hypothèse 5.2)*, on retrouve l'ancienne condition. Mais on peut désormais avoir $e^i_k=0$ pour tout $i$ sur un bien $k$, pourvu qu'une firme sache le **produire**.

### 5.4 La preuve — et le rôle précis de la nouvelle condition

Le livre ne donne que le **début** ; le reste est l'**exercice 5.25**.

<details class="details--riche">
<summary>

**La structure de la preuve**

</summary>

> *« L'idée est de montrer que sous les hypothèses ci-dessus, **la fonction d'excédent de demande agrégée satisfait les conditions du théorème 5.3**. Parce que **les ensembles de production sont bornés** et **la consommation non négative**, ceci se réduit à montrer que **la demande d'un consommateur pour un bien est non bornée quand certains prix, mais pas tous, tendent vers zéro**. »*

> *« **(Cependant, vous devriez vérifier même cette logique en complétant la preuve pour vous-même.)** Donc, nous n'avons vraiment qu'à **mimer la preuve du théorème 5.4**. »*

Soit $\{p^m\}$ une suite de prix strictement positifs convergeant vers $\bar p\neq0$ avec $\bar p_k=0$ pour un bien $k$. On veut montrer que pour un bien $k'$ avec $\bar p_{k'}=0$, la suite $\{z_{k'}(p^m)\}$ est **non bornée**.

> *« Rappelez-vous que **notre premier pas dans la preuve du théorème 5.4 était d'identifier un consommateur dont le revenu était strictement positif au vecteur de prix limite $\bar p$. C'est ici que nous utiliserons la nouvelle condition sur la production agrégée nette.** »*

</details>

<details class="details--riche">
<summary>

**Le pas où la condition $y+\sum_i e^i\gg0$ intervient — à connaître**

</summary>

Parce que $y+\sum_{i}e^i\gg0$ pour un $y$, et parce que **$\bar p\neq0$ n'a aucune composante négative** :

$$\bar p\cdot\Big(y+\sum_{i=1}^{I}e^i\Big)\ >\ 0$$

Alors, $m^i(p)$ et $\Pi^j(p)$ étant bien définis pour tout $p\geq0$ :

$$\begin{aligned}
\sum_{i\in\mathcal{I}}m^i(\bar p)&=\sum_{i\in\mathcal{I}}\Big[\bar p\cdot e^i+\sum_{j\in\mathcal{J}}\theta^{ij}\Pi^j(\bar p)\Big]\\[4pt]
&=\bar p\cdot\sum_{i\in\mathcal{I}}e^i+\sum_{j\in\mathcal{J}}\Pi^j(\bar p)\\[4pt]
&\geq\ \bar p\cdot\sum_{i\in\mathcal{I}}e^i+\bar p\cdot y\\[4pt]
&=\ \bar p\cdot\Big(y+\sum_{i=1}^{I}e^i\Big)\ >\ 0
\end{aligned}$$

**La justification de chaque pas, mot pour mot :**

| Pas | Justification donnée par le livre |
|---|---|
| 1ʳᵉ égalité | *« la définition de $m^i(\bar p)$ »* |
| 2ᵉ égalité | *« le revenu total hors dotation est simplement **les profits agrégés** »* — car $\sum_i\theta^{ij}=1$ |
| **inégalité faible** | *« le **théorème 5.11**, qui garantit que **la somme des profits maximisés des firmes individuelles doit être au moins aussi grande que le profit agrégé maximisé**, et donc que le profit agrégé venant de $y$ »* |

> *« Donc, **il doit exister au moins un consommateur dont le revenu aux prix $\bar p$ est strictement positif**. Le reste de la preuve procède maintenant comme dans la preuve du théorème 5.4, et nous vous laissons le compléter en exercice. **(Vous devrez utiliser le résultat noté au théorème 5.12 que $m^i(p)$ est continue sur $\mathbb{R}^n_+$.)** »*

</details>

### 5.5 Deux remarques de clôture

> *« Comme avant, parce que **l'excédent de demande est homogène de degré zéro**, quand des prix d'équilibre walrasien existent, ils **ne seront pas uniques**. »*

> *« Notez aussi qu'à nouveau, l'hypothèse que chaque $u^i$ est **fortement croissante** (et strictement quasiconcave) sur tout $\mathbb{R}^n_+$ **exclut les fonctions d'utilité Cobb-Douglas**. Cependant, il vous est demandé de montrer en **exercice 5.14** que, sous l'hypothèse 5.2 sur le secteur productif, **la fonction d'excédent de demande agrégée satisfait néanmoins toutes les conditions du théorème 5.3 même quand les utilités sont de forme Cobb-Douglas**. »*

⚠️ **C'est exactement ce qui autorise l'exemple 5.2 qui suit.**

## 🔴 Concept 6 — L'exemple 5.2 : l'économie de Robinson Crusoé

### 6.1 La mise en scène

> *« Dans l'économie classique de Robinson Crusoé, **toute la production et toute la consommation sont effectuées par un seul consommateur**. **Robinson le consommateur** vend son temps de travail $h$ (en heures) à **Robinson le producteur**, qui utilise à son tour les services de travail du consommateur pendant ce temps pour produire des noix de coco $y$, qu'il vend ensuite à Robinson le consommateur. **Tous les profits** de la production et de la vente de noix de coco **sont distribués à Robinson le consommateur**. »*

> *« Avec une seule firme, **l'ensemble de possibilités de production de la firme et celui de l'économie coïncident**. »*

### 6.2 Les données

$$Y=\big\{(-h,\,y)\ \big|\ 0\leq h\leq b,\ \text{ et }\ 0\leq y\leq h^\alpha\big\}, \qquad b>0,\ \alpha\in(0,1)$$

> *« Ainsi, par exemple, le vecteur de production $(-2,\,2^\alpha)$ est dans l'ensemble de production, ce qui signifie **qu'il est possible de produire $2^\alpha$ noix de coco en utilisant 2 heures du temps de Robinson**. »*

$$u(h,y)=h^{1-\beta}y^\beta,\qquad \beta\in(0,1),\qquad e=(T,0),\ T>0$$

> *« Ici, $h$ désigne **le nombre d'heures consommées par Robinson (le loisir, si vous voulez)**, et $y$ le nombre de noix de coco consommées. »*

### 6.3 Le rôle de $b$, et pourquoi il ne compte pas

> *« Notez que le paramètre $b$ sert à **borner l'ensemble de production**. Parce que **cette borne est présente à des fins purement techniques, n'y pensez pas trop**. Dans un instant, nous la choisirons **assez grande pour qu'elle soit sans effet**. »*

> *« Nous choisirons maintenant $b$ assez grand pour que $b>T$. Par conséquent, **dans tout équilibre walrasien, la contrainte $h\leq b$ pour la firme ne sera pas saturée**, parce qu'à l'équilibre **le nombre d'heures demandées par la firme ne peut pas excéder le nombre total d'heures disponibles, $T$**. »*

### 6.4 L'obstacle formel et sa levée

> *« Cette économie satisfait toutes les hypothèses du théorème 5.13 **sauf que l'utilité de Robinson, étant de forme Cobb-Douglas, n'est ni fortement croissante ni strictement quasiconcave sur tout $\mathbb{R}^n_+$**. Cependant, comme il vous est demandé de le montrer en **exercice 5.14**, la fonction d'excédent de demande agrégée résultante **satisfait néanmoins les conditions du théorème 5.3**. Par conséquent, **un équilibre walrasien en prix strictement positifs est garanti d'exister**. Nous en calculons un maintenant. »*

**Les prix :** $p>0$ pour les noix de coco, $w>0$ par heure du temps de Robinson — *« ainsi, il est logique de penser à $w$ comme un **taux de salaire** »*.

### 6.5 La figure 5.7

> **La figure 5.7 en trois panneaux.** **(a)** L'ensemble $Y$, borné à gauche par $-b$, dont la frontière supérieure porte l'étiquette $y=(-h)^\alpha$ *(le PDF perd les parenthèses)*. L'axe horizontal porte $h\leq0$ — la firme **achète** des heures. **(b)** Le budget **avant profits** : $py+wh=wT$, passant par la dotation $e=(T,0)$. **(c)** Le budget **après profits** : $py+wh=wT+\Pi$, translaté vers le haut, l'intercept horizontal supplémentaire valant $\Pi/w$.

### 6.6 Le problème de la firme

> *« Parce qu'il ne paie jamais à la firme de gaspiller les heures achetées, elle choisira toujours $(-h,y)\in Y$ tel que **$y=h^\alpha$**. »*

La firme choisit $h\geq0$ pour maximiser

$$p\,h^\alpha-w\,h$$

> *« Quand $\alpha<1$, $h=0$ **ne sera pas** maximisateur de profit (comme nous le verrons) ; donc les conditions du premier ordre requièrent de poser la dérivée par rapport à $h$ égale à zéro, i.e. »*

$$\alpha p\,h^{\alpha-1}-w=0$$

**En réécrivant, et en rappelant que $y=h^\alpha$ :**

$$\boxed{\;h^f=\left(\frac{\alpha p}{w}\right)^{1/(1-\alpha)}\qquad\qquad y^f=\left(\frac{\alpha p}{w}\right)^{\alpha/(1-\alpha)}\;}$$

> **Note de bas de page du livre.** *« Au cas où vous suivriez les conventions de signe, cela signifie que $(-h^f,\,y^f)\in Y$. »*

**Les profits qui en résultent :**

$$\Pi(w,p)=\frac{1-\alpha}{\alpha}\,w\left(\frac{\alpha p}{w}\right)^{1/(1-\alpha)}$$

> *« Notez que **les profits sont positifs tant que les prix le sont**. (Ceci montre que choisir $h=0$ **n'est pas** maximisateur de profit, comme nous l'avions affirmé plus haut.) »*

<details class="details--riche">
<summary>

**Vérification du calcul de $\Pi(w,p)$ — reconstitution**

</summary>

*Le livre donne le résultat sans détailler ; voici le calcul complet.*

Posons $A\equiv h^f=(\alpha p/w)^{1/(1-\alpha)}$, de sorte que $y^f=A^\alpha$.

**Étape 1 — utiliser la CPO.** Elle s'écrit $\alpha p\,A^{\alpha-1}=w$, donc

$$p\,A^\alpha=\frac{w}{\alpha}\,A$$

**Étape 2 — substituer dans le profit.**

$$\Pi=p\,y^f-w\,h^f=p\,A^\alpha-wA=\frac{w}{\alpha}A-wA=wA\left(\frac1\alpha-1\right)=\frac{1-\alpha}{\alpha}\,wA$$

En remplaçant $A$ :

$$\Pi(w,p)=\frac{1-\alpha}{\alpha}\,w\left(\frac{\alpha p}{w}\right)^{1/(1-\alpha)} \quad\checkmark$$

⚠️ **Le pas 1 est l'astuce** : plutôt que de développer les exposants, on réutilise la CPO pour éliminer $p$.

</details>

### 6.7 Le problème du consommateur

> *« Le revenu de Robinson est la somme de son **revenu de dotation**, $(w,p)\cdot(T,0)=wT$, et de son **revenu de sa propriété à 100 % de la firme**, $\Pi(w,p)$. »*

$$p\,y+w\,h=wT+\Pi(w,p)$$

> *« qui sera satisfaite **avec égalité** parce que sa fonction d'utilité est **strictement croissante** »*

> *« Vous êtes maintenant familier des fonctions de demande d'un consommateur à utilité Cobb-Douglas. Il dépensera **la fraction $1-\beta$** de son revenu total en $h$ et **la fraction $\beta$** en $y$. »*

$$h^c=\frac{(1-\beta)\big(wT+\Pi(w,p)\big)}{w}\qquad\qquad y^c=\frac{\beta\big(wT+\Pi(w,p)\big)}{p}$$

### 6.8 Les deux simplifications, puis le calcul de $w^*$

> *« Il y a **deux simplifications** que nous pouvons faire. La première est que parce que **l'excédent de demande agrégé est homogène de degré zéro**, et que nous avons la garantie d'un équilibre walrasien en prix strictement positifs, **nous pouvons poser $p^*=1$ sans aucune perte**. La seconde est que **nous n'avons plus qu'à trouver un prix $w^*$ qui clarifie le marché de $h$, parce que par la loi de Walras, le marché de $y$ se clarifiera aussi**. »*

Il reste donc à trouver $w^*$ tel que $h^c+h^f=T$, soit, avec $p^*=1$ :

$$\frac{(1-\beta)\big(w^*T+\Pi(w^*,1)\big)}{w^*}+\left(\frac{\alpha}{w^*}\right)^{1/(1-\alpha)}=T$$

**En substituant les profits de la firme :**

$$\frac{(1-\beta)(1-\alpha)}{\alpha}\left(\frac{\alpha}{w^*}\right)^{1/(1-\alpha)}+\left(\frac{\alpha}{w^*}\right)^{1/(1-\alpha)}=\beta T$$

**Le salaire d'équilibre :**

$$\boxed{\;w^*=\alpha\left(\frac{1-\beta(1-\alpha)}{\alpha\beta T}\right)^{1-\alpha}\ >\ 0\;}$$

> *« **Nous vous invitons à vérifier** que pour cette valeur de $w^*$, et avec $p^*=1$, **les deux marchés se clarifient bien**. »*

<details class="details--riche">
<summary>

**Les deux passages du calcul — reconstitution complète**

</summary>

*Le livre écrit « en substituant… pour arriver à la seconde égalité » et « il est direct maintenant de résoudre ». Voici les deux passages, entièrement.*

**Passage 1 — de la condition de clarification à l'équation en $X$.**

Développons le premier terme :

$$\frac{(1-\beta)\big(w^*T+\Pi\big)}{w^*}=(1-\beta)T+(1-\beta)\frac{\Pi}{w^*}$$

L'équation $h^c+h^f=T$ devient donc

$$(1-\beta)T+(1-\beta)\frac{\Pi}{w^*}+\left(\frac{\alpha}{w^*}\right)^{1/(1-\alpha)}=T$$

**Soustraire $(1-\beta)T$** des deux côtés laisse $\beta T$ à droite :

$$(1-\beta)\frac{\Pi}{w^*}+\left(\frac{\alpha}{w^*}\right)^{1/(1-\alpha)}=\beta T$$

Or, avec $p^*=1$, la formule des profits donne

$$\frac{\Pi}{w^*}=\frac{1-\alpha}{\alpha}\left(\frac{\alpha}{w^*}\right)^{1/(1-\alpha)}$$

d'où la seconde équation du livre.

**Passage 2 — résoudre en $w^*$.**

Posons $X\equiv\big(\alpha/w^*\big)^{1/(1-\alpha)}$. L'équation devient

$$X\left[\frac{(1-\beta)(1-\alpha)}{\alpha}+1\right]=\beta T \quad\Longleftrightarrow\quad X\cdot\frac{(1-\beta)(1-\alpha)+\alpha}{\alpha}=\beta T$$

**Le crochet se simplifie remarquablement :**

$$(1-\beta)(1-\alpha)+\alpha=1-\alpha-\beta+\alpha\beta+\alpha=1-\beta+\alpha\beta=\boxed{1-\beta(1-\alpha)}$$

Donc

$$X=\frac{\alpha\beta T}{1-\beta(1-\alpha)} \qquad\Longleftrightarrow\qquad \frac{\alpha}{w^*}=\left(\frac{\alpha\beta T}{1-\beta(1-\alpha)}\right)^{1-\alpha}$$

**En inversant :**

$$w^*=\alpha\left(\frac{1-\beta(1-\alpha)}{\alpha\beta T}\right)^{1-\alpha} \quad\checkmark$$

⚠️ **Vérification de signe** : $\beta\in(0,1)$ et $\alpha\in(0,1)$ donnent $\beta(1-\alpha)<1$, donc $1-\beta(1-\alpha)>0$ et $w^*>0$.

**Lecture économique** *(enrichissement)* : $w^*$ **décroît avec $T$** — plus le temps disponible est abondant, moins l'heure vaut cher. Il **croît avec $\alpha$** au numérateur direct, la productivité marginale du travail entrant directement dans la CPO $\alpha p h^{\alpha-1}=w$.

</details>

### 6.9 La figure 5.8 et l'efficacité

> **La figure 5.8 en trois panneaux.** **(a)** La solution de **la firme** : la droite $\Pi^*=py+wh$ est une **droite d'iso-profit**. **(b)** La solution du **consommateur** sous $py+wh=wT+\Pi^*$. **(c)** La **superposition** : le point $T$ du consommateur est placé sur l'origine de la firme. Origine du consommateur $=0^c$, origine de la firme $=0^f$. Le point $A$ est **l'allocation d'équilibre walrasien** ; le point $B$ est **technologiquement possible mais infaisable**.

**Sur les droites d'iso-profit :**

> *« La droite donnée par $\Pi^*=py+wh$ est une **droite d'iso-profit** pour la firme, parce que **les profits sont constants et égaux à $\Pi^*$ pour tout $(h,y)$ dessus**. Notez que quand $(h,y)\in Y$, **$h\leq0$**, de sorte que $py+wh$ est bien **la formule correcte** pour les profits dans la figure. Notez aussi que **cette droite d'iso-profit (et toutes les autres) a pour pente $-w/p$**. »*

> *« De plus, **la droite d'iso-profit représentée donne les profits les plus élevés possibles** pour la firme, parce que des profits plus élevés **requerraient un plan de production au-dessus de la droite d'iso-profit $\Pi^*$, et aucun d'eux n'est dans l'ensemble de production**. Donc $\Pi^*=\Pi(w^*,1)$. »*

**La tangence :**

> *« Notez que **la pente de la contrainte budgétaire du consommateur est $-w/p$, qui est la même que la pente de la droite d'iso-profit de la firme**. »*

⚠️ **C'est la condition de tangence de l'équilibre**, en version production/consommation.

### 6.10 Pourquoi l'allocation $A$ est Pareto-efficace

> *« Considérez la région ombrée dans la figure. **Avec l'origine en $0^f$, la région ombrée désigne l'ensemble des plans de production RÉALISABLES** — ceux qui peuvent être effectivement mis en œuvre dans cette économie, **compte tenu des ressources disponibles**. »*

> *« En revanche, **un plan de production comme le point $B$ est technologiquement possible parce qu'il est dans l'ensemble de production, mais il est INFAISABLE parce qu'il requiert plus de $T$ heures**. »*

> *« En changeant de point de vue, en considérant $0^c$ comme l'origine, **la région ombrée indique l'ensemble des paniers de consommation réalisables** pour cette économie. Avec cela à l'esprit, **il est clair que l'allocation walrasienne en $A$ est Pareto-efficace. Elle maximise l'utilité de Robinson parmi tous les paniers de consommation réalisables.** »*

> *« Bientôt, nous montrerons que, **exactement comme dans le cas d'une économie d'échange pur, c'est un résultat plutôt général même avec la production**. »*

⚠️ **La distinction possible / réalisable est le cœur du panneau (c).** $B\in Y$ mais $B\notin$ région ombrée.

## 🔴 Concept 7 — Pourquoi la bornitude des ensembles de production doit disparaître

*C'est un des passages les plus importants — et les plus argumentés — du chapitre.*

### 7.1 Le premier argument : elle n'a pas sa place dans une description de technologie

> *« L'ensemble de possibilités de production est censé décrire **la technologie de la firme, rien de plus**. Il décrit **combien de divers outputs peuvent être produits avec différentes quantités de divers inputs**. Ainsi, **si la quantité d'inputs appliqués au processus croît sans borne, la quantité d'output produite le pourrait aussi**. Donc, le premier point est qu'**il n'y a simplement pas de place dans la description de la technologie elle-même pour des bornes sur les quantités d'inputs disponibles**. »*

### 7.2 L'objection pratique — et le trait d'humour du livre

> *« Cependant, ceci pourrait ne pas impressionner une personne pratique. **Après tout, qui se soucie qu'il soit possible de remplir l'univers de stylos-plume si la majeure partie de l'univers était remplie d'encre !** N'est-il pas suffisant de décrire la technologie seulement pour les plans de production qui sont **effectivement réalisables** ? »*

### 🔴 7.3 La vraie réponse — l'argument décisif

> *« D'une part, la réponse est oui, parce qu'à l'équilibre les plans de production **doivent en fait être réalisables**. **Mais il y a une difficulté plus subtile et plus importante.** »*

> *« **Quand nous imposons des contraintes sur les possibilités de production fondées sur l'offre agrégée, alors nous supposons implicitement que la firme prend ces contraintes agrégées d'input en compte en prenant ses décisions de maximisation du profit.** »*

**L'exemple de l'encre, en entier :**

> *« Par exemple, si nous bornons l'ensemble de production d'un producteur de stylos parce que **l'offre d'encre est finie**, alors **à des prix d'encre très bas, la demande d'encre du producteur sera contre cette contrainte**. Mais **n'était cette contrainte, le producteur demanderait encore plus d'encre au prix bas actuel**. »*

> *« Ainsi, en imposant cette contrainte de faisabilité apparemment innocente sur les possibilités de production, **nous avons SECTIONNÉ le lien capital entre PRIX et EXCÉDENT DE DEMANDE**. Et en effet, **c'est là l'essence même du modèle concurrentiel**. »*

$$\boxed{\;\text{Producteurs et consommateurs décident en fonction des PRIX,}\\\text{PAS de savoir s'il y a assez du bien pour satisfaire leur demande.}\;}$$

> *« Ainsi, **imposer la bornitude sur l'ensemble de production va entièrement à l'encontre de l'aspect décentralisé du marché concurrentiel que nous essayons de saisir**. **(Un argument semblable peut être fait contre le placement de bornes supérieures sur l'ensemble de consommation.)** »*

### 7.4 La rassurance — et la méthode standard

> *« Heureusement, **l'hypothèse de bornitude n'est pas nécessaire**. Cependant, **ne désespérez pas que tout le travail difficile que nous avons fait ait été gaspillé**. Il s'avère qu'**une méthode standard de démonstration de l'existence sans ensembles de production bornés est de la prouver d'abord en plaçant des bornes ARTIFICIELLES sur eux (ce qui est essentiellement ce que nous avons fait), puis en laissant les bornes artificielles devenir arbitrairement grandes (ce que nous ne ferons pas)**. Sous des conditions convenables, ceci donnera un équilibre concurrentiel de l'économie avec ensembles de production non bornés. »*

### 7.5 Ce qui est vraiment nécessaire — et Kakutani

> *« Pour mémoire, **la convexité stricte des préférences et la forte convexité des ensembles de possibilités de production supposées au théorème 5.13 sont plus exigeantes que nécessaire** pour prouver l'existence de l'équilibre. Si, au lieu de cela, **la simple convexité** des préférences et des ensembles de production est supposée, **l'existence peut encore être prouvée**, quoique les techniques mathématiques requises soient **hors de la portée de ce livre**. »*

| Ce qu'on relâche | Ce qui apparaît | Le remède |
|---|---|---|
| Forte convexité de $Y^j$ → simple convexité | **Rendements d'échelle constants** possibles ⟹ *« les fonctions d'offre et de demande seront des **relations à valeurs d'ensembles** et ne seront pas continues au sens usuel »* | **Correspondances** + continuité généralisée |
| Stricte quasiconcavité de $u^i$ → simple quasiconcavité | *« la possibilité de **fonctions de demande à valeurs d'ensembles** avec des problèmes de continuité semblables »* | idem |
| Le théorème du point fixe | Brouwer ne suffit plus | **Kakutani (1941)** |

> *« Tout ceci peut être traité en adoptant des **fonctions généralisées (appelées « correspondances »)**, une notion de continuité convenablement généralisée, puis en appliquant **une version généralisée du théorème du point fixe de Brouwer due à Kakutani (1941)**. »*

> *« En fait, **nous pouvons même nous passer complètement de la convexité des ensembles de production individuels, du moment que l'ensemble de production AGRÉGÉ est convexe**. Le lecteur intéressé devrait consulter **Debreu (1959)**. Mais voir aussi l'**exercice 5.22**. »*

## 🔴 Concept 8 — Le bien-être avec production (théorèmes 5.14 et 5.15)

### 8.1 La WEA avec production

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 5.8 — WEA dans une économie avec production</span>

Soit $p^*\gg0$ un équilibre walrasien pour l'économie $(u^i,e^i,\theta^{ij},Y^j)$. Alors **le couple** $\big(x(p^*),\,y(p^*)\big)$ est une **allocation d'équilibre walrasien (WEA)**, où $x(p^*)=(x^1,\dots,x^I)$ est le vecteur dont la $i$-ème entrée est le panier maximisant l'utilité demandé par $i$ aux prix $p^*$ et au revenu $m^i(p^*)$ ; et où $y(p^*)=(y^1,\dots,y^J)$ est le vecteur des plans de production maximisant le profit aux prix $p^*$. *(Notez alors que parce que $p^*$ est un équilibre walrasien, $\sum_i x^i=\sum_i e^i+\sum_j y^j$.)*

</div>

⚠️ **La WEA est désormais un COUPLE**, pas un seul vecteur. C'est la différence de forme la plus visible avec la définition 5.6 (fiche 511).

**Les trois conditions, telles que le livre les résume :**

> *« En d'autres termes, une allocation de consommation et de production est une WEA aux prix $p^*$ si **(1)** le panier de chaque consommateur est **le plus préféré dans son ensemble budgétaire** aux prix $p^*$, **(2)** le plan de production de chaque firme est **maximisateur de profit dans son ensemble de possibilités de production** aux prix $p^*$, et **(3)** **la demande égale l'offre sur chaque marché**. »*

### 8.2 La réalisabilité et l'efficacité de Pareto

Une allocation $(x,y)=\big((x^1,\dots,x^I),(y^1,\dots,y^J)\big)$ est **réalisable** si

$$x^i\in\mathbb{R}^n_+\ \forall i,\qquad y^j\in Y^j\ \forall j,\qquad \sum_{i\in\mathcal{I}}x^i=\sum_{i\in\mathcal{I}}e^i+\sum_{j\in\mathcal{J}}y^j$$

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 5.9 — Allocation Pareto-efficace avec production</span>

L'allocation réalisable $(x,y)$ est **Pareto-efficace** s'il n'existe **aucune** autre allocation réalisable $(\bar x,\bar y)$ telle que $u^i(\bar x^i)\geq u^i(x^i)$ pour tout $i\in\mathcal{I}$ **avec au moins une inégalité stricte**.

</div>

### 🔴 8.3 L'ampleur de la tâche du planificateur — avec production

> *« Ce serait **une bien belle affaire** que de tenter d'allouer les ressources d'une manière qui soit Pareto-efficace. **Non seulement il vous faudrait de l'information sur les préférences des consommateurs, mais vous auriez aussi besoin d'une connaissance détaillée des technologies de toutes les firmes et de la productivité de tous les inputs.** En particulier, **vous devriez affecter les individus ayant des compétences particulières aux firmes qui requièrent ces compétences**. **Ce serait une entreprise colossale.** »*

> *« **Et pourtant, avec apparemment aucune direction centrale, les allocations obtenues comme équilibres walrasiens sont Pareto-efficaces**, comme nous le démontrons maintenant. »*

**Comparez à la fiche 511** : l'argument est le même, mais **la charge informationnelle du planificateur a explosé** — il ne s'agit plus seulement des préférences, mais aussi des technologies **et de l'appariement compétences/firmes**.

### 8.4 Le premier théorème du bien-être avec production

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 5.14 — Premier théorème du bien-être avec production</span>

Si chaque $u^i$ est **strictement croissante** sur $\mathbb{R}^n_+$, alors **toute allocation d'équilibre walrasien est Pareto-efficace**.

</div>

⚠️ **L'hypothèse est minimale** : rien d'autre que la stricte croissance. Ni convexité, ni différentiabilité.

<details class="details--riche">
<summary>

**La preuve du théorème 5.14 — à savoir dérouler**

</summary>

Supposons que $(x,y)$ est une WEA aux prix $p^*$ **mais n'est pas Pareto-efficace**, et dérivons une contradiction.

**Pas 1 — la réalisabilité de la WEA.**

$$\sum_{i\in\mathcal{I}}x^i=\sum_{j\in\mathcal{J}}y^j+\sum_{i\in\mathcal{I}}e^i \tag{P.1}$$

**Pas 2 — l'inefficacité fournit une allocation dominante.** Il existe $(\hat x,\hat y)$ réalisable telle que

$$u^i(\hat x^i)\geq u^i(x^i),\quad i\in\mathcal{I} \tag{P.2}$$

avec **au moins une stricte**.

**Pas 3 — le lemme 5.2.** *(Celui de la fiche 511 — il ne concerne que les consommateurs et s'applique tel quel.)*

$$p^*\cdot\hat x^i\geq p^*\cdot x^i,\quad i\in\mathcal{I} \tag{P.3}$$

avec **au moins une stricte**.

**Pas 4 — sommer sur les consommateurs.**

$$\sum_{i\in\mathcal{I}}p^*\cdot\hat x^i\ >\ \sum_{i\in\mathcal{I}}p^*\cdot x^i \tag{P.4}$$

**Pas 5 — remplacer par les réalisabilités.** (P.4) avec (P.1) et **la réalisabilité de $(\hat x,\hat y)$** donne

$$p^*\cdot\Big(\sum_{j\in\mathcal{J}}\hat y^j+\sum_{i\in\mathcal{I}}e^i\Big)\ >\ p^*\cdot\Big(\sum_{j\in\mathcal{J}}y^j+\sum_{i\in\mathcal{I}}e^i\Big)$$

Les dotations **s'annulent** :

$$p^*\cdot\sum_{j\in\mathcal{J}}\hat y^j\ >\ p^*\cdot\sum_{j\in\mathcal{J}}y^j$$

**Pas 6 — la contradiction.**

> *« Cependant, ceci signifie que $p^*\cdot\hat y^j>p^*\cdot y^j$ **pour une certaine firme $j$**, où $\hat y^j\in Y^j$. **Ceci contredit le fait qu'à l'équilibre walrasien, $y^j$ maximise le profit de la firme $j$ aux prix $p^*$.** »* $\blacksquare$

</details>

### 🔴 8.5 Le point de structure à retenir de cette preuve

**La preuve du théorème 5.14 est celle du théorème 5.7 avec UN seul pas de plus.**

| Fiche 511 (échange pur) | Fiche 512 (avec production) |
|---|---|
| Sommer les inégalités de prix | **Idem** |
| Contredire la **faisabilité de la coalition** | Contredire la **maximisation du profit d'une firme** |

Le lemme 5.2 est réutilisé **sans modification** — il ne parle que des consommateurs.

⚠️ **Le pas subtil est le 6** : de « la somme des profits augmente » on passe à « **un** profit individuel augmente ». C'est valide parce qu'une somme ne croît que si au moins un terme croît.

### 8.6 Le second théorème du bien-être avec production

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 5.15 — Second théorème du bien-être avec production</span>

Supposons que **(i)** chaque $u^i$ satisfait l'hypothèse 5.1, **(ii)** chaque $Y^j$ satisfait l'hypothèse 5.2, **(iii)** $y+\sum_{i}e^i\gg0$ pour un certain plan agrégé $y$, et **(iv)** l'allocation $(\hat x,\hat y)$ est **Pareto-efficace**. Alors il existe des **transferts de revenu** $T_1,\dots,T_I$ satisfaisant $\sum_{i}T_i=0$, et un vecteur de prix $\bar p$, tels que **1.** $\hat x^i$ **maximise** $u^i(x^i)$ s.c. $\bar p\cdot x^i\leq m^i(\bar p)+T_i$, $i\in\mathcal{I}$ ; **2.** $\hat y^{\,j}$ **maximise** $\bar p\cdot y^j$ s.c. $y^j\in Y^j$, $j\in\mathcal{J}$.

</div>

⚠️ **Comparez à l'énoncé de la fiche 511.** En échange pur, on redistribuait **les dotations**. Ici, le théorème est formulé avec des **transferts monétaires $T_i$** de somme nulle — c'est déjà la lecture « corollaire 5.1 » : **seule la valeur compte**.

### 8.7 L'astuce de la preuve : translater les ensembles de production

<details class="details--riche">
<summary>

**La preuve du théorème 5.15 — à savoir dérouler**

</summary>

**Pas 0 — l'astuce.** Pour chaque $j\in\mathcal{J}$, poser

$$\bar Y^j\equiv Y^j-\{\hat y^{\,j}\}$$

> *« et notez qu'ainsi défini, **chaque $\bar Y^j$ satisfait l'hypothèse 5.2** »*

⚠️ **Pourquoi.** La translation préserve la fermeture, la bornitude et la forte convexité ; et $0\in\bar Y^j$ **par construction**, puisque $\hat y^{\,j}\in Y^j$.

**Pas 1 — l'économie auxiliaire.** Considérer

$$\bar E=\big(u^i,\ \hat x^i,\ \theta^{ij},\ \bar Y^j\big)_{i\in\mathcal{I},j\in\mathcal{J}}$$

> *« obtenue de l'économie originale **en remplaçant la dotation $e^i$ par la dotation $\hat x^i$**, et **en remplaçant chaque ensemble de production $Y^j$ par $\bar Y^j$**. Il est direct de montrer, en utilisant les hypothèses (i) à (iii), que $\bar E$ satisfait toutes les hypothèses du **théorème 5.13**. Par conséquent, $\bar E$ possède un équilibre walrasien $\bar p\gg0$ et une WEA associée $(\bar x,\bar y)$. »*

**Pas 2 — chacun peut s'offrir sa dotation.**

> *« Or, parce que **$0\in\bar Y^j$ pour toute firme $j$**, les profits de toute firme sont **non négatifs** à l'équilibre, de sorte que **chaque consommateur peut s'offrir son vecteur de dotation**. »*

$$u^i(\bar x^i)\geq u^i(\hat x^i),\quad i\in\mathcal{I} \tag{P.1}$$

**Pas 3 — $(\bar x,\tilde y)$ est réalisable dans l'économie ORIGINALE.** Chaque $\bar y^{\,j}\in\bar Y^j$ s'écrit $\bar y^{\,j}=\tilde y^{\,j}-\hat y^{\,j}$ avec $\tilde y^{\,j}\in Y^j$, par définition de $\bar Y^j$. Comme $(\bar x,\bar y)$ est une WEA de $\bar E$, elle y est réalisable :

$$\begin{aligned}
\sum_{i}\bar x^i&=\sum_{i}\hat x^i+\sum_{j}\bar y^{\,j}\\
&=\sum_{i}\hat x^i+\sum_{j}\big(\tilde y^{\,j}-\hat y^{\,j}\big)\\
&=\underbrace{\sum_{i}\hat x^i-\sum_{j}\hat y^{\,j}}_{=\ \sum_i e^i}+\sum_{j}\tilde y^{\,j}\\
&=\sum_{i}e^i+\sum_{j}\tilde y^{\,j}
\end{aligned}$$

> *« où **la dernière égalité découle de la réalisabilité de $(\hat x,\hat y)$ dans l'économie originale** »*

**Pas 4 — l'efficacité force les égalités.**

> *« Nous pouvons conclure que **toute inégalité dans (P.1) doit être une égalité**, sinon $(\hat x,\hat y)$ **ne serait pas Pareto-efficace**. »*

**Pas 5 — la stricte quasiconcavité force $\bar x^i=\hat x^i$.**

> *« Mais la **stricte quasiconcavité** de $u^i$ implique alors que $\bar x^i=\hat x^i$, $i\in\mathcal{I}$, parce que **sinon un consommateur préférerait strictement la moyenne des deux paniers à $\bar x^i$, et la moyenne est abordable aux prix $\bar p$ parce que les deux paniers eux-mêmes sont abordables**. Ceci contredirait le fait que $(\bar x,\bar y)$ est une WEA pour $\bar E$ aux prix $\bar p$. »*

Donc

$$\hat x^i \text{ maximise } u^i(x^i) \text{ s.c. } \bar p\cdot x^i\leq \bar p\cdot\hat x^i+\sum_{j\in\mathcal{J}}\theta^{ij}\,\bar p\cdot\bar y^{\,j}$$

**Pas 6 — le pas le plus astucieux : les profits sont nuls.**

> *« Mais parce que l'utilité est **fortement croissante**, la contrainte budgétaire est **saturée** en $x^i=\hat x^i$, **ce qui implique que le revenu de profit de chaque consommateur $i$ est ZÉRO**. Ceci signifie que **toute firme doit gagner un profit nul**, ce qui signifie à son tour que **$\bar y^{\,j}=0$ pour toute firme $j$**. »*

**Pas 7 — remonter à l'économie originale.**

> *« Nous laissons en exercice de montrer que parce que $\bar y^{\,j}=0$ maximise le profit de la firme $j$ aux prix $\bar p$ quand son ensemble de production est $\bar Y^j$, alors (par la définition de $\bar Y^j$) **$\hat y^{\,j}$ maximise le profit de la firme $j$ aux prix $\bar p$ quand son ensemble de production est $Y^j$** (i.e. dans l'économie originale). »*

*(C'est l'**exercice 5.30**.)*

**Le bilan :**

$$\hat x^i \text{ maximise } u^i(x^i) \text{ s.c. } \bar p\cdot x^i\leq\bar p\cdot\hat x^i,\ i\in\mathcal{I} \tag{P.2}$$

$$\hat y^{\,j} \text{ maximise } \bar p\cdot y^j \text{ s.c. } y^j\in Y^j,\ j\in\mathcal{J} \tag{P.3}$$

**Pas 8 — construire les transferts.**

$$\boxed{\;T_i\equiv\bar p\cdot\hat x^i-m^i(\bar p)\;}\qquad\text{où}\qquad m^i(\bar p)=\bar p\cdot e^i+\sum_{j\in\mathcal{J}}\theta^{ij}\,\bar p\cdot\hat y^{\,j}$$

> *« Ces transferts **somment à zéro par la réalisabilité de $(\hat x,\hat y)$**, et lorsqu'ils sont employés (dans l'économie originale), **ils réduisent le problème de chaque consommateur à celui de (P.2)**. Par conséquent, (1) et (2) sont tous deux satisfaits. »* $\blacksquare$

</details>

### 8.8 Pourquoi les transferts somment à zéro

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — la vérification.</span>

Le livre dit « par la réalisabilité de $(\hat x,\hat y)$ » sans détailler. Voici le calcul :

$$\sum_i T_i=\sum_i\bar p\cdot\hat x^i-\sum_i\Big[\bar p\cdot e^i+\sum_j\theta^{ij}\,\bar p\cdot\hat y^{\,j}\Big]=\bar p\cdot\sum_i\hat x^i-\bar p\cdot\sum_i e^i-\sum_j\bar p\cdot\hat y^{\,j}$$

*(en utilisant $\sum_i\theta^{ij}=1$)*. Or la réalisabilité de $(\hat x,\hat y)$ donne exactement $\sum_i\hat x^i=\sum_i e^i+\sum_j\hat y^{\,j}$, donc la parenthèse s'annule et $\sum_i T_i=0$.

**Lecture** : les transferts ne sont qu'une **redistribution** de la richesse existante, jamais une création. C'est ce qui les rend implémentables sans ressource extérieure.

</div>

### 8.9 Le tableau de correspondance échange pur / production

| Objet | Échange pur (fiche 511) | Avec production (fiche 512) |
|---|---|---|
| L'économie | $(u^i,e^i)$ | $(u^i,e^i,\theta^{ij},Y^j)$ |
| Revenu | $p\cdot e^i$ | $p\cdot e^i+\sum_j\theta^{ij}\Pi^j(p)$ |
| Réalisabilité | $\sum_i x^i=\sum_i e^i$ | $\sum_i x^i=\sum_i e^i+\sum_j y^j$ |
| Condition d'existence | $\sum_i e^i\gg0$ | $y+\sum_i e^i\gg0$, un $y\in Y$ |
| WEA | un vecteur $x(p^*)$ | un **couple** $(x(p^*),y(p^*))$ |
| 1ᵉʳ thm bien-être | Thm 5.7 | **Thm 5.14** |
| 2ᵈ thm bien-être | Thm 5.8 (redistribuer $e$) | **Thm 5.15** (transferts $T_i$) |
| L'astuce du 2ᵈ | redistribuer à $\bar x$ | redistribuer à $\hat x$ **ET** translater $Y^j$ en $Y^j-\{\hat y^{\,j}\}$ |

## 🟠 Concept 9 — §5.4 : le temps et l'incertitude, sans changer de modèle

### 9.1 L'annonce

> *« Jusqu'à présent, nous avons considéré le problème de comment une économie de marché alloue les ressources à travers un système de prix concurrentiel dans ce qui **semble être un environnement statique**. Il n'y a eu **aucune mention du temps** dans le modèle. Ainsi, par exemple, les discussions sur **les taux d'intérêt, l'inflation, l'emprunt et le prêt semblent hors de portée. Mais en fait, il n'en est rien.** »*

> *« Le modèle que nous avons développé est en fait **tout à fait capable d'inclure non seulement le temps, les taux d'intérêt, l'emprunt et le prêt, mais aussi l'INCERTITUDE** sur beaucoup de choses, y compris l'état futur de l'économie, la valeur des actions et des obligations, et plus. »*

$$\boxed{\;\textbf{L'idée clé : RAFFINER la notion de bien pour inclure toutes les caractéristiques d'intérêt.}\;}$$

### 9.2 Le temps (§5.4.1)

> *« Si nous souhaitons inclure le temps dans notre modèle, alors nous **indexons simplement les biens non seulement par ce qu'ils sont**, e.g. pommes, oranges, etc., **mais aussi par la DATE à laquelle ils sont consommés (ou produits)**. »*

Avec $k=1,2$ et $t=1,2$, un panier est le vecteur de **quatre** nombres $(x_{11},x_{12},x_{21},x_{22})$.

> *« Mais si un panier de consommation est $(x_{11},x_{12},x_{21},x_{22})$, alors **conformément à notre convention jusqu'ici, nous devrions vraiment penser à chacune des quatre coordonnées comme représentant les quantités de biens DISTINCTS**. C'est-à-dire qu'avec deux biens « **de base** », pommes et oranges, et deux dates, aujourd'hui et demain, **nous avons en réalité QUATRE biens** — pommes aujourd'hui, pommes demain, oranges aujourd'hui, et oranges demain. »*

### 9.3 L'incertitude (§5.4.2)

> *« L'incertitude, elle aussi, peut être capturée en utilisant **la même technique**. »*

**L'exemple du livre** : deux états de la météo, $s=1$ il pleut, $s=2$ il fait soleil. On indexe $x_{ks}$ et $y_{ks}$.

**Les trois usages que le livre nomme :**

| Usage | Comment | Exemple du livre |
|---|---|---|
| Préférences dépendant de l'état | $u$ sur des paniers indexés par $s$ | *« des préférences tout à fait distinctes sur les parapluies quand il fait soleil et quand il pleut »* |
| Technologies dépendant de l'état | $Y^j$ dans l'espace indexé | *« les produits agricoles par exemple »* |
| **La demande d'assurance** | **Dotations dépendant de l'état** | *« de faibles dotations associées à un état (**incendie ou inondation**) et de fortes dotations à un autre »* |

⚠️ **C'est le troisième qui est le plus important** : l'assurance n'a besoin d'aucun objet nouveau — seulement de dotations qui varient avec l'état.

### 9.4 La construction complète (§5.4.3)

| Objet | Portée |
|---|---|
| Biens de base | $k=1,\dots,N$ |
| Dates | $t=1,\dots,T$ |
| Événements à la date $t$ | $s_t=1,\dots,S_t$, **mutuellement exclusifs et exhaustifs** |
| **État du monde** à la date $t$ | le **vecteur** $(s_1,\dots,s_t)$ des événements survenus **au début des dates 1 à $t$ incluses** |

Un panier est $x=(x_{kts})$, avec $x\in\mathbb{R}^{NM}_+$ où

$$M=S_1+S_1S_2+\dots+S_1S_2\cdots S_T$$

> *« est **le nombre total de couples date-état $(t,s)$** »*

$J$ firmes avec $Y^j\subseteq\mathbb{R}^{NM}$ ; $I$ consommateurs avec $u^i$ sur $\mathbb{R}^{NM}_+$, dotation $e^i\in\mathbb{R}^{NM}_+$ et parts $\theta^{ij}$.

> **Note de bas de page du livre.** *« On pourrait permettre aux parts de propriété de dépendre de la date et de l'état, mais nous ne le ferons pas. »*

### 🔴 9.5 Le point crucial : rien de nouveau

> *« **En termes de nos définitions précédentes, ceci est simplement une économie de propriété privée avec $n=NM$ biens.** »*

> *« Par exemple $x_{kts}=2$ désigne deux unités du bien $kts$, ou de façon équivalente **deux unités du bien de base $k$ à la date $t$ dans l'état $s$**. Ainsi, **nous traitons le même bien de base comme distinct quand il est consommé à des dates distinctes ou dans des états distincts**. »*

**La justification économique :**

> *« Après tout, **le montant qu'on est prêt à payer pour une automobile livrée aujourd'hui pourrait fort bien être plus élevé que le montant qu'on est prêt à payer pour la livraison d'une automobile par ailleurs identique dans six mois**. De ce point de vue, traiter le même bien de base à des dates distinctes (ou dans des états distincts) comme des biens distincts est **entièrement naturel**. »*

**Conséquence immédiate :**

> *« **Sous les hypothèses du théorème 5.13**, il existe un vecteur de prix $p^*\in\mathbb{R}^{NM}_{++}$ constituant **un équilibre walrasien pour cette économie de propriété privée**. En particulier, **la demande doit égaler l'offre pour chacun des $NM$ biens**, c'est-à-dire **pour chaque bien de base à chaque date et dans chaque état du monde**. »*

### 9.6 Comment lire les objets d'équilibre

**Côté firmes :** $\hat y^{\,j}=(\hat y^{\,j}_{kts})$ est le plan unique maximisant le profit.

> *« Ainsi, $\hat y^{\,j}$ est un **plan de production CONTINGENT maximisateur de profit**, décrivant **l'offre d'output et la demande d'input pour les $N$ biens de base contingentes à chaque date et à chaque état**. »*

**Côté consommateurs :** $\hat x^i=(\hat x^i_{kts})$.

> *« Ainsi $\hat x^i$ est **un plan de consommation CONTINGENT abordable maximisateur d'utilité** pour le consommateur $i$, spécifiant **sa consommation de chacun des biens de base contingente à chaque date et à chaque état**. »*

## 🔴 Concept 10 — La contrainte budgétaire unique et l'implémentation par contrats

### 10.1 Les deux équations qui gouvernent tout

**Marché par marché, la demande égale l'offre :**

$$\sum_{i\in\mathcal{I}}\hat x^i_{kts}=\sum_{j\in\mathcal{J}}\hat y^{\,j}_{kts}+\sum_{i\in\mathcal{I}}e^i_{kts}\qquad\text{pour tout } k,t,s \tag{5.6}$$

**Mais chaque consommateur n'a qu'UNE SEULE contrainte budgétaire, GLOBALE :**

$$\sum_{k,t,s}p^*_{kts}\hat x^i_{kts}=\sum_{k,t,s}p^*_{kts}e^i_{kts}+\sum_{j\in\mathcal{J}}\theta^{ij}\sum_{k,t,s}p^*_{kts}\hat y^{\,j}_{kts}\qquad\forall\,i\in\mathcal{I} \tag{5.7}$$

> *« chaque consommateur $i$ **n'a qu'une seule contrainte budgétaire liant ses dépenses sur tous les biens** »*

### 🔴 10.2 La conséquence : les déficits date-par-date sont permis

> *« En particulier, quand l'état $s'$ survient à la date $t'$, il **peut se trouver** que pour certain(s) consommateur(s) $i$, »*

$$\sum_{k}p^*_{kt's'}\hat x^i_{kt's'}\ >\ \sum_{k}p^*_{kt's'}e^i_{kt's'}+\sum_{j\in\mathcal{J}}\theta^{ij}\sum_{k}p^*_{kt's'}\hat y^{\,j}_{kt's'}$$

> *« C'est-à-dire que **les dépenses du consommateur $i$ en biens de base à la date $t'$ dans l'état $s'$ pourraient excéder son revenu à cette date et dans cet état**. **Est-ce que cela a un sens ?** »*

### 10.3 La réponse du livre — le passage à retenir par cœur

> *« La réponse est « **oui, cela a absolument un sens** ». En effet, **ce déficit budgétaire est l'expression de DEUX phénomènes économiques importants, à savoir l'EMPRUNT et l'ASSURANCE**. »*

| Le déficit | Ce qu'il signifie |
|---|---|
| **Emprunt** | *« Quand on emprunte à la date $t$, **on dépense effectivement plus que son revenu de dotation et de parts de profit à la date $t$** »* |
| **Assurance** | *« Quand on reçoit un versement d'assurance dû à une perte dans l'état $s$ (e.g. **incendie ou inondation**), alors à nouveau **on est capable de dépenser dans l'état $s$ plus que son revenu de dotation et de parts de profit** »* |

**Et symétriquement :**

> *« De l'autre côté de la médaille, **il peut très bien y avoir des états et des dates associés à des EXCÉDENTS budgétaires** (e.g. **quand on prête** ou **quand on fournit une assurance sur des états qui ne sont pas survenus**). »*

$$\boxed{\;\text{UNE contrainte globale (5.7) au lieu de } M \text{ contraintes}\ \Longleftrightarrow\ \text{EMPRUNT + ASSURANCE dans le modèle}\;}$$

### 10.4 L'implémentation : le marché de contrats à la date zéro

> *« Mais si le budget de chaque consommateur ne doit s'équilibrer **que globalement**, comme donné en (5.7), **alors comment cette allocation d'équilibre walrasien est-elle réellement implémentée ?** »*

> *« La réponse est la suivante. Pensez à **une date zéro antérieure à laquelle firmes et consommateurs participent à un MARCHÉ DE CONTRATS CONTRAIGNANTS**. »*

**Ce qu'est un contrat :**

> *« Un contrat est **un morceau de papier sur lequel est écrit un nombre réel non négatif, un bien de base $k$, une date $t$, et un état $s$**. Par exemple, le contrat $(107{,}6,\ k=3,\ t=2,\ s=7)$ **donne droit au porteur à 107,6 unités du bien de base $k=3$ à la date $t=2$ dans l'état $s=7$**. »*

### 10.5 La réinterprétation des objets d'équilibre en contrats

**Côté consommateur** — le **panier NET** $\hat x^i-e^i$ :

| Signe de $\hat x^i_{kts}-e^i_{kts}$ | Ce que le consommateur $i$ fait |
|---|---|
| $\geq0$ | *« $i$ a droit à **RECEVOIR du marché** $\hat x^i_{kts}-e^i_{kts}$ unités du bien de base $k$ à la date $t$ dans l'état $s$ »* |
| $<0$ | *« $i$ est **tenu de FOURNIR au marché** $\hat x^i_{kts}-e^i_{kts}$ unités du bien $k$ à la date $t$ dans l'état $s$ »* |

**Côté firme** — le plan $\hat y^{\,j}$ :

| Signe de $\hat y^{\,j}_{kts}$ | Ce que la firme $j$ fait |
|---|---|
| $\geq0$ *(output)* | **FOURNIR** au marché $\hat y^{\,j}_{kts}$ unités du bien $k$ à $(t,s)$ |
| $<0$ *(input)* | **RECEVOIR** du marché $\hat y^{\,j}_{kts}$ unités du bien $k$ à $(t,s)$ |

⚠️ **C'est encore la convention de signe du §5.3.1 qui fait tout le travail.**

### 10.6 Le déroulement temporel

> *« Enfin, notez que si pour chaque $k$, $t$ et $s$, **le prix d'un contrat par unité de bien de base $k$ à la date $t$ dans l'état $s$ est $p^*_{kts}$**, alors **à la date zéro le marché de contrats se clarifiera, les consommateurs maximisant leur utilité et les firmes leurs profits**. »*

> *« **Quand chaque date $t$ arrive et que n'importe quel état $s$ survient, les contrats pertinents pour cette date et cet état sont EXÉCUTÉS.** **La condition de clarification du marché (5.6) garantit que ceci est FAISABLE.** »*

> *« **Après l'échange initial de contrats en période zéro, AUCUN autre échange n'a lieu.** La seule activité ayant lieu à mesure que le temps passe et que les états surviennent est **l'exécution des contrats achetés et vendus à la date zéro**. »*

⚠️ **C'est le point le plus contre-intuitif du §5.4** : dans ce modèle, **tout le commerce a lieu une seule fois, avant que quoi que ce soit ne se passe.**

> **Le rôle des marchés au comptant** *(exercices 5.33 et 5.34)*. Le livre renvoie à l'exercice 5.33, qui montre que **si des marchés au comptant s'ouvraient ensuite, aucun échange supplémentaire n'aurait lieu** — chacun exécuterait simplement les contrats qu'il détient déjà. L'exercice 5.34 (**titres d'Arrow**) montre à l'inverse que **si l'on ne peut échanger a priori qu'un seul « bien » — un titre donnant droit à un dollar à la date $t$ dans l'état $s$ — alors les marchés au comptant ont bel et bien un rôle**, et l'équilibre contingent complet peut néanmoins être implémenté.

### 🔴 10.7 Les trois hypothèses cachées

> *« Fournissons maintenant plusieurs remarques importantes sur cette interprétation de notre modèle. »*

| # | L'hypothèse | Ce qu'elle exclut, mot pour mot |
|---|---|---|
| **1** | **Monitoring parfait** | *« il n'est pas possible pour une firme ou un consommateur **de prétendre qu'il peut fournir plus d'unités d'un bien de base dans l'état $s$ à la date $t$ qu'il ne peut réellement en fournir**. Ainsi, **LA FAILLITE EST SUPPOSÉE ABSENTE.** »* |
| **2** | **Information parfaite** | *« **toutes les firmes et tous les consommateurs sont informés de l'état quand il survient à chaque date**. Sinon, **si seuls certains agents étaient informés de l'état, ils pourraient avoir une incitation à MENTIR sur quel état est effectivement survenu.** »* |
| **3** | **Exécution parfaite** | *« **tous les contrats sont parfaitement exécutés** »* |

### 10.8 Le mot de la fin du §5.4

> *« **Clairement, chacune de ces hypothèses est forte et exclut des situations économiques importantes.** Néanmoins, **il est tout à fait remarquable combien de kilomètres supplémentaires nous sommes capables de tirer d'un modèle qui apparaît entièrement statique et déterministe, simplement en RÉINTERPRÉTANT ses variables !** »*

<div class="callout" data-kind="methode">

<span class="callout__lab">comment il fournit des théories de l'assurance, de l'emprunt et du prêt, des taux d'intérêt et de la valorisation d'actifs</span>

*« Les exercices explorent ce modèle plus avant, en examinant . »*

</div>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Un ensemble $Y$ donné + « vérifier l'hypothèse 5.2 » | **Hypothèse 5.2** | Tester $0\in Y$, fermé, borné, fortement convexe |
| « montrer que le plan optimal est unique » | **Exercice 5.23** | La **forte convexité** + $p\gg0$ |
| « prouver le théorème 5.10 » | **Exercice 5.24** | 1, 3, bornitude : direct ; **fermeture : via compacité** |
| Robinson Crusoé, un consommateur, une firme | **Exemple 5.2 / exercice 5.26** | Firme d'abord, consommateur ensuite, puis clarifier **un seul** marché |
| « trouver les prix relatifs qui clarifient les deux marchés » | **Loi de Walras** | Normaliser un prix, ne clarifier que l'**autre** marché |
| « compléter la preuve du théorème 5.13 » | **Exercice 5.25** | Vérifier les 3 conditions du théorème 5.3 |
| Utilités Cobb-Douglas dans un modèle général | **Exercice 5.14** | $u$ n'est pas fortement croissante ⟹ passer par le **théorème 5.3 directement** |
| « montrer que la WEA est Pareto-efficace » | **Théorème 5.14** | Lemme 5.2 → sommer → contredire la maximisation du **profit** |
| Une allocation efficace + « la soutenir » | **Théorème 5.15** | Translater les $Y^j$, appliquer 5.13, puis construire les $T_i$ |
| « $y=0$ résout $\max p\cdot y$ s.c. $y\in Y-y^0$ » | **Exercice 5.30** | C'est le **pas 7** du théorème 5.15 |
| Deux périodes, stockage, prix spot / futures | **Exercice 5.32** | Une firme de stockage, biens **datés** |
| Un modèle avec états, assurance | **§5.4.2** | Faire dépendre **la dotation** de l'état |
| « quel est le rôle des marchés au comptant ? » | **Exercices 5.33 / 5.34** | Sans titres d'Arrow : **aucun** ; avec : ils implémentent |

**Les trois réflexes de cadrage :**

1. **Lire les signes avant tout.** Un exercice de production se résout deux fois plus vite si l'on écrit d'emblée quels $y_k$ sont négatifs.
2. **Ne clarifier que $n-1$ marchés.** La loi de Walras donne le dernier gratuitement — le livre le fait explicitement dans l'exemple 5.2.
3. **Normaliser un prix à 1.** L'homogénéité de degré zéro l'autorise toujours.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Résoudre une économie de Robinson Crusoé complète

1. **Écrire $Y$** et vérifier que la borne $b$ sera **non saturée** *(choisir $b>T$)*.
2. **La firme d'abord.** Éliminer le gaspillage ($y=h^\alpha$), écrire $\max_h\ p\,h^\alpha-wh$, poser la **CPO** $\alpha p h^{\alpha-1}=w$, en tirer $h^f$ puis $y^f$.
3. **Calculer $\Pi(w,p)$** — en **réutilisant la CPO** pour éliminer $p$, pas en développant les exposants.
4. **Le consommateur.** Revenu $=wT+\Pi$ ; pour du Cobb-Douglas $h^{1-\beta}y^\beta$, les parts sont $1-\beta$ sur $h$ et $\beta$ sur $y$.
5. **Normaliser** $p^*=1$ *(homogénéité de degré 0)*.
6. **Clarifier un seul marché** : $h^c+h^f=T$ *(loi de Walras pour l'autre)*.
7. **Poser $X=(\alpha/w)^{1/(1-\alpha)}$**, factoriser, simplifier le crochet, inverser.

### Méthode 2 — Démontrer le premier théorème du bien-être avec production

1. Supposer $(x,y)$ WEA **non efficace** ⟹ il existe $(\hat x,\hat y)$ réalisable dominante.
2. **Lemme 5.2** consommateur par consommateur : $p^*\cdot\hat x^i\geq p^*\cdot x^i$ avec **une stricte**.
3. **Sommer** ⟹ inégalité **stricte** sur les dépenses totales.
4. **Substituer les deux réalisabilités** ⟹ les dotations s'annulent ⟹ $p^*\cdot\sum_j\hat y^{\,j}>p^*\cdot\sum_j y^j$.
5. **Descendre au niveau individuel** : une somme ne croît que si un terme croît ⟹ **une firme** fait mieux ⟹ contradiction avec la maximisation du profit.

### Méthode 3 — Démontrer le second théorème du bien-être avec production

1. **Translater** : $\bar Y^j\equiv Y^j-\{\hat y^{\,j}\}$ — vérifier que l'hypothèse 5.2 est **préservée** et que **$0\in\bar Y^j$**.
2. **Construire $\bar E=(u^i,\hat x^i,\theta^{ij},\bar Y^j)$** et appliquer le **théorème 5.13** ⟹ WEA $(\bar x,\bar y)$ aux prix $\bar p\gg0$.
3. $0\in\bar Y^j$ ⟹ profits $\geq0$ ⟹ chacun **peut s'offrir sa dotation** ⟹ $u^i(\bar x^i)\geq u^i(\hat x^i)$.
4. **Décomposer** $\bar y^{\,j}=\tilde y^{\,j}-\hat y^{\,j}$ et vérifier que $(\bar x,\tilde y)$ est **réalisable dans l'économie originale**.
5. **L'efficacité de $(\hat x,\hat y)$** force **toutes les égalités**.
6. La **stricte quasiconcavité** force $\bar x^i=\hat x^i$.
7. **La saturation du budget** force le revenu de profit à **zéro**, donc $\bar y^{\,j}=0$, donc *(exercice 5.30)* $\hat y^{\,j}$ maximise dans $Y^j$.
8. **Poser** $T_i\equiv\bar p\cdot\hat x^i-m^i(\bar p)$ et vérifier $\sum_i T_i=0$ par réalisabilité.

### Méthode 4 — Traiter un modèle avec temps ou incertitude

1. **Compter les biens** : $n=N\times M$, avec $M=S_1+S_1S_2+\dots+S_1\cdots S_T$.
2. **Ré-indexer** tout : $x_{kts}$, $y_{kts}$, $e_{kts}$, $p_{kts}$.
3. **Ne rien changer d'autre** — c'est une économie de propriété privée ordinaire à $n$ biens.
4. **Appliquer le théorème 5.13** tel quel.
5. **Réinterpréter** : $\hat x^i-e^i$ et $\hat y^{\,j}$ deviennent des **vecteurs de contrats** échangés à la **date zéro**.
6. Pour l'**emprunt / l'assurance** : chercher les couples $(t,s)$ où la contrainte **locale** est violée alors que (5.7) tient.

### Méthode 5 — Vérifier l'hypothèse 5.2 sur un $Y$ donné

| Condition | Ce qu'on vérifie concrètement |
|---|---|
| $0\in Y$ | Le vecteur nul appartient-il ? *(souvent immédiat par la définition avec $h=0$)* |
| Fermé | Les inégalités définissantes sont-elles **larges** et les fonctions **continues** ? |
| Borné | Y a-t-il une **borne explicite** sur les inputs ? *(souvent le paramètre $b$)* |
| Fortement convexe | Pour $y^1\neq y^2$ et $t\in(0,1)$, existe-t-il $\bar y\in Y$ avec $\bar y\geq ty^1+(1-t)y^2$ **et** $\bar y\neq ty^1+(1-t)y^2$ ? |

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Distinguer inputs et outputs **a priori** | Le livre le refuse explicitement : *« résister à faire une quelconque distinction a priori »* | $n$ marchandises, la distinction vient du **signe** |
| 2 | Oublier que $y^j_k<0$ pour un input | Alors $p\cdot y^j$ ne serait pas le profit | La convention **fait** que les inputs sont des **coûts** |
| 3 | Croire que la bornitude de $Y^j$ exprime la rareté | *« **Ne soyez pas tenté de penser** qu'elle exprime simplement l'idée que les ressources sont limitées »* | C'est une commodité technique, **dispensable** |
| 4 | Croire que la forte convexité est aussi faible que les autres | *« **à la différence de toutes les autres**, […] la forte convexité est une exigence **plus contraignante** »* | Elle exclut les rendements **constants et croissants** |
| 5 | Croire que la fermeture de $Y$ suit de celle des $Y^j$ | *« **ne découle PAS simplement** de la fermeture des $Y^j$ »* | Il faut la **bornitude** |
| 6 | Croire que le théorème 5.11 est trivial | Il porte les **deux** sens et sert au **pas clé** du théorème 5.13 | La décentralisation côté offre |
| 7 | Oublier $\sum_i\theta^{ij}=1$ | Sans elle, le pas *« revenu hors dotation $=$ profits agrégés »* tombe | C'est la condition de partage total |
| 8 | Oublier que $\Pi^j(p)\geq0$ | Cela vient de **$0\in Y^j$** | C'est ce qui rend $m^i(p)\geq0$ |
| 9 | Croire que la condition d'existence est **renforcée** par la production | Elle est **AFFAIBLIE** : $y+\sum_i e^i\gg0$ | En prenant $y=0$, on retrouve l'ancienne |
| 10 | Écrire $\sum_i e^i\gg0$ dans le théorème 5.13 | C'est le théorème **5.5**, pas le 5.13 | On peut ne rien posséder d'un bien **produit** |
| 11 | Ne pas voir où la nouvelle condition sert | Elle sert à trouver **un consommateur au revenu strictement positif** à la limite | C'est **le seul** pas modifié |
| 12 | Oublier le théorème 5.11 dans ce pas | Il justifie $\sum_j\Pi^j(\bar p)\geq\bar p\cdot y$ | L'inégalité **faible** de la chaîne |
| 13 | Dans Robinson Crusoé, clarifier les **deux** marchés | Inutile — **loi de Walras** | Un seul suffit |
| 14 | Oublier de normaliser $p^*=1$ | Le système serait sous-déterminé | Homogénéité de **degré zéro** |
| 15 | Développer les exposants pour trouver $\Pi$ | Long et source d'erreurs | **Réutiliser la CPO** : $pA^\alpha=(w/\alpha)A$ |
| 16 | Se tromper en simplifiant $(1-\beta)(1-\alpha)+\alpha$ | Le résultat est $1-\beta(1-\alpha)$, **pas** $1-\alpha\beta$ | $1-\alpha-\beta+\alpha\beta+\alpha=1-\beta+\alpha\beta$ |
| 17 | Croire que $B$ (fig. 5.8c) est infaisable car hors de $Y$ | **Non** : $B\in Y$, il est **technologiquement possible** | Il est **infaisable** car il demande $>T$ heures |
| 18 | Confondre iso-profit et courbe d'indifférence | Toutes deux ont pour pente $-w/p$ à l'équilibre — c'est la **conclusion**, pas la définition | L'iso-profit est $\Pi^*=py+wh$ |
| 19 | Croire que la WEA avec production est un seul vecteur | C'est **le couple** $(x(p^*),y(p^*))$ | Déf. 5.8 |
| 20 | Dans le théorème 5.14, contredire la faisabilité | La contradiction porte sur la **maximisation du profit** d'une firme | C'est là toute la différence avec 5.7 |
| 21 | Passer de « la somme des profits croît » à la contradiction sans le pas individuel | Il faut **descendre au niveau de la firme** | Une somme ne croît que si un terme croît |
| 22 | Oublier pourquoi $\bar Y^j$ satisfait l'hypothèse 5.2 | La translation préserve tout, **et fait entrer $0$** | $0=\hat y^{\,j}-\hat y^{\,j}\in\bar Y^j$ |
| 23 | Ne pas voir pourquoi les profits sont **nuls** au pas 6 | Parce que le budget est **saturé exactement en $\hat x^i$** | Donc le revenu de profit est **zéro** |
| 24 | Croire que les $T_i$ pourraient sommer à autre chose que 0 | La **réalisabilité** de $(\hat x,\hat y)$ l'interdit | Redistribution, jamais création |
| 25 | Croire que la bornitude est « juste une hypothèse technique inoffensive » | *« nous avons **SECTIONNÉ le lien capital entre prix et excédent de demande** »* | Elle détruit la **décentralisation** |
| 26 | Croire que sans bornitude tout le travail est perdu | *« **ne désespérez pas** »* | Bornes **artificielles** puis passage à la limite |
| 27 | Croire que Brouwer suffit sans forte convexité | Les offres deviennent **à valeurs d'ensembles** | Il faut **Kakutani (1941)** |
| 28 | Croire que le §5.4 change le modèle | *« ceci est **simplement** une économie de propriété privée avec $n=NM$ biens »* | Seule l'**indexation** change |
| 29 | Compter $M=S_1S_2\cdots S_T$ | Il faut **sommer** sur les dates : $M=S_1+S_1S_2+\dots$ | On compte les **couples $(t,s)$** |
| 30 | Croire qu'un déficit à une date invalide l'équilibre | Il n'y a qu'**une seule** contrainte, **globale** (5.7) | C'est **l'emprunt** ou **l'assurance** |
| 31 | Croire que des échanges ont lieu après la date zéro | *« **aucun autre échange n'a lieu** »* | Seulement l'**exécution** des contrats |
| 32 | Oublier les trois hypothèses cachées | Elles excluent **faillite, information asymétrique, non-exécution** | Le livre les nomme explicitement |

## 📌 Ultimate Review

**§5.3.1 — les producteurs.**

$J$ firmes, $y^j\in\mathbb{R}^n$. **CONVENTION DE SIGNE** : $y^j_k<0$ = input, $y^j_k>0$ = output. *« Pas de distinction a priori entre inputs et outputs. »* Elle fait que $p\cdot y^j$ **est** le profit.

**HYPOTHÈSE 5.2** : **1.** $0\in Y^j$ *(profits $\geq0$)* · **2.** fermé *(continuité)* et **borné** *( « très restrictive », dispensable)* · **3.** **fortement convexe** *(⟹ optimum UNIQUE ; exclut rendements constants et croissants)*.

**THÉORÈME 5.9** : $y^j(p)$ unique et continue sur $\mathbb{R}^n_{++}$ ; $\Pi^j(p)$ continue sur $\mathbb{R}^n_+$ *(théorème du maximum A2.21)*. $\Pi^j$ homogène de degré **1**, offres et demandes de degré **0**.

$Y\equiv\{\sum_j y^j\}$. **THÉORÈME 5.10** : $Y$ hérite de l'hypothèse 5.2 — **la fermeture exige la bornitude**.

**THÉORÈME 5.11** :

$$\boxed{\;p\cdot\bar y\geq p\cdot y\ \forall y\in Y \iff \bar y=\textstyle\sum_j\bar y^{\,j} \text{ avec chaque } \bar y^{\,j} \text{ optimal}\;}$$

*« Maximiser le profit agrégé **si et seulement si** cela se décompose en optima individuels. »*

**§5.3.2 — les consommateurs.**

**Parts** $\theta^{ij}\in[0,1]$ avec $\sum_i\theta^{ij}=1$. **Deux sources de revenu** :

$$m^i(p)=p\cdot e^i+\sum_{j}\theta^{ij}\Pi^j(p) \tag{5.4}$$

⚠️ **Le travail est déjà dans le modèle** : doter le consommateur d'heures, le loisir est ce qu'il consomme, le travail ce qu'il vend.

**THÉORÈME 5.12** : $x^i(p,m^i(p))$ existe, unique, continue ; $m^i(p)$ continue sur $\mathbb{R}^n_+$.

**L'économie** : $\big(u^i,e^i,\theta^{ij},Y^j\big)_{i\in\mathcal{I},j\in\mathcal{J}}$.

**§5.3.3 — l'équilibre.**

$$z_k(p)=\sum_i x^i_k-\underbrace{\sum_j y^j_k}_{\text{nouveau}}-\sum_i e^i_k$$

**THÉORÈME 5.13** : sous 5.1, 5.2 et

$$\boxed{\;y+\sum_{i}e^i\gg0 \quad\text{pour UN } y\in\textstyle\sum_j Y^j\;}$$

il existe $p^*\gg0$ avec $z(p^*)=0$. **Condition AFFAIBLIE** par rapport au théorème 5.5.

*Le pas où elle sert :* $\sum_i m^i(\bar p)=\bar p\cdot\sum_i e^i+\sum_j\Pi^j(\bar p)\geq\bar p\cdot\big(y+\sum_i e^i\big)>0$ — l'inégalité venant du **théorème 5.11**.

**EXEMPLE 5.2 — ROBINSON CRUSOÉ.**

$Y=\{(-h,y):0\leq h\leq b,\ 0\leq y\leq h^\alpha\}$, $u=h^{1-\beta}y^\beta$, $e=(T,0)$, $b>T$.

$$h^f=\left(\frac{\alpha p}{w}\right)^{\!1/(1-\alpha)}\quad y^f=\left(\frac{\alpha p}{w}\right)^{\!\alpha/(1-\alpha)}\quad \Pi=\frac{1-\alpha}{\alpha}\,w\left(\frac{\alpha p}{w}\right)^{\!1/(1-\alpha)}$$

$$h^c=\frac{(1-\beta)(wT+\Pi)}{w}\qquad y^c=\frac{\beta(wT+\Pi)}{p}$$

Normaliser $p^*=1$, clarifier **le seul** marché de $h$ *(loi de Walras)* :

$$\boxed{\;w^*=\alpha\left(\frac{1-\beta(1-\alpha)}{\alpha\beta T}\right)^{1-\alpha}>0\;}$$

**Fig. 5.8(c)** : $A$ = WEA, **Pareto-efficace** ; $B$ **technologiquement possible mais infaisable** *(demande $>T$ heures)*. Pente commune $-w/p$.

⚠️ **CONTRE LA BORNITUDE — le passage à retenir.**

> *« Il n'y a **pas de place dans la description de la technologie elle-même** pour des bornes sur les inputs disponibles. »*

> *« En imposant cette contrainte de faisabilité apparemment innocente, **nous avons SECTIONNÉ le lien capital entre prix et excédent de demande**. »*

$$\text{Les agents décident sur les PRIX, PAS sur la disponibilité.}$$

**Le remède** : bornes **artificielles** puis passage à la limite. **Sans forte convexité** : correspondances + **Kakutani (1941)**. Il suffit même que **$Y$ agrégé** soit convexe *(Debreu 1959)*.

**§5.3.4 — le bien-être.**

**DÉF. 5.8** : la WEA est le **COUPLE** $(x(p^*),y(p^*))$. **DÉF. 5.9** : efficacité de Pareto avec production.

**THÉORÈME 5.14 — premier théorème avec production** : $u^i$ strictement croissante ⟹ **toute WEA est Pareto-efficace**.

*Preuve : lemme 5.2 ⟹ sommer ⟹ substituer les réalisabilités ⟹ $p^*\sum_j\hat y^{\,j}>p^*\sum_j y^j$ ⟹ **une firme** fait mieux ⟹ contradiction.*

**THÉORÈME 5.15 — second théorème avec production** : il existe $T_1,\dots,T_I$ avec $\sum_i T_i=0$ et $\bar p$ tels que $\hat x^i$ maximise sous $\bar p\cdot x^i\leq m^i(\bar p)+T_i$ et $\hat y^{\,j}$ maximise le profit dans $Y^j$.

*L'astuce : $\bar Y^j\equiv Y^j-\{\hat y^{\,j}\}$ (⟹ $0\in\bar Y^j$) et $\bar E=(u^i,\hat x^i,\theta^{ij},\bar Y^j)$. Puis : profits $\geq0$ ⟹ (P.1) ; réalisabilité dans l'économie originale ⟹ égalités ; stricte quasiconcavité ⟹ $\bar x^i=\hat x^i$ ; **saturation** ⟹ profits **nuls** ⟹ $\bar y^{\,j}=0$ ⟹ (ex. 5.30) $\hat y^{\,j}$ optimal dans $Y^j$. Enfin $T_i\equiv\bar p\cdot\hat x^i-m^i(\bar p)$.*

**§5.4 — les plans contingents.**

$$\boxed{\;\textbf{L'idée unique : RAFFINER la notion de bien.}\;}$$

**Temps** : $x_{kt}$. **Incertitude** : $x_{ks}$. **Les deux** : $x_{kts}$, avec

$$M=S_1+S_1S_2+\dots+S_1S_2\cdots S_T \qquad n=N\times M$$

> *« En termes de nos définitions précédentes, ceci est **simplement une économie de propriété privée avec $n=NM$ biens**. »*

**Marché par marché** : $\sum_i\hat x^i_{kts}=\sum_j\hat y^{\,j}_{kts}+\sum_i e^i_{kts}$ (5.6). **Une seule contrainte budgétaire, globale** : (5.7).

$$\text{déficit à un } (t,s) \ \Longleftrightarrow\ \textbf{EMPRUNT} \text{ ou } \textbf{ASSURANCE}$$

$$\text{excédent à un } (t,s) \ \Longleftrightarrow\ \textbf{PRÊT} \text{ ou } \textbf{FOURNITURE D'ASSURANCE}$$

**L'implémentation** : un **marché de contrats à la date zéro**. Un contrat $=(\text{quantité},k,t,s)$. Le panier **net** $\hat x^i-e^i$ et le plan $\hat y^{\,j}$ **sont** des vecteurs de contrats.

> *« Après l'échange initial de contrats en période zéro, **aucun autre échange n'a lieu**. »*

**Les trois hypothèses cachées** : **monitoring parfait** *(pas de faillite)* · **information parfaite sur l'état** *(sinon incitation à mentir)* · **exécution parfaite des contrats**.

> *« Il est tout à fait **remarquable combien de kilomètres supplémentaires** nous tirons d'un modèle qui apparaît entièrement statique et déterministe, **simplement en RÉINTERPRÉTANT ses variables** ! »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quelles deux questions nouvelles la production apporte-t-elle ?**

</summary>

1. *« Les **profits** gagnés par les firmes doivent être **redistribués** aux consommateurs qui les possèdent. »* ⟹ les parts $\theta^{ij}$.
2. *« La distinction entre input et output **devient floue quand on regarde à travers les firmes**. L'input d'une firme peut fort bien être l'output d'une autre. »* ⟹ la convention de signe.

Et ce qui **ne** change **pas** : *« la plupart des propriétés importantes des systèmes de marché concurrentiels mises au jour plus haut **continuent de valoir** »*.

</details>

<details class="details--riche">
<summary>

**2. Expliquer la convention de signe et sa raison d'être.**

</summary>

$$y^j_k<0\ \Rightarrow\ \textbf{input}\qquad\qquad y^j_k>0\ \Rightarrow\ \textbf{output}$$

**Exemple du livre** : $y^j=(-7,3)$ requiert **7 unités du bien 1 en input** pour **produire 3 unités du bien 2**.

**Sa raison d'être** : *« notre convention de signe garantit que **les inputs sont comptabilisés dans les profits comme des coûts et les outputs comme des recettes** »*. Grâce à elle, $p\cdot y^j$ **est** le profit, sans aucun terme supplémentaire.

</details>

<details class="details--riche">
<summary>

**3. Énoncer l'hypothèse 5.2 et le rôle de chacune de ses conditions.**

</summary>

**1.** $0\in Y^j\subseteq\mathbb{R}^n$ — *« garantit que **les profits sont bornés inférieurement par zéro** »*. **2.** $Y^j$ **fermé et borné** — la bornitude : *« la production d'output requiert toujours des inputs »* ; la fermeture : *« **impose la continuité** […] les limites de plans possibles sont elles-mêmes possibles »*. **3.** $Y^j$ **fortement convexe** : $\exists\,\bar y\in Y^j$ avec $\bar y\geq ty^1+(1-t)y^2$, égalité exclue — *« **exclut les rendements d'échelle constants et croissants** et garantit que le plan optimal est **unique** »*.

</details>

<details class="details--riche">
<summary>

**4. Que dit le livre de l'hypothèse de bornitude, dès l'hypothèse 5.2 ?**

</summary>

> *« La partie bornitude de cette condition est **très restrictive** et n'est faite que pour garder l'analyse simple à suivre. **Ne soyez pas tenté de penser qu'elle exprime simplement l'idée que les ressources sont limitées.** Pour le moment, considérez-la comme une hypothèse **simplificatrice quoique dispensable**. »*

⚠️ C'est une **mise en garde**, pas une remarque de passage — le §5.3.3 y consacre deux pages entières.

</details>

<details class="details--riche">
<summary>

**5. Énoncer le théorème 5.9 et sa chaîne d'arguments.**

</summary>

Sous l'hypothèse 5.2 : pour $p\gg0$, la solution de (5.3) est **unique**, notée $y^j(p)$, et **continue** sur $\mathbb{R}^n_{++}$ ; $\Pi^j(p)$ est **bien définie et continue** sur $\mathbb{R}^n_+$.

| Propriété | Sa source |
|---|---|
| Existence | Objectif **continu** + contrainte **fermée bornée** |
| Continuité de $\Pi^j$ et $y^j$ | **Théorème A2.21** (théorème du maximum) |
| Unicité | La **forte convexité** *(exercice 5.23)* |

**Homogénéités** : $\Pi^j$ de degré **1**, offres/demandes de degré **0** *(théorèmes 3.7 et 3.8)*.

</details>

<details class="details--riche">
<summary>

**6. Quel est le point délicat du théorème 5.10 ?**

</summary>

⚠️ **La fermeture.**

> *« Les conditions 1, 3 et la bornitude de $Y$ découlent directement de ces propriétés des $Y^j$. **La fermeture de $Y$ ne découle PAS simplement de la fermeture des $Y^j$ individuels.** Cependant, sous notre hypothèse supplémentaire que les $Y^j$ sont **bornés**, $Y$ peut être montré fermé. »*

*(Enrichissement : une somme d'ensembles fermés n'est pas fermée en général ; une somme finie de **compacts** l'est.)*

</details>

<details class="details--riche">
<summary>

**7. Énoncer le théorème 5.11 et le lire en une phrase.**

</summary>

Pour $p\geq0$ : $p\cdot\bar y\geq p\cdot y$ pour tout $y\in Y$ **si et seulement si** $\bar y=\sum_j\bar y^{\,j}$ avec $p\cdot\bar y^{\,j}\geq p\cdot y^j$ pour tout $y^j\in Y^j$, pour chaque $j$.

**En une phrase** : *« $\bar y$ maximise le profit agrégé **si et seulement s'il peut être décomposé en plans de production maximisant le profit des firmes individuelles** »*.

</details>

<details class="details--riche">
<summary>

**8. Démontrer le théorème 5.11 dans le sens ⟸.**

</summary>

Partir de $p\cdot\bar y^{\,j}\geq p\cdot y^j$ pour chaque $j$, **sommer sur les firmes** :

$$\sum_j p\cdot\bar y^{\,j}\geq\sum_j p\cdot y^j$$

**Réarranger** par linéarité :

$$p\cdot\sum_j\bar y^{\,j}\geq p\cdot\sum_j y^j$$

*« Mais d'après les définitions de $\bar y$ et de $Y$, ceci dit simplement $p\cdot\bar y\geq p\cdot y$ pour $y\in Y$. »* $\blacksquare$

</details>

<details class="details--riche">
<summary>

**9. Comment le travail entre-t-il dans le modèle ?**

</summary>

> *« Notre hypothèse que les paniers des consommateurs sont **non négatifs** **n'exclut pas** que les consommateurs **fournissent** des biens et services au marché. Les **services de travail** sont facilement inclus **en dotant le consommateur d'un nombre fixe d'heures disponibles à la consommation**. Celles qui ne sont pas consommées comme « **loisir** » sont alors **fournies comme services de travail**. »*

⚠️ **Aucun objet nouveau n'est nécessaire** — seulement une dotation en heures.

</details>

<details class="details--riche">
<summary>

**10. Écrire la contrainte budgétaire (5.4) et nommer ses deux sources.**

</summary>

$$p\cdot x^i\leq \underbrace{p\cdot e^i}_{\text{vente des dotations}}+\underbrace{\sum_{j\in\mathcal{J}}\theta^{ij}\Pi^j(p)}_{\text{parts de profit}}$$

avec $0\leq\theta^{ij}\leq1$ et $\boxed{\sum_{i\in\mathcal{I}}\theta^{ij}=1}$ pour chaque $j$.

*« Le revenu d'un consommateur peut provenir de **deux sources** — de **la vente d'une dotation** et de **parts dans les profits** d'un nombre quelconque de firmes. »*

</details>

<details class="details--riche">
<summary>

**11. Pourquoi le problème (5.5) admet-il une solution ?**

</summary>

**La chaîne :**

1. **$0\in Y^j$** *(hyp. 5.2.1)* ⟹ *« chaque firme gagnera des profits **non négatifs** parce que chacune peut toujours choisir le vecteur de production nul »*.
2. Donc $m^i(p)\geq0$, *« parce que $p\geq0$ et $e^i\geq0$ »*.
3. Donc, sous les hypothèses 5.1 et 5.2, *« une solution à (5.5) existera et sera **unique** dès que $p\gg0$ »*.

⚠️ **Tout repose sur la condition 1 de l'hypothèse 5.2.**

</details>

<details class="details--riche">
<summary>

**12. Écrire l'excédent de demande avec production, et expliquer pourquoi un seul terme suffit.**

</summary>

$$z_k(p)=\sum_{i\in\mathcal{I}}x^i_k\big(p,m^i(p)\big)-\sum_{j\in\mathcal{J}}y^j_k(p)-\sum_{i\in\mathcal{I}}e^i_k$$

⚠️ **Grâce à la convention de signe.** Si $k$ est un **output** de $j$, alors $y^j_k>0$ et le terme **réduit** l'excédent — c'est de l'**offre**. Si $k$ est un **input**, $y^j_k<0$ et $-y^j_k>0$ **augmente** l'excédent — c'est de la **demande**.

**Aucune formule séparée n'est nécessaire.**

</details>

<details class="details--riche">
<summary>

**13. Énoncer le théorème 5.13 et dire en quoi sa condition diffère de celle du théorème 5.5.**

</summary>

Sous les hypothèses 5.1 et 5.2, et si $y+\sum_{i}e^i\gg0$ pour un plan agrégé $y\in\sum_j Y^j$, il existe $p^*\gg0$ avec $z(p^*)=0$.

> *« Rappelez-vous que **quand il n'y avait pas de production, nous exigions que le vecteur de dotation agrégée soit strictement positif**. Avec la production, **cette condition peut être AFFAIBLIE** en exigeant qu'il existe **un vecteur de production réalisable dont le résultat net est une quantité strictement positive de chaque bien**. »*

⚠️ **AFFAIBLIE.** En prenant $y=0\in Y$, on retrouve l'ancienne condition ; mais on peut maintenant ne rien posséder d'un bien pourvu qu'on sache le **produire**.

</details>

<details class="details--riche">
<summary>

**14. Où exactement la condition $y+\sum_i e^i\gg0$ sert-elle dans la preuve ?**

</summary>

**À trouver un consommateur au revenu strictement positif au prix limite $\bar p$** — le premier pas de la preuve du théorème 5.4.

$$\sum_i m^i(\bar p)=\bar p\cdot\sum_i e^i+\sum_j\Pi^j(\bar p)\ \geq\ \bar p\cdot\sum_i e^i+\bar p\cdot y=\bar p\cdot\Big(y+\sum_i e^i\Big)>0$$

| Pas | Justification |
|---|---|
| 2ᵉ égalité | *« le revenu total hors dotation est simplement **les profits agrégés** »* — car $\sum_i\theta^{ij}=1$ |
| **inégalité** | Le **théorème 5.11** : la somme des profits maximisés individuels $\geq$ le profit agrégé de **n'importe quel** $y\in Y$ |

</details>

<details class="details--riche">
<summary>

**15. Décrire l'économie de Robinson Crusoé.**

</summary>

> *« **Toute la production et toute la consommation** sont effectuées par **un seul consommateur**. Robinson le consommateur **vend son temps de travail** $h$ à Robinson le producteur, qui l'utilise pour produire des noix de coco $y$, qu'il **vend ensuite** à Robinson le consommateur. **Tous les profits sont distribués à Robinson le consommateur.** »*

$$Y=\{(-h,y):0\leq h\leq b,\ 0\leq y\leq h^\alpha\},\quad u=h^{1-\beta}y^\beta,\quad e=(T,0),\quad b>T$$

*« Avec une seule firme, **l'ensemble de production de la firme et celui de l'économie coïncident**. »*

</details>

<details class="details--riche">
<summary>

**16. Pourquoi le théorème 5.13 ne s'applique-t-il pas directement ici, et comment s'en sort-on ?**

</summary>

> *« Cette économie satisfait toutes les hypothèses du théorème 5.13 **sauf que l'utilité de Robinson, étant de forme Cobb-Douglas, n'est ni fortement croissante ni strictement quasiconcave sur tout $\mathbb{R}^n_+$**. »*

**La sortie** *(exercice 5.14)* : *« la fonction d'excédent de demande agrégée résultante **satisfait néanmoins les conditions du théorème 5.3** »* — on applique donc le **théorème 5.3 directement**, sans passer par 5.13.

</details>

<details class="details--riche">
<summary>

**17. Résoudre le problème de la firme de Robinson.**

</summary>

**Pas 1** — *« il ne paie jamais à la firme de gaspiller les heures achetées »* ⟹ $y=h^\alpha$. **Pas 2** — $\max_h\ p\,h^\alpha-wh$, avec $b$ non saturé. **Pas 3** — CPO : $\alpha p\,h^{\alpha-1}-w=0$. **Pas 4** —

$$h^f=\left(\frac{\alpha p}{w}\right)^{1/(1-\alpha)}\qquad y^f=\left(\frac{\alpha p}{w}\right)^{\alpha/(1-\alpha)}$$

$$\Pi(w,p)=\frac{1-\alpha}{\alpha}\,w\left(\frac{\alpha p}{w}\right)^{1/(1-\alpha)}$$

⚠️ *« Les profits sont positifs tant que les prix le sont »* — **ce qui prouve que $h=0$ n'est pas optimal**.

</details>

<details class="details--riche">
<summary>

**18. Comment obtient-on $\Pi$ sans développer les exposants ?**

</summary>

Poser $A\equiv h^f$, de sorte que $y^f=A^\alpha$.

**La CPO** $\alpha p A^{\alpha-1}=w$ se réécrit $p A^\alpha=\dfrac{w}{\alpha}A$. Alors

$$\Pi=pA^\alpha-wA=\frac{w}{\alpha}A-wA=wA\left(\frac1\alpha-1\right)=\frac{1-\alpha}{\alpha}wA$$

⚠️ **On réutilise la CPO pour éliminer $p$** au lieu de manipuler des exposants fractionnaires.

</details>

<details class="details--riche">
<summary>

**19. Quelles sont les deux simplifications avant de chercher $w^*$ ?**

</summary>

> *« La première est que parce que **l'excédent de demande agrégé est homogène de degré zéro** […] nous pouvons **poser $p^*=1$ sans aucune perte**. La seconde est que **nous n'avons plus qu'à trouver $w^*$ qui clarifie le marché de $h$, parce que par la LOI DE WALRAS, le marché de $y$ se clarifiera aussi**. »*

</details>

<details class="details--riche">
<summary>

**20. Dériver $w^*$ complètement.**

</summary>

$h^c+h^f=T$ avec $p^*=1$ :

$$(1-\beta)T+(1-\beta)\frac{\Pi}{w}+\left(\frac{\alpha}{w}\right)^{1/(1-\alpha)}=T \ \Longrightarrow\ (1-\beta)\frac{\Pi}{w}+\left(\frac{\alpha}{w}\right)^{1/(1-\alpha)}=\beta T$$

Avec $\dfrac{\Pi}{w}=\dfrac{1-\alpha}{\alpha}\left(\dfrac{\alpha}{w}\right)^{1/(1-\alpha)}$ et $X\equiv\left(\dfrac{\alpha}{w}\right)^{1/(1-\alpha)}$ :

$$X\cdot\frac{(1-\beta)(1-\alpha)+\alpha}{\alpha}=\beta T$$

⚠️ **La simplification clé** : $(1-\beta)(1-\alpha)+\alpha=1-\alpha-\beta+\alpha\beta+\alpha=\boxed{1-\beta(1-\alpha)}$.

$$X=\frac{\alpha\beta T}{1-\beta(1-\alpha)} \ \Longrightarrow\ \boxed{w^*=\alpha\left(\frac{1-\beta(1-\alpha)}{\alpha\beta T}\right)^{1-\alpha}>0}$$

</details>

<details class="details--riche">
<summary>

**21. Qu'est-ce qu'une droite d'iso-profit et quelle est sa pente ?**

</summary>

> *« La droite donnée par $\Pi^*=py+wh$ est une **droite d'iso-profit** parce que **les profits sont constants et égaux à $\Pi^*$ pour tout $(h,y)$ dessus**. Notez que quand $(h,y)\in Y$, **$h\leq0$**, de sorte que $py+wh$ est bien la formule **correcte** pour les profits. »*

**Sa pente** : $-w/p$ — *« et cette même pente est celle de la contrainte budgétaire du consommateur »*.

L'iso-profit représentée est **la plus élevée atteignable** car *« des profits plus élevés requerraient un plan **au-dessus** de la droite, et aucun n'est dans l'ensemble de production »*.

</details>

<details class="details--riche">
<summary>

**22. Que montre la figure 5.8(c) et quelle distinction y est cruciale ?**

</summary>

Elle superpose le consommateur et la firme, en plaçant le point $T$ du consommateur sur l'origine de la firme. Origines : $0^c$ et $0^f$. **Le point $A$ est la WEA.**

⚠️ **La distinction cruciale : POSSIBLE ≠ RÉALISABLE.**

> *« Un plan de production comme le **point $B$ est technologiquement POSSIBLE parce qu'il est dans l'ensemble de production, mais il est INFAISABLE parce qu'il requiert plus de $T$ heures**. »*

**La conclusion** : *« il est clair que l'allocation walrasienne en $A$ est Pareto-efficace. **Elle maximise l'utilité de Robinson parmi tous les paniers de consommation réalisables.** »*

</details>

<details class="details--riche">
<summary>

**23. Quel est le premier argument du livre contre la bornitude ?**

</summary>

> *« L'ensemble de possibilités de production est censé décrire **la technologie de la firme, rien de plus**. […] **Si la quantité d'inputs appliqués au processus croît sans borne, la quantité d'output produite le pourrait aussi.** Donc, il n'y a simplement **pas de place dans la description de la technologie elle-même** pour des bornes sur les quantités d'inputs disponibles. »*

</details>

<details class="details--riche">
<summary>

**24. Quel est l'argument DÉCISIF contre la bornitude ?**

</summary>

⚠️ **Elle sectionne le lien entre prix et demande.**

> *« Quand nous imposons des contraintes sur les possibilités de production fondées sur **l'offre agrégée**, alors **nous supposons implicitement que la firme prend ces contraintes agrégées en compte en maximisant son profit**. »*

**L'exemple de l'encre** : *« si nous bornons l'ensemble de production d'un producteur de stylos parce que l'offre d'encre est finie, alors **à des prix d'encre très bas, sa demande sera contre cette contrainte**. Mais **n'était cette contrainte, il demanderait encore plus d'encre au prix bas actuel**. »*

> *« Nous avons **SECTIONNÉ le lien capital entre prix et excédent de demande**. Et en effet, **c'est là l'essence même du modèle concurrentiel** : producteurs et consommateurs décident **sur la base des prix prévalents, pas de savoir s'il y a assez du bien**. »*

</details>

<details class="details--riche">
<summary>

**25. Comment se débarrasse-t-on de la bornitude, et que faut-il si l'on relâche la convexité ?**

</summary>

**La méthode standard** : *« prouver d'abord en plaçant des bornes **ARTIFICIELLES** (ce qui est essentiellement ce que nous avons fait) puis en laissant les bornes devenir **arbitrairement grandes** »*.

**Si l'on ne suppose que la simple convexité :**

| Ce qui apparaît | Le remède |
|---|---|
| **Rendements d'échelle constants** ⟹ offres **à valeurs d'ensembles**, non continues | **Correspondances** + continuité généralisée |
| Demandes à valeurs d'ensembles | idem |
| Brouwer ne suffit plus | **Kakutani (1941)** |

> *« En fait, nous pouvons même nous passer complètement de la convexité des ensembles **individuels**, du moment que **l'ensemble AGRÉGÉ est convexe**. » — Debreu (1959)*

</details>

<details class="details--riche">
<summary>

**26. Énoncer la définition 5.8, et dire ce qui change par rapport à la définition 5.6.**

</summary>

Une WEA avec production est **le COUPLE** $\big(x(p^*),y(p^*)\big)$ — les paniers maximisant l'utilité **et** les plans maximisant le profit, avec $\sum_i x^i=\sum_i e^i+\sum_j y^j$.

**Les trois conditions** : **(1)** panier le plus préféré dans le budget · **(2)** plan maximisateur de profit dans $Y^j$ · **(3)** demande $=$ offre sur chaque marché.

⚠️ **Ce qui change** : c'est un **couple**, pas un seul vecteur.

</details>

<details class="details--riche">
<summary>

**27. Que dit le livre de la tâche du planificateur, avec production ?**

</summary>

> *« **Non seulement il vous faudrait de l'information sur les préférences des consommateurs, mais vous auriez aussi besoin d'une connaissance détaillée des technologies de toutes les firmes et de la productivité de tous les inputs.** En particulier, vous devriez **affecter les individus ayant des compétences particulières aux firmes qui requièrent ces compétences**. Ce serait une **entreprise colossale**. »*

> *« **Et pourtant, avec apparemment aucune direction centrale, les allocations obtenues comme équilibres walrasiens sont Pareto-efficaces.** »*

</details>

<details class="details--riche">
<summary>

**28. Démontrer le théorème 5.14.**

</summary>

Par l'absurde : $(x,y)$ WEA aux prix $p^*$, **non** Pareto-efficace.

1. **Réalisabilité** : $\sum_i x^i=\sum_j y^j+\sum_i e^i$ (P.1).
2. Il existe $(\hat x,\hat y)$ réalisable avec $u^i(\hat x^i)\geq u^i(x^i)$, **une stricte** (P.2).
3. **Lemme 5.2** : $p^*\cdot\hat x^i\geq p^*\cdot x^i$, **une stricte** (P.3).
4. **Sommer** : $\sum_i p^*\cdot\hat x^i>\sum_i p^*\cdot x^i$ (P.4).
5. **Substituer les réalisabilités** ; les dotations s'annulent : $p^*\cdot\sum_j\hat y^{\,j}>p^*\cdot\sum_j y^j$.
6. *« Ceci signifie que $p^*\cdot\hat y^{\,j}>p^*\cdot y^j$ **pour une certaine firme $j$**, où $\hat y^{\,j}\in Y^j$. **Ceci contredit le fait qu'à l'équilibre, $y^j$ maximise le profit de la firme $j$.** »* $\blacksquare$

</details>

<details class="details--riche">
<summary>

**29. En quoi la preuve du théorème 5.14 diffère-t-elle de celle du théorème 5.7 ?**

</summary>

**Elle est identique jusqu'au pas 4.** Le **lemme 5.2 est réutilisé sans modification** — il ne concerne que les consommateurs.

| Fiche 511 (thm 5.7) | Fiche 512 (thm 5.14) |
|---|---|
| Contredire la **faisabilité de la coalition** | Contredire la **maximisation du profit d'une firme** |

⚠️ **Le pas ajouté (pas 6)** : passer de « la somme des profits croît » à « **un** profit individuel croît » — valide parce qu'une somme ne croît que si un terme croît.

</details>

<details class="details--riche">
<summary>

**30. Énoncer le théorème 5.15.**

</summary>

Sous **(i)** hyp. 5.1, **(ii)** hyp. 5.2, **(iii)** $y+\sum_i e^i\gg0$, **(iv)** $(\hat x,\hat y)$ **Pareto-efficace** : il existe des transferts $T_1,\dots,T_I$ avec $\sum_i T_i=0$ et un prix $\bar p$ tels que

1. $\hat x^i$ **maximise** $u^i(x^i)$ s.c. $\bar p\cdot x^i\leq m^i(\bar p)+T_i$ ;
2. $\hat y^{\,j}$ **maximise** $\bar p\cdot y^j$ s.c. $y^j\in Y^j$.

⚠️ Formulé d'emblée avec des **transferts monétaires** — c'est la lecture « seule la valeur compte » du corollaire 5.1.

</details>

<details class="details--riche">
<summary>

**31. Quelle est l'astuce centrale de la preuve du théorème 5.15 ?**

</summary>

**Translater les ensembles de production :**

$$\bar Y^j\equiv Y^j-\{\hat y^{\,j}\}$$

⚠️ **Pourquoi ça marche** : la translation préserve fermeture, bornitude et forte convexité, **et fait entrer $0$** puisque $0=\hat y^{\,j}-\hat y^{\,j}$. Donc $\bar Y^j$ satisfait l'hypothèse 5.2.

On applique ensuite le **théorème 5.13** à l'économie auxiliaire $\bar E=(u^i,\hat x^i,\theta^{ij},\bar Y^j)$ — où les **dotations sont l'allocation efficace elle-même**.

</details>

<details class="details--riche">
<summary>

**32. Pourquoi $u^i(\bar x^i)\geq u^i(\hat x^i)$ dans la preuve du théorème 5.15 ?**

</summary>

> *« Parce que **$0\in\bar Y^j$ pour toute firme**, les profits de toute firme sont **non négatifs** à l'équilibre, de sorte que **chaque consommateur peut s'offrir son vecteur de dotation**. »*

Et sa dotation dans $\bar E$ **est** $\hat x^i$. Un maximiseur ne peut donc pas faire moins bien que $\hat x^i$.

</details>

<details class="details--riche">
<summary>

**33. Montrer que $(\bar x,\tilde y)$ est réalisable dans l'économie originale.**

</summary>

Chaque $\bar y^{\,j}\in\bar Y^j$ s'écrit $\bar y^{\,j}=\tilde y^{\,j}-\hat y^{\,j}$ avec $\tilde y^{\,j}\in Y^j$. La réalisabilité dans $\bar E$ donne

$$\sum_i\bar x^i=\sum_i\hat x^i+\sum_j\bar y^{\,j}=\sum_i\hat x^i+\sum_j(\tilde y^{\,j}-\hat y^{\,j})=\underbrace{\Big(\sum_i\hat x^i-\sum_j\hat y^{\,j}\Big)}_{=\sum_i e^i}+\sum_j\tilde y^{\,j}$$

> *« où **la dernière égalité découle de la réalisabilité de $(\hat x,\hat y)$ dans l'économie originale** »*

</details>

<details class="details--riche">
<summary>

**34. Pourquoi les profits sont-ils NULS au pas 6 du théorème 5.15 ?**

</summary>

On a montré que $\hat x^i$ maximise $u^i$ sous $\bar p\cdot x^i\leq\bar p\cdot\hat x^i+\sum_j\theta^{ij}\bar p\cdot\bar y^{\,j}$.

> *« Mais parce que l'utilité est **fortement croissante**, **la contrainte budgétaire est saturée en $x^i=\hat x^i$**, ce qui implique que **le revenu de profit de chaque consommateur est ZÉRO**. Ceci signifie que **toute firme doit gagner un profit nul**, ce qui signifie à son tour que **$\bar y^{\,j}=0$ pour toute firme $j$**. »*

**Le raisonnement** : si le budget est saturé exactement en $\hat x^i$ alors $\bar p\cdot\hat x^i=\bar p\cdot\hat x^i+(\text{profits})$, donc les profits sont nuls.

</details>

<details class="details--riche">
<summary>

**35. Comment remonte-t-on de $\bar y^{\,j}=0$ à l'optimalité de $\hat y^{\,j}$ dans $Y^j$ ?**

</summary>

C'est **l'exercice 5.30** : si $y=0$ résout $\max_y\ p\cdot y$ s.c. $y\in Y-y^0$, alors $y^0$ résout $\max_y\ p\cdot y$ s.c. $y\in Y$.

**En une ligne** : pour tout $y\in Y$, $y-\hat y^{\,j}\in\bar Y^j$, donc $\bar p\cdot(y-\hat y^{\,j})\leq\bar p\cdot0=0$, donc $\bar p\cdot y\leq\bar p\cdot\hat y^{\,j}$.

</details>

<details class="details--riche">
<summary>

**36. Construire les transferts et vérifier qu'ils somment à zéro.**

</summary>

$$T_i\equiv\bar p\cdot\hat x^i-m^i(\bar p),\qquad m^i(\bar p)=\bar p\cdot e^i+\sum_{j}\theta^{ij}\,\bar p\cdot\hat y^{\,j}$$

**La vérification** *(le livre dit seulement « par la réalisabilité »)* :

$$\sum_i T_i=\bar p\cdot\sum_i\hat x^i-\bar p\cdot\sum_i e^i-\sum_j\bar p\cdot\hat y^{\,j}$$

*(en utilisant $\sum_i\theta^{ij}=1$)*. La réalisabilité de $(\hat x,\hat y)$ donne exactement $\sum_i\hat x^i=\sum_i e^i+\sum_j\hat y^{\,j}$, donc $\sum_i T_i=0$.

**Lecture** : les transferts **redistribuent**, ils ne **créent** jamais.

</details>

<details class="details--riche">
<summary>

**37. Quelle est l'idée unique de tout le §5.4 ?**

</summary>

$$\boxed{\;\textbf{RAFFINER la notion de bien pour inclure toutes les caractéristiques d'intérêt.}\;}$$

> *« Le modèle que nous avons développé est en fait **tout à fait capable d'inclure non seulement le temps, les taux d'intérêt, l'emprunt et le prêt, mais aussi l'INCERTITUDE** sur beaucoup de choses […]. **La clé est de raffiner la notion de bien.** »*

</details>

<details class="details--riche">
<summary>

**38. Comment le temps entre-t-il dans le modèle ?**

</summary>

> *« Nous indexons simplement les biens **non seulement par ce qu'ils sont** […] **mais aussi par la DATE à laquelle ils sont consommés (ou produits)**. »*

Avec 2 biens et 2 dates, un panier est $(x_{11},x_{12},x_{21},x_{22})$ — et *« avec deux biens **de base**, pommes et oranges, et deux dates, **nous avons en réalité QUATRE biens** »*.

</details>

<details class="details--riche">
<summary>

**39. Comment l'incertitude entre-t-elle, et comment l'assurance apparaît-elle ?**

</summary>

Deux états $s=1$ (pluie), $s=2$ (soleil) ; on indexe $x_{ks}$ et $y_{ks}$.

| Usage | Mécanisme |
|---|---|
| Préférences dépendant de l'état | *« des préférences distinctes sur les **parapluies** quand il fait soleil et quand il pleut »* |
| Technologies dépendant de l'état | *« les produits **agricoles** par exemple »* |
| **Assurance** | *« en permettant à la **DOTATION** du consommateur de dépendre de l'état, avec de **faibles dotations** associées à un état (**incendie ou inondation**) et de **fortes dotations** à un autre »* |

</details>

<details class="details--riche">
<summary>

**40. Compter les biens dans le modèle complet du §5.4.3.**

</summary>

$N$ biens de base, $T$ dates, $S_t$ événements à la date $t$. **L'état du monde à la date $t$** est le **vecteur** $(s_1,\dots,s_t)$ des événements survenus **au début des dates 1 à $t$**.

$$\boxed{\;M=S_1+S_1S_2+\dots+S_1S_2\cdots S_T\;}$$

*« le nombre total de **couples date-état** $(t,s)$ »*, d'où $x\in\mathbb{R}^{NM}_+$ et $n=NM$.

⚠️ **On SOMME sur les dates** — on ne multiplie pas seulement les $S_t$.

</details>

<details class="details--riche">
<summary>

**41. Quel est le point crucial du §5.4.3 ?**

</summary>

> *« En termes de nos définitions précédentes, ceci est **SIMPLEMENT une économie de propriété privée avec $n=NM$ biens**. »*

**Rien de nouveau n'est ajouté au modèle.** Le théorème 5.13 s'applique tel quel et donne $p^*\in\mathbb{R}^{NM}_{++}$.

**La justification économique** : *« le montant qu'on est prêt à payer pour une automobile livrée **aujourd'hui** pourrait fort bien être plus élevé que pour une automobile **par ailleurs identique dans six mois** »*.

</details>

<details class="details--riche">
<summary>

**42. Opposer (5.6) et (5.7).**

</summary>

**(5.6) — marché par marché**, il y en a $NM$ :

$$\sum_i\hat x^i_{kts}=\sum_j\hat y^{\,j}_{kts}+\sum_i e^i_{kts}\qquad\forall\,k,t,s$$

**(5.7) — budget, une SEULE par consommateur** :

$$\sum_{k,t,s}p^*_{kts}\hat x^i_{kts}=\sum_{k,t,s}p^*_{kts}e^i_{kts}+\sum_j\theta^{ij}\sum_{k,t,s}p^*_{kts}\hat y^{\,j}_{kts}$$

⚠️ **C'est toute la substance du §5.4** : *« chaque consommateur n'a qu'**une seule contrainte budgétaire liant ses dépenses sur tous les biens** »*.

</details>

<details class="details--riche">
<summary>

**43. Un déficit à une date-état donnée a-t-il un sens ?**

</summary>

> *« La réponse est « **oui, cela a absolument un sens** ». En effet, **ce déficit budgétaire est l'expression de DEUX phénomènes économiques importants, à savoir l'EMPRUNT et l'ASSURANCE**. »*

|  | Déficit | Excédent |
|---|---|---|
| Temps | **emprunter** | **prêter** |
| État | **recevoir** une indemnité *(incendie, inondation)* | **fournir** l'assurance sur des états non survenus |

</details>

<details class="details--riche">
<summary>

**44. Comment l'équilibre du §5.4 s'implémente-t-il concrètement ?**

</summary>

> *« Pensez à une **date zéro antérieure** à laquelle firmes et consommateurs participent à un **marché de CONTRATS CONTRAIGNANTS**. »*

**Un contrat** = *« un morceau de papier sur lequel est écrit un nombre réel non négatif, un bien de base $k$, une date $t$, et un état $s$ »*. Exemple : $(107{,}6,\ k=3,\ t=2,\ s=7)$.

Le **panier net** $\hat x^i-e^i$ et le plan $\hat y^{\,j}$ **sont** des vecteurs de contrats — la convention de signe désignant qui reçoit et qui fournit.

</details>

<details class="details--riche">
<summary>

**45. Que se passe-t-il APRÈS la date zéro ?**

</summary>

⚠️ **Rien, sinon l'exécution.**

> *« Quand chaque date $t$ arrive et que n'importe quel état $s$ survient, **les contrats pertinents pour cette date et cet état sont exécutés**. **La condition de clarification (5.6) garantit que ceci est FAISABLE.** **Après l'échange initial de contrats en période zéro, AUCUN autre échange n'a lieu.** »*

*(L'exercice 5.33 le confirme : même si des marchés au comptant s'ouvraient, **aucun échange supplémentaire n'aurait lieu**. L'exercice 5.34 montre qu'avec seulement des **titres d'Arrow** échangeables a priori, les marchés au comptant retrouvent un rôle.)*

</details>

<details class="details--riche">
<summary>

**46. Quelles sont les trois hypothèses cachées, et que chacune exclut-elle ?**

</summary>

| # | Hypothèse | Ce qu'elle exclut |
|---|---|---|
| **1** | **Monitoring parfait** | *« il n'est pas possible de **prétendre** pouvoir fournir plus qu'on ne le peut réellement. Ainsi, **la faillite est supposée absente**. »* |
| **2** | **Information parfaite** | *« si **seuls certains agents étaient informés de l'état**, ils pourraient avoir une **incitation à MENTIR** sur quel état est survenu »* |
| **3** | **Exécution parfaite** | *« tous les contrats sont **parfaitement exécutés** »* |

> *« **Clairement, chacune de ces hypothèses est forte et exclut des situations économiques importantes.** »*

</details>

<details class="details--riche">
<summary>

**47. Sur quoi le §5.4 se conclut-il ?**

</summary>

> *« Néanmoins, **il est tout à fait remarquable combien de kilomètres supplémentaires nous sommes capables de tirer d'un modèle qui apparaît entièrement statique et déterministe, simplement en RÉINTERPRÉTANT ses variables !** »*

<div class="callout" data-kind="methode">

<span class="callout__lab">comment il fournit des théories de l'assurance, de l'emprunt et du prêt, des taux d'intérêt et de la valorisation d'actifs</span>

*« Les exercices explorent ce modèle plus avant, en examinant . »*

</div>

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les deux questions nouvelles de la production ? | La **redistribution des profits** · la **distinction floue** input/output entre firmes |
| Le choix méthodologique du livre ? | **Aucune distinction a priori** — $n$ marchandises neutres |
| La convention de signe ? | $y^j_k<0$ = **input** · $y^j_k>0$ = **output** |
| Son effet sur le profit ? | $p\cdot y^j$ **est** le profit : inputs = coûts, outputs = recettes |
| Exemple du livre pour $y^j=(-7,3)$ ? | 7 unités du bien 1 en input pour **3 unités du bien 2** en output |
| Hypothèse 5.2, condition 1 ? | $0\in Y^j$ ⟹ **profits bornés inférieurement par zéro** |
| Condition 2 ? | $Y^j$ **fermé** (continuité) et **borné** |
| Ce que la fermeture signifie ? | *« Les **limites** de plans possibles sont elles-mêmes possibles »* |
| L'avertissement sur la bornitude ? | *« **Ne soyez pas tenté** de penser qu'elle exprime la rareté »* — dispensable |
| Condition 3 ? | **Forte convexité** : $\exists\bar y\in Y^j$, $\bar y\geq ty^1+(1-t)y^2$, égalité exclue |
| Ce qu'elle exclut ? | Les rendements d'échelle **constants et croissants** |
| Ce qu'elle garantit ? | Le plan optimal est **UNIQUE** |
| Son statut par rapport aux autres ? | *« **plus contraignante** »* que toutes les autres |
| Théorème 5.9 ? | $y^j(p)$ **unique** et **continue** ; $\Pi^j(p)$ **continue** |
| L'outil derrière la continuité ? | Le **théorème du maximum** (A2.21) |
| L'homogénéité de $\Pi^j$ ? | Degré **1** |
| Celle des offres et demandes ? | Degré **0** |
| Théorème 5.10 ? | $Y=\sum_j Y^j$ **hérite** de l'hypothèse 5.2 |
| Son point délicat ? | La **fermeture** ne suit pas — il faut la **bornitude** |
| Théorème 5.11 ? | Profit **agrégé** maximal $\iff$ **décomposition** en optima individuels |
| Sa preuve, sens ⟸ ? | **Sommer** les inégalités, **réarranger** par linéarité |
| Sa portée ? | La **décentralisation côté offre** |
| Comment le travail entre-t-il ? | Doter le consommateur d'**heures** ; le loisir est consommé, le reste **vendu** |
| La condition sur les parts ? | $\sum_{i}\theta^{ij}=1$ pour **chaque** firme |
| Les deux sources de revenu ? | **Dotations** vendues · **parts de profit** |
| La formule de $m^i(p)$ ? | $p\cdot e^i+\sum_j\theta^{ij}\Pi^j(p)$ |
| Pourquoi $m^i(p)\geq0$ ? | Parce que $0\in Y^j$ ⟹ $\Pi^j(p)\geq0$ |
| Théorème 5.12 ? | $x^i(p,m^i(p))$ existe, **unique**, **continue** ; $m^i$ continue sur $\mathbb{R}^n_+$ |
| L'économie complète ? | $\big(u^i,e^i,\theta^{ij},Y^j\big)_{i\in\mathcal{I},j\in\mathcal{J}}$ |
| Le terme nouveau de $z_k(p)$ ? | $-\sum_j y^j_k(p)$ |
| Pourquoi un seul terme suffit ? | La **convention de signe** : output ⟹ réduit $z$, input ⟹ l'augmente |
| Théorème 5.13, sa condition ? | $y+\sum_i e^i\gg0$ pour **un** $y\in Y$ |
| Est-elle plus forte ou plus faible ? | **Plus FAIBLE** — prendre $y=0$ redonne l'ancienne |
| Ce qu'elle permet ? | Ne **rien posséder** d'un bien qu'on sait **produire** |
| Où sert-elle dans la preuve ? | À trouver **un consommateur au revenu $>0$** au prix limite |
| Quel théorème justifie l'inégalité clé ? | Le **théorème 5.11** |
| Pourquoi $\sum_i\sum_j\theta^{ij}\Pi^j=\sum_j\Pi^j$ ? | Parce que $\sum_i\theta^{ij}=1$ |
| L'obstacle de l'exemple 5.2 ? | Cobb-Douglas ⟹ ni **fortement croissante** ni **strictement quasiconcave** |
| Comment on le lève ? | Exercice 5.14 : appliquer le **théorème 5.3 directement** |
| Le rôle de $b$ ? | Borner $Y$ ; on choisit $b>T$ pour qu'il soit **non saturé** |
| Le premier pas du problème de la firme ? | Éliminer le gaspillage : $y=h^\alpha$ |
| La CPO de la firme ? | $\alpha p\,h^{\alpha-1}-w=0$ |
| $h^f$ ? | $(\alpha p/w)^{1/(1-\alpha)}$ |
| $y^f$ ? | $(\alpha p/w)^{\alpha/(1-\alpha)}$ |
| $\Pi(w,p)$ ? | $\dfrac{1-\alpha}{\alpha}\,w\,(\alpha p/w)^{1/(1-\alpha)}$ |
| L'astuce du calcul de $\Pi$ ? | **Réutiliser la CPO** : $pA^\alpha=(w/\alpha)A$ |
| Ce que $\Pi>0$ prouve ? | Que **$h=0$ n'est pas** maximisateur de profit |
| Les parts de dépense du consommateur ? | $1-\beta$ sur $h$, $\beta$ sur $y$ |
| Les deux simplifications ? | **Normaliser $p^*=1$** · clarifier **un seul** marché (**loi de Walras**) |
| La simplification algébrique clé ? | $(1-\beta)(1-\alpha)+\alpha=\boxed{1-\beta(1-\alpha)}$ |
| $w^*$ ? | $\alpha\big[(1-\beta(1-\alpha))/(\alpha\beta T)\big]^{1-\alpha}$ |
| Pourquoi $w^*>0$ ? | Car $\beta(1-\alpha)<1$ |
| Qu'est-ce qu'une droite d'iso-profit ? | $\Pi^*=py+wh$ — profits **constants** dessus |
| Sa pente ? | $-w/p$ — **la même** que celle du budget du consommateur |
| Le point $B$ de la fig. 5.8(c) ? | **Technologiquement possible** mais **INFAISABLE** ($>T$ heures) |
| Le point $A$ ? | La **WEA**, **Pareto-efficace** |
| Le premier argument contre la bornitude ? | *« **Pas de place** dans la description de la **technologie** pour des bornes sur les inputs »* |
| Le trait d'humour du livre ? | *« Qui se soucie qu'on puisse **remplir l'univers de stylos** si l'univers était rempli d'**encre** ! »* |
| L'argument décisif ? | Elle **sectionne le lien entre PRIX et EXCÉDENT DE DEMANDE** |
| L'essence du modèle concurrentiel ? | Les agents décident sur les **prix**, pas sur la **disponibilité** |
| La méthode standard sans bornitude ? | Bornes **artificielles**, puis **arbitrairement grandes** |
| Ce qui apparaît sans forte convexité ? | Offres et demandes **à valeurs d'ensembles**, non continues |
| Le remède ? | **Correspondances** + **Kakutani (1941)** |
| Ce qui suffit vraiment ? | Que l'ensemble **AGRÉGÉ** soit convexe (**Debreu 1959**) |
| Définition 5.8 ? | La WEA est le **COUPLE** $(x(p^*),y(p^*))$ |
| Ses trois conditions ? | Panier préféré · plan maximisateur de profit · **demande = offre** |
| Définition 5.9 ? | Efficacité de Pareto **avec production**, sur les allocations **réalisables** |
| Ce que le planificateur devrait connaître en plus ? | Les **technologies** et l'affectation **compétences/firmes** |
| Théorème 5.14 ? | **Premier théorème du bien-être avec production** |
| Son hypothèse ? | Seulement $u^i$ **strictement croissante** |
| Le lemme réutilisé ? | Le **lemme 5.2**, **sans modification** |
| La contradiction finale ? | La **maximisation du profit d'une firme**, pas la faisabilité |
| Le pas subtil ? | Une **somme** ne croît que si **un terme** croît |
| Théorème 5.15 ? | **Second théorème avec production**, avec **transferts $T_i$**, $\sum_i T_i=0$ |
| Son astuce centrale ? | $\bar Y^j\equiv Y^j-\{\hat y^{\,j}\}$ |
| Pourquoi elle marche ? | Translation ⟹ hyp. 5.2 préservée **et $0\in\bar Y^j$** |
| L'économie auxiliaire ? | $\bar E=(u^i,\hat x^i,\theta^{ij},\bar Y^j)$ — dotations = **l'allocation efficace** |
| Pourquoi $u^i(\bar x^i)\geq u^i(\hat x^i)$ ? | Profits $\geq0$ ⟹ **chacun peut s'offrir sa dotation** |
| Ce que force l'efficacité de $(\hat x,\hat y)$ ? | **Toutes les inégalités deviennent des égalités** |
| Ce que force la stricte quasiconcavité ? | $\bar x^i=\hat x^i$ |
| Pourquoi les profits sont-ils nuls ? | Le budget est **saturé exactement en $\hat x^i$** |
| Ce qui en découle ? | $\bar y^{\,j}=0$ pour toute firme |
| Comment on remonte à $Y^j$ ? | **Exercice 5.30** — translation inverse |
| La formule des transferts ? | $T_i=\bar p\cdot\hat x^i-m^i(\bar p)$ |
| Pourquoi somment-ils à zéro ? | Par la **réalisabilité** de $(\hat x,\hat y)$ |
| L'idée unique du §5.4 ? | **RAFFINER la notion de bien** |
| Le temps ? | Indexer par la **date** : $x_{kt}$ |
| Deux biens, deux dates ? | **Quatre** biens distincts |
| L'incertitude ? | Indexer par l'**état** : $x_{ks}$ |
| Comment naît l'assurance ? | **Faire dépendre la DOTATION de l'état** |
| Ce qu'est un « état du monde » à la date $t$ ? | Le **vecteur** $(s_1,\dots,s_t)$ des événements survenus |
| La formule de $M$ ? | $S_1+S_1S_2+\dots+S_1S_2\cdots S_T$ |
| L'erreur classique sur $M$ ? | Écrire seulement $S_1S_2\cdots S_T$ — il faut **sommer** |
| Le nombre total de biens ? | $n=N\times M$ |
| Le point crucial du §5.4.3 ? | *« **Simplement** une économie de propriété privée à $n=NM$ biens »* |
| La justification économique ? | L'**automobile aujourd'hui** ≠ l'automobile **dans six mois** |
| L'équation (5.6) ? | Demande = offre **pour chaque** $(k,t,s)$ |
| L'équation (5.7) ? | **UNE SEULE** contrainte budgétaire, **globale** |
| Ce qu'un déficit à un $(t,s)$ signifie ? | **EMPRUNT** ou **ASSURANCE** reçue |
| Ce qu'un excédent signifie ? | **PRÊT** ou **assurance fournie** sur un état non survenu |
| Comment l'équilibre s'implémente ? | Un **marché de contrats à la DATE ZÉRO** |
| Ce qu'est un contrat ? | $(\text{quantité},\ k,\ t,\ s)$ — exemple : $(107{,}6,3,2,7)$ |
| Ce que devient $\hat x^i-e^i$ ? | Un **vecteur de contrats** à recevoir / à fournir |
| Que se passe-t-il après la date zéro ? | **Aucun échange** — seulement l'**exécution** des contrats |
| Ce que garantit (5.6) à ce moment ? | Que l'exécution est **faisable** |
| Le rôle des marchés au comptant ? | **Aucun** (ex. 5.33) — sauf avec les **titres d'Arrow** (ex. 5.34) |
| Hypothèse cachée n°1 ? | **Monitoring parfait** ⟹ la **faillite est supposée absente** |
| Hypothèse cachée n°2 ? | **Information parfaite** ⟹ sinon **incitation à mentir** sur l'état |
| Hypothèse cachée n°3 ? | **Exécution parfaite** des contrats |
| Le mot de la fin du §5.4 ? | *« Remarquable combien de **kilomètres supplémentaires** on tire en **réinterprétant** les variables ! »* |
| Ce que les exercices explorent ensuite ? | **Assurance**, **emprunt/prêt**, **taux d'intérêt**, **valorisation d'actifs** |
