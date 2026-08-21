# Fiche 66 — Modèles linéaires généralisés : famille exponentielle, lien canonique et IRLS

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Rigollet, *18.650 Statistics for Applications*, MIT OpenCourseWare, automne 2016 — chapitre 10 « Generalized Linear Models » |
| **Difficulté** | Must know — régression logistique, Poisson et tout le reste en une seule théorie |
| **Temps d'étude estimé** | 2 h 45 |
| **Prérequis** | Fiche 50 (modèle linéaire, MCG), fiche 64 (vraisemblance, information de Fisher), fiche 39 (Newton) |
| **Concepts clés** | Composante aléatoire et fonction de lien, famille exponentielle, forme canonique, paramètre de dispersion, $\mu=b'(\theta)$ et $\mathrm{var}=b''(\theta)\phi$, logit, probit, lien canonique, stricte concavité, Newton-Raphson, scores de Fisher, moindres carrés repondérés itérativement |
| **Poids à l'examen** | Trois choses : les **deux identités** donnant $\mu=b'(\theta)$ et $\mathrm{var}(Y)=b''(\theta)\phi$ ; le fait que le **lien canonique de Bernoulli soit le logit** ; et l'algorithme **IRLS** en quatre étapes. |

## 🎯 Vue d'ensemble

**Le modèle linéaire** suppose

$$Y\mid X\sim N\big(\mu(X),\sigma^2I\big) \qquad\text{et}\qquad \mathbb E(Y\mid X)=\mu(X)=X^\top\beta$$

> **Ses deux composantes — celles qu'on va relâcher.**
>
> 1. **Composante aléatoire** : la réponse $Y\mid X$ est **continue** et de loi **normale**, de moyenne $\mu=\mu(X)=\mathbb E(Y\mid X)$.
> 2. **Lien** entre l'aléatoire et les covariables $X=(X^{(1)},\dots,X^{(p)})^\top$ : $\mu(X)=X^\top\beta$.

> **La généralisation.** Un **modèle linéaire généralisé (GLM)** généralise dans deux directions :
>
> 1. **Composante aléatoire** : $Y\sim$ une loi de **famille exponentielle** ;
> 2. **Lien** : $$g\big(\mu(X)\big)=X^\top\beta$$ où $g$ est la **fonction de lien** et $\mu=\mathbb E(Y\mid X)$.

```
MODÈLE LINÉAIRE     Y | X gaussienne      et    μ = Xᵀβ
GLM                 Y | X exponentielle   et    g(μ) = Xᵀβ
     ↓                                              ↓
 Poisson, Bernoulli, Gamma…              log, logit, probit…
CLÉ    forme canonique  f_θ(y) = exp[(yθ − b(θ))/φ + c(y,φ)]
       ⟹ μ = b'(θ)   et   var(Y) = b''(θ)φ
CALCUL Newton-Raphson → scores de Fisher → IRLS
```

## 🟡 Concept 1 — Trois situations que le modèle linéaire ne sait pas traiter

**Exemple 1 — taux d'occurrence d'une maladie.** *Au début d'une épidémie, le rythme d'apparition de nouveaux cas croît souvent exponentiellement. Si $\mu_i$ est le nombre espéré de nouveaux cas au jour $t_i$, un modèle de la forme*

$$\mu_i=\gamma\exp(\delta t_i)$$

*semble approprié.* On le met sous forme GLM par un **lien logarithmique** :

$$\log(\mu_i)=\log(\gamma)+\delta t_i=\beta_0+\beta_1t_i$$

*Comme il s'agit d'un **comptage**, la loi de **Poisson** (d'espérance $\mu_i$) est sans doute raisonnable.*

**Exemple 2 — taux de capture de proies.** *Le taux de capture $y_i$ par un prédateur croît avec la densité de proies $x_i$, mais **plafonne** quand le prédateur attrape autant qu'il peut en traiter.* Un modèle adapté serait

$$\mu_i=\frac{\alpha x_i}{h+x_i}$$

*où $\alpha$ est le taux de capture maximal et $h$ la densité à laquelle le taux vaut la moitié du maximum.* *Ce modèle est manifestement **non linéaire en ses paramètres**, mais un **lien réciproque** rend le membre de droite linéaire :*

$$g(\mu_i)=\frac{1}{\mu_i}=\frac1\alpha+\frac h\alpha\cdot\frac1{x_i}=\beta_0+\beta_1\frac1{x_i}$$

*L'écart-type du taux de capture étant à peu près proportionnel au taux moyen, cela suggère une loi **Gamma** pour la réponse.*

**Exemple 3 — les données Kyphosis.** *Mesures sur $81$ enfants après chirurgie corrective du rachis. La réponse **binaire** indique la présence ou l'absence d'une déformation post-opératoire. Les trois covariables sont l'âge en mois, le nombre de vertèbres concernées et le début de la plage vertébrale.*

- *La réponse est **binaire** : pas le choix, $Y\mid X$ est de Bernoulli, d'espérance $\mu(X)\in(0,1)$.*
- *On ne peut **pas** écrire $\mu(X)=X^\top\beta$, parce que le membre de droite parcourt tout $\mathbb R$.*
- *Il faut une fonction **inversible** $f$ telle que $f(X^\top\beta)\in(0,1)$.*

> **Ces trois exemples couvrent les trois obstacles.** Un **domaine borné** ($\mu>0$ pour Poisson, $\mu\in(0,1)$ pour Bernoulli), une **non-linéarité** en les paramètres, et une **variance non constante** — dans l'exemple 2, l'écart-type croît avec la moyenne. Le modèle linéaire échoue sur les trois.
>
> **La motivation du cours :** *il faut un cadre de régression plus général pour tenir compte de divers types de données de réponse — les lois de la **famille exponentielle** — et développer des méthodes d'ajustement et d'inférence dans ce cadre : l'**estimation par maximum de vraisemblance**.*

## 🔴 Concept 2 — La famille exponentielle

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Une famille de lois $\{P_\theta:\theta\in\Theta\}$, $\Theta\subset\mathbb R^k$, est une **famille exponentielle à $k$ paramètres** sur $\mathbb R^q$ s'il existe des fonctions réelles $\eta_1,\dots,\eta_k$ et $B$ de $\theta$, et $T_1,\dots,T_k$ et $h$ de $x\in\mathbb R^q$, telles que la densité (ou la fonction de masse) de $P_\theta$ s'écrive

$$p_\theta(x)=\exp\left[\sum_{i=1}^k\eta_i(\theta)T_i(x)-B(\theta)\right]h(x)$$

</div>

**Exemple gaussien.** Pour $X\sim N(\mu,\sigma^2)$ avec $\theta=(\mu,\sigma^2)$ :

$$p_\theta(x)=\exp\left(\frac{\mu}{\sigma^2}x-\frac{1}{2\sigma^2}x^2-\frac{\mu^2}{2\sigma^2}\right)\frac{1}{\sigma\sqrt{2\pi}}$$

ce qui forme une famille exponentielle **à deux paramètres**, avec

$$\eta_1=\frac{\mu}{\sigma^2},\quad \eta_2=-\frac{1}{2\sigma^2},\quad T_1(x)=x,\quad T_2(x)=x^2,\quad B(\theta)=\frac{\mu^2}{2\sigma^2}+\log(\sigma\sqrt{2\pi}),\quad h(x)=1$$

*Quand $\sigma^2$ est **connue**, cela devient une famille exponentielle **à un paramètre** sur $\mathbb R$ :*

$$\eta=\frac{\mu}{\sigma^2},\quad T(x)=x,\quad B(\theta)=\frac{\mu^2}{2\sigma^2},\quad h(x)=\frac{e^{-x^2/2\sigma^2}}{\sigma\sqrt{2\pi}}$$

**Les lois discrètes** qui forment des familles exponentielles : **Bernoulli$(p)$** $p^x(1-p)^{1-x}$, $x\in\{0,1\}$ · **Poisson$(\lambda)$** $e^{-\lambda}\lambda^x/x!$.

**Les lois continues** : **Gamma$(a,b)$** $\frac{1}{\Gamma(a)b^a}x^{a-1}e^{-x/b}$, avec $a$ paramètre de forme et $b$ d'échelle, reparamétrable en $\mu=ab$ (paramètre de moyenne) ; **Gamma inverse$(\alpha,\beta)$** ; **gaussienne inverse$(\mu,\sigma^2)$**. *Autres : khi-deux, bêta, binomiale, binomiale négative.*

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que la définition capture.</span>

Le paramètre $\theta$ et l'observation $x$ n'interagissent que par le **produit $\eta_i(\theta)T_i(x)$** — jamais de façon plus enchevêtrée. C'est cette séparation qui donne les statistiques exhaustives $T_i$, la concavité de la log-vraisemblance, et les identités du concept suivant. Presque toutes les lois usuelles rentrent dans ce moule.

</div>

## 🔴 Concept 3 — La forme canonique à un paramètre

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

La **famille exponentielle canonique** pour $k=1$, $y\in\mathbb R$ :

$$\boxed{\ f_\theta(y)=\exp\left(\frac{y\theta-b(\theta)}{\phi}+c(y,\phi)\right)\ }$$

pour des fonctions connues $b(\cdot)$ et $c(\cdot,\cdot)$.

</div>

- Si $\phi$ est **connu**, c'est une famille exponentielle à un paramètre, $\theta$ étant le **paramètre canonique**.
- Si $\phi$ est inconnu, cela peut ou non être une famille à deux paramètres ; $\phi$ s'appelle le **paramètre de dispersion**.
- *Dans ce cours, on suppose toujours $\phi$ **connu**.*

**Le cas gaussien à variance connue.**

$$f_\theta(y)=\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(y-\mu)^2}{2\sigma^2}}=\exp\left(\frac{y\mu-\frac12\mu^2}{\sigma^2}-\frac12\left(\frac{y^2}{\sigma^2}+\log(2\pi\sigma^2)\right)\right)$$

d'où

$$\theta=\mu, \qquad \phi=\sigma^2, \qquad b(\theta)=\frac{\theta^2}{2}, \qquad c(y,\phi)=-\frac12\left(\frac{y^2}{\phi}+\log(2\pi\phi)\right)$$

**Le tableau des trois lois principales.**

|  | **Normale** $N(\mu,\sigma^2)$ | **Poisson** $P(\mu)$ | **Bernoulli** $B(p)$ |
|---|---|---|---|
| Domaine de $y$ | $(-\infty,\infty)$ | $\{0,1,2,\dots\}$ | $\{0,1\}$ |
| $\phi$ | $\sigma^2$ | $1$ | $1$ |
| $b(\theta)$ | $\theta^2/2$ | $e^\theta$ | $\log(1+e^\theta)$ |
| $c(y,\phi)$ | $-\frac12\big(\frac{y^2}{\phi}+\log(2\pi\phi)\big)$ | $-\log y!$ | $0$ |

## 🔴 Concept 4 — Moyenne et variance par les deux identités

Soit $\ell(\theta)=\log f_\theta(Y)$ la log-vraisemblance. La moyenne et la variance se déduisent de **deux identités**, toutes deux obtenues à partir de $\int f_\theta(y)\,dy\equiv1$ :

> **Première identité** : $\displaystyle\mathbb E\left(\frac{\partial\ell}{\partial\theta}\right)=0$
>
> **Seconde identité** : $\displaystyle\mathbb E\left(\frac{\partial^2\ell}{\partial\theta^2}\right)+\mathbb E\left(\frac{\partial\ell}{\partial\theta}\right)^2=0$

**L'espérance.** De $\ell(\theta)=\frac{Y\theta-b(\theta)}{\phi}+c(Y;\phi)$ on tire

$$\frac{\partial\ell}{\partial\theta}=\frac{Y-b'(\theta)}{\phi}$$

et la première identité donne

$$0=\mathbb E\left(\frac{\partial\ell}{\partial\theta}\right)=\frac{\mathbb E(Y)-b'(\theta)}{\phi} \qquad\Longrightarrow\qquad \boxed{\ \mathbb E(Y)=\mu=b'(\theta)\ }$$

**La variance.** D'autre part,

$$\frac{\partial^2\ell}{\partial\theta^2}+\left(\frac{\partial\ell}{\partial\theta}\right)^2=-\frac{b''(\theta)}{\phi}+\left(\frac{Y-b'(\theta)}{\phi}\right)^2$$

et comme $\frac{Y-b'(\theta)}{\phi}=\frac{Y-\mathbb E(Y)}{\phi}$ d'après le résultat précédent, la seconde identité donne

$$0=-\frac{b''(\theta)}{\phi}+\frac{\mathrm{var}(Y)}{\phi^2} \qquad\Longrightarrow\qquad \boxed{\ \mathrm{var}(Y)=V(Y)=b''(\theta)\phi\ }$$

> **Ces deux formules sont le cœur opératoire du chapitre.** Toute la loi — moyenne **et** variance — est encodée dans **une seule fonction** $b$ et ses deux premières dérivées. Il suffit d'identifier $b$ pour tout connaître.
>
> **Et remarquez la conséquence majeure** : la variance $b''(\theta)\phi$ est une **fonction de la moyenne**, puisque $\mu=b'(\theta)$. Dans un GLM, on ne choisit **pas** la variance indépendamment de la moyenne — elle est déterminée par la famille. C'est exactement ce que l'exemple 2 demandait (écart-type proportionnel à la moyenne, obtenu par la loi Gamma).

**Exemple — la loi de Poisson.**

$$f(y)=\frac{\mu^ye^{-\mu}}{y!}=e^{y\log\mu-\mu-\log(y!)}$$

d'où

$$\theta=\log\mu, \quad b(\theta)=\mu=e^\theta, \quad c(y,\phi)=-\log(y!), \quad \phi=1$$

et donc $b'(\theta)=e^\theta=\mu$ (l'espérance) et $b''(\theta)=e^\theta=\mu$ (la variance vaut aussi $\mu$, propriété caractéristique de Poisson).

## 🔴 Concept 5 — La fonction de lien

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi il en faut une.</span>

*$\beta$ est le paramètre d'intérêt, et il doit apparaître d'une façon ou d'une autre dans la vraisemblance pour qu'on puisse utiliser le maximum de vraisemblance.*

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Une **fonction de lien** $g$ relie le prédicteur linéaire $X^\top\beta$ au paramètre de moyenne $\mu$ :

$$X^\top\beta=g(\mu), \qquad \text{donc}\qquad \mu=g^{-1}(X^\top\beta)$$

*$g$ doit être **monotone croissante** et **dérivable**.*

</div>

**Les exemples.**

| Type de réponse | Contrainte | Liens possibles |
|---|---|---|
| **Modèle linéaire** | aucune | $g=$ **identité** |
| **Poisson** ($Y\mid X\sim\mathrm{Poiss}(\mu(X))$) | $\mu(X)>0$ | $\log(\mu(X))=X^\top\beta$ |
| **Bernoulli / binomiale** | $0<\mu<1$ | **logit**, **probit**, log-log complémentaire |

*Pour des données de comptage, une fonction de lien doit envoyer $(0,+\infty)$ sur $\mathbb R$ : le **lien logarithmique** est le choix naturel.*

*Pour des données de Bernoulli, $g$ doit envoyer $(0,1)$ sur $\mathbb R$ — trois choix :*

$$\textbf{1. logit : } \log\left(\frac{\mu(X)}{1-\mu(X)}\right)=X^\top\beta$$

$$\textbf{2. probit : } \Phi^{-1}\big(\mu(X)\big)=X^\top\beta \quad\text{où } \Phi \text{ est la fonction de répartition normale}$$

$$\textbf{3. log-log complémentaire : } \log\big(-\log(1-\mu(X))\big)=X^\top\beta$$

*Le lien **logit** est le choix naturel.*

**Les fonctions inverses** correspondantes sont $f_1(x)=\dfrac{e^x}{1+e^x}$ (logistique) et $f_2(x)=\Phi(x)$ (répartition gaussienne) — deux courbes en S très proches l'une de l'autre.

### Le lien canonique

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*La fonction $g$ qui relie la moyenne $\mu$ au **paramètre canonique** $\theta$ s'appelle le **lien canonique** :*

$$g(\mu)=\theta$$

*Puisque $\mu=b'(\theta)$, le lien canonique est donné par*

$$\boxed{\ g(\mu)=(b')^{-1}(\mu)\ }$$

*Si $\phi>0$, la fonction de lien canonique est **strictement croissante**. Pourquoi ?*

</div>

⚠️ **La réponse à la question du cours** : $g=(b')^{-1}$ est croissante si et seulement si $b'$ l'est, c'est-à-dire si $b''>0$. Or $b''(\theta)\phi=\mathrm{var}(Y)>0$ et $\phi>0$, donc $b''>0$. **La croissance stricte du lien canonique est une conséquence de la positivité de la variance.**

**Exemple — la loi de Bernoulli.** On vérifie $b(\theta)=\log(1+e^\theta)$, donc

$$b'(\theta)=\frac{e^\theta}{1+e^\theta}=\mu \qquad\Longleftrightarrow\qquad \theta=\log\left(\frac{\mu}{1-\mu}\right)$$

> ***Le lien canonique de la loi de Bernoulli est le lien logit.***

**Le tableau des liens canoniques.**

| Loi | $b(\theta)$ | $g(\mu)$ |
|---|---|---|
| **Normale** | $\theta^2/2$ | $\mu$ (identité) |
| **Poisson** | $\exp(\theta)$ | $\log\mu$ |
| **Bernoulli** | $\log(1+e^\theta)$ | $\log\dfrac{\mu}{1-\mu}$ (**logit**) |
| **Gamma** | $-\log(-\theta)$ | $-\dfrac1\mu$ |

> **Voilà la réponse à « pourquoi le logit plutôt que le probit ? ».** Ce n'est pas une commodité de calcul ni une tradition : le logit **est** le lien canonique de la loi de Bernoulli, celui qui identifie le prédicteur linéaire au paramètre canonique. Le concept suivant montre les deux propriétés remarquables que cela entraîne.

## 🔴 Concept 6 — Le modèle GLM complet

**Le cadre.** Soient $(X_i,Y_i)\in\mathbb R^p\times\mathbb R$, $i=1,\dots,n$, des couples aléatoires **indépendants** tels que la loi conditionnelle de $Y_i$ sachant $X_i=x_i$ ait une densité dans la famille exponentielle canonique :

$$f_{\theta_i}(y_i)=\exp\left(\frac{y_i\theta_i-b(\theta_i)}{\phi}+c(y_i,\phi)\right)$$

La moyenne $\mu_i$ est reliée au paramètre canonique par $\mu_i=b'(\theta_i)$, et $\mu_i$ dépend **linéairement** des covariables par le lien :

$$g(\mu_i)=X_i^\top\beta$$

**Le retour à $\beta$.** La relation entre $\beta$ et $\theta$ est

$$\theta_i=(b')^{-1}(\mu_i)=(b')^{-1}\big(g^{-1}(X_i^\top\beta)\big)\equiv h\big(X_i^\top\beta\big), \qquad \boxed{\ h=(b')^{-1}\circ g^{-1}=(g\circ b')^{-1}\ }$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarque décisive.</span>

*Si $g$ est le **lien canonique**, alors $h$ est l'**identité**.*

</div>

**La log-vraisemblance**, à une constante près :

$$\ell_n(\beta;Y,X)=\sum_i\frac{Y_i\theta_i-b(\theta_i)}{\phi}=\sum_i\frac{Y_ih(X_i^\top\beta)-b\big(h(X_i^\top\beta)\big)}{\phi}$$

*et avec le lien canonique, on obtient l'expression plus simple*

$$\boxed{\ \ell_n(\beta,\phi;Y,X)=\sum_i\frac{Y_iX_i^\top\beta-b(X_i^\top\beta)}{\phi}\ }$$

> **La stricte concavité.** *La log-vraisemblance $\ell(\theta)$ est **strictement concave** avec le lien canonique quand $\phi>0$. Pourquoi ?* *En conséquence, l'**estimateur du maximum de vraisemblance est unique**.* *En revanche, si une autre paramétrisation est utilisée, la vraisemblance peut ne pas être strictement concave, ce qui conduit à **plusieurs maxima locaux**.*

⚠️ **La réponse à la seconde question du cours.** Avec le lien canonique, $\ell_n(\beta)=\sum_i\frac{Y_iX_i^\top\beta-b(X_i^\top\beta)}{\phi}$. Le premier terme est **linéaire** en $\beta$, donc de hessienne nulle ; le second a pour hessienne $-\frac1\phi\sum_ib''(X_i^\top\beta)X_iX_i^\top$. Comme $b''>0$ et $\phi>0$, cette matrice est **définie négative** dès que les $X_i$ engendrent $\mathbb R^p$. D'où la stricte concavité, et l'unicité du maximum par le concept 4 de la fiche 64.

> **C'est la seconde grande propriété du lien canonique**, après la simplification de la log-vraisemblance : il **garantit l'unicité de l'EMV**. Avec un autre lien, plusieurs maxima locaux peuvent apparaître, et l'optimisation devient un problème.

## 🟠 Concept 7 — Newton-Raphson et scores de Fisher

**Le problème.** Étant donné $f$ définie sur $\mathcal X\subset\mathbb R^m$, trouver $x^\ast$ tel que $f(x^\ast)\geq f(x)$ pour tout $x$. *Trois méthodes : **Newton-Raphson**, **scores de Fisher**, **moindres carrés repondérés itérativement**.*

**Gradient et hessienne.** $(\nabla f)=(\partial f/\partial x_1,\dots,\partial f/\partial x_m)^\top$ et $(H_f)_{ij}=\frac{\partial^2f}{\partial x_i\partial x_j}$. *Pour des fonctions régulières, la hessienne est **symétrique**. Si $f$ est strictement concave, $H_f(x)$ est **définie négative**.*

**L'approximation quadratique.**

$$f(x)\approx f(x_0)+\nabla f^\top(x_0)(x-x_0)+\tfrac12(x-x_0)^\top H_f(x_0)(x-x_0)$$

d'où l'approximation du gradient $\nabla f(x)\approx\nabla f(x_0)+H_f(x_0)(x-x_0)$. Si $x^\ast$ est un maximum, $\nabla f(x^\ast)=0$, et l'on résout

$$x^\ast=x_0-H_f(x_0)^{-1}\nabla f(x_0)$$

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode de Newton-Raphson.</span>

*Elle utilise ces approximations **séquentiellement*** :

$$x^{(k+1)}=x^{(k)}-H_f\big(x^{(k)}\big)^{-1}\nabla f\big(x^{(k)}\big)$$

*L'algorithme est **globalement convergent à vitesse quadratique** dès que $f$ est concave et deux fois continûment dérivable.*

</div>

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode des scores de Fisher.</span>

- *Newton-Raphson fonctionne pour un cas **déterministe**, sans données aléatoires.*
- *Parfois, le calcul de la hessienne est assez compliqué.*
- **But** : *utiliser directement le fait qu'on minimise la divergence KL* — $KL\ \text{« }=\text{ »}-\mathbb E[\text{log-vraisemblance}]$.
- **Idée** : *remplacer la hessienne par son **espérance***. Or $\mathbb E_\theta\big(H_{\ell_n}(\theta)\big)=-I(\theta)$ est l'**information de Fisher**.
- *La matrice d'information de Fisher est **définie positive** et peut servir de substitut à la hessienne, d'où la mise à jour* $$\boxed{\ \theta^{(k+1)}=\theta^{(k)}+I\big(\theta^{(k)}\big)^{-1}\nabla\ell_n\big(\theta^{(k)}\big)\ }$$ *C'est l'algorithme des **scores de Fisher**. Il a essentiellement les mêmes propriétés de convergence que Newton-Raphson, mais **$I$ est souvent plus facile à calculer que $H_{\ell_n}$**.*

</div>

⚠️ **Notez le rappel du cours** : *on minimise la divergence KL*. C'est le fil direct avec la fiche 64 — maximiser la vraisemblance **est** minimiser la KL empirique. Remplacer la hessienne empirique par son espérance revient à passer du critère empirique au critère théorique.

### Exemple — la régression logistique

Soient $Y_i\sim\mathrm{Bernoulli}(p_i)$ indépendants et $X_i$ un vecteur $p\times1$ de prédicteurs. La log-vraisemblance est

$$\ell_n(\theta\mid Y,X)=\sum_{i=1}^n\Big(Y_i\theta_i-\log\big(1+e^{\theta_i}\big)\Big)$$

Avec le **lien canonique**, $\theta_i=\log\Big(\frac{p_i}{1-p_i}\Big)=X_i^\top\beta$, d'où

$$\ell_n(\beta\mid Y,X)=\sum_{i=1}^n\Big(Y_iX_i^\top\beta-\log\big(1+e^{X_i^\top\beta}\big)\Big)$$

**Le gradient.**

$$\nabla\ell_n(\beta)=\sum_{i=1}^n\left(Y_i-\frac{e^{X_i^\top\beta}}{1+e^{X_i^\top\beta}}\right)X_i$$

**La hessienne.**

$$H_{\ell_n}(\beta)=-\sum_{i=1}^n\frac{e^{X_i^\top\beta}}{\big(1+e^{X_i^\top\beta}\big)^2}X_iX_i^\top$$

**Trois observations du cours.**

- *La fonction de score est une **combinaison linéaire des $X_i$**, et la hessienne (ou la matrice d'information) une **combinaison linéaire des $X_iX_i^\top$**. C'est typique des modèles de régression en famille exponentielle.*
- *La hessienne est **définie négative**, donc il y a un unique maximum local, qui est aussi le maximum global.*
- ***Les $Y_i$ n'apparaissent pas dans $H_{\ell_n}(\beta)$***, ce qui donne $$H_{\ell_n}(\beta)=\mathbb E\big[H_{\ell_n}(\beta)\big]=-I(\beta)$$

> **Cette dernière observation est importante.** Sous le lien canonique, la hessienne **ne contient aucun aléa** : elle est égale à son espérance. Donc **Newton-Raphson et les scores de Fisher coïncident exactement**. C'est le troisième avantage du lien canonique.

## 🔴 Concept 8 — Les moindres carrés repondérés itérativement (IRLS)

> *IRLS est un algorithme d'ajustement des GLM obtenu par Newton-Raphson / scores de Fisher.*

**Les quantités à relier.** Avec $\ell=\sum_{i=1}^n\frac{Y_i\theta_i-b(\theta_i)}{\phi}+c(Y_i,\phi)$ :

$$\mu_i=b'(\theta_i), \qquad X_i^\top\beta=g(\mu_i), \qquad \frac{d\mu_i}{d\theta_i}=b''(\theta_i)\equiv V_i, \qquad \theta_i=h(X_i^\top\beta)$$

**Le gradient par la règle de la chaîne.**

$$\frac{\partial\ell_n}{\partial\beta_j}=\sum_{i=1}^n\frac{\partial\ell_i}{\partial\theta_i}\frac{\partial\theta_i}{\partial\beta_j}=\sum_i\frac{Y_i-\mu_i}{\phi}h'(X_i^\top\beta)X_{ij}=\sum_i(\tilde Y_i-\tilde\mu_i)W_iX_{ij}$$

où

$$W_i=\frac{h'(X_i^\top\beta)}{g'(\mu_i)\phi}, \qquad \tilde Y=\big(g'(\mu_1)Y_1,\dots,g'(\mu_n)Y_n\big)^\top, \qquad \tilde\mu=\big(g'(\mu_1)\mu_1,\dots,g'(\mu_n)\mu_n\big)^\top$$

En posant $W=\mathrm{diag}\{W_1,\dots,W_n\}$, le gradient s'écrit

$$\boxed{\ \nabla\ell_n(\beta)=X^\top W\big(\tilde Y-\tilde\mu\big)\ }$$

**L'information de Fisher.** L'identité $g^{-1}(\cdot)=b'\circ h(\cdot)$ donne, en dérivant, $b''\circ h(\cdot)\cdot h'(\cdot)=\frac{1}{g'\circ g^{-1}(\cdot)}$, soit

$$b''(\theta_i)\,h'(X_i^\top\beta)=\frac{1}{g'(\mu_i)}$$

d'où

$$\mathbb E\big(H_{\ell_n}(\beta)\big)=-\sum_i\frac{h'(X_i^\top\beta)}{g'(\mu_i)\phi}X_iX_i^\top \qquad\Longrightarrow\qquad \boxed{\ I(\beta)=-\mathbb E\big(H_{\ell_n}(\beta)\big)=X^\top WX\ }$$

avec $W=\mathrm{diag}\Big(\frac{h'(X_i^\top\beta)}{g'(\mu_i)\phi}\Big)$.

**La mise à jour par scores de Fisher.**

$$\beta^{(k+1)}=\beta^{(k)}+I\big(\beta^{(k)}\big)^{-1}\nabla\ell_n\big(\beta^{(k)}\big)=\beta^{(k)}+(X^\top WX)^{-1}X^\top W(\tilde Y-\tilde\mu)$$

$$=(X^\top WX)^{-1}X^\top W\big(\tilde Y-\tilde\mu+X\beta^{(k)}\big)$$

### La parenthèse : les moindres carrés pondérés

*Supposons le modèle linéaire $Y=X\beta+\varepsilon$ avec $\varepsilon\sim N_n(0,W^{-1})$, $W^{-1}$ diagonale. **Quand les variances sont différentes, la régression est dite hétéroscédastique**.* L'EMV est la solution de

$$\min_\beta\ (Y-X\beta)^\top W(Y-X\beta)$$

*C'est un problème de **moindres carrés pondérés**, de solution*

$$\hat\beta=(X^\top WX)^{-1}X^\top WY$$

*Il est implémenté en routine dans les logiciels statistiques.*

> **C'est exactement l'estimateur MCG de la fiche 50**, avec $\Sigma^{-1}=W$. Le pont est explicite : les MCG sont des moindres carrés **pondérés par l'inverse des variances**.

### La procédure IRLS

> *IRLS est une procédure itérative pour calculer l'EMV dans les GLM **en utilisant les moindres carrés pondérés**.* Pour passer de $\beta^{(k)}$ à $\beta^{(k+1)}$ :
>
> **1.** Fixer $\beta^{(k)}$ et $\mu_i^{(k)}=g^{-1}\big(X_i^\top\beta^{(k)}\big)$. **2.** Calculer les **réponses dépendantes ajustées**
>
> $$Z_i^{(k)}=X_i^\top\beta^{(k)}+g'\big(\mu_i^{(k)}\big)\big(Y_i-\mu_i^{(k)}\big)$$
>
> **3.** Calculer les **poids**
>
> $$W^{(k)}=\mathrm{diag}\left(\frac{h'\big(X_i^\top\beta^{(k)}\big)}{g'\big(\mu_i^{(k)}\big)\phi}\right)$$
>
> **4.** **Régresser $Z^{(k)}$ sur la matrice de design $X$ avec le poids $W^{(k)}$** pour obtenir $\beta^{(k+1)}$.
>
> On répète jusqu'à convergence.

**Deux remarques finales.**

- *Pour cette procédure, il suffit de connaître $X$, $Y$, la **fonction de lien** $g$ et la **fonction de variance** $V(\mu)=b''(\theta)$. Une valeur de départ possible est $\mu^{(0)}=Y$.*
- *Si le **lien canonique** est utilisé, les scores de Fisher coïncident avec Newton-Raphson : $\mathbb E(H_{\ell_n})=H_{\ell_n}$, **il n'y a pas de composante aléatoire ($Y$) dans la hessienne**.*

> **L'élégance d'IRLS tient en une phrase.** Ajuster un modèle **non linéaire** — logistique, Poisson, Gamma — se ramène à une **suite de régressions linéaires pondérées**, chacune résoluble par une routine existante. On n'a jamais besoin d'un optimiseur général : la structure de famille exponentielle fournit à chaque pas une pondération et une réponse ajustée, et le reste est du moindre carré ordinaire.

## Comment résoudre l'exercice type (protocole)

1. **Identifier la nature de la réponse** : continue ⟹ normale · comptage ⟹ Poisson · binaire ⟹ Bernoulli · positive à variance croissante ⟹ Gamma.
2. **Mettre la loi sous forme canonique** $\exp\big(\frac{y\theta-b(\theta)}{\phi}+c(y,\phi)\big)$ et **identifier $b$ et $\phi$**.
3. **En déduire** $\mu=b'(\theta)$ et $\mathrm{var}(Y)=b''(\theta)\phi$.
4. **Choisir le lien** — de préférence le lien **canonique** $g=(b')^{-1}$, pour la simplification et l'unicité.
5. **Écrire la log-vraisemblance** : avec le lien canonique, $\ell_n=\sum_i\frac{Y_iX_i^\top\beta-b(X_i^\top\beta)}{\phi}$.
6. **Calculer gradient et hessienne**, ou directement $I(\beta)=X^\top WX$.
7. **Estimer par IRLS** : réponses ajustées, poids, régression pondérée, itérer.
8. **Faire l'inférence** : $I(\hat\beta)^{-1}$ donne les écarts-types, puis Wald ou rapport de vraisemblance (fiche 65).

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| réponse **binaire** (oui/non, succès/échec) | **Bernoulli** + lien **logit** ⟹ régression logistique |
| réponse de **comptage** | **Poisson** + lien **log** |
| « croissance exponentielle du nombre de cas » | Poisson, $\log\mu=\beta_0+\beta_1t$ |
| « écart-type proportionnel à la moyenne » | **Gamma** |
| relation **non linéaire en les paramètres** | chercher un lien qui la linéarise |
| « pourquoi le logit ? » | c'est le **lien canonique** de Bernoulli |
| « le maximum est-il unique ? » | oui **avec le lien canonique** (stricte concavité) |
| « comment ajuster numériquement ? » | **IRLS** |
| « variances différentes selon l'observation » | moindres carrés **pondérés** |

### Exercices progressifs

**Niveau 1** — Mettez la loi de Bernoulli sous forme canonique et déduisez-en le lien canonique.

<details><summary>Correction</summary>

**La densité.** $f(y)=p^y(1-p)^{1-y}$ pour $y\in\{0,1\}$. En passant à l'exponentielle du logarithme :

$$f(y)=\exp\big(y\log p+(1-y)\log(1-p)\big)=\exp\left(y\log\frac{p}{1-p}+\log(1-p)\right)$$

**L'identification.** En comparant à $\exp\big(\frac{y\theta-b(\theta)}{\phi}+c(y,\phi)\big)$ :

$$\theta=\log\frac{p}{1-p}, \qquad \phi=1, \qquad c(y,\phi)=0$$

Il reste à exprimer $-\log(1-p)$ en fonction de $\theta$. De $\theta=\log\frac{p}{1-p}$ on tire $e^\theta=\frac{p}{1-p}$, donc $p=\frac{e^\theta}{1+e^\theta}$ et $1-p=\frac{1}{1+e^\theta}$, d'où

$$b(\theta)=-\log(1-p)=\log(1+e^\theta)$$

**Les moments.**

$$\mu=b'(\theta)=\frac{e^\theta}{1+e^\theta}=p \qquad\checkmark$$

$$\mathrm{var}(Y)=b''(\theta)\phi=\frac{e^\theta}{(1+e^\theta)^2}=p(1-p) \qquad\checkmark$$

Les deux formules retrouvent les moments connus de Bernoulli.

**Le lien canonique.** $g=(b')^{-1}$, et l'on a déjà inversé $b'$ :

$$g(\mu)=\log\frac{\mu}{1-\mu}$$

**C'est le lien logit.** Il envoie bien $(0,1)$ sur $\mathbb R$, comme l'exigeait l'exemple 3 du concept 1.

</details>

**Niveau 2** — Pourquoi $\mu=b'(\theta)$ et $\mathrm{var}(Y)=b''(\theta)\phi$ ?

<details><summary>Correction</summary>

**Les deux identités**, conséquences de $\int f_\theta(y)dy\equiv1$ dérivée une puis deux fois sous l'intégrale :

$$\mathbb E\left(\frac{\partial\ell}{\partial\theta}\right)=0, \qquad \mathbb E\left(\frac{\partial^2\ell}{\partial\theta^2}\right)+\mathbb E\left(\frac{\partial\ell}{\partial\theta}\right)^2=0$$

**L'espérance.** De $\ell(\theta)=\frac{Y\theta-b(\theta)}{\phi}+c(Y;\phi)$ :

$$\frac{\partial\ell}{\partial\theta}=\frac{Y-b'(\theta)}{\phi}$$

La première identité donne

$$0=\frac{\mathbb E(Y)-b'(\theta)}{\phi} \qquad\Longrightarrow\qquad \mathbb E(Y)=b'(\theta)$$

**La variance.** On a $\frac{\partial^2\ell}{\partial\theta^2}=-\frac{b''(\theta)}{\phi}$, et, grâce au résultat précédent,

$$\left(\frac{\partial\ell}{\partial\theta}\right)^2=\left(\frac{Y-\mathbb E(Y)}{\phi}\right)^2$$

dont l'espérance vaut $\frac{\mathrm{var}(Y)}{\phi^2}$. La seconde identité donne

$$0=-\frac{b''(\theta)}{\phi}+\frac{\mathrm{var}(Y)}{\phi^2} \qquad\Longrightarrow\qquad \mathrm{var}(Y)=b''(\theta)\phi$$

**Ce qu'il faut retenir.** **Une seule fonction $b$ encode toute la loi** : sa dérivée première donne la moyenne, sa dérivée seconde la variance. C'est ce qui rend la théorie des GLM si compacte.

**Et la conséquence structurelle.** Puisque $\mu=b'(\theta)$, la variance $b''(\theta)\phi$ est une **fonction de la moyenne** : $V(\mu)$. Dans un GLM, on ne choisit **pas** séparément la moyenne et la variance — la famille impose leur relation. Pour Poisson, $V(\mu)=\mu$ ; pour Bernoulli, $V(\mu)=\mu(1-\mu)$ ; pour la normale, $V(\mu)=\sigma^2$, constante. C'est précisément ce que l'exemple 2 du concept 1 exploitait en choisissant Gamma pour obtenir un écart-type proportionnel à la moyenne.

</details>

**Niveau 3** — Quels sont les trois avantages du lien canonique ?

<details><summary>Correction</summary>

Le lien canonique est $g=(b')^{-1}$, c'est-à-dire celui qui identifie le prédicteur linéaire au **paramètre canonique** : $\theta_i=X_i^\top\beta$.

**Avantage 1 — la log-vraisemblance se simplifie.** En général $\theta_i=h(X_i^\top\beta)$ avec $h=(g\circ b')^{-1}$, et

$$\ell_n(\beta)=\sum_i\frac{Y_ih(X_i^\top\beta)-b\big(h(X_i^\top\beta)\big)}{\phi}$$

Avec le lien canonique, **$h$ est l'identité** et

$$\ell_n(\beta)=\sum_i\frac{Y_iX_i^\top\beta-b(X_i^\top\beta)}{\phi}$$

**Avantage 2 — la stricte concavité, donc l'unicité.** La hessienne vaut

$$H_{\ell_n}(\beta)=-\frac1\phi\sum_ib''(X_i^\top\beta)X_iX_i^\top$$

Comme $b''(\theta)\phi=\mathrm{var}(Y)>0$ et $\phi>0$, on a $b''>0$, donc $H_{\ell_n}$ est **définie négative** dès que les $X_i$ engendrent $\mathbb R^p$. La log-vraisemblance est **strictement concave** et l'EMV est **unique**.

Le cours souligne le contraste : *si une autre paramétrisation est utilisée, la vraisemblance peut ne pas être strictement concave, ce qui conduit à plusieurs maxima locaux.*

**Avantage 3 — Newton-Raphson $=$ scores de Fisher.** La hessienne ci-dessus **ne contient pas les $Y_i$** : elle est déterministe, donc égale à son espérance :

$$H_{\ell_n}(\beta)=\mathbb E\big[H_{\ell_n}(\beta)\big]=-I(\beta)$$

Les deux algorithmes **coïncident exactement**, et l'on n'a pas à choisir.

**La conclusion pratique.** C'est pour ces trois raisons que le **logit** est le lien standard de la régression binaire, et le **log** celui de la régression de Poisson. Le probit reste utilisé — notamment en économétrie, pour son interprétation en variable latente gaussienne — mais il perd ces trois propriétés.

</details>

**Niveau 4 — type examen** — Décrivez l'algorithme IRLS et expliquez pourquoi il fonctionne.

<details><summary>Correction</summary>

**Le point de départ : les scores de Fisher.**

$$\beta^{(k+1)}=\beta^{(k)}+I\big(\beta^{(k)}\big)^{-1}\nabla\ell_n\big(\beta^{(k)}\big)$$

**Les deux quantités, calculées par la règle de la chaîne.** Avec $\mu_i=b'(\theta_i)$, $X_i^\top\beta=g(\mu_i)$ et $\theta_i=h(X_i^\top\beta)$ :

$$\frac{\partial\ell_n}{\partial\beta_j}=\sum_i\frac{Y_i-\mu_i}{\phi}h'(X_i^\top\beta)X_{ij}=\sum_i(\tilde Y_i-\tilde\mu_i)W_iX_{ij}$$

avec $W_i=\frac{h'(X_i^\top\beta)}{g'(\mu_i)\phi}$, $\tilde Y_i=g'(\mu_i)Y_i$ et $\tilde\mu_i=g'(\mu_i)\mu_i$. En posant $W=\mathrm{diag}(W_i)$ :

$$\nabla\ell_n(\beta)=X^\top W(\tilde Y-\tilde\mu), \qquad I(\beta)=X^\top WX$$

**La mise à jour devient donc**

$$\beta^{(k+1)}=\beta^{(k)}+(X^\top WX)^{-1}X^\top W(\tilde Y-\tilde\mu)=(X^\top WX)^{-1}X^\top W\big(\tilde Y-\tilde\mu+X\beta^{(k)}\big)$$

**La reconnaissance décisive.** Le membre de droite a **exactement** la forme de la solution des **moindres carrés pondérés**

$$\hat\beta=(X^\top WX)^{-1}X^\top WZ$$

avec $W$ pour matrice de poids et $Z=\tilde Y-\tilde\mu+X\beta^{(k)}$ pour réponse. *On peut donc obtenir $\beta^{(k+1)}$ par n'importe quel solveur de moindres carrés pondérés.*

**L'algorithme, en quatre étapes.**

1. Fixer $\beta^{(k)}$ et $\mu_i^{(k)}=g^{-1}(X_i^\top\beta^{(k)})$.
2. Calculer les **réponses ajustées** $Z_i^{(k)}=X_i^\top\beta^{(k)}+g'(\mu_i^{(k)})\big(Y_i-\mu_i^{(k)}\big)$.
3. Calculer les **poids** $W^{(k)}=\mathrm{diag}\Big(\frac{h'(X_i^\top\beta^{(k)})}{g'(\mu_i^{(k)})\phi}\Big)$.
4. **Régresser $Z^{(k)}$ sur $X$ avec les poids $W^{(k)}$** ⟹ $\beta^{(k+1)}$. Répéter jusqu'à convergence.

**Pourquoi cela fonctionne — l'interprétation des étapes 2 et 3.**

- La **réponse ajustée** $Z_i^{(k)}$ est le prédicteur linéaire courant, **corrigé du résidu transporté sur l'échelle du lien** par le facteur $g'(\mu_i)$. C'est une linéarisation locale du modèle : on ramène $Y_i$ sur l'échelle où le modèle est linéaire.
- Le **poids** $W_i$ est d'autant plus grand que l'observation est informative — il décroît quand la variance locale augmente. C'est la correction d'**hétéroscédasticité** de la fiche 50, appliquée localement : la variance d'un GLM dépend de la moyenne, donc varie d'une observation à l'autre.

**Ce qu'il faut savoir ajouter.**

- *Il suffit de connaître $X$, $Y$, la **fonction de lien** $g$ et la **fonction de variance** $V(\mu)=b''(\theta)$.* Un seul algorithme sert donc à toutes les familles — il suffit de changer $g$ et $V$. C'est ce qui explique l'universalité des implémentations (`glm` en R, etc.).
- *Une valeur de départ possible est $\mu^{(0)}=Y$.*
- *Si le **lien canonique** est utilisé, les scores de Fisher coïncident avec Newton-Raphson*, puisque $\mathbb E(H_{\ell_n})=H_{\ell_n}$ — la hessienne ne contient pas $Y$.

**La leçon de méthode.** Un problème d'optimisation **non linéaire** est transformé en une **suite de problèmes linéaires** déjà résolus. C'est exactement l'esprit de Newton (fiche 39) : approcher localement par une forme quadratique, résoudre exactement l'approximation, itérer.

</details>

## 🔴 Common mistakes

1. **Écrire $\mu(X)=X^\top\beta$ pour une réponse bornée** — le membre de droite parcourt $\mathbb R$, il faut un **lien**.
2. **Confondre $\theta$ et $\mu$** — $\theta$ est le paramètre **canonique**, $\mu=b'(\theta)$ la moyenne. Ils coïncident seulement pour la normale.
3. **Croire qu'on choisit la variance librement** — elle vaut $b''(\theta)\phi$, donc c'est une **fonction de la moyenne**.
4. **Oublier le facteur $\phi$** dans $\mathrm{var}(Y)=b''(\theta)\phi$.
5. **Croire que logit et probit sont interchangeables** — le **logit est le lien canonique** de Bernoulli, avec les trois avantages du concept 6.
6. **Croire que la log-vraisemblance est toujours concave** — c'est garanti **avec le lien canonique** ; sinon plusieurs maxima locaux sont possibles.
7. **Confondre Newton-Raphson et scores de Fisher** — le second remplace $H_{\ell_n}$ par $-I(\theta)$, son espérance. Ils **coïncident** sous le lien canonique.
8. **Se tromper de signe dans les mises à jour** — Newton : $x-H^{-1}\nabla$ ; Fisher : $\theta+I^{-1}\nabla$ (les signes se compensent, puisque $I=-\mathbb E[H]$).
9. **Oublier la pondération dans IRLS** — c'est elle qui corrige l'hétéroscédasticité propre au GLM.

## 📌 Ultimate Review

1. **Modèle linéaire** : $Y\mid X\sim N(\mu(X),\sigma^2I)$ et $\mu(X)=X^\top\beta$. Ses **deux composantes** : aléatoire (gaussienne) et lien (identité).
2. **GLM** : composante aléatoire dans une **famille exponentielle**, et lien $g(\mu(X))=X^\top\beta$.
3. **Famille exponentielle à $k$ paramètres** : $p_\theta(x)=\exp\big[\sum_i\eta_i(\theta)T_i(x)-B(\theta)\big]h(x)$.
4. **Forme canonique à un paramètre** : $f_\theta(y)=\exp\big(\frac{y\theta-b(\theta)}{\phi}+c(y,\phi)\big)$ ; $\theta$ **canonique**, $\phi$ **dispersion** (supposé connu).
5. **Tableau** : normale $b=\theta^2/2$, $\phi=\sigma^2$ · Poisson $b=e^\theta$, $\phi=1$ · Bernoulli $b=\log(1+e^\theta)$, $\phi=1$.
6. **Deux identités** : $\mathbb E(\partial_\theta\ell)=0$ et $\mathbb E(\partial^2_\theta\ell)+\mathbb E(\partial_\theta\ell)^2=0$, issues de $\int f_\theta=1$.
7. **Les deux formules maîtresses** : $\boxed{\mu=b'(\theta)}$ et $\boxed{\mathrm{var}(Y)=b''(\theta)\phi}$.
8. **Fonction de lien** : $X^\top\beta=g(\mu)$, $g$ monotone croissante et dérivable ; identité (normale), $\log$ (Poisson), **logit / probit / log-log complémentaire** (Bernoulli).
9. **Lien canonique** : $g=(b')^{-1}$, donc $g(\mu)=\theta$ ; **strictement croissant** car $b''>0$.
10. **Liens canoniques** : normale $\mu$ · Poisson $\log\mu$ · Bernoulli $\log\frac{\mu}{1-\mu}$ · Gamma $-1/\mu$.
11. **Le modèle** : $\theta_i=h(X_i^\top\beta)$ avec $h=(g\circ b')^{-1}$ ; **$h=$ identité** si $g$ est canonique.
12. **Log-vraisemblance** : $\sum_i\frac{Y_ih(X_i^\top\beta)-b(h(X_i^\top\beta))}{\phi}$, qui devient $\sum_i\frac{Y_iX_i^\top\beta-b(X_i^\top\beta)}{\phi}$ sous lien canonique.
13. **Stricte concavité** sous lien canonique et $\phi>0$ ⟹ **EMV unique**.
14. **Newton-Raphson** : $x^{(k+1)}=x^{(k)}-H_f^{-1}\nabla f$ ; convergence **quadratique** si $f$ concave.
15. **Scores de Fisher** : $\theta^{(k+1)}=\theta^{(k)}+I(\theta^{(k)})^{-1}\nabla\ell_n$ ; on remplace $H$ par $\mathbb E[H]=-I$, souvent plus facile à calculer.
16. **Régression logistique** : $\nabla\ell_n=\sum_i\big(Y_i-\frac{e^{X_i^\top\beta}}{1+e^{X_i^\top\beta}}\big)X_i$ et $H_{\ell_n}=-\sum_i\frac{e^{X_i^\top\beta}}{(1+e^{X_i^\top\beta})^2}X_iX_i^\top$ ; **$Y$ absent de $H$**.
17. **IRLS** : $\nabla\ell_n=X^\top W(\tilde Y-\tilde\mu)$, $I(\beta)=X^\top WX$, d'où $\beta^{(k+1)}=(X^\top WX)^{-1}X^\top W\big(\tilde Y-\tilde\mu+X\beta^{(k)}\big)$.
18. **Moindres carrés pondérés** : $\min_\beta(Y-X\beta)^\top W(Y-X\beta)$, de solution $(X^\top WX)^{-1}X^\top WY$ — les **MCG** de la fiche 50.
19. **Procédure IRLS** : $\mu^{(k)}$ · réponses ajustées $Z^{(k)}$ · poids $W^{(k)}$ · **régression pondérée** ⟹ $\beta^{(k+1)}$.
20. **Ce qu'il suffit de connaître** : $X$, $Y$, le lien $g$ et la **fonction de variance** $V(\mu)=b''(\theta)$ ; départ $\mu^{(0)}=Y$.

**Formulas to know**

$$f_\theta(y)=\exp\left(\frac{y\theta-b(\theta)}{\phi}+c(y,\phi)\right) \qquad \mu=b'(\theta) \qquad \mathrm{var}(Y)=b''(\theta)\phi$$

$$g(\mu)=X^\top\beta \qquad g_{\text{canonique}}=(b')^{-1} \qquad \text{logit}(\mu)=\log\frac{\mu}{1-\mu}$$

$$\nabla\ell_n(\beta)=X^\top W(\tilde Y-\tilde\mu) \qquad I(\beta)=X^\top WX \qquad \beta^{(k+1)}=(X^\top WX)^{-1}X^\top WZ^{(k)}$$

**Methods to know** : mettre une loi sous forme canonique ; dériver $\mu$ et $\mathrm{var}$ par les deux identités ; établir que le logit est canonique pour Bernoulli ; la procédure IRLS en quatre étapes.

## 🧠 Active Recall

**Basic** — Écrivez la forme canonique de la famille exponentielle et donnez moyenne et variance.

<details><summary>Réponse</summary>

$$f_\theta(y)=\exp\left(\frac{y\theta-b(\theta)}{\phi}+c(y,\phi)\right)$$

où $\theta$ est le **paramètre canonique** et $\phi$ le **paramètre de dispersion** (supposé connu).

Les moments s'obtiennent par les deux identités issues de $\int f_\theta=1$ :

$$\mathbb E(Y)=\mu=b'(\theta), \qquad \mathrm{var}(Y)=b''(\theta)\,\phi$$

**Une seule fonction $b$ encode toute la loi** — et comme $\mu=b'(\theta)$, la variance est nécessairement une **fonction de la moyenne**.

</details>

**Understanding** — Pourquoi faut-il une fonction de lien ?

<details><summary>Réponse</summary>

Parce que le prédicteur linéaire $X^\top\beta$ parcourt **tout $\mathbb R$**, alors que la moyenne $\mu$ est souvent **contrainte** :

- Bernoulli : $\mu\in(0,1)$ ;
- Poisson : $\mu>0$ ;
- Gamma : $\mu>0$.

Écrire $\mu(X)=X^\top\beta$ produirait des valeurs impossibles. Le cours le dit pour les données Kyphosis : *on ne peut pas écrire $\mu(X)=X^\top\beta$ parce que le membre de droite parcourt $\mathbb R$ ; il faut une fonction inversible $f$ telle que $f(X^\top\beta)\in(0,1)$.*

**La solution** : une fonction $g$ **monotone croissante et dérivable** telle que

$$g(\mu)=X^\top\beta \qquad\Longleftrightarrow\qquad \mu=g^{-1}(X^\top\beta)$$

avec $g$ envoyant le domaine de $\mu$ sur $\mathbb R$ tout entier. Pour un comptage, $\log$ envoie $(0,\infty)$ sur $\mathbb R$ ; pour une proportion, le **logit** envoie $(0,1)$ sur $\mathbb R$.

**Bonus** : le lien peut aussi **linéariser** une relation non linéaire — c'est l'exemple 2 du cours, où le lien réciproque $1/\mu$ transforme $\mu=\frac{\alpha x}{h+x}$ en une relation affine en $1/x$.

</details>

**Application** — Quel GLM pour un nombre de sinistres par assuré ?

<details><summary>Réponse</summary>

**La réponse est un comptage** : $Y\in\{0,1,2,\dots\}$. La loi naturelle est **Poisson**.

**La forme canonique.** $f(y)=\frac{\mu^ye^{-\mu}}{y!}=\exp\big(y\log\mu-\mu-\log(y!)\big)$, d'où

$$\theta=\log\mu, \qquad b(\theta)=e^\theta, \qquad \phi=1, \qquad c(y,\phi)=-\log(y!)$$

**Les moments.** $b'(\theta)=e^\theta=\mu$ et $\mathrm{var}(Y)=b''(\theta)\phi=e^\theta=\mu$ — la variance **égale** la moyenne, propriété caractéristique de Poisson.

**Le lien canonique.** $g=(b')^{-1}$, soit $g(\mu)=\log\mu$. Le modèle s'écrit donc

$$\log\big(\mu(X)\big)=X^\top\beta \qquad\Longleftrightarrow\qquad \mu(X)=e^{X^\top\beta}$$

ce qui garantit $\mu>0$ automatiquement.

**L'interprétation, qui est le grand avantage du lien log.** Les coefficients s'interprètent **multiplicativement** : augmenter $X^{(j)}$ d'une unité multiplie le nombre espéré de sinistres par $e^{\beta_j}$. C'est exactement le langage de la tarification en assurance.

⚠️ **La limite à connaître.** Poisson impose $\mathrm{var}(Y)=\mu$. En assurance, on observe presque toujours une **surdispersion** — variance supérieure à la moyenne. On passe alors à une **binomiale négative** (elle aussi de famille exponentielle), ou l'on introduit un paramètre de dispersion $\phi>1$.

</details>

**Comparison** — Newton-Raphson, scores de Fisher, IRLS : quelle différence ?

<details><summary>Réponse</summary>

|  | **Newton-Raphson** | **Scores de Fisher** | **IRLS** |
|---|---|---|---|
| Mise à jour | $x-H_f^{-1}\nabla f$ | $\theta+I(\theta)^{-1}\nabla\ell_n$ | régression pondérée |
| Matrice utilisée | hessienne **empirique** $H_{\ell_n}$ | son **espérance** $-I(\theta)$ | $X^\top WX$ |
| Contient $Y$ ? | oui en général | non | non |
| Outil requis | optimiseur | optimiseur | **solveur de MCP** |

**Newton-Raphson** est la méthode générale : approximation quadratique locale, résolution exacte, itération. Convergence **quadratique** si $f$ est concave.

**Les scores de Fisher** remplacent $H_{\ell_n}$ par son espérance $-I(\theta)$. Motivation du cours : *le calcul de la hessienne est parfois assez compliqué*, et $I$ est **définie positive**, donc un substitut sûr. Mêmes propriétés de convergence.

**IRLS** est la **mise en œuvre concrète** des scores de Fisher pour les GLM. En développant, on trouve

$$\beta^{(k+1)}=(X^\top WX)^{-1}X^\top W\big(\tilde Y-\tilde\mu+X\beta^{(k)}\big)$$

qui a exactement la forme d'une solution de **moindres carrés pondérés**. On n'a donc besoin d'aucun optimiseur : une routine de régression pondérée suffit.

**Le cas particulier remarquable.** Avec le **lien canonique**, la hessienne ne contient pas $Y$ :

$$H_{\ell_n}(\beta)=\mathbb E[H_{\ell_n}(\beta)]=-I(\beta)$$

et les trois méthodes **coïncident**.

</details>

**Exam-style** — Construisez complètement la régression logistique comme GLM.

<details><summary>Réponse</summary>

**1. La composante aléatoire.** $Y_i\mid X_i\sim\mathrm{Bernoulli}(p_i)$, indépendants. La densité s'écrit

$$f(y)=p^y(1-p)^{1-y}=\exp\left(y\log\frac{p}{1-p}+\log(1-p)\right)$$

soit, sous forme canonique,

$$\theta=\log\frac{p}{1-p}, \qquad b(\theta)=\log(1+e^\theta), \qquad \phi=1, \qquad c(y,\phi)=0$$

**2. Les moments.** $\mu=b'(\theta)=\frac{e^\theta}{1+e^\theta}=p$ et $\mathrm{var}(Y)=b''(\theta)\phi=\frac{e^\theta}{(1+e^\theta)^2}=p(1-p)$.

**3. Le lien canonique.** $g=(b')^{-1}$, donc

$$g(\mu)=\log\frac{\mu}{1-\mu}=\text{logit}(\mu)$$

Le modèle est $\text{logit}(p_i)=X_i^\top\beta$, soit $p_i=\frac{e^{X_i^\top\beta}}{1+e^{X_i^\top\beta}}\in(0,1)$ automatiquement.

**4. La log-vraisemblance.** Comme $h$ est l'identité sous lien canonique, $\theta_i=X_i^\top\beta$ et

$$\ell_n(\beta\mid Y,X)=\sum_{i=1}^n\Big(Y_iX_i^\top\beta-\log\big(1+e^{X_i^\top\beta}\big)\Big)$$

**5. Le gradient.**

$$\nabla\ell_n(\beta)=\sum_{i=1}^n\left(Y_i-\frac{e^{X_i^\top\beta}}{1+e^{X_i^\top\beta}}\right)X_i=\sum_i\big(Y_i-p_i\big)X_i=X^\top(Y-p)$$

C'est une **combinaison linéaire des $X_i$**, pondérée par les résidus.

**6. La hessienne.**

$$H_{\ell_n}(\beta)=-\sum_{i=1}^n\frac{e^{X_i^\top\beta}}{\big(1+e^{X_i^\top\beta}\big)^2}X_iX_i^\top=-\sum_ip_i(1-p_i)X_iX_i^\top=-X^\top WX$$

avec $W=\mathrm{diag}\big(p_i(1-p_i)\big)$ — c'est **exactement la fonction de variance** $V(\mu)=\mu(1-\mu)$.

**7. Les trois observations du cours.**

- Score linéaire en $X_i$, information linéaire en $X_iX_i^\top$ : *typique des modèles de régression en famille exponentielle*.
- Hessienne **définie négative** ⟹ maximum local unique, qui est le maximum global.
- **$Y$ n'apparaît pas dans $H_{\ell_n}$** ⟹ $H_{\ell_n}(\beta)=\mathbb E[H_{\ell_n}(\beta)]=-I(\beta)$, donc **Newton-Raphson $=$ scores de Fisher**.

**8. L'estimation par IRLS.** Avec $g'(\mu)=\frac{1}{\mu(1-\mu)}$ :

- réponse ajustée : $Z_i^{(k)}=X_i^\top\beta^{(k)}+\dfrac{Y_i-p_i^{(k)}}{p_i^{(k)}(1-p_i^{(k)})}$ ;
- poids : $W_i^{(k)}=p_i^{(k)}(1-p_i^{(k)})$ ;
- régresser $Z^{(k)}$ sur $X$ avec les poids $W^{(k)}$, itérer.

**9. L'inférence.** $I(\hat\beta)=X^\top WX$ donne les écarts-types asymptotiques, d'où les tests de **Wald** et du **rapport de vraisemblance** de la fiche 65.

**Le point d'interprétation à ne pas manquer.** $\beta_j$ est l'effet sur le **log-odds** : augmenter $X^{(j)}$ d'une unité multiplie la cote $\frac{p}{1-p}$ par $e^{\beta_j}$. C'est l'**odds ratio**, la quantité universellement rapportée en épidémiologie et en économétrie du choix discret.

**Et la remarque sur les poids.** $W_i=p_i(1-p_i)$ est **maximal en $p_i=1/2$** et tend vers $0$ quand $p_i\to0$ ou $1$. Les observations dont l'issue est presque certaine apportent peu d'information — ce sont les cas « incertains » qui déterminent les coefficients.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les deux composantes d'un modèle linéaire ? | Composante **aléatoire** (gaussienne) et **lien** (identité) |
| Ce que généralise un GLM ? | La loi (famille exponentielle) et le lien $g(\mu)=X^\top\beta$ |
| Forme canonique de la famille exponentielle ? | $\exp\big(\frac{y\theta-b(\theta)}{\phi}+c(y,\phi)\big)$ |
| Nom de $\theta$ ? | Paramètre **canonique** |
| Nom de $\phi$ ? | Paramètre de **dispersion** |
| Première identité ? | $\mathbb E(\partial\ell/\partial\theta)=0$ |
| Seconde identité ? | $\mathbb E(\partial^2\ell/\partial\theta^2)+\mathbb E(\partial\ell/\partial\theta)^2=0$ |
| Expression de la moyenne ? | $\mu=b'(\theta)$ |
| Expression de la variance ? | $\mathrm{var}(Y)=b''(\theta)\phi$ |
| $b(\theta)$ pour la normale ? | $\theta^2/2$ |
| $b(\theta)$ pour Poisson ? | $e^\theta$ |
| $b(\theta)$ pour Bernoulli ? | $\log(1+e^\theta)$ |
| $\phi$ pour Poisson et Bernoulli ? | $1$ |
| Rôle de la fonction de lien ? | Relier $X^\top\beta\in\mathbb R$ à $\mu$ contrainte |
| Propriétés exigées de $g$ ? | Monotone **croissante** et **dérivable** |
| Lien naturel pour un comptage ? | $\log$ |
| Les trois liens pour Bernoulli ? | **logit**, **probit**, log-log complémentaire |
| Définition du lien canonique ? | $g(\mu)=\theta$, soit $g=(b')^{-1}$ |
| Pourquoi est-il croissant ? | Car $b''\phi=\mathrm{var}(Y)>0$ |
| Lien canonique de Bernoulli ? | Le **logit** $\log\frac{\mu}{1-\mu}$ |
| Lien canonique de Poisson ? | $\log\mu$ |
| Lien canonique de Gamma ? | $-1/\mu$ |
| Que vaut $h$ ? | $(g\circ b')^{-1}$ ; l'**identité** si $g$ est canonique |
| Log-vraisemblance sous lien canonique ? | $\sum_i\frac{Y_iX_i^\top\beta-b(X_i^\top\beta)}{\phi}$ |
| Pourquoi l'EMV est-il unique ? | **Stricte concavité** sous lien canonique |
| Mise à jour de Newton-Raphson ? | $x^{(k+1)}=x^{(k)}-H_f^{-1}\nabla f$ |
| Mise à jour des scores de Fisher ? | $\theta^{(k+1)}=\theta^{(k)}+I(\theta^{(k)})^{-1}\nabla\ell_n$ |
| Pourquoi préférer $I$ à $H$ ? | Elle est **définie positive** et souvent plus simple |
| Gradient de la logistique ? | $\sum_i\big(Y_i-\frac{e^{X_i^\top\beta}}{1+e^{X_i^\top\beta}}\big)X_i$ |
| Particularité de sa hessienne ? | Elle **ne contient pas $Y$** ⟹ Newton $=$ Fisher |
| Gradient sous forme matricielle ? | $X^\top W(\tilde Y-\tilde\mu)$ |
| Information de Fisher d'un GLM ? | $I(\beta)=X^\top WX$ |
| Solution des moindres carrés pondérés ? | $(X^\top WX)^{-1}X^\top WY$ |
| Les quatre étapes d'IRLS ? | $\mu^{(k)}$ · réponses ajustées · poids · régression pondérée |
| Réponse ajustée ? | $Z_i=X_i^\top\beta+g'(\mu_i)(Y_i-\mu_i)$ |
| Que suffit-il de connaître pour IRLS ? | $X$, $Y$, le lien $g$ et la variance $V(\mu)=b''(\theta)$ |
