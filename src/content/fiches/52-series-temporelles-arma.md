# Fiche 52 — Séries temporelles I : stationnarité, Wold, ARMA et racines unitaires

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Kempthorne, *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 8 « Time Series Analysis I » |
| **Difficulté** | Must know — l'outil de base de l'économétrie des marchés |
| **Temps d'étude estimé** | 2 h 45 |
| **Prérequis** | Fiche 50 (moindres carrés, projection linéaire), notions de variance et covariance |
| **Concepts clés** | Stationnarité stricte et en covariance, autocorrélation, théorème de représentation de Wold, opérateur retard, réponse impulsionnelle, inversibilité, ARMA, AR(p), équations de Yule-Walker, MA(q), différenciation, ARIMA, AIC/BIC/HQ, test de Dickey-Fuller |
| **Poids à l'examen** | Quatre choses : la **définition** de la stationnarité en covariance, la **condition sur les racines** du polynôme caractéristique, les **moments de l'AR(1)**, et la **logique du test de racine unitaire**. |

## 🎯 Vue d'ensemble

Un **processus stochastique** $\{\dots,X_{t-1},X_t,X_{t+1},\dots\}$ constitué de variables aléatoires indexées par un indice de temps $t$ est une **série temporelle**. Le comportement stochastique de $\{X_t\}$ est déterminé en spécifiant les densités

$$p(x_{t_1},x_{t_2},\dots,x_{t_m})$$

pour toutes les collections finies d'indices $\{(t_1,\dots,t_m),\ m<\infty\}$ — c'est-à-dire **toutes les distributions de dimension finie** de $\{X_t\}$.

```
STATIONNARITÉ    l'hypothèse qui rend l'estimation possible
     ↓
WOLD             toute série stationnaire = déterministe + MA(∞)
     ↓
ARMA(p,q)        l'approximation parcimonieuse et utilisable
     ↓
ARIMA(p,d,q)     ce qu'on fait quand la série n'est PAS stationnaire
     ↓
DICKEY-FULLER    comment savoir dans quel cas on est
```

> **La question qui structure tout le chapitre.** On n'observe qu'**une seule** trajectoire de la série. Comment estimer quoi que ce soit à partir d'une réalisation unique ? Réponse : en supposant que la loi **ne change pas au cours du temps** — c'est la stationnarité, et elle est ce qui permet de remplacer une moyenne d'ensemble inobservable par une moyenne temporelle calculable.

## 🔴 Concept 1 — Les deux stationnarités

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — stationnarité stricte.</span>

Une série temporelle $\{X_t\}$ est **strictement stationnaire** si

$$p(t_1+\tau,\ t_2+\tau,\ \dots,\ t_m+\tau)=p(t_1,t_2,\dots,t_m) \qquad \forall\tau,\ \forall m,\ \forall(t_1,\dots,t_m)$$

*(invariance par translation du temps)*

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — stationnarité en covariance.</span>

Une série temporelle $\{X_t\}$ est **stationnaire en covariance** si

$$E(X_t)=\mu, \qquad \mathrm{Var}(X_t)=\sigma_X^2, \qquad \mathrm{Cov}(X_t,X_{t+\tau})=\gamma(\tau)$$

*toutes constantes au cours du temps $t$.*

</div>

**La fonction d'autocorrélation** de $\{X_t\}$ est

$$\rho(\tau)=\frac{\mathrm{Cov}(X_t,X_{t+\tau})}{\sqrt{\mathrm{Var}(X_t)\cdot\mathrm{Var}(X_{t+\tau})}}=\frac{\gamma(\tau)}{\gamma(0)}$$

> **La différence entre les deux, en une phrase.** La stationnarité **stricte** contraint **toute la loi jointe** ; la stationnarité **en covariance** ne contraint que les **deux premiers moments**. La stricte implique la seconde (si les moments existent) ; la réciproque est fausse en général — mais **vraie pour un processus gaussien**, puisqu'une loi gaussienne est entièrement déterminée par ses deux premiers moments.

⚠️ **La stationnarité en covariance est celle qu'on utilise partout**, parce que c'est celle qu'on peut vérifier et exploiter. Elle est parfois appelée « stationnarité au sens faible » ou « du second ordre ».

⚠️ **Ce que $\gamma(\tau)$ ne dépend pas de $t$ signifie** : la covariance entre deux instants ne dépend que de **l'écart** qui les sépare, jamais de leur position absolue. C'est exactement ce qui permet d'estimer $\gamma(\tau)$ en moyennant sur $t$.

## 🔴 Concept 2 — Le théorème de représentation de Wold

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème de Wold.</span>

Toute série temporelle stationnaire $\{X_t\}$ peut être décomposée en

$$X_t=V_t+S_t$$

où :

- $\{V_t\}$ est un processus **linéairement déterministe**, c'est-à-dire une combinaison linéaire des valeurs passées de $V_t$ à coefficients constants ;
- $\displaystyle S_t=\sum_{i=0}^\infty\psi_i\,\epsilon_{t-i}$ est un processus **moyenne mobile infinie** de termes d'erreur, avec $$\psi_0=1, \qquad \sum_{i=0}^\infty\psi_i^2<\infty$$
- $\{\epsilon_t\}$ est un **bruit blanc linéairement imprévisible** : $$E(\epsilon_t)=0, \qquad E(\epsilon_t^2)=\sigma^2, \qquad E(\epsilon_t\epsilon_s)=0\ \ \forall t,s\neq t$$
- et $\{\epsilon_t\}$ est **non corrélé** avec $\{V_t\}$ : $E(\epsilon_tV_s)=0,\ \forall t,s$.

</div>

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi c'est le théorème fondateur.</span>

Il dit qu'il n'existe **aucune** autre forme de série stationnaire : **toute** série stationnaire est une partie prévisible plus une moyenne mobile infinie d'innovations. Modéliser une série stationnaire, c'est donc nécessairement estimer $\{\psi_i\}$ — le seul problème est qu'il y en a une infinité.

</div>

⚠️ **Attention au sens de « déterministe » ici.** $V_t$ est **linéairement** déterministe : il est parfaitement prédictible par une combinaison linéaire de son propre passé. Ce n'est pas une fonction connue du temps, c'est la partie de la série qui ne contient **aucune information nouvelle**.

⚠️ **Le bruit blanc de Wold n'est pas forcément i.i.d.** — il est seulement **non corrélé**. C'est une différence capitale en finance : les rendements sont à peu près non corrélés, mais leurs **carrés** ne le sont pas du tout (volatilité groupée). Un bruit blanc peut donc être très loin d'être imprévisible au sens fort.

### Application intuitive du théorème de Wold

Supposons qu'on veuille spécifier une série stationnaire en covariance $\{X_t\}$ pour modéliser les données réelles $\{x_t,\ t=0,1,\dots,T\}$. La stratégie du cours :

**Étape 1 — initialiser $p$**, le nombre d'observations passées dans le terme linéairement déterministe de la décomposition de Wold.

**Étape 2 — estimer la projection linéaire** de $X_t$ sur $(X_{t-1},X_{t-2},\dots,X_{t-p})$. On prend un échantillon d'estimation de taille $n$ de point final $t_0\leq T$, on indexe par $\{j=-(p-1),\dots,0,1,\dots,n\}$ la sous-série correspondante et l'on pose $y_j=x_{t_0-n+j}$ (avec $t_0\geq n+p$). On définit

$$y=\begin{pmatrix}y_1\\y_2\\\vdots\\y_n\end{pmatrix}, \qquad Z=\begin{pmatrix}1&y_0&y_{-1}&\cdots&y_{-(p-1)}\\ 1&y_1&y_0&\cdots&y_{-(p-2)}\\ \vdots&\vdots&\vdots&\ddots&\vdots\\ 1&y_{n-1}&y_{n-2}&\cdots&y_{n-p}\end{pmatrix}$$

et l'on **applique les MCO** :

$$\hat y=Z(Z^TZ)^{-1}Z^Ty=\hat P(Y_t\mid Y_{t-1},Y_{t-2},\dots,Y_{t-p})=\hat y^{(p)}$$

> **Reconnaissez la fiche 50.** $Z(Z^TZ)^{-1}Z^T$ est la **matrice chapeau** : ajuster une AR($p$), c'est **exactement** faire une régression linéaire dont les explicatives sont les retards de la variable expliquée.

**Étape 3 — calculer le résidu de projection** $\hat\epsilon^{(p)}=y-\hat y^{(p)}$.

**Étape 4 — appliquer les méthodes de séries temporelles à la série des résidus** $\{\hat\epsilon_j^{(p)}\}$ pour spécifier un modèle moyenne mobile

$$\epsilon_t^{(p)}=\sum_{i\geq0}\theta_i\,\eta_{t-i}$$

ce qui fournit $\{\hat\theta_j\}$ et $\{\hat\eta_t\}$, estimations des paramètres et des innovations.

**Étape 5 — conduire une analyse de cas diagnostiquant la cohérence avec les hypothèses du modèle :**

- Évaluer l'**orthogonalité** de $\hat\epsilon^{(p)}$ à $Y_{t-s}$, $s>p$. **S'il y a des signes de corrélation, augmenter $p$ et recommencer.**
- Évaluer la cohérence de $\{\hat\eta_t\}$ avec les hypothèses de **bruit blanc** du théorème. Sinon, envisager des révisions du modèle global : changer la spécification du modèle moyenne mobile, ou ajouter d'autres variables « déterministes » au modèle de projection.

> **Note théorique du cours.** *Théoriquement, $\lim_{p\to\infty}\hat y^{(p)}=\hat y=P(Y_t\mid Y_{t-1},Y_{t-2},\dots)$, mais si $p\to\infty$ est requis, alors il faut $n\to\infty$ avec $p/n\to0$.* Les **modèles utiles** de séries stationnaires ont des valeurs **finies et modestes** de $p$, et/ou incluent des modèles moyenne mobile dépendant d'un **nombre parcimonieux** de paramètres.

⚠️ **Voilà le vrai sujet du chapitre.** Wold garantit une représentation MA($\infty$) ; la pratique exige un nombre **fini** de paramètres. Toute la construction ARMA n'est qu'une manière d'approcher les $\{\psi_i\}$ infinis par un **quotient de deux polynômes courts**.

## 🟠 Concept 3 — L'opérateur retard et ses conséquences

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

L'**opérateur retard** $L(\cdot)$ décale une série temporelle d'un incrément de temps vers le passé : $L(X_t)=X_{t-1}$.

</div>

En l'appliquant récursivement :

$$L^0(X_t)=X_t, \quad L^1(X_t)=X_{t-1}, \quad L^2(X_t)=L(L(X_t))=X_{t-2}, \quad \dots, \quad L^n(X_t)=X_{t-n}$$

Les inverses sont bien définis : $L^{-n}(X_t)=X_{t+n}$ pour $n=1,2,\dots$

**La représentation de Wold en notation d'opérateur.**

$$X_t=\sum_{i=0}^\infty\psi_i\epsilon_{t-i}+V_t=\sum_{i=0}^\infty\psi_iL^i(\epsilon_t)+V_t=\psi(L)\epsilon_t+V_t, \qquad \psi(L)=\sum_{i=0}^\infty\psi_iL^i$$

> **L'intérêt de la notation.** Elle transforme des **convolutions infinies** en **produits de polynômes**. Toutes les manipulations qui suivent — inversion, factorisation, différenciation — sont de l'algèbre élémentaire sur des séries formelles.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — fonction de réponse impulsionnelle.</span>

La *Impulse Response Function* du processus stationnaire $\{X_t\}$ est

$$IR(j)=\frac{\partial X_t}{\partial\epsilon_{t-j}}=\psi_j$$

et la **réponse cumulée de long terme** est

$$\sum_{j=0}^\infty IR(j)=\sum_{i=0}^\infty\psi_i=\psi(L)\ \text{ avec }\ L=1$$

</div>

<div class="callout" data-kind="intu">

<span class="callout__lab">Lecture économique.</span>

$IR(j)$ répond à : « si une innovation de taille $1$ frappe le système aujourd'hui, de combien la série sera-t-elle décalée dans $j$ périodes ? » La somme $\psi(1)$ mesure l'**effet total permanent** d'un choc. Pour un processus stationnaire elle est **finie** ; pour une marche aléatoire elle est infinie — le choc ne s'estompe jamais.

</div>

### Représentation autorégressive équivalente

Supposons que l'opérateur $\psi(L)$ soit **inversible**, c'est-à-dire qu'il existe

$$\psi^{-1}(L)=\sum_{i=0}^\infty\pi_iL^i \quad\text{tel que}\quad \psi^{-1}(L)\psi(L)=I=L^0$$

Alors, en supposant $V_t=0$ (la série a été ajustée en $X_t\leftarrow X_t-V_t$), les deux écritures suivantes sont équivalentes :

$$X_t=\psi(L)\epsilon_t \qquad\Longleftrightarrow\qquad \psi^{-1}(L)X_t=\epsilon_t$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Quand $\psi^{-1}(L)$ existe, la série $\{X_t\}$ est **inversible** et admet une **représentation autorégressive** :

$$X_t=\Big(\sum_{i\geq0}\pi_iX_{t-i}\Big)+\epsilon_t$$

</div>

> **La dualité AR / MA est le cœur de tout le chapitre.** Une MA finie est une AR infinie, et une AR finie est une MA infinie. C'est ce qui rend ARMA($p,q$) si efficace : quelques paramètres de chaque côté engendrent une structure de dépendance très riche.

## 🔴 Concept 4 — Les modèles ARMA($p,q$)

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

La série $\{X_t\}$ suit le modèle **ARMA($p,q$)**, d'ordre autorégressif $p$ et d'ordre moyenne mobile $q$, si

$$X_t=\mu+\phi_1(X_{t-1}-\mu)+\phi_2(X_{t-2}-\mu)+\cdots+\phi_p(X_{t-p}-\mu)+\epsilon_t+\theta_1\epsilon_{t-1}+\theta_2\epsilon_{t-2}+\cdots+\theta_q\epsilon_{t-q}$$

où $\{\epsilon_t\}$ est un $WN(0,\sigma^2)$ — un « bruit blanc » avec

$$E(\epsilon_t)=0\ \forall t, \qquad E(\epsilon_t^2)=\sigma^2<\infty\ \forall t, \qquad E(\epsilon_t\epsilon_s)=0,\ t\neq s$$

</div>

**Avec les opérateurs retard**, en posant

$$\phi(L)=1-\phi_1L-\phi_2L^2-\cdots-\phi_pL^p, \qquad \theta(L)=1+\theta_1L+\theta_2L^2+\cdots+\theta_qL^q$$

on écrit

$$\boxed{\ \phi(L)\cdot(X_t-\mu)=\theta(L)\,\epsilon_t\ }$$

et la décomposition de Wold est

$$X_t=\mu+\psi(L)\epsilon_t, \qquad \psi(L)=[\phi(L)]^{-1}\theta(L)$$

> **Voilà la réponse au problème posé par Wold.** Les coefficients $\{\psi_i\}$, en nombre infini, sont obtenus comme le développement d'une **fraction rationnelle** de deux polynômes de degrés $p$ et $q$. On a résumé une infinité de paramètres par $p+q+2$.

## 🔴 Concept 5 — Les modèles AR($p$)

**Définition.** Modèle autorégressif d'ordre $p$ :

$$\phi(L)\cdot(X_t-\mu)=\epsilon_t, \qquad \{\epsilon_t\}\sim WN(0,\sigma^2), \qquad \phi(L)=1-\phi_1L-\phi_2L^2-\cdots-\phi_pL^p$$

**Propriétés.**

- Une **combinaison linéaire** de $\{X_t,X_{t-1},\dots,X_{t-p}\}$ est un $WN(0,\sigma^2)$.
- $X_t$ suit un **modèle de régression linéaire** sur les variables explicatives $(X_{t-1},\dots,X_{t-p})$ : $$X_t=c+\sum_{j=1}^p\phi_jX_{t-j}+\epsilon_t, \qquad c=\mu\cdot\phi(1)$$ (en remplaçant $L$ par $1$ dans $\phi(L)$, soit $c=\mu(1-\phi_1-\cdots-\phi_p)$).

> **Le pont avec la fiche 50 est explicite.** Un AR($p$) **est** une régression linéaire. Tout l'appareil des MCO s'y applique — mais attention, les hypothèses de Gauss-Markov demandent réflexion : les régresseurs sont **aléatoires** et corrélés aux erreurs passées, si bien que les propriétés ne sont plus qu'**asymptotiques**.

### Conditions de stationnarité

On considère $\phi(z)$ en remplaçant $L$ par une variable **complexe** $z$ :

$$\phi(z)=1-\phi_1z-\phi_2z^2-\cdots-\phi_pz^p$$

Soient $\lambda_1,\lambda_2,\dots,\lambda_p$ les $p$ racines de $\phi(z)=0$. Alors

$$\phi(L)=\Big(1-\frac{1}{\lambda_1}L\Big)\Big(1-\frac{1}{\lambda_2}L\Big)\cdots\Big(1-\frac{1}{\lambda_p}L\Big)$$

> **Résultat central.** *$\{X_t\}$ est stationnaire en covariance **si et seulement si** toutes les racines de $\phi(z)=0$ (l'« **équation caractéristique** ») sont **en dehors du cercle unité** $\{z:\lvert z\rvert\leq1\}$, c'est-à-dire $\lvert\lambda_j\rvert>1$, $j=1,\dots,p$.*

**Pourquoi.** Pour un nombre complexe $\lambda$ avec $\lvert\lambda\rvert>1$ :

$$\Big(1-\frac1\lambda L\Big)^{-1}=\sum_{i=0}^\infty\Big(\frac1\lambda\Big)^iL^i=1+\frac1\lambda L+\Big(\frac1\lambda\Big)^2L^2+\Big(\frac1\lambda\Big)^3L^3+\cdots$$

qui **converge** précisément parce que $\lvert1/\lambda\rvert<1$. D'où

$$\phi^{-1}(L)=\prod_{j=1}^p\Big(1-\frac{1}{\lambda_j}L\Big)^{-1}$$

et la représentation MA($\infty$) — la décomposition de Wold — existe.

⚠️ **L'erreur classique.** « Les racines sont **en dehors** du cercle unité » porte sur les racines de $\phi(z)$, où $z$ est la variable **du polynôme en $L$**. Certains manuels énoncent la condition sur les **valeurs propres** de la matrice compagnon, qui sont les **inverses** $1/\lambda_j$ : la condition devient alors « **à l'intérieur** ». Les deux énoncés disent la même chose ; c'est la variable qui change. Vérifiez toujours laquelle est utilisée.

## 🔴 Concept 6 — Le modèle AR(1) en détail

Supposons que $\{X_t\}$ suive le processus AR(1) :

$$X_t-\mu=\phi(X_{t-1}-\mu)+\epsilon_t, \qquad t=1,2,\dots, \qquad \epsilon_t\sim WN(0,\sigma^2)$$

**L'équation caractéristique** est $(1-\phi z)=0$, de racine $\lambda=1/\phi$. Le modèle est stationnaire en covariance **si et seulement si**

$$\lvert\phi\rvert<1 \qquad(\text{de façon équivalente } \lvert\lambda\rvert>1)$$

**Les moments.**

$$E(X_t)=\mu$$

$$\mathrm{Var}(X_t)=\sigma_X^2=\frac{\sigma^2}{1-\phi^2}\qquad(=\gamma(0))$$

$$\mathrm{Cov}(X_t,X_{t-1})=\phi\cdot\sigma_X^2, \qquad \mathrm{Cov}(X_t,X_{t-j})=\phi^j\cdot\sigma_X^2\qquad(=\gamma(j))$$

$$\mathrm{Corr}(X_t,X_{t-j})=\phi^j=\rho(j)$$

> **L'autocorrélation décroît **géométriquement**.** C'est la signature de l'AR(1) : $\rho(j)=\phi^j$ décroît exponentiellement et ne s'annule jamais exactement — à comparer avec le MA($q$), dont l'autocorrélation **tombe brutalement à zéro** au-delà du retard $q$.

**La décomposition de Wold.** Pour $\lvert\phi\rvert<1$ :

$$X_t=\mu+\sum_{j=0}^\infty\phi^j\epsilon_{t-j}$$

**Les trois régimes.**

| Valeur de $\phi$ | Comportement |
|---|---|
| $0<\phi<1$ | **retour exponentiel à la moyenne** $\mu$ |
| $-1<\phi<0$ | retour exponentiel **oscillant** à la moyenne $\mu$ |
| $\phi=1$ | la décomposition de Wold **n'existe pas** : c'est la **marche aléatoire simple** (non stationnaire !) |
| $\phi>1$ | le processus AR(1) est **explosif** |

**Exemples d'AR(1) à retour à la moyenne ($0<\phi<1$) cités par le cours :**

- **Taux d'intérêt** (processus d'Ornstein-Uhlenbeck ; modèle de Vasicek)
- **Écarts de taux d'intérêt** (*spreads*)
- **Taux de change réels**
- **Ratios de valorisation** (dividende sur prix, bénéfice sur prix)

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ces variables-là et pas les prix.</span>

Ce sont toutes des grandeurs **bornées économiquement** : un taux ne peut pas dériver indéfiniment, un ratio de valorisation non plus. Le prix d'une action, lui, n'a pas de niveau d'équilibre — d'où $\phi\approx1$ et la marche aléatoire.

</div>

## 🟠 Concept 7 — Les équations de Yule-Walker

**Moments d'ordre 2 des processus AR($p$).** À partir de la spécification

$$(X_t-\mu)=\phi_1(X_{t-1}-\mu)+\phi_2(X_{t-2}-\mu)+\cdots+\phi_p(X_{t-p}-\mu)+\epsilon_t$$

on multiplie par $(X_{t-j}-\mu)$ et l'on prend l'espérance :

$$E[(X_t-\mu)(X_{t-j}-\mu)]=\phi_1E[(X_{t-1}-\mu)(X_{t-j}-\mu)]+\cdots+\phi_pE[(X_{t-p}-\mu)(X_{t-j}-\mu)]+E[\epsilon_t(X_{t-j}-\mu)]$$

soit les **équations de Yule-Walker** ($j=0,1,\dots$) :

$$\gamma(j)=\phi_1\gamma(j-1)+\phi_2\gamma(j-2)+\cdots+\phi_p\gamma(j-p)+\delta_{0,j}\sigma^2$$

**Les équations $j=1,\dots,p$ forment un système linéaire de $p$ équations en les $\phi_j$ :**

$$\begin{pmatrix}\gamma(1)\\\gamma(2)\\\vdots\\\gamma(p)\end{pmatrix}=\begin{pmatrix}\gamma(0)&\gamma(-1)&\gamma(-2)&\cdots&\gamma(-(p-1))\\ \gamma(1)&\gamma(0)&\gamma(-1)&\cdots&\gamma(-(p-2))\\ \vdots&\vdots&\vdots&\ddots&\vdots\\ \gamma(p-1)&\gamma(p-2)&\gamma(p-3)&\cdots&\gamma(0)\end{pmatrix}\begin{pmatrix}\phi_1\\\phi_2\\\vdots\\\phi_p\end{pmatrix}$$

> **Les estimateurs de Yule-Walker.** Étant donné des estimations $\hat\gamma(j)$, $j=0,\dots,p$ (et $\hat\mu$), la solution de ces équations donne les **estimations de Yule-Walker** des $\phi_j$ ; on utilise la propriété $\gamma(-j)=\gamma(+j)$, $\forall j$.

**Et l'équation $j=0$ fournit $\sigma^2$.** De

$$\gamma(0)=\phi_1\gamma(-1)+\phi_2\gamma(-2)+\cdots+\phi_p\gamma(-p)+\sigma^2$$

on tire

$$\hat\sigma^2=\hat\gamma(0)-\sum_{j=1}^p\hat\phi_j\,\hat\gamma(j)$$

> **Quand toutes les estimations $\hat\gamma(j)$ et $\hat\mu$ sont sans biais, les estimateurs de Yule-Walker appliquent le principe d'estimation par la méthode des moments.**

⚠️ **La matrice ci-dessus est une matrice de Toeplitz symétrique** : elle est constante le long de chaque diagonale, puisque $\gamma$ ne dépend que de l'écart. Cette structure permet une résolution en $O(p^2)$ (algorithme de Levinson-Durbin) au lieu de $O(p^3)$.

## 🟠 Concept 8 — Les modèles MA($q$)

**Définition.** Modèle moyenne mobile d'ordre $q$ :

$$(X_t-\mu)=\theta(L)\epsilon_t, \qquad \{\epsilon_t\}\sim WN(0,\sigma^2), \qquad \theta(L)=1+\theta_1L+\theta_2L^2+\cdots+\theta_qL^q$$

**Propriétés.**

- Le processus $\{X_t\}$ est **inversible** si toutes les racines de $\theta(z)=0$ sont **en dehors** du cercle unité complexe.
- Les moments de $X_t$ sont : $$E(X_t)=\mu, \qquad \mathrm{Var}(X_t)=\gamma(0)=\sigma^2\cdot(1+\theta_1^2+\theta_2^2+\cdots+\theta_q^2)$$ $$\mathrm{Cov}(X_t,X_{t+j})=\begin{cases}0 & j>q\\[2pt] \sigma^2\cdot(\theta_j+\theta_{j+1}\theta_1+\theta_{j+2}\theta_2+\cdots+\theta_q\theta_{q-j}) & 1\leq j\leq q\end{cases}$$

> **La signature du MA($q$) est la coupure nette.** $\gamma(j)=0$ dès que $j>q$ — parce que $X_t$ et $X_{t+j}$ ne partagent **aucune** innovation commune quand l'écart dépasse la mémoire $q$ du filtre. C'est **le** critère d'identification pratique : si l'autocorrélogramme empirique tombe à zéro après le retard $q$, pensez MA($q$) ; s'il décroît géométriquement sans jamais s'annuler, pensez AR.

⚠️ **Noter la dissymétrie des deux conditions.** Pour l'AR, les racines hors du cercle unité donnent la **stationnarité**. Pour le MA, elles donnent l'**inversibilité**. Un MA($q$) est **toujours stationnaire** (c'est une somme finie de bruits blancs, ses moments ne dépendent jamais de $t$) — l'inversibilité est une question distincte : peut-on retrouver les innovations à partir des observations ?

## 🔴 Concept 9 — Non-stationnarité et différenciation

> *De nombreuses séries économiques présentent un comportement non stationnaire compatible avec des marches aléatoires. Box et Jenkins préconisent de retirer le comportement de tendance non stationnaire à l'aide d'opérateurs de différenciation.*

$$\Delta=1-L, \qquad \Delta^2=(1-L)^2=1-2L+L^2, \qquad \Delta^k=(1-L)^k=\sum_{j=0}^k\binom kj(-L)^j \quad (k>0 \text{ entier})$$

- Si le processus $\{X_t\}$ a une **tendance linéaire** en temps, alors $\{\Delta X_t\}$ **n'a pas** de tendance.
- Si $\{X_t\}$ a une **tendance quadratique**, alors le processus **doublement différencié** $\{\Delta^2X_t\}$ n'a pas de tendance.

### Deux processus non stationnaires à ne surtout pas confondre

**(a) Modèle à retour vers une tendance linéaire (*trend stationary*).**

$$X_t=TD_t+\varepsilon_t, \qquad TD_t=a+bt \text{ (tendance déterministe linéaire)}, \qquad \varepsilon_t\sim AR(1)$$

avec $\varepsilon_t=\rho\varepsilon_{t-1}+\eta_t$, $\lvert\rho\rvert<1$ et $\{\eta_t\}\sim WN(0,\sigma^2)$.

Les moments de $\{X_t\}$ :

$$E(X_t)=E(TD_t)+E(\varepsilon_t)=a+bt, \qquad \mathrm{Var}(X_t)=\mathrm{Var}(\varepsilon_t)=\frac{\sigma^2}{1-\rho^2}$$

Le processus différencié s'écrit

$$\Delta X_t=b+\Delta\varepsilon_t=b+(\varepsilon_t-\varepsilon_{t-1})=b+(1-L)\varepsilon_t=b+(1-L)(1-\rho L)^{-1}\eta_t$$

**(b) Processus purement intégré I(1).**

$$X_t=X_{t-1}+\eta_t, \qquad \{\eta_t\}\sim WN(0,\sigma^2)$$

soit, de façon équivalente, $\Delta X_t=(1-L)X_t=\eta_t$. Étant donné $X_0$ :

$$X_t=X_0+TS_t, \qquad TS_t=\sum_{j=0}^t\eta_j$$

Le processus $\{TS_t\}$ est un processus à **tendance stochastique** : $TS_t=TS_{t-1}+\eta_t$.

> **Notes du cours.** *Le processus à tendance stochastique **n'est pas parfaitement prévisible**. Le processus $\{X_t\}$ est une **marche aléatoire simple** à pas bruit blanc. Il est non stationnaire car, étant donné $X_0$ :*
>
> $$\mathrm{Var}(X_t)=t\sigma^2, \qquad \mathrm{Cov}(X_t,X_{t-j})=(t-j)\sigma^2 \ \text{ pour } 0<j<t$$
>
> $$\mathrm{Corr}(X_t,X_{t-j})=\frac{t-j}{\sqrt{t(t-j)}}=\sqrt{1-j/t}$$

> **Comparez les deux.** Dans (a) la variance est **constante** et les chocs s'estompent : la série revient à sa tendance. Dans (b) la variance **croît linéairement avec $t$** et les chocs sont **permanents** : la série n'a aucun niveau vers lequel revenir. Et remarquez la corrélation $\sqrt{1-j/t}$ : pour $t$ grand elle reste **proche de 1** même à grand écart $j$ — c'est l'illusion d'une forte dépendance qui produit les fameuses **régressions fallacieuses**.

⚠️ **La conséquence pratique est brutale.** Différencier un processus (a) qui n'en avait pas besoin introduit un MA non inversible ; ne pas différencier un processus (b) qui en avait besoin produit des régressions et des tests entièrement faux. C'est **exactement** pourquoi les tests de racine unitaire existent.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — ARIMA($p,d,q$).</span>

La série $\{X_t\}$ suit un modèle **ARIMA($p,d,q$)** (« ARMA intégré ») si $\{\Delta^dX_t\}$ est **stationnaire** (et non stationnaire pour une différenciation d'ordre inférieur) et suit un modèle ARMA($p,q$).

</div>

**Les trois questions que pose ce modèle :**

1. **Déterminer l'ordre de différenciation** requis pour retirer les tendances temporelles (déterministes ou stochastiques).
2. **Estimer** les paramètres inconnus d'un modèle ARIMA($p,d,q$).
3. **Sélectionner le modèle** : choisir parmi des modèles alternatifs de spécifications $(p,d,q)$ différentes.

## 🟡 Concept 10 — Estimation et sélection de modèle

**Estimation par maximum de vraisemblance.**

1. Supposer que les $\{\epsilon_t\}$ sont des variables i.i.d. $N(0,\sigma^2)$.
2. Exprimer le modèle ARMA($p,q$) sous **forme espace-état**.
3. Appliquer la **décomposition en erreurs de prédiction** de la log-vraisemblance.
4. Appliquer l'une ou l'autre méthode — ou les deux :
  - **LIML** (*Limited Information Maximum-Likelihood*) : conditionner sur les $p$ premières valeurs de $\{X_t\}$ et supposer que les $q$ premières valeurs de $\{\epsilon_t\}$ sont **nulles**.
  - **FIML** (*Full Information Maximum-Likelihood*) : utiliser la **distribution stationnaire** des $p$ premières valeurs pour spécifier la vraisemblance **exacte**.

> **La différence entre les deux, en pratique.** LIML est bien plus simple : conditionner sur le début de la série évite d'avoir à écrire sa loi marginale. FIML est plus efficace, surtout sur les **échantillons courts**, où les $p$ premières observations pèsent lourd. Sur des séries financières longues, l'écart est négligeable.

**Critères de sélection de modèle.** Des critères statistiques servent à choisir les ordres $(p,q)$ :

1. Ajuster tous les modèles ARMA($p,q$) avec $0\leq p\leq p_{\max}$ et $0\leq q\leq q_{\max}$.
2. Soit $\tilde\sigma^2(p,q)$ l'**EMV** de $\sigma^2=\mathrm{Var}(\epsilon_t)$, la variance des innovations ARMA sous hypothèse gaussienne.
3. Choisir $(p,q)$ minimisant l'un de :

$$\textbf{AIC}(p,q)=\log\big(\tilde\sigma^2(p,q)\big)+2\cdot\frac{p+q}{n}$$

$$\textbf{BIC}(p,q)=\log\big(\tilde\sigma^2(p,q)\big)+\log(n)\cdot\frac{p+q}{n}$$

$$\textbf{HQ}(p,q)=\log\big(\tilde\sigma^2(p,q)\big)+2\log(\log(n))\cdot\frac{p+q}{n}$$

> **Ces trois critères ont la même structure : ajustement + pénalité.** Le premier terme récompense la réduction de la variance résiduelle, le second pénalise le nombre de paramètres $p+q$. **Ce qui les distingue est le poids de la pénalité** : $2$ pour l'AIC, $\log(n)$ pour le BIC, $2\log\log(n)$ pour Hannan-Quinn.
>
> Pour $n>7$, $\log(n)>2$ : **le BIC pénalise plus fort que l'AIC** et sélectionne donc des modèles **plus parcimonieux**. Le BIC est *consistant* (il retrouve le vrai modèle quand $n\to\infty$, si le vrai modèle est dans la liste) ; l'AIC ne l'est pas mais est *efficace* en prédiction. HQ est intermédiaire.

## 🔴 Concept 11 — Tester la stationnarité

> **Test de Dickey-Fuller (DF).** Supposons que $\{X_t\}$ suive le modèle AR(1)
>
> $$X_t=\phi X_{t-1}+\epsilon_t, \qquad \{\epsilon_t\}\sim WN(0,\sigma^2)$$
>
> On teste les hypothèses
>
> $$H_0:\ \phi=1 \quad (\textbf{racine unitaire, non-stationnarité})$$
>
> $$H_1:\ \lvert\phi\rvert<1 \quad (\textbf{stationnarité})$$
>
> (« test de racine unitaire autorégressive »).

**La statistique.** On ajuste le modèle AR(1) par moindres carrés et l'on définit

$$\hat t_{\phi=1}=\frac{\hat\phi-1}{se(\hat\phi)}$$

où $\hat\phi$ est l'estimateur des moindres carrés de $\phi$ et $se(\hat\phi)$ l'estimation MCO de son écart-type.

**Le comportement asymptotique — et c'est là tout l'intérêt du test :**

- Si $\lvert\phi\rvert<1$, alors $\ \sqrt T(\hat\phi-\phi)\ \xrightarrow{\ d\ }\ N\big(0,\ (1-\phi^2)\big)$.
- Si $\phi=1$, alors $\hat\phi$ est **super-consistant**, de vitesse $(1/T)$, et $\hat t_{\phi=1}$ suit la **distribution de Dickey-Fuller**.

> **Le point crucial à comprendre.** Sous $H_0$, la statistique **ne suit pas une loi de Student**. La loi limite est non standard — c'est une fonctionnelle de mouvement brownien — et ses quantiles sont **tabulés séparément** (ils sont plus négatifs que ceux de la normale). Utiliser les tables de Student ici conduit à **rejeter beaucoup trop souvent** la racine unitaire.
>
> **Et « super-consistant » ?** Sous $H_0$, $\hat\phi$ converge à la vitesse $1/T$ au lieu de $1/\sqrt T$ — bien plus vite que d'ordinaire. Intuition : sous racine unitaire, la variance du régresseur $X_{t-1}$ **croît avec $t$**, ce qui donne à la régression une information bien plus riche.

**Les tests disponibles.**

| Tests de racine unitaire ($H_0$ : **non-stationnarité**) |  |
|---|---|
| Dickey et Fuller (1979) | test **DF** |
| Said et Dickey (1984) | test **ADF** (Dickey-Fuller augmenté) |
| Phillips et Perron (1988) | tests de racine unitaire **PP** |
| Elliot, Rothenberg et Stock (2001) | statistiques de racine unitaire efficaces **ERS** |

| Tests de stationnarité ($H_0$ : **stationnarité**) |  |
|---|---|
| Kwiatkowski, Phillips, Schmidt et Shin (1992) | test **KPSS** |

⚠️ **Regardez bien les deux tableaux : les hypothèses nulles sont inversées.** Pour DF/ADF/PP/ERS, $H_0$ est la non-stationnarité — ne pas rejeter ne prouve **pas** la racine unitaire, cela veut souvent dire qu'on manque de puissance. Pour KPSS, $H_0$ est la stationnarité. **La bonne pratique est de faire les deux** : si ADF ne rejette pas et KPSS rejette, on conclut à la racine unitaire avec confiance ; si les deux rejettent, il y a un problème de spécification.

## Comment résoudre l'exercice type (protocole)

1. **Tracer la série** et chercher tendance, saisonnalité, changement de variance.
2. **Tester la racine unitaire** (ADF *et* KPSS). Si racine unitaire, **différencier** et recommencer ⟹ cela fixe $d$.
3. **Regarder l'autocorrélogramme** de la série stationnarisée : coupure nette après $q$ ⟹ MA($q$) ; décroissance géométrique ⟹ AR.
4. **Ajuster** tous les ARMA($p,q$) jusqu'à $(p_{\max},q_{\max})$ par maximum de vraisemblance.
5. **Sélectionner** $(p,q)$ par AIC, BIC ou HQ.
6. **Vérifier les racines** : $\phi(z)=0$ hors du cercle unité (stationnarité), $\theta(z)=0$ hors du cercle unité (inversibilité).
7. **Diagnostiquer les résidus** : sont-ils un bruit blanc ? Sinon, revenir à l'étape 4.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « autocorrélation nulle au-delà du retard $k$ » | **MA($k$)** |
| « autocorrélation décroissant géométriquement » | **AR** ; si $\rho(j)=\phi^j$, **AR(1)** |
| « retour à la moyenne » (taux, spread, ratio de valorisation) | **AR(1)** avec $0<\phi<1$ |
| « la variance croît avec le temps » | **marche aléatoire / I(1)** ⟹ différencier |
| « tendance linéaire » | distinguer **trend stationary** de **I(1) avec dérive** ⟹ tester |
| « choisir entre plusieurs modèles » | **AIC / BIC / HQ** |
| « la série est-elle stationnaire ? » | **Dickey-Fuller**, tables DF et non Student |

### Exercices progressifs

**Niveau 1** — Le processus $X_t=0{,}6X_{t-1}+\epsilon_t$ est-il stationnaire ? Donnez $\gamma(0)$, $\rho(2)$ et $IR(3)$ si $\sigma^2=4$.

<details><summary>Correction</summary>

**Stationnarité.** L'équation caractéristique est $1-0{,}6z=0$, de racine $\lambda=1/0{,}6\approx1{,}67$. Comme $\lvert\lambda\rvert>1$ (ou, ce qui revient au même, $\lvert\phi\rvert=0{,}6<1$), le processus **est stationnaire en covariance**.

**Variance.**

$$\gamma(0)=\frac{\sigma^2}{1-\phi^2}=\frac{4}{1-0{,}36}=\frac{4}{0{,}64}=6{,}25$$

**Autocorrélation au retard 2.** $\rho(2)=\phi^2=0{,}36$.

**Réponse impulsionnelle.** La décomposition de Wold est $X_t=\sum_j\phi^j\epsilon_{t-j}$, donc $\psi_j=\phi^j$ et

$$IR(3)=\psi_3=0{,}6^3=0{,}216$$

Un choc unitaire aujourd'hui déplace encore la série de $0{,}216$ dans trois périodes. La **réponse cumulée de long terme** vaut $\psi(1)=1/(1-0{,}6)=2{,}5$.

</details>

**Niveau 2** — Pourquoi un MA($q$) est-il toujours stationnaire, alors qu'un AR($p$) ne l'est pas toujours ?

<details><summary>Correction</summary>

**MA($q$).** $X_t-\mu=\epsilon_t+\theta_1\epsilon_{t-1}+\cdots+\theta_q\epsilon_{t-q}$ est une **somme finie** de bruits blancs à coefficients constants. Donc

$$E(X_t)=\mu \quad\text{et}\quad \mathrm{Var}(X_t)=\sigma^2(1+\theta_1^2+\cdots+\theta_q^2)$$

sont **finies et indépendantes de $t$**, et $\gamma(j)$ ne dépend que de $j$. La stationnarité est **automatique**, quels que soient les $\theta_i$.

**AR($p$).** $X_t$ dépend de son **propre passé**. Le processus se rétroalimente : si le coefficient est trop grand, les chocs s'accumulent au lieu de s'estomper. En développant l'AR(1) :

$$X_t=\sum_{j=0}^\infty\phi^j\epsilon_{t-j}$$

Cette somme **infinie** ne converge en moyenne quadratique que si $\sum_j\phi^{2j}<\infty$, soit $\lvert\phi\rvert<1$. Pour $\phi=1$ la variance est $t\sigma^2\to\infty$ ; pour $\phi>1$ elle explose géométriquement.

**La formulation générale.** Un AR est stationnaire quand son inverse $\phi^{-1}(L)$ existe, c'est-à-dire quand il **admet** une représentation MA($\infty$) convergente. La condition sur les racines est exactement la condition de convergence de cette série.

</details>

**Niveau 3** — Distinguez « trend stationary » et « difference stationary », et dites pourquoi la confusion coûte cher.

<details><summary>Correction</summary>

**Trend stationary** : $X_t=a+bt+\varepsilon_t$ avec $\varepsilon_t$ AR(1) stationnaire.

$$E(X_t)=a+bt, \qquad \mathrm{Var}(X_t)=\frac{\sigma^2}{1-\rho^2} \quad\textbf{constante}$$

Les chocs sont **transitoires** : la série revient à sa tendance déterministe. La bonne stationnarisation est de **retirer la tendance** par régression sur $t$.

**Difference stationary (I(1))** : $X_t=X_{t-1}+\eta_t$, donc $X_t=X_0+\sum_{j\leq t}\eta_j$.

$$\mathrm{Var}(X_t)=t\sigma^2 \quad\textbf{croissante}, \qquad \mathrm{Corr}(X_t,X_{t-j})=\sqrt{1-j/t}$$

Les chocs sont **permanents** : il n'existe aucun niveau de référence. La bonne stationnarisation est de **différencier**.

**Le coût des deux erreurs.**

- **Différencier un trend stationary** : $\Delta X_t=b+(1-L)\varepsilon_t$ contient le facteur $(1-L)$, dont la racine $\theta(z)=1-z$ est **sur** le cercle unité. Le MA obtenu est **non inversible** — on parle de « sur-différenciation ». L'estimation devient instable et la prévision se dégrade.
- **Ne pas différencier un I(1)** : c'est le problème des **régressions fallacieuses**. Deux marches aléatoires **indépendantes** régressées l'une sur l'autre donnent un $R^2$ élevé et un $t$ de Student très significatif — purement par artefact, parce que la corrélation $\sqrt{1-j/t}$ reste proche de 1 sur de longs horizons. Toute l'inférence est fausse.

**D'où le protocole.** Tester avant de transformer. Et comme les deux familles de tests ont des $H_0$ opposées, faire **ADF et KPSS** et croiser leurs conclusions.

</details>

**Niveau 4 — type examen** — Expliquez le théorème de Wold, dites pourquoi il ne suffit pas en pratique, et comment ARMA résout le problème.

<details><summary>Correction</summary>

**L'énoncé.** Toute série stationnaire $\{X_t\}$ se décompose en $X_t=V_t+S_t$, où $V_t$ est **linéairement déterministe** (combinaison linéaire de son propre passé à coefficients constants) et

$$S_t=\sum_{i=0}^\infty\psi_i\epsilon_{t-i}, \qquad \psi_0=1, \qquad \sum_{i=0}^\infty\psi_i^2<\infty$$

avec $\{\epsilon_t\}$ un bruit blanc linéairement imprévisible ($E\epsilon_t=0$, $E\epsilon_t^2=\sigma^2$, $E\epsilon_t\epsilon_s=0$ pour $s\neq t$) non corrélé avec $\{V_t\}$.

**Sa portée.** C'est un théorème de **structure** : il ne dit pas comment modéliser, il dit qu'il n'y a **rien d'autre** à modéliser. Toute série stationnaire *est* une MA($\infty$) plus une partie prévisible. Modéliser = estimer les $\{\psi_i\}$.

**Pourquoi il ne suffit pas.** Les $\{\psi_i\}$ sont en **nombre infini** et l'on ne dispose que de $T$ observations. Le cours le dit explicitement : théoriquement $\lim_{p\to\infty}\hat y^{(p)}=P(Y_t\mid Y_{t-1},\dots)$, mais si $p\to\infty$ est requis, il faut $n\to\infty$ avec $p/n\to0$. On ne peut donc pas estimer directement la représentation de Wold : il faut une **paramétrisation finie**.

**Comment ARMA résout le problème.** ARMA($p,q$) s'écrit $\phi(L)(X_t-\mu)=\theta(L)\epsilon_t$, dont la décomposition de Wold est

$$X_t=\mu+\psi(L)\epsilon_t, \qquad \psi(L)=[\phi(L)]^{-1}\theta(L)$$

Les $\{\psi_i\}$ infinis sont donc engendrés comme le développement en série d'une **fraction rationnelle** de deux polynômes de degrés $p$ et $q$ : $p+q+2$ paramètres seulement (avec $\mu$ et $\sigma^2$).

**Pourquoi une fraction rationnelle est le bon choix.** Le numérateur $\theta(L)$ crée une mémoire **courte et exacte** (autocovariances nulles au-delà de $q$) ; le dénominateur $\phi(L)$ crée une mémoire **longue et géométriquement décroissante** (les racines produisent des termes en $\lambda_j^{-i}$). Combiner les deux permet d'approcher n'importe quelle suite $\{\psi_i\}$ de carré sommable avec très peu de paramètres — c'est le principe des approximations de Padé, transposé aux séries temporelles.

**Ce qu'il reste à faire.** Choisir $(p,q)$ — d'où AIC/BIC/HQ ; vérifier que $\phi(z)=0$ a ses racines hors du cercle unité (stationnarité) et $\theta(z)=0$ aussi (inversibilité) ; et si la série n'est pas stationnaire au départ, différencier $d$ fois — d'où ARIMA($p,d,q$).

</details>

## 🔴 Common mistakes

1. **Confondre stationnarité stricte et stationnarité en covariance** — la première porte sur toute la loi jointe, la seconde sur les deux premiers moments seulement. Elles coïncident pour un processus gaussien.
2. **Croire que le bruit blanc de Wold est i.i.d.** — il est seulement **non corrélé**. Les rendements financiers en sont l'illustration : non corrélés mais avec des carrés fortement dépendants.
3. **Se tromper de côté sur les racines** — « hors du cercle unité » porte sur les racines de $\phi(z)$, pas sur les valeurs propres de la matrice compagnon, qui sont leurs inverses.
4. **Croire qu'un MA($q$) peut être non stationnaire** — il l'est toujours ; les racines de $\theta(z)$ gouvernent l'**inversibilité**, pas la stationnarité.
5. **Utiliser les tables de Student pour Dickey-Fuller** — la loi sous $H_0$ est **non standard**, ses quantiles sont plus négatifs. On rejette bien trop souvent la racine unitaire sinon.
6. **Interpréter un non-rejet de ADF comme une preuve de racine unitaire** — c'est $H_0$ ; le non-rejet reflète souvent un simple manque de puissance. Croiser avec KPSS.
7. **Sur-différencier** — différencier une série *trend stationary* introduit un facteur $(1-L)$ **non inversible**.
8. **Régresser deux séries I(1) sans précaution** — régression fallacieuse : $R^2$ élevé et $t$ significatif sans aucune relation réelle.
9. **Comparer AIC entre modèles ajustés sur des échantillons différents** — différencier fait perdre des observations ; $n$ doit être identique pour que les critères soient comparables.
10. **Oublier que $c=\mu\phi(1)$ et non $c=\mu$** dans l'écriture $X_t=c+\sum_j\phi_jX_{t-j}+\epsilon_t$.

## 📌 Ultimate Review

1. **Série temporelle** = processus stochastique indexé par $t$, spécifié par toutes ses lois de dimension finie.
2. **Stationnarité stricte** : invariance de $p(\cdot)$ par translation du temps. **Stationnarité en covariance** : $E(X_t)=\mu$, $\mathrm{Var}(X_t)=\sigma_X^2$, $\mathrm{Cov}(X_t,X_{t+\tau})=\gamma(\tau)$ constants.
3. **Autocorrélation** : $\rho(\tau)=\gamma(\tau)/\gamma(0)$.
4. **Wold** : $X_t=V_t+\sum_{i\geq0}\psi_i\epsilon_{t-i}$, $\psi_0=1$, $\sum\psi_i^2<\infty$, $\epsilon_t$ bruit blanc non corrélé avec $V_t$.
5. **Opérateur retard** : $L(X_t)=X_{t-1}$ ; $\psi(L)=\sum\psi_iL^i$ ; **réponse impulsionnelle** $IR(j)=\partial X_t/\partial\epsilon_{t-j}=\psi_j$ ; réponse cumulée $=\psi(1)$.
6. **Inversibilité** : si $\psi^{-1}(L)$ existe, $X_t=\sum_i\pi_iX_{t-i}+\epsilon_t$ (représentation AR).
7. **ARMA($p,q$)** : $\phi(L)(X_t-\mu)=\theta(L)\epsilon_t$ ; Wold $\psi(L)=[\phi(L)]^{-1}\theta(L)$.
8. **AR($p$)** : régression linéaire sur $(X_{t-1},\dots,X_{t-p})$ avec $c=\mu\phi(1)$ ; **stationnaire ssi** toutes les racines de $\phi(z)=0$ sont hors du cercle unité.
9. **AR(1)** : $\mathrm{Var}=\sigma^2/(1-\phi^2)$, $\rho(j)=\phi^j$ ; $0<\phi<1$ retour à la moyenne, $-1<\phi<0$ oscillant, $\phi=1$ marche aléatoire, $\phi>1$ explosif. Exemples : taux, spreads, changes réels, ratios de valorisation.
10. **Yule-Walker** : $\gamma(j)=\sum_k\phi_k\gamma(j-k)+\delta_{0,j}\sigma^2$ ; système de Toeplitz en $\phi$ ; $\hat\sigma^2=\hat\gamma(0)-\sum_j\hat\phi_j\hat\gamma(j)$ ; **méthode des moments**.
11. **MA($q$)** : toujours stationnaire ; **inversible** ssi racines de $\theta(z)=0$ hors du cercle unité ; $\gamma(0)=\sigma^2(1+\sum\theta_i^2)$ et **$\gamma(j)=0$ pour $j>q$**.
12. **Différenciation** : $\Delta=1-L$ ; tendance linéaire ⟹ $\Delta$, quadratique ⟹ $\Delta^2$.
13. **Trend stationary** ($\mathrm{Var}$ constante, chocs transitoires) contre **I(1)** ($\mathrm{Var}=t\sigma^2$, chocs permanents, $\mathrm{Corr}=\sqrt{1-j/t}$).
14. **ARIMA($p,d,q$)** : $\{\Delta^dX_t\}$ stationnaire et ARMA($p,q$).
15. **Estimation** : MV sous forme espace-état, décomposition en erreurs de prédiction, **LIML** (conditionne) ou **FIML** (loi stationnaire exacte).
16. **Sélection** : $\log\tilde\sigma^2(p,q)$ + pénalité $\times\frac{p+q}{n}$, avec pénalité $2$ (**AIC**), $\log n$ (**BIC**), $2\log\log n$ (**HQ**).
17. **Dickey-Fuller** : $H_0:\phi=1$ contre $H_1:\lvert\phi\rvert<1$ ; $\hat t=(\hat\phi-1)/se(\hat\phi)$ ; sous $H_0$ **loi DF non standard** et $\hat\phi$ **super-consistant** en $1/T$.
18. **Familles de tests** : DF, ADF, PP, ERS ($H_0$ = non-stationnarité) · **KPSS** ($H_0$ = stationnarité).

**Formulas to know**

$$\rho(\tau)=\frac{\gamma(\tau)}{\gamma(0)} \qquad \phi(L)(X_t-\mu)=\theta(L)\epsilon_t \qquad \psi(L)=[\phi(L)]^{-1}\theta(L)$$

$$\mathrm{Var}(X_t)=\frac{\sigma^2}{1-\phi^2} \quad\text{et}\quad \rho(j)=\phi^j \quad\text{[AR(1)]} \qquad \gamma(j)=0 \ \ (j>q) \quad\text{[MA(q)]}$$

$$AIC=\log\tilde\sigma^2+2\tfrac{p+q}{n} \qquad BIC=\log\tilde\sigma^2+\log(n)\tfrac{p+q}{n} \qquad \hat t_{\phi=1}=\frac{\hat\phi-1}{se(\hat\phi)}$$

**Methods to know** : la stratégie de Wold en 5 étapes ; la factorisation de $\phi(L)$ et l'inversion terme à terme ; la dérivation des équations de Yule-Walker ; le protocole Box-Jenkins complet.

## 🧠 Active Recall

**Basic** — Donnez la définition de la stationnarité en covariance.

<details><summary>Réponse</summary>

$\{X_t\}$ est stationnaire en covariance si les trois quantités suivantes sont **constantes au cours du temps $t$** :

$$E(X_t)=\mu, \qquad \mathrm{Var}(X_t)=\sigma_X^2, \qquad \mathrm{Cov}(X_t,X_{t+\tau})=\gamma(\tau)$$

La covariance ne dépend donc que de l'**écart** $\tau$ entre les deux dates, jamais de leur position absolue. La fonction d'autocorrélation est $\rho(\tau)=\gamma(\tau)/\gamma(0)$.

</details>

**Understanding** — Énoncez le théorème de Wold et dites ce qu'il garantit exactement.

<details><summary>Réponse</summary>

Toute série stationnaire se décompose en $X_t=V_t+S_t$ avec $V_t$ **linéairement déterministe** et $S_t=\sum_{i\geq0}\psi_i\epsilon_{t-i}$ une **MA($\infty$)**, où $\psi_0=1$, $\sum\psi_i^2<\infty$, $\{\epsilon_t\}$ est un bruit blanc linéairement imprévisible et $E(\epsilon_tV_s)=0$.

**Ce qu'il garantit** : qu'il n'existe **aucune autre structure**. Une série stationnaire est nécessairement une partie prévisible plus une moyenne mobile infinie d'innovations. C'est un théorème d'**existence et d'exhaustivité**, pas une méthode.

**Ce qu'il ne donne pas** : un modèle estimable. Les $\{\psi_i\}$ sont en nombre infini ; d'où ARMA, qui les engendre par une fraction rationnelle à peu de paramètres.

</details>

**Application** — Comment reconnaître un AR d'un MA à partir de l'autocorrélogramme empirique ?

<details><summary>Réponse</summary>

**MA($q$)** : $\gamma(j)=0$ pour $j>q$. L'autocorrélogramme **coupe net** après le retard $q$ puis reste dans les bandes de confiance. Raison : $X_t$ et $X_{t+j}$ ne partagent **aucune innovation commune** au-delà de la mémoire $q$ du filtre.

**AR($p$)** : l'autocorrélation **décroît géométriquement** sans jamais s'annuler exactement — pour un AR(1), $\rho(j)=\phi^j$ exactement. Raison : la représentation de Wold est une MA($\infty$), donc toutes les autocovariances sont non nulles.

**Le complément indispensable** : l'autocorrélogramme **partiel** (PACF), qui présente la coupure symétrique — nette après $p$ pour un AR($p$), décroissance pour un MA. En pratique on lit ACF **et** PACF ensemble, puis on confirme par AIC/BIC.

</details>

**Comparison** — AIC, BIC et HQ : même structure, quelle différence ?

<details><summary>Réponse</summary>

Les trois ont la forme $\log\big(\tilde\sigma^2(p,q)\big)+c_n\cdot\frac{p+q}{n}$, où $\tilde\sigma^2$ est l'EMV de la variance des innovations. **Seule la pénalité $c_n$ change :**

| Critère | $c_n$ | Effet |
|---|---|---|
| **AIC** | $2$ | pénalité la plus faible ⟹ modèles **plus riches** |
| **HQ** | $2\log\log(n)$ | intermédiaire |
| **BIC** | $\log(n)$ | pénalité la plus forte (dès $n>7$) ⟹ modèles **plus parcimonieux** |

**Le principe commun** : premier terme = qualité d'ajustement, second terme = prix de la complexité. Sans pénalité, on choisirait toujours le modèle le plus gros.

**Lequel choisir ?** Le **BIC** est *consistant* : si le vrai modèle est dans la liste, il le retrouve quand $n\to\infty$. L'**AIC** ne l'est pas mais est *efficace* pour la prévision. En finance, où le vrai modèle n'est jamais dans la liste, l'AIC se défend bien.

</details>

**Exam-style** — Décrivez le test de Dickey-Fuller, son asymptotique, et pourquoi on ne peut pas y utiliser les tables usuelles.

<details><summary>Réponse</summary>

**Le cadre.** $X_t=\phi X_{t-1}+\epsilon_t$ avec $\{\epsilon_t\}\sim WN(0,\sigma^2)$, et l'on teste

$$H_0:\ \phi=1 \ \text{ (racine unitaire, non-stationnarité)} \qquad\text{contre}\qquad H_1:\ \lvert\phi\rvert<1 \ \text{ (stationnarité)}$$

On ajuste par moindres carrés et l'on forme $\hat t_{\phi=1}=(\hat\phi-1)/se(\hat\phi)$.

**L'asymptotique — deux régimes complètement différents.**

- Si $\lvert\phi\rvert<1$ : $\sqrt T(\hat\phi-\phi)\xrightarrow{d}N(0,(1-\phi^2))$ — vitesse standard $1/\sqrt T$, loi limite normale.
- Si $\phi=1$ : $\hat\phi$ est **super-consistant**, de vitesse $1/T$, et $\hat t_{\phi=1}$ suit la **distribution de Dickey-Fuller**.

**Pourquoi les tables usuelles sont invalides.** Sous $H_0$, le régresseur $X_{t-1}$ n'est pas stationnaire : sa variance croît en $t$. Les conditions du théorème central limite standard tombent, et la loi limite s'exprime comme une fonctionnelle de mouvement brownien — non standard, **asymétrique vers la gauche**, avec des quantiles nettement plus négatifs que ceux de Student. Utiliser Student conduirait à **rejeter la racine unitaire beaucoup trop souvent**.

**Et l'idée derrière la super-consistance.** Sous racine unitaire, la variance du régresseur explose avec $t$ ; la régression dispose donc d'une information bien plus riche que dans le cas stationnaire, d'où une convergence en $1/T$ au lieu de $1/\sqrt T$.

**Les extensions et le complément.** ADF (Said et Dickey, 1984) ajoute des retards pour absorber l'autocorrélation résiduelle ; PP (Phillips et Perron, 1988) corrige non paramétriquement ; ERS (Elliot, Rothenberg et Stock, 2001) améliore la puissance. Et **KPSS** (Kwiatkowski *et al.*, 1992) renverse l'hypothèse nulle : $H_0$ y est la **stationnarité**. On croise les deux, car un non-rejet de ADF reflète souvent un simple manque de puissance.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Stationnarité stricte ? | Invariance de toutes les lois jointes par translation du temps |
| Stationnarité en covariance ? | $E(X_t)$, $\mathrm{Var}(X_t)$, $\mathrm{Cov}(X_t,X_{t+\tau})$ constants en $t$ |
| Fonction d'autocorrélation ? | $\rho(\tau)=\gamma(\tau)/\gamma(0)$ |
| Théorème de Wold ? | $X_t=V_t+\sum_{i\geq0}\psi_i\epsilon_{t-i}$, $\psi_0=1$, $\sum\psi_i^2<\infty$ |
| Le bruit blanc de Wold est-il i.i.d. ? | **Non** — seulement non corrélé |
| Opérateur retard ? | $L(X_t)=X_{t-1}$, $L^n(X_t)=X_{t-n}$ |
| Réponse impulsionnelle ? | $IR(j)=\partial X_t/\partial\epsilon_{t-j}=\psi_j$ |
| Réponse cumulée de long terme ? | $\psi(1)=\sum_i\psi_i$ |
| Représentation AR d'un processus inversible ? | $X_t=\sum_i\pi_iX_{t-i}+\epsilon_t$ |
| Écriture ARMA($p,q$) ? | $\phi(L)(X_t-\mu)=\theta(L)\epsilon_t$ |
| Wold d'un ARMA ? | $\psi(L)=[\phi(L)]^{-1}\theta(L)$ |
| Condition de stationnarité d'un AR($p$) ? | Racines de $\phi(z)=0$ **hors** du cercle unité |
| Constante d'un AR($p$) en régression ? | $c=\mu\cdot\phi(1)$ |
| Variance d'un AR(1) ? | $\sigma^2/(1-\phi^2)$ |
| Autocorrélation d'un AR(1) ? | $\rho(j)=\phi^j$ |
| AR(1) avec $\phi=1$ ? | **Marche aléatoire**, non stationnaire, pas de Wold |
| Exemples financiers d'AR(1) ? | Taux d'intérêt (Vasicek), spreads, changes réels, ratios de valorisation |
| Équations de Yule-Walker ? | $\gamma(j)=\sum_k\phi_k\gamma(j-k)+\delta_{0,j}\sigma^2$ |
| Estimateur de $\sigma^2$ par Yule-Walker ? | $\hat\gamma(0)-\sum_j\hat\phi_j\hat\gamma(j)$ |
| Principe d'estimation de Yule-Walker ? | **Méthode des moments** |
| Un MA($q$) est-il stationnaire ? | **Toujours** — les racines gouvernent l'inversibilité |
| Autocovariance d'un MA($q$) au-delà de $q$ ? | **Nulle** |
| Variance d'un MA($q$) ? | $\sigma^2(1+\theta_1^2+\cdots+\theta_q^2)$ |
| Opérateur de différenciation ? | $\Delta=1-L$ ; $\Delta^k=(1-L)^k$ |
| Variance d'une marche aléatoire ? | $t\sigma^2$ — croissante, donc non stationnaire |
| $\mathrm{Corr}(X_t,X_{t-j})$ pour une marche aléatoire ? | $\sqrt{1-j/t}$ |
| ARIMA($p,d,q$) ? | $\Delta^dX_t$ stationnaire et ARMA($p,q$) |
| LIML contre FIML ? | LIML conditionne sur les $p$ premières valeurs ; FIML utilise leur loi stationnaire exacte |
| Pénalités AIC / BIC / HQ ? | $2$ · $\log(n)$ · $2\log\log(n)$, le tout $\times\frac{p+q}{n}$ |
| Hypothèses du test de Dickey-Fuller ? | $H_0:\phi=1$ (racine unitaire) contre $H_1:\lvert\phi\rvert<1$ |
| Loi de $\hat t$ sous $H_0$ ? | **Distribution de Dickey-Fuller**, non standard |
| Vitesse de convergence sous $H_0$ ? | $1/T$ — $\hat\phi$ est **super-consistant** |
| Le test dont $H_0$ est la stationnarité ? | **KPSS** (Kwiatkowski, Phillips, Schmidt et Shin, 1992) |
