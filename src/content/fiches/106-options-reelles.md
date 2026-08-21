# Fiche 106 — Les options réelles : valoriser les investissements en actifs physiques

|  |  |
|---|---|
| **Matière** | Maths · Finance d'entreprise · Évaluation d'investissements |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 34 « Real Options » |
| **Difficulté** | High — le pont entre théorie des options et choix d'investissement |
| **Temps d'étude estimé** | 1 h 20 |
| **Prérequis** | Fiches 99 (prix de marché du risque), 105 (arbres de matières premières), 98 (Longstaff-Schwartz) |
| **Concepts clés** | Valeur actuelle nette, taux d'actualisation ajusté du risque, bêta proxy, extension de la valorisation risque-neutre, prix de marché du risque estimé par le MEDAF, valorisation d'une entreprise par Monte-Carlo, option d'abandon, option d'expansion, option de contraction, option de report, option d'extension, interaction entre options, plusieurs variables stochastiques |
| **Poids à l'examen** | La **règle en deux temps** : réduire chaque croissance de $\lambda_is_i$, **actualiser au taux SANS RISQUE** · $\lambda=\dfrac{\rho}{\sigma_m}(\mu_m-r)$ · les **cinq options intégrées** et leur nature (call ou put, américaine ou européenne). |

## 🎯 Vue d'ensemble

```
LA MÉTHODE TRADITIONNELLE   VAN = valeur actuelle des flux espérés du MONDE RÉEL,
   actualisés à un TAUX AJUSTÉ DU RISQUE (souvent estimé par un BÊTA PROXY / MEDAF)

⚠️ SES DEUX DÉFAUTS
  1. les projets contiennent des OPTIONS INTÉGRÉES, aux caractéristiques de risque
     TOTALEMENT DIFFÉRENTES  →  il faudrait +42,6 % pour un call, −52,5 % pour un put
  2. le bêta proxy est tiré d'entreprises qui ont ELLES-MÊMES des options intégrées

LA MÉTHODE DES OPTIONS RÉELLES   l'extension de la valorisation risque-neutre
  1. RÉDUIRE le taux de croissance espéré de chaque variable θᵢ de mᵢ à mᵢ − λᵢ sᵢ
  2. ACTUALISER les flux au TAUX SANS RISQUE
  λ s'estime par le MEDAF :   λ = ρ (μ_m − r) / σ_m

LES CINQ OPTIONS INTÉGRÉES
  ABANDON      un PUT AMÉRICAIN sur la valeur du projet, strike = valeur de liquidation
  EXPANSION    un CALL AMÉRICAIN sur la capacité additionnelle
  CONTRACTION  un PUT AMÉRICAIN sur la capacité perdue
  REPORT       un CALL AMÉRICAIN sur la valeur du projet  ← la plus importante
  EXTENSION    un CALL EUROPÉEN sur la valeur future de l'actif

L'EXEMPLE FIL ROUGE   un projet de VAN −0,54 devient +1,40 avec l'abandon,
                      et +0,52 avec l'expansion
```

**Le cadrage.** *« Souvent, **il y a des OPTIONS INTÉGRÉES dans ces opportunités d'investissement** — l'option d'**étendre** l'investissement, celle de l'**abandonner**, celle de le **différer**. **Ces options sont TRÈS DIFFICILES à valoriser avec les techniques traditionnelles d'évaluation d'investissement.** L'approche dite des OPTIONS RÉELLES tente de traiter ce problème par la théorie de valorisation d'options. »*

## 🔴 Concept 1 — L'approche traditionnelle et ses deux défauts

### 1.1 La VAN et le taux ajusté du risque

> ***La VAN d'un projet est la VALEUR ACTUELLE DE SES FLUX FUTURS INCRÉMENTAUX ESPÉRÉS. Le taux d'actualisation employé est un taux « AJUSTÉ DU RISQUE », choisi pour refléter le risque du projet. À mesure que le risque augmente, LE TAUX D'ACTUALISATION AUGMENTE AUSSI.***

**L'exemple.** *Un investissement coûtant **100 millions** et durant **5 ans** ; l'entrée de trésorerie espérée **dans le monde réel** est de **25 millions par an** ; taux ajusté du risque **12 %** (continu) :*

$$-100+25e^{-0{,}12}+25e^{-0{,}24}+25e^{-0{,}36}+25e^{-0{,}48}+25e^{-0{,}60}=\boxed{\mathbf{-11{,}53}}$$

> *« Une VAN **négative** indique que le projet **RÉDUIRA la valeur de l'entreprise pour ses actionnaires** et **ne doit PAS être entrepris**. Une VAN positive indique qu'il **augmentera la richesse des actionnaires**. »*

**La procédure du bêta proxy** *(via le MEDAF)* :

| Étape | Contenu |
|---|---|
| **1** | Prendre **un échantillon d'entreprises dont l'activité principale est la même** que celle du projet envisagé |
| **2** | Calculer **leurs bêtas** et les **moyenner** pour obtenir un **BÊTA PROXY** du projet |
| **3** | Poser le taux requis $=$ **taux sans risque $+$ bêta proxy $\times$ l'excès de rendement du portefeuille de marché sur le sans risque** |

### 1.2 Les deux problèmes

<details class="details--riche">
<summary>

**Problème 1 — les options ont des taux d'actualisation radicalement différents**

</summary>

**Le contre-exemple décisif de Hull** *(l'exemple du chapitre 12)*. *Action à **20 dollars** ; dans **3 mois** le prix sera **22 ou 18**. La valorisation risque-neutre donne la valeur d'un **call à 3 mois de strike 21** : **0,633**.*

| Instrument | Rendement requis dans le monde réel |
|---|---|
| **L'ACTION** | **16 %** |
| Le **CALL** | **42,6 %** |
| Le **PUT** | $\mathbf{-52{,}5\,\%}$ |

> ⚠️ ***« Cela signifie que SI L'APPROCHE VAN TRADITIONNELLE était utilisée pour valoriser le call, le taux d'actualisation CORRECT serait 42,6 %, et pour un put il serait −52,5 %. IL N'Y A AUCUN MOYEN SIMPLE D'ESTIMER CES TAUX D'ACTUALISATION. »***

**La transposition aux projets.** *« Considérons une entreprise envisageant de bâtir une usine pour un nouveau produit. Souvent, elle a **l'option d'ABANDONNER le projet si les choses tournent mal**. Elle peut aussi avoir **l'option d'ÉTENDRE l'usine si la demande dépasse les attentes**. **Ces options ont habituellement des caractéristiques de risque TOUT À FAIT DIFFÉRENTES du projet de base et exigent des taux d'actualisation DIFFÉRENTS.** »*

</details>

<details class="details--riche">
<summary>

**Problème 2 — le bêta proxy est lui-même contaminé**

</summary>

> ⚠️ ***« Les entreprises utilisées pour estimer un bêta proxy dans la procédure en trois étapes ONT ELLES-MÊMES DES OPTIONS D'EXPANSION ET D'ABANDON. LEURS BÊTAS REFLÈTENT CES OPTIONS et peuvent donc NE PAS ÊTRE APPROPRIÉS pour estimer un bêta du PROJET DE BASE (c'est-à-dire du projet SANS options intégrées). »***

**Le cercle vicieux :** on veut le taux du projet **nu**, mais on ne dispose que d'entreprises **habillées d'options**.

</details>

## 🔴 Concept 2 — L'extension de la valorisation risque-neutre

### 2.1 La règle en deux temps

**Le point de départ** *(fiche 99, §27.1)* : le prix de marché du risque d'une variable $\theta$ est

$$\boxed{\lambda=\frac{\mu-r}{\sigma}}\;\text{(34.1)}$$

où $\mu$ est le rendement d'un **titre NÉGOCIÉ dépendant seulement de $\theta$** et $\sigma$ sa volatilité. *$\lambda$ **ne dépend PAS du titre choisi**.*

**Le résultat général.** Si un actif réel dépend de plusieurs variables $\theta_i$ de croissance espérée $m_i$ et de volatilité $s_i$, **tout actif dépendant des $\theta_i$ se valorise en** :

$$\boxed{\begin{array}{l}\textbf{1. RÉDUISANT le taux de croissance espéré de chaque }\theta_i\textbf{ de }m_i\textbf{ à }m_i-\lambda_is_i\\[3pt]\textbf{2. ACTUALISANT les flux au TAUX SANS RISQUE}\end{array}}$$

> ⚠️ **La cohérence avec la valorisation risque-neutre ordinaire.** *Si $\theta_i$ est le prix d'une action ne versant pas de dividende, (34.1) implique $\dfrac{m_i-r}{s_i}=\lambda_i$, donc $m_i-\lambda_is_i=r$. **L'ajustement de croissance revient donc exactement à poser le rendement de l'action égal au taux sans risque.***

<details class="details--riche">
<summary>

**Exemple 34.1 — une option sur un loyer commercial**

</summary>

**Données.** Le coût de location de bureaux est coté **par pied carré et par an**, dans un bail neuf de **5 ans**. Coût courant **30 dollars**. Croissance espérée **12 % par an**, volatilité **20 %**, prix de marché du risque **0,3**. Une entreprise peut payer **1 million maintenant** pour l'option de **louer 100 000 pieds carrés à 35 dollars pour 5 ans, à partir de 2 ans**. Taux sans risque **5 %**. Loyer payé **annuellement d'avance**.

*Étape 1 — le payoff.* Avec $V$ le coût coté dans 2 ans :

$$100\,000\,A\,\max(V-35,\ 0)$$

où $A$ est **le facteur d'annuité pour cinq paiements d'AVANCE** :

$$A=1+e^{-0{,}05}+e^{-0{,}10}+e^{-0{,}15}+e^{-0{,}20}=\mathbf{4{,}5355}$$

*Étape 2 — L'AJUSTEMENT CLÉ.* La croissance espérée **en monde risque-neutre** vaut $m-\lambda s$ :

$$0{,}12-0{,}3\times0{,}2=\mathbf{0{,}06}\ \text{soit }\mathbf{6\,\%\text{ par an}}$$

$$\Longrightarrow\qquad\hat E(V)=30\,e^{0{,}06\times2}=\mathbf{33{,}82}$$

*Étape 3 — le payoff espéré risque-neutre*, par la formule lognormale (14A.1) :

$$453\,550\big[\hat E(V)N(d_1)-35\,N(d_2)\big]$$

$$d_1=\frac{\ln\big[\hat E(V)/35\big]+0{,}2^2\times2/2}{0{,}2\sqrt2}=\mathbf{0{,}0207}\qquad d_2=d_1-0{,}2\sqrt2=\mathbf{-0{,}2622}$$

$$\Longrightarrow\qquad\text{payoff espéré}=\mathbf{1{,}5015\ \text{million de dollars}}$$

*Étape 4 — ACTUALISER AU TAUX SANS RISQUE :*

$$1{,}5015\,e^{-0{,}05\times2}=\boxed{\mathbf{1{,}3586\ \text{million de dollars}}}$$

> ⚠️ ***« Cela montre qu'il vaut la peine de payer 1 million pour l'option. »*** *Noter que **le taux d'actualisation n'est JAMAIS ajusté du risque** : tout l'ajustement se fait sur **le DRIFT**.*

</details>

### 2.2 Estimer le prix de marché du risque

*L'approche des options réelles **évite d'estimer des taux d'actualisation ajustés du risque**, **mais elle exige des PRIX DE MARCHÉ DU RISQUE pour toutes les variables stochastiques**.*

<details class="details--riche">
<summary>

**La dérivation par le MEDAF**

</summary>

| Notation | Signification |
|---|---|
| $\mu$, $\sigma$ | rendement espéré et volatilité **d'un actif d'investissement dépendant SEULEMENT de la variable** |
| $\lambda$ | le prix de marché du risque de la variable |
| $\rho$ | **la corrélation instantanée entre les variations en % de la variable et les rendements d'un indice large** |
| $\mu_m$, $\sigma_m$ | rendement espéré et volatilité de l'indice |

*Étape 1 — le MEDAF en temps continu.* *Comme l'actif dépend **uniquement** de la variable, **la corrélation entre son rendement et l'indice est AUSSI $\rho$**.*

$$\mu-r=\frac{\rho\sigma}{\sigma_m}(\mu_m-r)$$

*Étape 2 — l'autre expression, par (34.1) :*

$$\mu-r=\lambda\sigma$$

*Étape 3 — égaler :*

$$\boxed{\lambda=\frac{\rho}{\sigma_m}(\mu_m-r)}\;\text{(34.2)}$$

⚠️ **Noter que $\sigma$ a disparu** : $\lambda$ ne dépend que de $\rho$ et des paramètres **du marché**.

**Exemple 34.2.** *Une analyse historique des ventes trimestrielles d'une entreprise montre que **les variations en pourcentage des ventes ont une corrélation de 0,3 avec les rendements du S&P 500**. La volatilité du S&P 500 est **20 %** et son excès de rendement espéré **5 %** :*

$$\lambda=\frac{0{,}3\times0{,}05}{0{,}2}=\boxed{\mathbf{0{,}075}}$$

</details>

**Les cas où l'on peut se passer d'estimer $\lambda$ :**

| Situation | Remède |
|---|---|
| **Pas de données historiques** | *utiliser **des variables PROXY similaires** — pour une nouvelle usine, **les ventes d'autres produits similaires**, en supposant la même corrélation au marché* |
| **Variable manifestement sans lien avec le marché** | *« **son prix de marché du risque doit être fixé à ZÉRO** »* |
| **La variable est le prix d'un actif D'INVESTISSEMENT** | *son rendement **total** en monde risque-neutre **est le taux sans risque*** |
| **La variable est le taux court $r$** | le chapitre 30 (fiche 102) montre comment estimer un processus risque-neutre **de la courbe initiale** |
| **La variable est une MATIÈRE PREMIÈRE** | *les **PRIX FUTURES** donnent le processus risque-neutre* (fiche 105) — *l'exemple 33.2 sur l'élevage en est une application simple* |

## 🟠 Concept 3 — Valoriser une entreprise

*« Les méthodes traditionnelles, comme **appliquer un multiple de capitalisation aux bénéfices courants, NE MARCHENT PAS BIEN pour les entreprises NOUVELLES. Typiquement, les bénéfices sont NÉGATIFS pendant les premières années**, l'entreprise cherchant à gagner des parts de marché et à établir des relations clients. »*

| Étape | Contenu |
|---|---|
| **1** | Développer **un modèle reliant les flux futurs à des variables** : taux de croissance des ventes, coûts variables en % des ventes, coûts fixes… |
| **2** | Pour les variables clés, estimer **un processus stochastique RISQUE-NEUTRE** (§2) |
| **3** | **Monte-Carlo** pour générer des scénarios alternatifs de flux nets annuels **en monde risque-neutre** |
| **4** | *Sous certains scénarios l'entreprise **fait très bien**, sous d'autres **elle FAIT FAILLITE et cesse ses opérations**. **La simulation doit contenir une RÈGLE intégrée déterminant quand la faillite survient.*** |
| **5** | La valeur est **la valeur actuelle du flux espéré de chaque année, actualisé au TAUX SANS RISQUE** |

<details class="details--riche">
<summary>

**Business Snapshot 34.1 — valoriser Amazon.com fin 1999**

</summary>

*Une des premières tentatives publiées : **Schwartz et Moon (2000)**, sur **Amazon.com fin 1999**.*

**Les deux processus supposés**, pour le chiffre d'affaires $R$ et son taux de croissance $\mu$ :

$$\boxed{\frac{dR}{R}=\mu\,dt+\sigma(t)\,dz_1}\qquad\boxed{d\mu=\kappa(\bar\mu-\mu)\,dt+\eta(t)\,dz_2}$$

*avec $dz_1$ et $dz_2$ supposés **NON CORRÉLÉS**.*

**Les hypothèses de coûts et d'état initial :**

| Élément | Valeur |
|---|---|
| Coût des marchandises vendues | **75 %** des ventes |
| Autres charges variables | **19 %** des ventes |
| Charges fixes | **75 millions par trimestre** |
| Ventes initiales | **356 millions** |
| Report déficitaire initial | **559 millions** |
| Taux d'imposition | **35 %** |
| Position de trésorerie initiale | **906 millions** |
| Horizon d'analyse | **25 ans** |
| Valeur terminale | **dix fois le résultat d'exploitation avant impôt** |
| Règle de faillite | **si le solde de trésorerie devient NÉGATIF** |

**Les prix de marché du risque :** *celui de $R$ estimé **sur données historiques** par la méthode du §34.3 ; **celui de $\mu$ supposé NUL**.*

**Le résultat.** *L'évaluation des scénarios prend en compte **l'exercice possible des obligations convertibles et des options de salariés**. La valeur pour les actionnaires est **la VA des flux nets actualisés au taux SANS RISQUE**.*

|  | Valeur |
|---|---|
| **Estimation de Schwartz et Moon** | **12,42 dollars** par action |
| **Prix de marché à l'époque** | **76,125 dollars** *(mais il a fortement décliné en 2000)* |

> ⚠️ **LA LEÇON MÉTHODOLOGIQUE, plus importante que le chiffre.** *« **Un des avantages clés de l'approche des options réelles est qu'elle IDENTIFIE LES HYPOTHÈSES CLÉS.** Schwartz et Moon ont trouvé que **la valeur estimée était TRÈS SENSIBLE à $\eta(t)$, LA VOLATILITÉ DU TAUX DE CROISSANCE. C'ÉTAIT UNE SOURCE IMPORTANTE D'OPTIONALITÉ : une petite hausse de $\eta(t)$ conduit à PLUS D'OPTIONALITÉ et à une GRANDE hausse de la valeur des actions Amazon.** »*

</details>

## 🔴 Concept 4 — Les cinq options intégrées

> *« La plupart des projets d'investissement impliquent des options. **Ces options peuvent ajouter une valeur CONSIDÉRABLE au projet et sont souvent soit IGNORÉES, soit valorisées INCORRECTEMENT.** »*

| Option | Nature | Prix d'exercice |
|---|---|---|
| **ABANDON** | *option de **vendre ou fermer** le projet* — **un PUT AMÉRICAIN sur la valeur du projet** | *la valeur de **liquidation (ou revente) MOINS les coûts de fermeture**. **Quand la valeur de liquidation est faible, le strike peut être NÉGATIF*** |
| **EXPANSION** | *option d'**investir davantage et augmenter la production*** — **un CALL AMÉRICAIN sur la valeur de la capacité additionnelle** | *le **coût de créer cette capacité, actualisé à la date d'exercice**. **Si la direction a initialement choisi de bâtir une capacité EXCÉDENTAIRE, le strike peut être relativement PETIT*** |
| **CONTRACTION** | *option de **réduire l'échelle** des opérations* — **un PUT AMÉRICAIN sur la valeur de la capacité perdue** | *la **valeur actuelle des dépenses futures ÉCONOMISÉES**, vue à la date d'exercice* |
| **REPORT** | *« **UNE DES OPTIONS LES PLUS IMPORTANTES ouvertes à un dirigeant** » — un **CALL AMÉRICAIN sur la valeur du projet*** | — |
| **EXTENSION** | *option de **prolonger la vie d'un actif en payant un montant fixe*** — **un CALL EUROPÉEN sur la valeur future de l'actif** | le montant fixe |

> ⚠️ **L'effet économique de l'abandon, à savoir énoncer.** *« Les options d'abandon **ATTÉNUENT L'IMPACT DES TRÈS MAUVAIS RÉSULTATS D'INVESTISSEMENT et AUGMENTENT la valorisation initiale d'un projet.** »*

## 🔴 Concept 5 — L'exemple complet d'extraction

### 5.1 Le projet sans options

**Les données.** *Une entreprise doit décider d'investir **15 millions** pour extraire **6 millions d'unités** d'une matière première **au rythme de 2 millions par an pendant 3 ans**. Coûts fixes **6 millions par an** ; coûts variables **17 dollars par unité**. Taux sans risque **10 %** ; prix spot **20 dollars** ; prix futures à 1, 2, 3 ans : **22, 23, 24**.*

<details class="details--riche">
<summary>

**La VAN de base, recalculée**

</summary>

*Étape 1 — les prix espérés risque-neutres.* **Ce sont les prix FUTURES : 22, 23, 24** (fiche 105).

*Étape 2 — les payoffs espérés (millions de dollars) :*

| Année | Calcul | Payoff |
|---|---|---|
| 1 | $2\times22-2\times17-6$ | **4,0** |
| 2 | $2\times23-34-6$ | **6,0** |
| 3 | $2\times24-34-6$ | **8,0** |

*Étape 3 — la valeur :*

$$-15{,}0+4{,}0e^{-0{,}1}+6{,}0e^{-0{,}2}+8{,}0e^{-0{,}3}=\boxed{\mathbf{-0{,}54}}$$

> *« Cette analyse indique que **le projet NE DOIT PAS être entrepris**, car il réduirait la richesse des actionnaires de **0,54 million**. »*

</details>

### 5.2 La valorisation par l'arbre

*On suppose maintenant que le prix spot suit*

$$\boxed{d\ln S=\big[\theta(t)-a\ln S\big]dt+\sigma\,dz}\;\text{(34.3)}$$

*avec $a=0{,}1$ et $\sigma=0{,}2$.* **C'est EXACTEMENT l'arbre construit à la fiche 105** (figures 33.2 et 34.1) — les prix 30,49 / 21,56 / 15,25 à 1 an, etc.

<details class="details--riche">
<summary>

**La valeur du projet à chaque nœud — figure 34.2**

</summary>

*Étape 1 — le nœud H (2 ans, $S=15{,}69$).* Les trois enfants sont **K (22,85), M (16,16), N (11,43)** avec probabilités **0,2217 / 0,6566 / 0,1217** :

| Enfant | Prix | Profit de la 3ᵉ année |
|---|---|---|
| K | 22,85 | $2\times22{,}85-34-6=\mathbf{5{,}70}$ |
| M | 16,16 | $2\times16{,}16-40=\mathbf{-7{,}68}$ |
| N | 11,43 | $2\times11{,}43-40=\mathbf{-17{,}14}$ |

$$V_H=\big[0{,}2217\times5{,}70+0{,}6566\times(-7{,}68)+0{,}1217\times(-17{,}14)\big]e^{-0{,}1}=\boxed{\mathbf{-5{,}31}}$$

*Étape 2 — le nœud C (1 an, $S=21{,}56$).* **Il faut ajouter le flux de l'année 2 à la valeur du nœud enfant** :

| Enfant | Valeur du nœud | Flux de l'année 2 | Total |
|---|---|---|---|
| **F** (31,37) | 21,42 | $2\times31{,}37-40=\mathbf{22{,}74}$ | **44,16** |
| **G** (22,18) | 5,99 | $2\times22{,}18-40=4{,}36$ | **10,35** |
| **H** (15,69) | $-5{,}31$ | $2\times15{,}69-40=-8{,}62$ | $\mathbf{-13{,}93}$ |

$$V_C=\big[0{,}1667\times44{,}16+0{,}6666\times10{,}35+0{,}1667\times(-13{,}93)\big]e^{-0{,}1}=\boxed{\mathbf{10{,}80}}$$

**L'arbre complet des valeurs du projet (figure 34.2) :**

| Date | Valeurs |
|---|---|
| **3 ans** | J, K, L, M, N $=\mathbf0$ |
| **2 ans** | E $=\mathbf{42{,}24}$ · F $=\mathbf{21{,}42}$ · G $=\mathbf{5{,}99}$ · H $=\mathbf{-5{,}31}$ · I $=\mathbf{-13{,}49}$ |
| **1 an** | B $=\mathbf{38{,}32}$ · C $=\mathbf{10{,}80}$ · D $=\mathbf{-9{,}65}$ |
| **0** | A $=\mathbf{14{,}46}$ |

$$\text{VAN}=14{,}46-15=\boxed{\mathbf{-0{,}54}}\quad\text{— en accord avec le calcul direct}$$

</details>

### 5.3 L'option d'abandon

<details class="details--riche">
<summary>

**Figure 34.3 — un put américain de strike ZÉRO**

</summary>

**Les hypothèses.** *L'entreprise peut abandonner **à tout moment**. **Aucune valeur de récupération** et **aucun paiement ultérieur** une fois abandonné.* ***C'est donc un PUT AMÉRICAIN de STRIKE ZÉRO*** : sa valeur d'exercice est $-V$ (la valeur du projet, changée de signe).

*Étape 1 — les nœuds à 2 ans.* *L'option **ne doit PAS être exercée en E, F et G** parce que **la valeur du projet y est POSITIVE**. Elle **doit l'être en H et I**, où elle vaut **5,31** et **13,49**.*

*Étape 2 — le nœud D.* Sans exercice :

$$\big(0{,}1217\times13{,}49+0{,}6566\times5{,}31+0{,}2217\times0\big)e^{-0{,}1}=\mathbf{4{,}64}$$

*La valeur d'exercer est **9,65**. C'est **plus grand que 4,64**, donc **le put DOIT être exercé au nœud D**.*

*Étape 3 — le nœud C :*

$$\big[0{,}1667\times0+0{,}6666\times0+0{,}1667\times5{,}31\big]e^{-0{,}1}=\mathbf{0{,}80}$$

*Étape 4 — le nœud A :*

$$\big(0{,}1667\times0+0{,}6666\times0{,}80+0{,}1667\times9{,}65\big)e^{-0{,}1}=\boxed{\mathbf{1{,}94}}$$

> ⚠️ ***« L'option d'abandon vaut donc 1,94 million. ELLE FAIT PASSER LA VALEUR DU PROJET DE −0,54 MILLION À +1,40 MILLION. UN PROJET AUPARAVANT INATTRACTIF A MAINTENANT UNE VALEUR POSITIVE POUR LES ACTIONNAIRES. »***

</details>

### 5.4 L'option d'expansion

<details class="details--riche">
<summary>

**Figure 34.4 — un call américain sur 20 % du projet**

</summary>

**Les hypothèses.** *Pas d'option d'abandon. Au lieu de cela, **l'option d'augmenter l'échelle de 20 % à tout moment**, pour un coût de **2 millions**. Production **2,0 → 2,4 millions d'unités par an**. Coûts variables inchangés à **17 dollars/unité**, coûts fixes **+20 % : 6,0 → 7,2 millions**.*

> ⚠️ ***« C'est un CALL AMÉRICAIN d'acheter 20 % DU PROJET DE BASE de la figure 34.2 pour 2 millions. »***
>
> *Pourquoi c'est simple : **une fois l'option exercée, TOUS les flux entrants ET sortants ultérieurs augmentent de 20 %.***

| Nœud | Valeur du projet | Exercer $=0{,}2V-2$ | Ne pas exercer | Décision |
|---|---|---|---|---|
| **E** | 42,24 | $\mathbf{6{,}45}$ | 0 | **EXERCER** |
| **F** | 21,42 | $\mathbf{2{,}28}$ | 0 | **EXERCER** |
| G, H, I | $\leqslant5{,}99$ | $\leqslant-0{,}80$ | 0 | ne pas exercer |
| **B** | 38,32 | $\mathbf{5{,}66}$ | moins | **EXERCER** |
| **C** | 10,80 | $0{,}16$ | $\mathbf{0{,}34}$ | **NE PAS exercer** |
| **A** | 14,46 | $0{,}89$ | $\mathbf{1{,}06}$ | **NE PAS exercer** |

*Le calcul au nœud C, sans exercice :*

$$\big(0{,}1667\times2{,}28+0{,}6666\times0+0{,}1667\times0\big)e^{-0{,}1}=\mathbf{0{,}34}\ >\ 0{,}2\times10{,}80-2=0{,}16$$

*Le calcul au nœud A, sans exercice :*

$$\big(0{,}1667\times5{,}66+0{,}6666\times0{,}34+0{,}1667\times0\big)e^{-0{,}1}=\boxed{\mathbf{1{,}06}}\ >\ 0{,}2\times14{,}46-2=0{,}89$$

> ⚠️ ***« L'option fait passer la valeur du projet de −0,54 à +0,52. Là encore, un projet qui avait une valeur négative en a maintenant une positive. »***

**Le cas plus difficile.** *« L'option d'expansion est **relativement facile** à valoriser ici **parce que TOUS les flux augmentent de 20 %**. **Dans le cas où les COÛTS FIXES restent les mêmes ou augmentent de MOINS de 20 %, il faut garder trace de PLUS D'INFORMATION aux nœuds. Spécifiquement :***

1. ***la valeur actuelle des COÛTS FIXES ultérieurs*** ;
2. ***la valeur actuelle des REVENUS NETS DES COÛTS VARIABLES ultérieurs.*** »

</details>

### 5.5 Options multiples et variables multiples

> ⚠️ **LA MISE EN GARDE ESSENTIELLE.**
>
> ***« Quand un projet a deux options ou plus, ELLES NE SONT TYPIQUEMENT PAS INDÉPENDANTES. La valeur d'avoir À LA FOIS l'option A ET l'option B N'EST GÉNÉRALEMENT PAS LA SOMME des valeurs des deux options. »***
>
> *L'illustration : **le projet ne peut pas être ÉTENDU s'il a déjà été ABANDONNÉ. Et la valeur du put d'abandon DÉPEND de si le projet a été étendu.***

**Le traitement — quatre états par nœud :**

$$\boxed{\begin{array}{ll}\text{1. non abandonné ; non étendu}&\text{2. non abandonné ; DÉJÀ étendu}\\ \text{3. DÉJÀ abandonné ; non étendu}&\text{4. DÉJÀ abandonné ; DÉJÀ étendu}\end{array}}$$

*« En remontant l'arbre, **on calcule la valeur COMBINÉE des options à chaque nœud POUR LES QUATRE alternatives**. »* *C'est l'approche des dérivés **dépendant du chemin** du §26.5 (fiche 98).*

*(Note de Hull : **dans les figures 34.3 et 34.4, les deux options n'interagissent PAS en fait ; mais l'interaction deviendrait un problème avec un arbre PLUS GRAND à pas plus petits.**)*

<details class="details--riche">
<summary>

**Plusieurs variables stochastiques — le recours à Longstaff-Schwartz**

</summary>

*« Quand il y a plusieurs variables stochastiques, **la valeur du projet de base se détermine habituellement par MONTE-CARLO**. **La valorisation des options intégrées est alors PLUS DIFFICILE, parce qu'une simulation Monte-Carlo travaille DU DÉBUT À LA FIN du projet : quand on atteint un certain point, ON N'A PAS D'INFORMATION sur la valeur actuelle des flux FUTURS du projet.** Cependant, **les techniques du §26.8 pour valoriser les américaines par Monte-Carlo peuvent parfois servir.** »*

**L'illustration.** *Schwartz et Moon expliquent comment leur analyse d'Amazon pourrait être étendue **pour tenir compte de l'option d'ABANDONNER (c'est-à-dire de déclarer FAILLITE) quand la valeur des flux futurs est NÉGATIVE**.* *(L'analyse du §34.4 supposait que la faillite survient quand la trésorerie passe sous zéro, **mais ce n'est pas nécessairement OPTIMAL**.)*

**La méthode :** *« À chaque pas de temps, **une relation POLYNOMIALE entre la valeur de NE PAS abandonner et des variables telles que le chiffre d'affaires courant, le taux de croissance, les volatilités, les soldes de trésorerie et les reports déficitaires** est supposée. **Chaque essai de simulation fournit une observation pour obtenir une estimation par MOINDRES CARRÉS de la relation à chaque date.** **C'est l'approche de LONGSTAFF ET SCHWARTZ du §26.8** »* (fiche 98).

</details>

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| Flux espérés et taux ajusté du risque donnés | la **VAN traditionnelle** — mais en signaler les limites |
| « bêta d'entreprises comparables » | le **bêta proxy** par le MEDAF, et sa **contamination par les options** |
| Croissance espérée **réelle** et prix du risque donnés | **réduire le drift de $\lambda s$**, actualiser au **sans risque** |
| Corrélation avec un indice donnée | $\lambda=\dfrac{\rho}{\sigma_m}(\mu_m-r)$ |
| « la variable est sans lien avec le marché » | $\lambda=\mathbf0$ |
| La variable est une matière première | les **prix FUTURES** donnent directement le processus risque-neutre |
| « option de fermer », « valeur de liquidation » | **PUT AMÉRICAIN**, strike = valeur de liquidation nette |
| « option d'augmenter la capacité » | **CALL AMÉRICAIN** sur la capacité additionnelle |
| « option de réduire l'échelle » | **PUT AMÉRICAIN** sur la capacité perdue |
| « option de différer » | **CALL AMÉRICAIN** sur la valeur du projet |
| « prolonger contre un montant fixe » | **CALL EUROPÉEN** |
| Deux options ou plus | **NE PAS ADDITIONNER** — définir les **états** par nœud |
| Plusieurs variables stochastiques | **Monte-Carlo** + **Longstaff-Schwartz** pour les options |

## Comment résoudre ce type d'exercice

**A — Valoriser un projet par options réelles.**

1. Identifier **les variables stochastiques** et leur croissance espérée **réelle** $m_i$ et volatilité $s_i$.
2. Estimer $\lambda_i$ : par $\dfrac{\rho}{\sigma_m}(\mu_m-r)$, par proxy, ou **directement des prix futures**.
3. Remplacer $m_i$ par $m_i-\lambda_is_i$.
4. Calculer les **flux espérés** dans ce monde.
5. **Actualiser au TAUX SANS RISQUE** — jamais à un taux ajusté.

**B — Valoriser une option intégrée sur un arbre.**

1. Construire l'arbre de la variable sous-jacente (§33.4, fiche 105).
2. **Calculer d'abord la valeur du PROJET DE BASE à chaque nœud**, en remontant. **Ne pas oublier d'AJOUTER le flux de la période** à la valeur du nœud enfant.
3. Remonter une **seconde fois** pour l'option, en comparant à chaque nœud **valeur de continuation** et **valeur d'exercice**.
4. Exprimer la valeur d'exercice en fonction de la valeur du projet : abandon $=-V$, expansion $=0{,}2V-2$, etc.
5. La valeur totale $=$ **VAN de base $+$ valeur de l'option**.

**C — Un projet à plusieurs options.**

1. Énumérer **tous les états possibles** (abandonné ou non × étendu ou non).
2. À chaque nœud, calculer la valeur **pour chaque état**.
3. Remonter en respectant **les transitions autorisées** (on ne peut pas étendre après avoir abandonné).
4. **Contrôle : la somme des valeurs individuelles est une BORNE SUPÉRIEURE de la valeur combinée.**

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Actualiser une option intégrée au taux du projet | il faudrait **+42,6 %** pour un call, **$-52{,}5\,\%$** pour un put |
| Utiliser un bêta proxy pour le projet de base | les comparables ont **elles-mêmes des options** |
| Ajuster **à la fois** le drift et le taux d'actualisation | **on ajuste le DRIFT, on actualise au SANS RISQUE** |
| Oublier de retrancher $\lambda s$ | ici $0{,}12-0{,}3\times0{,}2=\mathbf{0{,}06}$, pas 0,12 |
| Mettre $\sigma$ dans la formule de $\lambda$ | elle **disparaît** : $\lambda=\dfrac{\rho}{\sigma_m}(\mu_m-r)$ |
| Estimer $\lambda$ pour une matière première | inutile — **les prix futures suffisent** |
| Croire que le prix spot est l'espérance risque-neutre | **c'est le prix FUTURES** |
| Oublier le flux de la période dans la remontée | il faut $V_{\text{enfant}}+\text{flux}$, pas $V_{\text{enfant}}$ seul |
| Croire que le strike d'un abandon est toujours positif | **il peut être NÉGATIF** si les coûts de fermeture dépassent la liquidation |
| Croire qu'un projet à VAN négative doit toujours être rejeté | ici $-0{,}54$ devient $+1{,}40$ avec l'abandon |
| **Additionner** les valeurs de plusieurs options | ***elles ne sont PAS indépendantes*** |
| Supposer les coûts fixes proportionnels dans une expansion | s'ils ne le sont pas, il faut **suivre deux informations de plus** par nœud |
| Croire que la faillite au solde nul est optimale | **elle ne l'est pas nécessairement** — c'est une **option d'abandon** |
| Croire que le chiffre d'Amazon est le point important | **la leçon est que la méthode IDENTIFIE LES HYPOTHÈSES CLÉS** |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **La VAN traditionnelle** | flux espérés **du monde RÉEL**, taux **ajusté du risque** |
| **L'exemple** | $-100+5\times25e^{-0{,}12t}=\mathbf{-11{,}53}$ |
| **Le bêta proxy** | moyenne des bêtas d'entreprises **du même métier** |
| **Défaut 1** | les **options intégrées** exigent des taux **radicalement différents** |
| **Le contre-exemple** | call **+42,6 %**, put $\mathbf{-52{,}5\,\%}$, action 16 % |
| **Défaut 2** | les comparables ont **elles-mêmes** des options |
| **Prix de marché du risque** | $\lambda=\dfrac{\mu-r}{\sigma}$ |
| **La règle des options réelles** | drift $m_i\to m_i-\lambda_is_i$, actualiser au **SANS RISQUE** |
| **La cohérence** | pour une action sans dividende, cela **revient à $r$** |
| **Exemple 34.1 : $A$** | **4,5355** |
| **Le drift ajusté** | $0{,}12-0{,}3\times0{,}2=\mathbf{6\,\%}$ |
| **$\hat E(V)$** | $30e^{0{,}12}=\mathbf{33{,}82}$ |
| **Le payoff espéré** | **1,5015 million** |
| **La valeur** | $1{,}5015e^{-0{,}1}=\mathbf{1{,}3586}$ million |
| **La conclusion** | **payer 1 million en vaut la peine** |
| **Estimer $\lambda$** | $\lambda=\dfrac{\rho}{\sigma_m}(\mu_m-r)$ |
| **Exemple 34.2** | $\dfrac{0{,}3\times0{,}05}{0{,}2}=\mathbf{0{,}075}$ |
| **Sans données** | utiliser des **PROXY** similaires |
| **Sans lien avec le marché** | $\lambda=\mathbf0$ |
| **Actif d'investissement** | rendement total $=r$ |
| **Matière première** | les **prix FUTURES** donnent le processus |
| **Valoriser une jeune entreprise** | modèle de flux + processus risque-neutres + **Monte-Carlo** |
| **La règle indispensable** | **quand la FAILLITE survient** |
| **Amazon : les deux processus** | $dR/R=\mu\,dt+\sigma(t)dz_1$ et $d\mu=\kappa(\bar\mu-\mu)dt+\eta(t)dz_2$ |
| **Ses hypothèses de coûts** | **75 %** marchandises, **19 %** autres variables, **75 M** fixes/trimestre |
| **Son horizon et sa valeur terminale** | **25 ans** ; **10 × le résultat avant impôt** |
| **Son estimation** | **12,42 dollars** contre **76,125** de marché |
| **La leçon** | la méthode **IDENTIFIE LES HYPOTHÈSES CLÉS** ; ici $\eta(t)$ |
| **ABANDON** | **PUT AMÉRICAIN** ; strike $=$ liquidation $-$ coûts de fermeture |
| **Son strike peut être** | **NÉGATIF** |
| **Son effet** | atténue les **mauvais** résultats, **augmente** la valeur initiale |
| **EXPANSION** | **CALL AMÉRICAIN** sur la capacité additionnelle |
| **CONTRACTION** | **PUT AMÉRICAIN** sur la capacité perdue |
| **REPORT** | **CALL AMÉRICAIN** sur la valeur du projet — **la plus importante** |
| **EXTENSION** | **CALL EUROPÉEN** |
| **Le projet exemple** | 15 M, 2 M d'unités/an sur 3 ans, fixes 6 M, variables 17 |
| **Ses flux espérés** | **4,0 · 6,0 · 8,0** |
| **Sa VAN** | $\mathbf{-0{,}54}$ |
| **Le processus supposé** | $d\ln S=[\theta(t)-a\ln S]dt+\sigma dz$, $a=0{,}1$, $\sigma=0{,}2$ |
| **Valeur du projet en A** | **14,46** |
| **Valeurs à 1 an** | B $=38{,}32$ · C $=10{,}80$ · D $=-9{,}65$ |
| **Valeurs à 2 ans** | 42,24 · 21,42 · 5,99 · $-5{,}31$ · $-13{,}49$ |
| **Le nœud H** | $[0{,}2217(5{,}70)+0{,}6566(-7{,}68)+0{,}1217(-17{,}14)]e^{-0{,}1}=\mathbf{-5{,}31}$ |
| **Le nœud C** | $[0{,}1667(44{,}16)+0{,}6666(10{,}35)+0{,}1667(-13{,}93)]e^{-0{,}1}=\mathbf{10{,}80}$ |
| **L'abandon** | un put américain de strike **ZÉRO** |
| **Exercé où ?** | aux nœuds **D, H, I** |
| **Sa valeur** | $\mathbf{1{,}94}$ |
| **La VAN devient** | $-0{,}54+1{,}94=\boxed{\mathbf{+1{,}40}}$ |
| **L'expansion** | $+20\,\%$ pour **2 millions** |
| **Exercée où ?** | aux nœuds **E, F, B** |
| **Pas exercée où ?** | aux nœuds **C et A** |
| **Sa valeur** | $\mathbf{1{,}06}$ |
| **La VAN devient** | $-0{,}54+1{,}06=\boxed{\mathbf{+0{,}52}}$ |
| **Si les coûts fixes ne sont pas proportionnels** | suivre la **VA des fixes** et la **VA des revenus nets des variables** |
| **Options multiples** | **PAS additives** |
| **Le remède** | **quatre états** par nœud |
| **Plusieurs variables** | **Monte-Carlo** pour la base, **Longstaff-Schwartz** pour les options |

## 🧠 Active Recall

1. Qu'est-ce que l'approche VAN ? Comment le taux d'actualisation varie-t-il avec le risque ?
2. Refaire l'exemple des 100 millions sur 5 ans.
3. Que conclut-on d'une VAN négative ? positive ?
4. Décrire les trois étapes de l'estimation du taux requis par le MEDAF.
5. Quel est le premier problème de l'approche traditionnelle ?
6. Citer les trois rendements requis du contre-exemple de Hull et conclure.
7. Quel est le second problème ? Pourquoi le bêta proxy est-il contaminé ?
8. Écrire la définition du prix de marché du risque. De quoi ne dépend-il pas ?
9. Énoncer les deux étapes de la règle des options réelles.
10. Vérifier sa cohérence dans le cas d'une action sans dividende.
11. Refaire l'exemple 34.1 : le facteur d'annuité, le drift ajusté, $\hat E(V)$, la valeur.
12. Pourquoi le facteur d'annuité compte-t-il cinq termes dont un égal à 1 ?
13. Dériver (34.2) à partir du MEDAF et de (34.1).
14. Que remarque-t-on sur $\sigma$ dans cette formule ?
15. Refaire l'exemple 34.2.
16. Que faire s'il n'y a pas de données historiques ?
17. Que vaut $\lambda$ si la variable est sans lien avec le marché ?
18. Citer trois cas où l'on n'a pas besoin d'estimer $\lambda$.
19. Pourquoi les multiples de bénéfices échouent-ils pour les jeunes entreprises ?
20. Décrire les cinq étapes de la valorisation d'une entreprise par options réelles.
21. Quelle règle la simulation doit-elle contenir ?
22. Écrire les deux processus du modèle Schwartz-Moon pour Amazon.
23. Citer cinq hypothèses de coûts ou d'état initial.
24. Quel horizon et quelle valeur terminale ont-ils retenus ?
25. Quels prix de marché du risque ont-ils employés ?
26. Quelle valeur ont-ils trouvée, et quel était le prix de marché ?
27. Quelle est la leçon méthodologique la plus importante de cet exemple ?
28. Décrire l'option d'abandon : nature, strike, effet économique.
29. Quand le strike d'un abandon peut-il être négatif ?
30. Décrire l'option d'expansion : nature et strike.
31. Quand le strike d'une expansion peut-il être petit ?
32. Décrire les options de contraction, de report et d'extension.
33. Laquelle Hull qualifie-t-il de plus importante ?
34. Laquelle est européenne plutôt qu'américaine ?
35. Décrire le projet d'extraction et calculer ses trois flux espérés.
36. Pourquoi utilise-t-on les prix futures comme espérances ?
37. Calculer la VAN de base.
38. Écrire le processus supposé pour le prix spot.
39. Calculer la valeur du projet au nœud H, en détaillant les trois profits.
40. Calculer la valeur au nœud C, en expliquant pourquoi on ajoute le flux.
41. Donner les valeurs du projet aux neuf nœuds.
42. Vérifier que la VAN par l'arbre égale la VAN directe.
43. Quelle est la nature exacte de l'option d'abandon ici ?
44. Où doit-elle être exercée à 2 ans, et pourquoi pas ailleurs ?
45. Calculer la valeur au nœud D avec et sans exercice, et conclure.
46. Calculer les valeurs aux nœuds C et A.
47. De combien l'abandon change-t-il la VAN ?
48. Décrire l'option d'expansion : les changements de production et de coûts.
49. Pourquoi est-elle « facile » à valoriser ici ?
50. Où doit-elle être exercée, et où non ?
51. Détailler les calculs aux nœuds C et A.
52. De combien l'expansion change-t-elle la VAN ?
53. Que faudrait-il suivre en plus si les coûts fixes n'étaient pas proportionnels ?
54. Pourquoi les valeurs de plusieurs options ne s'additionnent-elles pas ?
55. Donner les deux interactions concrètes de l'exemple.
56. Énumérer les quatre états à définir par nœud.
57. Pourquoi Monte-Carlo pose-t-il un problème pour les options intégrées ?
58. Comment Schwartz et Moon proposent-ils de le résoudre ?
59. Quelle relation supposent-ils, et comment l'estiment-ils ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Que vaut la VAN ? | La VA des **flux incrémentaux espérés** |
| Quel taux d'actualisation ? | Un taux **AJUSTÉ DU RISQUE** |
| L'exemple des 100 M ? | **$-11{,}53$** |
| Que conclut une VAN négative ? | Le projet **réduit la richesse** des actionnaires |
| Le bêta proxy ? | La **moyenne des bêtas** d'entreprises du même métier |
| Défaut 1 de la VAN ? | Les **options intégrées** ont d'autres risques |
| Rendement requis du call ? | **42,6 %** |
| Du put ? | $\mathbf{-52{,}5\,\%}$ |
| De l'action ? | **16 %** |
| Ce que cela prouve ? | Aucun moyen simple d'estimer ces taux |
| Défaut 2 ? | Les comparables ont **elles-mêmes des options** |
| Prix de marché du risque ? | $\lambda=(\mu-r)/\sigma$ |
| De quoi ne dépend-il pas ? | Du **titre choisi** |
| Étape 1 des options réelles ? | **Réduire le drift** de $\lambda_is_i$ |
| Étape 2 ? | Actualiser au taux **SANS RISQUE** |
| Cohérence avec l'action ? | $m-\lambda s=r$ |
| Ex. 34.1 : le facteur d'annuité ? | **4,5355** |
| Pourquoi un terme égal à 1 ? | Le loyer est payé **d'AVANCE** |
| Le drift ajusté ? | $0{,}12-0{,}06=\mathbf{6\,\%}$ |
| $\hat E(V)$ ? | $30e^{0{,}12}=\mathbf{33{,}82}$ |
| Le payoff espéré ? | **1,5015 M** |
| La valeur de l'option ? | **1,3586 M** |
| La conclusion ? | **Payer 1 M en vaut la peine** |
| Formule de $\lambda$ par le MEDAF ? | $\dfrac{\rho}{\sigma_m}(\mu_m-r)$ |
| Que devient $\sigma$ ? | Elle **DISPARAÎT** |
| Que représente $\rho$ ? | La corrélation **variable / indice de marché** |
| Ex. 34.2 : $\lambda$ ? | $0{,}3\times0{,}05/0{,}2=\mathbf{0{,}075}$ |
| Sans données historiques ? | Utiliser des variables **PROXY** |
| Variable sans lien avec le marché ? | $\lambda=\mathbf0$ |
| Actif d'investissement ? | Rendement total $=\mathbf r$ |
| Taux court ? | Processus estimé de la **courbe initiale** |
| Matière première ? | Les **PRIX FUTURES** |
| Défaut des multiples de bénéfices ? | Les jeunes entreprises ont des bénéfices **NÉGATIFS** |
| Méthode de valorisation d'entreprise ? | Modèle + processus risque-neutres + **Monte-Carlo** |
| Ce que la simulation doit contenir ? | Une **règle de FAILLITE** |
| Amazon : processus du CA ? | $dR/R=\mu\,dt+\sigma(t)dz_1$ |
| Processus du taux de croissance ? | $d\mu=\kappa(\bar\mu-\mu)dt+\eta(t)dz_2$ |
| Corrélation entre les deux ? | **NULLE** |
| Coût des marchandises ? | **75 %** des ventes |
| Autres variables ? | **19 %** |
| Charges fixes ? | **75 M par trimestre** |
| Trésorerie initiale ? | **906 M** |
| Horizon ? | **25 ans** |
| Valeur terminale ? | **10 ×** le résultat avant impôt |
| Prix du risque de $\mu$ ? | **ZÉRO** |
| L'estimation de Schwartz-Moon ? | **12,42 dollars** |
| Le prix de marché ? | **76,125 dollars** |
| La leçon méthodologique ? | La méthode **identifie les hypothèses clés** |
| L'hypothèse la plus sensible ? | $\eta(t)$, la **volatilité du taux de croissance** |
| Nature de l'option d'abandon ? | **PUT AMÉRICAIN** |
| Son strike ? | Liquidation **moins** coûts de fermeture |
| Peut-il être négatif ? | **OUI** |
| Son effet ? | Atténue les mauvais résultats, **augmente la valeur initiale** |
| Nature de l'expansion ? | **CALL AMÉRICAIN** |
| Son strike ? | Le coût de la capacité, **actualisé à l'exercice** |
| Nature de la contraction ? | **PUT AMÉRICAIN** |
| Son strike ? | La VA des **dépenses économisées** |
| Nature du report ? | **CALL AMÉRICAIN** sur la valeur du projet |
| Sa qualification par Hull ? | **Une des plus importantes** |
| Nature de l'extension ? | Un **CALL EUROPÉEN** |
| Le projet exemple : l'investissement ? | **15 millions** |
| Sa production ? | **2 M d'unités par an, 3 ans** |
| Ses coûts ? | Fixes **6 M/an**, variables **17/unité** |
| Ses trois flux espérés ? | **4,0 · 6,0 · 8,0** |
| Sa VAN ? | $\mathbf{-0{,}54}$ |
| Le processus supposé ? | $d\ln S=[\theta(t)-a\ln S]dt+\sigma dz$ |
| Ses paramètres ? | $a=0{,}1$, $\sigma=0{,}2$ |
| Valeur du projet en A ? | **14,46** |
| En B ? | **38,32** |
| En C ? | **10,80** |
| En D ? | $\mathbf{-9{,}65}$ |
| En E ? | **42,24** |
| En H ? | $\mathbf{-5{,}31}$ |
| En I ? | $\mathbf{-13{,}49}$ |
| Que faut-il ajouter en remontant ? | Le **FLUX de la période** |
| Nature de l'abandon ici ? | Put américain de strike **ZÉRO** |
| Exercé où à 2 ans ? | **H et I** |
| Pourquoi pas en E, F, G ? | La valeur du projet y est **POSITIVE** |
| Valeur en D sans exercice ? | **4,64** |
| Valeur d'exercice en D ? | **9,65** → **EXERCER** |
| Valeur en C ? | **0,80** |
| Valeur de l'option d'abandon ? | **1,94** |
| La VAN devient ? | $\mathbf{+1{,}40}$ |
| L'expansion : de combien ? | $+20\,\%$ |
| Son coût ? | **2 millions** |
| Production après ? | **2,4 M d'unités** |
| Coûts fixes après ? | **7,2 M** |
| Pourquoi est-ce facile ? | **TOUS les flux augmentent de 20 %** |
| Payoff d'exercice en E ? | $0{,}2\times42{,}24-2=\mathbf{6{,}45}$ |
| En F ? | **2,28** |
| En B ? | **5,66** |
| En C, exercer ou attendre ? | **Attendre** : 0,34 &gt; 0,16 |
| En A ? | **Attendre** : 1,06 &gt; 0,89 |
| Valeur de l'option d'expansion ? | **1,06** |
| La VAN devient ? | $\mathbf{+0{,}52}$ |
| Si les fixes ne sont pas proportionnels ? | Suivre **VA des fixes** et **VA des revenus nets** |
| Peut-on additionner deux options ? | **NON** |
| Les deux interactions ? | Pas d'expansion **après abandon** · le put dépend de l'expansion |
| Combien d'états par nœud ? | **QUATRE** |
| Le problème de Monte-Carlo ? | Il va **du début à la fin** — pas de valeur future connue |
| Le remède ? | **LONGSTAFF-SCHWARTZ** |
| Quelle relation suppose-t-on ? | Une relation **POLYNOMIALE** |
| Comment l'estime-t-on ? | Par **moindres carrés** sur les essais |
