# Fiche 64 — Maximum de vraisemblance : de Kullback-Leibler à l'information de Fisher

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Rigollet, *18.650 Statistics for Applications*, MIT OpenCourseWare, automne 2016 — chapitre 3 « Maximum Likelihood Estimation » |
| **Difficulté** | Must know — la méthode d'estimation universelle |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 50 (maximum de vraisemblance en régression), loi des grands nombres, dérivées secondes |
| **Concepts clés** | Modèle statistique, distance en variation totale, divergence de Kullback-Leibler, principe du maximum de vraisemblance, concavité, gradient et hessienne, vraisemblance discrète et continue, estimateur du maximum de vraisemblance, information de Fisher, normalité asymptotique |
| **Poids à l'examen** | Trois choses : la **chaîne KL ⟹ maximum de vraisemblance** — c'est *la* dérivation du chapitre ; l'**information de Fisher** sous ses deux formes ; et le **théorème asymptotique** avec ses hypothèses. |

## 🎯 Vue d'ensemble

**Le cadre.** Soit $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ un **modèle statistique** associé à un échantillon de variables i.i.d. $X_1,\dots,X_n$. On suppose qu'il existe $\theta^\ast\in\Theta$ tel que $X_1\sim\mathbb P_{\theta^\ast}$ : $\theta^\ast$ est le **vrai paramètre**.

> **Le but du statisticien.** *Étant donné $X_1,\dots,X_n$, trouver un estimateur $\hat\theta=\hat\theta(X_1,\dots,X_n)$ tel que $\mathbb P_{\hat\theta}$ soit **proche** de $\mathbb P_{\theta^\ast}$.* Cela signifie que $\lvert\mathbb P_{\hat\theta}(A)-\mathbb P_{\theta^\ast}(A)\rvert$ est petit **pour tout** $A\subset E$.

```
IDÉE         estimer θ* = rendre P_θ̂ proche de P_θ*
DISTANCE 1   variation totale TV — belle, mais INESTIMABLE
DISTANCE 2   divergence KL — asymétrique, et c'est ce qui la sauve
CHAÎNE       min KL ⟺ max Σ log p_θ(Xᵢ) ⟺ max Π p_θ(Xᵢ)
                                            ↑ le maximum de vraisemblance
PRÉCISION    √n(θ̂ − θ*) → N(0, I(θ*)⁻¹)   ← information de Fisher
```

> **La logique du chapitre est un raisonnement en trois temps.** On veut minimiser une distance entre lois. La distance naturelle — la variation totale — **ne s'estime pas**. On la remplace par la divergence KL, qui, elle, s'estime **grâce à son asymétrie**. Et la minimisation de la KL estimée **est exactement** le maximum de vraisemblance. La méthode la plus utilisée de la statistique n'est donc pas un postulat : elle **se déduit**.

## 🔴 Concept 1 — La distance en variation totale

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

La **distance en variation totale** entre deux mesures de probabilité $\mathbb P_\theta$ et $\mathbb P_{\theta'}$ est

$$TV(\mathbb P_\theta,\mathbb P_{\theta'})=\max_{A\subset E}\big\lvert\mathbb P_\theta(A)-\mathbb P_{\theta'}(A)\big\rvert$$

</div>

**Cas discret.** Si $E$ est discret — fini ou dénombrable, ce qui inclut Bernoulli, binomiale, Poisson —, $X$ a une **fonction de masse** $\mathbb P(X=x)=p(x)$ avec $p(x)\geq0$ et $\sum_{x\in E}p(x)=1$. La variation totale est alors une fonction simple des fonctions de masse :

$$TV(\mathbb P_\theta,\mathbb P_{\theta'})=\frac12\sum_{x\in E}\big\lvert p_\theta(x)-p_{\theta'}(x)\big\rvert$$

**Cas continu.** Si $E$ est continu — gaussienne, exponentielle… — et si $X$ a une densité $\mathbb P(X\in A)=\int_Af(x)dx$ avec $f\geq0$ et $\int_Ef=1$ :

$$TV(\mathbb P_\theta,\mathbb P_{\theta'})=\frac12\int_E\big\lvert f_\theta(x)-f_{\theta'}(x)\big\rvert\,dx$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Propriétés de la variation totale.</span>

- $TV(\mathbb P_\theta,\mathbb P_{\theta'})=TV(\mathbb P_{\theta'},\mathbb P_\theta)$ — **symétrique**
- $TV(\mathbb P_\theta,\mathbb P_{\theta'})\geq0$
- Si $TV(\mathbb P_\theta,\mathbb P_{\theta'})=0$ alors $\mathbb P_\theta=\mathbb P_{\theta'}$ — **définie**
- $TV(\mathbb P_\theta,\mathbb P_{\theta'})\leq TV(\mathbb P_\theta,\mathbb P_{\theta''})+TV(\mathbb P_{\theta''},\mathbb P_{\theta'})$ — **inégalité triangulaire**

*Ces propriétés impliquent que la variation totale est bien une **distance** entre distributions de probabilité.*

</div>

**La stratégie d'estimation.** *Construire un estimateur $\widehat{TV}(\mathbb P_\theta,\mathbb P_{\theta^\ast})$ pour tout $\theta\in\Theta$, puis trouver le $\hat\theta$ qui **minimise** la fonction $\theta\mapsto\widehat{TV}(\mathbb P_\theta,\mathbb P_{\theta^\ast})$.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Problème : on ne voit pas comment construire $\widehat{TV}(\mathbb P_\theta,\mathbb P_{\theta^\ast})$ !</span>

</div>

⚠️ **Comprenez précisément l'obstacle, il détermine toute la suite.** La variation totale est

$$\frac12\int\big\lvert f_{\theta^\ast}(x)-f_\theta(x)\big\rvert\,dx$$

⚠️ Il faudrait estimer une intégrale de la **valeur absolue d'une différence** de densités. Or on ne dispose que d'un échantillon tiré selon $f_{\theta^\ast}$, et la loi des grands nombres n'estime que des quantités de la forme $E_{\theta^\ast}[h(X)]=\int f_{\theta^\ast}(x)h(x)dx$ — c'est-à-dire des intégrales **pondérées par $f_{\theta^\ast}$**. La valeur absolue empêche cette factorisation. **C'est là que la symétrie de $TV$ devient un défaut.**

## 🔴 Concept 2 — La divergence de Kullback-Leibler

> *Il existe de nombreuses distances entre mesures de probabilité pour remplacer la variation totale. Choisissons-en une qui soit **plus commode**.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

La **divergence de Kullback-Leibler (KL)** entre deux mesures $\mathbb P_\theta$ et $\mathbb P_{\theta'}$ est

$$KL(\mathbb P_\theta,\mathbb P_{\theta'})=\begin{cases}\displaystyle\sum_{x\in E}p_\theta(x)\log\left(\frac{p_\theta(x)}{p_{\theta'}(x)}\right) & \text{si } E \text{ est discret}\\[12pt] \displaystyle\int_Ef_\theta(x)\log\left(\frac{f_\theta(x)}{f_{\theta'}(x)}\right)dx & \text{si } E \text{ est continu}\end{cases}$$

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Propriétés de la divergence KL.</span>

- $KL(\mathbb P_\theta,\mathbb P_{\theta'})\neq KL(\mathbb P_{\theta'},\mathbb P_\theta)$ **en général** — pas symétrique
- $KL(\mathbb P_\theta,\mathbb P_{\theta'})\geq0$
- Si $KL(\mathbb P_\theta,\mathbb P_{\theta'})=0$ alors $\mathbb P_\theta=\mathbb P_{\theta'}$ — **définie**
- $KL(\mathbb P_\theta,\mathbb P_{\theta'})\not\leq KL(\mathbb P_\theta,\mathbb P_{\theta''})+KL(\mathbb P_{\theta''},\mathbb P_{\theta'})$ **en général** — pas d'inégalité triangulaire

*Ce n'est **pas une distance**. On l'appelle une **divergence**.*

> ***L'asymétrie est la clé de notre capacité à l'estimer !***

</div>

⚠️ **Cette dernière phrase est le pivot du chapitre.** On abandonne deux propriétés — symétrie et inégalité triangulaire — pour en gagner une seule : **l'estimabilité**. C'est un arbitrage délibéré, et c'est ce qui fait tout fonctionner. Le concept suivant montre pourquoi.

## 🔴 Concept 3 — De KL au maximum de vraisemblance

**Étape 1 — écrire la KL comme une espérance sous la vraie loi.**

$$KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\mathbb E_{\theta^\ast}\left[\log\left(\frac{p_{\theta^\ast}(X)}{p_\theta(X)}\right)\right]=\mathbb E_{\theta^\ast}\big[\log p_{\theta^\ast}(X)\big]-\mathbb E_{\theta^\ast}\big[\log p_\theta(X)\big]$$

> **Voilà pourquoi l'asymétrie sauve tout.** En plaçant $\theta^\ast$ **en premier argument**, la pondération de l'intégrale est $f_{\theta^\ast}$ — exactement la loi dont on dispose d'un échantillon. La KL devient une **espérance sous la vraie loi**, donc estimable par moyenne empirique. La variation totale, symétrique, n'offrait pas ce choix.

**Étape 2 — isoler la partie qui dépend de $\theta$.** La fonction $\theta\mapsto KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)$ est de la forme

$$\text{« constante »}-\mathbb E_{\theta^\ast}\big[\log p_\theta(X)\big]$$

Le premier terme ne dépend **pas** de $\theta$ : il est inconnu, mais il ne joue aucun rôle dans la minimisation.

**Étape 3 — estimer par la loi des grands nombres.** Puisque $\mathbb E_{\theta^\ast}[h(X)]\approx\frac1n\sum_{i=1}^nh(X_i)$ :

$$\widehat{KL}(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\text{« constante »}-\frac1n\sum_{i=1}^n\log p_\theta(X_i)$$

**Étape 4 — la chaîne d'équivalences.**

$$\min_{\theta\in\Theta}\widehat{KL}(\mathbb P_{\theta^\ast},\mathbb P_\theta)\iff\min_{\theta\in\Theta}-\frac1n\sum_{i=1}^n\log p_\theta(X_i)\iff\max_{\theta\in\Theta}\frac1n\sum_{i=1}^n\log p_\theta(X_i)$$

$$\iff\max_{\theta\in\Theta}\sum_{i=1}^n\log p_\theta(X_i)\iff\boxed{\ \max_{\theta\in\Theta}\prod_{i=1}^np_\theta(X_i)\ }$$

> ***C'est le principe du maximum de vraisemblance.***

> **Relisez la chaîne : chaque flèche est élémentaire, et pourtant l'aboutissement est spectaculaire.** On est parti d'un objectif abstrait — rapprocher deux lois — et l'on obtient une recette parfaitement concrète : **maximiser la probabilité d'observer les données qu'on a observées**.
>
> **Et cela répond à une question qu'on se pose rarement** : pourquoi le maximum de vraisemblance ? Parce que c'est, exactement, la **minimisation empirique de la divergence de Kullback-Leibler** à la vraie loi. Ce n'est pas une heuristique séduisante, c'est une conséquence.
>
> **Le lien avec la fiche 50** : on y avait constaté que l'EMV coïncide avec les MCO sous erreurs gaussiennes. On sait maintenant pourquoi les MCO sont légitimes — ils minimisent la KL au modèle gaussien.

## 🟠 Concept 4 — Interlude : maximiser une fonction

*Notons que $\min_{\theta\in\Theta}-h(\theta)\iff\max_{\theta\in\Theta}h(\theta)$. Dans ce cours, on se concentre sur la maximisation.* Or *maximiser une fonction arbitraire peut être difficile* — l'exemple donné est $\theta\mapsto\prod_{i=1}^n(\theta-X_i)$, dont le graphe oscille.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Une fonction deux fois dérivable $h:\Theta\subset\mathbb R\to\mathbb R$ est **concave** si

$$h''(\theta)\leq0, \qquad \forall\theta\in\Theta$$

Elle est **strictement concave** si l'inégalité est stricte : $h''(\theta)<0$. Et $h$ est (strictement) **convexe** si $-h$ est (strictement) concave, c'est-à-dire $h''(\theta)\geq0$ (resp. $>0$).

</div>

**Exemples du cours.**

| $\Theta$ | $h(\theta)$ | Nature |
|---|---|---|
| $\mathbb R$ | $-\theta^2$ | strictement concave |
| $(0,\infty)$ | $\sqrt\theta$ | strictement concave |
| $(0,\infty)$ | $\log\theta$ | strictement concave |
| $[0,\pi]$ | $\sin(\theta)$ | concave |
| $\mathbb R$ | $2\theta-3$ | concave **et** convexe (affine) |

**Le cas multivarié.** Pour $h:\Theta\subset\mathbb R^d\to\mathbb R$, $d\geq2$, on définit

$$\textbf{le gradient : } \nabla h(\theta)=\begin{pmatrix}\frac{\partial h}{\partial\theta_1}(\theta)\\\vdots\\\frac{\partial h}{\partial\theta_d}(\theta)\end{pmatrix}\in\mathbb R^d, \qquad \textbf{la hessienne : } \nabla^2h(\theta)=\begin{pmatrix}\frac{\partial^2h}{\partial\theta_1\partial\theta_1}(\theta)&\cdots&\frac{\partial^2h}{\partial\theta_1\partial\theta_d}(\theta)\\\vdots&\ddots&\vdots\\\frac{\partial^2h}{\partial\theta_d\partial\theta_1}(\theta)&\cdots&\frac{\partial^2h}{\partial\theta_d\partial\theta_d}(\theta)\end{pmatrix}\in\mathbb R^{d\times d}$$

> **Caractérisation.**
>
> $$h \text{ concave}\iff x^\top\nabla^2h(\theta)x\leq0\quad\forall x\in\mathbb R^d,\ \forall\theta\in\Theta$$
>
> $$h \text{ strictement concave}\iff x^\top\nabla^2h(\theta)x<0\quad\forall x\in\mathbb R^d,\ \forall\theta\in\Theta$$

**Exemples** : $\Theta=\mathbb R^2$ avec $h(\theta)=-\theta_1^2-2\theta_2^2$ ou $h(\theta)=-(\theta_1-\theta_2)^2$ ; $h(\theta)=\log(\theta_1+\theta_2)$ sur $(0,\infty)$.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi la concavité stricte est ce qu'on cherche.</span>

*Les fonctions strictement concaves sont **faciles à maximiser** : si elles ont un maximum, il est **unique**. C'est l'unique solution de*

$$h'(\theta)=0 \qquad\text{ou, dans le cas multivarié,}\qquad \nabla h(\theta)=0\in\mathbb R^d$$

*Il existe de nombreux algorithmes pour le trouver numériquement : c'est la théorie de l'**optimisation convexe**. Dans ce cours, on aura souvent une **formule fermée**.*

</div>

⚠️ **C'est le pont explicite avec les fiches 35 à 41.** La condition $x^\top\nabla^2h(\theta)x\leq0$ dit que la hessienne est **semi-définie négative** — c'est la condition du second ordre de la fiche 35, au signe près. Et « il existe de nombreux algorithmes » renvoie au gradient et à Newton de la fiche 39. La statistique et l'optimisation convexe sont ici le même sujet.

## 🔴 Concept 5 — La vraisemblance

### Cas discret

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

La **vraisemblance** du modèle est l'application $L_n$ définie par

$$L_n:E^n\times\Theta\to\mathbb R, \qquad (x_1,\dots,x_n,\theta)\mapsto\mathbb P_\theta\big[X_1=x_1,\dots,X_n=x_n\big]$$

</div>

**Exemple 1 — épreuves de Bernoulli.** Si $X_1,\dots,X_n\overset{iid}\sim\mathrm{Ber}(p)$ pour $p\in(0,1)$ : $E=\{0,1\}$, $\Theta=(0,1)$, et pour tout $(x_1,\dots,x_n)\in\{0,1\}^n$,

$$L(x_1,\dots,x_n,p)=\prod_{i=1}^n\mathbb P_p[X_i=x_i]=\prod_{i=1}^np^{x_i}(1-p)^{1-x_i}=p^{\sum_{i=1}^nx_i}(1-p)^{n-\sum_{i=1}^nx_i}$$

**Exemple 2 — modèle de Poisson.** Si $X_1,\dots,X_n\overset{iid}\sim\mathrm{Poiss}(\lambda)$ pour $\lambda>0$ : $E=\mathbb N$, $\Theta=(0,\infty)$, et

$$L(x_1,\dots,x_n,\lambda)=\prod_{i=1}^n\mathbb P_\lambda[X_i=x_i]=\prod_{i=1}^ne^{-\lambda}\frac{\lambda^{x_i}}{x_i!}=e^{-n\lambda}\frac{\lambda^{\sum_{i=1}^nx_i}}{x_1!\cdots x_n!}$$

### Cas continu

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Si toutes les $\mathbb P_\theta$ ont une densité $f_\theta$, la vraisemblance est

$$L:E^n\times\Theta\to\mathbb R, \qquad (x_1,\dots,x_n,\theta)\mapsto\prod_{i=1}^nf_\theta(x_i)$$

</div>

**Exemple 1 — modèle gaussien.** Si $X_1,\dots,X_n\overset{iid}\sim N(\mu,\sigma^2)$ : $E=\mathbb R$, $\Theta=\mathbb R\times(0,\infty)$, et

$$L(x_1,\dots,x_n,\mu,\sigma^2)=\frac{1}{(\sigma\sqrt{2\pi})^n}\exp\left(-\frac{1}{2\sigma^2}\sum_{i=1}^n(x_i-\mu)^2\right)$$

> **Notez la forme récurrente : un produit.** C'est l'indépendance qui la produit, et c'est elle qui rend le logarithme naturel — il transforme le produit en somme, donc la maximisation en un problème d'analyse ordinaire.
>
> **Et l'on reconnaît la fiche 50** : la vraisemblance gaussienne fait apparaître $\sum(x_i-\mu)^2$ — le critère des **moindres carrés**. C'est exactement la connexion établie là-bas.

## 🔴 Concept 6 — L'estimateur du maximum de vraisemblance

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

L'**estimateur du maximum de vraisemblance** de $\theta$ est

$$\hat\theta_n^{MLE}=\underset{\theta\in\Theta}{\mathrm{argmax}}\ L(X_1,\dots,X_n,\theta)$$

*sous réserve qu'il existe.*

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarque — l'estimateur de log-vraisemblance.</span>

*En pratique, on utilise le fait que*

$$\hat\theta_n^{MLE}=\underset{\theta\in\Theta}{\mathrm{argmax}}\ \log L(X_1,\dots,X_n,\theta)$$

</div>

⚠️ **C'est légitime parce que $\log$ est strictement croissante** : elle ne déplace pas l'argmax. Et c'est indispensable en pratique, pour deux raisons — le logarithme transforme le **produit en somme**, et il évite le **sous-dépassement numérique** (le produit de $n$ probabilités devient vite trop petit pour être représenté).

**Les trois exemples.**

| Modèle | EMV |
|---|---|
| **Bernoulli** | $\hat p_n^{MLE}=\bar X_n$ |
| **Poisson** | $\hat\lambda_n^{MLE}=\bar X_n$ |
| **Gaussien** | $(\hat\mu_n,\hat\sigma_n^2)=\big(\bar X_n,\ \hat S_n\big)$ |

où $\hat S_n=\frac1n\sum_{i=1}^n(X_i-\bar X_n)^2$ est la variance empirique.

> **Les trois donnent la moyenne empirique — ce n'est pas un hasard.** Pour Bernoulli comme pour Poisson, le paramètre **est** l'espérance ; la vraisemblance ne dépend des données que par $\sum X_i$, et l'EMV renvoie donc naturellement $\bar X_n$.
>
> ⚠️ **Et retenez le diviseur $n$ pour la variance gaussienne** : l'EMV de $\sigma^2$ est **biaisé**, comme signalé en fiche 50. L'estimateur sans biais divise par $n-1$.

## 🔴 Concept 7 — L'information de Fisher

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Définissons la **log-vraisemblance pour une observation** :

$$\ell(\theta)=\log L_1(X,\theta), \qquad \theta\in\Theta\subset\mathbb R^d$$

Supposons $\ell$ presque sûrement deux fois dérivable. Sous certaines conditions de régularité, l'**information de Fisher** du modèle statistique est

$$\boxed{\ I(\theta)=\mathbb E\big[\nabla\ell(\theta)\nabla\ell(\theta)^\top\big]-\mathbb E\big[\nabla\ell(\theta)\big]\,\mathbb E\big[\nabla\ell(\theta)\big]^\top=-\mathbb E\big[\nabla^2\ell(\theta)\big]\ }$$

Si $\Theta\subset\mathbb R$, on obtient

$$I(\theta)=\mathrm{var}\big[\ell'(\theta)\big]=-\mathbb E\big[\ell''(\theta)\big]$$

</div>

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment lire cette définition — deux visages du même objet.</span>

- **Premier visage : une variance.** $I(\theta)=\mathrm{var}[\ell'(\theta)]$ mesure combien la pente de la log-vraisemblance **varie** d'un échantillon à l'autre. Beaucoup de variation ⟹ les données discriminent fortement entre les valeurs de $\theta$.
- **Second visage : une courbure.** $I(\theta)=-\mathbb E[\ell''(\theta)]$ mesure à quel point la log-vraisemblance est **pointue** au maximum. Un pic étroit ⟹ le maximum est bien localisé, donc l'estimation est précise.

**Que ces deux quantités coïncident est un théorème** — l'**identité de l'information** — et il repose sur les « conditions de régularité » mentionnées, dont la plus importante est que **le support de $\mathbb P_\theta$ ne dépend pas de $\theta$** (hypothèse 2 du concept 8).

</div>

⚠️ **L'information de Fisher est déjà apparue en fiche 60**, comme variance asymptotique de l'EMV dans les modèles espace-état. C'est le même objet, et le théorème suivant explique pourquoi il revient partout.

## 🔴 Concept 8 — Le théorème asymptotique

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème.</span>

*Soit $\theta^\ast\in\Theta$ le vrai paramètre. Supposons que :*

1. *le modèle est **identifié** ;*
2. *pour tout $\theta\in\Theta$, le **support de $\mathbb P_\theta$ ne dépend pas de $\theta$** ;*
3. *$\theta^\ast$ **n'est pas sur la frontière** de $\Theta$ ;*
4. *$I(\theta)$ est **inversible** dans un voisinage de $\theta^\ast$ ;*
5. *quelques conditions techniques supplémentaires.*

*Alors $\hat\theta_n^{MLE}$ satisfait :*

$$\hat\theta_n^{MLE}\ \xrightarrow[n\to\infty]{\mathbb P}\ \theta^\ast \qquad \text{(par rapport à } \mathbb P_{\theta^\ast})$$

$$\boxed{\ \sqrt n\big(\hat\theta_n^{MLE}-\theta^\ast\big)\ \xrightarrow[n\to\infty]{(d)}\ N\big(0,\ I(\theta^\ast)^{-1}\big) \qquad \text{(par rapport à } \mathbb P_{\theta^\ast})}$$

</div>

> **Ce théorème est la raison pour laquelle le maximum de vraisemblance domine la statistique.** Il donne, d'un coup :
>
> - la **consistance** — l'estimateur converge vers la vérité ;
> - la **vitesse** $1/\sqrt n$ — la vitesse standard ;
> - la **loi limite exacte**, donc les intervalles de confiance et les tests ;
> - et une **variance asymptotique $I(\theta^\ast)^{-1}$** qui, par la borne de Cramér-Rao, est la **plus petite possible** parmi les estimateurs réguliers. L'EMV est **asymptotiquement efficace**.

⚠️ **Chaque hypothèse écarte un contre-exemple précis — il faut savoir lequel.**

| Hypothèse | Ce qu'elle écarte |
|---|---|
| **1. Modèle identifié** | Sinon deux $\theta$ différents donnent la même loi : rien ne permet de les distinguer, à aucune taille d'échantillon. |
| **2. Support indépendant de $\theta$** | C'est l'hypothèse la plus souvent violée. Contre-exemple : le modèle uniforme $U[0,\theta]$, dont l'EMV est $\max_iX_i$ ; il converge à la vitesse $1/n$, **pas** $1/\sqrt n$, et sa loi limite est exponentielle, pas gaussienne. |
| **3. $\theta^\ast$ à l'intérieur** | Sur une frontière, la condition $\nabla\ell=0$ ne caractérise plus le maximum, et la loi limite devient une gaussienne **tronquée**. |
| **4. $I(\theta)$ inversible** | Sinon la variance asymptotique n'existe pas : certaines directions du paramètre ne sont pas informées par les données. |

> **Le lien avec la fiche 50, maintenant complet.** On y avait établi que, dans le modèle normal-linéaire, $\hat\beta\sim N_p(\beta,\sigma^2(X^TX)^{-1})$ — **exactement**, à distance finie. Le théorème ci-dessus dit que c'est un cas particulièrement heureux d'un phénomène **général** : tout EMV est asymptotiquement gaussien de variance $I(\theta^\ast)^{-1}$. Ici, $\sigma^2(X^TX)^{-1}$ **est** l'inverse de l'information de Fisher du modèle linéaire.

## Comment résoudre l'exercice type (protocole)

1. **Écrire le modèle** : $E$, $\Theta$, la famille $(\mathbb P_\theta)$, et vérifier l'**identifiabilité**.
2. **Écrire la vraisemblance** : produit des masses (discret) ou des densités (continu).
3. **Passer au logarithme** — le produit devient une somme.
4. **Dériver** : $\ell'(\theta)=0$, ou $\nabla\ell(\theta)=0$ en dimension $d$.
5. **Vérifier la concavité** : $\ell''<0$, ou hessienne définie négative ⟹ le maximum est **unique**.
6. **Calculer l'information de Fisher** : $I(\theta)=-\mathbb E[\ell''(\theta)]$ pour **une** observation.
7. **Conclure** : $\sqrt n(\hat\theta_n-\theta^\ast)\to N(0,I(\theta^\ast)^{-1})$, d'où intervalles de confiance et tests.
8. **Vérifier les hypothèses du théorème** — surtout que le **support ne dépend pas de $\theta$**.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « estimer le paramètre d'un modèle paramétrique » | **maximum de vraisemblance** |
| « rapprocher deux lois » | KL, puis EMV |
| « pourquoi maximiser la vraisemblance ? » | c'est minimiser la **KL empirique** |
| « le maximum est-il unique ? » | vérifier la **stricte concavité** |
| « quelle précision ? » | **information de Fisher**, $I(\theta^\ast)^{-1}/n$ |
| « intervalle de confiance asymptotique » | $\hat\theta\pm q_{\alpha/2}\sqrt{I(\hat\theta)^{-1}/n}$ |
| modèle $U[0,\theta]$ ou support mobile | le théorème **ne s'applique pas** |
| $\theta^\ast$ au bord de $\Theta$ | hypothèse 3 violée |

### Exercices progressifs

**Niveau 1** — Calculez l'EMV du paramètre d'un modèle de Bernoulli.

<details><summary>Correction</summary>

**La vraisemblance.**

$$L(x_1,\dots,x_n,p)=p^{\sum x_i}(1-p)^{n-\sum x_i}$$

**La log-vraisemblance.** En posant $S=\sum_{i=1}^nx_i$ :

$$\log L=S\log p+(n-S)\log(1-p)$$

**La dérivée.**

$$\frac{\partial\log L}{\partial p}=\frac Sp-\frac{n-S}{1-p}$$

**L'annulation.** $\frac Sp=\frac{n-S}{1-p}$ donne $S(1-p)=p(n-S)$, soit $S-Sp=pn-pS$, donc $S=pn$ et

$$\hat p_n^{MLE}=\frac Sn=\bar X_n$$

**La vérification de concavité.**

$$\frac{\partial^2\log L}{\partial p^2}=-\frac{S}{p^2}-\frac{n-S}{(1-p)^2}<0$$

strictement négative sur $(0,1)$ : la log-vraisemblance est **strictement concave**, le maximum est donc **unique**.

**L'information de Fisher.** Pour une observation, $\ell(p)=X\log p+(1-X)\log(1-p)$, donc

$$\ell''(p)=-\frac{X}{p^2}-\frac{1-X}{(1-p)^2}, \qquad I(p)=-\mathbb E[\ell''(p)]=\frac{p}{p^2}+\frac{1-p}{(1-p)^2}=\frac1p+\frac1{1-p}=\frac{1}{p(1-p)}$$

**La conclusion asymptotique.**

$$\sqrt n\big(\hat p_n-p\big)\ \xrightarrow{(d)}\ N\big(0,\ p(1-p)\big)$$

— qu'on aurait aussi obtenue par le théorème central limite direct, puisque $\mathrm{var}(X_i)=p(1-p)$. Les deux méthodes concordent.

</details>

**Niveau 2** — Pourquoi ne peut-on pas estimer la distance en variation totale, alors qu'on peut estimer la divergence KL ?

<details><summary>Correction</summary>

**Le problème de la variation totale.**

$$TV(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\frac12\int_E\big\lvert f_{\theta^\ast}(x)-f_\theta(x)\big\rvert\,dx$$

On ne dispose que d'un échantillon tiré selon $f_{\theta^\ast}$. Or la loi des grands nombres ne permet d'estimer que des quantités de la forme

$$\mathbb E_{\theta^\ast}[h(X)]=\int f_{\theta^\ast}(x)h(x)\,dx\ \approx\ \frac1n\sum_ih(X_i)$$

c'est-à-dire des intégrales où $f_{\theta^\ast}$ apparaît **en facteur**. La **valeur absolue** $\lvert f_{\theta^\ast}-f_\theta\rvert$ empêche de mettre $f_{\theta^\ast}$ en facteur : on ne peut pas écrire $TV$ sous la forme $\mathbb E_{\theta^\ast}[h(X)]$.

**Pourquoi la KL passe.** Le logarithme transforme le quotient en différence, et $f_{\theta^\ast}$ se factorise :

$$KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\int f_{\theta^\ast}(x)\log\left(\frac{f_{\theta^\ast}(x)}{f_\theta(x)}\right)dx=\mathbb E_{\theta^\ast}\left[\log\frac{f_{\theta^\ast}(X)}{f_\theta(X)}\right]$$

**C'est bien une espérance sous la vraie loi**, donc estimable par moyenne empirique.

**Et l'asymétrie est ce qui rend ce choix possible.** Il fallait que $\theta^\ast$ soit en **premier** argument pour que la pondération soit $f_{\theta^\ast}$. Une divergence symétrique n'aurait pas offert ce choix — c'est le sens de la phrase du cours : *l'asymétrie est la clé de notre capacité à l'estimer.*

**Le prix payé.** On perd la symétrie et l'inégalité triangulaire : KL n'est **pas une distance**, seulement une **divergence**. On conserve l'essentiel — positivité et caractère défini — donc le minimum en $\theta$ est bien atteint en $\theta^\ast$, ce qui suffit pour estimer.

</details>

**Niveau 3** — Interprétez l'information de Fisher sous ses deux formes.

<details><summary>Correction</summary>

**Les deux expressions**, pour $\Theta\subset\mathbb R$ :

$$I(\theta)=\mathrm{var}\big[\ell'(\theta)\big]=-\mathbb E\big[\ell''(\theta)\big]$$

**Première lecture — une variance.** $\ell'(\theta)$ est le **score** : la pente de la log-vraisemblance au point $\theta$. Sa variance mesure combien cette pente **change d'un échantillon à l'autre**. Une grande variance signifie que chaque observation « pousse » fortement l'estimation dans une direction ou l'autre : les données sont **informatives** sur $\theta$.

**Deuxième lecture — une courbure.** $-\mathbb E[\ell''(\theta)]$ mesure à quel point la log-vraisemblance est **pointue** au maximum. Un pic étroit ⟹ un petit déplacement de $\theta$ fait chuter la vraisemblance ⟹ le maximum est **bien localisé** ⟹ estimation précise. Un pic plat ⟹ beaucoup de valeurs de $\theta$ sont presque aussi vraisemblables ⟹ estimation imprécise.

**La conséquence quantitative.**

$$\mathrm{Var}\big(\hat\theta_n\big)\approx\frac{I(\theta^\ast)^{-1}}{n}$$

**Plus d'information, moins de variance** — la relation est exactement inverse. Et par la borne de Cramér-Rao, c'est la **plus petite variance atteignable** par un estimateur régulier : l'EMV est **asymptotiquement efficace**.

**Un exemple qui parle.** Pour Bernoulli, $I(p)=\frac{1}{p(1-p)}$. Cette information est **minimale** en $p=1/2$ ($I=4$) et **explose** quand $p\to0$ ou $1$. Autrement dit : une pièce presque truquée est facile à identifier comme telle — une seule face rare observée est très informative —, alors qu'une pièce proche de l'équilibre demande beaucoup de lancers.

⚠️ **Que les deux expressions coïncident est un théorème**, l'**identité de l'information**, et il exige les conditions de régularité — en particulier que le **support ne dépende pas de $\theta$**. Sur le modèle $U[0,\theta]$, l'identité tombe, et avec elle tout le théorème asymptotique.

</details>

**Niveau 4 — type examen** — Dérivez le principe du maximum de vraisemblance à partir de la divergence KL, et énoncez le théorème asymptotique avec ses hypothèses.

<details><summary>Correction</summary>

**Le point de départ.** Le but est de trouver $\hat\theta$ tel que $\mathbb P_{\hat\theta}$ soit proche de $\mathbb P_{\theta^\ast}$. Il faut une notion de proximité **estimable**.

**Pourquoi pas la variation totale.** $TV(\mathbb P_\theta,\mathbb P_{\theta'})=\frac12\int\lvert f_\theta-f_{\theta'}\rvert$ est une vraie distance — symétrique, définie, triangulaire — mais la **valeur absolue** interdit de l'écrire comme une espérance sous $\mathbb P_{\theta^\ast}$, donc de l'estimer par moyenne empirique. *On ne voit pas comment construire $\widehat{TV}$.*

**Le remplacement.** La divergence KL

$$KL(\mathbb P_\theta,\mathbb P_{\theta'})=\int f_\theta(x)\log\frac{f_\theta(x)}{f_{\theta'}(x)}dx$$

n'est **pas** une distance — ni symétrique, ni triangulaire — mais elle est **positive** et **définie**, ce qui suffit. Et *l'asymétrie est la clé de notre capacité à l'estimer*.

**La dérivation, en quatre étapes.**

*Étape 1.* En plaçant $\theta^\ast$ en premier argument :

$$KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\mathbb E_{\theta^\ast}\left[\log\frac{p_{\theta^\ast}(X)}{p_\theta(X)}\right]=\underbrace{\mathbb E_{\theta^\ast}[\log p_{\theta^\ast}(X)]}_{\text{« constante »}}-\mathbb E_{\theta^\ast}[\log p_\theta(X)]$$

*Étape 2.* La constante ne dépend pas de $\theta$ : elle est inconnue mais **sans effet** sur l'argmin.

*Étape 3.* Par la loi des grands nombres, $\mathbb E_{\theta^\ast}[h(X)]\approx\frac1n\sum_ih(X_i)$, donc

$$\widehat{KL}(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\text{« constante »}-\frac1n\sum_{i=1}^n\log p_\theta(X_i)$$

*Étape 4 — la chaîne.*

$$\min_\theta\widehat{KL}\iff\max_\theta\frac1n\sum_i\log p_\theta(X_i)\iff\max_\theta\sum_i\log p_\theta(X_i)\iff\max_\theta\prod_{i=1}^np_\theta(X_i)$$

**C'est le principe du maximum de vraisemblance** : maximiser la probabilité d'observer ce qu'on a effectivement observé.

**Le théorème asymptotique.** Sous les hypothèses :

1. le modèle est **identifié** ;
2. le **support de $\mathbb P_\theta$ ne dépend pas de $\theta$** ;
3. $\theta^\ast$ n'est **pas sur la frontière** de $\Theta$ ;
4. $I(\theta)$ est **inversible** au voisinage de $\theta^\ast$ ;
5. quelques conditions techniques ;

on a

$$\hat\theta_n^{MLE}\xrightarrow{\mathbb P}\theta^\ast \qquad\text{et}\qquad \sqrt n\big(\hat\theta_n^{MLE}-\theta^\ast\big)\xrightarrow{(d)}N\big(0,I(\theta^\ast)^{-1}\big)$$

où $I(\theta)=-\mathbb E[\nabla^2\ell(\theta)]$ est l'**information de Fisher**.

**Ce qu'il faut savoir commenter.**

**1. La méthode n'est pas heuristique, elle est dérivée.** Le maximum de vraisemblance **est** la minimisation empirique de la KL à la vraie loi. C'est ce qui justifie son omniprésence.

**2. Le théorème donne tout d'un coup** : consistance, vitesse $1/\sqrt n$, loi limite, et donc intervalles de confiance et tests. Et par Cramér-Rao, la variance $I(\theta^\ast)^{-1}$ est **optimale** : l'EMV est asymptotiquement efficace.

**3. L'hypothèse 2 est celle qui tombe le plus souvent.** Sur $U[0,\theta]$, l'EMV est $\max_iX_i$ ; il converge à la vitesse $1/n$ — bien **plus vite** que $1/\sqrt n$ — et sa loi limite est **exponentielle**, pas gaussienne. Tout le théorème s'effondre, y compris l'identité $\mathrm{var}[\ell']=-\mathbb E[\ell'']$.

**4. Le lien avec les fiches précédentes.** La fiche 50 avait établi $\hat\beta\sim N_p(\beta,\sigma^2(X^TX)^{-1})$ pour la régression normale : c'est un cas particulier **exact** de ce théorème, où $\sigma^2(X^TX)^{-1}$ est l'inverse de l'information de Fisher. Et la fiche 60 utilisait déjà $\mathcal I_T^{-1}$ comme variance asymptotique de l'EMV en espace-état. Le même objet, partout.

</details>

## 🔴 Common mistakes

1. **Croire que la KL est une distance** — elle n'est **ni symétrique ni triangulaire** : c'est une **divergence**.
2. **Inverser les arguments de la KL** — il faut $KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)$, avec le **vrai** paramètre en premier, sinon l'espérance n'est pas estimable.
3. **Oublier que la constante ne dépend pas de $\theta$** — c'est ce qui permet de l'ignorer dans la minimisation.
4. **Maximiser $L$ au lieu de $\log L$** — mathématiquement équivalent, numériquement désastreux (sous-dépassement).
5. **Oublier de vérifier la concavité** — sans stricte concavité, $\nabla\ell=0$ ne garantit pas un maximum, ni son unicité.
6. **Confondre $I(\theta)$ pour une observation et pour l'échantillon** — l'information de l'échantillon vaut $nI(\theta)$, d'où le $1/n$ dans la variance.
7. **Appliquer le théorème quand le support dépend de $\theta$** — contre-exemple : $U[0,\theta]$, vitesse $1/n$ et loi exponentielle.
8. **Oublier le biais de l'EMV de la variance gaussienne** — diviseur $n$, pas $n-1$.
9. **Croire que $\hat\theta$ est gaussien à distance finie** — la normalité est **asymptotique**, sauf cas particuliers comme le modèle linéaire normal.

## 📌 Ultimate Review

1. **Cadre** : modèle $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$, échantillon i.i.d., **vrai paramètre** $\theta^\ast$ ; but : $\mathbb P_{\hat\theta}$ proche de $\mathbb P_{\theta^\ast}$.
2. **Variation totale** : $TV=\max_A\lvert\mathbb P_\theta(A)-\mathbb P_{\theta'}(A)\rvert=\frac12\sum\lvert p_\theta-p_{\theta'}\rvert$ (discret) $=\frac12\int\lvert f_\theta-f_{\theta'}\rvert$ (continu).
3. **C'est une distance** : symétrique, positive, définie, triangulaire. **Mais inestimable** — la valeur absolue empêche l'écriture comme espérance.
4. **Divergence KL** : $\sum p_\theta\log(p_\theta/p_{\theta'})$ ou $\int f_\theta\log(f_\theta/f_{\theta'})$.
5. **Ses propriétés** : **non symétrique**, positive, définie, **pas d'inégalité triangulaire**. *L'asymétrie est la clé de notre capacité à l'estimer.*
6. **La décomposition** : $KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\text{constante}-\mathbb E_{\theta^\ast}[\log p_\theta(X)]$.
7. **L'estimation** : $\widehat{KL}=\text{constante}-\frac1n\sum_i\log p_\theta(X_i)$ par la LGN.
8. **La chaîne** : $\min\widehat{KL}\iff\max\frac1n\sum\log p_\theta(X_i)\iff\max\sum\log p_\theta(X_i)\iff\max\prod p_\theta(X_i)$.
9. **Concavité** : $h''\leq0$ ; strictement si $<0$ ; multivarié : $x^\top\nabla^2h(\theta)x\leq0\ \forall x$.
10. **Pourquoi elle importe** : une fonction strictement concave a **au plus un** maximum, solution unique de $\nabla h(\theta)=0$.
11. **Vraisemblance discrète** : $L_n=\mathbb P_\theta[X_1=x_1,\dots,X_n=x_n]$ ; **Bernoulli** $p^{\sum x_i}(1-p)^{n-\sum x_i}$ ; **Poisson** $e^{-n\lambda}\lambda^{\sum x_i}/\prod x_i!$.
12. **Vraisemblance continue** : $L=\prod_if_\theta(x_i)$ ; **gaussienne** $\frac{1}{(\sigma\sqrt{2\pi})^n}\exp\big(-\frac{1}{2\sigma^2}\sum(x_i-\mu)^2\big)$.
13. **EMV** : $\hat\theta_n^{MLE}=\mathrm{argmax}_\theta L=\mathrm{argmax}_\theta\log L$.
14. **Exemples** : Bernoulli $\hat p=\bar X_n$ · Poisson $\hat\lambda=\bar X_n$ · gaussien $(\bar X_n,\hat S_n)$, la variance étant **biaisée**.
15. **Information de Fisher** : $\ell(\theta)=\log L_1(X,\theta)$ ; $$I(\theta)=\mathbb E[\nabla\ell\nabla\ell^\top]-\mathbb E[\nabla\ell]\mathbb E[\nabla\ell]^\top=-\mathbb E[\nabla^2\ell(\theta)]$$ en dimension $1$ : $I(\theta)=\mathrm{var}[\ell'(\theta)]=-\mathbb E[\ell''(\theta)]$.
16. **Ses deux lectures** : **variance du score** (les données discriminent-elles ?) et **courbure** de la log-vraisemblance (le maximum est-il pointu ?).
17. **Théorème** — hypothèses : modèle **identifié** · **support indépendant de $\theta$** · $\theta^\ast$ à l'intérieur · $I(\theta)$ **inversible** · conditions techniques.
18. **Conclusions** : $\hat\theta_n\xrightarrow{\mathbb P}\theta^\ast$ et $\sqrt n(\hat\theta_n-\theta^\ast)\xrightarrow{(d)}N\big(0,I(\theta^\ast)^{-1}\big)$ ; l'EMV est **asymptotiquement efficace**.

**Formulas to know**

$$TV=\frac12\int\lvert f_\theta-f_{\theta'}\rvert \qquad KL(\mathbb P_\theta,\mathbb P_{\theta'})=\int f_\theta\log\frac{f_\theta}{f_{\theta'}}$$

$$KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\text{cste}-\mathbb E_{\theta^\ast}[\log p_\theta(X)] \qquad \hat\theta_n^{MLE}=\underset{\theta}{\mathrm{argmax}}\prod_{i=1}^np_\theta(X_i)$$

$$I(\theta)=-\mathbb E[\nabla^2\ell(\theta)] \qquad \sqrt n\big(\hat\theta_n-\theta^\ast\big)\xrightarrow{(d)}N\big(0,I(\theta^\ast)^{-1}\big)$$

**Methods to know** : la dérivation KL ⟹ maximum de vraisemblance en quatre étapes ; le protocole de calcul d'un EMV ; le calcul de $I(\theta)$ ; la vérification des hypothèses du théorème.

## 🧠 Active Recall

**Basic** — Définissez la divergence de Kullback-Leibler et donnez ses propriétés.

<details><summary>Réponse</summary>

$$KL(\mathbb P_\theta,\mathbb P_{\theta'})=\sum_{x\in E}p_\theta(x)\log\frac{p_\theta(x)}{p_{\theta'}(x)} \quad\text{(discret)}, \qquad \int_Ef_\theta(x)\log\frac{f_\theta(x)}{f_{\theta'}(x)}dx \quad\text{(continu)}$$

**Propriétés** :

- **non symétrique** en général ;
- $KL\geq0$ ;
- **définie** : $KL=0\Rightarrow\mathbb P_\theta=\mathbb P_{\theta'}$ ;
- **pas d'inégalité triangulaire** en général.

Ce n'est donc **pas une distance** mais une **divergence**. Et *l'asymétrie est la clé de notre capacité à l'estimer* : en plaçant $\theta^\ast$ en premier argument, la KL devient une espérance sous la vraie loi.

</details>

**Understanding** — Pourquoi maximise-t-on la vraisemblance ?

<details><summary>Réponse</summary>

Parce que **c'est exactement minimiser la divergence KL empirique** à la vraie loi.

**La chaîne complète :**

$$KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\underbrace{\mathbb E_{\theta^\ast}[\log p_{\theta^\ast}(X)]}_{\text{indépendant de }\theta}-\mathbb E_{\theta^\ast}[\log p_\theta(X)]$$

Par la loi des grands nombres, le second terme s'estime par $\frac1n\sum_i\log p_\theta(X_i)$, d'où

$$\min_\theta\widehat{KL}\iff\max_\theta\sum_{i=1}^n\log p_\theta(X_i)\iff\max_\theta\prod_{i=1}^np_\theta(X_i)$$

**Le maximum de vraisemblance n'est donc pas un principe posé a priori** — c'est une **conséquence** du choix d'une divergence estimable. Et le choix de la KL plutôt que de la variation totale est dicté par le seul critère d'estimabilité.

</details>

**Application** — Calculez l'information de Fisher du modèle de Poisson.

<details><summary>Réponse</summary>

**La log-vraisemblance pour une observation.** $X\sim\mathrm{Poiss}(\lambda)$ a pour masse $e^{-\lambda}\lambda^X/X!$, donc

$$\ell(\lambda)=-\lambda+X\log\lambda-\log(X!)$$

**Les dérivées.**

$$\ell'(\lambda)=-1+\frac X\lambda, \qquad \ell''(\lambda)=-\frac{X}{\lambda^2}$$

**L'information de Fisher.** Comme $\mathbb E[X]=\lambda$ :

$$I(\lambda)=-\mathbb E[\ell''(\lambda)]=\frac{\mathbb E[X]}{\lambda^2}=\frac{\lambda}{\lambda^2}=\frac1\lambda$$

**Vérification par l'autre formule.** $\mathrm{var}[\ell'(\lambda)]=\mathrm{var}\big[\frac X\lambda\big]=\frac{\mathrm{var}(X)}{\lambda^2}=\frac{\lambda}{\lambda^2}=\frac1\lambda$ — les deux expressions coïncident, comme le prédit l'identité de l'information.

**La conclusion asymptotique.** Avec $\hat\lambda_n=\bar X_n$ :

$$\sqrt n\big(\hat\lambda_n-\lambda\big)\ \xrightarrow{(d)}\ N\big(0,\ I(\lambda)^{-1}\big)=N(0,\lambda)$$

ce qui est cohérent avec le TCL direct, puisque $\mathrm{var}(X_i)=\lambda$.

**La lecture.** $I(\lambda)=1/\lambda$ **décroît** avec $\lambda$ : plus l'intensité est grande, moins chaque observation est informative **relativement**. La variance de l'estimateur, $\lambda/n$, croît donc avec $\lambda$ — mais l'erreur **relative** $\sqrt{\lambda/n}/\lambda=1/\sqrt{n\lambda}$ diminue.

</details>

**Comparison** — Variation totale et divergence KL : que gagne-t-on, que perd-on ?

<details><summary>Réponse</summary>

|  | **Variation totale** | **Divergence KL** |
|---|---|---|
| Symétrique | **oui** | **non** |
| Positive | oui | oui |
| Définie | oui | oui |
| Inégalité triangulaire | **oui** | **non** |
| Est-ce une distance ? | **oui** | non — une **divergence** |
| **Estimable ?** | **non** | **oui** |

**Ce qu'on perd** : la symétrie et l'inégalité triangulaire — donc le statut de distance.

**Ce qu'on gagne** : l'**estimabilité**, et c'est tout ce qui compte. La KL s'écrit comme une **espérance sous la vraie loi** :

$$KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)=\mathbb E_{\theta^\ast}\Big[\log\frac{p_{\theta^\ast}(X)}{p_\theta(X)}\Big]$$

donc la loi des grands nombres s'applique. La valeur absolue de $TV$ interdit cette écriture.

**Ce qui suffit pour estimer** : la positivité et le caractère défini. Ces deux propriétés garantissent que $\theta\mapsto KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)$ atteint son minimum — nul — **exactement en $\theta^\ast$**. Ni la symétrie ni la triangulaire ne servent à cela.

**La leçon de méthode** : on choisit ses outils en fonction de ce qu'on peut **calculer**, pas de leur élégance formelle.

</details>

**Exam-style** — Énoncez le théorème asymptotique de l'EMV et expliquez le rôle de chaque hypothèse.

<details><summary>Réponse</summary>

**Énoncé.** Sous les cinq hypothèses, l'EMV vérifie

$$\hat\theta_n^{MLE}\xrightarrow[n\to\infty]{\mathbb P}\theta^\ast \qquad\text{et}\qquad \sqrt n\big(\hat\theta_n^{MLE}-\theta^\ast\big)\xrightarrow[n\to\infty]{(d)}N\big(0,I(\theta^\ast)^{-1}\big)$$

où $I(\theta)=-\mathbb E[\nabla^2\ell(\theta)]$ est l'information de Fisher pour **une** observation.

**Les hypothèses et leur rôle.**

**1. Le modèle est identifié.** Sinon, deux valeurs distinctes de $\theta$ engendrent la même loi : aucune quantité de données ne permettra de les distinguer, et $\hat\theta$ ne peut converger vers un point unique.

**2. Le support de $\mathbb P_\theta$ ne dépend pas de $\theta$.** C'est **l'hypothèse la plus souvent violée**, et la plus destructrice. Elle est nécessaire pour dériver sous l'intégrale — donc pour l'**identité de l'information** $\mathrm{var}[\ell']=-\mathbb E[\ell'']$, sur laquelle tout repose. *Contre-exemple* : $X_i\sim U[0,\theta]$. L'EMV est $\hat\theta_n=\max_iX_i$. Il converge à la vitesse $1/n$, **plus vite** que $1/\sqrt n$, et $n(\theta-\hat\theta_n)$ tend vers une loi **exponentielle**, pas gaussienne. Le théorème est entièrement faux.

**3. $\theta^\ast$ n'est pas sur la frontière de $\Theta$.** Le raisonnement repose sur $\nabla\ell(\hat\theta)=0$ — la condition du premier ordre d'un maximum **intérieur**. Sur une frontière, le maximum peut être atteint sans annulation du gradient, et la loi limite devient une gaussienne **tronquée**.

**4. $I(\theta)$ est inversible au voisinage de $\theta^\ast$.** Sinon $I(\theta^\ast)^{-1}$ n'existe pas : certaines directions du paramètre ne sont **pas informées** par les données, et la variance asymptotique diverge dans ces directions.

**5. Conditions techniques.** Régularité suffisante pour justifier les développements de Taylor et les interversions limite-intégrale.

**Ce qu'il faut savoir ajouter.**

**La portée du théorème.** Il donne d'un coup la consistance, la vitesse $1/\sqrt n$, la loi limite complète — donc les intervalles de confiance $\hat\theta_n\pm q_{\alpha/2}\sqrt{I(\hat\theta_n)^{-1}/n}$ et les tests. Et par la borne de **Cramér-Rao**, $I(\theta^\ast)^{-1}$ est la **plus petite variance asymptotique** possible : l'EMV est **asymptotiquement efficace**. C'est pourquoi il est la méthode par défaut de toute la statistique paramétrique.

**Sa limite essentielle.** Tout est **asymptotique**. À $n$ fini, l'EMV peut être biaisé — la variance gaussienne en est l'exemple canonique, avec son diviseur $n$ au lieu de $n-1$ — et sa loi peut être très éloignée d'une gaussienne. Le modèle linéaire normal de la fiche 50 est l'heureuse exception où la normalité est **exacte** à distance finie.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| But du statisticien ? | Trouver $\hat\theta$ tel que $\mathbb P_{\hat\theta}$ soit proche de $\mathbb P_{\theta^\ast}$ |
| Définition de la variation totale ? | $\max_{A\subset E}\lvert\mathbb P_\theta(A)-\mathbb P_{\theta'}(A)\rvert$ |
| Sa forme discrète ? | $\frac12\sum_x\lvert p_\theta(x)-p_{\theta'}(x)\rvert$ |
| Sa forme continue ? | $\frac12\int_E\lvert f_\theta-f_{\theta'}\rvert dx$ |
| Est-ce une distance ? | **Oui** — mais elle n'est pas estimable |
| Pourquoi n'est-elle pas estimable ? | La **valeur absolue** empêche de l'écrire comme une espérance |
| Définition de la KL ? | $\int f_\theta\log(f_\theta/f_{\theta'})$ |
| Est-ce une distance ? | **Non** — ni symétrique, ni triangulaire : une **divergence** |
| Quelle propriété la sauve ? | L'**asymétrie**, qui la rend estimable |
| Décomposition de $KL(\mathbb P_{\theta^\ast},\mathbb P_\theta)$ ? | « constante » $-\ \mathbb E_{\theta^\ast}[\log p_\theta(X)]$ |
| Comment l'estime-t-on ? | Par la **loi des grands nombres** |
| La chaîne d'équivalences ? | $\min\widehat{KL}\iff\max\sum\log p_\theta(X_i)\iff\max\prod p_\theta(X_i)$ |
| Définition de la concavité ? | $h''(\theta)\leq0$ pour tout $\theta$ |
| Cas multivarié ? | $x^\top\nabla^2h(\theta)x\leq0$ pour tout $x$ |
| Pourquoi la stricte concavité ? | Le maximum, s'il existe, est **unique** |
| Vraisemblance discrète ? | $\mathbb P_\theta[X_1=x_1,\dots,X_n=x_n]$ |
| Vraisemblance de Bernoulli ? | $p^{\sum x_i}(1-p)^{n-\sum x_i}$ |
| Vraisemblance de Poisson ? | $e^{-n\lambda}\lambda^{\sum x_i}/(x_1!\cdots x_n!)$ |
| Vraisemblance continue ? | $\prod_{i=1}^nf_\theta(x_i)$ |
| Vraisemblance gaussienne ? | $\frac{1}{(\sigma\sqrt{2\pi})^n}\exp\big(-\frac{1}{2\sigma^2}\sum(x_i-\mu)^2\big)$ |
| Définition de l'EMV ? | $\mathrm{argmax}_\theta L(X_1,\dots,X_n,\theta)$ |
| Pourquoi passer au log ? | $\log$ croissante ⟹ même argmax ; produit ⟶ somme |
| EMV de Bernoulli et Poisson ? | $\bar X_n$ dans les deux cas |
| EMV du modèle gaussien ? | $(\bar X_n,\hat S_n)$ — la variance est **biaisée** |
| Log-vraisemblance pour une observation ? | $\ell(\theta)=\log L_1(X,\theta)$ |
| Information de Fisher ? | $-\mathbb E[\nabla^2\ell(\theta)]$ |
| Sa forme unidimensionnelle ? | $\mathrm{var}[\ell'(\theta)]=-\mathbb E[\ell''(\theta)]$ |
| Ses deux interprétations ? | **Variance du score** · **courbure** de la log-vraisemblance |
| Les cinq hypothèses du théorème ? | Identifié · support fixe · intérieur · $I$ inversible · technique |
| Les deux conclusions ? | Consistance et $\sqrt n(\hat\theta_n-\theta^\ast)\to N(0,I(\theta^\ast)^{-1})$ |
| Quelle hypothèse tombe pour $U[0,\theta]$ ? | Le **support dépend de $\theta$** |
| Que devient la vitesse dans ce cas ? | $1/n$, et la loi limite est **exponentielle** |
| Que dit Cramér-Rao ? | $I(\theta^\ast)^{-1}$ est la **variance minimale** — EMV efficace |
