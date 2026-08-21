# Fiche 71 — Estimation paramétrique : vraisemblance, VAR, GMM et quasi-vraisemblance

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Kogan, *15.450 Analytics of Finance*, MIT Sloan / OpenCourseWare, automne 2010 — cours 7 « Parameter Estimation » |
| **Difficulté** | Must know — GMM est la méthode d'estimation de l'économétrie financière |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 64 (vraisemblance, Fisher), fiche 58 (VAR), fiche 50 (MCO, MCG), fiche 52 (AIC/BIC) |
| **Concepts clés** | Consistance, inégalité de Jensen, fonction de vraisemblance, EMV pour observations dépendantes, AR($p$) et VAR($p$), MCO comme EMV, critères d'information, méthode des moments généralisée, conditions d'identification, score comme moment, quasi-maximum de vraisemblance, MCG |
| **Poids à l'examen** | Trois choses : la **preuve par Jensen** que la vraie densité maximise l'espérance de la log-vraisemblance ; les **conditions d'identification** du GMM ; et le fait que **QMLE soit un cas particulier de GMM** — c'est ce qui le justifie. |

## 🎯 Vue d'ensemble

> **Les trois approches, et leur arbitrage.**
>
> - *Si la loi de probabilité $p(X,\theta_0)$ est **entièrement connue**, on peut estimer $\theta_0$ par **maximum de vraisemblance (MLE)**. C'est la méthode préférée : elle offre la **meilleure précision asymptotique**.*
> - *Si la loi n'est pas entièrement connue mais qu'on en connaît certaines caractéristiques — les deux premiers moments, par exemple —, on peut estimer par **quasi-maximum de vraisemblance (QMLE)**.*
> - *Si l'on ne connaît que **quelques moments** de la loi, mais pas la densité entière, on peut estimer par la **méthode des moments généralisée (GMM)**.*
>
> ***QMLE et GMM sont moins précises (efficaces) que MLE, mais elles sont plus robustes, puisqu'elles n'exigent pas la connaissance complète de la loi.***

```
CONNAISSANCE   ←────────── décroît ──────────→   ROBUSTESSE ↑ PRÉCISION ↓
   MLE                  QMLE                    GMM
densité complète   deux premiers moments    quelques moments
   E(f) = 0 où f = score          ⟵  tout est un cas particulier de GMM
```

> **Le fil du cours.** GMM est le cadre **le plus général** : le MLE en est un cas particulier — il suffit de prendre le **score** comme fonction de moment —, et le QMLE aussi. C'est ce qui permet de **justifier** l'usage d'un modèle qu'on sait faux : *si les conditions de moment restent valides, GMM s'applique*.

## 🟡 Concept 1 — Rappels de statistique et de probabilité

**Le cadre.** Un échantillon $X=(x_1,\dots,x_T)$ de loi jointe $p(X,\theta_0)$ ; un **estimateur** $\hat\theta$ est une fonction de l'échantillon, $\hat\theta(X)$.

| Notion | Définition |
|---|---|
| **Consistance** | $\underset{T\to\infty}{\mathrm{plim}}\ \hat\theta=\theta_0$ |
| **Absence de biais** | $\mathbb E[\hat\theta]=\theta_0$ |
| **Intervalle de confiance $\alpha$** | intervalle aléatoire $(\hat\theta^L_i,\hat\theta^R_i)$ tel que $\mathrm{Prob}\big[(\hat\theta^L_i,\hat\theta^R_i)\text{ couvre }\theta_{0,i}\big]=\alpha$ |

> **Loi des grands nombres.** Si les $x_t$ sont i.i.d. de moyenne $\mu$ :
>
> $$\underset{T\to\infty}{\mathrm{plim}}\ \frac{\sum_{t=1}^Tx_t}{T}=\mu$$
>
> *où $\mathrm{plim}$ est la limite en probabilité : $\mathrm{plim}_{n\to\infty}x_n=y$ signifie que pour tout $\delta>0$, $\mathrm{Prob}[\lvert x_n-y\rvert>\delta]\to0$.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème central limite.</span>

Si les $x_t$ sont des vecteurs i.i.d. de moyenne $\mu$ et de matrice de variance-covariance $\Omega$ :

$$\frac{\sum_{t=1}^T(x_t-\mu)}{\sqrt T}\ \Rightarrow\ N(0,\Omega)$$

*où « $\Rightarrow$ » désigne la convergence en loi : $x_n\Rightarrow y$ signifie que $F_{x_n}(z)\to F_y(z)$ en tout point $z$ où $F_y$ est continue.*

</div>

**L'exemple minimal.** Pour un échantillon i.i.d. $N(\mu,1)$, l'estimateur usuel de $\mu$ est la moyenne empirique $\hat\mu=\hat{\mathbb E}[x_t]\equiv\frac1T\sum_tx_t$, consistant par la LGN. *Comment obtenir des estimateurs consistants dans des situations plus complexes ?* — c'est tout le sujet.

## 🔴 Concept 2 — Jensen et le fondement du maximum de vraisemblance

> **Inégalité de Jensen.** Si $f$ est **concave**, $w_n\geq0$ et $\sum_{n=1}^Nw_n=1$, alors
>
> $$\sum_{n=1}^Nw_nf(x_n)\ \leq\ f\left(\sum_{n=1}^Nw_nx_n\right)$$
>
> *Le résultat s'étend au cas continu :* $\int w(x)f(x)dx\leq f\big(\int w(x)x\,dx\big)$ si $\int w=1$ et $w\geq0$.
>
> *Exemple : si $x$ est une variable aléatoire — un rendement d'actif — et $f$ concave — une fonction d'utilité —, alors $\mathbb E[f(x)]\leq f(\mathbb E[x])$ : c'est l'**aversion au risque**.*

> **Le fondement du maximum de vraisemblance.** Pour toute densité alternative $p(x,\tilde\theta)$ :
>
> $$\boxed{\ \mathbb E\big[\ln p(x,\tilde\theta)\big]\ \leq\ \mathbb E\big[\ln p(x,\theta_0)\big]\ }$$

**La démonstration**, par Jensen et l'égalité $\int p(x,\tilde\theta)dx=1$ :

$$\mathbb E\left[\ln\frac{p(x_t,\tilde\theta)}{p(x_t,\theta_0)}\right]\ \leq\ \ln\mathbb E\left[\frac{p(x_t,\tilde\theta)}{p(x_t,\theta_0)}\right]=\ln\int\frac{p(x,\tilde\theta)}{p(x,\theta_0)}p(x,\theta_0)\,dx=\ln\int p(x,\tilde\theta)\,dx=\ln1=0$$

> **C'est la justification théorique du maximum de vraisemblance** : la **vraie** densité maximise l'espérance de la log-vraisemblance. Il suffit alors de remplacer l'espérance par sa moyenne empirique :
>
> $$\hat\theta=\underset{\theta}{\arg\max}\ \frac1T\sum_{t=1}^T\ln p(x_t,\theta)=\underset{\theta}{\arg\max}\ \frac1T\ln p(X,\theta)$$

⚠️ **C'est exactement l'argument de la fiche 64, sous une autre forme.** L'inégalité $\mathbb E[\ln p(\tilde\theta)]\leq\mathbb E[\ln p(\theta_0)]$ **est** la positivité de la divergence de Kullback-Leibler : $KL(\mathbb P_{\theta_0},\mathbb P_{\tilde\theta})=\mathbb E[\ln p(\theta_0)]-\mathbb E[\ln p(\tilde\theta)]\geq0$. Les deux cours démontrent le même résultat, l'un par la KL, l'autre par Jensen.

## 🔴 Concept 3 — La fonction de vraisemblance

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

$\mathcal L(\theta)=\ln p(X,\theta)$. *La fonction de vraisemblance traite les paramètres $\theta$ comme des **variables** et les observations $X$ comme **fixées**.*

</div>

Pour des observations i.i.d.,

$$\frac1T\mathcal L(\theta)=\frac1T\ln\prod_{t=1}^Tp(x_t,\theta)=\frac1T\sum_{t=1}^T\ln p(x_t,\theta) \qquad\Longrightarrow\qquad \boxed{\ \hat\theta=\underset{\theta}{\arg\max}\ \mathcal L(\theta)\ }$$

**Exemple 1 — le modèle gaussien.** Pour des observations i.i.d. $N(\mu,\sigma^2)$ :

$$\mathcal L(\theta)=\sum_{t=1}^T\ln\left(\frac{1}{\sqrt{2\pi\sigma^2}}\right)-\frac{(x_t-\mu)^2}{2\sigma^2}$$

**Conditions d'optimalité :**

$$\sum_{t=1}^T\frac{(x_t-\hat\mu)}{\hat\sigma^2}=0, \qquad -\frac T{\hat\sigma}+\sum_{t=1}^T\frac{(x_t-\hat\mu)^2}{\hat\sigma^3}=0$$

> *Elles sont **identiques aux conditions GMM** :*
>
> $$\hat{\mathbb E}\big(x_t-\hat\mu\big)=0, \qquad \hat{\mathbb E}\big[(x_t-\hat\mu)^2\big]-\hat\sigma^2=0$$

**Exemple 2 — la loi exponentielle.** Pour $T$ observations indépendantes de densité $p(x_t,\lambda)=\lambda\exp(-\lambda x_t)$ :

$$\mathcal L(\lambda)=\sum_{t=1}^T\big(-\lambda x_t+\ln\lambda\big)$$

**Condition du premier ordre :** $-\sum_tx_t+\frac T{\hat\lambda}=0$, d'où

$$\hat\lambda=\left(\frac{\sum_{t=1}^Tx_t}{T}\right)^{-1}=\frac{1}{\bar x}$$

## 🔴 Concept 4 — L'EMV pour observations dépendantes

> - *L'approche MLE fonctionne **même si les observations sont dépendantes**.*
> - *Il faut que la dépendance **s'éteigne assez vite**.*
> - Considérons une série $x_t,x_{t+1},\dots$ et supposons que la loi de $x_{t+1}$ ne dépende que de $L$ retards.
> - **Log-vraisemblance conditionnelle** aux $L$ premières observations : $$\mathcal L(\theta)=\sum_{t=L}^{T-1}\ln p\big(x_{t+1}\mid x_t,\dots,x_{t+1-L};\theta\big)$$
> - *$\theta$ maximise l'espérance conditionnelle de $\ln p(x_{t+1}\mid\cdot)$, donc maximise la vraisemblance conditionnelle si $T$ est grand et $x_t$ **stationnaire**.*

⚠️ **C'est la décomposition en erreurs de prédiction de la fiche 60**, écrite pour un modèle markovien d'ordre $L$. La vraisemblance jointe d'observations dépendantes se factorise en un produit de **conditionnelles** — chacune calculable.

### L'AR($p$) : maximum de vraisemblance $=$ moindres carrés

$$x_{t+1}=a_0+a_1x_t+\cdots+a_px_{t+1-p}+\varepsilon_{t+1}, \qquad \varepsilon_{t+1}\sim N(0,\sigma^2)$$

Conditionnellement à $(x_t,\dots,x_{t+1-p})$, $x_{t+1}$ est gaussienne, d'où

$$\mathcal L(\theta)=\sum_{t=p}^{T-1}\left[-\ln\sqrt{2\pi\sigma^2}-\frac{\big(x_{t+1}-a_0-a_1x_t-\cdots-a_px_{t+1-p}\big)^2}{2\sigma^2}\right]$$

> **Les estimations MLE de $(a_0,a_1,\dots,a_p)$ sont les mêmes que les MCO :**
>
> $$\max_{\hat a}\ \mathcal L(\theta)\iff\min_{\hat a}\ \sum_{t=p}^{T-1}\big(x_{t+1}-a_0-a_1x_t-\cdots-a_px_{t+1-p}\big)^2$$

> **La raison est visible dans la formule** : le premier terme ne dépend pas de $a$, et le second est $-\frac{1}{2\sigma^2}$ fois la somme des carrés. Maximiser l'un revient à minimiser l'autre. **C'est le résultat de la fiche 50**, transposé aux séries temporelles.

## 🔴 Concept 5 — Le VAR($p$)

$$x_{t+1}=a_0+A_1x_t+\cdots+A_px_{t+1-p}+\varepsilon_{t+1}, \qquad \varepsilon_{t+1}\sim N(0,\Sigma)$$

où $x_t$ et $a_0$ sont de dimension $N$, les $A_n$ sont $N\times N$, et $\varepsilon_t$ est un vecteur de chocs de covariance $\Sigma$.

$$\mathcal L(\theta)=\sum_{t=p}^{T-1}\left[-\ln\sqrt{(2\pi)^N\lvert\Sigma\rvert}-\frac12\varepsilon_{t+1}^\top\Sigma^{-1}\varepsilon_{t+1}\right]$$

**L'estimation.**

$$\max_{a_0,A_1,\dots,A_p,\Sigma}\mathcal L(\theta)\iff\min_{a_0,A_1,\dots,A_p,\Sigma}\sum_{t=p}^{T-1}\left[\ln\sqrt{(2\pi)^N\lvert\Sigma\rvert}+\frac12\varepsilon_{t+1}^\top\Sigma^{-1}\varepsilon_{t+1}\right]$$

**Conditions d'optimalité** pour $a_0,A_1,\dots,A_p$ :

$$\sum_t\big(x_{t-i}\,\varepsilon_{t+1}^\top\big)=0, \quad i=0,1,\dots,p-1, \qquad \sum_t\varepsilon_{t+1}=0$$

où $\varepsilon_{t+1}=x_{t+1}-\big(a_0+A_1x_t+\cdots+A_px_{t+1-p}\big)$.

> ***Les coefficients du VAR peuvent être estimés par MCO, équation par équation. Les écarts-types peuvent aussi être calculés séparément pour chaque équation.***

⚠️ **C'est exactement le théorème d'optimalité de la fiche 58**, redémontré ici par les conditions du premier ordre de la vraisemblance. Les conditions $\sum_tx_{t-i}\varepsilon_{t+1}^\top=0$ disent que les résidus sont **orthogonaux aux régresseurs** — les équations normales de la fiche 50 — et $\Sigma$ **n'y apparaît pas**, d'où l'estimation séparée.

## 🟠 Concept 6 — La sélection de modèle

> *En pratique, on ne connaît pas le modèle exact. Le MLE peut être adapté pour faire de la **sélection de modèle** : si l'échantillon est assez grand, on peut identifier le bon modèle en **comparant les vraisemblances maximisées** et en les **pénalisant pour le nombre de paramètres** utilisés.*

**Le protocole pour un VAR($p$).** Spécifier l'ordre maximal $\bar p$, en veillant à ce qu'il **croisse avec la taille d'échantillon, mais pas trop vite** :

$$\lim_{T\to\infty}\bar p=\infty, \qquad \lim_{T\to\infty}\frac{\bar p}{T}=0 \qquad \left(\text{par exemple } \bar p=\tfrac14(\ln T)^2\right)$$

puis trouver l'ordre optimal

$$\hat p=\underset{0\leq p\leq\bar p}{\arg\max}\ \frac2T\mathcal L(\theta;p)-\text{pénalité}(p)$$

avec

$$\textbf{AIC : } \text{pénalité}(p)=2\cdot\frac{pN^2}{T}, \qquad \textbf{BIC : } \text{pénalité}(p)=\ln(T)\cdot\frac{pN^2}{T}$$

> *Dans les grands échantillons, **le BIC sélectionne des modèles d'ordre inférieur à l'AIC**.*

**L'exemple du cours — la croissance du PIB américain.** Croissance trimestrielle corrigée des variations saisonnières, en taux annualisés, avec $\bar p=7$ :

- **AIC** dicte $p=5$, de coefficients $a_1,\dots,a_5=0{,}3185$ ; $0{,}1409$ ; $-0{,}0759$ ; $-0{,}0600$ ; $-0{,}0904$.
- **BIC** dicte $p=1$, de coefficient $a_1=0{,}3611$.

> **L'écart entre les deux verdicts est spectaculaire — $5$ contre $1$ — et illustre exactement ce que la fiche 52 annonçait.** Le BIC pénalise en $\ln(T)$ contre $2$ pour l'AIC ; dès $T>7$, il est plus sévère, et l'écart croît avec l'échantillon. Le comptage $pN^2$ montre pourquoi : chaque retard supplémentaire coûte $N^2$ paramètres.

## 🔴 Concept 7 — La méthode des moments généralisée (GMM)

**Le cadre.** Un échantillon i.i.d. $X=(x_1,\dots,x_T)$ tiré d'une famille de densité $\phi(x;\theta_0)$, et l'on veut estimer un vecteur de paramètres $\theta_0$ de dimension $N$. On considère un vecteur de fonctions $f_j(x,\theta)$ — les **« moments »** — avec $\dim(f)=N$.

> **Conditions d'identification.** On suppose savoir que
>
> $$\mathbb E\big[f(x_t,\theta_0)\big]=0 \qquad\text{et}\qquad \sum_{j=1}^N\Big(\mathbb E\big[f_j(x_t,\theta)\big]\Big)^2>0 \ \text{ si } \theta\neq\theta_0$$

> **L'estimateur GMM** $\hat\theta$ est défini par
>
> $$\boxed{\ \hat{\mathbb E}\big[f(x_t,\hat\theta)\big]\equiv\frac1T\sum_{t=1}^Tf(x_t,\hat\theta)=0\ }$$

> **La logique, en deux temps.** La **première** condition dit que les moments s'annulent à la vraie valeur — c'est ce qui rend l'estimation possible. La **seconde** dit qu'ils ne s'annulent **qu'à** la vraie valeur — c'est l'**identification**, sans laquelle plusieurs $\theta$ résoudraient le système. On remplace ensuite l'espérance par la moyenne empirique et l'on résout : **$N$ équations, $N$ inconnues**.

**Exemple — moyenne et variance.** Pour estimer $\theta_0=(\mu_0,\sigma_0)^\top$ avec $\sigma_0\geq0$, on choisit

$$f_1(x_t,\theta)=x_t-\mu, \qquad f_2(x_t,\theta)=(x_t-\mu)^2-\sigma^2$$

*Il est facile de voir que $\mathbb E[f(x,\theta_0)]=0$, et que $\mathbb E[f(x,\theta)]\neq0$ si $\theta\neq\theta_0$.* Les estimations sont

$$\hat{\mathbb E}(x_t)-\hat\mu=0\ \Rightarrow\ \hat\mu=\hat{\mathbb E}(x_t), \qquad \hat{\mathbb E}\big[(x_t-\hat\mu)^2\big]-\hat\sigma^2=0\ \Rightarrow\ \hat\sigma^2=\hat{\mathbb E}\big[(x_t-\hat\mu)^2\big]$$

## 🔴 Concept 8 — GMM et MLE : le score comme moment

> *Les **conditions du premier ordre du MLE** peuvent servir de moments dans une estimation GMM.* Les conditions d'optimalité pour maximiser $\mathcal L(\theta)=\sum_{t=1}^T\ln p(x_t,\theta)$ sont
>
> $$\sum_{t=1}^T\frac{\partial\ln p(x_t,\theta)}{\partial\theta}=0$$
>
> *Si l'on pose $f=\partial\ln p(x,\theta)/\partial\theta$ — le **vecteur de score** —, alors **le MLE se réduit à un GMM** de vecteur de moment $f$.*

> **C'est le résultat structurant du chapitre.** Le GMM **englobe** le MLE. Et l'on comprend pourquoi les conditions d'optimalité du modèle gaussien du concept 3 étaient *identiques aux conditions GMM* : le score gaussien **est** le vecteur $\big(x_t-\mu,\ (x_t-\mu)^2-\sigma^2\big)$, à normalisation près.
>
> **Et cela donne une méthode de travail** : quand on ne sait pas quels moments choisir, on écrit une vraisemblance — même approximative — et l'on prend son **score**. C'est exactement l'idée du QMLE.

**Exemple — un modèle de taux d'intérêt.**

$$r_{t+1}=a_0+a_1r_t+\varepsilon_{t+1}, \qquad \mathbb E(\varepsilon_{t+1}\mid r_t)=0, \qquad \mathbb E(\varepsilon_{t+1}^2\mid r_t)=b_0+b_1r_t$$

*Pour toute fonction $g(r_t)$,*

$$\mathbb E\big[g(r_t)\varepsilon_{t+1}\big]=\mathbb E\Big[\mathbb E\big[g(r_t)\varepsilon_{t+1}\mid r_t\big]\Big]=\mathbb E\Big[g(r_t)\,\mathbb E[\varepsilon_{t+1}\mid r_t]\Big]=0$$

En prenant $g(r_t)=1$ et $g(r_t)=r_t$, on obtient les conditions de moment

$$\mathbb E\Big[(1,r_t)^\top\big(r_{t+1}-a_0-a_1r_t\big)\Big]=0, \qquad \mathbb E\Big[(1,r_t)^\top\Big(\big(r_{t+1}-a_0-a_1r_t\big)^2-b_0-b_1r_t\Big)\Big]=0$$

> *$(a_0,a_1)$ peut être estimé à partir de la **première paire** de conditions de moment. C'est équivalent aux **MCO**, et cela **ignore l'information sur le second moment**.*

⚠️ **Le mécanisme $\mathbb E[g(r_t)\varepsilon_{t+1}]=0$ est le plus productif de tout le GMM.** Une seule hypothèse — $\mathbb E[\varepsilon_{t+1}\mid r_t]=0$ — engendre une **infinité** de conditions de moment valides, une par fonction $g$ de l'information passée. C'est la notion d'**instrument** : n'importe quelle variable connue en $t$ fournit une équation. Reste à choisir lesquelles, et c'est là qu'intervient l'efficacité.

## 🔴 Concept 9 — Le quasi-maximum de vraisemblance

> - *Les estimations du maximum de vraisemblance sont **optimales** : elles ont la **plus petite variance asymptotique**.*
> - *Quand on connaît précisément $p(X,\theta)$, le MLE est l'approche la plus **efficace**.*
> - *Le MLE est souvent une façon commode de **déterminer quelles conditions de moment imposer**.*
> - ***Même si le modèle $p(X,\theta)$ est mal spécifié, l'approche MLE peut rester valide tant que les conditions de moment impliquées sont valides.***
> - *Avec un modèle **incorrect** $q(X,\theta)$, le MLE est un **cas particulier du GMM** : les résultats du GMM s'appliquent.*
>
> ***L'approche consistant à utiliser une fonction de vraisemblance incorrecte — typiquement gaussienne — pour estimer s'appelle le quasi-maximum de vraisemblance (QMLE).***

**Exemple 1 — QMLE pour un AR($p$) à erreurs non gaussiennes.**

$$x_{t+1}=a_0+a_1x_t+\cdots+a_px_{t+1-p}+\varepsilon_{t+1}, \qquad \mathbb E[\varepsilon_{t+1}\mid x_t,\dots,x_{t+1-p}]=0$$

*On **fait comme si** les erreurs étaient gaussiennes pour construire $\mathcal L(\theta)$.* Les conditions d'optimalité sont

$$\sum_t\big(x_{t-i}\varepsilon_{t+1}\big)=0, \quad i=0,\dots,p-1, \qquad \sum_t\varepsilon_{t+1}=0$$

> *Ce sont des **conditions de moment valides** — à vérifier. **Le GMM justifie le QMLE**.*

⚠️ **C'est le point conceptuel décisif.** On a estimé avec une vraisemblance **fausse**, et pourtant l'estimateur est consistant. La raison est que les conditions du premier ordre obtenues coïncident avec des conditions de moment **qui, elles, sont vraies** — elles ne demandent que $\mathbb E[\varepsilon_{t+1}\mid\text{passé}]=0$, pas la normalité. La normalité n'a servi que d'**échafaudage** pour produire les bons moments.

**Exemple 2 — QMLE avec hétéroscédasticité.** Reprenons

$$r_{t+1}=a_0+a_1r_t+\varepsilon_{t+1}, \qquad \mathbb E(\varepsilon_{t+1}\mid r_t)=0, \qquad \mathbb E(\varepsilon_{t+1}^2\mid r_t)=b_0+b_1r_t$$

*QMLE : on traite $\varepsilon_t$ comme $N(0,b_0+b_1r_{t-1})$, d'où*

$$\mathcal L(\theta)=\sum_{t=1}^{T-1}\left[-\frac12\ln\big(2\pi(b_0+b_1r_t)\big)-\frac{\big(r_{t+1}-a_0-a_1r_t\big)^2}{2(b_0+b_1r_t)}\right]$$

> *$(a_0,a_1)$ **ne peut plus être estimé séparément** de $(b_0,b_1)$.* Les conditions d'optimalité pour $(a_0,a_1)$ deviennent
>
> $$\sum_{t=1}^{T-1}(1,r_t)^\top\ \frac{r_{t+1}-a_0-a_1r_t}{b_0+b_1r_t}=0$$
>
> ***Ce ne sont plus les MCO, mais les MCG. Estimations plus précises de $(a_0,a_1)$ : on sous-pondère les résidus à forte variance.***

**La motivation empirique.** *Sur le taux des bons du Trésor à 3 mois (marché secondaire, données mensuelles), le nuage des variations de taux contre le niveau retardé montre une **volatilité plus forte quand les taux sont élevés**.* D'où la spécification $b_0+b_1r_t$.

> **La conclusion du cours.** *Le QMLE aide à spécifier les moments du GMM. **Ne pas l'utiliser aveuglément** : il faut **vérifier que les conditions de moment sont valides**.*

⚠️ **Et remarquez le lien avec les fiches 50 et 66.** La pondération par $1/(b_0+b_1r_t)$ est exactement celle des **MCG** — division par la variance conditionnelle — et exactement la matrice $W$ de l'algorithme **IRLS**. Trois cours différents, la même correction d'hétéroscédasticité.

## Comment résoudre l'exercice type (protocole)

1. **Évaluer ce qu'on connaît** : densité complète ⟹ **MLE** · deux premiers moments ⟹ **QMLE** · quelques moments ⟹ **GMM**.
2. **MLE** : écrire $\mathcal L(\theta)=\ln p(X,\theta)$ — conditionnelle si les observations sont dépendantes — puis annuler le gradient.
3. **Vérifier la simplification** : erreurs gaussiennes ⟹ MLE $=$ **MCO** ; hétéroscédasticité modélisée ⟹ **MCG**.
4. **GMM** : choisir $N$ fonctions $f_j$ avec $\mathbb E[f(x,\theta_0)]=0$, **vérifier l'identification**, puis résoudre $\frac1T\sum_tf(x_t,\hat\theta)=0$.
5. **Si l'on manque d'idées de moments** : écrire une vraisemblance approximative et prendre son **score**.
6. **QMLE** : construire $\mathcal L$ avec une loi commode (gaussienne), en déduire les conditions du premier ordre, et **vérifier qu'elles sont des conditions de moment valides**.
7. **Sélection d'ordre** : $\hat p=\arg\max\frac2T\mathcal L(\theta;p)-\text{pénalité}(p)$, avec $2pN^2/T$ (AIC) ou $\ln(T)pN^2/T$ (BIC).

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| loi **entièrement spécifiée** | **MLE** — précision maximale |
| « on ne connaît que les deux premiers moments » | **QMLE** |
| « on ne connaît que quelques moments » | **GMM** |
| erreurs gaussiennes dans un AR | MLE $=$ **MCO** |
| VAR sans restriction | MCO **équation par équation** |
| « quel ordre $p$ choisir ? » | **AIC** ou **BIC**, pénalité en $pN^2/T$ |
| $\mathbb E[\varepsilon_{t+1}\mid\text{passé}]=0$ | une condition de moment **par instrument** $g$ |
| variance conditionnelle modélisée | **MCG**, pondérer par $1/\mathrm{var}$ |
| « le modèle est faux, l'estimateur reste-t-il valide ? » | oui **si les moments sont valides** — GMM justifie QMLE |

### Exercices progressifs

**Niveau 1** — Montrez que l'EMV d'un AR($p$) à erreurs gaussiennes coïncide avec les MCO.

<details><summary>Correction</summary>

**Le modèle.** $x_{t+1}=a_0+a_1x_t+\cdots+a_px_{t+1-p}+\varepsilon_{t+1}$ avec $\varepsilon_{t+1}\sim N(0,\sigma^2)$ i.i.d.

**La vraisemblance conditionnelle.** Conditionnellement à $(x_t,\dots,x_{t+1-p})$, la variable $x_{t+1}$ est gaussienne de moyenne $a_0+a_1x_t+\cdots+a_px_{t+1-p}$ et de variance $\sigma^2$, donc

$$\mathcal L(\theta)=\sum_{t=p}^{T-1}\left[-\ln\sqrt{2\pi\sigma^2}-\frac{\big(x_{t+1}-a_0-a_1x_t-\cdots-a_px_{t+1-p}\big)^2}{2\sigma^2}\right]$$

**La séparation.** Le premier terme, $-\ln\sqrt{2\pi\sigma^2}$, **ne dépend pas de $a$**. Le second est $-\frac{1}{2\sigma^2}$ fois la somme des carrés des résidus, avec $\sigma^2>0$. Donc

$$\max_{a}\ \mathcal L(\theta)\iff\min_{a}\ \sum_{t=p}^{T-1}\big(x_{t+1}-a_0-a_1x_t-\cdots-a_px_{t+1-p}\big)^2$$

qui est exactement le critère des **moindres carrés**. $\blacksquare$

**Ce que cela apprend.** Le critère des MCO n'est pas un choix arbitraire : c'est le maximum de vraisemblance **sous hypothèse gaussienne** — le même résultat qu'en fiche 50, ici transposé aux séries temporelles.

⚠️ **Et la réciproque est intéressante.** Si les erreurs ne sont **pas** gaussiennes, les MCO restent une procédure valide — c'est le **QMLE** —, mais ils ne sont plus l'EMV et perdent l'efficacité optimale. Ce qui les sauve est que leurs conditions du premier ordre $\sum_tx_{t-i}\varepsilon_{t+1}=0$ sont des **conditions de moment valides**, dérivant seulement de $\mathbb E[\varepsilon_{t+1}\mid\text{passé}]=0$.

</details>

**Niveau 2** — Énoncez les conditions d'identification du GMM et expliquez leur rôle.

<details><summary>Correction</summary>

**Les deux conditions.**

$$\mathbb E\big[f(x_t,\theta_0)\big]=0 \qquad\text{(1)}$$

$$\sum_{j=1}^N\Big(\mathbb E\big[f_j(x_t,\theta)\big]\Big)^2>0 \quad\text{si } \theta\neq\theta_0 \qquad\text{(2)}$$

**Le rôle de (1) — la validité.** Les moments **s'annulent à la vraie valeur**. C'est ce qui rend l'estimation possible : la version empirique $\frac1T\sum_tf(x_t,\theta)$ converge vers $0$ en $\theta_0$ par la LGN, donc la solution du système empirique converge vers $\theta_0$.

**Le rôle de (2) — l'identification.** Les moments **ne s'annulent qu'à la vraie valeur**. Sans cette condition, plusieurs $\theta$ vérifieraient $\mathbb E[f(x,\theta)]=0$, et rien ne permettrait de choisir. C'est exactement l'identifiabilité de la fiche 67, formulée en termes de moments.

**La dimension.** $\dim(f)=N=\dim(\theta)$ : **autant d'équations que d'inconnues**. Le système $\frac1T\sum_tf(x_t,\hat\theta)=0$ est donc exactement déterminé.

**L'exemple moyenne-variance.** $f_1=x_t-\mu$, $f_2=(x_t-\mu)^2-\sigma^2$. La condition (1) est immédiate. La condition (2) se vérifie : si $\mu\neq\mu_0$, alors $\mathbb E[f_1]=\mu_0-\mu\neq0$ ; et si $\mu=\mu_0$ mais $\sigma\neq\sigma_0$, alors $\mathbb E[f_2]=\sigma_0^2-\sigma^2\neq0$.

⚠️ **Le cas suridentifié**, que le cours ne traite pas ici mais qu'il faut connaître : si l'on dispose de **plus** de moments que de paramètres, le système n'a en général pas de solution exacte. On minimise alors une forme quadratique $\hat{\mathbb E}[f]^\top W\hat{\mathbb E}[f]$, et le choix de $W$ détermine l'efficacité. C'est le GMM au sens de Hansen.

</details>

**Niveau 3** — Pourquoi le QMLE est-il valide alors que le modèle est faux ?

<details><summary>Correction</summary>

**Le paradoxe apparent.** On estime en maximisant une vraisemblance $q(X,\theta)$ dont on **sait** qu'elle n'est pas la vraie densité — typiquement une gaussienne pour des données non gaussiennes. Comment l'estimateur peut-il rester consistant ?

**La réponse : le GMM.** *Avec un modèle incorrect $q(X,\theta)$, le MLE est un **cas particulier du GMM**. Les résultats du GMM s'appliquent.* Maximiser $q$ revient à annuler son score :

$$\frac1T\sum_t\frac{\partial\ln q(x_t,\hat\theta)}{\partial\theta}=0$$

C'est un système GMM de fonction de moment $f=\partial\ln q/\partial\theta$. **La question n'est donc plus « $q$ est-elle la vraie densité ? » mais « $\mathbb E[f(x,\theta_0)]=0$ est-elle vraie ? »** — une exigence bien plus faible.

**L'exemple de l'AR($p$).** En faisant comme si les erreurs étaient gaussiennes, les conditions du premier ordre sont

$$\sum_t\big(x_{t-i}\varepsilon_{t+1}\big)=0, \quad i=0,\dots,p-1, \qquad \sum_t\varepsilon_{t+1}=0$$

Or ces conditions n'expriment **que l'orthogonalité des résidus au passé** — elles découlent de la seule hypothèse $\mathbb E[\varepsilon_{t+1}\mid x_t,\dots,x_{t+1-p}]=0$, **sans aucune hypothèse de normalité**. Elles sont donc **valides**, et le GMM garantit la consistance.

**La normalité n'a servi que d'échafaudage.** Elle a permis d'**écrire** une fonction objectif commode, dont les conditions du premier ordre se trouvent être les bons moments. Une fois les moments identifiés, l'échafaudage peut être retiré.

**Ce qu'on perd malgré tout.** *Les estimations MLE sont optimales : elles ont la plus petite variance asymptotique.* Avec une vraisemblance fausse, on garde la **consistance** mais on perd l'**efficacité** — et surtout, **les écarts-types calculés par la formule MLE sont faux**. Il faut utiliser les écarts-types **robustes** du GMM (fiche suivante du cours).

**L'avertissement du cours.** *Le QMLE aide à spécifier les moments du GMM. **Ne pas l'utiliser aveuglément** : vérifier que les conditions de moment sont valides.* Un contre-exemple immédiat : si l'on modélisait une variance conditionnelle **fausse** dans l'exemple hétéroscédastique, les conditions pondérées ne seraient plus des moments valides et l'estimateur serait biaisé.

</details>

**Niveau 4 — type examen** — Construisez l'estimation d'un modèle de taux hétéroscédastique par GMM puis par QMLE, et comparez.

<details><summary>Correction</summary>

**Le modèle.**

$$r_{t+1}=a_0+a_1r_t+\varepsilon_{t+1}, \qquad \mathbb E(\varepsilon_{t+1}\mid r_t)=0, \qquad \mathbb E(\varepsilon_{t+1}^2\mid r_t)=b_0+b_1r_t$$

**La motivation empirique** : sur le taux des bons du Trésor à 3 mois, le nuage des variations contre le niveau retardé montre une **volatilité croissante avec le niveau des taux**.

**Approche 1 — GMM.**

*Étape 1 — le mécanisme des instruments.* Pour toute fonction $g(r_t)$,

$$\mathbb E\big[g(r_t)\varepsilon_{t+1}\big]=\mathbb E\Big[g(r_t)\,\mathbb E[\varepsilon_{t+1}\mid r_t]\Big]=0$$

par la loi des espérances itérées.

*Étape 2 — choisir $g=1$ et $g=r_t$.* On obtient quatre conditions de moment :

$$\mathbb E\Big[(1,r_t)^\top\big(r_{t+1}-a_0-a_1r_t\big)\Big]=0$$

$$\mathbb E\Big[(1,r_t)^\top\Big(\big(r_{t+1}-a_0-a_1r_t\big)^2-b_0-b_1r_t\Big)\Big]=0$$

*Étape 3 — estimer.* $(a_0,a_1)$ s'obtient **de la première paire seule**. *C'est équivalent aux MCO, et cela **ignore l'information sur le second moment**.* Puis $(b_0,b_1)$ se déduit de la seconde paire, à partir des résidus.

**Approche 2 — QMLE.**

*On traite $\varepsilon_t$ comme $N(0,b_0+b_1r_{t-1})$* et l'on construit

$$\mathcal L(\theta)=\sum_{t=1}^{T-1}\left[-\frac12\ln\big(2\pi(b_0+b_1r_t)\big)-\frac{\big(r_{t+1}-a_0-a_1r_t\big)^2}{2(b_0+b_1r_t)}\right]$$

*Conséquence immédiate* : $(a_0,a_1)$ **ne peut plus être estimé séparément** de $(b_0,b_1)$ — les deux blocs sont couplés par la pondération.

*Les conditions du premier ordre pour $(a_0,a_1)$* :

$$\sum_{t=1}^{T-1}(1,r_t)^\top\,\frac{r_{t+1}-a_0-a_1r_t}{b_0+b_1r_t}=0$$

**La comparaison.**

|  | **GMM (première paire)** | **QMLE** |
|---|---|---|
| Conditions | $\sum_t(1,r_t)^\top\varepsilon_{t+1}=0$ | $\sum_t(1,r_t)^\top\frac{\varepsilon_{t+1}}{b_0+b_1r_t}=0$ |
| Méthode | **MCO** | **MCG** |
| Pondération | uniforme | $1/\mathrm{var}$ conditionnelle |
| Estimation de $(a,b)$ | **séparée** | **couplée** |
| Précision | moindre | **meilleure** |

> *Ce ne sont plus les MCO, mais les MCG. Estimations plus précises de $(a_0,a_1)$ : on **sous-pondère les résidus à forte variance**.*

**Pourquoi les MCG sont plus précises.** Les observations où la variance conditionnelle $b_0+b_1r_t$ est grande sont **moins informatives** sur $(a_0,a_1)$ : leur résidu est bruité indépendamment de la valeur des coefficients. Leur donner un poids plus faible réduit la variance de l'estimateur. C'est exactement le théorème de Gauss-Markov généralisé de la fiche 50, et exactement la matrice de poids $W$ de l'IRLS en fiche 66.

**Ce qu'il faut savoir conclure.**

1. Le GMM à quatre moments et le QMLE utilisent **la même information**, mais le QMLE la **combine plus efficacement** en pondérant.
2. Le QMLE reste valide **bien que la loi ne soit pas gaussienne**, parce que ses conditions du premier ordre sont des conditions de moment valides — *le GMM justifie le QMLE*.
3. Il faut néanmoins **vérifier** cette validité, et utiliser des écarts-types **robustes** : la formule d'écart-type du MLE gaussien serait fausse ici.

</details>

## 🔴 Common mistakes

1. **Croire que le MLE exige des observations i.i.d.** — il fonctionne aussi pour des observations **dépendantes**, via la vraisemblance **conditionnelle**.
2. **Oublier de conditionner sur les $L$ premières observations** dans un modèle à retards.
3. **Croire que MCO $=$ MLE toujours** — c'est vrai sous erreurs **gaussiennes homoscédastiques** seulement.
4. **Oublier que $\Sigma$ n'entre pas dans les conditions d'optimalité du VAR** — c'est ce qui autorise l'estimation équation par équation.
5. **Se tromper de pénalité** — AIC en $2pN^2/T$, BIC en $\ln(T)pN^2/T$ ; le BIC choisit des ordres **plus faibles**.
6. **Oublier la condition d'identification du GMM** — la validité des moments ne suffit pas.
7. **Ne pas exploiter tous les instruments** — $\mathbb E[\varepsilon_{t+1}\mid\text{passé}]=0$ engendre une condition **par fonction $g$** du passé.
8. **Utiliser les écarts-types du MLE après un QMLE** — ils sont **faux** ; il faut les écarts-types robustes du GMM.
9. **Appliquer le QMLE aveuglément** — *vérifier que les conditions de moment sont valides*.
10. **Croire que GMM et MLE sont des méthodes rivales** — le MLE est un **cas particulier** du GMM, avec le **score** pour moment.

## 📌 Ultimate Review

1. **Les trois approches** : **MLE** (densité connue, précision maximale) · **QMLE** (deux premiers moments) · **GMM** (quelques moments). *QMLE et GMM sont moins efficaces mais plus **robustes**.*
2. **Consistance** : $\mathrm{plim}\ \hat\theta=\theta_0$. **Sans biais** : $\mathbb E[\hat\theta]=\theta_0$.
3. **LGN** : $\mathrm{plim}\frac1T\sum_tx_t=\mu$. **TCL** : $\frac{1}{\sqrt T}\sum_t(x_t-\mu)\Rightarrow N(0,\Omega)$.
4. **Jensen** : $f$ concave ⟹ $\sum w_nf(x_n)\leq f(\sum w_nx_n)$ ; d'où $\mathbb E[f(x)]\leq f(\mathbb E[x])$ — l'**aversion au risque**.
5. **Fondement du MLE** : $\mathbb E[\ln p(x,\tilde\theta)]\leq\mathbb E[\ln p(x,\theta_0)]$, démontré par Jensen et $\int p(x,\tilde\theta)dx=1$.
6. **Vraisemblance** : $\mathcal L(\theta)=\ln p(X,\theta)$ ; i.i.d. ⟹ $\frac1T\mathcal L=\frac1T\sum_t\ln p(x_t,\theta)$ ; $\hat\theta=\arg\max\mathcal L$.
7. **Exemples** : gaussien ⟹ conditions **identiques au GMM** ; exponentiel ⟹ $\hat\lambda=1/\bar x$.
8. **Observations dépendantes** : $\mathcal L(\theta)=\sum_{t=L}^{T-1}\ln p(x_{t+1}\mid x_t,\dots,x_{t+1-L};\theta)$ — dépendance devant s'éteindre assez vite, série **stationnaire**.
9. **AR($p$) gaussien** : $\max\mathcal L\iff\min\sum(x_{t+1}-a_0-\cdots)^2$ — **MLE $=$ MCO**.
10. **VAR($p$)** : conditions $\sum_tx_{t-i}\varepsilon_{t+1}^\top=0$ et $\sum_t\varepsilon_{t+1}=0$ ⟹ **MCO équation par équation**, écarts-types séparés.
11. **Sélection d'ordre** : $\hat p=\arg\max_{0\leq p\leq\bar p}\frac2T\mathcal L(\theta;p)-\text{pénalité}(p)$ avec $\bar p\to\infty$, $\bar p/T\to0$ (ex. $\frac14(\ln T)^2$).
12. **Pénalités** : AIC $2pN^2/T$, BIC $\ln(T)pN^2/T$ ; **le BIC choisit des ordres plus faibles**. Exemple PIB : AIC ⟹ $p=5$, BIC ⟹ $p=1$.
13. **GMM** : $\dim(f)=N$ ; **validité** $\mathbb E[f(x_t,\theta_0)]=0$ ; **identification** $\sum_j(\mathbb E[f_j(x_t,\theta)])^2>0$ si $\theta\neq\theta_0$ ; estimateur $\frac1T\sum_tf(x_t,\hat\theta)=0$.
14. **Exemple moyenne-variance** : $f_1=x_t-\mu$, $f_2=(x_t-\mu)^2-\sigma^2$.
15. **GMM englobe MLE** : poser $f=\partial\ln p(x,\theta)/\partial\theta$, le **vecteur de score**.
16. **Instruments** : $\mathbb E[\varepsilon_{t+1}\mid r_t]=0$ ⟹ $\mathbb E[g(r_t)\varepsilon_{t+1}]=0$ pour **toute** fonction $g$.
17. **QMLE** : utiliser une vraisemblance **incorrecte** — typiquement gaussienne. **Valide si les conditions de moment le sont** ; *le GMM justifie le QMLE*.
18. **QMLE hétéroscédastique** : $\sum_t(1,r_t)^\top\frac{\varepsilon_{t+1}}{b_0+b_1r_t}=0$ — ce sont les **MCG**, plus précis, en sous-pondérant les résidus à forte variance.

**Formulas to know**

$$\mathbb E\big[\ln p(x,\tilde\theta)\big]\leq\mathbb E\big[\ln p(x,\theta_0)\big] \qquad \hat\theta=\underset{\theta}{\arg\max}\ \frac1T\sum_{t=1}^T\ln p(x_t,\theta)$$

$$\mathcal L(\theta)=\sum_{t=L}^{T-1}\ln p\big(x_{t+1}\mid x_t,\dots,x_{t+1-L};\theta\big) \qquad \hat p=\underset{p}{\arg\max}\ \frac2T\mathcal L(\theta;p)-\text{pénalité}(p)$$

$$\frac1T\sum_{t=1}^Tf(x_t,\hat\theta)=0 \qquad f=\frac{\partial\ln p(x,\theta)}{\partial\theta} \qquad \mathbb E\big[g(r_t)\varepsilon_{t+1}\big]=0$$

**Methods to know** : la preuve par Jensen ; la construction d'une vraisemblance conditionnelle ; la vérification des deux conditions GMM ; la dérivation de moments par instruments ; la justification du QMLE par le GMM.

## 🧠 Active Recall

**Basic** — Quelles sont les trois méthodes d'estimation, et selon quel critère les choisit-on ?

<details><summary>Réponse</summary>

| Méthode | Ce qu'elle exige | Précision |
|---|---|---|
| **MLE** | la **densité complète** $p(X,\theta_0)$ | **maximale** |
| **QMLE** | quelques caractéristiques (deux premiers moments) | intermédiaire |
| **GMM** | seulement **quelques moments** | moindre |

Le critère est un **arbitrage précision / robustesse** : *QMLE et GMM sont moins précises (efficaces) que MLE, mais elles sont **plus robustes**, puisqu'elles n'exigent pas la connaissance complète de la loi.*

⚠️ Et le **GMM englobe les deux autres** : le MLE est un GMM dont la fonction de moment est le **score** $\partial\ln p/\partial\theta$, et le QMLE est un GMM dont le score provient d'une densité **incorrecte**.

</details>

**Understanding** — Pourquoi la vraie densité maximise-t-elle l'espérance de la log-vraisemblance ?

<details><summary>Réponse</summary>

**L'énoncé.** Pour toute densité alternative $p(x,\tilde\theta)$ :

$$\mathbb E\big[\ln p(x,\tilde\theta)\big]\leq\mathbb E\big[\ln p(x,\theta_0)\big]$$

**La démonstration**, par **Jensen** appliquée à $\ln$, qui est concave, et en utilisant $\int p(x,\tilde\theta)dx=1$ :

$$\mathbb E\left[\ln\frac{p(x_t,\tilde\theta)}{p(x_t,\theta_0)}\right]\leq\ln\mathbb E\left[\frac{p(x_t,\tilde\theta)}{p(x_t,\theta_0)}\right]=\ln\int\frac{p(x,\tilde\theta)}{p(x,\theta_0)}p(x,\theta_0)dx=\ln\int p(x,\tilde\theta)dx=\ln1=0$$

**La conséquence.** Il suffit de remplacer l'espérance par sa moyenne empirique :

$$\hat\theta=\underset{\theta}{\arg\max}\ \frac1T\sum_{t=1}^T\ln p(x_t,\theta)$$

⚠️ **C'est le même résultat que la fiche 64, démontré autrement.** L'écart $\mathbb E[\ln p(\theta_0)]-\mathbb E[\ln p(\tilde\theta)]$ **est** la divergence de Kullback-Leibler $KL(\mathbb P_{\theta_0},\mathbb P_{\tilde\theta})$, et l'inégalité **est** sa positivité. Jensen et la KL disent la même chose.

</details>

**Application** — Écrivez les conditions de moment GMM pour $r_{t+1}=a_0+a_1r_t+\varepsilon_{t+1}$ avec $\mathbb E[\varepsilon_{t+1}\mid r_t]=0$.

<details><summary>Réponse</summary>

**Le mécanisme.** Pour **toute** fonction $g(r_t)$, la loi des espérances itérées donne

$$\mathbb E\big[g(r_t)\varepsilon_{t+1}\big]=\mathbb E\Big[\mathbb E\big[g(r_t)\varepsilon_{t+1}\mid r_t\big]\Big]=\mathbb E\Big[g(r_t)\underbrace{\mathbb E[\varepsilon_{t+1}\mid r_t]}_{=0}\Big]=0$$

**Le choix minimal.** Avec $g=1$ et $g=r_t$ — deux instruments pour deux paramètres :

$$\mathbb E\Big[(1,r_t)^\top\big(r_{t+1}-a_0-a_1r_t\big)\Big]=0$$

**L'estimateur GMM.** On remplace par la moyenne empirique :

$$\frac1T\sum_t\begin{pmatrix}1\\r_t\end{pmatrix}\big(r_{t+1}-\hat a_0-\hat a_1r_t\big)=0$$

*C'est équivalent aux **MCO*** — ce sont exactement les équations normales de la fiche 50, avec pour régresseurs la constante et $r_t$.

**Si la variance conditionnelle est modélisée**, $\mathbb E(\varepsilon^2_{t+1}\mid r_t)=b_0+b_1r_t$, on ajoute deux conditions :

$$\mathbb E\Big[(1,r_t)^\top\Big(\big(r_{t+1}-a_0-a_1r_t\big)^2-b_0-b_1r_t\Big)\Big]=0$$

mais $(a_0,a_1)$ s'estime **de la première paire seule** — ce qui *ignore l'information sur le second moment*. Le QMLE, lui, exploite cette information en pondérant, et gagne en précision.

⚠️ **La richesse du mécanisme** : une seule hypothèse engendre une **infinité** de conditions valides, une par instrument. Le choix des instruments détermine l'efficacité — c'est tout le sujet du GMM optimal.

</details>

**Comparison** — MLE et GMM : quel est leur rapport exact ?

<details><summary>Réponse</summary>

**Ce ne sont pas des méthodes rivales : le MLE est un cas particulier du GMM.**

Les conditions du premier ordre du MLE sont

$$\sum_{t=1}^T\frac{\partial\ln p(x_t,\theta)}{\partial\theta}=0$$

En posant $f=\dfrac{\partial\ln p(x,\theta)}{\partial\theta}$ — le **vecteur de score** —, c'est exactement le système GMM $\frac1T\sum_tf(x_t,\hat\theta)=0$.

**La preuve de validité des moments** est d'ailleurs immédiate : $\mathbb E[\text{score}]=0$ à la vraie valeur, c'est la première identité de la fiche 66.

|  | **MLE** | **GMM** |
|---|---|---|
| Ce qu'il faut connaître | la densité **entière** | quelques **moments** |
| Fonction de moment | le **score** | libre |
| Efficacité | **optimale** (Cramér-Rao) | moindre |
| Robustesse | faible — dépend de la densité | **élevée** |

**L'exemple qui illustre le lien.** Les conditions d'optimalité du MLE gaussien sont

$$\hat{\mathbb E}(x_t-\hat\mu)=0, \qquad \hat{\mathbb E}\big[(x_t-\hat\mu)^2\big]-\hat\sigma^2=0$$

*identiques aux conditions GMM* de l'exemple moyenne-variance. Le score gaussien **est** le vecteur de moments naturel.

**La conséquence méthodologique.** Quand on ne sait pas quels moments choisir, on **écrit une vraisemblance** — même approximative — et l'on prend son score. *Le MLE est souvent une façon commode de déterminer quelles conditions de moment imposer.* C'est le principe du **QMLE**.

</details>

**Exam-style** — Expliquez le QMLE, sa justification et ses limites.

<details><summary>Réponse</summary>

**La définition.** *L'approche consistant à utiliser une fonction de vraisemblance **incorrecte** — typiquement gaussienne — pour estimer s'appelle le **quasi-maximum de vraisemblance**.*

**La justification, en trois pas.**

1. *Avec un modèle incorrect $q(X,\theta)$, le MLE est un **cas particulier du GMM**.* Maximiser $q$ revient à annuler son score, donc à résoudre un système GMM de fonction de moment $f=\partial\ln q/\partial\theta$.
2. La question devient donc : **les conditions $\mathbb E[f(x,\theta_0)]=0$ sont-elles vraies ?** — une exigence bien plus faible que « $q$ est la vraie densité ».
3. Si oui, *les résultats du GMM s'appliquent* : consistance et normalité asymptotique.

**L'exemple canonique — l'AR($p$).** En faisant comme si les erreurs étaient gaussiennes, les conditions du premier ordre sont

$$\sum_t\big(x_{t-i}\varepsilon_{t+1}\big)=0,\quad i=0,\dots,p-1, \qquad \sum_t\varepsilon_{t+1}=0$$

Ces conditions n'expriment **que l'orthogonalité des résidus au passé** — elles découlent de la seule hypothèse $\mathbb E[\varepsilon_{t+1}\mid x_t,\dots,x_{t+1-p}]=0$. **Aucune normalité n'est requise.** *Le GMM justifie le QMLE.*

**L'exemple avec hétéroscédasticité.** En traitant $\varepsilon_t$ comme $N(0,b_0+b_1r_{t-1})$ :

$$\mathcal L(\theta)=\sum_t\left[-\frac12\ln\big(2\pi(b_0+b_1r_t)\big)-\frac{\big(r_{t+1}-a_0-a_1r_t\big)^2}{2(b_0+b_1r_t)}\right]$$

Deux conséquences :

- $(a_0,a_1)$ **ne peut plus être estimé séparément** de $(b_0,b_1)$ ;
- les conditions d'optimalité deviennent $\sum_t(1,r_t)^\top\frac{\varepsilon_{t+1}}{b_0+b_1r_t}=0$ — *ce ne sont plus les MCO mais les **MCG**, plus précises : on **sous-pondère les résidus à forte variance***.

**Les limites — trois points à mentionner.**

1. **Perte d'efficacité.** *Les estimations MLE sont optimales : elles ont la plus petite variance asymptotique.* Avec une vraisemblance fausse, on garde la consistance mais on perd l'optimalité.
2. **Écarts-types faux.** La formule d'écart-type du MLE — fondée sur l'information de Fisher — **suppose le modèle correct**. Après un QMLE, il faut les écarts-types **robustes** du GMM.
3. **La validité n'est pas automatique.** *Ne pas l'utiliser aveuglément : vérifier que les conditions de moment sont valides.* Si l'on modélisait une variance conditionnelle **fausse** dans l'exemple ci-dessus, les conditions pondérées cesseraient d'être des moments valides et l'estimateur serait biaisé.

**La conclusion du cours.** *Le QMLE aide à spécifier les moments du GMM.* C'est sa vraie fonction : un **générateur de conditions de moment**, dont la validité doit ensuite être établie indépendamment de la loi supposée.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les trois méthodes d'estimation ? | **MLE** · **QMLE** · **GMM** |
| Laquelle est la plus précise ? | Le **MLE** — densité entièrement connue |
| Lesquelles sont plus robustes ? | **QMLE et GMM** |
| Définition de la consistance ? | $\mathrm{plim}_{T\to\infty}\hat\theta=\theta_0$ |
| Énoncé du TCL ? | $\frac1{\sqrt T}\sum_t(x_t-\mu)\Rightarrow N(0,\Omega)$ |
| Inégalité de Jensen ? | $f$ concave ⟹ $\mathbb E[f(x)]\leq f(\mathbb E[x])$ |
| Que représente-t-elle en finance ? | L'**aversion au risque** |
| Le fondement du MLE ? | $\mathbb E[\ln p(x,\tilde\theta)]\leq\mathbb E[\ln p(x,\theta_0)]$ |
| Comment se démontre-t-il ? | Par **Jensen** et $\int p(x,\tilde\theta)dx=1$ |
| Définition de la vraisemblance ? | $\mathcal L(\theta)=\ln p(X,\theta)$ |
| Que traite-t-elle comme fixé ? | Les **observations** $X$ |
| EMV de la loi exponentielle ? | $\hat\lambda=1/\bar x$ |
| Vraisemblance d'observations dépendantes ? | $\sum_{t=L}^{T-1}\ln p(x_{t+1}\mid x_t,\dots,x_{t+1-L};\theta)$ |
| Quelle condition sur la dépendance ? | Elle doit **s'éteindre assez vite** |
| EMV d'un AR($p$) gaussien ? | Identique aux **MCO** |
| Pourquoi ? | Le terme en $\sigma$ ne dépend pas de $a$ |
| Conditions d'optimalité du VAR ? | $\sum_tx_{t-i}\varepsilon_{t+1}^\top=0$ et $\sum_t\varepsilon_{t+1}=0$ |
| Comment estimer un VAR ? | Par **MCO équation par équation** |
| Critère de sélection d'ordre ? | $\arg\max\frac2T\mathcal L(\theta;p)-\text{pénalité}(p)$ |
| Pénalité AIC ? | $2pN^2/T$ |
| Pénalité BIC ? | $\ln(T)pN^2/T$ |
| Lequel choisit un ordre plus faible ? | Le **BIC** |
| Exemple du PIB ? | AIC ⟹ $p=5$, BIC ⟹ $p=1$ |
| Condition de validité du GMM ? | $\mathbb E[f(x_t,\theta_0)]=0$ |
| Condition d'identification ? | $\sum_j(\mathbb E[f_j(x_t,\theta)])^2>0$ si $\theta\neq\theta_0$ |
| Définition de l'estimateur GMM ? | $\frac1T\sum_tf(x_t,\hat\theta)=0$ |
| Moments pour moyenne et variance ? | $x_t-\mu$ et $(x_t-\mu)^2-\sigma^2$ |
| Comment le MLE devient-il un GMM ? | En prenant le **score** $\partial\ln p/\partial\theta$ pour moment |
| Que donne $\mathbb E[\varepsilon_{t+1}\mid r_t]=0$ ? | $\mathbb E[g(r_t)\varepsilon_{t+1}]=0$ pour **toute** $g$ |
| Définition du QMLE ? | Maximiser une vraisemblance **incorrecte** |
| Qu'est-ce qui le justifie ? | Le **GMM** — si les moments sont valides |
| Que devient l'estimation avec hétéroscédasticité ? | Des **MCG**, pas des MCO |
| Pourquoi est-ce plus précis ? | On **sous-pondère** les résidus à forte variance |
| Quelle précaution le cours impose-t-il ? | **Vérifier la validité** des conditions de moment |
