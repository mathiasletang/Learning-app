# Fiche 86 — Processus de Wiener et lemme d'Itô

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 13 « Wiener Processes and Itô's Lemma » |
| **Difficulté** | Must know — l'outillage mathématique de Black-Scholes |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Fiche 85 · **compléments** : fiches 56 (calcul d'Itô, MIT) et 62 (mouvement brownien) |
| **Concepts clés** | Processus stochastique, propriété de Markov, efficience de forme faible, processus de Wiener, processus de Wiener généralisé, processus d'Itô, mouvement brownien géométrique, simulation de Monte-Carlo, processus corrélés, lemme d'Itô, propriété log-normale |
| **Poids à l'examen** | **Appliquer le lemme d'Itô** à $G=\ln S$ et à $F=Se^{r(T-t)}$ · savoir que $\ln S_T$ est **normale** de moyenne $\ln S_0+(\mu-\sigma^2/2)T$. |

## 🎯 Vue d'ensemble

```
MARKOV      seule la valeur PRÉSENTE compte  ⟺  efficience de forme faible
WIENER      dz = ε√dt ,  ε ~ N(0,1) ,  incréments INDÉPENDANTS
            dérive 0 · taux de variance 1 par an ·  écart-type ∝ √T
GÉNÉRALISÉ  dx = a dt + b dz          dérive a · taux de variance b²
ITÔ         dx = a(x,t) dt + b(x,t) dz
ACTION      dS = μS dt + σS dz        ← mouvement brownien GÉOMÉTRIQUE
LEMME       dG = (∂G/∂x·a + ∂G/∂t + ½ ∂²G/∂x²·b²) dt + ∂G/∂x·b dz
CONSÉQUENCE ln S_T ~ N( ln S₀ + (μ − σ²/2)T , σ²T )   →  S_T LOG-NORMALE
```

> **Le message d'ouverture de Hull, qu'il faut prendre au sérieux.** *Beaucoup pensent que les processus stochastiques en temps continu sont si compliqués qu'ils devraient être laissés entièrement aux « scientifiques de fusée ». **Ce n'est pas le cas. Le plus grand obstacle à leur compréhension est la notation.***

**La classification des processus.** Un processus stochastique est **à temps discret** (la variable ne change qu'à certaines dates fixes) ou **à temps continu** ; et **à variable continue** ou **à variable discrète**.

⚠️ **Honnêteté du modèle.** *En pratique, on **n'observe pas** les prix d'actions suivant des processus à variable continue et temps continu : les prix sont restreints à des valeurs discrètes (multiples du cent) et les changements ne s'observent que quand la bourse est ouverte. **Le processus continu n'en est pas moins un modèle utile pour de nombreux usages.***

## 🟡 Concept 1 — La propriété de Markov

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Un processus de Markov est un processus stochastique où **seule la valeur courante** de la variable est pertinente pour prédire l'avenir. **L'historique passé de la variable, et la façon dont le présent a émergé du passé, sont sans importance.***

</div>

*Si IBM vaut 100 aujourd'hui et suit un processus de Markov, nos prévisions **ne devraient pas être affectées** par le prix d'il y a une semaine, un mois ou un an. **La seule information pertinente est que le prix est maintenant de 100.*** L'avenir est incertain et s'exprime par une **loi de probabilité** ; la propriété de Markov implique que *la loi du prix à une date future ne dépend **pas du chemin particulier** suivi dans le passé*.

⚠️ **Ce que la propriété de Markov n'interdit pas.** Hull le précise en note : *les propriétés statistiques de l'historique d'IBM peuvent être utiles pour déterminer les **caractéristiques du processus** (par exemple sa volatilité). Le point est que **le chemin particulier suivi dans le passé est sans importance**.*

**Le lien économique — l'efficience de forme faible.** *Elle affirme que le prix présent **incorpore toute l'information contenue dans l'historique des prix passés**. Si elle était fausse, les analystes techniques pourraient obtenir des rendements supérieurs à la moyenne en interprétant les graphiques — **il y a très peu de preuves qu'ils y parviennent effectivement**.*

> **Le mécanisme d'auto-destruction, énoncé par Hull.** *Supposons qu'on découvre qu'un certain motif graphique donne toujours **65 %** de chances de fortes hausses ultérieures. Les investisseurs tenteraient d'acheter dès que le motif est observé, la demande **augmenterait immédiatement**, ce qui provoquerait une **hausse immédiate du prix** — et **l'effet observé serait éliminé**, ainsi que toute occasion de profit.* C'est la **concurrence** qui produit l'efficience.

## 🔴 Concept 2 — Le processus de Wiener

**Le raisonnement d'additivité, à faire une fois pour toutes.** Une variable markovienne dont le changement sur un an est $\phi(0,1)$ :

| Horizon | Loi du changement | Écart-type |
|---|---|---|
| 1 an | $\phi(0,1)$ | $1$ |
| **2 ans** | somme de **deux** normales **indépendantes** → $\phi(0,2)$ | $\sqrt2$ |
| 3 ans | $\phi(0,3)$ | $\sqrt3$ |
| **6 mois** | la variance annuelle est la somme des deux semestres → $\phi(0;0{,}5)$ | $\sqrt{0{,}5}$ |
| 3 mois | $\phi(0;0{,}25)$ | $0{,}5$ |
| $T$ | $\phi(0,T)$ | $\sqrt T$ |

> ⚠️ ***Pour les processus de Markov, les VARIANCES des changements sur des périodes successives sont additives. Les ÉCARTS-TYPES ne le sont pas.*** *À proprement parler, on ne devrait pas dire que l'écart-type de la variable est de 1,0 par an.* **C'est cela qui explique que l'incertitude soit dite proportionnelle à la racine carrée du temps.**

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition formelle.</span>

Une variable $z$ suit un **processus de Wiener** si : **1.** le changement $\Delta z$ sur un petit intervalle $\Delta t$ vaut

$$\boxed{\Delta z=\varepsilon\sqrt{\Delta t}}\;\text{(13.1)}\qquad\varepsilon\sim\phi(0,1)$$

**2.** les valeurs de $\Delta z$ sur **deux intervalles différents** sont **indépendantes**.

</div>

De 1 : $\mathbb E[\Delta z]=0$, $\mathrm{sd}(\Delta z)=\sqrt{\Delta t}$, $\mathrm{Var}(\Delta z)=\Delta t$. De 2 : $z$ est **markovien**. *Le processus a été utilisé en physique pour décrire le mouvement d'une particule soumise à un grand nombre de petits chocs moléculaires : on l'appelle parfois **mouvement brownien**.*

**Sur un horizon long $T$**, en découpant en $N=T/\Delta t$ intervalles :

$$z(T)-z(0)=\sum_{i=1}^N\varepsilon_i\sqrt{\Delta t}\;\text{(13.2)}\qquad\Longrightarrow\qquad \mathbb E=0,\quad \mathrm{Var}=N\Delta t=T,\quad \mathrm{sd}=\sqrt T$$

**Exemple 13.1.** $z$ vaut initialement **25**. Au bout d'**un an** : normale de moyenne **25** et écart-type **1,0**. Au bout de **5 ans** : moyenne **25**, écart-type $\sqrt5=\mathbf{2{,}236}$. *Notre incertitude, mesurée par l'écart-type, croît comme **la racine carrée** de l'horizon.*

<details><summary>**Pourquoi la trajectoire d'un processus de Wiener est « déchiquetée » — et deux propriétés stupéfiantes**</summary>

*Étape 1 — comparer les deux échelles.* L'écart-type du mouvement sur $\Delta t$ vaut $\sqrt{\Delta t}$. *Étape 2 — le rapport décisif.* Quand $\Delta t$ est petit, $\sqrt{\Delta t}$ est **beaucoup plus grand** que $\Delta t$. Exemple : $\Delta t=10^{-4}$ donne $\sqrt{\Delta t}=10^{-2}$, soit **cent fois** plus. *Étape 3 — la conséquence.* Le déplacement **vertical** domine le déplacement **horizontal** à toute échelle : la trajectoire ne « s'aplatit » jamais en zoomant. Elle n'est **nulle part dérivable**.

**Les deux propriétés que Hull qualifie d'intrigantes.**

1. *La **longueur espérée** du chemin suivi par $z$ sur n'importe quel intervalle de temps est **infinie**.*
2. *Le **nombre espéré de fois** où $z$ égale une valeur particulière donnée sur n'importe quel intervalle est **infini**.*

⚠️ **C'est la même propriété $\sqrt{\Delta t}\gg\Delta t$ qui donnera, au concept 6, le terme en $\frac12\frac{\partial^2G}{\partial x^2}b^2$ du lemme d'Itô.** Retenez-la : elle est la source de **tout** ce qui distingue le calcul stochastique du calcul ordinaire. (Voir fiche 62 pour la variation quadratique.)

</details>

## 🔴 Concept 3 — Wiener généralisé et processus d'Itô

> **Vocabulaire.** *La **moyenne** du changement par unité de temps est le **taux de dérive** ; la **variance** par unité de temps est le **taux de variance**.* Le Wiener de base a une dérive **nulle** et un taux de variance **1**.

$$\boxed{dx=a\,dt+b\,dz}\;\text{(13.3)}\qquad a,b\ \text{constants}$$

| Terme | Rôle |
|---|---|
| $a\,dt$ | **dérive espérée** de $a$ par unité de temps ; sans le second terme, $x=x_0+at$ |
| $b\,dz$ | *ajoute du **bruit** ou de la **variabilité** au chemin*, d'un montant $b$ fois un Wiener → taux de variance $\mathbf{b^2}$ |

En temps discret : $\Delta x=a\Delta t+b\varepsilon\sqrt{\Delta t}$, d'où sur un horizon $T$ :

$$\mathbb E[\Delta x]=aT\qquad \mathrm{sd}=b\sqrt T\qquad \mathrm{Var}=b^2T$$

**Exemple 13.2 — la trésorerie d'une entreprise.** Position de trésorerie (en milliers) suivant un Wiener généralisé de **dérive 20 par an** et **taux de variance 900 par an**, valeur initiale **50**.

| Horizon | Moyenne | Écart-type |
|---|---|---|
| **1 an** | $50+20=\mathbf{70}$ | $\sqrt{900}=\mathbf{30}$ |
| **6 mois** | $50+10=\mathbf{60}$ | $30\sqrt{0{,}5}=\mathbf{21{,}21}$ |

⚠️ *Notez que **la position de trésorerie peut devenir négative** — on peut l'interpréter comme une situation où l'entreprise **emprunte** des fonds.* C'est une limite structurelle du Wiener généralisé, et c'est exactement pourquoi on ne l'utilisera **pas** pour un prix d'action.

> **Processus d'Itô.** *Un Wiener généralisé dans lequel les paramètres $a$ et $b$ sont des **fonctions de la valeur de $x$ et du temps** :*
>
> $$\boxed{dx=a(x,t)\,dt+b(x,t)\,dz}\;\text{(13.4)}$$
>
> *Le taux de dérive **et** le taux de variance sont alors susceptibles de **changer au cours du temps**.*

## 🔴 Concept 4 — Le processus du prix d'une action

**Pourquoi le Wiener généralisé ne convient pas.** *Il serait tentant de dire qu'un prix d'action suit un Wiener généralisé — dérive constante et variance constante. **Mais ce modèle rate un aspect essentiel** : le **rendement en pourcentage** exigé par les investisseurs est **indépendant du niveau du prix**. S'ils exigent 14 % par an quand l'action vaut 10, alors, toutes choses égales, ils exigeront **aussi 14 %** quand elle vaut 50.*

**La correction, en deux temps.**

*Étape 1 — la dérive.* Ce n'est pas la dérive qui est constante, c'est le **rendement** (dérive divisée par le prix). La dérive de $S$ doit donc être $\boldsymbol{\mu S}$. **Sans incertitude**, $dS=\mu S\,dt$, soit $\dfrac{dS}{S}=\mu\,dt$, qui s'intègre en

$$S_T=S_0e^{\mu T}\;\text{(13.5)}$$

*— le prix croît au taux $\mu$ **capitalisé en continu**.*

*Étape 2 — la diffusion.* *Une hypothèse raisonnable est que la **variabilité du rendement en pourcentage** sur $\Delta t$ est la même quel que soit le prix : **un investisseur est tout aussi incertain du rendement en pourcentage quand l'action vaut 50 que quand elle vaut 10**.* L'écart-type de $\Delta S$ doit donc être **proportionnel à $S$**.

$$\boxed{dS=\mu S\,dt+\sigma S\,dz}\qquad\text{ou}\qquad\boxed{\frac{dS}{S}=\mu\,dt+\sigma\,dz}\;\text{(13.6)}$$

> ***C'est le modèle de comportement des prix d'actions le plus largement utilisé.*** $\mu$ est le **rendement espéré**, $\sigma$ la **volatilité**, $\sigma^2$ le **taux de variance**. Le modèle (13.6) représente le processus **dans le monde réel** ; **dans un monde risque-neutre, $\mu$ vaut $r$.**

**La version discrète** — le **mouvement brownien géométrique** :

$$\frac{\Delta S}{S}=\mu\Delta t+\sigma\varepsilon\sqrt{\Delta t}\;\text{(13.7)}\qquad\Longrightarrow\qquad \boxed{\frac{\Delta S}{S}\sim\phi\big(\mu\Delta t,\ \sigma^2\Delta t\big)}\;\text{(13.9)}$$

*Le terme $\mu\Delta t$ est la **valeur espérée** du rendement ; $\sigma\varepsilon\sqrt{\Delta t}$ en est la **composante stochastique**, de variance $\sigma^2\Delta t$ — **cohérent avec la définition de $\sigma$** de la section 12.7.*

<details><summary>**Exercice résolu — simulation de Monte-Carlo d'une trajectoire (exemple 13.3 et tableau 13.1)**</summary>

**Données.** Action sans dividende, $\sigma=30\,\%$, $\mu=15\,\%$ (continu). Pas de **1 semaine** $=0{,}0192$ an.

*Étape 1 — écrire le processus.* $\dfrac{dS}{S}=0{,}15\,dt+0{,}30\,dz$. *Étape 2 — calculer les deux coefficients hebdomadaires.*

$$\mu\Delta t=0{,}15\times0{,}0192=\mathbf{0{,}00288}\qquad \sigma\sqrt{\Delta t}=0{,}30\sqrt{0{,}0192}=\mathbf{0{,}0416}$$

*Étape 3 — la récurrence à simuler.*

$$\boxed{\Delta S=0{,}00288\,S+0{,}0416\,S\,\varepsilon}\;\text{(13.10)}$$

*Étape 4 — tirer $\varepsilon$.* En tableur : `=NORMSINV(RAND())`. *Étape 5 — dérouler.* $S_0=100$, $\varepsilon=0{,}52$ :

$$\Delta S=0{,}00288\times100+0{,}0416\times100\times0{,}52=0{,}288+2{,}163=\mathbf{2{,}45}\ \Rightarrow\ S=\mathbf{102{,}45}$$

Puis $\varepsilon=1{,}44$ : $\Delta S=0{,}00288\times102{,}45+0{,}0416\times102{,}45\times1{,}44=\mathbf{6{,}43}\ \Rightarrow\ S=\mathbf{108{,}88}$, etc.

| $S$ au début | $\varepsilon$ | $\Delta S$ |
|---|---|---|
| 100,00 | 0,52 | 2,45 |
| 102,45 | 1,44 | 6,43 |
| 108,88 | −0,86 | −3,58 |
| 105,30 | 1,46 | 6,70 |
| 112,00 | −0,69 | −2,89 |
| 109,11 | −0,74 | −3,04 |
| 106,06 | 0,21 | 1,23 |
| 107,30 | −1,10 | −4,60 |
| 102,69 | 0,73 | 3,41 |
| 106,11 | 1,16 | 5,43 |
| **111,54** | 2,56 | 12,20 |

⚠️ **Trois points de méthode.** (i) *Comme le processus simulé est **markovien**, les tirages de $\varepsilon$ doivent être **indépendants** les uns des autres.* (ii) *Le tableau montre **une seule** trajectoire possible ; des tirages différents donneraient des mouvements différents. **En répétant, on obtient la loi complète** de $S$ à 10 semaines.* Le 111,54 final est **un tirage** de cette loi. (iii) *N'importe quel $\Delta t$ convient ; **à la limite $\Delta t\to0$**, on obtient une description parfaite du processus.* En pratique il est plus efficace de simuler $\ln S$ que $S$ (chapitre 20).

</details>

## 🟡 Concept 5 — Les paramètres et les processus corrélés

| Paramètre | Statut |
|---|---|
| $\mu$ | *rendement espéré annualisé ; il dépend du **risque** — plus précisément **de la part du risque qui ne peut pas être diversifiée** — et du **niveau des taux** dans l'économie* |
| $\sigma$ | **volatilité** ; *valeurs typiques pour une action : **0,15 à 0,60***, soit 15 % à 60 % |

> ⚠️ **La bonne nouvelle décisive.** ***Nous n'avons pas à nous préoccuper des déterminants de $\mu$ en détail, parce que la valeur d'un dérivé dépendant d'une action est, en général, INDÉPENDANTE de $\mu$.*** *Le paramètre $\sigma$, en revanche, est **d'une importance critique** pour la valeur de nombreux dérivés.*

**Interprétation approchée de $\sigma$.** *L'écart-type du changement proportionnel sur $\Delta t$ est $\sigma\sqrt{\Delta t}$. En **approximation grossière**, celui sur une longue période $T$ est $\sigma\sqrt T$ : **la volatilité peut donc s'interpréter comme l'écart-type du changement du prix sur un an**.* Le chapitre 14 montrera qu'elle est **exactement** l'écart-type du rendement **capitalisé en continu** sur un an.

**Processus corrélés.** Pour $dx_1=a_1dt+b_1dz_1$ et $dx_2=a_2dt+b_2dz_2$ : si $x_1$ et $x_2$ sont **non corrélés**, les $\varepsilon_1,\varepsilon_2$ doivent être **indépendants** ; s'ils ont une corrélation $\rho$, il faut les tirer d'une **normale bivariée** de corrélation $\rho$ — on dit alors que $dz_1$ et $dz_2$ ont une corrélation $\rho$.

> **La recette de simulation, à connaître.** À partir de deux tirages **indépendants** $u$ et $v$ standard normaux :
>
> $$\boxed{\varepsilon_1=u\qquad\qquad \varepsilon_2=\rho u+\sqrt{1-\rho^2}\,v}$$
>
> *Généralisation : trois variables → normale **trivariée** ; $n$ variables → **normale multivariée** (chapitre 20).*

⚠️ *Dans ces processus, $a_1,a_2,b_1,b_2$ peuvent être des fonctions de $x_1$, $x_2$ **et** $t$ — en particulier $a_1$ et $b_1$ peuvent dépendre de $x_2$.*

## 🔴 Concept 6 — Le lemme d'Itô

**Le contexte.** *Le prix d'une option est une **fonction du prix de l'action et du temps**. Plus généralement, le prix de tout dérivé est une fonction des variables stochastiques sous-jacentes et du temps.* Résultat découvert par **K. Itô en 1951**.

> **Le lemme.** Si $x$ suit $dx=a(x,t)dt+b(x,t)dz$, alors une fonction $G$ de $x$ et $t$ suit
>
> $$\boxed{dG=\left(\frac{\partial G}{\partial x}a+\frac{\partial G}{\partial t}+\frac12\frac{\partial^2G}{\partial x^2}b^2\right)dt+\frac{\partial G}{\partial x}b\,dz}\;\text{(13.12)}$$
>
> ***où $dz$ est LE MÊME processus de Wiener*** que celui de $x$. $G$ suit donc aussi un processus d'Itô, de dérive $\frac{\partial G}{\partial x}a+\frac{\partial G}{\partial t}+\frac12\frac{\partial^2G}{\partial x^2}b^2$ et de taux de variance $\left(\frac{\partial G}{\partial x}\right)^2b^2$.

**Appliqué au prix d'une action** ($a=\mu S$, $b=\sigma S$) :

$$\boxed{dG=\left(\frac{\partial G}{\partial S}\mu S+\frac{\partial G}{\partial t}+\frac12\frac{\partial^2G}{\partial S^2}\sigma^2S^2\right)dt+\frac{\partial G}{\partial S}\sigma S\,dz}\;\text{(13.14)}$$

> ⚠️ **Le point que Hull souligne comme décisif.** ***$S$ et $G$ sont affectés par la MÊME source d'incertitude, $dz$. Cela se révèle très important dans la dérivation des résultats de Black-Scholes-Merton.*** C'est **exactement** ce qui permettra, au chapitre 14, de construire un portefeuille où le $dz$ **s'annule**.

⚠️ **Le terme qui n'existe pas en calcul ordinaire** est $\frac12\frac{\partial^2G}{\partial x^2}b^2\,dt$. Il vient de ce que $(dz)^2$ est d'ordre $dt$, et non $dt^2$ — la propriété $\sqrt{\Delta t}\gg\Delta t$ du concept 2. (Démonstration détaillée en fiche 56.)

<details><summary>**Exercice résolu A — le processus suivi par un prix forward**</summary>

**Question.** Que devient le **prix forward** d'une action sans dividende quand le temps passe ? Taux sans risque $r$ **constant**.

*Étape 1 — la relation.* D'après (5.1), $F_0=S_0e^{rT}$ ; à une date générale $t<T$ :

$$F=Se^{r(T-t)}\;\text{(13.15)}$$

*Étape 2 — les trois dérivées partielles.*

$$\frac{\partial F}{\partial S}=e^{r(T-t)}\qquad \frac{\partial^2F}{\partial S^2}=\mathbf{0}\qquad \frac{\partial F}{\partial t}=-rSe^{r(T-t)}$$

*Étape 3 — injecter dans (13.14).* Le terme du second ordre **disparaît** ($\partial^2F/\partial S^2=0$) :

$$dF=\big[e^{r(T-t)}\mu S-rSe^{r(T-t)}\big]dt+e^{r(T-t)}\sigma S\,dz$$

*Étape 4 — substituer $F=Se^{r(T-t)}$.*

$$\boxed{dF=(\mu-r)F\,dt+\sigma F\,dz}\;\text{(13.16)}$$

*Étape 5 — lire.* *Comme $S$, le prix forward suit un **mouvement brownien géométrique**. Il a un taux de croissance espéré de $\mu-r$ au lieu de $\mu$ : **la croissance de $F$ est l'excès de rendement de $S$ sur le taux sans risque**.* Et **la volatilité est inchangée**, à $\sigma$.

⚠️ **Le lemme d'Itô se réduit ici au calcul ordinaire**, parce que $F$ est **linéaire** en $S$. C'est le bon test : le terme d'Itô n'apparaît que pour les fonctions **non linéaires**.

</details>

## 🔴 Concept 7 — La propriété log-normale

<details><summary>**Exercice résolu B — le calcul le plus important du chapitre : $G=\ln S$**</summary>

*Étape 1 — poser $G=\ln S$ et calculer les dérivées.*

$$\frac{\partial G}{\partial S}=\frac1S\qquad \frac{\partial^2G}{\partial S^2}=-\frac1{S^2}\qquad \frac{\partial G}{\partial t}=0$$

*Étape 2 — injecter dans (13.14).*

$$dG=\left(\frac1S\mu S+0+\frac12\left(-\frac1{S^2}\right)\sigma^2S^2\right)dt+\frac1S\sigma S\,dz$$

*Étape 3 — simplifier.*

$$\boxed{d(\ln S)=\left(\mu-\frac{\sigma^2}{2}\right)dt+\sigma\,dz}\;\text{(13.17)}$$

*Étape 4 — reconnaître la nature du processus.* $\mu$ et $\sigma$ étant constants, **$\ln S$ suit un Wiener GÉNÉRALISÉ**, de dérive constante $\mu-\sigma^2/2$ et de taux de variance constant $\sigma^2$. *Étape 5 — en déduire la loi.* Le changement de $\ln S$ entre $0$ et $T$ est donc **normal** :

$$\boxed{\ln S_T-\ln S_0\sim\phi\!\left(\left(\mu-\frac{\sigma^2}{2}\right)T,\ \sigma^2T\right)}\;\text{(13.18)}$$

$$\boxed{\ln S_T\sim\phi\!\left(\ln S_0+\left(\mu-\frac{\sigma^2}{2}\right)T,\ \sigma^2T\right)}\;\text{(13.19)}$$

> **Conclusion.** *Une variable a une loi **log-normale** si son **logarithme naturel** est normalement distribué. Le modèle développé implique donc que **le prix de l'action en $T$, connaissant son prix aujourd'hui, est log-normal**. L'écart-type du logarithme du prix est $\sigma\sqrt T$ : il est **proportionnel à la racine carrée de l'horizon**.*

⚠️ **D'où vient le $-\sigma^2/2$ ?** **Uniquement du terme d'Itô**, $\frac12\left(-\frac1{S^2}\right)\sigma^2S^2$. Sans lui on écrirait naïvement $d(\ln S)=\mu\,dt+\sigma\,dz$ — **faux**. Ce demi-terme est la différence entre le **rendement arithmétique espéré** $\mu$ et le **rendement géométrique** $\mu-\sigma^2/2$ ; c'est lui qui produira le $d_2$ de Black-Scholes.

</details>

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| « quelle est la loi de $x$ dans $T$ ans ? » | **Wiener généralisé** | $\phi(x_0+aT,\ b^2T)$ |
| Une variance annuelle, un autre horizon | **additivité** | les **variances** s'ajoutent, pas les écarts-types |
| « quel processus suit $G(S,t)$ ? » | **lemme d'Itô** | (13.14), trois dérivées partielles |
| $G$ **linéaire** en $S$ | vérification | le terme d'Itô **disparaît** |
| « quelle est la loi de $S_T$ ? » | **log-normale** | $\ln S_T\sim\phi(\ln S_0+(\mu-\sigma^2/2)T,\sigma^2T)$ |
| Un pas de temps et deux paramètres | **simulation** | $\Delta S=\mu S\Delta t+\sigma S\varepsilon\sqrt{\Delta t}$ |
| Deux variables et une corrélation | **tirages corrélés** | $\varepsilon_2=\rho u+\sqrt{1-\rho^2}v$ |

## Comment résoudre ce type d'exercice

**Protocole lemme d'Itô — 5 étapes.**

1. Identifier $a(x,t)$ et $b(x,t)$ dans le processus de $x$ (pour une action : $a=\mu S$, $b=\sigma S$).
2. Calculer **les trois** dérivées : $\dfrac{\partial G}{\partial x}$, $\dfrac{\partial G}{\partial t}$, $\dfrac{\partial^2G}{\partial x^2}$.
3. Assembler la dérive : $\dfrac{\partial G}{\partial x}a+\dfrac{\partial G}{\partial t}+\dfrac12\dfrac{\partial^2G}{\partial x^2}b^2$.
4. Assembler la diffusion : $\dfrac{\partial G}{\partial x}b$ — **même $dz$** que pour $x$.
5. **Simplifier**, puis vérifier si le résultat est un Wiener généralisé (coefficients constants) ou un Itô.

**Protocole loi de $S_T$ — 3 étapes.**

1. Appliquer le lemme à $\ln S$ → dérive $\mu-\sigma^2/2$, variance $\sigma^2$.
2. Sur $[0,T]$ : $\ln S_T$ est **normale** de moyenne $\ln S_0+(\mu-\sigma^2/2)T$ et variance $\sigma^2T$.
3. Toute probabilité sur $S_T$ se calcule en **passant au logarithme** puis en utilisant $N(\cdot)$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Additionner les **écarts-types** sur des périodes successives | Ce sont les **variances** qui s'additionnent |
| Modéliser un prix d'action par un Wiener **généralisé** | Il autoriserait des prix **négatifs** et une dérive indépendante du niveau |
| Écrire $d(\ln S)=\mu\,dt+\sigma\,dz$ | Il manque le **$-\sigma^2/2$** du terme d'Itô |
| Oublier $\partial G/\partial t$ dans le lemme | Trois termes de dérive, **jamais deux** |
| Croire que $G$ a un **autre** $dz$ que $x$ | ***Le même*** — c'est ce qui rend la couverture possible |
| Croire que $\mu$ compte pour valoriser un dérivé | *La valeur d'un dérivé est **en général indépendante de $\mu$*** |
| Confondre $\sigma$ et $\sigma^2$ | $\sigma$ = **volatilité**, $\sigma^2$ = **taux de variance** |
| Tirer des $\varepsilon$ corrélés dans le temps | Le processus est **markovien** : tirages **indépendants** |
| Croire que $S_T$ est normale | **$\ln S_T$** est normale ; $S_T$ est **log-normale** |
| Appliquer le terme d'Itô à une fonction linéaire | $\partial^2G/\partial x^2=0$ : il **disparaît** |

## 📌 Ultimate Review

**La hiérarchie des processus.**

$$\underbrace{dz=\varepsilon\sqrt{dt}}_{\text{Wiener}}\ \subset\ \underbrace{dx=a\,dt+b\,dz}_{\text{Wiener généralisé}}\ \subset\ \underbrace{dx=a(x,t)dt+b(x,t)dz}_{\text{Itô}}$$

**Le modèle du prix d'une action.** $dS=\mu S\,dt+\sigma S\,dz$ — **mouvement brownien géométrique** ; version discrète $\Delta S/S\sim\phi(\mu\Delta t,\sigma^2\Delta t)$ ; **en monde risque-neutre, $\mu=r$**.

**Le lemme d'Itô.**

$$dG=\left(\frac{\partial G}{\partial x}a+\frac{\partial G}{\partial t}+\frac12\frac{\partial^2G}{\partial x^2}b^2\right)dt+\frac{\partial G}{\partial x}b\,dz$$

**Les deux applications à retenir par cœur.**

$$F=Se^{r(T-t)}\ \Longrightarrow\ dF=(\mu-r)F\,dt+\sigma F\,dz\qquad\qquad \ln S\ \Longrightarrow\ d(\ln S)=\left(\mu-\frac{\sigma^2}{2}\right)dt+\sigma\,dz$$

**La conclusion.** $\ln S_T\sim\phi\left(\ln S_0+(\mu-\sigma^2/2)T,\ \sigma^2T\right)$ : **$S_T$ est log-normale**, d'écart-type logarithmique $\sigma\sqrt T$.

**Les chiffres du chapitre.** Wiener partant de 25 : écart-type **1** à un an, **2,236** à cinq ans · trésorerie : moyenne **70**, écart-type **30** à un an ; **60** et **21,21** à six mois · simulation : $\mu\Delta t=\mathbf{0{,}00288}$, $\sigma\sqrt{\Delta t}=\mathbf{0{,}0416}$ pour une semaine, trajectoire $100\to\mathbf{111{,}54}$ · volatilités typiques **0,15 à 0,60** · Itô, **1951**.

## 🧠 Active Recall

<details><summary>Qu'est-ce que la propriété de Markov, et à quelle notion économique correspond-elle ?</summary>

*Seule la **valeur courante** de la variable est pertinente pour prédire l'avenir ; **l'historique passé et la façon dont le présent a émergé du passé sont sans importance**.* Elle correspond à l'**efficience de forme faible** : *le prix présent incorpore toute l'information contenue dans l'historique des prix passés*. Si elle était fausse, les analystes techniques battraient le marché — *il y a très peu de preuves qu'ils y parviennent*. C'est la **concurrence** qui la produit : un motif prédictif découvert serait exploité immédiatement, et donc **éliminé**.

</details>

<details><summary>Pourquoi l'incertitude est-elle proportionnelle à la racine carrée du temps ?</summary>

Parce que pour un processus markovien, **les variances des changements sur des périodes successives sont additives, pas les écarts-types**. Une variance de 1 par an donne une variance de $T$ sur $T$ années, donc un écart-type de $\sqrt T$. *À proprement parler, on ne devrait pas dire que l'écart-type est de 1,0 **par an**.*

</details>

<details><summary>Donner la définition formelle d'un processus de Wiener.</summary>

**(1)** $\Delta z=\varepsilon\sqrt{\Delta t}$ avec $\varepsilon\sim\phi(0,1)$. **(2)** Les $\Delta z$ de **deux intervalles différents** sont **indépendants**.

De (1) : $\mathbb E[\Delta z]=0$, $\mathrm{sd}=\sqrt{\Delta t}$, $\mathrm{Var}=\Delta t$. De (2) : $z$ est markovien. Sur $[0,T]$ : $z(T)-z(0)\sim\phi(0,T)$.

</details>

<details><summary>Pourquoi la trajectoire d'un Wiener est-elle « déchiquetée », et quelles deux propriétés extrêmes en découlent ?</summary>

Parce que l'écart-type du mouvement sur $\Delta t$ vaut $\sqrt{\Delta t}$, et que *quand $\Delta t$ est petit, $\sqrt{\Delta t}$ est **beaucoup plus grand** que $\Delta t$* : le déplacement vertical domine l'horizontal **à toute échelle**.

Conséquences : **(1)** *la **longueur espérée** du chemin sur n'importe quel intervalle est **infinie*** ; **(2)** *le **nombre espéré de passages** par une valeur donnée sur n'importe quel intervalle est **infini***.

</details>

<details><summary>Pourquoi le Wiener généralisé ne convient-il pas pour un prix d'action ?</summary>

Deux raisons. **(1) La dérive.** *Le rendement en pourcentage exigé est **indépendant du niveau du prix*** : 14 % par an que l'action vaille 10 ou 50. Il faut donc une dérive **proportionnelle à $S$**, soit $\mu S$. **(2) La diffusion.** *Un investisseur est **tout aussi incertain** du rendement en pourcentage à 50 qu'à 10* : l'écart-type doit être proportionnel à $S$. Et le Wiener généralisé autoriserait des **prix négatifs** — acceptable pour une trésorerie (qui emprunte), pas pour une action.

</details>

<details><summary>Écrire le processus du prix d'une action et sa version discrète, puis dire ce qui change en monde risque-neutre.</summary>

$$dS=\mu S\,dt+\sigma S\,dz\qquad\text{ou}\qquad \frac{dS}{S}=\mu\,dt+\sigma\,dz$$

Version discrète (**mouvement brownien géométrique**) : $\dfrac{\Delta S}{S}=\mu\Delta t+\sigma\varepsilon\sqrt{\Delta t}\sim\phi(\mu\Delta t,\sigma^2\Delta t)$.

**En monde risque-neutre, $\mu$ est remplacé par $r$** — et **seulement $\mu$** : $\sigma$ est inchangée (Girsanov, fiche 85).

</details>

<details><summary>Énoncer le lemme d'Itô et dire ce qui le distingue du calcul ordinaire.</summary>

$$dG=\left(\frac{\partial G}{\partial x}a+\frac{\partial G}{\partial t}+\frac12\frac{\partial^2G}{\partial x^2}b^2\right)dt+\frac{\partial G}{\partial x}b\,dz$$

Le calcul ordinaire donnerait seulement les deux premiers termes de dérive. **Le troisième, $\frac12\frac{\partial^2G}{\partial x^2}b^2$, est propre au calcul stochastique** : il vient de ce que $(dz)^2$ est d'ordre $dt$. Et **le $dz$ est le même** que celui de $x$ : *les deux sont soumis à la même source d'incertitude sous-jacente* — c'est ce qui permettra la couverture parfaite du chapitre 14.

</details>

<details><summary>Appliquer le lemme d'Itô à $F=Se^{r(T-t)}$ et interpréter.</summary>

$\dfrac{\partial F}{\partial S}=e^{r(T-t)}$, $\dfrac{\partial^2F}{\partial S^2}=0$, $\dfrac{\partial F}{\partial t}=-rSe^{r(T-t)}$. D'où

$$dF=\big[e^{r(T-t)}\mu S-rSe^{r(T-t)}\big]dt+e^{r(T-t)}\sigma S\,dz=\boxed{(\mu-r)F\,dt+\sigma F\,dz}$$

*Le prix forward suit lui aussi un **mouvement brownien géométrique**, avec un taux de croissance espéré $\mu-r$ au lieu de $\mu$ : **la croissance de $F$ est l'excès de rendement de $S$ sur le taux sans risque**.* Et la volatilité est **inchangée**. Le terme d'Itô a disparu parce que $F$ est **linéaire** en $S$.

</details>

<details><summary>Appliquer le lemme à $\ln S$ et en déduire la loi de $S_T$.</summary>

$\dfrac{\partial G}{\partial S}=\dfrac1S$, $\dfrac{\partial^2G}{\partial S^2}=-\dfrac1{S^2}$, $\dfrac{\partial G}{\partial t}=0$, donc

$$d(\ln S)=\left(\mu-\frac{\sigma^2}{2}\right)dt+\sigma\,dz$$

**$\ln S$ suit un Wiener généralisé** à coefficients constants, donc

$$\ln S_T\sim\phi\!\left(\ln S_0+\left(\mu-\frac{\sigma^2}{2}\right)T,\ \sigma^2T\right)$$

**$S_T$ est donc log-normale**, d'écart-type logarithmique $\sigma\sqrt T$.

</details>

<details><summary>D'où vient le terme $-\sigma^2/2$, et que signifie-t-il ?</summary>

**Uniquement du terme d'Itô** : $\frac12\left(-\frac1{S^2}\right)\sigma^2S^2=-\frac{\sigma^2}{2}$. Sans lui, on écrirait naïvement $d(\ln S)=\mu\,dt+\sigma\,dz$, ce qui est **faux**.

Sa signification : c'est l'écart entre le **rendement arithmétique espéré** $\mu$ et le **rendement géométrique** (celui effectivement réalisé à long terme) $\mu-\sigma^2/2$. Plus la volatilité est forte, plus le second est **inférieur** au premier. C'est ce terme qui produira le $d_2$ de Black-Scholes.

</details>

<details><summary>Comment simuler deux variables de corrélation $\rho$ ?</summary>

Tirer **deux** normales standard **indépendantes** $u$ et $v$, puis poser

$$\varepsilon_1=u\qquad\qquad \varepsilon_2=\rho u+\sqrt{1-\rho^2}\,v$$

On vérifie que $\varepsilon_2$ est standard normale ($\rho^2+1-\rho^2=1$) et que $\mathrm{corr}(\varepsilon_1,\varepsilon_2)=\rho$. Pour $n$ variables, il faut tirer d'une **normale multivariée** — c'est la décomposition de Cholesky (chapitre 20).

</details>

<details><summary>Pourquoi n'a-t-on pas besoin de connaître $\mu$ pour valoriser un dérivé ?</summary>

Parce que *la valeur d'un dérivé dépendant d'une action est, **en général, indépendante de $\mu$***. La raison profonde a été vue en fiche 85 : on valorise **relativement au prix de l'action**, et les anticipations sont **déjà dans $S_0$**. En revanche *$\sigma$ est **d'une importance critique*** — et c'est le seul paramètre qu'il faut réellement estimer.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Qu'est-ce qu'un processus de Markov ? | Seule la **valeur présente** compte pour prédire l'avenir |
| Notion économique correspondante ? | L'**efficience de forme faible** |
| Qu'est-ce qui s'additionne sur des périodes successives ? | Les **variances**, pas les écarts-types |
| Définition d'un Wiener (propriété 1) ? | $\Delta z=\varepsilon\sqrt{\Delta t}$, $\varepsilon\sim\phi(0,1)$ |
| Définition (propriété 2) ? | Les $\Delta z$ d'intervalles différents sont **indépendants** |
| Loi de $z(T)-z(0)$ ? | $\phi(0,T)$ |
| Autre nom du processus de Wiener ? | **Mouvement brownien** |
| Longueur espérée du chemin sur un intervalle ? | **Infinie** |
| Nombre espéré de passages par une valeur ? | **Infini** |
| Équation d'un Wiener généralisé ? | $dx=a\,dt+b\,dz$ |
| Sa dérive ? son taux de variance ? | $a$ · $\mathbf{b^2}$ |
| Loi de $\Delta x$ sur $T$ ? | $\phi(aT,\ b^2T)$ |
| Équation d'un processus d'Itô ? | $dx=a(x,t)dt+b(x,t)dz$ |
| Pourquoi pas un Wiener généralisé pour une action ? | Rendement **indépendant du niveau**, et prix **négatifs** possibles |
| Processus du prix d'une action ? | $dS=\mu S\,dt+\sigma S\,dz$ |
| Son nom ? | **Mouvement brownien géométrique** |
| Version discrète ? | $\Delta S/S\sim\phi(\mu\Delta t,\sigma^2\Delta t)$ |
| Que devient $\mu$ en monde risque-neutre ? | Il vaut **$r$** |
| Que vaut $S_T$ sans incertitude ? | $S_0e^{\mu T}$ |
| Fourchette typique de $\sigma$ ? | **0,15 à 0,60** |
| De quoi dépend $\mu$ ? | Du risque **non diversifiable** et du niveau des taux |
| A-t-on besoin de $\mu$ pour valoriser un dérivé ? | **Non** |
| Interprétation approchée de $\sigma$ ? | Écart-type du changement **sur un an** |
| Comment simuler $\varepsilon_2$ corrélé à $\varepsilon_1$ ? | $\varepsilon_2=\rho u+\sqrt{1-\rho^2}\,v$ |
| Qui a découvert le lemme, et quand ? | **K. Itô**, **1951** |
| Le lemme d'Itô ? | $dG=(G_xa+G_t+\frac12G_{xx}b^2)dt+G_xb\,dz$ |
| Quel terme est absent du calcul ordinaire ? | $\frac12G_{xx}b^2$ |
| Le $dz$ de $G$ est-il celui de $x$ ? | **Le même** — même source d'incertitude |
| Pourquoi est-ce essentiel ? | Cela permet **d'annuler** le risque par couverture |
| Taux de variance de $G$ ? | $(\partial G/\partial x)^2b^2$ |
| Processus suivi par $F=Se^{r(T-t)}$ ? | $dF=(\mu-r)F\,dt+\sigma F\,dz$ |
| Pourquoi le terme d'Itô y disparaît-il ? | $F$ est **linéaire** en $S$ |
| Processus suivi par $\ln S$ ? | $d(\ln S)=(\mu-\sigma^2/2)dt+\sigma\,dz$ |
| De quel type est ce processus ? | Un Wiener **généralisé** |
| Loi de $\ln S_T$ ? | $\phi(\ln S_0+(\mu-\sigma^2/2)T,\ \sigma^2T)$ |
| Loi de $S_T$ ? | **Log-normale** |
| Écart-type du log du prix ? | $\sigma\sqrt T$ |
| D'où vient le $-\sigma^2/2$ ? | **Du terme d'Itô** |
| Que mesure-t-il ? | L'écart entre rendement **arithmétique** et **géométrique** |
| Coefficients hebdomadaires de l'exemple ? | $\mu\Delta t=0{,}00288$ · $\sigma\sqrt{\Delta t}=0{,}0416$ |
| Instruction tableur pour tirer $\varepsilon$ ? | `=NORMSINV(RAND())` |
| Que vaut-il mieux simuler que $S$ ? | $\ln S$ |
