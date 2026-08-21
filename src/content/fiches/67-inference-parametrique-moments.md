# Fiche 67 — Inférence paramétrique : estimateurs, intervalles de confiance et méthode des moments

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Rigollet, *18.650 Statistics for Applications*, MIT OpenCourseWare, automne 2016 — chapitre 2 « Parametric Inference » et chapitre 4 « The Method of Moments » |
| **Difficulté** | High — le vocabulaire et les outils de base de toute l'inférence |
| **Temps d'étude estimé** | 2 h 15 |
| **Prérequis** | Loi des grands nombres, théorème central limite, fiche 64 (maximum de vraisemblance) |
| **Concepts clés** | Modèle statistique, identifiabilité, statistique et estimateur, consistance, biais, risque quadratique, intervalle de confiance, théorème de Weierstrass, quadrature gaussienne, déterminant de Vandermonde, méthode des moments, méthode delta multivariée |
| **Poids à l'examen** | Trois choses : la décomposition **risque $=$ biais$^2$ $+$ variance** ; la construction d'un **intervalle de confiance** et le problème du paramètre inconnu dans les bornes ; et la **méthode des moments** avec sa loi asymptotique. |

## 🎯 Vue d'ensemble

> **Le raisonnement de la modélisation statistique.** Soient $X_1,\dots,X_n$ des copies indépendantes de $X$. *Le but de la statistique est d'**apprendre la loi de $X$**.*
>
> - Si $X\in\{0,1\}$, c'est facile : c'est une $\mathrm{Ber}(p)$ et il n'y a que le paramètre $p$ à apprendre.
> - Cela peut être plus compliqué. Le cours donne un jeu de données réel : le **nombre de frères et sœurs** (soi-même inclus) relevé auprès d'étudiants — $2,3,2,4,1,3,1,1,1,1,1,2,2,3,2,2,2,3,2,1,3,1,2,3,\dots$

**Deux stratégies.**

- *Ne faire **aucune hypothèse** et tenter d'apprendre la fonction de masse :*

| $x$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $\geq7$ |
|---|---|---|---|---|---|---|---|
| $\mathbb P(X=x)$ | $p_1$ | $p_2$ | $p_3$ | $p_4$ | $p_5$ | $p_6$ | $\sum_{i\geq7}p_i$ |

*Cela fait **7 paramètres** à apprendre.*

- *Ou supposer $X\sim\mathrm{Poiss}(\lambda)$. Cela fait **1 paramètre** à apprendre !*

```
MODÈLE        (E, (P_θ)_{θ∈Θ})   — on suppose P = P_{θ*}
IDENTIFIABLE  θ ↦ P_θ injective  — sinon rien n'est estimable
ESTIMATEUR    toute statistique ne dépendant pas de θ
QUALITÉ       risque quadratique = biais² + variance
INCERTITUDE   intervalle de confiance de niveau 1 − α
DEUX MÉTHODES maximum de vraisemblance (fiche 64) · MÉTHODE DES MOMENTS
```

> **L'arbitrage fondateur, posé dès la première page.** Modéliser, c'est **échanger de la généralité contre de la précision**. Sept paramètres n'imposent presque rien mais s'estiment mal ; un seul paramètre impose beaucoup mais s'estime bien. Tout le reste du cours vit dans cet arbitrage.

## 🔴 Concept 1 — Le modèle statistique

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition formelle.</span>

Soit le résultat observé d'une expérience statistique un échantillon $X_1,\dots,X_n$ de $n$ variables i.i.d. dans un espace mesurable $E$ (généralement $E\subseteq\mathbb R$), de loi commune $\mathbb P$. Un **modèle statistique** associé est un couple

$$\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$$

où $E$ est l'**espace d'échantillonnage**, $(\mathbb P_\theta)_{\theta\in\Theta}$ une **famille de mesures de probabilité** sur $E$, et $\Theta$ un ensemble quelconque appelé **ensemble de paramètres**.

</div>

- *On suppose généralement le modèle **bien spécifié**, c'est-à-dire défini de sorte que $\mathbb P=\mathbb P_\theta$ pour un certain $\theta\in\Theta$.*
- *Ce $\theta$ particulier est le **vrai paramètre**, et il est **inconnu**. Le but de l'expérience est de l'**estimer**, ou de vérifier ses propriétés lorsqu'elles ont un sens particulier ($\theta>2$ ? $\theta=1/2$ ?).*
- *On supposera toujours $\Theta\subseteq\mathbb R^d$ pour un $d\geq1$ : le modèle est alors dit **paramétrique**.*

**Les quatre exemples du cours.**

| Situation | Modèle |
|---|---|
| $n$ épreuves de Bernoulli | $\big(\{0,1\},(\mathrm{Ber}(p))_{p\in(0,1)}\big)$ |
| $X_i\overset{iid}\sim\mathrm{Exp}(\lambda)$, $\lambda>0$ inconnu | $\big(\mathbb R_+^\ast,(\mathrm{Exp}(\lambda))_{\lambda>0}\big)$ |
| $X_i\overset{iid}\sim\mathrm{Poiss}(\lambda)$ | $\big(\mathbb N,(\mathrm{Poiss}(\lambda))_{\lambda>0}\big)$ |
| $X_i\overset{iid}\sim N(\mu,\sigma^2)$ | $\big(\mathbb R,(N(\mu,\sigma^2))_{(\mu,\sigma^2)\in\mathbb R\times\mathbb R_+^\ast}\big)$ |

⚠️ **« Bien spécifié » est une hypothèse, pas un fait.** Elle affirme que la vraie loi appartient à la famille choisie. Si le nombre de frères et sœurs n'est **pas** de Poisson, aucune valeur de $\lambda$ ne décrit correctement les données, et tout ce qui suit est faux. C'est pourquoi le chapitre sur les tests d'adéquation existe.

## 🔴 Concept 2 — L'identifiabilité

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Le paramètre $\theta$ est **identifié** si et seulement si l'application $\theta\in\Theta\mapsto\mathbb P_\theta$ est **injective** :

$$\theta\neq\theta'\ \Longrightarrow\ \mathbb P_\theta\neq\mathbb P_{\theta'}$$

</div>

**Exemples.**

1. *Dans les quatre exemples précédents, le paramètre est identifié.*
2. *Si $X_i=\mathbf 1_{Y_i\geq0}$, où $Y_1,\dots,Y_n\overset{iid}\sim N(\mu,\sigma^2)$ sont **non observés**, alors $\mu$ et $\sigma^2$ **ne sont pas identifiés** — mais $\theta=\mu/\sigma$ l'est.*

> **Comprenez le contre-exemple, il est instructif.** On n'observe que le **signe** de $Y_i$, donc la seule information disponible est
>
> $$\mathbb P(X_i=1)=\mathbb P(Y_i\geq0)=\Phi\Big(\frac{\mu}{\sigma}\Big)$$
>
> Toute la loi observable ne dépend que du **rapport** $\mu/\sigma$. Doubler $\mu$ et $\sigma$ simultanément ne change **rien** aux données. Aucune quantité de données ne permettra donc de séparer $\mu$ de $\sigma$ : ils ne sont pas identifiés, alors que leur rapport l'est.

⚠️ **C'est exactement le modèle probit** de la fiche 66, et cela explique pourquoi on y normalise toujours $\sigma=1$ : sans cette normalisation, le modèle serait inestimable. L'identifiabilité est aussi l'hypothèse 1 du théorème asymptotique de la fiche 64 — sans elle, l'EMV ne peut converger vers rien de précis.

## 🔴 Concept 3 — Statistiques, estimateurs et consistance

> **Statistique** : *toute fonction **mesurable** de l'échantillon* — par exemple $\bar X_n$, $\max_iX_i$, $X_1+\log(1+\lvert X_n\rvert)$, la variance empirique, etc.
>
> *Règle empirique donnée par le cours : si vous pouvez la calculer exactement une fois les données connues, elle est mesurable.*

> **Estimateur de $\theta$** : *toute statistique dont l'expression **ne dépend pas de $\theta$**.*

> **Consistance.** Un estimateur $\hat\theta_n$ de $\theta$ est **faiblement** (resp. **fortement**) **consistant** si et seulement si
>
> $$\hat\theta_n\ \xrightarrow[n\to\infty]{\mathbb P\ (\text{resp. p.s.})}\ \theta \qquad \text{par rapport à } \mathbb P_\theta$$

⚠️ **La condition « ne dépend pas de $\theta$ » est ce qui distingue un estimateur d'une simple statistique.** $\bar X_n-\theta$ est une fonction parfaitement calculable **si l'on connaît $\theta$** — mais on ne le connaît pas. Un estimateur doit être calculable **à partir des seules données**. C'est précisément le problème que soulève l'exemple d'intervalle de confiance du concept 5.

## 🔴 Concept 4 — Biais et risque quadratique

> **Biais** d'un estimateur $\hat\theta_n$ de $\theta$ :
>
> $$\mathbb E\big[\hat\theta_n\big]-\theta$$

> **Risque (ou risque quadratique)** d'un estimateur $\hat\theta_n$ :
>
> $$\mathbb E\Big[\big\lvert\hat\theta_n-\theta\big\rvert^2\Big]$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarque.</span>

Si $\Theta\subseteq\mathbb R$,

$$\boxed{\ \text{risque quadratique}=\text{biais}^2+\text{variance}\ }$$

</div>

> **Cette décomposition est l'un des énoncés les plus utiles de toute la statistique.** Elle se démontre en une ligne, en ajoutant et retranchant $\mathbb E[\hat\theta_n]$ :
>
> $$\mathbb E\big[(\hat\theta_n-\theta)^2\big]=\underbrace{\big(\mathbb E[\hat\theta_n]-\theta\big)^2}_{\text{biais}^2}+\underbrace{\mathbb E\big[(\hat\theta_n-\mathbb E[\hat\theta_n])^2\big]}_{\text{variance}}$$
>
> le double produit s'annulant car $\mathbb E[\hat\theta_n-\mathbb E[\hat\theta_n]]=0$.

⚠️ **Sa portée pratique : un estimateur biaisé peut être meilleur qu'un estimateur sans biais.** Ce qui compte est le **risque total**, pas le biais seul. C'est toute la justification de la **régularisation** — ridge, LASSO, rétrécissement — qui accepte du biais pour réduire la variance. C'est aussi la raison profonde du modèle à un paramètre de l'introduction : supposer Poisson introduit du biais si c'est faux, mais réduit énormément la variance.

## 🔴 Concept 5 — Les intervalles de confiance

Soit $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ un modèle statistique fondé sur $X_1,\dots,X_n$, avec $\Theta\subseteq\mathbb R$, et $\alpha\in(0,1)$.

> **Intervalle de confiance de niveau $1-\alpha$ pour $\theta$** : tout intervalle **aléatoire** $I$ — dépendant de $X_1,\dots,X_n$ — dont les **bornes ne dépendent pas de $\theta$** et tel que
>
> $$\mathbb P_\theta\big[I\ni\theta\big]\geq1-\alpha, \qquad \forall\theta\in\Theta$$

> **Intervalle de confiance de niveau asymptotique $1-\alpha$** : tout intervalle aléatoire $I$ dont les bornes ne dépendent pas de $\theta$ et tel que
>
> $$\lim_{n\to\infty}\mathbb P_\theta\big[I\ni\theta\big]\geq1-\alpha, \qquad \forall\theta\in\Theta$$

⚠️ **Attention à la notation $I\ni\theta$ : elle n'est pas une coquetterie.** C'est **l'intervalle qui est aléatoire**, pas $\theta$ — qui est un nombre fixe et inconnu. On ne dit donc **pas** « $\theta$ a $95\,\%$ de chances d'être dans $I$ » mais « $I$ a $95\,\%$ de chances de contenir $\theta$ ». La probabilité porte sur la procédure, répétée sur de nouveaux échantillons.

### L'exemple de Bernoulli, et son problème

Soient $X_1,\dots,X_n\overset{iid}\sim\mathrm{Ber}(p)$ avec $p\in(0,1)$ inconnu.

- **LGN** : la moyenne empirique $\bar X_n$ est un estimateur **fortement consistant** de $p$.
- Soit $q_{\alpha/2}$ le quantile d'ordre $(1-\frac\alpha2)$ de $N(0,1)$ et $$I=\left[\bar X_n-\frac{q_{\alpha/2}\sqrt{p(1-p)}}{\sqrt n},\ \bar X_n+\frac{q_{\alpha/2}\sqrt{p(1-p)}}{\sqrt n}\right]$$
- **TCL** : $\displaystyle\lim_{n\to\infty}\mathbb P_p[I\ni p]=1-\alpha$ pour tout $p\in(0,1)$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Problème : $I$ dépend de $p$ !</span>

⚠️ Les bornes contiennent le paramètre inconnu : ce n'est donc **pas** un intervalle de confiance au sens de la définition.

</div>

> **Les deux solutions du cours.**
>
> 1. **Remplacer $p(1-p)$ par $1/4$** dans $I$, puisque $p(1-p)\leq1/4$.
> 2. **Remplacer $p$ par $\bar X_n$** dans $I$ et invoquer le **théorème de Slutsky**.

> **Comparez les deux — elles illustrent deux stratégies générales.**
>
> - La première est **conservatrice** : elle majore la variance par son maximum, donc élargit l'intervalle. Le niveau réel est $\geq1-\alpha$ — l'inégalité de la définition est respectée, avec de la marge. Elle est **valide à $n$ fini**.
> - La seconde est **exacte asymptotiquement** : Slutsky garantit que remplacer $p$ par un estimateur convergent ne change pas la loi limite. L'intervalle est plus court, mais le niveau n'est atteint **qu'à la limite**.
>
> Le choix dépend de ce qu'on privilégie : la **garantie** ou la **précision**.

## 🔴 Concept 6 — Le théorème de Weierstrass et son usage statistique

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème d'approximation de Weierstrass.</span>

*Soit $f$ une fonction continue sur l'intervalle $[a,b]$. Alors, pour tout $\varepsilon>0$, il existe $a_0,a_1,\dots,a_d\in\mathbb R$ tels que*

$$\max_{x\in[a,b]}\left\lvert f(x)-\sum_{k=0}^da_kx^k\right\rvert<\varepsilon$$

*En un mot : **les fonctions continues peuvent être approchées arbitrairement bien par des polynômes**.*

</div>

**L'application statistique, en quatre pas.**

**1.** Soit $X_1,\dots,X_n$ un échantillon i.i.d. d'un modèle **identifié** $\big(E,\{\mathbb P_\theta\}_{\theta\in\Theta}\big)$, de vrai paramètre $\theta^\ast$, et supposons que chaque $\mathbb P_\theta$ ait une densité $f_\theta$.

**2.** *Si l'on trouve $\theta$ tel que*

$$\int h(x)f_{\theta^\ast}(x)dx=\int h(x)f_\theta(x)dx$$

*pour **toute** fonction $h$ continue bornée, alors $\theta=\theta^\ast$.*

**3.** *Remplaçons les espérances par des moyennes : chercher $\hat\theta$ tel que*

$$\frac1n\sum_{i=1}^nh(X_i)=\int h(x)f_{\hat\theta}(x)dx$$

*pour toute fonction continue bornée $h$.* *Il y en a une **infinité** : infaisable !*

**4.** *Par le théorème de Weierstrass, il suffit de considérer les **polynômes**, puis — en identifiant les coefficients — les seules **puissances** :*

$$\frac1n\sum_{i=1}^nX_i^k=\int x^kf_{\hat\theta}(x)dx, \qquad \forall k=1,\dots,d$$

*ce qui ne fait que $d$ équations (plus la normalisation).*

> **La quantité $m_k(\theta):=\int x^kf_\theta(x)dx=\mathbb E_\theta[X^k]$ est le $k$-ième moment de $\mathbb P_\theta$.**

> **Le raisonnement est très élégant.** Identifier deux lois demande de comparer une infinité d'intégrales. Weierstrass dit que les **polynômes suffisent** à tester toutes les fonctions continues ; et par linéarité, les **monômes** suffisent à tester les polynômes. On passe donc d'une infinité de conditions à un nombre **fini de moments**.

**Les trois limites du théorème**, signalées par le cours :

1. il ne vaut que pour les fonctions **continues** (*pas vraiment un problème*) ;
2. il ne vaut que sur des **intervalles $[a,b]$ bornés** ;
3. il **ne dit pas** combien de moments $d$ prendre.

## 🟠 Concept 7 — La quadrature gaussienne : le cas discret

*Que se passe-t-il si $E$ est **discret** — pas de densité mais une fonction de masse ?*

Supposons $E=\{x_1,\dots,x_r\}$ **fini** à $r$ valeurs possibles. La fonction de masse a $r-1$ paramètres, $p(x_1),\dots,p(x_{r-1})$, puisque $p(x_r)=1-\sum_{j=1}^{r-1}p(x_j)$. *On peut espérer n'avoir besoin de guère plus de $d=r-1$ moments pour retrouver $p(\cdot)$.*

**Le système linéaire.** Pour $k=1,\dots,r-1$ :

$$m_k=\mathbb E[X^k]=\sum_{j=1}^rp(x_j)x_j^k, \qquad\text{et}\qquad \sum_{j=1}^rp(x_j)=1$$

C'est un **système linéaire** d'inconnues $p(x_1),\dots,p(x_r)$ :

$$\begin{pmatrix}x_1&x_2&\cdots&x_r\\ x_1^2&x_2^2&\cdots&x_r^2\\ \vdots&\vdots&\ddots&\vdots\\ x_1^{r-1}&x_2^{r-1}&\cdots&x_r^{r-1}\\ 1&1&\cdots&1\end{pmatrix}\begin{pmatrix}p(x_1)\\p(x_2)\\\vdots\\p(x_{r-1})\\p(x_r)\end{pmatrix}=\begin{pmatrix}m_1\\m_2\\\vdots\\m_{r-1}\\1\end{pmatrix}$$

**La matrice est-elle inversible ? Le déterminant de Vandermonde.**

$$\det\begin{pmatrix}x_1&x_2&\cdots&x_r\\ x_1^2&x_2^2&\cdots&x_r^2\\ \vdots&\vdots&\ddots&\vdots\\ x_1^{r-1}&x_2^{r-1}&\cdots&x_r^{r-1}\\ 1&1&\cdots&1\end{pmatrix}=\pm\prod_{1\leq j<k\leq r}(x_j-x_k)\ \neq\ 0$$

puisque les $x_j$ sont **deux à deux distincts**.

> **Conclusion.** *Étant donnés $m_1,\dots,m_{r-1}$, il existe une **unique** fonction de masse ayant ces moments*, obtenue en inversant le système.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que ce détour établit — et c'est la conclusion du cours.</span>

- *Les moments contiennent une information importante pour retrouver la densité ou la fonction de masse.*
- *Si l'on peut estimer ces moments avec précision, on peut espérer **retrouver la loi**.*
- *Dans un cadre paramétrique, où connaître $\mathbb P_\theta$ revient à connaître $\theta$, il faut souvent **encore moins** de moments. Cela se juge au cas par cas.*
- ***Règle empirique : si $\theta\in\Theta\subset\mathbb R^d$, il faut $d$ moments.***

</div>

## 🔴 Concept 8 — La méthode des moments

Soit $X_1,\dots,X_n$ un échantillon i.i.d. d'un modèle $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ avec $\Theta\subseteq\mathbb R^d$.

> **Moments de population** : $m_k(\theta)=\mathbb E_\theta\big[X_1^k\big]$, $1\leq k\leq d$. **Moments empiriques** : $\displaystyle\hat m_k=\overline{X_n^k}=\frac1n\sum_{i=1}^nX_i^k$, $1\leq k\leq d$. Et l'application
>
> $$\psi:\Theta\subset\mathbb R^d\to\mathbb R^d, \qquad \theta\mapsto\big(m_1(\theta),\dots,m_d(\theta)\big)$$

**En supposant $\psi$ bijective**, de sorte que $\theta=\psi^{-1}\big(m_1(\theta),\dots,m_d(\theta)\big)$ :

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — estimateur des moments.</span>

$$\boxed{\ \hat\theta_n^{MM}=\psi^{-1}\big(\hat m_1,\dots,\hat m_d\big)\ }$$

*sous réserve qu'il existe.*

</div>

> **L'idée, en une phrase.** Les moments théoriques sont des **fonctions connues** de $\theta$ ; les moments empiriques sont **calculables** à partir des données. On **égalise les deux** et l'on résout en $\theta$. Aucune vraisemblance à écrire, aucune optimisation à conduire — juste un système d'équations à inverser.

## 🔴 Concept 9 — La loi asymptotique de l'estimateur des moments

**Les notations.** $M(\theta)=(m_1(\theta),\dots,m_d(\theta))$, $\hat M=(\hat m_1,\dots,\hat m_d)$, et

$$\Sigma(\theta)=\mathbb V_\theta\big(X,X^2,\dots,X^d\big)$$

la matrice de covariance du vecteur aléatoire $(X,X^2,\dots,X^d)$ pour $X\sim\mathbb P_\theta$. On suppose $\psi^{-1}$ **continûment dérivable** en $M(\theta)$, de matrice gradient $\nabla\psi^{-1}\big\vert_{M(\theta)}$ de taille $d\times d$.

**Les deux étapes.**

- **LGN** : $\hat\theta_n^{MM}$ est faiblement / fortement **consistant**.
- **TCL** : $$\sqrt n\big(\hat M-M(\theta)\big)\ \xrightarrow[n\to\infty]{(d)}\ N\big(0,\Sigma(\theta)\big) \qquad \text{par rapport à } \mathbb P_\theta$$

**D'où, par la méthode delta :**

$$\boxed{\ \sqrt n\big(\hat\theta_n^{MM}-\theta\big)\ \xrightarrow[n\to\infty]{(d)}\ N\big(0,\Gamma(\theta)\big), \qquad \Gamma(\theta)=\Big(\nabla\psi^{-1}\big\vert_{M(\theta)}\Big)^\top\Sigma(\theta)\,\nabla\psi^{-1}\big\vert_{M(\theta)}\ }$$

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode delta multivariée.</span>

*Soit $(T_n)_{n\geq1}$ une suite de vecteurs aléatoires de $\mathbb R^p$ vérifiant*

$$\sqrt n\big(T_n-\theta\big)\ \xrightarrow[n\to\infty]{(d)}\ N(0,\Sigma)$$

*pour un $\theta\in\mathbb R^p$ et une matrice symétrique semi-définie positive $\Sigma$. Soit $g:\mathbb R^p\to\mathbb R^k$ continûment dérivable en $\theta$. Alors*

$$\sqrt n\big(g(T_n)-g(\theta)\big)\ \xrightarrow[n\to\infty]{(d)}\ N\big(0,\nabla g(\theta)^\top\Sigma\nabla g(\theta)\big)$$

*où $\nabla g(\theta)=\Big(\frac{\partial g_j}{\partial\theta_i}\Big)_{1\leq i\leq d,\ 1\leq j\leq k}$.*

</div>

> **La méthode delta est l'outil le plus rentable de la statistique asymptotique.** Son mécanisme est un développement de Taylor au premier ordre : $g(T_n)\approx g(\theta)+\nabla g(\theta)^\top(T_n-\theta)$. Une transformation **régulière** d'un estimateur asymptotiquement normal reste asymptotiquement normale, avec une variance **transportée par le gradient**.
>
> **Ici, $g=\psi^{-1}$** : on passe des moments au paramètre. C'est **exactement** le mécanisme utilisé pour les hypothèses implicites de la fiche 65, avec la même formule $\Gamma=\nabla g^\top\Sigma\nabla g$.

## 🟠 Concept 10 — Maximum de vraisemblance ou méthode des moments ?

> - **Comparaison des risques quadratiques** : *en général, l'**EMV est plus précis**.*
> - **Questions de calcul** : *parfois, l'EMV est **intraitable**.*
> - *Si la vraisemblance est **concave**, on peut utiliser des algorithmes d'optimisation — **méthode de points intérieurs**, **descente de gradient**, etc.*
> - *Si elle **n'est pas concave** : seulement des **heuristiques**, avec des maxima locaux — espérance-maximisation, etc.*

> **La raison profonde de la supériorité de l'EMV.** Le théorème de la fiche 64 dit que sa variance asymptotique est $I(\theta^\ast)^{-1}$, qui atteint la **borne de Cramér-Rao**. Aucun estimateur régulier ne peut faire mieux — en particulier pas la méthode des moments, dont la variance $\Gamma(\theta)$ est en général strictement supérieure.
>
> **Ce qui sauve la méthode des moments.** Elle est **explicite** : on résout un système d'équations, sans optimisation, sans risque de maximum local. Quand la vraisemblance est intraitable ou non concave, un estimateur légèrement moins efficace mais **sûrement calculable** vaut mieux qu'un estimateur optimal introuvable.
>
> **Et elle sert souvent de point de départ** : on initialise un algorithme de maximum de vraisemblance avec l'estimateur des moments.

⚠️ **La référence aux « points intérieurs » et à la « descente de gradient » renvoie explicitement aux fiches 39 et 41.** Estimation statistique et optimisation convexe sont bien le même sujet, vu de deux côtés.

## Comment résoudre l'exercice type (protocole)

1. **Écrire le modèle** $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ et vérifier l'**identifiabilité**.
2. **Choisir la méthode** : maximum de vraisemblance si la vraisemblance est traitable ; **moments** sinon.
3. **Méthode des moments** : calculer $m_k(\theta)=\mathbb E_\theta[X^k]$ pour $k=1,\dots,d$, poser $\psi$, **inverser**, remplacer par les moments empiriques.
4. **Évaluer la qualité** : biais, variance, risque $=$ biais$^2+$ variance.
5. **Établir la consistance** par la LGN, la loi asymptotique par le TCL et la **méthode delta**.
6. **Construire un intervalle de confiance** — et **vérifier que les bornes ne dépendent pas de $\theta$** ; sinon, majorer la variance ou appliquer Slutsky.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « deux paramètres donnent la même loi » | problème d'**identifiabilité** |
| « cet estimateur est-il bon ? » | **risque quadratique** $=$ biais$^2+$ variance |
| « estimateur sans biais mais très variable » | comparer les **risques**, pas les biais |
| « intervalle de confiance » | vérifier que les bornes ne contiennent pas $\theta$ |
| bornes dépendant du paramètre | majorer la variance, ou **Slutsky** |
| « la vraisemblance est intraitable » | **méthode des moments** |
| $\theta\in\mathbb R^d$ | prendre **$d$ moments** |
| « loi asymptotique d'une fonction d'un estimateur » | **méthode delta** |
| « quel estimateur est le plus précis ? » | en général l'**EMV** (borne de Cramér-Rao) |

### Exercices progressifs

**Niveau 1** — Estimez les paramètres d'une loi $N(\mu,\sigma^2)$ par la méthode des moments.

<details><summary>Correction</summary>

**Le paramètre est de dimension $d=2$**, il faut donc **deux moments**.

**Les moments de population.**

$$m_1(\theta)=\mathbb E[X]=\mu, \qquad m_2(\theta)=\mathbb E[X^2]=\mathrm{var}(X)+\big(\mathbb E[X]\big)^2=\sigma^2+\mu^2$$

**L'application $\psi$.** $\psi(\mu,\sigma^2)=(\mu,\ \sigma^2+\mu^2)$, dont l'inverse est

$$\psi^{-1}(m_1,m_2)=\big(m_1,\ m_2-m_1^2\big)$$

**L'estimateur.** Avec $\hat m_1=\bar X_n$ et $\hat m_2=\frac1n\sum X_i^2$ :

$$\hat\mu_n^{MM}=\bar X_n, \qquad \hat\sigma^2_{n,MM}=\frac1n\sum_{i=1}^nX_i^2-\big(\bar X_n\big)^2=\frac1n\sum_{i=1}^n\big(X_i-\bar X_n\big)^2$$

**La comparaison avec l'EMV.** Ce sont **exactement** les mêmes estimateurs qu'en fiche 64 ! Pour le modèle gaussien, méthode des moments et maximum de vraisemblance **coïncident**.

**Pourquoi.** La loi gaussienne appartient à la famille exponentielle avec $T_1(x)=x$ et $T_2(x)=x^2$ (fiche 66) : les statistiques exhaustives **sont** les deux premiers moments empiriques. Les deux méthodes exploitent donc exactement la même information.

⚠️ **Et le même biais** : $\hat\sigma^2$ divise par $n$, il est donc biaisé ; l'estimateur sans biais divise par $n-1$.

</details>

**Niveau 2** — Pourquoi l'intervalle de confiance naïf de Bernoulli n'en est-il pas un ?

<details><summary>Correction</summary>

**L'intervalle proposé.**

$$I=\left[\bar X_n-\frac{q_{\alpha/2}\sqrt{p(1-p)}}{\sqrt n},\ \bar X_n+\frac{q_{\alpha/2}\sqrt{p(1-p)}}{\sqrt n}\right]$$

Le TCL garantit bien $\lim_n\mathbb P_p[I\ni p]=1-\alpha$ pour tout $p$.

**Le problème.** La définition exige que les **bornes ne dépendent pas de $\theta$**. Or elles contiennent $\sqrt{p(1-p)}$ — donc **$p$, le paramètre inconnu**. On ne peut pas calculer $I$ à partir des seules données : ce n'est pas une statistique, donc pas un intervalle de confiance.

**Solution 1 — majorer.** La fonction $p\mapsto p(1-p)$ est maximale en $p=1/2$, où elle vaut $1/4$. Donc

$$I_1=\left[\bar X_n-\frac{q_{\alpha/2}}{2\sqrt n},\ \bar X_n+\frac{q_{\alpha/2}}{2\sqrt n}\right]$$

contient $I$ et vérifie $\mathbb P_p[I_1\ni p]\geq1-\alpha$. **Conservateur** — l'intervalle est plus large que nécessaire dès que $p$ s'éloigne de $1/2$ — mais **valide**, et l'inégalité $\geq$ de la définition est bien respectée.

**Solution 2 — remplacer et invoquer Slutsky.**

$$I_2=\left[\bar X_n-\frac{q_{\alpha/2}\sqrt{\bar X_n(1-\bar X_n)}}{\sqrt n},\ \bar X_n+\frac{q_{\alpha/2}\sqrt{\bar X_n(1-\bar X_n)}}{\sqrt n}\right]$$

$\bar X_n\to p$ par la LGN, donc $\sqrt{\bar X_n(1-\bar X_n)}\to\sqrt{p(1-p)}$ par continuité, et le théorème de **Slutsky** garantit que la loi limite est inchangée. $I_2$ est un intervalle de niveau **asymptotique** $1-\alpha$.

**Le choix.** $I_1$ est valide à $n$ fini mais large ; $I_2$ est plus court mais son niveau n'est atteint qu'asymptotiquement. En pratique, avec $n$ grand et $p$ loin de $0$ et $1$, on préfère $I_2$.

⚠️ **Et la formulation correcte** : « $I$ contient $p$ avec probabilité $1-\alpha$ », et non « $p$ est dans $I$ avec probabilité $1-\alpha$ ». C'est l'**intervalle** qui est aléatoire.

</details>

**Niveau 3** — Expliquez comment le théorème de Weierstrass justifie la méthode des moments.

<details><summary>Correction</summary>

**Le problème initial.** Pour identifier $\theta^\ast$, il suffirait de trouver $\theta$ tel que

$$\int h(x)f_{\theta^\ast}(x)dx=\int h(x)f_\theta(x)dx$$

pour **toute** fonction $h$ continue bornée — car cela force $f_\theta=f_{\theta^\ast}$, donc $\theta=\theta^\ast$ par identifiabilité.

**La version empirique.** En remplaçant l'espérance par une moyenne, on chercherait $\hat\theta$ tel que

$$\frac1n\sum_{i=1}^nh(X_i)=\int h(x)f_{\hat\theta}(x)dx$$

pour toute $h$ continue bornée. **Il y en a une infinité : infaisable.**

**Le premier apport de Weierstrass.** *Les fonctions continues peuvent être approchées arbitrairement bien par des **polynômes**.* Il suffit donc de tester les polynômes :

$$\frac1n\sum_i\sum_{k=0}^da_kX_i^k=\sum_{k=0}^da_k\int x^kf_{\hat\theta}(x)dx, \qquad \forall a_0,\dots,a_d$$

**Le second apport — la linéarité.** Cette égalité doit valoir pour **tous** les coefficients $a_k$, donc coefficient par coefficient :

$$\frac1n\sum_{i=1}^nX_i^k=\int x^kf_{\hat\theta}(x)dx, \qquad k=1,\dots,d$$

soit **$d$ équations** au lieu d'une infinité. C'est exactement $\hat m_k=m_k(\hat\theta)$.

**Le passage d'une infinité à un nombre fini** s'est fait en deux temps : **densité des polynômes** dans les fonctions continues, puis **linéarité** ramenant les polynômes aux monômes.

**Les trois limites**, que le cours énonce :

1. cela ne vaut que pour les fonctions **continues** (*pas vraiment un problème*) ;
2. cela ne vaut que sur un **intervalle borné** $[a,b]$ ;
3. cela **ne dit pas** quel $d$ prendre.

**La réponse au point 3.** Le détour par la **quadrature gaussienne** en cas discret montre que $r-1$ moments déterminent **exactement** une loi à $r$ valeurs — le système de Vandermonde étant inversible. D'où la **règle empirique** : *si $\theta\in\Theta\subset\mathbb R^d$, il faut $d$ moments*. Le nombre de moments suit le nombre de paramètres, ce qui est intuitif : $d$ inconnues, $d$ équations.

</details>

**Niveau 4 — type examen** — Établissez la loi asymptotique de l'estimateur des moments et comparez-la à celle de l'EMV.

<details><summary>Correction</summary>

**Les notations.** $M(\theta)=(m_1(\theta),\dots,m_d(\theta))$, $\hat M=(\hat m_1,\dots,\hat m_d)$, $\Sigma(\theta)=\mathbb V_\theta(X,X^2,\dots,X^d)$, et $\psi^{-1}$ continûment dérivable en $M(\theta)$.

**Étape 1 — le TCL sur les moments empiriques.** Les vecteurs $(X_i,X_i^2,\dots,X_i^d)$ sont i.i.d. de moyenne $M(\theta)$ et de covariance $\Sigma(\theta)$. Le TCL multivarié donne

$$\sqrt n\big(\hat M-M(\theta)\big)\ \xrightarrow{(d)}\ N\big(0,\Sigma(\theta)\big)$$

**Étape 2 — la méthode delta.** Comme $\hat\theta_n^{MM}=\psi^{-1}(\hat M)$ et $\theta=\psi^{-1}(M(\theta))$, on applique la méthode delta avec $g=\psi^{-1}$ :

$$\sqrt n\big(\hat\theta_n^{MM}-\theta\big)\ \xrightarrow{(d)}\ N\big(0,\Gamma(\theta)\big), \qquad \Gamma(\theta)=\big(\nabla\psi^{-1}\big)^\top\Sigma(\theta)\big(\nabla\psi^{-1}\big)$$

le gradient étant évalué en $M(\theta)$.

**Étape 3 — la consistance**, par la LGN : $\hat M\to M(\theta)$, donc $\hat\theta_n^{MM}=\psi^{-1}(\hat M)\to\theta$ par continuité de $\psi^{-1}$.

**La comparaison avec l'EMV.**

|  | **Méthode des moments** | **Maximum de vraisemblance** |
|---|---|---|
| Vitesse | $1/\sqrt n$ | $1/\sqrt n$ |
| Variance asymptotique | $\Gamma(\theta)=\nabla\psi^{-1\top}\Sigma\nabla\psi^{-1}$ | $I(\theta)^{-1}$ |
| Optimalité | non en général | **oui** (Cramér-Rao) |
| Calcul | **explicite**, système à inverser | optimisation |
| Risque d'échec | $\psi$ non inversible | maxima locaux |

**Le point théorique décisif.** Le théorème de la fiche 64 donne à l'EMV la variance $I(\theta^\ast)^{-1}$, qui **atteint la borne de Cramér-Rao** : c'est la plus petite variance asymptotique atteignable par un estimateur régulier. Donc

$$\Gamma(\theta)\ \succeq\ I(\theta)^{-1}$$

avec égalité seulement dans des cas particuliers. Le cours résume : *en général, l'EMV est plus précis*.

**Le point pratique qui sauve la méthode des moments.** *Parfois, l'EMV est **intraitable**.* Il faut alors optimiser : *si la vraisemblance est concave, on peut utiliser des algorithmes d'optimisation — points intérieurs, descente de gradient. Si elle n'est pas concave, seulement des heuristiques, avec des maxima locaux.*

La méthode des moments, elle, ne demande **aucune optimisation** : on résout $\hat m_k=m_k(\hat\theta)$, c'est-à-dire $d$ équations à $d$ inconnues. Elle est donc **toujours calculable** dès que $\psi$ est inversible, et sans risque de maximum local.

**Le cas d'égalité intéressant.** Pour le modèle gaussien, les deux méthodes donnent **exactement le même estimateur**. Ce n'est pas un hasard : la gaussienne est une famille exponentielle dont les statistiques exhaustives sont $T_1(x)=x$ et $T_2(x)=x^2$ (fiche 66) — précisément les deux premiers moments. Les deux méthodes utilisent la même information, donc coïncident.

**En pratique**, on utilise souvent l'estimateur des moments comme **point de départ** d'un algorithme de maximum de vraisemblance : facile à calculer, déjà consistant, et suffisamment proche de l'optimum pour que Newton converge rapidement.

</details>

## 🔴 Common mistakes

1. **Oublier de vérifier l'identifiabilité** — sans elle, aucun estimateur ne peut converger vers un point unique.
2. **Croire qu'un estimateur peut dépendre de $\theta$** — un estimateur doit être calculable à partir des **seules données**.
3. **Comparer des estimateurs sur leur biais seul** — c'est le **risque quadratique** qui compte, biais$^2+$ variance.
4. **Croire qu'un estimateur sans biais est toujours meilleur** — un peu de biais peut réduire beaucoup la variance.
5. **Dire « $\theta$ est dans $I$ avec probabilité $1-\alpha$ »** — c'est **$I$ qui est aléatoire**, pas $\theta$.
6. **Laisser $\theta$ dans les bornes d'un intervalle de confiance** — il faut majorer la variance ou appliquer **Slutsky**.
7. **Prendre le mauvais nombre de moments** — il en faut $d$ pour $\theta\in\mathbb R^d$.
8. **Oublier de vérifier que $\psi$ est inversible** — sans cela, l'estimateur des moments n'existe pas.
9. **Se tromper dans la méthode delta** — c'est $\nabla g^\top\Sigma\nabla g$, avec le gradient évalué au **point limite**.
10. **Croire que la méthode des moments vaut l'EMV** — sa variance est en général strictement supérieure.

## 📌 Ultimate Review

1. **L'arbitrage fondateur** : plus de paramètres $=$ moins d'hypothèses mais plus de variance ; 7 paramètres libres contre 1 pour Poisson.
2. **Modèle statistique** : $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ ; $E$ espace d'échantillonnage, $\Theta$ ensemble de paramètres ; **bien spécifié** si $\mathbb P=\mathbb P_\theta$ ; **paramétrique** si $\Theta\subseteq\mathbb R^d$.
3. **Identifiabilité** : $\theta\mapsto\mathbb P_\theta$ **injective**. Contre-exemple : $X_i=\mathbf 1_{Y_i\geq0}$ avec $Y_i\sim N(\mu,\sigma^2)$ — seul $\mu/\sigma$ est identifié.
4. **Statistique** : toute fonction mesurable de l'échantillon. **Estimateur** : statistique **ne dépendant pas de $\theta$**.
5. **Consistance** : $\hat\theta_n\to\theta$ en probabilité (faible) ou presque sûrement (forte).
6. **Biais** $=\mathbb E[\hat\theta_n]-\theta$ ; **risque quadratique** $=\mathbb E[\lvert\hat\theta_n-\theta\rvert^2]$ ; et **risque $=$ biais$^2+$ variance**.
7. **Intervalle de confiance de niveau $1-\alpha$** : intervalle aléatoire à bornes indépendantes de $\theta$ avec $\mathbb P_\theta[I\ni\theta]\geq1-\alpha$ ; **asymptotique** si la limite le vérifie.
8. **Le piège de Bernoulli** : les bornes contiennent $\sqrt{p(1-p)}$. **Deux remèdes** : majorer par $1/4$ (conservateur, valide à $n$ fini) ou remplacer $p$ par $\bar X_n$ (**Slutsky**, asymptotique).
9. **Weierstrass** : toute fonction continue sur $[a,b]$ est approchable par des polynômes.
10. **Son usage** : identifier deux lois demande une infinité d'intégrales ⟹ polynômes suffisent ⟹ **monômes** suffisent ⟹ $d$ équations sur les moments.
11. **Ses trois limites** : fonctions continues · intervalles bornés · $d$ non déterminé.
12. **Quadrature gaussienne** (cas discret à $r$ valeurs) : système linéaire de matrice de **Vandermonde**, de déterminant $\prod_{j<k}(x_j-x_k)\neq0$ ⟹ $r-1$ moments déterminent **uniquement** la loi.
13. **Règle empirique** : $\theta\in\mathbb R^d$ ⟹ **$d$ moments**.
14. **Méthode des moments** : $m_k(\theta)=\mathbb E_\theta[X^k]$, $\hat m_k=\frac1n\sum X_i^k$, $\psi(\theta)=(m_1(\theta),\dots,m_d(\theta))$, et $$\hat\theta_n^{MM}=\psi^{-1}\big(\hat m_1,\dots,\hat m_d\big)$$
15. **Asymptotique** : LGN ⟹ consistance ; TCL ⟹ $\sqrt n(\hat M-M(\theta))\to N(0,\Sigma(\theta))$ ; **méthode delta** ⟹ $$\sqrt n\big(\hat\theta_n^{MM}-\theta\big)\to N\big(0,\Gamma(\theta)\big), \qquad \Gamma=\big(\nabla\psi^{-1}\big)^\top\Sigma\big(\nabla\psi^{-1}\big)$$
16. **Méthode delta multivariée** : $\sqrt n(T_n-\theta)\to N(0,\Sigma)$ et $g$ continûment dérivable ⟹ $\sqrt n(g(T_n)-g(\theta))\to N(0,\nabla g^\top\Sigma\nabla g)$.
17. **EMV contre moments** : l'EMV est **plus précis** en général (Cramér-Rao) ; la méthode des moments est **explicite** et sans maximum local. Elles **coïncident** pour le modèle gaussien.

**Formulas to know**

$$\text{risque}=\text{biais}^2+\text{variance} \qquad \mathbb P_\theta[I\ni\theta]\geq1-\alpha \qquad p(1-p)\leq\tfrac14$$

$$m_k(\theta)=\mathbb E_\theta[X^k] \qquad \hat m_k=\frac1n\sum_{i=1}^nX_i^k \qquad \hat\theta_n^{MM}=\psi^{-1}(\hat m_1,\dots,\hat m_d)$$

$$\Gamma(\theta)=\big(\nabla\psi^{-1}\big)^\top\Sigma(\theta)\big(\nabla\psi^{-1}\big) \qquad \sqrt n\big(g(T_n)-g(\theta)\big)\to N\big(0,\nabla g^\top\Sigma\nabla g\big)$$

**Methods to know** : vérifier l'identifiabilité ; décomposer un risque ; construire un intervalle de confiance et traiter le paramètre inconnu ; appliquer la méthode des moments et sa méthode delta.

## 🧠 Active Recall

**Basic** — Définissez un modèle statistique et l'identifiabilité.

<details><summary>Réponse</summary>

**Modèle statistique** : un couple $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ où $E$ est l'**espace d'échantillonnage**, $(\mathbb P_\theta)_{\theta\in\Theta}$ une **famille de lois** sur $E$, et $\Theta$ l'**ensemble de paramètres**. Le modèle est **bien spécifié** si la vraie loi $\mathbb P$ vaut $\mathbb P_{\theta^\ast}$ pour un certain $\theta^\ast\in\Theta$, et **paramétrique** si $\Theta\subseteq\mathbb R^d$.

**Identifiabilité** : $\theta$ est **identifié** si l'application $\theta\mapsto\mathbb P_\theta$ est **injective**, c'est-à-dire

$$\theta\neq\theta'\ \Longrightarrow\ \mathbb P_\theta\neq\mathbb P_{\theta'}$$

⚠️ Sans identifiabilité, deux valeurs différentes du paramètre engendrent exactement les mêmes données : **aucune** quantité d'observations ne permet de les distinguer.

</details>

**Understanding** — Que dit la décomposition risque $=$ biais$^2+$ variance ?

<details><summary>Réponse</summary>

$$\mathbb E\big[(\hat\theta_n-\theta)^2\big]=\underbrace{\big(\mathbb E[\hat\theta_n]-\theta\big)^2}_{\text{biais}^2}+\underbrace{\mathrm{var}(\hat\theta_n)}_{\text{variance}}$$

**Les deux sources d'erreur.** Le **biais** est l'erreur **systématique** : l'estimateur vise-t-il la bonne cible ? La **variance** est l'erreur **aléatoire** : à quel point le tir est-il dispersé d'un échantillon à l'autre ?

**La conséquence pratique, contre-intuitive.** Un estimateur **biaisé** peut avoir un risque **plus faible** qu'un estimateur sans biais, si sa variance est nettement moindre. C'est toute la justification de la **régularisation** (ridge, LASSO, rétrécissement) et, plus généralement, de la modélisation paramétrique : supposer $X\sim\mathrm{Poiss}(\lambda)$ introduit du biais si c'est faux, mais fait passer de $7$ paramètres à $1$, donc réduit massivement la variance.

</details>

**Application** — Estimez $\lambda$ d'une loi exponentielle par la méthode des moments.

<details><summary>Réponse</summary>

**Le paramètre est de dimension $d=1$** : un seul moment suffit.

**Le moment de population.** Pour $X\sim\mathrm{Exp}(\lambda)$, $\mathbb E[X]=\dfrac1\lambda$, donc $m_1(\lambda)=\dfrac1\lambda$.

**L'application $\psi$ et son inverse.** $\psi(\lambda)=1/\lambda$, donc $\psi^{-1}(m)=1/m$ — bijective sur $(0,\infty)$.

**L'estimateur.**

$$\hat\lambda_n^{MM}=\psi^{-1}\big(\hat m_1\big)=\frac{1}{\bar X_n}$$

**La consistance.** $\bar X_n\to1/\lambda$ par la LGN, donc $\hat\lambda_n\to\lambda$ par continuité de $x\mapsto1/x$ sur $(0,\infty)$.

**La loi asymptotique par la méthode delta.** $\mathrm{var}(X)=1/\lambda^2$, donc $\sqrt n(\bar X_n-1/\lambda)\to N(0,1/\lambda^2)$. Avec $g(m)=1/m$ et $g'(m)=-1/m^2$, évalué en $m=1/\lambda$ : $g'(1/\lambda)=-\lambda^2$. D'où

$$\sqrt n\big(\hat\lambda_n-\lambda\big)\ \xrightarrow{(d)}\ N\Big(0,\ \lambda^4\cdot\frac{1}{\lambda^2}\Big)=N\big(0,\lambda^2\big)$$

**Comparaison avec l'EMV.** Pour la loi exponentielle, l'EMV est **aussi** $1/\bar X_n$, et l'information de Fisher vaut $I(\lambda)=1/\lambda^2$, d'où une variance asymptotique $I(\lambda)^{-1}=\lambda^2$ — **identique**.

**Pourquoi la coïncidence.** La loi exponentielle est une famille exponentielle à un paramètre dont la statistique exhaustive est $T(x)=x$ : les deux méthodes utilisent la même information.

</details>

**Comparison** — EMV et méthode des moments : quand préférer laquelle ?

<details><summary>Réponse</summary>

|  | **Maximum de vraisemblance** | **Méthode des moments** |
|---|---|---|
| Précision | **optimale** ($I(\theta)^{-1}$, Cramér-Rao) | $\Gamma(\theta)\succeq I(\theta)^{-1}$ |
| Calcul | **optimisation** | système d'équations, **explicite** |
| Risque de blocage | maxima locaux si non concave | $\psi$ non inversible |
| Ce qu'il faut connaître | la **vraisemblance** entière | seulement $d$ **moments** |

**Le cours tranche :** *en général, l'EMV est plus précis*. La raison est le théorème de la fiche 64 : sa variance asymptotique atteint la **borne de Cramér-Rao**.

**Mais** : *parfois, l'EMV est **intraitable***. Il faut alors optimiser — *si la vraisemblance est concave, points intérieurs ou descente de gradient ; si elle ne l'est pas, seulement des heuristiques, avec des maxima locaux*.

**Quand préférer les moments.** Vraisemblance impossible à écrire ou à maximiser · besoin d'un estimateur **rapide et sûr** · besoin d'un **point de départ** pour un algorithme d'optimisation · modèle où seuls quelques moments sont spécifiés (méthode des moments **généralisée**, très utilisée en économétrie).

**Quand elles coïncident.** Pour les familles exponentielles dont les statistiques exhaustives sont des moments — gaussienne, exponentielle, Poisson. Les deux méthodes exploitent alors exactement la même information.

</details>

**Exam-style** — Expliquez comment construire un intervalle de confiance et le piège du paramètre inconnu.

<details><summary>Réponse</summary>

**La définition.** Un intervalle de confiance de niveau $1-\alpha$ est un intervalle **aléatoire** $I$ — dépendant de $X_1,\dots,X_n$ — dont les **bornes ne dépendent pas de $\theta$** et tel que

$$\mathbb P_\theta\big[I\ni\theta\big]\geq1-\alpha, \qquad \forall\theta\in\Theta$$

La version **asymptotique** remplace l'inégalité par sa limite quand $n\to\infty$.

**La construction, en trois pas.**

1. Trouver un estimateur consistant $\hat\theta_n$.
2. Établir sa loi asymptotique par le TCL : $\sqrt n(\hat\theta_n-\theta)\to N(0,\sigma^2(\theta))$.
3. Inverser : $\mathbb P\big[\lvert\hat\theta_n-\theta\rvert\leq q_{\alpha/2}\sigma(\theta)/\sqrt n\big]\to1-\alpha$.

**Le piège.** Sur l'exemple de Bernoulli, cela donne

$$I=\left[\bar X_n\pm\frac{q_{\alpha/2}\sqrt{p(1-p)}}{\sqrt n}\right]$$

**$I$ dépend de $p$**, le paramètre inconnu. Les bornes ne sont donc **pas calculables** : ce n'est pas un intervalle de confiance au sens de la définition. C'est exactement la contrainte du concept 3 — un estimateur ne doit pas dépendre de $\theta$.

**Les deux remèdes.**

**1. Majorer la variance.** $p(1-p)\leq1/4$, donc

$$I_1=\left[\bar X_n\pm\frac{q_{\alpha/2}}{2\sqrt n}\right] \supseteq I$$

et $\mathbb P_p[I_1\ni p]\geq1-\alpha$. **Conservateur mais valide à $n$ fini** — et l'inégalité $\geq$ de la définition est exactement ce qui autorise cet élargissement.

**2. Substituer et invoquer Slutsky.**

$$I_2=\left[\bar X_n\pm\frac{q_{\alpha/2}\sqrt{\bar X_n(1-\bar X_n)}}{\sqrt n}\right]$$

La LGN donne $\bar X_n\to p$, la continuité donne $\sqrt{\bar X_n(1-\bar X_n)}\to\sqrt{p(1-p)}$, et **Slutsky** garantit que la loi limite est inchangée. Niveau **asymptotique** $1-\alpha$.

**Le choix.** $I_1$ garantit le niveau à toute taille d'échantillon, au prix d'un intervalle plus large — d'autant plus large que $p$ est loin de $1/2$. $I_2$ est plus court mais ne garantit rien à $n$ fini.

**La généralité de ces deux stratégies.** Elles se retrouvent partout : soit on **majore** la variance inconnue par un pire cas, soit on l'**estime** et l'on invoque Slutsky. La seconde est la plus courante — c'est exactement ce que fait la statistique de Wald de la fiche 65, en remplaçant $I(\theta^\ast)$ par $I(\hat\theta_n)$.

⚠️ **Et la formulation** : « $I$ contient $\theta$ avec probabilité $1-\alpha$ ». C'est **l'intervalle** qui est aléatoire, pas $\theta$, qui est un nombre fixe et inconnu. La probabilité porte sur la **procédure**, pas sur le paramètre.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| L'arbitrage de la modélisation ? | Moins de paramètres $=$ plus de biais mais moins de variance |
| Définition d'un modèle statistique ? | $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ |
| Que veut dire « bien spécifié » ? | $\mathbb P=\mathbb P_\theta$ pour un $\theta\in\Theta$ |
| Que veut dire « paramétrique » ? | $\Theta\subseteq\mathbb R^d$ |
| Définition de l'identifiabilité ? | $\theta\mapsto\mathbb P_\theta$ **injective** |
| Le contre-exemple du cours ? | $X_i=\mathbf 1_{Y_i\geq0}$ : seul $\mu/\sigma$ est identifié |
| Différence entre statistique et estimateur ? | L'estimateur **ne dépend pas de $\theta$** |
| Consistance faible / forte ? | Convergence en probabilité / presque sûre |
| Biais d'un estimateur ? | $\mathbb E[\hat\theta_n]-\theta$ |
| Risque quadratique ? | $\mathbb E[\lvert\hat\theta_n-\theta\rvert^2]$ |
| Sa décomposition ? | **biais$^2$ $+$ variance** |
| Définition d'un intervalle de confiance ? | Bornes indépendantes de $\theta$, $\mathbb P_\theta[I\ni\theta]\geq1-\alpha$ |
| Qui est aléatoire dans $I\ni\theta$ ? | **L'intervalle**, pas $\theta$ |
| Le problème de l'IC de Bernoulli ? | Les bornes contiennent $\sqrt{p(1-p)}$ |
| Première solution ? | Majorer $p(1-p)$ par $1/4$ |
| Seconde solution ? | Remplacer $p$ par $\bar X_n$ et invoquer **Slutsky** |
| Théorème de Weierstrass ? | Toute fonction continue sur $[a,b]$ est approchable par des polynômes |
| Son usage ici ? | Ramener une infinité de conditions à $d$ moments |
| Ses trois limites ? | Continuité · intervalle borné · $d$ non déterminé |
| Ce qu'établit la quadrature gaussienne ? | $r-1$ moments déterminent **uniquement** une loi à $r$ valeurs |
| Quel déterminant intervient ? | Celui de **Vandermonde**, $\prod_{j<k}(x_j-x_k)$ |
| La règle empirique du nombre de moments ? | $d$ moments pour $\theta\in\mathbb R^d$ |
| Moment de population ? | $m_k(\theta)=\mathbb E_\theta[X^k]$ |
| Moment empirique ? | $\hat m_k=\frac1n\sum_iX_i^k$ |
| Estimateur des moments ? | $\hat\theta_n^{MM}=\psi^{-1}(\hat m_1,\dots,\hat m_d)$ |
| Quelle hypothèse sur $\psi$ ? | Elle doit être **bijective** |
| Loi asymptotique de $\hat\theta^{MM}$ ? | $N(0,\Gamma(\theta))$ avec $\Gamma=\nabla\psi^{-1\top}\Sigma\nabla\psi^{-1}$ |
| Énoncé de la méthode delta ? | $\sqrt n(g(T_n)-g(\theta))\to N(0,\nabla g^\top\Sigma\nabla g)$ |
| Quel estimateur est le plus précis ? | En général l'**EMV** |
| Pourquoi ? | Sa variance atteint la borne de **Cramér-Rao** |
| Quand préférer les moments ? | Quand l'EMV est **intraitable** |
| Pour quel modèle coïncident-elles ? | Le modèle **gaussien** (et exponentiel, Poisson) |
