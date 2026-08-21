# Fiche 90 — Les lettres grecques : delta, gamma, thêta, véga, rhô

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 18 « The Greek Letters » |
| **Difficulté** | Must know — le chapitre que tout desk d'options applique chaque jour |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 85, 87, 89 |
| **Concepts clés** | Position nue et couverte, stratégie *stop-loss*, delta, couverture dynamique, rééquilibrage, thêta, gamma, relation $\Theta+rS\Delta+\frac12\sigma^2S^2\Gamma=r\Pi$, véga, rhô, analyse de scénarios, delta d'un forward et d'un futures, assurance de portefeuille synthétique |
| **Poids à l'examen** | Les **cinq formules** · rendre un portefeuille **gamma et véga neutre** (système $2\times2$) · $\Delta\Pi=\Theta\Delta t+\frac12\Gamma\Delta S^2$ · l'**assurance synthétique**. |

## 🎯 Vue d'ensemble

```
LE PROBLÈME  vendre une option OTC sur mesure → impossible de la racheter en bourse
DELTA   Δ = ∂Π/∂S       call : N(d₁)      put : N(d₁) − 1      action : 1
GAMMA   Γ = ∂²Π/∂S²     N'(d₁)/(S₀σ√T)    — mesure la COURBURE
THÊTA   Θ = ∂Π/∂t       décroissance du temps ; PROXY DE GAMMA en delta-neutre
VÉGA    V = ∂Π/∂σ       S₀√T N'(d₁)
RHÔ     ρ = ∂Π/∂r       KTe^{−rT}N(d₂)

RELATION      Θ + rSΔ + ½σ²S²Γ = rΠ           (l'EDP réécrite)
DELTA-NEUTRE  ΔΠ = Θ Δt + ½ Γ ΔS²
NEUTRALISER   action : delta seulement · OPTIONS : gamma et véga
```

**Le problème posé.** *Une institution qui vend une option de gré à gré doit gérer son risque. Si l'option est identique à une option cotée, elle peut **neutraliser son exposition en rachetant la même option en bourse**. Mais **quand l'option a été taillée sur mesure et ne correspond à aucun produit standardisé, la couverture est bien plus difficile**.*

> **Le lien avec la création synthétique.** *Créer une position optionnelle synthétiquement est **essentiellement la même tâche** que couvrir la position optionnelle **opposée**. Créer un call long synthétiquement, c'est **couvrir une position courte** sur ce call.*

**L'exemple de tout le chapitre.** *Une institution a vendu **300 000 dollars** un call européen sur **100 000 actions** sans dividende.*

$$S_0=49,\quad K=50,\quad r=5\,\%,\quad \sigma=20\,\%,\quad T=20\ \text{semaines}=0{,}3846,\quad \mu=13\,\%$$

*Le prix Black-Scholes est d'environ **240 000 dollars** (soit **2,40** par action) : elle a donc vendu l'option **60 000 dollars au-dessus** de sa valeur théorique — mais **doit maintenant couvrir les risques**.*

⚠️ *Le rendement espéré $\mu$ est **sans importance pour valoriser** l'option ; *il est donné ici parce qu'**il peut avoir un effet sur l'efficacité d'un schéma de couverture***.

## 🟠 Concept 1 — Trois mauvaises solutions

| Stratégie | Description | Ce qui tourne mal |
|---|---|---|
| **Position nue** (*naked*) | ne rien faire | *Marche bien si le cours finit sous 50 : profit de **300 000**. Mais si le cours finit à **60**, l'option coûte **1 000 000** — bien plus que les 300 000 encaissés* |
| **Position couverte** (*covered*) | acheter les 100 000 actions **immédiatement** | *Marche bien si l'option est exercée. Mais si le cours tombe à **40**, l'institution perd **900 000** sur les actions* |

> ⚠️ **Ni l'une ni l'autre n'est une bonne couverture.** *Si les hypothèses de Black-Scholes tiennent, **le coût moyen devrait être de 240 000 dans les deux cas**. Mais **en une occasion donnée, le coût peut aller de zéro à plus de 1 000 000**. **Une bonne couverture garantirait que le coût soit toujours proche de 240 000.***

*Note : la parité call-put montre que **l'exposition d'un call couvert vendu est la même que celle d'un put nu vendu**.*

<details class="details--riche">
<summary>

**La stratégie stop-loss — pourquoi elle est séduisante et pourquoi elle échoue**

</summary>

**Le principe.** *Acheter une unité du sous-jacent **dès que son prix dépasse $K$** et la vendre **dès qu'il passe sous $K$***. Objectif : détenir une position **nue** quand $S<K$ et **couverte** quand $S>K$, de sorte qu'à l'échéance on possède l'action si l'option finit dans la monnaie, et pas sinon.

**Le raisonnement séduisant.** *Toutes les transactions postérieures à la date 0 se faisant au prix $K$*, le coût total semble être

$$Q=\max(S_0-K,0)\;\text{(18.1)}$$

*Si c'était vrai, la couverture fonctionnerait parfaitement en l'absence de coûts de transaction, et **le coût de couverture serait toujours inférieur au prix Black-Scholes — un investisseur pourrait donc gagner sans risque en vendant des options et en les couvrant**.*

**Les deux raisons pour lesquelles (18.1) est fausse.**

1. *Les flux surviennent **à des dates différentes** et doivent être **actualisés**.*
2. ***Les achats et les ventes ne peuvent pas se faire exactement au même prix $K$.*** **C'est le point critique.**

*Étape 1 — pourquoi le point 2 est fatal.* *Si les marchés sont efficients, **le hedger ne peut pas savoir, quand le cours vaut $K$, s'il va continuer au-dessus ou en dessous**.* En pratique, les achats se font à $K+\varepsilon$ et les ventes à $K-\varepsilon$. *Étape 2 — le coût par aller-retour.* Chaque achat suivi d'une vente coûte $\mathbf{2\varepsilon}$, hors coûts de transaction. *Étape 3 — la réponse naturelle du hedger.* Surveiller les prix **plus étroitement** pour réduire $\varepsilon$. *Étape 4 — pourquoi cela ne marche pas.* *À mesure que $\varepsilon$ diminue, **les transactions deviennent plus fréquentes** : le coût plus faible par transaction est **compensé** par la fréquence accrue. **Quand $\varepsilon\to0$, le nombre espéré de transactions tend vers l'infini.***

⚠️ **C'est exactement la propriété du processus de Wiener vue en fiche 86** : *le nombre espéré de fois où un processus de Wiener égale une valeur donnée sur un intervalle est **infini***.

**La mesure de performance et le verdict.** *Le rapport de l'**écart-type du coût de couverture** au **prix Black-Scholes** de l'option. Une couverture parfaite donnerait **zéro**.*

| $\Delta t$ (semaines) | 5 | 4 | 2 | 1 | 0,5 | 0,25 |
|---|---|---|---|---|---|---|
| **Performance** | 1,02 | 0,93 | 0,82 | 0,77 | 0,76 | **0,76** |

***Il apparaît impossible de descendre sous 0,70, quelle que soit la petitesse de $\Delta t$.*** La stratégie **plafonne** — elle ne converge pas vers une bonne couverture.

</details>

## 🔴 Concept 2 — Le delta et la couverture dynamique

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Le **delta** est le **taux de variation du prix de l'option par rapport au prix du sous-jacent** — la **pente** de la courbe reliant les deux.*

$$\boxed{\Delta=\frac{\partial c}{\partial S}}$$

</div>

**L'exemple numérique.** *Un delta de 0,6 signifie que **quand le cours varie d'un petit montant, le prix de l'option varie d'environ 60 % de ce montant**.*

<details class="details--riche">
<summary>

**Comment se construit une position delta-neutre, et pourquoi il faut la rééquilibrer**

</summary>

**Le décor.** Cours **100**, option **10**, delta **0,6**. Un investisseur a **vendu 20 contrats**, soit des options sur **2 000 actions**.

*Étape 1 — la couverture.* Acheter $0{,}6\times2\,000=\mathbf{1\,200}$ actions. *Étape 2 — vérifier dans les deux sens.* Si le cours monte de **1** : gain de **1 200** sur les actions, et l'option monte d'environ $0{,}6$, soit une **perte de 1 200** sur les options vendues. Si le cours baisse de 1 : symétrique. *Étape 3 — la lecture en deltas.* Le delta de la position courte est $0{,}6\times(-2\,000)=\mathbf{-1\,200}$ ; celui d'une action est **1,0**, donc la position longue de 1 200 actions a un delta de **+1 200**. **Le delta global est zéro** — la position est **delta-neutre**. *Étape 4 — le lendemain.* Le cours monte à **110** ; le delta passe de 0,60 à **0,65**. Il faut acheter $0{,}05\times2\,000=\mathbf{100}$ actions supplémentaires.

> ⚠️ ***Comme le delta d'une option ne reste pas constant, la position n'est delta-couverte que pour une période RELATIVEMENT COURTE. La couverture doit être ajustée périodiquement : c'est le RÉÉQUILIBRAGE.***

|  | **Couverture dynamique** | **Couverture statique** |
|---|---|---|
| Principe | ajustée **régulièrement** | montée une fois, **jamais** ajustée |
| Autre nom | — | ***hedge-and-forget*** |

</details>

**Le lien avec Black-Scholes.** *L'EDP se dérive en construisant un portefeuille sans risque **$-1$ option, $+\Delta$ actions**. Dans notre terminologie : **on valorise les options en construisant une position delta-neutre et en arguant que son rendement doit (instantanément) être le taux sans risque**.*

**Les formules.**

$$\boxed{\Delta(\text{call})=N(d_1)}\qquad\qquad\boxed{\Delta(\text{put})=N(d_1)-1}$$

| Position | Couverture |
|---|---|
| **Vendeur** d'un call | détenir **$N(d_1)$ actions longues** par option vendue |
| **Acheteur** d'un call | détenir $N(d_1)$ actions **courtes** par option achetée |
| Put | delta **négatif** : un put **long** se couvre par une position **longue** en actions ; un put **court**, par une position **courte** |

**Le delta d'un portefeuille.**

$$\boxed{\Delta=\sum_{i=1}^n w_i\Delta_i}$$

<details class="details--riche">
<summary>

**Exercice résolu — delta d'un portefeuille de trois positions**

</summary>

| Position | Quantité | Delta unitaire |
|---|---|---|
| Calls $K=55$, 3 mois | **+100 000** | 0,533 |
| Calls $K=56$, 5 mois | **−200 000** | 0,468 |
| Puts $K=56$, 2 mois | **−50 000** | −0,508 |

$$\Delta=100\,000(0{,}533)-200\,000(0{,}468)-50\,000(-0{,}508)=53\,300-93\,600+25\,400=\boxed{\mathbf{-14\,900}}$$

**Le portefeuille est rendu delta-neutre en ACHETANT 14 900 actions.**

⚠️ Notez les **deux** sources de signe : la **quantité** (longue ou courte) et le **delta** lui-même (négatif pour un put). Le troisième terme est **positif** parce qu'on est **court** d'un delta **négatif**.

</details>

<details class="details--riche">
<summary>

**La simulation de couverture en delta — et d'où vient réellement le coût**

</summary>

**La performance mesurée** (1 000 trajectoires simulées, même mesure que pour le stop-loss) :

| Intervalle de rééquilibrage (semaines) | 5 | 4 | 2 | 1 | 0,5 | 0,25 |
|---|---|---|---|---|---|---|
| **Performance** | 0,43 | 0,39 | 0,26 | 0,19 | 0,14 | **0,09** |

> ***La couverture en delta est une grande amélioration par rapport au stop-loss. Contrairement à celui-ci, sa performance s'améliore CONSTAMMENT à mesure que la couverture est surveillée plus fréquemment.*** (Comparez : 0,76 contre 0,09 au pas le plus fin.)

**Le bilan à la semaine 9, dans un scénario simulé.** *Valeur initiale de l'option vendue : **240 000**.*

| Poste | Variation |
|---|---|
| Valeur de l'option (passée à **414 500**) | **−174 500** pour la position courte |
| Position de trésorerie (coût cumulé) | **−1 442 900** |
| Valeur des actions détenues (de **2 557 800** à **4 171 100**) | **+1 613 300** |
| **Effet net** | **−4 100** |

*Le net effet de tout cela est que **la valeur de la position de l'institution n'a changé que de 4 100 dollars** entre la semaine 0 et la semaine 9.* **C'est cela, une bonne couverture.**

> **D'où vient le coût de 240 000 ?** *La procédure crée l'équivalent d'une **position longue** sur l'option, qui neutralise la position courte créée par la vente. **Couvrir en delta une position courte implique généralement de VENDRE l'action juste après une baisse et d'ACHETER juste après une hausse — on pourrait appeler cela une stratégie « acheter haut, vendre bas » !** Le coût de 240 000 vient de la **différence moyenne entre le prix payé pour l'action et le prix auquel elle est revendue**.*

**Les coûts de transaction — et l'économie d'échelle.** *Les opérateurs rééquilibrent d'ordinaire **une fois par jour**. **Avec un petit nombre d'options sur un actif, c'est prohibitif**. **Pour un gros portefeuille c'est plus faisable : une seule transaction sur le sous-jacent suffit à annuler le delta de l'ensemble**, et les coûts sont absorbés par les profits de nombreuses opérations.*

</details>

## 🔴 Concept 3 — Le thêta

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Le **thêta** est le **taux de variation de la valeur du portefeuille par rapport au passage du temps**, tout le reste étant inchangé. On l'appelle parfois la **décroissance temporelle** (*time decay*).*

</div>

$$\boxed{\Theta(\text{call})=-\frac{S_0N'(d_1)\sigma}{2\sqrt T}-rKe^{-rT}N(d_2)}\qquad\boxed{\Theta(\text{put})=-\frac{S_0N'(d_1)\sigma}{2\sqrt T}+rKe^{-rT}N(-d_2)}$$

où $N'(x)=\dfrac{1}{\sqrt{2\pi}}e^{-x^2/2}$ ;(18.2) est la **densité** normale centrée réduite.

⚠️ *Comme $N(-d_2)=1-N(d_2)$, **le thêta d'un put excède celui du call correspondant de $rKe^{-rT}$**.*

⚠️ **Les unités.** *Dans ces formules le temps est en **années**. Quand on cote un thêta, le temps est habituellement en **jours** : diviser par **365** pour un thêta « par jour calendaire », par **252** pour un thêta « par jour de bourse ».*

**Exemple 18.2.** Sur les données du chapitre : $\Theta=\mathbf{-4{,}31}$ par an, soit $-4{,}31/365=\mathbf{-0{,}0118}$ par jour calendaire ou $-4{,}31/252=\mathbf{-0{,}0171}$ par jour de bourse.

**Le comportement.** *Le thêta est **habituellement négatif** : le temps passant, l'option **perd de la valeur**.*

| Situation | Thêta |
|---|---|
| Cours **très bas** | proche de **zéro** |
| Option **à la monnaie** | **grand et négatif** |
| Cours **très élevé** | tend vers $\boldsymbol{-rKe^{-rT}}$ |

*Exception signalée en note : **un put européen dans la monnaie sur action sans dividende**, ou **un call européen dans la monnaie sur une devise à très haut taux**.*

> ⚠️ **Le thêta n'est PAS un paramètre de couverture comme le delta.** *Il y a de l'incertitude sur le prix futur, **mais aucune sur le passage du temps**. Il est sensé de se couvrir contre les variations du sous-jacent ; **il n'a aucun sens de se couvrir contre l'écoulement du temps**. **Malgré cela, beaucoup de traders considèrent le thêta comme une statistique descriptive utile — parce que, dans un portefeuille delta-neutre, le thêta est un PROXY du gamma.***

## 🔴 Concept 4 — Le gamma

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Le **gamma** est le **taux de variation du delta** par rapport au prix du sous-jacent — la **dérivée seconde** du portefeuille.*

$$\boxed{\Gamma=\frac{\partial^2\Pi}{\partial S^2}}\qquad\qquad\boxed{\Gamma(\text{call ou put})=\frac{N'(d_1)}{S_0\sigma\sqrt T}}$$

</div>

| Gamma | Conséquence |
|---|---|
| **Petit** | le delta change **lentement** → rééquilibrage **peu fréquent** suffit |
| **Fortement positif ou négatif** | le delta est **très sensible** → *il est **assez risqué** de laisser un portefeuille delta-neutre inchangé un certain temps* |

**L'erreur que le gamma mesure.** *Quand le cours passe de $S$ à $S'$, **la couverture en delta suppose que le prix de l'option passe de $C$ à $C'$, alors qu'en réalité il passe à $C''$**. **La différence entre $C'$ et $C''$ est l'erreur de couverture**, et sa taille dépend de la **courbure** de la relation prix-cours. **Le gamma mesure cette courbure.***

$$\boxed{\Delta\Pi=\Theta\,\Delta t+\tfrac12\Gamma\,\Delta S^2}\;\text{(18.3)}\qquad\text{(portefeuille delta-neutre, termes d'ordre supérieur à }\Delta t\text{ ignorés)}$$

| Signe du gamma | Thêta associé | Comportement du portefeuille |
|---|---|---|
| **Positif** | tend à être **négatif** | perd de la valeur **si $S$ ne bouge pas**, en gagne **si $S$ bouge beaucoup** dans un sens ou l'autre |
| **Négatif** | tend à être **positif** | gagne **si $S$ ne bouge pas**, perd **si $S$ bouge beaucoup** |

*Plus la **valeur absolue** du gamma est grande, plus la valeur du portefeuille est **sensible** à $S$.*

**Exemple 18.3.** Portefeuille delta-neutre de gamma **−10 000**. Un mouvement de **±2** produit une baisse **inattendue** de

$$\tfrac12\times10\,000\times2^2=\mathbf{20\,000}\ \text{dollars}$$

⚠️ **Le signe de $\Delta S$ n'intervient pas** : $\Delta S^2$ est le même à $+2$ et $-2$. Un gamma négatif **perd dans les deux sens**.

**Le comportement du gamma.**

| Situation | Gamma |
|---|---|
| Option **à la monnaie** | **maximal** ; *il **augmente** quand la maturité **diminue*** |
| Options **à la monnaie de courte vie** | ***gammas très élevés** — la valeur de la position du détenteur est **très sensible aux sauts** du cours* |
| Dans ou hors la monnaie | faible |

**Exemple 18.4.** $\Gamma=\dfrac{N'(d_1)}{S_0\sigma\sqrt T}=\mathbf{0{,}066}$ : *quand le cours varie de $\Delta S$, **le delta de l'option varie de $0{,}066\,\Delta S$***.

<details class="details--riche">
<summary>

**Rendre un portefeuille gamma-neutre — et pourquoi une action n'y suffit pas**

</summary>

> ⚠️ ***Une position dans le sous-jacent a un gamma NUL et ne peut pas servir à changer le gamma d'un portefeuille. Il faut une position dans un instrument NON LINÉAIREMENT dépendant du sous-jacent — c'est-à-dire une option.***

*Étape 1 — poser l'équation.* Portefeuille delta-neutre de gamma $\Gamma$ ; option traitée de gamma $\Gamma_T$ ; quantité ajoutée $w_T$. Le gamma devient $w_T\Gamma_T+\Gamma$. *Étape 2 — l'annuler.*

$$\boxed{w_T=-\frac{\Gamma}{\Gamma_T}}$$

*Étape 3 — corriger le delta.* *Inclure l'option traitée **change le delta** du portefeuille : il faut alors **modifier la position dans le sous-jacent** pour rétablir la neutralité en delta.* *Étape 4 — accepter la limite.* *Le portefeuille n'est gamma-neutre que **pour une courte période** : la neutralité ne se maintient que si la position en options est **ajustée en permanence** à $-\Gamma/\Gamma_T$.*

**Exercice résolu.** Portefeuille delta-neutre de gamma **−3 000**. Un call traité a un delta de **0,62** et un gamma de **1,50**.

$$w_T=\frac{3\,000}{1{,}5}=\mathbf{2\,000}\ \text{calls achetés}$$

*Mais le delta passe de zéro à $2\,000\times0{,}62=\mathbf{1\,240}$ : **il faut vendre 1 240 unités du sous-jacent** pour rétablir la neutralité.*

> **La lecture géométrique.** *Rendre un portefeuille gamma-neutre **en plus** de delta-neutre est une **correction de l'erreur de couverture** : **la neutralité en delta protège contre les PETITS mouvements entre rééquilibrages ; la neutralité en gamma protège contre les GRANDS**.*

</details>

## 🔴 Concept 5 — La relation entre delta, thêta et gamma

*Le prix d'un dérivé satisfait l'EDP (14.16) ; **la valeur $\Pi$ d'un portefeuille de tels dérivés la satisfait aussi**.* En reconnaissant $\Theta=\partial\Pi/\partial t$, $\Delta=\partial\Pi/\partial S$, $\Gamma=\partial^2\Pi/\partial S^2$ :

$$\boxed{\Theta+rS\Delta+\tfrac12\sigma^2S^2\Gamma=r\Pi}\;\text{(18.4)}$$

**Pour un portefeuille delta-neutre** ($\Delta=0$) :

$$\boxed{\Theta+\tfrac12\sigma^2S^2\Gamma=r\Pi}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que cela démontre.</span>

***Quand $\Theta$ est grand et positif, le gamma tend à être grand et négatif, et réciproquement.*** C'est **exactement** ce que montrait le tableau du concept 4 — et **cela explique pourquoi le thêta peut, dans une certaine mesure, servir de proxy au gamma dans un portefeuille delta-neutre**.

</div>

⚠️ **L'EDP de Black-Scholes n'est donc pas une abstraction** : c'est **littéralement** la relation comptable entre les grecques d'un portefeuille couvert.

## 🔴 Concept 6 — Le véga

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Jusqu'ici nous avons implicitement supposé la volatilité **constante**. En pratique **elle change**, et la valeur d'un dérivé peut donc changer **à cause de mouvements de volatilité** autant qu'à cause du prix et du temps.*

$$\boxed{\mathcal V=\frac{\partial\Pi}{\partial\sigma}}\qquad\qquad\boxed{\mathcal V(\text{call ou put})=S_0\sqrt T\,N'(d_1)}$$

</div>

*Note de Hull : **véga n'est pas une lettre de l'alphabet grec**, malgré son nom.*

| Véga | Interprétation |
|---|---|
| Fortement positif ou négatif | valeur **très sensible** aux petites variations de volatilité |
| Proche de zéro | les variations de volatilité ont **peu d'impact** |

⚠️ **Même remarque que pour le gamma.** *Une position dans le sous-jacent a un **véga nul**.* On le modifie de la même façon : $w_T=-\mathcal V/\mathcal V_T$.

> ⚠️ **Le point décisif.** ***Un portefeuille gamma-neutre ne sera en général PAS véga-neutre, et réciproquement. Si un hedger veut les deux, il doit habituellement utiliser AU MOINS DEUX dérivés traités sur le même sous-jacent.***

**Exemple 18.6.** $\mathcal V=S_0\sqrt T N'(d_1)=\mathbf{12{,}1}$ : *une hausse de **1 %** de la volatilité (de 20 % à 21 %) **augmente la valeur de l'option d'environ $0{,}01\times12{,}1=0{,}121$***.

⚠️ **L'objection théorique, et sa réponse empirique.** *Calculer le véga à partir de Black-Scholes peut sembler **étrange**, puisque le modèle **suppose la volatilité constante** : il serait théoriquement plus correct de le calculer avec un modèle à volatilité **stochastique**. **Il se trouve cependant que le véga calculé avec un modèle à volatilité stochastique est très proche du véga de Black-Scholes** : la pratique fonctionne raisonnablement bien.*

⚠️ **Le raffinement de maturité.** *Quand les volatilités changent, **les volatilités implicites des options courtes changent plus que celles des options longues**. On calcule donc souvent le véga d'un portefeuille en **changeant moins les volatilités des options longues** (section 22.6).*

<details class="details--riche">
<summary>

**Exercice résolu — rendre un portefeuille gamma ET véga neutre (exemple 18.5)**

</summary>

**Données.** Portefeuille **delta-neutre**, gamma **−5 000**, véga **−8 000**.

|  | Delta | Gamma | Véga |
|---|---|---|---|
| **Portefeuille** | 0 | **−5 000** | **−8 000** |
| **Option 1** | 0,6 | 0,5 | 2,0 |
| **Option 2** | 0,5 | 0,8 | 1,2 |

**Cas A — véga-neutre seulement, avec l'option 1.** *Étape 1.* $w_1=8\,000/2{,}0=\mathbf{4\,000}$ options achetées. *Étape 2 — les dégâts collatéraux.* Le delta passe à $4\,000\times0{,}6=\mathbf{2\,400}$ → **vendre 2 400 unités** du sous-jacent. Et le gamma passe de $-5\,000$ à $-5\,000+4\,000\times0{,}5=\mathbf{-3\,000}$ — **toujours négatif**.

**Cas B — gamma ET véga neutres, avec les deux options.** *Étape 1 — poser le système.*

$$\begin{cases}-5\,000+0{,}5w_1+0{,}8w_2=0\\[2pt]-8\,000+2{,}0w_1+1{,}2w_2=0\end{cases}$$

*Étape 2 — résoudre.* Multiplier la première par 4 : $2w_1+3{,}2w_2=20\,000$ ; retrancher la seconde : $2w_2=12\,000$, donc

$$\boxed{w_2=6\,000}\qquad\text{puis}\qquad 0{,}5w_1=5\,000-4\,800=200\ \Rightarrow\ \boxed{w_1=400}$$

*Étape 3 — le delta résultant.*

$$400\times0{,}6+6\,000\times0{,}5=240+3\,000=\mathbf{3\,240}$$

→ **vendre 3 240 unités** du sous-jacent pour rétablir la neutralité en delta.

> ⚠️ **L'ordre des opérations est imposé.** On neutralise **d'abord** gamma et véga avec les **options** (le sous-jacent ne peut rien pour eux), **puis** delta avec le **sous-jacent** (qui ne perturbe ni gamma ni véga). **Jamais l'inverse.**

**Le choix stratégique.** *La neutralité en **gamma** protège contre de **grands changements du prix** entre rééquilibrages ; la neutralité en **véga** protège contre une **volatilité variable**. **Savoir lequel privilégier avec une option donnée dépend du temps entre rééquilibrages et de la volatilité de la volatilité.***

</details>

## 🟡 Concept 7 — Le rhô

$$\boxed{\rho(\text{call})=KTe^{-rT}N(d_2)}\qquad\qquad\boxed{\rho(\text{put})=-KTe^{-rT}N(-d_2)}$$

**Exemple 18.7.** $\rho=\mathbf{8{,}91}$ : *une hausse de **1 %** du taux sans risque (de 5 % à 6 %) **augmente la valeur de l'option d'environ $0{,}01\times8{,}91=0{,}0891$***.

⚠️ **Pour une option de change, il y a DEUX rhôs.** Celui du taux **domestique** est donné par la formule ci-dessus. Celui du taux **étranger** est

$$\rho(\text{call, taux étranger})=-Te^{-r_fT}S_0N(d_1)\qquad \rho(\text{put, taux étranger})=Te^{-r_fT}S_0N(-d_1)$$

## 🟠 Concept 8 — Les réalités de la couverture

> *Dans un monde idéal, les traders rééquilibreraient **très fréquemment** pour maintenir **toutes** les grecques à zéro. **En pratique c'est impossible.** Avec un gros portefeuille sur un seul sous-jacent, ils rendent le delta nul ou proche de zéro **au moins une fois par jour**. **Un gamma nul et un véga nul sont moins faciles à atteindre, parce qu'il est difficile de trouver des options ou d'autres dérivés non linéaires négociables dans le volume requis à des prix compétitifs.***

<details class="details--riche">
<summary>

**Comment la couverture dynamique est organisée en pratique**

</summary>

*Dans une organisation typique, la responsabilité d'un portefeuille de dérivés dépendant d'un sous-jacent donné est confiée à **un trader ou un groupe de traders** — par exemple, un trader de Goldman Sachs peut être responsable de **tous les dérivés dépendant du dollar australien**. Un système informatique calcule la valeur et les grecques du portefeuille. **Des limites sont définies pour chaque grecque, et une autorisation spéciale est requise pour dépasser une limite en fin de journée.***

| Limite | Forme d'expression |
|---|---|
| **Delta** | position maximale **équivalente dans le sous-jacent** — *une limite de 1 million de dollars sur une action à 50 signifie un delta absolu d'au plus **20 000*** |
| **Véga** | exposition maximale en dollars **par 1 % de variation de volatilité** |

> ***Par principe, les traders d'options se rendent delta-neutres — ou proches — à la fin de CHAQUE journée. Gamma et véga sont SURVEILLÉS mais pas gérés quotidiennement.***
>
> *Les institutions constatent souvent que **leur activité avec les clients consiste à VENDRE des options**, et qu'elles **accumulent donc gamma et véga NÉGATIFS**. **Elles guettent alors en permanence les occasions de gérer ces risques en ACHETANT des options à des prix compétitifs.***

**L'atténuation naturelle, et le cauchemar.** *Les options sont souvent **proches de la monnaie** quand elles sont vendues, donc à gammas et végas **élevés**. Mais après quelque temps, le cours a souvent assez bougé pour qu'elles soient **très dans ou très hors la monnaie** : leurs gammas et végas sont alors **très petits et sans conséquence**. **Le scénario cauchemar d'un trader d'options est celui où les options vendues RESTENT très proches de la monnaie à l'approche de l'échéance.***

**L'économie d'échelle.** *Maintenir la neutralité en delta pour **un petit nombre** d'options en traitant quotidiennement n'est **généralement pas économiquement viable** : les coûts par option couverte sont élevés — ils viennent de ce que **chaque jour le hedger achète au prix offert ou vend au prix demandé**. **Mais pour un gros portefeuille, ces coûts par option deviennent bien plus raisonnables.***

</details>

**L'analyse de scénarios.** *En plus de surveiller les grecques, les traders **calculent le gain ou la perte de leur portefeuille sur une période donnée sous divers scénarios**. La période dépend de la **liquidité** des instruments ; les scénarios sont **choisis par la direction** ou **générés par un modèle**.*

**L'exemple : un portefeuille d'options de change**, cours **1,0000**, volatilité **10 %**. *Comme un mouvement d'un écart-type sur deux semaines vaut environ **0,02**, les cours retenus correspondent à environ **zéro, un, deux et trois** écarts-types.*

| Volatilité | 0,94 | 0,96 | 0,98 | 1,00 | 1,02 | 1,04 | 1,06 |
|---|---|---|---|---|---|---|---|
| **8 %** | +102 | +55 | +25 | +6 | −10 | −34 | −80 |
| **10 %** | +80 | +40 | +17 | +2 | −14 | −38 | −85 |
| **12 %** | +60 | +25 | +9 | −2 | −18 | −42 | **−90** |

⚠️ ***Habituellement la perte la plus forte se trouve dans un COIN du tableau — mais pas toujours.*** *Considérez une banque dont le portefeuille est une position **courte sur un papillon** (fiche 84) : **la plus grande perte serait subie si le cours restait où il est** — c'est-à-dire **au centre**.*

## 🔴 Concept 9 — Extension des formules

**Pour un actif procurant un rendement $q$** (indice : rendement de dividende · devise : $r_f$ · **futures : $q=r$**) :

| Grecque | Call | Put |
|---|---|---|
| **Delta** | $e^{-qT}N(d_1)$ | $e^{-qT}[N(d_1)-1]$ |
| **Gamma** | $\dfrac{N'(d_1)e^{-qT}}{S_0\sigma\sqrt T}$ | idem |
| **Thêta** | $-\dfrac{S_0N'(d_1)\sigma e^{-qT}}{2\sqrt T}+qS_0N(d_1)e^{-qT}-rKe^{-rT}N(d_2)$ | $-\dfrac{S_0N'(d_1)\sigma e^{-qT}}{2\sqrt T}-qS_0N(-d_1)e^{-qT}+rKe^{-rT}N(-d_2)$ |
| **Véga** | $S_0\sqrt T\,N'(d_1)e^{-qT}$ | idem |
| **Rhô** | $KTe^{-rT}N(d_2)$ | $-KTe^{-rT}N(-d_2)$ |

⚠️ **Exception pour les options sur futures.** *Le rhô d'un call sur futures est $\boldsymbol{-cT}$ et celui d'un put sur futures est $\boldsymbol{-pT}$* — **pas** la formule du tableau.

**Le delta des contrats à terme — un résultat souvent oublié.**

| Instrument | Delta | Raisonnement |
|---|---|---|
| **Forward** sans revenu | $\mathbf{1{,}0}$ | *la valeur est $S_0-Ke^{-rT}$ ; si $S$ varie de $\Delta S$, elle varie de $\Delta S$* |
| Forward, rendement $q$ | $e^{-qT}$ | d'après (5.7) |
| **Futures** sans revenu | $\boldsymbol{e^{rT}}$ | *le prix futures est $S_0e^{rT}$ ; **le règlement quotidien** fait réaliser ce gain **presque immédiatement*** |
| Futures, rendement $q$ | $e^{(r-q)T}$ | d'après (5.3) |

> ⚠️ ***Il est intéressant que le règlement quotidien rende les deltas des futures et des forwards LÉGÈREMENT DIFFÉRENTS — et cela reste vrai même quand les taux sont constants et que le prix forward égale le prix futures.***

**Couvrir avec des futures plutôt qu'avec le sous-jacent.** Si $H_A$ est la position requise dans l'actif et $H_F$ la position équivalente en futures de maturité $T$ :

$$\boxed{H_F=e^{-rT}H_A}\;\text{(18.5)}\qquad \boxed{H_F=e^{-(r-q)T}H_A}\;\text{(18.6)}\qquad \boxed{H_F=e^{-(r-r_f)T}H_A}\;\text{(18.7)}$$

<details class="details--riche">
<summary>

**Exercice résolu — couvrir un portefeuille d'options de change par des futures (exemple 18.8)**

</summary>

**Données.** Le portefeuille est rendu delta-neutre par une position **courte de 458 000 livres**. $r=4\,\%$ (États-Unis), $r_f=7\,\%$ (Royaume-Uni). On veut utiliser des **futures 9 mois**.

*Étape 1 — appliquer (18.7).*

$$H_F=e^{-(0{,}04-0{,}07)\times0{,}75}\times458\,000=e^{0{,}0225}\times458\,000\approx\mathbf{468\,400}\ \text{livres}$$

*(le livre imprime 468 442)* *Étape 2 — convertir en contrats.* Chaque contrat porte sur **62 500** livres :

$$\frac{468\,400}{62\,500}=7{,}49\ \longrightarrow\ \boxed{\textbf{7 contrats vendus}}$$

⚠️ **Le signe de l'exposant.** Ici $r<r_f$, donc $e^{-(r-r_f)T}>1$ : **il faut une position en futures PLUS GRANDE** que la position en devise.

</details>

## 🔴 Concept 10 — L'assurance de portefeuille synthétique

> **Le principe, et le lien avec la couverture.** *Créer une option synthétiquement consiste à **maintenir une position dans le sous-jacent (ou en futures) dont le delta égale celui de l'option requise**. **La position nécessaire pour créer une option synthétiquement est l'INVERSE de celle nécessaire pour la couvrir** — parce que couvrir une option revient à créer synthétiquement l'option égale et opposée.*

**Les deux raisons de préférer le synthétique à l'achat.**

1. *Les marchés d'options **n'ont pas toujours la liquidité** pour absorber les transactions requises par les gérants de gros fonds.*
2. *Les gérants ont souvent besoin de **strikes et de dates d'exercice différents** de ceux disponibles en bourse.*

**La règle opérationnelle.** Le delta du put européen sur le portefeuille est $\Delta=e^{-qT}[N(d_1)-1]$ ;(18.8), donc :

$$\boxed{\text{à tout instant, vendre une proportion }e^{-qT}\big[1-N(d_1)\big]\text{ du portefeuille et placer le produit sans risque}}$$

| Le portefeuille… | Le delta du put… | Il faut… |
|---|---|---|
| **baisse** | devient **plus négatif** | **augmenter** la proportion vendue |
| **monte** | devient **moins négatif** | **diminuer** la proportion vendue (racheter) |

> ⚠️ **D'où vient le coût de l'assurance.** ***Le coût vient de ce que le gérant vend TOUJOURS après une baisse du marché et achète TOUJOURS après une hausse.*** C'est la même « stratégie acheter-haut, vendre-bas » que la couverture en delta du concept 2 — vue de l'autre côté.

*La volatilité du portefeuille peut habituellement être prise égale à **son bêta fois la volatilité d'un indice de marché bien diversifié**.*

<details class="details--riche">
<summary>

**Exercice résolu — assurance synthétique par le portefeuille et par les futures (exemples 18.9 et 18.10)**

</summary>

**Données.** Portefeuille de **90 millions**. On veut un put européen **6 mois** de strike **87 millions**. $r=9\,\%$, $q=3\,\%$, $\sigma=25\,\%$. S&P 500 à **900**.

*(Alternative discutée en fiche 89 : acheter **1 000 contrats** de puts sur le S&P 500 de strike **870**.)*

**Partie A — par le portefeuille lui-même.** *Étape 1 — $d_1$.*

$$d_1=\frac{\ln(90/87)+(0{,}09-0{,}03+0{,}03125)\times0{,}5}{0{,}25\sqrt{0{,}5}}=\frac{0{,}033902+0{,}045625}{0{,}176777}=\mathbf{0{,}4499}$$

*Étape 2 — le delta requis.*

$$\Delta=e^{-0{,}015}\big[N(0{,}4499)-1\big]=0{,}985112\times(-0{,}32638)=\mathbf{-0{,}3215}$$

*Étape 3 — la position initiale.* **32,15 %** du portefeuille est vendu et placé sans risque. *Étape 4 — le rééquilibrage à la baisse.* Si le portefeuille tombe à **88 millions** après un jour, le delta devient **−0,3679** : il faut vendre **4,64 %** de plus du portefeuille d'origine. *Étape 5 — le rééquilibrage à la hausse.* S'il monte à **92 millions**, le delta devient **−0,2787** : il faut **racheter 4,28 %**.

**Partie B — par les futures sur indice.** *Pourquoi les préférer :* *les coûts de transaction des futures sur indice sont **généralement inférieurs** à ceux des actions sous-jacentes.*

*Étape 1 — la formule.* En combinant (18.6) et (18.8), le montant de futures à vendre, en proportion du portefeuille, est

$$\frac{e^{-qT}}{e^{-(r-q)T^\ast}}\big[1-N(d_1)\big]=e^{q(T^\ast-T)}e^{-rT^\ast}\big[1-N(d_1)\big]$$

*Étape 2 — le nombre de contrats.* Si le portefeuille vaut $A_1$ fois l'indice et chaque contrat $A_2$ fois l'indice :

$$\boxed{N=e^{q(T^\ast-T)}e^{-rT^\ast}\big[1-N(d_1)\big]\frac{A_1}{A_2}}$$

*Étape 3 — application.* Futures **9 mois** : $T=0{,}5$, $T^\ast=0{,}75$, $A_1=90\,000\,000/900=\mathbf{100\,000}$, $A_2=\mathbf{250}$, $d_1=0{,}4499$ :

$$N=e^{0{,}03\times0{,}25}\,e^{-0{,}09\times0{,}75}\times0{,}32638\times\frac{100\,000}{250}=122{,}96\ \longrightarrow\ \boxed{\textbf{123 contrats vendus}}$$

*Étape 4 — ne pas oublier.* *À mesure que le temps passe et que l'indice change, **la position en futures doit être ajustée**.*

**Si le portefeuille ne réplique pas l'indice.** *(a) Calculer son **bêta** ; (b) trouver la position en options **sur l'indice** qui donne la protection requise ; (c) choisir une position en **futures** pour créer ces options synthétiquement.* Le strike doit être *le niveau attendu de l'indice quand le portefeuille atteint sa valeur assurée*, et **le nombre d'options est $\beta$ fois** celui qu'il faudrait avec un bêta de 1 (fiche 89).

</details>

<details class="details--riche">
<summary>

**L'assurance de portefeuille a-t-elle causé le krach de 1987 ?**

</summary>

*Les stratégies d'assurance de portefeuille ont **le potentiel d'augmenter la volatilité**. **Quand le marché baisse, elles obligent les gérants à vendre des actions ou des futures — ce qui peut accentuer la baisse.*** La vente d'actions fait baisser l'indice **directement** ; la vente de futures fait baisser les prix futures, ce qui **crée une pression vendeuse sur les actions via l'arbitrage d'indice** (fiche 78). *Symétriquement à la hausse.*

*On peut aussi supposer que **de nombreux investisseurs suivent, consciemment ou non, leurs propres règles d'assurance de portefeuille*** — vendre quand le marché baisse pour limiter le risque.

> **La condition qui décide.** *L'effet sur la volatilité dépend de **la facilité avec laquelle le marché peut absorber les transactions générées**. Si l'assurance de portefeuille représente une **très petite fraction** de tous les échanges, il n'y a probablement **aucun effet**. **À mesure qu'elle devient populaire, elle est susceptible d'avoir un effet DÉSTABILISANT.***

**Les faits du 19 octobre 1987.** *Le Dow Jones chute de **plus de 20 %**. **En octobre 1987, entre 60 et 90 milliards de dollars** d'actifs actions étaient soumis à des règles d'assurance de portefeuille créant des puts synthétiquement.*

*Étape 1 — la mèche.* Du **mercredi 14 au vendredi 16 octobre**, le marché baisse d'environ **10 %**, l'essentiel **le vendredi après-midi**. *Étape 2 — ce que les règles imposaient.* Elles auraient dû générer **au moins 12 milliards** de ventes d'actions ou de futures. *Étape 3 — ce qui fut réellement vendu.* *Les assureurs de portefeuille n'eurent le temps de vendre que **4 milliards** — et **abordèrent la semaine suivante avec des montants énormes de ventes déjà dictées par leurs modèles**.* *Étape 4 — le lundi.* *On estime que les programmes de vente de **trois** assureurs de portefeuille représentèrent **près de 10 %** des ventes au NYSE, et que l'assurance de portefeuille représenta **21,3 %** de toutes les ventes sur les marchés de futures d'indice.*

⚠️ **Hull ne conclut pas à une causalité unique** : *il est probable que la baisse ait été **aggravée** par d'autres investisseurs vendant massivement.* Mais le mécanisme d'amplification est **structurel** : une stratégie qui **vend quand ça baisse** est, par construction, **procyclique**.

</details>

## Comment reconnaître le type d'exercice

| Signal | Grecque | Formule |
|---|---|---|
| « combien d'actions acheter ? » | **delta** | $N(d_1)$ · $N(d_1)-1$ · $\sum w_i\Delta_i$ |
| « de combien varie le delta ? » | **gamma** | $N'(d_1)/(S_0\sigma\sqrt T)$ |
| « quelle perte si $S$ bouge de $\pm x$ ? » | **gamma** | $\frac12\Gamma x^2$ |
| « perte par jour qui passe » | **thêta** | diviser par **365** ou **252** |
| « effet d'une hausse de 1 % de $\sigma$ » | **véga** | $0{,}01\times\mathcal V$ |
| « effet d'une hausse de 1 % de $r$ » | **rhô** | $0{,}01\times\rho$ |
| **Deux** contraintes à annuler | gamma **et** véga | système $2\times2$, **puis** delta |
| Une position en actif, on veut des futures | conversion | $H_F=e^{-(r-q)T}H_A$ |
| « créer un put synthétiquement » | **assurance** | vendre $e^{-qT}[1-N(d_1)]$ du portefeuille |

## Comment résoudre ce type d'exercice

**Protocole neutralisation multiple — 4 étapes.**

1. **Recenser** les grecques du portefeuille et de chaque instrument disponible.
2. **Poser le système** sur les grecques que **le sous-jacent ne peut pas corriger** (gamma, véga) — une équation par grecque, une inconnue par option.
3. **Résoudre**, puis calculer le **delta induit** par les positions en options ajoutées.
4. **Corriger le delta en dernier** avec le sous-jacent — il ne perturbe **ni gamma ni véga**.

**Protocole grecques d'un portefeuille — 3 étapes.**

1. Calculer $d_1$, $d_2$, $N(d_1)$, $N(d_2)$, $N'(d_1)$ **une seule fois**.
2. Appliquer les cinq formules ; **ajouter $e^{-qT}$ partout** si le sous-jacent verse un rendement (sauf rhô).
3. **Sommer** en pondérant par les quantités **signées**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire que la stratégie stop-loss converge | Elle **plafonne à 0,70**, quel que soit $\Delta t$ |
| Croire qu'une position delta-neutre le reste | **Le delta change** : il faut **rééquilibrer** |
| Oublier le signe négatif du delta d'un put | $\Delta(\text{put})=N(d_1)-1<0$ |
| Essayer de neutraliser le gamma avec l'action | **Gamma nul** pour l'actif : il faut des **options** |
| Neutraliser le delta **avant** gamma et véga | L'ordre est **imposé** : options d'abord, actif ensuite |
| Croire qu'un portefeuille gamma-neutre est véga-neutre | **Faux** — il faut **deux** options |
| Oublier de diviser le thêta par 365 ou 252 | La formule donne un thêta **annuel** |
| Croire qu'un gamma négatif ne perd que dans un sens | $\frac12\Gamma\Delta S^2$ : **les deux sens** |
| Utiliser la formule du tableau pour le rhô d'un futures | C'est $\boldsymbol{-cT}$ et $\boldsymbol{-pT}$ |
| Prendre le delta d'un futures pour 1 | C'est $\boldsymbol{e^{rT}}$ — **le règlement quotidien** fait la différence |
| Croire que l'assurance synthétique est gratuite | Elle **vend après une baisse, achète après une hausse** |
| Chercher la perte maximale d'un scénario dans un coin | **Pas toujours** — un papillon vendu perd **au centre** |

## 📌 Ultimate Review

**Les cinq formules** (action sans dividende) :

$$\Delta_c=N(d_1)\qquad \Delta_p=N(d_1)-1\qquad \Gamma=\frac{N'(d_1)}{S_0\sigma\sqrt T}\qquad \mathcal V=S_0\sqrt T\,N'(d_1)\qquad \rho_c=KTe^{-rT}N(d_2)$$

$$\Theta_c=-\frac{S_0N'(d_1)\sigma}{2\sqrt T}-rKe^{-rT}N(d_2)\qquad\qquad N'(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2}$$

**Avec un rendement $q$** : multiplier $\Delta$, $\Gamma$, $\mathcal V$ par $e^{-qT}$ ; thêta et rhô : voir le tableau. **Futures** : $q=r$, et $\rho=-cT$ ou $-pT$.

**Les deux relations fondamentales.**

$$\boxed{\Theta+rS\Delta+\tfrac12\sigma^2S^2\Gamma=r\Pi}\qquad\qquad\boxed{\Delta\Pi=\Theta\,\Delta t+\tfrac12\Gamma\,\Delta S^2\ \text{(delta-neutre)}}$$

**Ce que chaque instrument peut corriger.** L'**actif** : delta seulement (gamma et véga **nuls**). Les **options** : gamma et véga — il en faut **deux** pour les deux.

**Les deltas des contrats à terme.** Forward : $1$ (ou $e^{-qT}$) · **Futures : $e^{rT}$** (ou $e^{(r-q)T}$) · conversion $H_F=e^{-(r-q)T}H_A$.

**L'assurance synthétique.** Vendre $e^{-qT}[1-N(d_1)]$ du portefeuille · par futures : $N=e^{q(T^\ast-T)}e^{-rT^\ast}[1-N(d_1)]A_1/A_2$.

**Les chiffres du chapitre.** Exemple de référence : $S_0=49$, $K=50$, $r=5\,\%$, $\sigma=20\,\%$, $T=0{,}3846$ → $d_1=\mathbf{0{,}0542}$, prix **240 000**, vendue **300 000** · stop-loss : performance **1,02 → 0,76**, plancher **0,70** · delta : **0,43 → 0,09** · réconciliation semaine 9 : **−4 100** au net · $\Theta=\mathbf{-4{,}31}$ (**−0,0118**/jour) · $\Gamma=\mathbf{0{,}066}$ · $\mathcal V=\mathbf{12{,}1}$ · $\rho=\mathbf{8{,}91}$ · gamma+véga : $w_1=400$, $w_2=6\,000$, delta **3 240** · futures de change : **7 contrats** · assurance : delta **−0,3215**, **123 contrats** · krach 1987 : **60-90 Md** assurés, **21,3 %** des ventes de futures.

## 🧠 Active Recall

<details><summary>Pourquoi ni la position nue ni la position couverte ne constituent une bonne couverture ?</summary>

*Si les hypothèses de Black-Scholes tiennent, **le coût moyen est de 240 000 dans les deux cas**. Mais **en une occasion donnée, le coût peut aller de zéro à plus de 1 000 000**.* Nue : profit de 300 000 si le cours finit sous 50, mais **coût de 1 000 000** s'il finit à 60. Couverte : parfaite si l'option est exercée, mais **perte de 900 000** si le cours tombe à 40.

***Une bonne couverture garantirait que le coût soit toujours proche de 240 000.***

</details>

<details><summary>Pourquoi la stratégie stop-loss échoue-t-elle, malgré son apparence de perfection ?</summary>

Deux raisons, dont **une critique**. (1) Les flux surviennent à des dates différentes et doivent être **actualisés**. (2) ***Les achats et ventes ne peuvent pas se faire exactement au même prix $K$*** : *si les marchés sont efficients, le hedger **ne peut pas savoir**, quand $S=K$, si le cours va continuer au-dessus ou en dessous*. Achats à $K+\varepsilon$, ventes à $K-\varepsilon$, coût $2\varepsilon$ par aller-retour.

**Et réduire $\varepsilon$ ne sauve rien** : *le coût plus faible par transaction est compensé par la **fréquence accrue** ; quand $\varepsilon\to0$, **le nombre espéré de transactions tend vers l'infini***. La performance plafonne à **0,70**.

</details>

<details><summary>Un portefeuille contient +100 000 calls (Δ=0,533), −200 000 calls (Δ=0,468) et −50 000 puts (Δ=−0,508). Comment le rendre delta-neutre ?</summary>

$$\Delta=100\,000(0{,}533)-200\,000(0{,}468)-50\,000(-0{,}508)=53\,300-93\,600+25\,400=\mathbf{-14\,900}$$

Il faut **acheter 14 900 actions**. Le troisième terme est **positif** : on est **court** d'un delta **négatif**.

</details>

<details><summary>D'où vient réellement le coût de 240 000 dans la couverture en delta ?</summary>

*La procédure crée l'équivalent d'une **position longue** sur l'option, neutralisant la position courte créée par la vente.* **Or couvrir en delta une position courte implique de vendre l'action juste après une baisse et d'acheter juste après une hausse** — *on pourrait appeler cela une stratégie **« acheter haut, vendre bas »*** ! **Le coût vient de la différence moyenne entre le prix payé pour l'action et le prix auquel elle est revendue.**

</details>

<details><summary>Comparer les performances du stop-loss et de la couverture en delta.</summary>

| $\Delta t$ (sem.) | 5 | 1 | 0,25 |
|---|---|---|---|
| **Stop-loss** | 1,02 | 0,77 | **0,76** |
| **Delta** | 0,43 | 0,19 | **0,09** |

***La couverture en delta est une grande amélioration. Contrairement au stop-loss, sa performance s'améliore constamment à mesure que la couverture est surveillée plus fréquemment.*** Le stop-loss, lui, **plafonne**.

</details>

<details><summary>Pourquoi le thêta n'est-il pas un vrai paramètre de couverture, et à quoi sert-il alors ?</summary>

*Il y a de l'incertitude sur le prix futur, **mais aucune sur le passage du temps**. Il est sensé de se couvrir contre les variations du sous-jacent ; **il n'a aucun sens de se couvrir contre l'écoulement du temps**.*

**Il sert néanmoins**, parce que *dans un portefeuille **delta-neutre**, le thêta est un **proxy du gamma*** — la relation $\Theta+\frac12\sigma^2S^2\Gamma=r\Pi$ montre que **quand $\Theta$ est grand et positif, $\Gamma$ est grand et négatif**, et réciproquement.

</details>

<details><summary>Un portefeuille delta-neutre a un gamma de −10 000. Quelle est la perte si le cours bouge de ±2 ?</summary>

$$\Delta\Pi\approx\tfrac12\Gamma\,\Delta S^2=\tfrac12\times(-10\,000)\times4=\mathbf{-20\,000}\ \text{dollars}$$

**Le résultat est le même à $+2$ et à $-2$** : $\Delta S^2$ ne dépend pas du signe. **Un gamma négatif perd dans les deux sens** — c'est ce qui rend une position courte en options si dangereuse.

</details>

<details><summary>Pourquoi ne peut-on pas rendre un portefeuille gamma-neutre avec le sous-jacent ?</summary>

***Une position dans le sous-jacent a un gamma NUL*** — elle est **linéaire** en $S$, donc de dérivée seconde nulle. *Il faut une position dans un instrument **non linéairement dépendant** du sous-jacent*, c'est-à-dire une **option**. Même argument pour le **véga** : l'actif a un véga nul.

</details>

<details><summary>Un portefeuille delta-neutre a un gamma de −5 000 et un véga de −8 000. Deux options sont disponibles (Γ=0,5 ; V=2,0) et (Γ=0,8 ; V=1,2), de deltas 0,6 et 0,5. Le neutraliser.</summary>

$$\begin{cases}-5\,000+0{,}5w_1+0{,}8w_2=0\\ -8\,000+2{,}0w_1+1{,}2w_2=0\end{cases}\ \Longrightarrow\ \boxed{w_1=400,\quad w_2=6\,000}$$

Le delta devient $400(0{,}6)+6\,000(0{,}5)=\mathbf{3\,240}$ → **vendre 3 240 unités** du sous-jacent.

⚠️ **L'ordre compte** : gamma et véga d'abord (avec les **options**), delta ensuite (avec l'**actif**), car l'actif ne perturbe ni gamma ni véga.

</details>

<details><summary>Démontrer la relation entre delta, thêta et gamma.</summary>

Le prix d'un dérivé satisfait $\dfrac{\partial f}{\partial t}+rS\dfrac{\partial f}{\partial S}+\dfrac12\sigma^2S^2\dfrac{\partial^2f}{\partial S^2}=rf$ ; **la valeur $\Pi$ d'un portefeuille de tels dérivés la satisfait aussi**. En reconnaissant les grecques :

$$\Theta+rS\Delta+\tfrac12\sigma^2S^2\Gamma=r\Pi$$

Pour $\Delta=0$ : $\Theta+\frac12\sigma^2S^2\Gamma=r\Pi$. **C'est la démonstration que thêta et gamma sont de signes opposés** dans un portefeuille delta-neutre.

</details>

<details class="details--riche">
<summary>

Le véga calculé avec Black-Scholes a-t-il un sens, vu que le modèle suppose $\sigma$ constante ?

</summary>

*Cela peut sembler **étrange** : il serait **théoriquement plus correct** de le calculer avec un modèle à volatilité **stochastique**. **Il se trouve cependant que le véga calculé avec un tel modèle est très proche du véga de Black-Scholes** — la pratique fonctionne donc raisonnablement bien.*

Raffinement : *les volatilités implicites des options **courtes** changent plus que celles des **longues** ; on calcule donc souvent le véga en **changeant moins** les volatilités des options longues*.

</details>

<details><summary>Comment un desk gère-t-il ses grecques en pratique ?</summary>

*Un trader (ou un groupe) est responsable de **tous** les dérivés sur un sous-jacent. **Des limites sont définies pour chaque grecque**, et un dépassement en fin de journée exige une **autorisation spéciale**. La limite de delta s'exprime en **position équivalente maximale** dans l'actif ; celle de véga en **dollars par 1 % de volatilité**.*

> ***Par principe, les traders se rendent delta-neutres à la fin de CHAQUE journée. Gamma et véga sont surveillés mais pas gérés quotidiennement.*** *Vendant des options à leurs clients, ils **accumulent gamma et véga négatifs** et **guettent les occasions d'acheter des options à prix compétitifs**.*

**Le cauchemar** : *des options vendues qui **restent très proches de la monnaie** à l'approche de l'échéance* — gammas et végas y sont maximaux.

</details>

<details><summary>Quel est le delta d'un futures, et pourquoi diffère-t-il de celui d'un forward ?</summary>

**Forward** : valeur $S_0-Ke^{-rT}$, donc $\Delta=\mathbf{1{,}0}$. **Futures** : prix $S_0e^{rT}$, donc une variation $\Delta S$ du cours fait varier le prix futures de $\Delta S\,e^{rT}$ — et *comme **les futures sont réglés quotidiennement**, le détenteur réalise ce gain **presque immédiatement*** : $\Delta=\boldsymbol{e^{rT}}$.

⚠️ ***Le règlement quotidien rend donc les deltas légèrement différents — même quand les taux sont constants et que le prix forward égale le prix futures.***

</details>

<details><summary>Comment crée-t-on synthétiquement un put de protection, et d'où vient son coût ?</summary>

*Créer une option synthétiquement, c'est **maintenir une position dont le delta égale celui de l'option requise** — c'est **l'inverse** de la position qui la couvrirait.* Concrètement : **vendre à tout instant une proportion $e^{-qT}[1-N(d_1)]$ du portefeuille** et placer le produit sans risque. Quand le portefeuille **baisse**, on **vend davantage** ; quand il **monte**, on **rachète**.

> ***Le coût de l'assurance vient de ce que le gérant vend toujours après une baisse du marché et achète toujours après une hausse.***

</details>

<details class="details--riche">
<summary>

Portefeuille de 90 M, put 6 mois de strike 87 M, $r=9\,\%$, $q=3\,\%$, $\sigma=25\,\%$. Quelle fraction vendre, et combien de futures 9 mois ?

</summary>

$d_1=\dfrac{\ln(90/87)+(0{,}09-0{,}03+0{,}03125)(0{,}5)}{0{,}25\sqrt{0{,}5}}=\mathbf{0{,}4499}$, donc

$$\Delta=e^{-0{,}015}[N(0{,}4499)-1]=\mathbf{-0{,}3215}$$

→ **vendre 32,15 %** du portefeuille. Si le portefeuille tombe à 88 M : delta **−0,3679**, vendre **4,64 %** de plus ; s'il monte à 92 M : delta **−0,2787**, **racheter 4,28 %**.

**Par futures** ($T^\ast=0{,}75$, $A_1=100\,000$, $A_2=250$) :

$$N=e^{0{,}0075}e^{-0{,}0675}\times0{,}32638\times400=122{,}96\ \longrightarrow\ \mathbf{123}\ \text{contrats vendus}$$

</details>

<details><summary>L'assurance de portefeuille a-t-elle causé le krach de 1987 ?</summary>

Hull présente le **mécanisme** et les **faits**, sans conclusion unique. **Mécanisme** : ces stratégies obligent à **vendre quand le marché baisse**, ce qui **accentue la baisse** — directement par les actions, et indirectement par les futures via l'**arbitrage d'indice**.

**Faits** : **60 à 90 milliards** d'actifs sous ces règles ; la baisse de 10 % du 14 au 16 octobre aurait dû générer **au moins 12 milliards** de ventes, mais *ils n'eurent le temps de vendre que **4 milliards** et **abordèrent la semaine suivante avec des montants énormes déjà dictés par leurs modèles*** ; le lundi, trois assureurs représentèrent **près de 10 %** des ventes au NYSE et **21,3 %** des ventes de futures d'indice.

**La condition générale** : *si l'assurance est une très petite fraction des échanges, **aucun effet** ; à mesure qu'elle devient populaire, **elle est susceptible d'être déstabilisante***.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le problème que résout ce chapitre ? | Couvrir une option **sur mesure** non rachetable en bourse |
| Qu'est-ce qu'une position nue ? | **Ne rien faire** |
| Qu'est-ce qu'une position couverte ? | Acheter le sous-jacent **immédiatement** |
| Coût moyen des deux ? | **240 000** — mais **de 0 à plus d'un million** au cas par cas |
| Principe du stop-loss ? | Acheter dès que $S>K$, vendre dès que $S<K$ |
| Pourquoi échoue-t-il ? | Achats à $K+\varepsilon$, ventes à $K-\varepsilon$ |
| Que se passe-t-il si $\varepsilon\to0$ ? | Le nombre de transactions tend vers l'**infini** |
| Sa performance plancher ? | Environ **0,70** |
| Définition du delta ? | $\partial\Pi/\partial S$ — la **pente** |
| Delta d'un call ? d'un put ? | $N(d_1)$ · $N(d_1)-1$ |
| Delta d'une action ? | **1,0** |
| Qu'est-ce qu'un rééquilibrage ? | Ajuster la couverture **périodiquement** |
| Couverture statique ? | ***Hedge-and-forget*** |
| Delta d'un portefeuille ? | $\sum w_i\Delta_i$ |
| Performance de la couverture en delta à 0,25 semaine ? | **0,09** |
| D'où vient le coût de la couverture ? | **Acheter haut, vendre bas** |
| Définition du thêta ? | $\partial\Pi/\partial t$ — la **décroissance temporelle** |
| Thêta d'un call ? | $-\frac{S_0N'(d_1)\sigma}{2\sqrt T}-rKe^{-rT}N(d_2)$ |
| Écart entre thêta du put et du call ? | $rKe^{-rT}$ |
| Comment le convertir en jours ? | Diviser par **365** ou **252** |
| Signe habituel du thêta ? | **Négatif** |
| Vers quoi tend-il pour $S$ grand ? | $-rKe^{-rT}$ |
| Le thêta est-il un paramètre de couverture ? | **Non** — mais c'est un **proxy du gamma** |
| Définition du gamma ? | $\partial^2\Pi/\partial S^2$ |
| Formule du gamma ? | $N'(d_1)/(S_0\sigma\sqrt T)$ |
| Que mesure-t-il ? | La **courbure**, donc l'erreur de couverture |
| Variation d'un portefeuille delta-neutre ? | $\Theta\Delta t+\frac12\Gamma\Delta S^2$ |
| Gamma positif : comportement ? | Perd si $S$ ne bouge pas, **gagne** s'il bouge beaucoup |
| Quand le gamma est-il maximal ? | **À la monnaie**, **courte** maturité |
| Position en option pour annuler le gamma ? | $-\Gamma/\Gamma_T$ |
| Le sous-jacent peut-il changer le gamma ? | **Non** — gamma **nul** |
| La relation entre les grecques ? | $\Theta+rS\Delta+\frac12\sigma^2S^2\Gamma=r\Pi$ |
| Sa forme delta-neutre ? | $\Theta+\frac12\sigma^2S^2\Gamma=r\Pi$ |
| Définition du véga ? | $\partial\Pi/\partial\sigma$ |
| Formule du véga ? | $S_0\sqrt T\,N'(d_1)$ |
| Véga est-il une lettre grecque ? | **Non** |
| Gamma-neutre implique-t-il véga-neutre ? | **Non** — il faut **deux** options |
| Effet d'une hausse de 1 % de $\sigma$ ? | $0{,}01\times\mathcal V$ |
| Formule du rhô d'un call ? | $KTe^{-rT}N(d_2)$ |
| Combien de rhôs pour une option de change ? | **Deux** |
| Rhô d'un call sur futures ? | $\boldsymbol{-cT}$ |
| Que rendent les traders neutre chaque jour ? | Le **delta** |
| Quelles grecques accumulent-ils négativement ? | **Gamma et véga** (ils vendent des options) |
| Le cauchemar du trader d'options ? | Options **restant à la monnaie** près de l'échéance |
| Où est la perte maximale d'un tableau de scénarios ? | Souvent dans un **coin** — **pas toujours** |
| Contre-exemple ? | Un **papillon vendu** : perte maximale **au centre** |
| Delta d'un forward ? d'un futures ? | $1$ (ou $e^{-qT}$) · $\boldsymbol{e^{rT}}$ (ou $e^{(r-q)T}$) |
| Conversion actif → futures ? | $H_F=e^{-(r-q)T}H_A$ |
| Que multiplie-t-on par $e^{-qT}$ ? | **Delta, gamma, véga** |
| Créer une option synthétiquement, c'est… ? | L'**inverse** de la couvrir |
| Deux raisons de préférer le synthétique ? | **Liquidité** insuffisante · **strikes** non disponibles |
| Fraction du portefeuille à vendre ? | $e^{-qT}[1-N(d_1)]$ |
| D'où vient le coût de l'assurance ? | **Vendre après une baisse, acheter après une hausse** |
| Nombre de futures pour l'assurance ? | $e^{q(T^\ast-T)}e^{-rT^\ast}[1-N(d_1)]A_1/A_2$ |
| Montant assuré en octobre 1987 ? | **60 à 90 milliards** de dollars |
| Part de l'assurance dans les ventes de futures le 19 octobre ? | **21,3 %** |
| Quand l'assurance déstabilise-t-elle le marché ? | Quand elle devient une **grande fraction** des échanges |
