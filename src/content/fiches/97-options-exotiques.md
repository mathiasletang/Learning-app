# Fiche 97 — Options exotiques : barrières, lookback, asiatiques, swaps de variance

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Produits dérivés |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 25 « Exotic Options » |
| **Difficulté** | Must know — le catalogue complet du gré à gré structuré |
| **Temps d'étude estimé** | 2 h 15 |
| **Prérequis** | Fiches 84 (stratégies), 87 (Black-Scholes), 89 (options sur indices, devises, futures), 90 (grecques), 92 (méthodes numériques) |
| **Concepts clés** | Package, option bermudienne, *gap option*, *forward start*, cliquet, option composée, *chooser*, option à barrière, correction de Broadie-Glasserman-Kou, option parisienne, option binaire, *lookback* flottant et fixe, *shout option*, option asiatique, formule de Margrabe, option panier, swap de volatilité et de variance, indice VIX, réplication statique d'options |
| **Poids à l'examen** | La **parité** $c_{di}+c_{do}=c$ · $\lambda=\dfrac{r-q+\sigma^2/2}{\sigma^2}$ · la décomposition du **chooser** par la parité put-call · les **deux moments** $M_1,M_2$ de l'asiatique · la **formule de Margrabe** avec $\hat\sigma=\sqrt{\sigma_U^2+\sigma_V^2-2\rho\sigma_U\sigma_V}$ · la **réplication du swap de variance**. |

## 🎯 Vue d'ensemble

```
POURQUOI DES EXOTIQUES ?   besoin de couverture réel · raisons fiscales, comptables,
   juridiques, réglementaires · exprimer une VUE · parfois pour PARAÎTRE attractif
   à un trésorier peu vigilant.  Petite part du portefeuille, mais BEAUCOUP PLUS RENTABLE

HYPOTHÈSE COMMUNE   l'actif verse un rendement q   (indice : dividende · devise : r_f · futures : r)

DISCONTINUITÉ DU PAYOFF        gap · binaire · barrière        → couverture DIFFICILE
DÉPENDANCE AU CHEMIN           lookback · asiatique · shout     → asiatique FACILE à couvrir
PLUSIEURS ACTIFS               échange (Margrabe) · panier · arc-en-ciel
PLUSIEURS DATES                bermudienne · composée · chooser · cliquet

BARRIÈRES   λ = (r−q+σ²/2)/σ²    c_di + c_do = c    p_ui + p_uo = p
            observation DISCRÈTE : H → H e^{±0,5826 σ√(T/m)}
BINAIRES    cash-or-nothing : Q e^{−rT} N(d₂)    asset-or-nothing : S₀ e^{−qT} N(d₁)
ASIATIQUE   ajuster une LOGNORMALE aux DEUX premiers moments, puis modèle de Black
MARGRABE    V₀e^{−q_V T}N(d₁) − U₀e^{−q_U T}N(d₂)   ⚠️ INDÉPENDANT de r
VARIANCE    réplicable par un PORTEFEUILLE d'options hors de la monnaie → base du VIX
```

**Le cadrage d'ouverture.** *Les calls et puts européens et américains sont des produits ***plain vanilla*** : propriétés standard bien définies, négociés activement, prix ou volatilités implicites cotés régulièrement. **Un des aspects passionnants du marché de gré à gré est le nombre de produits non standard créés par les ingénieurs financiers.** Bien qu'ils constituent généralement **une part relativement petite du portefeuille**, les exotiques sont importantes pour un dealer parce qu'elles sont **généralement beaucoup plus PROFITABLES que les produits plain vanilla**.*

## 🟡 Concept 1 — Packages et options américaines non standard

### 1.1 Les packages

> ***Un package est un portefeuille composé de calls et puts européens standard, de contrats forward, de liquidités, et de l'actif sous-jacent lui-même.***

*Bull spreads, bear spreads, papillons, calendriers, straddles, strangles (fiche 84) en sont des exemples. **Souvent un package est structuré par les traders de sorte qu'il ait un COÛT INITIAL NUL.***

**Le *range forward*** *(autres noms : **zero-cost collar**, *flexible forward*, *cylinder option*, *option fence*, *min-max*, *forward band*)* : un **call long + put court** (ou l'inverse), avec le strike du call **supérieur** à celui du put, les deux strikes choisis pour que **la valeur du call égale celle du put**.

<details class="details--riche">
<summary>

**L'astuce universelle : différer le paiement pour obtenir un coût nul**

</summary>

> ⚠️ ***N'IMPORTE QUEL dérivé peut être converti en produit à coût nul en DIFFÉRANT le paiement jusqu'à maturité.***

*Étape 1.* Si $c$ est le coût d'un call européen payé en 0, alors le coût payé en $T$ vaut

$$A=c\,e^{rT}$$

*Étape 2 — le payoff net devient :*

$$\max(S_T-K,0)-A=\max(S_T-K-A,\ -A)$$

*Étape 3 — la nomenclature.* Quand le strike $K$ **égale le prix forward**, les autres noms de l'option à paiement différé sont : ***break forward***, ***Boston option***, ***forward with optional exit***, ***cancelable forward***.

</details>

### 1.2 Les américaines non standard

| Variante | Description |
|---|---|
| **Option bermudienne** | *l'exercice anticipé est **restreint à certaines dates**. (**Les Bermudes sont entre l'Europe et l'Amérique !**)* |
| **Période de *lock out*** | l'exercice anticipé n'est autorisé que **pendant une partie** de la vie de l'option — par exemple pas au début |
| **Strike variable** | le prix d'exercice **change pendant la vie** de l'option |

*Les **warrants** émis par les entreprises sur leur propre action ont souvent certaines ou toutes ces caractéristiques.* Exemple : *dans un warrant à 7 ans, l'exercice peut être possible à des dates particulières pendant les **années 3 à 7**, avec un strike de **30 dollars pendant les années 3 et 4**, **32 dollars les 2 années suivantes**, et **33 dollars la dernière année**.*

> **La méthode :** *les américaines non standard se valorisent habituellement par un **arbre binomial**. **À chaque nœud, le test d'exercice anticipé (s'il existe) est ajusté** pour refléter les termes de l'option.*

## 🔴 Concept 2 — Gap options

> ***Un gap call est un call européen qui verse $S_T-K_1$ quand $S_T>K_2$.***

*La différence avec un call ordinaire de strike $K_2$ : **le payoff quand $S_T>K_2$ est augmenté de $K_2-K_1$** — augmentation positive ou négative selon que $K_2>K_1$ ou $K_1>K_2$.*

$$\boxed{\text{Gap call}=S_0e^{-qT}N(d_1)-K_1e^{-rT}N(d_2)}\;\text{(25.1)}$$

$$\boxed{\text{Gap put}=K_1e^{-rT}N(-d_2)-S_0e^{-qT}N(-d_1)}\;\text{(25.2)}$$

$$\text{avec}\qquad\boxed{d_1=\frac{\ln(S_0/K_2)+(r-q+\sigma^2/2)T}{\sigma\sqrt T}\qquad d_2=d_1-\sigma\sqrt T}$$

> ⚠️ **La règle mnémotechnique, essentielle.** ***$K_2$ (le seuil de DÉCLENCHEMENT) entre dans $d_1$ et $d_2$ ; $K_1$ (le montant SOUSTRAIT du payoff) entre dans le terme actualisé.***

**L'écart avec le call ordinaire de strike $K_2$ :**

$$(K_2-K_1)\,e^{-rT}N(d_2)$$

*Pour le comprendre : **la probabilité que l'option soit exercée est $N(d_2)$**, et quand elle l'est, **le payoff du détenteur du gap est supérieur de $K_2-K_1$**.*

<details class="details--riche">
<summary>

**Exemple 25.1 — l'assurance avec coût de transfert**

</summary>

**Situation.** Un actif vaut **500 000 dollars**, volatilité **20 %** sur l'année, taux sans risque **5 %**, aucun revenu.

*Cas 1 — le put ordinaire.* Une compagnie d'assurance accepte d'acheter l'actif pour **400 000 dollars** si sa valeur est tombée en dessous de 400 000 dans un an. **Le payout est $400\,000-S_T$ dès que $S_T<400\,000$** : c'est un put ordinaire de strike 400 000. Avec $S_0=500\,000$, $K=400\,000$, $r=0{,}05$, $\sigma=0{,}2$, $T=1$ :

$$\text{valeur}=\mathbf{3\,436\ \text{dollars}}$$

*Cas 2 — avec un coût de transfert.* Le coût de transfert de l'actif est **50 000 dollars, à la charge de l'assuré**. ***L'option n'est donc exercée QUE si la valeur de l'actif est inférieure à 350 000.*** Le coût pour l'assureur est $K_1-S_T$ quand $S_T<K_2$, avec

$$K_2=350\,000\qquad K_1=400\,000$$

**C'est un gap put.** Par (25.2), avec $S_0=500\,000$, $r=0{,}05$, $q=0$, $\sigma=0{,}2$, $T=1$ :

$$d_1=\frac{\ln(500/350)+(0{,}05+0{,}02)}{0{,}2}=2{,}1334\qquad d_2=1{,}9334$$

$$\text{valeur}=400\,000\,e^{-0{,}05}N(-1{,}9334)-500\,000\,N(-2{,}1334)=\mathbf{1\,896\ \text{dollars}}$$

<div class="callout" data-kind="methode">

<span class="callout__lab">Reconnaître les coûts de la déclaration de sinistre pour l'assuré réduit le coût de la police pour l'assureur d'environ 45 % dans ce cas.</span>

⚠️ *(Exactement $1-1\,896/3\,436=44{,}8\,\%$.)*

</div>

</details>

## 🟠 Concept 3 — Forward start, cliquet, composées, chooser

### 3.1 Les options *forward start*

*Ce sont des options **qui commenceront à un instant futur**. **Les options de salariés peuvent parfois être vues comme des forward start options**, parce que l'entreprise s'engage (implicitement ou explicitement) à accorder dans le futur des options **à la monnaie**.*

<details class="details--riche">
<summary>

**La dérivation — un résultat étonnamment simple**

</summary>

**Cadre.** Un call européen **à la monnaie** *forward start*, démarrant en $T_1$ et arrivant à maturité en $T_2$. Prix de l'actif : $S_0$ en 0, $S_1$ en $T_1$.

*Étape 1 — l'observation clé.* D'après les formules de Black-Scholes, **la valeur d'une option à la monnaie est PROPORTIONNELLE au prix de l'actif**. La valeur du *forward start* en $T_1$ est donc

$$c\,\frac{S_1}{S_0}$$

où $c$ est la valeur **en 0** d'une option à la monnaie de durée $T_2-T_1$.

*Étape 2 — valorisation risque-neutre :*

$$e^{-rT_1}\hat E\!\left[c\,\frac{S_1}{S_0}\right]$$

*Étape 3.* $c$ et $S_0$ sont connus et $\hat E[S_1]=S_0e^{(r-q)T_1}$, donc :

$$\boxed{\text{Valeur du forward start}=c\,e^{-qT_1}}$$

> ⚠️ ***Pour une action ne versant PAS de dividende ($q=0$), la valeur du forward start est EXACTEMENT la même que celle d'une option ordinaire à la monnaie de MÊME DURÉE de vie.***

</details>

### 3.2 Les cliquets

*Un **cliquet** (aussi appelé ***ratchet*** ou ***strike reset option***) est **une série de calls ou de puts avec des règles déterminant le prix d'exercice**.*

**La structure simple.** Dates de réinitialisation en $\tau,2\tau,\dots,(n-1)\tau$, la vie du cliquet finissant en $n\tau$ :

| Option | Strike | Période |
|---|---|---|
| 1ʳᵉ | $K$ (souvent le prix initial) | 0 à $\tau$ |
| 2ᵉ | **la valeur de l'actif en $\tau$** | payoff en $2\tau$ |
| 3ᵉ | **la valeur de l'actif en $2\tau$** | payoff en $3\tau$ |

> ***C'est donc une option ordinaire PLUS $n-1$ options forward start*** — valorisables comme au §3.1.

⚠️ *Certains cliquets sont **bien plus compliqués** : limites supérieures et inférieures sur le payoff **total** ; terminaison à la fin d'une période si le prix est dans une certaine fourchette. **Quand les résultats analytiques ne sont pas disponibles, Monte-Carlo peut souvent servir.***

### 3.3 Les options composées

> ***Des options SUR options.*** Quatre types : **call sur call · put sur call · call sur put · put sur put**. Elles ont **deux strikes et deux dates d'exercice**.

**Le mécanisme du call sur call.** *À la première date $T_1$, le détenteur a le droit de **payer le premier strike $K_1$ et de recevoir un CALL**. Ce call lui donne le droit d'acheter l'actif pour le second strike $K_2$ à la seconde date $T_2$.* ***L'option composée n'est exercée à la première date QUE si la valeur de l'option à cette date dépasse le premier strike.***

<details class="details--riche">
<summary>

**Les quatre formules de Geske (1979) et Rubinstein**

</summary>

Sous l'hypothèse habituelle de mouvement brownien géométrique, les composées européennes se valorisent **analytiquement en termes d'intégrales de la loi normale BIVARIÉE**.

$$\boxed{\text{Call sur call}=S_0e^{-qT_2}M\!\left(a_1,b_1;\sqrt{T_1/T_2}\right)-K_2e^{-rT_2}M\!\left(a_2,b_2;\sqrt{T_1/T_2}\right)-e^{-rT_1}K_1N(a_2)}$$

$$\boxed{\text{Put sur call}=K_2e^{-rT_2}M\!\left(-a_2,b_2;-\sqrt{T_1/T_2}\right)-S_0e^{-qT_2}M\!\left(-a_1,b_1;-\sqrt{T_1/T_2}\right)+e^{-rT_1}K_1N(-a_2)}$$

$$\boxed{\text{Call sur put}=K_2e^{-rT_2}M\!\left(-a_2,-b_2;\sqrt{T_1/T_2}\right)-S_0e^{-qT_2}M\!\left(-a_1,-b_1;\sqrt{T_1/T_2}\right)-e^{-rT_1}K_1N(-a_2)}$$

$$\boxed{\text{Put sur put}=S_0e^{-qT_2}M\!\left(a_1,-b_1;-\sqrt{T_1/T_2}\right)-K_2e^{-rT_2}M\!\left(a_2,-b_2;-\sqrt{T_1/T_2}\right)+e^{-rT_1}K_1N(a_2)}$$

avec

$$a_1=\frac{\ln(S_0/S^\ast)+(r-q+\sigma^2/2)T_1}{\sigma\sqrt{T_1}}\qquad a_2=a_1-\sigma\sqrt{T_1}$$

$$b_1=\frac{\ln(S_0/K_2)+(r-q+\sigma^2/2)T_2}{\sigma\sqrt{T_2}}\qquad b_2=b_1-\sigma\sqrt{T_2}$$

| Symbole | Définition |
|---|---|
| $M(a,b;\rho)$ | **la loi normale bivariée cumulée** : probabilité que la première variable soit $<a$ **et** la seconde $<b$, avec une corrélation $\rho$ |
| $S^\ast$ | ***le prix de l'actif en $T_1$ pour lequel le prix de l'option en $T_1$ ÉGALE $K_1$.*** Si le prix réel est **au-dessus** de $S^\ast$ en $T_1$, la première option est exercée ; sinon elle expire sans valeur |
| $\sqrt{T_1/T_2}$ | la **corrélation** entre les deux mouvements browniens cumulés |

</details>

### 3.4 Les *chooser options*

*Un ***chooser*** (parfois **« as you like it option »**) a la caractéristique qu'**après une période donnée, le détenteur peut CHOISIR si l'option est un call ou un put**.* Sa valeur en $T_1$ est $\max(c,p)$.

<details class="details--riche">
<summary>

**La décomposition par la parité put-call — l'astuce à retenir**

</summary>

**Cadre.** Les options sous-jacentes sont **toutes deux européennes de MÊME strike $K$ et MÊME maturité $T_2$**. $S_1$ = prix en $T_1$.

*Étape 1 — la parité put-call en $T_1$ :*

$$p=c+Ke^{-r(T_2-T_1)}-S_1e^{-q(T_2-T_1)}$$

*Étape 2 — substituer :*

$$\max(c,p)=\max\!\big(c,\ c+Ke^{-r(T_2-T_1)}-S_1e^{-q(T_2-T_1)}\big)$$

*Étape 3 — factoriser $c$ :*

$$=c+\max\!\big(0,\ Ke^{-r(T_2-T_1)}-S_1e^{-q(T_2-T_1)}\big)$$

*Étape 4 — sortir $e^{-q(T_2-T_1)}$ :*

$$\boxed{\max(c,p)=c+e^{-q(T_2-T_1)}\max\!\Big(0,\ Ke^{-(r-q)(T_2-T_1)}-S_1\Big)}$$

> ***Le chooser est donc un PACKAGE composé de :***
>
> 1. ***un CALL de strike $K$ et de maturité $T_2$*** ;
> 2. ***$e^{-q(T_2-T_1)}$ PUTS de strike $Ke^{-(r-q)(T_2-T_1)}$ et de maturité $T_1$.***

⚠️ *Des choosers plus complexes existent où le call et le put **n'ont pas le même strike ni la même maturité**. **Ils ne sont alors PAS des packages** et ont des caractéristiques assez similaires aux options composées.*

</details>

## 🔴 Concept 4 — Les options à barrière

### 4.1 La typologie

> ***Options dont le payoff dépend de si le prix de l'actif ATTEINT un certain niveau pendant une certaine période.*** *Elles sont attractives pour certains participants parce qu'elles sont **MOINS CHÈRES que les options ordinaires correspondantes**.*

| Famille | Définition |
|---|---|
| ***Knock-out*** | l'option **CESSE D'EXISTER** quand le prix atteint la barrière |
| ***Knock-in*** | l'option **VIENT À L'EXISTENCE** seulement si le prix atteint la barrière |

| Nom | Barrière $H$ | Sens |
|---|---|---|
| ***Down-and-out call*** | **sous** $S_0$ | call ordinaire qui **meurt** si $S$ descend à $H$ |
| ***Down-and-in call*** | **sous** $S_0$ | call qui **naît** si $S$ descend à $H$ |
| ***Up-and-out call*** | **au-dessus** de $S_0$ | call qui **meurt** si $S$ monte à $H$ |
| ***Up-and-in call*** | **au-dessus** de $S_0$ | call qui **naît** si $S$ monte à $H$ |

$$\boxed{\text{La parité fondamentale}\ :\quad c_{di}+c_{do}=c\qquad c_{ui}+c_{uo}=c\qquad p_{di}+p_{do}=p\qquad p_{ui}+p_{uo}=p}$$

### 4.2 Les formules

**Les paramètres communs.** Avec $c=S_0e^{-qT}N(d_1)-Ke^{-rT}N(d_2)$ et $p=Ke^{-rT}N(-d_2)-S_0e^{-qT}N(-d_1)$ :

$$\boxed{\lambda=\frac{r-q+\sigma^2/2}{\sigma^2}}\qquad\boxed{y=\frac{\ln\big[H^2/(S_0K)\big]}{\sigma\sqrt T}+\lambda\sigma\sqrt T}$$

$$\boxed{x_1=\frac{\ln(S_0/H)}{\sigma\sqrt T}+\lambda\sigma\sqrt T}\qquad\boxed{y_1=\frac{\ln(H/S_0)}{\sigma\sqrt T}+\lambda\sigma\sqrt T}$$

<details class="details--riche">
<summary>

**Les huit cas, classés — les CALLS**

</summary>

**Down-and-in call, cas $H\leqslant K$ :**

$$\boxed{c_{di}=S_0e^{-qT}(H/S_0)^{2\lambda}N(y)-Ke^{-rT}(H/S_0)^{2\lambda-2}N\!\big(y-\sigma\sqrt T\big)}$$

puis $c_{do}=c-c_{di}$.

**Down-and-out call, cas $H>K$ :**

$$\boxed{\begin{aligned}c_{do}=&\ S_0N(x_1)e^{-qT}-Ke^{-rT}N\!\big(x_1-\sigma\sqrt T\big)\\&-S_0e^{-qT}(H/S_0)^{2\lambda}N(y_1)+Ke^{-rT}(H/S_0)^{2\lambda-2}N\!\big(y_1-\sigma\sqrt T\big)\end{aligned}}$$

puis $c_{di}=c-c_{do}$.

**Up-and-out call, cas $H\leqslant K$ :** $\boxed{c_{uo}=0\quad\text{et}\quad c_{ui}=c}$ *(Logique : si la barrière est **sous** le strike, tout chemin qui finit dans la monnaie a **forcément** franchi $H$.)*

**Up-and-in call, cas $H>K$ :**

$$\boxed{\begin{aligned}c_{ui}=&\ S_0N(x_1)e^{-qT}-Ke^{-rT}N\!\big(x_1-\sigma\sqrt T\big)\\&-S_0e^{-qT}(H/S_0)^{2\lambda}\big[N(-y)-N(-y_1)\big]\\&+Ke^{-rT}(H/S_0)^{2\lambda-2}\big[N\!\big(-y+\sigma\sqrt T\big)-N\!\big(-y_1+\sigma\sqrt T\big)\big]\end{aligned}}$$

puis $c_{uo}=c-c_{ui}$.

</details>

<details class="details--riche">
<summary>

**Les huit cas, classés — les PUTS**

</summary>

**Up-and-in put, cas $H\geqslant K$ :**

$$\boxed{p_{ui}=-S_0e^{-qT}(H/S_0)^{2\lambda}N(-y)+Ke^{-rT}(H/S_0)^{2\lambda-2}N\!\big(-y+\sigma\sqrt T\big)}$$

puis $p_{uo}=p-p_{ui}$.

**Up-and-out put, cas $H\leqslant K$ :**

$$\boxed{\begin{aligned}p_{uo}=&\ -S_0N(-x_1)e^{-qT}+Ke^{-rT}N\!\big(-x_1+\sigma\sqrt T\big)\\&+S_0e^{-qT}(H/S_0)^{2\lambda}N(-y_1)-Ke^{-rT}(H/S_0)^{2\lambda-2}N\!\big(-y_1+\sigma\sqrt T\big)\end{aligned}}$$

puis $p_{ui}=p-p_{uo}$.

**Down-and-out put, cas $H\geqslant K$ :** $\boxed{p_{do}=0\quad\text{et}\quad p_{di}=p}$

**Down-and-in put, cas $H<K$ :**

$$\boxed{\begin{aligned}p_{di}=&\ -S_0N(-x_1)e^{-qT}+Ke^{-rT}N\!\big(-x_1+\sigma\sqrt T\big)\\&+S_0e^{-qT}(H/S_0)^{2\lambda}\big[N(y)-N(y_1)\big]\\&-Ke^{-rT}(H/S_0)^{2\lambda-2}\big[N\!\big(y-\sigma\sqrt T\big)-N\!\big(y_1-\sigma\sqrt T\big)\big]\end{aligned}}$$

puis $p_{do}=p-p_{di}$.

</details>

### 4.3 Les trois raffinements pratiques

**A — La fréquence d'observation.** *Les formules analytiques supposent que $S$ est observé **EN CONTINU**. Souvent le contrat stipule une observation **périodique** — par exemple **une fois par jour à midi**.* La correction de **Broadie, Glasserman et Kou** (1997) :

$$\boxed{H\ \longrightarrow\ H\,e^{+0{,}5826\,\sigma\sqrt{T/m}}\quad\text{pour une option }up\text{-and-in / }up\text{-and-out}}$$

$$\boxed{H\ \longrightarrow\ H\,e^{-0{,}5826\,\sigma\sqrt{T/m}}\quad\text{pour une option }down\text{-and-in / }down\text{-and-out}}$$

où $m$ est le **nombre d'observations** ($T/m$ = l'intervalle entre observations).

> **La logique du signe :** l'observation discrète rend la barrière **plus difficile à franchir**, donc on **l'éloigne** du prix courant.

**B — Le vega négatif.** ***Les options à barrière ont souvent des propriétés très différentes des options ordinaires : par exemple, PARFOIS LE VEGA EST NÉGATIF.*** *Considérons un **up-and-out call** quand le prix est proche de la barrière : **quand la volatilité augmente, la probabilité de toucher la barrière augmente**. Une hausse de volatilité peut donc **FAIRE BAISSER** le prix de l'option à barrière.*

**C — Les options parisiennes.** *Un inconvénient des barrières classiques : **un « pic » du prix peut faire naître ou mourir l'option**. Une structure alternative est **l'option PARISIENNE, où le prix doit rester au-dessus ou au-dessous de la barrière PENDANT UNE CERTAINE DURÉE**.* Exemple : *un put parisien down-and-out de strike **90 %** du prix initial et de barrière **75 %** peut stipuler que l'option est désactivée **si le prix reste sous la barrière pendant 50 jours** — la confirmation précisant s'il s'agit d'une **« période continue de 50 jours »** ou de **« 50 jours quelconques pendant la vie de l'option »**. **Les parisiennes sont plus difficiles à valoriser** ; Monte-Carlo et arbres binomiaux avec les améliorations du chapitre 26.*

## 🟠 Concept 5 — Les options binaires

> ***Options à payoff DISCONTINU.***

| Type | Payoff | Valeur |
|---|---|---|
| ***Cash-or-nothing call*** | **rien** si $S_T<K$, un montant **fixe $Q$** si $S_T>K$ | $\boxed{Qe^{-rT}N(d_2)}$ |
| ***Cash-or-nothing put*** | $Q$ si $S_T<K$, rien sinon | $\boxed{Qe^{-rT}N(-d_2)}$ |
| ***Asset-or-nothing call*** | rien si $S_T<K$, **le prix de l'actif** si $S_T>K$ | $\boxed{S_0e^{-qT}N(d_1)}$ |
| ***Asset-or-nothing put*** | rien si $S_T>K$, le prix de l'actif si $S_T<K$ | $\boxed{S_0e^{-qT}N(-d_1)}$ |

*La logique du cash-or-nothing : **en monde risque-neutre, la probabilité que le prix soit au-dessus du strike à maturité est $N(d_2)$**.*

> ⚠️ **La décomposition à connaître par cœur.**
>
> $$\boxed{\text{Call européen ordinaire}=\text{asset-or-nothing call LONG}+\text{cash-or-nothing call COURT (avec }Q=K)}$$
>
> $$\boxed{\text{Put européen ordinaire}=\text{cash-or-nothing put LONG (}Q=K)+\text{asset-or-nothing put COURT}}$$
>
> *Vérification immédiate : $S_0e^{-qT}N(d_1)-Ke^{-rT}N(d_2)$ — c'est exactement Black-Scholes.*

## 🔴 Concept 6 — Les options lookback

### 6.1 Les lookbacks flottants

> ***Le payoff dépend du MAXIMUM ou du MINIMUM du prix atteint pendant la vie de l'option.***

| Type | Payoff | Interprétation |
|---|---|---|
| ***Floating lookback call*** | $S_T-S_{\min}$ | *une façon d'**ACHETER l'actif au prix le plus BAS** atteint pendant la vie de l'option* |
| ***Floating lookback put*** | $S_{\max}-S_T$ | *une façon de **VENDRE l'actif au prix le plus HAUT** atteint* |

**Les formules (Goldman-Sosin-Gatto 1979, Garman 1989) :**

$$\boxed{c_{fl}=S_0e^{-qT}N(a_1)-S_0e^{-qT}\frac{\sigma^2}{2(r-q)}N(-a_1)-S_{\min}e^{-rT}\!\left[N(a_2)-\frac{\sigma^2}{2(r-q)}e^{Y_1}N(-a_3)\right]}$$

$$a_1=\frac{\ln(S_0/S_{\min})+(r-q+\sigma^2/2)T}{\sigma\sqrt T}\qquad a_2=a_1-\sigma\sqrt T\qquad a_3=\frac{\ln(S_0/S_{\min})+(-r+q+\sigma^2/2)T}{\sigma\sqrt T}$$

$$Y_1=-\frac{2(r-q-\sigma^2/2)\ln(S_0/S_{\min})}{\sigma^2}$$

$$\boxed{p_{fl}=S_{\max}e^{-rT}\!\left[N(b_1)-\frac{\sigma^2}{2(r-q)}e^{Y_2}N(-b_3)\right]+S_0e^{-qT}\frac{\sigma^2}{2(r-q)}N(-b_2)-S_0e^{-qT}N(b_2)}$$

$$b_1=\frac{\ln(S_{\max}/S_0)+(-r+q+\sigma^2/2)T}{\sigma\sqrt T}\qquad b_2=b_1-\sigma\sqrt T\qquad b_3=\frac{\ln(S_{\max}/S_0)+(r-q-\sigma^2/2)T}{\sigma\sqrt T}$$

$$Y_2=\frac{2(r-q-\sigma^2/2)\ln(S_{\max}/S_0)}{\sigma^2}$$

⚠️ *$S_{\min}$ et $S_{\max}$ sont les extrêmes **atteints À CE JOUR**. **Si le lookback vient d'être émis, $S_{\min}=S_{\max}=S_0$.***

<details class="details--riche">
<summary>

**Exemple 25.2 — un lookback flottant à l'émission, recalculé**

</summary>

**Données.** Action sans dividende, $S_0=50$, $\sigma=40\,\%$, $r=10\,\%$, $T=3$ mois. Donc $S_{\max}=S_{\min}=50$, $q=0$, $T=0{,}25$.

*Étape 1 — les paramètres du put.* Comme $S_{\max}=S_0$, le logarithme est nul :

$$b_1=\frac{0+(-0{,}1+0{,}08)\times0{,}25}{0{,}4\times0{,}5}=\frac{-0{,}005}{0{,}2}=\mathbf{-0{,}025}$$

$$b_2=b_1-0{,}2=\mathbf{-0{,}225}\qquad b_3=\frac{0+(0{,}1-0{,}08)\times0{,}25}{0{,}2}=\mathbf{0{,}025}\qquad Y_2=\mathbf{0}$$

*Étape 2 — la valeur :*

$$\boxed{p_{fl}=\mathbf{7{,}79}}$$

*Étape 3 — le call correspondant, sur la même action :*

$$\boxed{c_{fl}=\mathbf{8{,}04}}$$

> **Le contrôle de bon sens :** le call est plus cher que le put parce que **le drift risque-neutre est positif** ($r-q=10\,\%>0$), ce qui favorise $S_T-S_{\min}$.

</details>

### 6.2 Les lookbacks fixes

*Dans un **lookback FIXE**, un strike est spécifié :*

| Type | Payoff |
|---|---|
| **Fixed lookback call** | comme un call européen ordinaire, **sauf que $S_T$ est remplacé par $S_{\max}$** |
| **Fixed lookback put** | comme un put européen ordinaire, **sauf que $S_T$ est remplacé par $S_{\min}$** |

**L'argument à la parité put-call** *(Wong et Kwok, 2003)*. En posant $S^\ast_{\max}=\max(S_{\max},K)$ et $S^\ast_{\min}=\min(S_{\min},K)$ :

$$\boxed{c_{\text{fix}}=p_{fl}^\ast+S_0e^{-qT}-Ke^{-rT}}\qquad\boxed{p_{\text{fix}}=c_{fl}^\ast+Ke^{-rT}-S_0e^{-qT}}$$

où $p_{fl}^\ast$ est la valeur d'un **lookback flottant PUT** de même durée, **avec $S_{\max}$ remplacé par $S^\ast_{\max}$**, et $c_{fl}^\ast$ le **lookback flottant CALL** avec $S_{\min}$ remplacé par $S^\ast_{\min}$.

> ⚠️ ***Cela montre que les équations pour les lookbacks FLOTTANTS peuvent être modifiées pour valoriser les lookbacks FIXES.***

⚠️ **Les deux mises en garde.** *Les lookbacks sont **séduisants pour les investisseurs, mais TRÈS CHERS** comparés aux options ordinaires. Comme pour les barrières, **la valeur est susceptible d'être sensible à la FRÉQUENCE d'observation** ; Broadie, Glasserman et Kou fournissent aussi un ajustement pour le cas discret.*

## 🟠 Concept 7 — Les shout options

> ***Une option européenne où le détenteur peut « CRIER » au vendeur UNE fois pendant sa vie. À la fin, le détenteur reçoit SOIT le payoff européen habituel, SOIT la valeur intrinsèque au moment du cri — LE PLUS GRAND DES DEUX.***

**L'illustration.** *Strike **50 dollars** ; le détenteur d'un call crie quand le prix est **60 dollars**.*

| Prix final | Payoff |
|---|---|
| $S_T<60$ | **10 dollars** (le cri a « verrouillé » la valeur intrinsèque) |
| $S_T>60$ | **$S_T-50$** (le payoff normal, plus avantageux) |

<details class="details--riche">
<summary>

**La décomposition et la méthode de valorisation**

</summary>

*Étape 1 — le payoff si l'on crie en $\tau$ quand le prix est $S_\tau$ :*

$$\boxed{\max(0,\ S_T-S_\tau)+(S_\tau-K)}$$

*Étape 2 — la valeur en $\tau$ si l'on crie :* la **valeur actuelle de $S_\tau-K$** (reçu en $T$) **plus la valeur d'une option européenne de strike $S_\tau$**. Cette dernière se calcule par **Black-Scholes-Merton**.

*Étape 3 — la méthode.* On construit un **arbre binomial ou trinomial** de la manière habituelle. **En remontant l'arbre, on calcule à chaque nœud la valeur SI l'on crie et la valeur SI l'on ne crie pas ; le prix au nœud est le PLUS GRAND des deux.**

> ⚠️ ***La procédure est donc similaire à celle de valorisation d'une américaine ordinaire.***

**Le positionnement :** *une shout option a **certaines des caractéristiques d'un lookback, mais est considérablement MOINS CHÈRE**.*

</details>

## 🔴 Concept 8 — Les options asiatiques

### 8.1 Le principe et l'ajustement lognormal

> ***Options dont le payoff dépend de la MOYENNE ARITHMÉTIQUE du prix pendant la vie de l'option.***

$$\text{Average price call}:\ \max(0,S_{\text{ave}}-K)\qquad\text{Average price put}:\ \max(0,K-S_{\text{ave}})$$

*Elles sont **moins chères** que les options ordinaires et **sans doute plus adaptées** à certains besoins des trésoriers. Exemple : **un trésorier américain attend 100 millions de dollars australiens répartis uniformément sur l'année** en provenance de sa filiale australienne. Il s'intéresse à une option **garantissant que le taux de change MOYEN réalisé pendant l'année dépasse un certain niveau** — **un average price put y parvient plus efficacement que des puts ordinaires**.*

**La méthode de Turnbull et Wakeman (1991).** *Quand l'hypothèse habituelle est faite sur le processus du prix, **la moyenne GÉOMÉTRIQUE est exactement lognormale et la moyenne ARITHMÉTIQUE est approximativement lognormale**. L'approche populaire : **ajuster une loi lognormale aux DEUX PREMIERS MOMENTS de $S_{\text{ave}}$ et utiliser le modèle de Black**.*

$$\boxed{F_0=M_1}\;\text{(25.3)}\qquad\boxed{\sigma^2=\frac1T\ln\frac{M_2}{M_1^2}}\;\text{(25.4)}$$

<details class="details--riche">
<summary>

**Les moments — moyenne continue, puis moyenne discrète**

</summary>

**Moyenne calculée en CONTINU, avec $r$, $q$, $\sigma$ constants :**

$$\boxed{M_1=\frac{e^{(r-q)T}-1}{(r-q)T}\,S_0}$$

$$\boxed{M_2=\frac{2e^{[2(r-q)+\sigma^2]T}S_0^2}{(r-q+\sigma^2)(2r-2q+\sigma^2)T^2}+\frac{2S_0^2}{(r-q)T^2}\left[\frac{1}{2(r-q)+\sigma^2}-\frac{e^{(r-q)T}}{r-q+\sigma^2}\right]}$$

**Moyenne calculée à partir d'observations aux dates $T_i$ ($1\leqslant i\leqslant m$) :**

$$\boxed{M_1=\frac1m\sum_{i=1}^{m}F_i}\qquad\boxed{M_2=\frac{1}{m^2}\left[\sum_{i=1}^{m}F_i^2e^{\sigma_i^2T_i}+2\sum_{j=1}^{m}\sum_{i=1}^{j-1}F_iF_je^{\sigma_i^2T_i}\right]}$$

où $F_i$ et $\sigma_i$ sont le **prix forward** et la **volatilité implicite** pour la maturité $T_i$.

⚠️ **Noter la subtilité du terme croisé :** c'est $e^{\sigma_i^2T_i}$ avec **l'indice $i$, le PLUS PETIT des deux** — c'est la covariance entre $S_{T_i}$ et $S_{T_j}$, gouvernée par la variance accumulée jusqu'à la **première** des deux dates.

</details>

<details class="details--riche">
<summary>

**Exemple 25.3 — une asiatique à l'émission, et l'effet du nombre d'observations**

</summary>

**Données.** Action sans dividende, $S_0=50$, $K=50$, $\sigma=40\,\%$, $r=10\,\%$, $T=1$ an, $q=0$.

*Étape 1 — les deux moments, moyenne continue :*

$$M_1=\frac{e^{0{,}1}-1}{0{,}1}\times50=\mathbf{52{,}59}\qquad M_2=\mathbf{2\,922{,}76}$$

*Étape 2 — les paramètres de Black :*

$$F_0=M_1=\mathbf{52{,}59}\qquad\sigma=\sqrt{\frac{1}{1}\ln\frac{2\,922{,}76}{52{,}59^2}}=\mathbf{23{,}54\,\%}$$

> **Le fait à retenir :** ***la volatilité effective de la MOYENNE (23,54 %) est bien inférieure à celle de l'actif (40 %)*** — c'est exactement pourquoi les asiatiques sont moins chères.

*Étape 3 — appliquer le modèle de Black avec $K=50$, $T=1$, $r=0{,}1$ :*

$$\boxed{\text{valeur}=\mathbf{5{,}62}}$$

*Étape 4 — l'effet du nombre d'observations :*

| Nombre d'observations | 12 | 52 | 250 | continu |
|---|---|---|---|---|
| **Prix** | **6,00** | **5,70** | **5,63** | **5,62** |

> **La lecture :** *moins on observe, **plus la moyenne est volatile**, **plus l'option est chère** — et la convergence vers le cas continu est **rapide**.*

</details>

### 8.2 Une asiatique en cours de vie

<details class="details--riche">
<summary>

**Le changement de strike $K^\ast$ — la manipulation à connaître**

</summary>

**Cadre.** La période de moyennage comprend une période **écoulée** de durée $t_1$ (prix déjà observés, moyenne $\bar S$) et une période **future** de durée $t_2$ (la vie restante).

*Étape 1 — le payoff de l'average price call :*

$$\max\!\left(\frac{\bar St_1+S_{\text{ave}}t_2}{t_1+t_2}-K,\ 0\right)$$

*Étape 2 — factoriser $\dfrac{t_2}{t_1+t_2}$ :*

$$=\frac{t_2}{t_1+t_2}\max\big(S_{\text{ave}}-K^\ast,\ 0\big)\qquad\text{avec}\qquad\boxed{K^\ast=\frac{t_1+t_2}{t_2}K-\frac{t_1}{t_2}\bar S}$$

*Étape 3 — les deux régimes.*

| Régime | Traitement |
|---|---|
| $K^\ast>0$ | valoriser **comme une asiatique neuve**, en changeant le strike de $K$ en $K^\ast$, **puis multiplier le résultat par $\dfrac{t_2}{t_1+t_2}$** |
| $K^\ast<0$ | ***l'option est CERTAINE d'être exercée*** : la valoriser comme un **contrat forward** $$\frac{t_2}{t_1+t_2}\big[M_1e^{-rt_2}-K^\ast e^{-rt_2}\big]$$ |

> **Le sens de $K^\ast<0$ :** la moyenne déjà réalisée $\bar S$ est **si élevée** que même une moyenne future nulle laisserait l'option dans la monnaie.

</details>

### 8.3 Les *average strike options*

| Type | Payoff |
|---|---|
| **Average strike call** | $\max(0,\ S_T-S_{\text{ave}})$ |
| **Average strike put** | $\max(0,\ S_{\text{ave}}-S_T)$ |

*Elles peuvent **garantir que le prix MOYEN payé pour un actif acheté fréquemment sur une période n'est pas supérieur au prix final** — ou que le prix moyen **reçu n'est pas inférieur** au prix final.* ***Elles se valorisent comme une OPTION D'ÉCHANGE d'un actif contre un autre, en supposant $S_{\text{ave}}$ lognormale*** (§9).

## 🔴 Concept 9 — Options sur plusieurs actifs

### 9.1 La formule de Margrabe

*Une **option d'échange** donne le droit d'abandonner un actif valant $U_T$ en $T$ et de recevoir en échange un actif valant $V_T$ :*

$$\text{Payoff}=\max(V_T-U_T,\ 0)$$

*Contextes : **une option d'acheter des yens avec des dollars australiens** est, du point de vue d'un investisseur américain, une option d'échanger un actif en devise étrangère contre un autre. **Une offre publique d'échange d'actions** est une option d'échanger des actions d'une société contre celles d'une autre.*

**La formule (Margrabe, 1978) :**

$$\boxed{V_0e^{-q_VT}N(d_1)-U_0e^{-q_UT}N(d_2)}\;\text{(25.5)}$$

$$d_1=\frac{\ln(V_0/U_0)+(q_U-q_V+\hat\sigma^2/2)T}{\hat\sigma\sqrt T}\qquad d_2=d_1-\hat\sigma\sqrt T$$

$$\boxed{\hat\sigma=\sqrt{\sigma_U^2+\sigma_V^2-2\rho\sigma_U\sigma_V}}$$

> ⚠️ ***Il est intéressant de noter que (25.5) est INDÉPENDANTE DU TAUX SANS RISQUE $r$. La raison : quand $r$ augmente, le taux de croissance des DEUX prix en monde risque-neutre augmente, mais cela est EXACTEMENT COMPENSÉ par la hausse du taux d'actualisation.***

**L'interprétation.** *$\hat\sigma$ est **la volatilité de $V/U$**. La comparaison avec la formule de Black-Scholes montre que **le prix de l'option est le même que celui de $U_0$ calls européens sur un actif valant $V/U$, avec un strike de 1,0, un taux sans risque de $q_U$ et un rendement de dividende de $q_V$**.*

**La version américaine** *(Rubinstein, 1991)* : *elle peut être vue comme **$U_0$ options AMÉRICAINES d'acheter un actif valant $V/U$ pour 1,0, avec un taux sans risque $q_U$ et un rendement $q_V$** — donc valorisable par **arbre binomial** (fiche 92).

$$\boxed{\min(U_T,V_T)=V_T-\max(V_T-U_T,0)}\qquad\boxed{\max(U_T,V_T)=U_T+\max(V_T-U_T,0)}$$

*« Une option d'obtenir **le meilleur ou le pire** de deux actifs peut être vue comme **une position dans l'un des actifs combinée à une option de l'échanger contre l'autre**. »*

### 9.2 Arc-en-ciel et paniers

**Les options arc-en-ciel (*rainbow options*)** : *options portant sur **deux ou plusieurs actifs risqués**. **Un exemple est le contrat futures sur obligations du CBOT** (fiche 79) : le vendeur peut choisir entre **un grand nombre d'obligations différentes** à la livraison.

**L'option panier européenne** — probablement la plus populaire : *le payoff dépend de la valeur d'un **portefeuille (panier) d'actifs**, généralement des actions individuelles, des indices, ou des devises.*

| Méthode | Verdict |
|---|---|
| **Monte-Carlo**, en supposant des mouvements browniens géométriques **corrélés** | correcte mais **lente** |
| **Calculer les deux premiers moments du panier à maturité en monde risque-neutre**, puis supposer le panier **lognormal** et appliquer le modèle de Black avec (25.3)-(25.4) | ***beaucoup plus rapide*** |

$$\boxed{M_1=\sum_{i=1}^{n}F_i\qquad M_2=\sum_{i=1}^{n}\sum_{j=1}^{n}F_iF_j\,e^{\rho_{ij}\sigma_i\sigma_jT}}$$

## 🔴 Concept 10 — Swaps de volatilité et de variance

### 10.1 Définitions

**La volatilité réalisée**, calculée comme au chapitre 14 mais **en supposant le rendement quotidien moyen NUL**, avec $n$ observations quotidiennes :

$$\boxed{\bar\sigma=\sqrt{\frac{252}{n-2}\sum_{i=1}^{n-1}\left[\ln\frac{S_{i+1}}{S_i}\right]^2}}$$

*(Parfois $n-1$ remplace $n-2$ dans cette formule.)*

| Swap | Payoff au payeur du fixe | Notionnel |
|---|---|---|
| **Swap de volatilité** | $L_{\text{vol}}(\bar\sigma-K)$ | $L_{\text{vol}}$ |
| **Swap de variance** | $L_{\text{var}}(\bar V-V_K)$ avec $\bar V=\bar\sigma^2$ | $L_{\text{var}}$ |

$$\boxed{\text{Convention usuelle}\ :\ L_{\text{var}}=\frac{L_{\text{vol}}}{2K}}$$

> ⚠️ ***Alors qu'une option fournit une exposition COMPLEXE au prix ET à la volatilité, un swap de volatilité est plus simple : il n'a d'exposition QU'À LA VOLATILITÉ.***
>
> ⚠️ ***Les swaps de VARIANCE sont plus faciles à valoriser que les swaps de volatilité, parce que le taux de variance entre 0 et $T$ peut être RÉPLIQUÉ par un portefeuille de puts et de calls.***

### 10.2 La réplication d'un swap de variance

Pour **n'importe quelle valeur $S^\ast$** du prix de l'actif, la variance moyenne espérée entre 0 et $T$ vaut :

$$\boxed{\hat E(\bar V)=\frac{2}{T}\ln\frac{F_0}{S^\ast}-\frac{2}{T}\left(\frac{F_0}{S^\ast}-1\right)+\frac{2}{T}\left[\int_{0}^{S^\ast}\frac{1}{K^2}e^{rT}p(K)\,dK+\int_{S^\ast}^{\infty}\frac{1}{K^2}e^{rT}c(K)\,dK\right]}\;\text{(25.6)}$$

où $F_0$ est le **prix forward** pour une échéance $T$, $c(K)$ et $p(K)$ les prix de call et put européens de strike $K$ et maturité $T$.

$$\boxed{\text{Valeur du swap (recevoir la variance réalisée)}=L_{\text{var}}\big[\hat E(\bar V)-V_K\big]e^{-rT}}\;\text{(25.7)}$$

**L'implémentation discrète.** Avec des strikes $K_1<K_2<\cdots<K_n$, on pose $S^\ast=$ **le premier strike SOUS $F_0$** et :

$$\boxed{\int_{0}^{S^\ast}\frac{e^{rT}p(K)}{K^2}dK+\int_{S^\ast}^{\infty}\frac{e^{rT}c(K)}{K^2}dK\ \approx\ \sum_{i=1}^{n}\frac{\Delta K_i}{K_i^2}e^{rT}Q(K_i)}\;\text{(25.8)}$$

| Élément | Définition |
|---|---|
| $\Delta K_i$ | $0{,}5(K_{i+1}-K_{i-1})$ pour $2\leqslant i\leqslant n-1$ ; $\Delta K_1=K_2-K_1$ ; $\Delta K_n=K_n-K_{n-1}$ |
| $Q(K_i)$ | le prix d'un **PUT** si $K_i<S^\ast$ ; le prix d'un **CALL** si $K_i>S^\ast$ ; **la MOYENNE des deux** si $K_i=S^\ast$ |

> **Le principe :** on n'utilise **que des options HORS DE LA MONNAIE** — les plus liquides.

<details class="details--riche">
<summary>

**Exemple 25.4 — un swap de variance à 3 mois, entièrement recalculé**

</summary>

**Données.** Contrat de 3 mois pour **recevoir** la variance réalisée d'un indice et **payer** un taux de variance de **0,045**, sur un principal de **100 millions**. $r=4\,\%$, $q=1\,\%$, indice à **1 020**. Volatilités implicites à 3 mois :

| Strike | 800 | 850 | 900 | 950 | **1 000** | 1 050 | 1 100 | 1 150 | 1 200 |
|---|---|---|---|---|---|---|---|---|---|
| **Vol. implicite** | 29 % | 28 % | 27 % | 26 % | **25 %** | 24 % | 23 % | 22 % | 21 % |
| **$Q(K_i)$** | 2,22 | 5,22 | 11,05 | 21,27 | **51,21** | 38,94 | 20,69 | 9,44 | 3,57 |

*Étape 1 — le prix forward :*

$$F_0=1\,020\,e^{(0{,}04-0{,}01)\times0{,}25}=\mathbf{1\,027{,}68}$$

*Étape 2 — le choix de $S^\ast$ :* le premier strike **sous** $F_0$, donc $S^\ast=\mathbf{1\,000}$. **Les $Q$ sont donc des PUTS pour 800 à 950, la MOYENNE call/put pour 1 000, et des CALLS pour 1 050 à 1 200.**

*Étape 3 — la somme.* Ici $n=9$ et $\Delta K_i=50$ pour tout $i$ :

$$\sum_{i=1}^{9}\frac{50}{K_i^2}e^{0{,}04\times0{,}25}Q(K_i)=\mathbf{0{,}008139}$$

*Étape 4 — appliquer (25.6) :*

$$\hat E(\bar V)=\frac{2}{0{,}25}\ln\frac{1\,027{,}68}{1\,000}-\frac{2}{0{,}25}\left(\frac{1\,027{,}68}{1\,000}-1\right)+\frac{2}{0{,}25}\times0{,}008139=\mathbf{0{,}0621}$$

*Étape 5 — la valeur, en millions de dollars :*

$$100\times(0{,}0621-0{,}045)\,e^{-0{,}04\times0{,}25}=\mathbf{1{,}69\ \text{millions}}$$

</details>

### 10.3 La valorisation d'un swap de volatilité

<details class="details--riche">
<summary>

**Le développement en série — pourquoi $\hat E(\bar\sigma)\ne\sqrt{\hat E(\bar V)}$**

</summary>

*Étape 1 — écrire $\bar\sigma$ en factorisant :*

$$\bar\sigma=\sqrt{\hat E(\bar V)}\ \sqrt{1+\frac{\bar V-\hat E(\bar V)}{\hat E(\bar V)}}$$

*Étape 2 — développer la racine en série :*

$$\bar\sigma=\sqrt{\hat E(\bar V)}\left\{1+\frac{\bar V-\hat E(\bar V)}{2\hat E(\bar V)}-\frac18\left[\frac{\bar V-\hat E(\bar V)}{\hat E(\bar V)}\right]^2\right\}$$

*Étape 3 — prendre l'espérance.* Le terme linéaire **disparaît** ; le terme quadratique donne la **variance** :

$$\boxed{\hat E(\bar\sigma)=\sqrt{\hat E(\bar V)}\left[1-\frac18\frac{\text{var}(\bar V)}{\hat E(\bar V)^2}\right]}\;\text{(25.9)}$$

> ⚠️ ***La valorisation d'un swap de volatilité requiert donc une ESTIMATION DE LA VARIANCE du taux de variance moyen pendant la vie du contrat*** — information que la réplication seule ne fournit **pas**. C'est exactement pourquoi les swaps de variance sont plus faciles.

$$\boxed{\text{Valeur}=L_{\text{vol}}\big[\hat E(\bar\sigma)-K\big]e^{-rT}}$$

**Exemple 25.5.** *Même situation que l'exemple 25.4 ; on reçoit la volatilité réalisée et on paie **23 %** sur **100 millions**. $\hat E(\bar V)=0{,}0621$ ; l'écart-type de la variance moyenne sur 3 mois est estimé à **0,01**, donc $\text{var}(\bar V)=0{,}0001$ :*

$$\hat E(\bar\sigma)=\sqrt{0{,}0621}\left(1-\frac18\times\frac{0{,}0001}{0{,}0621^2}\right)=\mathbf{0{,}2484}$$

$$\text{Valeur}=100\times(0{,}2484-0{,}23)\,e^{-0{,}04\times0{,}25}=\mathbf{1{,}82\ \text{millions}}$$

⚠️ **Noter l'effet de la correction :** $\sqrt{0{,}0621}=0{,}2492$ ; la correction de convexité **abaisse** l'espérance à 0,2484.

</details>

### 10.4 L'indice VIX

*Dans (25.6), la fonction $\ln$ peut être approchée par les **deux premiers termes** d'un développement en série :*

$$\ln\frac{F_0}{S^\ast}=\left(\frac{F_0}{S^\ast}-1\right)-\frac12\left(\frac{F_0}{S^\ast}-1\right)^2$$

En substituant, **le premier terme s'annule contre le deuxième** et il reste :

$$\boxed{\hat E(\bar V)\,T=-\left(\frac{F_0}{S^\ast}-1\right)^2+2\sum_{i=1}^{n}\frac{\Delta K_i}{K_i^2}e^{rT}Q(K_i)}\;\text{(25.10)}$$

> ***Depuis 2004, l'indice de volatilité VIX est fondé sur l'équation (25.10).***

**La procédure quotidienne :**

| Étape | Contenu |
|---|---|
| **1** | calculer $\hat E(\bar V)T$ pour les options qui se négocient et dont les maturités encadrent **immédiatement 30 jours** |
| **2** | la **variance cumulée risque-neutre à 30 jours** s'obtient de ces deux nombres par **interpolation** |
| **3** | multiplier par **365/30** |
| **4** | l'indice est la **racine carrée** du résultat |

## 🟠 Concept 11 — La réplication statique d'options

### 11.1 Le principe

<details class="details--riche">
<summary>

**Business Snapshot 25.1 — la couverture en delta est-elle plus facile ou plus difficile pour les exotiques ?**

</summary>

*On peut aborder la couverture d'une exotique en créant une position **delta-neutre** et en rééquilibrant fréquemment. **Certaines exotiques sont alors PLUS FACILES à couvrir que les vanilles, d'autres PLUS DIFFICILES.***

|  | **Facile : l'option asiatique** | **Difficile : l'option à barrière** |
|---|---|---|
| Mécanisme | *avec le temps, **on observe de plus en plus des prix qui serviront à calculer la moyenne finale** : **notre incertitude sur le payoff DÉCROÎT avec le temps**. L'option devient **progressivement plus facile à couvrir**. **Dans les derniers jours, le delta tend toujours vers zéro**, car les mouvements de prix n'ont plus qu'un impact minime* | *un down-and-out call sur une devise quand le change est à **0,0005 au-dessus de la barrière** : si la barrière est touchée, l'option **ne vaut RIEN** ; sinon elle peut être **très précieuse**. **Le delta est DISCONTINU à la barrière, ce qui rend la couverture conventionnelle très difficile*** |

</details>

> ***LE PRINCIPE FONDAMENTAL : si deux portefeuilles valent la même chose sur une certaine FRONTIÈRE, ils valent aussi la même chose en TOUT POINT INTÉRIEUR à cette frontière.***

*La technique consiste à **chercher un portefeuille d'options activement négociées qui réplique approximativement l'exotique**. **Le shorter fournit la couverture.***

### 11.2 L'exemple complet

<details class="details--riche">
<summary>

**Répliquer un up-and-out call — les quatre options, pas à pas**

</summary>

**Le produit à répliquer.** Up-and-out call à **9 mois** sur une action sans dividende : $S_0=50$, $K=50$, barrière $H=60$, $r=10\,\%$, $\sigma=30\,\%$.

*Étape 1 — choisir la frontière.* On prend $S=60$ **et** $t=0{,}75$. Les valeurs de l'option sur cette frontière sont :

$$f(S;0{,}75)=\max(S-50,0)\ \text{ pour }S<60\qquad\qquad f(60;t)=0\ \text{ pour }0\leqslant t\leqslant0{,}75$$

*Étape 2 — apparier la PREMIÈRE frontière (l'horizontale, à maturité).* L'option naturelle est un **call européen à 9 mois de strike 50** : c'est **l'option A**, en quantité **1**.

*Étape 3 — la procédure pour la seconde frontière (la verticale, $S=60$).*

| Sous-étape | Contenu |
|---|---|
| 1 | diviser la vie en $N$ pas de longueur $\Delta t$ |
| 2 | choisir un call de strike **60** et maturité $N\Delta t$ (= 9 mois) pour apparier le point $\{60;(N-1)\Delta t\}$ |
| 3 | choisir un call de strike **60** et maturité $(N-1)\Delta t$ pour apparier $\{60;(N-2)\Delta t\}$ |
| … | et ainsi de suite |

> ⚠️ **La clé de la construction.** *Les options sont choisies **EN SÉQUENCE de sorte qu'elles aient une valeur NULLE sur les parties de la frontière déjà appariées par les options précédentes**. Le call de strike 60 qui mature à 9 mois a une valeur nulle sur la frontière verticale appariée par l'option A ; l'option qui mature en $i\Delta t$ a une valeur nulle au point $\{60;i\Delta t\}$, apparié par l'option qui mature en $(i+1)\Delta t$.*

*Étape 4 — les calculs, avec $\Delta t=0{,}25$.*

| Point à apparier | Valeur déjà en place | Option ajoutée | Sa valeur au point | **Position** |
|---|---|---|---|---|
| $\{60;0{,}5\}$ | A vaut **11,54** | **B** (strike 60, 9 mois) vaut **4,33** | 4,33 | $-11{,}54/4{,}33=\mathbf{-2{,}66}$ |
| $\{60;0{,}25\}$ | A + B valent **$-4{,}21$** | **C** (strike 60, 6 mois) vaut **4,33** | 4,33 | $4{,}21/4{,}33=\mathbf{+0{,}97}$ |
| $\{60;0\}$ | A + B + C valent $-1{,}22$ | **D** (strike 60, 3 mois) vaut **4,33** | 4,33 | $\mathbf{+0{,}28}$ |

**Table 25.1 — le portefeuille répliquant :**

| Option | Strike | Maturité (ans) | Position | Valeur initiale |
|---|---|---|---|---|
| **A** | 50 | 0,75 | $+1{,}00$ | $\mathbf{+6{,}99}$ |
| **B** | 60 | 0,75 | $-2{,}66$ | $\mathbf{-8{,}21}$ |
| **C** | 60 | 0,50 | $+0{,}97$ | $\mathbf{+1{,}78}$ |
| **D** | 60 | 0,25 | $+0{,}28$ | $\mathbf{+0{,}17}$ |
|  |  |  | **Total** | $\mathbf{+0{,}73}$ |

*Étape 5 — la comparaison et la convergence.* La formule analytique de l'up-and-out call donne **0,31**. Le portefeuille répliquant vaut **0,73** parce qu'il **n'apparie la seconde frontière qu'en TROIS points**.

| Points appariés sur la seconde frontière | 3 | 18 (tous les demi-mois) | 100 |
|---|---|---|---|
| **Valeur du portefeuille** | **0,73** | **0,38** | **0,32** |

⚠️ *(La note de Hull : il n'est **pas obligatoire** que les options aient une valeur nulle sur les parties déjà appariées. **Si l'on veut apparier $K$ points, on peut choisir $K$ options et résoudre un système de $K$ équations LINÉAIRES** pour déterminer les positions.)*

</details>

**L'usage et l'avantage.**

> ***Pour couvrir un dérivé, le portefeuille qui réplique ses conditions aux limites doit être SHORTÉ. Le portefeuille doit être DÉBOUCLÉ dès qu'une partie quelconque de la frontière est atteinte.***
>
> ⚠️ ***La réplication statique a l'avantage sur la couverture en delta de NE PAS EXIGER DE RÉÉQUILIBRAGE FRÉQUENT. Elle s'applique à une large gamme de dérivés, et l'utilisateur a beaucoup de FLEXIBILITÉ dans le choix de la frontière à apparier et des options à utiliser.***

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| Deux strikes, un déclenchant, un soustrait | **gap option** : $K_2$ dans $d_1,d_2$ ; $K_1$ dans le terme actualisé |
| « à la monnaie, commençant dans $T_1$ » | **forward start** : $c\,e^{-qT_1}$ |
| « série d'options avec réinitialisation du strike » | **cliquet** = 1 ordinaire + $n-1$ forward start |
| Deux dates d'exercice, deux strikes | **option composée** : loi normale **bivariée**, chercher $S^\ast$ |
| « choisir call ou put en $T_1$ » | **chooser** : décomposer par la **parité put-call** |
| « cesse d'exister si », « vient à l'existence si » | **barrière** : identifier le cas, utiliser $\lambda$, $y$, $x_1$, $y_1$, et la **parité in/out** |
| Barrière observée « une fois par jour » | **correction** $He^{\pm0{,}5826\sigma\sqrt{T/m}}$ |
| « verse un montant fixe $Q$ » | **cash-or-nothing** : $Qe^{-rT}N(d_2)$ |
| « verse le prix de l'actif » | **asset-or-nothing** : $S_0e^{-qT}N(d_1)$ |
| « minimum » ou « maximum » atteint | **lookback** ; flottant si pas de strike, **fixe** sinon (passer par la parité) |
| « crier une fois » | **shout** : arbre, comparer crier / ne pas crier |
| « moyenne du prix » | **asiatique** : $M_1$, $M_2$, puis modèle de **Black** |
| Asiatique déjà commencée | calculer $K^\ast$, multiplier par $t_2/(t_1+t_2)$ |
| « échanger un actif contre un autre » | **Margrabe**, avec $\hat\sigma=\sqrt{\sigma_U^2+\sigma_V^2-2\rho\sigma_U\sigma_V}$ |
| « le meilleur / le pire de deux actifs » | décomposer : $\max(U,V)=U+\max(V-U,0)$ |
| Portefeuille d'actifs | **panier** : $M_1=\sum F_i$, $M_2=\sum\sum F_iF_je^{\rho_{ij}\sigma_i\sigma_jT}$ |
| « variance réalisée contre variance fixe » | **réplication** par options hors de la monnaie, (25.6)-(25.8) |
| « volatilité réalisée » | (25.9) — il faut **en plus** $\text{var}(\bar V)$ |
| « couvrir sans rééquilibrer » | **réplication statique** : apparier une frontière |

## Comment résoudre ce type d'exercice

**A — Une option à barrière.**

1. Identifier **up/down**, **in/out**, **call/put** : quatre bits.
2. Comparer $H$ à $K$ pour choisir la bonne formule (certains cas sont **triviaux** : $c_{uo}=0$ si $H\leqslant K$).
3. Calculer $\lambda=\dfrac{r-q+\sigma^2/2}{\sigma^2}$, puis $x_1$, $y_1$, $y$.
4. Appliquer la formule, ou passer par la **parité** $c_{in}+c_{out}=c$ si l'autre côté est plus simple.
5. Si observation discrète, **déplacer $H$** avant tout calcul.

**B — Une option asiatique.**

1. Calculer $M_1$ (première moment) et $M_2$ (second moment).
2. $F_0=M_1$ et $\sigma_{\text{eff}}=\sqrt{\frac1T\ln\frac{M_2}{M_1^2}}$.
3. Appliquer le **modèle de Black** : $e^{-rT}[F_0N(d_1)-KN(d_2)]$ avec $d_1=\frac{\ln(F_0/K)+\sigma_{\text{eff}}^2T/2}{\sigma_{\text{eff}}\sqrt T}$.
4. Contrôle : $\sigma_{\text{eff}}$ doit être **nettement inférieure** à $\sigma$ (ici 23,54 % contre 40 %).
5. Si l'option est en cours, calculer $K^\ast$ **d'abord**, puis multiplier par $t_2/(t_1+t_2)$.

**C — Un swap de variance.**

1. $F_0=S_0e^{(r-q)T}$.
2. $S^\ast=$ le **premier strike sous $F_0$**.
3. Pour chaque strike : **put** si $K_i<S^\ast$, **call** si $K_i>S^\ast$, **moyenne** si $K_i=S^\ast$.
4. $\Delta K_i=0{,}5(K_{i+1}-K_{i-1})$ à l'intérieur, simple écart aux bords.
5. $\hat E(\bar V)=\frac2T\ln\frac{F_0}{S^\ast}-\frac2T\left(\frac{F_0}{S^\ast}-1\right)+\frac2T\sum\frac{\Delta K_i}{K_i^2}e^{rT}Q(K_i)$.
6. Valeur $=L_{\text{var}}[\hat E(\bar V)-V_K]e^{-rT}$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Mettre $K_1$ dans $d_1,d_2$ d'un gap | c'est **$K_2$**, le **seuil de déclenchement**, qui y entre |
| Croire qu'un forward start vaut plus qu'une option ordinaire | avec $q=0$, il vaut **exactement** la même chose |
| Traiter un chooser comme une américaine | c'est un **package** : 1 call $T_2$ + $e^{-q(T_2-T_1)}$ puts de strike $Ke^{-(r-q)(T_2-T_1)}$ à échéance $T_1$ |
| Utiliser la mauvaise branche d'une formule de barrière | **toujours comparer $H$ à $K$ d'abord** |
| Oublier que $c_{uo}=0$ si $H\leqslant K$ | tout chemin finissant dans la monnaie a **forcément** franchi la barrière |
| Déplacer la barrière dans le mauvais sens | **up** : $\times e^{+0{,}5826\sigma\sqrt{T/m}}$ ; **down** : $\times e^{-\dots}$ — on l'**éloigne** toujours |
| Supposer que le vega d'une barrière est positif | il est **souvent négatif** près de la barrière pour une *knock-out* |
| Croire qu'un pic momentané ne déclenche rien | **si**, pour une barrière classique — il faut une **parisienne** pour l'éviter |
| Confondre cash-or-nothing et asset-or-nothing | $N(d_2)$ pour le cash, $N(d_1)$ pour l'actif |
| Oublier de mettre à jour $S_{\min}$ / $S_{\max}$ | à l'émission ils valent $S_0$ ; en cours de vie, **les extrêmes déjà atteints** |
| Valoriser un lookback fixe directement | passer par $S^\ast_{\max}=\max(S_{\max},K)$ et la **parité** de Wong-Kwok |
| Utiliser $\sigma$ de l'actif dans le modèle de Black pour une asiatique | il faut $\sigma_{\text{eff}}$ **déduite de $M_2/M_1^2$** |
| Oublier le facteur $t_2/(t_1+t_2)$ pour une asiatique en cours | il **échelonne** le payoff |
| Oublier que $K^\ast$ peut être négatif | l'option est alors **certaine d'être exercée** : c'est un **forward** |
| Mettre $r$ dans la formule de Margrabe | elle en est **indépendante** |
| Prendre $\hat\sigma=\sigma_U+\sigma_V$ | c'est $\sqrt{\sigma_U^2+\sigma_V^2-2\rho\sigma_U\sigma_V}$ |
| Croire que $\hat E(\bar\sigma)=\sqrt{\hat E(\bar V)}$ | **non** — il faut la correction de convexité (25.9), qui exige $\text{var}(\bar V)$ |
| Utiliser des options dans la monnaie dans la réplication de variance | on n'utilise **que les hors de la monnaie** |
| Croire que la réplication statique donne le prix exact | elle n'apparie qu'un **nombre fini de points** : 0,73 avec 3 points, 0,32 avec 100 |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Hypothèse commune** | l'actif verse $q$ (indice : dividende · devise : $r_f$ · futures : $r$) |
| **Coût nul par report** | $A=ce^{rT}$ ; noms : *break forward*, *Boston option*, *cancelable forward* |
| **Range forward** | call long + put court, **valeurs égales** |
| **Bermudienne** | exercice à **certaines dates** seulement |
| **Gap call** | $S_0e^{-qT}N(d_1)-K_1e^{-rT}N(d_2)$, $d$ calculés avec **$K_2$** |
| **Écart avec le call ordinaire** | $(K_2-K_1)e^{-rT}N(d_2)$ |
| **Exemple 25.1** | put ordinaire **3 436**, gap put **1 896**, réduction **45 %** |
| **Forward start** | $c\,e^{-qT_1}$ |
| **Cliquet** | 1 ordinaire + $n-1$ **forward start** |
| **Composées** | 4 types, loi normale **bivariée** $M(a,b;\sqrt{T_1/T_2})$ |
| **$S^\ast$** | le prix en $T_1$ tel que **l'option vaut $K_1$** |
| **Chooser** | $c+e^{-q(T_2-T_1)}\max(0,Ke^{-(r-q)(T_2-T_1)}-S_1)$ |
| **$\lambda$** | $(r-q+\sigma^2/2)/\sigma^2$ |
| **$y$** | $\dfrac{\ln[H^2/(S_0K)]}{\sigma\sqrt T}+\lambda\sigma\sqrt T$ |
| **$x_1$, $y_1$** | $\dfrac{\ln(S_0/H)}{\sigma\sqrt T}+\lambda\sigma\sqrt T$ · $\dfrac{\ln(H/S_0)}{\sigma\sqrt T}+\lambda\sigma\sqrt T$ |
| **Parité barrière** | $c_{in}+c_{out}=c$ |
| **Cas triviaux** | $c_{uo}=0$ si $H\leqslant K$ · $p_{do}=0$ si $H\geqslant K$ |
| **Observation discrète** | $H\to He^{\pm0{,}5826\sigma\sqrt{T/m}}$ (Broadie-Glasserman-Kou) |
| **Vega d'une barrière** | **parfois négatif** |
| **Parisienne** | il faut **rester** au-delà de la barrière une **durée** donnée |
| **Cash-or-nothing call** | $Qe^{-rT}N(d_2)$ |
| **Asset-or-nothing call** | $S_0e^{-qT}N(d_1)$ |
| **Décomposition du call** | asset-or-nothing **long** + cash-or-nothing **court** ($Q=K$) |
| **Lookback flottant call** | payoff $S_T-S_{\min}$ — acheter **au plus bas** |
| **Lookback flottant put** | payoff $S_{\max}-S_T$ — vendre **au plus haut** |
| **Exemple 25.2** | $b_1=-0{,}025$, $b_2=-0{,}225$, $b_3=0{,}025$, $Y_2=0$ → put **7,79**, call **8,04** |
| **Lookback fixe** | $c_{\text{fix}}=p_{fl}^\ast+S_0e^{-qT}-Ke^{-rT}$ |
| **Shout** | payoff $\max(0,S_T-S_\tau)+(S_\tau-K)$ ; valorisée **par arbre** |
| **Asiatique** | ajuster une lognormale aux **deux premiers moments** |
| **Paramètres de Black** | $F_0=M_1$, $\sigma^2=\frac1T\ln\frac{M_2}{M_1^2}$ |
| **$M_1$ continu** | $\dfrac{e^{(r-q)T}-1}{(r-q)T}S_0$ |
| **Exemple 25.3** | $M_1=52{,}59$, $M_2=2\,922{,}76$, $\sigma=23{,}54\,\%$, prix **5,62** |
| **Effet du nombre d'observations** | 12 → **6,00** · 52 → 5,70 · 250 → 5,63 |
| **Asiatique en cours** | $K^\ast=\frac{t_1+t_2}{t_2}K-\frac{t_1}{t_2}\bar S$, résultat $\times\frac{t_2}{t_1+t_2}$ |
| **Average strike call** | $\max(0,S_T-S_{\text{ave}})$ |
| **Margrabe** | $V_0e^{-q_VT}N(d_1)-U_0e^{-q_UT}N(d_2)$ |
| **$\hat\sigma$** | $\sqrt{\sigma_U^2+\sigma_V^2-2\rho\sigma_U\sigma_V}$ |
| **Propriété remarquable** | **indépendante de $r$** |
| **Meilleur / pire** | $\max(U,V)=U+\max(V-U,0)$ |
| **Panier** | $M_1=\sum F_i$, $M_2=\sum\sum F_iF_je^{\rho_{ij}\sigma_i\sigma_jT}$ |
| **Volatilité réalisée** | $\sqrt{\frac{252}{n-2}\sum[\ln(S_{i+1}/S_i)]^2}$ |
| **Convention de notionnels** | $L_{\text{var}}=L_{\text{vol}}/(2K)$ |
| **Réplication de la variance** | (25.6) : deux termes de forward + intégrale d'options **hors de la monnaie** |
| **Approximation discrète** | $\sum\frac{\Delta K_i}{K_i^2}e^{rT}Q(K_i)$, $S^\ast$ = premier strike **sous** $F_0$ |
| **Exemple 25.4** | $F_0=1\,027{,}68$, somme $=0{,}008139$, $\hat E(\bar V)=0{,}0621$, valeur **1,69 M** |
| **Volatilité** | $\hat E(\bar\sigma)=\sqrt{\hat E(\bar V)}\left[1-\frac18\frac{\text{var}(\bar V)}{\hat E(\bar V)^2}\right]$ |
| **Exemple 25.5** | $\hat E(\bar\sigma)=0{,}2484$, valeur **1,82 M** |
| **VIX** | fondé sur (25.10) **depuis 2004** ; interpolation à 30 jours, $\times365/30$, racine |
| **Réplication statique** | ***même valeur sur la frontière ⇒ même valeur à l'intérieur*** |
| **Table 25.1** | A $+1{,}00$ (+6,99) · B $-2{,}66$ ($-8{,}21$) · C $+0{,}97$ (+1,78) · D $+0{,}28$ (+0,17) → **0,73** |
| **Valeur analytique** | **0,31** ; 18 points → 0,38 ; 100 points → **0,32** |
| **Couverture** | **SHORTER** le portefeuille, le **déboucler** dès que la frontière est atteinte |
| **Facile à couvrir** | l'**asiatique** — le delta tend vers 0 |
| **Difficile** | la **barrière** — delta **discontinu** |

## 🧠 Active Recall

1. Citer quatre raisons pour lesquelles des produits exotiques sont développés.
2. Pourquoi les exotiques sont-elles importantes pour un dealer ?
3. Que vaut $q$ pour un indice ? une devise ? un futures ?
4. Définir un package. Citer cinq exemples.
5. Décrire un *range forward* et donner trois de ses autres noms.
6. Comment convertir n'importe quel dérivé en produit à coût nul ? Écrire le payoff résultant.
7. Citer trois façons dont une américaine peut être non standard.
8. Donner l'exemple du warrant à 7 ans de Hull.
9. Comment valorise-t-on une américaine non standard ?
10. Définir un gap call. Quelle est la différence avec un call ordinaire de strike $K_2$ ?
11. Écrire (25.1) et (25.2). Quel strike entre dans $d_1$ et $d_2$ ?
12. Justifier l'écart $(K_2-K_1)e^{-rT}N(d_2)$.
13. Refaire l'exemple 25.1 en entier, les deux cas.
14. De combien le coût de transfert réduit-il la police ?
15. Dériver la valeur d'un *forward start*. Que vaut-elle si $q=0$ ?
16. Pourquoi les options de salariés y ressemblent-elles ?
17. Décrire la structure d'un cliquet simple. En quoi se décompose-t-il ?
18. Citer deux complications possibles d'un cliquet.
19. Citer les quatre types d'options composées. Combien de strikes et de dates ?
20. Quand une option composée est-elle exercée à la première date ?
21. Écrire la formule du call sur call et définir $M(a,b;\rho)$ et $S^\ast$.
22. Quelle est la corrélation utilisée dans les formules composées ?
23. Qu'est-ce qu'un *chooser* ? Quelle est sa valeur en $T_1$ ?
24. Dériver la décomposition du chooser par la parité put-call.
25. Quels sont les deux composants du package ? Quelle est leur maturité respective ?
26. Quand un chooser n'est-il **pas** un package ?
27. Distinguer *knock-in* et *knock-out*.
28. Pourquoi les barrières sont-elles moins chères que les ordinaires ?
29. Écrire $\lambda$, $y$, $x_1$, $y_1$.
30. Écrire $c_{di}$ dans le cas $H\leqslant K$.
31. Écrire $c_{do}$ dans le cas $H>K$.
32. Pourquoi $c_{uo}=0$ quand $H\leqslant K$ ?
33. Écrire $p_{ui}$ dans le cas $H\geqslant K$.
34. Quand $p_{do}=0$ ?
35. Quelle est la parité entre options *in* et *out* ?
36. Écrire la correction de Broadie-Glasserman-Kou. Dans quel sens déplace-t-on $H$ ?
37. Pourquoi le vega d'une *knock-out* peut-il être négatif ?
38. Qu'est-ce qu'une option parisienne ? Donner l'exemple de Hull.
39. Quelles sont les deux formulations possibles des 50 jours ?
40. Écrire les quatre valeurs d'options binaires.
41. Décomposer un call européen ordinaire en deux binaires.
42. Décomposer un put européen ordinaire.
43. Écrire les payoffs des deux lookbacks flottants et leur interprétation économique.
44. Écrire $c_{fl}$ avec tous ses paramètres.
45. Écrire $p_{fl}$ avec tous ses paramètres.
46. Refaire l'exemple 25.2 : $b_1$, $b_2$, $b_3$, $Y_2$, et les deux prix.
47. Pourquoi le call vaut-il plus que le put dans cet exemple ?
48. Définir un lookback fixe (call et put).
49. Écrire les deux formules de parité de Wong-Kwok, en définissant $S^\ast_{\max}$ et $S^\ast_{\min}$.
50. Citer les deux mises en garde sur les lookbacks.
51. Qu'est-ce qu'une *shout option* ? Détailler l'exemple à 50 et 60.
52. Écrire le payoff si l'on crie en $\tau$.
53. Comment valorise-t-on une *shout* ? À quoi la procédure ressemble-t-elle ?
54. Comment se compare-t-elle à un lookback en prix ?
55. Écrire les payoffs des *average price* call et put.
56. Décrire le cas du trésorier américain et de la filiale australienne.
57. Quelle moyenne est exactement lognormale ? laquelle approximativement ?
58. Écrire (25.3) et (25.4).
59. Écrire $M_1$ pour une moyenne continue.
60. Écrire $M_1$ et $M_2$ pour des observations discrètes.
61. Refaire l'exemple 25.3 : $M_1$, $M_2$, $\sigma_{\text{eff}}$, prix.
62. Quels prix obtient-on avec 12, 52 et 250 observations ? Pourquoi cette tendance ?
63. Dériver $K^\ast$ pour une asiatique en cours.
64. Que fait-on si $K^\ast<0$ ? Pourquoi ?
65. Écrire les payoffs des *average strike* options. Comment se valorisent-elles ?
66. Écrire le payoff d'une option d'échange et deux contextes où elle apparaît.
67. Écrire la formule de Margrabe et $\hat\sigma$.
68. Pourquoi la formule est-elle indépendante de $r$ ?
69. À quelle option ordinaire l'option d'échange équivaut-elle ?
70. Comment valorise-t-on la version américaine ?
71. Écrire les deux décompositions du meilleur et du pire de deux actifs.
72. Qu'est-ce qu'une option arc-en-ciel ? Donner l'exemple du CBOT.
73. Écrire $M_1$ et $M_2$ pour un panier.
74. Quelle méthode est plus rapide que Monte-Carlo, et pourquoi ?
75. Écrire la formule de la volatilité réalisée. Quelle hypothèse sur la moyenne ?
76. Écrire les payoffs des swaps de volatilité et de variance.
77. Quelle est la convention liant $L_{\text{var}}$ et $L_{\text{vol}}$ ?
78. Pourquoi les swaps de variance sont-ils plus faciles à valoriser ?
79. Écrire (25.6) et expliquer chacun des trois termes.
80. Écrire (25.8) et la définition de $\Delta K_i$ et $Q(K_i)$.
81. Comment choisit-on $S^\ast$ ?
82. Refaire l'exemple 25.4 en entier.
83. Dériver (25.9) par développement en série.
84. Que faut-il connaître en plus pour un swap de volatilité ?
85. Refaire l'exemple 25.5 et comparer $\hat E(\bar\sigma)$ à $\sqrt{\hat E(\bar V)}$.
86. Quelle approximation conduit à (25.10) ?
87. Décrire les quatre étapes du calcul quotidien du VIX.
88. Pourquoi l'asiatique est-elle facile à couvrir en delta ?
89. Pourquoi la barrière est-elle difficile ?
90. Énoncer le principe de la réplication statique.
91. Quelle frontière choisit-on dans l'exemple, et quelles sont les valeurs sur ses deux branches ?
92. Comment les options sont-elles choisies en séquence, et pourquoi ?
93. Refaire les trois calculs de position $-2{,}66$, $+0{,}97$, $+0{,}28$.
94. Quelle est la valeur du portefeuille et celle de la formule analytique ?
95. Que devient la valeur avec 18 puis 100 points appariés ?
96. Que fait-on du portefeuille pour couvrir, et quand le déboucle-t-on ?
97. Quel est l'avantage sur la couverture en delta ?
98. Quelle alternative existe-t-il au choix séquentiel des options ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Pourquoi les dealers aiment-ils les exotiques ? | Elles sont **beaucoup plus profitables** |
| $q$ pour un futures ? | Le **taux sans risque domestique** $r$ |
| Package ? | Portefeuille de **calls, puts, forwards, cash et sous-jacent** |
| Range forward ? | Call long + put court, **valeurs égales** |
| Autre nom ? | ***Zero-cost collar***, *cylinder option*, *min-max* |
| Coût nul par report ? | $A=ce^{rT}$ |
| Noms de l'option à paiement différé ? | *Break forward*, **Boston option**, *cancelable forward* |
| Option bermudienne ? | Exercice à **certaines dates** seulement |
| Pourquoi ce nom ? | *Les **Bermudes sont entre l'Europe et l'Amérique*** |
| Méthode pour les américaines non standard ? | L'**arbre binomial**, test d'exercice **ajusté** |
| Gap call : payoff ? | $S_T-K_1$ quand $S_T>K_2$ |
| Quel strike dans $d_1,d_2$ ? | **$K_2$** (le déclencheur) |
| Écart avec le call ordinaire $K_2$ ? | $(K_2-K_1)e^{-rT}N(d_2)$ |
| Ex. 25.1 : put ordinaire ? | **3 436 dollars** |
| Ex. 25.1 : gap put ? | **1 896 dollars** |
| Réduction ? | Environ **45 %** |
| Valeur d'un forward start ? | $c\,e^{-qT_1}$ |
| Si $q=0$ ? | **Exactement** une option ordinaire de même durée |
| Cliquet : autres noms ? | ***Ratchet***, *strike reset option* |
| Sa décomposition ? | 1 ordinaire + **$n-1$ forward start** |
| Combien de types de composées ? | **Quatre** |
| Combien de strikes et de dates ? | **Deux** de chaque |
| Loi utilisée ? | La normale **BIVARIÉE** $M(a,b;\rho)$ |
| Corrélation employée ? | $\sqrt{T_1/T_2}$ |
| Que représente $S^\ast$ ? | Le prix en $T_1$ tel que **l'option vaut $K_1$** |
| Auteurs des formules ? | **Geske** (1979) et **Rubinstein** |
| Chooser : autre nom ? | ***As you like it option*** |
| Sa valeur en $T_1$ ? | $\max(c,p)$ |
| Sa décomposition ? | $c+e^{-q(T_2-T_1)}\max(0,Ke^{-(r-q)(T_2-T_1)}-S_1)$ |
| Les deux composants ? | 1 call ($K$, $T_2$) + $e^{-q(T_2-T_1)}$ puts ($Ke^{-(r-q)(T_2-T_1)}$, $T_1$) |
| Quand n'est-ce plus un package ? | Si les strikes ou maturités **diffèrent** |
| Knock-out ? | **Cesse d'exister** à la barrière |
| Knock-in ? | **Vient à l'existence** à la barrière |
| Pourquoi moins chères ? | Le payoff est **conditionnel** |
| Que vaut $\lambda$ ? | $(r-q+\sigma^2/2)/\sigma^2$ |
| Que vaut $y$ ? | $\frac{\ln[H^2/(S_0K)]}{\sigma\sqrt T}+\lambda\sigma\sqrt T$ |
| Que vaut $x_1$ ? | $\frac{\ln(S_0/H)}{\sigma\sqrt T}+\lambda\sigma\sqrt T$ |
| Parité barrière ? | $c_{in}+c_{out}=c$ |
| $c_{uo}$ si $H\leqslant K$ ? | **Zéro** |
| Pourquoi ? | Tout chemin finissant dans la monnaie **franchit** $H$ |
| $p_{do}$ si $H\geqslant K$ ? | **Zéro** |
| Correction discrète, *up* ? | $H\to He^{+0{,}5826\sigma\sqrt{T/m}}$ |
| Correction discrète, *down* ? | $H\to He^{-0{,}5826\sigma\sqrt{T/m}}$ |
| Auteurs ? | **Broadie, Glasserman et Kou** (1997) |
| Vega d'une barrière ? | **Parfois négatif** |
| Pourquoi ? | Plus de volatilité = **plus de chances de toucher** |
| Option parisienne ? | Il faut **rester** au-delà de la barrière une **durée** |
| Exemple de Hull ? | Strike **90 %**, barrière **75 %**, **50 jours** |
| Cash-or-nothing call ? | $Qe^{-rT}N(d_2)$ |
| Cash-or-nothing put ? | $Qe^{-rT}N(-d_2)$ |
| Asset-or-nothing call ? | $S_0e^{-qT}N(d_1)$ |
| Décomposition d'un call ordinaire ? | Asset-or-nothing **long** + cash-or-nothing **court** ($Q=K$) |
| Décomposition d'un put ordinaire ? | Cash-or-nothing **long** + asset-or-nothing **court** |
| Payoff d'un lookback flottant call ? | $S_T-S_{\min}$ |
| Son interprétation ? | **Acheter au prix le plus bas** |
| Payoff d'un lookback flottant put ? | $S_{\max}-S_T$ |
| Auteurs de la formule ? | **Goldman, Sosin et Gatto** (1979) |
| $S_{\min}$ à l'émission ? | $S_0$ |
| Ex. 25.2 : $b_1$, $b_2$, $b_3$, $Y_2$ ? | $-0{,}025$ · $-0{,}225$ · $0{,}025$ · $0$ |
| Ex. 25.2 : put ? | **7,79** |
| Ex. 25.2 : call ? | **8,04** |
| Lookback fixe call : payoff ? | Comme un call, avec **$S_{\max}$ au lieu de $S_T$** |
| Parité de Wong-Kwok ? | $c_{\text{fix}}=p_{fl}^\ast+S_0e^{-qT}-Ke^{-rT}$ |
| Que vaut $S^\ast_{\max}$ ? | $\max(S_{\max},K)$ |
| Défaut des lookbacks ? | **Très chers** |
| Shout option ? | Le détenteur peut **« crier » une fois** |
| Payoff si l'on crie en $\tau$ ? | $\max(0,S_T-S_\tau)+(S_\tau-K)$ |
| Exemple : strike 50, cri à 60, $S_T<60$ ? | Payoff de **10 dollars** |
| Méthode de valorisation ? | **Arbre**, comme une américaine |
| Prix contre lookback ? | **Considérablement moins chère** |
| Average price call ? | $\max(0,S_{\text{ave}}-K)$ |
| Quelle moyenne est exactement lognormale ? | La moyenne **GÉOMÉTRIQUE** |
| Méthode de Turnbull-Wakeman ? | Ajuster une lognormale aux **deux premiers moments** |
| $F_0$ ? | $M_1$ |
| $\sigma^2$ ? | $\frac1T\ln\frac{M_2}{M_1^2}$ |
| $M_1$ continu ? | $\frac{e^{(r-q)T}-1}{(r-q)T}S_0$ |
| Ex. 25.3 : $M_1$ et $M_2$ ? | **52,59** et **2 922,76** |
| Ex. 25.3 : $\sigma_{\text{eff}}$ ? | **23,54 %** (contre 40 % pour l'actif) |
| Ex. 25.3 : prix ? | **5,62** |
| Avec 12 observations ? | **6,00** |
| Avec 250 ? | **5,63** |
| Pourquoi cette tendance ? | Moins d'observations = moyenne **plus volatile** |
| $K^\ast$ pour une asiatique en cours ? | $\frac{t_1+t_2}{t_2}K-\frac{t_1}{t_2}\bar S$ |
| Facteur d'échelle ? | $\frac{t_2}{t_1+t_2}$ |
| Si $K^\ast<0$ ? | L'option est **certaine d'être exercée** → **forward** |
| Average strike call ? | $\max(0,S_T-S_{\text{ave}})$ |
| Comment la valoriser ? | Comme une **option d'échange** |
| Payoff d'une option d'échange ? | $\max(V_T-U_T,0)$ |
| Auteur ? | **Margrabe** (1978) |
| Formule ? | $V_0e^{-q_VT}N(d_1)-U_0e^{-q_UT}N(d_2)$ |
| Que vaut $\hat\sigma$ ? | $\sqrt{\sigma_U^2+\sigma_V^2-2\rho\sigma_U\sigma_V}$ |
| Propriété remarquable ? | **Indépendante de $r$** |
| Pourquoi ? | Hausse de croissance **compensée** par hausse d'actualisation |
| Équivalente à quoi ? | $U_0$ calls sur $V/U$, strike **1,0**, taux $q_U$, dividende $q_V$ |
| Le meilleur de deux actifs ? | $\max(U,V)=U+\max(V-U,0)$ |
| Le pire ? | $\min(U,V)=V-\max(V-U,0)$ |
| Option arc-en-ciel ? | Deux ou plusieurs **actifs risqués** |
| Exemple du CBOT ? | Le **futures sur obligations** — choix de livraison |
| $M_1$ d'un panier ? | $\sum F_i$ |
| $M_2$ d'un panier ? | $\sum\sum F_iF_je^{\rho_{ij}\sigma_i\sigma_jT}$ |
| Volatilité réalisée ? | $\sqrt{\frac{252}{n-2}\sum[\ln(S_{i+1}/S_i)]^2}$ |
| Hypothèse sur la moyenne ? | Le rendement quotidien moyen est **nul** |
| Payoff d'un swap de variance ? | $L_{\text{var}}(\bar V-V_K)$ |
| Convention de notionnel ? | $L_{\text{var}}=L_{\text{vol}}/(2K)$ |
| Pourquoi la variance est-elle plus facile ? | Elle est **RÉPLICABLE** par des options |
| Exposition d'un swap de volatilité ? | **Uniquement à la volatilité** |
| Comment choisir $S^\ast$ ? | Le **premier strike SOUS $F_0$** |
| $Q(K_i)$ si $K_i<S^\ast$ ? | Un **PUT** |
| $Q(K_i)$ si $K_i=S^\ast$ ? | La **moyenne** call/put |
| $\Delta K_i$ à l'intérieur ? | $0{,}5(K_{i+1}-K_{i-1})$ |
| Ex. 25.4 : $F_0$ ? | **1 027,68** |
| Ex. 25.4 : la somme ? | **0,008139** |
| Ex. 25.4 : $\hat E(\bar V)$ ? | **0,0621** |
| Ex. 25.4 : valeur ? | **1,69 million** |
| Formule de la volatilité espérée ? | $\sqrt{\hat E(\bar V)}\left[1-\frac18\frac{\text{var}(\bar V)}{\hat E(\bar V)^2}\right]$ |
| Ce qu'il faut en plus ? | La **variance** du taux de variance moyen |
| Ex. 25.5 : $\hat E(\bar\sigma)$ ? | **0,2484** (contre $\sqrt{0{,}0621}=0{,}2492$) |
| Ex. 25.5 : valeur ? | **1,82 million** |
| Base du VIX depuis 2004 ? | L'équation **(25.10)** |
| Maturités utilisées ? | Celles encadrant **immédiatement 30 jours** |
| Facteur d'annualisation ? | $\times365/30$, puis **racine carrée** |
| Principe de la réplication statique ? | ***Même valeur sur la frontière ⇒ même valeur à l'intérieur*** |
| Frontière de l'exemple ? | $S=60$ **et** $t=0{,}75$ |
| Option A ? | Call **strike 50**, 9 mois, position **+1** |
| Position en B ? | $-11{,}54/4{,}33=\mathbf{-2{,}66}$ |
| Position en C ? | $4{,}21/4{,}33=\mathbf{+0{,}97}$ |
| Position en D ? | $\mathbf{+0{,}28}$ |
| Valeur du portefeuille ? | **0,73** |
| Valeur analytique ? | **0,31** |
| Avec 18 points ? | **0,38** |
| Avec 100 points ? | **0,32** |
| Comment couvre-t-on ? | En **SHORTANT** le portefeuille |
| Quand le débouclе-t-on ? | Dès qu'une **partie de la frontière** est atteinte |
| Avantage sur le delta hedging ? | **Pas de rééquilibrage fréquent** |
| Alternative au choix séquentiel ? | Résoudre un **système de $K$ équations linéaires** |
| Exotique facile à couvrir ? | L'**asiatique** — incertitude décroissante |
| Exotique difficile ? | La **barrière** — delta **discontinu** |
