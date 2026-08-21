# Fiche 49 — Méthodes de calcul : itération sur les valeurs, sur les politiques, programmation linéaire

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Bertsekas, *6.231 Dynamic Programming*, MIT OpenCourseWare, automne 2015 — cours 11 |
| **Difficulté** | Must know — les trois façons de résoudre une équation de Bellman |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiche 48 (équation de Bellman, SSP), fiche 24 (programmation linéaire) |
| **Concepts clés** | Équation de Bellman pour une politique, itération sur les valeurs, itération sur les politiques, évaluation et amélioration, monotonie de la DP, formulation par programmation linéaire |
| **Poids à l'examen** | La **justification de l'itération sur les politiques** — l'amélioration monotone puis la terminaison en un nombre fini d'étapes — est la démonstration type. Et savoir dire **quand** choisir chacune des trois méthodes. |

## 🎯 Vue d'ensemble

L'équation de Bellman

$$J^\star(i)=\min_{u\in U(i)}\Big[g(i,u)+\sum_{j=1}^n p_{ij}(u)J^\star(j)\Big]$$

détermine $J^\star$ de façon unique (fiche 48). Reste à la **résoudre**. Trois méthodes, trois philosophies.

```
ITÉRATION SUR LES VALEURS      on itère l'opérateur de Bellman sur J
                               → converge, jamais exactement, coût faible par pas
ITÉRATION SUR LES POLITIQUES   on alterne ÉVALUER une politique / l'AMÉLIORER
                               → exacte en un nombre FINI d'étapes, chaque pas coûteux
PROGRAMMATION LINÉAIRE         J* est le PLUS GRAND J satisfaisant les inégalités
                               → un LP, mais de très grande taille
```

Le choix se joue sur la taille $n$ de l'espace d'états — et, au-delà d'un certain seuil, aucune des trois ne s'applique : il faut approcher.

## 🟡 Concept 1 — L'équation de Bellman pour une politique donnée

**Le résultat.** Pour une politique **stationnaire** $\mu$, les valeurs $J_\mu(i)$, $i=1,\dots,n$, sont l'**unique solution** du système **linéaire** de $n$ équations

$$J_\mu(i)=g\big(i,\mu(i)\big)+\sum_{j=1}^n p_{ij}\big(\mu(i)\big)J_\mu(j),\qquad i=1,\dots,n$$

**Ce qui a disparu : le minimum.** L'équation de Bellman générale est **non linéaire** à cause du $\min_u$. Une fois la politique **fixée**, il ne reste qu'un système **linéaire** — c'est toute la différence, et c'est ce qui rend l'évaluation d'une politique exactement soluble.

**En écriture matricielle**, avec $P_\mu = [p_{ij}(\mu(i))]$ et $g_\mu = [g(i,\mu(i))]$ :

$$J_\mu = g_\mu + P_\mu J_\mu \qquad\Longleftrightarrow\qquad (I-P_\mu)J_\mu = g_\mu$$

> **Le coût, et la conséquence pratique.** *L'équation fournit un moyen de calculer les $J_\mu(i)$, mais le calcul est substantiel pour $n$ grand — de l'ordre de $O(n^3)$.* Donc :
>
> - **pour $n$ grand**, l'itération sur les valeurs peut être préférable — *cas typique d'un grand système linéaire, où une méthode itérative peut battre une méthode directe* ;
> - **pour $n$ TRÈS grand**, aucune méthode exacte ne s'applique et il faut des **approximations**.

## 🟠 Concept 2 — Itération sur les valeurs

$$J_{k+1}(i)=\min_{u\in U(i)}\Big[g(i,u)+\sum_{j=1}^n p_{ij}(u)J_k(j)\Big],\qquad \forall i$$

Elle converge vers $J^\star$ **depuis toute initialisation** $J_0$ (fiche 48).

|  |  |
|---|---|
| **Coût par itération** | $O(n^2\times\lvert U\rvert)$ — un balayage de tous les états et de toutes les commandes |
| **Nombre d'itérations** | **infini** en théorie ; on s'arrête sur un critère de précision |
| **Nature** | méthode **itérative**, jamais exacte en temps fini |

> **La comparaison à retenir** est celle que fait le cours : évaluer une politique, c'est résoudre un grand système linéaire. Comme pour tout grand système linéaire, on a le choix entre une méthode **directe** ($O(n^3)$, exacte) et une méthode **itérative** (pas moins cher, approchée). L'itération sur les valeurs est la méthode itérative ; l'itération sur les politiques utilise la méthode directe à chaque étape.

## 🔴 Concept 3 — Itération sur les politiques

**Le principe.** L'algorithme engendre une suite $\mu^0,\mu^1,\mu^2,\dots$ de politiques **stationnaires**, en partant d'une politique stationnaire quelconque $\mu^0$.

**À l'itération typique, connaissant $\mu^k$ :**

**Étape 1 — évaluation de la politique.** Calculer les $J_{\mu^k}(i)$ comme solution du système **linéaire**

$$J(i)=g\big(i,\mu^k(i)\big)+\sum_{j=1}^n p_{ij}\big(\mu^k(i)\big)J(j),\qquad i=1,\dots,n$$

en les $n$ inconnues $J(1),\dots,J(n)$.

**Étape 2 — amélioration de la politique.**

$$\mu^{k+1}(i)=\arg\min_{u\in U(i)}\Big[g(i,u)+\sum_{j=1}^n p_{ij}(u)J_{\mu^k}(j)\Big],\qquad \forall i$$

**Terminaison.** S'arrêter quand $J_{\mu^k}(i)=J_{\mu^{k+1}}(i)$ pour tout $i$. Alors $J_{\mu^{k+1}}=J^\star$ et $\mu^{k+1}$ est **optimale**, puisque

$$J_{\mu^{k+1}}(i)=g\big(i,\mu^{k+1}(i)\big)+\sum_j p_{ij}\big(\mu^{k+1}(i)\big)J_{\mu^{k+1}}(j) = \min_{u\in U(i)}\Big[g(i,u)+\sum_j p_{ij}(u)J_{\mu^{k+1}}(j)\Big]$$

c'est-à-dire que $J_{\mu^{k+1}}$ **satisfait l'équation de Bellman** — dont la solution est unique.

> **Les deux étapes s'opposent terme à terme.** L'**évaluation** fixe la politique et résout exactement en $J$ ; l'**amélioration** fixe $J$ et optimise exactement en $\mu$. C'est une descente par coordonnées entre l'espace des valeurs et celui des politiques.

## 🔴 Concept 4 — Pourquoi l'itération sur les politiques fonctionne

> **Résultat d'amélioration monotone.** $J_{\mu^k}(i)\geq J_{\mu^{k+1}}(i)$ pour tout $i$ et tout $k$.

**Démonstration (celle du cours).** Fixons $k$ et considérons la suite engendrée par

$$J_{N+1}(i)=g\big(i,\mu^{k+1}(i)\big)+\sum_{j=1}^n p_{ij}\big(\mu^{k+1}(i)\big)J_N(j)$$

initialisée par $J_0(i)=J_{\mu^k}(i)$. On a d'une part

$$J_0(i)=g\big(i,\mu^k(i)\big)+\sum_j p_{ij}\big(\mu^k(i)\big)J_0(j)$$

et d'autre part, **par définition de $\mu^{k+1}$ comme argmin** évalué avec $J_{\mu^k}=J_0$ :

$$J_0(i)\ \geq\ g\big(i,\mu^{k+1}(i)\big)+\sum_j p_{ij}\big(\mu^{k+1}(i)\big)J_0(j) = J_1(i)$$

En utilisant la **propriété de monotonie de la DP** — l'opérateur $J\mapsto g_{\mu^{k+1}}+P_{\mu^{k+1}}J$ préserve l'ordre ponctuel — on propage :

$$J_0(i)\geq J_1(i)\geq\cdots\geq J_N(i)\geq J_{N+1}(i)\geq\cdots$$

Or $J_N(i)\to J_{\mu^{k+1}}(i)$ quand $N\to\infty$ (c'est l'itération sur les valeurs pour la politique fixée $\mu^{k+1}$). D'où

$$J_{\mu^k}(i)=J_0(i)\ \geq\ J_{\mu^{k+1}}(i) \qquad \forall i,\ \forall k \qquad\blacksquare$$

**La terminaison.** *Une politique ne peut pas se répéter — il n'y a qu'un nombre **fini** de politiques stationnaires — donc l'algorithme se termine avec une politique optimale.*

> **C'est un argument de descente stricte sur un ensemble fini**, exactement comme la convergence du simplexe (fiche 30) : le coût décroît à chaque itération, il y a un nombre fini de candidats, donc on ne peut pas boucler et l'on s'arrête. La structure de preuve est la même dans les deux cas.

**Le compte des politiques.** Il y a $\prod_{i=1}^n|U(i)|$ politiques stationnaires — un nombre astronomique, mais **fini**. En pratique, l'itération sur les politiques converge en très peu d'itérations (souvent moins d'une dizaine), ce qui en fait la méthode de choix quand $n$ reste modéré.

## 🟠 Concept 5 — Formulation par programmation linéaire

**L'affirmation.** *$J^\star$ est le « plus grand » $J$ satisfaisant la contrainte*

$$J(i)\ \leq\ g(i,u)+\sum_{j=1}^n p_{ij}(u)J(j) \tag{1}$$

*pour tout $i=1,\dots,n$ et tout $u\in U(i)$.*

**Démonstration.** Si l'on lance l'itération sur les valeurs depuis un $J_0$ satisfaisant la contrainte, c'est-à-dire

$$J_0(i)\leq\min_{u\in U(i)}\Big[g(i,u)+\sum_j p_{ij}(u)J_0(j)\Big] \qquad \forall i$$

alors $J_0(i)\leq J_1(i)$, et par **monotonie de la DP**, $J_k(i)\leq J_{k+1}(i)$ pour tout $k$ et tout $i$. Comme $J_k\to J^\star$, on conclut $J_0(i)\leq J^\star(i)$ pour tout $i$. $\blacksquare$

**Le programme linéaire.** $J^\star=\big(J^\star(1),\dots,J^\star(n)\big)$ est donc la solution de

$$\begin{array}{ll}\text{maximiser} & \displaystyle\sum_{i=1}^n J(i)\\[6pt] \text{sous} & \displaystyle J(i)\leq g(i,u)+\sum_{j=1}^n p_{ij}(u)J(j), \qquad i=1,\dots,n,\ u\in U(i)\end{array}$$

> **Ce qui est remarquable ici.** Le $\min_u$ de l'équation de Bellman — qui la rend **non linéaire** — se dissout en autant de **contraintes linéaires** qu'il y a de commandes. C'est exactement le mécanisme de la fiche 25 : « minimiser un maximum » devient « une variable auxiliaire et une contrainte par morceau ». Ici, « la valeur est le minimum sur $u$ » devient « la valeur est sous chaque branche, et on la pousse le plus haut possible ».

**L'inconvénient**, que le cours souligne :

> *Pour $n$ grand, la dimension de ce programme est très grande. De plus, le nombre de contraintes est égal au nombre de couples état-commande.*

Avec $n$ états et $|U|$ commandes par état, le LP a $n$ variables et $n|U|$ contraintes. C'est élégant en théorie — cela relie la DP à toute la fiche 28 sur la dualité — mais rarement compétitif en pratique.

## 🟢 Concept 6 — Le cas actualisé

Tout se transporte, avec le facteur $\alpha<1$ devant la somme.

| Méthode | Forme actualisée |
|---|---|
| Itération sur les valeurs | $J_{k+1}(i)=\min_u\big[g(i,u)+\alpha\sum_j p_{ij}(u)J_k(j)\big]$ |
| Évaluation d'une politique | $J_\mu(i)=g(i,\mu(i))+\alpha\sum_j p_{ij}(\mu(i))J_\mu(j)$ |
| Équation de Bellman | $J^\star(i)=\min_u\big[g(i,u)+\alpha\sum_j p_{ij}(u)J^\star(j)\big]$ |
| Programmation linéaire | $\max\sum_iJ(i)$ s.c. $J(i)\leq g(i,u)+\alpha\sum_jp_{ij}(u)J(j)$ |

*L'itération sur les politiques se termine avec une politique optimale, et la programmation linéaire fonctionne.*

⚠️ Dans le cas actualisé, l'évaluation d'une politique est **toujours** bien posée : $(I-\alpha P_\mu)$ est inversible pour tout $\alpha<1$, puisque le rayon spectral de $\alpha P_\mu$ vaut au plus $\alpha<1$. Pas besoin d'hypothèse de terminaison.

### Comment résoudre l'exercice type (protocole)

1. **Écrire l'équation de Bellman** en énumérant les commandes état par état.
2. **Choisir la méthode** selon la taille de $n$ :

| Situation | Méthode |
|---|---|
| $n$ petit (quelques états) | **itération sur les politiques** — exacte, quelques itérations |
| $n$ moyen à grand | **itération sur les valeurs** — pas de résolution de système |
| structure de LP exploitable, $n$ modéré | **programmation linéaire** |
| $n$ très grand ou modèle de simulation | **DP approchée** — aucune méthode exacte |

3. **Si itération sur les politiques** : partir d'une politique stationnaire quelconque, alterner évaluation (système linéaire $n\times n$) et amélioration (argmin état par état).
4. **Vérifier la décroissance** $J_{\mu^k}\geq J_{\mu^{k+1}}$ à chaque tour — c'est le contrôle de cohérence du calcul.
5. **S'arrêter** quand la politique ne change plus, ou quand $J_{\mu^k}=J_{\mu^{k+1}}$.
6. **Si itération sur les valeurs** : initialiser librement (souvent $J_0=0$), itérer, s'arrêter sur $\max_i|J_{k+1}(i)-J_k(i)|<\varepsilon$.
7. **Valider** : la solution obtenue satisfait-elle l'équation de Bellman en tout état ? La solution étant **unique**, c'est un contrôle complet.

### Exercices progressifs

**Niveau 1** — Pourquoi l'évaluation d'une politique est-elle un système **linéaire** alors que l'équation de Bellman ne l'est pas ?

<details><summary>Correction</summary>

Parce que le $\min_{u}$ a disparu. L'équation de Bellman contient une **minimisation sur les commandes**, opération non linéaire (un minimum de fonctions affines est concave, pas affine). Une fois la politique $\mu$ **fixée**, la commande en chaque état est déterminée : il ne reste que

$$J_\mu(i)=g(i,\mu(i))+\sum_j p_{ij}(\mu(i))J_\mu(j)$$

soit $(I-P_\mu)J_\mu=g_\mu$ — un système linéaire de $n$ équations à $n$ inconnues.

*C'est précisément ce que l'itération sur les politiques exploite :* elle remplace un problème non linéaire par une suite de problèmes linéaires.

</details>

**Niveau 2** — Combien d'itérations au maximum pour l'itération sur les politiques ?

<details><summary>Correction</summary>

Au plus le **nombre de politiques stationnaires**, soit $\prod_{i=1}^n|U(i)|$. En effet, le coût décroît (au sens ponctuel) à chaque itération et une politique ne peut donc jamais réapparaître ; l'ensemble étant **fini**, l'algorithme se termine.

*C'est une borne astronomique mais finie* — et en pratique l'algorithme converge en une poignée d'itérations. C'est la même situation que pour le simplexe (fiche 30) : borne théorique exponentielle, comportement pratique excellent.

</details>

**Niveau 3** — Démontrez que $J^\star$ est le plus grand $J$ satisfaisant $J(i)\leq g(i,u)+\sum_jp_{ij}(u)J(j)$ pour tous $i,u$.

<details><summary>Correction</summary>

Soit $J_0$ satisfaisant la contrainte pour tous $i$ et $u$, c'est-à-dire

$$J_0(i)\leq\min_{u\in U(i)}\Big[g(i,u)+\sum_j p_{ij}(u)J_0(j)\Big] = J_1(i)$$

où $J_1$ est le résultat d'**une** itération sur les valeurs depuis $J_0$. On a donc $J_0\leq J_1$ ponctuellement.

Par **monotonie de l'opérateur de Bellman** — si $J\leq J'$ ponctuellement, alors $\min_u[g+\sum p J]\leq\min_u[g+\sum pJ']$, les $p_{ij}$ étant positifs — on propage par récurrence :

$$J_0\leq J_1\leq J_2\leq\cdots\leq J_k\leq\cdots$$

Or $J_k\to J^\star$ (fiche 48, convergence depuis toute initialisation). Par passage à la limite, $J_0\leq J^\star$.

**$J^\star$ majore donc tout $J$ admissible**, et il est lui-même admissible puisqu'il satisfait l'équation de Bellman avec égalité. C'est bien le plus grand. $\blacksquare$

**Ce qui rend la preuve possible :** la **monotonie** de l'opérateur de Bellman, qui repose uniquement sur la positivité des probabilités de transition. C'est la même propriété qui sert à la fiche 47 (emboîtement des régions d'arrêt) et au concept 4 ci-dessus.

</details>

**Niveau 4 — type examen** — Déroulez une itération sur les politiques sur un problème à deux états $\{1,t\}$ avec, en $1$, deux commandes : $u_a$ de coût $g(1,u_a)=1$ et $p_{1t}(u_a)=1$ ; $u_b$ de coût $g(1,u_b)=0$ et $p_{11}(u_b)=0{,}9$, $p_{1t}(u_b)=0{,}1$.

<details><summary>Correction</summary>

*Vérification préalable.* La terminaison est inévitable : sous $u_b$, $\mathbb{P}\{x_m\neq t\}=0{,}9^m\to0$, donc $\rho<1$ pour $m$ assez grand .

**Itération 0 — partons de $\mu^0(1)=u_b$.**

*Évaluation.* $J_{\mu^0}(1)=0+0{,}9\,J_{\mu^0}(1)+0{,}1\times0$, soit $0{,}1\,J_{\mu^0}(1)=0$, d'où

$$J_{\mu^0}(1)=0$$

*(Cohérent : la commande $u_b$ est gratuite, on peut tourner en rond sans rien payer.)*

*Amélioration.*

$$\mu^1(1)=\arg\min\big\{\underbrace{1+1\times0}_{u_a},\ \underbrace{0+0{,}9\times0+0{,}1\times0}_{u_b}\big\}=\arg\min\{1,\ 0\}=u_b$$

**La politique ne change pas** : $\mu^1=\mu^0$, donc $J_{\mu^1}=J_{\mu^0}$. L'algorithme **termine** et $\mu^\star(1)=u_b$, $J^\star(1)=0$.

*Vérification par l'équation de Bellman.* $J^\star(1)=\min\{1+0,\ 0+0{,}9\times0\}=0$ , et le minimum est bien atteint en $u_b$ .

**Ce que l'exemple montre.** L'itération sur les politiques peut **terminer dès la première itération** si la politique initiale est déjà optimale. Et le calcul d'évaluation, ici trivial, serait un système $n\times n$ en dimension réaliste — c'est là que réside le coût en $O(n^3)$.

*Variante instructive :* si l'on prenait $g(1,u_b)=0{,}05$ au lieu de $0$, l'évaluation donnerait $J_{\mu^0}(1)=0{,}05/0{,}1=0{,}5$, puis l'amélioration comparerait $1+0=1$ à $0{,}05+0{,}9\times0{,}5=0{,}5$ : la politique $u_b$ resterait optimale. Il faudrait $g(1,u_b)>0{,}1$ pour que $u_a$ — payer $1$ et terminer tout de suite — devienne préférable.

</details>

## 🔴 Common mistakes

1. **Confondre les deux équations** — celle de Bellman contient un $\min_u$ (non linéaire) ; celle d'évaluation d'une politique n'en a pas (linéaire).
2. **Oublier la monotonie dans les preuves** — c'est elle qui propage les inégalités à travers l'opérateur de Bellman, dans les trois démonstrations du chapitre.
3. **Croire l'itération sur les valeurs exacte en temps fini** — elle converge sans jamais atteindre $J^\star$ exactement.
4. **Croire l'itération sur les politiques toujours meilleure** — chaque itération coûte $O(n^3)$ ; pour $n$ grand, l'itération sur les valeurs gagne.
5. **Se tromper de sens dans le LP** — on **maximise** $\sum_iJ(i)$ sous des contraintes $\leq$, car $J^\star$ est le **plus grand** $J$ admissible.
6. **Sous-estimer la taille du LP** — le nombre de contraintes est le nombre de **couples état-commande**, pas le nombre d'états.
7. **Partir d'une politique non stationnaire** dans l'itération sur les politiques — la méthode ne manipule que des politiques stationnaires.
8. **Oublier $\alpha$ dans le cas actualisé** — il porte sur le terme futur $\sum_jp_{ij}(u)J(j)$, jamais sur $g(i,u)$.

## 📌 Ultimate Review

1. **Évaluation d'une politique** : $J_\mu = g_\mu+P_\mu J_\mu$, système **linéaire** $n\times n$ de solution unique, coût $O(n^3)$.
2. **Itération sur les valeurs** : $J_{k+1}(i)=\min_u[g(i,u)+\sum_jp_{ij}(u)J_k(j)]$ ; converge depuis tout $J_0$ ; itérative, jamais exacte.
3. **Itération sur les politiques** : alterner **évaluation** (système linéaire) et **amélioration** ($\arg\min$ état par état) ; s'arrêter quand $J_{\mu^k}=J_{\mu^{k+1}}$.
4. **Amélioration monotone** : $J_{\mu^k}\geq J_{\mu^{k+1}}$, démontrée en initialisant l'itération de $\mu^{k+1}$ à $J_{\mu^k}$ et en propageant par monotonie.
5. **Terminaison** : le coût décroît strictement et il n'y a qu'un nombre **fini** de politiques stationnaires — même argument que le simplexe.
6. **Programmation linéaire** : $J^\star$ est le **plus grand** $J$ vérifiant $J(i)\leq g(i,u)+\sum_jp_{ij}(u)J(j)$ ; d'où $\max\sum_iJ(i)$ sous ces contraintes.
7. **Inconvénient du LP** : $n$ variables mais **autant de contraintes que de couples état-commande**.
8. **Cas actualisé** : tout se transporte avec $\alpha$ ; $(I-\alpha P_\mu)$ est toujours inversible.
9. **Le choix** : politiques si $n$ petit ; valeurs si $n$ grand ; DP approchée si $n$ très grand.

**Formulas to know**

$$J_\mu(i)=g\big(i,\mu(i)\big)+\sum_{j=1}^np_{ij}\big(\mu(i)\big)J_\mu(j) \qquad \mu^{k+1}(i)=\arg\min_{u\in U(i)}\Big[g(i,u)+\sum_jp_{ij}(u)J_{\mu^k}(j)\Big]$$

$$\max\ \sum_{i=1}^nJ(i) \quad\text{s.c.}\quad J(i)\leq g(i,u)+\sum_{j=1}^np_{ij}(u)J(j),\ \ \forall i,\ \forall u\in U(i)$$

**Methods to know** : le protocole de choix de méthode ; la preuve d'amélioration monotone ; la preuve que $J^\star$ est le plus grand $J$ admissible.

## 🧠 Active Recall

**Basic** — Décrivez les deux étapes d'une itération sur les politiques.

<details><summary>Réponse</summary>

**Évaluation** : connaissant $\mu^k$, résoudre le système **linéaire** $J(i)=g(i,\mu^k(i))+\sum_jp_{ij}(\mu^k(i))J(j)$ pour obtenir $J_{\mu^k}$. **Amélioration** : poser $\mu^{k+1}(i)=\arg\min_{u\in U(i)}\big[g(i,u)+\sum_jp_{ij}(u)J_{\mu^k}(j)\big]$ pour chaque $i$. On s'arrête quand $J_{\mu^k}=J_{\mu^{k+1}}$ ; alors $\mu^{k+1}$ est optimale.

</details>

**Understanding** — Pourquoi l'itération sur les politiques se termine-t-elle en un nombre fini d'étapes ?

<details><summary>Réponse</summary>

Parce que le coût **décroît** à chaque itération ($J_{\mu^k}\geq J_{\mu^{k+1}}$ ponctuellement) et qu'il n'y a qu'un nombre **fini** de politiques stationnaires — au plus $\prod_i|U(i)|$. Une politique ne peut donc jamais réapparaître, et l'algorithme s'arrête nécessairement, sur une politique satisfaisant l'équation de Bellman, donc optimale.

*C'est exactement la structure de preuve de la convergence du simplexe : décroissance stricte sur un ensemble fini de candidats.*

</details>

**Application** — Quelle méthode choisir pour $n=10$ états ? Pour $n=10^6$ ?

<details><summary>Réponse</summary>

**$n=10$** : l'**itération sur les politiques**. Chaque évaluation est un système $10\times10$, résolu instantanément, et l'algorithme converge en quelques itérations vers la solution **exacte**.

**$n=10^6$** : ni l'une ni l'autre des méthodes exactes. Une évaluation coûterait $O(10^{18})$ opérations, et même un balayage d'itération sur les valeurs est coûteux. C'est le domaine de la **DP approchée** — approximation de $J^\star$ par une famille paramétrée, simulation, apprentissage.

</details>

**Comparison** — Itération sur les valeurs et sur les politiques : quel est le compromis ?

<details><summary>Réponse</summary>

|  | Valeurs | Politiques |
|---|---|---|
| Coût par itération | faible : un balayage | élevé : $O(n^3)$ |
| Nombre d'itérations | infini (approché) | fini (exact) |
| Nature | itérative | directe à chaque tour |

C'est le compromis classique entre **méthode itérative** et **méthode directe** pour un grand système linéaire — comparaison que le cours fait explicitement. Beaucoup d'itérations bon marché, ou peu d'itérations chères.

</details>

**Exam-style** — Démontrez l'amélioration monotone de l'itération sur les politiques.

<details><summary>Réponse</summary>

Fixons $k$ et considérons la suite définie par

$$J_{N+1}(i)=g\big(i,\mu^{k+1}(i)\big)+\sum_jp_{ij}\big(\mu^{k+1}(i)\big)J_N(j), \qquad J_0 = J_{\mu^k}$$

*Premier pas.* $J_0$ vérifie $J_0(i)=g(i,\mu^k(i))+\sum_jp_{ij}(\mu^k(i))J_0(j)$. Or $\mu^{k+1}(i)$ est, **par définition**, l'argmin de $g(i,u)+\sum_jp_{ij}(u)J_0(j)$ sur $u$. Donc

$$J_0(i)\ \geq\ g\big(i,\mu^{k+1}(i)\big)+\sum_jp_{ij}\big(\mu^{k+1}(i)\big)J_0(j)=J_1(i)$$

*Propagation.* L'opérateur $J\mapsto g_{\mu^{k+1}}+P_{\mu^{k+1}}J$ est **monotone** (les $p_{ij}\geq0$). De $J_0\geq J_1$ on déduit donc $J_1\geq J_2$, puis par récurrence

$$J_0\geq J_1\geq\cdots\geq J_N\geq J_{N+1}\geq\cdots$$

*Passage à la limite.* $J_N\to J_{\mu^{k+1}}$ (itération sur les valeurs à politique fixée). D'où

$$J_{\mu^k}=J_0\ \geq\ J_{\mu^{k+1}} \qquad\blacksquare$$

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Équation d'évaluation d'une politique ? | $J_\mu(i)=g(i,\mu(i))+\sum_jp_{ij}(\mu(i))J_\mu(j)$ |
| Sa nature ? | Système **linéaire** $n\times n$, solution unique |
| Son coût ? | $O(n^3)$ |
| Pourquoi est-elle linéaire ? | Le $\min_u$ a disparu : la politique est fixée |
| Itération sur les valeurs ? | $J_{k+1}(i)=\min_u[g(i,u)+\sum_jp_{ij}(u)J_k(j)]$ |
| Les deux étapes de l'itération sur les politiques ? | **Évaluation** (système linéaire) puis **amélioration** (argmin) |
| Critère d'arrêt ? | $J_{\mu^k}=J_{\mu^{k+1}}$ pour tout état |
| Résultat d'amélioration ? | $J_{\mu^k}\geq J_{\mu^{k+1}}$ ponctuellement |
| Sur quoi repose sa preuve ? | La **monotonie** de l'opérateur de Bellman |
| Pourquoi la terminaison est-elle finie ? | Décroissance stricte sur un ensemble **fini** de politiques |
| $J^\star$ et les inégalités de Bellman ? | $J^\star$ est le **plus grand** $J$ tel que $J(i)\leq g(i,u)+\sum_jp_{ij}(u)J(j)$ |
| Le LP correspondant ? | $\max\sum_iJ(i)$ sous ces contraintes |
| Inconvénient du LP ? | Autant de contraintes que de couples **état-commande** |
| Quelle méthode pour $n$ petit ? | Itération sur les **politiques** |
| Quelle méthode pour $n$ grand ? | Itération sur les **valeurs** |
| Et pour $n$ très grand ? | **DP approchée** — aucune méthode exacte |
