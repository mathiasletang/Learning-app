# Fiche 95 — Risque de crédit : taux de hasard, modèle de Merton, CVA et copule gaussienne

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Gestion des risques |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 23 « Credit Risk » |
| **Difficulté** | Must know — le second grand risque des institutions financières, après le risque de marché |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 77 (obligations), 87 (Black-Scholes), 93 (VaR), 94 (corrélations) |
| **Concepts clés** | Notations de crédit, probabilité de défaut cumulée, taux de hasard, intensité de défaut, taux de recouvrement, extraction depuis les prix d'obligations, *asset swap spread*, probabilités réelles contre risque-neutres, modèle de Merton, ajustement de valeur de crédit (CVA), *netting*, collatéralisation, *downgrade trigger*, corrélation de défaut, copule gaussienne, modèle à un facteur, Credit VaR, formule de Vasicek, CreditMetrics |
| **Poids à l'examen** | $\bar\lambda=\dfrac{s}{1-R}$ · $Q(t)=1-e^{-\bar\lambda(t)t}$ · la table de perte actualisée en fonction de $Q$ · $E_0=V_0N(d_1)-De^{-rT}N(d_2)$ avec $\sigma_EE_0=N(d_1)\sigma_VV_0$ · la formule de **Vasicek**. |

## 🎯 Vue d'ensemble

```
LE RISQUE DE CRÉDIT   possibilité que les emprunteurs et contreparties FASSENT DÉFAUT

TROIS SOURCES D'ESTIMATION DE LA PROBABILITÉ DE DÉFAUT
  DONNÉES HISTORIQUES (agences)  → probabilités RÉELLES     Q(t) = 1 − e^{−λ̄t}
  PRIX D'OBLIGATIONS             → probabilités RISQUE-NEUTRES   λ̄ = s/(1−R)
  PRIX DES ACTIONS (Merton)      → N(−d₂), à recalibrer

USAGE      valoriser un instrument sensible au crédit  →  RISQUE-NEUTRES
           analyse de scénarios, Credit VaR            →  RÉELLES

DÉRIVÉS    3 catégories : toujours passif (aucun risque) · toujours actif · les deux
           CVA = Σ uᵢvᵢ   avec uᵢ = qᵢ(1−R)          f₀* = f₀ e^{−(y*−y)T}
ATTÉNUATION   netting · collatéralisation · downgrade triggers

CORRÉLATION  xᵢ = N⁻¹[Qᵢ(tᵢ)]  puis loi normale multivariée = COPULE GAUSSIENNE
UN FACTEUR   xᵢ = aᵢF + √(1−aᵢ²) Zᵢ      Q(T|F) = N[ (N⁻¹[Q(T)] − √ρ F) / √(1−ρ) ]
VASICEK      V(X,T) = N[ (N⁻¹[Q(T)] + √ρ N⁻¹(X)) / √(1−ρ) ]
```

**Le cadrage d'ouverture.** *La VaR du chapitre 21 et les lettres grecques du chapitre 18 visent à quantifier le **risque de marché**. Ce chapitre considère un autre risque important : le **risque de crédit**. **La plupart des institutions financières consacrent des ressources considérables à sa mesure et à sa gestion.** Les régulateurs exigent depuis de nombreuses années que les banques détiennent du capital pour refléter les risques de crédit qu'elles portent — **ce capital s'AJOUTE au capital exigé pour le risque de marché**.*

## 🟠 Concept 1 — Les notations de crédit

| Rang | Moody's | S&P / Fitch | Statut |
|---|---|---|---|
| 1 | **Aaa** | **AAA** | *considérées comme n'ayant **presque aucune chance** de faire défaut* |
| 2 | Aa | AA | **investment grade** |
| 3 | A | A | **investment grade** |
| 4 | **Baa** | **BBB** | **dernier échelon *investment grade*** |
| 5 | Ba | BB | spéculatif |
| 6 | B | B | spéculatif |
| 7 | Caa | CCC | spéculatif |
| 8 | Ca | CC | spéculatif |
| 9 | C | C | spéculatif |

> ⚠️ ***Seules les obligations notées Baa (BBB) ou au-dessus sont considérées comme « investment grade ».***

**Les crans fins.** Moody's divise Aa en **Aa1, Aa2, Aa3**, A en **A1, A2, A3**, etc. S&P et Fitch divisent AA en **AA+, AA, AA−**, A en **A+, A, A−**, etc. *Les catégories **Aaa/AAA ne sont PAS subdivisées**, ni habituellement les deux catégories les plus basses.*

## 🔴 Concept 2 — Probabilités de défaut historiques et taux de hasard

### 2.1 La table des agences

**Table 23.1 — taux de défaut cumulés moyens (%), 1970-2009, source Moody's** :

| Notation | 1 an | 2 | 3 | 4 | 5 | 7 | 10 | 15 | 20 |
|---|---|---|---|---|---|---|---|---|---|
| **Aaa** | 0,000 | 0,012 | 0,012 | 0,037 | 0,105 | 0,245 | 0,497 | 0,927 | 1,102 |
| **Aa** | 0,022 | 0,059 | 0,091 | 0,159 | 0,234 | 0,384 | 0,542 | 1,150 | 2,465 |
| **A** | 0,051 | 0,165 | 0,341 | 0,520 | 0,717 | 1,179 | 2,046 | 3,572 | 5,934 |
| **Baa** | 0,176 | 0,494 | 0,912 | 1,404 | 1,926 | 2,996 | 4,851 | 8,751 | 12,327 |
| **Ba** | 1,166 | 3,186 | 5,583 | 8,123 | 10,397 | 14,318 | 19,964 | 29,703 | 37,173 |
| **B** | 4,546 | 10,426 | 16,188 | 21,256 | 25,895 | 34,473 | 44,377 | 56,098 | 62,478 |
| **Caa-C** | 17,723 | 29,384 | 38,682 | 46,094 | 52,286 | 59,771 | 71,376 | 77,545 | 80,211 |

**Comment la lire.** *Une obligation notée Baa a **0,176 %** de chances de faire défaut avant la fin de la première année, **0,494 %** avant la fin de la deuxième, etc.* La probabilité de défaut **pendant** une année particulière se déduit par **différence** :

$$P(\text{défaut de Baa pendant la 2ᵉ année})=0{,}494-0{,}176=\mathbf{0{,}318\,\%}$$

**Le renversement de tendance, à connaître par cœur** :

| Qualité | Forme de la probabilité de défaut annuelle | Exemple chiffré | Raison donnée par Hull |
|---|---|---|---|
| **Investment grade** | **croissante** dans le temps | A-rated, années 0-5 / 5-10 / 10-15 / 15-20 : **0,717 % · 1,329 % · 1,526 % · 2,362 %** | *l'émetteur est **initialement** jugé solvable ; **plus le temps passe, plus grande est la possibilité que sa santé financière décline*** |
| **Mauvaise notation** | **décroissante** dans le temps | B-rated, mêmes tranches : **25,895 % · 18,482 % · 11,721 % · 6,380 %** | *pour une obligation mal notée, **les une ou deux prochaines années peuvent être critiques**. **Plus l'émetteur survit longtemps, plus grande est la chance que sa santé financière s'améliore*** |

### 2.2 Le taux de hasard (intensité de défaut)

<details class="details--riche">
<summary>

**Probabilité inconditionnelle contre taux de hasard — le calcul de référence**

</summary>

**Question :** quelle est, pour une obligation notée **Caa ou moins**, la probabilité de défaut **pendant la 3ᵉ année** ?

*Étape 1 — la probabilité INCONDITIONNELLE* (vue **à la date 0**) :

$$38{,}682-29{,}384=\mathbf{9{,}298\,\%}$$

*Étape 2 — la probabilité de SURVIE jusqu'à la fin de l'année 2 :*

$$100-29{,}384=\mathbf{70{,}616\,\%}$$

*Étape 3 — la probabilité de défaut pendant la 3ᵉ année **conditionnellement à l'absence de défaut antérieur** :*

$$\frac{0{,}09298}{0{,}70616}=\mathbf{13{,}17\,\%}$$

> ⚠️ ***Les probabilités de défaut CONDITIONNELLES s'appellent des TAUX DE HASARD (hazard rates) ou INTENSITÉS DE DÉFAUT.***

</details>

**La version en temps continu.** Le taux de hasard $\lambda(t)$ est défini de sorte que $\lambda(t)\Delta t$ soit la probabilité de défaut entre $t$ et $t+\Delta t$ **conditionnellement à l'absence de défaut antérieur**. Si $V(t)$ est la probabilité cumulée de survie jusqu'à $t$ :

$$\frac{V(t)-V(t+\Delta t)}{V(t)}=\lambda(t)\,\Delta t\quad\Longrightarrow\quad V(t+\Delta t)-V(t)=-\lambda(t)V(t)\,\Delta t$$

$$\text{à la limite}\quad\frac{dV(t)}{dt}=-\lambda(t)V(t)\quad\Longrightarrow\quad\boxed{V(t)=e^{-\int_0^t\lambda(\tau)\,d\tau}}$$

En définissant $Q(t)=1-V(t)$ comme la probabilité de défaut avant $t$ :

$$\boxed{Q(t)=1-e^{-\int_0^t\lambda(\tau)\,d\tau}=1-e^{-\bar\lambda(t)\,t}}\;\text{(23.1)}$$

où $\bar\lambda(t)$ est le **taux de hasard MOYEN** (intensité de défaut moyenne) entre 0 et $t$. La forme inverse, celle qu'on utilise le plus :

$$\boxed{\bar\lambda(t)=-\frac1t\ln\big[1-Q(t)\big]}$$

## 🟠 Concept 3 — Les taux de recouvrement

**La définition.** *Le taux de recouvrement d'une obligation est normalement défini comme **la valeur de marché de l'obligation quelques jours après un défaut, en pourcentage de sa valeur faciale**.* (Aux États-Unis, la créance d'un porteur d'obligation est **la valeur faciale plus les intérêts courus**.)

**Table 23.2 — taux de recouvrement moyens, 1982-2009, source Moody's** :

| Classe | Taux de recouvrement moyen (%) |
|---|---|
| **Prêt bancaire avec privilège de premier rang** (*first lien*) | **65,6** ← *le meilleur* |
| Prêt bancaire de second rang | 32,8 |
| Prêt bancaire senior non garanti | 48,7 |
| **Obligation senior garantie** | **49,8** |
| Obligation senior non garantie | 36,6 |
| Obligation senior subordonnée | 30,7 |
| Obligation subordonnée | 31,3 |
| **Obligation junior subordonnée** | **24,7** ← *le pire* |

*Pour les obligations, le taux de recouvrement moyen va de **49,8 %** pour celles qui sont **à la fois senior et garanties** à **24,7 %** pour celles qui **passent après les autres prêteurs** avec un intérêt de sûreté subordonné.*

> ⚠️ **Le fait le plus important de la section.** *Les taux de recouvrement sont **significativement NÉGATIVEMENT corrélés aux taux de défaut**. Cela signifie qu'**une mauvaise année pour le taux de défaut est généralement DOUBLEMENT mauvaise, parce qu'elle s'accompagne d'un faible taux de recouvrement**.*

| Taux de défaut annuel (obligations non *investment grade*) | Taux de recouvrement moyen |
|---|---|
| **0,1 %** | relativement **élevé, ≈ 60 %** |
| **3 %** | seulement **≈ 35 %** |

*(Altman, Brady, Resti et Sironi, « The Link between Default and Recovery Rates », Journal of Business, 2005.)*

## 🔴 Concept 4 — Estimer les probabilités de défaut à partir des prix d'obligations

**L'hypothèse fondatrice :** *la **seule** raison pour laquelle une obligation d'entreprise se vend moins cher qu'une obligation sans risque similaire est **la possibilité de défaut**.* *Cette hypothèse n'est pas parfaite : en pratique le prix d'une obligation d'entreprise est affecté par sa **liquidité** — plus la liquidité est faible, plus le prix est bas.*

### 4.1 Le calcul approché

**Le raisonnement en une phrase.** Une obligation rapporte 200 points de base de plus qu'une obligation sans risque similaire, et le taux de recouvrement attendu est 40 %. *Le détenteur doit s'attendre à **perdre 200 points de base** (soit 2 % par an) du fait des défauts. Étant donné le taux de recouvrement de 40 %, cela conduit à une probabilité de défaut par an, conditionnelle à l'absence de défaut antérieur, de $0{,}02/(1-0{,}4)=\mathbf{3{,}33\,\%}$.*

$$\boxed{\bar\lambda=\frac{s}{1-R}}\;\text{(23.2)}$$

| Symbole | Signification |
|---|---|
| $\bar\lambda$ | taux de hasard **moyen** (intensité de défaut) par an |
| $s$ | **spread** du rendement de l'obligation d'entreprise **au-dessus du taux sans risque** |
| $R$ | taux de **recouvrement** attendu |

### 4.2 Le calcul exact

<details class="details--riche">
<summary>

**Table 23.3 reconstruite entièrement — l'exercice canonique**

</summary>

**Données.** Obligation d'entreprise de **5 ans**, coupon **6 % par an payé semestriellement**, rendement **7 %** (composition continue). Obligation sans risque similaire : rendement **5 %** (composition continue). Nominal 100. Recouvrement 40.

*Étape 1 — les deux prix.*

$$P_{\text{corp}}=\sum_{k=1}^{10}3e^{-0{,}07\times k/2}+100e^{-0{,}07\times5}=\mathbf{95{,}34}$$

$$P_{\text{sans risque}}=\sum_{k=1}^{10}3e^{-0{,}05\times k/2}+100e^{-0{,}05\times5}=\mathbf{104{,}09}$$

*Étape 2 — la perte espérée totale sur 5 ans :*

$$104{,}09-95{,}34=\mathbf{8{,}75\ \text{dollars}}$$

*Étape 3 — le calendrier des défauts.* On suppose que les défauts peuvent survenir aux dates **0,5 · 1,5 · 2,5 · 3,5 · 4,5** ans, ***immédiatement AVANT les dates de paiement de coupon***, et que la probabilité **inconditionnelle** de défaut par an vaut $Q$, **la même chaque année**. Les taux sans risque de toutes maturités valent 5 %.

*Étape 4 — la ligne 3,5 ans, détaillée.* La valeur espérée de l'obligation à 3,5 ans (calculée avec les taux forward et **en supposant aucune possibilité de défaut**) inclut le coupon de 3 **dû à 3,5 et non encore versé** :

$$3+3e^{-0{,}05\times0{,}5}+3e^{-0{,}05\times1{,}0}+103e^{-0{,}05\times1{,}5}=\mathbf{104{,}34}$$

Le montant recouvré étant 40, la **perte en cas de défaut** vaut $104{,}34-40=\mathbf{64{,}34}$. Sa valeur actuelle : $64{,}34\times e^{-0{,}05\times3{,}5}=64{,}34\times0{,}8395=\mathbf{54{,}01}$. La perte espérée est donc $54{,}01\,Q$.

*Étape 5 — la table complète :*

| Date (ans) | Prob. de défaut | Recouvrement | Valeur sans risque | Perte en cas de défaut | Facteur d'actualisation | VA de la perte espérée |
|---|---|---|---|---|---|---|
| 0,5 | $Q$ | 40 | 106,73 | 66,73 | 0,9753 | $65{,}08\,Q$ |
| 1,5 | $Q$ | 40 | 105,97 | 65,97 | 0,9277 | $61{,}20\,Q$ |
| 2,5 | $Q$ | 40 | 105,17 | 65,17 | 0,8825 | $57{,}52\,Q$ |
| 3,5 | $Q$ | 40 | 104,34 | 64,34 | 0,8395 | $54{,}01\,Q$ |
| 4,5 | $Q$ | 40 | 103,46 | 63,46 | 0,7985 | $50{,}67\,Q$ |
|  |  |  |  |  | **Total** | $\mathbf{288{,}48\,Q}$ |

*Étape 6 — résoudre :*

$$288{,}48\,Q=8{,}75\quad\Longrightarrow\quad\boxed{Q=\frac{8{,}75}{288{,}48}=\mathbf{3{,}03\,\%}}$$

⚠️ **Les hypothèses simplificatrices, à énoncer.** *Le calcul suppose que la probabilité de défaut est **la même chaque année** et que **les défauts n'ont lieu qu'à un seul instant par an**. On peut étendre le calcul à des défauts plus fréquents ; au lieu d'une probabilité inconditionnelle constante on peut supposer un **taux de hasard constant** ou un profil particulier de variation.*

**L'extension multi-obligations, la « structure par terme des probabilités de défaut ».** Avec des obligations de maturités **3, 5, 7 et 10 ans**, on utilise :

| Obligation | Sert à estimer |
|---|---|
| 3 ans | la probabilité de défaut annuelle des **années 1 à 3** |
| 5 ans | celle des **années 4 et 5** |
| 7 ans | celle des **années 6 et 7** |
| 10 ans | celle des **années 8, 9 et 10** |

</details>

### 4.3 Quel « taux sans risque » ?

> ⚠️ ***Un enjeu clé, quand on utilise les prix d'obligations, est le SENS des termes « taux sans risque » et « obligation sans risque ».***

| Référence | Qui l'utilise |
|---|---|
| **Rendement des Treasuries** similaires | le *benchmark* habituel pour **coter** les rendements d'obligations d'entreprise (*« un spread de 250 points de base au-dessus des Treasuries »*) |
| **Taux LIBOR/swap** | ce que les traders utilisent comme proxy sans risque **pour valoriser les dérivés** — et souvent aussi pour calculer les probabilités de défaut |
| **LIBOR/swap moins 10 points de base** | le taux sans risque **implicite** dans les CDS, en moyenne |

*Pourquoi 10 points de base est plausible : le risque de crédit dans un taux de swap est celui d'une **série de prêts à court terme à des contreparties notées AA**, et **10 points de base est une prime de risque de défaut raisonnable pour un instrument court terme AA**.*

### 4.4 Les *asset swaps*

*En pratique, les traders utilisent souvent les **asset swap spreads** pour extraire les probabilités de défaut, **parce qu'ils fournissent une estimation DIRECTE du spread des rendements obligataires au-dessus de la courbe LIBOR/swap**.*

**Les trois configurations, pour un spread coté à 150 points de base** :

| Cas | Prix de l'obligation | Structure du swap |
|---|---|---|
| **1** | **au pair (100)** | A paie le **coupon de l'obligation** ; B paie **LIBOR + 150 pb** |
| **2** | **sous le pair (95)** | **en plus des coupons**, A paie **5 dollars par 100 de nominal au départ** ; B paie LIBOR + 150 pb |
| **3** | **au-dessus du pair (108)** | **en plus de LIBOR + 150 pb**, B paie **8 dollars par 100 de nominal au départ** ; A paie les coupons |

> ⚠️ ***Ce sont les coupons PROMIS qui sont échangés. Les échanges ont lieu que l'obligation fasse défaut ou non.***

**L'effet net :** *la valeur actuelle de l'asset swap spread **est le montant par lequel le prix de l'obligation d'entreprise est dépassé par le prix d'une obligation sans risque similaire**, le taux sans risque étant donné par la courbe LIBOR/swap.*

<details class="details--riche">
<summary>

**Reprendre la table 23.3 avec un asset swap spread de 150 pb**

</summary>

*Étape 1.* La courbe LIBOR/swap zéro est plate à 5 %. On ne connaît plus le prix de l'obligation, mais on sait que **l'asset swap spread est 150 points de base**.

*Étape 2.* L'écart entre valeur sans risque et valeur de l'obligation d'entreprise est **la valeur actuelle de 150 pb par an pendant 5 ans**. Avec des paiements semestriels (0,75 par semestre) :

$$\sum_{k=1}^{10}0{,}75\,e^{-0{,}05\times k/2}=\mathbf{6{,}55\ \text{dollars pour 100 de nominal}}$$

*Étape 3.* La perte totale de la table 23.3 est donc fixée à **6,55** au lieu de 8,75 :

$$Q=\frac{6{,}55}{288{,}48}=\mathbf{2{,}27\,\%\ \text{par an}}$$

</details>

## 🔴 Concept 5 — Réel contre risque-neutre : la comparaison qui structure tout le chapitre

### 5.1 Les deux tables de comparaison

*Les probabilités de défaut estimées à partir des données historiques sont **habituellement bien inférieures** à celles dérivées des prix d'obligations. **L'écart était particulièrement grand pendant la crise du crédit démarrée mi-2007**, à cause de ce qu'on appelle une **« fuite vers la qualité » (flight to quality)** : tous les investisseurs voulaient détenir des titres sûrs comme les Treasuries. Les prix des obligations d'entreprise ont chuté, leurs rendements ont augmenté, le spread $s$ a augmenté, et (23.2) a donné des estimations de probabilité de défaut **très élevées**.*

<details class="details--riche">
<summary>

**Le calcul des deux colonnes de la table 23.4 — méthode complète**

</summary>

**Côté historique.** On utilise la **colonne 7 ans** de la table 23.1 (*parce que les obligations Merrill Lynch examinées ont une durée de vie d'environ 7 ans*), avec

$$\bar\lambda(7)=-\frac17\ln\big[1-Q(7)\big]$$

*Exemple pour une entreprise notée A* : $Q(7)=0{,}01179$, donc

$$\bar\lambda(7)=-\frac17\ln(1-0{,}01179)=0{,}0017=\mathbf{0{,}17\,\%}$$

**Côté obligations.** On utilise (23.2) avec les rendements publiés par **Merrill Lynch**, moyennes entre **décembre 1996 et juin 2007**, recouvrement supposé **40 %**, et taux sans risque $=$ **taux de swap 7 ans moins 10 points de base**.

*Exemple pour A* : rendement moyen Merrill Lynch **5,995 %** ; taux de swap 7 ans moyen **5,408 %**, donc taux sans risque **5,308 %** :

$$\bar\lambda(7)=\frac{0{,}05995-0{,}05308}{1-0{,}4}=0{,}0115=\mathbf{1{,}15\,\%}$$

</details>

**Table 23.4 — taux de hasard moyens à 7 ans (% par an)** :

| Notation | Taux historique | Taux depuis les obligations | **Ratio** | **Différence** |
|---|---|---|---|---|
| **Aaa** | 0,04 | 0,60 | **17,0** | 0,56 |
| **Aa** | 0,05 | 0,73 | **13,2** | 0,67 |
| **A** | 0,17 | 1,15 | **6,8** | 0,98 |
| **Baa** | 0,43 | 2,13 | **4,9** | 1,69 |
| **Ba** | 2,21 | 4,67 | **2,1** | 2,46 |
| **B** | 6,04 | 8,02 | **1,3** | 1,98 |
| **Caa et moins** | 13,01 | 18,39 | **1,4** | 5,39 |

> ⚠️ **Les deux tendances OPPOSÉES, qu'il faut savoir énoncer :**
>
> - **le RATIO** des deux taux est **très élevé** pour les émetteurs *investment grade* et **DÉCLINE** quand la notation se dégrade ;
> - **la DIFFÉRENCE** entre les deux taux, elle, **AUGMENTE** quand la notation se dégrade.
>
> *(Les résultats pour les obligations notées B vont à l'encontre du schéma d'ensemble.)*

**Table 23.5 — rendement excédentaire espéré sur les obligations (points de base)** :

| Notation | Spread obligataire sur Treasuries | Spread du taux sans risque sur Treasuries | Spread pour défauts historiques | **Rendement excédentaire** |
|---|---|---|---|---|
| Aaa | 78 | 42 | 2 | **34** |
| Aa | 86 | 42 | 3 | **41** |
| A | 111 | 42 | 10 | **59** |
| Baa | 169 | 42 | 26 | **101** |
| Ba | 322 | 42 | 132 | **148** |
| B | 523 | 42 | 362 | **119** |
| Caa | 1 146 | 42 | 781 | **323** |

<details class="details--riche">
<summary>

**La ligne A, décomposée — 111 = 42 + 10 + 59**

</summary>

*Étape 1.* Le spread moyen sur les Treasuries 7 ans est **111 points de base**.

*Étape 2.* Sur ces 111, **42 points de base** sont expliqués par le spread moyen entre les Treasuries 7 ans et **notre proxy du taux sans risque** (le swap moins 10 pb).

*Étape 3.* **10 points de base** sont nécessaires pour couvrir les défauts espérés. *C'est le taux de hasard historique de la table 23.4 **multiplié par 0,6** pour tenir compte des recouvrements :* $0{,}17\,\%\times0{,}6=0{,}102\,\%\approx\mathbf{10}$ pb.

*Étape 4.* Il reste un **rendement excédentaire** (après prise en compte des défauts espérés) de

$$111-42-10=\mathbf{59\ \text{points de base}}$$

> ⚠️ **Le message des deux tables réunies.** *Une **grande différence en POURCENTAGE** entre les estimations de probabilité de défaut se traduit par un **PETIT (mais significatif) rendement excédentaire** sur l'obligation. Pour les Aaa, le ratio des taux de hasard est **17,0**, mais le rendement excédentaire espéré n'est que de **34 points de base**. **Le rendement excédentaire tend à augmenter quand la qualité de crédit décline.***

⚠️ *Le rendement excédentaire **ne reste pas constant dans le temps**. Les spreads de crédit, et donc les rendements excédentaires, étaient **élevés en 2001, 2002 et au premier semestre 2003**. Ensuite ils sont restés **assez faibles jusqu'à la crise du crédit**.*

</details>

### 5.2 Pourquoi l'écart ? Les quatre explications, classées

> ***Les probabilités de défaut implicites dans les rendements obligataires sont des probabilités RISQUE-NEUTRES.*** Pourquoi ? *Parce que le calcul de la table 23.3 suppose que **les pertes de défaut espérées peuvent être actualisées au taux sans risque**. Le principe de valorisation risque-neutre montre que c'est une procédure valide **pourvu que les pertes espérées soient calculées dans un monde risque-neutre**.*
>
> ***Par contraste, les probabilités implicites dans les données historiques sont des probabilités RÉELLES (parfois appelées « physiques »). Le rendement excédentaire de la table 23.5 provient DIRECTEMENT de la différence entre les deux.*** *S'il n'y avait pas de rendement excédentaire espéré, les probabilités réelles et risque-neutres seraient les mêmes, et réciproquement.*

| # | Explication | Verdict de Hull |
|---|---|---|
| 1 | Les obligations d'entreprise sont **relativement illiquides** et leurs rendements sont plus élevés pour compenser | *c'est vrai, **mais la recherche montre que cela n'explique PAS entièrement les résultats*** (Dick-Nielsen, Feldhütter, Lando, 2010 : la composante de liquidité est **relativement petite**) |
| 2 | Les **probabilités subjectives** des traders sont bien plus hautes que la table 23.1 (scénarios de dépression) | *il est **difficile de voir comment cela peut expliquer une grande partie** du rendement excédentaire observé* |
| 3 | **DE LOIN LA RAISON LA PLUS IMPORTANTE : les obligations ne font PAS défaut indépendamment les unes des autres** | **c'est l'explication centrale** |
| 4 | Le risque **non systématique (idiosyncratique)** est difficile à diversifier pour les obligations | contribue aussi |

<details class="details--riche">
<summary>

**L'explication 3 en détail — le risque systématique du crédit**

</summary>

*Il y a des périodes où les taux de défaut sont **très faibles** et des périodes où ils sont **très élevés**. Les statistiques de Moody's montrent qu'entre **1970 et 2009**, le taux de défaut annuel est allé d'un minimum de **0,09 % en 1979** à des maximums de **3,97 % en 2001** et **5,35 % en 2009**.*

**La variation d'une année sur l'autre engendre un RISQUE SYSTÉMATIQUE** (c'est-à-dire un risque **qui ne peut pas être diversifié**), et les traders obligataires perçoivent un **rendement espéré excédentaire pour le porter**. *(C'est analogue au rendement excédentaire des actionnaires calculé par le MEDAF.)*

Deux causes de la variation :

- les **conditions économiques d'ensemble** ;
- **le défaut d'une entreprise peut avoir un effet d'entraînement** provoquant les défauts d'autres entreprises — la ***contagion de crédit***.

**Et l'explication 4.** *S'il s'agissait d'actions, on dirait que les investisseurs peuvent diversifier le risque non systématique avec un portefeuille de 30 titres, et ne devraient donc pas exiger de prime pour ce risque. **Pour les obligations, l'argument est moins net.** Les rendements obligataires sont **fortement asymétriques avec un potentiel de hausse limité** : sur une obligation individuelle il peut y avoir **99,75 % de chances d'un rendement de 7 %** dans l'année et **0,25 % de chances d'un rendement de −60 %**, le premier correspondant à l'absence de défaut et le second au défaut. **Ce type de risque est difficile à « diversifier » : il faudrait des dizaines de milliers d'obligations différentes.** En pratique, beaucoup de portefeuilles obligataires sont loin d'être pleinement diversifiés.*

</details>

### 5.3 Quelle probabilité utiliser ?

$$\boxed{\begin{array}{ll}\textbf{Valoriser des dérivés de crédit, ajuster un prix pour le risque de défaut} & \Rightarrow\ \textbf{RISQUE-NEUTRES}\\[2pt] \textbf{Analyses de scénarios, pertes futures potentielles, Credit VaR} & \Rightarrow\ \textbf{RÉELLES}\end{array}}$$

*Raison : la valorisation calcule la **valeur actuelle de flux futurs espérés** et implique presque invariablement (implicitement ou explicitement) la **valorisation risque-neutre**.*

## 🔴 Concept 6 — Le modèle de Merton : les actions pour estimer le défaut

**La motivation.** *Quand on utilise une table comme la 23.1, on s'appuie sur la **notation de crédit** de l'entreprise. Malheureusement, **les notations sont révisées relativement peu souvent**. D'où l'argument que **les prix des actions fournissent une information plus à jour**.*

**L'idée de Merton (1974) : les capitaux propres sont une OPTION sur les actifs de l'entreprise.**

| Symbole | Signification |
|---|---|
| $V_0$, $V_T$ | valeur des actifs de l'entreprise aujourd'hui / en $T$ |
| $E_0$, $E_T$ | valeur des capitaux propres aujourd'hui / en $T$ |
| $D$ | remboursement de dette dû en $T$ |
| $\sigma_V$ | volatilité des **actifs** (supposée constante) |
| $\sigma_E$ | volatilité **instantanée** des capitaux propres |

*Si $V_T<D$, il est (au moins en théorie) **rationnel** pour l'entreprise de faire défaut sur la dette en $T$ ; la valeur des capitaux propres est alors **nulle**. Si $V_T>D$, l'entreprise doit rembourser et la valeur des capitaux propres vaut $V_T-D$ :*

$$\boxed{E_T=\max(V_T-D,\ 0)}$$

> ***Les capitaux propres sont donc un CALL sur la valeur des actifs, de prix d'exercice égal au remboursement exigé sur la dette.***

$$\boxed{E_0=V_0N(d_1)-De^{-rT}N(d_2)}\;\text{(23.3)}$$

$$d_1=\frac{\ln(V_0/D)+(r+\sigma_V^2/2)T}{\sigma_V\sqrt T}\qquad d_2=d_1-\sigma_V\sqrt T$$

$$\boxed{\text{Valeur de la dette aujourd'hui}=V_0-E_0}\qquad\boxed{\text{Probabilité risque-neutre de défaut}=N(-d_2)}$$

**Le problème pratique, et sa solution.** *Pour calculer $N(-d_2)$ il faut $V_0$ et $\sigma_V$. **Ni l'un ni l'autre n'est directement observable.** Mais si l'entreprise est cotée, **on observe $E_0$** : (23.3) fournit **une** condition. On peut aussi **estimer $\sigma_E$** à partir de données historiques ou d'options. Le lemme d'Itô donne la **seconde** condition :*

$$\sigma_EE_0=\frac{\partial E}{\partial V}\,\sigma_VV_0\qquad\Longrightarrow\qquad\boxed{\sigma_EE_0=N(d_1)\,\sigma_VV_0}\;\text{(23.4)}$$

> **(23.3) et (23.4) forment un système de deux équations à deux inconnues $V_0$ et $\sigma_V$.** *Pour résoudre deux équations non linéaires $F(x,y)=0$ et $G(x,y)=0$, on peut demander à Solver de **minimiser $[F(x,y)]^2+[G(x,y)]^2$**.*

<details class="details--riche">
<summary>

**Exemple 23.1 — le modèle de Merton, entièrement déroulé**

</summary>

**Données :** $E_0=3$ M, $\sigma_E=0{,}80$, $D=10$ M dû dans 1 an, $r=0{,}05$, $T=1$.

*Étape 1 — résoudre le système (23.3)-(23.4) :*

$$\boxed{V_0=12{,}40\ \text{M}\qquad\sigma_V=0{,}2123}$$

*(Vérification : $d_1=\frac{\ln(12{,}40/10)+(0{,}05+0{,}2123^2/2)}{0{,}2123}=1{,}3549$, d'où $E_0=12{,}40\,N(1{,}3549)-10e^{-0{,}05}N(1{,}1426)=3{,}00$ et $\sigma_E=N(1{,}3549)\times0{,}2123\times12{,}40/3=0{,}80$ )*

*Étape 2 — la probabilité de défaut.* $d_2=1{,}1408$ (valeur de Hull), donc

$$\boxed{N(-d_2)=N(-1{,}1408)=0{,}127=\mathbf{12{,}7\,\%}}$$

*Étape 3 — la valeur de marché de la dette :*

$$V_0-E_0=12{,}40-3=\mathbf{9{,}40\ \text{M}}$$

*Étape 4 — la valeur actuelle du paiement promis :*

$$10e^{-0{,}05\times1}=\mathbf{9{,}51\ \text{M}}$$

*Étape 5 — la perte espérée sur la dette :*

$$\text{EL}=\frac{9{,}51-9{,}40}{9{,}51}=\mathbf{1{,}2\,\%}\ \text{de sa valeur sans défaut}$$

*Étape 6 — remonter au taux de recouvrement.* Comme $\text{EL}=\text{PD}\times(1-\text{recouvrement})$ :

$$\boxed{\text{recouvrement}=1-\frac{\text{EL}}{\text{PD}}=1-\frac{1{,}2}{12{,}7}=\mathbf{91\,\%}}\ \text{de la valeur sans défaut de la dette}$$

</details>

**Les extensions et le verdict empirique.** *Le modèle de base a été étendu : une version suppose qu'un défaut survient **dès que la valeur des actifs passe sous un niveau barrière** ; une autre autorise des **paiements de dette à plusieurs dates**.*

> ⚠️ ***Le modèle de Merton et ses extensions produisent un BON CLASSEMENT des probabilités de défaut*** (risque-neutres ou réelles). *Cela signifie qu'une **transformation monotone** peut convertir la sortie du modèle en une bonne estimation de l'une ou l'autre. Il peut sembler étrange de prendre $N(-d_2)$, qui est en théorie une probabilité risque-neutre (puisqu'elle sort d'un modèle de valorisation d'options), pour estimer une probabilité **réelle** : **l'hypothèse sous-jacente est que le CLASSEMENT des probabilités risque-neutres des différentes entreprises est le même que celui de leurs probabilités réelles.***

*(Moody's KMV transforme la probabilité de Merton en probabilité réelle qu'elle appelle **EDF**, *expected default frequency* ; **CreditGrades** utilise Merton pour estimer des spreads de crédit.)*

## 🔴 Concept 7 — Le risque de crédit dans les opérations sur dérivés

### 7.1 Les trois catégories

*L'exposition de crédit sur une opération de dérivés est **plus compliquée** que sur un prêt, **parce que la créance qui sera présentée en cas de défaut est plus incertaine**.*

| Catégorie | Le contrat est… | Exemple | Risque de crédit ? |
|---|---|---|---|
| **1** | **toujours un PASSIF** pour l'institution | une **option vendue** | ***AUCUN***. Si la contrepartie fait faillite, il n'y a pas de perte : le dérivé est un **actif** de la contrepartie, il sera **conservé, dénoué, ou vendu à un tiers**. Résultat : **ni perte ni gain** |
| **2** | **toujours un ACTIF** pour l'institution | une **option achetée** | ***TOUJOURS***. Le dérivé est un **passif** de la contrepartie ; l'institution doit faire valoir une créance sur les actifs et **peut ne recevoir qu'un pourcentage**. *Typiquement, une créance née d'une opération sur dérivés est **non garantie et junior*** |
| **3** | **peut devenir l'un ou l'autre** | un **contrat forward** | **peut-être**. Perte si la contrepartie fait défaut quand la valeur est **positive** pour l'institution ; **aucune perte** si elle fait défaut quand la valeur est **négative** |

*Note : **une entreprise fait généralement défaut à cause d'une détérioration de sa santé financière globale, pas à cause de la valeur d'une transaction particulière**.*

### 7.2 Le CVA — *credit value adjustment*

Un dérivé dure jusqu'à $T$ et vaut $f_0$ aujourd'hui **en supposant aucun défaut**. Les défauts peuvent survenir aux dates $t_1,\dots,t_n$ (avec $t_n=T$) ; la valeur du dérivé (sans défaut) en $t_i$ est $f_i$ ; $q_i$ est la probabilité **risque-neutre** de défaut en $t_i$ ; $R$ le taux de recouvrement attendu.

**L'exposition** en $t_i$ est la perte potentielle : $\boxed{\max(f_i,0)}$. La perte espérée risque-neutre en $t_i$ vaut $q_i(1-R)\hat E[\max(f_i,0)]$, d'où :

$$\boxed{\text{CVA}=\sum_{i=1}^{n}u_iv_i}\;\text{(23.5)}\qquad\text{avec}\qquad\boxed{u_i=q_i(1-R)}$$

et $v_i$ = **la valeur aujourd'hui d'un instrument qui verse l'exposition du dérivé en $t_i$**.

⚠️ *Hypothèses : le recouvrement espéré vaut $R$ fois l'exposition, et **le taux de recouvrement et la probabilité de défaut sont INDÉPENDANTS de la valeur du dérivé**.*

**Le CVA catégorie par catégorie** :

| Catégorie | Traitement |
|---|---|
| **1** ($f_i$ toujours négatif) | $\max(f_i,0)=0$ : **le CVA est toujours NUL**, aucun ajustement à faire. *(Bien sûr, la contrepartie peut vouloir tenir compte de la possibilité que **l'institution** fasse défaut dans son propre prix.)* |
| **2** ($f_i$ toujours positif) | $\max(f_i,0)=f_i$ ; si le seul flux est en $T$, alors $f_0$ est la valeur actuelle de $f_i$, donc $v_i=f_0$ pour tout $i$ (voir ci-dessous) |
| **3** (signe incertain) | ***$v_i$ est un CALL sur $f_i$ de prix d'exercice ZÉRO.*** On le calcule par **simulation** des variables de marché sous-jacentes ; parfois des calculs analytiques approchés sont possibles |

<details class="details--riche">
<summary>

**La catégorie 2 : de (23.5) à la formule d'actualisation au taux risqué**

</summary>

*Étape 1 — le coût des défauts :*

$$\text{CVA}=\sum_{i=1}^{n}f_0\,q_i(1-R)$$

*Étape 2 — la valeur réelle $f_0^\ast$ (après prise en compte des défauts) :*

$$f_0^\ast=f_0-f_0\sum_{i=1}^{n}q_i(1-R)=f_0\left[1-\sum_{i=1}^{n}q_i(1-R)\right]\;\text{(23.6)}$$

*Étape 3 — le parallèle avec une obligation.* Soit une **obligation zéro-coupon non garantie** promettant 1 dollar en $T$, **émise par la contrepartie**. Avec $B_0$ sa valeur sans possibilité de défaut et $B_0^\ast$ sa valeur réelle, **en supposant le même taux de recouvrement en pourcentage de la valeur sans défaut** :

$$B_0^\ast=B_0\left[1-\sum_{i=1}^{n}q_i(1-R)\right]\;\text{(23.7)}$$

*Étape 4 — diviser (23.6) par (23.7) :*

$$\boxed{\frac{f_0^\ast}{f_0}=\frac{B_0^\ast}{B_0}}\;\text{(23.8)}$$

*Étape 5 — passer aux rendements.* Avec $y$ le rendement d'un zéro-coupon **sans risque** de maturité $T$ et $y^\ast$ celui du zéro-coupon **émis par la contrepartie**, $B_0=e^{-yT}$ et $B_0^\ast=e^{-y^\ast T}$ :

$$\boxed{f_0^\ast=f_0\,e^{-(y^\ast-y)T}}\;\text{(23.9)}$$

> ***Tout dérivé promettant un payoff en $T$ peut être valorisé en AUGMENTANT le taux d'actualisation appliqué au payoff espéré risque-neutre, du taux sans risque $y$ au taux risqué $y^\ast$.***

**Exemple 23.2.** *Une option de gré à gré à 2 ans vendue par la société X vaut **3 dollars** en supposant aucune possibilité de défaut. Les zéro-coupon à 2 ans émis par X ont un rendement **1,5 % supérieur** à un zéro-coupon sans risque similaire :*

$$f_0^\ast=3\,e^{-0{,}015\times2}=\mathbf{2{,}91\ \text{dollars}}$$

</details>

### 7.3 Right-way risk et wrong-way risk

⚠️ **La limite de l'hypothèse d'indépendance.** *Elle est raisonnable quand le dérivé est **une petite partie du portefeuille de la contrepartie** ou quand la contrepartie l'utilise **pour se couvrir**. **Quand une contrepartie veut entrer dans une grosse opération de dérivés à des fins SPÉCULATIVES, une institution financière doit se méfier** : quand l'opération a une grosse valeur négative pour la contrepartie (et positive pour l'institution), **la probabilité de faillite de la contrepartie peut être bien plus élevée** que dans la situation inverse.*

| Terme | Définition |
|---|---|
| ***Right-way risk*** | la contrepartie a le plus de chances de faire défaut quand l'institution a une exposition **nulle ou très faible** |
| ***Wrong-way risk*** | la contrepartie a le plus de chances de faire défaut quand l'institution a une **grosse exposition** |

## 🟠 Concept 8 — L'atténuation du risque de crédit

> *Dans beaucoup de cas, l'analyse précédente **SURESTIME** le risque de crédit d'une opération de dérivés, parce qu'il existe un certain nombre de clauses que les dealers incluent dans leurs contrats pour l'atténuer.*

### 8.1 Le *netting* (compensation)

**La clause**, devenue standard dans les *Master Agreements* du marché de gré à gré : ***si une entreprise fait défaut sur UNE transaction avec une contrepartie, elle doit faire défaut sur TOUTES les transactions en cours avec cette contrepartie.*** *Le netting a été testé avec succès devant les tribunaux dans la plupart des juridictions.*

<details class="details--riche">
<summary>

**L'exemple chiffré du netting — 40 M contre 15 M**

</summary>

**Situation.** Trois transactions en cours avec une contrepartie, valant pour l'institution **+10 M**, **+30 M** et **−25 M**. Pour la contrepartie, elles valent respectivement **−10 M**, **−30 M** et **+25 M**.

*Sans netting.* La contrepartie fait défaut sur les deux premières (qui sont pour elle des passifs) et **conserve la troisième** (qui est pour elle un actif) :

$$\text{perte pour l'institution}=10+30=\mathbf{40\ \text{millions}}$$

*Avec netting.* Elle est **contrainte de faire défaut sur les trois** :

$$\text{perte}=10+30-25=\mathbf{15\ \text{millions}}$$

⚠️ **La nuance de la note de bas de page.** *Si la troisième transaction valait **−45 M** au lieu de −25 M pour l'institution, **la contrepartie choisirait de ne PAS faire défaut du tout** et il n'y aurait aucune perte* (le solde net $10+30-45=-5$ lui est favorable).

*Étape formelle.* Avec $N$ transactions de valeurs sans défaut $V_i$ :

|  | Perte de l'institution | Interprétation optionnelle |
|---|---|---|
| **Sans netting** | $(1-R)\displaystyle\sum_{i=1}^{N}\max(V_i,0)$ | le payoff d'un **PORTEFEUILLE d'options** d'exercice zéro |
| **Avec netting** | $(1-R)\max\Big(\displaystyle\sum_{i=1}^{N}V_i,\ 0\Big)$ | le payoff d'une **OPTION UNIQUE sur le portefeuille**, d'exercice zéro |

> ⚠️ ***La valeur d'une OPTION SUR UN PORTEFEUILLE n'est JAMAIS supérieure — et est souvent considérablement inférieure — à la valeur du PORTEFEUILLE D'OPTIONS correspondant.***

**L'extension du CVA.** L'équation (23.5) donne la valeur actuelle de la perte espérée sur **toutes** les transactions avec une contrepartie **lorsqu'un accord de netting est en place**, en **redéfinissant $v_i$** comme la valeur actuelle d'un dérivé qui verse l'exposition en $t_i$ **sur le PORTEFEUILLE de toutes les transactions**.

⚠️ **Le point contre-intuitif à retenir.** *Une tâche difficile est de calculer **l'effet INCRÉMENTAL** d'une nouvelle transaction sur les pertes de crédit espérées : on applique (23.5) **avec et sans** la transaction. **Du fait du netting, l'effet incrémental d'une nouvelle transaction peut être NÉGATIF** — cela arrive quand la valeur de la nouvelle transaction est **négativement corrélée** à la valeur des transactions existantes.*

</details>

### 8.2 La collatéralisation

**Le mécanisme.** *Un accord type spécifie que les transactions sont **valorisées périodiquement**. Si la valeur totale des transactions pour l'institution est **au-dessus d'un niveau seuil**, l'accord exige que **le collatéral cumulé déposé par l'entreprise égale la différence entre cette valeur et le seuil**. Si ensuite la valeur bouge en faveur de l'entreprise, **elle peut réclamer une partie de la marge**. En cas de défaut, **l'institution peut saisir le collatéral** ; si l'entreprise ne dépose pas le collatéral demandé, **l'institution peut dénouer les transactions**.*

<details class="details--riche">
<summary>

**L'exemple à trois jours — seuil de 10 millions**

</summary>

| Jour | Valeur des transactions pour l'institution | Action |
|---|---|---|
| **1** | passe de 9 M à **10,5 M** | l'institution peut demander **0,5 M** de collatéral |
| **2** | monte à **11,4 M** | elle peut demander **0,9 M supplémentaires** |
| **3** | retombe à **10,9 M** | **l'entreprise peut demander la restitution de 0,5 M** |

> ⚠️ ***Le seuil (ici 10 millions) peut être vu comme une LIGNE DE CRÉDIT que l'institution est prête à accorder à l'entreprise.***

**Les détails opérationnels :**

- la marge est déposée **en espèces ou en titres acceptables** comme des obligations ;
- les titres subissent une décote appelée ***haircut*** appliquée à leur valeur de marché ;
- **des intérêts sont normalement versés sur les espèces** ;
- si l'accord est **bilatéral**, un seuil est aussi fixé **pour l'institution financière**, et l'entreprise peut lui demander de déposer du collatéral.

⚠️ **Les deux limites de la protection.**

1. **Le montant du seuil n'est PAS protégé.**
2. *Même quand le seuil est **zéro**, la protection **n'est pas totale** : quand une entreprise entre en difficulté, **elle a tendance à cesser de répondre aux appels de collatéral**. Le temps que la contrepartie exerce son droit de dénouer les contrats, **leur valeur peut avoir encore bougé en sa défaveur**.*

</details>

### 8.3 Les *downgrade triggers*

**La clause :** *si la notation de la contrepartie **tombe sous un certain niveau**, disons Baa, **l'institution a l'option de dénouer la transaction à sa valeur de marché**.*

| Limite | Explication |
|---|---|
| **Saut brutal** | *ils **ne protègent pas** d'un grand saut de notation (par exemple **de A au défaut**)* |
| **Usage massif** | *ils **ne fonctionnent bien que si on en fait relativement peu usage**. Si une entreprise a de nombreux downgrade triggers en cours avec ses contreparties, **ils risquent de n'offrir que peu de protection à aucune d'entre elles*** |

<details class="details--riche">
<summary>

**Business Snapshot 23.1 — les downgrade triggers et la faillite d'Enron**

</summary>

*En **décembre 2001**, **Enron**, l'une des plus grandes entreprises des États-Unis, fait faillite. **Jusqu'aux tout derniers jours, elle avait une notation investment grade** : la note Moody's immédiatement avant le défaut était **Baa3** et la note S&P **BBB−**. **Le défaut était cependant anticipé dans une certaine mesure par le marché actions**, car le cours d'Enron avait fortement chuté dans la période précédant la faillite : la probabilité de défaut estimée par des modèles comme celui de Merton **avait fortement augmenté** pendant cette période.*

**Le mécanisme fatal.** *Enron avait conclu **un nombre énorme d'opérations de dérivés avec downgrade triggers** stipulant que si sa notation tombait sous investment grade (sous Baa3/BBB−), **ses contreparties auraient l'option de dénouer les transactions**. Supposons qu'Enron ait été dégradée sous investment grade en octobre 2001 : **les transactions que les contreparties auraient choisi de dénouer sont celles à valeur NÉGATIVE pour Enron** (et positive pour elles). **Enron aurait donc dû verser d'énormes paiements en espèces. Elle n'aurait pas pu le faire, et la faillite immédiate en aurait résulté.***

> ⚠️ ***Quand une entreprise conclut un nombre énorme de contrats avec downgrade triggers, ils peuvent en réalité PROVOQUER sa faillite prématurément.***

**Le dilemme des agences.** *On pourrait arguer qu'Enron allait faire faillite de toute façon et qu'accélérer l'événement de deux mois n'aurait pas fait de mal. **En fait, Enron avait une chance de survie en octobre 2001** : des tentatives étaient en cours pour monter un accord avec une autre entreprise énergétique, **Dynegy**, et forcer la faillite en octobre 2001 n'était **dans l'intérêt ni des créanciers ni des actionnaires**.*

*Les agences de notation se trouvaient dans une position difficile : **si elles dégradaient Enron pour reconnaître sa position financière détériorée, elles signaient son arrêt de mort. Si elles ne le faisaient pas, Enron avait une chance de survivre.***

</details>

## 🔴 Concept 9 — La corrélation de défaut et la copule gaussienne

### 9.1 Pourquoi elle existe, et les deux familles de modèles

**Les quatre causes.**

1. Les entreprises **du même secteur ou de la même région** sont affectées de manière similaire par les événements externes.
2. Les **conditions économiques** font que les taux de défaut moyens sont plus élevés certaines années.
3. **Le défaut d'une entreprise peut en provoquer un autre** — l'effet de ***contagion de crédit***.
4. La conséquence : ***la corrélation de défaut signifie que le risque de crédit ne peut PAS être complètement diversifié — c'est la raison majeure pour laquelle les probabilités risque-neutres dépassent les probabilités réelles.***

|  | **Modèles à forme réduite** (*reduced form*) | **Modèles structurels** |
|---|---|---|
| **Principe** | les **taux de hasard** suivent des processus stochastiques **corrélés aux variables macroéconomiques**. Quand le taux de A est élevé, celui de B tend à l'être | fondés sur un modèle à la **Merton** : une entreprise fait défaut si la valeur de ses actifs passe sous un certain niveau. La corrélation vient de la **corrélation entre les processus suivis par les actifs** |
| **Avantages** | mathématiquement séduisants ; reflètent la génération de corrélation par les **cycles économiques** | **la corrélation peut être rendue aussi élevée qu'on veut** |
| **Inconvénient** | ***la gamme de corrélations atteignables est LIMITÉE*** : même avec une corrélation parfaite entre les taux de hasard, la probabilité que les deux fassent défaut **dans la même courte période** reste très faible | ils sont ***susceptibles d'être assez lents en calcul*** |
| **Remède** | étendre le modèle pour que le taux de hasard présente de **grands sauts** | — |

*Le problème du premier est réel : **quand deux entreprises opèrent dans le même secteur et le même pays, ou quand la santé financière de l'une dépend fortement de celle de l'autre, une corrélation de défaut relativement élevée peut être justifiée**.*

### 9.2 Le modèle de copule gaussienne pour le temps jusqu'au défaut

*Un modèle devenu **un outil pratique populaire**. On peut le caractériser comme **un modèle structurel simplifié**. **Il suppose que toutes les entreprises finiront par faire défaut** et tente de quantifier la corrélation entre les lois des temps jusqu'au défaut.*

| Version | Source de la queue gauche de la loi |
|---|---|
| **Réelle** | les données des agences (table 23.1) |
| **Risque-neutre** | les prix d'obligations (§4) |

**Le problème :** *la loi du temps jusqu'au défaut d'une entreprise **n'est même pas approximativement normale**. C'est là qu'intervient la copule gaussienne.* On transforme $t_1$ et $t_2$ en :

$$\boxed{x_1=N^{-1}\big[Q_1(t_1)\big]\qquad x_2=N^{-1}\big[Q_2(t_2)\big]}$$

où $Q_1$ et $Q_2$ sont les **lois cumulées** de $t_1$ et $t_2$ et $N^{-1}$ l'inverse de la loi normale cumulée.

> ***Ce sont des transformations « PERCENTILE À PERCENTILE ».*** *Le point du 5ᵉ percentile de la loi de $t_1$ est transformé en $x_1=-1{,}645$, qui est le 5ᵉ percentile de la loi normale centrée réduite ; le 10ᵉ percentile est transformé en $x_1=-1{,}282$, qui est le 10ᵉ percentile de la normale ; et ainsi de suite.*

**Par construction, $x_1$ et $x_2$ suivent des lois normales de moyenne 0 et d'écart-type 1.** *Le modèle **suppose que leur loi jointe est normale bivariée** : c'est ce qu'on appelle **utiliser une copule gaussienne**. L'hypothèse est commode car elle signifie que **la loi jointe de $t_1$ et $t_2$ est entièrement définie par les lois cumulées $Q_1$ et $Q_2$ PLUS UN SEUL paramètre de corrélation**.*

**L'extension à $n$ entreprises :** $x_i=N^{-1}[Q_i(t_i)]$ pour chaque $i$, puis on suppose les $x_i$ **normaux multivariés**. La corrélation de défaut entre $t_i$ et $t_j$ **se mesure comme la corrélation entre $x_i$ et $x_j$** : c'est la ***corrélation de copule***.

> ⚠️ ***La copule gaussienne est une façon utile de représenter la structure de corrélation entre des variables qui ne sont PAS normalement distribuées. Elle permet d'estimer la structure de corrélation SÉPARÉMENT des lois marginales.***
>
> *En approximation, la corrélation de copule entre $t_i$ et $t_j$ est **souvent supposée égale à la corrélation entre les rendements des ACTIONS** des entreprises $i$ et $j$.*

<details class="details--riche">
<summary>

**Exemple 23.3 — simuler les défauts de 10 entreprises sur 5 ans**

</summary>

**Données.** Corrélation de copule **0,2** entre chaque paire. Pour chaque entreprise, la probabilité **cumulée** de défaut sur 1, 2, 3, 4, 5 ans vaut **1 %, 3 %, 6 %, 10 %, 15 %**.

*Étape 1 — le tirage.* On tire dans une loi **normale multivariée** pour obtenir les $x_i$ ($1\leqslant i\leqslant10$), avec une corrélation par paire de **0,2**.

*Étape 2 — les seuils.* On convertit chaque $x_i$ en un temps de défaut $t_i$ :

| Valeur tirée $x_i$ | Défaut |
|---|---|
| $x_i<N^{-1}(0{,}01)=\mathbf{-2{,}33}$ | pendant la **1ʳᵉ année** |
| $-2{,}33\leqslant x_i<N^{-1}(0{,}03)=\mathbf{-1{,}88}$ | pendant la **2ᵉ année** |
| $-1{,}88\leqslant x_i<N^{-1}(0{,}06)=\mathbf{-1{,}55}$ | pendant la **3ᵉ année** |
| $-1{,}55\leqslant x_i<N^{-1}(0{,}10)=\mathbf{-1{,}28}$ | pendant la **4ᵉ année** |
| $-1{,}28\leqslant x_i<N^{-1}(0{,}15)=\mathbf{-1{,}04}$ | pendant la **5ᵉ année** |
| $x_i>-1{,}04$ | **aucun défaut** pendant les 5 ans |

*Étape 3 — la mécanique.* Les seuils sont **les mêmes pour toutes les entreprises** (les $Q_i$ sont identiques) ; **c'est la corrélation entre les tirages qui crée le regroupement des défauts**.

</details>

### 9.3 La structure de corrélation à un facteur

*Pour éviter de définir une corrélation différente pour **chaque paire** d'entreprises, on utilise souvent un **modèle à un facteur** :*

$$\boxed{x_i=a_iF+\sqrt{1-a_i^2}\,Z_i}\;\text{(23.10)}$$

| Symbole | Rôle |
|---|---|
| $F$ | un **facteur commun** affectant les défauts de **toutes** les entreprises |
| $Z_i$ | un facteur affectant **seulement** l'entreprise $i$ |
| $F$ et $Z_i$ | lois normales centrées réduites **indépendantes** |
| $a_i$ | paramètres constants entre $-1$ et $+1$ ; *souvent approximé par la corrélation des rendements de l'action $i$ avec un **indice de marché bien diversifié*** |

$$\boxed{\text{corrélation}(x_i,x_j)=a_ia_j}$$

<details class="details--riche">
<summary>

**La dérivation de la probabilité conditionnelle (23.11)**

</summary>

*Étape 1 — la condition de défaut.* Sous la copule gaussienne, un défaut survient avant $T$ quand $N(x_i)<Q_i(T)$, c'est-à-dire quand

$$x_i<N^{-1}\big[Q_i(T)\big]$$

*Étape 2 — substituer (23.10) :*

$$a_iF+\sqrt{1-a_i^2}\,Z_i<N^{-1}\big[Q_i(T)\big]$$

*Étape 3 — isoler $Z_i$ :*

$$Z_i<\frac{N^{-1}\big[Q_i(T)\big]-a_iF}{\sqrt{1-a_i^2}}$$

*Étape 4 — $Z_i$ étant normale centrée réduite, conditionnellement à $F$ :*

$$\boxed{Q_i(T\mid F)=N\!\left(\frac{N^{-1}\big[Q_i(T)\big]-a_iF}{\sqrt{1-a_i^2}}\right)}\;\text{(23.11)}$$

*Étape 5 — le cas homogène.* Si $Q_i(T)=Q(T)$ pour tout $i$ et si la corrélation commune vaut $\rho$, alors $a_i=\sqrt\rho$ pour tout $i$ et :

$$\boxed{Q(T\mid F)=N\!\left(\frac{N^{-1}\big[Q(T)\big]-\sqrt\rho\,F}{\sqrt{1-\rho}}\right)}\;\text{(23.12)}$$

> **La lecture économique :** $F$ est **l'état du monde**. Un $F$ **très négatif** = mauvaise conjoncture ⇒ $Q(T\mid F)$ **grande** ⇒ beaucoup de défauts simultanés. **C'est exactement le mécanisme qui rend le risque de crédit non diversifiable.**

</details>

## 🔴 Concept 10 — Le Credit VaR

### 10.1 La formule de Vasicek

**La définition.** *Le Credit VaR se définit **analogiquement** à la VaR de marché. Par exemple, un Credit VaR à **99,9 %** sur **1 an** est la perte de crédit dont on est certain à 99,9 % qu'elle ne sera pas dépassée en un an.*

<details class="details--riche">
<summary>

**La dérivation de (23.13) — de la probabilité conditionnelle au quantile**

</summary>

**Cadre.** Une banque avec un **très grand portefeuille de prêts similaires**. En approximation : **même probabilité de défaut** pour chaque prêt, **même corrélation** entre chaque paire.

*Étape 1.* Sous la copule gaussienne, le membre de droite de (23.12) est, **en très bonne approximation, le POURCENTAGE de défauts avant $T$ en fonction de $F$**.

*Étape 2.* $F$ suit une loi normale centrée réduite. On est certain à $X\%$ que sa valeur sera **supérieure** à

$$N^{-1}(1-X)=-N^{-1}(X)$$

*Étape 3.* Comme $Q(T\mid F)$ est **décroissante** en $F$, on est donc certain à $X\%$ que le pourcentage de pertes sur $T$ années sera **inférieur** à $V(X,T)$ obtenu en remplaçant $F$ par $-N^{-1}(X)$ dans (23.12) :

$$\boxed{V(X,T)=N\!\left(\frac{N^{-1}\big[Q(T)\big]+\sqrt\rho\,N^{-1}(X)}{\sqrt{1-\rho}}\right)}\;\text{(23.13)}$$

*(Résultat produit pour la première fois par **Vasicek**, working paper KMV 1987, publié dans *Risk* en décembre 2002 sous le titre « Loan Portfolio Value ».)*

*Étape 4 — passer du taux de défaut à la perte :*

$$\boxed{\text{Credit VaR}\approx L(1-R)\,V(X,T)}\qquad\text{contribution d'un prêt }i:\ \ L_i(1-R)\,V(X,T)$$

où $L$ est la taille du portefeuille de prêts et $R$ le taux de recouvrement. ***Ce modèle sous-tend certaines des formules que les régulateurs utilisent pour le capital de risque de crédit.***

</details>

<details class="details--riche">
<summary>

**Exemple 23.4 — un Credit VaR de bout en bout**

</summary>

**Données.** Une banque a **100 millions de dollars** d'expositions de détail. Probabilité de défaut à 1 an : **2 %** en moyenne. Taux de recouvrement : **60 %**. Corrélation de copule : $\rho=\mathbf{0{,}1}$. Niveau de confiance **99,9 %**.

*Étape 1 — les deux quantiles :*

$$N^{-1}(0{,}02)=-2{,}0537\qquad N^{-1}(0{,}999)=3{,}0902$$

*Étape 2 — appliquer (23.13) :*

$$V(0{,}999;1)=N\!\left(\frac{-2{,}0537+\sqrt{0{,}1}\times3{,}0902}{\sqrt{0{,}9}}\right)=N\!\left(\frac{-2{,}0537+0{,}9772}{0{,}9487}\right)=N(-1{,}1348)=\mathbf{0{,}128}$$

*Étape 3 — la lecture :* **le taux de défaut du pire cas à 99,9 % est 12,8 %**.

*Étape 4 — le Credit VaR :*

$$100\times0{,}128\times(1-0{,}6)=\mathbf{5{,}13\ \text{millions de dollars}}$$

⚠️ **Le point à mesurer.** Le taux de défaut **moyen** est de 2 %, mais le taux de défaut **du pire cas à 99,9 %** vaut **12,8 %** — plus de **six fois** plus. **C'est tout l'effet de la corrélation** : avec $\rho=0$, (23.13) donnerait exactement 2 %.

</details>

### 10.2 CreditMetrics

**Le principe.** *Estimer une loi de probabilité des pertes de crédit en menant une **simulation de Monte-Carlo des CHANGEMENTS DE NOTATION de toutes les contreparties**.* Sur chaque essai : on tire les changements de notation et les défauts de toutes les contreparties pendant l'année, puis **on revalorise les contrats en cours** pour obtenir le total des pertes de crédit de l'année.

|  | Verdict |
|---|---|
| **Inconvénient** | *susceptible d'être **assez intensif en calcul*** |
| **Avantage 1** | ***les pertes de crédit incluent celles qui proviennent des DÉGRADATIONS de notation, pas seulement des défauts*** |
| **Avantage 2** | l'impact des clauses d'atténuation du §8 peut être **approximativement intégré** |

**Table 23.6 — matrice de transition à 1 an, 1970-2009 (%), source Moody's** *(ajustée des transitions vers la catégorie WR, « sans notation »)* :

| Notation initiale | Aaa | Aa | A | Baa | Ba | B | Caa | Ca-C | **Défaut** |
|---|---|---|---|---|---|---|---|---|---|
| **Aaa** | 90,57 | 8,76 | 0,63 | 0,01 | 0,03 | 0,00 | 0,00 | 0,00 | **0,00** |
| **Aa** | 1,06 | 90,30 | 8,19 | 0,36 | 0,05 | 0,02 | 0,01 | 0,00 | **0,02** |
| **A** | 0,06 | 2,90 | **90,91** | 5,44 | 0,50 | 0,09 | 0,03 | 0,00 | **0,05** |
| **Baa** | 0,04 | 0,20 | 4,91 | 89,18 | 4,44 | 0,83 | 0,19 | 0,02 | **0,17** |
| **Ba** | 0,01 | 0,07 | 0,42 | 6,24 | 83,47 | 7,99 | 0,58 | 0,09 | **1,13** |
| **B** | 0,01 | 0,04 | 0,15 | 0,39 | 5,40 | 82,50 | 6,35 | 0,79 | **4,37** |
| **Caa** | 0,00 | 0,02 | 0,02 | 0,19 | 0,51 | 9,55 | 70,01 | 4,97 | **14,72** |
| **Ca-C** | 0,00 | 0,00 | 0,00 | 0,00 | 0,43 | 3,01 | 11,61 | 51,67 | **33,28** |
| **Défaut** | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | 0,00 | **100,00** |

*Lecture : une obligation notée **A** a **90,91 %** de chances d'être encore A dans un an, **0,05 %** de faire défaut pendant l'année, **0,09 %** de tomber en B, etc.*

<details class="details--riche">
<summary>

**Les seuils de simulation CreditMetrics — Aaa et Baa, corrélation 0,2**

</summary>

*Principe.* ***Les changements de notation de contreparties différentes ne doivent PAS être supposés indépendants.*** On utilise typiquement une **copule gaussienne** pour construire la loi jointe des changements de notation, la corrélation de copule étant *habituellement fixée égale à la corrélation entre les rendements des actions* via un modèle à facteur.

*Le montage.* On tire deux variables $x_A$ et $x_B$ de lois normales **de corrélation 0,2**. $x_A$ détermine la nouvelle notation de la Aaa, $x_B$ celle de la Baa. **On cumule les probabilités de la ligne correspondante en partant du bas (le défaut) vers le haut, et on inverse la normale.**

*Les seuils de la Aaa* (on cumule depuis Aaa vers le bas car il n'y a pas de défaut) :

| Condition | Résultat |
|---|---|
| $x_A<N^{-1}(0{,}9057)=\mathbf{1{,}3147}$ | reste **Aaa** |
| $1{,}3147\leqslant x_A<N^{-1}(0{,}9057+0{,}0876)=N^{-1}(0{,}9933)=\mathbf{2{,}4730}$ | devient **Aa** |
| $2{,}4730\leqslant x_A<N^{-1}(0{,}9057+0{,}0876+0{,}0063)=N^{-1}(0{,}9996)=\mathbf{3{,}3528}$ | devient **A** |
| … | … |

⚠️ *La Aaa **ne fait jamais défaut** pendant l'année* (probabilité 0,00 dans la table).

*Les seuils de la Baa* (on cumule cette fois depuis le HAUT, Aaa d'abord) :

| Condition | Résultat |
|---|---|
| $x_B<N^{-1}(0{,}0004)=\mathbf{-3{,}3528}$ | devient **Aaa** |
| $-3{,}3528\leqslant x_B<N^{-1}(0{,}0004+0{,}0020)=N^{-1}(0{,}0024)=\mathbf{-2{,}8202}$ | devient **Aa** |
| $-2{,}8202\leqslant x_B<N^{-1}(0{,}0004+0{,}0020+0{,}0491)=N^{-1}(0{,}0515)=\mathbf{-1{,}6305}$ | devient **A** |
| … | … |
| $x_B>N^{-1}(0{,}9983)=\mathbf{2{,}9290}$ | **fait DÉFAUT** |

> **La logique du sens de cumul :** on ordonne les états **du meilleur au pire** (ou l'inverse) et on découpe l'axe normal en intervalles dont les **largeurs en probabilité** reproduisent la ligne de la matrice de transition. Un $x$ **très grand** correspond au **pire** état ici (le défaut), car la ligne Baa a été cumulée en partant de Aaa.

*(La Technical Note 11 de Hull explique comment obtenir des matrices de transition pour des périodes autres qu'un an.)*

</details>

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| Table de taux de défaut cumulés | **différences** pour la probabilité inconditionnelle ; **division par la survie** pour le taux de hasard |
| « probabilité conditionnelle à l'absence de défaut antérieur » | **taux de hasard** |
| « spread de $s$ points de base », « recouvrement $R$ » | $\bar\lambda=s/(1-R)$ |
| Prix d'obligation d'entreprise **et** sans risque donnés | la **table de perte en $Q$** : valeur sans risque à chaque date, moins recouvrement, actualiser, sommer, égaler à la perte totale |
| « asset swap spread de $x$ pb » | la perte totale est la **VA de $x$ pb sur la durée**, puis $Q=\text{perte}/\text{total}$ |
| « valoriser un dérivé de crédit » | probabilités **risque-neutres** |
| « analyse de scénarios », « Credit VaR » | probabilités **réelles** |
| Valeur et volatilité des **capitaux propres** données | **modèle de Merton** : système (23.3)-(23.4), puis $N(-d_2)$ |
| « rendement de la contrepartie supérieur de $x$ % » | $f_0^\ast=f_0e^{-(y^\ast-y)T}$ |
| Plusieurs transactions de signes opposés | **netting** : $\max(\sum V_i,0)$ et non $\sum\max(V_i,0)$ |
| Corrélation de copule + probabilités cumulées | **copule gaussienne** : seuils $N^{-1}[Q(t)]$ |
| « grand portefeuille de prêts homogènes » | la formule de **Vasicek** (23.13) |
| Matrice de transition | **CreditMetrics** : cumuler la ligne, inverser la normale |

## Comment résoudre ce type d'exercice

**A — Extraire un taux de hasard d'un spread.**

1. Exprimer le spread **en décimal** ($s=0{,}0050$ pour 50 pb).
2. $\bar\lambda=s/(1-R)$.
3. Si on veut la probabilité cumulée : $Q(t)=1-e^{-\bar\lambda t}$.
4. Pour un taux **forward** entre deux maturités : $\bar\lambda_1t_1$ et $\bar\lambda_2t_2$ donnent $\lambda_{[t_1,t_2]}=\dfrac{\bar\lambda_2t_2-\bar\lambda_1t_1}{t_2-t_1}$.

**B — La table de perte en $Q$.**

1. Prix de l'obligation d'entreprise, prix de l'obligation sans risque, **différence = perte espérée totale**.
2. Pour chaque date de défaut $t$ : valeur sans risque $=$ somme des flux **restants ET du flux dû en $t$**, actualisés au taux sans risque **depuis $t$**.
3. Perte en cas de défaut $=$ cette valeur **moins le recouvrement**.
4. Multiplier par $e^{-rt}$ et sommer → coefficient de $Q$.
5. $Q=\text{perte totale}/\text{coefficient}$.

**C — Le modèle de Merton.**

1. Inconnues : $V_0$ et $\sigma_V$. Données : $E_0$, $\sigma_E$, $D$, $r$, $T$.
2. Poser $F=V_0N(d_1)-De^{-rT}N(d_2)-E_0$ et $G=N(d_1)\sigma_VV_0-\sigma_EE_0$.
3. Minimiser $F^2+G^2$ (Solver).
4. Probabilité de défaut $=N(-d_2)$ ; dette $=V_0-E_0$ ; $\text{EL}=1-\dfrac{V_0-E_0}{De^{-rT}}$ ; recouvrement $=1-\text{EL}/\text{PD}$.

**D — Le Credit VaR de Vasicek.**

1. Calculer $N^{-1}[Q(T)]$ et $N^{-1}(X)$.
2. $V(X,T)=N\!\left(\dfrac{N^{-1}[Q(T)]+\sqrt\rho\,N^{-1}(X)}{\sqrt{1-\rho}}\right)$.
3. Credit VaR $=L(1-R)V(X,T)$.
4. Contrôle : avec $\rho\to0$, $V(X,T)\to Q(T)$ ; avec $\rho\to1$, $V(X,T)\to1$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Confondre probabilité **inconditionnelle** et **taux de hasard** | l'inconditionnelle est vue **à la date 0** ; le hasard est **conditionnel à la survie** : diviser par $V(t)$ |
| Utiliser $Q(t)$ comme si c'était $\bar\lambda t$ | $Q(t)=1-e^{-\bar\lambda t}$ ; les deux ne coïncident que pour de petites valeurs |
| Oublier le $(1-R)$ dans $\bar\lambda=s/(1-R)$ | le spread compense la **perte NETTE de recouvrement** |
| Oublier le coupon dû **à l'instant du défaut** dans la table 23.3 | les défauts sont **immédiatement AVANT** les dates de coupon : le flux de la date est **inclus, non actualisé** |
| Actualiser au taux **de l'entreprise** dans la table 23.3 | tous les calculs de la table utilisent le taux **SANS RISQUE** — c'est précisément ce qui fait de $Q$ une probabilité **risque-neutre** |
| Utiliser des probabilités historiques pour valoriser un dérivé de crédit | il faut les **risque-neutres** — souvent **plusieurs fois** plus élevées |
| Utiliser des probabilités risque-neutres pour un Credit VaR | il faut les probabilités **réelles** |
| Croire que le ratio et la différence des deux taux évoluent dans le même sens | **le RATIO décroît, la DIFFÉRENCE croît** quand la notation se dégrade |
| Croire que le modèle de Merton donne directement la bonne probabilité | il donne un **bon CLASSEMENT** ; il faut une **transformation monotone** calibrée |
| Traiter une option **vendue** comme portant du risque de crédit | catégorie 1 : **aucun** risque de crédit pour l'institution |
| Sommer $\max(V_i,0)$ quand il y a netting | avec netting c'est $\max(\sum V_i,0)$ — **toujours plus petit ou égal** |
| Croire que le collatéral protège intégralement | **le seuil n'est pas protégé**, et une entreprise en difficulté **cesse de répondre aux appels** |
| Croire que les *downgrade triggers* sont sans danger | Enron : un usage massif peut **provoquer** la faillite |
| Croire que la copule rend les $t_i$ normaux | **non** — elle rend normaux les $x_i=N^{-1}[Q_i(t_i)]$ ; les $t_i$ gardent leur loi marginale |
| Oublier le signe de $F$ dans (23.12) et (23.13) | $-\sqrt\rho F$ dans la conditionnelle, mais $+\sqrt\rho N^{-1}(X)$ dans Vasicek, car on substitue $F=-N^{-1}(X)$ |
| Ignorer la corrélation dans un Credit VaR | avec $\rho=0{,}1$, un taux moyen de 2 % devient **12,8 %** dans le pire cas à 99,9 % |
| Traiter les changements de notation comme indépendants dans CreditMetrics | ils doivent être liés par une **copule gaussienne** |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Investment grade** | **Baa/BBB** et au-dessus |
| **Probabilité inconditionnelle** | $Q(t_2)-Q(t_1)$ |
| **Taux de hasard** | probabilité **conditionnelle** à la survie |
| **Exemple de référence** | Caa 3ᵉ année : $\frac{0{,}09298}{0{,}70616}=\mathbf{13{,}17\,\%}$ |
| **Survie** | $V(t)=e^{-\int_0^t\lambda(\tau)d\tau}$ |
| **Probabilité cumulée** | $Q(t)=1-e^{-\bar\lambda(t)t}$ |
| **Forme inverse** | $\bar\lambda(t)=-\frac1t\ln[1-Q(t)]$ |
| **Investment grade** | défaut annuel **croissant** dans le temps |
| **Junk** | défaut annuel **décroissant** dans le temps |
| **Meilleur recouvrement** | prêt bancaire *first lien* : **65,6 %** |
| **Pire recouvrement** | obligation junior subordonnée : **24,7 %** |
| **Recouvrement et défaut** | **négativement corrélés** — une mauvaise année est **doublement** mauvaise |
| **Formule approchée** | $\bar\lambda=s/(1-R)$ |
| **Taux sans risque des traders** | **LIBOR/swap moins 10 points de base** |
| **Table 23.3** | total $=288{,}48\,Q$, perte $=8{,}75$ → $Q=\mathbf{3{,}03\,\%}$ |
| **Version asset swap** | perte $=6{,}55$ → $Q=\mathbf{2{,}27\,\%}$ |
| **Depuis les obligations** | probabilités **RISQUE-NEUTRES** |
| **Depuis l'historique** | probabilités **RÉELLES** (« physiques ») |
| **Aaa** | ratio **17,0**, différence 0,56, excédent **34 pb** |
| **Caa** | ratio **1,4**, différence 5,39, excédent **323 pb** |
| **Raison principale de l'écart** | **les obligations ne font pas défaut indépendamment** → risque **systématique** |
| **Taux de défaut extrêmes** | **0,09 % (1979)** · **3,97 % (2001)** · **5,35 % (2009)** |
| **Merton** | $E_T=\max(V_T-D,0)$ : les capitaux propres sont un **call sur les actifs** |
| **Équation 1** | $E_0=V_0N(d_1)-De^{-rT}N(d_2)$ |
| **Équation 2** | $\sigma_EE_0=N(d_1)\sigma_VV_0$ |
| **Probabilité de défaut** | $N(-d_2)$ |
| **Exemple 23.1** | $V_0=12{,}40$, $\sigma_V=0{,}2123$, $\text{PD}=\mathbf{12{,}7\,\%}$, recouvrement $\mathbf{91\,\%}$ |
| **Verdict sur Merton** | bon **CLASSEMENT** ; calibrer par transformation monotone (EDF de KMV) |
| **Catégorie 1** | toujours passif → **aucun** risque de crédit |
| **Catégorie 2** | toujours actif → risque **systématique** |
| **Catégorie 3** | les deux → $v_i$ est un **call d'exercice zéro** |
| **CVA** | $\sum u_iv_i$ avec $u_i=q_i(1-R)$ |
| **Formule d'actualisation risquée** | $f_0^\ast=f_0e^{-(y^\ast-y)T}$ |
| **Exemple 23.2** | $3e^{-0{,}03}=\mathbf{2{,}91}$ dollars |
| **Wrong-way risk** | défaut le plus probable quand l'exposition est **grande** |
| **Netting** | $\max(\sum V_i,0)$ au lieu de $\sum\max(V_i,0)$ |
| **Exemple du netting** | 40 M sans, **15 M** avec |
| **Effet incrémental** | peut être **négatif** grâce au netting |
| **Collatéral** | seuil $=$ **ligne de crédit** ; décote $=$ ***haircut*** |
| **Downgrade trigger** | option de **dénouer** à la valeur de marché ; cas **Enron** |
| **Reduced form** | taux de hasard stochastiques ; corrélations **limitées** |
| **Structural** | actifs corrélés ; **lent** |
| **Copule gaussienne** | $x_i=N^{-1}[Q_i(t_i)]$, $x_i$ **normaux multivariés** |
| **Un facteur** | $x_i=a_iF+\sqrt{1-a_i^2}Z_i$, corrélation $a_ia_j$ |
| **Conditionnelle** | $Q(T\mid F)=N\!\left(\frac{N^{-1}[Q(T)]-\sqrt\rho F}{\sqrt{1-\rho}}\right)$ |
| **Vasicek** | $V(X,T)=N\!\left(\frac{N^{-1}[Q(T)]+\sqrt\rho N^{-1}(X)}{\sqrt{1-\rho}}\right)$ |
| **Credit VaR** | $L(1-R)V(X,T)$ |
| **Exemple 23.4** | $V=\mathbf{0{,}128}$ → **5,13 millions** |
| **CreditMetrics** | Monte-Carlo des **changements de notation** ; inclut les **dégradations** |
| **Seuils CreditMetrics** | cumuler la ligne de la matrice, appliquer $N^{-1}$ |

## 🧠 Active Recall

1. Quelle est la note la plus élevée de Moody's, et son équivalent S&P ?
2. Où passe la frontière *investment grade* ?
3. Quelles catégories ne sont pas subdivisées en crans ?
4. Calculer la probabilité qu'une Baa fasse défaut pendant sa deuxième année.
5. Pourquoi la probabilité de défaut annuelle croît-elle pour les *investment grade* ?
6. Pourquoi décroît-elle pour les mal notées ?
7. Distinguer probabilité inconditionnelle et taux de hasard sur l'exemple Caa 3ᵉ année.
8. Dériver $V(t)=e^{-\int\lambda}$ à partir de la définition de $\lambda(t)$.
9. Écrire $Q(t)$ et sa forme inverse.
10. Comment définit-on le taux de recouvrement d'une obligation ?
11. Quelle classe a le meilleur recouvrement ? la pire ?
12. Quel est le signe de la corrélation entre taux de recouvrement et taux de défaut ? Pourquoi est-ce grave ?
13. Quelle hypothèse fondatrice permet d'extraire les défauts des prix d'obligations ? Quelle est sa limite ?
14. Dériver $\bar\lambda=s/(1-R)$ par le raisonnement en mots.
15. Dans la table 23.3, à quelles dates les défauts sont-ils supposés survenir, et pourquoi ce choix ?
16. Recalculer la valeur sans risque à 3,5 ans dans la table 23.3.
17. Pourquoi actualise-t-on au taux sans risque et pas au taux de l'entreprise ?
18. Quelle valeur de $Q$ obtient-on, et à partir de quelle perte totale ?
19. Quelles hypothèses simplificatrices le calcul fait-il ?
20. Comment utiliserait-on quatre obligations de maturités 3, 5, 7 et 10 ans ?
21. Quel taux sans risque les traders utilisent-ils, et quel écart avec LIBOR/swap les CDS impliquent-ils ?
22. Pourquoi 10 points de base est-il un chiffre plausible ?
23. Décrire les trois configurations d'un asset swap.
24. Que représente la valeur actuelle de l'asset swap spread ?
25. Refaire le calcul de $Q$ avec un spread de 150 pb.
26. Calculer le taux de hasard historique à 7 ans d'une entreprise notée A.
27. Calculer son taux de hasard implicite dans les obligations.
28. Comment évoluent le ratio et la différence quand la notation se dégrade ?
29. Décomposer les 111 points de base de spread d'une obligation A.
30. D'où viennent les 42 points de base ?
31. Pourquoi les probabilités extraites des prix sont-elles risque-neutres ?
32. Citer les quatre explications de l'écart, et dire laquelle domine.
33. Quels ont été les taux de défaut minimal et maximaux entre 1970 et 2009 ?
34. Qu'est-ce que la contagion de crédit ?
35. Pourquoi le risque idiosyncratique obligataire est-il difficile à diversifier ?
36. Quelle probabilité utiliser pour valoriser ? pour un Credit VaR ?
37. Pourquoi utiliser les prix des actions plutôt que les notations ?
38. Écrire le payoff des capitaux propres selon Merton et l'interpréter.
39. Écrire les deux équations du système de Merton.
40. D'où vient la seconde équation ?
41. Refaire l'exemple 23.1 en entier, jusqu'au taux de recouvrement.
42. Comment résout-on numériquement le système ?
43. Citer deux extensions du modèle de Merton.
44. Quel est le verdict empirique sur Merton ? Quelle hypothèse sous-tend la calibration ?
45. Décrire les trois catégories de dérivés et leur risque de crédit.
46. Écrire la formule du CVA et dire ce que valent $u_i$ et $v_i$.
47. Quelles hypothèses le CVA fait-il ?
48. Dériver $f_0^\ast=f_0e^{-(y^\ast-y)T}$ à partir de (23.5).
49. Refaire l'exemple 23.2.
50. Qu'est-ce que $v_i$ pour un dérivé de catégorie 3 ?
51. Distinguer *right-way* et *wrong-way risk*.
52. Énoncer la clause de netting.
53. Refaire l'exemple 40 M / 15 M, y compris la variante à −45 M.
54. Écrire les deux formules de perte, avec et sans netting, et l'argument optionnel.
55. Pourquoi l'effet incrémental d'une nouvelle transaction peut-il être négatif ?
56. Décrire le mécanisme de collatéralisation sur les trois jours de l'exemple.
57. Qu'est-ce qu'un *haircut* ? Que représente le seuil ?
58. Citer les deux limites de la protection par collatéral.
59. Qu'est-ce qu'un *downgrade trigger*, et quelles sont ses deux limites ?
60. Raconter le mécanisme des downgrade triggers dans le cas Enron.
61. Quelles étaient les notations d'Enron juste avant le défaut ?
62. Citer les causes de la corrélation de défaut.
63. Comparer modèles à forme réduite et modèles structurels.
64. Quel est le défaut principal des modèles à forme réduite, et son remède ?
65. Qu'est-ce que la transformation percentile à percentile ?
66. Qu'est-ce qu'on suppose exactement en « utilisant une copule gaussienne » ?
67. Quel avantage la copule offre-t-elle sur la modélisation directe ?
68. Refaire l'exemple 23.3 : quels seuils pour 1 %, 3 %, 6 %, 10 %, 15 % ?
69. Écrire le modèle à un facteur et la corrélation qu'il implique.
70. Dériver $Q(T\mid F)$ étape par étape.
71. Écrire le cas homogène (23.12).
72. Dériver la formule de Vasicek à partir de (23.12).
73. Refaire l'exemple 23.4 en entier.
74. Quel taux de défaut du pire cas obtient-on, contre quelle moyenne ?
75. Que devient $V(X,T)$ si $\rho\to0$ ? si $\rho\to1$ ?
76. Décrire le principe de CreditMetrics et son avantage clé.
77. Lire la ligne A de la matrice de transition.
78. Calculer les seuils de la Aaa dans la simulation.
79. Calculer les seuils de la Baa, et le seuil de défaut.
80. Pourquoi les changements de notation ne doivent-ils pas être tirés indépendamment ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Meilleure note Moody's ? | **Aaa** (S&P : **AAA**) |
| Frontière investment grade ? | **Baa** / **BBB** |
| Catégories non subdivisées ? | **Aaa/AAA** et les deux plus basses |
| Probabilité inconditionnelle ? | La **différence** de deux probabilités cumulées |
| Baa, 2ᵉ année ? | $0{,}494-0{,}176=\mathbf{0{,}318\,\%}$ |
| Autre nom du taux de hasard ? | **Intensité de défaut** |
| Caa, 3ᵉ année, conditionnel ? | $0{,}09298/0{,}70616=\mathbf{13{,}17\,\%}$ |
| Formule de survie ? | $V(t)=e^{-\int_0^t\lambda(\tau)d\tau}$ |
| Formule de $Q(t)$ ? | $1-e^{-\bar\lambda(t)t}$ |
| Forme inverse ? | $\bar\lambda(t)=-\frac1t\ln[1-Q(t)]$ |
| Investment grade dans le temps ? | Probabilité de défaut annuelle **croissante** |
| Junk dans le temps ? | **Décroissante** |
| Définition du recouvrement ? | Valeur de marché **quelques jours après le défaut**, en % du **nominal** |
| Meilleure classe ? | Prêt bancaire *first lien*, **65,6 %** |
| Pire classe ? | Obligation **junior subordonnée**, **24,7 %** |
| Corrélation recouvrement / défaut ? | **Négative** — année **doublement** mauvaise |
| Recouvrement si défaut à 0,1 % ? à 3 % ? | ≈ **60 %** · ≈ **35 %** |
| Hypothèse fondatrice ? | La **seule** cause de l'écart de prix est **la possibilité de défaut** |
| Sa limite ? | La **liquidité** affecte aussi le prix |
| Formule approchée ? | $\bar\lambda=s/(1-R)$ |
| Spread 200 pb, $R=40\,\%$ ? | $0{,}02/0{,}6=\mathbf{3{,}33\,\%}$ |
| Quand les défauts surviennent-ils dans la table 23.3 ? | **Immédiatement AVANT** les dates de coupon |
| Valeur sans risque à 3,5 ans ? | $3+3e^{-0{,}025}+3e^{-0{,}05}+103e^{-0{,}075}=\mathbf{104{,}34}$ |
| Prix des deux obligations ? | **95,34** et **104,09** |
| Perte espérée totale ? | **8,75 dollars** |
| Coefficient total ? | $\mathbf{288{,}48\,Q}$ |
| Valeur de $Q$ ? | **3,03 %** |
| Avec un asset swap à 150 pb ? | Perte $=6{,}55$ → $Q=\mathbf{2{,}27\,\%}$ |
| Taux sans risque des traders ? | **LIBOR/swap − 10 pb** |
| Pourquoi 10 pb ? | Prime de défaut raisonnable pour du **court terme AA** |
| Que représente l'asset swap spread ? | L'écart entre prix **sans risque** et prix **d'entreprise** |
| Sont-ils échangés en cas de défaut ? | **Oui** — ce sont les coupons **PROMIS** |
| Hazard historique 7 ans pour A ? | $-\frac17\ln(1-0{,}01179)=\mathbf{0{,}17\,\%}$ |
| Hazard obligataire pour A ? | $(0{,}05995-0{,}05308)/0{,}6=\mathbf{1{,}15\,\%}$ |
| Ratio pour Aaa ? | **17,0** |
| Ratio pour Caa ? | **1,4** |
| Le ratio quand la note baisse ? | Il **DÉCROÎT** |
| La différence quand la note baisse ? | Elle **CROÎT** |
| Excédent de rendement Aaa ? | **34 pb** |
| Excédent Caa ? | **323 pb** |
| Décomposition du A ? | $111=42+10+59$ |
| D'où viennent les 10 pb ? | Hazard historique **× 0,6** |
| Probabilités depuis les prix ? | **RISQUE-NEUTRES** |
| Probabilités depuis l'historique ? | **RÉELLES** (physiques) |
| Raison dominante de l'écart ? | **Les défauts ne sont pas indépendants** → risque **systématique** |
| Taux de défaut le plus bas (1970-2009) ? | **0,09 % en 1979** |
| Les plus hauts ? | **3,97 % (2001)** et **5,35 % (2009)** |
| Contagion de crédit ? | Le défaut d'une entreprise **en provoque** d'autres |
| Pourquoi le risque obligataire est-il dur à diversifier ? | Rendements **très asymétriques** : 99,75 % de $+7\,\%$, 0,25 % de $-60\,\%$ |
| Pour valoriser ? | **Risque-neutres** |
| Pour un Credit VaR ? | **Réelles** |
| Problème des notations ? | **Révisées peu souvent** |
| Idée de Merton (1974) ? | Les **capitaux propres** sont un **CALL sur les actifs** |
| Payoff ? | $E_T=\max(V_T-D,0)$ |
| Prix d'exercice ? | Le **remboursement de dette** $D$ |
| Équation 1 ? | $E_0=V_0N(d_1)-De^{-rT}N(d_2)$ |
| Équation 2 ? | $\sigma_EE_0=N(d_1)\sigma_VV_0$ |
| Sa source ? | Le **lemme d'Itô** |
| Valeur de la dette ? | $V_0-E_0$ |
| Probabilité de défaut ? | $N(-d_2)$ |
| Ex. 23.1 : $V_0$ et $\sigma_V$ ? | **12,40** et **0,2123** |
| Ex. 23.1 : $\text{PD}$ ? | **12,7 %** |
| Ex. 23.1 : recouvrement ? | **91 %** |
| Relation EL / PD / recouvrement ? | $\text{recouvrement}=1-\text{EL}/\text{PD}$ |
| Résolution numérique ? | Minimiser $F^2+G^2$ avec Solver |
| Verdict sur Merton ? | Bon **classement** ; **transformation monotone** à calibrer |
| Nom du produit KMV ? | L'**EDF** (*expected default frequency*) |
| Catégorie 1 ? | Toujours **passif** — option **vendue** — **aucun** risque |
| Catégorie 2 ? | Toujours **actif** — option **achetée** — **toujours** du risque |
| Catégorie 3 ? | Les **deux** — un **forward** |
| Rang d'une créance sur dérivé ? | **Non garantie et junior** |
| Formule du CVA ? | $\sum u_iv_i$ |
| Que vaut $u_i$ ? | $q_i(1-R)$ |
| Que vaut $v_i$ ? | La VA d'un instrument versant **l'exposition** en $t_i$ |
| Exposition ? | $\max(f_i,0)$ |
| $v_i$ en catégorie 3 ? | Un **call d'exercice ZÉRO** sur $f_i$ |
| Formule d'actualisation risquée ? | $f_0^\ast=f_0e^{-(y^\ast-y)T}$ |
| Ex. 23.2 ? | $3e^{-0{,}015\times2}=\mathbf{2{,}91}$ |
| Wrong-way risk ? | Défaut probable **quand l'exposition est grande** |
| Right-way risk ? | Défaut probable quand l'exposition est **nulle** |
| Clause de netting ? | Défaut sur une transaction → défaut sur **toutes** |
| Exemple : sans netting ? | **40 millions** |
| Avec netting ? | **15 millions** |
| Perte sans netting ? | $(1-R)\sum\max(V_i,0)$ |
| Avec netting ? | $(1-R)\max(\sum V_i,0)$ |
| L'argument optionnel ? | Une **option sur portefeuille** ≤ un **portefeuille d'options** |
| Effet incrémental négatif ? | Quand la nouvelle transaction est **négativement corrélée** aux existantes |
| Que représente le seuil de collatéral ? | Une **ligne de crédit** |
| Décote sur titres déposés ? | Un ***haircut*** |
| Les deux limites du collatéral ? | Le **seuil** n'est pas protégé · l'entreprise **cesse de répondre** |
| Downgrade trigger ? | Option de **dénouer à la valeur de marché** si la note tombe |
| Ses deux limites ? | Pas de protection contre un **saut** · inefficace s'il est **massivement utilisé** |
| Notes d'Enron avant défaut ? | **Baa3** (Moody's) et **BBB−** (S&P) |
| Date de la faillite ? | **Décembre 2001** |
| Le mécanisme fatal ? | Dénouements → **paiements en espèces massifs** impossibles |
| Modèles à forme réduite ? | Taux de hasard **stochastiques corrélés** au macro |
| Leur défaut ? | Gamme de corrélations **limitée** |
| Leur remède ? | Des **sauts** dans le taux de hasard |
| Modèles structurels ? | **Actifs corrélés**, à la Merton |
| Leur défaut ? | **Lenteur** de calcul |
| Transformation de copule ? | $x_i=N^{-1}[Q_i(t_i)]$ |
| Son nom ? | **Percentile à percentile** |
| Ce qu'on suppose ? | Les $x_i$ sont **normaux multivariés** |
| Ce que la copule permet ? | Estimer la **corrélation séparément** des lois marginales |
| Corrélation de copule ≈ ? | La corrélation des **rendements des actions** |
| Seuil de 1 % ? | $N^{-1}(0{,}01)=\mathbf{-2{,}33}$ |
| Seuil de 15 % ? | $N^{-1}(0{,}15)=\mathbf{-1{,}04}$ |
| Modèle à un facteur ? | $x_i=a_iF+\sqrt{1-a_i^2}Z_i$ |
| Corrélation induite ? | $a_ia_j$ |
| $Q(T\mid F)$ ? | $N\!\left(\frac{N^{-1}[Q(T)]-a_iF}{\sqrt{1-a_i^2}}\right)$ |
| Cas homogène ? | $a_i=\sqrt\rho$ pour tout $i$ |
| Définition du Credit VaR ? | La perte de crédit non dépassée avec confiance $X$ sur $T$ |
| Formule de Vasicek ? | $V(X,T)=N\!\left(\frac{N^{-1}[Q(T)]+\sqrt\rho N^{-1}(X)}{\sqrt{1-\rho}}\right)$ |
| Auteur et année ? | **Vasicek**, KMV **1987** (publié *Risk*, déc. 2002) |
| Credit VaR en montant ? | $L(1-R)V(X,T)$ |
| Ex. 23.4 : $V(0{,}999;1)$ ? | **0,128** |
| Ex. 23.4 : Credit VaR ? | **5,13 millions de dollars** |
| Taux moyen contre pire cas ? | **2 %** contre **12,8 %** |
| Si $\rho\to0$ ? | $V(X,T)\to Q(T)$ |
| Principe de CreditMetrics ? | Monte-Carlo des **changements de notation** |
| Son avantage clé ? | Inclut les pertes dues aux **DÉGRADATIONS**, pas seulement aux défauts |
| Son inconvénient ? | **Intensif en calcul** |
| A reste A à 1 an ? | **90,91 %** |
| A fait défaut à 1 an ? | **0,05 %** |
| Seuil « reste Aaa » ? | $N^{-1}(0{,}9057)=\mathbf{1{,}3147}$ |
| Seuil de défaut de la Baa ? | $N^{-1}(0{,}9983)=\mathbf{2{,}9290}$ |
| Lien entre notations tirées ? | Une **copule gaussienne** |
