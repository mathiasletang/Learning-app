# Fiche 410 — Estimation de densité par mélanges gaussiens : responsabilités et algorithme EM

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 11 « Density Estimation with Gaussian Mixture Models » (p. 348-370) |
| **Difficulté** | Avancé — le **troisième pilier**, et le premier où **aucune solution fermée n'existe** |
| **Temps d'étude estimé** | 130 min |
| **Prérequis** | Fiche 405 (gaussiennes, Bayes) · Fiche 406 (multiplicateurs de Lagrange) · Fiche 407 (MLE, variables latentes) |
| **Concepts clés** | Estimation de densité, modèle de mélange, combinaison convexe, poids de mélange, mélange gaussien (GMM), multimodalité, log-vraisemblance non factorisable, responsabilité, affectation douce, responsabilité totale $N_k$, mise à jour des moyennes, des covariances, des poids, algorithme espérance-maximisation, étape E, étape M, monotonie, variable indicatrice binaire, encodage one-hot, représentation 1-parmi-$K$, multinoulli, marginalisation des latentes, a posteriori latente |
| **Poids à l'examen** | $p(x\mid\theta)=\sum_k\pi_k\mathcal N(x\mid\mu_k,\Sigma_k)$ avec $\sum_k\pi_k=1$ · la **responsabilité** $r_{nk}$ · les **trois mises à jour** $\mu_k$, $\Sigma_k$, $\pi_k$ · le cycle **E-step / M-step** · **la responsabilité EST l'a posteriori $p(z_k=1\mid x)$**. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : quand une SEULE gaussienne ne suffit plus

  §11.1 MODÈLE DE MÉLANGE      p(x) = Σk πk pk(x) ,  0 ≤ πk ≤ 1 ,  Σk πk = 1
        ⚠️ COMBINAISON CONVEXE de lois de base → permet la MULTIMODALITÉ
        GMM :  p(x | θ) = Σk πk N(x | µk, Σk)      θ = {πk, µk, Σk}
  §11.2 APPRENTISSAGE PAR MAXIMUM DE VRAISEMBLANCE
        L = Σn log ( Σk πk N(xn | µk, Σk) )
        ⚠️ le LOG NE PEUT PAS ENTRER dans la somme → PAS de solution fermée
        RESPONSABILITÉ  r_nk = πk N(xn|µk,Σk) / Σj πj N(xn|µj,Σj)
              ⚠️ vecteur de PROBABILITÉ : Σk r_nk = 1  →  AFFECTATION DOUCE
              N_k := Σn r_nk = responsabilité TOTALE de la composante k
        MISE À JOUR DES MOYENNES     µk = (1/Nk) Σn r_nk xn
        MISE À JOUR DES COVARIANCES  Σk = (1/Nk) Σn r_nk (xn − µk)(xn − µk)ᵀ
        MISE À JOUR DES POIDS        πk = Nk / N          ← via LAGRANGE
        ⚠️ les trois dépendent des r_nk, qui dépendent des trois → ITÉRER
  §11.3 ALGORITHME EM  (Dempster et al., 1977)
        1. INITIALISER  µk, Σk, πk
        2. ÉTAPE E : évaluer les r_nk avec les paramètres COURANTS
        3. ÉTAPE M : réestimer µk, Σk, πk avec les r_nk COURANTES
        4. répéter jusqu'à convergence
        ⚠️ CHAQUE étape AUGMENTE la log-vraisemblance (Neal & Hinton, 1999)
  §11.4 PERSPECTIVE VARIABLE LATENTE — latente DISCRÈTE (contraste avec l'ACP)
        z ∈ {0,1}^K , ONE-HOT ,  p(zk = 1) = πk ,  p(x | zk = 1) = N(x | µk, Σk)
        VRAISEMBLANCE  p(x|θ) = Σz p(x|θ,z) p(z|θ) = Σk πk N(x|µk,Σk)   ← LE MÊME MODÈLE
        A POSTERIORI   p(zk = 1 | x) = πk N(x|µk,Σk) / Σj πj N(x|µj,Σj)
        ⚠️⚠️ C'EST EXACTEMENT LA RESPONSABILITÉ

LA LEÇON CENTRALE   La RESPONSABILITÉ n'est pas une astuce de calcul :
                    c'est la LOI A POSTERIORI de la variable latente.
```

> **La motivation.** *« En estimation de densité, on représente les données **de façon COMPACTE** par une densité d'une famille paramétrique. »* Mais *« la gaussienne (comme toutes les lois rencontrées jusqu'ici) a des **capacités de modélisation LIMITÉES** : une approximation gaussienne de la densité qui a généré les données de la figure 11.1 serait une **MAUVAISE approximation**. »*

## 🔴 Concept 1 — Le modèle de mélange (§11.1)

$$\boxed{\;p(x)=\sum_{k=1}^{K}\pi_kp_k(x),\qquad 0\leqslant\pi_k\leqslant1,\qquad\sum_{k=1}^{K}\pi_k=1\;}$$

*« Une **COMBINAISON CONVEXE** de $K$ lois simples (de base). »* Les $p_k$ appartiennent à une famille de base (gaussiennes, Bernoulli, gamma…) et les $\pi_k$ sont les **POIDS DE MÉLANGE**.

> **LA raison d'être.** *« Les modèles de mélange sont **PLUS EXPRESSIFS** que les lois de base correspondantes, car ils permettent des représentations **MULTIMODALES** : ils peuvent décrire des jeux de données à **plusieurs "CLUSTERS"**. »*

**Le mélange gaussien (GMM) :**

$$\boxed{\;p(x\mid\theta)=\sum_{k=1}^{K}\pi_k\,\mathcal N(x\mid\mu_k,\Sigma_k),\qquad\theta:=\{\pi_k,\mu_k,\Sigma_k:k=1,\dots,K\}\;}$$

**L'exemple de la figure 11.2** — un mélange à trois composantes :

$$p(x\mid\theta)=0{,}5\,\mathcal N\!\left(x\ \middle|\ -2,\ \tfrac12\right)+0{,}2\,\mathcal N(x\mid1,\ 2)+0{,}3\,\mathcal N(x\mid4,\ 1)$$

<details><summary>Contrôles : normalisation et moyenne du mélange</summary>

Intégration numérique sur $[-30,40]$ avec $400\,000$ points (règle du point milieu) :

$$\int p(x)\,dx=1{,}00000000\quad\text{}$$

$$\mathbb E[x]_{\text{numérique}}=0{,}400000\qquad\text{formule : }0{,}5(-2)+0{,}2(1)+0{,}3(4)=0{,}4\quad\text{}$$

⚠️ Un mélange de **densités** est bien une densité — mais **la moyenne n'est PAS un mode** : ici $0{,}4$ tombe dans un **creux** entre les composantes.

</details>

## 🔴 Concept 2 — Pourquoi il n'y a pas de solution fermée (§11.2)

**La vraisemblance factorisée** (hypothèse i.i.d.) :

$$p(\mathcal X\mid\theta)=\prod_{n=1}^{N}p(x_n\mid\theta),\qquad p(x_n\mid\theta)=\sum_{k=1}^{K}\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)$$

**La log-vraisemblance :**

$$\boxed{\;\mathcal L=\log p(\mathcal X\mid\theta)=\sum_{n=1}^{N}\log\underbrace{\left(\sum_{k=1}^{K}\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)\right)}_{\text{ une SOMME sous le LOG}}\;}$$

> ⚠️ **LE BLOCAGE, expliqué par le livre.** *« Notre procédure "**NORMALE**" serait de calculer le gradient $d\mathcal L/d\theta$, l'annuler et résoudre. Mais contrairement aux exemples précédents (la régression linéaire du §9.2), **on ne peut PAS obtenir de solution en FORME FERMÉE**. »*

> **La comparaison qui éclaire tout.** *« Si l'on considérait une **SEULE gaussienne**, la somme sur $k$ **DISPARAÎT** et le log peut s'appliquer **DIRECTEMENT** à la composante gaussienne »* :
>
> $$\log\mathcal N(x\mid\mu,\Sigma)=-\frac D2\log(2\pi)-\frac12\log\det\Sigma-\frac12(x-\mu)^\top\Sigma^{-1}(x-\mu)$$
>
> **Tout est alors quadratique et se résout d'un coup.** C'est **la somme sur $k$ à l'intérieur du log** qui casse cette possibilité.

> **La parade.** *« On peut exploiter un **SCHÉMA ITÉRATIF**... **L'IDÉE CLÉ est de mettre à jour UN paramètre à la fois en GARDANT les autres FIXÉS.** »*

**L'exemple courant du chapitre** (figure 11.3) :

$$\mathcal X=\{-3,\ -2{,}5,\ -1,\ 0,\ 2,\ 4,\ 5\}\qquad(N=7,\ K=3)$$

$$p_1=\mathcal N(x\mid-4,\ 1),\quad p_2=\mathcal N(x\mid0,\ 0{,}2),\quad p_3=\mathcal N(x\mid8,\ 3),\quad\pi_1=\pi_2=\pi_3=\tfrac13$$

## 🔴 Concept 3 — Les responsabilités (§11.2.1)

$$\boxed{\;r_{nk}:=\frac{\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)}{\sum_{j=1}^{K}\pi_j\mathcal N(x_n\mid\mu_j,\Sigma_j)}\;}$$

> **La définition.** *« La **RESPONSABILITÉ** de la $k$-ième composante pour le $n$-ième point. Elle est **PROPORTIONNELLE À LA VRAISEMBLANCE** $\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)$ de la composante étant donné le point. Les composantes ont donc une **haute responsabilité** pour un point quand celui-ci **pourrait être un échantillon PLAUSIBLE** de cette composante. »*

**Les trois propriétés :**

| Propriété | Énoncé |
|---|---|
| **Vecteur de probabilité** | $r_n:=[r_{n1},\dots,r_{nK}]^\top\in\mathbb R^K$ avec $\sum_kr_{nk}=1$ et $r_{nk}\geqslant0$ |
| **Affectation douce** | *« Ce vecteur **DISTRIBUE la masse de probabilité** parmi les $K$ composantes : on peut penser à $r_n$ comme à une **"AFFECTATION DOUCE" (*soft assignment*)** de $x_n$ »* |
| **Interprétation probabiliste** | *« $r_{nk}$ représente la **PROBABILITÉ que $x_n$ ait été GÉNÉRÉ par la $k$-ième composante** »* |

**La responsabilité totale :**

$$\boxed{\;N_k:=\sum_{n=1}^{N}r_{nk}\qquad\text{avec}\qquad\sum_{k=1}^{K}N_k=N\;}$$

**Exemple 11.2 — la matrice des responsabilités.** Pour le jeu courant, $R\in\mathbb R^{7\times3}$ :

$$R=\begin{bmatrix}1{,}0&0{,}0&0{,}0\\1{,}0&0{,}0&0{,}0\\0{,}057&0{,}943&0{,}0\\0{,}001&0{,}999&0{,}0\\0{,}0&0{,}066&0{,}934\\0{,}0&0{,}0&1{,}0\\0{,}0&0{,}0&1{,}0\end{bmatrix}$$

**La lecture, ligne et colonne :**

| Lecture | Ce qu'elle donne |
|---|---|
| **Une LIGNE $n$** | Les responsabilités de **toutes** les composantes pour $x_n$ ; **elle somme à 1** |
| **Une COLONNE $k$** | Un aperçu de la responsabilité de la composante $k$ **sur tout le jeu** |
| **Somme d'une colonne** | **$N_k$**, la responsabilité totale |

*« On voit que la **troisième composante n'est responsable d'AUCUN des quatre premiers points**, mais prend **beaucoup** de responsabilité des points restants. »*

<details class="details--riche">
<summary>

Reproduction exacte de la matrice, et une petite divergence dans $N_k$

</summary>

Recalcul à pleine précision depuis les paramètres initiaux :

| $x_n$ | $r_{n1}$ | $r_{n2}$ | $r_{n3}$ | somme |
|---|---|---|---|---|
| $-3{,}0$ | $0{,}9999999977$ | $\approx0$ | $\approx0$ | $1{,}0$ |
| $-2{,}5$ | $0{,}9999988536$ | $\approx0$ | $\approx0$ | $1{,}0$ |
| $-1{,}0$ | $0{,}0570694724$ | $0{,}9429$ | $\approx0$ | $1{,}0$ |
| $0{,}0$ | $0{,}0001500000$ | $0{,}9999$ | $\approx0$ | $1{,}0$ |
| $2{,}0$ | $0{,}0000099371$ | $0{,}0662$ | $0{,}9338$ | $1{,}0$ |
| $4{,}0$ | $\approx0$ | $\approx0$ | $1{,}0$ | $1{,}0$ |
| $5{,}0$ | $\approx0$ | $\approx0$ | $1{,}0$ | $1{,}0$ |

⚠️ **La matrice est reproduite à l'identique** aux arrondis du livre près.

**Une divergence de troisième décimale sur $N_k$.** Calcul exact : $N_1=2{,}057228$, $N_2=2{,}009008$, $N_3=2{,}933763$. Le livre imprime $N_1=2{,}058$, $N_2=2{,}008$, $N_3=2{,}934$. Noter que **la somme de la première colonne de la matrice IMPRIMÉE par le livre** vaut $1{,}0+1{,}0+0{,}057=2{,}057$ — donc le $2{,}058$ annoncé **ne concorde ni avec la matrice du livre ni avec le calcul exact**. Les deux jeux somment bien à $7=N$ et **toutes les mises à jour en aval concordent**, donc c'est sans conséquence.

</details>

## 🔴 Concept 4 — Les trois mises à jour (§11.2.2-11.2.4)

### 4.1 Les moyennes — Théorème 11.1

$$\boxed{\;\mu_k^{\text{nouveau}}=\frac{\sum_{n=1}^{N}r_{nk}x_n}{\sum_{n=1}^{N}r_{nk}}=\frac{1}{N_k}\sum_{n=1}^{N}r_{nk}x_n\;}$$

**Le pas clé de la preuve** — seule la $k$-ième composante dépend de $\mu_k$ :

$$\frac{\partial p(x_n\mid\theta)}{\partial\mu_k}=\pi_k\frac{\partial\mathcal N(x_n\mid\mu_k,\Sigma_k)}{\partial\mu_k}=\pi_k(x_n-\mu_k)^\top\Sigma_k^{-1}\mathcal N(x_n\mid\mu_k,\Sigma_k)$$

> **LES TROIS INTERPRÉTATIONS, données par le livre.**
>
> 1. **Estimateur de Monte-Carlo pondéré par importance** : *« les poids d'importance du point $x_n$ sont les **responsabilités** $r_{nk}$ »*.
> 2. **Attraction** : *« La moyenne $\mu_k$ est **TIRÉE VERS un point $x_n$ avec une FORCE donnée par $r_{nk}$**. Les moyennes sont tirées **plus fortement** vers les points pour lesquels la composante a une **haute responsabilité**. »*
> 3. **Espérance sous une loi induite** : avec $r_k:=[r_{1k},\dots,r_{Nk}]^\top/N_k$, un vecteur de probabilité normalisé, $$\boxed{\;\mu_k\leftarrow\mathbb E_{r_k}[\mathcal X]\;}$$

> ⚠️ **La remarque qui explique tout le chapitre.** *« La mise à jour des $\mu_k$ **dépend de TOUTES les moyennes, covariances et poids** via $r_{nk}$. On **NE PEUT DONC PAS** obtenir de solution fermée pour tous les $\mu_k$ **d'un coup**. »*

**Exemple 11.3 :** $\mu_1:-4\to-2{,}7$ ; $\mu_2:0\to-0{,}4$ ; $\mu_3:8\to3{,}7$. *« Les moyennes de la première et de la troisième composante **se déplacent vers le régime des données**, alors que celle de la deuxième **ne change pas si dramatiquement**. »*

### 4.2 Les covariances — Théorème 11.2

$$\boxed{\;\Sigma_k^{\text{nouveau}}=\frac{1}{N_k}\sum_{n=1}^{N}r_{nk}(x_n-\mu_k)(x_n-\mu_k)^\top\;}$$

> **L'interprétation parallèle.** *« Comme pour $\mu_k$, on peut interpréter cette mise à jour comme une **espérance PONDÉRÉE PAR IMPORTANCE du CARRÉ des données CENTRÉES** $\tilde{\mathcal X}_k:=\{x_1-\mu_k,\dots,x_N-\mu_k\}$. »*

**Exemple 11.4 :** $\sigma_1^2:1\to0{,}14$ ; $\sigma_2^2:0{,}2\to0{,}44$ ; $\sigma_3^2:3\to1{,}53$. *« Les variances de la première et de la troisième composante **RÉTRÉCISSENT significativement**, alors que celle de la deuxième **AUGMENTE légèrement**. »*

### 4.3 Les poids — Théorème 11.3

$$\boxed{\;\pi_k^{\text{nouveau}}=\frac{N_k}{N}\;}$$

> **Le seul endroit où Lagrange intervient.** *« Pour trouver la dérivée partielle par rapport aux $\pi_k$, on doit **tenir compte de la CONTRAINTE $\sum_k\pi_k=1$** en utilisant les **MULTIPLICATEURS DE LAGRANGE** (§7.2) »* :
>
> $$\mathfrak L=\mathcal L+\lambda\left(\sum_{k=1}^{K}\pi_k-1\right)$$

⚠️ La formule est d'une simplicité remarquable : **la fraction de responsabilité totale**.

**Exemple 11.5 :** $\pi_1:\tfrac13\to0{,}29$ ; $\pi_2:\tfrac13\to0{,}29$ ; $\pi_3:\tfrac13\to0{,}42$. *« La troisième composante gagne **plus de poids/importance**. »*

<details><summary>Reproduction exacte des trois mises à jour</summary>

| Paramètre | Calcul à pleine précision | Valeur du livre |
|---|---|---|
| $\mu$ | $[-2{,}7012\ ;\ -0{,}4034\ ;\ 3{,}7043]$ | $[-2{,}7\ ;\ -0{,}4\ ;\ 3{,}7]$ |
| $\sigma^2$ | $[0{,}1440\ ;\ 0{,}4385\ ;\ 1{,}5266]$ | $[0{,}14\ ;\ 0{,}44\ ;\ 1{,}53]$ |
| $\pi$ | $[0{,}2939\ ;\ 0{,}2870\ ;\ 0{,}4191]$ | $[0{,}29\ ;\ 0{,}29\ ;\ 0{,}42]$ |

⚠️ **Les trois arrondissent EXACTEMENT** aux valeurs annoncées, et $\sum_k\pi_k=1{,}0$ à la précision machine. **L'ordre compte** : les variances de l'exemple 11.4 se calculent avec les **NOUVELLES** moyennes de l'exemple 11.3.

</details>

## 🔴 Concept 5 — L'algorithme EM (§11.3)

> **Le diagnostic.** *« Les mises à jour **NE CONSTITUENT PAS une solution en forme fermée**, parce que les responsabilités $r_{nk}$ **dépendent de ces paramètres de façon COMPLEXE**. Mais les résultats **SUGGÈRENT un schéma ITÉRATIF simple**. »*

*L'algorithme d'**ESPÉRANCE-MAXIMISATION** a été proposé par **Dempster** et al. **(1977)** ; c'est *« un schéma itératif GÉNÉRAL pour apprendre les paramètres (maximum de vraisemblance ou MAP) dans les modèles de mélange et, **plus généralement, les modèles à VARIABLES LATENTES** »*.

**L'algorithme pour un GMM :**

**Étape 1 — INITIALISER** $\mu_k$, $\Sigma_k$, $\pi_k$.

**Étape 2 — ÉTAPE E.** *« Évaluer les responsabilités $r_{nk}$ pour chaque point avec les paramètres COURANTS »* — c'est la **probabilité A POSTERIORI que le point $n$ appartienne à la composante $k$** :

$$\boxed{\;r_{nk}=\frac{\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)}{\sum_j\pi_j\mathcal N(x_n\mid\mu_j,\Sigma_j)}\;}$$

**Étape 3 — ÉTAPE M.** *« Réestimer les paramètres avec les responsabilités COURANTES »* :

$$\mu_k=\frac{1}{N_k}\sum_nr_{nk}x_n,\qquad\Sigma_k=\frac{1}{N_k}\sum_nr_{nk}(x_n-\mu_k)(x_n-\mu_k)^\top,\qquad\pi_k=\frac{N_k}{N}$$

**Étape 4 — répéter jusqu'à convergence.**

> **LA GARANTIE.** *« **CHAQUE étape de l'algorithme EM AUGMENTE la fonction de LOG-VRAISEMBLANCE** (Neal et Hinton, 1999). »* *« Pour la convergence, on peut vérifier **la log-vraisemblance ou les paramètres directement**. »*

**Exemple 11.6.** *« Après **CINQ itérations**, l'algorithme EM converge. »*

<details><summary>Reproduction de la trajectoire EM et test de monotonie</summary>

Log-vraisemblance **négative** (plus bas est meilleur) par itération :

| Itération | $-\mathcal L$ | $\mu$ |
|---|---|---|
| $0$ | $28{,}3255$ | $[-4{,}000\ ;\ 0{,}000\ ;\ 8{,}000]$ |
| $1$ | $14{,}4105$ | $[-2{,}701\ ;\ -0{,}403\ ;\ 3{,}704]$ |
| $2$ | $13{,}9771$ | $[-2{,}750\ ;\ -0{,}501\ ;\ 3{,}655]$ |
| $3$ | $13{,}9733$ | $[-2{,}750\ ;\ -0{,}504\ ;\ 3{,}647]$ |
| $4$ | $13{,}9733$ | $[-2{,}750\ ;\ -0{,}504\ ;\ 3{,}645]$ |
| $5$ | $13{,}9733$ | $[-2{,}750\ ;\ -0{,}504\ ;\ 3{,}645]$ |

⚠️ **La convergence en cinq itérations est confirmée** — la log-vraisemblance est stable à quatre décimales dès l'itération 3, et les paramètres dès l'itération 4. Cohérent avec la figure 11.8(b).

**Test de MONOTONIE** : sur **30 itérations**, aucune violation de $\mathcal L^{(t+1)}\geqslant\mathcal L^{(t)}$ — la garantie de Neal et Hinton est vérifiée numériquement.

⚠️ Noter aussi le **saut initial énorme** : la première itération fait chuter $-\mathcal L$ de $28{,}33$ à $14{,}41$, soit **plus de la moitié du gain total** en une seule passe.

</details>

**Le second exemple (figures 11.9-11.10) — un jeu bidimensionnel, 3 composantes, convergence en 62 itérations.** *« Alors qu'une **SEULE** composante est clairement responsable des données de gauche, le **CHEVAUCHEMENT des deux clusters de droite** pourrait avoir été généré par **DEUX** composantes. Il devient clair qu'il y a des points **qui ne peuvent PAS être affectés de façon UNIQUE** à une seule composante — les responsabilités de ces deux clusters sont alors **autour de $0{,}5$**. »*

## 🔴 Concept 6 — La perspective variable latente (§11.4)

### 6.1 Le contraste avec l'ACP

> **La différence structurelle.** *« On peut voir le GMM comme un modèle à variable latente **DISCRÈTE** — où $z$ ne peut prendre qu'un **ensemble FINI de valeurs**. C'est **en CONTRASTE avec l'ACP**, où les variables latentes étaient des nombres **CONTINUS dans $\mathbb R^M$**. »*

### 6.2 Le processus génératif

> **L'hypothèse fondatrice.** *« Un point $x$ peut être généré par **EXACTEMENT UNE** composante de mélange. »*

On introduit une **variable indicatrice BINAIRE** $z_k\in\{0,1\}$ :

$$\boxed{\;p(x\mid z_k=1)=\mathcal N(x\mid\mu_k,\Sigma_k)\;}$$

$$\boxed{\;z:=[z_1,\dots,z_K]^\top\in\mathbb R^K\ \text{avec }K-1\text{ zéros et EXACTEMENT UN }1\;}$$

⚠️ Par exemple pour $K=3$, $z=[0,1,0]^\top$ **sélectionne la deuxième composante**. Comme $\sum_kz_k=1$, $z$ est un **ENCODAGE ONE-HOT** (aussi : **représentation 1-parmi-$K$**).

> ⚠️ **Le nom de cette loi.** *« Ce genre de loi est parfois appelé "**MULTINOULLI**", une généralisation de la Bernoulli à **plus de deux valeurs** »* (Murphy, 2012).

**L'a priori sur la latente :**

$$\boxed{\;p(z)=\pi=[\pi_1,\dots,\pi_K]^\top,\qquad\sum_k\pi_k=1,\qquad\pi_k=p(z_k=1)\;}$$

*« $\pi_k$ décrit la **PROBABILITÉ que la $k$-ième composante ait généré** le point $x$. »*

### 6.3 La vraisemblance — le modèle est le même

On **marginalise la latente** (§8.4.3) :

$$p(x\mid\theta)=\sum_zp(x\mid\theta,z)\,p(z\mid\theta)$$

> **Le pas de simplification.** *« Puisqu'il n'y a qu'**UNE SEULE entrée non nulle** dans chaque $z$, il n'y a que **$K$ configurations possibles**. Sommer sur toutes les configurations **équivaut à regarder l'entrée non nulle** »* :

$$p(x\mid\theta)=\sum_{k=1}^{K}p(x\mid\theta,z_k=1)\,p(z_k=1\mid\theta)$$

$$\boxed{\;p(x\mid\theta)=\sum_{k=1}^{K}\pi_k\,\mathcal N(x\mid\mu_k,\Sigma_k)\;}$$

⚠️ *« qu'on **IDENTIFIE au modèle GMM** de (11.3). »* Et sur tout le jeu :

$$p(\mathcal X\mid\theta)=\prod_{n=1}^{N}\sum_{k=1}^{K}\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)$$

$$\boxed{\;\text{Le modèle à indicateurs latents est une façon ÉQUIVALENTE de penser un GMM.}\;}$$

### 6.4 L'a posteriori — LA révélation

Par le théorème de Bayes :

$$p(z_k=1\mid x)=\frac{p(z_k=1)\,p(x\mid z_k=1)}{\sum_{j=1}^{K}p(z_j=1)\,p(x\mid z_j=1)}$$

$$\boxed{\;p(z_k=1\mid x)=\frac{\pi_k\mathcal N(x\mid\mu_k,\Sigma_k)}{\sum_{j=1}^{K}\pi_j\mathcal N(x\mid\mu_j,\Sigma_j)}\;}$$

> **LE POINT CULMINANT DU CHAPITRE.** *« ...qu'on **IDENTIFIE comme la RESPONSABILITÉ** de la $k$-ième composante pour le point $x$. »*
>
> $$\boxed{\;r_{nk}=p(z_{nk}=1\mid x_n)\;}$$
>
> La responsabilité **n'était donc pas une astuce de calcul** : c'est **la LOI A POSTERIORI de la variable latente**. C'est exactement pourquoi l'étape E s'appelle l'étape « **espérance** ».

### 6.5 Extension à tout le jeu de données

*« Dans l'interprétation probabiliste, **chaque point $x_n$ possède SA PROPRE variable latente** $z_n=[z_{n1},\dots,z_{nK}]^\top\in\mathbb R^K$. »* *« On **PARTAGE le même a priori $\pi$** entre toutes les variables latentes $z_n$ »* — d'où la **notation en PLAQUES** de la figure 11.12 : $\pi$ hors de la plaque, $z_n$ et $x_n$ dedans, $\mu_k$ et $\Sigma_k$ dans une plaque sur $k$.

$$p(x_1,\dots,x_N\mid z_1,\dots,z_N)=\prod_{n=1}^{N}p(x_n\mid z_n)$$

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Une gaussienne ne suffit pas » | **§11.1** | Passer à un **mélange** : $\sum_k\pi_kp_k(x)$ |
| « Vérifier que c'est une densité » | **§11.1** | $\pi_k\geqslant0$ **et** $\sum_k\pi_k=1$ — c'est une **combinaison CONVEXE** |
| « Écrire la log-vraisemblance » | **§11.2** | $\sum_n\log\big(\sum_k\pi_k\mathcal N\big)$ ; **le log ne rentre PAS** |
| « Pourquoi pas de solution fermée ? » | **§11.2** | La **somme sur $k$ SOUS le log** ; les $r_{nk}$ dépendent de tous les paramètres |
| « Calculer les responsabilités » | **§11.2.1** | $r_{nk}=\dfrac{\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)}{\sum_j\pi_j\mathcal N(x_n\mid\mu_j,\Sigma_j)}$ ; **contrôle : chaque ligne somme à 1** |
| « Que vaut $N_k$ ? » | **§11.2.1** | La **somme d'une COLONNE** de $R$ ; $\sum_kN_k=N$ |
| « Mettre à jour les moyennes » | **Th. 11.1** | $\mu_k=\frac{1}{N_k}\sum_nr_{nk}x_n$ |
| « Mettre à jour les covariances » | **Th. 11.2** | $\Sigma_k=\frac{1}{N_k}\sum_nr_{nk}(x_n-\mu_k)(x_n-\mu_k)^\top$ ; avec les **NOUVELLES** $\mu_k$ |
| « Mettre à jour les poids » | **Th. 11.3** | $\pi_k=N_k/N$ ; dérivé par **LAGRANGE** |
| « Décrire l'algorithme EM » | **§11.3** | Initialiser · **E** (responsabilités) · **M** (paramètres) · répéter |
| « L'algorithme converge-t-il ? » | **§11.3** | **Chaque étape AUGMENTE** la log-vraisemblance ; vers un **optimum LOCAL** |
| « Écrire le modèle latent » | **§11.4.1** | $z$ **one-hot**, $p(z_k=1)=\pi_k$, $p(x\mid z_k=1)=\mathcal N(\mu_k,\Sigma_k)$ |
| « Retrouver le GMM depuis le modèle latent » | **§11.4.2** | **Marginaliser $z$** : la somme sur les $K$ configurations donne le mélange |
| « Que vaut $p(z_k=1\mid x)$ ? » | **§11.4.3** | **EXACTEMENT la responsabilité** $r_{nk}$ |
| « Dessiner le modèle graphique » | **§11.4.4** | $\pi\to z_n\to x_n$ ; plaque sur $n$ ; $\mu_k,\Sigma_k$ dans une plaque sur $k$ |

## Comment résoudre : les quatre méthodes pas-à-pas

**Méthode A — Un tour complet d'EM à la main.**

1. Écrire les paramètres courants $\{\pi_k,\mu_k,\Sigma_k\}$.
2. **Étape E** : pour chaque $n$ et $k$, calculer $\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)$.
3. **Normaliser chaque ligne** pour obtenir $r_{nk}$ ; **contrôler que chaque ligne somme à 1**.
4. Calculer $N_k=\sum_nr_{nk}$ ; **contrôler $\sum_kN_k=N$**.
5. **Étape M** : $\mu_k$ d'abord, **puis** $\Sigma_k$ avec ces nouvelles $\mu_k$, **puis** $\pi_k=N_k/N$.
6. **Contrôle** : la log-vraisemblance doit avoir **augmenté**.

**Méthode B — Diagnostiquer un GMM.**

1. Regarder la matrice $R$ : des lignes **proches de $[1,0,0]$** signalent une affectation **nette** ; des lignes proches de **$[0{,}5;0{,}5]$** un **chevauchement**.
2. Regarder les $N_k$ : un $N_k$ **très petit** signale une composante **mourante**.
3. Regarder les $\Sigma_k$ : une variance qui **tend vers $0$** signale une composante **collapsée sur un point** (singularité classique du MLE des GMM).
4. Tracer la log-vraisemblance par itération : elle doit être **monotone**.

**Méthode C — Passer du mélange au modèle latent.**

1. Introduire $z$ **one-hot** de dimension $K$.
2. Poser l'a priori $p(z_k=1)=\pi_k$.
3. Poser la conditionnelle $p(x\mid z_k=1)=\mathcal N(\mu_k,\Sigma_k)$.
4. **Marginaliser** : $\sum_zp(x\mid z)p(z)=\sum_k\pi_k\mathcal N(\mu_k,\Sigma_k)$.
5. **Conditionner** (Bayes) pour retrouver **la responsabilité**.

**Méthode D — Vérifier une densité de mélange.**

1. Chaque $p_k$ est-elle une densité ?
2. $\pi_k\geqslant0$ pour tout $k$ ?
3. $\sum_k\pi_k=1$ ?
4. **Contrôle numérique** : intégrer $p(x)$ et vérifier $=1$.
5. Moyenne du mélange : $\sum_k\pi_k\mu_k$ ; **elle peut tomber dans un CREUX**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire qu'un mélange de gaussiennes est gaussien | **NON** — c'est précisément ce qui le rend **MULTIMODAL** et expressif |
| Oublier la contrainte $\sum_k\pi_k=1$ | Sans elle $p(x)$ **n'intègre pas à 1** ; c'est aussi elle qui **impose Lagrange** |
| Faire entrer le log dans la somme | $\log\sum_k\neq\sum_k\log$ — **c'est LA raison** de l'absence de solution fermée |
| Croire qu'une seule gaussienne pose le même problème | **NON** : la somme disparaît, le log s'applique directement, tout devient **quadratique** |
| Oublier de normaliser les responsabilités | Chaque **LIGNE** de $R$ doit sommer à $1$ |
| Sommer les responsabilités par ligne pour obtenir $N_k$ | $N_k$ est la somme d'une **COLONNE** |
| Croire $N_k$ entier | C'est une **affectation DOUCE** : $N_k$ est un réel |
| Traiter les $r_{nk}$ comme des constantes lors de la dérivation | Elles dépendent de **tous** les paramètres — d'où l'itération |
| Calculer $\Sigma_k$ avec les anciennes moyennes | Utiliser les **NOUVELLES** $\mu_k$ (ordre de l'étape M) |
| Diviser par $N$ au lieu de $N_k$ dans $\mu_k$ et $\Sigma_k$ | C'est $N_k$ — la **responsabilité TOTALE de la composante** |
| Diviser par $N_k$ dans $\pi_k$ | C'est $\pi_k=N_k/\mathbf N$ — le **nombre total de points** |
| Oublier Lagrange pour les poids | Sans la contrainte, la maximisation **ne donnerait pas** $N_k/N$ |
| Croire qu'EM converge vers l'optimum global | **Optimum LOCAL** — le résultat dépend de **l'initialisation** |
| Croire qu'EM peut faire baisser la vraisemblance | **Chaque étape l'AUGMENTE** (Neal & Hinton, 1999) — une baisse signale un **bug** |
| Confondre étapes E et M | **E** = calculer les **responsabilités** (les latentes) · **M** = réestimer les **paramètres** |
| Croire les responsabilités binaires | **Affectation DOUCE** : un point ambigu a des responsabilités **autour de $0{,}5$** |
| Croire la latente du GMM continue | Elle est **DISCRÈTE** (one-hot) — c'est le **contraste avec l'ACP** |
| Croire que $z$ peut avoir plusieurs $1$ | **Exactement UN** : $\sum_kz_k=1$ |
| Sommer sur $2^K$ configurations de $z$ | Il n'y a que **$K$** configurations one-hot valides |
| Croire que le modèle latent est un modèle différent | *« Une façon **ÉQUIVALENTE** de penser un GMM »* |
| Croire que la responsabilité est une astuce de calcul | C'est **LA LOI A POSTERIORI** $p(z_k=1\mid x)$ |
| Donner un $\pi$ différent à chaque point | *« On **PARTAGE le même a priori $\pi$** »* — d'où la plaque |
| Croire que la moyenne du mélange est un mode | Elle peut tomber dans un **CREUX** entre composantes |

## 📌 Ultimate Review

```
════════ LES SIX FORMULES À SAVOIR SANS HÉSITER ════════
  1.  MÉLANGE   p(x) = Σk πk pk(x) ,  πk ≥ 0 ,  Σk πk = 1
      GMM       p(x|θ) = Σk πk N(x | µk, Σk)
  2.  LOG-VRAISEMBLANCE   L = Σn log( Σk πk N(xn | µk, Σk) )
      ⚠️ le LOG ne rentre PAS → PAS de solution fermée
  3.  RESPONSABILITÉ   r_nk = πk N(xn|µk,Σk) / Σj πj N(xn|µj,Σj)
      Σk r_nk = 1  (par LIGNE)      N_k = Σn r_nk  (par COLONNE) ,  Σk N_k = N
  4.  ÉTAPE M   µk = (1/Nk) Σn r_nk xn
                Σk = (1/Nk) Σn r_nk (xn − µk)(xn − µk)ᵀ
                πk = Nk / N                          ← via LAGRANGE
  5.  EM   initialiser → E (responsabilités) → M (paramètres) → répéter
           ⚠️ chaque étape AUGMENTE la log-vraisemblance
  6.  LATENT   z one-hot ,  p(zk = 1) = πk ,  p(x | zk = 1) = N(µk, Σk)
      MARGINALISER → le GMM      CONDITIONNER → la RESPONSABILITÉ
═════════════════════════════════════════════════════════
```

**LES TROIS PILIERS COMPARÉS :**

|  | **Régression** (ch. 9) | **ACP** (ch. 10) | **GMM** (ch. 11) |
|---|---|---|---|
| Tâche | Prédire $y$ | Compresser $x$ | **Estimer une densité** |
| Latente | — (ou $\theta$ en bayésien) | **Continue** $z\in\mathbb R^M$ | **Discrète** one-hot |
| Solution | **Fermée** ($\theta_{\text{ML}}$) | **Fermée** (vecteurs propres) | **ITÉRATIVE (EM)** |
| Obstacle | — | — | Le **log d'une somme** |
| Optimum | **Global** (objectif quadratique) | **Global** (spectral) | **LOCAL** |

**LE CYCLE EM, terme à terme :**

| Étape | Ce qu'on fixe | Ce qu'on calcule | Nature |
|---|---|---|---|
| **E** | Les paramètres $\theta$ | Les **responsabilités** $r_{nk}$ | **A posteriori** des latentes |
| **M** | Les responsabilités $r_{nk}$ | Les paramètres $\mu_k,\Sigma_k,\pi_k$ | **Maximum de vraisemblance pondéré** |

**Les trois lectures d'une responsabilité :**

| Lecture | Énoncé |
|---|---|
| **Algorithmique** | Un **poids d'importance** dans les moyennes pondérées de l'étape M |
| **Géométrique** | La **force d'attraction** de $x_n$ sur $\mu_k$ |
| **Probabiliste** | **LA LOI A POSTERIORI** $p(z_{nk}=1\mid x_n)$ |

**Ce que chaque chapitre antérieur apporte ici :**

| Chapitre | Ce qu'il fournit |
|---|---|
| **5** — calcul vectoriel | Les **gradients** des trois preuves |
| **6** — probabilités | La **gaussienne**, le **théorème de Bayes**, la **marginalisation** |
| **7** — optimisation | Les **multiplicateurs de LAGRANGE** pour les poids |
| **8** — modèles et données | **MLE**, **variables latentes**, **modèles graphiques**, **plaques** |
| **10** — ACP | Le **contraste** latente continue / latente discrète |

## 🧠 Active Recall

**Modèle de mélange**

1. Pourquoi une gaussienne ne suffit-elle pas toujours ?
2. Écrire un modèle de mélange et ses deux contraintes.
3. Pourquoi les mélanges sont-ils plus expressifs ?
4. Écrire un GMM. Quels sont ses paramètres ?
5. Donner le mélange de la figure 11.2.

**Le blocage** 6. Écrire la vraisemblance factorisée et la log-vraisemblance. 7. Pourquoi la procédure « normale » échoue-t-elle ? 8. Que se passerait-il avec une seule gaussienne ? 9. Quelle est l'idée clé de la parade ? 10. Donner le jeu de données et l'initialisation de l'exemple courant.

**Responsabilités** 11. Écrire $r_{nk}$. À quoi est-elle proportionnelle ? 12. Quelles sont ses trois propriétés ? 13. Que signifie « affectation douce » ? 14. Comment lit-on une ligne ? une colonne ? 15. Écrire $N_k$. Que vaut $\sum_kN_k$ ? 16. Donner les $N_k$ de l'exemple 11.2.

**Les trois mises à jour** 17. Énoncer le théorème 11.1. Quelle est la remarque qui l'accompagne ? 18. Donner les trois interprétations de la mise à jour des moyennes. 19. Énoncer le théorème 11.2 et son interprétation. 20. Énoncer le théorème 11.3. Quel outil sa preuve exige-t-elle ? 21. Donner les valeurs numériques des exemples 11.3, 11.4 et 11.5. 22. Dans quel ordre effectue-t-on les trois mises à jour ?

**EM** 23. Qui a proposé l'algorithme EM et quand ? 24. Décrire les quatre étapes. 25. Que fait l'étape E ? l'étape M ? 26. Quelle est la garantie de convergence ? Vers quel type d'optimum ? 27. Comment vérifier la convergence ? 28. En combien d'itérations converge l'exemple 11.6 ? 29. Que révèle la figure 11.10(b) sur les points ambigus ?

**Perspective latente** 30. En quoi la latente du GMM diffère-t-elle de celle de l'ACP ? 31. Écrire $z$ et ses propriétés. Comment s'appelle cet encodage ? 32. Qu'est-ce qu'une loi « multinoulli » ? 33. Écrire l'a priori et la conditionnelle. 34. Dériver la vraisemblance par marginalisation. Combien de configurations ? 35. Écrire l'a posteriori. Que reconnaît-on ? 36. Comment le modèle s'étend-il à $N$ points ? Que partage-t-on ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le troisième pilier ? | L'**ESTIMATION DE DENSITÉ** |
| Pourquoi une gaussienne ne suffit pas ? | Capacités de modélisation **LIMITÉES** — elle est **unimodale** |
| Modèle de mélange ? | $p(x)=\sum_k\pi_kp_k(x)$ |
| Les deux contraintes ? | $0\leqslant\pi_k\leqslant1$ **et** $\sum_k\pi_k=1$ |
| Le nom de cette combinaison ? | Une combinaison **CONVEXE** |
| Pourquoi plus expressif ? | Il permet des représentations **MULTIMODALES** — plusieurs **clusters** |
| Un GMM ? | $p(x\mid\theta)=\sum_k\pi_k\mathcal N(x\mid\mu_k,\Sigma_k)$ |
| Ses paramètres ? | $\theta=\{\pi_k,\mu_k,\Sigma_k:k=1,\dots,K\}$ |
| La log-vraisemblance ? | $\mathcal L=\sum_n\log\big(\sum_k\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)\big)$ |
| Pourquoi pas de solution fermée ? | **Le LOG d'une SOMME** — il ne peut pas entrer |
| Avec une seule gaussienne ? | La somme **disparaît**, le log s'applique **directement**, tout est **quadratique** |
| L'idée clé de la parade ? | **Mettre à jour UN paramètre à la fois** en gardant les autres fixés |
| Le jeu de l'exemple courant ? | $\{-3;-2{,}5;-1;0;2;4;5\}$, $N=7$, $K=3$ |
| L'initialisation ? | $\mathcal N(-4,1)$, $\mathcal N(0;0{,}2)$, $\mathcal N(8,3)$, $\pi_k=\tfrac13$ |
| La responsabilité ? | $r_{nk}=\dfrac{\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)}{\sum_j\pi_j\mathcal N(x_n\mid\mu_j,\Sigma_j)}$ |
| À quoi est-elle proportionnelle ? | À la **VRAISEMBLANCE** $\pi_k\mathcal N(x_n\mid\mu_k,\Sigma_k)$ |
| Quand est-elle élevée ? | Quand le point **pourrait être un échantillon PLAUSIBLE** de la composante |
| Que somme à 1 ? | Chaque **LIGNE** : $\sum_kr_{nk}=1$ |
| Son autre nom ? | Une **AFFECTATION DOUCE** (*soft assignment*) |
| Son sens probabiliste ? | La **probabilité que $x_n$ ait été GÉNÉRÉ par la composante $k$** |
| $N_k$ ? | $\sum_nr_{nk}$ — la **responsabilité TOTALE** de la composante $k$ |
| Comment l'obtenir sur la matrice ? | En sommant une **COLONNE** |
| $\sum_kN_k$ ? | **$N$** |
| $N_k$ est-il entier ? | **NON** — affectation **douce** |
| Les $N_k$ de l'exemple 11.2 ? | $2{,}058$ ; $2{,}008$ ; $2{,}934$ (somme $=7$) |
| Mise à jour des moyennes ? | $\mu_k^{\text{new}}=\dfrac{1}{N_k}\sum_nr_{nk}x_n$ |
| Interprétation 1 ? | Un estimateur de **Monte-Carlo PONDÉRÉ PAR IMPORTANCE** |
| Interprétation 2 ? | $\mu_k$ est **TIRÉE vers $x_n$ avec une FORCE $r_{nk}$** |
| Interprétation 3 ? | $\mu_k\leftarrow\mathbb E_{r_k}[\mathcal X]$ avec $r_k=[r_{1k},\dots,r_{Nk}]^\top/N_k$ |
| Pourquoi pas de solution fermée pour les $\mu_k$ ? | Les $r_{nk}$ dépendent de **TOUS** les paramètres |
| Mise à jour des covariances ? | $\Sigma_k^{\text{new}}=\dfrac{1}{N_k}\sum_nr_{nk}(x_n-\mu_k)(x_n-\mu_k)^\top$ |
| Son interprétation ? | Une espérance pondérée du **CARRÉ des données CENTRÉES** |
| Mise à jour des poids ? | $\pi_k^{\text{new}}=\dfrac{N_k}{N}$ |
| Quel outil pour la démontrer ? | Les **MULTIPLICATEURS DE LAGRANGE** (contrainte $\sum_k\pi_k=1$) |
| L'ordre des mises à jour ? | $\mu_k$ **d'abord**, **puis** $\Sigma_k$ avec les nouvelles $\mu_k$, **puis** $\pi_k$ |
| Les moyennes de l'exemple 11.3 ? | $-4\to-2{,}7$ · $0\to-0{,}4$ · $8\to3{,}7$ |
| Les variances de l'exemple 11.4 ? | $1\to0{,}14$ · $0{,}2\to0{,}44$ · $3\to1{,}53$ |
| Les poids de l'exemple 11.5 ? | $\tfrac13\to0{,}29$ · $\tfrac13\to0{,}29$ · $\tfrac13\to0{,}42$ |
| Qui a proposé EM ? | **Dempster** et al. **(1977)** |
| Les quatre étapes ? | **1.** initialiser **2.** étape **E** **3.** étape **M** **4.** répéter |
| Que fait l'étape E ? | Évaluer les **responsabilités** avec les paramètres **courants** |
| Que fait l'étape M ? | Réestimer $\mu_k,\Sigma_k,\pi_k$ avec les responsabilités **courantes** |
| Que garantit chaque étape ? | Elle **AUGMENTE la log-vraisemblance** (Neal & Hinton, 1999) |
| Vers quel optimum ? | Un optimum **LOCAL** |
| Comment vérifier la convergence ? | La **log-vraisemblance** ou les **paramètres** directement |
| Convergence de l'exemple 11.6 ? | En **CINQ itérations** |
| À quoi sert EM au-delà des GMM ? | À **tous les modèles à VARIABLES LATENTES** |
| Ce que montre la figure 11.10(b) ? | Des points **NON affectables uniquement** — responsabilités **autour de $0{,}5$** |
| La latente du GMM ? | **DISCRÈTE** — un ensemble **FINI** de valeurs |
| Le contraste avec l'ACP ? | L'ACP a une latente **CONTINUE** dans $\mathbb R^M$ |
| L'hypothèse fondatrice ? | Un point est généré par **EXACTEMENT UNE** composante |
| La forme de $z$ ? | $K-1$ zéros et **exactement un $1$** |
| Le nom de cet encodage ? | **ONE-HOT** (ou représentation **1-parmi-$K$**) |
| Le nom de cette loi ? | **MULTINOULLI** — généralisation de la Bernoulli |
| L'a priori latent ? | $p(z)=\pi$, avec $\pi_k=p(z_k=1)$ |
| La conditionnelle ? | $p(x\mid z_k=1)=\mathcal N(x\mid\mu_k,\Sigma_k)$ |
| Combien de configurations de $z$ ? | **$K$** seulement (une entrée non nulle) |
| Ce que donne la marginalisation ? | **EXACTEMENT le GMM** $\sum_k\pi_k\mathcal N(x\mid\mu_k,\Sigma_k)$ |
| L'a posteriori $p(z_k=1\mid x)$ ? | **EXACTEMENT la RESPONSABILITÉ** |
| Pourquoi l'étape E porte ce nom ? | Parce que la responsabilité **EST l'a posteriori de la latente** |
| Combien de latentes pour $N$ points ? | **$N$** — chacune $z_n\in\mathbb R^K$ |
| Que partage-t-on entre elles ? | **Le même a priori $\pi$** |
| Comment le représenter graphiquement ? | Avec une **PLAQUE** sur $n$ ; $\pi$ **hors** de la plaque |
| Le modèle latent est-il un autre modèle ? | **NON** — une façon **ÉQUIVALENTE** de penser le GMM |
