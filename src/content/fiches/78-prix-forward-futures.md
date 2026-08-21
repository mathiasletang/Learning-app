# Fiche 78 — Détermination des prix forward et futures

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 5 « Determination of Forward and Futures Prices » |
| **Difficulté** | Must know — le chapitre d'arbitrage le plus rentable du livre |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiches 74, 75, 77 |
| **Concepts clés** | Actif d'investissement vs de consommation, vente à découvert, $F_0=S_0e^{rT}$, revenu connu, rendement connu, valorisation d'un forward, indices, parité des taux d'intérêt, coûts de stockage, rendement de commodité, coût de portage, options de livraison, *normal backwardation* et *contango* |
| **Poids à l'examen** | Les **cinq formules** de prix · la **valeur** $f=(F_0-K)e^{-rT}$ · construire **explicitement** l'arbitrage dans les deux sens · savoir **pourquoi** l'égalité devient une inégalité pour un actif de consommation. |

## 🎯 Vue d'ensemble

```
INVESTISSEMENT   arbitrage possible dans LES DEUX SENS  →  ÉGALITÉ
CONSOMMATION     arbitrage possible dans UN SEUL SENS   →  INÉGALITÉ  F₀ ≤ (S₀+U)e^{rT}

sans revenu        F₀ = S₀ e^{rT}
revenu connu I     F₀ = (S₀ − I) e^{rT}          stockage connu U : F₀ = (S₀ + U) e^{rT}
rendement q        F₀ = S₀ e^{(r−q)T}            stockage u :       F₀ = S₀ e^{(r+u)T}
indice             F₀ = S₀ e^{(r−q)T}            devise :           F₀ = S₀ e^{(r−r_f)T}
consommation       F₀ = S₀ e^{(r+u−y)T}          y = rendement de commodité

VALEUR    f = (F₀ − K) e^{−rT}      PORTAGE   c = r − revenu + stockage   →   F₀ = S₀e^{(c−y)T}
```

**La logique unique.** Toutes ces formules sont **la même** : le prix forward est le prix comptant **porté jusqu'à l'échéance**, augmenté de ce que coûte la détention et diminué de ce qu'elle rapporte. La seule question est de savoir **si l'arbitrage fonctionne dans les deux sens**.

## 🔴 Concept 1 — Actif d'investissement contre actif de consommation

|  | **Actif d'investissement** | **Actif de consommation** |
|---|---|---|
| Définition | *détenu à des fins d'investissement par un **nombre significatif** d'investisseurs* | *détenu principalement pour la **consommation***, pas pour l'investissement |
| Exemples | actions, obligations, **or**, **argent** | **cuivre**, **pétrole**, poitrines de porc |
| Conséquence | on **peut** déterminer $F_0$ par arbitrage à partir de $S_0$ | on ne le peut **pas** — seulement une **borne** |

⚠️ **La nuance essentielle.** *Les actifs d'investissement n'ont pas à être détenus exclusivement pour l'investissement.* L'argent a de nombreux usages industriels — il suffit qu'un nombre significatif d'investisseurs le détiennent **uniquement pour l'investissement**, et qu'ils soient **prêts à vendre leur stock pour prendre une position longue en forward** si celle-ci est plus attractive. C'est **cette disponibilité à substituer** qui fait tout.

## 🟡 Concept 2 — La vente à découvert

**Le mécanisme.** L'investisseur ordonne de vendre 500 actions IBM à découvert ; le courtier **emprunte** les titres à un autre client et les vend normalement. La position peut durer *tant qu'il y a des titres à emprunter*. Pour la dénouer, l'investisseur **rachète** 500 IBM, qui retournent au compte prêteur.

⚠️ **Le risque de rappel.** *Si à un moment le courtier ne parvient plus à emprunter de titres, l'investisseur est forcé de dénouer sa position, même s'il n'y est pas prêt.* Un **frais de prêt** est parfois facturé.

⚠️ **Le vendeur à découvert doit reverser tout revenu.** *Un investisseur en position courte doit payer au courtier tout revenu — dividendes ou intérêts — qui serait normalement perçu sur les titres shortés.* Le courtier le transfère au client prêteur.

<details class="details--riche">
<summary>

**Exercice résolu — le miroir exact (tableau 5.1)**

</summary>

**Situation.** Short de 500 actions en **avril** à **120**, dénoué en **juillet** à **100**. Dividende de **1 par action** payé en **mai**. Pas de frais d'emprunt.

*Étape 1 — encaissement initial.* $500\times120=\mathbf{+60\,000}$ en avril. *Étape 2 — le dividende.* $500\times1=\mathbf{-500}$ en mai — **payé**, pas reçu. *Étape 3 — le rachat.* $500\times100=\mathbf{-50\,000}$ en juillet. *Étape 4 — le gain net.* $60\,000-500-50\,000=\mathbf{+9\,500}$.

**Le miroir.** Achat des mêmes actions en avril : $-60\,000$ ; dividende **reçu** $+500$ ; revente $+50\,000$ → **perte de 9 500**. *Les flux d'une vente à découvert sont l'image miroir des flux d'un achat* (toujours en l'absence de frais d'emprunt).

</details>

**La marge.** L'investisseur doit tenir un **compte de marge** — espèces ou titres négociables — *pour garantir qu'il ne s'échappera pas si le cours monte*. Marge initiale, puis marge additionnelle en cas de **hausse** du cours shorté ; à défaut, **liquidation**.

> ⚠️ **La marge n'est pas un coût.** *Des intérêts sont habituellement versés sur le solde, et si le taux offert est inacceptable, des titres négociables comme des bons du Trésor peuvent servir à satisfaire l'exigence. **Le produit de la vente appartient à l'investisseur et constitue normalement une partie de la marge initiale**.*

**La réglementation, en trois dates.** **1938** : la ***uptick rule*** — shorter uniquement sur une **hausse** du dernier mouvement de cours. **Juillet 2007** : la SEC l'abolit. **Février 2010** : ***alternative uptick rule*** — quand une action a **baissé de plus de 10 % en un jour**, le short n'est possible **ce jour-là et le lendemain** qu'à un prix **supérieur au meilleur cours acheteur**. Des **interdictions temporaires** ont eu lieu dans plusieurs pays en **2008**, *le short étant considéré comme contribuant à la forte volatilité*.

## 🔴 Concept 3 — Hypothèses, notation, et le résultat fondamental

**Les quatre hypothèses** — vraies pour **certains** participants seulement :

1. **aucun coût de transaction** ;
2. **même taux d'imposition** sur tous les profits nets ;
3. emprunt et prêt au **même taux sans risque** ;
4. ils **exploitent les opportunités d'arbitrage** dès qu'elles apparaissent.

> ⚠️ **Ce point est capital et souvent mal compris.** *Nous n'exigeons pas que ces hypothèses soient vraies pour **tous** les participants. Il suffit qu'elles soient vraies — ou au moins approximativement vraies — pour **quelques participants clés**, tels que les grands teneurs de marché de dérivés. **Ce sont leurs activités de négociation et leur empressement à saisir les arbitrages qui déterminent la relation entre prix forward et prix comptant.***

| Symbole | Sens |
|---|---|
| $T$ | temps jusqu'à la livraison (en années) |
| $S_0$ | prix **aujourd'hui** de l'actif sous-jacent |
| $F_0$ | prix forward ou futures **aujourd'hui** |
| $r$ | taux zéro-coupon sans risque annuel, **continu**, pour un placement échéant à la date de livraison |

### 3.1 Actif sans revenu

<details class="details--riche">
<summary>

**La construction de l'arbitrage dans les deux sens (tableau 5.2)**

</summary>

**Données.** Action sans dividende à **40**, taux 3 mois **5 %**, forward 3 mois.

**Le prix d'équilibre.** $40e^{0{,}05\times0{,}25}=\mathbf{40{,}50}$.

**Cas A — le forward est trop cher (43).** *Étape 1.* Emprunter **40** à 5 % pour 3 mois. *Étape 2.* Acheter **une action**. *Étape 3.* Vendre à terme une action à **43**. *Étape 4 (dans 3 mois).* Livrer l'action, recevoir **43**. *Étape 5.* Rembourser $40e^{0{,}05\times0{,}25}=\mathbf{40{,}50}$. *Étape 6.* **Profit verrouillé : $43{,}00-40{,}50=\mathbf{2{,}50}$.**

**Cas B — le forward est trop bas (39).** *Étape 1.* **Shorter** une action → encaisser **40**. *Étape 2.* Placer 40 à 5 % pour 3 mois. *Étape 3.* Acheter à terme une action à **39**. *Étape 4 (dans 3 mois).* Le placement vaut **40,50**. *Étape 5.* Payer **39**, prendre livraison, rendre l'action pour fermer le short. *Étape 6.* **Profit : $40{,}50-39{,}00=\mathbf{1{,}50}$.**

**La conclusion.** Le premier arbitrage marche dès que $F_0>40{,}50$, le second dès que $F_0<40{,}50$. *Nous en déduisons que, pour qu'il n'y ait pas d'arbitrage, le prix forward doit être **exactement** 40,50.*

</details>

$$\boxed{F_0=S_0e^{rT}}\;\text{(5.1)}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi $F_0>S_0$ ?</span>

*Un forward long et un achat comptant conduisent tous deux à détenir l'actif en $T$. Le prix forward est plus élevé que le prix comptant **à cause du coût de financement de l'achat comptant** pendant la vie du contrat.*

</div>

⚠️ **Ce point a été oublié par Kidder Peabody en 1994 — à ses dépens.** Joseph Jett achetait des ***strips*** (zéro-coupon créés en vendant séparément chaque flux d'une obligation du Trésor) et les vendait à terme. Comme (5.1) le montre, le prix forward d'un titre **sans revenu** est **toujours** supérieur au comptant : à 4 % sur 3 mois, un strip à 70 a un forward de $70e^{0{,}04\times0{,}25}=\mathbf{70{,}70}$. **Le système informatique de Kidder Peabody enregistrait un profit égal à cet écart (0,70) sur chaque opération.** *En réalité ce profit n'était rien d'autre que le coût de financement de l'achat du strip. Mais en roulant ses contrats, Jett empêchait ce coût de lui être imputé.* Résultat : un profit affiché de **100 millions** (et un gros bonus pour Jett) alors qu'il y avait en réalité une **perte de l'ordre de 350 millions**. *Cela montre que même de grandes institutions financières peuvent se tromper sur des choses relativement simples !*

**Et si la vente à découvert est impossible ?** *Cela ne change rien.* Il n'est **pas nécessaire de pouvoir shorter** : il suffit *qu'un nombre significatif de personnes détiennent l'actif purement pour l'investissement* — ce qui est **vrai par définition** d'un actif d'investissement. Si le forward est trop bas, **ils vendront leur actif et prendront une position longue en forward**, améliorant leur situation de $S_0e^{rT}-F_0$.

<details class="details--riche">
<summary>

**Exercice résolu — forward sur zéro-coupon (exemple 5.1)**

</summary>

**Énoncé.** Forward **4 mois** pour acheter une obligation zéro-coupon échéant dans **1 an** (donc **8 mois** restants à la maturité du forward). Prix actuel **930**. Taux sans risque 4 mois continu **6 %**.

*Étape 1 — classer l'actif.* Un zéro-coupon **ne verse aucun revenu** → formule (5.1). *Étape 2 — les paramètres.* $S_0=930$, $r=0{,}06$, $T=4/12$. *Étape 3 — calculer.* $F_0=930\,e^{0{,}06\times4/12}=930\times1{,}020201=\mathbf{948{,}79}$. *Étape 4 — interpréter.* **Ce serait le prix de livraison d'un contrat négocié aujourd'hui.**

⚠️ **Le piège de maturité.** $T$ est la maturité **du forward** (4 mois), **pas** celle de l'obligation (12 mois). Les 8 mois restants sont **déjà** dans le prix comptant de 930.

</details>

### 3.2 Revenu connu en montant

$$\boxed{F_0=(S_0-I)e^{rT}}\;\text{(5.2)}$$

où $I$ est la **valeur actuelle** de tout le revenu versé pendant la vie du contrat. *Exemples : actions à dividendes connus, obligations à coupon.*

<details class="details--riche">
<summary>

**Exercice résolu — l'obligation à coupon (tableau 5.3)**

</summary>

**Données.** Obligation à **900**, forward **9 mois**, coupon de **40** attendu dans **4 mois**. Taux continus : **3 %** à 4 mois, **4 %** à 9 mois.

*Étape 1 — actualiser le revenu.* $I=40e^{-0{,}03\times4/12}=\mathbf{39{,}60}$. *Étape 2 — le prix d'équilibre.* $F_0=(900-39{,}60)e^{0{,}04\times0{,}75}=860{,}40\times1{,}030455=\mathbf{886{,}60}$.

**Cas A — forward trop cher (910).** *Étape 3.* Emprunter 900 **en deux tranches** : **39,60** à 3 % pour 4 mois (elle sera remboursée **par le coupon**) et **860,40** à 4 % pour 9 mois. *Étape 4.* Acheter l'obligation, vendre à terme à 910. *Étape 5 (4 mois).* Encaisser le coupon de 40, rembourser la première tranche ($39{,}60e^{0{,}01}=40$) — **exactement**. *Étape 6 (9 mois).* Livrer l'obligation contre **910**, rembourser $860{,}40e^{0{,}03}=\mathbf{886{,}60}$. *Étape 7.* **Profit : $910-886{,}60=\mathbf{23{,}40}$.**

**Cas B — forward trop bas (870).** *Étape 3'.* Shorter l'obligation → **900**, dont **39,60** placés 4 mois à 3 % et **860,40** placés 9 mois à 4 %. *Étape 4'.* Acheter à terme à 870. *Étape 5' (4 mois).* Le premier placement donne **40**, exactement de quoi **payer le coupon dû** au prêteur du titre. *Étape 6' (9 mois).* Recevoir **886,60**, payer **870**, récupérer le titre, fermer le short. *Étape 7'.* **Profit : $886{,}60-870=\mathbf{16{,}60}$.**

⚠️ **Le geste à retenir.** *Découper l'emprunt (ou le placement) en deux tranches, dont l'une est exactement calibrée pour être annulée par le revenu intermédiaire.* Cette technique isole le revenu et ramène le problème au cas sans revenu.

</details>

### 3.3 Rendement connu en pourcentage

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Le revenu est connu **exprimé en pourcentage du prix de l'actif au moment où il est versé**. Comme les taux, les rendements sont **normalement mesurés en capitalisation continue**, avec **les mêmes formules de conversion** que la section 4.2.

</div>

$$\boxed{F_0=S_0e^{(r-q)T}}\;\text{(5.3)}$$

<details class="details--riche">
<summary>

**Exercice résolu — le piège de la conversion de rendement (exemple 5.3)**

</summary>

**Énoncé.** Forward **6 mois**, l'actif verse **2 % de son prix une fois** pendant les 6 mois. Taux sans risque continu **10 %**. Prix **25**.

*Étape 1 — traduire « 2 % une fois en 6 mois ».* C'est **4 % par an en capitalisation semestrielle**. *Étape 2 — convertir en continu*, par (4.3) : $q=2\ln(1+0{,}04/2)=2\ln(1{,}02)=\mathbf{0{,}0396}$, soit **3,96 %**. *Étape 3 — appliquer (5.3).* $F_0=25e^{(0{,}10-0{,}0396)\times0{,}5}=25e^{0{,}0302}=\mathbf{25{,}77}$.

⚠️ **L'erreur à ne pas commettre.** Utiliser $q=0{,}04$ directement donnerait $25e^{0{,}03}=25{,}76$ — proche ici, mais l'habitude est mauvaise : $r$ et $q$ doivent être **dans la même unité de capitalisation** avant de se soustraire.

</details>

## 🔴 Concept 4 — Valoriser un contrat forward

> **Le cadre.** *La valeur d'un forward au moment où il est conclu est **zéro**. Plus tard, elle peut se révéler positive ou négative.* Les banques doivent le valoriser **chaque jour** (*marking to market*).

| Symbole | Sens |
|---|---|
| $K$ | **prix de livraison** du contrat négocié **autrefois** — il ne change **jamais** |
| $F_0$ | prix forward **qui s'appliquerait si l'on négociait aujourd'hui** — il **change** |
| $f$ | **valeur** aujourd'hui du contrat |

> **À l'origine**, $K$ est fixé égal au prix forward et $f=0$. *Le temps passant, $K$ reste le même (il fait partie de la définition du contrat) mais le prix forward change, et la valeur du contrat devient positive ou négative.*

$$\boxed{f=(F_0-K)e^{-rT}}\;\text{(5.4)}\qquad\text{(long)}\qquad\qquad f=(K-F_0)e^{-rT}\quad\text{(court)}$$

**La démonstration** — la même que pour les FRA (section 4.7). Comparez un forward long de prix $F_0$ et un forward long de prix $K$ : ils ne diffèrent **que** par le montant payé en $T$. Une différence de flux de $F_0-K$ en $T$ vaut $(F_0-K)e^{-rT}$ aujourd'hui. Or le contrat de prix $F_0$ vaut **zéro par définition**. Donc celui de prix $K$ vaut $(F_0-K)e^{-rT}$. **CQFD.**

> **La règle générale, à mémoriser.** *On peut valoriser un forward long en supposant que le prix de l'actif à maturité **égale le prix forward $F_0$**.* Le payoff est alors $F_0-K$, de valeur actuelle $(F_0-K)e^{-rT}$. **C'est le même principe que « supposer les taux forward réalisés » pour les FRA.**

**Les trois formes spécialisées**, en combinant (5.4) avec (5.1), (5.2), (5.3) :

$$f=S_0-Ke^{-rT}\;\text{(5.5)}\qquad f=S_0-I-Ke^{-rT}\;\text{(5.6)}\qquad f=S_0e^{-qT}-Ke^{-rT}\;\text{(5.7)}$$

<details class="details--riche">
<summary>

**Exercice résolu — valoriser un forward en cours de vie (exemple 5.4)**

</summary>

**Énoncé.** Forward long sur action sans dividende, conclu autrefois, **6 mois restants**. Taux **10 %** continu, action à **25**, prix de livraison **24**.

*Étape 1 — le prix forward d'aujourd'hui.* $F_0=25e^{0{,}1\times0{,}5}=\mathbf{26{,}28}$. *Étape 2 — la valeur.* $f=(26{,}28-24)e^{-0{,}1\times0{,}5}=2{,}28\times0{,}95123=\mathbf{2{,}17}$. *Étape 3 — contrôle par (5.5).* $f=25-24e^{-0{,}05}=25-22{,}83=\mathbf{2{,}17}$ — les deux voies coïncident. *Étape 4 — lecture.* Le contrat est **favorable** : il permet d'acheter à 24 ce qui vaudra 26,28 à terme.

</details>

⚠️ **Futures et forwards : le gain n'a pas la même date.** *Quand un prix futures change, le gain est la variation du prix multipliée par la taille de la position, et il est réalisé **presque immédiatement** par le règlement quotidien. Quand un prix forward change, le gain est la **valeur actuelle** de la variation multipliée par la taille.*

> **L'« erreur de système » qui n'en est pas une.** Un trader entre dans un forward long de **£1 M** à **1,5000** à 3 mois ; son voisin achète **16 contrats** futures (£62 500 chacun) au même prix. Les positions sont identiques. Les deux prix montent à **1,5040**. Le système affiche **4 000 dollars** de profit pour le futures et **3 900** pour le forward. *Le trader forward appelle immédiatement le service informatique pour se plaindre. A-t-il raison ? **Non !*** S'il dénouait par un contrat court à 1,5040, il aurait contracté d'acheter £1 M à 1,5000 et de vendre £1 M à 1,5040 **dans 3 mois** : **4 000 dollars, mais dans 3 mois, pas aujourd'hui**. Son profit est la **valeur actuelle** de 4 000 — exactement (5.4). *Il peut se consoler : gains et pertes sont traités symétriquement. Si les prix étaient tombés à 1,4960, le trader futures perdrait 4 000 et le trader forward seulement 3 900.*

## 🟠 Concept 5 — Prix forward et prix futures sont-ils égaux ?

**Le résultat théorique.** *Quand le taux sans risque court terme est **constant**, le prix forward est en théorie **le même** que le prix futures* (le raisonnement s'étend au cas où le taux est une **fonction connue du temps**).

**Quand les taux varient de façon imprévisible** — comme dans le monde réel — ils ne sont plus égaux. Le raisonnement :

| Corrélation de $S$ avec les taux | Mécanisme | Conclusion |
|---|---|---|
| **Fortement positive** | $S$ monte → le long futures gagne **immédiatement** (règlement quotidien) ; les taux ayant probablement monté aussi, ce gain est **replacé à un taux plus élevé que la moyenne**. $S$ baisse → perte immédiate, **financée à un taux plus bas**. Le détenteur d'un **forward** n'est pas affecté ainsi. | le futures est **légèrement plus attractif** → $F^{\text{fut}}>F^{\text{fwd}}$ |
| **Fortement négative** | raisonnement symétrique | $F^{\text{fwd}}>F^{\text{fut}}$ |

> **La conclusion pratique.** *Les différences théoriques pour des contrats de quelques mois sont dans la plupart des cas assez petites pour être ignorées.* D'autres facteurs pèsent d'ailleurs davantage : **fiscalité, coûts de transaction, traitement des marges**, moindre **risque de contrepartie** du futures (chambre de compensation) et parfois **meilleure liquidité**. *Pour la plupart des usages, il est raisonnable de supposer que les prix forward et futures sont les mêmes* — et le symbole $F_0$ désignera les deux.

⚠️ **L'exception nommée par Hull : les futures eurodollars** (section 6.3).

## 🔴 Concept 6 — Indices boursiers

*Un indice peut habituellement être regardé comme le prix d'un actif d'investissement versant des dividendes* : l'actif est le **portefeuille des actions de l'indice**, et les dividendes sont **ceux que percevrait son détenteur**. On suppose usuellement un **rendement connu** plutôt qu'un revenu en montant :

$$\boxed{F_0=S_0e^{(r-q)T}}\;\text{(5.8)}$$

*Le prix futures croît donc au taux $r-q$ avec la maturité.* **Lecture inverse, sur données réelles :** *le règlement décembre du S&P 500 est environ **0,76 % inférieur** au règlement juin. Cela indique que, le 26 mai 2010, le taux sans risque court terme $r$ était inférieur au rendement du dividende $q$ d'environ **1,52 % par an**.* (0,76 % sur six mois → 1,52 % annualisé.)

**Exemple 5.5.** $S_0=1\,300$, $q=1\,\%$, $r=5\,\%$, $T=0{,}25$ : $F_0=1\,300e^{0{,}04\times0{,}25}=\mathbf{1\,313{,}07}$.

⚠️ **Le choix de $q$.** *En pratique le rendement du dividende varie semaine par semaine* — une grande partie des dividendes du NYSE sont versés la **première semaine de février, mai, août et novembre**. *La valeur choisie doit représenter le **rendement annualisé moyen** pendant la vie du contrat, calculé sur les dividendes dont la **date de détachement** tombe dans cette période.*

**L'arbitrage d'indice.** Si $F_0>S_0e^{(r-q)T}$ : **acheter les actions** de l'indice au comptant et **vendre** les futures. Si $F_0<S_0e^{(r-q)T}$ : l'inverse. *Quand $F_0<S_0e^{(r-q)T}$, l'arbitrage est souvent réalisé par un **fonds de pension** détenant un portefeuille indiciel ; quand $F_0>S_0e^{(r-q)T}$, par une **entreprise** détenant des placements monétaires court terme.* Pour les indices à nombreuses composantes, on utilise un **échantillon représentatif** ; l'exécution passe par le ***program trading*** (génération automatique des ordres).

<details class="details--riche">
<summary>

**Quand l'arbitrage devient impossible — octobre 1987**

</summary>

**La condition nécessaire.** *Pour faire de l'arbitrage d'indice, un trader doit pouvoir négocier **très rapidement** à la fois le futures et le portefeuille d'actions, aux prix affichés.* En conditions normales, le *program trading* le permet et (5.8) tient bien.

**Lundi noir, 19 octobre 1987.** Le marché chute de **plus de 20 %** ; les **604 millions** d'actions traitées au NYSE dépassent largement tous les records. *Les systèmes de la bourse furent saturés, et les ordres passés ce jour-là pouvaient être retardés de **jusqu'à deux heures** avant exécution.*

*La conséquence, chiffrée.* En clôture, le S&P 500 était à **225,06** (−57,88 sur la journée) tandis que le futures décembre cotait **201,50** (−80,75). **Une décote de plus de 10 %** — *en grande partie parce que les retards de traitement rendaient l'arbitrage d'indice impossible*.

**Mardi 20 octobre.** Le NYSE impose des **restrictions temporaires** au *program trading* — ce qui rend l'arbitrage **encore plus difficile** et prolonge la rupture du lien traditionnel. *À un moment, le prix du futures décembre était **18 % inférieur** au S&P 500.* Après quelques jours, le marché redevint normal et *l'activité des arbitragistes rétablit l'équation (5.8)*.

⚠️ **La leçon.** La relation d'arbitrage n'est pas une loi de la nature : elle est **produite** par la capacité d'exécuter. Quand la **liquidité opérationnelle** disparaît, la formule cesse de tenir — et l'écart peut atteindre **18 %**.

</details>

⚠️ **Un indice n'est pas toujours un actif d'investissement — le contrat Nikkei 225 du CME.** Soit $S$ la valeur de l'indice Nikkei 225 : c'est la valeur d'un portefeuille de 225 actions japonaises, **mesurée en yens**. La variable sous-jacente au futures du CME a une valeur **en dollars** de $5S$. *Autrement dit, le contrat prend une variable mesurée en yens et la traite comme si c'étaient des dollars.* Or **on ne peut pas investir dans un portefeuille qui vaudra toujours $5S$ dollars** : au mieux, dans un qui vaut toujours $5S$ **yens**, ou $5QS$ dollars où $Q$ est la valeur en dollars d'un yen. **$5S$ dollars n'est donc pas le prix d'un actif d'investissement et (5.8) ne s'applique pas.** C'est un **quanto** : *un dérivé dont le sous-jacent est mesuré dans une devise et le payoff versé dans une autre* (chapitre 29).

## 🔴 Concept 7 — Devises et parité des taux d'intérêt

**Convention.** $S_0$ = prix comptant **en dollars** d'une unité de devise étrangère ; $F_0$ = idem à terme. *Cela ne correspond pas nécessairement à la façon dont les cours sont cotés* : hors GBP, EUR, AUD et NZD, on cote **le nombre d'unités de devise pour un dollar** (fiche 75).

**La propriété clé.** *Une devise a la propriété que son détenteur peut gagner l'intérêt au taux sans risque du pays étranger* — en achetant une obligation libellée dans cette devise. On note $r_f$ ce taux.

$$\boxed{F_0=S_0e^{(r-r_f)T}}\;\text{(5.9)}$$

C'est la **parité des taux d'intérêt** de la finance internationale.

**La démonstration par les deux chemins.** Partant de 1 000 unités de devise étrangère, il y a **deux façons** d'obtenir des dollars en $T$ :

| Chemin | Opérations | Résultat en $T$ |
|---|---|---|
| **A** | placer à $r_f$ pendant $T$, puis **vendre à terme** le produit | $1\,000e^{r_fT}F_0$ dollars |
| **B** | **convertir au comptant** puis placer à $r$ | $1\,000S_0e^{rT}$ dollars |

*En l'absence d'opportunité d'arbitrage, les deux stratégies doivent donner le même résultat*, d'où $1\,000e^{r_fT}F_0=1\,000S_0e^{rT}$, c'est-à-dire (5.9).

<details class="details--riche">
<summary>

**Exercice résolu — l'arbitrage de parité, dans les deux sens (exemple 5.6)**

</summary>

**Données.** Taux 2 ans : **Australie 5 %**, **États-Unis 7 %**. Spot **0,6200 USD par AUD**.

*Étape 0 — le taux d'équilibre.* $F_0=0{,}62e^{(0{,}07-0{,}05)\times2}=0{,}62e^{0{,}04}=\mathbf{0{,}6453}$.

**Cas A — le forward est trop bas (0,6300).** *L'AUD est trop bon marché à terme → on l'achètera à terme.* *Étape 1.* Emprunter **1 000 AUD** à 5 % pour 2 ans ; convertir en $1\,000\times0{,}62=\mathbf{620}$ USD ; placer les USD à 7 %. *Étape 2.* Acheter à terme **1 105,17 AUD** pour $1\,105{,}17\times0{,}63=\mathbf{696{,}26}$ USD. *Étape 3 (dans 2 ans).* Le placement vaut $620e^{0{,}14}=\mathbf{713{,}17}$ USD. *Étape 4.* Payer 696,26 USD, recevoir 1 105,17 AUD — **exactement** de quoi rembourser $1\,000e^{0{,}10}=1\,105{,}17$ AUD. *Étape 5.* **Profit sans risque : $713{,}17-696{,}26=\mathbf{16{,}91}$ USD.** *(Si cela ne paraît pas très excitant, imaginez la même stratégie en empruntant 100 millions d'AUD !)*

**Cas B — le forward est trop haut (0,6600).** *L'AUD est trop cher à terme → on le vendra à terme.* *Étape 1'.* Emprunter **1 000 USD** à 7 % ; convertir en $1\,000/0{,}62=\mathbf{1\,612{,}90}$ AUD ; placer à 5 %. *Étape 2'.* Vendre à terme **1 782,53 AUD** pour $1\,782{,}53\times0{,}66=\mathbf{1\,176{,}47}$ USD. *Étape 3' (dans 2 ans).* Le placement vaut $1\,612{,}90e^{0{,}10}=\mathbf{1\,782{,}53}$ AUD, converti en 1 176,47 USD. *Étape 4'.* Rembourser $1\,000e^{0{,}14}=\mathbf{1\,150{,}27}$ USD. *Étape 5'.* **Profit : $1\,176{,}47-1\,150{,}27=\mathbf{26{,}20}$ USD.**

⚠️ **La règle de construction.** On **emprunte la devise dont le forward est relativement cher** et on **place celle dont il est relativement bon marché** — le forward servant à reverrouiller la conversion finale. Le montant vendu ou acheté à terme est **exactement** le montant capitalisé, jamais le montant initial.

</details>

**Une devise est un actif à rendement connu.** *L'équation (5.9) est identique à (5.3) avec $q$ remplacé par $r_f$. Ce n'est pas une coïncidence.* Pourquoi ? *La valeur de l'intérêt payé dans une devise étrangère dépend de la valeur de cette devise.* Si le taux sur la livre est 5 %, alors **pour un investisseur américain la livre procure un revenu égal à 5 % de la valeur de la livre par an** — c'est-à-dire un **rendement** de 5 %.

**Lecture des cotations du 26 mai 2010.**

| Devises | Situation des taux | Effet sur la courbe futures |
|---|---|---|
| Yen, livre, franc suisse, euro | $r>r_f$ | prix futures **croissants** avec la maturité |
| Dollar australien, dollar canadien, peso mexicain | $r_f>r$ | prix futures **décroissants** |

*Exemple 5.7 : le règlement septembre de l'AUD est environ **1 % inférieur** au règlement juin — les prix futures décroissent d'environ **4 % par an**, ce qui, par (5.9), estime de combien le LIBOR australien court terme dépassait le LIBOR américain le 26 mai 2010.*

## 🔴 Concept 8 — Matières premières, stockage et rendement de commodité

**Or et argent sont des actifs d'investissement** — et ils procurent **un revenu** : les banques centrales facturent un intérêt, le ***gold lease rate***, lorsqu'elles prêtent de l'or (fiche 76). Comme toute matière première, ils ont aussi des **coûts de stockage**.

> **Le coût de stockage se traite comme un revenu négatif.** Si $U$ est la valeur actuelle de tous les coûts de stockage **nets du revenu** :
>
> $$\boxed{F_0=(S_0+U)e^{rT}}\;\text{(5.11)}\qquad\qquad\text{ou, en proportion }u\text{ du prix :}\qquad \boxed{F_0=S_0e^{(r+u)T}}\;\text{(5.12)}$$

<details class="details--riche">
<summary>

**Exercice résolu — un actif avec coût de stockage (exemple 5.8)**

</summary>

**Énoncé.** Futures **1 an** sur un actif d'investissement **sans revenu**. Stockage : **2 par unité, payé en fin d'année**. Spot **450**, taux **7 %** toutes maturités.

*Étape 1 — actualiser le coût.* $U=2e^{-0{,}07\times1}=\mathbf{1{,}865}$. *Étape 2 — appliquer (5.11).* $F_0=(450+1{,}865)e^{0{,}07}=451{,}865\times1{,}072508=\mathbf{484{,}63}$. *Étape 3 — les deux arbitrages.* Si le futures **dépasse 484,63** : **acheter** l'actif et **vendre** des futures 1 an → profit verrouillé. S'il est **inférieur** : *un investisseur qui détient déjà l'actif améliore son rendement en le **vendant** et en **achetant** des futures*.

⚠️ **Le signe.** Le stockage **s'ajoute** à $S_0$ (il augmente le coût de portage), là où un revenu **se retranche**. Une seule règle : $F_0=(S_0+\text{coûts}-\text{revenus})e^{rT}$.

</details>

### 8.1 Pourquoi les actifs de consommation n'ont qu'une inégalité

**Sens 1 — toujours praticable.** Si $F_0>(S_0+U)e^{rT}$ : emprunter $S_0+U$, acheter la marchandise et payer le stockage, vendre un futures → profit $F_0-(S_0+U)e^{rT}$. *Il n'y a **aucun problème** à mettre en œuvre cette stratégie pour **n'importe quelle** matière première.* Donc **cette inégalité ne peut pas durer**.

**Sens 2 — praticable seulement pour un actif d'investissement.** Si $F_0<(S_0+U)e^{rT}$, il faudrait **vendre la marchandise**, économiser le stockage, placer, et acheter un futures. Pour l'or ou l'argent, de nombreux investisseurs le feront. **Mais** :

> *Les particuliers et les entreprises qui détiennent une matière première de consommation prévoient généralement de **l'utiliser** d'une manière ou d'une autre. Ils sont **réticents à la vendre au comptant pour acheter des forwards ou des futures**, parce qu'un contrat forward ou futures **ne peut pas être utilisé dans un processus de fabrication** ni consommé.*

**Rien n'empêche donc** $F_0<(S_0+U)e^{rT}$ de tenir. Tout ce qu'on peut affirmer est :

$$\boxed{F_0\le(S_0+U)e^{rT}}\;\text{(5.15)}\qquad\qquad\boxed{F_0\le S_0e^{(r+u)T}}\;\text{(5.16)}$$

### 8.2 Le rendement de commodité

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Les bénéfices de détenir l'**actif physique** — *un raffineur ne regarde pas un futures sur brut de la même façon que du brut en stock : le brut en stock peut **alimenter le processus de raffinage**, pas le futures ; la détention physique permet de **garder une production en marche** et peut-être de **profiter de pénuries locales temporaires*** — sont appelés **rendement de commodité** (*convenience yield*) $y$, défini par :

$$F_0e^{yT}=(S_0+U)e^{rT}\qquad\text{ou}\qquad F_0e^{yT}=S_0e^{(r+u)T}\ \Longrightarrow\ \boxed{F_0=S_0e^{(r+u-y)T}}\;\text{(5.17)}$$

</div>

> **Ce qu'il mesure exactement.** *Le rendement de commodité mesure simplement de combien le membre de gauche est **inférieur** au membre de droite dans (5.15) ou (5.16).* C'est une **variable de bouclage**, définie par différence — pas une grandeur observable indépendamment.

⚠️ **Pour un actif d'investissement, $y$ doit être nul**, sinon il y a arbitrage.

**Lecture empirique.** *Le 26 mai 2010, le prix futures du soja **décroissait** de juillet 2010 à novembre 2010. Ce profil suggère que $y>r+u$.*

**Ce que $y$ reflète.** *Les anticipations du marché sur la **disponibilité future** de la matière première. Plus la possibilité de pénurie est grande, plus $y$ est élevé. Si les utilisateurs ont des **stocks élevés**, il y a très peu de risque de pénurie proche et $y$ tend à être **faible** ; si les stocks sont **bas**, les pénuries sont plus probables et $y$ est habituellement **plus élevé**.*

## 🔴 Concept 9 — Le coût de portage, et les options de livraison

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Le **coût de portage** $c$ mesure *le coût de stockage **plus** l'intérêt payé pour financer l'actif **moins** le revenu qu'il procure*.

</div>

| Actif | Coût de portage $c$ |
|---|---|
| Action sans dividende | $r$ |
| Indice boursier | $r-q$ |
| Devise | $r-r_f$ |
| Matière première à revenu $q$ et stockage $u$ | $r-q+u$ |

$$\boxed{F_0=S_0e^{cT}}\;\text{(5.18)}\ \text{(investissement)}\qquad\qquad\boxed{F_0=S_0e^{(c-y)T}}\;\text{(5.19)}\ \text{(consommation)}$$

**Les options de livraison.** Un futures laisse souvent au **vendeur** le choix de livrer **n'importe quand dans une période**. Faut-il alors calculer le prix théorique pour le **début**, le **milieu** ou la **fin** de la période ?

| Observation | Ce qu'elle implique via (5.19) | Comportement optimal du vendeur | Convention de calcul |
|---|---|---|---|
| $F$ **croissant** en maturité | $c>y$ : les bénéfices de détention sont **inférieurs** au taux sans risque | livrer **le plus tôt possible** — *l'intérêt gagné sur le cash reçu l'emporte sur les bénéfices de détention* | **début** de la période |
| $F$ **décroissant** | $c<y$ | livrer **le plus tard possible** | **fin** de la période |

## 🟠 Concept 10 — Prix futures et prix comptant **anticipé**

**La question.** En juin, le futures maïs septembre cote **350 cents**. Le prix comptant **anticipé** en septembre est-il inférieur, supérieur ou égal à 350 ? *Puisque le futures converge vers le spot à maturité* : si l'anticipation est **sous** 350, le marché anticipe une **baisse** du futures — les courts gagnent, les longs perdent ; si elle est **au-dessus**, l'inverse.

**Keynes et Hicks.** *Si les hedgers tendent à être **courts** et les spéculateurs **longs**, le prix futures sera **inférieur** au prix comptant anticipé* — *parce que les spéculateurs exigent une compensation pour les risques qu'ils supportent : ils ne négocieront que s'ils peuvent espérer gagner de l'argent en moyenne. Les hedgers perdront de l'argent en moyenne, mais sont probablement prêts à l'accepter parce que le futures réduit leurs risques.* Si les rôles sont inversés, $F_0$ sera **au-dessus**.

**L'approche moderne — par le risque systématique.** Un spéculateur long place $F_0e^{-rT}$ au taux sans risque et prend une position longue futures ; à la livraison, il achète l'actif et le revend immédiatement :

$$\text{aujourd'hui}:\ -F_0e^{-rT}\qquad\qquad\text{en }T:\ +S_T$$

Si $k$ est le **rendement exigé** pour cet investissement, et si *tous les investissements sur les marchés de titres sont valorisés de sorte que leur VAN soit nulle* :

$$-F_0e^{-rT}+\mathbb E(S_T)e^{-kT}=0\qquad\Longrightarrow\qquad\boxed{F_0=\mathbb E(S_T)e^{(r-k)T}}\;\text{(5.20)}$$

| Risque systématique du sous-jacent | Rendement exigé | Conclusion |
|---|---|---|
| **Nul** | $k=r$ | $F_0=\mathbb E(S_T)$ — *le prix futures est un estimateur **sans biais** du prix comptant futur* |
| **Positif** | $k>r$ | $\boxed{F_0<\mathbb E(S_T)}$ — le futures **sous-estime** |
| **Négatif** | $k<r$ | $\boxed{F_0>\mathbb E(S_T)}$ — le futures **surestime** |

**La cohérence interne du livre.** *Un indice boursier a un risque systématique positif : le rendement attendu des actions de l'indice dépasse $r$, les dividendes en fournissent $q$, donc la hausse attendue de l'indice doit dépasser $r-q$. L'équation (5.8) est donc **cohérente** avec la prédiction que le futures sous-estime le prix futur anticipé pour un indice.*

⚠️ **Vocabulaire à double sens — attention en examen.** Quand $F_0<\mathbb E(S_T)$ : ***normal backwardation***. Quand $F_0>\mathbb E(S_T)$ : ***contango***. *Il faut noter cependant que ces termes sont parfois utilisés pour dire si le prix futures est en dessous ou au-dessus du prix comptant **actuel**, plutôt que du prix comptant **anticipé**.* **Toujours vérifier de quelle version parle l'énoncé.**

## Comment reconnaître le type d'exercice

| Signal | Formule |
|---|---|
| Action **sans** dividende, zéro-coupon | $F_0=S_0e^{rT}$ |
| Dividende ou coupon **en montant**, à date connue | $F_0=(S_0-I)e^{rT}$, $I$ = **valeur actuelle** |
| Dividende **en pourcentage**, indice | $F_0=S_0e^{(r-q)T}$ |
| **Devise** | $F_0=S_0e^{(r-r_f)T}$ |
| Coût de **stockage** en montant / en proportion | $F_0=(S_0+U)e^{rT}$ / $F_0=S_0e^{(r+u)T}$ |
| Matière première **de consommation** | $F_0\le\cdots$ et $F_0=S_0e^{(r+u-y)T}$ |
| Un contrat **déjà en cours**, prix de livraison $K$ | $f=(F_0-K)e^{-rT}$ |
| « le futures est-il un bon prédicteur ? » | $F_0=\mathbb E(S_T)e^{(r-k)T}$, regarder le **signe du bêta** |

## Comment résoudre ce type d'exercice

**Protocole prix d'équilibre — 4 étapes.**

1. **Classer l'actif** : investissement ou consommation ? avec revenu, rendement, stockage ?
2. Mettre **tous les taux et rendements** en capitalisation **continue**.
3. Appliquer la formule ; contrôler que $T$ est bien la maturité **du contrat**.
4. **Vérifier le sens** : $F_0>S_0$ si le portage coûte, $F_0<S_0$ s'il rapporte.

**Protocole arbitrage — 5 étapes.**

1. Comparer le prix observé au prix théorique.
2. **Vendre le cher, acheter le bon marché** : si $F$ est trop haut, on **vend le forward** et on **achète le sous-jacent** (financé par emprunt) ; si $F$ est trop bas, l'inverse.
3. **Financer** exactement : emprunter $S_0$ (ou $S_0-I$, ou $S_0+U$) au taux $r$ jusqu'en $T$ ; découper l'emprunt si un revenu intermédiaire doit être neutralisé.
4. Écrire **tous** les flux à chaque date et vérifier qu'ils s'annulent sauf un.
5. Le résidu est le **profit sans risque** — il doit être $|F_0^{\text{obs}}-F_0^{\text{th}}|$ (éventuellement actualisé).

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Appliquer $F_0=S_0e^{rT}$ au pétrole ou au cuivre | Ce sont des actifs de **consommation** : seulement $F_0\le S_0e^{(r+u)T}$ |
| Utiliser le **montant** du dividende au lieu de sa **valeur actuelle** dans (5.2) | $I$ est **actualisé** à aujourd'hui |
| Confondre $K$ et $F_0$ dans la valorisation | $K$ est **figé** dans le contrat ; $F_0$ est le prix **d'aujourd'hui** |
| Prendre $T$ = maturité de l'**obligation** sous-jacente | $T$ = maturité **du forward** |
| Soustraire un rendement discret d'un taux continu | Convertir d'abord : $q=m\ln(1+q_m/m)$ |
| Croire que le trader forward a été lésé de 100 dollars | Son profit est la **valeur actuelle** du gain futures |
| Ajouter le coût de stockage **au numérateur du revenu** | Stockage = **revenu négatif** : il **s'ajoute** à $S_0$ |
| Traiter le rendement de commodité comme observable | Il est **défini par différence** — c'est une variable de bouclage |
| Croire que $y>0$ est possible pour l'or | Pour un actif d'**investissement**, $y=0$ sinon arbitrage |
| Appliquer (5.8) au Nikkei 225 du CME | C'est un **quanto** : $5S$ dollars n'est **pas** un actif d'investissement |
| Croire que « contango » désigne toujours la même chose | Deux usages : par rapport au spot **anticipé** ou au spot **actuel** |
| Confondre « le futures sous-estime » et « le futures est faux » | Le biais est la **prime de risque** — c'est un prix d'équilibre |

## 📌 Ultimate Review

**Le tableau complet des prix.**

| Situation | Prix forward/futures | Valeur d'un long de prix $K$ |
|---|---|---|
| Sans revenu | $S_0e^{rT}$ | $S_0-Ke^{-rT}$ |
| Revenu $I$ (VA) | $(S_0-I)e^{rT}$ | $S_0-I-Ke^{-rT}$ |
| Rendement $q$ | $S_0e^{(r-q)T}$ | $S_0e^{-qT}-Ke^{-rT}$ |
| Indice | $S_0e^{(r-q)T}$ | — |
| Devise | $S_0e^{(r-r_f)T}$ | — |
| Stockage $U$ (VA) / $u$ | $(S_0+U)e^{rT}$ / $S_0e^{(r+u)T}$ | — |
| Consommation | $\le$ ci-dessus ; $=S_0e^{(r+u-y)T}$ | — |
| **Général** | $F_0=S_0e^{cT}$ ou $S_0e^{(c-y)T}$ | $f=(F_0-K)e^{-rT}$ |

**Les deux règles de valorisation.** Un forward se valorise **en supposant $S_T=F_0$** · un FRA **en supposant les forwards réalisés** — c'est le même principe.

**Prix futures et anticipation.** $F_0=\mathbb E(S_T)e^{(r-k)T}$ : bêta positif → $F_0<\mathbb E(S_T)$ (*normal backwardation*) · bêta négatif → $F_0>\mathbb E(S_T)$ (*contango*) · bêta nul → **estimateur sans biais**.

**Les chiffres du chapitre.** Action 40, 5 %, 3 mois → **40,50** (arbitrages **+2,50** et **+1,50**) · zéro-coupon 930 → **948,79** · obligation 900 avec coupon 40 → **886,60** (**+23,40** et **+16,60**) · actif 25 avec 2 % semestriel → **25,77** · forward $K=24$, $S_0=25$ → $f=\mathbf{2{,}17}$ · indice 1 300, $r=5\,\%$, $q=1\,\%$ → **1 313,07** · AUD/USD 0,62, 5 % et 7 % → **0,6453** (arbitrages **16,91** et **26,20**) · stockage : 450 + 2 → **484,63** · Kidder Peabody : **+100 M affichés, −350 M réels** · 19 octobre 1987 : S&P 500 **225,06** contre futures **201,50**, jusqu'à **−18 %**.

## 🧠 Active Recall

<details><summary>Pourquoi peut-on déterminer le prix forward de l'or par arbitrage, mais seulement le majorer pour le pétrole ?</summary>

Parce que l'arbitrage doit fonctionner **dans les deux sens** pour produire une **égalité**. Le sens « $F$ trop haut » marche toujours : emprunter, acheter le physique, vendre le forward. Le sens « $F$ trop bas » exige de **vendre le physique** et d'acheter le forward — ce que font volontiers les détenteurs d'**or** (actif d'investissement), mais pas les détenteurs de **pétrole** : *ils prévoient de l'utiliser, et un futures ne peut pas être raffiné*. D'où seulement $F_0\le(S_0+U)e^{rT}$.

</details>

<details><summary>Construire l'arbitrage quand une action sans dividende vaut 40, le taux est 5 % et le forward 3 mois cote 43.</summary>

Prix théorique : $40e^{0{,}05\times0{,}25}=40{,}50$. Le forward est **trop cher** → on le **vend**. **Emprunter 40** à 5 % · **acheter une action** · **vendre à terme** à 43. Dans 3 mois : livrer, recevoir **43**, rembourser **40,50**. **Profit sans risque : 2,50.** Si le forward cotait 39, on ferait l'inverse (short l'action, placer 40, acheter à terme) pour **+1,50**.

</details>

<details><summary>Une obligation vaut 900, verse un coupon de 40 dans 4 mois, taux 3 % (4 mois) et 4 % (9 mois). Calculer le prix forward 9 mois et expliquer le découpage de l'emprunt.</summary>

$I=40e^{-0{,}03/3}=39{,}60$ ; $F_0=(900-39{,}60)e^{0{,}04\times0{,}75}=\mathbf{886{,}60}$.

**Le découpage :** on emprunte **39,60 à 3 % pour 4 mois** — cette tranche croît à exactement **40** et est remboursée **par le coupon** — et **860,40 à 4 % pour 9 mois**, qui croît à **886,60**. Le revenu intermédiaire est ainsi **neutralisé** et le problème est ramené au cas sans revenu.

</details>

<details><summary>Qu'est-ce que Kidder Peabody a pris pour un profit, et combien cela a-t-il coûté ?</summary>

L'**écart entre le prix forward et le prix comptant** d'un strip — c'est-à-dire, par (5.1), **le coût de financement de l'achat du strip**, et rien d'autre. Le système enregistrait cet écart comme un profit sur chaque opération, et *en roulant ses contrats, Jett empêchait ce coût de lui être imputé*. Bilan : **100 millions de profit affichés** (et un gros bonus) pour **environ 350 millions de perte réelle**.

</details>

<details class="details--riche">
<summary>

Démontrer $f=(F_0-K)e^{-rT}$.

</summary>

Comparer deux forwards longs identiques sauf le prix de livraison : $F_0$ pour l'un, $K$ pour l'autre. Ils ne diffèrent **que** par le montant payé en $T$, soit $F_0-K$, ce qui vaut $(F_0-K)e^{-rT}$ aujourd'hui. Le contrat de prix $F_0$ vaut **zéro par définition** (c'est le prix de marché courant). Donc le contrat de prix $K$ vaut $(F_0-K)e^{-rT}$.

</details>

<details><summary>Un trader forward et un trader futures ont la même position ; le cours monte de 1,5000 à 1,5040 sur £1 M. Pourquoi les profits affichés diffèrent-ils de 100 dollars ?</summary>

Ce n'est **pas** une erreur de système. Le **futures** est réglé quotidiennement : les **4 000 dollars** sont encaissés **immédiatement**. Le **forward** ne l'est pas : en dénouant à 1,5040, le trader s'assure 4 000 dollars **dans 3 mois**. Son profit **aujourd'hui** est la **valeur actuelle** de 4 000, soit 3 900 — exactement ce que dit (5.4). *Et la symétrie joue dans l'autre sens : à 1,4960, le futures perdrait 4 000 et le forward seulement 3 900.*

</details>

<details><summary>Établir la parité des taux d'intérêt par les deux chemins.</summary>

Partant de 1 000 unités de devise étrangère : **chemin A** — placer à $r_f$ jusqu'en $T$ puis vendre à terme, ce qui donne $1\,000e^{r_fT}F_0$ dollars ; **chemin B** — convertir au comptant puis placer à $r$, ce qui donne $1\,000S_0e^{rT}$ dollars. Les deux résultats sont **certains** ; en l'absence d'arbitrage ils doivent être égaux, donc $F_0=S_0e^{(r-r_f)T}$. **Une devise est un actif de rendement $r_f$** — l'intérêt étranger est un revenu **proportionnel à la valeur de la devise**.

</details>

<details><summary>Le contrat Nikkei 225 du CME viole les hypothèses du chapitre. Pourquoi exactement ?</summary>

Parce que $S$ (l'indice) est la valeur d'un portefeuille japonais **en yens**, alors que le contrat du CME donne au sous-jacent une valeur **en dollars** de $5S$ : *il prend une variable mesurée en yens et la traite comme si c'étaient des dollars*. Or **aucun portefeuille négociable ne vaut toujours $5S$ dollars** — au mieux $5S$ **yens**, ou $5QS$ dollars. $5S$ dollars **n'est donc pas le prix d'un actif d'investissement**, et (5.8) ne s'applique pas. C'est un **quanto**.

</details>

<details><summary>Définir le rendement de commodité et dire ce qui le fait monter.</summary>

C'est la mesure des **bénéfices de la détention physique** que le futures ne procure pas : alimenter un processus de production, profiter de **pénuries locales temporaires**. Formellement, il est **défini par différence** : $F_0e^{yT}=S_0e^{(r+u)T}$, donc $y$ mesure *de combien le membre de gauche de (5.16) est inférieur au membre de droite*. Il **monte quand les stocks sont bas** (pénurie plus probable) et **baisse quand ils sont élevés**. Pour un actif d'**investissement**, il doit être **nul**.

</details>

<details><summary>Le prix futures est-il un bon prédicteur du prix comptant futur ?</summary>

Cela dépend du **risque systématique** du sous-jacent, via $F_0=\mathbb E(S_T)e^{(r-k)T}$. **Bêta nul** ($k=r$) : $F_0=\mathbb E(S_T)$, **estimateur sans biais**. **Bêta positif** ($k>r$) : $F_0<\mathbb E(S_T)$, le futures **sous-estime** — cas des **indices boursiers**, ce qui est cohérent avec (5.8) puisque la hausse attendue de l'indice doit dépasser $r-q$. **Bêta négatif** : $F_0>\mathbb E(S_T)$. Ce n'est pas une erreur du marché : c'est la **prime de risque** exigée par celui qui porte le risque.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Actif d'investissement ? | Détenu à des fins d'investissement par un **nombre significatif** d'investisseurs |
| Actif de consommation ? | Détenu **principalement pour la consommation** |
| Pourquoi l'argent est-il un actif d'investissement ? | Certains le détiennent **uniquement pour investir** et **substitueraient** un forward |
| Que doit reverser un vendeur à découvert ? | Tout **revenu** (dividendes, intérêts) sur les titres shortés |
| Le produit de la vente à découvert ? | Appartient à l'investisseur et sert de **marge initiale** |
| *Uptick rule* : dates ? | **1938** instaurée · **juillet 2007** abolie · **février 2010** version « alternative » |
| Seuil de l'*alternative uptick rule* ? | Baisse de **plus de 10 %** en un jour |
| Les hypothèses doivent-elles valoir pour tous ? | **Non** — pour **quelques participants clés** seulement |
| Prix forward, actif sans revenu ? | $F_0=S_0e^{rT}$ |
| Pourquoi $F_0>S_0$ ? | Le **coût de financement** de l'achat comptant |
| Avec revenu $I$ ? | $F_0=(S_0-I)e^{rT}$, $I$ = **valeur actuelle** |
| Avec rendement $q$ ? | $F_0=S_0e^{(r-q)T}$ |
| Faut-il pouvoir shorter pour établir (5.1) ? | **Non** — il suffit de **détenteurs prêts à substituer** |
| L'erreur de Kidder Peabody ? | Compter le **coût de financement** comme un profit |
| Son montant ? | **+100 M affichés** pour **−350 M réels** |
| Valeur d'un forward long ? | $f=(F_0-K)e^{-rT}$ |
| Valeur d'un forward court ? | $f=(K-F_0)e^{-rT}$ |
| Que vaut un forward à sa conclusion ? | **Zéro** |
| Lequel de $K$ et $F_0$ change ? | **$F_0$** — $K$ est figé |
| Règle de valorisation d'un forward ? | Supposer $S_T=F_0$, puis **actualiser** |
| $f$ pour un actif sans revenu ? | $S_0-Ke^{-rT}$ |
| $f$ avec rendement $q$ ? | $S_0e^{-qT}-Ke^{-rT}$ |
| Forward = futures quand… ? | Le taux court est **constant** (ou fonction connue du temps) |
| $S$ corrélé **positivement** aux taux ? | Futures **légèrement plus cher** que forward |
| Exception nommée par Hull ? | Les **futures eurodollars** |
| Prix futures d'un indice ? | $F_0=S_0e^{(r-q)T}$ |
| Que déduit-on d'une courbe futures d'indice décroissante ? | $q>r$ |
| Arbitrage d'indice quand $F_0$ trop haut ? | **Acheter** les actions, **vendre** les futures |
| Comment est-il exécuté ? | Par ***program trading*** |
| S&P 500 et futures le 19 octobre 1987 ? | **225,06** contre **201,50** (jusqu'à **−18 %**) |
| Pourquoi cet écart ? | Ordres retardés jusqu'à **2 heures** → arbitrage impossible |
| Qu'est-ce qu'un quanto ? | Sous-jacent dans une devise, **payoff dans une autre** |
| Formule de parité des taux ? | $F_0=S_0e^{(r-r_f)T}$ |
| Pourquoi $q=r_f$ pour une devise ? | L'intérêt étranger est un revenu **proportionnel** à la valeur de la devise |
| $r_f>r$ : courbe futures ? | **Décroissante** |
| Coût de stockage en montant ? | $F_0=(S_0+U)e^{rT}$ |
| Coût de stockage en proportion ? | $F_0=S_0e^{(r+u)T}$ |
| Comment traiter un coût de stockage ? | Comme un **revenu négatif** |
| Actif de consommation : quelle relation ? | $F_0\le(S_0+U)e^{rT}$ — **inégalité** |
| Pourquoi seulement une inégalité ? | Les détenteurs **refusent de vendre** le physique |
| Rendement de commodité ? | $F_0e^{yT}=S_0e^{(r+u)T}$ |
| Rendement de commodité d'un actif d'investissement ? | **Zéro** |
| Quand $y$ est-il élevé ? | Quand les **stocks sont bas** |
| Coût de portage $c$ ? | Stockage **+** intérêt **−** revenu |
| $c$ pour un indice ? une devise ? | $r-q$ · $r-r_f$ |
| Formule générale, consommation ? | $F_0=S_0e^{(c-y)T}$ |
| $F$ croissant en maturité : quand livrer ? | **Le plus tôt possible** ($c>y$) |
| Thèse de Keynes et Hicks ? | Hedgers courts + spéculateurs longs → $F_0<\mathbb E(S_T)$ |
| Relation moderne ? | $F_0=\mathbb E(S_T)e^{(r-k)T}$ |
| Bêta nul ? | $F_0=\mathbb E(S_T)$ — **sans biais** |
| Bêta positif ? | $F_0<\mathbb E(S_T)$ — *normal backwardation* |
| Bêta négatif ? | $F_0>\mathbb E(S_T)$ — *contango* |
| Piège de vocabulaire ? | Ces termes servent **aussi** par rapport au spot **actuel** |
