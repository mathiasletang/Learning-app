# Fiche 405 — Probabilités et distributions : Bayes, gaussiennes, famille exponentielle

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 6 « Probability and Distributions » (p. 172-224) |
| **Difficulté** | Avancé — la fondation probabiliste de tout l'apprentissage automatique |
| **Temps d'étude estimé** | 160 min |
| **Prérequis** | Fiche 402 (produit intérieur) · Fiche 403 (matrices SDP, Cholesky, déterminant) · Fiche 404 (jacobienne) |
| **Concepts clés** | Espace probabilisé, univers, tribu des événements, mesure de probabilité, variable aléatoire, espace cible, loi, fonction de masse, densité, fonction de répartition, probabilité jointe / marginale / conditionnelle, règle de la somme, règle du produit, théorème de Bayes, a priori, vraisemblance, a posteriori, vraisemblance marginale, espérance, moyenne, médiane, mode, covariance, variance, matrice de covariance, corrélation, statistiques empiriques, formule brute de la variance, indépendance statistique, i.i.d., indépendance conditionnelle, produit intérieur de variables aléatoires, loi gaussienne, marginales et conditionnelles gaussiennes, produit de gaussiennes, mélange, échantillonnage, Bernoulli, binomiale, bêta, conjugaison, a priori conjugué, statistiques exhaustives, théorème de Fisher-Neyman, famille exponentielle, paramètres naturels, log-partition, sigmoïde, changement de variables, transformation intégrale de probabilité |
| **Poids à l'examen** | La **règle de la somme** et la **règle du produit** · le **théorème de Bayes** et ses quatre noms · $\operatorname{Cov}[x,y]=\mathbb E[xy]-\mathbb E[x]\mathbb E[y]$ · $\mathbb V[Ax+b]=A\Sigma A^\top$ · les **conditionnelles gaussiennes** $\mu_{x\mid y}=\mu_x+\Sigma_{xy}\Sigma_{yy}^{-1}(y-\mu_y)$ · la **conjugaison bêta-binomiale** · la forme $p(x\mid\theta)=h(x)\exp(\langle\theta,\phi(x)\rangle-A(\theta))$ · le **changement de variables** avec $\|\det J\|$. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : quantifier l'INCERTITUDE

  §6.1 ESPACE PROBABILISÉ (Ω, A, P)
        UNIVERS Ω  ·  TRIBU DES ÉVÉNEMENTS A  ·  PROBABILITÉ P   avec P(Ω) = 1
        VARIABLE ALÉATOIRE  X : Ω → T   ⚠️ ni aléatoire ni variable — c'est une FONCTION
        LOI de X :  PX(S) = P(X ∈ S) = P(X⁻¹(S))
  §6.2 DISCRET / CONTINU
        DISCRET   P(X = x)   fonction de MASSE (pmf)
        CONTINU   P(X ≤ x)   fonction de RÉPARTITION (cdf) ;  densité f ≥ 0 , ∫f = 1
        ⚠️ une densité PEUT dépasser 1  ·  ⚠️ P(X = x) = 0 en continu
  §6.3 LES DEUX RÈGLES FONDAMENTALES
        SOMME    p(x) = Σ_y p(x,y)   ou   ∫ p(x,y) dy         (marginalisation)
        PRODUIT  p(x,y) = p(y|x) p(x)
        BAYES    p(x|y) = p(y|x) p(x) / p(y)
                 postérieur = vraisemblance × a priori / évidence
  §6.4 STATISTIQUES RÉSUMÉES ET INDÉPENDANCE
        E[g(x)] = ∫ g(x)p(x)dx    ·  moyenne, MÉDIANE, MODE
        Cov[x,y] = E[xy] − E[x]E[y]    ·  V[x] = Cov[x,x]   ·  corr ∈ [−1,1]
        AFFINE   E[Ax+b] = Aµ+b      V[Ax+b] = A Σ Aᵀ      Cov[x, Ax+b] = Σ Aᵀ
        INDÉPENDANCE  p(x,y) = p(x)p(y)  ⟹ Cov = 0  ⚠️ RÉCIPROQUE FAUSSE
        GÉOMÉTRIE  ⟨X,Y⟩ := Cov[x,y]  ·  ‖X‖ = σ[x]  ·  cos θ = corrélation
  §6.5 GAUSSIENNE
        p(x|µ,Σ) = (2π)^{−D/2} |Σ|^{−1/2} exp(−½ (x−µ)ᵀ Σ⁻¹ (x−µ))
        MARGINALE p(x) = N(µx, Σxx)             ← on IGNORE ce qui ne nous intéresse pas
        CONDITIONNELLE µ_{x|y} = µx + Σxy Σyy⁻¹ (y − µy)
                       Σ_{x|y} = Σxx − Σxy Σyy⁻¹ Σyx
        SOMME de gaussiennes INDÉPENDANTES → gaussienne  ·  toute AFFINE → gaussienne
        ÉCHANTILLONNER : uniforme → Box-Müller → N(0,I) → y = Ax + µ avec AAᵀ = Σ (CHOLESKY)
  §6.6 CONJUGAISON ET FAMILLE EXPONENTIELLE
        Bernoulli · Binomiale · Bêta  ·  BÊTA conjugué de BINOMIALE et de BERNOULLI
        STATISTIQUES EXHAUSTIVES  ·  FISHER-NEYMAN  p(x|θ) = h(x) g_θ(φ(x))
        FAMILLE EXPONENTIELLE  p(x|θ) = h(x) exp(⟨θ, φ(x)⟩ − A(θ))
  §6.7 CHANGEMENT DE VARIABLES
        DISCRET   P(Y = y) = P(X = U⁻¹(y))
        CONTINU   f(y) = fx(U⁻¹(y)) · |d/dy U⁻¹(y)|   ⚠️ le facteur JACOBIEN en plus
        MULTIVARIÉ  f(y) = fx(U⁻¹(y)) · |det ∂/∂y U⁻¹(y)|
```

> **La phrase d'ouverture.** *« La probabilité, grossièrement, concerne l'étude de l'INCERTITUDE. Elle peut être vue comme la **fraction des fois où un événement se produit**, ou comme un **DEGRÉ DE CROYANCE** au sujet d'un événement. »* En apprentissage automatique, on quantifie l'incertitude **dans les données**, **dans le modèle** et **dans les prédictions**.

## 🟠 Concept 1 — L'espace probabilisé (§6.1)

### 1.1 La justification philosophique

> **Le programme.** *« La théorie des probabilités peut être considérée comme une **GÉNÉRALISATION DE LA LOGIQUE BOOLÉENNE**. »* La logique classique ne permet pas d'exprimer certaines formes de **raisonnement plausible** : on observe que $A$ est faux, $B$ devient **moins plausible** sans qu'aucune conclusion logique ne suive.

**L'exemple de l'ami en retard.** Trois hypothèses : $H_1$, elle est à l'heure ; $H_2$, elle est retardée par le trafic ; $H_3$, elle a été enlevée par des extraterrestres. Observant le retard, on **exclut logiquement $H_1$**, on tend à considérer $H_2$ **plus probable** (sans y être logiquement contraint), et on garde $H_3$ **possible mais très improbable**.

**Les trois critères de E. T. Jaynes (1922-1998) :**

1. Les degrés de plausibilité sont représentés par des **nombres réels**.
2. Ces nombres doivent être fondés sur les **règles du sens commun**.
3. Le raisonnement doit être **CONSISTANT**, en trois sens :
  - (a) **Consistance / non-contradiction** : quand un même résultat peut être atteint par des voies différentes, la **même valeur de plausibilité** doit être trouvée dans tous les cas.
  - (b) **Honnêteté** : **toutes** les données disponibles doivent être prises en compte.
  - (c) **Reproductibilité** : si notre état de connaissance sur deux problèmes est le même, il faut leur assigner **le même degré de plausibilité**.

> **Le théorème de Cox-Jaynes** prouve que ces plausibilités suffisent à définir les règles mathématiques universelles applicables à la plausibilité $p$, **à transformation par une fonction monotone arbitraire près**. Et **ces règles sont les règles de la probabilité.**

> ⚠️ **Les deux interprétations, à connaître.**
>
> - **BAYÉSIENNE** : la probabilité spécifie le **degré d'incertitude que l'utilisateur a** au sujet d'un événement. Aussi appelée « probabilité **subjective** » ou « **degré de croyance** ».
> - **FRÉQUENTISTE** : la probabilité est la **fréquence relative** de l'événement d'intérêt sur le nombre total d'événements, **à la limite d'une infinité de données**.

### 1.2 Les trois concepts de Kolmogorov

| Concept | Notation | Définition |
|---|---|---|
| **L'univers** (*sample space*) | $\Omega$ | L'ensemble de **tous les résultats possibles** de l'expérience. Ex. : deux lancers de pièce $\to\{hh,tt,ht,th\}$ |
| **La tribu des événements** (*event space*) | $\mathcal A$ | L'espace des **résultats potentiels**. $A\subseteq\Omega$ est dans $\mathcal A$ si, à la fin de l'expérience, on peut **observer** si un résultat $\omega\in\Omega$ est dans $A$. Pour les lois discrètes, $\mathcal A$ est souvent **l'ensemble des parties** de $\Omega$ |
| **La probabilité** | $P$ | À chaque $A\in\mathcal A$ on associe $P(A)$, la probabilité ou **degré de croyance** que l'événement se produira |

$$\boxed{\;P(A)\in[0,1]\qquad\text{et}\qquad P(\Omega)=1\;}$$

> ⚠️ **Les autres noms de $\Omega$**, source de confusion : « **espace d'états** » (*state space*), « **espace de description des échantillons** », « **espace des possibilités** », et même « **espace des événements** ». Le livre le signale explicitement.

### 1.3 La variable aléatoire

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

On introduit une fonction $X:\Omega\to\mathcal T$ qui prend un élément de $\Omega$ (un résultat) et renvoie une **quantité d'intérêt** $x$, valeur dans l'**ESPACE CIBLE** $\mathcal T$. Cette association est la **VARIABLE ALÉATOIRE**.

</div>

> ⚠️ **L'avertissement du livre, mot pour mot.** *« Le nom « variable aléatoire » est une **grande source de malentendus**, car elle n'est **ni aléatoire ni une variable**. **C'est une FONCTION.** »*

**Le lien entre $\Omega$ et $\mathcal T$.** Pour $S\subseteq\mathcal T$, soit $X^{-1}(S)$ l'**image réciproque** de $S$ par $X$, c'est-à-dire $\{\omega\in\Omega:X(\omega)\in S\}$. Alors

$$\boxed{\;P_X(S)=P(X\in S)=P\big(X^{-1}(S)\big)=P\big(\{\omega\in\Omega:X(\omega)\in S\}\big)\;}$$

⚠️ La fonction $P_X$, ou de façon équivalente $P\circ X^{-1}$, est la **LOI** (*law*) ou **distribution** de $X$.

**Le classement par espace cible :**

- $\mathcal T$ **fini ou dénombrable** $\Rightarrow$ variable aléatoire **DISCRÈTE** (§6.2.1).
- $\mathcal T=\mathbb R$ ou $\mathbb R^D$ $\Rightarrow$ variable aléatoire **CONTINUE** (§6.2.2).

**Exemple 6.1 — le jeu de fête foraine.** On tire deux pièces d'un sac **avec remise**. Il y a des pièces américaines (notées $D$) et britanniques (notées $L$). Un tirage rend $D$ avec probabilité $0{,}3$.

$$\Omega=\{(D,D),(D,L),(L,D),(L,L)\}$$

$X$ compte le nombre de $D$, donc $\mathcal T=\{0,1,2\}$ :

$$X\big((D,D)\big)=2,\quad X\big((D,L)\big)=1,\quad X\big((L,D)\big)=1,\quad X\big((L,L)\big)=0$$

Comme on **remet la première pièce** avant de tirer la seconde, les deux tirages sont **indépendants**. **Deux résultats expérimentaux différents s'envoient sur le même événement** ($X=1$), d'où le facteur 2 :

$$P(X=2)=0{,}3\cdot0{,}3=\boxed{0{,}09}$$

$$P(X=1)=0{,}3\cdot0{,}7+0{,}7\cdot0{,}3=\boxed{0{,}42}$$

$$P(X=0)=0{,}7\cdot0{,}7=\boxed{0{,}49}$$

<details><summary>Contrôle de normalisation</summary>

$0{,}09+0{,}42+0{,}49=1{,}00$ exactement La pmf est bien normalisée.

</details>

### 1.4 Probabilités contre statistiques

> **La distinction, en une phrase chacune.**
>
> - **PROBABILITÉ** : *« on considère un MODÈLE d'un processus, où l'incertitude sous-jacente est capturée par des variables aléatoires, et on utilise les règles de la probabilité pour **DÉRIVER CE QUI SE PASSE** »*.
> - **STATISTIQUE** : *« on observe que quelque chose **s'est produit** et on essaie de **retrouver le PROCESSUS SOUS-JACENT** qui explique les observations »*.
>
> L'apprentissage automatique est **proche de la statistique** dans ses buts.

## 🔴 Concept 2 — Probabilités discrètes et continues (§6.2)

### 2.1 Le vocabulaire — le tableau 6.1 du livre

| Type | « Probabilité ponctuelle » | « Probabilité d'intervalle » |
|---|---|---|
| **Discret** | $P(X=x)$ — **fonction de MASSE** (*pmf*) | **Sans objet** |
| **Continu** | $p(x)$ — **fonction de DENSITÉ** (*pdf*) | $P(X\leqslant x)$ — **fonction de RÉPARTITION** (*cdf*) |

> ⚠️ **Univarié contre multivarié.** *« Loi UNIVARIÉE » = loi d'une SEULE variable aléatoire (états notés $x$, non gras). « Loi MULTIVARIÉE » = plus d'une variable aléatoire (états notés $\mathbf x$, en gras).*

### 2.2 Le cas discret

$$\boxed{\;P(X=x_i,\ Y=y_j)=\frac{n_{ij}}{N}\;}$$

où $n_{ij}$ est le nombre d'événements d'états $x_i$ et $y_j$, et $N$ le nombre total. C'est la **probabilité JOINTE** — la probabilité de l'**intersection** : $P(X=x_i\cap Y=y_j)$.

⚠️ L'espace cible de la probabilité jointe est le **PRODUIT CARTÉSIEN** des espaces cibles individuels.

**Exemple 6.2 — la table à cinq colonnes et trois lignes.** Avec $c_i=\sum_{j=1}^{3}n_{ij}$ (somme de la colonne $i$) et $r_j=\sum_{i=1}^{5}n_{ij}$ (somme de la ligne $j$) :

| Quantité | Formule | Lecture |
|---|---|---|
| **Marginale** de $X$ | $P(X=x_i)=\dfrac{c_i}{N}=\sum_{j=1}^{3}\dfrac{n_{ij}}{N}$ | La **somme d'une COLONNE** |
| **Marginale** de $Y$ | $P(Y=y_j)=\dfrac{r_j}{N}=\sum_{i=1}^{5}\dfrac{n_{ij}}{N}$ | La **somme d'une LIGNE** |
| **Conditionnelle** | $P(Y=y_j\mid X=x_i)=\dfrac{n_{ij}}{c_i}$ | La **fraction d'une colonne** dans une cellule |

Et la convention de normalisation : $\sum_{i=1}^{5}P(X=x_i)=1$ et $\sum_{j=1}^{3}P(Y=y_j)=1$.

**Les notations paresseuses** (le livre les qualifie ainsi) : $p(x,y)$ pour la jointe, $p(x)$ pour la marginale, $p(y\mid x)$ pour la conditionnelle, et $X\sim p(x)$ pour « $X$ suit la loi $p(x)$ ».

### 2.3 Le cas continu

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.1 (Densité de probabilité).</span>

Une fonction $f:\mathbb R^D\to\mathbb R$ est une **densité de probabilité** (*pdf*) si

1. $\forall x\in\mathbb R^D:\ f(x)\geqslant0$
2. Son intégrale existe et $\displaystyle\int_{\mathbb R^D}f(x)\,dx=1$

</div>

**L'association avec une variable aléatoire :**

$$\boxed{\;P(a\leqslant X\leqslant b)=\int_a^b f(x)\,dx\;}$$

C'est la **LOI** de $X$.

> ⚠️ **La conséquence la plus contre-intuitive.** *« Contrairement aux variables aléatoires discrètes, la probabilité qu'une variable aléatoire CONTINUE prenne une valeur particulière, $P(X=x)$, est **ZÉRO**. C'est comme spécifier un intervalle avec $a=b$. »* ($\{x\}$ est un ensemble de **mesure nulle**.)

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.2 (Fonction de répartition).</span>

Pour $X$ à états $x\in\mathbb R^D$ :

$$F_X(x)=P(X_1\leqslant x_1,\dots,X_D\leqslant x_D)=\int_{-\infty}^{x_1}\!\!\cdots\int_{-\infty}^{x_D}f(z_1,\dots,z_D)\,dz_1\cdots dz_D$$

</div>

> ⚠️ **Deux concepts distincts à ne pas confondre.** (i) La **densité** $f(x)$ : une fonction non négative d'intégrale 1. (ii) La **LOI** de $X$ : l'**association** de la variable aléatoire $X$ à la densité $f(x)$. *« Il existe des cdf qui n'ont pas de pdf correspondante. »*

### 2.4 Le contraste discret / continu — Exemple 6.3

**Cas discret.** $Z$ uniforme sur trois états $\{-1{,}1;\ 0{,}3;\ 1{,}5\}$ : chaque état a probabilité $\tfrac13$. **Chaque valeur est dans $[0,1]$**.

**Cas continu.** $X$ uniforme sur $0{,}9\leqslant X\leqslant1{,}6$, un intervalle de **longueur $0{,}7$**. La densité vaut donc $1/0{,}7\approx1{,}43$ :

$$\int_{0{,}9}^{1{,}6}p(x)\,dx=1$$

> ⚠️ **LA DIFFÉRENCE ESSENTIELLE.** *« Pour les variables aléatoires discrètes, la probabilité de chaque état doit être dans $[0,1]$. Cependant, pour les variables continues, la normalisation **N'IMPLIQUE PAS** que la valeur de la densité soit $\leqslant1$ pour toute valeur. »* **Une densité peut dépasser 1.**

> ⚠️ **Une subtilité sur les états discrets.** *« Les états $z_1,\dots,z_d$ n'ont en principe **aucune structure** : il n'y a généralement aucun moyen de les comparer — par exemple $z_1=$ rouge, $z_2=$ vert, $z_3=$ bleu. »* Mais en apprentissage automatique ils prennent souvent des **valeurs numériques**, ce qui permet de considérer des **espérances**.

## 🔴 Concept 3 — Somme, produit et Bayes (§6.3)

> **L'affirmation centrale.** *« Une fois les lois de probabilité définies, il n'y a que **DEUX RÈGLES FONDAMENTALES** : la règle de la somme et la règle du produit. »*

### 3.1 La règle de la somme (marginalisation)

$$\boxed{\;p(x)=\begin{cases}\displaystyle\sum_{y\in\mathcal Y}p(x,y)&\text{si } y \text{ est discret}\\[8pt]\displaystyle\int_{\mathcal Y}p(x,y)\,dy&\text{si } y \text{ est continu}\end{cases}\;}$$

On **« somme » ou « intègre »** l'ensemble des états de $Y$. C'est la **PROPRIÉTÉ DE MARGINALISATION** : elle **relie la loi jointe à une loi marginale**.

En dimension supérieure, avec $x=[x_1,\dots,x_D]^\top$ :

$$p(x_i)=\int p(x_1,\dots,x_D)\,dx_{\setminus i}$$

où $\setminus i$ se lit « **tous sauf $i$** ».

> ⚠️ **Le coût algorithmique.** *« Beaucoup des défis computationnels de la modélisation probabiliste viennent de l'application de la règle de la somme. Quand il y a beaucoup de variables, ou des variables discrètes à nombreux états, la règle de la somme se ramène à une **SOMME ou INTÉGRALE DE GRANDE DIMENSION** — ce qui est **généralement difficile**, au sens où il **n'existe pas d'algorithme polynomial connu** pour les calculer exactement. »*

### 3.2 La règle du produit

$$\boxed{\;p(x,y)=p(y\mid x)\,p(x)=p(x\mid y)\,p(y)\;}$$

> **L'interprétation.** *« Toute loi jointe de deux variables aléatoires peut être **FACTORISÉE** en produit de deux autres lois : la **marginale de la première** et la **conditionnelle de la seconde sachant la première**. »* L'ordre étant arbitraire, les deux factorisations sont valables.

### 3.3 Le théorème de Bayes

$$\boxed{\;\underbrace{p(x\mid y)}_{\text{A POSTERIORI}}=\frac{\overbrace{p(y\mid x)}^{\text{VRAISEMBLANCE}}\ \overbrace{p(x)}^{\text{A PRIORI}}}{\underbrace{p(y)}_{\text{ÉVIDENCE}}}\;}$$

**Les quatre termes, définis par le livre :**

| Terme | Rôle |
|---|---|
| **A priori** $p(x)$ | *« Encapsule notre connaissance a priori subjective de la variable latente $x$ **AVANT d'observer toute donnée**. »* *« Il est critique de s'assurer que l'a priori a une densité **NON NULLE sur tous les $x$ plausibles**, même s'ils sont très rares. »* |
| **Vraisemblance** $p(y\mid x)$ | Décrit comment $x$ et $y$ sont **reliés**. *« La vraisemblance **n'est PAS une loi en $x$**, seulement en $y$. On l'appelle "vraisemblance de $x$ (sachant $y$)" ou "probabilité de $y$ sachant $x$", **mais JAMAIS la vraisemblance de $y$** (MacKay, 2003). »* Aussi appelée le **modèle de mesure** |
| **A posteriori** $p(x\mid y)$ | *« La quantité d'intérêt en statistique bayésienne, car elle exprime exactement ce qu'on veut : **ce qu'on sait de $x$ APRÈS avoir observé $y$**. »* |
| **Vraisemblance marginale / évidence** $p(y)$ | $$p(y):=\int p(y\mid x)p(x)\,dx=\mathbb E_X\big[p(y\mid x)\big]$$ |

**Trois faits sur l'évidence :**

- Elle est **indépendante de $x$** et assure que l'a posteriori est **normalisé**.
- Elle s'interprète comme la **vraisemblance ESPÉRÉE**, l'espérance étant prise **par rapport à l'a priori**.
- Elle joue un rôle important dans la **SÉLECTION DE MODÈLE bayésienne** (§8.6). *« Du fait de l'intégration, l'évidence est souvent **DIFFICILE À CALCULER**. »*

> **L'autre nom du théorème.** *« Bayes permet d'INVERSER la relation entre $x$ et $y$ donnée par la vraisemblance. C'est pourquoi on l'appelle parfois l'**INVERSE PROBABILISTE**. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi garder l'a posteriori ENTIER.</span>

⚠️ *« Se concentrer sur une statistique de l'a posteriori (par exemple son maximum) conduit à une **PERTE D'INFORMATION**. »* Le livre donne un exemple concret : en **apprentissage par renforcement fondé sur un modèle**, Deisenroth *et al.* (2015) montrent qu'utiliser **la loi a posteriori COMPLÈTE** des fonctions de transition plausibles conduit à un apprentissage **très rapide** (efficace en données), alors que se concentrer sur le maximum mène à des **échecs systématiques**.

</div>

## 🔴 Concept 4 — Statistiques résumées et indépendance (§6.4)

### 4.1 Espérance, moyenne, médiane, mode

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.3 (Espérance).</span>

L'espérance d'une fonction $g:\mathbb R\to\mathbb R$ d'une variable aléatoire **continue** $X\sim p(x)$ :

$$\mathbb E_X[g(x)]=\int_{\mathcal X}g(x)p(x)\,dx$$

et pour une variable **discrète** :

$$\mathbb E_X[g(x)]=\sum_{x\in\mathcal X}g(x)p(x)$$

</div>

*L'espérance d'une fonction d'une variable aléatoire est parfois appelée la **loi du statisticien inconscient*** (*law of the unconscious statistician*).

**Cas multivarié** : élément par élément, $\mathbb E_X[g(x)]=\big[\mathbb E_{X_1}[g(x_1)],\dots,\mathbb E_{X_D}[g(x_D)]\big]^\top\in\mathbb R^D$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.4 (Moyenne).</span>

C'est le **cas particulier** de l'espérance obtenu en choisissant $g=$ l'**identité** :

$$\mathbb E_X[x]=\big[\mathbb E_{X_1}[x_1],\dots,\mathbb E_{X_D}[x_D]\big]^\top\in\mathbb R^D$$

</div>

> **L'espérance est un OPÉRATEUR LINÉAIRE.** Pour $f(x)=ag(x)+bh(x)$ :
>
> $$\boxed{\;\mathbb E_X[f(x)]=a\,\mathbb E_X[g(x)]+b\,\mathbb E_X[h(x)]\;}$$

**Les deux autres notions de « moyenne » :**

| Notion | Définition | Propriétés |
|---|---|---|
| **MÉDIANE** | La valeur « **du milieu** » : 50 % des valeurs au-dessus, 50 % en dessous. En continu : la valeur où la **cdf vaut $0{,}5$** | Pour les lois **asymétriques ou à queues longues**, elle donne une valeur typique **plus proche de l'intuition humaine** que la moyenne. Elle est **PLUS ROBUSTE AUX VALEURS EXTRÊMES**. Sa généralisation en dimension $>1$ est **non triviale** — il n'y a pas de façon évidente de « trier » |
| **MODE** | La valeur **la plus fréquente**. En continu : un **PIC** de la densité $p(x)$ | Une densité peut avoir **plusieurs modes** ; en grande dimension il peut y en avoir **énormément**, ce qui rend leur recherche **computationnellement difficile** |

**Exemple 6.4 — le mélange bimodal.**

$$p(x)=0{,}4\,\mathcal N\!\left(x\ \middle|\ \begin{bmatrix}10\\2\end{bmatrix},\begin{bmatrix}1&0\\0&1\end{bmatrix}\right)+0{,}6\,\mathcal N\!\left(x\ \middle|\ \begin{bmatrix}0\\0\end{bmatrix},\begin{bmatrix}8{,}4&2{,}0\\2{,}0&1{,}7\end{bmatrix}\right)$$

> ⚠️ **Deux leçons.** (i) *« La loi est **BIMODALE** (deux modes), mais **l'une des marginales est UNIMODALE** »*. (ii) *« Il est tentant de définir la médiane bidimensionnelle comme la concaténation des médianes de chaque dimension, mais le fait qu'on **ne puisse pas définir d'ORDRE** sur des points bidimensionnels rend cela difficile. »* Le livre précise : il y a **plus d'une façon** de définir la relation $<$ telle que $[3,0]^\top<[2,3]^\top$.

<details><summary>Contrôle : la moyenne du mélange</summary>

$0{,}4\cdot[10,2]^\top+0{,}6\cdot[0,0]^\top=[4{,}0\ ;\ 0{,}8]^\top$ La moyenne d'un mélange est la **somme pondérée des moyennes** — même quand la loi est bimodale et que la moyenne ne tombe **près d'aucun mode**.

</details>

### 4.2 Covariance, variance, corrélation

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.5 (Covariance, univariée).</span>

$$\operatorname{Cov}_{X,Y}[x,y]:=\mathbb E_{X,Y}\big[(x-\mathbb E_X[x])(y-\mathbb E_Y[y])\big]$$

Par linéarité de l'espérance, elle se réécrit

$$\boxed{\;\operatorname{Cov}[x,y]=\mathbb E[xy]-\mathbb E[x]\mathbb E[y]\;}$$

</div>

**Vocabulaire.** $\operatorname{Cov}[x,x]=\mathbb V_X[x]$ est la **VARIANCE** ; sa racine carrée est l'**ÉCART-TYPE** $\sigma(x)$. Pour des variables multivariées, $\operatorname{Cov}[x,y]$ est parfois appelée **COVARIANCE CROISÉE**.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.6 (Covariance, multivariée).</span>

Pour $x\in\mathbb R^D$ et $y\in\mathbb R^E$ :

$$\operatorname{Cov}[x,y]=\mathbb E[xy^\top]-\mathbb E[x]\mathbb E[y]^\top=\operatorname{Cov}[y,x]^\top\in\mathbb R^{D\times E}$$

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.7 (Variance).</span>

$$\boxed{\;\mathbb V_X[x]=\operatorname{Cov}_X[x,x]=\mathbb E_X[(x-\mu)(x-\mu)^\top]=\mathbb E_X[xx^\top]-\mathbb E_X[x]\mathbb E_X[x]^\top\;}$$

La matrice $D\times D$ résultante est la **MATRICE DE COVARIANCE**.

</div>

**Ses trois propriétés :**

- Elle est **SYMÉTRIQUE** et **semi-définie positive**.
- Sur sa **diagonale** : les **variances des marginales**.
- Hors diagonale : les **covariances croisées** $\operatorname{Cov}[x_i,x_j]$ pour $i\neq j$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.8 (Corrélation).</span>

$$\boxed{\;\operatorname{corr}[x,y]=\frac{\operatorname{Cov}[x,y]}{\sqrt{\mathbb V[x]\,\mathbb V[y]}}\in[-1,1]\;}$$

</div>

> *« La **matrice de corrélation** est la matrice de covariance des variables **STANDARDISÉES** $x/\sigma(x)$. »* Corrélation **positive** : quand $x$ croît, $y$ est attendu croissant. Corrélation **négative** : quand $x$ croît, $y$ décroît.

### 4.3 Statistiques empiriques

> **Vocabulaire.** Les définitions du §6.4.1 sont aussi appelées la **moyenne et la covariance de POPULATION**, car elles font référence aux vraies statistiques de la population. En apprentissage, on part d'**observations empiriques**.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.9 (Moyenne et covariance empiriques).</span>

$$\boxed{\;\bar x:=\frac1N\sum_{n=1}^{N}x_n\qquad\qquad\Sigma:=\frac1N\sum_{n=1}^{N}(x_n-\bar x)(x_n-\bar x)^\top\;}$$

</div>

> ⚠️ **Le biais.** *« Dans tout le livre, nous utilisons la covariance empirique, qui est une estimation **BIAISÉE**. La version **non biaisée** (dite corrigée) a le facteur **$N-1$** au dénominateur au lieu de $N$. »*

**Les deux étapes conceptuelles** pour passer de la population à l'empirique : (1) utiliser le fait qu'on a un jeu **fini** ($N$) pour construire une statistique fonction de $N$ variables aléatoires identiques ; (2) **observer** les réalisations $x_1,\dots,x_N$ et appliquer la statistique empirique.

### 4.4 Les trois expressions de la variance

**Expression 1 — la définition** (espérance de l'écart au carré) :

$$\mathbb V_X[x]:=\mathbb E_X[(x-\mu)^2]$$

⚠️ Elle exige un **algorithme à DEUX PASSES** : une passe pour calculer $\mu$, une seconde pour la variance.

**Expression 2 — la formule brute** (*raw-score formula*) :

$$\boxed{\;\mathbb V_X[x]=\mathbb E_X[x^2]-\big(\mathbb E_X[x]\big)^2\;}$$

> **Le mnémonique** : *« **la moyenne du carré MOINS le carré de la moyenne** »*. Elle se calcule en **UNE SEULE PASSE** (on accumule $x_i$ et $x_i^2$ simultanément).

> ⚠️ **Le prix à payer.** *« Malheureusement, implémentée de cette façon, elle peut être **NUMÉRIQUEMENT INSTABLE**. »* Le livre précise : *« si les deux termes sont énormes et approximativement égaux, on peut souffrir d'une **perte inutile de précision** en arithmétique flottante. »* Elle reste utile en théorie, par exemple pour dériver la **décomposition biais-variance**.

**Expression 3 — la somme des différences par paires :**

$$\boxed{\;\frac{1}{N^2}\sum_{i,j=1}^{N}(x_i-x_j)^2=2\left[\frac1N\sum_{i=1}^{N}x_i^2-\left(\frac1N\sum_{i=1}^{N}x_i\right)^2\right]\;}$$

⚠️ C'est **DEUX FOIS** l'expression brute.

> **La lecture géométrique.** *« On peut exprimer la somme des distances par paires (il y en a $N^2$) comme une somme d'écarts à la moyenne (il y en a $N$). Géométriquement, cela signifie qu'il y a une **ÉQUIVALENCE entre les distances par paires et les distances au CENTRE** de l'ensemble de points. »* Du point de vue computationnel : en calculant la moyenne ($N$ termes) puis la variance ($N$ termes), on obtient une expression qui en compte $N^2$.

### 4.5 Sommes et transformations

**Sommes de variables aléatoires** ($x,y\in\mathbb R^D$) :

$$\mathbb E[x+y]=\mathbb E[x]+\mathbb E[y]\qquad\qquad\mathbb E[x-y]=\mathbb E[x]-\mathbb E[y]$$

$$\boxed{\;\mathbb V[x+y]=\mathbb V[x]+\mathbb V[y]+\operatorname{Cov}[x,y]+\operatorname{Cov}[y,x]\;}$$

$$\boxed{\;\mathbb V[x-y]=\mathbb V[x]+\mathbb V[y]-\operatorname{Cov}[x,y]-\operatorname{Cov}[y,x]\;}$$

⚠️ **Même pour une DIFFÉRENCE, les variances S'AJOUTENT** ; ce sont les covariances qui changent de signe.

**Transformation affine** $y=Ax+b$, avec $X$ de moyenne $\mu$ et covariance $\Sigma$ :

$$\boxed{\;\mathbb E_Y[y]=A\mu+b\qquad\qquad\mathbb V_Y[y]=A\Sigma A^\top\qquad\qquad\operatorname{Cov}[x,y]=\Sigma A^\top\;}$$

⚠️ **Le vecteur $b$ DISPARAÎT de la variance** : une translation ne change pas la dispersion.

<details class="details--riche">
<summary>

La dérivation de $\operatorname{Cov}[x,y]=\Sigma A^\top$

</summary>

$\operatorname{Cov}[x,y]=\mathbb E[x(Ax+b)^\top]-\mathbb E[x]\mathbb E[Ax+b]^\top$ $=\mathbb E[x]b^\top+\mathbb E[xx^\top]A^\top-\mu b^\top-\mu\mu^\top A^\top$ $=\underbrace{\mu b^\top-\mu b^\top}_{=0}+\big(\mathbb E[xx^\top]-\mu\mu^\top\big)A^\top=\Sigma A^\top$

où l'on a utilisé $\Sigma=\mathbb E[xx^\top]-\mu\mu^\top$ (définition 6.7).

</details>

### 4.6 Indépendance

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.10 (Indépendance).</span>

$X$ et $Y$ sont **statistiquement indépendantes** si et seulement si

$$\boxed{\;p(x,y)=p(x)p(y)\;}$$

</div>

> **L'intuition.** *« $X$ et $Y$ sont indépendantes si la valeur de $y$ (une fois connue) **n'ajoute aucune information supplémentaire** sur $x$ (et réciproquement). »*

**Les quatre conséquences :**

$$p(y\mid x)=p(y)\qquad p(x\mid y)=p(x)\qquad \mathbb V_{X,Y}[x+y]=\mathbb V_X[x]+\mathbb V_Y[y]\qquad\operatorname{Cov}_{X,Y}[x,y]=0$$

> ⚠️ **LA RÉCIPROQUE EST FAUSSE.** *« Deux variables aléatoires peuvent avoir une covariance NULLE sans être statistiquement indépendantes. La covariance mesure **UNIQUEMENT LA DÉPENDANCE LINÉAIRE**. Des variables **non linéairement dépendantes** peuvent avoir une covariance nulle. »*

**Exemple 6.5 — le contre-exemple.** Soit $X$ de moyenne nulle ($\mathbb E_X[x]=0$) avec aussi $\mathbb E_X[x^3]=0$. Posons $y=x^2$ — donc $Y$ **DÉPEND** de $X$. Pourtant :

$$\operatorname{Cov}[x,y]=\mathbb E[xy]-\mathbb E[x]\mathbb E[y]=\mathbb E[x^3]-0=\boxed{0}$$

**i.i.d.** *« Indépendantes et identiquement distribuées »* : pour plus de deux variables, « **indépendantes** » signifie **MUTUELLEMENT indépendantes** — **tous les sous-ensembles** sont indépendants. « **Identiquement distribuées** » signifie que toutes viennent de **la même loi**.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.11 (Indépendance conditionnelle).</span>

$X$ et $Y$ sont **conditionnellement indépendantes sachant $Z$** si et seulement si

$$\boxed{\;p(x,y\mid z)=p(x\mid z)\,p(y\mid z)\quad\text{POUR TOUT } z\in\mathcal Z\;}$$

Noté $X\perp\!\!\!\perp Y\mid Z$.

</div>

⚠️ La relation doit tenir **pour CHAQUE valeur de $z$**. L'interprétation : *« sachant $z$, la loi de $x$ et $y$ **SE FACTORISE** »*.

**La forme équivalente**, via la règle du produit $p(x,y\mid z)=p(x\mid y,z)p(y\mid z)$ :

$$\boxed{\;p(x\mid y,z)=p(x\mid z)\;}$$

*« Sachant qu'on connaît $z$, la connaissance de $y$ **ne change pas notre connaissance de $x$**. »* Et l'indépendance simple est le cas particulier $X\perp\!\!\!\perp Y\mid\varnothing$.

### 4.7 La géométrie des variables aléatoires

**Le point de départ** : pour $X,Y$ **non corrélées**, $\mathbb V[x+y]=\mathbb V[x]+\mathbb V[y]$. *« Comme les variances se mesurent en unités au carré, cela ressemble beaucoup au **THÉORÈME DE PYTHAGORE** $c^2=a^2+b^2$. »*

**La construction.** Pour des variables **centrées** $X,Y$, on définit

$$\boxed{\;\langle X,Y\rangle:=\operatorname{Cov}[x,y]\;}$$

qui est bien un **produit intérieur** : symétrique, défini positif, linéaire en chaque argument. En effet $\operatorname{Cov}[x,x]=0\iff x=0$ et $\operatorname{Cov}[\alpha x+z,y]=\alpha\operatorname{Cov}[x,y]+\operatorname{Cov}[z,y]$.

**Le dictionnaire géométrique complet :**

| Notion géométrique | Traduction probabiliste |
|---|---|
| Produit intérieur $\langle X,Y\rangle$ | **Covariance** $\operatorname{Cov}[x,y]$ |
| **Longueur** $\lVert X\rVert=\sqrt{\langle X,X\rangle}$ | **ÉCART-TYPE** $\sigma[x]=\sqrt{\mathbb V[x]}$ |
| Longueur nulle | Variable **déterministe** |
| Longueur grande | Variable **plus incertaine** |
| $\cos\theta=\dfrac{\langle X,Y\rangle}{\lVert X\rVert\lVert Y\rVert}$ | La **CORRÉLATION** |
| **Orthogonalité** $X\perp Y$ | $\operatorname{Cov}[x,y]=0$, c'est-à-dire **NON CORRÉLÉES** |
| Théorème de Pythagore | $\mathbb V[x+y]=\mathbb V[x]+\mathbb V[y]$ |

> **La formule à retenir.** *« On peut penser à la CORRÉLATION comme au **COSINUS DE L'ANGLE** entre deux variables aléatoires quand on les considère géométriquement. »*

## 🔴 Concept 5 — La loi gaussienne (§6.5)

### 5.1 Les deux densités

> **La motivation.** *« La loi la plus étudiée pour les variables continues, aussi appelée loi NORMALE. Son importance vient du fait qu'elle a **beaucoup de propriétés computationnellement commodes**. »*

$$\boxed{\;p(x\mid\mu,\sigma^2)=\frac{1}{\sqrt{2\pi\sigma^2}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)\;}$$

$$\boxed{\;p(x\mid\mu,\Sigma)=(2\pi)^{-\frac D2}\,|\Sigma|^{-\frac12}\exp\left(-\frac12(x-\mu)^\top\Sigma^{-1}(x-\mu)\right)\;}$$

Notation : $p(x)=\mathcal N(x\mid\mu,\Sigma)$ ou $X\sim\mathcal N(\mu,\Sigma)$. Le cas $\mu=0$, $\Sigma=I$ est la **LOI NORMALE STANDARD**.

> **L'origine naturelle.** *« La gaussienne apparaît naturellement quand on considère des **SOMMES de variables aléatoires i.i.d.** — c'est le **THÉORÈME CENTRAL LIMITE**. »*

**Où elle sert :** vraisemblance et a priori en **régression linéaire** (ch. 9), **mélanges gaussiens** pour l'estimation de densité (ch. 11), **processus gaussiens**, **inférence variationnelle**, **apprentissage par renforcement**, **filtre de Kalman** (traitement du signal), **régulateur linéaire quadratique** (contrôle), **tests d'hypothèses** (statistique).

> **L'avantage décisif.** *« Un avantage majeur de la modélisation par variables gaussiennes est que **les transformations de variables (§6.7) ne sont souvent PAS NÉCESSAIRES**. Puisque la gaussienne est entièrement spécifiée par sa moyenne et sa covariance, on peut souvent obtenir la loi transformée **en appliquant la transformation à la moyenne et à la covariance**. »*

### 5.2 Marginales et conditionnelles — les formules-clés

Pour la loi jointe des états concaténés $[x^\top\ y^\top]^\top$ :

$$p(x,y)=\mathcal N\!\left(\begin{bmatrix}\mu_x\\\mu_y\end{bmatrix},\ \begin{bmatrix}\Sigma_{xx}&\Sigma_{xy}\\\Sigma_{yx}&\Sigma_{yy}\end{bmatrix}\right)$$

**LA MARGINALE** — par la règle de la somme :

$$\boxed{\;p(x)=\int p(x,y)\,dy=\mathcal N\big(x\mid\mu_x,\ \Sigma_{xx}\big)\;}$$

> **L'intuition.** *« En regardant la loi jointe, on **IGNORE (c'est-à-dire on intègre) tout ce qui ne nous intéresse pas**. »* Il suffit de **prendre le bloc correspondant**.

**LA CONDITIONNELLE** — elle est **aussi gaussienne** :

$$\boxed{\;p(x\mid y)=\mathcal N\big(\mu_{x\mid y},\ \Sigma_{x\mid y}\big)\;}$$

$$\boxed{\;\mu_{x\mid y}=\mu_x+\Sigma_{xy}\Sigma_{yy}^{-1}(y-\mu_y)\;}$$

$$\boxed{\;\Sigma_{x\mid y}=\Sigma_{xx}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx}\;}$$

> ⚠️ **Le point qui piège.** *« Dans le calcul de la moyenne, **la valeur $y$ est une OBSERVATION et n'est plus aléatoire**. »* Et : la variance conditionnelle **ne dépend PAS de $y$** — conditionner **réduit toujours** la variance de la même quantité.

> **Où les conditionnelles gaussiennes apparaissent.**
>
> - Le **FILTRE DE KALMAN** (Kalman, 1960), *« l'un des algorithmes les plus centraux pour l'estimation d'état en traitement du signal, **ne fait rien d'autre que calculer des conditionnelles gaussiennes de lois jointes** »*.
> - Les **PROCESSUS GAUSSIENS** (Rasmussen & Williams, 2006) — une implémentation pratique d'une **loi sur les fonctions**.
> - Les **modèles gaussiens linéaires latents**, dont l'**ACP probabiliste** (Tipping & Bishop, 1999), traitée au §10.7.

**Exemple 6.6 — le calcul complet.**

$$p(x_1,x_2)=\mathcal N\!\left(\begin{bmatrix}0\\2\end{bmatrix},\ \begin{bmatrix}0{,}3&-1\\-1&5\end{bmatrix}\right)$$

**Conditionnelle** en $x_2=-1$ :

$$\mu_{x_1\mid x_2=-1}=0+(-1)\cdot0{,}2\cdot(-1-2)=0{,}6$$

$$\sigma^2_{x_1\mid x_2=-1}=0{,}3-(-1)\cdot0{,}2\cdot(-1)=0{,}1$$

$$\boxed{\;p(x_1\mid x_2=-1)=\mathcal N(0{,}6\ ;\ 0{,}1)\;}$$

**Marginale** :

$$\boxed{\;p(x_1)=\mathcal N(0\ ;\ 0{,}3)\;}$$

<details><summary>Vérification pas à pas</summary>

$\Sigma_{yy}^{-1}=1/5=0{,}2$ et $\Sigma_{xy}=-1$, donc $\Sigma_{xy}\Sigma_{yy}^{-1}=-0{,}2$.

Moyenne : $0+(-0{,}2)\cdot(-1-2)=(-0{,}2)\cdot(-3)=0{,}6$

Variance : $0{,}3-(-0{,}2)\cdot(-1)=0{,}3-0{,}2=0{,}1$

⚠️ **Deux effets remarquables** : (i) la moyenne s'est **déplacée** de $0$ à $0{,}6$ — connaître $x_2$ informe sur $x_1$, car ils sont **corrélés** ; (ii) la variance a **CHUTÉ** de $0{,}3$ à $0{,}1$ — conditionner **réduit toujours** l'incertitude quand la corrélation est non nulle.

</details>

### 5.3 Produit, sommes et transformations

**PRODUIT de deux densités gaussiennes.** Le produit $\mathcal N(x\mid a,A)\,\mathcal N(x\mid b,B)$ est une gaussienne **MISE À L'ÉCHELLE** par un $c\in\mathbb R$, soit $c\,\mathcal N(x\mid c,C)$ avec

$$\boxed{\;C=(A^{-1}+B^{-1})^{-1}\qquad c=C(A^{-1}a+B^{-1}b)\qquad c=(2\pi)^{-\frac D2}|A+B|^{-\frac12}\exp(\cdots)\;}$$

⚠️ **Le produit de deux densités n'est PAS une densité** : il faut le facteur de normalisation $c$. C'est exactement ce qui se passe quand on multiplie **vraisemblance $\times$ a priori** dans Bayes (ch. 9).

**SOMME de gaussiennes INDÉPENDANTES :**

$$\boxed{\;p(x+y)=\mathcal N\big(\mu_x+\mu_y,\ \Sigma_x+\Sigma_y\big)\;}$$

**Exemple 6.7 — somme pondérée** (l'espérance étant linéaire) :

$$\boxed{\;p(ax+by)=\mathcal N\big(a\mu_x+b\mu_y,\ a^2\Sigma_x+b^2\Sigma_y\big)\;}$$

⚠️ Les coefficients entrent **AU CARRÉ** dans la variance.

> ⚠️ **La distinction cruciale.** *« Un cas utile au chapitre 11 est la **somme pondérée de DENSITÉS gaussiennes**. C'est **DIFFÉRENT** de la somme pondérée de **VARIABLES ALÉATOIRES** gaussiennes. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 6.12 (Mélange de deux gaussiennes univariées).</span>

Pour

$$p(x)=\alpha p_1(x)+(1-\alpha)p_2(x),\qquad0<\alpha<1$$

avec $(\mu_1,\sigma_1^2)\neq(\mu_2,\sigma_2^2)$ :

$$\boxed{\;\mathbb E[x]=\alpha\mu_1+(1-\alpha)\mu_2\;}$$

$$\boxed{\;\mathbb V[x]=\underbrace{\alpha\sigma_1^2+(1-\alpha)\sigma_2^2}_{\text{variance conditionnelle espérée}}+\underbrace{\alpha\mu_1^2+(1-\alpha)\mu_2^2-\big[\alpha\mu_1+(1-\alpha)\mu_2\big]^2}_{\text{variance de la moyenne conditionnelle}}\;}$$

</div>

> **La lecture.** L'expression est un exemple de la **FORMULE DE LA VARIANCE CONDITIONNELLE**, aussi appelée **LOI DE LA VARIANCE TOTALE** :
>
> $$\boxed{\;\mathbb V_X[x]=\mathbb E_Y\big[\mathbb V_X[x\mid y]\big]+\mathbb V_Y\big[\mathbb E_X[x\mid y]\big]\;}$$
>
> *« La variance (totale) de $X$ est la **variance conditionnelle ESPÉRÉE plus la VARIANCE de la moyenne conditionnelle**. »*

<details><summary>Contrôle du théorème 6.12 par intégration numérique</summary>

Avec $\alpha=0{,}4$, $(\mu_1,\sigma_1)=(10;1)$ et $(\mu_2,\sigma_2)=(0;2{,}9)$, intégration numérique de $\int x\,p(x)dx$ et $\int x^2p(x)dx$ sur $[-40,50]$ avec $400\,000$ points (règle du point milieu) :

| Quantité | Intégration numérique | Formule (6.81)/(6.82) |
|---|---|---|
| $\mathbb E[x]$ | $4{,}000000$ | $4{,}000000$ |
| $\mathbb V[x]$ | $29{,}446$ | $29{,}446$ |

⚠️ Noter que $\mathbb V[x]=29{,}45$ est **bien supérieure** aux deux variances composantes ($1$ et $8{,}41$) : c'est le **second terme**, l'écartement des moyennes, qui domine.

</details>

**TRANSFORMATIONS LINÉAIRES.** Pour $X\sim\mathcal N(\mu,\Sigma)$ et $y=Ax$ :

$$\boxed{\;p(y)=\mathcal N\big(y\mid A\mu,\ A\Sigma A^\top\big)\;}$$

> **La règle générale.** *« **TOUTE transformation linéaire/affine d'une variable aléatoire gaussienne est gaussienne.** »* Ajouter un vecteur constant **change la moyenne sans affecter la variance**.

**La transformation INVERSE.** Si $p(y)=\mathcal N(y\mid Ax,\Sigma)$ avec $A\in\mathbb R^{M\times N}$ de **rang plein**, $M\geqslant N$ : en général $A$ n'est pas inversible, on utilise l'approche de la **pseudo-inverse** — prémultiplier par $A^\top$ puis inverser $A^\top A$ (symétrique définie positive) :

$$y=Ax\iff(A^\top A)^{-1}A^\top y=x$$

$$\boxed{\;p(x)=\mathcal N\big(x\mid(A^\top A)^{-1}A^\top y,\ (A^\top A)^{-1}A^\top\Sigma A(A^\top A)^{-1}\big)\;}$$

### 5.4 Échantillonner une gaussienne multivariée

**Le protocole en trois étapes :**

**Étape 1.** Une source de **nombres pseudo-aléatoires** donnant un échantillon **uniforme sur $[0,1]$**.

**Étape 2.** Une transformation **non linéaire** — la **transformation de Box-Müller** (Devroye, 1986) — pour obtenir un échantillon d'une gaussienne **univariée**.

**Étape 3.** Assembler un vecteur de ces échantillons pour obtenir un échantillon de $\mathcal N(0,I)$.

**Pour une gaussienne générale**, on utilise la propriété des transformations linéaires : si $x\sim\mathcal N(0,I)$, alors

$$\boxed{\;y=Ax+\mu\sim\mathcal N(\mu,\Sigma)\quad\text{où } AA^\top=\Sigma\;}$$

> **Le choix commode de $A$** : la **DÉCOMPOSITION DE CHOLESKY** de $\Sigma$ (§4.3). Elle exige que la matrice soit **symétrique définie positive** — *« les matrices de covariance possèdent cette propriété »*.

## 🔴 Concept 6 — Conjugaison et famille exponentielle (§6.6)

### 6.1 Les trois desiderata

> **Ce qu'on veut d'une famille de lois en apprentissage automatique :**
>
> 1. Une **PROPRIÉTÉ DE CLÔTURE** en appliquant les règles de la probabilité (Bayes) : *« l'opération renvoie un objet **du même TYPE** »*.
> 2. **En collectant plus de données, on n'a PAS besoin de plus de paramètres** pour décrire la loi.
> 3. L'**estimation des paramètres** doit **bien se comporter**.

> **La réponse.** *« La classe de lois appelée **FAMILLE EXPONENTIELLE** fournit le **bon équilibre entre généralité** et propriétés favorables de calcul et d'inférence. »*

### 6.2 Les trois lois nommées

**Exemple 6.8 — la loi de BERNOULLI.** Pour une seule variable binaire $x\in\{0,1\}$, gouvernée par un paramètre continu $\mu\in[0,1]$ (la probabilité de $X=1$) :

$$\boxed{\;p(x\mid\mu)=\mu^x(1-\mu)^{1-x},\qquad\mathbb E[x]=\mu,\qquad\mathbb V[x]=\mu(1-\mu)\;}$$

> ⚠️ **L'astuce d'écriture.** *« Cette réécriture, où l'on utilise les variables booléennes comme $0$ ou $1$ numériques **exprimés dans les EXPOSANTS**, est un truc souvent utilisé dans les manuels d'apprentissage automatique. »* (Idem pour la multinomiale.)

**Exemple 6.9 — la loi BINOMIALE.** La généralisation à $N$ tirages : la probabilité d'observer $m$ occurrences de $X=1$ sur $N$ échantillons de Bernoulli de paramètre $\mu$ :

$$\boxed{\;p(m\mid N,\mu)=\binom Nm\mu^m(1-\mu)^{N-m},\qquad\mathbb E[m]=N\mu,\qquad\mathbb V[m]=N\mu(1-\mu)\;}$$

**Exemple 6.10 — la loi BÊTA.** Une loi sur une variable **continue** $\mu\in[0,1]$, *« souvent utilisée pour représenter la probabilité d'un événement binaire — par exemple le paramètre gouvernant une Bernoulli »*. Gouvernée par $\alpha>0$, $\beta>0$ :

$$\boxed{\;p(\mu\mid\alpha,\beta)=\frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}\mu^{\alpha-1}(1-\mu)^{\beta-1}\;}$$

$$\boxed{\;\mathbb E[\mu]=\frac{\alpha}{\alpha+\beta},\qquad\mathbb V[\mu]=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}\;}$$

avec la **fonction Gamma**

$$\Gamma(t):=\int_0^\infty x^{t-1}\exp(-x)\,dx,\quad t>0,\qquad\Gamma(t+1)=t\,\Gamma(t)$$

⚠️ La fraction de fonctions Gamma **normalise** la loi bêta.

> **L'intuition sur les paramètres.** *« $\alpha$ déplace la masse de probabilité **vers 1**, tandis que $\beta$ la déplace **vers 0**. »*

**Les quatre cas particuliers :**

| Condition | Forme |
|---|---|
| $\alpha=1=\beta$ | La loi **UNIFORME** $\mathcal U[0,1]$ |
| $\alpha,\beta<1$ | **BIMODALE**, avec des pics en $0$ et en $1$ |
| $\alpha,\beta>1$ | **UNIMODALE** |
| $\alpha,\beta>1$ **et** $\alpha=\beta$ | Unimodale, **symétrique**, centrée : le mode/moyenne est en $\tfrac12$ |

<details><summary>Contrôles numériques des trois lois</summary>

**Bêta** : $(\alpha,\beta)=(2,3)$ donne $\mathbb E=0{,}4$ et $\mathbb V=0{,}04$ ; $(5,1)$ donne $\mathbb E=0{,}8333$ et $\mathbb V=0{,}019841$ ; $(0{,}5;0{,}5)$ donne $\mathbb E=0{,}5$ et $\mathbb V=0{,}125$ (cas bimodal, variance maximale)

**Bernoulli** avec $\mu=0{,}3$ : $\mathbb E=0{,}3$, $\mathbb V=0{,}21$

**Binomiale** avec $N=15$, $\mu=0{,}3$ : $\mathbb E=4{,}5$, $\mathbb V=3{,}15$, et $\sum_{m=0}^{15}\binom{15}{m}0{,}3^m0{,}7^{15-m}=1{,}0$ exactement

</details>

### 6.3 La conjugaison

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 6.13 (A priori conjugué).</span>

*« Un a priori est **CONJUGUÉ** pour la fonction de vraisemblance si l'**A POSTERIORI est de la MÊME FORME/DU MÊME TYPE** que l'a priori. »*

</div>

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi c'est décisif.</span>

*« La conjugaison est particulièrement commode car on peut calculer **ALGÉBRIQUEMENT** notre loi a posteriori **en METTANT À JOUR LES PARAMÈTRES** de la loi a priori. »*

</div>

**Les deux difficultés que cela résout :** (i) *« l'a priori devrait encapsuler notre connaissance avant de voir les données — c'est souvent difficile à décrire »* ; (ii) *« il est souvent impossible de calculer la loi a posteriori **ANALYTIQUEMENT** »*.

**Exemple 6.11 — la conjugaison BÊTA-BINOMIALE.** Avec $x\sim\operatorname{Bin}(N,\mu)$ et un a priori $\mu\sim\operatorname{Beta}(\alpha,\beta)$, observant $x=h$ (h faces sur N lancers) :

$$p(\mu\mid x=h,N,\alpha,\beta)\propto p(x\mid N,\mu)p(\mu\mid\alpha,\beta)\propto\mu^h(1-\mu)^{N-h}\ \mu^{\alpha-1}(1-\mu)^{\beta-1}$$

$$=\mu^{h+\alpha-1}(1-\mu)^{(N-h)+\beta-1}$$

$$\boxed{\;\propto\operatorname{Beta}\big(h+\alpha,\ N-h+\beta\big)\;}$$

⚠️ **La mise à jour est une simple ADDITION** : $\alpha\leftarrow\alpha+h$ (le nombre de succès) et $\beta\leftarrow\beta+(N-h)$ (le nombre d'échecs).

**Exemple 6.12 — la conjugaison BÊTA-BERNOULLI.** Avec $p(x\mid\theta)=\theta^x(1-\theta)^{1-x}$ et $p(\theta\mid\alpha,\beta)\propto\theta^{\alpha-1}(1-\theta)^{\beta-1}$ :

$$p(\theta\mid x,\alpha,\beta)\propto\theta^{x}(1-\theta)^{1-x}\theta^{\alpha-1}(1-\theta)^{\beta-1}=\theta^{\alpha+x-1}(1-\theta)^{\beta+(1-x)-1}$$

$$\boxed{\;\propto p\big(\theta\mid\alpha+x,\ \beta+(1-x)\big)\;}$$

**Le tableau 6.2 — les couples conjugués standard :**

| Vraisemblance | A priori conjugué | A posteriori |
|---|---|---|
| **Bernoulli** | **Bêta** | Bêta |
| **Binomiale** | **Bêta** | Bêta |
| **Gaussienne** (univariée) | **Gaussienne / Gamma inverse** | Gaussienne / Gamma inverse |
| **Gaussienne** (multivariée) | **Gaussienne / Wishart inverse** | Gaussienne / Wishart inverse |
| **Multinomiale** | **Dirichlet** | Dirichlet |

> ⚠️ **Les précisions du livre.** (i) La gaussienne apparaît **deux fois** car il faut distinguer univarié et multivarié. (ii) Dans le cas **scalaire**, la **Gamma inverse** est conjuguée pour la **variance** ; dans le cas **multivarié**, la **Wishart inverse** pour la **matrice de covariance**. (iii) De façon équivalente : *« l'a priori **Gamma** est conjugué pour la **PRÉCISION** (variance inverse) dans la vraisemblance gaussienne univariée, et l'a priori **Wishart** pour la **matrice de précision** (covariance inverse) dans le cas multivarié. »*

### 6.4 Statistiques exhaustives

> **L'idée de Sir Ronald Fisher.** *« Il existe des statistiques qui contiennent **TOUTE l'information disponible** qui peut être inférée des données correspondant à la loi considérée. Autrement dit, les **STATISTIQUES EXHAUSTIVES** portent toute l'information nécessaire pour faire de l'inférence sur la population. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 6.14 (FISHER-NEYMAN).</span>

Soit $X$ de densité $p(x\mid\theta)$. Les statistiques $\phi(x)$ sont **exhaustives** pour $\theta$ **si et seulement si** $p(x\mid\theta)$ peut s'écrire

$$\boxed{\;p(x\mid\theta)=h(x)\,g_\theta\big(\phi(x)\big)\;}$$

où $h(x)$ est une loi **indépendante de $\theta$**, et $g_\theta$ capture **toute la dépendance en $\theta$ via $\phi(x)$**.

</div>

⚠️ Si $p(x\mid\theta)$ **ne dépend pas** de $\theta$, alors $\phi(x)$ est **trivialement** exhaustive pour toute fonction $\phi$. Le cas intéressant est celui où $p(x\mid\theta)$ ne dépend **que de $\phi(x)$** et pas de $x$ lui-même.

> **La question qui mène à la famille exponentielle.** *« À mesure qu'on observe plus de données, a-t-on besoin de plus de paramètres $\theta$ pour décrire la loi ? **La réponse est OUI en général**, et c'est l'objet de la statistique NON PARAMÉTRIQUE. La question réciproque est : quelle classe de lois a des statistiques exhaustives **de dimension FINIE** ? La réponse : **les lois de la FAMILLE EXPONENTIELLE**. »*

### 6.5 La famille exponentielle

> **L'anecdote historique.** *« Dans les années 1935-1936, **Edwin Pitman** en Tasmanie, **Georges Darmois** à Paris et **Bernard Koopman** à New York ont montré INDÉPENDAMMENT que les familles exponentielles sont **les SEULES familles** à jouir de statistiques exhaustives de dimension finie sous échantillonnage indépendant répété. »*

> **La forme générale.** Une **famille exponentielle** est une famille de lois paramétrées par $\theta\in\mathbb R^D$ de la forme
>
> $$\boxed{\;p(x\mid\theta)=h(x)\exp\big(\langle\theta,\phi(x)\rangle-A(\theta)\big)\;}$$
>
> où $\phi(x)$ est le **vecteur des STATISTIQUES EXHAUSTIVES** et $A(\theta)$ la constante de normalisation, appelée la **FONCTION DE LOG-PARTITION**.

**Les trois niveaux d'abstraction, à distinguer :**

| Niveau | Objet | Exemple |
|---|---|---|
| **1 (le plus concret)** | Une loi nommée à **paramètres FIXÉS** | $\mathcal N(0,1)$ |
| **2 (le plus courant en ML)** | Forme paramétrique fixée, **paramètres INFÉRÉS** des données | $\mathcal N(\mu,\sigma^2)$ ajustée par maximum de vraisemblance |
| **3** | Des **FAMILLES** de lois | La **famille exponentielle** |

**Simplifications.** Le facteur $h(x)$ peut être **absorbé dans le produit scalaire** en ajoutant l'entrée $\log h(x)$ à $\phi(x)$ et en contraignant $\theta_0=1$. En ignorant les deux termes annexes :

$$p(x\mid\theta)\propto\exp\big(\theta^\top\phi(x)\big)$$

Dans cette paramétrisation, les $\theta$ sont les **PARAMÈTRES NATURELS**.

**Exemple 6.13 — la GAUSSIENNE comme famille exponentielle.** Avec $\phi(x)=[x,\ x^2]^\top$ :

$$p(x\mid\theta)\propto\exp(\theta_1x+\theta_2x^2)$$

En posant

$$\boxed{\;\theta=\left[\frac{\mu}{\sigma^2},\ -\frac{1}{2\sigma^2}\right]^\top\;}$$

on retrouve $p(x\mid\theta)\propto\exp\left(\dfrac{\mu x}{\sigma^2}-\dfrac{x^2}{2\sigma^2}\right)\propto\exp\left(-\dfrac{(x-\mu)^2}{2\sigma^2}\right)$.

**Exemple 6.14 — la BERNOULLI comme famille exponentielle.**

$$p(x\mid\mu)=\mu^x(1-\mu)^{1-x}=\exp\big[x\log\mu+(1-x)\log(1-\mu)\big]=\exp\left[x\log\frac{\mu}{1-\mu}+\log(1-\mu)\right]$$

D'où l'identification :

$$\boxed{\;h(x)=1,\qquad\theta=\log\frac{\mu}{1-\mu},\qquad\phi(x)=x,\qquad A(\theta)=-\log(1-\mu)=\log\big(1+\exp(\theta)\big)\;}$$

Et la relation **inversible** :

$$\boxed{\;\mu=\frac{1}{1+\exp(-\theta)}\;}$$

> **LA SIGMOÏDE.** *« La relation entre le paramètre original $\mu$ et le paramètre naturel $\theta$ est connue sous le nom de **SIGMOÏDE** ou **fonction LOGISTIQUE**. Observer que $\mu\in(0,1)$ mais $\theta\in\mathbb R$ : la sigmoïde **COMPRIME un réel dans l'intervalle $(0,1)$**. »* Elle sert en **régression logistique** et comme **fonction d'activation non linéaire** dans les réseaux de neurones.

<details><summary>Contrôle des identités de l'exemple 6.14</summary>

| $\theta$ | $\mu=\dfrac{1}{1+e^{-\theta}}$ | $\log\dfrac{\mu}{1-\mu}$ | $A(\theta)=\log(1+e^\theta)$ | $-\log(1-\mu)$ |
|---|---|---|---|---|
| $-2{,}0$ | $0{,}119203$ | $-2{,}000000$ | $0{,}126928$ | $0{,}126928$ |
| $0{,}0$ | $0{,}500000$ | $0{,}000000$ | $0{,}693147$ | $0{,}693147$ |
| $1{,}5$ | $0{,}817574$ | $1{,}500000$ | $1{,}701413$ | $1{,}701413$ |

Les deux expressions de $A(\theta)$ coïncident exactement, et la sigmoïde inverse bien le logit

</details>

**L'a priori conjugué GÉNÉRAL.** *« Tout membre de la famille exponentielle **A UN A PRIORI CONJUGUÉ** (Brown, 1986) »* :

$$\boxed{\;p(\theta\mid\gamma)=h_c(\theta)\exp\left(\left\langle\begin{bmatrix}\gamma_1\\\gamma_2\end{bmatrix},\begin{bmatrix}\theta\\-A(\theta)\end{bmatrix}\right\rangle-A_c(\gamma)\right)\;}$$

où $\gamma$ a la dimension $\dim(\theta)+1$, et les statistiques exhaustives de l'a priori conjugué sont $\begin{bmatrix}\theta\\-A(\theta)\end{bmatrix}$.

> **L'apport pratique.** *« Il est souvent peu évident de trouver la forme paramétrique de la loi conjuguée d'une loi donnée. Les familles exponentielles fournissent une **façon COMMODE de TROUVER des couples conjugués**. »*

**Exemple 6.15 — l'a priori conjugué canonique de la Bernoulli.** Avec $\gamma:=[\alpha,\ \beta+\alpha]^\top$ et $h_c(\mu):=\mu/(1-\mu)$ :

$$p(\mu\mid\alpha,\beta)=\frac{\mu}{1-\mu}\exp\left(\alpha\log\frac{\mu}{1-\mu}+(\beta+\alpha)\log(1-\mu)-A_c(\gamma)\right)$$

— on retrouve la forme d'une **BÊTA**.

## 🟠 Concept 7 — Changement de variables (§6.7)

### 7.1 Le problème

> **La motivation.** *« Il semble y avoir beaucoup de lois connues, mais en réalité l'ensemble des lois **qui ont un NOM est assez limité**. Il est donc utile de comprendre comment sont distribuées les variables aléatoires **TRANSFORMÉES**. »* Exemples : si $X\sim\mathcal N(0,1)$, quelle est la loi de $X^2$ ? Si $X_1,X_2$ sont normales standard, quelle est la loi de $\tfrac12(X_1+X_2)$ ?

⚠️ Calculer moyenne et variance **ne suffit pas** : *« on peut ne pas être capable d'obtenir la **FORME FONCTIONNELLE** de la loi sous transformation. »*

### 7.2 Le cas discret — direct

Pour $X$ discrète de pmf $P(X=x)$ et $U$ **inversible**, avec $Y:=U(X)$ :

$$\boxed{\;P(Y=y)=P\big(U(X)=y\big)=P\big(X=U^{-1}(y)\big)\;}$$

> *« Pour les variables discrètes, les transformations **changent directement les événements individuels** (avec les probabilités transformées de façon appropriée). »* Il faut garder en tête que le **DOMAINE peut avoir changé**.

### 7.3 Le cas continu — l'approche par la cdf

**Exemple 6.16 — la recette en cinq lignes.** Soit $X$ continue de densité $f(x)=3x^2$ sur $0\leqslant x\leqslant1$. On cherche la densité de $Y=X^2$.

**Étape 1 — définition de la cdf :** $F_Y(y)=P(Y\leqslant y)$

**Étape 2 — transformation d'intérêt :** $=P(X^2\leqslant y)$

**Étape 3 — inverse :** $=P(X\leqslant y^{1/2})=F_X(y^{1/2})$

**Étape 4 — cdf comme intégrale définie :** $=\displaystyle\int_0^{y^{1/2}}3t^2\,dt=\big[t^3\big]_0^{y^{1/2}}$

**Étape 5 — résultat :**

$$\boxed{\;F_Y(y)=y^{3/2},\qquad0\leqslant y\leqslant1\;}$$

**Étape 6 — dériver pour obtenir la densité :**

$$\boxed{\;f(y)=\frac{d}{dy}F_Y(y)=\frac32y^{1/2},\qquad0\leqslant y\leqslant1\;}$$

<details><summary>Vérification par intégration numérique</summary>

| $y$ | $\int_0^{\sqrt y}3t^2dt$ (numérique) | $y^{3/2}$ | $f_Y(y)$ (dérivée num.) | $\tfrac32\sqrt y$ |
|---|---|---|---|---|
| $0{,}25$ | $0{,}125000$ | $0{,}125000$ | $0{,}750000$ | $0{,}750000$ |
| $0{,}50$ | $0{,}353553$ | $0{,}353553$ | $1{,}060660$ | $1{,}060660$ |
| $0{,}81$ | $0{,}729000$ | $0{,}729000$ | $1{,}350000$ | $1{,}350000$ |

</details>

⚠️ Les fonctions ayant un inverse sont dites **BIJECTIVES** (§2.7). Le livre insiste sur le fait que $f(x)=3x^2$ est **strictement croissante** sur le domaine considéré, ce qui rend l'inverse calculable.

### 7.4 La transformation intégrale de probabilité

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 6.15.</span>

Soit $X$ continue de **fonction de répartition STRICTEMENT MONOTONE** $F_X(x)$. Alors

$$\boxed{\;Y:=F_X(X)\quad\text{a une loi UNIFORME}\;}$$

</div>

**Ses trois usages :**

1. **Échantillonnage** — *« l'algorithme fonctionne en générant d'abord un échantillon uniforme, puis en le transformant par la **cdf INVERSE** (si elle est disponible) pour obtenir un échantillon de la loi désirée. »*
2. **Tests d'hypothèses** — savoir si un échantillon vient d'une loi particulière (Lehmann & Romano, 2005).
3. **Copules** (Nelsen, 2006) — l'idée que la sortie d'une cdf donne une uniforme en est la base.

### 7.5 Le changement de variables — la formule générale

**Cas UNIVARIÉ :**

$$\boxed{\;f(y)=f_x\big(U^{-1}(y)\big)\cdot\left|\frac{d}{dy}U^{-1}(y)\right|\;}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi la VALEUR ABSOLUE.</span>

⚠️ *« On a supposé $U$ strictement croissante. Pour des fonctions décroissantes, il se trouve qu'on obtient un **SIGNE NÉGATIF** en suivant la même dérivation. On introduit la valeur absolue pour avoir la **MÊME EXPRESSION dans les deux cas**. »*

</div>

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que mesure le facteur.</span>

*« Le terme $\left|\frac{d}{dy}U^{-1}(y)\right|$ mesure **de combien un volume unité change** quand on applique $U$ »* — c'est exactement le rôle de la jacobienne (§5.3). *« Par comparaison au cas discret, on a un **FACTEUR SUPPLÉMENTAIRE**. »*

</div>

**Cas MULTIVARIÉ :**

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 6.16.</span>

Soit $f(x)$ la densité de la variable multivariée continue $X$. Si la fonction vectorielle $y=U(x)$ est **différentiable et inversible** pour toutes les valeurs du domaine de $x$, alors

$$\boxed{\;f(y)=f_x\big(U^{-1}(y)\big)\cdot\left|\det\frac{\partial}{\partial y}U^{-1}(y)\right|\;}$$

</div>

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi le DÉTERMINANT et non la valeur absolue.</span>

*« La valeur absolue ne peut pas être utilisée pour les fonctions multivariées. À la place, on utilise le **déterminant de la matrice JACOBIENNE**. Le déterminant apparaît parce que nos différentielles (des cubes de volume) sont **transformées en PARALLÉLÉPIPÈDES** par la jacobienne. »*

</div>

**La recette en trois pas** : (1) trouver la **transformation inverse** ; (2) la **substituer** dans la densité de $x$ ; (3) calculer le **déterminant de la jacobienne** et **multiplier**.

**Exemple 6.17 — la gaussienne standard bivariée transformée.** Avec

$$f\!\begin{bmatrix}x_1\\x_2\end{bmatrix}=\frac{1}{2\pi}\exp\left(-\frac12\begin{bmatrix}x_1\\x_2\end{bmatrix}^\top\begin{bmatrix}x_1\\x_2\end{bmatrix}\right)$$

et $y=Ax$ avec $A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$ :

**Étape 1 — l'inverse :** $x=A^{-1}y=\dfrac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}y$. $ad-bc$ est le **déterminant** de $A$.

**Étape 2 — substituer :** $f(A^{-1}y)=\dfrac{1}{2\pi}\exp\left(-\dfrac12y^\top A^{-\top}A^{-1}y\right)$

**Étape 3 — la jacobienne :** la dérivée partielle d'une matrice fois un vecteur par rapport au vecteur **est la matrice elle-même** (§5.5), donc $\dfrac{\partial}{\partial y}A^{-1}y=A^{-1}$, et le déterminant de l'inverse est l'inverse du déterminant :

$$\det\left(\frac{\partial}{\partial y}A^{-1}y\right)=\frac{1}{ad-bc}$$

**Le résultat :**

$$\boxed{\;f(y)=\frac{1}{2\pi}\exp\left(-\frac12y^\top A^{-\top}A^{-1}y\right)|ad-bc|^{-1}\;}$$

> **La lecture finale du livre.** *« La densité $f(x)$ est en fait la gaussienne standard, et la densité transformée $f(y)$ est une **gaussienne bivariée de COVARIANCE $\Sigma=AA^\top$**. »* On retrouve exactement la règle du §6.5.3 — mais **dérivée depuis les premiers principes**.

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Décrire l'univers, les événements » | **§6.1.2** | $\Omega$ = tous les résultats ; $\mathcal A$ = les parties observables ; $X:\Omega\to\mathcal T$ |
| « Calculer $P(X=k)$ » | **pmf** | Compter les **antécédents** dans $\Omega$ ; plusieurs résultats peuvent donner le même $k$ |
| « La marginale de $X$ » | **Règle de la somme** | Sommer/intégrer sur **tout ce qu'on ne veut pas** |
| « La conditionnelle $p(y\mid x)$ » | **Règle du produit** | $p(x,y)/p(x)$ ; en discret : la **fraction d'une colonne** |
| « Sachant qu'on a observé… quelle est la probabilité que… » | **Bayes** | $p(x\mid y)=p(y\mid x)p(x)/p(y)$ ; identifier a priori, vraisemblance, évidence |
| « Calculer $\mathbb E[g(X)]$ » | **Déf. 6.3** | $\int g(x)p(x)dx$ ou $\sum g(x)p(x)$ |
| « Moyenne, médiane, mode » | **§6.4.1** | Moyenne = espérance ; médiane = cdf $=0{,}5$ ; mode = **pic** de la densité |
| « Calculer la covariance / variance » | **Déf. 6.5-6.7** | $\mathbb E[xy]-\mathbb E[x]\mathbb E[y]$ ; contrôle : matrice **symétrique, semi-définie positive** |
| « Que devient la loi après $y=Ax+b$ ? » | **§6.4.4** | $\mathbb E=A\mu+b$, $\mathbb V=A\Sigma A^\top$ ; si gaussienne, **le résultat reste gaussien** |
| « $X$ et $Y$ sont-elles indépendantes ? » | **Déf. 6.10** | Vérifier $p(x,y)=p(x)p(y)$ ; $\operatorname{Cov}=0$ **ne suffit PAS** |
| « Marginale/conditionnelle d'une gaussienne » | **§6.5.1** | Marginale : **prendre le bloc**. Conditionnelle : $\mu_x+\Sigma_{xy}\Sigma_{yy}^{-1}(y-\mu_y)$ et $\Sigma_{xx}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx}$ |
| « Somme de gaussiennes indépendantes » | **§6.5.3** | Moyennes et covariances **s'ajoutent** ; pour $ax+by$, les coefficients entrent **au carré** dans la variance |
| « Moyenne/variance d'un mélange » | **Th. 6.12** | Moyenne : somme pondérée. Variance : **DEUX termes** (variance conditionnelle espérée + variance des moyennes) |
| « Échantillonner $\mathcal N(\mu,\Sigma)$ » | **§6.5.4** | $\mathcal N(0,I)$ puis $y=Ax+\mu$ avec $AA^\top=\Sigma$ par **Cholesky** |
| « Quel a priori choisir ? » | **Déf. 6.13** | Le **conjugué** : bêta pour Bernoulli/binomiale, gaussien pour la moyenne gaussienne, Dirichlet pour multinomiale |
| « Mettre à jour l'a posteriori » | **Ex. 6.11-6.12** | Bêta-binomiale : $\alpha\to\alpha+h$, $\beta\to\beta+(N-h)$ |
| « Cette loi est-elle dans la famille exponentielle ? » | **§6.6.3** | La mettre sous la forme $h(x)\exp(\langle\theta,\phi(x)\rangle-A(\theta))$ ; identifier $\phi$ et $\theta$ |
| « Quelle est la loi de $Y=U(X)$ ? » | **§6.7** | Discret : $P(X=U^{-1}(y))$. Continu : passer par la **cdf**, ou la formule avec $\|dU^{-1}/dy\|$ |
| « Cas multivarié de la transformation » | **Th. 6.16** | $f_x(U^{-1}(y))\cdot\|\det\partial U^{-1}/\partial y\|$ |

## Comment résoudre : les cinq méthodes pas-à-pas

**Méthode A — Un problème de Bayes.**

1. **Nommer** les variables : quelle est la latente $x$ ? l'observée $y$ ?
2. Écrire l'**a priori** $p(x)$ — vérifier qu'il est **non nul sur tous les $x$ plausibles**.
3. Écrire la **vraisemblance** $p(y\mid x)$ — c'est une fonction de $y$, **pas une loi en $x$**.
4. Calculer l'**évidence** $p(y)=\int p(y\mid x)p(x)dx$ — ou reconnaître qu'elle **normalise** simplement.
5. Combiner : $p(x\mid y)\propto p(y\mid x)p(x)$.
6. **Contrôle** : l'a posteriori intègre-t-il à 1 ?

**Méthode B — Conditionnement gaussien.**

1. Écrire la loi jointe en **blocs** : $\mu=[\mu_x;\mu_y]$ et $\Sigma=\begin{bmatrix}\Sigma_{xx}&\Sigma_{xy}\\\Sigma_{yx}&\Sigma_{yy}\end{bmatrix}$.
2. Marginale de $x$ : **prendre directement** $\mathcal N(\mu_x,\Sigma_{xx})$.
3. Conditionnelle : calculer $K:=\Sigma_{xy}\Sigma_{yy}^{-1}$ (le « **gain** », comme dans Kalman).
4. $\mu_{x\mid y}=\mu_x+K(y-\mu_y)$ et $\Sigma_{x\mid y}=\Sigma_{xx}-K\Sigma_{yx}$.
5. **Contrôles** : $\Sigma_{x\mid y}\preceq\Sigma_{xx}$ (conditionner **réduit** la variance) ; si $\Sigma_{xy}=0$, on retrouve la marginale.

**Méthode C — Statistiques d'une transformation.**

1. Si la transformation est **affine** et la loi **gaussienne** : appliquer directement $A\mu+b$ et $A\Sigma A^\top$. Fin.
2. Sinon, si l'on veut seulement les **moments** : utiliser la linéarité de $\mathbb E$ et les identités (6.46)-(6.52).
3. Si l'on veut la **loi entière** : passer au changement de variables (méthode D).

**Méthode D — Changement de variables.**

1. Vérifier que $U$ est **différentiable et inversible** sur le domaine.
2. Calculer explicitement $x=U^{-1}(y)$.
3. Substituer : $f_x(U^{-1}(y))$.
4. Calculer la **jacobienne** $\partial U^{-1}/\partial y$ puis $|\det|$.
5. Multiplier. **Ne pas oublier de recalculer le DOMAINE** de $y$.
6. **Contrôle** : $\int f(y)dy=1$.

**Méthode E — Mise à jour conjuguée.**

1. Identifier la **vraisemblance** et chercher son conjugué dans le tableau 6.2.
2. Écrire a priori et vraisemblance **en gardant seulement les termes en le paramètre** (le $\propto$ suffit).
3. **Regrouper les exposants** de même base.
4. **Lire** les nouveaux paramètres.
5. **Contrôle** : la forme obtenue est-elle bien celle de l'a priori ?

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire qu'une variable aléatoire est une variable | *« Ni aléatoire ni une variable — **c'est une FONCTION** »* $X:\Omega\to\mathcal T$ |
| Confondre $\Omega$, $\mathcal T$ et $X$ | $\Omega$ = les résultats bruts ; $\mathcal T$ = les quantités d'intérêt ; $X$ = la fonction qui relie les deux |
| Croire qu'une densité est $\leqslant1$ | **FAUX**. Seules les **pmf** sont dans $[0,1]$. Une densité sur $[0{,}9;1{,}6]$ vaut $1/0{,}7\approx1{,}43$ |
| Écrire $P(X=x)>0$ pour $X$ continue | **$P(X=x)=0$** — c'est un ensemble de **mesure nulle** |
| Confondre densité et loi | La **densité** est une fonction ; la **loi** est l'association de $X$ à cette densité. Il existe des cdf **sans pdf** |
| Appeler $p(y\mid x)$ « la vraisemblance de $y$ » | **JAMAIS.** C'est la « vraisemblance de **$x$** sachant $y$ » ou « la probabilité de $y$ sachant $x$ » |
| Traiter la vraisemblance comme une loi en $x$ | Elle **n'est PAS normalisée en $x$** : $\int p(y\mid x)dx\neq1$ en général |
| Oublier l'évidence dans Bayes | Elle **normalise** l'a posteriori ; elle est **indépendante de $x$** mais souvent **difficile à calculer** |
| Résumer l'a posteriori par son maximum | **PERTE D'INFORMATION** ; le livre cite des **échecs systématiques** en apprentissage par renforcement |
| Croire que $\operatorname{Cov}=0$ implique l'indépendance | **FAUX.** La covariance ne mesure que la dépendance **LINÉAIRE**. Contre-exemple 6.5 : $y=x^2$ |
| Croire que la moyenne est toujours représentative | Pour une loi **bimodale**, la moyenne peut ne tomber **près d'aucun mode** (exemple 6.4) |
| Définir la médiane multivariée composante par composante | Il **n'existe pas d'ORDRE** naturel en dimension $>1$ |
| Écrire $\mathbb V[x-y]=\mathbb V[x]-\mathbb V[y]$ | C'est $\mathbb V[x]+\mathbb V[y]-\operatorname{Cov}[x,y]-\operatorname{Cov}[y,x]$ — les **variances S'AJOUTENT** |
| Écrire $\mathbb V[Ax]=A\Sigma$ | C'est $A\Sigma A^\top$ — il faut **les deux côtés** |
| Croire que $b$ affecte la variance dans $Ax+b$ | **Non** : une translation ne change pas la dispersion |
| Utiliser $N$ au dénominateur de la covariance en croyant que c'est non biaisé | La version du livre est **BIAISÉE** ; la corrigée utilise **$N-1$** |
| Implémenter la formule brute de la variance sans précaution | **NUMÉRIQUEMENT INSTABLE** si les deux termes sont grands et proches |
| Écrire $\mu_{x\mid y}=\mu_x+\Sigma_{yy}^{-1}\Sigma_{xy}(y-\mu_y)$ | L'ordre est $\Sigma_{xy}\Sigma_{yy}^{-1}$ — vérifier les **dimensions** |
| Croire que $\Sigma_{x\mid y}$ dépend de $y$ | **NON** : elle est **constante**. Seule la moyenne dépend de l'observation |
| Confondre somme de variables et somme de densités | La première donne une gaussienne ; la seconde donne un **MÉLANGE**, généralement multimodal |
| Oublier le second terme de la variance d'un mélange | $\mathbb V=$ variance conditionnelle **espérée** $+$ **variance des moyennes** (loi de la variance totale) |
| Croire que le produit de deux densités gaussiennes est une densité | C'est une gaussienne **MISE À L'ÉCHELLE** par $c$ |
| Utiliser $\Sigma$ au lieu de $A$ pour échantillonner | Il faut $A$ tel que $AA^\top=\Sigma$ — la **CHOLESKY** de $\Sigma$ |
| Chercher un a priori conjugué à la main | Utiliser le tableau 6.2, ou la construction générale des familles exponentielles |
| Croire qu'un a priori conjugué existe toujours | Il existe pour **tout membre de la famille exponentielle** — mais pas pour n'importe quelle loi |
| Oublier le facteur jacobien en changement de variables | Le cas **continu** exige $\|dU^{-1}/dy\|$ ; le cas **discret** non |
| Utiliser la valeur absolue en multivarié | Utiliser le **DÉTERMINANT de la jacobienne** |
| Oublier de recalculer le domaine après transformation | *« Le domaine de la variable aléatoire peut avoir changé du fait de la transformation »* |
| Appliquer $Y=F_X(X)$ sans monotonie stricte | Le théorème 6.15 **exige** une cdf **strictement monotone** |

## 📌 Ultimate Review

```
════════ LES DIX FORMULES À SAVOIR SANS HÉSITER ════════
  1.  SOMME    p(x) = Σ_y p(x,y)  ou  ∫ p(x,y) dy
  2.  PRODUIT  p(x,y) = p(y|x) p(x) = p(x|y) p(y)
  3.  BAYES    p(x|y) = p(y|x) p(x) / p(y)
               postérieur = vraisemblance × a priori / évidence
  4.  Cov[x,y] = E[xy] − E[x]E[y]       V[x] = E[x²] − (E[x])²
  5.  AFFINE   E[Ax+b] = Aµ+b    V[Ax+b] = A Σ Aᵀ    Cov[x,Ax+b] = Σ Aᵀ
  6.  corr[x,y] = Cov[x,y]/√(V[x]V[y]) ∈ [−1,1]  = COSINUS de l'angle
  7.  GAUSSIENNE  p(x|µ,Σ) = (2π)^{−D/2}|Σ|^{−1/2} exp(−½(x−µ)ᵀΣ⁻¹(x−µ))
  8.  MARGINALE     p(x) = N(µx, Σxx)              ← prendre le BLOC
      CONDITIONNELLE µ_{x|y} = µx + Σxy Σyy⁻¹ (y − µy)
                     Σ_{x|y} = Σxx − Σxy Σyy⁻¹ Σyx
  9.  FAMILLE EXP.  p(x|θ) = h(x) exp(⟨θ, φ(x)⟩ − A(θ))
      Bernoulli : θ = log(µ/(1−µ)) , µ = 1/(1+e^{−θ})  ← SIGMOÏDE
 10.  CHANGT VAR.  f(y) = fx(U⁻¹(y)) · |det ∂U⁻¹/∂y|
═════════════════════════════════════════════════════════
```

**Le tableau discret / continu :**

|  | **Discret** | **Continu** |
|---|---|---|
| Espace cible | Fini ou dénombrable | $\mathbb R$ ou $\mathbb R^D$ |
| « Probabilité ponctuelle » | $P(X=x)$ — **pmf** | $p(x)$ — **densité**, mais $P(X=x)=0$ |
| « Probabilité d'intervalle » | Sans objet | $P(X\leqslant x)$ — **cdf** |
| Normalisation | $\sum_x P(X=x)=1$ | $\int f(x)dx=1$ |
| Borne sur les valeurs | $\in[0,1]$ | **PEUT dépasser 1** |
| Marginalisation | **Somme** | **Intégrale** |
| Changement de variables | $P(X=U^{-1}(y))$ | $\times$ **facteur jacobien** |

**Le dictionnaire géométrie / probabilité :**

| Géométrie (ch. 3) | Probabilité (ch. 6) |
|---|---|
| Produit intérieur | **Covariance** |
| Norme | **Écart-type** |
| Angle ($\cos$) | **Corrélation** |
| Orthogonalité | **Non-corrélation** |
| Pythagore | $\mathbb V[x+y]=\mathbb V[x]+\mathbb V[y]$ |
| Vecteur nul | Variable **déterministe** |

**Les propriétés qui font la gaussienne :**

| Opération | Résultat |
|---|---|
| **Marginaliser** | Reste gaussienne — il suffit de **prendre le bloc** |
| **Conditionner** | Reste gaussienne — formules fermées |
| **Somme** (variables indépendantes) | Gaussienne, paramètres additifs |
| **Transformation affine** | Gaussienne, $A\mu+b$ et $A\Sigma A^\top$ |
| **Produit de densités** | Gaussienne **mise à l'échelle** |
| **Mélange de densités** | **PAS** gaussienne — multimodale |

**Où chaque notion resservira dans le livre :**

| Notion du ch. 6 | Suite |
|---|---|
| Gaussienne, vraisemblance et a priori | **Régression linéaire** (ch. 9) |
| Mélange de gaussiennes | **Estimation de densité** (ch. 11) |
| Bayes, a posteriori | **Modélisation probabiliste** (§8.4), **sélection de modèle** (§8.6) |
| Loi jointe, factorisation | **Modèles graphiques** (§8.5) |
| Conditionnelles gaussiennes | **ACP probabiliste** (§10.7), filtre de Kalman, processus gaussiens |
| Changement de variables, jacobien | **Reparamétrisation**, auto-encodeurs variationnels |
| Famille exponentielle, sigmoïde | **Régression logistique**, activations de réseaux, **noyaux** (ch. 12) |

## 🧠 Active Recall

**Espace probabilisé**

1. Quels sont les trois concepts de Kolmogorov ? Que vaut $P(\Omega)$ ?
2. Qu'est-ce qu'une variable aléatoire ? Pourquoi le nom est-il trompeur ?
3. Écrire $P_X(S)$ en fonction de l'image réciproque.
4. Qu'est-ce que la loi d'une variable aléatoire ?
5. Distinguer les interprétations bayésienne et fréquentiste.
6. Citer les trois critères de Jaynes.
7. Distinguer probabilité et statistique en une phrase chacune.
8. Dans l'exemple 6.1, pourquoi $P(X=1)=0{,}42$ et non $0{,}21$ ?

**Discret et continu** 9. Que sont pmf, pdf, cdf ? Compléter le tableau 6.1. 10. Écrire les deux conditions de la définition 6.1. 11. Une densité peut-elle dépasser 1 ? Donner l'exemple du livre. 12. Que vaut $P(X=x)$ pour $X$ continue ? Pourquoi ? 13. Distinguer la densité et la loi. 14. Comment lit-on marginales et conditionnelles sur une table discrète ?

**Les deux règles et Bayes** 15. Écrire la règle de la somme dans les deux cas. Quel est son autre nom ? 16. Quel est le défi computationnel qu'elle pose ? 17. Écrire la règle du produit. Pourquoi y a-t-il deux factorisations ? 18. Écrire Bayes et nommer les quatre termes. 19. Quelle est la mise en garde sur le mot « vraisemblance » ? 20. Écrire l'évidence. Donner ses trois interprétations. 21. Pourquoi ne pas résumer l'a posteriori à son maximum ?

**Statistiques résumées** 22. Écrire la définition de l'espérance dans les deux cas. 23. Pourquoi la moyenne est-elle un cas particulier ? 24. L'espérance est-elle linéaire ? Le montrer. 25. Définir médiane et mode. Quels sont leurs avantages et difficultés ? 26. Écrire les deux expressions de la covariance. 27. Écrire la variance multivariée. Quelles sont les trois propriétés de la matrice de covariance ? 28. Définir la corrélation. Dans quel intervalle vit-elle ? 29. Écrire moyenne et covariance empiriques. Le livre utilise-t-il la version biaisée ? 30. Donner les trois expressions de la variance. Quel est l'avantage et le danger de la deuxième ? 31. Écrire $\mathbb E$ et $\mathbb V$ pour $x\pm y$ et pour $Ax+b$. 32. Que devient $\operatorname{Cov}[x,Ax+b]$ ?

**Indépendance et géométrie** 33. Définir l'indépendance. Donner ses quatre conséquences. 34. L'implication « $\operatorname{Cov}=0\Rightarrow$ indépendance » est-elle vraie ? Donner le contre-exemple. 35. Que signifie i.i.d. exactement ? 36. Définir l'indépendance conditionnelle. Donner sa forme équivalente. 37. Compléter le dictionnaire géométrie/probabilité. 38. À quoi correspond la corrélation géométriquement ?

**Gaussienne** 39. Écrire les densités univariée et multivariée. 40. Qu'est-ce que la loi normale standard ? 41. Quel théorème explique son omniprésence ? 42. Écrire la marginale et la conditionnelle d'une gaussienne jointe. 43. Dans l'exemple 6.6, que valent la moyenne et la variance conditionnelles ? 44. Pourquoi la variance conditionnelle ne dépend-elle pas de $y$ ? 45. Citer trois algorithmes qui reposent sur les conditionnelles gaussiennes. 46. Que donne le produit de deux densités gaussiennes ? 47. Que donne la somme de deux gaussiennes indépendantes ? Et $ax+by$ ? 48. Énoncer le théorème 6.12. Quel est le nom de la formule sous-jacente ? 49. Décrire les trois étapes de l'échantillonnage. 50. Quel est le rôle de Cholesky ?

**Conjugaison et famille exponentielle** 51. Quels sont les trois desiderata ? 52. Écrire Bernoulli, binomiale et bêta avec leurs moments. 53. Quels sont les quatre cas particuliers de la bêta ? 54. Définir un a priori conjugué. Pourquoi est-ce commode ? 55. Dériver la conjugaison bêta-binomiale. 56. Compléter le tableau 6.2. 57. Qu'est-ce qu'une statistique exhaustive ? Énoncer Fisher-Neyman. 58. Écrire la forme de la famille exponentielle. Nommer chaque terme. 59. Donner $\phi$ et $\theta$ pour la gaussienne. Pour la Bernoulli. 60. Qu'est-ce que la sigmoïde ? Que fait-elle ? 61. Quel résultat historique de 1935-1936 caractérise les familles exponentielles ?

**Changement de variables** 62. Écrire la transformation dans le cas discret. 63. Détailler les six étapes de l'exemple 6.16. 64. Énoncer le théorème 6.15. Citer ses trois usages. 65. Écrire la formule univariée. Pourquoi la valeur absolue ? 66. Écrire le théorème 6.16. Pourquoi le déterminant ? 67. Dans l'exemple 6.17, que vaut la covariance de la loi transformée ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les trois concepts de Kolmogorov ? | **Univers $\Omega$** · **tribu des événements $\mathcal A$** · **probabilité $P$** |
| Que vaut $P(\Omega)$ ? | $1$ |
| Qu'est-ce qu'une variable aléatoire ? | **Une FONCTION** $X:\Omega\to\mathcal T$ — ni aléatoire ni une variable |
| Espace cible ? | $\mathcal T$, l'ensemble des **quantités d'intérêt** |
| Loi de $X$ ? | $P_X=P\circ X^{-1}$, avec $P_X(S)=P(X^{-1}(S))$ |
| Variable discrète ? | $\mathcal T$ **fini ou dénombrable** |
| Variable continue ? | $\mathcal T=\mathbb R$ ou $\mathbb R^D$ |
| Interprétation bayésienne ? | Le **degré de croyance**, la « probabilité subjective » |
| Interprétation fréquentiste ? | La **fréquence relative** à la limite d'une infinité de données |
| Probabilité contre statistique ? | Probabilité : du **modèle vers les données**. Statistique : des **données vers le processus** |
| Ce que le théorème de Cox-Jaynes prouve ? | Les règles de la plausibilité **SONT** les règles de la probabilité, à fonction monotone près |
| Fonction de masse (pmf) ? | $P(X=x)$, cas **discret** |
| Fonction de densité (pdf) ? | $p(x)$, cas **continu** — elle **peut dépasser 1** |
| Fonction de répartition (cdf) ? | $P(X\leqslant x)$ |
| Les deux conditions d'une densité ? | $f(x)\geqslant0$ · $\int f(x)dx=1$ |
| $P(X=x)$ pour $X$ continue ? | **ZÉRO** — ensemble de mesure nulle |
| Marginale sur une table discrète ? | La **somme d'une ligne ou d'une colonne** |
| Conditionnelle sur une table ? | $P(Y=y_j\mid X=x_i)=n_{ij}/c_i$ — la **fraction d'une colonne** |
| Règle de la somme ? | $p(x)=\sum_y p(x,y)$ ou $\int p(x,y)dy$ |
| Son autre nom ? | La **MARGINALISATION** |
| Son défi ? | Somme/intégrale de **grande dimension** — pas d'algorithme **polynomial** connu |
| Règle du produit ? | $p(x,y)=p(y\mid x)p(x)=p(x\mid y)p(y)$ |
| Théorème de Bayes ? | $p(x\mid y)=\dfrac{p(y\mid x)p(x)}{p(y)}$ |
| A priori ? | $p(x)$ — la connaissance **AVANT** de voir les données |
| Vraisemblance ? | $p(y\mid x)$ — **PAS une loi en $x$** ; aussi appelée le **modèle de mesure** |
| A posteriori ? | $p(x\mid y)$ — ce qu'on sait **APRÈS** avoir observé |
| Évidence ? | $p(y)=\int p(y\mid x)p(x)dx=\mathbb E_X[p(y\mid x)]$ |
| Ses trois rôles ? | **Normalise** l'a posteriori · **vraisemblance espérée** sous l'a priori · **sélection de modèle** |
| Autre nom du théorème de Bayes ? | L'**INVERSE PROBABILISTE** |
| Danger de résumer l'a posteriori ? | **Perte d'information** — échecs systématiques en apprentissage par renforcement |
| Espérance ? | $\mathbb E_X[g(x)]=\int g(x)p(x)dx$ ou $\sum g(x)p(x)$ |
| Son autre nom cocasse ? | La **loi du statisticien inconscient** |
| Moyenne ? | L'espérance avec $g=$ **identité** |
| L'espérance est-elle linéaire ? | **OUI** : $\mathbb E[ag+bh]=a\mathbb E[g]+b\mathbb E[h]$ |
| Médiane ? | La valeur où la **cdf vaut $0{,}5$** |
| Ses deux avantages ? | Plus proche de l'**intuition** pour les lois asymétriques · plus **ROBUSTE aux valeurs extrêmes** |
| Sa difficulté ? | Pas d'**ORDRE** naturel en dimension $>1$ |
| Mode ? | La valeur **la plus fréquente** ; en continu, un **pic** de la densité |
| Sa difficulté ? | Il peut y en avoir **beaucoup** en grande dimension |
| Covariance ? | $\operatorname{Cov}[x,y]=\mathbb E[xy]-\mathbb E[x]\mathbb E[y]$ |
| Variance multivariée ? | $\mathbb V[x]=\mathbb E[xx^\top]-\mathbb E[x]\mathbb E[x]^\top$ |
| Trois propriétés de la matrice de covariance ? | **Symétrique** · **semi-définie positive** · **variances sur la diagonale** |
| Corrélation ? | $\dfrac{\operatorname{Cov}[x,y]}{\sqrt{\mathbb V[x]\mathbb V[y]}}\in[-1,1]$ |
| Matrice de corrélation ? | La covariance des variables **STANDARDISÉES** $x/\sigma(x)$ |
| Moyenne empirique ? | $\bar x=\frac1N\sum_n x_n$ |
| Covariance empirique ? | $\Sigma=\frac1N\sum_n(x_n-\bar x)(x_n-\bar x)^\top$ — **BIAISÉE** |
| Version non biaisée ? | Avec **$N-1$** au dénominateur |
| Formule brute de la variance ? | $\mathbb V[x]=\mathbb E[x^2]-(\mathbb E[x])^2$ |
| Son mnémonique ? | *« La **moyenne du carré** moins le **carré de la moyenne** »* |
| Son avantage ? | Calcul en **UNE passe** |
| Son danger ? | **Instabilité numérique** si les deux termes sont grands et proches |
| Troisième expression ? | $\frac{1}{N^2}\sum_{i,j}(x_i-x_j)^2=2\times$ la formule brute |
| Sa lecture géométrique ? | Équivalence entre distances **par paires** et distances **au centre** |
| $\mathbb V[x+y]$ ? | $\mathbb V[x]+\mathbb V[y]+\operatorname{Cov}[x,y]+\operatorname{Cov}[y,x]$ |
| $\mathbb V[x-y]$ ? | $\mathbb V[x]+\mathbb V[y]-\operatorname{Cov}[x,y]-\operatorname{Cov}[y,x]$ — **les variances S'AJOUTENT** |
| $\mathbb E[Ax+b]$ ? | $A\mu+b$ |
| $\mathbb V[Ax+b]$ ? | $A\Sigma A^\top$ — le $b$ **disparaît** |
| $\operatorname{Cov}[x,Ax+b]$ ? | $\Sigma A^\top$ |
| Indépendance ? | $p(x,y)=p(x)p(y)$ |
| Ses quatre conséquences ? | $p(y\mid x)=p(y)$ · $p(x\mid y)=p(x)$ · $\mathbb V[x+y]=\mathbb V[x]+\mathbb V[y]$ · $\operatorname{Cov}=0$ |
| $\operatorname{Cov}=0$ implique-t-il l'indépendance ? | **NON** — la covariance ne mesure que la dépendance **LINÉAIRE** |
| Le contre-exemple 6.5 ? | $\mathbb E[x]=0$, $\mathbb E[x^3]=0$, $y=x^2$ : $\operatorname{Cov}[x,y]=\mathbb E[x^3]=0$ mais $Y$ dépend de $X$ |
| i.i.d. ? | **Mutuellement** indépendantes (tous les sous-ensembles) **et** de **même loi** |
| Indépendance conditionnelle ? | $p(x,y\mid z)=p(x\mid z)p(y\mid z)$ **pour TOUT $z$** |
| Sa forme équivalente ? | $p(x\mid y,z)=p(x\mid z)$ |
| $\langle X,Y\rangle$ en probabilité ? | La **covariance** |
| $\lVert X\rVert$ ? | L'**écart-type** $\sigma[x]$ |
| $\cos\theta$ ? | La **CORRÉLATION** |
| Orthogonalité ? | $\operatorname{Cov}[x,y]=0$, c'est-à-dire **non corrélées** |
| Le théorème de Pythagore probabiliste ? | $\mathbb V[x+y]=\mathbb V[x]+\mathbb V[y]$ pour des variables **non corrélées** |
| Densité gaussienne univariée ? | $\dfrac{1}{\sqrt{2\pi\sigma^2}}\exp\left(-\dfrac{(x-\mu)^2}{2\sigma^2}\right)$ |
| Densité multivariée ? | $(2\pi)^{-D/2}\|\Sigma\|^{-1/2}\exp\left(-\tfrac12(x-\mu)^\top\Sigma^{-1}(x-\mu)\right)$ |
| Loi normale standard ? | $\mu=0$ et $\Sigma=I$ |
| Pourquoi la gaussienne apparaît-elle naturellement ? | Le **THÉORÈME CENTRAL LIMITE** — sommes de variables i.i.d. |
| Marginale d'une gaussienne jointe ? | $\mathcal N(\mu_x,\Sigma_{xx})$ — il suffit de **prendre le bloc** |
| Moyenne conditionnelle ? | $\mu_{x\mid y}=\mu_x+\Sigma_{xy}\Sigma_{yy}^{-1}(y-\mu_y)$ |
| Covariance conditionnelle ? | $\Sigma_{x\mid y}=\Sigma_{xx}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx}$ |
| Dépend-elle de $y$ ? | **NON** — elle est **constante** |
| Exemple 6.6, conditionnelle ? | $\mathcal N(0{,}6\ ;\ 0{,}1)$ |
| Exemple 6.6, marginale ? | $\mathcal N(0\ ;\ 0{,}3)$ |
| Trois algorithmes fondés sur les conditionnelles gaussiennes ? | Le **filtre de KALMAN** · les **PROCESSUS GAUSSIENS** · l'**ACP PROBABILISTE** |
| Produit de deux densités gaussiennes ? | Une gaussienne **MISE À L'ÉCHELLE** : $C=(A^{-1}+B^{-1})^{-1}$, $c=C(A^{-1}a+B^{-1}b)$ |
| Somme de gaussiennes indépendantes ? | $\mathcal N(\mu_x+\mu_y,\ \Sigma_x+\Sigma_y)$ |
| Somme pondérée $ax+by$ ? | $\mathcal N(a\mu_x+b\mu_y,\ a^2\Sigma_x+b^2\Sigma_y)$ — coefficients **au carré** |
| Moyenne d'un mélange ? | $\alpha\mu_1+(1-\alpha)\mu_2$ |
| Variance d'un mélange ? | $\alpha\sigma_1^2+(1-\alpha)\sigma_2^2+\alpha\mu_1^2+(1-\alpha)\mu_2^2-[\alpha\mu_1+(1-\alpha)\mu_2]^2$ |
| Le nom de cette formule ? | La **LOI DE LA VARIANCE TOTALE** : $\mathbb V[x]=\mathbb E_Y[\mathbb V[x\mid y]]+\mathbb V_Y[\mathbb E[x\mid y]]$ |
| Transformation linéaire d'une gaussienne ? | **Toujours gaussienne** : $\mathcal N(A\mu,\ A\Sigma A^\top)$ |
| Les trois étapes de l'échantillonnage ? | **Uniforme $[0,1]$** → **BOX-MÜLLER** → $\mathcal N(0,I)$, puis $y=Ax+\mu$ |
| Quel $A$ choisir ? | Celui avec $AA^\top=\Sigma$ — la **CHOLESKY** de $\Sigma$ |
| Les trois desiderata du §6.6 ? | **Clôture** sous Bayes · **pas plus de paramètres** avec plus de données · **bonne estimation** |
| Loi de Bernoulli ? | $p(x\mid\mu)=\mu^x(1-\mu)^{1-x}$ ; $\mathbb E=\mu$, $\mathbb V=\mu(1-\mu)$ |
| Loi binomiale ? | $\binom Nm\mu^m(1-\mu)^{N-m}$ ; $\mathbb E=N\mu$, $\mathbb V=N\mu(1-\mu)$ |
| Loi bêta ? | $\dfrac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}\mu^{\alpha-1}(1-\mu)^{\beta-1}$ |
| Ses moments ? | $\mathbb E=\dfrac{\alpha}{\alpha+\beta}$, $\mathbb V=\dfrac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$ |
| Rôle de $\alpha$ et $\beta$ ? | $\alpha$ pousse la masse **vers 1**, $\beta$ **vers 0** |
| Bêta avec $\alpha=1=\beta$ ? | La loi **UNIFORME** $\mathcal U[0,1]$ |
| Bêta avec $\alpha,\beta<1$ ? | **BIMODALE**, pics en 0 et 1 |
| A priori conjugué ? | Un a priori tel que l'**a posteriori soit du MÊME TYPE** |
| Son avantage ? | On calcule l'a posteriori en **METTANT À JOUR LES PARAMÈTRES** |
| Conjugué de la binomiale ? | La **BÊTA** : $\operatorname{Beta}(h+\alpha,\ N-h+\beta)$ |
| Conjugué de la Bernoulli ? | La **BÊTA** : $\operatorname{Beta}(\alpha+x,\ \beta+1-x)$ |
| Conjugué de la multinomiale ? | La **DIRICHLET** |
| Conjugué pour la variance gaussienne (scalaire) ? | La **Gamma INVERSE** (ou Gamma sur la **précision**) |
| Conjugué pour la covariance (multivarié) ? | La **Wishart INVERSE** (ou Wishart sur la **matrice de précision**) |
| Statistique exhaustive ? | Une statistique portant **TOUTE l'information** inférable sur $\theta$ |
| Théorème de Fisher-Neyman ? | $\phi(x)$ exhaustive $\iff p(x\mid\theta)=h(x)g_\theta(\phi(x))$ |
| Forme de la famille exponentielle ? | $p(x\mid\theta)=h(x)\exp(\langle\theta,\phi(x)\rangle-A(\theta))$ |
| Que sont $\phi(x)$, $\theta$, $A(\theta)$ ? | **Statistiques exhaustives** · **paramètres naturels** · **fonction de LOG-PARTITION** |
| $\phi$ pour la gaussienne ? | $[x,\ x^2]^\top$, avec $\theta=[\mu/\sigma^2,\ -1/(2\sigma^2)]^\top$ |
| $\theta$ pour la Bernoulli ? | $\log\dfrac{\mu}{1-\mu}$, avec $\phi(x)=x$ et $A(\theta)=\log(1+e^\theta)$ |
| La relation inverse ? | $\mu=\dfrac{1}{1+\exp(-\theta)}$ — la **SIGMOÏDE** |
| Ce que fait la sigmoïde ? | **Comprime** un réel dans $(0,1)$ |
| Où sert-elle ? | **Régression logistique** · **activations** de réseaux de neurones |
| Le résultat de 1935-1936 ? | **Pitman, Darmois, Koopman** : les familles exponentielles sont les **SEULES** à statistiques exhaustives de dimension finie |
| Tout membre de la famille exponentielle a-t-il un conjugué ? | **OUI** (Brown, 1986) |
| Transformation, cas discret ? | $P(Y=y)=P(X=U^{-1}(y))$ |
| Transformation, cas continu univarié ? | $f(y)=f_x(U^{-1}(y))\cdot\left\|\dfrac{d}{dy}U^{-1}(y)\right\|$ |
| Pourquoi la valeur absolue ? | Pour couvrir les $U$ **décroissantes** avec la même formule |
| Théorème 6.16, cas multivarié ? | $f(y)=f_x(U^{-1}(y))\cdot\left\|\det\dfrac{\partial}{\partial y}U^{-1}(y)\right\|$ |
| Pourquoi le déterminant ? | Les **cubes de volume** sont transformés en **parallélépipèdes** par la jacobienne |
| Résultat de l'exemple 6.16 ? | $F_Y(y)=y^{3/2}$ et $f_Y(y)=\tfrac32y^{1/2}$ sur $[0,1]$ |
| Théorème 6.15 ? | Si $F_X$ est **strictement monotone**, $Y:=F_X(X)$ est **UNIFORME** |
| Son nom ? | La **TRANSFORMATION INTÉGRALE DE PROBABILITÉ** |
| Ses trois usages ? | **Échantillonnage** par cdf inverse · **tests d'hypothèses** · **copules** |
| Covariance obtenue dans l'exemple 6.17 ? | $\Sigma=AA^\top$ |
| Ce qu'il faut ne jamais oublier après une transformation ? | **Recalculer le DOMAINE** |
