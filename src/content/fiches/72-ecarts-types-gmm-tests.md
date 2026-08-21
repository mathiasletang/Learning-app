# Fiche 72 — Écarts-types et tests par GMM : méthode delta, Newey-West et test du khi-deux

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Kogan, *15.450 Analytics of Finance*, MIT Sloan / OpenCourseWare, automne 2010 — cours 8 « Standard Errors and Tests » |
| **Difficulté** | Must know — sans écarts-types corrects, aucune conclusion n'est valide |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 71 (GMM, QMLE), fiche 65 (tests, $\chi^2$), fiche 50 (MCO, hétéroscédasticité) |
| **Concepts clés** | Méthode delta, ratio de Sharpe, matrice $d$ et matrice $S$, variance asymptotique du GMM, MCO comme GMM, écarts-types robustes, autocorrélation des moments, estimateur de Newey-West, fenêtre $k$, prévisibilité à long horizon, moindres carrés non linéaires, taille d'un test, test du khi-deux |
| **Poids à l'examen** | Trois choses : la **méthode delta** et son application au ratio de Sharpe ; la formule $T\,\mathrm{Var}[\hat\theta]=(\hat d^\top\hat S^{-1}\hat d)^{-1}$ ; et l'**estimateur de Newey-West** avec le rôle de $k$. |

## 🎯 Vue d'ensemble

```
ESTIMER θ̂          ← fiche 71 (MLE, QMLE, GMM)
CALCULER SES ÉCARTS-TYPES   ← cette fiche
   GMM :   T·Var[θ̂] = (d̂ᵀ Ŝ⁻¹ d̂)⁻¹
   f corrélés dans le temps ?  → NEWEY-WEST
FONCTION DE θ̂ ?    → MÉTHODE DELTA :  Var[h(θ̂)] = A Ω Aᵀ
TESTER              → ξ = h(θ̂)ᵀ V̂⁻¹ h(θ̂) ~ χ²(dim h)
```

> **Le message central du cours, énoncé dans sa discussion sur la régression.** *Les MCO classiques reposent sur des hypothèses **très restrictives**. En pratique, les variables explicatives sont stochastiques et **non décorrélées des résidus retardés**. Le GMM fournit un cadre puissant : **les MCO restent valides tant que les conditions de moment le sont**. Il est **essentiel de traiter les écarts-types correctement** — le GMM offre une recette générale.*

## 🟡 Concept 1 — Notations et rappels

**Notations vectorielles.** $\theta$ est toujours un vecteur **colonne**, $\theta^\top=(\theta_1\ \dots\ \theta_N)$. Pour une fonction scalaire régulière $h(\theta)$ :

$$\frac{\partial h(\theta)}{\partial\theta}=\begin{pmatrix}\frac{\partial h}{\partial\theta_1}\\\vdots\\\frac{\partial h}{\partial\theta_N}\end{pmatrix}, \qquad \frac{\partial h(\theta)}{\partial\theta^\top}\equiv\left(\frac{\partial h}{\partial\theta_1}\ \cdots\ \frac{\partial h}{\partial\theta_N}\right)$$

Et pour un vecteur de fonctions $h(\theta)=(h_1(\theta),\dots,h_M(\theta))^\top$, la **jacobienne**

$$\frac{\partial h(\theta)}{\partial\theta^\top}=\begin{pmatrix}\frac{\partial h_1}{\partial\theta_1}&\cdots&\frac{\partial h_1}{\partial\theta_N}\\ \vdots&\ddots&\vdots\\ \frac{\partial h_M}{\partial\theta_1}&\cdots&\frac{\partial h_M}{\partial\theta_N}\end{pmatrix}$$

**Rappels sur la loi normale multivariée.**

- *Les combinaisons linéaires de variables normales sont normales* : $x\sim N(0,\Omega)\Rightarrow Ax\sim N(0,A\Omega A^\top)$.
- *La somme des carrés de $n$ variables $N(0,1)$ indépendantes suit une loi $\chi^2$ à $n$ degrés de liberté* : $\varepsilon\sim N(0,I)\Rightarrow\varepsilon^\top\varepsilon\sim\chi^2(\dim\varepsilon)$.
- *Forme quadratique d'un vecteur normal* : $x\sim N(0,\Omega)\Rightarrow x^\top\Omega^{-1}x\sim\chi^2(\dim x)$.
- Densité : $\phi(x)=\big((2\pi)^N\lvert\Omega\rvert\big)^{-1/2}e^{-\frac12(x-\mu)^\top\Omega^{-1}(x-\mu)}$.

> **Ces trois faits sont exactement les briques dont on aura besoin.** Le premier justifie la méthode delta ; le troisième produit toutes les statistiques de test du concept 9.

## 🔴 Concept 2 — La méthode delta

> **Le problème.** *Étant donné l'estimateur $\hat\theta$, on veut la loi asymptotique du vecteur de fonctions régulières $h(\hat\theta)$.*

**L'idée.** *Localement, une fonction régulière est approximativement **linéaire*** :

$$h(\hat\theta)\approx h(\theta_0)+\left.\frac{\partial h(\theta)}{\partial\theta^\top}\right\vert_{\theta_0}\big(\hat\theta-\theta_0\big)$$

**La conclusion.** Si $\hat\theta-\theta_0\sim N(0,\Omega)$ avec $\Omega=\mathrm{Var}(\hat\theta)$ petite (proportionnelle à $1/T$), alors

$$\boxed{\ h(\hat\theta)-h(\theta_0)\sim N\big(0,\ A\Omega A^\top\big), \qquad A=\left.\frac{\partial h(\theta)}{\partial\theta^\top}\right\vert_{\theta_0}\ }$$

*En pratique, on remplace $A$ et $\Omega$ par des estimations consistantes $\hat A=\left.\frac{\partial h(\theta)}{\partial\theta^\top}\right\vert_{\hat\theta}$ et $\hat\Omega$ :*

$$h(\hat\theta)-h(\theta_0)\sim N\big(0,\ \hat A\hat\Omega\hat A^\top\big)$$

> **C'est le même énoncé qu'en fiches 65 et 67** — $\Gamma=\nabla g^\top\Sigma\nabla g$ — avec la convention jacobienne. Le mécanisme est toujours le développement de Taylor au premier ordre : la variance se **transporte par le gradient**.

### L'exemple du ratio de Sharpe

On estime la moyenne et l'écart-type des rendements excédentaires, $(\hat\mu,\hat\sigma)$, de matrice de variance-covariance asymptotique estimée $\hat\Omega$. Le ratio de Sharpe est

$$\widehat{SR}=h(\hat\theta)\equiv\frac{\hat\mu}{\hat\sigma}$$

**Le gradient.**

$$\hat A=\left.\frac{\partial h(\theta)}{\partial\theta^\top}\right\vert_{\hat\theta}=\left(\frac{1}{\hat\sigma}\quad -\frac{\hat\mu}{\hat\sigma^2}\right)$$

**La variance.**

$$\mathrm{Var}\big(\widehat{SR}\big)=\left(\frac{1}{\hat\sigma}\quad-\frac{\hat\mu}{\hat\sigma^2}\right)\hat\Omega\begin{pmatrix}\frac{1}{\hat\sigma}\\[4pt]-\frac{\hat\mu}{\hat\sigma^2}\end{pmatrix}$$

## 🔴 Concept 3 — Les écarts-types du GMM

> *Sous des conditions de régularité faibles, les estimations GMM sont **consistantes** : $\hat\theta\to\theta_0$ en probabilité quand $T\to\infty$.*

**Les deux matrices centrales.**

$$\hat d=\left.\frac{\partial\hat{\mathbb E}\big(f(x_t,\theta)\big)}{\partial\theta^\top}\right\vert_{\hat\theta}, \qquad \hat S=\hat{\mathbb E}\Big[f(x_t,\hat\theta)f(x_t,\hat\theta)^\top\Big]$$

> **Normalité asymptotique du GMM.**
>
> $$\boxed{\ \sqrt T\big(\hat\theta-\theta_0\big)\ \Rightarrow\ N\Big(0,\ \big(\hat d^\top\hat S^{-1}\hat d\big)^{-1}\Big)\ }$$
>
> *Les écarts-types se lisent sur la matrice de variance-covariance asymptotique :*
>
> $$T\,\mathrm{Var}\big[\hat\theta\big]\approx\big(\hat d^\top\hat S^{-1}\hat d\big)^{-1}$$

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment lire les deux matrices.</span>

- $\hat d$ mesure la **sensibilité des moments au paramètre** : $\partial\mathbb E[f]/\partial\theta^\top$. Si les moments réagissent fortement à $\theta$, une petite erreur sur les moments cause une petite erreur sur $\theta$ — bonne identification.
- $\hat S$ mesure la **variabilité des moments eux-mêmes**. Plus les $f(x_t,\hat\theta)$ sont bruités, plus l'estimation est imprécise.

La formule $(\hat d^\top\hat S^{-1}\hat d)^{-1}$ combine les deux exactement comme il faut : elle **croît** avec $S$ et **décroît** avec $d$.

**Et la structure est celle de l'information de Fisher** (fiche 64) : $\hat d^\top\hat S^{-1}\hat d$ joue le rôle de $I(\theta)$, et la variance est son inverse.

</div>

### L'exemple moyenne et écart-type

Avec $f_1(x_t,\theta)=x_t-\mu$ et $f_2(x_t,\theta)=(x_t-\mu)^2-\sigma^2$ :

$$\hat d=\begin{pmatrix}-1&0\\ -2\big(\hat{\mathbb E}(x_t)-\hat\mu\big)&-2\hat\sigma\end{pmatrix}=\begin{pmatrix}-1&0\\ 0&-2\hat\sigma\end{pmatrix}$$

(le terme hors diagonale s'annule **par définition de $\hat\mu$**), et

$$\hat S=\hat{\mathbb E}\big[f(x_t,\hat\theta)f(x_t,\hat\theta)^\top\big]=\hat{\mathbb E}\begin{pmatrix}f_1^2&f_1f_2\\ f_1f_2&f_2^2\end{pmatrix}$$

d'où $\hat\theta-\theta_0\sim N\big(0,\frac1T\hat V\big)$ avec $\hat V=\big(\hat d^\top\hat S^{-1}\hat d\big)^{-1}$.

**Le cas gaussien.** *Pour une loi gaussienne, $\mathbb E[(x-\mu_0)^3]=0$ et $\mathbb E[(x-\mu_0)^4]=3\sigma_0^4$.* Par la LGN,

$$\mathrm{plim}\ \hat d=d\equiv\begin{pmatrix}-1&0\\0&-2\sigma_0\end{pmatrix}, \qquad \mathrm{plim}\ \hat S=S\equiv\begin{pmatrix}\sigma_0^2&0\\0&2\sigma_0^4\end{pmatrix}$$

$$\mathrm{plim}\ \hat V=\big(d^\top S^{-1}d\big)^{-1}=\begin{pmatrix}\sigma_0^2&0\\0&\frac12\sigma_0^2\end{pmatrix}$$

> **Deux résultats classiques tombent d'un coup.** $\mathrm{Var}(\hat\mu)\approx\sigma_0^2/T$ — la variance de la moyenne empirique — et $\mathrm{Var}(\hat\sigma)\approx\sigma_0^2/(2T)$. Le second est **moins connu** et très utile : l'écart-type s'estime **deux fois plus précisément** que la moyenne, en variance relative.
>
> **Et le terme $\mathbb E[(x-\mu_0)^4]=3\sigma_0^4$ est celui qui produit le $2\sigma_0^4$** dans $S$ : $\mathrm{Var}\big[(x-\mu)^2\big]=3\sigma^4-\sigma^4=2\sigma^4$. Sur des données à **queues épaisses**, ce moment d'ordre 4 est plus grand, donc l'écart-type est estimé **moins précisément** — un point crucial en finance.

## 🟠 Concept 4 — Intervalles de confiance et vérification par simulation

*Des intervalles de confiance à $95\,\%$ se construisent comme*

$$\widehat{CI}(\theta_i)=\Big[\hat\theta_i-1{,}96\times SE(\hat\theta_i),\ \hat\theta_i+1{,}96\times SE(\hat\theta_i)\Big], \qquad i=1,2$$

*Asymptotiquement, ils devraient contenir les vraies valeurs avec probabilité $95\,\%$.*

> **La question que le cours pose — et résout empiriquement.** *Ces intervalles sont-ils bons en **échantillon fini** ? Faisons une expérience de Monte-Carlo : simulons $N$ échantillons artificiels indépendants et calculons la **fréquence de couverture**.*
>
> **Résultat sur $100\,000$ simulations : les fréquences de couverture sont $(0{,}945\ ;\ 0{,}929)$.**

⚠️ **Lisez ces deux nombres attentivement.** L'intervalle pour $\hat\mu$ couvre $94{,}5\,\%$ du temps — très proche du $95\,\%$ nominal. Celui pour $\hat\sigma$ ne couvre que $92{,}9\,\%$ : il est **trop étroit**. La théorie asymptotique est donc **moins fiable pour l'écart-type que pour la moyenne** à taille d'échantillon finie.

> **La leçon de méthode est générale** : la normalité asymptotique est une **approximation**, et la seule façon de savoir si elle tient est de **simuler**. C'est aussi ce que fait le bootstrap (cours 9 du même corpus).

### La variance asymptotique du ratio de Sharpe

Dans le cas gaussien, $\hat\Omega=\frac1T\begin{pmatrix}\sigma^2&0\\0&\frac12\sigma^2\end{pmatrix}$, et la méthode delta donne

$$\mathrm{Var}\big(\widehat{SR}\big)=\left(\frac1{\hat\sigma}\quad-\frac{\hat\mu}{\hat\sigma^2}\right)\hat\Omega\begin{pmatrix}\frac1{\hat\sigma}\\[3pt]-\frac{\hat\mu}{\hat\sigma^2}\end{pmatrix}=\boxed{\ \frac1T\left(1+\frac{\widehat{SR}^2}{2}\right)\ }$$

> **Cette formule est d'un usage constant en gestion.** L'écart-type du ratio de Sharpe estimé vaut environ $\sqrt{(1+SR^2/2)/T}$. Pour $SR=0{,}5$ et $T=60$ mois, cela fait $\approx0{,}134$ — soit un intervalle de confiance à $95\,\%$ de $[0{,}24\ ;\ 0{,}76]$. **Cinq ans de données ne permettent pas de distinguer un gérant médiocre d'un excellent.** C'est la traduction quantitative de la remarque de la fiche 62 sur le temps qu'il faut à la dérive pour émerger du bruit.

## 🔴 Concept 5 — Les MCO comme cas particulier du GMM

**Le modèle linéaire** $y_t=x_t^\top\beta+u_t$. *Les MCO reposent sur l'hypothèse que les résidus sont de moyenne nulle conditionnellement aux variables explicatives **et les uns aux autres** :*

$$\mathbb E\big[u_t\mid x_t,x_{t-1},\dots,u_{t-1},u_{t-2},\dots\big]=0$$

**En posant** $f(x_t,y_t,\beta)=x_t\big(y_t-x_t^\top\beta\big)$, on obtient une condition de moment valide, par espérances itérées :

$$\mathbb E\big[x_t(y_t-x_t^\top\beta)\big]=\mathbb E[x_tu_t]=\mathbb E\big[x_t\,\mathbb E[u_t\mid x_t]\big]=0$$

**L'estimateur GMM.**

$$\hat{\mathbb E}\big[x_t(y_t-x_t^\top\beta)\big]=0 \qquad\Longrightarrow\qquad \hat\beta=\hat{\mathbb E}\big(x_tx_t^\top\big)^{-1}\hat{\mathbb E}\big(x_ty_t\big)$$

*qui est l'estimateur MCO standard.*

**Les écarts-types.**

$$\hat S=\hat{\mathbb E}\big(f_tf_t^\top\big)=\hat{\mathbb E}\big(\hat u_t^2\,x_tx_t^\top\big), \qquad \hat u_t\equiv y_t-x_t^\top\hat\beta, \qquad \hat d=\frac{\partial\hat{\mathbb E}[f]}{\partial\beta^\top}=-\hat{\mathbb E}\big(x_tx_t^\top\big)$$

d'où

$$\boxed{\ \mathrm{Var}\big[\hat\beta\big]=\frac1T\big(\hat d^\top\hat S^{-1}\hat d\big)^{-1}=\frac1T\hat{\mathbb E}\big(x_tx_t^\top\big)^{-1}\hat{\mathbb E}\big(\hat u_t^2x_tx_t^\top\big)\hat{\mathbb E}\big(x_tx_t^\top\big)^{-1}\ }$$

> **C'est l'estimateur robuste à l'hétéroscédasticité — la formule « sandwich » de White.** Comparez avec la formule classique $\hat\sigma^2\hat{\mathbb E}(x_tx_t^\top)^{-1}$ de la fiche 50 : elle suppose $\mathbb E[u_t^2\mid x_t]=\sigma^2$ **constante**. Ici, $\hat{\mathbb E}(\hat u_t^2x_tx_t^\top)$ **n'impose rien** sur la variance conditionnelle.
>
> **Le nom « sandwich » vient de la forme** : $\hat{\mathbb E}(xx^\top)^{-1}$ · **garniture** · $\hat{\mathbb E}(xx^\top)^{-1}$. Si la variance est effectivement constante, la garniture se réduit à $\sigma^2\hat{\mathbb E}(xx^\top)$ et l'on retrouve la formule classique.

## 🔴 Concept 6 — Observations corrélées et Newey-West

> *Quand les $f(x_t,\theta)$ sont **corrélés dans le temps**, les formules d'écarts-types doivent être **ajustées** pour tenir compte de l'autocorrélation. **Les observations corrélées affectent la taille effective de l'échantillon**.*

La relation

$$\mathrm{Var}\big[\hat\theta\big]=\frac1T\big(\hat d^{-1}\hat S\,\hat d^{\top-1}\big)=\frac1T\big(\hat d^\top\hat S^{-1}\hat d\big)^{-1}$$

*reste valide. Mais il faut **modifier l'estimation de $\hat S$**.* En échantillon infini,

$$S=\sum_{j=-\infty}^{\infty}\mathbb E\Big[f(x_t,\theta_0)f(x_{t-j},\theta_0)^\top\Big]$$

> **Procédure de Newey-West.**
>
> $$\boxed{\ \hat S=\sum_{j=-k}^{k}\frac{k-\lvert j\rvert}{k}\cdot\frac1T\sum_{t=1}^Tf(x_t,\hat\theta)f(x_{t-j},\hat\theta)^\top\ }$$
>
> *(en abandonnant les termes hors domaine.)*
>
> - *$k$ est le paramètre de **largeur de fenêtre**. Plus l'échantillon est grand, plus $k$ doit être grand ; le taux de croissance suggéré est $k\propto T^{1/3}$.*
> - *En échantillon fini, il faut $k$ **petit devant $T$** mais **assez grand** pour couvrir la portée de la dépendance temporelle.*
> - ***Considérer plusieurs valeurs de $k$ et comparer les résultats.***

> **Deux points à comprendre sur cette formule.**
>
> - **Pourquoi sommer sur $j$ ?** Parce que la variance d'une somme de termes corrélés n'est pas la somme des variances : il faut ajouter toutes les **autocovariances**. C'est exactement $\mathrm{var}(a+b)=\mathrm{var}(a)+\mathrm{var}(b)+2\mathrm{cov}(a,b)$ de la fiche 55, généralisé.
> - **Pourquoi la pondération triangulaire $\frac{k-\lvert j\rvert}{k}$ ?** Elle décroît linéairement avec le retard et s'annule en $j=k$. Ce n'est pas cosmétique : cette pondération **garantit que $\hat S$ soit semi-définie positive**, ce qu'une troncature brutale ne ferait pas — et une matrice de covariance négative n'aurait aucun sens.

### Les MCO à résidus autocorrélés

Modèle $y_t=x_t^\top\beta+u_t$ avec $\mathbb E[u_t\mid x_t,x_{t-1},\dots]=0$, *mais en autorisant $u_t$ à être **autocorrélé***. Comme $f(x_t,\theta)=x_tu_t$ :

$$\hat S=\sum_{j=-k}^{k}\frac{k-\lvert j\rvert}{k}\cdot\frac1T\sum_t\hat u_t\,x_tx_{t-j}^\top\,\hat u_{t-j}$$

et la matrice de variance-covariance asymptotique des coefficients est

$$\mathrm{Var}\big[\hat\beta\big]=\frac1T\hat{\mathbb E}\big(x_tx_t^\top\big)^{-1}\hat S\,\hat{\mathbb E}\big(x_tx_t^\top\big)^{-1}$$

## 🔴 Concept 7 — L'exemple de la prévisibilité à long horizon

> *On prédit les rendements du S&P 500 par le logarithme du ratio dividende / prix, sur $1934/01$–$2008/12$ :*
>
> $$r_{t\to t+h}=\alpha+\beta\ln\left(\frac DP\right)_{t-1}+u_{t+h}$$
>
> *Les rendements sont **cumulés** sur $6$ ou $12$ mois — somme de rendements mensuels.*

| $h$ | $\hat\beta$ | $k=0$ | $k=5$ | $k=12$ | $k=24$ | $k=36$ |
|---|---|---|---|---|---|---|
| **6** | $0{,}0530$ | $0{,}0089$ | $0{,}0185$ | $0{,}0215$ | $0{,}0233$ | $0{,}0232$ |
| **12** | $0{,}1067$ | $0{,}0129$ | $0{,}0297$ | $0{,}0378$ | $0{,}0428$ | $0{,}0431$ |

⚠️ **Ce tableau est le plus instructif de tout le cours. Lisez la première ligne de gauche à droite.** L'écart-type passe de $0{,}0089$ à $0{,}0233$ — il est **multiplié par plus de $2{,}5$** — simplement en tenant compte de l'autocorrélation. Le rapport $\hat\beta/SE$ passe de $6{,}0$ (très significatif) à $2{,}3$ (tout juste significatif).

> **Pour $h=12$, c'est pire encore** : de $8{,}3$ à $2{,}5$.
>
> **D'où vient cette autocorrélation ?** Les rendements sont **cumulés sur $h$ mois** avec des fenêtres **chevauchantes** : $r_{t\to t+6}$ et $r_{t+1\to t+7}$ partagent cinq mois de rendements. Les résidus sont donc mécaniquement autocorrélés jusqu'au retard $h-1$, et ignorer ce fait **sous-estime massivement** les écarts-types.
>
> **Notez aussi la stabilisation** : entre $k=24$ et $k=36$, les valeurs ne bougent presque plus. C'est le diagnostic que le cours recommande — *considérer plusieurs valeurs de $k$ et comparer* : quand $\hat S$ se stabilise, la fenêtre est assez large.

> **La discussion du cours.** *Les MCO classiques reposent sur des hypothèses très restrictives. En pratique, les variables explicatives sont stochastiques et non décorrélées des résidus retardés. Le GMM fournit un cadre puissant pour traiter les régressions : **les MCO sont valides tant que les conditions de moment le sont**. Il est important de **traiter les écarts-types correctement** — le GMM offre une recette générale.*

## 🟠 Concept 8 — MLE, QMLE et moindres carrés non linéaires comme GMM

**MLE et GMM.** Les conditions d'optimalité pour maximiser $\mathcal L(\theta)=\sum_{t=1}^T\ln p(x_t\mid\text{passé};\theta)$ sont $\sum_t\frac{\partial\ln p}{\partial\theta}=0$. En posant $f(x_t,\theta)=\frac{\partial\ln p(x_t\mid\text{passé};\theta)}{\partial\theta}$ — le **score** —, le MLE est un GMM.

> *Les scores sont **non corrélés dans le temps**, parce que $\mathbb E_t[f(x_{t+1},\theta_0)]=0$.* Les écarts-types s'obtiennent donc par les formules GMM **sans correction de Newey-West** :
>
> $$\hat d=\hat{\mathbb E}\left[\frac{\partial^2\ln p(x_t\mid\text{passé};\theta)}{\partial\theta\,\partial\theta^\top}\right], \qquad \hat S=\hat{\mathbb E}\left[\frac{\partial\ln p}{\partial\theta}\cdot\frac{\partial\ln p}{\partial\theta^\top}\right]$$
>
> $$T\,\mathrm{Var}\big[\hat\theta\big]=\big(\hat d^\top\hat S^{-1}\hat d\big)^{-1}$$

> **Reconnaissez les deux expressions de l'information de Fisher** de la fiche 64 : $\hat d$ est la hessienne moyenne, $\hat S$ la variance du score. Si le modèle est **correct**, l'identité de l'information donne $-\hat d=\hat S=I(\theta)$ et la formule se réduit à $I(\theta)^{-1}$. Si le modèle est **faux** — cas du QMLE —, les deux diffèrent, et c'est la formule sandwich qui donne les **bons** écarts-types.

**Les moindres carrés non linéaires.** Pour $y_t=h(x_t,\beta)+u_t$ avec $\mathbb E[u_t\mid x_t]=0$, on utilise le QMLE en faisant comme si $u_t\sim N(0,\sigma^2)$ i.i.d. :

$$\mathcal L(\beta)=\sum_{t=1}^T\left[-\ln\sqrt{2\pi\sigma^2}-\frac{\big(y_t-h(x_t,\beta)\big)^2}{2\sigma^2}\right]$$

Les conditions du premier ordre se lisent comme des conditions de moment GMM :

$$\hat\beta=\underset{\beta}{\arg\min}\ \hat{\mathbb E}\Big[\big(y_t-h(x_t,\beta)\big)^2\Big] \qquad\Longrightarrow\qquad \mathbb E\left[\frac{\partial h(x_t,\beta)}{\partial\beta}\big(y_t-h(x_t,\beta)\big)\right]=0$$

> **La question du cours, et sa réponse.** *Pourquoi ne pas choisir d'autres moments, par exemple $f=g(x_t)(y_t-h(x_t,\beta))$ avec $g$ à peu près arbitraire ?* *On pourrait. **Mais cela peut donner des estimations moins précises**, ou des conditions de moment **invalides**. De fait, **si les $u_t$ sont gaussiens, les MCNL sont optimaux**.*
>
> C'est la réponse à la question laissée ouverte en fiche 71 : parmi l'infinité d'instruments possibles, le **score** de la vraisemblance est celui qui donne l'estimateur le plus efficace.

## 🔴 Concept 9 — Les tests d'hypothèses

**Le cadre.** Échantillon d'observations indépendantes $x_1,\dots,x_T$ de loi $p(x,\theta_0)$. On veut tester une hypothèse nulle $H_0$ constituée de **restrictions** sur $\theta_0$ — par exemple $b^\top\theta_0=0$.

> *Un **test statistique** est une **règle de décision** rejetant l'hypothèse nulle si l'échantillon satisfait certaines conditions :*
>
> $$\text{Rejeter si } (x_1,\dots,x_T)\in A$$
>
> *La **taille du test** est la borne supérieure de la probabilité de rejeter l'hypothèse nulle, sur tous les cas où elle est correcte.* *L'**erreur de type I** est le rejet à tort de $H_0$ ; la taille du test est la probabilité maximale de rejet à tort.*

⚠️ **C'est exactement le **niveau** de la fiche 65** — la borne supérieure sur $\Theta_0$ de la probabilité de rejeter à tort.

> **Le test du khi-deux.** Pour tester $H_0:h(\theta)=0$ :
>
> 1. Estimer la variance-covariance de $h(\hat\theta)$, notée $\hat V$ — **par la méthode delta**.
> 2. Construire la statistique de test $$\boxed{\ \xi=h(\hat\theta)^\top\hat V^{-1}h(\hat\theta)\ \sim\ \chi^2\big(\dim h(\hat\theta)\big)\ }$$ *Rejeter $H_0$ si $\xi$ est suffisamment grand ; le seuil de rejet est déterminé par la taille souhaitée et la loi de $\xi$ sous $H_0$.*

> **La construction est immédiate à partir du concept 1** : si $h(\hat\theta)\sim N(0,\hat V)$ sous $H_0$, alors la forme quadratique $h^\top\hat V^{-1}h$ suit un $\chi^2$ de dimension $\dim h$. C'est exactement la statistique de **Wald** de la fiche 65, avec $\hat V^{-1}$ à la place de l'information de Fisher.

### Trois applications

**1. Test de non-prévisibilité.** Pour une régression prédictive $y_t=\beta_0+x_t^\top\beta+u_t$, on estime $\hat\beta$ par MCO et $\widehat{\mathrm{Var}}(\hat\beta)$ par **Newey-West**. Pour tester $H_0:\beta=0$ :

$$\xi=\hat\beta^\top\big(\widehat{\mathrm{Var}}(\hat\beta)\big)^{-1}\hat\beta\ \sim\ \chi^2\big(\dim\beta\big)$$

*Test de taille $\alpha$ : rejeter si $\xi\geq\bar\xi$, où $\mathrm{CDF}_{\chi^2(\dim\beta)}(\bar\xi)=1-\alpha$.*

**2. Test sur le ratio de Sharpe.** Pour tester $SR=SR_0$, en deux étapes :

1. *Par la méthode delta, dériver la variance asymptotique de $\widehat{SR}=\hat\mu/\hat\sigma$.*
2. Former $$\frac{\big(\widehat{SR}-SR_0\big)^2}{\mathrm{Var}\big(\widehat{SR}\big)}\ \sim\ \chi^2(1)$$

**3. Comparaison de deux ratios de Sharpe.** *Deux séries de rendements excédentaires produites sur la même période par deux stratégies. On ne connaît pas la loi exacte de chacune, mais on sait que les rendements sont **i.i.d. dans le temps** ; **contemporainement**, $x_t^1$ et $x_t^2$ peuvent être **corrélés**.*

On empile : $x_t=(x_t^1,x_t^2)^\top$, $\theta_0=(\mu^1_0,\sigma^1_0,\mu^2_0,\sigma^2_0)$, et

$$H_0:\ \frac{\mu^1_0}{\sigma^1_0}-\frac{\mu^2_0}{\sigma^2_0}=0$$

Avec $h(\theta)=\frac{\mu_1}{\sigma_1}-\frac{\mu_2}{\sigma_2}$, la méthode delta donne

$$\hat A=\left.\frac{\partial h(\theta)}{\partial\theta^\top}\right\vert_{\hat\theta}=\left(\frac{1}{\hat\sigma_1}\quad-\frac{\hat\mu_1}{\hat\sigma_1^2}\quad-\frac{1}{\hat\sigma_2}\quad\frac{\hat\mu_2}{\hat\sigma_2^2}\right)$$

$$\widehat{\mathrm{Var}}\big(h(\hat\theta)\big)=\hat A\,\hat\Omega\,\hat A^\top$$

puis $\xi=h(\hat\theta)^2/\widehat{\mathrm{Var}}(h(\hat\theta))\sim\chi^2(1)$.

> **L'élégance du procédé.** Il faut **empiler les deux séries** dans un même vecteur d'observations, ce qui permet à $\hat\Omega$ de capturer la **corrélation contemporaine** entre les deux stratégies. Comparer deux ratios de Sharpe estimés séparément, sans tenir compte de leur corrélation, donnerait un écart-type **faux** — trop grand si les stratégies sont positivement corrélées.

## Comment résoudre l'exercice type (protocole)

1. **Écrire les conditions de moment** $f(x_t,\theta)$ et vérifier leur validité.
2. **Estimer $\hat\theta$** en résolvant $\frac1T\sum_tf(x_t,\hat\theta)=0$.
3. **Calculer $\hat d=\partial\hat{\mathbb E}[f]/\partial\theta^\top$** et $\hat S$.
4. **Vérifier l'autocorrélation des $f_t$** : si elle est présente, utiliser **Newey-West** avec $k\propto T^{1/3}$ et **comparer plusieurs $k$**.
5. **En déduire** $T\,\mathrm{Var}[\hat\theta]=(\hat d^\top\hat S^{-1}\hat d)^{-1}$, puis les écarts-types.
6. **Pour une fonction de $\hat\theta$** : appliquer la **méthode delta**, $\mathrm{Var}[h(\hat\theta)]=\hat A\hat\Omega\hat A^\top$.
7. **Pour tester $h(\theta)=0$** : $\xi=h(\hat\theta)^\top\hat V^{-1}h(\hat\theta)\sim\chi^2(\dim h)$.
8. **En cas de doute sur la validité asymptotique** : vérifier par **simulation de Monte-Carlo** la fréquence de couverture.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « loi asymptotique d'une fonction de l'estimateur » | **méthode delta** |
| ratio de Sharpe, ratio d'information | delta, $\mathrm{Var}=\frac1T(1+SR^2/2)$ |
| « écarts-types d'un estimateur GMM » | $(\hat d^\top\hat S^{-1}\hat d)^{-1}/T$ |
| régression, variance conditionnelle inconnue | **sandwich de White** |
| rendements **cumulés** / fenêtres **chevauchantes** | **Newey-West** — sinon écarts-types faux |
| « quelle largeur de fenêtre ? » | $k\propto T^{1/3}$, et **comparer plusieurs $k$** |
| « tester $h(\theta)=0$ » | $\xi=h^\top\hat V^{-1}h\sim\chi^2(\dim h)$ |
| « les prédicteurs sont-ils significatifs ? » | $\chi^2$ sur $\beta=0$, écarts-types Newey-West |
| comparer deux stratégies | **empiler** les séries pour capturer la corrélation |
| « l'asymptotique est-elle fiable ici ? » | **Monte-Carlo**, fréquence de couverture |

### Exercices progressifs

**Niveau 1** — Dérivez la variance asymptotique du ratio de Sharpe par la méthode delta.

<details><summary>Correction</summary>

**Le cadre.** $\theta=(\mu,\sigma)^\top$, $h(\theta)=\mu/\sigma$, et dans le cas gaussien

$$\hat\Omega=\frac1T\begin{pmatrix}\sigma^2&0\\0&\frac12\sigma^2\end{pmatrix}$$

**Étape 1 — le gradient.**

$$\hat A=\left(\frac{\partial h}{\partial\mu}\quad\frac{\partial h}{\partial\sigma}\right)=\left(\frac{1}{\hat\sigma}\quad-\frac{\hat\mu}{\hat\sigma^2}\right)$$

**Étape 2 — la formule delta.**

$$\mathrm{Var}\big(\widehat{SR}\big)=\hat A\hat\Omega\hat A^\top=\frac1T\left[\frac{1}{\hat\sigma^2}\cdot\hat\sigma^2+\frac{\hat\mu^2}{\hat\sigma^4}\cdot\frac{\hat\sigma^2}{2}\right]=\frac1T\left[1+\frac{\hat\mu^2}{2\hat\sigma^2}\right]$$

**Étape 3 — conclure.**

$$\mathrm{Var}\big(\widehat{SR}\big)=\frac1T\left(1+\frac{\widehat{SR}^2}{2}\right)$$

**L'application numérique qui fait réfléchir.** Pour $SR=0{,}5$ et $T=60$ mois :

$$SE\big(\widehat{SR}\big)=\sqrt{\frac{1+0{,}125}{60}}=\sqrt{0{,}01875}\approx0{,}137$$

d'où un intervalle de confiance à $95\,\%$ de $[0{,}23\ ;\ 0{,}77]$.

**La conclusion pratique.** Cinq ans de données mensuelles **ne suffisent pas** à distinguer un gérant de ratio $0{,}25$ d'un gérant de ratio $0{,}75$. Il faudrait $T\approx1\,000$ mois — plus de $80$ ans — pour ramener l'écart-type à $0{,}03$. C'est la version chiffrée de la remarque de la fiche 62 : la dérive met très longtemps à émerger du bruit.

</details>

**Niveau 2** — Pourquoi l'estimateur sandwich des MCO ?

<details><summary>Correction</summary>

**La construction par GMM.** Avec $f(x_t,y_t,\beta)=x_t(y_t-x_t^\top\beta)$ :

$$\hat d=\frac{\partial\hat{\mathbb E}[f]}{\partial\beta^\top}=-\hat{\mathbb E}\big(x_tx_t^\top\big), \qquad \hat S=\hat{\mathbb E}\big(f_tf_t^\top\big)=\hat{\mathbb E}\big(\hat u_t^2x_tx_t^\top\big)$$

La formule générale $\mathrm{Var}[\hat\beta]=\frac1T(\hat d^\top\hat S^{-1}\hat d)^{-1}$ donne, comme $\hat d$ est symétrique,

$$\mathrm{Var}\big[\hat\beta\big]=\frac1T\hat{\mathbb E}\big(x_tx_t^\top\big)^{-1}\hat{\mathbb E}\big(\hat u_t^2x_tx_t^\top\big)\hat{\mathbb E}\big(x_tx_t^\top\big)^{-1}$$

**Le nom.** La forme est **pain – garniture – pain** : $\hat{\mathbb E}(xx^\top)^{-1}$ de part et d'autre de $\hat{\mathbb E}(\hat u^2xx^\top)$.

**Ce qu'il apporte par rapport à la formule classique.** La fiche 50 donne $\mathrm{Var}[\hat\beta]=\sigma^2(X^\top X)^{-1}$, qui suppose $\mathbb E[u_t^2\mid x_t]=\sigma^2$ **constante** — homoscédasticité. Le sandwich **n'impose rien** : $\hat{\mathbb E}(\hat u_t^2x_tx_t^\top)$ pondère chaque observation par son **résidu carré observé**, quelle que soit la structure de variance.

**La vérification du cas particulier.** Si la variance est bien constante, $\hat{\mathbb E}(\hat u_t^2x_tx_t^\top)\to\sigma^2\mathbb E(x_tx_t^\top)$, et la formule se réduit à

$$\frac1T\sigma^2\hat{\mathbb E}(x_tx_t^\top)^{-1}$$

— la formule classique. **Le sandwich la contient comme cas particulier.**

**Pourquoi c'est important en finance.** Les rendements présentent presque toujours de l'hétéroscédasticité (fiche 53). Utiliser la formule classique **sous-estime généralement** les écarts-types et fait conclure à tort à la significativité.

⚠️ **Et ce n'est pas suffisant.** Le sandwich corrige l'**hétéroscédasticité** mais pas l'**autocorrélation** des moments. Pour cela, il faut remplacer $\hat S$ par l'estimateur de **Newey-West** — c'est le concept 6.

</details>

**Niveau 3** — Interprétez le tableau de prévisibilité à long horizon.

<details><summary>Correction</summary>

**Le modèle.** $r_{t\to t+h}=\alpha+\beta\ln(D/P)_{t-1}+u_{t+h}$, S&P 500, $1934/01$–$2008/12$, rendements **cumulés** sur $h$ mois.

| $h$ | $\hat\beta$ | $k=0$ | $k=5$ | $k=12$ | $k=24$ | $k=36$ |
|---|---|---|---|---|---|---|
| **6** | $0{,}0530$ | $0{,}0089$ | $0{,}0185$ | $0{,}0215$ | $0{,}0233$ | $0{,}0232$ |
| **12** | $0{,}1067$ | $0{,}0129$ | $0{,}0297$ | $0{,}0378$ | $0{,}0428$ | $0{,}0431$ |

**Les statistiques de Student correspondantes**, $\hat\beta/SE$ :

| $h$ | $k=0$ | $k=5$ | $k=12$ | $k=24$ | $k=36$ |
|---|---|---|---|---|---|
| **6** | $6{,}0$ | $2{,}9$ | $2{,}5$ | $2{,}3$ | $2{,}3$ |
| **12** | $8{,}3$ | $3{,}6$ | $2{,}8$ | $2{,}5$ | $2{,}5$ |

**Ce que cela montre — trois observations.**

**1. Ignorer l'autocorrélation ($k=0$) surestime massivement la significativité.** De $t=6{,}0$ à $t=2{,}3$ pour $h=6$ ; de $8{,}3$ à $2{,}5$ pour $h=12$. La conclusion passe de « écrasante » à « limite ».

**2. La cause est le chevauchement des fenêtres.** $r_{t\to t+6}$ et $r_{t+1\to t+7}$ partagent **cinq mois** de rendements : les résidus successifs sont mécaniquement corrélés jusqu'au retard $h-1$. C'est une autocorrélation **induite par la construction**, pas par le modèle.

**3. Les écarts-types se stabilisent.** Entre $k=24$ et $k=36$, ils ne bougent presque plus ($0{,}0233$ contre $0{,}0232$). C'est le signe que la fenêtre couvre bien la portée de la dépendance — exactement le diagnostic que le cours recommande : *considérer plusieurs valeurs de $k$ et comparer les résultats*.

**4. L'effet est plus fort pour $h=12$.** Logique : le chevauchement est deux fois plus long, donc la dépendance porte plus loin, et il faut un $k$ plus grand pour la capturer.

**La conclusion économique.** La prévisibilité par le ratio dividende/prix reste **statistiquement significative** au seuil de $5\,\%$ ($t\approx2{,}3$–$2{,}5$), mais **beaucoup moins spectaculaire** qu'une lecture naïve ne le suggérerait. C'est l'un des débats les plus discutés de l'économétrie financière, et ce tableau montre pourquoi le traitement des écarts-types en est le cœur.

> *Il est important de traiter les écarts-types correctement. Le GMM offre une recette générale.*

</details>

**Niveau 4 — type examen** — Construisez un test comparant les ratios de Sharpe de deux stratégies.

<details><summary>Correction</summary>

**Le cadre.** *Deux séries de rendements excédentaires $(x_1^1,\dots,x_T^1)$ et $(x_1^2,\dots,x_T^2)$, produites sur la même période. On ne connaît pas la loi exacte de chacune, mais on sait qu'elles sont **i.i.d. dans le temps**. **Contemporainement**, $x_t^1$ et $x_t^2$ peuvent être corrélés.*

**Étape 1 — empiler.** C'est le point crucial. On forme le vecteur d'observations

$$x_t=(x_t^1,x_t^2)^\top$$

et le vecteur de paramètres $\theta_0=(\mu^1_0,\sigma^1_0,\mu^2_0,\sigma^2_0)$.

**Pourquoi empiler ?** Parce que $\hat\Omega$, la variance-covariance des quatre estimations, capture alors la **corrélation contemporaine** entre les deux stratégies. Estimer séparément et soustraire donnerait un écart-type **faux** — surestimé si les stratégies sont positivement corrélées.

**Étape 2 — les moments GMM.** Quatre fonctions, deux par série :

$$f_1=x_t^1-\mu_1, \quad f_2=(x_t^1-\mu_1)^2-\sigma_1^2, \quad f_3=x_t^2-\mu_2, \quad f_4=(x_t^2-\mu_2)^2-\sigma_2^2$$

et l'on estime $\hat\Omega$ par les formules GMM standard, $\frac1T(\hat d^\top\hat S^{-1}\hat d)^{-1}$. Les termes croisés de $\hat S$ — les $\hat{\mathbb E}[f_1f_3]$, etc. — portent la corrélation entre stratégies.

**Étape 3 — l'hypothèse nulle.**

$$H_0:\ \frac{\mu^1_0}{\sigma^1_0}-\frac{\mu^2_0}{\sigma^2_0}=0 \qquad\text{soit}\qquad h(\theta)=\frac{\mu_1}{\sigma_1}-\frac{\mu_2}{\sigma_2}=0$$

**Étape 4 — la méthode delta.**

$$\hat A=\left.\frac{\partial h}{\partial\theta^\top}\right\vert_{\hat\theta}=\left(\frac{1}{\hat\sigma_1}\quad-\frac{\hat\mu_1}{\hat\sigma_1^2}\quad-\frac{1}{\hat\sigma_2}\quad\frac{\hat\mu_2}{\hat\sigma_2^2}\right)$$

$$\widehat{\mathrm{Var}}\big(h(\hat\theta)\big)=\hat A\,\hat\Omega\,\hat A^\top$$

**Étape 5 — la statistique de test.**

$$\xi=\frac{\big(\widehat{SR}_1-\widehat{SR}_2\big)^2}{\widehat{\mathrm{Var}}\big(h(\hat\theta)\big)}\ \sim\ \chi^2(1)$$

On rejette $H_0$ si $\xi>q_{1-\alpha}$ ; à $5\,\%$, $q_{0{,}95}=3{,}84$.

**Ce qu'il faut savoir commenter.**

**1. L'importance de la corrélation contemporanée.** Si les deux stratégies sont fortement corrélées — deux fonds actions, par exemple —, la variance de la **différence** est bien plus faible que la somme des variances. Le test est alors **beaucoup plus puissant** : on peut détecter un petit écart de performance là où des tests séparés ne concluraient rien. Ignorer cette corrélation, c'est perdre l'essentiel de l'information.

**2. La puissance reste faible en pratique.** Avec $\mathrm{Var}(\widehat{SR})\approx(1+SR^2/2)/T$ par stratégie, il faut de très longues séries pour départager deux gérants. C'est le message central de l'exercice de niveau 1.

**3. L'hypothèse i.i.d. dans le temps est essentielle** — c'est elle qui autorise à ne pas faire de correction de Newey-West sur $\hat S$. Si les rendements étaient autocorrélés — hedge funds à actifs illiquides, par exemple —, il faudrait la correction du concept 6, et les écarts-types augmenteraient encore.

**4. La méthode est complètement générale.** Le même schéma — empiler, estimer $\hat\Omega$ par GMM, appliquer la méthode delta, former un $\chi^2$ — sert à tester n'importe quelle relation régulière entre paramètres estimés : égalité de deux alphas, d'un bêta à $1$, d'une élasticité à une valeur donnée.

</details>

## 🔴 Common mistakes

1. **Évaluer le gradient de la méthode delta au mauvais point** — c'est en $\hat\theta$ (ou $\theta_0$), pas ailleurs.
2. **Oublier le facteur $1/T$** — la formule GMM donne $T\,\mathrm{Var}[\hat\theta]$, pas $\mathrm{Var}[\hat\theta]$.
3. **Utiliser la formule d'écart-type classique des MCO en présence d'hétéroscédasticité** — il faut le **sandwich**.
4. **Ignorer l'autocorrélation des moments** — c'est l'erreur du tableau de prévisibilité : écarts-types divisés par $2{,}5$.
5. **Oublier Newey-West avec des fenêtres chevauchantes** — le chevauchement **crée** de l'autocorrélation.
6. **Prendre $k$ trop petit ou trop grand** — $k\propto T^{1/3}$, et **comparer plusieurs valeurs**.
7. **Omettre la pondération triangulaire** — sans elle, $\hat S$ peut ne pas être semi-définie positive.
8. **Comparer deux estimateurs sans les empiler** — on perd la **corrélation contemporaine**.
9. **Se tromper de degrés de liberté** — c'est $\dim h(\hat\theta)$, le nombre de **restrictions**.
10. **Faire confiance à l'asymptotique sans vérifier** — la couverture observée est $92{,}9\,\%$ pour $\hat\sigma$, pas $95\,\%$.

## 📌 Ultimate Review

1. **Rappels** : $x\sim N(0,\Omega)\Rightarrow Ax\sim N(0,A\Omega A^\top)$ · $\varepsilon\sim N(0,I)\Rightarrow\varepsilon^\top\varepsilon\sim\chi^2$ · $x\sim N(0,\Omega)\Rightarrow x^\top\Omega^{-1}x\sim\chi^2(\dim x)$.
2. **Méthode delta** : $h(\hat\theta)-h(\theta_0)\sim N(0,A\Omega A^\top)$ avec $A=\partial h/\partial\theta^\top$ évalué en $\theta_0$ (ou $\hat\theta$).
3. **Ratio de Sharpe** : $A=\big(\frac1{\hat\sigma},-\frac{\hat\mu}{\hat\sigma^2}\big)$ et, dans le cas gaussien, $\mathrm{Var}(\widehat{SR})=\frac1T\big(1+\frac{\widehat{SR}^2}{2}\big)$.
4. **GMM** : $\hat d=\partial\hat{\mathbb E}[f]/\partial\theta^\top$, $\hat S=\hat{\mathbb E}[ff^\top]$, et $$\sqrt T(\hat\theta-\theta_0)\Rightarrow N\Big(0,\big(\hat d^\top\hat S^{-1}\hat d\big)^{-1}\Big)$$
5. **Cas gaussien moyenne / écart-type** : $d=\mathrm{diag}(-1,-2\sigma_0)$, $S=\mathrm{diag}(\sigma_0^2,2\sigma_0^4)$, $V=\mathrm{diag}(\sigma_0^2,\tfrac12\sigma_0^2)$.
6. **Intervalles** : $\hat\theta_i\pm1{,}96\,SE(\hat\theta_i)$ ; **couverture observée** sur $100\,000$ simulations : $(0{,}945;0{,}929)$ — l'asymptotique est **moins bonne pour $\hat\sigma$**.
7. **MCO comme GMM** : $f=x_t(y_t-x_t^\top\beta)$, $\hat\beta=\hat{\mathbb E}(x_tx_t^\top)^{-1}\hat{\mathbb E}(x_ty_t)$.
8. **Sandwich de White** : $\mathrm{Var}[\hat\beta]=\frac1T\hat{\mathbb E}(x_tx_t^\top)^{-1}\hat{\mathbb E}(\hat u_t^2x_tx_t^\top)\hat{\mathbb E}(x_tx_t^\top)^{-1}$.
9. **Moments corrélés** : $S=\sum_{j=-\infty}^{\infty}\mathbb E[f_tf_{t-j}^\top]$ — *les observations corrélées affectent la taille effective de l'échantillon*.
10. **Newey-West** : $\hat S=\sum_{j=-k}^k\frac{k-\lvert j\rvert}{k}\cdot\frac1T\sum_tf(x_t,\hat\theta)f(x_{t-j},\hat\theta)^\top$ ; $k\propto T^{1/3}$ ; **comparer plusieurs $k$**.
11. **Prévisibilité S&P 500** : $\hat\beta=0{,}0530$ ($h=6$) avec $SE$ passant de $0{,}0089$ ($k=0$) à $0{,}0233$ ($k=24$) — Student de $6{,}0$ à $2{,}3$.
12. **MLE comme GMM** : $\hat d=\hat{\mathbb E}[\partial^2\ln p/\partial\theta\partial\theta^\top]$, $\hat S=\hat{\mathbb E}[\text{score}\cdot\text{score}^\top]$ ; **les scores sont non corrélés dans le temps**.
13. **MCNL** : moments $\mathbb E\big[\frac{\partial h}{\partial\beta}(y_t-h(x_t,\beta))\big]=0$ ; *si les $u_t$ sont gaussiens, les MCNL sont **optimaux***.
14. **Taille du test** : borne supérieure de la probabilité de rejeter $H_0$ à tort — l'**erreur de type I**.
15. **Test du khi-deux** : $\xi=h(\hat\theta)^\top\hat V^{-1}h(\hat\theta)\sim\chi^2(\dim h)$.
16. **Applications** : $\beta=0$ en régression prédictive · $SR=SR_0$ · comparaison de deux ratios de Sharpe, en **empilant** les séries.

**Formulas to know**

$$h(\hat\theta)-h(\theta_0)\sim N\big(0,A\Omega A^\top\big), \qquad A=\frac{\partial h(\theta)}{\partial\theta^\top}$$

$$T\,\mathrm{Var}\big[\hat\theta\big]=\big(\hat d^\top\hat S^{-1}\hat d\big)^{-1} \qquad \mathrm{Var}(\widehat{SR})=\frac1T\Big(1+\frac{\widehat{SR}^2}{2}\Big)$$

$$\mathrm{Var}[\hat\beta]=\frac1T\hat{\mathbb E}(x_tx_t^\top)^{-1}\hat{\mathbb E}(\hat u_t^2x_tx_t^\top)\hat{\mathbb E}(x_tx_t^\top)^{-1} \qquad \hat S_{NW}=\sum_{j=-k}^k\frac{k-\lvert j\rvert}{k}\hat{\mathbb E}\big[f_tf_{t-j}^\top\big]$$

$$\xi=h(\hat\theta)^\top\hat V^{-1}h(\hat\theta)\sim\chi^2\big(\dim h\big)$$

**Methods to know** : appliquer la méthode delta ; calculer $\hat d$ et $\hat S$ ; corriger par Newey-West et choisir $k$ ; construire un test du $\chi^2$ ; empiler deux séries pour capturer leur corrélation.

## 🧠 Active Recall

**Basic** — Énoncez la méthode delta.

<details><summary>Réponse</summary>

Pour un estimateur $\hat\theta$ tel que $\hat\theta-\theta_0\sim N(0,\Omega)$ avec $\Omega$ petite (d'ordre $1/T$), et $h$ régulière :

$$h(\hat\theta)-h(\theta_0)\sim N\big(0,\ A\Omega A^\top\big), \qquad A=\left.\frac{\partial h(\theta)}{\partial\theta^\top}\right\vert_{\theta_0}$$

**L'idée** : *localement, une fonction régulière est approximativement linéaire*

$$h(\hat\theta)\approx h(\theta_0)+A(\hat\theta-\theta_0)$$

et une transformation linéaire d'un vecteur gaussien est gaussienne, de covariance $A\Omega A^\top$.

**En pratique**, on remplace $A$ et $\Omega$ par $\hat A=\partial h/\partial\theta^\top\vert_{\hat\theta}$ et $\hat\Omega$.

</details>

**Understanding** — Que représentent $\hat d$ et $\hat S$ dans la formule des écarts-types GMM ?

<details><summary>Réponse</summary>

$$T\,\mathrm{Var}\big[\hat\theta\big]=\big(\hat d^\top\hat S^{-1}\hat d\big)^{-1}, \qquad \hat d=\frac{\partial\hat{\mathbb E}[f]}{\partial\theta^\top}\bigg\vert_{\hat\theta}, \qquad \hat S=\hat{\mathbb E}\big[f f^\top\big]$$

- **$\hat d$ est la sensibilité des moments au paramètre.** Si $\mathbb E[f]$ varie fortement avec $\theta$, une erreur sur les moments se traduit par une **petite** erreur sur $\theta$ : bonne identification, faible variance.
- **$\hat S$ est la variabilité des moments eux-mêmes.** Plus les $f(x_t,\hat\theta)$ sont bruités, plus l'estimation est imprécise.

La formule combine les deux comme il faut : la variance **croît** avec $\hat S$ et **décroît** avec $\hat d$.

⚠️ **Et la structure est celle de la fiche 64** : $\hat d^\top\hat S^{-1}\hat d$ joue le rôle de l'**information de Fisher**, et la variance est son inverse. Quand $f$ est le score et le modèle correct, l'identité de l'information donne $-\hat d=\hat S=I(\theta)$ et l'on retrouve exactement $I(\theta)^{-1}$.

</details>

**Application** — Pourquoi faut-il Newey-West pour une régression à horizon long ?

<details><summary>Réponse</summary>

**Le modèle** : $r_{t\to t+h}=\alpha+\beta\ln(D/P)_{t-1}+u_{t+h}$ avec des rendements **cumulés sur $h$ mois**.

**Le problème.** Les fenêtres sont **chevauchantes** : $r_{t\to t+6}$ et $r_{t+1\to t+7}$ partagent **cinq mois** de rendements. Les résidus $u_{t+h}$ et $u_{t+1+h}$ sont donc **mécaniquement corrélés**, jusqu'au retard $h-1$ — et cela, indépendamment de tout modèle : c'est un artefact de la construction.

**La conséquence si on l'ignore.** L'estimateur $\hat S=\hat{\mathbb E}[f_tf_t^\top]$ ne compte que la variance et **omet toutes les autocovariances**. Or *les observations corrélées affectent la taille effective de l'échantillon* : on croit disposer de $T$ observations indépendantes alors qu'on en a bien moins. Les écarts-types sont donc **massivement sous-estimés**.

**L'ampleur, sur les données du cours** ($h=6$) : $SE$ passe de $0{,}0089$ ($k=0$) à $0{,}0233$ ($k=24$) — **multiplié par $2{,}6$** —, et la statistique de Student de $6{,}0$ à $2{,}3$. La conclusion passe d'« écrasante » à « tout juste significative ».

**Le remède.**

$$\hat S=\sum_{j=-k}^{k}\frac{k-\lvert j\rvert}{k}\cdot\frac1T\sum_t\hat u_tx_tx_{t-j}^\top\hat u_{t-j}$$

avec $k\propto T^{1/3}$, assez grand pour couvrir la dépendance (au moins $h-1$) mais petit devant $T$. **Le cours recommande d'essayer plusieurs $k$** : quand les résultats se stabilisent — ici entre $k=24$ et $k=36$ —, la fenêtre est suffisante.

</details>

**Comparison** — Écarts-types classiques, sandwich et Newey-West : que corrige chacun ?

<details><summary>Réponse</summary>

|  | **Classique** | **Sandwich (White)** | **Newey-West** |
|---|---|---|---|
| Formule de $\hat S$ | $\hat\sigma^2\hat{\mathbb E}(xx^\top)$ | $\hat{\mathbb E}(\hat u_t^2xx^\top)$ | $\sum_{j=-k}^k\frac{k-\lvert j\rvert}{k}\hat{\mathbb E}[f_tf_{t-j}^\top]$ |
| Hypothèse | homoscédasticité **et** absence d'autocorrélation | absence d'**autocorrélation** seule | aucune des deux |
| Corrige | rien | l'**hétéroscédasticité** | hétéroscédasticité **et** autocorrélation |

**La hiérarchie est emboîtée** : chaque formule contient la précédente comme cas particulier. Si la variance est constante, le sandwich se réduit au classique ; si $k=0$, Newey-West se réduit au sandwich.

**Quand utiliser quoi.**

- **Classique** : seulement si l'on a de bonnes raisons de croire à l'homoscédasticité et à l'indépendance — rare en finance.
- **Sandwich** : dès qu'il y a hétéroscédasticité, ce qui est la règle sur les rendements (fiche 53).
- **Newey-West** : dès qu'il y a autocorrélation des moments — **obligatoire** avec des fenêtres chevauchantes, des rendements cumulés, ou des données à haute fréquence.

**La règle pratique** : en économétrie financière, on utilise **Newey-West par défaut**. Le coût est une légère perte de précision si la correction était inutile ; le bénéfice est d'éviter des conclusions fausses. L'asymétrie des risques tranche.

</details>

**Exam-style** — Construisez un test de non-prévisibilité des rendements et discutez ses pièges.

<details><summary>Réponse</summary>

**Le modèle.** $y_t=\beta_0+x_t^\top\beta+u_t$, où $x_t$ est un vecteur de prédicteurs connus en $t$ — ratio dividende/prix, pente de la courbe des taux, etc.

**L'hypothèse nulle.** $H_0:\beta=0$ — aucune prévisibilité.

**Étape 1 — estimer par MCO**, ce qui est légitime **comme GMM** avec $f(x_t,y_t,\beta)=x_t(y_t-x_t^\top\beta)$ :

$$\hat\beta=\hat{\mathbb E}\big(x_tx_t^\top\big)^{-1}\hat{\mathbb E}\big(x_ty_t\big)$$

La validité repose sur $\mathbb E[u_t\mid x_t]=0$, non sur la normalité ni l'homoscédasticité.

**Étape 2 — estimer $\widehat{\mathrm{Var}}(\hat\beta)$ par Newey-West** :

$$\widehat{\mathrm{Var}}\big[\hat\beta\big]=\frac1T\hat{\mathbb E}(x_tx_t^\top)^{-1}\hat S\,\hat{\mathbb E}(x_tx_t^\top)^{-1}, \qquad \hat S=\sum_{j=-k}^k\frac{k-\lvert j\rvert}{k}\cdot\frac1T\sum_t\hat u_tx_tx_{t-j}^\top\hat u_{t-j}$$

**Étape 3 — la statistique de test.** Avec $h(\theta)=\beta$ :

$$\xi=\hat\beta^\top\Big(\widehat{\mathrm{Var}}(\hat\beta)\Big)^{-1}\hat\beta\ \sim\ \chi^2\big(\dim\beta\big)$$

*Test de taille $\alpha$ : rejeter si $\xi\geq\bar\xi$ où $\mathrm{CDF}_{\chi^2(\dim\beta)}(\bar\xi)=1-\alpha$.*

**Les pièges — cinq points.**

**1. L'autocorrélation des résidus.** Avec des rendements cumulés à fenêtres chevauchantes, elle est **certaine**. Le tableau du cours montre l'ampleur : Student de $6{,}0$ à $2{,}3$. **Ne jamais utiliser $k=0$ dans ce cas.**

**2. Le choix de $k$.** $k\propto T^{1/3}$, mais **il faut essayer plusieurs valeurs**. Trop petit, on sous-estime les écarts-types ; trop grand, on ajoute du bruit d'estimation. Le critère est la **stabilisation** des résultats.

**3. L'hétéroscédasticité.** Les rendements en présentent presque toujours (fiche 53). La formule sandwich la traite ; la formule classique ne le fait pas.

**4. La significativité asymptotique n'est pas la fiabilité en échantillon fini.** L'expérience Monte-Carlo du cours montre une couverture de $92{,}9\,\%$ pour un intervalle nominal de $95\,\%$. Sur des régressions prédictives, avec des régresseurs très persistants, la distorsion peut être bien pire.

**5. Le problème le plus profond, que le cours annonce dans sa discussion.** *En pratique, les variables explicatives sont **stochastiques**, et **non décorrélées des résidus retardés**.* Le ratio dividende/prix est très persistant et corrélé aux rendements passés — ce qui induit un **biais de petit échantillon** dans $\hat\beta$, distinct du problème d'écarts-types. C'est le biais de Stambaugh, et il ne se corrige pas par Newey-West.

**La conclusion de méthode.** *Les MCO sont valides tant que les conditions de moment le sont. Il est important de traiter les écarts-types correctement — le GMM offre une recette générale.* La recette est : vérifier les moments, calculer $\hat d$ et $\hat S$, corriger $\hat S$ pour l'autocorrélation, et **ne jamais faire confiance à un $t$ de Student sans savoir comment il a été calculé**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Loi d'une combinaison linéaire gaussienne ? | $x\sim N(0,\Omega)\Rightarrow Ax\sim N(0,A\Omega A^\top)$ |
| Loi de $x^\top\Omega^{-1}x$ ? | $\chi^2(\dim x)$ |
| Principe de la méthode delta ? | Une fonction régulière est **localement linéaire** |
| Formule de la méthode delta ? | $h(\hat\theta)-h(\theta_0)\sim N(0,A\Omega A^\top)$ |
| Que vaut $A$ ? | $\partial h(\theta)/\partial\theta^\top$ évalué au point limite |
| Gradient du ratio de Sharpe ? | $\big(1/\hat\sigma,\ -\hat\mu/\hat\sigma^2\big)$ |
| Variance du ratio de Sharpe ? | $\frac1T\big(1+\widehat{SR}^2/2\big)$ |
| Que vaut $\hat d$ en GMM ? | $\partial\hat{\mathbb E}[f]/\partial\theta^\top$ |
| Que vaut $\hat S$ ? | $\hat{\mathbb E}[f f^\top]$ |
| Variance asymptotique du GMM ? | $T\,\mathrm{Var}[\hat\theta]=(\hat d^\top\hat S^{-1}\hat d)^{-1}$ |
| $S$ pour la moyenne-variance gaussienne ? | $\mathrm{diag}(\sigma_0^2,\ 2\sigma_0^4)$ |
| $V$ correspondant ? | $\mathrm{diag}(\sigma_0^2,\ \sigma_0^2/2)$ |
| Couverture observée par Monte-Carlo ? | $(0{,}945\ ;\ 0{,}929)$ |
| Que montre le second nombre ? | L'asymptotique est **moins fiable** pour $\hat\sigma$ |
| Moment GMM des MCO ? | $f=x_t(y_t-x_t^\top\beta)$ |
| Estimateur MCO par GMM ? | $\hat{\mathbb E}(x_tx_t^\top)^{-1}\hat{\mathbb E}(x_ty_t)$ |
| Formule sandwich ? | $\frac1T\hat{\mathbb E}(xx^\top)^{-1}\hat{\mathbb E}(\hat u^2xx^\top)\hat{\mathbb E}(xx^\top)^{-1}$ |
| Que corrige-t-elle ? | L'**hétéroscédasticité** |
| Que vaut $S$ avec des moments corrélés ? | $\sum_{j=-\infty}^{\infty}\mathbb E[f_tf_{t-j}^\top]$ |
| Formule de Newey-West ? | $\sum_{j=-k}^k\frac{k-\lvert j\rvert}{k}\hat{\mathbb E}[f_tf_{t-j}^\top]$ |
| Pourquoi la pondération triangulaire ? | Pour garantir que $\hat S$ soit **semi-définie positive** |
| Taux de croissance de $k$ ? | $k\propto T^{1/3}$ |
| Que recommande le cours pour $k$ ? | **Essayer plusieurs valeurs** et comparer |
| Effet sur la prévisibilité du S&P 500 ? | $SE$ de $0{,}0089$ à $0{,}0233$ pour $h=6$ |
| Pourquoi cette autocorrélation ? | Les fenêtres de rendements sont **chevauchantes** |
| Les scores du MLE sont-ils autocorrélés ? | **Non** — $\mathbb E_t[f(x_{t+1},\theta_0)]=0$ |
| $\hat d$ et $\hat S$ pour le MLE ? | Hessienne moyenne et variance du **score** |
| Moments des MCNL ? | $\mathbb E[\frac{\partial h}{\partial\beta}(y_t-h(x_t,\beta))]=0$ |
| Quand les MCNL sont-ils optimaux ? | Si les erreurs sont **gaussiennes** |
| Définition de la taille d'un test ? | Probabilité **maximale** de rejet à tort |
| Autre nom de cette erreur ? | Erreur de **type I** |
| Statistique du test du khi-deux ? | $\xi=h(\hat\theta)^\top\hat V^{-1}h(\hat\theta)$ |
| Ses degrés de liberté ? | $\dim h(\hat\theta)$ |
| Comment comparer deux ratios de Sharpe ? | **Empiler** les séries pour capturer la corrélation |
