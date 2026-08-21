# Fiche 53 — Modélisation de la volatilité : historique, brownien, sauts, ARCH et GARCH

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | Kempthorne, *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 9 « Volatility Modeling » |
| **Difficulté** | Must know — la variable centrale de la gestion des risques |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 50 (moindres carrés, maximum de vraisemblance), fiche 52 (ARMA, stationnarité, AIC/BIC) |
| **Concepts clés** | Volatilité annualisée, moyennes mobiles exponentielles, RiskMetrics, mouvement brownien géométrique, estimateur de Garman-Klass, efficacité relative, diffusion à sauts de Poisson, ARCH, test du multiplicateur de Lagrange, GARCH, variance de long terme, faits stylisés |
| **Poids à l'examen** | Trois résultats : la **loi des log-rendements** sous le brownien géométrique (attention au $-\sigma^2/2$), l'**équivalence GARCH(1,1) ⟺ ARMA(1,1)** en $\varepsilon_t^2$, et la **variance de long terme** $\alpha_0/(1-\alpha_1-\beta_1)$. |

## 🎯 Vue d'ensemble

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition de base.</span>

La volatilité est l'**écart-type annualisé de la variation du prix** ou de la valeur d'un titre financier.

</div>

**Les approches d'estimation et de prédiction listées par le cours :**

- Mesures de volatilité **historique** ou empirique
- Modèle de **mouvement brownien géométrique**
- Modèle de **diffusion à sauts de Poisson**
- Modèles **ARCH / GARCH**
- Modèles à **volatilité stochastique (SV)**
- Volatilité **implicite** issue des options et dérivés

```
HISTORIQUE     σ̂ à partir des rendements passés — simple, mais lent à réagir
GBM            dS/S = μ dt + σ dW — σ constante, l'hypothèse de Black-Scholes
GARMAN-KLASS   exploiter haut/bas/ouverture : jusqu'à 8× plus efficace
SAUTS          + Z(t) dπ(t) — pour les krachs que le brownien ne produit jamais
ARCH/GARCH     σ_t² dépend du passé — la volatilité devient PRÉVISIBLE
```

> **Le fil directeur du chapitre.** On part d'une volatilité **constante** (GBM), puis on découvre que les données la contredisent — la volatilité **se regroupe** dans le temps — et l'on construit des modèles où $\sigma_t^2$ est **une fonction déterministe du passé observable**. C'est l'idée d'Engle (1982), qui lui a valu le prix Nobel.

## 🟡 Concept 1 — La volatilité historique

**Le calcul.** On dispose des prix d'un actif en $(T+1)$ instants, $\{P_t,\ t=0,1,\dots,T\}$, d'où $T$ rendements

$$R_t=\log(P_t/P_{t-1}), \qquad t=1,2,\dots,T$$

On suppose $\{R_t\}$ **stationnaire en covariance**, avec

$$\sigma^2=\mathrm{var}(R_t)=E\big[(R_t-E[R_t])^2\big]$$

et l'on estime

$$\hat\sigma^2=\frac{1}{T-1}\sum_{t=1}^T(R_t-\bar R)^2, \qquad \bar R=\frac1T\sum_{t=1}^TR_t$$

**L'annualisation.**

$$\mathrm{vol}=\begin{cases}\sqrt{252}\,\hat\sigma & \text{(prix quotidiens, 252 jours ouvrés par an)}\\[3pt] \sqrt{52}\,\hat\sigma & \text{(prix hebdomadaires)}\\[3pt] \sqrt{12}\,\hat\sigma & \text{(prix mensuels)}\end{cases}$$

⚠️ **Pourquoi une racine carrée ?** Parce que sous indépendance des rendements les **variances** s'additionnent : $\mathrm{var}(\sum_{t=1}^{252}R_t)=252\sigma^2$, donc l'écart-type est multiplié par $\sqrt{252}$. La règle « en racine du temps » n'est valable que **sous indépendance** — dès qu'il y a autocorrélation des rendements, elle est fausse.

⚠️ **Pourquoi les log-rendements et non les rendements arithmétiques ?** Parce qu'ils sont **additifs** dans le temps : $\log(P_T/P_0)=\sum_t\log(P_t/P_{t-1})$. C'est ce qui rend l'agrégation temporelle exacte.

## 🟠 Concept 2 — Prédire la volatilité à partir de son historique

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Pour une période $t$, on définit la **volatilité empirique** $\hat\sigma_t$ = écart-type empirique des rendements de la période $t$.

</div>

- Si $t$ indexe des **mois** avec des données quotidiennes, $\hat\sigma_t$ est l'écart-type empirique des rendements quotidiens du mois $t$.
- Si $t$ indexe des **jours** avec des données quotidiennes, alors $\hat\sigma_t^2=R_t^2$.
- Avec des données **haute fréquence**, $\hat\sigma_t$ quotidien s'obtient en **cumulant les carrés des rendements intra-journaliers**.

⚠️ **La deuxième ligne mérite qu'on s'y arrête.** Avec une seule observation par période, le « carré du rendement » *est* l'estimateur de la variance. Il est **sans biais** mais extraordinairement **bruité** — sa variance vaut $2\sigma^4$. C'est exactement pourquoi les données intra-journalières valent de l'or : elles réduisent ce bruit d'un facteur égal au nombre de sous-périodes.

**Les prédicteurs.**

| Méthode | Formule | Données utilisées |
|---|---|---|
| **Moyenne historique** | $\tilde\sigma_{t+1}^2=\dfrac1t\sum_{j=1}^t\hat\sigma_j^2$ | toutes les données disponibles |
| **Moyenne mobile simple** | $\tilde\sigma_{t+1}^2=\dfrac1m\sum_{j=0}^{m-1}\hat\sigma_{t-j}^2$ | les $m$ dernières estimations |
| **Moyenne mobile exponentielle** | $\tilde\sigma_{t+1}^2=(1-\beta)\hat\sigma_t^2+\beta\tilde\sigma_t^2$, $0\leq\beta\leq1$ | toutes les données disponibles |
| **Moyenne mobile exponentielle pondérée** | $\tilde\sigma_{t+1}^2=\Big(\sum_{j=0}^{m-1}\beta^j\hat\sigma_{t-j}^2\Big)\Big/\Big(\sum_{j=0}^{m-1}\beta^j\Big)$ | les $m$ dernières |

> **La moyenne mobile exponentielle est la forme la plus utilisée.** Elle est **récursive** — un seul nombre à stocker — et donne un poids $\beta^j$ à l'observation d'il y a $j$ périodes : la mémoire décroît géométriquement. Le paramètre $\beta$ règle l'arbitrage entre réactivité ($\beta$ petit) et stabilité ($\beta$ grand).

**Régression simple.**

$$\tilde\sigma_{t+1}^2=\gamma_{1,t}\hat\sigma_t^2+\gamma_{2,t}\hat\sigma_{t-1}^2+\cdots+\gamma_{p,t}\hat\sigma_{t-p+1}^2+u_t$$

*La régression peut être ajustée sur toutes les données, ou sur les $m$ dernières (fenêtres glissantes). Note : similaire mais différente d'un modèle autorégressif de $\hat\sigma_t^2$.*

> **La nuance signalée par le cours.** Dans une AR, la variable expliquée et les régresseurs sont **le même processus**. Ici la variable expliquée est la **prévision** $\tilde\sigma_{t+1}^2$ et les régresseurs des **estimations empiriques** $\hat\sigma_{t-j}^2$ — deux objets distincts, dont les coefficients $\gamma_{j,t}$ peuvent en outre varier avec $t$.

**Les arbitrages.**

- Utiliser **plus de données** pour augmenter la **précision** des estimateurs.
- Utiliser des données **plus proches de $t$** pour estimer $\sigma_t$.

> **C'est un arbitrage biais-variance pur.** Plus de données réduisent la variance mais font entrer des régimes de volatilité anciens — donc du biais. La fenêtre optimale dépend de la vitesse à laquelle la volatilité change.

**L'évaluation** se fait **hors échantillon** : distinguer les actifs et les classes d'actifs, considérer différentes fréquences d'échantillonnage et différents horizons de prévision, et appliquer des mesures de performance (MSE, MAE, MAPE, etc.). **Méthodologie de référence : RiskMetrics.**

## 🔴 Concept 3 — Le mouvement brownien géométrique

**Le modèle.** Pour $\{S(t)\}$ le prix d'un titre ou d'un portefeuille au temps $t$ :

$$\boxed{\ dS(t)=\mu S(t)\,dt+\sigma S(t)\,dW(t)\ }$$

où $\sigma$ est la **volatilité** du processus de prix, $\mu$ le **rendement moyen** par unité de temps, $dS(t)$ l'incrément infinitésimal de prix et $dW(t)$ l'incrément infinitésimal d'un **mouvement brownien standard** (processus de Wiener).

**Les propriétés du processus de Wiener.**

- Les incréments $[W(t')-W(t)]$ sont **gaussiens**, de moyenne nulle et de variance $(t'-t)$.
- Les incréments sur des **intervalles disjoints sont indépendants** : pour $t_1<t_2<t_3<t_4$, $[W(t_2)-W(t_1)]$ et $[W(t_4)-W(t_3)]$ sont indépendants.

**Les données du processus.** Prix $\{S(t),\ t=t_0,t_1,\dots,t_n\}$, rendements

$$R_j=\log\big[S(t_j)/S(t_{j-1})\big], \qquad j=1,\dots,n$$

> **Résultat.** Les $R_j$ sont des variables aléatoires **indépendantes** avec
>
> $$R_j\sim N\big(\mu^\ast\tau_j,\ \sigma^2\tau_j\big), \qquad \tau_j=(t_j-t_{j-1}), \qquad \boxed{\ \mu^\ast=\mu-\sigma^2/2\ }$$
>
> *($\{\log S(t)\}$ est un mouvement brownien de dérive $\mu^\ast$ et de volatilité $\sigma^2$.)*

⚠️ **Le terme $-\sigma^2/2$ est l'erreur classique du chapitre.** Le prix a un rendement espéré $\mu$, mais son **logarithme** dérive à $\mu-\sigma^2/2$. La raison est l'inégalité de Jensen : $\log$ est concave, donc $E[\log S]<\log E[S]$, et l'écart est exactement $\sigma^2/2$ par unité de temps. Conséquence économique : **plus la volatilité est forte, plus la médiane du prix futur est basse à rendement espéré fixé**.

**Estimation par maximum de vraisemblance.** Si $\tau_j\equiv1$ :

$$\hat\mu^\ast=\bar R=\frac1n\sum_{t=1}^nR_t, \qquad \hat\sigma^2=\frac1n\sum_{t=1}^n(R_t-\bar R)^2$$

*Si $\tau_j$ varie… exercice.*

⚠️ **Noter le diviseur $n$ et non $n-1$** : ce sont les estimateurs du **maximum de vraisemblance**, donc biaisés pour $\sigma^2$ — exactement comme dans la fiche 50.

## 🟠 Concept 4 — L'estimateur de Garman-Klass

**L'idée.** *On dispose de plus d'information que les seuls prix de clôture : on a aussi le **plus haut**, le **plus bas** et l'**ouverture** de la période.* On suppose $\mu=0$, $\tau_j\equiv1$ (par exemple quotidien), et l'on note $f\in(0,1)$ la **fraction de la journée précédant l'ouverture du marché** :

$$C_j=\log[S(t_j)], \quad O_j=\log[S(t_{j-1}+f)], \quad H_j=\max_{t_{j-1}+f\leq t\leq t_j}\log[S(t)], \quad L_j=\min_{t_{j-1}+f\leq t\leq t_j}\log[S(t)]$$

**Les estimateurs élémentaires (données de la première période).**

| Estimateur | Formule | Espérance | Variance |
|---|---|---|---|
| $\hat\sigma_0^2$ — clôture à clôture | $(C_1-C_0)^2$ | $\sigma^2$ | $2(\sigma^2)^2=2\sigma^4$ |
| $\hat\sigma_1^2$ — clôture à ouverture | $\dfrac{(O_1-C_0)^2}{f}$ | $\sigma^2$ | $2\sigma^4$ |
| $\hat\sigma_2^2$ — ouverture à clôture | $\dfrac{(C_1-O_1)^2}{1-f}$ | $\sigma^2$ | $2\sigma^4$ |

*Note : $\hat\sigma_1^2$ et $\hat\sigma_2^2$ sont **indépendants** !* On peut donc les combiner :

$$\hat\sigma^2=\tfrac12\hat\sigma_1^2+\tfrac12\hat\sigma_2^2, \qquad E[\hat\sigma^2]=\sigma^2, \qquad \mathrm{var}[\hat\sigma^2]=\sigma^4$$

d'où l'**efficacité**

$$\mathrm{Eff}(\hat\sigma^2)=\frac{\mathrm{var}(\hat\sigma_0^2)}{\mathrm{var}(\hat\sigma^2)}=2$$

> **La logique de tout le concept.** L'indépendance permet de **moyenner** deux estimateurs sans biais, ce qui **divise la variance par deux** — pour exactement le même échantillon de prix. On n'a rien ajouté comme données : on a seulement mieux exploité celles qu'on avait.

**Les raffinements successifs.**

| Estimateur | Formule | Efficacité |
|---|---|---|
| **Parkinson (1976)**, $f=0$ | $\hat\sigma_3^2=\dfrac{(H_1-L_1)^2}{4\log2}$ | $\approx5{,}2$ |
| **Garman et Klass (1980)**, tout $0<f<1$ | $\hat\sigma_4^2=a\cdot\hat\sigma_1^2+(1-a)\hat\sigma_3^2$, variance minimale pour $a\approx0{,}17$ (indépendant de $f$) | $\approx6{,}2$ |
| **Meilleur estimateur analytique invariant d'échelle** | $\hat\sigma^2=0{,}511(u_1-d_1)^2-0{,}019\{c_1(u_1+d_1)-2u_1d_1\}-0{,}383c_1^2$ | $\approx7{,}4$ |
| **Estimateur composite** ($0<f<1$) | $\hat\sigma_{GK}^2=a\dfrac{(O_1-C_0)^2}{f}+(1-a)\dfrac{\hat\sigma^2_{\text{analytique}}}{1-f}$, variance minimale pour $a=0{,}12$ | $\approx8{,}4$ |

où les valeurs haut / bas / clôture **normalisées** sont

$$u_j=H_j-O_j, \qquad d_j=L_j-O_j, \qquad c_j=C_j-O_j$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que « efficacité $8{,}4$ » veut dire concrètement.</span>

Il faudrait **$8{,}4$ fois plus de jours** d'observation à l'estimateur clôture-à-clôture pour atteindre la même précision. Sur un an de données quotidiennes, c'est l'équivalent de plus de huit ans — sans rien changer aux données collectées. C'est un des meilleurs rapports gain/effort de toute la finance empirique.

</div>

⚠️ **Les hypothèses restent fortes** : $\mu=0$ (dérive négligeable, raisonnable en quotidien) et surtout un brownien **sans saut**. Les gaps d'ouverture et les cotations discrètes dégradent ces efficacités théoriques en pratique.

## 🟡 Concept 5 — Diffusions à sauts de Poisson

Pour $\{S(t)\}$ le processus de prix du titre ou du portefeuille au temps $t$ :

$$\frac{dS(t)}{S(t)}=\mu\,dt+\sigma\,dW(t)+\gamma\,Z(t)\,d\pi(t)$$

où

- $dS(t)$ = incrément infinitésimal de prix ;
- $\mu$ = rendement moyen par unité de temps ;
- $\sigma$ = **volatilité de diffusion** du processus de prix ;
- $dW(t)$ = incrément d'un processus de Wiener standard ;
- $d\pi(t)$ = incrément d'un **processus de Poisson d'intensité $\lambda$**, modélisant le processus de sauts ;
- $\gamma\cdot Z(t)$ = **amplitude** du saut de rendement, avec $Z(t)$ i.i.d. $N(0,1)$ et $\gamma$ l'**échelle** des amplitudes de saut.

**Estimation par maximum de vraisemblance.**

- Le modèle est un **mélange poissonien de lois gaussiennes**.
- La fonction génératrice des moments se dérive comme celle d'une **somme aléatoire de variables indépendantes**.
- La fonction de vraisemblance est un **produit de sommes infinies**.
- L'**algorithme EM** s'exprime sous forme close : les **sauts sont traités comme des variables latentes**, ce qui simplifie les calculs, et l'algorithme fournit des estimations *a posteriori* du **nombre de sauts par période**.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ajouter des sauts.</span>

Un brownien géométrique ne produit **jamais** de krach : ses trajectoires sont continues, et un mouvement de $-20\,\%$ en une séance a une probabilité astronomiquement nulle sous $\sigma$ réaliste. Les sauts de Poisson introduisent des **discontinuités** et, du même coup, des **queues épaisses** — le fait stylisé du concept 9.

</div>

⚠️ **L'astuce de l'EM mérite d'être comprise.** La vraisemblance directe est un produit de sommes infinies sur le nombre de sauts — impraticable. En traitant le nombre de sauts comme une **donnée manquante**, chaque étape M devient une simple estimation gaussienne pondérée. C'est le même principe que pour les mélanges gaussiens en général.

## 🔴 Concept 6 — Les modèles ARCH

Les modèles ARCH sont spécifiés relativement au processus en **temps discret** du prix, $\{S_t,\ t=1,2,\dots\}$. **Engle (1982)** modélise les rendements discrets $y_t=\log(S_t/S_{t-1})$ par

$$y_t=\mu_t+\varepsilon_t$$

où $\mu_t$ est le rendement moyen **conditionnel à $\mathcal F_{t-1}$**, l'information disponible jusqu'au temps $(t-1)$, et

$$\varepsilon_t=Z_t\cdot\sigma_t, \qquad Z_t \text{ i.i.d. avec } E[Z_t]=0,\ \mathrm{var}[Z_t]=1$$

$$\boxed{\ \sigma_t^2=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\alpha_2\varepsilon_{t-2}^2+\cdots+\alpha_p\varepsilon_{t-p}^2\ }$$

**Contraintes de paramètres :** $\alpha_j\geq0$, $j=0,1,\dots,p$.

$\sigma_t^2=\mathrm{var}(R_t\mid\mathcal F_{t-1})$ est l'**hétéroscédasticité conditionnelle** des rendements.

> **Lisez bien la structure.** $\sigma_t^2$ n'est **pas** aléatoire conditionnellement au passé : c'est une **fonction déterministe** des chocs passés observés. Toute la nouveauté d'Engle tient là — la variance devient **prévisible** sans cesser d'être une variance conditionnelle. Et les contraintes $\alpha_j\geq0$ sont là pour une raison élémentaire : une variance doit rester positive.

### L'équivalence avec un modèle AR

Le modèle ARCH implique un **modèle AR en $\varepsilon_t^2$**. On ajoute $(\varepsilon_t^2-\sigma_t^2)=u_t$ des deux côtés :

$$\varepsilon_t^2=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\alpha_2\varepsilon_{t-2}^2+\cdots+\alpha_p\varepsilon_{t-p}^2+u_t$$

où

$$E[u_t\mid\mathcal F_t]=0 \qquad\text{et}\qquad \mathrm{var}[u_t\mid\mathcal F_t]=\mathrm{var}(\varepsilon_t^2)=2\sigma_t^4$$

> **C'est le pont avec la fiche 52.** Un ARCH($p$) **est** une AR($p$) — non pas sur les rendements, mais sur leurs **carrés**. Tous les outils du chapitre précédent (racines du polynôme caractéristique, stationnarité, Yule-Walker) se transposent directement.

### Le test du multiplicateur de Lagrange

$$H_0:\ \alpha_1=\alpha_2=\cdots=\alpha_p=0$$

1. Ajuster une **régression linéaire sur les résidus au carré** $\hat\varepsilon_t=y_t-\hat\mu_t$ — c'est-à-dire ajuster un modèle **AR($p$)** à $[\hat\varepsilon_t^2]$, $t=1,\dots,n$.
2. La **statistique LM** vaut $nR^2$, où $R^2$ est le coefficient de détermination du modèle AR($p$) ajusté.
3. Sous $H_0$, la variable aléatoire $nR^2$ suit approximativement une loi $\chi^2$ à $p$ degrés de liberté.

> *Note : les estimations des paramètres par régression linéaire **ne sont pas** les EMV sous hypothèses gaussiennes ; elles correspondent à des estimations de **quasi-maximum de vraisemblance (QMLE)**.*

⚠️ **$H_0$ signifie « pas d'effet ARCH », donc volatilité conditionnelle constante.** Rejeter $H_0$, c'est établir la présence de **regroupement de volatilité**. Sur des rendements financiers quotidiens, ce test rejette presque toujours — et de façon spectaculaire.

### Estimation par maximum de vraisemblance

**Modèle ARCH.** $y_t=c+\varepsilon_t$, $\varepsilon_t=z_t\sigma_t$, $\sigma_t^2=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\cdots+\alpha_p\varepsilon_{t-p}^2$, $t=0,1,\dots,T$.

**Vraisemblance.**

$$L(c,\alpha)=p(y_1,\dots,y_n\mid c,\alpha_0,\alpha_1,\dots,\alpha_p)=\prod_{t=1}^np(y_t\mid\mathcal F_{t-1},c,\alpha)=\prod_{t=1}^n\left[\frac{1}{\sqrt{2\pi\sigma_t^2}}\exp\left(\frac{-1}{2}\frac{\varepsilon_t^2}{\sigma_t^2}\right)\right]$$

où $\varepsilon_t=y_t-c$ et $\sigma_t^2=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\cdots+\alpha_p\varepsilon_{t-p}^2$.

**Contraintes.** $\alpha_i\geq0$ pour $i=1,\dots,p$, et $(\alpha_1+\cdots+\alpha_p)<1$.

> **La factorisation $\prod_tp(y_t\mid\mathcal F_{t-1})$ est ce qui rend le calcul possible.** C'est la **décomposition en erreurs de prédiction** déjà vue en fiche 52 : chaque facteur est une densité gaussienne **univariée** de variance $\sigma_t^2$, calculable récursivement. On n'a jamais à inverser une matrice de covariance $T\times T$.

## 🔴 Concept 7 — Les modèles GARCH

**Bollerslev (1986)** étend les modèles ARCH :

> **Modèle GARCH($p,q$).**
>
> $$\sigma_t^2=\alpha_0+\sum_{i=1}^p\alpha_i\varepsilon_{t-i}^2+\sum_{j=1}^q\beta_j\sigma_{t-j}^2$$
>
> **Contraintes :** $\alpha_i\geq0\ \forall i$, et $\beta_j\geq0\ \forall j$.

> **Modèle GARCH(1,1).**
>
> $$\boxed{\ \sigma_t^2=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\beta_1\sigma_{t-1}^2\ }$$
>
> **Parcimonieux** · **s'ajuste à de nombreuses séries financières**

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi GARCH(1,1) suffit presque toujours.</span>

Le terme $\beta_1\sigma_{t-1}^2$ résume **tout** le passé : en développant récursivement, $\sigma_t^2=\frac{\alpha_0}{1-\beta_1}+\alpha_1\sum_{k\geq0}\beta_1^k\varepsilon_{t-1-k}^2$. Autrement dit, **GARCH(1,1) est un ARCH($\infty$) à poids géométriques**, avec trois paramètres seulement. C'est exactement le mouvement AR/MA de la fiche 52, transposé aux carrés.

</div>

### L'équivalence avec un ARMA(1,1)

Le GARCH(1,1) implique un modèle **ARMA** en $\varepsilon_t^2$. On élimine $\sigma_t^2$ à l'aide de $(\varepsilon_t^2-\sigma_t^2)=u_t$ :

$$\varepsilon_t^2-u_t=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\beta_1(\varepsilon_{t-1}^2-u_{t-1})$$

$$\boxed{\ \varepsilon_t^2=\alpha_0+(\alpha_1+\beta_1)\varepsilon_{t-1}^2+u_t-\beta_1u_{t-1}\ }$$

où $E[u_t\mid\mathcal F_t]=0$ et $\mathrm{var}[u_t\mid\mathcal F_t]=\mathrm{var}(\varepsilon_t^2)=2\sigma_t^4$.

> **GARCH(1,1) implique donc un ARMA(1,1)** en $\varepsilon_t^2$, avec $u_t=(\varepsilon_t^2-\sigma_t^2)\sim WN(0,2\sigma^4)$.

**Stationnarité.** Elle se déduit du modèle ARMA. En écrivant $A(L)\varepsilon_t^2=B(L)u_t$, soit $\varepsilon_t^2=[A(L)]^{-1}B(L)u_t$, le processus est **stationnaire en covariance** si les racines de $A(z)$ sont hors de $\{\lvert z\rvert\leq1\}$, c'est-à-dire

$$\lvert\alpha_1+\beta_1\rvert<1$$

**Volatilité inconditionnelle / variance de long terme.** Pour GARCH(1,1), en supposant la stationnarité $0<(\alpha_1+\beta_1)<1$ :

$$\sigma^2=\alpha_0+(\alpha_1+\beta_1)\sigma^2 \qquad\Longrightarrow\qquad \boxed{\ \sigma^2=\frac{\alpha_0}{1-\alpha_1-\beta_1}\ }$$

**Le cas général.** GARCH($p,q$) implique un modèle **ARMA($\max(p,q),q$)**, stationnaire si

$$0<\Big(\sum_{i=1}^p\alpha_i+\sum_{j=1}^q\beta_j\Big)<1$$

et de variance de long terme

$$\sigma^2=\frac{\alpha_0}{1-\sum_{i=1}^{\max(p,q)}(\alpha_i+\beta_i)}$$

⚠️ **La somme $\alpha_1+\beta_1$ est le nombre à regarder en premier sur une sortie de logiciel.** Sur des séries financières réelles elle vaut typiquement $0{,}95$–$0{,}99$ : la volatilité est **très persistante**, le retour à la moyenne est lent. Si l'estimation donne $\alpha_1+\beta_1\geq1$, le modèle n'est **pas stationnaire** et la variance de long terme n'existe pas — c'est le cas limite IGARCH, qui est précisément ce que fait la méthodologie RiskMetrics avec $\alpha_0=0$ et $\alpha_1+\beta_1=1$.

### Estimation par maximum de vraisemblance

**Modèle GARCH.** $y_t=c+\varepsilon_t$, $\varepsilon_t=z_t\sigma_t$, $\sigma_t^2=\alpha_0+\sum_{i=1}^p\alpha_i\varepsilon_{t-i}^2+\sum_{j=1}^q\beta_j\sigma_{t-j}^2$.

**Vraisemblance.**

$$L(c,\alpha,\beta)=\prod_{t=1}^Tp(y_t\mid\mathcal F_{t-1},c,\alpha,\beta)=\prod_{t=1}^T\left[\frac{1}{\sqrt{2\pi\sigma_t^2}}\exp\left(\frac{-1}{2}\frac{\varepsilon_t^2}{\sigma_t^2}\right)\right]$$

avec $\varepsilon_t=y_t-c$.

**Contraintes.** $\alpha_i\geq0\ \forall i$, $\beta_j\geq0\ \forall j$, et $0<\big(\sum_{i=1}^p\alpha_i+\sum_{j=1}^q\beta_j\big)<1$.

## 🟡 Concept 8 — Estimation, évaluation et sélection

**Les sorties de l'estimation.** Estimations du maximum de vraisemblance $\hat c$, $\hat\alpha$, $\hat\beta$, d'où $\hat\varepsilon_t$ et $\hat\sigma_t^2$ pour $t=T,T-1,\dots$

**Les diagnostics.**

- **Résidus standardisés** $\hat\varepsilon_t/\hat\sigma_t$ : *devraient être non corrélés*.
- **Résidus standardisés au carré** $(\hat\varepsilon_t/\hat\sigma_t)^2$ : *devraient être non corrélés*.

> **Les deux diagnostics testent deux choses différentes.** Le premier vérifie qu'il ne reste pas de structure dans la **moyenne** ; le second, qu'il n'en reste pas dans la **variance** — c'est-à-dire que le modèle GARCH a bien absorbé tout le regroupement de volatilité. C'est le second qui compte ici : c'est la raison d'être du modèle.

**Tests de normalité des résidus.** Diagrammes quantile-quantile normaux · test de **Jarque-Bera** · test de **Shapiro-Wilk** · test d'adéquation par les **percentiles de l'EMV** · test d'adéquation de **Kolmogorov-Smirnov**.

**Sélection de modèle.** On applique les critères de sélection : **AIC** (critère d'information d'Akaike) et **BIC** (critère d'information bayésien) — voir la fiche 52 pour leurs formules et leur arbitrage.

⚠️ **Un résultat très fréquent en pratique.** Même après un bon ajustement GARCH, les résidus standardisés **restent non gaussiens** : les tests de normalité rejettent. Le GARCH explique une partie des queues épaisses, pas toutes. La réponse usuelle est de remplacer la loi de $Z_t$ par une **loi de Student** à faible nombre de degrés de liberté.

## 🔴 Concept 9 — Les faits stylisés des rendements et de la volatilité

### 1. Regroupement de volatilité (*volatility clustering*)

$$\text{Les grands } \varepsilon_t^2 \text{ suivent les grands } \varepsilon_{t-1}^2 \qquad \text{Les petits } \varepsilon_t^2 \text{ suivent les petits } \varepsilon_{t-1}^2$$

> Les modèles GARCH peuvent **prescrire** que les grands $\sigma_t^2$ suivent les grands $\sigma_{t-1}^2$, et les petits $\sigma_t^2$ les petits $\sigma_{t-1}^2$.

### 2. Queues épaisses (*heavy tails / fat tails*)

*La distribution des rendements a des queues plus épaisses (**kurtosis plus élevée**) que la gaussienne.*

> Les modèles GARCH($p,q$) sont un **mélange stochastique de lois gaussiennes**, de kurtosis plus élevée. — Engle, Bollerslev et Nelson (1994)

⚠️ **C'est un point conceptuel important.** Chaque rendement est gaussien **conditionnellement** à $\sigma_t^2$, mais la loi **inconditionnelle** — le mélange sur toutes les valeurs possibles de $\sigma_t^2$ — a des queues plus épaisses qu'une gaussienne. Un mélange de gaussiennes de variances différentes est toujours leptokurtique. Le GARCH produit donc les queues épaisses **sans jamais poser d'hypothèse non gaussienne**.

### 3. Retour à la moyenne de la volatilité

**Modèle GARCH(1,1).** Volatilité moyenne de long terme :

$$\sigma^2=\frac{\alpha_0}{1-\alpha_1-\beta_1}$$

En partant de

$$\varepsilon_t^2=\alpha_0+(\alpha_1+\beta_1)\varepsilon_{t-1}^2+u_t-\beta_1u_{t-1}$$

et en substituant $\alpha_0=(1-\alpha_1-\beta_1)\sigma^2$ :

$$\boxed{\ (\varepsilon_t^2-\sigma^2)=(\alpha_1+\beta_1)(\varepsilon_{t-1}^2-\sigma^2)+u_t-\beta_1u_{t-1}\ }$$

$$0<(\alpha_1+\beta_1)<1 \qquad\Longrightarrow\qquad \textbf{retour à la moyenne !}$$

> **C'est un processus d'Ornstein-Uhlenbeck étendu** pour $\sigma_t^2$ avec des erreurs **MA(1)**.

> **Le sens économique.** L'écart à la volatilité de long terme se contracte d'un facteur $(\alpha_1+\beta_1)$ à chaque période. Avec $\alpha_1+\beta_1=0{,}97$, la demi-vie d'un choc de volatilité est $\log(0{,}5)/\log(0{,}97)\approx23$ jours : après un krach, il faut environ un mois pour que la moitié de l'excès de volatilité se résorbe. C'est **exactement** l'AR(1) de la fiche 52, appliqué aux carrés — et l'on retrouve la même famille que le modèle de Vasicek pour les taux.

## Comment résoudre l'exercice type (protocole)

1. **Calculer les log-rendements** $R_t=\log(P_t/P_{t-1})$ et leur écart-type ; **annualiser** par $\sqrt{252}$, $\sqrt{52}$ ou $\sqrt{12}$.
2. **Estimer la moyenne conditionnelle** $\mu_t$ (souvent une constante $c$, parfois une AR courte) et récupérer $\hat\varepsilon_t=y_t-\hat\mu_t$.
3. **Tester l'effet ARCH** : ajuster une AR($p$) sur $\hat\varepsilon_t^2$, calculer $nR^2$ et comparer à $\chi^2_p$.
4. Si rejet, **ajuster un GARCH(1,1)** par maximum de vraisemblance sous les contraintes $\alpha_i,\beta_j\geq0$ et $\sum\alpha_i+\sum\beta_j<1$.
5. **Lire $\alpha_1+\beta_1$** : persistance et stationnarité ; en déduire $\sigma^2=\alpha_0/(1-\alpha_1-\beta_1)$ et la demi-vie des chocs.
6. **Diagnostiquer** : $\hat\varepsilon_t/\hat\sigma_t$ et $(\hat\varepsilon_t/\hat\sigma_t)^2$ non corrélés ; normalité par QQ-plot et Jarque-Bera.
7. **Sélectionner** entre spécifications concurrentes par AIC/BIC.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « volatilité annualisée » à partir de données quotidiennes | $\sqrt{252}\,\hat\sigma$ |
| « les périodes agitées succèdent aux périodes agitées » | **effet ARCH** ⟹ test LM, puis GARCH |
| « queues plus épaisses que la normale » | mélange de gaussiennes ⟹ **GARCH**, ou sauts de Poisson |
| « on dispose du haut, du bas et de l'ouverture » | **Garman-Klass** — gain d'efficacité jusqu'à $8{,}4$ |
| « krach en une séance » | le brownien continu ne peut pas ⟹ **diffusion à sauts** |
| « rendement espéré $\mu$ du prix » et loi du log | attention au $\mu-\sigma^2/2$ |
| « volatilité de long terme » | $\alpha_0/(1-\alpha_1-\beta_1)$ |
| « pondérer davantage le passé récent » | **moyenne mobile exponentielle** / RiskMetrics |

### Exercices progressifs

**Niveau 1** — Un GARCH(1,1) estimé donne $\alpha_0=0{,}00001$, $\alpha_1=0{,}08$, $\beta_1=0{,}90$. Le modèle est-il stationnaire ? Quelle est la volatilité annualisée de long terme ?

<details><summary>Correction</summary>

**Stationnarité.** $\alpha_1+\beta_1=0{,}08+0{,}90=0{,}98<1$ : le modèle **est stationnaire en covariance**, avec une persistance élevée.

**Variance de long terme.**

$$\sigma^2=\frac{\alpha_0}{1-\alpha_1-\beta_1}=\frac{0{,}00001}{1-0{,}98}=\frac{0{,}00001}{0{,}02}=0{,}0005$$

**Volatilité quotidienne.** $\sigma=\sqrt{0{,}0005}\approx0{,}0224$, soit $2{,}24\,\%$ par jour.

**Volatilité annualisée.** $\sqrt{252}\times0{,}0224\approx15{,}87\times0{,}0224\approx0{,}355$, soit environ **$35{,}5\,\%$ par an**.

**Bonus — la demi-vie des chocs.** $\log(0{,}5)/\log(0{,}98)\approx34$ jours : il faut environ sept semaines pour que la moitié d'un excès de volatilité se résorbe. C'est très lent, et c'est typique des marchés actions.

</details>

**Niveau 2** — Pourquoi le logarithme du prix dérive-t-il à $\mu-\sigma^2/2$ et non à $\mu$ ?

<details><summary>Correction</summary>

**Le fait.** Sous $dS/S=\mu\,dt+\sigma\,dW$, les log-rendements vérifient $R_j\sim N(\mu^\ast\tau_j,\ \sigma^2\tau_j)$ avec $\mu^\ast=\mu-\sigma^2/2$.

**La raison — l'inégalité de Jensen.** La fonction $\log$ est **strictement concave**, donc $E[\log X]<\log E[X]$ pour toute variable non dégénérée. L'écart est d'autant plus grand que $X$ est dispersée. Ici, l'écart par unité de temps vaut exactement $\sigma^2/2$.

**Le sens économique.** Le prix a bien un rendement **espéré** $\mu$, mais l'espérance est tirée vers le haut par des trajectoires rares et très favorables. La trajectoire **typique** — la médiane — croît moins vite, à $\mu-\sigma^2/2$.

**La conséquence pratique, qui surprend toujours.** Si $\sigma^2/2>\mu$, la médiane du prix **décroît** alors même que l'espérance croît. Pour $\mu=8\,\%$ et $\sigma=45\,\%$ : $\sigma^2/2=10{,}1\,\%>8\,\%$. L'actif a un rendement espéré positif, et pourtant plus d'une trajectoire sur deux perd de l'argent sur le long terme. C'est la « **volatility drag** », et c'est ce qui explique pourquoi les produits à effet de levier s'érodent.

</details>

**Niveau 3** — Montrez que GARCH(1,1) est un ARCH($\infty$) et dites ce que cela apporte.

<details><summary>Correction</summary>

**La substitution récursive.** Partant de $\sigma_t^2=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\beta_1\sigma_{t-1}^2$, on remplace $\sigma_{t-1}^2$ par sa propre expression, puis $\sigma_{t-2}^2$, etc. :

$$\sigma_t^2=\alpha_0(1+\beta_1+\beta_1^2+\cdots)+\alpha_1\big(\varepsilon_{t-1}^2+\beta_1\varepsilon_{t-2}^2+\beta_1^2\varepsilon_{t-3}^2+\cdots\big)$$

soit, si $\lvert\beta_1\rvert<1$,

$$\sigma_t^2=\frac{\alpha_0}{1-\beta_1}+\alpha_1\sum_{k=0}^\infty\beta_1^k\,\varepsilon_{t-1-k}^2$$

**C'est bien un ARCH($\infty$)** de coefficients $\alpha_1\beta_1^k$ — décroissance **géométrique** de la mémoire.

**Ce que cela apporte.**

1. **La parcimonie.** Trois paramètres $(\alpha_0,\alpha_1,\beta_1)$ engendrent une infinité de coefficients. Un ARCH pur aurait besoin de $p$ grand pour capter la même persistance, avec autant de paramètres à estimer et une contrainte de positivité à vérifier sur chacun.
2. **La récursivité.** $\sigma_t^2$ se calcule en une opération à partir de $\sigma_{t-1}^2$ : la vraisemblance s'évalue en $O(T)$.
3. **La forme de la mémoire.** La décroissance géométrique est empiriquement la bonne : l'influence d'un choc sur la volatilité s'estompe progressivement, pas brutalement au retard $p$.

**Le parallèle exact.** C'est le même mouvement que la fiche 52 : un MA fini est une AR infinie, et un AR fini est une MA infinie. Ici, $\beta_1$ joue le rôle du dénominateur $\phi(L)$ et transforme une somme finie en somme infinie à poids géométriques.

</details>

**Niveau 4 — type examen** — Expliquez comment le GARCH produit simultanément le regroupement de volatilité, les queues épaisses et le retour à la moyenne.

<details><summary>Correction</summary>

**1. Le regroupement de volatilité — par construction.** Le modèle pose

$$\sigma_t^2=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\beta_1\sigma_{t-1}^2$$

avec $\alpha_1,\beta_1\geq0$. Un grand choc $\varepsilon_{t-1}^2$ **augmente mécaniquement** $\sigma_t^2$, donc l'amplitude attendue du choc suivant. Les grands $\varepsilon_t^2$ suivent les grands $\varepsilon_{t-1}^2$, les petits suivent les petits. C'est l'effet visé, et il est direct.

**2. Les queues épaisses — par mélange, sans hypothèse non gaussienne.** Conditionnellement à $\mathcal F_{t-1}$, $\varepsilon_t=Z_t\sigma_t$ est **gaussien** de variance $\sigma_t^2$. Mais la loi **inconditionnelle** est un **mélange** de gaussiennes de variances différentes. Or tout mélange de gaussiennes centrées de variances distinctes est **leptokurtique** : par la loi de la variance totale,

$$\mathrm{Kurt}(\varepsilon_t)=3\cdot\frac{E[\sigma_t^4]}{\big(E[\sigma_t^2]\big)^2}\ \geq\ 3$$

avec égalité **seulement si** $\sigma_t^2$ est constante (Jensen). Dès qu'il y a de l'hétéroscédasticité conditionnelle, la kurtosis dépasse $3$. C'est le résultat d'Engle, Bollerslev et Nelson (1994) : *les modèles GARCH sont un mélange stochastique de lois gaussiennes, de kurtosis plus élevée*.

**3. Le retour à la moyenne — par la forme ARMA.** En posant $u_t=\varepsilon_t^2-\sigma_t^2$, le GARCH(1,1) s'écrit

$$\varepsilon_t^2=\alpha_0+(\alpha_1+\beta_1)\varepsilon_{t-1}^2+u_t-\beta_1u_{t-1}$$

un **ARMA(1,1)** de coefficient autorégressif $(\alpha_1+\beta_1)$. En substituant $\alpha_0=(1-\alpha_1-\beta_1)\sigma^2$ avec $\sigma^2=\alpha_0/(1-\alpha_1-\beta_1)$ :

$$(\varepsilon_t^2-\sigma^2)=(\alpha_1+\beta_1)(\varepsilon_{t-1}^2-\sigma^2)+u_t-\beta_1u_{t-1}$$

Quand $0<(\alpha_1+\beta_1)<1$, l'**écart à la variance de long terme se contracte** géométriquement : c'est un processus d'**Ornstein-Uhlenbeck étendu** avec erreurs MA(1).

**La synthèse — et c'est ce qu'il faut savoir dire.** Les trois faits stylisés ne sont **pas** trois hypothèses posées séparément : ils découlent tous de la **même** équation de récurrence à trois paramètres. Le regroupement vient des coefficients positifs, les queues épaisses du mélange que ce regroupement engendre, le retour à la moyenne de la contrainte $\alpha_1+\beta_1<1$. C'est cette économie de moyens qui explique le succès durable du GARCH(1,1).

**La limite qu'il faut mentionner.** Le modèle est **symétrique** en $\varepsilon_{t-1}$ : un choc de $-3\,\%$ et un choc de $+3\,\%$ produisent la même $\sigma_t^2$. Or les marchés actions présentent un **effet de levier** — les baisses augmentent la volatilité davantage que les hausses. D'où les extensions asymétriques (EGARCH de Nelson, GJR-GARCH), et les résidus standardisés qui restent non gaussiens même après un bon ajustement.

</details>

## 🔴 Common mistakes

1. **Oublier le $-\sigma^2/2$** dans la dérive du log-prix sous le brownien géométrique.
2. **Annualiser en multipliant par $252$ au lieu de $\sqrt{252}$** — ce sont les **variances** qui s'additionnent, pas les écarts-types.
3. **Appliquer la règle en racine du temps à des rendements autocorrélés** — elle suppose l'indépendance.
4. **Diviser par $n-1$ dans l'EMV du brownien géométrique** — l'estimateur du maximum de vraisemblance divise par $n$.
5. **Confondre $\sigma_t^2$ conditionnelle et $\sigma^2$ inconditionnelle** — la première varie dans le temps, la seconde vaut $\alpha_0/(1-\alpha_1-\beta_1)$.
6. **Oublier les contraintes de positivité** $\alpha_i\geq0$, $\beta_j\geq0$ — sans elles, $\sigma_t^2$ peut devenir négative.
7. **Ne pas vérifier $\sum\alpha_i+\sum\beta_j<1$** — sinon le processus n'est pas stationnaire et $\sigma^2$ n'existe pas.
8. **Croire que le GARCH suppose des rendements non gaussiens** — c'est l'inverse : il les suppose **conditionnellement** gaussiens et produit les queues épaisses par mélange.
9. **Prendre les estimations de la régression du test LM pour des EMV** — ce sont des **QMLE**.
10. **Croire qu'un brownien peut produire un krach** — ses trajectoires sont continues ; il faut des **sauts**.
11. **Utiliser Garman-Klass sans vérifier ses hypothèses** — $\mu=0$ et absence de sauts ; les gaps d'ouverture dégradent l'efficacité annoncée.

## 📌 Ultimate Review

1. **Volatilité** = écart-type **annualisé** de la variation de prix. Approches : historique · GBM · sauts de Poisson · ARCH/GARCH · volatilité stochastique · volatilité implicite.
2. **Historique** : $R_t=\log(P_t/P_{t-1})$, $\hat\sigma^2=\frac{1}{T-1}\sum(R_t-\bar R)^2$ ; annualisation par $\sqrt{252}$, $\sqrt{52}$, $\sqrt{12}$.
3. **Prédicteurs** : moyenne historique · moyenne mobile simple sur $m$ · **moyenne mobile exponentielle** $\tilde\sigma_{t+1}^2=(1-\beta)\hat\sigma_t^2+\beta\tilde\sigma_t^2$ · EWMA sur $m$ · régression sur les $\hat\sigma_{t-j}^2$. Référence : **RiskMetrics**.
4. **Arbitrage** : plus de données (précision) contre données récentes (pertinence). Évaluation **hors échantillon** (MSE, MAE, MAPE).
5. **GBM** : $dS=\mu S\,dt+\sigma S\,dW$ ; incréments de $W$ gaussiens $N(0,t'-t)$ et indépendants sur intervalles disjoints.
6. **Loi des log-rendements** : $R_j\sim N(\mu^\ast\tau_j,\sigma^2\tau_j)$ avec $\mu^\ast=\mu-\sigma^2/2$ ; EMV $\hat\mu^\ast=\bar R$, $\hat\sigma^2=\frac1n\sum(R_t-\bar R)^2$.
7. **Garman-Klass** : $\hat\sigma_0^2=(C_1-C_0)^2$, $\hat\sigma_1^2=(O_1-C_0)^2/f$, $\hat\sigma_2^2=(C_1-O_1)^2/(1-f)$, chacun d'espérance $\sigma^2$ et de variance $2\sigma^4$ ; $\hat\sigma_1^2\perp\hat\sigma_2^2$ ⟹ moyenne d'efficacité $2$. Parkinson $\approx5{,}2$, GK $\approx6{,}2$, analytique $\approx7{,}4$, composite $\approx8{,}4$.
8. **Sauts de Poisson** : $dS/S=\mu\,dt+\sigma\,dW+\gamma Z(t)\,d\pi(t)$, $\pi$ de taux $\lambda$, $Z\sim N(0,1)$ ; EMV = mélange poissonien de gaussiennes, résolu par **EM** avec les sauts en variables latentes.
9. **ARCH($p$)** (Engle, 1982) : $y_t=\mu_t+\varepsilon_t$, $\varepsilon_t=Z_t\sigma_t$, $\sigma_t^2=\alpha_0+\sum_i\alpha_i\varepsilon_{t-i}^2$, $\alpha_j\geq0$ ; $\sigma_t^2=\mathrm{var}(R_t\mid\mathcal F_{t-1})$.
10. **Équivalence AR** : $\varepsilon_t^2=\alpha_0+\sum_i\alpha_i\varepsilon_{t-i}^2+u_t$, $E[u_t\mid\mathcal F_t]=0$, $\mathrm{var}[u_t\mid\mathcal F_t]=2\sigma_t^4$.
11. **Test LM** : $H_0:\alpha_1=\cdots=\alpha_p=0$ ; ajuster une AR($p$) sur $\hat\varepsilon_t^2$ ; $nR^2\sim\chi^2_p$ ; estimations = **QMLE**.
12. **GARCH($p,q$)** (Bollerslev, 1986) : $\sigma_t^2=\alpha_0+\sum_i\alpha_i\varepsilon_{t-i}^2+\sum_j\beta_j\sigma_{t-j}^2$.
13. **GARCH(1,1)** ⟹ **ARMA(1,1)** : $\varepsilon_t^2=\alpha_0+(\alpha_1+\beta_1)\varepsilon_{t-1}^2+u_t-\beta_1u_{t-1}$ ; **stationnaire ssi** $\lvert\alpha_1+\beta_1\rvert<1$.
14. **Variance de long terme** : $\sigma^2=\alpha_0/(1-\alpha_1-\beta_1)$ ; cas général $\alpha_0/[1-\sum(\alpha_i+\beta_i)]$, ARMA($\max(p,q),q$).
15. **Vraisemblance** : $\prod_t\frac{1}{\sqrt{2\pi\sigma_t^2}}\exp(-\varepsilon_t^2/2\sigma_t^2)$ ; contraintes $\alpha_i,\beta_j\geq0$ et $\sum\alpha_i+\sum\beta_j<1$.
16. **Diagnostics** : $\hat\varepsilon_t/\hat\sigma_t$ et $(\hat\varepsilon_t/\hat\sigma_t)^2$ non corrélés ; normalité par QQ-plot, Jarque-Bera, Shapiro-Wilk, Kolmogorov-Smirnov ; sélection par AIC/BIC.
17. **Faits stylisés** : **regroupement** de volatilité · **queues épaisses** (mélange stochastique de gaussiennes) · **retour à la moyenne**, $(\varepsilon_t^2-\sigma^2)=(\alpha_1+\beta_1)(\varepsilon_{t-1}^2-\sigma^2)+u_t-\beta_1u_{t-1}$, processus d'**Ornstein-Uhlenbeck étendu** à erreurs MA(1).

**Formulas to know**

$$\mathrm{vol}=\sqrt{252}\,\hat\sigma \qquad dS=\mu S\,dt+\sigma S\,dW \qquad R_j\sim N\big((\mu-\tfrac{\sigma^2}{2})\tau_j,\ \sigma^2\tau_j\big)$$

$$\sigma_t^2=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\beta_1\sigma_{t-1}^2 \qquad \varepsilon_t^2=\alpha_0+(\alpha_1+\beta_1)\varepsilon_{t-1}^2+u_t-\beta_1u_{t-1} \qquad \sigma^2=\frac{\alpha_0}{1-\alpha_1-\beta_1}$$

$$LM=nR^2\sim\chi^2_p \qquad \tilde\sigma_{t+1}^2=(1-\beta)\hat\sigma_t^2+\beta\tilde\sigma_t^2 \qquad \hat\sigma_3^2=\frac{(H_1-L_1)^2}{4\log2}$$

**Methods to know** : l'annualisation et sa justification ; la dérivation de l'ARMA(1,1) à partir du GARCH(1,1) ; le calcul de la variance de long terme ; le test LM en trois étapes ; le développement du GARCH(1,1) en ARCH($\infty$).

## 🧠 Active Recall

**Basic** — Écrivez le modèle GARCH(1,1) avec ses contraintes, et donnez sa variance de long terme.

<details><summary>Réponse</summary>

$$y_t=\mu_t+\varepsilon_t, \qquad \varepsilon_t=Z_t\sigma_t, \qquad \sigma_t^2=\alpha_0+\alpha_1\varepsilon_{t-1}^2+\beta_1\sigma_{t-1}^2$$

avec $Z_t$ i.i.d. de moyenne $0$ et variance $1$.

**Contraintes** : $\alpha_0>0$, $\alpha_1\geq0$, $\beta_1\geq0$ (positivité de la variance) et $\alpha_1+\beta_1<1$ (stationnarité en covariance).

**Variance de long terme** : en prenant l'espérance inconditionnelle, $\sigma^2=\alpha_0+(\alpha_1+\beta_1)\sigma^2$, d'où

$$\sigma^2=\frac{\alpha_0}{1-\alpha_1-\beta_1}$$

</details>

**Understanding** — Pourquoi dit-on que le GARCH rend la volatilité « prévisible » alors qu'elle reste aléatoire ?

<details><summary>Réponse</summary>

Parce que $\sigma_t^2$ est une fonction **déterministe de l'information passée $\mathcal F_{t-1}$** : connaissant $\varepsilon_{t-1}$ et $\sigma_{t-1}^2$, on calcule $\sigma_t^2$ **exactement**, sans aléa résiduel. Le rendement $\varepsilon_t=Z_t\sigma_t$ reste imprévisible — c'est $Z_t$ qui apporte le hasard — mais son **amplitude attendue** est connue à l'avance.

**La distinction à formuler** : on ne prévoit pas le **signe** ni la **valeur** du rendement (ce serait une opportunité d'arbitrage), on prévoit sa **dispersion**. C'est précisément ce dont on a besoin pour la VaR, le prix des options et le dimensionnement des positions.

**Et l'aléa n'a pas disparu** : $\sigma_{t+2}^2$ vu de $t$ *est* aléatoire, puisqu'il dépend de $\varepsilon_{t+1}$, encore inconnu. La prévisibilité est **à un pas**.

</details>

**Application** — Un test LM sur $p=5$ retards donne $n=1000$ et $R^2=0{,}12$. Conclusion ?

<details><summary>Réponse</summary>

$$LM=nR^2=1000\times0{,}12=120$$

à comparer à une $\chi^2$ à $p=5$ degrés de liberté. Le quantile à $99\,\%$ vaut environ $15{,}09$.

Comme $120\gg15{,}09$, on **rejette massivement $H_0:\alpha_1=\cdots=\alpha_5=0$**. Il y a une **hétéroscédasticité conditionnelle** très marquée : la variance des rendements dépend fortement des chocs passés.

**La suite du travail.** Ajuster un GARCH — commencer par GARCH(1,1), qui suffit presque toujours —, puis vérifier que les **résidus standardisés au carré** $(\hat\varepsilon_t/\hat\sigma_t)^2$ ne sont **plus** autocorrélés : c'est le signe que le modèle a bien absorbé le regroupement de volatilité.

⚠️ Ne pas oublier que les estimations de cette régression auxiliaire sont des **QMLE**, pas des EMV : elles servent au test, pas à l'estimation finale.

</details>

**Comparison** — ARCH($p$) contre GARCH(1,1) : pourquoi le second a-t-il gagné ?

<details><summary>Réponse</summary>

|  | ARCH($p$) | GARCH(1,1) |
|---|---|---|
| Paramètres | $p+1$ | $3$ |
| Mémoire | s'arrête net au retard $p$ | infinie, décroissance **géométrique** |
| Contraintes | $\alpha_j\geq0$ pour chacun des $p$ | trois contraintes |
| Calcul | somme de $p$ termes | **récursif**, un pas |
| Forme équivalente | AR($p$) en $\varepsilon_t^2$ | **ARMA(1,1)** en $\varepsilon_t^2$ |

**La raison de fond.** La volatilité financière est **très persistante** : $\alpha_1+\beta_1\approx0{,}98$ en pratique. Reproduire cette persistance avec un ARCH pur exigerait un $p$ très grand — donc beaucoup de paramètres à estimer, chacun contraint positif, avec une variance d'estimation qui explose.

GARCH(1,1) obtient la même chose avec **trois** paramètres, puisqu'il est un **ARCH($\infty$)** à poids $\alpha_1\beta_1^k$ :

$$\sigma_t^2=\frac{\alpha_0}{1-\beta_1}+\alpha_1\sum_{k\geq0}\beta_1^k\varepsilon_{t-1-k}^2$$

**C'est le même argument que AR contre MA en fiche 52** : un terme autorégressif engendre une mémoire infinie pour un seul paramètre. Le cours résume en deux mots : **parcimonieux**, et **s'ajuste à de nombreuses séries financières**.

</details>

**Exam-style** — Un analyste calcule la volatilité annualisée à partir de $252$ rendements quotidiens et obtient $18\,\%$. Il conclut que la volatilité sera de $18\,\%$ l'an prochain. Critiquez.

<details><summary>Réponse</summary>

**Le calcul lui-même est correct** : $\hat\sigma^2=\frac{1}{251}\sum(R_t-\bar R)^2$ puis $\sqrt{252}\,\hat\sigma=0{,}18$. C'est bien l'estimateur de la volatilité **historique** annualisée.

**Les cinq critiques.**

**1. C'est une estimation du passé, pas une prévision.** L'estimateur suppose $\{R_t\}$ **stationnaire en covariance** — donc que $\sigma$ ne change pas. Or le test LM d'Engle rejette cette hypothèse sur pratiquement toutes les séries financières.

**2. Il ignore le regroupement de volatilité.** Si la fenêtre contient un krach au début et une période calme à la fin, $18\,\%$ mélange deux régimes. Un GARCH(1,1) partirait de $\sigma_T^2$, la volatilité **conditionnelle actuelle**, et convergerait progressivement vers la moyenne de long terme — pas l'inverse.

**3. La prévision correcte est un chemin, pas un nombre.** Sous GARCH(1,1),

$$E[\sigma_{T+h}^2\mid\mathcal F_T]=\sigma^2+(\alpha_1+\beta_1)^h(\sigma_T^2-\sigma^2)$$

La volatilité prévue **converge** vers $\sigma^2=\alpha_0/(1-\alpha_1-\beta_1)$ à la vitesse $(\alpha_1+\beta_1)^h$. À horizon un an et avec $\alpha_1+\beta_1=0{,}98$, on est déjà proche de $\sigma^2$ ; à horizon une semaine, c'est $\sigma_T^2$ qui domine.

**4. Le poids uniforme est un mauvais choix.** Toutes les observations pèsent $1/251$, y compris celles d'il y a onze mois. Une **moyenne mobile exponentielle** — la méthodologie **RiskMetrics** — pondère le passé récent davantage.

**5. Une seule observation par jour, c'est du gaspillage.** Avec les prix d'ouverture, haut et bas, l'estimateur de **Garman-Klass** atteint une efficacité de l'ordre de $8$ : la même précision avec huit fois moins de jours. Et avec des données intra-journalières, on cumule les carrés des rendements intra-day.

**Ce qu'il faudrait dire à l'analyste.** « $18\,\%$ est la volatilité **réalisée** des douze derniers mois. Pour prévoir, il faut d'abord tester l'effet ARCH, puis ajuster un GARCH(1,1) : la prévision partira de la volatilité conditionnelle d'aujourd'hui et convergera vers la moyenne de long terme. Et si les prix haut/bas sont disponibles, l'estimation gagnera un ordre de grandeur en précision. »

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Définition de la volatilité ? | Écart-type **annualisé** de la variation de prix |
| Annualisation quotidienne ? | $\sqrt{252}\,\hat\sigma$ |
| Pourquoi une racine carrée ? | Les **variances** s'additionnent sous indépendance |
| Moyenne mobile exponentielle ? | $\tilde\sigma_{t+1}^2=(1-\beta)\hat\sigma_t^2+\beta\tilde\sigma_t^2$ |
| Méthodologie de référence ? | **RiskMetrics** |
| Équation du brownien géométrique ? | $dS=\mu S\,dt+\sigma S\,dW$ |
| Loi des log-rendements ? | $N\big((\mu-\sigma^2/2)\tau_j,\ \sigma^2\tau_j\big)$ |
| Pourquoi le $-\sigma^2/2$ ? | Inégalité de **Jensen** : $\log$ est concave |
| EMV de $\sigma^2$ sous GBM ? | $\frac1n\sum(R_t-\bar R)^2$ — diviseur $n$ |
| Variance de $(C_1-C_0)^2$ ? | $2\sigma^4$ |
| Pourquoi Garman-Klass gagne ? | $\hat\sigma_1^2$ et $\hat\sigma_2^2$ sont **indépendants** ⟹ moyenne de variance moitié |
| Estimateur de Parkinson ? | $(H_1-L_1)^2/(4\log2)$, efficacité $\approx5{,}2$ |
| Efficacité de l'estimateur composite ? | $\approx8{,}4$ |
| Modèle à sauts de Poisson ? | $dS/S=\mu\,dt+\sigma\,dW+\gamma Z(t)\,d\pi(t)$ |
| Comment l'estimer ? | **EM**, les sauts en variables latentes |
| Modèle ARCH($p$) ? | $\sigma_t^2=\alpha_0+\sum_i\alpha_i\varepsilon_{t-i}^2$, $\alpha_j\geq0$ |
| Que représente $\sigma_t^2$ ? | $\mathrm{var}(R_t\mid\mathcal F_{t-1})$ — hétéroscédasticité **conditionnelle** |
| ARCH implique quel modèle en $\varepsilon_t^2$ ? | Une **AR($p$)** |
| Statistique du test LM ? | $nR^2\sim\chi^2_p$ sous $H_0$ |
| Que sont les estimations de cette régression ? | Des **QMLE**, pas des EMV |
| Modèle GARCH($p,q$) ? | $\sigma_t^2=\alpha_0+\sum\alpha_i\varepsilon_{t-i}^2+\sum\beta_j\sigma_{t-j}^2$ |
| GARCH(1,1) implique quel modèle ? | Un **ARMA(1,1)** en $\varepsilon_t^2$ |
| Sa forme ARMA ? | $\varepsilon_t^2=\alpha_0+(\alpha_1+\beta_1)\varepsilon_{t-1}^2+u_t-\beta_1u_{t-1}$ |
| Condition de stationnarité ? | $\lvert\alpha_1+\beta_1\rvert<1$ |
| Variance de long terme ? | $\alpha_0/(1-\alpha_1-\beta_1)$ |
| Variance de $u_t$ ? | $2\sigma_t^4$ |
| GARCH($p,q$) équivaut à quel ARMA ? | **ARMA($\max(p,q),q$)** |
| Les deux diagnostics de résidus ? | $\hat\varepsilon_t/\hat\sigma_t$ et $(\hat\varepsilon_t/\hat\sigma_t)^2$ non corrélés |
| Tests de normalité cités ? | QQ-plot, Jarque-Bera, Shapiro-Wilk, Kolmogorov-Smirnov |
| Les trois faits stylisés ? | Regroupement de volatilité · queues épaisses · retour à la moyenne |
| Pourquoi le GARCH a des queues épaisses ? | C'est un **mélange stochastique de gaussiennes** |
| Le processus du retour à la moyenne ? | **Ornstein-Uhlenbeck étendu** à erreurs MA(1) |
