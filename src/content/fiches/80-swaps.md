# Fiche 80 — Swaps : mécanique, avantage comparatif, valorisation

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 7 « Swaps » |
| **Difficulté** | Must know — les swaps occupent *une position d'importance centrale* sur les marchés de dérivés |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 77 (FRA, courbe zéro), 78 (valorisation forward), 79 (conventions) |
| **Concepts clés** | Swap vanille, nominal notionnel, transformation d'actif et de passif, intermédiaire financier, avantage comparatif, taux de swap, courbe zéro LIBOR/swap, valorisation par obligations, valorisation par FRA, OIS, spread LIBOR-OIS, swap de devises, risque de crédit |
| **Poids à l'examen** | Les **deux méthodes de valorisation** (obligations et FRA) doivent donner **le même** résultat · le gain total d'un avantage comparatif $=a-b$ · le *bootstrap* par les taux de swap. |

## 🎯 Vue d'ensemble

```
DÉFINITION   accord OTC d'échanger des FLUX FUTURS à des dates convenues
VANILLE      payer un TAUX FIXE, recevoir le LIBOR, sur un notionnel, pendant n ans
LECTURE 1    swap = obligation taux fixe CONTRE obligation taux variable
LECTURE 2    swap = PORTEFEUILLE DE FRA
VALORISER    V = B_fix − B_fl     ou     Σ (flux si forwards réalisés) actualisés
             les deux donnent le MÊME nombre
DEVISES      V = B_D − S₀·B_F      principal ÉCHANGÉ au début ET à la fin
GAIN COMP.   total = a − b   (a = écart en fixe, b = écart en variable)
```

**La filiation avec les chapitres précédents.** *Un contrat forward peut être vu comme un exemple simple de swap* : acheter 100 onces d'or à 1 200 dollars dans un an revient à convenir de **payer 120 000 dollars et recevoir $100S$**. *Alors qu'un forward équivaut à l'échange de flux à **une seule** date future, un swap conduit typiquement à des échanges à **plusieurs** dates.* Un swap est donc un **paquet de forwards** — et c'est exactement ainsi qu'on le valorisera.

## 🔴 Concept 1 — Le swap de taux vanille

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Une entreprise s'engage à payer des flux égaux à l'intérêt à un **taux fixe prédéterminé** sur un **nominal notionnel** pendant un nombre d'années prédéterminé. En retour, elle reçoit l'intérêt à un **taux variable** sur le **même** nominal et pour la **même** période.*

</div>

**Le taux variable est le LIBOR** — *le taux auquel une banque est prête à déposer auprès d'autres banques notées AA*. Sur une obligation à « LIBOR 6 mois + 0,5 % » sur 5 ans, *la vie de l'obligation est découpée en 10 périodes de 6 mois ; pour chaque période, le taux est fixé 0,5 % au-dessus du LIBOR 6 mois **au début** de la période, et l'intérêt est payé **à la fin***.

<details><summary>**L'exemple canonique — Microsoft contre Intel**</summary>

**Le contrat.** Swap **3 ans** initié le **5 mars 2012**. Microsoft paie **5 % par an** sur **100 millions** ; Intel paie le **LIBOR 6 mois** sur le même nominal. Paiements **semestriels**, taux fixe coté en capitalisation semestrielle. Microsoft = **payeur fixe** ; Intel = **payeur variable**.

*Étape 1 — le premier échange, le 5 septembre 2012.* Microsoft paie $0{,}5\times0{,}05\times100=\mathbf{2{,}5}$ M. Intel paie au LIBOR 6 mois observé **six mois plus tôt**, le 5 mars 2012, soit **4,2 %** : $0{,}5\times0{,}042\times100=\mathbf{2{,}1}$ M. *Il n'y a **aucune incertitude** sur ce premier échange, parce qu'il est déterminé par le LIBOR au moment où le contrat est conclu.* *Étape 2 — le deuxième échange, le 5 mars 2013.* Microsoft paie 2,5 M ; Intel paie au LIBOR du **5 septembre 2012**, soit 4,8 % → $\mathbf{2{,}4}$ M. *Étape 3 — le règlement net.* *Un swap de taux est généralement structuré de sorte qu'**une seule des parties verse la différence***. Microsoft verse donc $2{,}5-2{,}1=\mathbf{0{,}4}$ M le 5 septembre 2012, puis $2{,}5-2{,}4=\mathbf{0{,}1}$ M le 5 mars 2013.

**Les six échanges, du point de vue de Microsoft** (millions de dollars) :

| Date | LIBOR 6 mois (%) | Flux variable reçu | Flux fixe payé | Flux net |
|---|---|---|---|---|
| 5 mars 2012 | 4,20 |  |  |  |
| 5 sept. 2012 | 4,80 | +2,10 | −2,50 | **−0,40** |
| 5 mars 2013 | 5,30 | +2,40 | −2,50 | **−0,10** |
| 5 sept. 2013 | 5,50 | +2,65 | −2,50 | **+0,15** |
| 5 mars 2014 | 5,60 | +2,75 | −2,50 | **+0,25** |
| 5 sept. 2014 | 5,90 | +2,80 | −2,50 | **+0,30** |
| 5 mars 2015 |  | +2,95 | −2,50 | **+0,45** |

⚠️ **Décalage à bien lire.** Le LIBOR de la **ligne $t$** détermine le flux de la **ligne $t+1$**. Le taux de 5,90 % du 5 septembre 2014 produit le paiement du 5 mars 2015.

</details>

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi « notionnel ».</span>

*Le nominal de 100 millions ne sert **qu'au calcul des intérêts**. Le principal lui-même **n'est pas échangé**.*

</div>

**La relecture décisive — ajouter un échange de principal fictif.** *Si le principal était échangé à la fin de la vie du swap, la nature de l'opération ne changerait en rien : le principal est le même des deux côtés, et échanger 100 millions contre 100 millions n'a aucune valeur financière pour personne.* Mais alors :

| Colonne | Ce qu'elle devient |
|---|---|
| Flux variable + 100 à la fin | flux d'une **position longue en obligation à taux variable** |
| Flux fixe + 100 à la fin | flux d'une **position courte en obligation à taux fixe** |

$$\boxed{\text{swap}=\text{échange d'une obligation à taux fixe contre une obligation à taux variable}}$$

Microsoft est **longue variable, courte fixe** ; Intel l'inverse.

> **Et cela explique une convention.** *Sur une obligation à taux variable, l'intérêt est généralement **fixé au début** de la période à laquelle il s'applique et **payé à la fin**.* C'est exactement pourquoi, dans un swap vanille, le taux variable est fixé **six mois avant** d'être payé.

### 1.1 Transformer un passif, transformer un actif

**Transformer un passif.**

|  | Microsoft (emprunte à LIBOR + 10 pb) | Intel (emprunte à 5,2 % fixe) |
|---|---|---|
| 1. Aux prêteurs extérieurs | paie **LIBOR + 0,1 %** | paie **5,2 %** |
| 2. Dans le swap | **reçoit** LIBOR | **paie** LIBOR |
| 3. Dans le swap | **paie** 5 % | **reçoit** 5 % |
| **Net** | **5,1 % fixe** | **LIBOR + 0,2 %** |

**Transformer un actif.**

|  | Microsoft (détient des obligations à 4,7 %) | Intel (placement à LIBOR − 20 pb) |
|---|---|---|
| 1. Sur le placement | reçoit **4,7 %** | reçoit **LIBOR − 0,2 %** |
| 2. Dans le swap | **reçoit** LIBOR | **paie** LIBOR |
| 3. Dans le swap | **paie** 5 % | **reçoit** 5 % |
| **Net** | **LIBOR − 30 pb** | **4,8 % fixe** |

⚠️ **La règle de calcul, en une ligne.** Additionner les trois jambes en **conservant les signes** : ce qu'on paie compte négativement, ce qu'on reçoit positivement. Le LIBOR **disparaît** dans deux des quatre cas — c'est tout l'objet de l'opération.

### 1.2 Le rôle de l'intermédiaire financier

*Habituellement, deux entreprises non financières comme Intel et Microsoft **ne se contactent pas directement** : chacune traite avec une banque.* *Les swaps fixe-contre-variable vanille sur taux américains sont généralement structurés de sorte que l'institution financière gagne environ **3 ou 4 points de base** (0,03 % ou 0,04 %) sur une **paire** de transactions compensées.*

*Exemple du livre : la banque paie 4,985 % à Intel et reçoit 5,015 % de Microsoft, soit un écart de **3 points de base**.*

## 🟡 Concept 2 — Conventions de jours et confirmation

⚠️ **Les chiffres des exemples sont simplifiés.** Le LIBOR 6 mois est coté en **actual/360**. Le premier flux variable du tableau, affiché à 2,10 M, devrait être — il y a **184 jours** du 5 mars au 5 septembre 2012 :

$$100\times0{,}042\times\frac{184}{360}=\mathbf{2{,}1467}\ \text{millions}$$

$$\boxed{\text{flux variable}=\frac{L\,R\,n}{360}}$$

où $L$ = principal, $R$ = LIBOR pertinent, $n$ = nombre de jours depuis le dernier paiement.

⚠️ **Le taux fixe n'est pas directement comparable au LIBOR.** *Il est habituellement coté en **actual/365** ou **30/360**, et s'applique à une **année entière**. Pour les rendre approximativement comparables, il faut soit **multiplier le LIBOR 6 mois par 365/360**, soit **multiplier le taux fixe par 360/365**.* Conséquence : *les paiements fixes peuvent ne pas être exactement égaux à chaque date.*

**La confirmation.** *Document juridique signé par les représentants des deux parties.* Sa rédaction est facilitée par les **Master Agreements** de l'**ISDA**, qui *définissent en détail la terminologie, ce qui se passe en cas de défaut, etc.*, et qui **couvrent toutes les transactions en cours** entre deux parties.

| Élément d'une confirmation | Exemple |
|---|---|
| Date de transaction / d'effet / de fin | 27 févr. 2012 / 5 mars 2012 / 5 mars 2015 |
| **Convention de jour ouvré** | *following business day* — si la date tombe un week-end ou un jour férié, le paiement est fait le **jour ouvré suivant** |
| Calendrier de jours fériés | **US** |
| Payeur fixe / notionnel / taux / convention | Microsoft / 100 M USD / **5,015 %** / **actual/365** |
| Payeur variable / notionnel / taux / convention | Goldman Sachs / 100 M USD / **LIBOR 6 mois USD** / **actual/360** |

⚠️ **La variante *modified following*** : identique, *sauf que si le jour ouvré suivant tombe dans un **mois différent**, le paiement est fait le jour ouvré **immédiatement précédent***. Il existe symétriquement *preceding* et *modified preceding*.

## 🔴 Concept 3 — L'argument de l'avantage comparatif — et sa critique

**L'argument.** *Certaines entreprises, dit-on, ont un avantage comparatif pour emprunter à taux fixe, d'autres à taux variable. Il est logique d'aller sur le marché où l'on a un avantage comparatif. L'entreprise peut donc emprunter à taux fixe alors qu'elle veut du variable, ou l'inverse — et le swap transforme.*

|  | Fixe | Variable |
|---|---|---|
| **AAACorp** | **4,0 %** | LIBOR 6 mois **− 0,1 %** |
| **BBBCorp** | **5,2 %** | LIBOR 6 mois **+ 0,6 %** |

**Le trait caractéristique.** *L'écart entre les deux taux **fixes** est plus grand que l'écart entre les deux taux **variables***. BBBCorp paie **1,2 %** de plus en fixe et seulement **0,7 %** de plus en variable.

> **La formulation qui lève l'ambiguïté** — Hull cite un de ses étudiants : ***« AAACorp paie plus moins en fixe ; BBBCorp paie moins plus en variable. »*** L'avantage comparatif de BBBCorp en variable **ne signifie pas** qu'elle y paie moins qu'AAACorp : il signifie que **le supplément qu'elle paie y est plus faible**.

$$\boxed{\text{gain total à partager}=a-b}$$

où $a$ = écart en **fixe** et $b$ = écart en **variable**. Ici $1{,}2-0{,}7=\mathbf{0{,}5\,\%}$.

<details><summary>**Exercice résolu — construire le swap, avec et sans intermédiaire**</summary>

**Sans intermédiaire.** AAACorp emprunte **fixe à 4 %**, BBBCorp emprunte **variable à LIBOR + 0,6 %**. Le swap : AAACorp paie **LIBOR** à BBBCorp et reçoit **4,35 % fixe**.

*Étape 1 — les trois jambes d'AAACorp.* paie 4 % aux prêteurs · **reçoit** 4,35 % de BBBCorp · **paie** le LIBOR à BBBCorp. *Étape 2 — le net.* $-4\,\%+4{,}35\,\%-\text{LIBOR}=\mathbf{-(\text{LIBOR}-0{,}35\,\%)}$. Elle paie **LIBOR − 0,35 %**, soit **0,25 %** de moins que les LIBOR − 0,1 % du marché . *Étape 3 — les trois jambes de BBBCorp.* paie LIBOR + 0,6 % · **reçoit** le LIBOR · **paie** 4,35 %. *Étape 4 — le net.* $-(\text{LIBOR}+0{,}6\,\%)+\text{LIBOR}-4{,}35\,\%=\mathbf{-4{,}95\,\%}$, soit **0,25 %** de moins que les 5,2 % du marché . *Étape 5 — contrôle.* $0{,}25+0{,}25=\mathbf{0{,}5\,\%}=a-b$ .

**Avec intermédiaire.** AAACorp reçoit **4,33 %** et paie le LIBOR ; BBBCorp paie **4,37 %** et reçoit le LIBOR.

|  | Résultat | Gain |
|---|---|---|
| AAACorp | **LIBOR − 0,33 %** | 0,23 % |
| BBBCorp | **4,97 %** | 0,23 % |
| Institution financière | écart de **4 pb** | 0,04 % |
| **Total** |  | **0,50 %** |

⚠️ *Le partage n'a pas à être égal* — mais le **total** est toujours $a-b$.

</details>

### 3.1 La critique — et elle est sévère

> **La question.** *Pourquoi les écarts entre les taux offerts à AAACorp et BBBCorp devraient-ils être différents en fixe et en variable ? Maintenant que le marché des swaps existe depuis un certain temps, on pourrait raisonnablement s'attendre à ce que ce type de différence ait été **arbitré**.*

**La réponse — les deux taux ne portent pas sur la même chose.**

|  | Taux fixe (4,0 % / 5,2 %) | Taux variable (LIBOR − 0,1 % / + 0,6 %) |
|---|---|---|
| Horizon | taux **à 5 ans** | taux **à 6 mois** |
| Droit du prêteur | **aucun** — il ne peut pas modifier les termes | **revoir le spread tous les 6 mois**, voire **refuser de renouveler** |

*Les écarts reflètent la probabilité que BBBCorp fasse défaut plus que AAACorp. Dans les 6 prochains mois, il y a **très peu de chances** que l'une ou l'autre fasse défaut. Plus on regarde loin, plus la probabilité de défaut d'une entreprise **mal notée** augmente **vite** par rapport à celle d'une entreprise bien notée. **C'est pourquoi l'écart entre les taux à 5 ans est plus grand que l'écart entre les taux à 6 mois.***

⚠️ **BBBCorp n'obtient PAS un prêt à 4,97 %.** *Le taux payé n'est de 4,97 % que si BBBCorp peut **continuer** d'emprunter à LIBOR + 0,6 %. Si sa notation se dégrade et que le prêt est renouvelé à **LIBOR + 1,6 %**, le taux payé passe à **5,97 %**. Le marché s'attend à ce que le spread de BBBCorp **augmente en moyenne** pendant la vie du swap : son taux d'emprunt moyen anticipé est donc **supérieur à 4,97 %**.*

⚠️ **Et AAACorp ? Elle gagne vraiment — mais elle achète un risque.** *Le swap verrouille LIBOR − 0,33 % pour **toute** la durée des 5 prochaines années, pas seulement les 6 prochains mois. Cela paraît une bonne affaire. Le revers est qu'elle **supporte le risque de défaut de l'institution financière** : en empruntant à taux variable de façon habituelle, elle ne supporterait pas ce risque.*

> Hull ajoute une note décisive : *si les prêts à taux variable étaient structurés de sorte que le spread au-dessus du LIBOR soit **garanti d'avance** quels que soient les changements de notation, **les différentiels d'écart disparaîtraient**.* **L'avantage comparatif est donc largement illusoire.**

## 🔴 Concept 4 — La nature des taux de swap et la courbe LIBOR/swap

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Un **taux de swap** est la **moyenne** entre (a) le taux fixe qu'un teneur de marché est prêt à **payer** en échange du LIBOR (son **bid**) et (b) le taux fixe qu'il est prêt à **recevoir** en échange du LIBOR (son **offer**).

</div>

| Maturité (ans) | Bid (%) | Offer (%) | **Taux de swap (%)** |
|---|---|---|---|
| 2 | 6,03 | 6,06 | **6,045** |
| 3 | 6,21 | 6,24 | **6,225** |
| 4 | 6,35 | 6,39 | **6,370** |
| 5 | 6,47 | 6,51 | **6,490** |
| 7 | 6,65 | 6,68 | **6,665** |
| 10 | 6,83 | 6,87 | **6,850** |

**Quel risque de crédit porte un taux de swap ?** Une institution peut gagner le taux de swap 5 ans en : **(1)** prêtant le principal 6 mois à un emprunteur **AA**, puis en le reprêtant pour des périodes de 6 mois successives à d'autres emprunteurs **AA** ; **(2)** entrant dans un swap pour échanger le revenu LIBOR contre le taux de swap 5 ans.

> **La lecture exacte.** *Le taux de swap 5 ans est un taux dont le risque de crédit correspond à la situation où l'on fait **10 prêts LIBOR consécutifs de 6 mois** à des entreprises **AA**.* De même le taux 7 ans correspond à **14** prêts consécutifs.

⚠️ **Corollaire contre-intuitif mais rigoureux.** *Les taux de swap 5 ans sont **inférieurs** aux taux d'emprunt AA à 5 ans. Il est bien plus attractif de prêter pour des périodes successives de 6 mois à des emprunteurs qui sont **toujours AA au début de chaque période** que de prêter à **un seul** emprunteur pour 5 ans, dont on sait seulement qu'il est AA **au début** des 5 ans.*

### 4.1 Construire la courbe zéro LIBOR/swap

**L'enchaînement.** LIBOR observable **jusqu'à 12 mois** → **futures eurodollar** pour aller **jusqu'à 2 ans, parfois 5** (fiche 79) → **taux de swap** au-delà. On appelle la courbe résultante la **courbe zéro LIBOR/swap**.

**Le résultat clé.** *La valeur d'une obligation à taux variable nouvellement émise payant le LIBOR 6 mois est **toujours égale à son pair** lorsqu'on actualise avec la courbe LIBOR/swap* — *parce que l'obligation procure un taux d'intérêt égal au LIBOR, et que le LIBOR est le taux d'actualisation : l'intérêt égale exactement le taux d'actualisation, donc l'obligation vaut le pair.*

Or, pour un swap **neuf** au taux de swap, $B_{\text{fix}}=B_{\text{fl}}$ (7.1) — et $B_{\text{fl}}=$ notionnel. Donc :

$$\boxed{\text{les taux de swap définissent un ensemble d'obligations au pair}}$$

*Ainsi, le rendement au pair LIBOR/swap à 2 ans est **6,045 %**, celui à 3 ans **6,225 %**, etc.*

<details><summary>**Exercice résolu — bootstrap par un taux de swap (exemple 7.1)**</summary>

**Énoncé.** Taux zéro LIBOR/swap 6, 12 et 18 mois : **4 %**, **4,5 %**, **4,8 %** (continus). Taux de swap **2 ans** (paiements **semestriels**) : **5 %**.

*Étape 1 — traduire le taux de swap.* *Il signifie qu'une obligation de principal 100 à coupon semestriel de 5 % par an **se vend au pair**.* Coupons de **2,5** à 0,5, 1, 1,5 et 2 ans, plus 100 à 2 ans. *Étape 2 — écrire l'équation.* Avec $R$ le taux zéro 2 ans :

$$2{,}5e^{-0{,}04\times0{,}5}+2{,}5e^{-0{,}045\times1{,}0}+2{,}5e^{-0{,}048\times1{,}5}+102{,}5e^{-2R}=100$$

*Étape 3 — actualiser les trois premiers.* $2{,}450+2{,}390+2{,}326=\mathbf{7{,}166}$. *Étape 4 — isoler.* $102{,}5e^{-2R}=92{,}834\Rightarrow e^{-2R}=0{,}905697$. *Étape 5 — extraire.* $R=-\dfrac{\ln 0{,}905697}{2}=\mathbf{4{,}953\,\%}$.

⚠️ *Ce calcul est simplifié : il ne tient compte ni des conventions de jours ni des calendriers de jours fériés.* *Les analystes interpolent fréquemment entre taux de swap avant de calculer la courbe zéro, de façon à disposer de taux tous les 6 mois. Pour les données ci-dessus, le taux 2,5 ans serait supposé valoir **6,135 %**, le taux 7,5 ans **6,696 %**.*

</details>

## 🔴 Concept 5 — Valoriser un swap de taux : les deux méthodes

*Un swap vaut **proche de zéro** à l'initiation. Après quelque temps, sa valeur peut être positive ou négative.* Deux approches — *qui doivent donner le même résultat*.

### 5.1 Par la différence de deux obligations

$$\boxed{V_{\text{swap}}=B_{\text{fix}}-B_{\text{fl}}}\ \text{(on reçoit fixe)}\qquad\qquad\boxed{V_{\text{swap}}=B_{\text{fl}}-B_{\text{fix}}}\ \text{(on paie fixe)}$$

**Valoriser la jambe variable — l'astuce.** *L'obligation à taux variable vaut le **notionnel juste après** un paiement d'intérêt, parce qu'à cet instant elle est un « contrat équitable » où l'emprunteur paie le LIBOR pour chaque période d'accumulation suivante.*

Si $L$ est le notionnel, $t^\ast$ la date du prochain échange et $k^\ast$ le paiement variable **déjà fixé** qui y sera fait :

$$B_{\text{fl}}(t^{\ast-})=L+k^\ast\qquad\Longrightarrow\qquad\boxed{B_{\text{fl}}=(L+k^\ast)e^{-r^\ast t^\ast}}$$

> **La conséquence pratique.** L'obligation à taux variable, **quelle que soit sa maturité résiduelle**, se réduit à **un seul flux** $L+k^\ast$ à la **prochaine** date. Toute la complexité disparaît.

<details><summary>**Exercice résolu — valoriser par les obligations (exemple 7.2)**</summary>

**Énoncé.** Une institution **paie le LIBOR 6 mois** et **reçoit 8 %** (semestriel) sur **100 millions**. Vie résiduelle **1,25 an**. Taux LIBOR continus : **10 %** à 3 mois, **10,5 %** à 9 mois, **11 %** à 15 mois. Dernier LIBOR 6 mois fixé : **10,2 %** (semestriel).

*Étape 1 — les flux fixes.* $0{,}5\times0{,}08\times100=\mathbf{4}$ M à 0,25 et 0,75 an ; $4+100=\mathbf{104}$ M à 1,25 an. *Étape 2 — les facteurs d'actualisation.*

$$e^{-0{,}1\times0{,}25}=0{,}9753\quad e^{-0{,}105\times0{,}75}=0{,}9243\quad e^{-0{,}11\times1{,}25}=0{,}8715$$

*Étape 3 — la jambe fixe.*

$$B_{\text{fix}}=4(0{,}9753)+4(0{,}9243)+104(0{,}8715)=3{,}901+3{,}697+90{,}640=\mathbf{98{,}238}$$

*Étape 4 — la jambe variable.* $k^\ast=0{,}5\times0{,}102\times100=\mathbf{5{,}1}$ M, $t^\ast=0{,}25$ :

$$B_{\text{fl}}=(100+5{,}1)\times0{,}9753=105{,}100\times0{,}9753=\mathbf{102{,}505}$$

*Étape 5 — la valeur.* On **reçoit fixe**, donc

$$V=98{,}238-102{,}505=\mathbf{-4{,}267}\ \text{millions}$$

*Étape 6 — la position inverse.* Payer fixe et recevoir variable vaudrait **+4,267 millions**.

⚠️ **Trois vigilances.** (i) Le dernier LIBOR fixé sert à calculer $k^\ast$, pas à actualiser. (ii) Le taux 8 % est **semestriel**, donc le coupon est $8\,\%/2$. (iii) Les taux d'actualisation sont **continus** — ne pas mélanger.

</details>

### 5.2 Par un portefeuille de FRA

*Le premier échange est **connu** au moment où le swap est négocié ; les autres peuvent être vus comme des **FRA**.*

> **La procédure, en trois étapes** — *c'est la règle de la section 4.7 étendue* : **1.** Utiliser la courbe zéro LIBOR/swap pour calculer les **taux forward** de chacun des LIBOR qui détermineront les flux. **2.** Calculer les flux du swap **en supposant que les LIBOR égaleront les forwards**. **3.** **Actualiser** ces flux (avec la même courbe) pour obtenir la valeur.

<details><summary>**Exercice résolu — la même valeur par les FRA (exemple 7.3)**</summary>

**Mêmes données que l'exemple 7.2.**

*Étape 1 — l'échange à 3 mois, déjà déterminé.* Entrée $100\times0{,}08\times0{,}5=\mathbf{+4{,}0}$ ; sortie $100\times0{,}102\times0{,}5=\mathbf{-5{,}1}$ → net **−1,100**. *Étape 2 — le forward 3-9 mois, par (4.5).*

$$\frac{0{,}105\times0{,}75-0{,}10\times0{,}25}{0{,}5}=\frac{0{,}07875-0{,}025}{0{,}5}=\mathbf{0{,}1075}\ \text{(continu)}$$

*Étape 3 — le convertir en semestriel, par (4.4).* $2(e^{0{,}1075/2}-1)=\mathbf{0{,}11044}$ → sortie $100\times0{,}11044\times0{,}5=\mathbf{-5{,}522}$ → net **−1,522**. *Étape 4 — le forward 9-15 mois.* $\dfrac{0{,}11\times1{,}25-0{,}105\times0{,}75}{0{,}5}=0{,}1175$ ; semestriel $2(e^{0{,}05875}-1)=0{,}12102$ → sortie **−6,051** → net **−2,051**. *Étape 5 — actualiser.*

| Date | Flux fixe | Flux variable | Net | Facteur | Valeur actuelle |
|---|---|---|---|---|---|
| 0,25 | 4,0 | −5,100 | −1,100 | 0,9753 | **−1,073** |
| 0,75 | 4,0 | −5,522 | −1,522 | 0,9243 | **−1,407** |
| 1,25 | 4,0 | −6,051 | −2,051 | 0,8715 | **−1,787** |
|  |  |  |  | **Total** | **−4,267** |

*Étape 6 — comparer.* **Identique** à la valeur obtenue par décomposition en obligations .

⚠️ **Le passage d'unité de l'étape 3 est obligatoire.** Le forward continu 10,75 % donnerait un flux de 5,375 au lieu de 5,522 — une erreur de **150 000 dollars** par échange.

</details>

### 5.3 Ce que la forme de la courbe fait aux FRA individuels

*Un swap vaut proche de zéro initialement : cela signifie que la **somme** des valeurs des FRA est proche de zéro. **Cela ne signifie pas** que chaque FRA vaut zéro.*

Pour Microsoft (qui **paie 5 %** et reçoit le LIBOR) :

$$\text{FRA}>0\iff \text{forward}>5{,}0\,\%\qquad \text{FRA}=0\iff\text{forward}=5{,}0\,\%\qquad \text{FRA}<0\iff\text{forward}<5{,}0\,\%$$

| Courbe | Forwards | Conséquence pour le **payeur fixe** |
|---|---|---|
| **Croissante** | croissants avec la maturité ; comme la somme est nulle, ils sont **sous 5 %** au début et **au-dessus** à la fin | FRA **négatifs** au début, **positifs** à la fin |
| **Décroissante** | l'inverse | FRA **positifs** au début, **négatifs** à la fin |

⚠️ **Ce résultat servira au risque de crédit** (concept 8) : un swap dont les échanges **précoces** ont des valeurs positives et les **tardifs** des valeurs négatives *aura probablement une valeur négative pendant la majeure partie de sa vie, et comporte donc **moins de risque de crédit***.

## 🟠 Concept 6 — Les swaps indexés sur le taux au jour le jour (OIS)

**L'origine.** *Les banques satisfont leurs besoins de liquidité en fin de journée en empruntant et prêtant à un **taux au jour le jour**, souvent un taux **ciblé par la banque centrale** pour influencer la politique monétaire.* Aux États-Unis : le **Fed Funds rate**.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Un **OIS** est un swap où un **taux fixe** pour une période (1 mois, 3 mois, 1 an, 2 ans) est échangé contre la **moyenne géométrique des taux au jour le jour** de la période. *Si une banque emprunte au jour le jour en roulant chaque nuit, son taux effectif **est** cette moyenne géométrique.* Le taux fixe s'appelle le **taux OIS**.

</div>

<details><summary>**Pourquoi le taux OIS est inférieur au LIBOR — et ce que l'écart mesure**</summary>

**Le raisonnement.** La banque A peut :

1. **emprunter** 100 millions au jour le jour pendant 3 mois, en roulant chaque nuit ;
2. **prêter** ces 100 millions à 3 mois au LIBOR à une autre banque B ;
3. **utiliser un OIS** pour échanger son emprunt au jour le jour contre un emprunt à taux fixe.

*Résultat : la banque A reçoit le **LIBOR 3 mois** et paie le **taux OIS 3 mois**. On pourrait donc s'attendre à ce que les deux soient égaux. **Il est généralement inférieur** — parce que la banque A exige une **compensation pour le risque que B fasse défaut** sur le prêt LIBOR.*

$$\boxed{\text{spread LIBOR-OIS}=\text{LIBOR 3 mois}-\text{taux OIS 3 mois}}$$

**C'est une mesure du stress des marchés financiers.**

| Période | Spread |
|---|---|
| Conditions **normales** | environ **10 points de base** |
| **Octobre 2008** | pic historique de **364 points de base** |
| Un an plus tard | retour à des niveaux **normaux** |
| **Juin 2010** | plus de **30 pb**, sur les inquiétudes concernant la **Grèce** et quelques autres pays européens |

> *Le taux OIS est de plus en plus considéré comme une **meilleure approximation du taux sans risque** que le LIBOR.* (Voir fiche 77.)

</details>

## 🔴 Concept 7 — Les swaps de devises

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Dans sa forme la plus simple, échanger **principal et intérêts** dans une devise contre **principal et intérêts** dans une autre.*

</div>

⚠️ **La différence structurelle avec le swap de taux.** *Le swap de devises exige que le principal soit **spécifié dans chacune des deux devises**, et les montants de principal sont **habituellement échangés au début ET à la fin**. Ils sont choisis pour être approximativement équivalents au taux de change à l'initiation ; à l'échange final, leurs valeurs peuvent être **très différentes**.*

<details><summary>**L'exemple canonique — IBM et British Petroleum (tableau 7.7)**</summary>

**Le contrat.** Swap **5 ans** signé le **1ᵉʳ février 2011**. IBM **paie 5 % en livres** et **reçoit 6 % en dollars**. Paiements **annuels**. Principaux : **18 millions de dollars** et **10 millions de livres**. C'est un swap **fixe contre fixe**.

*Étape 1 — l'échange initial, en sens inverse des paiements d'intérêt.* IBM **paie 18 M USD** et **reçoit 10 M GBP**. *Étape 2 — les intérêts annuels.* IBM **reçoit** $6\,\%\times18=\mathbf{1{,}08}$ M USD et **paie** $5\,\%\times10=\mathbf{0{,}50}$ M GBP. *Étape 3 — l'échange final.* IBM **paie 10 M GBP** et **reçoit 18 M USD**, en plus des derniers intérêts.

| Date | Flux en dollars (M) | Flux en livres (M) |
|---|---|---|
| 1ᵉʳ févr. 2011 | **−18,00** | **+10,00** |
| 1ᵉʳ févr. 2012 | +1,08 | −0,50 |
| 1ᵉʳ févr. 2013 | +1,08 | −0,50 |
| 1ᵉʳ févr. 2014 | +1,08 | −0,50 |
| 1ᵉʳ févr. 2015 | +1,08 | −0,50 |
| 1ᵉʳ févr. 2016 | **+19,08** | **−10,50** |

**Les deux usages.**

- **Transformer un passif** : si IBM émet 18 M USD d'obligations à 6 %, le swap transforme l'opération en un **emprunt de 10 M GBP à 5 %**. *L'échange initial convertit le produit de l'émission de dollars en livres ; les échanges suivants convertissent intérêts et principal.*
- **Transformer un actif** : si IBM peut placer 10 M GBP au Royaume-Uni à 5 % mais **anticipe un renforcement du dollar** et préfère un placement en dollars, le swap transforme le placement britannique en un **placement de 18 M USD rapportant 6 %**.

</details>

### 7.1 L'avantage comparatif en devises — cette fois il est réel

|  | USD | AUD |
|---|---|---|
| **General Electric** | **5,0 %** | **7,6 %** |
| **Qantas Airways** | **7,0 %** | **8,0 %** |

*(Taux ajustés pour refléter l'impact différentiel de la fiscalité.)*

Qantas paie **2 %** de plus en USD et seulement **0,4 %** de plus en AUD. Gain total attendu : $2{,}0-0{,}4=\mathbf{1{,}6\,\%}$ par an.

⚠️ **Différence essentielle avec le cas des taux.** *Dans le tableau 7.4, nous avons soutenu que les avantages comparatifs sont largement **illusoires**. Ici nous comparons des taux offerts dans **deux devises différentes**, et il est **plus probable que les avantages comparatifs soient réels**. Une source possible est la **fiscalité** : la position de GE peut être telle que des emprunts en USD conduisent à des impôts moindres sur son revenu mondial ; celle de Qantas peut être l'inverse.*

<details><summary>**Exercice résolu — répartir le gain de 1,6 % (figure 7.11)**</summary>

**Le montage.** GE veut **20 M AUD**, Qantas veut **15 M USD**, taux de change **0,7500 USD par AUD**. Chacune emprunte là où elle a son avantage : **GE emprunte USD**, **Qantas emprunte AUD**.

*Étape 1 — GE.* Elle paie **USD 5 %** aux prêteurs, reçoit **USD 5 %** de la banque, paie **AUD 6,9 %**. Net : **AUD 6,9 %**, soit **0,7 %** de mieux que les 7,6 % du marché . *Étape 2 — Qantas.* Elle paie **AUD 8 %** aux prêteurs, reçoit **AUD 8 %** de la banque, paie **USD 6,3 %**. Net : **USD 6,3 %**, soit **0,7 %** de mieux que les 7,0 % . *Étape 3 — la banque.* Elle **gagne 1,3 %** sur ses flux en USD et **perd 1,1 %** sur ses flux en AUD. *Si l'on ignore la différence entre les deux devises, elle réalise un gain net de **0,2 %***. *Étape 4 — le total.* $0{,}7+0{,}7+0{,}2=\mathbf{1{,}6\,\%}$ . *Étape 5 — le risque de change de la banque, et son remède.* Chaque année elle gagne $1{,}3\,\%\times15=\mathbf{195\,000}$ USD et perd $1{,}1\,\%\times20=\mathbf{220\,000}$ AUD. *Elle peut **éliminer tout risque de change** en achetant 220 000 AUD par an **sur le marché à terme**, pour chaque année de la vie du swap — verrouillant ainsi un gain net en USD.*

⚠️ **Les montages alternatifs existent mais sont mauvais.** On peut redessiner le swap pour que la banque gagne 0,2 % **en USD**. *Ces alternatives sont peu susceptibles d'être utilisées en pratique parce qu'elles ne laissent **pas** GE et Qantas libres de risque de change* — l'une des deux entreprises se retrouve à payer 1,1 % dans une devise et un taux dans l'autre. Hull ajoute : *il est généralement logique que ce soit **l'institution financière** qui porte le risque de change, parce qu'elle est **la mieux placée pour le couvrir**.*

</details>

### 7.2 Valoriser un swap de devises

$$\boxed{V_{\text{swap}}=B_D-S_0B_F}\ \text{(on reçoit des dollars, on paie la devise)}\qquad V_{\text{swap}}=S_0B_F-B_D\ \text{(l'inverse)}$$

où $B_F$ est la valeur, **mesurée en devise étrangère**, de l'obligation définie par les flux étrangers, $B_D$ celle des flux domestiques, et $S_0$ le change comptant (**dollars par unité de devise étrangère**).

<details><summary>**Exercice résolu — les deux méthodes, encore (exemples 7.4 et 7.5)**</summary>

**Énoncé.** Courbes **plates** : **4 %** au Japon, **9 %** aux États-Unis (continus). Une institution **reçoit 5 % en yens** et **paie 8 % en dollars**, une fois par an. Principaux : **10 M USD** et **1 200 M JPY**. Vie résiduelle **3 ans**. Change : **110 yens = 1 dollar**.

**Méthode A — par les obligations.**

| Date | Flux dollars (M) | VA (M) | Flux yens (M) | VA (M) |
|---|---|---|---|---|
| 1 | 0,8 | 0,7311 | 60 | 57,65 |
| 2 | 0,8 | 0,6682 | 60 | 55,39 |
| 3 | 0,8 | 0,6107 | 60 | 53,22 |
| 3 | 10,0 | 7,6338 | 1 200 | 1 064,30 |
| **Total** |  | **9,6439** |  | **1 230,55** |

$$V=\frac{1\,230{,}55}{110}-9{,}6439=11{,}1868-9{,}6439=\mathbf{+1{,}5430}\ \text{million de dollars}$$

**Méthode B — par les contrats forward.** *Chaque échange de paiements dans un swap de devises fixe contre fixe **est** un contrat de change à terme*, et on valorise en **supposant les taux forward réalisés** (section 5.7).

*Étape 1 — le change comptant en dollars par yen.* $1/110=\mathbf{0{,}009091}$. *Étape 2 — les taux forward, par (5.9)* avec $r=9\,\%$ et $r_f=4\,\%$ :

$$F_1=0{,}009091e^{0{,}05\times1}=\mathbf{0{,}009557}\qquad F_2=0{,}009091e^{0{,}10}=\mathbf{0{,}010047}\qquad F_3=0{,}009091e^{0{,}15}=\mathbf{0{,}010562}$$

*Étape 3 — convertir chaque flux en yens.* Année 1 : $60\times0{,}009557=\mathbf{0{,}5734}$ M USD. *Étape 4 — le flux net.* $-0{,}8+0{,}5734=\mathbf{-0{,}2266}$ M USD. *Étape 5 — actualiser au taux **dollar**.* $-0{,}2266e^{-0{,}09}=\mathbf{-0{,}2071}$. *Étape 6 — répéter.*

| Date | Flux dollars | Flux yens | Change forward | Valeur en dollars des yens | Flux net | VA |
|---|---|---|---|---|---|---|
| 1 | −0,8 | 60 | 0,009557 | 0,5734 | −0,2266 | **−0,2071** |
| 2 | −0,8 | 60 | 0,010047 | 0,6028 | −0,1972 | **−0,1647** |
| 3 | −0,8 | 60 | 0,010562 | 0,6337 | −0,1663 | **−0,1269** |
| 3 | −10,0 | 1 200 | 0,010562 | 12,6746 | +2,6746 | **+2,0417** |
|  |  |  |  |  | **Total** | **+1,5430** |

**Les deux méthodes coïncident** .

⚠️ **La structure de valeurs à retenir.** *Quand les taux d'intérêt des deux devises diffèrent significativement, **le payeur de la devise à taux élevé** est dans la situation où les forwards des **échanges précoces ont des valeurs négatives** et celui du **dernier échange de principaux une valeur positive**.* Le payeur de la devise à taux bas est dans la position inverse. **Ces résultats sont importants pour évaluer le risque de crédit du swap.**

</details>

## 🟠 Concept 8 — Risque de crédit

**Le mécanisme.** Une institution a deux contrats compensés. *Si personne ne fait défaut, elle reste parfaitement couverte : une baisse de valeur d'un contrat est toujours compensée par une hausse de l'autre. Mais si l'une des parties fait défaut, l'institution **doit toujours honorer** le contrat qu'elle a avec l'autre.*

*Si le contrat avec Microsoft a une valeur **positive** pour la banque et que Microsoft fait défaut, la banque perd **la totalité de cette valeur positive**. Pour rester couverte, elle devrait trouver un tiers acceptant de prendre la position de Microsoft — et **le payer** d'un montant approximativement égal à la valeur du contrat avant le défaut.*

> **L'exposition, en une ligne.**
>
> $$\boxed{\text{exposition}=\max(V_{\text{swap}},0)}$$
>
> *Si la contrepartie fait faillite, il y a une perte si la valeur du swap pour l'institution est **positive**, et **aucun effet** si elle est négative.* En théorie un défaut sur un contrat de valeur négative serait une **aubaine** ; en pratique *la contrepartie choisirait plutôt de vendre le contrat à un tiers ou de réarranger ses affaires pour ne pas perdre sa valeur positive*.

| Comparaison | Résultat |
|---|---|
| Swap contre **prêt** de même principal | pertes potentielles **beaucoup plus faibles** — *la valeur du swap n'est habituellement qu'une petite fraction de la valeur du prêt* |
| Swap de **devises** contre swap de **taux** | pertes potentielles **plus grandes** — *parce que les **principaux** sont échangés à la fin, un swap de devises a probablement une valeur plus grande au moment d'un défaut* |

⚠️ **Ne jamais confondre risque de crédit et risque de marché.** *Le **risque de crédit** provient de la possibilité d'un défaut de la contrepartie **quand la valeur du contrat est positive**. Le **risque de marché** provient de la possibilité que taux et changes évoluent de sorte que la valeur du contrat **devienne négative**. Les risques de marché se couvrent relativement facilement par des contrats compensateurs ; **les risques de crédit sont bien moins faciles à couvrir**.*

> **Et il existe un troisième risque : le risque juridique — l'affaire Hammersmith and Fulham.** Entre **1987 et 1989**, l'arrondissement londonien conclut environ **600 swaps** de taux et instruments apparentés, pour un notionnel total d'environ **6 milliards de livres**. *Les opérations semblent avoir été conclues à des fins **spéculatives** plutôt que de couverture. Les deux employés responsables n'avaient qu'une **compréhension sommaire** des risques qu'ils prenaient et du fonctionnement des produits.*
>
> En 1989, les mouvements de taux en livres lui font perdre **plusieurs centaines de millions**. Les banques, couvertes par des swaps compensateurs, s'inquiètent du risque de crédit : *si Hammersmith and Fulham faisait défaut, elles devraient quand même honorer leurs swaps compensateurs et subiraient une perte énorme.*
>
> **Ce qui est arrivé fut un peu différent d'un défaut.** *L'auditeur de la commune demanda à faire **déclarer les transactions nulles**, au motif que la commune **n'avait pas l'autorité** de les conclure. Les tribunaux britanniques lui donnèrent raison. L'affaire alla jusqu'à la **Chambre des Lords**, plus haute juridiction : décision finale — la commune **n'avait pas** cette autorité, mais **devrait l'avoir à l'avenir à des fins de gestion des risques**. Inutile de dire que les banques furent furieuses de voir leurs contrats annulés de cette façon par les tribunaux.*

**Les chambres de compensation.** *Pour réduire le risque systémique, les gouvernements ont, depuis la crise, imposé leur usage pour de nombreux swaps.* La chambre s'interpose, exige une **marge initiale** et des **marges de variation**, comme pour les futures (fiche 75).

## 🟢 Concept 9 — Le zoo des autres swaps

**Variantes du swap de taux.**

| Nom | Ce qui change |
|---|---|
| **Ténor** différent | LIBOR 1, 3, 6 ou 12 mois ; *le ténor de la jambe variable **n'a pas** à égaler celui de la jambe fixe* — le standard américain est **LIBOR trimestriel contre fixe semestriel** |
| **Variable contre variable** | par exemple CP 3 mois + 10 pb contre LIBOR 3 mois — *permet de couvrir une exposition quand actifs et passifs suivent des taux variables différents* |
| **Amortissant** (*amortizing*) | le principal **décroît** de façon prédéterminée (calqué sur un amortissement de prêt) |
| **Croissant** (*step-up*) | le principal **croît** (calqué sur des tirages de crédit) |
| **Différé** / **forward** | les échanges **ne commencent qu'à une date future** |
| **CMS** (*constant maturity swap*) | échange d'un **LIBOR** contre un **taux de swap** (ex. LIBOR 6 mois contre taux de swap 10 ans, tous les 6 mois pendant 5 ans) |
| **CMT** | idem contre un **taux du Trésor** (ex. le 10 ans) |
| **Composé** (*compounding*) | les intérêts sont **capitalisés** jusqu'à la fin — **un seul paiement** final |
| **LIBOR-in-arrears** | le LIBOR observé **à une date de paiement** sert à calculer le paiement de **cette même date** |
| **Accrual** | l'intérêt d'une jambe **ne court que si** le taux de référence est **dans une plage** donnée |

**Autres swaps de devises.** **Fixe contre variable** = combinaison d'un swap de taux et d'un swap de devises fixe-fixe, appelé ***cross-currency interest rate swap*** · **variable contre variable** · ***diff swap*** ou **quanto** : *un taux observé dans une devise appliqué à un principal dans une autre* (LIBOR US 3 mois contre LIBOR britannique 3 mois, les deux sur 10 M GBP).

**Swaps d'actions.** *Échanger le **rendement total** (dividendes et plus-values) d'un indice contre un taux fixe ou variable.* Exemple : rendement total du S&P 500 sur des semestres successifs contre LIBOR. *Ils permettent aux gérants de convertir les rendements d'un placement obligataire en rendements d'un placement en actions, et inversement.*

**Options.** ***Extendable swap*** : une partie peut **prolonger** la vie du swap · ***puttable swap*** : une partie peut le **terminer par anticipation** · ***swaption*** : *le droit, à une date future, d'entrer dans un swap où un taux fixe prédéterminé est échangé contre du variable*.

**Matières premières et volatilité.** *Un **swap de matière première** est essentiellement une série de forwards de maturités différentes et de **mêmes prix de livraison**.* Dans un **swap de volatilité**, à la fin de chaque période, *une partie paie une volatilité convenue d'avance et l'autre la **volatilité historique réalisée** pendant la période*, les deux multipliées par le même notionnel.

> *Les swaps ne sont limités que par l'imagination des ingénieurs financiers et le désir de structures exotiques des trésoriers et gérants* — Hull cite le fameux **swap 5/30** entre **Procter & Gamble** et **Bankers Trust**, dont les paiements dépendaient de façon complexe du taux du papier commercial 30 jours, du prix d'une obligation du Trésor 30 ans et du rendement du 5 ans.

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| Trois jambes (prêteur externe + deux jambes de swap) | **taux net** | additionner en respectant les signes |
| Deux entreprises, quatre taux | **avantage comparatif** | gain total $=a-b$ |
| Un taux de swap et des taux zéro plus courts | **bootstrap** | obligation **au pair** : prix $=100$ |
| Vie résiduelle, taux zéro, dernier LIBOR fixé | **valoriser** | $B_{\text{fix}}-B_{\text{fl}}$, avec $B_{\text{fl}}=(L+k^\ast)e^{-r^\ast t^\ast}$ |
| Les mêmes données, « par les FRA » | **valoriser autrement** | forwards → flux → actualiser |
| Deux devises, deux courbes, un change | **swap de devises** | $B_D-S_0B_F$ ou forwards de change |
| « quelle est l'exposition au défaut ? » | **risque de crédit** | $\max(V,0)$ |

## Comment résoudre ce type d'exercice

**Protocole valorisation par obligations — 5 étapes.**

1. Lister les **dates** restantes et les **flux fixes** ($cL/m$ à chaque date, plus $L$ à la fin).
2. Calculer les facteurs $e^{-r_it_i}$ avec la courbe **zéro** (continue).
3. $B_{\text{fix}}=\sum$ flux $\times$ facteurs.
4. $B_{\text{fl}}=(L+k^\ast)e^{-r^\ast t^\ast}$ où $k^\ast$ vient du **dernier LIBOR fixé**.
5. $V=B_{\text{fix}}-B_{\text{fl}}$ si l'on **reçoit** fixe ; changer de signe sinon.

**Protocole valorisation par FRA — 5 étapes.**

1. Le **premier** échange est **déjà connu** : le calculer avec le dernier LIBOR fixé.
2. Pour chaque échange suivant, calculer le **forward continu** par $R_F=\frac{R_2T_2-R_1T_1}{T_2-T_1}$.
3. **Convertir** le forward dans la fréquence de la période : $R_m=m(e^{R_c/m}-1)$.
4. Flux net $=$ fixe $-$ variable (ou l'inverse) $\times L\times\Delta t$.
5. **Actualiser** chaque net au taux zéro de sa date et **sommer**. Contrôler par la méthode des obligations.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire que le nominal est échangé dans un swap de taux | Il est **notionnel** — il n'est échangé que dans un swap de **devises** |
| Utiliser le LIBOR de la date de paiement | C'est celui de **six mois avant** qui détermine le flux |
| Valoriser la jambe variable flux par flux | Elle se réduit à **un seul** flux $L+k^\ast$ à la prochaine date |
| Utiliser un forward **continu** dans un flux de swap | Le convertir dans la **fréquence des paiements** |
| Croire que l'avantage comparatif est un repas gratuit | Il vient du **droit de révision** du prêteur variable — largement **illusoire** |
| Annoncer que BBBCorp emprunte à 4,97 % | Seulement si son spread **reste** à +0,6 % ; il montera en moyenne |
| Oublier qu'AAACorp achète du **risque de contrepartie** | Elle n'en aurait pas en empruntant simplement à taux variable |
| Confondre taux de swap 5 ans et taux AA 5 ans | Le taux de swap est **inférieur** : 10 prêts 6 mois à des AA **successives** |
| Prendre le spread LIBOR-OIS pour un taux | C'est un **indicateur de stress** : 10 pb normal, **364 pb** en octobre 2008 |
| Oublier le sens de l'échange initial de principaux | Il se fait **en sens inverse** des paiements d'intérêts |
| Croire qu'un swap couvert n'a plus de risque | Il reste le **risque de crédit** : $\max(V,0)$ |
| Croire que les deux méthodes de valorisation peuvent différer | Elles donnent **exactement** le même nombre — sinon il y a une erreur |

## 📌 Ultimate Review

**Les deux lectures d'un swap.** Obligation fixe contre obligation variable · **portefeuille de FRA**. Les deux valorisations coïncident **toujours**.

**Les formules.**

$$V_{\text{swap}}=B_{\text{fix}}-B_{\text{fl}}\qquad B_{\text{fl}}=(L+k^\ast)e^{-r^\ast t^\ast}\qquad V_{\text{devises}}=B_D-S_0B_F\qquad \text{exposition}=\max(V,0)$$

$$\text{flux variable}=\frac{LRn}{360}\qquad \text{gain d'un avantage comparatif}=a-b$$

**La règle de valorisation universelle du livre.** *Supposer que les taux (ou changes) **forward se réalisent**, puis **actualiser au taux sans risque*** — vraie pour les FRA (ch. 4), les forwards (ch. 5) et les swaps (ch. 7).

**Les taux de swap.** Moyenne bid/offer · définissent des **obligations au pair** · risque de crédit de **$2n$ prêts LIBOR 6 mois successifs à des AA** · **inférieurs** aux taux AA de même maturité.

**Les chiffres du chapitre.** Écart typique de l'intermédiaire **3 à 4 pb** · Microsoft/Intel : 5 % contre LIBOR sur 100 M, nets −0,40 / −0,10 / +0,15 / +0,25 / +0,30 / +0,45 · flux corrigé du décompte : **2,1467** au lieu de 2,10 · avantage comparatif $1{,}2-0{,}7=\mathbf{0{,}5\,\%}$ · taux de swap 2 ans **6,045 %**, 10 ans **6,850 %** · exemple 7.1 → **4,953 %** · exemples 7.2 et 7.3 → **−4,267 M** · exemples 7.4 et 7.5 → **+1,5430 M** · GE/Qantas $2{,}0-0{,}4=\mathbf{1{,}6\,\%}$ · LIBOR-OIS : **10 pb** normal, **364 pb** en octobre 2008 · Hammersmith and Fulham : **600 swaps**, **6 Md GBP**.

## 🧠 Active Recall

<details><summary>Pourquoi un swap de taux est-il équivalent à l'échange de deux obligations ?</summary>

Parce qu'**ajouter un échange fictif de principaux à la fin ne change rien** : les deux principaux sont identiques, et échanger 100 M contre 100 M n'a aucune valeur. Une fois ce principal ajouté, la colonne des flux **variables** devient exactement les flux d'une **obligation à taux variable**, et la colonne des flux **fixes** ceux d'une **obligation à taux fixe**. Le payeur fixe est donc **long variable, court fixe**.

</details>

<details><summary>Microsoft emprunte à LIBOR + 10 pb, paie 5 % et reçoit le LIBOR dans un swap. Quel est son coût net, et pourquoi ?</summary>

Trois jambes : $-(\text{LIBOR}+0{,}1\,\%)$ aux prêteurs, $+\text{LIBOR}$ du swap, $-5\,\%$ du swap. Le LIBOR **s'annule** et il reste $\mathbf{-5{,}1\,\%}$ : un emprunt **à taux fixe de 5,1 %**. C'est tout l'objet du swap : transformer un passif variable en passif fixe.

</details>

<details><summary>Quel est le gain total d'un swap d'avantage comparatif, et pourquoi cet avantage est-il « largement illusoire » ?</summary>

**Gain total $=a-b$**, l'écart en fixe moins l'écart en variable — ici $1{,}2-0{,}7=0{,}5\,\%$.

Il est illusoire parce que **les deux taux ne portent pas sur la même chose** : le taux fixe est un taux **5 ans** que le prêteur ne peut **pas** réviser ; le taux variable est un taux **6 mois** que le prêteur **peut réviser** — voire refuser de renouveler. L'écart plus large en fixe reflète simplement que la probabilité de défaut d'un émetteur mal noté **croît plus vite** avec l'horizon. *Si le spread variable était garanti d'avance quels que soient les changements de notation, les différentiels disparaîtraient.*

</details>

<details><summary>Pourquoi le taux de swap 5 ans est-il inférieur au taux d'emprunt AA à 5 ans ?</summary>

Parce que gagner le taux de swap 5 ans revient à faire **10 prêts LIBOR consécutifs de 6 mois** à des emprunteurs **AA au début de chaque période**. *Il est bien plus attractif de prêter à des emprunteurs qui sont **toujours AA au début** de chaque semestre que de prêter à **un seul** emprunteur pendant 5 ans, dont on sait seulement qu'il est AA **au départ**.* Le risque de crédit accumulé est donc **plus faible**, et le taux aussi.

</details>

<details><summary>Comment valoriser la jambe variable d'un swap, et pourquoi est-ce si simple ?</summary>

$$B_{\text{fl}}=(L+k^\ast)e^{-r^\ast t^\ast}$$

Parce que *l'obligation à taux variable vaut le **notionnel juste après** un paiement d'intérêt* : à cet instant, c'est un « contrat équitable » où l'emprunteur paie le LIBOR pour chaque période suivante. **Juste avant** le paiement, elle vaut donc $L+k^\ast$. Toute la maturité résiduelle se réduit ainsi à **un seul flux à la prochaine date**.

</details>

<details><summary>Un swap paie le LIBOR et reçoit 8 % semestriel sur 100 M, vie 1,25 an, taux 10 %/10,5 %/11 %, dernier LIBOR 10,2 %. Le valoriser.</summary>

$B_{\text{fix}}=4(0{,}9753)+4(0{,}9243)+104(0{,}8715)=\mathbf{98{,}238}$. $k^\ast=0{,}5\times0{,}102\times100=5{,}1$, donc $B_{\text{fl}}=105{,}1\times0{,}9753=\mathbf{102{,}505}$. $V=98{,}238-102{,}505=\mathbf{-4{,}267}$ millions (on reçoit fixe). La position inverse vaudrait **+4,267**.

</details>

<details><summary>Énoncer la procédure de valorisation par les FRA, et dire quelle conversion est indispensable.</summary>

**1.** Calculer les **forwards** de chaque LIBOR déterminant un flux, avec la courbe zéro. **2.** Calculer les flux **en supposant que les LIBOR égaleront les forwards**. **3.** **Actualiser** avec la même courbe.

La conversion indispensable est celle des forwards **continus** vers la **fréquence des paiements** : $R_m=m(e^{R_c/m}-1)$. Dans l'exemple, 10,75 % continu devient **11,044 %** semestriel — soit 5,522 M au lieu de 5,375 M, une erreur de **150 000 dollars** par échange si on l'oublie.

</details>

<details><summary>Sur une courbe croissante, quels FRA sont positifs pour le payeur fixe, et pourquoi ?</summary>

Ceux des **dates tardives**. La somme des valeurs des FRA est proche de **zéro** à l'initiation ; les forwards **croissent** avec la maturité ; ils sont donc **sous** le taux fixe pour les premières dates et **au-dessus** pour les dernières. Le payeur fixe gagne quand le forward **dépasse** le taux fixe : ses FRA précoces sont **négatifs**, ses FRA tardifs **positifs**. Sur une courbe décroissante, c'est l'inverse.

</details>

<details><summary>Qu'est-ce que le spread LIBOR-OIS et que mesure-t-il ?</summary>

C'est **LIBOR 3 mois − taux OIS 3 mois**. Un arbitrage — emprunter au jour le jour, prêter à 3 mois au LIBOR, swapper via un OIS — rendrait les deux taux égaux **si le prêt LIBOR était sans risque**. L'écart est donc la **compensation du risque de défaut** de la banque emprunteuse. C'est **une mesure du stress des marchés** : environ **10 pb** en temps normal, pic historique de **364 pb** en **octobre 2008**, plus de **30 pb** en juin 2010 lors des inquiétudes sur la Grèce.

</details>

<details><summary>Pourquoi l'avantage comparatif est-il plus crédible en devises qu'en taux ?</summary>

Parce qu'on **compare des taux offerts dans deux devises différentes**, et non deux structures d'un même marché. *Il est plus probable que les avantages comparatifs soient **réels**.* Une source citée par Hull est la **fiscalité** : la position de General Electric peut être telle qu'un emprunt en USD réduise ses impôts sur son revenu mondial, celle de Qantas étant l'inverse. Les taux du tableau sont d'ailleurs **ajustés** pour refléter cet impact fiscal différentiel.

</details>

<details><summary>Quelle est l'exposition au risque de crédit d'un swap, et pourquoi un swap de devises en porte-t-il davantage ?</summary>

$$\text{exposition}=\max(V_{\text{swap}},0)$$

Un défaut ne coûte quelque chose que si le swap a une valeur **positive** pour nous ; s'il est négatif, *la contrepartie choisirait de le vendre à un tiers plutôt que d'en perdre la valeur*. Un swap de **devises** en porte davantage parce que **les principaux sont échangés à la fin** : sa valeur au moment d'un défaut est **potentiellement bien plus grande** que celle d'un swap de taux, où seuls des intérêts nets circulent.

</details>

<details><summary>Que montre l'affaire Hammersmith and Fulham ?</summary>

Qu'aux risques de **marché** et de **crédit** s'ajoute un **risque juridique**. Entre 1987 et 1989, la commune conclut **≈ 600 swaps** pour **≈ 6 milliards de livres**, à des fins **spéculatives**, ses deux employés n'ayant qu'une *compréhension sommaire* des produits. Après des pertes de plusieurs centaines de millions, son auditeur demanda l'**annulation** des contrats au motif que la commune **n'avait pas l'autorité** de les conclure. La **Chambre des Lords** trancha : elle n'avait pas cette autorité — mais *devrait l'avoir à l'avenir à des fins de gestion des risques*. Les contrats furent annulés, à la fureur des banques.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Qu'est-ce qu'un swap ? | Accord **OTC** d'échanger des **flux futurs** à des dates convenues |
| Quand les premiers swaps ont-ils été négociés ? | Au **début des années 1980** |
| Swap vanille de taux ? | Payer un **taux fixe**, recevoir le **LIBOR**, sur un notionnel |
| Pourquoi « notionnel » ? | Le principal **n'est pas échangé** |
| Quel LIBOR détermine le flux d'une date ? | Celui observé **six mois avant** |
| Y a-t-il une incertitude sur le premier échange ? | **Non** — il est fixé à la conclusion du contrat |
| Les deux lectures d'un swap ? | Obligation fixe **contre** obligation variable · portefeuille de **FRA** |
| Le payeur fixe est… ? | **Long variable, court fixe** |
| Marge typique de l'intermédiaire ? | **3 à 4 points de base** sur une paire |
| Formule d'un flux variable avec décompte ? | $LRn/360$ |
| Convention du LIBOR ? du taux fixe ? | Actual/360 · **actual/365 ou 30/360** |
| Comment rendre les deux comparables ? | Multiplier le LIBOR par **365/360** |
| Qu'est-ce qu'un Master Agreement ISDA ? | Clauses standard couvrant **toutes** les transactions entre deux parties |
| *Following business day convention* ? | Paiement reporté au **jour ouvré suivant** |
| *Modified following* ? | Sauf si le mois change → jour ouvré **précédent** |
| Gain total d'un avantage comparatif ? | $\mathbf{a-b}$ |
| La formule mnémotechnique de Hull ? | *AAACorp paie **plus moins** en fixe, BBBCorp **moins plus** en variable* |
| Pourquoi l'avantage est-il illusoire ? | Le taux variable est **révisable tous les 6 mois** |
| Ce que BBBCorp obtient vraiment ? | 4,97 % **seulement si** son spread reste à +0,6 % |
| Ce qu'AAACorp achète en plus ? | Le **risque de défaut de l'institution financière** |
| Définition d'un taux de swap ? | Moyenne du **bid** et de l'**offer** du teneur de marché |
| Risque de crédit d'un taux de swap 5 ans ? | **10 prêts LIBOR 6 mois** consécutifs à des **AA** |
| Taux de swap 5 ans vs taux AA 5 ans ? | Le taux de swap est **inférieur** |
| Que définissent les taux de swap ? | Des **obligations au pair** |
| Valeur d'une obligation variable neuve ? | Le **pair** |
| Valorisation par obligations ? | $V=B_{\text{fix}}-B_{\text{fl}}$ (on reçoit fixe) |
| Valeur de la jambe variable ? | $(L+k^\ast)e^{-r^\ast t^\ast}$ |
| Pourquoi ? | Elle vaut le **pair juste après** un paiement |
| Les trois étapes de la valorisation par FRA ? | Forwards → flux **si forwards réalisés** → actualiser |
| Résultat de l'exemple 7.2/7.3 ? | $\mathbf{-4{,}267}$ millions, par les deux méthodes |
| Courbe croissante : FRA du payeur fixe ? | **Négatifs** au début, **positifs** à la fin |
| Qu'est-ce qu'un OIS ? | Fixe contre **moyenne géométrique des taux au jour le jour** |
| Taux au jour le jour américain ? | Le **Fed Funds rate** |
| Que mesure le spread LIBOR-OIS ? | Le **stress** des marchés financiers |
| Sa valeur normale ? son pic ? | **10 pb** · **364 pb** en octobre 2008 |
| Swap de devises : le principal est-il échangé ? | **Oui**, au **début et à la fin** |
| Sens de l'échange initial ? | **Inverse** de celui des paiements d'intérêts |
| Valorisation d'un swap de devises ? | $V=B_D-S_0B_F$ |
| Deuxième méthode ? | Portefeuille de **forwards de change**, forwards **réalisés** |
| Gain total GE/Qantas ? | $2{,}0-0{,}4=\mathbf{1{,}6\,\%}$ |
| Comment la banque couvre-t-elle son risque de change ? | En achetant les **AUD à terme** chaque année |
| Qui doit porter le risque de change ? | L'**institution financière** — la mieux placée pour le couvrir |
| Exposition au risque de crédit ? | $\max(V_{\text{swap}},0)$ |
| Swap ou prêt : quelle perte potentielle ? | **Beaucoup plus faible** pour le swap |
| Swap de taux ou de devises ? | Le swap de **devises** est plus risqué (principaux échangés) |
| Risque de crédit vs risque de marché ? | Défaut quand $V>0$ · évolution défavorable des variables |
| Lequel se couvre facilement ? | Le risque de **marché** |
| Swap **amortissant** ? **step-up** ? | Principal **décroissant** · **croissant** |
| Swap **CMS** ? | LIBOR contre un **taux de swap** |
| Swap **LIBOR-in-arrears** ? | Le LIBOR de la date **sert pour cette même date** |
| Swap **accrual** ? | L'intérêt ne court que si le taux est **dans une plage** |
| Qu'est-ce qu'un *diff swap* ? | Un taux d'une devise appliqué à un principal d'une **autre** |
| Swap d'actions ? | **Rendement total** d'un indice contre un taux |
| *Extendable* / *puttable* / *swaption* ? | Prolonger · **terminer** · **droit d'entrer** dans un swap |
| Swap de volatilité ? | Volatilité **convenue** contre volatilité **réalisée** |
| Le swap célèbre de Procter & Gamble ? | Le **5/30** avec **Bankers Trust** |
| Notionnel de Hammersmith and Fulham ? | Environ **6 milliards de livres** (≈ 600 swaps) |
| Verdict de la Chambre des Lords ? | Pas d'autorité — mais **devrait l'avoir à l'avenir** |
