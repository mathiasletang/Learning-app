# Fiche 76 — Stratégies de couverture par contrats futures

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 3 « Hedging Strategies Using Futures » (annexe : CAPM) |
| **Difficulté** | Must know — le premier chapitre vraiment quantitatif du livre |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiches 74 et 75 |
| **Concepts clés** | Couverture courte/longue, base, risque de base, couverture croisée, ratio de couverture à variance minimale, efficacité de couverture, *tailing*, futures sur indices, bêta, CAPM, *stack and roll* |
| **Poids à l'examen** | $h^\ast=\rho\sigma_S/\sigma_F$ et $N^\ast$ · le **prix effectif $=F_1+b_2$** · le nombre de contrats pour **modifier un bêta** · le calcul du gain d'un *roll*. |

## 🎯 Vue d'ensemble

```
PRINCIPE   prendre une position futures qui NEUTRALISE l'exposition existante
COURTE     on possède (ou on possédera) l'actif → on VEND des futures
LONGUE     on devra acheter l'actif           → on ACHÈTE des futures
BASE       b = S − F        prix effectif = F₁ + b₂       ← toute l'imperfection est là
CROISÉE    h* = ρ σ_S/σ_F           N* = h* Q_A/Q_F      (tailing : h* V_A/V_F)
INDICES    N* = β V_A/V_F           β → β*  :  (β−β*) V_A/V_F contrats
ROULEMENT  stack and roll — et le piège de trésorerie de Metallgesellschaft
```

**L'objet du chapitre.** *Une couverture parfaite est celle qui élimine complètement le risque. Les couvertures parfaites sont rares.* L'étude de la couverture par futures est donc **l'étude des façons de construire des couvertures aussi proches que possible de la perfection**. On se limite ici aux stratégies *hedge-and-forget* : on prend la position au début, on la dénoue à la fin, **sans ajustement** entre les deux (le chapitre 18 traitera des couvertures dynamiques).

## 🔴 Concept 1 — Couverture courte et couverture longue

**Le principe de neutralisation.** Une entreprise gagne 10 000 dollars par cent de hausse d'une matière première et perd 10 000 dollars par cent de baisse. Le trésorier doit prendre une position **courte** en futures qui produise **exactement l'inverse**. Si le prix baisse, le gain sur les futures compense la perte du métier ; s'il monte, la perte sur les futures est compensée par le gain du métier.

|  | **Couverture courte** (*short hedge*) | **Couverture longue** (*long hedge*) |
|---|---|---|
| Position futures | **vendre** | **acheter** |
| Quand ? | on **possède** l'actif et on le vendra plus tard — ou on le possédera (exportateur qui recevra des euros) | on **devra acheter** l'actif et on veut **fixer le prix maintenant** |
| Exemples du livre | éleveur de porcs prêts dans deux mois · producteur de pétrole · exportateur américain payé en euros | fabricant de cuivre · compagnie aérienne achetant du kérosène |

<details><summary>**Exercice résolu A — la couverture courte du producteur de pétrole**</summary>

**Données.** 15 mai. Un producteur vient de signer la vente de **1 million de barils** au **prix de marché du 15 août**. Spot le 15 mai : **80 dollars** ; futures août : **79 dollars**. Taille du contrat : **1 000 barils**.

*Étape 1 — mesurer l'exposition.* Il gagne **10 000 dollars par cent de hausse** et perd autant par cent de baisse (1 M de barils × 0,01). *Étape 2 — choisir le sens.* Il **possédera** le pétrole → couverture **courte**. *Étape 3 — dimensionner.* $1\,000\,000/1\,000=\mathbf{1\,000}$ contrats vendus. *Étape 4 — scénario baissier, $S_2=75$.* Vente physique : **75 M**. En août, mois de livraison, $F_2\approx S_2=75$ → gain futures $\approx 79-75=\mathbf{4}$ dollars/baril, soit **4 M**. Total $\approx\mathbf{79}$ dollars/baril. *Étape 5 — scénario haussier, $S_2=85$.* Vente physique : **85 M**. Perte futures $\approx 85-79=\mathbf{6}$ dollars/baril. Total $\approx\mathbf{79}$ M à nouveau. *Conclusion.* *Il est facile de voir que dans tous les cas l'entreprise finit avec environ 79 millions de dollars* — c'est-à-dire le **prix futures initial**, pas le prix spot initial de 80.

</details>

<details><summary>**Exercice résolu B — la couverture longue du transformateur de cuivre**</summary>

**Données.** 15 janvier. Il aura besoin de **100 000 livres** de cuivre le 15 mai. Spot : **340 cents/livre** ; futures mai : **320 cents/livre**. Contrat COMEX : **25 000 livres**.

*Étape 1 — sens.* Il **achètera** → couverture **longue**, $100\,000/25\,000=\mathbf{4}$ contrats. *Étape 2 — scénario $S_2=325$ cents.* Gain futures $=100\,000\times(3{,}25-3{,}20)=\mathbf{5\,000}$ dollars ; achat physique $100\,000\times3{,}25=325\,000$ → **coût net 320 000**. *Étape 3 — scénario $S_2=305$ cents.* Perte futures $=100\,000\times(3{,}20-3{,}05)=\mathbf{15\,000}$ ; achat $305\,000$ → **coût net 320 000** à nouveau, soit **320 cents/livre**. *Étape 4 — pourquoi ne pas simplement acheter au comptant le 15 janvier ?* Il paierait **340** au lieu de 320, **plus les frais d'intérêt et de stockage**. Pour une entreprise qui consomme du cuivre en continu, cet inconvénient serait compensé par la commodité d'en avoir en stock (le *rendement de commodité*, section 5.11) ; pour celle qui n'en a besoin qu'en mai, **le futures est préférable**.

</details>

⚠️ **Deux hypothèses simplificatrices sont faites dans ces deux exemples.** (i) La position est **dénouée pendant le mois de livraison** — en pratique *prendre ou faire livraison peut être coûteux et peu commode*, donc les longs dénouent **avant** la période de livraison. (ii) **Pas de règlement quotidien** — en pratique le payoff est réalisé **jour après jour**, ce qui a un petit effet sur la performance (voir le *tailing*, concept 4).

## 🟠 Concept 2 — Faut-il couvrir ? Les trois objections

*Les arguments en faveur de la couverture sont si évidents qu'ils ont à peine besoin d'être énoncés* : la plupart des entreprises **n'ont aucune compétence particulière** pour prévoir les taux, les changes ou les prix des matières premières ; se couvrir leur permet de se concentrer sur leur métier. **Et pourtant, en pratique, beaucoup de risques restent non couverts.** Trois raisons.

### 2.1 Les actionnaires peuvent le faire eux-mêmes

| L'argument | La réfutation de Hull |
|---|---|
| L'actionnaire peut se couvrir seul | Il suppose que l'actionnaire a **autant d'information** que la direction sur les risques — *dans la plupart des cas, c'est faux* |
|  | Il ignore les **commissions et coûts de transaction**, **moins chers par dollar couvert** pour les grosses transactions |
|  | La **taille des contrats** rend souvent la couverture individuelle **impossible** |
| **Mais** | L'actionnaire peut **diversifier** bien plus facilement qu'une entreprise : détenir à la fois un consommateur et un producteur de cuivre annule l'exposition |

*Si les entreprises agissent au mieux des intérêts d'actionnaires bien diversifiés, on peut soutenir que la couverture est inutile dans bien des situations. Cependant, la mesure dans laquelle les dirigeants sont en pratique influencés par ce type d'argument reste discutable.*

### 2.2 Se couvrir quand les concurrents ne le font pas

Deux joailliers : **TakeaChance** (ne couvre pas, comme le reste du secteur) et **SafeandSure** (couvre ses achats d'or sur 18 mois).

| Variation du prix de l'or | Effet sur le prix des bijoux | Profit de TakeaChance | Profit de SafeandSure |
|---|---|---|---|
| **Hausse** | hausse | **inchangé** | **augmente** |
| **Baisse** | baisse | **inchangé** | **diminue** |

⚠️ **Le paradoxe complet.** *Une entreprise qui ne couvre pas peut s'attendre à des marges à peu près constantes. Mais une entreprise qui couvre peut s'attendre à des marges qui fluctuent !* Et *dans des conditions extrêmes, la marge de SafeandSure pourrait devenir négative en conséquence de la « couverture » mise en place*. La leçon : **regarder l'image d'ensemble** — toutes les implications d'un changement de prix sur la rentabilité, y compris via les **prix de vente**.

### 2.3 La couverture peut donner un plus mauvais résultat

Reprenons le producteur de pétrole : si le prix **monte** à 89, il perd **10 dollars/baril** sur les futures, soit **10 millions**. La décision était parfaitement logique, mais le trésorier aura du mal à la justifier. Hull met en scène le dialogue :

> **Président :** *C'est terrible. Nous avons perdu 10 millions sur le marché des futures en trois mois. Je veux une explication complète.* **Trésorier :** *Le but des contrats futures était de couvrir notre exposition au prix du pétrole, pas de faire un profit. N'oubliez pas que nous avons gagné 10 millions grâce à l'effet favorable de la hausse du pétrole sur notre activité.* **Président :** *Qu'est-ce que cela vient faire ici ? C'est comme dire qu'il ne faut pas s'inquiéter d'une baisse des ventes en Californie parce qu'elles montent à New York.*

⚠️ **La vraie asymétrie.** *La couverture réduit le risque pour l'entreprise. Mais elle peut augmenter le risque pour le trésorier si les autres ne comprennent pas pleinement ce qui est fait.* La seule solution réelle : que **tous les cadres dirigeants** comprennent la nature de la couverture **avant** sa mise en place — idéalement, une stratégie **fixée par le conseil d'administration** et **clairement communiquée** à la direction et aux actionnaires.

> **Les mines d'or.** Une mine met plusieurs années à extraire son or et se retrouve donc très exposée : *une mine qui paraît rentable au départ peut devenir non rentable si le prix de l'or plonge*. Certaines ne couvrent pas — elles attirent des actionnaires qui **veulent** l'exposition à l'or. D'autres estiment leur production mensuelle sur plusieurs années et vendent à terme tout ou partie.
>
> **Et comment la banque qui achète se couvre-t-elle ?** *En empruntant l'or à une banque centrale, en le vendant immédiatement au comptant et en plaçant le produit au taux sans risque. À la fin de l'année, elle achète l'or à la mine et le rend à la banque centrale.* Le prix à terme fixé reflète donc **le taux sans risque gagné** moins **le taux de location** payé à la banque centrale.

## 🔴 Concept 3 — La base et le risque de base

**Pourquoi les exemples précédents étaient trop beaux.** Trois imperfections :

1. l'actif couvert **n'est pas exactement** celui du contrat futures ;
2. la **date** exacte d'achat ou de vente est incertaine ;
3. la couverture peut exiger de **dénouer avant** le mois de livraison.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

$$\boxed{\text{Base}=\text{prix comptant de l'actif à couvrir}-\text{prix futures du contrat utilisé}}$$

Si les deux actifs sont **identiques**, la base est **nulle à l'expiration** du futures. Avant, elle peut être positive ou négative.

</div>

⚠️ **Attention à la convention.** Hull signale en note : *la définition alternative « base = prix futures − prix comptant » est parfois utilisée, en particulier quand le futures porte sur un actif financier*. Vérifiez toujours la convention de l'énoncé.

| Mouvement | Nom | Effet sur une couverture **courte** | Effet sur une couverture **longue** |
|---|---|---|---|
| Base **augmente** | **renforcement** (*strengthening*) | position **améliorée** | position **détériorée** |
| Base **diminue** | **affaiblissement** (*weakening*) | position **détériorée** | position **améliorée** |

**Le résultat central.** Notons $S_1,F_1,b_1$ à la mise en place ($t_1$) et $S_2,F_2,b_2$ au dénouement ($t_2$), avec $b_i=S_i-F_i$.

**Couverture courte.** Prix obtenu pour l'actif : $S_2$ ; profit futures : $F_1-F_2$. D'où le prix effectif

$$S_2+F_1-F_2=\boxed{F_1+b_2}$$

**Couverture longue.** Prix payé $S_2$, perte $F_1-F_2$ → prix effectif $S_2+F_1-F_2=F_1+b_2$ : **la même expression**.

> **La lecture décisive.** $F_1$ est **connu** en $t_1$. *Si $b_2$ l'était aussi, la couverture serait parfaite.* **Le risque de couverture est l'incertitude sur $b_2$ — c'est le risque de base.** On n'a pas éliminé le risque : on l'a **transformé** en un risque beaucoup plus petit.

**Exemple numérique du livre.** $S_1=2{,}50$, $F_1=2{,}20$, $S_2=2{,}00$, $F_2=1{,}90$ → $b_1=0{,}30$, $b_2=0{,}10$, prix effectif $=2{,}20+0{,}10=\mathbf{2{,}30}$ (vérification : $2{,}00+2{,}20-1{,}90=2{,}30$ ).

**Décomposition en couverture croisée.** Si $S_2^\ast$ est le prix, en $t_2$, de l'actif **sous-jacent au futures** :

$$S_2+F_1-F_2=F_1+\underbrace{(S_2^\ast-F_2)}_{\text{base « pure »}}+\underbrace{(S_2-S_2^\ast)}_{\text{base d'actif}}$$

Le premier terme est la base qui existerait si l'actif couvert était **le même** que le sous-jacent ; le second naît de la **différence entre les deux actifs**.

**Le choix du contrat — deux décisions.**

| Décision | Règle |
|---|---|
| **Quel sous-jacent ?** | facile si l'actif correspond exactement ; sinon, analyser lequel des futures disponibles a les prix **les plus corrélés** avec l'actif couvert |
| **Quel mois de livraison ?** | *choisir un mois de livraison aussi proche que possible de l'expiration de la couverture, **mais postérieur*** |

⚠️ **Pourquoi « postérieur » et pas « égal ».** Deux raisons : *les prix futures sont parfois assez erratiques pendant le mois de livraison* ; et *un hedger long court le risque de devoir prendre livraison* s'il détient le contrat pendant ce mois. Application : si les échéances sont mars, juin, septembre, décembre — expiration en **décembre, janvier ou février** → contrat **mars** ; en **mars, avril ou mai** → contrat **juin** ; etc.

⚠️ **La règle suppose la liquidité.** *En pratique, la liquidité est généralement la plus forte sur les contrats à maturité courte.* D'où la stratégie alternative : contrats courts **roulés** (concept 6).

**Et de manière générale :** *le risque de base augmente à mesure que l'écart de temps entre l'expiration de la couverture et le mois de livraison augmente.*

<details><summary>**Exercice résolu C — couverture courte en yens (exemple 3.1)**</summary>

**Données.** 1ᵉʳ mars. Une entreprise américaine recevra **50 millions de yens** fin juillet. Échéances des futures yen CME : mars, juin, septembre, décembre. Contrat : **12,5 millions de yens**. $F_1=0{,}7800$ cent/yen. Au dénouement : $S_2=0{,}7200$, $F_2=0{,}7250$.

*Étape 1 — sens.* Elle **recevra** des yens → elle craint leur **baisse** → couverture **courte**. *Étape 2 — échéance.* Fin juillet : le premier mois **postérieur** est **septembre**. *Étape 3 — nombre de contrats.* $50/12{,}5=\mathbf{4}$ contrats vendus. *Étape 4 — gain futures.* $0{,}7800-0{,}7250=\mathbf{0{,}0550}$ cent/yen. *Étape 5 — base finale.* $b_2=0{,}7200-0{,}7250=\mathbf{-0{,}0050}$ cent/yen. *Étape 6 — prix effectif, deux voies.*

$$S_2+\text{gain}=0{,}7200+0{,}0550=\mathbf{0{,}7750}\qquad\text{ou}\qquad F_1+b_2=0{,}7800-0{,}0050=\mathbf{0{,}7750}\ \checkmark$$

*Étape 7 — montant total.* $50\times0{,}00775$ millions $=\mathbf{387\,500}$ dollars.

</details>

<details><summary>**Exercice résolu D — couverture longue en pétrole (exemple 3.2)**</summary>

**Données.** 8 juin. Achat de **20 000 barils** prévu **en octobre ou novembre** (date incertaine). Contrats mensuels NYMEX, taille **1 000 barils**. $F_1=68{,}00$. Achat effectif le **10 novembre**, où $S_2=70{,}00$ et $F_2=69{,}10$.

*Étape 1 — sens et échéance.* Achat futur → couverture **longue** ; l'échéance postérieure choisie est **décembre**, d'où 20 contrats achetés. *Étape 2 — gain futures.* $69{,}10-68{,}00=\mathbf{1{,}10}$ dollar/baril. *Étape 3 — base finale.* $b_2=70{,}00-69{,}10=\mathbf{0{,}90}$ dollar/baril. *Étape 4 — prix effectif payé, deux voies.*

$$S_2-\text{gain}=70{,}00-1{,}10=\mathbf{68{,}90}\qquad\text{ou}\qquad F_1+b_2=68{,}00+0{,}90=\mathbf{68{,}90}\ \checkmark$$

*Étape 5 — total.* $68{,}90\times20\,000=\mathbf{1\,378\,000}$ dollars.

⚠️ **Notez le signe.** En couverture **longue**, le gain futures **se retranche** du prix spot payé ; en couverture **courte**, il **s'ajoute** au prix spot reçu. La formule $F_1+b_2$ est la même dans les deux cas — c'est elle qu'il faut retenir.

</details>

## 🔴 Concept 4 — La couverture croisée et le ratio de variance minimale

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Il y a **couverture croisée** quand l'actif sous-jacent au futures **diffère** de l'actif couvert. Exemple canonique : une compagnie aérienne inquiète du prix du **kérosène** utilise des futures sur **fioul domestique**, faute de futures kérosène activement traités.

</div>

> **Ratio de couverture** (*hedge ratio*) : rapport de la **taille de la position futures** à la **taille de l'exposition**. Quand les actifs coïncident, on prend naturellement $h=1$. **En couverture croisée, $h=1$ n'est pas optimal.**

**Le critère.** Choisir $h$ qui **minimise la variance** de la valeur de la position couverte. Notons $\Delta S$ et $\Delta F$ les variations de prix comptant et futures **sur une durée égale à la vie de la couverture**.

$$\boxed{h^\ast=\rho\,\frac{\sigma_S}{\sigma_F}};	ext{(3.1)}$$

où $\sigma_S=\mathrm{sd}(\Delta S)$, $\sigma_F=\mathrm{sd}(\Delta F)$ et $\rho=\mathrm{corr}(\Delta S,\Delta F)$.

> **Deux lectures équivalentes.** (i) $h^\ast$ est la **pente de la droite des moindres carrés** de $\Delta S$ régressée sur $\Delta F$ — *c'est intuitivement raisonnable : on attend que $h^\ast$ soit le rapport de la variation moyenne de $S$ à une variation donnée de $F$*. (ii) C'est le produit de la corrélation par le rapport des écarts-types.

**Deux cas limites qui servent de test de bon sens.**

| Situation | $h^\ast$ | Pourquoi |
|---|---|---|
| $\rho=1$ et $\sigma_F=\sigma_S$ | $\mathbf{1{,}0}$ | le prix futures **reflète parfaitement** le prix comptant |
| $\rho=1$ et $\sigma_F=2\sigma_S$ | $\mathbf{0{,}5}$ | le futures bouge **deux fois plus** que le comptant |

> **Efficacité de la couverture** (*hedge effectiveness*) : *la proportion de la variance éliminée par la couverture*. C'est le $R^2$ de la régression de $\Delta S$ sur $\Delta F$, et il vaut $\boxed{\rho^2}$.

**Estimation.** $\rho$, $\sigma_F$ et $\sigma_S$ sont estimés sur **données historiques** — *l'hypothèse implicite étant que l'avenir ressemblera, en un certain sens, au passé*. On choisit des intervalles de temps **égaux et non chevauchants** ; idéalement leur longueur **égale la durée de la couverture**. *En pratique cela limite parfois sévèrement le nombre d'observations disponibles, et l'on utilise un intervalle plus court.*

**Nombre optimal de contrats.**

$$\boxed{N^\ast=\frac{h^\ast Q_A}{Q_F}};	ext{(3.2)}$$

où $Q_A$ = taille de la position couverte (unités) et $Q_F$ = taille d'un contrat (unités).

<details><summary>**Exercice résolu E — la compagnie aérienne et le fioul domestique (exemple 3.3)**</summary>

**Données.** Achat prévu de **2 millions de gallons** de kérosène dans **1 mois** ; couverture par futures **fioul domestique** NYMEX (**42 000 gallons** par contrat). Quinze mois de variations mensuelles :

| Mois | $\Delta F$ (fioul) | $\Delta S$ (kérosène) |  | Mois | $\Delta F$ | $\Delta S$ |
|---|---|---|---|---|---|---|
| 1 | 0,021 | 0,029 |  | 9 | 0,048 | 0,043 |
| 2 | 0,035 | 0,020 |  | 10 | −0,006 | 0,011 |
| 3 | −0,046 | −0,044 |  | 11 | −0,036 | −0,036 |
| 4 | 0,001 | 0,008 |  | 12 | −0,011 | −0,018 |
| 5 | 0,044 | 0,026 |  | 13 | 0,019 | 0,009 |
| 6 | −0,029 | −0,019 |  | 14 | −0,027 | −0,032 |
| 7 | −0,026 | −0,010 |  | 15 | 0,029 | 0,023 |
| 8 | −0,029 | −0,007 |  |  |  |  |

*Étape 1 — les trois statistiques.* Les formules usuelles donnent

$$\sigma_F=0{,}0313,\qquad \sigma_S=0{,}0263,\qquad \rho=0{,}928$$

*Étape 2 — le ratio optimal.*

$$h^\ast=0{,}928\times\frac{0{,}0263}{0{,}0313}=\mathbf{0{,}7777}$$

*Étape 3 — le nombre de contrats.*

$$N^\ast=\frac{0{,}7777\times2\,000\,000}{42\,000}=37{,}03\ \longrightarrow\ \mathbf{37}\ \text{contrats}$$

*Étape 4 — l'efficacité.* $\rho^2=0{,}928^2\approx\mathbf{0{,}861}$ : la couverture élimine environ **86 %** de la variance.

⚠️ **Sens du résultat.** $h^\ast<1$ **parce que** le kérosène est **moins volatil** que le fioul ($\sigma_S<\sigma_F$) : il faut **moins** d'unités de futures que d'unités d'exposition. Un $h^\ast$ supérieur à 1 signalerait l'inverse.

*(Delta Airlines a réellement utilisé des futures fioul domestique pour couvrir ses achats de kérosène — A. Ness, « Delta Wins on Fuel », **Risk**, juin 2001.)*

</details>

### 4.1 Le *tailing* — corriger le règlement quotidien

Quand ce sont des **futures** (et non des forwards) qui servent à couvrir, un petit ajustement, le ***tailing the hedge***, tient compte du règlement quotidien :

$$\boxed{N^\ast=\frac{h^\ast V_A}{V_F}};	ext{(3.3)}$$

où $V_A$ = **valeur en dollars** de la position couverte et $V_F$ = **valeur en dollars** d'un contrat (prix futures × $Q_F$).

**Sur l'exemple.** Spot $=1{,}94$ et futures $=1{,}99$ dollar/gallon :

$$V_A=2\,000\,000\times1{,}94=3\,880\,000,\qquad V_F=42\,000\times1{,}99=83\,580$$

$$N^\ast=\frac{0{,}7777\times3\,880\,000}{83\,580}=36{,}10\ \longrightarrow\ \mathbf{36}\ \text{contrats}\quad(\text{au lieu de }37)$$

> **L'effet du *tailing* est de multiplier le ratio de (3.2) par le rapport prix comptant / prix futures.** *Théoriquement, la position devrait ensuite être ajustée au fil des variations de ces prix, mais en pratique cela ne fait généralement guère de différence.*

⚠️ **Si l'on utilise des forwards, il n'y a pas de règlement quotidien : c'est (3.2) qu'il faut appliquer**, pas (3.3).

## 🔴 Concept 5 — Futures sur indices d'actions

**Ce qu'est un indice.** *Un indice boursier suit les variations de valeur d'un portefeuille hypothétique d'actions.* Le poids d'une action est la **proportion du portefeuille hypothétique** qui y est investie ; la hausse en pourcentage de l'indice sur un petit intervalle est **égale** à celle du portefeuille. **Les dividendes ne sont généralement pas inclus** — l'indice suit donc la **plus-value en capital** (exception : les indices *total return*, qui supposent les dividendes réinvestis).

⚠️ **Les poids ne restent pas fixes même si le portefeuille l'est.** *Quand le prix d'une action monte plus vite que les autres, plus de poids lui est automatiquement donné.* Deux constructions :

| Construction | Poids | Ajustements |
|---|---|---|
| Une action de chaque | proportionnels aux **prix de marché** | manuels lors des **divisions d'actions** |
| Pondération par **capitalisation** (prix × nombre de titres) | proportionnels à la capitalisation | **automatiques** (divisions, dividendes en actions, émissions nouvelles) |

**Tailles de contrats du livre.** S&P 500 : **250 dollars × indice** (CME) · Nasdaq-100 : **100 × indice** (CME) · Russell 1000 : **100 × indice** (ICE) · US Dollar Index : **1 000 × indice** (ICE).

### 5.1 Couvrir un portefeuille d'actions

Si le portefeuille **réplique** l'indice, $h^\ast=1$ et (3.3) donne

$$N^\ast=\frac{V_A}{V_F};	ext{(3.4)}$$

*Exemple : portefeuille de 5 050 000 dollars répliquant le S&P 500, futures à 1 010, contrat = 250 × indice → $V_F=252\,500$ → **20 contrats** à vendre.*

Si le portefeuille **ne réplique pas** l'indice, on passe par le **bêta** du MEDAF :

$$\boxed{N^\ast=\beta\,\frac{V_A}{V_F}};	ext{(3.5)}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi $h^\ast=\beta$.</span>

*$h^\ast$ est la pente de la droite des moindres carrés quand les variations du portefeuille sont régressées sur les variations du prix futures de l'indice. $\beta$ est la pente quand le **rendement** du portefeuille est régressé sur le **rendement** de l'indice.* Ce sont les mêmes pentes, exprimées en niveaux ou en rendements.

</div>

**Lecture du bêta.** $\beta=1$ : le portefeuille suit l'indice. $\beta=2$ : l'excès de rendement est **deux fois** plus grand → il faut **deux fois plus** de contrats. $\beta=0{,}5$ : **moitié moins**.

⚠️ **La formule (3.5) suppose que la maturité du futures est proche de celle de la couverture.**

<details><summary>**Exercice résolu F — la couverture d'un portefeuille de bêta 1,5 (tableau 3.4)**</summary>

**Données.** Indice S&P 500 = **1 000** · futures = **1 010** (4 mois de maturité, couverture sur 3 mois) · portefeuille = **5 050 000 dollars** · taux sans risque **4 % par an** · rendement du dividende de l'indice **1 % par an** · $\beta=1{,}5$ · contrat = 250 × indice.

*Étape 1 — valeur d'un contrat.* $V_F=250\times1\,010=\mathbf{252\,500}$. *Étape 2 — nombre de contrats.* $N^\ast=1{,}5\times\dfrac{5\,050\,000}{252\,500}=\mathbf{30}$ contrats **vendus**. *Étape 3 — scénario : indice à 900 dans 3 mois, futures à 902.* Gain de la position courte :

$$30\times(1\,010-902)\times250=\mathbf{810\,000}\ \text{dollars}$$

*Étape 4 — rendement du marché, dividendes compris.* L'indice perd **10 %** ; il verse **1 % par an**, soit **0,25 % sur 3 mois** → l'investisseur dans l'indice gagne $\mathbf{-9{,}75\,\%}$. *Étape 5 — appliquer le MEDAF.* Taux sans risque sur 3 mois $\approx\mathbf{1\,\%}$ :

$$R_{\text{portefeuille}}=1{,}0+1{,}5\times(-9{,}75-1{,}0)=\mathbf{-15{,}125\,\%}$$

*Étape 6 — valeur attendue du portefeuille.* $5\,050\,000\times(1-0{,}15125)=\mathbf{4\,286\,187}$ dollars. *Étape 7 — total couvert.* $4\,286\,187+810\,000=\mathbf{5\,096\,187}$ dollars.

**Le tableau complet.**

| Indice dans 3 mois | 900 | 950 | 1 000 | 1 050 | 1 100 |
|---|---|---|---|---|---|
| Futures dans 3 mois | 902 | 952 | 1 003 | 1 053 | 1 103 |
| Gain sur les futures | 810 000 | 435 000 | 52 500 | −322 500 | −697 500 |
| Rendement du marché | −9,750 % | −4,750 % | 0,250 % | 5,250 % | 10,250 % |
| Rendement attendu du portefeuille | −15,125 % | −7,625 % | −0,125 % | 7,375 % | 14,875 % |
| Valeur attendue du portefeuille | 4 286 187 | 4 664 937 | 5 043 687 | 5 422 437 | 5 801 187 |
| **Total** | **5 096 187** | **5 099 937** | **5 096 187** | **5 099 937** | **5 103 687** |

*La valeur totale attendue de la position du hedger dans 3 mois est presque indépendante de la valeur de l'indice* — et supérieure d'environ **1 %** à la valeur initiale, c'est-à-dire exactement le **taux sans risque trimestriel**.

⚠️ **Hull avertit en note :** ces calculs supposent que *le rendement du dividende est prévisible, que le taux sans risque reste constant et que le rendement de l'indice sur 3 mois est parfaitement corrélé à celui du portefeuille. En pratique ces hypothèses ne tiennent pas parfaitement et la couverture fonctionne moins bien que ne l'indique le tableau 3.4.*

</details>

**Alors pourquoi se donner cette peine ?** Puisque la position couverte croît au **taux sans risque**, *pourquoi ne pas simplement vendre le portefeuille et acheter des bons du Trésor* ?

| Raison | Contenu |
|---|---|
| **Sélection de titres** | le hedger est **incertain sur le marché** mais **confiant** que ses actions battront le marché ; la couverture **retire le risque de marché** et ne laisse que la **performance relative** |
| **Protection temporaire** | détention prévue à **long terme**, protection voulue **à court terme** ; vendre puis racheter entraînerait des **coûts de transaction inacceptables** |

### 5.2 Modifier le bêta d'un portefeuille

$$\boxed{\beta>\beta^\ast:\ \text{VENDRE}\ (\beta-\beta^\ast)\frac{V_A}{V_F}\ \text{contrats}}\qquad\boxed{\beta<\beta^\ast:\ \text{ACHETER}\ (\beta^\ast-\beta)\frac{V_A}{V_F}\ \text{contrats}}$$

Sur l'exemple ($V_A/V_F=20$, $\beta=1{,}5$) : couverture complète $\to$ **30 contrats vendus** ; ramener $\beta$ à **0,75** $\to$ **15** vendus ; porter $\beta$ à **2,0** $\to$ **10 contrats achetés**.

<details><summary>**Exercice résolu G — verrouiller le bénéfice d'une bonne sélection de titres**</summary>

**Situation.** En avril, un investisseur détient **20 000 actions IBM** à **100 dollars**. Il pense que le marché sera **très volatil** sur trois mois mais qu'**IBM a de bonnes chances de le battre**. Futures S&P 500 août : **900**, contrat = 250 × indice. $\beta_{\text{IBM}}=1{,}1$.

*Étape 1 — les deux valeurs.* $V_A=20\,000\times100=\mathbf{2\,000\,000}$ ; $V_F=900\times250=\mathbf{225\,000}$. *Étape 2 — le nombre de contrats.*

$$N^\ast=1{,}1\times\frac{2\,000\,000}{225\,000}=9{,}78\ \longrightarrow\ \mathbf{10}\ \text{contrats vendus}$$

*Étape 3 — le scénario.* IBM tombe à **90**, le futures S&P 500 à **750**. *Étape 4 — les deux jambes.*

$$\text{perte IBM}=20\,000\times(100-90)=\mathbf{-200\,000}\qquad \text{gain futures}=10\times250\times(900-750)=\mathbf{+375\,000}$$

*Étape 5 — le résultat.* **+175 000 dollars**. *Étape 6 — l'interprétation.* Le gain existe **parce qu'IBM a moins baissé qu'un portefeuille bien diversifié de bêta 1,1** ne l'aurait fait. *Si le marché était monté et qu'IBM était monté davantage qu'un portefeuille de bêta 1,1 — comme l'anticipait l'investisseur — un profit aurait été réalisé dans ce cas aussi.*

⚠️ **Ce que la stratégie fait vraiment.** Elle ne parie **pas** sur la direction du marché : elle **isole l'alpha**. Le pari porte uniquement sur *IBM contre le marché ajusté du bêta*.

</details>

## 🟠 Concept 6 — *Stack and roll* : rouler la couverture

**Le problème.** L'échéance de la couverture est **postérieure** aux dates de livraison de **tous** les contrats utilisables. Il faut alors **rouler** : dénouer un contrat et prendre la même position sur un contrat de livraison plus lointaine. *Les couvertures peuvent être roulées de nombreuses fois.*

$$t_1:\ \text{vendre le contrat 1}\ \to\ t_2:\ \text{dénouer 1, vendre 2}\ \to\ \cdots\ \to\ t_n:\ \text{dénouer } n-1,\ \text{vendre } n\ \to\ T:\ \text{dénouer } n$$

<details><summary>**Exercice résolu H — trois roulements sur le pétrole (tableau 3.5)**</summary>

**Données.** Avril 2011 : l'entreprise sait qu'elle aura **100 000 barils** à vendre en **juin 2012**, ratio de couverture **1,0** (sans *tailing*). Spot courant : **69**. Seuls les **six premiers mois de livraison** sont assez liquides.

| Date | Futures oct. 2011 | Futures mars 2012 | Futures juill. 2012 | Spot |
|---|---|---|---|---|
| Avril 2011 | **68,20** |  |  | 69,00 |
| Sept. 2011 | **67,40** | **67,00** |  |  |
| Févr. 2012 |  | **66,50** | **66,30** |  |
| Juin 2012 |  |  | **65,90** | 66,00 |

*Étape 1 — mise en place.* Avril 2011 : **100 contrats** octobre 2011 vendus à **68,20**. *Étape 2 — premier roulement.* Sept. 2011 : dénouer à **67,40** → gain $68{,}20-67{,}40=\mathbf{0{,}80}$ ; vendre mars 2012 à **67,00**. *Étape 3 — deuxième roulement.* Févr. 2012 : dénouer à **66,50** → gain $67{,}00-66{,}50=\mathbf{0{,}50}$ ; vendre juillet 2012 à **66,30**. *Étape 4 — dénouement final.* Juin 2012 : dénouer à **65,90** → gain $66{,}30-65{,}90=\mathbf{0{,}40}$. *Étape 5 — gain total.*

$$(68{,}20-67{,}40)+(67{,}00-66{,}50)+(66{,}30-65{,}90)=\mathbf{1{,}70}\ \text{dollar/baril}$$

*Étape 6 — l'objection naturelle, et la réponse de Hull.* Le pétrole est passé de **69 à 66**, soit **−3,00**. *Ne recevoir que 1,70 de compensation pour une baisse de 3,00 peut paraître insatisfaisant. Mais on ne peut pas attendre une compensation totale d'une baisse de prix quand les prix futures sont inférieurs aux prix comptant. Le mieux qu'on puisse espérer est de verrouiller le prix futures qui s'appliquerait à un contrat juin 2012 s'il était activement traité.*

⚠️ **La leçon.** Chaque roulement fait **perdre la base** entre le contrat sortant et le contrat entrant (ici $67{,}40\to67{,}00$ : $-0{,}40$ ; $66{,}50\to66{,}30$ : $-0{,}20$). Dans un marché **normal** (futures au-dessus du spot lointain), rouler **coûte** ; dans un marché **inversé**, rouler **rapporte**.

</details>

**La pratique.** *Une entreprise a en général une exposition chaque mois et utilise un contrat futures à 1 mois, le plus liquide. Elle entre initialement dans assez de contrats (« empile », *stacks*) pour couvrir son exposition jusqu'à la fin de son horizon. Un mois plus tard, elle dénoue tous les contrats et les « roule » dans de nouveaux contrats à 1 mois*, et ainsi de suite.

> **Metallgesellschaft — la couverture qui tourne mal.** La société allemande **MG** a vendu un **énorme volume** de contrats d'approvisionnement à **prix fixe** en fioul et essence sur **5 à 10 ans**, à **6 à 8 cents au-dessus** des prix de marché. Elle a couvert son exposition par des positions **longues** sur futures **courts, roulés**.
>
> Le prix du pétrole a **baissé** → **appels de marge** sur les positions futures → *des pressions de trésorerie court terme considérables*. Les concepteurs de la stratégie soutenaient que ces sorties de trésorerie étaient **compensées** par des flux positifs qui seraient finalement réalisés sur les contrats long terme à prix fixe. **Mais** la direction générale et les banquiers se sont inquiétés de la saignée : l'entreprise a **dénoué toutes les positions de couverture** et convenu avec ses clients d'**abandonner** les contrats à prix fixe. **Perte : 1,33 milliard de dollars.**

⚠️ **La morale, mot pour mot.** *Le décalage entre le calendrier des flux de la couverture et celui de la position couverte a conduit à des problèmes de liquidité qui n'ont pas pu être gérés. La morale de l'histoire est que les problèmes potentiels de liquidité devraient toujours être pris en compte lorsqu'on planifie une stratégie de couverture.* — Rapprochez de LTCM (fiche 75) : **deux fois, c'est la trésorerie et non la thèse qui tue**.

## 🟡 Concept 7 — Rappel : le MEDAF (annexe du chapitre)

**La décomposition du risque.**

| Type | Définition | Diversifiable ? |
|---|---|---|
| **Systématique** | lié au rendement du **marché dans son ensemble** | **non** |
| **Non systématique** | **propre** à l'actif | **oui**, par un grand portefeuille |

*Le MEDAF soutient que le rendement ne devrait dépendre que du risque **systématique**.*

$$\boxed{\mathbb E[R]=R_F+\beta\,(R_M-R_F)};	ext{(3A.1)}$$

**Lecture de $\beta$.** $\beta=0$ : aucun risque systématique → rendement attendu = **taux sans risque**. $\beta=0{,}5$ : l'excès de rendement vaut en moyenne **la moitié** de celui du marché. $\beta=1$ : rendement attendu = **rendement du marché**. *Exemple : $R_F=5\,\%$, $R_M=13\,\%$ ; $\beta=0$ → $5\,\%$ ; $\beta=0{,}75$ → $0{,}05+0{,}75\times(0{,}13-0{,}05)=\mathbf{11\,\%}$.*

**Les six hypothèses.**

1. Les investisseurs ne se soucient **que** du rendement espéré et de l'écart-type.
2. Les rendements de deux actifs ne sont corrélés **que** par leur corrélation avec le marché — équivalent à supposer **un seul facteur**.
3. Horizon **d'une seule période**, **identique** pour tous.
4. Emprunt et prêt possibles au **même taux sans risque**.
5. La **fiscalité** n'influence pas les décisions.
6. **Tous** les investisseurs font les **mêmes** estimations de rendements, écarts-types et corrélations.

⚠️ **Hull ne les défend pas.** *Ces hypothèses ne sont au mieux qu'approximativement vraies. Néanmoins le MEDAF s'est révélé un outil utile pour les gérants de portefeuille et sert souvent de référence pour évaluer leur performance.*

⚠️ **Et surtout — le domaine de validité.** *Quand l'actif est une action individuelle, le rendement espéré donné par (3A.1) n'est **pas un très bon prédicteur** du rendement réel. Mais quand l'actif est un portefeuille bien diversifié, c'est un **bien meilleur** prédicteur.* C'est ce qui autorise l'usage du bêta pour couvrir un portefeuille diversifié — le $\beta$ du portefeuille étant la **moyenne pondérée** des bêtas des actions qui le composent.

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| « recevra / devra acheter » un actif | **sens** de la couverture | possédera → **court** ; achètera → **long** |
| $S_1,F_1,S_2,F_2$ donnés | **prix effectif** | $F_1+b_2$ avec $b_2=S_2-F_2$ |
| Deux actifs **différents** + écarts-types + corrélation | **ratio optimal** | $h^\ast=\rho\sigma_S/\sigma_F$, puis $N^\ast=h^\ast Q_A/Q_F$ |
| Un **prix comptant et un prix futures** en plus | ***tailing*** | $N^\ast=h^\ast V_A/V_F$ |
| Un **bêta** et une valeur de portefeuille | couverture **d'indice** | $N^\ast=\beta V_A/V_F$ |
| « ramener le bêta de $\beta$ à $\beta^\ast$ » | **modification de bêta** | $(\beta-\beta^\ast)V_A/V_F$, vendre si $\beta>\beta^\ast$ |
| Plusieurs contrats successifs et leurs prix | ***stack and roll*** | somme des gains sur **chaque** jambe |
| « quel mois de livraison choisir ? » | **choix du contrat** | le plus proche **mais postérieur** à l'échéance |

## Comment résoudre ce type d'exercice

**Protocole couverture simple — 5 étapes.**

1. **Sens** : l'entreprise gagne-t-elle ou perd-elle quand le prix monte ? Elle prend la position futures **opposée**.
2. **Échéance** : premier mois de livraison **postérieur** à l'échéance de la couverture.
3. **Taille** : $N=Q_A/Q_F$ (ou $h^\ast Q_A/Q_F$ en croisée).
4. **Résultat** : prix effectif $=F_1+b_2$ — **toujours cette formule**, quel que soit le sens.
5. **Contrôle** : recalculer par l'autre voie ($S_2\pm$ gain futures) ; les deux doivent coïncider.

**Protocole couverture croisée — 5 étapes.**

1. Constituer les séries $\Delta S$ et $\Delta F$ sur des intervalles **égaux et non chevauchants**, idéalement de la **durée de la couverture**.
2. Calculer $\sigma_S$, $\sigma_F$, $\rho$ (écarts-types **empiriques**, dénominateur $n-1$).
3. $h^\ast=\rho\sigma_S/\sigma_F$ — vérifier le **sens** : $h^\ast<1$ si l'actif couvert est **moins** volatil.
4. $N^\ast=h^\ast Q_A/Q_F$ (ou $h^\ast V_A/V_F$ avec *tailing*), **arrondir à l'entier**.
5. Reporter l'**efficacité** $\rho^2$ : c'est la part de variance éliminée.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire qu'une couverture verrouille le prix **comptant** initial | Elle verrouille le **prix futures initial** $F_1$ (plus la base finale) |
| Prendre le mois de livraison **égal** à l'échéance de la couverture | Prendre le premier mois **postérieur** — prix erratiques et risque de livraison |
| Utiliser $h=1$ en couverture croisée | Utiliser $h^\ast=\rho\sigma_S/\sigma_F$ |
| Inverser le rapport dans $h^\ast$ | C'est $\sigma_S/\sigma_F$ — **couvert au numérateur** |
| Confondre efficacité et corrélation | L'efficacité est $\rho^2$, pas $\rho$ |
| Appliquer le *tailing* à une couverture par **forwards** | Sans règlement quotidien, on utilise (3.2), pas (3.3) |
| Oublier les **dividendes** dans le rendement de l'indice | Rendement de l'indice + dividende = rendement de l'investisseur |
| Appliquer le MEDAF à une **action isolée** pour prédire son rendement | Hull le dit : mauvais prédicteur pour une action, bon pour un portefeuille diversifié |
| Croire que la couverture d'un portefeuille rapporte plus que les T-bills | Elle fait croître la position au **taux sans risque** — l'intérêt est ailleurs (alpha, coûts) |
| Ignorer les flux de trésorerie du roulement | **Metallgesellschaft** : 1,33 Md de perte pour cette raison exacte |
| Croire que rouler une couverture est neutre | Chaque roulement fait perdre (ou gagner) **la base entre les deux contrats** |

## 📌 Ultimate Review

**Les cinq formules.**

$$b=S-F\qquad \text{prix effectif}=F_1+b_2\qquad h^\ast=\rho\frac{\sigma_S}{\sigma_F}\qquad N^\ast=\frac{h^\ast Q_A}{Q_F}\ \Big/\ \frac{h^\ast V_A}{V_F}\qquad N^\ast=\beta\frac{V_A}{V_F}$$

**Modification de bêta.** Vendre $(\beta-\beta^\ast)V_A/V_F$ si $\beta>\beta^\ast$ ; acheter $(\beta^\ast-\beta)V_A/V_F$ sinon.

**Efficacité de couverture** $=R^2=\rho^2$.

**Le sens de la base.** Renforcement (hausse de $b$) : bon pour le **court**, mauvais pour le **long**. Affaiblissement : l'inverse.

**Les chiffres du chapitre.** Kérosène/fioul : $\sigma_F=0{,}0313$, $\sigma_S=0{,}0263$, $\rho=0{,}928$, $h^\ast=0{,}7777$, $N^\ast=37$ (36 avec *tailing*) · S&P 500 : contrat **250 × indice** · portefeuille $\beta=1{,}5$, 5 050 000 dollars, futures 1 010 → **30 contrats** · IBM : $\beta=1{,}1$, 10 contrats, gain **175 000** · roulement pétrole : gain **1,70** pour une baisse de **3,00** · MG : **1,33 Md** · Metallgesellschaft vendait **6 à 8 cents au-dessus** du marché.

**MEDAF.** $\mathbb E[R]=R_F+\beta(R_M-R_F)$ ; six hypothèses ; bon pour les **portefeuilles**, pas pour les **actions isolées**.

## 🧠 Active Recall

<details><summary>Un producteur de pétrole se couvre à 79 alors que le spot est à 80. Quel prix obtient-il, et pourquoi pas 80 ?</summary>

Environ **79 dollars le baril** — le **prix futures initial**, pas le prix comptant initial. Parce que la couverture consiste à **vendre à terme** : le prix verrouillé est celui auquel on peut vendre **pour la date de la couverture**, qui est $F_1$. Formellement, prix effectif $=F_1+b_2$, et $b_2\approx0$ puisque le dénouement a lieu pendant le mois de livraison.

</details>

<details><summary>Écrire le prix effectif d'une couverture et expliquer d'où vient le risque résiduel.</summary>

$$S_2+F_1-F_2=F_1+b_2,\qquad b_2=S_2-F_2$$

La formule est **identique** pour une couverture courte et une couverture longue. $F_1$ est **connu** à la mise en place ; toute l'incertitude restante porte sur $b_2$, la **base finale**. C'est le **risque de base** — et c'est un risque bien plus petit que celui du prix lui-même.

</details>

<details><summary>Le prix du kérosène a $\sigma_S=0{,}0263$, le fioul $\sigma_F=0{,}0313$, $\rho=0{,}928$. Calculer $h^\ast$, $N^\ast$ pour 2 millions de gallons, et l'efficacité.</summary>

$h^\ast=0{,}928\times\dfrac{0{,}0263}{0{,}0313}=\mathbf{0{,}7777}$ ; $N^\ast=\dfrac{0{,}7777\times2\,000\,000}{42\,000}=37{,}03\to\mathbf{37}$ contrats ; efficacité $=\rho^2=0{,}928^2\approx\mathbf{86\,\%}$. Avec *tailing* (spot 1,94 ; futures 1,99) : $N^\ast=\dfrac{0{,}7777\times3\,880\,000}{83\,580}=36{,}10\to\mathbf{36}$.

</details>

<details><summary>Pourquoi choisir un mois de livraison postérieur — et non égal — à l'échéance de la couverture ?</summary>

Deux raisons. (i) *Les prix futures sont parfois assez erratiques pendant le mois de livraison.* (ii) Un hedger **long** court le risque de **devoir prendre livraison** s'il détient le contrat pendant ce mois — ce qui est coûteux et peu commode ; il préfère dénouer et acheter chez ses fournisseurs habituels. Règle : le mois **le plus proche mais postérieur**, sous réserve de **liquidité suffisante**.

</details>

<details><summary>Pourquoi SafeandSure, qui se couvre, a-t-elle des marges plus volatiles que TakeaChance, qui ne se couvre pas ?</summary>

Parce que dans ce secteur les **prix de vente** des bijoux suivent le prix de l'or. TakeaChance voit son coût **et** son prix de vente bouger ensemble : marge **constante**. SafeandSure a **figé son coût** mais son prix de vente continue de bouger : marge **variable** — en hausse si l'or monte, en baisse s'il baisse, *possiblement négative dans des conditions extrêmes*. Leçon : une couverture doit tenir compte de **toutes** les implications d'un changement de prix, y compris sur le chiffre d'affaires.

</details>

<details><summary>Portefeuille de 5 050 000 dollars, $\beta=1{,}5$, futures S&P 500 à 1 010 (contrat 250 × indice). Combien de contrats pour ramener le bêta à 0,75 ?</summary>

$V_F=250\times1\,010=252\,500$, donc $V_A/V_F=20$. Il faut **vendre**

$$(\beta-\beta^\ast)\frac{V_A}{V_F}=(1{,}5-0{,}75)\times20=\mathbf{15}\ \text{contrats}$$

soit exactement **la moitié** des 30 contrats d'une couverture complète — cohérent, puisqu'on supprime la moitié du bêta.

</details>

<details><summary>Un investisseur bon en sélection de titres détient 20 000 IBM à 100, $\beta=1{,}1$, futures S&P 500 à 900. Que fait-il et sur quoi parie-t-il réellement ?</summary>

Il **vend** $1{,}1\times\dfrac{2\,000\,000}{225\,000}=9{,}78\to\mathbf{10}$ contrats. Il **supprime le risque de marché** et ne conserve que la performance **relative** d'IBM par rapport à un portefeuille diversifié de même bêta. Dans le scénario du livre (IBM à 90, futures à 750), il perd 200 000 sur IBM et gagne 375 000 sur les futures : **+175 000**, uniquement parce qu'IBM a **moins baissé** qu'un portefeuille de bêta 1,1.

</details>

<details><summary>Le pétrole passe de 69 à 66 et le roulement ne rapporte que 1,70 dollar par baril. Est-ce un échec de la couverture ?</summary>

**Non.** *On ne peut pas attendre une compensation totale d'une baisse de prix quand les prix futures sont inférieurs aux prix comptant. Le mieux qu'on puisse espérer est de verrouiller le prix futures qui s'appliquerait à un contrat juin 2012 s'il était activement traité.* Chaque roulement fait perdre la base entre le contrat sortant et le contrat entrant ($67{,}40\to67{,}00$ puis $66{,}50\to66{,}30$) : c'est le **coût structurel** du roulement en marché normal.

</details>

<details><summary>Qu'est-il arrivé à Metallgesellschaft, et quelle est la morale ?</summary>

MG avait vendu des contrats d'approvisionnement à **prix fixe sur 5 à 10 ans** (à 6-8 cents au-dessus du marché) et les couvrait par des positions **longues** sur futures **courts roulés**. La **baisse** du pétrole a déclenché des **appels de marge immédiats**, alors que les gains compensateurs sur les contrats long terme n'arriveraient que **bien plus tard**. Direction et banquiers, alarmés par la saignée de trésorerie, ont fait **déboucler toutes les couvertures** et abandonner les contrats : **1,33 milliard de perte**. Morale : *les problèmes potentiels de liquidité devraient toujours être pris en compte lorsqu'on planifie une stratégie de couverture* — le **décalage de calendrier** entre les flux de la couverture et ceux de la position couverte est un risque à part entière.

</details>

<details><summary>Pourquoi peut-on utiliser le bêta du MEDAF pour couvrir un portefeuille, alors que le MEDAF prédit mal le rendement d'une action ?</summary>

Parce que le MEDAF ne retient que le risque **systématique** et néglige le risque **spécifique**. Pour une action isolée, le spécifique domine et *le rendement espéré n'est pas un très bon prédicteur du rendement réel*. Pour un **portefeuille bien diversifié**, le spécifique est presque entièrement annulé et *c'est un bien meilleur prédicteur* — le bêta du portefeuille étant la **moyenne pondérée** des bêtas des titres. C'est exactement l'objet de la couverture par indice.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Couverture parfaite ? | Celle qui **élimine complètement** le risque — **rare** |
| *Hedge-and-forget* ? | Position prise au début, dénouée à la fin, **sans ajustement** |
| Quand une couverture **courte** ? | On **possède** ou possédera l'actif |
| Quand une couverture **longue** ? | On **devra acheter** l'actif |
| Prix verrouillé par le producteur de pétrole ? | ≈ le **prix futures initial** (79), pas le spot (80) |
| Définition de la base ? | $b=S-F$ (comptant de l'actif couvert − futures utilisé) |
| Valeur de la base à l'expiration si actifs identiques ? | **Zéro** |
| Prix effectif d'une couverture ? | $\boxed{F_1+b_2}$ — **même formule** court et long |
| D'où vient le risque de base ? | De l'**incertitude sur $b_2$** |
| Renforcement de la base ? | $b$ **augmente** — bon pour le **court** |
| Affaiblissement de la base ? | $b$ **diminue** — bon pour le **long** |
| Trois causes d'imperfection ? | Actif différent · date incertaine · dénouement avant livraison |
| Choix du mois de livraison ? | Le plus proche **mais postérieur** |
| Le risque de base croît avec… ? | L'**écart de temps** entre expiration et mois de livraison |
| Couverture croisée ? | Actif couvert $\ne$ sous-jacent du futures |
| Exemple canonique ? | **Kérosène** couvert par **fioul domestique** |
| Ratio de variance minimale ? | $h^\ast=\rho\,\sigma_S/\sigma_F$ |
| Interprétation géométrique de $h^\ast$ ? | **Pente** de la régression de $\Delta S$ sur $\Delta F$ |
| $\rho=1$, $\sigma_F=2\sigma_S$ : $h^\ast$ ? | $\mathbf{0{,}5}$ |
| Efficacité de la couverture ? | $R^2=\boldsymbol{\rho^2}$ |
| Nombre optimal de contrats ? | $N^\ast=h^\ast Q_A/Q_F$ |
| Formule avec *tailing* ? | $N^\ast=h^\ast V_A/V_F$ |
| Effet du *tailing* ? | Multiplier par **spot / futures** |
| *Tailing* avec des forwards ? | **Non** — pas de règlement quotidien |
| Valeurs de l'exemple kérosène ? | $\sigma_F=0{,}0313$, $\sigma_S=0{,}0263$, $\rho=0{,}928$, $h^\ast=0{,}7777$ |
| Nombre de contrats, avec et sans *tailing* ? | **37** sans, **36** avec |
| Taille du contrat fioul NYMEX ? | **42 000 gallons** |
| Les indices incluent-ils les dividendes ? | **Non**, sauf indices *total return* |
| Contrat S&P 500 ? | **250 dollars × indice** |
| Couverture d'un portefeuille répliquant l'indice ? | $N^\ast=V_A/V_F$ |
| Couverture d'un portefeuille quelconque ? | $N^\ast=\beta V_A/V_F$ |
| Pourquoi $h^\ast=\beta$ ? | Même **pente**, en niveaux ou en rendements |
| Croissance d'une position parfaitement couverte ? | Au **taux sans risque** |
| Deux raisons de couvrir plutôt que vendre ? | **Sélection de titres** · **coûts de transaction** |
| Passer de $\beta$ à $\beta^\ast<\beta$ ? | **Vendre** $(\beta-\beta^\ast)V_A/V_F$ contrats |
| Passer de $\beta$ à $\beta^\ast>\beta$ ? | **Acheter** $(\beta^\ast-\beta)V_A/V_F$ contrats |
| *Stack and roll* ? | Dénouer un contrat, en ouvrir un plus lointain, **répéter** |
| Coût d'un roulement ? | La **base** entre contrat sortant et contrat entrant |
| Perte de Metallgesellschaft ? | **1,33 milliard de dollars** |
| Cause exacte de cette perte ? | **Décalage de calendrier** des flux → crise de **liquidité** |
| Formule du MEDAF ? | $\mathbb E[R]=R_F+\beta(R_M-R_F)$ |
| Risque systématique / non systématique ? | Non diversifiable / **diversifiable** |
| $\beta=0$ : rendement attendu ? | Le **taux sans risque** |
| $R_F=5\,\%$, $R_M=13\,\%$, $\beta=0{,}75$ ? | $\mathbf{11\,\%}$ |
| Le MEDAF prédit-il bien le rendement d'une action ? | **Non** — bien seulement pour un **portefeuille diversifié** |
| Bêta d'un portefeuille ? | **Moyenne pondérée** des bêtas des titres |
