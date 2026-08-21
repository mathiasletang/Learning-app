# Fiche 55 — Value at Risk : variance-covariance, simulation historique et Monte-Carlo

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | Abbott, *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 7 « Value At Risk (VAR) Models » |
| **Difficulté** | Must know — la mesure de risque de toutes les salles de marché |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 51 (mesures de risque, cohérence), fiche 53 (volatilité, pondération exponentielle), fiche 54 (matrices de covariance) |
| **Concepts clés** | Quantile de perte, multiplicateurs $2{,}33$ et $1{,}64$, DV01 et duration, méthode variance-covariance, forme quadratique $X^T\Sigma X$, pondération exponentielle, *bucketing*, VaR absolue et marginale, simulation historique, statistique d'ordre, Monte-Carlo, factorisation de Cholesky, *backtesting* |
| **Poids à l'examen** | Trois choses : la **chaîne de calcul** de la VaR à un actif ; l'**ajustement obligataire** par le DV01 (et le piège des unités) ; et savoir **comparer** les trois méthodologies sur hypothèses, forces et faiblesses. |

## 🎯 Vue d'ensemble

> **La mission de la gestion des risques.**
>
> 1. **Garantir que la direction est pleinement informée** du profil de risque de la banque.
> 2. **Protéger la banque** contre des pertes inacceptablement grandes résultant de la **concentration des risques**.
> 3. Autrement dit : **PAS DE SURPRISES**.
>
> *Deux analogies : le **projecteur** et le **livre de coloriage**.*

**Ce qu'on cherche à calculer :** *on veut estimer les **1 % pires issues possibles*** de la distribution des résultats.

```
QUESTION      « Combien puis-je perdre, dans les 1 % de pires cas ? »
1 ACTIF       VaR = position × σ × 2,33
n ACTIFS      VaR = 2,33 × √(XᵀΣX)          ← variance-covariance
ALTERNATIVE 1 rejouer l'histoire → nᵉ pire P&L   ← simulation historique
ALTERNATIVE 2 simuler des chocs corrélés         ← Monte-Carlo
CONTRÔLE      backtesting : VaR à t contre P&L à t+1
```

**Les méthodologies du cours :**

- **Exemple de VaR à un actif** : instruments cotés en **prix** · instruments cotés en **taux**
- **Variance / covariance**
- **Simulation de Monte-Carlo**
- **Simulation historique**

**Les variables qui interviennent dans les méthodes :**

1. **Sensibilité aux taux d'intérêt** — duration, PV01
2. **Exposition actions**
3. **Exposition matières premières**
4. **Crédit** — duration de spread
5. **Distribution / linéarité** du comportement des prix
6. **Régularité des flux de trésorerie / remboursements anticipés**
7. **Corrélation** entre secteurs et classes d'actifs

## 🟡 Concept 1 — Pourquoi travailler sur les rendements

> - *La plupart des séries financières suivent des **marches aléatoires**, ce qui signifie entre autres que la **meilleure estimation de la valeur de demain est la valeur d'aujourd'hui**.*
> - *Comme les marches aléatoires ne sont **pas bornées**, prédire la trajectoire future est difficile si l'on se concentre sur les **niveaux**.*
> - *Une distribution de fréquence des **niveaux** de l'indice IPC sur 1995-1996 illustre la difficulté.*

En revanche, la distribution de fréquence des **rendements**, définis comme la **variation en pourcentage** de l'indice, *retrouve un profil familier* — une forme en cloche exploitable.

> **Le raisonnement en une phrase.** Un histogramme des niveaux d'un indice n'est pas une distribution de probabilité : c'est un résumé du chemin parcouru, qui dépend entièrement du point de départ et de la période. L'histogramme des **rendements**, lui, décrit un processus à peu près **stationnaire** — et c'est la stationnarité qui autorise à lire un quantile passé comme une prévision. C'est exactement l'hypothèse de la fiche 52.

## 🔴 Concept 2 — La VaR à un actif

**Estimer la volatilité.** *Une fois qu'on dispose d'une série temporelle de rendements, on jauge leur dispersion relative par la **variance** : soustraire le rendement moyen de chaque rendement individuel, élever au carré, sommer les carrés sur toutes les observations, et diviser par le nombre d'observations.* La **racine carrée** de la variance, appelée **écart-type** ou **volatilité**, sert à estimer le risque.

$$\text{variance}=\sum_{i=1}^n\frac{(x_i-\bar x)^2}{n-1}$$

*(fonctions Excel : `var()` et `stdev()`)*

> **Le résultat central.** *Dans une distribution normale, **$2{,}33\times$ l'écart-type** représente le plus grand mouvement possible **99 % du temps** (et **$1{,}64\times$ l'écart-type** pour **95 %**).*

⚠️ **Ces deux nombres sont les quantiles de la loi normale standard**, en **unilatéral** : $\Phi^{-1}(0{,}99)=2{,}326$ et $\Phi^{-1}(0{,}95)=1{,}645$. Ils ne valent **que** sous normalité. La suite du chapitre existe en grande partie parce que cette hypothèse est fausse.

### L'exemple de l'IPC mexicain

- La variance des rendements quotidiens de l'IPC entre 1/95 et 12/96 était de $0{,}000324$.
- L'écart-type était de $0{,}018012$, soit $1{,}8012\,\%$.
- $2{,}33\times1{,}8012\,\%=0{,}041968$, soit $\mathbf{4{,}1968\,\%}$.

> *On peut conclure qu'on ne devrait pas perdre plus de $4{,}1968\,\%$ de la valeur de la position, **99 % du temps**. Un investissement de MXP 100 dans l'IPC ne subirait des pertes quotidiennes supérieures à MXP 4,2 qu'environ 1 % du temps.*

> **Et la vérification empirique, que le cours donne franchement.** *En fait, l'IPC a perdu plus de $4{,}2\,\%$ **8 fois** depuis le 1/1/95, soit environ **$1{,}5\,\%$** du temps.*
>
> *Si ce chiffre est approximativement exact, il illustre un problème de la VaR sur certains marchés : elle **sous-estime parfois le nombre de grands mouvements**. Ce problème, fréquent au niveau d'un titre ou d'un desk, **disparaît généralement au niveau du portefeuille**.*

⚠️ **$1{,}5\,\%$ au lieu de $1\,\%$ : c'est un dépassement de 50 %.** La cause est connue — les **queues épaisses** de la fiche 53. Et la remarque sur le portefeuille est importante : l'agrégation de nombreuses positions rapproche la distribution de la normale (effet du théorème central limite), ce qui rend la VaR paramétrique bien plus fiable au niveau global qu'au niveau d'un desk.

### Le protocole en cinq étapes

1. **Collecter** les données de prix.
2. **Créer** la série de rendements.
3. **Estimer** la variance de la série de rendements.
4. **Prendre la racine carrée** de la variance pour obtenir la volatilité (écart-type).
5. **Multiplier** la volatilité par $2{,}33$ et par la taille de la position pour obtenir l'estimation de la perte du pire cas à $99\,\%$.

### Les mises en garde du cours

- **Positions longues contre courtes : le signe compte.** Simple pour les actions, **demande réflexion pour le change**.
- **Intervalles de confiance unilatéraux contre bilatéraux.**
- **Données erronées.**
- **Variations en pourcentage contre variations logarithmiques.**

## 🔴 Concept 3 — L'ajustement obligataire : DV01 et duration

> *Les instruments de taux exigent un **ajustement** de cette méthode, parce que les séries temporelles généralement disponibles pour les titres obligataires sont des séries de **rendements actuariels (taux)**, alors qu'on s'intéresse au comportement du **prix**. L'ajustement demande d'exprimer la volatilité **en points de base** et la position en termes de **sensibilité à un mouvement de 1 point de base des taux**.*

**Les deux formules.**

$$\textbf{Actions, change, matières premières :}\quad \text{position}\times\text{prix}\times2{,}33 \quad(\text{ou }1{,}64\text{ à }95\,\%)$$

$$\textbf{Taux :}\quad \underbrace{\text{position}\times PV01}_{\text{sensibilité à 1 pb}}\times\underbrace{\text{cours}\times\text{vol de taux}\times2{,}33}_{\text{mouvement potentiel des taux, en pb}}\times100$$

### L'exemple du Trésor américain 10 ans

Position de USD 100 en UST 10 ans :

- **Volatilité des variations en pourcentage des taux UST** depuis le 1/1/03 : $1{,}312\,\%$.
- **DV01** = variation de prix au taux de clôture si les taux montaient de **1 point de base** *(la duration peut aussi servir ici)*.
- Prix au taux de $4{,}644\,\%$ : $100$. Prix au taux de $4{,}654\,\%$ : $99{,}92077$.
- $DV01=99{,}920765-100=-0{,}07923$ **pour $100$ de nominal**.
- *Cette sensibilité change avec le niveau des taux, mais fournit une bonne approximation.*

**Le calcul complet.** Taille : USD 100 · maturité : 10 ans · vol : $0{,}01312$ · DV01 : $-0{,}07923$ (pour 100) · clôture au 12/27/06 : $4{,}644\,\%$.

$$VaR=-0{,}07923\times0{,}04644\times0{,}01312\times2{,}33\times100=1{,}12479$$

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment lire ce calcul — la seule lecture qui fasse tenir les unités.</span>

**Étape 1.** Le taux vaut $4{,}644\,\%$ et sa volatilité **relative** est de $1{,}312\,\%$. La volatilité **absolue** du taux est donc $4{,}644\,\%\times1{,}312\,\%=0{,}0609\,\%=6{,}09$ points de base par jour. **Étape 2.** Le mouvement de taux à $99\,\%$ est $2{,}33\times6{,}09=14{,}2$ points de base. **Étape 3.** Le DV01 vaut $0{,}07923$ par point de base pour $100$ de nominal. **Étape 4.** $VaR=14{,}2\times0{,}07923\approx\mathbf{1{,}12}$ pour une position de $100$. C'est bien le chiffre du cours.

**Le facteur $100$ de la formule est exactement le facteur de conversion d'unités** entre le taux exprimé en décimal et le DV01 exprimé par point de base.

</div>

### Duration contre DV01

|  | Contenu |
|---|---|
| **Duration** | Mesure la **durée moyenne pondérée** jusqu'aux flux du titre, la pondération étant le flux. Donne aussi la **variation en pourcentage du prix** par variation de taux. |
| **DV01** | Fournit une mesure similaire, mais souvent **par million de nominal**. |

> *Les traders obligataires raisonnent en **DV01** ; les gérants de portefeuille raisonnent en **duration**. L'une ou l'autre convient, mais **ATTENTION AUX UNITÉS. C'est l'une des erreurs les plus faciles à commettre !***

⚠️ **Le cours met cet avertissement en capitales, et il faut le prendre au sérieux.** DV01 par $100$ ou par million ? Taux en décimal, en pourcentage ou en points de base ? Volatilité **relative** (des variations en %) ou **absolue** (en pb) ? Chaque confusion introduit un facteur $100$ ou $10\,000$ — une VaR fausse d'un ou deux ordres de grandeur.

### Le PV01 de spread

- Pour les titres **porteurs de risque de crédit**, il faut distinguer **risque de taux** et **risque de crédit**.
- Le **spread de crédit** prend en compte le **défaut** (et le **recouvrement**).
- On considère habituellement ces deux risques **séparément**.
- On suppose souvent $PV01=CSPV01$ : *si le recouvrement est nul, c'est vrai ; sinon, ça ne l'est pas.*
- Sources de spreads : **calculés**, **CDS**, **spreads d'asset swap**.

## 🔴 Concept 4 — Ajouter des actifs : covariance et corrélation

> *La notion de **covariance** permet de considérer la façon dont les prix des actifs se comportent **les uns par rapport aux autres**.*
>
> $$\mathrm{cov}(x,y)=\sum_{i=1}^n\frac{(x_i-\bar x)(y_i-\bar y)}{n-1}$$

**Ce que cela signifie.** *Cela indique **à quelle distance de sa moyenne** se trouve une variable quand on observe une autre variable à une certaine distance de sa moyenne. Autrement dit, cela dit **de combien (et dans quelle direction)** $y$ bouge quand $x$ bouge. Cela fournit une mesure pour **chaque variable par rapport à chaque autre**.*

**Pourquoi c'est important.** *Si l'on connaît les variances et covariances de **tous** les titres d'un portefeuille, on peut évaluer le risque du **portefeuille entier** — et aussi celui de **n'importe quel sous-portefeuille**. C'est la base d'une grande partie de la théorie moderne du portefeuille.*

### Corrélation

*On peut **mettre à l'échelle** la covariance pour obtenir la corrélation :*

$$\rho=\frac{\mathrm{Cov}(a,b)}{\sigma_a\sigma_b}$$

- *la covariance **n'est pas sans unité***
- *la corrélation est un **indice de linéarité***

**Laquelle utiliser ?** *Tant qu'on ajuste les unités, peu importe. L'**intuition** est plus facile avec la corrélation ; les **calculs** sont plus faciles avec la covariance. Si l'on connaît les covariances, on connaît aussi les corrélations — mais **pas l'inverse**.*

⚠️ **Ce dernier point est plus subtil qu'il n'en a l'air.** La matrice de corrélation seule ne suffit pas : il faut aussi les $n$ volatilités. Or beaucoup de fournisseurs de données livrent l'une **ou** l'autre — vérifiez toujours de quoi vous disposez.

### Les règles de combinaison

**Principe de base :**

$$\mathrm{variance}(a+b)=\mathrm{variance}(a)+\mathrm{variance}(b)+2\,\mathrm{covariance}(a,b) \qquad \sigma_{a+b}^2=\sigma_a^2+\sigma_b^2+2\rho\sigma_a\sigma_b$$

**Avec des quantités.** *Jusqu'ici on a examiné des portefeuilles avec une seule « unité » de chaque actif ; la plupart des portefeuilles détiennent plusieurs actions, obligations ou contrats.*

$$\mathrm{var}(xa)=x^2\,\mathrm{var}(a), \qquad \mathrm{var}(xa+yb)=x^2\mathrm{var}(a)+y^2\mathrm{var}(b)+2xy\,\mathrm{cov}(a,b)$$

**Extension à trois puis quatre actifs.**

$$\mathrm{var}(a+b+c)=\mathrm{var}(a)+\mathrm{var}(b)+\mathrm{var}(c)+2\mathrm{cov}(ab)+2\mathrm{cov}(ac)+2\mathrm{cov}(bc)$$

$$\mathrm{var}(xa+yb+zc)=x^2\mathrm{var}(a)+y^2\mathrm{var}(b)+z^2\mathrm{var}(c)+2xy\,\mathrm{cov}(ab)+2xz\,\mathrm{cov}(ac)+2yz\,\mathrm{cov}(bc)$$

$$\mathrm{var}(a+b+c+d)=\sum_i\mathrm{var}(\cdot)+2\mathrm{cov}(ab)+2\mathrm{cov}(ac)+2\mathrm{cov}(ad)+2\mathrm{cov}(bc)+2\mathrm{cov}(bd)+2\mathrm{cov}(cd)$$

> *De toute évidence, cela devient vite ingérable. Si l'on veut étendre à des portefeuilles contenant de nombreux actifs, il faut **simplifier les calculs**. Pour cela, deux concepts nouveaux : un simple et un plus compliqué — les **matrices de covariance et de corrélation**, et l'**algèbre linéaire**.*

## 🔴 Concept 5 — La méthode variance-covariance en forme matricielle

> **La remarque qui débloque tout.** *Si l'on **somme les éléments** de la matrice de covariance, on obtient la somme des variances $+\ 2\times$ la somme des covariances. On peut en tirer parti.*
>
> Autrement dit : *si un portefeuille détient **une unité** de chaque titre suivi dans la matrice de covariance, la **variance du portefeuille est la somme des éléments de la matrice**. Cela arrive rarement dans le monde réel ; il faut trouver un moyen de gérer ça.*

**La solution : la forme quadratique.** Avec $X$ le vecteur de positions (ou de sensibilités) et $\Sigma$ la matrice de covariance,

$$\boxed{\ \sigma_P^2=X^T\Sigma X \qquad\Longrightarrow\qquad VaR_{99\%}=2{,}33\times\sqrt{X^T\Sigma X}\ }$$

*L'algèbre matricielle est un raccourci arithmétique. Elle s'exécute facilement dans un tableur avec les fonctions `MMULT()` et `TRANSPOSE()`.*

**L'exemple du cours.** Positions de $(-100)$ en CAD/USD, $(-50)$ en CHF/USD et $(-25)$ en DEM/USD, avec la matrice

$$\Sigma=\begin{pmatrix}0{,}000037&-0{,}000018&-0{,}000017\\ -0{,}000018&0{,}000321&0{,}000257\\ -0{,}000017&0{,}000257&0{,}000227\end{pmatrix}$$

$$X^T\Sigma X=1{,}691875 \ \text{(variance de portefeuille)}, \qquad \sigma_P=1{,}300721, \qquad 2{,}33\,\sigma_P=3{,}0306798$$

*Plusieurs choses à retenir : il faut valider les fonctions matricielles par **Ctrl-Maj-Entrée** et non simplement Entrée ; et le **nombre de positions doit égaler le nombre de lignes et de colonnes** de la matrice.*

> **Notez que la fonction produit la variance.** Il faut en prendre la **racine carrée** pour obtenir l'écart-type, puis multiplier par $2{,}33$ pour obtenir la VaR à $99\,\%$. Oublier la racine est l'erreur la plus fréquente du calcul.

### Les éléments d'un calcul variance-covariance

1. **Collecte des données**
2. **Calcul des rendements**
3. **Tests des données**
4. **Construction de la matrice**
5. **Positions et vecteurs de positions**
6. **Multiplication matricielle**
7. **Calcul du capital**
8. **Interprétation**

**Le diagramme de flux** enchaîne : données de marché ⟶ rendements ⟶ **tests** (graphiques, seuil à $2$ écarts-types) ⟶ **matrice de covariance de marché $\Sigma$** ; en parallèle, données de positions ⟶ **vecteur de positions** (incluant les DV01) ; puis **multiplication matricielle $X^T\Sigma X$** ⟶ **VaR de portefeuille**, **VaR absolue de sous-portefeuille**, **VaR marginale de sous-portefeuille**, **analyse de scénarios**.

## 🟠 Concept 6 — Les hypothèses et les choix de mise en œuvre

**Les décisions à prendre :** obtention des données · période temporelle · **pondération** · ***bucketing*** (actifs non corrélés, actifs liés) · lacunes dans les données · fréquence de mise à jour · intervalle de différenciation.

### La période couverte

*Jusqu'où remonter · disponibilité des données · **changements de régime de cotation** (crise de 2008, Brésil en 1995, introduction de l'euro) · existence d'**anomalies de marché** · possibilité pour les traders d'en tirer parti.*

⚠️ **Le dernier point est un risque opérationnel réel.** Si le modèle de VaR est connu et figé, un trader peut construire une position dont la VaR mesurée est faible alors que le risque économique est élevé — en exploitant précisément la fenêtre d'estimation ou le *bucketing*.

### La pondération exponentielle

*Elle pondère plus fortement les observations récentes, avec une décroissance exponentielle ; il faut estimer $w$, le facteur de pondération. L'équation de la covariance prend habituellement la forme*

$$\mathrm{cov}_w(x,y)=\frac{\sum_{i=1}^nw_i(x_i-\bar x)(y_i-\bar y)}{\sum_{i=1}^nw_i}$$

**Les avantages et inconvénients, selon le cours.** *Le choix d'un coefficient de pondération a des **implications majeures** : plus difficile à mettre en œuvre, plus difficile à vérifier, effet majeur sur variances et covariances, et à bien des égards **assez arbitraire**. Cependant, il peut **lisser la volatilité à mesure que les positions vieillissent** et agit conformément à la théorie heuristique de la décision.*

> **C'est exactement la moyenne mobile exponentielle de la fiche 53**, appliquée cette fois aux covariances et non seulement aux variances. Le graphique du cours compare des coefficients de $0{,}92$ à $0{,}98$ ainsi qu'une moyenne glissante sur 6 mois : plus $w$ est proche de 1, plus la mesure est lisse et lente.

### Le *bucketing*

*On ne peut pas avoir un compartiment pour chaque position ; on **regroupe**. Ce faisant, on réduit la **granularité**. Bien fait, cela n'entraîne **aucune perte de précision**. Parfois, il faut regrouper les « actifs non corrélés » avec une certaine volatilité.*

### Les autres choix

| Question | Contenu |
|---|---|
| **Fréquence de mise à jour** | Quotidienne, hebdomadaire ou mensuelle — vraiment une question d'hypothèses sur les marchés. À quelle fréquence les choses bougent-elles ? Les changements de volatilité sont fréquents sur les eurodépôts courts et les taux japonais ; les changements de **structure de corrélation** sont difficiles à estimer. |
| **Pourcentages ou logarithmes** | Choix fondé surtout sur la **commodité de calcul**. Le seul vrai problème des pourcentages est qu'ils autorisent théoriquement des taux et prix **négatifs**. |
| **Intervalle de différenciation** | Quotidien / hebdomadaire / mensuel. Peut-on changer d'échelle ? *Techniquement oui, mais…* problèmes d'**asynchronicité** et de **corrélation sérielle**. |
| **Unités** | Positions en millions ? Positions de change **cohérentes** (même devise de base, signe correct) ? Signe des positions de taux ? |

> **Corrélation, covariance et temps.** *L'horizon d'un jour rend l'usage des matrices de corrélation **moins ambigu théoriquement**. Reste la question de la **stabilité des corrélations dans le temps** : elles ont tendance à « basculer » du neutre au directionnel **quand les marchés sont sous tension**. Les horizons courts rendent les approximations linéaires moins problématiques.*

⚠️ **« Les corrélations basculent en période de crise » est le défaut structurel de la méthode variance-covariance.** Elle est calibrée sur des données de régime calme et estime le risque du régime de crise — précisément le moment où les corrélations montent vers $1$ et où la diversification cesse d'exister. D'où l'obligation de compléter par des **tests de résistance**.

## 🟠 Concept 7 — VaR absolue et VaR marginale

### VaR absolue

*Quelle est la VaR absolue de chaque compartiment ? Deux façons de la calculer :*

- prendre la **sensibilité individuelle** de la position et la multiplier par la **volatilité** de la position (pas la variance) ;
- utiliser le **vecteur de positions**, mais en **annulant successivement toutes les positions sauf celle qui nous intéresse**.

*Essentiellement, on considère des portefeuilles à un seul actif.* Pour un vecteur de sensibilités $(10,20,35,-23,40,100,-67)$, on construit sept vecteurs, chacun ne conservant qu'une composante et mettant les six autres à zéro, et l'on calcule la VaR de chacun.

### VaR marginale

**Pourquoi ?** *Principalement pour voir **comment une position individuelle contribue à la VaR du portefeuille**. Cela éclaire les **couvertures naturelles** et montre l'**efficacité des portefeuilles de couverture**.*

**Comment ?** On construit cette fois des vecteurs où l'on **annule la position d'intérêt en gardant toutes les autres**, puis *on compare chaque VaR à la VaR originale pour voir la contribution marginale au risque de la position*.

### La formulation par le rapport variance / covariance

En simulation historique, le moteur de VaR produit des **vecteurs de P&L** (par exemple 1 043 dates de P&L pour 4 ans d'historique). *Pour un jour donné, le vecteur de P&L d'un **parent** est la **somme** des vecteurs de ses **enfants*** — par exemple $\text{P\&L}_{\text{Firme}}=\text{P\&L}_{\text{IED}}+\text{P\&L}_{\text{FID}}$. En prenant la **variance** comme approximation du risque associé à un vecteur de P&L :

$$\boxed{\ \text{VaR marginale de l'enfant}=\frac{\mathrm{Cov}(\text{Parent},\text{Enfant})}{\mathrm{Var}(\text{Parent})}\times\text{VaR du Parent}\ }$$

et donc

$$\text{VaR du Parent}=\sum_{\text{enfants}}\text{VaR marginale de l'enfant}$$

> *Les marginales sont **relatives au parent immédiat** dans la hiérarchie, et les marginales de tous les enfants **somment toujours** à la VaR du parent seul.*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi cette définition et pas une autre.</span>

C'est la seule qui rende les contributions **exactement additives**. La preuve tient en une ligne : si $y=\sum_kc_k$, alors

$$\mathrm{Var}(y)=\mathrm{Cov}(y,y)=\mathrm{Cov}\Big(y,\sum_kc_k\Big)=\sum_k\mathrm{Cov}(y,c_k)$$

En divisant par $\mathrm{Var}(y)$, les rapports somment à $1$ — donc les VaR marginales somment à la VaR du parent. **Sommer des VaR autonomes ne donnerait jamais cela** (sous-additivité de la fiche 51) : c'est bien la covariance avec le tout, et non le risque isolé, qui est la bonne mesure de contribution.

</div>

**Un exemple du cours** (unités : milliers de dollars) :

| Unité | VaR | VaR marginale |
|---|---|---|
| FIRM_primary | $(81\,411)$ | — |
| PDT | $(14\,481)$ | $(2\,822)$ |
| IEDxPDT | $(29\,990)$ | $(14\,273)$ |
| SUPERFID | $(72\,457)$ | $(64\,316)$ |
| **Somme des marginales** |  | $\mathbf{(81\,411)}$ |

⚠️ **Lisez la troisième ligne : VaR autonome de $29\,990$, contribution marginale de $14\,273$.** L'unité contribue moins de la moitié de son risque isolé, parce que le reste est **absorbé par diversification**. C'est précisément l'information qu'un directeur des risques cherche : où sont les couvertures naturelles.

## 🔴 Concept 8 — La simulation historique

> *La simulation historique **valorise simplement le portefeuille au marché** en utilisant les taux et prix observés sur une certaine période historique — ou les variations exprimées en écarts-types. Ces chiffres de P&L sont ensuite **classés**, et la **statistique d'ordre** est obtenue en prenant la **$n$-ième pire issue**. $n$ est fonction du seuil de signification (habituellement $1\,\%$) et de la quantité de données disponibles.*

**Le barème du cours** : 1 an $=250$ observations · 2 ans $=500$, $n=5$ · 3 ans $=750$ · 4 ans $=1\,000$, $n=10$.

| Quatre forces majeures | Faiblesses |
|---|---|
| **Simple** | Besoin de **beaucoup de données** pour un bon échantillon |
| **Intuitivement séduisante** | Peut exiger un historique pour des choses qui **en ont peu** |
| **Non paramétrique** | Comment supposer que se comporteraient les **produits nouveaux** ? |
| **Agrégation facile** | Suppose la **stationnarité** |

> **« Non paramétrique » est la force décisive.** On ne suppose **ni normalité, ni structure de corrélation** : les queues épaisses, les asymétries et les ruptures de corrélation en période de crise sont **dans les données** et donc automatiquement prises en compte. On peut y voir *un Monte-Carlo limité — même idée générale, même architecture de processus, mais non paramétrique* ; c'est aussi un **rétro-test du portefeuille courant**.

### Les huit étapes

1. **Collecter les données de positions**
2. ***Bucketer*** vers les indices de risque
3. **Calculer les sensibilités** (et deltas, gammas)
4. **Collecter les données historiques**
5. **Calculer les rendements**
6. **« Choquer » le portefeuille** avec les données de rendements
7. **Calculer les chiffres de P&L**
8. **Classer les P&L** et prendre la statistique d'ordre

**Étape 1 — les positions.** *90 % de la gestion des risques consiste à **savoir ce qu'on possède et où on le possède**.* Décisions sur la granularité · importance de données **synchrones** · les dérivés posent des problèmes particuliers (les grecques, le format des données de position — notionnel ou valeur de marché).

**Étape 2 — le *bucketing*.** Plusieurs méthodes : **VaR égale**, **pondération par la duration**, **positions de couverture**. Les unités sont importantes (tailles de positions, confusion possible avec les taux).

**Étape 3 — les sensibilités.** *Très facile pour actions, change et matières premières. Pour les taux : $\text{pos}\times DV01\times\text{cours}\times100$. La **convexité** n'est pas un gros problème. Pour les options : **delta**, ou delta et **gamma** — pour une VaR quotidienne le delta suffit probablement ; il faut le gamma pour une période de détention longue, et peut-être sur les marchés volatils.*

**Étape 6-7 — le choc et le P&L.** *Ces chiffres comportent un peu de bruit, dû à la convexité et au gamma. Ils représentent le P&L **hypothétique** qu'aurait produit la détention de ce portefeuille sur les $n$ derniers jours.*

**Étape 8 — le classement.** *Trier les P&L, prendre le $n$-ième pire. Il est probablement sensé de retenir $1\,\%$, $5\,\%$ et $10\,\%$ ; cela dépend du nombre d'observations. **Important de conserver le détail** : le P&L peut être dominé par très peu de positions.*

> **Et ensuite ?** *Les chiffres de VaR pris **isolément ne valent rien**. Il faut calculer quotidiennement et comparer.* Questions : utiliser le P&L réel ou les variations réelles des indices ? revalorisation complète ou sensibilités ? *La VaR doit être utilisée **conjointement** avec les **tests de résistance** et l'**analyse de scénarios**.*

**Les avantages d'une approche empirique**, selon le cours :

1. **Attrait intuitif**
2. **Facilité de vérification des erreurs**
3. Activité des **spreads de crédit** intégrée d'office
4. **Aucune hypothèse maintenue** de normalité multivariée
5. **Analyse de scénarios automatique**

## 🔴 Concept 9 — La simulation de Monte-Carlo

> **Description.** *1. Méthode de simulation utilisant des suites de nombres aléatoires pour approcher des valeurs qui ne peuvent pas être déterminées analytiquement. 2. L'expression a été forgée pendant le **projet Manhattan**, par analogie avec les jeux de hasard. 3. La seule exigence est que le système soit **descriptible en termes de densités de probabilité**.*

**Applications financières :** produits **dépendants du chemin** · portefeuilles **convexes** pour l'analyse de couverture · exposition au risque pour les portefeuilles à fort risque de **saut** (secteur de l'assurance) · **exposition de crédit** · **VaR**.

### Les sept étapes

**a) Génération de nombres aléatoires uniformes.** *Trois types :*

- **Vrais aléas** — ne peuvent pas être produits par des ordinateurs, doivent venir d'une source externe comme la désintégration radioactive.
- **Quasi-aléatoires** — difficiles à mettre en œuvre, optimisent l'**uniformité**.
- **Pseudo-aléatoires** — engendrés par un algorithme, paraissent indépendants et uniformes ; **méthode dominante**, nombreux algorithmes disponibles (voir Knuth).

**b) Conversion en normales.** *Il faut prendre une uniforme $(0,1)$ et la convertir en normale $(0,1)$ en appliquant l'inverse de la **fonction de répartition** de la loi normale standard.* Voir la **méthode de Box-Muller** dans *Numerical Recipes in C*.

**c) Construction de la matrice de covariance.** Acheter ou construire (couverture, hypothèses sur données manquantes et pondération) · intervalle de différenciation (quotidien / hebdomadaire / mensuel, scalabilité).

**d) Factorisation de la matrice.** *Objectif : obtenir une matrice « **racine carrée** ». C'est **la partie la plus complexe** du calcul de Monte-Carlo.*

| Méthode | Caractéristiques |
|---|---|
| **Cholesky** | plus simple en calcul · utilisée par plusieurs logiciels · **exige une matrice définie positive** · construit une triangulaire inférieure telle que $S=LL^T$ |
| **Décomposition en valeurs et vecteurs propres** | plus complexe · **plus robuste** · construit $E$ et $\Lambda$ telles que $S=E\Lambda E^T$ |

**e) Création des chocs corrélés.**

> *Si $R$ est un vecteur aléatoire normal $n\times1$, $\Lambda^{1/2}$ une matrice diagonale $n\times n$ contenant les racines carrées des valeurs propres, et $E$ la matrice des vecteurs propres, alors*
>
> $$R\,\Lambda^{1/2}E^T\ \sim\ N(0,S)$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ça marche.</span>

Si $R\sim N(0,I_n)$ et $A=E\Lambda^{1/2}$, alors $\mathrm{Cov}(AR)=A\,I_n\,A^T=E\Lambda^{1/2}\Lambda^{1/2}E^T=E\Lambda E^T=S$. La factorisation fournit exactement la matrice qui **transporte** un bruit blanc standard vers la structure de corrélation voulue.

</div>

**Vérifier le processus.** *Il est difficile de faire de **petites** erreurs.* Moyens de contrôle :

- **recréer la matrice de covariance** à partir des tirages ;
- tester les **variances** par des tests $F$ ou du $\chi^2$ : $\hat\sigma^2/\sigma^2\sim F(m-1,k-1)$ ;
- tester les **corrélations** par des tests $z$ : $\hat\rho\sim N\big(\rho,(1-\rho^2)/n\big)$ ;
- le **test M de Box**.

**Problèmes potentiels :** précision · **valeurs propres négatives** · temps de calcul · stockage des données · traçabilité des erreurs.

⚠️ **Les valeurs propres négatives ne sont pas un détail.** Une matrice de covariance empirique construite à partir de séries de longueurs différentes, avec des données manquantes comblées, cesse d'être semi-définie positive. Cholesky **échoue purement et simplement** ; la décomposition spectrale, elle, continue de fonctionner — d'où sa **robustesse** supérieure signalée par le cours. Le remède usuel est de tronquer les valeurs propres négatives à zéro.

**f) Utilisation des chocs pour la revalorisation.** Deux approches de base :

- **Revalorisation exacte** — plus exacte, **lourde en calcul**.
- **Représentation paramétrique** — peut être très précise, mais les **dérivées croisées** créent du bruit.

*(Le cours illustre trois niveaux : revalorisation exacte, représentation partielle, représentation paramétrique complète, ainsi que l'usage de **grilles de valorisation**.)*

**g) Estimer la VaR.** *Une fois revalorisé, calculer le P&L, ordonner les résultats, prendre le $n$-ième plus grand cas. Il faut grouper et trier pour obtenir la VaR des sous-portefeuilles.*

### Les faiblesses de Monte-Carlo

- **Hypothèse de normalité multivariée** : corrélation sérielle · **asymétrie** · **kurtosis**
- Doit être **ajusté** pour simuler le **retour à la moyenne**
- Doit être **ajusté** pour simuler la **diffusion à sauts**

> **C'est le paradoxe de la méthode.** Monte-Carlo est en principe la plus flexible des trois — n'importe quelle densité peut être simulée. Mais **telle qu'elle est mise en œuvre**, avec une matrice de covariance et des tirages gaussiens, elle réintroduit exactement l'hypothèse de normalité que la simulation historique évitait. Les remèdes existent (retour à la moyenne de la fiche 52, sauts de Poisson de la fiche 53) mais doivent être **ajoutés explicitement**.

**Un repère utile donné par le cours :** le rapport $VaR_{95\%}/VaR_{99\%}$ vaut $1{,}65/2{,}33\approx71\,\%$ **sous normalité**. Le graphique 2001-2011 montre ce rapport **empirique** oscillant entre $45\,\%$ et $80\,\%$ — un écart au repère normal qui mesure directement l'épaisseur des queues.

## 🟡 Concept 10 — Le *backtesting*

**Qu'est-ce qu'un rétro-test ?** *Une comparaison de la VaR et du P&L — habituellement la **VaR au temps $t$** contre le **P&L au temps $t+1$**.*

**Pourquoi rétro-tester ?**

- **On y est obligé** (exigence réglementaire).
- Cela fournit un **contrôle de réalité** sur les calculs.
- Cela **aide à trouver les erreurs**.
- Cela **identifie les changements de profil de risque**.

**La granularité.** *Descendre jusqu'au niveau du desk (il faut documenter les valeurs aberrantes) · souvent il faut **agréger** · mais **l'agrégation masque les pics** · les livres scindés posent problème.*

**Les difficultés.** Livres scindés · P&L *front office* ou *back office* · **moment de reconnaissance du P&L** · réorganisations · maintenance des données · fréquence des mises à jour · **inclure les sauts à la hausse ?**

> **La logique statistique du rétro-test.** Une VaR à $99\,\%$ doit être dépassée environ $1\,\%$ du temps — soit environ $2{,}5$ fois par an sur $250$ jours ouvrés. Le nombre de dépassements suit une **binomiale** $\mathcal B(250;0{,}01)$. Beaucoup plus, et le modèle sous-estime le risque ; beaucoup moins, et il est trop conservateur — ce qui coûte du capital. C'est ce comptage qui fonde les régimes de surcharge en capital des régulateurs.

## Comment résoudre l'exercice type (protocole)

1. **Identifier la nature des positions** : prix (actions, change, matières premières) ou **taux** (obligations) ⟹ DV01 obligatoire.
2. **Construire la série de rendements** et vérifier les données (graphiques, seuil à $2$ écarts-types).
3. **Estimer** $\sigma$ (ou $\Sigma$), en décidant de la période et de la **pondération**.
4. **Construire le vecteur de positions** $X$, en y **incorporant les DV01** pour les lignes de taux.
5. **Calculer** $\sigma_P=\sqrt{X^T\Sigma X}$, puis $VaR=2{,}33\,\sigma_P$ (ou $1{,}64$ à $95\,\%$).
6. **Décomposer** : VaR absolue (annuler tout sauf la ligne) et VaR marginale (annuler la ligne seule, ou rapport covariance/variance).
7. **Compléter** par des tests de résistance et une analyse de scénarios — *la VaR isolée ne vaut rien*.
8. **Rétro-tester** : VaR à $t$ contre P&L à $t+1$, compter les dépassements.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « perte à $99\,\%$ » sur un actif | $\text{position}\times\sigma\times2{,}33$ |
| « à $95\,\%$ » | remplacer $2{,}33$ par $1{,}64$ |
| position obligataire, données de **taux** | **DV01** ; volatilité en **points de base** |
| plusieurs actifs, matrice fournie | $2{,}33\sqrt{X^T\Sigma X}$ |
| « contribution d'un desk au risque total » | **VaR marginale** = $\mathrm{Cov}(\text{parent},\text{enfant})/\mathrm{Var}(\text{parent})\times VaR$ |
| « sans hypothèse de distribution » | **simulation historique**, statistique d'ordre |
| « produit dépendant du chemin », « optionnel » | **Monte-Carlo** |
| « générer des chocs corrélés » | factoriser $\Sigma$ (Cholesky ou spectrale), puis $R\Lambda^{1/2}E^T$ |
| « le modèle est-il correct ? » | ***backtesting*** : compter les dépassements |

### Exercices progressifs

**Niveau 1** — Une position de $1$ M€ en actions a une volatilité quotidienne de $1{,}5\,\%$. Calculez la VaR à $99\,\%$ puis à $95\,\%$.

<details><summary>Correction</summary>

**À $99\,\%$.**

$$VaR_{99\%}=1\,000\,000\times0{,}015\times2{,}33=34\,950\ \text{€}$$

**À $95\,\%$.**

$$VaR_{95\%}=1\,000\,000\times0{,}015\times1{,}64=24\,600\ \text{€}$$

**Interprétation.** Un jour sur cent, on s'attend à perdre plus de $34\,950$ € ; un jour sur vingt, plus de $24\,600$ €.

**Le rapport** $24\,600/34\,950=1{,}64/2{,}33\approx70{,}4\,\%$ — c'est exactement le repère normal du cours. Sur des données réelles, ce rapport s'écarte de $71\,\%$ précisément dans la mesure où les queues sont plus épaisses que la gaussienne.

</details>

**Niveau 2** — Pourquoi une position obligataire exige-t-elle un traitement différent ?

<details><summary>Correction</summary>

**Le problème.** Pour une action, la série disponible **est** la série de prix : la volatilité des rendements se traduit directement en volatilité de valeur, et $\text{position}\times\text{prix}\times2{,}33\sigma$ suffit.

Pour une obligation, les séries disponibles sont des **séries de taux**, alors que le risque porte sur le **prix**. Il faut donc un pont entre variation de taux et variation de prix.

**Le pont : le DV01.** C'est la variation de prix pour une hausse de **1 point de base** du taux. Le schéma de calcul devient :

$$\underbrace{\text{position}\times DV01}_{\text{sensibilité à 1 pb}}\times\underbrace{\text{niveau du taux}\times\text{vol relative}\times2{,}33}_{\text{mouvement de taux à }99\%,\text{ en pb}}$$

**Sur l'exemple du cours.** Taux à $4{,}644\,\%$, volatilité relative de $1{,}312\,\%$ :

- volatilité **absolue** du taux : $4{,}644\times1{,}312\,\%=6{,}09$ pb par jour ;
- mouvement à $99\,\%$ : $2{,}33\times6{,}09=14{,}2$ pb ;
- $DV01=0{,}07923$ pour $100$ de nominal et par pb ;
- $VaR=14{,}2\times0{,}07923\approx\mathbf{1{,}12}$ pour une position de $100$.

⚠️ **Et le piège que le cours signale en capitales : les unités.** DV01 par $100$ ou par million ? Volatilité relative ou absolue ? Taux en décimal, pourcentage ou points de base ? Chaque confusion vaut un facteur $100$ ou $10\,000$.

</details>

**Niveau 3** — Un desk a une VaR autonome de $30$ M€ mais une VaR marginale de $14$ M€. Qu'est-ce que cela signifie, et pourquoi les VaR autonomes ne s'additionnent-elles pas ?

<details><summary>Correction</summary>

**L'interprétation.** Isolé, ce desk risque $30$ M€ à $99\,\%$. Mais **fermer le desk** ne réduirait la VaR de la firme que de $14$ M€. Les $16$ M€ d'écart sont **absorbés par la diversification** : les positions du desk sont partiellement **couvertes naturellement** par le reste de la firme.

**Pourquoi les VaR autonomes ne s'additionnent pas.** C'est la sous-additivité de la fiche 51 : sous normalité,

$$\sigma_{a+b}^2=\sigma_a^2+\sigma_b^2+2\rho\sigma_a\sigma_b\ \leq\ (\sigma_a+\sigma_b)^2$$

avec égalité **seulement si $\rho=1$**. Dès que la corrélation est inférieure à $1$, le tout risque moins que la somme des parties.

**Pourquoi la définition marginale du cours est la bonne.** Elle est **exactement additive**. Si $y=\sum_kc_k$ :

$$\mathrm{Var}(y)=\mathrm{Cov}\Big(y,\sum_kc_k\Big)=\sum_k\mathrm{Cov}(y,c_k)$$

En divisant par $\mathrm{Var}(y)$, les rapports somment à $1$, donc

$$\sum_k\frac{\mathrm{Cov}(\text{parent},c_k)}{\mathrm{Var}(\text{parent})}\times VaR_{\text{parent}}=VaR_{\text{parent}}$$

**L'usage managérial.** C'est la VaR **marginale** qui doit servir à allouer le capital et à fixer les limites — pas la VaR autonome, qui surestime systématiquement la contribution de chaque unité.

⚠️ **La limite à garder en tête.** Le desk dont la contribution marginale est faible aujourd'hui peut la voir exploser demain : les corrélations **basculent du neutre au directionnel quand les marchés sont sous tension**. La diversification apparente disparaît exactement au moment où l'on en a besoin.

</details>

**Niveau 4 — type examen** — Comparez les trois méthodologies : hypothèses, forces, faiblesses, et quand utiliser laquelle.

<details><summary>Correction</summary>

|  | **Variance-covariance** | **Simulation historique** | **Monte-Carlo** |
|---|---|---|---|
| Hypothèse centrale | normalité multivariée, linéarité | **stationnarité** des données | densité spécifiée (souvent normale multivariée) |
| Calcul | $2{,}33\sqrt{X^T\Sigma X}$ | classer les P&L, $n$-ième pire | simuler, revaloriser, classer |
| Coût | **très faible** | modéré | **élevé** |
| Non linéarités / options | mal traitées (linéaire) | traitées (revalorisation) | **bien traitées** |
| Queues épaisses | **non** | **oui** (dans les données) | seulement si on les modélise |
| Besoin en données | matrice $\Sigma$ | **beaucoup** d'historique | matrice $\Sigma$ + modèle |
| Vérifiabilité | facile | **facile** | *« difficile de faire de petites erreurs »* |

**Variance-covariance.** *Forces* : rapidité, décomposition analytique immédiate en VaR absolue et marginale, tout tient dans un tableur avec `MMULT()`. *Faiblesses* : suppose la normalité — d'où le $1{,}5\,\%$ de dépassements observés sur l'IPC au lieu de $1\,\%$ — et l'approximation **linéaire**, qui échoue sur les options. *Quand* : portefeuilles linéaires, calcul quotidien de masse, horizon court.

**Simulation historique.** *Forces*, telles que le cours les liste : **simple**, **intuitivement séduisante**, **non paramétrique**, **agrégation facile**. En prime, l'activité des spreads de crédit est intégrée d'office et l'analyse de scénarios est automatique. *Faiblesses* : besoin de beaucoup de données, absence d'historique pour les **produits nouveaux**, et surtout l'hypothèse de **stationnarité** — on suppose que le passé récent représente l'avenir. *Quand* : c'est le choix par défaut de la plupart des banques, sauf sur les portefeuilles très optionnels.

**Monte-Carlo.** *Forces* : la seule méthode qui gère vraiment les produits **dépendants du chemin**, les portefeuilles **convexes**, le **risque de saut** et l'exposition de crédit ; on peut simuler n'importe quelle densité. *Faiblesses* : coûteuse, et **telle qu'elle est mise en œuvre**, elle réintroduit la normalité multivariée — le retour à la moyenne et la diffusion à sauts doivent être **ajoutés explicitement**. Difficultés numériques : valeurs propres négatives, précision, temps de calcul.

**La conclusion du cours, qui vaut pour les trois.** *Les chiffres de VaR pris isolément ne valent rien.* Quelle que soit la méthode, il faut :

- **calculer quotidiennement et comparer** dans le temps ;
- **compléter** par des tests de résistance et une analyse de scénarios — parce que aucune des trois ne couvre le risque de rupture de régime, et que *les corrélations basculent du neutre au directionnel quand les marchés sont sous tension* ;
- **rétro-tester** : VaR à $t$ contre P&L à $t+1$, et compter les dépassements contre la binomiale attendue.

**Et le rappel de la fiche 51 qu'il faut mentionner.** La VaR, quelle que soit la méthode de calcul, **n'est pas une mesure de risque cohérente** : elle n'est **pas sous-additive**, donc elle peut punir la diversification. Elle reste excellente pour le **reporting** — un seuil unique se communique bien — mais pour agréger des risques ou optimiser un portefeuille, la **CVaR** lui est théoriquement supérieure.

</details>

## 🔴 Common mistakes

1. **Oublier la racine carrée** — $X^T\Sigma X$ est une **variance** ; il faut $\sqrt{X^T\Sigma X}$ avant de multiplier par $2{,}33$.
2. **Se tromper d'unités sur les obligations** — DV01 par $100$ ou par million, taux en décimal ou en points de base, volatilité relative ou absolue. *L'erreur la plus facile à commettre.*
3. **Confondre $2{,}33$ et $1{,}64$** — $99\,\%$ contre $95\,\%$, et toujours en **unilatéral**.
4. **Appliquer la VaR aux niveaux plutôt qu'aux rendements** — les niveaux ne sont pas stationnaires.
5. **Oublier le signe des positions courtes** — simple pour les actions, **délicat pour le change**.
6. **Additionner des VaR autonomes** — elles ne s'additionnent pas ; seules les VaR **marginales** le font.
7. **Croire que la VaR paramétrique capture les queues** — elle suppose la normalité ; le cours observe $1{,}5\,\%$ de dépassements au lieu de $1\,\%$.
8. **Utiliser Cholesky sur une matrice non définie positive** — elle échoue ; passer à la décomposition spectrale.
9. **Oublier que les corrélations basculent en crise** — d'où l'obligation de compléter par des tests de résistance.
10. **Publier une VaR sans rétro-test** — *les chiffres de VaR pris isolément ne valent rien*.
11. **Agréger sans conserver le détail** — l'agrégation **masque les pics**, et le P&L peut être dominé par très peu de positions.

## 📌 Ultimate Review

1. **Mission** : informer la direction, protéger contre la concentration des risques — **pas de surprises**.
2. **Objectif** : estimer les **$1\,\%$ pires issues**.
3. **Pourquoi les rendements** : les niveaux suivent des marches aléatoires non bornées ; les rendements ont une distribution exploitable.
4. **Multiplicateurs normaux** : $2{,}33\sigma$ à $99\,\%$, $1{,}64\sigma$ à $95\,\%$ ; rapport $\approx71\,\%$.
5. **VaR à un actif, 5 étapes** : prix ⟶ rendements ⟶ variance ⟶ volatilité ⟶ $\times2{,}33\times$ position.
6. **Exemple IPC** : $\sigma=1{,}8012\,\%$, $VaR=4{,}1968\,\%$ ; observé : **8 dépassements**, $1{,}5\,\%$ du temps au lieu de $1\,\%$.
7. **Taux** : $\text{position}\times PV01\times\text{cours}\times\text{vol}\times2{,}33\times100$ ; UST 10 ans ⟹ $VaR=1{,}12$ pour $100$.
8. **DV01 contre duration** : les traders pensent DV01, les gérants duration ; **attention aux unités**.
9. **Spread PV01** : distinguer risque de taux et risque de crédit ; $PV01=CSPV01$ seulement si recouvrement nul.
10. **Covariance** $=\sum(x_i-\bar x)(y_i-\bar y)/(n-1)$ ; **corrélation** $=\mathrm{cov}/(\sigma_a\sigma_b)$, sans unité, indice de linéarité.
11. **Règles** : $\mathrm{var}(a+b)=\mathrm{var}(a)+\mathrm{var}(b)+2\mathrm{cov}(ab)$ ; $\mathrm{var}(xa+yb)=x^2\mathrm{var}(a)+y^2\mathrm{var}(b)+2xy\,\mathrm{cov}(ab)$.
12. **Forme matricielle** : $\sigma_P^2=X^T\Sigma X$, $VaR=2{,}33\sqrt{X^T\Sigma X}$ ; `MMULT()` et `TRANSPOSE()`, validation par **Ctrl-Maj-Entrée**.
13. **Choix de mise en œuvre** : période, **pondération exponentielle** $\mathrm{cov}_w=\sum w_i(x_i-\bar x)(y_i-\bar y)/\sum w_i$, *bucketing*, fréquence, % ou log, intervalle, unités.
14. **VaR absolue** : annuler toutes les positions sauf une. **VaR marginale** : annuler la position seule, ou $\mathrm{Cov}(\text{parent},\text{enfant})/\mathrm{Var}(\text{parent})\times VaR_{\text{parent}}$ — **exactement additive**.
15. **Simulation historique** : revaloriser avec les prix passés, classer, **$n$-ième pire**. Forces : simple, intuitive, **non paramétrique**, agrégation facile. Faiblesses : besoin de données, produits nouveaux, **stationnarité**.
16. **Ses 8 étapes** : positions ⟶ *bucketing* ⟶ sensibilités ⟶ historique ⟶ rendements ⟶ choc ⟶ P&L ⟶ classement.
17. **Monte-Carlo, 7 étapes** : uniformes ⟶ normales (**Box-Muller**) ⟶ matrice de covariance ⟶ **factorisation** ⟶ chocs corrélés ⟶ revalorisation ⟶ VaR.
18. **Factorisation** : **Cholesky** $S=LL^T$ (simple, exige la définie-positivité) ou **spectrale** $S=E\Lambda E^T$ (complexe, robuste). Chocs : $R\Lambda^{1/2}E^T\sim N(0,S)$.
19. **Vérifications** : recréer $\Sigma$ · $\hat\sigma^2/\sigma^2\sim F(m-1,k-1)$ · $\hat\rho\sim N(\rho,(1-\rho^2)/n)$ · **test M de Box**.
20. **Faiblesses de Monte-Carlo** : normalité multivariée, corrélation sérielle, asymétrie, kurtosis ; ajustements nécessaires pour le retour à la moyenne et les sauts.
21. ***Backtesting*** : VaR à $t$ contre P&L à $t+1$ ; obligatoire, contrôle de réalité, détection d'erreurs, changements de profil de risque. **L'agrégation masque les pics.**

**Formulas to know**

$$VaR_{99\%}=\text{position}\times\sigma\times2{,}33 \qquad VaR_{95\%}=\text{position}\times\sigma\times1{,}64$$

$$VaR_{\text{taux}}=\text{position}\times PV01\times\text{cours}\times\text{vol}\times2{,}33\times100 \qquad \sigma_P^2=X^T\Sigma X$$

$$\text{VaR marginale}=\frac{\mathrm{Cov}(\text{parent},\text{enfant})}{\mathrm{Var}(\text{parent})}\times VaR_{\text{parent}} \qquad R\,\Lambda^{1/2}E^T\sim N(0,S)$$

**Methods to know** : la chaîne en 5 étapes de la VaR à un actif ; la décomposition en unités du calcul obligataire ; les 8 étapes de la simulation historique ; les 7 étapes de Monte-Carlo ; la preuve d'additivité des VaR marginales.

## 🧠 Active Recall

**Basic** — Quels sont les multiplicateurs de VaR à $99\,\%$ et $95\,\%$, et sous quelle hypothèse ?

<details><summary>Réponse</summary>

$$VaR_{99\%}=2{,}33\times\sigma\times\text{position}, \qquad VaR_{95\%}=1{,}64\times\sigma\times\text{position}$$

Ce sont les **quantiles unilatéraux de la loi normale standard** : $\Phi^{-1}(0{,}99)\approx2{,}326$ et $\Phi^{-1}(0{,}95)\approx1{,}645$.

**L'hypothèse est la normalité des rendements** — et c'est précisément la faiblesse de la méthode paramétrique. Le cours le montre sur l'IPC : la VaR à $99\,\%$ a été dépassée **$1{,}5\,\%$ du temps** au lieu de $1\,\%$.

</details>

**Understanding** — Pourquoi calcule-t-on la VaR sur les rendements et non sur les niveaux de prix ?

<details><summary>Réponse</summary>

Parce que *la plupart des séries financières suivent des **marches aléatoires***, dont la meilleure prévision pour demain est la valeur d'aujourd'hui. Les niveaux ne sont donc **pas bornés** et leur histogramme n'est pas une distribution de probabilité : il ne fait que résumer le chemin parcouru, et dépend entièrement du point de départ et de la période — le cours l'illustre par l'histogramme des niveaux de l'IPC, inexploitable.

Les **rendements**, en revanche, sont approximativement **stationnaires** : leur histogramme *retrouve un profil familier*, une forme en cloche. Et c'est la stationnarité qui autorise à lire un quantile estimé sur le passé comme une prévision pour demain.

⚠️ C'est exactement l'hypothèse de stationnarité de la fiche 52 — et c'est aussi elle que la simulation historique suppose, comme le cours le signale dans ses faiblesses.

</details>

**Application** — Deux positions, $\sigma_1=2\,\%$ sur $10$ M€ et $\sigma_2=3\,\%$ sur $5$ M€, corrélation $0{,}4$. Quelle est la VaR du portefeuille à $99\,\%$ ?

<details><summary>Réponse</summary>

**Étape 1 — les volatilités en euros.**

$$s_1=10\,000\,000\times0{,}02=200\,000, \qquad s_2=5\,000\,000\times0{,}03=150\,000$$

**Étape 2 — la variance du portefeuille.**

$$\sigma_P^2=s_1^2+s_2^2+2\rho s_1s_2=200\,000^2+150\,000^2+2\times0{,}4\times200\,000\times150\,000$$

$$=4{,}0\times10^{10}+2{,}25\times10^{10}+2{,}4\times10^{10}=8{,}65\times10^{10}$$

**Étape 3 — l'écart-type.**

$$\sigma_P=\sqrt{8{,}65\times10^{10}}\approx294\,109\ \text{€}$$

**Étape 4 — la VaR.**

$$VaR_{99\%}=2{,}33\times294\,109\approx\mathbf{685\,274}\ \text{€}$$

**Le bénéfice de la diversification.** La somme des VaR autonomes vaut $2{,}33\times(200\,000+150\,000)=815\,500$ €. On économise $130\,226$ €, soit $16\,\%$, uniquement parce que $\rho=0{,}4<1$.

⚠️ **Et si les marchés se tendent, $\rho$ monte vers $1$** et ce bénéfice s'évapore : à $\rho=1$, $\sigma_P=350\,000$ et $VaR=815\,500$ €, exactement la somme des VaR autonomes.

</details>

**Comparison** — Simulation historique contre variance-covariance : laquelle et quand ?

<details><summary>Réponse</summary>

|  | **Variance-covariance** | **Simulation historique** |
|---|---|---|
| Hypothèse | **normalité** + linéarité | **stationnarité** |
| Ce qu'elle exige | une matrice $\Sigma$ | **beaucoup** d'historique |
| Queues épaisses | non capturées | **capturées** (dans les données) |
| Non-linéarités / options | mal traitées | traitées par revalorisation |
| Coût | très faible | modéré |
| Décomposition marginale | analytique immédiate | via les vecteurs de P&L |

**Variance-covariance** quand : portefeuille **linéaire**, calcul quotidien de masse, besoin de décomposer analytiquement le risque par facteur. C'est la méthode du tableur — `MMULT()`, `TRANSPOSE()`, $2{,}33\sqrt{X^T\Sigma X}$.

**Simulation historique** quand : les queues comptent, il y a des options ou des spreads de crédit, on veut éviter toute hypothèse de distribution. Ses quatre forces selon le cours : **simple**, **intuitivement séduisante**, **non paramétrique**, **agrégation facile** — plus l'activité de spread intégrée d'office et l'analyse de scénarios automatique.

**La faiblesse commune** : ni l'une ni l'autre n'anticipe une **rupture de régime**. La première est calibrée sur un régime calme ; la seconde suppose que le passé récent représente l'avenir. D'où l'obligation, dans les deux cas, de compléter par des **tests de résistance**.

</details>

**Exam-style** — Détaillez les sept étapes d'un calcul de VaR par Monte-Carlo et dites où sont les difficultés.

<details><summary>Réponse</summary>

**a) Génération de nombres aléatoires uniformes.** Trois types : **vrais aléas** (impossibles par ordinateur, il faut une source physique comme la désintégration radioactive), **quasi-aléatoires** (difficiles, optimisent l'uniformité) et **pseudo-aléatoires** (algorithmiques, méthode dominante, voir Knuth).

**b) Conversion en normales.** Appliquer l'inverse de la fonction de répartition normale aux tirages uniformes, ou la **méthode de Box-Muller**.

**c) Construction de la matrice de covariance.** Acheter ou construire ; décider de la couverture, du traitement des données manquantes, de la pondération et de l'intervalle de différenciation.

**d) Factorisation de la matrice** — *la partie la plus complexe*. Objectif : une matrice « racine carrée ».

- **Cholesky** : $S=LL^T$, triangulaire inférieure. Plus simple, mais **exige une matrice définie positive**.
- **Spectrale** : $S=E\Lambda E^T$. Plus complexe, **plus robuste**.

**e) Création des chocs corrélés.** Si $R\sim N(0,I_n)$, alors

$$R\,\Lambda^{1/2}E^T\sim N(0,S)$$

*Pourquoi* : $\mathrm{Cov}(E\Lambda^{1/2}R)=E\Lambda^{1/2}\Lambda^{1/2}E^T=E\Lambda E^T=S$.

**f) Revalorisation.** **Exacte** (plus juste, lourde) ou **paramétrique** (rapide, précise, mais les dérivées croisées créent du bruit) ; on peut aussi utiliser des **grilles de valorisation**.

**g) Estimation de la VaR.** Calculer le P&L, ordonner, prendre le $n$-ième plus grand cas ; grouper et trier pour les sous-portefeuilles.

**Les difficultés.**

- **Numériques** : **valeurs propres négatives** (une covariance empirique mal construite cesse d'être semi-définie positive — Cholesky échoue, la décomposition spectrale survit), précision, temps de calcul, stockage, traçabilité des erreurs.
- **De modèle** : *l'hypothèse de normalité multivariée* — corrélation sérielle, **asymétrie**, **kurtosis** ignorées. Il faut **ajuster explicitement** pour simuler le retour à la moyenne et la diffusion à sauts.

**Les contrôles indispensables.** *Il est difficile de faire de petites erreurs* — autrement dit, une erreur de factorisation produit des résultats grossièrement faux, ce qui est plutôt une bonne nouvelle. On vérifie en **recréant la matrice de covariance** à partir des tirages, en testant les variances par $F$ ou $\chi^2$ ($\hat\sigma^2/\sigma^2\sim F(m-1,k-1)$), les corrélations par un test $z$ ($\hat\rho\sim N(\rho,(1-\rho^2)/n)$), et globalement par le **test M de Box**.

**Le paradoxe final, qu'il faut savoir énoncer.** Monte-Carlo est en principe la méthode la plus flexible — n'importe quelle densité est simulable — mais telle qu'elle est mise en œuvre, avec une matrice de covariance et des tirages gaussiens, elle **réintroduit exactement la normalité** que la simulation historique évitait. Sa vraie valeur ajoutée est ailleurs : les produits **dépendants du chemin**, les portefeuilles **convexes**, le **risque de saut** et l'**exposition de crédit**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La mission du risk management ? | Informer, protéger contre la concentration — **pas de surprises** |
| Que cherche-t-on à estimer ? | Les **$1\,\%$ pires issues possibles** |
| Multiplicateur à $99\,\%$ ? | $2{,}33$ |
| Multiplicateur à $95\,\%$ ? | $1{,}64$ |
| Pourquoi les rendements et non les niveaux ? | Les niveaux suivent des marches aléatoires **non bornées** |
| Formule de la variance ? | $\sum(x_i-\bar x)^2/(n-1)$ |
| VaR à un actif ? | $\text{position}\times\sigma\times2{,}33$ |
| Résultat sur l'IPC ? | $\sigma=1{,}8012\,\%$, $VaR=4{,}1968\,\%$ |
| Dépassements observés ? | **8 fois**, soit $1{,}5\,\%$ au lieu de $1\,\%$ |
| Ce problème disparaît où ? | Au niveau du **portefeuille** |
| Pourquoi les obligations diffèrent ? | Les séries disponibles sont des **taux**, le risque porte sur le **prix** |
| Qu'est-ce que le DV01 ? | La variation de prix pour **1 point de base** de taux |
| Duration contre DV01 ? | Traders : DV01 ; gérants : duration. **Attention aux unités !** |
| Quand $PV01=CSPV01$ ? | Si le **recouvrement est nul** |
| Formule de la covariance ? | $\sum(x_i-\bar x)(y_i-\bar y)/(n-1)$ |
| Corrélation ? | $\mathrm{Cov}(a,b)/(\sigma_a\sigma_b)$ — sans unité |
| Connaît-on les covariances à partir des corrélations ? | **Non** — l'inverse seulement |
| Variance d'une somme ? | $\mathrm{var}(a)+\mathrm{var}(b)+2\mathrm{cov}(a,b)$ |
| Variance avec quantités ? | $x^2\mathrm{var}(a)+y^2\mathrm{var}(b)+2xy\,\mathrm{cov}(ab)$ |
| Forme matricielle de la variance ? | $X^T\Sigma X$ |
| VaR matricielle à $99\,\%$ ? | $2{,}33\sqrt{X^T\Sigma X}$ |
| Fonctions Excel ? | `MMULT()` et `TRANSPOSE()`, **Ctrl-Maj-Entrée** |
| Covariance pondérée exponentiellement ? | $\sum w_i(x_i-\bar x)(y_i-\bar y)/\sum w_i$ |
| Que fait le *bucketing* ? | Réduit la **granularité** — sans perte de précision s'il est bien fait |
| Problème des corrélations en crise ? | Elles **basculent** du neutre au directionnel |
| VaR absolue ? | Annuler toutes les positions sauf celle d'intérêt |
| VaR marginale ? | $\mathrm{Cov}(\text{parent},\text{enfant})/\mathrm{Var}(\text{parent})\times VaR_{\text{parent}}$ |
| Propriété clé de la VaR marginale ? | Les marginales **somment** à la VaR du parent |
| Principe de la simulation historique ? | Revaloriser avec les prix passés, classer, **$n$-ième pire** |
| Ses quatre forces ? | Simple · intuitive · **non paramétrique** · agrégation facile |
| Sa faiblesse centrale ? | Suppose la **stationnarité** |
| Première étape de la simulation historique ? | **Savoir ce qu'on possède** — 90 % du métier |
| Origine du nom Monte-Carlo ? | Le **projet Manhattan**, par analogie avec les jeux de hasard |
| Seule exigence de Monte-Carlo ? | Que le système soit descriptible par des **densités** |
| Uniforme vers normale ? | Inverse de la fonction de répartition — **Box-Muller** |
| Cholesky ? | $S=LL^T$, simple, exige une matrice **définie positive** |
| Décomposition spectrale ? | $S=E\Lambda E^T$, plus complexe, **plus robuste** |
| Création de chocs corrélés ? | $R\,\Lambda^{1/2}E^T\sim N(0,S)$ |
| Tester les corrélations simulées ? | $\hat\rho\sim N(\rho,(1-\rho^2)/n)$ |
| Problème numérique majeur ? | **Valeurs propres négatives** |
| Qu'est-ce qu'un rétro-test ? | VaR à $t$ contre P&L à $t+1$ |
| Danger de l'agrégation en rétro-test ? | Elle **masque les pics** |
| Rapport $VaR_{95}/VaR_{99}$ sous normalité ? | $1{,}65/2{,}33\approx71\,\%$ |
