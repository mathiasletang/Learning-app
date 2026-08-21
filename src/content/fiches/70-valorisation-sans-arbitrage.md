# Fiche 70 — Valorisation sans arbitrage : densité de prix d'état et mesure risque-neutre

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | Kogan, *15.450 Analytics of Finance*, MIT Sloan / OpenCourseWare, automne 2010 — cours 1 « Arbitrage-Free Pricing Models » |
| **Difficulté** | Must know — la théorie générale dont Black-Scholes n'est qu'un cas |
| **Temps d'étude estimé** | 2 h 45 |
| **Prérequis** | Fiche 57 (arbre binomial, mesure risque-neutre), fiche 56 (changement de mesure), fiche 54 (modèles à facteurs) |
| **Concepts clés** | Arbitrage, loi du prix unique, théorème fondamental de la valorisation, densité de prix d'état, stratégie autofinancée, complétude de marché, modèle DCF, prime de risque, CAPM comme modèle de SPD, mesure risque-neutre, mesure martingale équivalente, prix du risque, volatilité implicite, contrats à terme |
| **Poids à l'examen** | Trois choses : le **FTAP** et la **démonstration** que l'existence d'une SPD exclut l'arbitrage ; la formule de la **prime de risque** $-(1+r)\mathrm{Cov}(R,\pi_{t+1}/\pi_t)$ et sa spécialisation au **CAPM** ; et la décomposition $\mu_t-r_t=\sigma_t\eta_t$ en **quantité** et **prix** du risque. |

## 🎯 Vue d'ensemble

> **L'approche originale — la réplication.** *L'approche originale de la valorisation d'options, qui remonte à Black, Scholes et Merton, consiste à utiliser un argument de **réplication** avec la **loi du prix unique**.* Dans un modèle binomial, *le payoff de toute option sur l'action peut être répliqué par un trading dynamique en l'action et l'obligation, d'où une **unique** valorisation sans arbitrage. Problème résolu ?*

> **Les défauts du modèle binomial.**
>
> - *Si la description binomiale de la dynamique de marché était exacte, **toutes les options seraient des instruments redondants**. Est-ce réaliste ?*
> - *Empiriquement, le modèle pose problème : on devrait pouvoir répliquer parfaitement les payoffs d'options en théorie, **cela ne se produit pas en pratique**.*
> - *Pourquoi construire de tels modèles ? Pour la **commodité**. Un prix d'option unique par réplication est une propriété très séduisante.*

```
SI LES OPTIONS SONT REDONDANTES   → réplication → prix UNIQUE
SINON                              → il y a PLUSIEURS prix sans arbitrage
NOUVELLE APPROCHE  construire un modèle conjoint (action, obligation, option)
   1. sans arbitrage
   2. conforme aux observations empiriques
OUTIL CENTRAL   la densité de prix d'état π_t (SPD)
   E_t[(π_{t+1}/π_t) R_{t+1}] = 1   pour TOUT actif
ÉQUIVALENT      la mesure risque-neutre Q
```

> **Le changement d'objectif, tel que le cours l'énonce.** *Même quand les options ne peuvent pas être répliquées, il ne doit pas y avoir d'arbitrage sur le marché. Le problème des options non redondantes est qu'il peut exister **plus d'une valeur** du prix d'option compatible avec l'absence d'arbitrage. On change donc d'objectif : construire un modèle conjoint **traitable** des actifs primitifs et des options, qui soit (1) **sans arbitrage** et (2) **conforme aux observations empiriques**.*
>
> *Quand les options sont redondantes, inutile de regarder les données de prix d'options : il y a un prix unique. Quand elles ne le sont pas, il faut s'appuyer sur les **données historiques de prix d'options** pour choisir parmi eux.*
>
> *On sait estimer des modèles dynamiques (EMV, QMLE…). Il faut apprendre à **construire des modèles traitables sans arbitrage**.*

## 🔴 Concept 1 — L'absence d'arbitrage

**Le cadre.** Une économie en temps discret à horizon fini, $t\in\{0,\dots,T\}$, avec un nombre **fini** d'états de la nature $s=1,\dots,N$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (arbitrage).</span>

*Un **arbitrage** est un flux de trésorerie réalisable — engendré par une stratégie de trading — qui est **positif ou nul dans chaque état** et **strictement positif avec probabilité non nulle**.*

</div>

> *On décrit souvent un arbitrage comme une stratégie sans investissement initial, sans risque de perte et à profit espéré positif. C'est un **cas particulier** de la définition ci-dessus.*
>
> *L'absence d'arbitrage implique la **loi du prix unique** : deux actifs de même payoff doivent avoir le même prix de marché.*

> **L'absence d'arbitrage peut être une exigence très faible ou au contraire très forte selon le contexte** :
>
> - **Actions** : peu de titres, beaucoup d'états. **Facile** d'éviter l'arbitrage.
> - **Taux** : beaucoup de titres, peu d'états. **Difficile** d'éviter l'arbitrage.

> **Cette dernière remarque est plus profonde qu'elle n'en a l'air.** Le nombre d'états mesure la richesse du hasard ; le nombre de titres mesure la richesse des contraintes. Sur les marchés de taux, des centaines d'obligations dépendent de quelques facteurs de courbe : les contraintes de cohérence sont donc très nombreuses, et l'absence d'arbitrage **détermine presque entièrement** les prix. C'est pourquoi les modèles de taux sont si contraints.

## 🔴 Concept 2 — Le théorème fondamental de la valorisation

<div class="callout" data-kind="formel">

<span class="callout__lab">Proposition (FTAP).</span>

*L'absence d'arbitrage est **équivalente** à l'existence d'un processus stochastique **strictement positif** $\{\pi_t(s)>0\}$ tel que, pour tout actif de prix $P_t$ (avec $P_T=0$) et de flux $D_t$ :*

$$\boxed{\ P_t(s)=\mathbb E_t\left[\sum_{u=t+1}^T\frac{\pi_u(s)}{\pi_t(s)}D_u(s)\right]\ }$$

*ou, sous forme de rendement,*

$$\boxed{\ \mathbb E_t\left[\frac{\pi_{t+1}(s)}{\pi_t(s)}R_{t+1}(s)\right]=1, \qquad R_{t+1}(s)=\frac{P_{t+1}(s)+D_{t+1}(s)}{P_t(s)}\ }$$

*Le processus $\pi_t(s)$ s'appelle la **densité de prix d'état** (*state-price density*, SPD).*

*Le FTAP implique la loi du prix unique.*

</div>

> **Comprenez la portée du théorème.** Il transforme une propriété **économique** — l'absence d'arbitrage, qui porte sur toutes les stratégies imaginables — en un objet **mathématique** manipulable : un processus positif $\pi_t$. Et une **seule** équation, $\mathbb E_t[(\pi_{t+1}/\pi_t)R_{t+1}]=1$, vaut pour **tous** les actifs — actions, obligations, options, contrats à terme.
>
> **C'est l'équation la plus générale de la finance.** Tout le reste du cours en est une spécialisation : le CAPM, les modèles à facteurs, la valorisation risque-neutre, Black-Scholes.

## 🔴 Concept 3 — De la SPD à l'absence d'arbitrage

*Démontrons une direction — la plus facile : **si une SPD existe, il ne peut y avoir d'arbitrage**.*

**Le cadre.** $W_t$ est la valeur du portefeuille et $(\theta^1,\dots,\theta^N)$ les quantités détenues des actifs risqués. *Un arbitrage est une stratégie telle que $W_0\leq0$ tandis que $W_T\geq0$ et $W_T\neq0$.*

> **Condition d'autofinancement.** *La stratégie est **autofinancée** si elle n'engendre aucune entrée ni sortie de trésorerie hors des dates $0$ et $T$ :*
>
> $$W_{t+1}=\sum_i\theta^i_{t+1}P^i_{t+1}=\sum_i\theta^i_t\big(P^i_{t+1}+D^i_{t+1}\big)$$

**Étape 1 — montrer que $\pi_tW_t=\mathbb E_t[\pi_{t+1}W_{t+1}]$.**

$$\mathbb E_t\big[\pi_{t+1}W_{t+1}\big]\overset{\text{autofin.}}{=}\mathbb E_t\left[\pi_{t+1}\sum_i\theta^i_t\big(P^i_{t+1}+D^i_{t+1}\big)\right]\overset{\text{FTAP}}{=}\sum_i\theta^i_t\,\pi_tP^i_t=\pi_tW_t$$

**Étape 2 — itérer depuis $0$.**

$$\pi_0W_0=\mathbb E_0[\pi_1W_1]=\mathbb E_0\big[\mathbb E_1[\pi_2W_2]\big]=\mathbb E_0[\pi_2W_2]=\cdots=\mathbb E_0\big[\pi_TW_T\big]$$

**Étape 3 — conclure.** *Étant donné que la SPD est **strictement positive**, il est impossible d'avoir $W_0\leq0$ tandis que $W_T\geq0$ et $W_T\neq0$. Il ne peut donc y avoir d'arbitrage.* $\blacksquare$

> **La démonstration tient en une idée : $\pi_tW_t$ est une martingale.** L'autofinancement dit que la richesse ne change que par la valorisation des actifs détenus ; le FTAP dit que chaque actif, pondéré par $\pi$, est une martingale ; donc le portefeuille aussi. Et une martingale nulle ou négative au départ ne peut pas être positive et non nulle à l'arrivée — son espérance est conservée.
>
> **La positivité stricte de $\pi$ est indispensable** : c'est elle qui empêche de « cacher » un gain dans un état de prix d'état nul.

## 🔴 Concept 4 — Unicité de la SPD et complétude

> - *Lorsqu'il existe un **ensemble complet de créances contingentes** (les marchés sont **complets**), il y a une **unique SPD** compatible avec l'absence d'arbitrage : $\pi_t(s)$ est le **prix d'une créance payant 1 dollar dans l'état $s$ à la date $t$**, normalisé par la probabilité $p_t$ de cet état.*
> - *La réciproque est vraie : **s'il n'existe qu'une seule SPD, toutes les options sont redondantes**.*
> - *Quand il y a **moins d'actifs que d'états de la nature**, il peut y avoir **plusieurs SPD** compatibles avec l'absence d'arbitrage.*
> - *Le FTAP dit que s'il n'y a pas d'arbitrage, il doit exister **au moins une** façon d'introduire un système cohérent de prix d'état positifs.*

⚠️ **Voilà la structure logique complète, et elle mérite d'être mémorisée telle quelle.**

| Situation | SPD | Options |
|---|---|---|
| Marché **complet** (autant d'actifs que d'états) | **unique** | **redondantes**, prix unique |
| Marché **incomplet** (moins d'actifs que d'états) | **plusieurs** | **non redondantes**, plusieurs prix |

> **Et c'est la réponse au problème posé en introduction.** Le modèle binomial est complet, d'où l'unicité du prix — mais aussi son irréalisme, puisqu'il rend toutes les options redondantes. Dans un marché incomplet, il faut **choisir** parmi les SPD possibles, et c'est là qu'interviennent les **données historiques de prix d'options**.

*On abandonne désormais la dépendance explicite en l'état et l'on écrit $\pi_t$ au lieu de $\pi_t(s)$.*

## 🟠 Concept 5 — L'arbre binomial et son modèle DCF

**Dans l'arbre binomial**, les options sont redondantes et la SPD est **unique à normalisation près**. Le FTAP appliqué à l'obligation sans risque et à l'action donne

$$p\frac{\pi_{t+1}(u)}{\pi_t}(1+r)+(1-p)\frac{\pi_{t+1}(d)}{\pi_t}(1+r)=1, \qquad p\frac{\pi_{t+1}(u)}{\pi_t}u+(1-p)\frac{\pi_{t+1}(d)}{\pi_t}d=1$$

Ce système de deux équations à deux inconnues se résout en

$$\frac{\pi_{t+1}(u)}{\pi_t}=\frac{1}{p(1+r)}\cdot\frac{1+r-d}{u-d}, \qquad \frac{\pi_{t+1}(d)}{\pi_t}=\frac{1}{(1-p)(1+r)}\cdot\frac{u-(1+r)}{u-d}$$

> **Algorithme — un modèle de flux actualisés (DCF).**
>
> 1. Spécifier le processus des **flux de trésorerie** $D_t$.
> 2. Spécifier la **SPD** $\pi_t$.
> 3. En déduire le processus de prix $$P_t=\mathbb E_t\left[\sum_{u=t+1}^T\frac{\pi_u}{\pi_t}D_u\right]$$

> *Pour rendre cela pratique, il faut apprendre à **paramétrer les SPD** à l'étape (2), afin que l'étape (3) soit efficace. On peut utiliser des processus **conditionnellement gaussiens** en temps discret.*

## 🔴 Concept 6 — SPD et prime de risque

Soit $R_{t+1}$ le rendement brut d'un actif risqué. Le FTAP donne

$$\mathbb E_t\left[\frac{\pi_{t+1}}{\pi_t}R_{t+1}\right]=1 \qquad\text{et, appliqué à l'actif sans risque,}\qquad \mathbb E_t\left[\frac{\pi_{t+1}}{\pi_t}\right](1+r_t)=1$$

**En utilisant la définition de la covariance**, $\mathbb E[XY]=\mathbb E[X]\mathbb E[Y]+\mathrm{Cov}(X,Y)$ :

$$1=\frac{\mathbb E_t[R_{t+1}]}{1+r_t}+\mathrm{Cov}_t\left(R_{t+1},\frac{\pi_{t+1}}{\pi_t}\right)$$

d'où :

> **Prime de risque conditionnelle et bêta de SPD.**
>
> $$\boxed{\ \text{Prime de risque}_t\equiv\mathbb E_t[R_{t+1}]-(1+r_t)=-(1+r_t)\,\mathrm{Cov}_t\left(R_{t+1},\frac{\pi_{t+1}}{\pi_t}\right)\ }$$

> **Cette formule est le cœur économique de toute la théorie.** Un actif a une **prime de risque positive** si et seulement si son rendement est **négativement corrélé** à la SPD.
>
> **Et le signe se comprend.** $\pi_{t+1}$ est élevé dans les états où la richesse marginale vaut cher — les mauvais états, les récessions. Un actif qui **paye mal** quand $\pi$ est **élevé** — c'est-à-dire qui vous fait défaut quand vous en auriez le plus besoin — est **peu désirable**, donc bon marché, donc à rendement espéré **élevé**. C'est la prime de risque.
>
> Inversement, un actif qui paye bien dans les mauvais états est une **assurance** : on accepte de le payer cher, et son rendement espéré est **inférieur** au taux sans risque. L'or et les obligations d'État en sont les exemples classiques.

## 🔴 Concept 7 — Le CAPM comme modèle de SPD

> *Le CAPM dit que les primes de risque de toutes les actions doivent être **proportionnelles à leurs bêtas de marché**. Il peut être **réinterprété comme un énoncé sur la SPD** valorisant tous les actifs.*

**L'hypothèse.**

$$\frac{\pi_{t+1}}{\pi_t}=a-b\,R^M_{t+1}$$

où $R^M$ est le rendement du portefeuille de marché. *(La formule peut être vue comme une approximation, si elle implique des valeurs négatives de $\pi$.)*

**La dérivation.** En reportant dans la formule générale de la prime de risque, pour toute action $j$ :

$$\mathbb E_t\big[R^j_{t+1}-(1+r_t)\big]=\text{const}\times\mathrm{Cov}_t\big(R^j_{t+1},R^M_{t+1}\big)$$

*La formule vaut pour **tout** actif, y compris le rendement de marché lui-même. On s'en sert pour trouver la constante :*

$$\boxed{\ \mathbb E_t\big[R^j_{t+1}-(1+r_t)\big]=\mathbb E_t\big[R^M_{t+1}-(1+r_t)\big]\cdot\frac{\mathrm{Cov}_t\big(R^j_{t+1},R^M_{t+1}\big)}{\mathrm{Var}_t\big(R^M_{t+1}\big)}\ }$$

> **C'est exactement le CAPM**, le facteur $\frac{\mathrm{Cov}_t(R^j,R^M)}{\mathrm{Var}_t(R^M)}$ étant le **bêta** de la fiche 54.
>
> **L'astuce de calibration mérite d'être notée.** Plutôt que de calculer $a$ et $b$, on applique la formule au **marché lui-même** — pour lequel $\mathrm{Cov}_t(R^M,R^M)=\mathrm{Var}_t(R^M)$ —, ce qui identifie immédiatement la constante. Une seule équation supplémentaire suffit.

## 🔴 Concept 8 — Les modèles multifactoriels

> *D'autres théories (l'APT, par exemple) impliquent qu'il y a **plusieurs facteurs valorisés** dans les rendements, pas seulement le facteur de marché. Les modèles multifactoriels sont couramment utilisés pour décrire la coupe transversale des rendements — par exemple le modèle à trois facteurs de Fama-French.*

$$\frac{\pi_{t+1}}{\pi_t}=a+b_1F^1_{t+1}+\cdots+b_KF^K_{t+1}$$

*où les $F^k$ sont $K$ facteurs. Les facteurs peuvent être des **rendements de portefeuilles**, ou des variables **non liées à des rendements** — chocs macroéconomiques, par exemple.*

**Les primes de risque ont alors une structure factorielle :**

$$\boxed{\ \mathbb E_t\big[R^j_{t+1}-(1+r_t)\big]=\sum_{k=1}^K\lambda_k\,\mathrm{Cov}_t\big(R^j_{t+1},F^k_{t+1}\big)\ }$$

> ***Les modèles à facteurs sont simplement des énoncés sur la structure factorielle de la SPD.***

⚠️ **Cette phrase change la lecture de la fiche 54.** On y voyait les modèles à facteurs comme un outil **statistique** de réduction de dimension pour estimer $\Sigma$. On voit ici qu'ils sont d'abord des **théories de valorisation** : dire que $\pi$ est linéaire en $K$ facteurs, c'est dire que seuls $K$ risques sont **rémunérés**. Un actif peut être très volatil sans mériter de prime, si sa volatilité est orthogonale aux facteurs.

## 🔴 Concept 9 — La mesure risque-neutre

> *On peut construire des modèles en spécifiant la SPD et en calculant tous les prix. Il est généralement **plus commode** d'utiliser une construction reliée, appelée **valorisation risque-neutre**. C'est une **construction mathématique**, souvent commode, et qui ajoute à l'intuition.*

**Les notations.** $\mathbb P$ est la **mesure physique** — celle qui sous-tend les observations empiriques — et $\mathbb Q$ la **mesure risque-neutre**. *$\mathbb Q$ est une construction mathématique servant à valoriser, et **indirectement** reliée aux données empiriques.* On note $B_t$ la valeur du compte sans risque :

$$B_t=\prod_{u=0}^{t-1}(1+r_u)$$

> **$\mathbb Q$ est la mesure sous laquelle**
>
> $$P_t=\mathbb E_t^{\mathbb P}\left[\sum_{u=t+1}^T\frac{\pi_u}{\pi_t}D_u\right]=\mathbb E_t^{\mathbb Q}\left[\sum_{u=t+1}^T\frac{B_t}{B_u}D_u\right] \qquad \text{pour tout actif de flux } D$$
>
> - *Sous $\mathbb Q$, la **formule DCF standard** s'applique.*
> - *Sous $\mathbb Q$, les **rendements espérés de tous les actifs égalent le taux sans risque** :* $\mathbb E_t^{\mathbb Q}[R_{t+1}]=1+r_t$.
> - *Si $\mathbb Q$ a une densité **positive** par rapport à $\mathbb P$, il n'y a pas d'arbitrage.*
> - *Il peut exister **plusieurs** mesures risque-neutres.*
> - *$\mathbb Q$ est aussi appelée **mesure martingale équivalente (EMM)**.*

> **Comparez les deux écritures : c'est le même contenu, réparti différemment.** Sous $\mathbb P$, l'actualisation se fait par la SPD $\pi_u/\pi_t$, qui mélange préférence temporelle **et** aversion au risque. Sous $\mathbb Q$, l'actualisation est **purement temporelle** ($B_t/B_u$) et tout l'ajustement pour le risque est passé dans la **mesure**. C'est plus commode parce que $B_t/B_u$ est déterministe quand les taux le sont.

### La construction explicite de $\mathbb Q$

Sur un arbre, soit $C(\nu_t)$ l'ensemble des nœuds de date $t+1$ enfants du nœud $\nu_t$. On définit

$$q(\nu_{t+1})=(1+r_t)\,q(\nu_t)\,\frac{\pi(\nu_{t+1})\,p(\nu_{t+1})}{\pi(\nu_t)\,p(\nu_t)}$$

*Rappelons que le rapport $p(\nu_{t+1})/p(\nu_t)$ est la probabilité conditionnelle de $\nu_{t+1}$ sachant $\nu_t$.*

**Ce sont bien des probabilités.** $q(\nu_{t+1})>0$, et

$$\sum_{\nu_{t+1}\in C(\nu_t)}q(\nu_{t+1})=q(\nu_t)\,\mathbb E_t^{\mathbb P}\left[(1+r_t)\frac{\pi_{t+1}}{\pi_t}\right]=q(\nu_t)$$

par le FTAP appliqué à l'actif sans risque.

**Et ce sont bien les probabilités risque-neutres.** Pour tout actif $i$ :

$$\mathbb E_t^{\mathbb Q}\left[\frac{R^i_{t+1}}{1+r_t}\right]=\sum_{\nu_{t+1}}\frac{q(\nu_{t+1})}{q(\nu_t)}\frac{R^i_{t+1}}{1+r_t}=\sum_{\nu_{t+1}}\frac{p(\nu_{t+1})}{p(\nu_t)}\frac{\pi(\nu_{t+1})}{\pi(\nu_t)}R^i_{t+1}=\mathbb E_t^{\mathbb P}\left[\frac{\pi_{t+1}}{\pi_t}R^i_{t+1}\right]=1$$

**Sur l'arbre binomial**, le FTAP donne directement

$$qu+(1-q)d=1+r_t \qquad\Longrightarrow\qquad q=\frac{1+r_t-d}{u-d}$$

et l'on vérifie que le calcul par la SPD redonne la même valeur.

## 🔴 Concept 10 — Le changement de mesure gaussien et le prix du risque

> **Le résultat.** *Sous $\mathbb P$, $\varepsilon^{\mathbb P}\sim N(0,1)$. Définissons une nouvelle mesure $\mathbb Q$ telle que, sous $\mathbb Q$, $\varepsilon^{\mathbb P}\sim N(-\eta,1)$. En posant $\xi=\frac{d\mathbb Q}{d\mathbb P}$ :*
>
> $$\xi(\varepsilon^{\mathbb P})=\exp\left(-\frac{(\varepsilon^{\mathbb P}+\eta)^2}{2}+\frac{(\varepsilon^{\mathbb P})^2}{2}\right)=\exp\left(-\eta\varepsilon^{\mathbb P}-\frac{\eta^2}{2}\right)$$
>
> *Le changement de mesure est donné par une variable **log-normale** $\xi(\varepsilon^{\mathbb P})$ servant de densité :*
>
> $$\frac{d\mathbb Q}{d\mathbb P}=e^{-\eta\varepsilon^{\mathbb P}-\eta^2/2} \qquad\Longrightarrow\qquad \varepsilon^{\mathbb Q}=\varepsilon^{\mathbb P}+\eta\sim N(0,1) \text{ sous } \mathbb Q$$

> **Reconnaissez le théorème de Girsanov de la fiche 56**, en temps discret : la densité est l'exponentielle stochastique $e^{-\eta\varepsilon-\eta^2/2}$, et l'effet est de **décaler la moyenne** du bruit — donc d'ajouter ou retirer une dérive — sans toucher à la variance.

### Le prix du risque

*Quand $\mathbb P$ et $\mathbb Q$ sont toutes deux gaussiennes, on peut définir le **prix du risque** — notion clé des modèles en temps continu.*

Considérons un actif de rendement brut

$$R_{t+1}=\exp\left(\mu_t-\frac{\sigma_t^2}{2}+\sigma_t\varepsilon^{\mathbb P}_{t+1}\right), \qquad \mathbb E_t[R_{t+1}]=\exp(\mu_t)$$

avec $\varepsilon^{\mathbb P}_{t+1}\sim N(0,1)$ i.i.d. sous $\mathbb P$, un taux sans risque $\exp(r_t)-1$, et la SPD

$$\pi_{t+1}=\pi_t\exp\left(-r_t-\frac{\eta_t^2}{2}-\eta_t\varepsilon^{\mathbb P}_{t+1}\right)$$

**Sous $\mathbb Q$**, avec $\varepsilon^{\mathbb Q}_{t+1}=\varepsilon^{\mathbb P}_{t+1}+\eta_t$, la loi du rendement devient

$$R_{t+1}=\exp\left(\mu_t-\frac{\sigma_t^2}{2}-\sigma_t\eta_t+\sigma_t\varepsilon^{\mathbb Q}_{t+1}\right)$$

**Par définition de la mesure risque-neutre**, $\mathbb E^{\mathbb Q}_t[R_{t+1}]=\exp(r_t)$, d'où $\mu_t-\sigma_t\eta_t=r_t$, c'est-à-dire

> $$\boxed{\ \mu_t-r_t=\sigma_t\,\eta_t\ }$$
>
> - $\sigma_t$ est la **quantité de risque** ;
> - $\eta_t$ est le **prix du risque**.
>
> *Les modèles à prix du risque variable dans le temps, $\eta_t$, présentent de la **prévisibilité des rendements**.*

> **Cette décomposition est l'un des énoncés les plus utiles de la finance quantitative.** La prime de risque est le **produit** de deux choses très différentes : combien de risque on porte ($\sigma_t$), et combien le marché paye par unité de risque ($\eta_t$).
>
> **Et la dernière remarque est la clé de l'économétrie financière moderne.** Si $\eta_t$ varie dans le temps, alors la prime de risque varie, donc les rendements sont **partiellement prévisibles** — sans qu'il y ait le moindre arbitrage. C'est la réconciliation entre efficience des marchés et prévisibilité empirique.

## 🟠 Concept 11 — Black-Scholes et la volatilité implicite

**Le modèle.** Une action de prix $S_t$, sans dividende, avec

$$\frac{S_{t+1}}{S_t}=\exp\left(\mu-\frac{\sigma^2}{2}+\sigma\varepsilon^{\mathbb P}_{t+1}\right)$$

un taux court **constant**, et sous $\mathbb Q$ :

$$\frac{S_{t+1}}{S_t}=\exp\left(r-\frac{\sigma^2}{2}+\sigma\varepsilon^{\mathbb Q}_{t+1}\right), \qquad \varepsilon^{\mathbb Q}_{t+1}\sim N(0,1) \text{ i.i.d.}$$

*Le prix en $t$ de toute option européenne de payoff $C_T=H(S_T)$ est*

$$C_t=\mathbb E^{\mathbb Q}_t\left[e^{-r(T-t)}H(S_T)\right]$$

*C'est un modèle sans arbitrage, et les prix des calls et puts européens sont donnés par la formule de Black-Scholes.*

> **La volatilité implicite.** Le modèle exprime le prix comme fonction $C(S_t,K,r,\sigma,T)$. La **volatilité implicite** $\hat\sigma_i$ d'un call de strike $K_i$ et de maturité $T_i$ est définie par
>
> $$C_i=C\big(S_t,K_i,r,\hat\sigma_i,T_i\big)$$
>
> *Elle **réconcilie le prix observé avec la formule de Black-Scholes**. Les prix d'options sont typiquement cotés en volatilités implicites.*

> **Le rejet empirique du modèle.** *Si les prix de marché étaient conformes à la formule, la volatilité implicite serait **la même pour toutes les options**, égale à la volatilité du processus sous-jacent. Empiriquement, elle dépend du **strike** et de la **maturité**.*
>
> - La **décroissance** de $\hat\sigma$ avec le strike s'appelle le **« skew » de volatilité** — observé par exemple sur les options S&P 500 du 5 mai 1993, à 44 jours d'échéance.
> - La variation avec la maturité s'appelle la **structure par terme**.
> - Collectivement, on parle du **« smile » de volatilité**.

⚠️ **C'est la raison d'être de tout ce cours.** Black-Scholes suppose $\sigma$ constante et le marché dit le contraire. *Le modèle de référence est rejeté ; il existe de nombreuses généralisations, et l'on explore le modèle à volatilité **EGARCH**, qui répond à certaines de ses limites empiriques.* Le cadre SPD / mesure risque-neutre est précisément ce qui permet de construire ces généralisations **sans réintroduire d'arbitrage**.

## 🟠 Concept 12 — Les contrats à terme

> *On veut construire un modèle sans arbitrage des prix de contrats à terme (**futures**). Dans le cas de taux déterministes et de stockage sans coût, le prix du future égale le prix du forward. **En pratique, le stockage n'est pas gratuit**, et les simples arguments de réplication ne suffisent plus.*

**La construction.** Soit $\Phi^T_t$ le prix en $t$ du contrat de maturité $T$. *Les futures sont **réglés en continu**, de sorte que le détenteur d'une position longue encaisse $\Phi^T_t-\Phi^T_{t-1}$ à chaque période — ce qui réduit le risque de défaut. La **valeur de marché du contrat est toujours nulle**.* Dans le cadre risque-neutre,

$$\mathbb E^{\mathbb Q}_t\left[\sum_{u=t+1}^T\frac{B_t}{B_u}\big(\Phi^T_u-\Phi^T_{u-1}\big)\right]=0 \qquad \text{pour tout } t$$

*On en conclut, par récurrence à rebours et espérances itérées, que*

$$\mathbb E^{\mathbb Q}_t\big[\Phi^T_{t+1}-\Phi^T_t\big]=0 \qquad\text{et donc}\qquad \boxed{\ \Phi^T_t=\mathbb E^{\mathbb Q}_t\big[\Phi^T_T\big]=\mathbb E^{\mathbb Q}_t[S_T]\ }$$

où $S_T$ est le prix au comptant en $T$.

> **Le prix du future est l'espérance risque-neutre du prix comptant futur** — un résultat d'une grande simplicité, et qui ne suppose ni stockage gratuit ni taux déterministes.

### L'exemple du prix au comptant AR(1)

Supposons que sous $\mathbb P$

$$S_t-\bar S=\theta\big(S_{t-1}-\bar S\big)+\sigma\varepsilon^{\mathbb P}_t, \qquad \varepsilon^{\mathbb P}_t\sim N(0,1) \text{ i.i.d.}$$

*Sous $\mathbb Q$, le prix reste un **AR(1) de même vitesse de retour à la moyenne**, mais de **moyenne de long terme différente** $\bar S^{\mathbb Q}$.* En itérant vers l'avant :

$$S_{t+n}-\bar S^{\mathbb Q}=\theta^n\big(S_t-\bar S^{\mathbb Q}\big)+\sigma\varepsilon^{\mathbb Q}_{t+n}+\cdots+\theta^{n-1}\sigma\varepsilon^{\mathbb Q}_{t+1}$$

d'où

$$\boxed{\ \Phi^T_t=\mathbb E^{\mathbb Q}_t[S_T]=\bar S^{\mathbb Q}\big(1-\theta^{T-t}\big)+\theta^{T-t}S_t\ }$$

*Les prix de contrats à terme de diverses maturités donnés par ce modèle n'admettent pas d'arbitrage.*

**Le gain espéré sur une position longue.** Sous $\mathbb Q$ il est **nul** : $\mathbb E^{\mathbb Q}_t[\Phi^T_{t+1}-\Phi^T_t]=0$. Mais *le contrat procure une exposition au risque $\varepsilon^{\mathbb P}$, et ce risque est **rémunéré**, au prix du risque $\eta$*. Avec $\varepsilon^{\mathbb Q}_{t+1}=\eta+\varepsilon^{\mathbb P}_{t+1}$ :

$$\Phi^T_{t+1}-\Phi^T_t=\sigma\theta^{T-t-1}\varepsilon^{\mathbb Q}_{t+1}=\eta\sigma\theta^{T-t-1}+\sigma\theta^{T-t-1}\varepsilon^{\mathbb P}_{t+1}$$

donc, sous $\mathbb P$, le gain espéré est **non nul** :

$$\mathbb E^{\mathbb P}_t\big[\Phi^T_{t+1}-\Phi^T_t\big]=\eta\sigma\theta^{T-t-1} \qquad \text{pour tout } t$$

*On peut estimer les paramètres du modèle, dont $\eta$, à partir des prix historiques de futures.*

> **C'est l'illustration la plus nette du rôle des deux mesures.** Sous $\mathbb Q$, le future est une martingale — c'est ce qui garantit l'absence d'arbitrage. Sous $\mathbb P$ — le monde réel —, il dégage un gain espéré $\eta\sigma\theta^{T-t-1}$, qui est la **rémunération du risque porté**. Et c'est cette différence, mesurable sur données historiques, qui **identifie $\eta$**.

## Comment résoudre l'exercice type (protocole)

1. **Poser le cadre** : dates, états, actifs disponibles ; le marché est-il **complet** ?
2. **Écrire le FTAP** : $\mathbb E_t[(\pi_{t+1}/\pi_t)R_{t+1}]=1$ pour chaque actif — dont l'actif sans risque.
3. **Résoudre en $\pi$** : autant d'équations que d'actifs. Marché complet ⟹ SPD unique.
4. **Ou passer à $\mathbb Q$** : $q(\nu_{t+1})=(1+r_t)q(\nu_t)\frac{\pi(\nu_{t+1})p(\nu_{t+1})}{\pi(\nu_t)p(\nu_t)}$, et valoriser par $\mathbb E^{\mathbb Q}_t[\sum(B_t/B_u)D_u]$.
5. **Pour une prime de risque** : $-(1+r_t)\mathrm{Cov}_t(R_{t+1},\pi_{t+1}/\pi_t)$.
6. **Pour un modèle à facteurs** : spécifier $\pi_{t+1}/\pi_t$ linéaire en les facteurs, et calibrer la constante sur un actif connu.
7. **En cadre gaussien** : identifier $\eta_t$, et vérifier $\mu_t-r_t=\sigma_t\eta_t$.
8. **Pour un future** : $\Phi^T_t=\mathbb E^{\mathbb Q}_t[S_T]$.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « prix sans arbitrage » | **FTAP** ⟹ existence d'une SPD |
| « marché complet / incomplet » | SPD **unique** / **multiple** |
| « prix d'une créance contingente » | $\pi_t(s)$ normalisé par $p_t$ |
| « prime de risque » | $-(1+r)\mathrm{Cov}(R,\pi_{t+1}/\pi_t)$ |
| « bêta de marché » | CAPM ⟹ $\pi_{t+1}/\pi_t=a-bR^M$ |
| « plusieurs facteurs valorisés » | $\pi_{t+1}/\pi_t$ **linéaire en les facteurs** |
| « valorisation risque-neutre » | $\mathbb E^{\mathbb Q}_t[\sum(B_t/B_u)D_u]$ |
| « prix du risque » | $\eta_t$, avec $\mu_t-r_t=\sigma_t\eta_t$ |
| « rendements prévisibles » | $\eta_t$ **variable dans le temps** |
| « volatilité implicite non constante » | **smile** ⟹ rejet de Black-Scholes |
| « prix d'un contrat à terme » | $\Phi^T_t=\mathbb E^{\mathbb Q}_t[S_T]$ |

### Exercices progressifs

**Niveau 1** — Énoncez le FTAP et dites ce qu'il apporte.

<details><summary>Correction</summary>

**L'énoncé.** L'absence d'arbitrage est **équivalente** à l'existence d'un processus strictement positif $\{\pi_t(s)>0\}$ tel que, pour tout actif de prix $P_t$ et de flux $D_t$ :

$$P_t=\mathbb E_t\left[\sum_{u=t+1}^T\frac{\pi_u}{\pi_t}D_u\right] \qquad\text{ou}\qquad \mathbb E_t\left[\frac{\pi_{t+1}}{\pi_t}R_{t+1}\right]=1$$

$\pi_t$ est la **densité de prix d'état** (SPD).

**Ce qu'il apporte — trois choses.**

1. **Il traduit l'économie en mathématiques.** L'absence d'arbitrage porte sur **toutes** les stratégies imaginables — objet impossible à manipuler. Le FTAP la remplace par l'existence d'**un seul processus positif**.
2. **Une équation pour tous les actifs.** $\mathbb E_t[(\pi_{t+1}/\pi_t)R_{t+1}]=1$ vaut pour les actions, les obligations, les options, les futures. C'est l'équation la plus générale de la finance.
3. **Il fonde une méthode constructive.** Pour bâtir un modèle sans arbitrage, il suffit de **spécifier une SPD positive** — l'absence d'arbitrage est alors automatique. C'est l'algorithme DCF en trois étapes.

**Et il implique la loi du prix unique** : deux actifs de même payoff ont la même valeur, puisque le membre de droite ne dépend que du flux.

</details>

**Niveau 2** — Démontrez qu'une SPD positive exclut l'arbitrage.

<details><summary>Correction</summary>

**Le cadre.** $W_t$ = valeur du portefeuille, $\theta^i_t$ = quantités détenues. Un **arbitrage** est une stratégie telle que $W_0\leq0$ tandis que $W_T\geq0$ et $W_T\neq0$.

**Étape 1 — l'autofinancement.** La stratégie n'engendre aucun flux hors de $0$ et $T$ :

$$W_{t+1}=\sum_i\theta^i_{t+1}P^i_{t+1}=\sum_i\theta^i_t\big(P^i_{t+1}+D^i_{t+1}\big)$$

**Étape 2 — $\pi_tW_t$ est une martingale.**

$$\mathbb E_t[\pi_{t+1}W_{t+1}]=\mathbb E_t\left[\pi_{t+1}\sum_i\theta^i_t(P^i_{t+1}+D^i_{t+1})\right]=\sum_i\theta^i_t\,\mathbb E_t\big[\pi_{t+1}(P^i_{t+1}+D^i_{t+1})\big]$$

Or le FTAP donne exactement $\mathbb E_t[\pi_{t+1}(P^i_{t+1}+D^i_{t+1})]=\pi_tP^i_t$, d'où

$$\mathbb E_t[\pi_{t+1}W_{t+1}]=\sum_i\theta^i_t\pi_tP^i_t=\pi_tW_t$$

Les $\theta^i_t$ sortent de l'espérance conditionnelle parce qu'ils sont **connus en $t$** — la stratégie est **adaptée** (fiche 56).

**Étape 3 — itérer par espérances emboîtées.**

$$\pi_0W_0=\mathbb E_0[\pi_1W_1]=\mathbb E_0\big[\mathbb E_1[\pi_2W_2]\big]=\mathbb E_0[\pi_2W_2]=\cdots=\mathbb E_0[\pi_TW_T]$$

**Étape 4 — conclure.** Supposons un arbitrage : $W_T\geq0$ et $W_T\neq0$. Comme $\pi_T>0$ **strictement**, $\pi_TW_T\geq0$ avec probabilité positive d'être strictement positif, donc $\mathbb E_0[\pi_TW_T]>0$. Donc $\pi_0W_0>0$, et comme $\pi_0>0$, on a $W_0>0$ — ce qui **contredit** $W_0\leq0$. $\blacksquare$

**Où chaque hypothèse sert.**

- L'**autofinancement** : sans lui, la richesse pourrait croître par apports externes.
- Le **FTAP** : c'est lui qui fait de $\pi_tP^i_t$ une martingale.
- L'**adaptation** de la stratégie : pour sortir $\theta^i_t$ de l'espérance.
- La **positivité stricte** de $\pi$ : c'est elle qui empêche de « cacher » un gain dans un état de prix nul. Une SPD seulement positive au sens large ne suffirait pas.

</details>

**Niveau 3** — Dérivez le CAPM à partir de la SPD.

<details><summary>Correction</summary>

**Étape 1 — la prime de risque générale.** Le FTAP donne $\mathbb E_t[(\pi_{t+1}/\pi_t)R_{t+1}]=1$ pour tout actif, et $\mathbb E_t[\pi_{t+1}/\pi_t](1+r_t)=1$ pour l'actif sans risque. En développant la covariance :

$$1=\mathbb E_t\left[\frac{\pi_{t+1}}{\pi_t}\right]\mathbb E_t[R_{t+1}]+\mathrm{Cov}_t\left(R_{t+1},\frac{\pi_{t+1}}{\pi_t}\right)=\frac{\mathbb E_t[R_{t+1}]}{1+r_t}+\mathrm{Cov}_t\left(R_{t+1},\frac{\pi_{t+1}}{\pi_t}\right)$$

d'où

$$\mathbb E_t[R_{t+1}]-(1+r_t)=-(1+r_t)\,\mathrm{Cov}_t\left(R_{t+1},\frac{\pi_{t+1}}{\pi_t}\right)$$

**Étape 2 — l'hypothèse CAPM.** $\dfrac{\pi_{t+1}}{\pi_t}=a-b\,R^M_{t+1}$. La covariance étant bilinéaire et $a$ constante :

$$\mathrm{Cov}_t\left(R^j_{t+1},\frac{\pi_{t+1}}{\pi_t}\right)=-b\,\mathrm{Cov}_t\big(R^j_{t+1},R^M_{t+1}\big)$$

d'où, pour toute action $j$,

$$\mathbb E_t\big[R^j_{t+1}-(1+r_t)\big]=\underbrace{b(1+r_t)}_{\text{const}}\times\mathrm{Cov}_t\big(R^j_{t+1},R^M_{t+1}\big)$$

**Étape 3 — calibrer la constante sur le marché lui-même.** La formule vaut pour **tout** actif, donc aussi pour $R^M$, avec $\mathrm{Cov}_t(R^M,R^M)=\mathrm{Var}_t(R^M)$ :

$$\mathbb E_t\big[R^M_{t+1}-(1+r_t)\big]=\text{const}\times\mathrm{Var}_t\big(R^M_{t+1}\big) \qquad\Longrightarrow\qquad \text{const}=\frac{\mathbb E_t[R^M_{t+1}-(1+r_t)]}{\mathrm{Var}_t(R^M_{t+1})}$$

**Étape 4 — le CAPM.**

$$\mathbb E_t\big[R^j_{t+1}-(1+r_t)\big]=\mathbb E_t\big[R^M_{t+1}-(1+r_t)\big]\cdot\underbrace{\frac{\mathrm{Cov}_t(R^j_{t+1},R^M_{t+1})}{\mathrm{Var}_t(R^M_{t+1})}}_{\beta_j}$$

**Le contenu du résultat.** *Le CAPM peut être **réinterprété comme un énoncé sur la SPD**.* Dire que les primes de risque sont proportionnelles aux bêtas de marché revient **exactement** à dire que la SPD est une **fonction affine du rendement de marché**. Une théorie d'équilibre devient une hypothèse structurelle sur $\pi$.

**La réserve que le cours signale.** *La formule peut être vue comme une approximation, si elle implique des valeurs négatives de $\pi$.* Une SPD affine en $R^M$ peut devenir négative pour $R^M$ grand, ce qui violerait la positivité stricte exigée par le FTAP. Le CAPM est donc, strictement, un modèle **approché**.

**Et la généralisation immédiate.** $\pi_{t+1}/\pi_t=a+b_1F^1+\cdots+b_KF^K$ donne

$$\mathbb E_t\big[R^j_{t+1}-(1+r_t)\big]=\sum_k\lambda_k\,\mathrm{Cov}_t\big(R^j_{t+1},F^k_{t+1}\big)$$

*Les modèles à facteurs sont simplement des énoncés sur la structure factorielle de la SPD.*

</details>

**Niveau 4 — type examen** — Expliquez la décomposition $\mu_t-r_t=\sigma_t\eta_t$ et sa portée.

<details><summary>Correction</summary>

**Le cadre gaussien.** Un actif de rendement brut

$$R_{t+1}=\exp\left(\mu_t-\frac{\sigma_t^2}{2}+\sigma_t\varepsilon^{\mathbb P}_{t+1}\right), \qquad \varepsilon^{\mathbb P}_{t+1}\sim N(0,1) \text{ i.i.d. sous } \mathbb P$$

de sorte que $\mathbb E_t[R_{t+1}]=\exp(\mu_t)$ — le terme $-\sigma_t^2/2$ compensant exactement l'effet de Jensen (fiche 53). Un taux sans risque $\exp(r_t)-1$, et une SPD

$$\pi_{t+1}=\pi_t\exp\left(-r_t-\frac{\eta_t^2}{2}-\eta_t\varepsilon^{\mathbb P}_{t+1}\right)$$

**Étape 1 — le changement de mesure.** La densité $\frac{d\mathbb Q}{d\mathbb P}=e^{-\eta\varepsilon^{\mathbb P}-\eta^2/2}$ transforme $\varepsilon^{\mathbb P}\sim N(0,1)$ en $\varepsilon^{\mathbb P}\sim N(-\eta,1)$ sous $\mathbb Q$. Autrement dit,

$$\varepsilon^{\mathbb Q}_{t+1}=\varepsilon^{\mathbb P}_{t+1}+\eta_t\sim N(0,1) \text{ sous } \mathbb Q$$

**Étape 2 — le rendement sous $\mathbb Q$.** En substituant $\varepsilon^{\mathbb P}=\varepsilon^{\mathbb Q}-\eta_t$ :

$$R_{t+1}=\exp\left(\mu_t-\frac{\sigma_t^2}{2}-\sigma_t\eta_t+\sigma_t\varepsilon^{\mathbb Q}_{t+1}\right)$$

**Étape 3 — imposer la définition de $\mathbb Q$.** Sous la mesure risque-neutre, tous les rendements espérés valent le taux sans risque :

$$\mathbb E^{\mathbb Q}_t[R_{t+1}]=\exp\big(\mu_t-\sigma_t\eta_t\big)=\exp(r_t) \qquad\Longrightarrow\qquad \boxed{\mu_t-r_t=\sigma_t\eta_t}$$

**L'interprétation — deux objets de nature différente.**

- $\sigma_t$ est la **quantité de risque** : une caractéristique de **l'actif**, mesurable sur ses seuls rendements.
- $\eta_t$ est le **prix du risque** : une caractéristique du **marché**, commune à tous les actifs, qui dit combien de rendement espéré s'échange contre une unité de risque.

**Le rapprochement avec la fiche 51.** $\eta_t=\frac{\mu_t-r_t}{\sigma_t}$ est exactement un **ratio de Sharpe** — et la CML disait déjà que le prix de marché du risque est $\frac{E(R_M)-r_0}{\sigma_M}$. On retrouve ici le même objet, dérivé cette fois de l'absence d'arbitrage plutôt que de l'optimisation de portefeuille.

**Ce que le changement de mesure fait, en une phrase.** Il **retire la prime de risque** : sous $\mathbb Q$, la dérive passe de $\mu_t$ à $r_t$, l'écart étant précisément $\sigma_t\eta_t$. La **volatilité $\sigma_t$ est inchangée** — c'est le résultat de la fiche 56, et c'est pourquoi le prix d'une option ne dépend pas de $\mu$ mais dépend crucialement de $\sigma$.

**La portée empirique — et c'est la remarque la plus importante du cours.** *Les modèles à prix du risque variable dans le temps, $\eta_t$, présentent de la **prévisibilité des rendements**.* Si $\eta_t$ varie, la prime de risque $\sigma_t\eta_t$ varie aussi, donc les rendements espérés sont partiellement prévisibles — **sans le moindre arbitrage**. C'est ce qui réconcilie l'efficience des marchés avec les régularités empiriques observées (prévisibilité par le ratio dividende/prix, par la pente de la courbe des taux, etc.).

**Et cela s'estime.** L'exemple des futures le montre : sous $\mathbb Q$ le gain espéré est nul, sous $\mathbb P$ il vaut $\eta\sigma\theta^{T-t-1}$. *On peut estimer les paramètres du modèle, dont $\eta$, à partir des prix historiques.* L'écart entre les deux mesures est **observable**, et c'est lui qui identifie le prix du risque.

</details>

## 🔴 Common mistakes

1. **Croire que l'absence d'arbitrage donne toujours un prix unique** — c'est vrai en marché **complet** seulement.
2. **Oublier la positivité stricte de $\pi$** — c'est elle qui exclut l'arbitrage.
3. **Confondre SPD et mesure risque-neutre** — elles sont équivalentes mais distinctes : $\pi$ est un processus, $\mathbb Q$ une mesure.
4. **Se tromper de signe dans la prime de risque** — c'est $-(1+r)\mathrm{Cov}(R,\pi_{t+1}/\pi_t)$ : un actif à prime **positive** est **négativement** corrélé à la SPD.
5. **Oublier que la formule de prime de risque vaut aussi pour le marché** — c'est ce qui permet de calibrer la constante du CAPM.
6. **Croire que $\mathbb Q$ décrit le monde réel** — c'est une **construction mathématique**, *indirectement* reliée aux données.
7. **Confondre quantité et prix du risque** — $\sigma_t$ est propre à l'actif, $\eta_t$ est commun au marché.
8. **Croire qu'une prime de risque variable contredit l'absence d'arbitrage** — au contraire, $\eta_t$ variable produit de la prévisibilité **sans** arbitrage.
9. **Utiliser Black-Scholes en ignorant le smile** — la volatilité implicite dépend du strike et de la maturité, ce que le modèle interdit.
10. **Croire que le prix d'un future égale toujours celui d'un forward** — seulement si les taux sont déterministes et le stockage gratuit.

## 📌 Ultimate Review

1. **Réplication** : dans un modèle complet, toute option est **redondante** et son prix est unique. **Défaut** : ce n'est pas réaliste.
2. **Nouvelle approche** : construire un modèle conjoint (1) **sans arbitrage** et (2) **conforme aux données** — les prix d'options servent alors à choisir la SPD.
3. **Arbitrage** : flux réalisable, positif ou nul dans **chaque** état, strictement positif avec probabilité non nulle.
4. **Loi du prix unique** : conséquence de l'absence d'arbitrage.
5. **Actions** (peu de titres, beaucoup d'états) : arbitrage facile à éviter. **Taux** (beaucoup de titres, peu d'états) : difficile.
6. **FTAP** : absence d'arbitrage $\iff$ existence de $\pi_t>0$ avec $$P_t=\mathbb E_t\left[\sum_{u>t}\frac{\pi_u}{\pi_t}D_u\right] \qquad\text{ou}\qquad \mathbb E_t\left[\frac{\pi_{t+1}}{\pi_t}R_{t+1}\right]=1$$
7. **Preuve (SPD ⟹ pas d'arbitrage)** : autofinancement ⟹ $\pi_tW_t=\mathbb E_t[\pi_{t+1}W_{t+1}]$ ⟹ $\pi_0W_0=\mathbb E_0[\pi_TW_T]$ ⟹ impossible d'avoir $W_0\leq0$ et $W_T\geq0$, $W_T\neq0$.
8. **Complétude** : marché complet ⟹ SPD **unique**, options **redondantes**. Moins d'actifs que d'états ⟹ **plusieurs** SPD.
9. **Algorithme DCF** : (1) processus des flux, (2) SPD, (3) $P_t=\mathbb E_t[\sum_{u>t}(\pi_u/\pi_t)D_u]$.
10. **Prime de risque** : $\mathbb E_t[R_{t+1}]-(1+r_t)=-(1+r_t)\mathrm{Cov}_t\big(R_{t+1},\frac{\pi_{t+1}}{\pi_t}\big)$.
11. **CAPM** : $\frac{\pi_{t+1}}{\pi_t}=a-bR^M_{t+1}$ ⟹ $\mathbb E_t[R^j-(1+r_t)]=\mathbb E_t[R^M-(1+r_t)]\frac{\mathrm{Cov}_t(R^j,R^M)}{\mathrm{Var}_t(R^M)}$.
12. **Multifactoriel** : $\frac{\pi_{t+1}}{\pi_t}=a+\sum_kb_kF^k_{t+1}$ ⟹ $\mathbb E_t[R^j-(1+r_t)]=\sum_k\lambda_k\mathrm{Cov}_t(R^j,F^k)$. *Les modèles à facteurs sont des énoncés sur la SPD.*
13. **Mesure risque-neutre** : $B_t=\prod_{u<t}(1+r_u)$ et $P_t=\mathbb E^{\mathbb Q}_t[\sum_{u>t}(B_t/B_u)D_u]$ ; $\mathbb E^{\mathbb Q}_t[R_{t+1}]=1+r_t$ ; **EMM**.
14. **Construction** : $q(\nu_{t+1})=(1+r_t)q(\nu_t)\frac{\pi(\nu_{t+1})p(\nu_{t+1})}{\pi(\nu_t)p(\nu_t)}$ ; binomial : $q=\frac{1+r_t-d}{u-d}$.
15. **Changement de mesure gaussien** : $\frac{d\mathbb Q}{d\mathbb P}=e^{-\eta\varepsilon^{\mathbb P}-\eta^2/2}$ ⟹ $\varepsilon^{\mathbb Q}=\varepsilon^{\mathbb P}+\eta\sim N(0,1)$ sous $\mathbb Q$.
16. **Prix du risque** : $\mu_t-r_t=\sigma_t\eta_t$ ; $\sigma_t$ **quantité**, $\eta_t$ **prix** ; $\eta_t$ variable ⟹ **prévisibilité des rendements**.
17. **Black-Scholes** : $S_{t+1}/S_t=\exp(r-\sigma^2/2+\sigma\varepsilon^{\mathbb Q})$ sous $\mathbb Q$, $C_t=\mathbb E^{\mathbb Q}_t[e^{-r(T-t)}H(S_T)]$.
18. **Volatilité implicite** : $C_i=C(S_t,K_i,r,\hat\sigma_i,T_i)$ ; empiriquement elle dépend du strike (**skew**) et de la maturité (**structure par terme**) — le **smile** rejette Black-Scholes.
19. **Futures** : $\Phi^T_t=\mathbb E^{\mathbb Q}_t[S_T]$ ; spot AR(1) ⟹ $\Phi^T_t=\bar S^{\mathbb Q}(1-\theta^{T-t})+\theta^{T-t}S_t$ ; gain espéré **nul sous $\mathbb Q$**, égal à $\eta\sigma\theta^{T-t-1}$ **sous $\mathbb P$**.

**Formulas to know**

$$\mathbb E_t\left[\frac{\pi_{t+1}}{\pi_t}R_{t+1}\right]=1 \qquad \mathbb E_t[R_{t+1}]-(1+r_t)=-(1+r_t)\mathrm{Cov}_t\left(R_{t+1},\frac{\pi_{t+1}}{\pi_t}\right)$$

$$P_t=\mathbb E^{\mathbb Q}_t\left[\sum_{u>t}\frac{B_t}{B_u}D_u\right] \qquad q=\frac{1+r_t-d}{u-d} \qquad \frac{d\mathbb Q}{d\mathbb P}=e^{-\eta\varepsilon^{\mathbb P}-\eta^2/2}$$

$$\mu_t-r_t=\sigma_t\eta_t \qquad \Phi^T_t=\mathbb E^{\mathbb Q}_t[S_T]$$

**Methods to know** : la preuve que la SPD exclut l'arbitrage ; la dérivation de la prime de risque par la covariance ; la calibration du CAPM sur le marché ; la construction de $\mathbb Q$ à partir de $\pi$ ; l'identification de $\eta$ par l'écart $\mathbb P$ / $\mathbb Q$.

## 🧠 Active Recall

**Basic** — Énoncez le théorème fondamental de la valorisation d'actifs.

<details><summary>Réponse</summary>

L'**absence d'arbitrage** est **équivalente** à l'existence d'un processus stochastique **strictement positif** $\{\pi_t(s)>0\}$ — la **densité de prix d'état** — tel que, pour tout actif de prix $P_t$ et de flux $D_t$ :

$$P_t=\mathbb E_t\left[\sum_{u=t+1}^T\frac{\pi_u}{\pi_t}D_u\right]$$

ou, sous forme de rendement,

$$\mathbb E_t\left[\frac{\pi_{t+1}}{\pi_t}R_{t+1}\right]=1, \qquad R_{t+1}=\frac{P_{t+1}+D_{t+1}}{P_t}$$

Le FTAP implique la **loi du prix unique**. Et une **seule** équation vaut pour **tous** les actifs — actions, obligations, options, futures.

</details>

**Understanding** — Que signifie économiquement la formule de la prime de risque ?

<details><summary>Réponse</summary>

$$\mathbb E_t[R_{t+1}]-(1+r_t)=-(1+r_t)\,\mathrm{Cov}_t\left(R_{t+1},\frac{\pi_{t+1}}{\pi_t}\right)$$

**La lecture.** Un actif a une prime de risque **positive** si et seulement si son rendement est **négativement corrélé** à la SPD.

**Pourquoi.** $\pi_{t+1}$ est élevé dans les états où la richesse marginale vaut cher — les **mauvais** états, les récessions. Un actif dont le rendement est **faible** quand $\pi$ est **élevé** vous fait défaut au moment où vous en auriez le plus besoin. Il est donc peu désirable, se vend **bon marché**, et offre en conséquence un rendement espéré **élevé**.

**Le cas symétrique.** Un actif qui paye **bien** dans les mauvais états est une **assurance**. On accepte de le payer cher, donc son rendement espéré est **inférieur au taux sans risque** — sa prime de risque est négative. L'or et les obligations d'État jouent souvent ce rôle.

**Le point conceptuel décisif.** Ce n'est **pas la volatilité** qui détermine la prime, mais la **covariance avec la SPD**. Un actif très volatil dont le risque est orthogonal à $\pi$ ne mérite **aucune** prime — c'est exactement ce que le CAPM dit avec le risque diversifiable.

</details>

**Application** — Sur un arbre binomial, calculez la probabilité risque-neutre.

<details><summary>Réponse</summary>

**Le cadre.** $S_{t+1}=uS_t$ ou $dS_t$, taux sans risque $r_t$.

**Par le FTAP directement.** Sous $\mathbb Q$, le rendement espéré de l'action doit valoir le taux sans risque :

$$qu+(1-q)d=1+r_t \qquad\Longrightarrow\qquad q(u-d)=1+r_t-d \qquad\Longrightarrow\qquad \boxed{q=\frac{1+r_t-d}{u-d}}$$

**Par la SPD**, en utilisant la construction du cours :

$$q=p(1+r_t)\frac{\pi_{t+1}(u)}{\pi_t}=p(1+r_t)\cdot\frac{1}{p(1+r_t)}\cdot\frac{1+r_t-d}{u-d}=\frac{1+r_t-d}{u-d}$$

Les deux méthodes **coïncident**, comme le cours le vérifie explicitement.

**La condition d'absence d'arbitrage.** Il faut $0<q<1$, c'est-à-dire

$$d<1+r_t<u$$

Si $1+r_t\leq d$, l'action domine l'obligation dans tous les états : on emprunte et l'on achète. Si $1+r_t\geq u$, c'est l'inverse. **La probabilité risque-neutre existe si et seulement s'il n'y a pas d'arbitrage** — c'est le FTAP en miniature.

⚠️ **Et remarquez que $p$ a disparu.** La probabilité réelle n'intervient nulle part dans $q$ — exactement comme en fiche 57, où $q=(S_0e^{rdt}-S_2)/(S_1-S_2)$ ne dépendait pas de $p$.

</details>

**Comparison** — SPD et mesure risque-neutre : quelle différence ?

<details><summary>Réponse</summary>

|  | **Densité de prix d'état $\pi_t$** | **Mesure risque-neutre $\mathbb Q$** |
|---|---|---|
| Nature | un **processus stochastique** positif | une **mesure de probabilité** |
| Mesure de référence | la mesure **physique** $\mathbb P$ | elle-même |
| Formule | $P_t=\mathbb E^{\mathbb P}_t\big[\sum\frac{\pi_u}{\pi_t}D_u\big]$ | $P_t=\mathbb E^{\mathbb Q}_t\big[\sum\frac{B_t}{B_u}D_u\big]$ |
| Actualisation | par $\pi$ — mêle temps **et** risque | par $B$ — **purement temporelle** |
| Ajustement du risque | dans le **facteur d'actualisation** | dans la **mesure** |

**Le lien** : $q(\nu_{t+1})=(1+r_t)q(\nu_t)\dfrac{\pi(\nu_{t+1})p(\nu_{t+1})}{\pi(\nu_t)p(\nu_t)}$ — la mesure risque-neutre est la mesure physique **repondérée par la SPD**, renormalisée par le taux sans risque.

**Pourquoi préférer $\mathbb Q$.** *Il est généralement **plus commode** d'utiliser la valorisation risque-neutre.* Sous $\mathbb Q$, la formule DCF standard s'applique avec une actualisation **déterministe** (si les taux le sont). Toute la difficulté est reportée dans le changement de mesure, qui se réduit — en cadre gaussien — à un simple **décalage de moyenne** : $\varepsilon^{\mathbb Q}=\varepsilon^{\mathbb P}+\eta$.

⚠️ **Le rappel du cours à ne pas oublier** : *$\mathbb Q$ est une construction mathématique, indirectement reliée aux données empiriques.* Elle ne décrit **pas** le monde réel — les rendements espérés n'y valent le taux sans risque que par construction.

</details>

**Exam-style** — Construisez un modèle sans arbitrage de prix de contrats à terme.

<details><summary>Réponse</summary>

**Le problème.** *En cas de taux déterministes et de stockage sans coût, le prix du future égale le prix du forward. Mais **en pratique le stockage n'est pas gratuit**, et les simples arguments de réplication ne suffisent pas.* On veut modéliser plusieurs maturités dans un cadre sans arbitrage.

**Étape 1 — la contrainte fondamentale.** $\Phi^T_t$ est le prix en $t$ du contrat de maturité $T$. *Les futures sont **réglés en continu** : le détenteur d'une position longue encaisse $\Phi^T_t-\Phi^T_{t-1}$ à chaque période, et la **valeur de marché du contrat est toujours nulle**.* Dans le cadre risque-neutre, cette valeur nulle s'écrit

$$\mathbb E^{\mathbb Q}_t\left[\sum_{u=t+1}^T\frac{B_t}{B_u}\big(\Phi^T_u-\Phi^T_{u-1}\big)\right]=0 \qquad \text{pour tout } t$$

**Étape 2 — la simplification.** Par récurrence à rebours et espérances itérées, cette condition équivaut à

$$\mathbb E^{\mathbb Q}_t\big[\Phi^T_{t+1}-\Phi^T_t\big]=0$$

c'est-à-dire que **$\Phi^T_t$ est une martingale sous $\mathbb Q$**. En itérant jusqu'à $T$, et comme $\Phi^T_T=S_T$ :

$$\boxed{\Phi^T_t=\mathbb E^{\mathbb Q}_t[S_T]}$$

**Le prix du future est l'espérance risque-neutre du prix comptant futur.**

**Étape 3 — spécifier la dynamique.** Sous $\mathbb P$, supposons $S_t-\bar S=\theta(S_{t-1}-\bar S)+\sigma\varepsilon^{\mathbb P}_t$ — un AR(1) à retour à la moyenne (fiche 52). *Sous $\mathbb Q$, le prix reste un AR(1) de **même vitesse de retour** $\theta$ mais de **moyenne de long terme différente** $\bar S^{\mathbb Q}$.* En itérant :

$$S_{t+n}-\bar S^{\mathbb Q}=\theta^n\big(S_t-\bar S^{\mathbb Q}\big)+\sum_{k=1}^n\theta^{n-k}\sigma\varepsilon^{\mathbb Q}_{t+k}$$

et en prenant l'espérance sous $\mathbb Q$ (les $\varepsilon^{\mathbb Q}$ sont centrés) :

$$\Phi^T_t=\bar S^{\mathbb Q}\big(1-\theta^{T-t}\big)+\theta^{T-t}S_t$$

**La lecture de la courbe des futures.** C'est une **moyenne pondérée** entre le prix comptant actuel $S_t$ et la moyenne de long terme $\bar S^{\mathbb Q}$, avec un poids $\theta^{T-t}$ qui décroît avec la maturité. Les contrats courts suivent le comptant, les contrats longs convergent vers $\bar S^{\mathbb Q}$ — c'est exactement la forme observée sur les marchés de matières premières.

**Étape 4 — le gain espéré et l'identification de $\eta$.** Sous $\mathbb Q$, $\mathbb E^{\mathbb Q}_t[\Phi^T_{t+1}-\Phi^T_t]=0$ par construction. Mais *le contrat procure une exposition au risque $\varepsilon^{\mathbb P}$, et ce risque est rémunéré au prix du risque $\eta$*. Avec $\varepsilon^{\mathbb Q}_{t+1}=\eta+\varepsilon^{\mathbb P}_{t+1}$ :

$$\Phi^T_{t+1}-\Phi^T_t=\sigma\theta^{T-t-1}\varepsilon^{\mathbb Q}_{t+1}=\eta\sigma\theta^{T-t-1}+\sigma\theta^{T-t-1}\varepsilon^{\mathbb P}_{t+1}$$

d'où, **sous $\mathbb P$** :

$$\mathbb E^{\mathbb P}_t\big[\Phi^T_{t+1}-\Phi^T_t\big]=\eta\sigma\theta^{T-t-1}\ \neq\ 0$$

**Ce qu'il faut savoir conclure.**

- **Sous $\mathbb Q$, martingale** — c'est ce qui garantit l'absence d'arbitrage entre maturités.
- **Sous $\mathbb P$, gain espéré positif** (si $\eta>0$) — c'est la rémunération du risque effectivement porté. Un vendeur de future se couvre ; un acheteur porte le risque et est payé pour cela.
- L'écart entre les deux mesures est **observable** : *on peut estimer les paramètres du modèle, dont $\eta$, à partir des prix historiques de futures*. C'est la manière standard d'identifier le prix du risque sur un marché.
- Le gain espéré **décroît en $\theta^{T-t-1}$** : les contrats de maturité lointaine sont moins sensibles aux chocs, donc portent moins de risque et rapportent moins.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Défaut du modèle binomial ? | Il rend **toutes les options redondantes** |
| Définition d'un arbitrage ? | Flux $\geq0$ dans chaque état, $>0$ avec probabilité non nulle |
| Que la loi du prix unique dit-elle ? | Deux actifs de même payoff ont le même prix |
| Arbitrage : actions ou taux ? | Facile à éviter en **actions**, difficile en **taux** |
| Énoncé du FTAP ? | Pas d'arbitrage $\iff$ existence de $\pi_t>0$ |
| Forme rendement du FTAP ? | $\mathbb E_t[(\pi_{t+1}/\pi_t)R_{t+1}]=1$ |
| Nom de $\pi_t$ ? | **Densité de prix d'état** (SPD) |
| Condition d'autofinancement ? | $W_{t+1}=\sum_i\theta^i_t(P^i_{t+1}+D^i_{t+1})$ |
| Que montre la preuve du FTAP ? | $\pi_tW_t$ est une **martingale** |
| Marché complet ⟹ ? | SPD **unique**, options **redondantes** |
| Moins d'actifs que d'états ⟹ ? | **Plusieurs** SPD possibles |
| Que représente $\pi_t(s)$ en marché complet ? | Le prix d'une créance payant $1$ dans l'état $s$, divisé par $p_t$ |
| Les trois étapes du modèle DCF ? | Flux · SPD · $P_t=\mathbb E_t[\sum(\pi_u/\pi_t)D_u]$ |
| Formule de la prime de risque ? | $-(1+r_t)\mathrm{Cov}_t(R_{t+1},\pi_{t+1}/\pi_t)$ |
| Quand la prime est-elle positive ? | Si $R$ est **négativement** corrélé à la SPD |
| Hypothèse SPD du CAPM ? | $\pi_{t+1}/\pi_t=a-bR^M_{t+1}$ |
| Comment calibrer la constante ? | En appliquant la formule au **marché lui-même** |
| Hypothèse SPD multifactorielle ? | $\pi_{t+1}/\pi_t=a+\sum_kb_kF^k_{t+1}$ |
| Que sont les modèles à facteurs ? | Des **énoncés sur la structure factorielle de la SPD** |
| Que vaut $B_t$ ? | $\prod_{u=0}^{t-1}(1+r_u)$ |
| Formule de valorisation sous $\mathbb Q$ ? | $\mathbb E^{\mathbb Q}_t[\sum_{u>t}(B_t/B_u)D_u]$ |
| Rendement espéré sous $\mathbb Q$ ? | $1+r_t$ pour **tous** les actifs |
| Autre nom de $\mathbb Q$ ? | Mesure **martingale équivalente** (EMM) |
| Construction de $q$ à partir de $\pi$ ? | $q(\nu_{t+1})=(1+r_t)q(\nu_t)\frac{\pi(\nu_{t+1})p(\nu_{t+1})}{\pi(\nu_t)p(\nu_t)}$ |
| $q$ dans l'arbre binomial ? | $\frac{1+r_t-d}{u-d}$ |
| Densité du changement de mesure gaussien ? | $e^{-\eta\varepsilon^{\mathbb P}-\eta^2/2}$ |
| Effet sur le bruit ? | $\varepsilon^{\mathbb Q}=\varepsilon^{\mathbb P}+\eta\sim N(0,1)$ sous $\mathbb Q$ |
| Décomposition de la prime de risque ? | $\mu_t-r_t=\sigma_t\eta_t$ |
| Que sont $\sigma_t$ et $\eta_t$ ? | **Quantité** et **prix** du risque |
| Conséquence d'un $\eta_t$ variable ? | **Prévisibilité** des rendements, sans arbitrage |
| Prix d'une option sous $\mathbb Q$ ? | $\mathbb E^{\mathbb Q}_t[e^{-r(T-t)}H(S_T)]$ |
| Définition de la volatilité implicite ? | Le $\hat\sigma_i$ tel que $C_i=C(S_t,K_i,r,\hat\sigma_i,T_i)$ |
| Que montre le smile ? | $\hat\sigma$ dépend du **strike** et de la **maturité** — Black-Scholes est rejeté |
| Prix d'un future ? | $\Phi^T_t=\mathbb E^{\mathbb Q}_t[S_T]$ |
| Prix du future pour un spot AR(1) ? | $\bar S^{\mathbb Q}(1-\theta^{T-t})+\theta^{T-t}S_t$ |
| Gain espéré sous $\mathbb P$ ? | $\eta\sigma\theta^{T-t-1}$ — non nul |
