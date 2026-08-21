# Fiche 510 — Équilibre général en échange : le cœur et l'existence de l'équilibre walrasien

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 5 « General Equilibrium », §5.1 « Equilibrium in Exchange » et §5.2.1 « Existence of Equilibrium » (p. 195-212) |
| **Difficulté** | Avancé — la démonstration la plus technique du livre |
| **Temps d'étude estimé** | 150 min |
| **Prérequis** | Fiches 500 à 502 (utilité indirecte, demande) · théorème du point fixe de Brouwer (thm A1.11) · théorème du maximum (A2.21) · suites bornées et sous-suites convergentes (A1.8) |
| **Concepts clés** | Main invisible, économie d'échange, dotation initiale, boîte d'Edgeworth, courbe des contrats, équilibre de troc, allocation réalisable, efficacité de Pareto, coalition bloquante, cœur d'une économie d'échange, système de marchés décentralisé, demande excédentaire agrégée, loi de Walras, équilibre walrasien, Wald, McKenzie, Arrow-Debreu, théorème du point fixe de Brouwer, non-bornitude de la demande excédentaire |
| **Poids à l'examen** | La **boîte d'Edgeworth** et le raisonnement de blocage · les **définitions 5.1 à 5.3** (Pareto, coalition bloquante, cœur) · la **loi de Walras** et sa démonstration · les **trois conditions** du théorème 5.3 et l'architecture de sa preuve par **Brouwer** · le **théorème 5.4** (pourquoi la condition 3 tient) · l'**exemple 5.1** (CES, normalisation des prix). |

## 🎯 Vue d'ensemble

```
LE FIL DU §5.1-5.2.1 : la vision de Smith est-elle LOGIQUEMENT COHERENTE ?

  LES TROIS GRANDES QUESTIONS
     EXISTENCE · UNICITE · STABILITE de l'equilibre general concurrentiel
     « Toutes sont profondes et importantes, mais nous ne traiterons que la
       PREMIERE. »

  §5.1  L'ECHANGE SANS MARCHES  --  un point de repere

     une societe SANS production : chacun est DOTE de biens
     propriete privee, echange VOLONTAIRE et non coercitif
     -> ou ce systeme peut-il se REPOSER ?  = EQUILIBRES DE TROC

     LA BOITE D'EDGEWORTH   (2 consommateurs, 2 biens)
        largeur = dotation totale en x1 · hauteur = dotation totale en x2
        chaque point = une REPARTITION complete des totaux
        COURBE DES CONTRATS CC = les points de TANGENCE des indifferences

        partant de e :
        - tout point hors de la LENTILLE est BLOQUE par un consommateur
        - tout point DANS la lentille mais HORS de CC : les deux peuvent
          encore gagner -> pas un equilibre
        - le segment cc de CC dans la lentille = LES EQUILIBRES DE TROC

     LE CAS GENERAL  (I consommateurs, n biens)
        allocation REALISABLE   F(e) = { x | SOMME_i x^i = SOMME_i e^i }
        DEF. 5.1  PARETO-EFFICACE : aucune y realisable ne fait mieux
                  pour tous avec au moins une preference stricte
        DEF. 5.2  COALITION BLOQUANTE S : avec leurs SEULES dotations,
                  les membres de S peuvent tous faire au moins aussi bien
                  et au moins un strictement mieux
        DEF. 5.3  LE COEUR C(e) = les allocations realisables NON BLOQUEES

        non bloque ==> Pareto-efficace (sinon la GRANDE coalition bloque)

  §5.2  LE SYSTEME DE MARCHES CONCURRENTIELS

     la force du modele : il est DECENTRALISE
        chaque agent n'a besoin de connaitre QUE LES PRIX
        -> exigences informationnelles MINIMALES
        (contraste radical avec le troc, qui exige de tout savoir des autres)

     mais cela SUPPOSE qu'un vecteur de prix equilibre TOUS les marches
     l'interdependance rend la question SUBTILE :
        corriger le marche 2 peut DESEQUILIBRER le marche 1

  §5.2.1  L'EXISTENCE

     HYPOTHESE 5.1   u^i continue, FORTEMENT croissante, STRICTEMENT
                     quasiconcave sur R^n_+
        ATTENTION : Cobb-Douglas n'est NI l'un NI l'autre sur tout R^n_+

     THEOREME 5.1   solution UNIQUE et CONTINUE en p sur R^n_++
                    (PAS sur la frontiere : la demande peut exploser)

     DEF. 5.4   DEMANDE EXCEDENTAIRE   z_k(p) = SOMME_i x^i_k - SOMME_i e^i_k

     THEOREME 5.2   z est  CONTINUE · HOMOGENE de degre 0 · p . z(p) = 0
                    cette derniere = LOI DE WALRAS
        consequence : si n-1 marches sont equilibres, LE n-ieme L'EST AUSSI

     DEF. 5.5   EQUILIBRE WALRASIEN :  p* >> 0  tel que  z(p*) = 0

     L'HISTOIRE
        WALRAS (1874) : autant d'equations que d'inconnues -> FALLACIEUX
        WALD (1936)   : contre-exemple, et premiere preuve correcte
        McKENZIE (1954) · ARROW-DEBREU (1954) : preuves generales par
                     POINT FIXE

     THEOREME 5.3   si z satisfait
        (1) continuite sur R^n_++
        (2) loi de Walras
        (3) si p -> pbar avec pbar_k = 0 pour un k, alors pour un certain
            k' avec pbar_k' = 0, la suite z_k'(p^m) est NON BORNEE
        alors il existe p* >> 0 avec z(p*) = 0

        preuve : tronquer z a 1, restreindre a un simplexe S_eps COMPACT,
        construire f continue de S_eps dans S_eps, appliquer BROUWER,
        faire tendre eps vers 0, extraire une sous-suite convergente,
        la condition 3 exclut p*_k = 0, conclure par la loi de Walras

     THEOREME 5.4   l'hypothese 5.1 + dotation agregee >> 0  ==>  cond. 3
     THEOREME 5.5   donc l'EQUILIBRE WALRASIEN EXISTE
```

> **La question posée dès l'ouverture du chapitre.** *« La vision de Smith d'un système fonctionnant harmonieusement, composé de nombreux individus intéressés achetant et vendant sur des marchés impersonnels — **sans égard pour rien d'autre que leur gain personnel** — est-elle **une vision logiquement cohérente** ? »*

> ⚠️ **Note de transcription — identique aux fiches 500-509.** Le PDF n'exporte pas $\succsim$, $\gg$, $\sum$, $\neq$ ; il rend l'inégalité vectorielle $\geq$ comme un « + ». Ces symboles sont rétablis depuis la prose et les équations voisines. Les indices supérieurs désignent les **consommateurs**, les indices inférieurs les **biens** — convention posée par le livre.

## 🟠 Concept 1 — Le programme du chapitre 5

### 1.1 La main invisible

> *« Beaucoup de savants font remonter la naissance de l'économie à la publication de *La Richesse des nations* d'**Adam Smith (1776)**. Derrière le chaos superficiel d'**innombrables actions de marché interdépendantes menées par des agents égoïstes**, Smith voyait **une force harmonisatrice au service de la société**. Cette **Main Invisible** guide le système de marché vers un équilibre que Smith croyait doté de **certaines caractéristiques socialement désirables**. »*

### 1.2 Les trois questions, et celle que le livre traite

> *« Si [la vision est cohérente], **y a-t-il un état particulier vers lequel un tel système tendra, ou y en a-t-il beaucoup** ? Ces états sont-ils **fragiles** ou **robustes** ? Ce sont les questions d'**existence, d'unicité et de stabilité** de l'équilibre général concurrentiel. **Toutes sont profondes et importantes, mais nous ne traiterons que la première.** »*

> *« De bien des manières, **l'existence est la question la plus fondamentale**. Ce qui est en jeu est **la cohérence logique de la notion même de système de marché concurrentiel**. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi l'existence est décisive et pas seulement technique.</span>

*« Les prix de marché déterminent dans une large mesure **"qui obtient quoi"** dans une économie de marché. »* Si aucun vecteur de prix n'équilibrait tous les marchés, **le modèle du consommateur et du producteur des chapitres 1 et 3 serait vide** : on y a supposé partout que les demandes sont satisfaites et les offres écoulées.

</div>

## 🔴 Concept 2 — L'échange sans marchés : la boîte d'Edgeworth (§5.1)

### 2.1 Le cadre

> *« Nous explorons le problème économique fondamental de la distribution dans une **société très simple, sans marchés organisés**. Notre objectif est de décrire **quelles issues pourraient surgir d'un processus d'échange volontaire**. En examinant ces issues, nous pouvons établir **un point de repère** contre lequel comparer les équilibres atteints sous des systèmes de marchés concurrentiels. »*

**Les quatre hypothèses :**

| # | Hypothèse |
|---|---|
| 1 | **Pas de production** — *« les biens existent, mais pour l'instant nous ne demandons pas comment »* |
| 2 | Chaque consommateur est **doté** par la nature d'une certaine quantité de biens |
| 3 | Chacun a des préférences et **ne se soucie que de son propre bien-être** |
| 4 | **Propriété privée** et **échange volontaire non coercitif** |

> *« En l'absence de coercition, et parce que les consommateurs sont intéressés, **l'échange volontaire est le seul moyen** par lequel les biens peuvent être redistribués. […] **Où ce système peut-il venir se reposer** ? Nous appellerons de tels points de repos des **équilibres de troc**. »*

### 2.2 La construction de la boîte

Deux consommateurs, deux biens. Dotations $e^1\equiv(e^1_1,e^1_2)$ et $e^2\equiv(e^2_1,e^2_2)$.

| Élément | Signification |
|---|---|
| **largeur** de la boîte | dotation **totale** en $x_1$ |
| **hauteur** de la boîte | dotation **totale** en $x_2$ |
| coin **sud-ouest** | origine du consommateur **1** |
| coin **nord-est** | origine du consommateur **2** |

> *« Chaque point de la boîte a **quatre coordonnées** — deux indiquant une quantité de chaque bien pour le consommateur 1, deux pour le consommateur 2. […] **La boîte fournit donc une image complète de toute distribution réalisable** des biens existants entre les consommateurs. »*

**La courbe des contrats.**

> *« La ligne notée $CC$ est **le sous-ensemble des allocations où les courbes d'indifférence des consommateurs sont tangentes** l'une à l'autre, et elle est appelée la **courbe des contrats**. En tout point **hors** de la courbe des contrats, les courbes d'indifférence **se coupent**. »*

### 2.3 Le raisonnement de blocage — pas à pas

**Étape 1 — la faisabilité.** *« La première exigence est que les allocations soient quelque part **"dans la boîte"**. »*

**Étape 2 — le blocage individuel.** Partant de $e$, une redistribution vers $A$ rendrait le consommateur 2 mieux loti mais **1 moins bien loti**.

> *« Parce que cette économie repose sur l'échange **volontaire**, la redistribution vers $A$ serait **refusée, ou "bloquée"**, par le consommateur 1. »*

$$\boxed{\;\text{Toute allocation hors de la LENTILLE formée par les deux indifférences en } e \text{ est BLOQUÉE.}\;}$$

**Étape 3 — l'élimination de l'intérieur hors contrats.** Soit $B$ dans la lentille mais **hors** de $CC$.

> *« Parce que $B$ est hors de la courbe des contrats, les deux courbes d'indifférence qui y passent **doivent se couper**, formant **une autre lentille entièrement contenue dans la première**. Par conséquent, **les deux consommateurs peuvent à nouveau être strictement mieux lotis** en s'échangeant à partir de $B$. »*

**Étape 4 — ce qui reste.** Un point $D$ sur le segment $cc$ de la courbe des contrats **à l'intérieur** de la lentille.

> *« Une fois que les consommateurs ont échangé jusqu'à $D$, **il n'y a plus d'échanges réalisables procurant un gain mutuel**. Ainsi, une fois $D$ atteint, **aucun échange supplémentaire n'aura lieu** : $D$ est un équilibre de troc. »*

$$\boxed{\;\text{Les équilibres de troc} = \text{le segment } cc \text{ de la courbe des contrats situé DANS la lentille.}\;}$$

> **Deux conclusions du livre :**
>
> *« **Il y a beaucoup d'équilibres de troc** vers lesquels le système pourrait évoluer. Nous nous contentons d'avoir identifié toutes les possibilités. »*
>
> *« Ces équilibres partagent tous la propriété qu'**une fois là, il n'est pas possible de se déplacer ailleurs sans rendre au moins un consommateur moins bien loti**. Ainsi, **chaque point d'équilibre en échange est Pareto-efficace** au sens du chapitre 4. »*
>
> ⚠️ **L'équilibre de troc n'est PAS unique.** Contrairement à l'équilibre partiel du chapitre 4, le processus de troc ne sélectionne pas un point mais **tout un ensemble**. C'est ce qui rendra le §5.5 (le théorème limite sur le cœur, fiche 511) si frappant.

## 🔴 Concept 3 — Le cas général : allocations, efficacité, cœur

### 3.1 Le cadre

$\mathcal{I}=\{1,\dots,I\}$ consommateurs, $n$ biens. Chaque consommateur $i$ a une relation $\succsim^i$ et une dotation $e^i=(e^i_1,\dots,e^i_n)\geq0$.

> *« La collection $E=\big(\succsim^i,\,e^i\big)_{i\in\mathcal{I}}$ définit une **économie d'échange**. »*

**L'allocation.** $x\equiv(x^1,\dots,x^I)$ où $x^i$ est le panier de $i$.

**Les allocations réalisables :**

$$\boxed{\;F(e)\equiv\left\{\,x \ \Big|\ \sum_{i\in\mathcal{I}}x^i=\sum_{i\in\mathcal{I}}e^i\,\right\}\;} \tag{5.1}$$

> *« Il contient toutes les allocations qui, **au total, épuisent la quantité disponible de chaque bien**. »*

### 3.2 Définition 5.1 — efficacité de Pareto

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 5.1 — Pareto-Efficient Allocations.</span>

Une allocation réalisable $x\in F(e)$ est **Pareto-efficace** s'il n'existe **aucune autre** allocation réalisable $y\in F(e)$ telle que $y^i\succsim^i x^i$ **pour tous** les consommateurs $i$, **avec au moins une préférence stricte**.

</div>

**Le raisonnement du livre en deux temps :**

| Sens | Argument |
|---|---|
| non efficace ⟹ **pas** un équilibre | *« le consommateur qui peut être strictement mieux loti peut arranger un échange en annonçant : "**Je donne à chaque consommateur $i$ le panier $y^i$ en échange du panier $x^i$**". […] Aucun consommateur n'y objectera parce que cela les rend **tous au moins aussi bien lotis** qu'avant »* |
| efficace ⟹ **on ne peut pas s'en écarter** | *« toute autre allocation réalisable qui rend quelqu'un mieux loti **doit rendre au moins un autre moins bien loti**. Ce dernier **n'acceptera pas** l'échange »* |

### 3.3 Définition 5.2 — les coalitions bloquantes

**Le raisonnement qui la motive :**

> *« Bien que vous puissiez préférer le panier qui vous est assigné à votre propre dotation, **vous pourriez trouver un autre consommateur avec qui échanger de sorte que vous fassiez encore mieux** et qu'il ne fasse pas moins bien que sous l'allocation proposée. Par conséquent, **bien que vous ne puissiez pas bloquer seul, vous pouvez bloquer À DEUX**. Bien sûr, le potentiel de blocage n'est pas limité aux coalitions de taille 2. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 5.2 — Blocking Coalitions.</span>

Soit $S\subset\mathcal{I}$ une coalition. On dit que $S$ **bloque** $x\in F(e)$ s'il existe une allocation $y$ telle que :

1. $\displaystyle\sum_{i\in S}y^i=\sum_{i\in S}e^i$ ;
2. $y^i\succsim^i x^i$ pour tout $i\in S$, **avec au moins une préférence stricte**.

</div>

> *« Ensemble, les deux items disent que **les consommateurs de $S$ doivent pouvoir prendre ce qu'ils ont EUX-MÊMES et le répartir différemment ENTRE EUX** de sorte qu'aucun ne soit moins bien loti et qu'au moins un soit mieux loti. Ainsi, une allocation est bloquée dès qu'**un groupe, si grand ou petit soit-il, peut faire mieux en "faisant cavalier seul"**. »*

*(Note 1 du livre : « il n'y a pas besoin d'insister que $y\in F(e)$, parce qu'on peut toujours y parvenir en remplaçant les paniers allant aux consommateurs $j\notin S$ par $e^j$. »)*

> ⚠️ **Le point 1 est la clause essentielle.** La coalition ne peut utiliser **que ses propres dotations** — elle ne peut pas compter sur les biens des non-membres. C'est ce qui rend le blocage crédible : la coalition peut effectivement **se retirer** de l'accord.

### 3.4 Définition 5.3 — le cœur

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 5.3 — The Core of an Exchange Economy.</span>

Le **cœur** d'une économie d'échange de dotation $e$, noté $C(e)$, est **l'ensemble de toutes les allocations réalisables non bloquées**.

</div>

**Le lien avec l'efficacité :**

> *« Si $x\in F(e)$ est **non bloquée**, alors elle **doit être Pareto-efficace**, parce que sinon elle serait bloquée par la **grande coalition** $S=\mathcal{I}$. »*

$$\boxed{\;C(e)\ \subseteq\ \{\text{allocations Pareto-efficaces}\}\;}$$

> *« Une allocation $x\in F(e)$ est un **équilibre** dans l'économie d'échange si $x$ **n'est bloquée par aucune coalition**. »*

### 3.5 La remarque finale du §5.1 — et l'annonce du §5.2

> *« Nous avons argumenté que sous des circonstances **idéales**, incluant **le caractère non coûteux de la formation des coalitions ET de l'acquisition de l'information** nécessaire pour arranger des échanges mutuellement bénéfiques, les consommateurs sont conduits à poursuivre l'atteinte d'allocations dans le cœur. »*

> *« De ce point de vue, **les points du cœur semblent très loin de devenir une réalité dans une économie réelle**. Après tout, la plupart d'entre nous avons **peu ou pas de contact direct avec la vaste majorité des autres consommateurs**. Par conséquent, on serait surpris qu'il n'y ait **pas des gains d'échange substantiels inexploités**, quelle que soit l'organisation de l'économie. »*

> *« Dans la section suivante, nous investiguons les économies organisées par des **marchés concurrentiels**. **Préparez-vous à une surprise.** »*

> **C'est l'annonce du théorème 5.6** (fiche 511) : **tout équilibre walrasien est dans le cœur**. Le marché, avec ses exigences informationnelles minimales, atteint ce que le troc exigerait une information parfaite pour obtenir.

## 🔴 Concept 4 — Le système de marchés concurrentiels (§5.2)

### 4.1 La décentralisation — la force du modèle

> *« Une caractéristique notable du modèle concurrentiel est sa **nature décentralisée**. Chaque consommateur, **pleinement au fait des prix**, demande un panier qui est le meilleur pour lui, **sans avoir besoin de considérer ce que les autres consommateurs pourraient demander**, étant pleinement confiant qu'une production suffisante a eu lieu. »*

> *« **La naïveté exprimée dans l'aspect décentralisé du modèle concurrentiel devrait être vue comme une FORCE.** Parce qu'à l'équilibre les demandes seront satisfaites et les outputs achetés, **les actions des autres agents peuvent être ignorées** et **la seule information requise est les prix en vigueur**. Par conséquent, **les exigences informationnelles de ce modèle sont minimales**. »*

> *« Ceci **contraste nettement** avec le modèle de troc de la section précédente, dans lequel **chaque consommateur requiert une information très détaillée sur les préférences et les paniers de tous les autres**. »*

### 4.2 Le prix à payer : il faut que les prix existent

> *« Clairement, l'optimalité d'ignorer les actions des autres **exige qu'aux prix en vigueur les demandes soient satisfaites et les offres écoulées**. Il est donc **essentiel que les prix puissent équilibrer tous les marchés simultanément**. »*

> *« Mais **n'est-il pas plutôt audacieux de présumer** qu'un vecteur de prix approprié garantira que **les goûts divers des consommateurs** et la totalité de leurs demandes seront **exactement égalés par les offres** venant du côté production, avec ses nombreuses firmes distinctes ? **L'existence d'un tel vecteur de prix n'est pas du tout évidente.** »*

### 4.3 L'illustration de la difficulté — l'interdépendance

> *« Supposons trois biens. Au prix courant, la demande du bien 1 égale son offre : ce marché est en équilibre. Mais supposons **un excès de demande pour le bien 2** et **un excès d'offre du bien 3**. Il serait naturel de supposer qu'on peut équilibrer ces marchés en **augmentant le prix du bien 2** et en **diminuant celui du bien 3**. »*

> *« Or, bien que cela puisse aider à réduire l'écart sur ces marchés, **ces changements de prix peuvent très bien affecter la demande du bien 1** ! Après tout, si les biens 1 et 2 sont **substituts**, alors une hausse du prix du bien 2 peut **augmenter la demande du bien 1**. Ainsi, **changer les prix des biens 2 et 3 pour les équilibrer peut détruire l'équilibre du marché du bien 1**. »*

> ⚠️ **C'est l'argument central pour lequel l'existence n'est pas triviale.** Un raisonnement marché par marché ne converge pas nécessairement ; il faut un argument **global**, portant sur le vecteur de prix tout entier. C'est ce qu'apportera le **théorème du point fixe**.

## 🔴 Concept 5 — La demande excédentaire et la loi de Walras (§5.2.1)

### 5.1 L'hypothèse 5.1

> **ASSUMPTION 5.1 — Consumer Utility.** $u^i$ est **continue**, **fortement croissante** (*strongly increasing*) et **strictement quasiconcave** sur $\mathbb{R}^n_+$.

*(Note 2 du livre : « une fonction est **fortement croissante** si **augmenter strictement une composante** du vecteur du domaine et n'en abaisser aucune **augmente strictement** la valeur de la fonction. »)*

> ⚠️ **L'avertissement du livre, en note :** *« Notez aussi que **les utilités Cobb-Douglas ne sont NI fortement croissantes NI strictement quasiconcaves sur tout $\mathbb{R}^n_+$**, et sont donc exclues par l'hypothèse 5.1. »*
>
> **Pourquoi.** Sur $\mathbb{R}^2_+$, $u=x_1x_2$ vaut $0$ dès qu'une coordonnée est nulle : augmenter $x_1$ de $(0,0)$ à $(1,0)$ **n'augmente pas** $u$. La restriction est donc réelle — mais l'exercice 5.14 montre que l'existence est **quand même** garantie avec Cobb-Douglas.
>
> **Notez la différence avec l'axiome 4 de la fiche 500 :** la « monotonicité stricte » n'exigeait $\succ$ que sous $\gg$ ; la **forte croissance** l'exige dès qu'**une seule** coordonnée augmente. C'est plus fort.

### 5.2 Le problème du consommateur

$$\max_{x^i\in\mathbb{R}^n_+} \ u^i(x^i) \quad\text{s.c.}\quad p\cdot x^i \leq p\cdot e^i \tag{5.2}$$

> *« La contrainte exprime la contrainte budgétaire usuelle mais **identifie explicitement la source du revenu**. Intuitivement, on peut imaginer un consommateur **vendant toute sa dotation** aux prix du marché, recevant le revenu $p\cdot e^i$, puis faisant face à la contrainte ordinaire. »*

> **THEOREM 5.1 — Basic Properties of Demand.** Si $u^i$ satisfait l'hypothèse 5.1, alors pour chaque $p\gg0$, le problème (5.2) a une **solution unique** $x^i(p,p\cdot e^i)$. De plus, $x^i(p,p\cdot e^i)$ est **continue en $p$ sur $\mathbb{R}^n_{++}$**.

**D'où viennent ces propriétés :**

| Propriété | Source |
|---|---|
| existence | $p\gg0$ ⟹ ensemble budgétaire **borné** (Weierstrass) |
| unicité | **stricte quasiconcavité** de $u^i$ |
| continuité | **théorème du maximum** (A2.21) — *« et ceci exige $p\gg0$ »* |

> ⚠️ **L'avertissement décisif pour toute la suite :**
>
> *« Nous soulignons que $x^i(p,p\cdot e^i)$ **n'est PAS continue en $p$ sur tout $\mathbb{R}^n_+$** parce que **la demande peut très bien être infinie si l'un des prix est nul**. Nous devrons faire un peu de travail plus tard pour traiter cette difficulté **désagréable mais inévitable**. »*
>
> Toute la technicité du théorème 5.3 vient de là.

### 5.3 La demande excédentaire

> *« L'analyse la plus ancienne des systèmes de marchés, entreprise par **Léon Walras (1874)**, procédait avec chaque marché décrit par des fonctions de demande et d'offre séparées. Aujourd'hui, largement par **commodité et simplicité notationnelle**, il est plus commun de décrire chaque marché par **une seule fonction de demande excédentaire**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 5.4 — Excess Demand.</span>

$$\boxed{\;z_k(p)\equiv\sum_{i\in\mathcal{I}}x^i_k(p,p\cdot e^i)-\sum_{i\in\mathcal{I}}e^i_k\;}$$

et $z(p)\equiv\big(z_1(p),\dots,z_n(p)\big)$.

</div>

| Signe | Signification |
|---|---|
| $z_k(p)>0$ | **excès de demande** pour le bien $k$ |
| $z_k(p)<0$ | **excès d'offre** du bien $k$ |

### 5.4 Théorème 5.2 — les trois propriétés

> **THEOREM 5.2 — Properties of Aggregate Excess Demand Functions.** Si chaque $u^i$ satisfait l'hypothèse 5.1, alors pour tout $p\gg0$ :
>
> 1. **Continuité** : $z(\cdot)$ est continue en $p$.
> 2. **Homogénéité** : $z(\lambda p)=z(p)$ pour tout $\lambda>0$.
> 3. **Loi de Walras** : $\;p\cdot z(p)=0$.

**Continuité** — découle du théorème 5.1.

**Homogénéité** — *« un coup d'œil à la contrainte de (5.2) devrait vous convaincre que les demandes individuelles, et les demandes excédentaires, sont homogènes de degré zéro en prix. »*

> **Notez la subtilité.** Ici, **le revenu s'échelonne automatiquement** : si $p$ devient $\lambda p$, le revenu $p\cdot e^i$ devient $\lambda\,p\cdot e^i$. La demande est donc homogène de degré 0 en $p$ **seul** — alors qu'au chapitre 1 il fallait échelonner $(p,y)$ **conjointement**. C'est parce que le revenu est ici **endogène**.

### 5.5 La loi de Walras — la démonstration

> *« La troisième propriété, **la loi de Walras, est importante**. Elle dit que **la valeur de la demande excédentaire agrégée sera toujours nulle** à tout ensemble de prix positifs. »*

**Le point de départ.** $u^i$ étant **fortement croissante**, chaque contrainte budgétaire est **saturée** :

$$\sum_{k=1}^n p_k\Big[x^i_k(p,p\cdot e^i)-e^i_k\Big]=0$$

**Sommer sur les individus :**

$$\sum_{i\in\mathcal{I}}\sum_{k=1}^n p_k\Big[x^i_k-e^i_k\Big]=0$$

**Intervertir l'ordre de sommation** *(« l'ordre est indifférent »)* :

$$\sum_{k=1}^n\sum_{i\in\mathcal{I}} p_k\Big[x^i_k-e^i_k\Big]=0 \qquad\Longleftrightarrow\qquad \sum_{k=1}^n p_k\left[\sum_{i}x^i_k-\sum_i e^i_k\right]=0$$

Le crochet **est** $z_k(p)$, d'où

$$\boxed{\;\sum_{k=1}^n p_k\,z_k(p)=0 \qquad\text{c'est-à-dire}\qquad p\cdot z(p)=0\;} \qquad\blacksquare$$

### 5.6 Les implications de la loi de Walras

**Le cas à deux biens.** $p_1z_1(p)=-p_2z_2(p)$, donc :

| Si | Alors |
|---|---|
| $z_1(p)>0$ (excès de demande en 1) | $z_2(p)<0$ (excès d'**offre** en 2) |
| $z_1(p)=0$ (marché 1 équilibré) | $z_2(p)=0$ (marché 2 **aussi**) |

**La généralisation :**

> *« **Tout excès de demande dans le système doit être exactement compensé par un excès d'offre de valeur égale** ailleurs dans le système. De plus, **si à certains prix $n-1$ marchés sont en équilibre, la loi de Walras garantit que le $n$-ième l'est aussi**. **Ceci est souvent très utile à retenir.** »*

$$\boxed{\;n-1 \text{ marchés équilibrés} \ \Longrightarrow\ \text{le } n\text{-ième l'est aussi}\;}$$

> ⚠️ **C'est l'outil de calcul le plus rentable de tout le chapitre.** Dans un exercice à $n$ biens, il suffit de résoudre $n-1$ équations d'équilibre — la dernière est **automatiquement** satisfaite. L'exemple 5.1 l'utilise explicitement.

### 5.7 L'équilibre walrasien

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 5.5 — Walrasian Equilibrium.</span>

Un vecteur $p^*\in\mathbb{R}^n_{++}$ est appelé un **équilibre walrasien** si $z(p^*)=0$.

</div>

*(Note 3 du livre : « nous restreignons l'attention aux prix **positifs**. Strictement parlant, il n'y a pas de raison de le faire. Cependant, sous notre hypothèse que les utilités sont fortement croissantes, **la demande excédentaire ne peut être nulle que si tous les prix sont positifs**. Voir exercice 5.3. »)*

## 🔴 Concept 6 — L'histoire du problème d'existence

> *« Cette question centrale de la théorie économique a attiré l'attention d'un grand nombre de théoriciens. »*

| Auteur | Contribution |
|---|---|
| **Walras (1874)** | Le premier à poser la question — mais *« sa conclusion reposait sur l'**hypothèse fallacieuse** que tout système d'équations ayant autant d'inconnues que d'équations possède toujours une solution »* |
| **Wald (1936)** | Le premier à pointer l'erreur, avec un **contre-exemple** ; et le premier à donner une preuve mathématiquement correcte — mais *« avec ce que beaucoup regarderaient comme des hypothèses inutilement restrictives »* (préférences **fortement séparables**, « utilité marginale décroissante » pour chaque bien) |
| **McKenzie (1954)** et **Arrow-Debreu (1954)** | *« les premiers à offrir des preuves significativement plus générales. **Chacun a formulé la recherche de prix équilibrant comme la recherche d'un POINT FIXE** d'une application soigneusement choisie, et a employé de puissants théorèmes de point fixe »* |

**Le contre-exemple de Wald**, cité par le livre :

> *« les deux équations à deux inconnues $x^2+y^2=0$ et $x^2-y^2=1$ **n'ont pas de solution**, comme vous pouvez facilement le vérifier. »*

<details class="details--riche">
<summary>

**Vérifier le contre-exemple de Wald**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre laisse la vérification au lecteur.</span>

</div>

La première équation $x^2+y^2=0$ n'admet, sur les **réels**, qu'une seule solution : $x=y=0$ *(une somme de carrés est nulle si et seulement si chaque terme l'est)*.

Or en $x=y=0$, la seconde équation donne $0-0=0\neq1$. **Le système n'a donc aucune solution réelle.**

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que le contre-exemple établit.</span>

*« Autant d'équations que d'inconnues »* est une condition **ni nécessaire ni suffisante** à l'existence d'une solution. Le comptage de Walras était un raisonnement **heuristique**, pas une preuve.

⚠️ **La leçon méthodologique dépasse l'économie.** Chaque fois qu'on affirme qu'un système économique « a autant d'équations que d'inconnues, donc une solution », on commet l'erreur de Walras. Seul un théorème de point fixe — ou un argument équivalent — établit l'existence.

</div>

</details>

## 🔴 Concept 7 — Théorème 5.3 : l'existence par le point fixe

### 7.1 L'énoncé

> **THEOREM 5.3 — Aggregate Excess Demand and Walrasian Equilibrium.** Supposons que $z:\mathbb{R}^n_{++}\to\mathbb{R}^n$ satisfasse les trois conditions suivantes :
>
> 1. $z(\cdot)$ est **continue** sur $\mathbb{R}^n_{++}$ ;
> 2. $p\cdot z(p)=0$ pour tout $p\gg0$ ;
> 3. si $\{p^m\}$ est une suite de vecteurs de prix de $\mathbb{R}^n_{++}$ convergeant vers $\bar p\neq0$, et si $\bar p_k=0$ pour un certain bien $k$, alors **pour un certain bien $k'$ tel que $\bar p_{k'}=0$**, la suite des demandes excédentaires $\{z_{k'}(p^m)\}$ est **non bornée supérieurement**.
>
> Alors il existe un vecteur de prix $p^*\gg0$ tel que $z(p^*)=0$.

### 7.2 Lire la troisième condition

> *« Les deux premières sont familières et sont garanties sous les hypothèses du théorème 5.2. **Seule la troisième, d'apparence plutôt menaçante, est nouvelle.** Ce qu'elle dit est en fait très facile à comprendre. Elle dit en gros que **si les prix de CERTAINS mais NON DE TOUS les biens sont arbitrairement proches de zéro, alors la demande excédentaire d'au moins l'un de ces biens est arbitrairement élevée**. Formulée ainsi, la condition sonne plutôt **plausible**. »*

> ⚠️ **Trois précisions dans l'énoncé de la condition 3.** — $\bar p\neq0$ : **certains** prix tendent vers zéro, pas tous. — Le bien $k'$ dont la demande explose **n'est pas nécessairement** le bien $k$ dont le prix s'annule — mais il doit avoir lui aussi un prix limite nul. — « **non bornée supérieurement** » : la suite n'a pas de majorant, pas nécessairement une limite infinie.

### 7.3 L'architecture de la preuve

> *« Nous remarquons qu'**ici, le manque de continuité de la demande excédentaire sur la frontière de l'orthant non négatif des prix nous oblige à travailler dur**. En particulier, en plusieurs endroits, nous prenons soin de **rester à l'écart de cette frontière**. »*

**Pas 1 — tronquer.** Poser $\bar z_k(p)=\min\big(z_k(p),1\big)$.

> *« Nous sommes ainsi assurés que $\bar z_k(p)$ est **borné supérieurement par 1**. »*

**Pas 2 — restreindre le domaine des prix.** Fixer $\varepsilon\in(0,1)$ et poser

$$\boxed{\;S_\varepsilon=\left\{p \ \Big|\ \sum_{k=1}^n p_k=1 \ \text{ et } \ p_k\geq\frac{\varepsilon}{1+2n} \ \ \forall k\right\}\;}$$

> *« Notez comme **les prix sur et près de la frontière sont exclus** de $S_\varepsilon$. Notez aussi qu'**à mesure que $\varepsilon$ tend vers zéro, $S_\varepsilon$ inclut de plus en plus de prix**. Nous pouvons donc **élargir la portée de notre recherche en laissant $\varepsilon$ tendre vers zéro**. »*

**Les trois propriétés de $S_\varepsilon$**, qui sont exactement les hypothèses de Brouwer :

| Propriété | Justification du livre |
|---|---|
| **compact** | *« il est à la fois fermé et borné »* |
| **convexe** | *« peut être facilement vérifié »* |
| **non vide** | *« le vecteur de prix dont chaque composante vaut $(2+1/n)/(1+2n)$ en est toujours membre parce que $\varepsilon<1$ »* |

**Pas 3 — construire l'application.** Pour chaque bien $k$ et chaque $p\in S_\varepsilon$ :

$$\boxed{\;f_k(p)=\frac{\varepsilon+p_k+\max\big(0,\bar z_k(p)\big)}{n\varepsilon+1+\sum_{m=1}^n \max\big(0,\bar z_m(p)\big)}\;}$$

> **L'idée derrière cette formule.** Le numérateur **augmente le prix des biens en excès de demande** ($\bar z_k>0$) et le laisse inchangé pour les autres. Le dénominateur **normalise** pour que les nouveaux prix somment à 1. C'est une version formalisée du « tâtonnement » walrasien.

**La vérification que $f:S_\varepsilon\to S_\varepsilon$ :**

| Point | Vérification |
|---|---|
| $\sum_k f_k(p)=1$ | le dénominateur est exactement la somme des numérateurs |
| $f_k(p)\geq\dfrac{\varepsilon}{n\varepsilon+1+n}$ | car $\bar z_m(p)\leq1$ pour chaque $m$ |
| donc $f_k(p)\geq\dfrac{\varepsilon}{1+2n}$ | car $\varepsilon<1$ |

**La continuité de $f$ :**

> *« Chaque $f_k$ est continue sur $S_\varepsilon$ parce que, par la condition 1, $z_k$ — et donc $\bar z_k$ — est continue sur $S_\varepsilon$, de sorte que **numérateur et dénominateur** sont continus. De plus, **le dénominateur est borné loin de zéro** parce qu'il vaut toujours au moins 1. »*

**Pas 4 — appliquer Brouwer.**

> *« $f$ est donc une **fonction continue** appliquant l'ensemble **non vide, compact, convexe** $S_\varepsilon$ **dans lui-même**. Nous pouvons alors faire appel au **théorème du point fixe de Brouwer** (théorème A1.11) pour conclure qu'il existe $p^\varepsilon\in S_\varepsilon$ tel que $f(p^\varepsilon)=p^\varepsilon$. »*

En développant $f_k(p^\varepsilon)=p^\varepsilon_k$ et en réarrangeant :

$$p^\varepsilon_k\left[n\varepsilon+\sum_{m=1}^n\max\big(0,\bar z_m(p^\varepsilon)\big)\right]=\varepsilon+\max\big(0,\bar z_k(p^\varepsilon)\big) \tag{P.1}$$

**Pas 5 — faire tendre $\varepsilon$ vers zéro.**

> *« La suite de prix est **bornée**, parce que $p^\varepsilon\in S_\varepsilon$ implique que le prix de chaque marché est entre zéro et un. Par conséquent, par le **théorème A1.8**, **une sous-suite doit converger**. »*

Notons $p^*$ la limite. On a $p^*\geq0$ et $p^*\neq0$ *(ses composantes somment à 1)*.

**Pas 6 — écarter la frontière grâce à la condition 3.** C'est le pas décisif.

Supposons par l'absurde $p^*_{\bar k}=0$ pour un $\bar k$. La **condition 3** donne alors un bien $k'$ avec $p^*_{k'}=0$ tel que $z_{k'}(p^\varepsilon)$ soit **non bornée supérieurement** quand $\varepsilon\to0$.

| Membre de (P.1) pour $k=k'$ | Comportement |
|---|---|
| **gauche** : $p^\varepsilon_{k'}\big[\cdots\big]$ | $p^\varepsilon_{k'}\to0$ et le crochet est **borné** (par définition de $\bar z$) ⟹ **tend vers 0** |
| **droite** : $\varepsilon+\max\big(0,\bar z_{k'}(p^\varepsilon)\big)$ | $z_{k'}$ non bornée ⟹ $\bar z_{k'}$ **atteint sa valeur maximale 1 infiniment souvent** ⟹ **ne tend pas vers 0** |

> *« Bien sûr, **c'est une contradiction** parce que les deux membres sont égaux pour toute valeur de $\varepsilon$. Nous concluons donc que $p^*\gg0$. »*

**Pas 7 — passer à la limite et conclure.** $\bar z$ héritant de la continuité de $z$ sur $\mathbb{R}^n_{++}$, on prend la limite dans (P.1) :

$$p^*_k\sum_{m=1}^n\max\big(0,\bar z_m(p^*)\big)=\max\big(0,\bar z_k(p^*)\big) \tag{P.2}$$

En **multipliant par $z_k(p^*)$ et en sommant sur $k$** :

$$\underbrace{p^*\cdot z(p^*)}_{=\,0 \text{ par la loi de Walras}}\sum_{m}\max\big(0,\bar z_m(p^*)\big)=\sum_{k=1}^n z_k(p^*)\max\big(0,\bar z_k(p^*)\big)$$

Le membre de gauche est **nul**, donc le membre de droite aussi.

> *« Mais parce que **le signe de $\bar z_k(p^*)$ est le même que celui de $z_k(p^*)$**, la somme de droite ne peut être nulle que si $z_k(p^*)\leq0$ **pour tout $k$**. Ceci, avec $p^*\gg0$ et la loi de Walras, implique que **chaque $z_k(p^*)=0$**. »* $\blacksquare$

> **La dernière étape mérite d'être détaillée.** Chaque terme $z_k\max(0,\bar z_k)$ est **positif ou nul** : si $z_k>0$, $\bar z_k>0$ et le produit est $>0$ ; si $z_k\leq0$, $\max(0,\bar z_k)=0$ et le produit est nul. Une somme de termes $\geq0$ ne peut être nulle que si **tous** le sont, donc $z_k(p^*)\leq0$ partout. Alors $p^*\cdot z(p^*)=0$ avec $p^*\gg0$ et $z\leq0$ force $z=0$.

### 7.4 Le récapitulatif du livre

> *« Ainsi, **tant que sur $\mathbb{R}^n_{++}$ la demande excédentaire agrégée est continue, satisfait la loi de Walras, et est non bornée supérieurement quand certains — mais pas tous — les prix approchent zéro, un équilibre walrasien (avec le prix de chaque bien strictement positif) est garanti d'exister**. »*

> ⚠️ **La condition 3 n'est pas superflue.** *« On pourrait être tenté d'essayer d'obtenir le même résultat **sans** la condition 3. Cependant, **on vous demande de montrer à l'exercice 5.7 que le résultat ne tient tout simplement pas sans elle**. »*

## 🔴 Concept 8 — Théorèmes 5.4 et 5.5 : l'existence sous des hypothèses primitives

### 8.1 Théorème 5.4 — pourquoi la condition 3 tient

> **THEOREM 5.4 — Utility and Aggregate Excess Demand.** Si chaque $u^i$ satisfait l'hypothèse 5.1, et si **la dotation agrégée de chaque bien est strictement positive** $\big(\sum_{i=1}^I e^i\gg0\big)$, alors la demande excédentaire agrégée satisfait les conditions 1 à 3 du théorème 5.3.

**La preuve, en cinq étapes.** *(Les conditions 1 et 2 découlent du théorème 5.2 ; il ne reste que la 3.)*

**Étape 1 — trouver un consommateur au revenu strictement positif.** Soit $\{p^m\}$ convergeant vers $\bar p\neq0$ avec $\bar p_k=0$ pour un $k$. Comme $\sum_i e^i\gg0$ :

$$\bar p\cdot\sum_i e^i>0 \qquad\Longrightarrow\qquad \sum_i \bar p\cdot e^i>0 \qquad\Longrightarrow\qquad \exists\,i \text{ tel que } \bar p\cdot e^i>0$$

**Étape 2 — supposer par l'absurde que la demande de $i$ est bornée.** Alors, par le **théorème A1.8**, une sous-suite converge : $x^m\equiv x^i(p^m,p^m\cdot e^i)\to x^*$.

**Étape 3 — la contrainte budgétaire à la limite.** $u^i$ étant **fortement croissante**, la contrainte est saturée : $p^m\cdot x^m=p^m\cdot e^i$. En passant à la limite :

$$\bar p\cdot x^*=\bar p\cdot e^i>0 \tag{P.1}$$

**Étape 4 — construire une contradiction.** Poser

$$\hat x=x^*+(0,\dots,0,\underbrace{1}_{k\text{-ième}},0,\dots,0)$$

| Fait | Justification |
|---|---|
| $u^i(\hat x)>u^i(x^*)$ (P.2) | $u^i$ **fortement croissante** — une seule coordonnée augmente |
| $\bar p\cdot\hat x=\bar p\cdot e^i>0$ (P.3) | **parce que $\bar p_k=0$** : ajouter une unité du bien $k$ **ne coûte rien** à la limite |

Par **continuité** de $u^i$, (P.2) et (P.3) donnent un $t\in(0,1)$ tel que

$$u^i(t\hat x)>u^i(x^*) \qquad\text{et}\qquad \bar p\cdot(t\hat x)<\bar p\cdot e^i$$

*(on contracte légèrement pour rendre l'inégalité budgétaire **stricte** — le même geste qu'au théorème 1.4, fiche 501.)*

Mais alors, par continuité et convergence, **pour $m$ assez grand** :

$$u^i(t\hat x)>u^i(x^m) \qquad\text{et}\qquad p^m\cdot(t\hat x)<p^m\cdot e^i$$

*« contredisant le fait que $x^m$ résout le problème du consommateur aux prix $p^m$. »*

**Conclusion de l'étape 4 :** la suite des demandes de $i$ est **non bornée**.

**Étape 5 — identifier le bien.** La suite $\{x^m\}$ étant non bornée et non négative, il existe un bien $k'$ tel que $\{x^m_{k'}\}$ soit **non bornée supérieurement**.

> *« Mais parce que **le revenu de $i$ converge** vers $\bar p\cdot e^i$, la suite des revenus $\{p^m\cdot e^i\}$ est **bornée** (voir exercice 5.8). Par conséquent, **nous devons avoir $p^m_{k'}\to0$**, parce que **c'est la seule façon que la demande du bien $k'$ puisse être non bornée ET abordable**. »*

Donc $\bar p_{k'}=0$. Et comme l'offre agrégée du bien $k'$ est **fixe** et que tous les autres consommateurs en demandent une quantité $\geq0$, la demande **excédentaire** agrégée du bien $k'$ est elle aussi non bornée supérieurement. $\blacksquare$

> **L'argument de l'étape 5, en une phrase.** Une demande qui explose doit rester **payable** avec un revenu **borné** ; cela n'est possible que si **son prix tend vers zéro**. C'est le pivot de toute la preuve.

### 8.2 Théorème 5.5 — l'existence

> **THEOREM 5.5 — Existence of Walrasian Equilibrium.** Si chaque fonction d'utilité satisfait l'hypothèse 5.1, et si $\sum_{i=1}^I e^i\gg0$, alors **il existe au moins un vecteur de prix $p^*\gg0$ tel que $z(p^*)=0$**.

*« Le théorème découle directement des théorèmes 5.4 et 5.3. »*

$$\boxed{\;\underbrace{\text{hyp. 5.1}+\textstyle\sum_i e^i\gg0}_{\text{primitifs}} \ \xRightarrow{\ \text{thm 5.4}\ } \ \underbrace{\text{conditions 1-3}}_{\text{sur } z} \ \xRightarrow{\ \text{thm 5.3, Brouwer}\ } \ \underbrace{\exists\,p^*\gg0 : z(p^*)=0}_{\text{équilibre walrasien}}\;}$$

### 8.3 Les deux remarques de clôture du livre

**Sur la restrictivité de l'hypothèse 5.1 :**

> *« L'hypothèse que les utilités soient **fortement croissantes** est quelque peu restrictive, bien qu'elle nous ait permis de garder l'analyse relativement simple. Comme mentionné plus tôt, **la forme Cobb-Douglas, par ailleurs très bien élevée, n'est pas fortement croissante sur $\mathbb{R}^n_+$**. On vous demande de montrer à l'**exercice 5.14** que **l'existence d'un équilibre walrasien avec des préférences Cobb-Douglas est néanmoins garantie**. »*

**Sur l'usage pratique de l'homogénéité :**

> *« Quand les utilités satisfont l'hypothèse 5.1, le vecteur de demande excédentaire est **homogène de degré zéro**. La signification comportementale est que **seuls les prix RELATIFS comptent** dans les choix. Ainsi, si $p^*$ est un équilibre walrasien, $z(p^*)=z(\lambda p^*)=0$ pour tout $\lambda>0$. **Ce fait peut souvent être exploité pour simplifier les calculs.** »*

## 🟠 Concept 9 — Exemple 5.1 : un équilibre walrasien calculé

**Le cadre.** Deux consommateurs, deux biens, utilités CES **identiques** :

$$u^i(x_1,x_2)=\big(x_1^\rho+x_2^\rho\big)^{1/\rho}, \qquad i=1,2, \qquad 0<\rho<1$$

Une unité de chaque bien, chacun possédant **tout** d'un bien :

$$e^1=(1,0) \qquad\qquad e^2=(0,1)$$

**La vérification préalable des hypothèses** — que le livre fait explicitement :

> *« Parce que **la dotation agrégée de chaque bien est strictement positive** et que **la forme CES est fortement croissante et strictement quasiconcave sur $\mathbb{R}^n_+$ quand $0<\rho<1$**, les exigences du théorème 5.5 sont satisfaites, **donc nous savons qu'un équilibre walrasien existe** dans cette économie. »*

> ⚠️ **On vérifie l'existence AVANT de chercher l'équilibre.** C'est méthodologiquement important : sans cette vérification, un calcul qui échoue laisserait dans le doute entre « je me suis trompé » et « il n'y a pas d'équilibre ».

**Les demandes.** De l'exemple 1.1 (fiche 501), avec $r\equiv\dfrac{\rho}{\rho-1}$ :

$$x^i_j(p,y^i)=\frac{p_j^{\,r-1}\,y^i}{p_1^{\,r}+p_2^{\,r}}$$

où le revenu est **la valeur de marché de la dotation** :

$$y^1=p\cdot e^1=p_1 \qquad\qquad y^2=p\cdot e^2=p_2$$

**La normalisation.**

> *« Parce que **seuls les prix relatifs comptent**, et parce que nous savons du théorème 5.5 qu'il y a un équilibre où tous les prix sont strictement positifs, nous pouvons **choisir une normalisation commode**. »*

Poser $\bar p\equiv\dfrac{1}{p_2}\,p$, de sorte que $\bar p_1=\dfrac{p_1}{p_2}$ et $\bar p_2=1$.

> *« $\bar p_1$ est juste **le prix relatif du bien $x_1$**. Parce que la demande de chaque consommateur en $p$ est la même qu'en $\bar p$, nous pouvons **formuler notre problème comme celui de trouver un ensemble de prix relatifs d'équilibre**. »*

**L'équilibre du marché 1** *(en supposant une solution intérieure)* :

$$x^1_1(\bar p^*,\bar p^*\cdot e^1)+x^2_1(\bar p^*,\bar p^*\cdot e^2)=e^1_1+e^2_1$$

En substituant *(avec $y^1=\bar p^*_1$ et $y^2=1$)* :

$$\frac{\bar p_1^{*\,r-1}\cdot\bar p^*_1}{\bar p_1^{*\,r}+1}+\frac{\bar p_1^{*\,r-1}\cdot1}{\bar p_1^{*\,r}+1}=1$$

$$\Longrightarrow\qquad \boxed{\;\bar p^*_1=1\;}$$

> *« Nous concluons que **tout vecteur $p^*$ où $p^*_1=p^*_2$** équilibre demande et offre sur le marché 1. **Par la loi de Walras, ces mêmes prix doivent équilibrer le marché 2, donc nous avons fini.** »*

<details class="details--riche">
<summary>

**Vérifier le calcul de l'exemple 5.1**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre écrit seulement « en résolvant, on obtient ».</span>

</div>

Posons $q\equiv\bar p^*_1$ pour alléger. L'équation à résoudre est

$$\frac{q^{r-1}\cdot q + q^{r-1}\cdot 1}{q^{r}+1}=1 \qquad\Longleftrightarrow\qquad \frac{q^{r}+q^{r-1}}{q^{r}+1}=1$$

soit $q^{r}+q^{r-1}=q^{r}+1$, c'est-à-dire

$$q^{r-1}=1 \qquad\Longrightarrow\qquad q=1 \quad$$

*(pour $r\neq1$, ce qui est le cas puisque $0<\rho<1$ donne $r=\rho/(\rho-1)<0$.)*

**Le contrôle par la loi de Walras.** À $\bar p^*=(1,1)$ : — revenus : $y^1=1$, $y^2=1$ ; — demandes : $x^i_j=\dfrac{1^{r-1}\cdot1}{1+1}=\dfrac12$ pour tous $i,j$.

Donc chaque consommateur demande $(\tfrac12,\tfrac12)$, et le total demandé de chaque bien vaut $1$ — **exactement la dotation totale** sur **les deux** marchés.

> **La lecture économique.** Les deux consommateurs ont **les mêmes préférences** et des dotations **symétriques**. Par symétrie, le prix relatif d'équilibre **doit** valoir 1, et chacun finit avec la moitié de chaque bien. L'échange est parfaitement symétrique : chacun cède la moitié de sa dotation contre la moitié de celle de l'autre.
>
> ⚠️ **La symétrie est ce qui rend le calcul si simple.** Avec des préférences ou des dotations asymétriques, l'équation en $q$ ne se factorise pas et il faut la résoudre numériquement. Le livre choisit délibérément un cas soluble.

</details>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Deux consommateurs, deux biens, dotations | **Boîte d'Edgeworth** | Tracer la lentille, la courbe des contrats, identifier le segment $cc$ |
| « quelles allocations sont bloquées ? » | **Coalitions** | Tester chaque coalition avec **ses seules dotations** |
| « l'allocation est-elle dans le cœur ? » | **Définition 5.3** | Non bloquée par **aucune** coalition — y compris les singletons |
| Utilités + dotations + « trouver l'équilibre » | **Calcul walrasien** | Vérifier l'hyp. 5.1, normaliser, résoudre **$n-1$** marchés |
| « un équilibre existe-t-il ? » | **Théorème 5.5** | Vérifier hyp. 5.1 **et** $\sum_i e^i\gg0$ |
| « montrer que $p\cdot z(p)=0$ » | **Loi de Walras** | Saturation des budgets, sommer, **intervertir** les sommations |
| Une $z(p)$ donnée + « équilibre ? » | **Théorème 5.3** | Vérifier les **trois** conditions |
| Un prix nul, une demande qui explose | **Condition 3** | C'est exactement ce que le théorème 5.4 établit |

**Les trois réflexes de cadrage :**

1. **Vérifier l'existence avant de calculer.** Hypothèse 5.1 + $\sum_i e^i\gg0$ ⟹ le théorème 5.5 garantit un équilibre à prix **strictement positifs**.
2. **Normaliser.** L'homogénéité de degré 0 permet de poser $p_n=1$ ou $\sum_k p_k=1$. Cela élimine une inconnue.
3. **N'écrire que $n-1$ équations.** La loi de Walras rend la dernière **redondante**.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Analyser une boîte d'Edgeworth

1. **Placer $e$** et tracer **les deux courbes d'indifférence** qui y passent.
2. **La lentille** qu'elles délimitent contient tous les gains d'échange mutuels.
3. **La courbe des contrats** $CC$ est le lieu des **tangences**.
4. **Les équilibres de troc** = $CC \cap$ lentille = le segment $cc$.
5. **Contrôle** : tout point hors de la lentille est bloqué par **un** consommateur ; tout point dans la lentille hors de $CC$ ouvre une **nouvelle lentille**.

### Méthode 2 — Tester si une allocation est dans le cœur

1. **Vérifier la réalisabilité** : $\sum_i x^i=\sum_i e^i$.
2. **Tester les singletons** : chaque $i$ préfère-t-il $x^i$ à $e^i$ ? Sinon, $\{i\}$ **bloque**.
3. **Tester les coalitions de taille 2, 3, …** : la coalition $S$ peut-elle, **avec $\sum_{i\in S}e^i$ seulement**, faire mieux ?
4. **Tester la grande coalition** — c'est l'efficacité de Pareto.

⚠️ **La clause décisive** : la coalition ne dispose que de **ses propres dotations**.

### Méthode 3 — Calculer un équilibre walrasien

1. **Vérifier l'hypothèse 5.1** et $\sum_i e^i\gg0$ ⟹ l'équilibre existe.
2. **Écrire les revenus** : $y^i=p\cdot e^i$ — c'est ici que l'équilibre général diffère de l'équilibre partiel.
3. **Écrire les demandes** $x^i(p,p\cdot e^i)$.
4. **Normaliser** : poser $p_n=1$ (ou $\sum_k p_k=1$).
5. **Écrire $n-1$ conditions d'équilibre** seulement.
6. **Résoudre**, puis **vérifier** le $n$-ième marché comme contrôle.

### Méthode 4 — Démontrer la loi de Walras

1. Partir de la **saturation** de chaque contrainte budgétaire *(elle vient de la forte croissance de $u^i$)*.
2. **Sommer sur les individus**.
3. **Intervertir** les deux sommations.
4. **Factoriser** $p_k$ pour faire apparaître $z_k(p)$.

### Méthode 5 — Vérifier les conditions du théorème 5.3

| Condition | Comment la vérifier |
|---|---|
| **1. continuité** | théorème du maximum, **sur $\mathbb{R}^n_{++}$ seulement** |
| **2. loi de Walras** | méthode 4 |
| **3. non-bornitude** | Argument du théorème 5.4 : trouver un consommateur au revenu limite $>0$, montrer que sa demande est non bornée, puis que le prix du bien concerné tend vers zéro |

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que l'équilibre de troc est **unique** | C'est **tout un segment** $cc$ | *« Il y a **beaucoup** d'équilibres de troc »* |
| 2 | Confondre courbe des contrats et ensemble des équilibres | Le second est **l'intersection** de la première avec la **lentille** | Les points de $CC$ hors lentille sont **bloqués** |
| 3 | Autoriser une coalition à utiliser les dotations des non-membres | La clause 1 de la déf. 5.2 l'interdit | $\sum_{i\in S}y^i=\sum_{i\in S}e^i$ |
| 4 | Croire que Pareto-efficace ⟹ dans le cœur | **L'inverse** est vrai : cœur ⟹ Pareto | Une allocation efficace peut être bloquée par un **singleton** |
| 5 | Utiliser Cobb-Douglas sous l'hypothèse 5.1 | Elle n'est **ni fortement croissante ni strictement quasiconcave** sur $\mathbb{R}^n_+$ | L'existence tient quand même (exercice 5.14) — mais par un autre argument |
| 6 | Confondre « fortement croissante » et « strictement monotone » | La forte croissance exige $\succ$ dès qu'**une seule** coordonnée augmente | C'est **plus fort** que l'axiome 4 de la fiche 500 |
| 7 | Croire que la demande est continue sur $\mathbb{R}^n_+$ | Elle **ne l'est pas** sur la frontière : elle peut **exploser** | *« difficulté désagréable mais inévitable »* |
| 8 | Oublier que le revenu est **endogène** | $y^i=p\cdot e^i$ dépend des prix | D'où l'homogénéité en $p$ **seul** |
| 9 | Démontrer la loi de Walras sans la saturation | Elle vient de la **forte croissance** de $u^i$ | C'est le point de départ obligé |
| 10 | Écrire $n$ conditions d'équilibre | La $n$-ième est **redondante** par la loi de Walras | $n-1$ suffisent |
| 11 | Croire que Walras a démontré l'existence | *« hypothèse **fallacieuse** que tout système avec autant d'inconnues que d'équations possède une solution »* | Contre-exemple de **Wald** |
| 12 | Croire que la condition 3 est superflue | *« le résultat ne tient tout simplement pas sans elle »* (exercice 5.7) | Elle traite la discontinuité au bord |
| 13 | Croire que le bien dont la demande explose est celui dont le prix s'annule | Le théorème dit « **un certain** bien $k'$ », pas nécessairement $k$ | Mais $\bar p_{k'}=0$ aussi |
| 14 | Oublier la troncature $\bar z_k=\min(z_k,1)$ | Sans elle, $f$ ne serait pas bien définie (la demande peut exploser) | C'est le **premier** pas de la preuve |
| 15 | Appliquer Brouwer sur $\mathbb{R}^n_+$ | Ce n'est **pas compact** ; et $z$ n'y est pas continue | D'où la construction de $S_\varepsilon$ |
| 16 | Oublier de vérifier que $f(S_\varepsilon)\subseteq S_\varepsilon$ | Brouwer exige que l'application **envoie l'ensemble dans lui-même** | Vérifier $\sum_k f_k=1$ **et** $f_k\geq\varepsilon/(1+2n)$ |
| 17 | Conclure directement de Brouwer à l'équilibre | Le point fixe est **pour un $\varepsilon$ donné** ; il faut faire tendre $\varepsilon\to0$ et **extraire** une sous-suite | Théorème A1.8 |
| 18 | Oublier l'argument final sur les signes | Chaque terme $z_k\max(0,\bar z_k)\geq0$ ⟹ **tous nuls** ⟹ $z_k\leq0$ ⟹ avec Walras, $z_k=0$ | C'est le dernier pas |
| 19 | Ne pas vérifier l'existence avant de calculer | Un calcul qui échoue laisse dans le doute | Vérifier hyp. 5.1 **et** $\sum_i e^i\gg0$ |
| 20 | Ne pas normaliser les prix | On aurait $n$ inconnues pour $n-1$ équations indépendantes | Poser $p_n=1$ ou $\sum_k p_k=1$ |

## 📌 Ultimate Review

**§5.1 — l'échange sans marchés.**

Économie d'échange $E=\big(\succsim^i,e^i\big)_{i\in\mathcal{I}}$ · pas de production · propriété privée · échange **volontaire**.

**Boîte d'Edgeworth** : largeur $=$ dotation totale en $x_1$, hauteur $=$ en $x_2$. **Courbe des contrats** $CC$ = lieu des **tangences**.

$$\boxed{\;\text{équilibres de troc}=CC\ \cap\ \text{lentille des indifférences en } e\;}$$

**Le cas général.**

$$F(e)\equiv\left\{x \ \Big|\ \sum_i x^i=\sum_i e^i\right\} \tag{5.1}$$

| Déf. | Énoncé |
|---|---|
| **5.1** Pareto-efficace | aucune $y\in F(e)$ avec $y^i\succsim^i x^i$ pour tous, **une préférence stricte** |
| **5.2** coalition bloquante $S$ | $\sum_{i\in S}y^i=\sum_{i\in S}e^i$ **et** $y^i\succsim^i x^i$ pour $i\in S$, une stricte |
| **5.3** le **cœur** $C(e)$ | les allocations réalisables **non bloquées** |

$$C(e)\subseteq\{\text{Pareto-efficaces}\} \qquad\text{(la grande coalition bloquerait sinon)}$$

**§5.2 — les marchés concurrentiels.** Le modèle est **décentralisé** : *« la seule information requise est les prix »*. Exigences informationnelles **minimales** — contre le troc qui exige de tout savoir des autres.

**§5.2.1 — l'existence.**

**HYPOTHÈSE 5.1** : $u^i$ **continue**, **fortement croissante**, **strictement quasiconcave**. Cobb-Douglas est **exclue** (exercice 5.14 traite ce cas séparément).

$$\max_{x^i} u^i(x^i) \ \text{ s.c. } \ p\cdot x^i\leq p\cdot e^i \tag{5.2}$$

**THÉORÈME 5.1** : solution **unique** et **continue sur $\mathbb{R}^n_{++}$** — **pas** sur la frontière.

$$z_k(p)\equiv\sum_i x^i_k(p,p\cdot e^i)-\sum_i e^i_k \tag{déf. 5.4}$$

**THÉORÈME 5.2** : $z$ est **continue**, **homogène de degré 0**, et $p\cdot z(p)=0$ (**loi de Walras**).

$$\boxed{\;n-1 \text{ marchés équilibrés} \ \Longrightarrow\ \text{le } n\text{-ième aussi}\;}$$

**DÉF. 5.5** : $p^*\in\mathbb{R}^n_{++}$ est **walrasien** si $z(p^*)=0$.

**L'histoire :** Walras (1874, raisonnement **fallacieux**) → Wald (1936, contre-exemple $x^2+y^2=0$, $x^2-y^2=1$, et première preuve correcte) → **McKenzie (1954)** et **Arrow-Debreu (1954)** par **point fixe**.

**THÉORÈME 5.3** — trois conditions ⟹ existence :

1. **continuité** sur $\mathbb{R}^n_{++}$ ;
2. **loi de Walras** ;
3. **non-bornitude** : si certains prix (pas tous) tendent vers 0, la demande excédentaire d'au moins l'un d'eux **explose**.

**L'architecture de la preuve :** tronquer $\bar z=\min(z,1)$ → restreindre à $S_\varepsilon$ (**compact, convexe, non vide**) → construire $f:S_\varepsilon\to S_\varepsilon$ **continue** → **Brouwer** → faire $\varepsilon\to0$, **extraire** une sous-suite → la **condition 3** exclut $p^*_k=0$ → **loi de Walras** + signes ⟹ $z(p^*)=0$.

**THÉORÈME 5.4** : hypothèse 5.1 + $\sum_i e^i\gg0$ ⟹ la condition 3 tient. *Pivot : une demande non bornée doit rester **payable** avec un revenu **borné** ⟹ son prix tend vers 0.*

**THÉORÈME 5.5** : donc **l'équilibre walrasien existe**, avec $p^*\gg0$.

**Exemple 5.1.** CES identiques, $e^1=(1,0)$, $e^2=(0,1)$ ⟹ **normaliser** $\bar p_2=1$ ⟹ l'équilibre du marché 1 donne $\bar p^*_1=1$ ⟹ **la loi de Walras clôt le marché 2**.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quelles sont les trois grandes questions de l'équilibre général, et laquelle le livre traite-t-il ?**

</summary>

**Existence**, **unicité**, **stabilité**.

> *« Toutes sont profondes et importantes, mais **nous ne traiterons que la première**. »*

> *« De bien des manières, **l'existence est la question la plus fondamentale**. Ce qui est en jeu est **la cohérence logique de la notion même de système de marché concurrentiel**. »*

</details>

<details class="details--riche">
<summary>

**2. Quelles sont les quatre hypothèses de l'économie d'échange du §5.1 ?**

</summary>

1. **Pas de production** — les biens existent, on ne demande pas comment.
2. Chacun est **doté** d'une quantité de biens.
3. Chacun **ne se soucie que de son propre bien-être**.
4. **Propriété privée** et **échange volontaire non coercitif**.

> *« En l'absence de coercition, **l'échange volontaire est le seul moyen** par lequel les biens peuvent être redistribués. »*

</details>

<details class="details--riche">
<summary>

**3. Comment se construit la boîte d'Edgeworth, et que représente chaque point ?**

</summary>

**Largeur** = dotation **totale** en $x_1$ · **hauteur** = dotation totale en $x_2$. Origine du consommateur 1 au **sud-ouest**, du 2 au **nord-est**.

> *« Chaque point a **quatre coordonnées** […] chaque ensemble de quatre coordonnées représente **une répartition des totaux entre les consommateurs**. La boîte fournit donc **une image complète de toute distribution réalisable**. »*

</details>

<details class="details--riche">
<summary>

**4. Dérouler le raisonnement de blocage dans la boîte.**

</summary>

1. **Hors de la boîte** : non réalisable.
2. **Hors de la lentille** formée par les deux indifférences en $e$ : **bloqué** par l'un des consommateurs.
3. **Dans la lentille mais hors de $CC$** : les deux indifférences **se coupent**, formant **une nouvelle lentille** ⟹ gains mutuels encore possibles ⟹ pas un équilibre.
4. **Sur le segment $cc$ de $CC$ dans la lentille** : *« il n'y a plus d'échanges réalisables procurant un gain mutuel »* ⟹ **équilibre de troc**.

</details>

<details class="details--riche">
<summary>

**5. Les équilibres de troc sont-ils uniques ? Sont-ils efficaces ?**

</summary>

**Uniques : non.** *« Il y a **beaucoup** d'équilibres de troc vers lesquels le système pourrait évoluer. »*

**Efficaces : oui.** *« Une fois là, **il n'est pas possible de se déplacer ailleurs sans rendre au moins un consommateur moins bien loti**. Ainsi, chaque point d'équilibre en échange est **Pareto-efficace**. »*

</details>

<details class="details--riche">
<summary>

**6. Définir une allocation réalisable et l'efficacité de Pareto.**

</summary>

$$F(e)\equiv\left\{x \ \Big|\ \sum_{i\in\mathcal{I}}x^i=\sum_{i\in\mathcal{I}}e^i\right\}$$

**Pareto-efficace** : $x\in F(e)$ telle qu'il n'existe **aucune** $y\in F(e)$ avec $y^i\succsim^i x^i$ pour **tous** les $i$, **avec au moins une préférence stricte**.

</details>

<details class="details--riche">
<summary>

**7. Pourquoi une allocation non Pareto-efficace ne peut-elle pas être un équilibre ?**

</summary>

> *« Le consommateur qui peut être strictement mieux loti peut arranger un échange en annonçant : "**Je donne à chaque consommateur $i$ le panier $y^i$ en échange du panier $x^i$**". Parce que les deux allocations sont réalisables, cet échange est réalisable. **Aucun consommateur n'y objectera** parce que cela les rend tous au moins aussi bien lotis. »*

Et réciproquement, si $x$ **est** efficace, tout écart rend quelqu'un moins bien loti — *« ce dernier n'acceptera pas l'échange »*.

</details>

<details class="details--riche">
<summary>

**8. Définir une coalition bloquante et identifier sa clause décisive.**

</summary>

$S\subset\mathcal{I}$ **bloque** $x$ s'il existe $y$ telle que

1. $\displaystyle\sum_{i\in S}y^i=\sum_{i\in S}e^i$ ;
2. $y^i\succsim^i x^i$ pour tout $i\in S$, avec **au moins une stricte**.

⚠️ **La clause 1 est décisive** : la coalition ne peut utiliser que **ses propres dotations**. C'est ce qui rend le blocage crédible — elle peut effectivement **se retirer**.

> *« Une allocation est bloquée dès qu'**un groupe, si grand ou petit soit-il, peut faire mieux en "faisant cavalier seul"**. »*

</details>

<details class="details--riche">
<summary>

**9. Définir le cœur et donner son rapport à l'efficacité.**

</summary>

$$C(e)=\{\text{allocations réalisables NON BLOQUÉES}\}$$

> *« Si $x\in F(e)$ est non bloquée, alors elle **doit être Pareto-efficace**, parce que sinon elle serait bloquée par la **grande coalition** $S=\mathcal{I}$. »*

$$C(e)\subseteq\{\text{Pareto-efficaces}\}$$

⚠️ **L'inclusion est stricte** : une allocation efficace peut être bloquée par un **singleton** (elle rend quelqu'un moins bien loti que sa dotation).

</details>

<details class="details--riche">
<summary>

**10. Quelle est la force du modèle décentralisé, et quelle est sa contrepartie ?**

</summary>

**La force :**

> *« Parce qu'à l'équilibre les demandes seront satisfaites, **les actions des autres agents peuvent être ignorées** et **la seule information requise est les prix**. Les exigences informationnelles sont **minimales**. »*

Contraste avec le troc, *« dans lequel chaque consommateur requiert une information **très détaillée** sur les préférences et les paniers de tous les autres »*.

**La contrepartie :** il faut qu'**un vecteur de prix équilibrant tous les marchés existe**. *« Ce n'est pas du tout évident. »*

</details>

<details class="details--riche">
<summary>

**11. Pourquoi l'interdépendance des marchés rend-elle l'existence subtile ?**

</summary>

L'exemple du livre : marché 1 équilibré, excès de demande en 2, excès d'offre en 3. On augmente $p_2$ et baisse $p_3$…

> *« Si les biens 1 et 2 sont **substituts**, une hausse de $p_2$ peut **augmenter la demande du bien 1**. Ainsi, **changer les prix des biens 2 et 3 peut détruire l'équilibre du marché 1**. »*

⟹ Un raisonnement **marché par marché** ne suffit pas ; il faut un argument **global** — le point fixe.

</details>

<details class="details--riche">
<summary>

**12. Énoncer l'hypothèse 5.1 et sa restriction surprenante.**

</summary>

$u^i$ **continue**, **fortement croissante**, **strictement quasiconcave** sur $\mathbb{R}^n_+$.

**Fortement croissante** = *« augmenter strictement **une** composante et n'en abaisser aucune **augmente strictement** la fonction »*.

⚠️ *« **Les utilités Cobb-Douglas ne sont NI fortement croissantes NI strictement quasiconcaves sur tout $\mathbb{R}^n_+$**, et sont donc exclues. »*

**Pourquoi :** $u=x_1x_2$ vaut $0$ dès qu'une coordonnée est nulle.

</details>

<details class="details--riche">
<summary>

**13. Que dit le théorème 5.1, et quelle est sa limite cruciale ?**

</summary>

Pour $p\gg0$ : solution **unique** $x^i(p,p\cdot e^i)$, **continue en $p$ sur $\mathbb{R}^n_{++}$**.

| Propriété | Source |
|---|---|
| existence | $p\gg0$ ⟹ budget **borné** |
| unicité | **stricte quasiconcavité** |
| continuité | **théorème du maximum**, qui exige $p\gg0$ |

⚠️ **La limite :** *« la demande **n'est PAS continue** sur tout $\mathbb{R}^n_+$ parce qu'elle **peut être infinie si l'un des prix est nul**. »* Toute la technicité du théorème 5.3 vient de là.

</details>

<details class="details--riche">
<summary>

**14. Définir la demande excédentaire agrégée.**

</summary>

$$z_k(p)\equiv\sum_{i\in\mathcal{I}}x^i_k(p,p\cdot e^i)-\sum_{i\in\mathcal{I}}e^i_k$$

| Signe | Sens |
|---|---|
| $z_k>0$ | **excès de demande** |
| $z_k<0$ | **excès d'offre** |

Le livre note que ce formalisme est adopté *« largement par **commodité et simplicité notationnelle** »* par rapport aux couples offre/demande de Walras.

</details>

<details class="details--riche">
<summary>

**15. Démontrer la loi de Walras.**

</summary>

$u^i$ étant **fortement croissante**, chaque budget est **saturé** :

$$\sum_{k}p_k\big[x^i_k-e^i_k\big]=0$$

**Sommer sur $i$**, puis **intervertir** les sommations :

$$\sum_k\sum_i p_k\big[x^i_k-e^i_k\big]=0 \qquad\Longleftrightarrow\qquad \sum_k p_k\underbrace{\left[\sum_i x^i_k-\sum_i e^i_k\right]}_{=\,z_k(p)}=0$$

d'où $p\cdot z(p)=0$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**16. Quelle est l'implication la plus utile de la loi de Walras ?**

</summary>

> *« Si à certains prix **$n-1$ marchés sont en équilibre**, la loi de Walras garantit que **le $n$-ième l'est aussi**. **Ceci est souvent très utile à retenir.** »*

⟹ Dans un exercice à $n$ biens, il suffit de résoudre **$n-1$** équations.

Et plus généralement : *« tout excès de demande **doit être exactement compensé** par un excès d'offre de valeur égale ailleurs »*.

</details>

<details class="details--riche">
<summary>

**17. Quelle erreur Walras a-t-il commise, et quel contre-exemple Wald a-t-il donné ?**

</summary>

> *« Sa conclusion reposait sur l'**hypothèse fallacieuse que tout système d'équations avec autant d'inconnues que d'équations possède toujours une solution**. »*

**Le contre-exemple de Wald :** $x^2+y^2=0$ et $x^2-y^2=1$ **n'ont pas de solution** — la première force $x=y=0$, incompatible avec la seconde.

**Wald (1936)** a donné la première preuve correcte, mais avec des hypothèses restrictives (séparabilité forte, utilité marginale décroissante).

</details>

<details class="details--riche">
<summary>

**18. Énoncer les trois conditions du théorème 5.3.**

</summary>

1. $z$ **continue** sur $\mathbb{R}^n_{++}$ ;
2. $p\cdot z(p)=0$ pour tout $p\gg0$ ;
3. si $p^m\to\bar p\neq0$ avec $\bar p_k=0$ pour un $k$, alors **pour un certain $k'$ tel que $\bar p_{k'}=0$**, $\{z_{k'}(p^m)\}$ est **non bornée supérieurement**.

**En mots** *(le livre)* : *« si les prix de **certains mais non de tous** les biens sont arbitrairement proches de zéro, alors **la demande excédentaire d'au moins l'un de ces biens est arbitrairement élevée** »*.

</details>

<details class="details--riche">
<summary>

**19. Pourquoi tronque-t-on $z$ dans la preuve ?**

</summary>

On pose $\bar z_k(p)=\min\big(z_k(p),1\big)$.

> *« Nous sommes ainsi assurés que $\bar z_k(p)$ est **borné supérieurement par 1**. »*

**Sans cela**, l'application $f$ ne serait pas bien définie — la demande excédentaire pouvant **exploser** près de la frontière.

</details>

<details class="details--riche">
<summary>

**20. Décrire l'ensemble $S_\varepsilon$ et ses trois propriétés.**

</summary>

$$S_\varepsilon=\left\{p \ \Big|\ \sum_k p_k=1 \ \text{ et } \ p_k\geq\frac{\varepsilon}{1+2n}\ \forall k\right\}$$

| Propriété | Justification |
|---|---|
| **compact** | fermé et borné |
| **convexe** | vérification directe |
| **non vide** | le vecteur uniforme $(2+1/n)/(1+2n)$ en est membre car $\varepsilon<1$ |

Ce sont **exactement** les hypothèses du théorème de Brouwer.

> *« **Les prix sur et près de la frontière sont exclus.** À mesure que $\varepsilon\to0$, $S_\varepsilon$ inclut de plus en plus de prix. »*

</details>

<details class="details--riche">
<summary>

**21. Écrire l'application $f$ et expliquer son idée.**

</summary>

$$f_k(p)=\frac{\varepsilon+p_k+\max\big(0,\bar z_k(p)\big)}{n\varepsilon+1+\sum_{m}\max\big(0,\bar z_m(p)\big)}$$

**L'idée :** le numérateur **augmente le prix des biens en excès de demande** ; le dénominateur **normalise** pour que les prix somment à 1.

C'est une formalisation du **tâtonnement walrasien**.

**Vérifications :** $\sum_k f_k=1$ et $f_k\geq\varepsilon/(1+2n)$ donc $f:S_\varepsilon\to S_\varepsilon$.

</details>

<details class="details--riche">
<summary>

**22. Comment la condition 3 intervient-elle dans la preuve ?**

</summary>

Au **pas décisif**. Après Brouwer et le passage $\varepsilon\to0$, on a $p^\varepsilon\to p^*$. Supposons $p^*_{\bar k}=0$.

La condition 3 fournit un bien $k'$ avec $p^*_{k'}=0$ et $z_{k'}$ **non bornée**. Alors dans (P.1) pour $k=k'$ :

| Membre | Comportement |
|---|---|
| **gauche** | $p^\varepsilon_{k'}\to0$, crochet **borné** ⟹ **tend vers 0** |
| **droite** | $\bar z_{k'}$ **atteint 1 infiniment souvent** ⟹ **ne tend pas vers 0** |

**Contradiction** ⟹ $p^*\gg0$.

</details>

<details class="details--riche">
<summary>

**23. Comment conclut-on la preuve du théorème 5.3 ?**

</summary>

En passant à la limite dans (P.1) :

$$p^*_k\sum_m\max\big(0,\bar z_m(p^*)\big)=\max\big(0,\bar z_k(p^*)\big) \tag{P.2}$$

En **multipliant par $z_k(p^*)$ et sommant** :

$$\underbrace{p^*\cdot z(p^*)}_{=\,0 \text{ (Walras)}}\sum_m\max(0,\bar z_m)=\sum_k z_k(p^*)\max\big(0,\bar z_k(p^*)\big)$$

Chaque terme de droite est $\geq0$ ⟹ **tous nuls** ⟹ $z_k(p^*)\leq0$ pour tout $k$. Avec $p^*\gg0$ et la loi de Walras ⟹ $z_k(p^*)=0$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**24. Comment le théorème 5.4 établit-il la condition 3 ?**

</summary>

1. $\sum_i e^i\gg0$ ⟹ il existe $i$ avec $\bar p\cdot e^i>0$.
2. **Par l'absurde**, supposer la demande de $i$ bornée ⟹ une sous-suite converge vers $x^*$.
3. La saturation du budget donne $\bar p\cdot x^*=\bar p\cdot e^i>0$.
4. Poser $\hat x=x^*+e_k$ : $u^i(\hat x)>u^i(x^*)$ (forte croissance) **et** $\bar p\cdot\hat x=\bar p\cdot e^i$ (car $\bar p_k=0$). En contractant légèrement, on obtient un panier **strictement meilleur et strictement abordable** ⟹ **contradiction**.
5. Donc la demande **explose** pour un bien $k'$ ; le revenu étant **borné**, il faut $p^m_{k'}\to0$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**25. Quel est le pivot de l'étape 5 du théorème 5.4 ?**

</summary>

> *« Nous devons avoir $p^m_{k'}\to0$, parce que **c'est la seule façon que la demande du bien $k'$ puisse être non bornée ET abordable**. »*

**Une demande qui explose doit rester payable avec un revenu borné — donc son prix doit tendre vers zéro.**

</details>

<details class="details--riche">
<summary>

**26. Énoncer le théorème 5.5 et la chaîne logique qui y mène.**

</summary>

Si chaque $u^i$ satisfait l'hypothèse 5.1 et $\sum_i e^i\gg0$, alors **il existe $p^*\gg0$ avec $z(p^*)=0$**.

$$\underbrace{\text{hyp. 5.1}+\textstyle\sum e^i\gg0}_{\text{primitifs}} \xRightarrow{\text{thm 5.4}} \underbrace{\text{conditions 1-3}}_{\text{sur } z} \xRightarrow{\text{thm 5.3 (Brouwer)}} \text{équilibre walrasien}$$

</details>

<details class="details--riche">
<summary>

**27. Comment l'homogénéité simplifie-t-elle les calculs ?**

</summary>

> *« Si $p^*$ est un équilibre walrasien, $z(p^*)=z(\lambda p^*)=0$ pour tout $\lambda>0$. […] **Ce fait peut souvent être exploité pour simplifier les calculs.** »*

En pratique : **normaliser** en posant $p_n=1$ (ou $\sum_k p_k=1$), ce qui élimine une inconnue.

**La signification comportementale :** *« **seuls les prix relatifs comptent** dans les choix »*.

</details>

<details class="details--riche">
<summary>

**28. Dérouler l'exemple 5.1.**

</summary>

CES identiques $\big(x_1^\rho+x_2^\rho\big)^{1/\rho}$, $0<\rho<1$ ; $e^1=(1,0)$, $e^2=(0,1)$.

**Vérification préalable :** $\sum_i e^i\gg0$ et CES fortement croissante et strictement quasiconcave pour $0<\rho<1$ ⟹ **l'équilibre existe**.

**Revenus :** $y^1=p_1$, $y^2=p_2$.

**Normalisation :** $\bar p_2=1$, $\bar p_1=p_1/p_2$.

**Marché 1 :** $\dfrac{\bar p_1^{\,r-1}\bar p_1+\bar p_1^{\,r-1}}{\bar p_1^{\,r}+1}=1$ ⟹ $\bar p_1^{\,r-1}=1$ ⟹ $\boxed{\bar p^*_1=1}$.

**Le marché 2 est clos par la loi de Walras.** Chacun consomme $(\tfrac12,\tfrac12)$.

</details>

<details class="details--riche">
<summary>

**29. Pourquoi le livre vérifie-t-il l'existence AVANT de calculer ?**

</summary>

> *« Les exigences du théorème 5.5 sont satisfaites, **donc nous savons qu'un équilibre walrasien existe** dans cette économie. »*

⚠️ **Sans cette vérification**, un calcul qui échoue laisserait dans le doute entre « je me suis trompé » et « il n'y a pas d'équilibre ». C'est exactement l'erreur de Walras, en petit.

</details>

<details class="details--riche">
<summary>

**30. Quelle « surprise » le livre annonce-t-il à la fin du §5.1 ?**

</summary>

> *« De ce point de vue, **les points du cœur semblent très loin de devenir une réalité** dans une économie réelle. Après tout, la plupart d'entre nous avons **peu ou pas de contact direct avec la vaste majorité des autres consommateurs**. […] Dans la section suivante, nous investiguons les économies organisées par des marchés concurrentiels. **Préparez-vous à une surprise.** »*

**La surprise** : le théorème 5.6 (fiche 511) — **tout équilibre walrasien est dans le cœur**. Le marché atteint, avec une information **minimale**, ce que le troc n'obtiendrait qu'avec une information **parfaite**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les trois grandes questions de l'équilibre général ? | **Existence** · unicité · stabilité |
| Laquelle le livre traite-t-il ? | **L'existence seulement** |
| Ce qui est en jeu dans l'existence ? | *« la **cohérence logique** de la notion même de système de marché concurrentiel »* |
| L'économie d'échange — quatre hypothèses ? | Pas de production · dotations · égoïsme · échange **volontaire** |
| Ce qu'est un équilibre de troc ? | Un **point de repos** du processus d'échange volontaire |
| Largeur et hauteur de la boîte d'Edgeworth ? | Les **dotations totales** en $x_1$ et $x_2$ |
| Combien de coordonnées par point ? | **Quatre** — deux par consommateur |
| La courbe des contrats ? | Le lieu des **tangences** des courbes d'indifférence |
| Où sont les équilibres de troc ? | Sur $CC$ **et dans la lentille** — le segment $cc$ |
| Pourquoi un point hors de la lentille est-il exclu ? | Il est **bloqué** par l'un des consommateurs |
| Pourquoi un point dans la lentille hors de $CC$ l'est-il ? | Les indifférences **s'y coupent** ⟹ une **nouvelle lentille** de gains |
| Les équilibres de troc sont-ils uniques ? | **Non** — il y en a **beaucoup** |
| Sont-ils efficaces ? | **Oui** — Pareto-efficaces |
| L'ensemble des allocations réalisables ? | $F(e)=\{x \mid \sum_i x^i=\sum_i e^i\}$ |
| Définition 5.1 ? | **Pareto-efficace** : aucune $y\in F(e)$ meilleure pour tous avec une stricte |
| Définition 5.2 ? | **Coalition bloquante** : $\sum_{i\in S}y^i=\sum_{i\in S}e^i$ et tous au moins aussi bien |
| La clause décisive de la déf. 5.2 ? | La coalition n'utilise que **ses propres dotations** |
| Définition 5.3 ? | Le **cœur** $C(e)$ = les allocations réalisables **non bloquées** |
| Cœur et efficacité ? | $C(e)\subseteq$ Pareto — la **grande coalition** bloquerait sinon |
| L'inverse est-il vrai ? | **Non** — une allocation efficace peut être bloquée par un **singleton** |
| La force du modèle décentralisé ? | **La seule information requise est les prix** |
| Le contraste avec le troc ? | Le troc exige de **tout savoir** des préférences et paniers des autres |
| Pourquoi l'interdépendance rend-elle l'existence subtile ? | Corriger un marché peut **déséquilibrer** un autre (substituts) |
| L'hypothèse 5.1 ? | $u^i$ **continue**, **fortement croissante**, **strictement quasiconcave** |
| « Fortement croissante » signifie ? | Augmenter **une seule** coordonnée **augmente strictement** $u$ |
| Cobb-Douglas satisfait-elle l'hyp. 5.1 ? | **Non** — ni l'un ni l'autre sur $\mathbb{R}^n_+$ |
| Le budget du consommateur en équilibre général ? | $p\cdot x^i\leq p\cdot e^i$ — le **revenu est endogène** |
| Théorème 5.1 — les trois propriétés ? | Solution **unique**, **continue**, **sur $\mathbb{R}^n_{++}$ seulement** |
| Pourquoi pas sur la frontière ? | La demande **peut être infinie** si un prix est nul |
| La demande excédentaire ? | $z_k(p)=\sum_i x^i_k-\sum_i e^i_k$ |
| $z_k>0$ signifie ? | **Excès de demande** pour le bien $k$ |
| Les trois propriétés du théorème 5.2 ? | Continuité · **homogénéité de degré 0** · **loi de Walras** |
| La loi de Walras ? | $p\cdot z(p)=0$ pour tout $p\gg0$ |
| D'où vient-elle ? | De la **saturation** des budgets (forte croissance de $u^i$) |
| L'étape technique de sa preuve ? | **Intervertir** les deux sommations |
| Son implication la plus utile ? | **$n-1$ marchés équilibrés ⟹ le $n$-ième aussi** |
| Définition 5.5 ? | **Équilibre walrasien** : $p^*\in\mathbb{R}^n_{++}$ avec $z(p^*)=0$ |
| L'erreur de Walras ? | Croire qu'autant d'équations que d'inconnues ⟹ solution |
| Le contre-exemple de Wald ? | $x^2+y^2=0$ et $x^2-y^2=1$ — **sans solution** |
| Qui a donné les preuves générales ? | **McKenzie (1954)** et **Arrow-Debreu (1954)**, par **point fixe** |
| Condition 1 du théorème 5.3 ? | $z$ **continue** sur $\mathbb{R}^n_{++}$ |
| Condition 2 ? | La **loi de Walras** |
| Condition 3 ? | Si certains prix (pas tous) → 0, la demande excédentaire de l'un d'eux **explose** |
| Le bien qui explose est-il celui dont le prix s'annule ? | **Pas nécessairement** — mais son prix limite est nul aussi |
| La condition 3 est-elle superflue ? | **Non** — *« le résultat ne tient pas sans elle »* (ex. 5.7) |
| Premier pas de la preuve ? | **Tronquer** : $\bar z_k=\min(z_k,1)$ |
| Deuxième pas ? | Restreindre à $S_\varepsilon$ — **compact, convexe, non vide** |
| Pourquoi ne pas travailler sur $\mathbb{R}^n_+$ ? | Ce n'est **pas compact**, et $z$ n'y est pas continue |
| L'application $f_k$ ? | $\dfrac{\varepsilon+p_k+\max(0,\bar z_k)}{n\varepsilon+1+\sum_m\max(0,\bar z_m)}$ |
| Son idée économique ? | Le **tâtonnement** : monter le prix des biens en excès de demande |
| Quel théorème s'applique ensuite ? | **Brouwer** (A1.11) |
| Que fait-on après Brouwer ? | Faire $\varepsilon\to0$ et **extraire une sous-suite** (A1.8) |
| Où sert la condition 3 ? | À **exclure** $p^*_k=0$ — par contradiction sur (P.1) |
| La conclusion finale ? | Chaque $z_k\max(0,\bar z_k)\geq0$ ⟹ tous nuls ⟹ $z_k\leq0$ ⟹ **$z=0$** par Walras |
| Ce qu'établit le théorème 5.4 ? | Hyp. 5.1 + $\sum_i e^i\gg0$ ⟹ **la condition 3** |
| Son pivot ? | Une demande **non bornée** doit rester **payable** ⟹ son **prix tend vers 0** |
| Le théorème 5.5 ? | **L'équilibre walrasien existe**, avec $p^*\gg0$ |
| Comment simplifier un calcul d'équilibre ? | **Normaliser** ($p_n=1$) et n'écrire que **$n-1$** équations |
| L'équilibre de l'exemple 5.1 ? | $\bar p^*_1=1$ — chacun consomme $(\tfrac12,\tfrac12)$ |
| Pourquoi vérifier l'existence avant de calculer ? | Sinon un échec de calcul est **ininterprétable** |
| La « surprise » annoncée à la fin du §5.1 ? | **Tout équilibre walrasien est dans le cœur** (thm 5.6) |
