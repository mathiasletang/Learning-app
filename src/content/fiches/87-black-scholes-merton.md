# Fiche 87 — Le modèle de Black-Scholes-Merton

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 14 « The Black-Scholes-Merton Model » |
| **Difficulté** | Must know — le chapitre central du livre |
| **Temps d'étude estimé** | 2 h 15 |
| **Prérequis** | Fiches 83, 85, 86 · **complément** : fiche 57 (approche risque-neutre, MIT) |
| **Concepts clés** | Loi log-normale, rendement espéré vs rendement réalisé, volatilité historique, EDP de Black-Scholes-Merton, portefeuille sans risque, valorisation risque-neutre, formules fermées, $d_1$ et $d_2$, dilution des warrants, volatilité implicite, indice VIX, dividendes, approximation de Black |
| **Poids à l'examen** | Les **deux formules** et leurs $d_1,d_2$ · la **dérivation de l'EDP** · $\mu$ **contre** $\mu-\sigma^2/2$ · l'ajustement pour dividendes ($S_0-D$). |

## 🎯 Vue d'ensemble

```
LOI          ln S_T ~ N( ln S₀ + (μ − σ²/2)T , σ²T )    →  E(S_T) = S₀e^{μT}
PIÈGE        rendement ARITHMÉTIQUE μ  ≠  rendement RÉALISÉ μ − σ²/2
COUVERTURE   −1 dérivé  +  ∂f/∂S actions  →  le dz DISPARAÎT
EDP          ∂f/∂t + rS ∂f/∂S + ½σ²S² ∂²f/∂S² = rf
CLÉ          μ n'y figure PAS  →  on peut supposer le monde risque-neutre
FORMULES     c = S₀N(d₁) − Ke^{−rT}N(d₂)     p = Ke^{−rT}N(−d₂) − S₀N(−d₁)
             d₁ = [ln(S₀/K) + (r + σ²/2)T] / (σ√T)      d₂ = d₁ − σ√T
DIVIDENDES   remplacer S₀ par S₀ − D   (D = valeur actuelle des dividendes)
```

**L'histoire, et pourquoi elle compte.** *Au début des années 1970, **Fischer Black, Myron Scholes et Robert Merton** réalisent une percée majeure. En **1997**, Merton et Scholes reçoivent le prix Nobel d'économie ; **Black est mort en 1995**, sans quoi il l'aurait sans nul doute partagé.*

> **La difficulté que les prédécesseurs n'avaient pas franchie.** *Des chercheurs antérieurs avaient fait des hypothèses similaires et **correctement calculé le payoff espéré** d'une option européenne. Mais **il est difficile de connaître le bon taux d'actualisation** de ce payoff.*
>
> **Deux réponses différentes.** *Black et Scholes ont utilisé le **MEDAF** pour relier le rendement exigé sur l'option à celui de l'action — ce ne fut **pas facile**, car la relation dépend à la fois du prix de l'action et du temps. **L'approche de Merton était différente** : construire un **portefeuille sans risque** composé de l'option et de l'action, et arguer que son rendement sur une courte période doit être le taux sans risque. C'est ce que nous avons fait en 12.1 — **mais en plus compliqué, parce que le portefeuille change continuellement**. **L'approche de Merton était plus générale : elle ne repose pas sur les hypothèses du MEDAF.*** C'est celle que suit ce chapitre.

## 🔴 Concept 1 — La loi log-normale du prix

Du chapitre 13 :

$$\boxed{\ln S_T\sim\phi\!\left(\ln S_0+\left(\mu-\frac{\sigma^2}{2}\right)T,\ \sigma^2T\right)}\;\text{(14.3)}$$

**$S_T$ est donc log-normale**, d'écart-type logarithmique $\sigma\sqrt T$.

> **La forme de la loi.** *Une variable log-normale peut prendre **toute valeur entre zéro et l'infini**. Contrairement à la normale, elle est **asymétrique**, de sorte que **moyenne, médiane et mode sont tous différents**.*

$$\boxed{\mathbb E(S_T)=S_0e^{\mu T}}\;\text{(14.4)}\qquad\qquad\boxed{\mathrm{Var}(S_T)=S_0^2e^{2\mu T}\big(e^{\sigma^2T}-1\big)}\;\text{(14.5)}$$

<details><summary>**Deux exercices résolus — intervalle de confiance et moments (exemples 14.1 et 14.2)**</summary>

**Exemple 14.1 — l'intervalle à 95 %.** $S_0=40$, $\mu=16\,\%$, $\sigma=20\,\%$, $T=0{,}5$. *Étape 1 — la loi de $\ln S_T$.*

$$\ln S_T\sim\phi\big[\ln40+(0{,}16-0{,}02)\times0{,}5,\ 0{,}04\times0{,}5\big]=\phi(3{,}759;\ 0{,}02)$$

*Étape 2 — l'écart-type.* $\sqrt{0{,}02}=\mathbf{0{,}141}$. *Étape 3 — l'intervalle **sur le logarithme**.* À 95 % :

$$3{,}759-1{,}96\times0{,}141<\ln S_T<3{,}759+1{,}96\times0{,}141$$

*Étape 4 — **exponentier**.*

$$e^{3{,}4824}<S_T<e^{4{,}0356}\qquad\Longrightarrow\qquad\boxed{32{,}55<S_T<56{,}56}$$

⚠️ **L'intervalle n'est PAS symétrique autour de 40.** Il descend de 7,45 et monte de 16,56 : c'est l'asymétrie log-normale. On construit **toujours** l'intervalle sur $\ln S_T$, **jamais** sur $S_T$.

**Exemple 14.2 — moyenne et variance.** $S_0=20$, $\mu=20\,\%$, $\sigma=40\,\%$, $T=1$.

$$\mathbb E(S_T)=20e^{0{,}2}=\mathbf{24{,}43}$$

$$\mathrm{Var}(S_T)=400e^{0{,}4}\big(e^{0{,}16}-1\big)=400\times1{,}4918\times0{,}1735=\mathbf{103{,}54}\quad\Rightarrow\quad\mathrm{sd}=\sqrt{103{,}54}=\mathbf{10{,}18}$$

</details>

## 🔴 Concept 2 — Le piège du rendement espéré

**Le rendement capitalisé en continu réalisé entre 0 et $T$**, noté $x$, vérifie $S_T=S_0e^{xT}$, soit $x=\frac1T\ln\frac{S_T}{S_0}$. D'où, par (14.2) :

$$\boxed{x\sim\phi\!\left(\mu-\frac{\sigma^2}{2},\ \frac{\sigma^2}{T}\right)}\;\text{(14.7)}$$

⚠️ **Deux observations dans cette seule formule.**

1. **La moyenne est $\mu-\sigma^2/2$, pas $\mu$.**
2. **L'écart-type $\sigma/\sqrt T$ *décroît* avec $T$** : *nous sommes **plus certains** du rendement moyen par an sur 20 ans que du rendement d'une seule année.*

**Exemple 14.3.** $\mu=17\,\%$, $\sigma=20\,\%$, $T=3$ ans. Moyenne $=0{,}17-0{,}02=\mathbf{15\,\%}$ ; écart-type $=\sqrt{0{,}04/3}=\mathbf{11{,}55\,\%}$. À 95 % : le rendement moyen réalisé sur 3 ans sera entre $15-1{,}96\times11{,}55=\mathbf{-7{,}6\,\%}$ et $15+1{,}96\times11{,}55=\mathbf{+37{,}6\,\%}$ par an.

<details><summary>**Pourquoi $\mathbb E(x)\ne\mu$ — la démonstration, et l'exemple des fonds communs**</summary>

**La démonstration mathématique.** Partant de $\mathbb E(S_T)=S_0e^{\mu T}$ et en prenant le logarithme :

$$\ln\big[\mathbb E(S_T)\big]=\ln S_0+\mu T$$

*Il est alors **tentant** de poser $\ln[\mathbb E(S_T)]=\mathbb E[\ln(S_T)]$, ce qui donnerait $\mathbb E(x)=\mu$. **Mais on ne peut pas faire cela, parce que $\ln$ est une fonction non linéaire.** En fait, par l'inégalité de Jensen,*

$$\ln\big[\mathbb E(S_T)\big]>\mathbb E\big[\ln(S_T)\big]\quad\Longrightarrow\quad \mathbb E\left[\ln\frac{S_T}{S_0}\right]<\mu T\quad\Longrightarrow\quad \boxed{\mathbb E(x)<\mu}$$

**L'explication en mots.** *Sur un grand nombre de très courts intervalles, **la moyenne des rendements de chaque intervalle est proche de $\mu$** — c'est-à-dire que $\mu\Delta t$ est proche de la **moyenne arithmétique** des $\Delta S_i/S_i$. **Mais le rendement sur toute la période couverte est proche de $\mu-\sigma^2/2$, pas de $\mu$.***

**L'exemple des fonds communs.** Un gérant affiche sur cinq ans : **15 %, 20 %, 30 %, −20 %, 25 %**.

*Étape 1 — la moyenne arithmétique.* $(15+20+30-20+25)/5=\mathbf{14\,\%}$. *Étape 2 — ce que 100 devient réellement.*

$$100\times1{,}15\times1{,}20\times1{,}30\times0{,}80\times1{,}25=\mathbf{179{,}40}$$

*Étape 3 — ce que 14 % auraient donné.* $100\times1{,}14^5=\mathbf{192{,}54}$ — **bien davantage**. *Étape 4 — le vrai rendement.* $100\times(1{,}124)^5=179{,}40$, donc **12,4 %**. *Étape 5 — ce qu'il faut dire.* *Il est tentant d'affirmer « la moyenne des rendements annuels réalisés est de 14 % ». **Bien que vrai, c'est trompeur.** Il est bien moins trompeur de dire : « le rendement réalisé par quelqu'un qui a investi chez nous ces cinq dernières années est de **12,4 % par an** ». **Dans certaines juridictions, la réglementation oblige à présenter les rendements de la seconde manière.***

*Étape 6 — le résultat mathématique sous-jacent.* ***La moyenne géométrique d'un ensemble de nombres (non tous égaux) est toujours inférieure à la moyenne arithmétique.*** Ici les multiplicateurs sont 1,15 · 1,20 · 1,30 · 0,80 · 1,25 : moyenne arithmétique **1,140**, moyenne géométrique **1,124**.

⚠️ ***Le terme « rendement espéré » est ambigu*** : il peut désigner $\mu$ **ou** $\mu-\sigma^2/2$. Hull précise : *sauf mention contraire, il désignera **$\mu$** dans tout le livre.*

</details>

## 🔴 Concept 3 — La volatilité et son estimation

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition exacte.</span>

*La volatilité $\sigma$ d'une action est l'**écart-type du rendement procuré par l'action sur un an, exprimé en capitalisation continue***. Valeurs typiques : **15 % à 60 %**.

</div>

**L'approximation courte période.** $\sigma\sqrt{\Delta t}$ est approximativement l'écart-type du **changement en pourcentage** sur $\Delta t$. *Avec $\sigma=30\,\%$ et $S=50$ : sur une semaine, $30\times\sqrt{1/52}=\mathbf{4{,}16\,\%}$, soit un mouvement d'un écart-type de $50\times0{,}0416=\mathbf{2{,}08}$. **L'incertitude croît — au moins approximativement — comme la racine carrée de l'horizon** : l'écart-type à 4 semaines vaut environ **deux fois** celui à 1 semaine.*

**La procédure d'estimation historique.** Avec $n+1$ observations $S_i$ espacées de $\tau$ (en années) :

$$u_i=\ln\frac{S_i}{S_{i-1}}\qquad s=\sqrt{\frac1{n-1}\sum_{i=1}^n(u_i-\bar u)^2}=\sqrt{\frac1{n-1}\sum_{i=1}^nu_i^2-\frac1{n(n-1)}\left(\sum_{i=1}^nu_i\right)^2}$$

Comme l'écart-type des $u_i$ est $\sigma\sqrt\tau$ :

$$\boxed{\hat\sigma=\frac{s}{\sqrt\tau}}\qquad\qquad\text{erreur type}\approx\boxed{\frac{\hat\sigma}{\sqrt{2n}}}$$

*(La moyenne $\bar u$ est souvent supposée **nulle** dans les estimations de volatilité historique.)*

<details><summary>**Exercice résolu — estimer une volatilité sur 21 jours (exemple 14.4)**</summary>

**Données.** 21 cours de clôture consécutifs → $n=20$ rendements, avec

$$\sum u_i=0{,}09531\qquad \sum u_i^2=0{,}00326$$

*Étape 1 — l'écart-type des rendements quotidiens.*

$$s=\sqrt{\frac{0{,}00326}{19}-\frac{0{,}09531^2}{20\times19}}=\sqrt{0{,}00017158-0{,}00002391}=\mathbf{0{,}01216}$$

soit **1,216 %** par jour. *Étape 2 — annualiser.* En supposant **252 jours de bourse** par an, $\tau=1/252$ :

$$\hat\sigma=0{,}01216\times\sqrt{252}=\mathbf{0{,}193}\quad\text{soit }\mathbf{19{,}3\,\%}$$

*Étape 3 — l'erreur type.*

$$\frac{0{,}193}{\sqrt{2\times20}}=\frac{0{,}193}{6{,}325}=\mathbf{0{,}031}\quad\text{soit }\mathbf{3{,}1\,\%}$$

⚠️ **L'erreur type est énorme relativement à l'estimation** — près de **16 %** de sa valeur avec 20 observations. C'est ce qui justifie d'en prendre davantage.

**Le choix de $n$ — un vrai compromis.** *Plus de données donnent généralement plus de précision, **mais $\sigma$ change au cours du temps** et des données trop anciennes peuvent ne pas être pertinentes. Un compromis qui semble raisonnablement bien fonctionner : les **cours de clôture quotidiens des 90 à 180 derniers jours**. Autre règle empirique : prendre $n$ égal au **nombre de jours auxquels la volatilité sera appliquée*** — pour une option à 2 ans, deux ans de données quotidiennes.

**Avec dividendes.** Sur un intervalle contenant une date de détachement :

$$u_i=\ln\frac{S_i+D}{S_{i-1}}$$

et la formule habituelle sur les autres intervalles.

</details>

## 🔴 Concept 4 — L'idée, puis la dérivation de l'EDP

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi un portefeuille sans risque existe.</span>

*Le prix de l'action et le prix du dérivé sont affectés par **la même source d'incertitude sous-jacente** : les mouvements du prix de l'action. Sur une courte période, **le prix du dérivé est parfaitement corrélé au prix de l'action**. Avec un portefeuille approprié, **le gain ou la perte sur l'action compense toujours le gain ou la perte sur le dérivé**, si bien que la valeur du portefeuille en fin de période est **connue avec certitude**.*

</div>

**L'illustration.** Si $\Delta c=0{,}4\,\Delta S$, le portefeuille sans risque est **long 0,4 action, short 1 call**. *Si l'action monte de 10 cents, l'option monte de 4 cents : le gain de $0{,}4\times10=4$ cents sur les actions égale la perte de 4 cents sur l'option vendue.*

⚠️ **La différence majeure avec le binomial.** *En Black-Scholes-Merton, la position est sans risque **pour une durée très courte seulement** — théoriquement **instantanée**. Pour le rester, elle doit être **ajustée, ou rééquilibrée, fréquemment**.* Si la relation passe de $\Delta c=0{,}4\Delta S$ à $\Delta c=0{,}5\Delta S$ en deux semaines, il faut **acheter 0,1 action de plus** par call vendu. *Il n'en reste pas moins que le rendement du portefeuille sans risque sur **toute période très courte** doit être le taux sans risque : **c'est l'élément clé de l'analyse**.*

**Les sept hypothèses.**

1. Le prix de l'action suit le processus du chapitre 13, avec **$\mu$ et $\sigma$ constants**.
2. La **vente à découvert** est permise, avec **plein usage du produit**.
3. **Ni coûts de transaction ni impôts** ; tous les titres sont **parfaitement divisibles**.
4. **Aucun dividende** pendant la vie du dérivé.
5. **Aucune opportunité d'arbitrage** sans risque.
6. La négociation est **continue**.
7. Le taux sans risque $r$ est **constant** et **le même pour toutes les maturités**.

⚠️ *Certaines peuvent être relâchées : $\sigma$ et $r$ peuvent être des **fonctions connues de $t$** ; on peut même **autoriser des taux stochastiques**, pourvu que la loi du prix à maturité reste **log-normale**.*

<details><summary>**La dérivation complète de l'EDP, en six étapes**</summary>

*Étape 1 — le processus de l'action.*

$$dS=\mu S\,dt+\sigma S\,dz\;\text{(14.8)}$$

*Étape 2 — le processus du dérivé, par Itô.* $f$ est fonction de $S$ et $t$, donc par (13.14) :

$$df=\left(\frac{\partial f}{\partial S}\mu S+\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial S^2}\sigma^2S^2\right)dt+\frac{\partial f}{\partial S}\sigma S\,dz\;\text{(14.9)}$$

*Étape 3 — l'observation décisive.* *Les processus de Wiener sous-jacents à $f$ et $S$ sont **les mêmes** : les $\Delta z=\varepsilon\sqrt{\Delta t}$ des versions discrètes (14.10) et (14.11) sont **identiques**. **Il s'ensuit qu'on peut construire un portefeuille de l'action et du dérivé où le processus de Wiener est éliminé.*** *Étape 4 — le portefeuille.*

$$\boxed{-1\ \text{dérivé}\qquad+\frac{\partial f}{\partial S}\ \text{actions}}\qquad\Longrightarrow\qquad \Pi=-f+\frac{\partial f}{\partial S}S\;\text{(14.12)}$$

*Étape 5 — sa variation.* $\Delta\Pi=-\Delta f+\dfrac{\partial f}{\partial S}\Delta S$ ; en substituant (14.10) et (14.11), **les termes en $\Delta z$ s'annulent** :

$$\boxed{\Delta\Pi=\left(-\frac{\partial f}{\partial t}-\frac12\frac{\partial^2f}{\partial S^2}\sigma^2S^2\right)\Delta t}\;\text{(14.14)}$$

*Étape 6 — imposer le rendement sans risque.* *Comme cette équation **ne contient pas $\Delta z$**, le portefeuille est sans risque sur $\Delta t$ ; il doit donc rapporter instantanément le même taux que les autres titres sans risque à court terme. **S'il rapportait plus, les arbitragistes emprunteraient pour l'acheter ; s'il rapportait moins, ils le shorteraient pour acheter des titres sans risque.*** Donc $\Delta\Pi=r\Pi\Delta t$ :

$$\left(\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial S^2}\sigma^2S^2\right)\Delta t=\left(rf-\frac{\partial f}{\partial S}rS\right)\Delta t$$

$$\boxed{\frac{\partial f}{\partial t}+rS\frac{\partial f}{\partial S}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}=rf}\;\text{(14.16)}$$

⚠️ **Le portefeuille n'est pas durablement sans risque.** *Il ne l'est que pour une durée **infinitésimale**. Quand $S$ et $t$ changent, $\partial f/\partial S$ change aussi : il faut donc **changer fréquemment les proportions** de dérivé et d'action.*

</details>

**Les conditions terminales.** *L'EDP a **de nombreuses solutions**, correspondant à tous les dérivés définissables sur $S$. Celle qu'on obtient dépend des **conditions aux limites**.*

$$\text{call}:\ f=\max(S-K,0)\ \text{en}\ t=T\qquad\qquad\text{put}:\ f=\max(K-S,0)\ \text{en}\ t=T$$

<details><summary>**Deux vérifications instructives — le forward, et les fonctions qui ne sont pas des prix**</summary>

**Exemple 14.5 — un forward satisfait l'EDP.** D'après (5.5), $f=S-Ke^{-r(T-t)}$. Alors

$$\frac{\partial f}{\partial t}=-rKe^{-r(T-t)}\qquad \frac{\partial f}{\partial S}=1\qquad \frac{\partial^2f}{\partial S^2}=0$$

En injectant dans le membre de gauche de (14.16) :

$$-rKe^{-r(T-t)}+rS=r\big(S-Ke^{-r(T-t)}\big)=rf\ \checkmark$$

**Le critère général — et il est puissant.** *Toute fonction $f(S,t)$ solution de (14.16) est le **prix théorique d'un dérivé négociable** ; s'il existait, il ne créerait aucune opportunité d'arbitrage. **Réciproquement, une fonction qui ne satisfait PAS l'EDP ne peut pas être le prix d'un dérivé sans créer des arbitrages.***

| Fonction | Satisfait l'EDP ? | Conclusion |
|---|---|---|
| $e^S$ | **non** | *si un instrument valant toujours $e^S$ existait, il y aurait une **opportunité d'arbitrage*** |
| $\dfrac{e^{(\sigma^2-2r)(T-t)}}{S}$ | **oui** | c'est le prix d'un dérivé — *celui qui paie $1/S_T$ en $T$* |

</details>

## 🔴 Concept 5 — La valorisation risque-neutre, justifiée par l'EDP

> **La propriété clé.** *L'EDP **ne contient aucune variable affectée par les préférences des investisseurs pour le risque**. Les variables qui y figurent — **prix courant, temps, volatilité, taux sans risque** — en sont toutes **indépendantes**.*
>
> ***L'EDP ne serait pas indépendante des préférences si elle contenait $\mu$***, car $\mu$ dépend de l'aversion au risque : plus les investisseurs sont averses, plus $\mu$ est élevé pour une action donnée. ***Il est heureux que $\mu$ disparaisse dans la dérivation.***
>
> **L'argument ingénieux.** *Si les préférences n'entrent pas dans l'équation, **elles ne peuvent pas affecter sa solution**. **N'importe quel ensemble de préférences peut donc être utilisé** — en particulier l'hypothèse très simple que **tous les investisseurs sont neutres au risque**.*

**La procédure en trois temps.**

1. **Supposer $\mu=r$** — le rendement espéré du sous-jacent est le taux sans risque.
2. Calculer le **payoff espéré** du dérivé.
3. **Actualiser** ce payoff espéré au **taux sans risque**.

⚠️ **La mise en garde de Hull, à ne jamais oublier.** *La valorisation risque-neutre est **simplement un artifice** pour obtenir des solutions de l'EDP. **Les solutions obtenues sont valables dans tous les mondes**, pas seulement ceux où les investisseurs sont neutres au risque. Quand on passe d'un monde risque-neutre à un monde averse au risque, **deux choses changent** : le **taux de croissance espéré** du prix de l'action, et le **taux d'actualisation** des payoffs. **Il se trouve que ces deux changements se compensent toujours exactement.***

<details><summary>**Exercice résolu — retrouver le prix d'un forward par la voie risque-neutre**</summary>

*Étape 1 — le payoff.* Un forward long de prix de livraison $K$ vaut $S_T-K$ en $T$. *Étape 2 — appliquer le principe.* La valeur en 0 est l'espérance **risque-neutre** actualisée :

$$f=e^{-rT}\hat{\mathbb E}(S_T-K)$$

*Étape 3 — $K$ étant constant.*

$$f=e^{-rT}\hat{\mathbb E}(S_T)-Ke^{-rT}\;\text{(14.17)}$$

*Étape 4 — utiliser (14.4) avec $\mu=r$.* $\hat{\mathbb E}(S_T)=S_0e^{rT}$ ;(14.18). *Étape 5 — conclure.*

$$\boxed{f=S_0-Ke^{-rT}}\;\text{(14.19)}$$

**En accord avec (5.5)** — obtenu ici **sans aucun argument d'arbitrage explicite**.

</details>

## 🔴 Concept 6 — Les formules de Black-Scholes-Merton

$$\boxed{c=S_0N(d_1)-Ke^{-rT}N(d_2)}\;\text{(14.20)}\qquad\qquad\boxed{p=Ke^{-rT}N(-d_2)-S_0N(-d_1)}\;\text{(14.21)}$$

$$\boxed{d_1=\frac{\ln(S_0/K)+(r+\sigma^2/2)T}{\sigma\sqrt T}}\qquad\qquad\boxed{d_2=\frac{\ln(S_0/K)+(r-\sigma^2/2)T}{\sigma\sqrt T}=d_1-\sigma\sqrt T}$$

où $N(x)$ est *la **fonction de répartition** de la loi normale centrée réduite : la probabilité qu'une variable $\phi(0,1)$ soit **inférieure à $x$***.

**Deux voies de démonstration.** *Résoudre l'EDP sous la condition terminale — **ou** utiliser la valorisation risque-neutre* :

$$c=e^{-rT}\hat{\mathbb E}\big[\max(S_T-K,0)\big]\;\text{(14.22)}$$

> **L'interprétation des termes** — en réécrivant (14.20) sous la forme
>
> $$c=e^{-rT}\big[S_0N(d_1)e^{rT}-KN(d_2)\big]\;\text{(14.23)}$$
>
> - **$N(d_2)$ est la probabilité que l'option soit exercée en monde risque-neutre**, donc $KN(d_2)$ est **le strike multiplié par la probabilité de le payer** ;
> - **$S_0N(d_1)e^{rT}$ est l'espérance risque-neutre** d'une variable valant $S_T$ si $S_T>K$ et **zéro sinon**.

⚠️ **Trois précisions d'usage.**

- *Comme il n'est jamais optimal d'exercer par anticipation un call américain sans dividende (fiche 83), **(14.20) est aussi la valeur du call américain**.*
- ***Aucune formule analytique exacte n'a été produite pour le put américain*** sans dividende — d'où les méthodes numériques du chapitre 20.
- *En pratique, **$r$ est le taux zéro-coupon sans risque de maturité $T$**, et le temps est mesuré en **jours de bourse restants divisés par le nombre de jours de bourse dans l'année**.*

<details><summary>**Les tests aux valeurs extrêmes — vérifier qu'une formule est la bonne**</summary>

**Test 1 — $S_0$ très grand.** *Le call est presque certain d'être exercé ; il devient très semblable à un forward de prix de livraison $K$, donc on attend $S_0-Ke^{-rT}$.* Et c'est bien ce que donne (14.20) : quand $S_0\to\infty$, **$d_1$ et $d_2$ deviennent très grands**, donc $N(d_1),N(d_2)\to1$. Symétriquement, $p\to0$ car $N(-d_1),N(-d_2)\to0$.

**Test 2 — $\sigma\to0$.** *L'action est **quasiment sans risque** : son prix croîtra au taux $r$ jusqu'à $S_0e^{rT}$, et le payoff du call est $\max(S_0e^{rT}-K,0)$. Actualisé :*

$$e^{-rT}\max(S_0e^{rT}-K,0)=\max(S_0-Ke^{-rT},0)$$

*Vérification par la formule.* Si $S_0>Ke^{-rT}$, alors $\ln(S_0/K)+rT>0$ et, quand $\sigma\to0$, $d_1,d_2\to+\infty$, donc $N\to1$ et $c=S_0-Ke^{-rT}$. Si $S_0<Ke^{-rT}$, alors $d_1,d_2\to-\infty$, $N\to0$ et $c=0$. **La formule donne donc toujours $\max(S_0-Ke^{-rT},0)$** — et symétriquement $\max(Ke^{-rT}-S_0,0)$ pour le put.

⚠️ **C'est le réflexe de contrôle par excellence.** Une formule d'option doit **dégénérer correctement** aux bornes. Si elle ne le fait pas, elle est fausse.

</details>

<details><summary>**Exercice résolu — le calcul complet d'un call et d'un put (exemple 14.6)**</summary>

**Données.** $S_0=42$, $K=40$, $r=0{,}1$, $\sigma=0{,}2$, $T=0{,}5$.

*Étape 1 — $d_1$.*

$$d_1=\frac{\ln(42/40)+(0{,}1+0{,}02)\times0{,}5}{0{,}2\sqrt{0{,}5}}=\frac{0{,}04879+0{,}06}{0{,}14142}=\mathbf{0{,}7693}$$

*Étape 2 — $d_2$.*

$$d_2=d_1-\sigma\sqrt T=0{,}7693-0{,}1414=\mathbf{0{,}6278}$$

*Étape 3 — le strike actualisé.* $40e^{-0{,}05}=\mathbf{38{,}049}$. *Étape 4 — les quatre valeurs de $N$.* (`=NORMSDIST(x)` en tableur)

$$N(0{,}7693)=0{,}7791\quad N(0{,}6278)=0{,}7349\quad N(-0{,}7693)=0{,}2209\quad N(-0{,}6278)=0{,}2651$$

*Étape 5 — le call.*

$$c=42\times0{,}7791-38{,}049\times0{,}7349=32{,}722-27{,}962=\boxed{\mathbf{4{,}76}}$$

*Étape 6 — le put.*

$$p=38{,}049\times0{,}2651-42\times0{,}2209=10{,}087-9{,}278=\boxed{\mathbf{0{,}81}}$$

*Étape 7 — contrôle par la parité.* $c+Ke^{-rT}=4{,}76+38{,}05=42{,}81$ et $p+S_0=0{,}81+42=42{,}81$ . *Étape 8 — les points morts.* *En ignorant la valeur temps de l'argent, l'action doit **monter de 2,76** pour que l'acheteur du call rentre dans ses frais, et **baisser de 2,81** pour l'acheteur du put.*

⚠️ **$N(-x)=1-N(x)$** — c'est ainsi qu'on obtient les deux dernières valeurs sans nouvelle table.

</details>

## 🟠 Concept 7 — Warrants, options de salariés et dilution

> **La question, et la réponse contre-intuitive.** *Comment la dilution potentielle devrait-elle affecter la valorisation de warrants et d'options de salariés **en circulation** ? **La réponse est qu'elle ne devrait pas !** Si les marchés sont efficients, **le prix de l'action reflète déjà la dilution potentielle** de tous les warrants et options en circulation.*

<details><summary>**L'argument de dilution, et pourquoi il ne faut pas la compter deux fois**</summary>

**Le décor.** Une entreprise de **100 000 actions** à **50** annonce l'attribution de **100 000 options** de strike **50** à ses salariés.

*Étape 1 — l'effet d'annonce.* *Si le marché ne voit guère de bénéfice pour les actionnaires — salaires réduits, dirigeants plus motivés —, **le prix baisse immédiatement après l'annonce**.* S'il tombe à **45**, le coût de dilution est **5 par action**, soit **500 000** au total. *Étape 2 — trois ans plus tard.* Le cours vaut **100** et toutes les options sont exercées ; le payoff est **50 par option**. *Étape 3 — l'argument fallacieux.* *Il est tentant d'argumenter qu'il y a **une dilution supplémentaire** : 100 000 actions à 100 fusionnent avec 100 000 actions payées 50 seulement, donc (a) le cours tombe à **75** et (b) le payoff n'est que de **25** par option.* *Étape 4 — pourquoi c'est faux.* ***Cet argument est vicié. L'exercice des options est anticipé par le marché et déjà reflété dans le cours. Le payoff de chaque option exercée est bien de 50.***

> **Le principe général.** *Quand les marchés sont efficients, **l'impact de la dilution est reflété dans le cours dès l'annonce** et **n'a pas à être pris en compte une seconde fois** lors de la valorisation.*

</details>

**Le coût d'une *nouvelle* émission.** $N$ actions à $S_0$, $M$ nouvelles options de strike $K$.

*La valeur de l'entreprise aujourd'hui est $NS_0$, et **elle ne change pas** du fait de l'émission.* Si, **sans** l'émission, le cours en $T$ vaut $S_T$, la valeur totale (actions + warrants) est $NS_T$ ; l'exercice apporte $MK$, portant le total à $NS_T+MK$, réparti sur $N+M$ actions :

$$\text{cours après exercice}=\frac{NS_T+MK}{N+M}\qquad\Longrightarrow\qquad \text{payoff}=\frac{NS_T+MK}{N+M}-K=\boxed{\frac{N}{N+M}(S_T-K)}$$

> **Conclusion.** *La valeur de chaque warrant est $\dfrac{N}{N+M}$ fois la valeur d'un **call ordinaire**. Le coût total est $M$ fois cela, et **la baisse du cours est $\dfrac{M}{N+M}$ fois la valeur d'un call ordinaire** de strike $K$ et maturité $T$.*

<details><summary>**Exercice résolu — le coût d'une émission de warrants (exemple 14.7)**</summary>

**Données.** $N=1\,000\,000$ actions à **40** ; $M=200\,000$ warrants, $K=60$, **5 ans**, $r=3\,\%$, $\sigma=30\,\%$, pas de dividende.

*Étape 1 — la valeur d'un call ordinaire.* Par (14.20) : **7,04**. *Étape 2 — le facteur de dilution.*

$$\frac{N}{N+M}=\frac{1\,000\,000}{1\,200\,000}=\mathbf{0{,}8333}$$

*Étape 3 — la valeur d'un warrant.* $0{,}8333\times7{,}04=\mathbf{5{,}87}$. *Étape 4 — le coût total.* $200\,000\times5{,}87=\mathbf{1{,}17}$ million. *Étape 5 — l'effet sur le cours.* *En supposant que le marché ne perçoit **aucun bénéfice**, on attend une baisse de **1,17 dollar** par action, à **38,83**.*

</details>

## 🔴 Concept 8 — La volatilité implicite et le VIX

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Le seul paramètre des formules qui **ne peut pas être observé directement** est la volatilité. En pratique, les traders travaillent avec des **volatilités implicites** : celles **impliquées par les prix d'options observés sur le marché**.*

</div>

⚠️ ***Il n'est pas possible d'inverser (14.20) pour exprimer $\sigma$ en fonction de $S_0,K,r,T,c$.*** On procède par **recherche itérative**.

<details><summary>**Exercice résolu — trouver une volatilité implicite par dichotomie**</summary>

**Données.** $c=1{,}875$, $S_0=21$, $K=20$, $r=0{,}1$, $T=0{,}25$.

*Étape 1 — premier essai, $\sigma=0{,}20$.* Donne $c=\mathbf{1{,}76}$ — **trop bas**. *Étape 2 — raisonner sur la monotonie.* *Comme $c$ est une fonction **croissante** de $\sigma$, il faut une valeur **plus élevée**.* *Étape 3 — essai $\sigma=0{,}30$.* Donne $c=\mathbf{2{,}10}$ — **trop haut**. Donc $\sigma\in[0{,}20;0{,}30]$. *Étape 4 — essai $\sigma=0{,}25$.* Encore **trop haut** → $\sigma\in[0{,}20;0{,}25]$. *Étape 5 — itérer.* *En **divisant l'intervalle par deux** à chaque itération, on obtient $\sigma$ à la précision voulue.* Ici : $\boxed{\sigma=0{,}235}$, soit **23,5 %**.

*(En pratique on utilise des méthodes plus puissantes, comme **Newton-Raphson**. La même procédure, avec des arbres binomiaux, donne les volatilités implicites d'options **américaines**.)*

</details>

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi les traders les préfèrent.</span>

*Les volatilités **historiques** regardent **en arrière**, les **implicites** regardent **en avant**. Les traders **cotent souvent la volatilité implicite plutôt que le prix**, ce qui est commode parce qu'**elle est moins variable que le prix de l'option**.*

</div>

**Le VIX.** *Le CBOE publie des indices de volatilité implicite. Le plus populaire, le **SPX VIX**, est un indice de la volatilité implicite des options **30 jours** sur le S&P 500, calculé à partir d'un **large éventail de calls et de puts**.* Futures sur le VIX depuis **2004**, options depuis **2006**. **Un contrat porte sur 1 000 fois l'indice.**

> ⚠️ **La distinction qui fait tout l'intérêt du produit.** *Une opération sur futures ou options **sur le S&P 500** est un pari **à la fois** sur le niveau futur du S&P 500 **et** sur sa volatilité. Par contraste, un contrat sur le **VIX** est un pari **uniquement sur la volatilité**.*

**Exemple 14.8.** Achat d'un futures VIX avril à **18,5**, dénoué à **19,3** → gain $=(19{,}3-18{,}5)\times1\,000=\mathbf{800}$ dollars.

**L'histoire du VIX, janvier 2004 – juillet 2010.** *Entre 2004 et mi-2007 il **restait entre 10 et 20**. Il atteint **30** au second semestre 2007, puis un **record de 80** en octobre-novembre 2008, après la faillite de Lehman. Début 2010 il était revenu à des niveaux plus normaux, mais en **mai 2010 il a bondi au-delà de 45** à cause de la **crise des dettes souveraines européennes**.*

## 🔴 Concept 9 — Les dividendes

**L'hypothèse.** *Le **montant et le calendrier** des dividendes pendant la vie de l'option sont **prévisibles avec certitude** — hypothèse raisonnable pour des options courtes.* La date à retenir est la **date de détachement**, *à laquelle le cours baisse du montant du dividende*.

⚠️ **La nuance fiscale, importante en pratique.** *Pour des raisons fiscales, le cours peut baisser **de moins** que le montant en espèces. Il faut donc interpréter le mot « dividende » comme **la réduction du cours à la date de détachement causée par le dividende**. Si un dividende de 1 est anticipé et que le cours baisse habituellement de **80 %** du dividende, **il faut prendre 0,80** dans l'analyse.*

### 9.1 Options européennes

> **La décomposition.** *Le prix de l'action est la somme de **deux composantes** : une composante **sans risque** correspondant aux dividendes connus, et une composante **risquée**. La composante sans risque est, à tout instant, la **valeur actuelle de tous les dividendes** de la vie de l'option, actualisés des dates de détachement au taux sans risque. **À maturité, les dividendes auront été payés et la composante sans risque n'existera plus.***

$$\boxed{\text{utiliser Black-Scholes avec }S_0\ \longrightarrow\ S_0-D}\qquad D=\text{valeur actuelle des dividendes}$$

⚠️ *En théorie, $\sigma$ n'est alors pas tout à fait la volatilité du prix entier : celle de la composante risquée vaut environ **$\sigma\times S_0/(S_0-D)$**. Mais **l'ajustement n'est nécessaire que si $\sigma$ est estimée sur données historiques** — une volatilité **implicite** est calculée **après** soustraction de $D$ et **est** celle de la composante risquée.*

<details><summary>**Exercice résolu — un call européen avec deux dividendes (exemple 14.9)**</summary>

**Données.** Détachements dans **2 mois** et **5 mois**, **0,50** chacun. $S_0=40$, $K=40$, $\sigma=30\,\%$, $r=9\,\%$, $T=6$ mois.

*Étape 1 — la valeur actuelle des dividendes.*

$$D=0{,}5e^{-0{,}09\times2/12}+0{,}5e^{-0{,}09\times5/12}=0{,}49256+0{,}48160=\mathbf{0{,}9742}$$

*Étape 2 — le prix ajusté.* $S_0=40-0{,}9742=\mathbf{39{,}0258}$. *Étape 3 — $d_1$.*

$$d_1=\frac{\ln(39{,}0258/40)+(0{,}09+0{,}045)\times0{,}5}{0{,}3\sqrt{0{,}5}}=\frac{-0{,}02466+0{,}0675}{0{,}21213}=\mathbf{0{,}2020}$$

*Étape 4 — $d_2$.* $0{,}2020-0{,}2121=\mathbf{-0{,}0102}$. *Étape 5 — les $N$.* $N(0{,}2020)=0{,}5800$ · $N(-0{,}0102)=0{,}4959$. *Étape 6 — le prix.*

$$c=39{,}0258\times0{,}5800-40e^{-0{,}045}\times0{,}4959=22{,}635-18{,}964=\boxed{\mathbf{3{,}67}}$$

⚠️ **Seul $S_0$ est ajusté.** Le strike $K$ reste **40** dans $d_1$, $d_2$ **et** dans le terme $Ke^{-rT}$.

</details>

### 9.2 Options américaines et approximation de Black

**Le résultat de structure.** *Quand il y a des dividendes, il **ne peut être optimal d'exercer qu'à un instant immédiatement avant une date de détachement**.* Soit $t_1<\cdots<t_n$ les dates de détachement et $D_1,\ldots,D_n$ les dividendes.

<details><summary>**La démonstration des deux critères, et leur lecture**</summary>

**À la dernière date $t_n$.** Exercer donne $S(t_n)-K$. Ne pas exercer : le cours tombe à $S(t_n)-D_n$ et l'option vaut alors **au moins** $S(t_n)-D_n-Ke^{-r(T-t_n)}$ (borne 10.4). Donc si

$$S(t_n)-D_n-Ke^{-r(T-t_n)}>S(t_n)-K\qquad\text{c'est-à-dire}\qquad\boxed{D_n\le K\big[1-e^{-r(T-t_n)}\big]}\;\text{(14.24)}$$

**il ne peut pas être optimal d'exercer en $t_n$.** À l'inverse, si

$$\boxed{D_n>K\big[1-e^{-r(T-t_n)}\big]}\;\text{(14.25)}$$

*alors, pour toute hypothèse raisonnable sur le processus, **il est toujours optimal d'exercer en $t_n$ pour un $S(t_n)$ suffisamment élevé**.* *Cette inégalité tend à être satisfaite quand la **dernière date de détachement est proche de la maturité** ($T-t_n$ petit) et que **le dividende est important**.*

**Aux dates antérieures.** Le même raisonnement, avec $t_{i+1}$ à la place de $T$ :

$$\boxed{D_i\le K\big[1-e^{-r(t_{i+1}-t_i)}\big]}\;\text{(14.26)}\ \Longrightarrow\ \text{pas d'exercice en }t_i$$

**L'approximation qui la rend lisible.** $(14.26)$ équivaut approximativement à

$$D_i\le Kr(t_{i+1}-t_i)$$

*Si $K$ est assez proche du cours, **cette inégalité est satisfaite quand le rendement du dividende est inférieur au taux sans risque — ce qui est souvent le cas**.*

> **La conclusion pratique.** *Dans beaucoup de circonstances, **le moment le plus probable d'exercice anticipé d'un call américain est immédiatement avant la DERNIÈRE date de détachement**. De plus, si (14.26) vaut pour $i=1,\ldots,n-1$ **et** que (14.24) vaut, **on est certain que l'exercice anticipé n'est jamais optimal**.*

</details>

> **L'approximation de Black (1975).** *Calculer les prix des options **européennes** échéant en $T$ **et** en $t_n$, puis prendre **le plus grand des deux** comme prix américain. **Cette approximation semble bien fonctionner dans la plupart des cas.***

<details><summary>**Exercice résolu — l'approximation de Black et ses deux biais (exemple 14.10)**</summary>

**Données.** Mêmes que l'exemple 14.9, mais option **américaine**. $D_1=D_2=0{,}5$, $S_0=K=40$, $r=0{,}09$, $t_1=2/12$, $t_2=5/12$, $T=0{,}5$.

*Étape 1 — tester la première date.*

$$K\big[1-e^{-r(t_2-t_1)}\big]=40\big(1-e^{-0{,}09\times0{,}25}\big)=\mathbf{0{,}89}\ >\ 0{,}5=D_1$$

Par (14.26), **l'option ne devrait jamais être exercée avant la première date** . *Étape 2 — tester la seconde.*

$$K\big[1-e^{-r(T-t_2)}\big]=40\big(1-e^{-0{,}09\times0{,}0833}\big)=\mathbf{0{,}30}\ <\ 0{,}5=D_2$$

Par (14.25), **quand elle est suffisamment dans la monnaie, l'option devrait être exercée juste avant la seconde date** . *Étape 3 — première branche de l'approximation.* Option supposée expirer **juste avant $t_2$** : on ne retranche que le **premier** dividende, $0{,}5e^{-0{,}09\times0{,}1667}=\mathbf{0{,}4926}$, d'où $S_0=\mathbf{39{,}5074}$, $K=40$, $T=\mathbf{0{,}4167}$ → prix **3,52**. *Étape 4 — seconde branche.* Option européenne à 6 mois : **3,67** (exemple 14.9). *Étape 5 — l'approximation.* $\max(3{,}52;\,3{,}67)=\boxed{\mathbf{3{,}67}}$. *Étape 6 — la référence.* L'arbre binomial à **500 pas** donne **3,72**.

⚠️ **Les deux sources d'écart, et elles jouent en sens opposés.**

1. ***Le calendrier de la décision d'exercice*** — il rend le **binomial plus grand**. *Dans l'approximation, on suppose que le détenteur doit décider **aujourd'hui** si l'option sera exercée à 5 ou à 6 mois ; le binomial permet à la décision au point 5 mois de **dépendre du cours à cet instant**.*
2. ***La façon dont la volatilité est appliquée*** — elle rend l'**approximation plus grande**. *Quand on suppose l'exercice à 5 mois, la volatilité s'applique au cours moins la VA du **premier** dividende ; quand on suppose l'exercice à 6 mois, elle s'applique au cours moins la VA des **deux**.*

</details>

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| « probabilité que $S_T$ soit entre… » | **intervalle log-normal** | travailler sur $\ln S_T$, puis exponentier |
| Une suite de rendements annuels | **arithmétique vs géométrique** | $\mu$ contre $\mu-\sigma^2/2$ |
| Une série de cours | **volatilité historique** | $u_i=\ln(S_i/S_{i-1})$, $\hat\sigma=s/\sqrt\tau$ |
| $S_0,K,r,\sigma,T$ | **prix Black-Scholes** | $d_1$, $d_2$, $N$, formules |
| Un **prix d'option** donné, $\sigma$ inconnue | **volatilité implicite** | recherche itérative |
| Des **dividendes** en montant | **ajustement** | remplacer $S_0$ par $S_0-D$ |
| Une option **américaine** avec dividendes | **exercice anticipé** | tester (14.24)-(14.26), puis Black |
| $N$ actions, $M$ warrants | **dilution** | multiplier le call par $N/(N+M)$ |
| Une fonction $f(S,t)$ proposée | **est-ce un prix ?** | l'injecter dans l'EDP |

## Comment résoudre ce type d'exercice

**Protocole Black-Scholes — 6 étapes.**

1. Si dividendes : calculer $D$ = **valeur actuelle**, et remplacer $S_0$ par $S_0-D$.
2. Calculer $\sigma\sqrt T$ **une fois pour toutes** — il sert deux fois.
3. $d_1=\dfrac{\ln(S_0/K)+(r+\sigma^2/2)T}{\sigma\sqrt T}$, puis $d_2=d_1-\sigma\sqrt T$ (**jamais** recalculé de zéro).
4. Lire $N(d_1)$ et $N(d_2)$ ; utiliser $N(-x)=1-N(x)$ pour le put.
5. $c=S_0N(d_1)-Ke^{-rT}N(d_2)$ · $p=Ke^{-rT}N(-d_2)-S_0N(-d_1)$.
6. **Contrôler par la parité** $c+Ke^{-rT}=p+S_0$ — c'est gratuit et cela détecte presque toutes les erreurs.

**Protocole volatilité historique — 5 étapes.**

1. $u_i=\ln(S_i/S_{i-1})$ pour $i=1,\ldots,n$.
2. $\sum u_i$ et $\sum u_i^2$.
3. $s=\sqrt{\dfrac{\sum u_i^2}{n-1}-\dfrac{(\sum u_i)^2}{n(n-1)}}$.
4. $\hat\sigma=s/\sqrt\tau$, avec $\tau=1/252$ pour des données quotidiennes.
5. Reporter l'**erreur type** $\hat\sigma/\sqrt{2n}$ — sans elle, l'estimation n'a pas de sens.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Construire un intervalle de confiance sur $S_T$ | Le construire sur **$\ln S_T$**, puis exponentier |
| Croire que le rendement réalisé espéré est $\mu$ | C'est **$\mu-\sigma^2/2$** — $\ln$ est **non linéaire** |
| Annoncer la moyenne **arithmétique** des rendements d'un fonds | La géométrique est **toujours inférieure** : 12,4 % contre 14 % |
| Oublier d'annualiser par $\sqrt{252}$ | $\hat\sigma=s/\sqrt\tau$ |
| Donner une volatilité historique sans erreur type | Elle vaut $\hat\sigma/\sqrt{2n}$ — **3,1 %** pour $\hat\sigma=19{,}3\,\%$ et $n=20$ |
| Croire le portefeuille de couverture durablement sans risque | Il ne l'est que **instantanément** — il faut **rééquilibrer** |
| Chercher $\mu$ dans l'EDP | **Il n'y figure pas** — c'est précisément le miracle |
| Ajuster **aussi** $K$ pour les dividendes | Seul **$S_0$** devient $S_0-D$ |
| Utiliser le **montant** des dividendes | C'est leur **valeur actuelle** $D$ |
| Recalculer $d_2$ depuis la formule complète | $d_2=d_1-\sigma\sqrt T$ — plus rapide et sans erreur |
| Compter la dilution **deux fois** | Elle est **déjà dans le cours** dès l'annonce |
| Croire qu'il existe une formule fermée pour le put américain | ***Aucune*** — méthodes numériques (ch. 20) |
| Croire qu'on peut inverser (14.20) en $\sigma$ | **Impossible** — recherche itérative |

## 📌 Ultimate Review

**Les formules.**

$$c=S_0N(d_1)-Ke^{-rT}N(d_2)\qquad p=Ke^{-rT}N(-d_2)-S_0N(-d_1)$$

$$d_1=\frac{\ln(S_0/K)+(r+\sigma^2/2)T}{\sigma\sqrt T}\qquad d_2=d_1-\sigma\sqrt T$$

**L'EDP.** $\dfrac{\partial f}{\partial t}+rS\dfrac{\partial f}{\partial S}+\dfrac12\sigma^2S^2\dfrac{\partial^2f}{\partial S^2}=rf$ — **$\mu$ n'y figure pas**, d'où la valorisation risque-neutre.

**Le portefeuille de couverture.** $-1$ dérivé $+\ \partial f/\partial S$ actions ; il élimine $dz$ et doit rapporter $r$.

**La loi et ses deux moments.** $\ln S_T\sim\phi(\ln S_0+(\mu-\sigma^2/2)T,\sigma^2T)$ · $\mathbb E(S_T)=S_0e^{\mu T}$ · $\mathrm{Var}(S_T)=S_0^2e^{2\mu T}(e^{\sigma^2T}-1)$ · rendement réalisé $x\sim\phi(\mu-\sigma^2/2,\sigma^2/T)$.

**La volatilité.** $\hat\sigma=s/\sqrt\tau$, erreur type $\hat\sigma/\sqrt{2n}$ · **90 à 180 jours** de données quotidiennes · implicite = **prospective**, historique = **rétrospective**.

**Les dividendes.** $S_0\to S_0-D$ · américaine : exercice possible **uniquement juste avant un détachement** ; jamais si $D_i\le K[1-e^{-r(t_{i+1}-t_i)}]$ · **approximation de Black** : max des deux européennes.

**Les chiffres du chapitre.** Nobel **1997**, Black mort en **1995** · exemple 14.1 : $[32{,}55;56{,}56]$ · fonds : arithmétique **14 %**, géométrique **12,4 %** · exemple 14.4 : $\hat\sigma=\mathbf{19{,}3\,\%}$, erreur type **3,1 %** · exemple 14.6 : $d_1=0{,}7693$, $d_2=0{,}6278$, $c=\mathbf{4{,}76}$, $p=\mathbf{0{,}81}$ · warrants : facteur **0,8333**, warrant **5,87**, coût **1,17 M** · volatilité implicite **23,5 %** · VIX : **10-20** avant 2007, record **80** fin 2008, **45+** en mai 2010, contrat sur **1 000** fois l'indice · dividendes : $D=0{,}9742$, $c=\mathbf{3{,}67}$ ; Black **3,67** contre binomial **3,72**.

## 🧠 Active Recall

<details><summary>Quelle difficulté Black, Scholes et Merton ont-ils franchie, et par quelles voies différentes ?</summary>

*Des chercheurs antérieurs avaient **correctement calculé le payoff espéré** d'une option européenne, mais **il est difficile de connaître le bon taux d'actualisation**.*

**Black et Scholes** ont utilisé le **MEDAF** pour relier le rendement exigé sur l'option à celui de l'action — *ce ne fut pas facile, car la relation dépend à la fois du prix de l'action et du temps*. **Merton** a construit un **portefeuille sans risque** option + action et argué que son rendement doit être le taux sans risque — *approche plus générale, car elle **ne repose pas sur les hypothèses du MEDAF***.

</details>

<details><summary>$S_0=40$, $\mu=16\,\%$, $\sigma=20\,\%$. Donner l'intervalle à 95 % de $S_T$ à 6 mois.</summary>

$\ln S_T\sim\phi(\ln40+(0{,}16-0{,}02)\times0{,}5;\ 0{,}04\times0{,}5)=\phi(3{,}759;0{,}02)$, écart-type $0{,}141$.

$$3{,}759\pm1{,}96\times0{,}141\ \Longrightarrow\ e^{3{,}4824}<S_T<e^{4{,}0356}\ \Longrightarrow\ \boxed{32{,}55<S_T<56{,}56}$$

**L'intervalle est asymétrique** autour de 40 — c'est la signature de la log-normalité. On le construit **toujours** sur le logarithme.

</details>

<details><summary>Pourquoi le rendement réalisé espéré vaut-il $\mu-\sigma^2/2$ et non $\mu$ ?</summary>

Parce que $\ln$ est **non linéaire**. On a $\ln[\mathbb E(S_T)]=\ln S_0+\mu T$, mais *on **ne peut pas** poser $\ln[\mathbb E(S_T)]=\mathbb E[\ln(S_T)]$*. Par Jensen, $\ln[\mathbb E(S_T)]>\mathbb E[\ln S_T]$, donc $\mathbb E(x)<\mu$ — et précisément $\mathbb E(x)=\mu-\sigma^2/2$.

En mots : $\mu\Delta t$ est proche de la **moyenne arithmétique** des rendements courts, mais *le rendement sur toute la période est proche de **$\mu-\sigma^2/2$***.

</details>

<details><summary>Un fonds affiche 15 %, 20 %, 30 %, −20 %, 25 %. Quel rendement doit-il annoncer ?</summary>

**12,4 %**, pas 14 %. La moyenne arithmétique est 14 %, mais $100\times1{,}15\times1{,}20\times1{,}30\times0{,}80\times1{,}25=\mathbf{179{,}40}$, alors que $100\times1{,}14^5=192{,}54$. Or $100\times1{,}124^5=179{,}40$.

*Il est bien moins trompeur de dire : « le rendement réalisé par quelqu'un qui a investi chez nous ces cinq dernières années est de **12,4 % par an** ». **Dans certaines juridictions, la réglementation l'impose.*** Résultat général : *la moyenne **géométrique** est toujours inférieure à la moyenne **arithmétique***.

</details>

<details><summary>Sur 20 rendements quotidiens, $\sum u_i=0{,}09531$ et $\sum u_i^2=0{,}00326$. Estimer $\sigma$ et sa précision.</summary>

$$s=\sqrt{\frac{0{,}00326}{19}-\frac{0{,}09531^2}{380}}=\mathbf{0{,}01216}\ \text{par jour}$$

$$\hat\sigma=0{,}01216\sqrt{252}=\mathbf{19{,}3\,\%}\qquad \text{erreur type}=\frac{0{,}193}{\sqrt{40}}=\mathbf{3{,}1\,\%}$$

L'erreur type vaut **16 %** de l'estimation : 20 observations, c'est **très peu**. Compromis usuel : **90 à 180 jours**.

</details>

<details><summary>Dériver l'EDP de Black-Scholes-Merton.</summary>

*Étape 1.* $dS=\mu S\,dt+\sigma S\,dz$ ; par Itô, $df=\left(\frac{\partial f}{\partial S}\mu S+\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial S^2}\sigma^2S^2\right)dt+\frac{\partial f}{\partial S}\sigma S\,dz$. *Étape 2.* **Le $dz$ est le même** dans les deux → on peut l'éliminer. *Étape 3.* Portefeuille $\Pi=-f+\frac{\partial f}{\partial S}S$. *Étape 4.* $\Delta\Pi=\left(-\frac{\partial f}{\partial t}-\frac12\frac{\partial^2f}{\partial S^2}\sigma^2S^2\right)\Delta t$ — **sans $\Delta z$**. *Étape 5.* Sans risque ⇒ $\Delta\Pi=r\Pi\Delta t$. *Étape 6.*

$$\frac{\partial f}{\partial t}+rS\frac{\partial f}{\partial S}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}=rf$$

Le portefeuille n'est sans risque **qu'instantanément** : il faut **rééquilibrer**.

</details>

<details><summary>Pourquoi l'absence de $\mu$ dans l'EDP autorise-t-elle la valorisation risque-neutre ?</summary>

*L'EDP **ne contient aucune variable affectée par les préférences pour le risque** : prix, temps, volatilité et taux sans risque en sont tous indépendants. Elle **ne le serait pas si elle contenait $\mu$**, qui dépend de l'aversion au risque.*

D'où l'argument : *si les préférences n'entrent pas dans l'équation, **elles ne peuvent pas affecter sa solution**. **N'importe quel ensemble de préférences peut donc être utilisé** — en particulier la neutralité au risque.*

⚠️ Ce n'est **qu'un artifice** : *les solutions obtenues sont valables **dans tous les mondes**. En passant à un monde averse, **le taux de croissance et le taux d'actualisation changent tous les deux — et se compensent exactement**.*

</details>

<details><summary>Que représentent $N(d_1)$ et $N(d_2)$ ?</summary>

En réécrivant $c=e^{-rT}[S_0N(d_1)e^{rT}-KN(d_2)]$ :

- **$N(d_2)$ est la probabilité que l'option soit exercée en monde risque-neutre** ; $KN(d_2)$ est donc **le strike multiplié par la probabilité de le payer**.
- **$S_0N(d_1)e^{rT}$ est l'espérance risque-neutre** d'une variable valant $S_T$ si $S_T>K$ et **zéro sinon**.

</details>

<details><summary>$S_0=42$, $K=40$, $r=10\,\%$, $\sigma=20\,\%$, $T=0{,}5$. Calculer $c$ et $p$.</summary>

$d_1=\dfrac{\ln(1{,}05)+0{,}06}{0{,}14142}=\mathbf{0{,}7693}$ ; $d_2=0{,}7693-0{,}1414=\mathbf{0{,}6278}$ ; $Ke^{-rT}=\mathbf{38{,}049}$. $N(0{,}7693)=0{,}7791$, $N(0{,}6278)=0{,}7349$.

$$c=42(0{,}7791)-38{,}049(0{,}7349)=\mathbf{4{,}76}\qquad p=38{,}049(0{,}2651)-42(0{,}2209)=\mathbf{0{,}81}$$

**Contrôle par la parité** : $4{,}76+38{,}05=42{,}81=0{,}81+42$ .

</details>

<details><summary>Vérifier que la formule dégénère correctement quand $\sigma\to0$.</summary>

Sans risque, l'action croît à $S_0e^{rT}$ et le call paie $\max(S_0e^{rT}-K,0)$, de valeur actuelle $\max(S_0-Ke^{-rT},0)$.

Par la formule : si $S_0>Ke^{-rT}$, alors $\ln(S_0/K)+rT>0$ et **$d_1,d_2\to+\infty$**, donc $N\to1$ et $c=S_0-Ke^{-rT}$. Si $S_0<Ke^{-rT}$, alors **$d_1,d_2\to-\infty$**, $N\to0$ et $c=0$. **La formule donne bien $\max(S_0-Ke^{-rT},0)$** dans les deux cas.

</details>

<details><summary>Faut-il tenir compte de la dilution en valorisant des warrants déjà émis ?</summary>

**Non.** *Si les marchés sont efficients, **le prix de l'action reflète déjà la dilution potentielle**.* L'argument selon lequel il faudrait diviser le payoff par le nouveau nombre d'actions est **vicié** : *l'exercice est **anticipé par le marché et déjà reflété dans le cours***.

Pour une **nouvelle** émission, en revanche, chaque warrant vaut $\dfrac{N}{N+M}$ fois un call ordinaire, et le cours baisse de $\dfrac{M}{N+M}$ fois cette valeur.

</details>

<details><summary>Comment calcule-t-on une volatilité implicite, et pourquoi les traders la préfèrent-ils ?</summary>

**Par recherche itérative** : *il n'est **pas possible d'inverser** la formule pour exprimer $\sigma$ en fonction du prix*. On exploite que **$c$ est croissante en $\sigma$** : essai à 0,20 → 1,76 (trop bas) ; 0,30 → 2,10 (trop haut) ; 0,25 → trop haut ; on **divise l'intervalle par deux** jusqu'à la précision voulue → **23,5 %**.

Les traders la préfèrent parce que *les historiques regardent **en arrière**, les implicites **en avant***, et parce qu'*elle est **moins variable que le prix** de l'option*.

</details>

<details><summary>Comment ajuste-t-on Black-Scholes pour des dividendes connus ?</summary>

On décompose le prix en une **composante sans risque** (la **valeur actuelle des dividendes**, actualisés des dates de détachement) et une **composante risquée**. *À maturité les dividendes auront été payés et la composante sans risque n'existera plus.* Il suffit donc de **remplacer $S_0$ par $S_0-D$** — **et rien d'autre** : $K$ reste inchangé partout.

⚠️ En pratique, « dividende » signifie **la baisse du cours à la date de détachement** : si le cours ne baisse que de 80 % du dividende pour raisons fiscales, il faut prendre **0,80**.

</details>

<details><summary>Quand un call américain avec dividendes doit-il être exercé, et qu'est-ce que l'approximation de Black ?</summary>

*Il ne peut être optimal d'exercer qu'**immédiatement avant une date de détachement**.* Il ne l'est **jamais** en $t_i$ si

$$D_i\le K\big[1-e^{-r(t_{i+1}-t_i)}\big]\approx Kr(t_{i+1}-t_i)$$

— *satisfait quand le **rendement du dividende est inférieur au taux sans risque**, ce qui est souvent le cas*. Le moment le plus probable est donc **juste avant la dernière date**.

**L'approximation de Black (1975)** : calculer les deux européennes échéant en $T$ et en $t_n$, et **prendre le plus grand**. Dans l'exemple : $\max(3{,}52;3{,}67)=\mathbf{3{,}67}$, contre **3,72** au binomial 500 pas. Deux biais opposés : le **calendrier de décision** favorise le binomial, l'**application de la volatilité** favorise l'approximation.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Qui a reçu le Nobel, et quand ? | **Merton et Scholes**, **1997** ; Black mort en **1995** |
| Quelle difficulté avaient les prédécesseurs ? | Le **taux d'actualisation** du payoff espéré |
| Approche de Black et Scholes ? | Le **MEDAF** |
| Approche de Merton ? | Un **portefeuille sans risque** — plus générale |
| Loi de $\ln S_T$ ? | $\phi(\ln S_0+(\mu-\sigma^2/2)T,\ \sigma^2T)$ |
| $\mathbb E(S_T)$ ? | $S_0e^{\mu T}$ |
| $\mathrm{Var}(S_T)$ ? | $S_0^2e^{2\mu T}(e^{\sigma^2T}-1)$ |
| Sur quoi construit-on un intervalle de confiance ? | Sur **$\ln S_T$** |
| Loi du rendement réalisé $x$ ? | $\phi(\mu-\sigma^2/2,\ \sigma^2/T)$ |
| Que fait l'écart-type de $x$ quand $T$ croît ? | Il **décroît** |
| Pourquoi $\mathbb E(x)\ne\mu$ ? | $\ln$ est **non linéaire** (Jensen) |
| Moyenne géométrique vs arithmétique ? | La géométrique est **toujours inférieure** |
| Rendement à annoncer dans l'exemple du fonds ? | **12,4 %**, pas 14 % |
| Définition exacte de la volatilité ? | Écart-type du rendement **continu** sur un an |
| Fourchette typique ? | **15 % à 60 %** |
| Formule d'estimation historique ? | $\hat\sigma=s/\sqrt\tau$ avec $u_i=\ln(S_i/S_{i-1})$ |
| Erreur type de $\hat\sigma$ ? | $\hat\sigma/\sqrt{2n}$ |
| Combien de jours de données ? | **90 à 180** jours quotidiens |
| Jours de bourse par an ? | **252** |
| $u_i$ un jour de détachement ? | $\ln\frac{S_i+D}{S_{i-1}}$ |
| Composition du portefeuille de couverture ? | $-1$ dérivé, $+\partial f/\partial S$ actions |
| Pourquoi le risque disparaît-il ? | **Même $dz$** pour $S$ et $f$ |
| Combien de temps est-il sans risque ? | **Instantanément** seulement |
| L'EDP de Black-Scholes-Merton ? | $f_t+rSf_S+\frac12\sigma^2S^2f_{SS}=rf$ |
| Quelle variable n'y figure pas ? | **$\mu$** |
| Combien de solutions a-t-elle ? | **Beaucoup** — les conditions aux limites tranchent |
| Condition terminale d'un call ? | $f=\max(S-K,0)$ en $t=T$ |
| $e^S$ satisfait-il l'EDP ? | **Non** — ce n'est donc pas un prix |
| Que paie le dérivé de prix $e^{(\sigma^2-2r)(T-t)}/S$ ? | $\mathbf{1/S_T}$ en $T$ |
| Les trois étapes de la valorisation risque-neutre ? | $\mu=r$ · payoff espéré · **actualiser à $r$** |
| Est-ce une hypothèse sur le monde réel ? | **Non** — un **artifice** ; les solutions valent partout |
| Formule du call ? | $c=S_0N(d_1)-Ke^{-rT}N(d_2)$ |
| Formule du put ? | $p=Ke^{-rT}N(-d_2)-S_0N(-d_1)$ |
| Formule de $d_1$ ? | $\frac{\ln(S_0/K)+(r+\sigma^2/2)T}{\sigma\sqrt T}$ |
| Relation entre $d_1$ et $d_2$ ? | $d_2=d_1-\sigma\sqrt T$ |
| Que représente $N(d_2)$ ? | La **probabilité d'exercice** en monde risque-neutre |
| La formule vaut-elle pour un call américain ? | **Oui**, sans dividende |
| Et pour un put américain ? | **Aucune formule fermée** n'existe |
| Comportement quand $S_0\to\infty$ ? | $c\to S_0-Ke^{-rT}$, $p\to0$ |
| Comportement quand $\sigma\to0$ ? | $c\to\max(S_0-Ke^{-rT},0)$ |
| Valeur d'un warrant vs call ordinaire ? | $\frac{N}{N+M}$ fois |
| Baisse du cours à l'émission ? | $\frac{M}{N+M}$ fois la valeur d'un call |
| Faut-il compter la dilution pour des warrants existants ? | **Non** — déjà dans le cours |
| Peut-on inverser Black-Scholes en $\sigma$ ? | **Non** — recherche itérative |
| Pourquoi coter la volatilité implicite ? | Elle est **moins variable** que le prix, et **prospective** |
| Que mesure le VIX ? | Volatilité implicite des options **30 jours** sur le S&P 500 |
| Taille d'un contrat VIX ? | **1 000 fois** l'indice |
| Record du VIX ? | **80**, octobre-novembre **2008** |
| Ajustement pour dividendes ? | $S_0\to S_0-D$, $D$ = **valeur actuelle** |
| Le strike change-t-il ? | **Non** |
| Quand exercer un call américain avec dividendes ? | **Juste avant** une date de détachement |
| Critère de non-exercice en $t_i$ ? | $D_i\le K[1-e^{-r(t_{i+1}-t_i)}]$ |
| Sa lecture approchée ? | Rendement du dividende **&lt; taux sans risque** |
| Qu'est-ce que l'approximation de Black ? | **Max** des deux européennes ($T$ et $t_n$) |
| Ses deux sources d'erreur ? | **Calendrier** de décision · **application** de la volatilité |
