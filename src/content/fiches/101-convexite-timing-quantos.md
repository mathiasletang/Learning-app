# Fiche 101 — Ajustements de convexité, de timing et quantos

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Produits de taux |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 29 « Convexity, Timing, and Quanto Adjustments » |
| **Difficulté** | Must know — les trois corrections qui sauvent la procédure en deux étapes |
| **Temps d'étude estimé** | 1 h 20 |
| **Prérequis** | Fiches 99 (martingales, changement de numéraire), 100 (modèles standard de taux), 77 (taux et duration) |
| **Concepts clés** | Procédure en deux étapes, rendement forward d'obligation, ajustement de convexité, rendement au pair, ajustement de timing, ratio de numéraire, quanto, dérivé *cross-currency*, mesure risque-neutre traditionnelle, paradoxe de Siegel |
| **Poids à l'examen** | $E_T(y_T)=y_0-\frac12y_0^2\sigma_y^2T\dfrac{G''(y_0)}{G'(y_0)}$ · $E_T(R_T)=R_0+\dfrac{R_0^2\sigma_R^2T\tau}{1+R_0\tau}$ · $E_{T^\ast}(V_T)=E_T(V_T)\exp\!\left[-\dfrac{\rho_{VR}\sigma_V\sigma_RR_0(T^\ast-T)}{1+R_0/m}T\right]$ · $E_X(V_T)=E_Y(V_T)e^{\rho\sigma_V\sigma_WT}$. |

## 🎯 Vue d'ensemble

```
LA PROCÉDURE EN DEUX ÉTAPES (celle qu'on a utilisée partout jusqu'ici)
  1. calculer le payoff espéré EN SUPPOSANT que chaque variable égale SA VALEUR FORWARD
  2. actualiser au taux sans risque de la date d'évaluation à la DATE DE PAIEMENT
  ⚠️ EST-ELLE TOUJOURS CORRECTE ?   « THE ANSWER IS NO! »

TROIS AJUSTEMENTS À LA VALEUR FORWARD DE L'ÉTAPE 1

  CONVEXITÉ   le payoff dépend d'un RENDEMENT observé À LA DATE DU PAIEMENT
     B = G(y) est NON LINÉAIRE ⇒ E(prix) = prix forward  N'IMPLIQUE PAS  E(y) = y forward
     E_T(y_T) = y₀ − ½ y₀² σ_y² T · G''(y₀)/G'(y₀)      ⚠️ TOUJOURS POSITIF

  TIMING      la variable est observée en T mais le payoff est en T* > T
     ratio de numéraire W = P(t,T*)/P(t,T)  =  prix forward d'obligation
     α_V = ρ_VW σ_V σ_W        →  E_{T*}(V_T) = E_T(V_T) · exp[…]

  QUANTO      variable mesurée en devise Y, payoff versé en devise X
     ratio de numéraire W = CHANGE FORWARD (unités de Y par unité de X)
     E_X(V_T) = E_Y(V_T) · e^{ρ σ_V σ_W T}

MESURE TRADITIONNELLE (payoffs à PLUSIEURS dates)   croissance de V augmentée de ρ σ_V σ_S
     → résout le PARADOXE DE SIEGEL
```

**Le rappel des lieux où la procédure en deux étapes a servi.** *On l'a utilisée pour les **FRA** (chapitre 4), pour les **swaps** (chapitre 7 : calculer les flux en supposant les taux forward réalisés et actualiser aux taux sans risque), pour le **modèle de Black** (chapitres 17 et 27), et pour les **options sur obligations, caps/floors et swaptions** (chapitre 28).*

> ⚠️ ***« Cela soulève la question de savoir s'il est TOUJOURS correct de valoriser les dérivés de taux européens par la procédure en deux étapes. LA RÉPONSE EST NON ! Pour les dérivés de taux NON STANDARD, il est parfois nécessaire de modifier la procédure de sorte qu'un AJUSTEMENT soit fait à la valeur forward de la variable, à la première étape. »***

## 🔴 Concept 1 — Les ajustements de convexité

### 1.1 D'où vient le problème

**La définition asymétrique des forwards.** *Habituellement la valeur forward d'une variable $S$ se calcule par référence à **un contrat forward versant $S_T-K$ en $T$** : c'est la valeur de $K$ qui annule le contrat. **Mais les TAUX forward et les RENDEMENTS forward sont définis DIFFÉREMMENT** : un taux forward est **le taux impliqué par une obligation zéro-coupon forward**, et plus généralement **un rendement forward d'obligation est le rendement impliqué par le PRIX FORWARD de l'obligation**.*

Soit $B_T$ le prix de l'obligation en $T$, $y_T$ son rendement, et la relation de valorisation :

$$\boxed{B_T=G(y_T)}\qquad\text{et par définition du rendement forward}\qquad\boxed{F_0=G(y_0)}$$

> ⚠️ ***La fonction $G$ est NON LINÉAIRE. Cela signifie que, lorsque le prix futur ESPÉRÉ égale le prix forward (c'est-à-dire dans un monde forward risque-neutre par rapport à $P(t,T)$), LE RENDEMENT FUTUR ESPÉRÉ N'ÉGALE PAS LE RENDEMENT FORWARD.***

<details class="details--riche">
<summary>

**La figure 29.1 — la démonstration en trois points**

</summary>

*Supposons qu'il n'y ait que **trois prix possibles** $B_1$, $B_2$, $B_3$, **également probables** dans le monde forward risque-neutre par rapport à $P(t,T)$, et **également espacés** :*

$$B_2-B_1=B_3-B_2$$

| Étape | Conséquence |
|---|---|
| **1** | Le **prix forward** est le prix espéré, donc $\mathbf{B_2}$ |
| **2** | Les trois prix se traduisent en trois rendements $y_1$, $y_2$, $y_3$ également probables — **mais ils ne sont PAS également espacés**, car $G$ est **convexe décroissante** |
| **3** | $y_2$ est **le rendement FORWARD**, puisque c'est le rendement correspondant au prix forward |
| **4** | **Le rendement ESPÉRÉ est la moyenne de $y_1$, $y_2$, $y_3$ — et il est CLAIREMENT SUPÉRIEUR à $y_2$** |

> **La géométrie :** la convexité de la courbe prix-rendement fait que **l'écart de rendement du côté des prix bas ($y_1$) est PLUS GRAND** que du côté des prix hauts ($y_3$) — la moyenne est donc **tirée vers le haut**.

</details>

### 1.2 La formule

$$\boxed{E_T(y_T)=y_0-\frac12\,y_0^2\,\sigma_y^2\,T\,\frac{G''(y_0)}{G'(y_0)}}\;\text{(29.1)}$$

où $G'$ et $G''$ sont les dérivées première et seconde de $G$, $E_T$ l'espérance dans le monde forward risque-neutre par rapport à $P(t,T)$, et $\sigma_y$ **la volatilité du rendement FORWARD**.

$$\boxed{\text{Ajustement de convexité}=-\frac12\,y_0^2\,\sigma_y^2\,T\,\frac{G''(y_0)}{G'(y_0)}}$$

> ⚠️ ***L'ajustement de convexité est TOUJOURS POSITIF, parce que $G'(y_0)<0$ et $G''(y_0)>0$.***
>
> *Il correspond exactement à **la différence entre $y_2$ et le rendement espéré** de la figure 29.1.*

**Ce qu'on fait ensuite :** *le payoff espéré peut être actualisé au taux sans risque courant de maturité $T$ **pourvu qu'on suppose le rendement espéré égal à $y_0-\frac12y_0^2\sigma_y^2T\dfrac{G''(y_0)}{G'(y_0)}$ PLUTÔT QUE $y_0$**.*

### 1.3 Application 1 — les taux d'intérêt

**Le cadre.** *Un instrument versant en $T$ un flux égal au **taux d'intérêt entre $T$ et $T^\ast$**, appliqué à un principal $L$.* ***Le taux applicable à $[T,T^\ast]$ est NORMALEMENT payé en $T^\ast$ ; ici on suppose qu'il est payé EN AVANCE, en $T$.*** *(Cet exemple servira pour les swaps **LIBOR-in-arrears** du chapitre 32.)*

<details class="details--riche">
<summary>

**La dérivation de (29.2)**

</summary>

*Étape 1 — le flux en $T$ vaut $L\tau R_T$ avec $\tau=T^\ast-T$*, où $R_T$ est le taux zéro-coupon pour $[T,T^\ast]$, exprimé avec une période de composition $\tau$.

*Étape 2 — $R_T$ est le RENDEMENT en $T$ d'une obligation zéro-coupon maturant en $T^\ast$.* La relation prix-rendement est donc :

$$\boxed{G(y)=\frac{1}{1+\tau y}}$$

*Étape 3 — les dérivées :*

$$G'(y)=-\frac{\tau}{(1+\tau y)^2}\qquad G''(y)=\frac{2\tau^2}{(1+\tau y)^3}$$

$$\frac{G''}{G'}=\frac{2\tau^2/(1+\tau y)^3}{-\tau/(1+\tau y)^2}=-\frac{2\tau}{1+\tau y}$$

*Étape 4 — substituer dans (29.1) :*

$$E_T(R_T)=R_0-\frac12R_0^2\sigma_R^2T\left(-\frac{2\tau}{1+R_0\tau}\right)$$

$$\boxed{E_T(R_T)=R_0+\frac{R_0^2\,\sigma_R^2\,T\,\tau}{1+R_0\tau}}\;\text{(29.2)}$$

*Étape 5 — la valeur de l'instrument :*

$$\boxed{P(0,T)\,L\,\tau\left[R_0+\frac{R_0^2\sigma_R^2T\tau}{1+R_0\tau}\right]}$$

</details>

<details class="details--riche">
<summary>

**Exemple 29.1 — le taux payé en avance, recalculé**

</summary>

**Données.** Un dérivé versant **dans 3 ans** le **taux zéro-coupon à 1 an** (composition annuelle) de ce moment-là, multiplié par **1 000 dollars**. Courbe zéro plate à **10 %** en composition annuelle ; volatilité du taux forward entre l'année 3 et l'année 4 : **20 %**.

*Étape 1 — les paramètres.* $R_0=0{,}10$, $\sigma_R=0{,}20$, $T=3$, $\tau=1$ et

$$P(0,3)=\frac{1}{1{,}10^3}=\mathbf{0{,}7513}$$

*Étape 2 — l'ajustement de convexité :*

$$\frac{R_0^2\sigma_R^2T\tau}{1+R_0\tau}=\frac{0{,}10^2\times0{,}20^2\times3\times1}{1{,}10}=\frac{0{,}0012}{1{,}10}=\mathbf{0{,}001091}$$

*Étape 3 — le rendement espéré ajusté :*

$$E_T(R_T)=0{,}10+0{,}001091=\mathbf{0{,}101091}$$

*Étape 4 — la valeur :*

$$0{,}7513\times1\,000\times1\times0{,}101091=\boxed{\mathbf{75{,}95\ \text{dollars}}}$$

⚠️ ***À comparer à 75,13 dollars quand AUCUN ajustement de convexité n'est fait*** — un écart de **1,1 %**.

</details>

### 1.4 Application 2 — les taux de swap

**L'approximation.** *Un taux de swap est **un RENDEMENT AU PAIR**. Pour calculer un ajustement de convexité, **on peut faire l'approximation que le taux de swap $N$ ans en $T$ égale LE RENDEMENT en $T$ d'une obligation à $N$ ans dont le coupon vaut le taux de swap FORWARD d'aujourd'hui**. Cela permet d'utiliser (29.1).*

<details class="details--riche">
<summary>

**Exemple 29.2 — le taux de swap payé à l'observation**

</summary>

**Données.** Instrument versant **dans 3 ans** le **taux de swap à 3 ans** de ce moment-là × **100 dollars**. Paiements **annuels** sur le swap ; courbe zéro plate à **12 %** en composition annuelle ; volatilité du taux de swap forward 3 ans dans 3 ans (implicite des prix de swaptions) : **22 %**.

*Étape 1 — construire $G$*, le taux de swap étant approximé par le rendement d'une obligation à coupon 12 % :

$$G(y)=\frac{0{,}12}{1+y}+\frac{0{,}12}{(1+y)^2}+\frac{1{,}12}{(1+y)^3}$$

*Étape 2 — les dérivées :*

$$G'(y)=-\frac{0{,}12}{(1+y)^2}-\frac{0{,}24}{(1+y)^3}-\frac{3{,}36}{(1+y)^4}$$

$$G''(y)=\frac{0{,}24}{(1+y)^3}+\frac{0{,}72}{(1+y)^4}+\frac{13{,}44}{(1+y)^5}$$

*Étape 3 — évaluer en $y_0=0{,}12$ :*

$$G'(0{,}12)=\mathbf{-2{,}4018}\qquad G''(0{,}12)=\mathbf{8{,}2546}$$

*(contrôle : $G(0{,}12)=1{,}0000$ — l'obligation cote **au pair**, comme il se doit)*

*Étape 4 — appliquer (29.1) :*

$$E_T(y_T)=0{,}12+\tfrac12\times0{,}12^2\times0{,}22^2\times3\times\frac{8{,}2546}{2{,}4018}=0{,}12+0{,}00359=\mathbf{0{,}1236}$$

> ⚠️ ***Un taux de swap forward de 12,36 % — et non 12 % — doit donc être supposé pour valoriser l'instrument.***

*Étape 5 — la valeur :*

$$\frac{100\times0{,}1236}{1{,}12^3}=\boxed{\mathbf{8{,}80\ \text{dollars}}}$$

⚠️ ***À comparer à 8,54 sans ajustement*** — un écart de **3 %**.

</details>

## 🔴 Concept 2 — Les ajustements de timing

### 2.1 Le cadre et la formule

**La situation.** *Une variable de marché $V$ est **observée en $T$** et sa valeur sert à calculer **un payoff qui survient PLUS TARD, en $T^\ast$**.*

| Notation | Signification |
|---|---|
| $E_T(V_T)$ | espérance de $V_T$ dans le monde forward risque-neutre par rapport à $P(t,T)$ |
| $E_{T^\ast}(V_T)$ | espérance de $V_T$ dans le monde forward risque-neutre par rapport à $P(t,T^\ast)$ |

**Le ratio de numéraire** en passant de $P(t,T)$ à $P(t,T^\ast)$ :

$$\boxed{W=\frac{P(t,T^\ast)}{P(t,T)}}\qquad\text{— c'est le PRIX FORWARD d'une obligation zéro-coupon entre }T\text{ et }T^\ast$$

Par (27.35) *(fiche 99)*, le changement de numéraire **augmente le taux de croissance de $V$** de :

$$\boxed{\alpha_V=\rho_{VW}\,\sigma_V\,\sigma_W}\;\text{(29.3)}$$

<details class="details--riche">
<summary>

**Exprimer le résultat avec le TAUX forward — la dérivation de (29.4)**

</summary>

*Étape 1 — la relation entre $W$ et le taux forward $R$* (exprimé avec une fréquence de composition $m$) :

$$W=\frac{1}{(1+R/m)^{m(T^\ast-T)}}$$

*Étape 2 — la volatilité de $W$, par le lemme d'Itô :*

$$\boxed{\sigma_W=-\frac{\sigma_RR(T^\ast-T)}{1+R/m}}$$

> ⚠️ **Le signe négatif est essentiel :** *$R$ et $W$ sont **négativement corrélés** — quand les taux montent, le prix forward de l'obligation baisse.*

*Étape 3 — substituer dans (29.3), avec $\rho_{VR}=-\rho_{VW}$ :*

$$\alpha_V=-\frac{\rho_{VR}\,\sigma_V\,\sigma_R\,R\,(T^\ast-T)}{1+R/m}$$

⚠️ *Note de Hull sur les signes : on peut soit poser $\sigma_W$ **négatif** et $\rho_{VW}=\rho_{VR}$, soit changer le signe de $\sigma_W$ pour le rendre positif et poser $\rho_{VW}=-\rho_{VR}$. **Dans les deux cas on aboutit à la MÊME formule pour $\alpha_V$.***

*Étape 4 — en approximant $R$ constant à sa valeur initiale $R_0$ et les volatilités/corrélation constantes :*

$$\boxed{E_{T^\ast}(V_T)=E_T(V_T)\exp\!\left[-\frac{\rho_{VR}\,\sigma_V\,\sigma_R\,R_0\,(T^\ast-T)}{1+R_0/m}\,T\right]}\;\text{(29.4)}$$

> **Le sens économique :** si $V$ est **positivement** corrélée aux taux ($\rho_{VR}>0$), reporter le paiement de $T$ à $T^\ast$ **pénalise** — l'exposant est négatif — parce que les états où $V$ est grande sont ceux où **l'actualisation supplémentaire est la plus forte**.

</details>

<details class="details--riche">
<summary>

**Exemple 29.3 — un indice observé en 5 ans, payé en 6 ans**

</summary>

**Données.** Dérivé versant **dans 6 ans** la valeur d'un indice boursier **observée dans 5 ans**. La valeur **forward** de l'indice à 5 ans est **1 200**. Volatilité de l'indice **20 %** ; volatilité du taux forward entre l'année 5 et l'année 6 : **18 %** ; corrélation entre les deux : $\mathbf{-0{,}4}$. Courbe zéro plate à **8 %** en composition annuelle.

*Étape 1 — les paramètres.* $T=5$, $T^\ast=6$, $m=1$, $R_0=0{,}08$, $\rho_{VR}=-0{,}4$, $\sigma_V=0{,}20$, $\sigma_R=0{,}18$.

*Étape 2 — l'ajustement :*

$$\exp\!\left[-\frac{(-0{,}4)\times0{,}20\times0{,}18\times0{,}08\times1}{1+0{,}08}\times5\right]=\exp(0{,}005333)=\mathbf{1{,}00535}$$

*Étape 3 — appliquer.* Par le chapitre 27, $E_T(V_T)$ **est le prix forward de l'indice**, soit **1 200** :

$$E_{T^\ast}(V_T)=1\,200\times1{,}00535=\mathbf{1\,206{,}42}$$

*Étape 4 — actualiser à la date du PAIEMENT.* Par (27.20), la valeur du dérivé est $1\,206{,}42\times P(0,6)$ avec

$$P(0,6)=\frac{1}{1{,}08^6}=\mathbf{0{,}6302}$$

$$\boxed{\text{valeur}=1\,206{,}42\times0{,}6302=\mathbf{760{,}25}}$$

> **La lecture du signe :** la corrélation est **négative** ⇒ l'ajustement est **positif** (1,00535 &gt; 1) : quand l'indice est haut, les taux sont bas, donc **le report de paiement coûte moins cher qu'en moyenne**.

</details>

### 2.2 Application 1 revisitée — la cohérence des deux approches

<details class="details--riche">
<summary>

**Retrouver (29.2) par l'ajustement de timing**

</summary>

> ⚠️ ***L'analyse par le timing fournit une AUTRE façon de produire le résultat de l'application 1 — et c'est un excellent contrôle de cohérence.***

*Étape 1 — le point de départ.* $R_T$ est le taux entre $T$ et $T^\ast$, $R_0$ le taux forward correspondant. Par **(27.22)** *(fiche 99)* :

$$\boxed{E_{T^\ast}(R_T)=R_0}$$

*(le taux forward **est** une martingale sous $P(t,T^\ast)$)*

*Étape 2 — appliquer (29.4) avec $V=R$*, donc $\rho_{VR}=1$, $\sigma_V=\sigma_R$, $m=1/\tau$ :

$$E_{T^\ast}(R_T)=E_T(R_T)\exp\!\left[-\frac{\sigma_R^2R_0\tau}{1+R_0\tau}\,T\right]$$

*Étape 3 — égaler et inverser :*

$$R_0=E_T(R_T)\exp\!\left[-\frac{\sigma_R^2R_0\tau T}{1+R_0\tau}\right]\quad\Longrightarrow\quad E_T(R_T)=R_0\exp\!\left[\frac{\sigma_R^2R_0\tau T}{1+R_0\tau}\right]$$

*Étape 4 — approcher l'exponentielle par $e^x\approx1+x$ :*

$$E_T(R_T)=R_0+\frac{R_0^2\sigma_R^2T\tau}{1+R_0\tau}$$

> ⚠️ ***C'est EXACTEMENT (29.2). Les deux ajustements — convexité et timing — sont deux faces du même changement de mesure.***

</details>

## 🔴 Concept 3 — Les quantos

### 3.1 Le produit et l'ajustement

> ***Un QUANTO, ou dérivé CROSS-CURRENCY, est un instrument où DEUX DEVISES sont impliquées : le payoff est défini en termes d'une variable MESURÉE DANS UNE DEVISE, et le payoff est VERSÉ DANS L'AUTRE.***

**L'exemple canonique** *(Business Snapshot 5.3)* : *le **contrat futures du CME sur le Nikkei**. La variable sous-jacente est **l'indice Nikkei 225 (mesuré en yens)**, mais **le contrat est réglé en DOLLARS américains**.*

| Notation | Signification |
|---|---|
| $P_X(t,T)$ | valeur en $t$, **en devise X**, d'une obligation zéro-coupon versant 1 unité de X en $T$ |
| $P_Y(t,T)$ | idem en devise Y |
| $E_X(V_T)$ | espérance dans le monde forward risque-neutre par rapport à $P_X(t,T)$ |
| $E_Y(V_T)$ | idem par rapport à $P_Y(t,T)$ |

**Le ratio de numéraire** en passant de $P_Y(t,T)$ à $P_X(t,T)$ :

$$\boxed{W(t)=\frac{P_X(t,T)\,S(t)}{P_Y(t,T)}}$$

où $S(t)$ est **le change spot (unités de Y par unité de X)**.

> ⚠️ ***Il s'ensuit que le ratio de numéraire $W(t)$ EST LE TAUX DE CHANGE FORWARD (unités de Y par unité de X) pour un contrat maturant en $T$.***

$$\boxed{\alpha_V=\rho_{VW}\,\sigma_V\,\sigma_W}\;\text{(29.5)}$$

$$\boxed{E_X(V_T)=E_Y(V_T)\,e^{\rho_{VW}\sigma_V\sigma_WT}\ \approx\ E_Y(V_T)\big(1+\rho_{VW}\sigma_V\sigma_WT\big)}\;\text{(29.6)}$$

⚠️ *Cette équation servira pour la valorisation des ***diff swaps*** au chapitre 32.*

<details class="details--riche">
<summary>

**Exemple 29.4 — le Nikkei réglé en dollars**

</summary>

**Données.** Nikkei courant **15 000 yens**. Taux sans risque à 1 an : **5 % en dollars**, **2 % en yens**. Rendement de dividende du Nikkei : **1 %**. Volatilité de l'indice **20 %** ; volatilité du change forward **yen par dollar** à 1 an : **12 %** ; corrélation entre les deux : **0,3**.

*Étape 1 — le prix forward du Nikkei EN YENS*, par la formule usuelle (5.8) :

$$15\,000\,e^{(0{,}02-0{,}01)\times1}=\mathbf{15\,150{,}75\ \text{yens}}$$

*(le taux sans risque **en yens** moins le rendement de dividende — l'actif est libellé en yens)*

*Étape 2 — l'ajustement quanto :*

$$E_X(V_T)=15\,150{,}75\times e^{0{,}3\times0{,}2\times0{,}12\times1}=15\,150{,}75\times e^{0{,}0072}=\boxed{\mathbf{15\,260{,}23}}$$

*Étape 3 — l'interprétation.* ***C'est le prix FORWARD du Nikkei pour un contrat versant un payoff en DOLLARS plutôt qu'en yens.*** *(En approximation, c'est aussi le **prix FUTURES** d'un tel contrat.)*

> **La lecture du signe :** la corrélation est **positive** (le Nikkei monte quand le yen se déprécie contre le dollar, c'est-à-dire quand $W$ = yens par dollar monte) ⇒ **l'ajustement est POSITIF** : le forward quanto vaut **plus** que le forward en yens.

</details>

### 3.2 Passer par la mesure risque-neutre traditionnelle

> ⚠️ ***La mesure forward risque-neutre marche bien quand les payoffs surviennent à UN SEUL instant. Dans les autres situations, il est souvent PLUS APPROPRIÉ d'utiliser la mesure risque-neutre TRADITIONNELLE.***

<details class="details--riche">
<summary>

**La dérivation de (29.7)**

</summary>

**Le cadre.** On connaît le processus de $V$ dans le monde risque-neutre traditionnel de **devise Y** et on veut son processus dans celui de **devise X**.

| Notation | Signification |
|---|---|
| $S$ | change spot (**unités de Y par unité de X**) |
| $\sigma_S$ | volatilité de $S$ |
| $\sigma_V$ | volatilité de $V$ |
| $\rho$ | corrélation instantanée entre $S$ et $V$ |

*Étape 1 — les numéraires.* On passe du **compte de marché monétaire en Y** au **compte de marché monétaire en X** (les deux étant libellés en devise X). Avec $g_X$ et $g_Y$ leurs valeurs, le ratio de numéraire est :

$$\boxed{\frac{g_XS}{g_Y}}$$

*Étape 2 — sa volatilité.* *$g_X(t)$ et $g_Y(t)$ ont un **drift stochastique mais une volatilité NULLE** (fiche 99, §27.4).* Par Itô, **la volatilité du ratio de numéraire est donc simplement $\sigma_S$**.

*Étape 3 — l'ajustement :*

$$\boxed{\alpha_V=\rho\,\sigma_V\,\sigma_S}\;\text{(29.7)}$$

> ***Le prix de marché du risque passe de zéro à $\sigma_S$.***

</details>

<details class="details--riche">
<summary>

**Business Snapshot 29.1 — le paradoxe de Siegel, et sa résolution**

</summary>

**Le paradoxe.** Deux devises X et Y de taux **constants** $r_X$ et $r_Y$ ; $S$ = unités de Y par unité de X. *Comme une devise est **un actif procurant un rendement au taux sans risque étranger** (chapitre 5), le processus risque-neutre traditionnel de $S$ est :*

$$dS=(r_Y-r_X)S\,dt+\sigma_SS\,dz$$

*Par le lemme d'Itô, le processus de $1/S$ est :*

$$d(1/S)=\big(r_X-r_Y+\sigma_S^2\big)(1/S)\,dt-\sigma_S(1/S)\,dz$$

> ⚠️ ***LE PARADOXE : puisque le taux de croissance espéré de $S$ est $r_Y-r_X$ dans un monde risque-neutre, LA SYMÉTRIE suggère que celui de $1/S$ devrait être $r_X-r_Y$ — et NON $r_X-r_Y+\sigma_S^2$.***

**La résolution, étape par étape.**

*Étape 1 — identifier le numéraire caché.* *Le processus donné pour $S$ est le processus risque-neutre **dans un monde où le numéraire est le compte monétaire en devise Y**. Le processus de $1/S$, **étant DÉDUIT de celui de $S$**, suppose donc **AUSSI ce numéraire**.*

*Étape 2 — le bon cadre.* *Comme $1/S$ est **le nombre d'unités de X par unité de Y**, **pour être symétrique on devrait mesurer son processus dans un monde où le numéraire est le compte monétaire en devise X**.*

*Étape 3 — appliquer (29.7).* En passant du compte monétaire Y au compte monétaire X, la croissance de $V$ augmente de $\rho\sigma_V\sigma_S$. Ici $V=1/S$, donc :

$$\rho=-1\qquad\sigma_V=\sigma_S\qquad\Longrightarrow\qquad\alpha_V=-\sigma_S^2$$

*Étape 4 — la neutralisation.* ***Cela ANNULE exactement le $+\sigma_S^2$ du processus ci-dessus :***

$$\boxed{d(1/S)=(r_X-r_Y)(1/S)\,dt-\sigma_S(1/S)\,dz}$$

> ***« C'est symétrique avec le processus dont nous sommes partis pour $S$. LE PARADOXE EST RÉSOLU ! »***

</details>

<details class="details--riche">
<summary>

**Exemple 29.5 — une américaine quanto sur le S&P 500 réglée en livres**

</summary>

**Données.** Option **américaine** à 2 ans versant $S-K$ **en livres sterling**, où $S$ est le niveau du **S&P 500** à l'exercice. $S_0=1\,200$, $K=1\,200$. Taux sans risque : **5 % en sterling**, **3 % en dollars**. Corrélation entre le change dollars/sterling et le S&P 500 : **0,2**. Volatilité du S&P 500 **25 %** ; volatilité du change **12 %**. Rendement de dividende du S&P 500 **1,5 %**.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi la mesure traditionnelle ici :</span>

⚠️ l'option est **AMÉRICAINE** — le payoff peut survenir à **n'importe quelle** date, donc la mesure forward risque-neutre à **une** date ne convient pas.

</div>

*Étape 1 — l'ajustement de numéraire, par (29.7) :*

$$\alpha_V=0{,}2\times0{,}25\times0{,}12=0{,}006=\mathbf{0{,}6\,\%}$$

*Étape 2 — le taux de croissance sous numéraire DOLLAR :*

$$3\,\%-1{,}5\,\%=\mathbf{1{,}5\,\%}$$

*Étape 3 — le taux de croissance sous numéraire STERLING :*

$$1{,}5\,\%+0{,}6\,\%=\mathbf{2{,}1\,\%}$$

*Étape 4 — traduire en rendement de dividende équivalent.* Le taux sans risque **en sterling** est 5 %. ***Le S&P 500 se comporte donc comme un actif procurant un rendement de dividende de***

$$5\,\%-2{,}1\,\%=\boxed{\mathbf{2{,}9\,\%}}$$

***sous le numéraire sterling.***

*Étape 5 — valoriser.* Avec $S=1\,200$, $K=1\,200$, $r=0{,}05$, $q=0{,}029$, $\sigma=0{,}25$, $T=2$ et **100 pas** sur un arbre binomial, DerivaGem donne :

$$\boxed{\mathbf{179{,}83\ \text{livres sterling}}}$$

</details>

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Ajustement à faire |
|---|---|
| Le payoff dépend d'un **RENDEMENT** ou d'un **TAUX** observé **à la date du paiement** | **CONVEXITÉ** — (29.1) |
| « le taux entre $T$ et $T^\ast$ est payé **en $T$** » | **convexité** — (29.2) |
| Le payoff dépend du **taux de SWAP** | convexité, en approximant par le **rendement d'une obligation à coupon = taux de swap forward** |
| La variable est observée en $T$ mais **payée en $T^\ast>T$** | **TIMING** — (29.4) |
| Variable mesurée en **devise Y**, payoff versé en **devise X** | **QUANTO** — (29.6) |
| Payoff à **une seule** date | mesure **forward risque-neutre** |
| Payoff à **plusieurs** dates, ou option **américaine** | mesure **risque-neutre TRADITIONNELLE** — (29.7) |
| « pourquoi $1/S$ ne croît-il pas à $r_X-r_Y$ ? » | le **paradoxe de Siegel** |
| Payoff standard, taux observé et payé aux dates normales | **AUCUN ajustement** — la procédure en deux étapes suffit |

## Comment résoudre ce type d'exercice

**A — Un ajustement de convexité.**

1. Écrire la relation prix-rendement $B=G(y)$ **explicitement**, avec les vrais coupons.
2. Dériver $G'$ et $G''$ **analytiquement** ; contrôler que $G'<0$ et $G''>0$.
3. Évaluer en $y_0$ ; contrôler que $G(y_0)$ égale bien le prix forward.
4. $E_T(y_T)=y_0-\frac12y_0^2\sigma_y^2T\dfrac{G''(y_0)}{G'(y_0)}$ — le second terme est **positif**.
5. Actualiser au taux de maturité $T$ en utilisant **le rendement ajusté**.

**B — Un ajustement de timing.**

1. Identifier $T$ (**observation**) et $T^\ast$ (**paiement**).
2. Identifier le **taux forward** $R_0$ pour $[T,T^\ast]$, sa volatilité $\sigma_R$ et sa fréquence $m$.
3. $E_{T^\ast}(V_T)=E_T(V_T)\exp\!\left[-\dfrac{\rho_{VR}\sigma_V\sigma_RR_0(T^\ast-T)}{1+R_0/m}T\right]$.
4. Rappel : $E_T(V_T)$ est simplement **le prix forward** de $V$ pour l'échéance $T$.
5. Multiplier par $P(0,T^\ast)$ — **la maturité du PAIEMENT**.
6. Contrôle du signe : $\rho_{VR}>0$ ⇒ ajustement **à la baisse**.

**C — Un quanto.**

1. Calculer le forward de $V$ **dans sa PROPRE devise** (donc avec le taux sans risque **de cette devise**).
2. Identifier $W$ = le **change forward** en unités de la devise de $V$ par unité de la devise de paiement.
3. $E_X(V_T)=E_Y(V_T)e^{\rho\sigma_V\sigma_WT}$.
4. Actualiser au taux **de la devise de PAIEMENT**.
5. Si l'option est **américaine** ou multi-dates, passer par (29.7) : ajouter $\rho\sigma_V\sigma_S$ au drift, puis convertir en **rendement de dividende équivalent**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire que la procédure en deux étapes est toujours valide | ***« The answer is no! »*** — trois familles d'exceptions |
| Croire que $E(\text{prix})=$ forward implique $E(\text{rendement})=$ rendement forward | **non** — $G$ est **non linéaire** |
| Prendre l'ajustement de convexité négatif | il est **toujours POSITIF** ($G'<0$, $G''>0$) |
| Utiliser $\sigma_y$ = volatilité du rendement **spot** | c'est la volatilité du rendement **FORWARD** |
| Oublier le facteur $\frac12$ dans (29.1) | il vient du développement de Taylor à l'ordre 2 |
| Appliquer un ajustement de convexité à un taux payé **normalement** | un taux observé en $T$ et payé en $T^\ast$ **ne demande AUCUN ajustement** — il est martingale sous $P(t,T^\ast)$ |
| Confondre convexité et timing | **convexité** : rendement payé **tôt** · **timing** : variable payée **tard** |
| Oublier le signe négatif de $\sigma_W$ | $R$ et $W$ sont **négativement** corrélés |
| Se tromper de sens de la corrélation | vérifier si $\rho$ est donnée entre $V$ et **$R$** ou entre $V$ et **$W$** |
| Actualiser à $P(0,T)$ dans un ajustement de timing | c'est $P(0,T^\ast)$, la date du **PAIEMENT** |
| Calculer le forward du quanto avec le taux de la devise de **paiement** | il se calcule avec le taux de **SA PROPRE devise** (ici, le yen) |
| Se tromper de sens du change | $W$ = **unités de Y par unité de X**, Y étant la devise de la variable |
| Utiliser la mesure forward pour une américaine | passer par la mesure **traditionnelle** et (29.7) |
| Croire que $1/S$ croît à $r_X-r_Y$ dans le monde de $S$ | **paradoxe de Siegel** : il faut **changer de numéraire** |
| Oublier de convertir l'ajustement en rendement de dividende | dans l'exemple 29.5 : $q=5\,\%-2{,}1\,\%=\mathbf{2{,}9\,\%}$ |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **La procédure en deux étapes** | espérance **aux valeurs forward** · actualiser au taux de la **date de paiement** |
| **Est-elle toujours correcte ?** | ***NON*** |
| **Où on l'a déjà utilisée** | FRA · swaps · modèle de Black · options sur obligations · caps · swaptions |
| **La relation prix-rendement** | $B_T=G(y_T)$, avec $F_0=G(y_0)$ |
| **Le problème** | $G$ **non linéaire** ⇒ $E(\text{prix})$ correct **mais** $E(\text{rendement})>y_0$ |
| **La figure 29.1** | prix également espacés ⇒ rendements **PAS** également espacés |
| **Ajustement de convexité** | $-\frac12y_0^2\sigma_y^2T\dfrac{G''(y_0)}{G'(y_0)}$ |
| **Son signe** | **TOUJOURS POSITIF** |
| **Pourquoi** | $G'(y_0)<0$ et $G''(y_0)>0$ |
| **Application 1 : $G$** | $G(y)=\dfrac{1}{1+\tau y}$ |
| **Le résultat** | $E_T(R_T)=R_0+\dfrac{R_0^2\sigma_R^2T\tau}{1+R_0\tau}$ |
| **La valeur** | $P(0,T)L\tau\left[R_0+\dfrac{R_0^2\sigma_R^2T\tau}{1+R_0\tau}\right]$ |
| **Exemple 29.1** | $P(0,3)=0{,}7513$, ajustement $0{,}001091$ → **75,95** (contre **75,13**) |
| **Application 2** | un taux de swap est un **rendement AU PAIR** |
| **L'approximation** | rendement d'une obligation de coupon = **taux de swap forward** |
| **Exemple 29.2** | $G'=-2{,}4018$, $G''=8{,}2546$ → $E_T(y_T)=\mathbf{12{,}36\,\%}$ |
| **Sa valeur** | **8,80** (contre **8,54**) |
| **Ratio de numéraire (timing)** | $W=\dfrac{P(t,T^\ast)}{P(t,T)}$ = **prix forward d'obligation** |
| **L'ajustement générique** | $\alpha_V=\rho_{VW}\sigma_V\sigma_W$ |
| **Volatilité de $W$** | $\sigma_W=-\dfrac{\sigma_RR(T^\ast-T)}{1+R/m}$ |
| **La formule de timing** | $E_{T^\ast}(V_T)=E_T(V_T)\exp\!\left[-\dfrac{\rho_{VR}\sigma_V\sigma_RR_0(T^\ast-T)}{1+R_0/m}T\right]$ |
| **Exemple 29.3** | facteur **1,00535** → $1\,206{,}42$ → valeur **760,25** |
| **La cohérence** | l'ajustement de **timing appliqué à $R$** redonne exactement **(29.2)** |
| **Le résultat pivot** | $E_{T^\ast}(R_T)=R_0$ — le taux forward est **martingale** sous $P(t,T^\ast)$ |
| **Quanto** | variable en **devise Y**, payoff en **devise X** |
| **L'exemple canonique** | le **futures CME sur le Nikkei**, réglé en **dollars** |
| **Ratio de numéraire (quanto)** | $W(t)=\dfrac{P_X(t,T)S(t)}{P_Y(t,T)}$ = **le CHANGE FORWARD** |
| **La formule quanto** | $E_X(V_T)=E_Y(V_T)e^{\rho\sigma_V\sigma_WT}$ |
| **Son approximation** | $E_Y(V_T)(1+\rho\sigma_V\sigma_WT)$ |
| **Exemple 29.4** | forward yen **15 150,75** → forward quanto **15 260,23** |
| **Son usage futur** | les ***diff swaps*** (chapitre 32) |
| **Quand la mesure traditionnelle ?** | payoffs à **plusieurs** dates, ou options **américaines** |
| **Volatilité du ratio de numéraire** | simplement $\sigma_S$ (les comptes monétaires ont une volatilité **nulle**) |
| **L'ajustement traditionnel** | $\alpha_V=\rho\,\sigma_V\,\sigma_S$ |
| **Le prix du risque** | passe de **0** à **$\sigma_S$** |
| **Processus de $S$** | $dS=(r_Y-r_X)S\,dt+\sigma_SS\,dz$ |
| **Processus déduit de $1/S$** | $d(1/S)=(r_X-r_Y+\sigma_S^2)(1/S)dt-\sigma_S(1/S)dz$ |
| **Le paradoxe** | pourquoi le $+\sigma_S^2$ ? |
| **La résolution** | $\rho=-1$, $\sigma_V=\sigma_S$ ⇒ $\alpha_V=-\sigma_S^2$, **qui l'annule** |
| **Exemple 29.5** | $\alpha=0{,}006$ ; croissance $1{,}5\to2{,}1\,\%$ ; $q=\mathbf{2{,}9\,\%}$ ; option **179,83 £** |

## 🧠 Active Recall

1. Écrire les deux étapes de la procédure standard. Dans quels chapitres l'a-t-on utilisée ?
2. Est-elle toujours correcte ? Quelles sont les trois familles d'exceptions ?
3. Comment se définit habituellement une valeur forward ?
4. En quoi un taux forward et un rendement forward se définissent-ils différemment ?
5. Écrire $B_T=G(y_T)$ et $F_0=G(y_0)$.
6. Pourquoi la non-linéarité de $G$ pose-t-elle problème ?
7. Décrire la figure 29.1 avec ses trois prix et trois rendements.
8. Pourquoi le rendement espéré dépasse-t-il $y_2$ ?
9. Écrire (29.1) et nommer chacun de ses termes.
10. Écrire l'ajustement de convexité et justifier son signe.
11. Que fait-on ensuite du rendement ajusté ?
12. Dans l'application 1, quand le taux est-il normalement payé ? Et ici ?
13. Écrire $G(y)$ pour un zéro-coupon et dériver $G'$, $G''$ et leur rapport.
14. Dériver (29.2).
15. Écrire la valeur complète de l'instrument.
16. Refaire l'exemple 29.1 en entier, avec et sans ajustement.
17. Qu'est-ce qu'un rendement au pair ?
18. Quelle approximation permet d'appliquer (29.1) à un taux de swap ?
19. Écrire $G$, $G'$ et $G''$ de l'exemple 29.2.
20. Que valent $G'(0{,}12)$ et $G''(0{,}12)$ ? Que vaut $G(0{,}12)$ et pourquoi ?
21. Calculer $E_T(y_T)$ et la valeur de l'instrument.
22. De combien l'ajustement change-t-il le prix, en pourcentage ?
23. Décrire la situation qui appelle un ajustement de timing.
24. Écrire le ratio de numéraire et l'interpréter.
25. Écrire (29.3).
26. Écrire la relation entre $W$ et le taux forward $R$.
27. Dériver $\sigma_W$ par Itô. Pourquoi est-elle négative ?
28. Comment Hull traite-t-il l'ambiguïté de signe ?
29. Écrire (29.4).
30. Interpréter économiquement le signe de $\rho_{VR}$.
31. Refaire l'exemple 29.3 en entier.
32. Que vaut $E_T(V_T)$ dans cet exemple, et pourquoi ?
33. À quelle maturité actualise-t-on ?
34. Redériver (29.2) par l'ajustement de timing, en quatre étapes.
35. Quel résultat du chapitre 27 sert de point de départ ?
36. Que montre cette redérivation sur les deux ajustements ?
37. Définir un quanto. Donner l'exemple du CME.
38. Écrire le ratio de numéraire d'un quanto et l'identifier.
39. Écrire (29.5) et (29.6).
40. Refaire l'exemple 29.4 en entier.
41. Avec quel taux calcule-t-on le forward du Nikkei en yens ? Pourquoi ?
42. Interpréter le signe de l'ajustement.
43. Quand la mesure forward risque-neutre ne convient-elle plus ?
44. Quel est le ratio de numéraire quand on passe d'un compte monétaire à l'autre ?
45. Pourquoi sa volatilité vaut-elle simplement $\sigma_S$ ?
46. Écrire (29.7). De combien le prix du risque change-t-il ?
47. Énoncer le paradoxe de Siegel.
48. Écrire les processus de $S$ puis de $1/S$.
49. Quelle est la première étape de la résolution ?
50. Que valent $\rho$ et $\sigma_V$ quand $V=1/S$ ?
51. Comment le $+\sigma_S^2$ est-il neutralisé ?
52. Écrire le processus final de $1/S$ et conclure.
53. Pourquoi l'exemple 29.5 exige-t-il la mesure traditionnelle ?
54. Calculer l'ajustement de croissance, puis le rendement de dividende équivalent.
55. Quels paramètres entre-t-on finalement dans l'arbre binomial ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les deux étapes de la procédure standard ? | Espérance **aux valeurs forward** · actualiser à la **date de paiement** |
| Est-elle toujours correcte ? | ***« The answer is NO! »*** |
| Les trois ajustements ? | **Convexité** · **timing** · **quanto** |
| Comment se définit un forward ordinaire ? | Le $K$ qui annule un contrat versant $S_T-K$ |
| Comment se définit un taux forward ? | Le taux **impliqué par un zéro-coupon forward** |
| Un rendement forward d'obligation ? | Le rendement **impliqué par le PRIX FORWARD** |
| La relation prix-rendement ? | $B_T=G(y_T)$ |
| Le lien avec le forward ? | $F_0=G(y_0)$ |
| Pourquoi un problème ? | $G$ est **NON LINÉAIRE** |
| Dans la figure 29.1, que vaut le prix forward ? | $B_2$, le prix **espéré** |
| Les rendements sont-ils également espacés ? | **NON** |
| Le rendement espéré contre $y_2$ ? | Il est **SUPÉRIEUR** |
| Formule de l'ajustement ? | $-\frac12y_0^2\sigma_y^2T\dfrac{G''(y_0)}{G'(y_0)}$ |
| Son signe ? | **TOUJOURS POSITIF** |
| Pourquoi ? | $G'<0$ et $G''>0$ |
| Que vaut $\sigma_y$ ? | La volatilité du rendement **FORWARD** |
| Application 1 : quand le taux est-il payé ? | **EN AVANCE**, en $T$ au lieu de $T^\ast$ |
| Sa $G$ ? | $G(y)=\dfrac{1}{1+\tau y}$ |
| Son $G''/G'$ ? | $-\dfrac{2\tau}{1+\tau y}$ |
| Le résultat (29.2) ? | $R_0+\dfrac{R_0^2\sigma_R^2T\tau}{1+R_0\tau}$ |
| Ex. 29.1 : $P(0,3)$ ? | **0,7513** |
| Ex. 29.1 : l'ajustement ? | **0,001091** |
| Ex. 29.1 : la valeur ? | **75,95 dollars** |
| Sans ajustement ? | **75,13 dollars** |
| Un taux de swap est un ? | **Rendement AU PAIR** |
| L'approximation employée ? | Le rendement d'une obligation de coupon = **taux de swap forward** |
| Ex. 29.2 : $G'(0{,}12)$ ? | $\mathbf{-2{,}4018}$ |
| Ex. 29.2 : $G''(0{,}12)$ ? | $\mathbf{8{,}2546}$ |
| Ex. 29.2 : $G(0{,}12)$ ? | **1,0000** — l'obligation est **au pair** |
| Ex. 29.2 : $E_T(y_T)$ ? | **12,36 %** au lieu de 12 % |
| Ex. 29.2 : la valeur ? | **8,80** (contre **8,54**) |
| Situation appelant un timing ? | Variable observée en $T$, payoff en $T^\ast>T$ |
| Le ratio de numéraire ? | $W=\dfrac{P(t,T^\ast)}{P(t,T)}$ |
| Que représente-t-il ? | Le **prix FORWARD d'obligation** entre $T$ et $T^\ast$ |
| L'ajustement générique ? | $\alpha_V=\rho_{VW}\sigma_V\sigma_W$ |
| Relation entre $W$ et $R$ ? | $W=(1+R/m)^{-m(T^\ast-T)}$ |
| Volatilité de $W$ ? | $-\dfrac{\sigma_RR(T^\ast-T)}{1+R/m}$ |
| Pourquoi négative ? | $R$ et $W$ sont **négativement corrélés** |
| La formule de timing ? | $E_T(V_T)\exp\!\left[-\dfrac{\rho_{VR}\sigma_V\sigma_RR_0(T^\ast-T)}{1+R_0/m}T\right]$ |
| Si $\rho_{VR}>0$ ? | Ajustement **à la baisse** |
| Ex. 29.3 : le facteur ? | **1,00535** |
| Ex. 29.3 : $E_T(V_T)$ ? | **1 200** — le **prix forward** |
| Ex. 29.3 : $E_{T^\ast}(V_T)$ ? | **1 206,42** |
| Ex. 29.3 : $P(0,6)$ ? | **0,6302** |
| Ex. 29.3 : la valeur ? | **760,25** |
| Le résultat pivot de la redérivation ? | $E_{T^\ast}(R_T)=R_0$ |
| Ce que la redérivation montre ? | Convexité et timing sont **le même changement de mesure** |
| Qu'est-ce qu'un quanto ? | Variable en **devise Y**, payoff en **devise X** |
| Autre nom ? | Dérivé ***cross-currency*** |
| L'exemple canonique ? | Le **futures CME sur le Nikkei** |
| Le ratio de numéraire ? | $\dfrac{P_X(t,T)S(t)}{P_Y(t,T)}$ |
| Que vaut-il ? | Le **CHANGE FORWARD** (Y par X) |
| La formule quanto ? | $E_X(V_T)=E_Y(V_T)e^{\rho\sigma_V\sigma_WT}$ |
| Son approximation linéaire ? | $E_Y(V_T)(1+\rho\sigma_V\sigma_WT)$ |
| Ex. 29.4 : forward en yens ? | $15\,000e^{0{,}01}=\mathbf{15\,150{,}75}$ |
| Avec quel taux ? | Le taux **YEN** moins le dividende |
| Ex. 29.4 : forward quanto ? | **15 260,23** |
| Que représente-t-il ? | Le forward pour un contrat versant **en dollars** |
| Son usage futur ? | Les ***diff swaps*** |
| Quand la mesure traditionnelle ? | Payoffs à **plusieurs dates** ou **américaines** |
| Le ratio de numéraire alors ? | $g_XS/g_Y$ |
| Sa volatilité ? | Simplement $\sigma_S$ |
| Pourquoi ? | Les comptes monétaires ont une volatilité **NULLE** |
| L'ajustement (29.7) ? | $\alpha_V=\rho\,\sigma_V\,\sigma_S$ |
| Le prix du risque ? | Passe de **0** à **$\sigma_S$** |
| Processus risque-neutre de $S$ ? | $(r_Y-r_X)S\,dt+\sigma_SS\,dz$ |
| Processus déduit de $1/S$ ? | $(r_X-r_Y+\sigma_S^2)(1/S)dt-\sigma_S(1/S)dz$ |
| Le paradoxe ? | Pourquoi le terme $+\sigma_S^2$ ? |
| La clé de la résolution ? | Le processus de $1/S$ suppose **le numéraire de $S$** |
| $\rho$ entre $1/S$ et $S$ ? | $\mathbf{-1}$ |
| $\sigma_V$ pour $V=1/S$ ? | $\sigma_S$ |
| L'ajustement obtenu ? | $\mathbf{-\sigma_S^2}$ |
| Le processus final ? | $(r_X-r_Y)(1/S)dt-\sigma_S(1/S)dz$ |
| Ex. 29.5 : pourquoi la traditionnelle ? | L'option est **AMÉRICAINE** |
| Ex. 29.5 : l'ajustement ? | $0{,}2\times0{,}25\times0{,}12=\mathbf{0{,}6\,\%}$ |
| Croissance sous numéraire dollar ? | $3\,\%-1{,}5\,\%=\mathbf{1{,}5\,\%}$ |
| Sous numéraire sterling ? | **2,1 %** |
| Rendement de dividende équivalent ? | $5\,\%-2{,}1\,\%=\mathbf{2{,}9\,\%}$ |
| La valeur de l'option ? | **179,83 livres sterling** |
