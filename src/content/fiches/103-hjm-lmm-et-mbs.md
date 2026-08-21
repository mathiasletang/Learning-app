# Fiche 103 — HJM, LIBOR Market Model et titres hypothécaires d'agence

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Modèles de taux |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 31 « Interest Rate Derivatives: HJM and LMM » |
| **Difficulté** | Must know — les modèles multi-facteurs à volatilité libre |
| **Temps d'étude estimé** | 1 h 50 |
| **Prérequis** | Fiches 99 (numéraires), 100 (caps et swaptions), 102 (modèles du taux court), 81 (titrisation) |
| **Concepts clés** | Modèle de Heath-Jarrow-Morton, taux forward instantané, condition de non-arbitrage HJM, processus non markovien, arbre non recombinant, LIBOR Market Model, modèle BGM, monde forward risque-neutre roulant, volatilités $\Lambda_i$, cap *ratchet*, cap *sticky*, *flexi cap*, volatilité de swap dans le LMM, calibration par ACP, skew de volatilité et modèle CEV, swaption bermudienne, MBS d'agence, fonction de prépaiement, CMO, IO et PO, *option-adjusted spread* |
| **Poids à l'examen** | **Le résultat HJM** $m(t,T)=s(t,T)\displaystyle\int_t^Ts(t,\tau)d\tau$ · le **drift du LMM** $\sum_{i=m(t)}^{k}\dfrac{\delta_iF_i\sigma_i\sigma_k}{1+\delta_iF_i}$ · $\sigma_k^2t_k=\sum_{i=1}^{k}\Lambda_{k-i}^2\delta_{i-1}$ · l'**OAS** par interpolation. |

## 🎯 Vue d'ensemble

```
LES DEUX LIMITES DES MODÈLES DU CHAPITRE 30
  1. la PLUPART n'ont QU'UN facteur
  2. ils ne donnent PAS une LIBERTÉ COMPLÈTE dans le choix de la structure de volatilité
  (rendre a et σ fonctions du temps ⇒ volatilité NON STATIONNAIRE)

HJM (1990-1992)   la CONDITION DE NON-ARBITRAGE de la courbe des taux
  dF(t,T) = v(t,T) v_T(t,T) dt − v_T(t,T) dz
  ⇒  m(t,T) = s(t,T) ∫_t^T s(t,τ) dτ        LE DRIFT EST DICTÉ PAR LES VOLATILITÉS
  ⚠️ le processus de r est NON MARKOVIEN → arbre NON RECOMBINANT (2^30 ≈ 1 milliard)
     → MONTE-CARLO OBLIGATOIRE

LMM / BGM   exprimé en TAUX FORWARD OBSERVABLES (ceux des caps), pas instantanés
  monde forward risque-neutre ROULANT (numéraire = CD roulé à chaque pas)
  dF_k/F_k = Σ_{i=m(t)}^{k} [δᵢFᵢσᵢσ_k/(1+δᵢFᵢ)] dt + σ_k dz
  σ_k(t) = Λ_{k−m(t)}   fonction ESCALIER   σ_k² t_k = Σ Λ²_{k−i} δ_{i−1}

CE QUI DÉPEND DU NOMBRE DE FACTEURS
  cap ORDINAIRE : NON (un seul taux forward)
  ratchet, sticky, flexi : OUI (loi JOINTE de plusieurs taux forward)

MBS D'AGENCE   le PRÉPAIEMENT est une option américaine à 30 ans donnée à l'emprunteur
  CMO (classes A/B/C) · IO et PO · valorisation MONTE-CARLO · OAS par interpolation
```

**Les deux limites, énoncées d'entrée.** *Les modèles du chapitre 30 sont **faciles à implémenter** et, utilisés avec soin, garantissent que la plupart des dérivés non standard sont valorisés de façon cohérente avec les caps, swaptions et options sur obligations. ***Deux LIMITES : (1) la plupart n'impliquent QU'UN facteur ; (2) ils ne donnent PAS à l'utilisateur une liberté complète dans le choix de la structure de volatilité.*** En rendant $a$ et $\sigma$ fonctions du temps, on peut coller aux volatilités observées aujourd'hui, **mais la structure par terme de volatilité devient alors NON STATIONNAIRE** (fiche 102, §30.8).*

> ⚠️ *Les modèles de ce chapitre **exigent BIEN PLUS de temps de calcul**. **En conséquence, ils servent souvent à la RECHERCHE ET AU DÉVELOPPEMENT plutôt qu'à la valorisation de routine.***

## 🔴 Concept 1 — Le modèle de Heath, Jarrow et Morton

### 1.1 Les notations et le point de départ

*En 1990, **David Heath, Bob Jarrow et Andy Morton** publient un article important **décrivant les conditions de NON-ARBITRAGE que doit satisfaire un modèle de la courbe des taux**.*

| Notation | Signification |
|---|---|
| $P(t,T)$ | prix en $t$ d'un zéro-coupon de principal 1 dollar maturant en $T$ |
| $\Omega_t$ | **le vecteur des valeurs PASSÉES ET PRÉSENTES** de taux et de prix d'obligations pertinentes pour déterminer les volatilités |
| $v(t,T,\Omega_t)$ | **la volatilité de $P(t,T)$** |
| $F(t,T)$ | le **taux forward INSTANTANÉ** vu en $t$ pour un contrat maturant en $T$ |
| $r(t)$ | le taux court sans risque |

**Le point de départ.** *Un zéro-coupon est **un titre négocié ne procurant aucun revenu**. Son rendement dans le monde risque-neutre traditionnel doit donc être $r$ :*

$$\boxed{dP(t,T)=r(t)P(t,T)\,dt+v(t,T,\Omega_t)P(t,T)\,dz(t)}\;\text{(31.1)}$$

> ⚠️ **La condition de bord essentielle :** *comme **la volatilité d'un prix d'obligation décline vers ZÉRO à maturité**, on doit avoir* $\boxed{v(t,t,\Omega_t)=0}$
>
> *(C'est équivalent à supposer que **tous les zéro-coupon ont des drifts FINIS à tout instant**. Si la volatilité ne déclinait pas vers zéro, **un drift INFINI pourrait être nécessaire** pour garantir que le prix égale la valeur faciale à maturité.)*

### 1.2 La dérivation du résultat HJM

<details class="details--riche">
<summary>

**De (31.1) au résultat HJM — les cinq étapes**

</summary>

*Étape 1 — le taux forward en termes de prix d'obligations* (équation 4.5, fiche 77) :

$$f(t,T_1,T_2)=\frac{\ln P(t,T_1)-\ln P(t,T_2)}{T_2-T_1}\;\text{(31.2)}$$

*Étape 2 — appliquer Itô à chaque logarithme :*

$$d\ln P(t,T_i)=\left[r(t)-\frac{v(t,T_i,\Omega_t)^2}{2}\right]dt+v(t,T_i,\Omega_t)\,dz(t)$$

*Étape 3 — substituer dans (31.2) :*

$$\boxed{df(t,T_1,T_2)=\frac{v(t,T_2)^2-v(t,T_1)^2}{2(T_2-T_1)}\,dt+\frac{v(t,T_1)-v(t,T_2)}{T_2-T_1}\,dz(t)}\;\text{(31.3)}$$

> ⚠️ ***« (31.3) montre que le processus risque-neutre de $f$ dépend UNIQUEMENT des $v$. Il ne dépend de $r$ et des $P$ que dans la mesure où les $v$ eux-mêmes en dépendent. »***

*Étape 4 — passer à la limite.* On pose $T_1=T$ et $T_2=T+\Delta T$, puis $\Delta T\to0$ : $f$ devient $F(t,T)$, le coefficient de $dz$ devient $-v_T$ et celui de $dt$ devient $\frac12\frac{\partial(v^2)}{\partial T}=v\,v_T$ :

$$\boxed{dF(t,T)=v(t,T,\Omega_t)\,v_T(t,T,\Omega_t)\,dt-v_T(t,T,\Omega_t)\,dz(t)}\;\text{(31.4)}$$

> ⚠️ ***« (31.4) montre qu'il y a UN LIEN entre le DRIFT et l'ÉCART-TYPE d'un taux forward instantané. C'EST LE RÉSULTAT CLÉ DE HJM. »***

*Étape 5 — l'intégration.* En intégrant $v_\tau(t,\tau,\Omega_t)$ de $\tau=t$ à $\tau=T$ et **en utilisant $v(t,t,\Omega_t)=0$** :

$$v(t,T,\Omega_t)=\int_t^Tv_\tau(t,\tau,\Omega_t)\,d\tau$$

En notant $m$ et $s$ le drift et l'écart-type instantanés de $F(t,T)$, de sorte que $dF=m\,dt+s\,dz$ :

$$\boxed{m(t,T,\Omega_t)=s(t,T,\Omega_t)\int_t^Ts(t,\tau,\Omega_t)\,d\tau}\;\text{(31.5)}$$

**C'est LE RÉSULTAT HJM.**

**L'extension à plusieurs facteurs indépendants.** Si $dF=m\,dt+\sum_ks_k\,dz_k$ :

$$\boxed{m(t,T,\Omega_t)=\sum_ks_k(t,T,\Omega_t)\int_t^Ts_k(t,\tau,\Omega_t)\,d\tau}\;\text{(31.6)}$$

</details>

### 1.3 Le problème d'implémentation

> ⚠️ ***« Le processus du taux court $r$ dans le modèle HJM général est NON MARKOVIEN. Cela signifie que le processus de $r$ à un instant futur $t$ dépend DU CHEMIN suivi par $r$ entre maintenant et $t$, aussi bien que de la valeur de $r$ en $t$. C'EST LE PROBLÈME CLÉ dans l'implémentation d'un modèle HJM général. »***

| Conséquence | Détail |
|---|---|
| **Monte-Carlo obligatoire** | *il faut y recourir* |
| **Arbre non recombinant** | *il est **difficile d'utiliser un arbre**, parce que **l'arbre ne recombine généralement PAS**. Avec un facteur et un arbre binomial, il y a $\mathbf{2^n}$ nœuds après $n$ pas — **pour $n=30$, cela fait environ UN MILLIARD** (précisément 1 073 741 824)* |

⚠️ **La nuance importante.** *« **Le modèle HJM de (31.4) est TROMPEUSEMENT COMPLEXE.** Un taux forward PARTICULIER $F(t,T)$ est **markovien dans la plupart des applications** et peut être représenté par un arbre recombinant. **MAIS LE MÊME ARBRE NE PEUT PAS SERVIR POUR TOUS LES TAUX FORWARD.** »*

## 🔴 Concept 2 — Le LIBOR Market Model

### 2.1 La motivation et les notations

| Défaut de HJM | Conséquence |
|---|---|
| **1** | *il est exprimé en **taux forward INSTANTANÉS**, qui **ne sont PAS directement observables** sur le marché* |
| **2** | *il est **difficile à CALIBRER** aux prix des instruments activement négociés* |

> *D'où la proposition de **Brace, Gatarek et Musiela (BGM)**, **Jamshidian**, et **Miltersen, Sandmann et Sondermann** : le **LIBOR MARKET MODEL (LMM)** ou **modèle BGM**, **exprimé en termes des taux forward AVEC LESQUELS LES TRADERS ONT L'HABITUDE DE TRAVAILLER**.*

| Notation | Signification |
|---|---|
| $t_1,t_2,\dots$ | **les dates de réinitialisation des caps** négociés aujourd'hui ($t_0=0$). *Aux États-Unis, les caps les plus populaires sont **trimestriels** : $t_1\approx0{,}25$, $t_2\approx0{,}5$, etc.* |
| $\delta_k=t_{k+1}-t_k$ | l'intervalle |
| $F_k(t)$ | **le taux forward entre $t_k$ et $t_{k+1}$** vu en $t$, en composition $\delta_k$ et décompte actual/actual |
| $m(t)$ | **l'indice de la PROCHAINE date de réinitialisation** : le plus petit entier tel que $t\leqslant t_{m(t)}$ |
| $\zeta_k(t)$ | la volatilité de $F_k(t)$ en $t$ |

### 2.2 Le monde forward risque-neutre ROULANT

**Le point de départ.** *Par le §27.4 (fiche 99), **dans un monde forward risque-neutre par rapport à $P(t,t_{k+1})$, $F_k(t)$ est une MARTINGALE** :*

$$\boxed{dF_k(t)=\zeta_k(t)F_k(t)\,dz}\;\text{(31.7)}$$

> ⚠️ ***« En pratique, il est souvent LE PLUS COMMODE de valoriser les dérivés de taux en travaillant dans un monde qui est TOUJOURS forward risque-neutre par rapport à une obligation maturant À LA PROCHAINE DATE DE RÉINITIALISATION. Nous l'appelons LE MONDE FORWARD RISQUE-NEUTRE ROULANT. »***
>
> *Dans ce monde, **on peut actualiser de $t_{k+1}$ à $t_k$ en utilisant le taux zéro observé EN $t_k$ pour la maturité $t_{k+1}$. ON N'A PAS À SE SOUCIER de ce qui arrive aux taux ENTRE $t_k$ et $t_{k+1}$.***

⚠️ **Le numéraire est un « CD ROULÉ ».** *« Un CD roulé est celui où l'on **part de 1 dollar, achète une obligation maturant en $t_1$, réinvestit le produit en $t_1$ dans une obligation maturant en $t_2$, réinvestit en $t_2$ dans une obligation maturant en $t_3$**, et ainsi de suite. » ***« Strictement parlant, LES ARBRES DE TAUX CONSTRUITS AU CHAPITRE 30 SONT DANS UN MONDE FORWARD RISQUE-NEUTRE ROULANT plutôt que dans le monde risque-neutre traditionnel. »***

<details class="details--riche">
<summary>

**La dérivation du drift du LMM**

</summary>

*Étape 1 — le changement de numéraire.* En $t$, le monde roulant est forward risque-neutre par rapport à $P(t,t_{m(t)})$. Par le §27.8 (fiche 99), le processus de $F_k(t)$ dans ce monde est :

$$\boxed{dF_k(t)=\zeta_k(t)\big[v_{m(t)}(t)-v_{k+1}(t)\big]F_k(t)\,dt+\zeta_k(t)F_k(t)\,dz}\;\text{(31.8)}$$

où $v_k(t)$ est la volatilité de $P(t,t_k)$ — **négative, car prix d'obligations et taux sont négativement reliés**.

*Étape 2 — relier $v$ et $\zeta$.* De $\dfrac{P(t,t_i)}{P(t,t_{i+1})}=1+\delta_iF_i(t)$, donc

$$\ln P(t,t_i)-\ln P(t,t_{i+1})=\ln\big[1+\delta_iF_i(t)\big]$$

Itô appliqué aux deux membres, puis **égalisation des coefficients de $dz$** :

$$\boxed{v_i(t)-v_{i+1}(t)=\frac{\delta_iF_i(t)\zeta_i(t)}{1+\delta_iF_i(t)}}\;\text{(31.9)}$$

*Étape 3 — télescoper de $m(t)$ à $k+1$ et substituer dans (31.8) :*

$$\boxed{\frac{dF_k(t)}{F_k(t)}=\sum_{i=m(t)}^{k}\frac{\delta_iF_i(t)\zeta_i(t)\zeta_k(t)}{1+\delta_iF_i(t)}\,dt+\zeta_k(t)\,dz}\;\text{(31.10)}$$

> ⚠️ ***Le résultat HJM (31.4) est LE CAS LIMITE de (31.10) quand les $\delta_i$ tendent vers zéro.***
>
> ⚠️ *Note de Hull : **comme les $v$ et les $\zeta$ ont des signes OPPOSÉS, la volatilité du prix d'obligation devient plus grande (en valeur absolue) quand la maturité augmente. C'est bien ce qu'on attend.***

</details>

### 2.3 Les volatilités de taux forward

**La simplification.** *Le modèle se simplifie en supposant que $\zeta_k(t)$ est **fonction UNIQUEMENT du nombre de périodes ENTIÈRES entre la prochaine date de réinitialisation et $t_k$**.* En notant $\Lambda_i$ la valeur de $\zeta_k(t)$ quand il y a $i$ telles périodes :

$$\boxed{\zeta_k(t)=\Lambda_{k-m(t)}\qquad\text{— une FONCTION EN ESCALIER}}$$

**Le lien avec les volatilités de Black.** *Les $\Lambda_i$ peuvent (au moins en théorie) être estimés des volatilités servant à valoriser les caplets dans le modèle de Black — c'est-à-dire des **volatilités SPOT** de la figure 28.3 (fiche 100).* En **égalisant les variances** :

$$\boxed{\sigma_k^2\,t_k=\sum_{i=1}^{k}\Lambda_{k-i}^2\,\delta_{i-1}}\;\text{(31.11)}$$

*Cette équation permet d'obtenir les $\Lambda$ **ITÉRATIVEMENT**.*

<details class="details--riche">
<summary>

**Exemples 31.1 et 31.2 — extraire les $\Lambda$ des volatilités de caplets**

</summary>

**Exemple 31.1.** *Les $\delta_i$ sont tous égaux et les volatilités de Black des trois premiers caplets sont **24 %, 22 %, 20 %**.*

*Étape 1 :* $\Lambda_0=\mathbf{24\,\%}$ *(il n'y a qu'un terme)*

*Étape 2 :* $\Lambda_0^2+\Lambda_1^2=2\times0{,}22^2=0{,}0968$, donc

$$\Lambda_1=\sqrt{0{,}0968-0{,}0576}=\sqrt{0{,}0392}=\mathbf{19{,}80\,\%}$$

*Étape 3 :* $\Lambda_0^2+\Lambda_1^2+\Lambda_2^2=3\times0{,}20^2=0{,}12$, donc

$$\Lambda_2=\sqrt{0{,}12-0{,}0968}=\sqrt{0{,}0232}=\mathbf{15{,}23\,\%}$$

> ⚠️ **Le mécanisme :** *les volatilités de caplets sont des **moyennes quadratiques CUMULÉES** des $\Lambda$ ; une baisse modérée des $\sigma_k$ impose donc une baisse **BEAUCOUP PLUS FORTE** des $\Lambda$.*

**Exemple 31.2 — Table 31.1** (période d'accroissement = **1 an**) :

| Année $k$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **$\sigma_k$ (%)** | 15,50 | **18,25** | 17,91 | 17,74 | 17,27 | 16,79 | 16,30 | 16,01 | 15,76 | 15,54 |
| **$\Lambda_{k-1}$ (%)** | 15,50 | **20,64** | 17,21 | 17,22 | 15,25 | 14,15 | 12,98 | 13,81 | 13,60 | 13,40 |

*Les $\sigma_k$ présentent **la bosse** discutée au §28.2.* ***« Noter que LA BOSSE DES $\Lambda$ EST PLUS PRONONCÉE que la bosse des $\sigma$. »***

</details>

### 2.4 L'implémentation par Monte-Carlo

<details class="details--riche">
<summary>

**De (31.10) à la formule de simulation (31.14)**

</summary>

*Étape 1 — réécrire (31.10) avec les $\Lambda$ :*

$$\frac{dF_k(t)}{F_k(t)}=\sum_{i=m(t)}^{k}\frac{\delta_iF_i(t)\Lambda_{i-m(t)}\Lambda_{k-m(t)}}{1+\delta_iF_i(t)}\,dt+\Lambda_{k-m(t)}\,dz\;\text{(31.12)}$$

*Étape 2 — passer au logarithme par Itô :*

$$d\ln F_k(t)=\left[\sum_{i=m(t)}^{k}\frac{\delta_iF_i(t)\Lambda_{i-m(t)}\Lambda_{k-m(t)}}{1+\delta_iF_i(t)}-\frac{\Lambda_{k-m(t)}^2}{2}\right]dt+\Lambda_{k-m(t)}\,dz\;\text{(31.13)}$$

*Étape 3 — L'APPROXIMATION DE DRIFT.* **On suppose, dans le calcul du drift, que $F_i(t)=F_i(t_j)$ pour $t_j<t<t_{j+1}$** :

$$\boxed{F_k(t_{j+1})=F_k(t_j)\exp\left[\left(\sum_{i=j+1}^{k}\frac{\delta_iF_i(t_j)\Lambda_{i-j-1}\Lambda_{k-j-1}}{1+\delta_iF_i(t_j)}-\frac{\Lambda_{k-j-1}^2}{2}\right)\delta_j+\Lambda_{k-j-1}\varepsilon\sqrt{\delta_j}\right]}\;\text{(31.14)}$$

où $\varepsilon$ est un tirage normal centré réduit.

> *Dans la simulation, cette équation sert à calculer les taux forward en $t_1$ depuis ceux en 0, puis ceux en $t_2$ depuis ceux en $t_1$, et ainsi de suite.*

**L'extension à $p$ facteurs indépendants** *(en notant $\lambda_{i,q}$ la $q$-ième composante)* :

$$\frac{dF_k(t)}{F_k(t)}=\sum_{i=m(t)}^{k}\frac{\delta_iF_i(t)\sum_{q=1}^p\zeta_{i,q}\zeta_{k,q}}{1+\delta_iF_i(t)}\,dt+\sum_{q=1}^{p}\zeta_{k,q}(t)\,dz_q\;\text{(31.15)}$$

$$\boxed{F_k(t_{j+1})=F_k(t_j)\exp\left[\left(\sum_{i=j+1}^{k}\frac{\delta_iF_i(t_j)\sum_q\lambda_{i-j-1,q}\lambda_{k-j-1,q}}{1+\delta_iF_i(t_j)}-\frac{\sum_q\lambda_{k-j-1,q}^2}{2}\right)\delta_j+\sum_{q=1}^{p}\lambda_{k-j-1,q}\varepsilon_q\sqrt{\delta_j}\right]}\;\text{(31.16)}$$

**Le déroulement de la simulation.** *On part de $F_0(0),F_1(0),\dots,F_{N-1}(0)$ (calculés de la courbe initiale) ; (31.16) donne $F_1(t_1),\dots,F_{N-1}(t_1)$ ; puis $F_2(t_2),\dots,F_{N-1}(t_2)$ ; et ainsi jusqu'à $F_{N-1}(t_{N-1})$.*

> ⚠️ ***« Noter qu'à mesure qu'on avance dans le temps, LA COURBE ZÉRO DEVIENT DE PLUS EN PLUS COURTE. »*** *Exemple : avec des périodes trimestrielles et $N=40$, on part d'une courbe à **10 ans** ; **au point 6 ans (en $t_{24}$), la simulation ne donne plus d'information que sur une courbe à 4 ans**.*

**Le test de l'approximation de drift.** *On valorise des caplets par (31.16) et on compare aux prix de Black. ***« Les résultats montrent que les valeurs de caps issues de Monte-Carlo NE SONT PAS SIGNIFICATIVEMENT DIFFÉRENTES de celles données par le modèle de Black. C'est vrai MÊME quand les périodes durent 1 AN et qu'un très grand nombre d'essais est utilisé. Cela suggère que L'APPROXIMATION DE DRIFT EST INOFFENSIVE dans la plupart des situations. »*** (La seule exception : **quand les volatilités de caps sont très élevées**.)*

</details>

## 🟠 Concept 3 — Les caps non standard

### 3.1 Les trois familles

| Type | Règle de fixation du taux du cap |
|---|---|
| **Cap *RATCHET*** | *le taux du cap **égale le LIBOR de la date de réinitialisation PRÉCÉDENTE plus un spread*** : $\boxed{K_{j+1}=R_j+s}$ |
| **Cap *STICKY*** | *le taux du cap **égale le taux PLAFONNÉ précédent plus un spread*** : $\boxed{K_{j+1}=\min(R_j,K_j)+s}$ |
| ***FLEXI CAP*** | *comme un cap ordinaire, sauf qu'il y a **une LIMITE sur le NOMBRE TOTAL de caplets exerçables*** |

<details class="details--riche">
<summary>

**Les valorisations à un, deux et trois facteurs**

</summary>

**Le cadre commun.** Principal **100 dollars** ; structure par terme plate à **5 %** ; volatilités de caplets de la table 31.1 ; réinitialisation **annuelle** ; spread **25 points de base** ; **100 000 simulations** avec **variables antithétiques** (fiche 92) ; **erreur type d'environ 0,001**.

**Table 31.2 — cap RATCHET** :

| Début du caplet (ans) | 1 facteur | 2 facteurs | 3 facteurs |
|---|---|---|---|
| 1 | 0,196 | 0,194 | 0,195 |
| 2 | 0,207 | 0,207 | 0,209 |
| 3 | 0,201 | 0,205 | 0,210 |
| 5 | 0,187 | 0,193 | 0,201 |
| 7 | 0,172 | 0,180 | 0,188 |
| **10** | **0,153** | **0,162** | **0,169** |

**Table 31.3 — cap STICKY** :

| Début du caplet (ans) | 1 facteur | 2 facteurs | 3 facteurs |
|---|---|---|---|
| 1 | 0,196 | 0,194 | 0,195 |
| 2 | 0,336 | 0,334 | 0,336 |
| 5 | 0,484 | 0,492 | 0,506 |
| 7 | 0,502 | 0,520 | 0,533 |
| **10** | **0,488** | **0,519** | **0,534** |

⚠️ **Le sticky vaut BEAUCOUP plus que le ratchet aux maturités longues** — le plafond y est **cliqueté vers le bas**, donc l'option est bien plus souvent dans la monnaie.

**Table 31.4 — décomposition à DEUX facteurs** :

| Année $k$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| $\lambda_{k-1,1}$ (%) | 14,10 | 19,52 | 16,78 | 17,11 | 15,25 | 14,06 | 12,65 | 13,06 | 12,36 | 11,63 |
| $\lambda_{k-1,2}$ (%) | $-6{,}45$ | $-6{,}70$ | $-3{,}84$ | $-1{,}96$ | **0,00** | 1,61 | 2,89 | 4,48 | 5,65 | 6,65 |
| **Volatilité totale** | 15,50 | 20,64 | 17,21 | 17,22 | 15,25 | 14,15 | 12,98 | 13,81 | 13,60 | 13,40 |

**Table 31.5 — décomposition à TROIS facteurs** :

| Année $k$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| $\lambda_{k-1,1}$ (%) | 13,65 | 19,28 | 16,72 | 16,98 | 14,85 | 13,95 | 12,61 | 12,90 | 11,97 | 10,97 |
| $\lambda_{k-1,2}$ (%) | $-6{,}62$ | $-7{,}02$ | $-4{,}06$ | $-2{,}06$ | 0,00 | 1,69 | 3,06 | 4,70 | 5,81 | 6,66 |
| $\lambda_{k-1,3}$ (%) | 3,19 | 2,25 | 0,00 | $-1{,}98$ | $-3{,}47$ | $-1{,}63$ | 0,00 | 1,51 | 2,80 | 3,84 |
| **Volatilité totale** | 15,50 | 20,64 | 17,21 | 17,22 | 15,25 | 14,15 | 12,98 | 13,81 | 13,60 | 13,40 |

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle : la volatilité totale est $\sqrt{\sum_q\lambda_{k-1,q}^2}$ — elle reproduit EXACTEMENT les $\Lambda$ de la table 31.1.</span>

⚠️ *Les facteurs 2 et 3 sont les **twists** et **courbures** habituels : ils changent de signe au milieu de la plage.*

</div>

**Le flexi cap.** *Principal 100, courbe plate à 5 %, mêmes volatilités, **tous les caplets dans la monnaie exercés jusqu'à un maximum de CINQ**. Le LMM donne :*

| Facteurs | 1 | 2 | 3 |
|---|---|---|---|
| **Prix** | **3,43** | **3,58** | **3,61** |

</details>

### 3.2 Pourquoi le nombre de facteurs compte

> ⚠️ **LE POINT CONCEPTUEL DE LA SECTION.**
>
> ***« La valorisation d'un cap PLAIN VANILLA dépend UNIQUEMENT de la volatilité TOTALE et est INDÉPENDANTE du nombre de facteurs. C'est parce que le prix d'un caplet vanille dépend du comportement D'UN SEUL taux forward. »***
>
> ***« Les prix des caplets dans les instruments NON STANDARD sont différents : ils dépendent de LA LOI DE PROBABILITÉ JOINTE de PLUSIEURS taux forward. En conséquence, ILS DÉPENDENT DU NOMBRE DE FACTEURS. »***

## 🔴 Concept 4 — Les swaptions européennes dans le LMM

<details class="details--riche">
<summary>

**L'approximation analytique de Hull et White**

</summary>

**Le cadre.** $T_0$ = maturité de la swaption ; dates de paiement du swap $T_1,\dots,T_N$ ; $\tau_i=T_{i+1}-T_i$ ; $G_j(t)$ = taux forward en $t$ pour $[T_j,T_{j+1}]$.

*Étape 1 — les deux relations.* Par (27.23) (fiche 99) :

$$s(t)=\frac{P(t,T_0)-P(t,T_N)}{\sum_{i=0}^{N-1}\tau_iP(t,T_{i+1})}\qquad\text{et}\qquad\frac{P(t,T_i)}{P(t,T_0)}=\prod_{j=0}^{i-1}\frac{1}{1+\tau_jG_j(t)}$$

*Étape 2 — appliquer Itô.* La variance $V(t)$ du taux de swap :

$$\boxed{V(t)=\sum_{q=1}^{p}\left[\sum_{k=0}^{N-1}\frac{\tau_k\gamma_{k,q}(t)G_k(t)\beta_k(t)}{1+\tau_kG_k(t)}\right]^2}\;\text{(31.17)}$$

avec

$$\beta_k(t)=\frac{\prod_{j=0}^{N-1}\big[1+\tau_jG_j(t)\big]}{\prod_{j=0}^{N-1}\big[1+\tau_jG_j(t)\big]-1}-\frac{\sum_{i=0}^{k-1}\tau_i\prod_{j=i+1}^{N-1}\big[1+\tau_jG_j(t)\big]}{\sum_{i=0}^{N-1}\tau_i\prod_{j=i+1}^{N-1}\big[1+\tau_jG_j(t)\big]}$$

*Étape 3 — L'APPROXIMATION.* **On approche $V(t)$ en posant $G_j(t)=G_j(0)$ pour tout $j$ et $t$.** La volatilité de swap à substituer dans le modèle de marché standard est :

$$\boxed{\sqrt{\frac{1}{T_0}\int_0^{T_0}V(t)\,dt}=\sqrt{\frac{1}{T_0}\int_0^{T_0}\sum_{q=1}^{p}\left[\sum_{k=0}^{N-1}\frac{\tau_k\gamma_{k,q}(t)G_k(0)\beta_k(0)}{1+\tau_kG_k(0)}\right]^2dt}}\;\text{(31.18)}$$

> *Quand la période d'accroissement du swap **égale** celle d'un cap, $\gamma_{k,q}(t)$ est **la $q$-ième composante de volatilité d'un taux forward de cap à maturité $T_k-t$** — **on la lit directement dans une table comme la 31.5**.*

**L'extension aux périodes DIFFÉRENTES.** *« Les périodes d'accroissement des swaps sous-jacents aux cotations de swaptions **ne correspondent pas toujours** à celles des caps. **Aux États-Unis, les caps de référence ont des réinitialisations TRIMESTRIELLES, tandis que les swaps sous les swaptions de référence ont des réinitialisations SEMESTRIELLES. »*** Avec $M$ sous-périodes par période d'accroissement et $\tau_j=\sum_{m=1}^M\tau_{j,m}$, comme

$$1+\tau_jG_j(t)=\prod_{m=1}^{M}\big[1+\tau_{j,m}G_{j,m}(t)\big]$$

la volatilité de swap devient :

$$\boxed{\sqrt{\frac{1}{T_0}\int_0^{T_0}\sum_{q=1}^{p}\left[\sum_{k=n}^{N-1}\sum_{m=1}^{M}\frac{\tau_{k,m}\gamma_{k,m,q}(t)G_{k,m}(0)\beta_k(0)}{1+\tau_{k,m}G_{k,m}(0)}\right]^2dt}}\;\text{(31.19)}$$

**Le verdict.** *« Hull et White ont comparé les prix de swaptions calculés par (31.18) et (31.19) aux prix issus d'une simulation Monte-Carlo et **les ont trouvés TRÈS PROCHES**. **Une fois le LMM calibré, ces équations fournissent donc un MOYEN RAPIDE de valoriser les swaptions européennes.** Les analystes peuvent déterminer **si les swaptions sont sur- ou sous-évaluées PAR RAPPORT AUX CAPS** — et s'en servir pour **calibrer le modèle aux prix de swaptions**. »*

</details>

## 🟠 Concept 5 — Calibrer, les skews, et les bermudiennes

### 5.1 La calibration en deux temps

> *$\Lambda_j$ est la volatilité en $t$ du taux forward $F_j$ **quand il y a $j$ périodes entières entre $t$ et $t_k$**. Calibrer = déterminer **les $\Lambda_j$** ET **leur découpage en $\lambda_{j,q}$**.*
>
> ⚠️ ***« Les $\Lambda$ sont habituellement déterminés à partir de DONNÉES DE MARCHÉ COURANTES, tandis que le découpage en $\lambda$ est déterminé à partir de DONNÉES HISTORIQUES. »***

<details class="details--riche">
<summary>

**Le découpage par ACP, et la calibration des $\Lambda$**

</summary>

**Le découpage — une analyse en composantes principales** (fiche 93, §21.9) sur les données de taux forward :

$$\Delta F_j=\sum_{q=1}^{M}\alpha_{j,q}x_q$$

où $M$ est **le nombre TOTAL de facteurs** (égal au nombre de taux forward différents), $\alpha_{j,q}$ **le chargement factoriel** et $x_q$ **le factor score**. Soit $s_q$ l'écart-type du $q$-ième score.

| Cas | Formule |
|---|---|
| $p=M$ (tous les facteurs) | $\lambda_{j,q}=\alpha_{j,q}s_q$ |
| $p<M$ | **il faut RECALIBRER** pour que $\Lambda_j=\sqrt{\sum_{q=1}^p\lambda_{j,q}^2}$, soit $$\boxed{\lambda_{j,q}=\frac{\Lambda_j\,\alpha_{j,q}s_q}{\sqrt{\sum_{q=1}^{p}s_q^2\alpha_{j,q}^2}}}\;\text{(31.20)}$$ |

**L'estimation des $\Lambda$.** *« (31.11) fournit une façon théorique de les déterminer de manière cohérente avec les prix de caplets. **EN PRATIQUE, CE N'EST PAS HABITUELLEMENT UTILISÉ, parce que cela conduit souvent à des OSCILLATIONS SAUVAGES des $\Lambda$, et que parfois AUCUN ensemble de $\Lambda$ n'est exactement cohérent avec les cotations de caps. »***

**La procédure usuelle**, analogue au §30.8 :

$$\boxed{\min\ \sum_i(U_i-V_i)^2+P}\qquad\text{avec}\qquad P=\sum_iw_{1,i}(\Lambda_{i+1}-\Lambda_i)^2+\sum_iw_{2,i}(\Lambda_{i+1}+\Lambda_{i-1}-2\Lambda_i)^2$$

*Quand l'instrument de calibration est **une swaption européenne**, **(31.18) et (31.19) rendent la minimisation FAISABLE** par la procédure de **Levenberg-Marquardt**. (31.20) détermine ensuite les $\lambda$ à partir des $\Lambda$.*

</details>

### 5.2 Les skews de volatilité

*Les courtiers cotent aussi des caps **hors de la monnaie**. Dans certains marchés on observe **un SKEW de volatilité** : **la volatilité de Black cotée est une fonction DÉCROISSANTE du strike**. Cela se traite avec le **modèle CEV** (fiche 98, §26.1) :*

$$\boxed{dF_i(t)=\cdots+\sum_{q=1}^{p}\zeta_{i,q}(t)F_i(t)^\alpha\,dz_q}\;\text{(31.21)}\qquad0<\alpha<1$$

> ⚠️ *« Ce modèle **se traite très similairement au modèle lognormal**. Caps et floors se valorisent **analytiquement par la loi du KHI-DEUX NON CENTRÉE** cumulée. Il existe des approximations analytiques similaires pour les swaptions. »*

### 5.3 Les swaptions bermudiennes

*Une **swaption bermudienne** est exerçable **à certaines ou toutes les dates de paiement** du swap sous-jacent.*

> ⚠️ ***« Les bermudiennes sont DIFFICILES à valoriser avec le LMM parce que le LMM repose sur MONTE-CARLO, et qu'il est difficile d'évaluer les décisions d'exercice anticipé en Monte-Carlo. »***

| Approche | Détail |
|---|---|
| **Longstaff-Schwartz** | *appliquent l'approche des **MOINDRES CARRÉS** quand il y a beaucoup de facteurs. **La valeur de ne pas exercer est supposée être une fonction POLYNOMIALE des valeurs des facteurs*** (fiche 98, §26.8) |
| **Andersen** | *utilise l'approche de la **frontière d'exercice paramétrée**. Il expérimente plusieurs paramétrisations et **trouve de bons résultats quand la décision est supposée ne dépendre QUE de la VALEUR INTRINSÈQUE de l'option*** |
| **En pratique** | *« **La plupart des traders valorisent les bermudiennes avec l'un des modèles à UN facteur du chapitre 30.** Cependant, **l'exactitude des modèles à un facteur pour les bermudiennes A ÉTÉ UNE QUESTION CONTROVERSÉE** »* — voir les articles opposés d'Andersen-Andreasen et de Longstaff-Santa Clara-Schwartz, *Journal of Financial Economics*, 2001 |

## 🔴 Concept 6 — Les titres hypothécaires d'agence

### 6.1 Le produit et le prépaiement

*Un **MBS d'agence** est similaire à l'ABS du chapitre 8 (fiche 81), **sauf que les paiements sont GARANTIS par une agence liée au gouvernement** comme **GNMA** ou **FNMA**, ce qui protège les investisseurs contre les défauts. **Cela le fait ressembler à un titre à revenu fixe ordinaire émis par le gouvernement.***

> ⚠️ ***« EN FAIT, IL Y A UNE DIFFÉRENCE CRITIQUE : les crédits hypothécaires du pool ont des PRIVILÈGES DE PRÉPAIEMENT. Aux États-Unis, les crédits durent typiquement 30 ANS et peuvent être prépayés À TOUT MOMENT. CELA SIGNIFIE QUE LE PROPRIÉTAIRE A UNE OPTION PUT AMÉRICAINE À 30 ANS DE RENDRE SON CRÉDIT AU PRÊTEUR À SA VALEUR FACIALE. »***

**Les raisons du prépaiement.** *Parfois **les taux baissent** et le propriétaire **refinance à un taux plus bas**. D'autres fois, un crédit est prépayé **simplement parce que la maison est vendue**.*

**La fonction de prépaiement.** *« Un élément critique de la valorisation est la détermination de la **FONCTION DE PRÉPAIEMENT** : une fonction décrivant **les prépaiements attendus sur le pool à un instant $t$ en fonction de LA COURBE DES TAUX en $t$ et d'autres variables pertinentes**. »*

> ⚠️ *« Une fonction de prépaiement est **TRÈS PEU FIABLE comme prédicteur pour un crédit INDIVIDUEL. Quand de nombreux crédits similaires sont combinés dans le même pool, il y a un effet de « LOI DES GRANDS NOMBRES » à l'œuvre** et les prépaiements se prédisent plus précisément par analyse de données historiques. »*
>
> ⚠️ ***« Néanmoins, il y a une TENDANCE des prépaiements à être PLUS PROBABLES QUAND LES TAUX SONT BAS. Cela signifie que LES INVESTISSEURS EXIGENT UN TAUX D'INTÉRÊT PLUS ÉLEVÉ sur un MBS d'agence que sur d'autres titres à revenu fixe, POUR COMPENSER LES OPTIONS DE PRÉPAIEMENT QU'ILS ONT VENDUES. »***

### 6.2 Les CMO, IO et PO

**Le *pass-through*** est le type le plus simple : *tous les investisseurs reçoivent **le même rendement** et portent **le même risque de prépaiement**.*

<details class="details--riche">
<summary>

**Le CMO à trois classes, et les IO/PO**

</summary>

**Le CMO.** *Dans un ***collateralized mortgage obligation***, les investisseurs sont divisés en classes et **des règles déterminent comment les REMBOURSEMENTS DE PRINCIPAL sont canalisés**.* ***« Un CMO crée des classes portant DES MONTANTS DIFFÉRENTS DE RISQUE DE PRÉPAIEMENT, de la même façon que l'ABS du chapitre 8 crée des classes portant des montants différents de RISQUE DE CRÉDIT. »***

**L'exemple à trois classes.** *Tous les remboursements de principal (**programmés ET prépaiements**) vont d'abord à la **classe A** jusqu'à extinction, puis à la **classe B**, puis à la **classe C**.*

| Classe | Risque de prépaiement | Durée attendue |
|---|---|---|
| **A** | **le PLUS élevé** | la **plus courte** |
| **B** | intermédiaire | intermédiaire |
| **C** | le plus faible | la **plus longue** |

**L'effet des valeurs nominales, à savoir raisonner :**

| Répartition A / B / C | Position de la classe C |
|---|---|
| **400 / 300 / 100** | *elle porte **TRÈS PEU** de risque de prépaiement* |
| **100 / 200 / 500** | *elle porte **BEAUCOUP PLUS** de risque* |

**L'objectif :** *« créer des classes de titres **PLUS ATTRACTIFS pour les investisseurs institutionnels** que ceux créés par un simple pass-through. »*

**Business Snapshot 31.1 — les IO et les PO.**

*Dans un ***stripped MBS***, les paiements de principal sont **SÉPARÉS** des paiements d'intérêts :*

| Titre | Reçoit | Effet d'une HAUSSE des prépaiements |
|---|---|---|
| **PO** (*principal only*) | **tous les paiements de PRINCIPAL** | **il devient PLUS PRÉCIEUX** |
| **IO** (*interest only*) | **tous les paiements d'INTÉRÊTS** | **il devient MOINS PRÉCIEUX** |

⚠️ ***Les deux sont des investissements RISQUÉS.***

|  | **PO** | **IO** |
|---|---|---|
| Ce qui est certain | *un **montant FIXE de principal** est rendu…* | — |
| Ce qui est incertain | *…mais **LE TIMING** l'est* | ***LE TOTAL des flux reçus** est incertain* |
| Prépaiements élevés | *le principal est **reçu tôt** — **bonne nouvelle*** | ***plus les prépaiements sont élevés, PLUS FAIBLES sont les flux totaux*** |
| Prépaiements faibles | *le retour du principal est **retardé**, le rendement **réduit*** | — |

</details>

### 6.3 Valorisation et *option-adjusted spread*

**La valorisation.** *« Les MBS d'agence se valorisent habituellement par **MONTE-CARLO**. **HJM ou LMM** peuvent servir à simuler le comportement des taux **MOIS PAR MOIS** sur toute la vie du titre. »*

| Étape (par essai de simulation) | Contenu |
|---|---|
| **1** | **chaque mois**, les prépaiements attendus se calculent **de la courbe courante ET DE L'HISTORIQUE des mouvements de courbe** |
| **2** | ces prépaiements déterminent les **flux attendus** au détenteur |
| **3** | les flux sont **actualisés à la date 0** pour obtenir une valeur échantillon |
| **4** | l'estimation est **la MOYENNE** sur de nombreux essais |

> ⚠️ *C'est **précisément parce qu'ils sont fortement DÉPENDANTS DU CHEMIN** que les MBS d'agence sont **des candidats idéaux pour HJM et LMM**.*

<details class="details--riche">
<summary>

**L'option-adjusted spread — la procédure itérative complète**

</summary>

> ***L'OAS est UNE MESURE DU SPREAD SUR LES RENDEMENTS DES OBLIGATIONS D'ÉTAT fourni par l'instrument QUAND TOUTES LES OPTIONS ONT ÉTÉ PRISES EN COMPTE.***

| Étape | Contenu |
|---|---|
| **1** | *l'entrée habituelle d'un modèle de structure par terme est **la courbe LIBOR**. **Mais pour calculer un OAS, on valorise D'ABORD avec la courbe zéro des OBLIGATIONS D'ÉTAT*** |
| **2** | comparer le prix du modèle au **prix de marché** |
| **3** | **itérer** pour trouver **le DÉPLACEMENT PARALLÈLE de la courbe d'État** qui rend le prix du modèle égal au prix de marché |
| **4** | **ce déplacement parallèle EST l'OAS** |

**L'exemple chiffré, à reproduire.** *Prix de marché **102,00** ; prix calculé avec la courbe d'État **103,27**.*

*Essai 1 — un déplacement de **60 points de base** donne un prix de **101,20**.* C'est **inférieur** à 102,00, donc l'OAS est **entre 0 et 60 pb**. Par interpolation linéaire :

$$60\times\frac{103{,}27-102{,}00}{103{,}27-101{,}20}=60\times\frac{1{,}27}{2{,}07}=\mathbf{36{,}81\ \text{pb}}$$

*Essai 2 — 36,81 pb donne **101,95**.* C'est **légèrement inférieur** à 102,00, donc l'OAS est **un peu moins de 36,81**. Nouvelle interpolation :

$$36{,}81\times\frac{103{,}27-102{,}00}{103{,}27-101{,}95}=36{,}81\times\frac{1{,}27}{1{,}32}=\mathbf{35{,}41\ \text{pb}}$$

*Et ainsi de suite jusqu'à convergence.*

</details>

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| « taux forward **INSTANTANÉS** » | **HJM** : (31.4) et le résultat (31.5) |
| « quel est le drift ? » avec des volatilités données | le drift est **DICTÉ** par les volatilités |
| « pourquoi ne peut-on pas utiliser un arbre ? » | processus **NON MARKOVIEN** → arbre **non recombinant** |
| « taux forward de caps », « réinitialisations » | **LMM** |
| « monde forward risque-neutre roulant » | numéraire = **CD roulé** |
| Volatilités de caplets données, $\Lambda$ demandés | $\sigma_k^2t_k=\sum\Lambda_{k-i}^2\delta_{i-1}$, **itérativement** |
| Simulation de taux forward | (31.14) ou (31.16), avec **l'approximation de drift** |
| Cap *ratchet* | $K_{j+1}=R_j+s$ |
| Cap *sticky* | $K_{j+1}=\min(R_j,K_j)+s$ |
| « le nombre de facteurs importe-t-il ? » | **non** pour un cap vanille, **oui** pour les exotiques |
| Volatilité de swap dans le LMM | (31.18), ou (31.19) si les périodes diffèrent |
| Découper $\Lambda$ en $\lambda_q$ | **ACP** + la renormalisation (31.20) |
| Skew de volatilité de caps | le modèle **CEV** (31.21) |
| Swaption **bermudienne** | Longstaff-Schwartz ou frontière paramétrée ; en pratique **un modèle à un facteur** |
| « fonction de prépaiement », « pool » | **MBS d'agence**, valorisation **Monte-Carlo** |
| Prix de marché ≠ prix modèle sur la courbe d'État | l'**OAS** par interpolation |

## Comment résoudre ce type d'exercice

**A — Extraire les $\Lambda$ de volatilités de caplets.**

1. Écrire $\sigma_k^2t_k=\sum_{i=1}^{k}\Lambda_{k-i}^2\delta_{i-1}$.
2. $k=1$ : $\Lambda_0=\sigma_1$.
3. $k=2$ : $\Lambda_1=\sqrt{2\sigma_2^2\ -\Lambda_0^2}$ (si $\delta$ constant $=1$).
4. Continuer : $\Lambda_{k-1}=\sqrt{k\sigma_k^2-\sum_{j<k-1}\Lambda_j^2}$.
5. Contrôle : la **bosse** des $\Lambda$ doit être **plus prononcée** que celle des $\sigma$ ; si un radicande est **négatif**, aucun jeu de $\Lambda$ n'est cohérent.

**B — Simuler un pas du LMM.**

1. Partir des $F_i(t_j)$ courants.
2. Pour chaque $k>j$, calculer le drift $\sum_{i=j+1}^{k}\dfrac{\delta_iF_i\Lambda_{i-j-1}\Lambda_{k-j-1}}{1+\delta_iF_i}$ — **la somme commence à $j+1$**.
3. Retrancher $\Lambda_{k-j-1}^2/2$, multiplier par $\delta_j$.
4. Ajouter $\Lambda_{k-j-1}\varepsilon\sqrt{\delta_j}$ et exponentier.
5. Contrôle : **la courbe raccourcit** d'une période à chaque pas.

**C — Calculer un OAS.**

1. Valoriser avec la courbe **d'État**, obtenir $V_0$.
2. Comparer au prix de marché $M$ ; si $V_0>M$, l'OAS est **positif**.
3. Essayer un déplacement $x_1$, obtenir $V_1$.
4. Interpoler : $x_2=x_1\dfrac{V_0-M}{V_0-V_1}$.
5. Itérer jusqu'à convergence.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire les modèles du ch. 30 sans limite | **un facteur** et **volatilité non stationnaire** |
| Oublier $v(t,t,\Omega_t)=0$ | sans elle, le prix ne convergerait pas vers la faciale |
| Croire qu'on peut choisir le drift dans HJM | **il est ENTIÈREMENT DICTÉ par les volatilités** |
| Croire HJM markovien | **non** — d'où l'arbre **non recombinant** et $2^{30}\approx10^9$ nœuds |
| Croire qu'aucun taux forward n'est markovien dans HJM | **un taux PARTICULIER l'est souvent** — mais **pas tous sur le même arbre** |
| Utiliser des taux forward instantanés dans le LMM | le LMM utilise **les taux OBSERVABLES des caps** |
| Oublier que $F_k$ n'est martingale que sous $P(t,t_{k+1})$ | sous le monde **roulant**, il y a un **drift** |
| Faire commencer la somme du drift à $i=0$ | elle commence à $\mathbf{m(t)}$, la **prochaine** réinitialisation |
| Oublier le $-\Lambda^2/2$ dans (31.14) | c'est la **correction d'Itô** du passage au log |
| Croire l'approximation de drift dangereuse | Hull la juge **inoffensive**, sauf si les volatilités de caps sont **très élevées** |
| Croire que le nombre de facteurs change le prix d'un cap vanille | **non** — un **seul** taux forward est impliqué |
| Croire qu'il ne change rien pour un ratchet | **si** — la loi **JOINTE** de plusieurs taux intervient |
| Utiliser (31.11) telle quelle pour calibrer | **oscillations sauvages**, parfois **aucune** solution |
| Oublier de renormaliser les $\lambda_{j,q}$ quand $p<M$ | il faut (31.20), sinon $\sqrt{\sum\lambda^2}\ne\Lambda_j$ |
| Croire que le prépaiement est purement lié aux taux | **une vente de maison** en cause aussi |
| Croire un MBS d'agence sans risque | le **défaut** est garanti, **PAS le prépaiement** |
| Croire que la classe C d'un CMO est toujours protégée | cela dépend **des valeurs nominales relatives** |
| Croire qu'un IO gagne quand les prépaiements montent | **c'est l'inverse** — il perd |
| Calculer l'OAS sur la courbe **LIBOR** | il se calcule sur la courbe des **obligations d'ÉTAT** |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Les deux limites du ch. 30** | **un facteur** · **liberté de volatilité limitée** |
| **Le prix de la flexibilité** | volatilité **NON STATIONNAIRE** |
| **Usage de HJM et LMM** | plutôt **recherche et développement** que routine |
| **Auteurs de HJM** | **Heath, Jarrow et Morton**, 1990-1992 |
| **Ce que HJM décrit** | les **conditions de NON-ARBITRAGE** de la courbe |
| **Processus du zéro-coupon** | $dP=rP\,dt+vP\,dz$ |
| **La condition de bord** | $v(t,t,\Omega_t)=0$ |
| **Le processus du taux forward** | $dF=v\,v_T\,dt-v_T\,dz$ |
| **Le résultat HJM** | $m(t,T)=s(t,T)\int_t^Ts(t,\tau)d\tau$ |
| **Sa portée** | **le drift est DICTÉ par les volatilités** |
| **Multi-facteurs** | $m=\sum_ks_k\int_t^Ts_k\,d\tau$ |
| **Le problème clé** | le taux court est **NON MARKOVIEN** |
| **La conséquence** | arbre **non recombinant** : $2^{30}\approx\mathbf{10^9}$ nœuds |
| **La méthode obligée** | **MONTE-CARLO** |
| **La nuance** | un taux forward **particulier** est markovien, **pas tous ensemble** |
| **Les deux défauts de HJM** | taux **non observables** · **difficile à calibrer** |
| **Auteurs du LMM** | **Brace, Gatarek, Musiela** ; **Jamshidian** ; **Miltersen, Sandmann, Sondermann** |
| **Autre nom** | le modèle **BGM** |
| **$m(t)$** | l'indice de la **prochaine réinitialisation** |
| **Sous $P(t,t_{k+1})$** | $F_k$ est une **MARTINGALE** |
| **Le monde roulant** | forward risque-neutre par rapport à **$P(t,t_{m(t)})$** |
| **Son numéraire** | un **CD ROULÉ** |
| **La remarque de Hull** | les **arbres du ch. 30 sont dans ce monde**, pas le traditionnel |
| **Le lien $v$-$\zeta$** | $v_i-v_{i+1}=\dfrac{\delta_iF_i\zeta_i}{1+\delta_iF_i}$ |
| **Le drift du LMM** | $\displaystyle\sum_{i=m(t)}^{k}\frac{\delta_iF_i\zeta_i\zeta_k}{1+\delta_iF_i}$ |
| **Cas limite** | HJM quand $\delta_i\to0$ |
| **La simplification** | $\zeta_k(t)=\Lambda_{k-m(t)}$, **fonction escalier** |
| **Le lien aux caplets** | $\sigma_k^2t_k=\sum_{i=1}^{k}\Lambda_{k-i}^2\delta_{i-1}$ |
| **Exemple 31.1** | 24 / 22 / 20 % → $\Lambda=$ **24 · 19,80 · 15,23 %** |
| **Table 31.1** | $\sigma$ de 15,50 à 15,54 → $\Lambda$ de 15,50 à 13,40, **pic à 20,64** |
| **La bosse des $\Lambda$** | **PLUS PRONONCÉE** que celle des $\sigma$ |
| **L'approximation de drift** | $F_i(t)=F_i(t_j)$ sur chaque période |
| **Son verdict** | **INOFFENSIVE**, sauf volatilités très élevées |
| **Ce qui raccourcit** | **la courbe zéro**, à chaque pas |
| **Cap ratchet** | $K_{j+1}=R_j+s$ |
| **Cap sticky** | $K_{j+1}=\min(R_j,K_j)+s$ |
| **Flexi cap** | **limite sur le NOMBRE de caplets exerçables** |
| **Flexi cap, 1/2/3 facteurs** | **3,43 · 3,58 · 3,61** |
| **Cap vanille et facteurs** | **INDÉPENDANT** — un seul taux forward |
| **Caps exotiques et facteurs** | **DÉPENDANT** — loi **JOINTE** |
| **Volatilité de swap (LMM)** | (31.18), et (31.19) si les périodes diffèrent |
| **Le décalage américain** | caps **trimestriels** contre swaps **semestriels** |
| **Le verdict de Hull-White** | (31.18)-(31.19) **très proches** de Monte-Carlo |
| **Calibration : les $\Lambda$** | des **données de marché courantes** |
| **Calibration : le découpage** | des **données HISTORIQUES**, par **ACP** |
| **La renormalisation** | $\lambda_{j,q}=\dfrac{\Lambda_j\alpha_{j,q}s_q}{\sqrt{\sum_qs_q^2\alpha_{j,q}^2}}$ |
| **Pourquoi pas (31.11)** | **oscillations sauvages** ; parfois aucune solution |
| **Skew de volatilité** | volatilité **décroissante** en strike → modèle **CEV** |
| **Loi de valorisation CEV** | le **khi-deux NON CENTRÉ** |
| **Bermudiennes en LMM** | difficiles : Monte-Carlo + exercice anticipé |
| **Les deux remèdes** | **Longstaff-Schwartz** · **frontière paramétrée** (Andersen) |
| **La pratique** | la plupart des traders utilisent **un modèle à UN facteur** |
| **MBS d'agence** | garanti contre le **défaut** par GNMA ou FNMA |
| **La différence critique** | les **PRIVILÈGES DE PRÉPAIEMENT** |
| **Ce que c'est** | un **PUT AMÉRICAIN à 30 ANS** donné à l'emprunteur |
| **La fonction de prépaiement** | prépaiements attendus **fonction de la courbe et d'autres variables** |
| **Sa fiabilité** | **nulle** individuellement, **bonne sur un POOL** |
| **La conséquence sur les taux** | les investisseurs **exigent un taux PLUS ÉLEVÉ** |
| **Pass-through** | tous les investisseurs, **même risque** |
| **CMO** | classes **A/B/C**, principal canalisé **dans l'ordre** |
| **Qui porte le plus de risque** | la **classe A** |
| **PO** | reçoit le **principal** ; **gagne** si les prépaiements montent |
| **IO** | reçoit les **intérêts** ; **PERD** si les prépaiements montent |
| **Ce qui est incertain sur un PO** | le **TIMING** |
| **Sur un IO** | le **TOTAL** des flux |
| **Valorisation d'un MBS** | **Monte-Carlo**, mois par mois, HJM ou LMM |
| **Pourquoi ces modèles** | ils sont **fortement dépendants du chemin** |
| **L'OAS** | le **spread sur les rendements d'État**, options prises en compte |
| **La courbe utilisée** | celle des **obligations d'ÉTAT** |
| **L'exemple** | $60\times\frac{1{,}27}{2{,}07}=\mathbf{36{,}81}$ puis $36{,}81\times\frac{1{,}27}{1{,}32}=\mathbf{35{,}41}$ pb |

## 🧠 Active Recall

1. Citer les deux limites des modèles du chapitre 30.
2. Quel est le prix de rendre $a$ et $\sigma$ fonctions du temps ?
3. À quoi les modèles HJM et LMM servent-ils surtout en pratique ?
4. Qui sont les auteurs de HJM et que décrit leur article ?
5. Écrire le processus du prix d'un zéro-coupon dans le monde risque-neutre.
6. Pourquoi $v(t,t,\Omega_t)=0$ ? Quelle en est l'interprétation ?
7. Écrire (31.2) et appliquer Itô aux deux logarithmes.
8. Dériver (31.3) et commenter sa dépendance.
9. Passer à la limite pour obtenir (31.4).
10. Quel est le résultat clé de HJM ?
11. Dériver (31.5) en utilisant la condition de bord.
12. Écrire l'extension multi-facteurs.
13. Pourquoi le processus du taux court est-il non markovien ? Quelle en est la conséquence ?
14. Combien de nœuds après 30 pas ? Quelle méthode s'impose ?
15. En quel sens HJM est-il « trompeusement complexe » ?
16. Citer les deux défauts de HJM qui ont motivé le LMM.
17. Qui a proposé le LMM ? Quel est son autre nom ?
18. Définir $t_k$, $\delta_k$, $F_k(t)$, $m(t)$ et $\zeta_k(t)$.
19. Sous quel numéraire $F_k$ est-il une martingale ?
20. Définir le monde forward risque-neutre roulant. Que permet-il ?
21. Qu'est-ce qu'un CD roulé ?
22. Quelle remarque Hull fait-il sur les arbres du chapitre 30 ?
23. Écrire (31.8) et dire pourquoi $v_k$ est négative.
24. Dériver (31.9) à partir de la relation prix-taux forward.
25. Écrire le drift complet (31.10).
26. Quel est le cas limite de (31.10) ?
27. Quelle simplification transforme $\zeta_k(t)$ en fonction escalier ?
28. Écrire (31.11) et expliquer son origine.
29. Refaire l'exemple 31.1 en entier.
30. Lire la table 31.1. Que remarque-t-on sur les deux bosses ?
31. Écrire (31.13) puis (31.14). Quelle approximation est faite ?
32. Écrire l'extension multi-facteurs (31.16).
33. Décrire le déroulement d'une simulation. Que devient la courbe ?
34. Comment teste-t-on l'approximation de drift ? Quel est le verdict ?
35. Quelle est la seule exception ?
36. Définir cap ratchet, cap sticky, flexi cap.
37. Écrire les deux règles de fixation du taux.
38. Quel est le cadre commun des tables 31.2 et 31.3 ?
39. Comment se comparent ratchet et sticky aux maturités longues ?
40. Lire les tables 31.4 et 31.5 : comment vérifie-t-on la volatilité totale ?
41. Quelles valeurs le flexi cap prend-il avec 1, 2, 3 facteurs ?
42. Pourquoi un cap vanille est-il indépendant du nombre de facteurs ?
43. Pourquoi les exotiques ne le sont-ils pas ?
44. Écrire les deux relations liant $s(t)$ et les $G_j(t)$.
45. Écrire (31.17) et l'approximation faite sur les $G_j$.
46. Écrire (31.18). Où lit-on les $\gamma_{k,q}$ ?
47. Quel décalage existe entre caps et swaptions aux États-Unis ?
48. Écrire (31.19) et son motif.
49. Quel est le verdict de Hull et White sur ces approximations ? À quoi servent-elles ?
50. Comment détermine-t-on les $\Lambda$ et les $\lambda$ respectivement ?
51. Décrire l'ACP employée et le cas $p=M$.
52. Écrire (31.20) et dire pourquoi elle est nécessaire.
53. Pourquoi (31.11) n'est-elle pas utilisée en pratique ?
54. Écrire la fonction objectif de calibration et sa pénalité.
55. Quel algorithme utilise-t-on ?
56. Qu'est-ce qu'un skew de volatilité de caps ? Comment le traite-t-on ?
57. Écrire (31.21) et dire quelle loi sert à la valorisation.
58. Qu'est-ce qu'une swaption bermudienne ? Pourquoi est-elle difficile en LMM ?
59. Citer les deux approches et ce que fait chacune.
60. Que font la plupart des traders ? Est-ce consensuel ?
61. Qu'est-ce qu'un MBS d'agence ? Qui garantit ?
62. Quelle est la différence critique avec un titre d'État ?
63. Décrire l'option détenue par le propriétaire.
64. Citer deux raisons de prépaiement.
65. Qu'est-ce que la fonction de prépaiement ? Quelle est sa fiabilité ?
66. Pourquoi les investisseurs exigent-ils un taux plus élevé ?
67. Qu'est-ce qu'un pass-through ?
68. Décrire le CMO à trois classes. Qui porte le plus de risque ?
69. Comparer les répartitions 400/300/100 et 100/200/500.
70. Quel est l'objectif de ce type de structure ?
71. Qu'est-ce qu'un stripped MBS ? Distinguer IO et PO.
72. Que se passe-t-il pour chacun quand les prépaiements montent ?
73. Qu'est-ce qui est incertain sur un PO ? Sur un IO ?
74. Décrire les quatre étapes de la valorisation Monte-Carlo d'un MBS.
75. Pourquoi HJM et LMM y sont-ils adaptés ?
76. Définir l'OAS. Sur quelle courbe se calcule-t-il ?
77. Décrire les quatre étapes de son calcul.
78. Refaire les deux itérations de l'exemple.

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les deux limites du ch. 30 ? | **Un facteur** · liberté de **volatilité limitée** |
| Prix de la flexibilité ? | Volatilité **NON STATIONNAIRE** |
| Usage réel de HJM et LMM ? | **Recherche et développement** |
| Auteurs de HJM ? | **Heath, Jarrow, Morton** (1990-1992) |
| Ce que HJM décrit ? | Les conditions de **NON-ARBITRAGE** |
| Processus du zéro-coupon ? | $dP=rP\,dt+vP\,dz$ |
| La condition de bord ? | $v(t,t,\Omega_t)=\mathbf0$ |
| Sa justification ? | Sinon un **drift INFINI** serait nécessaire |
| Processus du taux forward instantané ? | $dF=v\,v_T\,dt-v_T\,dz$ |
| Le résultat clé de HJM ? | Un **LIEN entre drift et écart-type** |
| Sa formule ? | $m(t,T)=s(t,T)\int_t^Ts(t,\tau)d\tau$ |
| Ce que cela signifie ? | Le drift est **DICTÉ** par les volatilités |
| Multi-facteurs ? | $m=\sum_ks_k\int_t^Ts_k\,d\tau$ |
| Le problème clé de HJM ? | Processus **NON MARKOVIEN** |
| Ce que cela veut dire ? | $r$ en $t$ dépend **DU CHEMIN** |
| La conséquence sur l'arbre ? | Il **NE RECOMBINE PAS** |
| Combien de nœuds à 30 pas ? | $2^{30}\approx$ **1 milliard** |
| La méthode obligée ? | **MONTE-CARLO** |
| La nuance de Hull ? | Un taux **particulier** est markovien, **pas tous ensemble** |
| Défaut 1 de HJM ? | Taux forward **non observables** |
| Défaut 2 ? | **Difficile à calibrer** |
| Auteurs du LMM ? | **Brace, Gatarek, Musiela** ; Jamshidian ; Miltersen-Sandmann-Sondermann |
| Autre nom ? | Le modèle **BGM** |
| En quoi est-il exprimé ? | Les taux forward **des CAPS** |
| Que vaut $m(t)$ ? | L'indice de la **prochaine réinitialisation** |
| $F_k$ est martingale sous ? | $P(t,t_{k+1})$ |
| Monde roulant ? | Forward RN par rapport à $P(t,t_{m(t)})$ |
| Ce qu'il permet ? | Actualiser **d'une réinitialisation à la suivante** |
| Son numéraire ? | Un **CD ROULÉ** |
| La remarque sur le ch. 30 ? | Les **arbres y sont**, pas dans le traditionnel |
| Signe de $v_k$ ? | **NÉGATIF** |
| Pourquoi ? | Prix et taux sont **négativement reliés** |
| Le lien $v$-$\zeta$ ? | $v_i-v_{i+1}=\dfrac{\delta_iF_i\zeta_i}{1+\delta_iF_i}$ |
| Le drift du LMM ? | $\sum_{i=m(t)}^{k}\dfrac{\delta_iF_i\zeta_i\zeta_k}{1+\delta_iF_i}$ |
| Où commence la somme ? | À **$m(t)$** |
| Cas limite quand $\delta\to0$ ? | Le résultat **HJM** |
| La simplification de $\zeta$ ? | $\zeta_k(t)=\Lambda_{k-m(t)}$ |
| Sa nature ? | Une **fonction ESCALIER** |
| Lien avec les caplets ? | $\sigma_k^2t_k=\sum_{i=1}^{k}\Lambda_{k-i}^2\delta_{i-1}$ |
| Comment obtenir les $\Lambda$ ? | **ITÉRATIVEMENT** |
| Ex. 31.1 : $\Lambda_0$ ? | **24 %** |
| $\Lambda_1$ ? | **19,80 %** |
| $\Lambda_2$ ? | **15,23 %** |
| Table 31.1 : $\Lambda$ maximal ? | **20,64 %** (année 2) |
| Comparaison des bosses ? | Celle des $\Lambda$ est **PLUS PRONONCÉE** |
| L'approximation de drift ? | $F_i(t)=F_i(t_j)$ sur chaque période |
| Son verdict ? | **INOFFENSIVE** |
| L'exception ? | Volatilités de caps **très élevées** |
| Ce qui raccourcit dans la simulation ? | La **courbe zéro** |
| Exemple : 10 ans, au point 6 ans ? | Il reste une courbe à **4 ans** |
| Cap ratchet ? | $K_{j+1}=R_j+s$ |
| Cap sticky ? | $K_{j+1}=\min(R_j,K_j)+s$ |
| Flexi cap ? | **Limite** sur le nombre de caplets exerçables |
| Flexi cap 1/2/3 facteurs ? | **3,43 · 3,58 · 3,61** |
| Nombre de simulations des tables ? | **100 000**, avec **variables antithétiques** |
| Erreur type ? | Environ **0,001** |
| Cap vanille et nombre de facteurs ? | **INDÉPENDANT** |
| Pourquoi ? | Un **SEUL** taux forward intervient |
| Caps exotiques ? | **DÉPENDANTS** — loi **JOINTE** |
| Volatilité de swap dans le LMM ? | La formule **(31.18)** |
| Si les périodes diffèrent ? | La formule **(31.19)** |
| Le décalage américain ? | Caps **trimestriels**, swaps **semestriels** |
| Verdict sur ces formules ? | **Très proches** de Monte-Carlo |
| Leur usage ? | Valoriser **vite** et **calibrer** |
| Les $\Lambda$ viennent de ? | **Données de marché courantes** |
| Le découpage en $\lambda$ vient de ? | **Données HISTORIQUES** |
| Par quelle méthode ? | Une **ACP** |
| Si $p=M$ ? | $\lambda_{j,q}=\alpha_{j,q}s_q$ |
| Si $p<M$ ? | Il faut **RENORMALISER** par (31.20) |
| Pourquoi ne pas utiliser (31.11) ? | **Oscillations sauvages**, parfois **aucune** solution |
| L'objectif de calibration ? | $\sum(U_i-V_i)^2+P$ |
| L'algorithme ? | **Levenberg-Marquardt** |
| Skew de volatilité de caps ? | Volatilité **décroissante** en strike |
| Le modèle qui le traite ? | Le **CEV** avec $0<\alpha<1$ |
| Loi de valorisation ? | Le **khi-deux NON CENTRÉ** |
| Swaption bermudienne ? | Exerçable à **plusieurs dates** du swap |
| Pourquoi difficile en LMM ? | **Monte-Carlo** + **exercice anticipé** |
| Remède 1 ? | **Longstaff-Schwartz** (moindres carrés) |
| Remède 2 ? | La **frontière d'exercice paramétrée** (Andersen) |
| Sur quoi la frontière repose-t-elle ? | La **valeur INTRINSÈQUE** de l'option |
| Ce que font les traders ? | Un modèle à **UN facteur** du ch. 30 |
| Est-ce consensuel ? | **NON** — question **controversée** |
| MBS d'agence : garanti par ? | **GNMA** ou **FNMA** |
| Contre quoi ? | Les **DÉFAUTS** |
| La différence critique ? | Les **PRIVILÈGES DE PRÉPAIEMENT** |
| L'option du propriétaire ? | Un **PUT AMÉRICAIN à 30 ANS** à la **valeur faciale** |
| Deux raisons de prépaiement ? | **Refinancement** · **vente de la maison** |
| Fonction de prépaiement ? | Prépaiements attendus **en fonction de la courbe** |
| Fiable pour un crédit unique ? | **TRÈS PEU** |
| Sur un pool ? | Oui — **loi des grands nombres** |
| Quand les prépaiements sont-ils plus probables ? | Quand les **TAUX SONT BAS** |
| La conséquence ? | Les investisseurs exigent un taux **PLUS ÉLEVÉ** |
| Pass-through ? | **Même rendement, même risque** pour tous |
| CMO ? | Des **classes** avec des règles de canalisation du principal |
| Analogie avec l'ABS ? | Risque de **PRÉPAIEMENT** au lieu de **CRÉDIT** |
| Qui porte le plus de risque ? | La **classe A** |
| Qui dure le plus longtemps ? | La **classe C** |
| 400/300/100 : la classe C ? | Porte **TRÈS PEU** de risque |
| 100/200/500 : la classe C ? | Porte **BEAUCOUP PLUS** |
| Stripped MBS ? | Principal et intérêts **séparés** |
| PO ? | Reçoit le **PRINCIPAL** |
| IO ? | Reçoit les **INTÉRÊTS** |
| Prépaiements ↑ : le PO ? | **PLUS précieux** |
| Prépaiements ↑ : l'IO ? | **MOINS précieux** |
| Incertain sur un PO ? | Le **TIMING** |
| Incertain sur un IO ? | Le **TOTAL** des flux |
| Valorisation d'un MBS ? | **Monte-Carlo**, mois par mois |
| Quels modèles ? | **HJM** ou **LMM** |
| Pourquoi ? | Ils sont **fortement dépendants du chemin** |
| Ce qu'on utilise chaque mois ? | La courbe courante **ET l'HISTORIQUE** |
| Qu'est-ce que l'OAS ? | Le **spread sur les rendements d'ÉTAT**, options incluses |
| Quelle courbe pour le calculer ? | Celle des **obligations d'ÉTAT** |
| Que cherche-t-on ? | Le **déplacement PARALLÈLE** qui égalise les prix |
| Exemple : essai 1 ? | $60\times\frac{1{,}27}{2{,}07}=\mathbf{36{,}81}$ pb |
| Essai 2 ? | $36{,}81\times\frac{1{,}27}{1{,}32}=\mathbf{35{,}41}$ pb |
