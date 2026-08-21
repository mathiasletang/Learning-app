# Fiche 54 — Modèles à facteurs : Sharpe, macroéconomiques, fondamentaux et statistiques

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | Kempthorne, *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 15 « Factor Models » |
| **Difficulté** | Must know — l'ossature de la gestion quantitative moderne |
| **Temps d'étude estimé** | 2 h 45 |
| **Prérequis** | Fiche 50 (MCO, Gauss-Markov, MCG), fiche 51 (matrice de covariance, contraintes factorielles), fiche 9 (valeurs propres, matrices symétriques) |
| **Concepts clés** | Modèle linéaire à facteurs, chargements factoriels, régressions transversales et temporelles, modèle à indice unique de Sharpe, facteurs macroéconomiques, approches BARRA et Fama-French, analyse factorielle, invariance par rotation, analyse en composantes principales, décomposition en valeurs singulières, méthode du facteur principal |
| **Poids à l'examen** | Trois choses : la décomposition $\Sigma_x=B\Sigma_fB^T+\Psi$ et **pourquoi elle résout le problème d'estimation** de la fiche 51 ; le fait que $\hat f_t$ du modèle sectoriel BARRA soit une **moyenne par secteur** ; et la construction de l'ACP par maximisation de variance. |

## 🎯 Vue d'ensemble

**Les données.** $m$ actifs, instruments ou indices ($i=1,\dots,m$), observés sur $n$ périodes ($t=1,\dots,n$), formant à chaque période un vecteur aléatoire à $m$ dimensions

$$x_t=(x_{1,t},x_{2,t},\dots,x_{m,t})^T$$

*Par exemple : les rendements de $m$ actions, contrats à terme ou devises ; ou les taux de rendement de $m$ instruments du Trésor américain.*

```
IDÉE          m actifs, K facteurs communs, avec K ≪ m
MODÈLE        x_{i,t} = α_i + β_i'f_t + ε_{i,t}
CONSÉQUENCE   Σ_x = B Σ_f B' + Ψ      ← Ψ diagonale
GAIN          m(m+1)/2 paramètres  →  mK + K(K+1)/2 + m
```

> **Le problème que les facteurs résolvent.** La fiche 51 a signalé le point faible de Markowitz : estimer $\Sigma$ librement demande $m(m+1)/2$ paramètres — plus de $125\,000$ pour $m=500$. Un modèle à $K$ facteurs impose une **structure** : toute la corrélation entre actifs passe par $K$ variables communes, et le reste est **diagonal**. Le nombre de paramètres s'effondre, et $\hat\Sigma$ redevient bien conditionnée.

**Les quatre familles**, qui diffèrent seulement par **d'où viennent les facteurs** :

| Famille | $f_t$ | $B$ |
|---|---|---|
| **Macroéconomique** | **observé** (inflation, PIB, taux…) | estimé par régression temporelle |
| **Fondamental (Fama-French)** | **construit** par tris transversaux | estimé par régression temporelle |
| **Fondamental (BARRA)** | **estimé** par régression transversale | **observé** (secteur, taille, style) |
| **Statistique** | **latent** | latent — les deux sont extraits de $\hat\Sigma_x$ |

## 🔴 Concept 1 — Le modèle linéaire à facteurs

$$\boxed{\ x_{i,t}=\alpha_i+\beta_{1,i}f_{1,t}+\beta_{2,i}f_{2,t}+\cdots+\beta_{K,i}f_{K,t}+\varepsilon_{i,t}=\alpha_i+\beta_i^Tf_t+\varepsilon_{i,t}\ }$$

| Symbole | Signification | Constant en |
|---|---|---|
| $\alpha_i$ | **ordonnée à l'origine** de l'actif $i$ | $t$ |
| $f_t=(f_{1,t},\dots,f_{K,t})^T$ | **variables de facteur commun** à la période $t$ | $i$ |
| $\beta_i=(\beta_{1,i},\dots,\beta_{K,i})^T$ | **chargements factoriels** (*factor loadings*) de l'actif $i$ | $t$ |
| $\varepsilon_{i,t}$ | **facteur spécifique** de l'actif $i$ à la période $t$ | — |

> **La dissymétrie est toute l'idée.** $f_t$ varie dans le temps mais est **le même pour tous les actifs** ; $\beta_i$ varie d'un actif à l'autre mais est **constant dans le temps**. Le facteur est le mouvement d'ensemble, le chargement est la sensibilité individuelle à ce mouvement.

### Les trois écritures du même modèle

**(a) Régressions transversales** (*cross-sectional*) — une équation par **période** :

$$x_t=\alpha+Bf_t+\varepsilon_t \qquad \text{pour chaque } t\in\{1,\dots,T\}$$

avec

$$\alpha=\begin{pmatrix}\alpha_1\\\vdots\\\alpha_m\end{pmatrix}(m\times1), \qquad B=\begin{pmatrix}\beta_1^T\\\vdots\\\beta_m^T\end{pmatrix}=\big[\beta_{i,k}\big](m\times K), \qquad \varepsilon_t=\begin{pmatrix}\varepsilon_{1,t}\\\vdots\\\varepsilon_{m,t}\end{pmatrix}(m\times1)$$

*$\alpha$ et $B$ sont les mêmes pour tout $t$.*

**Les hypothèses.**

- $\{f_t\}$ est ($K$-varié) **stationnaire en covariance $I(0)$**, avec $$E[f_t]=\mu_f, \qquad \mathrm{Cov}[f_t]=E\big[(f_t-\mu_f)(f_t-\mu_f)^T\big]=\Sigma_f$$
- $\{\varepsilon_t\}$ est un **bruit blanc $m$-varié** : $$E[\varepsilon_t]=0_m, \qquad \mathrm{Cov}[\varepsilon_t]=E[\varepsilon_t\varepsilon_t^T]=\Psi, \qquad \mathrm{Cov}[\varepsilon_t,\varepsilon_{t'}]=E[\varepsilon_t\varepsilon_{t'}^T]=0 \ \ \forall t\neq t'$$ où $\Psi$ est la matrice **diagonale** $(m\times m)$ d'entrées $(\psi_1^2,\psi_2^2,\dots,\psi_m^2)$.

⚠️ **La diagonalité de $\Psi$ est l'hypothèse-clé du chapitre**, et c'est elle qui porte tout le gain. Elle dit : *une fois retirés les $K$ facteurs communs, il ne reste **aucune** corrélation entre actifs*. Toute la dépendance transversale est passée par $f_t$.

**Les moments.** $\{x_t\}$ est une série temporelle multivariée stationnaire en covariance avec

| Moments **conditionnels** | Moments **inconditionnels** |
|---|---|
| $E[x_t\mid f_t]=\alpha+Bf_t$ | $E[x_t]=\mu_x=\alpha+B\mu_f$ |
| $\mathrm{Cov}[x_t\mid f_t]=\Psi$ | $\boxed{\mathrm{Cov}[x_t]=\Sigma_x=B\Sigma_fB^T+\Psi}$ |

> **Cette dernière ligne est LA formule du chapitre.** La covariance des rendements se scinde en un **risque commun** $B\Sigma_fB^T$ — de rang au plus $K$ — et un **risque spécifique** $\Psi$, diagonal. C'est cette décomposition qui rend l'optimisation de portefeuille de la fiche 51 praticable sur des univers de plusieurs centaines d'actifs.

**Le décompte des paramètres.** $\Sigma_x$ libre : $m(m+1)/2$. Avec $K$ facteurs : $mK$ (les $B$) $+\ K(K+1)/2$ (les $\Sigma_f$) $+\ m$ (les $\Psi$). Pour $m=500$ et $K=5$ : $125\,250$ contre $3\,015$.

**(b) Régressions temporelles** (*time series*) — une équation par **actif** :

$$x_i=1_T\alpha_i+F\beta_i+\varepsilon_i \qquad \text{pour chaque actif } i\in\{1,\dots,m\}$$

avec

$$x_i=\begin{pmatrix}x_{i,1}\\\vdots\\x_{i,T}\end{pmatrix}, \qquad \varepsilon_i=\begin{pmatrix}\varepsilon_{i,1}\\\vdots\\\varepsilon_{i,T}\end{pmatrix}, \qquad F=\begin{pmatrix}f_1^T\\\vdots\\f_T^T\end{pmatrix}=\begin{pmatrix}f_{1,1}&f_{2,1}&\cdots&f_{K,1}\\ \vdots&\vdots&\ddots&\vdots\\ f_{1,T}&f_{2,T}&\cdots&f_{K,T}\end{pmatrix}$$

$\alpha_i$ et $\beta_i=(\beta_{1,i},\dots,\beta_{K,i})^T$ sont des **paramètres de régression**, et $\varepsilon_i$ est le $T$-vecteur des erreurs, de $\mathrm{Cov}(\varepsilon_i)=\sigma_i^2I_T$.

**(c) Régression multivariée.** Avec $X=[x_1\vert\cdots\vert x_m]$, $E=[\varepsilon_1\vert\cdots\vert\varepsilon_m]$ et $B=[\beta_1\vert\cdots\vert\beta_m]$ :

$$X=1_T\alpha^T+FB+E$$

*(noter que ce $B$ est la **transposée** du $B$ transversal.)*

> **Ces trois écritures gouvernent trois stratégies d'estimation.** Si $F$ est **observé**, on régresse dans le temps, actif par actif — écriture (b). Si $B$ est **observé**, on régresse en coupe, période par période — écriture (a). Si **ni l'un ni l'autre** n'est observé, il faut une méthode statistique — concepts 6 à 8.

## 🔴 Concept 2 — Le modèle à indice unique de Sharpe (1970)

$$x_{i,t}=\alpha_i+\beta_iR_{Mt}+\varepsilon_{i,t}, \qquad i=1,\dots,m, \quad t=1,\dots,T$$

où

- $R_{Mt}$ est le rendement de l'**indice de marché en excès du taux sans risque** : le **facteur de risque de marché** ;
- $x_{i,t}$ est le rendement de l'actif $i$ en excès du taux sans risque ;
- $K=1$ et l'unique facteur est $f_{1,t}=R_{Mt}$.

**La matrice de covariance transversale inconditionnelle des actifs.**

$$\mathrm{Cov}(x_t)=\Sigma_x=\sigma_M^2\,\beta\beta^T+\Psi$$

avec $\sigma_M^2=\mathrm{Var}(R_{Mt})$, $\beta=(\beta_1,\dots,\beta_m)^T$ et $\Psi=\mathrm{diag}(\psi_1^2,\dots,\psi_m^2)$.

> **Le modèle le plus économe qui soit.** $\Sigma_x$ est décrite par $2m+1$ nombres — un bêta et une variance spécifique par actif, plus la variance du marché. La corrélation entre deux actifs quelconques devient
>
> $$\mathrm{Corr}(x_i,x_j)=\frac{\beta_i\beta_j\sigma_M^2}{\sqrt{(\beta_i^2\sigma_M^2+\psi_i^2)(\beta_j^2\sigma_M^2+\psi_j^2)}}$$
>
> Deux actifs ne sont corrélés que parce qu'ils réagissent tous deux au marché. C'est le « **modèle à indice unique de Sharpe** » cité comme remède à l'erreur d'estimation en fiche 51.

**L'estimation.** *Le modèle à indice unique satisfait les hypothèses de **Gauss-Markov généralisées**, donc les estimateurs des moindres carrés $(\hat\alpha_i,\hat\beta_i)$ issus de la régression temporelle de chaque actif $i$ sont les **meilleurs estimateurs linéaires sans biais (BLUE)** et les **EMV** sous hypothèses gaussiennes.*

$$x_i=1_T\hat\alpha_i+R_M\hat\beta_i+\hat\varepsilon_i$$

**Estimateurs sans biais des paramètres restants.**

$$\hat\psi_i^2=\frac{\hat\varepsilon_i^T\hat\varepsilon_i}{T-2}, \qquad \hat\sigma_M^2=\frac{\sum_{t=1}^T(R_{Mt}-\bar R_M)^2}{T-1} \ \text{ avec } \bar R_M=\frac1T\sum_{t=1}^TR_{Mt}, \qquad \hat\Psi=\mathrm{diag}(\hat\psi_1^2,\dots,\hat\psi_m^2)$$

**Estimateur de la matrice de covariance inconditionnelle.**

$$\widehat{\mathrm{Cov}}(x_t)=\hat\Sigma_x=\hat\sigma_M^2\,\hat\beta\hat\beta^T+\hat\Psi$$

⚠️ **Le diviseur $T-2$** vient de la fiche 50 : deux paramètres estimés par régression ($\alpha_i$ et $\beta_i$), donc $T-2$ degrés de liberté.

## 🟠 Concept 3 — Modèles multifactoriels macroéconomiques

*Les variables de facteur commun $\{f_t\}$ sont les valeurs réalisées de **variables macroéconomiques**, telles que :*

- **Risque de marché**
- **Indices de prix** (CPI, PPI, matières premières) / **inflation**
- **Production industrielle** (PIB)
- **Croissance de la masse monétaire**
- **Taux d'intérêt**
- **Mises en chantier** (*housing starts*)
- **Chômage**

*Voir Chen, Ross et Roll (1986), « Economic Forces and the Stock Market ».*

**Le modèle comme régressions temporelles.**

$$x_i=1_T\alpha_i+F\beta_i+\varepsilon_i$$

où $F=[f_1,f_2,\dots,f_T]^T$ est la matrice $(T\times K)$ des valeurs réalisées des $K>0$ facteurs macroéconomiques.

**Matrice de covariance transversale inconditionnelle.**

$$\mathrm{Cov}(x_t)=B\Sigma_fB^T+\Psi, \qquad B=(\beta_1,\dots,\beta_m)^T \ \ (m\times K)$$

**L'estimation.** *Le modèle multifactoriel satisfait les hypothèses de Gauss-Markov généralisées, donc les estimateurs des moindres carrés $\hat\alpha_i$ et $\hat\beta_i$ ($K\times1$) issus de la régression temporelle de chaque actif sont **BLUE** et les **EMV** sous hypothèses gaussiennes.*

$$x_i=1_T\hat\alpha_i+F\hat\beta_i+\hat\varepsilon_i$$

**Estimateurs sans biais des paramètres restants.**

$$\hat\psi_i^2=\frac{\hat\varepsilon_i^T\hat\varepsilon_i}{T-(K+1)}, \qquad \hat\Psi=\mathrm{diag}(\hat\psi_1^2,\dots,\hat\psi_m^2)$$

$$\hat\Sigma_f=\frac{1}{T-1}\sum_{t=1}^T(f_t-\hat\mu_f)(f_t-\hat\mu_f)^T \ \text{ avec } \hat\mu_f=\frac1T\sum_{t=1}^Tf_t$$

**Estimateur de la matrice de covariance inconditionnelle.**

$$\hat\Sigma_x=\hat B\hat\Sigma_f\hat B^T+\hat\Psi$$

> **Ici $F$ est observé, donc tout est une simple régression.** C'est la situation la plus confortable, et aussi la plus contestable : rien ne garantit que les variables macroéconomiques choisies soient **les bons** facteurs, ni qu'elles soient mesurées au bon moment (les données de PIB sont publiées avec retard et révisées).

## 🟠 Concept 4 — Modèles à facteurs fondamentaux

*Les variables de facteur commun $\{f_t\}$ sont déterminées à partir d'**attributs fondamentaux spécifiques aux actifs** :*

- appartenance à un **secteur / une industrie**
- **taille de l'entreprise** (capitalisation boursière)
- **rendement du dividende**
- **style** (croissance / valeur, mesuré par le prix sur actif net, le bénéfice sur prix…)
- etc.

### L'approche BARRA (Barr Rosenberg)

- Traiter les **attributs observables** spécifiques aux actifs **comme les bêtas factoriels**.
- Les **réalisations de facteurs $\{f_t\}$ sont inobservables**, mais sont **estimées**.

### L'approche Fama-French (Eugene Fama et Kenneth French)

- Pour chaque période $t$, appliquer des **tris transversaux** pour définir les réalisations de facteurs.
- Pour un attribut donné, **trier** les actifs à la période $t$ selon cet attribut et définir des **portefeuilles par quintile**, en découpant les actifs en 5 portefeuilles équipondérés.
- Former le **portefeuille de couverture** (*hedge portfolio*) : **long** sur le quintile supérieur, **court** sur le quintile inférieur.
- Définir les réalisations de facteur commun de la période $t$ comme les **rendements de période $t$ des $K$ portefeuilles de couverture** correspondant aux $K$ attributs fondamentaux.
- **Estimer les chargements factoriels** sur les actifs par **régressions temporelles**, séparément pour chaque actif $i$.

> **La différence entre les deux approches est une inversion complète du sens de la régression.**
>
> **BARRA** dit : « je **connais** les bêtas (l'actif appartient au secteur bancaire, sa capitalisation est de tel montant), je **cherche** les rendements de facteurs » ⟹ régression **transversale**, une par période.
>
> **Fama-French** dit : « je **construis** les rendements de facteurs par tri en quintiles, je **cherche** les bêtas » ⟹ régression **temporelle**, une par actif.
>
> Le portefeuille long-court de Fama-French est astucieux : il isole l'effet de l'attribut en **annulant** l'exposition commune — c'est un facteur qui est aussi un **portefeuille investissable**.

## 🔴 Concept 5 — Le modèle sectoriel BARRA en détail

Supposons que les $m$ actifs se répartissent en $K$ **groupes sectoriels**. Pour chaque actif $i$, on définit les chargements factoriels

$$\beta_{i,k}=\begin{cases}1 & \text{si l'actif } i \text{ appartient au secteur } k\\ 0 & \text{sinon}\end{cases}$$

**Ces chargements sont invariants dans le temps.** Pour la période $t$, on note $f_t=(f_{1t},\dots,f_{Kt})^T$ les réalisations des $K$ facteurs — **ces réalisations sont inobservées**. Le modèle sectoriel s'écrit

$$X_{i,t}=\beta_{i,1}f_{1t}+\cdots+\beta_{i,K}f_{Kt}+\varepsilon_{it}, \qquad \forall i,t$$

avec

$$\mathrm{var}(\varepsilon_{it})=\psi_i^2\ \forall i, \qquad \mathrm{cov}(\varepsilon_{it},f_{kt})=0\ \forall i,k,t, \qquad \mathrm{cov}(f_{k't},f_{kt})=[\Sigma_f]_{k',k}\ \forall k',k,t$$

### Estimation des réalisations de facteurs

Pour chaque période $t$, on considère la **régression transversale**

$$x_t=Bf_t+\varepsilon_t \qquad (\alpha=0\text{, il n'apparaît donc pas})$$

avec $E[\varepsilon_t]=0_m$, $E[\varepsilon_t\varepsilon_t^T]=\Psi$ et $\mathrm{Cov}(f_t)=\Sigma_f$.

On calcule $\hat f_t$ par régression des moindres carrés de $x_t$ sur $B$, avec $f_t$ comme paramètre de régression. $B$ est la matrice $(m\times K)$ de **variables indicatrices**, la même pour tout $t$, donc

$$B^TB=\mathrm{diag}(m_1,\dots,m_K), \qquad \sum_{k=1}^Km_k=m$$

où $m_k$ est le **nombre d'actifs du secteur $k$**. D'où

$$\boxed{\ \hat f_t=(B^TB)^{-1}B^Tx_t \quad \textbf{(vecteur des moyennes sectorielles !)}\ }$$

$$\hat\varepsilon_t=x_t-B\hat f_t$$

> **Ce résultat est magnifique de simplicité.** Comme $B$ ne contient que des indicatrices, $(B^TB)^{-1}$ est diagonale d'entrées $1/m_k$ et $B^Tx_t$ somme les rendements par secteur. La régression se réduit donc à **calculer le rendement moyen de chaque secteur à la date $t$** — et le résidu $\hat\varepsilon_{i,t}$ est l'écart de l'actif $i$ à la moyenne de son secteur.

### Estimation des matrices de covariance

$$\hat\Sigma_f=\frac{1}{T-1}\sum_{t=1}^T(\hat f_t-\hat{\bar f})(\hat f_t-\hat{\bar f})^T, \qquad \hat{\bar f}=\frac1T\sum_{t=1}^T\hat f_t$$

$$\hat\Psi=\mathrm{diag}(\hat\psi_1^2,\dots,\hat\psi_m^2), \qquad \hat\psi_i^2=\frac{1}{T-1}\sum_{t=1}^T\big[\hat\varepsilon_{i,t}-\hat{\bar\varepsilon}_i\big]^2, \qquad \hat{\bar\varepsilon}_i=\frac1T\sum_{t=1}^T\hat\varepsilon_{i,t}$$

$$\boxed{\ \hat\Sigma=B\hat\Sigma_fB^T+\hat\Psi\ }$$

**Détails supplémentaires signalés par le cours.**

- **Inefficacité des estimateurs des moindres carrés** due à l'**hétéroscédasticité** dans $\Psi$.
- **Résolution** : appliquer les **moindres carrés généralisés (MCG)**, en estimant $\Psi$ dans les régressions transversales.
- Les réalisations de facteurs peuvent être **remises à l'échelle** pour représenter des **portefeuilles répliquants de facteurs** (*factor mimicking portfolios*).
- Le modèle sectoriel BARRA peut s'exprimer comme un modèle de **régressions empilées apparemment non reliées (SUR)**.

⚠️ **Le point sur l'hétéroscédasticité est exactement celui de la fiche 50.** Les variances spécifiques $\psi_i^2$ diffèrent d'un actif à l'autre : $\mathrm{Cov}(\varepsilon_t)=\Psi\neq\sigma^2I_m$. Les MCO restent sans biais mais **ne sont plus BLUE** — le BLUE est l'estimateur MCG $\hat f_t=[B^T\Psi^{-1}B]^{-1}B^T\Psi^{-1}x_t$, qui est une moyenne sectorielle **pondérée par l'inverse des variances spécifiques**.

## 🔴 Concept 6 — Les modèles à facteurs statistiques : l'analyse factorielle

> *Les variables de facteur commun $\{f_t\}$ sont **cachées (latentes)** et leur structure est déduite de l'analyse des rendements observés $\{x_t\}$.*

Les deux méthodes principales d'extraction sont l'**analyse factorielle** et l'**analyse en composantes principales**. Toutes deux modélisent $\Sigma$, la matrice de covariance de $\{x_t\}$, en s'appuyant sur la **covariance empirique** $\hat\Sigma$, calculée ainsi :

$$X=[x_1:\cdots:x_T] \ (m\times T), \qquad X^\ast=X\Big(I_T-\frac1T1_T1_T^T\Big) \ \text{(« centrée » par ligne)}, \qquad \hat\Sigma_x=\frac1TX^\ast(X^\ast)^T$$

### L'invariance par transformation linéaire des facteurs

Pour toute matrice $(K\times K)$ **inversible** $H$, on définit

$$f_t^\ast=Hf_t \qquad\text{et}\qquad B^\ast=BH^{-1}$$

Alors le modèle à facteurs reste vrai en remplaçant $f_t$ et $B$ :

$$x_t=\alpha+B^\ast f_t^\ast+\varepsilon_t=\alpha+BH^{-1}Hf_t+\varepsilon_t=\alpha+Bf_t+\varepsilon_t$$

et en remplaçant $\mu_f$ et $\Sigma_f$ par

$$\Sigma_f^\ast=\mathrm{Cov}(f_t^\ast)=\mathrm{Cov}(Hf_t)=H\,\mathrm{Cov}(f_t)H^T=H\Sigma_fH^T, \qquad \mu_f^\ast=H\mu_f$$

⚠️ **Ce résultat dit que le modèle n'est PAS identifié.** Une infinité de couples $(B,f_t)$ produisent exactement la même loi des observations. On ne peut donc **jamais** interpréter les facteurs statistiques comme des grandeurs économiques bien définies : seul l'**espace** qu'ils engendrent est déterminé, pas la base choisie dans cet espace.

### La formulation standard

**Facteurs orthonormés :** $\Sigma_f=I_K$. On y parvient en choisissant

$$H=\Lambda^{-1/2}\Gamma^T, \qquad \text{où } \Sigma_f=\Gamma\Lambda\Gamma^T \text{ est la décomposition spectrale}$$

avec $\Gamma$ orthogonale $(K\times K)$ et $\Lambda=\mathrm{diag}(\lambda_1,\dots,\lambda_K)$, $\lambda_1\geq\lambda_2\geq\cdots\geq\lambda_K>0$.

**Facteurs centrés :** $\mu_f=0_K$. On y parvient en ajustant $\alpha$ pour incorporer la contribution moyenne des facteurs :

$$\alpha\leftarrow\alpha+B\mu_f$$

Sous ces hypothèses, la matrice de covariance inconditionnelle devient

$$\mathrm{Cov}(x_t)=\Sigma_x=BB^T+\Psi$$

> **On a utilisé la non-identifiabilité pour normaliser.** Puisque le modèle est invariant par $H$, autant choisir le $H$ qui rend les facteurs les plus simples possible : centrés et de covariance identité. Il reste une indétermination — les **rotations orthogonales** $H$ avec $HH^T=I_K$ préservent $\Sigma_f=I_K$ — d'où la note finale du cours sur les *rotations de coordonnées comme interprétations alternatives du modèle*.

### Estimation par maximum de vraisemblance

**Le modèle.** $x_t=\alpha+Bf_t+\varepsilon_t$, avec $\alpha$ et $B$ constants et toutes les variables aléatoires gaussiennes :

$$x_t \text{ i.i.d. } N_m(\alpha,\Sigma_x), \qquad f_t \text{ i.i.d. } N_K(0_K,I_K), \qquad \varepsilon_t \text{ i.i.d. } N_m(0_m,\Psi), \qquad \Sigma_x=BB^T+\Psi$$

**La vraisemblance.**

$$L(\alpha,\Sigma_x)=\prod_{t=1}^T\Big[(2\pi)^{-m/2}\lvert\Sigma_x\rvert^{-1/2}\exp\Big(-\tfrac12(x_t-\alpha)^T\Sigma_x^{-1}(x_t-\alpha)\Big)\Big]$$

$$=(2\pi)^{-Tm/2}\lvert\Sigma_x\rvert^{-T/2}\exp\Big(-\tfrac12\sum_{t=1}^T(x_t-\alpha)^T\Sigma_x^{-1}(x_t-\alpha)\Big)$$

**La log-vraisemblance.**

$$\ell(\alpha,\Sigma_x)=-\frac{Tm}{2}\log(2\pi)-\frac T2\log\lvert\Sigma_x\rvert-\frac12\sum_{t=1}^T(x_t-\alpha)^T\Sigma_x^{-1}(x_t-\alpha)$$

> **Les EMV** de $\alpha$, $B$, $\Psi$ sont les valeurs qui **maximisent $\ell(\alpha,\Sigma_x)$ sous la contrainte $\Sigma_x=BB^T+\Psi$**. Ils sont calculés **numériquement** par l'**algorithme EM** (Dempster, Laird et Rubin, 1977 ; Rubin et Thayer, 1983).

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi EM plutôt qu'une maximisation directe.</span>

La contrainte $\Sigma_x=BB^T+\Psi$ est non linéaire et couple tous les paramètres. En traitant les **facteurs $f_t$ comme des données manquantes** — ce qu'ils sont littéralement, puisqu'ils sont latents — l'étape M se ramène à une régression gaussienne ordinaire. C'est exactement l'astuce utilisée pour les sauts de Poisson en fiche 53.

</div>

**La spécification complète.**

1. Appliquer l'algorithme EM pour calculer $\hat\alpha$, $\hat B$ et $\hat\Psi$.
2. **Estimer les réalisations de facteurs** $\{f_t\}$ en appliquant, pour chaque période $t$, la régression transversale $$x_t-\hat\alpha=\hat Bf_t+\hat\varepsilon_t$$ En tenant compte de l'**hétéroscédasticité** dans $\Psi$, on applique les estimateurs **MCG** : $$\boxed{\ \hat f_t=\big[\hat B^T\hat\Psi^{-1}\hat B\big]^{-1}\big[\hat B^T\hat\Psi^{-1}(x_t-\hat\alpha)\big]\ }$$
3. *(Facultatif)* Considérer des **rotations de coordonnées** des facteurs orthonormés comme interprétations alternatives du modèle.

**Détails supplémentaires.**

- Les réalisations de facteurs estimées peuvent être **remises à l'échelle** pour représenter des **portefeuilles répliquants de facteurs**.
- Un **test du rapport de vraisemblance** permet de tester le **nombre de facteurs** : $$LR(K)=2\big[\ell(\tilde\mu,\tilde\Sigma)-\ell(\hat\alpha,\hat B,\hat\Psi)\big]$$ où $H_0$ : *« $K$ facteurs suffisent à modéliser $\Sigma$ »*, et $\tilde\mu$, $\tilde\Sigma$ sont les EMV **sans restriction** de modèle factoriel.

## 🔴 Concept 7 — L'analyse en composantes principales

**Le cadre.** Une variable aléatoire $m$-variée $x=(x_1,\dots,x_m)^T$ avec $E[x]=\mu$ et $\mathrm{Cov}[x]=\Sigma$ $(m\times m)$.

**Valeurs et vecteurs propres de $\Sigma$.** $\lambda_1\geq\lambda_2\geq\cdots\geq\lambda_m\geq0$ sont les $m$ valeurs propres, et $\gamma_1,\dots,\gamma_m$ les $m$ vecteurs propres **orthonormés** :

$$\Sigma\gamma_i=\lambda_i\gamma_i, \qquad \gamma_i^T\gamma_i=1\ \forall i, \qquad \gamma_i^T\gamma_j=0\ \forall i\neq j, \qquad \Sigma=\sum_{i=1}^m\lambda_i\gamma_i\gamma_i^T$$

**Les variables de composantes principales.**

$$p_i=\gamma_i^T(x-\mu), \qquad i=1,\dots,m$$

**En forme matricielle.** $\Sigma=\Gamma\Lambda\Gamma^T$ avec $\Lambda=\mathrm{diag}(\lambda_1,\dots,\lambda_m)$, $\Gamma=[\gamma_1:\gamma_2:\cdots:\gamma_m]$ et $\Gamma^T\Gamma=I_m$. Alors

$$p=\Gamma^T(x-\mu)$$

$$E[p]=\Gamma^TE[x-E[x]]=0_m$$

$$\mathrm{Cov}[p]=\Gamma^T\mathrm{Cov}[x]\Gamma=\Gamma^T\Sigma\Gamma=\Gamma^T(\Gamma\Lambda\Gamma^T)\Gamma=\Lambda$$

> ***$p$ est un vecteur de variables aléatoires centrées et non corrélées qui fournit une base orthogonale pour $x$.*** C'est le point à retenir : l'ACP **décorrèle**. Les $m$ variables corrélées $x_i$ deviennent $m$ variables **indépendantes deux à deux** (au sens de la corrélation), de variances $\lambda_1\geq\cdots\geq\lambda_m$.

### $x$ sous forme de composantes principales

$$x=\mu+\Gamma p, \qquad E[p]=0_m, \quad \mathrm{Cov}[p]=\Lambda$$

On partitionne $\Gamma=[\Gamma_1\ \Gamma_2]$, où $\Gamma_1$ correspond aux $K\ (<m)$ **plus grandes** valeurs propres de $\Sigma$, et $p=\binom{p_1}{p_2}$ où $p_1$ contient les $K$ premiers éléments :

$$x=\mu+\Gamma_1p_1+\Gamma_2p_2=\mu+Bf+\varepsilon$$

avec

$$B=\Gamma_1\ (m\times K), \qquad f=p_1\ (K\times1), \qquad \varepsilon=\Gamma_2p_2\ (m\times1)$$

> *C'est comme un modèle à facteurs, sauf que $\mathrm{Cov}[\varepsilon]=\Gamma_2\Lambda_2\Gamma_2^T$, où $\Lambda_2$ est la matrice diagonale des $(m-K)$ dernières valeurs propres.*

⚠️ **Voilà la différence exacte entre ACP et analyse factorielle**, et c'est la question d'examen classique. Dans l'analyse factorielle, $\Psi$ est **diagonale par hypothèse** : le modèle *impose* que le résidu soit sans corrélation croisée. Dans l'ACP, $\mathrm{Cov}[\varepsilon]=\Gamma_2\Lambda_2\Gamma_2^T$ n'est **en général pas diagonale** : l'ACP ne fait que tronquer une rotation, elle ne modélise rien. L'ACP est **descriptive**, l'analyse factorielle est un **modèle statistique** avec une vraisemblance et des tests.

### ACP empirique

L'analyse en composantes principales de $X=[x_1:\cdots:x_T]$ $(m\times T)$ consiste en :

1. **Moyennes des lignes** : $\ \bar x=\frac1TX1_T$
2. **Matrice centrée** : $\ X^\ast=X-\bar x1_T^T$
3. **Covariance empirique** : $\ \hat\Sigma_x=\frac1TX^\ast(X^\ast)^T$
4. **Décomposition en valeurs et vecteurs propres** : $\ \hat\Sigma_x=\hat\Gamma\hat\Lambda\hat\Gamma^T$, donnant les estimations de $\Gamma$ et $\Lambda$
5. **Composantes principales empiriques** : $\ P=[p_1:\cdots:p_T]=\hat\Gamma^TX^\ast$ $(m\times T)$

### ACP par décomposition en valeurs singulières

On considère la **SVD** de la matrice centrée :

$$X^\ast=VDU^T$$

où $V$ est $(m\times m)$ **orthogonale** ($V^TV=I_m$), $U$ est **orthonormée en colonnes** ($U^TU=I_m$), et $D=\mathrm{diag}(d_1,\dots,d_m)$ avec $d_1\geq d_2\geq\cdots\geq0$.

> **Exercice du cours** : montrer que
>
> $$\hat\Lambda=\frac1TD^2, \qquad \hat\Gamma=V, \qquad P=\hat\Gamma^TX^\ast=DU^T$$

⚠️ **En pratique on passe TOUJOURS par la SVD** et jamais par la diagonalisation explicite de $\hat\Sigma_x$. Deux raisons : on n'a pas besoin de former $X^\ast(X^\ast)^T$, qui coûte $O(m^2T)$ et **carre le conditionnement** ; et quand $T<m$ — le cas usuel en finance ! — $\hat\Sigma_x$ est **singulière** alors que la SVD reste parfaitement définie.

### Définition alternative — par maximisation de variance

Étant donné $x$ $m$-varié avec $E[x]=\mu$ et $\mathrm{Cov}[x]=\Sigma_x$ :

**Première composante principale** : $p_1=w^Tx$, où les coefficients $w=(w_1,\dots,w_m)^T$ sont choisis pour

$$\text{maximiser } \mathrm{Var}(p_1)=w^T\Sigma_xw \qquad \text{sous } \lvert w\rvert^2=\sum_{i=1}^mw_i^2=1$$

**Deuxième composante principale** : $p_2=v^Tx$, où $v$ est choisi pour

$$\text{maximiser } \mathrm{Var}(p_2)=v^T\Sigma_xv \qquad \text{sous } \lvert v\rvert^2=1 \ \textbf{ et } \ v^Tw=0$$

*Et ainsi de suite jusqu'à $p_m$. Les vecteurs de coefficients sont donnés par*

$$[w:v:\cdots]=[\gamma_1:\gamma_2:\cdots]=\Gamma$$

> **Les deux définitions coïncident, et c'est un résultat de la fiche 7.** Maximiser $w^T\Sigma_xw$ sous $w^Tw=1$ est un problème d'extremum lié : le lagrangien $w^T\Sigma_xw-\lambda(w^Tw-1)$ a pour condition du premier ordre $\Sigma_xw=\lambda w$ — c'est **exactement** l'équation aux valeurs propres. Et la valeur du maximum est $w^T\Sigma_xw=\lambda$, d'où l'ordre décroissant des $\lambda_i$.

### La décomposition de la variance totale

$$\text{Variance totale}(x)=\sum_{i=1}^m\mathrm{Var}(x_i)=\mathrm{trace}(\Sigma_x)=\mathrm{trace}(\Gamma\Lambda\Gamma^T)=\mathrm{trace}(\Lambda\Gamma^T\Gamma)=\mathrm{trace}(\Lambda)=\sum_{k=1}^m\lambda_k=\sum_{k=1}^m\mathrm{Var}(p_k)$$

$$=\text{Variance totale}(p)$$

> *La transformation de $x$ vers $p$ est un **changement de système de coordonnées** qui déplace l'origine vers la moyenne $E[x]=\mu$ et **fait tourner les axes** pour les aligner sur les variables de composantes principales. La **distance est préservée** dans l'espace, en raison de l'orthogonalité de la rotation.*

⚠️ **C'est ce qui justifie la lecture « $\lambda_k/\sum_j\lambda_j$ = part de variance expliquée ».** Comme la rotation conserve la variance totale, chaque valeur propre se lit directement comme une fraction du total. Sur des rendements d'actions, la première composante capte typiquement $30$–$50\,\%$ de la variance : c'est le **facteur de marché**, retrouvé sans qu'on l'ait jamais spécifié.

## 🟠 Concept 8 — La méthode du facteur principal

Pour ajuster un modèle à $K$ facteurs, $K<m$ fixé, sur $X=[x_1:\cdots:x_T]$ $(m\times T)$ :

**Étape 1 — conduire les étapes de calcul de l'ACP.**

$$\bar x=\tfrac1TX1_T, \qquad X^\ast=X-\bar x1_T^T, \qquad \hat\Sigma_x=\tfrac1TX^\ast(X^\ast)^T, \qquad \hat\Sigma_x=\hat\Gamma\hat\Lambda\hat\Gamma^T$$

**Étape 2 — spécifier les estimations initiales** (indice $s=0$).

$$\tilde\alpha_0=\bar x, \qquad \tilde B_0=\hat\Gamma_{(K)}\big(\hat\Lambda_{(K)}\big)^{1/2}$$

où $\hat\Gamma_{(K)}$ et $\hat\Lambda_{(K)}$ sont les sous-matrices des $K$ **premières colonnes** de $\hat\Gamma$ et $\hat\Lambda$, puis

$$\tilde\Psi_0=\mathrm{diag}(\hat\Sigma_x)-\mathrm{diag}(\tilde B_0\tilde B_0^T), \qquad \tilde\Sigma_0=\tilde B_0\tilde B_0^T+\tilde\Psi_0$$

**Étape 3 — ajuster la covariance empirique** :

$$\hat\Sigma_x^\ast=\hat\Sigma_x-\tilde\Psi_0$$

calculer sa décomposition en valeurs et vecteurs propres $\hat\Sigma_x^\ast=\tilde\Gamma\tilde\Lambda\tilde\Gamma^T$, ce qui donne des estimations **mises à jour** de $\Gamma$ et $\Lambda$, puis **répéter l'étape 2** avec ces nouvelles estimations, obtenant $\tilde B_1$, $\tilde\Psi_1$, $\tilde\Sigma_1=\tilde B_1\tilde B_1^T+\tilde\Psi_1$.

**Étape 4 — répéter l'étape 3**, engendrant une suite d'estimations $(\tilde B_s,\tilde\Psi_s,\tilde\Sigma_s)$, $s=1,2,\dots$, **jusqu'à ce que les variations successives de $\tilde\Sigma_s$ soient suffisamment négligeables**.

**Étape 5 — utiliser les estimations de la dernière itération** de l'étape 4.

> **L'idée en une phrase.** L'ACP brute confond le risque commun et le risque spécifique. La méthode du facteur principal **retire** l'estimation courante de $\Psi$ de la covariance empirique **avant** de diagonaliser, puis met à jour $\Psi$ à partir du nouveau $B$, et itère. Elle converge vers un point fixe où $\hat\Sigma_x\approx\tilde B\tilde B^T+\tilde\Psi$ — c'est-à-dire vers une vraie structure factorielle, et non une simple troncature de rotation.

⚠️ **Un piège numérique bien connu** : $\tilde\Psi_0=\mathrm{diag}(\hat\Sigma_x)-\mathrm{diag}(\tilde B_0\tilde B_0^T)$ peut produire des variances **négatives** (le « cas de Heywood »). C'est le signe que $K$ est mal choisi ou que le modèle est mal spécifié.

## Comment résoudre l'exercice type (protocole)

1. **Identifier ce qui est observé** : $F$ observé ⟹ régressions **temporelles** ; $B$ observé ⟹ régressions **transversales** ; ni l'un ni l'autre ⟹ méthode **statistique**.
2. **Écrire le modèle** dans la bonne forme (a), (b) ou (c) et poser les hypothèses sur $f_t$ et $\varepsilon_t$.
3. **Estimer** : MCO si $\mathrm{Cov}=\sigma^2I$, **MCG** si hétéroscédasticité (le cas transversal, à cause de $\Psi$).
4. **Calculer les variances résiduelles** avec le bon nombre de degrés de liberté : $T-2$ pour Sharpe, $T-(K+1)$ en multifactoriel.
5. **Reconstituer** $\hat\Sigma_x=\hat B\hat\Sigma_f\hat B^T+\hat\Psi$.
6. **Vérifier** : nombre de facteurs (test LR, éboulis des valeurs propres), résidus non corrélés entre actifs, part de variance expliquée.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « estimer $\Sigma$ pour $m$ grand » | modèle à facteurs — c'est le remède de la fiche 51 |
| « rendement du marché en excès du taux sans risque » | **modèle à indice unique de Sharpe**, $\Sigma_x=\sigma_M^2\beta\beta^T+\Psi$ |
| « inflation, PIB, taux, chômage » | facteurs **macroéconomiques** observés ⟹ régressions temporelles |
| « secteur d'appartenance », « capitalisation » | **BARRA** : les attributs *sont* les bêtas ⟹ régressions transversales |
| « quintiles », « long-court » | **Fama-French** : portefeuilles de couverture ⟹ régressions temporelles |
| « facteurs latents / inobservés » | **analyse factorielle** (EM) ou **ACP** |
| « part de variance expliquée » | **ACP** : $\lambda_k/\sum_j\lambda_j$ |
| « combien de facteurs ? » | **test du rapport de vraisemblance** $LR(K)$ |

### Exercices progressifs

**Niveau 1** — Sous le modèle de Sharpe, combien de paramètres décrivent $\Sigma_x$ pour $m=500$ actifs ? Comparez à une matrice libre.

<details><summary>Correction</summary>

**Modèle de Sharpe.** $\Sigma_x=\sigma_M^2\beta\beta^T+\Psi$ est décrite par :

- $m=500$ bêtas $\beta_i$,
- $m=500$ variances spécifiques $\psi_i^2$,
- $1$ variance de marché $\sigma_M^2$,

soit $2m+1=\mathbf{1\,001}$ paramètres.

**Matrice libre.** $m(m+1)/2=500\times501/2=\mathbf{125\,250}$ paramètres.

**Le rapport est de $125$ pour $1$.** Et le point n'est pas seulement la mémoire : avec $T$ observations mensuelles sur dix ans ($T=120$), la covariance empirique de $500$ actifs est de **rang au plus $120$**, donc **singulière**. Son inverse — dont Markowitz a besoin — n'existe pas. La structure factorielle, elle, garantit $\Sigma_x=\sigma_M^2\beta\beta^T+\Psi$ **définie positive** dès que tous les $\psi_i^2>0$.

</details>

**Niveau 2** — Dans le modèle sectoriel BARRA, montrez que $\hat f_t$ est le vecteur des rendements moyens par secteur.

<details><summary>Correction</summary>

**Étape 1 — la structure de $B$.** $B$ est $(m\times K)$ d'entrées $\beta_{i,k}\in\{0,1\}$, avec exactement un $1$ par ligne (chaque actif appartient à un seul secteur). La colonne $k$ est l'indicatrice du secteur $k$.

**Étape 2 — calculer $B^TB$.** L'élément $(k,k')$ vaut $\sum_i\beta_{i,k}\beta_{i,k'}$. Pour $k\neq k'$ le produit est toujours nul (aucun actif dans deux secteurs) ; pour $k=k'$ il vaut le nombre d'actifs du secteur $k$. Donc

$$B^TB=\mathrm{diag}(m_1,\dots,m_K), \qquad (B^TB)^{-1}=\mathrm{diag}(1/m_1,\dots,1/m_K)$$

**Étape 3 — calculer $B^Tx_t$.** La $k$-ième composante vaut $\sum_i\beta_{i,k}x_{i,t}=\sum_{i\in\text{secteur }k}x_{i,t}$ : la **somme** des rendements du secteur $k$.

**Étape 4 — conclure.**

$$\hat f_t=(B^TB)^{-1}B^Tx_t \qquad\Longrightarrow\qquad \hat f_{k,t}=\frac{1}{m_k}\sum_{i\in\text{secteur }k}x_{i,t}$$

C'est bien le **rendement moyen équipondéré du secteur $k$ à la date $t$**. $\blacksquare$

**Et le résidu ?** $\hat\varepsilon_{i,t}=x_{i,t}-\hat f_{k(i),t}$ : l'écart de l'actif à la moyenne de son propre secteur. La décomposition est donc « rendement = effet secteur + écart au secteur ».

⚠️ **Mais ce n'est pas l'estimateur optimal.** $\mathrm{Cov}(\varepsilon_t)=\Psi$ n'est pas $\sigma^2I_m$ : il y a **hétéroscédasticité**. Le BLUE est l'estimateur MCG $\hat f_t=[B^T\Psi^{-1}B]^{-1}B^T\Psi^{-1}x_t$, qui donne une moyenne sectorielle **pondérée par $1/\psi_i^2$** — les actifs les plus bruités pèsent moins.

</details>

**Niveau 3** — Pourquoi les facteurs d'un modèle statistique ne sont-ils jamais interprétables économiquement ?

<details><summary>Correction</summary>

**Le résultat d'invariance.** Pour toute matrice $(K\times K)$ inversible $H$, en posant $f_t^\ast=Hf_t$ et $B^\ast=BH^{-1}$ :

$$x_t=\alpha+B^\ast f_t^\ast+\varepsilon_t=\alpha+BH^{-1}Hf_t+\varepsilon_t=\alpha+Bf_t+\varepsilon_t$$

Le modèle transformé est **le même modèle** — mêmes observations, même vraisemblance. Les données ne peuvent donc **pas** distinguer $(B,f_t)$ de $(B^\ast,f_t^\ast)$.

**Ce qui est identifié et ce qui ne l'est pas.**

- **Identifié** : le **sous-espace** de $\mathbb{R}^m$ engendré par les colonnes de $B$ ; la matrice $BB^T$ ; la décomposition risque commun / risque spécifique ; le nombre $K$.
- **Non identifié** : la **base** particulière choisie dans ce sous-espace, donc les facteurs individuels et leurs chargements.

**Ce que la normalisation retire — et ne retire pas.** Imposer $\mu_f=0$ et $\Sigma_f=I_K$ élimine les $H$ généraux, mais laisse **toutes les rotations orthogonales** ($HH^T=I_K$), puisque $\mathrm{Cov}(Hf_t)=HI_KH^T=I_K$. Il reste $K(K-1)/2$ degrés de liberté d'indétermination. Le cours en fait explicitement une note : *« considérer des rotations de coordonnées des facteurs orthonormés comme interprétations alternatives du modèle »*.

**La conséquence pratique.** Dire « le facteur 2 est le facteur taille » n'a aucun sens statistique : une rotation le mélange au facteur 3 sans rien changer à l'ajustement. Les interprétations viennent **de l'extérieur** — en corrélant a posteriori les facteurs extraits avec des variables économiques connues, ou en choisissant une rotation qui rend les chargements « simples » (varimax).

**Le contraste avec les autres familles.** C'est exactement pourquoi les modèles macroéconomiques et fondamentaux existent : en **imposant** ce que sont les facteurs (l'inflation, le secteur bancaire, le quintile de capitalisation), ils sacrifient l'ajustement statistique optimal contre une **interprétabilité** garantie.

</details>

**Niveau 4 — type examen** — Comparez analyse factorielle et ACP : formalisme, hypothèses, ce que chacune estime.

<details><summary>Correction</summary>

**Le point de départ commun.** Les deux partent de la covariance empirique $\hat\Sigma_x=\frac1TX^\ast(X^\ast)^T$ et cherchent à représenter $x_t\approx\alpha+Bf_t+\varepsilon_t$ avec $K\ll m$.

**Analyse factorielle — un modèle statistique.**

- **Hypothèses** : $x_t\sim N_m(\alpha,\Sigma_x)$, $f_t\sim N_K(0_K,I_K)$, $\varepsilon_t\sim N_m(0_m,\Psi)$, et **$\Psi$ diagonale**.
- **Contrainte structurelle** : $\Sigma_x=BB^T+\Psi$.
- **Estimation** : maximiser $\ell(\alpha,\Sigma_x)$ sous cette contrainte, numériquement par **EM**.
- **Ce qu'elle estime** : $B$ et $\Psi$ séparément — elle **distingue** risque commun et risque spécifique.
- **Inférence disponible** : test du rapport de vraisemblance $LR(K)=2[\ell(\tilde\mu,\tilde\Sigma)-\ell(\hat\alpha,\hat B,\hat\Psi)]$ pour le nombre de facteurs.

**ACP — une transformation descriptive.**

- **Hypothèses** : aucune. C'est de l'algèbre linéaire sur $\Sigma_x=\Gamma\Lambda\Gamma^T$.
- **Construction** : $p=\Gamma^T(x-\mu)$, puis on tronque à $K$ : $B=\Gamma_1$, $f=p_1$, $\varepsilon=\Gamma_2p_2$.
- **Ce qu'elle estime** : rien, au sens statistique — elle **décompose** la variance observée.
- **La différence décisive** : $\mathrm{Cov}[\varepsilon]=\Gamma_2\Lambda_2\Gamma_2^T$, qui **n'est pas diagonale**. L'ACP ne prétend pas que les résidus sont sans corrélation croisée ; elle jette simplement les $(m-K)$ directions de plus faible variance.

**Le tableau de synthèse.**

|  | Analyse factorielle | ACP |
|---|---|---|
| Nature | modèle probabiliste | rotation + troncature |
| $\mathrm{Cov}(\varepsilon)$ | $\Psi$ **diagonale par hypothèse** | $\Gamma_2\Lambda_2\Gamma_2^T$, non diagonale |
| Critère | **vraisemblance** | **variance maximale** |
| Calcul | EM, itératif | décomposition spectrale / **SVD**, direct |
| Sensible à l'échelle | non (via $\Psi$) | **oui** — il faut standardiser |
| Tests | **oui** ($LR$) | non |
| Objectif | expliquer les **covariances** | expliquer la **variance totale** |

**La formulation qui résume tout.** L'analyse factorielle explique les **covariances** — elle demande « qu'est-ce qui fait bouger les actifs **ensemble** ? » et met tout le reste dans $\Psi$. L'ACP explique la **variance totale** — elle demande « quelles directions bougent le **plus** ? », sans distinguer commun et spécifique.

**Et le pont entre les deux : la méthode du facteur principal.** Elle part de l'ACP mais **soustrait $\tilde\Psi$ avant de diagonaliser**, puis met à jour $\tilde\Psi$ à partir du nouveau $\tilde B$, et itère jusqu'à stabilisation de $\tilde\Sigma_s$. Elle obtient ainsi une vraie structure factorielle, avec le coût algorithmique de l'ACP et non celui de l'EM.

</details>

## 🔴 Common mistakes

1. **Confondre facteur et chargement** — $f_t$ varie en $t$ et est commun à tous les actifs ; $\beta_i$ varie en $i$ et est constant dans le temps.
2. **Oublier que $\Psi$ est diagonale** — c'est **l'hypothèse** qui fait tout le gain de paramètres, et c'est aussi celle qu'il faut vérifier.
3. **Utiliser les MCO en régression transversale** — $\mathrm{Cov}(\varepsilon_t)=\Psi\neq\sigma^2I_m$ : il y a hétéroscédasticité, donc **MCG**.
4. **Se tromper de degrés de liberté** — $T-2$ pour le modèle de Sharpe, $T-(K+1)$ pour $K$ facteurs.
5. **Confondre le $B$ transversal et le $B$ de la régression multivariée** — ils sont **transposés** l'un de l'autre.
6. **Interpréter économiquement des facteurs statistiques** — le modèle est invariant par toute $H$ inversible, donc par toute rotation.
7. **Croire que l'ACP donne un modèle à facteurs** — $\mathrm{Cov}[\varepsilon]=\Gamma_2\Lambda_2\Gamma_2^T$ n'est pas diagonale.
8. **Faire une ACP sur des variables d'échelles différentes** sans standardiser — la variable la plus dispersée capture la première composante.
9. **Inverser le sens BARRA / Fama-French** — BARRA observe $B$ et estime $f_t$ ; Fama-French construit $f_t$ et estime $B$.
10. **Diagonaliser $\hat\Sigma_x$ explicitement** au lieu de passer par la SVD de $X^\ast$ — surtout quand $T<m$, où $\hat\Sigma_x$ est singulière.

## 📌 Ultimate Review

1. **Modèle** : $x_{i,t}=\alpha_i+\beta_i^Tf_t+\varepsilon_{i,t}$ ; $\alpha_i,\beta_i$ constants en $t$, $f_t$ commun à tous les $i$.
2. **Trois écritures** : transversale $x_t=\alpha+Bf_t+\varepsilon_t$ · temporelle $x_i=1_T\alpha_i+F\beta_i+\varepsilon_i$ · multivariée $X=1_T\alpha^T+FB+E$.
3. **Hypothèses** : $\{f_t\}$ stationnaire $I(0)$, $E[f_t]=\mu_f$, $\mathrm{Cov}[f_t]=\Sigma_f$ ; $\{\varepsilon_t\}$ bruit blanc de $\mathrm{Cov}=\Psi$ **diagonale**.
4. **Moments** : conditionnels $E[x_t\mid f_t]=\alpha+Bf_t$, $\mathrm{Cov}=\Psi$ ; inconditionnels $\mu_x=\alpha+B\mu_f$ et $\boxed{\Sigma_x=B\Sigma_fB^T+\Psi}$.
5. **Sharpe (1970)** : $x_{i,t}=\alpha_i+\beta_iR_{Mt}+\varepsilon_{i,t}$, $\Sigma_x=\sigma_M^2\beta\beta^T+\Psi$ ; MCO = BLUE = EMV ; $\hat\psi_i^2=\hat\varepsilon_i^T\hat\varepsilon_i/(T-2)$, $\hat\sigma_M^2=\sum(R_{Mt}-\bar R_M)^2/(T-1)$.
6. **Macroéconomiques** : $f_t$ **observés** (inflation, PIB, taux, chômage, mises en chantier…) — Chen, Ross et Roll (1986) ; $\hat\psi_i^2=\hat\varepsilon_i^T\hat\varepsilon_i/[T-(K+1)]$, $\hat\Sigma_f=\sum(f_t-\hat\mu_f)(f_t-\hat\mu_f)^T/(T-1)$.
7. **Fondamentaux — BARRA** : les attributs observables **sont** les bêtas, $f_t$ estimés par régression **transversale**.
8. **Fondamentaux — Fama-French** : tris transversaux en **quintiles**, **portefeuille de couverture** long-court, $\beta_i$ estimés par régression **temporelle**.
9. **Modèle sectoriel BARRA** : $\beta_{i,k}$ indicatrices ⟹ $B^TB=\mathrm{diag}(m_1,\dots,m_K)$ et $\hat f_t=(B^TB)^{-1}B^Tx_t$ = **moyennes sectorielles** ; $\hat\Sigma=B\hat\Sigma_fB^T+\hat\Psi$ ; MCG contre l'hétéroscédasticité ; portefeuilles répliquants ; formulation SUR.
10. **Invariance** : $f_t^\ast=Hf_t$, $B^\ast=BH^{-1}$ ⟹ même modèle. Les facteurs statistiques **ne sont pas identifiés**.
11. **Normalisation** : $\Sigma_f=I_K$ via $H=\Lambda^{-1/2}\Gamma^T$, $\mu_f=0_K$ via $\alpha\leftarrow\alpha+B\mu_f$ ⟹ $\Sigma_x=BB^T+\Psi$.
12. **Analyse factorielle** : EMV sous contrainte $\Sigma_x=BB^T+\Psi$, calculée par **EM** ; réalisations par **MCG** $\hat f_t=[\hat B^T\hat\Psi^{-1}\hat B]^{-1}\hat B^T\hat\Psi^{-1}(x_t-\hat\alpha)$ ; nombre de facteurs par $LR(K)$.
13. **ACP** : $\Sigma=\Gamma\Lambda\Gamma^T$, $p=\Gamma^T(x-\mu)$, $E[p]=0$, $\mathrm{Cov}[p]=\Lambda$ ; troncature $B=\Gamma_1$, $f=p_1$, $\varepsilon=\Gamma_2p_2$ avec $\mathrm{Cov}[\varepsilon]=\Gamma_2\Lambda_2\Gamma_2^T$ **non diagonale**.
14. **ACP empirique** : $\bar x$, $X^\ast$, $\hat\Sigma_x=\frac1TX^\ast(X^\ast)^T$, $\hat\Sigma_x=\hat\Gamma\hat\Lambda\hat\Gamma^T$, $P=\hat\Gamma^TX^\ast$. **Par SVD** $X^\ast=VDU^T$ : $\hat\Lambda=D^2/T$, $\hat\Gamma=V$, $P=DU^T$.
15. **Définition variationnelle** : $\max w^T\Sigma_xw$ sous $\lvert w\rvert=1$, puis orthogonalité successive ⟹ les coefficients **sont** les vecteurs propres.
16. **Variance totale** : $\mathrm{trace}(\Sigma_x)=\mathrm{trace}(\Lambda)=\sum\lambda_k$ ; la rotation **préserve les distances**.
17. **Méthode du facteur principal** : ACP, puis $\tilde B_0=\hat\Gamma_{(K)}\hat\Lambda_{(K)}^{1/2}$, $\tilde\Psi_0=\mathrm{diag}(\hat\Sigma_x)-\mathrm{diag}(\tilde B_0\tilde B_0^T)$, puis **itérer** sur $\hat\Sigma_x^\ast=\hat\Sigma_x-\tilde\Psi_s$ jusqu'à stabilisation.

**Formulas to know**

$$x_t=\alpha+Bf_t+\varepsilon_t \qquad \Sigma_x=B\Sigma_fB^T+\Psi \qquad \Sigma_x=\sigma_M^2\beta\beta^T+\Psi \ \text{[Sharpe]}$$

$$\hat f_t=(B^TB)^{-1}B^Tx_t \ \text{[BARRA, MCO]} \qquad \hat f_t=[\hat B^T\hat\Psi^{-1}\hat B]^{-1}\hat B^T\hat\Psi^{-1}(x_t-\hat\alpha) \ \text{[MCG]}$$

$$\Sigma=\Gamma\Lambda\Gamma^T \qquad p=\Gamma^T(x-\mu) \qquad \mathrm{trace}(\Sigma_x)=\sum_k\lambda_k \qquad LR(K)=2[\ell(\tilde\mu,\tilde\Sigma)-\ell(\hat\alpha,\hat B,\hat\Psi)]$$

**Methods to know** : le décompte des paramètres et le gain factoriel ; la démonstration que $\hat f_t$ est une moyenne sectorielle ; la preuve de l'invariance par $H$ ; l'équivalence entre maximisation de variance et équation aux valeurs propres ; l'algorithme du facteur principal.

## 🧠 Active Recall

**Basic** — Écrivez la décomposition de la covariance dans un modèle à facteurs et nommez ses deux termes.

<details><summary>Réponse</summary>

$$\Sigma_x=B\Sigma_fB^T+\Psi$$

- $B\Sigma_fB^T$ : le **risque commun** (ou systématique), de rang au plus $K$ — c'est la partie de la covariance qui passe par les facteurs partagés.
- $\Psi$ : le **risque spécifique** (ou idiosyncratique), **diagonal** — propre à chaque actif et non corrélé entre actifs.

C'est cette décomposition qui rend l'estimation praticable pour $m$ grand : $mK+K(K+1)/2+m$ paramètres au lieu de $m(m+1)/2$.

</details>

**Understanding** — Pourquoi les facteurs d'un modèle statistique ne sont-ils pas identifiés ?

<details><summary>Réponse</summary>

Parce que pour toute matrice $(K\times K)$ **inversible** $H$, en posant $f_t^\ast=Hf_t$ et $B^\ast=BH^{-1}$, on a

$$B^\ast f_t^\ast=BH^{-1}Hf_t=Bf_t$$

Le modèle transformé est **indiscernable** de l'original : mêmes observations, même vraisemblance. Seul le **sous-espace** engendré par les colonnes de $B$ est identifié, pas la base choisie dedans.

Les normalisations $\mu_f=0_K$ (via $\alpha\leftarrow\alpha+B\mu_f$) et $\Sigma_f=I_K$ (via $H=\Lambda^{-1/2}\Gamma^T$) réduisent l'indétermination, mais **toutes les rotations orthogonales subsistent**, puisqu'elles préservent $\Sigma_f=I_K$.

</details>

**Application** — Le modèle de Sharpe donne $\beta_i=1{,}2$, $\beta_j=0{,}8$, $\sigma_M=15\,\%$, $\psi_i=25\,\%$, $\psi_j=20\,\%$. Calculez la corrélation entre les deux actifs.

<details><summary>Réponse</summary>

**Covariance.** Sous $\Sigma_x=\sigma_M^2\beta\beta^T+\Psi$ avec $\Psi$ diagonale, le terme hors diagonale est

$$\mathrm{Cov}(x_i,x_j)=\beta_i\beta_j\sigma_M^2=1{,}2\times0{,}8\times0{,}15^2=0{,}96\times0{,}0225=0{,}0216$$

**Variances.**

$$\mathrm{Var}(x_i)=\beta_i^2\sigma_M^2+\psi_i^2=1{,}44\times0{,}0225+0{,}0625=0{,}0324+0{,}0625=0{,}0949$$

$$\mathrm{Var}(x_j)=0{,}64\times0{,}0225+0{,}04=0{,}0144+0{,}04=0{,}0544$$

**Corrélation.**

$$\rho_{ij}=\frac{0{,}0216}{\sqrt{0{,}0949\times0{,}0544}}=\frac{0{,}0216}{\sqrt{0{,}005163}}=\frac{0{,}0216}{0{,}0719}\approx\mathbf{0{,}30}$$

**Ce que le calcul illustre.** Toute la corrélation vient du **facteur de marché** : $\mathrm{Cov}$ est un simple produit $\beta_i\beta_j\sigma_M^2$. Et la corrélation reste modeste ($30\,\%$) parce que le risque spécifique domine ici — $\psi_i^2=0{,}0625$ contre $0{,}0324$ de risque de marché pour l'actif $i$.

</details>

**Comparison** — BARRA contre Fama-French : quelle différence de méthode ?

<details><summary>Réponse</summary>

Les deux sont des modèles **fondamentaux** — les facteurs viennent d'attributs spécifiques aux actifs (secteur, taille, rendement du dividende, style). Mais le **sens de la régression est inversé**.

|  | **BARRA** | **Fama-French** |
|---|---|---|
| Ce qui est observé | les **chargements** $B$ (l'actif *est* dans le secteur bancaire) | les **facteurs** $f_t$ (rendements des portefeuilles) |
| Ce qui est estimé | les **réalisations** $f_t$ | les **chargements** $\beta_i$ |
| Type de régression | **transversale**, une par période $t$ | **temporelle**, une par actif $i$ |
| Construction des facteurs | — (ils sortent de la régression) | tri en **quintiles**, portefeuille **long** le quintile haut / **court** le quintile bas |

**L'élégance de Fama-French.** Le portefeuille de couverture long-court **annule** l'exposition commune et isole l'effet de l'attribut. Le facteur obtenu est donc aussi un **portefeuille investissable** — on peut littéralement acheter le facteur.

**L'élégance de BARRA.** Les chargements sont **connus sans erreur** (l'appartenance sectorielle n'est pas estimée), ce qui élimine une source d'erreur, et la régression transversale se réduit parfois à un calcul de moyennes par groupe.

</details>

**Exam-style** — Un gérant veut optimiser un portefeuille de $1\,000$ actions avec $5$ ans de données mensuelles. Expliquez pourquoi il ne peut pas appliquer Markowitz directement et comment un modèle à facteurs le sauve.

<details><summary>Réponse</summary>

**Le blocage — un problème de rang, pas de puissance de calcul.** Markowitz exige $\Sigma^{-1}$ (fiche 51). Ici $m=1\,000$ et $T=60$ mois. La covariance empirique

$$\hat\Sigma_x=\frac1TX^\ast(X^\ast)^T$$

est une somme de $T=60$ matrices de rang $1$ : son **rang est au plus $59$** (une dimension part au centrage), très loin de $1\,000$. Elle est donc **singulière** : $\hat\Sigma_x^{-1}$ **n'existe pas**. Le problème n'est pas numérique, il est structurel.

**Le second blocage — le décompte.** Même avec assez de données, $\Sigma$ libre demande $m(m+1)/2=500\,500$ paramètres, pour $mT=60\,000$ observations. On estime huit fois plus de paramètres qu'on n'a de nombres.

**La conséquence, déjà annoncée en fiche 51.** L'optimiseur est un *« estimation error maximizer »* : il charge massivement les actifs dont le rendement a été surestimé par hasard et exploite des corrélations qui sont du pur bruit. Les poids obtenus sont extrêmes et instables.

**Le sauvetage factoriel.** On pose $\Sigma_x=B\Sigma_fB^T+\Psi$ avec $\Psi$ diagonale. Avec $K=5$ facteurs :

$$\underbrace{mK}_{5\,000}+\underbrace{K(K+1)/2}_{15}+\underbrace{m}_{1\,000}=6\,015 \ \text{ paramètres, contre } 500\,500$$

soit **dix fois moins de paramètres que d'observations**, ce qui est enfin un problème d'estimation raisonnable.

**Et $\hat\Sigma_x$ redevient inversible.** $B\Sigma_fB^T$ est semi-définie positive de rang $\leq K$, et $\Psi$ est **définie positive** dès que tous les $\psi_i^2>0$. La somme est donc **définie positive**, quel que soit $T$. Mieux, le lemme d'inversion matricielle donne

$$\Sigma_x^{-1}=\Psi^{-1}-\Psi^{-1}B\big[\Sigma_f^{-1}+B^T\Psi^{-1}B\big]^{-1}B^T\Psi^{-1}$$

qui ne demande d'inverser qu'une matrice $(K\times K)$ et une diagonale — un calcul en $O(mK^2)$ au lieu de $O(m^3)$.

**Quel modèle choisir concrètement ?**

- Le plus simple : **Sharpe**, $\Sigma_x=\sigma_M^2\beta\beta^T+\Psi$, $2m+1$ paramètres.
- Plus riche et interprétable : **BARRA sectoriel** ou **Fama-French**, avec des facteurs qui ont un sens économique.
- Le plus ajusté aux données : **analyse factorielle** par EM, avec le test $LR(K)$ pour choisir $K$ — au prix de facteurs non interprétables.

**Le prix à payer, à mentionner.** On introduit du **biais** : si $\Psi$ n'est pas vraiment diagonale — deux banques restent corrélées au-delà du facteur commun —, le modèle sous-estime le risque du portefeuille. C'est l'arbitrage biais-variance, et sur ces dimensions il penche massivement du côté du modèle contraint.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Écriture du modèle à facteurs ? | $x_{i,t}=\alpha_i+\beta_i^Tf_t+\varepsilon_{i,t}$ |
| $f_t$ est constant en quoi ? | En $i$ — commun à tous les actifs |
| $\beta_i$ est constant en quoi ? | En $t$ — propre à chaque actif |
| Écriture transversale ? | $x_t=\alpha+Bf_t+\varepsilon_t$, une par période |
| Écriture temporelle ? | $x_i=1_T\alpha_i+F\beta_i+\varepsilon_i$, une par actif |
| Structure de $\Psi$ ? | **Diagonale** — c'est l'hypothèse-clé |
| Covariance inconditionnelle ? | $\Sigma_x=B\Sigma_fB^T+\Psi$ |
| Modèle de Sharpe ? | $x_{i,t}=\alpha_i+\beta_iR_{Mt}+\varepsilon_{i,t}$ |
| Sa covariance ? | $\sigma_M^2\beta\beta^T+\Psi$, soit $2m+1$ paramètres |
| Degrés de liberté chez Sharpe ? | $T-2$ |
| Degrés de liberté à $K$ facteurs ? | $T-(K+1)$ |
| Exemples de facteurs macroéconomiques ? | Marché, inflation, PIB, masse monétaire, taux, mises en chantier, chômage |
| Référence des facteurs macro ? | Chen, Ross et Roll (1986) |
| Approche BARRA ? | Les **attributs observables sont les bêtas**, $f_t$ estimés |
| Approche Fama-French ? | Tris en **quintiles**, portefeuille **long-court**, $\beta_i$ par régression temporelle |
| $B^TB$ dans le modèle sectoriel ? | $\mathrm{diag}(m_1,\dots,m_K)$ |
| Que vaut $\hat f_t$ ? | $(B^TB)^{-1}B^Tx_t$ = **moyennes sectorielles** |
| Pourquoi préférer les MCG en transversal ? | **Hétéroscédasticité** : $\mathrm{Cov}(\varepsilon_t)=\Psi\neq\sigma^2I_m$ |
| Invariance du modèle à facteurs ? | $f_t^\ast=Hf_t$, $B^\ast=BH^{-1}$ pour toute $H$ inversible |
| Comment orthonormer les facteurs ? | $H=\Lambda^{-1/2}\Gamma^T$ avec $\Sigma_f=\Gamma\Lambda\Gamma^T$ |
| Covariance après normalisation ? | $\Sigma_x=BB^T+\Psi$ |
| Comment estime-t-on l'analyse factorielle ? | EMV sous contrainte, par l'algorithme **EM** |
| Estimation MCG des réalisations ? | $[\hat B^T\hat\Psi^{-1}\hat B]^{-1}\hat B^T\hat\Psi^{-1}(x_t-\hat\alpha)$ |
| Test du nombre de facteurs ? | $LR(K)=2[\ell(\tilde\mu,\tilde\Sigma)-\ell(\hat\alpha,\hat B,\hat\Psi)]$ |
| Variables de composantes principales ? | $p_i=\gamma_i^T(x-\mu)$ |
| Moments de $p$ ? | $E[p]=0_m$, $\mathrm{Cov}[p]=\Lambda$ |
| $\mathrm{Cov}[\varepsilon]$ en ACP tronquée ? | $\Gamma_2\Lambda_2\Gamma_2^T$ — **pas diagonale** |
| Définition variationnelle de l'ACP ? | $\max w^T\Sigma_xw$ sous $\lvert w\rvert^2=1$, puis orthogonalité |
| Résultat de cette maximisation ? | Les coefficients **sont** les vecteurs propres $\Gamma$ |
| Variance totale ? | $\mathrm{trace}(\Sigma_x)=\mathrm{trace}(\Lambda)=\sum_k\lambda_k$ |
| ACP par SVD ? | $X^\ast=VDU^T$ ⟹ $\hat\Lambda=D^2/T$, $\hat\Gamma=V$, $P=DU^T$ |
| Initialisation du facteur principal ? | $\tilde B_0=\hat\Gamma_{(K)}\hat\Lambda_{(K)}^{1/2}$, $\tilde\Psi_0=\mathrm{diag}(\hat\Sigma_x)-\mathrm{diag}(\tilde B_0\tilde B_0^T)$ |
| Son itération ? | Diagonaliser $\hat\Sigma_x-\tilde\Psi_s$, mettre à jour, répéter |
