# Fiche 82 — Mécanique des marchés d'options

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 9 « Mechanics of Options Markets » |
| **Difficulté** | Mid — institutionnel, mais trois calculs tombent à l'examen |
| **Temps d'étude estimé** | 1 h 15 |
| **Prérequis** | Fiche 74 |
| **Concepts clés** | Call, put, américaine/européenne, payoffs des quatre positions, classe et série, dans/hors la monnaie, valeur intrinsèque, valeur temps, cycles d'échéance, ajustement pour division d'actions, limites de position, teneur de marché, marges sur options nues, OCC, *wash sale*, vente constructive, warrants, options de salariés, convertibles |
| **Poids à l'examen** | Les **quatre payoffs** · l'**ajustement** pour division ou dividende en actions · la **marge sur option nue** (les deux calculs, on prend **le plus grand**). |

## 🎯 Vue d'ensemble

```
QUATRE POSITIONS
  long call   max(S_T − K, 0)        short call  −max(S_T − K, 0) = min(K − S_T, 0)
  long put    max(K − S_T, 0)        short put   −max(K − S_T, 0) = min(S_T − K, 0)

VALEUR = VALEUR INTRINSÈQUE + VALEUR TEMPS
         max(S−K,0) ou max(K−S,0)

MARGE d'une option NUE  =  MAX de deux calculs
  (1) 100 % prime + 20 % S − (montant hors la monnaie)
  (2) 100 % prime + 10 % S   [call]   ou   10 % K   [put]

AJUSTEMENT n-pour-m :  K → K·m/n     nombre d'actions → ×n/m
```

⚠️ **Convention du chapitre.** *Quand on trace les graphiques de gain ou de perte, la pratique habituelle est d'**ignorer l'actualisation**, de sorte que le profit est le **payoff final moins le coût initial**.*

## 🔴 Concept 1 — Les quatre positions et leurs payoffs

| Position | Payoff | Profit maximal | Perte maximale |
|---|---|---|---|
| **Long call** | $\max(S_T-K,0)$ | **non borné** | la **prime** |
| **Short call** | $-\max(S_T-K,0)=\min(K-S_T,0)$ | la **prime** | **non bornée** |
| **Long put** | $\max(K-S_T,0)$ | $K-$ prime | la **prime** |
| **Short put** | $-\max(K-S_T,0)=\min(S_T-K,0)$ | la **prime** | $K-$ prime |

> ***Il y a deux côtés à chaque contrat d'option.*** *D'un côté l'investisseur qui a pris la position **longue** (il a acheté), de l'autre celui qui a pris la position **courte** (il a vendu, ou **écrit**). **Le vendeur reçoit du cash d'avance mais a des engagements potentiels plus tard.** Son profit ou sa perte est **l'exact opposé** de celui de l'acheteur.*

<details><summary>**Exercice résolu A — un call européen, y compris le cas contre-intuitif**</summary>

**Données.** Call européen, $K=100$, sur **100 actions**. Cours actuel **98**, échéance **4 mois**, prime **5 par action** → **investissement initial 500**.

*Étape 1 — le cas où l'on n'exerce pas.* Si $S_T<100$, *il n'y a aucun intérêt à acheter pour 100 une action qui vaut moins de 100*. L'investisseur perd **la totalité des 500**. *Étape 2 — le cas favorable.* Si $S_T=115$ : il achète 100 actions à 100 et les revend immédiatement → gain $100\times15=\mathbf{1\,500}$ ; net des 500 de prime : **profit de 1 000**. *Étape 3 — le cas contre-intuitif : $S_T=102$.* Il exerce pour un gain de $100\times(102-100)=\mathbf{200}$, et réalise **une perte globale de 300** une fois la prime prise en compte. *Étape 4 — faut-il alors ne pas exercer ?* **Non.** *Ne pas exercer conduirait à une perte globale de **500**, ce qui est **pire** que la perte de 300 en exerçant.*

> **La règle générale qui en découle.** ***Les calls doivent toujours être exercés à l'échéance si le cours est au-dessus du prix d'exercice*** — même si l'opération globale est perdante. **La prime est un coût enfoui : elle ne fait pas partie de la décision d'exercice.**

</details>

<details><summary>**Exercice résolu B — un put européen**</summary>

**Données.** Put européen, $K=70$, sur **100 actions**. Cours actuel **65**, échéance **3 mois**, prime **7** → **investissement 700**.

*Étape 1 — condition d'exercice.* Option européenne : elle ne sera exercée que si $S_T<70$ **à l'échéance**. *Étape 2 — cas $S_T=55$.* Il achète 100 actions à 55 et, aux termes du put, les vend à 70 → gain $100\times15=\mathbf{1\,500}$. *Étape 3 — le profit net.* $1\,500-700=\mathbf{800}$. *Étape 4 — le cas défavorable.* *Il n'y a aucune garantie de gain* : si $S_T>70$, le put expire **sans valeur** et l'investisseur perd **700**.

</details>

**Exercice anticipé.** *Les options sur actions cotées en bourse sont généralement **américaines**, non européennes* : l'investisseur des exemples précédents **n'aurait pas à attendre l'échéance**. *Nous verrons dans des chapitres ultérieurs qu'il existe des circonstances où il est **optimal** d'exercer une option américaine avant l'échéance.*

## 🟡 Concept 2 — Les sous-jacents

| Sous-jacent | Taille d'un contrat | Style | Règlement |
|---|---|---|---|
| **Actions** | **100 actions** — *pratique, car les actions se négocient normalement par lots de 100* ; options sur plus de **2 500** actions | américain | livraison |
| **Devises** | **10 000 unités** (1 000 000 pour le **yen**) contre dollars | européen (NASDAQ OMX) | — |
| **Indices** | **100 fois** l'indice | européen, **sauf l'OEX** (S&P 100) qui est **américain** | **toujours en espèces** |
| **Futures** | le contrat futures | — | l'option **échoit juste avant** la période de livraison |

**Indices les plus traités aux États-Unis** (tous au CBOE) : **SPX** (S&P 500), **OEX** (S&P 100), **NDX** (Nasdaq-100), **DJX** (Dow Jones Industrial).

*Exemple : un call sur indice de strike **980**, exercé quand l'indice vaut **992** → le vendeur paie au détenteur $(992-980)\times100=\mathbf{1\,200}$ dollars.*

**Options sur futures.** *Quand un call est exercé, le gain du détenteur égale l'**excès du prix futures sur le prix d'exercice**. Quand un put est exercé, le gain égale l'**excès du prix d'exercice sur le prix futures**.*

## 🔴 Concept 3 — Spécification des options sur actions

### 3.1 Dates d'échéance et cycles

> **L'échéance précise.** *Le **samedi immédiatement après le troisième vendredi** du mois d'échéance. Le **dernier jour de cotation** est le troisième vendredi.* Le détenteur a jusqu'à **16 h 30 (heure du Centre)** ce vendredi pour donner l'ordre d'exercer ; le courtier a jusqu'à **22 h 59 le lendemain** pour notifier la bourse.

**Les trois cycles.**

| Cycle | Mois |
|---|---|
| **Janvier** | janvier, avril, juillet, octobre |
| **Février** | février, mai, août, novembre |
| **Mars** | mars, juin, septembre, décembre |

**La règle de cotation.** *Si l'échéance du mois courant **n'est pas encore atteinte**, on cote le **mois courant**, le **mois suivant**, et **les deux mois suivants du cycle**. Si elle est **passée**, on cote le mois suivant, le surlendemain mois, et les deux mois suivants du cycle.*

*IBM est sur le cycle **janvier** : début janvier on cote **janvier, février, avril, juillet** ; fin janvier **février, mars, avril, juillet** ; début mai **mai, juin, juillet, octobre**.* Les options longues s'appellent des **LEAPS** (*long-term equity anticipation securities*).

### 3.2 Prix d'exercice

| Cours de l'action | Espacement des strikes |
|---|---|
| entre **5 et 25** | **2,50** |
| entre **25 et 200** | **5** |
| au-dessus de **200** | **10** |

*Quand une nouvelle échéance est introduite, la bourse choisit les **deux ou trois strikes les plus proches** du cours. Si le cours sort de la fourchette, un nouveau strike est introduit.* **Exemple :** cours à **84** à l'ouverture des options octobre → strikes probables **80, 85, 90** ; si le cours dépasse 90 → strike **95** ; s'il tombe sous 80 → strike **75**.

### 3.3 Le vocabulaire exact

| Terme | Définition |
|---|---|
| **Classe** | toutes les options **du même type** sur le même actif (les calls IBM sont une classe, les puts une autre) |
| **Série** | toutes les options d'une classe de **même échéance et même strike** — *c'est-à-dire un contrat particulier qui se traite* (« IBM 70 octobre calls ») |
| **Dans la monnaie** | call : $S>K$ · put : $S<K$ |
| **À la monnaie** | $S=K$ pour les deux |
| **Hors la monnaie** | call : $S<K$ · put : $S>K$ |

*Une action à **4 échéances** et **5 strikes**, avec calls et puts, donne **40 contrats différents**.*

> **Valeur intrinsèque et valeur temps.**
>
> $$\boxed{\text{valeur intrinsèque}=\max(S-K,0)\ \text{(call)}\quad\text{ou}\quad\max(K-S,0)\ \text{(put)}}$$
>
> *C'est le **maximum de zéro et de la valeur qu'aurait l'option si elle était exercée immédiatement**. Une option américaine dans la monnaie **doit valoir au moins sa valeur intrinsèque**, puisque le détenteur peut la réaliser en exerçant tout de suite. **Il est souvent optimal d'attendre plutôt que d'exercer** : l'option a alors une **valeur temps**.*
>
> $$\boxed{\text{valeur totale}=\text{valeur intrinsèque}+\text{valeur temps}}$$

**Options FLEX.** *Le CBOE offre des options **flexibles** sur actions et indices, où les traders conviennent de **termes non standard** : strike ou échéance différents de l'offre habituelle, ou option **européenne plutôt qu'américaine**. C'est une tentative des bourses de **reprendre des affaires au marché de gré à gré**.* Une **taille minimale** est imposée (par exemple 100 contrats).

## 🔴 Concept 4 — Dividendes, divisions d'actions et ajustements

⚠️ **La règle qui surprend.** *Les premières options de gré à gré étaient **protégées contre les dividendes** : le strike était réduit du montant du dividende le jour du détachement. **Les options cotées ne sont habituellement PAS ajustées pour les dividendes en espèces.*** Il n'y a **aucun** ajustement des termes du contrat — sauf pour les **très gros** dividendes.

> **Le seuil et le précédent Gucci.** *Quand un dividende en espèces est important — typiquement **plus de 10 %** du cours —, un comité de l'**OCC** au CBOE **peut** décider d'ajuster les termes.*
>
> Le **28 mai 2003**, Gucci Group NV déclare un dividende de **13,50 euros** (≈ **15,88 dollars**) par action, approuvé le 16 juillet 2003 — soit environ **16 %** du cours. Le comité ajusta : *le détenteur d'un call paie 100 fois le strike à l'exercice et reçoit **1 588 dollars en espèces en plus** des 100 actions ; le détenteur d'un put reçoit 100 fois le strike et livre **1 588 dollars en espèces en plus** des 100 actions.* **Effet net : réduire le strike de 15,88.**
>
> ⚠️ *Les ajustements pour gros dividendes **ne sont pas toujours faits**. La Deutsche Terminbörse choisit de **ne pas** ajuster quand Daimler-Benz surprit le marché le **10 mars 1998** avec un dividende d'environ **12 %** du cours.*

**Les divisions d'actions, elles, sont toujours ajustées.**

> **La règle.** *Une division **$n$ pour $m$** doit faire tomber le cours à $m/n$ de sa valeur précédente. Les termes sont ajustés en conséquence :*
>
> $$\boxed{K\ \longrightarrow\ K\times\frac mn}\qquad\qquad\boxed{\text{nombre d'actions}\ \longrightarrow\ \text{nombre}\times\frac nm}$$
>
> *Si le cours baisse comme prévu, **les positions du vendeur et de l'acheteur restent inchangées**.*

<details><summary>**Exercices résolus — division et dividende en actions (exemples 9.1 et 9.2)**</summary>

**Exemple 9.1 — division 2 pour 1.** Call d'achat de **100 actions à 30**. *Étape 1.* $n=2$, $m=1$ → le cours devrait tomber à **la moitié**. *Étape 2.* Strike : $30\times\dfrac12=\mathbf{15}$. *Étape 3.* Nombre d'actions : $100\times\dfrac21=\mathbf{200}$. *Étape 4 — contrôle.* Engagement total avant : $100\times30=3\,000$ ; après : $200\times15=3\,000$ — **inchangé**.

**Exemple 9.2 — dividende en actions de 25 %.** Put de vente de **100 actions à 15**. *Étape 1 — traduire le dividende en division.* *Un dividende en actions de 20 % signifie qu'on reçoit **une action nouvelle pour cinq détenues**, ce qui est essentiellement une division **6 pour 5**.* Donc **25 %** = une nouvelle pour quatre = division **5 pour 4**. *Étape 2.* $n=5$, $m=4$. *Étape 3.* Strike : $15\times\dfrac45=\mathbf{12}$. *Étape 4.* Nombre d'actions : $100\times\dfrac54=\mathbf{125}$. *Étape 5 — contrôle.* $100\times15=1\,500$ ; $125\times12=1\,500$ .

**Émissions de droits.** *La procédure de base consiste à calculer le **prix théorique des droits** puis à **réduire le strike de ce montant**.*

⚠️ **Le piège de traduction.** Un dividende en actions de $x\,\%$ correspond à une division $\left(1+x\right)$ pour $1$ — c'est-à-dire, sous forme entière, $\frac{100+100x}{100}$ : **20 % → 6 pour 5**, **25 % → 5 pour 4**, **50 % → 3 pour 2**.

</details>

**Limites de position et d'exercice.** *La **limite de position** définit le nombre maximal de contrats détenus **d'un même côté du marché**. Sont du même côté : **calls longs et puts courts** d'une part, **calls courts et puts longs** d'autre part. La **limite d'exercice** égale habituellement la limite de position : c'est le nombre maximal de contrats **exerçables par un individu ou un groupe agissant de concert sur cinq jours ouvrés consécutifs**.* Les plus grandes valeurs : **250 000** contrats ; les plus petites capitalisations : **200 000, 75 000, 50 000 ou 25 000**. *Elles visent à empêcher qu'un investisseur influence indûment le marché — mais **savoir si elles sont vraiment nécessaires est controversé**.*

## 🟡 Concept 5 — Négociation, teneurs de marché, commissions

*L'**ISE** lança le **premier marché d'options entièrement électronique** aux États-Unis en **mai 2000**. Plus de **95 %** des ordres du CBOE sont traités électroniquement ; le reste est constitué d'**ordres institutionnels grands ou complexes** exigeant l'intervention de traders.*

> **Le teneur de marché** cote **à la demande** un prix **bid** (auquel il achète) et un prix **offer** (auquel il vend), **sans savoir** si celui qui demande veut acheter ou vendre. *L'offer est toujours supérieur au bid ; l'écart est le **spread bid-offer**, dont la bourse fixe des **plafonds**.*

| Prix de l'option | Spread maximal |
|---|---|
| moins de **0,50** | **0,25** |
| entre **0,50 et 10** | **0,50** |
| entre **10 et 20** | **0,75** |
| plus de **20** | **1** |

*Leur existence garantit que les ordres peuvent **toujours être exécutés sans délai** : ils **apportent de la liquidité**. Ils gagnent leur vie sur le **spread** et couvrent leurs risques par les méthodes du chapitre 18.*

**Position ouverte.** *Si aucun des deux investisseurs ne referme une position existante, l'open interest **augmente d'un contrat**. Si l'un referme et pas l'autre, il **reste le même**. Si les deux referment, il **diminue d'un contrat**.* Et **à l'exercice, il diminue d'un**.

<details><summary>**Exercice résolu — commissions, et le biais qu'elles créent**</summary>

**Barème d'un courtier à escompte.**

| Montant de l'opération | Commission |
|---|---|
| $<2\,500$ | $20+2\,\%$ du montant |
| $2\,500$ à $10\,000$ | $45+1\,\%$ |
| $>10\,000$ | $120+0{,}25\,\%$ |

*Maximum : **30 par contrat** pour les cinq premiers, puis **20 par contrat**. Minimum : **30** pour le premier contrat, puis **2 par contrat**.*

**Calcul 1 — huit contrats à 3.** *Étape 1.* Montant $=8\times100\times3=\mathbf{2\,400}$ → première tranche. *Étape 2.* $20+0{,}02\times2\,400=\mathbf{68}$. *Étape 3 — contrôle des bornes.* Maximum $=5\times30+3\times20=210$ ; minimum $=30+7\times2=44$. **68 est bien dans la fourchette** .

**Calcul 2 — le biais contre l'exercice.** Un investisseur achète **un** call, $K=50$, cours **49**, prime **4,50** → coût **450**. *Étape 1 — commission à l'achat.* *L'achat ou la vente d'un contrat coûte toujours **30** : le maximum **et** le minimum valent 30 pour le premier contrat.* *Étape 2 — le cours monte à 60 et l'option est exercée.* Commission supplémentaire, à **0,75 %** pour exercer **et** 0,75 % pour vendre l'action :

$$2\times0{,}0075\times60\times100=\mathbf{90}$$

*Étape 3 — commissions totales.* $30+90=\mathbf{120}$. *Étape 4 — profit net.* Gain brut $100\times(60-50)=1\,000$, donc

$$1\,000-450-120=\mathbf{430}$$

*Étape 5 — l'alternative.* **Vendre** l'option pour 10 au lieu de l'exercer ne coûterait que **30** de commission → **économie de 60**.

> ⚠️ ***Comme cet exemple l'indique, le système de commissions peut pousser les investisseurs particuliers à VENDRE leurs options plutôt qu'à les exercer.***

**Le coût caché.** *Si le bid était **4,00** et l'offer **4,50** à l'achat, on peut raisonnablement supposer qu'un prix « **juste** » est à mi-chemin, soit **4,25**. Le coût du système de teneur de marché est la différence entre le prix juste et le prix payé : **0,25 par option, soit 25 par contrat**.*

</details>

## 🔴 Concept 6 — Les marges

**Sur actions.** *On peut emprunter jusqu'à **50 %** du prix à son courtier — c'est l'**achat sur marge**. Si le cours baisse au point que le prêt dépasse substantiellement 50 % de la valeur courante, il y a **appel de marge** ; s'il n'est pas honoré, le courtier **vend l'action**.*

⚠️ **Sur options achetées : pas de marge.** *Pour des calls et puts de maturité **inférieure à 9 mois**, la prime doit être payée **intégralement**. Les investisseurs **ne sont pas autorisés** à acheter ces options sur marge, **parce que les options contiennent déjà un levier substantiel** et que l'achat sur marge porterait ce levier à un niveau inacceptable.* Au-delà de **9 mois**, on peut emprunter jusqu'à **25 %** de la valeur de l'option.

> **Option nue** (*naked*) : *une option **non combinée** à une position compensatrice dans l'action sous-jacente.*

$$\boxed{\text{marge}=\max\left(\underbrace{100\,\%\ \text{prime}+20\,\%\,S-\text{montant hors la monnaie}}_{\text{calcul 1}},\ \underbrace{100\,\%\ \text{prime}+10\,\%\times\begin{cases}S&\text{(call)}\\K&\text{(put)}\end{cases}}_{\text{calcul 2}}\right)}$$

⚠️ **Le 20 % devient 15 %** pour les options sur un **indice largement diversifié**, *parce qu'un indice est habituellement **moins volatil** que le prix d'une action individuelle*.

<details><summary>**Exercice résolu — marge sur options nues (exemple 9.3)**</summary>

**Données.** Un investisseur **écrit 4 contrats** de calls nus. Prime **5**, strike **40**, cours **38** → **400 actions**.

*Étape 1 — l'option est-elle dans ou hors la monnaie ?* Call avec $S=38<K=40$ → **hors la monnaie de 2**. *Étape 2 — calcul 1.*

$$400\times(5+0{,}2\times38-2)=400\times10{,}6=\mathbf{4\,240}$$

*Étape 3 — calcul 2.*

$$400\times(5+0{,}1\times38)=400\times8{,}8=\mathbf{3\,520}$$

*Étape 4 — retenir le plus grand.* Marge initiale $=\mathbf{4\,240}$.

**Le même exercice avec un put.** Un put de strike 40 avec $S=38$ est **dans la monnaie de 2** → **rien à retrancher** :

$$400\times(5+0{,}2\times38)=400\times12{,}6=\mathbf{5\,040}$$

Calcul 2 (pour un put, on prend **10 % de $K$**) : $400\times(5+0{,}1\times40)=400\times9=3\,600$. Le maximum est bien **5 040**.

*Dans les deux cas, **le produit de la vente peut servir de partie de la marge**.*

**Le suivi quotidien.** *Un calcul similaire — mais avec le **prix de marché courant** remplaçant le produit de la vente — est refait **chaque jour**. On peut retirer des fonds quand la marge requise est inférieure au solde ; un **appel de marge** est fait dans le cas contraire.*

⚠️ **Les deux pièges de ce calcul.** (i) Le « montant hors la monnaie » ne se retranche **que** si l'option est effectivement hors la monnaie — jamais de « montant dans la monnaie » à ajouter. (ii) Dans le calcul 2, c'est **$S$ pour un call** et **$K$ pour un put**.

</details>

**Le cas du call couvert.** *Un **call couvert** est un call vendu alors qu'on **détient déjà** les actions qu'il faudrait livrer. Il est **bien moins risqué** qu'un call nu : le pire qui puisse arriver est d'être obligé de vendre des actions déjà détenues **en dessous de leur valeur de marché**. **Aucune marge n'est exigée sur l'option écrite.*** En revanche, sur la position en actions, l'investisseur ne peut emprunter que $0{,}5\min(S,K)$ au lieu de $0{,}5S$.

## 🟡 Concept 7 — L'OCC, la régulation, la fiscalité

**L'*Options Clearing Corporation*.** *Elle joue pour les options le rôle que la chambre de compensation joue pour les futures : elle **garantit que les vendeurs honoreront leurs obligations** et tient le registre de toutes les positions.* Les membres doivent avoir un **capital minimum** et contribuer à un **fonds spécial** utilisable en cas de défaut d'un membre. *Les fonds servant à acheter une option doivent être déposés auprès de l'OCC **le matin du jour ouvré suivant** la transaction.*

**La chaîne de l'exercice — et l'aléa qui la termine.**

$$\text{investisseur}\to\text{courtier}\to\text{membre compensateur}\to\text{OCC}$$

*L'OCC **sélectionne aléatoirement** un membre ayant une position courte ouverte sur la même option. Ce membre, selon une procédure établie à l'avance, choisit un investisseur qui a écrit l'option : celui-ci est dit **assigné**.* Call → il doit **vendre** au strike ; put → il doit **acheter** au strike.

> **À l'échéance.** *Toutes les options **dans la monnaie devraient être exercées**, sauf si les coûts de transaction sont si élevés qu'ils annulent le payoff. Certains courtiers exercent **automatiquement** pour leurs clients quand c'est dans leur intérêt, et de nombreuses bourses ont des règles en ce sens.*

**Régulation.** *La **SEC** régule les options sur actions, indices, devises et obligations ; la **CFTC** régule les options sur futures. Les principaux marchés sont en **Illinois** et à **New York**, qui appliquent activement leurs propres lois sur les pratiques inacceptables.* Hull note : *les marchés d'options ont montré une volonté de **s'autoréguler** ; il n'y a eu **ni scandale majeur ni défaut** de membres de l'OCC.*

**Fiscalité américaine — le principe.** *Sauf pour un trader professionnel, les gains et pertes sont taxés en **plus-values**. Un gain ou une perte est reconnu quand (a) l'option **expire sans être exercée** ou (b) la position est **dénouée**. **Si l'option est exercée, le gain ou la perte est intégré à la position en actions** et reconnu quand celle-ci est dénouée.*

| Événement | Base fiscale réputée |
|---|---|
| **Call exercé**, côté long | achat de l'action au **strike + prime du call** |
| **Call exercé**, côté court | vente de l'action au **strike + prime du call** |
| **Put exercé**, côté long (acheteur) | vente de l'action au **strike − prime du put** |
| **Put exercé**, côté court (vendeur) | achat de l'action au **strike − prime du put** |

⚠️ **La règle de la vente-rachat (*wash sale*).** *Un investisseur qui a acheté à 60 et voit le cours tomber à 40 pourrait vendre puis **racheter immédiatement** pour réaliser fiscalement la perte de 20. Pour l'empêcher : **si le rachat a lieu dans les 30 jours de la vente** — c'est-à-dire dans une fenêtre de **61 jours**, 30 avant et 30 après —, **la perte n'est pas déductible**. **L'interdiction s'applique aussi si, dans cette fenêtre, le contribuable conclut une option ou un contrat similaire pour acquérir l'action.*** Vendre à perte puis acheter un call dans les 30 jours fait donc **rejeter la perte**. *La règle ne s'applique pas à un professionnel des titres dont la perte est subie dans le cours normal des affaires.*

⚠️ **Les ventes constructives.** *Avant 1997, shorter un titre en détenant une position longue sur un titre substantiellement identique ne déclenchait aucune reconnaissance de gain jusqu'au dénouement du short — un moyen de **différer** l'impôt. Le **Tax Relief Act de 1997** a changé cela : un bien apprécié est réputé **« vendu de façon constructive »** quand le propriétaire :*

1. *conclut une **vente à découvert** du même bien ou d'un bien substantiellement identique ;*
2. *conclut un **futures ou un forward** de livraison du même bien ;*
3. *prend une ou plusieurs positions **éliminant substantiellement toute la perte ET toute l'opportunité de gain**.*

> **La conséquence pratique, et elle est fine.** *Les opérations réduisant **seulement le risque de perte** ou **seulement l'opportunité de gain** ne devraient **pas** entraîner de vente constructive. Un investisseur détenant une action peut donc **acheter des puts dans la monnaie** sur cette action **sans déclencher** de vente constructive.*

<details><summary>**La planification fiscale par les options — le montage à deux pays**</summary>

**Le décor.** Le **pays A** taxe **peu** les intérêts et dividendes et **beaucoup** les plus-values. Le **pays B** fait l'inverse.

**L'objectif de l'entreprise.** Recevoir le **revenu** du titre dans le pays A, la **plus-value** éventuelle dans le pays B, et garder les **moins-values** dans le pays A *où elles peuvent compenser des plus-values sur d'autres postes*.

**Le montage.** *Étape 1.* Une filiale dans le **pays A** détient **juridiquement** le titre. *Étape 2.* Une filiale dans le **pays B** lui **achète un call** sur ce titre, de **strike égal à la valeur courante**. *Étape 3 — pendant la vie de l'option.* Le **revenu** du titre est gagné dans le **pays A** (fiscalité faible sur le revenu). *Étape 4 — si le cours monte fortement.* L'option est **exercée** et la **plus-value est réalisée dans le pays B** (fiscalité faible sur les plus-values). *Étape 5 — si le cours chute fortement.* L'option **n'est pas exercée** et la **moins-value est réalisée dans le pays A** (où elle est utile).

⚠️ **L'avertissement de Hull.** *Les autorités fiscales de nombreuses juridictions ont proposé des lois destinées à combattre l'usage des dérivés à des fins fiscales. **Avant d'entrer dans une transaction motivée par la fiscalité, un trésorier ou un particulier devrait explorer en détail comment la structure pourrait être dénouée en cas de changement législatif — et à quel coût.***

</details>

## 🟡 Concept 8 — Warrants, options de salariés, convertibles, marché OTC

| Instrument | Définition |
|---|---|
| **Warrant** | option **émise** par une institution financière ou une entreprise. *Une banque peut émettre des put warrants sur un million d'onces d'or et créer un marché. Une entreprise émet souvent des call warrants sur sa propre action **attachés à une émission obligataire** pour la rendre plus attractive.* |
| **Option de salarié** | call **émis par l'entreprise à ses salariés** pour les motiver à agir dans l'intérêt des actionnaires ; *habituellement **à la monnaie** à l'émission*. *Elles constituent désormais une **charge au compte de résultat** dans la plupart des pays, ce qui les rend **moins attractives** qu'autrefois.* (Chapitre 15.) |
| **Obligation convertible** | obligation **convertible en actions** à certaines dates selon un ratio prédéterminé : *une obligation avec un **call incorporé** sur l'action de l'entreprise*. |

⚠️ **Deux différences majeures avec les options cotées.**

1. **Nombre fixé d'avance.** *Pour les warrants, options de salariés et convertibles, un nombre **prédéterminé** d'options est émis. Le nombre d'options cotées, lui, **n'est pas prédéterminé** : il **augmente** quand des positions sont prises et **diminue** quand elles sont dénouées.*
2. **Dilution.** *Quand ces instruments sont exercés, **l'entreprise émet de nouvelles actions** et les vend au détenteur au prix d'exercice : le nombre d'actions en circulation **augmente**. Quand une option cotée est exercée, la partie courte **achète sur le marché des actions déjà émises** et les revend au strike — **l'entreprise dont l'action est le sous-jacent n'est impliquée d'aucune manière**.*

**Le marché de gré à gré.** *Il a pris de l'importance depuis le début des années 1980 et est **maintenant plus grand que le marché coté**.* Sous-jacents les plus populaires : **change** et **taux d'intérêt**. *Le principal inconvénient potentiel est que **le vendeur peut faire défaut** : l'acheteur est donc soumis à un **risque de crédit** — d'où l'exigence usuelle de **collatéral**.* Les structures sur mesure — échéances, strikes, tailles non standard, ou payoff différent d'un call ou put — donnent les **options exotiques** (chapitre 25).

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| Un strike, une prime, un cours final | **payoff puis profit** | payoff $-$ prime (acheteur) |
| « faut-il exercer ? » avec une perte globale | **décision d'exercice** | exercer si **dans la monnaie**, la prime est un coût enfoui |
| Une division « $n$ pour $m$ » | **ajustement** | $K\times m/n$, actions $\times n/m$ |
| Un dividende **en actions** de $x\,\%$ | **traduire en division** | 20 % → 6/5, 25 % → 5/4 |
| Un dividende **en espèces** ordinaire | **aucun ajustement** | sauf si $>10\,\%$ du cours (décision de l'OCC) |
| Une option **vendue**, un cours, un strike | **marge** | $\max$ des **deux** calculs |
| Un barème et un montant | **commission** | tranche, puis vérifier plancher et plafond |
| « l'open interest augmente-t-il ? » | **comptage** | +1, 0 ou −1 selon qui referme |

## Comment résoudre ce type d'exercice

**Protocole marge sur option nue — 5 étapes.**

1. Compter les **actions** : $n_{\text{contrats}}\times100$.
2. Déterminer si l'option est **dans** ou **hors** la monnaie, et de combien.
3. **Calcul 1** : prime $+\,0{,}20S-$ (montant hors la monnaie, **zéro si dans la monnaie**).
4. **Calcul 2** : prime $+\,0{,}10S$ pour un **call**, prime $+\,0{,}10K$ pour un **put**.
5. Retenir le **maximum**, multiplier par le nombre d'actions. *(15 % au lieu de 20 % pour un indice diversifié.)*

**Protocole ajustement — 4 étapes.**

1. Traduire l'événement en **division $n$ pour $m$** (un dividende en actions de $x$ % = division $(100+100x)$ pour $100$, réduite).
2. Nouveau strike $=K\times m/n$.
3. Nouveau nombre d'actions $=$ ancien $\times n/m$.
4. **Contrôle** : $K\times$ nombre d'actions doit être **inchangé**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Ne pas exercer un call dans la monnaie parce que l'opération est perdante | Exercer donne **−300**, ne pas exercer **−500** : la prime est **enfouie** |
| Croire que les options cotées sont protégées contre les dividendes | **Non** — sauf décision de l'OCC pour un dividende **&gt; 10 %** |
| Inverser $m$ et $n$ dans l'ajustement | Division **$n$ pour $m$** : $K\times m/n$, actions $\times n/m$ |
| Traduire « dividende 25 % » par une division 4 pour 5 | C'est **5 pour 4** (une action nouvelle pour quatre) |
| Prendre le **plus petit** des deux calculs de marge | On retient le **maximum** |
| Retrancher un « montant dans la monnaie » | On ne retranche que le montant **hors** la monnaie |
| Utiliser $S$ au lieu de $K$ dans le calcul 2 d'un put | Call : $0{,}10S$ · **put : $0{,}10K$** |
| Croire qu'un call couvert exige une marge | **Aucune** marge sur l'option ; l'emprunt sur les actions passe à $0{,}5\min(S,K)$ |
| Acheter des options courtes sur marge | **Interdit** en dessous de 9 mois — le levier est déjà substantiel |
| Vendre à perte puis racheter un call dans les 30 jours | La perte est **rejetée** (*wash sale*) |
| Croire qu'acheter un put déclenche une vente constructive | **Non** — cela ne réduit que le **risque de perte** |
| Croire que l'exercice d'une option cotée dilue le capital | **Non** — seuls warrants, options de salariés et convertibles diluent |

## 📌 Ultimate Review

**Les quatre payoffs.** $\max(S_T-K,0)$ · $\min(K-S_T,0)$ · $\max(K-S_T,0)$ · $\min(S_T-K,0)$.

**Valeur = intrinsèque + temps.** Intrinsèque $=\max(S-K,0)$ ou $\max(K-S,0)$ · une américaine dans la monnaie vaut **au moins** son intrinsèque.

**Marge d'une option nue.** $\max\big(\text{prime}+0{,}20S-\text{HLM},\ \text{prime}+0{,}10\times(S\ \text{ou}\ K)\big)$, ×nombre d'actions ; **15 %** pour un indice.

**Ajustement $n$ pour $m$.** $K\to Km/n$ · actions $\to\times n/m$ · dividende en actions de 20 % $\equiv$ 6 pour 5.

**Les repères institutionnels.** Contrat actions US **100 actions** · échéance **samedi après le 3ᵉ vendredi** · cycles **janvier / février / mars** · strikes espacés **2,50 / 5 / 10** · devises **10 000 unités** (yen : 1 000 000) · indices **100 × indice**, règlement **en espèces** · limites de position jusqu'à **250 000** contrats · marge sur actions **50 %** · options **&lt; 9 mois** payées **intégralement**, **25 %** empruntables au-delà · gros dividende **&gt; 10 %** · Gucci **16 %**, **15,88 dollars** · fenêtre *wash sale* **61 jours** · *Tax Relief Act* **1997**.

**Les deux différences warrant / option cotée.** Nombre **prédéterminé** · **dilution** à l'exercice.

## 🧠 Active Recall

<details><summary>Un call $K=100$ acheté 5 finit à $S_T=102$. Faut-il exercer, et pourquoi ?</summary>

**Oui.** Exercer donne un gain de $100\times2=200$, soit une **perte globale de 300** après la prime de 500. Ne **pas** exercer donne une **perte de 500** — c'est **pire**. La prime est un **coût enfoui** qui n'entre pas dans la décision d'exercice. *En général, les calls doivent toujours être exercés à l'échéance si le cours est au-dessus du strike.*

</details>

<details><summary>Distinguer classe, série, et donner le nombre de contrats pour 4 échéances et 5 strikes.</summary>

Une **classe** regroupe toutes les options **du même type** sur le même actif (les calls IBM sont une classe, les puts une autre). Une **série** regroupe toutes les options d'une classe de **même échéance et même strike** — c'est **le contrat particulier qui se traite** (« IBM 70 octobre calls »).

Avec 4 échéances, 5 strikes, calls **et** puts : $4\times5\times2=\mathbf{40}$ contrats différents.

</details>

<details><summary>Définir valeur intrinsèque et valeur temps, et dire pourquoi une américaine vaut au moins son intrinsèque.</summary>

**Intrinsèque** $=\max(S-K,0)$ pour un call, $\max(K-S,0)$ pour un put — *le maximum de zéro et de ce que vaudrait l'option si elle était exercée immédiatement*. **Valeur temps** = le reste. Une **américaine** dans la monnaie vaut au moins son intrinsèque *parce que le détenteur peut la réaliser en exerçant tout de suite* — sinon il y aurait arbitrage. Et *il est souvent optimal d'attendre*, ce qui est précisément la valeur temps.

</details>

<details><summary>Une entreprise fait une division 2 pour 1. Que devient un call sur 100 actions à 30 ?</summary>

$K\to30\times\dfrac12=\mathbf{15}$ et le nombre d'actions $\to100\times\dfrac21=\mathbf{200}$. **Contrôle** : $100\times30=200\times15=3\,000$ — *les positions du vendeur et de l'acheteur restent inchangées* si le cours tombe bien de moitié, comme attendu.

</details>

<details><summary>Un dividende en actions de 25 % frappe un put de 100 actions à 15. Que devient-il ?</summary>

25 % = une action nouvelle pour quatre détenues = division **5 pour 4**. Donc $K\to15\times\dfrac45=\mathbf{12}$ et le nombre d'actions $\to100\times\dfrac54=\mathbf{125}$. Contrôle : $125\times12=1\,500=100\times15$ .

</details>

<details><summary>Les options cotées sont-elles protégées contre les dividendes en espèces ?</summary>

**Non** en règle générale : *quand un dividende en espèces survient, il n'y a **aucun ajustement** des termes du contrat*. **Exception** : pour un **gros** dividende — typiquement **plus de 10 %** du cours — un comité de l'OCC **peut** ajuster. Cas **Gucci**, mai 2003 : dividende de **15,88 dollars**, soit **16 %** du cours ; l'ajustement fit livrer 1 588 dollars de cash en plus des 100 actions, **réduisant effectivement le strike de 15,88**. Mais *les ajustements ne sont pas toujours faits* — Daimler-Benz, mars 1998, dividende de 12 %, **pas d'ajustement**.

</details>

<details><summary>Un investisseur vend 4 calls nus, prime 5, $K=40$, $S=38$. Quelle est la marge ?</summary>

400 actions ; l'option est **hors la monnaie de 2**. *Calcul 1* : $400\times(5+0{,}2\times38-2)=400\times10{,}6=\mathbf{4\,240}$. *Calcul 2* : $400\times(5+0{,}1\times38)=400\times8{,}8=3\,520$. **Marge = 4 240** (le maximum). S'il s'agissait d'un **put**, il serait **dans la monnaie de 2**, rien à retrancher : $400\times(5+0{,}2\times38)=\mathbf{5\,040}$.

</details>

<details><summary>Pourquoi ne peut-on pas acheter des options courtes sur marge ?</summary>

*Parce que **les options contiennent déjà un levier substantiel**, et que l'achat sur marge porterait ce levier à un niveau **inacceptable**.* Pour les maturités **inférieures à 9 mois**, la prime doit être payée **intégralement** ; au-delà, on peut emprunter jusqu'à **25 %** de la valeur de l'option.

</details>

<details><summary>Pourquoi le système de commissions pousse-t-il les particuliers à vendre plutôt qu'à exercer ?</summary>

Parce qu'**exercer coûte deux commissions sur l'action** (exercer **et** vendre le titre). Dans l'exemple : $2\times0{,}0075\times60\times100=\mathbf{90}$ de commissions supplémentaires, alors que **vendre l'option** ne coûte que **30**. Économie : **60**. *Comme cet exemple l'indique, le système de commissions peut pousser les investisseurs particuliers à vendre leurs options plutôt qu'à les exercer.*

</details>

<details><summary>Expliquer la règle du *wash sale* et son extension aux options.</summary>

Elle empêche de vendre à perte puis de racheter aussitôt pour réaliser fiscalement la perte : *si le rachat a lieu **dans les 30 jours** de la vente — fenêtre de **61 jours**, 30 avant et 30 après — **la perte n'est pas déductible***. **L'extension** : *l'interdiction s'applique aussi si, dans cette fenêtre, le contribuable conclut une **option ou un contrat similaire** pour acquérir l'action*. Vendre à perte puis acheter un **call** dans les 30 jours fait donc rejeter la perte. Elle ne s'applique **pas** à un professionnel des titres dans le cours normal de ses affaires.

</details>

<details><summary>Qu'est-ce qu'une vente constructive, et pourquoi acheter un put n'en déclenche-t-il pas une ?</summary>

Depuis le **Tax Relief Act de 1997**, un bien apprécié est réputé **vendu** quand on (1) le **short**, (2) s'engage à le **livrer à terme**, ou (3) prend des positions **éliminant substantiellement toute la perte ET toute l'opportunité de gain**.

Acheter un **put dans la monnaie** ne réduit que le **risque de perte**, sans supprimer l'opportunité de gain : *les opérations réduisant seulement le risque de perte ou seulement l'opportunité de gain ne devraient pas entraîner de vente constructive*. **Il faut supprimer les deux.**

</details>

<details><summary>En quoi un warrant diffère-t-il d'une option cotée ?</summary>

Deux différences. **(1) Le nombre.** Un nombre **prédéterminé** de warrants est émis ; le nombre d'options cotées **varie** avec les prises et dénouements de positions. **(2) La dilution.** À l'exercice d'un warrant (ou d'une option de salarié, ou d'un convertible), *l'entreprise **émet de nouvelles actions*** et les vend au strike : le nombre d'actions en circulation **augmente**. À l'exercice d'une option cotée, la partie courte **achète sur le marché des actions déjà émises** — *l'entreprise n'est impliquée d'aucune manière*.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Payoff d'un long call ? | $\max(S_T-K,0)$ |
| Payoff d'un short call ? | $\min(K-S_T,0)$ |
| Payoff d'un long put ? | $\max(K-S_T,0)$ |
| Payoff d'un short put ? | $\min(S_T-K,0)$ |
| Perte maximale d'un vendeur de call nu ? | **Non bornée** |
| Faut-il exercer un call dans la monnaie mais globalement perdant ? | **Oui** — la prime est un **coût enfoui** |
| Taille d'un contrat sur actions US ? | **100 actions** |
| Taille d'un contrat de change ? | **10 000 unités** (yen : **1 000 000**) |
| Taille d'un contrat sur indice ? | **100 fois** l'indice |
| Règlement des options sur indice ? | **Toujours en espèces** |
| Quel indice américain est américain ? | L'**OEX** (S&P 100) |
| Date d'échéance exacte ? | **Samedi après le 3ᵉ vendredi** du mois |
| Dernier jour de cotation ? | Le **3ᵉ vendredi** |
| Les trois cycles ? | **Janvier**, **février**, **mars** (+3, +6, +9 mois) |
| Que sont les LEAPS ? | Options **long terme** |
| Espacement des strikes ? | **2,50** (5-25) · **5** (25-200) · **10** (&gt;200) |
| Qu'est-ce qu'une **classe** ? | Toutes les options du **même type** sur un actif |
| Qu'est-ce qu'une **série** ? | Même classe, **même échéance et même strike** |
| Call dans la monnaie ? | $S>K$ |
| Put dans la monnaie ? | $S<K$ |
| Valeur intrinsèque d'un call ? | $\max(S-K,0)$ |
| Valeur totale d'une option ? | **Intrinsèque + temps** |
| Que sont les options FLEX ? | Options cotées à **termes non standard** |
| Ajustement pour dividende en espèces ? | **Aucun** en général |
| Seuil d'un « gros » dividende ? | Plus de **10 %** du cours |
| Dividende Gucci de 2003 ? | **15,88 dollars**, soit **16 %** du cours |
| Ajustement pour division $n$ pour $m$ ? | $K\times m/n$, actions $\times n/m$ |
| Division 2 pour 1 sur un call 100 actions à 30 ? | **200 actions à 15** |
| Dividende en actions de 20 % ? | Équivalent à une division **6 pour 5** |
| Dividende en actions de 25 % ? | Division **5 pour 4** |
| Ajustement pour émission de droits ? | Réduire $K$ du **prix théorique des droits** |
| Qui est du « même côté du marché » ? | **Calls longs et puts courts** (et réciproquement) |
| Limite de position maximale ? | **250 000** contrats |
| Limite d'exercice ? | Sur **cinq jours ouvrés consécutifs** |
| Premier marché d'options tout électronique ? | L'**ISE**, **mai 2000** |
| Part des ordres électroniques au CBOE ? | Plus de **95 %** |
| Spread maximal pour une option à 15 ? | **0,75** |
| Effet sur l'open interest si les deux referment ? | Il **diminue de 1** |
| Effet d'un exercice sur l'open interest ? | Il **diminue de 1** |
| Emprunt maximal à l'achat d'actions ? | **50 %** |
| Peut-on acheter des options &lt; 9 mois sur marge ? | **Non** |
| Et au-delà de 9 mois ? | Emprunt jusqu'à **25 %** |
| Qu'est-ce qu'une option nue ? | Non combinée à une position **compensatrice** |
| Calcul 1 de la marge ? | prime $+\,0{,}20S-$ montant **hors la monnaie** |
| Calcul 2 pour un call ? pour un put ? | prime $+\,0{,}10S$ · prime $+\,0{,}10K$ |
| Lequel retient-on ? | Le **plus grand** |
| Le taux pour un indice diversifié ? | **15 %** au lieu de 20 % |
| Marge exigée sur un call couvert ? | **Aucune** |
| Emprunt sur les actions d'un call couvert ? | $0{,}5\min(S,K)$ |
| Rôle de l'OCC ? | **Garantir** l'exécution et tenir le registre |
| Comment est choisi l'assigné ? | **Aléatoirement** parmi les membres, puis par procédure interne |
| Base fiscale d'un call exercé (long) ? | Strike **+ prime du call** |
| Base fiscale d'un put exercé (long) ? | Strike **− prime du put** |
| Fenêtre de la règle *wash sale* ? | **61 jours** (30 avant, 30 après) |
| Acheter un call après une vente à perte ? | La perte est **rejetée** |
| Loi créant les ventes constructives ? | *Tax Relief Act* de **1997** |
| Acheter un put dans la monnaie déclenche-t-il une vente constructive ? | **Non** |
| Qu'est-ce qu'un warrant ? | Option **émise** par une institution ou une entreprise |
| Options de salariés : à quel niveau ? | Habituellement **à la monnaie** à l'émission |
| Qu'est-ce qu'une convertible ? | Obligation avec un **call incorporé** sur l'action |
| Les deux différences avec une option cotée ? | Nombre **prédéterminé** · **dilution** à l'exercice |
| Le marché OTC des options est-il plus grand que le coté ? | **Oui**, depuis les années 1980 |
| Principal inconvénient du gré à gré ? | Le **risque de crédit** du vendeur |
