# Fiche 104 — Les swaps revisités : structures non standard et options intégrées

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Produits de taux |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 32 « Swaps Revisited » |
| **Difficulté** | High — le catalogue complet des swaps de gré à gré |
| **Temps d'étude estimé** | 1 h 20 |
| **Prérequis** | Fiches 80 (swaps), 100 (caps et swaptions), 101 (ajustements), 102-103 (modèles de taux) |
| **Concepts clés** | Règle « supposer les taux forward réalisés », *step-up* et *amortizing swap*, *basis swap*, swap à capitalisation, swap de devises *floating-for-floating*, swap LIBOR-in-arrears, swap CMS et CMT, *diff swap*, swap d'actions, *accrual swap*, swap annulable, *index amortizing rate swap*, swap de matières premières |
| **Poids à l'examen** | **Les trois familles** : règle simple / ajustements / options intégrées · $F_i+\dfrac{F_i^2\sigma_i^2\delta_it_i}{1+F_i\delta_i}$ pour l'in-arrears · l'ajustement **double** du CMS · $V_i+V_i\rho_i\sigma_{W,i}\sigma_{V,i}t_i$ pour le *diff swap*. |

## 🎯 Vue d'ensemble

```
LA RÈGLE STANDARD (chapitre 7)   « SUPPOSER QUE LES TAUX FORWARD SERONT RÉALISÉS »
  1. calculer les flux nets en supposant les LIBOR futurs = taux forward d'aujourd'hui
  2. actualiser à la courbe zéro LIBOR/swap

TROIS FAMILLES DE SWAPS NON STANDARD

  A — LA RÈGLE SIMPLE SUFFIT
      step-up · amortizing · principaux et fréquences différents · basis swap
      swap à CAPITALISATION · swaps de devises floating-for-floating et cross-currency

  B — IL FAUT UN AJUSTEMENT (chapitre 29)
      LIBOR-IN-ARREARS   convexité     Fᵢ + Fᵢ²σᵢ²δᵢtᵢ/(1+Fᵢδᵢ)
      CMS / CMT          convexité ET timing — DEUX termes
      DIFF SWAP          quanto        Vᵢ + Vᵢ ρᵢ σ_W σ_V tᵢ

  C — IL Y A UNE OPTION INTÉGRÉE (chapitres 28, 30, 31)
      ACCRUAL SWAP  = swap ordinaire + un PORTEFEUILLE D'OPTIONS BINAIRES (une par JOUR)
      CANCELABLE    = swap ordinaire + une SWAPTION (européenne si une seule date,
                      BERMUDIENNE sinon)

SWAP D'ACTIONS   vaut ZÉRO à l'initiation ET juste après chaque date de paiement
                 entre deux dates : la jambe actions vaut L·E/E₀
```

**La règle standard, rappelée d'entrée.** *Le chapitre 7 a montré comment valoriser un swap de taux vanille. L'approche standard se résume à : **« SUPPOSER QUE LES TAUX FORWARD SERONT RÉALISÉS »**.*

| Étape | Contenu |
|---|---|
| **1** | Calculer les **flux nets** du swap **en supposant que les LIBOR futurs égalent les taux forward** calculés de la courbe zéro LIBOR/swap d'aujourd'hui |
| **2** | Poser la valeur du swap égale à la **valeur actuelle** de ces flux nets, **en actualisant avec la courbe zéro LIBOR/swap** |

> *« **Les swaps ont été centraux au succès des marchés de gré à gré.** Ils se sont révélés des instruments **très flexibles** pour gérer le risque. Au vu de la gamme des contrats négociés et du volume total traité chaque année, **les swaps sont sans doute l'une des innovations les plus réussies de l'histoire des marchés financiers.** »*

## 🟡 Concept 1 — Les variations mineures : la règle simple suffit

### 1.1 Les variations de principal et de fréquence

| Variation | Description | Usage type |
|---|---|---|
| ***Step-up swap*** | le principal notionnel est une fonction **CROISSANTE** du temps | *une **entreprise de construction** qui compte emprunter des montants **croissants** à taux variable pour financer un projet et veut passer au fixe* |
| ***Amortizing swap*** | le principal est une fonction **DÉCROISSANTE** du temps | *une entreprise ayant des **emprunts à taux fixe avec un échéancier de remboursement** et voulant passer au variable* |
| **Principaux différents** | le principal peut **différer sur les deux jambes** | *(Business Snapshot 32.1 : **120 millions** côté variable, **100 millions** côté fixe)* |
| **Fréquences différentes** | les paiements peuvent avoir des **fréquences différentes** | *(même exemple : **mensuels** côté variable, **semestriels** côté fixe)* |

> ⚠️ ***« Ces types de variations à la structure vanille de base N'AFFECTENT PAS LA MÉTHODOLOGIE DE VALORISATION. L'approche « supposer les taux forward réalisés » peut toujours être utilisée. »***

### 1.2 Le *basis swap*

*Le taux de référence variable **n'est pas toujours le LIBOR** : dans certains swaps c'est le taux du **papier commercial (CP)**.*

> ***Un BASIS SWAP échange des flux calculés avec UN taux de référence variable contre des flux calculés avec UN AUTRE taux de référence variable.***

**L'exemple.** *Le **taux CP à 3 mois plus 10 points de base** contre **le LIBOR à 3 mois**, les deux appliqués à un principal de **100 millions**.*

*L'usage : **la gestion de risque d'une institution financière dont les actifs et les passifs dépendent de taux de référence variables DIFFÉRENTS**.*

> ⚠️ **La méthode de valorisation, à savoir énoncer précisément.** *« Les swaps dont le taux de référence n'est pas le LIBOR se valorisent par l'approche « supposer les taux forward réalisés ». **UNE COURBE ZÉRO AUTRE QUE LIBOR est nécessaire pour calculer les flux futurs** sur l'hypothèse que les taux forward sont réalisés. **LES FLUX SONT ACTUALISÉS AU LIBOR.** »*

### 1.3 Les swaps à capitalisation

*Dans un **swap à capitalisation** (*compounding swap*), **il n'y a qu'UNE SEULE date de paiement** pour les deux jambes : **à la fin de la vie du swap**. **Au lieu d'être payés, les intérêts sont CAPITALISÉS jusqu'à cette date.***

**L'exemple de Business Snapshot 32.2 :** taux variable **LIBOR + 20 pb**, **capitalisé à LIBOR + 10 pb** ; taux fixe **6 %**, **capitalisé à 6,3 %**.

> *« L'approche « supposer les taux forward réalisés » peut être utilisée, **au moins approximativement**. Le côté fixe est **direct** car le paiement à maturité est **connu avec certitude**. **L'approche se justifie côté variable parce qu'il existe une série de FRA où les flux variables sont échangés contre les valeurs qu'ils auraient si chaque taux égalait le taux forward correspondant.** »*
>
> ⚠️ *La note technique : l'approche est **EXACTE** si le spread de capitalisation $s_c$ est **nul**, ou s'il est appliqué de sorte que $Q$ capitalise en $Q(1+R\delta)(1+s_c\delta)$. **Si, comme c'est plus usuel, il capitalise en $Q[1+(R+s_c)\delta]$, il y a une PETITE approximation.***

<details class="details--riche">
<summary>

**Exemple 32.1 — un swap à capitalisation à 3 ans, entièrement recalculé**

</summary>

**Données.** Réinitialisations **annuelles**, vie **3 ans**. On **paie le fixe** et **reçoit le variable**. Taux fixe **4 %**, taux variable **LIBOR 12 mois**. Le fixe capitalise à **3,9 %**, le variable à **LIBOR 12 mois moins 20 pb**. Courbe LIBOR **plate à 5 %** en composition annuelle. Principal **100 millions**.

*Étape 1 — la jambe FIXE, capitalisée à 3,9 % :*

| Fin d'année | Calcul | Montant cumulé (M) |
|---|---|---|
| 1 | intérêt de $4\,\%\times100$ | **4,000** |
| 2 | $4\times1{,}039=4{,}156$, plus le nouvel intérêt de 4 | **8,156** |
| 3 | $8{,}156\times1{,}039=8{,}474$, plus le nouvel intérêt de 4 | $\boxed{\mathbf{12{,}474}}$ |

*Étape 2 — la jambe VARIABLE.* **On suppose que tous les taux futurs égalent les taux forward LIBOR** ; avec une courbe plate, **tous valent 5 %**. La capitalisation se fait à $5\,\%-20$ pb $=\mathbf{4{,}8\,\%}$ :

| Fin d'année | Calcul | Montant cumulé (M) |
|---|---|---|
| 1 | $5\,\%\times100$ | **5,000** |
| 2 | $5\times1{,}048=5{,}24$, plus 5 | **10,240** |
| 3 | $10{,}24\times1{,}048=10{,}731$, plus 5 | $\boxed{\mathbf{15{,}731}}$ |

*Étape 3 — valoriser.* Le swap équivaut à **une entrée de 15,731 M et une sortie de 12,474 M à la fin de l'année 3** :

$$\frac{15{,}731-12{,}474}{1{,}05^3}=\frac{3{,}257}{1{,}157625}=\boxed{\mathbf{2{,}814\ \text{millions de dollars}}}$$

*(Cette analyse **ignore les conventions de décompte des jours** et fait l'approximation de la note ci-dessus.)*

</details>

### 1.4 Les swaps de devises

| Type | Description |
|---|---|
| **Fixe contre fixe** | un taux fixe **par devise**, appliqué au principal de **sa** devise (fiche 80, §7.9) |
| ***Floating-for-floating*** | **LIBOR USD** (éventuellement avec spread) contre **LIBOR GBP** (éventuellement avec spread) |
| **Swap de taux *cross-currency*** | un taux **variable** dans une devise contre un taux **fixe** dans une autre |

**La méthode.** *« Les floating-for-floating et cross-currency se valorisent par la règle « supposer les taux forward réalisés ». Les LIBOR futurs dans chaque devise sont supposés égaux aux forwards d'aujourd'hui. **Les flux USD sont actualisés au taux zéro LIBOR USD ; les flux GBP au taux zéro LIBOR GBP. Le change COURANT sert ensuite à traduire les deux valeurs actuelles dans une devise commune.** »*

<details class="details--riche">
<summary>

**L'ajustement de marché des taux d'actualisation**

</summary>

> ⚠️ *« **En théorie, un nouveau floating-for-floating devrait échanger le LIBOR d'une devise contre le LIBOR d'une autre, SANS SPREAD. En pratique, des effets MACROÉCONOMIQUES engendrent des spreads.** Les institutions financières **ajustent souvent les taux d'actualisation** qu'elles emploient pour en tenir compte. »*

**L'exemple.** *Si les conditions de marché sont telles que **le LIBOR USD s'échange contre le LIBOR yen MOINS 20 points de base** dans les nouveaux floating-for-floating **de toutes maturités**, une institution américaine :*

- *actualiserait les flux **USD au LIBOR USD** ;*
- *actualiserait les flux **JPY au LIBOR JPY MOINS 20 pb** ;*
- * *et le ferait **dans TOUS les swaps impliquant des flux dans les deux devises**.*

⚠️ *« **Cet ajustement est AD HOC, mais s'il n'est pas fait, les traders réalisent un profit ou une perte IMMÉDIATS chaque fois qu'ils traitent un nouveau floating-for-floating JPY/USD.** »*

</details>

## 🔴 Concept 2 — Les swaps exigeant un ajustement

> ***« Dans chaque cas, il faut supposer qu'un TAUX FORWARD AJUSTÉ, plutôt que le taux forward réel, sera réalisé. »***

### 2.1 Le swap LIBOR-in-arrears

**Le contraste.** *Un swap vanille est conçu de sorte que **le taux variable OBSERVÉ à une date de paiement soit PAYÉ à la date SUIVANTE**. **Dans un LIBOR-in-arrears, le taux variable payé à une date de paiement ÉGALE LE TAUX OBSERVÉ À CETTE DATE MÊME.***

$$\boxed{\text{Taux à supposer}=F_i+\frac{F_i^2\,\sigma_i^2\,\delta_i\,t_i}{1+F_i\delta_i}}\;\text{(32.1)}$$

où $F_i$ est le **forward de $R_i$**, $\sigma_i$ **sa volatilité** *(typiquement impliquée des prix de caplets)*, et $\delta_i=t_{i+1}-t_i$.

> ⚠️ **C'est exactement l'ajustement de CONVEXITÉ de (29.2)** *(fiche 101, application 1)* — *parce que le taux est **payé EN AVANCE** par rapport à sa convention normale.*

<details class="details--riche">
<summary>

**Exemple 32.2 — le coût de l'in-arrears, chiffré**

</summary>

**Données.** Principal **100 millions**. On **reçoit 5 % fixe** annuellement et **paie le LIBOR**. Échanges aux fins des années 1 à 5. Courbe **plate à 5 %** (composition annuelle). **Toutes les volatilités de caplets valent 22 %**.

*Étape 1 — le point de référence.* Le taux forward de chaque paiement variable est **5 %**. ***Si c'était un swap ORDINAIRE, sa valeur serait EXACTEMENT ZÉRO*** (en ignorant les conventions de jours).

*Étape 2 — l'ajustement.* Avec $F_i=0{,}05$, $\sigma_i=0{,}22$, $\delta_i=1$ :

$$0{,}05+\frac{0{,}05^2\times0{,}22^2\times1\times1}{1+0{,}05\times1}\,t_i=0{,}05+0{,}000115\,t_i$$

*Étape 3 — les cinq taux à supposer :*

| Année | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Taux (%)** | 5,0115 | 5,0230 | 5,0345 | 5,0460 | 5,0575 |

*Étape 4 — les flux nets.* *L'échange net à la première date équivaut à une **SORTIE de 0,0115 % de 100 millions**, soit **11 500 dollars** ; les autres se calculent de même.*

*Étape 5 — la valeur :*

$$-\frac{11\,500}{1{,}05}-\frac{23\,000}{1{,}05^2}-\frac{34\,500}{1{,}05^3}-\frac{46\,000}{1{,}05^4}-\frac{57\,500}{1{,}05^5}=\boxed{\mathbf{-144\,514\ \text{dollars}}}$$

⚠️ **Précision de calcul.** L'ajustement exact vaut $0{,}00011524$, ce qui donne des flux de $11\,524$, $23\,048$, … et une valeur de **$-144\,813$**. Le **$-144\,514$** du manuel provient des flux **ARRONDIS** à 11 500 / 23 000 / 34 500 / 46 000 / 57 500. **L'écart est sans conséquence** ; c'est simplement l'effet des arrondis intermédiaires.

> ⚠️ **La leçon :** *un swap qui vaudrait **exactement zéro** en version ordinaire vaut **$-144\,500$ dollars** en version in-arrears. **L'ajustement de convexité n'est PAS un détail.***

</details>

### 2.2 Les swaps CMS et CMT

> ***Un CONSTANT MATURITY SWAP (CMS) est un swap de taux où LE TAUX VARIABLE ÉGALE LE TAUX DE SWAP d'un swap d'une certaine durée de vie.***

*Exemple : les paiements variables tous les 6 mois **au taux de swap à 5 ans**. **Il y a habituellement un DÉCALAGE : le paiement à une date donnée égale le taux de swap observé à la date PRÉCÉDENTE.***

$$\text{Paiement variable en }t_{i+1}=\delta_i\,L\,S_i\qquad\delta_i=t_{i+1}-t_i$$

$$\boxed{\text{Taux à supposer}=y_i\underbrace{-\tfrac12y_i^2\sigma_{y,i}^2t_i\frac{G_i''(y_i)}{G_i'(y_i)}}_{\text{CONVEXITÉ}}\underbrace{-\frac{y_i\delta_i F_i\rho_i\sigma_{y,i}\sigma_{F,i}}{1+F_i\delta_i}t_i}_{\text{TIMING}}}\;\text{(32.2)}$$

| Symbole | Signification | Source |
|---|---|---|
| $y_i$ | le **forward du taux de swap** $S_i$ | courbe |
| $\sigma_{y,i}$ | volatilité du taux de swap forward | **implicite des SWAPTIONS** |
| $F_i$ | le taux forward entre $t_i$ et $t_{i+1}$ | courbe |
| $\sigma_{F,i}$ | sa volatilité | **implicite des CAPLETS** |
| $\rho_i$ | la corrélation entre les deux | **estimée sur DONNÉES HISTORIQUES** |
| $G_i(x)$ | le prix en $t_i$ d'une obligation **de coupon $y_i$, de même vie et fréquence que le swap** | construite |

> ⚠️ **Les deux termes, à savoir justifier :**
>
> - le **premier** est l'ajustement de convexité de l'exemple 29.2 (fiche 101) — *il repose sur l'hypothèse que **le taux de swap $S_i$ ne conduit qu'à UN SEUL paiement en $t_i$, plutôt qu'à une ANNUITÉ de paiements*** ;
> - le **second** est l'ajustement de timing du §29.2 — *pour le fait que **le paiement calculé à partir de $S_i$ est fait en $t_{i+1}$, pas en $t_i$***.

<details class="details--riche">
<summary>

**Exemple 32.3 — un CMS swap à 6 ans, entièrement recalculé**

</summary>

**Données.** Swap CMS à **6 ans** : on **reçoit le taux de swap à 5 ans** et **paie 5 % fixe** sur **100 millions**. Échanges **semestriels** (sur le swap à 5 ans sous-jacent **et** sur le CMS lui-même). L'échange à une date est déterminé par le taux de swap de la date **précédente**. Structure **plate à 5 %** en composition semestrielle. **Swaptions 5 ans à 15 %** de volatilité implicite ; **caplets de tenor 6 mois à 20 %** ; corrélation **0,7**.

*Étape 1 — les paramètres.* $y_i=0{,}05$, $\sigma_{y,i}=0{,}15$, $\delta_i=0{,}5$, $F_i=0{,}05$, $\sigma_{F,i}=0{,}20$, $\rho_i=0{,}7$.

*Étape 2 — la fonction $G$*, pour une obligation à **5 ans, coupon 5 % semestriel** :

$$G_i(x)=\sum_{i=1}^{10}\frac{2{,}5}{(1+x/2)^i}+\frac{100}{(1+x/2)^{10}}$$

*Étape 3 — les dérivées en $y_i=0{,}05$ :*

$$G_i'(y_i)=\mathbf{-437{,}603}\qquad G_i''(y_i)=\mathbf{2\,261{,}23}$$

*(contrôle : $G_i(0{,}05)=100$ — l'obligation cote **au pair**)*

*Étape 4 — les deux termes de l'ajustement :*

$$\text{convexité}=\tfrac12\times0{,}05^2\times0{,}15^2\times\frac{2\,261{,}23}{437{,}603}=\mathbf{0{,}0001453}\ \text{par an}$$

$$\text{timing}=\frac{0{,}05\times0{,}5\times0{,}05\times0{,}7\times0{,}15\times0{,}20}{1+0{,}05\times0{,}5}=\mathbf{0{,}0000256}\ \text{par an}$$

$$\boxed{\text{total}=0{,}0001453-0{,}0000256=\mathbf{0{,}0001197}\ \text{par an}=\mathbf{1{,}197\ \text{points de base par an}}}$$

*Étape 5 — l'application.* *Pour valoriser le CMS, **le taux de swap à 5 ans dans 4 ans doit être supposé valoir 5,0479 % et non 5 %***, et le flux net reçu au point **4,5 ans** vaut

$$0{,}5\times0{,}000479\times100\,000\,000=\mathbf{23\,940\ \text{dollars}}$$

*Étape 6 — la valeur totale, en actualisant tous les flux :*

$$\boxed{\mathbf{159\,811\ \text{dollars}}}$$

> **Noter les signes :** *la convexité **AJOUTE** au taux (elle est **positive**), le timing **RETRANCHE**. La convexité **domine largement** ici (145 contre 26 en dixièmes de pb).*

</details>

**Le CMT swap.** *« Un **constant maturity Treasury swap** fonctionne comme un CMS **sauf que le taux variable est LE RENDEMENT D'UNE OBLIGATION D'ÉTAT d'une durée spécifiée**. **L'analyse est essentiellement la même, avec $S_i$ défini comme LE RENDEMENT AU PAIR d'une obligation d'État de la durée spécifiée.** »*

### 2.3 Les *differential swaps*

> ***Un DIFFERENTIAL SWAP (ou DIFF SWAP) est un swap de taux où UN TAUX VARIABLE EST OBSERVÉ DANS UNE DEVISE ET APPLIQUÉ À UN PRINCIPAL DANS UNE AUTRE DEVISE.***

$$\boxed{\text{Taux à supposer}=V_i+V_i\,\rho_i\,\sigma_{W,i}\,\sigma_{V,i}\,t_i}\;\text{(32.3)}$$

| Symbole | Signification |
|---|---|
| $V_i$ | le **taux forward** entre $t_i$ et $t_{i+1}$ **dans la devise Y** |
| $W_i$ | le **change forward** pour une échéance $t_{i+1}$, en **unités de Y par unité de X** |
| $\sigma_{V,i}$, $\sigma_{W,i}$ | leurs volatilités |
| $\rho_i$ | leur corrélation |

> ⚠️ **C'est l'ajustement QUANTO de (29.6)** *(fiche 101)*, dans sa forme **linéarisée**.

<details class="details--riche">
<summary>

**Exemple 32.4 — un diff swap USD/GBP à 3 ans**

</summary>

**Données.** Taux zéro **plats à 5 %** en composition annuelle **dans les deux pays**. Swap à **3 ans**, paiements annuels : on **REÇOIT le LIBOR USD 12 mois** et **PAIE le LIBOR sterling 12 mois**, **les DEUX appliqués à un principal de 10 millions de LIVRES STERLING**. Volatilité des forwards à 1 an aux États-Unis : **20 %** ; volatilité du change forward USD/sterling (dollars par livre) : **12 %** ; corrélation : **0,4**.

*Étape 1 — l'ajustement :*

$$0{,}05+0{,}05\times0{,}4\times0{,}12\times0{,}2\times t_i=0{,}05+\mathbf{0{,}00048}\,t_i$$

*Étape 2 — les flux nets.* *Le taux observé en $t_i$ est payé en $t_{i+1}$.* Le taux **observé en 0** est **connu et vaut 5 %** ; le décalage donne :

| Paiement à | Taux observé en | Ajustement | Flux net (livres) |
|---|---|---|---|
| 1 an | 0 | **0** | **0** |
| 2 ans | 1 an | $0{,}00048$ | **4 800** |
| 3 ans | 2 ans | $0{,}00096$ | **9 600** |

*Étape 3 — la valeur :*

$$\frac{0}{1{,}05}+\frac{4\,800}{1{,}05^2}+\frac{9\,600}{1{,}05^3}=\boxed{\mathbf{12\,647\ \text{livres sterling}}}$$

> **La lecture :** *la jambe sterling est **exactement compensée** par la structure ; **toute la valeur vient de l'ajustement QUANTO** sur la jambe américaine.*

</details>

## 🟠 Concept 3 — Les swaps d'actions

> ***Dans un SWAP D'ACTIONS, une partie promet de payer LE RENDEMENT D'UN INDICE ACTIONS sur un principal notionnel, tandis que l'autre promet un rendement FIXE ou VARIABLE sur un principal notionnel.***

*L'utilité : **permettre aux gérants de fonds d'AUGMENTER OU RÉDUIRE leur exposition à un indice SANS ACHETER NI VENDRE d'actions**. C'est **une façon commode d'empaqueter une série de forwards sur indice**.*

**L'exemple (Business Snapshot 32.3).** *Le rendement à 6 mois du **S&P 500** contre le **LIBOR 6 mois**, principal **100 millions de chaque côté**, paiements **semestriels**. Le paiement actions vaut $100(I_1-I_0)/I_0$, où $I_1$ est le niveau de l'indice à la date de paiement et $I_0$ à la **date de paiement immédiatement précédente**.*

⚠️ *L'indice est habituellement **un indice de RENDEMENT TOTAL**, où **les dividendes sont réinvestis** dans les actions le composant.*

<details class="details--riche">
<summary>

**Pourquoi le swap vaut zéro, et sa valeur entre deux dates**

</summary>

> ⚠️ ***« Pour un swap actions-contre-variable, LA VALEUR AU DÉBUT DE SA VIE EST ZÉRO. »***

**La démonstration par réplication.** *« Une institution financière peut organiser de **répliquer SANS COÛT** les flux d'un côté **en EMPRUNTANT le principal à chaque date de paiement au LIBOR et en l'INVESTISSANT dans l'indice jusqu'à la date suivante, les dividendes étant réinvestis**. »*

> ⚠️ ***« Un argument similaire montre que LE SWAP VAUT TOUJOURS ZÉRO IMMÉDIATEMENT APRÈS UNE DATE DE PAIEMENT. »***

**Entre deux dates de paiement**, il faut valoriser les deux flux de la prochaine date :

| Jambe | Valeur |
|---|---|
| **LIBOR** | **fixée à la dernière réinitialisation** — donc **facile** à valoriser |
| **Actions** | $\boxed{L\,\dfrac{E}{E_0}}$ où $L$ est le principal, $E$ **la valeur courante** de l'indice, $E_0$ sa valeur **à la dernière date de paiement** |

</details>

## 🔴 Concept 4 — Les swaps à options intégrées

### 4.1 L'*accrual swap*

> ***Les ACCRUAL SWAPS sont des swaps où LES INTÉRÊTS D'UN CÔTÉ NE COURENT QUE LORSQUE LE TAUX DE RÉFÉRENCE VARIABLE EST DANS UNE CERTAINE FOURCHETTE.***

*Parfois la fourchette **reste fixe** toute la vie du swap ; parfois elle est **réinitialisée périodiquement**.*

<details class="details--riche">
<summary>

**La décomposition en options binaires — l'idée maîtresse**

</summary>

**L'exemple simple.** *Un taux fixe $Q$ contre le LIBOR 3 mois chaque trimestre, **le fixe ne courant QUE les jours où le LIBOR 3 mois est SOUS 8 % par an**. Principal $L$.*

|  | Swap normal | Accrual swap |
|---|---|---|
| Paiement fixe | $QL\dfrac{n_1}{n_2}$ | $QL\dfrac{n_3}{n_2}$ |

où $n_1$ = jours du trimestre précédent, $n_2$ = jours de l'année, **$n_3$ = jours du trimestre où le LIBOR était SOUS 8 %**.

> ⚠️ ***« Le payeur du fixe ÉCONOMISE $QL/n_2$ CHAQUE JOUR où le LIBOR 3 mois est AU-DESSUS de 8 %. SA POSITION EST DONC ÉQUIVALENTE À UN SWAP ORDINAIRE PLUS UNE SÉRIE D'OPTIONS BINAIRES — UNE POUR CHAQUE JOUR DE LA VIE DU SWAP. Les options binaires versent $QL/n_2$ quand le LIBOR 3 mois est au-dessus de 8 %. »***

**La formule générale.** Avec $R_K$ le taux de coupure, $\delta$ l'intervalle entre paiements, $t_i$ le temps jusqu'au jour $i$, $R_i$ le taux $\delta$-an ce jour-là, $F_i$ son forward et $\sigma_i$ sa volatilité *(estimée des volatilités SPOT de caplets)* :

*Étape 1 — la probabilité, sous l'hypothèse lognormale usuelle, que le LIBOR dépasse $R_K$ dans un monde forward risque-neutre par rapport à un zéro-coupon maturant en $t_i+\delta$ :*

$$N(d_2)\qquad\text{avec}\qquad\boxed{d_2=\frac{\ln(F_i/R_K)-\sigma_i^2t_i/2}{\sigma_i\sqrt{t_i}}}$$

*Étape 2 — la correction de timing.* *Le payoff est réalisé **à la date de paiement du swap SUIVANT le jour $i$**, notée $s_i$. La probabilité dans un monde forward risque-neutre par rapport à $P(t,s_i)$ est $N(d_2^\ast)$, **où $d_2^\ast$ se calcule par la même formule mais avec un PETIT AJUSTEMENT DE TIMING à $F_i$**, reflétant la différence entre $t_i+\delta$ et $s_i$.*

*Étape 3 — la valeur d'une option binaire :*

$$\boxed{\frac{QL}{n_2}\,P(0,s_i)\,N(d_2^\ast)}$$

*Étape 4 — sommer sur **CHAQUE JOUR** de la vie du swap.*

⚠️ *« **L'ajustement de timing (le passage de $d_2$ à $d_2^\ast$) est si PETIT qu'en pratique il est fréquemment IGNORÉ.** »*

*(Convention : **si un jour est férié, le taux applicable est celui du jour ouvré immédiatement précédent**.)*

</details>

### 4.2 Le swap annulable

> ***Un CANCELABLE SWAP est un swap de taux vanille où UN CÔTÉ A L'OPTION DE TERMINER à une ou plusieurs dates de paiement.***

**Le principe de décomposition.** *« **Terminer un swap est la même chose qu'entrer dans le swap OPPOSÉ.** »*

| Qui a l'option | Décomposition |
|---|---|
| **Microsoft** peut annuler | swap ordinaire **+ position LONGUE** dans une option d'entrer dans le swap opposé |
| **Goldman Sachs** peut annuler | Microsoft a un swap ordinaire **+ position COURTE** dans cette option |

<details class="details--riche">
<summary>

**Les deux cas : une seule date ou plusieurs**

</summary>

**Cas 1 — une SEULE date de terminaison ⇒ une SWAPTION EUROPÉENNE.**

*Exemple : un swap de **10 ans** où Microsoft **reçoit 6 %** et **paie le LIBOR**, avec l'option de terminer **au bout de 6 ans**.*

$$\boxed{\text{= swap 10 ans (recevoir 6 \%) + CALL européen à 6 ans sur un swap 4 ans (payer 6 \%, recevoir LIBOR)}}$$

⚠️ ***C'est une swaption européenne $6\times4$*** — valorisée par le modèle de marché standard du chapitre 28 (fiche 100).

**Cas 2 — PLUSIEURS dates ⇒ une SWAPTION BERMUDIENNE.**

*Exemple : un swap de **5 ans**, paiements **semestriels**, Microsoft **reçoit 6 %** et **paie le LIBOR** ; **la CONTREPARTIE** a l'option de terminer **à toute date de paiement entre l'année 2 et l'année 5**.*

$$\boxed{\text{= swap ordinaire + position COURTE dans une swaption BERMUDIENNE}}$$

*La swaption bermudienne est une option d'entrer dans un swap maturant à 5 ans où **6 % est reçu et le LIBOR payé**, exerçable **à toute date de paiement entre l'année 2 et l'année 5**.* Valorisation : chapitres **30 et 31** (fiches 102-103).

</details>

<details class="details--riche">
<summary>

**Les swaps à capitalisation annulables — les astuces de valorisation**

</summary>

*Sur terminaison : **le payeur variable paie la valeur CAPITALISÉE des montants variables jusqu'à la terminaison**, et le payeur fixe **celle des paiements fixes**.*

**Cas A — le taux variable est le LIBOR, capitalisé au LIBOR.**

| Étape | Contenu |
|---|---|
| 1 | **Supposer que le PRINCIPAL est payé des DEUX côtés à la fin de vie du swap.** *C'est le passage de la table 7.1 à la table 7.2 pour un swap vanille (fiche 80).* **Cela ne change pas la valeur** et garantit que **la valeur de la jambe variable ÉGALE TOUJOURS LE NOTIONNEL à une date de paiement** |
| 2 | ***Pour prendre la décision d'annulation, IL SUFFIT DONC DE REGARDER LA JAMBE FIXE.*** |
| 3 | Construire un **arbre de taux** (chapitre 30), le remonter en valorisant la jambe fixe |
| 4 | À chaque nœud d'annulation possible, **annuler revient à mettre la jambe fixe AU PAIR** |
| 5 | Si l'on **paie fixe et reçoit variable** : **MINIMISER** la valeur de la jambe fixe. Si l'on **reçoit fixe** : **MAXIMISER**-la |

**Cas B — LIBOR plus un spread, capitalisé au LIBOR.** ***Les flux correspondant au spread peuvent être RETRANCHÉS de la jambe FIXE au lieu d'être ajoutés à la variable.** L'option se valorise ensuite comme dans le cas A.*

**Cas C — capitalisation au LIBOR plus un spread.** L'approche **approchée** :

| Étape | Contenu |
|---|---|
| **1** | valeur de la jambe variable à chaque date d'annulation **en supposant les forwards réalisés** |
| **2** | valeur de la jambe variable **en supposant taux LIBOR capitalisé au LIBOR** |
| **3** | définir l'excès de (1) sur (2) comme **« la valeur des spreads »** |
| **4** | traiter l'option comme au cas A, **en RETRANCHANT la valeur des spreads des valeurs calculées pour la jambe fixe** |

⚠️ *« Cette approche **n'est pas parfaitement exacte**, en ce qu'elle suppose que **la décision d'exercice n'est PAS influencée par le fait que les paiements futurs sont capitalisés à un taux différent du LIBOR**. »*

</details>

## 🟡 Concept 5 — Les autres swaps

| Swap | Description |
|---|---|
| ***Index amortizing rate swap*** *(ou* indexed principal swap*)* | *très populaire aux **États-Unis au milieu des années 1990**. **Le principal se réduit d'une façon DÉPENDANT DU NIVEAU DES TAUX : plus le taux est bas, plus la réduction est grande.** La jambe fixe était **conçue à l'origine pour reproduire approximativement le rendement d'un MBS d'agence après prise en compte des options de prépaiement*** (fiche 103) |
| **Swap de matières premières** | *une entreprise consommant **100 000 barils de pétrole par an** peut convenir de payer **8 millions de dollars par an pendant 10 ans** et de recevoir $100\,000\,S$, où $S$ est le prix du baril. **Cela verrouille son coût du pétrole à 80 dollars le baril.** Un producteur ferait l'échange **inverse** |
| **Renvois** | *les **asset swaps** au chapitre 23 (fiche 95), les **total return swaps** et **CDS** au chapitre 24 (fiche 96), les **swaps de volatilité et de variance** au chapitre 25 (fiche 97)* |

<details class="details--riche">
<summary>

**Business Snapshot 32.4 — l'affaire Procter & Gamble contre Bankers Trust**

</summary>

⚠️ *« **Certains swaps ont des payoffs calculés de façons TOUT À FAIT BIZARRES.** »*

**Le contrat « 5/30 »**, conclu entre **Bankers Trust (BT)** et **Procter & Gamble (P&G)** le **2 novembre 1993** : swap de **5 ans**, paiements **semestriels**, notionnel **200 millions de dollars**.

| Qui | Paie |
|---|---|
| **BT** | **5,30 % par an** à P&G |
| **P&G** | **le taux CP 30 jours MOYEN moins 75 points de base, PLUS UN SPREAD** |

*Le taux CP moyen était calculé **en observant le taux CP 30 jours CHAQUE JOUR de la période d'accroissement précédente et en moyennant**.*

**Le spread**, nul pour le premier paiement (2 mai 1994), valait ensuite :

$$\boxed{\max\left[0,\ \frac{98{,}5\times\dfrac{\text{CMT 5 ans}\,\%}{5{,}78\,\%}-(\text{prix du TSY 30 ans})}{100}\right]}$$

*où **CMT 5 ans** est le rendement du Trésor à maturité constante 5 ans (rapporté par la Réserve fédérale) et **le prix du TSY 30 ans** est le milieu des prix cash bid/offer de l'obligation du Trésor 6,25 % maturant en août 2023.*

> ⚠️ ***« Noter que le spread calculé par la formule est un TAUX D'INTÉRÊT DÉCIMAL. Il n'est PAS mesuré en points de base. SI LA FORMULE DONNE 0,1 ET QUE LE TAUX CP EST 6 %, LE TAUX PAYÉ PAR P&G EST 15,25 %. »***

**Le dénouement.** *« P&G espérait que le spread serait NUL et que l'accord lui permettrait d'échanger un financement fixe à 5,30 % contre un financement à **75 points de base SOUS le taux CP**. **EN FAIT, LES TAUX ONT FORTEMENT MONTÉ DÉBUT 1994, LES PRIX D'OBLIGATIONS ONT CHUTÉ, ET LE SWAP S'EST RÉVÉLÉ TRÈS, TRÈS COÛTEUX.** »*

*(Les détails sont dans le domaine public car l'affaire a fait l'objet d'un **contentieux**.)*

</details>

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Traitement |
|---|---|
| Principal variable, fréquences différentes, taux CP | **règle simple** — mais actualiser **au LIBOR** |
| « les intérêts sont capitalisés jusqu'à la fin » | **swap à capitalisation** : construire les deux cumuls, actualiser la différence |
| « le taux payé égale le taux observé **ce jour même** » | **LIBOR-in-arrears** : convexité (32.1) |
| « le taux variable est le **taux de swap à $n$ ans** » | **CMS** : les **DEUX** ajustements (32.2) |
| « le rendement d'une obligation d'État à $n$ ans » | **CMT** : idem avec le **rendement au pair** |
| Taux d'une devise appliqué au principal d'une autre | ***diff swap*** : quanto (32.3) |
| « le rendement d'un indice actions » | **swap d'actions** : vaut **zéro** aux dates de paiement |
| « n'accrue que si le taux est dans une fourchette » | ***accrual swap*** : swap + **options binaires quotidiennes** |
| « une partie peut terminer » | **cancelable** : swap + **swaption** (européenne ou bermudienne) |
| Le principal se réduit selon les taux | ***index amortizing rate swap*** |
| « verrouiller le prix du pétrole » | **swap de matières premières** |

## Comment résoudre ce type d'exercice

**A — Un swap à capitalisation.**

1. Construire la **jambe fixe** : capitaliser au taux fixe de capitalisation, ajouter l'intérêt chaque année.
2. Construire la **jambe variable** : **poser tous les taux futurs égaux aux forwards**, capitaliser au taux variable de capitalisation.
3. Différence des deux montants terminaux.
4. Actualiser **à la date terminale** avec la courbe zéro.

**B — Un swap avec ajustement.**

1. Identifier **laquelle des trois anomalies** est présente : paiement **anticipé** (convexité), **retardé** (timing), **devise croisée** (quanto).
2. Calculer l'ajustement, **proportionnel à $t_i$** dans les trois cas.
3. Construire les **taux ajustés** date par date.
4. Calculer les **flux nets** contre la jambe fixe.
5. Actualiser. **Contrôle : si le swap serait nul en version ordinaire, toute la valeur vient de l'ajustement.**

**C — Un swap à option intégrée.**

1. **Décomposer** : swap ordinaire **+** (ou $-$) l'option.
2. Valoriser le swap ordinaire par la **règle simple**.
3. Identifier l'option : **binaires quotidiennes** (accrual) ou **swaption** (cancelable).
4. Valoriser l'option avec l'outil approprié : Black pour les binaires et l'européenne, **arbre** ou **LMM** pour la bermudienne.
5. **Additionner** avec le bon signe.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire que la règle simple marche toujours | **trois familles d'exceptions** |
| Actualiser des flux CP à la courbe CP | les flux se **CALCULENT** avec la courbe CP mais s'**ACTUALISENT au LIBOR** |
| Croire qu'un in-arrears vaut zéro comme un swap ordinaire | ici $-144\,500$ dollars sur 100 M |
| Oublier un des deux termes du CMS | il y a **CONVEXITÉ ET TIMING** |
| Se tromper de source de volatilité pour le CMS | $\sigma_y$ des **SWAPTIONS**, $\sigma_F$ des **CAPLETS**, $\rho$ de l'**historique** |
| Croire que le taux de swap produit une annuité dans (32.2) | l'ajustement suppose **UN SEUL paiement** |
| Oublier le décalage d'observation dans un *diff swap* | le **premier** flux net est **NUL** (le taux est déjà connu) |
| Croire qu'un swap d'actions a toujours une valeur | il vaut **zéro à l'initiation ET juste après chaque paiement** |
| Valoriser la jambe actions par un modèle | c'est simplement $L\,E/E_0$ |
| Traiter un *accrual swap* comme un swap ordinaire | c'est un swap **plus un portefeuille d'options binaires — une par JOUR** |
| Oublier la convention des jours fériés | le taux est celui du **jour ouvré PRÉCÉDENT** |
| Croire qu'annuler ≠ entrer dans le swap opposé | **c'est exactement la même chose** |
| Confondre swaption européenne et bermudienne | **une** date d'annulation → européenne ; **plusieurs** → bermudienne |
| Se tromper de sens de l'optimisation d'annulation | **payer fixe → MINIMISER** ; **recevoir fixe → MAXIMISER** la jambe fixe |
| Ajouter le spread à la jambe variable dans un compounding annulable | le **RETRANCHER de la jambe FIXE** simplifie tout |
| Lire le spread P&G en points de base | c'est un **taux DÉCIMAL** — 0,1 signifie **10 %** |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **La règle standard** | **« supposer les taux forward réalisés »**, actualiser au **LIBOR** |
| **Step-up swap** | principal **croissant** |
| **Amortizing swap** | principal **décroissant** |
| **Principaux et fréquences différents** | **n'affectent PAS** la méthodologie |
| **Basis swap** | un taux **variable** contre un **autre** taux variable |
| **Sa valorisation** | flux calculés avec **l'autre courbe**, actualisés **au LIBOR** |
| **Swap à capitalisation** | **une seule** date de paiement, à la **fin** |
| **Exemple 32.1 : jambe fixe** | $4\to8{,}156\to\mathbf{12{,}474}$ M |
| **Sa jambe variable** | $5\to10{,}24\to\mathbf{15{,}731}$ M |
| **Sa valeur** | $\dfrac{3{,}257}{1{,}05^3}=\mathbf{2{,}814}$ M |
| **Swaps de devises** | fixe/fixe · **floating/floating** · **cross-currency** |
| **Leur actualisation** | **chaque devise à SA courbe**, puis conversion au **change courant** |
| **L'ajustement de marché** | actualiser le JPY à **LIBOR JPY $-$ 20 pb** si c'est le spread coté |
| **LIBOR-in-arrears** | le taux **observé** est payé **à cette date même** |
| **Son ajustement** | $F_i+\dfrac{F_i^2\sigma_i^2\delta_it_i}{1+F_i\delta_i}$ — **CONVEXITÉ** |
| **Exemple 32.2** | ajustement $0{,}000115\,t$, taux 5,0115 % à 5,0575 %, valeur $\mathbf{-144\,514}$ dollars |
| **CMS** | le taux variable est **le TAUX DE SWAP** d'une durée donnée |
| **Son ajustement** | **DEUX termes : convexité ET timing** |
| **$\sigma_y$ vient de** | les **SWAPTIONS** |
| **$\sigma_F$ vient de** | les **CAPLETS** |
| **$\rho$ vient de** | les **données HISTORIQUES** |
| **Exemple 32.3** | $G'=-437{,}603$, $G''=2\,261{,}23$ |
| **Ses deux termes** | convexité $\mathbf{+0{,}0001453}$ · timing $\mathbf{-0{,}0000256}$ |
| **Son total** | $\mathbf{1{,}197}$ **points de base par an** |
| **Son taux à 4 ans** | **5,0479 %** |
| **Sa valeur** | **159 811 dollars** |
| **CMT** | comme CMS, avec **le RENDEMENT AU PAIR d'une obligation d'État** |
| **Diff swap** | taux d'une devise sur un principal **d'une autre** |
| **Son ajustement** | $V_i+V_i\rho_i\sigma_{W,i}\sigma_{V,i}t_i$ — **QUANTO** |
| **Exemple 32.4** | ajustement $0{,}00048\,t$ ; flux **0 / 4 800 / 9 600** ; valeur **12 647 £** |
| **Swap d'actions** | rendement d'un **indice de RENDEMENT TOTAL** contre fixe ou variable |
| **Son usage** | changer d'exposition **sans acheter ni vendre** d'actions |
| **Sa valeur à l'initiation** | **ZÉRO** |
| **Juste après un paiement** | **ZÉRO** aussi |
| **L'argument** | **réplication sans coût** : emprunter au LIBOR, investir dans l'indice |
| **Sa jambe actions entre deux dates** | $L\,E/E_0$ |
| **Accrual swap** | les intérêts ne courent **que dans une fourchette** |
| **Sa décomposition** | swap ordinaire **+ une option BINAIRE PAR JOUR** |
| **Ce que verse chaque binaire** | $QL/n_2$ |
| **Sa formule** | $\dfrac{QL}{n_2}P(0,s_i)N(d_2^\ast)$ |
| **L'ajustement de timing** | **si petit qu'il est fréquemment IGNORÉ** |
| **Cancelable swap** | un côté peut **terminer** |
| **Le principe** | terminer $=$ **entrer dans le swap OPPOSÉ** |
| **Une seule date** | swap $+$ **swaption EUROPÉENNE** ($6\times4$ dans l'exemple) |
| **Plusieurs dates** | swap $+$ **swaption BERMUDIENNE** |
| **Compounding annulable, astuce 1** | **ajouter le principal des deux côtés** → la jambe variable vaut **le pair** |
| **Sa conséquence** | **il suffit de regarder la JAMBE FIXE** |
| **La règle d'optimisation** | payer fixe → **minimiser** ; recevoir fixe → **maximiser** |
| **Le spread** | le **retrancher de la jambe FIXE** |
| **Index amortizing rate swap** | le principal se réduit **quand les taux baissent** |
| **Son origine** | reproduire le rendement d'un **MBS d'agence** |
| **Swap de matières premières** | 8 M par an contre $100\,000\,S$ → **80 dollars le baril verrouillés** |
| **L'affaire P&G** | swap **5/30**, 2 nov. 1993, **200 M**, BT paie **5,30 %** |
| **Le piège** | **le spread est un taux DÉCIMAL**, pas des points de base |
| **Le dénouement** | **les taux ont monté début 1994 : très, très coûteux** |

## 🧠 Active Recall

1. Écrire les deux étapes de la règle standard de valorisation d'un swap.
2. Citer les trois familles de swaps non standard et leur traitement.
3. Définir *step-up* et *amortizing swap*, avec leur usage type.
4. Que se passe-t-il si les principaux et les fréquences diffèrent ?
5. Définir un *basis swap* et donner un exemple.
6. Quelle courbe sert à calculer les flux d'un *basis swap* ? Laquelle à les actualiser ?
7. Décrire un swap à capitalisation. Combien de dates de paiement ?
8. Pourquoi la règle simple se justifie-t-elle côté variable ?
9. Quand l'approche est-elle exacte, et quand est-elle approchée ?
10. Refaire l'exemple 32.1 : les deux jambes puis la valeur.
11. Citer les trois types de swaps de devises.
12. Comment actualise-t-on chaque jambe ? Comment les combine-t-on ?
13. Décrire l'ajustement de marché des taux d'actualisation et sa justification.
14. Qu'est-ce qu'un swap LIBOR-in-arrears ? En quoi diffère-t-il du vanille ?
15. Écrire (32.1) et dire de quel ajustement il s'agit.
16. Refaire l'exemple 32.2 : l'ajustement, les cinq taux, la valeur.
17. Pourquoi le swap ne vaut-il pas zéro ?
18. Définir un CMS swap. Quel décalage y a-t-il habituellement ?
19. Écrire (32.2) et nommer ses deux termes.
20. D'où viennent $\sigma_y$, $\sigma_F$ et $\rho$ respectivement ?
21. Que représente $G_i(x)$ ? Quel coupon porte-t-elle ?
22. Justifier chacun des deux termes de l'ajustement.
23. Refaire l'exemple 32.3 : $G'$, $G''$, les deux termes, le total.
24. Quel taux suppose-t-on pour le swap à 5 ans dans 4 ans ? Quel flux à 4,5 ans ?
25. Qu'est-ce qu'un CMT swap ? Comment l'analyse-t-on ?
26. Définir un *diff swap*.
27. Écrire (32.3) et définir chaque symbole.
28. Refaire l'exemple 32.4 : l'ajustement, les trois flux, la valeur.
29. Pourquoi le premier flux net est-il nul ?
30. Décrire un swap d'actions et son utilité.
31. Quel type d'indice utilise-t-on habituellement ?
32. Pourquoi le swap vaut-il zéro à l'initiation ? Détailler la réplication.
33. Que vaut-il juste après une date de paiement ?
34. Comment valorise-t-on chaque jambe entre deux dates ?
35. Définir un *accrual swap*.
36. Écrire le paiement fixe d'un swap normal puis d'un *accrual swap*.
37. Ce que le payeur du fixe économise, et l'équivalence qui en découle.
38. Écrire $d_2$ et expliquer le passage à $d_2^\ast$.
39. Écrire la valeur d'une option binaire quotidienne.
40. L'ajustement de timing est-il important en pratique ?
41. Quelle est la convention pour les jours fériés ?
42. Qu'est-ce qu'un swap annulable ? Quel est le principe de décomposition ?
43. Détailler le cas d'une seule date d'annulation. Quelle swaption obtient-on ?
44. Détailler le cas de plusieurs dates.
45. Que paie chaque côté à la terminaison d'un compounding annulable ?
46. Quelle astuce simplifie le cas LIBOR capitalisé au LIBOR ?
47. Pourquoi suffit-il alors de regarder la jambe fixe ?
48. Que fait-on à chaque nœud d'annulation possible ?
49. Quelle est la règle d'optimisation selon le sens du swap ?
50. Comment traiter un spread additif ? Une capitalisation à LIBOR plus spread ?
51. Quelle est la limite de cette approche approchée ?
52. Qu'est-ce qu'un *index amortizing rate swap* ? Quelle était son origine ?
53. Décrire un swap de matières premières et l'effet obtenu.
54. Décrire le swap 5/30 de P&G : les dates, le notionnel, les deux jambes.
55. Écrire la formule du spread et le piège d'unité.
56. Qu'espérait P&G, et que s'est-il passé ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La règle standard ? | **« Supposer les taux forward réalisés »** |
| Où actualise-t-on ? | À la courbe **LIBOR/swap** |
| Les trois familles ? | **Règle simple** · **ajustements** · **options intégrées** |
| Step-up swap ? | Principal **CROISSANT** |
| Amortizing swap ? | Principal **DÉCROISSANT** |
| Usage du step-up ? | Une entreprise de **construction** |
| Principaux différents ? | **N'affecte PAS** la méthode |
| Basis swap ? | Un **variable** contre un **autre variable** |
| Exemple ? | **CP 3 mois + 10 pb** contre **LIBOR 3 mois** |
| Son usage ? | Actifs et passifs sur des **références différentes** |
| Courbe de calcul des flux ? | Celle du **taux de référence** |
| Courbe d'actualisation ? | **LIBOR** |
| Swap à capitalisation ? | **UNE seule** date de paiement, à la **fin** |
| Ce qui remplace le paiement ? | Les intérêts sont **CAPITALISÉS** |
| Justification côté variable ? | Une série de **FRA** |
| Quand est-ce exact ? | Si le spread de capitalisation est **nul** |
| Ex. 32.1 : jambe fixe ? | **12,474 M** |
| Ex. 32.1 : jambe variable ? | **15,731 M** |
| Le taux de capitalisation variable ? | $5\,\%-20$ pb $=\mathbf{4{,}8\,\%}$ |
| Ex. 32.1 : la valeur ? | **2,814 M de dollars** |
| Les trois swaps de devises ? | Fixe/fixe · **floating/floating** · **cross-currency** |
| Comment actualiser ? | **Chaque devise à SA courbe** |
| Comment combiner ? | Au **change COURANT** |
| L'ajustement de marché ? | Actualiser le JPY à **LIBOR $-$ 20 pb** |
| Sa justification ? | Sinon **profit ou perte immédiats** à chaque nouveau swap |
| LIBOR-in-arrears ? | Le taux **observé** est payé **à cette date même** |
| L'ajustement nécessaire ? | La **CONVEXITÉ** |
| Sa formule ? | $F_i+\dfrac{F_i^2\sigma_i^2\delta_it_i}{1+F_i\delta_i}$ |
| Ex. 32.2 : ajustement par an ? | **0,000115** |
| Ex. 32.2 : taux de l'année 5 ? | **5,0575 %** |
| Ex. 32.2 : la valeur ? | $\mathbf{-144\,514}$ dollars |
| Ce que vaudrait le swap ordinaire ? | **ZÉRO** |
| CMS swap ? | Le variable est **le TAUX DE SWAP** à $n$ ans |
| Le décalage habituel ? | Le taux de la date **PRÉCÉDENTE** |
| Combien d'ajustements ? | **DEUX** : convexité **et** timing |
| $\sigma_y$ vient de ? | Les **SWAPTIONS** |
| $\sigma_F$ vient de ? | Les **CAPLETS** |
| $\rho$ vient de ? | Les **données HISTORIQUES** |
| Que représente $G_i(x)$ ? | Une obligation de **coupon $y_i$**, même vie et fréquence |
| Hypothèse du terme de convexité ? | Le taux de swap donne **UN SEUL paiement** |
| Hypothèse du terme de timing ? | Le paiement est en **$t_{i+1}$, pas $t_i$** |
| Ex. 32.3 : $G'$ ? | $\mathbf{-437{,}603}$ |
| Ex. 32.3 : $G''$ ? | $\mathbf{2\,261{,}23}$ |
| Ex. 32.3 : convexité ? | $\mathbf{+0{,}0001453}$ par an |
| Ex. 32.3 : timing ? | $\mathbf{-0{,}0000256}$ par an |
| Ex. 32.3 : total ? | **1,197 pb par an** |
| Ex. 32.3 : taux à 4 ans ? | **5,0479 %** |
| Ex. 32.3 : flux à 4,5 ans ? | **23 940 dollars** |
| Ex. 32.3 : valeur ? | **159 811 dollars** |
| CMT swap ? | Le **rendement d'une obligation d'ÉTAT** |
| Comment l'analyser ? | Comme un CMS avec le **rendement AU PAIR** |
| Diff swap ? | Taux d'**une devise** sur un principal d'**une autre** |
| L'ajustement nécessaire ? | Le **QUANTO** |
| Sa formule ? | $V_i+V_i\rho_i\sigma_{W,i}\sigma_{V,i}t_i$ |
| Ex. 32.4 : l'ajustement ? | **0,00048** par an |
| Ex. 32.4 : les trois flux ? | **0 · 4 800 · 9 600** livres |
| Pourquoi le premier est-il nul ? | Le taux **observé en 0 est déjà connu** |
| Ex. 32.4 : la valeur ? | **12 647 livres sterling** |
| Swap d'actions ? | Rendement d'un **indice** contre fixe ou variable |
| Son utilité ? | Changer d'exposition **sans acheter d'actions** |
| Quel indice ? | Un indice de **RENDEMENT TOTAL** |
| Sa valeur à l'initiation ? | **ZÉRO** |
| Juste après un paiement ? | **ZÉRO** |
| L'argument ? | **Réplication sans coût** : emprunter au LIBOR, investir |
| Valeur de la jambe actions entre deux dates ? | $L\,E/E_0$ |
| Valeur de la jambe LIBOR ? | **Fixée à la dernière réinitialisation** |
| Accrual swap ? | Les intérêts ne courent **que dans une fourchette** |
| Paiement fixe normal ? | $QL\,n_1/n_2$ |
| Paiement d'un accrual ? | $QL\,n_3/n_2$ |
| Que représente $n_3$ ? | Les jours où le taux est **dans la fourchette** |
| Sa décomposition ? | Swap **+ une option BINAIRE PAR JOUR** |
| Ce que verse chaque binaire ? | $QL/n_2$ |
| Formule de $d_2$ ? | $\dfrac{\ln(F_i/R_K)-\sigma_i^2t_i/2}{\sigma_i\sqrt{t_i}}$ |
| Pourquoi $d_2^\ast$ ? | Un **ajustement de TIMING** de $t_i+\delta$ à $s_i$ |
| Est-il important ? | **Non — souvent IGNORÉ** |
| Convention des jours fériés ? | Le taux du **jour ouvré précédent** |
| Cancelable swap ? | Un côté peut **terminer** |
| Terminer, c'est ? | **Entrer dans le swap OPPOSÉ** |
| Une seule date ? | Une swaption **EUROPÉENNE** |
| L'exemple ? | Swap 10 ans, option à 6 ans → swaption **$6\times4$** |
| Plusieurs dates ? | Une swaption **BERMUDIENNE** |
| Où la valoriser ? | Chapitres **30 et 31** |
| Compounding annulable : l'astuce 1 ? | **Ajouter le principal des deux côtés** |
| Son effet ? | La jambe variable vaut **le pair** |
| Sa conséquence ? | Il suffit de regarder **la jambe FIXE** |
| Payer fixe : que fait-on ? | **MINIMISER** la valeur de la jambe fixe |
| Recevoir fixe ? | **MAXIMISER** |
| Le spread additif ? | Le **RETRANCHER de la jambe FIXE** |
| Capitalisation à LIBOR + spread ? | Calculer la **« valeur des spreads »** et la retrancher |
| La limite de l'approche ? | Elle suppose la décision **non influencée** par le spread |
| Index amortizing rate swap ? | Le principal se réduit **quand les taux baissent** |
| Son origine ? | Reproduire un **MBS d'agence** |
| Swap de matières premières ? | 8 M par an contre $100\,000\,S$ |
| L'effet ? | **80 dollars le baril verrouillés** |
| Le swap P&G ? | Le **5/30**, 2 novembre 1993 |
| Son notionnel ? | **200 millions de dollars** |
| Ce que BT payait ? | **5,30 % par an** |
| Ce que P&G payait ? | **CP moyen $-$ 75 pb $+$ un SPREAD** |
| Le piège d'unité ? | Le spread est un taux **DÉCIMAL** |
| Si la formule donne 0,1 et le CP 6 % ? | P&G paie **15,25 %** |
| Ce qu'espérait P&G ? | Un spread **NUL** |
| Ce qui est arrivé ? | Les taux **ont monté début 1994** |
