# Fiche 96 — Dérivés de crédit : CDS, indices, CDO synthétiques et corrélation implicite

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Dérivés de crédit |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 24 « Credit Derivatives » |
| **Difficulté** | Must know — l'instrument au cœur de la crise de 2007-2008 |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 95 (risque de crédit, copule gaussienne), fiche 81 (titrisation et CDO d'ABS), fiche 80 (swaps) |
| **Concepts clés** | Credit default swap, entité de référence, événement de crédit, spread de CDS, base CDS-obligation, obligation la moins chère à livrer, valorisation par actualisation risque-neutre, CDS binaire, indices CDX et iTraxx, coupons fixes, forwards et options sur CDS, *basket* CDS, *total return swap*, CDO synthétique, tranches standard, point d'attachement et de détachement, modèle de copule gaussienne à un facteur, quadrature gaussienne, corrélation composée et corrélation de base |
| **Poids à l'examen** | La **table des trois blocs** (paiements, payoff, accru) → $s=\dfrac{C}{A+B}$ · le **principal résiduel d'une tranche** $\dfrac{H-k(1-R)/n}{H-L}$ · $n_L=\dfrac{Ln}{1-R}$ · le rôle **inversé** de la corrélation entre tranche equity et tranche senior. |

## 🎯 Vue d'ensemble

```
CROISSANCE   2000 : 800 milliards de nominal notionnel → décembre 2009 : 32 000 milliards

SINGLE-NAME  le CDS — payoff = L(1−R) si l'entité de référence fait défaut
MULTI-NAME   le CDO — un portefeuille, une cascade, des tranches

VALORISER UN CDS       trois blocs, tous actualisés au taux SANS RISQUE
   A = Σ (survie) × v      paiements réguliers
   B = Σ (défaut) × 0,5 × v    paiement accru final
   C = Σ (défaut) × (1−R) × v  payoff
   s = C / (A + B)        →   MtM = s_marché × (A+B) − C   pour le VENDEUR

INDICES      CDX NA IG (125 noms Amérique du Nord) · iTraxx Europe (125 noms Europe)
             mis à jour les 20 mars et 20 septembre

CDO SYNTHÉTIQUE   vendre de la protection CDS sur n noms, découper les pertes en tranches
   nL = Ln/(1−R)   nH = Hn/(1−R)   principal résiduel = [H − k(1−R)/n] / (H − L)
   MODÈLE STANDARD  copule gaussienne à UN FACTEUR + binomiale conditionnelle + quadrature

CORRÉLATION  ρ ↑  →  tranche EQUITY moins risquée · tranche SENIOR plus risquée
             composée : SOURIRE      de base : SKEW croissant
```

**Le cadrage d'ouverture.** *Les dérivés de crédit sont des contrats **dont le payoff dépend de la solvabilité d'une ou plusieurs entreprises ou pays**. Ils permettent aux entreprises de **négocier les risques de crédit à peu près comme elles négocient les risques de marché**. Les banques et autres institutions financières étaient auparavant dans la position où, une fois un risque de crédit assumé, **elles ne pouvaient plus faire grand-chose sinon attendre (et espérer)**. Elles peuvent maintenant **gérer activement leurs portefeuilles de risques de crédit**.*

<details class="details--riche">
<summary>

**Business Snapshot 24.1 — qui porte le risque de crédit ?**

</summary>

*Traditionnellement, les banques faisaient des prêts et **portaient le risque de défaut**. Mais elles sont depuis un certain temps **réticentes à garder les prêts au bilan** : une fois pris en compte le capital exigé par les régulateurs, **le rendement moyen des prêts est souvent moins attractif que celui d'autres actifs**. Elles ont créé des titres adossés à des actifs pour transmettre les prêts (et leur risque) aux investisseurs, et à la fin des années 1990 et au début des années 2000 elles ont **massivement utilisé les dérivés de crédit** pour déplacer le risque vers d'autres parties du système financier.*

> **Si les banques ont été acheteuses nettes de protection, qui en a été vendeur net ?** *La réponse est **les compagnies d'assurance**. Elles **ne sont pas régulées de la même façon** que les banques et sont de ce fait parfois **plus disposées à porter du risque de crédit**.*

⚠️ *Le résultat de tout cela est que **l'institution financière qui porte le risque de crédit d'un prêt est souvent différente de celle qui a fait les vérifications de crédit initiales**. Comme la crise de 2007 l'a montré, **ce n'est pas toujours bon pour la santé globale du système financier**.*

</details>

## 🔴 Concept 1 — Le credit default swap

### 1.1 Le mécanisme

> ***Le CDS est un contrat qui fournit une assurance contre le risque de défaut d'une entreprise particulière.***

| Terme | Définition |
|---|---|
| **Entité de référence** (*reference entity*) | l'entreprise (ou le pays) sur laquelle porte le contrat |
| **Événement de crédit** (*credit event*) | un défaut de cette entreprise |
| **Nominal notionnel** | la valeur faciale **totale** des obligations qui peuvent être vendues |
| **Spread de CDS** | le montant total payé par an, **en pourcentage du nominal**, pour acheter la protection |

*L'acheteur de l'assurance obtient **le droit de vendre les obligations émises par l'entreprise à leur valeur faciale** quand survient un événement de crédit ; le vendeur **accepte de les acheter à leur valeur faciale**.* L'acheteur fait des **paiements périodiques** au vendeur jusqu'à la fin de vie du CDS **ou** jusqu'à l'événement de crédit. *Ces paiements sont typiquement faits **trimestriellement à terme échu**, mais des accords mensuels, semestriels ou annuels existent, et parfois les paiements sont faits d'avance.*

<details class="details--riche">
<summary>

**L'exemple complet — un CDS 5 ans conclu le 20 mars 2012**

</summary>

**Données.** Nominal **100 millions de dollars**, l'acheteur paie **90 points de base par an**, paiements **trimestriels à terme échu**.

*Cas 1 — pas de défaut.* L'acheteur ne reçoit **aucun payoff** et paie **22,5 points de base** (le quart de 90) sur 100 millions le 20 juin 2012 et chaque trimestre jusqu'au **20 mars 2017** :

$$0{,}00225\times100\,000\,000=\mathbf{225\,000\ \text{dollars par trimestre}}$$

*(Les paiements trimestriels sont susceptibles de différer légèrement de 225 000 à cause des **conventions de décompte des jours**.)*

*Cas 2 — événement de crédit notifié le 20 mai 2015* (2 mois dans la 4ᵉ année) :

| Mode de règlement | Ce qui se passe |
|---|---|
| **Livraison physique** | l'acheteur a le droit de **vendre des obligations de valeur faciale 100 millions pour 100 millions** |
| **Règlement en espèces** (l'usage actuel) | **un processus d'enchères organisé par l'ISDA** détermine la valeur mid-market de **l'obligation livrable la moins chère** quelques jours après l'événement. Si l'enchère indique **35 dollars par 100 de valeur faciale**, le payoff est de **65 millions** |

*Le paiement accru final.* *Les paiements réguliers **cessent** quand survient un événement de crédit. **Mais comme ils sont faits à terme échu, un paiement accru final est habituellement requis.*** Ici, l'acheteur devrait payer au vendeur le montant accru entre le **20 mars 2015** et le **20 mai 2015**, soit approximativement **150 000 dollars** — et rien de plus.

**La cotation d'un market maker.** *Sur un nouveau CDS à 5 ans, un teneur de marché peut coter **bid 250 / offer 260 points de base** : il est prêt à **acheter** la protection en payant 2,5 % du principal par an et à **vendre** la protection pour 2,6 % par an.*

</details>

**Les conventions du marché** :

| Élément | Convention |
|---|---|
| Maturité la plus populaire | **5 ans** (1, 2, 3, 7 et 10 ans ne sont pas rares) |
| Dates standard de maturité | **20 mars · 20 juin · 20 septembre · 20 décembre** |
| Conséquence | *le temps réel jusqu'à maturité **est proche de, mais pas nécessairement égal à** ce qui est spécifié* |
| Exemple | un appel le **15 novembre 2012** pour 5 ans de protection donne probablement un contrat jusqu'au **20 décembre 2017**, avec un premier paiement le **20 décembre 2012** couvrant la période 15 nov. – 20 déc. *(Si le délai jusqu'à la première date standard est **inférieur à un mois**, le premier paiement est typiquement fait à la **deuxième** date standard.)* |
| Définition d'un événement de crédit | *un **défaut de paiement à échéance**, une **restructuration de dette**, ou une **faillite*** |

<details class="details--riche">
<summary>

**Business Snapshot 24.2 — le marché des CDS**

</summary>

*En **1998 et 1999**, l'**ISDA** (International Swaps and Derivatives Association) a développé un **contrat standard** pour négocier les CDS de gré à gré. Depuis, le marché a crû très vite.*

> ⚠️ ***Un CDS ressemble à un contrat d'assurance à bien des égards, mais il y a une différence CLÉ : un contrat d'assurance protège contre les pertes sur un actif QU'ON POSSÈDE. Dans le cas d'un CDS, l'actif sous-jacent N'A PAS À ÊTRE POSSÉDÉ.***

**Les inquiétudes réglementaires.** *Pendant la tourmente commencée en août 2007, les régulateurs se sont beaucoup inquiétés du **risque systémique**. **Le danger : un défaut d'une institution financière pourrait entraîner de grosses pertes chez ses contreparties CDS et de nouveaux défauts d'autres institutions.** Ces inquiétudes ont été alimentées par les difficultés du géant de l'assurance **AIG** — gros vendeur de protection sur les tranches notées AAA créées à partir de crédits hypothécaires. **La protection s'est révélée très coûteuse pour AIG, qui a été renflouée par le gouvernement américain.***

*Ces inquiétudes ont conduit au développement de **chambres de compensation** pour les transactions CDS entre institutions financières, exigeant le **dépôt de marge** comme sur les contrats à terme.*

**La résilience du produit.** *En 2007 et 2008, les transactions ont **cessé sur beaucoup de types de dérivés de crédit, mais les CDS ont continué de se négocier activement** (même si le coût de la protection a augmenté dramatiquement). **L'avantage du CDS est que son fonctionnement est DIRECT** ; d'autres dérivés de crédit, comme ceux créés par la titrisation de crédits hypothécaires, **manquent de cette transparence**.*

**Le chiffre à retenir.** *Il n'est pas rare que le **volume de CDS sur une entreprise dépasse sa dette** — le règlement en espèces devient alors clairement nécessaire. Quand **Lehman** a fait défaut en septembre 2008, il y avait environ **400 milliards de dollars de contrats CDS** et **155 milliards de dette Lehman** en circulation. **Le paiement aux acheteurs de protection, déterminé par enchère, a été de 91,375 % du principal.***

</details>

### 1.2 CDS et rendements obligataires : la base

<details class="details--riche">
<summary>

**L'argument d'arbitrage — pourquoi spread de CDS ≈ excès de rendement**

</summary>

*Étape 1 — le montage.* Un investisseur achète au pair une obligation d'entreprise à 5 ans rendant **7 % par an**, et achète simultanément **5 ans de protection CDS** contre le défaut de l'émetteur. Le spread de CDS est **200 points de base**.

*Étape 2 — l'effet.* ***Le CDS convertit l'obligation d'entreprise en obligation sans risque*** (au moins approximativement).

*Étape 3 — les deux scénarios.*

| Scénario | Résultat |
|---|---|
| **Pas de défaut** | l'investisseur gagne $7\,\%-2\,\%=\mathbf{5\,\%}$ par an |
| **Défaut** | il gagne 5 % jusqu'au défaut ; il peut alors **échanger l'obligation contre sa valeur faciale**, qu'il place au taux sans risque pour le reste des 5 ans |

*Étape 4 — la conclusion.* ***L'excès du rendement d'une obligation à $n$ ans sur le taux sans risque devrait approximativement ÉGALER le spread de CDS à $n$ ans.***

| Déséquilibre | Arbitrage |
|---|---|
| Excès **nettement supérieur** au spread | acheter l'obligation **et** la protection → **gagner plus que le taux sans risque** |
| Excès **nettement inférieur** | vendre l'obligation à découvert **et** vendre la protection → **emprunter à moins que le taux sans risque** |

*Le taux sans risque pertinent est habituellement supposé être le taux **LIBOR/swap**, de sorte que l'excès de rendement est **l'asset swap spread** (fiche 95).*

</details>

$$\boxed{\text{Base CDS-obligation}=\text{spread de CDS}-\text{excès du rendement obligataire sur le sans risque}=\text{spread de CDS}-\text{asset swap spread}}$$

*L'argument d'arbitrage suggère que cela devrait être **proche de zéro**. **Avant la crise de 2007, c'était en moyenne légèrement POSITIF. Pendant la crise, cela tendait à être NÉGATIF, et est devenu fortement négatif pendant une courte période en janvier 2009.***

### 1.3 L'obligation la moins chère à livrer

$$\boxed{\text{Payoff d'un CDS}=L(1-R)}\qquad L=\text{nominal notionnel},\ R=\text{taux de recouvrement}$$

> ⚠️ ***Habituellement un CDS spécifie qu'un CERTAIN NOMBRE d'obligations différentes peuvent être livrées. Elles ont typiquement le MÊME rang de séniorité, mais elles peuvent NE PAS se vendre au même pourcentage de valeur faciale immédiatement après un défaut. Cela donne au détenteur d'un CDS une OPTION DE L'OBLIGATION LA MOINS CHÈRE À LIVRER.***

*Les raisons de cet écart :*

- *la créance présentée en cas de défaut égale typiquement la **valeur faciale plus les intérêts courus** : les obligations à **fort coupon couru** au moment du défaut tendent donc à avoir des **prix plus élevés** juste après ;*
- *le marché peut juger qu'en cas de réorganisation, **certains porteurs s'en tireront mieux que d'autres**.*

## 🔴 Concept 2 — La valorisation d'un CDS

### 2.1 Les données de l'exemple canonique

**Hypothèses.** Taux de hasard **2 % par an** (probabilité de défaut pendant une année **conditionnelle à l'absence de défaut antérieur**) ; *c'est un taux de hasard exprimé en **composition annuelle** ; le taux composé en continu équivalent est $-\ln(0{,}98)=\mathbf{2{,}02\,\%}$*. Les défauts surviennent **toujours à mi-année** ; les paiements du CDS sont faits **une fois par an, à la fin de chaque année** ; taux sans risque (LIBOR) **5 %** composé en continu ; recouvrement **40 %**.

**Table 24.1 — probabilités inconditionnelles et de survie** :

| Année | Probabilité de défaut | Probabilité de survie |
|---|---|---|
| 1 | 0,0200 | 0,9800 |
| 2 | $0{,}02\times0{,}98=$ **0,0196** | $0{,}98^2=$ **0,9604** |
| 3 | $0{,}02\times0{,}9604=$ **0,0192** | 0,9412 |
| 4 | 0,0188 | 0,9224 |
| 5 | 0,0184 | 0,9039 |

### 2.2 Les trois blocs

<details class="details--riche">
<summary>

**Table 24.2 — la valeur actuelle des PAIEMENTS espérés (bloc A)**

</summary>

Le nominal est 1 dollar et le spread est $s$ par an. On paie **si et seulement si l'entité a survécu**.

| Année | Probabilité de survie | Paiement espéré | Facteur d'actualisation | VA du paiement espéré |
|---|---|---|---|---|
| 1 | 0,9800 | $0{,}9800\,s$ | $e^{-0{,}05}=0{,}9512$ | $0{,}9322\,s$ |
| 2 | 0,9604 | $0{,}9604\,s$ | 0,9048 | $0{,}8690\,s$ |
| 3 | 0,9412 | $0{,}9412\,s$ | 0,8607 | $0{,}8101\,s$ |
| 4 | 0,9224 | $0{,}9224\,s$ | 0,8187 | $0{,}7552\,s$ |
| 5 | 0,9039 | $0{,}9039\,s$ | 0,7788 | $0{,}7040\,s$ |
|  |  |  | **Total** | $\mathbf{4{,}0704\,s}$ |

*Détail de la ligne 3 :* *il y a une probabilité **0,9412** que le troisième paiement de $s$ soit fait. Le paiement espéré est donc $0{,}9412\,s$ et sa valeur actuelle $0{,}9412\,s\,e^{-0{,}05\times3}=\mathbf{0{,}8101\,s}$.*

</details>

<details class="details--riche">
<summary>

**Table 24.3 — la valeur actuelle du PAYOFF espéré (bloc C)**

</summary>

Les défauts surviennent **à mi-année** ; le payoff est $1-R=0{,}6$ par dollar de nominal.

| Date (ans) | Probabilité de défaut | Recouvrement | Payoff espéré | Facteur d'actualisation | VA du payoff espéré |
|---|---|---|---|---|---|
| 0,5 | 0,0200 | 0,4 | 0,0120 | 0,9753 | 0,0117 |
| 1,5 | 0,0196 | 0,4 | 0,0118 | 0,9277 | 0,0109 |
| 2,5 | 0,0192 | 0,4 | 0,0115 | 0,8825 | 0,0102 |
| 3,5 | 0,0188 | 0,4 | 0,0113 | 0,8395 | 0,0095 |
| 4,5 | 0,0184 | 0,4 | 0,0111 | 0,7985 | 0,0088 |
|  |  |  |  | **Total** | **0,0511** |

*Détail de la ligne 2,5 :* *il y a une probabilité **0,0192** d'un payoff à mi-troisième année. Avec un recouvrement de 40 %, le payoff espéré est $0{,}0192\times0{,}6\times1=\mathbf{0{,}0115}$, dont la valeur actuelle est $0{,}0115\,e^{-0{,}05\times2{,}5}=\mathbf{0{,}0102}$.*

</details>

<details class="details--riche">
<summary>

**Table 24.4 — la valeur actuelle du paiement ACCRU (bloc B)**

</summary>

En cas de défaut à mi-année, l'acheteur doit **un demi-paiement accru**, soit $0{,}5\,s$.

| Date (ans) | Probabilité de défaut | Paiement accru espéré | Facteur d'actualisation | VA |
|---|---|---|---|---|
| 0,5 | 0,0200 | $0{,}0100\,s$ | 0,9753 | $0{,}0097\,s$ |
| 1,5 | 0,0196 | $0{,}0098\,s$ | 0,9277 | $0{,}0091\,s$ |
| 2,5 | 0,0192 | $0{,}0096\,s$ | 0,8825 | $0{,}0085\,s$ |
| 3,5 | 0,0188 | $0{,}0094\,s$ | 0,8395 | $0{,}0079\,s$ |
| 4,5 | 0,0184 | $0{,}0092\,s$ | 0,7985 | $0{,}0074\,s$ |
|  |  |  | **Total** | $\mathbf{0{,}0426\,s}$ |

</details>

### 2.3 Le spread d'équilibre et le *mark to market*

$$\text{VA des paiements}=4{,}0704\,s+0{,}0426\,s=\mathbf{4{,}1130\,s}\qquad\text{VA du payoff}=\mathbf{0{,}0511}$$

$$\boxed{4{,}1130\,s=0{,}0511\quad\Longrightarrow\quad s=0{,}0124\ \text{soit }\mathbf{124\ \text{points de base par an}}}$$

⚠️ *Les calculs supposent que **les défauts n'ont lieu qu'aux points à mi-chemin entre les dates de paiement**. Cette hypothèse simple peut être relâchée, mais elle **donne généralement de bons résultats**.*

<details class="details--riche">
<summary>

**Le mark to market d'un CDS existant**

</summary>

*Un CDS, comme la plupart des swaps, est **marqué au marché quotidiennement**. Il peut avoir une valeur positive ou négative.*

**Situation :** le CDS avait été négocié il y a quelque temps pour un spread de **150 points de base**.

*Étape 1 — la VA des paiements de l'acheteur, au spread contractuel :*

$$4{,}1130\times0{,}0150=\mathbf{0{,}0617}$$

*Étape 2 — la VA du payoff, aux conditions de marché actuelles :* **0,0511** (comme ci-dessus).

*Étape 3 — la valeur pour le **VENDEUR** de protection :*

$$0{,}0617-0{,}0511=\mathbf{+0{,}0106}\times\text{le principal}$$

*Étape 4 — pour l'**ACHETEUR** de protection :* $\mathbf{-0{,}0106}\times$ le principal.

> **La logique :** le spread de marché est **124 pb** alors que le contrat paie **150 pb** ; le vendeur reçoit **plus que le prix courant**, le contrat lui est donc **favorable**.

</details>

### 2.4 Impliquer les probabilités de défaut, et le CDS binaire

> ⚠️ ***Les probabilités de défaut utilisées pour valoriser un CDS doivent être des probabilités RISQUE-NEUTRES, pas réelles.***

*Elles peuvent être estimées à partir des **prix d'obligations** ou des **asset swaps** (fiche 95). **Une alternative est de les IMPLIQUER des cotations de CDS** — approche similaire à la pratique des marchés d'options consistant à impliquer les volatilités des prix d'options activement traitées.*

**L'exemple inversé.** Si l'on ne connaît pas les probabilités mais que le spread mid-market d'un CDS 5 ans neuf est **100 points de base**, on **rétro-ingénierise** les calculs (Excel + Solver) et on trouve une probabilité de défaut annuelle conditionnelle de :

$$\boxed{1{,}61\,\%\ \text{par an (composition annuelle)}=1{,}626\,\%\ \text{en continu}}$$

<details class="details--riche">
<summary>

**Le CDS binaire — Table 24.5**

</summary>

*Un **CDS binaire** est structuré comme un CDS ordinaire **sauf que le payoff est un montant fixe en dollars**.* Si le payoff est **1 dollar** au lieu de $1-R$, les tables 24.1, 24.2 et 24.4 sont **inchangées** ; seule la table 24.3 devient :

| Date (ans) | Probabilité de défaut | Payoff espéré | Facteur d'actualisation | VA |
|---|---|---|---|---|
| 0,5 | 0,0200 | 0,0200 | 0,9753 | 0,0195 |
| 1,5 | 0,0196 | 0,0196 | 0,9277 | 0,0182 |
| 2,5 | 0,0192 | 0,0192 | 0,8825 | 0,0170 |
| 3,5 | 0,0188 | 0,0188 | 0,8395 | 0,0158 |
| 4,5 | 0,0184 | 0,0184 | 0,7985 | 0,0147 |
|  |  |  | **Total** | **0,0852** |

$$4{,}1130\,s=0{,}0852\quad\Longrightarrow\quad s=0{,}0207=\mathbf{207\ \text{points de base}}$$

*Contrôle de cohérence : $124/0{,}6=207$ — exactement le rapport $1/(1-R)$.*

</details>

### 2.5 L'importance du taux de recouvrement

> ⚠️ **Le résultat le plus contre-intuitif du chapitre.** *Pourvu qu'on utilise **le MÊME taux de recouvrement** pour (a) estimer les probabilités risque-neutres et (b) valoriser le CDS, **la valeur du CDS n'est PAS très sensible au taux de recouvrement**.*

**La raison, en une ligne :** *les probabilités de défaut implicites sont approximativement **proportionnelles à $1/(1-R)$** et les payoffs d'un CDS sont **proportionnels à $1-R$** — les deux effets s'annulent.*

⚠️ **L'exception :** *cet argument **ne s'applique PAS à la valorisation d'un CDS binaire**. Les probabilités implicites restent proportionnelles à $1/(1-R)$, **mais les payoffs d'un CDS binaire sont INDÉPENDANTS de $R$**.* Conséquence exploitable : *si on a le spread d'un CDS ordinaire **et** celui d'un CDS binaire, **on peut estimer À LA FOIS le taux de recouvrement et la probabilité de défaut**.*

## 🟠 Concept 3 — Les indices de crédit et les coupons fixes

### 3.1 Les deux portefeuilles standard

| Indice | Composition |
|---|---|
| **CDX NA IG** | un portefeuille de **125 entreprises *investment grade* d'Amérique du Nord** |
| **iTraxx Europe** | un portefeuille de **125 noms *investment grade* européens** |

*Ces portefeuilles sont **mis à jour les 20 mars et 20 septembre** de chaque année : les entreprises qui ne sont plus investment grade sont **retirées**, de nouvelles sont **ajoutées**.* (Au 20 septembre 2010 étaient définis la **Series 14** d'iTraxx Europe et la **Series 15** de CDX NA IG.)

<details class="details--riche">
<summary>

**Comment se lit une cotation d'indice**

</summary>

**Cotation :** l'indice CDX NA IG 5 ans est coté **bid 65 / offer 66 points de base** (l'*index spread*).

*Grossièrement, un trader peut **acheter la protection CDS sur les 125 entreprises pour 66 points de base par entreprise**.*

*Étape 1 — le coût d'achat.* Pour **800 000 dollars** de protection sur chaque nom :

$$0{,}0066\times800\,000\times125=\mathbf{660\,000\ \text{dollars par an}}$$

*Étape 2 — la vente.* Il peut de même **vendre** 800 000 de protection sur chacun des 125 noms pour **650 000 par an** ($0{,}0065\times800\,000\times125$).

*Étape 3 — que se passe-t-il en cas de défaut ?* *L'acheteur de protection reçoit le payoff CDS habituel et **le paiement annuel est réduit de** $660\,000/125=\mathbf{5\,280\ \text{dollars}}$.*

**Les maturités.** *Marché actif à 3, 5, 7 et 10 ans. Les maturités sont habituellement les **20 décembre et 20 juin** — ce qui veut dire qu'un contrat « 5 ans » dure en réalité entre **4 ¾ et 5 ¼ ans**.*

⚠️ **La subtilité de la moyenne.** *Grossièrement, l'indice est la **moyenne** des spreads de CDS des entreprises du portefeuille. **Plus précisément, l'indice est légèrement INFÉRIEUR à cette moyenne.*** Considérons un portefeuille de deux entreprises, l'une à **1 000 pb** et l'autre à **10 pb** : acheter la protection sur les deux coûterait **légèrement moins de 505 pb** par entreprise, ***parce qu'on ne s'attend pas à payer les 1 000 pb aussi longtemps que les 10 pb : ils doivent donc porter MOINS de poids***. *(Une autre complication, pour CDX NA IG mais pas iTraxx Europe : la définition du défaut applicable à l'indice **inclut la restructuration**, alors que celle des CDS individuels souvent non.)*

</details>

### 3.2 Le mécanisme des coupons fixes

*Le fonctionnement précis est un peu plus compliqué. **Pour chaque sous-jacent et chaque maturité, un COUPON et un TAUX DE RECOUVREMENT sont spécifiés.*** Un prix est calculé à partir du spread coté par la procédure suivante :

| Étape | Contenu |
|---|---|
| **1** | supposer **quatre paiements par an, à terme échu** |
| **2** | **impliquer un taux de hasard** du spread coté — calculs identiques au §2, par **recherche itérative** |
| **3** | calculer une **durée $D$** pour les paiements du CDS : *le nombre par lequel on multiplie le spread pour obtenir la valeur actuelle des paiements* (dans l'exemple du §2, c'est **4,1130**) |
| **4** | $\boxed{P=100-100\times D\times(S-C)}$ où $S$ est le **spread** et $C$ le **coupon**, en décimal |

**Les flux qui en résultent :**

- *quand un trader **achète** la protection, il **paie $100-P$** par 100 de nominal résiduel total, et le vendeur reçoit ce montant. **Si $100-P$ est négatif, c'est l'acheteur qui reçoit de l'argent** ;*
- *l'acheteur paie ensuite **le COUPON** fois le nominal résiduel à chaque date de paiement ;*
- *le payoff en cas de défaut est calculé de la façon habituelle.*

> ⚠️ ***L'intérêt du montage : il FACILITE LES ÉCHANGES, parce que les paiements trimestriels réguliers faits par l'acheteur de protection sont INDÉPENDANTS du spread au moment où il entre dans le contrat.***

**Le nominal résiduel** : *pour un CDS, c'est le nominal d'origine **jusqu'au défaut, et zéro après**. Pour un **indice**, c'est **le nombre de noms qui n'ont pas encore fait défaut** multiplié par le principal par nom.*

<details class="details--riche">
<summary>

**Exemple 24.1 — un contrat iTraxx Europe avec coupon fixe**

</summary>

**Données.** Cotation iTraxx Europe : **34 points de base** ; coupon : **40 points de base** ; contrat de **5 ans exactement** ; les deux cotations en **30/360** *(la convention usuelle des marchés CDS et indices)*. Courbe des taux plate à **4 %** (actual/actual, continu). Recouvrement spécifié : **40 %**.

*Étape 1 — convertir en actual/actual :*

$$0{,}34\,\%\times\frac{365}{360}=\mathbf{0{,}345\,\%}\qquad0{,}40\,\%\times\frac{365}{360}=\mathbf{0{,}406\,\%}$$

*Étape 2 — impliquer le taux de hasard*, avec quatre paiements par an à terme échu :

$$\lambda=\mathbf{0{,}5717\,\%}$$

*Étape 3 — la durée :* $D=\mathbf{4{,}447}$ ans.

*Étape 4 — le prix :*

$$P=100-100\times4{,}447\times(0{,}00345-0{,}00406)=100+0{,}271=\mathbf{100{,}27}$$

*Étape 5 — les flux, pour une protection de **1 million par nom**.* Comme $P>100$, **c'est le VENDEUR de protection qui paie l'acheteur au départ** :

$$1\,000\,000\times125\times0{,}0027=\mathbf{337\,500\ \text{dollars}}$$

*Étape 6 — ensuite.* L'acheteur fait des **paiements trimestriels à terme échu** au taux annuel

$$1\,000\,000\times0{,}00406\times n\qquad n=\text{nombre d'entreprises n'ayant pas fait défaut}$$

*Étape 7 — en cas de défaut.* Le payoff est calculé de la façon habituelle et **il y a un paiement accru de l'acheteur au vendeur, calculé au taux de 0,406 % par an sur 1 million**.

> **La lecture :** le spread de marché (34 pb) est **inférieur** au coupon (40 pb) : l'acheteur va payer **trop cher** chaque trimestre, il est donc **compensé au départ**.

</details>

## 🟠 Concept 4 — Forwards, options, *baskets* et *total return swaps*

### 4.1 Forwards et options sur CDS

| Instrument | Définition |
|---|---|
| **Forward CDS** | *l'**obligation** d'acheter ou de vendre un CDS particulier sur une entité de référence particulière à une date future $T$*. ***Si l'entité fait défaut AVANT $T$, le contrat forward CESSE D'EXISTER.*** Exemple : une banque s'engage à **vendre** 5 ans de protection sur une entreprise pour **280 pb, commençant dans 1 an** |
| **Option sur CDS — CALL** | le **droit d'ACHETER** 5 ans de protection dans 1 an pour 280 pb. *Exercée si le spread de CDS 5 ans dans 1 an dépasse 280 pb* |
| **Option sur CDS — PUT** | le **droit de VENDRE** 5 ans de protection dans 1 an pour 280 pb. *Exercée si le spread se révèle inférieur à 280 pb* |

*Le coût de l'option est payé **d'avance**. Comme les forwards, les options sur CDS sont habituellement structurées de sorte qu'elles **cessent d'exister si l'entité fait défaut avant maturité de l'option**.*

### 4.2 Les *basket* CDS

*Dans un ***basket credit default swap*** il y a **plusieurs entités de référence**.*

| Type | Payoff |
|---|---|
| ***Add-up basket*** CDS | quand **N'IMPORTE LAQUELLE** des entités fait défaut |
| ***First-to-default*** CDS | seulement au **PREMIER** défaut |
| ***Second-to-default*** CDS | seulement au **DEUXIÈME** défaut |
| ***$k$-th-to-default*** CDS | seulement au **$k$-ième** défaut |

*Les payoffs sont calculés comme pour un CDS ordinaire. **Après que le défaut pertinent est survenu, il y a règlement, le swap se TERMINE et il n'y a plus aucun paiement de part et d'autre.***

### 4.3 Le *total return swap*

> ***Un accord d'échanger le RENDEMENT TOTAL d'une obligation (ou de tout portefeuille d'actifs) contre LIBOR plus un spread. Le rendement total inclut les coupons, les intérêts, ET le gain ou la perte sur l'actif pendant la vie du swap.***

<details class="details--riche">
<summary>

**L'exemple et les deux lectures du montage**

</summary>

**Le contrat.** Accord de 5 ans, nominal **100 millions**, échangeant le rendement total d'une obligation d'entreprise contre **LIBOR + 25 points de base**.

| Qui | Paie quoi |
|---|---|
| Le **payeur** (*total return payer*) | aux dates de coupon, les **coupons** gagnés sur un investissement de 100 M dans l'obligation |
| Le **receveur** | les intérêts à **LIBOR + 25 pb** sur un principal de 100 M *(LIBOR fixé à une date de coupon et payé à la suivante, comme dans un swap de taux ordinaire)* |

**Le paiement final.**

| Situation | Paiement |
|---|---|
| L'obligation **monte de 10 %** | **le payeur** verse **10 millions** à la fin des 5 ans |
| L'obligation **baisse de 15 %** | **le receveur** verse **15 millions** |
| **Défaut sur l'obligation** | le swap est habituellement **terminé** et le receveur fait un paiement final égal à **l'excès de 100 M sur la valeur de marché de l'obligation** |

**La caractérisation propre.** *Si l'on **ajoute le nominal des deux côtés** à la fin : **le payeur paie les flux d'un investissement de 100 M dans l'obligation d'entreprise ; le receveur paie les flux d'une obligation de 100 M rapportant LIBOR + 25 pb**.*

| Situation du payeur | Ce que le TRS lui permet |
|---|---|
| Il **possède** l'obligation | **transmettre le risque de crédit** au receveur |
| Il **ne la possède pas** | prendre une **position courte** sur l'obligation |

**L'usage réel : un outil de FINANCEMENT.** *Le receveur veut un financement pour investir 100 M dans l'obligation. Il approche le payeur (probablement une institution financière) et convient du swap. **Le payeur investit alors 100 M dans l'obligation.** Cela laisse le receveur **dans la même position que s'il avait emprunté à LIBOR + 25 pb pour acheter l'obligation**.*

> ⚠️ **L'avantage clé pour le payeur.** *Il **conserve la PROPRIÉTÉ de l'obligation** pendant la vie du swap et **fait face à moins de risque de crédit** que s'il avait prêté l'argent au receveur avec l'obligation en collatéral : **si le receveur fait défaut, le payeur n'a pas le problème juridique de réaliser le collatéral**.* Les TRS sont, comme les **repos**, structurés pour minimiser le risque de crédit quand des titres sont financés.

**D'où vient le spread ?** *Le spread sur LIBOR reçu par le payeur est la **compensation du risque que le receveur fasse défaut**. Le payeur perd de l'argent si le receveur fait défaut **à un moment où le prix de l'obligation a baissé**. Le spread dépend donc de **trois choses** : la qualité de crédit du **receveur**, celle de l'**émetteur de l'obligation**, et **la CORRÉLATION entre les deux**.*

**Les variantes :** règlement **physique** (le payeur échange l'actif contre le nominal en fin de vie) ; paiements de variation de valeur **périodiques** plutôt qu'en une fois à la fin.

</details>

## 🔴 Concept 5 — Les CDO et les CDO synthétiques

### 5.1 Cash CDO et CDO synthétique

*Un ABS dont les actifs sous-jacents sont des **obligations** est un **collateralized debt obligation (CDO)**. Une cascade (*waterfall*) est définie pour les paiements d'intérêts et de principal. **Les règles précises sont compliquées, mais elles sont conçues pour garantir que si une tranche est plus senior qu'une autre, elle a plus de chances de recevoir les intérêts promis et les remboursements de principal.***

**Le développement clé du marché.** *Il a été reconnu qu'**une position LONGUE sur une obligation d'entreprise a un risque similaire à une position COURTE sur un CDS** quand l'entité de référence est l'entreprise émettrice. Cela a conduit à une structure alternative, le **CDO SYNTHÉTIQUE**, devenue très populaire.*

|  | **Cash CDO** | **CDO synthétique** |
|---|---|---|
| Sous-jacent | un **portefeuille d'obligations** acheté | des **CDS vendus** sur un portefeuille d'entreprises |
| Principal | la valeur des obligations | **le total des nominaux notionnels des CDS** |
| Entrées de trésorerie | les coupons | **les spreads de CDS** |
| Sorties | — | **les payoffs quand des entreprises font défaut** |
| Investissement initial | **requis** (il faut financer les obligations) | **non requis** — les détenteurs conviennent simplement des règles. *En pratique, ils doivent presque invariablement **déposer le principal de tranche en COLLATÉRAL**. Quand la tranche doit un payoff, l'argent est **prélevé sur le collatéral** ; le solde du compte de collatéral rapporte **LIBOR*** |
| Règles de cascade | compliquées | **plus directes** |

<details class="details--riche">
<summary>

**Le CDO synthétique à trois tranches — la mécanique complète**

</summary>

**Les règles.**

| Tranche | Responsable des payoffs | Spread gagné (sur le principal RÉSIDUEL) |
|---|---|---|
| **Equity** | jusqu'à **5 %** du principal du CDO | **1 000 points de base** par an |
| **Mezzanine** | l'excès **au-delà de 5 %, jusqu'à 20 %** | **100 points de base** par an |
| **Senior** | l'excès **au-delà de 20 %** | **10 points de base** par an |

**Le déroulement, pour un principal de 100 millions.** Principaux de tranche initiaux : **5 M**, **15 M**, **80 M**.

*Étape 1.* Les tranches gagnent initialement les spreads spécifiés sur ces nominaux.

*Étape 2 — après 1 an, des défauts entraînent des payoffs de **2 millions**.* **Les détenteurs de l'equity en sont responsables.** Le principal de la tranche equity tombe à **3 millions**, et son spread (1 000 pb) s'applique désormais sur **3 millions au lieu de 5**.

*Étape 3 — plus tard, **4 millions de payoffs supplémentaires**.* Le cumul des paiements exigés de l'equity est **5 millions** : **son principal résiduel devient ZÉRO**. Les détenteurs de la **mezzanine** doivent alors **1 million**, ce qui ramène leur principal résiduel à **14 millions**.

> **La règle générale :** *chaque tranche absorbe les pertes **au-delà de son point d'attachement et jusqu'à son point de détachement**, et son spread s'applique toujours sur le **principal RÉSIDUEL**, qui décroît à mesure des pertes.*

</details>

### 5.2 Tranches standard et *single-tranche trading*

*Une innovation du marché a été **la négociation d'une tranche SANS que le portefeuille sous-jacent de positions CDS courtes soit créé** : le ***single-tranche trading***. Il y a **deux parties** : l'acheteur et le vendeur de protection sur la tranche. **Le portefeuille de positions CDS sert de point de référence pour définir les flux entre les deux, mais il n'est PAS créé.***

**Les tranches standard** :

| Indice | Tranches (pertes couvertes) |
|---|---|
| **CDX NA IG** | **0-3 % · 3-6 % · 6-9 % · 9-12 % · 12-22 % · 22-100 %** |
| **iTraxx Europe** | **0-3 % · 3-7 % · 7-10 % · 10-15 % · 15-30 % · 30-100 %** |

**Table 24.6 — cotations mid-market des tranches iTraxx Europe 5 ans** *(source : Creditex Group Inc.)* :

| Date | 0-3 % | 3-6 % | 6-9 % | 9-12 % | 12-22 % | Indice iTraxx |
|---|---|---|---|---|---|---|
| **31 janvier 2007** | **10,34 %** | 41,59 | 11,95 | 5,60 | 2,00 | **23** |
| **31 janvier 2008** | **30,98 %** | 316,90 | 212,40 | 140,00 | 73,60 | **77** |
| **30 janvier 2009** | **64,28 %** | 1 185,63 | 606,69 | 315,63 | 97,13 | **165** |

⚠️ **Comment lire cette table.** *Les cotations sont **en points de base**, **sauf pour la tranche 0-3 %** où la cotation est le **pourcentage du principal de tranche à payer D'AVANCE, EN PLUS de 500 points de base par an**. Pour toutes les autres tranches, c'est le coût en points de base par an de l'achat de protection — **payé sur un principal qui DÉCLINE à mesure que la tranche subit des pertes**.*

> ⚠️ ***Quelle différence deux ans font sur les marchés du crédit !*** *L'indice iTraxx est passé de **23 points de base en janvier 2007 à 165 en janvier 2009**. **Une raison est que l'évaluation par le marché des probabilités de défaut des entreprises investment grade a augmenté. Mais il est AUSSI vrai que les vendeurs de protection connaissaient dans beaucoup de cas des problèmes de LIQUIDITÉ : ils sont devenus plus averses au risque et ont augmenté les primes de risque exigées.***

### 5.3 Le rôle de la corrélation — la section conceptuelle clé

> ***Le coût de la protection dans un $k$-ième-à-défaut CDS ou une tranche de CDO dépend de manière CRITIQUE de la corrélation de défaut.***

<details class="details--riche">
<summary>

**L'expérience de pensée sur 100 entités — recalculée**

</summary>

**Cadre.** 100 entités de référence, **5 ans**, chacune avec une probabilité **risque-neutre de 2 %** de faire défaut sur la période.

*Cas $\rho=0$ (indépendance)*, par la loi binomiale :

$$P(\text{au moins 1 défaut})=1-0{,}98^{100}=\mathbf{86{,}74\,\%}$$

$$P(\text{au moins 10 défauts})=\mathbf{0{,}0034\,\%}$$

> **Conséquence :** *un **first-to-default CDS est donc très précieux**, alors qu'un **tenth-to-default ne vaut presque rien**.*

*Cas $\rho$ croissant :* **la probabilité d'un ou plusieurs défauts DIMINUE** et **la probabilité de 10 défauts ou plus AUGMENTE**.

*Cas $\rho=1$ (corrélation parfaite) :*

$$P(\text{au moins 1})=P(\text{au moins 10})=\mathbf{2\,\%}$$

*parce que **dans cette situation extrême les entités sont essentiellement identiques : soit elles font TOUTES défaut (probabilité 2 %), soit AUCUNE (98 %)**.*

**La transposition aux tranches de CDO** :

| Corrélation | Tranche **equity** | Tranches **senior** |
|---|---|---|
| **faible** | **très risquée** | **très sûres** |
| **croissante** | **devient MOINS risquée** | **deviennent PLUS risquées** |
| **parfaite** (et $R=0$) | **toutes les tranches sont également risquées** |  |

**C'est le fait le plus important à retenir de tout le chapitre sur les CDO.**

</details>

## 🔴 Concept 6 — La valorisation d'un CDO synthétique

### 6.1 Les trois quantités $A$, $B$, $C$

Les dates de paiement sont $\tau_1,\tau_2,\dots,\tau_m$ avec $\tau_0=0$. On note $E_j$ le **principal de tranche espéré** en $\tau_j$ et $v(\tau)$ la valeur actuelle d'un dollar reçu en $\tau$. Le spread de la tranche est $s$ par an, payé **sur le principal résiduel**.

$$\boxed{A=\sum_{j=1}^{m}(\tau_j-\tau_{j-1})\,E_j\,v(\tau_j)}\;\text{(24.1)}\qquad\text{VA des paiements réguliers}=sA$$

La perte espérée entre $\tau_{j-1}$ et $\tau_j$ vaut $E_{j-1}-E_j$ ; **on suppose qu'elle survient au MILIEU de l'intervalle**, en $0{,}5\tau_{j-1}+0{,}5\tau_j$ :

$$\boxed{C=\sum_{j=1}^{m}(E_{j-1}-E_j)\,v(0{,}5\tau_{j-1}+0{,}5\tau_j)}\;\text{(24.2)}\qquad\text{VA des payoffs}$$

$$\boxed{B=\sum_{j=1}^{m}0{,}5(\tau_j-\tau_{j-1})(E_{j-1}-E_j)\,v(0{,}5\tau_{j-1}+0{,}5\tau_j)}\;\text{(24.3)}\qquad\text{paiement accru}=sB$$

$$\boxed{\text{Valeur pour l'acheteur de protection}=C-sA-sB}\qquad\Longrightarrow\qquad\boxed{s=\frac{C}{A+B}}\;\text{(24.4)}$$

> ⚠️ ***Ces équations montrent le rôle CLÉ joué par le PRINCIPAL DE TRANCHE ESPÉRÉ. Si l'on connaît $E_j$ à toutes les dates de paiement et la courbe des taux zéro-coupon, le spread d'équilibre se calcule directement.***

*(Pour la tranche **equity**, la cotation est le **paiement d'avance** en plus de 500 pb par an ; le paiement d'avance d'équilibre vaut $\boxed{C-0{,}05(A+B)}$.)*

### 6.2 Le modèle de marché standard

**Le modèle de copule gaussienne à un facteur** (fiche 95). Toutes les entreprises ont la même probabilité $Q(t)$ de défaut avant $t$ ; conditionnellement au facteur $F$ :

$$\boxed{Q(t\mid F)=N\!\left(\frac{N^{-1}[Q(t)]-\sqrt\rho\,F}{\sqrt{1-\rho}}\right)}\;\text{(24.5)}$$

Le taux de hasard est supposé **constant et cohérent avec le spread de l'indice** — on le trouve **en cherchant le $\lambda$ qui donne le spread de l'indice** par la méthode du §2 :

$$\boxed{Q(t)=1-e^{-\lambda t}}\;\text{(24.6)}$$

**La loi binomiale conditionnelle** — probabilité d'**exactement $k$ défauts** avant $t$, conditionnellement à $F$ :

$$\boxed{P(k,t\mid F)=\frac{n!}{(n-k)!\,k!}\,Q(t\mid F)^k\big[1-Q(t\mid F)\big]^{n-k}}\;\text{(24.7)}$$

### 6.3 Le principal de tranche

La tranche couvre les pertes entre $L$ (le **point d'attachement**) et $H$ (le **point de détachement**). On définit :

$$\boxed{n_L=\frac{Ln}{1-R}\qquad n_H=\frac{Hn}{1-R}}$$

et $m(x)$ = le plus petit entier **supérieur** à $x$. Avec un principal de tranche initial de 1 :

| Nombre de défauts $k$ | Principal de tranche |
|---|---|
| $k<m(n_L)$ | **1** (aucune perte n'a encore atteint la tranche) |
| $m(n_L)\leqslant k<m(n_H)$ | $\boxed{\dfrac{H-k(1-R)/n}{H-L}}$ |
| $k\geqslant m(n_H)$ | **0** (la tranche est entièrement consommée) |

$$\boxed{E_j(F)=\sum_{k=0}^{m(n_L)-1}P(k,\tau_j\mid F)+\sum_{k=m(n_L)}^{m(n_H)-1}P(k,\tau_j\mid F)\,\frac{H-k(1-R)/n}{H-L}}\;\text{(24.8)}$$

**Les versions conditionnelles de $A$, $B$, $C$** *(équations 24.9 à 24.11)* : identiques à (24.1)-(24.3) avec $E_j$ remplacé par $E_j(F)$.

### 6.4 L'intégration : la quadrature gaussienne

*$F$ suit une loi normale centrée réduite. **Pour obtenir les valeurs INCONDITIONNELLES de $A$, $B$ et $C$, il faut intégrer $A(F)$, $B(F)$ et $C(F)$ sur cette loi.***

$$\boxed{\int_{-\infty}^{+\infty}\frac{1}{\sqrt{2\pi}}e^{-F^2/2}\,g(F)\,dF\ \approx\ \sum_{k=1}^{M}w_k\,g(F_k)}\;\text{(24.12)}$$

*À mesure que $M$ augmente, la précision augmente. **Les $w_k$ et $F_k$ se calculent à partir des racines des polynômes d'Hermite.** Dans DerivaGem, $M$ vaut **deux fois** la variable « nombre de points d'intégration » ; **20 points d'intégration donnent généralement de bons résultats**.*

<details class="details--riche">
<summary>

**Exemple 24.2 — la tranche mezzanine d'iTraxx Europe, de bout en bout**

</summary>

**Données.** $\rho=0{,}15$, $R=40\,\%$, $L=0{,}03$, $H=0{,}06$, $n=125$. Courbe des taux plate à **3,5 %**, paiements **trimestriels**, spread de l'indice **50 points de base**, $M=60$.

*Étape 1 — les bornes en nombre de défauts :*

$$n_L=\frac{0{,}03\times125}{0{,}6}=\mathbf{6{,}25}\qquad n_H=\frac{0{,}06\times125}{0{,}6}=\mathbf{12{,}5}$$

donc $m(n_L)=7$ et $m(n_H)=13$ : **la tranche commence à être touchée au 7ᵉ défaut et est entièrement consommée au 13ᵉ**.

*Étape 2 — le taux de hasard.* Un calcul comme celui du §2 montre que le taux de hasard constant correspondant à un spread d'indice de 50 pb est

$$\lambda=\mathbf{0{,}83\,\%}\ \text{(composition continue)}$$

*Étape 3 — les principaux conditionnels* (extrait de la table 24.7) :

| $w_k$ | 0,1579 | 0,1579 | 0,1342 | 0,0969 |
|---|---|---|---|---|
| $F_k$ | **0,2020** | $\mathbf{-0{,}2020}$ | $\mathbf{-0{,}6060}$ | $\mathbf{-1{,}0104}$ |
| $E_1(F_k)$ | 1,0000 | 1,0000 | 1,0000 | 1,0000 |
| $E_{19}(F_k)$ | 0,9953 | 0,9687 | 0,8636 | **0,6134** |
| $E_{20}(F_k)$ | 0,9936 | 0,9600 | 0,8364 | **0,5648** |

> ⚠️ **Le mécanisme, visible dans cette table.** *Plus $F_k$ est **négatif** (mauvais état du monde), plus **le principal résiduel espéré s'effondre** : $E_{20}$ passe de **0,9936** pour $F=0{,}2020$ à **0,5648** pour $F=-1{,}0104$. **Toute la valeur de la tranche vient de ces états défavorables.***

| Quantité conditionnelle | $F=0{,}2020$ | $F=-0{,}2020$ | $F=-0{,}6060$ | $F=-1{,}0104$ |
|---|---|---|---|---|
| $A(F_k)$ (total) | 4,5624 | 4,5345 | 4,4080 | **4,0361** |
| $B(F_k)$ (total) | 0,0007 | 0,0043 | 0,0178 | **0,0478** |
| $C(F_k)$ (total) | 0,0055 | 0,0346 | 0,1423 | **0,3823** |

*Étape 4 — intégrer.* En posant $g(F)$ égal tour à tour à $A(F)$, $B(F)$, $C(F)$ dans (24.12) :

$$\boxed{A=4{,}2846\qquad B=0{,}0187\qquad C=0{,}1496}$$

*Étape 5 — le spread d'équilibre :*

$$s=\frac{0{,}1496}{4{,}2846+0{,}0187}=0{,}0348=\mathbf{348\ \text{points de base}}$$

</details>

### 6.5 La valorisation d'un $k$-ième-à-défaut CDS

*La probabilité **conditionnelle** que le $k$-ième défaut survienne entre $\tau_{j-1}$ et $\tau_j$ est **la probabilité d'avoir $k$ défauts ou plus avant $\tau_j$ MOINS la probabilité d'en avoir $k$ ou plus avant $\tau_{j-1}$*** :

$$\boxed{\sum_{q=k}^{n}P(q,\tau_j\mid F)-\sum_{q=k}^{n}P(q,\tau_{j-1}\mid F)}$$

*Les défauts entre $\tau_{j-1}$ et $\tau_j$ sont supposés survenir en $0{,}5\tau_{j-1}+0{,}5\tau_j$. **Cela permet de calculer les VA conditionnelles des paiements et des payoffs exactement comme pour un CDS ordinaire (§2). En intégrant sur $F$, on obtient les VA inconditionnelles.***

<details class="details--riche">
<summary>

**Exemple 24.3 — un third-to-default CDS sur 10 obligations**

</summary>

**Données.** 10 obligations ayant les probabilités de défaut de la table 24.1, paiements **annuels à terme échu**, $\rho=0{,}3$, $R=40\,\%$, taux sans risque **5 %**, $M=60$.

*Étape 1 — les probabilités cumulées inconditionnelles* (complément des survies de la table 24.1) :

$$0{,}0200\ \cdot\ 0{,}0396\ \cdot\ 0{,}0588\ \cdot\ 0{,}0776\ \cdot\ 0{,}0961$$

*Étape 2 — conditionner sur $F=-1{,}0104$* par (24.5). Exemple pour $t=1$ :

$$Q(1\mid F)=N\!\left(\frac{N^{-1}(0{,}02)-\sqrt{0{,}3}\times(-1{,}0104)}{\sqrt{0{,}7}}\right)=N\!\left(\frac{-2{,}0537+0{,}5534}{0{,}8367}\right)=N(-1{,}7933)=\mathbf{0{,}0365}$$

La suite complète :

$$0{,}0365\ \cdot\ 0{,}0754\ \cdot\ 0{,}1134\ \cdot\ 0{,}1498\ \cdot\ 0{,}1848$$

*Étape 3 — la binomiale.* Probabilité conditionnelle de **3 défauts ou plus** parmi 10, avant chaque année :

$$0{,}0048\ \cdot\ 0{,}0344\ \cdot\ 0{,}0950\ \cdot\ 0{,}1794\ \cdot\ 0{,}2767$$

*Étape 4 — les différences.* Probabilité conditionnelle que **le troisième défaut survienne PENDANT** chaque année :

$$0{,}0048\ \cdot\ 0{,}0296\ \cdot\ 0{,}0606\ \cdot\ 0{,}0844\ \cdot\ 0{,}0974$$

*Étape 5.* Une analyse comme celle du §2 donne alors les VA conditionnelles des paiements réguliers, des paiements accrus et des payoffs ; on intègre sur $F$ et on applique $s=C/(A+B)$.

</details>

## 🟠 Concept 7 — La corrélation implicite

### 7.1 Les deux mesures

*Dans le modèle standard, $R$ est habituellement supposé à **40 %**. **Cela laisse la corrélation de copule $\rho$ comme SEUL paramètre inconnu — ce qui rend le modèle similaire à Black-Scholes-Merton, où il n'y a qu'un inconnu, la volatilité.** Les participants aiment **impliquer une corrélation** des cotations de tranches, comme ils impliquent une volatilité des prix d'options.*

| Mesure | Définition |
|---|---|
| **Corrélation COMPOSÉE** (*compound correlation*) | pour une tranche $\{\alpha_{q-1},\alpha_q\}$, **la valeur de $\rho$ qui rend le spread du modèle égal au spread de marché**. Trouvée par recherche itérative |
| **Corrélation de BASE** (*base correlation*) | pour un $q>1$ donné, **la valeur de $\rho$ qui valorise la tranche $\{0,\alpha_q\}$ de façon cohérente avec le marché** |

<details class="details--riche">
<summary>

**Les quatre étapes du calcul d'une corrélation de base**

</summary>

| Étape | Contenu |
|---|---|
| **1** | Calculer la **corrélation composée** de chaque tranche |
| **2** | L'utiliser pour calculer **la VA de la perte espérée sur chaque tranche** pendant la vie du CDO, **en pourcentage du principal de tranche initial** — c'est **la variable $C$**. Noter $C_q$ celle de la tranche $\alpha_{q-1}$ à $\alpha_q$ |
| **3** | Calculer **la VA de la perte espérée sur la tranche $\{0,\alpha_q\}$ en pourcentage du principal TOTAL du portefeuille sous-jacent**, soit $\displaystyle\sum_{p=1}^{q}C_p(\alpha_p-\alpha_{p-1})$ |
| **4** | La valeur de $C$ pour la tranche $\{0,\alpha_q\}$ est la valeur de l'étape 3 **divisée par $\alpha_q$**. **La corrélation de base est le $\rho$ cohérent avec cette valeur de $C$**, trouvé par recherche itérative |

*Pour iTraxx Europe : $\alpha_0=0$, $\alpha_1=0{,}03$, $\alpha_2=0{,}06$, $\alpha_3=0{,}09$, $\alpha_4=0{,}12$, $\alpha_5=0{,}22$, $\alpha_6=1{,}00$.*

</details>

**Table 24.8 — corrélations implicites, tranches iTraxx Europe 5 ans, 31 janvier 2007** *(taux plats à 3 %, $R=40\,\%$ ; le spread de 23 pb implique un taux de hasard de **0,382 %**)* :

| Corrélations **composées** | 0-3 % | 3-6 % | 6-9 % | 9-12 % | 12-22 % |
|---|---|---|---|---|---|
|  | **17,7 %** | **7,8 %** | 14,0 % | 18,2 % | 23,3 % |

| Corrélations **de base** | 0-3 % | 0-6 % | 0-9 % | 0-12 % | 0-22 % |
|---|---|---|---|---|---|
|  | 17,7 % | 28,4 % | 36,5 % | 43,2 % | **60,5 %** |

> ⚠️ **Les deux formes, à savoir nommer.**
>
> - **Les corrélations composées présentent un SOURIRE (*correlation smile*)** : *quand la tranche devient plus senior, la corrélation implicite **DÉCROÎT D'ABORD puis CROÎT*** (17,7 → **7,8** → 14,0 → 18,2 → 23,3).
> - **Les corrélations de base présentent un SKEW** : *la corrélation implicite est une **fonction CROISSANTE du point de détachement*** (17,7 → 28,4 → 36,5 → 43,2 → 60,5).
>
> ***Si les prix de marché étaient cohérents avec le modèle de copule gaussienne à un facteur, les corrélations implicites (composées comme de base) seraient LES MÊMES pour toutes les tranches. Des sourires et skews aussi prononcés permettent d'inférer que les prix de marché NE SONT PAS cohérents avec ce modèle.***

### 7.2 Valoriser une tranche non standard

**Le problème.** Il faut coter la tranche **4-8 %** d'iTraxx Europe, qui n'est pas standard.

| Approche | Méthode | Verdict |
|---|---|---|
| **Indirecte** (l'ancienne) | **interpoler les corrélations de base** pour estimer celles des tranches 0-4 % et 0-8 %, en déduire les pertes espérées, faire la différence | *il est **maintenant reconnu que ce n'est pas la meilleure façon de procéder*** |
| **Directe** (la bonne) | calculer les pertes espérées **pour chaque tranche standard**, tracer la courbe de la perte espérée de la tranche **0-$X$ %** en fonction de $X$ (figure 24.3), **interpoler sur cette courbe** pour obtenir 0-4 % et 0-8 %, et faire la différence | ***bien meilleure*** |

**La raison, à connaître.** *Il peut être montré que **pour l'ABSENCE D'ARBITRAGE, les pertes espérées doivent croître à un rythme DÉCROISSANT**. **Si l'on interpole les corrélations de base puis qu'on en déduit les pertes espérées, cette condition de non-arbitrage n'est souvent PAS satisfaite** — le problème étant que **la corrélation de base d'une tranche 0-$X$ % est une fonction NON LINÉAIRE de la perte espérée de cette tranche**. L'approche directe peut de plus être menée **de façon à garantir la condition de non-arbitrage**.*

## 🟡 Concept 8 — Les alternatives au modèle standard

| Alternative | Principe | Verdict de Hull |
|---|---|---|
| **Modèle hétérogène** | relâcher l'hypothèse d'homogénéité : lois de temps jusqu'au défaut **différentes** par entreprise, corrélations **différentes** par paire | *plus compliqué à implémenter, car **$P(k,t\mid F)$ ne peut plus se calculer par la formule binomiale** ; il faut une procédure numérique (Andersen-Sidenius-Basu 2003, Hull-White 2004)* |
| **Autres copules** | copule de **Student**, de **Clayton**, **archimédienne**, de **Marshall-Olkin** ; ou faire suivre à $F$ et aux $Z_i$ des lois non normales de moyenne 0 et d'écart-type 1 | *Hull et White montrent qu'**un bon ajustement au marché est obtenu quand $F$ et les $Z_i$ suivent des lois de Student à 4 degrés de liberté** — la **« double $t$ copula »*** |
| **Plusieurs facteurs** | augmenter le nombre de facteurs | *le modèle est alors **beaucoup plus lent**, car il faut intégrer sur **plusieurs** lois normales* |
| **Chargements factoriels aléatoires** | Andersen et Sidenius : **$\rho$ devient une fonction de $F$**, croissant quand $F$ décroît — *dans les états du monde où le taux de défaut est élevé, la corrélation est aussi élevée* | *il y a des **preuves empiriques** que c'est le cas ; le modèle **ajuste les cotations bien mieux** que le modèle standard* |
| **Copule implicite** | Hull et White : impliquer la **loi de probabilité du taux de hasard moyen** des cotations de tranches | *conceptuellement similaire au calcul d'une **loi implicite** de prix d'action à partir des prix d'options (chapitre 19)* |

**Les modèles dynamiques.** *Les modèles précédents sont **STATIQUES** : ils modélisent l'environnement de défaut **moyen** sur la vie du CDO. **Le modèle construit pour un CDO 5 ans est différent de celui pour un 7 ans, lui-même différent de celui pour un 10 ans.** Les modèles **dynamiques** tentent de modéliser **l'ÉVOLUTION de la perte du portefeuille dans le temps**.*

| Type dynamique | Principe | Problème |
|---|---|---|
| **Structurels** | processus stochastiques des **actifs de nombreuses entreprises simultanément**, corrélés ; défaut quand le prix atteint une **barrière** | *doivent être implémentés par **Monte-Carlo** : **la calibration est difficile*** |
| **À forme réduite** | modéliser les **taux de hasard** | *il faut supposer des **SAUTS** dans les taux de hasard pour obtenir une corrélation réaliste* |
| ***Top down*** | modéliser **directement la perte TOTALE** du portefeuille | *ne considèrent pas ce qui arrive aux entreprises individuelles* |

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| Taux de hasard donné, spread demandé | les **trois blocs** $A$, $B$, $C$ puis $s=C/(A+B)$ |
| Spread donné, taux de hasard demandé | **recherche itérative** (Solver) sur la même mécanique |
| « ce CDS avait été conclu à $s_0$ pb » | **MtM** $=(A+B)s_0-C$ pour le **vendeur** |
| « payoff fixe de 1 dollar » | **CDS binaire** : remplacer $(1-R)$ par 1 dans le bloc $C$ |
| Spread d'un CDS ordinaire **et** d'un binaire | on peut estimer **$R$ ET la probabilité de défaut** |
| « coupon de $C$ pb, spread de $S$ pb » | $P=100-100D(S-C)$ |
| « 30/360 » | multiplier par $365/360$ pour passer en actual/actual |
| Points d'attachement et de détachement | $n_L=Ln/(1-R)$, $n_H=Hn/(1-R)$, principal $=\frac{H-k(1-R)/n}{H-L}$ |
| « corrélation de copule $\rho$ » | (24.5) puis la **binomiale conditionnelle** puis **quadrature** |
| « $k$-ième-à-défaut » | différence des **probabilités cumulées de $k$ défauts ou plus** |
| « la tranche equity » | la cotation est un **paiement d'avance** + 500 pb ; équilibre $C-0{,}05(A+B)$ |
| « corrélation implicite » | **composée** si tranche $\{\alpha_{q-1},\alpha_q\}$ ; **de base** si tranche $\{0,\alpha_q\}$ |
| Tranche non standard | interpoler **les pertes espérées**, pas les corrélations de base |

## Comment résoudre ce type d'exercice

**A — Le spread d'un CDS (le squelette).**

1. Construire la **table de survie et de défaut** à partir du taux de hasard : $d_k=\lambda\,v_{k-1}$, $v_k=v_{k-1}-d_k$.
2. **Bloc A** : $\sum_k v_k\,e^{-r t_k}$ aux dates de **paiement**.
3. **Bloc C** : $\sum_k d_k(1-R)\,e^{-r t_k^\ast}$ aux dates de **défaut** (mi-période).
4. **Bloc B** : $\sum_k d_k\times0{,}5\times e^{-rt_k^\ast}$ (l'accru).
5. $s=\dfrac{C}{A+B}$.
6. Contrôle : le spread doit être proche de $\lambda(1-R)$ pour de petites valeurs.

**B — Le principal espéré d'une tranche.**

1. Calculer $n_L$ et $n_H$ ; en déduire $m(n_L)$ et $m(n_H)$ **(le plus petit entier STRICTEMENT supérieur)**.
2. Pour chaque $F_k$ de la quadrature, calculer $Q(t\mid F_k)$ par (24.5).
3. Calculer $P(k,t\mid F)$ par la binomiale.
4. Sommer selon (24.8) : **poids 1** en dessous de $m(n_L)$, **poids fractionnaire** entre les deux, **poids 0** au-dessus.
5. En déduire $A(F)$, $B(F)$, $C(F)$, puis intégrer par $\sum_kw_kg(F_k)$.

**C — Un $k$-ième-à-défaut CDS.**

1. Probabilités cumulées inconditionnelles $Q(t_j)$.
2. Conditionner par (24.5) sur chaque $F_k$.
3. Binomiale : $\sum_{q\geqslant k}P(q,t_j\mid F)$.
4. **Différencier** entre dates successives → probabilité que le $k$-ième défaut tombe dans l'intervalle.
5. Appliquer la mécanique du CDS ordinaire, puis intégrer.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Oublier le **paiement accru** en cas de défaut | il ajoute $B$ au dénominateur : ici $4{,}0704\to4{,}1130$ |
| Actualiser les payoffs aux dates de **paiement** | les défauts sont supposés **à mi-période** : facteurs 0,9753, 0,9277, … |
| Utiliser des probabilités **réelles** pour valoriser un CDS | il faut les **risque-neutres** |
| Confondre taux de hasard **annuel** et **continu** | $2\,\%$ annuel $\equiv-\ln(0{,}98)=2{,}02\,\%$ continu |
| Croire que le CDS est très sensible à $R$ | **non**, si le **même** $R$ sert des deux côtés — mais **oui** pour un CDS **binaire** |
| Croire que l'indice est exactement la moyenne des spreads | il est **légèrement inférieur** : les gros spreads portent **moins de poids** |
| Oublier $\times365/360$ pour une cotation 30/360 | 34 pb 30/360 $=0{,}345\,\%$ actual/actual |
| Se tromper de sens du paiement initial | $P>100$ ⇒ **le VENDEUR paie l'acheteur** |
| Appliquer le spread de tranche au principal **initial** | il s'applique au **principal RÉSIDUEL**, qui décroît |
| Croire qu'une corrélation élevée est toujours mauvaise | elle **réduit** le risque de la tranche **equity** et **augmente** celui des **senior** |
| Croire qu'un *tenth-to-default* vaut beaucoup avec $\rho=0$ | il vaut **presque rien** : $P=0{,}0034\,\%$ |
| Oublier que $m(x)$ est le plus petit entier **strictement supérieur** | avec $n_L=6{,}25$, $m(n_L)=\mathbf7$, pas 6 |
| Interpoler les **corrélations de base** pour une tranche non standard | interpoler **les pertes espérées** — sinon la condition de **non-arbitrage** est violée |
| Croire que le modèle standard ajuste le marché | les **sourires** et **skews** prouvent le contraire |
| Croire qu'un CDS exige de posséder l'actif | **non** — c'est la différence clé avec une assurance |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Croissance du marché** | 800 milliards (2000) → **32 000 milliards** (déc. 2009) |
| **Payoff d'un CDS** | $L(1-R)$ |
| **Événement de crédit** | **défaut de paiement**, **restructuration**, ou **faillite** |
| **Dates standard** | 20 mars · 20 juin · 20 sept. · 20 déc. |
| **Différence avec l'assurance** | **l'actif n'a pas à être possédé** |
| **Base CDS-obligation** | spread de CDS − asset swap spread ; **≈ 0** en théorie |
| **Lehman** | 400 Md de CDS, 155 Md de dette, payout **91,375 %** |
| **Bloc A** | $\sum(\text{survie})\,e^{-rt}=\mathbf{4{,}0704\,s}$ |
| **Bloc B** | $\sum(\text{défaut})\times0{,}5\times e^{-rt^\ast}=\mathbf{0{,}0426\,s}$ |
| **Bloc C** | $\sum(\text{défaut})(1-R)e^{-rt^\ast}=\mathbf{0{,}0511}$ |
| **Spread** | $s=C/(A+B)=0{,}0511/4{,}1130=\mathbf{124\ \text{pb}}$ |
| **MtM à 150 pb** | $+0{,}0106$ pour le **vendeur** |
| **CDS binaire** | $C=0{,}0852$ → $s=\mathbf{207\ \text{pb}}$ |
| **Hazard pour 100 pb** | **1,61 %** annuel = 1,626 % continu |
| **Sensibilité à $R$** | **faible** pour un CDS ordinaire, **forte** pour un binaire |
| **Indices** | **CDX NA IG** et **iTraxx Europe**, **125 noms** chacun |
| **Mise à jour** | **20 mars et 20 septembre** |
| **Prix avec coupon fixe** | $P=100-100\,D\,(S-C)$ |
| **Exemple 24.1** | $P=\mathbf{100{,}27}$, paiement initial du **vendeur** = 337 500 |
| **Forward CDS** | **cesse d'exister** si défaut avant $T$ |
| **$k$-th-to-default** | payoff au **$k$-ième** défaut seulement, puis **terminaison** |
| **Total return swap** | rendement total **contre LIBOR + spread** ; outil de **financement** |
| **Le spread du TRS dépend de** | crédit du **receveur**, crédit de **l'émetteur**, et leur **corrélation** |
| **CDO synthétique** | vendre des CDS, découper les pertes ; **aucun investissement initial** (mais collatéral) |
| **Tranches iTraxx** | 0-3 · 3-7 · 7-10 · 10-15 · 15-30 · 30-100 % |
| **Tranches CDX** | 0-3 · 3-6 · 6-9 · 9-12 · 12-22 · 22-100 % |
| **Cotation 0-3 %** | **paiement d'avance** en % + **500 pb** par an |
| **Indice iTraxx 2007 → 2009** | **23 pb → 165 pb** |
| **100 noms à 2 %, $\rho=0$** | $P(\geqslant1)=\mathbf{86{,}74\,\%}$ · $P(\geqslant10)=\mathbf{0{,}0034\,\%}$ |
| **$\rho=1$** | $P(\geqslant1)=P(\geqslant10)=\mathbf{2\,\%}$ |
| **$\rho\uparrow$** | equity **moins** risquée, senior **plus** risquées |
| **$A$** | $\sum(\tau_j-\tau_{j-1})E_jv(\tau_j)$ |
| **$C$** | $\sum(E_{j-1}-E_j)v(\text{milieu})$ |
| **$B$** | $\sum0{,}5(\tau_j-\tau_{j-1})(E_{j-1}-E_j)v(\text{milieu})$ |
| **Spread de tranche** | $s=C/(A+B)$ ; equity : $C-0{,}05(A+B)$ |
| **Bornes en défauts** | $n_L=Ln/(1-R)$, $n_H=Hn/(1-R)$ |
| **Principal résiduel** | $\dfrac{H-k(1-R)/n}{H-L}$ |
| **Binomiale conditionnelle** | $\binom{n}{k}Q(t\mid F)^k[1-Q(t\mid F)]^{n-k}$ |
| **Intégration** | **quadrature gaussienne**, polynômes d'**Hermite**, 20 points suffisent |
| **Exemple 24.2** | $n_L=6{,}25$, $n_H=12{,}5$, $\lambda=0{,}83\,\%$, $A=4{,}2846$, $B=0{,}0187$, $C=0{,}1496$ → **348 pb** |
| **Exemple 24.3** | conditionnelles 0,0365 … 0,1848 ; $P(\geqslant3)$ 0,0048 … 0,2767 |
| **Corrélation composée** | ajuste **une** tranche $\{\alpha_{q-1},\alpha_q\}$ → **SOURIRE** |
| **Corrélation de base** | ajuste la tranche $\{0,\alpha_q\}$ → **SKEW croissant** |
| **iTraxx 31 janv. 2007** | composées 17,7 / **7,8** / 14,0 / 18,2 / 23,3 % |
| **Bases** | 17,7 / 28,4 / 36,5 / 43,2 / **60,5 %** |
| **Ce que le smile prouve** | **les prix de marché ne sont PAS cohérents avec le modèle standard** |
| **Tranche non standard** | interpoler **les pertes espérées**, pas les corrélations |
| **Condition de non-arbitrage** | les pertes espérées croissent à un rythme **décroissant** |
| **Meilleure copule alternative** | la **double $t$** (Student à **4** degrés de liberté) |
| **Trois modèles dynamiques** | **structurels** · **forme réduite** · ***top down*** |

## 🧠 Active Recall

1. De combien le marché des dérivés de crédit a-t-il crû entre 2000 et décembre 2009 ?
2. Distinguer dérivé de crédit *single-name* et *multi-name*, avec un exemple de chaque.
3. Qui a été acheteur net de protection ? vendeur net ? Pourquoi ?
4. Définir entité de référence, événement de crédit, nominal notionnel, spread de CDS.
5. Détailler les flux d'un CDS 5 ans de 100 M à 90 pb, sans défaut.
6. Que se passe-t-il en cas d'événement de crédit, en livraison physique et en espèces ?
7. Qu'est-ce que le paiement accru final, et pourquoi existe-t-il ?
8. Que signifie une cotation « bid 250 / offer 260 » ?
9. Quelles sont les quatre dates standard de maturité ? Quelle conséquence ?
10. Citer les trois définitions d'un événement de crédit.
11. Quelle est la différence clé entre un CDS et un contrat d'assurance ?
12. Qu'est-il arrivé à AIG, et pourquoi ?
13. Quels étaient les montants de CDS et de dette Lehman ? Quel a été le payout ?
14. Dérouler l'argument d'arbitrage reliant spread de CDS et excès de rendement obligataire.
15. Définir la base CDS-obligation. Quel était son signe avant et pendant la crise ?
16. Qu'est-ce que l'option de l'obligation la moins chère à livrer ? D'où vient-elle ?
17. Construire la table 24.1 à partir d'un taux de hasard de 2 %.
18. Quel est le taux de hasard continu équivalent ?
19. Construire le bloc A et détailler la ligne 3.
20. Construire le bloc C et détailler la ligne 2,5.
21. Construire le bloc B. Pourquoi le facteur 0,5 ?
22. Calculer le spread d'équilibre.
23. Quelles hypothèses simplificatrices le calcul fait-il ?
24. Calculer le MtM d'un CDS conclu à 150 pb, pour le vendeur puis pour l'acheteur.
25. Quelles probabilités de défaut faut-il utiliser, et pourquoi ?
26. Quel taux de hasard un spread de 100 pb implique-t-il ?
27. Qu'est-ce qu'un CDS binaire ? Refaire la table 24.5.
28. Quel spread obtient-on ? Quel est son rapport au spread ordinaire ?
29. Pourquoi la valeur d'un CDS ordinaire est-elle peu sensible à $R$ ?
30. Pourquoi cet argument tombe-t-il pour un CDS binaire ? Que peut-on en tirer ?
31. Quels sont les deux portefeuilles standard, et leur composition ?
32. Quand sont-ils mis à jour, et selon quel critère ?
33. Calculer le coût annuel de 800 000 de protection sur chacun des 125 noms à 66 pb.
34. De combien le paiement annuel est-il réduit quand une entreprise fait défaut ?
35. Pourquoi l'indice est-il légèrement inférieur à la moyenne des spreads ?
36. Décrire les quatre étapes du calcul du prix avec coupon fixe.
37. Qu'est-ce que la durée $D$ dans ce calcul ?
38. Quel est l'intérêt du mécanisme de coupon fixe ?
39. Qu'est-ce que le nominal résiduel, pour un CDS puis pour un indice ?
40. Refaire l'exemple 24.1 en entier.
41. Qui paie qui au départ dans l'exemple 24.1, et pourquoi ?
42. Qu'est-ce qu'un forward CDS ? Que se passe-t-il si l'entité fait défaut avant $T$ ?
43. Distinguer call et put sur CDS.
44. Distinguer *add-up basket*, *first-to-default* et $k$-ième-à-défaut.
45. Décrire les flux d'un total return swap.
46. Que se passe-t-il en cas de défaut sur l'obligation ?
47. Comment caractériser proprement le TRS en ajoutant le nominal des deux côtés ?
48. Pourquoi le TRS est-il un outil de financement, et quel avantage a le payeur ?
49. De quoi dépend le spread sur LIBOR du TRS ?
50. Distinguer cash CDO et CDO synthétique sur cinq points.
51. Dérouler l'exemple à trois tranches avec 2 M puis 4 M de payoffs.
52. Qu'est-ce que le *single-tranche trading* ?
53. Citer les six tranches standard de chacun des deux indices.
54. Comment se lit la cotation de la tranche 0-3 % ?
55. De combien l'indice iTraxx a-t-il bougé entre janvier 2007 et janvier 2009 ? Deux raisons ?
56. Calculer $P(\geqslant1)$ et $P(\geqslant10)$ pour 100 noms à 2 % avec $\rho=0$.
57. Que deviennent ces probabilités quand $\rho\to1$ ? Pourquoi ?
58. Quel est l'effet d'une hausse de $\rho$ sur la tranche equity ? sur la senior ?
59. Écrire $A$, $B$, $C$ et le spread d'équilibre d'une tranche.
60. Quelle est la formule du paiement d'avance d'équilibre pour l'equity ?
61. Écrire (24.5) et (24.6).
62. Écrire la binomiale conditionnelle.
63. Définir $n_L$, $n_H$, et $m(x)$.
64. Écrire les trois régimes du principal de tranche.
65. Écrire (24.8).
66. Qu'est-ce que la quadrature gaussienne ? D'où viennent $w_k$ et $F_k$ ?
67. Combien de points d'intégration suffisent en pratique ?
68. Refaire l'exemple 24.2 : $n_L$, $n_H$, $m(n_L)$, $m(n_H)$, le spread.
69. Que montre l'évolution de $E_{20}(F_k)$ quand $F_k$ décroît ?
70. Comment valorise-t-on un $k$-ième-à-défaut CDS ?
71. Refaire les quatre lignes de l'exemple 24.3.
72. Pourquoi le modèle standard ressemble-t-il à Black-Scholes-Merton ?
73. Définir corrélation composée et corrélation de base.
74. Décrire les quatre étapes du calcul d'une corrélation de base.
75. Quelle forme prennent les corrélations composées ? les corrélations de base ?
76. Qu'infère-t-on de ces formes ?
77. Comment valoriser une tranche 4-8 % ? Quelle méthode est meilleure et pourquoi ?
78. Quelle est la condition de non-arbitrage sur les pertes espérées ?
79. Citer cinq alternatives au modèle standard.
80. Quels sont les trois types de modèles dynamiques et leurs limites ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Nominal notionnel des dérivés de crédit en 2009 ? | **32 000 milliards** de dollars |
| Dérivé single-name le plus populaire ? | Le **credit default swap** |
| Dérivé multi-name le plus populaire ? | Le **collateralized debt obligation** |
| Acheteurs nets de protection ? | Les **banques** |
| Vendeurs nets ? | Les **compagnies d'assurance** |
| Pourquoi ? | Elles ne sont **pas régulées de la même façon** |
| Entité de référence ? | L'entreprise (ou pays) sur laquelle porte le CDS |
| Événement de crédit ? | **Défaut de paiement**, **restructuration**, ou **faillite** |
| Payoff d'un CDS ? | $L(1-R)$ |
| Fréquence usuelle des paiements ? | **Trimestriels, à terme échu** |
| Maturité la plus populaire ? | **5 ans** |
| Dates standard ? | 20 mars, 20 juin, 20 sept., 20 déc. |
| Qui détermine le prix de règlement ? | Une **enchère organisée par l'ISDA** |
| Paiement accru final ? | Le prorata **depuis la dernière date de paiement** |
| Année du contrat standard ISDA ? | **1998-1999** |
| Différence clé avec une assurance ? | **L'actif n'a pas à être possédé** |
| Le gros vendeur de protection AAA ? | **AIG**, renflouée par le gouvernement américain |
| CDS Lehman en circulation ? | **400 milliards** contre **155 milliards** de dette |
| Payout Lehman ? | **91,375 %** du principal |
| Base CDS-obligation ? | Spread de CDS − **asset swap spread** |
| Sa valeur théorique ? | **Proche de zéro** |
| Son signe pendant la crise ? | **Négatif**, très négatif en janvier 2009 |
| Option de la moins chère à livrer ? | Plusieurs obligations livrables aux **prix différents** |
| Pourquoi ces prix diffèrent-ils ? | **Intérêts courus** différents · traitement inégal en réorganisation |
| Taux de hasard 2 % annuel en continu ? | $-\ln(0{,}98)=\mathbf{2{,}02\,\%}$ |
| Survie à 2 ans avec 2 % ? | $0{,}98^2=\mathbf{0{,}9604}$ |
| Défaut pendant l'année 3 ? | $0{,}02\times0{,}9604=\mathbf{0{,}0192}$ |
| Bloc A total ? | $\mathbf{4{,}0704\,s}$ |
| Bloc B total ? | $\mathbf{0{,}0426\,s}$ |
| Bloc C total ? | **0,0511** |
| Où surviennent les défauts ? | **À mi-période** |
| Spread d'équilibre ? | $0{,}0511/4{,}1130=\mathbf{124\ \text{pb}}$ |
| MtM d'un CDS à 150 pb, vendeur ? | $\mathbf{+0{,}0106}$ × principal |
| Probabilités à utiliser ? | **Risque-neutres** |
| Trois sources ? | Prix d'obligations · **asset swaps** · cotations de **CDS** |
| Hazard implicite pour 100 pb ? | **1,61 %** annuel |
| CDS binaire ? | Payoff **fixe** de 1 dollar |
| Son bloc C ? | **0,0852** |
| Son spread ? | **207 pb** |
| Rapport avec 124 pb ? | $124/(1-R)=124/0{,}6=207$ |
| Sensibilité d'un CDS ordinaire à $R$ ? | **Faible** — les deux effets **s'annulent** |
| Pourquoi ? | Probabilités $\propto1/(1-R)$, payoffs $\propto(1-R)$ |
| Pour un binaire ? | **Forte** — les payoffs sont **indépendants** de $R$ |
| Que permet la paire ordinaire + binaire ? | Estimer **$R$ ET la probabilité** |
| CDX NA IG ? | **125** noms investment grade d'**Amérique du Nord** |
| iTraxx Europe ? | **125** noms investment grade **européens** |
| Mise à jour ? | **20 mars** et **20 septembre** |
| Coût de 800 000 sur 125 noms à 66 pb ? | **660 000 dollars par an** |
| Réduction du paiement par défaut ? | $660\,000/125=\mathbf{5\,280}$ |
| Indice contre moyenne des spreads ? | **Légèrement inférieur** |
| Pourquoi ? | Les **gros spreads** ne sont pas payés aussi **longtemps** |
| Formule du prix ? | $P=100-100\,D\,(S-C)$ |
| Que vaut $D$ ? | La **durée** — le multiplicateur du spread (ex. 4,1130) |
| Intérêt du coupon fixe ? | Les paiements réguliers sont **indépendants du spread d'entrée** |
| Nominal résiduel d'un indice ? | Les noms **non encore en défaut** × principal par nom |
| 34 pb en 30/360 → actual/actual ? | $\times365/360=\mathbf{0{,}345\,\%}$ |
| Prix de l'exemple 24.1 ? | **100,27** |
| Qui paie au départ ? | **Le VENDEUR** de protection (car $P>100$) |
| Combien ? | $1\,000\,000\times125\times0{,}0027=\mathbf{337\,500}$ |
| Forward CDS ? | **Obligation** d'entrer dans un CDS en $T$ |
| Que se passe-t-il si défaut avant $T$ ? | Le contrat **cesse d'exister** |
| Call sur CDS ? | Droit d'**acheter** la protection |
| Add-up basket ? | Payoff si **n'importe laquelle** fait défaut |
| First-to-default ? | Payoff au **premier** défaut seulement |
| Après le défaut pertinent ? | Le swap **se termine** |
| Total return swap ? | Rendement **total** contre **LIBOR + spread** |
| Ce que le rendement total inclut ? | Coupons, intérêts, **ET le gain ou la perte** |
| Si l'obligation monte de 10 % ? | Le **payeur** verse 10 millions |
| Si défaut ? | Le **receveur** verse l'excès du nominal sur la valeur de marché |
| Usage principal ? | Un outil de **FINANCEMENT** |
| Avantage du payeur ? | Il **garde la propriété** — pas de problème de collatéral |
| De quoi dépend son spread ? | Crédit du receveur, de l'émetteur, et leur **corrélation** |
| Analogue de marché ? | Le **repo** |
| Cash CDO ? | Créé d'un **portefeuille d'obligations acheté** |
| CDO synthétique ? | Créé en **vendant des CDS** |
| Investissement initial d'un synthétique ? | **Aucun** — mais collatéral déposé |
| Rémunération du collatéral ? | **LIBOR** |
| Spread de tranche appliqué à quoi ? | Le principal **RÉSIDUEL** |
| Tranches CDX ? | 0-3 · 3-6 · 6-9 · 9-12 · 12-22 · 22-100 % |
| Tranches iTraxx ? | 0-3 · 3-7 · 7-10 · 10-15 · 15-30 · 30-100 % |
| Cotation de la 0-3 % ? | **Paiement d'avance en %** + **500 pb** par an |
| Single-tranche trading ? | La tranche se négocie **sans créer** le portefeuille CDS |
| iTraxx janvier 2007 ? | **23 pb** |
| iTraxx janvier 2009 ? | **165 pb** |
| Deux raisons de la hausse ? | Probabilités de défaut ↑ · **problèmes de liquidité** des vendeurs |
| 100 noms à 2 %, $\rho=0$ : $P(\geqslant1)$ ? | **86,74 %** |
| $P(\geqslant10)$ ? | **0,0034 %** |
| Avec $\rho=1$ ? | Les deux valent **2 %** |
| Pourquoi ? | Les entités deviennent **essentiellement identiques** |
| $\rho\uparrow$ : tranche equity ? | **Moins risquée** |
| $\rho\uparrow$ : tranche senior ? | **Plus risquée** |
| Si $\rho=1$ et $R=0$ ? | Toutes les tranches sont **également risquées** |
| Formule de $A$ ? | $\sum(\tau_j-\tau_{j-1})E_jv(\tau_j)$ |
| Formule de $C$ ? | $\sum(E_{j-1}-E_j)v(\text{milieu})$ |
| Formule de $B$ ? | $\sum0{,}5(\tau_j-\tau_{j-1})(E_{j-1}-E_j)v(\text{milieu})$ |
| Spread d'équilibre ? | $C/(A+B)$ |
| Pour l'equity ? | $C-0{,}05(A+B)$ |
| Que vaut $n_L$ ? | $Ln/(1-R)$ |
| Que vaut $m(x)$ ? | Le plus petit entier **strictement supérieur** à $x$ |
| Principal résiduel intermédiaire ? | $\dfrac{H-k(1-R)/n}{H-L}$ |
| Méthode d'intégration ? | La **quadrature gaussienne** |
| D'où viennent $w_k$ et $F_k$ ? | Des racines des polynômes d'**Hermite** |
| Combien de points suffisent ? | **20** points d'intégration |
| Ex. 24.2 : $n_L$ et $n_H$ ? | **6,25** et **12,5** |
| Ex. 24.2 : $\lambda$ ? | **0,83 %** continu |
| Ex. 24.2 : $A$, $B$, $C$ ? | **4,2846** · **0,0187** · **0,1496** |
| Ex. 24.2 : spread ? | **348 points de base** |
| Ex. 24.3 : conditionnelles à $F=-1{,}0104$ ? | 0,0365 · 0,0754 · 0,1134 · 0,1498 · 0,1848 |
| Ex. 24.3 : $P(\geqslant3)$ ? | 0,0048 · 0,0344 · 0,0950 · 0,1794 · 0,2767 |
| $k$-ième-à-défaut, méthode ? | **Différencier** les $P(\geqslant k)$ entre dates |
| Recouvrement supposé du modèle standard ? | **40 %** |
| Seul paramètre inconnu ? | La **corrélation de copule** $\rho$ |
| Analogue Black-Scholes ? | La **volatilité implicite** |
| Corrélation composée ? | Celle qui ajuste **une** tranche $\{\alpha_{q-1},\alpha_q\}$ |
| Corrélation de base ? | Celle qui ajuste la tranche $\{0,\alpha_q\}$ |
| Forme des composées ? | Un **SOURIRE** (17,7 → **7,8** → 23,3 %) |
| Forme des bases ? | Un **SKEW croissant** (17,7 → **60,5 %**) |
| Ce que cela prouve ? | **Les prix ne sont pas cohérents avec le modèle standard** |
| Tranche non standard : bonne méthode ? | Interpoler **les pertes espérées** |
| Mauvaise méthode ? | Interpoler les **corrélations de base** |
| Pourquoi ? | La base est une fonction **non linéaire** de la perte |
| Condition de non-arbitrage ? | Pertes espérées croissantes **à rythme décroissant** |
| Problème du modèle hétérogène ? | **Plus de formule binomiale** |
| Meilleure copule alternative ? | La **double $t$** (Student, **4** ddl) |
| Chargements factoriels aléatoires ? | $\rho$ **croît quand $F$ décroît** |
| Limite des multi-facteurs ? | **Beaucoup plus lent** |
| Copule implicite ? | Impliquer la **loi du taux de hasard moyen** |
| Modèles statiques contre dynamiques ? | Environnement **moyen** contre **évolution** de la perte |
| Les trois dynamiques ? | **Structurels** · **forme réduite** · ***top down*** |
| Problème des structurels ? | **Monte-Carlo** → calibration difficile |
| Problème des formes réduites ? | Il faut des **sauts** dans les taux de hasard |
