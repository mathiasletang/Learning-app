# Fiche 50 — Analyse de régression : MCO, Gauss-Markov, MCG et maximum de vraisemblance

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Kempthorne, *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 6 « Regression Analysis » |
| **Difficulté** | Must know — le socle de toute l'économétrie |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 9 (matrices, rang, définie positive), fiche 39 (moindres carrés et équations normales) |
| **Concepts clés** | Modèle linéaire général, moindres carrés ordinaires, équations normales, matrice chapeau, théorème de Gauss-Markov, BLUE, moindres carrés généralisés, loi des estimateurs, test de Student, maximum de vraisemblance, M-estimation |
| **Poids à l'examen** | Trois résultats à savoir démontrer : les **équations normales**, le **théorème de Gauss-Markov**, et le fait que **l'EMV coïncide avec les MCO** sous normalité. La loi de $\hat\beta$ donne tous les tests. |

## 🎯 Vue d'ensemble

On dispose de $n$ observations : une **variable de réponse** $y_i$ et $p$ **variables explicatives** $x_i=(x_{i,1},\dots,x_{i,p})^T$. Le but de l'analyse de régression est d'**extraire et exploiter la relation** entre $y_i$ et $x_i$ — pour la **prédiction**, l'**inférence causale**, l'**approximation** ou l'étude de **relations fonctionnelles**.

```
MODÈLE       y = Xβ + ε
CRITÈRE      Q(β) = ‖y − Xβ‖²         ← moindres carrés
SOLUTION     XᵀXβ̂ = Xᵀy              ← équations normales
GARANTIE     Gauss-Markov : β̂ est BLUE
LOI          sous normalité : β̂ ~ N(β, σ²(XᵀX)⁻¹)  →  tests de Student
```

La force du chapitre est de **séparer trois questions** qu'on confond souvent : quel **modèle** ? quel **critère** d'estimation ? quelles **hypothèses** sur les erreurs ? Ces trois choix sont indépendants, et c'est leur combinaison qui détermine les propriétés de l'estimateur.

## 🟡 Concept 1 — Le modèle linéaire général

Pour chaque observation $i$, la distribution conditionnelle $[y_i\mid x_i]$ est donnée par

$$y_i = \hat y_i + \varepsilon_i, \qquad \hat y_i = \beta_1x_{i,1}+\beta_2x_{i,2}+\dots+\beta_px_{i,p}$$

où $\beta=(\beta_1,\dots,\beta_p)^T$ sont les $p$ **paramètres de régression** — **constants sur toutes les observations** — et $\varepsilon_i$ la **variable résiduelle**, qui varie d'une observation à l'autre.

> **La remarque décisive du cours.** *La linéarité de $\hat y_i$ (en les **paramètres** de régression) est préservée avec des $x$ non linéaires.* Autrement dit, « régression **linéaire** » ne veut pas dire « relation linéaire entre $y$ et la variable observée » : cela veut dire **linéaire en $\beta$**.

**D'où une étendue de modèles considérable :**

| Modèle | Choix des variables explicatives |
|---|---|
| **Approximation polynomiale** | $x_{i,j}=(x_i)^j$ — différentes puissances d'une même variable |
| **Série de Fourier** | $x_{i,j}=\sin(jx_i)$ ou $\cos(jx_i)$ |
| **Régression sur séries temporelles** | $i$ indexe le temps, et les explicatives incluent les **valeurs retardées** de la réponse |

⚠️ Cette dernière ligne est capitale en finance : elle signifie qu'un modèle autorégressif $y_t = \phi_1y_{t-1}+\dots+\phi_py_{t-p}+\varepsilon_t$ **est** une régression linéaire, et que tout ce chapitre s'y applique — sous réserve de vérifier les hypothèses sur les erreurs, ce qui est précisément là que le bât blesse.

### Les cinq étapes de l'ajustement d'un modèle

1. **Proposer un modèle** : la variable de réponse $Y$ (en précisant l'échelle), les explicatives $X_1,\dots,X_p$ (en incluant si besoin différentes fonctions des explicatives), et les **hypothèses sur la distribution de $\varepsilon$**.
2. **Spécifier un critère** pour juger les différents estimateurs.
3. **Caractériser le meilleur estimateur** et l'appliquer aux données.
4. **Vérifier les hypothèses** faites en (1).
5. Si nécessaire, **modifier** le modèle ou les hypothèses et retourner en (1).

> **Le point à ne pas manquer : l'étape (4).** Un estimateur n'est « le meilleur » que **relativement aux hypothèses** de l'étape (1). Ne pas les vérifier, c'est revendiquer une optimalité qui n'existe peut-être pas.

## 🟠 Concept 2 — Les trois choix indépendants

### Hypothèses sur la distribution des résidus

| Hypothèse | Contenu |
|---|---|
| **Gauss-Markov** | moyenne nulle, variance **constante**, **non corrélés** |
| **Modèles normaux-linéaires** | les $\varepsilon_i$ sont i.i.d. de loi $N(0,\sigma^2)$ |
| **Gauss-Markov généralisé** | moyenne nulle et **matrice de covariance générale** (possiblement corrélée, possiblement hétéroscédastique) |
| **Lois non gaussiennes** | Laplace, Pareto, **normale contaminée** : une fraction $1-\delta$ des $\varepsilon_i$ est i.i.d. $N(0,\sigma^2)$, la fraction restante $\delta$ suit une loi de contamination |

> **La normale contaminée est le modèle mental de la finance.** Les rendements ne sont pas gaussiens : ils ont des **queues épaisses**. Une petite fraction d'observations extrêmes suffit à ruiner un estimateur conçu sous normalité — d'où les estimateurs **robustes** du concept 8.

### Critères d'estimation

**Moindres carrés** · **maximum de vraisemblance** · **robuste** (résistant à la contamination) · **bayésien** (les $\beta_j$ sont des variables aléatoires de loi a priori connue) · accommodant des **données manquantes**.

### Vérification des hypothèses

- **Analyse des résidus.** Point crucial : *les erreurs du modèle $\varepsilon_i$ sont **inobservables***. Ce qu'on observe, ce sont les **résidus** pour des paramètres ajustés $\tilde\beta_j$ : $$e_i = y_i - \big[\tilde\beta_1x_{i,1}+\dots+\tilde\beta_px_{i,p}\big]$$
- **Diagnostics d'influence** : identifier les observations très « influentes ».
- **Détection d'observations aberrantes**.

⚠️ **Ne jamais confondre erreur et résidu.** $\varepsilon_i$ est une quantité théorique, non observée ; $e_i$ est une quantité calculée, qui dépend de l'estimateur. Leurs propriétés diffèrent : les $\varepsilon_i$ sont supposés non corrélés, les $e_i$ **ne le sont jamais** (ils sont liés par $p$ contraintes d'orthogonalité).

## 🔴 Concept 3 — Les moindres carrés ordinaires

**Le critère.** Pour $\beta=(\beta_1,\dots,\beta_p)^T$,

$$Q(\beta)=\sum_{i=1}^n\big[y_i-\hat y_i\big]^2 = \sum_{i=1}^n\Big[y_i-\big(\beta_1x_{i,1}+\dots+\beta_px_{i,p}\big)\Big]^2$$

L'**estimateur des MCO** $\hat\beta$ minimise $Q(\beta)$.

**En notation matricielle**, avec $y\in\mathbb{R}^n$, $X\in\mathbb{R}^{n\times p}$ et $\hat y = X\beta$ :

$$Q(\beta)=(y-X\beta)^T(y-X\beta)$$

**La dérivation des équations normales.** $\hat\beta$ annule $\partial Q/\partial\beta_j$ pour tout $j$ :

$$\frac{\partial Q}{\partial\beta_j} = \sum_{i=1}^n 2(-x_{i,j})\big[y_i-(x_{i,1}\beta_1+\dots+x_{i,p}\beta_p)\big] = -2\,X_{[j]}^T(y-X\beta)$$

où $X_{[j]}$ est la $j$-ième **colonne** de $X$. En empilant sur $j$ :

$$\nabla Q(\beta) = -2X^T(y-X\beta) = 0$$

d'où les **équations normales** :

$$\boxed{\ X^TX\hat\beta = X^Ty \qquad\Longrightarrow\qquad \hat\beta = (X^TX)^{-1}X^Ty\ }$$

> **Condition d'existence et d'unicité.** *Pour que $\hat\beta$ existe (de façon unique), $X^TX$ doit être inversible, c'est-à-dire que $X$ doit être de **rang colonne plein**.* Si deux explicatives sont colinéaires — ou si $p>n$ — l'estimateur n'est pas défini. C'est le problème de la **multicolinéarité**.

### La matrice chapeau

$$\hat y = X\hat\beta = X(X^TX)^{-1}X^Ty = Hy, \qquad H = X(X^TX)^{-1}X^T$$

$H$ est la **matrice chapeau** (*hat matrix*), de taille $n\times n$.

> **$H$ projette $\mathbb{R}^n$ sur l'espace engendré par les colonnes de $X$.** C'est la lecture géométrique de tout le chapitre : ajuster par moindres carrés, c'est **projeter orthogonalement** le vecteur de données $y$ sur le sous-espace des combinaisons linéaires des explicatives.

**Résidus.**

$$\hat\varepsilon = y-\hat y = (I_n-H)y$$

et les équations normales se relisent

$$X^T(y-X\hat\beta) = X^T\hat\varepsilon = 0_p$$

> *Le vecteur des résidus des moindres carrés $\hat\varepsilon$ est **orthogonal** à l'espace des colonnes de $X$.* C'est **le** fait à retenir : la projection laisse un résidu perpendiculaire au sous-espace. En particulier, si $X$ contient une constante, les résidus sont de **somme nulle**.

## 🔴 Concept 4 — Le théorème de Gauss-Markov

**Les hypothèses.** Les données $(y,X)$ suivent un modèle linéaire satisfaisant les hypothèses de Gauss-Markov si $y$ est une réalisation d'un vecteur aléatoire $Y$ tel que

$$\mathbb{E}(Y\mid X,\beta) = X\beta, \qquad \mathrm{Cov}(Y\mid X,\beta)=\sigma^2I_n \quad \text{pour un } \sigma^2>0$$

*C'est-à-dire que les variables aléatoires engendrant les observations sont **non corrélées** et de **variance constante** $\sigma^2$* (conditionnellement à $X$ et $\beta$).

**Le cadre.** Pour des constantes connues $c_1,\dots,c_p,c_{p+1}$, on veut estimer

$$\theta = c_1\beta_1+\dots+c_p\beta_p+c_{p+1}$$

L'estimateur $\hat\theta = c_1\hat\beta_1+\dots+c_p\hat\beta_p+c_{p+1}$ construit sur les MCO est :

1. un estimateur **sans biais** de $\theta$ ;
2. un estimateur **linéaire** de $\theta$, c'est-à-dire $\hat\theta=\sum_{i=1}^n b_iy_i$ pour des constantes $b_i$ connues (étant donné $X$).

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème de Gauss-Markov.</span>

*Sous les hypothèses de Gauss-Markov, l'estimateur $\hat\theta$ a la plus petite (**Best**) variance parmi tous les estimateurs **Linéaires** et **Sans biais** (**Unbiased**) de $\theta$ — c'est-à-dire que $\hat\theta$ est **BLUE**.*

</div>

**Démonstration (celle du cours).** Sans perte de généralité, $c_{p+1}=0$ et $c=(c_1,\dots,c_p)^T$. L'estimateur MCO de $\theta=c^T\beta$ est

$$\hat\theta = c^T\hat\beta = c^T(X^TX)^{-1}X^Ty \equiv d^Ty$$

un estimateur **linéaire** en $y$, de coefficients $d$. Considérons un estimateur linéaire alternatif $\tilde\theta=b^Ty$, et posons $f=b-d$, si bien que

$$\tilde\theta = b^Ty=(d+f)^Ty=\hat\theta+f^Ty$$

*Étape 1 — que dit l'absence de biais ?* Si $\tilde\theta$ est sans biais, comme $\hat\theta$ l'est déjà,

$$0=\mathbb{E}(f^Ty)=f^T\mathbb{E}(y)=f^T(X\beta) \qquad \text{pour tout } \beta\in\mathbb{R}^p$$

donc **$f$ est orthogonal à l'espace des colonnes de $X$** — et en particulier à $d=X(X^TX)^{-1}c$, qui appartient à cet espace.

*Étape 2 — décomposer la variance.*

$$\begin{aligned}\mathrm{Var}(\tilde\theta)&=\mathrm{Var}(d^Ty+f^Ty)=\mathrm{Var}(d^Ty)+\mathrm{Var}(f^Ty)+2\,\mathrm{Cov}(d^Ty,f^Ty)\\ &=\mathrm{Var}(\hat\theta)+\mathrm{Var}(f^Ty)+2\,d^T\mathrm{Cov}(y)f\\ &=\mathrm{Var}(\hat\theta)+\mathrm{Var}(f^Ty)+2\sigma^2\,d^Tf\\ &=\mathrm{Var}(\hat\theta)+\mathrm{Var}(f^Ty)+0 \ \geq\ \mathrm{Var}(\hat\theta)\end{aligned}$$

$\blacksquare$

> **Où chaque hypothèse est utilisée.** L'**absence de corrélation et la variance constante** ($\mathrm{Cov}(y)=\sigma^2I_n$) servent à la troisième ligne : sans elles, $d^T\mathrm{Cov}(y)f$ ne se simplifie pas en $\sigma^2d^Tf$ et le terme croisé ne s'annule pas. **La normalité n'est utilisée nulle part** — Gauss-Markov ne la suppose pas.

## 🟠 Concept 5 — Les moindres carrés généralisés

**Le cadre généralisé.** $Y = X\beta+\varepsilon$ avec

$$\mathbb{E}[\varepsilon]=0_n, \qquad \mathbb{E}[\varepsilon\varepsilon^T]=\sigma^2\Sigma$$

où $\sigma^2$ est un paramètre d'échelle inconnu et $\Sigma$ une matrice $(n\times n)$ **définie positive connue**, spécifiant les variances relatives et les corrélations des observations.

**L'astuce : blanchir les données.** On transforme

$$Y^\ast = \Sigma^{-1/2}Y, \qquad X^\ast = \Sigma^{-1/2}X$$

et le modèle devient

$$Y^\ast = X^\ast\beta+\varepsilon^\ast, \qquad \mathbb{E}[\varepsilon^\ast]=0_n,\quad \mathbb{E}[\varepsilon^\ast(\varepsilon^\ast)^T]=\sigma^2I_n$$

c'est-à-dire un modèle satisfaisant **exactement** les hypothèses de Gauss-Markov. Par le théorème, le BLUE est donc

$$\boxed{\ \hat\beta_{\text{MCG}} = \big[(X^\ast)^TX^\ast\big]^{-1}(X^\ast)^TY^\ast = \big[X^T\Sigma^{-1}X\big]^{-1}X^T\Sigma^{-1}Y\ }$$

> **La leçon de méthode.** On ne démontre pas un nouveau théorème : on **transforme le problème** pour se ramener au théorème déjà acquis. C'est exactement le mouvement de la fiche 36 (problèmes équivalents) et de la fiche 37 (mise en forme convexe d'un GP).

⚠️ **En pratique, $\Sigma$ est rarement connue.** On l'estime — d'où les MCG *faisables*, dont les propriétés ne sont qu'asymptotiques. Les deux cas usuels en finance : **hétéroscédasticité** ($\Sigma$ diagonale à termes inégaux, volatilité variable) et **autocorrélation** ($\Sigma$ non diagonale, séries temporelles).

## 🔴 Concept 6 — Loi des estimateurs sous normalité

**Le modèle normal-linéaire.**

$$y = X\beta+\varepsilon, \qquad \varepsilon\sim N_n(0_n,\ \sigma^2I_n) \quad\text{soit}\quad y\sim N_n(X\beta,\ \sigma^2I_n)$$

**Le lemme de transformation.** *Pour toute matrice $A$ de taille $(m\times n)$ et de rang $m\leq n$, le vecteur normal $y$ transformé par $A$,* $z=Ay$, *est encore un vecteur normal :*

$$z\sim N_m(\mu_z,\Sigma_z), \qquad \mu_z=AX\beta,\quad \Sigma_z=\sigma^2AA^T$$

En prenant $A=(X^TX)^{-1}X^T$ on obtient immédiatement la loi de $\hat\beta$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème.</span>

Pour le modèle normal-linéaire avec $X$ de rang $p$ : **(a)** $\hat\beta=(X^TX)^{-1}X^Ty$ et $\hat\varepsilon=y-X\hat\beta$ sont des variables aléatoires **indépendantes** ; **(b)** $\hat\beta\sim N_p\big(\beta,\ \sigma^2(X^TX)^{-1}\big)$ ; **(c)** $\displaystyle\sum_{i=1}^n\hat\varepsilon_i^2=\hat\varepsilon^T\hat\varepsilon\ \sim\ \sigma^2\chi^2_{n-p}$ ; **(d)** pour chaque $j$,

$$\hat t_j=\frac{\hat\beta_j-\beta_j}{\hat\sigma\sqrt{C_{j,j}}}\ \sim\ t_{n-p}, \qquad \hat\sigma^2=\frac{1}{n-p}\sum_{i=1}^n\hat\varepsilon_i^2,\quad C_{j,j}=\big[(X^TX)^{-1}\big]_{j,j}$$

</div>

**Lois marginales.** De (b) découle immédiatement $\hat\beta_j\sim N(\beta_j,\ \sigma^2C_{j,j})$.

> **C'est ce théorème qui produit toute l'inférence.** Le point (d) donne les **tests de Student** sur chaque coefficient et les **intervalles de confiance** ; le point (c) donne l'estimateur **sans biais** $\hat\sigma^2$ de la variance (noter le diviseur $n-p$, pas $n$) ; et le point (a) — l'indépendance — est **exactement** ce qui permet de former le rapport de (d) et d'obtenir une loi de Student.

### L'outil de la preuve : la décomposition QR

On écrit $X=QR$ où $Q$ est $(n\times p)$ **orthonormale** ($Q^TQ=I_p$) et $R$ est $(p\times p)$ **triangulaire supérieure**. Les colonnes de $Q$ se construisent par **orthonormalisation de Gram-Schmidt** sur celles de $X$.

**Ce que la décomposition simplifie.**

$$\hat\beta=(X^TX)^{-1}X^Ty = R^{-1}Q^Ty, \qquad \mathrm{Cov}(\hat\beta)=\sigma^2R^{-1}(R^{-1})^T, \qquad H=QQ^T$$

**Le principe de la preuve.** On complète $Q$ en une matrice **orthogonale** $A=\binom{Q^T}{W^T}$ de taille $(n\times n)$, et l'on pose $z=Ay$, décomposé en $z_Q=Q^Ty$ et $z_W=W^Ty$, **indépendants** puisque $A$ est orthogonale et $y$ gaussien. On montre alors

$$\hat\beta = R^{-1}z_Q, \qquad \hat\varepsilon = Wz_W$$

— donc $\hat\beta$ et $\hat\varepsilon$ sont fonctions de **vecteurs indépendants différents**, ce qui donne (a) — puis $\hat\varepsilon^T\hat\varepsilon=z_W^Tz_W$ est une somme de $n-p$ carrés de variables i.i.d. $N(0,\sigma^2)$, ce qui donne (c).

> **La lecture géométrique.** $Q$ engendre l'espace des colonnes de $X$ (dimension $p$), $W$ son orthogonal (dimension $n-p$). La rotation orthogonale $A$ **sépare** le signal du bruit : $p$ coordonnées portent $\hat\beta$, les $n-p$ autres portent les résidus. L'indépendance et le $\chi^2_{n-p}$ en découlent immédiatement — d'où le nom de « degrés de liberté ».

## 🔴 Concept 7 — Maximum de vraisemblance

**Définitions.** La **fonction de vraisemblance** est $L(\beta,\sigma^2)=p(y\mid X,\beta,\sigma^2)$, la densité jointe de $y$ conditionnellement aux données $X$ et aux paramètres inconnus. Les **estimateurs du maximum de vraisemblance** sont les valeurs qui maximisent $L$ — *celles qui rendent les données observées les plus vraisemblables au sens de leur densité*.

**Le calcul.** Les $y_i$ étant indépendants de loi $N(\mu_i,\sigma^2)$ avec $\mu_i=\sum_j\beta_jx_{i,j}$ :

$$L(\beta,\sigma^2)=\prod_{i=1}^n\frac{1}{\sqrt{2\pi\sigma^2}}\,e^{-\frac{1}{2\sigma^2}\left(y_i-\sum_j\beta_jx_{i,j}\right)^2} = \frac{1}{(2\pi\sigma^2)^{n/2}}\,e^{-\frac12(y-X\beta)^T(\sigma^2I_n)^{-1}(y-X\beta)}$$

En passant au logarithme et en supprimant les termes constants :

$$\log L(\beta,\sigma^2) = -\frac n2\log(\sigma^2)-\frac{1}{2\sigma^2}\,\underbrace{(y-X\beta)^T(y-X\beta)}_{Q(\beta),\ \text{le critère des moindres carrés !}}$$

> **Le résultat central.** *L'estimateur MCO $\hat\beta$ **est aussi** l'estimateur du maximum de vraisemblance.* Maximiser $\log L$ en $\beta$ revient à **minimiser $Q(\beta)$** — le critère des moindres carrés apparaît **mécaniquement** dès qu'on suppose les erreurs gaussiennes.

**L'estimateur ML de la variance.** En annulant $\partial\log L(\hat\beta,\sigma^2)/\partial(\sigma^2)$ :

$$-\frac{n}{2}\cdot\frac{1}{\sigma^2}-\frac12(-1)(\sigma^2)^{-2}Q(\hat\beta)=0 \qquad\Longrightarrow\qquad \hat\sigma^2_{ML}=\frac{Q(\hat\beta)}{n}=\frac{1}{n}\sum_{i=1}^n\hat\varepsilon_i^2$$

⚠️ **Cet estimateur est BIAISÉ**, comme le signale le cours. Le point (c) du théorème donne $\mathbb{E}[\hat\varepsilon^T\hat\varepsilon]=\sigma^2(n-p)$, donc $\mathbb{E}[\hat\sigma^2_{ML}]=\sigma^2(n-p)/n<\sigma^2$. L'estimateur **sans biais** est celui de diviseur $n-p$ : c'est celui qu'on utilise dans les tests.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi la connexion MCO / MV est importante.</span>

Elle explique pourquoi les moindres carrés sont **partout** : ils ne sont pas un choix arbitraire, mais l'estimateur du maximum de vraisemblance **sous hypothèse gaussienne**. Corollaire immédiat : si les erreurs ne sont **pas** gaussiennes — queues épaisses des rendements financiers — les MCO perdent leur justification en vraisemblance, même s'ils restent BLUE au sens de Gauss-Markov.

</div>

## 🟠 Concept 8 — M-estimation généralisée

**Le cadre unificateur.** Pour ajuster $y_i=x_i^T\beta+\varepsilon_i$, on choisit $\hat\beta$ minimisant

$$Q(\beta)=\sum_{i=1}^n h\big(y_i,x_i,\beta,\sigma^2\big)$$

**Le choix de la fonction $h$ distingue les différents estimateurs :**

| Estimateur | $h(y_i,x_i,\beta,\sigma^2)$ | Comportement |
|---|---|---|
| **Moindres carrés** | $(y_i-x_i^T\beta)^2$ | pénalise le **carré** : très sensible aux aberrants |
| **Écart absolu moyen (MAD)** | $\lvert y_i-x_i^T\beta\rvert$ | pénalise linéairement : **robuste** |
| **Maximum de vraisemblance** | $-\log p(y_i\mid\beta,x_i,\sigma^2)$ | optimal sous le modèle supposé |

> **La lecture avec la fiche 25.** Minimiser $\sum_i(y_i-x_i^T\beta)^2$ est un **programme quadratique** ; minimiser $\sum_i|y_i-x_i^T\beta|=\|y-X\beta\|_1$ est un **programme linéaire**. Le choix du critère est donc aussi un choix de **classe de problème d'optimisation** — et l'on retrouve exactement la comparaison des normes de la fiche 25 : la norme 1 laisse quelques gros résidus et colle au reste, la norme 2 les étale tous.

## Comment résoudre l'exercice type (protocole)

1. **Écrire le modèle** $y=X\beta+\varepsilon$ en précisant ce que contient chaque colonne de $X$ (constante ? retards ? puissances ?).
2. **Vérifier le rang** de $X$ : rang colonne plein, sinon $\hat\beta$ n'existe pas.
3. **Énoncer les hypothèses** sur $\varepsilon$ : Gauss-Markov, normale, ou covariance générale.
4. **Calculer** $\hat\beta=(X^TX)^{-1}X^Ty$, puis $\hat y=Hy$ et $\hat\varepsilon=(I-H)y$.
5. **Estimer la variance** par $\hat\sigma^2=\hat\varepsilon^T\hat\varepsilon/(n-p)$ — diviseur $n-p$, jamais $n$.
6. **Faire l'inférence** : $\hat t_j=(\hat\beta_j-\beta_j^0)/(\hat\sigma\sqrt{C_{j,j}})$ comparé à $t_{n-p}$.
7. **Vérifier les hypothèses** : graphique des résidus, hétéroscédasticité, autocorrélation, aberrants.
8. **Corriger si besoin** : MCG en cas de covariance non sphérique, estimateur robuste en cas de contamination.

### Exercices progressifs

**Niveau 1** — Pourquoi exige-t-on que $X$ soit de rang colonne plein ?

<details><summary>Correction</summary>

Parce que $\hat\beta=(X^TX)^{-1}X^Ty$ requiert l'**inversibilité** de $X^TX$. Or $X^TX$ est inversible si et seulement si $X$ est de rang colonne plein : si une colonne est combinaison linéaire des autres, il existe $v\neq0$ avec $Xv=0$, donc $X^TXv=0$ et la matrice est singulière.

**Interprétation.** Deux explicatives parfaitement colinéaires portent la **même information** : on ne peut pas attribuer l'effet à l'une plutôt qu'à l'autre. Les équations normales ont alors une infinité de solutions, toutes donnant le même $\hat y$ — la **projection** $Hy$ reste bien définie, c'est seulement sa **décomposition** en coefficients qui ne l'est pas.

</details>

**Niveau 2** — Que signifie géométriquement $X^T\hat\varepsilon=0$ ?

<details><summary>Correction</summary>

Que le vecteur des résidus est **orthogonal** à toutes les colonnes de $X$, donc à l'espace qu'elles engendrent. Autrement dit, $\hat y=Hy$ est la **projection orthogonale** de $y$ sur cet espace, et $\hat\varepsilon=y-\hat y$ en est la composante perpendiculaire.

**Deux conséquences pratiques.** Si $X$ contient une colonne de $1$ (une constante), l'orthogonalité à cette colonne donne $\sum_i\hat\varepsilon_i=0$ : les résidus sont de **somme nulle**. Et l'orthogonalité à chaque explicative donne $\sum_i x_{i,j}\hat\varepsilon_i=0$ : les résidus sont **non corrélés avec les régresseurs par construction** — ce qui explique pourquoi on ne peut pas tester l'exogénéité en regardant cette corrélation.

</details>

**Niveau 3** — On estime le modèle de marché $r_{i,t}=\alpha+\beta r_{m,t}+\varepsilon_t$ sur $n=60$ mois. On trouve $\hat\beta=1{,}2$ et $\hat\sigma\sqrt{C_{2,2}}=0{,}15$. Le titre est-il significativement plus risqué que le marché ?

<details><summary>Correction</summary>

On teste $H_0:\beta=1$ contre $H_1:\beta>1$ — « le titre amplifie-t-il les mouvements du marché ? ». La statistique du point (d) du théorème :

$$\hat t=\frac{\hat\beta-1}{\hat\sigma\sqrt{C_{2,2}}}=\frac{1{,}2-1}{0{,}15}\approx1{,}33$$

à comparer à une loi de Student à $n-p=60-2=58$ degrés de liberté. Le quantile à $95\,\%$ unilatéral vaut environ $1{,}67$.

Comme $1{,}33<1{,}67$, **on ne rejette pas $H_0$** : le bêta n'est pas significativement supérieur à $1$ au seuil de $5\,\%$. L'écart-type d'estimation de $0{,}15$ est trop grand pour trancher.

⚠️ **La validité du test suppose les hypothèses du modèle normal-linéaire** : erreurs i.i.d. gaussiennes. Sur des rendements mensuels, l'hypothèse d'absence d'autocorrélation est plausible, mais la normalité et l'homoscédasticité le sont beaucoup moins (volatilité groupée) — voir les fiches sur la modélisation de la volatilité.

</details>

**Niveau 4 — type examen** — Démontrez le théorème de Gauss-Markov et identifiez précisément où chaque hypothèse intervient.

<details><summary>Correction</summary>

**Cadre.** Estimer $\theta=c^T\beta$. L'estimateur MCO est $\hat\theta=c^T\hat\beta=c^T(X^TX)^{-1}X^Ty=d^Ty$ avec $d=X(X^TX)^{-1}c$. Soit $\tilde\theta=b^Ty$ un autre estimateur **linéaire**, et $f=b-d$, si bien que $\tilde\theta=\hat\theta+f^Ty$.

**Étape 1 — l'absence de biais contraint $f$.** $\hat\theta$ est sans biais (car $\mathbb{E}(y)=X\beta$ donne $\mathbb{E}(\hat\theta)=c^T\beta$). Si $\tilde\theta$ l'est aussi, alors

$$0=\mathbb{E}(f^Ty)=f^TX\beta \qquad \textbf{pour tout } \beta\in\mathbb{R}^p$$

Le « pour tout $\beta$ » est essentiel : il force $f^TX=0$, c'est-à-dire **$f\perp$ espace des colonnes de $X$**. Comme $d=X(X^TX)^{-1}c$ appartient à cet espace, $d^Tf=0$. *→ Ici intervient l'hypothèse $\mathbb{E}(Y\mid X,\beta)=X\beta$ : la **bonne spécification** du modèle.*

**Étape 2 — décomposer la variance.**

$$\mathrm{Var}(\tilde\theta)=\mathrm{Var}(\hat\theta)+\mathrm{Var}(f^Ty)+2\,\mathrm{Cov}(d^Ty,f^Ty)$$

et le terme de covariance vaut

$$\mathrm{Cov}(d^Ty,f^Ty)=d^T\mathrm{Cov}(y)\,f = d^T(\sigma^2I_n)f=\sigma^2\,d^Tf=0$$

*→ Ici intervient l'hypothèse $\mathrm{Cov}(Y\mid X,\beta)=\sigma^2I_n$ : **variance constante et absence de corrélation**. Sans elle, $\mathrm{Cov}(y)=\sigma^2\Sigma$ et le terme croisé $\sigma^2d^T\Sigma f$ n'a aucune raison d'être nul.*

**Conclusion.** $\mathrm{Var}(\tilde\theta)=\mathrm{Var}(\hat\theta)+\mathrm{Var}(f^Ty)\geq\mathrm{Var}(\hat\theta)$, avec égalité si et seulement si $f^Ty$ est de variance nulle. $\hat\theta$ est donc BLUE. $\blacksquare$

**Ce que le théorème NE dit pas — la liste à connaître.**

- Il ne suppose **pas la normalité** : elle n'intervient nulle part dans la preuve.
- Il ne dit **rien** des estimateurs **non linéaires** : un estimateur non linéaire peut battre les MCO (c'est le cas des estimateurs robustes sur des données contaminées).
- Il ne dit **rien** des estimateurs **biaisés** : un estimateur biaisé peut avoir une erreur quadratique moyenne plus faible — c'est tout le principe de la **régularisation** (ridge, LASSO).
- Il **tombe** si $\mathrm{Cov}(y)\neq\sigma^2I_n$ — c'est exactement le cas que les MCG traitent, en **blanchissant** les données pour se ramener au cadre du théorème.

</details>

## 🔴 Common mistakes

1. **Croire que « linéaire » porte sur $x$** — la linéarité est en **$\beta$** ; polynômes, Fourier et retards restent des régressions linéaires.
2. **Confondre erreur $\varepsilon_i$ et résidu $\hat\varepsilon_i$** — la première est inobservable, le second est calculé et satisfait $p$ contraintes d'orthogonalité.
3. **Diviser par $n$ pour estimer $\sigma^2$** — l'estimateur sans biais divise par $n-p$ ; celui du maximum de vraisemblance, qui divise par $n$, est **biaisé**.
4. **Croire que Gauss-Markov exige la normalité** — il ne l'exige pas ; c'est le calcul des **lois** et des **tests** qui en a besoin.
5. **Oublier que BLUE se restreint aux estimateurs linéaires sans biais** — hors de cette classe, on peut faire mieux.
6. **Appliquer les MCO à des données hétéroscédastiques ou autocorrélées** — ils restent sans biais mais **ne sont plus BLUE**, et les écarts-types calculés sont **faux**.
7. **Tester l'exogénéité en corrélant résidus et régresseurs** — cette corrélation est **nulle par construction** ($X^T\hat\varepsilon=0$).
8. **Oublier de vérifier le rang de $X$** — multicolinéarité ou $p>n$ rendent $\hat\beta$ indéfini.

## 📌 Ultimate Review

1. Modèle : $y=X\beta+\varepsilon$ ; **linéaire en $\beta$**, quelconque en $x$ (polynômes, Fourier, retards).
2. Cinq étapes : modèle, critère, estimation, **vérification des hypothèses**, itération.
3. Trois choix **indépendants** : forme du modèle, hypothèses sur $\varepsilon$, critère d'estimation.
4. **MCO** : $Q(\beta)=\|y-X\beta\|^2$ ; **équations normales** $X^TX\hat\beta=X^Ty$ ; $\hat\beta=(X^TX)^{-1}X^Ty$, existence ssi $X$ de rang colonne plein.
5. **Matrice chapeau** $H=X(X^TX)^{-1}X^T$ : projection sur l'espace des colonnes ; $\hat\varepsilon=(I-H)y$ **orthogonal** à cet espace.
6. **Gauss-Markov** : $\mathbb{E}(Y)=X\beta$, $\mathrm{Cov}(Y)=\sigma^2I_n$ $\Rightarrow$ $\hat\theta=c^T\hat\beta$ est **BLUE**. Pas de normalité requise.
7. **MCG** : $\mathrm{Cov}=\sigma^2\Sigma$, on blanchit par $\Sigma^{-1/2}$, d'où $\hat\beta_{\text{MCG}}=[X^T\Sigma^{-1}X]^{-1}X^T\Sigma^{-1}Y$.
8. **Sous normalité** : $\hat\beta\sim N_p(\beta,\sigma^2(X^TX)^{-1})$ ; $\hat\beta\perp\hat\varepsilon$ ; $\hat\varepsilon^T\hat\varepsilon\sim\sigma^2\chi^2_{n-p}$ ; $\hat t_j\sim t_{n-p}$.
9. **QR** : $X=QR$, $\hat\beta=R^{-1}Q^Ty$, $H=QQ^T$ ; la rotation orthogonale sépare signal ($p$) et bruit ($n-p$).
10. **Maximum de vraisemblance** : $\log L=-\frac n2\log\sigma^2-\frac{1}{2\sigma^2}Q(\beta)$ ; **l'EMV de $\beta$ est l'estimateur MCO** ; $\hat\sigma^2_{ML}=Q(\hat\beta)/n$ est **biaisé**.
11. **M-estimation** : le choix de $h$ distingue MCO (carré), MAD (valeur absolue, robuste), MV ($-\log p$).

**Formulas to know**

$$\hat\beta=(X^TX)^{-1}X^Ty \qquad H=X(X^TX)^{-1}X^T \qquad \hat\beta_{\text{MCG}}=\big[X^T\Sigma^{-1}X\big]^{-1}X^T\Sigma^{-1}Y$$

$$\hat\beta\sim N_p\big(\beta,\sigma^2(X^TX)^{-1}\big) \qquad \hat t_j=\frac{\hat\beta_j-\beta_j}{\hat\sigma\sqrt{C_{j,j}}}\sim t_{n-p} \qquad \hat\sigma^2=\frac{\hat\varepsilon^T\hat\varepsilon}{n-p}$$

**Methods to know** : le protocole en 8 étapes ; la dérivation des équations normales ; la preuve de Gauss-Markov et le rôle de chaque hypothèse ; le blanchiment des MCG.

## 🧠 Active Recall

**Basic** — Écrivez les équations normales et donnez la condition d'existence de $\hat\beta$.

<details><summary>Réponse</summary>

$X^TX\hat\beta=X^Ty$, d'où $\hat\beta=(X^TX)^{-1}X^Ty$. L'existence et l'unicité exigent que $X^TX$ soit **inversible**, c'est-à-dire que $X$ soit de **rang colonne plein** — pas de colinéarité parfaite entre explicatives, et $n\geq p$.

</details>

**Understanding** — Que signifie « BLUE », et quelles hypothèses sont nécessaires ?

<details><summary>Réponse</summary>

**B**est **L**inear **U**nbiased **E**stimator : de **variance minimale** parmi tous les estimateurs **linéaires** en $y$ et **sans biais**. Les hypothèses nécessaires sont celles de Gauss-Markov : $\mathbb{E}(Y\mid X,\beta)=X\beta$ (bonne spécification) et $\mathrm{Cov}(Y\mid X,\beta)=\sigma^2I_n$ (variance constante, absence de corrélation).

**La normalité n'est pas requise** — elle ne sert qu'à obtenir les **lois** des estimateurs, donc les tests.

</details>

**Application** — Les erreurs sont hétéroscédastiques. Les MCO restent-ils sans biais ? Restent-ils BLUE ?

<details><summary>Réponse</summary>

**Sans biais : oui.** L'absence de biais ne dépend que de $\mathbb{E}(y)=X\beta$ : $\mathbb{E}(\hat\beta)=(X^TX)^{-1}X^T\mathbb{E}(y)=\beta$, quelle que soit la structure de covariance.

**BLUE : non.** La preuve de Gauss-Markov utilise $\mathrm{Cov}(y)=\sigma^2I_n$ pour annuler le terme croisé. Avec $\mathrm{Cov}(y)=\sigma^2\Sigma$, le BLUE devient l'estimateur des **MCG**, $\hat\beta_{\text{MCG}}=[X^T\Sigma^{-1}X]^{-1}X^T\Sigma^{-1}y$.

**Et surtout :** les écarts-types usuels $\hat\sigma^2(X^TX)^{-1}$ sont alors **faux**, donc tous les tests le sont aussi.

</details>

**Comparison** — MCO et maximum de vraisemblance : quand coïncident-ils ?

<details><summary>Réponse</summary>

Ils coïncident **pour $\beta$** dès que les erreurs sont supposées i.i.d. **gaussiennes** : la log-vraisemblance s'écrit $-\frac n2\log\sigma^2-\frac{1}{2\sigma^2}Q(\beta)$, et la maximiser en $\beta$ revient exactement à **minimiser le critère des moindres carrés** $Q(\beta)$.

Ils **diffèrent pour $\sigma^2$** : l'EMV donne $Q(\hat\beta)/n$, **biaisé**, alors que l'estimateur usuel divise par $n-p$.

Et ils diffèrent complètement **hors du cas gaussien** : sous une loi de Laplace, par exemple, l'EMV minimise $\sum_i|y_i-x_i^T\beta|$ — c'est l'estimateur MAD, pas les MCO.

</details>

**Exam-style** — Expliquez le rôle de la décomposition QR dans la théorie de la distribution.

<details><summary>Réponse</summary>

On écrit $X=QR$ avec $Q^TQ=I_p$ et $R$ triangulaire supérieure, puis on complète $Q$ en une matrice **orthogonale** $A=\binom{Q^T}{W^T}$ de taille $n\times n$. Comme $y$ est gaussien et $A$ orthogonale, les blocs $z_Q=Q^Ty$ et $z_W=W^Ty$ sont **gaussiens et indépendants**.

On montre alors $\hat\beta=R^{-1}z_Q$ et $\hat\varepsilon=Wz_W$ : les deux quantités sont fonctions de **vecteurs indépendants distincts**, d'où **(a)** leur indépendance. La loi **(b)** de $\hat\beta$ s'obtient en appliquant le lemme de transformation avec $A=R^{-1}$. Et $\hat\varepsilon^T\hat\varepsilon=z_W^Tz_W$ est une somme de **$n-p$** carrés de variables i.i.d. $N(0,\sigma^2)$, d'où **(c)** le $\sigma^2\chi^2_{n-p}$. Le point **(d)** en découle immédiatement.

**Géométriquement**, la rotation $A$ sépare $\mathbb{R}^n$ en l'espace des colonnes de $X$ (dimension $p$, qui porte l'estimation) et son orthogonal (dimension $n-p$, qui porte le bruit) — d'où les $n-p$ « degrés de liberté ».

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le modèle linéaire général ? | $y_i=\beta_1x_{i,1}+\dots+\beta_px_{i,p}+\varepsilon_i$ |
| « Linéaire » porte sur quoi ? | Sur les **paramètres** $\beta$, pas sur $x$ |
| Critère des moindres carrés ? | $Q(\beta)=(y-X\beta)^T(y-X\beta)$ |
| Équations normales ? | $X^TX\hat\beta=X^Ty$ |
| Condition d'existence de $\hat\beta$ ? | $X$ de **rang colonne plein** |
| Matrice chapeau ? | $H=X(X^TX)^{-1}X^T$ — projette sur l'espace des colonnes |
| Propriété des résidus MCO ? | $X^T\hat\varepsilon=0$ : orthogonaux aux régresseurs |
| Hypothèses de Gauss-Markov ? | $\mathbb{E}(Y)=X\beta$ et $\mathrm{Cov}(Y)=\sigma^2I_n$ |
| Que dit le théorème ? | $c^T\hat\beta$ est **BLUE** |
| La normalité est-elle requise ? | **Non** pour Gauss-Markov ; oui pour les lois et les tests |
| Estimateur des MCG ? | $[X^T\Sigma^{-1}X]^{-1}X^T\Sigma^{-1}Y$ |
| Comment l'obtient-on ? | En **blanchissant** : $Y^\ast=\Sigma^{-1/2}Y$, $X^\ast=\Sigma^{-1/2}X$ |
| Loi de $\hat\beta$ sous normalité ? | $N_p(\beta,\ \sigma^2(X^TX)^{-1})$ |
| Loi de $\hat\varepsilon^T\hat\varepsilon$ ? | $\sigma^2\chi^2_{n-p}$ |
| Statistique de test sur $\beta_j$ ? | $(\hat\beta_j-\beta_j)/(\hat\sigma\sqrt{C_{j,j}})\sim t_{n-p}$ |
| Estimateur sans biais de $\sigma^2$ ? | $\hat\varepsilon^T\hat\varepsilon/(n-p)$ |
| L'EMV de $\beta$ sous normalité ? | C'est **l'estimateur MCO** |
| L'EMV de $\sigma^2$ ? | $Q(\hat\beta)/n$ — **biaisé** |
| M-estimation : quel $h$ pour les MCO ? | $h=(y_i-x_i^T\beta)^2$ |
| Quel $h$ pour un estimateur robuste ? | $h=\lvert y_i-x_i^T\beta\rvert$ (MAD) |
