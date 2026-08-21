# Fiche 58 — Séries temporelles II : processus VAR, Kronecker et estimation multivariée

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Kempthorne, *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 11 « Time Series Analysis II » |
| **Difficulté** | Must know — l'économétrie des systèmes, socle de la macro appliquée |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 50 (MCO, Gauss-Markov, MCG), fiche 52 (stationnarité, Wold, AR, AIC/BIC), fiche 54 (matrices de covariance) |
| **Concepts clés** | Stationnarité multivariée, matrices d'autocovariance croisée, avance et rétroaction, Wold multivarié, VAR($p$), matrice compagnon, régressions apparemment non reliées, produit de Kronecker, opérateur vec, optimalité des MCO par composante, critères AIC/BIC/HQ multivariés, normalité asymptotique |
| **Poids à l'examen** | Trois choses : la **condition de stationnarité** d'un VAR($p$) ; le **théorème d'optimalité** — pourquoi les MCO équation par équation suffisent — et savoir le **démontrer** par Kronecker ; la **loi asymptotique** $\sqrt n(\hat\beta-\beta)\to N(0,\Sigma\otimes\Gamma^{-1})$. |

## 🎯 Vue d'ensemble

Soit $\{X_t\}=\{\dots,X_{t-1},X_t,X_{t+1},\dots\}$ un processus stochastique de dimension $m$, constitué de $m$-vecteurs aléatoires

$$X_t=(X_{1,t},X_{2,t},\dots,X_{m,t})^T, \qquad \text{vecteur aléatoire sur } \mathbb{R}^m$$

$\{X_t\}$ est composé de $m$ **séries temporelles composantes** $\{X_{1,t}\},\{X_{2,t}\},\dots,\{X_{m,t}\}$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*$\{X_t\}$ est **stationnaire en covariance** si **chaque** série temporelle composante est stationnaire en covariance.*

</div>

```
UNIVARIÉ (fiche 52)          MULTIVARIÉ (cette fiche)
γ(k) scalaire          →     Γ_k matrice m×m, NON symétrique
AR(p)                  →     VAR(p) : Φ_k matrices m×m
racines de φ(z)        →     racines de det(I − Φ₁z − … − Φ_p z^p)
                       →     NOUVEAU : avance, retard, rétroaction
ESTIMATION             →     m régressions séparées… et c'est OPTIMAL
```

> **La question qui structure la fiche.** Passer de $1$ à $m$ séries fait apparaître les **relations croisées** — qui précède qui, qui rétroagit sur qui — mais fait aussi exploser le nombre de paramètres : $pm^2$ coefficients au lieu de $p$. La bonne nouvelle du chapitre est que, **en l'absence de restrictions**, l'estimation reste triviale : $m$ régressions MCO indépendantes, et c'est **optimal**.

## 🔴 Concept 1 — Les moments d'une série multivariée

**Moment d'ordre 1.**

$$\mu=E[X_t]=\begin{pmatrix}E(X_{1,t})\\E(X_{2,t})\\\vdots\\E(X_{m,t})\end{pmatrix}=\begin{pmatrix}\mu_1\\\mu_2\\\vdots\\\mu_m\end{pmatrix} \qquad (m\times1)$$

**Matrice de variance-covariance.**

$$\Gamma_0=\mathrm{Var}(X_t)=\begin{pmatrix}\mathrm{var}(X_{1,t})&\mathrm{cov}(X_{1,t},X_{2,t})&\cdots\\ \vdots&\ddots&\vdots\\ \mathrm{cov}(X_{m,t},X_{1,t})&\mathrm{cov}(X_{m,t},X_{2,t})&\cdots&\mathrm{var}(X_{m,t})\end{pmatrix}$$

**Matrice de corrélation.**

$$R_0=\mathrm{corr}(X_t)=D^{-1/2}\Gamma_0D^{-1/2}, \qquad \text{où } D=\mathrm{diag}(\Gamma_0)$$

**Matrice d'autocovariance croisée au retard $k$.**

$$\Gamma_k=\mathrm{Cov}(X_t,X_{t-k})=E\big[(X_t-\mu)(X_{t-k}-\mu)^T\big]$$

dont l'élément $(j,j')$ vaut $\mathrm{cov}(X_{j,t},X_{j',t-k})$.

**Matrice de corrélation croisée au retard $k$.**

$$R_k=D^{-1/2}\Gamma_kD^{-1/2}, \qquad D=\mathrm{diag}(\Gamma_0)$$

**Propriétés.**

- $\Gamma_0$ et $R_0$ sont des matrices $m\times m$ **symétriques**.
- $\Gamma_k$ et $R_k$ sont $m\times m$ mais **non symétriques**.
- $$\boxed{\ \Gamma_k=\Gamma_{-k}^T\ }$$

⚠️ **La non-symétrie de $\Gamma_k$ est LE fait nouveau du cas multivarié.** En univarié, $\gamma(k)=\gamma(-k)$ : le passé et le futur se ressemblent. En multivarié, $\mathrm{cov}(X_{1,t},X_{2,t-1})$ et $\mathrm{cov}(X_{2,t},X_{1,t-1})$ sont deux quantités **différentes** — et c'est exactement cette différence qui porte l'information de causalité temporelle.

### Avance, retard et rétroaction

> - *Si $[\Gamma_k]_{j,j'}=\mathrm{Cov}(X_{t,j},X_{t-k,j'})\neq0$ pour un certain $k>0$, on dit que **« $\{X_{t,j'}\}$ précède $\{X_{t,j}\}$ »** (*leads*).*
> - *Si « $\{X_{t,j'}\}$ précède $\{X_{t,j}\}$ » **et** « $\{X_{t,j}\}$ précède $\{X_{t,j'}\}$ », alors il y a **rétroaction** (*feedback*).*

> **La lecture économique.** Un indicateur avancé (les commandes industrielles, les indices de confiance) « précède » l'activité. Une rétroaction signifie que les deux séries s'influencent mutuellement avec décalage — cas de figure standard entre taux d'intérêt et inflation. Ce vocabulaire est la version élémentaire de ce que la causalité au sens de Granger formalise.

## 🔴 Concept 2 — Le théorème de Wold multivarié

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème de représentation de Wold.</span>

*Toute série temporelle multivariée ($m$-variée) stationnaire en covariance $\{X_t\}$ peut être décomposée en*

$$X_t=V_t+\eta_t+\Psi_1\eta_{t-1}+\Psi_2\eta_{t-2}+\cdots=V_t+\sum_{k=0}^\infty\Psi_k\eta_{t-k}$$

*où :*

- *$\{V_t\}$ est un processus **linéairement déterministe** de dimension $m$ ;*
- *$\{\eta_t\}$ est un processus de **bruit blanc multivarié** :* $$E[\eta_t]=0_m, \qquad \mathrm{Var}[\eta_t]=E[\eta_t\eta_t^T]=\Sigma \ \text{ (}m\times m\text{, semi-définie positive)}$$ $$\mathrm{Cov}[\eta_t,\eta_{t-k}]=E[\eta_t\eta_{t-k}^T]=0 \ \ (k\neq0), \qquad \mathrm{Cov}[\eta_t,V_{t-k}]=0 \ \ \forall k$$
- *les $\{\Psi_k\}$ sont des matrices $m\times m$ telles que $\Psi_0=I_m$ et $\sum_{k=0}^\infty\Psi_k\Psi_k^T$ **converge**.*

</div>

> **C'est mot pour mot le théorème de la fiche 52**, avec trois substitutions : les scalaires $\psi_k$ deviennent des **matrices** $m\times m$, la condition $\psi_0=1$ devient $\Psi_0=I_m$, et $\sum\psi_k^2<\infty$ devient la convergence de $\sum\Psi_k\Psi_k^T$.
>
> **Et la même limite pratique subsiste** : une infinité de matrices $\Psi_k$ est inestimable. D'où le VAR, qui les engendre à partir d'un nombre fini de paramètres — exactement comme ARMA le faisait en univarié.

⚠️ **Noter que $\Sigma$ n'est pas supposée diagonale.** Les innovations des différentes composantes sont **contemporainement corrélées** : un choc sur les taux et un choc sur les actions peuvent survenir ensemble. Ce que le bruit blanc interdit, c'est la corrélation **entre dates** ($k\neq0$), pas entre composantes à une même date. Ce point est décisif pour le concept 7.

## 🔴 Concept 3 — Les modèles VAR($p$)

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*La série multivariée $\{X_t\}$ de dimension $m$ suit le modèle **VAR($p$)** d'ordre autorégressif $p$ si*

$$\boxed{\ X_t=C+\Phi_1X_{t-1}+\Phi_2X_{t-2}+\cdots+\Phi_pX_{t-p}+\eta_t\ }$$

*où $C=(c_1,\dots,c_m)^T$ est un $m$-vecteur de constantes, $\Phi_1,\dots,\Phi_p$ sont des matrices $(m\times m)$ de coefficients, et $\{\eta_t\}$ est un bruit blanc multivarié $MVN(0_m,\Sigma)$.*

</div>

**Ce que cela signifie composante par composante.** Pour $j$ fixé, la série $\{X_{j,t}\}$ est une **généralisation du modèle AR($p$)** incluant des termes de régression retardés sur **toutes les autres** composantes :

$$X_{j,t}=c_j+\sum_{k=1}^p[\Phi_k]_{j,j}X_{j,t-k}+\sum_{j'\neq j}\sum_{k=1}^p[\Phi_k]_{j,j'}X_{j',t-k}+\eta_{j,t}$$

> **Lisez la structure.** Le premier terme est l'AR($p$) habituel de la série sur elle-même ; le second est **nouveau** : l'influence retardée des autres séries. C'est ce second bloc qui capture les avances et les rétroactions du concept 1 — et qui coûte $p\,m(m-1)$ paramètres supplémentaires.

⚠️ **Le coût en paramètres est le vrai obstacle du VAR.** Il y a $pm^2$ coefficients dans les $\Phi_k$, plus $m$ constantes, plus $m(m+1)/2$ dans $\Sigma$. Pour $m=5$ et $p=4$ : $100$ coefficients autorégressifs à estimer. C'est pourquoi les VAR appliqués restent petits ($m\leq6$, $p\leq4$) et pourquoi la sélection d'ordre du concept 8 est cruciale.

## 🟠 Concept 4 — La représentation VAR(1) d'un VAR($p$)

> *Un processus VAR($p$) est **équivalent** à un processus VAR(1).*

On définit les vecteurs empilés

$$Z_t=(X_t^T,X_{t-1}^T,\dots,X_{t-p+1}^T)^T, \qquad Z_{t-1}=(X_{t-1}^T,X_{t-2}^T,\dots,X_{t-p}^T)^T$$

Le processus $\{Z_t\}$, de dimension $(mp\times1)$, vérifie

$$Z_t=D+AZ_{t-1}+F$$

où $D$ et $F$ sont $(mp\times1)$ et $A$ est $(mp\times mp)$ :

$$D=\begin{pmatrix}C\\0_m\\0_m\\\vdots\\0_m\end{pmatrix}, \qquad A=\begin{pmatrix}\Phi_1&\Phi_2&\Phi_3&\cdots&\Phi_p\\ I_m&0&0&\cdots&0\\ 0&I_m&0&\cdots&0\\ \vdots&&\ddots&&\vdots\\ 0&0&\cdots&I_m&0\end{pmatrix}, \qquad F=\begin{pmatrix}\eta_t\\0_m\\0_m\\\vdots\\0_m\end{pmatrix}$$

$A$ est la **matrice compagnon**.

> **L'astuce est purement algébrique mais très utile.** En empilant les $p$ derniers vecteurs en un seul « super-vecteur », un processus à mémoire $p$ devient un processus **markovien** à mémoire $1$. Les lignes de $I_m$ sous la première rangée ne font que **recopier** : $X_{t-1}=X_{t-1}$, etc.
>
> **Le bénéfice** : tout ce qu'on sait des VAR(1) — condition de stationnarité, moments, prévision — s'applique immédiatement aux VAR($p$). C'est le même mouvement que la mise sous forme espace-état de la fiche 52.

## 🔴 Concept 5 — Stationnarité et moyenne

> **Un modèle VAR($p$) est stationnaire si l'une ou l'autre des conditions équivalentes est vérifiée :**
>
> - *toutes les **valeurs propres de la matrice compagnon $A$** ont un module strictement inférieur à $1$ ; ou*
> - *toutes les racines de* $$\det\big(I_m-\Phi_1z-\Phi_2z^2-\cdots-\Phi_pz^p\big)=0$$ *vues comme fonction de la variable complexe $z$, sont **en dehors du cercle unité complexe** $\{\lvert z\rvert\leq1\}$.*

⚠️ **Les deux formulations sont équivalentes mais portent sur des objets inverses l'un de l'autre** — exactement comme en fiche 52. Les valeurs propres de $A$ sont les **inverses** des racines du déterminant : « module $<1$ » pour les unes, « hors du cercle unité » pour les autres. Vérifiez toujours laquelle est utilisée.

**La moyenne d'un VAR($p$) stationnaire.** En prenant l'espérance de l'équation :

$$E[X_t]=C+\Phi_1E[X_{t-1}]+\cdots+\Phi_pE[X_{t-p}]+E[\eta_t]$$

$$\mu=C+\sum_{k=1}^p\Phi_k\mu+0_m$$

d'où

$$\boxed{\ \mu=E[X_t]=(I-\Phi_1-\cdots-\Phi_p)^{-1}C\ } \qquad\text{et}\qquad C=(I-\Phi_1-\cdots-\Phi_p)\mu$$

**La forme centrée.**

$$[X_t-\mu]=\Phi_1[X_{t-1}-\mu]+\Phi_2[X_{t-2}-\mu]+\cdots+\Phi_p[X_{t-p}-\mu]+\eta_t$$

> **L'inversibilité de $(I-\Phi_1-\cdots-\Phi_p)$ est garantie par la stationnarité** : c'est le déterminant caractéristique évalué en $z=1$, et si $1$ était une racine, elle serait **sur** le cercle unité — donc le processus serait non stationnaire (racine unitaire multivariée). C'est le pendant exact de $c=\mu\phi(1)$ en fiche 52.

## 🔴 Concept 6 — Le VAR($p$) comme système de régressions

**Les données.** $n$ observations $x_t=(x_{1,t},\dots,x_{m,t})^T$, $t=1,\dots,n$, plus $p$ **conditions initiales** exprimées comme observations pré-échantillon $x_{-p+1},\dots,x_{-1},x_0$.

**Les $m$ modèles de régression.** On pose, pour chaque composante $j$ :

$$y^{(j)}=Z\beta^{(j)}+\epsilon^{(j)}, \qquad j=1,2,\dots,m$$

avec

$$y^{(j)}=\begin{pmatrix}x_{j,1}\\x_{j,2}\\\vdots\\x_{j,n}\end{pmatrix}, \qquad Z=\begin{pmatrix}1&z_0^T\\1&z_1^T\\\vdots&\vdots\\1&z_{n-1}^T\end{pmatrix}, \qquad z_{t-1}=(x_{t-1}^T,x_{t-2}^T,\dots,x_{t-p}^T)^T$$

> ***$y^{(j)}$ ne concerne qu'une seule composante, tandis que $Z$ inclut les retards de TOUTES les composantes.*** C'est la phrase-clé : la matrice de régresseurs est **la même pour les $m$ équations**. Retenez-la — c'est elle qui rend le théorème du concept 7 possible.

- $\beta^{(j)}$ est le vecteur de $(mp+1)$ paramètres de régression de la $j$-ième composante.
- $\epsilon^{(j)}$ est le $n$-vecteur des erreurs d'innovation, de loi $WN(0,\sigma_j^2)$ — **la variance dépend de la composante $j$**.

**Le modèle multivarié.** Les $m$ régressions s'écrivent ensemble

$$\big[y^{(1)}\ y^{(2)}\ \cdots\ y^{(m)}\big]=Z\big[\beta^{(1)}\ \beta^{(2)}\ \cdots\ \beta^{(m)}\big]+\big[\epsilon^{(1)}\ \epsilon^{(2)}\ \cdots\ \epsilon^{(m)}\big]$$

$$\boxed{\ Y=ZB+E\ }$$

> **Forme du modèle : régressions apparemment non reliées (SUR).** Le nom, dû à Zellner, dit le paradoxe : les équations **semblent** indépendantes — chacune a sa propre variable expliquée et ses propres coefficients — mais elles sont **liées par la corrélation contemporaine des erreurs**, c'est-à-dire par $\Sigma$ non diagonale. En général, une telle corrélation appelle une estimation **jointe** par MCG. Le concept 7 explique pourquoi, **ici précisément**, ce n'est pas nécessaire.

## 🔴 Concept 7 — MCO par composante, et pourquoi c'est optimal

**L'estimation.** *Les paramètres $\hat\beta^{(j)}$ s'estiment facilement par MCO, en appliquant le même algorithme :*

$$\hat\beta^{(j)}=(Z^TZ)^{-1}Z^Ty^{(j)}, \qquad j=1,\dots,m$$

*Les résidus ont la formule habituelle :* $\hat\epsilon^{(j)}=y^{(j)}-Z\hat\beta^{(j)}$.

**L'estimation de $\Sigma$.** On identifie les estimations des innovations $\{\eta_t\}$ en **transposant** la matrice des résidus, puis

$$\hat\Sigma=\frac{1}{n-pm}\sum_{t=1}^n\hat\eta_t\hat\eta_t^T=\frac{1}{n-pm}\,Y^T\big(I_n-Z(Z^TZ)^{-1}Z^T\big)Y$$

qui est un estimateur **sans biais**.

> **Reconnaissez la matrice chapeau de la fiche 50** : $I_n-Z(Z^TZ)^{-1}Z^T$ est le projecteur sur l'orthogonal de l'espace des colonnes de $Z$. Et le diviseur $n-pm$ compte les degrés de liberté perdus par équation.

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème — optimalité des MCO.</span>

*Pour le modèle VAR($p$) **sans restriction** sur les matrices de coefficients $\Phi_1,\dots,\Phi_p$ :*

- *les estimations MCO **par composante** sont **égales** aux estimations **MCG** tenant compte du cas général d'une matrice de covariance d'innovation $\Sigma$ $(m\times m)$ à variances possiblement inégales et corrélations non nulles ;*
- *sous l'hypothèse que les $\{\eta_t\}$ sont i.i.d. de loi gaussienne multivariée $MN(0_m,\Sigma)$, les estimations MCO par composante sont **aussi les estimations du maximum de vraisemblance**.*

</div>

> **C'est le résultat le plus utile du chapitre**, et il est presque trop beau. Un système SUR avec erreurs corrélées appelle normalement des MCG — donc l'estimation jointe de toutes les équations et de $\Sigma$, avec des itérations. Ici, **on peut ignorer $\Sigma$ complètement** et faire $m$ régressions MCO séparées : le résultat est **identique**.
>
> **La raison tient en un mot : $Z$ est la même partout.** Toutes les équations ont **exactement les mêmes régresseurs**. Dès qu'on impose une restriction — exclure un retard d'une seule équation, par exemple —, les régresseurs diffèrent, le théorème **tombe**, et les MCG redeviennent nécessaires.

## 🔴 Concept 8 — Kronecker, vec et la démonstration

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — produit de Kronecker.</span>

*Le produit de Kronecker de la matrice $(m\times n)$ $A$ et de la matrice $(p\times q)$ $B$ est la matrice $(mp\times qn)$*

$$C=A\otimes B=\begin{pmatrix}a_{1,1}B&a_{1,2}B&\cdots&a_{1,n}B\\ a_{2,1}B&a_{2,2}B&\cdots&a_{2,n}B\\ \vdots&\vdots&\ddots&\vdots\\ a_{m,1}B&a_{m,2}B&\cdots&a_{m,n}B\end{pmatrix}$$

</div>

**Propriétés.**

$$(A\otimes B)^T=A^T\otimes B^T, \qquad (A\otimes B)(D\otimes F)=(AD)\otimes(BF)$$

*(où $D$ a $n$ lignes et $F$ a $q$ lignes).*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — opérateur vec.</span>

*L'opérateur $\mathrm{vec}$ convertit une matrice rectangulaire en vecteur colonne en **empilant les colonnes**.* Pour $A$ $(n\times m)$ :

$$\mathrm{vec}(A)=(a_{1,1},\dots,a_{n,1},\ a_{1,2},\dots,a_{n,2},\ \dots,\ a_{1,m},\dots,a_{n,m})^T$$

</div>

### Vectoriser le modèle

En partant de $Y=ZB+E$, on définit

$$y=\mathrm{vec}(Y)\ (nm\times1), \qquad X=I_m\otimes Z\ \big(nm\times(1+pm^2)\big)$$

$$\beta=\mathrm{vec}(B)\ \big((1+pm^2)\times1\big), \qquad \epsilon=\mathrm{vec}(E)\ (nm\times1)$$

Le modèle devient

$$y=X\beta+\epsilon, \qquad \epsilon\sim WN(0_{nm},\Omega) \ \text{ avec } \ \Omega=\Sigma\otimes I_n$$

### La démonstration de l'optimalité

Par le cas MCG du théorème de Gauss-Markov (fiche 50), l'estimateur **BLUE** est

$$\hat\beta=\big[X^T\Omega^{-1}X\big]^{-1}\big[X^T\Omega^{-1}y\big]$$

**Étape 1 — calculer $X^T\Omega^{-1}X$.** Avec $\Omega^{-1}=\Sigma^{-1}\otimes I_n$ :

$$X^T\Omega^{-1}X=(I_m\otimes Z)^T(\Sigma^{-1}\otimes I_n)(I_m\otimes Z)=(I_m\otimes Z^T)(\Sigma^{-1}\otimes Z)=\Sigma^{-1}\otimes(Z^TZ)$$

d'où

$$\big[X^T\Omega^{-1}X\big]^{-1}=\big[\Sigma^{-1}\otimes(Z^TZ)\big]^{-1}=\Sigma\otimes(Z^TZ)^{-1}$$

**Étape 2 — calculer $X^T\Omega^{-1}y$.**

$$X^T\Omega^{-1}y=(I_m\otimes Z)^T(\Sigma^{-1}\otimes I_n)y=(I_m\otimes Z^T)(\Sigma^{-1}\otimes I_n)y=(\Sigma^{-1}\otimes Z^T)y$$

**Étape 3 — conclure.**

$$\hat\beta=\big[\Sigma\otimes(Z^TZ)^{-1}\big](\Sigma^{-1}\otimes Z^T)y=\big[(\Sigma\Sigma^{-1})\otimes\big((Z^TZ)^{-1}Z^T\big)\big]y=\big[I_m\otimes(Z^TZ)^{-1}Z^T\big]y$$

$$\boxed{\ \hat\beta=\mathrm{vec}\big((Z^TZ)^{-1}Z^TY\big)\ }$$

$\blacksquare$

> **Regardez où $\Sigma$ disparaît : à l'étape 3, dans le produit $\Sigma\Sigma^{-1}=I_m$.** C'est toute la preuve. Et cette simplification n'est possible que parce que $X=I_m\otimes Z$ se **factorise** ainsi — c'est-à-dire, encore une fois, parce que toutes les équations partagent la **même** matrice de régresseurs $Z$.
>
> Le résultat final $\mathrm{vec}\big((Z^TZ)^{-1}Z^TY\big)$ est exactement l'empilement des $m$ estimations MCO $\hat\beta^{(j)}=(Z^TZ)^{-1}Z^Ty^{(j)}$. Les MCG **sont** les MCO.

## 🟠 Concept 9 — Maximum de vraisemblance et sélection d'ordre

**La vraisemblance.** Sous innovations gaussiennes, $\epsilon\sim N_{nm}(0_{nm},\Omega)$ avec $\Omega=\Sigma\otimes I_n$ :

$$L(\beta,\Omega)=\frac{1}{(2\pi)^{nm/2}}\lvert\Omega\rvert^{-1/2}\exp\left(-\frac12(y-X\beta)^T\Omega^{-1}(y-X\beta)\right)$$

**La log-vraisemblance**, en utilisant $\lvert\Sigma\otimes I_n\rvert=\lvert\Sigma\rvert^n$ :

$$\log L=-\frac{nm}{2}\log(2\pi)-\frac n2\log\lvert\Sigma\rvert-\frac12\mathrm{trace}\big[(Y-ZB)\Sigma^{-1}(Y-ZB)^T\big]$$

$$=-\frac n2\log\lvert\Sigma\rvert-\frac12Q(\beta,\Sigma)+\text{const}$$

> ***L'expression $Q(\beta,\Sigma)$ est le critère des moindres carrés généralisés, qui est minimisé par les estimations MCO composante par composante de $\beta$, pour **toute** matrice de covariance $\Sigma$ non singulière.***

**La vraisemblance concentrée.** Avec $\hat\beta=\mathrm{vec}(\hat B)$, l'EMV de $\Sigma$ minimise $\ell(\Sigma)=\log L(\hat\beta,\Sigma)$ :

$$\log L(\hat\beta,\Sigma)=-\frac n2\log\lvert\Sigma\rvert-\frac12\mathrm{trace}\big[\Sigma^{-1}(Y-Z\hat B)^T(Y-Z\hat B)\big]=-\frac n2\log\lvert\Sigma\rvert-\frac n2\mathrm{trace}\big[\Sigma^{-1}\tilde\Sigma\big]$$

où

$$\tilde\Sigma=\frac1n(Y-Z\hat B)^T(Y-Z\hat B)$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème.</span>

*$\tilde\Sigma$ est l'EMV de $\Sigma$ (Anderson et Olkin, 1979).*

</div>

⚠️ **Noter le diviseur $n$ et non $n-pm$** : comme toujours, l'EMV de la covariance est **biaisé** (fiche 50). L'estimateur sans biais du concept 7 divise par $n-pm$.

### Sélection de l'ordre

Des critères statistiques servent à choisir l'ordre $p$ du processus VAR :

1. Ajuster tous les modèles VAR($p$) avec $0\leq p\leq p_{\max}$.
2. Soit $\tilde\Sigma(p)$ l'EMV de $\Sigma=E(\eta_t\eta_t^T)$.
3. Choisir $p$ minimisant l'un de :

$$\textbf{AIC}(p)=\log\big\lvert\tilde\Sigma(p)\big\rvert+2\cdot\frac{pm^2}{n}$$

$$\textbf{BIC}(p)=\log\big\lvert\tilde\Sigma(p)\big\rvert+\log(n)\cdot\frac{pm^2}{n}$$

$$\textbf{HQ}(p)=\log\big\lvert\tilde\Sigma(p)\big\rvert+2\log(\log(n))\cdot\frac{pm^2}{n}$$

> **C'est mot pour mot les critères de la fiche 52**, avec deux substitutions : $\log\tilde\sigma^2$ devient $\log\lvert\tilde\Sigma\rvert$ — le déterminant remplace la variance scalaire — et le nombre de paramètres $p+q$ devient $pm^2$.
>
> **Et la pénalité en $m^2$ change tout en pratique.** Passer de $p$ à $p+1$ ajoute $m^2$ paramètres, pas $1$. Pour $m=5$, chaque retard supplémentaire coûte $25$ paramètres : les critères sélectionnent donc des ordres **très courts**, typiquement $p=1$ ou $2$. Le BIC, plus sévère, est souvent préféré.

## 🟠 Concept 10 — La distribution asymptotique

**Le cadre.** Pour un VAR($p$) stationnaire en covariance, les estimations MCO sont celles d'un modèle linéaire stationnaire $y=X\beta+\epsilon$, $\epsilon\sim WN(0_{nm},\Omega)$ avec $\Omega=\Sigma\otimes I_n$, issu de la vectorisation de $Y=ZB+E$ ($Y$ et $E$ sont $(n\times m)$, $Z$ est $(n\times(mp+1))$).

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème.</span>

*Si le processus de bruit blanc $\{\eta_t\}$ a des **moments d'ordre 4 finis et bornés** et est **indépendant** entre dates, alors :*

- *la matrice $(mp+1)\times(mp+1)$* $$\Gamma:=\underset{n\to\infty}{\mathrm{plim}}\ \frac{Z^TZ}{n} \quad\text{existe et est non singulière ;}$$
- *le vecteur $\hat\beta$, de dimension $m(mp+1)$, est **asymptotiquement conjointement normal** :* $$\boxed{\ \sqrt n\big(\hat\beta-\beta\big)\ \xrightarrow{\ d\ }\ N\big(0,\ \Sigma\otimes\Gamma^{-1}\big)\ }$$

</div>

**Les estimations à utiliser** quand $n$ est grand :

$$\hat\Gamma=\frac1nZ^TZ, \qquad \hat\Sigma=\frac1nY^T\big[I_n-Z(Z^TZ)^{-1}Z^T\big]Y$$

> *Asymptotiquement, les estimations des moindres carrés sont distribuées **identiquement** aux estimations du maximum de vraisemblance pour le modèle supposant des innovations gaussiennes.*

⚠️ **Deux remarques sur les hypothèses.**

- Les **moments d'ordre 4** sont exigés parce que les régresseurs sont eux-mêmes aléatoires : établir la loi de $\hat\beta$ demande de contrôler la variance de $Z^TZ$, donc des moments d'ordre $4$ de $X$.
- La conclusion est **asymptotique et sans hypothèse gaussienne** : la normalité de $\hat\beta$ ne vient pas d'une hypothèse sur $\eta_t$, mais d'un théorème central limite. C'est exactement la situation de la fiche 50 pour les MCO sur régresseurs aléatoires.

> **La structure de Kronecker de la variance asymptotique se lit très simplement** : $\Sigma$ gouverne la partie « entre équations », $\Gamma^{-1}$ la partie « entre coefficients d'une même équation ». Pour tester un coefficient isolé $[\Phi_k]_{j,j'}$, on extrait l'élément diagonal correspondant : $\sigma_{jj}\cdot[\Gamma^{-1}]_{\ell\ell}/n$.

## Comment résoudre l'exercice type (protocole)

1. **Vérifier la stationnarité** de chaque composante, et différencier si nécessaire (fiche 52).
2. **Choisir l'ordre $p$** par AIC, BIC ou HQ — en gardant à l'esprit le coût de $m^2$ paramètres par retard.
3. **Construire $Z$** : colonne de $1$, puis les $p$ retards de **toutes** les composantes.
4. **Estimer par MCO équation par équation** : $\hat\beta^{(j)}=(Z^TZ)^{-1}Z^Ty^{(j)}$ — c'est optimal, inutile de faire des MCG.
5. **Estimer $\Sigma$** : $\hat\Sigma=\frac{1}{n-pm}Y^T(I_n-Z(Z^TZ)^{-1}Z^T)Y$ (sans biais), ou avec $\frac1n$ (EMV).
6. **Vérifier la stationnarité estimée** : valeurs propres de la matrice compagnon $\hat A$ de module $<1$.
7. **Faire l'inférence** : $\sqrt n(\hat\beta-\beta)\to N(0,\Sigma\otimes\Gamma^{-1})$, avec $\hat\Gamma=Z^TZ/n$.
8. **Diagnostiquer** : les résidus $\hat\eta_t$ doivent être un bruit blanc **multivarié** — pas d'autocorrélation, à aucun retard, dans aucune équation croisée.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| plusieurs séries s'influençant mutuellement | **VAR($p$)** |
| « telle série précède telle autre » | regarder $[\Gamma_k]_{j,j'}$ pour $k>0$ |
| « influence dans les deux sens » | **rétroaction** |
| « le système est-il stable ? » | valeurs propres de la **matrice compagnon** $<1$ en module |
| « moyenne de long terme du système » | $\mu=(I-\Phi_1-\cdots-\Phi_p)^{-1}C$ |
| « erreurs corrélées entre équations » | SUR — mais ici **MCO suffisent** |
| « faut-il faire des MCG ? » | **non**, si aucune restriction sur les $\Phi_k$ |
| « combien de retards ? » | **AIC / BIC / HQ**, pénalité en $pm^2/n$ |
| « écart-type d'un coefficient » | $\Sigma\otimes\Gamma^{-1}$ divisé par $n$ |

### Exercices progressifs

**Niveau 1** — Combien de paramètres compte un VAR(2) à $m=4$ séries ?

<details><summary>Correction</summary>

**Les coefficients autorégressifs.** $p=2$ matrices $\Phi_k$ de taille $4\times4$ :

$$pm^2=2\times16=32$$

**Les constantes.** $C$ est un $m$-vecteur : $4$ paramètres.

**La covariance des innovations.** $\Sigma$ est symétrique $4\times4$ : $m(m+1)/2=10$ paramètres.

**Total** : $32+4+10=\mathbf{46}$ paramètres.

**La lecture pratique.** Par équation, il y a $mp+1=9$ régresseurs. Avec $n=100$ observations trimestrielles (25 ans !), cela fait environ $11$ observations par paramètre estimé — juste acceptable. Avec $m=8$, le même calcul donnerait $17$ régresseurs par équation et $128$ coefficients autorégressifs : intenable.

⚠️ **C'est pourquoi les VAR appliqués restent petits.** Au-delà de $6$ ou $7$ variables, on passe à des VAR **bayésiens** (avec a priori de rétrécissement, les *Minnesota priors*) ou à des **VAR factoriels**, qui résument l'information par quelques facteurs — exactement l'idée de la fiche 54.

</details>

**Niveau 2** — Pourquoi $\Gamma_k$ n'est-elle pas symétrique, et qu'est-ce que cela apporte ?

<details><summary>Correction</summary>

**Le calcul.** $[\Gamma_k]_{j,j'}=\mathrm{cov}(X_{j,t},X_{j',t-k})$ tandis que $[\Gamma_k]_{j',j}=\mathrm{cov}(X_{j',t},X_{j,t-k})$. Ces deux quantités comparent des choses **différentes** : dans la première, c'est $j$ qui est au présent et $j'$ au passé ; dans la seconde, l'inverse. Il n'y a aucune raison qu'elles coïncident.

**En revanche** $\Gamma_k=\Gamma_{-k}^T$ : la symétrie perdue est remplacée par une relation entre retards opposés. Et $\Gamma_0$, elle, **est** symétrique — au retard nul, il n'y a plus de sens temporel.

**Ce que cela apporte : la direction du temps.** Supposons $[\Gamma_1]_{j,j'}\neq0$ mais $[\Gamma_1]_{j',j}=0$. Alors $X_{j'}$ d'hier explique $X_j$ d'aujourd'hui, mais pas l'inverse : *$\{X_{t,j'}\}$ **précède** $\{X_{t,j}\}$*. C'est un **indicateur avancé**.

Si les deux sont non nulles, il y a **rétroaction** : chacune influence l'autre avec décalage.

**Pourquoi c'est le vrai apport du multivarié.** En univarié, la fonction d'autocovariance est paire et ne dit rien de la direction du temps. La matrice $\Gamma_k$, en étant asymétrique, **encode une orientation** — et c'est cette information que le VAR exploite, puis que la causalité au sens de Granger formalise en test.

⚠️ **Mais « précède » n'est pas « cause ».** Une troisième variable non modélisée peut faire bouger $X_{j'}$ avant $X_j$ sans qu'il y ait aucun lien causal. La corrélation croisée décalée établit un ordre temporel, pas un mécanisme.

</details>

**Niveau 3** — Démontrez que les MCG coïncident avec les MCO par composante.

<details><summary>Correction</summary>

**Le cadre vectorisé.** $y=X\beta+\epsilon$ avec $y=\mathrm{vec}(Y)$, $X=I_m\otimes Z$, $\beta=\mathrm{vec}(B)$ et $\mathrm{Cov}(\epsilon)=\Omega=\Sigma\otimes I_n$. Par Gauss-Markov généralisé (fiche 50), le BLUE est $\hat\beta=[X^T\Omega^{-1}X]^{-1}[X^T\Omega^{-1}y]$.

**Étape 1.** Avec $\Omega^{-1}=\Sigma^{-1}\otimes I_n$ et les propriétés $(A\otimes B)^T=A^T\otimes B^T$ et $(A\otimes B)(D\otimes F)=(AD)\otimes(BF)$ :

$$X^T\Omega^{-1}X=(I_m\otimes Z^T)(\Sigma^{-1}\otimes I_n)(I_m\otimes Z)=(I_m\otimes Z^T)(\Sigma^{-1}\otimes Z)=\Sigma^{-1}\otimes(Z^TZ)$$

**Étape 2.** L'inverse d'un produit de Kronecker est le produit de Kronecker des inverses :

$$\big[X^T\Omega^{-1}X\big]^{-1}=\Sigma\otimes(Z^TZ)^{-1}$$

**Étape 3.**

$$X^T\Omega^{-1}y=(I_m\otimes Z^T)(\Sigma^{-1}\otimes I_n)y=(\Sigma^{-1}\otimes Z^T)y$$

**Étape 4.**

$$\hat\beta=\big[\Sigma\otimes(Z^TZ)^{-1}\big]\big(\Sigma^{-1}\otimes Z^T\big)y=\big[(\Sigma\Sigma^{-1})\otimes\big((Z^TZ)^{-1}Z^T\big)\big]y=\big[I_m\otimes(Z^TZ)^{-1}Z^T\big]y$$

En dé-vectorisant : $\hat B=(Z^TZ)^{-1}Z^TY$, dont la colonne $j$ est exactement $\hat\beta^{(j)}=(Z^TZ)^{-1}Z^Ty^{(j)}$. $\blacksquare$

**Où est le cœur de la preuve ?** À l'étape 4, dans $\Sigma\Sigma^{-1}=I_m$. La matrice de covariance des innovations **s'annule contre elle-même**, et il ne reste que le projecteur MCO.

**Pourquoi cela est possible.** Uniquement parce que $X=I_m\otimes Z$ **se factorise** en un bloc « équations » ($I_m$) et un bloc « régresseurs » ($Z$) — c'est-à-dire parce que **toutes les équations partagent la même matrice $Z$**.

⚠️ **Et voilà la condition du théorème, qu'il faut savoir énoncer** : *« sans restriction sur les matrices de coefficients »*. Si l'on impose, par exemple, $[\Phi_2]_{1,3}=0$ dans la seule première équation, les régresseurs ne sont plus les mêmes partout, $X$ ne se factorise plus, et les MCG **redeviennent strictement meilleurs** que les MCO. C'est le cas général des systèmes SUR de Zellner.

</details>

**Niveau 4 — type examen** — Énoncez la condition de stationnarité d'un VAR($p$), justifiez l'équivalence des deux formes, et dites ce qui se passe si elle échoue.

<details><summary>Correction</summary>

**Les deux formes.**

1. Toutes les **valeurs propres de la matrice compagnon $A$** ont un module $<1$.
2. Toutes les racines de $\det(I_m-\Phi_1z-\cdots-\Phi_pz^p)=0$ sont **hors du cercle unité** $\{\lvert z\rvert\leq1\}$.

**Pourquoi la forme (1) est naturelle.** En posant $Z_t=(X_t^T,\dots,X_{t-p+1}^T)^T$, le VAR($p$) devient le VAR(1)

$$Z_t=D+AZ_{t-1}+F$$

En itérant, $Z_t=\sum_{k\geq0}A^k(D+F_{t-k})$. Cette série converge si et seulement si $A^k\to0$, c'est-à-dire si le **rayon spectral** de $A$ est $<1$. C'est la version matricielle exacte de la condition $\lvert\phi\rvert<1$ pour l'AR(1) de la fiche 52.

**Pourquoi (1) et (2) sont équivalentes.** Le polynôme caractéristique de la matrice compagnon se calcule par blocs et donne

$$\det(A-\lambda I_{mp})=\pm\lambda^{mp}\det\big(I_m-\Phi_1\lambda^{-1}-\cdots-\Phi_p\lambda^{-p}\big)$$

Donc $\lambda$ est valeur propre de $A$ si et seulement si $z=1/\lambda$ annule $\det(I_m-\Phi_1z-\cdots-\Phi_pz^p)$. Les deux ensembles de nombres sont **inverses** l'un de l'autre : « module $<1$ » pour les valeurs propres équivaut à « module $>1$ » pour les racines, c'est-à-dire hors du cercle unité. $\blacksquare$

**Ce qui se passe si la condition échoue.**

- **Une racine sur le cercle unité** ($z=1$) : le système a une **racine unitaire multivariée**. La conséquence immédiate est que $(I-\Phi_1-\cdots-\Phi_p)$ est **singulière**, donc $\mu=(I-\Phi_1-\cdots-\Phi_p)^{-1}C$ n'existe pas : le système **n'a pas de moyenne de long terme**. Comme en fiche 52, les chocs deviennent **permanents** et la variance croît sans borne.
- **Une racine à l'intérieur du cercle** : le système est **explosif**.

**Le cas intéressant que le multivarié fait apparaître — la cointégration.** Chaque série peut être individuellement $I(1)$ — non stationnaire — tandis que certaines **combinaisons linéaires** sont stationnaires. Le rang de $(I-\Phi_1-\cdots-\Phi_p)$ compte alors le nombre de ces relations d'équilibre de long terme. On sort du VAR standard pour entrer dans le **modèle vectoriel à correction d'erreur (VECM)**. C'est une situation sans équivalent univarié, et c'est le sujet naturel de la suite du cours.

**En pratique, comment vérifier.** Après estimation, on calcule les valeurs propres de $\hat A$ : toutes doivent être **strictement à l'intérieur** du disque unité. Une valeur propre proche de $1$ en module est un signal d'alerte — le système est presque non stationnaire, et l'inférence asymptotique du concept 10 devient peu fiable.

</details>

## 🔴 Common mistakes

1. **Croire que $\Gamma_k$ est symétrique** — seule $\Gamma_0$ l'est ; on a $\Gamma_k=\Gamma_{-k}^T$.
2. **Se tromper de côté sur les racines** — valeurs propres de $A$ : module $<1$ ; racines du déterminant : **hors** du cercle unité.
3. **Croire qu'il faut des MCG** — non, si aucune restriction n'est imposée sur les $\Phi_k$ : les MCO par composante **sont** les MCG.
4. **Oublier que ce théorème tombe sous restrictions** — dès que les équations n'ont plus les mêmes régresseurs, il faut des MCG.
5. **Oublier que $Z$ est la même pour toutes les équations** — c'est la condition qui rend l'optimalité possible.
6. **Confondre les deux estimateurs de $\Sigma$** — $\frac{1}{n-pm}$ (sans biais) contre $\frac1n$ (EMV, biaisé).
7. **Sous-estimer le coût en paramètres** — chaque retard supplémentaire coûte $m^2$ coefficients, pas $1$.
8. **Interpréter « précède » comme « cause »** — la corrélation croisée décalée établit un ordre, pas un mécanisme.
9. **Oublier les conditions initiales** — un VAR($p$) exige $p$ observations pré-échantillon.
10. **Faire l'inférence asymptotique sur un système presque non stationnaire** — les valeurs propres proches de $1$ invalident la normalité asymptotique.

## 📌 Ultimate Review

1. **Stationnarité multivariée** : $\{X_t\}$ est stationnaire en covariance si **chaque composante** l'est.
2. **Moments** : $\mu=E[X_t]$ ($m\times1$) · $\Gamma_0=\mathrm{Var}(X_t)$ · $R_0=D^{-1/2}\Gamma_0D^{-1/2}$ avec $D=\mathrm{diag}(\Gamma_0)$.
3. **Croisés** : $\Gamma_k=\mathrm{Cov}(X_t,X_{t-k})=E[(X_t-\mu)(X_{t-k}-\mu)^T]$, $R_k=D^{-1/2}\Gamma_kD^{-1/2}$.
4. **Propriétés** : $\Gamma_0,R_0$ **symétriques** ; $\Gamma_k,R_k$ **non symétriques** ; $\Gamma_k=\Gamma_{-k}^T$.
5. **Avance et rétroaction** : $[\Gamma_k]_{j,j'}\neq0$ pour $k>0$ ⟹ $\{X_{t,j'}\}$ **précède** $\{X_{t,j}\}$ ; dans les deux sens ⟹ **rétroaction**.
6. **Wold multivarié** : $X_t=V_t+\sum_{k\geq0}\Psi_k\eta_{t-k}$, $\Psi_0=I_m$, $\sum\Psi_k\Psi_k^T$ converge, $\eta$ bruit blanc multivarié de covariance $\Sigma$.
7. **VAR($p$)** : $X_t=C+\Phi_1X_{t-1}+\cdots+\Phi_pX_{t-p}+\eta_t$, $\eta_t\sim MVN(0_m,\Sigma)$.
8. **Composante $j$** : AR($p$) sur soi-même **plus** régression sur les retards de toutes les autres.
9. **Forme compagnon** : $Z_t=D+AZ_{t-1}+F$, $A$ de taille $mp\times mp$ ⟹ tout VAR($p$) est un VAR(1).
10. **Stationnarité** : valeurs propres de $A$ de module $<1$ ⟺ racines de $\det(I_m-\Phi_1z-\cdots-\Phi_pz^p)=0$ **hors** du cercle unité.
11. **Moyenne** : $\mu=(I-\Phi_1-\cdots-\Phi_p)^{-1}C$, et $C=(I-\Phi_1-\cdots-\Phi_p)\mu$.
12. **Système de régressions** : $y^{(j)}=Z\beta^{(j)}+\epsilon^{(j)}$ ; **$Z$ identique pour tout $j$** ; $Y=ZB+E$ ; forme **SUR**.
13. **Estimation** : $\hat\beta^{(j)}=(Z^TZ)^{-1}Z^Ty^{(j)}$ ; $\hat\Sigma=\frac{1}{n-pm}Y^T(I_n-Z(Z^TZ)^{-1}Z^T)Y$.
14. **Théorème d'optimalité** : sans restriction sur les $\Phi_k$, MCO par composante $=$ MCG $=$ EMV sous gaussienne.
15. **Kronecker** : $(A\otimes B)^T=A^T\otimes B^T$, $(A\otimes B)(D\otimes F)=(AD)\otimes(BF)$ ; **vec** empile les colonnes.
16. **Vectorisation** : $y=\mathrm{vec}(Y)$, $X=I_m\otimes Z$, $\beta=\mathrm{vec}(B)$, $\Omega=\Sigma\otimes I_n$ ⟹ $\hat\beta=\mathrm{vec}\big((Z^TZ)^{-1}Z^TY\big)$.
17. **EMV** : $\tilde\Sigma=\frac1n(Y-Z\hat B)^T(Y-Z\hat B)$ est l'EMV (Anderson et Olkin, 1979) — **biaisé**.
18. **Sélection** : $\log\lvert\tilde\Sigma(p)\rvert+c_n\cdot\frac{pm^2}{n}$, avec $c_n=2$ (AIC), $\log n$ (BIC), $2\log\log n$ (HQ).
19. **Asymptotique** : moments d'ordre 4 bornés et indépendance ⟹ $\Gamma=\mathrm{plim}\,Z^TZ/n$ non singulière et $$\sqrt n(\hat\beta-\beta)\xrightarrow{d}N(0,\Sigma\otimes\Gamma^{-1})$$
20. **Estimations pratiques** : $\hat\Gamma=Z^TZ/n$, $\hat\Sigma=\frac1nY^T[I_n-Z(Z^TZ)^{-1}Z^T]Y$.

**Formulas to know**

$$\Gamma_k=\Gamma_{-k}^T \qquad X_t=C+\sum_{k=1}^p\Phi_kX_{t-k}+\eta_t \qquad \mu=(I-\Phi_1-\cdots-\Phi_p)^{-1}C$$

$$\hat\beta^{(j)}=(Z^TZ)^{-1}Z^Ty^{(j)} \qquad \hat\Sigma=\frac{Y^T(I_n-Z(Z^TZ)^{-1}Z^T)Y}{n-pm} \qquad \Omega=\Sigma\otimes I_n$$

$$AIC(p)=\log\lvert\tilde\Sigma(p)\rvert+2\frac{pm^2}{n} \qquad \sqrt n(\hat\beta-\beta)\xrightarrow{d}N(0,\Sigma\otimes\Gamma^{-1})$$

**Methods to know** : la construction de la matrice compagnon ; la dérivation de $\mu$ ; la démonstration MCG $=$ MCO par Kronecker en 4 étapes ; le décompte des paramètres.

## 🧠 Active Recall

**Basic** — Écrivez le modèle VAR($p$) et donnez sa condition de stationnarité.

<details><summary>Réponse</summary>

$$X_t=C+\Phi_1X_{t-1}+\Phi_2X_{t-2}+\cdots+\Phi_pX_{t-p}+\eta_t, \qquad \eta_t\sim MVN(0_m,\Sigma)$$

avec $C$ un $m$-vecteur et les $\Phi_k$ des matrices $(m\times m)$.

**Stationnarité** — deux formulations équivalentes :

- toutes les **valeurs propres de la matrice compagnon $A$** sont de module $<1$ ;
- toutes les racines de $\det(I_m-\Phi_1z-\cdots-\Phi_pz^p)=0$ sont **hors du cercle unité**.

</details>

**Understanding** — Pourquoi les MCO équation par équation suffisent-ils, alors que les erreurs sont corrélées entre équations ?

<details><summary>Réponse</summary>

Parce que **toutes les équations ont exactement la même matrice de régresseurs $Z$** — celle qui contient les retards de toutes les composantes.

Formellement, la vectorisation donne $X=I_m\otimes Z$ et $\Omega=\Sigma\otimes I_n$, si bien que dans le calcul MCG

$$\hat\beta=\big[\Sigma\otimes(Z^TZ)^{-1}\big](\Sigma^{-1}\otimes Z^T)y=\big[I_m\otimes(Z^TZ)^{-1}Z^T\big]y$$

la matrice $\Sigma$ **s'annule contre son inverse**. Le résultat est l'empilement des $m$ estimations MCO.

⚠️ **Ce résultat vaut « sans restriction sur les matrices de coefficients ».** Dès qu'on contraint un coefficient dans une seule équation, les régresseurs diffèrent, $X$ ne se factorise plus, et les **MCG redeviennent strictement meilleurs**.

</details>

**Application** — Comment détecter qu'une série en précède une autre ?

<details><summary>Réponse</summary>

On examine les éléments hors diagonale de la matrice d'autocovariance croisée **à retard positif** :

$$[\Gamma_k]_{j,j'}=\mathrm{Cov}(X_{t,j},X_{t-k,j'})\neq0 \ \text{ pour un } k>0 \quad\Longrightarrow\quad \{X_{t,j'}\} \text{ **précède** } \{X_{t,j}\}$$

Et si la relation vaut **dans les deux sens**, il y a **rétroaction**.

**Ce qui rend cette lecture possible**, c'est la **non-symétrie** de $\Gamma_k$ : $\mathrm{cov}(X_{1,t},X_{2,t-1})$ et $\mathrm{cov}(X_{2,t},X_{1,t-1})$ sont deux quantités différentes. En univarié, l'autocovariance est paire et ne dit rien de la direction du temps.

⚠️ **« Précède » n'est pas « cause »** : une troisième variable non modélisée peut créer l'ordre temporel sans aucun lien causal.

</details>

**Comparison** — AR($p$) et VAR($p$) : qu'est-ce qui change vraiment ?

<details><summary>Réponse</summary>

|  | **AR($p$)** (fiche 52) | **VAR($p$)** |
|---|---|---|
| Coefficients | $p$ scalaires $\phi_k$ | $p$ matrices $\Phi_k$ ⟹ $pm^2$ |
| Autocovariance | $\gamma(k)$, **paire** | $\Gamma_k$, **non symétrique**, $\Gamma_k=\Gamma_{-k}^T$ |
| Stationnarité | racines de $\phi(z)$ hors du cercle | racines de $\det(I-\sum\Phi_kz^k)$ hors du cercle |
| Moyenne | $\mu=c/\phi(1)$ | $\mu=(I-\sum\Phi_k)^{-1}C$ |
| Estimation | MCO | MCO **par composante** — et c'est optimal |
| Sélection | $\log\tilde\sigma^2+c_n\frac{p+q}{n}$ | $\log\lvert\tilde\Sigma\rvert+c_n\frac{pm^2}{n}$ |
| Information nouvelle | — | **avance, retard, rétroaction** |

**Ce qui change vraiment, en un mot** : la **direction du temps entre séries**. C'est le seul contenu véritablement nouveau, et il est porté par la non-symétrie de $\Gamma_k$.

**Ce qui ne change pas** : la logique d'ensemble. Wold garantit une représentation MA($\infty$), le VAR la paramétrise en fini, la stationnarité se lit sur des racines, et les critères d'information choisissent l'ordre.

**Le prix à payer** : $m^2$ paramètres par retard au lieu de $1$. C'est ce qui limite les VAR appliqués à quelques variables et pousse vers les VAR bayésiens ou factoriels.

</details>

**Exam-style** — Expliquez la vectorisation par Kronecker et son rôle dans la théorie de l'estimation du VAR.

<details><summary>Réponse</summary>

**Les deux outils.**

- Le **produit de Kronecker** $A\otimes B$ remplace chaque élément $a_{i,j}$ de $A$ par le bloc $a_{i,j}B$. Ses deux propriétés utiles : $(A\otimes B)^T=A^T\otimes B^T$ et $(A\otimes B)(D\otimes F)=(AD)\otimes(BF)$.
- L'opérateur **vec** empile les **colonnes** d'une matrice en un seul vecteur.

**La vectorisation.** Le modèle multivarié $Y=ZB+E$ devient

$$y=X\beta+\epsilon \quad\text{avec}\quad y=\mathrm{vec}(Y),\ X=I_m\otimes Z,\ \beta=\mathrm{vec}(B),\ \epsilon=\mathrm{vec}(E)$$

et $\mathrm{Cov}(\epsilon)=\Omega=\Sigma\otimes I_n$.

**Pourquoi c'est utile — trois raisons.**

**1. Cela ramène le multivarié à du connu.** Une fois vectorisé, le modèle est un **modèle linéaire ordinaire** de la fiche 50, avec une covariance non sphérique. Tout Gauss-Markov généralisé s'applique tel quel.

**2. Cela permet la démonstration d'optimalité.** Le calcul MCG donne

$$X^T\Omega^{-1}X=\Sigma^{-1}\otimes(Z^TZ), \qquad X^T\Omega^{-1}y=(\Sigma^{-1}\otimes Z^T)y$$

$$\hat\beta=\big[\Sigma\otimes(Z^TZ)^{-1}\big](\Sigma^{-1}\otimes Z^T)y=\big[I_m\otimes(Z^TZ)^{-1}Z^T\big]y=\mathrm{vec}\big((Z^TZ)^{-1}Z^TY\big)$$

Le $\Sigma$ **s'annule** contre $\Sigma^{-1}$, et les MCG se réduisent aux MCO par composante. Sans le formalisme de Kronecker, ce calcul serait à peu près inécrivable.

**3. Cela structure la variance asymptotique.**

$$\sqrt n(\hat\beta-\beta)\xrightarrow{d}N\big(0,\ \Sigma\otimes\Gamma^{-1}\big), \qquad \Gamma=\mathrm{plim}\,\frac{Z^TZ}{n}$$

La forme Kronecker se lit directement : $\Sigma$ gouverne la dépendance **entre équations**, $\Gamma^{-1}$ la dépendance **entre coefficients** d'une même équation. Pour l'écart-type d'un coefficient isolé, on prend $\sqrt{\sigma_{jj}[\Gamma^{-1}]_{\ell\ell}/n}$.

**Le point conceptuel à retenir.** Le produit de Kronecker est exactement le langage des situations où **deux structures indépendantes se superposent** : ici, la structure « équations » et la structure « observations et régresseurs ». Chaque fois que $X=I_m\otimes Z$ — c'est-à-dire chaque fois que toutes les équations partagent les mêmes régresseurs —, les deux structures se découplent et l'estimation se simplifie radicalement.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Quand $\{X_t\}$ est-elle stationnaire en covariance ? | Quand **chaque composante** l'est |
| Matrice de corrélation $R_0$ ? | $D^{-1/2}\Gamma_0D^{-1/2}$, $D=\mathrm{diag}(\Gamma_0)$ |
| Autocovariance croisée $\Gamma_k$ ? | $E[(X_t-\mu)(X_{t-k}-\mu)^T]$ |
| $\Gamma_k$ est-elle symétrique ? | **Non** — seule $\Gamma_0$ l'est |
| Relation entre $\Gamma_k$ et $\Gamma_{-k}$ ? | $\Gamma_k=\Gamma_{-k}^T$ |
| Quand dit-on que $j'$ précède $j$ ? | Si $[\Gamma_k]_{j,j'}\neq0$ pour un $k>0$ |
| Qu'est-ce que la rétroaction ? | Chacune précède l'autre |
| Wold multivarié ? | $X_t=V_t+\sum_k\Psi_k\eta_{t-k}$, $\Psi_0=I_m$ |
| Condition sur les $\Psi_k$ ? | $\sum_k\Psi_k\Psi_k^T$ **converge** |
| Modèle VAR($p$) ? | $X_t=C+\sum_{k=1}^p\Phi_kX_{t-k}+\eta_t$ |
| Nombre de coefficients autorégressifs ? | $pm^2$ |
| Forme compagnon ? | $Z_t=D+AZ_{t-1}+F$, $A$ de taille $mp\times mp$ |
| Stationnarité, forme 1 ? | Valeurs propres de $A$ de module $<1$ |
| Stationnarité, forme 2 ? | Racines de $\det(I_m-\sum\Phi_kz^k)=0$ **hors** du cercle unité |
| Moyenne d'un VAR stationnaire ? | $(I-\Phi_1-\cdots-\Phi_p)^{-1}C$ |
| Que contient $Z$ ? | Une constante et les $p$ retards de **toutes** les composantes |
| $Z$ change-t-elle selon l'équation ? | **Non** — c'est la clé de l'optimalité |
| Nom de la forme du modèle ? | **SUR** (régressions apparemment non reliées) |
| Estimateur MCO ? | $\hat\beta^{(j)}=(Z^TZ)^{-1}Z^Ty^{(j)}$ |
| Estimateur sans biais de $\Sigma$ ? | $\frac{1}{n-pm}Y^T(I_n-Z(Z^TZ)^{-1}Z^T)Y$ |
| Le théorème d'optimalité ? | MCO par composante $=$ MCG $=$ EMV (sans restriction) |
| Sous quelle condition tombe-t-il ? | Dès qu'on **restreint** les $\Phi_k$ |
| Propriétés du produit de Kronecker ? | $(A\otimes B)^T=A^T\otimes B^T$ ; $(A\otimes B)(D\otimes F)=(AD)\otimes(BF)$ |
| Que fait l'opérateur vec ? | Il **empile les colonnes** |
| $X$ et $\Omega$ après vectorisation ? | $X=I_m\otimes Z$, $\Omega=\Sigma\otimes I_n$ |
| Résultat du calcul MCG ? | $\hat\beta=\mathrm{vec}\big((Z^TZ)^{-1}Z^TY\big)$ |
| EMV de $\Sigma$ ? | $\frac1n(Y-Z\hat B)^T(Y-Z\hat B)$ — **biaisé** |
| Qui a démontré ce résultat ? | **Anderson et Olkin (1979)** |
| Critère AIC multivarié ? | $\log\lvert\tilde\Sigma(p)\rvert+2\,pm^2/n$ |
| Loi asymptotique de $\hat\beta$ ? | $\sqrt n(\hat\beta-\beta)\xrightarrow{d}N(0,\Sigma\otimes\Gamma^{-1})$ |
| Que vaut $\Gamma$ ? | $\mathrm{plim}\ Z^TZ/n$ |
| Quelle hypothèse sur les moments ? | Moments d'ordre **4** finis et bornés, indépendance entre dates |
