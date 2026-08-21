# Fiche 84 — Stratégies de négociation avec options

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 11 « Trading Strategies Involving Options » |
| **Difficulté** | High — mécanique, très payante à l'examen |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Fiches 82, 83 (parité call-put) |
| **Concepts clés** | Note à capital protégé, call couvert, put protecteur, *bull* et *bear spread*, *box spread*, papillon, spread calendaire, spread diagonal, *straddle*, *strip*, *strap*, *strangle*, réplication d'un payoff quelconque |
| **Poids à l'examen** | **Dresser le tableau des payoffs par intervalle** puis en déduire le profit · reconnaître qu'une position action + option **est** une option (parité) · l'arbitrage du **box spread** et son piège américain. |

## 🎯 Vue d'ensemble

```
AVEC L'ACTION   couvrir un call ≈ VENDRE un put   ·   put protecteur ≈ ACHETER un call
SPREADS         2 options de MÊME TYPE
  bull   acheter K₁, vendre K₂ (K₁<K₂)      bear   acheter K₂, vendre K₁
  box    bull call + bear put  →  payoff CERTAIN K₂ − K₁
  papillon  +1 en K₁, −2 en K₂, +1 en K₃    calendaire  même K, échéances différentes
COMBINAISONS    calls ET puts
  straddle  call + put même K       strangle  put K₁ + call K₂  (K₁<K₂)
  strip     1 call + 2 puts         strap     2 calls + 1 put
UNIVERSALITÉ    une somme de papillons étroits approche N'IMPORTE QUEL payoff
```

⚠️ **Convention du chapitre.** *On suit la pratique usuelle : le profit d'une stratégie est le **payoff final moins le coût initial, sans actualisation**.* Sur les figures, **le pointillé** montre le profit de chaque titre pris isolément, **le trait plein** celui du portefeuille entier.

## 🟡 Concept 1 — La note à capital protégé

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Produit destiné aux investisseurs conservateurs : le rendement dépend de la performance d'une action, d'un indice ou d'un autre actif risqué, mais **le principal initial n'est pas à risque**.*

</div>

<details class="details--riche">
<summary>

**Exercice résolu — construire la note, puis démonter sa rentabilité (exemple 11.1)**

</summary>

**Données.** Taux 3 ans **6 %** continu. Portefeuille d'actions valant **1 000**, rendement du dividende **1,5 %**.

*Étape 1 — combien coûte la garantie du principal ?*

$$1\,000e^{-0{,}06\times3}=\mathbf{835{,}27}\ \text{deviendra }1\,000\ \text{en 3 ans}$$

*Étape 2 — ce qui reste pour l'option.* $1\,000-835{,}27=\mathbf{164{,}73}$. *Étape 3 — le montage.* Une banque offre pour **1 000** : **(a)** une obligation zéro-coupon 3 ans de principal 1 000 et **(b)** un **call européen à la monnaie** 3 ans sur le portefeuille. *(Vérifiable : le call coûte moins de 164,73 si la volatilité est inférieure à environ **15 %**.)* *Étape 4 — les deux scénarios.* Si le portefeuille **monte**, l'investisseur reçoit ce que 1 000 investis dans le portefeuille seraient devenus — *parce que l'obligation paie 1 000 et que c'est exactement le strike de l'option*. S'il **baisse**, l'option est sans valeur mais l'obligation rend les **1 000** initiaux. *Étape 5 — ce que l'investisseur perd vraiment.* *Le pire qui puisse arriver est qu'il **perde la chance de gagner les intérêts, ou d'autres revenus comme les dividendes**, sur son investissement initial pendant la vie de la note.*

**Est-ce une bonne affaire ?** *Une banque intègre **toujours** un profit : l'obligation plus le call coûtent **toujours moins de 1 000**. De plus l'investisseur prend le **risque que la banque ne puisse pas payer** à maturité — **certains particuliers ont perdu de l'argent sur des notes à capital protégé créées par Lehman Brothers quand elle a fait faillite en 2008**.*

⚠️ **Mais la conclusion n'est pas univoque.** *L'investisseur ferait parfois mieux d'acheter l'option lui-même et de placer le reste sans risque. **Ce n'est cependant pas toujours le cas** : il subira des **spreads bid-offer plus larges** que la banque sur l'option et gagnera des **taux d'intérêt plus faibles**. Il est donc possible que la banque **crée de la valeur pour l'investisseur tout en réalisant un profit**.*

**Du point de vue de la banque — la viabilité tient à deux variables.**

| Changement | Fonds disponibles pour l'option | Coût du call | Viable ? |
|---|---|---|---|
| $r=6\,\%$, $\sigma=15\,\%$ | **164,73** | $<164{,}73$ | **oui** |
| $r=3\,\%$ | $1\,000-1\,000e^{-0{,}09}=\mathbf{86{,}07}$ | ≈ **119** | **non** |
| $r=6\,\%$, $\sigma=25\,\%$ | 164,73 | ≈ **221** | **non** |

**Les cinq façons de rendre la structure rentable.** *Relever le **strike** (le portefeuille doit monter de 15 % avant tout gain) · **plafonner** le rendement (cela revient à créer un **bull spread** pour l'investisseur) · faire dépendre le rendement du **prix moyen** plutôt que du prix final · spécifier une **barrière désactivante** · **allonger la durée**.*

**L'allongement de la durée, chiffré** (à $r=3\,\%$, $\sigma=15\,\%$, dividende 1,5 %) :

| Durée | Fonds disponibles | Coût du call | Marge |
|---|---|---|---|
| 3 ans | $1\,000-1\,000e^{-0{,}09}=86{,}07$ | ≈ 119 | **négative** |
| 10 ans | $1\,000-1\,000e^{-0{,}30}=\mathbf{259{,}18}$ | ≈ 217 | **positive** |
| 20 ans | $1\,000-1\,000e^{-0{,}60}=\mathbf{451{,}19}$ | ≈ 281 | **encore plus positive** |

⚠️ **La variable critique cachée : le rendement du dividende.** *Plus il est élevé, plus le produit est rentable pour la banque. **Si le rendement du dividende était nul, la note ne pourrait être rentable pour la banque, quelle que soit sa durée**.* Cela découle directement de la borne $c\ge S_0-Ke^{-rT}$ (fiche 83) : sans dividende, le call à la monnaie coûte **au moins** $S_0-Ke^{-rT}$, c'est-à-dire **exactement** les fonds disponibles.

</details>

## 🔴 Concept 2 — Option et action : quatre positions qui sont des options déguisées

| Figure | Composition | Nom | Équivalent |
|---|---|---|---|
| (a) | **long action + short call** | ***call couvert*** (*covered call*) | **short put** |
| (b) | short action + long call | inverse du call couvert | **long put** |
| (c) | **long put + long action** | ***put protecteur*** (*protective put*) | **long call** |
| (d) | short put + short action | inverse du put protecteur | **short call** |

> **Le call couvert, dit par Hull.** *La position longue en action « **couvre** » ou protège l'investisseur du payoff sur le call court, qui devient nécessaire en cas de forte hausse du cours.*

**La démonstration en une ligne — par la parité.** Avec dividendes :

$$p+S_0=c+Ke^{-rT}+D\;\text{(11.1)}$$

| Réécriture | Lecture |
|---|---|
| $p+S_0=c+(Ke^{-rT}+D)$ | **put protecteur** $=$ **long call** $+$ liquidités → même profil que (c) |
| $S_0-c=(Ke^{-rT}+D)-p$ | **call couvert** $=$ **short put** $+$ liquidités → même profil que (a) |

⚠️ **Le « + liquidités » ne change pas la *forme* du profil, seulement son *niveau*.** C'est pourquoi les figures ont **la même allure** que celles du chapitre 9, translatées verticalement. Les positions (b) et (d) sont les **inverses** de (a) et (c), d'où les deux autres équivalences.

## 🔴 Concept 3 — Les spreads verticaux

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Un **spread** consiste à prendre position sur **deux options ou plus du même type*** (deux calls, ou deux puts).

</div>

### 3.1 *Bull spread* — parier sur la hausse, des deux côtés bornée

**Avec des calls :** acheter $K_1$, vendre $K_2$, avec $K_1<K_2$, **même échéance**. *Comme le prix d'un call **décroît toujours** avec le strike, l'option vendue vaut toujours moins que celle achetée : un bull spread par calls exige donc un **investissement initial**.*

| Intervalle | Long call $K_1$ | Short call $K_2$ | **Payoff total** |
|---|---|---|---|
| $S_T\le K_1$ | 0 | 0 | $\mathbf{0}$ |
| $K_1<S_T<K_2$ | $S_T-K_1$ | 0 | $\mathbf{S_T-K_1}$ |
| $S_T\ge K_2$ | $S_T-K_1$ | $-(S_T-K_2)$ | $\mathbf{K_2-K_1}$ |

> **La description économique.** *L'investisseur détient un call de strike $K_1$ et a **choisi de renoncer à une partie du potentiel de hausse** en vendant un call de strike $K_2$. **En échange de ce potentiel abandonné, il reçoit le prix de l'option de strike $K_2$.***

**Les trois degrés d'agressivité.**

| Type | Situation initiale | Caractère |
|---|---|---|
| **1** | les **deux** calls hors la monnaie | **le plus agressif** : *coûte très peu à mettre en place, faible probabilité d'un payoff relativement élevé* $(K_2-K_1)$ |
| **2** | un dans la monnaie, un hors | intermédiaire |
| **3** | les **deux** dans la monnaie | **le plus conservateur** |

<details class="details--riche">
<summary>

**Exercice résolu — bull spread par calls (exemple 11.2)**

</summary>

**Données.** Achat d'un call européen 3 mois $K=30$ pour **3** ; vente d'un call 3 mois $K=35$ pour **1**.

*Étape 1 — le coût.* $3-1=\mathbf{2}$. *Étape 2 — les payoffs par intervalle.* $0$ si $S_T\le30$ · $S_T-30$ si $30<S_T<35$ · $\mathbf{5}$ si $S_T\ge35$. *Étape 3 — retrancher le coût.*

| Intervalle | Profit |
|---|---|
| $S_T\le30$ | $\mathbf{-2}$ |
| $30<S_T<35$ | $\mathbf{S_T-32}$ |
| $S_T\ge35$ | $\mathbf{+3}$ |

*Étape 4 — le point mort.* $S_T=32$ — c'est $K_1$ plus le coût net.

</details>

**Avec des puts :** acheter le put $K_1$, vendre le put $K_2$. *Contrairement au bull spread par calls, celui-ci procure un **flux de trésorerie initial positif** (marges ignorées) et un payoff **négatif ou nul**.*

### 3.2 *Bear spread* — parier sur la baisse

**Avec des puts :** acheter $K_2$, vendre $K_1$, avec $K_1<K_2$. ***Le strike de l'option achetée est SUPÉRIEUR à celui de l'option vendue*** — l'inverse exact du bull spread. *Il implique une **sortie de trésorerie initiale**, le put vendu valant moins que le put acheté.*

| Intervalle | Long put $K_2$ | Short put $K_1$ | **Payoff total** |
|---|---|---|---|
| $S_T\le K_1$ | $K_2-S_T$ | $-(K_1-S_T)$ | $\mathbf{K_2-K_1}$ |
| $K_1<S_T<K_2$ | $K_2-S_T$ | 0 | $\mathbf{K_2-S_T}$ |
| $S_T\ge K_2$ | 0 | 0 | $\mathbf{0}$ |

<details class="details--riche">
<summary>

**Exercice résolu — bear spread par puts (exemple 11.3)**

</summary>

**Données.** Achat d'un put 3 mois $K=35$ pour **3** ; vente d'un put 3 mois $K=30$ pour **1**. Coût **2**.

| Intervalle | Payoff | **Profit** |
|---|---|---|
| $S_T\le30$ | 5 | $\mathbf{+3}$ |
| $30<S_T<35$ | $35-S_T$ | $\mathbf{33-S_T}$ |
| $S_T\ge35$ | 0 | $\mathbf{-2}$ |

⚠️ **Comparez avec l'exemple 11.2.** Mêmes strikes, mêmes primes, **profils exactement retournés**. C'est le bon réflexe de contrôle : un bear spread est un bull spread **lu de droite à gauche**.

</details>

**Avec des calls :** acheter le call $K_2$, vendre le call $K_1$ → **flux de trésorerie initial positif** (marges ignorées).

### 3.3 *Box spread* — un payoff certain, et un piège célèbre

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Combinaison d'un **bull call spread** $(K_1,K_2)$ et d'un **bear put spread** de **mêmes strikes**.

</div>

| Intervalle | Bull call spread | Bear put spread | **Total** |
|---|---|---|---|
| $S_T\le K_1$ | 0 | $K_2-K_1$ | $\mathbf{K_2-K_1}$ |
| $K_1<S_T<K_2$ | $S_T-K_1$ | $K_2-S_T$ | $\mathbf{K_2-K_1}$ |
| $S_T\ge K_2$ | $K_2-K_1$ | 0 | $\mathbf{K_2-K_1}$ |

$$\boxed{\text{payoff}=K_2-K_1\ \text{toujours}\quad\Longrightarrow\quad\text{valeur}=(K_2-K_1)e^{-rT}}$$

| Si le box est | Stratégie | Positions |
|---|---|---|
| **trop bon marché** | **acheter** le box | acheter call $K_1$, acheter put $K_2$, vendre call $K_2$, vendre put $K_1$ |
| **trop cher** | **vendre** le box | acheter call $K_2$, acheter put $K_1$, vendre call $K_1$, vendre put $K_2$ |

<details class="details--riche">
<summary>

**Exercice résolu — comment perdre de l'argent avec un box spread**

</summary>

**L'offre.** $S=50$, $\sigma=30\,\%$, pas de dividende, $r=8\,\%$. Un trader vous propose de **vendre** au CBOE un box spread 2 mois de strikes **55 et 60** pour **5,10**. Faut-il le faire ?

*Étape 1 — l'appât.* $K_2-K_1=5$, garanti dans 2 mois. Vendre pour **5,10** et placer les fonds semble laisser une marge confortable. **La valeur théorique** est

$$5e^{-0{,}08\times2/12}=\mathbf{4{,}93}$$

*Étape 2 — l'écueil.* ***Les options sur actions du CBOE sont AMÉRICAINES***, et le payoff de 5 suppose que les options du box sont **européennes**.

| Type | Strike | Prix **européen** | Prix **américain** |
|---|---|---|---|
| Call | 60 | 0,26 | 0,26 |
| Call | 55 | 0,96 | 0,96 |
| Put | 60 | 9,46 | **10,00** |
| Put | 55 | 5,23 | **5,44** |

*Étape 3 — le bull call spread.* $0{,}96-0{,}26=\mathbf{0{,}70}$ — *identique pour européennes et américaines, puisque le prix d'un call européen égale celui d'un call américain sans dividende* (fiche 83). *Étape 4 — le bear put spread.* Européen : $9{,}46-5{,}23=\mathbf{4{,}23}$. **Américain : $10{,}00-5{,}44=\mathbf{4{,}56}$.** *Étape 5 — les totaux.* Européen : $0{,}70+4{,}23=\mathbf{4{,}93}$ (la valeur théorique). **Américain : $0{,}70+4{,}56=\mathbf{5{,}26}$.** *Étape 6 — la réponse.* Vendre pour **5,10** un objet qui vaut **5,26** est **une mauvaise affaire**. *Vous vous en rendriez compte presque immédiatement : l'opération implique de **vendre un put de strike 60**, qui serait **exercé contre vous presque aussitôt** !*

⚠️ **La leçon.** *L'arbitrage du box spread ne fonctionne **qu'avec des options européennes**. Les traders inexpérimentés qui traitent des américaines comme des européennes **risquent de perdre de l'argent**.* Le coupable est toujours le **put profondément dans la monnaie**, seul instrument dont la prime américaine dépasse nettement l'européenne.

</details>

### 3.4 Papillon — parier sur l'immobilité

> **Construction.** Acheter un call $K_1$ **bas**, acheter un call $K_3$ **haut**, **vendre deux** calls $K_2$ **à mi-chemin** ($K_2=\frac{K_1+K_3}{2}$, généralement proche du cours). *Il donne un profit si le cours **reste proche de $K_2$**, et une **petite perte** en cas de mouvement important dans un sens ou dans l'autre. C'est donc une stratégie appropriée pour un investisseur qui juge les **grands mouvements improbables**. Elle exige un **petit investissement initial**.*

| Intervalle | Long $K_1$ | Long $K_3$ | Short 2×$K_2$ | **Total** |
|---|---|---|---|---|
| $S_T\le K_1$ | 0 | 0 | 0 | $\mathbf{0}$ |
| $K_1<S_T\le K_2$ | $S_T-K_1$ | 0 | 0 | $\mathbf{S_T-K_1}$ |
| $K_2<S_T<K_3$ | $S_T-K_1$ | 0 | $-2(S_T-K_2)$ | $\mathbf{K_3-S_T}$ |
| $S_T\ge K_3$ | $S_T-K_1$ | $S_T-K_3$ | $-2(S_T-K_2)$ | $\mathbf{0}$ |

*(Les deux dernières lignes utilisent $K_2=0{,}5(K_1+K_3)$.)*

<details class="details--riche">
<summary>

**Exercice résolu — le papillon chiffré**

</summary>

**Données.** Action à **61**. Calls européens 6 mois : $K=55$ à **10**, $K=60$ à **7**, $K=65$ à **5**. L'investisseur juge un mouvement significatif improbable.

*Étape 1 — la construction.* Acheter un call 55, acheter un call 65, **vendre deux** calls 60. *Étape 2 — le coût.*

$$10+5-(2\times7)=\mathbf{1}$$

*Étape 3 — les extrêmes.* Si $S_T>65$ ou $S_T<55$, le payoff total est **zéro** → **perte nette de 1**. *Étape 4 — le maximum.* Il est atteint en $S_T=60$ : payoff $=60-55=5$, profit $=5-1=\mathbf{4}$. *Étape 5 — les points morts.* Le profit est positif pour $S_T$ **entre 56 et 64**.

⚠️ **Papillon par puts : exactement la même chose.** *L'investisseur achète deux puts, un de strike bas et un de strike haut, et vend deux puts de strike intermédiaire.* Ici : acheter un put 55, un put 65, vendre deux puts 60. ***L'usage de puts produit exactement le même spread ; la parité call-put montre que l'investissement initial est le même dans les deux cas.***

**Vendre un papillon.** *Stratégie inverse : vendre les options de strikes $K_1$ et $K_3$, acheter deux options de strike $K_2$. Elle produit un **profit modeste s'il y a un mouvement significatif** du cours.*

</details>

### 3.5 Spreads calendaires et diagonaux

> **Spread calendaire.** *Les options ont le **même strike** et des **échéances différentes**.* On **vend** un call d'échéance courte et on **achète** un call de **maturité plus longue**, même strike. *Plus la maturité est longue, plus l'option est chère : un spread calendaire exige donc habituellement un **investissement initial**.*

⚠️ **Comment lire le diagramme.** *Les diagrammes de profit d'un spread calendaire sont produits de façon à montrer le profit **au moment où l'option courte expire**, en supposant que **l'option longue est dénouée à cet instant**.* Le profil ressemble à celui du papillon.

<details class="details--riche">
<summary>

**Pourquoi le profil du spread calendaire ressemble à un papillon**

</summary>

*Cas 1 — le cours est **très bas** à l'expiration de l'option courte.* L'option courte est **sans valeur** ; l'option longue vaut aussi **presque zéro**. L'investisseur subit une perte **proche du coût initial**. *Cas 2 — le cours $S_T$ est **très élevé**.* L'option courte coûte à l'investisseur $S_T-K$, et l'option longue vaut **presque exactement** $S_T-K$. Les deux se compensent : perte nette **proche du coût initial** à nouveau. *Cas 3 — $S_T$ est **proche de $K$**.* L'option courte coûte **peu ou rien**, *mais l'option longue est encore **assez précieuse*** — il lui reste de la valeur temps. **Profit net significatif.**

**Les trois variantes.** *Un spread calendaire **neutre** choisit un strike proche du cours ; un **haussier** un strike plus élevé ; un **baissier** un strike plus bas.*

**Avec des puts** : acheter le put de longue maturité, vendre celui de courte — **même allure**.

**Spread calendaire inverse.** *On achète l'option courte et on vend la longue : **petit profit** si le cours est **bien au-dessus ou bien en dessous** du strike à l'expiration de l'option courte, mais **perte significative** s'il en est proche.*

</details>

**La classification complète, en une phrase.** *Bull, bear et calendaires se créent tous d'un call long et d'un call court.* **Bull/bear** : strikes différents, **même échéance**. **Calendaire** : même strike, échéances différentes. **Diagonal** : *à la fois l'échéance **et** le strike diffèrent — ce qui **augmente la gamme des profils possibles**.*

## 🔴 Concept 4 — Les combinaisons

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Une **combinaison** prend position à la fois sur des **calls et des puts** du même sous-jacent.*

</div>

### 4.1 Le *straddle*

**Construction :** acheter un call **et** un put de **même strike et même échéance**.

| Intervalle | Call | Put | **Total** |
|---|---|---|---|
| $S_T\le K$ | 0 | $K-S_T$ | $\mathbf{K-S_T}$ |
| $S_T>K$ | $S_T-K$ | 0 | $\mathbf{S_T-K}$ |

*C'est-à-dire $|S_T-K|$.* *Il est approprié quand un investisseur **attend un grand mouvement mais ne sait pas dans quel sens**.*

<details class="details--riche">
<summary>

**Exercice résolu — le straddle chiffré**

</summary>

**Données.** Action à **69**, mouvement important attendu sur 3 mois. Call $K=70$ à **4**, put $K=70$ à **3** → investissement **7**.

| Cours final | Payoff | **Profit** |
|---|---|---|
| **69** | put vaut 1 | $1-7=\mathbf{-6}$ |
| **70** | 0 | $\mathbf{-7}$ — *le pire qui puisse arriver* |
| **90** | call vaut 20 | $20-7=\mathbf{+13}$ |
| **55** | put vaut 15 | $15-7=\mathbf{+8}$ |

*Étape de contrôle.* Les points morts sont $70\pm7$, soit **63** et **77**.

**Vocabulaire.** Cette position est un ***bottom straddle*** ou *straddle purchase*. Le ***top straddle*** ou *straddle write* est la position inverse — **vendre** call et put de mêmes strike et échéance. *C'est une stratégie **hautement risquée** : profit significatif si le cours finit proche du strike, mais **la perte due à un grand mouvement est illimitée**.*

</details>

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment gagner de l'argent en tradant des straddles — l'avertissement de Hull.</span>

⚠️ *Supposez qu'un grand mouvement soit attendu parce qu'il y a une OPA ou qu'un jugement majeur va être rendu. Faut-il trader un straddle ?*

*Le straddle semble naturel. **Mais si votre vision de la situation est à peu près la même que celle des autres participants, cette vision est déjà reflétée dans les prix des options.** Les options sur ce titre seront **nettement plus chères** que celles d'un titre similaire sans saut attendu. **Le profil en V se sera déplacé vers le bas**, de sorte qu'un mouvement **plus grand** sera nécessaire pour faire un profit.*

***Pour qu'un straddle soit efficace, vous devez croire que de grands mouvements sont probables ET que cette croyance diffère de celle de la plupart des autres investisseurs. Les prix de marché incorporent les croyances des participants. Pour gagner de l'argent avec n'importe quelle stratégie, vous devez avoir une vision différente du reste du marché — et avoir raison !***

</div>

### 4.2 *Strips*, *straps*, *strangles*

| Stratégie | Composition | Pari |
|---|---|---|
| **Strip** | **1 call + 2 puts**, même $K$, même échéance | grand mouvement, **baisse plus probable** |
| **Strap** | **2 calls + 1 put**, même $K$, même échéance | grand mouvement, **hausse plus probable** |
| **Strangle** (*bottom vertical combination*) | put $K_1$ + call $K_2$, avec $K_1<K_2$ | grand mouvement, **sens inconnu** |

**Payoff d'un strangle.**

| Intervalle | Call $K_2$ | Put $K_1$ | **Total** |
|---|---|---|---|
| $S_T\le K_1$ | 0 | $K_1-S_T$ | $\mathbf{K_1-S_T}$ |
| $K_1<S_T<K_2$ | 0 | 0 | $\mathbf{0}$ |
| $S_T\ge K_2$ | $S_T-K_2$ | 0 | $\mathbf{S_T-K_2}$ |

> **L'arbitrage straddle / strangle.** *Le cours doit bouger **davantage** dans un strangle que dans un straddle pour faire un profit. **Mais le risque de baisse, si le cours finit à une valeur centrale, est moindre avec un strangle.*** Et : *plus les strikes sont **écartés**, **moins** le risque de baisse est grand et **plus loin** le cours doit aller pour réaliser un profit.*

**La vente d'un strangle** s'appelle une ***top vertical combination***. *Elle convient à qui juge les grands mouvements improbables — mais, comme la vente d'un straddle, c'est une **stratégie risquée impliquant une perte potentielle illimitée**.*

## 🟠 Concept 5 — N'importe quel payoff est atteignable

> **Le théorème informel du chapitre.** ***Si des options européennes échéant en $T$ étaient disponibles pour absolument tous les strikes possibles, n'importe quelle fonction de payoff en $T$ pourrait en théorie être obtenue.***

**La démonstration par les papillons.** Le payoff d'un papillon est un **pic** (triangle) centré en $K_2$. *À mesure que $K_1$ et $K_3$ se rapprochent, le pic **devient plus étroit**. **Par une combinaison judicieuse d'un grand nombre de très petits pics, n'importe quelle fonction de payoff peut être approchée.***

⚠️ **C'est le résultat théorique le plus important du chapitre**, et il est rarement souligné : il signifie qu'un marché d'options **complet en strikes** est un marché **complet** tout court pour les payoffs terminaux. Il fonde la réplication statique d'options exotiques (chapitre 25) et la lecture de la densité risque-neutre à partir des prix d'options (fiche 70).

## Comment reconnaître le type d'exercice

| Signal | Stratégie | Signature |
|---|---|---|
| Deux options **du même type**, même échéance, $K_1<K_2$ | **bull** si on achète le **bas**, **bear** si on achète le **haut** | payoff **borné** des deux côtés |
| Quatre options, deux strikes | ***box*** | payoff **constant** $K_2-K_1$ |
| Trois strikes, $2$ options au milieu | **papillon** | pic en $K_2$ |
| Même strike, **deux échéances** | **calendaire** | profil en pic, calculé à l'expiration **courte** |
| Call **et** put, **même** strike | ***straddle*** | $\|S_T-K\|$ |
| Call **et** put, strikes **différents** | ***strangle*** | plat entre $K_1$ et $K_2$ |
| Deux puts pour un call | ***strip*** | pente **double à gauche** |
| Deux calls pour un put | ***strap*** | pente **double à droite** |
| Action **plus** une option | **déguisement** | utiliser la **parité** |

## Comment résoudre ce type d'exercice

**Protocole universel — 6 étapes.**

1. **Lister les strikes** par ordre croissant : ils découpent $[0,\infty)$ en intervalles.
2. Dresser un **tableau** : une ligne par intervalle, **une colonne par option**.
3. Remplir chaque case avec le payoff de **cette** option sur **cet** intervalle (attention aux signes des positions courtes).
4. **Sommer** en ligne → colonne « payoff total ».
5. **Retrancher le coût net initial** (primes payées moins primes reçues) → **profit**.
6. **Contrôler** : le profil doit être **continu** et **linéaire par morceaux**, avec un changement de pente **à chaque strike** égal au nombre net d'options qui s'y activent.

**Protocole reconnaissance d'une position déguisée — 3 étapes.**

1. Écrire la parité $p+S_0=c+Ke^{-rT}+D$.
2. **Isoler** la combinaison de l'énoncé d'un côté.
3. Lire l'autre côté : il donne l'option équivalente **plus une constante** (qui translate le profil sans en changer la forme).

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire qu'un bear spread s'obtient en achetant le strike **bas** | On achète le strike **haut** |
| Oublier que le bull spread par **puts** encaisse d'avance | Calls : **décaissement** · puts : **encaissement** |
| Négliger le coût initial en traçant le payoff | Le **payoff** ignore la prime, le **profit** la retranche |
| Arbitrer un box spread sur des **américaines** | Le put profondément ITM est **plus cher** : 5,26 contre 4,93 |
| Croire que le papillon par puts diffère de celui par calls | **Identiques** — la parité l'impose |
| Prendre $K_2\ne\frac{K_1+K_3}{2}$ pour un papillon standard | La symétrie est **supposée** dans le tableau des payoffs |
| Tracer un calendaire à l'échéance de l'option **longue** | On le trace à l'expiration de l'option **courte** |
| Confondre calendaire et diagonal | Calendaire : même $K$ · diagonal : $K$ **et** échéance diffèrent |
| Croire que le straddle gagne dès qu'il y a un saut | *Si votre vision est celle du marché, elle est **déjà dans les prix*** |
| Vendre un straddle en pensant borner sa perte | **Perte illimitée** en cas de grand mouvement |
| Croire qu'une note à capital protégé est sans risque | **Risque de crédit de l'émetteur** — cas Lehman 2008 |
| Croire que la banque gagne toujours à allonger la note | **Faux si le dividende est nul** — la borne $c\ge S_0-Ke^{-rT}$ l'interdit |

## 📌 Ultimate Review

**Les quatre déguisements.** Call couvert $\equiv$ short put · put protecteur $\equiv$ long call · et leurs inverses. Justification : $p+S_0=c+Ke^{-rT}+D$.

**Les spreads.**

| Stratégie | Construction | Payoff maximal | Flux initial |
|---|---|---|---|
| **Bull (calls)** | +$K_1$, −$K_2$ | $K_2-K_1$ | sortie |
| **Bull (puts)** | +$K_1$, −$K_2$ | $0$ | **entrée** |
| **Bear (puts)** | +$K_2$, −$K_1$ | $K_2-K_1$ | sortie |
| **Bear (calls)** | +$K_2$, −$K_1$ | $0$ | **entrée** |
| **Box** | bull call + bear put | $K_2-K_1$ **certain** | valeur $(K_2-K_1)e^{-rT}$ |
| **Papillon** | +$K_1$, −2$K_2$, +$K_3$ | $K_2-K_1$ | petite sortie |

**Les combinaisons.** Straddle $=|S_T-K|$ · strangle : plat entre les strikes · strip $=$ 1 call + 2 puts (baissier) · strap $=$ 2 calls + 1 put (haussier).

**Les chiffres du chapitre.** Note protégée : $1\,000e^{-0{,}18}=\mathbf{835{,}27}$, budget option **164,73** ; à 3 % : **86,07** (3 ans), **259,18** (10 ans), **451,19** (20 ans) · bull spread : coût 2, profit $-2$ / $S_T-32$ / $+3$ · bear spread : $+3$ / $33-S_T$ / $-2$ · papillon : coût **1**, profit max **4** en 60, positif entre **56 et 64** · box : théorique **4,93**, américain **5,26**, offre **5,10** → **refuser** · straddle : coût 7, pire cas **−7** en 70, points morts **63** et **77**.

**Le résultat universel.** Avec **tous** les strikes disponibles, une somme de **papillons étroits** approche **n'importe quel payoff terminal**.

## 🧠 Active Recall

<details><summary>Comment fabriquer une note à capital protégé, et qu'est-ce que l'investisseur perd réellement ?</summary>

**Une obligation zéro-coupon** de principal $P$ **plus un call à la monnaie** sur l'actif risqué, financé par la différence $P-Pe^{-rT}$. Si l'actif monte, le zéro-coupon rembourse $P$ — **exactement le strike** — et le call apporte la hausse ; s'il baisse, le call est nul et le zéro-coupon rend $P$.

L'investisseur perd *la chance de gagner les **intérêts**, ou d'autres revenus comme les **dividendes**, sur son investissement initial pendant la vie de la note* — plus le **profit intégré par la banque** et le **risque de crédit** de celle-ci (cas Lehman, 2008).

</details>

<details><summary>Pourquoi un call couvert a-t-il le profil d'un put vendu ?</summary>

Par la parité $p+S_0=c+Ke^{-rT}+D$, réécrite :

$$S_0-c=(Ke^{-rT}+D)-p$$

**Long action + short call** $=$ **short put** $+$ un montant fixe de liquidités. La constante **translate** le profil verticalement mais n'en change **pas la forme** — d'où l'allure identique.

</details>

<details class="details--riche">
<summary>

Un investisseur achète un call $K=30$ à 3 et vend un call $K=35$ à 1. Donner le profit par intervalle.

</summary>

Coût net $=2$. Payoffs : $0$ / $S_T-30$ / $5$. Profits :

| Intervalle | Profit |
|---|---|
| $S_T\le30$ | $-2$ |
| $30<S_T<35$ | $S_T-32$ |
| $S_T\ge35$ | $+3$ |

Point mort : **32**. Gain maximal : $K_2-K_1$ moins le coût, soit $5-2=3$.

</details>

<details><summary>Un bull spread par puts et un bull spread par calls : quelle différence ?</summary>

Même **direction de pari** et mêmes strikes, mais **le sens du flux initial** diffère. Par **calls** (acheter $K_1$, vendre $K_2$) : *le call vendu vaut moins que celui acheté*, donc **sortie de trésorerie**, et le payoff est **positif ou nul**. Par **puts** (acheter $K_1$, vendre $K_2$) : **entrée de trésorerie** initiale (marges ignorées) et payoff **négatif ou nul**. Le profil de **profit** final est le même.

</details>

<details><summary>Pourquoi le payoff d'un box spread est-il certain, et que vaut-il ?</summary>

Le bull call spread paie $0$ / $S_T-K_1$ / $K_2-K_1$ et le bear put spread paie $K_2-K_1$ / $K_2-S_T$ / $0$ sur les trois mêmes intervalles. **Leur somme vaut $K_2-K_1$ dans les trois cas.** Le box est donc un **zéro-coupon déguisé**, de valeur $(K_2-K_1)e^{-rT}$.

</details>

<details><summary>Pourquoi ne faut-il pas vendre un box spread américain de strikes 55/60 pour 5,10 alors qu'il vaut théoriquement 4,93 ?</summary>

Parce que **les options du CBOE sont américaines**, et que la formule suppose des **européennes**. Le bull call spread coûte **0,70** dans les deux mondes (le call américain sans dividende vaut le call européen), mais le bear put spread coûte **4,23** en européen et **4,56** en américain — à cause du **put profondément dans la monnaie** ($10{,}00$ contre $9{,}46$). Le box américain vaut donc $0{,}70+4{,}56=\mathbf{5{,}26}$, plus que les 5,10 proposés. *Vous vous en rendriez compte presque immédiatement : l'opération implique de vendre un put de strike 60, qui serait exercé contre vous presque aussitôt.*

</details>

<details><summary>Calls 6 mois à 10 (K=55), 7 (K=60), 5 (K=65). Construire un papillon et donner son profit maximal.</summary>

Acheter un call 55, acheter un call 65, **vendre deux** calls 60. Coût : $10+5-14=\mathbf{1}$. Payoff nul si $S_T<55$ ou $S_T>65$ → perte de **1**. Maximum en $S_T=60$ : payoff $60-55=5$, **profit 4**. Le profit est positif entre **56 et 64**. Le papillon **par puts** (acheter 55 et 65, vendre deux 60) donne **exactement le même** résultat — la parité impose un investissement initial identique.

</details>

<details><summary>Expliquer les trois régimes d'un spread calendaire.</summary>

Calculé **à l'expiration de l'option courte**, en supposant la longue dénouée alors. **Cours très bas** : l'option courte est sans valeur, la longue vaut **presque zéro** → perte ≈ **coût initial**. **Cours très haut** : l'option courte coûte $S_T-K$, la longue vaut **presque exactement** $S_T-K$ → les deux se compensent, perte ≈ **coût initial**. **Cours proche de $K$** : l'option courte coûte **peu ou rien**, mais la longue **conserve une valeur temps significative** → **profit net important**. D'où un profil en pic, semblable à celui du papillon.

</details>

<details><summary>Distinguer straddle, strangle, strip et strap.</summary>

**Straddle** : call + put de **même strike** → payoff $|S_T-K|$, le plus cher et le plus réactif. **Strangle** : put $K_1$ + call $K_2$ avec $K_1<K_2$ → **plat** entre les strikes ; il faut un mouvement **plus grand** pour gagner, mais **le risque central est moindre**. **Strip** : 1 call + **2 puts** → pari sur un grand mouvement, **baisse jugée plus probable**. **Strap** : **2 calls** + 1 put → grand mouvement, **hausse plus probable**.

</details>

<details><summary>Pourquoi un straddle avant une OPA annoncée n'est-il pas une machine à gagner ?</summary>

Parce que *si votre vision est à peu près celle des autres participants, **elle est déjà reflétée dans les prix**.* Les options seront **nettement plus chères** que sur un titre comparable sans saut attendu, et **le V du profit se sera déplacé vers le bas** : il faudra un mouvement **encore plus grand** pour gagner. *Pour qu'un straddle soit efficace, il faut croire à de grands mouvements **et** que cette croyance **diffère** de celle du marché — **et avoir raison**.*

</details>

<details><summary>Pourquoi peut-on approcher n'importe quel payoff avec des options européennes ?</summary>

Parce que le payoff d'un **papillon** est un **pic triangulaire** centré en $K_2$, et que *à mesure que $K_1$ et $K_3$ se rapprochent, le pic devient plus étroit*. Une fonction quelconque se décompose donc en une **somme pondérée de pics étroits** — *par une combinaison judicieuse d'un grand nombre de très petits pics, n'importe quelle fonction de payoff peut être approchée*. C'est le fondement de la **réplication statique** et de l'extraction de la **densité risque-neutre** à partir des prix d'options.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Comment se fabrique une note à capital protégé ? | Zéro-coupon **+ call à la monnaie** |
| Que perd l'investisseur au pire ? | Les **intérêts et dividendes** de la période |
| Quel risque subsiste ? | Le **risque de crédit** de l'émetteur (Lehman 2008) |
| Variable critique pour la banque ? | Le **rendement du dividende** |
| Si le dividende est nul ? | La note **ne peut pas** être rentable, quelle que soit la durée |
| Qu'est-ce qu'un call couvert ? | **Long action + short call** |
| À quoi équivaut-il ? | Un **put vendu** |
| Qu'est-ce qu'un put protecteur ? | **Long put + long action** |
| À quoi équivaut-il ? | Un **call acheté** |
| Quel outil justifie ces équivalences ? | La **parité call-put** |
| Qu'est-ce qu'un spread ? | Deux options ou plus **du même type** |
| Bull spread par calls ? | Acheter $K_1$, vendre $K_2$, $K_1<K_2$ |
| Payoff maximal ? | $K_2-K_1$ |
| Flux initial d'un bull spread par calls ? | **Sortie** |
| Flux initial d'un bull spread par puts ? | **Entrée** |
| Bull spread le plus agressif ? | Les **deux calls hors la monnaie** |
| Bear spread par puts ? | Acheter $K_2$, vendre $K_1$ — le **strike haut** est acheté |
| Payoff d'un bear spread si $S_T\le K_1$ ? | $K_2-K_1$ |
| Qu'est-ce qu'un box spread ? | Bull call spread **+ bear put spread**, mêmes strikes |
| Son payoff ? | $K_2-K_1$ **toujours** |
| Sa valeur ? | $(K_2-K_1)e^{-rT}$ |
| Fonctionne-t-il avec des américaines ? | **Non** |
| Pourquoi ? | Le **put profondément ITM** vaut plus en américain |
| Valeur du box de l'exemple, euro / améric. ? | **4,93** / **5,26** |
| Construction d'un papillon ? | $+1$ en $K_1$, $-2$ en $K_2$, $+1$ en $K_3$ |
| Où est $K_2$ ? | À **mi-chemin**, proche du cours |
| Quand gagne-t-il ? | Si le cours **reste proche de $K_2$** |
| Coût et profit max de l'exemple ? | Coût **1**, profit max **4** en $S_T=60$ |
| Zone de profit de cet exemple ? | Entre **56 et 64** |
| Papillon par puts vs par calls ? | **Identiques** |
| Vendre un papillon ? | Profit **modeste** si grand mouvement |
| Spread calendaire ? | **Même strike**, échéances différentes |
| Quand est-il tracé ? | À l'expiration de l'option **courte** |
| Quand gagne-t-il ? | Si $S_T$ est **proche du strike** |
| Calendaire neutre / haussier / baissier ? | Strike **au cours** / **plus haut** / **plus bas** |
| Calendaire inverse ? | Acheter la courte, vendre la longue |
| Spread **diagonal** ? | **Strike ET échéance** diffèrent |
| Qu'est-ce qu'une combinaison ? | Position sur **calls ET puts** |
| Composition d'un straddle ? | Call **+** put, **même strike**, même échéance |
| Payoff d'un straddle ? | $\lvert S_T-K\rvert$ |
| Pire cas d'un straddle acheté ? | $S_T=K$ : on perd **toute la prime** |
| Autre nom du straddle acheté / vendu ? | *Bottom straddle* / ***top straddle*** |
| Risque du straddle vendu ? | Perte **illimitée** |
| Composition d'un strip ? | **1 call + 2 puts** |
| Composition d'un strap ? | **2 calls + 1 put** |
| Sur quoi parie un strip ? | Grand mouvement, **baisse plus probable** |
| Composition d'un strangle ? | Put $K_1$ **+** call $K_2$, $K_1<K_2$ |
| Autre nom du strangle ? | *Bottom vertical combination* |
| Straddle vs strangle ? | Le strangle exige un mouvement **plus grand**, mais **risque central moindre** |
| Effet d'écarter les strikes d'un strangle ? | **Moins** de risque, mouvement requis **plus grand** |
| Que faut-il pour gagner avec un straddle ? | Une vision **différente du marché** — et **juste** |
| Quel résultat théorique clôt le chapitre ? | Tout payoff s'approche par des **papillons étroits** |
