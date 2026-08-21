# Fiche 79 — Futures de taux d'intérêt : T-bond, eurodollar, couverture par duration

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 6 « Interest Rate Futures » |
| **Difficulté** | High — beaucoup de conventions, mais des exercices très mécaniques |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiches 75, 76, 77, 78 |
| **Concepts clés** | Conventions de décompte des jours, prix pied de coupon et prix pied, futures T-bond, facteur de conversion, moins-disante à livrer, *wild card play*, futures eurodollar, ajustement de convexité, prolongement de la courbe LIBOR, ratio de couverture par duration, adossement des durations, gestion GAP |
| **Poids à l'examen** | Le **facteur de conversion**, la **moins-disante à livrer**, la **règle des 25 dollars par point de base**, l'**ajustement de convexité** et $N^\ast=\frac{PD_P}{V_FD_F}$. |

## 🎯 Vue d'ensemble

```
CONVENTIONS  Actual/actual (Trésor US) · 30/360 (corporate) · Actual/360 (monétaire)
             prix caisse = prix coté + INTÉRÊTS COURUS
T-BOND       le vendeur choisit l'obligation  →  FACTEUR DE CONVERSION
             moins-disante : min[ prix coté − (règlement × facteur) ]
EURODOLLAR   cotation 100 − R  ·  1 pb = 25 dollars  ·  prix = 10 000[100 − 0,25(100 − Q)]
             taux forward = taux futures − ½ σ² T₁T₂        ← ajustement de convexité
COUVRIR      N* = P·D_P / (V_F·D_F)      taux ↑  ⇒  prix futures ↓
```

**Le fil du chapitre.** Deux contrats dominent aux États-Unis — **T-bond** (taux longs) et **eurodollar** (taux courts). Ils sont difficiles à valoriser exactement, non pas à cause des maths, mais parce que le **vendeur détient des options** : quelle obligation livrer, quel jour, et jusqu'à quelle heure décider. **Toutes ces options font baisser le prix futures.**

## 🟡 Concept 1 — Les conventions de décompte des jours

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Le *day count* définit **la façon dont les intérêts s'accumulent au cours du temps**. On connaît l'intérêt gagné sur une **période de référence** (par exemple entre deux coupons) et on veut celui d'une autre période.

</div>

$$\text{intérêt}=\frac{\text{nombre de jours entre les deux dates}}{\text{nombre de jours dans la période de référence}}\times\text{intérêt de la période de référence}$$

La convention s'écrit $X/Y$ : **$X$** définit le comptage du **numérateur**, **$Y$** celui du **dénominateur**.

| Convention | Où | Règle |
|---|---|---|
| **Actual/actual (in period)** | obligations du **Trésor US** | jours **réels** au numérateur et au dénominateur |
| **30/360** | obligations **corporate et municipales** US | **30 jours par mois, 360 par an** |
| **Actual/360** | instruments **monétaires** US | numérateur réel, dénominateur **360** |

**Le même calcul, deux conventions.** Nominal 100, coupons le 1ᵉʳ mars et le 1ᵉʳ septembre, taux **8 %** (donc **4** à chaque date). Intérêt du 1ᵉʳ mars au 3 juillet :

|  | Numérateur | Dénominateur | Intérêt |
|---|---|---|---|
| **Actual/actual** | 124 jours réels | 184 jours réels | $\dfrac{124}{184}\times4=\mathbf{2{,}6957}$ |
| **30/360** | $(4\times30)+2=122$ | $6\times30=180$ | $\dfrac{122}{180}\times4=\mathbf{2{,}7111}$ |

⚠️ **Le piège spectaculaire.** *Entre le 28 février et le 1ᵉʳ mars 2013, vous avez le choix entre une obligation d'État et une obligation corporate américaines. Elles paient le même coupon et ont le même prix coté. Sans risque de défaut, laquelle préférez-vous ?* On croit être indifférent — **il faut nettement préférer la corporate**. En **30/360**, il y a **3 jours** entre le 28 février et le 1ᵉʳ mars ; en **actual/actual**, il n'y en a **qu'un**. *Vous gagneriez environ **trois fois** plus d'intérêts en détenant la corporate !*

⚠️ **Actual/360 gonfle discrètement le taux.** *L'intérêt gagné en 90 jours est exactement le quart du taux coté, et l'intérêt gagné sur une année entière de 365 jours vaut **365/360** fois le taux coté.*

**Les variantes internationales.** Instruments monétaires en **actual/365** en Australie, au Canada et en Nouvelle-Zélande · **LIBOR** en actual/360 dans toutes les devises **sauf la livre** (actual/365) · obligations en euro et en livre habituellement en **actual/actual**.

### 1.1 Les cotations

**Bons du Trésor US — le taux d'escompte.** *Le prix des instruments monétaires est parfois coté avec un **taux d'escompte** : l'intérêt gagné en pourcentage de la **valeur faciale finale**, et non du prix initial payé.*

$$\boxed{P=\frac{360}{n}(100-Y)}$$

où $P$ = **prix coté**, $Y$ = **prix caisse**, $n$ = durée résiduelle en **jours calendaires**.

<details><summary>**Exercice résolu — décoder un bon du Trésor coté 8**</summary>

**Énoncé.** Bon du Trésor **91 jours** coté **8**, nominal 100.

*Étape 1 — lire la cotation.* *Le taux d'intérêt gagné est 8 % de la valeur faciale **par 360 jours**.* *Étape 2 — l'intérêt sur la vie du bon.* $100\times0{,}08\times\dfrac{91}{360}=\mathbf{2{,}0222}$. *Étape 3 — le prix caisse.* $Y=100-2{,}0222=\mathbf{97{,}9778}$. *Étape 4 — le **vrai** taux sur 91 jours.* Il se calcule sur ce **qu'on a payé**, pas sur le nominal :

$$\frac{2{,}0222}{100-2{,}0222}=\frac{2{,}0222}{97{,}9778}=\mathbf{2{,}064\,\%}$$

⚠️ **C'est toute la différence entre un taux d'escompte et un taux de rendement.** Le premier divise par **100**, le second par le **prix payé**. Le taux d'escompte **sous-estime toujours** le rendement réel.

</details>

**Obligations du Trésor — trente-deuxièmes et intérêts courus.** *Les prix sont cotés en dollars et **trente-deuxièmes** de dollar, pour un nominal de 100.* Ainsi une cotation **90-05** vaut $90+\dfrac5{32}=90{,}15625$, soit **90 156,25 dollars** pour un nominal de 100 000.

$$\boxed{\text{prix caisse (*dirty price*)}=\text{prix coté (*clean price*)}+\text{intérêts courus depuis le dernier coupon}}$$

<details><summary>**Exercice résolu — du prix coté au prix caisse**</summary>

**Énoncé.** Le **5 mars 2010**, obligation à coupon **11 %** échéant le **10 juillet 2018**, cotée **95-16**.

*Étape 1 — convertir la cotation.* $95+\dfrac{16}{32}=\mathbf{95{,}50}$. *Étape 2 — repérer les dates de coupon.* Coupons **semestriels** sur les obligations d'État (le dernier à maturité) : le précédent est le **10 janvier 2010**, le suivant le **10 juillet 2010**. *Étape 3 — compter les jours.* Du 10 janvier au 5 mars : **54** jours. Du 10 janvier au 10 juillet : **181** jours. *Étape 4 — le coupon semestriel.* $11\,\%/2=\mathbf{5{,}50}$ par 100 de nominal. *Étape 5 — les intérêts courus, en actual/actual.*

$$\frac{54}{181}\times5{,}50=\mathbf{1{,}64}$$

*Étape 6 — le prix caisse.* $95{,}50+1{,}64=\mathbf{97{,}14}$ par 100 — soit **97 140 dollars** pour un nominal de 100 000.

</details>

## 🔴 Concept 2 — Le contrat futures sur T-bond

**L'actif livrable.** *Toute obligation d'État ayant **plus de 15 ans** à courir le premier jour du mois de livraison et **non remboursable avant 15 ans***. Nominal du contrat : **100 000 dollars**.

| Contrat | Maturité résiduelle livrable |
|---|---|
| **T-bond** | $>15$ ans, non rappelable avant 15 ans |
| **T-note 10 ans** | entre **6,5 et 10** ans |
| **T-note 5 ans** | entre **4,167 et 5,25** ans |
| **T-note 2 ans** | entre **1,75 et 5,25** ans |

⚠️ **Lire une cotation à trois chiffres après le tiret.** Le troisième chiffre indique des **quarts de trente-deuxième** : `0` $=0$, `2` $=\frac14$, `5` $=\frac12$, `7` $=\frac34$.

| Cotation | Décomposition | Valeur |
|---|---|---|
| **124-150** | $124+\dfrac{15}{32}$ | **124,46875** |
| **120-105** | $120+\dfrac{10{,}5}{32}$ | **120,328125** |
| **117-157** | $117+\dfrac{15{,}75}{32}$ | **117,492188** |
| **108-302** | $108+\dfrac{30{,}25}{32}$ | **108,945313** |

### 2.1 Le facteur de conversion

**Le problème.** Le vendeur choisit **quelle** obligation livrer, parmi des titres de coupons et de maturités très différents. Il faut donc **ajuster le prix reçu**.

$$\boxed{\text{caisse reçue par 100 de nominal}=(\text{dernier prix de règlement}\times\text{facteur de conversion})+\text{intérêts courus}}$$

*Exemple : règlement **90-00**, facteur **1,3800**, intérêts courus **3** → $(1{,}3800\times90{,}00)+3{,}00=\mathbf{127{,}20}$ par 100 de nominal, soit **127 200 dollars** pour un contrat.*

> **La définition exacte du facteur.** *Le facteur de conversion d'une obligation est **le prix coté qu'elle aurait, par dollar de principal, le premier jour du mois de livraison, sous l'hypothèse que le taux d'intérêt de toutes les maturités égale 6 % par an (capitalisation semestrielle)**.*

**Les règles d'arrondi** — elles *permettent à la bourse de produire des tables exhaustives* :

- la maturité et les dates de coupon sont **arrondies à l'inférieur au trimestre le plus proche** ;
- si, après arrondi, l'obligation dure un **nombre exact** de semestres → le **premier coupon est supposé payé dans 6 mois** ;
- sinon (il reste **3 mois** en plus) → le premier coupon est supposé payé **après 3 mois**, et **on retranche les intérêts courus**.

<details><summary>**Exercice résolu — les deux cas de facteur de conversion**</summary>

**Cas 1 — nombre exact de semestres.** Obligation **10 %**, **20 ans et 2 mois** à courir.

*Étape 1 — arrondir.* On la traite comme ayant **exactement 20 ans**. *Étape 2 — le calendrier.* Premier coupon dans **6 mois**, puis tous les 6 mois pendant 20 ans, principal à la fin. **40 périodes**, coupon **5** par période. *Étape 3 — actualiser à 3 % par semestre.*

$$\sum_{i=1}^{40}\frac{5}{1{,}03^i}+\frac{100}{1{,}03^{40}}=115{,}57+30{,}66=\mathbf{146{,}23}$$

*Étape 4 — diviser par le nominal.* Facteur $=146{,}23/100=\mathbf{1{,}4623}$.

**Cas 2 — trois mois en plus.** Obligation **8 %**, **18 ans et 4 mois** à courir.

*Étape 1 — arrondir.* On la traite comme ayant **18 ans et 3 mois** (arrondi **à l'inférieur** au trimestre). *Étape 2 — se placer 3 mois plus tard.* À cette date, il reste **36 semestres exacts**, coupon **4**. On y ajoute le coupon **4** payé à cette date même :

$$4+\sum_{i=1}^{36}\frac{4}{1{,}03^i}+\frac{100}{1{,}03^{36}}=4+87{,}33+34{,}50=\mathbf{125{,}83}$$

*Étape 3 — ramener à aujourd'hui.* Le taux trimestriel est $\sqrt{1{,}03}-1=\mathbf{1{,}4889\,\%}$, donc

$$\frac{125{,}83}{1{,}014889}=\mathbf{123{,}99}$$

*Étape 4 — retrancher les intérêts courus.* Trois mois de coupon sur un semestre à 4 : $\mathbf{2{,}0}$ → $123{,}99-2{,}00=\mathbf{121{,}99}$. *Étape 5 — le facteur.* $\mathbf{1{,}2199}$.

⚠️ **Pourquoi la racine carrée.** Le taux **semestriel** est 3 % ; le taux **trimestriel** équivalent vérifie $(1+i)^2=1{,}03$, d'où $i=\sqrt{1{,}03}-1$. **Ne jamais diviser 3 % par 2** ici.

</details>

### 2.2 L'obligation moins-disante à livrer

Le vendeur **reçoit** $(\text{règlement}\times\text{facteur})+\text{courus}$ et **paie** $\text{prix coté}+\text{courus}$. Les intérêts courus s'annulent :

$$\boxed{\text{moins-disante}=\arg\min\big[\text{prix coté}-(\text{dernier règlement}\times\text{facteur de conversion})\big]}$$

<details><summary>**Exercice résolu — choisir entre trois obligations (exemple 6.1)**</summary>

**Données.** Dernier règlement **93-08**, soit **93,25**.

| Obligation | Prix coté | Facteur |
|---|---|---|
| 1 | 99,50 | 1,0382 |
| 2 | 143,50 | 1,5188 |
| 3 | 119,75 | 1,2615 |

*Étape 1 — coût de livraison de chacune.*

$$1:\ 99{,}50-(93{,}25\times1{,}0382)=\mathbf{2{,}69}$$

$$2:\ 143{,}50-(93{,}25\times1{,}5188)=\mathbf{1{,}87}$$

$$3:\ 119{,}75-(93{,}25\times1{,}2615)=\mathbf{2{,}12}$$

*Étape 2 — choisir le minimum.* **L'obligation 2** est la moins-disante à livrer.

⚠️ **Le piège de lecture.** L'obligation la moins chère **en prix coté** (la n° 1, à 99,50) n'est **pas** la moins-disante. C'est **l'écart au prix de facture** qui compte, jamais le prix nu.

</details>

**Ce qui détermine la moins-disante — quatre régularités.**

| Situation | Obligation favorisée |
|---|---|
| Rendements **supérieurs à 6 %** | **faible coupon, longue maturité** |
| Rendements **inférieurs à 6 %** | **fort coupon, courte maturité** |
| Courbe **croissante** | **longue** maturité |
| Courbe **décroissante** | **courte** maturité |

> **Le *wild card play* — la deuxième option du vendeur.** La cotation du futures T-bond **cesse à 14 h** (heure de Chicago), mais les obligations continuent d'être traitées au comptant **jusqu'à 16 h**, et le vendeur a **jusqu'à 20 h** pour émettre son avis d'intention de livrer. *Si l'avis est émis, le prix de facture est calculé sur le **prix de règlement du jour** — celui d'avant la cloche de 14 h.*
>
> **La stratégie.** *Si les prix obligataires baissent après 14 h le premier jour du mois de livraison, le vendeur peut émettre son avis à, disons, 15 h 45, puis acheter les obligations au comptant pour les livrer au prix futures de 14 h. Si le prix ne baisse pas, il garde sa position ouverte et attend le lendemain, où la même stratégie peut être utilisée.*
>
> ⚠️ ***Comme les autres options ouvertes au vendeur, le wild card play n'est pas gratuit. Sa valeur se reflète dans le prix futures, qui est plus bas qu'il ne le serait sans cette option.***

### 2.3 Le prix futures théorique

*Un prix théorique exact est **difficile** à déterminer parce que les options du vendeur — calendrier et choix de l'obligation — **ne se valorisent pas facilement**.* Mais **si l'on suppose connues la moins-disante et la date de livraison**, le T-bond futures est un futures sur un titre versant un **revenu connu**, donc (5.2) s'applique :

$$\boxed{F_0=(S_0-I)e^{rT}}\;\text{(6.1)}$$

⚠️ *En pratique, pour estimer la moins-disante, les analystes supposent habituellement que les taux zéro à la maturité du futures **égaleront les taux forward d'aujourd'hui**.*

<details><summary>**Exercice résolu — le prix futures T-bond complet (exemple 6.2)**</summary>

**Données.** Moins-disante : obligation **12 %**, facteur **1,6000**. Livraison dans **270 jours**. Dernier coupon il y a **60 jours**, prochain dans **122 jours**, le suivant dans **305 jours**. Courbe **plate** à **10 %** continu. Prix **coté** actuel : **115**.

*Étape 1 — passer au prix caisse.*

$$115+\frac{60}{60+122}\times6=115+1{,}978=\mathbf{116{,}978}$$

*Étape 2 — valeur actuelle du coupon intermédiaire.* Il tombe dans $122/365=0{,}3342$ an :

$$I=6e^{-0{,}1\times0{,}3342}=\mathbf{5{,}803}$$

*Étape 3 — appliquer (6.1).* $T=270/365=0{,}7397$ an :

$$F^{\text{caisse}}=(116{,}978-5{,}803)e^{0{,}1\times0{,}7397}=111{,}175\times1{,}07677=\mathbf{119{,}711}$$

*Étape 4 — revenir au prix coté.* À la livraison, il y a **148 jours** de courus (270 − 122), sur une période de coupon de $148+35=183$ jours :

$$F^{\text{coté}}=119{,}711-6\times\frac{148}{183}=119{,}711-4{,}852=\mathbf{114{,}859}$$

*Étape 5 — diviser par le facteur.* *Par définition du facteur de conversion, 1,6000 obligations standard équivalent à chaque obligation 12 %* :

$$\frac{114{,}859}{1{,}6000}=\mathbf{71{,}79}$$

⚠️ **Les quatre passages obligés, dans l'ordre.** coté → **caisse** (+courus) · retrancher **la VA des coupons** · capitaliser à $e^{rT}$ · caisse → **coté** (−courus à la livraison) · diviser par le **facteur**. Sauter l'un d'eux fausse tout.

</details>

## 🔴 Concept 3 — Le futures eurodollar

> **L'eurodollar** est *un dollar déposé dans une banque américaine ou étrangère **hors des États-Unis***. Le taux eurodollar est celui auquel une banque dépose auprès d'une autre : *essentiellement le même que le LIBOR*.

> **Le contrat.** *Un futures eurodollar 3 mois est un futures sur l'intérêt qui sera payé — par quelqu'un empruntant au taux eurodollar — sur **1 million de dollars** pour une **période future de trois mois**.* Échéances mars, juin, septembre, décembre **jusqu'à 10 ans** dans le futur (en 2010, on pouvait donc se positionner sur les taux de **2020**).

**Le mécanisme de règlement.** Le contrat s'achève le **troisième mercredi** du mois de livraison. Il est réglé quotidiennement jusqu'à cette date, où le **prix de règlement final** est fixé à

$$\boxed{100-R}$$

$R$ étant le **taux eurodollar 3 mois réellement observé** ce jour-là, en capitalisation **trimestrielle** et convention **actual/360**. *Si le taux s'avère être 0,75 %, le règlement final est **99,2500**.*

**La règle des 25 dollars.**

$$1\ \text{point de base}=0{,}01\ \text{de cotation}\ \Longleftrightarrow\ \mathbf{25\ \text{dollars}}\ \text{par contrat}$$

car $1\,000\,000\times0{,}0001\times0{,}25=\mathbf{25}$. *La règle est donc cohérente avec le fait que le contrat verrouille un taux sur 1 million pour trois mois.*

⚠️ **Le sens de la position.** *La cotation vaut 100 moins le taux futures : un investisseur **long gagne quand les taux baissent**, un investisseur **court gagne quand les taux montent**.* C'est l'inverse de l'intuition « long = je parie sur la hausse ».

**Le prix du contrat.**

$$\boxed{\text{prix}=10\,000\times\big[100-0{,}25\times(100-Q)\big]}\;\text{(6.2)}$$

*Pour $Q=99{,}3100$ : $10\,000\times[100-0{,}25\times0{,}69]=\mathbf{998\,275}$ dollars. Pour $Q=99{,}5300$ : $\mathbf{998\,825}$ — une différence de **550 dollars**, cohérente avec $22\ \text{pb}\times25$.*

<details><summary>**Exercice résolu — verrouiller un taux de placement (exemple 6.3)**</summary>

**Énoncé.** Un investisseur veut fixer le taux d'un placement de **100 millions** sur trois mois à partir du **19 septembre 2012**. Le futures eurodollar septembre 2012 cote **96,50**.

*Étape 1 — lire le taux verrouillé.* $100-96{,}50=\mathbf{3{,}5\,\%}$ par an. *Étape 2 — choisir le sens.* Il **place** : il craint la **baisse** des taux. Un long gagne quand les taux baissent → il **achète**. *Étape 3 — dimensionner.* $100\,000\,000/1\,000\,000=\mathbf{100}$ contrats. *Étape 4 — le dénouement.* Le taux 3 mois s'avère être **2,6 %** → règlement final **97,40**. *Étape 5 — le gain futures.* La cotation est montée de $96{,}50$ à $97{,}40$, soit **90 points de base** :

$$100\times25\times90=\mathbf{225\,000}\ \text{dollars}$$

*Étape 6 — l'intérêt réellement gagné.* $100\,000\,000\times0{,}25\times0{,}026=\mathbf{650\,000}$. *Étape 7 — le total.* $650\,000+225\,000=\mathbf{875\,000}$ — exactement l'intérêt à 3,5 % : $100\,000\,000\times0{,}25\times0{,}035=875\,000$ .

⚠️ **La couverture n'est pourtant pas parfaite, pour deux raisons.** (a) *Les futures sont réglés **quotidiennement**, pas tout à la fin.* (b) *Le règlement final a lieu le **19 septembre 2012**, alors que l'intérêt du placement est perçu **trois mois plus tard**.* *L'ajustement du second point :* réduire la taille de la couverture du facteur $1/(1+0{,}035\times0{,}25)=\mathbf{0{,}9913}$ → acheter **99** contrats plutôt que 100.

</details>

**La lecture de la structure par terme.** *Le taux futures pour la période de 3 mois commençant le 16 juin 2010 était de **0,69 %** ; le 15 septembre 2010, **0,95 %** ; le 15 décembre 2010, **1,105 %** ; et le 16 décembre 2015, **4,42 %*** — une courbe nettement croissante.

**Les contrats analogues à l'étranger.** *Euroyen* (CME Group) · ***Euribor* 3 mois** et *Euroswiss* (LIFFE, Euronext).

## 🔴 Concept 4 — Taux forward contre taux futures : l'ajustement de convexité

**Les deux différences avec un FRA.** Le futures eurodollar est réglé **quotidiennement**, avec règlement final en $T_1$ reflétant le taux réalisé entre $T_1$ et $T_2$ ; le FRA n'est pas réglé quotidiennement et son règlement final a lieu en $T_2$.

| Différence | Nature | Effet |
|---|---|---|
| **1** | futures **réglé quotidiennement** vs contrat sans règlement quotidien (payoff en $T_1$) | **abaisse** le forward par rapport au futures |
| **2** | payoff en $T_1$ vs payoff en $T_2$ | **abaisse** aussi, mais **beaucoup moins** pour les contrats longs |

<details><summary>**Pourquoi chacune des deux différences abaisse le taux forward**</summary>

**Différence 1 — le règlement quotidien.** Supposez un contrat de payoff $R_M-R_F$ en $T_1$, et l'**option** de passer au règlement quotidien. *Le règlement quotidien tend à produire des **entrées de trésorerie quand les taux sont élevés** et des **sorties quand ils sont bas**. Vous trouveriez donc attractif d'y passer, parce que vous avez tendance à avoir **plus d'argent sur votre compte de marge quand les taux sont hauts**.* Le marché fixerait donc $R_F$ **plus haut** pour l'alternative avec règlement quotidien. *Dit autrement : **passer du règlement quotidien au règlement en $T_1$ réduit $R_F$**.*

**Différence 2 — la date du payoff.** Supposez le payoff $R_M-R_F$ en **$T_2$** au lieu de $T_1$ (cas du FRA ordinaire). *Si $R_M$ est **élevé**, le payoff est **positif** ; comme les taux sont hauts, le coût pour vous de recevoir ce payoff en $T_2$ plutôt qu'en $T_1$ est **relativement élevé**. Si $R_M$ est **bas**, le payoff est **négatif** ; comme les taux sont bas, le bénéfice de payer en $T_2$ plutôt qu'en $T_1$ est **relativement faible**. Globalement vous préféreriez le payoff en $T_1$ — s'il est en $T_2$, vous devez être compensé par une **réduction de $R_F$**.*

⚠️ **Retenez le raisonnement, pas seulement la formule.** Les deux arguments reposent sur la **corrélation entre le signe du flux et le niveau des taux** — exactement le mécanisme qui, en section 5.8, séparait prix forward et prix futures.

</details>

$$\boxed{\text{taux forward}=\text{taux futures}-\tfrac12\sigma^2T_1T_2}\;\text{(6.3)}$$

où $T_1$ = maturité du **futures**, $T_2$ = maturité du **taux sous-jacent** au futures, et $\sigma$ = **écart-type de la variation du taux court sur un an**. *Les deux taux sont exprimés en capitalisation continue.* La formule *repose sur le modèle de taux de **Ho-Lee*** (chapitre 30).

<details><summary>**Exercice résolu — l'ajustement de convexité à 8 ans (exemple 6.4)**</summary>

**Énoncé.** $\sigma=0{,}012$, futures eurodollar **8 ans** coté **94**.

*Étape 1 — les deux maturités.* $T_1=8$ et $T_2=8{,}25$ (le taux sous-jacent court **3 mois de plus**). *Étape 2 — l'ajustement.*

$$\tfrac12\times0{,}012^2\times8\times8{,}25=\mathbf{0{,}00475}\quad\text{soit }\mathbf{47{,}5}\text{ points de base}$$

*Étape 3 — le taux futures, dans sa convention d'origine.* $100-94=6\,\%$ par an, **actual/360 trimestriel** — c'est-à-dire **1,5 % par 90 jours**. *Étape 4 — convertir en continu actual/365.*

$$\frac{365}{90}\ln(1{,}015)=4{,}0556\times0{,}014889=\mathbf{6{,}038\,\%}$$

*Étape 5 — appliquer (6.3).* $6{,}038-0{,}475=\mathbf{5{,}563\,\%}$ par an, continu.

**Comment l'ajustement grandit.**

| Maturité du futures (ans) | 2 | 4 | 6 | 8 | 10 |
|---|---|---|---|---|---|
| Ajustement (points de base) | **3,2** | **12,2** | **27,0** | **47,5** | **73,8** |

*La taille de l'ajustement est approximativement **proportionnelle au carré** de la maturité : quand la maturité double de 2 à 4 ans, l'ajustement **quadruple** environ.*

⚠️ **Négliger l'ajustement est sans conséquence à un an et catastrophique à dix.** 3,2 pb à 2 ans se perdent dans le bruit ; **73,8 pb** à 10 ans déplacent toute la courbe.

</details>

**Prolonger la courbe zéro LIBOR.** *La courbe jusqu'à 1 an est déterminée par les LIBOR 1, 3, 6 et 12 mois. Une fois l'ajustement de convexité fait, les futures eurodollar servent souvent à la prolonger.* On suppose que *le taux forward calculé à partir du $i$-ème contrat s'applique à la période $[T_i,T_{i+1}]$*, ce qui permet un **bootstrap** : à partir de (4.5),

$$\boxed{R_{i+1}=\frac{F_i(T_{i+1}-T_i)+R_iT_i}{T_{i+1}}}\;\text{(6.4)}$$

<details><summary>**Exercice résolu — prolonger la courbe (exemple 6.5)**</summary>

**Données.** Taux zéro LIBOR **400 jours** : **4,80 %** continu. Forwards 90 jours issus des futures : **5,30 %** à partir de 400 jours · **5,50 %** à partir de 491 jours · **5,60 %** à partir de 589 jours.

*Étape 1 — le taux 491 jours.*

$$R=\frac{0{,}053\times91+0{,}048\times400}{491}=\frac{4{,}823+19{,}2}{491}=\mathbf{0{,}04893}\quad(4{,}893\,\%)$$

*Étape 2 — le taux 589 jours.*

$$R=\frac{0{,}055\times98+0{,}04893\times491}{589}=\frac{5{,}39+24{,}024}{589}=\mathbf{0{,}04994}\quad(4{,}994\,\%)$$

*Étape 3 — poursuivre.* Le forward suivant (5,60 %) détermine la courbe jusqu'à l'échéance du contrat suivant.

⚠️ **La petite approximation assumée.** *Même si le taux sous-jacent au futures eurodollar est un taux **90 jours**, on suppose qu'il s'applique aux **91 ou 98 jours** qui séparent les échéances des contrats.* Hull le signale explicitement — c'est acceptable, pas exact.

</details>

## 🔴 Concept 5 — Couverture par duration

| Symbole | Sens |
|---|---|
| $V_F$ | **prix du contrat** pour un futures de taux |
| $D_F$ | **duration de l'actif sous-jacent** au futures, **à la maturité du futures** |
| $P$ | valeur **forward** du portefeuille couvert à la fin de la couverture (*en pratique on prend sa valeur d'aujourd'hui*) |
| $D_P$ | **duration du portefeuille** à la fin de la couverture |

**La construction.** Sous l'hypothèse que $\Delta y$ est **le même pour toutes les maturités** — c'est-à-dire que seuls des **déplacements parallèles** se produisent :

$$\Delta P\approx-PD_P\,\Delta y\qquad\text{et}\qquad\Delta V_F\approx-V_FD_F\,\Delta y$$

$$\Longrightarrow\qquad\boxed{N^\ast=\frac{PD_P}{V_FD_F}}\;\text{(6.5)}$$

C'est le **ratio de couverture par duration**, aussi appelé **ratio de sensibilité au prix**. *Son emploi a pour effet de rendre **nulle** la duration de la position entière.*

⚠️ **Taux et prix futures bougent en sens opposés.** *Quand les taux montent, un prix de futures de taux **baisse**.* Donc :

| L'entreprise perd si… | Position à prendre |
|---|---|
| les taux **baissent** | **longue** |
| les taux **montent** | **courte** |

⚠️ **Le risque de changement de moins-disante.** *Quand l'instrument de couverture est un futures T-bond, le hedger doit fonder $D_F$ sur l'hypothèse qu'une obligation particulière sera livrée* — il doit **estimer** laquelle sera la moins-disante. *Si l'environnement de taux change ensuite au point qu'une **autre** obligation semble devenir la moins-disante, la couverture doit être ajustée et sa performance peut être moins bonne que prévu.*

**Le choix du contrat.** *Le hedger essaie de choisir le futures dont la duration du sous-jacent est **aussi proche que possible** de celle de l'actif couvert* : **eurodollar** pour les expositions **courtes**, **T-bond et T-note** pour les expositions **longues**.

<details><summary>**Exercice résolu — couvrir 10 millions d'obligations d'État (exemple 6.6)**</summary>

**Énoncé.** 2 août. Un gérant a **10 millions** en obligations d'État et craint une forte volatilité des taux sur **3 mois**. Il utilise le futures T-bond **décembre**, coté **93-02**. Duration du portefeuille dans 3 mois : **6,80 ans**. Moins-disante attendue : obligation **20 ans à 12 %**, rendement **8,80 %**, duration **9,20 ans** à la maturité du futures.

*Étape 1 — le prix du contrat.* $93\text{-}02=93+\dfrac2{32}=93{,}0625$ ; nominal 100 000 → $V_F=\mathbf{93\,062{,}50}$ dollars. *Étape 2 — le sens.* Il détient des obligations : il perd si les **taux montent** → position **courte**. *Étape 3 — appliquer (6.5).*

$$N^\ast=\frac{10\,000\,000}{93\,062{,}50}\times\frac{6{,}80}{9{,}20}=107{,}45\times0{,}73913=\mathbf{79{,}42}$$

*Étape 4 — arrondir.* Le gérant **vend 79 contrats**. *Étape 5 — vérifier la logique.* *Si les taux montent, gain sur la position courte et perte sur le portefeuille ; s'ils baissent, perte sur la position courte et gain sur le portefeuille.*

⚠️ **Les deux durations ne jouent pas le même rôle.** $D_P$ est celle du portefeuille **à la fin de la couverture** ; $D_F$ est celle de la **moins-disante**, **à la maturité du futures**. Utiliser les durations d'aujourd'hui est une approximation courante mais délibérée.

</details>

## 🟠 Concept 6 — Adossement des durations et gestion GAP

> **Adossement des durations** (*duration matching*) ou **immunisation de portefeuille** : les institutions financières font en sorte que la **duration moyenne des actifs égale la duration moyenne des passifs** (*les passifs pouvant être vus comme des positions courtes en obligations*). *Un petit déplacement **parallèle** des taux n'a alors qu'un effet minime : le gain (la perte) sur les actifs compense la perte (le gain) sur les passifs.*

⚠️ **La faiblesse, énoncée sans détour.** *L'adossement des durations n'immunise **pas** contre les déplacements **non parallèles**. En pratique, les taux courts sont habituellement **plus volatils** que les taux longs et **imparfaitement corrélés** avec eux. Il arrive même que les taux courts et longs bougent **en sens opposés**. L'adossement n'est donc qu'une **première étape**.*

> **La gestion GAP.** L'approche courante consiste à **découper la courbe zéro en segments** appelés ***buckets*** — le premier de 0 à 1 mois, le second de 1 à 3 mois, et ainsi de suite. *Le comité de gestion actif-passif examine alors l'effet, sur la valeur du portefeuille de la banque, d'une variation des taux zéro correspondant à **un seul bucket**, les autres restant inchangés.*
>
> **En cas de décalage**, deux leviers : **modifier les taux de dépôt et de crédit** (mécanisme de la section 4.10, fiche 77) ou utiliser des **swaps, FRA, futures obligataires, futures eurodollar** et autres dérivés de taux.

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| Deux dates et un coupon | **intérêts courus** | jours/jours × coupon, dans la bonne convention |
| Une cotation « 95-16 » ou « 124-150 » | **conversion** | $/32$, troisième chiffre = **quarts** de $1/32$ |
| Un bon du Trésor coté « 8 » | **prix caisse et vrai taux** | $P=\frac{360}n(100-Y)$ puis intérêt / prix payé |
| Une liste d'obligations + facteurs + règlement | **moins-disante** | minimiser $\text{coté}-(\text{règlement}\times\text{facteur})$ |
| Un coupon et une maturité, sans autre donnée | **facteur de conversion** | actualiser à **3 % par semestre**, arrondir au trimestre |
| Une cotation eurodollar et un taux réalisé | **gain** | $(\Delta\text{pb})\times25\times n_{\text{contrats}}$ |
| $\sigma$ et une maturité longue | **ajustement de convexité** | $\frac12\sigma^2T_1T_2$ |
| Des forwards successifs et un taux zéro | **prolonger la courbe** | $R_{i+1}=\frac{F_i(T_{i+1}-T_i)+R_iT_i}{T_{i+1}}$ |
| Deux durations et deux valeurs | **nombre de contrats** | $N^\ast=\frac{PD_P}{V_FD_F}$ |

## Comment résoudre ce type d'exercice

**Protocole prix futures T-bond — 5 étapes.**

1. Prix **coté** → prix **caisse** : ajouter les intérêts courus $\frac{\text{jours écoulés}}{\text{jours de la période}}\times$ coupon.
2. Calculer $I$ = **valeur actuelle** des coupons tombant **pendant la vie du futures**.
3. $F^{\text{caisse}}=(S_0-I)e^{rT}$.
4. Prix caisse → prix **coté** : retrancher les intérêts courus **à la date de livraison**.
5. **Diviser par le facteur de conversion**.

**Protocole couverture par duration — 4 étapes.**

1. Convertir la cotation du futures en **prix du contrat** $V_F$ (× nominal / 100).
2. Déterminer le **sens** : détenteur d'obligations → **court** ; futur emprunteur → **court** ; futur prêteur → **long**.
3. $N^\ast=\dfrac{PD_P}{V_FD_F}$, avec $D_F$ = duration de la **moins-disante à la maturité du futures**.
4. **Arrondir** et énoncer explicitement les limites : déplacements **parallèles** seulement, moins-disante **supposée fixe**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Lire « 117-157 » comme $117+15{,}7/32$ | Le 3ᵉ chiffre est en **quarts** de $1/32$ : $117+15{,}75/32$ |
| Oublier les intérêts courus dans le prix caisse | $\text{caisse}=\text{coté}+\text{courus}$, **toujours** |
| Prendre le taux d'escompte pour un rendement | Le rendement divise par le **prix payé**, pas par 100 |
| Choisir la moins-disante sur le **prix coté** | Minimiser $\text{coté}-(\text{règlement}\times\text{facteur})$ |
| Diviser 3 % par 2 pour un trimestre | Le taux trimestriel est $\sqrt{1{,}03}-1=1{,}4889\,\%$ |
| Oublier de retrancher les courus dans le cas « 3 mois de plus » | La règle du facteur de conversion l'exige explicitement |
| Croire qu'un long eurodollar gagne si les taux montent | La cotation est $100-R$ : **long = pari sur la baisse** |
| Confondre 1 pb de cotation et 1 pb de prix | 1 pb $=$ **25 dollars** par contrat |
| Ignorer l'ajustement de convexité sur un contrat long | **73,8 pb** à 10 ans — ce n'est pas du bruit |
| Confondre $T_1$ et $T_2$ dans l'ajustement | $T_1$ = maturité du **futures**, $T_2=T_1+0{,}25$ |
| Croire que l'adossement des durations immunise contre tout | Seulement les **déplacements parallèles** |
| Utiliser la duration du portefeuille **aujourd'hui** sans le dire | $D_P$ est celle **à la fin de la couverture** |

## 📌 Ultimate Review

**Conventions.** Actual/actual (Trésor US) · 30/360 (corporate) · Actual/360 (monétaire, LIBOR sauf GBP) · $\text{caisse}=\text{coté}+\text{courus}$ · $P=\frac{360}n(100-Y)$ pour les T-bills · cotations en $1/32$, 3ᵉ chiffre en **quarts** de $1/32$.

**T-bond.** Facture $=(\text{règlement}\times\text{facteur})+\text{courus}$ · facteur = prix à **6 % semestriel**, maturité **arrondie au trimestre inférieur** · moins-disante $=\min[\text{coté}-(\text{règlement}\times\text{facteur})]$ · $F_0=(S_0-I)e^{rT}$, puis **retirer les courus** et **diviser par le facteur**.

**Eurodollar.** Règlement final $100-R$ le **3ᵉ mercredi** · **1 pb = 25 dollars** · prix $=10\,000[100-0{,}25(100-Q)]$ · **long = pari sur la baisse des taux** · ajustement : $\text{forward}=\text{futures}-\frac12\sigma^2T_1T_2$ · bootstrap : $R_{i+1}=\frac{F_i(T_{i+1}-T_i)+R_iT_i}{T_{i+1}}$.

**Couverture.** $N^\ast=\dfrac{PD_P}{V_FD_F}$ · taux ↑ ⇒ prix futures ↓ · eurodollar pour le **court**, T-bond pour le **long**.

**Les chiffres du chapitre.** Intérêts 1ᵉʳ mars→3 juillet : **2,6957** (actual/actual) contre **2,7111** (30/360) · T-bill 91 jours coté 8 → vrai taux **2,064 %** · 95-16 le 5 mars 2010 → caisse **97,14** · facteurs **1,4623** et **1,2199** · moins-disante : coûts **2,69 / 1,87 / 2,12** → obligation **2** · exemple 6.2 → **71,79** · prix du contrat eurodollar à 99,31 → **998 275** · ajustements de convexité **3,2 / 12,2 / 27,0 / 47,5 / 73,8** pb · exemple 6.4 → **5,563 %** · exemple 6.5 → **4,893 %** et **4,994 %** · exemple 6.6 → **79 contrats**.

**Les trois options du vendeur de T-bond** — *toutes font baisser le prix futures* : livrer **n'importe quel jour** du mois · choisir **quelle obligation** · émettre l'avis jusqu'à **20 h** au prix de règlement de **14 h** (*wild card play*).

## 🧠 Active Recall

<details><summary>Pourquoi préférer une obligation corporate à une obligation d'État entre le 28 février et le 1ᵉʳ mars 2013 ?</summary>

À cause de la **convention de décompte**. En **30/360** (corporate), il y a **3 jours** entre le 28 février et le 1ᵉʳ mars (on complète le mois à 30). En **actual/actual** (Trésor US), il n'y en a **qu'un**. À coupon et prix cotés identiques, la corporate rapporte donc **environ trois fois plus** d'intérêts sur cette journée.

</details>

<details><summary>Un bon du Trésor 91 jours est coté 8. Quel est son prix caisse et son vrai taux ?</summary>

Le taux d'escompte s'applique à la **valeur faciale** : intérêt $=100\times0{,}08\times\frac{91}{360}=\mathbf{2{,}0222}$, donc prix caisse $Y=\mathbf{97{,}9778}$. Le **vrai** taux se calcule sur le prix payé : $\frac{2{,}0222}{97{,}9778}=\mathbf{2{,}064\,\%}$ sur 91 jours. Le taux d'escompte **sous-estime** toujours le rendement.

</details>

<details><summary>Décoder la cotation 117-157 et expliquer la règle.</summary>

$117+\dfrac{15{,}75}{32}=\mathbf{117{,}492188}$. Le troisième chiffre code des **quarts de trente-deuxième** : `0`$=0$, `2`$=\frac14$, `5`$=\frac12$, `7`$=\frac34$. Donc `157` signifie $15$ et $\frac34$ de trente-deuxièmes. Vérifications : `120-105` $=120+\frac{10{,}5}{32}=120{,}328125$ ; `108-302` $=108+\frac{30{,}25}{32}=108{,}945313$.

</details>

<details><summary>Définir le facteur de conversion et calculer celui d'une obligation 10 % à 20 ans et 2 mois.</summary>

C'est *le prix coté qu'aurait l'obligation, par dollar de principal, le premier jour du mois de livraison, si le taux de **toutes** les maturités valait **6 % semestriel***.

Arrondi au trimestre inférieur : **20 ans exactement**, premier coupon dans 6 mois, **40 périodes**, coupon **5**, taux **3 % par période** :

$$\sum_{i=1}^{40}\frac{5}{1{,}03^i}+\frac{100}{1{,}03^{40}}=146{,}23\ \Longrightarrow\ \text{facteur}=\mathbf{1{,}4623}$$

</details>

<details><summary>Trois obligations, règlement 93,25 : (99,50 ; 1,0382), (143,50 ; 1,5188), (119,75 ; 1,2615). Laquelle livrer ?</summary>

On minimise $\text{coté}-(\text{règlement}\times\text{facteur})$ : $99{,}50-96{,}81=\mathbf{2{,}69}$ · $143{,}50-141{,}63=\mathbf{1{,}87}$ · $119{,}75-117{,}63=\mathbf{2{,}12}$. **L'obligation 2**, alors même qu'elle est de loin la **plus chère** en prix coté — les intérêts courus s'annulent entre ce qu'on reçoit et ce qu'on paie, seul compte l'écart au prix de facture.

</details>

<details><summary>Expliquer le *wild card play* et son effet sur le prix futures.</summary>

La cotation du futures cesse à **14 h**, le comptant continue jusqu'à **16 h**, et le vendeur a jusqu'à **20 h** pour émettre son avis de livraison — **facturé au prix de règlement de 14 h**. Si les prix obligataires **baissent** après 14 h, il émet l'avis à 15 h 45 et **achète au comptant moins cher** pour livrer au prix de 14 h. Sinon, il attend le lendemain. *Comme les autres options du vendeur, elle n'est pas gratuite : sa valeur se reflète dans un **prix futures plus bas**.*

</details>

<details><summary>Un futures eurodollar passe de 99,31 à 99,27. Que gagne ou perd un long d'un contrat, et pourquoi 25 dollars par point de base ?</summary>

La cotation baisse de **4 points de base** → le long **perd $4\times25=\mathbf{100}$ dollars** (le court gagne autant). La règle vient de la définition du contrat : 1 pb de taux sur 1 million pendant 3 mois vaut

$$1\,000\,000\times0{,}0001\times0{,}25=\mathbf{25}\ \text{dollars}$$

</details>

<details><summary>Pourquoi le taux forward est-il inférieur au taux futures eurodollar ?</summary>

Deux effets, tous deux dans le même sens. **(1) Le règlement quotidien** : il produit des entrées de trésorerie **quand les taux sont hauts** et des sorties quand ils sont bas — vous avez donc plus d'argent placé au taux fort. Cette option est attractive, le marché la fait payer par un $R_F$ **plus haut** pour le futures. **(2) La date du payoff** : recevoir en $T_2$ plutôt qu'en $T_1$ coûte cher quand les taux sont hauts (payoff positif) et rapporte peu quand ils sont bas (payoff négatif) — il faut compenser par un $R_F$ **plus bas**. L'ajustement : $\text{forward}=\text{futures}-\frac12\sigma^2T_1T_2$.

</details>

<details><summary>Avec $\sigma=0{,}012$ et un futures eurodollar 8 ans coté 94, calculer le taux forward continu.</summary>

*Ajustement* : $\frac12\times0{,}012^2\times8\times8{,}25=0{,}00475=\mathbf{47{,}5}$ pb. *Taux futures* : $100-94=6\,\%$ actual/360 trimestriel $=1{,}5\,\%$ par 90 jours, soit $\frac{365}{90}\ln(1{,}015)=\mathbf{6{,}038\,\%}$ continu actual/365. *Forward* : $6{,}038-0{,}475=\mathbf{5{,}563\,\%}$. L'ajustement croît comme le **carré** de la maturité : 3,2 pb à 2 ans, 12,2 à 4 ans, 73,8 à 10 ans.

</details>

<details><summary>Un gérant a 10 M en obligations (duration 6,80), futures T-bond à 93-02, moins-disante de duration 9,20. Que fait-il ?</summary>

$V_F=(93+\frac2{32})\times1\,000=\mathbf{93\,062{,}50}$ dollars.

$$N^\ast=\frac{10\,000\,000\times6{,}80}{93\,062{,}50\times9{,}20}=\mathbf{79{,}42}\ \longrightarrow\ \textbf{vendre 79 contrats}$$

**Vendre**, parce qu'il perd si les taux **montent** et qu'un prix de futures de taux **baisse** quand les taux montent. Deux réserves : la couverture ne vaut que pour un déplacement **parallèle**, et elle suppose la **moins-disante inchangée**.

</details>

<details><summary>Qu'est-ce que la gestion GAP, et quel défaut de l'adossement des durations corrige-t-elle ?</summary>

L'adossement des durations n'immunise que contre les déplacements **parallèles** — or *les taux courts sont plus volatils que les longs, imparfaitement corrélés, et bougent parfois en sens opposés*. La **gestion GAP** découpe la courbe zéro en **segments (*buckets*)** — 0-1 mois, 1-3 mois, etc. — et le comité ALM examine l'effet, sur la valeur du portefeuille, d'une variation des taux **d'un seul bucket**, les autres restant fixes. En cas de décalage : ajuster les **taux de dépôt et de crédit**, ou utiliser **swaps, FRA, futures**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Convention du Trésor US ? | **Actual/actual (in period)** |
| Convention des obligations corporate US ? | **30/360** |
| Convention du marché monétaire US ? | **Actual/360** |
| Convention du LIBOR ? | **Actual/360**, sauf la **livre** (actual/365) |
| Intérêt sur 365 jours en actual/360 ? | **365/360** fois le taux coté |
| Prix caisse ? | Prix coté **+ intérêts courus** |
| Autres noms ? | *Clean price* / *dirty price* |
| Formule du prix coté d'un T-bill ? | $P=\frac{360}{n}(100-Y)$ |
| T-bill 91 jours coté 8 : vrai taux ? | **2,064 %** sur la période |
| Cotation « 90-05 » ? | $90+\frac5{32}=\mathbf{90{,}15625}$ |
| Que code le 3ᵉ chiffre d'une cotation futures ? | Des **quarts** de $1/32$ (0, ¼, ½, ¾) |
| Nominal d'un contrat T-bond ? | **100 000 dollars** |
| Maturité livrable au T-bond ? | **&gt; 15 ans**, non rappelable avant 15 ans |
| Maturité livrable au T-note 10 ans ? | Entre **6,5 et 10 ans** |
| Caisse reçue par le vendeur ? | $(\text{règlement}\times\text{facteur})+\text{courus}$ |
| Définition du facteur de conversion ? | Prix coté de l'obligation **à 6 % semestriel** |
| Arrondi utilisé ? | Au **trimestre inférieur** |
| Cas « 3 mois en plus » ? | Premier coupon **à 3 mois**, on **retranche les courus** |
| Taux trimestriel équivalent à 3 % semestriel ? | $\sqrt{1{,}03}-1=\mathbf{1{,}4889\,\%}$ |
| Critère de la moins-disante ? | $\min[\text{coté}-(\text{règlement}\times\text{facteur})]$ |
| Rendements &gt; 6 % : quelle obligation ? | **Faible coupon, longue maturité** |
| Rendements &lt; 6 % ? | **Fort coupon, courte maturité** |
| Courbe croissante ? | Maturité **longue** favorisée |
| *Wild card play* ? | Avis jusqu'à **20 h** au prix de règlement de **14 h** |
| Effet des options du vendeur sur $F_0$ ? | Elles le font **baisser** |
| Prix futures T-bond ? | $(S_0-I)e^{rT}$, puis **−courus**, puis **/facteur** |
| Qu'est-ce qu'un eurodollar ? | Un dollar déposé dans une banque **hors des États-Unis** |
| Nominal du contrat eurodollar ? | **1 million** de dollars, **3 mois** |
| Quand se règle-t-il ? | Le **3ᵉ mercredi** du mois de livraison |
| Prix de règlement final ? | $\mathbf{100-R}$ |
| Valeur d'un point de base ? | **25 dollars** par contrat |
| Formule du prix du contrat ? | $10\,000[100-0{,}25(100-Q)]$ |
| Un long eurodollar gagne quand… ? | Les taux **baissent** |
| Horizon des échéances eurodollar ? | Jusqu'à **10 ans** |
| Les deux différences futures/FRA ? | **Règlement quotidien** · **date du payoff** ($T_1$ vs $T_2$) |
| Sens de ces deux effets ? | Les deux **abaissent** le taux forward |
| Formule de l'ajustement de convexité ? | $\text{forward}=\text{futures}-\frac12\sigma^2T_1T_2$ |
| Que représente $\sigma$ ? | L'**écart-type de la variation du taux court sur un an** |
| Modèle sous-jacent à la formule ? | **Ho-Lee** |
| Ajustement à 10 ans (σ = 0,012) ? | **73,8** points de base |
| Comment croît l'ajustement ? | Comme le **carré** de la maturité |
| Formule de prolongement de la courbe ? | $R_{i+1}=\frac{F_i(T_{i+1}-T_i)+R_iT_i}{T_{i+1}}$ |
| Ratio de couverture par duration ? | $N^\ast=\dfrac{PD_P}{V_FD_F}$ |
| Autre nom de ce ratio ? | Ratio de **sensibilité au prix** |
| Effet d'une hausse des taux sur un prix de futures de taux ? | Il **baisse** |
| L'entreprise perd si les taux montent : quelle position ? | **Courte** |
| Quel contrat pour une exposition courte ? longue ? | **Eurodollar** / **T-bond et T-note** |
| Risque propre à la couverture T-bond ? | Le changement de **moins-disante** |
| Adossement des durations : contre quoi protège-t-il ? | Les déplacements **parallèles** seulement |
| Qu'est-ce qu'un *bucket* ? | Un **segment** de la courbe zéro en gestion GAP |
