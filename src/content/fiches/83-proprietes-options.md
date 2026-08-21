# Fiche 83 — Propriétés des options sur actions : bornes, parité, exercice anticipé

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 10 « Properties of Stock Options » |
| **Difficulté** | Must know — **toute la théorie sans modèle** ; tout ce qui suit s'appuie dessus |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiches 74, 78, 82 |
| **Concepts clés** | Six déterminants du prix, bornes supérieures et inférieures, portefeuilles de réplication, parité call-put, structure de capital comme option, bornes américaines, non-optimalité de l'exercice anticipé d'un call, optimalité pour un put, effet des dividendes |
| **Poids à l'examen** | La **parité call-put** et son **arbitrage explicite** · les **quatre bornes** · **pourquoi** on n'exerce jamais un call américain sans dividende. |

## 🎯 Vue d'ensemble

```
SIX FACTEURS   S₀ · K · T · σ · r · dividendes
BORNES         c, C ≤ S₀        p ≤ Ke^{−rT}      P ≤ K
               c ≥ max(S₀ − Ke^{−rT}, 0)     p ≥ max(Ke^{−rT} − S₀, 0)
               C ≥ max(S₀ − K, 0)            P ≥ max(K − S₀, 0)
PARITÉ         c + Ke^{−rT} = p + S₀             (européennes, sans dividende)
               c + D + Ke^{−rT} = p + S₀         (avec dividendes)
AMÉRICAINES    S₀ − K ≤ C − P ≤ S₀ − Ke^{−rT}
EXERCICE       call sans dividende : JAMAIS      put : parfois, si assez dans la monnaie
```

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que fait ce chapitre, et c'est remarquable.</span>

*Il est possible d'atteindre certaines conclusions sur la valeur des options **sans faire aucune hypothèse sur la volatilité** des prix.* Tout repose sur **l'absence d'arbitrage** et sur la comparaison de **deux portefeuilles**. Le modèle (chapitres 12 et 14) viendra ensuite **remplir** l'intervalle entre les bornes.

</div>

## 🔴 Concept 1 — Les six facteurs

| Variable qui **augmente** | Call européen | Put européen | Call américain | Put américain |
|---|---|---|---|---|
| **Cours de l'action $S_0$** | $+$ | $-$ | $+$ | $-$ |
| **Prix d'exercice $K$** | $-$ | $+$ | $-$ | $+$ |
| **Temps jusqu'à l'échéance $T$** | **?** | **?** | $+$ | $+$ |
| **Volatilité $\sigma$** | $+$ | $+$ | $+$ | $+$ |
| **Taux sans risque $r$** | $+$ | $-$ | $+$ | $-$ |
| **Dividendes futurs** | $-$ | $+$ | $-$ | $+$ |

*Valeurs de référence des figures : $S_0=50$, $K=50$, $r=5\,\%$, $\sigma=30\,\%$, $T=1$ an, sans dividende → **call à 7,116** et **put à 4,677**.*

**Cours et prix d'exercice.** *Si un call est exercé, le payoff est le montant dont le cours **dépasse** le strike : les calls gagnent en valeur quand $S_0$ monte et en perdent quand $K$ monte. Pour un put, le payoff est le montant dont le strike dépasse le cours : il se comporte à **l'inverse**.*

**Temps jusqu'à l'échéance — le seul cas ambigu, et il faut savoir dire pourquoi.**

> **Pour les américaines, c'est immédiat.** *Considérez deux options américaines ne différant que par l'échéance. **Le propriétaire de la longue dispose de toutes les occasions d'exercice ouvertes au propriétaire de la courte — et davantage.** La longue doit donc toujours valoir **au moins autant**.*

⚠️ **Pour les européennes, ce n'est pas toujours vrai.** *Considérez deux calls européens, l'un échéant dans 1 mois, l'autre dans 2 mois, et supposez qu'un **très gros dividende** est attendu dans **6 semaines**. Le dividende fera baisser le cours, de sorte que **l'option courte pourrait valoir plus que la longue**.* (On suppose que, lorsqu'on change la durée de vie, les dividendes et leur calendrier **restent inchangés**.)

**Volatilité — l'asymétrie qui fait tout.** *Quand la volatilité augmente, la chance que l'action fasse **très bien** ou **très mal** augmente. **Pour le détenteur de l'action, ces deux issues tendent à se compenser. Pas pour le détenteur d'une option** : le détenteur d'un call **profite des hausses** mais a un **risque de baisse limité**, puisque le maximum qu'il puisse perdre est le prix de l'option ; symétriquement pour un put.* **Calls et puts gagnent donc tous deux en valeur quand $\sigma$ augmente.**

**Taux sans risque — deux effets, et un avertissement.** *Quand les taux montent, le **rendement exigé** des actions tend à monter ; en outre, la **valeur actuelle** de tout flux futur reçu par le détenteur de l'option **diminue**. L'impact combiné est d'**augmenter la valeur des calls** et de **diminuer celle des puts**.*

⚠️ ***Il est important de souligner que nous supposons que les taux changent alors que toutes les autres variables restent constantes*** *— en particulier que **le cours de l'action reste le même**. En pratique, quand les taux montent (baissent), les cours tendent à baisser (monter). **L'effet combiné d'une hausse des taux et de la baisse de cours qui l'accompagne peut être de diminuer la valeur d'un call et d'augmenter celle d'un put.***

**Dividendes.** *Ils font **baisser le cours** à la date de détachement : mauvaise nouvelle pour les calls, bonne pour les puts.*

## 🟡 Concept 2 — Hypothèses et notation

**Les trois hypothèses** — vraies pour **certains** participants, comme les grandes banques d'investissement :

1. **aucun coût de transaction** ;
2. **même taux d'imposition** sur tous les profits nets ;
3. **emprunt et prêt** possibles au taux sans risque.

*Ces participants exploitent les arbitrages dès qu'ils apparaissent ; les opportunités **disparaissent donc très vite**, et il est raisonnable de supposer **qu'il n'y en a pas**.*

| Symbole | Sens |
|---|---|
| $S_0$, $S_T$ | cours **aujourd'hui**, cours **à l'échéance** |
| $K$, $T$ | strike, temps jusqu'à l'échéance |
| $r$ | taux sans risque **continu** pour un placement de maturité $T$ |
| $c$, $p$ | valeur d'un call / put **européen** |
| $C$, $P$ | valeur d'un call / put **américain** |

⚠️ **$r$ est le taux nominal, pas le taux réel.** *Et on peut supposer $r>0$ : sinon un placement sans risque n'offrirait aucun avantage sur le cash — et si $r<0$, le cash serait **préférable**.*

## 🔴 Concept 3 — Bornes supérieures et inférieures

> Ces bornes *ne dépendent d'**aucune** hypothèse particulière sur les facteurs de la section 1* (sauf $r>0$). *Si un prix d'option sort de ces bornes, il y a des occasions profitables pour les arbitragistes.*

### 3.1 Bornes supérieures — les trois évidences

$$\boxed{c\le S_0\quad\text{et}\quad C\le S_0}\;\text{(10.1)}\qquad\boxed{P\le K}\;\text{(10.2)}\qquad\boxed{p\le Ke^{-rT}}\;\text{(10.3)}$$

| Borne | Raisonnement | Arbitrage si violée |
|---|---|---|
| $c,C\le S_0$ | *quoi qu'il arrive, l'option ne peut jamais valoir plus que l'action* | **acheter l'action, vendre le call** |
| $P\le K$ | *aussi bas que tombe le cours, l'option ne peut jamais valoir plus que $K$* | — |
| $p\le Ke^{-rT}$ | à l'échéance elle ne vaut pas plus que $K$, donc **pas plus que la VA de $K$ aujourd'hui** | **vendre l'option et placer** le produit au taux sans risque |

⚠️ **Pourquoi $P\le K$ et non $P\le Ke^{-rT}$.** Une **américaine** peut être exercée **maintenant** : elle peut donc valoir $K$ aujourd'hui, ce qui dépasse $Ke^{-rT}$. L'actualisation ne vaut que pour l'**européenne**.

### 3.2 Borne inférieure d'un call européen sans dividende

$$\boxed{c\ge\max(S_0-Ke^{-rT},\ 0)}\;\text{(10.4)}$$

<details class="details--riche">
<summary>

**L'arbitrage explicite, puis la démonstration formelle**

</summary>

**L'arbitrage.** $S_0=20$, $K=18$, $r=10\,\%$, $T=1$ an. La borne vaut $20-18e^{-0{,}1}=\mathbf{3{,}71}$. Supposez le call coté **3,00**.

*Étape 1.* **Shorter l'action** et **acheter le call** → entrée de trésorerie $20{,}00-3{,}00=\mathbf{17{,}00}$. *Étape 2.* Placer 17 à 10 % pendant un an : $17e^{0{,}1}=\mathbf{18{,}79}$. *Étape 3 — cas $S_T>18$.* Exercer le call pour **18**, refermer le short → profit $18{,}79-18{,}00=\mathbf{0{,}79}$. *Étape 4 — cas $S_T<18$.* Racheter l'action **sur le marché**, moins cher → **profit encore plus grand**. Si $S_T=17$ : $18{,}79-17{,}00=\mathbf{1{,}79}$. *Conclusion.* **Profit strictement positif dans tous les cas** → le prix de 3,00 est impossible.

**La démonstration formelle — deux portefeuilles.**

|  | Portefeuille **A** | Portefeuille **B** |
|---|---|---|
| Contenu | un **call européen** + une obligation zéro-coupon payant $K$ en $T$ | **une action** |
| Valeur en $T$ si $S_T>K$ | $(S_T-K)+K=S_T$ | $S_T$ |
| Valeur en $T$ si $S_T<K$ | $0+K=K$ | $S_T$ |
| **Total** | $\max(S_T,K)$ | $S_T$ |

*A vaut **toujours autant que** B, et **peut valoir davantage**. En l'absence d'arbitrage, cela doit aussi être vrai **aujourd'hui** :*

$$c+Ke^{-rT}\ge S_0\ \Longrightarrow\ c\ge S_0-Ke^{-rT}$$

*Et comme **le pire qui puisse arriver à un call est d'expirer sans valeur**, $c\ge0$, d'où (10.4).*

**Exemple 10.1.** $S_0=51$, $K=50$, $T=0{,}5$, $r=12\,\%$ :

$$51-50e^{-0{,}12\times0{,}5}=51-47{,}09=\mathbf{3{,}91}$$

</details>

### 3.3 Borne inférieure d'un put européen sans dividende

$$\boxed{p\ge\max(Ke^{-rT}-S_0,\ 0)}\;\text{(10.5)}$$

<details class="details--riche">
<summary>

**L'arbitrage explicite, puis la démonstration formelle**

</summary>

**L'arbitrage.** $S_0=37$, $K=40$, $r=5\,\%$, $T=0{,}5$. La borne vaut $40e^{-0{,}025}-37=\mathbf{2{,}01}$. Supposez le put coté **1,00**.

*Étape 1.* **Emprunter 38** pour 6 mois et acheter **le put et l'action**. *Étape 2.* À échéance, il faudra rembourser $38e^{0{,}025}=\mathbf{38{,}96}$. *Étape 3 — cas $S_T<40$.* Exercer le put pour vendre l'action **40**, rembourser → profit $40{,}00-38{,}96=\mathbf{1{,}04}$. *Étape 4 — cas $S_T>40$.* Abandonner le put, vendre l'action au marché → **profit encore plus grand**. Si $S_T=42$ : $42{,}00-38{,}96=\mathbf{3{,}04}$.

**La démonstration formelle.**

|  | Portefeuille **C** | Portefeuille **D** |
|---|---|---|
| Contenu | un **put européen** + **une action** | une obligation zéro-coupon payant $K$ en $T$ |
| Valeur en $T$ si $S_T<K$ | $(K-S_T)+S_T=K$ | $K$ |
| Valeur en $T$ si $S_T>K$ | $0+S_T=S_T$ | $K$ |
| **Total** | $\max(S_T,K)$ | $K$ |

D'où $p+S_0\ge Ke^{-rT}$, donc $p\ge Ke^{-rT}-S_0$, et avec $p\ge0$ on obtient (10.5).

**Exemple 10.2.** $S_0=38$, $K=40$, $T=0{,}25$, $r=10\,\%$ :

$$40e^{-0{,}1\times0{,}25}-38=39{,}01-38=\mathbf{1{,}01}$$

⚠️ **Les quatre portefeuilles, à retenir comme un seul objet.** A et C valent **tous deux** $\max(S_T,K)$ à l'échéance. C'est **cette coïncidence** qui donnera immédiatement la parité call-put.

</details>

## 🔴 Concept 4 — La parité call-put

**Le raisonnement en une ligne.** Les portefeuilles **A** (call + zéro-coupon $K$) et **C** (put + action) valent **tous deux $\max(S_T,K)$** en $T$.

|  | $S_T>K$ | $S_T<K$ |
|---|---|---|
| **A** : call $+$ obligation | $(S_T-K)+K=S_T$ | $0+K=K$ |
| **C** : put $+$ action | $0+S_T=S_T$ | $(K-S_T)+S_T=K$ |

*Comme les options sont **européennes**, elles ne peuvent pas être exercées avant $T$. **Puisque les portefeuilles ont des valeurs identiques en $T$, ils doivent avoir des valeurs identiques aujourd'hui.** Sinon un arbitragiste achèterait le moins cher et vendrait le plus cher : comme ils sont **garantis de s'annuler** en $T$, la stratégie verrouillerait un profit d'arbitrage égal à la différence de valeur.*

$$\boxed{c+Ke^{-rT}=p+S_0}\;\text{(10.6)}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que cela signifie.</span>

*La valeur d'un call européen de strike et d'échéance donnés peut être **déduite** de la valeur du put de mêmes strike et échéance — et réciproquement.* Un seul des deux prix est une information ; l'autre en découle.

</div>

<details class="details--riche">
<summary>

**Exercice résolu — les deux arbitrages de la parité (tableau 10.3)**

</summary>

**Données communes.** $S_0=31$, $K=30$, $r=10\,\%$, $T=3$ mois, $c=3$.

**Cas 1 — le put coté 2,25.** *Étape 1 — comparer les deux côtés.*

$$c+Ke^{-rT}=3+30e^{-0{,}1\times0{,}25}=3+29{,}26=\mathbf{32{,}26}\qquad p+S_0=2{,}25+31=\mathbf{33{,}25}$$

*Étape 2 — diagnostiquer.* **C est surévalué** relativement à A → **acheter A, vendre C**. *Étape 3 — les opérations.* Acheter le call ($-3$), **shorter le put** ($+2{,}25$), **shorter l'action** ($+31$) → entrée nette

$$-3+2{,}25+31=\mathbf{30{,}25}$$

*Étape 4 — placer.* $30{,}25e^{0{,}1\times0{,}25}=\mathbf{31{,}02}$ dans trois mois. *Étape 5 — le dénouement, dans les deux cas.* Si $S_T>30$ : **le call est exercé**. Si $S_T<30$ : **le put est exercé**. ***Dans les deux cas, l'arbitragiste finit par acheter une action pour 30***, qu'il utilise pour refermer son short. *Étape 6 — le profit.* $31{,}02-30{,}00=\mathbf{1{,}02}$, **quel que soit** $S_T$.

**Cas 2 — le put coté 1,00.** *Étape 1.* $c+Ke^{-rT}=\mathbf{32{,}26}$ contre $p+S_0=1+31=\mathbf{32{,}00}$ → **A est surévalué**. *Étape 2 — inverser.* **Shorter le call** ($+3$), **acheter le put** ($-1$), **acheter l'action** ($-31$) → investissement net

$$31+1-3=\mathbf{29}$$

*Étape 3 — financer.* Emprunter 29 ; remboursement $29e^{0{,}025}=\mathbf{29{,}73}$. *Étape 4 — le dénouement.* *Le call court et le put long conduisent, dans les deux cas, à **vendre l'action pour 30**.* *Étape 5 — le profit.* $30{,}00-29{,}73=\mathbf{0{,}27}$.

⚠️ **La signature d'un arbitrage de parité.** On **shorte le côté cher et on achète le côté bon marché**, et l'on constate qu'**une des deux options est nécessairement exercée** — de sorte que l'action est achetée (ou vendue) **à coup sûr au prix $K$**. Le profit est alors **déterministe**, égal à la différence entre les deux côtés capitalisée.

</details>

<details class="details--riche">
<summary>

**Parité call-put et structure de capital — l'application de Black, Scholes et Merton**

</summary>

*Les pionniers de la valorisation d'options — **Fischer Black, Myron Scholes et Robert Merton** — montrèrent au début des années 1970 que les options permettent de **caractériser la structure de capital** d'une entreprise. **Cette analyse est aujourd'hui largement utilisée par les institutions financières pour évaluer le risque de crédit d'une entreprise.***

**Le décor.** Une entreprise dont les actifs sont financés par des **obligations zéro-coupon** et des **actions**. Les obligations échoient dans **cinq ans**, où un principal $K$ est dû. Pas de dividendes.

*Étape 1 — la décision des actionnaires.* *Si les actifs valent **plus que $K$** dans cinq ans, les actionnaires choisissent de **rembourser** les obligataires. S'ils valent **moins que $K$**, ils choisissent de **déclarer faillite**, et les obligataires se retrouvent propriétaires de l'entreprise.* *Étape 2 — la valeur des actions.* Elle vaut donc $\max(A_T-K,0)$ où $A_T$ est la valeur des actifs. **Les actionnaires détiennent un call européen à cinq ans sur les actifs de l'entreprise, de strike $K$.** *Étape 3 — la valeur de la dette.* Les obligataires reçoivent $\min(A_T,K)$, ce qui s'écrit $K-\max(K-A_T,0)$. **Les obligations valent donc la valeur actuelle de $K$ moins un put européen à cinq ans sur les actifs, de strike $K$.**

$$\boxed{\text{valeur des actions}=c}\qquad\qquad\boxed{\text{valeur de la dette}=\mathrm{VA}(K)-p}$$

*Étape 4 — l'identité comptable.* La valeur des actifs doit égaler le total des instruments qui les financent :

$$A_0=c+[\mathrm{VA}(K)-p]$$

*Étape 5 — réarranger.*

$$c+\mathrm{VA}(K)=p+A_0$$

**C'est exactement la parité call-put (10.6), écrite pour des options sur les actifs de l'entreprise.**

⚠️ **La lecture à retenir.** Détenir de la dette d'entreprise, c'est détenir une **obligation sans risque** et avoir **vendu un put** sur les actifs. Le **spread de crédit** est donc le **prix de ce put** — c'est le point de départ du modèle de Merton et de tout le chapitre 23.

</details>

### 4.1 Le cas américain : une double inégalité

⚠️ **La parité ne vaut que pour les européennes.** Pour les américaines, sans dividende, on n'a plus qu'un encadrement :

$$\boxed{S_0-K\le C-P\le S_0-Ke^{-rT}}\;\text{(10.7)}$$

<details class="details--riche">
<summary>

**Exercice résolu — encadrer un put américain (exemple 10.3)**

</summary>

**Énoncé.** Call américain sans dividende, $K=20$, échéance **5 mois**, coté **1,50**. $S_0=19$, $r=10\,\%$.

*Étape 1 — appliquer (10.7).*

$$19-20\ \le\ C-P\ \le\ 19-20e^{-0{,}1\times5/12}$$

*Étape 2 — calculer la borne de droite.* $20e^{-0{,}0417}=19{,}18$, donc la borne vaut $19-19{,}18=\mathbf{-0{,}18}$. *Étape 3 — retourner l'encadrement.* $-1\le C-P\le-0{,}18$ équivaut à

$$1\ \ge\ P-C\ \ge\ 0{,}18$$

*Étape 4 — injecter $C=1{,}50$.* $P$ est compris entre $1{,}50+0{,}18=\mathbf{1{,}68}$ et $1{,}50+1{,}00=\mathbf{2{,}50}$.

⚠️ **Attention au sens des inégalités quand on multiplie par $-1$.** C'est l'erreur la plus fréquente sur cet exercice : les deux bornes **échangent leurs rôles**.

</details>

## 🔴 Concept 5 — Il ne faut jamais exercer un call américain sans dividende

**L'argument concret.** Call américain sans dividende, **un mois** avant l'échéance, cours **70**, strike **40**. *L'option est très **dans la monnaie**, et l'investisseur pourrait être tenté de l'exercer immédiatement. Pourtant, s'il compte garder l'action plus d'un mois, ce n'est pas la meilleure stratégie.*

| Avantage d'attendre | Contenu |
|---|---|
| **Valeur temps de l'argent** | *les 40 du strike sont payés **un mois plus tard**, donc on gagne un mois d'intérêt dessus* |
| **Aucun revenu sacrifié** | *l'action ne paie **pas de dividende** : rien n'est perdu à ne pas la détenir* |
| **L'assurance** | *il reste une chance — aussi lointaine soit-elle — que le cours **tombe sous 40** dans un mois. **Dans ce cas l'investisseur n'exercera pas et sera bien content de ne pas l'avoir fait plus tôt !*** |

⚠️ **Et si l'investisseur pense que l'action est surévaluée ?** *Alors **il vaut mieux vendre l'option que l'exercer**. Elle sera achetée par un autre investisseur qui, lui, veut détenir l'action — **de tels investisseurs existent nécessairement, sinon le cours ne serait pas de 70**. Le prix obtenu pour l'option sera **supérieur à sa valeur intrinsèque de 30**.* (Variante citée en note : *garder l'option et **shorter l'action** verrouille un meilleur profit que 10*.)

**La démonstration formelle, en trois lignes.**

$$c\ge S_0-Ke^{-rT}\quad\text{et}\quad C\ge c\quad\Longrightarrow\quad C\ge S_0-Ke^{-rT}$$

*Étant donné $r>0$, il s'ensuit que $C>S_0-K$ dès que $T>0$.* **$C$ est donc toujours strictement supérieur à sa valeur intrinsèque avant l'échéance.** *Or, s'il était optimal d'exercer à un instant antérieur, $C$ **égalerait** la valeur intrinsèque à cet instant. **Il ne peut donc jamais être optimal d'exercer par anticipation.***

> **Les deux raisons, résumées par Hull.** *L'une concerne **l'assurance** qu'il procure : un call détenu à la place de l'action **assure** le détenteur contre une chute du cours sous le strike ; **une fois l'option exercée et le strike échangé contre l'action, cette assurance disparaît**. L'autre concerne la **valeur temps de l'argent** : du point de vue du détenteur, **plus le strike est payé tard, mieux c'est**.*

**Conséquence immédiate sur les bornes.** *Comme les calls américains ne sont jamais exercés par anticipation en l'absence de dividendes, ils sont **équivalents** aux calls européens :*

$$\boxed{C=c}\qquad\text{et}\qquad\max(S_0-Ke^{-rT},0)\ \le\ c,C\ \le\ S_0$$

## 🔴 Concept 6 — Il peut être optimal d'exercer un put américain

> **Le résultat.** *À tout moment de sa vie, un put devrait toujours être exercé par anticipation s'il est **suffisamment dans la monnaie**.*

**Le cas extrême qui le prouve.** *Strike **10**, cours **quasiment nul**. En exerçant immédiatement, l'investisseur réalise un gain immédiat de **10**. S'il attend, **le gain à l'exercice pourrait être inférieur à 10, mais il ne peut pas être supérieur** — puisque des cours négatifs sont impossibles. Et **recevoir 10 maintenant est préférable à recevoir 10 plus tard**. L'option doit donc être exercée immédiatement.*

> **La différence de nature avec un call.** *Comme un call, un put peut être vu comme une **assurance** : détenu avec l'action, il assure contre une chute sous un certain niveau. **Mais un put diffère d'un call en ceci qu'il peut être optimal de renoncer à cette assurance et d'exercer par anticipation pour réaliser le strike immédiatement.***

**Quand l'exercice anticipé devient-il plus attractif ?**

$$\boxed{S_0\ \text{diminue}\qquad r\ \text{augmente}\qquad \sigma\ \text{diminue}}$$

**Les bornes qui en découlent.**

$$\max(Ke^{-rT}-S_0,0)\ \le\ p\ \le\ Ke^{-rT}\qquad\qquad \boxed{\max(K-S_0,0)\ \le\ P\ \le\ K}$$

⚠️ **La condition $P\ge\max(K-S_0,0)$ est *plus forte* que celle du put européen**, *parce que l'option peut être exercée à tout moment*. Elle n'est pas actualisée.

<details class="details--riche">
<summary>

**Les trois conséquences graphiques, et pourquoi elles s'enchaînent**

</summary>

*Étape 1 — le point de fusion.* *Pourvu que $r>0$, il est **toujours optimal** d'exercer un put américain immédiatement quand le cours est **suffisamment bas**. Quand l'exercice anticipé est optimal, la valeur de l'option est exactement $K-S_0$.* **La courbe du put américain se confond donc avec sa valeur intrinsèque en dessous d'un certain cours** (le point $A$ de la figure 10.6).

*Étape 2 — l'américain vaut plus que l'européen.* *Puisqu'il existe des circonstances où il est souhaitable d'exercer un put américain par anticipation, **un put américain vaut toujours plus que le put européen correspondant**.*

*Étape 3 — et donc l'européen peut valoir **moins** que son intrinsèque.* *Puisqu'un put américain vaut parfois exactement sa valeur intrinsèque, **il s'ensuit qu'un put européen doit parfois valoir moins que sa valeur intrinsèque**.* La courbe européenne est donc **en dessous** de l'américaine.

*Étape 4 — la conséquence sur les points de fusion.* *Le point $B$ (où le put européen égale son intrinsèque) correspond à un cours **plus élevé** que le point $A$, précisément parce que la courbe européenne est en dessous.* Et en $S_0=0$, le put européen vaut exactement $\mathbf{Ke^{-rT}}$ — pas $K$.

⚠️ **Ce dernier point est le plus contre-intuitif du chapitre.** Un put européen **dans la monnaie** peut valoir **moins que $K-S_0$** : on ne peut pas encaisser $K$ tout de suite, seulement $Ke^{-rT}$. C'est exactement pour cette raison que $P>p$ pour les puts, alors que $C=c$ pour les calls.

</details>

## 🟠 Concept 7 — L'effet des dividendes

*On suppose les dividendes versés pendant la vie de l'option **connus** — hypothèse raisonnable puisque **la plupart des options cotées ont une vie inférieure à un an**.* On note $D$ la **valeur actuelle** des dividendes, *chaque dividende étant supposé survenir à sa **date de détachement***.

**Les portefeuilles se redéfinissent en ajoutant $D$ du bon côté.**

| Résultat | Portefeuille A / C redéfini | Borne |
|---|---|---|
| **Call** | A : call $+$ liquidités $D+Ke^{-rT}$ ; B : une action | $c\ge\max(S_0-D-Ke^{-rT},0)$ ;(10.8) |
| **Put** | C : put $+$ une action ; D : liquidités $D+Ke^{-rT}$ | $p\ge\max(D+Ke^{-rT}-S_0,0)$ ;(10.9) |

$$\boxed{c+D+Ke^{-rT}=p+S_0}\;\text{(10.10)}\qquad\qquad\boxed{S_0-D-K\le C-P\le S_0-Ke^{-rT}}\;\text{(10.11)}$$

⚠️ **L'exercice anticipé d'un call redevient possible — mais à un seul instant.** *Quand des dividendes sont attendus, on ne peut plus affirmer qu'un call américain ne sera pas exercé par anticipation. **Il est parfois optimal d'exercer un call américain immédiatement AVANT une date de détachement. Il n'est jamais optimal d'exercer un call à d'autres moments.*** (Section 14.12.)

**La logique.** Le dividende fait **chuter le cours** au détachement. Exercer **juste avant** permet de **capter le dividende** ; c'est le seul bénéfice possible à renoncer à la valeur temps et aux intérêts sur $K$. À tout autre instant, l'argument du concept 5 s'applique inchangé.

⚠️ **Notez l'asymétrie de (10.11).** $D$ apparaît **seulement à gauche**. La borne supérieure reste $S_0-Ke^{-rT}$, inchangée.

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| « quelle est la valeur minimale de… ? » | **borne inférieure** | $S_0-Ke^{-rT}$ (call) · $Ke^{-rT}-S_0$ (put), $\ge0$ |
| Un prix d'option donné, on demande s'il y a arbitrage | **tester les bornes** | comparer, puis construire l'arbitrage |
| $c$, $p$, $S_0$, $K$, $r$, $T$ tous donnés | **parité** | vérifier $c+Ke^{-rT}=p+S_0$ |
| Trois des quatre quantités | **déduire la quatrième** | isoler dans la parité |
| Un call **américain** et une question sur le put | **encadrement (10.7)** | attention au **retournement** des inégalités |
| « faut-il exercer maintenant ? » | **exercice anticipé** | call sans dividende : **jamais** · put : si assez ITM |
| Un dividende dans la vie de l'option | **versions avec $D$** | (10.8)-(10.11), $D$ = **valeur actuelle** |

## Comment résoudre ce type d'exercice

**Protocole arbitrage de parité — 5 étapes.**

1. Calculer les **deux côtés** : $c+Ke^{-rT}$ et $p+S_0$.
2. Identifier **le côté cher** : on le **vend** (short), on **achète** l'autre.
3. Écrire le **flux net initial** ; le **placer** (s'il est positif) ou l'**emprunter** (s'il est négatif).
4. Constater qu'**une des deux options est nécessairement exercée** → l'action est achetée ou vendue **à $K$ à coup sûr**.
5. Le profit est la **différence entre les deux côtés, capitalisée** — le vérifier dans **les deux scénarios**.

**Protocole borne inférieure — 4 étapes.**

1. Calculer la borne $\max(S_0-D-Ke^{-rT},0)$ ou $\max(D+Ke^{-rT}-S_0,0)$.
2. Comparer au prix observé.
3. Si le prix est **inférieur** : **acheter l'option** et prendre la position **inverse** sur l'action (short pour un call, long pour un put), en plaçant ou empruntant le solde.
4. Vérifier le profit dans **les deux scénarios** ($S_T$ au-dessus et en dessous de $K$) — il doit être **positif dans les deux**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Écrire $P\le Ke^{-rT}$ | L'**américaine** vaut au plus $K$ ; seule l'**européenne** est actualisée |
| Croire qu'une européenne longue vaut toujours plus qu'une courte | **Faux** avec un gros dividende entre les deux échéances |
| Appliquer la parité à des américaines | Elle ne vaut que pour les **européennes** ; sinon (10.7) |
| Oublier de retourner les inégalités dans (10.7) | $-1\le C-P\le-0{,}18$ donne $1\ge P-C\ge0{,}18$ |
| Exercer un call américain sans dividende | **Jamais optimal** — vendre l'option, ou shorter l'action |
| Croire qu'un put américain ne s'exerce jamais tôt | **Si**, dès qu'il est assez dans la monnaie |
| Croire qu'un put européen vaut au moins $K-S_0$ | **Faux** : il peut valoir **moins** que son intrinsèque |
| Utiliser le **montant** des dividendes dans (10.8)-(10.10) | $D$ est leur **valeur actuelle** |
| Mettre $D$ des deux côtés de (10.11) | Il n'apparaît qu'à **gauche** |
| Croire qu'une hausse de $r$ fait toujours monter un call | Toutes choses égales **par ailleurs** — en pratique le cours baisse |
| Confondre les portefeuilles A/B et C/D | A et C valent tous deux $\max(S_T,K)$ ; B vaut $S_T$, D vaut $K$ |

## 📌 Ultimate Review

**Le tableau des six facteurs.** $S_0$ : $+/-$ · $K$ : $-/+$ · $T$ : **? / ?** en européen, $+/+$ en américain · $\sigma$ : $+/+$ · $r$ : $+/-$ · dividendes : $-/+$.

**Les bornes.**

$$c,C\le S_0\qquad p\le Ke^{-rT}\qquad P\le K$$

$$c\ge\max(S_0-Ke^{-rT},0)\qquad p\ge\max(Ke^{-rT}-S_0,0)\qquad P\ge\max(K-S_0,0)$$

**Les quatre portefeuilles.** A = call + zéro-coupon $K$ · B = action · C = put + action · D = zéro-coupon $K$. **A et C valent $\max(S_T,K)$.**

**Les parités.**

$$c+Ke^{-rT}=p+S_0\qquad c+D+Ke^{-rT}=p+S_0\qquad S_0-D-K\le C-P\le S_0-Ke^{-rT}$$

**Les deux règles d'exercice.** Call américain **sans dividende** : **jamais** avant l'échéance, donc $C=c$. **Avec dividende** : seulement **juste avant un détachement**. Put américain : **oui** s'il est assez dans la monnaie — d'autant plus que $S_0\downarrow$, $r\uparrow$, $\sigma\downarrow$.

**Les chiffres du chapitre.** Référence : $S_0=K=50$, $r=5\,\%$, $\sigma=30\,\%$, $T=1$ → call **7,116**, put **4,677** · bornes : $20-18e^{-0{,}1}=\mathbf{3{,}71}$, $51-50e^{-0{,}06}=\mathbf{3{,}91}$, $40e^{-0{,}025}-37=\mathbf{2{,}01}$, $40e^{-0{,}025}-38=\mathbf{1{,}01}$ · arbitrages de parité : **+1,02** et **+0,27** · exemple 10.3 : $P\in[\mathbf{1{,}68};\mathbf{2{,}50}]$.

**La structure de capital.** Actions $=c$ · dette $=\mathrm{VA}(K)-p$ · $A_0=c+\mathrm{VA}(K)-p$ **est** la parité.

## 🧠 Active Recall

<details class="details--riche">
<summary>

Pourquoi une hausse de la volatilité fait-elle monter **à la fois** les calls et les puts ?

</summary>

Parce que la volatilité augmente la chance que l'action fasse **très bien ou très mal**, et que **ces deux issues se compensent pour le détenteur de l'action, mais pas pour le détenteur d'une option**. Le détenteur d'un call **profite pleinement des hausses** mais son risque de baisse est **borné par la prime** ; symétriquement pour un put. L'asymétrie du payoff transforme donc une dispersion accrue en **valeur accrue**, quel que soit le sens.

</details>

<details><summary>Une option européenne de longue maturité vaut-elle toujours plus qu'une de courte maturité ?</summary>

**Non.** Pour les **américaines**, oui — *le propriétaire de la longue dispose de toutes les occasions d'exercice de la courte, et davantage*. Pour les **européennes**, contre-exemple de Hull : deux calls à 1 et 2 mois, avec un **très gros dividende attendu dans 6 semaines**. Le dividende fera chuter le cours **entre les deux échéances**, de sorte que **l'option courte peut valoir plus**.

</details>

<details class="details--riche">
<summary>

Pourquoi $P\le K$ mais $p\le Ke^{-rT}$ ?

</summary>

Parce qu'une option **américaine** peut être exercée **immédiatement** : elle peut donc valoir jusqu'à $K$ **aujourd'hui**. L'**européenne** ne peut rien rapporter avant $T$ ; comme elle ne peut valoir plus que $K$ **à l'échéance**, elle ne peut valoir plus que la **valeur actuelle** de $K$ aujourd'hui. Si $p>Ke^{-rT}$, un arbitragiste **vendrait l'option et placerait le produit** au taux sans risque.

</details>

<details class="details--riche">
<summary>

Démontrer $c\ge S_0-Ke^{-rT}$ par les portefeuilles.

</summary>

**A** = un call européen + un zéro-coupon payant $K$ en $T$ ; **B** = une action. En $T$ : si $S_T>K$, A vaut $(S_T-K)+K=S_T$ ; si $S_T<K$, A vaut $0+K=K$. Donc **A vaut $\max(S_T,K)$** et B vaut $S_T$ : **A vaut toujours au moins autant que B**. En l'absence d'arbitrage, c'est vrai aujourd'hui : $c+Ke^{-rT}\ge S_0$. Et comme $c\ge0$ (*le pire qui puisse arriver est d'expirer sans valeur*), on obtient $c\ge\max(S_0-Ke^{-rT},0)$.

</details>

<details class="details--riche">
<summary>

Un call européen vaut 3,00 alors que $S_0=20$, $K=18$, $r=10\,\%$, $T=1$. Construire l'arbitrage.

</summary>

Borne : $20-18e^{-0{,}1}=\mathbf{3{,}71}>3{,}00$. **Shorter l'action** et **acheter le call** → $+17{,}00$, placés à 10 % → $17e^{0{,}1}=\mathbf{18{,}79}$. Si $S_T>18$ : exercer pour 18, refermer le short → **+0,79**. Si $S_T<18$ : racheter l'action **au marché**, moins cher → **davantage** ; à $S_T=17$, **+1,79**. **Profit strictement positif dans tous les cas.**

</details>

<details><summary>Démontrer la parité call-put et dire ce qui la rend inapplicable aux américaines.</summary>

Les portefeuilles **A** (call + zéro-coupon $K$) et **C** (put + action) valent **tous deux $\max(S_T,K)$** en $T$ — vérification dans les deux cas $S_T>K$ et $S_T<K$. *Comme les options sont européennes, elles ne peuvent pas être exercées avant $T$* : les valeurs étant identiques en $T$, elles le sont aujourd'hui. D'où $c+Ke^{-rT}=p+S_0$.

Pour les **américaines**, l'exercice anticipé **casse l'égalité des payoffs terminaux** : les portefeuilles peuvent être liquidés avant $T$. Il ne reste que l'encadrement $S_0-K\le C-P\le S_0-Ke^{-rT}$.

</details>

<details class="details--riche">
<summary>

$S_0=31$, $K=30$, $r=10\,\%$, $T=0{,}25$, $c=3$, $p=2{,}25$. Y a-t-il arbitrage ?

</summary>

$c+Ke^{-rT}=3+29{,}26=\mathbf{32{,}26}$ ; $p+S_0=\mathbf{33{,}25}$. **C est surévalué.** On **achète le call**, on **shorte le put et l'action** → $+30{,}25$, placés → $\mathbf{31{,}02}$. À l'échéance, **l'une des deux options est exercée** et l'on achète l'action **pour 30** dans les deux cas. Profit : $31{,}02-30=\mathbf{1{,}02}$, **déterministe**.

</details>

<details><summary>Comment la parité call-put décrit-elle la structure de capital d'une entreprise ?</summary>

Les **actionnaires** détiennent un **call sur les actifs** de strike $K$ (la dette) : ils reçoivent $\max(A_T-K,0)$, remboursant si $A_T>K$ et **déclarant faillite** sinon. Les **obligataires** reçoivent $\min(A_T,K)=K-\max(K-A_T,0)$ : ils détiennent une obligation sans risque **moins un put** sur les actifs. Donc actions $=c$ et dette $=\mathrm{VA}(K)-p$. L'identité $A_0=c+[\mathrm{VA}(K)-p]$ se réarrange en $c+\mathrm{VA}(K)=p+A_0$ — **la parité elle-même**. C'est le fondement de l'évaluation du risque de crédit par les modèles structurels.

</details>

<details><summary>Pourquoi ne faut-il jamais exercer un call américain sur une action sans dividende ?</summary>

**Trois raisons concrètes** : on **paie le strike plus tard** (donc on gagne les intérêts dessus), on **ne sacrifie aucun revenu** (pas de dividende), et on **conserve l'assurance** contre une chute sous $K$ — *il reste une chance, aussi lointaine soit-elle, que le cours tombe sous 40, auquel cas on sera bien content de ne pas avoir exercé*.

**La démonstration** : $C\ge c\ge S_0-Ke^{-rT}>S_0-K$ dès que $r>0$ et $T>0$. **$C$ dépasse donc strictement sa valeur intrinsèque**, alors qu'un exercice optimal exigerait l'**égalité**. Corollaire : $C=c$.

Et si l'on croit l'action surévaluée ? **Vendre l'option** plutôt que l'exercer — *elle sera achetée par un investisseur qui veut détenir l'action, et de tels investisseurs existent nécessairement, sinon le cours ne serait pas de 70*.

</details>

<details><summary>Pourquoi peut-il être optimal d'exercer un put américain, et quand cela devient-il plus attractif ?</summary>

**Le cas extrême le montre** : strike 10, cours quasi nul. Exercer donne **10 tout de suite** ; attendre donne **au plus 10** (les cours négatifs sont impossibles) et **plus tard**. Il faut donc exercer. Contrairement au call, **il peut être optimal de renoncer à l'assurance pour réaliser le strike immédiatement**.

L'exercice anticipé devient plus attractif quand **$S_0$ diminue**, **$r$ augmente** et **$\sigma$ diminue**.

</details>

<details><summary>Un put européen peut-il valoir moins que sa valeur intrinsèque ? Justifier.</summary>

**Oui.** Un put **américain** vaut parfois **exactement** $K-S_0$ (quand l'exercice immédiat est optimal), et il vaut **toujours plus** que le put européen correspondant puisqu'il offre des occasions d'exercice supplémentaires. **Donc le put européen vaut parfois moins que $K-S_0$.** Cas limite : à $S_0=0$, le put européen vaut $\mathbf{Ke^{-rT}}$, strictement **inférieur** à $K$ — on ne peut pas encaisser $K$ avant $T$.

</details>

<details><summary>Comment les dividendes modifient-ils les bornes, la parité, et la règle d'exercice ?</summary>

Avec $D$ = **valeur actuelle** des dividendes :

$$c\ge\max(S_0-D-Ke^{-rT},0)\qquad p\ge\max(D+Ke^{-rT}-S_0,0)$$

$$c+D+Ke^{-rT}=p+S_0\qquad S_0-D-K\le C-P\le S_0-Ke^{-rT}$$

**Règle d'exercice** : *il est parfois optimal d'exercer un call américain **immédiatement avant une date de détachement**, et **jamais** à d'autres moments* — le seul bénéfice possible étant de **capter le dividende**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les six facteurs ? | $S_0$, $K$, $T$, $\sigma$, $r$, **dividendes** |
| Effet de $S_0\uparrow$ sur call / put ? | $+$ / $-$ |
| Effet de $K\uparrow$ ? | $-$ / $+$ |
| Effet de $T\uparrow$ sur les **américaines** ? | $+$ pour les deux |
| Effet de $T\uparrow$ sur les **européennes** ? | **Ambigu** |
| Contre-exemple pour $T$ ? | Un **gros dividende** entre les deux échéances |
| Effet de $\sigma\uparrow$ ? | $+$ pour **calls et puts** |
| Pourquoi ? | Payoff **asymétrique** : perte bornée par la prime |
| Effet de $r\uparrow$ ? | $+$ call, $-$ put — **toutes choses égales par ailleurs** |
| Effet des dividendes ? | $-$ call, $+$ put |
| Borne supérieure d'un call ? | $S_0$ |
| Borne supérieure d'un put **américain** ? | $K$ |
| Borne supérieure d'un put **européen** ? | $Ke^{-rT}$ |
| Borne inférieure d'un call européen ? | $\max(S_0-Ke^{-rT},0)$ |
| Borne inférieure d'un put européen ? | $\max(Ke^{-rT}-S_0,0)$ |
| Borne inférieure d'un put américain ? | $\max(K-S_0,0)$ |
| Portefeuille A ? | Call européen $+$ zéro-coupon payant $K$ |
| Portefeuille C ? | Put européen $+$ **une action** |
| Que valent A et C en $T$ ? | $\max(S_T,K)$ **tous les deux** |
| La parité call-put ? | $c+Ke^{-rT}=p+S_0$ |
| Pour qui vaut-elle ? | Les **européennes** uniquement |
| Parité avec dividendes ? | $c+D+Ke^{-rT}=p+S_0$ |
| Encadrement américain sans dividende ? | $S_0-K\le C-P\le S_0-Ke^{-rT}$ |
| Encadrement avec dividendes ? | $S_0-D-K\le C-P\le S_0-Ke^{-rT}$ |
| Valeur des actions d'une entreprise ? | Un **call sur les actifs**, $c$ |
| Valeur de la dette ? | $\mathrm{VA}(K)-p$ |
| Qui a établi ce lien ? | **Black, Scholes et Merton**, début des années 1970 |
| Exercer un call américain sans dividende ? | **Jamais** avant l'échéance |
| Les deux raisons ? | L'**assurance** perdue · la **valeur temps** de $K$ |
| Conséquence sur $C$ et $c$ ? | $\boxed{C=c}$ |
| Que faire si on croit l'action surévaluée ? | **Vendre l'option**, pas l'exercer |
| Exercer un put américain ? | **Oui** s'il est assez dans la monnaie |
| L'argument du cas extrême ? | $K=10$, $S\approx0$ : gagner 10 **maintenant** |
| Quand l'exercice anticipé d'un put est-il plus attractif ? | $S_0\downarrow$, $r\uparrow$, $\sigma\downarrow$ |
| $P$ et $p$ : lequel est le plus grand ? | **$P>p$** toujours |
| Un put européen peut-il valoir moins que $K-S_0$ ? | **Oui** |
| Valeur d'un put européen en $S_0=0$ ? | $\mathbf{Ke^{-rT}}$ |
| Quand exercer un call américain **avec** dividende ? | **Juste avant** une date de détachement, jamais ailleurs |
| Que représente $D$ ? | La **valeur actuelle** des dividendes |
| Où $D$ apparaît-il dans (10.11) ? | Seulement dans la borne **inférieure** |
| Hypothèse minimale des bornes ? | Seulement **$r>0$** |
| Prix de référence des figures (call, put) ? | **7,116** et **4,677** |
| Profit des deux arbitrages de parité ? | **1,02** et **0,27** |
| Encadrement de $P$ dans l'exemple 10.3 ? | Entre **1,68** et **2,50** |
