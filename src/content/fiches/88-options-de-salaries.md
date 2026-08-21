# Fiche 88 — Options de salariés : contrat, comptabilisation, valorisation

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 15 « Employee Stock Options » |
| **Difficulté** | Mid — un seul calcul difficile (l'arbre), mais des raisonnements fins |
| **Temps d'étude estimé** | 1 h |
| **Prérequis** | Fiches 83, 85, 87 |
| **Concepts clés** | Période d'acquisition, incessibilité, exercice anticipé, coûts d'agence, FAS 123 et IAS 2, plans non traditionnels, méthode de la vie espérée, arbre binomial avec départs, multiple d'exercice, approche de marché, dilution, antidatation |
| **Poids à l'examen** | **Pourquoi** l'incessibilité change la règle d'exercice · l'**arbre avec probabilités d'exercice et de départ** · l'argument selon lequel **la dilution ne se compte pas deux fois**. |

## 🎯 Vue d'ensemble

```
CONTRAT     10 à 15 ans · à la monnaie à l'attribution · ACQUISITION jusqu'à 4 ans
            INCESSIBLES · exercice → l'entreprise ÉMET de nouvelles actions
CONSÉQUENCE l'incessibilité fait exercer BEAUCOUP PLUS TÔT qu'une option ordinaire
COMPTA      avant 2005 : valeur INTRINSÈQUE (donc zéro) → depuis 2005 : JUSTE VALEUR
VALORISER   (1) vie espérée dans Black-Scholes   (2) arbre avec départs et exercices
            (3) multiple d'exercice              (4) marché (enchère hollandaise)
DILUTION    déjà dans le cours dès l'ANNONCE — ne pas la compter deux fois
ANTIDATER   illégal · SEC 2002 : déclaration sous 2 jours ouvrés
```

**Ce que c'est.** *Des **calls sur l'action de l'entreprise, attribués par elle à ses salariés**. Ils leur donnent une participation à la fortune de l'entreprise : si le cours dépasse le strike, ils gagnent en exerçant puis en revendant au prix du marché.*

> **L'ampleur du phénomène.** *Beaucoup d'entreprises, en particulier technologiques, estiment que **le seul moyen d'attirer et de garder les meilleurs** est d'offrir des paquets d'options très attractifs. **Microsoft** fut l'une des premières à les utiliser : tous ses salariés en recevaient et, le cours montant, on estime que **plus de 10 000 d'entre eux sont devenus millionnaires**. En **2003**, Microsoft a annoncé qu'elle **cessait** d'utiliser des options et attribuerait des **actions** à la place.*

## 🔴 Concept 1 — Les cinq clauses, et celle qui change tout

| # | Clause |
|---|---|
| 1 | **Période d'acquisition** (*vesting*) pendant laquelle les options **ne peuvent pas être exercées** — *jusqu'à quatre ans* |
| 2 | Départ **pendant** l'acquisition (volontaire **ou non**) → **perte des options** |
| 3 | Départ **après** l'acquisition → **perte** des options hors la monnaie, et **exercice quasi immédiat obligatoire** de celles dans la monnaie |
| 4 | **Les salariés ne sont pas autorisés à vendre les options** |
| 5 | À l'exercice, **l'entreprise émet de nouvelles actions** et les vend au salarié au prix d'exercice |

> **La clause 4 a des implications importantes.** *Si des salariés veulent, pour quelque raison que ce soit, tirer un bénéfice en espèces d'options acquises, **ils doivent les exercer et vendre les actions sous-jacentes**. Ils ne peuvent pas les vendre à quelqu'un d'autre. **Cela conduit à une tendance à exercer les options de salariés plus tôt** que des calls ordinaires comparables.*

<details class="details--riche">
<summary>

**Le raisonnement complet sur l'exercice anticipé — et sa conclusion contre-intuitive**

</summary>

**La question.** *Un salarié devrait-il jamais exercer avant l'échéance **et garder l'action** plutôt que la vendre ?*

*Étape 1 — poser deux options.* **Option A** = l'option de salarié (incessible). **Option B** = une option ordinaire identique, **vendable sur le marché**. *Étape 2 — ce qu'on sait de B.* Sans dividende, **B ne doit jamais être exercée par anticipation** (fiche 83). *Étape 3 — la conclusion pour A.* *Il s'ensuit qu'**il n'est pas optimal d'exercer A et de garder l'action**.* Si le salarié veut conserver une participation dans son entreprise, *une meilleure stratégie est de **garder l'option** : cela **retarde le paiement du strike** et **conserve la valeur d'assurance** de l'option.* *Étape 4 — la seule exception.* *Ce n'est une stratégie rationnelle d'exercer A par anticipation **et de garder l'action** que **lorsqu'il est optimal d'exercer B*** — c'est-à-dire, d'après la fiche 87, **seulement quand un dividende relativement élevé est imminent**. *(Hull ajoute en note une seule autre exception : quand un dirigeant veut détenir l'action **pour ses droits de vote**.)*

> ⚠️ **La distinction cruciale.** L'incessibilité justifie d'exercer tôt **pour vendre l'action** (encaisser, diversifier). Elle ne justifie **jamais** d'exercer tôt **pour garder l'action** — cela ne fait que payer le strike plus tôt et détruire la valeur d'assurance.

**Et en pratique ?** *Le comportement d'exercice anticipé **varie largement d'une entreprise à l'autre**. Dans certaines il y a une **culture de non-exercice anticipé** ; dans d'autres, les salariés tendent à exercer et vendre **peu après la fin de la période d'acquisition**, même si les options ne sont que **légèrement** dans la monnaie.*

</details>

## 🟠 Concept 2 — Ces options alignent-elles vraiment les intérêts ?

**Le cadre.** *Les dirigeants sont les **agents** des actionnaires ; les économistes parlent de **coûts d'agence** pour les pertes subies quand les intérêts des agents et des principaux ne sont pas alignés* (fiche 81).

| Situation | Verdict de Hull |
|---|---|
| **Jeune pousse** | *Il ne fait guère de doute qu'elles servent un but utile* : un **excellent moyen** pour les actionnaires principaux — souvent aussi les dirigeants — de **motiver les salariés à travailler de longues heures**. Succès et introduction en bourse → ils font très bien ; échec → les options ne valent rien |
| **Dirigeants de sociétés cotées** | **Le cas le plus controversé** — *on estime que les options représentent environ **50 %** de la rémunération des dirigeants américains* |

> ⚠️ **La critique décisive : l'asymétrie des payoffs.** *On parle de « rémunération à la performance » : si le cours monte, les actionnaires gagnent et le dirigeant est récompensé. **Mais cela oublie l'asymétrie des payoffs de l'option. Si l'entreprise fait mal, les actionnaires perdent de l'argent — alors que tout ce qui arrive aux dirigeants est qu'ils ne réalisent pas de gain. Contrairement aux actionnaires, ils ne subissent pas de perte.***
>
> ***Une meilleure forme de rémunération à la performance consiste, plus simplement, à donner des ACTIONS aux dirigeants : leurs gains et pertes reflètent alors ceux des autres actionnaires.***

⚠️ **Le *repricing* aggrave encore le problème.** *Quand des options sont sorties de la monnaie, des entreprises les ont parfois **remplacées par de nouvelles options à la monnaie**. Cette pratique conduit à ce que **les gains et pertes du dirigeant soient encore moins liés à ceux des actionnaires**.*

**Les quatre tentations et distorsions créées.**

| Problème | Mécanisme |
|---|---|
| **Manipulation du calendrier** | *Un dirigeant prévoyant d'exercer dans trois mois peut être tenté de **calendrier les annonces de bonnes nouvelles** — voire de **déplacer des résultats d'un trimestre à l'autre** — pour que le cours monte juste avant.* Symétriquement, si des options à la monnaie doivent lui être attribuées dans trois mois, il peut être tenté de **faire baisser le cours juste avant** |
| **Court-termisme** | *Même sans irrégularité, elles motivent à **se concentrer sur les profits de court terme au détriment de la performance de long terme*** |
| **Prise de risque excessive** | *Ils pourraient même prendre des risques qu'ils ne prendraient pas autrement — **et qui ne sont pas dans l'intérêt des actionnaires** — à cause de l'asymétrie des payoffs* |
| **Distraction** | *Les options étant une composante énorme de la rémunération, **elles risquent d'être une grande source de distraction** : la direction peut passer trop de temps à penser à sa rémunération et **pas assez à diriger l'entreprise*** |

> **La suggestion radicale.** *Exiger des dirigeants qu'ils **notifient au marché — une semaine à l'avance peut-être — leur intention d'acheter ou de vendre** les actions de leur entreprise, la notification étant **contraignante**. Cela permet au marché de **former ses propres conclusions** sur les raisons de l'opération : **le cours peut monter avant que le dirigeant achète et baisser avant qu'il vende**.*

## 🔴 Concept 3 — La question comptable

> **Le point de principe, et il est litigieux.** *Une option de salarié représente un **coût pour l'entreprise** et un **bénéfice pour le salarié**, comme toute autre forme de rémunération. **Ce point, évident pour beaucoup, est en réalité assez controversé** : de nombreux dirigeants semblent croire qu'une option **n'a aucune valeur tant qu'elle n'est pas dans la monnaie**, et donc qu'une option à la monnaie **n'est pas un coût**.*
>
> ***La réalité est que, si les options sont précieuses pour les salariés, elles doivent représenter un coût pour les actionnaires — et donc pour l'entreprise. Il n'y a pas de repas gratuit.*** *Le coût vient de ce que l'entreprise a accepté que, si son action fait bien, **elle vendra des actions aux salariés à un prix inférieur à celui du marché**.*

**La chronologie réglementaire.**

| Date | Événement |
|---|---|
| Avant **1995** | le coût imputé au compte de résultat est la **valeur intrinsèque** — *la plupart des options étant à la monnaie à l'émission, ce coût était **zéro*** |
| **1995** | **FAS 123**. *Beaucoup attendaient qu'il impose la comptabilisation à la juste valeur ; **à la suite d'un lobbying intense**, il ne fait qu'**encourager** les entreprises à le faire.* À défaut, la juste valeur devait figurer en **note annexe** |
| **Février 2004** | l'IASB publie **IAS 2** : comptabilisation obligatoire à partir de **2005** |
| **Décembre 2004** | **FAS 123 révisé** : idem aux États-Unis à partir de **2005** |

**Ce que les normes exigent aujourd'hui.** *Valoriser les options **à la date d'attribution** et enregistrer le montant en charge au compte de résultat de **l'année de l'attribution**. **Une revalorisation ultérieure n'est pas exigée.***

<details class="details--riche">
<summary>

**L'argument de Hull pour revaloriser chaque année — et l'objection standard**

</summary>

*On peut soutenir que les options **devraient être revalorisées à chaque clôture** (ou chaque trimestre) jusqu'à l'exercice ou l'échéance, **ce qui les traiterait comme toute autre transaction sur dérivés** de l'entreprise. Si l'option gagne en valeur d'une année sur l'autre, il y aurait une **charge supplémentaire** ; si elle en perd, **un impact positif sur le résultat**.*

**Les trois avantages.**

1. *La **charge cumulée** refléterait le **coût réel** des options — **zéro** si elles ne sont pas exercées, ou **le payoff** si elles le sont.*
2. *Bien que la charge d'une **année** donnée dépende du modèle de valorisation, **la charge cumulée sur la vie de l'option n'en dépendrait pas**.*
3. *Il y aurait **beaucoup moins d'incitation à l'antidatation**.*

**L'objection usuelle, et la réfutation de Hull.** *L'inconvénient habituellement cité est que cela **introduirait de la volatilité dans le compte de résultat**. **En fait, le compte de résultat serait probablement MOINS volatil** : quand l'entreprise fait bien, le résultat est **réduit** par la revalorisation des options ; quand elle fait mal, il est **augmenté**.* **C'est un stabilisateur, pas un amplificateur.**

⚠️ *Détail révélateur : **une option réglée en espèces est déjà soumise au traitement proposé ici** — alors qu'il **n'y a aucune différence économique** entre une option réglée en espèces et une option réglée par émission d'actions nouvelles.*

</details>

**Les plans non traditionnels.** *On comprend pourquoi les options d'avant 2005 étaient **à la monnaie à l'attribution** avec un strike **fixe** : tout écart aurait obligé à les comptabiliser. **Maintenant que toutes les options sont comptabilisées à la juste valeur**, beaucoup d'entreprises envisagent des alternatives.*

| Variante | Mécanique | Objectif |
|---|---|---|
| **Strike indexé** | Cours 30, S&P 500 à 1 500 → strike initial **30**. Si le S&P monte de **10 %** à 1 650, le strike monte à **33** ; s'il baisse de **15 %** à 1 275, il baisse à **25,50** | *le cours de l'entreprise doit **battre la performance du S&P 500** pour que l'option soit dans la monnaie* — on peut aussi indexer sur le **secteur** |
| **Strike croissant** | il augmente de façon **prédéterminée** | *les actions doivent fournir un **rendement annuel minimum** pour que l'option soit dans la monnaie* |
| **Objectifs de profit** | les options **n'acquièrent** que si des objectifs sont atteints | *difficile à valoriser, car le payoff dépend de **chiffres comptables publiés** autant que du cours ; les valorisations supposent en général que les objectifs seront atteints* |

## 🔴 Concept 4 — Les quatre méthodes de valorisation

### 4.1 La méthode « rapide et sale » : la vie espérée

> **La **vie espérée** est *le temps moyen pendant lequel les salariés détiennent l'option avant de l'exercer ou de la laisser expirer*. Elle s'estime approximativement sur données historiques et **reflète la période d'acquisition, l'impact des départs, et la tendance à exercer plus tôt**. On utilise **Black-Scholes avec $T=$ vie espérée**, et une volatilité estimée sur plusieurs années.

⚠️ **L'avertissement le plus important du chapitre.** ***Il faut souligner qu'utiliser la formule de Black-Scholes-Merton de cette façon n'a AUCUNE validité théorique. Il n'y a aucune raison pour que la valeur d'une option européenne de maturité $T$ égale à la vie espérée soit approximativement la même que celle de l'option américaine de salarié qui nous intéresse. Cependant, les résultats donnés par le modèle ne sont pas totalement déraisonnables.*** *Les entreprises mentionnent fréquemment la volatilité et la vie espérée utilisées.*

<details class="details--riche">
<summary>

**Exercice résolu — la méthode de la vie espérée (exemple 15.1)**

</summary>

**Données.** Attribution de **1 000 000** d'options le 1ᵉʳ novembre 2011. Cours **30**, strike **30**. Durée **10 ans**, acquisition après **3 ans**. Sur 10 ans d'options similaires, le temps moyen jusqu'à exercice ou expiration est **4,5 ans**. Volatilité estimée sur 5 ans : **25 %**. Valeur actuelle des dividendes sur 4,5 ans : **4**. Taux zéro-coupon 4,5 ans : **5 %**.

*Étape 1 — poser $T$.* $T=\mathbf{4{,}5}$ ans — **la vie espérée, pas les 10 ans du contrat**. *Étape 2 — ajuster pour les dividendes* (fiche 87) : $S_0=30-4=\mathbf{26}$. *Étape 3 — les paramètres.* $K=30$, $r=5\,\%$, $\sigma=25\,\%$, $T=4{,}5$. *Étape 4 — appliquer Black-Scholes.*

$$d_1=\frac{\ln(26/30)+(0{,}05+0{,}03125)\times4{,}5}{0{,}25\sqrt{4{,}5}}=\frac{-0{,}1431+0{,}3656}{0{,}5303}=\mathbf{0{,}4196}$$

$$d_2=0{,}4196-0{,}5303=\mathbf{-0{,}1107}$$

$$c=26\,N(0{,}4196)-30e^{-0{,}225}N(-0{,}1107)=17{,}23-10,92=\boxed{\mathbf{6{,}31}}$$

*Étape 5 — la charge.* $1\,000\,000\times6{,}31=\boxed{\mathbf{6\,310\,000}}$ dollars au compte de résultat.

⚠️ **Notez ce que la méthode fait implicitement.** Elle remplace une **américaine de 10 ans avec acquisition et départs** par une **européenne de 4,5 ans**. Le raccourci est **grossier** — mais c'est celui que la plupart des entreprises publient.

</details>

### 4.2 L'arbre binomial avec départs et exercices

> **Le principe.** *Construire un arbre binomial (chapitre 12) et **adapter les règles de remontée** pour refléter : **(a)** si l'option est acquise, **(b)** la probabilité que le salarié quitte l'entreprise, **(c)** la probabilité qu'il choisisse d'exercer.*

| Élément | Comment l'estimer |
|---|---|
| **Acquisition** | définie par **les termes du contrat** à chaque nœud |
| **Départ** | *données historiques sur les **taux de rotation** du personnel* |
| **Exercice volontaire** | *plus difficile à quantifier ; **cette probabilité augmente quand le rapport cours/strike augmente et quand la maturité résiduelle diminue**. Avec assez de données historiques, on peut l'estimer — au moins approximativement — en fonction de ces deux variables* |

<details class="details--riche">
<summary>

**Exercice résolu — l'arbre complet, nœud par nœud (exemple 15.2)**

</summary>

**Données.** Options **8 ans**, acquisition après **3 ans**. Cours et strike **40**. $\sigma=30\,\%$, $r=5\,\%$, pas de dividende. **Quatre pas** ($\Delta t=2$).

*Étape 1 — les paramètres de l'arbre.*

$$u=e^{0{,}3\sqrt2}=\mathbf{1{,}5285}\quad d=\frac1u=\mathbf{0{,}6543}\quad a=e^{0{,}05\times2}=\mathbf{1{,}1052}\quad p=\frac{1{,}1052-0{,}6543}{1{,}5285-0{,}6543}=\mathbf{0{,}5158}$$

*Étape 2 — l'arbre des cours.*

| Date | Cours |
|---|---|
| 0 | **40,00** (A) |
| 2 | **61,14** (B) · **26,17** (C) |
| 4 | **93,45** (D) · **40,00** (E) · **17,12** (F) |
| 6 | **142,83** (G) · **61,14** (H) · **26,17** (I) · **11,20** (J) |
| 8 | **218,31** · **93,45** · 40,00 · 17,12 · 7,33 |

*Étape 3 — les payoffs terminaux.* $178{,}31$ · $53{,}45$ · $0$ · $0$ · $0$.

*Étape 4 — les hypothèses de comportement.* Probabilité d'exercice **volontaire** (conditionnelle à l'absence d'exercice antérieur) estimée à **40 % en D**, **80 % en G**, **30 % en H** — *les seuls nœuds où l'exercice anticipé pourrait être souhaitable : l'option **n'est pas acquise en B** et **n'est pas dans la monnaie** aux autres nœuds antérieurs à l'échéance*. Probabilité de **départ** : **5 % par pas**.

*Étape 5 — nœud I et J (date 6).* *Ils mènent avec certitude à des nœuds où l'option ne vaut rien* → valeur **0**.

*Étape 6 — nœud H ($S=61{,}14$).*

- **Probabilité totale d'exercice** : $0{,}3+0{,}7\times0{,}05=\mathbf{0{,}335}$ — *dans les cas où le salarié ne choisit pas d'exercer, il y a **5 % de chances qu'il parte et doive exercer***.
- Valeur si exercice : $61{,}14-40=\mathbf{21{,}14}$.
- Valeur si conservation : $e^{-0{,}1}(0{,}5158\times53{,}45+0{,}4842\times0)=\mathbf{24{,}95}$.
- **Valeur du nœud** : $0{,}335\times21{,}14+0{,}665\times24{,}95=\boxed{\mathbf{23{,}67}}$.

*Étape 7 — nœud G ($S=142{,}83$).* Probabilité d'exercice $=0{,}8+0{,}2\times0{,}05=\mathbf{0{,}81}$ ; exercice $=102{,}83$ ; conservation $=106{,}64$ :

$$0{,}81\times102{,}83+0{,}19\times106{,}64=\boxed{\mathbf{103{,}56}}$$

*Étape 8 — nœud E ($S=40$, date 4).* L'option est **à la monnaie**, donc pas d'exercice volontaire. *Il y a **5 %** de chances que le salarié **perde** l'option en partant et **95 %** qu'il la conserve* :

$$0{,}95\times e^{-0{,}1}(0{,}5158\times23{,}67)=0{,}95\times11{,}05=\boxed{\mathbf{10{,}49}}$$

*Étape 9 — nœud D ($S=93{,}45$).* Probabilité d'exercice $=0{,}4+0{,}6\times0{,}05=\mathbf{0{,}43}$, conservation $0{,}57$ → valeur $\boxed{\mathbf{56{,}44}}$.

*Étape 10 — les nœuds de la date 2 et la racine.* **L'option n'y est pas acquise** : *5 % de chances qu'elle soit **perdue**, 95 % qu'elle soit conservée deux ans de plus.*

$$f_B=0{,}95\,e^{-0{,}1}(0{,}5158\times56{,}44+0{,}4842\times10{,}49)=\mathbf{29{,}39}\qquad f_C=\mathbf{4{,}65}$$

$$f_A=0{,}95\,e^{-0{,}1}(0{,}5158\times29{,}39+0{,}4842\times4{,}65)=\boxed{\mathbf{14{,}97}}$$

*Étape 11 — la comparaison qui donne tout son sens au calcul.* *Une option **ordinaire** valorisée sur le **même arbre** vaudrait **17,98**.* L'incessibilité, les départs et l'exercice anticipé coûtent donc **3,01**, soit **17 %** de la valeur.

⚠️ **Deux règles de remontée distinctes, à ne pas confondre.**

- **Option non acquise** : le départ fait **perdre** l'option → multiplier par $(1-q_{\text{départ}})$.
- **Option acquise et dans la monnaie** : le départ **force l'exercice** → il **s'ajoute** à la probabilité d'exercice volontaire, $q_{\text{ex}}+(1-q_{\text{ex}})q_{\text{départ}}$.

</details>

### 4.3 Le multiple d'exercice

> **Le modèle de Hull et White (2004).** *Le salarié exerce **dès que l'option est acquise et que le rapport cours/strike dépasse un certain niveau**. Ce rapport déclencheur s'appelle le **multiple d'exercice**.*

**La contrainte numérique.** *Il est important de construire un arbre binomial ou trinomial dont **les nœuds tombent sur les cours qui déclenchent l'exercice**. Si le strike est 30 et le multiple 1,5, **l'arbre doit avoir des nœuds au niveau 45**.*

⚠️ **L'avantage sur la vie espérée.** *Le multiple s'estime comme le **rapport moyen cours/strike au moment de l'exercice** dans les données historiques — en **excluant** les exercices à maturité et ceux dus à une rupture du contrat de travail. **Cela peut être plus facile à estimer que la vie espérée, parce que celle-ci dépend fortement de la trajectoire particulière suivie par le cours.***

### 4.4 L'approche de marché

> **L'idée.** *Voir **ce que le marché paierait**.*

| Tentative | Mécanique | Issue |
|---|---|---|
| **Cisco, 2006** | vendre à des investisseurs institutionnels des options **aux termes exacts** de ses options de salariés | **Rejetée par la SEC** : *l'éventail d'investisseurs enchérissant n'était **pas assez large*** |
| **Zions Bancorp** | vendre des titres dont les payoffs **reproduisent ceux effectivement réalisés par les salariés** | **Approuvée par la SEC en octobre 2007** |

**Le mécanisme de Zions, concrètement.** *Strike 40 ; si **1 %** des salariés exercent après exactement 5 ans à un cours de 60, **2 %** après 6 ans à 65, etc., alors **1 %** des titres détenus par un investisseur rapporteront **20** après 5 ans, **2 %** rapporteront **25** après 6 ans, et ainsi de suite.*

**La vente se fait par *enchère hollandaise*.** *Chacun soumet un prix et une quantité. **Le prix d'adjudication est l'enchère la plus élevée telle que la quantité demandée à ce prix ou plus haut égale ou dépasse la quantité offerte.** Ceux qui ont enchéri au-dessus sont servis **au prix d'adjudication** ; celui qui a enchéri exactement à ce prix reçoit le solde.*

## 🟠 Concept 5 — La dilution, encore une fois

> **Le point, contre-intuitif mais démontré au chapitre 14.** *Il est naturel de supposer que la dilution a lieu **au moment de l'exercice**. **Ce n'est pas le cas** : les cours sont dilués **quand le marché entend parler de l'attribution pour la première fois**. L'exercice possible est **anticipé et immédiatement reflété** dans le cours.*

$$\boxed{\text{si l'on utilise le cours qui suit immédiatement l'annonce, il n'y a AUCUN ajustement de dilution à faire}}$$

⚠️ *Dans beaucoup de cas, le marché **s'attend** à ce que l'entreprise fasse des attributions régulières : le cours **anticipe donc la dilution avant même l'annonce**.*

**Le seul cas où un calcul est nécessaire.** *Si l'entreprise envisage une attribution qui **surprendra le marché**, le coût se calcule comme à l'exemple 14.7* — chaque option vaut $\frac{N}{N+M}$ fois un call ordinaire (fiche 87). *Ce coût peut alors être **comparé aux bénéfices** : rémunération régulière plus faible, rotation du personnel réduite.*

## 🔴 Concept 6 — Les scandales d'antidatation

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*L'**antidatation** est la pratique consistant à **marquer un document d'une date antérieure à la date courante**.*

</div>

<details class="details--riche">
<summary>

**Ce qui est légal, ce qui ne l'est pas — la distinction exacte**

</summary>

**Le scénario.** Une entreprise décide le **30 avril** d'attribuer des options à la monnaie, cours **50**. Le **3 avril**, le cours était **42**.

| Comportement | Légalité |
|---|---|
| Se comporter comme si les options avaient été attribuées le **3 avril** avec un strike de **42**, **et déclarer les options comme étant dans la monnaie de 8 à la date de la décision (30 avril)** | **Légal** |
| Déclarer les options comme **à la monnaie** et **attribuées le 3 avril** | **Illégal** |

*Pourquoi ? **La valeur au 3 avril d'une option de strike 42 est bien inférieure à sa valeur au 30 avril.** Les actionnaires sont **induits en erreur sur le coût réel** de la décision si l'entreprise déclare les options comme attribuées le 3 avril.*

⚠️ **La fraude ne porte pas sur le choix du strike — elle porte sur la DATE déclarée**, donc sur la charge comptabilisée.

</details>

**Comment les chercheurs l'ont mise en évidence.** *En examinant si le cours a, en moyenne, **tendance à être bas à la date d'attribution déclarée**.*

| Étude | Résultat |
|---|---|
| **Yermack** (1997) | les cours **montent après** les dates d'attribution déclarées |
| **Lie** (2005) | les cours **baissent aussi avant** — et *les motifs pré- et post-attribution étaient **devenus plus prononcés au fil du temps*** |
| **Heron et Lie** (2007) | après la règle de 2002, **réduction spectaculaire** des rendements anormaux, surtout pour les entreprises qui s'y conformaient |

*Lie compare les rendements anormaux moyens autour de la date d'attribution sur trois périodes : **1993-94**, **1995-98**, **1999-2002**. **Les tests statistiques standard montrent qu'il est presque impossible d'observer ces motifs par hasard.*** D'où la conclusion, en 2002, que **l'antidatation était devenue une pratique courante**.

> **La riposte réglementaire.** *En **août 2002**, la SEC a exigé que les attributions d'options par les sociétés cotées soient **déclarées dans les deux jours ouvrés**.*

**L'ampleur et les suites.** *Les estimations varient largement : **des dizaines, peut-être des centaines** d'entreprises américaines semblent avoir antidaté illégalement. **Beaucoup semblent avoir adopté l'idée qu'il était acceptable d'antidater jusqu'à un mois.*** Des PDG ont démissionné. *En **août 2007**, **Gregory Reyes** de Brocade Communications devint le premier PDG jugé pour antidatation — on lui prête cette phrase à une employée des ressources humaines : **« Ce n'est pas illégal si on ne se fait pas prendre. »** En **juin 2010**, il fut condamné à **18 mois de prison** et **15 millions de dollars** d'amende.*

*Les entreprises concernées ont dû **retraiter leurs comptes passés** et ont fait l'objet d'**actions collectives** d'actionnaires. **McAfee** a annoncé en décembre 2007 le retraitement de ses résultats 1995-2005 pour **137,4 millions**, et avait provisionné **13,8 millions** en 2006 pour les procès.*

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| Une **vie espérée** donnée | méthode rapide | Black-Scholes avec $T=$ vie espérée, $S_0-D$ |
| Des probabilités d'**exercice** et de **départ** | **arbre** | deux règles de remontée distinctes |
| Un rapport cours/strike déclencheur | **multiple d'exercice** | arbre avec nœuds **sur** le déclencheur |
| « faut-il ajuster pour la dilution ? » | **piège** | **non** — déjà dans le cours |
| Une date d'attribution et un cours antérieur plus bas | **antidatation** | légal si la charge **dans la monnaie** est déclarée |
| « pourquoi exercent-ils si tôt ? » | **incessibilité** | seul moyen d'encaisser : exercer **et vendre** |

## Comment résoudre ce type d'exercice

**Protocole arbre d'options de salariés — 6 étapes.**

1. Paramètres standard : $u=e^{\sigma\sqrt{\Delta t}}$, $d=1/u$, $a=e^{r\Delta t}$, $p=(a-d)/(u-d)$.
2. Marquer les nœuds **acquis** et **non acquis** selon la période d'acquisition.
3. Payoffs terminaux $=\max(S-K,0)$.
4. **Nœud non acquis** : $f=(1-q_{\text{départ}})\times e^{-r\Delta t}[pf_u+(1-p)f_d]$.
5. **Nœud acquis** :

- hors la monnaie → même formule que 4 (le départ fait perdre l'option) ;
- dans la monnaie → $q_{\text{tot}}=q_{\text{ex}}+(1-q_{\text{ex}})q_{\text{départ}}$, puis $f=q_{\text{tot}}(S-K)+(1-q_{\text{tot}})\times$ continuation.

6. **Comparer** à la valeur d'une option ordinaire sur le même arbre : l'écart mesure le coût de l'incessibilité.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire qu'une option à la monnaie ne coûte rien | *Si elles sont précieuses pour les salariés, **elles coûtent aux actionnaires**. Pas de repas gratuit* |
| Appliquer « ne jamais exercer tôt » aux options de salariés | Vrai **seulement si l'on garde l'action** ; l'incessibilité justifie d'exercer **pour vendre** |
| Utiliser $T=$ durée du contrat dans Black-Scholes | Utiliser la **vie espérée** — et savoir que c'est **sans validité théorique** |
| Oublier de retrancher $D$ dans la méthode rapide | $S_0\to S_0-D$ comme au chapitre 14 |
| Appliquer la même règle de départ aux nœuds acquis et non acquis | Non acquis : **perte** · acquis ITM : **exercice forcé** |
| Écrire $q_{\text{tot}}=q_{\text{ex}}+q_{\text{départ}}$ | C'est $q_{\text{ex}}+(1-q_{\text{ex}})q_{\text{départ}}$ : $0{,}3+0{,}7\times0{,}05=\mathbf{0{,}335}$ |
| Ajuster le prix de l'option pour la dilution | Elle est **déjà dans le cours** dès l'annonce |
| Croire que le *repricing* rétablit l'alignement | Il le **détériore** encore |
| Croire que l'antidatation est illégale en soi | C'est la **fausse déclaration de date** qui l'est |
| Croire que revaloriser chaque année rendrait le résultat plus volatil | **L'inverse** : c'est un stabilisateur |

## 📌 Ultimate Review

**Les cinq clauses.** Acquisition (jusqu'à 4 ans) · perte en cas de départ pendant · exercice forcé après · **incessibilité** · émission d'actions nouvelles.

**La règle d'exercice.** Exercer tôt **pour vendre** : rationnel (seul moyen d'encaisser). Exercer tôt **pour garder l'action** : jamais, **sauf dividende élevé imminent** (ou droits de vote).

**La comptabilité.** Avant 1995 : **intrinsèque** (donc zéro) · FAS 123 (1995) : **encourage** seulement · **IAS 2 (fév. 2004)** et **FAS 123R (déc. 2004)** : juste valeur obligatoire **depuis 2005**, à la **date d'attribution**.

**Les quatre méthodes.** Vie espérée (Black-Scholes, **sans validité théorique**) · **arbre** avec départs et exercices · **multiple d'exercice** (Hull & White 2004) · **marché** (Zions, enchère hollandaise, approuvée oct. 2007).

**Les deux règles de remontée.**

$$\text{non acquis}:\ f=(1-q_d)\,\mathrm{PV}\qquad\qquad\text{acquis ITM}:\ f=q_{\text{tot}}(S-K)+(1-q_{\text{tot}})\,\mathrm{PV},\quad q_{\text{tot}}=q_e+(1-q_e)q_d$$

**La dilution.** Reflétée **dès l'annonce** ; ne jamais la compter deux fois ; nouvelle attribution surprise → $\frac{N}{N+M}$ fois un call ordinaire.

**Les chiffres du chapitre.** Options **10 à 15 ans**, acquisition **jusqu'à 4 ans** · **≈ 50 %** de la rémunération des dirigeants américains · Microsoft : **10 000 millionnaires**, arrêt en **2003** · exemple 15.1 : $S_0=26$, **6,31** par option, charge **6,31 M** · exemple 15.2 : $u=1{,}5285$, $p=0{,}5158$, valeur **14,97** contre **17,98** pour une option ordinaire ; $q_{\text{tot}}=0{,}335$ en H, $0{,}81$ en G, $0{,}43$ en D · SEC : déclaration sous **2 jours ouvrés** (août 2002) · Reyes : **18 mois** et **15 M** (juin 2010) · McAfee : retraitement de **137,4 M**.

## 🧠 Active Recall

<details><summary>Pourquoi les options de salariés sont-elles exercées bien plus tôt que des options ordinaires ?</summary>

À cause de la **clause d'incessibilité**. *Si des salariés veulent tirer un bénéfice en espèces d'options acquises, **ils doivent les exercer et vendre les actions** — ils ne peuvent pas vendre les options à quelqu'un d'autre.* Or l'argument « ne jamais exercer tôt » du chapitre 10 reposait précisément sur la possibilité de **vendre l'option plutôt que de l'exercer**. Cette possibilité disparaissant, il n'est pas rare qu'une option de salarié soit exercée **bien avant** le moment où il serait optimal d'exercer une option ordinaire.

</details>

<details class="details--riche">
<summary>

Un salarié devrait-il exercer tôt et *garder* l'action ? Justifier par la comparaison de deux options.

</summary>

**Non**, sauf cas particulier. Soit **A** l'option de salarié et **B** une option ordinaire identique mais vendable. Sans dividende, **B ne doit jamais être exercée tôt** ; *il s'ensuit qu'il n'est pas optimal d'exercer A et de garder l'action*. *Si le salarié veut conserver une participation, une meilleure stratégie est de **garder l'option** : cela **retarde le paiement du strike** et **conserve la valeur d'assurance**.*

**La seule exception** : quand il serait optimal d'exercer B, c'est-à-dire **quand un dividende relativement élevé est imminent** — ou, dit par Hull en note, quand un dirigeant veut l'action **pour ses droits de vote**.

</details>

<details><summary>Pourquoi Hull juge-t-il que donner des actions serait meilleur que donner des options ?</summary>

À cause de **l'asymétrie des payoffs**. *Si le cours monte, les actionnaires gagnent et le dirigeant est récompensé. **Mais si l'entreprise fait mal, les actionnaires perdent de l'argent, alors que tout ce qui arrive aux dirigeants est qu'ils ne réalisent pas de gain — contrairement aux actionnaires, ils ne subissent pas de perte.***

*Une meilleure rémunération à la performance consiste à **donner des actions** : les gains et pertes du dirigeant **reflètent alors ceux des autres actionnaires**.* Le ***repricing*** (remplacer des options hors la monnaie par de nouvelles à la monnaie) **aggrave encore** le désalignement.

</details>

<details><summary>Une option à la monnaie coûte-t-elle quelque chose à l'entreprise ?</summary>

**Oui**, et Hull insiste parce que *ce point, évident pour beaucoup, est en réalité assez controversé*. *Si les options sont **précieuses pour les salariés**, elles doivent représenter **un coût pour les actionnaires — et donc pour l'entreprise. Il n'y a pas de repas gratuit.*** Le coût vient de ce que l'entreprise s'est engagée, si l'action fait bien, à **vendre des actions aux salariés en dessous du prix de marché**.

</details>

<details><summary>Retracer la chronologie comptable.</summary>

**Avant 1995** : charge = **valeur intrinsèque**, donc **zéro** pour les options à la monnaie. **1995** : **FAS 123** — *beaucoup attendaient l'obligation, mais **à la suite d'un lobbying intense** il ne fait qu'**encourager** la comptabilisation à la juste valeur*, sinon en note annexe. **Février 2004** : **IAS 2** impose la comptabilisation à partir de 2005. **Décembre 2004** : **FAS 123 révisé**, idem aux États-Unis. Aujourd'hui : valorisation **à la date d'attribution**, charge de l'**année d'attribution**, **sans revalorisation ultérieure**.

</details>

<details><summary>Pourquoi Hull soutient-il que revaloriser chaque année réduirait la volatilité du résultat ?</summary>

*Quand l'entreprise **fait bien**, le résultat est **réduit** par la revalorisation à la hausse des options ; quand elle **fait mal**, il est **augmenté** par leur dépréciation.* La charge joue donc à **contre-cycle** du résultat opérationnel : c'est un **stabilisateur**. Trois autres avantages : la **charge cumulée refléterait le coût réel** (zéro ou le payoff), elle **ne dépendrait pas du modèle** de valorisation, et il y aurait **beaucoup moins d'incitation à l'antidatation**.

</details>

<details class="details--riche">
<summary>

Une entreprise attribue 1 M d'options, cours et strike 30, vie espérée 4,5 ans, $\sigma=25\,\%$, $r=5\,\%$, dividendes de VA 4. Quelle charge ?

</summary>

$S_0=30-4=\mathbf{26}$, $K=30$, $T=4{,}5$.

$$d_1=\frac{\ln(26/30)+(0{,}05+0{,}03125)(4{,}5)}{0{,}25\sqrt{4{,}5}}=\mathbf{0{,}4196}\qquad d_2=\mathbf{-0{,}1107}$$

$$c=26\,N(0{,}4196)-30e^{-0{,}225}N(-0{,}1107)=\mathbf{6{,}31}$$

**Charge : $1\,000\,000\times6{,}31=6\,310\,000$ dollars.**

⚠️ *Utiliser Black-Scholes ainsi **n'a aucune validité théorique*** — mais *les résultats ne sont pas totalement déraisonnables*.

</details>

<details><summary>Sur un arbre, comment traite-t-on un nœud où l'option est acquise et dans la monnaie, avec 30 % d'exercice volontaire et 5 % de départ ?</summary>

*Dans les cas où le salarié **ne choisit pas** d'exercer, il y a **5 % de chances qu'il parte et doive exercer**.* Donc

$$q_{\text{tot}}=0{,}3+0{,}7\times0{,}05=\mathbf{0{,}335}$$

$$f=0{,}335\times(S-K)+0{,}665\times e^{-r\Delta t}\big[pf_u+(1-p)f_d\big]$$

Au nœud H de l'exemple : $0{,}335\times21{,}14+0{,}665\times24{,}95=\mathbf{23{,}67}$.

</details>

<details><summary>Et à un nœud où l'option n'est pas encore acquise ?</summary>

Le départ fait **perdre** l'option, il n'y a pas d'exercice possible :

$$f=(1-q_d)\times e^{-r\Delta t}\big[pf_u+(1-p)f_d\big]$$

Au nœud B : $0{,}95\times30{,}94=\mathbf{29{,}39}$. Même traitement au nœud E (acquis mais **à la monnaie**, donc pas d'exercice volontaire) : $0{,}95\times11{,}05=\mathbf{10{,}49}$.

</details>

<details><summary>Que coûte l'ensemble des contraintes de salarié dans l'exemple 15.2 ?</summary>

L'option de salarié vaut **14,97**, alors qu'une option **ordinaire** valorisée sur **le même arbre** vaudrait **17,98**. L'écart, **3,01** — soit **17 %** de la valeur —, est le coût combiné de la **période d'acquisition**, du **risque de départ** et de l'**exercice anticipé** dû à l'incessibilité. C'est exactement ce que la méthode de la « vie espérée » tente d'approcher grossièrement.

</details>

<details><summary>Qu'est-ce que le multiple d'exercice, et quel avantage a-t-il sur la vie espérée ?</summary>

C'est le **rapport cours/strike qui déclenche l'exercice** dans le modèle de **Hull et White (2004)** : *le salarié exerce dès que l'option est acquise et que ce rapport dépasse un certain niveau*. On l'estime comme le **rapport moyen cours/strike au moment de l'exercice** dans les données historiques, **en excluant** les exercices à maturité et ceux dus à une rupture du contrat.

**L'avantage** : *cela peut être plus facile à estimer que la vie espérée, parce que **celle-ci dépend fortement de la trajectoire particulière suivie par le cours***. Contrainte technique : construire l'arbre pour que **des nœuds tombent exactement sur le cours déclencheur**.

</details>

<details><summary>Pourquoi n'y a-t-il pas d'ajustement de dilution à faire ?</summary>

Parce que *les cours sont dilués **quand le marché entend parler de l'attribution pour la première fois***, pas à l'exercice : *l'exercice possible est **anticipé et immédiatement reflété** dans le cours*. **Si l'on utilise le cours qui suit immédiatement l'annonce, aucun ajustement n'est nécessaire.** Souvent, le marché **s'attend** à des attributions régulières et anticipe la dilution **avant même l'annonce**. Le seul cas où un calcul s'impose est une attribution qui **surprendrait** le marché.

</details>

<details><summary>Où passe exactement la frontière entre antidatation légale et illégale ?</summary>

Cours 50 le **30 avril** (date de la décision), 42 le **3 avril**.

- **Légal** : utiliser un strike de **42** et **déclarer les options comme dans la monnaie de 8 à la date de la décision, le 30 avril**.
- **Illégal** : les déclarer **à la monnaie et attribuées le 3 avril**.

*La valeur au 3 avril d'une option de strike 42 est **bien inférieure** à sa valeur au 30 avril : les actionnaires sont **induits en erreur sur le coût réel**.* **La fraude porte sur la date déclarée, donc sur la charge comptabilisée — pas sur le choix du strike.**

</details>

<details><summary>Comment a-t-on prouvé statistiquement l'existence de l'antidatation ?</summary>

En examinant si le cours a, en moyenne, **tendance à être bas à la date d'attribution déclarée**. **Yermack** (1997) montre que les cours **montent après** ; **Lie** (2005) montre qu'ils **baissent aussi avant**, et que *les motifs pré- et post-attribution étaient devenus **plus prononcés au fil du temps*** (1993-94, 1995-98, 1999-2002). *Les tests statistiques standard montrent qu'il est **presque impossible** d'observer ces motifs par hasard.* **Heron et Lie** (2007) constatent une **réduction spectaculaire** après la règle SEC d'**août 2002** exigeant la déclaration **sous deux jours ouvrés**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Qu'est-ce qu'une option de salarié ? | Un **call** attribué par l'entreprise à ses salariés |
| Durée typique ? | **10 à 15 ans** |
| Niveau du strike à l'attribution ? | Le **cours du jour** — à la monnaie |
| Durée de la période d'acquisition ? | Jusqu'à **4 ans** |
| Que se passe-t-il si on part **pendant** l'acquisition ? | **Perte** des options |
| Et **après** l'acquisition ? | Perte des OTM, **exercice quasi immédiat** des ITM |
| La clause décisive ? | **Incessibilité** |
| Sa conséquence ? | Exercice **beaucoup plus tôt** |
| Que fait l'entreprise à l'exercice ? | Elle **émet de nouvelles actions** |
| Exercer tôt pour **vendre** ? | **Rationnel** |
| Exercer tôt pour **garder** l'action ? | **Jamais**, sauf **dividende élevé imminent** |
| Autre exception citée en note ? | Vouloir l'action pour ses **droits de vote** |
| Part des options dans la rémunération des dirigeants US ? | Environ **50 %** |
| Le défaut central des options comme rémunération ? | L'**asymétrie** : pas de perte pour le dirigeant |
| L'alternative recommandée ? | Donner des **actions** |
| Qu'est-ce que le *repricing* ? | Remplacer des options OTM par des options ATM |
| Son effet ? | **Détériore** encore l'alignement |
| La suggestion radicale de Hull ? | **Notifier au marché** une semaine avant tout achat ou vente |
| Charge comptable avant 1995 ? | La **valeur intrinsèque**, donc **zéro** |
| Ce que FAS 123 (1995) imposait ? | **Rien** — il **encourageait** seulement |
| Pourquoi ? | Un **lobbying intense** |
| Date d'IAS 2 ? | **Février 2004**, application **2005** |
| Date de FAS 123 révisé ? | **Décembre 2004**, application **2005** |
| Quand valorise-t-on ? | À la **date d'attribution**, sans revalorisation |
| L'argument de Hull pour revaloriser ? | Charge cumulée **= coût réel**, **indépendante du modèle**, moins d'antidatation |
| L'objection usuelle, et sa réfutation ? | « Volatilité du résultat » — en fait c'est un **stabilisateur** |
| Qu'est-ce qu'un strike indexé ? | Il **suit le S&P 500** — il faut **battre le marché** |
| Les quatre méthodes de valorisation ? | Vie espérée · **arbre** · **multiple d'exercice** · **marché** |
| Qu'est-ce que la vie espérée ? | Temps moyen jusqu'à **exercice ou expiration** |
| Cette méthode est-elle théoriquement valide ? | ***Aucune validité théorique*** |
| Valeur de l'option de l'exemple 15.1 ? | **6,31** — charge **6,31 M** |
| Les trois ajustements de l'arbre ? | **Acquisition** · **départ** · **exercice volontaire** |
| De quoi dépend la probabilité d'exercice ? | Du rapport **cours/strike** et du **temps restant** |
| Formule de la probabilité totale d'exercice ? | $q_e+(1-q_e)q_d$ |
| Sa valeur au nœud H ? | $0{,}3+0{,}7(0{,}05)=\mathbf{0{,}335}$ |
| Règle à un nœud non acquis ? | Multiplier la continuation par $(1-q_d)$ |
| Valeur de l'option de l'exemple 15.2 ? | **14,97** |
| Valeur d'une option ordinaire sur le même arbre ? | **17,98** |
| Qu'est-ce que le multiple d'exercice ? | Le **rapport cours/strike** déclenchant l'exercice |
| Qui l'a proposé ? | **Hull et White (2004)** |
| Contrainte technique ? | Des **nœuds sur le cours déclencheur** |
| La tentative de Cisco (2006) ? | **Rejetée** par la SEC — investisseurs **pas assez nombreux** |
| L'approche de Zions ? | Titres **répliquant les payoffs réalisés**, approuvée **oct. 2007** |
| Quel mécanisme de vente ? | L'**enchère hollandaise** |
| Quand la dilution est-elle intégrée ? | **Dès l'annonce**, pas à l'exercice |
| Faut-il l'ajuster dans la valorisation ? | **Non** |
| Qu'est-ce que l'antidatation ? | Dater un document d'une **date antérieure** |
| Qu'est-ce qui est illégal exactement ? | Déclarer les options **à la monnaie à la date antérieure** |
| Qui a montré la hausse post-attribution ? | **Yermack**, 1997 |
| Qui a montré la baisse pré-attribution ? | **Lie**, 2005 |
| La riposte de la SEC ? | Déclaration sous **2 jours ouvrés** (**août 2002**) |
| Le premier PDG jugé ? | **Gregory Reyes**, Brocade, **août 2007** |
| Sa condamnation ? | **18 mois** de prison, **15 millions** d'amende |
| Le retraitement de McAfee ? | **137,4 millions** sur 1995-2005 |
