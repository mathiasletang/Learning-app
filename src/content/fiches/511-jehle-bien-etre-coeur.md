# Fiche 511 — Les deux théorèmes du bien-être et le théorème limite sur le cœur

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 5 « General Equilibrium », §5.2.2 « Efficiency » et §5.5 « Core and Equilibria » (p. 212-220 et 239-251) |
| **Difficulté** | Avancé — le sommet théorique du livre |
| **Temps d'étude estimé** | 145 min |
| **Prérequis** | Fiche 510 (cœur, allocations réalisables, équilibre walrasien, théorème 5.5) · convexité stricte · théorème 1.4 (suffisance des conditions du premier ordre) |
| **Concepts clés** | Allocation d'équilibre walrasien (WEA), lemmes de non-abordabilité, multiplicité des équilibres, inclusion $W(e)\subset C(e)$, décentralisation, premier théorème du bien-être, limites de l'efficacité de Pareto, second théorème du bien-être, prix de soutien, redistribution des dotations, économie réplique, types de consommateurs, traitement égal dans le cœur, rétrécissement du cœur, théorème d'Edgeworth-Debreu-Scarf, économies à continuum |
| **Poids à l'examen** | La **preuve du théorème 5.6** (sommation des inégalités de prix) · les **deux théorèmes du bien-être** et leurs **limites** · la **preuve du théorème 5.16** (traitement égal, argument de la moyenne) · le **rétrécissement du cœur** et sa formalisation par $C_r$ · l'**argument à deux types** du théorème 5.17 · les **deux objections** finales du livre. |

## 🎯 Vue d'ensemble

```
LE FIL DU §5.2.2 ET DU §5.5 : le marche fait-il ce que Smith croyait ?

  §5.2.2  L'EFFICACITE

     DEF. 5.6   x(p*) = l'ALLOCATION d'equilibre walrasien (WEA)
     DEF. 5.7   W(e) = l'ENSEMBLE des WEA  --  il n'est PAS un singleton

     LEMME 5.1  toute WEA est REALISABLE
     LEMME 5.2  si u^i(x^i) > u^i(xhat^i) alors  p . x^i > p . xhat^i
                si u^i(x^i) >= u^i(xhat^i) alors p . x^i >= p . xhat^i
                (« ce qui est PREFERE au panier choisi est TROP CHER »)

     THEOREME 5.6   W(e) INCLUS DANS C(e)
        toute allocation d'equilibre walrasien est DANS LE COEUR

        preuve : si S bloquait avec y, alors somme p*.y^i = somme p*.e^i
        mais le lemme 5.2 donne p*.y^i >= p*.x^i = p*.e^i pour tout i de S
        avec au moins une STRICTE -> somme p*.y^i > somme p*.e^i
        CONTRADICTION

     LA PORTEE : le marche atteint le coeur SANS PLANIFICATEUR CENTRAL
        chaque agent n'observe QUE LES PRIX
        le troc exigerait une coordination COMPLETE de tous avec tous

     THEOREME 5.7   PREMIER THEOREME DU BIEN-ETRE
        toute WEA est PARETO-EFFICACE  (corollaire immediat de 5.6)

        SES LIMITES, soulignees par le livre :
        « rien ne devrait nous faire croire que les WEA sont necessairement
          SOCIALEMENT OPTIMALES si l'on inclut l'EQUITE ou la JUSTICE »
        efficacite = condition NECESSAIRE, jamais SUFFISANTE

     THEOREME 5.8   SECOND THEOREME DU BIEN-ETRE
        toute allocation Pareto-efficace xbar est une WEA de l'economie
        obtenue en REDISTRIBUANT les dotations a xbar

        COROLLAIRE 5.1  il suffit de redistribuer a N'IMPORTE QUEL e*
        sur la DROITE DE PRIX passant par xbar

        les prix pbar SOUTIENNENT l'allocation xbar

  §5.5  LE COEUR ET LES EQUILIBRES  --  la these d'Edgeworth

     l'intuition : quand l'economie devient GRANDE, le coeur RETRECIT
     jusqu'a ne contenir QUE les allocations walrasiennes
     (Edgeworth 1881 ; demontre par DEBREU et SCARF 1963)

     DEF. 5.10   ECONOMIE REPLIQUE E_r
        I TYPES de consommateurs, r consommateurs de CHAQUE type
        meme preferences ET memes dotations au sein d'un type

     THEOREME 5.16   TRAITEMENT EGAL DANS LE COEUR
        dans le coeur de E_r, tous les consommateurs d'un meme type
        recoivent LE MEME PANIER

        preuve : sinon, prendre les PLUS MAL LOTIS de chaque type et leur
        donner la MOYENNE des paniers de leur type ; la stricte convexite
        rend le plus mal loti STRICTEMENT mieux, et la moyenne est
        REALISABLE pour cette coalition -> BLOCAGE

     consequence : une allocation du coeur de E_r est une COPIE r-FOIS
     d'une allocation de E_1  ->  on peut suivre le coeur dans E_1

     C_r = les allocations de E_1 dont la copie r-fois est dans le coeur de E_r

     LEMME 5.3   C_1 CONTIENT C_2 CONTIENT ... : LE COEUR RETRECIT
     LEMME 5.4   les WEA de E_r sont exactement les copies r-fois des
                 WEA de E_1  ->  l'ensemble des WEA reste CONSTANT

     THEOREME 5.17   (EDGEWORTH-DEBREU-SCARF)
        si x appartient a C_r POUR TOUT r, alors x est une WEA de E_1

        => le coeur RETRECIT exactement jusqu'a l'ensemble des WEA

     LES DEUX OBJECTIONS FINALES du livre
        1. le cadre des repliques est RIGIDE (nombres egaux de chaque type)
           -> leve par AUMANN (1964) et HILDENBRAND (1974), economies
              a CONTINUUM
        2. le coeur est un concept de solution FAIBLE, sans propriete
           d'EQUITE -> « meme l'interpretation la plus large de ce resultat
           ne soutient pas les arguments pour le laissez-faire pur »
```

> **L'annonce du §5.5.** *« Debreu et Scarf (1963) ont étendu le cadre d'Edgeworth et ont prouvé qu'il avait raison. En gros, ils ont montré que **quand une économie devient "plus grande", son cœur "rétrécit" pour n'inclure que les allocations walrasiennes** ! »*

> ⚠️ **Note de transcription — identique aux fiches 500-510.** Le PDF n'exporte pas $\succsim$, $\succ$, $\gg$, $\sum$, $\nabla$ ; il rend l'inégalité vectorielle $\geq$ et l'opérateur $\nabla$ comme un « + ». Ces symboles sont rétablis depuis la prose et les équations voisines.

## 🔴 Concept 1 — L'équilibre walrasien vu dans la boîte (§5.2.2)

### 1.1 La construction

Dotations $(e^1_1,e^1_2)$ et $(e^2_1,e^2_2)$ se rejoignant en $e$. Aux prix relatifs $p^*_1/p^*_2$ :

> *« La contrainte budgétaire du consommateur 1 est **la droite passant par $e$** vue depuis l'origine de 1. Face aux mêmes prix, la contrainte du consommateur 2 **coïncide avec cette même droite** vue (à l'envers) depuis l'origine de 2. »*

**L'équilibre du marché 1** exige $x^1_1+x^2_1=e^1_1+e^2_1$, ce qui équivaut à

$$\boxed{\;x^2_1-e^2_1=e^1_1-x^1_1 \qquad\text{— la DEMANDE NETTE de 2 égale l'OFFRE NETTE de 1}\;}$$

> *« Un peu d'expérimentation avec différents prix relatifs devrait vous convaincre que ces conditions ne seront satisfaites que quand **les paniers demandés — vus depuis les origines respectives — coïncident avec le même point de la boîte**. »*

### 1.2 Les trois enseignements de la figure 5.4

| # | Enseignement |
|---|---|
| 1 | *« Les offres et demandes ne dépendent que des **prix relatifs**. Doubler ou tripler tous les prix ne change pas les ensembles budgétaires. »* |
| 2 | *« L'équilibre de marché revient à **la compatibilité simultanée des actions de consommateurs indépendants, décentralisés, maximisateurs d'utilité**. »* |
| 3 | La **conséquence distributive** — voir ci-dessous |

**Le troisième, développé :**

> *« Ayant commencé avec une distribution initiale $e$, **les actions maximisatrices de consommateurs intéressés sur des marchés impersonnels ont mené à une redistribution qui est à la fois "DANS LA LENTILLE" et "SUR LA COURBE DES CONTRATS"**. Dans la section précédente, nous avons identifié de telles allocations comme étant **dans le "cœur"**. »*

> *« Ainsi, **malgré le fait que les consommateurs n'ont besoin d'aucune connaissance des préférences ou dotations des autres, l'allocation résultant des prix d'équilibre walrasien est dans le cœur** — du moins pour l'économie de la boîte d'Edgeworth. Comme nous allons le montrer, **cette propriété remarquable tient en général**. »*

## 🔴 Concept 2 — Les allocations d'équilibre walrasien

### 2.1 Les définitions

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 5.6 — Walrasian Equilibrium Allocations (WEAs).</span>

Soit $p^*$ un équilibre walrasien pour une économie de dotations $e$, et

$$x(p^*)\equiv\big(x^1(p^*,p^*\cdot e^1),\dots,x^I(p^*,p^*\cdot e^I)\big)$$

Alors $x(p^*)$ est appelée une **allocation d'équilibre walrasien**, ou **WEA**.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 5.7 — The Set of WEAs.</span>

$W(e)$ désigne l'ensemble des WEA de l'économie de dotations $e$.

</div>

### 2.2 La multiplicité — un avertissement du livre

> *« Il vaut la peine de noter qu'en général, **nous n'avons aucune raison de nous attendre à ce que les WEA soient uniques**. Même dans l'économie à deux personnes, **il est facile de construire des exemples où les préférences satisfont des propriétés très ordinaires et où pourtant plusieurs WEA existent** (Fig. 5.5). Il semble donc prudent de garder ces possibilités à l'esprit et **d'éviter de glisser vers la croyance que les équilibres walrasiens sont "habituellement" uniques**. »*

> ⚠️ **C'est la raison pour laquelle le livre n'a traité que l'existence** (fiche 510, §1.2). L'unicité est **fausse** en général.

### 2.3 Les deux lemmes

> **LEMMA 5.1.** Soit $p^*$ un équilibre walrasien et $x(p^*)$ la WEA associée. Alors $x(p^*)\in F(e)$ — **toute WEA est réalisable**.

*(La preuve est laissée en exercice.)*

> **LEMMA 5.2.** Supposons $u^i$ **strictement croissante** sur $\mathbb{R}^n_+$, la demande de $i$ bien définie en $p\geq0$ et égale à $\hat x^i$, et $x^i\in\mathbb{R}^n_+$. Alors **(i)** si $u^i(x^i)>u^i(\hat x^i)$, alors $p\cdot x^i>p\cdot\hat x^i$ ; **(ii)** si $u^i(x^i)\geq u^i(\hat x^i)$, alors $p\cdot x^i\geq p\cdot\hat x^i$.

> **La lecture du lemme 5.2, en une phrase.** *« Toute autre allocation à la fois réalisable et **préférée** par un consommateur à son panier dans la WEA doit être **trop chère** pour ce consommateur. »*
>
> ⚠️ **Notez que ceci vaut même si $p$ n'est PAS un équilibre walrasien** — le livre le souligne. C'est une propriété de la **maximisation sous contrainte budgétaire**, pas de l'équilibre.

**La preuve de (ii) à partir de (i)**, telle que le livre la donne :

Supposons par l'absurde $u^i(x^i)\geq u^i(\hat x^i)$ **et** $p\cdot x^i<p\cdot\hat x^i$.

> *« Alors, en partant de $x^i$, nous pouvons **augmenter la quantité de chaque bien d'un montant assez petit** pour que le panier résultant $\bar x^i$ reste strictement moins cher que $\hat x^i$. Mais parce que $u^i$ est **strictement croissante**, nous avons alors $u^i(\bar x^i)>u^i(x^i)\geq u^i(\hat x^i)$ et $p\cdot\bar x^i<p\cdot\hat x^i$. **Ceci contredit (i)** avec $x^i$ remplacé par $\bar x^i$. »* $\blacksquare$

## 🔴 Concept 3 — Théorème 5.6 : toute WEA est dans le cœur

### 3.1 L'énoncé

> **THEOREM 5.6 — Core and Equilibria in Competitive Economies.** Considérons une économie d'échange $(u^i,e^i)_{i\in\mathcal{I}}$. Si chaque $u^i$ est **strictement croissante** sur $\mathbb{R}^n_+$, alors **toute allocation d'équilibre walrasien est dans le cœur** :
>
> $$\boxed{\;W(e)\subset C(e)\;}$$

### 3.2 La preuve — à savoir refaire

Supposons $x(p^*)$ une WEA et, **par l'absurde**, $x(p^*)\notin C(e)$.

Par le lemme 5.1, $x(p^*)$ est **réalisable**. Comme elle n'est pas dans le cœur, il existe une coalition $S$ et une allocation $y$ telles que

$$\sum_{i\in S}y^i=\sum_{i\in S}e^i \tag{P.1}$$

$$u^i(y^i)\geq u^i\big(x^i(p^*,p^*\cdot e^i)\big) \quad\text{pour tout } i\in S, \quad\text{avec au moins une inégalité stricte} \tag{P.2}$$

**Pas 1 — la valeur de (P.1).** En multipliant par $p^*$ :

$$\sum_{i\in S}p^*\cdot y^i=\sum_{i\in S}p^*\cdot e^i \tag{P.3}$$

**Pas 2 — appliquer le lemme 5.2.** De (P.2), pour chaque $i\in S$ :

$$p^*\cdot y^i\ \geq\ p^*\cdot x^i(p^*,p^*\cdot e^i)\ =\ p^*\cdot e^i \tag{P.4}$$

**avec au moins une inégalité stricte.**

> ⚠️ **L'égalité de droite est la saturation du budget** : à l'équilibre walrasien, chaque consommateur dépense exactement la valeur de sa dotation.

**Pas 3 — sommer sur $S$.**

$$\sum_{i\in S}p^*\cdot y^i \ > \ \sum_{i\in S}p^*\cdot e^i$$

*(strict parce qu'au moins une des inégalités de (P.4) l'est)*, **contredisant (P.3)**. $\blacksquare$

> **L'idée de la preuve, en une phrase.** Une coalition qui bloquerait devrait s'offrir un panier **strictement plus cher** que ses dotations aux prix d'équilibre — ce qui est **impossible**, puisqu'elle ne dispose que de ses dotations.

### 3.3 Le corollaire sur la non-vacuité du cœur

> *« Comme corollaire au théorème 5.5, **nous avons immédiatement un résultat sur la non-vacuité du cœur**. Sous les conditions du théorème 5.5, une WEA existe, et par le théorème 5.6, cette allocation est dans le cœur. Donc **les conditions du théorème 5.5 garantissent que le cœur est non vide**. »*

$$\boxed{\;\text{hypothèse 5.1}+\textstyle\sum_i e^i\gg0 \ \Longrightarrow\ C(e)\neq\varnothing\;}$$

### 3.4 La portée du résultat — le passage à retenir

> *« Dans un équilibre walrasien, **chaque consommateur agit complètement indépendamment de tous les autres** : il choisit simplement de demander un panier qui maximise son utilité étant donnés les prix et son revenu. **En particulier, il ne considère ni la quantité demandée par les autres ni la quantité totale offerte** d'un bien. **Il ne connaît que ses propres préférences et les prix.** »*

> *« **Contrastez ceci avec l'histoire du pur troc** par laquelle nous avons commencé. Là, il était crucial que les consommateurs puissent effectivement **se réunir, faire l'inventaire des ressources totales, puis exploiter tous les gains d'échange potentiels**. En particulier, chacun devrait être **parfaitement au fait** du moment où un échange mutuellement bénéfique pourrait être fait avec **n'importe quel autre consommateur** ! […] il semblerait exiger l'aide d'**une autorité centrale** chargée de coordonner les coalitions et les échanges. »*

> *« Mais nous avons maintenant montré qu'**il est possible d'atteindre des issues dans le cœur SANS l'aide d'un planificateur central**. En effet, **personne dans notre économie concurrentielle n'a besoin de direction ou de conseil de qui que ce soit**. Chaque consommateur **observe simplement les prix** et place ses demandes et offres maximisatrices d'utilité sur le marché. En ce sens, **le mécanisme de marché concurrentiel est dit DÉCENTRALISÉ**. »*

## 🔴 Concept 4 — Le premier théorème du bien-être

### 4.1 L'énoncé

> **THEOREM 5.7 — First Welfare Theorem.** Sous les hypothèses du théorème 5.6, **toute allocation d'équilibre walrasien est Pareto-efficace**.

> *« La preuve découle **immédiatement** du théorème 5.6 et de l'observation que **toutes les allocations du cœur sont Pareto-efficaces**. »*

### 4.2 Ce que le livre en dit — et la mise en perspective

> *« Bien que nous ayons prouvé davantage, **ceci seul est déjà remarquable**. Imaginez qu'on vous charge d'allouer toutes les ressources de l'économie de sorte qu'au final l'allocation soit Pareto-efficace. Pour vous empêcher de tout donner à une seule personne, insistons aussi pour qu'au final **chaque consommateur soit au moins aussi bien loti qu'en consommant sa dotation**. Pensez à comment vous accompliriez cela. Vous pourriez commencer par essayer de **rassembler l'information sur les préférences de tous les consommateurs** (**quelle tâche ce serait !**). Seulement alors pourriez-vous tenter de redistribuer les biens de manière à ne laisser aucun gain d'échange. **Aussi incroyablement difficile que soit cette tâche, le mécanisme de marché concurrentiel l'accomplit — et davantage.** »*

> *« Le théorème 5.7 fournit un **soutien spécifique** à l'affirmation d'Adam Smith. Si les conditions suffisent à garantir l'existence d'équilibres walrasiens, alors **quelle que soit l'allocation initiale des ressources, l'allocation réalisée à l'équilibre de marché sera Pareto-efficace**. »*

### 4.3 Les limites — le passage le plus important de la fiche

> *« **Il est extrêmement important d'apprécier la portée de cet aspect des systèmes de marché concurrentiels. Il est tout aussi important d'en réaliser les LIMITES et de résister à la tentation d'y lire plus qu'il n'est justifié.** »*

> *« **Rien de ce que nous avons argumenté ne devrait nous faire croire que les WEA sont nécessairement "socialement optimales"** si nous incluons dans notre notion d'optimalité sociale quelque considération pour les questions d'**"équité"** ou de **"justice"** dans la distribution. »*

**Les deux affirmations que le livre distingue soigneusement :**

| Affirmation | Statut |
|---|---|
| *« Une allocation qui n'est pas Pareto-efficace **n'est même pas candidate** au titre de socialement meilleure »* | *« la plupart en conviendraient »* |
| *« **Chaque** distribution Pareto-efficace a une égale prétention à être considérée comme la meilleure ou la "plus juste" »* | *« **peu pourraient argumenter cela de façon persuasive** »* |

> $$\boxed{\;\text{Efficacité de Pareto} = \text{condition NÉCESSAIRE, jamais SUFFISANTE, de l'optimalité sociale.}\;}$$

**L'illustration de la figure 5.6 :**

> *« Supposons que **par des moyens inconnus, la société ait identifié la distribution $\bar x$ comme la socialement meilleure**. Supposons que les dotations initiales soient $e$. Le théorème 5.6 nous dit qu'une allocation d'équilibre sera dans $C(e)$, comme $x'$ — **qui dans ce cas est bien distincte de $\bar x$**. »*

> *« Ainsi, **bien que les systèmes de marché puissent améliorer une distribution initiale qui n'est pas elle-même Pareto-efficace, il n'y a AUCUNE assurance qu'un système concurrentiel, à lui seul, mène à une distribution finale que la société considère comme la meilleure**. »*

## 🔴 Concept 5 — Le second théorème du bien-être

### 5.1 La question renversée

> *« **Avant de devenir indûment pessimistes**, considérons une question légèrement différente. **Si, par un moyen quelconque, nous pouvons déterminer l'allocation que nous voudrions voir, la puissance d'un système de marché décentralisé peut-elle être utilisée pour l'atteindre ?** »*

> *« De la Fig. 5.6, il semble que cela devrait être le cas. **Si les dotations initiales pouvaient être redistribuées à $e^*$**, il est clair que $\bar x$ est l'allocation qui serait atteinte à l'équilibre concurrentiel avec ces dotations et les prix $p^*$. »*

### 5.2 L'énoncé

> **THEOREM 5.8 — Second Welfare Theorem.** Considérons une économie d'échange $(u^i,e^i)_{i\in\mathcal{I}}$ avec dotation agrégée $\sum_i e^i\gg0$ et chaque $u^i$ satisfaisant l'**hypothèse 5.1**. Supposons que $\bar x$ soit une allocation **Pareto-efficace**, et que **les dotations soient redistribuées de sorte que le nouveau vecteur de dotations soit $\bar x$**. Alors **$\bar x$ est une allocation d'équilibre walrasien de l'économie résultante** $(u^i,\bar x^i)_{i\in\mathcal{I}}$.

### 5.3 La preuve

**Pas 1 — l'existence dans la nouvelle économie.** $\bar x$ étant Pareto-efficace, elle est réalisable, donc $\sum_i\bar x^i=\sum_i e^i\gg0$. Par le **théorème 5.5**, l'économie $(u^i,\bar x^i)$ possède une WEA, notée $\hat x$.

**Pas 2 — chacun préfère $\hat x^i$ à sa nouvelle dotation.** À l'équilibre, la demande maximise l'utilité sous le budget. Comme la dotation de $i$ est **$\bar x^i$** et qu'il demande $\hat x^i$ :

$$u^i(\hat x^i)\geq u^i(\bar x^i) \qquad \forall\,i\in\mathcal{I} \tag{P.1}$$

> ⚠️ **Le pivot est ici.** Le panier $\bar x^i$ est **exactement** la dotation de $i$, donc il est **toujours abordable**. Un maximiseur ne peut donc pas faire moins bien.

**Pas 3 — $\hat x$ est réalisable pour l'économie ORIGINALE.**

$$\sum_i\hat x^i=\sum_i\bar x^i=\sum_i e^i$$

**Pas 4 — l'efficacité de $\bar x$ force l'égalité.** $\hat x$ est réalisable pour l'économie originale et **ne rend personne moins bien loti** que $\bar x$, qui est **Pareto-efficace**.

> *« Donc **$\hat x$ ne peut rendre personne strictement mieux loti** ; sinon $\bar x$ ne serait pas Pareto-efficace. Donc **chaque inégalité de (P.1) doit être une égalité**. »*

**Pas 5 — de $u^i(\hat x^i)=u^i(\bar x^i)$ à $\hat x^i=\bar x^i$.**

> *« Si pour un consommateur ce n'était pas le cas, alors à l'équilibre walrasien de la nouvelle économie, **ce consommateur pourrait s'offrir la moyenne des paniers $\hat x^i$ et $\bar x^i$ et augmenter strictement son utilité (par stricte quasiconcavité)**, contredisant le fait que $\hat x^i$ est maximisateur. »* $\blacksquare$

> **Le pas 5 mérite un mot.** Les deux paniers étant **également bons** et **tous deux abordables** *(le premier est le choix optimal, le second est la dotation)*, leur moyenne est abordable par convexité de l'ensemble budgétaire, et **strictement meilleure** par stricte quasiconcavité. C'est exactement l'argument d'unicité de l'exercice 1.16(a) (fiche 501).

### 5.4 L'interprétation et les prix de soutien

> *« On peut voir le second théorème du bien-être comme **une réponse affirmative** à la question suivante : **un système qui dépend de décisions décentralisées et intéressées d'un grand nombre de consommateurs est-il capable de soutenir l'allocation socialement "la meilleure", si nous pouvions seulement nous mettre d'accord sur ce qu'elle est ?** Sous les conditions énoncées, **le second théorème dit oui**, tant que « le meilleur » exige, au minimum, l'efficacité de Pareto. »*

**Les prix de soutien.**

> *« Bien que nous n'ayons pas explicitement mentionné les prix dans l'énoncé ni dans la preuve, **ils sont là en arrière-plan**. Le théorème dit qu'il existe des prix d'équilibre $\bar p$ tels que, quand la dotation est $\bar x$, **chaque consommateur $i$ maximisera $u^i(x^i)$ sous $\bar p\cdot x^i\leq\bar p\cdot\bar x^i$ en choisissant $x^i=\bar x^i$**. Pour cette raison, les prix $\bar p$ sont dits **SOUTENIR** l'allocation $\bar x$. »*

### 5.5 Le corollaire 5.1 — on n'a pas besoin de redistribuer jusqu'à $\bar x$

> *« Nous avons commencé en demandant si une redistribution vers un point comme $e^*$ pouvait donner $\bar x$ comme WEA. Dans le théorème, nous avons montré que la réponse est oui **si les dotations étaient redistribuées jusqu'à $\bar x$ elle-même**. Il devrait être clair de la Fig. 5.6, cependant, que **$\bar x$ sera en fait une WEA pour les prix $\bar p$ sous une redistribution vers N'IMPORTE QUEL point de la droite de prix passant par $\bar x$** — y compris, bien sûr, vers $e^*$. »*

> **COROLLARY 5.1 — Another Look at the Second Welfare Theorem.** Sous les hypothèses du théorème précédent, si $\bar x$ est Pareto-efficace, alors **$\bar x$ est une WEA pour un certain équilibre walrasien $\bar p$ après redistribution des dotations initiales vers n'importe quelle allocation $e^*\in F(e)$ telle que**
>
> $$\boxed{\;\bar p\cdot e^{*i}=\bar p\cdot\bar x^i \qquad \forall\,i\in\mathcal{I}\;}$$

> **La lecture économique du corollaire.** Seule la **valeur** de la dotation de chacun compte, pas sa composition. Le planificateur n'a donc **pas besoin de redistribuer les biens eux-mêmes** — il lui suffit de redistribuer du **pouvoir d'achat** (transferts forfaitaires), et le marché fait le reste.
>
> ⚠️ **C'est le fondement théorique de la séparation « efficacité / équité ».** L'État redistribue par transferts **forfaitaires** ; le marché assure l'efficacité. La difficulté pratique est que les transferts vraiment forfaitaires — indépendants de tout comportement — sont presque impossibles à mettre en œuvre, ce qui est l'objet de la théorie de la taxation optimale.

## 🔴 Concept 6 — Les économies répliques (§5.5.1)

### 6.1 La thèse d'Edgeworth et son enjeu

> *« Debreu et Scarf (1963) ont étendu le cadre d'Edgeworth et **ont prouvé qu'il avait raison**. En gros, ils ont montré que **quand une économie devient "plus grande", son cœur "rétrécit" pour n'inclure que les allocations walrasiennes** ! »*

**L'enjeu, tel que le livre le formule :**

> *« Leur résultat est réconfortant pour ceux qui croient aux qualités spéciales d'un système de marché. Il suggère une comparaison alléchante entre les paradigmes polaires de la **planification centrale** et du **laissez-faire** dans les très grandes économies. **Si l'objectif du processus de planification est d'identifier puis d'implémenter une distribution qui est dans le cœur, et s'il n'y a pas d'autres allocations dans le cœur que celles qu'un système de marché choisirait, POURQUOI SE DONNER LA PEINE (ET LE COÛT) DE PLANIFIER ?** »*

> *« Pour trouver le cœur, **un planificateur a besoin d'information sur les préférences**, et les consommateurs ont des **incitations égoïstes à être moins que complètement honnêtes** en la révélant. **Le marché n'a besoin de rien savoir des préférences, et dépend en fait de l'égoïsme des consommateurs. Ce qui est un vice dans un cas est une sorte de vertu dans l'autre.** »*

**Les questions techniques que le livre s'engage à traiter :**

> *« Que signifie pour une économie d'être **"grande"** ? De plus, parce qu'une allocation implique un vecteur de biens pour chaque consommateur, et qu'une économie plus grande a plus de consommateurs, **la "dimensionnalité" du cœur n'est-elle pas différente** dans les grandes économies ? Si oui, **comment pouvons-nous parler du cœur qui "rétrécit"** ? »*

### 6.2 La définition d'une réplique

> *« Pensez aux préférences et/ou dotations de chaque consommateur comme faisant de lui **un "TYPE" différent**. Deux consommateurs avec des préférences différentes mais les mêmes dotations sont de types différents. **De même** pour deux consommateurs aux mêmes préférences mais dotations différentes. »*

> *« Maintenant imaginez que **chaque consommateur acquière soudain un jumeau**. Les jumeaux sont **complètement identiques**, ayant les mêmes préférences et les mêmes dotations. La nouvelle économie a **deux consommateurs de chaque type** plutôt qu'un. Nous appelons cette nouvelle économie la **réplique double** de l'originale. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 5.10 — An $r$-Fold Replica Economy.</span>

Soit $I$ types de consommateurs, indexés par $\mathcal{I}=\{1,\dots,I\}$. Par **économie réplique d'ordre $r$**, notée $E_r$, on entend l'économie avec **$r$ consommateurs de chaque type**, pour un total de $rI$ consommateurs. Pour tout type $i$, les $r$ consommateurs de ce type partagent les mêmes préférences $\succsim^i$ et ont des **dotations identiques** $e^i\gg0$. On suppose de plus que $\succsim^i$ est représentable par une $u^i$ satisfaisant l'**hypothèse 5.1**.

</div>

> *« Ainsi, en comparant deux économies répliques, **nous pouvons dire sans ambiguïté laquelle est la plus grande** : celle qui a plus de consommateurs de chaque type. »*

### 6.3 La notation

Chaque consommateur est indexé par **deux** exposants, $iq$ : $i=1,\dots,I$ pour le **type**, $q=1,\dots,r$ pour l'**individu au sein du type**.

$$x=\big(x^{11},x^{12},\dots,x^{1r},\dots,x^{I1},\dots,x^{Ir}\big) \tag{5.8}$$

**La réalisabilité :**

$$\boxed{\;\sum_{i\in\mathcal{I}}\sum_{q=1}^r x^{iq}=r\sum_{i\in\mathcal{I}}e^i\;} \tag{5.9}$$

*« parce que chacun des $r$ consommateurs de type $i$ a le vecteur de dotation $e^i$. »*

**Le cœur de $E_r$ est non vide** : toutes les hypothèses du théorème 5.5 sont satisfaites, donc une WEA existe, et par le théorème 5.6 elle est dans le cœur.

## 🔴 Concept 7 — Théorème 5.16 : le traitement égal dans le cœur

### 7.1 L'énoncé

> **THEOREM 5.16 — Equal Treatment in the Core.** Si $x$ est une allocation dans le cœur de $E_r$, alors **tout consommateur de type $i$ doit avoir le même panier**. C'est-à-dire, pour chaque $i$, $x^{iq}=x^{iq'}$ pour tous $q,q'=1,\dots,r$.

<div class="callout" data-kind="formel">

<span class="callout__lab">propriété cruciale</span>

*« Ce théorème au nom délicieusement démocratique identifie une des allocations du cœur. Il est donc important non seulement que nous croyions au traitement égal, mais que nous ayons **une bonne intuition de POURQUOI c'est vrai**. »*

</div>

### 7.2 La preuve, dans le cas à deux types et quatre personnes

*(Le livre donne une preuve « au ralenti » pour $E_2$ avec $I=2$, laissant le cas général en exercice.)*

Soit $x\equiv(x^{11},x^{12},x^{21},x^{22})$ dans le cœur de $E_2$. La réalisabilité donne

$$x^{11}+x^{12}+x^{21}+x^{22}=2e^1+2e^2 \tag{P.1}$$

**Supposons** que $x$ **n'assigne pas** des paniers identiques à une paire de types identiques — disons les consommateurs $11$ et $12$, avec $x^{11}\neq x^{12}$.

**Pas 1 — ordonner au sein de chaque type.** $\succsim^1$ étant **complète**, on peut supposer (quitte à renommer)

$$x^{11}\succsim^1 x^{12} \tag{P.2}$$

et de même pour le type 2 :

$$x^{21}\succsim^2 x^{22} \tag{P.3}$$

> *« Donc **le consommateur 2 de type 1 est le type 1 le plus mal loti**, et le consommateur 2 de type 2 est le type 2 le plus mal loti. **Voyons si ces plus mal lotis de chaque type peuvent se réunir et bloquer $x$.** »*

**Pas 2 — construire les moyennes.**

$$\bar x^{12}=\frac{x^{11}+x^{12}}{2} \qquad\qquad \bar x^{22}=\frac{x^{21}+x^{22}}{2}$$

**Pas 3 — les moyennes sont préférées par les plus mal lotis.**

| Consommateur | Comparaison | Justification |
|---|---|---|
| $12$ | $\bar x^{12}\succ^1 x^{12}$ | **stricte convexité** — les paniers $x^{11}$ et $x^{12}$ sont **distincts**, et $12$ était le plus mal loti |
| $22$ | $\bar x^{22}\succsim^2 x^{22}$ | stricte convexité aussi, mais *« la préférence n'a pas besoin d'être stricte parce qu'on peut avoir $x^{21}=x^{22}$ »* |

> *« Le couple $(\bar x^{12},\bar x^{22})$ rend donc **le consommateur $12$ strictement mieux loti et le consommateur $22$ pas moins bien loti** que l'allocation $x$. »*

**Pas 4 — la faisabilité pour la coalition $S=\{12,22\}$.**

$$\bar x^{12}+\bar x^{22}=\frac{x^{11}+x^{12}}{2}+\frac{x^{21}+x^{22}}{2}=\frac12\big(x^{11}+x^{12}+x^{21}+x^{22}\big)\ \underset{\text{(P.1)}}{=}\ \frac12\big(2e^1+2e^2\big)=e^1+e^2$$

> *« Les deux consommateurs les plus mal lotis de chaque type peuvent donc **ensemble atteindre un couple de paniers** qui rend l'un strictement mieux loti et l'autre pas moins bien loti. **La coalition $S=\{12,22\}$ bloque donc $x$** — ce qui contredit le fait que $x$ soit dans le cœur. »* $\blacksquare$

> **L'idée de la preuve, en une phrase.** **Prendre les plus mal lotis de chaque type et leur donner la moyenne des paniers de leur type.** La stricte convexité rend cette moyenne strictement meilleure pour au moins l'un d'eux, et l'arithmétique des moyennes la rend **exactement réalisable** avec leurs seules dotations.
>
> ⚠️ **Où sert chaque hypothèse.** — **Complétude** : pour identifier « le plus mal loti » de chaque type. — **Stricte convexité** : pour que la moyenne soit **strictement** préférée. — **Dotations identiques au sein d'un type** : pour que le calcul du pas 4 donne exactement $e^1+e^2$.

### 7.3 Ce que le traitement égal permet

> *« Quand nous répliquons une économie, nous augmentons le nombre de consommateurs et donc **le nombre de paniers dans une allocation**. Cependant, quand nous restreignons l'attention aux allocations du cœur, **la propriété de traitement égal nous permet de décrire complètement toute allocation du cœur de $E_r$ par référence à une allocation similaire dans l'économie de base $E_1$**. »*

Une allocation du cœur de $E_r$ est de la forme

$$x=\big(\underbrace{x^1,\dots,x^1}_{r \text{ fois}},\underbrace{x^2,\dots,x^2}_{r \text{ fois}},\dots,\underbrace{x^I,\dots,x^I}_{r \text{ fois}}\big)$$

c'est-à-dire la **copie $r$ fois** de l'allocation $(x^1,x^2,\dots,x^I)$ de $E_1$ (5.10).

**Et cette allocation est réalisable dans $E_1$** : de $r\sum_i x^i=r\sum_i e^i$, **en divisant par $r$** :

$$\sum_i x^i=\sum_i e^i \quad$$

> **C'est la réponse à la question « comment le cœur peut-il rétrécir si sa dimension change ? »** On ne suit pas le cœur de $E_r$ directement ; on suit **son image dans $E_1$**, qui vit toujours dans le même espace.

## 🔴 Concept 8 — Le rétrécissement du cœur

### 8.1 La définition de $C_r$

$$\boxed{\;C_r\equiv\Big\{x=(x^1,\dots,x^I)\in F(e) \ \Big|\ \big(\underbrace{x^1,\dots,x^1}_{r},\dots,\underbrace{x^I,\dots,x^I}_{r}\big) \text{ est dans le cœur de } E_r\Big\}\;}$$

### 8.2 Lemme 5.3 — la suite décroît

> **LEMMA 5.3.** La suite d'ensembles $C_1,C_2,\dots$ est **décroissante** :
>
> $$C_1\supseteq C_2\supseteq\dots\supseteq C_r\supseteq\dots$$

**La preuve.** Il suffit de montrer $C_r\subseteq C_{r-1}$ pour $r>1$. Soit $x\in C_r$ : sa copie $r$ fois **ne peut être bloquée** dans $E_r$.

> *« Un moment de réflexion vous en convaincra une fois que vous réaliserez que **toute coalition qui bloquerait la copie $(r-1)$ fois dans $E_{r-1}$ pourrait aussi bloquer la copie $r$ fois dans $E_r$** — après tout, **tous les membres de cette coalition sont présents dans $E_r$ également, et leurs dotations n'ont pas changé**. »* $\blacksquare$

> **L'idée, en une phrase.** Répliquer **n'enlève aucune coalition** : toutes celles de $E_{r-1}$ survivent dans $E_r$, et de nouvelles apparaissent. **Plus de bloqueurs ⟹ un cœur plus petit.**

### 8.3 Lemme 5.4 — les WEA, elles, restent constantes

> **LEMMA 5.4.** Une allocation $x$ est une WEA pour $E_r$ **si et seulement si** elle est la copie $r$ fois d'une allocation $(x^1,\dots,x^I)$ qui est une WEA pour $E_1$.

*(Le livre laisse les deux sens en exercice, notant seulement que par les théorèmes 5.5 et 5.16, une WEA de $E_r$ satisfait le traitement égal.)*

> *« Le lemme 5.4 dit que **quand nous répliquons l'économie, l'ensemble des équilibres walrasiens reste "CONSTANT"** au sens où il consiste **purement en copies des équilibres walrasiens de l'économie de base**. »*

$$\boxed{\;C_1\supseteq C_2\supseteq\dots\supseteq W_1(e) \qquad\text{— le cœur rétrécit, les WEA ne bougent pas}\;}$$

*(L'inclusion $C_r\supseteq W_1(e)$ vient de ce que la copie $r$ fois d'une WEA de $E_1$ est dans le cœur de $E_r$, par les théorèmes 5.5 et 5.6.)*

### 8.4 L'illustration à deux types

**Le cas concret du livre.** Soit $\tilde x$ dans le cœur de $E_1$ mais **pas** une WEA — *« la droite de prix passant par $\tilde x$ et $e$ n'est pas tangente aux courbes d'indifférence en $\tilde x$ »*. Supposons $\tilde x$ sur la courbe d'indifférence de $11$ passant par sa dotation.

**La copie double peut-elle être dans le cœur de $E_2$ ? Non.**

**La construction.** *« Tout point le long de la droite joignant $e$ et $\tilde x$ est préféré à la fois à $e$ et à $\tilde x$ par les deux (il y a maintenant deux) type 1, parce que leurs préférences sont strictement convexes. **En particulier, le point médian $\bar x$**. »*

**La coalition** $S=\{11,12,21\}$ — **les deux type 1 et UN SEUL type 2**.

| Membre | Panier proposé | Comparaison |
|---|---|---|
| $11$ | $\bar x^{11}=\tfrac12(e^1+\tilde x^{11})$ | $\succ^1 \tilde x^{11}$ |
| $12$ | $\bar x^{12}=\tfrac12(e^1+\tilde x^{12})$ | $\succ^1 \tilde x^{12}$ |
| $21$ | $\tilde x^{21}$ | $\sim^2 \tilde x^{21}$ |

**La faisabilité.** Avec $\tilde x^{11}=\tilde x^{12}$ :

$$\bar x^{11}+\bar x^{12}+\tilde x^{21}=2\left(\tfrac12 e^1+\tfrac12\tilde x^{11}\right)+\tilde x^{21}=e^1+\tilde x^{11}+\tilde x^{21} \tag{5.11}$$

Et comme $\tilde x$ est dans le cœur de $E_1$, elle y est **réalisable** :

$$\tilde x^{11}+\tilde x^{21}=e^1+e^2 \tag{5.12}$$

En combinant :

$$\boxed{\;\bar x^{11}+\bar x^{12}+\tilde x^{21}=2e^1+e^2\;}$$

**— exactement les dotations de la coalition** (deux type 1 et un type 2). Donc $S$ **bloque**, et $\tilde x\notin C_2$. $\blacksquare$

> ⚠️ **La clé est le déséquilibre de la coalition** : **deux** type 1 pour **un seul** type 2. C'est ce qui permet de « diluer » le gain des type 1 sur un seul type 2, tout en restant dans les dotations. Une coalition équilibrée (un de chaque) ne pourrait pas faire mieux que $\tilde x$, qui est dans le cœur de $E_1$.

## 🔴 Concept 9 — Théorème 5.17 : Edgeworth-Debreu-Scarf

### 9.1 L'énoncé

> **THEOREM 5.17 — (Edgeworth-Debreu-Scarf) A Limit Theorem on the Core.** Si $x\in C_r$ **pour tout** $r=1,2,\dots$, alors **$x$ est une allocation d'équilibre walrasien pour $E_1$**.

$$\boxed{\;\bigcap_{r\geq1}C_r=W_1(e) \qquad\text{— le cœur rétrécit EXACTEMENT jusqu'aux WEA}\;}$$

### 9.2 L'argument à deux types — celui qu'il faut comprendre

Soit $\tilde x$ **non walrasienne** et supposée dans $C_r$ **pour tout $r$**. En particulier $\tilde x$ est dans le cœur de $E_1$ : **dans la lentille et sur la courbe des contrats**, avec **tangence** des indifférences en $\tilde x$.

**Pas 1 — les prix implicites.** La droite joignant $e$ et $\tilde x$ correspond à une contrainte budgétaire pour les deux consommateurs, et donc à des prix $p_1,p_2$.

> *« Parce que $\text{TMS}^1_{12}(\tilde x^1)=\text{TMS}^2_{12}(\tilde x^2)$, **soit $p_1/p_2>\text{TMS}^1_{12}(\tilde x^1)$, soit $p_2/p_1>\text{TMS}^2_{12}(\tilde x^2)$**. Notez que **l'égalité ne peut pas tenir** ; sinon ces prix constitueraient un équilibre walrasien et $\tilde x$ serait une WEA. »*

**Pas 2 — trouver un point strictement meilleur pour le type 1.** *(Le livre traite le premier cas ; le second est symétrique.)*

> *« La droite de $e$ à $\tilde x$ **coupe la courbe d'indifférence du type 1 au point $A$**, et par stricte convexité **elle se situe entièrement au-dessus entre $A$ et $\tilde x$**. Il existe donc un point $\hat x$ sur le segment de $A$ à $\tilde x$ que **le type 1 préfère strictement** à son panier en $\tilde x$. »*

**Pas 3 — la paramétrisation astucieuse.** $\hat x$ étant sur la corde de $e$ à $\tilde x$, on peut l'écrire comme combinaison convexe. Le livre choisit délibérément la forme

$$\boxed{\;\hat x^1\equiv\frac1r\,e^1+\frac{r-1}{r}\,\tilde x^1\;} \tag{5.13}$$

pour un certain $r>1$, avec

$$\hat x^1\succ^1 \tilde x^1 \tag{5.14}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi cette forme ?</span>

Les coefficients $\tfrac1r$ et $\tfrac{r-1}{r}$ somment bien à 1. Mais surtout, **ils sont exactement ceux qui rendront la coalition faisable** au pas 5. C'est un choix de paramétrisation en vue de la conclusion.

</div>

**Pas 4 — la coalition.** Supposons $r$ **entier** *(« comme on peut toujours l'arranger »)*. La coalition $S$ consiste en **tous les $r$ type 1** et **$r-1$ type 2**.

$$\begin{aligned} \hat x^1 &\succ^1 \tilde x^1 &&\text{pour chacun des } r \text{ type 1}\\ \tilde x^2 &\sim^2 \tilde x^2 &&\text{pour chacun des } (r-1) \text{ type 2} \end{aligned} \tag{5.15}$$

**Pas 5 — la faisabilité.**

$$r\hat x^1+(r-1)\tilde x^2 = r\left[\frac1r e^1+\frac{r-1}{r}\tilde x^1\right]+(r-1)\tilde x^2 = e^1+(r-1)\big(\tilde x^1+\tilde x^2\big) \tag{5.16}$$

Et comme $\tilde x$ est réalisable dans $E_1$ :

$$\tilde x^1+\tilde x^2=e^1+e^2 \tag{5.17}$$

d'où

$$r\hat x^1+(r-1)\tilde x^2=e^1+(r-1)(e^1+e^2)=\boxed{\;r\,e^1+(r-1)\,e^2\;}$$

**— exactement les dotations de $S$** ($r$ type 1 et $r-1$ type 2). $S$ **bloque** la copie $r$ fois de $\tilde x$, donc $\tilde x\notin C_r$. **Contradiction.** $\blacksquare$

> **L'architecture, en une phrase.** Si $\tilde x$ n'est pas walrasienne, **les TMS ne coïncident pas avec les prix implicites**, ce qui ouvre un gain strict pour l'un des types en se déplaçant **vers la dotation** le long de la corde. Une coalition **déséquilibrée** — tous les membres du type avantagé, et **un de moins** de l'autre type — capte exactement ce gain.
>
> ⚠️ **Le déséquilibre est le mécanisme.** Plus $r$ est grand, plus la coalition peut être **finement déséquilibrée** ($r$ contre $r-1$), donc plus le point $\hat x$ peut être **proche de $\tilde x$** — donc plus le blocage est facile. C'est pourquoi le cœur rétrécit **quand $r$ augmente**.

### 9.3 La preuve générale

*(Le livre la donne sous deux hypothèses additionnelles : si $x\in C_1$ alors $x\gg0$ ; et chaque $u^i$ est différentiable sur $\mathbb{R}^n_{++}$ avec gradient strictement positif.)*

**Pas 1 — l'inégalité fondamentale.** On établit d'abord

$$u^i\big((1-t)\tilde x^i+t\,e^i\big)\leq u^i(\tilde x^i), \qquad \forall\,t\in[0,1],\ \forall\,i\in\mathcal{I} \tag{P.1}$$

**Par l'absurde** : si elle échouait pour un $\bar t$, la **stricte quasiconcavité** la ferait échouer pour tout $t\in(0,\bar t\,]$, et la **continuité** donnerait un entier $r$ assez grand tel que

$$u^i\left(\Big(1-\frac1r\Big)\tilde x^i+\frac1r e^i\right)>u^i(\tilde x^i)$$

*« Mais nous pouvons alors utiliser **précisément le même argument** que dans la discussion précédant la preuve pour montrer que la copie $r$ fois de $\tilde x$ n'est pas dans le cœur de $E_r$ »* — contredisant $\tilde x\in C_r$.

**Pas 2 — la condition du premier ordre.**

> *« Regardez de près (P.1). En considérant le membre de gauche comme une fonction de $t$ sur $[0,1]$, elle dit que **cette fonction atteint un maximum en $t=0$**. Parce que c'est sur **la borne inférieure** de $[0,1]$, cela implique que **la dérivée est non positive** en $t=0$. »*

$$\boxed{\;\nabla u^i(\tilde x^i)\cdot\big(e^i-\tilde x^i\big)\leq0 \qquad \forall\,i\in\mathcal{I}\;} \tag{P.2}$$

**Pas 3 — les gradients sont proportionnels.** $\tilde x$ étant dans le cœur de $E_1$, elle est **Pareto-efficace**. Avec $\tilde x\gg0$ et chaque $\nabla u^i(\tilde x^i)\gg0$, l'**exercice 5.27** donne que les gradients sont **proportionnels entre eux**, donc à un vecteur commun $\tilde p\gg0$ :

$$\nabla u^i(\tilde x^i)=\lambda^i\,\tilde p, \qquad \lambda^i>0 \tag{P.3}$$

**Pas 4 — l'inégalité budgétaire.** (P.2) + (P.3) + $\lambda^i>0$ donnent

$$\tilde p\cdot\tilde x^i\ \geq\ \tilde p\cdot e^i \qquad \forall\,i \tag{P.4}$$

**Pas 5 — l'égalité.** *« Nous serions finis si chaque inégalité de (P.4) était une égalité »* — car alors $\tilde x^i$ satisferait les **conditions du premier ordre** du problème du consommateur aux prix $\tilde p$, qui sont **suffisantes** sous nos hypothèses (**théorème 1.4**, fiche 501).

Or $\tilde x$ est **réalisable** dans $E_1$, donc $\sum_i\tilde x^i=\sum_i e^i$, donc

$$\tilde p\cdot\sum_i\tilde x^i=\tilde p\cdot\sum_i e^i$$

> *« Cependant, **cette égalité échouerait si pour ne serait-ce qu'un consommateur $i$, l'inégalité de (P.4) était stricte**. »* $\blacksquare$

> **L'argument d'agrégation du pas 5 est élégant :** des inégalités individuelles toutes dans le **même sens**, dont la somme est une **égalité**, sont nécessairement **toutes des égalités**.

## 🟠 Concept 10 — Les deux objections finales

> *« Nous avons montré que **pour des économies assez grandes, seules les WEA seront dans le cœur**. Ce résultat **étonnant** pointe vraiment vers des caractéristiques uniques des grandes économies de marché et se présente comme **une sorte de "preuve" ultime des intuitions d'Adam Smith**. **Le résultat mérite cependant un examen.** »*

### 10.1 Première objection — la rigidité du cadre

> *« Il a été obtenu dans **le contexte plutôt rigide d'économies répliques avec des nombres égaux de chaque type**. »*

**La réponse du livre :**

> *« La première de ces objections peut être — et a été — traitée. **En abandonnant le monde rigide des économies répliques au profit d'"économies à CONTINUUM" plus flexibles, Aumann (1964), Hildenbrand (1974) et d'autres ont prouvé des résultats encore plus forts sans l'hypothèse de nombres égaux de chaque type.** »*

### 10.2 Seconde objection — la faiblesse du concept de cœur

> *« Nous ne pouvons pas perdre de vue que **le cœur lui-même est un concept de solution très faible, aux propriétés d'équité discutables**. Dans la mesure où une "bonne" solution au problème de distribution du point de vue de la société inclut des considérations d'**équité**, **même l'interprétation la plus large de ce résultat ne fournit pas de soutien aux arguments en faveur du pur laissez-faire**. **L'"équité" de toute allocation du cœur, et donc de toute WEA, dépend de ce que sont les dotations initiales.** »*

**La réponse partielle, et la question qu'elle ouvre :**

> *« Si nous voulons utiliser le système de marché pour atteindre la "bonne société", **le second théorème du bien-être nous dit que nous le pouvons**. Tout ce que nous devons faire est de **décider où dans le cœur nous voulons être**, puis redistribuer les "dotations" ou le "revenu" et utiliser le marché pour "soutenir" cette distribution. »*

> *« **Ah, mais voilà le hic. Comment décidons-nous où nous voulons être ? Comment la "société" décide-t-elle quelle distribution du cœur elle "préfère" ?** C'est le genre de question que nous prenons au chapitre suivant. »*

> **C'est l'annonce du chapitre 6** (fiches 513-514) : le **théorème d'Arrow**, qui montrera qu'agréger des préférences individuelles en une préférence sociale est **beaucoup plus difficile** qu'il n'y paraît.

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « montrer qu'une WEA est dans le cœur » | **Théorème 5.6** | Par l'absurde : sommer les inégalités du lemme 5.2 sur la coalition |
| « montrer qu'une WEA est efficace » | **Premier théorème** | Corollaire immédiat de 5.6 |
| Une allocation efficace + « peut-on l'atteindre ? » | **Second théorème** | Redistribuer les dotations à $\bar x$ — ou à tout $e^*$ sur la droite de prix |
| « la redistribution doit-elle porter sur les biens ? » | **Corollaire 5.1** | Non : seule la **valeur** $\bar p\cdot e^{*i}=\bar p\cdot\bar x^i$ compte |
| $r$ consommateurs de chaque type | **Économie réplique** | Vérifier d'abord le **traitement égal** |
| « tous les consommateurs d'un type ont-ils le même panier ? » | **Théorème 5.16** | Moyenne + coalition des plus mal lotis |
| « le cœur rétrécit-il ? » | **Lemme 5.3** | Toute coalition de $E_{r-1}$ survit dans $E_r$ |
| « quelles allocations restent dans le cœur à la limite ? » | **Théorème 5.17** | Uniquement les **WEA** |
| Une allocation du cœur non walrasienne | **Blocage par coalition déséquilibrée** | $r$ d'un type contre $r-1$ de l'autre |

**Les trois réflexes de cadrage :**

1. **Distinguer efficacité et optimalité sociale.** L'efficacité de Pareto est **nécessaire**, jamais **suffisante**.
2. **Dans une réplique, invoquer le traitement égal d'abord.** Il réduit une allocation de $rI$ paniers à $I$ paniers.
3. **Une coalition bloquante est presque toujours déséquilibrée.** C'est le déséquilibre qui permet de capter le gain.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Démontrer $W(e)\subset C(e)$

1. Supposer par l'absurde qu'une WEA $x(p^*)$ est **bloquée** par $S$ via $y$.
2. Écrire la faisabilité de $y$ pour $S$ : $\sum_{i\in S}y^i=\sum_{i\in S}e^i$, puis **la valoriser** aux prix $p^*$.
3. Pour chaque $i\in S$, appliquer le **lemme 5.2** : $p^*\cdot y^i\geq p^*\cdot x^i=p^*\cdot e^i$, **avec au moins une stricte**.
4. **Sommer** ⟹ inégalité **stricte** ⟹ contradiction.

### Méthode 2 — Appliquer le second théorème du bien-être

1. **Vérifier** que $\bar x$ est Pareto-efficace, que $\sum_i e^i\gg0$ et l'hypothèse 5.1.
2. **Redistribuer** les dotations à $\bar x$ ; le théorème 5.5 donne une WEA $\hat x$ de la nouvelle économie.
3. Montrer $u^i(\hat x^i)\geq u^i(\bar x^i)$ — **la nouvelle dotation est toujours abordable**.
4. Montrer $\hat x$ **réalisable** dans l'économie originale ⟹ l'efficacité de $\bar x$ force l'**égalité**.
5. Conclure $\hat x^i=\bar x^i$ par **stricte quasiconcavité** (sinon la moyenne ferait mieux).
6. **Généraliser par le corollaire 5.1** : redistribuer à n'importe quel $e^*$ de même **valeur**.

### Méthode 3 — Démontrer le traitement égal

1. Supposer deux consommateurs du **même type** avec des paniers **distincts**.
2. Par **complétude**, identifier **le plus mal loti** de chaque type.
3. Donner à chacun de ces plus mal lotis **la moyenne des paniers de son type**.
4. La **stricte convexité** rend au moins l'un d'eux **strictement** mieux loti.
5. Vérifier la **faisabilité** : la somme des moyennes égale exactement les dotations de la coalition.
6. Conclure au **blocage**, donc à la contradiction.

### Méthode 4 — Bloquer une allocation non walrasienne

1. **Identifier le type avantagé** : celui dont le TMS diffère du prix implicite dans le bon sens.
2. **Construire $\hat x$** sur la corde entre $e$ et $\tilde x$, sous la forme $\hat x^1=\tfrac1r e^1+\tfrac{r-1}{r}\tilde x^1$.
3. **Choisir la coalition déséquilibrée** : les $r$ consommateurs du type avantagé, $r-1$ de l'autre.
4. **Vérifier la faisabilité** : la somme doit valoir $r\,e^1+(r-1)\,e^2$.
5. Conclure au blocage.

### Méthode 5 — La preuve générale du théorème 5.17

1. Établir $u^i\big((1-t)\tilde x^i+te^i\big)\leq u^i(\tilde x^i)$ pour tout $t\in[0,1]$ — **par l'absurde**, via la méthode 4.
2. La fonction de $t$ atteignant son maximum **en $t=0$** (borne **inférieure**), sa dérivée y est **$\leq0$** : $$\nabla u^i(\tilde x^i)\cdot(e^i-\tilde x^i)\leq0$$
3. $\tilde x$ étant **Pareto-efficace** et $\gg0$, les gradients sont **proportionnels** à un $\tilde p\gg0$ commun.
4. En déduire $\tilde p\cdot\tilde x^i\geq\tilde p\cdot e^i$ pour tout $i$.
5. **Agréger** : la réalisabilité force $\sum_i\tilde p\cdot\tilde x^i=\sum_i\tilde p\cdot e^i$, donc **toutes les inégalités sont des égalités**.
6. Conclure par le **théorème 1.4** (les conditions du premier ordre sont **suffisantes**).

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que la WEA est **unique** | *« évitez de glisser vers la croyance que les équilibres walrasiens sont "habituellement" uniques »* | Fig. 5.5 en donne un contre-exemple |
| 2 | Croire que le lemme 5.2 exige l'équilibre | Il vaut à **n'importe quels** prix — c'est une propriété de la **maximisation** | Le livre le souligne explicitement |
| 3 | Oublier le « au moins une stricte » dans la preuve du thm 5.6 | Sans elle, la somme donnerait $\geq$ et non $>$ — **pas de contradiction** | C'est le pivot de la preuve |
| 4 | Oublier que $p^*\cdot x^i=p^*\cdot e^i$ à l'équilibre | C'est la **saturation** du budget | Elle transforme le lemme 5.2 en comparaison aux **dotations** |
| 5 | Croire que $C(e)\subset W(e)$ | **L'inclusion est dans l'autre sens** : $W(e)\subset C(e)$ | L'égalité n'apparaît qu'**à la limite** (thm 5.17) |
| 6 | Conclure du premier théorème que le marché est « socialement optimal » | *« Rien ne devrait nous faire croire cela »* si l'on inclut l'**équité** | Nécessaire, pas suffisant |
| 7 | Croire que toute allocation efficace est également juste | *« **peu pourraient argumenter cela de façon persuasive** »* | Fig. 5.6 : $x'$ efficace mais $\neq\bar x$ socialement voulue |
| 8 | Dans le second théorème, oublier de **redistribuer** les dotations | Le théorème porte sur l'économie $(u^i,\bar x^i)$, **pas** $(u^i,e^i)$ | C'est toute la substance du résultat |
| 9 | Oublier pourquoi $u^i(\hat x^i)\geq u^i(\bar x^i)$ | Parce que $\bar x^i$ **est la dotation**, donc toujours **abordable** | Un maximiseur ne peut pas faire moins bien |
| 10 | Oublier le pas final du second théorème | De $u^i(\hat x^i)=u^i(\bar x^i)$ à $\hat x^i=\bar x^i$ il faut la **stricte quasiconcavité** | Sinon la moyenne ferait strictement mieux |
| 11 | Croire qu'il faut redistribuer les **biens** | Le corollaire 5.1 : seule la **valeur** $\bar p\cdot e^{*i}$ compte | Transferts **forfaitaires** suffisent |
| 12 | Dans une réplique, oublier que les dotations sont **identiques au sein d'un type** | C'est ce qui rend le calcul de la moyenne exact | Déf. 5.10 |
| 13 | Dans le thm 5.16, prendre les **mieux** lotis | Ce sont **les plus MAL lotis** qui bloquent | Ils gagnent à la moyenne |
| 14 | Croire que le théorème 5.16 est décoratif | **Sans lui**, on ne pourrait pas suivre le cœur dans $E_1$ | Il résout le problème de dimensionnalité |
| 15 | Croire que le cœur rétrécit parce qu'il y a plus de biens | Il rétrécit parce qu'il y a **plus de coalitions** | Lemme 5.3 |
| 16 | Croire que l'ensemble des WEA rétrécit aussi | **Non** — le lemme 5.4 dit qu'il reste **constant** | Ce sont les copies des WEA de $E_1$ |
| 17 | Utiliser une coalition **équilibrée** pour bloquer | Elle ne peut pas faire mieux que le cœur de $E_1$ | Il faut $r$ contre $r-1$ |
| 18 | Ne pas voir pourquoi la forme $\tfrac1r e^1+\tfrac{r-1}{r}\tilde x^1$ | Ces coefficients sont **exactement** ceux qui rendent la coalition faisable | Choix en vue de la conclusion |
| 19 | Dans le pas 2 de la preuve générale, écrire $=0$ | Le maximum est à la **borne inférieure** de $[0,1]$ ⟹ dérivée **$\leq0$** | Même situation qu'au §3.2 de la fiche 505 |
| 20 | Croire que le théorème 5.17 valide le laissez-faire | *« même l'interprétation la plus large ne fournit pas de soutien »* | L'équité dépend des **dotations initiales** |

## 📌 Ultimate Review

**§5.2.2 — l'efficacité.**

**DÉF. 5.6** : $x(p^*)=\big(x^1(p^*,p^*\cdot e^1),\dots\big)$ est une **WEA**. **DÉF. 5.7** : $W(e)$ en est l'ensemble — **pas un singleton**.

**LEMME 5.1** : toute WEA est **réalisable**. **LEMME 5.2** : $u^i(x^i)>u^i(\hat x^i)\Rightarrow p\cdot x^i>p\cdot\hat x^i$, et la version large. *« Ce qui est préféré au panier choisi est trop cher. »* Vrai à **n'importe quels** prix.

**THÉORÈME 5.6** :

$$\boxed{\;W(e)\subset C(e)\;}$$

*Preuve : si $S$ bloque via $y$, la faisabilité donne $\sum_S p^*y^i=\sum_S p^*e^i$ ; le lemme 5.2 donne $p^*y^i\geq p^*x^i=p^*e^i$ avec **une stricte** ; sommer ⟹ contradiction.*

**La portée :** le marché atteint le cœur **sans planificateur central** — *« personne n'a besoin de direction ou de conseil de qui que ce soit »*.

**THÉORÈME 5.7 — premier théorème du bien-être** : toute WEA est **Pareto-efficace**.

⚠️ **Ses limites** : *« rien ne devrait nous faire croire que les WEA sont nécessairement socialement optimales si l'on inclut l'équité ou la justice »*.

$$\text{efficacité de Pareto} = \text{NÉCESSAIRE, jamais SUFFISANTE}$$

**THÉORÈME 5.8 — second théorème du bien-être** : si $\bar x$ est Pareto-efficace et qu'on **redistribue les dotations à $\bar x$**, alors $\bar x$ est une **WEA** de l'économie résultante.

*Preuve : thm 5.5 donne une WEA $\hat x$ ; $u^i(\hat x^i)\geq u^i(\bar x^i)$ car $\bar x^i$ est la dotation ; $\hat x$ réalisable dans l'économie originale + efficacité de $\bar x$ ⟹ **égalité** ; stricte quasiconcavité ⟹ $\hat x^i=\bar x^i$.*

**COROLLAIRE 5.1** : il suffit de redistribuer à tout $e^*$ tel que $\bar p\cdot e^{*i}=\bar p\cdot\bar x^i$ — **seule la valeur compte**.

Les prix $\bar p$ **soutiennent** l'allocation $\bar x$.

**§5.5 — le cœur et les équilibres.**

**DÉF. 5.10** : $E_r$ = $I$ **types**, $r$ consommateurs de chaque type, **préférences et dotations identiques** au sein d'un type.

$$\sum_{i}\sum_{q=1}^r x^{iq}=r\sum_i e^i \tag{5.9}$$

**THÉORÈME 5.16 — traitement égal** : dans le cœur de $E_r$, **tous les consommateurs d'un type reçoivent le même panier**.

*Preuve : prendre les **plus mal lotis** de chaque type, leur donner **la moyenne** des paniers de leur type. Stricte convexité ⟹ l'un strictement mieux ; l'arithmétique ⟹ exactement faisable ⟹ **blocage**.*

**Conséquence** : une allocation du cœur de $E_r$ est la **copie $r$ fois** d'une allocation de $E_1$ ⟹ on définit

$$C_r=\Big\{x\in F(e) \ \Big|\ \text{sa copie } r \text{ fois est dans le cœur de } E_r\Big\}$$

**LEMME 5.3** : $C_1\supseteq C_2\supseteq\dots$ — **le cœur rétrécit** *(toute coalition de $E_{r-1}$ survit dans $E_r$)*. **LEMME 5.4** : les WEA de $E_r$ sont **exactement** les copies $r$ fois des WEA de $E_1$ — **l'ensemble reste constant**.

$$C_1\supseteq C_2\supseteq\dots\supseteq W_1(e)$$

**THÉORÈME 5.17 — Edgeworth-Debreu-Scarf** :

$$\boxed{\;x\in C_r \text{ pour tout } r \ \Longrightarrow\ x \text{ est une WEA de } E_1\;}$$

*Argument à deux types : $\tilde x$ non walrasienne ⟹ les TMS ne coïncident pas avec les prix implicites ⟹ il existe $\hat x^1=\tfrac1r e^1+\tfrac{r-1}{r}\tilde x^1\succ^1\tilde x^1$ ⟹ la coalition **déséquilibrée** ($r$ type 1, $r-1$ type 2) est faisable et bloque.*

*Preuve générale : (P.1) $u^i\big((1-t)\tilde x^i+te^i\big)\leq u^i(\tilde x^i)$ ⟹ dérivée $\leq0$ en $t=0$ ⟹ $\nabla u^i(\tilde x^i)\cdot(e^i-\tilde x^i)\leq0$ ⟹ gradients **proportionnels** (efficacité) ⟹ $\tilde p\cdot\tilde x^i\geq\tilde p\cdot e^i$ ⟹ l'**agrégation** force l'égalité ⟹ **théorème 1.4**.*

**Les deux objections finales.**

| # | Objection | Réponse du livre |
|---|---|---|
| 1 | Cadre **rigide** des répliques | Levée : **Aumann (1964)**, **Hildenbrand (1974)**, économies à **continuum** |
| 2 | Le cœur est un concept **faible**, sans équité | *« même l'interprétation la plus large ne fournit pas de soutien au laissez-faire pur »* — l'équité dépend des **dotations initiales** |

> *« **Ah, mais voilà le hic. Comment décidons-nous où nous voulons être ?** C'est le genre de question que nous prenons au chapitre suivant. »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Que révèle la figure 5.4 sur l'équilibre walrasien ?**

</summary>

Trois choses :

1. Les offres et demandes ne dépendent que des **prix relatifs**.
2. L'équilibre est **la compatibilité simultanée d'actions décentralisées et indépendantes**.
3. L'allocation atteinte est **dans la lentille** ET **sur la courbe des contrats** — donc **dans le cœur**.

> *« Malgré le fait que les consommateurs n'ont besoin d'aucune connaissance des préférences ou dotations des autres, **l'allocation résultant des prix walrasiens est dans le cœur**. »*

</details>

<details class="details--riche">
<summary>

**2. Les WEA sont-elles uniques ?**

</summary>

⚠️ **Non.**

> *« Même dans l'économie à deux personnes, **il est facile de construire des exemples où les préférences satisfont des propriétés très ordinaires et où plusieurs WEA existent**. Il semble donc prudent d'**éviter de glisser vers la croyance que les équilibres walrasiens sont "habituellement" uniques**. »*

C'est pourquoi le livre n'a traité que l'**existence** (fiche 510).

</details>

<details class="details--riche">
<summary>

**3. Énoncer le lemme 5.2 et le lire en une phrase.**

</summary>

Si $u^i$ est strictement croissante et $\hat x^i$ est la demande en $p$ : **(i)** $u^i(x^i)>u^i(\hat x^i)\Rightarrow p\cdot x^i>p\cdot\hat x^i$ ; **(ii)** $u^i(x^i)\geq u^i(\hat x^i)\Rightarrow p\cdot x^i\geq p\cdot\hat x^i$.

**En une phrase :** *« ce qui est **préféré** au panier choisi doit être **trop cher** »*.

⚠️ **Ceci vaut même si $p$ n'est pas un équilibre** — c'est une propriété de la **maximisation sous contrainte**.

</details>

<details class="details--riche">
<summary>

**4. Démontrer le théorème 5.6.**

</summary>

Par l'absurde : $x(p^*)$ est une WEA bloquée par $S$ via $y$.

1. **Faisabilité pour $S$** : $\sum_{i\in S}y^i=\sum_{i\in S}e^i$, donc $\sum_{i\in S}p^*\cdot y^i=\sum_{i\in S}p^*\cdot e^i$ (P.3).
2. **Lemme 5.2** appliqué à chaque $i\in S$ : $p^*\cdot y^i\geq p^*\cdot x^i=p^*\cdot e^i$, **avec au moins une stricte**.
3. **Sommer** : $\sum_{i\in S}p^*\cdot y^i>\sum_{i\in S}p^*\cdot e^i$ — **contredit (P.3)**. $\blacksquare$

**En une phrase :** une coalition qui bloquerait devrait s'offrir un panier **strictement plus cher que ses dotations** — impossible.

</details>

<details class="details--riche">
<summary>

**5. Que peut-on déduire du théorème 5.6 sur la non-vacuité du cœur ?**

</summary>

Sous les conditions du **théorème 5.5** (hypothèse 5.1 + $\sum_i e^i\gg0$), une WEA **existe**, et par le théorème 5.6 elle est **dans le cœur**. Donc

$$C(e)\neq\varnothing$$

</details>

<details class="details--riche">
<summary>

**6. Quelle est la portée du théorème 5.6, selon le livre ?**

</summary>

> *« Nous avons montré qu'**il est possible d'atteindre des issues dans le cœur SANS l'aide d'un planificateur central**. **Personne dans notre économie concurrentielle n'a besoin de direction ou de conseil de qui que ce soit.** Chaque consommateur **observe simplement les prix**. En ce sens, **le mécanisme de marché concurrentiel est DÉCENTRALISÉ**. »*

Contraste avec le troc, qui exigerait *« une coordination complète »* et *« l'aide d'une autorité centrale »*.

</details>

<details class="details--riche">
<summary>

**7. Énoncer le premier théorème du bien-être et le mettre en perspective.**

</summary>

**Toute WEA est Pareto-efficace** — corollaire immédiat du théorème 5.6.

> *« Imaginez qu'on vous charge d'allouer toutes les ressources de sorte que l'allocation soit Pareto-efficace [et que chacun soit au moins aussi bien loti qu'avec sa dotation]. Vous commenceriez par **rassembler l'information sur les préférences de tous** — **quelle tâche ce serait !** […] **Aussi incroyablement difficile que soit cette tâche, le mécanisme de marché l'accomplit — et davantage.** »*

</details>

<details class="details--riche">
<summary>

**8. Quelles sont les limites du premier théorème du bien-être ?**

</summary>

> *« **Il est tout aussi important d'en réaliser les LIMITES et de résister à la tentation d'y lire plus qu'il n'est justifié.** Rien ne devrait nous faire croire que les WEA sont nécessairement "socialement optimales" si l'on inclut quelque considération pour l'**équité** ou la **justice**. »*

| Affirmation | Statut |
|---|---|
| Une allocation inefficace n'est **pas candidate** | consensuel |
| **Chaque** allocation efficace est également juste | *« peu pourraient l'argumenter »* |

$$\text{efficacité} = \text{condition NÉCESSAIRE, jamais SUFFISANTE}$$

</details>

<details class="details--riche">
<summary>

**9. Que montre la figure 5.6 ?**

</summary>

La société a identifié $\bar x$ comme socialement meilleure, mais les dotations sont $e$. Le marché atteint une allocation $x'\in C(e)$, **distincte de $\bar x$**.

> *« Bien que les systèmes de marché puissent améliorer une distribution initiale qui n'est pas Pareto-efficace, **il n'y a AUCUNE assurance qu'un système concurrentiel, à lui seul, mène à une distribution que la société considère comme la meilleure**. »*

</details>

<details class="details--riche">
<summary>

**10. Énoncer le second théorème du bien-être.**

</summary>

Sous l'hypothèse 5.1 et $\sum_i e^i\gg0$ : si $\bar x$ est **Pareto-efficace** et qu'on **redistribue les dotations à $\bar x$**, alors **$\bar x$ est une WEA de l'économie résultante** $(u^i,\bar x^i)$.

**La question qu'il renverse :** *« Si nous pouvons déterminer l'allocation que nous voudrions voir, **la puissance d'un système de marché décentralisé peut-elle être utilisée pour l'atteindre ?** »*

</details>

<details class="details--riche">
<summary>

**11. Dérouler la preuve du second théorème.**

</summary>

1. $\bar x$ efficace ⟹ réalisable ⟹ $\sum_i\bar x^i=\sum_i e^i\gg0$ ⟹ **thm 5.5** : une WEA $\hat x$ existe.
2. $\hat x^i$ maximise sous le budget de dotation $\bar x^i$, et **$\bar x^i$ est toujours abordable** ⟹ $u^i(\hat x^i)\geq u^i(\bar x^i)$ (P.1).
3. $\hat x$ est **réalisable dans l'économie originale** ($\sum_i\hat x^i=\sum_i\bar x^i=\sum_i e^i$).
4. $\bar x$ étant **Pareto-efficace**, $\hat x$ ne peut rendre personne **strictement** mieux loti ⟹ **toutes les inégalités de (P.1) sont des égalités**.
5. Si $\hat x^i\neq\bar x^i$ pour un $i$, il pourrait s'offrir **la moyenne** et faire strictement mieux (**stricte quasiconcavité**) — contradiction. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**12. Qu'est-ce qu'un prix de soutien ?**

</summary>

> *« Bien que nous n'ayons pas explicitement mentionné les prix, **ils sont là en arrière-plan**. Il existe $\bar p$ tel que, quand la dotation est $\bar x$, **chaque consommateur maximise $u^i$ sous $\bar p\cdot x^i\leq\bar p\cdot\bar x^i$ en choisissant $x^i=\bar x^i$**. Pour cette raison, $\bar p$ est dit **SOUTENIR** l'allocation $\bar x$. »*

</details>

<details class="details--riche">
<summary>

**13. Énoncer le corollaire 5.1 et sa portée pratique.**

</summary>

$\bar x$ est une WEA après redistribution à **n'importe quelle** $e^*\in F(e)$ telle que

$$\bar p\cdot e^{*i}=\bar p\cdot\bar x^i \qquad \forall\,i$$

**La portée :** **seule la VALEUR de la dotation compte**, pas sa composition. Le planificateur n'a **pas besoin de redistribuer les biens** — il lui suffit de redistribuer du **pouvoir d'achat** par transferts **forfaitaires**.

⚠️ **C'est le fondement de la séparation « efficacité / équité »** — et sa difficulté pratique est que les transferts vraiment forfaitaires sont presque impossibles à mettre en œuvre.

</details>

<details class="details--riche">
<summary>

**14. Quelle comparaison le §5.5 propose-t-il entre planification et marché ?**

</summary>

> *« **Si l'objectif de la planification est d'identifier et d'implémenter une distribution dans le cœur, et s'il n'y a pas d'autres allocations dans le cœur que celles qu'un marché choisirait, pourquoi se donner la peine (et le coût) de planifier ?** »*

> *« Pour trouver le cœur, un planificateur a besoin d'information sur les préférences, et les consommateurs ont des **incitations égoïstes à ne pas la révéler honnêtement**. **Le marché n'a besoin de rien savoir des préférences, et dépend en fait de l'égoïsme des consommateurs. Ce qui est un vice dans un cas est une sorte de vertu dans l'autre.** »*

</details>

<details class="details--riche">
<summary>

**15. Définir une économie réplique.**

</summary>

$E_r$ : **$I$ types** de consommateurs, **$r$ consommateurs de chaque type**, soit $rI$ au total. Au sein d'un type, **mêmes préférences ET mêmes dotations** $e^i\gg0$.

**Ce qui définit un type :** *« Deux consommateurs avec des **préférences différentes** mais les mêmes dotations sont de types différents. **De même** pour deux consommateurs aux mêmes préférences mais **dotations différentes**. »*

> *« En comparant deux répliques, nous pouvons dire **sans ambiguïté laquelle est la plus grande**. »*

</details>

<details class="details--riche">
<summary>

**16. Énoncer le théorème 5.16.**

</summary>

Dans le cœur de $E_r$, **tous les consommateurs d'un même type reçoivent le même panier** :

$$x^{iq}=x^{iq'} \qquad \forall\,q,q'$$

> *« Ce théorème au **nom délicieusement démocratique** identifie une propriété cruciale. »*

</details>

<details class="details--riche">
<summary>

**17. Dérouler la preuve du traitement égal.**

</summary>

Supposons $x^{11}\neq x^{12}$ dans le cœur de $E_2$.

1. Par **complétude**, ordonner : $x^{11}\succsim^1 x^{12}$ et $x^{21}\succsim^2 x^{22}$ ⟹ les consommateurs $12$ et $22$ sont **les plus mal lotis** de leur type.
2. Poser $\bar x^{12}=\tfrac12(x^{11}+x^{12})$ et $\bar x^{22}=\tfrac12(x^{21}+x^{22})$.
3. Par **stricte convexité** : $\bar x^{12}\succ^1 x^{12}$ (**strict**, car les paniers sont distincts) et $\bar x^{22}\succsim^2 x^{22}$.
4. **Faisabilité** : $\bar x^{12}+\bar x^{22}=\tfrac12\big(x^{11}+x^{12}+x^{21}+x^{22}\big)=\tfrac12(2e^1+2e^2)=e^1+e^2$
5. $S=\{12,22\}$ **bloque** ⟹ contradiction. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**18. Pourquoi le traitement égal est-il indispensable à la suite ?**

</summary>

Parce qu'il résout le **problème de dimensionnalité** : sans lui, une allocation de $E_r$ vit dans un espace de dimension $rIn$, et l'on ne pourrait pas comparer les cœurs de $E_1$, $E_2$, …

Avec lui, une allocation du cœur de $E_r$ est la **copie $r$ fois** d'une allocation de $E_1$, elle-même **réalisable** dans $E_1$ *(diviser (5.9) par $r$)*. On peut donc **suivre le cœur dans $E_1$**.

</details>

<details class="details--riche">
<summary>

**19. Définir $C_r$ et énoncer le lemme 5.3.**

</summary>

$$C_r=\Big\{x\in F(e) \ \Big|\ \text{la copie } r \text{ fois de } x \text{ est dans le cœur de } E_r\Big\}$$

**LEMME 5.3** : $C_1\supseteq C_2\supseteq\dots$ — **la suite décroît**.

**La preuve, en une phrase** : *« **toute coalition qui bloquerait la copie $(r-1)$ fois dans $E_{r-1}$ pourrait aussi bloquer la copie $r$ fois dans $E_r$** — tous ses membres sont présents dans $E_r$, et leurs dotations n'ont pas changé. »*

**Répliquer n'enlève aucune coalition — il en ajoute.**

</details>

<details class="details--riche">
<summary>

**20. Que dit le lemme 5.4, et pourquoi est-ce important ?**

</summary>

Les WEA de $E_r$ sont **exactement** les copies $r$ fois des WEA de $E_1$.

> *« L'ensemble des équilibres walrasiens **reste "CONSTANT"** au sens où il consiste **purement en copies des équilibres de l'économie de base**. »*

**Pourquoi c'est important :** on a donc

$$C_1\supseteq C_2\supseteq\dots\supseteq W_1(e)$$

⚠️ **Le cœur rétrécit ; les WEA ne bougent pas.** C'est ce qui rend la convergence possible.

</details>

<details class="details--riche">
<summary>

**21. Décrire le blocage d'une allocation non walrasienne dans $E_2$.**

</summary>

Soit $\tilde x$ dans le cœur de $E_1$ mais **non walrasienne**, sur la courbe d'indifférence de $11$ passant par sa dotation.

**La coalition** $S=\{11,12,21\}$ — **les deux type 1 et UN SEUL type 2**.

| Membre | Panier | Comparaison |
|---|---|---|
| $11$, $12$ | $\bar x^{1}=\tfrac12(e^1+\tilde x^{1})$ | $\succ^1\tilde x^1$ (**stricte convexité**) |
| $21$ | $\tilde x^{21}$ | $\sim^2$ |

**Faisabilité :** $2\bar x^1+\tilde x^{21}=e^1+\tilde x^{11}+\tilde x^{21}=e^1+(e^1+e^2)=2e^1+e^2$

⚠️ **La clé est le déséquilibre** : deux type 1 pour un seul type 2.

</details>

<details class="details--riche">
<summary>

**22. Énoncer le théorème 5.17.**

</summary>

**(Edgeworth-Debreu-Scarf)** Si $x\in C_r$ **pour tout** $r=1,2,\dots$, alors **$x$ est une WEA de $E_1$**.

$$\bigcap_{r\geq1}C_r=W_1(e)$$

**Le cœur rétrécit exactement jusqu'à l'ensemble des allocations walrasiennes.**

</details>

<details class="details--riche">
<summary>

**23. Dérouler l'argument à deux types du théorème 5.17.**

</summary>

1. $\tilde x$ non walrasienne ⟹ les **TMS** ne coïncident pas avec les prix implicites de la droite $e\tilde x$ : soit $p_1/p_2>\text{TMS}^1_{12}$, soit $p_2/p_1>\text{TMS}^2_{12}$.
2. La droite **coupe** l'indifférence du type 1 en $A$ et reste **au-dessus** entre $A$ et $\tilde x$ ⟹ il existe $\hat x\succ^1\tilde x^1$.
3. **Paramétrer** : $\hat x^1=\tfrac1r e^1+\tfrac{r-1}{r}\tilde x^1$, $r$ entier.
4. **Coalition** : les $r$ type 1 et $r-1$ type 2.
5. **Faisabilité** : $r\hat x^1+(r-1)\tilde x^2=e^1+(r-1)(\tilde x^1+\tilde x^2)=e^1+(r-1)(e^1+e^2)=re^1+(r-1)e^2$
6. $S$ **bloque** ⟹ $\tilde x\notin C_r$ ⟹ contradiction. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**24. Pourquoi la paramétrisation $\tfrac1r e^1+\tfrac{r-1}{r}\tilde x^1$ ?**

</summary>

Parce que ce sont **exactement** les coefficients qui rendent la coalition faisable :

$$r\hat x^1=r\left[\tfrac1r e^1+\tfrac{r-1}{r}\tilde x^1\right]=e^1+(r-1)\tilde x^1$$

Le facteur $r$ **annule** le $\tfrac1r$, et l'on retrouve $e^1$ — exactement la dotation « en trop » de la coalition déséquilibrée.

⚠️ C'est un **choix de paramétrisation en vue de la conclusion**, pas une contrainte du problème.

</details>

<details class="details--riche">
<summary>

**25. Pourquoi le cœur rétrécit-il quand $r$ augmente ?**

</summary>

Parce que plus $r$ est grand, plus la coalition peut être **finement déséquilibrée** ($r$ contre $r-1$), donc plus le point $\hat x$ peut être **proche de $\tilde x$** — donc plus le blocage est facile.

Formellement : plus de consommateurs ⟹ **plus de coalitions possibles** ⟹ plus de bloqueurs (lemme 5.3).

</details>

<details class="details--riche">
<summary>

**26. Quelle est l'inégalité fondamentale de la preuve générale du théorème 5.17 ?**

</summary>

$$u^i\big((1-t)\tilde x^i+t\,e^i\big)\leq u^i(\tilde x^i), \qquad \forall\,t\in[0,1],\ \forall\,i \tag{P.1}$$

**Par l'absurde** : si elle échouait pour un $\bar t$, la **stricte quasiconcavité** la ferait échouer sur tout $(0,\bar t\,]$, et la **continuité** donnerait un $r$ entier assez grand pour appliquer l'argument de blocage ⟹ contradiction avec $\tilde x\in C_r$.

</details>

<details class="details--riche">
<summary>

**27. Comment passe-t-on de (P.1) à la condition sur le gradient ?**

</summary>

Vue comme fonction de $t$ sur $[0,1]$, (P.1) dit que la fonction atteint son **maximum en $t=0$**.

> *« Parce que c'est sur **la borne inférieure** de $[0,1]$, cela implique que **la dérivée est non positive** en $t=0$. »*

$$\nabla u^i(\tilde x^i)\cdot\big(e^i-\tilde x^i\big)\leq0 \tag{P.2}$$

⚠️ **$\leq0$, pas $=0$** — même situation qu'au §3.2 de la fiche 505.

</details>

<details class="details--riche">
<summary>

**28. Comment conclut-on la preuve générale ?**

</summary>

1. $\tilde x$ étant dans le cœur de $E_1$, elle est **Pareto-efficace** ; avec $\tilde x\gg0$ et gradients $\gg0$, ils sont **proportionnels** à un $\tilde p\gg0$ commun : $\nabla u^i(\tilde x^i)=\lambda^i\tilde p$, $\lambda^i>0$ (P.3).
2. (P.2)+(P.3) ⟹ $\tilde p\cdot\tilde x^i\geq\tilde p\cdot e^i$ pour tout $i$ (P.4).
3. La **réalisabilité** donne $\tilde p\cdot\sum_i\tilde x^i=\tilde p\cdot\sum_i e^i$ — cette égalité **échouerait si une seule inégalité de (P.4) était stricte**.
4. Donc **toutes sont des égalités** ⟹ $\tilde x^i$ satisfait les conditions du premier ordre, **suffisantes** par le **théorème 1.4**. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**29. Quelles sont les deux objections finales, et comment le livre y répond-il ?**

</summary>

| Objection | Réponse |
|---|---|
| Le cadre des **répliques** est rigide (nombres égaux de chaque type) | **Levée** : **Aumann (1964)**, **Hildenbrand (1974)** — économies à **continuum**, résultats **plus forts** sans cette hypothèse |
| Le **cœur** est un concept faible, **sans propriété d'équité** | *« même l'interprétation la plus large de ce résultat **ne fournit pas de soutien aux arguments en faveur du pur laissez-faire** »* |

> *« L'**équité** de toute allocation du cœur, et donc de toute WEA, **dépend de ce que sont les dotations initiales**. »*

</details>

<details class="details--riche">
<summary>

**30. Sur quoi le chapitre 5 se conclut-il ?**

</summary>

> *« Si nous voulons utiliser le marché pour atteindre la "bonne société", **le second théorème du bien-être nous dit que nous le pouvons**. Tout ce que nous devons faire est de **décider où dans le cœur nous voulons être**, puis redistribuer et laisser le marché "soutenir" cette distribution. »*

> *« **Ah, mais voilà le hic. Comment décidons-nous où nous voulons être ? Comment la "société" décide-t-elle quelle distribution elle "préfère" ?** C'est le genre de question que nous prenons au chapitre suivant. »*

**C'est l'annonce du théorème d'Arrow** (fiche 513).

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Ce que révèle la Fig. 5.4 sur l'allocation d'équilibre ? | Elle est **dans la lentille** ET **sur la courbe des contrats** — donc dans le **cœur** |
| Les WEA sont-elles uniques ? | **Non** — *« évitez de croire qu'elles sont "habituellement" uniques »* |
| Définition 5.6 ? | La **WEA** $x(p^*)$ : ce que chacun demande aux prix d'équilibre |
| Lemme 5.1 ? | Toute WEA est **réalisable** |
| Lemme 5.2, en une phrase ? | *« Ce qui est **préféré** au panier choisi est **trop cher** »* |
| Le lemme 5.2 exige-t-il l'équilibre ? | **Non** — il vaut à **n'importe quels** prix |
| Théorème 5.6 ? | $W(e)\subset C(e)$ — **toute WEA est dans le cœur** |
| Le pivot de sa preuve ? | Sommer $p^*y^i\geq p^*e^i$ avec **au moins une stricte** ⟹ contradiction |
| Ce qui rend $p^*x^i=p^*e^i$ ? | La **saturation** du budget à l'équilibre |
| Corollaire du thm 5.6 + thm 5.5 ? | Le **cœur est non vide** |
| La portée du théorème 5.6 ? | Le marché atteint le cœur **sans planificateur central** |
| Que doit connaître chaque agent ? | **Uniquement les prix** |
| Théorème 5.7 ? | **Premier théorème du bien-être** : toute WEA est **Pareto-efficace** |
| Sa limite fondamentale ? | Efficacité = **nécessaire**, jamais **suffisante** pour l'optimalité sociale |
| L'affirmation que « peu pourraient argumenter » ? | Que **chaque** allocation efficace serait également **juste** |
| Ce que montre la Fig. 5.6 ? | Le marché atteint $x'$, **distincte** de l'allocation $\bar x$ socialement voulue |
| Théorème 5.8 ? | **Second théorème** : redistribuer à $\bar x$ en fait une **WEA** |
| La question qu'il renverse ? | *« Si nous savons ce que nous voulons, **le marché peut-il l'atteindre ?** »* |
| Pourquoi $u^i(\hat x^i)\geq u^i(\bar x^i)$ ? | Parce que $\bar x^i$ **est la dotation** — toujours abordable |
| Le pas final de sa preuve ? | **Stricte quasiconcavité** : sinon la **moyenne** ferait strictement mieux |
| Que signifie « prix de soutien » ? | $\bar p$ tel que chacun **choisit** $\bar x^i$ face à son budget |
| Corollaire 5.1 ? | Redistribuer à tout $e^*$ tel que $\bar p\cdot e^{*i}=\bar p\cdot\bar x^i$ |
| Sa portée pratique ? | **Seule la VALEUR compte** — transferts **forfaitaires** suffisent |
| Le paradoxe planification / marché du §5.5 ? | *« Ce qui est un **vice** dans un cas est une sorte de **vertu** dans l'autre »* |
| Ce qui définit un « type » ? | Les **préférences** **et** les **dotations** |
| Définition 5.10 ? | $E_r$ : $I$ types, **$r$ consommateurs de chaque type**, identiques au sein d'un type |
| La condition de réalisabilité dans $E_r$ ? | $\sum_i\sum_q x^{iq}=r\sum_i e^i$ |
| Théorème 5.16 ? | **Traitement égal** : même type ⟹ **même panier** |
| Qui bloque dans sa preuve ? | Les **plus MAL lotis** de chaque type |
| Que leur donne-t-on ? | La **moyenne** des paniers de leur type |
| Quelle hypothèse rend la moyenne strictement meilleure ? | La **stricte convexité** |
| Pourquoi le thm 5.16 est-il indispensable ? | Il résout le problème de **dimensionnalité** — on suit le cœur dans $E_1$ |
| Définition de $C_r$ ? | Les allocations de $E_1$ dont la **copie $r$ fois** est dans le cœur de $E_r$ |
| Lemme 5.3 ? | $C_1\supseteq C_2\supseteq\dots$ — **le cœur rétrécit** |
| Sa preuve, en une phrase ? | Toute coalition de $E_{r-1}$ **survit** dans $E_r$ |
| Lemme 5.4 ? | Les WEA de $E_r$ = les **copies** des WEA de $E_1$ |
| L'ensemble des WEA rétrécit-il ? | **Non** — il reste **constant** |
| La chaîne d'inclusions ? | $C_1\supseteq C_2\supseteq\dots\supseteq W_1(e)$ |
| La coalition qui bloque dans $E_2$ ? | **Deux** type 1 et **un seul** type 2 |
| Pourquoi déséquilibrée ? | Une coalition équilibrée ne peut pas battre le cœur de $E_1$ |
| Théorème 5.17 ? | $x\in C_r$ **pour tout $r$** ⟹ $x$ est une **WEA** de $E_1$ |
| Ses auteurs ? | **Edgeworth** (intuition, 1881) · **Debreu et Scarf (1963)** |
| L'origine du gain dans son argument ? | Les **TMS** ne coïncident pas avec les **prix implicites** |
| La paramétrisation de $\hat x^1$ ? | $\tfrac1r e^1+\tfrac{r-1}{r}\tilde x^1$ |
| Pourquoi cette forme ? | Ce sont **exactement** les coefficients qui rendent la coalition faisable |
| La coalition générale ? | Les **$r$** du type avantagé, **$r-1$** de l'autre |
| L'inégalité fondamentale (P.1) ? | $u^i\big((1-t)\tilde x^i+te^i\big)\leq u^i(\tilde x^i)$ pour tout $t\in[0,1]$ |
| Ce qu'elle donne en $t=0$ ? | La dérivée est **$\leq0$** (borne **inférieure**) : $\nabla u^i\cdot(e^i-\tilde x^i)\leq0$ |
| Ce que donne l'efficacité de $\tilde x$ ? | Les gradients sont **proportionnels** à un $\tilde p\gg0$ commun |
| Le pas d'agrégation final ? | La **réalisabilité** force toutes les inégalités à être des **égalités** |
| Quel théorème clôt la preuve ? | Le **théorème 1.4** — les CPO sont **suffisantes** |
| Première objection finale ? | Le cadre des **répliques** est rigide |
| Sa réponse ? | **Aumann (1964)**, **Hildenbrand (1974)** — économies à **continuum** |
| Seconde objection ? | Le **cœur** est un concept faible, **sans équité** |
| La conclusion du livre là-dessus ? | *« Même l'interprétation la plus large ne soutient pas le **laissez-faire pur** »* |
| De quoi l'équité dépend-elle ? | Des **dotations initiales** |
| Sur quelle question le chapitre 5 se clôt-il ? | *« **Comment la société décide-t-elle quelle distribution elle préfère ?** »* — le chapitre 6 |
