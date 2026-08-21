# Fiche 48 — Horizon infini : plus court chemin stochastique et équation de Bellman

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Bertsekas, *6.231 Dynamic Programming*, MIT OpenCourseWare, automne 2015 — cours 10 |
| **Difficulté** | Must know — l'équation de Bellman stationnaire, socle de la macroéconomie dynamique |
| **Temps d'étude estimé** | 2 h 15 |
| **Prérequis** | Fiches 44 à 47 (algorithme DP, politiques, structure des solutions) |
| **Concepts clés** | Coût total, actualisation, plus court chemin stochastique, terminaison inévitable, itération sur les valeurs, équation de Bellman, unicité, politique stationnaire optimale |
| **Poids à l'examen** | Deux énoncés à savoir écrire et justifier : **l'équation de Bellman a $J^\star$ pour unique solution**, et **une politique stationnaire est optimale si et seulement si elle atteint le minimum dans cette équation**. Toute la macro dynamique en découle. |

## 🎯 Vue d'ensemble

En horizon fini, la fonction de coût-à-venir $J_k$ **dépendait du temps** et la politique optimale aussi. En horizon infini, le système et le coût sont **stationnaires** : il n'y a plus d'instant privilégié, donc plus de raison que la solution dépende du temps.

```
HORIZON FINI      J_N, J_{N−1}, …, J_0     une fonction PAR ÉTAPE, récurrence à rebours
HORIZON INFINI    J*  UNE SEULE fonction, solution d'une ÉQUATION DE POINT FIXE

     J*(i) = min_u [ g(i,u) + α Σ_j p_ij(u) J*(j) ]      ← ÉQUATION DE BELLMAN
```

Trois questions se posent alors, et elles structurent tout le chapitre : cette équation a-t-elle une **solution unique** ? l'**itération sur les valeurs** y converge-t-elle ? une politique **stationnaire** optimale existe-t-elle ?

> *Caractéristiques de l'horizon infini : une analyse exigeante, mais une élégance des solutions et des algorithmes — les politiques optimales stationnaires sont probables.*

## 🟡 Concept 1 — Les types de problèmes à horizon infini

Le cadre est **le même que le problème de base**, à deux différences : le nombre d'étapes est **infini**, et le système et le coût sont **stationnaires** (à l'actualisation près).

**Problèmes de coût total** — minimiser

$$J_\pi(x_0) = \lim_{N\to\infty}\ \mathbb{E}_{w_k,\ k=0,1,\dots}\Big[\sum_{k=0}^{N-1}\alpha^k\,g\big(x_k,\mu_k(x_k),w_k\big)\Big]$$

(si la limite existe — sinon on prend la limite supérieure).

| Famille | Caractérisation |
|---|---|
| **Plus court chemin stochastique** (SSP) | $\alpha=1$ et un **état de terminaison** |
| **Problèmes actualisés** | $\alpha<1$ et $g$ **bornée** |
| Non actualisés, ou actualisés à $g$ non bornée | les cas difficiles |

**Problèmes de coût moyen par étape** — minimiser

$$\lim_{N\to\infty}\frac1N\,\mathbb{E}\Big[\sum_{k=0}^{N-1}g\big(x_k,\mu_k(x_k),w_k\big)\Big]$$

> **La question clé de tout le chapitre**, telle que la pose le cours : *la relation entre les fonctions de coût-à-venir optimal à horizon **infini** et à horizon **fini***. Si $J_N$ désigne le coût optimal du problème à $N$ étapes, obtenu après $N$ itérations DP depuis un certain $J_0$, converge-t-il vers $J^\star$ ?

**Les trois résultats types** pour les problèmes de coût total :

1. **Convergence de l'itération sur les valeurs** : $J^\star(x)=\lim_{N\to\infty}J_N(x)$ pour tout $x$ ;
2. **Équation de Bellman** : $J^\star(x)=\min_{u\in U(x)}\mathbb{E}_w\big\{g(x,u,w)+J^\star\big(f(x,u,w)\big)\big\}$ pour tout $x$ ;
3. **Condition d'optimalité** : si $\mu^\star(x)$ atteint le minimum dans l'équation de Bellman, alors la politique **stationnaire** $\{\mu^\star,\mu^\star,\dots\}$ est optimale.

> *L'équation de Bellman est vérifiée pour **tous** les problèmes déterministes et pour « **presque tous** » les problèmes stochastiques.* Elle vaut en particulier pour le SSP et les problèmes actualisés ; il existe des exceptions ailleurs.

### La hiérarchie de difficulté (à connaître pour se situer)

| Niveau | Caractéristiques |
|---|---|
| **Faciles** | états et commandes **finis** ; Bellman a une solution **unique** ; itérations sur les valeurs et sur les politiques s'appliquent |
| **Assez compliqués** | états infinis, actualisés, $g$ bornée (**structure contractante**) ; SSP finis « presque » contractants — Bellman a encore une solution unique |
| **Difficiles** | états infinis avec $g\geq0$ ou $g\leq0$ ; problèmes déterministes à états infinis ; SSP **sans** structure contractante |
| **Très grands ou sans modèle** | grand espace d'états, modèle de simulation — il faut la **DP approchée** |

## 🔴 Concept 2 — Le plus court chemin stochastique

**Le cadre.** Système à **états finis** : les états $1,\dots,n$ plus un état de **terminaison $t$, absorbant et sans coût**.

- probabilités de transition $p_{ij}(u)$ ;
- contraintes de commande $u\in U(i)$, **ensemble fini** ;
- coût d'une politique $\pi=\{\mu_0,\mu_1,\dots\}$ : $$J_\pi(i) = \lim_{N\to\infty}\mathbb{E}\Big[\sum_{k=0}^{N-1}g\big(x_k,\mu_k(x_k)\big)\ \Big|\ x_0=i\Big]$$
- $\pi$ est **optimale** si $J_\pi(i)=J^\star(i)$ pour tout $i$ ;
- **notation** : pour une politique **stationnaire** $\pi=\{\mu,\mu,\dots\}$, on écrit $J_\mu(i)$ au lieu de $J_\pi(i)$.

**L'hypothèse fondamentale — la terminaison est inévitable.**

> Il existe un entier $m$ tel que, **pour toute politique $\pi$** :
>
> $$\rho_\pi = \max_{i=1,\dots,n}\ \mathbb{P}\{x_m\neq t \mid x_0=i,\ \pi\} < 1$$
>
> et de plus $\rho = \max_\pi\rho_\pi<1$, **puisque $\rho_\pi$ ne dépend que des $m$ premières composantes de $\pi$** — et qu'il n'y a qu'un nombre fini de telles composantes.

**Comment la lire.** $\rho$ est une **borne supérieure sur la probabilité de non-terminaison** pendant les $m$ premières étapes, **quelle que soit la politique employée**. C'est une hypothèse de contrôlabilité : aucune politique ne peut éviter la terminaison indéfiniment.

⚠️ **Elle n'est pas automatique.** Un problème de plus court chemin **acyclique** la satisfait ; un problème **non acyclique** peut ne pas la satisfaire — il suffit qu'une politique fasse tourner en rond avec probabilité $1$.

### Pourquoi les coûts sont finis

Le raisonnement du cours, en trois lignes. Par conditionnement,

$$\mathbb{P}\{x_{2m}\neq t\mid x_0=i,\pi\} = \mathbb{P}\{x_{2m}\neq t\mid x_m\neq t,\ x_0=i,\pi\}\cdot\mathbb{P}\{x_m\neq t\mid x_0=i,\pi\}\ \leq\ \rho^2$$

et par récurrence

$$\mathbb{P}\{x_{km}\neq t\mid x_0=i,\pi\}\ \leq\ \rho^k$$

Le coût espéré accumulé entre les instants $km$ et $(k+1)m-1$ est donc majoré par $m\rho^k\max_{i,u}|g(i,u)|$, d'où

$$J_\pi(i)\ \leq\ \sum_{k=0}^\infty m\,\rho^k\max_{i,u}|g(i,u)| = \frac{m}{1-\rho}\,\max_{i,u}|g(i,u)|$$

> **C'est une majoration uniforme en $\pi$ et en $i$.** Une série géométrique de raison $\rho<1$ contrôle tout : c'est la **structure contractante** annoncée dans la hiérarchie de difficulté, et c'est elle qui rendra l'équation de Bellman bien posée.

## 🔴 Concept 3 — Le résultat principal

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème.</span>

Pour toutes conditions initiales $J_0(1),\dots,J_0(n)$, la suite $J_k(i)$ engendrée par l'**itération sur les valeurs**

$$J_{k+1}(i) = \min_{u\in U(i)}\Big[g(i,u)+\sum_{j=1}^n p_{ij}(u)J_k(j)\Big], \qquad \forall i$$

**converge vers le coût optimal $J^\star(i)$** pour chaque $i$.

**L'équation de Bellman admet $J^\star$ pour unique solution :**

$$J^\star(i)=\min_{u\in U(i)}\Big[g(i,u)+\sum_{j=1}^n p_{ij}(u)J^\star(j)\Big],\qquad J^\star(t)=0$$

**Une politique stationnaire $\mu$ est optimale si et seulement si**, pour chaque état $i$, $\mu(i)$ **atteint le minimum** dans l'équation de Bellman.

</div>

**Les trois affirmations sont distinctes et il faut les séparer.** La première est **algorithmique** (l'itération converge, depuis n'importe où). La deuxième est **caractéristique** (l'équation détermine $J^\star$ sans ambiguïté). La troisième est **constructive** (une fois $J^\star$ connue, la politique optimale se lit immédiatement, et elle est stationnaire).

**L'idée clé de la preuve.** *La « queue » de la série de coûts,*

$$\mathbb{E}\Big[\sum_{k=mK}^\infty g\big(x_k,\mu_k(x_k)\big)\Big]$$

*s'évanouit quand $K$ tend vers l'infini.* C'est exactement la majoration géométrique du concept 2.

### Esquisse de la preuve que $J_N\to J^\star$

Supposons pour simplifier $J_0(i)=0$ pour tout $i$. Pour tout $K\geq1$, écrivons le coût d'une politique quelconque en séparant les $mK$ premières étapes du reste :

$$J_\pi(x_0)=\mathbb{E}\Big[\sum_{k=0}^{mK-1}g\big(x_k,\mu_k(x_k)\big)\Big]+\mathbb{E}\Big[\sum_{k=mK}^\infty g\big(x_k,\mu_k(x_k)\big)\Big] \ \leq\ \mathbb{E}\Big[\sum_{k=0}^{mK-1}g\Big] + \sum_{k=K}^\infty \rho^k\,m\max_{i,u}|g(i,u)|$$

En prenant le minimum des deux membres sur $\pi$ :

$$J^\star(x_0)\ \leq\ J_{mK}(x_0) + \frac{\rho^K m}{1-\rho}\max_{i,u}|g(i,u)|$$

et symétriquement

$$J_{mK}(x_0) - \frac{\rho^Km}{1-\rho}\max_{i,u}|g(i,u)|\ \leq\ J^\star(x_0)$$

Les deux encadrements donnent $\lim_{K\to\infty}J_{mK}(x_0)=J^\star(x_0)$.

**Deux remarques pour finir la preuve.** $J_{mK}(x_0)$ et $J_{mK+k}(x_0)$ convergent vers **la même limite** pour $k<m$ — *quelques étapes supplémentaires très loin dans le futur ne comptent pas* — donc $J_N(x_0)\to J^\star(x_0)$ pour toute la suite. Et le choix $J_0=0$ **n'a pas d'importance** : le même argument vaut depuis n'importe quel $J_0$.

## 🟠 Concept 4 — Les problèmes actualisés comme cas particulier

**Le résultat de structure.** Un problème **actualisé** de facteur $\alpha<1$ **se convertit en un problème SSP**, en interprétant $1-\alpha$ comme une probabilité de terminaison à chaque étape : le coût de la $k$-ième étape est **le même dans les deux problèmes**.

**Tout se transporte donc.**

- **Itération sur les valeurs** : elle converge vers $J^\star$ depuis tout $J_0$, $$J_{k+1}(i)=\min_{u\in U(i)}\Big[g(i,u)+\alpha\sum_{j=1}^np_{ij}(u)J_k(j)\Big]$$
- **Équation de Bellman** : $J^\star$ en est l'**unique** solution, $$J^\star(i)=\min_{u\in U(i)}\Big[g(i,u)+\alpha\sum_{j=1}^np_{ij}(u)J^\star(j)\Big]$$
- **L'itération sur les politiques se termine** avec une politique optimale, et la **programmation linéaire** fonctionne (fiche 49).

> **L'astuce de conversion mérite d'être retenue.** Actualiser au taux $\alpha$, c'est **exactement** vivre dans un monde où la partie s'arrête à chaque étape avec probabilité $1-\alpha$. C'est pourquoi $\alpha<1$ joue le rôle de l'hypothèse de terminaison inévitable : l'actualisation **est** une terminaison probabiliste déguisée.

### L'exemple du fabricant

Un fabricant, à chaque instant :

- reçoit une commande avec probabilité $p$, aucune avec probabilité $1-p$ ;
- peut **traiter toutes** les commandes en attente au coût $K>0$, ou **n'en traiter aucune** ; le coût par commande non satisfaite est $c>0$ par période ;
- le nombre maximal de commandes en attente est $n$.

**L'état** est le nombre de commandes non satisfaites au début d'une période, $i=0,1,\dots,n$. **L'équation de Bellman** s'écrit, pour $i=0,\dots,n-1$ :

$$J^\star(i)=\min\Big\{\underbrace{K+\alpha(1-p)J^\star(0)+\alpha p\,J^\star(1)}_{\text{traiter}},\ \underbrace{c\,i+\alpha(1-p)J^\star(i)+\alpha p\,J^\star(i+1)}_{\text{ne rien traiter}}\Big\}$$

et, pour l'état saturé,

$$J^\star(n)=K+\alpha(1-p)J^\star(0)+\alpha p\,J^\star(1)$$

**Comment lire les deux branches.** Si l'on **traite**, on paie $K$ et l'on repart de zéro : l'état suivant est $0$ ou $1$ selon qu'une commande arrive. Si l'on **ne traite pas**, on paie $ci$ et l'état passe à $i$ ou $i+1$. En $i=n$ on n'a pas le choix : la file est pleine.

> **La structure attendue de la solution** est une **politique à seuil** : traiter dès que $i$ dépasse un certain niveau. C'est le même type de résultat qu'à la fiche 46 pour la gestion de stock, et il se démontre de la même façon — par une propriété de monotonie qui se propage à travers l'opérateur de Bellman.

### L'exemple du temps moyen d'atteinte

Minimiser l'**espérance du temps jusqu'à la terminaison** revient à prendre

$$g(i,u)=1 \qquad \text{pour tout } i \text{ et tout } u\in U(i)$$

L'équation de Bellman devient

$$J^\star(i)=\min_{u\in U(i)}\Big[1+\sum_{j=1}^n p_{ij}(u)J^\star(j)\Big],\qquad i=1,\dots,n$$

**Le cas particulier remarquable.** S'il n'y a **qu'une seule commande** par état, $J^\star(i)$ est le **temps moyen de premier passage** de $i$ vers $t$. Ces temps, notés $m_i$, sont l'unique solution des équations classiques

$$m_i = 1+\sum_{j=1}^n p_{ij}m_j,\qquad i=1,\dots,n$$

> *Que l'on reconnaît comme une forme de l'équation de Bellman.* Les temps moyens de premier passage d'une chaîne de Markov, résultat classique de théorie des probabilités, **sont** une équation de Bellman sans minimisation. La DP en horizon infini contient donc la théorie des chaînes de Markov comme cas dégénéré.

### Comment résoudre l'exercice type (protocole)

1. **Identifier la famille** : $\alpha=1$ avec état terminal $\to$ SSP ; $\alpha<1$ avec $g$ bornée $\to$ actualisé ; moyenne temporelle $\to$ coût moyen.
2. **Vérifier l'hypothèse de terminaison inévitable** (SSP) : existe-t-il $m$ tel qu'aucune politique n'évite $t$ pendant $m$ étapes avec probabilité $1$ ?
3. **Écrire l'équation de Bellman** en énumérant les commandes possibles état par état.
4. **Chercher une structure** : la solution est-elle monotone en $i$ ? La politique est-elle à seuil ?
5. **Résoudre** : par itération sur les valeurs si $n$ est grand, par résolution directe du système si $n$ est petit (fiche 49).
6. **Lire la politique** : $\mu^\star(i)$ est l'argmin dans l'équation de Bellman — elle est **stationnaire**.
7. **Vérifier** : la solution trouvée satisfait-elle l'équation de Bellman en **tout** état ? C'est un contrôle complet, puisque la solution est **unique**.

### Exercices progressifs

**Niveau 1** — Pourquoi un problème actualisé se ramène-t-il à un SSP ?

<details><summary>Correction</summary>

En interprétant $1-\alpha$ comme la **probabilité de terminaison à chaque étape**. Dans le problème SSP ainsi construit, la probabilité de survivre $k$ étapes est $\alpha^k$, donc le coût de la $k$-ième étape est encaissé avec probabilité $\alpha^k$ : son espérance est $\alpha^kg(\cdot)$ — **exactement** le coût actualisé.

**Conséquence.** L'hypothèse de terminaison inévitable est automatiquement satisfaite avec $m=1$ et $\rho=\alpha<1$. Tous les résultats du SSP — convergence de l'itération sur les valeurs, unicité de la solution de Bellman, optimalité d'une politique stationnaire — s'appliquent donc **sans condition supplémentaire** aux problèmes actualisés à coût borné.

</details>

**Niveau 2** — Une chaîne à deux états $\{1,t\}$ avec une seule commande, $p_{11}=0{,}5$, $p_{1t}=0{,}5$, $g(1)=1$. Que vaut $J^\star(1)$ ?

<details><summary>Correction</summary>

C'est le temps moyen d'atteinte. L'équation de Bellman sans minimisation donne

$$J^\star(1)=1+p_{11}J^\star(1)+p_{1t}\underbrace{J^\star(t)}_{=0}=1+0{,}5\,J^\star(1)$$

d'où $0{,}5\,J^\star(1)=1$, soit $J^\star(1)=2$.

*Contrôle direct :* le nombre d'étapes avant terminaison suit une loi géométrique de paramètre $0{,}5$, d'espérance $1/0{,}5=2$ .

*Vérification de l'hypothèse :* $\rho=\mathbb{P}\{x_1\neq t\mid x_0=1\}=0{,}5<1$ avec $m=1$ — la terminaison est bien inévitable.

</details>

**Niveau 3** — Pourquoi $\rho=\max_\pi\rho_\pi$ est-il strictement inférieur à $1$, alors qu'il y a une infinité de politiques ?

<details><summary>Correction</summary>

Parce que **$\rho_\pi$ ne dépend que des $m$ premières composantes de $\pi$**, c'est-à-dire de $(\mu_0,\dots,\mu_{m-1})$. Or chaque $\mu_k$ associe à chacun des $n$ états une commande prise dans un ensemble **fini** $U(i)$ : il n'y a donc qu'un **nombre fini** de valeurs possibles pour le $m$-uplet $(\mu_0,\dots,\mu_{m-1})$, donc un **nombre fini** de valeurs possibles pour $\rho_\pi$.

Un maximum sur un ensemble **fini** de nombres tous strictement inférieurs à $1$ est strictement inférieur à $1$. $\blacksquare$

**Où l'argument casserait.** Si $U(i)$ était **infini** — commandes continues — le maximum pourrait valoir $1$ sans être atteint, et la structure contractante tomberait. C'est exactement pourquoi le cours classe les problèmes à commandes finies parmi les « faciles ».

</details>

**Niveau 4 — type examen** — Montrez que si $\hat J$ résout l'équation de Bellman et si $\mu(i)$ y atteint le minimum pour tout $i$, alors $\hat J = J_\mu$.

<details><summary>Correction</summary>

**Étape 1 — $\hat J$ satisfait l'équation d'évaluation de $\mu$.** Par hypothèse, pour chaque $i$, le minimum dans

$$\hat J(i)=\min_{u\in U(i)}\Big[g(i,u)+\sum_j p_{ij}(u)\hat J(j)\Big]$$

est atteint en $u=\mu(i)$. Donc

$$\hat J(i)=g\big(i,\mu(i)\big)+\sum_j p_{ij}\big(\mu(i)\big)\hat J(j), \qquad i=1,\dots,n \tag{$\ast$}$$

**Étape 2 — $J_\mu$ satisfait la même équation.** C'est l'équation de Bellman **pour une politique unique** (fiche 49) : $J_\mu$ est solution du système linéaire

$$J_\mu(i)=g\big(i,\mu(i)\big)+\sum_j p_{ij}\big(\mu(i)\big)J_\mu(j)$$

**Étape 3 — unicité.** Sous l'hypothèse de terminaison inévitable, ce système linéaire de $n$ équations à $n$ inconnues a une solution **unique**. En effet, en écriture matricielle $J = g_\mu + P_\mu J$, soit $(I-P_\mu)J=g_\mu$, et $I-P_\mu$ est inversible parce que les puissances $P_\mu^{km}$ sont majorées par $\rho^k\to0$, donc $P_\mu^k\to0$ et la série de Neumann $\sum_kP_\mu^k=(I-P_\mu)^{-1}$ converge.

Comme $\hat J$ et $J_\mu$ résolvent tous deux ce système, $\hat J = J_\mu$. $\blacksquare$

**La portée du résultat.** C'est la brique qui rend la troisième affirmation du théorème constructive : dès qu'on connaît une solution de l'équation de Bellman, la politique qui y atteint le minimum a **exactement** ce coût. Combiné à l'unicité de la solution ($\hat J=J^\star$), cela donne : **cette politique stationnaire est optimale**. C'est aussi le mécanisme qui justifie l'itération sur les politiques (fiche 49).

</details>

## 🔴 Common mistakes

1. **Oublier de vérifier la terminaison inévitable** — sans elle, les coûts peuvent être infinis et l'équation de Bellman perdre son unicité.
2. **Croire l'hypothèse automatique sur tout graphe** — un problème de plus court chemin **non acyclique** peut la violer.
3. **Confondre $J_\pi$ et $J^\star$** — le premier est le coût d'une politique donnée, le second l'infimum sur toutes.
4. **Chercher une politique non stationnaire** — en horizon infini, une politique **stationnaire** optimale existe dès que le cadre est « facile ».
5. **Oublier $J^\star(t)=0$** — l'état de terminaison est **sans coût** ; c'est la condition au bord qui ferme le système.
6. **Croire que l'itération sur les valeurs dépend de $J_0$** — elle converge vers $J^\star$ depuis **n'importe quelle** initialisation.
7. **Oublier le facteur $\alpha$ devant la somme** dans le cas actualisé — l'actualisation porte sur le **futur**, donc sur le terme $\sum_jp_{ij}(u)J^\star(j)$, pas sur $g(i,u)$.
8. **Appliquer les résultats à $g$ non bornée** — les problèmes actualisés à coût non borné font partie des cas **difficiles**.

## 📌 Ultimate Review

1. Horizon infini : même cadre, mais infinité d'étapes et système et coût **stationnaires**.
2. Familles : **SSP** ($\alpha=1$ $+$ état terminal), **actualisé** ($\alpha<1$, $g$ bornée), **coût moyen**, et les cas non bornés (difficiles).
3. **SSP** : états $1,\dots,n$ plus $t$ absorbant sans coût ; $p_{ij}(u)$ ; $U(i)$ **fini**.
4. **Terminaison inévitable** : il existe $m$ avec $\rho=\max_\pi\max_i\mathbb{P}\{x_m\neq t\mid x_0=i,\pi\}<1$ — fini car $\rho_\pi$ ne dépend que des $m$ premières composantes.
5. Conséquence : $\mathbb{P}\{x_{km}\neq t\}\leq\rho^k$ et $J_\pi(i)\leq\frac{m}{1-\rho}\max_{i,u}|g(i,u)|$ — **structure contractante**.
6. **Itération sur les valeurs** $J_{k+1}(i)=\min_u[g(i,u)+\sum_jp_{ij}(u)J_k(j)]$ converge vers $J^\star$ depuis **tout** $J_0$.
7. **Équation de Bellman** : $J^\star$ en est l'**unique** solution, avec $J^\star(t)=0$.
8. **Optimalité** : $\mu$ stationnaire est optimale **si et seulement si** $\mu(i)$ atteint le minimum dans Bellman, pour tout $i$.
9. **Idée de la preuve** : la queue de la série de coûts s'évanouit géométriquement ; encadrement de $J^\star$ par $J_{mK}\pm\frac{\rho^Km}{1-\rho}\max|g|$.
10. **Actualisé $=$ SSP** en lisant $1-\alpha$ comme une probabilité de terminaison.
11. Avec $g\equiv1$ et une seule commande, Bellman redonne les **temps moyens de premier passage** $m_i=1+\sum_jp_{ij}m_j$.

**Formulas to know**

$$J_\pi(x_0)=\lim_{N\to\infty}\mathbb{E}\Big[\sum_{k=0}^{N-1}\alpha^kg\big(x_k,\mu_k(x_k),w_k\big)\Big] \qquad \rho=\max_\pi\max_i\mathbb{P}\{x_m\neq t\mid x_0=i,\pi\}<1$$

$$J^\star(i)=\min_{u\in U(i)}\Big[g(i,u)+\alpha\sum_{j=1}^np_{ij}(u)J^\star(j)\Big],\qquad J^\star(t)=0 \qquad J_\pi(i)\leq\frac{m}{1-\rho}\max_{i,u}|g(i,u)|$$

**Methods to know** : le protocole en 7 étapes ; la majoration géométrique de la queue ; la conversion actualisé $\to$ SSP ; la lecture de la politique dans l'argmin.

## 🧠 Active Recall

**Basic** — Écrivez l'équation de Bellman d'un problème actualisé et dites ce qu'on sait de ses solutions.

<details><summary>Réponse</summary>

$$J^\star(i)=\min_{u\in U(i)}\Big[g(i,u)+\alpha\sum_{j=1}^np_{ij}(u)J^\star(j)\Big]$$

Sous les hypothèses du cas « facile » (états et commandes finis, $\alpha<1$, $g$ bornée), **elle admet $J^\star$ pour unique solution**. De plus l'itération sur les valeurs y converge depuis n'importe quel $J_0$, et toute politique stationnaire atteignant le minimum est optimale.

</details>

**Understanding** — Que dit l'hypothèse de terminaison inévitable, et à quoi sert-elle ?

<details><summary>Réponse</summary>

Elle dit qu'il existe un entier $m$ tel que, **pour toute politique**, la probabilité de ne **pas** avoir terminé après $m$ étapes est majorée par un $\rho<1$ uniforme.

**À quoi elle sert :** elle donne $\mathbb{P}\{x_{km}\neq t\}\leq\rho^k$, donc une majoration **géométrique** de la queue de la série de coûts. C'est cette décroissance géométrique qui rend les coûts finis, l'équation de Bellman uniquement soluble, et l'itération sur les valeurs convergente. C'est la **structure contractante** du problème.

</details>

**Application** — Comment convertit-on un problème actualisé en SSP ?

<details><summary>Réponse</summary>

En interprétant $1-\alpha$ comme la **probabilité de terminaison à chaque étape**. La probabilité de survivre $k$ étapes est alors $\alpha^k$, donc le coût de la $k$-ième étape a pour espérance $\alpha^kg(\cdot)$ — exactement le coût actualisé. L'hypothèse de terminaison inévitable est satisfaite avec $m=1$ et $\rho=\alpha$, et tous les résultats du SSP s'appliquent.

</details>

**Comparison** — Horizon fini et horizon infini : qu'est-ce qui change dans la nature de la solution ?

<details><summary>Réponse</summary>

En **horizon fini**, on calcule une **suite** de fonctions $J_N,\dots,J_0$ par une **récurrence à rebours**, et la politique optimale **dépend du temps** ($\mu_k$ varie avec $k$).

En **horizon infini**, système et coût étant stationnaires, il n'y a plus d'instant privilégié : on cherche **une seule** fonction $J^\star$, solution d'une **équation de point fixe** (Bellman), et la politique optimale est **stationnaire** — une seule règle $\mu^\star$, appliquée à jamais. On passe d'une récurrence à une équation.

</details>

**Exam-style** — Esquissez la preuve que $J_N\to J^\star$ dans un problème SSP.

<details><summary>Réponse</summary>

Prenons $J_0=0$. Pour toute politique $\pi$ et tout $K\geq1$, on sépare le coût en les $mK$ premières étapes et la queue :

$$J_\pi(x_0)\leq\mathbb{E}\Big[\sum_{k=0}^{mK-1}g\Big]+\sum_{k=K}^\infty\rho^k\,m\max_{i,u}|g(i,u)|$$

en utilisant $\mathbb{P}\{x_{km}\neq t\}\leq\rho^k$. En minimisant sur $\pi$ :

$$J^\star(x_0)\leq J_{mK}(x_0)+\frac{\rho^Km}{1-\rho}\max_{i,u}|g(i,u)|$$

et symétriquement $J_{mK}(x_0)-\frac{\rho^Km}{1-\rho}\max_{i,u}|g|\leq J^\star(x_0)$. Comme $\rho^K\to0$, l'encadrement donne $J_{mK}\to J^\star$.

Enfin, $J_{mK}$ et $J_{mK+k}$ ($k<m$) ont la même limite — quelques étapes de plus très loin dans le futur ne changent rien — donc toute la suite $J_N$ converge vers $J^\star$. Le choix $J_0=0$ n'importe pas non plus.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Ce qui change en horizon infini ? | Infinité d'étapes ; système et coût **stationnaires** |
| Les quatre familles ? | SSP, actualisé, coût moyen, cas non bornés |
| SSP : quel état particulier ? | Un état de terminaison $t$, **absorbant et sans coût** |
| Hypothèse de terminaison inévitable ? | $\exists m$ : $\rho=\max_\pi\max_i\mathbb{P}\{x_m\neq t\mid x_0=i,\pi\}<1$ |
| Pourquoi $\rho<1$ malgré l'infinité de politiques ? | $\rho_\pi$ ne dépend que des $m$ premières composantes, en nombre fini |
| Majoration du coût d'une politique ? | $J_\pi(i)\leq\frac{m}{1-\rho}\max_{i,u}\vert g(i,u)\vert$ |
| Itération sur les valeurs ? | $J_{k+1}(i)=\min_u[g(i,u)+\sum_jp_{ij}(u)J_k(j)]$ |
| Depuis quel $J_0$ converge-t-elle ? | **N'importe lequel** |
| Équation de Bellman (SSP) ? | $J^\star(i)=\min_u[g(i,u)+\sum_jp_{ij}(u)J^\star(j)]$, $J^\star(t)=0$ |
| Combien de solutions ? | Une seule : $J^\star$ |
| Condition d'optimalité d'une politique stationnaire ? | $\mu(i)$ atteint le minimum dans Bellman, pour tout $i$ |
| Idée clé de la preuve ? | La queue de la série de coûts s'évanouit géométriquement |
| Actualisé $\to$ SSP : quelle lecture ? | $1-\alpha$ est une probabilité de terminaison |
| Bellman avec $g\equiv1$ et une commande ? | Les temps moyens de premier passage $m_i=1+\sum_jp_{ij}m_j$ |
