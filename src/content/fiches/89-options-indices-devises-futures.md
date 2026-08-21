# Fiche 89 — Options sur indices, devises et futures : le modèle de Black

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitres 16 « Options on Stock Indices and Currencies » et 17 « Futures Options » |
| **Difficulté** | Must know — l'extension qui rend Black-Scholes universel |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiches 83, 85, 87 |
| **Concepts clés** | Options sur indices, assurance de portefeuille, options de change, *range forward*, rendement de dividende connu, règle $S_0\to S_0e^{-qT}$, formules de Merton, options sur futures, parité pour futures, dérive nulle du prix futures, modèle de Black, options *futures-style* |
| **Poids à l'examen** | La **règle $S_0\to S_0e^{-qT}$** et ses trois applications ($q$, $r_f$, $r$) · l'**assurance de portefeuille avec $\beta\ne1$** · le **modèle de Black** $c=e^{-rT}[F_0N(d_1)-KN(d_2)]$. |

## 🎯 Vue d'ensemble

```
LA RÈGLE UNIQUE   remplacer S₀ par S₀e^{−qT} dans TOUS les résultats du ch. 14
  indice   q = rendement du dividende de l'indice
  devise   q = r_f  (taux sans risque étranger)
  futures  q = r    (dérive risque-neutre NULLE)

FORMULES   c = S₀e^{−qT}N(d₁) − Ke^{−rT}N(d₂)      d₁ = [ln(S₀/K)+(r−q+σ²/2)T]/(σ√T)
BLACK      c = e^{−rT}[F₀N(d₁) − KN(d₂)]           d₁ = [ln(F₀/K)+σ²T/2]/(σ√T)
PARITÉ     c + Ke^{−rT} = p + S₀e^{−qT}   =   p + F₀e^{−rT}
ASSURANCE  β · V/(100·S₀) contrats de put, strike lu dans le MEDAF
```

**L'unification.** *Les résultats du chapitre 14 sont d'abord étendus aux options européennes sur une action versant un **rendement de dividende connu**. On soutient ensuite que **les indices ET les devises sont analogues à des actions versant un rendement de dividende**, ce qui permet d'appliquer les mêmes résultats.* Le chapitre 17 ajoute le troisième cas : **un prix futures se comporte comme une action de rendement $q=r$**.

## 🟡 Concept 1 — Les options sur indices

| Caractéristique | Valeur |
|---|---|
| Taille du contrat | **100 fois l'indice** |
| Règlement | **en espèces** — call : $(S-K)\times100$, put : $(K-S)\times100$ |
| Produits du CBOE | **OEX et XEO** (S&P 100, américaine et européenne), **SPX** (S&P 500, européenne), **DJX** (Dow Jones, européenne), **NDX** (Nasdaq 100, européenne) |
| Autres formes | **LEAPS** et options **FLEX** existent aussi sur indices |

⚠️ *L'indice Dow Jones utilisé pour les options vaut **0,01 fois** l'indice habituellement coté.*

### 1.1 L'assurance de portefeuille

**Le cas simple, $\beta=1$.** *Un bêta de 1 implique que les rendements du portefeuille reflètent ceux de l'indice.* En supposant le même rendement de dividende, on protège le portefeuille contre une chute de l'indice sous $K$ en achetant **un contrat de put de strike $K$ pour chaque $100S_0$ dollars de portefeuille**.

<details class="details--riche">
<summary>

**Exercice résolu A — assurance avec $\beta=1$**

</summary>

**Données.** Portefeuille de **500 000**, indice à **1 000**. Protection voulue : ne pas descendre sous **450 000** en trois mois.

*Étape 1 — exprimer le portefeuille en unités d'indice.* $500\,000/1\,000=\mathbf{500}$ fois l'indice. *Étape 2 — nombre de contrats.* Chaque contrat porte sur 100 fois l'indice → $500/100=\mathbf{5}$ contrats. *Étape 3 — le strike.* La protection à 450 000, soit **90 %** de 500 000, correspond à un indice de $0{,}9\times1\,000=\mathbf{900}$. *Étape 4 — vérifier sur un scénario.* Si l'indice tombe à **880**, le portefeuille vaut environ **440 000**. Les options paient

$$5\times(900-880)\times100=\mathbf{10\,000}$$

Total : $440\,000+10\,000=\mathbf{450\,000}$ — exactement la valeur assurée.

</details>

**Le cas général, $\beta\ne1$.** Il faut acheter $\beta$ contrats pour chaque $100S_0$ dollars :

$$\boxed{N=\beta\,\frac{V}{100\,S_0}}$$

<details class="details--riche">
<summary>

**Exercice résolu B — assurance avec $\beta=2$, et le calcul du strike par le MEDAF**

</summary>

**Données.** Même portefeuille de **500 000**, indice **1 000**, mais $\beta=\mathbf{2{,}0}$. Taux sans risque **12 %**, rendement du dividende **4 %** sur l'indice **et** sur le portefeuille. Protection à **450 000** sur **trois mois**.

*Étape 1 — le nombre de contrats.*

$$N=2{,}0\times\frac{500\,000}{1\,000\times100}=\mathbf{10}\ \text{contrats}\quad\text{(au lieu de 5)}$$

*Étape 2 — le strike ne se lit plus directement.* Il faut passer par le **MEDAF** : *l'excès de rendement espéré du portefeuille sur le taux sans risque égale $\beta$ fois l'excès de rendement de l'indice*. Détail du calcul pour un indice à **1 040** :

| Étape | Valeur (par trimestre) |
|---|---|
| Rendement dû au changement d'indice | $40/1\,000=\mathbf{4\,\%}$ |
| Dividendes de l'indice | $0{,}25\times4=\mathbf{1\,\%}$ |
| **Rendement total de l'indice** | $4+1=\mathbf{5\,\%}$ |
| Taux sans risque | $0{,}25\times12=\mathbf{3\,\%}$ |
| Excès de l'indice | $5-3=\mathbf{2\,\%}$ |
| **Excès du portefeuille** | $2\times2=\mathbf{4\,\%}$ |
| Rendement du portefeuille | $3+4=\mathbf{7\,\%}$ |
| Moins ses dividendes | $-1\,\%$ |
| **Hausse de valeur** | $\mathbf{6\,\%}$ |
| **Valeur du portefeuille** | $500\,000\times1{,}06=\mathbf{530\,000}$ |

*Étape 3 — la table complète.*

| Indice dans 3 mois | 1 080 | 1 040 | 1 000 | **960** | 920 | 880 |
|---|---|---|---|---|---|---|
| Portefeuille | 570 000 | 530 000 | 490 000 | **450 000** | 410 000 | 370 000 |

*Étape 4 — lire le strike.* Le niveau de protection **450 000** correspond à un indice de $\boxed{\mathbf{960}}$. *Étape 5 — vérifier.* Si l'indice tombe à **880**, le portefeuille vaut **370 000** et les puts paient

$$(960-880)\times10\times100=\mathbf{80\,000}$$

Total : $370\,000+80\,000=\mathbf{450\,000}$ .

> ⚠️ **La conclusion à retenir.** ***Il y a DEUX raisons pour lesquelles le coût de la couverture augmente avec le bêta : il faut PLUS de puts, ET ils ont un strike PLUS ÉLEVÉ.***

*Détail de finesse signalé en note : environ **1 %** de 500 000, soit **5 000**, sera gagné en dividendes. Si l'on veut que le niveau assuré de 450 000 **inclue** les dividendes, il faut choisir le strike correspondant à **445 000**, soit **955**.*

</details>

## 🟡 Concept 2 — Les options de change et le *range forward*

*Les options de change se traitent **principalement de gré à gré** : l'avantage est de permettre de **grosses transactions**, avec strikes, échéances et autres caractéristiques **taillés sur mesure** pour les trésoriers. Le marché coté (NASDAQ OMX) est **bien plus petit**.*

**Exemples de payoffs.** Call européen d'achat d'**un million d'euros** à **1,2000** USD/EUR ; si le cours final est **1,2500** : $1\,000\,000\times(1{,}2500-1{,}2000)=\mathbf{50\,000}$ dollars. Put européen de vente de **10 millions de dollars australiens** à **0,9000** ; si le cours est **0,8700** : $10\,000\,000\times0{,}0300=\mathbf{300\,000}$ dollars.

**L'usage de couverture.** *Une entreprise devant **recevoir** des livres peut acheter des **puts** échéant à cette date : cela **garantit un cours plancher** tout en laissant profiter des mouvements favorables. Une entreprise devant **payer** des livres achète des **calls**.* *Alors qu'un forward **verrouille** le cours, une option fournit **une sorte d'assurance — et ce n'est pas gratuit** : entrer dans un forward ne coûte rien, une option exige une **prime payée d'avance**.*

<details class="details--riche">
<summary>

**Le *range forward* — comment le rendre gratuit**

</summary>

**Le décor.** Une entreprise américaine recevra **un million de livres** dans trois mois. Cours à terme trois mois : **1,5200**. Elle pourrait simplement vendre à terme, verrouillant **1 520 000** dollars.

**L'alternative — le *range forward* court.** Acheter un **put** européen de strike $K_1$ et **vendre** un **call** européen de strike $K_2$, avec $K_1<1{,}5200<K_2$.

| Cours final | Ce qui se passe | Cours réalisé |
|---|---|---|
| $<K_1$ | le **put est exercé** | $\mathbf{K_1}$ |
| entre $K_1$ et $K_2$ | **aucune** option exercée | le **cours du marché** |
| $>K_2$ | le **call est exercé contre** l'entreprise | $\mathbf{K_2}$ |

**Le *range forward* long** (pour une entreprise devant **payer**) : **vendre** le put $K_1$ et **acheter** le call $K_2$. *Le cours payé est le même que celui reçu dans l'exemple précédent.*

**La condition de gratuité — et son calcul.** *En pratique, un range forward est monté de sorte que **le prix du put égale le prix du call** : il ne coûte alors **rien** à mettre en place, tout comme un forward ordinaire.*

*Étape 1 — les données.* Taux américain et britannique **tous deux à 5 %**, donc **cours comptant $=$ cours à terme $=1{,}5200$**. Volatilité **14 %**. *Étape 2 — chercher la paire équilibrée.* Un put de strike **1,5000** vaut exactement le même prix qu'un call de strike **1,5413** — **tous deux 0,03250**. *Étape 3 — conclure.* $K_1=\mathbf{1{,}5000}$ et $K_2=\mathbf{1{,}5413}$ donnent un contrat de **coût nul**.

> ⚠️ **Le cas limite éclairant.** *À mesure que les strikes du call et du put se **rapprochent**, le range forward **devient un forward ordinaire** — court dans un cas, long dans l'autre.* Le forward est donc le **cas dégénéré** du tunnel.

</details>

## 🔴 Concept 3 — La règle unique : un rendement de dividende connu

> **Le raisonnement, en trois lignes.** *Les dividendes font baisser le cours à la date de détachement. Un rendement de dividende au taux $q$ fait donc croître le cours **moins vite qu'il ne le ferait autrement, d'un montant $q$**. Si, avec un rendement $q$, le cours passe de $S_0$ à $S_T$, alors **en l'absence de dividendes il passerait de $S_0$ à $S_Te^{qT}$** — ou, de façon équivalente, **de $S_0e^{-qT}$ à $S_T$**.*
>
> **On obtient donc la même loi de $S_T$ dans les deux cas :**
>
> 1. l'action part de **$S_0$** et verse un rendement $q$ ;
> 2. l'action part de **$S_0e^{-qT}$** et **ne verse rien**.

$$\boxed{\text{pour valoriser une européenne de maturité }T\text{ sur une action de rendement }q,\ \text{remplacer }S_0\text{ par }S_0e^{-qT}}$$

⚠️ **Analogie avec le chapitre 14.** *Là, on **retranchait la valeur actuelle** des dividendes en espèces ; ici, on **actualise le cours au taux du dividende**.* Ce sont deux traitements du même phénomène, adaptés à deux conventions de spécification.

**Les résultats qui en découlent mécaniquement.**

| Résultat | Forme avec rendement $q$ |
|---|---|
| Borne du call | $c\ge\max\big(S_0e^{-qT}-Ke^{-rT},\,0\big)$ ;(16.1) |
| Borne du put | $p\ge\max\big(Ke^{-rT}-S_0e^{-qT},\,0\big)$ ;(16.2) |
| **Parité européenne** | $\boxed{c+Ke^{-rT}=p+S_0e^{-qT}}$ ;(16.3) |
| Parité **américaine** | $S_0e^{-qT}-K\le C-P\le S_0-Ke^{-rT}$ |
| **Formules de Merton** | $\boxed{c=S_0e^{-qT}N(d_1)-Ke^{-rT}N(d_2)}$ ;(16.4) · $\boxed{p=Ke^{-rT}N(-d_2)-S_0e^{-qT}N(-d_1)}$ ;(16.5) |
| $d_1$, $d_2$ | $d_1=\dfrac{\ln(S_0/K)+(r-q+\sigma^2/2)T}{\sigma\sqrt T}$, $d_2=d_1-\sigma\sqrt T$ |

*Ces résultats furent d'abord obtenus par **Merton** (1973).*

<details class="details--riche">
<summary>

**Les portefeuilles qui démontrent directement ces résultats**

</summary>

**Pour la borne du call.**

- **A** : un call européen $+$ un montant de liquidités $Ke^{-rT}$
- **B** : **$e^{-qT}$ actions**, les dividendes étant **réinvestis en actions supplémentaires**

*Le point clé : $e^{-qT}$ actions dont on réinvestit les dividendes deviennent **exactement une action** en $T$.* Le raisonnement du chapitre 10 s'applique alors mot pour mot.

**Pour la borne du put.**

- **C** : un put européen $+$ $e^{-qT}$ actions, dividendes réinvestis
- **D** : liquidités $Ke^{-rT}$

**Pour la parité.** A et C valent **tous deux $\max(S_T,K)$** en $T$ — donc la même chose aujourd'hui.

**Et l'EDP.** En incluant le rendement $q$ dans l'analyse de la section 14.6, l'EDP devient

$$\boxed{\frac{\partial f}{\partial t}+(r-q)S\frac{\partial f}{\partial S}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}=rf}\;\text{(16.6)}$$

*Comme (14.16), **elle ne contient aucune variable affectée par les préférences pour le risque*** : la valorisation risque-neutre s'applique. Le processus risque-neutre devient

$$\boxed{dS=(r-q)S\,dt+\sigma S\,dz}\;\text{(16.7)}$$

*En monde risque-neutre, **le rendement total doit être $r$** ; les dividendes en fournissent $q$ ; **le taux de croissance espéré du cours est donc $r-q$**, et $\hat{\mathbb E}(S_T)=S_0e^{(r-q)T}$.*

</details>

## 🔴 Concept 4 — Trois applications de la même règle

| Sous-jacent | Pourquoi c'est un « rendement » | Ce que vaut $q$ |
|---|---|---|
| **Indice** | *l'indice est le prix d'un **portefeuille d'actions versant des dividendes*** | **rendement de dividende annualisé moyen** de l'indice sur la vie de l'option |
| **Devise** | *le détenteur d'une devise étrangère **reçoit un rendement égal au taux sans risque étranger*** | $\boxed{q=r_f}$ |
| **Futures** | *un prix futures a une **dérive nulle** en monde risque-neutre* | $\boxed{q=r}$ |

### 4.1 Indices

<details class="details--riche">
<summary>

**Exercice résolu C — call sur le S&P 500 (exemple 16.1)**

</summary>

**Données.** Call européen **2 mois** sur le S&P 500. Indice **930**, strike **900**, $r=8\,\%$, $\sigma=20\,\%$. Rendements de dividende attendus : **0,2 %** le premier mois, **0,3 %** le second.

*Étape 1 — annualiser le rendement de dividende.* Total sur la vie : $0{,}2+0{,}3=\mathbf{0{,}5\,\%}$ sur deux mois, soit $\mathbf{3\,\%}$ par an. Donc $q=0{,}03$. *Étape 2 — $d_1$.*

$$d_1=\frac{\ln(930/900)+(0{,}08-0{,}03+0{,}02)\times\frac16}{0{,}2\sqrt{1/6}}=\frac{0{,}03279+0{,}011667}{0{,}081650}=\mathbf{0{,}5444}$$

*Étape 3 — $d_2$.* $0{,}5444-0{,}0817=\mathbf{0{,}4628}$. *Étape 4 — les $N$.* $N(0{,}5444)=0{,}7069$ · $N(0{,}4628)=0{,}6782$. *Étape 5 — le prix.*

$$c=930\times0{,}7069\,e^{-0{,}03/6}-900\times0{,}6782\,e^{-0{,}08/6}=\boxed{\mathbf{51{,}83}}$$

*Étape 6 — le coût d'un contrat.* $100\times51{,}83=\mathbf{5\,183}$ dollars.

⚠️ **Le choix de $q$ n'est pas anodin.** *Le calcul de $q$ ne doit inclure que les dividendes dont **la date de détachement tombe pendant la vie de l'option**. Aux États-Unis, ces dates se concentrent la **première semaine de février, mai, août et novembre** : le bon $q$ dépend donc de la **durée** de l'option. **C'est encore plus vrai ailleurs** — au Japon, toutes les entreprises tendent à utiliser les mêmes dates.*

⚠️ **L'alternative en montants, et pourquoi on l'évite.** *Si l'on connaît le **montant absolu** des dividendes, on peut utiliser Black-Scholes en retranchant leur valeur actuelle. **Mais c'est difficile à mettre en œuvre pour un indice large : il faudrait connaître les dividendes attendus sur CHAQUE action de l'indice.***

</details>

<details class="details--riche">
<summary>

**Peut-on garantir que les actions battront les obligations à long terme ?**

</summary>

*On dit souvent qu'un investisseur de long terme devrait acheter des actions plutôt que des obligations. Un gérant américain pourrait être tenté d'offrir aux souscripteurs d'un fonds indiciel S&P 500 la **garantie que leur rendement sera au moins aussi bon que celui des obligations sans risque sur dix ans**. **Historiquement, les actions ont surperformé les obligations sur presque toute période de dix ans** : il semble qu'il ne donnerait pas grand-chose.*

***En fait, ce type de garantie est étonnamment coûteux.***

*Étape 1 — les données.* Indice **1 000**, rendement du dividende **1 %**, volatilité **15 %**, taux sans risque dix ans **5 %**. *Étape 2 — quel niveau d'indice faut-il atteindre ?* *Pour battre les obligations, les actions doivent gagner plus de **5 %** par an. Le dividende en fournit **1 %** : **les plus-values doivent donc fournir 4 % par an**.* Il faut donc

$$1\,000\,e^{0{,}04\times10}=\mathbf{1\,492}$$

*Étape 3 — traduire la garantie.* *Elle équivaut au **droit de vendre l'indice à 1 492 dans dix ans** — c'est-à-dire un **put européen**.* *Étape 4 — le valoriser.* Avec $S_0=1\,000$, $K=1\,492$, $r=5\,\%$, $\sigma=15\,\%$, $T=10$, $q=1\,\%$ : la valeur du put est **169,7**. *Étape 5 — la conclusion.* ***La garantie envisagée vaut environ 17 % du fonds — ce n'est guère quelque chose à donner gratuitement !***

</details>

**La reformulation par le prix forward.** Puisque $F_0=S_0e^{(r-q)T}$ (fiche 78), les formules se réécrivent :

$$\boxed{c=e^{-rT}\big[F_0N(d_1)-KN(d_2)\big]}\;\text{(16.8)}\qquad\boxed{p=e^{-rT}\big[KN(-d_2)-F_0N(-d_1)\big]}\;\text{(16.9)}$$

$$d_1=\frac{\ln(F_0/K)+\sigma^2T/2}{\sigma\sqrt T}\qquad d_2=\frac{\ln(F_0/K)-\sigma^2T/2}{\sigma\sqrt T}$$

**Et la parité devient une formule d'extraction.** $c+Ke^{-rT}=p+F_0e^{-rT}$, soit

$$\boxed{F_0=K+(c-p)e^{rT}}\;\text{(16.10)}$$

*Si des paires de puts et calls de même strike sont activement traitées, cette équation **estime le prix forward de l'indice**. **L'avantage de cette approche est que le rendement de dividende n'a pas à être estimé explicitement.*** Et si l'on a besoin de $q$ (pour une américaine) :

$$\boxed{q=-\frac1T\ln\frac{c-p+Ke^{-rT}}{S_0}}$$

*Pour un strike et une maturité donnés, ces estimations sont **peu fiables** ; mais **en combinant de nombreuses paires appariées, une image plus claire du rendement de dividende supposé par le marché émerge**.*

### 4.2 Devises

$$\boxed{c=S_0e^{-r_fT}N(d_1)-Ke^{-rT}N(d_2)}\;\text{(16.11)}\qquad d_1=\frac{\ln(S_0/K)+(r-r_f+\sigma^2/2)T}{\sigma\sqrt T}$$

*$S_0$ est **la valeur d'une unité de devise étrangère en dollars**. $r$ et $r_f$ sont les taux de maturité $T$.*

> **La symétrie des options de change, à connaître.** *Un **put** de vente de la devise A contre la devise B au strike $K$ **est le même** qu'un **call** d'achat de B contre A au strike $\mathbf{1/K}$.*

**Exemple 16.2 — volatilité implicite.** Call **4 mois** sur la livre. $S_0=K=1{,}6000$, $r=8\,\%$ (États-Unis), $r_f=11\,\%$ (Royaume-Uni), prix **4,3 cents**. *Par essais et erreurs : $\sigma=20\,\%$ donne **0,0639** ; $\sigma=10\,\%$ donne **0,0285**. La volatilité implicite est **14,1 %**.*

**Et la version forward.** Avec $F_0=S_0e^{(r-r_f)T}$, on retrouve **exactement (16.8) et (16.9)**.

## 🔴 Concept 5 — Les options sur futures

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Une option sur futures est le **droit, non l'obligation, d'entrer dans un contrat futures à un certain prix futures avant une certaine date**. Un **call** donne le droit d'entrer dans une position **longue** ; un **put**, dans une position **courte**. **Les options sur futures sont généralement américaines.***

**Ce qu'on reçoit à l'exercice.** *Un **call** exercé donne une **position longue** dans le futures **plus** un montant en espèces égal au **dernier prix de règlement moins le strike**. Un **put** exercé donne une position **courte** plus **le strike moins le dernier prix de règlement**.*

</div>

$$\boxed{\text{payoff effectif}=\max(F_T-K,0)\ \text{(call)}\qquad \max(K-F_T,0)\ \text{(put)}}$$

<details class="details--riche">
<summary>

**Deux exercices résolus — pourquoi le payoff effectif est bien $F-K$ (exemples 17.1 et 17.2)**

</summary>

**Exemple 17.1 — un call sur futures cuivre.** 15 août, call septembre, strike **240 cents/livre**, contrat de **25 000 livres**. Prix futures actuel **251**, dernier règlement (14 août) **250**.

*Étape 1 — le versement en espèces à l'exercice.*

$$25\,000\times(250-240)\ \text{cents}=\mathbf{2\,500}\ \text{dollars}$$

*Étape 2 — plus la position longue.* Un futures d'achat de 25 000 livres en septembre. *Étape 3 — si on la dénoue immédiatement.* Elle vaut la variation depuis le dernier règlement :

$$25\,000\times(251-250)\ \text{cents}=\mathbf{250}\ \text{dollars}$$

*Étape 4 — le total.* $2\,500+250=\mathbf{2\,750}=25\,000(F-K)$ avec $F=251$, $K=240$.

**Exemple 17.2 — un put sur futures maïs.** Put décembre, strike **400 cents/boisseau**, contrat de **5 000 boisseaux**. Prix futures **380**, dernier règlement **379**.

*Étape 1.* Espèces : $5\,000\times(400-379)=\mathbf{1\,050}$ dollars. *Étape 2.* Plus une position **courte**. *Étape 3.* En la dénouant : $5\,000\times(380-379)=\mathbf{50}$ dollars, **à retrancher** (le prix a monté depuis le règlement, ce qui pénalise une position courte). *Étape 4.* Net : $1\,050-50=\mathbf{1\,000}=5\,000(K-F)$ .

> ⚠️ **La leçon.** Le **découpage** entre espèces et position futures dépend du dernier règlement, **mais le total ne dépend que de $F$ et $K$**. C'est pourquoi on peut raisonner directement sur $\max(F_T-K,0)$.

</details>

**Les quatre raisons de leur popularité.**

| Raison | Détail |
|---|---|
| **Liquidité** | *un futures est souvent **plus liquide et plus facile à traiter** que le sous-jacent — le marché des futures T-bond est bien plus actif que celui d'une obligation particulière* |
| **Transparence du prix** | *le prix futures est **connu immédiatement** par la cotation, alors que le prix comptant peut n'être obtenu **qu'en contactant des courtiers*** |
| **Règlement en espèces** | *l'exercice **ne conduit habituellement pas à la livraison** : le futures est dénoué avant. **Cela séduit les investisseurs à capital limité**, qui auraient du mal à trouver les fonds pour acheter le sous-jacent* |
| **Proximité et coûts** | *futures et options sur futures se traitent **côte à côte sur la même bourse**, ce qui facilite couverture, arbitrage et spéculation ; et les **coûts de transaction sont souvent plus faibles*** |

⚠️ **Le nom trompe.** *Les options sur futures sont désignées par le **mois de livraison du futures sous-jacent**, **pas** par le mois d'expiration de l'option.* L'expiration est généralement **le jour de la première date de livraison du futures, ou quelques jours avant**.

<details class="details--riche">
<summary>

**Deux exercices résolus — options sur futures de taux (exemples 17.3 et 17.4)**

</summary>

**Rappel de lecture.** *Les prix futures de taux **montent quand les prix obligataires montent**, c'est-à-dire **quand les taux baissent**.* Donc : **anticiper une hausse des taux → acheter des PUTS** ; **anticiper une baisse → acheter des CALLS**.

**Exemple 17.3 — call sur futures eurodollar.** Février ; futures juin à **93,82** (taux 3 mois de **6,18 %**). Call de strike **94,00** coté **0,1**, soit **10 points de base**.

*Étape 1 — le coût.* En options eurodollar, **1 point de base $=$ 25 dollars** (fiche 79) : $10\times25=\mathbf{250}$ dollars. *Étape 2 — le scénario.* Les taux baissent d'environ 100 pb ; le futures monte à **94,78** (taux **5,22 %**). *Étape 3 — le payoff.*

$$25\times(94{,}78-94{,}00)\times100=25\times0{,}78\times100=\mathbf{1\,950}\ \text{dollars}$$

*Étape 4 — le profit.* $1\,950-250=\boxed{\mathbf{1\,700}}$ dollars.

**Exemple 17.4 — call sur futures T-bond.** Août ; futures décembre à **96-09**, soit $96+\frac9{32}=\mathbf{96{,}28125}$ ; rendement long terme **6,4 %**. Call décembre de strike **98** coté **1-04**, soit $1+\frac4{64}=\mathbf{1{,}0625\,\%}$ du nominal.

*Étape 1 — le scénario.* Les taux tombent à **6 %** et le futures monte à **100-00**. *Étape 2 — le profit par 100 de nominal.*

$$100{,}00-98{,}00-1{,}0625=\mathbf{0{,}9375}$$

*Étape 3 — par contrat.* Un contrat porte sur **100 000** de nominal :

$$0{,}9375\,\%\times100\,000=\boxed{\mathbf{937{,}50}}\ \text{dollars}$$

⚠️ *Le prix d'une option sur T-bond futures est coté **en pourcentage du nominal, au soixante-quatrième de 1 % près** — d'où le « 1-04 ».*

</details>

### 5.1 Parité et bornes

**Le résultat qui relie tout.** *Le payoff d'un call européen sur le **spot** est $\max(S_T-K,0)$ ; celui d'un call européen sur le **futures** est $\max(F_T-K,0)$. **Si le futures échoit en même temps que l'option, $F_T=S_T$ et les deux options sont équivalentes.***

<details class="details--riche">
<summary>

**La parité pour options sur futures, démontrée**

</summary>

| Portefeuille | Contenu | Valeur en $T$ |
|---|---|---|
| **A** | call sur futures $+$ liquidités $Ke^{-rT}$ | $\max(F_T,K)$ |
| **B** | put sur futures $+$ **un futures long** $+$ liquidités $F_0e^{-rT}$ | $F_0+(F_T-F_0)+\max(K-F_T,0)=\max(F_T,K)$ |

*Comme les deux portefeuilles valent la même chose en $T$ et que les européennes ne peuvent être exercées tôt, **ils valent la même chose aujourd'hui**. **Le règlement quotidien garantit que le futures de B vaut zéro aujourd'hui.*** D'où

$$\boxed{c+Ke^{-rT}=p+F_0e^{-rT}}\;\text{(17.1)}$$

> **La différence avec (10.6) tient en une substitution :** *le prix de l'action $S_0$ est remplacé par **le prix futures actualisé $F_0e^{-rT}$***.

**Version américaine :** $F_0e^{-rT}-K<C-P<F_0-Ke^{-rT}$ ;(17.2).

**Les bornes en découlent immédiatement.** Comme $p\ge0$ : $\boxed{c\ge(F_0-K)e^{-rT}}$ ;(17.3). Comme $c\ge0$ : $\boxed{p\ge(K-F_0)e^{-rT}}$ ;(17.4).

⚠️ **Pourquoi les options très dans la monnaie collent à leur borne.** *Quand un call est **très dans la monnaie**, le put correspondant est **très hors la monnaie**, donc $p$ est **très proche de zéro**. Or **l'écart entre $c$ et sa borne inférieure vaut exactement $p$** : le call est donc **très proche de sa borne**.*

**Et pour les américaines** : $C\ge F_0-K$ et $P\ge K-F_0$. *Avec des taux positifs, **la borne américaine est toujours plus élevée que la borne européenne : il y a toujours une chance qu'une option américaine sur futures soit exercée par anticipation**.*

<details><summary>Application (exemple 17.5)</summary>

Call européen sur argent **spot** 6 mois à **0,56** l'once, strike **8,50**. Futures argent 6 mois : **8,00**. $r=10\,\%$. Le put correspondant vaut

$$p=c+Ke^{-rT}-F_0e^{-rT}=0{,}56+(8{,}50-8{,}00)e^{-0{,}05}=0{,}56+0{,}476=\boxed{\mathbf{1{,}04}}$$

</details>

</details>

### 5.2 La dérive nulle et le modèle de Black

<details class="details--riche">
<summary>

**La démonstration que la dérive risque-neutre d'un prix futures est nulle**

</summary>

*Étape 1 — un futures long conclu en 0 **vaut zéro**.* *Étape 2 — en $\Delta t$, il procure un payoff de $F_{\Delta t}-F_0$.* *Étape 3 — par valorisation risque-neutre, sa valeur en 0 est*

$$e^{-r\Delta t}\hat{\mathbb E}\big[F_{\Delta t}-F_0\big]$$

*Étape 4 — cette valeur doit être nulle*, donc $\hat{\mathbb E}(F_{\Delta t})=F_0$. *Étape 5 — répéter.* $\hat{\mathbb E}(F_{2\Delta t})=F_{\Delta t}$, $\hat{\mathbb E}(F_{3\Delta t})=F_{2\Delta t}$… et en enchaînant :

$$\boxed{\hat{\mathbb E}(F_T)=F_0\quad\text{pour tout }T}$$

> ***La dérive du prix futures en monde risque-neutre est donc NULLE. D'après (16.7), le prix futures se comporte comme une action versant un rendement $q$ ÉGAL À $r$. Ce résultat est très général : il vaut pour tous les prix futures et ne dépend d'aucune hypothèse sur les taux, les volatilités, etc.***

⚠️ **La formulation précise, annoncée pour le chapitre 27.** *« Un prix futures a une dérive nulle dans le monde risque-neutre traditionnel où le **numéraire est le compte monétaire** ». Un processus de dérive nulle s'appelle une **martingale**. **Un prix FORWARD est une martingale dans un monde risque-neutre DIFFÉRENT** — celui où le numéraire est une obligation zéro-coupon de maturité $T$.*

**Le processus supposé et l'EDP.**

$$dF=\sigma F\,dz\;\text{(17.7)}\qquad\qquad \boxed{\frac{\partial f}{\partial t}+\frac12\sigma^2F^2\frac{\partial^2f}{\partial F^2}=rf}\;\text{(17.8)}$$

*Elle a la même forme que (16.6) **avec $q=r$*** — ce qui confirme le résultat. **Notez qu'il n'y a plus de terme du premier ordre** : c'est la signature de la dérive nulle.

**Les deux indices qui mettaient sur la voie.** *L'équation de $p$ dans un arbre de futures est la même que celle d'une action de rendement $q$ **quand $q=r$*** ; et la parité pour options sur futures est la même que (16.3) **avec $q=r$**.

</details>

> **Le modèle de Black (1976).** *Fischer Black fut le premier à montrer cela, dans un article de **1976**.* En remplaçant $S_0$ par $F_0$ et $q$ par $r$ dans (16.4)-(16.5) :

$$\boxed{c=e^{-rT}\big[F_0N(d_1)-KN(d_2)\big]}\;\text{(17.9)}\qquad\boxed{p=e^{-rT}\big[KN(-d_2)-F_0N(-d_1)\big]}\;\text{(17.10)}$$

$$d_1=\frac{\ln(F_0/K)+\sigma^2T/2}{\sigma\sqrt T}\qquad d_2=d_1-\sigma\sqrt T$$

⚠️ *Quand le **coût de portage** et le **rendement de commodité** sont des fonctions du seul temps, **la volatilité du prix futures égale la volatilité du sous-jacent**.*

<details class="details--riche">
<summary>

**Deux exercices résolus avec le modèle de Black (exemples 17.6 et 17.7)**

</summary>

**Exemple 17.6 — put sur futures pétrole, à la monnaie.** $F_0=K=20$, $T=4/12$, $r=9\,\%$, $\sigma=25\,\%$.

*Étape 1 — le cas $F_0=K$ simplifie tout.* $\ln(F_0/K)=0$, donc

$$d_1=\frac{\sigma\sqrt T}{2}=\frac{0{,}25\times0{,}5774}{2}=\mathbf{0{,}07216}\qquad d_2=-\mathbf{0{,}07216}$$

*Étape 2 — les $N$.* $N(-d_1)=0{,}4712$ · $N(-d_2)=0{,}5288$. *Étape 3 — le prix.*

$$p=e^{-0{,}03}\big(20\times0{,}5288-20\times0{,}4712\big)=e^{-0{,}03}\times1{,}152=\boxed{\mathbf{1{,}12}}$$

**Exemple 17.7 — call sur l'or SPOT, valorisé par Black.** Call européen **6 mois** d'achat d'une once **au comptant**. Strike **1 200**, **futures 6 mois à 1 240**, $r=5\,\%$, $\sigma=20\,\%$.

*Étape 1 — l'équivalence.* *L'option est la même qu'une option européenne 6 mois sur le **prix futures 6 mois*** (concept 5.1). *Étape 2 — $d_1$ et $d_2$.*

$$d_1=\frac{\ln(1\,240/1\,200)+0{,}2^2\times0{,}5/2}{0{,}2\sqrt{0{,}5}}=\frac{0{,}03279+0{,}01}{0{,}14142}=\mathbf{0{,}3026}\qquad d_2=\mathbf{0{,}1611}$$

*Étape 3 — le prix.*

$$c=e^{-0{,}025}\big[1\,240\,N(0{,}3026)-1\,200\,N(0{,}1611)\big]=\boxed{\mathbf{88{,}37}}$$

> ⚠️ **Le grand avantage du modèle de Black, et c'est la raison pour laquelle les traders le préfèrent.** *Il a une **applicabilité assez générale** : le sous-jacent peut être un actif de **consommation ou d'investissement**, et il peut **procurer un revenu**. **Le grand avantage est qu'il évite d'avoir à estimer le revenu (ou le rendement de commodité) du sous-jacent : le prix futures ou forward utilisé INCORPORE l'estimation du marché de ce revenu.***

**Le tableau des équivalences — trois écritures de la même formule.**

| Sous-jacent | Formule | Où l'on a substitué |
|---|---|---|
| Indice | (16.8)-(16.9) | $F_0=S_0e^{(r-q)T}$ |
| Devise | (16.13)-(16.14) | $F_0=S_0e^{(r-r_f)T}$ |
| Futures | (17.9)-(17.10) | $F_0$ directement |

**Elles sont toutes identiques.** *Et l'on utilise la parité pour **impliquer les prix forward** des maturités activement traitées, puis on **interpole** pour les autres — approche valable pour un large éventail de sous-jacents.*

</details>

### 5.3 Américaines et *futures-style*

**Américaine sur futures contre américaine sur spot.** *Avec $r>0$, **il y a toujours une chance qu'il soit optimal d'exercer une américaine sur futures par anticipation** : elle vaut donc plus que son homologue européenne.*

| Marché | Call américain sur futures | Put américain sur futures |
|---|---|---|
| **Normal** ($F>S$) | vaut **plus** que le call sur spot | vaut **moins** |
| **Inversé** ($F<S$) | vaut **moins** | vaut **plus** |

*Ces différences valent aussi quand le futures expire **plus tard** que l'option — et **plus le futures expire tard, plus les différences tendent à être grandes**.*

**Les options *futures-style*.** *Ce sont des **contrats futures sur le payoff d'une option**. Au lieu de payer (recevoir) la prime d'avance, on **dépose une marge** comme sur un futures ordinaire ; le contrat est **réglé quotidiennement** et le **prix de règlement final est le payoff de l'option**.*

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que le prix représente.</span>

*Si les taux sont constants, le prix futures d'une option *futures-style* égale le **prix forward** d'un contrat forward sur le payoff de l'option. **C'est donc le prix qu'on paierait pour l'option si le paiement était fait à terme échu** : la valeur d'une option ordinaire **capitalisée au taux sans risque**.*

</div>

$$\boxed{\text{call : }F_0N(d_1)-KN(d_2)}\qquad\boxed{\text{put : }KN(-d_2)-F_0N(-d_1)}\qquad\boxed{p+F_0=c+K}$$

⚠️ ***Ces formules ne dépendent PAS du niveau des taux d'intérêt.*** Et : *il **n'est jamais optimal** d'exercer par anticipation une option *futures-style* américaine **sur un futures**, parce que **son prix futures est toujours supérieur à la valeur intrinsèque** — on peut donc la traiter comme l'européenne correspondante.*

## Comment reconnaître le type d'exercice

| Signal | $q$ à utiliser | Formule |
|---|---|---|
| Rendement de dividende d'une action ou d'un indice | $q$ | (16.4)-(16.5) |
| Deux taux et un cours de change | $q=r_f$ | (16.11)-(16.12) |
| Un **prix futures** | $q=r$ | **Black** (17.9)-(17.10) |
| Un **prix forward** donné au lieu du spot | — | **Black**, sans estimer de revenu |
| Un portefeuille, un bêta, un niveau de protection | — | $N=\beta V/(100S_0)$, strike par le **MEDAF** |
| « quel strike rend le tunnel gratuit ? » | — | égaliser les primes du put et du call |
| Une paire call/put de même strike | — | $F_0=K+(c-p)e^{rT}$ |
| Une option **américaine** sur indice ou devise | — | **arbre**, avec $a=e^{(r-q)\Delta t}$ ou $e^{(r-r_f)\Delta t}$ |

## Comment résoudre ce type d'exercice

**Protocole « quel $q$ ? » — 3 étapes.**

1. Identifier le **revenu proportionnel** que procure la détention du sous-jacent.
2. Indice → dividende annualisé **sur la vie de l'option** ; devise → **$r_f$** ; futures → **$r$**.
3. Appliquer $S_0\to S_0e^{-qT}$ **partout** — dans la formule **et** dans $d_1$ (où $r$ devient $r-q$).

**Protocole assurance de portefeuille — 4 étapes.**

1. $N=\beta\dfrac{V}{100\,S_0}$ contrats de put.
2. Si $\beta=1$ : le strike est $S_0\times$ (niveau de protection / valeur du portefeuille).
3. Si $\beta\ne1$ : construire la table valeur de l'indice → valeur du portefeuille **par le MEDAF**, puis **lire** le niveau d'indice correspondant à la protection voulue.
4. **Vérifier** sur un scénario que portefeuille + payoff des puts $=$ niveau assuré.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Oublier le $-q$ dans $d_1$ | $d_1=\frac{\ln(S_0/K)+(r-q+\sigma^2/2)T}{\sigma\sqrt T}$ |
| Appliquer $e^{-qT}$ au seul terme en $S_0$ de la formule | Il faut **aussi** corriger $d_1$ et $d_2$ |
| Utiliser $q$ pour une devise | C'est **$r_f$**, le taux **étranger** |
| Utiliser $q=0$ pour un futures | C'est **$q=r$** — dérive risque-neutre **nulle** |
| Actualiser un prix d'option sur futures deux fois | Une seule fois, $e^{-rT}$ — Black **intègre déjà** la dérive nulle |
| Garder le même strike quand $\beta$ passe de 1 à 2 | **Deux** effets : plus de puts **et** strike plus élevé |
| Annualiser le dividende sur l'année entière | Ne compter que les détachements **pendant la vie de l'option** |
| Croire qu'un tunnel a un coût | Il est monté pour que **prime du put $=$ prime du call** |
| Croire que le payoff d'une option sur futures dépend du dernier règlement | Le **découpage** en dépend, **pas le total** |
| Croire qu'américaine sur futures $=$ américaine sur spot | **Faux** dès que $F\ne S$ (voir le tableau du concept 5.3) |
| Payer une option *futures-style* d'avance | On **dépose une marge**, réglée **quotidiennement** |

## 📌 Ultimate Review

**La règle qui unifie tout.** $\boxed{S_0\ \longrightarrow\ S_0e^{-qT}}$ dans **tous** les résultats du chapitre 14.

| Sous-jacent | $q$ | Justification |
|---|---|---|
| Indice | rendement de dividende | portefeuille d'actions versant des dividendes |
| **Devise** | $\boldsymbol{r_f}$ | *le détenteur reçoit le taux sans risque étranger* |
| **Futures** | $\boldsymbol{r}$ | *dérive risque-neutre **nulle*** |

**Les formules.**

$$c=S_0e^{-qT}N(d_1)-Ke^{-rT}N(d_2)\qquad d_1=\frac{\ln(S_0/K)+(r-q+\sigma^2/2)T}{\sigma\sqrt T}$$

$$\textbf{Black}:\quad c=e^{-rT}\big[F_0N(d_1)-KN(d_2)\big]\qquad d_1=\frac{\ln(F_0/K)+\sigma^2T/2}{\sigma\sqrt T}$$

**Les parités.** $c+Ke^{-rT}=p+S_0e^{-qT}=p+F_0e^{-rT}$ · extraction : $F_0=K+(c-p)e^{rT}$.

**L'EDP généralisée.** $\dfrac{\partial f}{\partial t}+(r-q)S\dfrac{\partial f}{\partial S}+\dfrac12\sigma^2S^2\dfrac{\partial^2f}{\partial S^2}=rf$ · processus risque-neutre $dS=(r-q)S\,dt+\sigma S\,dz$ · pour un futures : $\dfrac{\partial f}{\partial t}+\dfrac12\sigma^2F^2\dfrac{\partial^2f}{\partial F^2}=rf$ (**sans terme du premier ordre**).

**L'assurance de portefeuille.** $N=\beta\dfrac{V}{100S_0}$ · strike lu dans la table MEDAF · **deux** effets du bêta : plus de puts **et** strike plus haut.

**Les chiffres.** Contrat d'indice **100 fois** l'indice · exemple 16.1 : $q=3\,\%$, $d_1=0{,}5444$, $c=\mathbf{51{,}83}$, contrat **5 183** · garantie actions/obligations : indice cible **1 492**, put à **169,7**, soit **17 %** du fonds · tunnel gratuit : $K_1=1{,}5000$, $K_2=1{,}5413$, primes **0,03250** · assurance $\beta=2$ : **10** contrats, strike **960** · exemple 16.2 : volatilité implicite **14,1 %** · options sur futures autorisées **1982**, permanentes **1987** · exemple 17.3 : profit **1 700** · exemple 17.4 : **937,50** · exemple 17.5 : $p=\mathbf{1{,}04}$ · exemple 17.6 : $p=\mathbf{1{,}12}$ · exemple 17.7 : $c=\mathbf{88{,}37}$ · Black **1976**.

## 🧠 Active Recall

<details class="details--riche">
<summary>

Démontrer la règle « remplacer $S_0$ par $S_0e^{-qT}$ ».

</summary>

*Un rendement de dividende $q$ fait croître le cours **moins vite d'un montant $q$**. Si, avec ce rendement, le cours passe de $S_0$ à $S_T$, alors **sans dividendes il passerait de $S_0e^{-qT}$ à $S_T$**.* On obtient donc **la même loi de $S_T$** dans deux situations : (1) départ de $S_0$ avec rendement $q$ ; (2) départ de $S_0e^{-qT}$ **sans** dividende. Comme le prix d'une européenne ne dépend que de la loi de $S_T$, **il suffit de faire la substitution**.

⚠️ Attention : la substitution affecte **aussi $d_1$**, où $r$ devient $r-q$.

</details>

<details><summary>Un portefeuille de 500 000 réplique un indice à 1 000. Comment l'assurer à 450 000 sur trois mois ?</summary>

Le portefeuille vaut **500 fois** l'indice, et chaque contrat porte sur **100 fois** l'indice → **5 contrats** de put. La protection à 450 000, soit **90 %**, correspond à un strike de **900**.

Vérification à un indice de 880 : portefeuille ≈ **440 000**, puts $=5\times(900-880)\times100=\mathbf{10\,000}$, total **450 000** .

</details>

<details><summary>Le même portefeuille a un bêta de 2. Qu'est-ce qui change ?</summary>

**Deux choses.** **(1) Le nombre de contrats** : $N=2{,}0\times\dfrac{500\,000}{1\,000\times100}=\mathbf{10}$. **(2) Le strike** : il ne se lit plus par proportionnalité mais **par le MEDAF**. Avec $r=12\,\%$ et $q=4\,\%$, la table donne : indice **960** → portefeuille **450 000**. Le strike est donc **960**, contre 900 dans le cas $\beta=1$.

> ***Il y a donc deux raisons pour lesquelles le coût de la couverture augmente avec le bêta : il faut plus de puts, ET ils ont un strike plus élevé.***

</details>

<details class="details--riche">
<summary>

Comment monte-t-on un *range forward* gratuit, et quel est son cas limite ?

</summary>

Une entreprise recevant des devises **achète un put** de strike $K_1$ et **vend un call** de strike $K_2$, avec $K_1<F_0<K_2$. Le cours réalisé est $K_1$ si le marché tombe sous $K_1$, le cours de marché entre les deux, et $K_2$ au-dessus.

**La gratuité** s'obtient en choisissant $K_1$ et $K_2$ tels que **les deux primes s'égalisent** : avec $F_0=1{,}5200$, $r=r_f=5\,\%$, $\sigma=14\,\%$, le put à **1,5000** et le call à **1,5413** valent tous deux **0,03250**.

**Le cas limite** : *à mesure que les strikes se rapprochent, **le range forward devient un forward ordinaire***.

</details>

<details class="details--riche">
<summary>

Calculer le prix d'un call européen 2 mois sur le S&P 500 (930), strike 900, $r=8\,\%$, $\sigma=20\,\%$, dividendes 0,2 % puis 0,3 %.

</summary>

$q$ annualisé $=(0{,}2+0{,}3)\times6=\mathbf{3\,\%}$.

$$d_1=\frac{\ln(930/900)+(0{,}08-0{,}03+0{,}02)/6}{0{,}2/\sqrt6}=\mathbf{0{,}5444}\qquad d_2=\mathbf{0{,}4628}$$

$$c=930(0{,}7069)e^{-0{,}005}-900(0{,}6782)e^{-0{,}013333}=\boxed{\mathbf{51{,}83}}$$

Un contrat coûte $100\times51{,}83=\mathbf{5\,183}$ dollars.

</details>

<details><summary>Pourquoi une garantie « actions ≥ obligations sur 10 ans » est-elle si chère ?</summary>

*Pour battre les obligations à **5 %**, les actions doivent gagner plus de 5 % ; **le dividende en fournit 1 %, donc les plus-values doivent fournir 4 % par an***. Il faut donc que l'indice atteigne $1\,000e^{0{,}4}=\mathbf{1\,492}$.

La garantie **est** un **put européen** de strike 1 492 sur 10 ans. Avec $S_0=1\,000$, $\sigma=15\,\%$, $r=5\,\%$, $q=1\,\%$, il vaut **169,7** — soit ***environ 17 % du fonds : hardly something that should be given away***.

</details>

<details class="details--riche">
<summary>

Que devient l'EDP quand il y a un rendement $q$, et pourquoi cela suffit-il à conclure ?

</summary>

$$\frac{\partial f}{\partial t}+(r-q)S\frac{\partial f}{\partial S}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}=rf$$

*Comme (14.16), **elle ne contient aucune variable affectée par les préférences pour le risque*** : la valorisation risque-neutre s'applique. En monde risque-neutre, **le rendement total est $r$, les dividendes en fournissent $q$, donc la croissance du cours est $r-q$** : $dS=(r-q)S\,dt+\sigma S\,dz$ et $\hat{\mathbb E}(S_T)=S_0e^{(r-q)T}$.

</details>

<details><summary>Comment extraire le prix forward d'un indice à partir de prix d'options ?</summary>

Par la parité $c+Ke^{-rT}=p+F_0e^{-rT}$, réarrangée :

$$\boxed{F_0=K+(c-p)e^{rT}}$$

*Si des paires de puts et calls de même strike sont activement traitées, cette équation estime le prix forward pour cette maturité.* **L'avantage : le rendement de dividende n'a pas à être estimé explicitement.** Si l'on en a besoin (pour une américaine) : $q=-\frac1T\ln\frac{c-p+Ke^{-rT}}{S_0}$ — *peu fiable pour une seule paire, **mais une image claire émerge en combinant de nombreuses paires***.

</details>

<details><summary>Un call sur futures cuivre, strike 240, est exercé quand le futures vaut 251 et le dernier règlement 250. Que reçoit-on ?</summary>

**Espèces** : $25\,000\times(250-240)=\mathbf{2\,500}$ dollars, **plus** une position **longue** dans le futures. En la dénouant immédiatement : $25\,000\times(251-250)=\mathbf{250}$ dollars de plus. **Total : 2 750 dollars $=25\,000(F-K)$.**

⚠️ Le **découpage** dépend du dernier règlement ; **le total n'en dépend pas**. D'où le payoff effectif $\max(F_T-K,0)$.

</details>

<details><summary>Démontrer la parité call-put pour options européennes sur futures.</summary>

**A** = call sur futures $+$ liquidités $Ke^{-rT}$ → vaut $\max(F_T,K)$ en $T$. **B** = put sur futures $+$ **un futures long** $+$ liquidités $F_0e^{-rT}$ → vaut $F_0+(F_T-F_0)+\max(K-F_T,0)=\max(F_T,K)$.

Mêmes valeurs en $T$, européennes donc pas d'exercice anticipé → mêmes valeurs aujourd'hui. *Le **règlement quotidien** garantit que le futures de B vaut **zéro** aujourd'hui*, donc

$$c+Ke^{-rT}=p+F_0e^{-rT}$$

**La seule différence avec (10.6) : $S_0$ est remplacé par $F_0e^{-rT}$.**

</details>

<details><summary>Démontrer que la dérive risque-neutre d'un prix futures est nulle.</summary>

Un futures long conclu en 0 **vaut zéro** et procure $F_{\Delta t}-F_0$ en $\Delta t$. Par valorisation risque-neutre, sa valeur est $e^{-r\Delta t}\hat{\mathbb E}[F_{\Delta t}-F_0]$, qui doit être **nulle** : donc $\hat{\mathbb E}(F_{\Delta t})=F_0$. En répétant : $\hat{\mathbb E}(F_T)=F_0$ pour tout $T$.

*Le prix futures se comporte donc comme une action de rendement **$q=r$**. **Ce résultat est très général : il vaut pour tous les prix futures et ne dépend d'aucune hypothèse sur les taux ou les volatilités.***

</details>

<details><summary>Quel est le grand avantage du modèle de Black ?</summary>

$$c=e^{-rT}\big[F_0N(d_1)-KN(d_2)\big]$$

*Il a une **applicabilité assez générale** : le sous-jacent peut être un actif de **consommation ou d'investissement**, et il peut **procurer un revenu**.* **Et surtout : *il évite d'avoir à estimer le revenu (ou le rendement de commodité) du sous-jacent — le prix futures ou forward utilisé incorpore déjà l'estimation du marché de ce revenu*.**

C'est pourquoi *les traders préfèrent Black à Black-Scholes-Merton* pour valoriser des options européennes sur spot.

</details>

<details><summary>Une américaine sur futures vaut-elle la même chose qu'une américaine sur spot ?</summary>

**Non**, sauf si $F=S$. En **marché normal** ($F>S$) : le **call** sur futures vaut **plus** que le call sur spot (*il sera parfois exercé tôt, ce qui donne un profit supérieur*), et le **put** sur futures vaut **moins**. En **marché inversé**, l'inverse. *Ces différences valent aussi quand le futures expire plus tard que l'option — et **plus il expire tard, plus elles sont grandes**.*

</details>

<details class="details--riche">
<summary>

Qu'est-ce qu'une option *futures-style*, et pourquoi ne l'exerce-t-on jamais tôt ?

</summary>

C'est un **contrat futures sur le payoff d'une option** : au lieu de payer la prime d'avance, on **dépose une marge** ; règlement **quotidien**, prix de règlement final $=$ **payoff de l'option**. Son prix est *le prix qu'on paierait pour l'option si le paiement était fait **à terme échu*** — la valeur de l'option ordinaire **capitalisée** :

$$F_0N(d_1)-KN(d_2)\qquad\text{(call)}$$

*Ces formules **ne dépendent pas du niveau des taux**.* Et *il n'est **jamais optimal** d'exercer tôt une *futures-style* américaine sur un futures, parce que **son prix futures est toujours supérieur à la valeur intrinsèque*** : on la traite comme l'européenne.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Taille d'un contrat d'option sur indice ? | **100 fois** l'indice |
| Comment sont-elles réglées ? | **En espèces** |
| Quel indice du CBOE est américain ? | L'**OEX** (S&P 100) |
| Combien de puts pour assurer un portefeuille ? | $N=\beta\,V/(100\,S_0)$ |
| Comment trouve-t-on le strike si $\beta\ne1$ ? | Par une table construite avec le **MEDAF** |
| Les deux effets d'un bêta élevé ? | **Plus** de puts **et** strike **plus haut** |
| Où se traitent les options de change ? | Principalement **de gré à gré** |
| Composition d'un *range forward* court ? | **Acheter** un put $K_1$, **vendre** un call $K_2$ |
| Comment le rend-on gratuit ? | En **égalisant** les deux primes |
| Son cas limite ? | Un **forward ordinaire** |
| La règle unique du chapitre 16 ? | Remplacer $S_0$ par $\mathbf{S_0e^{-qT}}$ |
| Pourquoi est-elle valable ? | Même **loi de $S_T$** dans les deux situations |
| Parité avec rendement $q$ ? | $c+Ke^{-rT}=p+S_0e^{-qT}$ |
| Formule de $d_1$ avec rendement ? | $\frac{\ln(S_0/K)+(r-q+\sigma^2/2)T}{\sigma\sqrt T}$ |
| Qui a établi ces formules ? | **Merton**, 1973 |
| Composition du portefeuille B modifié ? | **$e^{-qT}$ actions**, dividendes **réinvestis** |
| EDP avec rendement $q$ ? | $f_t+(r-q)Sf_S+\frac12\sigma^2S^2f_{SS}=rf$ |
| Processus risque-neutre ? | $dS=(r-q)S\,dt+\sigma S\,dz$ |
| $q$ pour un indice ? | Le **rendement de dividende** de l'indice |
| Quels dividendes compter ? | Ceux dont la **date de détachement** tombe dans la vie de l'option |
| $q$ pour une devise ? | $\boldsymbol{r_f}$, le taux **étranger** |
| Symétrie des options de change ? | Put A/B au strike $K$ $=$ call B/A au strike **$1/K$** |
| $q$ pour un futures ? | $\boldsymbol{r}$ |
| Extraction du prix forward ? | $F_0=K+(c-p)e^{rT}$ |
| Son avantage ? | **Pas besoin d'estimer $q$** |
| Coût de la garantie actions/obligations 10 ans ? | **169,7**, soit **17 %** du fonds |
| Qu'est-ce qu'une option sur futures ? | Droit d'**entrer dans un contrat futures** |
| Que reçoit-on en exerçant un call sur futures ? | Position **longue** $+$ (règlement $-$ strike) en espèces |
| Payoff effectif ? | $\max(F_T-K,0)$ |
| Par quel mois sont-elles désignées ? | Le mois de **livraison du futures** |
| Les quatre raisons de leur popularité ? | Liquidité · prix **connu** · règlement en **espèces** · coûts |
| Valeur d'un point de base en option eurodollar ? | **25 dollars** |
| Anticiper une hausse des taux : quelle option ? | Un **put** sur futures de taux |
| Parité pour options sur futures ? | $c+Ke^{-rT}=p+F_0e^{-rT}$ |
| Bornes qui en découlent ? | $c\ge(F_0-K)e^{-rT}$ · $p\ge(K-F_0)e^{-rT}$ |
| Pourquoi une option très ITM colle à sa borne ? | L'**écart vaut exactement** le prix de l'option opposée |
| Dérive d'un prix futures en monde risque-neutre ? | **Nulle** |
| Comment s'appelle un processus de dérive nulle ? | Une **martingale** |
| Le forward est martingale sous quel numéraire ? | Une **obligation zéro-coupon** de maturité $T$ |
| EDP pour un futures ? | $f_t+\frac12\sigma^2F^2f_{FF}=rf$ — **sans terme d'ordre 1** |
| Le modèle de Black ? | $c=e^{-rT}[F_0N(d_1)-KN(d_2)]$ |
| Son $d_1$ ? | $\frac{\ln(F_0/K)+\sigma^2T/2}{\sigma\sqrt T}$ |
| Année de publication ? | **1976** |
| Son grand avantage ? | **Pas besoin d'estimer le revenu** du sous-jacent |
| Quand la volatilité du futures égale-t-elle celle du spot ? | Si portage et rendement de commodité ne dépendent **que du temps** |
| Américaine sur futures vs sur spot, marché normal ? | Call **plus cher**, put **moins cher** |
| Qu'est-ce qu'une option *futures-style* ? | Un **futures sur le payoff** d'une option |
| Comment la paie-t-on ? | Par **marge**, règlement **quotidien** |
| Ses formules dépendent-elles de $r$ ? | **Non** |
| Faut-il l'exercer tôt ? | **Jamais** (sur un futures) |
| Sa parité ? | $p+F_0=c+K$ |
