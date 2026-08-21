# Fiche 51 — Théorie du portefeuille : Markowitz, Tobin, utilité et mesures de risque

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | Kempthorne, *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 14 « Portfolio Theory » |
| **Difficulté** | Must know — le cœur de la finance de marché quantitative |
| **Temps d'étude estimé** | 2 h 45 |
| **Prérequis** | Fiche 7 (multiplicateurs de Lagrange), fiche 9 (matrices définies positives), fiche 37 (programmes quadratiques) |
| **Concepts clés** | Analyse moyenne-variance, frontière efficiente, actif sans risque, portefeuille de marché, théorème de séparation de Tobin, droite de marché des capitaux, prix de marché du risque, utilité de von Neumann-Morgenstern, aversion au risque d'Arrow-Pratt, contraintes de gestion, VaR, CVaR, mesures de risque cohérentes |
| **Poids à l'examen** | Trois choses à savoir faire : **dériver** le portefeuille de variance minimale par Lagrange, **démontrer** la séparation de Tobin, et **critiquer** la VaR à l'aide des quatre axiomes de cohérence. |

## 🎯 Vue d'ensemble

Un investisseur dispose de $m$ actifs risqués. Comment répartir sa richesse ? Markowitz (1952) répond : **résumez chaque portefeuille par deux nombres** — son rendement espéré et sa variance — puis optimisez. Tout le chapitre découle de ce choix.

```
DONNÉES     R = (R₁,…,R_m)   E[R] = μ   Cov[R] = Σ
PORTEFEUILLE w, avec wᵀ1ₘ = 1  →  R_w = wᵀR
RÉSUMÉ       μ_w = wᵀμ        σ²_w = wᵀΣw
PROBLÈME     min ½ wᵀΣw   s.c.  wᵀμ = μ₀,  wᵀ1ₘ = 1
RÉPONSE      frontière efficiente = parabole dans le plan (μ₀, σ²₀)
+ ACTIF SANS RISQUE  →  la frontière devient une DROITE (la CML)
                     →  tous les investisseurs détiennent le MÊME
                        portefeuille risqué : le portefeuille de marché
```

Le chapitre pose ensuite les trois questions critiques : **pourquoi** la moyenne-variance serait-elle rationnelle (utilité VNM) ? **quelles contraintes** ajouter en pratique ? et **la variance est-elle une bonne mesure du risque** (VaR, CVaR, cohérence) ?

## 🟡 Concept 1 — Le cadre moyenne-variance

**Analyse mono-période.** $m$ actifs risqués, $i=1,\dots,m$, dont les rendements sur la période forment un **vecteur aléatoire à $m$ dimensions**

$$R=[R_1,R_2,\dots,R_m]^T$$

de moyenne et de covariance

$$E[R]=\mu=\begin{pmatrix}\mu_1\\ \vdots\\ \mu_m\end{pmatrix}, \qquad \mathrm{Cov}[R]=\Sigma=\begin{pmatrix}\sigma_{1,1}&\cdots&\sigma_{1,m}\\ \vdots&\ddots&\vdots\\ \sigma_{m,1}&\cdots&\sigma_{m,m}\end{pmatrix}$$

**Portefeuille.** Un $m$-vecteur de **poids** indiquant la fraction de la richesse détenue dans chaque actif :

$$w=(w_1,\dots,w_m)^T \quad\text{avec}\quad \sum_{i=1}^mw_i=1 \quad\text{soit}\quad w^T\mathbf{1}_m=1$$

**Rendement du portefeuille.** $R_w=w^TR$ est une variable aléatoire de

$$\mu_w=E[R_w]=w^T\mu, \qquad \sigma_w^2=\mathrm{var}[R_w]=w^T\Sigma w$$

> **Le principe d'évaluation.** *On évalue les différents portefeuilles $w$ par le couple moyenne-variance $(\mu_w,\sigma_w^2)$, avec une préférence pour un rendement espéré $\mu_w$ **plus élevé** et une variance $\sigma^2_w$ **plus faible**.*

⚠️ **Tout le pouvoir et toute la fragilité de la théorie sont dans cette réduction à deux nombres.** Deux portefeuilles de même $(\mu,\sigma^2)$ sont déclarés **équivalents**, même si l'un a des pertes extrêmes bien pires. Le concept 9 revient sur ce point.

## 🔴 Concept 2 — Problème I : minimisation du risque

<div class="callout" data-kind="formel">

<span class="callout__lab">Problème I — minimisation du risque.</span>

Pour un rendement moyen cible $\mu_0$ donné, choisir le portefeuille $w$ qui

$$\text{Minimise : } \tfrac12\,w^T\Sigma w \qquad \text{s.c. } w^T\mu=\mu_0,\quad w^T\mathbf{1}_m=1$$

</div>

C'est un **problème d'optimisation convexe (minimisation) sous contraintes linéaires** — donc un programme quadratique — et on lui applique la **méthode des multiplicateurs de Lagrange**.

**Étape 1 — le lagrangien.**

$$L(w,\lambda_1,\lambda_2)=\tfrac12\,w^T\Sigma w+\lambda_1(\mu_0-w^T\mu)+\lambda_2(1-w^T\mathbf{1}_m)$$

**Étape 2 — les conditions du premier ordre.**

$$\frac{\partial L}{\partial w}=0_m=\Sigma w-\lambda_1\mu-\lambda_2\mathbf{1}_m, \qquad \frac{\partial L}{\partial\lambda_1}=0=\mu_0-w^T\mu, \qquad \frac{\partial L}{\partial\lambda_2}=0=1-w^T\mathbf{1}_m$$

**Étape 3 — résoudre $w$ en fonction de $\lambda_1,\lambda_2$.** La première équation donne directement

$$\boxed{\ w_0=\lambda_1\Sigma^{-1}\mu+\lambda_2\Sigma^{-1}\mathbf{1}_m\ }$$

> **La forme de la solution est déjà toute l'histoire.** Quel que soit le rendement cible $\mu_0$, le portefeuille optimal est une **combinaison linéaire de deux portefeuilles fixes** : $\Sigma^{-1}\mu$ et $\Sigma^{-1}\mathbf{1}_m$. Seuls les coefficients changent. C'est le **théorème des deux fonds**, et c'est le germe de la séparation de Tobin du concept 5.

**Étape 4 — résoudre $\lambda_1,\lambda_2$ par substitution.** En réinjectant $w_0$ dans les deux contraintes :

$$\mu_0=w_0^T\mu=\lambda_1(\mu^T\Sigma^{-1}\mu)+\lambda_2(\mu^T\Sigma^{-1}\mathbf{1}_m)$$

$$1=w_0^T\mathbf{1}_m=\lambda_1(\mu^T\Sigma^{-1}\mathbf{1}_m)+\lambda_2(\mathbf{1}_m^T\Sigma^{-1}\mathbf{1}_m)$$

soit, en posant les **trois scalaires fondamentaux**

$$a=\mu^T\Sigma^{-1}\mu, \qquad b=\mu^T\Sigma^{-1}\mathbf{1}_m, \qquad c=\mathbf{1}_m^T\Sigma^{-1}\mathbf{1}_m$$

le système $2\times2$

$$\begin{pmatrix}\mu_0\\1\end{pmatrix}=\begin{pmatrix}a&b\\b&c\end{pmatrix}\begin{pmatrix}\lambda_1\\\lambda_2\end{pmatrix}$$

**Étape 5 — la variance du portefeuille optimal.**

$$\begin{aligned}\sigma_0^2=w_0^T\Sigma w_0&=\lambda_1^2(\mu^T\Sigma^{-1}\mu)+2\lambda_1\lambda_2(\mu^T\Sigma^{-1}\mathbf{1}_m)+\lambda_2^2(\mathbf{1}_m^T\Sigma^{-1}\mathbf{1}_m)\\ &=\begin{pmatrix}\lambda_1&\lambda_2\end{pmatrix}\begin{pmatrix}a&b\\b&c\end{pmatrix}\begin{pmatrix}\lambda_1\\\lambda_2\end{pmatrix}\end{aligned}$$

En substituant $\binom{\lambda_1}{\lambda_2}=\binom{a\ b}{b\ c}^{-1}\binom{\mu_0}{1}$ :

$$\sigma_0^2=\begin{pmatrix}\mu_0&1\end{pmatrix}\begin{pmatrix}a&b\\b&c\end{pmatrix}^{-1}\begin{pmatrix}\mu_0\\1\end{pmatrix}=\boxed{\ \frac{c\mu_0^2-2b\mu_0+a}{ac-b^2}\ }$$

> **Le résultat central.** *Le portefeuille optimal a une variance $\sigma_0^2$ **parabolique** dans le rendement moyen $\mu_0$.* Dans le plan $(\mu_0,\sigma_0^2)$ la frontière est une **parabole** ; dans le plan $(\sigma_0,\mu_0)$ — écart-type contre rendement, la représentation usuelle des professionnels — c'est une **hyperbole**, dont la branche supérieure est la **frontière efficiente**.

⚠️ **Interprétation du minimum.** Le sommet de la parabole, obtenu en annulant $2c\mu_0-2b$, est atteint en $\mu_0=b/c$ : c'est le **portefeuille de variance minimale globale**, de poids $w=\Sigma^{-1}\mathbf{1}_m/c$. En dessous de ce rendement, la frontière est **inefficiente** : on peut avoir plus de rendement pour la même variance.

## 🟠 Concept 3 — Trois problèmes, une seule frontière

Le cours pose deux formulations alternatives du même arbitrage.

<div class="callout" data-kind="formel">

<span class="callout__lab">Problème II — maximisation du rendement espéré.</span>

Pour une variance cible $\sigma_0^2$ donnée :

$$\text{Maximise : } E(R_w)=w^T\mu \qquad \text{s.c. } w^T\Sigma w=\sigma_0^2, \quad w^T\mathbf{1}_m=1$$

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Problème III — optimisation par aversion au risque.</span>

Soit $\lambda\geq0$ l'**indice d'aversion au risque d'Arrow-Pratt**, mesurant l'arbitrage entre risque et rendement :

$$\text{Maximise : } E(R_w)-\tfrac{\lambda}{2}\mathrm{var}(R_w)=w^T\mu-\tfrac{\lambda}{2}w^T\Sigma w \qquad \text{s.c. } w^T\mathbf{1}_m=1$$

</div>

> **Ce qu'il faut retenir.** *Les problèmes I, II et III se résolvent par des **lagrangiens équivalents**.* Ils décrivent donc **la même** frontière efficiente
>
> $$\text{Frontière efficiente}=\big\{(\mu_0,\sigma_0^2)=(E(R_{w_0}),\mathrm{var}(R_{w_0}))\ \big|\ w_0 \text{ optimal}\big\}$$
>
> et l'on parcourt cette frontière en faisant varier $\mu_0$ (problème I), $\sigma_0^2$ (problème II), **ou** $\lambda$ (problème III).

> **Le lien avec la fiche 38.** Le paramètre $\lambda$ du problème III est **exactement** un multiplicateur de Lagrange des problèmes I et II. Faire varier la contrainte ou faire varier son prix dual, c'est le même balayage vu de deux côtés. C'est la lecture « pénalisée » de l'optimisation sous contrainte, et c'est aussi celle de la régularisation en statistique.

## 🔴 Concept 4 — L'actif sans risque

**Hypothèse.** En plus des $m$ actifs risqués, il existe un **actif sans risque** ($i=0$) tel que

$$R_0\equiv r_0, \quad\text{c.-à-d.}\quad E(R_0)=r_0 \ \text{ et } \ \mathrm{var}(R_0)=0$$

**Le portefeuille.** L'investisseur place $w^T\mathbf{1}_m=\sum_{i=1}^mw_i$ dans les actifs risqués et $1-w^T\mathbf{1}_m$ dans l'actif sans risque. *Si l'emprunt est autorisé, $(1-w^T\mathbf{1}_m)$ peut être **négatif***.

$$R_w=w^TR+(1-w^T\mathbf{1}_m)R_0$$

$$\mu_w=w^T\mu+(1-w^T\mathbf{1}_m)r_0, \qquad \sigma_w^2=w^T\Sigma w$$

> **Le point technique décisif.** $R_0$ est de **variance nulle** et **non corrélé** avec $R$ : il ne contribue donc **pas du tout** à la variance du portefeuille. La contrainte $w^T\mathbf{1}_m=1$ **disparaît** — il ne reste qu'**une seule** contrainte. C'est ce qui simplifie tout.

<div class="callout" data-kind="formel">

<span class="callout__lab">Problème I' — minimisation du risque avec actif sans risque.</span>

$$\text{Minimise : } \tfrac12w^T\Sigma w \qquad \text{s.c. } w^T\mu+(1-w^T\mathbf{1}_m)r_0=\mu_0$$

</div>

**Résolution.** Le lagrangien s'écrit, en réarrangeant la contrainte,

$$L(w,\lambda_1)=\tfrac12w^T\Sigma w+\lambda_1\big[(\mu_0-r_0)-w^T(\mu-\mathbf{1}_mr_0)\big]$$

Les conditions du premier ordre :

$$\frac{\partial L}{\partial w}=0_m=\Sigma w-\lambda_1[\mu-\mathbf{1}_mr_0], \qquad \frac{\partial L}{\partial\lambda_1}=0=(\mu_0-r_0)-w^T(\mu-\mathbf{1}_mr_0)$$

d'où

$$\boxed{\ w_0=\lambda_1\Sigma^{-1}[\mu-\mathbf{1}_mr_0], \qquad \lambda_1=\frac{\mu_0-r_0}{(\mu-\mathbf{1}_mr_0)^T\Sigma^{-1}(\mu-\mathbf{1}_mr_0)}\ }$$

et l'on place le poids résiduel $(1-w_0^T\mathbf{1}_m)$ dans l'actif sans risque.

**La variance du portefeuille optimal $P$.**

$$\mathrm{Var}(R_P)=\mathrm{Var}\big(w_0^TR+(1-w_0^T\mathbf{1}_m)r_0\big)=\mathrm{Var}(w_0^TR)=w_0^T\Sigma w_0=\frac{(\mu_0-r_0)^2}{(\mu-\mathbf{1}_mr_0)^T\Sigma^{-1}(\mu-\mathbf{1}_mr_0)}$$

> **Regardez cette formule.** $\sigma_P^2$ est **proportionnelle au carré** de l'excès de rendement visé $(\mu_0-r_0)$. Donc $\sigma_P$ est **linéaire** en $(\mu_0-r_0)$ : avec un actif sans risque, la frontière efficiente n'est plus une hyperbole mais une **droite** dans le plan $(\sigma,\mu)$. C'est la CML du concept 6.

**Le vecteur $\mu-\mathbf{1}_mr_0$ porte un nom** : ce sont les **excès de rendement espérés** (rendements en excès du taux sans risque). Toute la théorie ne dépend des rendements que par ce vecteur — ce qui compte n'est jamais le rendement brut mais **la prime par rapport au sans-risque**.

## 🔴 Concept 5 — Le portefeuille de marché et la séparation de Tobin

**Définition.** Le **portefeuille de marché** $M$ est le portefeuille optimal **entièrement investi** en actifs risqués :

$$w_M^T\mathbf{1}_m=1$$

Or $w_M=\lambda_1\Sigma^{-1}[\mu-\mathbf{1}_mr_0]$ : la condition d'investissement total détermine $\lambda_1$,

$$\lambda_1(M)=\Big(\mathbf{1}_m^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0]\Big)^{-1}$$

**Ses deux moments.** Avec $R_M=w_M^TR+0\cdot R_0$ :

$$E(R_M)=w_M^T\mu=\frac{\mu^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0]}{\mathbf{1}_m^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0]}=r_0+\frac{[\mu-\mathbf{1}_mr_0]^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0]}{\mathbf{1}_m^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0]}$$

$$\mathrm{Var}(R_M)=w_M^T\Sigma w_M=\frac{[\mu-\mathbf{1}_mr_0]^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0]}{\big(\mathbf{1}_m^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0]\big)^2}=\frac{(E(R_M)-r_0)^2}{[\mu-\mathbf{1}_mr_0]^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0]}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème de séparation de Tobin.</span>

*Tout portefeuille optimal investit dans une **combinaison de l'actif sans risque et du portefeuille de marché**.*

</div>

**Démonstration.** Soit $P$ le portefeuille optimal de rendement cible $\mu_0$, de poids risqués $w_P=\lambda_1(P)\Sigma^{-1}[\mu-\mathbf{1}_mr_0]$. *$P$ investit dans les **mêmes actifs risqués** que le portefeuille de marché et dans les **mêmes proportions** !* La seule différence est le **poids total** $w_M^{\text{tot}}=w_P^T\mathbf{1}_m$ :

$$w_M^{\text{tot}}=\frac{\lambda_1(P)}{\lambda_1(M)}=\frac{(\mu_0-r_0)\big/\big[(\mu-\mathbf{1}_mr_0)^T\Sigma^{-1}(\mu-\mathbf{1}_mr_0)\big]}{\big(\mathbf{1}_m^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0]\big)^{-1}}=\frac{\mu_0-r_0}{E(R_M)-r_0}$$

d'où

$$R_P=(1-w_M^{\text{tot}})r_0+w_M^{\text{tot}}R_M$$

$$\sigma_P^2=\mathrm{var}(R_P)=\mathrm{var}(w_M^{\text{tot}}R_M)=(w_M^{\text{tot}})^2\sigma_M^2, \qquad E(R_P)=r_0+w_M^{\text{tot}}\big(E(R_M)-r_0\big)$$

$\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi c'est un des résultats les plus importants de la finance.</span>

Le choix du portefeuille se **sépare en deux décisions indépendantes** : (1) **quels actifs risqués détenir**, et dans quelles proportions — la réponse est la **même pour tout le monde**, c'est $M$, et elle ne dépend pas des préférences ; (2) **combien** placer dans le risqué plutôt que dans le sans-risque — c'est là, et là seulement, qu'intervient l'aversion au risque de chacun.

**Conséquence industrielle directe :** c'est la justification théorique de la gestion **indicielle**. Si tout le monde détient le même portefeuille risqué, ce portefeuille *est* le marché, et il suffit d'acheter l'indice.

</div>

## 🟠 Concept 6 — Droite de marché des capitaux et prix du risque

**Définition.** La **Capital Market Line (CML)** est la frontière efficiente des portefeuilles optimaux, représentée dans le plan $(\sigma_P,\mu_P)$ — écart-type contre rendement espéré :

$$\text{CML}=\big\{(\sigma_P,\mu_P)=\big(\sigma_P,\ r_0+w_M^{\text{tot}}(\mu_M-r_0)\big),\ w_M^{\text{tot}}\geq0\big\}$$

**Prime de risque et prix du risque.** En partant de $E(R_P)=r_0+w_M^{\text{tot}}[E(R_M)-r_0]$ et de $\sigma_P=w_M^{\text{tot}}\sigma_M$ :

$$E(R_P)=r_0+\frac{\sigma_P}{\sigma_M}\big[E(R_M)-r_0\big]=\boxed{\ r_0+\sigma_P\cdot\frac{E(R_M)-r_0}{\sigma_M}\ }$$

> **La quantité $\dfrac{E(R_M)-r_0}{\sigma_M}$ est le « prix de marché du risque » (*Market Price of Risk*).** *Le rendement espéré du portefeuille $P$ croît **linéairement** avec son risque $\sigma_P$.*

⚠️ **C'est le ratio de Sharpe du portefeuille de marché.** Il donne le **taux de change** entre risque et rendement : une unité d'écart-type supplémentaire « s'achète » exactement ce nombre de points de rendement espéré. Aucun portefeuille ne peut faire mieux — la CML est une **borne supérieure** pour tous les portefeuilles réalisables.

**Les articles fondateurs cités par le cours** : Markowitz (1952) « Portfolio Selection », *Journal of Finance* · Tobin (1958) « Liquidity Preference as a Behavior Towards Risk », *Review of Economic Studies* · Sharpe (1964) « Capital Asset Prices », *Journal of Finance* · Lintner (1965), *Review of Economics and Statistics* · Fama (1970) « Efficient Capital Markets », *Journal of Finance*.

## 🟠 Concept 7 — L'utilité de von Neumann-Morgenstern

Jusqu'ici la moyenne-variance a été **postulée**. Ce concept demande : est-elle **rationnelle** ?

> *Le choix rationnel de portefeuille doit appliquer des préférences fondées sur l'**utilité espérée**, et le portefeuille optimal résout le **problème de maximisation de l'utilité espérée**.*

**Le cadre.** Un investisseur de richesse initiale $W_0$ ; l'**action** est le choix du portefeuille $P$ (vecteur de poids $w_P$) ; le **résultat** est la richesse après une période

$$W=W_0[1+R_P]$$

La **fonction d'utilité** $u(W):[0,\infty)\to\mathbb{R}$ est une *mesure quantitative de la valeur du résultat pour l'investisseur*, et l'on maximise

$$E[u(W)]=E\big[u(W_0[1+R_P])\big]$$

**Propriétés de base.**

| Propriété | Signification |
|---|---|
| $u'(W)>0$ | **croissante** — toujours : plus de richesse vaut mieux que moins |
| $u''(W)<0$ | **utilité marginale décroissante** — typiquement : le millionième euro apporte moins que le premier |

**Les deux mesures d'aversion au risque.**

$$\text{Aversion absolue : } A(W)=-\frac{u''(W)}{u'(W)}, \qquad \text{Aversion relative : } R(W)=-\frac{W\,u''(W)}{u'(W)}$$

### Le pont vers la moyenne-variance

Si $u$ est régulière (dérivées bornées à l'ordre voulu), le développement de Taylor autour de $\bar w$ donne

$$u(W)\approx u(\bar w)+u'(\bar w)(W-\bar w)+\tfrac12u''(\bar w)(W-\bar w)^2+\cdots$$

$$=(\text{constantes})+u'(\bar w)\Big[W-\tfrac12A(\bar w)(W-\bar w)^2\Big]+\cdots$$

En prenant l'espérance et en posant $\bar w=E[W]$ :

$$E[u(W)]\ \approx\ E\Big[W-\tfrac{\lambda}{2}(W-\bar w)^2\Big]\ =\ E[W]-\frac{\lambda}{2}\mathrm{Var}[W], \qquad \lambda=A(\bar w)$$

> **Voilà la justification.** *Maximiser l'utilité espérée revient, au second ordre, à maximiser $E[W]-\frac{\lambda}{2}\mathrm{Var}[W]$* — **exactement le problème III** du concept 3, avec $\lambda=A(\bar w)$ l'indice d'aversion au risque d'Arrow-Pratt. La moyenne-variance n'est donc pas un caprice : c'est l'**approximation du second ordre** de la théorie de l'utilité.

⚠️ **Mais c'est une approximation.** Elle néglige les termes en $(W-\bar w)^3$ et au-delà — **asymétrie et kurtosis**. Le concept 10 montre exactement ce qu'on perd.

**Le catalogue des fonctions d'utilité.**

| Utilité | Forme | Propriété |
|---|---|---|
| **Linéaire** | $u(W)=a+bW,\ b>0$ | neutre au risque ($u''=0$) |
| **Quadratique** | $u(W)=W-\tfrac{\lambda}{2}W^2,\ \lambda>0$, $W<\lambda^{-1}$ | reproduit **exactement** la moyenne-variance |
| **Exponentielle** | $u(W)=1-e^{-\lambda W},\ \lambda>0$ | **CARA** — aversion absolue constante |
| **Puissance** | $u(W)=W^{(1-\gamma)},\ 0<\gamma<1$ | **CRRA** — aversion relative constante |
| **Logarithmique** | $u(W)=\ln(W)$ | CRRA avec $\gamma=1$ |

> **La quadratique est le seul cas où la moyenne-variance est exacte** — puisque le développement de Taylor s'arrête au second ordre. C'est aussi son défaut : $u'(W)=1-\lambda W$ devient **négatif** pour $W>1/\lambda$, d'où la restriction du domaine ; au-delà, l'investisseur préférerait être moins riche.

## 🟡 Concept 8 — Les contraintes d'optimisation en pratique

Le problème de Markowitz nu ne s'utilise jamais tel quel. Le cours liste les contraintes standard.

**Contraintes simples sur les positions.**

| Contrainte | Formulation |
|---|---|
| **Long seulement** | $w_j\geq0,\ \forall j$ |
| **Bornes de détention** | $L_i\leq w_i\leq U_i$, avec $L,U$ bornes inférieures et supérieures des $m$ positions |
| **Rotation (turnover)** | $\lvert\Delta w_j\rvert\leq U_i$ par actif, et $\sum_{i=1}^m\lvert\Delta w_j\rvert\leq U$ pour le portefeuille |

**Contraintes d'exposition à un indice de référence.** Soit $w_B$ les poids d'un portefeuille **benchmark** (S&P 500, NASDAQ 100, Russell 1000/2000) de rendement $R_B=w_B^TR$ :

$$\lvert w-w_B\rvert=\sum_{i=1}^m\big\lvert[w-w_B]_i\big\rvert<U_B$$

**Contrainte d'erreur de suivi (*tracking error*).** On calcule la variance de l'erreur de suivi

$$TE_P=(R_P-R_B)=[w-w_B]^TR$$

$$\mathrm{var}(TE_P)=\mathrm{var}\big([w-w_B]^TR\big)=[w-w_B]^T\mathrm{Cov}(R)[w-w_B]=[w-w_B]^T\Sigma[w-w_B]$$

et l'on impose

$$[w-w_B]^T\Sigma[w-w_B]\ \leq\ \sigma_{TE}^2$$

> **C'est la contrainte reine de la gestion institutionnelle.** Un gérant n'est presque jamais jugé sur son rendement absolu mais sur son **écart au benchmark**. Noter que c'est une **contrainte quadratique convexe** : le problème reste un QCQP convexe (fiche 37).

**Contraintes sur les facteurs de risque.** Pour un modèle à facteurs

$$R_{i,t}=\alpha_i+\sum_{k=1}^K\beta_{i,k}f_{k,t}+\varepsilon_{i,t}$$

on limite l'exposition au facteur $k$ par $\big\lvert\sum_{i=1}^m\beta_{i,k}w_i\big\rvert<U_k$, ou l'on **neutralise** toutes les expositions :

$$\Big\lvert\sum_{i=1}^m\beta_{i,k}w_i\Big\rvert=0, \qquad k=1,\dots,K$$

**Autres contraintes** : taille minimale de transaction, taille minimale de position, **contraintes d'intégrité** (nombre entier de titres).

⚠️ **Ces trois dernières changent la nature du problème.** Taille minimale et contraintes entières rendent le domaine **non convexe** : on quitte le QP et l'on entre dans la **programmation en nombres entiers mixte** (fiche 33), avec un branch-and-bound et un coût de résolution sans commune mesure.

**La forme générale.** Avec $w$ le portefeuille cible, $x=w-w_0$ les transactions depuis le portefeuille courant $w_0$, et $w_B$ le benchmark :

$$\textbf{Contraintes linéaires : } A_ww\leq u_w, \qquad A_xx\leq u_x, \qquad A_B(w-w_B)\leq u_B$$

$$\textbf{Contraintes quadratiques : } w^TQ_ww\leq q_w, \qquad x^TQ_xx\leq q_x, \qquad (w-w_B)^TQ_B(w-w_B)\leq q_B$$

## 🟡 Concept 9 — Estimer $\mu$ et $\Sigma$

**La méthode par défaut : moyennes et covariances empiriques.** Elle se justifie par trois arguments — ce sont des estimateurs des **moindres carrés**, ils sont **sans biais**, et ce sont les estimateurs du **maximum de vraisemblance** sous certaines hypothèses gaussiennes (voir la fiche 50).

**Les deux problèmes.**

1. **Le choix de la période d'estimation.**
2. **L'impact de l'erreur d'estimation (!!)** — le double point d'exclamation est celui du cours.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ce point est critique.</span>

L'optimiseur de Markowitz prend $\hat\mu$ et $\hat\Sigma$ pour la vérité. Or il **maximise sur les erreurs** : les actifs dont le rendement a été surestimé par hasard reçoivent des poids énormes. On parle d'*« estimation error maximizer »*. Et $\Sigma^{-1}$ empire tout : avec $m$ grand devant le nombre d'observations, $\hat\Sigma$ est mal conditionnée, voire singulière — son inverse amplifie le bruit.

</div>

**Les alternatives listées par le cours.**

- Appliquer des **moyennes mobiles exponentielles** (pondérer davantage le passé récent).
- Appliquer des **modèles à facteurs dynamiques**.
- Conduire l'optimisation avec des **modèles simples alternatifs** : le **modèle à indice unique** de Sharpe, ou le **modèle à corrélation constante**.

> **La logique commune de ces alternatives : réduire le nombre de paramètres.** Estimer $\Sigma$ librement demande $m(m+1)/2$ paramètres — pour $m=500$, plus de $125\,000$. Un modèle à un facteur en demande de l'ordre de $2m$. Moins de paramètres, plus de biais, mais **beaucoup** moins de variance : c'est l'arbitrage biais-variance appliqué à la matrice de covariance.

## 🔴 Concept 10 — Mesures de risque alternatives

Pour un portefeuille $P$ de poids $w_P$, avec $R_P=w_P^TR$ et $R\sim(\mu,\Sigma)$, on considère des problèmes d'optimisation **remplaçant la variance** par d'autres mesures.

**Écart absolu moyen (MAD).**

$$MAD(R_P)=E\big(\lvert w^T(R_P-\mu)\rvert\big)=E\Big(\Big\lvert\sum_{i=1}^mw_i(R_i-\mu_i)\Big\rvert\Big)$$

*Résolution par **programmation linéaire** avec contraintes linéaires ou quadratiques.*

**Semi-variance.**

$$SemiVar(R_P)=E\Big[\min\big(R_P-E[R_P],\,0\big)^2\Big]$$

*Variance **du côté des pertes** (pondérée par les probabilités).*

> **L'idée derrière la semi-variance.** La variance pénalise identiquement les écarts **au-dessus** et **au-dessous** de la moyenne. Or un investisseur ne se plaint pas des bonnes surprises. La semi-variance ne compte que la partie négative.

**Value-at-Risk (VaR).** *Méthodologie RiskMetrics développée par JP Morgan. La VaR est l'ampleur de la perte au centile qui n'arrive que rarement, c'est-à-dire avec probabilité $\alpha$ ($=0{,}05$, $0{,}01$ ou $0{,}001$) :*

$$VaR_{1-\alpha}(R_P)=\min\{r:\ \Pr(R_P\leq-r)\leq\alpha\}$$

Usage : **suivi et reporting** des expositions au risque des portefeuilles de trading.

⚠️ **Le défaut fondamental de la VaR.** *Elle n'est ni convexe ni sous-additive :*

$$VaR(R_{P_1}+R_{P_2})\ \leq\ VaR(R_{P_1})+VaR(R_{P_2}) \qquad \textbf{peut être faux}$$

⚠️ *Autrement dit, **la VaR ne s'améliore pas avec la diversification**.* Une mesure de risque qui peut punir la diversification est une mesure de risque cassée — et le fait qu'elle ne soit pas convexe la rend en plus pénible à optimiser.

**Conditional Value-at-Risk (CVaR).** Aussi appelée *expected shortfall*, *expected tail loss*, ou *tail VaR* :

$$CVaR_{1-\alpha}(R_P)=E\big[-R_P\ \big\vert\ -R_P\geq VaR_{1-\alpha}(R_P)\big]$$

*Voir Rockafellar et Uryasev (2000) pour l'optimisation de la CVaR.*

> **La différence en une phrase.** La VaR dit « **à partir de quel seuil** la perte devient rare » ; la CVaR dit « **combien on perd en moyenne quand on dépasse ce seuil** ». La VaR ignore complètement la forme de la queue au-delà du seuil — deux portefeuilles de même VaR peuvent avoir des pertes extrêmes totalement différentes.

### Les mesures de risque cohérentes

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Une mesure de risque $s(\cdot)$ sur les distributions de rendement de portefeuille est **cohérente** si elle a les quatre propriétés suivantes :

| Axiome | Énoncé | Sens |
|---|---|---|
| **Monotonie** | si $R_P\geq R_{P'}$ presque sûrement, alors $s(R_P)\leq s(R_{P'})$ | un portefeuille toujours meilleur est moins risqué |
| **Sous-additivité** | $s(R_P+R_{P'})\leq s(R_P)+s(R_{P'})$ | **la diversification ne peut pas nuire** |
| **Homogénéité positive** | $s(cR_P)=c\,s(R_P)$ pour tout réel $c>0$ | doubler la position double le risque |
| **Invariance par translation** | $s(R_P+a)=s(R_P)-a$ pour tout réel $a$ | ajouter du cash réduit le risque d'autant |

</div>

> **Le verdict du cours.**
>
> - $\mathrm{Var}(R_P)$ **n'est pas cohérente** — elle n'est pas monotone.
> - La **VaR n'est pas cohérente** — elle n'est pas sous-additive.
> - La **CVaR est cohérente**.

⚠️ **C'est l'argument technique qui a fait basculer la régulation bancaire** de la VaR vers l'expected shortfall. Et pour l'optimisation, la sous-additivité + l'homogénéité positive donnent la **convexité** : minimiser la CVaR est un problème convexe, minimiser la VaR ne l'est pas.

### Risque, asymétrie et kurtosis

En poussant le développement de Taylor de $u(W)$ deux ordres plus loin, avec $\bar w=E(W)$ et $W=W_0(1+R_P)$ :

$$u(W)=u(\bar w)+u'(\bar w)(W-\bar w)+\tfrac12u''(\bar w)(W-\bar w)^2+\tfrac{1}{3!}u^{(3)}(\bar w)(W-\bar w)^3+\tfrac{1}{4!}u^{(4)}(\bar w)(W-\bar w)^4+O[(W-\bar w)^5]$$

En prenant l'espérance :

$$E[u(W)]=u(\bar w)+0+\tfrac12u''(\bar w)\mathrm{var}(W)+\tfrac{1}{3!}u^{(3)}(\bar w)\,\mathrm{Skew}(W)+\tfrac{1}{4!}u^{(4)}(\bar w)\,\mathrm{Kurtosis}(W)+O[(W-\bar w)^5]$$

> **Optimisation de portefeuille avec moments supérieurs.**
>
> $$\text{Max : } E(R_P)-\lambda_1\mathrm{Var}(R_P)+\lambda_2\mathrm{Skew}(R_P)-\lambda_3\mathrm{Kurtosis}(R_P) \qquad \text{s.c. } w^T\mathbf{1}_m=1$$

**Les remarques du cours.**

- Une **asymétrie positive plus élevée est préférée** (beaucoup de petites pertes, quelques gros gains).
- Des **moments pairs plus faibles** peuvent être préférés (moins de dispersion).
- L'**estimation de l'asymétrie et de la kurtosis est complexe** : sensibilité aux valeurs aberrantes, et nécessité de **grands échantillons**.
- Approches d'optimisation : méthodes **multi-objectifs**, **programmation polynomiale par objectifs (PGP)**.

⚠️ **Le signe des $\lambda$ n'est pas arbitraire** : il vient des signes des dérivées de $u$. $u''<0$ donne le $-\lambda_1$ devant la variance ; $u^{(3)}>0$ (prudence) donne le $+\lambda_2$ devant l'asymétrie ; $u^{(4)}<0$ donne le $-\lambda_3$ devant la kurtosis. La forme du critère **dérive** de la théorie de l'utilité.

## Comment résoudre l'exercice type (protocole)

1. **Poser les données** : $\mu$, $\Sigma$, $r_0$, la cible ($\mu_0$, $\sigma_0^2$, ou $\lambda$).
2. **Écrire le lagrangien** avec un multiplicateur par contrainte.
3. **Dériver par rapport à $w$** et résoudre $\Sigma w=\ldots$, soit $w=\Sigma^{-1}(\ldots)$.
4. **Substituer dans les contraintes** pour obtenir un petit système en les multiplicateurs ($2\times2$ sans actif sans risque, $1\times1$ avec).
5. **Calculer** $a=\mu^T\Sigma^{-1}\mu$, $b=\mu^T\Sigma^{-1}\mathbf{1}_m$, $c=\mathbf{1}_m^T\Sigma^{-1}\mathbf{1}_m$ si le problème est sans actif sans risque.
6. **Conclure** : $\sigma_0^2=(c\mu_0^2-2b\mu_0+a)/(ac-b^2)$, ou la formule linéaire de la CML avec actif sans risque.
7. **Vérifier le signe** des poids et la cohérence économique (poids extrêmes ⟹ erreur d'estimation).

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « rendement cible » + « minimiser le risque » | Problème I, lagrangien à **deux** multiplicateurs |
| « il existe un actif sans risque » ou « taux $r_0$ » | Problème I', **une seule** contrainte, la frontière devient une **droite** |
| « quelle proportion investir dans l'indice ? » | Séparation de Tobin : $w_M^{\text{tot}}=(\mu_0-r_0)/(E(R_M)-r_0)$ |
| « aversion au risque $\lambda$ » | Problème III, maximiser $w^T\mu-\frac{\lambda}{2}w^T\Sigma w$ |
| « erreur de suivi » ou « benchmark » | Contrainte **quadratique** sur $[w-w_B]^T\Sigma[w-w_B]$ |
| « perte à 99 % » ou « perte extrême » | VaR / CVaR — et penser à la **cohérence** |
| « la diversification n'aide pas » | C'est le contre-exemple de **sous-additivité** de la VaR |

### Exercices progressifs

**Niveau 1** — Pourquoi la frontière efficiente devient-elle une droite dès qu'un actif sans risque est disponible ?

<details><summary>Correction</summary>

Parce que la variance du portefeuille optimal est

$$\sigma_P^2=\frac{(\mu_0-r_0)^2}{(\mu-\mathbf{1}_mr_0)^T\Sigma^{-1}(\mu-\mathbf{1}_mr_0)}$$

donc $\sigma_P$ est **proportionnel à $\lvert\mu_0-r_0\rvert$**. Dans le plan $(\sigma_P,\mu_P)$, la relation est donc **affine** :

$$\mu_0=r_0+\sigma_P\sqrt{(\mu-\mathbf{1}_mr_0)^T\Sigma^{-1}(\mu-\mathbf{1}_mr_0)}$$

**La raison structurelle.** L'actif sans risque a une variance nulle **et** une corrélation nulle avec tout le reste. Mélanger $R_0$ et un portefeuille risqué fixe dans les proportions $(1-t,t)$ donne $\mu=r_0+t(\mu_M-r_0)$ et $\sigma=t\sigma_M$ : les deux coordonnées sont **linéaires en $t$**, donc le mélange trace un **segment de droite**. Cette droite part de $(0,r_0)$ et touche l'hyperbole des actifs risqués en un seul point — le portefeuille de marché.

</details>

**Niveau 2** — Un portefeuille vise $\mu_0=9\,\%$. On a $r_0=2\,\%$ et $E(R_M)=7\,\%$. Quelle fraction investir dans le portefeuille de marché ?

<details><summary>Correction</summary>

Par la séparation de Tobin :

$$w_M^{\text{tot}}=\frac{\mu_0-r_0}{E(R_M)-r_0}=\frac{0{,}09-0{,}02}{0{,}07-0{,}02}=\frac{0{,}07}{0{,}05}=1{,}4$$

On investit **140 %** de la richesse dans le portefeuille de marché, et $1-1{,}4=-0{,}4$ dans l'actif sans risque : on **emprunte 40 %** de sa richesse au taux $r_0$ pour l'investir dans le marché. C'est un portefeuille à **effet de levier**.

Le risque suit : $\sigma_P=1{,}4\,\sigma_M$. Viser un rendement supérieur à celui du marché coûte $40\,\%$ de risque supplémentaire, exactement.

⚠️ **Ce calcul suppose qu'on peut emprunter au taux sans risque** — hypothèse du modèle, rarement vraie en pratique. Si le taux d'emprunt dépasse $r_0$, la CML se **casse** en un coude au point $w_M^{\text{tot}}=1$.

</details>

**Niveau 3** — Montrez que le portefeuille de variance minimale globale ne dépend pas de $\mu$.

<details><summary>Correction</summary>

**Étape 1.** La variance sur la frontière vaut $\sigma_0^2(\mu_0)=(c\mu_0^2-2b\mu_0+a)/(ac-b^2)$. En annulant la dérivée :

$$\frac{d\sigma_0^2}{d\mu_0}=\frac{2c\mu_0-2b}{ac-b^2}=0 \qquad\Longrightarrow\qquad \mu_0^\star=\frac bc$$

**Étape 2.** On résout le système $\binom{\mu_0^\star}{1}=\binom{a\ b}{b\ c}\binom{\lambda_1}{\lambda_2}$ en $\mu_0^\star=b/c$. La seconde ligne donne $1=\lambda_1b+\lambda_2c$ et la première $b/c=\lambda_1a+\lambda_2b$. En éliminant : $\lambda_1(ac-b^2)=0$, donc $\lambda_1=0$ (puisque $ac-b^2>0$ par Cauchy-Schwarz appliqué au produit scalaire $\langle x,y\rangle=x^T\Sigma^{-1}y$), puis $\lambda_2=1/c$.

**Étape 3.** Donc

$$w^\star=0\cdot\Sigma^{-1}\mu+\frac1c\Sigma^{-1}\mathbf{1}_m=\frac{\Sigma^{-1}\mathbf{1}_m}{\mathbf{1}_m^T\Sigma^{-1}\mathbf{1}_m}$$

**$\mu$ n'apparaît nulle part.**

**Pourquoi c'est important en pratique.** Les rendements espérés sont **beaucoup** plus difficiles à estimer que les covariances — l'erreur d'estimation sur $\hat\mu$ est de l'ordre de grandeur de $\hat\mu$ lui-même sur des échantillons réalistes. Le portefeuille de variance minimale n'en a pas besoin, ce qui explique sa robustesse empirique remarquable et sa popularité industrielle.

</details>

**Niveau 4 — type examen** — Construisez un exemple montrant que la VaR n'est pas sous-additive, et expliquez pourquoi la CVaR échappe au problème.

<details><summary>Correction</summary>

**Le contre-exemple.** Deux obligations indépendantes, chacune valant $100$ si elle ne fait pas défaut et $0$ sinon, avec une probabilité de défaut de $4\,\%$. Prenons $\alpha=5\,\%$.

**Étape 1 — VaR de chaque obligation seule.** La perte vaut $100$ avec probabilité $0{,}04$ et $0$ avec probabilité $0{,}96$. Comme $\Pr(\text{perte}>0)=0{,}04\leq0{,}05$, le quantile à $95\,\%$ de la perte est $0$ :

$$VaR_{0{,}95}(P_1)=VaR_{0{,}95}(P_2)=0$$

**Étape 2 — VaR du portefeuille des deux.** Le nombre de défauts suit une binomiale $\mathcal{B}(2;0{,}04)$ :

$$\Pr(0\text{ défaut})=0{,}9216, \quad \Pr(1\text{ défaut})=0{,}0768, \quad \Pr(2\text{ défauts})=0{,}0016$$

La probabilité d'au moins un défaut vaut $0{,}0784>0{,}05$. Le quantile à $95\,\%$ de la perte est donc $100$ :

$$VaR_{0{,}95}(P_1+P_2)=100 \ >\ 0+0=VaR_{0{,}95}(P_1)+VaR_{0{,}95}(P_2)$$

**La sous-additivité est violée**, et de la pire manière : **diversifier a fait exploser** la mesure de risque, alors que le portefeuille diversifié est manifestement le moins risqué des trois.

**Étape 3 — pourquoi la CVaR échappe au problème.** La VaR est un **quantile** : elle ne regarde qu'**un point** de la distribution et est aveugle à tout ce qui se passe au-delà. Sur chaque obligation isolée, la perte de $100$ existe bien, mais elle est **juste au-delà** du seuil de $5\,\%$ : la VaR ne la voit pas.

La CVaR, elle, est une **moyenne de la queue** — elle intègre *tout* ce qui dépasse le seuil. Sur une obligation seule :

$$CVaR_{0{,}95}(P_1)=E[\text{perte}\mid\text{perte}\geq0]\ \text{ pondérée sur les }5\,\%\text{ pires}=\frac{0{,}04\times100}{0{,}05}=80$$

La perte extrême est **comptée**, et la sous-additivité est rétablie.

**La leçon générale.** Un quantile n'est pas une moyenne, et seules les moyennes se comportent bien vis-à-vis de l'addition. C'est aussi pour cela que $CVaR$ est **convexe** (c'est un supremum de fonctions linéaires, par la représentation de Rockafellar-Uryasev) alors que $VaR$ ne l'est pas — et donc que minimiser la CVaR est un problème convexe traitable, contrairement à la VaR.

</details>

## 🔴 Common mistakes

1. **Oublier la contrainte $w^T\mathbf{1}_m=1$** en présence d'un actif sans risque — elle **disparaît**, puisque le résidu $1-w^T\mathbf{1}_m$ est absorbé par $R_0$.
2. **Croire que le portefeuille de marché dépend des préférences** — il n'en dépend pas : c'est tout le contenu de la séparation de Tobin. Seul le **poids total** en dépend.
3. **Confondre les deux plans** : la frontière est une **parabole** dans $(\mu,\sigma^2)$ et une **hyperbole** dans $(\sigma,\mu)$. La CML est une droite dans $(\sigma,\mu)$, pas dans $(\sigma^2,\mu)$.
4. **Prendre toute la frontière pour efficiente** — la branche située sous le portefeuille de variance minimale ($\mu_0<b/c$) est **dominée**.
5. **Traiter $\hat\mu$ et $\hat\Sigma$ comme exacts** — l'optimiseur **maximise sur les erreurs d'estimation** et produit des poids extrêmes.
6. **Croire que la variance est une mesure de risque cohérente** — elle **n'est pas monotone**.
7. **Utiliser la VaR pour agréger des risques** — elle **n'est pas sous-additive** : la somme des VaR peut être inférieure à la VaR de la somme.
8. **Oublier le domaine de l'utilité quadratique** — $u'(W)=1-\lambda W$ devient négatif au-delà de $W=1/\lambda$.
9. **Ajouter des contraintes de taille minimale sans changer de solveur** — le problème devient **non convexe** et sort de la programmation quadratique.

## 📌 Ultimate Review

1. **Cadre** : $R\in\mathbb{R}^m$, $E[R]=\mu$, $\mathrm{Cov}[R]=\Sigma$ ; portefeuille $w$ avec $w^T\mathbf{1}_m=1$ ; $\mu_w=w^T\mu$, $\sigma_w^2=w^T\Sigma w$.
2. **Problème I** : $\min\frac12w^T\Sigma w$ s.c. $w^T\mu=\mu_0$, $w^T\mathbf{1}_m=1$ ⟹ $w_0=\lambda_1\Sigma^{-1}\mu+\lambda_2\Sigma^{-1}\mathbf{1}_m$ (**théorème des deux fonds**).
3. **Scalaires** $a=\mu^T\Sigma^{-1}\mu$, $b=\mu^T\Sigma^{-1}\mathbf{1}_m$, $c=\mathbf{1}_m^T\Sigma^{-1}\mathbf{1}_m$ ; $\binom{\mu_0}{1}=\binom{a\ b}{b\ c}\binom{\lambda_1}{\lambda_2}$.
4. **Frontière** : $\sigma_0^2=(c\mu_0^2-2b\mu_0+a)/(ac-b^2)$, **parabole** en $\mu_0$ ; minimum global en $\mu_0=b/c$, atteint par $w=\Sigma^{-1}\mathbf{1}_m/c$ (indépendant de $\mu$).
5. **Trois problèmes équivalents** : risque minimal (I), rendement maximal (II), aversion au risque $\lambda$ (III) — mêmes lagrangiens, même frontière.
6. **Avec actif sans risque** : $w_0=\lambda_1\Sigma^{-1}[\mu-\mathbf{1}_mr_0]$, $\lambda_1=(\mu_0-r_0)/[(\mu-\mathbf{1}_mr_0)^T\Sigma^{-1}(\mu-\mathbf{1}_mr_0)]$ ; $\sigma_P$ **linéaire** en $\mu_0-r_0$.
7. **Portefeuille de marché** : $w_M^T\mathbf{1}_m=1$, $\lambda_1(M)=(\mathbf{1}_m^T\Sigma^{-1}[\mu-\mathbf{1}_mr_0])^{-1}$.
8. **Tobin** : tout portefeuille optimal est un mélange de $r_0$ et de $M$, avec $w_M^{\text{tot}}=(\mu_0-r_0)/(E(R_M)-r_0)$.
9. **CML** : $E(R_P)=r_0+\sigma_P\cdot\frac{E(R_M)-r_0}{\sigma_M}$ ; le facteur est le **prix de marché du risque**.
10. **Utilité VNM** : maximiser $E[u(W_0(1+R_P))]$ ; $A(W)=-u''/u'$, $R(W)=-Wu''/u'$ ; Taylor ⟹ $E[u]\approx E[W]-\frac{\lambda}{2}\mathrm{Var}[W]$ = problème III.
11. **Utilités** : linéaire (neutre), quadratique (moyenne-variance exacte), exponentielle (**CARA**), puissance et log (**CRRA**).
12. **Contraintes** : long seulement, bornes, rotation, exposition benchmark, **tracking error** $[w-w_B]^T\Sigma[w-w_B]\leq\sigma_{TE}^2$, expositions factorielles, tailles minimales et entiers (**non convexes**).
13. **Estimation** : moyennes/covariances empiriques ; **l'erreur d'estimation (!!)** ; remèdes = moyennes mobiles exponentielles, facteurs dynamiques, indice unique de Sharpe, corrélation constante.
14. **Mesures alternatives** : MAD (⟹ **PL**), semi-variance, VaR, CVaR.
15. **Cohérence** : monotonie, **sous-additivité**, homogénéité positive, invariance par translation. **Var non cohérente** (pas monotone) · **VaR non cohérente** (pas sous-additive) · **CVaR cohérente**.
16. **Moments supérieurs** : $\max E(R_P)-\lambda_1\mathrm{Var}+\lambda_2\mathrm{Skew}-\lambda_3\mathrm{Kurt}$ ; asymétrie positive préférée ; estimation difficile.

**Formulas to know**

$$w_0=\lambda_1\Sigma^{-1}\mu+\lambda_2\Sigma^{-1}\mathbf{1}_m \qquad \sigma_0^2=\frac{c\mu_0^2-2b\mu_0+a}{ac-b^2} \qquad w_{\min}=\frac{\Sigma^{-1}\mathbf{1}_m}{\mathbf{1}_m^T\Sigma^{-1}\mathbf{1}_m}$$

$$w_0=\lambda_1\Sigma^{-1}[\mu-\mathbf{1}_mr_0] \qquad w_M^{\text{tot}}=\frac{\mu_0-r_0}{E(R_M)-r_0} \qquad E(R_P)=r_0+\sigma_P\frac{E(R_M)-r_0}{\sigma_M}$$

$$A(W)=-\frac{u''(W)}{u'(W)} \qquad VaR_{1-\alpha}(R_P)=\min\{r:\Pr(R_P\leq-r)\leq\alpha\} \qquad CVaR_{1-\alpha}(R_P)=E[-R_P\mid-R_P\geq VaR_{1-\alpha}]$$

**Methods to know** : la dérivation lagrangienne complète du problème I ; la démonstration de Tobin ; le développement de Taylor de l'utilité ; le contre-exemple de sous-additivité de la VaR.

## 🧠 Active Recall

**Basic** — Écrivez le problème de minimisation du risque de Markowitz et donnez la forme de sa solution.

<details><summary>Réponse</summary>

$$\min_w \tfrac12w^T\Sigma w \qquad \text{s.c. } w^T\mu=\mu_0,\quad w^T\mathbf{1}_m=1$$

La solution est

$$w_0=\lambda_1\Sigma^{-1}\mu+\lambda_2\Sigma^{-1}\mathbf{1}_m$$

une **combinaison linéaire de deux portefeuilles fixes**, $\Sigma^{-1}\mu$ et $\Sigma^{-1}\mathbf{1}_m$, dont seuls les coefficients dépendent du rendement cible $\mu_0$. C'est le **théorème des deux fonds**.

</details>

**Understanding** — Énoncez le théorème de séparation de Tobin et expliquez sa portée.

<details><summary>Réponse</summary>

**Énoncé.** Tout portefeuille optimal investit dans une combinaison de l'**actif sans risque** et du **portefeuille de marché** $M$.

**Le mécanisme.** Avec un actif sans risque, tout portefeuille optimal a des poids risqués $w_P=\lambda_1(P)\Sigma^{-1}[\mu-\mathbf{1}_mr_0]$ : seule la **constante multiplicative** $\lambda_1(P)$ dépend de la cible. Les proportions **relatives** entre actifs risqués sont donc **identiques pour tous**, et égales à celles de $M$.

**Portée.** Le choix de portefeuille se scinde en deux décisions **indépendantes** : quels actifs risqués (réponse universelle : $M$) et combien y placer (réponse personnelle, selon l'aversion au risque). C'est le fondement théorique de la gestion **indicielle** : si tout le monde détient le même portefeuille risqué, ce portefeuille est le marché.

</details>

**Application** — Un gérant est contraint par une erreur de suivi maximale de $3\,\%$ contre le S&P 500. Écrivez la contrainte et dites quelle est la nature du problème.

<details><summary>Réponse</summary>

Avec $w_B$ les poids du S&P 500, l'erreur de suivi est $TE_P=[w-w_B]^TR$, de variance

$$\mathrm{var}(TE_P)=[w-w_B]^T\Sigma[w-w_B]$$

La contrainte s'écrit

$$[w-w_B]^T\Sigma[w-w_B]\ \leq\ (0{,}03)^2=0{,}0009$$

**Nature du problème.** $\Sigma$ est semi-définie positive, donc c'est une **contrainte quadratique convexe** : on reste dans un **QCQP convexe** (fiche 37), efficacement résoluble. Géométriquement, la contrainte confine $w$ dans un **ellipsoïde** centré sur $w_B$.

⚠️ En pratique cette contrainte **domine** souvent le problème : elle colle le portefeuille au benchmark et réduit drastiquement l'espace des poids réalisables.

</details>

**Comparison** — VaR contre CVaR : quelles différences, et laquelle utiliser ?

<details><summary>Réponse</summary>

|  | VaR | CVaR |
|---|---|---|
| Nature | **quantile** de la perte | **moyenne de la queue** au-delà du quantile |
| Formule | $\min\{r:\Pr(R_P\leq-r)\leq\alpha\}$ | $E[-R_P\mid-R_P\geq VaR_{1-\alpha}]$ |
| Regarde la queue ? | **non**, un seul point | **oui**, intégralement |
| Sous-additive ? | **non** | **oui** |
| Cohérente ? | **non** | **oui** |
| Convexe à optimiser ? | **non** | **oui** |

**Conclusion.** La **CVaR** est supérieure sur tous les plans théoriques : elle est cohérente, elle voit la queue, et son optimisation est convexe (Rockafellar-Uryasev, 2000). La VaR conserve un usage de **reporting** — un seuil unique est plus facile à communiquer — mais elle est mauvaise pour agréger des risques et mauvaise comme objectif d'optimisation.

</details>

**Exam-style** — Justifiez le critère moyenne-variance à partir de la théorie de l'utilité, puis dites précisément ce que cette justification néglige.

<details><summary>Réponse</summary>

**La justification.** L'investisseur maximise $E[u(W)]$ avec $W=W_0(1+R_P)$. Si $u$ est régulière, un développement de Taylor autour de $\bar w=E[W]$ donne

$$u(W)\approx u(\bar w)+u'(\bar w)(W-\bar w)+\tfrac12u''(\bar w)(W-\bar w)^2$$

qu'on réécrit $(\text{const})+u'(\bar w)\big[W-\tfrac12A(\bar w)(W-\bar w)^2\big]$ avec $A(W)=-u''/u'$ l'**aversion absolue au risque d'Arrow-Pratt**. En prenant l'espérance :

$$E[u(W)]\approx E[W]-\frac{\lambda}{2}\mathrm{Var}[W], \qquad \lambda=A(\bar w)$$

C'est **exactement** le problème III. La moyenne-variance est donc l'**approximation du second ordre** de la maximisation d'utilité, et $\lambda$ y reçoit une interprétation précise.

**Ce qu'elle néglige — les termes d'ordre $\geq3$ :**

$$+\tfrac{1}{3!}u^{(3)}(\bar w)\,\mathrm{Skew}(W)+\tfrac{1}{4!}u^{(4)}(\bar w)\,\mathrm{Kurtosis}(W)+O[(W-\bar w)^5]$$

- L'**asymétrie** : la moyenne-variance est indifférente entre « beaucoup de petites pertes et quelques gros gains » et l'inverse. Un investisseur réel **préfère l'asymétrie positive**.
- La **kurtosis** : elle ignore l'épaisseur des queues, précisément ce qui compte lors des krachs.

**Quand la justification est-elle exacte ?** Dans deux cas seulement : si $u$ est **quadratique** (le développement s'arrête au second ordre), ou si les rendements sont **gaussiens** (la loi est entièrement déterminée par ses deux premiers moments). Ni l'un ni l'autre n'est vrai en pratique — l'utilité quadratique impose $W<1/\lambda$, et les rendements financiers ont des **queues épaisses**. D'où le critère à moments supérieurs :

$$\max\ E(R_P)-\lambda_1\mathrm{Var}(R_P)+\lambda_2\mathrm{Skew}(R_P)-\lambda_3\mathrm{Kurtosis}(R_P) \quad \text{s.c. } w^T\mathbf{1}_m=1$$

dont le cours souligne aussitôt la difficulté : estimer asymétrie et kurtosis est **sensible aux aberrants** et exige de **grands échantillons**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Rendement et variance d'un portefeuille ? | $\mu_w=w^T\mu$, $\sigma_w^2=w^T\Sigma w$ |
| Problème I de Markowitz ? | $\min\frac12w^T\Sigma w$ s.c. $w^T\mu=\mu_0$, $w^T\mathbf{1}_m=1$ |
| Forme de la solution ? | $w_0=\lambda_1\Sigma^{-1}\mu+\lambda_2\Sigma^{-1}\mathbf{1}_m$ |
| Les trois scalaires $a,b,c$ ? | $\mu^T\Sigma^{-1}\mu$, $\mu^T\Sigma^{-1}\mathbf{1}_m$, $\mathbf{1}_m^T\Sigma^{-1}\mathbf{1}_m$ |
| Variance sur la frontière ? | $(c\mu_0^2-2b\mu_0+a)/(ac-b^2)$ — **parabolique** |
| Portefeuille de variance minimale ? | $\Sigma^{-1}\mathbf{1}_m/c$, atteint en $\mu_0=b/c$ ; **ne dépend pas de $\mu$** |
| Les trois problèmes équivalents ? | Risque min · rendement max · aversion au risque $\lambda$ |
| Ce que change l'actif sans risque ? | La contrainte $w^T\mathbf{1}_m=1$ disparaît ; la frontière devient une **droite** |
| Solution avec actif sans risque ? | $w_0=\lambda_1\Sigma^{-1}[\mu-\mathbf{1}_mr_0]$ |
| Théorème de séparation de Tobin ? | Tout optimal = mélange de $r_0$ et du portefeuille de marché $M$ |
| Poids du marché dans $P$ ? | $w_M^{\text{tot}}=(\mu_0-r_0)/(E(R_M)-r_0)$ |
| Équation de la CML ? | $E(R_P)=r_0+\sigma_P\big(E(R_M)-r_0\big)/\sigma_M$ |
| Prix de marché du risque ? | $\big(E(R_M)-r_0\big)/\sigma_M$ |
| Aversion absolue au risque ? | $A(W)=-u''(W)/u'(W)$ |
| Aversion relative au risque ? | $R(W)=-W\,u''(W)/u'(W)$ |
| Utilité exponentielle ? | $u(W)=1-e^{-\lambda W}$ — **CARA** |
| Utilité puissance et log ? | $W^{1-\gamma}$ et $\ln W$ — **CRRA** |
| Approximation de Taylor de $E[u]$ ? | $E[W]-\frac{\lambda}{2}\mathrm{Var}[W]$, avec $\lambda=A(\bar w)$ |
| Variance de l'erreur de suivi ? | $[w-w_B]^T\Sigma[w-w_B]$ |
| Le grand danger de l'estimation ? | L'optimiseur **maximise sur les erreurs** de $\hat\mu$ et $\hat\Sigma$ |
| Remèdes cités par le cours ? | Moyennes mobiles exponentielles, facteurs dynamiques, indice unique de Sharpe, corrélation constante |
| Définition de la VaR ? | $\min\{r:\Pr(R_P\leq-r)\leq\alpha\}$ |
| Le défaut de la VaR ? | **Non sous-additive** : ne s'améliore pas avec la diversification |
| Définition de la CVaR ? | $E[-R_P\mid-R_P\geq VaR_{1-\alpha}(R_P)]$ |
| Les quatre axiomes de cohérence ? | Monotonie · sous-additivité · homogénéité positive · invariance par translation |
| Qui est cohérente ? | **CVaR oui** ; Var non (pas monotone) ; VaR non (pas sous-additive) |
| Critère à moments supérieurs ? | $\max E(R_P)-\lambda_1\mathrm{Var}+\lambda_2\mathrm{Skew}-\lambda_3\mathrm{Kurt}$ |
