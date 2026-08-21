# Fiche 107 — Les accidents de dérivés et ce qu'ils nous apprennent

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Gestion des risques |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 35 « Derivatives Mishaps and What We Can Learn from Them » |
| **Difficulté** | High — la synthèse pratique de tout le livre |
| **Temps d'étude estimé** | 1 h |
| **Prérequis** | Fiches 84 (stratégies), 90 (grecques), 93 (VaR), 95-96 (crédit), 104 (swaps non standard) |
| **Concepts clés** | Limites de risque, illusion de battre le marché, bénéfices de la diversification, analyses de scénarios et *stress tests*, séparation *front / middle / back office*, *marking to model*, profits d'origine (*inception profits*), risque de liquidité, arbitrage de convergence, stratégies grégaires, financement court terme, transparence de marché, incitations, hedger devenu spéculateur, trésorerie comme centre de profit |
| **Poids à l'examen** | Les **trois blocs de leçons** (tous · institutions financières · entreprises non financières) · l'argument des **16 traders et $0{,}5^4$** · l'exemple de **diversification 30 % → 14,7 %** · **la séparation des trois offices**. |

## 🎯 Vue d'ensemble

```
LE FAIT REMARQUABLE   « le NOMBRE DE SITUATIONS où d'ÉNORMES pertes ont surgi
   des activités d'UN SEUL EMPLOYÉ »
   Leeson (Barings, 1995) · Citron (Orange County, 1994) · Jett (Kidder Peabody)
   Rusnak (Allied Irish, 2002) · Hunter (Amaranth, 2006) · Kerviel (SocGen, 2008)

⚠️ MAIS   « ces pertes ne doivent PAS être vues comme un acte d'accusation
   contre TOUTE L'INDUSTRIE » — elles représentent une PROPORTION MINUSCULE des échanges

BLOC 1 — POUR TOUS LES UTILISATEURS
  définir des LIMITES de risque · les PRENDRE AU SÉRIEUX même quand il y a profit
  ne pas croire qu'on bat le marché (16 traders × 0,5⁴ = 1 en aura 4 trimestres gagnants)
  ne pas sous-estimer la DIVERSIFICATION (30 % → 14,7 % avec 20 titres à ρ = 0,2)
  faire des SCÉNARIOS et des STRESS TESTS

BLOC 2 — POUR LES INSTITUTIONS FINANCIÈRES
  surveiller les traders (surtout les MEILLEURS) · SÉPARER front / middle / back office
  ne pas faire aveuglément confiance aux modèles · être CONSERVATEUR sur les inception profits
  ne pas vendre de produits inadaptés · ne pas ignorer le RISQUE DE LIQUIDITÉ
  se méfier quand TOUT LE MONDE suit la même stratégie · le financement COURT crée des crises
  la TRANSPARENCE compte · gérer les INCITATIONS · ne JAMAIS ignorer le risk management

BLOC 3 — POUR LES ENTREPRISES NON FINANCIÈRES
  comprendre PLEINEMENT ce qu'on traite · empêcher le HEDGER de devenir SPÉCULATEUR
  se méfier de la trésorerie comme CENTRE DE PROFIT
```

**Le cadrage, et l'avertissement de Hull.** *« Les plus grosses pertes sont venues des produits créés à partir des crédits hypothécaires résidentiels américains (chapitre 8). **Ce qui est remarquable dans ces listes, c'est LE NOMBRE DE SITUATIONS où d'énormes pertes ont surgi des activités D'UN SEUL EMPLOYÉ.** »*

> ⚠️ ***« Les pertes NE DOIVENT PAS être vues comme un acte d'accusation contre toute l'industrie des dérivés. Le marché des dérivés est un vaste marché de plusieurs milliers de milliards de dollars qui, selon la plupart des mesures, a été REMARQUABLEMENT RÉUSSI et a bien servi les besoins de ses utilisateurs. »***
>
> *Alan Greenspan (mai 2003) : **« L'usage d'un éventail croissant de dérivés et l'application de méthodes plus sophistiquées de mesure et de gestion du risque sont des facteurs CLÉS sous-tendant la RÉSILIENCE ACCRUE de nos plus grands intermédiaires financiers. »***
>
> *« Les événements représentent **une proportion MINUSCULE du total des transactions**, en nombre comme en valeur. **Néanmoins, il vaut la peine d'en considérer soigneusement les leçons.** »*

## 🟡 Concept 1 — Le catalogue des désastres

<details class="details--riche">
<summary>

**Business Snapshot 35.1 — les grosses pertes des INSTITUTIONS FINANCIÈRES**

</summary>

| Institution | Perte | Cause |
|---|---|---|
| **Allied Irish Bank** | **≈ 700 millions** | *les activités spéculatives d'**un** trader de change, **John Rusnak**, sur plusieurs années. **Il a réussi à masquer ses pertes en créant des TRANSACTIONS D'OPTIONS FICTIVES*** |
| **Amaranth** | **6 milliards (2006)** | *un fonds spéculatif pariant sur **la direction future des prix du GAZ NATUREL*** |
| **Barings** | **près de 1 milliard (1995)** | *une banque britannique **de 200 ans** détruite par **un seul trader, Nick Leeson**, à Singapour, qui a fait de gros paris sur le **Nikkei 225** en futures et options* |
| **Daiwa Bank** | **plus de 1 milliard** | *un trader à New York, années 1990* |
| **Contreparties d'Enron** | **plus de 1 milliard** | *Enron a masqué sa vraie situation à ses actionnaires par **des contrats créatifs** ; plusieurs institutions financières accusées de l'avoir aidée ont réglé des recours d'actionnaires* |
| **Kidder Peabody** | **350 millions** | *les activités d'**un seul trader, Joseph Jett**, sur les titres d'État américains. **La perte est née d'une ERREUR DANS LA FAÇON DONT LE SYSTÈME INFORMATIQUE DE L'ENTREPRISE CALCULAIT LES PROFITS*** |
| **Long-Term Capital Management** | **≈ 4 milliards (1998)** | *le **défaut russe** et la **fuite vers la qualité** qui en a résulté. **La Fed de New York a organisé une liquidation ORDONNÉE en faisant investir 14 banques dans le fonds*** |
| **Midland Bank** | **500 millions** | *un **mauvais pari sur la direction des taux**, début des années 1990* |
| **Société Générale** | **plus de 7 milliards (janvier 2008)** | ***Jérôme Kerviel**, spéculant sur la direction future des indices actions* |
| **Pertes subprime** | **des dizaines de milliards (2007)** | *perte de confiance dans les produits structurés issus des subprimes américains → **« credit crunch »** : **UBS, Merrill Lynch, Citigroup*** |

</details>

<details class="details--riche">
<summary>

**Business Snapshot 35.2 — les grosses pertes des ENTREPRISES NON FINANCIÈRES**

</summary>

| Entreprise | Perte | Cause |
|---|---|---|
| **Allied Lyons** | **150 millions (1991)** | *le service de trésorerie de ce groupe de boissons et d'alimentation **VENDANT des CALLS sur le change dollar-sterling*** |
| **Gibson Greetings** | **≈ 20 millions (1994)** | *un fabricant de cartes de vœux traitant des **dérivés de taux HAUTEMENT EXOTIQUES avec Bankers Trust**. Il l'a ensuite poursuivi et a réglé à l'amiable* |
| **Hammersmith and Fulham** | **≈ 600 millions (1988)** | *cette collectivité locale britannique sur des **swaps et options de taux sterling**. **Tous ses contrats ont ensuite été déclarés NULS ET NON AVENUS par les tribunaux britanniques, au grand dam des banques*** |
| **Metallgesellschaft** | **1,3 milliard** | *contrats de long terme de fourniture de pétrole et d'essence, **couverts en ROULANT des futures à COURT terme**. Perte quand elle a été **forcée d'interrompre** cette activité* |
| **Orange County** | **≈ 2 milliards (1994)** | ***Robert Citron**, trésorier, utilisant les dérivés pour **spéculer que les taux NE MONTERAIENT PAS*** |
| **Procter & Gamble** | **≈ 90 millions (1994)** | *dérivés de taux **hautement exotiques avec Bankers Trust** (le swap **5/30**, fiche 104) ; poursuite puis règlement à l'amiable* |
| **Shell** | **1 milliard** | *un **seul employé** de la filiale japonaise, en **trading NON AUTORISÉ** de futures de change* |
| **Sumitomo** | **≈ 2 milliards** | *un **seul trader** sur le **CUIVRE** spot, futures et options, années 1990* |

</details>

## 🔴 Concept 2 — Les leçons pour TOUS les utilisateurs

### 2.1 Définir des limites de risque

> ***« Il est ESSENTIEL que toutes les entreprises définissent DE FAÇON CLAIRE ET NON AMBIGUË des limites aux risques financiers qui peuvent être pris. Elles doivent ensuite mettre en place des PROCÉDURES pour s'assurer que ces limites sont respectées. »***

| Élément | Contenu |
|---|---|
| **Où fixer les limites globales** | **AU NIVEAU DU CONSEIL D'ADMINISTRATION** |
| **Puis** | les **convertir en limites applicables aux individus** responsables de risques particuliers |
| **Les rapports quotidiens** | doivent indiquer **le gain ou la perte** pour des mouvements donnés des variables de marché |
| **Le contrôle** | **les confronter aux gains et pertes RÉELS, pour vérifier que les procédures de valorisation sous-jacentes sont EXACTES** |

**Pourquoi c'est plus critique avec des dérivés.** *« Les dérivés peuvent servir à **la couverture, la spéculation ET l'arbitrage**. **Sans surveillance étroite, IL EST IMPOSSIBLE DE SAVOIR si un trader est passé de HEDGER à SPÉCULATEUR, ou d'ARBITRAGISTE à SPÉCULATEUR.** »*

> ⚠️ **Les deux exemples classiques.** *« **Barings et Société Générale**. Le mandat de **Nick Leeson** chez Barings et celui de **Jérôme Kerviel** chez SocGen étaient de **mener des transactions d'ARBITRAGE À FAIBLE RISQUE. LES DEUX SONT PASSÉS D'ARBITRAGISTES À PRENDRE D'ÉNORMES PARIS sur la direction future des indices actions. LES SYSTÈMES DE LEURS BANQUES ÉTAIENT SI INADÉQUATS QUE PERSONNE NE CONNAISSAIT L'AMPLEUR TOTALE DE CE QU'ILS FAISAIENT.** »*

⚠️ **La nuance importante :** *« L'argument ici **n'est PAS qu'aucun risque ne doit être pris**. Un trésorier, un trader ou un gérant **doit être autorisé à prendre des positions**. **Mais LES TAILLES des positions doivent être LIMITÉES et les systèmes en place doivent rapporter AVEC EXACTITUDE les risques pris.** »*

### 2.2 Prendre les limites au sérieux

> ***« Que se passe-t-il si un individu DÉPASSE les limites de risque ET FAIT UN PROFIT ? C'est une question DÉLICATE pour la direction. IL EST TENTANT D'IGNORER LES VIOLATIONS DE LIMITES QUAND ELLES PRODUISENT DES PROFITS. Mais c'est À COURTE VUE : cela conduit à une CULTURE où les limites ne sont pas prises au sérieux, ET PAVE LA VOIE À UN DÉSASTRE. »***

**Le cas d'école : Orange County.** *« Les activités de **Robert Citron en 1991-1993 avaient été TRÈS PROFITABLES** pour Orange County, et **la municipalité en était venue à COMPTER sur son trading pour des financements supplémentaires**. On a choisi d'ignorer les risques qu'il prenait **parce qu'il produisait des profits**. **Malheureusement, les pertes de 1994 ont de LOIN dépassé les profits des années précédentes.** »*

> ⚠️ **La règle à retenir.** *« **Les pénalités pour dépassement de limites doivent être TOUT AUSSI GRANDES quand il en résulte des PROFITS que quand il en résulte des PERTES.** Autrement, **les traders qui font des pertes sont susceptibles de CONTINUER À AUGMENTER LEURS PARIS dans l'espoir qu'un profit finira par arriver et que tout sera pardonné.** »*

### 2.3 Ne pas croire qu'on peut battre le marché

> *« Certains traders sont sans doute meilleurs que d'autres. **Mais AUCUN trader n'a raison tout le temps. Un trader qui prédit correctement la direction 60 % du temps FAIT BIEN.** Si un trader a un palmarès remarquable (comme Robert Citron au début des années 1990), **c'est probablement le résultat de LA CHANCE plutôt que d'une compétence supérieure.** »*

<details class="details--riche">
<summary>

**L'argument des 16 traders — le calcul décisif**

</summary>

**La situation.** *Une institution emploie **16 traders** et **l'un d'eux fait des profits À CHAQUE TRIMESTRE de l'année**. Doit-il recevoir un bon bonus ? **Ses limites de risque doivent-elles être augmentées ?**

*Étape 1 — la première question.* *« La réponse est qu'**inévitablement il recevra un bon bonus**. »*

*Étape 2 — la seconde question.* *« La réponse **doit être NON** »* :

$$\boxed{P(\text{4 trimestres gagnants par pur hasard})=0{,}5^4=\frac{1}{16}}$$

*Étape 3 — la conclusion.* ***« Cela signifie que, PAR PUR HASARD, UN des 16 traders "aura raison" À CHAQUE TRIMESTRE de l'année. IL NE FAUT PAS SUPPOSER QUE SA CHANCE VA CONTINUER, ET SES LIMITES DE RISQUE NE DOIVENT PAS ÊTRE AUGMENTÉES. »***

> **Le point statistique :** avec $n$ traders, on s'attend à en voir $n\times0{,}5^4$ réussir quatre trimestres consécutifs **sans aucun talent**. Ici, exactement **1**.

</details>

### 2.4 Ne pas sous-estimer la diversification

> *« Quand un trader semble bon à prédire une variable particulière, **il y a une tendance à augmenter ses limites**. On vient d'argumenter que c'est une mauvaise idée. Mais supposons qu'un fonds soit **vraiment convaincu** du talent du trader. **À quel point doit-il se laisser DÉ-DIVERSIFIER pour en profiter ?** **La réponse : LES BÉNÉFICES DE LA DIVERSIFICATION SONT ÉNORMES, et il est peu probable qu'un trader soit assez bon pour justifier d'y renoncer.** »*

<details class="details--riche">
<summary>

**L'exemple des 20 titres, recalculé**

</summary>

**Les données.** **20 titres**, chacun d'espérance de rendement **10 % par an** et d'écart-type **30 %**. **La corrélation entre deux titres quelconques est 0,2.**

*Étape 1 — l'espérance du portefeuille équipondéré :* inchangée, **10 % par an**.

*Étape 2 — sa variance :*

$$\sigma_P^2=\frac1n\sigma^2+\left(1-\frac1n\right)\rho\sigma^2=\frac{0{,}09}{20}+\frac{19}{20}\times0{,}2\times0{,}09=0{,}0045+0{,}0171=\mathbf{0{,}0216}$$

*Étape 3 — l'écart-type :*

$$\sigma_P=\sqrt{0{,}0216}=\boxed{\mathbf{14{,}7\,\%}}$$

**Les deux façons d'exprimer le résultat :**

| Formulation | Chiffre |
|---|---|
| *« La diversification permet à l'investisseur de **RÉDUIRE LES RISQUES DE PLUS DE MOITIÉ** »* | $30\,\% \to14{,}7\,\%$, soit **$-51\,\%$** |
| *« Une autre façon de l'exprimer : la diversification permet de **DOUBLER LE RENDEMENT ESPÉRÉ PAR UNITÉ DE RISQUE PRISE** »* | $\dfrac{0{,}10}{0{,}30}=0{,}333\ \to\ \dfrac{0{,}10}{0{,}147}=\mathbf{0{,}680}$ |

> ⚠️ ***« L'investisseur devrait être EXTRÊMEMENT BON en sélection de titres pour obtenir un meilleur arbitrage risque-rendement en investissant dans UN SEUL titre. »***

</details>

### 2.5 Faire des scénarios et des stress tests

> ***« Le calcul de mesures de risque comme la VaR doit TOUJOURS être accompagné d'analyses de scénarios et de stress testing pour comprendre CE QUI PEUT MAL TOURNER. LES ÊTRES HUMAINS ONT UNE MALHEUREUSE TENDANCE À S'ANCRER SUR UN OU DEUX SCÉNARIOS quand ils évaluent des décisions. »***

**L'exemple.** *« En 1993 et 1994, **Procter & Gamble et Gibson Greetings** étaient peut-être si convaincus que **les taux resteraient bas** qu'ils ont **IGNORÉ LA POSSIBILITÉ D'UNE HAUSSE DE 100 POINTS DE BASE** dans leur prise de décision. »*

| Recommandation | Contenu |
|---|---|
| **Créativité** | *« il est important d'être **CRÉATIF** dans la génération des scénarios et d'utiliser **le JUGEMENT de dirigeants EXPÉRIMENTÉS** »* |
| **Une approche** | *regarder **10 ou 20 ans de données** et choisir **les événements les plus EXTRÊMES*** |
| **Manque de données** | *« il est alors **sensé de choisir une variable SIMILAIRE pour laquelle bien plus de données existent** et d'utiliser ses variations quotidiennes en pourcentage comme PROXY ». Exemple : **s'il y a peu de données sur les obligations d'un pays, utiliser celles d'AUTRES PAYS SIMILAIRES*** |

## 🔴 Concept 3 — Les leçons pour les institutions financières

### 3.1 Surveiller les traders, et séparer les trois offices

> *« Dans les salles de marché il y a une tendance à considérer les traders très performants comme **"INTOUCHABLES"** et à **ne pas soumettre leurs activités au même examen** que les autres. Apparemment, **Joseph Jett**, le trader vedette de Kidder Peabody sur les instruments du Trésor, **était souvent "TROP OCCUPÉ" pour répondre aux questions et discuter de ses positions avec les risk managers**. »*
>
> ⚠️ *« Il est important que **TOUS les traders — PARTICULIÈREMENT ceux qui font de gros profits — soient pleinement RESPONSABLES.** Il faut savoir **si les gros profits sont faits en prenant des risques DÉRAISONNABLEMENT ÉLEVÉS**. Il faut aussi vérifier que **les systèmes informatiques et les modèles de valorisation sont CORRECTS et ne sont pas MANIPULÉS**. »*

$$\boxed{\begin{array}{lll}\textbf{FRONT OFFICE}&\text{les }\textbf{TRADERS}&\text{exécutent les transactions, prennent les positions}\\[3pt]\textbf{MIDDLE OFFICE}&\text{les }\textbf{RISK MANAGERS}&\text{surveillent les risques pris}\\[3pt]\textbf{BACK OFFICE}&\text{la }\textbf{TENUE DES REGISTRES}&\text{et la comptabilité}\end{array}}$$

> ⚠️ ***« CERTAINS DES PIRES DÉSASTRES DE DÉRIVÉS SONT SURVENUS PARCE QUE CES FONCTIONS N'ÉTAIENT PAS SÉPARÉES. »***

| Cas | Détail |
|---|---|
| **Nick Leeson** | *il contrôlait **À LA FOIS le front ET le back office** de Barings à Singapour, et a pu de ce fait **DISSIMULER la nature désastreuse de ses transactions à ses supérieurs de Londres pendant un certain temps*** |
| **Jérôme Kerviel** | *il **AVAIT TRAVAILLÉ au back office** de la Société Générale avant de devenir trader, et **a tiré parti de sa CONNAISSANCE DES SYSTÈMES pour cacher ses positions*** |

### 3.2 Ne pas faire aveuglément confiance aux modèles

> *« Certaines des grosses pertes sont survenues **à cause des modèles et systèmes utilisés** » — le cas **Kidder Peabody**.*

**Les deux signaux d'alarme à connaître :**

| Signal | Ce qu'il doit déclencher |
|---|---|
| ***« Si de GROS profits sont rapportés quand des stratégies RELATIVEMENT SIMPLES sont suivies »*** | *« **il y a de bonnes chances que LES MODÈLES sous-jacents au calcul des profits soient FAUX** »* |
| ***« Si une institution paraît PARTICULIÈREMENT COMPÉTITIVE sur ses cotations pour un type de deal »*** | *« **il y a de bonnes chances qu'elle utilise un MODÈLE DIFFÉRENT des autres participants**, et elle doit analyser soigneusement ce qui se passe »* |

> ⚠️ ***« Pour le responsable d'une salle de marché, RECEVOIR TROP D'AFFAIRES d'un certain type peut être TOUT AUSSI INQUIÉTANT que d'en recevoir trop peu. »***

### 3.3 Être conservateur sur les *inception profits*

<details class="details--riche">
<summary>

**Le marking to model et le danger de reconnaître le profit immédiatement**

</summary>

*« Quand une institution vend **un instrument HAUTEMENT EXOTIQUE** à une entreprise, **la valorisation peut dépendre FORTEMENT du modèle sous-jacent** — par exemple des instruments à **options de taux intégrées à long terme**. »*

> ***Dans ces circonstances, le terme employé pour le marquage quotidien au marché est le MARKING TO MODEL, parce qu'IL N'Y A PAS DE PRIX DE MARCHÉ d'affaires similaires servant de référence.***

**Le problème.** *Supposons qu'une institution parvienne à vendre un instrument à un client **10 millions de plus qu'il ne vaut** — ou du moins **10 millions de plus que ce que dit son MODÈLE**. Ces 10 millions sont **le PROFIT D'ORIGINE (*inception profit*)**. **Quand doit-il être reconnu ?** Il y a **une grande variation entre banques d'investissement** : certaines le reconnaissent **immédiatement**, d'autres **lentement sur la vie du deal**.*

<div class="callout" data-kind="methode">

<span class="callout__lab">« RECONNAÎTRE LES INCEPTION PROFITS IMMÉDIATEMENT EST TRÈS DANGEREUX. CELA ENCOURAGE LES TRADERS À UTILISER DES MODÈLES AGRESSIFS, À PRENDRE LEURS BONUS, ET À PARTIR AVANT QUE LE MODÈLE ET LA VALEUR DU DEAL NE SOIENT EXAMINÉS DE PRÈS. »</span>

***« IL EST BIEN MEILLEUR DE LES RECONNAÎTRE LENTEMENT, de sorte que les traders soient MOTIVÉS à examiner l'impact de PLUSIEURS modèles et PLUSIEURS jeux d'hypothèses AVANT de s'engager. »***

</div>

</details>

### 3.4 Ne pas vendre de produits inadaptés

> *« Il est **tentant** de vendre aux clients des produits inadaptés, **particulièrement quand ils semblent avoir un appétit pour les risques sous-jacents**. **Mais c'est À COURTE VUE.** »*

**Le cas de Bankers Trust (BT), jusqu'au printemps 1994.** *« Beaucoup de clients de BT ont été persuadés d'acheter des produits **à haut risque et TOTALEMENT INADAPTÉS**. Un produit typique — par exemple **le swap 5/30** (fiche 104) — donnait au client **une BONNE CHANCE d'économiser quelques points de base sur ses emprunts et une PETITE chance de lui coûter une SOMME ÉNORME**. »*

> ⚠️ ***« Les produits ont bien fonctionné pour les clients de BT en 1992 et 1993, mais ONT EXPLOSÉ en 1994 quand les taux ont fortement monté. LA MAUVAISE PUBLICITÉ QUI A SUIVI A GRANDEMENT NUI À BT : LES ANNÉES PASSÉES À BÂTIR LA CONFIANCE DE SES CLIENTS ET UNE RÉPUTATION ENVIABLE D'INNOVATION ONT ÉTÉ LARGEMENT PERDUES. »***

### 3.5 Ne pas ignorer le risque de liquidité

<details class="details--riche">
<summary>

**Les trois pratiques normales, et pourquoi elles peuvent tourner mal**

</summary>

*Les ingénieurs financiers fondent habituellement la valorisation d'instruments peu échangés sur les prix d'instruments activement échangés :*

| # | Pratique |
|---|---|
| **1** | calculer une **courbe zéro** à partir des obligations d'État activement échangées (les ***on-the-run***) et l'utiliser pour valoriser celles qui le sont moins (les ***off-the-run***) |
| **2** | **impliquer la volatilité** d'options activement échangées et l'utiliser pour des options moins actives |
| **3** | impliquer l'information sur les taux à partir des **caps et swaptions actifs** et l'utiliser pour des produits **hautement structurés** |

> *« Ces pratiques **ne sont pas déraisonnables**. **Cependant, IL EST DANGEREUX DE SUPPOSER QUE LES INSTRUMENTS MOINS ACTIFS PEUVENT TOUJOURS ÊTRE ÉCHANGÉS PRÈS DE LEUR PRIX THÉORIQUE.** Quand les marchés subissent un choc, il y a souvent **une FUITE VERS LA QUALITÉ. La liquidité devient très importante, et les instruments ILLIQUIDES se vendent souvent avec une GROSSE DÉCOTE par rapport à leurs valeurs théoriques.** »*

**Le cas LTCM.** *Le fonds suivait **l'ARBITRAGE DE CONVERGENCE** : identifier **deux titres qui devraient en théorie se vendre au même prix**, acheter le moins cher et vendre l'autre — sur l'idée que **les prix de marché finiront par converger**.*

⚠️ **Ce qui a mal tourné, en trois temps :**

1. *le **défaut russe** de l'été 1998 a causé **une fuite vers la qualité** ;*
2. ***LTCM était LONG les instruments ILLIQUIDES et COURT les LIQUIDES correspondants** (long les *off-the-run*, court les *on-the-run*) ; **les écarts se sont fortement ÉLARGIS** ;*
3. ***LTCM était FORTEMENT LEVIER : il a subi d'énormes pertes et des APPELS DE MARGE qu'il a eu du mal à satisfaire.***

> *« L'histoire de LTCM **renforce l'importance des scénarios et du stress testing pour regarder ce qui peut arriver dans le PIRE des mondes. LTCM aurait pu examiner d'autres moments de l'histoire où il y a eu des fuites vers la qualité extrêmes, pour QUANTIFIER les risques de liquidité auxquels il faisait face.** »*

</details>

### 3.6 Se méfier des stratégies grégaires

> ⚠️ ***« Il arrive parfois que BEAUCOUP de participants suivent essentiellement LA MÊME stratégie. CELA CRÉE UN ENVIRONNEMENT DANGEREUX où il risque d'y avoir DE GRANDS MOUVEMENTS DE MARCHÉ, DES MARCHÉS INSTABLES, ET DE GROSSES PERTES. »***

<details class="details--riche">
<summary>

**Les trois exemples de Hull**

</summary>

**1 — L'ASSURANCE DE PORTEFEUILLE et le krach d'octobre 1987** *(fiche 90)*. *« Dans les mois précédant le krach, **de plus en plus de gérants tentaient d'assurer leur portefeuille en créant des PUTS SYNTHÉTIQUES : ils ACHETAIENT des actions ou des futures APRÈS UNE HAUSSE et les VENDAIENT APRÈS UNE BAISSE.** **Cela créait un marché INSTABLE : une baisse relativement PETITE pouvait déclencher une VAGUE DE VENTES par les assureurs de portefeuille, ce qui provoquait une NOUVELLE baisse, donc une NOUVELLE vague de ventes, et ainsi de suite.** Il ne fait guère de doute que **sans l'assurance de portefeuille, le krach d'octobre 1987 aurait été BEAUCOUP MOINS SÉVÈRE**. »*

**2 — LTCM en 1998.** *« Sa position a été rendue plus difficile par le fait que **BEAUCOUP D'AUTRES FONDS suivaient des stratégies d'arbitrage de convergence SIMILAIRES**. Après le défaut russe, LTCM a tenté de liquider une partie de son portefeuille pour satisfaire les appels de marge. **Malheureusement, les autres fonds faisaient face à des problèmes SIMILAIRES et essayaient de faire des transactions SIMILAIRES. Cela a EXACERBÉ la situation, rendant les écarts de liquidité ENCORE PLUS ÉLEVÉS et RENFORÇANT la fuite vers la qualité.** »*

**3 — Les assureurs britanniques à la fin des années 1990.** *La chaîne complète, à savoir raconter :*

| Étape | Contenu |
|---|---|
| 1 | *les assureurs avaient promis que **le taux d'une rente à la retraite serait LE PLUS GRAND du taux de marché et d'un taux GARANTI*** |
| 2 | ***à peu près au même moment, TOUS ont décidé de couvrir une partie de ce risque en ACHETANT des swaptions à long terme** aux institutions financières* |
| 3 | ***les institutions financières ont couvert LEUR risque en achetant d'énormes quantités d'obligations sterling à long terme*** |
| 4 | ***les prix d'obligations ont MONTÉ et les taux longs sterling ont BAISSÉ*** |
| 5 | ***il a fallu acheter ENCORE PLUS d'obligations pour maintenir la couverture dynamique, les taux ont baissé ENCORE, et ainsi de suite*** |
| 6 | *les institutions financières **ont perdu de l'argent** et, **parce que les taux longs avaient baissé, les assureurs se sont retrouvés dans une PIRE position sur les risques qu'ils avaient choisi de NE PAS couvrir*** |

> ⚠️ ***« La leçon principale : IL EST IMPORTANT DE VOIR LA GRANDE IMAGE de ce qui se passe sur les marchés et de COMPRENDRE LES RISQUES INHÉRENTS AUX SITUATIONS OÙ BEAUCOUP DE PARTICIPANTS SUIVENT LA MÊME STRATÉGIE. »***

</details>

### 3.7 Le financement court terme, la transparence, les incitations

<details class="details--riche">
<summary>

**Les quatre dernières leçons pour les institutions financières**

</summary>

**A — LE FINANCEMENT COURT TERME CRÉE DES PROBLÈMES DE LIQUIDITÉ.**

*« Les **risques de TAUX** quand une banque finance des actifs longs avec des passifs courts sont **bien compris** et couverts par des swaps. **Les risques de LIQUIDITÉ sont à bien des égards PLUS SÉRIEUX que les risques de taux, mais ont reçu MOINS D'ATTENTION jusqu'à la crise de 2007.** »*

> ⚠️ ***Le problème : « quand le marché (à tort ou à raison) PERD CONFIANCE en une institution, celle-ci trouvera IMPOSSIBLE de ROULER ses passifs ».***

*Le mécanisme normal : *émettre du papier commercial à 1 mois le 1ᵉʳ juillet, le rembourser le 1ᵉʳ août **avec une nouvelle émission**, et ainsi de suite.* **Quand la confiance se perd, aucun nouveau papier ne peut être émis et il y a un problème de liquidité IMMÉDIAT.**

| Cas | Détail |
|---|---|
| **Northern Rock** | *un prêteur hypothécaire britannique, **une des PREMIÈRES victimes** de la crise ; il **finançait ses prêts par du papier commercial COURT TERME**. Quand les investisseurs ont perdu confiance dans l'immobilier, **le papier n'a plus pu être roulé*** |
| **Lehman** | *il finançait aussi **une grande partie de ses besoins LONGS avec du papier COURT** ; quand des inquiétudes sur sa santé sont apparues, **le papier n'a plus pu être roulé, ACCÉLÉRANT sa faillite*** |

> *« Un des résultats de la crise : **les superviseurs d'une banque surveillent désormais SA LIQUIDITÉ autant que son adéquation en capital.** »*

**B — LA TRANSPARENCE DE MARCHÉ EST IMPORTANTE.**

*« Pendant la période menant à 2007, **les investisseurs négociaient des produits hautement structurés SANS AUCUNE CONNAISSANCE RÉELLE des actifs sous-jacents. TOUT CE QU'ILS SAVAIENT ÉTAIT LA NOTATION DE CRÉDIT du titre échangé.** Avec le recul, on peut dire qu'ils **auraient dû exiger PLUS D'INFORMATION** — mais **il est facile d'être sage après coup !** »*

⚠️ *« La débâcle subprime d'août 2007 a fait perdre confiance dans **TOUS** les produits structurés. **Les tranches ne pouvaient plus se vendre qu'à des prix BIEN EN DESSOUS de leurs valeurs théoriques.** **S'il y avait eu de la transparence, IL Y AURAIT QUAND MÊME EU DES PERTES SUBPRIME, MAIS LA FUITE VERS LA QUALITÉ ET LES PERTURBATIONS AURAIENT ÉTÉ MOINS PRONONCÉES.** »*

**C — GÉRER LES INCITATIONS.**

| Problème | Remède |
|---|---|
| *« Les systèmes de bonus des banques tendent à **mettre l'accent sur la performance à COURT TERME** »* | *certaines institutions sont passées à des **bonus fondés sur une fenêtre PLUS LONGUE (par exemple CINQ ANS)**. **Cela DÉCOURAGE les transactions qui paraissent bonnes à court terme mais peuvent EXPLOSER dans quelques années.*** |
| *Dans la titrisation, l'**originateur** peut avoir intérêt à **DÉNATURER** le prêt* | *« aligner les intérêts : **une façon est que les régulateurs EXIGENT de l'originateur qu'il GARDE UNE PART DANS TOUTES LES TRANCHES** créées à partir du portefeuille »* |

**D — NE JAMAIS IGNORER LE RISK MANAGEMENT.**

*« Quand les temps sont bons (**ou PARAISSENT bons**), il y a une tendance à supposer que **rien ne peut mal tourner** et à **ignorer les résultats des stress tests**. Il y a **beaucoup d'histoires de risk managers qu'on n'écoutait pas** avant la crise de 2007. »*

> ⚠️ **La citation de Chuck Prince, PDG de Citigroup, en juillet 2007 — « exactement la MAUVAISE attitude » :**
>
> *« Quand la musique s'arrêtera, en termes de liquidité, les choses seront compliquées. **Mais tant que la musique joue, il faut se lever et danser. Nous dansons encore.** »*
>
> ⚠️ ***« M. Prince a perdu son poste plus tard dans l'année, et les pertes de Citigroup dues à la crise ont dépassé 50 MILLIARDS de dollars. »***

</details>

## 🔴 Concept 4 — Les leçons pour les entreprises non financières

### 4.1 Comprendre pleinement ce que l'on traite

> ***« Les entreprises ne doivent JAMAIS entreprendre une transaction ou une stratégie qu'elles NE COMPRENNENT PAS PLEINEMENT. C'est un point assez évident, mais IL EST SURPRENANT DE VOIR À QUELLE FRÉQUENCE un trader d'entreprise non financière admet, après une grosse perte, N'AVOIR PAS SU CE QUI SE PASSAIT VRAIMENT et prétend avoir été INDUIT EN ERREUR par des banquiers d'affaires. »***

*Les deux exemples : **Robert Citron** d'Orange County l'a fait ; **les traders de Hammersmith and Fulham** aussi, qui « **malgré leurs positions énormes, étaient étonnamment MAL INFORMÉS sur la façon dont les swaps et dérivés de taux qu'ils traitaient FONCTIONNAIENT VRAIMENT** ».*

> ⚠️ **LA RÈGLE PRATIQUE, à retenir mot pour mot.**
>
> ***« Si un DIRIGEANT SENIOR ne comprend pas une transaction proposée par un subordonné, LA TRANSACTION NE DOIT PAS ÊTRE APPROUVÉE. Une règle simple : SI UNE TRANSACTION ET SA JUSTIFICATION SONT SI COMPLIQUÉES QU'ELLES NE PEUVENT PAS ÊTRE COMPRISES PAR LE DIRIGEANT, ELLE EST PRESQUE CERTAINEMENT INAPPROPRIÉE POUR L'ENTREPRISE. »***
>
> ⚠️ ***« Les transactions de Procter & Gamble et de Gibson Greetings auraient été OPPOSÉES en appliquant ce critère. »***

**Le test opérationnel.** *« **Une façon de s'assurer qu'on comprend pleinement un instrument est DE LE VALORISER. Si une entreprise n'a pas la capacité INTERNE de valoriser un instrument, ELLE NE DOIT PAS LE TRAITER.** En pratique, les entreprises s'appuient souvent sur leurs dealers pour l'avis de valorisation. **C'est DANGEREUX, comme P&G et Gibson Greetings l'ont découvert : quand ils ont voulu DÉNOUER leurs deals, ils faisaient face à des prix produits par LES MODÈLES PROPRIÉTAIRES de Bankers Trust, QU'ILS N'AVAIENT AUCUN MOYEN DE VÉRIFIER.** »*

### 4.2 Empêcher le hedger de devenir spéculateur

> ⚠️ ***« Un des faits malheureux de la vie est que LA COUVERTURE EST RELATIVEMENT ENNUYEUSE, alors que LA SPÉCULATION EST EXCITANTE. »***

**La spirale, en cinq temps :**

| Temps | Ce qui se passe |
|---|---|
| **1** | *le trader fait son travail **diligemment** et gagne la confiance de la direction ; il **évalue les expositions et les couvre*** |
| **2** | *avec le temps, **il devient CONVAINCU qu'il peut battre le marché*** |
| **3** | ***lentement, il devient SPÉCULATEUR*** |
| **4** | *d'abord **ça va bien**, puis **une perte est faite*** |
| **5** | ***pour récupérer la perte, il DOUBLE ses paris. De nouvelles pertes sont faites — et ainsi de suite. Le résultat est probablement un DÉSASTRE.*** |

> ⚠️ **Le signal d'alarme organisationnel.** *« La stratégie de trading d'une entreprise doit **commencer par une ANALYSE DES RISQUES auxquels elle fait face**. Une décision doit ensuite être prise sur **comment RÉDUIRE ces risques à des niveaux acceptables**. **C'EST UN SIGNE CLAIR QUE QUELQUE CHOSE NE VA PAS DANS UNE ENTREPRISE SI LA STRATÉGIE DE TRADING N'EST PAS DÉRIVÉE DE FAÇON TRÈS DIRECTE DE SES EXPOSITIONS.** »*

### 4.3 Se méfier de la trésorerie comme centre de profit

> *« Ces vingt dernières années, il y a eu une tendance à **faire du service de trésorerie un CENTRE DE PROFIT. Cela paraît avoir beaucoup à recommander** : le trésorier est motivé à réduire les coûts de financement et à gérer les risques **aussi profitablement que possible**. »*

> ⚠️ **LE PROBLÈME, énoncé en trois points.**
>
> 1. ***« Le POTENTIEL du trésorier de faire des profits est LIMITÉ. En levant des fonds et en plaçant la trésorerie excédentaire, IL FAIT FACE À UN MARCHÉ EFFICIENT. »***
> 2. ***« LE TRÉSORIER NE PEUT HABITUELLEMENT AMÉLIORER LE RÉSULTAT QU'EN PRENANT DES RISQUES SUPPLÉMENTAIRES. »***
> 3. ***« Il faut se rappeler que LE BUT D'UN PROGRAMME DE COUVERTURE EST DE RÉDUIRE LES RISQUES, PAS D'AUGMENTER LES PROFITS ESPÉRÉS. Comme signalé au chapitre 3, LA DÉCISION DE SE COUVRIR CONDUIRA À UN RÉSULTAT PIRE QUE LA DÉCISION DE NE PAS SE COUVRIR ENVIRON 50 % DU TEMPS. »***

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Leçon à mobiliser |
|---|---|
| Un trader a dépassé sa limite **en faisant un profit** | **pénaliser quand même** — sinon culture de laxisme |
| Un trader a gagné $n$ trimestres d'affilée | calculer $0{,}5^n$ × le nombre de traders |
| « faut-il concentrer sur le meilleur trader ? » | l'exemple des **20 titres** : $30\,\%\to14{,}7\,\%$ |
| Le mandat était l'**arbitrage** mais les positions sont directionnelles | **Barings / SocGen** : l'arbitragiste devenu spéculateur |
| Le même employé contrôle exécution **et** enregistrement | **séparer front / middle / back** |
| Profits élevés sur une stratégie **simple** | **le modèle est probablement FAUX** |
| L'institution est **trop compétitive** sur un produit | **son modèle diffère des autres** |
| « produit exotique sans prix de marché » | ***marking to model*** et **inception profits** — reconnaître **lentement** |
| Un client a « une bonne chance de gagner peu, une petite de perdre beaucoup » | **produit inadapté** — le cas **Bankers Trust** |
| Position longue **illiquide** contre courte **liquide** | **risque de liquidité** — le cas **LTCM** |
| Beaucoup d'acteurs font la même chose | **stratégies grégaires** : assurance de portefeuille, LTCM, assureurs britanniques |
| Actifs longs financés par du papier **court** | **Northern Rock et Lehman** |
| Bonus annuels | passer à une **fenêtre de cinq ans** |
| Le dirigeant ne comprend pas la transaction | **NE PAS APPROUVER** |
| L'entreprise s'appuie sur son dealer pour valoriser | **elle ne doit PAS traiter le produit** |
| La stratégie de trading ne découle pas des expositions | **signe clair que quelque chose ne va pas** |

## Comment résoudre ce type d'exercice

**A — Évaluer un dispositif de contrôle des risques.**

1. Vérifier que **les limites globales sont fixées AU NIVEAU DU CONSEIL**, puis déclinées par individu.
2. Vérifier que les **rapports quotidiens** existent **et sont confrontés aux gains/pertes RÉELS**.
3. Vérifier la **séparation des trois offices**.
4. Vérifier que **les violations sont sanctionnées MÊME en cas de profit**.
5. Vérifier que **la stratégie découle des expositions** — sinon, alerte.

**B — Juger une performance de trading.**

1. Compter les périodes gagnantes $n$ et le nombre de traders $N$.
2. Calculer $N\times0{,}5^n$ : **le nombre attendu par pur hasard**.
3. Si le résultat observé n'excède pas ce nombre, **ne PAS augmenter les limites**.
4. Comparer le gain de concentration au **coût en diversification** perdue.

**C — Évaluer un risque de liquidité.**

1. Identifier les positions **longues en illiquide** et **courtes en liquide**.
2. Simuler **un élargissement brutal des écarts** de liquidité.
3. Vérifier l'effet des **appels de marge** compte tenu du **levier**.
4. Vérifier si **d'autres acteurs suivent la même stratégie** — cela **amplifie** tout.
5. Vérifier la structure de **financement** : actifs longs / passifs courts ?

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Conclure que les dérivés sont mauvais | le marché est *« remarquablement RÉUSSI »* ; les accidents sont **une proportion minuscule** |
| Ignorer un dépassement de limite qui a rapporté | **pénaliser autant qu'une perte** |
| Interpréter quatre trimestres gagnants comme du talent | **1 chance sur 16** par pur hasard |
| Concentrer sur un « bon » trader | la diversification **double le rendement par unité de risque** |
| Se contenter de la VaR | **toujours** l'accompagner de **scénarios et stress tests** |
| S'ancrer sur un ou deux scénarios | **P&G et Gibson** ont ignoré une hausse de 100 pb |
| Épargner l'examen aux traders vedettes | **Joseph Jett était « trop occupé »** |
| Laisser un trader accéder au back office | **Leeson et Kerviel** |
| Se réjouir de gros profits sur une stratégie simple | **le modèle est probablement faux** |
| Se réjouir d'un flux d'affaires anormalement élevé | *« tout aussi inquiétant que trop peu »* |
| Reconnaître un *inception profit* immédiatement | cela **encourage les modèles agressifs** |
| Vendre à un client ce qu'il « veut » | le cas **Bankers Trust** : réputation détruite |
| Supposer qu'un actif illiquide se vend à sa valeur théorique | **grosse décote** en fuite vers la qualité |
| Croire que l'arbitrage de convergence est sans risque | **LTCM** : levier + écarts qui s'élargissent |
| Ignorer ce que font les autres acteurs | **assurance de portefeuille 1987**, LTCM, assureurs britanniques |
| Ne surveiller que l'adéquation en capital | **la LIQUIDITÉ aussi**, depuis la crise |
| Se fier à la notation d'un produit structuré | il faut **la transparence sur les actifs sous-jacents** |
| Approuver une transaction qu'on ne comprend pas | **elle est presque certainement inappropriée** |
| Faire valoriser par son propre dealer | **P&G ne pouvait pas vérifier les prix de BT** |
| Attendre d'un programme de couverture qu'il rapporte | il **réduit le risque** ; il donnera un **pire résultat 50 % du temps** |

## 📌 Ultimate Review

| Élément | Leçon / fait |
|---|---|
| **Le fait remarquable** | tant de pertes venues d'**UN SEUL employé** |
| **Barings, 1995** | **Nick Leeson**, Nikkei 225, près de **1 milliard**, banque de **200 ans** détruite |
| **Orange County, 1994** | **Robert Citron**, ≈ **2 milliards**, pari que les taux **ne monteraient pas** |
| **Kidder Peabody** | **Joseph Jett**, **350 millions**, **erreur du SYSTÈME INFORMATIQUE** |
| **Allied Irish, 2002** | **John Rusnak**, ≈ **700 millions**, **options FICTIVES** |
| **Amaranth, 2006** | **6 milliards** sur le **gaz naturel** |
| **Société Générale, 2008** | **Jérôme Kerviel**, plus de **7 milliards** |
| **LTCM, 1998** | ≈ **4 milliards** ; **14 banques** ont liquidé le fonds |
| **Metallgesellschaft** | **1,3 milliard** ; futures courts roulés contre contrats longs |
| **Sumitomo** | ≈ **2 milliards** sur le **CUIVRE** |
| **Hammersmith and Fulham** | **600 millions** ; contrats déclarés **NULS** par les tribunaux |
| **Où fixer les limites** | **au niveau du CONSEIL** |
| **Ce que les rapports doivent faire** | être **confrontés aux gains et pertes RÉELS** |
| **Le danger propre aux dérivés** | on ne sait pas si le hedger est devenu **spéculateur** |
| **Les deux cas d'école** | **Leeson** et **Kerviel**, tous deux mandatés pour l'**arbitrage** |
| **Violation avec profit** | **pénaliser AUTANT** que si c'était une perte |
| **Pourquoi** | sinon les perdants **doublent leurs paris** |
| **Un bon trader** | a raison **60 %** du temps |
| **16 traders** | $0{,}5^4=1/16$ : **un aura 4 trimestres gagnants par HASARD** |
| **La conclusion** | bonus **oui**, augmentation des limites **NON** |
| **20 titres, $\sigma=30\,\%$, $\rho=0{,}2$** | $\sigma_P=\mathbf{14{,}7\,\%}$ |
| **Les deux lectures** | risque **réduit de plus de moitié** · rendement par unité de risque **DOUBLÉ** |
| **La VaR seule** | **insuffisante** — scénarios et **stress tests** |
| **Le biais humain** | **s'ANCRER sur un ou deux scénarios** |
| **Générer des scénarios** | **10 à 20 ans** de données, les **plus extrêmes**, + le **jugement** |
| **Manque de données** | utiliser une **variable SIMILAIRE** comme proxy |
| **Front office** | les **TRADERS** |
| **Middle office** | les **RISK MANAGERS** |
| **Back office** | l'**ENREGISTREMENT et la COMPTABILITÉ** |
| **Leeson** | contrôlait **front ET back** |
| **Kerviel** | **connaissait les systèmes** du back office |
| **Signal 1 sur les modèles** | gros profits sur stratégie **simple** |
| **Signal 2** | cotations **trop compétitives** |
| **La formule de Hull** | *trop d'affaires est aussi inquiétant que trop peu* |
| **Marking to model** | quand il **n'y a AUCUN prix de marché** de référence |
| **Inception profit** | reconnaître **LENTEMENT**, pas immédiatement |
| **Pourquoi** | sinon **modèles agressifs, bonus, départ** |
| **Bankers Trust** | produits **inadaptés** ; réputation **largement perdue** |
| **Le profil du produit** | **bonne chance de gagner PEU**, petite chance de perdre **BEAUCOUP** |
| **On-the-run / off-the-run** | actives / **moins actives** |
| **Le danger** | l'illiquide se vend avec **grosse DÉCOTE** en crise |
| **LTCM : la stratégie** | l'**arbitrage de CONVERGENCE** |
| **Sa position** | **long l'illiquide, court le liquide** |
| **Le déclencheur** | le **défaut RUSSE** et la fuite vers la qualité |
| **L'aggravant** | un **fort LEVIER** et des **appels de marge** |
| **Krach de 1987** | l'**assurance de portefeuille** : vendre après une baisse → **spirale** |
| **Assureurs britanniques** | swaptions → obligations → taux baissent → **encore plus d'obligations** |
| **La leçon commune** | **voir la GRANDE IMAGE** |
| **Northern Rock et Lehman** | actifs **longs** financés par papier **court** |
| **Ce que surveillent désormais les superviseurs** | **la LIQUIDITÉ autant que le capital** |
| **Transparence** | les investisseurs ne connaissaient **que la NOTATION** |
| **Incitations** | bonus sur **CINQ ANS** ; l'originateur **garde une part** |
| **Chuck Prince, juillet 2007** | *« tant que la musique joue, il faut danser »* — **pertes de plus de 50 milliards** |
| **La règle du dirigeant** | **ne pas comprendre = ne pas approuver** |
| **Le test opérationnel** | **savoir le VALORISER soi-même** |
| **Le cas P&G** | prix produits par les **modèles PROPRIÉTAIRES** de BT, **invérifiables** |
| **La spirale du hedger** | diligent → convaincu → spéculateur → perte → **doubler** |
| **Le signal organisationnel** | la stratégie **ne découle pas** des expositions |
| **Trésorerie centre de profit** | **marché EFFICIENT** : on n'améliore qu'en **prenant plus de risque** |
| **Le but d'une couverture** | **réduire le RISQUE**, pas augmenter les profits |
| **Le fait à accepter** | se couvrir donne un **pire résultat 50 % du temps** |
| **La leçon clé du chapitre** | **l'importance des CONTRÔLES INTERNES** |

## 🧠 Active Recall

1. Qu'est-ce qui est « remarquable » dans les listes de pertes de Hull ?
2. Pourquoi ces pertes ne condamnent-elles pas l'industrie ? Citer Greenspan.
3. Citer cinq institutions financières, leur perte et sa cause.
4. Comment Rusnak a-t-il masqué ses pertes ?
5. Quelle était l'origine de la perte de Kidder Peabody ?
6. Comment la Fed a-t-elle traité le cas LTCM ?
7. Citer cinq entreprises non financières et leur perte.
8. Qu'est-il arrivé aux contrats de Hammersmith and Fulham ?
9. Qu'a fait Metallgesellschaft, et pourquoi a-t-elle perdu ?
10. À quel niveau les limites de risque globales doivent-elles être fixées ?
11. Que doivent contenir les rapports quotidiens, et à quoi les confronter ?
12. Pourquoi la surveillance est-elle plus critique avec des dérivés ?
13. Quel était le mandat de Leeson et de Kerviel ? Qu'ont-ils fait ?
14. L'argument de Hull est-il qu'aucun risque ne doit être pris ?
15. Que faire si un trader dépasse ses limites et fait un profit ? Pourquoi ?
16. Raconter le cas Orange County comme illustration.
17. Quelle est la conséquence de ne pas sanctionner les pertes ?
18. Quel taux de réussite caractérise un bon trader ?
19. Refaire le calcul des 16 traders. Que conclut-on sur le bonus ? sur les limites ?
20. Recalculer l'écart-type du portefeuille de 20 titres.
21. Donner les deux façons d'exprimer le bénéfice de la diversification.
22. Que doit toujours accompagner un calcul de VaR ?
23. Quel biais humain Hull souligne-t-il ? Quel exemple donne-t-il ?
24. Citer trois recommandations pour générer des scénarios.
25. Que faire quand il manque des données sur une variable clé ?
26. Comment les traders vedettes sont-ils traités dans les salles de marché ?
27. Que faisait Joseph Jett quand les risk managers l'interrogeaient ?
28. Que faut-il vérifier sur les gros profits ?
29. Définir front, middle et back office.
30. Comment Leeson et Kerviel ont-ils chacun exploité un défaut de séparation ?
31. Citer les deux signaux d'alarme sur les modèles.
32. Quelle formule Hull emploie-t-il sur le flux d'affaires ?
33. Qu'est-ce que le *marking to model* ? Quand s'applique-t-il ?
34. Qu'est-ce qu'un *inception profit* ? Quand faut-il le reconnaître ?
35. Pourquoi la reconnaissance immédiate est-elle dangereuse ?
36. Décrire le profil des produits vendus par Bankers Trust.
37. Qu'est-il advenu de BT après 1994 ?
38. Citer les trois pratiques normales de valorisation par proxy.
39. Pourquoi sont-elles dangereuses en cas de choc ?
40. Décrire l'arbitrage de convergence de LTCM.
41. Détailler les trois temps de sa perte.
42. Quelle leçon LTCM renforce-t-il ?
43. Raconter le mécanisme de l'assurance de portefeuille en 1987.
44. Comment les autres fonds ont-ils aggravé le cas LTCM ?
45. Raconter la chaîne complète des assureurs britanniques.
46. Quelle est la leçon commune de ces trois exemples ?
47. Pourquoi le risque de liquidité du financement court est-il plus sérieux que le risque de taux ?
48. Décrire le mécanisme normal de roulement de papier commercial.
49. Raconter les cas Northern Rock et Lehman.
50. Que surveillent désormais les superviseurs bancaires ?
51. Que savaient les investisseurs des produits structurés avant 2007 ?
52. Qu'aurait changé la transparence ?
53. Quel est le défaut des bonus annuels, et le remède ?
54. Comment aligner les intérêts dans une titrisation ?
55. Citer la phrase de Chuck Prince et son dénouement.
56. Quelle règle simple s'applique quand un dirigeant ne comprend pas une transaction ?
57. Quelles transactions auraient été bloquées par ce critère ?
58. Quel est le test opérationnel de la compréhension d'un instrument ?
59. Pourquoi s'appuyer sur son dealer est-il dangereux ?
60. Décrire les cinq temps de la spirale du hedger devenu spéculateur.
61. Quel est le signe clair que quelque chose ne va pas dans une entreprise ?
62. Quels sont les trois problèmes de la trésorerie comme centre de profit ?
63. Quel est le but d'un programme de couverture ?
64. Combien de fois une couverture donne-t-elle un pire résultat ?
65. Quelle est la leçon clé du chapitre entier ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le fait remarquable des listes ? | Tant de pertes venues d'**UN SEUL employé** |
| Les dérivés sont-ils condamnés ? | **NON** — le marché est *« remarquablement réussi »* |
| Ce que dit Greenspan (2003) ? | Les dérivés **sous-tendent la RÉSILIENCE** des intermédiaires |
| Barings : qui, quoi, combien ? | **Leeson**, Nikkei 225, **près de 1 milliard** |
| Âge de Barings ? | **200 ans** |
| Orange County : qui ? | **Robert Citron**, trésorier |
| Son pari ? | Que les taux **NE MONTERAIENT PAS** |
| Sa perte ? | ≈ **2 milliards** |
| Kidder Peabody : la cause ? | Une **erreur du SYSTÈME INFORMATIQUE** |
| Allied Irish : la dissimulation ? | Des **options FICTIVES** |
| Amaranth : sur quoi ? | Le **GAZ NATUREL**, 6 milliards |
| Société Générale : combien ? | Plus de **7 milliards** |
| LTCM : la cause ? | Le **défaut RUSSE** et la fuite vers la qualité |
| Comment a-t-il été liquidé ? | **14 banques** organisées par la **Fed de NY** |
| Allied Lyons : quoi ? | **VENTE de calls** sur dollar-sterling |
| Hammersmith and Fulham : le dénouement ? | Contrats déclarés **NULS** par les tribunaux |
| Metallgesellschaft : la stratégie ? | Contrats longs couverts par **futures courts roulés** |
| Sumitomo : quel métal ? | Le **CUIVRE** |
| Shell : quoi ? | Trading **NON AUTORISÉ** de futures de change |
| Où fixer les limites globales ? | Au niveau du **CONSEIL** |
| À quoi confronter les rapports ? | Aux gains et pertes **RÉELS** |
| Pourquoi ? | Vérifier que la **valorisation est exacte** |
| Trois usages des dérivés ? | **Couverture, spéculation, arbitrage** |
| Le danger sans surveillance ? | Ne pas savoir si le rôle a **CHANGÉ** |
| Mandat de Leeson et Kerviel ? | **Arbitrage à FAIBLE risque** |
| L'argument est-il « zéro risque » ? | **NON** — limiter les **TAILLES** |
| Dépassement avec profit ? | **Pénaliser autant** |
| Pourquoi ? | Sinon les perdants **doublent leurs paris** |
| Le cas d'école ? | **Orange County**, profitable 1991-93 |
| Un bon trader a raison ? | **60 %** du temps |
| Un palmarès remarquable est ? | Probablement de la **CHANCE** |
| 16 traders, 4 trimestres gagnants ? | $0{,}5^4=\mathbf{1/16}$ |
| Faut-il donner le bonus ? | **Inévitablement oui** |
| Faut-il augmenter les limites ? | **NON** |
| 20 titres, $\sigma=30\,\%$, $\rho=0{,}2$ ? | $\sigma_P=\mathbf{14{,}7\,\%}$ |
| Réduction du risque ? | **Plus de MOITIÉ** |
| Effet sur le rendement par unité de risque ? | Il est **DOUBLÉ** (0,333 → 0,680) |
| Que doit accompagner la VaR ? | **Scénarios et STRESS TESTS** |
| Le biais humain ? | **S'ANCRER** sur un ou deux scénarios |
| L'exemple ? | **P&G et Gibson** ignorant +100 pb |
| Comment générer des scénarios ? | **10-20 ans** de données, les **extrêmes**, + jugement |
| Si les données manquent ? | Une **variable SIMILAIRE** comme proxy |
| Les traders vedettes sont vus comme ? | **« INTOUCHABLES »** |
| Joseph Jett était ? | Souvent **« TROP OCCUPÉ »** |
| Front office ? | Les **TRADERS** |
| Middle office ? | Les **RISK MANAGERS** |
| Back office ? | **Registres et comptabilité** |
| Leeson contrôlait ? | **Front ET back** |
| L'avantage de Kerviel ? | Il **avait travaillé au back office** |
| Signal d'alarme 1 sur les modèles ? | Gros profits, stratégie **SIMPLE** |
| Signal 2 ? | Cotations **trop compétitives** |
| La formule de Hull ? | Trop d'affaires est **aussi inquiétant** que trop peu |
| Marking to model ? | Marquage quotidien **sans prix de marché** de référence |
| Inception profit ? | Le profit **à la conclusion** du deal |
| Quand le reconnaître ? | **LENTEMENT**, sur la vie du deal |
| Pourquoi pas immédiatement ? | Modèles **agressifs**, bonus, **départ** |
| Profil des produits de BT ? | Gagner **peu** souvent, perdre **beaucoup** rarement |
| Le résultat pour BT ? | Réputation **largement perdue** |
| On-the-run ? | Les obligations **activement** échangées |
| Off-the-run ? | Celles qui le sont **moins** |
| Le danger en crise ? | L'illiquide se vend avec **GROSSE DÉCOTE** |
| Stratégie de LTCM ? | L'**arbitrage de CONVERGENCE** |
| Sa position ? | **Long l'illiquide, court le liquide** |
| L'aggravant ? | Un **fort LEVIER** et les **appels de marge** |
| Assurance de portefeuille : le mécanisme ? | Acheter **après une hausse**, vendre **après une baisse** |
| Son effet en 1987 ? | Une **spirale de ventes** |
| Sans elle ? | Le krach aurait été **bien moins sévère** |
| L'aggravant de LTCM ? | Les autres fonds faisaient **la même chose** |
| Assureurs britanniques : ce qu'ils ont promis ? | Le **MAX** du taux de marché et d'un taux garanti |
| Ce qu'ils ont tous acheté ? | Des **swaptions longues** |
| Ce que les banques ont acheté ? | D'énormes quantités d'**obligations sterling longues** |
| L'effet ? | Taux longs **baissent** → il faut en acheter **encore plus** |
| La leçon commune ? | **Voir la GRANDE IMAGE** |
| Risque de taux ou de liquidité ? | La **LIQUIDITÉ** est plus sérieuse |
| Le mécanisme du papier commercial ? | Émettre, **rembourser par une NOUVELLE émission** |
| Quand la confiance se perd ? | **Impossible de rouler** — crise immédiate |
| Northern Rock ? | Prêts hypothécaires financés par du **papier court** |
| Lehman ? | Même chose ; cela a **ACCÉLÉRÉ** sa faillite |
| Ce que surveillent les superviseurs désormais ? | La **LIQUIDITÉ** autant que le capital |
| Ce que savaient les investisseurs avant 2007 ? | Seulement **la NOTATION** |
| Ce qu'aurait changé la transparence ? | Moins de **fuite vers la qualité** et de perturbations |
| Défaut des bonus annuels ? | Ils privilégient le **court terme** |
| Le remède ? | Une fenêtre de **CINQ ANS** |
| Aligner les intérêts en titrisation ? | L'originateur **garde une part de toutes les tranches** |
| La citation de Chuck Prince ? | *« Tant que la musique joue, il faut danser »* |
| Sa date ? | **Juillet 2007** |
| Son dénouement ? | Poste perdu ; pertes de Citigroup **&gt; 50 milliards** |
| Si un dirigeant ne comprend pas ? | **NE PAS APPROUVER** |
| Qui aurait été bloqué par ce critère ? | **Procter & Gamble** et **Gibson Greetings** |
| Le test de compréhension ? | **Savoir le VALORISER** |
| Si l'entreprise ne le peut pas ? | Elle **ne doit PAS le traiter** |
| Le danger de se fier au dealer ? | Prix issus de **modèles propriétaires INVÉRIFIABLES** |
| Couverture contre spéculation ? | L'une est **ENNUYEUSE**, l'autre **EXCITANTE** |
| Les cinq temps de la spirale ? | Diligent · convaincu · spéculateur · perte · **doubler** |
| Le signe clair d'un problème ? | La stratégie **ne découle pas des expositions** |
| Trésorerie centre de profit : le problème ? | Le potentiel de profit est **LIMITÉ** |
| Pourquoi ? | Elle fait face à un **marché EFFICIENT** |
| Comment améliore-t-elle le résultat ? | En prenant **PLUS DE RISQUE** |
| Le but d'une couverture ? | **Réduire le RISQUE** |
| Combien de fois donne-t-elle un pire résultat ? | **Environ 50 %** du temps |
| La leçon clé du chapitre ? | L'importance des **CONTRÔLES INTERNES** |
