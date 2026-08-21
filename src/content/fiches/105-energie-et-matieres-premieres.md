# Fiche 105 — Dérivés d'énergie et de matières premières, dérivés climatiques et d'assurance

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Matières premières |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 33 « Energy and Commodity Derivatives » |
| **Difficulté** | High — des sous-jacents qui obéissent à d'autres lois |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Fiches 78 (forwards et rendement d'opportunité), 89 (modèle de Black), 98 (sauts), 102 (arbres trinomiaux) |
| **Concepts clés** | Ratio *stocks-to-use*, retour à la moyenne des matières premières, saisonnalité, pétrole brut (Brent et WTI), gaz naturel, électricité et sa non-stockabilité, contrats $5\times8$ / $5\times16$ / $7\times24$, *swing option*, processus simple et processus à retour à la moyenne, arbre trinomial de matières premières, désaisonnalisation, sauts, modèle de Gibson-Schwartz, HDD et CDD, dérivés climatiques, réassurance et *excess cost layers*, obligation CAT, absence de risque systématique, couverture prix et volume |
| **Poids à l'examen** | $F(t)=E[S(t)]$ **dans le monde risque-neutre** · $d\ln S=[\theta(t)-a\ln S]dt+\sigma dz$ · la construction de l'arbre par **égalisation à $F(t)$** · $\text{HDD}=\max(0,65-A)$ · la **valorisation par données historiques**. |

## 🎯 Vue d'ensemble

```
TROIS FAMILLES DE MATIÈRES PREMIÈRES
  AGRICOLES   ratio STOCKS-TO-USE (20-40 %) · SAISONNALITÉ · météo → SAUTS
              retour à la moyenne : prix bas → moins de production → prix remonte
  MÉTAUX      ni météo ni saison · INVESTISSEMENT (or, argent) contre CONSOMMATION (cuivre)
              ⚠️ PAS de retour à la moyenne pour les actifs d'INVESTISSEMENT (arbitrage !)
  ÉNERGIE     pétrole · gaz · ÉLECTRICITÉ (NON STOCKABLE → sauts de +1 000 %)

MODÉLISER   ⚠️ LE POINT DE DÉPART : dans le monde risque-neutre, F(t) = E[S(t)]
  simple            dS/S = μ(t) dt + σ dz          μ(t) = ∂[ln F(t)]/∂t
  retour moyenne    d ln S = [θ(t) − a ln S] dt + σ dz     → ARBRE TRINOMIAL
       même procédure qu'au ch. 30 : arbre pour X, puis DÉPLACER pour que E[S] = F
  + SAISONNALITÉ (désaisonnaliser, interpoler, resaisonnaliser)   + SAUTS (Poisson)

CLIMAT ET ASSURANCE   ⚠️ AUCUN RISQUE SYSTÉMATIQUE
  ⇒ estimation par DONNÉES HISTORIQUES = estimation RISQUE-NEUTRE
  ⇒ valoriser = espérance historique du payoff, ACTUALISÉE AU TAUX SANS RISQUE
  HDD = max(0, 65 − A)    CDD = max(0, A − 65)    A = (max + min)/2, en Fahrenheit

COUVERTURE D'UN PRODUCTEUR   Y = a + bP + cT + ε
   prix → −b en dérivés d'ÉNERGIE     volume → −c en dérivés CLIMATIQUES
```

**Le cadrage d'ouverture.** *Une caractéristique des prix de matières premières est qu'ils présentent **souvent un RETOUR À LA MOYENNE** (comme les taux d'intérêt) et sont **parfois sujets à des SAUTS**. **Certains des modèles développés pour les taux peuvent être adaptés aux matières premières.***

> ⚠️ *« Un trait distinctif des dérivés climatiques et d'assurance est qu'**ils dépendent de variables SANS RISQUE SYSTÉMATIQUE**. Par exemple, on peut raisonnablement supposer que **l'espérance de la température en un lieu donné, ou des pertes dues aux ouragans, est LA MÊME dans un monde risque-neutre et dans le monde réel**. **Cela signifie que LES DONNÉES HISTORIQUES sont potentiellement PLUS UTILES pour valoriser ces dérivés que pour d'autres.** »*

## 🟡 Concept 1 — Les trois familles de matières premières

### 1.1 Les produits agricoles

**Le ratio *stocks-to-use*.** *Le département de l'Agriculture des États-Unis publie des rapports sur les stocks et la production. **Une statistique surveillée pour le maïs et le blé est le ratio STOCKS-TO-USE : le rapport de l'INVENTAIRE DE FIN D'ANNÉE à la CONSOMMATION de l'année. Typiquement entre 20 % et 40 %.***

> ⚠️ ***« Quand le ratio d'une matière première DIMINUE, son prix devient PLUS SENSIBLE aux variations d'offre, DONC LA VOLATILITÉ AUGMENTE. »***

**Le retour à la moyenne, par le comportement des agriculteurs.** *« Quand les prix **baissent**, les agriculteurs trouvent **moins attractif** de produire, l'offre **diminue**, ce qui crée une **pression à la HAUSSE**. Quand le prix **monte**, ils y consacrent **plus de ressources**, ce qui crée une pression à la **BAISSE**. »*

| Caractéristique | Détail |
|---|---|
| **Saisonnalité** | *le stockage est **coûteux** et il y a **une limite à la durée** de conservation* |
| **Rôle de la météo** | *les **gelées** peuvent décimer la récolte de café brésilien ; **un ouragan en Floride** a un gros effet sur le jus d'orange congelé* |
| **Profil de volatilité** | ***la volatilité est la PLUS ÉLEVÉE AVANT LA RÉCOLTE, puis DÉCLINE quand la taille de la récolte est connue*** |
| **Sauts** | *pendant la saison de croissance, le processus **est susceptible de présenter des SAUTS à cause de la météo*** |
| **Bétail** | *le prix du bétail — **et le moment de l'abattage** — dépend du prix des céréales qui le nourrissent, elles-mêmes influencées par la météo* |

### 1.2 Les métaux

|  | **Agricoles** | **Métaux** |
|---|---|---|
| Météo | déterminante | **aucun effet** |
| Saisonnalité | forte | **aucune** |
| Origine | cultivés | **extraits du sol** |
| Stockage | limité et coûteux | **divisibles et relativement FACILES à stocker** |

**Consommation ou investissement.** *Certains, comme **le cuivre**, sont **utilisés presque entièrement dans la fabrication** et sont des **actifs de CONSOMMATION**. D'autres, comme **l'or et l'argent**, sont détenus **purement pour l'investissement autant que pour la consommation** : ce sont des **actifs d'INVESTISSEMENT** (fiche 78, §5.1).*

> ⚠️ **LE POINT LOGIQUE À RETENIR.** *« Les métaux qui sont des **actifs d'INVESTISSEMENT** ne sont **habituellement PAS supposés suivre un processus à retour à la moyenne**, ***PARCE QU'UN TEL PROCESSUS DONNERAIT LIEU À UNE OPPORTUNITÉ D'ARBITRAGE POUR L'INVESTISSEUR***. Pour ceux qui sont des actifs de **CONSOMMATION**, il peut y avoir un certain retour à la moyenne. »*

*Le mécanisme, côté consommation : « Quand le prix **monte**, il devient **moins attractif** d'utiliser le métal dans certains procédés et **plus viable économiquement de l'extraire de lieux difficiles** : pression à la **baisse**. Et réciproquement. »*

**Les autres déterminants.** *Court terme : les **niveaux d'inventaire** et la **volatilité du CHANGE** (le pays d'extraction diffère souvent de celui dont la devise cote le prix). Long terme : **les tendances d'utilisation**, **les nouvelles sources trouvées**, les **méthodes d'exploration et d'extraction**, la **géopolitique**, les **cartels** et la **réglementation environnementale**.* *Une source potentielle d'offre est **le RECYCLAGE** : un métal utilisé pour un produit peut, **sur les 20 années suivantes, revenir sur le marché à hauteur de 10 %**.*

### 1.3 Les produits énergétiques

**Le retour à la moyenne, valable pour les trois.** *« Quand le prix d'une source d'énergie **monte**, elle est **moins consommée et plus produite** : pression à la **baisse**. Quand il **baisse**, elle est **plus consommée**, mais **la production devient moins viable** : pression à la **hausse**. »*

<details class="details--riche">
<summary>

**Pétrole brut, gaz naturel, électricité — les trois marchés en détail**

</summary>

**LE PÉTROLE BRUT.**

| Fait | Détail |
|---|---|
| Taille | ***le plus GRAND marché de matières premières du monde***, demande mondiale d'environ **80 millions de barils par jour** |
| Contrats de gré à gré | ***des contrats d'approvisionnement à prix fixe sur 10 ANS sont courants depuis des années*** — ce sont des **swaps** où du pétrole à prix fixe est échangé contre du pétrole à prix variable |
| Grades | *de nombreux, reflétant la **densité** et la **teneur en soufre*** |
| Deux références de prix | **Brent** (mer du Nord) et **West Texas Intermediate (WTI)** |
| Raffinage | essence, fioul domestique, fioul lourd, kérosène |
| Contrats cotés | **CME Group** et **IntercontinentalExchange (ICE)**. *Le Brent d'ICE a une **option de règlement en espèces** ; le **light sweet crude** du CME exige la **livraison physique**. **Dans les deux cas, 1 000 barils par contrat.*** Deux produits raffinés au CME : **fioul domestique** et **essence**, **42 000 gallons par contrat** |

**LE GAZ NATUREL.**

*L'industrie a traversé **une déréglementation et l'élimination des monopoles d'État dans les années 1980 et 1990**. **Le fournisseur n'est plus nécessairement le producteur** ; les fournisseurs doivent **satisfaire la demande QUOTIDIENNE**.*

| Élément | Détail |
|---|---|
| Contrat de gré à gré type | livraison d'une quantité spécifiée **à un rythme à peu près uniforme sur un MOIS** |
| Responsabilité | *le **VENDEUR** est habituellement responsable d'**acheminer le gaz par pipelines** jusqu'au lieu spécifié* |
| Contrat CME | **10 000 millions de BTU** ; livraison physique **à un rythme uniforme pendant le mois de livraison, à un hub particulier en LOUISIANE** |
| Demande | *le gaz sert au **chauffage** et à **produire de l'électricité** (donc à la **climatisation**) : la demande est **SAISONNIÈRE et dépendante de la météo*** |

**L'ÉLECTRICITÉ.**

> ⚠️ ***« L'électricité est une matière première INHABITUELLE PARCE QU'ELLE NE PEUT PAS ÊTRE FACILEMENT STOCKÉE. »***
>
> *(Le plus proche du stockage : **les producteurs à capacité excédentaire pompent parfois de l'eau au sommet de leurs centrales hydroélectriques**.)*

| Élément | Détail |
|---|---|
| Offre maximale | déterminée par **la capacité maximale de toutes les centrales de la région** |
| Organisation américaine | **140 zones de contrôle** ; offre et demande **d'abord équilibrées DANS une zone**, **l'excédent vendu aux autres — c'est CET EXCÉDENT qui constitue le marché de gros** |
| Contrainte | *la capacité de vendre dépend de la **capacité de TRANSMISSION** des lignes ; la transmission implique un **coût facturé par le propriétaire** et **des pertes*** |
| Saisonnalité | *un usage majeur est la **CLIMATISATION** : la demande et le prix sont **bien plus élevés en été qu'en hiver*** |
| Sauts | ***« La non-stockabilité cause d'occasionnels TRÈS GRANDS mouvements du prix spot. DES VAGUES DE CHALEUR ONT FAIT MONTER LE PRIX SPOT DE JUSQU'À 1 000 % pendant de courtes périodes. »*** |

**Les contrats d'électricité.** *Un contrat type permet de recevoir **un nombre spécifié de mégawattheures pour un prix spécifié à un lieu spécifié pendant un mois donné** :*

| Contrat | Ce qu'il couvre |
|---|---|
| $\mathbf{5\times8}$ | **5 jours par semaine** (lundi-vendredi), pendant la période **CREUSE : 23 h à 7 h** |
| $\mathbf{5\times16}$ | 5 jours par semaine, pendant la période **DE POINTE : 7 h à 23 h** |
| $\mathbf{7\times24}$ | **24 heures sur 24, 7 jours sur 7** |

**La *swing option* (ou *take-and-pay option*).** *« Un contrat intéressant en électricité et en gaz. **Un MINIMUM et un MAXIMUM de la quantité qui doit être achetée à un certain prix sont spécifiés POUR CHAQUE JOUR du mois ET POUR LE MOIS AU TOTAL. Le détenteur peut CHANGER (ou "faire osciller") le rythme d'achat pendant le mois, mais il y a habituellement UNE LIMITE AU NOMBRE TOTAL DE CHANGEMENTS possibles.** »*

</details>

## 🔴 Concept 2 — Modéliser les prix de matières premières

### 2.1 Le point de départ

> ⚠️ ***« Pour valoriser des dérivés, on veut souvent modéliser LE PRIX SPOT dans le monde risque-neutre TRADITIONNEL. Par le §17.7 (fiche 89), LE PRIX FUTUR ESPÉRÉ DANS CE MONDE EST LE PRIX FUTURES. »***

**Le processus simple** — croissance espérée dépendant **seulement du temps**, volatilité **constante** :

$$\boxed{\frac{dS}{S}=\mu(t)\,dt+\sigma\,dz}\qquad\text{et}\qquad\boxed{F(t)=\hat E[S(t)]=S(0)\,e^{\int_0^t\mu(\tau)d\tau}}\;\text{(33.1)}$$

d'où, en différenciant $\ln F(t)=\ln S(0)+\int_0^t\mu(\tau)d\tau$ :

$$\boxed{\mu(t)=\frac{\partial}{\partial t}\big[\ln F(t)\big]}$$

> **La lecture :** ***la courbe des prix FUTURES DÉTERMINE ENTIÈREMENT le drift risque-neutre.***

<details class="details--riche">
<summary>

**Exemples 33.1 et 33.2 — du bétail sur pied**

</summary>

**Exemple 33.1.** *Prix futures du **bétail sur pied** fin juillet 2008 (cents par livre) :*

| Échéance | août 08 | oct. 08 | déc. 08 | févr. 09 | avr. 09 | juin 09 |
|---|---|---|---|---|---|---|
| **Prix** | 62,20 | **60,60** | **62,70** | 63,37 | 64,42 | **64,40** |

*La croissance espérée en monde risque-neutre **entre octobre et décembre 2008** :*

$$\ln\frac{62{,}70}{60{,}60}=\mathbf{0{,}034}$$

*soit **3,4 % par 2 mois** en composition continue, c'est-à-dire **20,4 % par an**.*

**Exemple 33.2 — une décision d'investissement.**

**Données.** Une décision d'élevage exige **100 000 dollars maintenant** et **20 000 à 3, 6 et 9 mois**. Le résultat : **du bétail supplémentaire disponible à la vente en fin d'année**. Deux incertitudes : **le nombre de livres** (espérance **300 000**) et **le prix par livre**. Taux sans risque **10 %**.

*Étape 1 — le prix espéré.* *Le prix espéré du bétail dans 1 an **en monde risque-neutre** est, par l'exemple 33.1, **le prix futures : 64,40 cents par livre**.*

*Étape 2 — la valeur (en milliers de dollars) :*

$$-100-20e^{-0{,}1\times0{,}25}-20e^{-0{,}1\times0{,}50}-20e^{-0{,}1\times0{,}75}+300\times0{,}644\,e^{-0{,}1\times1}=\boxed{\mathbf{17{,}729}}$$

⚠️ **Les deux hypothèses à énoncer :** *« Cela suppose que **toute incertitude sur la quantité supplémentaire disponible a un RISQUE SYSTÉMATIQUE NUL** et qu'**il n'y a AUCUNE CORRÉLATION entre la quantité disponible et le prix**. »*

</details>

### 2.2 Le processus à retour à la moyenne

$$\boxed{d\ln S=\big[\theta(t)-a\ln S\big]dt+\sigma\,dz}\;\text{(33.2)}$$

> ⚠️ ***« Cela incorpore le retour à la moyenne et est ANALOGUE au processus lognormal supposé pour le taux court au chapitre 30 »*** *(fiche 102, Black-Karasinski).*

**L'écriture alternative.** *Ce processus s'écrit parfois $\dfrac{dS}{S}=[\Theta(t)-a\ln S]dt+\sigma\,dz$. **Par le lemme d'Itô, c'est équivalent à (33.2) quand $\Theta(t)=\theta(t)+\frac12\sigma^2$.***

<details class="details--riche">
<summary>

**La construction de l'arbre trinomial — l'exemple complet à trois pas**

</summary>

**Les données.** Prix spot courant **20 dollars** ; prix futures à **1, 2 et 3 ans** : **22, 23, 24**. $a=0{,}1$, $\sigma=0{,}2$.

*Étape 1 — l'arbre pour $X$*, variable initialement nulle suivant

$$dX=-aX\,dt+\sigma\,dz\;\text{(33.3)}$$

**Exactement la procédure du §30.7** (fiche 102) : $\Delta X=\sigma\sqrt{3\Delta t}=0{,}2\sqrt3=\mathbf{0{,}3464}$, $j_{\max}=\lceil0{,}184/0{,}1\rceil=\mathbf{2}$.

| Nœud | $j$ | $X$ | $p_u$ | $p_m$ | $p_d$ |
|---|---|---|---|---|---|
| E, J | $+2$ | **0,6928** | 0,8867 | 0,0266 | 0,0867 |
| B, F, K | $+1$ | 0,3464 | 0,1217 | 0,6566 | 0,2217 |
| A, C, G, L | 0 | 0,0000 | 0,1667 | 0,6666 | 0,1667 |
| D, H, M | $-1$ | $-0{,}3464$ | 0,2217 | 0,6566 | 0,1217 |
| I, N | $-2$ | $\mathbf{-0{,}6928}$ | 0,0867 | 0,0266 | 0,8867 |

*Étape 2 — le déplacement.* *$\ln S$ suit le même processus que $X$ **à un drift dépendant du temps près**. On convertit l'arbre de $X$ en arbre de $\ln S$ **en DÉPLAÇANT les nœuds**.* Le nœud initial correspond à **20**, donc son déplacement est $\ln20$.

*Étape 3 — déterminer $\alpha_1$.* Les $X$ à 1 an valent $+0{,}3464$, $0$, $-0{,}3464$, donc les $S$ valent $e^{0{,}3464+\alpha_1}$, $e^{\alpha_1}$, $e^{-0{,}3464+\alpha_1}$. **On exige que l'espérance de $S$ égale le prix FUTURES :**

$$0{,}1667e^{0{,}3464+\alpha_1}+0{,}6666e^{\alpha_1}+0{,}1667e^{-0{,}3464+\alpha_1}=22$$

$$\Longrightarrow\quad\boxed{\alpha_1=\mathbf{3{,}071}}\quad\Longrightarrow\quad S=\mathbf{30{,}49\ \cdot\ 21{,}56\ \cdot\ 15{,}25}$$

*Étape 4 — les probabilités à 2 ans, par induction avant.* La probabilité d'atteindre **F** est celle d'atteindre **B** fois celle d'aller de B à F, **plus** celle d'atteindre **C** fois celle d'aller de C à F :

$$P(F)=0{,}1667\times0{,}6566+0{,}6666\times0{,}1667=\mathbf{0{,}2206}$$

| Nœud | E | F | G | H | I |
|---|---|---|---|---|---|
| **Probabilité** | 0,0203 | **0,2206** | **0,5183** | 0,2206 | 0,0203 |

*Étape 5 — déterminer $\alpha_2$ :*

$$0{,}0203e^{0{,}6928+\alpha_2}+0{,}2206e^{0{,}3464+\alpha_2}+0{,}5183e^{\alpha_2}+0{,}2206e^{-0{,}3464+\alpha_2}+0{,}0203e^{-0{,}6928+\alpha_2}=23$$

$$\Longrightarrow\quad\boxed{\alpha_2=\mathbf{3{,}099}}\quad\Longrightarrow\quad S=\mathbf{44{,}35\ \cdot\ 31{,}37\ \cdot\ 22{,}18\ \cdot\ 15{,}69\ \cdot\ 11{,}10}$$

*Étape 6 — même calcul à 3 ans* : $S=\mathbf{45{,}68\ \cdot\ 32{,}30\ \cdot\ 22{,}85\ \cdot\ 16{,}16\ \cdot\ 11{,}43}$.

> **La différence avec le chapitre 30 :** *on égalise à **$F(t)$** au lieu d'égaliser au prix d'une obligation zéro-coupon — mais **la mécanique de l'induction avant est IDENTIQUE**.*

</details>

<details class="details--riche">
<summary>

**Exemple 33.3 — un put américain sur le prix spot**

</summary>

**Données.** Put **américain à 3 ans** sur le prix spot, strike **20**, taux **3 %** (continu). On remonte l'arbre de la figure 33.2 de la manière habituelle.

**Les valeurs obtenues :**

| Date | Nœuds et valeurs |
|---|---|
| **3 ans** | J $=0$ · K $=0$ · L $=0$ · M $=3{,}84$ · N $=8{,}57$ |
| **2 ans** | E $=0$ · F $=0$ · G $=\mathbf{0{,}62}$ · H $=\mathbf{4{,}31}$ · I $=\mathbf{8{,}90}$ |
| **1 an** | B $=\mathbf{0{,}13}$ · C $=\mathbf{1{,}10}$ · D $=\mathbf{4{,}75}$ |
| **0** | A $=\boxed{\mathbf{1{,}48}}$ |

> ⚠️ ***L'option est EXERCÉE PAR ANTICIPATION aux nœuds D, H et I*** — les trois nœuds les plus bas, où la valeur intrinsèque dépasse la valeur de continuation.

⚠️ **Note de vérification.** Une remontée à pleine précision depuis le même arbre reproduit **exactement** toutes les valeurs intermédiaires (0,62 · 4,31 · 8,91 ; 0,13 · 1,10 · 4,75) mais donne **1,50** au nœud initial :

$$(0{,}1667\times0{,}1337+0{,}6666\times1{,}0995+0{,}1667\times4{,}7492)\,e^{-0{,}03}=\mathbf{1{,}501}$$

⚠️ La valeur **1,48** imprimée dans le manuel est donc légèrement décalée ; l'écart est sans importance pratique, mais il faut le savoir avant de « corriger » son propre calcul.

*« Pour obtenir une valeur plus précise, **on utiliserait un arbre avec beaucoup plus de pas. Les prix futures seraient INTERPOLÉS pour obtenir des prix correspondant à la fin de chaque pas de cet arbre plus détaillé.** »*

</details>

### 2.3 Interpolation et saisonnalité

> *« Quand un grand nombre de pas est utilisé, **il faut INTERPOLER entre les prix futures**. **Quand il y a de la saisonnalité, la procédure d'interpolation doit la refléter.** »*

<details class="details--riche">
<summary>

**La désaisonnalisation, en cinq étapes**

</summary>

**Estimer les facteurs saisonniers.** *« Une façon simple : collecter les **données mensuelles historiques du prix spot** et calculer **la moyenne mobile sur 12 mois**. **Un FACTEUR SAISONNIER EN POURCENTAGE s'estime comme la MOYENNE DU RAPPORT du prix spot du mois à la moyenne mobile 12 mois CENTRÉE (approximativement) sur ce mois.** »*

**La procédure :**

| Étape | Contenu |
|---|---|
| **1** | **DÉSAISONNALISER** les prix futures connus, en les divisant par leur facteur |
| **2** | **INTERPOLER** les prix futures désaisonnalisés mensuels |
| **3** | **RESAISONNALISER** en multipliant par les facteurs |
| **4** | **Construire l'arbre** sur ces prix |

**L'exemple chiffré.** *Prix futures observés : **septembre 40** et **décembre 44**. Facteurs saisonniers : sept. **0,95**, oct. **0,85**, nov. **0,8**, déc. **1,1**.*

| Mois | Prix observé | Désaisonnalisé | Interpolé | Resaisonnalisé |
|---|---|---|---|---|
| Septembre | 40 | $40/0{,}95=\mathbf{42{,}1}$ | — | 40 |
| Octobre | — | — | **41,4** | $41{,}4\times0{,}85=\mathbf{35{,}19}$ |
| Novembre | — | — | **40,7** | $40{,}7\times0{,}8=\mathbf{32{,}56}$ |
| Décembre | 44 | $44/1{,}1=\mathbf{40{,}0}$ | — | 44 |

**La saisonnalité de la VOLATILITÉ.** *« La volatilité montre parfois aussi de la saisonnalité : **les prix de certains produits agricoles sont plus volatils PENDANT LA SAISON DE CROISSANCE à cause de l'incertitude météo**. La volatilité se surveille par les méthodes du chapitre 22 (fiche 94) et **un facteur saisonnier en pourcentage peut être estimé. Le paramètre $\sigma$ peut alors être remplacé par $\sigma(t)$ dans (33.2) et (33.3).** »*

</details>

### 2.4 Les sauts et les modèles plus fins

**Les sauts.** *« Certaines matières premières, comme **l'électricité et le gaz naturel**, présentent des sauts à cause de **CHOCS DE DEMANDE liés à la météo**. D'autres, **notamment les agricoles**, en présentent à cause de **CHOCS D'OFFRE liés à la météo**. »*

$$\boxed{d\ln S=\big[\theta(t)-a\ln S\big]dt+\sigma\,dz+dp}$$

où $dp$ est **le processus de Poisson générant les sauts en pourcentage** — **c'est le modèle mixte saut-diffusion de Merton** (fiche 98, §26.1).

> **La procédure de calibration.** *« Une fois la **fréquence** et la **loi de taille** des sauts choisies, **l'augmentation MOYENNE du prix due aux sauts** à un instant $t$ se calcule. Pour déterminer $\theta(t)$, **on utilise la méthode de l'arbre trinomial AVEC LES PRIX FUTURES DE MATURITÉ $t$ RÉDUITS DE CETTE AUGMENTATION.** »* Monte-Carlo sert ensuite à implémenter le modèle.

<details class="details--riche">
<summary>

**Les modèles plus sophistiqués : Gibson-Schwartz et Eydeland-Geman**

</summary>

**Gibson et Schwartz (1990) — le rendement d'opportunité STOCHASTIQUE.** *Si $y$ est le rendement d'opportunité (*convenience yield*), **le drift proportionnel du prix spot est $r-y$**, d'où le processus naturel :*

$$\boxed{\frac{dS}{S}=(r-y)\,dt+\sigma_1\,dz_1}$$

*Gibson et Schwartz suggèrent de modéliser $y$ **comme un processus à retour à la moyenne** :*

$$\boxed{dy=k(\alpha-y)\,dt+\sigma_2\,dz_2}$$

*où $dz_2$ est **corrélé** à $dz_1$. **Pour fournir un ajustement EXACT aux prix futures, $\alpha$ peut être rendue fonction du temps.***

**Eydeland et Geman (1998) — la volatilité STOCHASTIQUE pour le gaz et l'électricité :**

$$\boxed{\frac{dS}{S}=a(b-\ln S)\,dt+\sqrt V\,dz_1}\qquad\boxed{dV=c(d-V)\,dt+e\sqrt V\,dz_2}$$

*avec $dz_1$ et $dz_2$ **corrélés**. **Geman a ensuite proposé un modèle pour le pétrole où LE NIVEAU DE RETOUR $b$ est LUI AUSSI STOCHASTIQUE.***

</details>

## 🔴 Concept 3 — Les dérivés climatiques

### 3.1 HDD et CDD

*Les premiers dérivés climatiques de gré à gré ont été introduits en **1997**.*

$$\boxed{\text{HDD}=\max(0,\ 65-A)}\qquad\boxed{\text{CDD}=\max(0,\ A-65)}$$

où $A$ est **la MOYENNE des températures MAXIMALE et MINIMALE du jour** à une station météo spécifiée, **mesurée en degrés FAHRENHEIT**.

| Terme | Signification |
|---|---|
| **HDD** | ***heating degree days*** — *une mesure du **volume d'énergie requis pour le CHAUFFAGE** ce jour-là* |
| **CDD** | ***cooling degree days*** — *le volume requis pour le **REFROIDISSEMENT*** |

**L'exemple de Hull.** *Si la température maximale du jour (minuit à minuit) est **68 °F** et la minimale **44 °F**, alors $A=\mathbf{56}$, donc $\text{HDD}=\mathbf{9}$ et $\text{CDD}=\mathbf{0}$.*

> ⚠️ **La lecture profonde :** ***HDD et CDD peuvent être vus comme les PAYOFFS D'OPTIONS SUR LA TEMPÉRATURE***, de strike commun **65 °F**.

<details class="details--riche">
<summary>

**Les contrats de gré à gré et cotés**

</summary>

**Le produit type de gré à gré.** *Un forward ou une option dont le payoff dépend du **HDD ou CDD CUMULÉ pendant un MOIS**.*

**L'exemple.** *Un dealer vend en **janvier 2011** un call sur le **HDD cumulé de février 2012** à la station de **Chicago O'Hare**, strike **700**, taux de paiement **10 000 dollars par degré-jour**. Si le HDD cumulé réalisé est **820** :*

$$\text{payoff}=(820-700)\times10\,000=\mathbf{1{,}2\ \text{million de dollars}}$$

⚠️ **Le plafond.** *Les contrats incluent souvent **un PLAFOND de paiement**. Si le plafond est **1,5 million**, **le contrat équivaut à un BULL SPREAD** (fiche 84) : le client a **un call LONG de strike 700** et **un call COURT de strike 850**.*

**Les utilisateurs.** *La plupart des contrats sont conclus par des **producteurs et consommateurs d'énergie**. Mais aussi : **détaillants, chaînes de supermarchés, fabricants d'aliments et de boissons, entreprises de services de santé, entreprises agricoles, et entreprises du secteur des LOISIRS**.* *(La **Weather Risk Management Association** sert les intérêts du secteur.)*

**Les contrats cotés.** *En **septembre 1999**, le **CME** a commencé à négocier des futures climatiques et des options européennes sur ces futures. **Les contrats portent sur le HDD et le CDD cumulés d'un mois à une station météo, réglés en ESPÈCES juste après la fin du mois.** **Un contrat futures porte sur 20 dollars fois le HDD ou CDD cumulé du mois.** Le CME offre désormais des futures et options sur **42 villes dans le monde**, ainsi que sur **les ouragans, le gel et les chutes de neige**.*

*(Le département de l'Énergie américain a estimé qu'**un septième de l'économie américaine est soumis au risque climatique**.)*

</details>

### 3.2 Les dérivés d'assurance

*« Quand des dérivés servent à **se couvrir**, ils ont **beaucoup des mêmes caractéristiques que les contrats d'assurance**. **Il n'est pas surprenant que de nombreuses compagnies d'assurance aient des filiales qui négocient des dérivés, et que beaucoup de leurs activités deviennent très similaires à celles des banques d'investissement.** »*

<details class="details--riche">
<summary>

**La réassurance, les excess cost layers, et les obligations CAT**

</summary>

**La réassurance traditionnelle.** *L'industrie couvre traditionnellement son exposition aux risques **catastrophiques (CAT)** — ouragans, tremblements de terre — par la **RÉASSURANCE**.*

**L'exemple.** *Un assureur a une exposition de **100 millions** aux séismes en Californie et veut la limiter à **30 millions**.*

| Option | Mécanisme | Coût |
|---|---|---|
| **1 — au prorata** | contrats annuels couvrant **70 % de l'exposition au prorata**. *Si les sinistres totalisent **50 millions**, le coût pour l'assureur n'est que de **15 millions*** | prime plus élevée |
| **2 — *excess cost layers*** | **une SÉRIE de contrats couvrant des TRANCHES** : la première indemnise les pertes **entre 30 et 40 millions**, la suivante **entre 40 et 50**, etc. | **primes PLUS BASSES**, ce qui la rend **plus populaire** |

*(La réassurance est aussi parfois offerte **sous forme d'une somme forfaitaire si un niveau de perte est atteint** : le réassureur écrit alors **une option binaire CASH-OR-NOTHING CALL sur les pertes**.)*

**Les fournisseurs traditionnels** : *les **compagnies de réassurance** et les **syndicats du Lloyds** (des syndicats **à responsabilité ILLIMITÉE** de particuliers fortunés).*

**Le tournant.** *« L'industrie a conclu que **ses besoins de réassurance avaient DÉPASSÉ ce que ces sources traditionnelles peuvent fournir**. **Un des événements déclencheurs a été L'OURAGAN ANDREW EN 1992, qui a causé environ 15 MILLIARDS de dollars de coûts d'assurance en Floride — CE QUI DÉPASSAIT LE TOTAL DES PRIMES REÇUES EN FLORIDE PENDANT LES SEPT ANNÉES PRÉCÉDENTES. Si Andrew avait frappé MIAMI, on estime que les pertes assurées auraient dépassé 40 MILLIARDS. »***

**L'obligation CAT.** *« Le produit le plus populaire est **l'OBLIGATION CAT** : une obligation émise par **une filiale d'un assureur**, qui **paie un taux d'intérêt SUPÉRIEUR à la normale**. **En échange de cet intérêt supplémentaire, le porteur accepte de fournir un contrat de RÉASSURANCE EN EXCÉDENT DE PERTE. Selon les termes, L'INTÉRÊT OU LE PRINCIPAL (OU LES DEUX) peuvent servir à régler les sinistres.** »*

**L'application à l'exemple.** *Pour se protéger des pertes **entre 30 et 40 millions**, l'assureur peut **émettre des obligations CAT d'un principal total de 10 millions**. **Si ses pertes dépassent 30 millions, les porteurs perdent tout ou partie de leur principal.***

</details>

### 3.3 La valorisation par données historiques

> ⚠️ **LE PRINCIPE CENTRAL DE LA SECTION.**
>
> ***« Un trait distinctif des dérivés climatiques et d'assurance est qu'IL N'Y A AUCUN RISQUE SYSTÉMATIQUE (c'est-à-dire de risque valorisé par le marché) dans leurs payoffs. CELA SIGNIFIE QUE LES ESTIMATIONS FAITES SUR DONNÉES HISTORIQUES (estimations du MONDE RÉEL) PEUVENT AUSSI ÊTRE SUPPOSÉES S'APPLIQUER AU MONDE RISQUE-NEUTRE. »***

$$\boxed{\begin{array}{l}\textbf{1. Utiliser les données HISTORIQUES pour estimer le payoff ESPÉRÉ}\\[3pt]\textbf{2. ACTUALISER ce payoff espéré au TAUX SANS RISQUE}\end{array}}$$

**Le second trait distinctif : la croissance de l'incertitude.**

| Sous-jacent | Croissance de l'incertitude avec le temps |
|---|---|
| **Cours d'action** | *à peu près **la racine carrée du temps** : l'incertitude à 4 ans est environ **le double** de celle à 1 an* |
| **Matière première** | *le **retour à la moyenne** intervient, mais l'incertitude à 4 ans reste **considérablement plus grande** qu'à 1 an* |
| **Climat** | ***« la croissance est BEAUCOUP MOINS MARQUÉE : notre incertitude sur le HDD de février dans 4 ANS n'est habituellement QU'UN PEU PLUS GRANDE que celle sur le HDD de février dans 1 AN »*** |
| **Assurance** | *idem : les pertes sismiques d'une période commençant dans 4 ans* |

<details class="details--riche">
<summary>

**Exemple 33.4 — valoriser un call sur HDD, avec trois raffinements**

</summary>

**Données.** Call sur le **HDD cumulé de février 2013** à Chicago O'Hare, strike **700**, taux **10 000 dollars par degré-jour**. Le HDD est estimé **lognormal** de **moyenne 710** et d'**écart-type du logarithme 0,07**. Taux sans risque **3 %**, valorisation en **février 2012** (**1 an** avant maturité).

*Étape 1 — les deux quantiles* (par l'annexe du chapitre 14) :

$$d_1=\frac{\ln(710/700)+0{,}07^2/2}{0{,}07}=\mathbf{0{,}2376}\qquad d_2=d_1-0{,}07=\mathbf{0{,}1676}$$

*Étape 2 — le payoff espéré :*

$$10\,000\big[710\,N(0{,}2376)-700\,N(0{,}1676)\big]=\boxed{\mathbf{250\,900\ \text{dollars}}}$$

*Étape 3 — actualiser :*

$$250\,900\times e^{-0{,}03\times1}=\boxed{\mathbf{243\,400\ \text{dollars}}}$$

**Raffinement 1 — la TENDANCE.** *« On pourrait vouloir ajuster la loi pour les tendances de température. **Supposons qu'une régression linéaire montre que le HDD cumulé de février DÉCROÎT au rythme de 0,5 par an (peut-être à cause du RÉCHAUFFEMENT CLIMATIQUE)**, de sorte que l'estimation de la moyenne pour février 2013 n'est que **697**. »*

|  | Payoff espéré | Valeur |
|---|---|---|
| Moyenne **710** | 250 900 | **243 400** |
| Moyenne **697** | **180 400** | **175 100** |

> ⚠️ **Une baisse de moyenne de moins de 2 % réduit la valeur de l'option de PLUS DE 28 %** — l'option est très proche de la monnaie, donc très sensible.

**Raffinement 2 — les PRÉVISIONS.** *« Si les prévisionnistes à long terme jugent probable que février 2013 sera **particulièrement DOUX**, l'estimation du HDD espéré serait **réduite encore davantage**, rendant l'option **encore moins précieuse**. »*

**Raffinement 3 — la validation empirique du principe.** *« Litzenberger et al. ont montré qu'il n'y a (comme on s'y attendrait) **AUCUNE corrélation statistiquement significative entre les rendements des obligations CAT et ceux du marché actions**. **Cela CONFIRME qu'il n'y a pas de risque systématique et que les valorisations peuvent reposer sur les DONNÉES ACTUARIELLES collectées par les assureurs.** »*

**Pourquoi les investisseurs achètent des CAT bonds.** *« Elles donnent **une forte probabilité d'un taux au-dessus de la normale et une faible probabilité d'une grosse perte**. Pourquoi les investisseurs s'y intéressent-ils ? **La réponse : le rendement ESPÉRÉ (perte comprise) est PLUS ÉLEVÉ que celui d'un placement sans risque. MAIS LE RISQUE PEUT (au moins en théorie) ÊTRE COMPLÈTEMENT DIVERSIFIÉ dans un grand portefeuille. LES CAT BONDS ONT DONC LE POTENTIEL D'AMÉLIORER LES ARBITRAGES RISQUE-RENDEMENT.** »*

</details>

## 🟠 Concept 4 — Comment un producteur d'énergie se couvre

> ***« Il y a DEUX composantes au risque d'un producteur d'énergie : LE RISQUE DE PRIX (le prix de marché de l'énergie) et LE RISQUE DE VOLUME (la quantité qui sera achetée). »***
>
> ⚠️ *« Bien que les prix s'ajustent pour refléter les volumes, **la relation entre les deux est LOIN D'ÊTRE PARFAITE**, et les producteurs doivent tenir compte **des DEUX** en développant une stratégie de couverture. »*

| Risque | Instrument de couverture |
|---|---|
| **Risque de PRIX** | les **dérivés d'ÉNERGIE** |
| **Risque de VOLUME** | les **dérivés CLIMATIQUES** |

**La méthode par régression.** Avec $Y$ le profit du mois, $P$ le prix moyen de l'énergie et $T$ la variable de température pertinente (HDD ou CDD) :

$$\boxed{Y=a+bP+cT+\varepsilon}$$

> ⚠️ ***« Le producteur peut alors couvrir ses risques pour le mois en prenant une position de $-b$ en FORWARDS OU FUTURES D'ÉNERGIE et une position de $-c$ en FORWARDS OU FUTURES CLIMATIQUES. »***
>
> *« La relation peut aussi servir à **analyser l'efficacité de stratégies d'options alternatives**. »*

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| Prix futures donnés, croissance espérée demandée | $\mu=\dfrac{\partial\ln F(t)}{\partial t}$ — c'est **une différence de logarithmes** |
| Décision d'investissement sur une matière première | le prix espéré risque-neutre **EST le prix futures** |
| « $a$ et $\sigma$ », prix futures multiples | **arbre trinomial** avec égalisation à $F(t)$ |
| Option **américaine** sur le spot | remonter l'arbre, **tester l'exercice à chaque nœud** |
| Prix futures manquants entre deux dates | **désaisonnaliser → interpoler → resaisonnaliser** |
| « sauts liés à la météo » | ajouter $dp$ de Poisson ; **réduire les futures de la hausse moyenne due aux sauts** |
| « rendement d'opportunité stochastique » | **Gibson-Schwartz** |
| Températures max et min données | $A=(\max+\min)/2$, puis $\max(0,65-A)$ ou $\max(0,A-65)$ |
| Contrat HDD avec plafond | c'est un **BULL SPREAD** |
| « obligation CAT », « pertes sismiques » | **aucun risque systématique** → données **historiques** |
| Loi lognormale du HDD donnée | formule type Black sur l'espérance, puis **actualiser** |
| « couvrir prix ET volume » | la régression $Y=a+bP+cT+\varepsilon$, positions $-b$ et $-c$ |

## Comment résoudre ce type d'exercice

**A — Construire un arbre de matière première.**

1. Construire l'arbre de $X$ : $\Delta X=\sigma\sqrt{3\Delta t}$, $j_{\max}=\lceil0{,}184/(a\Delta t)\rceil$, probabilités du §30.7.
2. Calculer les probabilités **cumulées** de chaque nœud par **induction avant**.
3. À chaque date $i$, résoudre $\sum_jP_{i,j}e^{\alpha_i+j\Delta X}=F(t_i)$, soit $$\alpha_i=\ln\frac{F(t_i)}{\sum_jP_{i,j}e^{j\Delta X}}$$
4. En déduire $S_{i,j}=e^{\alpha_i+j\Delta X}$.
5. Contrôle : l'espérance des $S$ à chaque date doit **reproduire exactement** le prix futures.

**B — Valoriser un dérivé climatique.**

1. Collecter les données historiques (typiquement **50 ans**) du HDD/CDD cumulé.
2. Ajuster une loi (lognormale ou autre) ; **corriger les TENDANCES** par régression.
3. Calculer le payoff **espéré** dans cette loi.
4. **Actualiser au taux SANS RISQUE** — pas de prime de risque.
5. Raffiner par les **prévisions météo à long terme** si disponibles.

**C — Couvrir un producteur d'énergie.**

1. Collecter l'historique de $Y$, $P$ et $T$ par mois.
2. Régresser $Y$ sur $P$ et $T$.
3. Prendre $-b$ en futures d'**énergie** et $-c$ en futures **climatiques**.
4. Contrôle : le $R^2$ de la régression mesure la part de risque couvrable.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Supposer un retour à la moyenne pour l'or | **arbitrage** : les métaux d'**investissement** n'en ont pas |
| Croire que la volatilité agricole est constante | **maximale avant la récolte**, décline ensuite |
| Croire que l'électricité se stocke | **non** — d'où des sauts de **+1 000 %** |
| Utiliser le prix spot comme espérance | **le prix FUTURES est l'espérance risque-neutre** |
| Interpoler les prix futures bruts en présence de saisonnalité | **désaisonnaliser d'abord** |
| Oublier de réduire les futures quand on ajoute des sauts | sinon **le drift est compté deux fois** |
| Calculer $A$ à partir de la température moyenne du jour | c'est la **moyenne du MAX et du MIN** |
| Utiliser des degrés Celsius | **le seuil de 65 est en FAHRENHEIT** |
| Oublier le plafond d'un contrat HDD | c'est un **bull spread**, pas un call simple |
| Actualiser un dérivé climatique à un taux ajusté du risque | **taux SANS RISQUE** — aucun risque systématique |
| Utiliser des probabilités risque-neutres pour un CAT bond | les données **actuarielles/réelles** suffisent |
| Croire l'incertitude climatique croissante comme $\sqrt t$ | elle croît **beaucoup moins** |
| Négliger la tendance dans les données de HDD | ici $-0{,}5$ par an réduit la valeur de **28 %** |
| Ne couvrir que le prix | il reste le **risque de VOLUME**, couvert par le **climat** |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Ratio *stocks-to-use*** | inventaire de fin d'année / consommation ; typiquement **20-40 %** |
| **Son effet** | ratio **bas** → volatilité **haute** |
| **Retour à la moyenne agricole** | prix bas → moins de production → **prix remonte** |
| **Volatilité agricole** | maximale **AVANT la récolte** |
| **Métaux : météo et saison** | **aucun effet** |
| **Or et argent** | actifs d'**INVESTISSEMENT** |
| **Cuivre** | actif de **CONSOMMATION** |
| **Retour à la moyenne des métaux d'investissement** | **AUCUN** — sinon **arbitrage** |
| **Le recyclage** | ≈ **10 %** revient sur 20 ans |
| **Marché du pétrole** | **le plus grand** ; **80 millions de barils/jour** |
| **Les deux références** | **Brent** et **WTI** |
| **Contrat pétrole** | **1 000 barils** ; produits raffinés **42 000 gallons** |
| **Contrat gaz CME** | **10 000 millions de BTU**, livraison en **Louisiane** |
| **Électricité** | **NON STOCKABLE** |
| **Zones de contrôle américaines** | **140** |
| **Effet d'une vague de chaleur** | jusqu'à **+1 000 %** |
| **Contrat $5\times8$** | 5 jours, période **creuse (23 h-7 h)** |
| **Contrat $5\times16$** | 5 jours, période **de pointe (7 h-23 h)** |
| **Contrat $7\times24$** | **en continu** |
| ***Swing option*** | min et max **par jour ET pour le mois** ; limite au **nombre de changements** |
| **Le point de départ de la modélisation** | $F(t)=\hat E[S(t)]$ |
| **Processus simple** | $dS/S=\mu(t)dt+\sigma dz$ |
| **Le drift** | $\mu(t)=\partial[\ln F(t)]/\partial t$ |
| **Exemple 33.1** | $\ln(62{,}70/60{,}60)=0{,}034$ → **20,4 % par an** |
| **Exemple 33.2** | valeur **17,729 milliers de dollars** |
| **Ses deux hypothèses** | risque systématique **nul** sur la quantité · **aucune corrélation** quantité-prix |
| **Processus à retour à la moyenne** | $d\ln S=[\theta(t)-a\ln S]dt+\sigma dz$ |
| **L'analogue de taux** | **Black-Karasinski** |
| **La conversion** | $\Theta(t)=\theta(t)+\frac12\sigma^2$ |
| **L'arbre : étape 1** | arbre pour $X$, $\Delta X=\sigma\sqrt{3\Delta t}$ |
| **Étape 2** | **déplacer** pour que $E[S]=F$ |
| **L'exemple** | $\Delta X=0{,}3464$, $j_{\max}=2$ |
| **$\alpha_1$** | **3,071** → $S=30{,}49\cdot21{,}56\cdot15{,}25$ |
| **$\alpha_2$** | **3,099** → $S=44{,}35\cdot31{,}37\cdot22{,}18\cdot15{,}69\cdot11{,}10$ |
| **Probabilité du nœud F** | $0{,}1667\times0{,}6566+0{,}6666\times0{,}1667=\mathbf{0{,}2206}$ |
| **Exemple 33.3** | put américain **1,48** ; exercé tôt en **D, H, I** |
| **Saisonnalité** | **désaisonnaliser → interpoler → resaisonnaliser** |
| **Le facteur saisonnier** | rapport du prix du mois à la **moyenne mobile 12 mois centrée** |
| **L'exemple** | sept. $40/0{,}95=42{,}1$ ; déc. $44/1{,}1=40$ ; interpolés **41,4** et **40,7** |
| **Saisonnalité de la volatilité** | remplacer $\sigma$ par $\sigma(t)$ |
| **Les sauts** | $+dp$ de **Poisson** ; réduire les futures de la hausse due aux sauts |
| **Gibson-Schwartz** | drift $r-y$, avec $y$ **à retour à la moyenne** |
| **Eydeland-Geman** | volatilité **stochastique** pour gaz et électricité |
| **HDD** | $\max(0,65-A)$ |
| **CDD** | $\max(0,A-65)$ |
| **Que vaut $A$** | la **moyenne du max et du min**, en **Fahrenheit** |
| **L'exemple** | max 68, min 44 → $A=56$, HDD $=\mathbf9$ |
| **Premiers contrats** | **1997** de gré à gré ; **CME en septembre 1999** |
| **Contrat futures CME** | **20 dollars** × HDD ou CDD cumulé |
| **Nombre de villes** | **42** |
| **Contrat avec plafond** | un **BULL SPREAD** |
| **Excess cost layers** | des **tranches** de perte, primes **plus basses** |
| **Réassurance forfaitaire** | une option **cash-or-nothing call** |
| **Hurricane Andrew (1992)** | **15 milliards** ; **plus que 7 ans de primes** en Floride |
| **Si Andrew avait frappé Miami** | plus de **40 milliards** |
| **Obligation CAT** | intérêt **supérieur à la normale** contre **réassurance en excédent de perte** |
| **Ce qui peut être perdu** | **l'intérêt, le principal, ou les deux** |
| **Le trait distinctif** | **AUCUN RISQUE SYSTÉMATIQUE** |
| **La conséquence** | données **historiques** = données **risque-neutres** |
| **La procédure** | espérance historique du payoff, **actualisée au taux SANS RISQUE** |
| **La croissance de l'incertitude** | action $\sqrt t$ · matière première **atténuée** · climat **très peu** |
| **Exemple 33.4** | $d_1=0{,}2376$, $d_2=0{,}1676$, payoff **250 900**, valeur **243 400** |
| **Avec la tendance** | moyenne **697** → payoff **180 400**, valeur **175 100** |
| **Le résultat de Litzenberger** | **aucune corrélation** CAT bonds / actions |
| **Pourquoi acheter des CAT bonds** | rendement espéré **supérieur** et risque **diversifiable** |
| **Les deux risques d'un producteur** | risque de **PRIX** et risque de **VOLUME** |
| **La régression** | $Y=a+bP+cT+\varepsilon$ |
| **Les deux positions** | $\mathbf{-b}$ en dérivés d'**énergie**, $\mathbf{-c}$ en dérivés **climatiques** |

## 🧠 Active Recall

1. Quelles sont les deux particularités des prix de matières premières ?
2. Pourquoi les données historiques sont-elles plus utiles pour le climat et l'assurance ?
3. Définir le ratio *stocks-to-use*. Quelle est sa plage typique ? Quel est son effet ?
4. Expliquer le retour à la moyenne agricole par le comportement des agriculteurs.
5. Pourquoi les prix agricoles sont-ils saisonniers ?
6. Quand la volatilité d'un produit cultivé est-elle maximale ? Pourquoi ?
7. Citer deux exemples d'événements météo affectant les prix agricoles.
8. Citer quatre différences entre métaux et produits agricoles.
9. Distinguer métaux d'investissement et de consommation, avec des exemples.
10. Pourquoi les métaux d'investissement ne peuvent-ils pas suivre un processus à retour à la moyenne ?
11. Expliquer le mécanisme de retour à la moyenne pour les métaux de consommation.
12. Citer quatre déterminants long terme du prix d'un métal.
13. Qu'est-ce que le recyclage apporte comme source d'offre ?
14. Expliquer le retour à la moyenne pour les produits énergétiques.
15. Quelle est la taille du marché du pétrole ? Citer les deux références de prix.
16. Comment sont structurés les contrats d'approvisionnement à 10 ans ?
17. Quelle est la taille des contrats pétrole et produits raffinés ?
18. Qu'est-ce qui a changé dans l'industrie du gaz dans les années 1980-1990 ?
19. Décrire un contrat de gré à gré type sur le gaz. Qui achemine le gaz ?
20. Décrire le contrat gaz du CME.
21. Pourquoi la demande de gaz est-elle saisonnière ?
22. Pourquoi l'électricité est-elle une matière première inhabituelle ?
23. Comment les producteurs s'en approchent-ils du stockage ?
24. Décrire l'organisation en zones de contrôle et l'origine du marché de gros.
25. Quelle est l'ampleur des sauts de prix observés ?
26. Décrire les contrats $5\times8$, $5\times16$ et $7\times24$.
27. Qu'est-ce qu'une *swing option* ? Quelle limite comporte-t-elle ?
28. Quel est le point de départ de toute modélisation de matière première ?
29. Écrire le processus simple et l'expression de $F(t)$.
30. En déduire $\mu(t)$.
31. Refaire l'exemple 33.1 : la croissance espérée octobre-décembre.
32. Refaire l'exemple 33.2 en entier et citer ses deux hypothèses.
33. Écrire le processus à retour à la moyenne. À quel modèle de taux est-il analogue ?
34. Quelle est l'écriture alternative, et le lien entre $\Theta$ et $\theta$ ?
35. Décrire les deux étapes de la construction de l'arbre.
36. Que valent $\Delta X$ et $j_{\max}$ dans l'exemple ?
37. Écrire l'équation qui détermine $\alpha_1$ et donner sa solution.
38. Comment calcule-t-on la probabilité du nœud F ?
39. Donner les cinq probabilités à 2 ans et la valeur de $\alpha_2$.
40. Quelles sont les cinq valeurs de $S$ à 2 ans ?
41. Refaire l'exemple 33.3 : les valeurs à chaque date, et où l'exercice anticipé a lieu.
42. Comment obtenir une valeur plus précise ?
43. Décrire les quatre étapes de la désaisonnalisation.
44. Comment estime-t-on un facteur saisonnier ?
45. Refaire l'exemple de septembre à décembre.
46. Comment traite-t-on la saisonnalité de la volatilité ?
47. Quelles matières premières présentent des sauts, et pourquoi (deux mécanismes) ?
48. Écrire le processus avec sauts. Comment calibre-t-on $\theta(t)$ ?
49. Écrire le modèle de Gibson-Schwartz et dire ce qui est stochastique.
50. Écrire le modèle d'Eydeland-Geman. Qu'a ajouté Geman ensuite ?
51. Écrire les définitions de HDD et CDD. Comment calcule-t-on $A$ ?
52. Refaire l'exemple max 68 / min 44.
53. En quel sens HDD et CDD sont-ils des payoffs d'options ?
54. Décrire un contrat de gré à gré type sur HDD, avec l'exemple de Chicago.
55. Quel est l'effet d'un plafond de paiement ?
56. Citer cinq catégories d'utilisateurs autres que l'énergie.
57. Quand le CME a-t-il lancé ces contrats ? Quelle est la taille d'un futures ?
58. Décrire les deux formes de réassurance et laquelle est plus populaire.
59. Quelle forme prend une réassurance forfaitaire ?
60. Qui sont les fournisseurs traditionnels de réassurance CAT ?
61. Décrire l'ouragan Andrew et son effet sur l'industrie.
62. Qu'est-ce qu'une obligation CAT ? Que peut perdre le porteur ?
63. Appliquer le mécanisme à l'exemple des 30-40 millions.
64. Énoncer le principe central de valorisation du climat et de l'assurance.
65. Écrire les deux étapes de la procédure.
66. Comparer la croissance de l'incertitude pour une action, une matière première, le climat.
67. Refaire l'exemple 33.4 : $d_1$, $d_2$, le payoff, la valeur.
68. Quel est l'effet de la tendance de $-0{,}5$ par an ?
69. Qu'a montré Litzenberger, et pourquoi est-ce important ?
70. Pourquoi les investisseurs achètent-ils des CAT bonds ?
71. Quels sont les deux risques d'un producteur d'énergie ?
72. Quel instrument couvre chacun ?
73. Écrire la régression et les deux positions à prendre.
74. À quoi d'autre la relation peut-elle servir ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Deux particularités des matières premières ? | **Retour à la moyenne** et **SAUTS** |
| Ratio stocks-to-use ? | Inventaire de fin d'année / **consommation** |
| Sa plage typique ? | **20 à 40 %** |
| Ratio bas → ? | Volatilité **PLUS ÉLEVÉE** |
| Retour à la moyenne agricole ? | Prix bas → **moins de production** → prix remonte |
| Volatilité agricole maximale quand ? | **AVANT la récolte** |
| Exemples d'événements météo ? | **Gelées** au Brésil (café) · **ouragan** en Floride (jus d'orange) |
| Métaux : météo ? | **Aucun effet** |
| Métaux : saisonnalité ? | **Aucune** |
| Or et argent ? | Actifs d'**INVESTISSEMENT** |
| Cuivre ? | Actif de **CONSOMMATION** |
| Retour à la moyenne pour l'or ? | **NON** — cela créerait un **ARBITRAGE** |
| Pour le cuivre ? | **Possible** |
| Le recyclage ? | ≈ **10 %** revient sur **20 ans** |
| Déterminants court terme d'un métal ? | **Inventaires** et volatilité du **CHANGE** |
| Retour à la moyenne énergétique ? | Prix haut → **moins consommé, plus produit** |
| Taille du marché pétrolier ? | **Le plus grand** ; **80 millions de barils/jour** |
| Les deux références ? | **Brent** et **WTI** |
| Contrats à 10 ans ? | Des **SWAPS** prix fixe contre prix variable |
| Taille d'un contrat pétrole ? | **1 000 barils** |
| Produits raffinés ? | **42 000 gallons** |
| Le CME exige quoi pour le light sweet ? | La **livraison PHYSIQUE** |
| Contrat gaz CME ? | **10 000 millions de BTU** |
| Lieu de livraison ? | Un hub en **LOUISIANE** |
| Qui achemine le gaz ? | Le **VENDEUR** |
| Pourquoi la demande de gaz est-elle saisonnière ? | **Chauffage** et **climatisation** |
| Particularité de l'électricité ? | **NON STOCKABLE** |
| L'approche la plus proche du stockage ? | **Pomper de l'eau** en haut des barrages |
| Nombre de zones de contrôle US ? | **140** |
| Ce qui constitue le marché de gros ? | **L'EXCÉDENT** vendu entre zones |
| Effet d'une vague de chaleur ? | Jusqu'à **+1 000 %** |
| Contrat $5\times8$ ? | 5 jours, **23 h-7 h** (creux) |
| Contrat $5\times16$ ? | 5 jours, **7 h-23 h** (pointe) |
| Contrat $7\times24$ ? | **En continu** |
| Swing option ? | Min et max **par jour ET pour le mois** |
| Sa contrainte ? | Un **nombre limité de changements** |
| Autre nom ? | ***Take-and-pay option*** |
| Le point de départ de la modélisation ? | $F(t)=\hat E[S(t)]$ |
| Processus simple ? | $dS/S=\mu(t)dt+\sigma dz$ |
| Que vaut $\mu(t)$ ? | $\partial[\ln F(t)]/\partial t$ |
| Ex. 33.1 : croissance oct.-déc. ? | $\ln(62{,}70/60{,}60)=\mathbf{0{,}034}$ |
| Annualisée ? | **20,4 %** |
| Ex. 33.2 : la valeur ? | **17,729 milliers de dollars** |
| Quel prix utilise-t-on à 1 an ? | Le **prix FUTURES**, 64,40 cents |
| Les deux hypothèses ? | Risque systématique **nul** · **pas de corrélation** |
| Processus à retour à la moyenne ? | $d\ln S=[\theta(t)-a\ln S]dt+\sigma dz$ |
| Son analogue de taux ? | **Black-Karasinski** |
| Lien $\Theta$ et $\theta$ ? | $\Theta=\theta+\frac12\sigma^2$ |
| Étape 1 de l'arbre ? | Arbre pour **$X$** (drift $-aX$, départ **0**) |
| Étape 2 ? | **DÉPLACER** pour que $E[S]=F$ |
| $\Delta X$ dans l'exemple ? | $0{,}2\sqrt3=\mathbf{0{,}3464}$ |
| $j_{\max}$ ? | **2** |
| $\alpha_1$ ? | **3,071** |
| $S$ à 1 an ? | **30,49 · 21,56 · 15,25** |
| Probabilité du nœud F ? | $0{,}1667(0{,}6566)+0{,}6666(0{,}1667)=\mathbf{0{,}2206}$ |
| Probabilité du nœud G ? | **0,5183** |
| $\alpha_2$ ? | **3,099** |
| $S$ à 2 ans ? | 44,35 · 31,37 · **22,18** · 15,69 · 11,10 |
| Ex. 33.3 : la valeur du put ? | **1,48** |
| Où l'exercice anticipé a-t-il lieu ? | Aux nœuds **D, H, I** |
| Comment améliorer la précision ? | Plus de pas + **interpolation des futures** |
| Ordre de la désaisonnalisation ? | **Désaisonnaliser → interpoler → resaisonnaliser** |
| Comment estimer un facteur saisonnier ? | Rapport à la **moyenne mobile 12 mois centrée** |
| Sept. 40, facteur 0,95 ? | Désaisonnalisé **42,1** |
| Déc. 44, facteur 1,1 ? | Désaisonnalisé **40,0** |
| Octobre interpolé ? | **41,4** → resaisonnalisé **35,19** |
| Volatilité saisonnière ? | Remplacer $\sigma$ par $\sigma(t)$ |
| Sauts électricité et gaz ? | Chocs de **DEMANDE** liés à la météo |
| Sauts agricoles ? | Chocs d'**OFFRE** liés à la météo |
| Processus avec sauts ? | $+\,dp$ de **Poisson** |
| Le modèle de référence ? | Le **saut-diffusion de MERTON** |
| Comment calibrer $\theta(t)$ ? | **Réduire les futures** de la hausse due aux sauts |
| Gibson-Schwartz : le drift ? | $r-y$ |
| Ce qui est stochastique ? | Le **rendement d'opportunité** $y$ |
| Comment ajuster exactement les futures ? | Rendre $\alpha$ **fonction du temps** |
| Eydeland-Geman ? | Volatilité **STOCHASTIQUE** pour gaz et électricité |
| L'ajout de Geman ? | Le **niveau de retour $b$** aussi stochastique |
| HDD ? | $\max(0,\ 65-A)$ |
| CDD ? | $\max(0,\ A-65)$ |
| Que vaut $A$ ? | La moyenne du **MAX et du MIN** du jour |
| Quelle unité ? | Le **FAHRENHEIT** |
| Max 68, min 44 ? | $A=56$, HDD $=\mathbf9$, CDD $=\mathbf0$ |
| Ce que mesure le HDD ? | L'énergie de **CHAUFFAGE** |
| Ce que mesure le CDD ? | L'énergie de **REFROIDISSEMENT** |
| Premiers contrats de gré à gré ? | **1997** |
| Lancement du CME ? | **Septembre 1999** |
| Taille d'un futures climatique ? | **20 dollars** × le cumul |
| Nombre de villes ? | **42** |
| Autres sous-jacents du CME ? | **Ouragans, gel, chutes de neige** |
| Contrat avec plafond ? | Un **BULL SPREAD** |
| Part de l'économie US exposée ? | **Un septième** |
| Réassurance au prorata ? | Couvre un **pourcentage** de l'exposition |
| Excess cost layers ? | Des **TRANCHES** de perte |
| Laquelle est plus populaire ? | Les **tranches** — primes **plus basses** |
| Réassurance forfaitaire ? | Un **cash-or-nothing call** sur les pertes |
| Fournisseurs traditionnels ? | Réassureurs et **syndicats du LLOYDS** |
| Andrew (1992) ? | **15 milliards** en Floride |
| Ce que cela dépassait ? | **7 ans de primes** |
| Si Andrew avait frappé Miami ? | Plus de **40 milliards** |
| Obligation CAT ? | Intérêt **supérieur** contre **réassurance en excédent de perte** |
| Qui l'émet ? | Une **FILIALE** de l'assureur |
| Ce qui peut être perdu ? | **L'intérêt, le principal, ou les deux** |
| Le trait distinctif du climat et de l'assurance ? | **AUCUN RISQUE SYSTÉMATIQUE** |
| Sa conséquence ? | Données **historiques** = **risque-neutres** |
| Les deux étapes de valorisation ? | Espérance **historique** · actualiser au **sans risque** |
| Croissance de l'incertitude, action ? | En $\sqrt t$ |
| Pour le climat ? | **Beaucoup moins marquée** |
| Ex. 33.4 : $d_1$ ? | **0,2376** |
| Ex. 33.4 : $d_2$ ? | **0,1676** |
| Ex. 33.4 : payoff espéré ? | **250 900 dollars** |
| Ex. 33.4 : valeur ? | **243 400 dollars** |
| Avec la tendance de $-0{,}5$/an ? | Moyenne **697** → valeur **175 100** |
| Ce qu'a montré Litzenberger ? | **Aucune corrélation** CAT / actions |
| Pourquoi c'est important ? | Cela **confirme l'absence de risque systématique** |
| Pourquoi acheter des CAT bonds ? | Rendement espéré **plus élevé**, risque **diversifiable** |
| Les deux risques d'un producteur ? | **PRIX** et **VOLUME** |
| Qui couvre le prix ? | Les dérivés d'**ÉNERGIE** |
| Qui couvre le volume ? | Les dérivés **CLIMATIQUES** |
| La régression ? | $Y=a+bP+cT+\varepsilon$ |
| Les deux positions ? | $\mathbf{-b}$ en énergie, $\mathbf{-c}$ en climat |
