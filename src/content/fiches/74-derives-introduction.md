# Fiche 74 — Marchés de produits dérivés : panorama et logique économique

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 1 « Introduction » |
| **Difficulté** | Must know — le vocabulaire de tout le reste du livre |
| **Temps d'étude estimé** | 1 h 15 |
| **Prérequis** | Aucun |
| **Concepts clés** | Dérivé, sous-jacent, marché organisé vs OTC, forward, futures, call, put, strike, maturité, position longue/courte, payoff, hedger, spéculateur, arbitragiste, levier, absence d'arbitrage |
| **Poids à l'examen** | Les **payoffs** ($S_T-K$, $\max(S_T-K,0)$…), la **décomposition** d'un produit structuré en obligation + options, et le calcul du **profit** avec prime. |

## 🎯 Vue d'ensemble

**Un dérivé est un instrument financier dont la valeur dépend de (dérive de) la valeur d'autres variables sous-jacentes, plus élémentaires.** Le sous-jacent est le plus souvent le prix d'un actif négocié — mais Hull insiste : *un dérivé peut dépendre de presque n'importe quelle variable, du prix du porc à la quantité de neige tombée sur une station de ski*.

```
             ┌── OBLIGATION ferme ──┬── de gré à gré ─→ FORWARD
DÉRIVÉ ──────┤                      └── en bourse ────→ FUTURES
             └── DROIT (prime) ─────┬── d'acheter ────→ CALL
                                    └── de vendre ────→ PUT

QUI ?   hedger (réduit un risque) · spéculateur (parie) · arbitragiste (verrouille)
LOI     tout le livre repose sur : IL N'EXISTE PAS D'OPPORTUNITÉ D'ARBITRAGE
```

**La ligne de partage à retenir.** Forward et futures créent une **obligation** et ne coûtent rien à l'entrée ; les options créent un **droit** et coûtent une **prime** payée d'avance. Cette seule différence explique tout le reste : profils de gain asymétriques, notion d'assurance, et la totalité de la théorie de valorisation des chapitres 9 à 35.

## 🟡 Concept 1 — Marchés organisés et marchés de gré à gré

|  | **Marché organisé** (*exchange-traded*) | **Gré à gré** (*over-the-counter*, OTC) |
|---|---|---|
| Contrats | **standardisés** par la bourse | **négociés librement** entre les deux parties |
| Contreparties | ne se connaissent pas | deux institutions, ou institution ↔ client |
| Risque de crédit | **quasi éliminé** par la chambre de compensation | **présent** — le contrat peut ne pas être honoré |
| Taille des transactions | plus petites | typiquement **beaucoup plus grandes** |
| Mécanisme | criée puis **électronique** | réseau téléphone/informatique de *dealers* |
| Prix affichés | carnet d'ordres | *market makers* cotant **bid** (achat) et **offer** (vente) |

**Repères historiques.** CBOT **1848** (agriculteurs et marchands, standardisation des grains, premier contrat *to-arrive*) · CME **1919** · CBOE **1973** : options d'achat sur **16 actions** ; les puts arrivent en **1977** ; aujourd'hui plus de **2 500** actions et de nombreux indices.

**Tailles de marché (BRI, décembre 2009).** OTC : **614,7 mille milliards** de dollars de nominal — bourses : **73,1 mille milliards**.

⚠️ **Le nominal n'est pas la valeur.** Un contrat d'achat de 100 M USD contre livres a un **nominal** de 100 M USD mais peut ne **valoir** que 1 M USD. La **valeur de marché brute** de tout l'OTC en décembre 2009 : **21,6 mille milliards** — soit **3 %** du nominal. Confondre les deux est l'erreur de lecture la plus répandue sur ces marchés.

**Le trading électronique** a engendré le **trading algorithmique** (*black-box*, automatisé, haute fréquence, *robo trading*) : des programmes déclenchent les ordres, souvent **sans intervention humaine**.

## 🔴 Concept 2 — Le contrat forward

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Accord d'**acheter ou de vendre un actif à une date future donnée pour un prix donné**. À opposer au *contrat au comptant* (*spot*), accord d'acheter ou vendre **aujourd'hui**. Le forward se traite **de gré à gré**.

</div>

| Position | Engagement | Payoff à maturité (1 unité) |
|---|---|---|
| **Longue** | acheter le sous-jacent en $T$ au prix $K$ | $\boxed{S_T-K}$ |
| **Courte** | vendre le sous-jacent en $T$ au prix $K$ | $\boxed{K-S_T}$ |

où $K$ = prix de livraison, $S_T$ = prix comptant du sous-jacent à maturité.

⚠️ **Entrer dans un forward ne coûte rien.** Donc le payoff **est** le gain ou la perte totale du trader — pas besoin de retrancher un coût initial. C'est faux pour une option : là il faudra toujours retrancher la prime.

**Cotations spot et forward USD/GBP, 24 mai 2010** (nombre de USD par GBP) :

|  | Bid (la banque achète) | Offer (la banque vend) |
|---|---|---|
| Spot | 1,4407 | 1,4411 |
| 1 mois | 1,4408 | 1,4413 |
| 3 mois | 1,4410 | 1,4415 |
| 6 mois | 1,4416 | 1,4422 |

**Exemple chiffré.** Un trésorier américain doit payer £1 M dans 6 mois. Il achète £1 M à terme 6 mois au cours **1,4422** : il s'est engagé à payer **1 442 200 dollars**.

- Si le spot monte à $1{,}5000$ : le contrat **vaut** $1\,500\,000-1\,442\,200=\mathbf{57\,800}$ dollars.
- Si le spot tombe à $1{,}3500$ : le contrat a une valeur **négative** de $-92\,200$ dollars — l'entreprise paie 92 200 dollars de plus que le marché.

Par livre : $S_T=1{,}5000\Rightarrow+0{,}0578$ ; $S_T=1{,}3500\Rightarrow-0{,}0922$.

**Prix forward et prix comptant — l'avant-goût du chapitre 5.** Une action sans dividende vaut 60 dollars, on emprunte et prête à 5 % sur 1 an. Le prix forward 1 an **doit** être $60$ capitalisé à 5 %, soit **63 dollars**.

| Si le forward vaut | La stratégie d'arbitrage | Gain sans risque |
|---|---|---|
| **67 dollars** (trop cher) | emprunter 60, acheter l'action, la vendre à terme 67 ; rembourser le prêt | **+4 dollars** |
| **58 dollars** (trop bas) | un détenteur vend l'action 60, la rachète à terme 58, place 60 à 5 % (+3) | **+5 dollars** de mieux |

## 🟡 Concept 3 — Le contrat futures

**Même définition économique que le forward** — acheter ou vendre un actif à une date future pour un prix donné — mais négocié **en bourse**. Comme les deux parties ne se connaissent pas nécessairement, la bourse :

1. **standardise** les caractéristiques du contrat (quantité, qualité, échéances) ;
2. fournit un **mécanisme de garantie** que le contrat sera honoré (chambre de compensation, appels de marge → chapitre 2).

**Sous-jacents.** Matières premières (poitrine de porc, bovins vivants, sucre, laine, bois, cuivre, aluminium, or, étain) et actifs financiers (indices boursiers, devises, obligations du Trésor).

> Le 1ᵉʳ septembre, le futures or décembre est coté **1 080 dollars**. C'est le prix, hors commissions, auquel on peut s'engager à acheter ou vendre de l'or pour livraison décembre. Il est déterminé **comme tout prix, par l'offre et la demande** : plus d'acheteurs que de vendeurs → il monte.

## 🔴 Concept 4 — Les options

|  | **Call** (option d'achat) | **Put** (option de vente) |
|---|---|---|
| Donne au détenteur | le **droit d'acheter** | le **droit de vendre** |
| Payoff à maturité | $\max(S_T-K,0)$ | $\max(K-S_T,0)$ |
| Prix quand $K$ augmente | **baisse** | **monte** |

**Vocabulaire obligatoire.**

| Terme | Sens |
|---|---|
| **Prix d'exercice** / *strike* $K$ | le prix fixé dans le contrat |
| **Maturité** / expiration | la date fixée dans le contrat |
| **Américaine** | exerçable **à tout moment** jusqu'à l'échéance |
| **Européenne** | exerçable **seulement à l'échéance** |
| **Écrire** une option | la **vendre** (position courte) |
| Contrat standard actions US | **100 actions** |

⚠️ **Américaine / européenne ne désigne pas un lieu.** Hull le signale en note : *certaines options cotées sur des places nord-américaines sont européennes*. La plupart des options cotées **sont** américaines ; les européennes sont plus faciles à analyser et servent à déduire les propriétés des américaines.

⚠️ **Une option donne un droit, pas une obligation.** C'est ce qui la distingue des forwards et futures, où le détenteur **est obligé** d'acheter ou vendre. Corollaire immédiat : entrer dans un forward est **gratuit**, acquérir une option a un **coût**.

**Les quatre positions élémentaires** — achat de call, vente de call, achat de put, vente de put. Acheteurs = positions **longues**, vendeurs = positions **courtes**.

**Prix de calls sur Google, 15 juin 2010** (action : bid 497,02 / offer 497,25) :

| $K$ (USD) | Juil. bid | Juil. offer | Sept. bid | Sept. offer | Déc. bid | Déc. offer |
|---|---|---|---|---|---|---|
| 460 | 43,30 | 44,00 | 51,90 | 53,90 | 63,40 | 64,80 |
| 480 | 28,60 | 29,00 | 39,70 | 40,40 | 50,80 | 52,30 |
| 500 | 17,00 | 17,40 | 28,30 | 29,30 | 40,60 | 41,30 |
| 520 | 9,00 | 9,30 | 19,10 | 19,90 | 31,40 | 32,00 |
| 540 | 4,20 | 4,40 | 12,70 | 13,00 | 23,10 | 24,00 |
| 560 | 1,75 | 2,10 | 7,40 | 8,40 | 16,80 | 17,70 |

**Puts correspondants** (mêmes conditions) :

| $K$ (USD) | Juil. bid | Juil. offer | Sept. bid | Sept. offer | Déc. bid | Déc. offer |
|---|---|---|---|---|---|---|
| 460 | 6,30 | 6,60 | 15,70 | 16,20 | 26,00 | 27,30 |
| 480 | 11,30 | 11,70 | 22,20 | 22,70 | 33,30 | 35,00 |
| 500 | 19,50 | 20,00 | 30,90 | 32,60 | 42,20 | 43,00 |
| 520 | 31,60 | 33,90 | 41,80 | 43,60 | 52,80 | 54,50 |
| 540 | 46,30 | 47,20 | 54,90 | 56,10 | 64,90 | 66,20 |
| 560 | 64,30 | 66,70 | 70,00 | 71,30 | 78,60 | 80,00 |

**Trois propriétés lisibles directement sur ces tableaux :** le prix du **call décroît** en $K$ · le prix du **put croît** en $K$ · les **deux** types gagnent en valeur quand la **maturité s'allonge**.

<details class="details--riche">
<summary>

**Les deux transactions Google chiffrées pas à pas**

</summary>

**(a) Achat d'un contrat de calls décembre, $K=520$.**

*Étape 1 — le prix payé.* On **achète**, donc on paie le prix **offer** : $32{,}00$ dollars par action. *Étape 2 — la taille.* Un contrat = **100 actions** → coût $100\times32{,}00=\mathbf{3\,200}$ dollars, versé à la bourse via le courtier. *Étape 3 — le droit obtenu.* Acheter 100 actions Google à 520 dollars chacune jusqu'au 18 décembre 2010. *Étape 4 — scénario défavorable.* Si Google ne dépasse jamais 520 dollars, l'option **n'est pas exercée** : perte **totale** de 3 200 dollars. *Étape 5 — scénario favorable.* Si l'action cote 600 dollars à l'exercice : on achète à 520, on revend à 600 → payoff $100\times(600-520)=\mathbf{8\,000}$ dollars. *Étape 6 — le profit.* $8\,000-3\,200=\mathbf{4\,800}$ dollars.

**(b) Vente d'un contrat de puts septembre, $K=480$.**

*Étape 1 — le prix reçu.* On **vend**, donc on reçoit le prix **bid** : $22{,}20$ dollars. *Étape 2 — l'encaissement immédiat.* $100\times22{,}20=\mathbf{2\,220}$ dollars. *Étape 3 — scénario favorable.* Si l'action reste au-dessus de 480 dollars, l'option n'est pas exercée : profit = **2 220 dollars**, point final. *Étape 4 — scénario défavorable.* Si l'action tombe à 420 dollars, l'acheteur exerce : on **doit acheter** 100 actions à 480 dollars alors qu'elles valent 420 dollars. *Étape 5 — la perte brute.* $100\times(480-420)=\mathbf{6\,000}$ dollars. *Étape 6 — la perte nette.* $6\,000-2\,220=\mathbf{3\,780}$ dollars.

⚠️ **Sens de la prime.** L'acheteur **paie** et sa perte est **plafonnée** à la prime ; le vendeur **encaisse** et son gain est **plafonné** à la prime — mais sa perte ne l'est pas. Les deux calculs ci-dessus sont symétriques : retenez que le profit du vendeur est l'**opposé** de celui de l'acheteur.

</details>

## 🔴 Concept 5 — Les trois catégories d'intervenants

|  | **Hedger** | **Spéculateur** | **Arbitragiste** |
|---|---|---|---|
| Objectif | **réduire** un risque déjà subi | **parier** sur une direction | **verrouiller** un profit sans risque |
| Position | inverse de l'exposition | directionnelle | **compensées** sur ≥ 2 marchés |
| Risque final | réduit | augmenté (levier) | **nul** |

> **Les *hedge funds* sont de gros utilisateurs des trois usages.** Ils ne prennent des fonds que d'investisseurs avertis, ne sollicitent pas le public, et échappent aux règles imposées aux fonds communs (rachat à tout moment, publication de la politique d'investissement, limitation du levier, interdiction du short). Frais typiques : **1 à 2 % des encours + 20 % des profits**. Encours mondiaux ≈ **1 000 milliards** de dollars.
>
> Stratégies nommées par Hull : *Long/Short Equities* (acheter le sous-évalué, shorter le surévalué, exposition au marché faible) · *Convertible Arbitrage* (long convertible + short géré activement sur l'action) · *Distressed Securities* · *Emerging Markets* · *Global Macro* · *Merger Arbitrage*.
>
> Le gérant doit : **1.** évaluer les risques auxquels le fonds est exposé ; **2.** décider lesquels sont acceptables et lesquels seront couverts ; **3.** concevoir les stratégies de couverture.

### 5.1 Couverture — forward vs option

**Par forward.** ImportCo doit payer **£10 M** dans 3 mois : elle **achète** des livres à 3 mois au cours **1,4415** (offer) → prix fixé à **14 415 000 dollars**. ExportCo recevra **£30 M** dans 3 mois : elle **vend** à 3 mois au cours **1,4410** (bid) → **43 230 000 dollars** verrouillés.

⚠️ **Se couvrir peut faire perdre de l'argent — et c'est normal.** Si le cours tombe à 1,3000, ImportCo aurait payé 13 000 000 dollars sans couverture. Hull le dit sans détour : ***le but de la couverture est de réduire le risque. Rien ne garantit que le résultat avec couverture soit meilleur que sans***.

**Par option.** Un investisseur détient 1 000 actions Microsoft à 28 dollars et craint une baisse sur 2 mois.

*Étape 1.* Il achète **10 contrats** de puts juillet, $K=27{,}50$, prime cotée **1 dollars**. *Étape 2.* Coût : $100\times1=100$ dollars par contrat → $10\times100=\mathbf{1\,000}$ dollars. *Étape 3.* Le droit : vendre 1 000 actions à 27,50 dollars → **27 500 dollars** garantis. *Étape 4.* Si le cours passe sous 27,50 : exercice → 27 500 dollars encaissés, soit **26 500 dollars** net de la prime. *Étape 5.* Si le cours reste au-dessus : les puts expirent sans valeur, mais le portefeuille vaut **plus** de 27 500 dollars (plus de 26 500 dollars net).

> **La différence de nature.** Le forward **neutralise** le risque en fixant le prix. L'option est une **assurance** : elle protège contre les mouvements défavorables **tout en laissant profiter** des mouvements favorables — au prix d'une **prime payée d'avance**.

### 5.2 Spéculation — le levier

**Avec futures.** Un spéculateur croit à un renforcement de la livre et engage £250 000. Spot $=1{,}4470$, futures avril $=1{,}4410$, contrat $=£62\,500$ → **4 contrats**, marge initiale $5\,000$ dollars/contrat.

|  | Acheter £250 000 au comptant | Acheter 4 contrats futures |
|---|---|---|
| **Investissement** | $250\,000\times1{,}4470=\mathbf{361\,750}$ dollars | marge : $\mathbf{20\,000}$ dollars |
| Profit si spot avril $=1{,}5000$ | $(1{,}5000-1{,}4470)\times250\,000=13\,250$ dollars | $(1{,}5000-1{,}4410)\times250\,000=\mathbf{14\,750}$ dollars |
| Profit si spot avril $=1{,}4000$ | $-11\,750$ dollars | $-\mathbf{10\,250}$ dollars |

⚠️ **Le comptant paraît légèrement moins bon dans les deux scénarios — c'est un artefact.** Hull précise : *ces calculs ne reflètent pas les intérêts perçus ou payés*. La **vraie** différence est ailleurs : **361 750 dollars immobilisés contre 20 000 dollars**. C'est cela, le levier.

**Avec options.** Action à 20 dollars, call 2 mois $K=22{,}50$ à **1 dollars**, budget **2 000 dollars**.

| Cours en décembre | Acheter 100 actions | Acheter 2 000 calls |
|---|---|---|
| **27 dollars** | $100\times(27-20)=+700$ dollars | payoff $2\,000\times4{,}50=9\,000$ → **+7 000 dollars** |
| **15 dollars** | $100\times(20-15)=-500$ dollars | **−2 000 dollars** (prime perdue) |

La stratégie optionnelle est **10 fois plus profitable** dans le bon scénario, et perd **tout** dans le mauvais. *Les options, comme les futures, offrent un levier : pour un investissement donné, elles amplifient les conséquences financières. Les bons résultats deviennent très bons, les mauvais font perdre la totalité de la mise.*

> **La différence futures / options pour le spéculateur.** Avec des futures, la perte **et** le gain potentiels sont **très grands**. Avec des options, quelle que soit la gravité du scénario, la perte est **limitée au montant payé**.

### 5.3 Arbitrage

Une action cote **140 dollars** à New York et **£100** à Londres, taux **1,4300 dollars/£**.

$$\text{Profit}=100\times\big[(1{,}43\times100)-140\big]=100\times(143-140)=\mathbf{300\ dollars}$$

hors coûts de transaction. *Une grande banque d'investissement fait face à des coûts très faibles sur les deux marchés : elle trouvera l'opportunité très attractive.*

⚠️ **Ces opportunités ne durent pas.** Les achats à New York font monter le prix en dollars, les ventes à Londres font baisser le prix en livres ; les deux prix s'égalisent **très vite**. C'est pourquoi :

> ***Dans ce livre, la plupart des raisonnements sur les prix des forwards, des futures et des options reposent sur l'hypothèse qu'il n'existe pas d'opportunité d'arbitrage.***

C'est l'**axiome unique** de toute la valorisation : il donnera l'arbre binomial (ch. 12), Black-Scholes (ch. 14) et les mesures martingales (ch. 27).

## 🟠 Concept 6 — Les dangers

**Le mécanisme.** *Parfois, des traders mandatés pour couvrir un risque ou suivre une stratégie d'arbitrage deviennent (consciemment ou non) des spéculateurs. Les résultats peuvent être désastreux.*

| Cas | Année | Mandat officiel | Réalité | Perte |
|---|---|---|---|---|
| **Jérôme Kerviel**, Société Générale | 2008 | arbitrage d'indices (Delta One : DAX, CAC 40, Euro Stoxx 50) | positions directionnelles couvertes par des **transactions fictives**, exposition à des **dizaines de milliards** d'euros | **4,9 Md €** |
| **Nick Leeson**, Barings | années 1990 | arbitrage Nikkei 225 entre Singapour et Osaka | paris directionnels par futures et options | **1 Md dollars** — banque de 200 ans détruite |
| **John Rusnak**, Allied Irish Bank | 2002 | — | change non autorisé | **700 M dollars** |

**Lehman Brothers, 15 septembre 2008** — la plus grosse faillite de l'histoire américaine. Combinaison de **fort levier, investissements risqués et problèmes de liquidité** : banque d'investissement non soumise aux exigences de capital des banques de dépôt, ratio de levier **31:1** en 2007 — *une baisse de 3 à 4 % de la valeur des actifs suffisait à effacer les fonds propres*. Le *Chief Risk Officer* était compétent mais sans influence, et fut retiré du comité exécutif en 2007. Financement par **dette courte** : quand la confiance s'est perdue, les prêteurs ont refusé de renouveler. Sur le marché OTC : **des centaines de milliers de transactions** avec environ **8 000 contreparties**, et des collatéraux réutilisés — *démêler qui doit quoi à qui dans ce type de situation est un cauchemar*.

> **Les deux questions que Hull tire de la crise :** une institution financière devrait toujours se demander froidement ***« Qu'est-ce qui peut mal tourner ? »***, puis ***« Si cela tourne mal, combien perdons-nous ? »***

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Ce qu'on demande | Outil |
|---|---|---|
| « gagne ou perd combien si le cours finit à… » | **payoff** d'un forward/futures | $S_T-K$ ou $K-S_T$, ×taille |
| « le contrat porte sur 100 actions », un prix d'option est donné | **profit** d'une option | payoff − prime (ou + prime si vendeur) |
| Une obligation dont le remboursement dépend d'un prix | **décomposition** | obligation + portefeuille d'options |
| « je veux au moins X et j'accepte au plus Y » | **tunnel** (*range forward*) | achat de put $K=X$ + vente de call $K=Y$ |
| Deux prix pour le même actif sur deux marchés | **arbitrage** | acheter le moins cher, vendre le plus cher, convertir |
| « quel doit être le prix forward ? » | **absence d'arbitrage** | $F_0=S_0e^{rT}$ (ou capitalisation simple) |

## Comment résoudre ce type d'exercice

**Protocole payoff / profit — 5 étapes.**

1. Identifier la **position** : long ou short, et sur quel instrument.
2. Écrire le **payoff unitaire** ($S_T-K$, $K-S_T$, $\max(S_T-K,0)$, $\max(K-S_T,0)$).
3. Multiplier par la **taille** du contrat (100 actions, £62 500, 50 000 livres de coton…).
4. Retrancher la **prime** payée (ou l'ajouter si l'on est vendeur). **Rien à retrancher** pour un forward/futures.
5. Vérifier le **signe** en testant un cas extrême évident.

**Protocole décomposition d'un produit structuré — 4 étapes.**

1. Écrire le payoff **complet** en fonction de la variable de marché.
2. Isoler la partie **constante** → c'est l'**obligation** ordinaire.
3. Chaque terme en $\max(0,\cdot)$ est une **option** : signe positif → position **longue**, signe négatif → position **courte**.
4. Vérifier aux **points de rupture** (là où le payoff change de pente) que la somme reproduit l'énoncé.

<details class="details--riche">
<summary>

**Exercice résolu A — l'ICON de Bankers Trust (exercice 1.23)**

</summary>

**Énoncé.** Obligation sans intérêt. Si le taux yen/dollar $S_T>169$ à maturité, le porteur reçoit **1 000 dollars**. Sinon il reçoit

$$1\,000-\max\!\left(0,\ 1\,000\left(\frac{169}{S_T}-1\right)\right)$$

Quand le taux passe sous **84,5**, le porteur ne reçoit **rien**. Montrer que c'est une obligation ordinaire plus deux options.

*Étape 1 — repérer l'incohérence apparente.* La formule donnée deviendrait **négative** sous 84,5 : à $S_T=50$, $169/50=3{,}38$ donc $1\,000-1\,000(2{,}38)=-1\,380$. Or l'énoncé dit « rien ». Il **manque donc un terme** qui neutralise la formule à partir de 84,5.

*Étape 2 — trouver le seuil.* Le payoff s'annule quand $1\,000\left(\frac{169}{S_T}-1\right)=1\,000$, soit $\frac{169}{S_T}=2$, soit $S_T=84{,}5$. **Le second seuil est exactement le point où le premier terme a mangé tout le principal.**

*Étape 3 — écrire le payoff complet.*

$$P=1\,000-\max\!\left(0,1\,000\left(\tfrac{169}{S_T}-1\right)\right)+\max\!\left(0,1\,000\left(\tfrac{169}{S_T}-2\right)\right)$$

Vérification à $S_T=50$ : $1\,000-2\,380+1\,380=0$ ; à $S_T=84{,}5$ : $1\,000-1\,000+0=0$ ; à $S_T=200$ : $1\,000-0+0=1\,000$ .

*Étape 4 — passer à la variable naturelle.* Posons $X=1/S_T$ (dollars par yen). Alors

$$1\,000\left(\frac{169}{S_T}-1\right)=169\,000\left(X-\frac1{169}\right),\qquad 1\,000\left(\frac{169}{S_T}-2\right)=169\,000\left(X-\frac1{84{,}5}\right)$$

*Étape 5 — lire la décomposition.*

$$\boxed{P=\underbrace{1\,000}_{\text{obligation}}-\underbrace{169\,000\max\!\left(0,X-\tfrac1{169}\right)}_{\text{169 000 calls VENDUS},\ K=1/169}+\underbrace{169\,000\max\!\left(0,X-\tfrac1{84{,}5}\right)}_{\text{169 000 calls ACHETÉS},\ K=1/84{,}5}}$$

**Lecture.** Le porteur a acheté une obligation **et vendu un spread de calls** sur le yen. C'est ce qui rend le produit dangereux : il **plafonne** son gain à 1 000 dollars et peut tout perdre.

</details>

<details class="details--riche">
<summary>

**Exercice résolu B — l'obligation Standard Oil (exercice 1.33)**

</summary>

**Énoncé.** Pas d'intérêt. À maturité : **1 000 dollars** plus $170\times$ l'excédent (s'il existe) du baril au-dessus de **25 dollars**. Supplément **plafonné à 2 550 dollars**.

*Étape 1 — écrire la partie variable.* Supplément $=170\max(0,P_T-25)$ : c'est **170 calls achetés** de strike 25. *Étape 2 — traduire le plafond en prix.* $170\times(P^\ast-25)=2\,550\Rightarrow P^\ast-25=15\Rightarrow P^\ast=\mathbf{40}$ dollars. *Étape 3 — modéliser le plafond.* Au-delà de 40 dollars, tout gain supplémentaire est **abandonné** : c'est exactement **170 calls vendus** de strike 40. *Étape 4 — assembler et vérifier.*

$$\boxed{P=1\,000+170\max(0,P_T-25)-170\max(0,P_T-40)}$$

$P_T=20$ : $1\,000$ · $P_T=30$ : $1\,000+850=1\,850$ · $P_T=60$ : $1\,000+5\,950-3\,400=3\,550=1\,000+2\,550$ .

**Le motif à mémoriser.** Un **plafond** sur un payoff croissant = **vente d'un call** au niveau du plafond. Un **plancher** = **achat d'un put**. C'est la brique de lecture de tout produit structuré.

</details>

<details class="details--riche">
<summary>

**Exercice résolu C — le tunnel du trésorier (exercice 1.34)**

</summary>

**Énoncé.** « J'aurai £1 M à vendre dans 6 mois. Si le cours est inférieur à **1,41**, donnez-moi 1,41. S'il est supérieur à **1,47**, j'accepte 1,47. Entre les deux, je vends au cours du marché. »

*Étape 1 — la position naturelle.* Le trésorier est **long en livres** : il craint la **baisse** du cours. *Étape 2 — le plancher.* « Au moins 1,41 » = droit de **vendre** à 1,41 = **achat d'un put** de strike 1,41 sur £1 M. *Étape 3 — le plafond.* « J'accepte 1,47 au maximum » = il **renonce** au-delà = **vente d'un call** de strike 1,47 sur £1 M. *Étape 4 — la structure.*

$$\boxed{\text{acheter un put }K=1{,}41\ +\ \text{vendre un call }K=1{,}47\quad(\text{sur £1 M})}$$

*Étape 5 — l'intérêt économique.* La prime **reçue** sur le call finance la prime **payée** sur le put. Si les deux se compensent exactement, le tunnel est **gratuit** — c'est le *zero-cost collar*, la couverture de change la plus vendue aux entreprises.

</details>

<details class="details--riche">
<summary>

**Exercice résolu D — arbitrage spot/forward avec option (exercice 1.25)**

</summary>

**Énoncé.** Spot $=1{,}4580$ ; forward 90 jours $=1{,}4556$ ; forward 180 jours $=1{,}4518$. (a) Un call européen 180 jours d'achat de £1 à **1,42 dollars** coûte **2 cents**. (b) Un put européen 90 jours de vente de £1 à **1,49 dollars** coûte **2 cents**.

*Étape 1 — cas (a), tester si l'option est trop bon marché.* Le call permet d'acheter la livre à 1,42. Le forward 180 jours permet de la vendre à **1,4518**. *Étape 2 — verrouiller.* Acheter le call (coût 0,02) **et** vendre à terme 180 jours à 1,4518. *Étape 3 — le pire cas.* Si $S_T>1{,}42$ : on exerce, on achète à 1,42, on livre à 1,4518 → $1{,}4518-1{,}42-0{,}02=\mathbf{+0{,}0118}$ dollars par livre. *Étape 4 — l'autre cas.* Si $S_T<1{,}42$ : on n'exerce pas, on achète au comptant à $S_T<1{,}42$ et on livre à 1,4518 → gain **encore plus grand**. Profit minimum garanti : **1,18 cent par livre**. *Étape 5 — cas (b), symétrique.* Le put permet de vendre à 1,49 ; le forward 90 jours permet d'acheter à **1,4556**. Acheter le put et acheter à terme : $1{,}49-1{,}4556-0{,}02=\mathbf{+0{,}0144}$ dollars par livre si $S_T<1{,}49$, davantage sinon.

**Le principe.** Un arbitrage option/forward se détecte en comparant le **strike** au **prix à terme**, prime comprise. Si l'option est *dans la monnaie par rapport au forward* de plus que sa prime, l'arbitrage existe.

</details>

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Retrancher une « prime » d'un payoff de forward | Entrer dans un forward **ne coûte rien** : payoff = profit |
| Oublier de multiplier par 100 pour une option sur actions US | Un **contrat** = **100 actions** |
| Utiliser le **bid** quand on achète | On achète au **offer**, on vend au **bid** |
| Confondre nominal et valeur d'un contrat OTC | 614,7 Md USD de nominal contre **21,6** Md USD de valeur brute |
| Croire qu'américain/européen désigne un lieu | Ce sont des **modalités d'exercice** |
| Croire que se couvrir garantit un meilleur résultat | La couverture **réduit le risque**, sans promesse de gain |
| Dire que le levier des futures vient d'un meilleur prix | Il vient de la **marge** : 20 000 dollars au lieu de 361 750 dollars |
| Traiter un plafond de payoff comme une simple troncature | C'est un **call vendu** au niveau du plafond |
| Oublier que la perte du vendeur d'option est illimitée | Le vendeur de call **nu** a une perte **non bornée** |
| Confondre « pas d'arbitrage » et « marché efficient » | L'absence d'arbitrage est **plus faible** — et suffit à tout valoriser |

## 📌 Ultimate Review

**Les payoffs, à connaître par cœur.**

| Instrument | Position longue | Position courte |
|---|---|---|
| Forward / futures | $S_T-K$ | $K-S_T$ |
| Call | $\max(S_T-K,0)$ | $-\max(S_T-K,0)$ |
| Put | $\max(K-S_T,0)$ | $-\max(K-S_T,0)$ |

**Profit = payoff − prime payée** (acheteur) · **= prime reçue + payoff** (vendeur, payoff négatif ou nul).

**Les chiffres à retenir.** CBOT 1848 · CME 1919 · CBOE 1973 (16 actions), puts 1977 · OTC déc. 2009 : **614,7** Md USD nominal, **21,6** Md USD valeur brute · bourses : **73,1** Md USD · levier Lehman **31:1** · Kerviel **4,9 Md €** · Leeson **1 Md dollars** · Rusnak **700 M dollars**.

**Les trois intervenants.** Hedger (réduit) · spéculateur (parie, avec levier) · arbitragiste (verrouille, sans risque).

**Les deux briques de lecture d'un produit structuré.** Plafond = **call vendu** · plancher = **put acheté**.

**L'axiome.** *Il n'existe pas d'opportunité d'arbitrage.* Tout le reste du livre en découle.

## 🧠 Active Recall

<details><summary>Donner la définition exacte d'un dérivé selon Hull.</summary>

Un **instrument financier dont la valeur dépend de (dérive de) la valeur d'autres variables sous-jacentes, plus élémentaires**. Le plus souvent ces variables sont des prix d'actifs négociés, mais **presque n'importe quelle variable** convient — Hull cite le prix du porc et la neige tombée sur une station de ski.

</details>

<details><summary>Quelle est la différence de fond entre un forward et un futures ?</summary>

**Économiquement, aucune** : les deux sont un accord d'acheter ou vendre un actif à une date future pour un prix donné. **Institutionnellement, tout** : le futures est **coté en bourse**, donc **standardisé** (quantité, qualité, échéances) et **garanti** par la chambre de compensation ; le forward est **de gré à gré**, donc sur mesure mais porteur d'un **risque de crédit**.

</details>

<details><summary>Pourquoi le prix forward à 1 an d'une action à 60 dollars (taux 5 %) doit-il valoir 63 dollars ?</summary>

Par **arbitrage bilatéral**. Si $F>63$, disons 67 : emprunter 60, acheter l'action, la vendre à terme 67 ; rembourser $60\times1{,}05=63$ → **+4 dollars sans risque**. Si $F<63$, disons 58 : un détenteur vend son action 60, place le produit à 5 % (+3), et rachète à terme à 58 → il finit **5 dollars mieux** qu'en gardant l'action. Seul $F=63$ ne laisse aucune des deux stratégies profitable.

</details>

<details class="details--riche">
<summary>

Un investisseur vend un contrat de puts Google septembre $K=480$ au bid 22,20. L'action finit à 420. Calculer son résultat.

</summary>

*Encaissement initial* : $100\times22{,}20=2\,220$ dollars. *Exercice* : il doit acheter 100 actions à 480 alors qu'elles valent 420 → $100\times(480-420)=6\,000$ dollars de perte brute. *Résultat net* : $2\,220-6\,000=\mathbf{-3\,780}$ dollars.

</details>

<details><summary>Pourquoi Hull dit-il que le comptant « semble » moins bon que les futures dans l'exemple de spéculation sur la livre ?</summary>

Parce que la comparaison brute donne $13\,250$ contre $14\,750$ (hausse) et $-11\,750$ contre $-10\,250$ (baisse) — mais **les calculs ne reflètent ni les intérêts perçus ni ceux payés**. L'écart des payoffs vient uniquement de l'écart entre spot (1,4470) et futures (1,4410). **La vraie différence est le capital immobilisé** : 361 750 dollars contre 20 000 dollars de marge. C'est **cela**, le levier.

</details>

<details><summary>Un produit paie un bonus croissant plafonné. Quelle est sa décomposition générique ?</summary>

$$\text{obligation}+n\times\text{call acheté }(K=\text{seuil de départ})-n\times\text{call vendu }(K=\text{seuil du plafond})$$

Le strike du call vendu se calcule en résolvant $n(K_2-K_1)=\text{plafond}$. C'est exactement l'obligation Standard Oil : $170(40-25)=2\,550$ .

</details>

<details><summary>Quel est le rôle logique de l'hypothèse d'absence d'arbitrage dans le livre ?</summary>

C'est l'**axiome unique** de la valorisation. Hull l'énonce ainsi : *dans ce livre, la plupart des raisonnements sur les prix des forwards, des futures et des options reposent sur l'hypothèse qu'il n'existe pas d'opportunité d'arbitrage*. Elle est **empiriquement justifiée** : l'existence même d'arbitragistes affamés de profit fait qu'on n'observe en pratique que de **très petites** opportunités. Elle produira l'arbre binomial (ch. 12), l'EDP de Black-Scholes (ch. 14) et les mesures martingales (ch. 27).

</details>

<details><summary>Quelle leçon Hull tire-t-il de l'affaire Kerviel ?</summary>

Que la **polyvalence** des dérivés est aussi leur danger : *des traders mandatés pour couvrir ou arbitrer deviennent, consciemment ou non, des spéculateurs*. Kerviel était mandaté pour arbitrer des indices (Delta One) et a construit des **transactions fictives** pour faire croire qu'il était couvert. Remède : **limites de risque non ambiguës** et **suivi quotidien** de leur respect.

</details>

<details><summary>Quelles étaient les trois causes de la faillite de Lehman ?</summary>

**Fort levier** (ratio **31:1** en 2007 — une baisse de 3 à 4 % des actifs effaçait les fonds propres, la banque d'investissement n'étant pas soumise aux exigences de capital des banques de dépôt), **investissements risqués** (grosses positions sur les instruments issus des subprimes), et **problèmes de liquidité** (financement par **dette courte** que les prêteurs ont refusé de renouveler).

</details>

<details><summary>Pourquoi la perte du détenteur d'une option est-elle toujours bornée, mais pas celle du vendeur ?</summary>

Parce que l'option est un **droit** : au pire, le détenteur ne l'exerce pas et perd **exactement la prime**. Le vendeur a l'**obligation** symétrique : son gain est plafonné à la prime encaissée, mais sa perte suit le sous-jacent — non bornée pour un **call nu** (le cours peut monter indéfiniment), bornée à $100\times K$ pour un put.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Définition d'un dérivé ? | Instrument dont la **valeur dérive** d'une variable sous-jacente |
| Payoff d'un forward long ? | $S_T-K$ |
| Payoff d'un forward court ? | $K-S_T$ |
| Coût d'entrée dans un forward ? | **Zéro** |
| Payoff d'un call ? | $\max(S_T-K,0)$ |
| Payoff d'un put ? | $\max(K-S_T,0)$ |
| Option américaine ? | Exerçable **à tout moment** jusqu'à l'échéance |
| Option européenne ? | Exerçable **seulement à l'échéance** |
| « Écrire » une option ? | La **vendre** |
| Taille d'un contrat d'option sur actions US ? | **100 actions** |
| On achète au… / on vend au… | **offer** / **bid** |
| Fondation du CBOT ? | **1848** |
| Ouverture du CBOE ? | **1973**, calls sur **16** actions |
| Arrivée des puts au CBOE ? | **1977** |
| Nominal OTC en déc. 2009 ? | **614,7** mille milliards dollars |
| Nominal des marchés organisés ? | **73,1** mille milliards dollars |
| Valeur de marché brute de l'OTC ? | **21,6** mille milliards dollars |
| Trois catégories d'intervenants ? | **Hedgers, spéculateurs, arbitragistes** |
| Frais typiques d'un hedge fund ? | **1–2 %** des encours **+ 20 %** des profits |
| Que garantit une couverture ? | La **réduction du risque**, pas un meilleur résultat |
| Différence forward/option en couverture ? | Le forward **fixe** le prix, l'option **assure** contre le mauvais côté |
| Origine du levier des futures ? | La **marge** (20 000 dollars pour 361 750 dollars d'exposition) |
| Perte maximale de l'acheteur d'option ? | La **prime** |
| Perte maximale du vendeur de call nu ? | **Non bornée** |
| Gain d'arbitrage NY/Londres (140 dollars, £100, 1,43) ? | $100\times(143-140)=\mathbf{300}$ dollars |
| Traduction d'un **plafond** de payoff ? | **Call vendu** au niveau du plafond |
| Traduction d'un **plancher** de payoff ? | **Put acheté** au niveau du plancher |
| Décomposition de l'obligation Standard Oil ? | Obligation + **170 calls** $K=25$ − **170 calls** $K=40$ |
| Structure « au moins 1,41, au plus 1,47 » ? | **Put acheté** 1,41 + **call vendu** 1,47 (*collar*) |
| Perte de Kerviel ? | **4,9 milliards d'euros** (2008) |
| Perte de Leeson chez Barings ? | **1 milliard dollars** |
| Ratio de levier de Lehman en 2007 ? | **31:1** |
| Nombre de contreparties OTC de Lehman ? | Environ **8 000** |
| L'axiome de tout le livre ? | **Pas d'opportunité d'arbitrage** |
| Les deux questions post-crise de Hull ? | *Qu'est-ce qui peut mal tourner ?* · *Combien perdons-nous ?* |
