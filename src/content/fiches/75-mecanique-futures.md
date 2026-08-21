# Fiche 75 — Mécanique des marchés de futures : marges, compensation, livraison

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 2 « Mechanics of Futures Markets » |
| **Difficulté** | High — la plomberie qui rend les chapitres 3 à 6 calculables |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Fiche 74 |
| **Concepts clés** | Spécification de contrat, convergence, marge initiale, marge de maintien, appel de marge, *marking to market*, chambre de compensation, collatéralisation, risque systémique, prix de règlement, volume, position ouverte, marché normal/inversé, ordres, règle 60/40 |
| **Poids à l'examen** | **Reconstituer un compte de marge jour par jour** (le tableau 2.1 est l'exercice type absolu) · distinguer **volume** et **open interest** · lister les différences **forward / futures**. |

## 🎯 Vue d'ensemble

```
SPÉCIFIER   actif · taille · lieu · mois de livraison · cotation · limites
GARANTIR    marge initiale → règlement quotidien → appel de marge → chambre de compensation
CONVERGER   à l'approche de la livraison,  F → S   (sinon arbitrage immédiat)
LIRE        open / high / low / SETTLEMENT / change / volume / open interest
SORTIR      99 % des contrats sont dénoués avant livraison — mais c'est la possibilité
            de livraison qui fixe le prix
```

**La question à laquelle tout le chapitre répond.** Deux inconnus s'engagent à échanger un actif dans six mois. *L'un peut regretter l'accord et vouloir se dédire. Ou bien il peut tout simplement ne pas avoir les ressources financières pour honorer l'accord.* Comment rendre cette promesse crédible sans enquête de crédit ? **Réponse : on ne fait jamais crédit plus d'une journée.** Le contrat est reliquidé et réécrit chaque soir à un nouveau prix, et une provision (la marge) couvre la seule journée à risque.

## 🟡 Concept 1 — La spécification d'un contrat

La bourse doit préciser **l'actif**, la **taille du contrat**, le **lieu** et la **date** de livraison.

| Élément | Règle | Exemple du livre |
|---|---|---|
| **Actif** | qualité(s) admissible(s) stipulée(s) | jus d'orange ICE : concentré congelé **US Grade A**, indice Brix $\ge 62{,}5$ degrés |
| Grades multiples | prix ajusté par la bourse | maïs CME : standard **No. 2 Yellow** ; No. 1 Yellow $+1{,}5$ cent/boisseau ; No. 3 Yellow $-1{,}5$ cent |
| Actifs financiers | non ambigus… sauf le Trésor | T-bond CBOT : **toute** obligation de maturité $>15$ ans non remboursable avant 15 ans ; T-note : maturité entre **6,5 et 10 ans** — prix ajusté selon coupon et maturité (ch. 6) |
| **Taille** | compromis coût / accessibilité | T-bond CME : nominal **100 000 dollars** ; agricole typique : 10 000 à 20 000 dollars |
| Contrats *mini* | pour les petits investisseurs | Mini Nasdaq 100 : **20 fois** l'indice, contre **100 fois** pour le contrat normal |
| **Lieu** | entrepôts agréés | jus d'orange : Floride, New Jersey ou Delaware |
| **Mois** | fixés par la bourse | maïs CME : **mars, mai, juillet, septembre, décembre** |
| **Cotation** | définie par la bourse | pétrole en dollars et cents ; T-bond et T-note en dollars et **trente-deuxièmes** |

⚠️ **Règle générale à retenir : c'est le vendeur qui choisit.** *C'est la partie en position courte — celle qui a accepté de vendre — qui décide de ce qui se passe lorsque la bourse a spécifié des alternatives.* Elle dépose un **avis d'intention de livrer** précisant le grade et le lieu.

**Limites de prix et limites de position.**

| Notion | Définition | But |
|---|---|---|
| *Limit down* | le prix baisse du **maximum quotidien** autorisé | empêcher les mouvements dus aux **excès spéculatifs** |
| *Limit up* | il monte du maximum | idem |
| *Limit move* | mouvement égal à la limite, dans un sens ou l'autre | la cotation **cesse** normalement pour la journée |
| **Limites de position** | nombre maximal de contrats détenus par un **spéculateur** | l'empêcher d'exercer une **influence indue** |

⚠️ **Hull ne tranche pas.** *Les limites peuvent devenir une barrière artificielle aux échanges quand le prix du sous-jacent avance ou recule rapidement. Savoir si elles sont, au total, bonnes pour les marchés de futures est controversé.*

## 🔴 Concept 2 — La convergence du prix futures vers le prix spot

> **Résultat.** *À l'approche de la période de livraison, le prix futures converge vers le prix spot du sous-jacent. Quand la période de livraison est atteinte, le prix futures est égal — ou très proche — du prix spot.*

**Démonstration par arbitrage, dans les deux sens.**

| Si, pendant la livraison | Stratégie | Effet sur $F$ |
|---|---|---|
| $F>S$ | **1.** vendre (shorter) un futures · **2.** acheter l'actif · **3.** livrer | profit certain $=F-S$ → les ventes font **baisser** $F$ |
| $F<S$ | prendre une position **longue** et attendre la livraison (l'actif coûte moins cher qu'au comptant) | les achats font **monter** $F$ |

Les deux forces se rejoignent : $F\to S$. Avant la période de livraison, $F$ peut être **au-dessus** ou **en dessous** de $S$ — les circonstances sont analysées au chapitre 5.

## 🔴 Concept 3 — Les marges et le règlement quotidien

| Terme | Définition |
|---|---|
| **Marge initiale** (*initial margin*) | somme déposée **à l'entrée** dans le contrat |
| **Règlement quotidien** (*daily settlement*, *marking to market*) | le compte est ajusté **chaque soir** du gain ou de la perte du jour |
| **Marge de maintien** (*maintenance margin*) | plancher, **inférieur** à la marge initiale — typiquement **75 %** de celle-ci |
| **Appel de marge** (*margin call*) | déclenché si le solde passe **sous** le maintien ; il faut **revenir à la marge initiale** avant la fin du jour suivant |
| **Marge de variation** (*variation margin*) | les fonds supplémentaires versés à la suite de l'appel |
| Défaut de versement | le courtier **liquide la position** |

⚠️ **L'appel de marge ramène au niveau *initial*, pas au niveau de *maintien*.** C'est l'erreur numéro un de l'exercice type. Le maintien sert **uniquement de seuil de déclenchement**.

⚠️ **Le règlement quotidien n'est pas un arrangement entre le courtier et son client.** Quand le compte d'un investisseur long est réduit de 1 800 dollars, *son courtier doit payer 1 800 dollars à la bourse, et la bourse transmet l'argent au courtier d'un investisseur en position courte*. L'argent circule réellement, chaque jour, de bout en bout.

> **La conséquence théorique décisive.** *Alors qu'un forward est réglé à la fin de sa vie, un futures est réglé quotidiennement. Chaque soir, le gain (la perte) est ajouté (retranché) au compte de marge, ramenant la valeur du contrat à zéro.* **Un contrat futures est en fait dénoué et réécrit à un nouveau prix chaque jour.** C'est de là que viendra, au chapitre 5, la différence théorique entre prix forward et prix futures.

### 3.1 L'exercice type intégral — deux contrats or, 16 jours

**Données.** Position **longue** de 2 contrats or décembre au COMEX. Taille : **100 onces** par contrat → **200 onces**. Prix d'entrée jour 1 : **1 250,00**. Marge initiale **6 000 par contrat = 12 000** ; maintien **4 500 par contrat = 9 000**. Clôture le jour 16 à **1 226,90**.

**La formule unique du tableau.**

$$\text{gain du jour}=200\times(\text{règlement}_t-\text{règlement}_{t-1}),\qquad \text{solde}_t=\text{solde}_{t-1}+\text{gain}_t+\text{appel versé}_t$$

| Jour | Règlement | Gain du jour | Gain cumulé | Solde du compte | Appel |
|---|---|---|---|---|---|
| 1 (entrée) | 1 250,00 | — | — | 12 000 |  |
| 1 | 1 241,00 | −1 800 | −1 800 | 10 200 |  |
| 2 | 1 238,30 | −540 | −2 340 | 9 660 |  |
| 3 | 1 244,60 | +1 260 | −1 080 | 10 920 |  |
| 4 | 1 241,30 | −660 | −1 740 | 10 260 |  |
| 5 | 1 240,10 | −240 | −1 980 | 10 020 |  |
| 6 | 1 236,20 | −780 | −2 760 | 9 240 |  |
| **7** | 1 229,90 | −1 260 | −4 020 | **7 980** | **4 020** |
| 8 | 1 230,80 | +180 | −3 840 | 12 180 |  |
| 9 | 1 225,40 | −1 080 | −4 920 | 11 100 |  |
| 10 | 1 228,10 | +540 | −4 380 | 11 640 |  |
| **11** | 1 211,00 | −3 420 | −7 800 | **8 220** | **3 780** |
| 12 | 1 211,00 | 0 | −7 800 | 12 000 |  |
| 13 | 1 214,30 | +660 | −7 140 | 12 660 |  |
| 14 | 1 216,10 | +360 | −6 780 | 13 020 |  |
| 15 | 1 223,00 | +1 380 | −5 400 | 14 400 |  |
| 16 (clôture) | 1 226,90 | +780 | **−4 620** | 15 180 |  |

<details class="details--riche">
<summary>

**Reconstruction pas à pas des deux appels de marge**

</summary>

**Premier appel — jour 7.** *Étape 1 — le gain du jour.* $200\times(1\,229{,}90-1\,236{,}20)=200\times(-6{,}30)=\mathbf{-1\,260}$. *Étape 2 — le nouveau solde.* $9\,240-1\,260=\mathbf{7\,980}$. *Étape 3 — tester le seuil.* $7\,980<9\,000$ (maintien) → **appel déclenché**. L'écart sous le seuil est $9\,000-7\,980=1\,020$ — c'est le chiffre que cite Hull. *Étape 4 — calculer l'appel.* On revient à la **marge initiale** : $12\,000-7\,980=\mathbf{4\,020}$. *Étape 5 — vérifier le jour 8.* Gain $200\times(1\,230{,}80-1\,229{,}90)=+180$ ; solde $7\,980+4\,020+180=\mathbf{12\,180}$ .

**Second appel — jour 11.** *Étape 1.* $200\times(1\,211{,}00-1\,228{,}10)=200\times(-17{,}10)=\mathbf{-3\,420}$ — la plus grosse perte de la série. *Étape 2.* $11\,640-3\,420=\mathbf{8\,220}$. *Étape 3.* $8\,220<9\,000$ → appel de $12\,000-8\,220=\mathbf{3\,780}$. *Étape 4.* Jour 12 : prix **inchangé**, gain nul ; solde $8\,220+3\,780+0=\mathbf{12\,000}$ .

**Contrôle global.** Perte cumulée $=200\times(1\,226{,}90-1\,250{,}00)=200\times(-23{,}10)=\mathbf{-4\,620}$ . Et le solde final : $12\,000+4\,020+3\,780-4\,620=\mathbf{15\,180}$ — dépôts totaux moins perte.

⚠️ **L'excédent n'est pas retiré.** L'investisseur a un excédent de marge aux jours 8, 13, 14 et 15 ; il a le **droit** de retirer tout solde au-dessus de la marge initiale, mais le tableau suppose qu'il ne le fait pas. Un énoncé peut poser l'hypothèse inverse : lisez-le.

</details>

**Détails pratiques à connaître.**

| Point | Règle |
|---|---|
| Rémunération | la plupart des courtiers **paient des intérêts** sur le solde — la marge n'est donc pas un vrai coût |
| Dépôt en titres | bons du Trésor acceptés à environ **90 %** du nominal ; actions à environ **50 %** de leur valeur — pour la marge **initiale seulement**, pas pour les appels |
| Qui fixe | la **bourse** fixe les minima ; un courtier peut exiger **plus**, jamais moins |
| Déterminant | la **variabilité** du prix du sous-jacent : plus elle est forte, plus la marge est élevée |
| Modulation | un **hedger de bonne foi** paie moins qu'un spéculateur (risque de défaut jugé moindre) ; *day trades* et *spreads* aussi |
| Symétrie | les exigences sont **identiques** en position longue et courte — le marché **spot** n'a pas cette symétrie (vendre à découvert y est complexe) |

## 🟠 Concept 4 — La chambre de compensation

**Le rôle.** *Une chambre de compensation agit comme intermédiaire dans les transactions de futures. Elle garantit la bonne exécution des parties à chaque transaction.* Sa tâche principale : suivre toutes les transactions du jour pour calculer la **position nette** de chacun de ses membres.

**L'empilement des comptes.**

$$\text{investisseur}\ \xrightarrow{\text{compte de marge}}\ \text{courtier}\ \xrightarrow{\text{compte}}\ \text{membre compensateur}\ \xrightarrow{\textbf{marge de compensation}}\ \text{chambre}$$

⚠️ **Le membre compensateur n'a pas de marge de maintien.** *Il y a une marge d'origine, mais pas de marge de maintien.* Chaque jour, le solde doit être **exactement** égal à la marge d'origine multipliée par le nombre de contrats en cours — le membre ajoute ou retire des fonds tous les soirs.

**Brut ou net ?** Un membre a deux clients : l'un **long de 20** contrats, l'autre **court de 15**.

| Base | Nombre de contrats retenu | Résultat |
|---|---|---|
| **Brute** (*gross*) | somme des longs et des courts | $20+15=\mathbf{35}$ |
| **Nette** (*net*) | positions compensées | $20-15=\mathbf{5}$ |

*La plupart des bourses utilisent aujourd'hui le marginage net.*

**Le test historique — 19 octobre 1987.** L'indice S&P 500 chute de **plus de 20 %**. Les détenteurs de futures S&P 500 longs se retrouvent avec des soldes de marge **négatifs**. Ceux qui n'honorent pas les appels sont liquidés **mais restent débiteurs** ; certains ne paient pas, et **des courtiers font faillite** — privés de l'argent de leurs clients, ils ne peuvent pas honorer leurs propres appels. **Mais** les chambres de compensation avaient assez de fonds : *tous ceux qui avaient une position courte sur le S&P 500 ont été payés*.

## 🟠 Concept 5 — Les marchés de gré à gré : collatéral et compensation centrale

**Le mouvement de fond.** *Pour réduire le risque de crédit, le marché de gré à gré a adopté — ou a été contraint d'adopter — certaines des procédures utilisées par les bourses.*

**La collatéralisation.** Deux sociétés A et B ont un dérivé OTC. Chaque jour la transaction est **valorisée** : si sa valeur pour A augmente de $X$ (elle baisse donc de $X$ pour B), **B verse $X$ à A**, et réciproquement.

⚠️ **Ce n'est pas un règlement quotidien.** *Le contrat n'est pas réglé quotidiennement, comme dans le cas des futures. Les versements sont un dépôt de garantie destiné à assurer que les obligations seront honorées.* Des **intérêts sont payés** sur la totalité des fonds déposés. La différence est juridique et fiscale, mais l'effet économique est proche.

**La compensation centrale.** Depuis la crise de 2007-2009, des lois imposent le recours à des chambres de compensation pour certaines transactions OTC. Le schéma : A et B négocient normalement, puis présentent l'opération à une **contrepartie centrale** qui, si elle l'accepte, **devient la contrepartie des deux**, prend leur risque de crédit et le gère par **marge initiale et marges de variation quotidiennes**.

| Avantage invoqué | Contenu |
|---|---|
| Collatéral | il devra **automatiquement** être déposé |
| Risque de crédit | il sera (espère-t-on) **réduit** dans le système |
| Transparence | les opérations OTC deviendront **plus visibles** |

⚠️ **Hull met une réserve en note :** *l'impact des chambres de compensation sur le risque de crédit dépend du **nombre** de chambres et de la **proportion** des opérations qui y sont compensées* (Duffie & Zhu, 2010). Multiplier les chambres peut **détruire** le bénéfice de compensation multilatérale.

**Le risque systémique** — la préoccupation centrale des gouvernements depuis 2007. *Le risque qu'un défaut d'une institution financière crée un « effet domino » entraînant les défauts d'autres institutions et menaçant la stabilité du système financier.* Le mécanisme : la banque A fait défaut → B subit une perte énorme sur ses opérations avec A → B fait défaut → C, exposée à A **et** à B, subit une perte massive… Le système a survécu à Drexel (1990) et Lehman (2008), mais pendant la tourmente de 2007-2008 **beaucoup de grandes institutions ont été sauvées plutôt que laissées faire faillite**, précisément par crainte du risque systémique.

<details class="details--riche">
<summary>

**Les deux cas d'école du chapitre : LTCM et AIG**

</summary>

**LTCM — quand la collatéralisation ne suffit pas.** Le fonds, créé au milieu des années 1990, **collatéralisait toujours** ses transactions. Stratégie : l'**arbitrage de convergence**. Il trouvait deux obligations X et Y du **même émetteur**, promettant les **mêmes flux**, X étant **moins liquide** que Y. Le marché valorisant la liquidité, $P_X<P_Y$ ; LTCM **achetait X, shortait Y** et attendait la convergence.

*Le raisonnement sur le collatéral.* Si les taux montent, les **deux** obligations baissent d'à peu près autant : le collatéral versé sur X compense celui reçu sur Y. Si les taux baissent, symétriquement. **Donc aucune sortie de fonds nette attendue.**

*Ce qui s'est produit.* Août 1998 : la Russie fait défaut → **fuite vers la qualité**. Les investisseurs valorisent les instruments **liquides** bien plus que d'habitude → l'**écart** entre liquide et illiquide **explose**. Les obligations achetées baissent, celles shortées montent : **collatéral à verser des deux côtés simultanément**. Le fonds, **très fortement endetté**, doit déboucler ses positions et perd environ **4 milliards de dollars**.

⚠️ **La leçon.** *S'il avait été moins endetté, il aurait probablement survécu à la fuite vers la qualité et aurait pu attendre que les prix se rapprochent à nouveau.* Le pari sur la convergence n'était pas faux — c'est le **levier** qui a supprimé le droit d'attendre. Le risque de **liquidité de financement** tue avant que le risque de marché ait tort.

**AIG — quand l'absence de collatéral suffit.** Avant la crise, l'assureur AIG a vendu une protection contre un **volume énorme** de risques de crédit liés aux subprimes. Comme il était noté **AAA** au moment des négociations, ses contreparties **n'exigeaient pas de collatéral**. Les pertes ont conduit à un sauvetage public de **85 milliards de dollars**.

⚠️ **La législation ne referme pas complètement la brèche.** *Il est douteux que la loi sur les chambres de compensation empêche à elle seule des entreprises de prendre des risques aussi grands que ceux d'AIG à l'avenir*, parce qu'elle ne vise que les transactions OTC **standardisées** — et celles d'AIG étaient **non standard**. Le vrai remède est la **collatéralisation obligatoire des contrats non standard**.

</details>

## 🟡 Concept 6 — Lire une cotation de futures

Structure d'une ligne : **Open · High · Low · Settlement · Change · Volume · Open interest**.

| Colonne | Sens exact |
|---|---|
| **Open** | représentatif des prix **immédiatement après l'ouverture** |
| High / Low | extrêmes **atteints dans la journée** |
| **Settlement** | *le prix utilisé pour calculer les gains et pertes quotidiens et les exigences de marge* — généralement le prix traité **juste avant la fin de séance** (13 h 30 pour l'or) |
| **Change** | variation du prix de règlement par rapport à la **veille** |
| **Volume** | nombre de contrats **échangés** dans la journée |
| **Open interest** | nombre de contrats **en vie** — soit le nombre de positions longues, soit, ce qui revient au même, le nombre de positions courtes |

**Exemple (or COMEX, 100 onces, dollars par once, 26 mai 2010).** Juin 2010 : ouverture **1 203,80**, extrêmes **1 201,00 / 1 216,90**, règlement **1 213,40**, volume **4 881**, position ouverte **156 156**. Échéances suivantes (règlement) : juillet **1 214,20** · août **1 215,30** · octobre **1 217,50** · décembre **1 219,90** · juin 2011 **1 227,80**.

⚠️ **Le passage du règlement à votre compte.** Le texte de Hull illustre : *le prix de règlement était de 1 213,40, en hausse de 15,40 sur la séance précédente. Un investisseur long d'un contrat verrait son solde de marge augmenter de 1 540 dollars* $(=100\times15{,}40)$, un investisseur court le verrait **baisser** d'autant. Notez que la colonne *Change* du tableau 2.2 affiche **8,50** pour ce même contrat : les deux chiffres du livre ne concordent pas. **Ce qui compte est la règle** — $\text{variation du solde}=\text{taille du contrat}\times\text{variation du prix de règlement}$ — et non la valeur particulière.

⚠️ **Le volume peut dépasser la position ouverte.** C'était le cas pour l'or juin 2010 le 26 mai. *Cela indique que de nombreux traders ayant pris des positions dans la journée les ont dénouées avant la fin de la séance* — ce sont les **day traders**.

**Structure par terme.**

| Motif | Nom | Illustration du livre |
|---|---|---|
| $F$ **croissant** en maturité | **marché normal** | or le 26 mai 2010 : de 1 213,40 (juin 2010) à 1 227,80 (juin 2011) |
| $F$ **décroissant** en maturité | **marché inversé** | pétrole le 15 octobre 2007 : 86,13 · 85,13 · 84,25 · 83,41 · 82,69 · 82,05 (nov. 2007 → avril 2008) |
| Mélange | saisonnalité | soja le 26 mai 2010 : d'abord décroissant, puis croissant |

⚠️ **Contango et backwardation ne sont pas exactement synonymes de normal et inversé.** Hull le précise en note : *au sens strict, comme l'expliquera le chapitre 5, ces termes désignent le fait que le prix du **sous-jacent** est attendu en hausse ou en baisse au cours du temps* — et non la seule pente de la courbe des futures.

## 🟡 Concept 7 — La livraison

**Très peu de contrats vont jusqu'à la livraison** — la plupart sont dénoués tôt. *Néanmoins, c'est la possibilité d'une livraison finale qui détermine le prix futures.*

**La procédure.**

1. Le **vendeur** (position courte) choisit **quand** livrer ; son courtier émet un **avis d'intention de livrer** à la chambre, précisant le nombre de contrats et, pour les matières premières, le **lieu** et le **grade**.
2. La bourse choisit une partie **longue** pour accepter la livraison. **Ce n'est pas la contrepartie d'origine** : la règle usuelle est de transmettre l'avis à la **position longue ouverte la plus ancienne**.
3. Les longs **doivent** accepter l'avis ; si les avis sont transférables, ils disposent d'un **court délai (une demi-heure environ)** pour trouver un autre long qui l'accepte.
4. Matières premières : accepter un **récépissé d'entrepôt** contre paiement immédiat — les frais de stockage passent alors à l'acheteur. Actifs financiers : **virement**. Le prix payé est le **dernier prix de règlement**, ajusté si la bourse le prévoit.
5. Durée totale de la procédure : **deux à trois jours**.

**Les trois dates critiques.**

| Date | Définition |
|---|---|
| **Premier jour d'avis** | premier jour où un avis d'intention de livrer peut être déposé |
| **Dernier jour d'avis** | le dernier |
| **Dernier jour de cotation** | généralement **quelques jours avant** le dernier jour d'avis |

⚠️ **La règle de survie du détenteur d'une position longue.** *Pour éviter le risque de devoir prendre livraison, un investisseur long doit dénouer ses contrats **avant le premier jour d'avis***. Pas avant le dernier jour de cotation — **avant le premier jour d'avis**.

**Règlement en espèces.** Certains futures financiers (indices, ch. 3) sont réglés en cash *parce qu'il est peu commode ou impossible de livrer le sous-jacent* — livrer le S&P 500 supposerait de livrer un portefeuille de **500 actions**. Tous les contrats sont alors déclarés clos à une date prédéterminée, le prix de règlement final étant le **prix spot** à l'ouverture ou à la clôture de ce jour. Pour le futures S&P 500 du CME Group : **troisième vendredi** du mois de livraison, règlement au **prix d'ouverture**.

## 🟡 Concept 8 — Intervenants et ordres

**Qui exécute.** Les *futures commission merchants* (**FCM**) suivent les instructions de leurs clients contre commission ; les *locals* opèrent **pour leur propre compte**.

**Les trois horizons du spéculateur.**

| Type | Horizon | Objectif |
|---|---|---|
| **Scalper** | quelques **minutes** | profiter de très petites variations |
| **Day trader** | **moins d'une journée** | refuse le risque d'une mauvaise nouvelle **pendant la nuit** |
| **Position trader** | **longue période** | viser les **mouvements majeurs** |

**Les types d'ordres — à distinguer soigneusement.**

| Ordre | Mécanique | Usage |
|---|---|---|
| **Au marché** (*market*) | exécution **immédiate** au meilleur prix disponible | entrer ou sortir sans délai |
| **À cours limité** (*limit*) | exécuté **seulement** à ce prix ou mieux ; peut ne **jamais** être exécuté | acheter à 30 = à 30 **ou moins** |
| **Stop** / *stop-loss* | devient un ordre **au marché** dès que le prix est touché | **limiter la perte** |
| **Stop–limit** | devient un ordre **à cours limité** dès que le stop est touché — **deux prix** à spécifier | limiter la perte **sans** subir n'importe quel prix |
| **MIT** (*market-if-touched*, ou *board order*) | devient un ordre au marché dès qu'une **transaction** a lieu au prix visé ou mieux | **prendre ses profits** |
| **Discrétionnaire** (*market-not-held*) | ordre au marché, mais le courtier peut **retarder** pour obtenir un meilleur prix | confiance au courtier |

⚠️ **Stop et MIT sont exactement symétriques.** *Un ordre stop est conçu pour plafonner la perte en cas de mouvement défavorable. Par contraste, un market-if-touched est conçu pour s'assurer que les profits sont pris si des mouvements suffisamment favorables se produisent.* Même mécanique de déclenchement, but opposé.

**Exemples chiffrés du livre.** Stop de **vente à 30** émis alors que le marché est à **35** : devient un ordre de vente si et quand le prix **tombe à 30**. Stop–limit **d'achat** avec stop **40** et limite **41**, marché à **35** : dès qu'une offre ou une demande apparaît à **40**, l'ordre devient un ordre limité à **41**. Si stop et limite sont **égaux**, on parle de *stop-and-limit*.

**Conditions de durée.** Sauf mention contraire, un ordre est un **ordre du jour** et expire à la fin de la séance. *Time-of-day* : exécutable seulement sur une plage horaire. *Open* / *good-till-canceled* : valable jusqu'à exécution ou fin de cotation du contrat. *Fill-or-kill* : exécuté **immédiatement** ou **pas du tout**.

## 🟢 Concept 9 — Régulation, comptabilité, fiscalité

**Régulation (États-Unis).** La **CFTC** (créée en **1974**) licencie les bourses et approuve les contrats — *pour être approuvé, un contrat doit avoir une utilité économique*, ce qui signifie généralement qu'il doit servir les besoins des **hedgers** autant que ceux des spéculateurs. La **NFA** (créée en **1982**) a repris une partie de ces responsabilités au sein de la profession. SEC, Fed et Trésor revendiquent périodiquement une compétence : la SEC a de fait un **veto** sur les nouveaux contrats d'indices d'actions ou d'obligations, mais la responsabilité de base reste à la **CFTC**.

**Deux irrégularités classiques.**

| Abus | Mécanique | Riposte du régulateur |
|---|---|---|
| **Corner** | un groupe prend une **énorme position longue** *et* contrôle l'offre physique ; à l'approche de l'échéance il ne dénoue pas, les contrats en vie **dépassent** le disponible livrable ; les courts, désespérés, font **exploser** les prix futures **et** spot | relever les **marges**, durcir les **limites de position**, interdire les trades augmentant la position, **forcer** le débouclage |
| **Front running** | un trader utilise sa connaissance des **ordres clients** pour opérer d'abord pour lui-même | poursuites — enquête du FBI en sous-marin sur le CBOT et le CME, révélée début **1989** |

> **Le corner de référence.** *La tentative des frères Hunt d'accaparer le marché de l'argent en 1979-80 : entre le milieu de 1979 et le début de 1980, leurs activités ont fait passer le prix de **6 dollars à 50 dollars l'once**.*

**Comptabilité.** Les variations de valeur de marché doivent être **reconnues quand elles surviennent**, *sauf* si le contrat est qualifié de **couverture** : alors gains et pertes sont reconnus **dans la même période** que ceux de l'élément couvert (*hedge accounting*).

<details class="details--riche">
<summary>

**Exercice résolu — comptabilisation d'une couverture sur maïs**

</summary>

**Énoncé.** Exercice comptable clos en décembre. En **septembre 2011**, achat d'un futures maïs **mars 2012**, dénoué **fin février 2012**. Prix : **250** cents/boisseau à l'entrée, **270** fin 2011, **280** au dénouement. Contrat : **5 000 boisseaux**.

*Étape 1 — sans qualification de couverture.* Le gain est reconnu **au fil de l'eau**.

$$2011:\ 5\,000\times(2{,}70-2{,}50)=\mathbf{1\,000\ \text{dollars}}\qquad 2012:\ 5\,000\times(2{,}80-2{,}70)=\mathbf{500\ \text{dollars}}$$

*Étape 2 — avec qualification de couverture.* Si l'entreprise couvre un achat de 5 000 boisseaux prévu en février 2012, **la totalité du gain de 1 500 dollars est reconnue en 2012**. *Étape 3 — pourquoi c'est le bon traitement.* L'effet du futures est de garantir un prix d'achat proche de **250 cents**. Or cet achat a lieu **en 2012**. *Le traitement comptable reflète que ce prix est payé en 2012.* Reconnaître 1 000 dollars en 2011 aurait affiché un profit sans la charge correspondante.

**FAS 133 (juin 1998)** — *Accounting for Derivative Instruments and Hedging Activities* — s'applique à **tous** les dérivés (futures, forwards, swaps, options), impose leur inscription **au bilan** à la juste valeur (auparavant ils étaient **hors bilan**, ce qui faisait une partie de leur attrait), accroît les obligations d'information et **restreint fortement** l'usage du *hedge accounting* : l'instrument doit être **hautement efficace** pour compenser l'exposition, avec évaluation de cette efficacité **tous les trois mois**. Équivalent international : **IAS 39**.

</details>

**Fiscalité américaine — les deux questions.** *La nature* du gain (plus-value ou revenu ordinaire) et *le moment* de sa reconnaissance.

| Contribuable | Traitement |
|---|---|
| **Société** | plus-values imposées au **même taux** que le revenu ordinaire ; pertes en capital déductibles **seulement** des plus-values, reportables **3 ans en arrière et 5 ans en avant** |
| **Particulier** | plus-values **court terme** au taux du revenu ordinaire ; **long terme** (détention $>1$ an) plafonnées à **15 %** ; pertes déductibles des plus-values plus **3 000 dollars** de revenu ordinaire, reportables **indéfiniment** |

**La règle « 60/40 ».** Les positions sur futures sont réputées **dénouées le dernier jour de l'année fiscale**. Pour un particulier, les gains et pertes qui en résultent sont traités comme **60 % long terme et 40 % court terme**, *sans considération de la durée de détention*. Report possible **3 ans en arrière**.

⚠️ **Les couvertures sont exemptées de la règle 60/40 — et la définition fiscale du *hedge* n'est pas la définition comptable.** Fiscalement, une transaction de couverture est conclue dans le cours normal des affaires principalement pour : **1.** réduire le risque de prix ou de change sur des biens détenus ou à détenir pour produire un **revenu ordinaire** ; **2.** réduire le risque de prix, de taux ou de change sur des **emprunts** du contribuable. Elle doit être **clairement identifiée comme telle** dans les livres ; les gains et pertes sont alors du **revenu ordinaire**, reconnus **en même temps** que ceux de l'élément couvert.

## 🔴 Concept 10 — Forward contre futures

|  | **Forward** | **Futures** |
|---|---|---|
| Nature | contrat **privé** entre deux parties | négocié **en bourse** |
| Standardisation | **non** standardisé | contrat **standardisé** |
| Livraison | une **seule** date spécifiée | **plage** de dates |
| Règlement | **en fin de contrat** | **quotidien** |
| Issue habituelle | livraison ou règlement en espèces **a lieu** | contrat **dénoué avant** l'échéance |
| Risque de crédit | **présent** | **quasi nul** |

<details class="details--riche">
<summary>

**Exercice résolu — même gain, chronologie opposée**

</summary>

**Énoncé.** Le cours à terme 90 jours de la livre est **1,5000**, et c'est aussi le prix futures d'un contrat livrable dans exactement 90 jours. A est long de **£1 M en forward** ; B est long de **£1 M en futures**. Le spot à 90 jours s'avère être **1,7000**. Comparer.

*Étape 1 — le nombre de contrats de B.* Chaque contrat porte sur **£62 500**, donc $1\,000\,000/62\,500=\mathbf{16}$ contrats. *Étape 2 — le gain de A.* $(1{,}7000-1{,}5000)\times1\,000\,000=\mathbf{200\,000}$ dollars, **réalisés en une fois le 90ᵉ jour**. *Étape 3 — le gain de B.* Le **même** total de 200 000 dollars, mais **étalé sur les 90 jours** par le règlement quotidien. *Certains jours B réalisera une perte, d'autres un gain ; mais au total, pertes et gains compensés, il y a un gain de 200 000 dollars sur la période.* *Étape 4 — ce qui diffère vraiment.* Le **calendrier des flux**, donc la **valeur temps** de l'argent et le **risque de trésorerie** : B doit pouvoir financer les appels de marge en cours de route. C'est cette différence qui produira, au chapitre 5, un écart théorique entre prix forward et prix futures quand les taux sont **stochastiques**.

</details>

**Cotations de change — le piège d'unité.** Les prix **futures** dont une jambe est le dollar américain sont **toujours** cotés en **dollars (ou cents) par unité de devise étrangère**. Les prix **forward** sont cotés **comme les prix spot**.

| Devise | Cotation forward | Comparable directement au futures ? |
|---|---|---|
| GBP, EUR, AUD, NZD | dollars par unité de devise | **oui** |
| Autres majeures (ex. CAD) | unités de devise **par dollar** | **non — il faut inverser** |

**Exemple.** Un prix futures de **0,9500 USD par CAD** correspond à un prix forward de $1/0{,}9500=\mathbf{1{,}0526}$ **CAD par USD**.

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| Une suite de prix de règlement, une marge initiale et une marge de maintien | **reconstituer le compte** | tableau jour par jour + règle « retour à l'**initiale** » |
| « à quel prix un appel de marge sera-t-il déclenché ? » | **seuil de prix** | résoudre $\text{taille}\times(F-F_0)=\text{maintien}-\text{initiale}$ |
| « volume 4 881, position ouverte 156 156 » | **interprétation** | volume = échanges du jour ; open interest = contrats en vie |
| Une courbe de prix par échéance | **normal ou inversé** | croissant = normal ; décroissant = inversé |
| Un gain comptable réparti sur deux exercices | ***hedge accounting*** | qualifié → **tout** dans l'année de l'élément couvert |
| Deux cotations de change dont une en CAD/USD | **inversion d'unité** | $1/x$ |
| « quand dois-je sortir pour éviter la livraison ? » | **dates critiques** | **avant le premier jour d'avis** |

## Comment résoudre ce type d'exercice

**Protocole compte de marge — 6 étapes.**

1. Calculer la **taille totale** de la position : $n_{\text{contrats}}\times$ taille unitaire (attention aux unités : onces, boisseaux, livres).
2. Fixer le **sens** : gain $=+\,$taille$\times\Delta F$ si **long**, $-\,$taille$\times\Delta F$ si **court**.
3. Poser $\text{solde}_0=$ marge initiale **totale** ($n\times$ marge unitaire).
4. Pour chaque jour : $\text{solde}_t=\text{solde}_{t-1}+\text{gain}_t$.
5. **Tester** $\text{solde}_t<\text{maintien total}$ ; si oui, appel $=\text{initiale totale}-\text{solde}_t$, versé **le lendemain**.
6. Contrôler à la fin : $\text{solde final}=\text{initiale}+\sum\text{appels}+\text{gain cumulé}$.

**Protocole seuil d'appel de marge — 3 étapes.**

1. La perte tolérable est $\text{initiale}-\text{maintien}$ (par contrat, ou en total — soyez cohérent).
2. La convertir en variation de prix : $\Delta F^\ast=\dfrac{\text{initiale}-\text{maintien}}{\text{taille de la position}}$.
3. Le prix critique est $F_0-\Delta F^\ast$ pour un **long**, $F_0+\Delta F^\ast$ pour un **court**.

<details class="details--riche">
<summary>

**Exercice résolu — à partir de quel prix l'appel tombe-t-il ?**

</summary>

**Énoncé.** Même position que le tableau 2.1 : long de 2 contrats or (200 onces), entrée à 1 250,00, marge initiale totale 12 000, maintien total 9 000. À partir de quel prix de règlement l'appel de marge est-il déclenché ?

*Étape 1 — perte tolérable.* $12\,000-9\,000=\mathbf{3\,000}$ dollars. *Étape 2 — en prix.* $\Delta F^\ast=\dfrac{3\,000}{200}=\mathbf{15}$ dollars l'once. *Étape 3 — le prix critique.* Position **longue** → le danger est la **baisse** : $1\,250-15=\mathbf{1\,235{,}00}$ dollars l'once. Tout règlement **strictement** sous 1 235,00 déclenche l'appel. *Étape 4 — confronter au tableau.* Le premier règlement sous 1 235,00 est celui du **jour 7 : 1 229,90** — et c'est bien là que tombe le premier appel . Les jours 1 à 6 restent au-dessus (1 241,00 · 1 238,30 · 1 244,60 · 1 241,30 · 1 240,10 · **1 236,20**) — le jour 6 passe à **1,20 dollar** du seuil.

⚠️ **Ce raccourci ne vaut que tant qu'aucun appel n'a encore eu lieu.** Après un appel, le solde est remonté à 12 000 et le **nouveau** prix de référence pour le calcul est le règlement du jour de l'appel, pas le prix d'entrée. Après le jour 7 (règlement 1 229,90, solde 12 000), le seuil suivant est $1\,229{,}90-15=1\,214{,}90$ — et le règlement du **jour 11, 1 211,00**, passe effectivement dessous .

</details>

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Ramener le compte à la **marge de maintien** après un appel | On revient à la **marge initiale** ; le maintien n'est qu'un **seuil de déclenchement** |
| Oublier de multiplier par le nombre de contrats **et** par la taille unitaire | 2 contrats or $=2\times100=\mathbf{200}$ onces |
| Verser l'appel **le jour même** | L'investisseur a jusqu'à la **fin du jour suivant** |
| Recalculer le seuil d'appel depuis le prix d'**entrée** après un premier appel | Le repère devient le **règlement du jour de l'appel** |
| Confondre **volume** et **open interest** | Le volume peut **dépasser** la position ouverte (day traders) |
| Croire que la chambre de compensation impose un maintien à ses membres | Marge **d'origine seulement** — solde ajusté **exactement** chaque soir |
| Croire que le collatéral OTC est un règlement quotidien | C'est un **dépôt de garantie**, **rémunéré**, le contrat n'est **pas** réglé |
| Sortir d'un long au **dernier jour de cotation** | Trop tard : sortir **avant le premier jour d'avis** |
| Comparer un forward CAD/USD à un futures USD/CAD | **Inverser** : $0{,}9500\ \text{USD/CAD}=1{,}0526\ \text{CAD/USD}$ |
| Croire que *contango* = marché normal | Au sens strict, ces termes portent sur l'**évolution attendue du spot** (ch. 5) |
| Appliquer la règle 60/40 à une couverture | Les **hedges** en sont **exemptés** — revenu ordinaire |

## 📌 Ultimate Review

**Les trois formules.**

$$\text{gain}_t=\text{taille}\times(\!F_t-F_{t-1}),\qquad \text{appel}=\text{marge initiale}-\text{solde},\qquad \Delta F^\ast=\frac{\text{initiale}-\text{maintien}}{\text{taille}}$$

**La chaîne des garanties.** investisseur → courtier → membre compensateur → chambre. Le membre n'a **pas** de marge de maintien. Marginage **net** presque partout.

**Les repères chiffrés.** Maintien ≈ **75 %** de l'initiale · bons du Trésor acceptés à **90 %**, actions à **50 %** · procédure de livraison **2 à 3 jours** · délai de transfert d'un avis **≈ 30 min** · S&P 500 : **3ᵉ vendredi**, prix d'**ouverture** · CFTC **1974**, NFA **1982** · plus-value longue durée particulier **15 %** · règle **60/40** · Hunt : argent de **6 à 50 dollars** l'once · LTCM **≈ 4 Md** · AIG **85 Md** · 19 octobre 1987 : S&P 500 **−20 %**.

**Les six différences forward/futures.** privé/bourse · non standardisé/standardisé · une date/plage · fin de vie/quotidien · livraison/dénouement · risque de crédit/quasi nul.

**Les deux règles de survie.** Sortir **avant le premier jour d'avis**. Et : *un futures est dénoué et réécrit à un nouveau prix chaque jour*.

## 🧠 Active Recall

<details><summary>Pourquoi le prix futures converge-t-il vers le prix spot ? Donner les deux arbitrages.</summary>

Si **$F>S$** pendant la livraison : **vendre** un futures, **acheter** l'actif, **livrer** → profit certain $F-S$ ; les ventes de futures font **baisser** $F$. Si **$F<S$** : les entreprises qui veulent l'actif prennent une position **longue** et attendent la livraison (moins cher qu'au comptant) ; leurs achats font **monter** $F$. Les deux forces se rejoignent, donc $F\to S$.

</details>

<details><summary>Un investisseur long de 2 contrats or subit un solde de 7 980 avec initiale 12 000 et maintien 9 000. Quel est l'appel ?</summary>

$12\,000-7\,980=\mathbf{4\,020}$ dollars. **Pas** $9\,000-7\,980=1\,020$ : ce dernier chiffre mesure seulement de combien on est passé **sous le seuil de déclenchement**. L'appel ramène toujours à la **marge initiale**.

</details>

<details><summary>Qu'est-ce que l'open interest, et pourquoi le volume peut-il le dépasser ?</summary>

L'**open interest** est le nombre de contrats **en vie** — c'est-à-dire le nombre de positions longues, ou, ce qui revient au même, le nombre de positions courtes. Le **volume** est le nombre de contrats **échangés** dans la journée. Le volume dépasse la position ouverte quand beaucoup de traders ouvrent **et referment** une position dans la même séance : ce sont les **day traders**.

</details>

<details><summary>Pourquoi un membre compensateur n'a-t-il pas de marge de maintien ?</summary>

Parce que son compte est ramené **exactement** au niveau requis chaque soir : *le solde du compte doit être maintenu chaque jour à un montant égal à la marge d'origine multipliée par le nombre de contrats en cours*. Il n'y a donc pas de plage de tolérance à surveiller — il ajoute ou retire des fonds **tous les jours**. Le maintien n'existe que pour éviter des appels quotidiens aux **investisseurs**.

</details>

<details><summary>Expliquer pourquoi la stratégie de LTCM a échoué alors que son raisonnement sur le collatéral était correct.</summary>

Le raisonnement supposait que les deux obligations bougeaient **ensemble** : hausse ou baisse des taux → mouvements parallèles → collatéral versé ≈ collatéral reçu. La fuite vers la qualité d'août 1998 a fait bouger l'**écart** lui-même : le liquide monte, l'illiquide baisse → **collatéral à verser des deux côtés en même temps**. Le fonds, **très fortement endetté**, a dû déboucler et a perdu **≈ 4 milliards**. La convergence prévue se serait probablement produite — *s'il avait été moins endetté, il aurait pu attendre*. C'est le **levier**, pas la stratégie, qui a supprimé le droit d'attendre.

</details>

<details><summary>Distinguer un ordre stop, un ordre limité et un ordre MIT.</summary>

**Limité** : exécuté **seulement** au prix indiqué ou meilleur ; peut ne jamais s'exécuter. **Stop** : devient un ordre **au marché** dès que le prix est touché — objectif **limiter la perte**. **MIT** : devient aussi un ordre au marché quand le prix est touché — mais placé **du côté favorable**, objectif **prendre les profits**. Stop et MIT ont la même mécanique et des buts opposés.

</details>

<details><summary>Quel est le mécanisme d'un « corner », et comment le régulateur y répond-il ?</summary>

Un groupe prend une **énorme position longue** *et* contrôle la **livraison physique**. À l'approche de l'échéance il ne dénoue pas : les contrats en vie **dépassent** la quantité livrable. Les positions courtes, incapables de livrer, se ruent pour se déboucler → **flambée** des prix futures **et** spot. Riposte : **relever les marges**, **durcir les limites de position**, **interdire** les trades qui augmentent la position ouverte d'un spéculateur, **forcer** le débouclage. Référence : les frères Hunt sur l'argent, **6 → 50 dollars l'once** en 1979-80.

</details>

<details class="details--riche">
<summary>

Pourquoi le *hedge accounting* reporte-t-il un gain de 2011 sur 2012 dans l'exemple du maïs ?

</summary>

Parce que l'objet économique du futures est de **fixer à 250 cents** le prix d'un achat de maïs qui aura lieu **en février 2012**. Reconnaître 1 000 dollars de gain en 2011 afficherait un profit **sans la charge correspondante**. Le traitement de couverture reconnaît la **totalité des 1 500 dollars en 2012**, en même temps que l'achat couvert. Depuis **FAS 133**, ce traitement exige que l'instrument soit **hautement efficace**, avec évaluation **trimestrielle**.

</details>

<details><summary>Deux investisseurs, l'un en forward, l'autre en futures, sur £1 M à 1,5000 avec un spot final de 1,7000. Qui gagne le plus ?</summary>

**Ni l'un ni l'autre** : les deux gagnent **200 000 dollars**. A (forward) les réalise **en une fois** au 90ᵉ jour ; B (futures, **16 contrats** de £62 500) les accumule **jour après jour**, avec des journées de perte et des journées de gain. La vraie différence est le **calendrier des flux** — donc la valeur temps et le risque de trésorerie sur les appels de marge.

</details>

<details><summary>Un futures cote 0,9500 USD par CAD. Quel est le prix forward équivalent, et pourquoi la question se pose-t-elle ?</summary>

$1/0{,}9500=\mathbf{1{,}0526}$ **CAD par USD**. La question se pose parce que les **futures** sur devises contre dollar sont **toujours** cotés en dollars par unité de devise étrangère, alors que les **forwards** suivent la convention **spot** — qui, pour le dollar canadien et la plupart des devises hors GBP, EUR, AUD, NZD, s'exprime en **unités de devise par dollar**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Qui choisit le grade et le lieu de livraison ? | La partie en position **courte** (le vendeur) |
| Taille du contrat T-bond CME ? | Nominal **100 000 dollars** |
| Contrat Mini Nasdaq 100 ? | **20 fois** l'indice (contre 100 fois) |
| Grades du maïs CME ? | Standard **No. 2 Yellow** ; No. 1 $+1{,}5$ ¢, No. 3 $-1{,}5$ ¢ |
| Mois de livraison du maïs ? | Mars, mai, juillet, septembre, décembre |
| Cotation du T-bond ? | Dollars et **trente-deuxièmes** |
| But des limites de prix quotidiennes ? | Empêcher les mouvements dus aux **excès spéculatifs** |
| But des limites de position ? | Empêcher un spéculateur d'exercer une **influence indue** |
| Que devient $F$ à l'approche de la livraison ? | Il **converge** vers $S$ |
| Marge initiale ? | Somme déposée **à l'entrée** |
| Marge de maintien ? | **Seuil** de déclenchement, ≈ **75 %** de l'initiale |
| À quel niveau ramène un appel de marge ? | À la **marge initiale** |
| Délai pour verser la marge de variation ? | Fin du **jour suivant** |
| Formule du gain quotidien ? | $\text{taille}\times(F_t-F_{t-1})$ |
| Titres acceptés en marge initiale ? | T-bills à **90 %**, actions à **50 %** |
| Qui fixe les minima de marge ? | La **bourse** ; le courtier peut exiger **plus** |
| Marge et position courte ? | **Mêmes** exigences qu'en position longue |
| Le membre compensateur a-t-il un maintien ? | **Non** — marge d'origine, ajustée exactement chaque soir |
| Marginage brut ou net ? | **Net** dans la plupart des bourses |
| Long 20 / court 15 : marge brute ? nette ? | **35** contrats / **5** contrats |
| Que s'est-il passé le 19 octobre 1987 ? | S&P 500 **−20 %**, courtiers en faillite, **chambres solvables** |
| Collatéralisation OTC : est-ce un règlement ? | **Non** — dépôt de garantie **rémunéré** |
| Perte de LTCM ? | **≈ 4 milliards de dollars** (août 1998) |
| Stratégie de LTCM ? | **Arbitrage de convergence** liquide/illiquide |
| Sauvetage d'AIG ? | **85 milliards de dollars** |
| Pourquoi AIG n'avait-il pas déposé de collatéral ? | Notation **AAA** à la négociation |
| Risque systémique ? | Effet **domino** de défauts entre institutions |
| Prix de règlement ? | Prix servant aux **gains quotidiens et aux marges** |
| Open interest ? | Nombre de contrats **en vie** |
| Volume &gt; open interest signifie ? | Beaucoup de **day traders** |
| Marché normal ? | $F$ **croissant** en maturité |
| Marché inversé ? | $F$ **décroissant** en maturité |
| Quand sortir pour éviter la livraison ? | **Avant le premier jour d'avis** |
| Qui reçoit l'avis de livraison ? | La position longue **la plus ancienne** |
| Durée de la procédure de livraison ? | **2 à 3 jours** |
| Règlement du futures S&P 500 ? | **3ᵉ vendredi**, prix d'**ouverture** |
| Scalper / day trader / position trader ? | Minutes / moins d'un jour / longue période |
| Ordre stop ? | Devient **au marché** au prix touché — **limite la perte** |
| Ordre MIT ? | Devient au marché au prix touché — **prend les profits** |
| Ordre *fill-or-kill* ? | Exécuté **immédiatement** ou pas du tout |
| Création de la CFTC ? de la NFA ? | **1974** / **1982** |
| Condition d'approbation d'un contrat ? | Avoir une **utilité économique** (servir les hedgers) |
| Corner de référence ? | Frères **Hunt**, argent **6 → 50 dollars** l'once (1979-80) |
| *Front running* ? | Utiliser la connaissance des **ordres clients** pour soi |
| Apport de FAS 133 ? | Dérivés **au bilan** à la juste valeur, *hedge accounting* restreint |
| Règle 60/40 ? | **60 %** long terme, **40 %** court terme, sans égard à la durée |
| Les couvertures y sont-elles soumises ? | **Non** — revenu ordinaire |
| Six différences forward/futures ? | Privé/bourse, non standardisé/standardisé, une date/plage, fin de vie/quotidien, livraison/dénouement, crédit/quasi nul |
| 0,9500 USD par CAD en forward ? | $1/0{,}9500=\mathbf{1{,}0526}$ **CAD par USD** |
