# Fiche 93 — Value at Risk : simulation historique, modèle linéaire, modèle quadratique, ACP

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Gestion des risques |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 21 « Value at Risk » |
| **Difficulté** | Must know — la mesure de risque des régulateurs et des salles de marché |
| **Temps d'étude estimé** | 1 h 50 |
| **Prérequis** | Fiches 77 (taux, duration), 87 (Black-Scholes), 90 (grecques), 92 (Monte-Carlo) — et fiche 55 (VaR vue par MIT 15.450, complémentaire) |
| **Concepts clés** | Mesure VaR, horizon et niveau de confiance, règle en $\sqrt{N}$, expected shortfall, simulation historique, volatilité quotidienne, modèle linéaire, matrice de variance-covariance, *cash-flow mapping*, modèle quadratique, expansion de Cornish-Fisher, Monte-Carlo, stress testing, back testing, analyse en composantes principales |
| **Poids à l'examen** | La **règle $\text{VaR}_N=\text{VaR}_1\sqrt N$** · le **5ᵉ pire scénario** sur 500 · $\sigma_P^2=\sum\sum\rho_{ij}\alpha_i\alpha_j\sigma_i\sigma_j$ · $\alpha_i=S_i\delta_i$ pour les options · l'**exposition aux facteurs** de l'ACP. |

## 🎯 Vue d'ensemble

```
LA PHRASE À PRODUIRE
  « Je suis certain à X % qu'il n'y aura pas de perte supérieure à V dollars
    dans les N prochains jours. »       V = VaR      (N, X) = les deux paramètres
  VaR = perte du (100−X)-ième PERCENTILE de la distribution du GAIN

DEUX FAMILLES DE MÉTHODES
  SIMULATION HISTORIQUE   le passé fournit la loi jointe — 501 jours → 500 scénarios
  APPROCHE MODÈLE         on POSTULE une loi normale multivariée + une relation ΔP(Δx)
        └ linéaire     ΔP = Σ αᵢΔxᵢ            → σ_P analytique
        └ quadratique  + ½ΣΣ SᵢSⱼγᵢⱼΔxᵢΔxⱼ     → Cornish-Fisher ou Monte-Carlo
        └ Monte-Carlo  revalorisation complète  → n'importe quel percentile

LES CONSTANTES À CONNAÎTRE
  N(−2,33) = 0,01 → 99 %      N(−1,65) = 0,05 → 95 %      σ_jour = σ_an/√252
  VaR à N jours = VaR à 1 jour × √N          Bâle : capital = k × VaR 10j 99 %, k ≥ 3
  3 × √10 = 9,49 × VaR 1 jour 99 %

ACP SUR LA COURBE DES TAUX   PC1 translation 83,1 % · PC2 pentification · PC3 courbure
```

**Le problème que la VaR résout, énoncé d'entrée.** *Une institution financière calcule chaque jour delta, gamma et vega pour **chacune** des variables de marché auxquelles elle est exposée. Il y en a souvent des **centaines, voire des milliers**. Une analyse delta-gamma-vega produit donc chaque jour un très grand nombre de mesures de risque différentes. Ces mesures sont précieuses pour les traders, **mais elles ne fournissent aucun moyen de mesurer le risque TOTAL** auquel l'institution est exposée.* La VaR est **une tentative de fournir un nombre unique résumant le risque total** d'un portefeuille d'actifs financiers.

## 🔴 Concept 1 — La mesure VaR : définition, horizon, faiblesse

### 1.1 La définition exacte

> ***Je suis certain à $X$ pour cent qu'il n'y aura pas de perte supérieure à $V$ dollars dans les $N$ prochains jours.***

La variable $V$ **est** la VaR du portefeuille. C'est une fonction de **deux paramètres** : l'horizon temporel ($N$ jours) et le niveau de confiance ($X$ %). C'est **le niveau de perte sur $N$ jours qui a une probabilité de seulement $(100-X)\%$ d'être dépassé**.

$$\boxed{\text{VaR}=\text{la perte correspondant au }(100-X)\text{-ième percentile de la loi du GAIN du portefeuille sur }N\text{ jours}}$$

⚠️ **Le piège de signe, écrit noir sur blanc par Hull.** *Quand on regarde la **loi du gain**, une perte est un gain **négatif** et la VaR concerne la **queue GAUCHE** de la distribution. Quand on regarde la **loi de la perte**, un gain est une perte **négative** et la VaR concerne la queue **DROITE**.* Les deux lectures sont équivalentes ; il faut seulement savoir laquelle on utilise avant de chercher un percentile.

| Paramètres | Ce qu'on cherche |
|---|---|
| $N=5$, $X=97$ | le **3ᵉ percentile** de la loi du gain sur 5 jours |
| $N=10$, $X=99$ | le **1ᵉʳ percentile** sur 10 jours — **l'exigence des régulateurs bancaires** |
| $N=1$, $X=99$ | le point de départ pratique de tout calcul (voir §1.2) |

**Pourquoi la VaR a gagné.** *C'est une mesure séduisante parce qu'elle est **facile à comprendre**. Au fond, elle pose la question simple « **jusqu'où les choses peuvent-elles mal tourner ?** ». C'est la question à laquelle tous les dirigeants veulent une réponse. Ils sont très à l'aise avec l'idée de **compresser toutes les lettres grecques de toutes les variables de marché sous-jacentes en un nombre unique**.*

### 1.2 L'horizon temporel et la règle en racine

*En pratique, les analystes posent presque toujours $N=1$ **en premier lieu**. La raison : **il n'y a pas assez de données pour estimer directement le comportement des variables de marché sur des périodes plus longues qu'un jour**.* L'hypothèse usuelle est alors :

$$\boxed{\text{VaR à }N\text{ jours}=\text{VaR à 1 jour}\times\sqrt N}$$

> ⚠️ ***Cette formule est exactement vraie lorsque les variations de la valeur du portefeuille sur des jours successifs suivent des lois normales indépendantes et identiques de moyenne nulle. Dans les autres cas, c'est une approximation.***

**L'application réglementaire.** L'amendement de 1996 à Bâle I exigeait que le capital d'une banque au titre du risque de marché soit au moins **trois fois la VaR à 10 jours à 99 %**. Vu la façon dont la VaR à 10 jours est calculée, cela revient à :

$$3\times\sqrt{10}=9{,}49\ \text{fois la VaR à 1 jour à 99 \%}$$

<details class="details--riche">
<summary>

**Business Snapshot 21.1 — comment les régulateurs utilisent la VaR**

</summary>

Le **Comité de Bâle sur le contrôle bancaire** réunit régulièrement les régulateurs bancaires du monde à Bâle, en Suisse.

| Date | Texte | Contenu |
|---|---|---|
| **1988** | **Bâle I** | accord sur le calcul du capital exigé pour le **risque de crédit** |
| **1996** (appliqué **1998**) | **The 1996 Amendment** | exige du capital pour le **risque de marché** aussi |
| après **2007** | révision | les règles sont révisées à la suite de la crise du crédit |

L'amendement distingue deux livres :

|  | **Banking book** | **Trading book** |
|---|---|---|
| Contenu | principalement des **prêts** | la myriade d'instruments **négociés** par la banque (actions, obligations, swaps, forwards, options…) |
| Revalorisation | **pas** revalorisé régulièrement pour des besoins de gestion et de comptabilité | revalorisé **quotidiennement** |

Le capital du trading book se calcule avec $N=10$ et $X=99$ : la perte de revalorisation sur 10 jours **qui n'est censée être dépassée que 1 % du temps**. Le capital exigé est $k$ fois cette VaR (avec un ajustement pour ce qu'on appelle les *risques spécifiques*). *Le multiplicateur $k$ était choisi **banque par banque** par les régulateurs et doit valoir **au moins 3,0**. Pour une banque dotée d'excellentes procédures d'estimation de VaR bien éprouvées, il était probable que $k$ soit fixé à la **valeur minimale 3,0**. Pour d'autres banques, il pouvait être plus élevé.*

</details>

### 1.3 La faiblesse de la VaR et l'*expected shortfall*

*Certains chercheurs ont soutenu que la VaR peut **inciter les traders à choisir un portefeuille** dont la distribution de rendement ressemble à celle de la figure 21.2.* Deux portefeuilles peuvent avoir **exactement la même VaR** alors que l'un est **beaucoup plus risqué**, parce que ses pertes potentielles **au-delà** du seuil sont bien plus grandes. La VaR ne dit rien de ce qui se passe **dans** la queue.

|  | **VaR** | **Expected shortfall** |
|---|---|---|
| Question posée | « **Jusqu'où** les choses peuvent-elles mal tourner ? » | « **Si** les choses tournent mal, **combien** l'entreprise peut-elle s'attendre à perdre ? » |
| Définition | le $(100-X)$-ième percentile | la **perte espérée** sur $N$ jours **conditionnellement** à ce que l'issue tombe dans la queue gauche de $(100-X)\%$ |
| Exemple $X=99$, $N=10$ | la perte dépassée 1 % du temps | la perte **moyenne** sur 10 jours **quand** la perte est dans le 1 % de queue |
| Autres noms | — | **C-VaR**, *tail loss* |

**La référence.** Artzner, Delbaen, Eber et Heath, « *Coherent Measures of Risk* », *Mathematical Finance*, 9 (1999) : 203-28. *Ces auteurs **définissent certaines propriétés qu'une bonne mesure de risque devrait avoir** et montrent que **la mesure VaR standard ne les possède pas toutes**.*

⚠️ **Et pourtant.** *Malgré ses faiblesses, c'est **la VaR (et non l'expected shortfall) qui est la mesure de risque la plus populaire**, tant chez les régulateurs que chez les gestionnaires de risque.*

## 🔴 Concept 2 — La simulation historique

### 2.1 Le principe et l'algorithme

**L'idée en une phrase :** *utiliser les données passées comme guide de ce qui se passera dans le futur.*

Cadre standard : horizon **1 jour**, confiance **99 %**, **501 jours** de données. *(L'horizon et le niveau de confiance sont ceux typiquement utilisés pour une VaR de risque de marché ; 501 est un choix populaire pour le nombre de jours de données car il conduit à la création de **500 scénarios**.)*

| Étape | Contenu |
|---|---|
| **1** | Identifier les **variables de marché** affectant le portefeuille : taux d'intérêt, prix d'actions, prix de matières premières… **Tous les prix sont mesurés en devise domestique.** *Par exemple, une variable de marché pour une banque allemande sera probablement le S&P 500 **mesuré en euros**.* |
| **2** | Collecter les mouvements des variables sur les **501 derniers jours** → **500 scénarios** alternatifs de ce qui peut arriver entre aujourd'hui et demain |
| **3** | Scénario $i$ = les variations **en pourcentage** de toutes les variables sont les mêmes qu'entre le jour $i-1$ et le jour $i$ |
| **4** | Pour chaque scénario, calculer la **variation en dollars** de la valeur du portefeuille entre aujourd'hui et demain |
| **5** | Cela définit une **loi de probabilité de la perte quotidienne** (les gains sont des pertes négatives) |
| **6** | Le 99ᵉ percentile s'estime comme la **5ᵉ plus grande perte**. La VaR est la perte à ce point |

**La formule algébrique.** Soit $v_i$ la valeur d'une variable de marché au jour $i$, et supposons qu'aujourd'hui soit le jour $n$. Le $i$-ème scénario suppose que la valeur de la variable **demain** sera :

$$\boxed{\text{Valeur sous le scénario }i=v_n\,\frac{v_i}{v_{i-1}}}$$

*On est certain à 99 % qu'on ne subira pas de perte supérieure à l'estimation de VaR **si les variations des variables de marché des 501 derniers jours sont représentatives** de ce qui se passera entre aujourd'hui et demain.*

<details class="details--riche">
<summary>

**La convention de percentile — pourquoi la 5ᵉ pire perte ?**

</summary>

*Il y a des alternatives ici. On peut plaider pour la **5ᵉ** plus grande perte, la **6ᵉ**, ou une **moyenne des deux**. Dans la fonction PERCENTILE d'Excel, avec $n$ observations et $k$ entier, le percentile $k/(n-1)$ est **l'observation de rang $k+1$**. Les autres percentiles sont calculés par **interpolation linéaire**.*

Avec $n=500$ scénarios : le percentile $\frac{4}{499}=0{,}80\,\%$ est l'observation de rang 5. C'est la justification de la 5ᵉ pire perte comme approximation du 1ᵉʳ percentile.

</details>

### 2.2 L'illustration complète : quatre indices boursiers, 25 septembre 2008

**Le portefeuille (Table 21.1)** — un investisseur américain détient le 25 septembre 2008 un portefeuille de **10 millions de dollars** :

| Indice | Valeur (milliers de dollars) |
|---|---|
| DJIA (États-Unis) | 4 000 |
| FTSE 100 (Royaume-Uni) | 3 000 |
| CAC 40 (France) | 1 000 |
| Nikkei 225 (Japon) | 2 000 |
| **Total** | **10 000** |

**L'ajustement de change, indispensable.** *Les valeurs cotées du FTSE 100, du CAC 40 et du Nikkei 225 sont **ajustées des variations de change** de manière à être mesurées en dollars américains.*

<details class="details--riche">
<summary>

**L'ajustement du FTSE 100 — le calcul détaillé**

</summary>

*Étape 1 — les données.* Le FTSE 100 valait **5 197,00** le 25 septembre 2008, quand le change était **1,8472 USD par GBP**. Il valait **5 823,40** le 10 août 2006, quand le change était **1,8918 USD par GBP**.

*Étape 2 — le principe.* On veut une série mesurée en dollars **calée** sur 5 197,00 au 25 septembre 2008. Il faut donc multiplier les niveaux passés par le **rapport des taux de change**.

*Étape 3 — le calcul.* Le 10 août 2006, le niveau ajusté vaut :

$$5\,823{,}40\times\frac{1{,}8918}{1{,}8472}=5\,964{,}00$$

*Étape 4 — la lecture.* La livre était **plus forte** en 2006 (1,8918 contre 1,8472) : mesuré en dollars, l'indice de 2006 est donc **relevé** de 5 823,40 à 5 964,00.

</details>

**Les données ajustées (Table 21.2)** :

| Jour | Date | DJIA | FTSE 100 | CAC 40 | Nikkei 225 |
|---|---|---|---|---|---|
| 0 | 7 août 2006 | 11 219,38 | 6 026,33 | 4 345,08 | 14 023,44 |
| 1 | 8 août 2006 | 11 173,59 | 6 007,08 | 4 347,99 | 14 300,91 |
| 2 | 9 août 2006 | 11 076,18 | 6 055,30 | 4 413,35 | 14 467,09 |
| 3 | 10 août 2006 | 11 124,37 | **5 964,00** | 4 333,90 | 14 413,32 |
| ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ |
| 499 | 24 sept. 2008 | 10 825,17 | 5 109,67 | 4 113,33 | 12 159,59 |
| **500** | **25 sept. 2008** | **11 022,06** | **5 197,00** | **4 226,81** | **12 006,53** |

⚠️ **Pourquoi cette date.** *Le 25 septembre 2008 est une date intéressante pour évaluer un investissement en actions. La tourmente des marchés du crédit, commencée en août 2007, avait **plus d'un an**. Les prix des actions **baissaient depuis plusieurs mois**. Les volatilités **augmentaient**. **Lehman Brothers avait déposé son bilan dix jours plus tôt**. Le programme TARP de 700 milliards de dollars du secrétaire au Trésor **n'avait pas encore été voté** par le Congrès.*

⚠️ **Une remarque méthodologique.** *Pour garder l'exemple aussi simple que possible, **seuls les jours où les quatre indices ont coté** ont été inclus. C'est pourquoi les 501 données s'étendent du 7 août 2006 au 25 septembre 2008. En pratique, si l'analyse était menée par une institution financière américaine, **on tenterait probablement de combler les données des jours qui n'étaient pas des jours fériés américains**.*

<details class="details--riche">
<summary>

**Scénario 1, entièrement recalculé — les cinq lignes de l'exercice type**

</summary>

*Étape 1 — quelle variation reproduit-on ?* Le scénario 1 suppose que les variations en pourcentage entre le 25 et le 26 septembre 2008 sont les mêmes qu'entre le **7 et le 8 août 2006** (jours 0 et 1).

*Étape 2 — le DJIA.* Il valait 11 022,06 le 25 septembre 2008. Le 8 août 2006 il valait 11 173,59, **en baisse** depuis 11 219,38 le 7 août :

$$11\,022{,}06\times\frac{11\,173{,}59}{11\,219{,}38}=10\,977{,}08$$

*Étape 3 — les trois autres indices, même mécanique :*

| Indice | Calcul | Scénario 1 |
|---|---|---|
| FTSE 100 | $5\,197{,}00\times\dfrac{6\,007{,}08}{6\,026{,}33}$ | **5 180,40** |
| CAC 40 | $4\,226{,}81\times\dfrac{4\,347{,}99}{4\,345{,}08}$ | **4 229,64** |
| Nikkei 225 | $12\,006{,}53\times\dfrac{14\,300{,}91}{14\,023{,}44}$ | **12 244,10** |

*Étape 4 — la valeur du portefeuille* (en milliers de dollars). Chaque poche est multipliée par le **rapport de l'indice simulé à l'indice d'aujourd'hui** :

$$4\,000\times\frac{10\,977{,}08}{11\,022{,}06}+3\,000\times\frac{5\,180{,}40}{5\,197{,}00}+1\,000\times\frac{4\,229{,}64}{4\,226{,}81}+2\,000\times\frac{12\,244{,}10}{12\,006{,}53}=10\,014{,}334$$

*Étape 5 — la perte.* Le portefeuille passe de 10 000 à 10 014,334 : il réalise donc un **gain de 14 334 dollars**, soit une perte de $-14{,}334$ milliers de dollars.

⚠️ **Coquille du texte de Hull.** Dans le développement de la valeur du portefeuille, le manuel imprime « 12 224,10 » au numérateur du dernier terme, alors que la table 21.3 donne bien **12 244,10** pour le Nikkei sous le scénario 1. C'est 12 244,10 qui est correct : il redonne exactement 10 014,334, tandis que 12 224,10 donnerait 10 011,003.

</details>

**Les scénarios générés (Table 21.3)** :

| Scénario | DJIA | FTSE 100 | CAC 40 | Nikkei 225 | Valeur (milliers) | Perte (milliers) |
|---|---|---|---|---|---|---|
| 1 | 10 977,08 | 5 180,40 | 4 229,64 | 12 244,10 | 10 014,334 | $-14{,}334$ |
| 2 | 10 925,97 | 5 238,72 | 4 290,35 | 12 146,04 | 10 027,481 | $-27{,}481$ |
| 3 | 11 070,01 | 5 118,64 | 4 150,71 | 11 961,91 | 9 946,736 | $+53{,}264$ |
| ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ |
| 499 | 10 831,43 | 5 079,84 | 4 125,61 | 12 115,90 | 9 857,465 | $+142{,}535$ |
| 500 | 11 222,53 | 5 285,82 | 4 343,42 | 11 855,40 | 10 126,439 | $-126{,}439$ |

**Le classement (Table 21.4)** — les pertes des 500 scénarios sont rangées de la plus grande à la plus petite :

| Rang | Scénario | Perte (milliers de dollars) |
|---|---|---|
| **1** | **494** | **477,841** ← *les indices bougent comme au moment de la faillite de Lehman Brothers* |
| 2 | 339 | 345,435 |
| 3 | 349 | 282,204 |
| 4 | 329 | 277,041 |
| **5** | **487** | **253,385** ← **la VaR à 1 jour à 99 %** |
| 6 | 227 | 217,974 |
| 7 | 131 | 205,256 |
| 8 | 238 | 201,389 |
| 9 | 473 | 191,269 |
| 10 | 306 | 191,050 |
| 11 | 477 | 185,127 |
| 12 | 495 | 184,450 |
| 13 | 376 | 182,707 |
| 14 | 237 | 180,105 |
| 15 | 365 | 172,224 |

$$\boxed{\text{VaR à 1 jour à 99 \%}=253\,385\ \text{dollars}}\qquad\boxed{\text{VaR à 10 jours}=\sqrt{10}\times253\,385=801\,274\ \text{dollars}}$$

*(L'histogramme de la figure 21.3 regroupe les pertes par tranches de 100 milliers : 450 à 550, 350 à 450, 250 à 350, etc.)*

### 2.3 La fenêtre glissante et les portefeuilles réels

*Chaque jour, l'estimation de VaR serait mise à jour avec les **501 jours de données les plus récents**.*

| Jour de calcul | Fenêtre de données utilisée |
|---|---|
| 25 sept. 2008 (jour 500) | 7 août 2006 → 25 sept. 2008 (**jours 0 à 500**) |
| 26 sept. 2008 (jour 501) | 8 août 2006 → 26 sept. 2008 (**jours 1 à 501**) — *les valeurs du 7 août 2006 ne servent plus* |
| 29 sept. 2008 (jour 502) | 9 août 2006 → 29 sept. 2008 (**jours 2 à 502**) |

*En pratique, le portefeuille d'une institution financière est bien sûr considérablement plus compliqué que celui considéré ici. Il consiste probablement en **des milliers ou des dizaines de milliers de positions**, dont certaines en forwards, options et autres dérivés. **La VaR est calculée à la fin de chaque jour en supposant que le portefeuille restera inchangé au cours du jour ouvré suivant.** Si le trading d'une banque au cours d'une journée rend le portefeuille plus risqué (moins risqué), la VaR à 10 jours à 99 % **augmente (diminue)** par rapport à la valeur de la veille.*

⚠️ **L'ordre de grandeur du nombre de variables.** *Il est souvent nécessaire de considérer **des centaines voire des milliers de variables de marché**. Pour les taux d'intérêt, une banque a typiquement besoin de la structure par terme des taux zéro-coupon **Treasury et LIBOR/swap dans plusieurs devises**. Il peut y avoir **jusqu'à dix variables de marché pour chaque courbe zéro** à laquelle la banque est exposée.*

## 🔴 Concept 3 — L'approche modèle : volatilités quotidiennes et cas simples

### 3.1 Volatilité annuelle contre volatilité quotidienne

*En valorisation d'options, le temps se mesure en **années** et la volatilité est cotée comme une « volatilité par an ». Dans l'approche modèle pour la VaR, le temps se mesure en **jours** et la volatilité est cotée comme une « volatilité par jour ».*

Avec **252 jours de bourse** par an, l'écart-type du rendement composé en continu sur un an vaut soit $\sigma_{\text{an}}$, soit $\sigma_{\text{jour}}\sqrt{252}$ :

$$\boxed{\sigma_{\text{an}}=\sigma_{\text{jour}}\sqrt{252}\qquad\Longleftrightarrow\qquad\sigma_{\text{jour}}=\frac{\sigma_{\text{an}}}{\sqrt{252}}}$$

$$\text{soit }\frac{1}{\sqrt{252}}=0{,}0630\;:\;\textbf{la volatilité quotidienne vaut environ 6 \% de la volatilité annuelle.}$$

> ⚠️ ***La volatilité quotidienne d'un prix d'actif (ou de toute autre variable) est DÉFINIE, pour les besoins du calcul de VaR, comme égale à l'écart-type de la variation en pourcentage sur un jour.*** Ce n'est qu'**approximativement** vrai en toute rigueur ; on suppose l'égalité **exacte**.

### 3.2 Un seul actif

**Position :** 10 millions de dollars d'actions Microsoft. **Volatilité quotidienne : 2 %** (soit environ **32 % par an**, car $0{,}02\times\sqrt{252}=0{,}3175$).

| Étape | Calcul | Résultat |
|---|---|---|
| Écart-type de la variation quotidienne de valeur | $2\%\times10\,000\,000$ | **200 000 dollars** |
| Espérance de la variation | **supposée nulle** (voir encadré) | 0 |
| Loi supposée | **normale** | — |
| Quantile | $N(-2{,}33)=0{,}01$ | $-2{,}33$ écarts-types |
| **VaR à 1 jour à 99 %** | $2{,}33\times200\,000$ | **466 000 dollars** |
| **VaR à 10 jours à 99 %** | $466\,000\times\sqrt{10}$ | **1 473 621 dollars** |

<details class="details--riche">
<summary>

**Pourquoi supposer l'espérance nulle — la justification chiffrée**

</summary>

*Il est habituel dans l'approche modèle de supposer que **la variation espérée d'une variable de marché sur la période considérée est nulle**. Ce n'est pas strictement vrai, mais c'est une hypothèse raisonnable : **la variation espérée sur une courte période est généralement petite comparée à l'écart-type de la variation.***

Supposons que Microsoft ait un rendement espéré de **20 % par an** :

| Horizon | Rendement espéré | Écart-type | Rapport |
|---|---|---|---|
| **1 jour** | $0{,}20/252=0{,}08\,\%$ | $2\,\%$ | l'espérance est **25 fois plus petite** |
| **10 jours** | $0{,}08\times10=0{,}8\,\%$ | $2\times\sqrt{10}=6{,}3\,\%$ | l'espérance est **8 fois plus petite** |

⚠️ **Sur la loi retenue.** *Pour être cohérent avec l'hypothèse de valorisation d'options du chapitre 14, on pourrait supposer que le prix de Microsoft est **lognormal** demain. Comme un jour est une période si courte, **c'est presque indiscernable de l'hypothèse que nous faisons** — que la variation du prix entre aujourd'hui et demain est **normale**.*

</details>

**Deuxième position, seule :** 5 millions de dollars d'AT&T, volatilité quotidienne **1 %** (environ 16 % par an).

$$\sigma=5\,000\,000\times0{,}01=50\,000\quad\Rightarrow\quad\text{VaR}_{1j}=50\,000\times2{,}33=116\,500\quad\Rightarrow\quad\text{VaR}_{10j}=116\,500\sqrt{10}=368\,405$$

### 3.3 Deux actifs et le bénéfice de la diversification

Portefeuille : 10 M de Microsoft **et** 5 M d'AT&T ; les rendements suivent une loi **normale bivariée** de corrélation $\rho=0{,}3$.

**Le résultat statistique standard :** si $X$ et $Y$ ont des écarts-types $\sigma_X$ et $\sigma_Y$ et une corrélation $\rho$, alors

$$\boxed{\sigma_{X+Y}=\sqrt{\sigma_X^2+\sigma_Y^2+2\rho\sigma_X\sigma_Y}}$$

Avec $\sigma_X=200\,000$ et $\sigma_Y=50\,000$ :

$$\sigma_{X+Y}=\sqrt{200\,000^2+50\,000^2+2\times0{,}3\times200\,000\times50\,000}=220\,227$$

$$\text{VaR}_{1j,99\%}=220\,227\times2{,}33=513\,129\ \text{dollars}\qquad\text{VaR}_{10j,99\%}=513\,129\times\sqrt{10}=1\,622\,657\ \text{dollars}$$

**Le bénéfice de la diversification :**

| VaR 10 jours 99 % | Montant (dollars) |
|---|---|
| Portefeuille Microsoft seul | 1 473 621 |
| Portefeuille AT&T seul | 368 405 |
| **Somme** | **1 842 026** |
| Portefeuille **des deux** | **1 622 657** |
| **Bénéfice de la diversification** | $(1\,473\,621+368\,405)-1\,622\,657=\textbf{219 369}$ |

> ⚠️ ***Si Microsoft et AT&T étaient PARFAITEMENT corrélés, la VaR du portefeuille des deux ÉGALERAIT la somme des deux VaR individuelles. Une corrélation imparfaite conduit à ce qu'une partie du risque soit « diversifiée ».***

*(Harry Markowitz fut l'un des premiers chercheurs à étudier les bénéfices de la diversification pour un gérant de portefeuille ; prix Nobel 1990 — « Portfolio Selection », *Journal of Finance*, 7, 1 (mars 1952) : 77-91.)*

## 🔴 Concept 4 — Le modèle linéaire

### 4.1 Les équations générales

Portefeuille de valeur $P$ composé de $n$ actifs, avec un montant $\alpha_i$ investi dans l'actif $i$. Soit $\Delta x_i$ le **rendement** de l'actif $i$ sur un jour. La variation en dollars de l'investissement dans l'actif $i$ vaut $\alpha_i\Delta x_i$, d'où :

$$\boxed{\Delta P=\sum_{i=1}^{n}\alpha_i\,\Delta x_i}\;\text{(21.1)}$$

Dans l'exemple précédent, $\alpha_1=10$ et $\alpha_2=5$ (en millions), donc $\Delta P=10\Delta x_1+5\Delta x_2$.

> **L'hypothèse clé :** *si l'on suppose que les $\Delta x_i$ sont **normaux multivariés**, alors $\Delta P$ est **normal**. Pour calculer la VaR, il suffit donc de calculer **la moyenne et l'écart-type de $\Delta P$**.* La moyenne est nulle par l'hypothèse de §3.2.

Soit $\sigma_i$ la volatilité quotidienne de l'actif $i$ et $\rho_{ij}$ la corrélation entre les rendements de $i$ et $j$. La variance de $\Delta P$, notée $\sigma_P^2$ :

$$\boxed{\sigma_P^2=\sum_{i=1}^{n}\sum_{j=1}^{n}\rho_{ij}\,\alpha_i\alpha_j\,\sigma_i\sigma_j}\;\text{(21.2)}$$

$$\text{ou, en séparant la diagonale :}\qquad\sigma_P^2=\sum_{i=1}^{n}\alpha_i^2\sigma_i^2+2\sum_{i=1}^{n}\sum_{j<i}\rho_{ij}\,\alpha_i\alpha_j\,\sigma_i\sigma_j$$

$$\boxed{\text{Écart-type sur }N\text{ jours}=\sigma_P\sqrt N\qquad\text{VaR à 99 \% sur }N\text{ jours}=2{,}33\,\sigma_P\sqrt N}$$

**La version des gérants de portefeuille.** Le rendement du portefeuille sur un jour est $\Delta P/P$ ; sa variance vaut

$$\sum_{i=1}^{n}\sum_{j=1}^{n}\rho_{ij}\,w_iw_j\,\sigma_i\sigma_j\qquad\text{où }w_i=\frac{\alpha_i}{P}\text{ est le POIDS du }i\text{-ème investissement.}$$

<details class="details--riche">
<summary>

**Vérification : le portefeuille Microsoft-AT&T par la formule (21.2)**

</summary>

*Étape 1 — les paramètres.* $\sigma_1=0{,}02$, $\sigma_2=0{,}01$, $\rho_{12}=0{,}3$, $\alpha_1=10$, $\alpha_2=5$ (millions de dollars).

*Étape 2 — la variance :*

$$\sigma_P^2=10^2\times0{,}02^2+5^2\times0{,}01^2+2\times10\times5\times0{,}3\times0{,}02\times0{,}01$$

$$=0{,}04+0{,}0025+0{,}006=\mathbf{0{,}0485}$$

*Étape 3 — l'écart-type :* $\sigma_P=\sqrt{0{,}0485}=0{,}220$ million de dollars par jour.

*Étape 4 — la VaR à 10 jours à 99 % :*

$$2{,}33\times0{,}220\times\sqrt{10}=1{,}623\ \text{million de dollars}$$

**Ce qui coïncide exactement avec le calcul « à la main » de §3.3 (1 622 657 dollars).**

</details>

### 4.2 Matrices de corrélation et de variance-covariance

$$\mathbf{R}=\begin{pmatrix}1&\rho_{12}&\rho_{13}&\cdots&\rho_{1n}\\ \rho_{21}&1&\rho_{23}&\cdots&\rho_{2n}\\ \rho_{31}&\rho_{32}&1&\cdots&\rho_{3n}\\ \vdots&\vdots&\vdots&\ddots&\vdots\\ \rho_{n1}&\rho_{n2}&\rho_{n3}&\cdots&1\end{pmatrix}\qquad\mathbf{C}=\begin{pmatrix}\text{var}_1&\text{cov}_{12}&\cdots&\text{cov}_{1n}\\ \text{cov}_{21}&\text{var}_2&\cdots&\text{cov}_{2n}\\ \vdots&\vdots&\ddots&\vdots\\ \text{cov}_{n1}&\text{cov}_{n2}&\cdots&\text{var}_n\end{pmatrix}$$

| Fait | Énoncé |
|---|---|
| Diagonale de $\mathbf R$ | **1** — une variable est toujours parfaitement corrélée avec elle-même |
| Symétrie | $\rho_{ij}=\rho_{ji}$, donc $\mathbf R$ **et** $\mathbf C$ sont **symétriques** |
| Variance quotidienne | $\boxed{\text{var}_i=\sigma_i^2}$ |
| Covariance | $\boxed{\text{cov}_{ij}=\sigma_i\sigma_j\rho_{ij}}$ |
| Diagonale de $\mathbf C$ | ce sont des **variances** : $\text{cov}_{ii}=\text{var}_i$ — d'où le nom **matrice de variance-covariance** |

$$\boxed{\sigma_P^2=\sum_{i=1}^{n}\sum_{j=1}^{n}\text{cov}_{ij}\,\alpha_i\alpha_j\;\text{(21.3)}\qquad\text{soit, en notation matricielle,}\qquad\sigma_P^2=\mathbf a^{\mathsf T}\mathbf C\,\mathbf a}$$

où $\mathbf a$ est le vecteur **colonne** dont le $i$-ème élément est $\alpha_i$. *Les variances et covariances sont généralement calculées à partir de **données historiques** (chapitre 22).*

### 4.3 Traiter les taux d'intérêt : duration et *cash-flow mapping*

> ⚠️ ***Il est hors de question, dans l'approche modèle, de définir une variable de marché séparée pour CHAQUE prix d'obligation ou taux d'intérêt auquel une entreprise est exposée. Des simplifications sont nécessaires.***

**Solution 1 — les déplacements parallèles seuls.** On ne définit **qu'une** variable de marché : la taille du déplacement parallèle. On utilise alors la relation de duration :

$$\boxed{\Delta P=-D\,P\,\Delta y}$$

où $P$ est la valeur du portefeuille, $D$ sa **duration modifiée**, et $\Delta y$ le déplacement parallèle sur un jour. *Cette approche **ne donne habituellement pas assez de précision**.*

**Solution 2 — la procédure habituelle : les maturités standard.** On choisit comme variables de marché les prix d'obligations zéro-coupon de maturités standard :

$$\boxed{1\text{ mois},\ 3\text{ mois},\ 6\text{ mois},\ 1\text{ an},\ 2\text{ ans},\ 5\text{ ans},\ 7\text{ ans},\ 10\text{ ans},\ 30\text{ ans}}$$

Les flux des instruments du portefeuille sont ensuite **projetés** sur ces dates standard : c'est le ***cash-flow mapping***.

<details class="details--riche">
<summary>

**Le cash-flow mapping d'une obligation à 1,2 an — l'exemple complet**

</summary>

**Position :** 1 million de dollars sur une obligation du Trésor de maturité **1,2 an** payant un coupon de **6 % semestriel**.

*Étape 1 — le calendrier des flux.* Les coupons tombent en **0,2**, **0,7** et **1,2 an** ; le principal est remboursé en **1,2 an**. Un coupon semestriel de 6 % sur 1 M vaut $0{,}03\times1\,000\,000=30\,000$.

*Étape 2 — la décomposition en zéro-coupon.* L'obligation est **en première instance** regardée comme :

| Échéance | Montant | Instrument |
|---|---|---|
| 0,2 an | 30 000 dollars | zéro-coupon 0,2 an |
| 0,7 an | 30 000 dollars | zéro-coupon 0,7 an |
| 1,2 an | **1,03 million** de dollars | zéro-coupon 1,2 an (coupon **+ principal**) |

*Étape 3 — la projection sur les maturités standard.* Aucune de ces trois maturités n'est standard : chacune est remplacée par une position **équivalente** encadrant sa date.

| Position d'origine | Remplacée par |
|---|---|
| 0,2 an | **1 mois** et **3 mois** |
| 0,7 an | **6 mois** et **1 an** |
| 1,2 an | **1 an** et **2 ans** |

*Étape 4 — le résultat.* La position dans l'obligation à coupon à 1,2 an est, **pour les besoins de la VaR**, regardée comme une position en zéro-coupon de maturités **1 mois, 3 mois, 6 mois, 1 an et 2 ans**.

*(La méthode précise est expliquée dans la Technical Note 25 de Hull.)*

⚠️ **À retenir absolument :** *le cash-flow mapping **n'est pas nécessaire** quand on utilise la **simulation historique** — parce que **la structure par terme complète des taux peut être calculée pour chacun des scénarios considérés**.*

</details>

### 4.4 Où le modèle linéaire s'applique

| Portefeuille | Traitement |
|---|---|
| **Actions, obligations, change, matières premières, sans dérivés** | l'application la plus simple : $\Delta P$ dépend **linéairement** des variations en pourcentage des prix. Tous les prix mesurés **en devise domestique** : pour une grande banque américaine, la valeur du Nikkei 225 **en dollars**, le prix d'un zéro-coupon sterling à 10 ans **en dollars**, etc. |
| **Forward de change** (échéance $T$) | l'**échange d'une obligation zéro-coupon étrangère** de maturité $T$ **contre une obligation zéro-coupon domestique** de maturité $T$ → position **longue** sur l'obligation étrangère + **courte** sur la domestique ; chacune traitée par cash-flow mapping |
| **Swap de taux** | l'**échange d'une obligation à taux variable contre une obligation à taux fixe**. La jambe fixe est une obligation à coupon ordinaire. **La jambe variable vaut le pair juste après la prochaine date de paiement** : elle se réduit à un **zéro-coupon de maturité la prochaine date de paiement**. Le swap se ramène donc à un portefeuille de positions longues et courtes en obligations |

### 4.5 Le modèle linéaire et les options

Portefeuille d'options sur une action de prix $S$, de **delta** $\delta$. Comme $\delta$ est le taux de variation de la valeur du portefeuille par rapport à $S$ :

$$\frac{\Delta P}{\Delta S}=\delta\qquad\Longrightarrow\qquad\boxed{\Delta P=\delta\,\Delta S}\;\text{(21.4)}$$

En posant $\Delta x=\Delta S/S$ (variation en **pourcentage**) :

$$\boxed{\Delta P=S\delta\,\Delta x}\qquad\text{et en général}\qquad\boxed{\Delta P=\sum_{i=1}^{n}S_i\delta_i\,\Delta x_i}\;\text{(21.5)}$$

> **Le pont avec (21.1) :** c'est exactement $\Delta P=\sum\alpha_i\Delta x_i$ **avec $\boxed{\alpha_i=S_i\delta_i}$**. On peut donc réutiliser (21.2) ou (21.3) telles quelles.

⚠️ **Notation.** *Normalement on note delta et gamma d'un portefeuille $\Delta$ et $\Gamma$. Dans cette section et la suivante, on utilise les minuscules $\delta$ et $\gamma$ **pour ne pas surcharger $\Delta$***, qui sert déjà à noter les variations.

<details class="details--riche">
<summary>

**Exemple 21.1 — un portefeuille d'options sur Microsoft et AT&T**

</summary>

**Données :** delta des options Microsoft = **1 000** ; delta des options AT&T = **20 000** ; $S_1=120$ dollars (Microsoft), $S_2=30$ dollars (AT&T) ; $\sigma_1=2\,\%$, $\sigma_2=1\,\%$, $\rho=0{,}3$.

*Étape 1 — les équivalents en montant, par (21.5) :*

$$\Delta P=120\times1\,000\times\Delta x_1+30\times20\,000\times\Delta x_2=120\,000\,\Delta x_1+600\,000\,\Delta x_2$$

*Le portefeuille est donc supposé **équivalent à un investissement de 120 000 dollars en Microsoft et de 600 000 dollars en AT&T**.*

*Étape 2 — l'écart-type de $\Delta P$* (en milliers de dollars, donc $\alpha_1=120$, $\alpha_2=600$) :

$$\sigma_P=\sqrt{(120\times0{,}02)^2+(600\times0{,}01)^2+2\times120\times0{,}02\times600\times0{,}01\times0{,}3}$$

$$=\sqrt{2{,}4^2+6^2+2\times2{,}4\times6\times0{,}3}=\sqrt{5{,}76+36+8{,}64}=\sqrt{50{,}40}=\mathbf{7{,}099}$$

*Étape 3 — le quantile.* Ici on demande **95 %** : $N(-1{,}65)=0{,}05$.

*Étape 4 — la VaR à 5 jours à 95 % :*

$$1{,}65\times\sqrt5\times7\,099=\mathbf{26\,193\ \text{dollars}}$$

</details>

## 🟠 Concept 5 — Le modèle quadratique

### 5.1 Pourquoi le linéaire ne suffit pas

*Quand un portefeuille contient des options, le modèle linéaire est **une approximation**. Il ne tient pas compte du **gamma** du portefeuille.* Rappel : le delta est le taux de variation de la valeur du portefeuille par rapport à la variable de marché ; le gamma est le taux de variation **du delta** par rapport à cette variable. **Le gamma mesure la COURBURE** de la relation entre valeur du portefeuille et variable sous-jacente.

| Signe du gamma | Position type | Effet sur la loi de $\Delta P$ | Conséquence sur la VaR normale |
|---|---|---|---|
| **$\gamma>0$** | **call long** | loi **asymétrique à droite** (*positively skewed*) — queue gauche **moins lourde** que la normale | la VaR calculée est **TROP ÉLEVÉE** |
| **$\gamma<0$** | **call court** | loi **asymétrique à gauche** (*negatively skewed*) — queue gauche **plus lourde** que la normale | la VaR calculée est **TROP FAIBLE** |

**Le mécanisme (figures 21.5 et 21.6).** Une loi **normale** pour le prix du sous-jacent à un jour, passée à travers la relation **convexe** valeur-du-call / prix-du-sous-jacent, ressort **asymétrique positive** ; passée à travers la relation **concave** du call vendu, elle ressort **asymétrique négative**.

> ⚠️ ***La VaR d'un portefeuille dépend de façon CRITIQUE de la queue gauche de la loi.*** Avec 99 %, c'est la valeur sous laquelle il n'y a que 1 % de la distribution : une erreur d'asymétrie s'y paie directement.

### 5.2 Les équations quadratiques

$$\boxed{\Delta P=\delta\,\Delta S+\tfrac12\gamma\,(\Delta S)^2}\qquad\text{(amélioration de (21.4))}$$

En posant $\Delta x=\Delta S/S$ :

$$\boxed{\Delta P=S\delta\,\Delta x+\tfrac12 S^2\gamma\,(\Delta x)^2}\;\text{(21.6)}$$

Pour $n$ variables, chaque instrument ne dépendant que d'**une** variable :

$$\Delta P=\sum_{i=1}^{n}S_i\delta_i\,\Delta x_i+\sum_{i=1}^{n}\tfrac12 S_i^2\gamma_i\,(\Delta x_i)^2$$

Quand les instruments dépendent de **plusieurs** variables, la forme générale fait apparaître les **gammas croisés** :

$$\boxed{\Delta P=\sum_{i=1}^{n}S_i\delta_i\,\Delta x_i+\sum_{i=1}^{n}\sum_{j=1}^{n}\tfrac12 S_iS_j\gamma_{ij}\,\Delta x_i\,\Delta x_j}\;\text{(21.7)}\qquad\text{avec}\qquad\boxed{\gamma_{ij}=\frac{\partial^2P}{\partial S_i\,\partial S_j}}$$

⚠️ **Le terme oublié volontairement.** *Le développement de Taylor suggère l'approximation $\Delta P=\Theta\,\Delta t+\delta\,\Delta S+\frac12\gamma(\Delta S)^2$ en ignorant les termes d'ordre supérieur à $\Delta t$. **En pratique, le terme $\Theta\,\Delta t$ est si petit qu'il est habituellement ignoré.***

### 5.3 De l'équation aux percentiles : Cornish-Fisher

*L'équation (21.7) **n'est pas aussi commode à manier** que (21.1), mais elle permet de calculer les **moments** de $\Delta P$. Un résultat statistique connu sous le nom d'**expansion de Cornish-Fisher** permet d'estimer les **percentiles** de la loi de probabilité **à partir des moments**.*

**Les trois moments, cas d'une variable unique** ($S$ = valeur de la variable, $\sigma$ = sa volatilité quotidienne) :

$$\boxed{E(\Delta P)=\tfrac12 S^2\sigma^2\gamma}$$

$$\boxed{E(\Delta P^2)=S^2\sigma^2\delta^2+\tfrac34 S^4\sigma^4\gamma^2}$$

$$\boxed{E(\Delta P^3)=\tfrac92 S^4\sigma^4\delta^2\gamma+\tfrac{15}{8}S^6\sigma^6\gamma^3}$$

*(soit $0{,}75$ et $4{,}5$ et $1{,}875$ dans l'écriture décimale de Hull ; détails dans sa Technical Note 10. La Sample Application E de DerivaGem implémente la méthode de Cornish-Fisher pour ce cas.)*

> **La lecture des moments :** avec $\gamma=0$ on retrouve $E(\Delta P)=0$ et $E(\Delta P^2)=S^2\sigma^2\delta^2$, c'est-à-dire exactement la variance du modèle linéaire $\alpha^2\sigma^2$ avec $\alpha=S\delta$. **Tous les termes supplémentaires sont pilotés par $\gamma$.**

## 🟠 Concept 6 — Monte-Carlo et comparaison des trois approches

### 6.1 La procédure Monte-Carlo pour la VaR

| Étape | Contenu |
|---|---|
| **1** | **Valoriser le portefeuille aujourd'hui** de la manière habituelle, avec les valeurs courantes des variables de marché |
| **2** | **Tirer une fois** dans la loi **normale multivariée** des $\Delta x_i$ *(cf. la décomposition de Cholesky, fiche 92)* |
| **3** | Utiliser les $\Delta x_i$ tirés pour déterminer la valeur de **chaque variable de marché** à la fin du jour |
| **4** | **Revaloriser le portefeuille** à la fin du jour, de la manière habituelle |
| **5** | Soustraire la valeur de l'étape 1 de celle de l'étape 4 → un **tirage de $\Delta P$** |
| **6** | **Répéter** les étapes 2 à 5 un grand nombre de fois → une loi de probabilité de $\Delta P$ |

**Le percentile.** Avec **5 000** valeurs simulées de $\Delta P$ :

$$\boxed{\text{VaR 1 jour 99 \%}=\text{la }\mathbf{50}^{\text{e}}\text{ pire issue}}\qquad\boxed{\text{VaR 1 jour 95 \%}=\text{la }\mathbf{250}^{\text{e}}\text{ pire issue}}$$

La VaR à $N$ jours est ensuite, comme toujours, supposée valoir la VaR à 1 jour $\times\sqrt N$. *Ce n'est **qu'approximativement** vrai quand le portefeuille contient des options, mais **c'est l'hypothèse faite en pratique par la plupart des méthodes de calcul de VaR**.* La **théorie des valeurs extrêmes** peut servir à « lisser les queues » pour mieux estimer les percentiles extrêmes.

⚠️ **Le défaut, et son remède.** *Monte-Carlo tend à être **lent**, parce que le portefeuille complet d'une entreprise (qui peut comporter **des centaines de milliers d'instruments différents**) doit être **revalorisé de nombreuses fois**.* Une façon d'accélérer : **supposer que (21.7) décrit la relation** entre $\Delta P$ et les $\Delta x_i$. On saute alors **directement de l'étape 2 à l'étape 5** et on évite la revalorisation complète. C'est l'**approche par simulation partielle** (*partial simulation*), parfois utilisée aussi pour la simulation historique.

### 6.2 Le tableau comparatif

|  | **Simulation historique** | **Approche modèle** |
|---|---|---|
| **Avantage 1** | **les données historiques déterminent la loi jointe** des variables — aucune loi n'est postulée | résultats produits **très rapidement** |
| **Avantage 2** | évite le besoin de **cash-flow mapping** | se combine facilement avec les **schémas de mise à jour de la volatilité** (chapitre 22) |
| **Inconvénient 1** | **lente** en calcul | suppose une loi **normale multivariée** des variables de marché |
| **Inconvénient 2** | ne permet pas facilement d'utiliser les schémas de mise à jour de volatilité | en pratique, les variations quotidiennes ont souvent des **queues très différentes de la normale** (cf. table 19.1, fiche 91) |
| **Inconvénient 3** | — | **résultats médiocres pour les portefeuilles à faible delta** |

*(Pour adapter la simulation historique à la mise à jour de volatilité : Hull et White, « Incorporating volatility updating into the historical simulation method for value-at-risk », *Journal of Risk*, 1, 1 (1998) : 5-19.)*

## 🟠 Concept 7 — Stress testing et back testing

### 7.1 Le stress testing

*Beaucoup d'entreprises pratiquent, **en plus** du calcul de VaR, ce qu'on appelle le **stress testing**. Cela consiste à estimer comment le portefeuille de l'entreprise **se serait comporté sous certains des mouvements de marché les plus extrêmes observés au cours des 10 à 20 dernières années**.*

| Choc à tester | Journée de référence | Amplitude |
|---|---|---|
| Mouvement extrême des **actions américaines** | **19 octobre 1987** | le S&P 500 bouge de **22,3 écarts-types** |
| Version « moins extrême » | **8 janvier 1988** | le S&P 500 bouge de **6,8 écarts-types** |
| Mouvement extrême des **taux britanniques** | **10 avril 1992** | les rendements des obligations à 10 ans bougent de **7,7 écarts-types** |

*Les scénarios sont aussi parfois **générés par la direction générale**. Une technique consiste à demander aux dirigeants de se réunir périodiquement pour un **brainstorming** afin de développer des scénarios extrêmes plausibles compte tenu de l'environnement économique et des incertitudes globales.*

> ⚠️ ***Le stress testing est une manière de prendre en compte les événements extrêmes qui SE PRODUISENT de temps en temps mais sont virtuellement IMPOSSIBLES selon les lois de probabilité supposées.***

**Le chiffre qui résume tout.** Un mouvement quotidien de **5 écarts-types** : *sous l'hypothèse normale, il arrive **environ une fois tous les 7 000 ans**. En pratique, il n'est **pas rare d'en voir une ou deux fois tous les 10 ans**.*

**La VaR stressée.** *À la suite de la crise du crédit de 2007-2008, les régulateurs ont proposé le calcul de la **stressed VaR** : une VaR fondée sur une simulation historique des mouvements des variables de marché **pendant une période de conditions de marché tendues** (comme celles de 2008).*

### 7.2 Le back testing

> ***Quelle que soit la méthode utilisée pour calculer la VaR, un contrôle de réalité important est le back testing : tester comment les estimations de VaR se seraient comportées DANS LE PASSÉ.***

Pour une VaR à 1 jour à 99 % : on regarde **combien de fois la perte d'une journée a dépassé la VaR à 1 jour à 99 % qui aurait été calculée pour ce jour-là**.

| Fréquence de dépassement observée | Verdict |
|---|---|
| **environ 1 % des jours** | on peut être **raisonnablement à l'aise** avec la méthodologie |
| **7 % des jours** | la méthodologie est **suspecte** |

## 🔴 Concept 8 — L'analyse en composantes principales

### 8.1 Le principe et les données de Frye

*Une approche pour traiter le risque provenant de **groupes de variables de marché fortement corrélées** est l'**analyse en composantes principales**. Elle prend les données historiques des mouvements des variables et tente de définir un ensemble de **composantes** (ou **facteurs**) qui expliquent ces mouvements.*

**Le jeu de données :** 10 taux du Trésor américain de maturités 3 mois à 30 ans, **1 543 observations quotidiennes entre 1989 et 1995** (Frye, 1997).

**Table 21.7 — les chargements factoriels (*factor loadings*)** :

| Maturité | PC1 | PC2 | PC3 | PC4 | PC5 | PC6 | PC7 | PC8 | PC9 | PC10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 3 m | 0,21 | $-0{,}57$ | 0,50 | 0,47 | $-0{,}39$ | $-0{,}02$ | 0,01 | 0,00 | 0,01 | 0,00 |
| 6 m | 0,26 | $-0{,}49$ | 0,23 | $-0{,}37$ | 0,70 | 0,01 | $-0{,}04$ | $-0{,}02$ | $-0{,}01$ | 0,00 |
| 12 m | 0,32 | $-0{,}32$ | $-0{,}37$ | $-0{,}58$ | $-0{,}52$ | $-0{,}23$ | $-0{,}04$ | $-0{,}05$ | 0,00 | 0,01 |
| 2 a | 0,35 | $-0{,}10$ | $-0{,}38$ | 0,17 | 0,04 | 0,59 | 0,56 | 0,12 | $-0{,}12$ | $-0{,}05$ |
| 3 a | 0,36 | 0,02 | $-0{,}30$ | 0,27 | 0,07 | 0,24 | $-0{,}79$ | 0,00 | $-0{,}09$ | $-0{,}00$ |
| 4 a | 0,36 | 0,14 | $-0{,}12$ | 0,25 | 0,16 | $-0{,}63$ | 0,15 | 0,55 | $-0{,}14$ | $-0{,}08$ |
| 5 a | 0,36 | 0,17 | $-0{,}04$ | 0,14 | 0,08 | $-0{,}10$ | 0,09 | $-0{,}26$ | 0,71 | 0,48 |
| 7 a | 0,34 | 0,27 | 0,15 | 0,01 | 0,00 | $-0{,}12$ | 0,13 | $-0{,}54$ | 0,00 | $-0{,}68$ |
| 10 a | 0,31 | 0,30 | 0,28 | $-0{,}10$ | $-0{,}06$ | 0,01 | 0,03 | $-0{,}23$ | $-0{,}63$ | 0,52 |
| 30 a | 0,25 | 0,33 | 0,46 | $-0{,}34$ | $-0{,}18$ | 0,33 | $-0{,}09$ | 0,52 | 0,26 | $-0{,}13$ |

**L'interprétation des trois premiers facteurs** *(figure 21.7)* :

| Facteur | Nom | Description exacte |
|---|---|---|
| **PC1** | **translation** (*parallel shift*) | correspond à un déplacement **à peu près parallèle** de la courbe des taux. Toutes les charges sont **positives** et du même ordre (0,21 à 0,36). *Quand il y a **une unité** de ce facteur, le taux 3 mois augmente de **0,21 point de base**, le taux 6 mois de **0,26 point de base**, etc.* |
| **PC2** | **pentification** (*twist / steepening*) | les taux entre **3 mois et 2 ans** bougent dans **un** sens (charges négatives), les taux entre **3 ans et 30 ans** dans **l'autre** (charges positives) |
| **PC3** | **courbure** (*bowing*) | les taux du **court** terme et du **long** terme bougent dans un sens, ceux du **milieu** dans l'autre |

⚠️ ***Les chargements factoriels ont la propriété que la somme de leurs carrés vaut 1,0 pour chaque facteur.***

**Le *factor score*.** *Comme il y a 10 taux et 10 facteurs, les variations de taux observées un jour donné peuvent **toujours** être exprimées comme une **somme linéaire des facteurs** en résolvant un système de 10 équations simultanées. **La quantité d'un facteur particulier présente dans les variations de taux d'un jour donné s'appelle le *factor score* de ce jour**.*

**Table 21.8 — écarts-types des factor scores** (en **points de base**) :

| PC1 | PC2 | PC3 | PC4 | PC5 | PC6 | PC7 | PC8 | PC9 | PC10 |
|---|---|---|---|---|---|---|---|---|---|
| **17,49** | **6,05** | **3,10** | 2,17 | 1,97 | 1,69 | 1,27 | 1,24 | 0,80 | 0,79 |

*L'importance d'un facteur se mesure par **l'écart-type de son factor score** ; les facteurs sont listés par ordre d'importance.* Une quantité du premier facteur **égale à un écart-type** correspond donc à :

$$\text{taux 3 mois} : 0{,}21\times17{,}49=\mathbf{3{,}67}\ \text{points de base}\qquad\text{taux 6 mois} : 0{,}26\times17{,}49=\mathbf{4{,}55}\ \text{points de base}$$

### 8.2 La décomposition de la variance

**La propriété fondamentale :** *les facteurs sont choisis de sorte que **les factor scores soient NON CORRÉLÉS**.* Dans l'exemple, le premier score (quantité de translation) est non corrélé au deuxième (quantité de pentification) sur les 1 543 jours. **Les variances des factor scores s'additionnent pour donner la variance totale des données.**

$$17{,}49^2+6{,}05^2+3{,}10^2+\cdots+0{,}79^2=367{,}9$$

| Facteurs retenus | Part de la variance |
|---|---|
| **PC1 seul** | $17{,}49^2/367{,}9=\mathbf{83{,}1\,\%}$ |
| **PC1 + PC2** | $(17{,}49^2+6{,}05^2)/367{,}9=\mathbf{93{,}1\,\%}$ |
| **+ PC3** | environ **2,8 %** de plus |

> ⚠️ ***Cela montre que l'essentiel du risque des mouvements de taux est expliqué par les DEUX OU TROIS PREMIERS facteurs.*** On peut donc relier les risques d'un portefeuille de produits de taux **aux mouvements de ces facteurs** au lieu de considérer les dix taux.

⚠️ **Petit écart de la source.** La somme exacte des carrés du tableau 21.8 vaut $367{,}97$, et $3{,}10^2/367{,}97=2{,}61\,\%$ ; Hull annonce « 2,8 % » pour l'apport de PC3. L'écart tient à l'arrondi des écarts-types affichés à deux décimales — retenir **83 % / 93 % / ≈ 96 %** cumulés, qui est le message.

*Note de Hull : des résultats similaires — nature des facteurs et part du risque expliquée — sont obtenus quand une ACP est utilisée pour expliquer les mouvements de **presque n'importe quelle courbe des taux, dans n'importe quel pays**.*

### 8.3 Calculer une VaR par l'ACP

**Table 21.9 — variation de la valeur du portefeuille pour un mouvement de 1 point de base** (millions de dollars) :

| Taux 1 an | Taux 2 ans | Taux 3 ans | Taux 4 ans | Taux 5 ans |
|---|---|---|---|---|
| $+10$ | $+4$ | $-8$ | $-7$ | $+2$ |

*Un mouvement de 1 point de base du taux 1 an fait **augmenter** la valeur du portefeuille de 10 millions de dollars, un mouvement de 1 point de base du taux 2 ans la fait augmenter de 4 millions, etc.*

<details class="details--riche">
<summary>

**Le calcul de VaR par les deux premiers facteurs — pas à pas**

</summary>

*Étape 1 — le choix des facteurs.* On modélise les mouvements de taux par les **deux premiers facteurs** ; cela capture **93,1 %** de la variance.

*Étape 2 — l'exposition au premier facteur.* On pondère chaque sensibilité par le chargement PC1 de la maturité correspondante (colonne PC1 de la table 21.7 : 0,32 pour 12 m, 0,35 pour 2 a, 0,36 pour 3 a, 0,36 pour 4 a, 0,36 pour 5 a) :

$$10\times0{,}32+4\times0{,}35-8\times0{,}36-7\times0{,}36+2\times0{,}36=3{,}20+1{,}40-2{,}88-2{,}52+0{,}72=\mathbf{-0{,}08}$$

*(en millions de dollars par point de base de factor score)*

*Étape 3 — l'exposition au deuxième facteur*, avec la colonne PC2 ($-0{,}32$ ; $-0{,}10$ ; $0{,}02$ ; $0{,}14$ ; $0{,}17$) :

$$10\times(-0{,}32)+4\times(-0{,}10)-8\times0{,}02-7\times0{,}14+2\times0{,}17=-3{,}20-0{,}40-0{,}16-0{,}98+0{,}34=\mathbf{-4{,}40}$$

*Étape 4 — la relation.* Si $f_1$ et $f_2$ sont les factor scores (en points de base), alors, à une bonne approximation :

$$\boxed{\Delta P=-0{,}08\,f_1-4{,}40\,f_2}$$

*Étape 5 — l'écart-type.* **Les factor scores sont non corrélés** : il n'y a **aucun terme croisé**. Avec les écarts-types de la table 21.8 :

$$\sigma_{\Delta P}=\sqrt{0{,}08^2\times17{,}49^2+4{,}40^2\times6{,}05^2}=\sqrt{1{,}958+708{,}4}=\mathbf{26{,}66}$$

*Étape 6 — la VaR à 1 jour à 99 % :*

$$26{,}66\times2{,}33=\mathbf{62{,}12}\ \text{millions de dollars}$$

⚠️ **La morale de l'exemple, explicitement soulignée par Hull.** *Les données de la table 21.9 sont telles qu'il y a **très peu d'exposition au premier facteur** ($-0{,}08$) et une **exposition significative au deuxième** ($-4{,}40$). **N'utiliser qu'un seul facteur sous-estimerait considérablement la VaR.** La méthode fondée sur la duration (§4.3) la sous-estimerait aussi considérablement, car **elle ne considère que les déplacements PARALLÈLES de la courbe des taux.***

</details>

**Au-delà des taux.** *Une ACP peut en théorie être utilisée pour d'autres variables de marché. Si une institution est exposée à un certain nombre d'indices boursiers différents, une ACP peut identifier des facteurs décrivant leurs mouvements, et les plus importants peuvent remplacer les indices dans l'analyse de VaR. **L'efficacité d'une ACP pour un groupe de variables dépend de leur degré de corrélation.***

⚠️ **Un dernier détail technique.** *La VaR est habituellement calculée en reliant les variations effectives du portefeuille aux variations **en POURCENTAGE** des variables de marché (les $\Delta x_i$). Pour un calcul de VaR, il peut donc être **plus approprié de conduire l'ACP sur les variations en pourcentage** des variables de marché plutôt que sur les **variations absolues**.*

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| « $n$ jours de données historiques », « scénarios » | **simulation historique** : $v_n\,v_i/v_{i-1}$, classer, prendre le $k$-ième pire |
| Volatilités **et** corrélations données, pas de dérivés | **modèle linéaire** : (21.2), puis $2{,}33\,\sigma_P\sqrt N$ |
| Volatilité donnée **en % par an** | diviser par $\sqrt{252}$ **avant tout** |
| « delta du portefeuille = … » | poser $\alpha_i=S_i\delta_i$ puis modèle linéaire |
| « … et le gamma vaut … » | passer au **modèle quadratique** (21.6)-(21.7), puis Cornish-Fisher ou Monte-Carlo |
| Obligation à coupon, swap, forward de change | **cash-flow mapping** sur les maturités standard |
| « seuls des déplacements parallèles » | $\Delta P=-DP\Delta y$, **une seule** variable de marché |
| Chargements factoriels + écarts-types des scores | **ACP** : exposition = $\sum(\text{sensibilité}\times\text{chargement})$, puis somme des carrés **sans termes croisés** |
| « niveau de confiance 95 % » | $1{,}65$, **pas** $2{,}33$ |
| « combien perdrait-on **si** on est dans la queue ? » | c'est l'**expected shortfall**, pas la VaR |

## Comment résoudre ce type d'exercice

**A — VaR par le modèle linéaire (le squelette universel).**

1. Convertir toutes les volatilités **en quotidiennes** : $\sigma_{\text{jour}}=\sigma_{\text{an}}/\sqrt{252}$.
2. Écrire les **montants** $\alpha_i$ : montant investi pour un actif comptant, **$S_i\delta_i$** pour une position optionnelle.
3. Appliquer $\sigma_P^2=\sum_i\alpha_i^2\sigma_i^2+2\sum_i\sum_{j<i}\rho_{ij}\alpha_i\alpha_j\sigma_i\sigma_j$.
4. Prendre la racine : $\sigma_P$ est la volatilité **en dollars par jour**.
5. Multiplier par le quantile ($2{,}33$ à 99 %, $1{,}65$ à 95 %) **et** par $\sqrt N$.
6. Vérifier l'ordre de grandeur : la VaR doit être **inférieure** à la somme des VaR individuelles (diversification).

**B — VaR par simulation historique.**

1. Construire, pour chaque variable, la série des **rapports** $v_i/v_{i-1}$ sur les 500 jours.
2. Multiplier la valeur du jour $n$ par chaque rapport → **500 valeurs simulées** de chaque variable.
3. Revaloriser **le portefeuille entier** dans chaque scénario (pour des positions linéaires : pondérer chaque poche par le rapport de son indice simulé à l'indice courant).
4. Calculer $\text{perte}=\text{valeur d'aujourd'hui}-\text{valeur simulée}$.
5. **Classer** les pertes de la plus grande à la plus petite ; prendre la **5ᵉ** pour 99 % sur 500 scénarios.
6. Passer à $N$ jours en multipliant par $\sqrt N$.

**C — VaR par l'ACP.**

1. Lister les **sensibilités** du portefeuille à chaque taux (variation de valeur pour 1 pb).
2. Pour chaque facteur retenu, calculer l'**exposition** $=\sum_k(\text{sensibilité}_k\times\text{chargement}_k)$.
3. Écrire $\Delta P=\sum_m(\text{exposition}_m)\,f_m$.
4. Comme les $f_m$ sont **non corrélés** : $\sigma_{\Delta P}=\sqrt{\sum_m(\text{exposition}_m)^2\sigma_{f_m}^2}$ — **aucun terme croisé**.
5. Multiplier par le quantile et $\sqrt N$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Utiliser une volatilité **annuelle** dans un calcul de VaR quotidienne | diviser par $\sqrt{252}$ — la volatilité quotidienne vaut **≈ 6 %** de l'annuelle |
| Confondre le percentile du **gain** et celui de la **perte** | VaR = queue **gauche** de la loi du gain = queue **droite** de la loi de la perte |
| Prendre la **4ᵉ** ou la **6ᵉ** pire perte sur 500 sans le dire | la convention de Hull est la **5ᵉ** ; d'autres conventions existent, **il faut l'annoncer** |
| Croire que $\text{VaR}_N=\text{VaR}_1\sqrt N$ est exacte | elle l'est **seulement** si les variations quotidiennes sont **i.i.d. normales de moyenne nulle** |
| Additionner les VaR des sous-portefeuilles | c'est le cas **corrélation parfaite** ; la vraie VaR est **plus petite** — c'est le bénéfice de la diversification |
| Ignorer le gamma sur un portefeuille d'options **vendues** | $\gamma<0$ → queue gauche **plus lourde** → la VaR linéaire est **sous-estimée** le pire cas |
| Prendre $\alpha=\delta$ au lieu de $\alpha=S\delta$ | $\Delta x$ est une variation **en pourcentage** ; il faut **multiplier par le prix** |
| Faire du cash-flow mapping en simulation historique | **inutile** : la courbe complète est recalculable dans chaque scénario |
| Ne retenir qu'un facteur dans l'ACP | un portefeuille peut être **immunisé contre la translation** et très exposé à la **pentification** (exemple §8.3 : $-0{,}08$ contre $-4{,}40$) |
| Ajouter des termes croisés entre factor scores | par **construction** ils sont **non corrélés** |
| Croire que $k=3$ est la valeur imposée | c'est le **minimum** ; le régulateur peut exiger plus banque par banque |
| Utiliser $2{,}33$ à 95 % | $2{,}33$ ↔ **99 %** ; $1{,}65$ ↔ **95 %** |
| Croire que la normale décrit bien les queues | un mouvement à 5 écarts-types : « une fois tous les 7 000 ans » en théorie, **une ou deux fois par décennie** en réalité |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Énoncé VaR** | « certain à $X$ % qu'il n'y aura pas de perte $>V$ dollars dans $N$ jours » |
| **Définition** | perte du $(100-X)$-ième percentile de la loi du **gain** sur $N$ jours |
| **Passage à $N$ jours** | $\text{VaR}_N=\text{VaR}_1\times\sqrt N$ |
| **Exigence de Bâle** | capital $=k\times$ VaR 10 j 99 %, $k\ge3{,}0$, soit $\ge9{,}49\times$ VaR 1 j 99 % |
| **Quantiles normaux** | $N(-2{,}33)=0{,}01$ · $N(-1{,}65)=0{,}05$ |
| **Volatilité quotidienne** | $\sigma_{\text{jour}}=\sigma_{\text{an}}/\sqrt{252}\approx0{,}06\,\sigma_{\text{an}}$ |
| **Scénario historique** | $v_n\,v_i/v_{i-1}$ ; 501 jours → 500 scénarios ; **5ᵉ pire** perte à 99 % |
| **Exemple des 4 indices** | VaR 1 j = **253 385** dollars ; VaR 10 j = **801 274** dollars |
| **Modèle linéaire** | $\Delta P=\sum\alpha_i\Delta x_i$ ; $\sigma_P^2=\sum\sum\rho_{ij}\alpha_i\alpha_j\sigma_i\sigma_j=\mathbf a^{\mathsf T}\mathbf C\mathbf a$ |
| **Covariance** | $\text{cov}_{ij}=\sigma_i\sigma_j\rho_{ij}$ ; $\text{var}_i=\sigma_i^2$ |
| **Deux actifs** | $\sigma=\sqrt{\sigma_X^2+\sigma_Y^2+2\rho\sigma_X\sigma_Y}$ |
| **Options, modèle linéaire** | $\alpha_i=S_i\delta_i$ |
| **Modèle quadratique** | $\Delta P=\sum S_i\delta_i\Delta x_i+\frac12\sum\sum S_iS_j\gamma_{ij}\Delta x_i\Delta x_j$ |
| **Gamma croisé** | $\gamma_{ij}=\partial^2P/\partial S_i\partial S_j$ |
| **Signe du gamma** | $\gamma>0$ → VaR normale **trop haute** ; $\gamma<0$ → **trop basse** |
| **Percentiles depuis les moments** | expansion de **Cornish-Fisher** |
| **Taux, méthode simple** | $\Delta P=-DP\Delta y$ (déplacements **parallèles** seulement) |
| **Taux, méthode standard** | *cash-flow mapping* sur 1 m, 3 m, 6 m, 1 a, 2 a, 5 a, 7 a, 10 a, 30 a |
| **Monte-Carlo** | 5 000 tirages → 99 % = **50ᵉ** pire, 95 % = **250ᵉ** pire |
| **Trois facteurs de la courbe** | **translation** (83,1 %) · **pentification** (→ 93,1 %) · **courbure** |
| **VaR par l'ACP** | exposition $=\sum(\text{sensibilité}\times\text{chargement})$ ; $\sigma_{\Delta P}=\sqrt{\sum(\text{exposition})^2\sigma_f^2}$ |
| **Exemple ACP** | $-0{,}08$ et $-4{,}40$ → $\sigma=26{,}66$ → VaR $=62{,}12$ M dollars |
| **Back testing** | ≈ 1 % d'exceptions = méthode saine ; 7 % = **suspecte** |
| **Stress testing** | 19 oct. 1987 (22,3 σ) · 8 janv. 1988 (6,8 σ) · 10 avr. 1992 (7,7 σ) |
| **Expected shortfall** | perte **moyenne conditionnelle** à être dans la queue de $(100-X)\%$ |

## 🧠 Active Recall

1. Écrire la phrase exacte que produit un calcul de VaR, en nommant les deux paramètres.
2. La VaR est le percentile de quelle distribution, et de quelle queue ?
3. Avec $N=5$ et $X=97$, quel percentile cherche-t-on ?
4. Pourquoi les analystes calculent-ils presque toujours $N=1$ en premier lieu ?
5. Sous quelle condition exacte la règle $\text{VaR}_N=\text{VaR}_1\sqrt N$ est-elle **exacte** ?
6. Pourquoi le multiplicateur réglementaire équivaut-il à 9,49 fois la VaR à 1 jour ?
7. Quelle est la différence entre *trading book* et *banking book* ?
8. Quelle faiblesse de la VaR l'*expected shortfall* corrige-t-elle ? Formuler les deux questions.
9. Qui a formalisé les « mesures cohérentes de risque », et en quelle année ?
10. Pourquoi 501 jours de données donnent-ils 500 scénarios ?
11. Écrire la formule donnant la valeur d'une variable sous le scénario $i$.
12. Pourquoi faut-il ajuster le FTSE 100 des variations de change pour un investisseur américain ?
13. Recalculer le DJIA sous le scénario 1 à partir de 11 022,06 ; 11 173,59 ; 11 219,38.
14. Quel scénario donne la pire perte dans l'exemple des quatre indices, et à quel événement correspond-il ?
15. Quelle perte est retenue comme VaR à 99 % sur 500 scénarios, et pourquoi ?
16. Quelle fenêtre de données utilise-t-on le lendemain du calcul ?
17. Quelle est la relation entre volatilité annuelle et quotidienne ? Quel pourcentage cela représente-t-il ?
18. Justifier chiffrement l'hypothèse d'espérance nulle pour Microsoft.
19. Calculer la VaR à 10 jours à 99 % d'une position de 10 M avec $\sigma_{\text{jour}}=2\,\%$.
20. Donner la formule de l'écart-type de $X+Y$ avec corrélation.
21. Comment se calcule le bénéfice de la diversification, et à quoi correspond le cas $\rho=1$ ?
22. Écrire (21.1) et (21.2).
23. Quelle est la version de (21.2) utilisée par les gérants de portefeuille ?
24. Écrire $\sigma_P^2$ en notation matricielle et dire ce que contient $\mathbf a$.
25. Quelle relation lie $\text{cov}_{ij}$, $\sigma_i$, $\sigma_j$ et $\rho_{ij}$ ?
26. Quelles sont les deux façons de traiter les taux d'intérêt, et laquelle manque de précision ?
27. Lister les neuf maturités standard.
28. Décomposer l'obligation à 1,2 an à 6 % semestriel en trois zéro-coupon, puis en cinq.
29. Pourquoi le cash-flow mapping est-il inutile en simulation historique ?
30. Comment un forward de change se décompose-t-il ? Et un swap de taux ?
31. Pourquoi la jambe variable d'un swap est-elle un zéro-coupon ?
32. Quelle substitution permet de traiter les options dans le modèle linéaire ?
33. Refaire l'exemple 21.1 : deltas 1 000 et 20 000, prix 120 et 30 — quels montants équivalents ?
34. Quel écart-type et quelle VaR à 5 jours à 95 % obtient-on dans l'exemple 21.1 ?
35. Que mesure le gamma, et quel effet a son signe sur l'asymétrie de $\Delta P$ ?
36. Un portefeuille à gamma négatif : la VaR normale est-elle trop haute ou trop basse ?
37. Écrire (21.6) et (21.7). Que vaut $\gamma_{ij}$ ?
38. Quel terme du développement de Taylor est ignoré, et pourquoi ?
39. À quoi sert l'expansion de Cornish-Fisher ?
40. Donner les trois moments de $\Delta P$ dans le cas d'une variable unique.
41. Lister les six étapes de la simulation Monte-Carlo de VaR.
42. Avec 5 000 tirages, quelle issue donne la VaR à 99 % ? à 95 % ?
43. Qu'est-ce que l'approche par simulation partielle, et que fait-elle gagner ?
44. Donner deux avantages et deux inconvénients de chacune des deux grandes approches.
45. Pour quel type de portefeuille l'approche modèle donne-t-elle de mauvais résultats ?
46. Citer les trois journées de référence du stress testing et leurs amplitudes.
47. Combien de fois par siècle un mouvement à 5 σ devrait-il arriver, et combien de fois arrive-t-il ?
48. Qu'est-ce que la *stressed VaR*, et quand a-t-elle été proposée ?
49. Quelle fréquence d'exceptions valide une méthodologie en back testing ? Laquelle la condamne ?
50. Que représentent PC1, PC2 et PC3 sur une courbe des taux ?
51. Que vaut la somme des carrés des chargements d'un facteur ?
52. Qu'est-ce qu'un *factor score* ?
53. Quelle propriété statistique cruciale les factor scores possèdent-ils, et que simplifie-t-elle ?
54. Calculer la part de variance expliquée par PC1, puis par PC1 + PC2.
55. De combien bouge le taux 3 mois pour un écart-type de PC1 ?
56. Refaire le calcul des expositions $-0{,}08$ et $-4{,}40$ de la table 21.9.
57. Pourquoi $\sigma_{\Delta P}$ n'a-t-il aucun terme croisé dans le calcul par l'ACP ?
58. Pourquoi une méthode fondée sur la duration sous-estimerait-elle la VaR de ce portefeuille ?
59. L'ACP fonctionne-t-elle sur autre chose que des taux ? De quoi dépend son efficacité ?
60. Sur quelles quantités vaut-il mieux conduire l'ACP pour un calcul de VaR ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les deux paramètres de la VaR ? | **Horizon $N$** et **confiance $X$ %** |
| VaR = percentile de quoi ? | Le $(100-X)$-ième percentile de la loi du **gain** |
| Quelle queue ? | **Gauche** pour le gain, **droite** pour la perte |
| $N=5$, $X=97$ ? | Le **3ᵉ** percentile |
| Norme des régulateurs ? | $N=10$, $X=99$ |
| Passage à $N$ jours ? | $\times\sqrt N$ |
| Quand est-elle exacte ? | Variations **i.i.d. normales de moyenne nulle** |
| Multiplicateur de Bâle ? | $k\ge3{,}0$ appliqué à la VaR 10 j 99 % |
| Équivalent en VaR 1 jour ? | $3\sqrt{10}=\mathbf{9{,}49}$ |
| Année de Bâle I ? | **1988** (risque de crédit) |
| Année de l'amendement marché ? | **1996**, appliqué en **1998** |
| Banking book ? | Surtout des **prêts**, pas revalorisé régulièrement |
| Trading book ? | Instruments **négociés**, revalorisé **quotidiennement** |
| Faiblesse de la VaR ? | Deux portefeuilles de **même VaR** peuvent avoir des pertes de queue très différentes |
| Question de l'expected shortfall ? | « **Si** ça tourne mal, **combien** perd-on ? » |
| Autres noms ? | **C-VaR**, *tail loss* |
| Auteurs des mesures cohérentes ? | **Artzner, Delbaen, Eber, Heath** (1999) |
| Mesure la plus utilisée en pratique ? | La **VaR**, pas l'expected shortfall |
| Combien de scénarios avec 501 jours ? | **500** |
| Formule du scénario $i$ ? | $v_n\,v_i/v_{i-1}$ |
| Percentile 99 % sur 500 scénarios ? | La **5ᵉ pire** perte |
| Justification Excel ? | Le percentile $k/(n-1)$ est l'observation de rang $k+1$ |
| Devise de mesure des variables ? | Toujours la **devise domestique** |
| VaR 1 jour de l'exemple 4 indices ? | **253 385 dollars** |
| VaR 10 jours ? | **801 274 dollars** |
| Pire scénario, et pourquoi ? | Le **494** — la faillite de **Lehman Brothers** |
| Fenêtre du lendemain ? | On **décale d'un jour** : jours 1 à 501 |
| $\sigma_{\text{jour}}$ en fonction de $\sigma_{\text{an}}$ ? | $\sigma_{\text{an}}/\sqrt{252}$ |
| Quel pourcentage ? | Environ **6 %** |
| Définition retenue de $\sigma_{\text{jour}}$ ? | L'écart-type de la **variation en pourcentage** sur un jour |
| Hypothèse sur l'espérance ? | **Nulle** — petite devant l'écart-type |
| Quantile à 99 % ? | **2,33** |
| Quantile à 95 % ? | **1,65** |
| VaR 1 j de 10 M à 2 % par jour ? | $2{,}33\times200\,000=\mathbf{466\,000}$ |
| Et à 10 jours ? | **1 473 621 dollars** |
| Écart-type de $X+Y$ ? | $\sqrt{\sigma_X^2+\sigma_Y^2+2\rho\sigma_X\sigma_Y}$ |
| $\sigma$ du portefeuille MSFT + T ? | **220 227 dollars** |
| VaR 10 j des deux ? | **1 622 657 dollars** |
| Bénéfice de la diversification ? | **219 369 dollars** |
| Cas $\rho=1$ ? | Les VaR **s'additionnent** |
| Équation (21.1) ? | $\Delta P=\sum\alpha_i\Delta x_i$ |
| Équation (21.2) ? | $\sigma_P^2=\sum\sum\rho_{ij}\alpha_i\alpha_j\sigma_i\sigma_j$ |
| Version des gérants ? | Mêmes formules avec les **poids** $w_i=\alpha_i/P$ |
| Forme matricielle ? | $\sigma_P^2=\mathbf a^{\mathsf T}\mathbf C\,\mathbf a$ |
| Que contient $\mathbf a$ ? | Les **montants** $\alpha_i$, en **colonne** |
| $\text{cov}_{ij}$ ? | $\sigma_i\sigma_j\rho_{ij}$ |
| Diagonale de $\mathbf C$ ? | Les **variances** $\sigma_i^2$ |
| Méthode « déplacement parallèle » ? | $\Delta P=-DP\Delta y$ |
| Son défaut ? | **Pas assez précise** |
| Les neuf maturités standard ? | 1 m, 3 m, 6 m, 1 a, 2 a, 5 a, 7 a, 10 a, 30 a |
| Nom de la procédure ? | Le ***cash-flow mapping*** |
| L'obligation 1,2 an à 6 % ? | 30 000 en 0,2 · 30 000 en 0,7 · **1,03 M** en 1,2 |
| Après projection ? | Zéro-coupon **1 m, 3 m, 6 m, 1 a, 2 a** |
| Nécessaire en simulation historique ? | **Non** — la courbe entière est recalculable |
| Forward de change ? | Zéro-coupon **étranger long** + **domestique court** |
| Swap de taux ? | Obligation **fixe** contre obligation **variable** |
| La jambe variable ? | Vaut le **pair juste après le prochain paiement** → zéro-coupon à cette date |
| Options dans le modèle linéaire ? | $\alpha_i=S_i\delta_i$ |
| Équation (21.5) ? | $\Delta P=\sum S_i\delta_i\Delta x_i$ |
| Exemple 21.1 : montants équivalents ? | **120 000** et **600 000 dollars** |
| Son écart-type ? | **7 099 dollars** |
| Sa VaR 5 j 95 % ? | **26 193 dollars** |
| Que mesure le gamma ? | La **courbure** valeur / sous-jacent |
| $\gamma>0$ → asymétrie ? | **Positive** ; VaR normale **trop haute** |
| $\gamma<0$ → asymétrie ? | **Négative** ; VaR normale **trop basse** |
| Équation (21.6) ? | $\Delta P=S\delta\Delta x+\frac12S^2\gamma(\Delta x)^2$ |
| Gamma croisé ? | $\gamma_{ij}=\partial^2P/\partial S_i\partial S_j$ |
| Terme ignoré du Taylor ? | $\Theta\,\Delta t$ — trop petit |
| Des moments aux percentiles ? | L'expansion de **Cornish-Fisher** |
| $E(\Delta P)$ à une variable ? | $\frac12S^2\sigma^2\gamma$ |
| $E(\Delta P^2)$ ? | $S^2\sigma^2\delta^2+0{,}75\,S^4\sigma^4\gamma^2$ |
| $E(\Delta P^3)$ ? | $4{,}5\,S^4\sigma^4\delta^2\gamma+1{,}875\,S^6\sigma^6\gamma^3$ |
| Étape 1 de Monte-Carlo ? | Valoriser le portefeuille **aujourd'hui** |
| 99 % sur 5 000 tirages ? | La **50ᵉ** pire issue |
| 95 % sur 5 000 tirages ? | La **250ᵉ** pire issue |
| Défaut de Monte-Carlo ? | **Lenteur** — revalorisation complète répétée |
| Simulation partielle ? | Utiliser (21.7) : sauter de l'étape 2 à l'étape 5 |
| Avantage clé de l'historique ? | Les données donnent la **loi jointe** réelle |
| Défaut clé de l'approche modèle ? | Suppose la **normalité multivariée** |
| Portefeuilles mal traités par le modèle ? | Ceux à **faible delta** |
| Journée du krach de 1987 ? | **19 octobre 1987**, S&P 500 à **22,3 σ** |
| Alternative moins extrême ? | **8 janvier 1988**, **6,8 σ** |
| Taux britanniques ? | **10 avril 1992**, **7,7 σ** |
| Mouvement à 5 σ, théorie ? | Une fois tous les **7 000 ans** |
| En pratique ? | **Une ou deux fois par décennie** |
| Stressed VaR ? | VaR par simulation historique **sur une période tendue** (2008) |
| Back testing acceptable ? | Environ **1 %** d'exceptions |
| Back testing suspect ? | **7 %** d'exceptions |
| Données de l'ACP de Frye ? | **10 taux US**, **1 543 jours**, **1989-1995** |
| PC1 ? | **Translation** de la courbe |
| PC2 ? | **Pentification** / *twist* |
| PC3 ? | **Courbure** / *bowing* |
| Somme des carrés des chargements ? | **1,0** |
| Factor score ? | La **quantité** d'un facteur présente un jour donné |
| Propriété des factor scores ? | Ils sont **non corrélés** |
| Écart-type de PC1 ? | **17,49** points de base |
| Variance totale ? | **367,9** |
| Part de PC1 ? | **83,1 %** |
| Part de PC1 + PC2 ? | **93,1 %** |
| Mouvement du 3 m pour 1 σ de PC1 ? | $0{,}21\times17{,}49=\mathbf{3{,}67}$ pb |
| Exposition à PC1 (table 21.9) ? | $\mathbf{-0{,}08}$ |
| Exposition à PC2 ? | $\mathbf{-4{,}40}$ |
| $\sigma_{\Delta P}$ ? | **26,66** |
| VaR 1 j 99 % par l'ACP ? | **62,12 millions de dollars** |
| Pourquoi pas de terme croisé ? | Les factor scores sont **non corrélés** |
| Erreur d'un seul facteur ici ? | **Sous-estimation grave** — l'exposition est sur PC2 |
| Erreur de la duration ici ? | Elle ne voit que les **translations** |
| ACP hors taux ? | Possible ; dépend de la **corrélation** des variables |
| Sur quoi conduire l'ACP pour la VaR ? | Sur les variations **en pourcentage** |
