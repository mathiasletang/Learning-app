# Fiche 100 — Dérivés de taux : les modèles de marché standard (obligations, caps, swaptions)

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Produits de taux |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 28 « Interest Rate Derivatives: The Standard Market Models » |
| **Difficulté** | Must know — les trois produits de taux les plus négociés de gré à gré |
| **Temps d'étude estimé** | 1 h 50 |
| **Prérequis** | Fiches 77 (taux et duration), 80 (swaps), 89 (modèle de Black), 99 (martingales et numéraires) |
| **Concepts clés** | Option sur obligation, obligation *callable* et *puttable*, prix forward d'obligation, prix *clean* et *dirty*, volatilité de rendement, cap et floor de taux, tenor, caplet et floorlet, cap comme portefeuille d'options sur obligations, collar, volatilités *spot* et *flat*, bosse de volatilité, swaption, facteur d'annuité, cotations de courtiers, conventions de décompte des jours, DV01 et deltas de courbe |
| **Poids à l'examen** | $F_B=\dfrac{B_0-I}{P(0,T)}$ · $\sigma_B=D\,y_0\,\sigma_y$ · le **caplet** $L\delta_kP(0,t_{k+1})[F_kN(d_1)-R_KN(d_2)]$ · la **swaption** $LA[s_0N(d_1)-s_KN(d_2)]$ · **la parité cap = floor + swap**. |

## 🎯 Vue d'ensemble

```
POURQUOI LES TAUX SONT PLUS DURS QUE LES ACTIONS   quatre raisons
  1. le comportement d'UN taux est plus compliqué qu'un cours ou un change
  2. il faut souvent modéliser TOUTE LA COURBE zéro-coupon
  3. les volatilités DIFFÈRENT selon le point de la courbe
  4. les taux servent À ACTUALISER le dérivé ET À DÉFINIR SON PAYOFF

LES TROIS PRODUITS ET LEURS TROIS MODÈLES DE BLACK
  OPTION SUR OBLIGATION   on suppose le PRIX FORWARD D'OBLIGATION lognormal
        c = P(0,T)[F_B N(d₁) − K N(d₂)]        F_B = (B₀ − I)/P(0,T)
  CAP / FLOOR             on suppose chaque TAUX FORWARD lognormal
        caplet = Lδ_k P(0,t_{k+1})[F_k N(d₁) − R_K N(d₂)]     ⚠️ σ√t_k mais P(0,t_{k+1})
  SWAPTION                on suppose le TAUX DE SWAP FORWARD lognormal
        LA[s₀ N(d₁) − s_K N(d₂)]        A = (1/m) Σ P(0,T_i)

⚠️ CHAQUE MODÈLE EST COHÉRENT AVEC LUI-MÊME, MAIS PAS AVEC LES AUTRES
   prix lognormaux ⇒ taux NON lognormaux, et réciproquement

PARITÉ    cap = floor + swap          collar = cap long + floor court (coût nul)
VOLATILITÉS   spot (par caplet) contre flat (par cap) — la BOSSE vers 2-3 ans
```

**Les quatre raisons de la difficulté, énoncées d'entrée.** *Les dérivés de taux sont plus difficiles à valoriser que les dérivés actions et change parce que : **(1)** le comportement d'un taux individuel est **plus compliqué** que celui d'un cours d'action ou d'un taux de change ; **(2)** la valorisation de beaucoup de produits exige de développer un modèle décrivant le comportement de **TOUTE la courbe des taux zéro-coupon** ; **(3)** **les volatilités de différents points de la courbe sont différentes** ; **(4)** **les taux servent à ACTUALISER le dérivé aussi bien qu'à DÉFINIR SON PAYOFF**.*

## 🟠 Concept 1 — Les options sur obligations

### 1.1 Les options intégrées

> ***Une option sur obligation est une option d'acheter ou de vendre une obligation particulière à une date particulière pour un prix particulier.***

*En plus du gré à gré, **les options sur obligations sont fréquemment INTÉGRÉES aux obligations à l'émission**, pour les rendre plus attractives à l'émetteur ou aux acheteurs.*

| Produit | Option intégrée | Effet sur le rendement |
|---|---|---|
| **Obligation *callable*** | *le détenteur a **VENDU un CALL** à l'émetteur*. Le **prix de rappel** (*call price*) est le prix prédéterminé que l'émetteur doit payer | **rendements PLUS ÉLEVÉS** que les obligations sans clause |
| **Obligation *puttable*** | *le détenteur a **ACHETÉ un PUT** sur l'obligation, en plus de l'obligation elle-même* — il peut exiger un **remboursement anticipé** | **rendements PLUS FAIBLES** (l'option augmente la valeur pour le détenteur) |

<details class="details--riche">
<summary>

**Les quatre exemples d'options sur obligations cachées**

</summary>

**1 — L'échéancier d'un *callable* à 10 ans.** *Il peut n'y avoir **aucun privilège de rappel les 2 premières années** (la **période de *lockout***). Ensuite, l'émetteur peut racheter :*

| Années | Prix de rappel |
|---|---|
| 3 et 4 | **110** |
| 5 et 6 | **107,5** |
| 7 et 8 | **106** |
| 9 et 10 | **103** |

⚠️ ***Après le lockout, le prix de rappel est habituellement une fonction DÉCROISSANTE du temps.***

**2 — L'obligation *retractable*.** *Une obligation à 10 ans où le détenteur a le droit d'être remboursé **au bout de 5 ans**.*

**3 — Le dépôt à taux fixe rachetable.** *Un dépôt à 5 ans **remboursable sans pénalité à tout moment** contient un **PUT AMÉRICAIN sur obligation** : le dépôt est une obligation que l'investisseur a le droit de « rendre » à l'institution **à sa valeur faciale**, à tout moment.* Les **privilèges de remboursement anticipé** sur prêts et crédits hypothécaires sont de même **des CALLS sur obligations**.

**4 — L'engagement de prêt.** *Un **engagement de prêt** d'une banque **est un PUT sur obligation**. Si une banque cote un taux à 5 ans de **5 %** à un emprunteur potentiel en précisant que **le taux est valable 2 mois**, le client a en effet obtenu **le droit de VENDRE une obligation à 5 ans de coupon 5 % à l'institution, à sa valeur faciale, à tout moment dans les 2 mois**. **L'option sera exercée si les taux MONTENT.***

</details>

### 1.2 Le modèle de marché standard

> ***L'hypothèse : le PRIX FORWARD de l'obligation a une volatilité CONSTANTE $\sigma_B$.*** Cela permet d'utiliser le modèle de Black (fiche 99, §27.6).

$$\boxed{c=P(0,T)\big[F_BN(d_1)-KN(d_2)\big]}\;\text{(28.1)}$$

$$\boxed{p=P(0,T)\big[KN(-d_2)-F_BN(-d_1)\big]}\;\text{(28.2)}$$

$$d_1=\frac{\ln(F_B/K)+\sigma_B^2T/2}{\sigma_B\sqrt T}\qquad d_2=d_1-\sigma_B\sqrt T$$

**Le prix forward de l'obligation** *(fiche 78, §5.5)* :

$$\boxed{F_B=\frac{B_0-I}{P(0,T)}}\;\text{(28.3)}$$

où $B_0$ est le prix de l'obligation en 0 et $I$ **la valeur actuelle des coupons versés PENDANT la vie de l'option**.

> ⚠️ **Dans cette formule, le prix spot ET le prix forward sont des prix CASH (*dirty*), pas des prix cotés.**

**Le choix de $K$ — le piège classique** :

| Termes de l'option | Valeur de $K$ |
|---|---|
| Le strike est le **montant CASH** échangé à l'exercice | $K=$ ce prix d'exercice |
| **Le strike est le PRIX COTÉ** applicable à l'exercice (**le cas le plus courant**) | $K=$ prix d'exercice **PLUS LES INTÉRÊTS COURUS** à l'expiration de l'option |

> ***Les traders appellent le prix COTÉ d'une obligation le « CLEAN PRICE » et le prix CASH le « DIRTY PRICE ».***

<details class="details--riche">
<summary>

**Exemple 28.1 — les deux conventions de strike, entièrement recalculées**

</summary>

**Données.** Call européen à **10 mois** sur une obligation à **9,75 ans** de valeur faciale **1 000 dollars**. *(À maturité de l'option, l'obligation aura **8 ans et 11 mois** restants.)* Prix cash courant **960**, strike **1 000**, taux sans risque 10 mois **10 %**, volatilité du prix forward **9 %**. Coupon **10 % par an, semestriel** : paiements de **50 dollars** dans **3 mois** et **9 mois**. *(L'intérêt couru est donc **25 dollars** et le prix coté **935**.)* Taux à 3 mois et 9 mois : **9,0 %** et **9,5 %**.

*Étape 1 — la valeur actuelle des coupons :*

$$I=50e^{-0{,}25\times0{,}09}+50e^{-0{,}75\times0{,}095}=48{,}89+46{,}56=\mathbf{95{,}45}$$

*Étape 2 — le prix forward, par (28.3) :*

$$F_B=(960-95{,}45)\,e^{0{,}1\times0{,}8333}=864{,}55\times1{,}0870=\mathbf{939{,}68}$$

*Étape 3 — le facteur d'actualisation :*

$$P(0,T)=e^{-0{,}1\times10/12}=\mathbf{0{,}9200}$$

*Étape 4a — cas (a), strike = prix CASH.* $F_B=939{,}68$, $K=1\,000$, $P(0,T)=0{,}9200$, $\sigma_B=0{,}09$, $T=10/12$ :

$$\boxed{c=\mathbf{9{,}49\ \text{dollars}}}$$

*Étape 4b — cas (b), strike = prix COTÉ.* **Il faut ajouter UN MOIS d'intérêts courus** à $K$, parce que la maturité de l'option tombe **1 mois après une date de coupon** :

$$K=1\,000+100\times0{,}08333=\mathbf{1\,008{,}33}$$

Les autres paramètres sont inchangés :

$$\boxed{c=\mathbf{7{,}97\ \text{dollars}}}$$

> **La leçon :** un strike **coté** est en réalité un strike **cash plus élevé** ⇒ le call vaut **moins cher**. **Toujours lire la convention de strike avant de calculer.**

</details>

### 1.3 La volatilité du prix forward et la volatilité de rendement

<details class="details--riche">
<summary>

**La forme en cloche de l'écart-type — figure 28.1**

</summary>

*Comment l'écart-type du logarithme du prix d'une obligation évolue quand on regarde de plus en plus loin :*

| Instant | Écart-type | Raison |
|---|---|---|
| **Aujourd'hui** | **ZÉRO** | *il n'y a **aucune incertitude** sur le prix d'aujourd'hui* |
| Entre les deux | **augmente puis diminue** | — |
| **À la maturité de l'OBLIGATION** | **ZÉRO** | *on sait que **le prix égalera la valeur faciale** à maturité* |

**La volatilité à utiliser dans Black :**

$$\boxed{\sigma_B=\frac{\text{écart-type du logarithme du prix de l'obligation à la maturité de l'OPTION}}{\text{temps jusqu'à la maturité de l'option}}}$$

⚠️ **La conséquence (figure 28.2) :** *pour une obligation donnée, **$\sigma_B$ DÉCLINE quand la vie de l'option augmente***.

</details>

**Pourquoi le marché cote des VOLATILITÉS DE RENDEMENT.** *Les volatilités cotées pour les options sur obligations sont souvent des **volatilités de RENDEMENT** plutôt que de prix. **Le concept de DURATION est utilisé par le marché pour convertir l'une en l'autre.***

$$\frac{\Delta F_B}{F_B}\approx-D\,\Delta y_F=-Dy_F\,\frac{\Delta y_F}{y_F}\qquad\Longrightarrow\qquad\boxed{\sigma_B=D\,y_0\,\sigma_y}\;\text{(28.4)}$$

où $D$ est **la duration MODIFIÉE de l'obligation À LA MATURITÉ DE L'OPTION** et $y_0$ la valeur initiale du rendement forward.

**L'exemple de Hull.** *Duration modifiée à maturité **5 ans**, rendement forward **8 %**, volatilité de rendement cotée par un courtier **20 %** :*

$$\sigma_B=5\times0{,}08\times0{,}2=0{,}08=\mathbf{8\,\%\text{ par an}}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi les traders les préfèrent : la figure 28.2 montre que les volatilités de PRIX forward DÉPENDENT de l'option considérée. Les volatilités de RENDEMENT forward sont BEAUCOUP PLUS CONSTANTES.</span>

</div>

**Exemple 28.2** *(via DerivaGem)* : *put européen sur une obligation à 10 ans de principal 100, coupon 8 % semestriel ; vie de l'option **2,25 ans**, strike **115**, volatilité de rendement forward **20 %**, courbe zéro plate à **5 %** continu. Le prix coté de l'obligation est **122,82**. **Le prix de l'option vaut 2,36 quand le strike est un prix COTÉ, et 1,74 quand c'est un prix CASH.***

## 🔴 Concept 2 — Les caps et les floors de taux

### 2.1 Le mécanisme

**Le contexte.** *Un **billet à taux variable** (*floating-rate note*) dont le taux est réinitialisé périodiquement au LIBOR. **Le temps entre deux réinitialisations s'appelle le TENOR.***

> ***Un CAP est conçu pour fournir une assurance contre la hausse du taux du billet au-dessus d'un certain niveau, appelé le TAUX DU CAP (cap rate).***

<details class="details--riche">
<summary>

**L'exemple chiffré du cap à 5 ans**

</summary>

**Données.** Principal **10 millions de dollars**, tenor **3 mois**, vie **5 ans**, taux du cap **4 %** *(exprimé en composition trimestrielle puisque les paiements sont trimestriels)*.

*Situation à une date de réinitialisation où le LIBOR 3 mois est **5 %** :*

| Sans cap | Avec cap |
|---|---|
| $0{,}25\times0{,}05\times10\,000\,000=\mathbf{125\,000}$ | $0{,}25\times0{,}04\times10\,000\,000=\mathbf{100\,000}$ |

$$\text{Payoff du cap}=\mathbf{25\,000\ \text{dollars}}$$

> ⚠️ ***Le payoff ne survient PAS à la date de réinitialisation où les 5 % sont observés : il survient TROIS MOIS PLUS TARD. Cela reflète le décalage habituel entre l'observation d'un taux et le paiement correspondant.***

**Le décompte des dates.** ***Les caps sont habituellement définis de sorte que le LIBOR INITIAL, même s'il dépasse le taux du cap, ne donne PAS lieu à un payoff à la première date.*** Sur 5 ans avec un tenor trimestriel :

- **19 dates de réinitialisation** : 0,25 · 0,50 · 0,75 · … · **4,75** ans ;
- **19 payoffs potentiels** : 0,50 · 0,75 · 1,00 · … · **5,00** ans.

</details>

### 2.2 Les deux lectures d'un cap

**Lecture 1 — un portefeuille d'options sur TAUX.** Avec des dates de réinitialisation $t_1,\dots,t_n$ et $t_{n+1}=T$, et $R_k$ le LIBOR pour $[t_k,t_{k+1}]$ **observé en $t_k$** :

$$\boxed{\text{Payoff en }t_{k+1}=L\,\delta_k\max(R_k-R_K,\ 0)}\;\text{(28.5)}\qquad\delta_k=t_{k+1}-t_k$$

> ***C'est le payoff d'un CALL sur le taux LIBOR observé en $t_k$, versé en $t_{k+1}$. Le cap est un portefeuille de $n$ telles options, appelées CAPLETS.***

<details class="details--riche">
<summary>

**Lecture 2 — un portefeuille de PUTS sur obligations zéro-coupon**

</summary>

*Étape 1 — ramener le payoff en $t_k$.* Le payoff (28.5), reçu en $t_{k+1}$, vaut **en $t_k$** :

$$\frac{L\delta_k}{1+R_k\delta_k}\max(R_k-R_K,\ 0)$$

*Étape 2 — quelques lignes d'algèbre.* Cela se réduit à :

$$\boxed{\max\!\left(L-\frac{L(1+R_K\delta_k)}{1+R_k\delta_k},\ 0\right)}\;\text{(28.6)}$$

*Étape 3 — reconnaître l'objet.* L'expression $\dfrac{L(1+R_K\delta_k)}{1+R_k\delta_k}$ est **la valeur en $t_k$ d'une obligation zéro-coupon versant $L(1+R_K\delta_k)$ en $t_{k+1}$**.

*Étape 4 — la conclusion.*

> ⚠️ ***(28.6) est le payoff d'un PUT de maturité $t_k$ sur une obligation zéro-coupon de maturité $t_{k+1}$, de valeur faciale $L(1+R_K\delta_k)$ et de strike $L$. UN CAP DE TAUX EST DONC UN PORTEFEUILLE DE PUTS EUROPÉENS SUR OBLIGATIONS ZÉRO-COUPON.***

</details>

### 2.3 Floors et collars

| Instrument | Payoff en $t_{k+1}$ | Nature |
|---|---|---|
| **Cap** | $L\delta_k\max(R_k-R_K,0)$ | portefeuille de **calls sur taux** = portefeuille de **PUTS sur obligations** |
| **Floor** | $L\delta_k\max(R_K-R_k,0)$ | portefeuille de **puts sur taux** = portefeuille de **CALLS sur obligations**. Chaque option est un ***floorlet*** |
| **Collar** *(ou* floor-ceiling agreement*)* | — | ***cap LONG + floor COURT***. *Habituellement construit de sorte que **le prix du cap égale initialement celui du floor** : **le coût d'entrée est alors NUL*** |

<details class="details--riche">
<summary>

**Business Snapshot 28.1 — la parité put-call des caps et floors**

</summary>

$$\boxed{\text{Valeur du cap}=\text{Valeur du floor}+\text{Valeur du swap}}$$

*Dans cette relation, **le cap et le floor ont le MÊME strike $R_K$**. Le swap est un accord de **recevoir le LIBOR et payer le fixe $R_K$**, **sans échange de paiements à la première date de réinitialisation**. Les trois instruments ont **la même vie et la même fréquence de paiements**.*

**La démonstration.** *Considérons un **cap long combiné à un floor court** :*

| Situation | Cap | Floor court | Total |
|---|---|---|---|
| LIBOR $>R_K$ | $\text{LIBOR}-R_K$ | 0 | $\text{LIBOR}-R_K$ |
| LIBOR $<R_K$ | 0 | $-(R_K-\text{LIBOR})$ | $\text{LIBOR}-R_K$ |

*Il y a donc un flux de $\text{LIBOR}-R_K$ **dans toutes les circonstances** : **c'est le flux du swap**.*

⚠️ **Pourquoi un swap NON STANDARD.** *Les swaps sont habituellement structurés de sorte que **le LIBOR à la date 0 détermine un paiement à la première date**. **Les caps et floors sont structurés de sorte qu'il n'y a AUCUN payoff à la première date.** C'est pourquoi la parité fait intervenir **un swap non standard sans paiement à la première date**.*

</details>

### 2.4 La valorisation

$$\boxed{\text{caplet}=L\,\delta_k\,P(0,t_{k+1})\big[F_kN(d_1)-R_KN(d_2)\big]}\;\text{(28.7)}$$

$$\boxed{\text{floorlet}=L\,\delta_k\,P(0,t_{k+1})\big[R_KN(-d_2)-F_kN(-d_1)\big]}\;\text{(28.8)}$$

$$d_1=\frac{\ln(F_k/R_K)+\sigma_k^2t_k/2}{\sigma_k\sqrt{t_k}}\qquad d_2=d_1-\sigma_k\sqrt{t_k}$$

où $F_k$ est **le taux forward en 0 pour la période $[t_k,t_{k+1}]$** et $\sigma_k$ sa volatilité.

> ⚠️ **LE POINT DE VIGILANCE ABSOLU, à savoir énoncer.** *La volatilité $\sigma_k$ est multipliée par $\sqrt{t_k}$ **parce que le taux $R_k$ est OBSERVÉ en $t_k$**, mais **le facteur d'actualisation est $P(0,t_{k+1})$ parce que LE PAYOFF EST EN $t_{k+1}$, pas en $t_k$**.
>
> **DEUX DATES DIFFÉRENTES DANS LA MÊME FORMULE.**

<details class="details--riche">
<summary>

**Exemple 28.3 — un caplet, ligne par ligne**

</summary>

**Données.** Contrat plafonnant le LIBOR sur **10 millions** à **8 %** (composition trimestrielle) pour **3 mois commençant dans 1 an**. Courbe LIBOR/swap plate à **7 %** en composition trimestrielle, volatilité du taux forward **20 %**.

*Étape 1 — le taux continu équivalent :*

$$r_c=4\ln\!\left(1+\frac{0{,}07}{4}\right)=\mathbf{6{,}9395\,\%}$$

*Étape 2 — les paramètres.* $F_k=0{,}07$, $\delta_k=0{,}25$, $L=10$ (millions), $R_K=0{,}08$, $t_k=1{,}0$, $t_{k+1}=1{,}25$, $\sigma_k=0{,}20$ et

$$P(0,t_{k+1})=e^{-0{,}069395\times1{,}25}=\mathbf{0{,}9169}$$

*Étape 3 — les deux quantiles :*

$$d_1=\frac{\ln(0{,}07/0{,}08)+0{,}2^2\times1/2}{0{,}20\times1}=\frac{-0{,}13353+0{,}02}{0{,}20}=\mathbf{-0{,}5677}$$

$$d_2=d_1-0{,}20=\mathbf{-0{,}7677}$$

*Étape 4 — le prix (en millions) :*

$$0{,}25\times10\times0{,}9169\big[0{,}07\,N(-0{,}5677)-0{,}08\,N(-0{,}7677)\big]=\mathbf{0{,}005162}$$

$$\boxed{\text{soit }\mathbf{5\,162\ \text{dollars}}}$$

</details>

### 2.5 Volatilités *spot* contre *flat*, et la bosse

| Type | Définition | Maturité concernée |
|---|---|---|
| **Volatilités *SPOT*** | une volatilité **DIFFÉRENTE pour chaque caplet** (ou floorlet) | la maturité **du caplet** |
| **Volatilités *FLAT*** | **la MÊME volatilité pour tous les caplets** d'un cap donné, mais **variant selon la vie du cap** | la maturité **du cap** |

> ⚠️ ***Les volatilités cotées sur le marché sont habituellement les volatilités FLAT. Cependant beaucoup de traders aiment estimer les volatilités SPOT, parce que cela leur permet d'identifier les caplets SOUS- et SUR-évalués.***
>
> *Les puts (calls) sur futures eurodollar sont **très similaires** aux caplets (floorlets) : les volatilités spot des caplets sur LIBOR 3 mois sont fréquemment comparées à celles issues des prix de futures eurodollar.*

**La bosse de volatilité (figure 28.3).** *Les volatilités flat sont **comme des moyennes cumulées** des spot et présentent donc **moins de variabilité**. **Une « BOSSE » est habituellement observée, avec un pic vers le point 2 à 3 ANS.** Elle est observée **à la fois** dans les volatilités implicites **et** dans celles calculées sur données historiques.*

<details class="details--riche">
<summary>

**L'explication possible de la bosse, et la table de cotations**

</summary>

> ⚠️ ***Il n'y a pas d'accord général sur la raison de l'existence de la bosse.*** *Une explication possible : les taux **au bout court** de la courbe sont **contrôlés par les banques centrales** ; par contraste, les taux à **2 et 3 ans** sont largement déterminés par **l'activité des traders**, qui **peuvent SURRÉAGIR aux changements du taux court**, rendant leur volatilité supérieure à celle des taux courts. **Au-delà de 2-3 ans, le RETOUR À LA MOYENNE des taux (chapitre 30) fait décliner les volatilités.***

**Table 28.1 — cotations *flat* implicites typiques de courtiers, caps et floors en dollars (% par an)** *(tenor 3 mois, instruments « à la monnaie », c'est-à-dire taux du cap = taux du swap de mêmes dates de paiement)* :

| Vie | Cap *bid* | Cap *offer* | Floor *bid* | Floor *offer* |
|---|---|---|---|---|
| 1 an | 18,00 | 20,00 | 18,00 | 20,00 |
| **2 ans** | 23,25 | 24,25 | 23,75 | 24,75 |
| **3 ans** | **24,00** | **25,00** | **24,50** | **25,50** |
| 4 ans | 23,75 | 24,75 | 24,25 | 25,25 |
| 5 ans | 23,50 | 24,50 | 24,00 | 25,00 |
| 7 ans | 21,75 | 22,75 | 22,00 | 23,00 |
| 10 ans | 20,00 | 21,00 | 20,25 | 21,25 |

**La bosse est visible : maximum à 3 ans, déclin ensuite.**

</details>

### 2.6 La justification théorique

<details class="details--riche">
<summary>

**Pourquoi (28.7) est intérieurement cohérent — les deux résultats du chapitre 27**

</summary>

*On considère un monde **forward risque-neutre par rapport à une obligation zéro-coupon maturant en $t_{k+1}$**. Le chapitre 27 (fiche 99) donne :*

| # | Résultat | Équation |
|---|---|---|
| **1** | *la valeur courante de tout titre est **sa valeur espérée en $t_{k+1}$ dans ce monde, multipliée par le prix d'une obligation maturant en $t_{k+1}$*** | (27.20) |
| **2** | *la valeur espérée d'un taux courant entre $t_k$ et $t_{k+1}$ **ÉGALE LE TAUX FORWARD** dans ce monde* | (27.22) |

*Étape 1 — appliquer le résultat 1 :*

$$L\delta_kP(0,t_{k+1})\,E_{k+1}\big[\max(R_k-R_K,0)\big]\;\text{(28.9)}$$

*Étape 2 — supposer $R_k$ LOGNORMALE* avec $\ln R_k$ d'écart-type $\sigma_k\sqrt{t_k}$ (volatilité constante du taux forward). L'annexe du chapitre 14 donne :

$$L\delta_kP(0,t_{k+1})\big[E_{k+1}(R_k)N(d_1)-R_KN(d_2)\big]$$

*Étape 3 — appliquer le résultat 2 :*

$$\boxed{E_{k+1}(R_k)=F_k}$$

*Étape 4 — conclusion.*

> ⚠️ ***On peut ACTUALISER AU TAUX DE MATURITÉ $t_{k+1}$ OBSERVÉ SUR LE MARCHÉ AUJOURD'HUI, POURVU QU'ON POSE LE TAUX ESPÉRÉ ÉGAL AU TAUX FORWARD.***

</details>

### 2.7 L'impact des conventions de décompte des jours

*Si le taux du cap $R_K$ est exprimé en **actual/360** (la norme américaine), **l'intervalle $\delta_k$ des formules doit être remplacé par $a_k$, la fraction d'accroissement** entre $t_k$ et $t_{k+1}$.*

**L'exemple.** *Si $t_k$ est le **1ᵉʳ mai** et $t_{k+1}$ le **1ᵉʳ août**, il y a **92 jours** : $a_k=92/360=\mathbf{0{,}2556}$.* Le taux forward $F_k$ doit alors être exprimé en actual/360, donc résoudre :

$$1+a_kF_k=\frac{P(0,t_k)}{P(0,t_{k+1})}$$

> *L'impact est **à peu près le même** que : calculer $\delta_k$ en **actual/actual**, convertir $R_K$ d'actual/360 en actual/actual, et calculer $F_k$ en actual/actual en résolvant $1+\delta_kF_k=\dfrac{P(0,t_k)}{P(0,t_{k+1})}$.*

## 🔴 Concept 3 — Les swaptions européennes

### 3.1 Le produit

> ***Les swaptions donnent au détenteur LE DROIT D'ENTRER dans un swap de taux donné, à une date future donnée.***

<details class="details--riche">
<summary>

**L'exemple d'usage, et la comparaison avec le swap forward**

</summary>

**L'exemple.** *Une entreprise sait que **dans 6 mois** elle entrera dans un prêt à taux variable de **5 ans** et voudra **échanger le variable contre du fixe**. Elle peut, **à un coût**, entrer dans une swaption lui donnant le droit de **recevoir le LIBOR 6 mois et payer un taux fixe de 8 %** pour 5 ans, **commençant dans 6 mois**.*

| Ce qui arrive dans 6 mois | Décision |
|---|---|
| Le taux de swap 5 ans est **inférieur** à 8 % | **ne pas exercer** — entrer dans un swap normal |
| Le taux de swap 5 ans est **supérieur** à 8 % | **exercer** — obtenir un swap à des conditions **plus favorables que le marché** |

> ***Les swaptions fournissent aux entreprises la GARANTIE que le taux fixe qu'elles paieront sur un prêt futur NE DÉPASSERA PAS UN CERTAIN NIVEAU.***

**Swaption contre swap forward (*deferred swap*).**

|  | **Swap forward** | **Swaption** |
|---|---|---|
| Coût initial | **aucun** | un **coût** (la prime) |
| Inconvénient | **OBLIGE** l'entreprise à entrer dans le swap | — |
| Avantage | — | ***bénéficier des mouvements FAVORABLES tout en acquérant une protection contre les DÉFAVORABLES*** |

> ***La différence est analogue à celle entre une OPTION de change et un CONTRAT FORWARD sur devise.***

**Business Snapshot 28.2 — swaptions et options sur obligations.**

*Un swap peut être vu comme un accord d'**échanger une obligation à taux fixe contre une obligation à taux variable**. **Au départ d'un swap, la valeur de l'obligation variable ÉGALE TOUJOURS LE PRINCIPAL.** Une swaption peut donc être vue comme **une option d'échanger une obligation à taux fixe contre le principal du swap — c'est-à-dire un TYPE D'OPTION SUR OBLIGATION**.*

| Swaption | Option sur obligation équivalente |
|---|---|
| Droit de **PAYER fixe** et recevoir variable | un **PUT** sur l'obligation à taux fixe, de strike **égal au principal** |
| Droit de **PAYER variable** et recevoir fixe | un **CALL** sur l'obligation à taux fixe, de strike **égal au principal** |

</details>

### 3.2 La valorisation

**Le payoff.** *Si le taux de swap $n$ ans démarrant en $T$ se révèle être $s_T$, la comparaison des flux montre que le payoff consiste en **une SÉRIE de flux** :*

$$\boxed{\frac{L}{m}\max(s_T-s_K,\ 0)\qquad\text{reçus }m\text{ fois par an pendant }n\text{ ans}}$$

> ⚠️ **LA DIFFÉRENCE CONCEPTUELLE AVEC UN CAP, à savoir énoncer.** ***Alors qu'un CAP est un PORTEFEUILLE D'OPTIONS sur des taux, une SWAPTION est UNE OPTION UNIQUE sur le taux de swap, AVEC DES PAYOFFS RÉPÉTÉS.***

$$\boxed{\text{Payer fixe}\ :\ \sum_{i=1}^{mn}\frac Lm P(0,T_i)\big[s_0N(d_1)-s_KN(d_2)\big]=LA\big[s_0N(d_1)-s_KN(d_2)\big]}\;\text{(28.10)}$$

$$\boxed{\text{Recevoir fixe}\ :\ LA\big[s_KN(-d_2)-s_0N(-d_1)\big]}\;\text{(28.11)}$$

$$\boxed{A=\frac1m\sum_{i=1}^{mn}P(0,T_i)}\qquad d_1=\frac{\ln(s_0/s_K)+\sigma^2T/2}{\sigma\sqrt T}\qquad d_2=d_1-\sigma\sqrt T$$

où $s_0$ est **le taux de swap FORWARD en 0** (calculé comme en (27.23)) et $\sigma$ **la volatilité du taux de swap forward**.

> ⚠️ ***$\sigma$ est multipliée par $\sqrt T$ (la maturité de l'OPTION), et $A$ est le facteur d'actualisation des $mn$ payoffs.***

<details class="details--riche">
<summary>

**Exemple 28.4 — une swaption 5×3, recalculée**

</summary>

**Données.** Courbe LIBOR plate à **6 %** continu. Swaption donnant le droit de **payer 6,2 %** dans un swap de **3 ans démarrant dans 5 ans**. Volatilité du taux de swap forward **20 %**. Paiements **semestriels**, principal **100 millions**.

*Étape 1 — le facteur d'annuité.* Les six dates de paiement sont 5,5 · 6,0 · 6,5 · 7,0 · 7,5 · 8,0 :

$$A=\tfrac12\big(e^{-0{,}33}+e^{-0{,}36}+e^{-0{,}39}+e^{-0{,}42}+e^{-0{,}45}+e^{-0{,}48}\big)=\mathbf{2{,}0035}$$

*Étape 2 — convertir le taux.* **6 % continu se traduit en 6,09 % SEMESTRIEL** :

$$s_0=2\big(e^{0{,}03}-1\big)=\mathbf{0{,}0609}$$

*Étape 3 — les paramètres.* $s_K=0{,}062$, $T=5$, $\sigma=0{,}2$ :

$$d_1=\frac{\ln(0{,}0609/0{,}062)+0{,}2^2\times5/2}{0{,}2\sqrt5}=\frac{-0{,}01790+0{,}10}{0{,}4472}=\mathbf{0{,}1836}$$

$$d_2=d_1-0{,}2\sqrt5=\mathbf{-0{,}2636}$$

*Étape 4 — la valeur, en millions :*

$$100\times2{,}0035\times\big[0{,}0609\,N(0{,}1836)-0{,}062\,N(-0{,}2636)\big]=\boxed{\mathbf{2{,}07\ \text{millions de dollars}}}$$

</details>

### 3.3 Cotations, justification théorique et décompte des jours

**Table 28.2 — cotations typiques de courtiers, swaptions européennes en dollars (volatilités mid-market, % par an)** *(instruments « à la monnaie » : strike = taux de swap forward)* :

| Expiration | 1 an | 2 | 3 | 4 | 5 | 7 | 10 |
|---|---|---|---|---|---|---|---|
| 1 mois | 17,75 | 17,75 | 17,75 | 17,50 | 17,00 | 17,00 | 16,00 |
| 3 mois | 19,50 | 19,00 | 19,00 | 18,00 | 17,50 | 17,00 | 16,00 |
| 6 mois | 20,00 | 20,00 | 19,25 | 18,50 | 18,75 | 17,75 | 16,75 |
| **1 an** | **22,50** | **21,75** | 20,50 | 20,00 | 19,50 | 18,25 | 16,75 |
| **2 ans** | 22,00 | **22,00** | 20,75 | 19,50 | 19,75 | 18,25 | 16,75 |
| 3 ans | 21,50 | 21,00 | 20,00 | 19,25 | 19,00 | 17,75 | 16,50 |
| 4 ans | 20,75 | 20,25 | 19,25 | 18,50 | 18,25 | 17,50 | 16,00 |
| 5 ans | 20,00 | 19,50 | 18,50 | 17,75 | 17,50 | 17,00 | 15,50 |

⚠️ ***Les volatilités de la colonne « 1 an » présentent une bosse similaire à celle des caps.** Quand on va vers les colonnes de swaps plus longs, **la bosse persiste mais devient MOINS PRONONCÉE**.*

<details class="details--riche">
<summary>

**La justification théorique et les conventions de jours**

</summary>

*On considère un monde **forward risque-neutre par rapport à l'ANNUITÉ $A$**. Le chapitre 27 donne :*

| # | Résultat |
|---|---|
| **1** | *la valeur courante de tout titre est **la valeur courante de l'annuité multipliée par l'espérance de $\dfrac{\text{prix du titre en }T}{\text{valeur de l'annuité en }T}$*** (27.25) |
| **2** | *l'espérance du taux de swap en $T$ dans ce monde **ÉGALE LE TAUX DE SWAP FORWARD*** (27.24) |

*Étape 1 :* la valeur de la swaption est $LA\,E_A\big[\max(s_T-s_K,0)\big]$.

*Étape 2 :* par l'annexe du chapitre 14, cela vaut $LA\big[E_A(s_T)N(d_1)-s_KN(d_2)\big]$.

*Étape 3 :* le second résultat donne $E_A(s_T)=s_0$, d'où (28.10).

> ⚠️ ***Ils montrent qu'on peut TRAITER LES TAUX COMME CONSTANTS pour les besoins de l'actualisation, POURVU QU'ON POSE LE TAUX DE SWAP ESPÉRÉ ÉGAL AU TAUX DE SWAP FORWARD.***

**Les conventions de décompte des jours.** *Le taux fixe est exprimé en actual/365, 30/360, etc. En posant $T_0=T$ et $a_i$ la fraction d'accroissement entre $T_{i-1}$ et $T_i$ (par exemple **1ᵉʳ mars → 1ᵉʳ septembre en actual/365 : $a_i=184/365=\mathbf{0{,}5041}$**), les formules restent correctes avec :*

$$\boxed{A=\sum_{i=1}^{mn}a_i\,P(0,T_i)}\qquad\text{et}\qquad\boxed{s_0A=P(0,T)-P(0,T_{mn})}$$

</details>

## 🔴 Concept 4 — Les généralisations et l'incohérence mutuelle

> ⚠️ **LE POINT LE PLUS IMPORTANT DU CHAPITRE.**
>
> ***« Nous avons présenté TROIS versions différentes du modèle de Black : une pour les options sur obligations, une pour les caps, une pour les swaptions. CHACUN DES MODÈLES EST INTÉRIEUREMENT COHÉRENT, MAIS ILS NE SONT PAS COHÉRENTS ENTRE EUX. »***
>
> ***Quand les prix futurs d'obligations sont lognormaux, les taux zéro et les taux de swap NE le sont PAS ; quand les taux zéro sont lognormaux, les prix d'obligations et les taux de swap NE le sont PAS.***

**Les trois généralisations** :

| # | Instrument | Règle |
|---|---|---|
| **1** | payoff en $T$ dépendant de **la valeur d'une OBLIGATION observée en $T$** | sa valeur est $P(0,T)\times$ le payoff espéré, **dans un monde où le prix espéré de l'obligation égale son PRIX FORWARD** |
| **2** | payoff en $T^\ast$ dépendant du **TAUX observé en $T$ pour la période $[T,T^\ast]$** | sa valeur est $P(0,T^\ast)\times$ le payoff espéré, **dans un monde où le taux espéré égale le TAUX FORWARD** |
| **3** | payoff sous forme d'**ANNUITÉ**, dont la taille est déterminée en $T$ comme fonction du taux de swap $n$ ans en $T$, l'annuité durant $n$ ans avec les mêmes dates que le swap | sa valeur est $A\times$ le payoff espéré par an, avec (a) $A$ la valeur courante de l'annuité **au taux de 1 dollar par an** et (b) l'espérance prise **dans un monde où le taux de swap futur espéré égale le TAUX DE SWAP FORWARD** |

*La première généralise le modèle des options sur obligations ; la deuxième celui des caps/floors ; la troisième celui des swaptions.*

## 🟠 Concept 5 — La couverture des dérivés de taux

### 5.1 Les quatre mesures de delta

> ***Dans le contexte des dérivés de taux, le RISQUE DELTA est le risque associé à un DÉPLACEMENT DE LA COURBE ZÉRO. Comme il y a de NOMBREUSES façons dont la courbe peut se déplacer, DE NOMBREUX DELTAS peuvent être calculés.***

| # | Méthode | Nom |
|---|---|---|
| **1** | l'impact d'un déplacement **parallèle de 1 point de base** de la courbe zéro | le ***DV01*** |
| **2** | l'impact de **petites variations des COTATIONS de chacun des instruments** servant à construire la courbe zéro | — |
| **3** | découper la courbe (zéro ou forward) en **sections (*buckets*)** et déplacer les taux **d'un seul bucket** de 1 pb, le reste inchangé | *bucketing* |
| **4** | mener une **ACP** (fiche 93, §21.9) et calculer un delta par rapport à chacun des premiers facteurs — *le premier mesure un déplacement approximativement **parallèle**, le deuxième une **torsion**, etc.* | — |

> ⚠️ ***En pratique, LES TRADERS PRÉFÈRENT LA DEUXIÈME APPROCHE. Ils soutiennent que la SEULE façon dont la courbe zéro peut changer est si la cotation d'un des instruments servant à la calculer change. Il leur semble donc sensé de se concentrer sur les expositions issues des changements de prix de CES instruments.***

### 5.2 Gammas et vegas

**Le problème de l'explosion combinatoire.** *Si **10 instruments** servent à calculer la courbe zéro et qu'on calcule des deltas pour chacun, le gamma est une dérivée seconde $\partial^2\Pi/\partial x_i\partial x_j$ : il y a **10 choix pour $x_i$ et 10 pour $x_j$**, soit **55 mesures de gamma différentes**. **Ce peut être une « SURCHARGE D'INFORMATION ».***

| Remède | Contenu |
|---|---|
| **1** | **ignorer les gammas croisés** et se concentrer sur les **10** dérivées avec $i=j$ |
| **2** | calculer **UNE seule** mesure : la dérivée seconde par rapport à un **déplacement parallèle** |
| **3** | calculer les gammas par rapport aux **deux premiers facteurs d'une ACP** |

**Le vega.** *Une approche : calculer l'impact d'un **même petit changement des volatilités de Black de TOUS les caps et swaptions**. **Mais cela suppose qu'UN SEUL facteur pilote toutes les volatilités et peut être trop simpliste.** **Une meilleure idée : mener une ACP sur les volatilités des caps et swaptions et calculer des vegas correspondant aux 2 ou 3 premiers facteurs.***

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| « option sur une obligation », coupons pendant la vie de l'option | $F_B=\dfrac{B_0-I}{P(0,T)}$, puis (28.1)/(28.2) |
| « le strike est le prix COTÉ » | **ajouter les intérêts courus** à $K$ |
| « volatilité de rendement de $x$ % » | $\sigma_B=Dy_0\sigma_y$ **avant tout calcul** |
| « plafonner le LIBOR à $R_K$ » | **caplet** : (28.7), avec $\sqrt{t_k}$ et $P(0,t_{k+1})$ |
| « plancher », « floorlet » | (28.8) |
| « collar à coût nul » | prix du cap = prix du floor |
| « cap et floor de même strike » | **parité** cap = floor + swap (non standard) |
| « volatilité flat » cotée | la **même** pour tous les caplets d'un cap donné |
| « droit d'entrer dans un swap » | **swaption** : (28.10)/(28.11), calculer $A$ d'abord |
| « payer fixe » / « recevoir fixe » | call / put sur le taux de swap → **put / call** sur l'obligation fixe |
| Taux donné en composition continue | **convertir** dans la fréquence des paiements |
| « actual/360 » ou « 30/360 » | remplacer $\delta_k$ par $a_k$ et recalculer $F_k$ |
| « quel delta calculer ? » | DV01 · cotations · buckets · **ACP** |

## Comment résoudre ce type d'exercice

**A — Une option sur obligation.**

1. Calculer $I$ = **valeur actuelle des coupons versés PENDANT la vie de l'option** (pas au-delà).
2. $F_B=\dfrac{B_0-I}{P(0,T)}$, avec $B_0$ le prix **CASH**.
3. Lire la convention de strike ; si le strike est **coté**, ajouter les intérêts courus **à la maturité de l'option**.
4. Si l'on donne une volatilité de **rendement**, convertir : $\sigma_B=Dy_0\sigma_y$.
5. Appliquer $c=P(0,T)[F_BN(d_1)-KN(d_2)]$.

**B — Un caplet.**

1. Identifier $t_k$ (**observation**) et $t_{k+1}$ (**paiement**) ; $\delta_k=t_{k+1}-t_k$.
2. Convertir la courbe en composition **continue** pour obtenir $P(0,t_{k+1})$.
3. Exprimer $F_k$ et $R_K$ **dans la même fréquence de composition que le tenor**.
4. $d_1=\dfrac{\ln(F_k/R_K)+\sigma_k^2t_k/2}{\sigma_k\sqrt{t_k}}$ — **$t_k$, pas $t_{k+1}$**.
5. Multiplier par $L\delta_kP(0,t_{k+1})$.
6. Contrôle : un cap est la **somme** des caplets, chacun valorisé **séparément**.

**C — Une swaption.**

1. Lister les $mn$ dates de paiement $T_i$ du swap sous-jacent.
2. $A=\frac1m\sum P(0,T_i)$ (ou $\sum a_iP(0,T_i)$ avec les conventions).
3. Calculer $s_0$ **dans la fréquence des paiements** (convertir depuis le continu !).
4. $d_1=\dfrac{\ln(s_0/s_K)+\sigma^2T/2}{\sigma\sqrt T}$ — **$T$ = maturité de l'OPTION**, pas du swap.
5. Valeur $=LA[s_0N(d_1)-s_KN(d_2)]$ pour un payeur de fixe.
6. Contrôle : la parité **payeur $-$ receveur $=$ swap forward**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Utiliser le prix **coté** dans (28.3) | $B_0$ et $F_B$ sont des prix **CASH (*dirty*)** |
| Inclure dans $I$ des coupons versés **après** la maturité de l'option | seulement ceux versés **pendant** sa vie |
| Oublier d'ajouter les intérêts courus à un strike **coté** | ici $1\,000\to\mathbf{1\,008{,}33}$, et le prix passe de 9,49 à **7,97** |
| Utiliser une volatilité de rendement telle quelle | convertir par $\sigma_B=Dy_0\sigma_y$ |
| Croire que $\sigma_B$ est stable selon les options | **non** — elle **décline** quand la vie de l'option augmente ; ce sont les volatilités de **rendement** qui sont stables |
| Croire que le payoff du cap survient à la **date de réinitialisation** | il survient **un tenor plus tard** |
| Compter un payoff à la **première** date de réinitialisation | **les caps n'en versent PAS** |
| Utiliser $\sqrt{t_{k+1}}$ dans $d_1$ | c'est $\sqrt{t_k}$ — **le taux est OBSERVÉ en $t_k$** |
| Actualiser à $P(0,t_k)$ | c'est $P(0,t_{k+1})$ — **le payoff est en $t_{k+1}$** |
| Confondre volatilité *spot* et *flat* | *spot* = par **caplet** ; *flat* = par **cap** |
| Utiliser une volatilité flat pour identifier des caplets mal évalués | il faut passer par les **spot** |
| Traiter une swaption comme un portefeuille d'options | c'est **UNE option** avec des **payoffs répétés** |
| Utiliser $\sqrt{T_{\text{swap}}}$ dans une swaption | c'est $\sqrt T$, la maturité de **l'OPTION** |
| Utiliser un taux continu comme $s_0$ | convertir : 6 % continu $\to$ **6,09 %** semestriel |
| Croire les trois modèles mutuellement cohérents | ***ils ne le sont PAS*** |
| Se contenter d'un delta unique pour un livre de taux | il y a **quatre** familles de mesures ; les traders préfèrent la **deuxième** |
| Calculer les 55 gammas | **surcharge d'information** — ignorer les croisés ou passer par l'ACP |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Les quatre difficultés** | comportement d'un taux · toute la **courbe** · volatilités **différentes** · taux servant à **actualiser ET définir le payoff** |
| **Callable** | le détenteur a **VENDU un CALL** → rendements **plus élevés** |
| **Puttable** | le détenteur a **ACHETÉ un PUT** → rendements **plus faibles** |
| **Lockout** | la période initiale **sans rappel possible** |
| **Engagement de prêt** | un **PUT sur obligation** |
| **Prépaiement de crédit** | un **CALL sur obligation** |
| **Modèle standard obligation** | prix **forward** de l'obligation **lognormal** |
| **Formule call** | $P(0,T)[F_BN(d_1)-KN(d_2)]$ |
| **Prix forward** | $F_B=\dfrac{B_0-I}{P(0,T)}$ |
| **Prix employés** | **CASH**, pas cotés |
| **Clean / dirty** | prix **coté** / prix **cash** |
| **Strike coté** | ajouter les **intérêts courus** |
| **Exemple 28.1** | $I=95{,}45$, $F_B=939{,}68$, $P=0{,}9200$ → **9,49** puis **7,97** |
| **Écart-type du log du prix** | **nul aujourd'hui**, **nul à maturité de l'obligation**, cloche entre les deux |
| **$\sigma_B$ et la vie de l'option** | elle **DÉCLINE** |
| **Volatilité de rendement** | $\sigma_B=D\,y_0\,\sigma_y$ |
| **L'exemple** | $5\times0{,}08\times0{,}2=\mathbf{8\,\%}$ |
| **Pourquoi les traders les préfèrent** | elles sont **beaucoup plus constantes** |
| **Exemple 28.2** | prix coté 122,82 → option **2,36** (strike coté) ou **1,74** (strike cash) |
| **Tenor** | le temps entre deux **réinitialisations** |
| **Payoff du cap** | $L\delta_k\max(R_k-R_K,0)$ **en $t_{k+1}$** |
| **Cap 5 ans, tenor 3 mois** | **19** réinitialisations, **19** payoffs |
| **Cap = ?** | portefeuille de **calls sur taux** = portefeuille de **PUTS sur obligations zéro-coupon** |
| **Le put équivalent** | maturité $t_k$, sous-jacent maturant en $t_{k+1}$, faciale $L(1+R_K\delta_k)$, strike $L$ |
| **Floor = ?** | portefeuille de **puts sur taux** = **CALLS sur obligations** |
| **Collar** | cap **long** + floor **court**, **coût nul** |
| **Parité** | $\text{cap}=\text{floor}+\text{swap}$ (swap **non standard**) |
| **Caplet** | $L\delta_kP(0,t_{k+1})[F_kN(d_1)-R_KN(d_2)]$ |
| **Les deux dates** | $\sqrt{t_k}$ dans $d_1$ · $P(0,t_{k+1})$ dans le facteur |
| **Exemple 28.3** | $P=0{,}9169$, $d_1=-0{,}5677$, $d_2=-0{,}7677$ → **5 162 dollars** |
| **Volatilités spot** | une par **caplet** |
| **Volatilités flat** | une par **cap** — **ce que le marché cote** |
| **La bosse** | pic vers **2-3 ans** ; pas d'explication consensuelle |
| **Explication proposée** | banques centrales au court · **surréaction des traders** à 2-3 ans · **retour à la moyenne** au-delà |
| **Justification du modèle de cap** | numéraire $P(t,t_{k+1})$ : $E_{k+1}(R_k)=F_k$ |
| **Actual/360** | $a_k=92/360=0{,}2556$ ; $1+a_kF_k=\dfrac{P(0,t_k)}{P(0,t_{k+1})}$ |
| **Swaption** | droit d'**entrer dans un swap** à une date future |
| **Contre swap forward** | le forward **oblige** ; la swaption **coûte** mais laisse le choix |
| **Payer fixe = ?** | un **PUT** sur l'obligation fixe, strike = **principal** |
| **Recevoir fixe = ?** | un **CALL** sur l'obligation fixe |
| **Payoff** | $\frac Lm\max(s_T-s_K,0)$, reçu $mn$ fois |
| **Nature** | **UNE option** à payoffs **répétés** (contre un **portefeuille** pour le cap) |
| **Formule payeur** | $LA[s_0N(d_1)-s_KN(d_2)]$ |
| **Annuité** | $A=\frac1m\sum_{i=1}^{mn}P(0,T_i)$ |
| **Exemple 28.4** | $A=2{,}0035$, $s_0=6{,}09\,\%$, $d_1=0{,}1836$ → **2,07 millions** |
| **Justification du modèle de swaption** | numéraire $A$ : $E_A(s_T)=s_0$ |
| **Avec les conventions** | $A=\sum a_iP(0,T_i)$ et $s_0A=P(0,T)-P(0,T_{mn})$ |
| **L'incohérence mutuelle** | prix lognormaux ⇒ taux **non** lognormaux, et réciproquement |
| **Généralisation 1** | payoff sur **obligation** → $P(0,T)\times$ espérance au **prix forward** |
| **Généralisation 2** | payoff sur **taux** → $P(0,T^\ast)\times$ espérance au **taux forward** |
| **Généralisation 3** | payoff en **annuité** → $A\times$ espérance au **taux de swap forward** |
| **Les quatre deltas** | **DV01** · cotations des instruments · **buckets** · **ACP** |
| **Ce que préfèrent les traders** | la **deuxième** approche |
| **Le problème des gammas** | **55** mesures avec 10 instruments |
| **Le vega bien fait** | une **ACP** sur les volatilités de caps et swaptions |

## 🧠 Active Recall

1. Citer les quatre raisons pour lesquelles les dérivés de taux sont plus difficiles à valoriser.
2. Définir une option sur obligation. Pourquoi sont-elles souvent intégrées ?
3. Qu'est-ce qu'une obligation *callable* ? Qui a vendu quoi à qui ?
4. Pourquoi les *callable* offrent-elles des rendements plus élevés ?
5. Décrire l'échéancier de rappel du *callable* à 10 ans de Hull.
6. Qu'est-ce qu'une obligation *puttable* ? Une obligation *retractable* ?
7. Pourquoi un dépôt à 5 ans remboursable contient-il un put américain ?
8. Pourquoi un engagement de prêt est-il un put sur obligation ? Quand est-il exercé ?
9. Quelle hypothèse le modèle standard fait-il pour les options sur obligations ?
10. Écrire (28.1) et (28.2) avec leurs $d_1$ et $d_2$.
11. Écrire (28.3). Quels coupons entrent dans $I$ ?
12. Les prix employés sont-ils cotés ou cash ?
13. Comment choisir $K$ selon la convention de strike ?
14. Que signifient *clean price* et *dirty price* ?
15. Refaire l'exemple 28.1 en entier, les deux cas.
16. Pourquoi le prix baisse-t-il de 9,49 à 7,97 ?
17. Décrire la forme de l'écart-type du logarithme du prix. Pourquoi est-il nul aux deux bouts ?
18. Écrire la définition de $\sigma_B$ à utiliser.
19. Comment $\sigma_B$ varie-t-elle avec la vie de l'option ?
20. Dériver (28.4) à partir de la duration.
21. Que vaut $\sigma_B$ pour $D=5$, $y_0=8\,\%$, $\sigma_y=20\,\%$ ?
22. Pourquoi les traders préfèrent-ils les volatilités de rendement ?
23. Rappeler les deux prix de l'exemple 28.2 et la différence entre eux.
24. Qu'est-ce que le tenor ? Le taux du cap ?
25. Refaire l'exemple 5 % / 4 % sur 10 millions.
26. Quand le payoff survient-il ? Pourquoi ce décalage ?
27. Combien de réinitialisations et de payoffs pour un cap 5 ans à tenor trimestriel ?
28. Écrire (28.5). Qu'est-ce qu'un caplet ?
29. Dériver la seconde lecture : le cap comme portefeuille de puts sur obligations.
30. Quels sont la maturité, la faciale et le strike de ces puts ?
31. Écrire le payoff d'un floor. À quoi équivaut-il en termes d'obligations ?
32. Qu'est-ce qu'un collar ? Pourquoi son coût est-il nul ?
33. Énoncer et démontrer la parité cap-floor-swap.
34. Pourquoi le swap de la parité est-il non standard ?
35. Écrire (28.7) et (28.8).
36. Quelles sont les DEUX dates différentes qui apparaissent, et pourquoi ?
37. Refaire l'exemple 28.3 en entier.
38. Distinguer volatilités spot et flat. Lesquelles le marché cote-t-il ?
39. Pourquoi les traders estiment-ils quand même les spot ?
40. À quels instruments d'échange les caplets se comparent-ils ?
41. Décrire la bosse de volatilité. Où est son pic ?
42. Quelle explication possible Hull donne-t-il, en trois segments de maturité ?
43. Que signifie « à la monnaie » pour un cap ?
44. Justifier théoriquement (28.7) par les deux résultats du chapitre 27.
45. Quelle est la conclusion sur l'actualisation ?
46. Comment traiter une convention actual/360 ?
47. Qu'est-ce qu'une swaption ? Détailler l'exemple de l'entreprise à 6 mois.
48. Comparer swaption et swap forward sur trois points.
49. À quelle analogie de change Hull fait-il appel ?
50. Pourquoi une swaption est-elle un type d'option sur obligation ?
51. Quel type d'option sur obligation correspond à « payer fixe » ? à « recevoir fixe » ?
52. Écrire le payoff d'une swaption payeuse.
53. Quelle est la différence conceptuelle entre un cap et une swaption ?
54. Écrire (28.10) et (28.11), avec $A$.
55. Que multiplie-t-on par $\sqrt T$ ? Quel $T$ ?
56. Refaire l'exemple 28.4 en entier.
57. Pourquoi doit-on convertir 6 % continu en 6,09 % ?
58. Décrire la forme de la table 28.2. Que devient la bosse pour les swaps longs ?
59. Justifier théoriquement (28.10) par les deux résultats du chapitre 27.
60. Comment les conventions de jours modifient-elles $A$ et $s_0$ ?
61. Énoncer l'incohérence mutuelle des trois modèles.
62. Énoncer les trois généralisations.
63. Qu'est-ce que le risque delta pour un dérivé de taux ?
64. Citer les quatre façons de calculer un delta. Qu'est-ce que le DV01 ?
65. Laquelle les traders préfèrent-ils, et pourquoi ?
66. Combien de gammas avec 10 instruments ? Citer les trois remèdes.
67. Quelle est l'approche naïve du vega, et son défaut ?
68. Quelle est la meilleure approche ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les taux servent à quoi, doublement ? | **Actualiser** le dérivé **ET** définir son **payoff** |
| Obligation callable ? | Le détenteur a **VENDU un CALL** à l'émetteur |
| Son effet sur le rendement ? | Rendements **PLUS ÉLEVÉS** |
| Période de lockout ? | Les premières années **sans rappel possible** |
| Évolution du prix de rappel ? | **Décroissant** dans le temps |
| Obligation puttable ? | Le détenteur a **ACHETÉ un PUT** |
| Son effet sur le rendement ? | Rendements **PLUS FAIBLES** |
| Obligation retractable ? | Un *puttable* remboursable à une **date unique** |
| Dépôt remboursable sans pénalité ? | Un **PUT AMÉRICAIN** sur obligation |
| Prépaiement de crédit ? | Un **CALL** sur obligation |
| Engagement de prêt ? | Un **PUT** sur obligation |
| Quand est-il exercé ? | Si les taux **MONTENT** |
| Hypothèse du modèle standard obligation ? | Le **prix FORWARD** est **lognormal** |
| Formule du call ? | $P(0,T)[F_BN(d_1)-KN(d_2)]$ |
| Prix forward de l'obligation ? | $F_B=\dfrac{B_0-I}{P(0,T)}$ |
| Que contient $I$ ? | La VA des coupons versés **pendant la vie de l'option** |
| Quels prix employer ? | Les prix **CASH (dirty)** |
| Clean price ? | Le prix **COTÉ** |
| Dirty price ? | Le prix **CASH** |
| Si le strike est coté ? | **Ajouter les intérêts courus** |
| Ex. 28.1 : $I$ ? | **95,45** |
| Ex. 28.1 : $F_B$ ? | **939,68** |
| Ex. 28.1 : $P(0,T)$ ? | **0,9200** |
| Ex. 28.1 : strike cash ? | **9,49 dollars** |
| Ex. 28.1 : strike coté ? | $K=1\,008{,}33$ → **7,97 dollars** |
| Écart-type du log aujourd'hui ? | **ZÉRO** |
| À maturité de l'obligation ? | **ZÉRO** aussi |
| Pourquoi ? | Le prix **égale la valeur faciale** |
| $\sigma_B$ quand la vie de l'option augmente ? | Elle **DÉCLINE** |
| Conversion rendement → prix ? | $\sigma_B=D\,y_0\,\sigma_y$ |
| Que représente $D$ ? | La duration **modifiée à la maturité de l'option** |
| $D=5$, $y_0=8\,\%$, $\sigma_y=20\,\%$ ? | $\sigma_B=\mathbf{8\,\%}$ |
| Pourquoi les traders préfèrent le rendement ? | Ces volatilités sont **beaucoup plus constantes** |
| Ex. 28.2 : les deux prix ? | **2,36** (coté) et **1,74** (cash) |
| Tenor ? | Le temps entre deux **réinitialisations** |
| Cap rate ? | Le niveau au-dessus duquel le cap **assure** |
| LIBOR 5 %, cap 4 %, 10 M, trimestre ? | Payoff de **25 000 dollars** |
| Quand le payoff survient-il ? | **Un tenor plus tard** |
| Y a-t-il un payoff à la 1ʳᵉ date ? | **NON** |
| Cap 5 ans, tenor 3 mois ? | **19** réinitialisations, **19** payoffs |
| Payoff d'un caplet ? | $L\delta_k\max(R_k-R_K,0)$ |
| Un cap est un portefeuille de ? | **Calls sur taux** = **PUTS sur obligations** |
| Maturité du put équivalent ? | $t_k$ |
| Maturité de son sous-jacent ? | $t_{k+1}$ |
| Sa faciale ? | $L(1+R_K\delta_k)$ |
| Son strike ? | $L$ |
| Un floor est un portefeuille de ? | **Puts sur taux** = **CALLS sur obligations** |
| Collar ? | Cap **long** + floor **court** |
| Son coût habituel ? | **ZÉRO** |
| Parité cap-floor ? | $\text{cap}=\text{floor}+\text{swap}$ |
| Le swap y est-il standard ? | **NON** — pas de paiement à la 1ʳᵉ date |
| Formule du caplet ? | $L\delta_kP(0,t_{k+1})[F_kN(d_1)-R_KN(d_2)]$ |
| Quelle racine dans $d_1$ ? | $\sqrt{t_k}$ — le taux est **OBSERVÉ** en $t_k$ |
| Quel facteur d'actualisation ? | $P(0,t_{k+1})$ — le **payoff** est en $t_{k+1}$ |
| Ex. 28.3 : taux continu ? | **6,9395 %** |
| Ex. 28.3 : $P(0,1{,}25)$ ? | **0,9169** |
| Ex. 28.3 : $d_1$ et $d_2$ ? | $-0{,}5677$ et $-0{,}7677$ |
| Ex. 28.3 : le prix ? | **5 162 dollars** |
| Volatilité spot ? | **Une par caplet** |
| Volatilité flat ? | **Une par cap** |
| Laquelle le marché cote-t-il ? | La **FLAT** |
| Pourquoi estimer les spot ? | Repérer les caplets **mal évalués** |
| Comparaison de marché ? | Les options sur **futures eurodollar** |
| Où est le pic de la bosse ? | Vers **2 à 3 ans** |
| Bosse observée où ? | Dans les implicites **ET** les historiques |
| Explication du bout court ? | Les taux sont **contrôlés par les banques centrales** |
| Explication à 2-3 ans ? | **Surréaction des traders** |
| Explication au-delà ? | Le **RETOUR À LA MOYENNE** |
| « À la monnaie » pour un cap ? | Taux du cap = **taux du swap** de mêmes dates |
| Numéraire justifiant le modèle de cap ? | L'obligation **$P(t,t_{k+1})$** |
| Le résultat employé ? | $E_{k+1}(R_k)=F_k$ |
| La conclusion sur l'actualisation ? | Actualiser au **taux de marché $t_{k+1}$** suffit |
| Actual/360, mai → août ? | $92/360=\mathbf{0{,}2556}$ |
| Comment recalculer $F_k$ ? | $1+a_kF_k=\dfrac{P(0,t_k)}{P(0,t_{k+1})}$ |
| Swaption ? | Le **DROIT d'entrer** dans un swap futur |
| Coût d'un swap forward ? | **Aucun** |
| Son inconvénient ? | Il **OBLIGE** à entrer dans le swap |
| Analogie de change ? | Option contre **contrat forward** |
| Valeur de la jambe variable au départ ? | Le **principal** |
| Payer fixe = ? | Un **PUT** sur l'obligation fixe |
| Recevoir fixe = ? | Un **CALL** sur l'obligation fixe |
| Strike de ces options ? | Le **PRINCIPAL** |
| Payoff d'une swaption payeuse ? | $\frac Lm\max(s_T-s_K,0)$, $mn$ fois |
| Cap contre swaption ? | **Portefeuille d'options** contre **UNE option à payoffs répétés** |
| Formule payeur ? | $LA[s_0N(d_1)-s_KN(d_2)]$ |
| Formule receveur ? | $LA[s_KN(-d_2)-s_0N(-d_1)]$ |
| Facteur d'annuité ? | $A=\frac1m\sum_{i=1}^{mn}P(0,T_i)$ |
| Quel $T$ dans $d_1$ ? | La maturité de **l'OPTION** |
| Ex. 28.4 : $A$ ? | **2,0035** |
| Ex. 28.4 : $s_0$ ? | **6,09 %** semestriel |
| Ex. 28.4 : $d_1$ et $d_2$ ? | $0{,}1836$ et $-0{,}2636$ |
| Ex. 28.4 : la valeur ? | **2,07 millions de dollars** |
| Numéraire justifiant les swaptions ? | Le **facteur d'ANNUITÉ $A$** |
| Le résultat employé ? | $E_A(s_T)=s_0$ |
| $A$ avec les conventions de jours ? | $\sum a_iP(0,T_i)$ |
| $s_0$ avec les conventions ? | $s_0A=P(0,T)-P(0,T_{mn})$ |
| Les trois modèles sont-ils cohérents entre eux ? | **NON** |
| Pourquoi ? | Prix lognormaux ⇒ **taux non lognormaux** |
| Généralisation 1 ? | Payoff sur **obligation** → prix **forward** |
| Généralisation 2 ? | Payoff sur **taux** → taux **forward** |
| Généralisation 3 ? | Payoff en **annuité** → taux de **swap forward** |
| Risque delta de taux ? | Le risque d'un **déplacement de la courbe zéro** |
| Qu'est-ce que le DV01 ? | L'impact d'un déplacement **parallèle de 1 pb** |
| Les quatre méthodes ? | DV01 · **cotations** · buckets · **ACP** |
| Celle que préfèrent les traders ? | La **deuxième** (cotations des instruments) |
| Leur argument ? | La courbe ne change que si **une cotation** change |
| Combien de gammas avec 10 instruments ? | **55** |
| Les trois remèdes ? | Ignorer les **croisés** · un gamma **parallèle** · l'**ACP** |
| Défaut du vega naïf ? | Il suppose **UN SEUL facteur** de volatilité |
| La meilleure approche ? | Une **ACP** sur les volatilités de caps et swaptions |
