# Fiche 94 — Estimer volatilités et corrélations : EWMA, GARCH(1,1) et maximum de vraisemblance

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Économétrie |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 22 « Estimating Volatilities and Correlations » |
| **Difficulté** | Must know — le moteur d'estimation derrière toute VaR et tout modèle de volatilité |
| **Temps d'étude estimé** | 1 h 50 |
| **Prérequis** | Fiche 93 (VaR de Hull), fiche 87 (Black-Scholes), fiche 91 (smiles) — complémentaire de la fiche 53 (modélisation de la volatilité, ARCH/GARCH côté séries temporelles) |
| **Concepts clés** | Taux de variance, schémas de pondération, ARCH($m$), EWMA, RiskMetrics, GARCH(1,1), retour à la moyenne, maximum de vraisemblance, *variance targeting*, autocorrélation, statistique de Ljung-Box, prévision de variance, structure par terme de volatilité, mise à jour des covariances, matrice semi-définie positive |
| **Poids à l'examen** | La **mise à jour EWMA** $\sigma_n^2=\lambda\sigma_{n-1}^2+(1-\lambda)u_{n-1}^2$ · la **décomposition** $\omega=\gamma V_L$, $\gamma=1-\alpha-\beta$ · la **prévision** $E[\sigma_{n+t}^2]=V_L+(\alpha+\beta)^t(\sigma_n^2-V_L)$ · la **fonction de log-vraisemblance** $\sum[-\ln v_i-u_i^2/v_i]$. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE   les volatilités et corrélations NE SONT PAS CONSTANTES : on les traque

u_i = (S_i − S_{i−1})/S_{i−1}          σ_n² = TAUX DE VARIANCE du jour n, estimé fin j. n−1

ÉQUIPONDÉRÉ   σ_n² = (1/m) Σ u²_{n−i}                        aucun poids récent
ARCH(m)       σ_n² = ω + Σ αᵢ u²_{n−i}                       ω = γV_L
EWMA          σ_n² = λσ²_{n−1} + (1−λ) u²_{n−1}              RiskMetrics : λ = 0,94
GARCH(1,1)    σ_n² = ω + α u²_{n−1} + β σ²_{n−1}             α+β<1  γ = 1−α−β  V_L = ω/γ

EWMA = GARCH(1,1) avec ω = 0, α = 1−λ, β = λ   →   PAS de retour à la moyenne

ESTIMATION    maximiser  Σ [ −ln(v_i) − u_i²/v_i ]           recherche itérative (Solver)
DIAGNOSTIC    autocorrélations de u²/σ² ≈ 0 · Ljung-Box < 25 pour K = 15
PRÉVISION     E[σ²_{n+t}] = V_L + (α+β)^t (σ_n² − V_L)       a = ln[1/(α+β)]
COVARIANCES   même modèle, même λ → matrice SEMI-DÉFINIE POSITIVE : wᵀΩw ≥ 0
```

**Le cadrage d'ouverture.** *Ce chapitre est pertinent **à la fois** pour le calcul de la VaR par l'approche modèle **et** pour la valorisation de dérivés. Quand on calcule une VaR, on s'intéresse surtout aux **niveaux COURANTS** des volatilités et corrélations, parce qu'on évalue les changements possibles de valeur d'un portefeuille sur une **très courte** période. Quand on valorise un dérivé, ce sont des **PRÉVISIONS** sur toute la durée de vie du dérivé qui sont requises.*

*Les modèles portent des noms imposants — **EWMA** (*exponentially weighted moving average*), **ARCH** (*autoregressive conditional heteroscedasticity*), **GARCH** (*generalized* ARCH). **Leur trait distinctif est qu'ils reconnaissent que les volatilités et corrélations ne sont PAS constantes.** Pendant certaines périodes une volatilité peut être relativement faible, pendant d'autres relativement élevée. Les modèles tentent de **suivre ces variations dans le temps**.*

## 🔴 Concept 1 — Le taux de variance et les schémas de pondération

### 1.1 Les définitions

$$\boxed{\sigma_n=\text{volatilité de la variable de marché le jour }n\textbf{, estimée à la FIN du jour }n-1}$$

$$\boxed{\sigma_n^2=\text{le TAUX DE VARIANCE (\textit{variance rate}) du jour }n}$$

L'estimateur **non biaisé** classique, à partir des $m$ observations les plus récentes :

$$\sigma_n^2=\frac{1}{m-1}\sum_{i=1}^{m}(u_{n-i}-\bar u)^2\;\text{(22.1)}\qquad\text{avec}\qquad u_i=\ln\frac{S_i}{S_{i-1}}\ \text{ et }\ \bar u=\frac1m\sum_{i=1}^{m}u_{n-i}$$

**Les trois modifications faites pour le suivi quotidien** :

| # | Modification | Justification donnée par Hull |
|---|---|---|
| **1** | $u_i$ devient la **variation en pourcentage** : $\boxed{u_i=\dfrac{S_i-S_{i-1}}{S_{i-1}}}\;\text{(22.2)}$ | cohérent avec la définition de la volatilité **pour les calculs de VaR** (§21.3) |
| **2** | $\bar u$ est supposée **nulle** | la variation espérée en un jour est **très petite** devant l'écart-type des variations |
| **3** | $m-1$ est remplacé par $m$ | on passe d'un estimateur **non biaisé** à l'estimateur du **maximum de vraisemblance** |

$$\boxed{\sigma_n^2=\frac1m\sum_{i=1}^{m}u_{n-i}^2}\;\text{(22.3)}$$

> ⚠️ ***Ces trois changements font très peu de différence sur les estimations calculées, mais ils permettent de simplifier la formule.***

⚠️ **La note de bas de page à ne pas manquer — les indices changent de sens entre les chapitres 21 et 22.** *Les $u$ de ce chapitre jouent le même rôle que les $\Delta x$ du chapitre 21 : ce sont des variations quotidiennes en pourcentage. Mais **pour les $u$, les indices comptent des observations faites des JOURS DIFFÉRENTS sur la MÊME variable de marché** ; **pour les $\Delta x$, ils comptent des observations faites le MÊME jour sur des variables DIFFÉRENTES**. L'usage des indices de $\sigma$ diffère de la même façon : ici ils désignent des **jours**, au chapitre 21 des **variables de marché**.*

### 1.2 De la pondération égale à ARCH($m$)

L'équation (22.3) donne **un poids égal** à $u_{n-1}^2,u_{n-2}^2,\dots,u_{n-m}^2$. *Notre objectif étant d'estimer le niveau **courant** de volatilité, il est logique de **donner plus de poids aux données récentes** :*

$$\boxed{\sigma_n^2=\sum_{i=1}^{m}\alpha_i\,u_{n-i}^2}\;\text{(22.4)}\qquad\text{avec }\alpha_i>0,\ \ \alpha_i<\alpha_j\text{ si }i>j,\ \ \sum_{i=1}^{m}\alpha_i=1$$

**L'extension : donner du poids à une variance de long terme.**

$$\boxed{\sigma_n^2=\gamma V_L+\sum_{i=1}^{m}\alpha_i\,u_{n-i}^2}\;\text{(22.5)}\qquad\text{avec}\qquad\gamma+\sum_{i=1}^{m}\alpha_i=1$$

où $V_L$ est le **taux de variance de long terme** et $\gamma$ le poids qui lui est assigné. **C'est le modèle ARCH($m$)**, proposé pour la première fois par **Engle** (Econometrica, 1982, sur l'inflation britannique). *L'estimation de la variance est fondée sur une variance moyenne de long terme **et** $m$ observations : **plus une observation est ancienne, moins elle reçoit de poids**.*

En posant $\boxed{\omega=\gamma V_L}$ :

$$\boxed{\sigma_n^2=\omega+\sum_{i=1}^{m}\alpha_i\,u_{n-i}^2}\;\text{(22.6)}$$

## 🔴 Concept 2 — Le modèle EWMA

### 2.1 La formule et sa dérivation

L'EWMA est le cas particulier de (22.4) où les poids **décroissent exponentiellement** en remontant le temps : $\alpha_{i+1}=\lambda\alpha_i$, avec $\lambda$ constante entre 0 et 1. Ce schéma conduit à une formule de mise à jour **particulièrement simple** :

$$\boxed{\sigma_n^2=\lambda\,\sigma_{n-1}^2+(1-\lambda)\,u_{n-1}^2}\;\text{(22.7)}$$

*L'estimation $\sigma_n$ de la volatilité pour le jour $n$ (faite **à la fin du jour $n-1$**) se calcule à partir de $\sigma_{n-1}$ (l'estimation faite à la fin du jour $n-2$ pour le jour $n-1$) et de $u_{n-1}$ (la variation quotidienne en pourcentage la plus récente).*

<details class="details--riche">
<summary>

**Pourquoi les poids décroissent exponentiellement — la substitution en cascade**

</summary>

*Étape 1 — substituer $\sigma_{n-1}^2$ :*

$$\sigma_n^2=\lambda\big[\lambda\sigma_{n-2}^2+(1-\lambda)u_{n-2}^2\big]+(1-\lambda)u_{n-1}^2$$

$$\sigma_n^2=(1-\lambda)\big(u_{n-1}^2+\lambda u_{n-2}^2\big)+\lambda^2\sigma_{n-2}^2$$

*Étape 2 — substituer $\sigma_{n-2}^2$ de la même façon :*

$$\sigma_n^2=(1-\lambda)\big(u_{n-1}^2+\lambda u_{n-2}^2+\lambda^2u_{n-3}^2\big)+\lambda^3\sigma_{n-3}^2$$

*Étape 3 — en continuant ainsi :*

$$\boxed{\sigma_n^2=(1-\lambda)\sum_{i=1}^{m}\lambda^{i-1}u_{n-i}^2+\lambda^m\sigma_{n-m}^2}$$

*Étape 4 — la conclusion.* Pour $m$ **grand**, le terme $\lambda^m\sigma_{n-m}^2$ est **suffisamment petit pour être ignoré** : (22.7) est donc identique à (22.4) avec

$$\boxed{\alpha_i=(1-\lambda)\lambda^{i-1}}$$

*Les poids des $u_i$ **déclinent au taux $\lambda$** en remontant le temps : **chaque poids vaut $\lambda$ fois le précédent**.*

</details>

<details class="details--riche">
<summary>

**Exemple 22.1 — une mise à jour EWMA, pas à pas**

</summary>

**Données :** $\lambda=0{,}90$ ; la volatilité estimée pour le jour $n-1$ est **1 % par jour** ; pendant le jour $n-1$ la variable de marché a **augmenté de 2 %**.

*Étape 1 — les deux entrées :*

$$\sigma_{n-1}^2=0{,}01^2=0{,}0001\qquad u_{n-1}^2=0{,}02^2=0{,}0004$$

*Étape 2 — appliquer (22.7) :*

$$\sigma_n^2=0{,}9\times0{,}0001+0{,}1\times0{,}0004=0{,}00009+0{,}00004=\mathbf{0{,}00013}$$

*Étape 3 — la volatilité :*

$$\sigma_n=\sqrt{0{,}00013}=0{,}011402=\mathbf{1{,}14\ \%\text{ par jour}}$$

*Étape 4 — la lecture, essentielle.* ***L'espérance de $u_{n-1}^2$ est $\sigma_{n-1}^2$, soit 0,0001. Dans cet exemple la valeur RÉALISÉE de $u_{n-1}^2$ (0,0004) est SUPÉRIEURE à son espérance, et en conséquence notre estimation de volatilité AUGMENTE. Si la valeur réalisée avait été inférieure à son espérance, notre estimation aurait DIMINUÉ.***

</details>

### 2.2 Les propriétés, et le paramètre $\lambda$

| Propriété | Contenu |
|---|---|
| **Économie de mémoire** | *Très peu de données ont besoin d'être stockées : à tout instant, **seuls l'estimation courante du taux de variance et l'observation la plus récente** de la variable de marché doivent être mémorisés.* L'ancienne estimation et l'ancienne valeur peuvent être **jetées** |
| **Réactivité** | l'EWMA est **conçu pour suivre les changements de volatilité** : un gros mouvement le jour $n-1$ rend $u_{n-1}^2$ grand, ce qui **fait monter** l'estimation courante |
| **Rôle de $\lambda$** | $\lambda$ gouverne **la réactivité** de l'estimation à la dernière variation |
| **$\lambda$ faible** | beaucoup de poids sur $u_{n-1}^2$ → *les estimations produites pour des jours successifs sont **elles-mêmes très volatiles*** |
| **$\lambda$ élevé** (proche de 1) | estimations qui **répondent lentement** à l'information nouvelle |

**RiskMetrics.** *La base RiskMetrics, créée à l'origine par **J. P. Morgan** et rendue publique en **1994**, utilise l'EWMA avec $\boxed{\lambda=0{,}94}$ pour mettre à jour les estimations quotidiennes de volatilité. L'entreprise a trouvé que, **sur toute une gamme de variables de marché différentes**, cette valeur de $\lambda$ donne les prévisions du taux de variance **les plus proches du taux de variance réalisé**.* Le taux réalisé un jour donné était calculé comme la **moyenne équipondérée des $u_i^2$ des 25 jours suivants**.

## 🔴 Concept 3 — Le modèle GARCH(1,1)

### 3.1 L'équation et la lecture des paramètres

Proposé par **Bollerslev en 1986**. *La différence entre GARCH(1,1) et EWMA est **analogue à la différence entre (22.4) et (22.5)** :* dans GARCH(1,1), $\sigma_n^2$ se calcule à partir d'un taux de variance moyen de **long terme** $V_L$, **en plus** de $\sigma_{n-1}$ et $u_{n-1}$.

$$\boxed{\sigma_n^2=\gamma V_L+\alpha\,u_{n-1}^2+\beta\,\sigma_{n-1}^2}\;\text{(22.8)}\qquad\text{avec}\qquad\boxed{\gamma+\alpha+\beta=1}$$

| Paramètre | Poids assigné à |
|---|---|
| $\gamma$ | le taux de variance **de long terme** $V_L$ |
| $\alpha$ | la **dernière observation** $u_{n-1}^2$ |
| $\beta$ | la **dernière estimation** de variance $\sigma_{n-1}^2$ |

> **Le lien EWMA-GARCH, à connaître par cœur :** *le modèle EWMA est le cas particulier de GARCH(1,1) où $\boxed{\gamma=0,\quad\alpha=1-\lambda,\quad\beta=\lambda}$.*

**Le sens du « (1,1) ».** *Il indique que $\sigma_n^2$ est fondé sur **la plus récente observation de $u^2$** et **la plus récente estimation du taux de variance**. Le modèle plus général GARCH($p,q$) calcule $\sigma_n^2$ à partir des $p$ observations les plus récentes de $u^2$ et des $q$ estimations les plus récentes du taux de variance. **GARCH(1,1) est de loin le plus populaire des modèles GARCH.***

**La forme d'estimation.** En posant $\omega=\gamma V_L$ :

$$\boxed{\sigma_n^2=\omega+\alpha\,u_{n-1}^2+\beta\,\sigma_{n-1}^2}\;\text{(22.9)}$$

*C'est la forme habituellement utilisée pour **estimer** les paramètres.* Une fois $\omega$, $\alpha$, $\beta$ estimés :

$$\boxed{\gamma=1-\alpha-\beta}\qquad\boxed{V_L=\frac{\omega}{\gamma}=\frac{\omega}{1-\alpha-\beta}}$$

> ⚠️ ***Pour un processus GARCH(1,1) STABLE, il faut $\alpha+\beta<1$. Sinon, le poids appliqué à la variance de long terme est NÉGATIF.***

<details class="details--riche">
<summary>

**Exemple 22.2 — lire un GARCH estimé et le faire tourner**

</summary>

**Le modèle estimé sur données quotidiennes :**

$$\sigma_n^2=0{,}000002+0{,}13\,u_{n-1}^2+0{,}86\,\sigma_{n-1}^2$$

*Étape 1 — identifier les paramètres :* $\omega=0{,}000002$, $\alpha=0{,}13$, $\beta=0{,}86$.

*Étape 2 — le poids du long terme :*

$$\gamma=1-\alpha-\beta=1-0{,}13-0{,}86=\mathbf{0{,}01}$$

*Étape 3 — la variance de long terme :*

$$V_L=\frac{\omega}{\gamma}=\frac{0{,}000002}{0{,}01}=\mathbf{0{,}0002}$$

*En d'autres termes, la variance moyenne de long terme par jour impliquée par le modèle est 0,0002.*

*Étape 4 — la volatilité de long terme :*

$$\sqrt{0{,}0002}=0{,}014=\mathbf{1{,}4\ \%\text{ par jour}}$$

*Étape 5 — une mise à jour.* Si l'estimation de volatilité au jour $n-1$ est **1,6 %** par jour et que la variable a **baissé de 1 %** ce jour-là :

$$\sigma_{n-1}^2=0{,}016^2=0{,}000256\qquad u_{n-1}^2=0{,}01^2=0{,}0001$$

$$\sigma_n^2=0{,}000002+0{,}13\times0{,}0001+0{,}86\times0{,}000256=0{,}000002+0{,}000013+0{,}00022016=\mathbf{0{,}00023516}$$

$$\sigma_n=\sqrt{0{,}00023516}=0{,}0153=\mathbf{1{,}53\ \%\text{ par jour}}$$

⚠️ **Noter le signe.** *$u_{n-1}$ est **négatif** (baisse de 1 %) mais **seul son carré intervient** : GARCH(1,1) ne distingue pas les hausses des baisses.*

</details>

### 3.2 Les poids implicites et le retour à la moyenne

<details class="details--riche">
<summary>

**Le déploiement de (22.9) — d'où vient le taux de décroissance β**

</summary>

*Étape 1 :* $\sigma_n^2=\omega+\alpha u_{n-1}^2+\beta\big(\omega+\alpha u_{n-2}^2+\beta\sigma_{n-2}^2\big)$

$$=\omega+\beta\omega+\alpha u_{n-1}^2+\alpha\beta u_{n-2}^2+\beta^2\sigma_{n-2}^2$$

*Étape 2 :* en substituant $\sigma_{n-2}^2$,

$$\sigma_n^2=\omega+\beta\omega+\beta^2\omega+\alpha u_{n-1}^2+\alpha\beta u_{n-2}^2+\alpha\beta^2u_{n-3}^2+\beta^3\sigma_{n-3}^2$$

*Étape 3 — la loi générale :* **le poids appliqué à $u_{n-i}^2$ vaut $\boxed{\alpha\beta^{i-1}}$.** Les poids **déclinent exponentiellement au taux $\beta$**.

*Étape 4 — l'interprétation.* *$\beta$ s'interprète comme un **taux de décroissance** (*decay rate*). Il est analogue à $\lambda$ dans l'EWMA : il définit **l'importance relative des observations sur les $u$** dans la détermination du taux de variance courant.* Si $\beta=0{,}9$ : $u_{n-2}^2$ n'est important qu'à **90 %** de $u_{n-1}^2$ ; $u_{n-3}^2$ à **81 %** ; etc.

> **La phrase de synthèse :** *GARCH(1,1) est similaire à EWMA sauf que, **en plus** d'assigner des poids décroissant exponentiellement aux $u^2$ passés, **il assigne aussi du poids à la volatilité moyenne de long terme**.*

</details>

**Le retour à la moyenne (*mean reversion*).** *GARCH(1,1) reconnaît qu'**au fil du temps la variance tend à être ramenée vers un niveau moyen de long terme $V_L$**. Le poids assigné à $V_L$ est $\gamma=1-\alpha-\beta$.* GARCH(1,1) est équivalent à un modèle où la variance $V$ suit le processus stochastique

$$\boxed{dV=a(V_L-V)\,dt+\xi V\,dz}\qquad\text{avec}\qquad\boxed{a=1-\alpha-\beta}\quad\text{et}\quad\boxed{\xi=\alpha\sqrt2}$$

*(le temps étant mesuré en jours)*

| Situation | Drift |
|---|---|
| $V>V_L$ | drift **négatif** — la variance est **tirée vers le bas** |
| $V<V_L$ | drift **positif** — la variance est **tirée vers le haut** |

*Superposée au drift, il y a une volatilité $\xi$.*

### 3.3 Choisir entre les deux modèles

|  | **EWMA** | **GARCH(1,1)** |
|---|---|---|
| Retour à la moyenne | **non** | **oui** |
| Attrait théorique | — | ***théoriquement plus séduisant*** car en pratique les taux de variance **retournent effectivement à la moyenne** |
| Nombre de paramètres | **1** ($\lambda$) | **3** ($\omega$, $\alpha$, $\beta$) |
| Cas dégénéré | — | quand $\omega=0$, **GARCH(1,1) se réduit à EWMA** |

> ⚠️ ***Dans les circonstances où la valeur de $\omega$ qui ajuste le mieux les données se révèle NÉGATIVE, le modèle GARCH(1,1) n'est pas stable et il est sensé de basculer sur le modèle EWMA.***

## 🔴 Concept 4 — Le maximum de vraisemblance

### 4.1 Le principe, sur l'exemple le plus simple

> ***La méthode consiste à choisir les valeurs des paramètres qui MAXIMISENT la chance (ou vraisemblance) que les données observées se produisent.***

<details class="details--riche">
<summary>

**L'exemple des dix actions — vérifier que la méthode donne la bonne réponse**

</summary>

**Le problème.** On tire 10 actions au hasard un certain jour : **une** a baissé, les neuf autres sont restées stables ou ont monté. Quelle est la meilleure estimation de la probabilité de baisse ? *La réponse naturelle est **0,1**. Voyons si c'est ce que donne le maximum de vraisemblance.*

*Étape 1 — la vraisemblance.* Si $p$ est la probabilité de baisse, la probabilité qu'une action particulière baisse et que les neuf autres ne baissent pas vaut

$$L(p)=p(1-p)^9$$

*Étape 2 — maximiser.* On dérive par rapport à $p$ et on annule :

$$\frac{dL}{dp}=(1-p)^9-9p(1-p)^8=(1-p)^8\big[(1-p)-9p\big]=(1-p)^8(1-10p)=0$$

*Étape 3 — la solution :* $\boxed{p=0{,}1}$ — **exactement comme attendu**.

</details>

### 4.2 Estimer une variance constante

Problème : estimer la variance $v$ d'une variable $X$ à partir de $m$ observations $u_1,\dots,u_m$, la loi sous-jacente étant **normale de moyenne nulle**.

*Étape 1 — la vraisemblance d'une observation* = la densité de probabilité en $X=u_i$ :

$$\frac{1}{\sqrt{2\pi v}}\exp\!\left(\frac{-u_i^2}{2v}\right)$$

*Étape 2 — la vraisemblance de $m$ observations, dans l'ordre observé :*

$$\boxed{\prod_{i=1}^{m}\left[\frac{1}{\sqrt{2\pi v}}\exp\!\left(\frac{-u_i^2}{2v}\right)\right]}\;\text{(22.10)}$$

*Étape 3 — passer au logarithme.* *Maximiser une expression équivaut à maximiser son logarithme.* En ignorant les facteurs multiplicatifs constants, on veut maximiser :

$$\boxed{\sum_{i=1}^{m}\left[-\ln(v)-\frac{u_i^2}{v}\right]}\;\text{(22.11)}\qquad\text{soit}\qquad-m\ln(v)-\sum_{i=1}^{m}\frac{u_i^2}{v}$$

*Étape 4 — dériver et annuler :*

$$-\frac{m}{v}+\frac{1}{v^2}\sum_{i=1}^{m}u_i^2=0\quad\Longrightarrow\quad\boxed{\hat v=\frac1m\sum_{i=1}^{m}u_i^2}$$

> ⚠️ **C'est exactement (22.3)** — ce qui **confirme** la troisième modification du §1.1 : remplacer $m-1$ par $m$, c'est passer de l'estimateur non biaisé à **l'estimateur du maximum de vraisemblance**.

### 4.3 Estimer les paramètres de GARCH(1,1)

On pose $v_i=\sigma_i^2$, la variance estimée pour le jour $i$, et on suppose que la loi de $u_i$ **conditionnellement à la variance** est normale. Les meilleurs paramètres maximisent :

$$\prod_{i=1}^{m}\left[\frac{1}{\sqrt{2\pi v_i}}\exp\!\left(\frac{-u_i^2}{2v_i}\right)\right]\qquad\Longleftrightarrow\qquad\boxed{\max\ \sum_{i=1}^{m}\left[-\ln(v_i)-\frac{u_i^2}{v_i}\right]}\;\text{(22.12)}$$

> **La seule différence avec (22.11) : $v$ est remplacé par $v_i$.** *Il est nécessaire de **chercher itérativement** les paramètres qui maximisent (22.12).*

<details class="details--riche">
<summary>

**Table 22.1 — l'organisation du tableur, colonne par colonne (S&P 500, 18 juillet 2005 → 13 août 2010)**

</summary>

| Colonne | Contenu |
|---|---|
| 1 | la **date** |
| 2 | le compteur de jours $i$ |
| 3 | le **S&P 500** en fin de jour $i$, noté $S_i$ |
| 4 | $u_i=(S_i-S_{i-1})/S_{i-1}$ |
| 5 | $v_i=\sigma_i^2$, l'estimation faite **à la fin du jour $i-1$**. ***Au jour 3 on amorce en posant la variance égale à $u_2^2$*** ; les jours suivants, on applique (22.9) |
| 6 | la mesure de vraisemblance $-\ln(v_i)-u_i^2/v_i$ |

**On cherche $\omega$, $\alpha$, $\beta$ maximisant la SOMME de la colonne 6.**

Extrait des données :

| Date | $i$ | $S_i$ | $u_i$ | $v_i=\sigma_i^2$ | $-\ln v_i-u_i^2/v_i$ |
|---|---|---|---|---|---|
| 18-juil-2005 | 1 | 1 221,13 |  |  |  |
| 19-juil-2005 | 2 | 1 229,35 | 0,006731 |  |  |
| 20-juil-2005 | 3 | 1 235,20 | 0,004759 | 0,00004531 | 9,5022 |
| 21-juil-2005 | 4 | 1 227,04 | $-0{,}006606$ | 0,00004447 | 9,0393 |
| 22-juil-2005 | 5 | 1 233,68 | 0,005411 | 0,00004546 | 9,3545 |
| 25-juil-2005 | 6 | 1 229,03 | $-0{,}003769$ | 0,00004517 | 9,6906 |
| ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ |
| 11-août-2010 | 1 277 | 1 089,47 | $-0{,}028179$ | 0,00011834 | 2,3322 |
| 12-août-2010 | 1 278 | 1 083,61 | $-0{,}005379$ | 0,00017527 | 8,4841 |
| 13-août-2010 | 1 279 | 1 079,25 | $-0{,}004024$ | 0,00016327 | 8,6209 |
|  |  |  |  | **Total** | **10 228,2349** |

**Les paramètres optimaux :**

$$\omega=0{,}000001366\qquad\alpha=0{,}083394\qquad\beta=0{,}910116$$

d'où $\alpha+\beta=0{,}993510$ et $\gamma=1-\alpha-\beta=0{,}006490$, puis

$$V_L=\frac{\omega}{1-\alpha-\beta}=\frac{0{,}000001366}{0{,}006490}=0{,}0002075\quad\Rightarrow\quad\sigma_{LT}=\sqrt{0{,}0002075}=\mathbf{1{,}4404\ \%\text{ par jour}}$$

⚠️ **Incohérence d'arrondi dans la source.** La division telle qu'elle est imprimée donne en réalité $0{,}000001366/0{,}006490=0{,}00021048$, soit **1,4508 %** par jour. La valeur **0,0002075** (et donc 1,4404 %) correspond à $\omega=0{,}000001347$ — précisément l'**estimation d'essai** figurant au bas de la table 22.1. C'est **0,0002075 qui est utilisée dans toute la suite du chapitre** (et qui reproduit exactement les tables 22.3 et 22.4) : c'est donc celle qu'il faut retenir.

*Les figures 22.1 et 22.2 montrent l'indice et sa volatilité GARCH sur les 5 ans. **La plupart du temps la volatilité était inférieure à 2 % par jour, mais des volatilités atteignant 5 % par jour ont été observées pendant la crise du crédit** (les très hautes volatilités sont aussi signalées par l'indice VIX).*

</details>

### 4.4 Le *variance targeting* et l'estimation d'EWMA

**Le *variance targeting*** *(Engle et Mezrich, Risk, 1996)* — *une approche alternative, **parfois plus robuste**, qui consiste à **fixer $V_L$ égale à la variance d'échantillon** calculée sur les données (ou à une autre valeur jugée raisonnable). La valeur de $\omega$ vaut alors $V_L(1-\alpha-\beta)$ et **seuls DEUX paramètres restent à estimer**.*

| Méthode | Paramètres | Valeur de l'objectif (22.12) |
|---|---|---|
| **GARCH(1,1) libre** | $\omega=0{,}000001366$, $\alpha=0{,}083394$, $\beta=0{,}910116$ | **10 228,2349** |
| **Variance targeting** | $V_L=0{,}0002412$ (soit $\sigma=1{,}5531\,\%$/jour), $\alpha=0{,}08445$, $\beta=0{,}9101$ | **10 228,1941** — *seulement marginalement en dessous* |
| **EWMA** ($\omega=0$, $\alpha=1-\lambda$, $\beta=\lambda$) | $\lambda=0{,}9374$ — **un seul paramètre** | **10 192,5104** |

<details class="details--riche">
<summary>

**Le mode d'emploi de Solver donné par Hull**

</summary>

*Les deux modèles peuvent être implémentés avec **Solver** dans Excel. **La routine fonctionne bien à condition que le tableur soit structuré de sorte que les paramètres cherchés aient des valeurs à peu près ÉGALES.***

Astuce concrète pour GARCH(1,1) :

| Cellule | Contient | Cellule de calcul |
|---|---|---|
| A1 | $\omega\times10^5$ | `B1 = A1/100000` |
| A2 | $10\alpha$ | `B2 = A2/10` |
| A3 | $\beta$ | `B3 = A3` |

On utilise **B1, B2, B3** pour calculer la fonction de vraisemblance, et on demande à Solver d'optimiser **A1, A2, A3**.

⚠️ ***Occasionnellement Solver donne un maximum LOCAL : tester plusieurs valeurs de départ est une bonne idée.***

</details>

### 4.5 Le modèle est-il bon ? Autocorrélations et Ljung-Box

**Le raisonnement.** *L'hypothèse sous-jacente à un modèle GARCH est que la volatilité change au fil du temps. Autrement dit : **quand $u_i^2$ est élevé, $u_{i+1}^2$, $u_{i+2}^2$… ont tendance à être élevés** ; quand $u_i^2$ est faible, ils ont tendance à être faibles. On peut tester cela en examinant la structure d'**autocorrélation** des $u_i^2$.*

> ***Si le modèle GARCH fonctionne bien, il doit SUPPRIMER cette autocorrélation. On teste s'il l'a fait en considérant la structure d'autocorrélation de $u_i^2/\sigma_i^2$. Si celles-ci montrent très peu d'autocorrélation, notre modèle pour $\sigma_i$ a réussi à expliquer les autocorrélations des $u_i^2$.***

*(Pour une série $x_i$, l'autocorrélation de retard $k$ est le coefficient de corrélation entre $x_i$ et $x_{i+k}$.)*

**Table 22.2 — les résultats sur le S&P 500 :**

| Retard | Autocorr. de $u_i^2$ | Autocorr. de $u_i^2/\sigma_i^2$ |  | Retard | Autocorr. de $u_i^2$ | Autocorr. de $u_i^2/\sigma_i^2$ |
|---|---|---|---|---|---|---|
| 1 | 0,183 | $-0{,}063$ |  | 9 | 0,324 | 0,041 |
| 2 | 0,385 | $-0{,}004$ |  | 10 | 0,269 | 0,083 |
| 3 | 0,160 | $-0{,}007$ |  | 11 | 0,431 | $-0{,}007$ |
| 4 | 0,301 | 0,022 |  | 12 | 0,286 | 0,006 |
| 5 | 0,339 | 0,014 |  | 13 | 0,224 | 0,001 |
| 6 | 0,308 | $-0{,}011$ |  | 14 | 0,121 | 0,017 |
| 7 | 0,329 | 0,026 |  | 15 | 0,222 | $-0{,}031$ |
| 8 | 0,207 | 0,038 |  |  |  |  |

*Les autocorrélations sont **positives pour $u_i^2$ à TOUS les retards de 1 à 15**. Pour $u_i^2/\sigma_i^2$, certaines sont positives et d'autres négatives, et **elles sont toutes bien plus faibles en magnitude**.*

**Le test scientifique : la statistique de Ljung-Box** *(Ljung et Box, Biometrika, 1978)*. Pour une série de $m$ observations :

$$\boxed{\text{LB}=m\sum_{k=1}^{K}w_k\,\eta_k^2}\qquad\text{avec}\qquad\boxed{w_k=\frac{m+2}{m-k}}$$

où $\eta_k$ est l'autocorrélation de retard $k$ et $K$ le nombre de retards considérés.

$$\boxed{\text{Pour }K=15\text{, l'autocorrélation nulle est rejetée à 95 \% quand }\text{LB}>25}$$

| Série | Statistique LB | Verdict |
|---|---|---|
| $u_i^2$ | **≈ 1 566** | *preuve forte d'autocorrélation* |
| $u_i^2/\sigma_i^2$ | **21,7** | *l'autocorrélation a été **largement supprimée** par le modèle GARCH* |

## 🔴 Concept 5 — Prévoir avec GARCH(1,1)

### 5.1 La formule de prévision

<details class="details--riche">
<summary>

**La dérivation de (22.13), en cinq lignes**

</summary>

*Étape 1 — réécrire (22.8) avec $\gamma=1-\alpha-\beta$ :*

$$\sigma_n^2=(1-\alpha-\beta)V_L+\alpha u_{n-1}^2+\beta\sigma_{n-1}^2$$

*Étape 2 — soustraire $V_L$ des deux côtés :*

$$\sigma_n^2-V_L=\alpha\big(u_{n-1}^2-V_L\big)+\beta\big(\sigma_{n-1}^2-V_L\big)$$

*Étape 3 — écrire la même relation au jour $n+t$ :*

$$\sigma_{n+t}^2-V_L=\alpha\big(u_{n+t-1}^2-V_L\big)+\beta\big(\sigma_{n+t-1}^2-V_L\big)$$

*Étape 4 — prendre l'espérance.* **L'espérance de $u_{n+t-1}^2$ est $\sigma_{n+t-1}^2$**, d'où :

$$E\big[\sigma_{n+t}^2-V_L\big]=(\alpha+\beta)\,E\big[\sigma_{n+t-1}^2-V_L\big]$$

*Étape 5 — itérer :*

$$E\big[\sigma_{n+t}^2-V_L\big]=(\alpha+\beta)^t\big(\sigma_n^2-V_L\big)$$

</details>

$$\boxed{E\big[\sigma_{n+t}^2\big]=V_L+(\alpha+\beta)^t\big(\sigma_n^2-V_L\big)}\;\text{(22.13)}$$

*Cette équation **prévoit la volatilité du jour $n+t$ en utilisant l'information disponible à la fin du jour $n-1$**.*

| Cas | Conséquence |
|---|---|
| **EWMA** ($\alpha+\beta=1$) | *le taux de variance futur espéré **ÉGALE** le taux de variance courant* — aucune prévision de retour |
| $\alpha+\beta<1$ | le dernier terme **décroît** avec $t$ : la prévision **tend vers $V_L$** ; taux de retour $=1-\alpha-\beta$ |
| $\alpha+\beta>1$ | le poids donné à la variance de long terme est **négatif** : le processus est ***« mean fleeing » plutôt que « mean reverting »*** |

<details class="details--riche">
<summary>

**Application aux données S&P 500 — deux horizons**

</summary>

**Données :** $\alpha+\beta=0{,}9935$, $V_L=0{,}0002075$, variance courante estimée $\sigma_n^2=0{,}0003$ (soit **1,732 %** par jour, car $\sqrt{0{,}0003}=0{,}01732$).

*Prévision à 10 jours :*

$$0{,}0002075+0{,}9935^{10}\times(0{,}0003-0{,}0002075)=0{,}0002075+0{,}9369\times0{,}0000925=\mathbf{0{,}0002942}$$

$$\sigma=\sqrt{0{,}0002942}=\mathbf{1{,}72\ \%\text{ par jour}}\quad\text{— }\textit{encore bien au-dessus de la volatilité de long terme de 1,44 \%}$$

*Prévision à 500 jours :* $0{,}9935^{500}=0{,}0386$, donc

$$0{,}0002075+0{,}0386\times0{,}0000925=\mathbf{0{,}0002110}\qquad\sigma=\mathbf{1{,}45\ \%\text{ par jour}}$$

*— **très proche** de la volatilité de long terme.*

</details>

### 5.2 La structure par terme de volatilité

On pose, en se plaçant au jour $n$ :

$$V(t)=E\big(\sigma_{n+t}^2\big)\qquad\text{et}\qquad\boxed{a=\ln\frac{1}{\alpha+\beta}}\qquad\Longrightarrow\qquad\boxed{V(t)=V_L+e^{-at}\big[V(0)-V_L\big]}$$

$V(t)$ est l'estimation du **taux de variance instantané dans $t$ jours**. Le taux de variance **moyen** par jour entre aujourd'hui et $T$ :

$$\frac1T\int_0^TV(t)\,dt=V_L+\frac{1-e^{-aT}}{aT}\big[V(0)-V_L\big]$$

*Plus $T$ est grand, plus cela est proche de $V_L$.* En notant $\sigma(T)$ la **volatilité annuelle** à utiliser pour valoriser une option de $T$ jours, et avec **252 jours par an**, $\sigma(T)^2$ vaut 252 fois le taux de variance moyen par jour :

$$\boxed{\sigma(T)^2=252\left[V_L+\frac{1-e^{-aT}}{aT}\big(V(0)-V_L\big)\right]}\;\text{(22.14)}$$

| Volatilité courante | Pente estimée de la structure par terme |
|---|---|
| **au-dessus** de la volatilité de long terme | **décroissante** |
| **en dessous** de la volatilité de long terme | **croissante** |

⚠️ *La structure par terme **estimée** n'est habituellement **pas la même** que la structure par terme **réelle**. Cependant, elle est souvent utilisée pour **prédire la façon dont la structure réelle réagira aux changements de volatilité**.*

<details class="details--riche">
<summary>

**Table 22.3 — la structure par terme du S&P 500, entièrement recalculée**

</summary>

*Étape 1 — les paramètres.* $a=\ln(1/0{,}99351)=\mathbf{0{,}006511}$, $V_L=0{,}0002075$, $V(0)=0{,}0003$.

*Étape 2 — la formule à appliquer :*

$$\sigma(T)^2=252\left[0{,}0002075+\frac{1-e^{-0{,}006511\,T}}{0{,}006511\,T}\big(0{,}0003-0{,}0002075\big)\right]$$

*Étape 3 — le facteur d'amortissement et le résultat :*

| $T$ (jours) | $\dfrac{1-e^{-aT}}{aT}$ | $\sigma(T)$ (% par an) |
|---|---|---|
| 10 | 0,96814 | **27,36** |
| 30 | 0,90839 | **27,10** |
| 50 | 0,85354 | **26,87** |
| 100 | 0,73495 | **26,35** |
| 500 | 0,29532 | **24,32** |

*Étape 4 — la lecture.* La volatilité instantanée est $\sigma(0)=\sqrt{252\times0{,}0003}=27{,}50\,\%$, au-dessus de la volatilité de long terme $\sqrt{252\times0{,}0002075}=22{,}87\,\%$ : **la structure par terme est bien décroissante**, et elle converge lentement vers 22,87 %.

</details>

### 5.3 L'impact d'un choc de volatilité

En réécrivant (22.14) sous la forme $\sigma(T)^2=252\left[V_L+\dfrac{1-e^{-aT}}{aT}\left(\dfrac{\sigma(0)^2}{252}-V_L\right)\right]$, une variation $\Delta\sigma(0)$ produit approximativement :

$$\boxed{\Delta\sigma(T)=\frac{1-e^{-aT}}{aT}\cdot\frac{\sigma(0)}{\sigma(T)}\cdot\Delta\sigma(0)}\;\text{(22.15)}$$

**Table 22.4 — impact d'une hausse de 100 points de base de la volatilité instantanée** (de 27,50 % à 28,50 % par an, soit $\Delta\sigma(0)=1\,\%$) :

| Durée de l'option (jours) | 10 | 30 | 50 | 100 | 500 |
|---|---|---|---|---|---|
| **Hausse de la volatilité (%)** | **0,97** | **0,92** | **0,87** | **0,77** | **0,33** |

> ⚠️ **L'usage pratique, qui est tout l'intérêt de la table.** *Beaucoup d'institutions financières utilisent ce type d'analyse pour déterminer l'exposition de leurs livres aux changements de volatilité. **Plutôt que de considérer une hausse uniforme de 1 % des volatilités implicites pour calculer le vega, elles relient la taille de la hausse considérée à la MATURITÉ de l'option** : 0,97 % pour une option de 10 jours, 0,92 % pour 30 jours, 0,87 % pour 50 jours, etc.*

## 🟠 Concept 6 — Les corrélations

### 6.1 Les définitions et la mise à jour EWMA

$$\rho=\frac{\text{cov}(X,Y)}{\sigma_X\sigma_Y}\qquad\text{avec}\qquad\text{cov}(X,Y)=E\big[(X-\mu_X)(Y-\mu_Y)\big]$$

> ⚠️ ***Bien qu'il soit plus facile de développer une intuition sur une corrélation que sur une covariance, ce sont les COVARIANCES qui sont les variables fondamentales de l'analyse*** — de la même manière que **les taux de variance** étaient les variables fondamentales des procédures EWMA et GARCH, même si les volatilités sont plus faciles à comprendre.

Notations : $x_i=\dfrac{X_i-X_{i-1}}{X_{i-1}}$, $y_i=\dfrac{Y_i-Y_{i-1}}{Y_{i-1}}$ ; $\sigma_{x,n}$ et $\sigma_{y,n}$ les volatilités quotidiennes estimées pour le jour $n$ ; $\text{cov}_n$ l'estimation de covariance calculée le jour $n$. L'estimation de la corrélation le jour $n$ est $\dfrac{\text{cov}_n}{\sigma_{x,n}\sigma_{y,n}}$.

**Équipondération** (moyennes supposées nulles) :

$$\sigma_{x,n}^2=\frac1m\sum_{i=1}^{m}x_{n-i}^2,\qquad\sigma_{y,n}^2=\frac1m\sum_{i=1}^{m}y_{n-i}^2,\qquad\boxed{\text{cov}_n=\frac1m\sum_{i=1}^{m}x_{n-i}\,y_{n-i}}\;\text{(22.16)}$$

**Mise à jour EWMA** — exactement la même structure que (22.7) :

$$\boxed{\text{cov}_n=\lambda\,\text{cov}_{n-1}+(1-\lambda)\,x_{n-1}\,y_{n-1}}$$

*Les poids donnés aux $x_iy_i$ **déclinent** en remontant le temps ; **plus $\lambda$ est faible, plus les observations récentes reçoivent de poids**.*

**Mise à jour GARCH(1,1)** :

$$\boxed{\text{cov}_n=\omega+\alpha\,x_{n-1}y_{n-1}+\beta\,\text{cov}_{n-1}}\qquad\text{covariance moyenne de long terme}=\frac{\omega}{1-\alpha-\beta}$$

*Des formules similaires à (22.13) et (22.14) peuvent être développées pour prévoir les covariances futures et calculer la covariance moyenne sur la vie d'une option.*

<details class="details--riche">
<summary>

**Exemple 22.3 — mettre à jour une corrélation, étape par étape**

</summary>

**Données :** $\lambda=0{,}95$ ; corrélation estimée entre $X$ et $Y$ le jour $n-1$ : **0,6** ; volatilités le jour $n-1$ : **1 %** et **2 %** ; variations en pourcentage le jour $n-1$ : **0,5 %** et **2,5 %**.

*Étape 1 — remonter à la covariance*, via $\text{cov}=\rho\sigma_X\sigma_Y$ :

$$\text{cov}_{n-1}=0{,}6\times0{,}01\times0{,}02=\mathbf{0{,}00012}$$

*Étape 2 — mettre à jour la variance de $X$ :*

$$\sigma_{x,n}^2=0{,}95\times0{,}01^2+0{,}05\times0{,}005^2=0{,}000095+0{,}00000125=\mathbf{0{,}00009625}$$

*Étape 3 — mettre à jour la variance de $Y$ :*

$$\sigma_{y,n}^2=0{,}95\times0{,}02^2+0{,}05\times0{,}025^2=0{,}00038+0{,}00003125=\mathbf{0{,}00041125}$$

*Étape 4 — mettre à jour la covariance :*

$$\text{cov}_n=0{,}95\times0{,}00012+0{,}05\times0{,}005\times0{,}025=0{,}000114+0{,}00000625=\mathbf{0{,}00012025}$$

*Étape 5 — redescendre aux volatilités :*

$$\sigma_{x,n}=\sqrt{0{,}00009625}=\mathbf{0{,}981\ \%}\qquad\sigma_{y,n}=\sqrt{0{,}00041125}=\mathbf{2{,}028\ \%}$$

*Étape 6 — la nouvelle corrélation :*

$$\rho_n=\frac{0{,}00012025}{0{,}00981\times0{,}02028}=\mathbf{0{,}6044}$$

⚠️ **La leçon de méthode :** on **ne met jamais à jour la corrélation directement**. On passe par les **trois** quantités fondamentales — $\sigma_x^2$, $\sigma_y^2$, $\text{cov}$ — et on **recompose** la corrélation à la fin.

</details>

### 6.2 La condition de cohérence : matrices semi-définies positives

*Une fois toutes les variances et covariances calculées, une matrice de variance-covariance peut être construite. **Toutes les matrices de variance-covariance ne sont pas cohérentes en interne.*** La condition pour qu'une matrice $\Omega$ de taille $N\times N$ le soit :

$$\boxed{\mathbf w^{\mathsf T}\Omega\,\mathbf w\ \geqslant\ 0\quad\text{pour tout vecteur }\mathbf w\ (N\times1)}\;\text{(22.17)}$$

*Une matrice qui satisfait cette propriété est dite **SEMI-DÉFINIE POSITIVE**.*

**Pourquoi la condition doit tenir.** *Si $\mathbf w^{\mathsf T}=[w_1,w_2,\dots,w_n]$, l'expression $\mathbf w^{\mathsf T}\Omega\mathbf w$ **est la variance** de $w_1x_1+w_2x_2+\cdots+w_nx_n$ où $x_i$ est la valeur de la variable $i$. **En tant que telle, elle ne peut pas être négative.***

> ⚠️ **La règle pratique qui en découle.** *Pour être sûr de produire une matrice semi-définie positive, **les variances et covariances doivent être calculées de manière COHÉRENTE**. Si les variances sont calculées en donnant un poids égal aux $m$ dernières données, **il faut faire la même chose pour les covariances**. Si les variances sont mises à jour par EWMA avec $\lambda=0{,}94$, **il faut faire la même chose pour les covariances**.*

<details class="details--riche">
<summary>

**Le contre-exemple — une matrice qui n'est PAS cohérente**

</summary>

$$\Omega=\begin{pmatrix}1&0&0{,}9\\0&1&0{,}9\\0{,}9&0{,}9&1\end{pmatrix}$$

*Étape 1 — la lecture intuitive.* *La variance de chaque variable vaut 1,0, **donc les covariances sont aussi des coefficients de corrélation**. La première variable est **fortement corrélée** à la troisième ; la deuxième est **fortement corrélée** à la troisième ; **mais il n'y a AUCUNE corrélation entre la première et la deuxième**. Cela paraît étrange.*

*Étape 2 — la preuve.* On prend $\mathbf w=(1,1,-1)$ :

$$\mathbf w^{\mathsf T}\Omega\mathbf w=1+1+1+2(0)+2(-0{,}9)+2(-0{,}9)=3-3{,}6=\mathbf{-0{,}60}<0$$

**La condition (22.17) n'est pas satisfaite : la matrice n'est pas semi-définie positive.**

*Étape 3 — le critère général en dimension 3.* *La condition pour qu'une matrice $3\times3$ de corrélations soit cohérente en interne est*

$$\boxed{\rho_{12}^2+\rho_{13}^2+\rho_{23}^2-2\rho_{12}\rho_{13}\rho_{23}\ \leqslant\ 1}$$

Ici : $0+0{,}81+0{,}81-2\times0\times0{,}9\times0{,}9=\mathbf{1{,}62}>1$ — **violée**, comme prévu.

</details>

## 🔴 Concept 7 — L'application au portefeuille des quatre indices

On reprend le portefeuille du §21.2 : au 25 septembre 2008, **4 M** sur le DJIA, **3 M** sur le FTSE 100, **1 M** sur le CAC 40, **2 M** sur le Nikkei 225 ; rendements quotidiens collectés sur **500 jours**.

**Table 22.5 — matrice de CORRÉLATION, pondération ÉGALE des 500 derniers rendements** :

|  | DJIA | FTSE 100 | CAC 40 | Nikkei 225 |
|---|---|---|---|---|
| **DJIA** | 1 | 0,489 | 0,496 | $-0{,}062$ |
| **FTSE 100** | 0,489 | 1 | **0,918** | 0,201 |
| **CAC 40** | 0,496 | **0,918** | 1 | 0,211 |
| **Nikkei 225** | $-0{,}062$ | 0,201 | 0,211 | 1 |

*Le FTSE 100 et le CAC 40 sont **très fortement corrélés**. Le DJIA est **modérément** corrélé aux deux. **La corrélation du Nikkei 225 avec les autres indices est moins élevée.***

**Table 22.6 — matrice de COVARIANCE, pondération égale** :

|  | DJIA | FTSE 100 | CAC 40 | Nikkei 225 |
|---|---|---|---|---|
| **DJIA** | 0,0001227 | 0,0000768 | 0,0000767 | $-0{,}0000095$ |
| **FTSE 100** | 0,0000768 | 0,0002010 | 0,0001817 | 0,0000394 |
| **CAC 40** | 0,0000767 | 0,0001817 | 0,0001950 | 0,0000407 |
| **Nikkei 225** | $-0{,}0000095$ | 0,0000394 | 0,0000407 | 0,0001909 |

**Table 22.7 — matrice de COVARIANCE par EWMA avec $\lambda=0{,}94$** :

|  | DJIA | FTSE 100 | CAC 40 | Nikkei 225 |
|---|---|---|---|---|
| **DJIA** | 0,0004801 | 0,0004303 | 0,0004257 | $-0{,}0000396$ |
| **FTSE 100** | 0,0004303 | 0,0010314 | 0,0009630 | 0,0002095 |
| **CAC 40** | 0,0004257 | 0,0009630 | 0,0009535 | 0,0001681 |
| **Nikkei 225** | $-0{,}0000396$ | 0,0002095 | 0,0001681 | 0,0002541 |

⚠️ *Dans les calculs EWMA, la variance est **initialement fixée à la variance de population**. Mais **toutes les variances de départ raisonnables donnent essentiellement le même résultat**, car dans ce cas seule la variance **finale** nous intéresse.*

<details class="details--riche">
<summary>

**Les deux VaR, recalculées — et le facteur 2 entre les deux**

</summary>

*Étape 1 — la formule.* On applique (21.3) : $\sigma_P^2=\sum_i\sum_j\text{cov}_{ij}\,\alpha_i\alpha_j$ avec $\mathbf a=(4\,000;\ 3\,000;\ 1\,000;\ 2\,000)$ en milliers de dollars.

*Étape 2 — cas équipondéré :*

$$\sigma_P^2=8\,761{,}833\quad\Rightarrow\quad\sigma_P=\sqrt{8\,761{,}833}=\mathbf{93{,}60}\quad\Rightarrow\quad\text{VaR}_{1j,99\%}=\mathbf{217{,}757}\ \text{milliers de dollars}$$

*Étape 3 — cas EWMA :*

$$\sigma_P^2=40\,995{,}765\quad\Rightarrow\quad\sigma_P=\mathbf{202{,}474}\quad\Rightarrow\quad\text{VaR}_{1j,99\%}=2{,}33\times202{,}474=\mathbf{471{,}025}\ \text{milliers de dollars}$$

*Étape 4 — la comparaison, qui est le point de la section :*

| Méthode | VaR 1 jour 99 % |
|---|---|
| Modèle linéaire, **équipondéré** | **217 757 dollars** |
| Modèle linéaire, **EWMA $\lambda=0{,}94$** | **471 025 dollars** — *plus de DEUX fois plus élevé* |
| **Simulation historique** (§21.2) | **253 385 dollars** |

⚠️ **Note de calcul.** Hull écrit le quantile « $2{,}33$ », mais les valeurs 217,757 et 471,025 s'obtiennent avec le quantile **exact** $N^{-1}(0{,}01)=2{,}32635$ ; avec 2,33 arrondi on trouve 218,09 et 471,78. La différence est sans conséquence, mais il faut savoir d'où viennent les décimales.

</details>

**Pourquoi l'écart ? Les deux raisons, mises en table.**

> *L'écart-type d'un portefeuille constitué de positions **longues** augmente **avec les écarts-types des rendements** ET **avec les corrélations entre ces rendements**.*

**Table 22.8 — volatilités (% par jour)** :

|  | DJIA | FTSE 100 | CAC 40 | Nikkei 225 |
|---|---|---|---|---|
| **Équipondéré** | 1,11 | 1,42 | 1,40 | 1,38 |
| **EWMA** | **2,19** | **3,21** | **3,09** | **1,59** |

*Les écarts-types estimés sont **bien plus élevés** avec l'EWMA, **parce que les volatilités étaient bien plus élevées pendant la période immédiatement antérieure au 25 septembre 2008 que pendant le reste des 500 jours** couverts par les données.*

**Table 22.9 — matrice de corrélation par EWMA** :

|  | DJIA | FTSE 100 | CAC 40 | Nikkei 225 |
|---|---|---|---|---|
| **DJIA** | 1 | 0,611 | 0,629 | $-0{,}113$ |
| **FTSE 100** | 0,611 | 1 | **0,971** | 0,409 |
| **CAC 40** | 0,629 | **0,971** | 1 | 0,342 |
| **Nikkei 225** | $-0{,}113$ | 0,409 | 0,342 | 1 |

> ⚠️ ***En comparant la table 22.9 à la table 22.5, on voit que les corrélations avaient elles aussi AUGMENTÉ.*** *C'est un exemple du phénomène selon lequel **les corrélations tendent à augmenter dans les conditions de marché adverses**.*

*(0,489 → 0,611 · 0,496 → 0,629 · 0,918 → 0,971 · 0,201 → 0,409 · 0,211 → 0,342 : **toutes** les corrélations positives montent.)*

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| « $\lambda=\dots$ », « la dernière estimation de volatilité était… » | **EWMA** : $\sigma_n^2=\lambda\sigma_{n-1}^2+(1-\lambda)u_{n-1}^2$ |
| Trois paramètres $\omega$, $\alpha$, $\beta$ donnés | **GARCH(1,1)** : (22.9), puis $\gamma=1-\alpha-\beta$ et $V_L=\omega/\gamma$ |
| « volatilité de long terme ? » | $\sqrt{\omega/(1-\alpha-\beta)}$ |
| « volatilité espérée dans $t$ jours » | $E[\sigma_{n+t}^2]=V_L+(\alpha+\beta)^t(\sigma_n^2-V_L)$ |
| « volatilité à utiliser pour une option de $T$ jours » | (22.14) avec $a=\ln[1/(\alpha+\beta)]$ et le facteur $(1-e^{-aT})/(aT)$ |
| « de combien bouge la volatilité implicite ? » | (22.15) |
| Corrélation à mettre à jour | passer par $\sigma_x^2$, $\sigma_y^2$, $\text{cov}$ **séparément**, recomposer à la fin |
| « la matrice est-elle acceptable ? » | tester $\mathbf w^{\mathsf T}\Omega\mathbf w\geqslant0$ ; en dimension 3, le critère $\rho_{12}^2+\rho_{13}^2+\rho_{23}^2-2\rho_{12}\rho_{13}\rho_{23}\leqslant1$ |
| « estimer les paramètres » | **maximum de vraisemblance** : maximiser $\sum[-\ln v_i-u_i^2/v_i]$ |
| « le modèle est-il bon ? » | autocorrélations de $u_i^2/\sigma_i^2$ + **Ljung-Box** (seuil 25 pour $K=15$) |
| $\omega$ estimé **négatif** | le GARCH est **instable** : basculer sur **EWMA** |

## Comment résoudre ce type d'exercice

**A — Une mise à jour EWMA ou GARCH (l'exercice le plus fréquent).**

1. Calculer $u_{n-1}=(S_{n-1}-S_{n-2})/S_{n-2}$ **en proportion**, pas en pourcentage.
2. Élever au carré : $u_{n-1}^2$.
3. Récupérer $\sigma_{n-1}^2$ = (volatilité donnée)².
4. Appliquer la formule : EWMA $\lambda\sigma_{n-1}^2+(1-\lambda)u_{n-1}^2$ ; GARCH $\omega+\alpha u_{n-1}^2+\beta\sigma_{n-1}^2$.
5. Prendre la **racine** et reconvertir en pourcentage.
6. Contrôle de cohérence : si $u_{n-1}^2>\sigma_{n-1}^2$, la volatilité doit **monter** ; sinon **descendre**.

**B — Lire un GARCH estimé.**

1. $\gamma=1-\alpha-\beta$ — **vérifier que c'est positif**, sinon le modèle est instable.
2. $V_L=\omega/\gamma$ ; $\sigma_{LT}=\sqrt{V_L}$ (par jour), $\times\sqrt{252}$ pour l'annualiser.
3. Taux de retour à la moyenne $a=1-\alpha-\beta$ (forme continue) ou $a=\ln[1/(\alpha+\beta)]$ (forme exponentielle de §5.2).
4. Prévision : $V_L+(\alpha+\beta)^t(\sigma_n^2-V_L)$.

**C — Une structure par terme.**

1. Calculer $a=\ln[1/(\alpha+\beta)]$.
2. Pour chaque $T$, calculer le facteur $f(T)=\dfrac{1-e^{-aT}}{aT}$ — il vaut **1 en $T\to0$** et tend vers **0** quand $T\to\infty$.
3. $\sigma(T)^2=252\big[V_L+f(T)\,(V(0)-V_L)\big]$.
4. Pour l'impact d'un choc : $\Delta\sigma(T)=f(T)\dfrac{\sigma(0)}{\sigma(T)}\Delta\sigma(0)$.

**D — Une mise à jour de corrélation.**

1. $\text{cov}_{n-1}=\rho_{n-1}\sigma_{x,n-1}\sigma_{y,n-1}$.
2. Mettre à jour **les trois** : $\sigma_{x,n}^2$, $\sigma_{y,n}^2$, $\text{cov}_n$ — avec **le même** $\lambda$ (ou les mêmes $\omega,\alpha,\beta$).
3. $\rho_n=\text{cov}_n/(\sigma_{x,n}\sigma_{y,n})$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Utiliser $u_i=\ln(S_i/S_{i-1})$ dans un calcul de VaR | pour le suivi quotidien, Hull utilise la **variation en pourcentage** $(S_i-S_{i-1})/S_{i-1}$ |
| Oublier d'élever la volatilité au **carré** avant la mise à jour | les formules portent sur les **variances**, pas les volatilités |
| Mettre à jour la corrélation directement | passer par **covariance et variances séparément**, recomposer ensuite |
| Utiliser $\lambda$ pour les variances et un autre schéma pour les covariances | produit une matrice **non semi-définie positive** |
| Croire que $\omega$ est la variance de long terme | $\omega=\gamma V_L$ ; $V_L=\omega/\gamma$ avec $\gamma=1-\alpha-\beta$ |
| Ne pas vérifier $\alpha+\beta<1$ | sinon $\gamma<0$ : le processus est **« mean fleeing »** |
| Croire qu'EWMA prévoit un retour à la moyenne | $\alpha+\beta=1$ → **la variance future espérée = la variance courante** |
| Utiliser $a=1-\alpha-\beta$ dans (22.14) | dans la structure par terme, $a=\ln[1/(\alpha+\beta)]$ — proche mais **pas identique** ($0{,}00649$ contre $0{,}006511$) |
| Appliquer un choc de vega uniforme de 1 % à toutes les maturités | la table 22.4 dit **0,97 % à 10 jours, 0,33 % à 500 jours** |
| Maximiser la vraisemblance elle-même plutôt que son **log** | numériquement instable ; le log donne (22.11)/(22.12) |
| Oublier d'**amorcer** $v_i$ au jour 3 | Hull pose $v_3=u_2^2$ ; sans amorce la récurrence ne démarre pas |
| Conclure sur la seule inspection des autocorrélations | utiliser la **statistique de Ljung-Box** : seuil **25** pour $K=15$ |
| Croire que GARCH distingue hausses et baisses | il ne dépend que de $u_{n-1}^2$ ; il faut des modèles **asymétriques** (Nelson, Engle-Ng) pour cela |
| Supposer les corrélations stables en crise | elles **augmentent** — c'est exactement ce que montrent les tables 22.5 vs 22.9 |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Variation quotidienne** | $u_i=(S_i-S_{i-1})/S_{i-1}$ |
| **Estimateur équipondéré** | $\sigma_n^2=\frac1m\sum u_{n-i}^2$ |
| **Schéma pondéré** | $\sigma_n^2=\sum\alpha_iu_{n-i}^2$, $\sum\alpha_i=1$ |
| **ARCH($m$)** | $\sigma_n^2=\gamma V_L+\sum\alpha_iu_{n-i}^2$, $\gamma+\sum\alpha_i=1$ |
| **EWMA** | $\sigma_n^2=\lambda\sigma_{n-1}^2+(1-\lambda)u_{n-1}^2$ |
| **Poids EWMA** | $\alpha_i=(1-\lambda)\lambda^{i-1}$ |
| **RiskMetrics** | $\lambda=0{,}94$, publié en **1994** par J. P. Morgan |
| **GARCH(1,1)** | $\sigma_n^2=\gamma V_L+\alpha u_{n-1}^2+\beta\sigma_{n-1}^2=\omega+\alpha u_{n-1}^2+\beta\sigma_{n-1}^2$ |
| **Contraintes** | $\gamma+\alpha+\beta=1$ ; $\alpha+\beta<1$ ; $\omega=\gamma V_L$ ; $V_L=\omega/(1-\alpha-\beta)$ |
| **EWMA comme GARCH** | $\gamma=0$, $\alpha=1-\lambda$, $\beta=\lambda$ |
| **Poids GARCH sur $u_{n-i}^2$** | $\alpha\beta^{i-1}$ |
| **Processus continu équivalent** | $dV=a(V_L-V)dt+\xi V\,dz$, $a=1-\alpha-\beta$, $\xi=\alpha\sqrt2$ |
| **Log-vraisemblance** | $\sum_i\big[-\ln(v_i)-u_i^2/v_i\big]$ |
| **Amorce du tableur** | $v_3=u_2^2$ |
| **S&P 500 estimé** | $\omega=0{,}000001366$, $\alpha=0{,}083394$, $\beta=0{,}910116$, objectif $=10\,228{,}2349$ |
| **Sa variance / volatilité de long terme** | $V_L=0{,}0002075$ → **1,4404 %** par jour |
| **Variance targeting** | fixer $V_L$ = variance d'échantillon ; $\omega=V_L(1-\alpha-\beta)$ ; **2 paramètres** |
| **EWMA sur les mêmes données** | $\lambda=0{,}9374$, objectif $=10\,192{,}5104$ |
| **Ljung-Box** | $m\sum_kw_k\eta_k^2$, $w_k=(m+2)/(m-k)$ ; seuil **25** pour $K=15$ |
| **Résultats du test** | $u_i^2$ : **≈ 1 566** · $u_i^2/\sigma_i^2$ : **21,7** |
| **Prévision** | $E[\sigma_{n+t}^2]=V_L+(\alpha+\beta)^t(\sigma_n^2-V_L)$ |
| **Structure par terme** | $\sigma(T)^2=252\big[V_L+\frac{1-e^{-aT}}{aT}(V(0)-V_L)\big]$, $a=\ln\frac{1}{\alpha+\beta}$ |
| **Table 22.3** | 27,36 · 27,10 · 26,87 · 26,35 · 24,32 % pour 10/30/50/100/500 jours |
| **Table 22.4** | 0,97 · 0,92 · 0,87 · 0,77 · 0,33 % pour un choc de 1 % |
| **Covariance EWMA** | $\text{cov}_n=\lambda\text{cov}_{n-1}+(1-\lambda)x_{n-1}y_{n-1}$ |
| **Covariance GARCH** | $\text{cov}_n=\omega+\alpha x_{n-1}y_{n-1}+\beta\text{cov}_{n-1}$ |
| **Cohérence** | $\mathbf w^{\mathsf T}\Omega\mathbf w\geqslant0$ : **semi-définie positive** |
| **Critère $3\times3$** | $\rho_{12}^2+\rho_{13}^2+\rho_{23}^2-2\rho_{12}\rho_{13}\rho_{23}\leqslant1$ |
| **Quatre indices, équipondéré** | $\sigma_P=93{,}60$ → VaR **217 757 dollars** |
| **Quatre indices, EWMA** | $\sigma_P=202{,}474$ → VaR **471 025 dollars** |
| **Simulation historique (rappel)** | **253 385 dollars** |
| **Le phénomène de crise** | volatilités **et** corrélations **augmentent** simultanément |

## 🧠 Active Recall

1. Que note $\sigma_n$ exactement, et à quel moment est-elle estimée ?
2. Écrire l'estimateur non biaisé (22.1) puis les trois modifications qui mènent à (22.3).
3. Pourquoi remplacer $m-1$ par $m$ ? Quel estimateur obtient-on ?
4. En quoi les indices des $u$ diffèrent-ils des indices des $\Delta x$ du chapitre 21 ?
5. Écrire un schéma de pondération général et les deux contraintes sur les $\alpha_i$.
6. Écrire le modèle ARCH($m$). Qui l'a proposé, et en quelle année ?
7. Quelle est la relation entre $\omega$, $\gamma$ et $V_L$ ?
8. Écrire la formule de mise à jour EWMA.
9. Démontrer que l'EWMA donne des poids $(1-\lambda)\lambda^{i-1}$.
10. Quel terme néglige-t-on dans cette démonstration, et pourquoi ?
11. Refaire l'exemple 22.1 : $\lambda=0{,}9$, $\sigma_{n-1}=1\,\%$, $u_{n-1}=2\,\%$.
12. Pourquoi la volatilité **monte**-t-elle dans cet exemple ?
13. Quel est l'avantage de stockage de l'EWMA ?
14. Que se passe-t-il quand $\lambda$ est faible ? quand $\lambda$ est proche de 1 ?
15. Quelle valeur de $\lambda$ RiskMetrics utilise-t-elle, et comment a-t-elle été choisie ?
16. Comment le « taux de variance réalisé » était-il calculé chez J. P. Morgan ?
17. Écrire GARCH(1,1) sous les deux formes (22.8) et (22.9).
18. Quels poids portent $\gamma$, $\alpha$ et $\beta$ respectivement ?
19. Sous quelles conditions EWMA est-il un cas particulier de GARCH(1,1) ?
20. Que signifie le « (1,1) » ? Qu'est-ce que GARCH($p,q$) ?
21. Refaire l'exemple 22.2 en entier, y compris la mise à jour.
22. Quel poids GARCH(1,1) donne-t-il à $u_{n-i}^2$ ?
23. Comment interpréter $\beta$ ? À quoi est-il analogue ?
24. Écrire le processus stochastique équivalent, avec $a$ et $\xi$.
25. Quel est le signe du drift quand $V>V_L$ ?
26. Quel est l'argument théorique en faveur de GARCH sur EWMA ?
27. Que faire si le $\omega$ optimal est négatif ?
28. Énoncer le principe du maximum de vraisemblance.
29. Refaire l'exemple des dix actions et montrer que $p=0{,}1$.
30. Dériver l'estimateur de variance constante par maximum de vraisemblance.
31. Pourquoi maximise-t-on le **logarithme** de la vraisemblance ?
32. Écrire (22.12) et dire en quoi elle diffère de (22.11).
33. Décrire les six colonnes du tableur de la table 22.1.
34. Comment amorce-t-on la récurrence des variances ?
35. Quels sont les paramètres optimaux trouvés sur le S&P 500, et la valeur de l'objectif ?
36. Calculer $V_L$ et la volatilité de long terme correspondante.
37. Qu'est-ce que le *variance targeting*, et combien de paramètres reste-t-il à estimer ?
38. Quelles valeurs obtient-on par variance targeting ? Perd-on beaucoup ?
39. Quelle valeur de $\lambda$ maximise la vraisemblance sur les mêmes données ?
40. Quelle astuce Hull donne-t-il pour faire fonctionner Solver ?
41. Sur quelle série teste-t-on l'autocorrélation **avant** le modèle ? Et **après** ?
42. Écrire la statistique de Ljung-Box et le poids $w_k$.
43. Quel est le seuil de rejet pour $K=15$ ?
44. Quelles valeurs obtient-on pour les deux séries du S&P 500 ? Conclusion ?
45. Dériver la formule de prévision (22.13).
46. Quelle propriété de $u_{n+t-1}^2$ utilise-t-on dans cette dérivation ?
47. Que devient la prévision dans le cas EWMA ?
48. Que se passe-t-il si $\alpha+\beta>1$ ? Quel nom donne-t-on à ce comportement ?
49. Calculer la variance espérée à 10 et à 500 jours pour le S&P 500 avec $V(0)=0{,}0003$.
50. Écrire (22.14) et dire ce que représente $\sigma(T)$.
51. Que vaut $a$ pour le S&P 500 ?
52. Quelle est la pente de la structure par terme si la volatilité courante est au-dessus de $V_L$ ?
53. Reproduire la table 22.3 pour $T=10$ et $T=500$.
54. Écrire (22.15) et l'appliquer à un choc de 1 % sur une option de 30 jours.
55. Comment les institutions utilisent-elles la table 22.4 pour le calcul du vega ?
56. Écrire les définitions de la corrélation et de la covariance.
57. Pourquoi la covariance est-elle la « variable fondamentale » de l'analyse ?
58. Écrire la mise à jour EWMA d'une covariance, puis sa version GARCH(1,1).
59. Refaire l'exemple 22.3 en entier, les six étapes.
60. Pourquoi ne met-on jamais à jour une corrélation directement ?
61. Énoncer la condition (22.17) et le nom de la propriété.
62. Pourquoi $\mathbf w^{\mathsf T}\Omega\mathbf w$ ne peut-il pas être négatif ?
63. Quelle règle pratique garantit une matrice cohérente ?
64. Montrer que la matrice de Hull n'est pas semi-définie positive avec $\mathbf w=(1,1,-1)$.
65. Énoncer le critère de cohérence en dimension 3 et l'appliquer.
66. Quelles sont les deux paires les plus corrélées dans le portefeuille des quatre indices ?
67. Quelle VaR obtient-on en équipondéré ? en EWMA ? Comment se comparent-elles à la simulation historique ?
68. Donner les deux raisons de l'écart entre les deux VaR.
69. Comparer les volatilités quotidiennes des tables 22.8.
70. Qu'observe-t-on sur les corrélations entre les tables 22.5 et 22.9, et quel phénomène général cela illustre-t-il ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Que signifie $\sigma_n$ ? | La volatilité du **jour $n$**, estimée **fin du jour $n-1$** |
| Taux de variance ? | $\sigma_n^2$ |
| $u_i$ pour le suivi quotidien ? | $(S_i-S_{i-1})/S_{i-1}$ |
| Les trois modifications de (22.1) ? | Variation **en %** · $\bar u=0$ · $m-1\to m$ |
| Que devient l'estimateur ? | Celui du **maximum de vraisemblance** |
| Contraintes sur les poids ? | $\alpha_i>0$, décroissants, **somme = 1** |
| ARCH($m$) ? | $\sigma_n^2=\gamma V_L+\sum\alpha_iu_{n-i}^2$ |
| Auteur d'ARCH ? | **Engle**, 1982 |
| Que vaut $\omega$ ? | $\gamma V_L$ |
| Formule EWMA ? | $\sigma_n^2=\lambda\sigma_{n-1}^2+(1-\lambda)u_{n-1}^2$ |
| Poids EWMA sur $u_{n-i}^2$ ? | $(1-\lambda)\lambda^{i-1}$ |
| Terme négligé dans la dérivation ? | $\lambda^m\sigma_{n-m}^2$ |
| Exemple 22.1 : résultat ? | $\sigma_n^2=0{,}00013$ → **1,14 %** |
| Pourquoi la volatilité monte ? | $u_{n-1}^2>\sigma_{n-1}^2$ (réalisé **au-dessus** de l'espéré) |
| Avantage de stockage de l'EWMA ? | Ne garder que **la variance courante** et **la dernière observation** |
| $\lambda$ faible ? | Estimations **très volatiles** |
| $\lambda$ élevé ? | Réponse **lente** à l'information |
| $\lambda$ de RiskMetrics ? | **0,94** |
| Année de publication ? | **1994**, par **J. P. Morgan** |
| Variance réalisée chez RiskMetrics ? | Moyenne équipondérée des $u_i^2$ des **25 jours suivants** |
| GARCH(1,1) ? | $\sigma_n^2=\omega+\alpha u_{n-1}^2+\beta\sigma_{n-1}^2$ |
| Auteur, année ? | **Bollerslev**, **1986** |
| Somme des poids ? | $\gamma+\alpha+\beta=1$ |
| Condition de stabilité ? | $\alpha+\beta<1$ |
| $V_L$ ? | $\omega/(1-\alpha-\beta)$ |
| EWMA en langage GARCH ? | $\gamma=0$, $\alpha=1-\lambda$, $\beta=\lambda$ |
| Sens de « (1,1) » ? | **1** observation de $u^2$, **1** estimation de variance |
| Le plus populaire des GARCH ? | **GARCH(1,1)** |
| Ex. 22.2 : $\gamma$, $V_L$, $\sigma_{LT}$ ? | $0{,}01$ · $0{,}0002$ · **1,4 % par jour** |
| Ex. 22.2 : nouvelle volatilité ? | **1,53 %** par jour |
| Poids GARCH sur $u_{n-i}^2$ ? | $\alpha\beta^{i-1}$ |
| Interprétation de $\beta$ ? | Un **taux de décroissance**, analogue à $\lambda$ |
| Processus continu équivalent ? | $dV=a(V_L-V)dt+\xi V\,dz$ |
| Que valent $a$ et $\xi$ ? | $a=1-\alpha-\beta$ · $\xi=\alpha\sqrt2$ |
| Drift si $V>V_L$ ? | **Négatif** |
| Avantage théorique de GARCH ? | Il intègre le **retour à la moyenne** |
| Si $\omega$ optimal &lt; 0 ? | GARCH **instable** → basculer sur **EWMA** |
| Principe du maximum de vraisemblance ? | Choisir les paramètres qui **maximisent la chance** des données observées |
| Exemple des 10 actions ? | Maximiser $p(1-p)^9$ → $p=\mathbf{0{,}1}$ |
| Vraisemblance d'une observation normale ? | $\frac{1}{\sqrt{2\pi v}}e^{-u_i^2/2v}$ |
| Objectif à maximiser (variance constante) ? | $\sum[-\ln v-u_i^2/v]$ |
| Estimateur obtenu ? | $\frac1m\sum u_i^2$ |
| Objectif GARCH (22.12) ? | $\sum[-\ln v_i-u_i^2/v_i]$ |
| Différence avec (22.11) ? | $v$ devient $v_i$ |
| Résolution ? | **Recherche itérative** (Solver, Levenberg-Marquardt) |
| Amorce du tableur ? | $v_3=u_2^2$ |
| Période des données S&P 500 ? | 18 juillet 2005 → 13 août 2010 (**1 279 jours**) |
| Paramètres optimaux ? | $\omega=0{,}000001366$, $\alpha=0{,}083394$, $\beta=0{,}910116$ |
| Valeur de l'objectif ? | **10 228,2349** |
| $\alpha+\beta$ ? | **0,99351** |
| $V_L$ et volatilité de long terme ? | **0,0002075** → **1,4404 %** par jour |
| Volatilité max pendant la crise ? | Jusqu'à **5 % par jour** |
| Variance targeting ? | Fixer $V_L$ = variance d'échantillon ; $\omega=V_L(1-\alpha-\beta)$ |
| Combien de paramètres restent ? | **Deux** |
| Résultat sur le S&P 500 ? | $\alpha=0{,}08445$, $\beta=0{,}9101$, objectif **10 228,1941** |
| Variance d'échantillon ? | **0,0002412** → 1,5531 % par jour |
| $\lambda$ optimal par MV ? | **0,9374**, objectif **10 192,5104** |
| Astuce Solver ? | Structurer pour que les paramètres aient des **valeurs comparables** |
| Risque de Solver ? | Un **maximum local** — tester plusieurs départs |
| Série testée avant le modèle ? | $u_i^2$ |
| Série testée après ? | $u_i^2/\sigma_i^2$ |
| Statistique de Ljung-Box ? | $m\sum_kw_k\eta_k^2$, $w_k=(m+2)/(m-k)$ |
| Seuil pour $K=15$ ? | **25** |
| LB pour $u_i^2$ ? | **≈ 1 566** — forte autocorrélation |
| LB pour $u_i^2/\sigma_i^2$ ? | **21,7** — autocorrélation largement supprimée |
| Formule de prévision ? | $E[\sigma_{n+t}^2]=V_L+(\alpha+\beta)^t(\sigma_n^2-V_L)$ |
| Propriété utilisée ? | $E[u_{n+t-1}^2]=\sigma_{n+t-1}^2$ |
| Prévision EWMA ? | La variance future espérée **= la variance courante** |
| Si $\alpha+\beta>1$ ? | Processus ***« mean fleeing »*** |
| Prévision S&P à 10 jours ? | **0,0002942** → 1,72 %/jour |
| À 500 jours ? | **0,0002110** → 1,45 %/jour |
| $a$ dans la structure par terme ? | $\ln[1/(\alpha+\beta)]$ |
| $a$ pour le S&P 500 ? | **0,006511** |
| Formule (22.14) ? | $\sigma(T)^2=252[V_L+\frac{1-e^{-aT}}{aT}(V(0)-V_L)]$ |
| Table 22.3 à 10 jours ? | **27,36 %** |
| À 500 jours ? | **24,32 %** |
| $\sigma(0)$ ? | $\sqrt{252\times0{,}0003}=\mathbf{27{,}50\,\%}$ |
| Pente si $\sigma$ courante &gt; long terme ? | **Décroissante** |
| Formule d'impact (22.15) ? | $\frac{1-e^{-aT}}{aT}\frac{\sigma(0)}{\sigma(T)}\Delta\sigma(0)$ |
| Impact d'un choc de 1 % à 10 jours ? | **0,97 %** |
| À 500 jours ? | **0,33 %** |
| Usage pratique ? | Calculer le **vega par maturité**, pas un choc uniforme |
| Covariance ? | $E[(X-\mu_X)(Y-\mu_Y)]$ |
| Variable fondamentale de l'analyse ? | La **covariance**, pas la corrélation |
| Covariance EWMA ? | $\lambda\text{cov}_{n-1}+(1-\lambda)x_{n-1}y_{n-1}$ |
| Covariance GARCH(1,1) ? | $\omega+\alpha x_{n-1}y_{n-1}+\beta\text{cov}_{n-1}$ |
| Covariance de long terme ? | $\omega/(1-\alpha-\beta)$ |
| Ex. 22.3 : $\text{cov}_{n-1}$ ? | $0{,}6\times0{,}01\times0{,}02=\mathbf{0{,}00012}$ |
| Ex. 22.3 : nouvelles volatilités ? | **0,981 %** et **2,028 %** |
| Ex. 22.3 : nouvelle covariance ? | **0,00012025** |
| Ex. 22.3 : nouvelle corrélation ? | **0,6044** |
| Méthode à suivre ? | Mettre à jour **les trois** quantités, **recomposer** ensuite |
| Condition de cohérence ? | $\mathbf w^{\mathsf T}\Omega\mathbf w\geqslant0$ pour tout $\mathbf w$ |
| Nom de la propriété ? | **Semi-définie positive** |
| Pourquoi ? | C'est la **variance** de $\sum w_ix_i$ |
| Règle pratique ? | **Même schéma** de pondération pour variances **et** covariances |
| Contre-exemple de Hull ? | $\rho_{13}=\rho_{23}=0{,}9$ mais $\rho_{12}=0$ |
| Vecteur qui le démasque ? | $\mathbf w=(1,1,-1)$ → $\mathbf w^{\mathsf T}\Omega\mathbf w=\mathbf{-0{,}60}$ |
| Critère $3\times3$ ? | $\rho_{12}^2+\rho_{13}^2+\rho_{23}^2-2\rho_{12}\rho_{13}\rho_{23}\leqslant1$ |
| Sa valeur ici ? | **1,62** &gt; 1 — violé |
| Paire la plus corrélée (équipondéré) ? | **FTSE 100 / CAC 40** à **0,918** |
| Indice le moins corrélé ? | Le **Nikkei 225** |
| VaR équipondérée des 4 indices ? | **217 757 dollars** |
| VaR EWMA ? | **471 025 dollars** — plus du **double** |
| VaR par simulation historique ? | **253 385 dollars** |
| Les deux causes de l'écart ? | Volatilités **plus élevées** et corrélations **plus élevées** |
| Volatilité EWMA du FTSE ? | **3,21 %** contre 1,42 % en équipondéré |
| Corrélation FTSE/CAC en EWMA ? | **0,971** contre 0,918 |
| Le phénomène général ? | *Les corrélations **augmentent** dans les conditions de marché adverses* |
