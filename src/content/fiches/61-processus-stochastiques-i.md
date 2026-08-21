# Fiche 61 — Processus stochastiques I : marche aléatoire, chaînes de Markov et martingales

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 5 « Stochastic Processes I » |
| **Difficulté** | High — la fondation discrète de tout le calcul stochastique |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Probabilités élémentaires, espérance conditionnelle |
| **Concepts clés** | Processus stochastique, marche aléatoire simple, accroissements indépendants et stationnaires, ruine du joueur, propriété de Markov, matrice de transition, distribution stationnaire, théorème de Perron-Frobenius, martingale, temps d'arrêt, théorème d'arrêt optionnel de Doob |
| **Poids à l'examen** | Trois choses : les **trois propriétés** de la marche aléatoire ; la **distribution stationnaire** comme vecteur propre de valeur propre $1$ ; et le **théorème d'arrêt optionnel** avec sa démonstration et son interprétation. |

## 🎯 Vue d'ensemble

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Un **processus stochastique** est une collection de variables aléatoires **indexées par le temps**.*

*Une vue alternative est que c'est une **distribution de probabilité sur un espace de trajectoires** ; cette trajectoire décrit souvent l'évolution d'une valeur ou d'un système aléatoire au cours du temps.*

</div>

Dans un processus **déterministe**, il y a une trajectoire fixe que le processus suit ; dans un processus **stochastique**, on ne sait pas *a priori* quelle trajectoire nous sera donnée.

> ***Il ne faut pas voir cela comme une absence d'information sur la trajectoire***, puisque l'information sur la trajectoire est donnée par la **distribution de probabilité**. Si par exemple la distribution donne la probabilité $1$ à une seule trajectoire, c'est équivalent à un processus déterministe.

⚠️ **La remarque du cours sur le temps mérite attention.** *On interprète souvent le processus comme évoluant au cours du temps. Cependant, du point de vue mathématique formel, une meilleure image est que l'on a une trajectoire sous-jacente (inconnue) et que l'on n'observe que son **segment initial**.* C'est exactement l'intuition de l'**adaptation** de la fiche 56 : on ne voit jamais le futur.

**Un exemple minimal.** La fonction $f:\mathbb{R}_{\geq0}\to\mathbb{R}$ donnée par $f(t)=t$ est un processus **déterministe** ; la « fonction aléatoire » donnée par $f(t)=t$ avec probabilité $1/2$ et $f(t)=-t$ avec probabilité $1/2$ est un processus **stochastique**.

**Les trois types de questions qu'on se pose.**

> **(a)** *On s'intéresse aux **dépendances** dans la suite de valeurs engendrées.* Par exemple : comment les prix futurs d'une action dépendent-ils de leurs valeurs passées ? **(b)** *On s'intéresse aux **moyennes de long terme** portant sur toute la suite.* Par exemple : quelle est la fraction du temps pendant laquelle une machine est à l'arrêt ? **(c)** *On s'intéresse aux **événements de bord**.* Par exemple : quelle est la probabilité qu'en une heure donnée tous les circuits d'un système téléphonique soient simultanément occupés ?

**Temps discret / temps continu.** Un processus est **à temps discret** si la variable de temps prend des valeurs entières positives, **à temps continu** si elle prend des valeurs réelles positives. *On commence par les processus à temps discret : ils peuvent être exprimés explicitement et sont donc plus « tangibles », plus faciles à visualiser.*

## 🔴 Concept 1 — La marche aléatoire simple

**Construction.** Soient $Y_1,Y_2,\dots$ des variables i.i.d. telles que $Y_i=\pm1$ avec probabilité égale. On pose $X_0=0$ et

$$X_k=Y_1+\cdots+Y_k, \qquad k\geq1$$

Cela définit une distribution de probabilité sur les suites $\{X_0,X_1,\dots\}$, donc un processus stochastique à temps discret : la **marche aléatoire simple** unidimensionnelle.

**Le lien avec le théorème central limite.** Pour $n$ assez grand, la loi de $\frac{1}{\sqrt n}X_n$ **converge vers la loi normale** de moyenne $0$ et de variance $1$.

> **C'est le pont vers le mouvement brownien.** Normaliser par $\sqrt n$ — et non par $n$ — est exactement ce qui produira $\Delta B_t\sim\sqrt{\Delta t}$ en fiche 56, donc la règle $(dB_t)^2=dt$ et tout le calcul d'Itô. La marche aléatoire est le brownien vu à travers une grille.

<div class="callout" data-kind="formel">

<span class="callout__lab">Proposition 2.1.</span>

**(i)** $E[X_k]=0$ pour tout $k$. **(ii) (Accroissements indépendants)** Pour tous $0=k_0\leq k_1\leq\cdots\leq k_r$, les variables $X_{k_{i+1}}-X_{k_i}$, $0\leq i\leq r-1$, sont **mutuellement indépendantes**. **(iii) (Stationnarité)** Pour tous $h\geq1$ et $k\geq0$, la loi de $X_{k+h}-X_k$ est **la même** que celle de $X_h$.

</div>

> *Les démonstrations sont immédiates et laissées en exercice. Noter que ces propriétés valent tant que les accroissements $Y_i$ sont **identiques, indépendants et de moyenne nulle**.*

⚠️ **La dernière phrase est importante : rien n'exige que $Y_i=\pm1$.** N'importe quelle suite i.i.d. centrée donne les trois propriétés. C'est pourquoi (ii) et (iii) sont **exactement** les propriétés du processus de Wiener énoncées en fiche 53 : accroissements gaussiens, indépendants sur intervalles disjoints, de loi ne dépendant que de la longueur de l'intervalle.

**Les deux exemples du cours.**

- **(i)** Un joueur mise à chaque tour sur un lancer de pièce non biaisée : il gagne $1$ si c'est face, perd $1$ si c'est pile. Si les lancers sont indépendants, le **solde du joueur** suit la loi de la marche aléatoire simple.
- **(ii)** *La marche aléatoire peut aussi servir de modèle — plutôt inexact — du **prix d'une action**.*

## 🔴 Concept 2 — La ruine du joueur

> **Le problème.** Pour deux entiers positifs $A$ et $B$, quelle est la probabilité que la marche aléatoire atteigne $A$ **avant** d'atteindre $-B$ ?

**La mise en équation.** Soit $\tau$ le premier instant où la marche atteint $A$ ou $-B$ ; alors $X_\tau=A$ ou $-B$. On définit

$$f(k)=\mathbb P\big(X_\tau=A\mid X_0=k\big)$$

et l'on cherche $f(0)$.

**La récurrence**, obtenue en conditionnant sur le résultat du premier lancer :

$$f(k)=\tfrac12f(k+1)+\tfrac12f(k-1)$$

avec les **conditions au bord** $f(A)=1$ et $f(-B)=0$.

**La résolution.** Si l'on pose $f(-B+1)=\alpha$, il s'ensuit que

$$f(-B+r)=\alpha r \qquad \text{pour tout } r\leq A+B$$

Donc $\alpha(A+B)=f(A)=1$, soit $\alpha=\frac{1}{A+B}$, et

$$\boxed{\ f(0)=\frac{B}{A+B}\ }$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi la solution est linéaire.</span>

La récurrence $f(k)=\frac12f(k+1)+\frac12f(k-1)$ se réécrit $f(k+1)-f(k)=f(k)-f(k-1)$ : les **différences successives sont constantes**. C'est la version discrète de $f''=0$ — on dit que $f$ est **harmonique** pour la marche. Deux conditions au bord suffisent alors à la déterminer entièrement.

</div>

⚠️ **Lisez le résultat économiquement.** La probabilité de gagner $A$ avant de perdre $B$ vaut $\frac{B}{A+B}$ : elle est **proportionnelle à la mise que l'on est prêt à perdre**. Vouloir gagner beaucoup ($A$ grand) avec peu de réserves ($B$ petit) donne une probabilité de succès qui tend vers zéro. C'est le fondement mathématique de la **gestion de la taille des positions** — et la raison pour laquelle un joueur à réserves finies face à un casino à réserves infinies est ruiné avec probabilité $1$.

## 🔴 Concept 3 — Les chaînes de Markov

> **L'observation de départ.** *Une propriété importante de la marche aléatoire simple est que l'**effet du passé sur le futur est résumé par le seul état courant**, et non par toute l'histoire.* La loi de $X_{k+1}$ ne dépend que de la valeur de $X_k$, pas de l'ensemble $X_0,\dots,X_k$.

**Formellement.** Soit $X_0,X_1,\dots$ un processus à temps discret où chaque $X_i$ prend ses valeurs dans un ensemble **discret** $S$, appelé **espace d'états**. Le processus a la **propriété de Markov** si

$$\mathbb P\big(X_{n+1}=i\mid X_n,X_{n-1},\dots,X_0\big)=\mathbb P\big(X_{n+1}=i\mid X_n\big)$$

pour tous $n\geq0$ et $i\in S$. Un tel processus est une **chaîne de Markov**.

**Les probabilités de transition.** Pour $S$ fini, $S=[m]$ :

$$p_{ij}=\mathbb P\big(X_{n+1}=j\mid X_n=i\big), \qquad i,j\in S, \qquad \sum_{j\in S}p_{ij}=1 \ \ \forall i\in S$$

**La matrice de transition.** Tous les éléments du modèle s'encodent dans

$$A=\begin{pmatrix}p_{11}&p_{21}&\cdots&p_{m1}\\ p_{12}&p_{22}&\cdots&p_{m2}\\ \vdots&\vdots&\ddots&\vdots\\ p_{1m}&p_{2m}&\cdots&p_{mm}\end{pmatrix}$$

> *Noter que la somme de chaque **colonne** vaut $1$.*

⚠️ **Attention à la convention — c'est un piège classique.** Le cours place $p_{ij}$ en **ligne $j$, colonne $i$** : la matrice $A$ est **stochastique en colonnes**. Beaucoup de manuels utilisent la convention transposée ($P$ stochastique en lignes, $P=A^T$). Les deux décrivent la même chaîne, mais **tous les produits matriciels changent de côté**. Vérifiez toujours quelle convention est employée avant d'écrire $A\pi$ ou $\pi P$.

**Exemple 3.1.**

> **(i)** *Une machine peut être **en marche** ou **en panne** un jour donné. Si elle est en marche, elle tombera en panne le lendemain avec probabilité $0{,}01$ et continuera de fonctionner avec probabilité $0{,}99$. Si elle est en panne, elle sera réparée et fonctionnera le lendemain avec probabilité $0{,}8$, et restera en panne avec probabilité $0{,}2$.* D'où la matrice de transition
>
> $$A=\begin{pmatrix}0{,}99&0{,}8\\0{,}01&0{,}2\end{pmatrix}$$
>
> **(ii)** *La marche aléatoire simple est un exemple de chaîne de Markov. Cependant, **aucune matrice de transition ne lui est associée**, puisque son espace d'états est de cardinal infini.*

> **Vérifiez la lecture de la matrice.** La **colonne 1** est « depuis l'état *en marche* » : $(0{,}99;\ 0{,}01)$ — reste en marche, ou tombe en panne. La **colonne 2** est « depuis l'état *en panne* » : $(0{,}8;\ 0{,}2)$. Chaque colonne somme bien à $1$.

## 🟠 Concept 4 — Transitions à $n$ pas

Soit $r_{ij}(n)=\mathbb P(X_n=j\mid X_0=i)$ la **probabilité de transition en $n$ pas**. Ces probabilités vérifient la relation de récurrence

$$r_{ij}(n)=\sum_{k=1}^mr_{ik}(n-1)\,p_{kj} \qquad \text{pour } n>1, \qquad r_{ij}(1)=p_{ij}$$

> *La matrice des probabilités de transition en $n$ pas est donc simplement $A^n$.*

> **Ce sont les équations de Chapman-Kolmogorov.** Elles disent : pour aller de $i$ à $j$ en $n$ pas, on passe nécessairement par un état intermédiaire $k$ après $n-1$ pas, et l'on **somme sur tous les $k$ possibles**. La propriété de Markov est ce qui autorise à multiplier $r_{ik}(n-1)$ par $p_{kj}$ sans se soucier du chemin parcouru avant $k$.
>
> **Conséquence pratique** : toute question sur $n$ pas se réduit à une **puissance de matrice**, calculable par diagonalisation.

## 🔴 Concept 5 — La distribution stationnaire

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Une **distribution stationnaire** d'une chaîne de Markov est une distribution de probabilité sur l'espace d'états $S$, avec $\mathbb P(X_0=j)=\pi_j$, telle que

$$\pi_j=\sum_{k=1}^m\pi_k\,p_{kj} \qquad (\forall j\in S)$$

</div>

**Exemple 3.2.** Soit $S=\mathbb Z_n$ et $X_0=0$. Considérons la chaîne telle que $X_{n+1}=X_n+1$ avec probabilité $\frac12$ et $X_{n+1}=X_n-1$ avec probabilité $\frac12$. Alors la distribution stationnaire est

$$\pi_i=\frac1n \qquad \text{pour tout } i$$

> **La marche aléatoire sur un cycle est uniformément répartie à l'équilibre.** C'est intuitif : aucun point du cercle n'est privilégié, la symétrie impose l'uniformité.

**La lecture spectrale.** *Noter que le vecteur $(\pi_1,\pi_2,\dots,\pi_m)$ est un **vecteur propre de $A$ de valeur propre $1$**.* On en déduit, via le théorème de Perron-Frobenius :

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 3.3.</span>

*Si $p_{ij}>0$ pour tous $i,j\in S$, alors il existe une **unique** distribution stationnaire du système. De plus,*

$$\lim_{n\to\infty}r_{ij}(n)=\pi_j \qquad \forall i,j\in S$$

</div>

> **Le contenu du théorème en une phrase.** Si l'on peut aller de n'importe quel état à n'importe quel autre **en un seul pas**, alors la chaîne **oublie complètement son point de départ** : $r_{ij}(n)$ ne dépend plus de $i$ à la limite. C'est la réponse à la question **(b)** de l'introduction — les moyennes de long terme.
>
> **Et l'algèbre est simple** : $A$ étant stochastique en colonnes, $1$ est toujours valeur propre. Perron-Frobenius ajoute que, sous positivité stricte, cette valeur propre est **simple** et **dominante** — toutes les autres sont de module $<1$. D'où $A^n$ qui converge vers la projection sur le vecteur propre $\pi$.

> ⚠️ *Un théorème correspondant **n'est pas vrai** si l'on considère des espaces d'états infinis.*

⚠️ **Ce dernier avertissement est capital.** La marche aléatoire simple sur $\mathbb Z$ n'a **aucune** distribution stationnaire : elle est récurrente nulle, elle revient en $0$ presque sûrement mais avec un temps de retour d'espérance **infinie**. Elle s'étale indéfiniment — d'où la variance $\mathrm{Var}(X_n)=n$ non bornée, exactement la non-stationnarité $I(1)$ de la fiche 52.

## 🔴 Concept 6 — Les martingales

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 4.1.</span>

*Un processus à temps discret $\{X_0,X_1,\dots\}$ est une **martingale** si*

$$X_t=E\big[X_{t+1}\mid\mathcal F_t\big] \qquad \forall t\geq0$$

*où $\mathcal F_t=\{X_0,\dots,X_t\}$ — on conditionne donc sur le **segment initial** du processus.*

</div>

> *Cela dit que notre **gain espéré** dans le processus est **nul à tout instant**. On peut aussi voir cette définition comme la formalisation mathématique d'un **jeu de hasard équitable**.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Proposition 4.2.</span>

*Pour tous $t\geq s$, on a $X_s=E[X_t\mid\mathcal F_s]$.* *Démonstration : par récurrence immédiate.*

</div>

⚠️ **La proposition 4.2 dit que la propriété se propage à tout horizon.** La définition ne porte que sur un pas, mais la loi des espérances itérées la propage : $E[X_{t+2}\mid\mathcal F_t]=E[E[X_{t+2}\mid\mathcal F_{t+1}]\mid\mathcal F_t]=E[X_{t+1}\mid\mathcal F_t]=X_t$. **Quel que soit l'horizon, la meilleure prévision est la valeur actuelle.**

**Exemple 4.3.**

- **(i)** La **marche aléatoire est une martingale**.
- **(ii)** Le solde d'un joueur de **roulette n'est pas** une martingale : on a toujours $X_k>E[X_{k+1}\mid\mathcal F_k]$ — c'est une **surmartingale**, le jeu est défavorable.
- **(iii)** Soient $Y_1,Y_2,\dots$ i.i.d. avec $Y_i=2$ de probabilité $\frac13$ et $Y_i=\frac12$ de probabilité $\frac23$. Alors $$E[Y_i]=2\cdot\tfrac13+\tfrac12\cdot\tfrac23=\tfrac23+\tfrac13=1$$ et le **produit** $X_k=\prod_{i=1}^kY_i$, avec $X_0=1$, forme une martingale.

⚠️ **Sur l'exemple (iii) : c'est bien le produit, et $E[Y]=1$ est la condition.** Pour une **somme**, la condition de martingale est $E[Y]=0$ ; pour un **produit**, c'est $E[Y]=1$. Ici $E[Y]=1$, donc $E[X_{k+1}\mid\mathcal F_k]=X_k\,E[Y_{k+1}]=X_k$.

> **Et c'est un modèle de prix**, pas un jeu de casino : le prix est multiplié par $2$ ou divisé par $2$ à chaque pas. C'est exactement l'arbre binomial de la fiche 57 — et l'analogue discret de l'exponentielle stochastique de la fiche 56, dont l'espérance est constante alors que la médiane s'effondre.

## 🔴 Concept 7 — Temps d'arrêt et théorème d'arrêt optionnel

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 5.1 — temps d'arrêt.</span>

*Étant donné un processus $\{X_0,X_1,\dots\}$, une variable aléatoire $\tau$ à valeurs entières positives est un **temps d'arrêt** si, pour tout entier $k\geq0$, l'événement $\{\tau\leq k\}$ ne dépend que de $X_0,X_1,\dots,X_k$.*

</div>

**Exemple 5.2.**

- **(i)** Dans le jeu de pile ou face, un joueur mise $1$ à chaque tour. Soit $\tau$ le **premier instant où son solde atteint $100$**. Alors $\tau$ **est** un temps d'arrêt.
- **(ii)** Pour le même joueur, soit $\tau$ l'instant du **premier pic** (maximum local) de son solde. Alors $\tau$ **n'est pas** un temps d'arrêt.

> **La différence, en une phrase.** Pour savoir qu'on a atteint $100$, il suffit de regarder le solde **maintenant**. Pour savoir qu'on est à un pic, il faut savoir que le solde **va redescendre** — donc voir le futur. C'est exactement la notion d'**adaptation** de la fiche 56, appliquée à un instant plutôt qu'à un processus.

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 5.3 — théorème d'arrêt optionnel de Doob, forme faible.</span>

*Supposons que $X_0,X_1,X_2,\dots$ soit une martingale et que $\tau$ soit un temps d'arrêt tel que $\tau\leq T$ pour une constante $T$. Alors*

$$\boxed{\ E[X_\tau]=E[X_0]\ }$$

</div>

**Démonstration.** On écrit

$$X_\tau=X_0+\sum_{i=0}^{T-1}(X_{i+1}-X_i)\cdot\mathbf 1_{\{\tau\geq i+1\}}$$

(on a utilisé $\tau\leq T$). Comme $T$ est une constante, la linéarité de l'espérance donne

$$E[X_\tau]=E[X_0]+\sum_{i=0}^{T-1}E\Big[(X_{i+1}-X_i)\cdot\mathbf 1_{\{\tau\geq i+1\}}\Big]$$

**L'observation principale** est que l'événement $\{\tau\geq i+1\}$ est déterminé par $X_0,X_1,\dots,X_i$. Donc, en conditionnant :

$$E\Big[(X_{i+1}-X_i)\mathbf 1_{\{\tau\geq i+1\}}\Big]=E\Big[E\big[(X_{i+1}-X_i)\mathbf 1_{\{\tau\geq i+1\}}\mid\mathcal F_i\big]\Big]$$

$$=E\Big[\big(E[X_{i+1}\mid\mathcal F_i]-X_i\big)\mathbf 1_{\{\tau\geq i+1\}}\Big]=E\big[0\cdot\mathbf 1_{\{\tau\geq i+1\}}\big]=0$$

D'où $E[X_\tau]=E[X_0]$. $\blacksquare$

> **Le pivot de la preuve.** L'indicatrice $\mathbf 1_{\{\tau\geq i+1\}}$ est **mesurable par rapport à $\mathcal F_i$** — c'est la définition même d'un temps d'arrêt —, on peut donc la **sortir** de l'espérance conditionnelle. Ce qui reste est $E[X_{i+1}\mid\mathcal F_i]-X_i=0$, la propriété de martingale. Sans l'adaptation de $\tau$, l'indicatrice ne sortirait pas et tout s'effondre.

> **La leçon, telle que le cours l'énonce.** *La condition peut être encore affaiblie. La leçon à retenir est qu'**un être mortel n'a aucune stratégie gagnante** — quand le jeu est équitable. En revanche, si l'on a un avantage sur son adversaire, aussi petit soit-il, on gagnera à long terme.*

⚠️ **« Un être mortel » est le mot exact : la borne $\tau\leq T$ est l'hypothèse essentielle.** Elle dit que le joueur ne peut pas jouer indéfiniment. Le concept 7 de la fiche 56 disait la même chose en continu : aucune stratégie **adaptée** ne peut créer de dérive à partir d'un mouvement brownien. C'est le fondement de l'absence d'opportunité d'arbitrage.

**Exercice 5.4 (le paradoxe).** *Dans le jeu de pile ou face, le joueur s'arrête la première fois où son solde atteint $100$. Par définition, $E[X_\tau]=100$. Cela contredit-il le théorème d'arrêt optionnel ?*

**Exercice 5.5.** *Pour deux entiers positifs $a$ et $b$, un joueur s'arrête au premier instant où son solde vaut $a$ ou $-b$. Soit $\tau$ cet instant. Quelle est la loi de $X_\tau$ ?*

**Références du cours** : Ross, *A first course in probability* · Bertsekas et Tsitsiklis, *Introduction to probability* · **Bachelier**, *Théorie de la spéculation*, Annales Scientifiques de l'ENS · Durrett, *Probability: Theory and Examples* · Varadhan, notes de cours.

> **Bachelier (1900) est cité pour une raison.** C'est la première application d'une marche aléatoire — puis d'un mouvement brownien — à la modélisation des prix d'actifs, cinq ans avant Einstein. Toute la fiche 57 en descend.

## Comment résoudre l'exercice type (protocole)

1. **Identifier la structure** : marche aléatoire ? chaîne de Markov ? martingale ? Les trois se recoupent.
2. **Si chaîne de Markov** : écrire l'espace d'états $S$ et la matrice de transition, en **vérifiant la convention** (lignes ou colonnes).
3. **Pour une question à $n$ pas** : calculer $A^n$, éventuellement par diagonalisation.
4. **Pour une question de long terme** : chercher la **distribution stationnaire** — vecteur propre de valeur propre $1$, normalisé à somme $1$.
5. **Si martingale** : vérifier $E[X_{t+1}\mid\mathcal F_t]=X_t$ ; pour une somme, $E[Y]=0$ ; pour un produit, $E[Y]=1$.
6. **Pour une question de sortie d'intervalle** : poser $f(k)$, écrire la récurrence en conditionnant sur le premier pas, ajouter les conditions au bord.
7. **Alternative élégante** : appliquer le **théorème d'arrêt optionnel** — souvent une seule ligne remplace toute la récurrence.
8. **Toujours vérifier les hypothèses du théorème** : $\tau$ est-il un temps d'arrêt ? est-il **borné** ?

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « le futur ne dépend que du présent » | **chaîne de Markov** |
| « probabilité après $n$ étapes » | $A^n$ |
| « à long terme », « fraction du temps » | **distribution stationnaire** |
| « jeu équitable », « gain espéré nul » | **martingale** |
| « premier instant où… » | **temps d'arrêt** |
| « probabilité d'atteindre $A$ avant $-B$ » | ruine du joueur, ou **arrêt optionnel** |
| « le premier pic », « le maximum sur $[0,T]$ » | **pas** un temps d'arrêt |
| « existe-t-il une stratégie gagnante ? » | **non** — arrêt optionnel |

### Exercices progressifs

**Niveau 1** — Vérifiez que la marche aléatoire simple est une martingale.

<details><summary>Correction</summary>

**Le calcul.** $X_{k+1}=X_k+Y_{k+1}$, où $Y_{k+1}$ est **indépendant** de $\mathcal F_k=\{X_0,\dots,X_k\}$. Donc

$$E[X_{k+1}\mid\mathcal F_k]=E[X_k\mid\mathcal F_k]+E[Y_{k+1}\mid\mathcal F_k]=X_k+E[Y_{k+1}]=X_k+0=X_k$$

puisque $E[Y]=\frac12(+1)+\frac12(-1)=0$. C'est bien la définition. $\blacksquare$

**Les deux étapes à justifier.** (1) $X_k$ est $\mathcal F_k$-mesurable, donc sort de l'espérance conditionnelle. (2) $Y_{k+1}$ est indépendant de $\mathcal F_k$, donc son espérance conditionnelle est son espérance tout court.

**La condition générale.** Toute somme de variables i.i.d. **centrées** est une martingale — le cours le note à propos de la proposition 2.1. La symétrie $Y=\pm1$ n'est qu'un cas particulier commode.

⚠️ **Ne pas confondre avec le cas multiplicatif.** Pour $X_k=\prod_iY_i$, la condition n'est plus $E[Y]=0$ mais $E[Y]=1$ — c'est l'exemple 4.3(iii).

</details>

**Niveau 2** — Trouvez la distribution stationnaire de la machine de l'exemple 3.1.

<details><summary>Correction</summary>

**La matrice**, en convention **colonnes** (celle du cours) :

$$A=\begin{pmatrix}0{,}99&0{,}8\\0{,}01&0{,}2\end{pmatrix}$$

avec l'état $1$ = *en marche*, l'état $2$ = *en panne*.

**L'équation.** $\pi$ est vecteur propre de $A$ pour la valeur propre $1$, soit $A\pi=\pi$ :

$$0{,}99\pi_1+0{,}8\pi_2=\pi_1 \qquad\Longrightarrow\qquad 0{,}8\pi_2=0{,}01\pi_1 \qquad\Longrightarrow\qquad \pi_1=80\,\pi_2$$

**La normalisation.** $\pi_1+\pi_2=1$ donne $81\pi_2=1$, donc

$$\pi_2=\frac{1}{81}\approx0{,}0123, \qquad \pi_1=\frac{80}{81}\approx0{,}9877$$

**L'interprétation.** À long terme, la machine fonctionne environ **$98{,}8\,\%$** du temps et est en panne **$1{,}2\,\%$** du temps. C'est la réponse à la question **(b)** de l'introduction du cours : « quelle est la fraction du temps qu'une machine passe à l'arrêt ? »

**Le théorème s'applique-t-il ?** Il exige $p_{ij}>0$ pour tous $i,j$. Ici toutes les entrées sont strictement positives, donc la distribution stationnaire est **unique** et $r_{ij}(n)\to\pi_j$ **quel que soit l'état de départ**. Après quelques semaines, savoir si la machine marchait le premier jour n'apporte plus aucune information.

**Un contrôle de bon sens.** Le rapport $\pi_1/\pi_2=80$ est exactement $0{,}8/0{,}01$ : le rapport entre le taux de réparation et le taux de panne. Une machine qui tombe rarement en panne et se répare vite passe l'essentiel de son temps en marche — et le rapport le quantifie.

</details>

**Niveau 3** — Résolvez l'exercice 5.5 par le théorème d'arrêt optionnel, et comparez à la méthode de récurrence.

<details><summary>Correction</summary>

**Le cadre.** $X$ est la marche aléatoire simple, $X_0=0$, et $\tau$ est le premier instant où $X_\tau=a$ ou $X_\tau=-b$.

**Par l'arrêt optionnel.** $X$ est une martingale et $\tau$ un temps d'arrêt, donc $E[X_\tau]=E[X_0]=0$. Or $X_\tau$ ne prend que deux valeurs. En posant $p=\mathbb P(X_\tau=a)$ :

$$a\,p+(-b)(1-p)=0 \qquad\Longrightarrow\qquad p(a+b)=b \qquad\Longrightarrow\qquad \boxed{p=\frac{b}{a+b}}$$

et $\mathbb P(X_\tau=-b)=\frac{a}{a+b}$.

**Comparaison avec la méthode du concept 2.** La récurrence $f(k)=\frac12f(k+1)+\frac12f(k-1)$ avec $f(a)=1$, $f(-b)=0$ donne une solution linéaire $f(-b+r)=r/(a+b)$, d'où $f(0)=b/(a+b)$. **Même résultat**, obtenu en trois lignes au lieu d'une.

**Ce que l'arrêt optionnel apporte.** Il court-circuite entièrement la résolution de la récurrence : une seule équation, $E[X_\tau]=E[X_0]$, suffit. C'est la méthode de choix dès que le processus est une martingale.

⚠️ **Il y a une subtilité à mentionner.** Le théorème 5.3, tel qu'énoncé, exige $\tau\leq T$ **borné** ; or ici $\tau$ n'est pas borné — il peut prendre des valeurs arbitrairement grandes. Ce qui sauve l'argument, c'est que la marche arrêtée reste **bornée** entre $-b$ et $a$, et que $\tau$ est fini presque sûrement d'espérance finie. C'est précisément l'affaiblissement de l'hypothèse auquel le cours fait allusion : *« la condition peut être encore affaiblie »*.

**Application financière directe.** C'est le calcul d'une stratégie « prendre ses profits à $+a$, couper ses pertes à $-b$ ». Le résultat dit que sur un jeu **équitable**, l'espérance de gain reste **exactement nulle** quel que soit le choix de $a$ et $b$ : on ne fait que redistribuer la probabilité entre un petit gain fréquent et une grosse perte rare. Aucun placement d'ordres ne crée de rendement.

</details>

**Niveau 4 — type examen** — Résolvez l'exercice 5.4 : le joueur qui s'arrête à $100$ contredit-il le théorème ?

<details><summary>Correction</summary>

**Le paradoxe apparent.** Le joueur s'arrête au premier instant où son solde vaut $100$. Par construction $X_\tau=100$, donc $E[X_\tau]=100$. Or $E[X_0]=0$. Le théorème semble violé.

**La réponse : non, il n'y a pas de contradiction — l'hypothèse $\tau\leq T$ est fausse.**

Le théorème 5.3 exige que $\tau$ soit **borné par une constante $T$**. Ici, $\tau$ est fini presque sûrement — la marche aléatoire simple est récurrente, elle atteint $100$ avec probabilité $1$ — mais il n'est **borné par aucune constante** : pour tout $T$, la probabilité $\mathbb P(\tau>T)$ est strictement positive.

**Pourquoi la démonstration échoue précisément.** La preuve écrit

$$X_\tau=X_0+\sum_{i=0}^{T-1}(X_{i+1}-X_i)\mathbf 1_{\{\tau\geq i+1\}}$$

et utilise « $T$ est une constante » pour intervertir somme finie et espérance. Avec $\tau$ non borné, la somme devient **infinie** et l'interversion demande un théorème de convergence (dominée, ou convergence des martingales) dont les hypothèses ne sont pas vérifiées ici.

**Ce qui manque concrètement : $E[\tau]=\infty$.** La marche atteint $100$ presque sûrement, mais le **temps d'attente moyen est infini**. Et pendant l'attente, le solde descend arbitrairement bas : $\min_{k\leq\tau}X_k$ n'est borné par rien.

**La traduction financière — et c'est le vrai enseignement.** Cette stratégie est la **martingale du joueur** (au sens familier) : doubler ou persévérer jusqu'à gagner. Elle « marche » mathématiquement, mais elle exige :

- un **capital infini** — il faut pouvoir encaisser des pertes non bornées ;
- un **temps infini** — l'espérance du temps d'attente diverge ;
- **aucune limite de mise** de la part du casino.

Aucune de ces trois conditions n'existe dans le monde réel. C'est exactement le sens de la formule du cours : *« un **être mortel** n'a aucune stratégie gagnante »*. Le mot « mortel » n'est pas décoratif — il encode les trois contraintes.

**Le lien avec le concept 2.** La probabilité d'atteindre $A$ avant $-B$ vaut $\frac{B}{A+B}$. Faire tendre $B\to\infty$ — capital infini — donne bien une probabilité qui tend vers $1$. Mais avec $B$ **fini**, la probabilité de ruine $\frac{A}{A+B}$ reste strictement positive, et l'espérance de gain est exactement nulle. La borne sur $\tau$ du théorème est la traduction technique de la finitude du capital.

**Et le pendant en temps continu.** C'est la condition $g\in L^2$ du théorème 2.3 de la fiche 56 : sans condition d'intégrabilité, l'intégrale d'Itô cesse d'être une martingale, et les « stratégies de doublement » réapparaissent. C'est pourquoi les modèles de finance mathématique imposent toujours une contrainte d'**admissibilité** aux stratégies.

</details>

## 🔴 Common mistakes

1. **Se tromper de convention pour la matrice de transition** — le cours la prend **stochastique en colonnes** ; beaucoup de manuels utilisent la transposée.
2. **Chercher une distribution stationnaire en espace d'états infini** — le théorème 3.3 **ne s'applique pas** ; la marche aléatoire sur $\mathbb Z$ n'en a aucune.
3. **Confondre les conditions de martingale** — $E[Y]=0$ pour une **somme**, $E[Y]=1$ pour un **produit**.
4. **Croire que tout instant aléatoire est un temps d'arrêt** — le premier **pic** n'en est pas un : il faut voir le futur.
5. **Appliquer l'arrêt optionnel sans vérifier la borne $\tau\leq T$** — c'est exactement le paradoxe de l'exercice 5.4.
6. **Confondre « $\tau$ fini presque sûrement » et « $\tau$ borné »** — la marche atteint $100$ p.s., mais $E[\tau]=\infty$.
7. **Croire qu'un jeu défavorable est une martingale** — la roulette est une **surmartingale** : $X_k>E[X_{k+1}\mid\mathcal F_k]$.
8. **Oublier que la propriété de martingale vaut à tout horizon** — la proposition 4.2 donne $X_s=E[X_t\mid\mathcal F_s]$ pour tout $t\geq s$.
9. **Normaliser la marche par $n$ au lieu de $\sqrt n$** — c'est $\frac{1}{\sqrt n}X_n$ qui converge vers $N(0,1)$.

## 📌 Ultimate Review

1. **Processus stochastique** = collection de variables aléatoires indexées par le temps = **distribution sur des trajectoires**.
2. **Les trois questions** : (a) dépendances dans la suite · (b) moyennes de long terme · (c) événements de bord.
3. **Temps discret** (entiers) ou **continu** (réels).
4. **Marche aléatoire simple** : $Y_i=\pm1$ i.i.d., $X_k=Y_1+\cdots+Y_k$ ; $\frac{1}{\sqrt n}X_n\to N(0,1)$.
5. **Proposition 2.1** : $E[X_k]=0$ · **accroissements indépendants** · **stationnarité** des accroissements. Valables dès que les $Y_i$ sont i.i.d. centrées.
6. **Ruine du joueur** : $f(k)=\frac12f(k+1)+\frac12f(k-1)$, $f(A)=1$, $f(-B)=0$ ⟹ $f$ **linéaire** et $f(0)=\frac{B}{A+B}$.
7. **Propriété de Markov** : $\mathbb P(X_{n+1}=i\mid X_n,\dots,X_0)=\mathbb P(X_{n+1}=i\mid X_n)$.
8. **Transitions** : $p_{ij}=\mathbb P(X_{n+1}=j\mid X_n=i)$, $\sum_jp_{ij}=1$ ; matrice $A$ **stochastique en colonnes**.
9. **$n$ pas** : $r_{ij}(n)=\sum_kr_{ik}(n-1)p_{kj}$, matrice $=A^n$ (Chapman-Kolmogorov).
10. **Distribution stationnaire** : $\pi_j=\sum_k\pi_kp_{kj}$ ; $\pi$ est **vecteur propre de $A$ de valeur propre $1$**.
11. **Théorème 3.3 (Perron-Frobenius)** : si $p_{ij}>0$ pour tous $i,j$, la stationnaire est **unique** et $r_{ij}(n)\to\pi_j$. **Faux** en espace infini.
12. **Martingale** : $X_t=E[X_{t+1}\mid\mathcal F_t]$ ; gain espéré nul ; formalisation du **jeu équitable**.
13. **Proposition 4.2** : $X_s=E[X_t\mid\mathcal F_s]$ pour $t\geq s$.
14. **Exemples** : marche aléatoire **oui** · roulette **non** (surmartingale) · produit de variables d'espérance $1$ **oui**.
15. **Temps d'arrêt** : $\{\tau\leq k\}$ ne dépend que de $X_0,\dots,X_k$. « Atteindre $100$ » **oui** ; « le premier pic » **non**.
16. **Théorème d'arrêt optionnel (Doob, forme faible)** : $X$ martingale, $\tau\leq T$ borné ⟹ $E[X_\tau]=E[X_0]$.
17. **Le pivot de la preuve** : $\mathbf 1_{\{\tau\geq i+1\}}$ est $\mathcal F_i$-mesurable, donc sort de l'espérance conditionnelle.
18. **La leçon** : *un être mortel n'a aucune stratégie gagnante à un jeu équitable* ; mais le moindre avantage finit par payer.

**Formulas to know**

$$X_k=Y_1+\cdots+Y_k, \qquad \tfrac{1}{\sqrt n}X_n\to N(0,1), \qquad f(0)=\frac{B}{A+B}$$

$$r_{ij}(n)=\sum_kr_{ik}(n-1)p_{kj}, \qquad \pi_j=\sum_k\pi_kp_{kj}, \qquad A\pi=\pi$$

$$X_t=E[X_{t+1}\mid\mathcal F_t], \qquad E[X_\tau]=E[X_0] \ \ (\tau\leq T)$$

**Methods to know** : la récurrence de la ruine du joueur et sa résolution linéaire ; le calcul d'une distribution stationnaire par vecteur propre ; la preuve du théorème d'arrêt optionnel ; l'usage de l'arrêt optionnel pour court-circuiter une récurrence.

## 🧠 Active Recall

**Basic** — Donnez les trois propriétés de la marche aléatoire simple.

<details><summary>Réponse</summary>

**(i)** $E[X_k]=0$ pour tout $k$. **(ii) Accroissements indépendants** : pour $0=k_0\leq k_1\leq\cdots\leq k_r$, les $X_{k_{i+1}}-X_{k_i}$ sont **mutuellement indépendants**. **(iii) Stationnarité** : pour $h\geq1$ et $k\geq0$, la loi de $X_{k+h}-X_k$ est la même que celle de $X_h$.

⚠️ Ces propriétés valent **dès que les $Y_i$ sont i.i.d. de moyenne nulle** — la symétrie $\pm1$ n'est pas nécessaire. Et ce sont **exactement** les propriétés du processus de Wiener (fiche 53), à la loi des accroissements près.

</details>

**Understanding** — Qu'est-ce qu'une distribution stationnaire, et que garantit le théorème 3.3 ?

<details><summary>Réponse</summary>

**Définition** : une distribution $\pi$ sur $S$ telle que $\pi_j=\sum_k\pi_kp_{kj}$ pour tout $j$. Autrement dit, si $X_0\sim\pi$, alors $X_1\sim\pi$ aussi : **la loi ne bouge plus**.

**Lecture algébrique** : $\pi$ est un **vecteur propre de $A$ pour la valeur propre $1$**, normalisé à somme $1$.

**Théorème 3.3** : si $p_{ij}>0$ pour tous $i,j\in S$ (espace **fini**), alors la stationnaire est **unique** et

$$\lim_{n\to\infty}r_{ij}(n)=\pi_j \qquad \forall i,j$$

La limite **ne dépend pas de $i$** : la chaîne **oublie son point de départ**.

⚠️ *Un théorème correspondant n'est pas vrai en espace d'états infini* — la marche aléatoire sur $\mathbb Z$ n'a aucune distribution stationnaire.

</details>

**Application** — Quelle est la probabilité de gagner $100$ avant de perdre $50$ à pile ou face ?

<details><summary>Réponse</summary>

C'est la ruine du joueur avec $A=100$ et $B=50$ :

$$f(0)=\frac{B}{A+B}=\frac{50}{150}=\frac13\approx33{,}3\,\%$$

**Le contrôle par l'espérance.** Gain $+100$ avec probabilité $\frac13$, perte $-50$ avec probabilité $\frac23$ :

$$E[\text{gain}]=\tfrac13(100)+\tfrac23(-50)=\tfrac{100}{3}-\tfrac{100}{3}=0 \qquad\checkmark$$

C'est le théorème d'arrêt optionnel : le jeu est équitable, l'espérance reste nulle.

**La leçon de gestion du risque.** Viser un gain **deux fois** plus grand que la perte acceptée donne **une chance sur trois** de réussir. Le ratio gain/perte et la probabilité de succès sont indissolublement liés : on ne peut pas améliorer l'un sans dégrader l'autre. Aucun placement d'ordres ne crée de rendement sur un jeu équitable.

</details>

**Comparison** — Martingale, surmartingale, sous-martingale : quelle différence ?

<details><summary>Réponse</summary>

|  | Condition | Interprétation |
|---|---|---|
| **Martingale** | $X_t=E[X_{t+1}\mid\mathcal F_t]$ | jeu **équitable**, gain espéré nul |
| **Surmartingale** | $X_t\geq E[X_{t+1}\mid\mathcal F_t]$ | jeu **défavorable** au joueur |
| **Sous-martingale** | $X_t\leq E[X_{t+1}\mid\mathcal F_t]$ | jeu **favorable** au joueur |

**L'exemple du cours** : *le solde d'un joueur de roulette n'est pas une martingale — on a toujours $X_k>E[X_{k+1}\mid\mathcal F_k]$*. Le zéro de la roulette donne un avantage à la maison : c'est une **surmartingale stricte**.

**Le lien avec la finance.** Sous la mesure **réelle**, le prix actualisé d'une action est une **sous-martingale** : il rapporte une prime de risque, donc dérive vers le haut. Sous la mesure **risque-neutre** de la fiche 57, cette dérive est exactement annulée et le prix actualisé devient une **martingale** — c'est toute la valorisation par arbitrage.

</details>

**Exam-style** — Énoncez le théorème d'arrêt optionnel, démontrez-le, et expliquez sa portée.

<details><summary>Réponse</summary>

**Énoncé (Doob, forme faible).** Si $X_0,X_1,\dots$ est une martingale et $\tau$ un temps d'arrêt tel que $\tau\leq T$ pour une **constante** $T$, alors $E[X_\tau]=E[X_0]$.

**Démonstration.** Comme $\tau\leq T$, on peut écrire

$$X_\tau=X_0+\sum_{i=0}^{T-1}(X_{i+1}-X_i)\cdot\mathbf 1_{\{\tau\geq i+1\}}$$

et, $T$ étant constant, la linéarité de l'espérance donne

$$E[X_\tau]=E[X_0]+\sum_{i=0}^{T-1}E\big[(X_{i+1}-X_i)\mathbf 1_{\{\tau\geq i+1\}}\big]$$

**L'observation principale** : $\{\tau\geq i+1\}$ est le complémentaire de $\{\tau\leq i\}$, qui ne dépend que de $X_0,\dots,X_i$ — c'est la **définition** d'un temps d'arrêt. L'indicatrice est donc $\mathcal F_i$-mesurable et sort de l'espérance conditionnelle :

$$E\big[(X_{i+1}-X_i)\mathbf 1_{\{\tau\geq i+1\}}\big]=E\Big[\big(E[X_{i+1}\mid\mathcal F_i]-X_i\big)\mathbf 1_{\{\tau\geq i+1\}}\Big]=E[0]=0$$

D'où $E[X_\tau]=E[X_0]$. $\blacksquare$

**Où chaque hypothèse sert.**

- **$X$ martingale** : c'est ce qui annule $E[X_{i+1}\mid\mathcal F_i]-X_i$.
- **$\tau$ temps d'arrêt** : c'est ce qui rend l'indicatrice $\mathcal F_i$-mesurable.
- **$\tau\leq T$ borné** : c'est ce qui rend la somme **finie**, donc l'interversion avec l'espérance légitime.

**Sa portée — la formule du cours.** *« Un être mortel n'a aucune stratégie gagnante » à un jeu équitable.* Aucun choix de moment d'arrêt — aussi astucieux soit-il — ne modifie l'espérance. **En revanche**, le moindre avantage sur l'adversaire finit par payer à long terme.

**Sa limite, à connaître.** L'exercice 5.4 en donne le contre-exemple : s'arrêter à $+100$ garantit $E[X_\tau]=100\neq0$. Il n'y a pas contradiction, parce que $\tau$ **n'est pas borné** — il est fini presque sûrement mais d'espérance infinie, et le solde descend arbitrairement bas dans l'intervalle. Il faudrait un capital infini et un temps infini : c'est là qu'intervient la mortalité.

**Ses deux usages.**

1. **Calculatoire** : il court-circuite les récurrences. L'exercice 5.5 se résout en une ligne — $a\,p-b(1-p)=0$ donne $p=\frac{b}{a+b}$ — là où la méthode du concept 2 demande de résoudre une équation aux différences.
2. **Conceptuel** : c'est la version discrète du résultat de la fiche 56 selon lequel l'intégrale d'Itô d'un processus **adapté** est une martingale. Dans les deux cas, l'énoncé est le même : **on ne peut pas gagner en moyenne à un jeu équitable quand on ne voit pas le futur**. C'est le fondement de l'absence d'opportunité d'arbitrage.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Définition d'un processus stochastique ? | Collection de variables aléatoires **indexées par le temps** |
| Vue alternative ? | Une **distribution sur un espace de trajectoires** |
| Les trois questions du cours ? | Dépendances · moyennes de long terme · événements de bord |
| Construction de la marche aléatoire ? | $Y_i=\pm1$ i.i.d., $X_k=Y_1+\cdots+Y_k$, $X_0=0$ |
| Vers quoi converge $\frac{1}{\sqrt n}X_n$ ? | $N(0,1)$ |
| Les trois propriétés de la marche ? | $E[X_k]=0$ · accroissements **indépendants** · **stationnaires** |
| Ces propriétés exigent quoi ? | Des $Y_i$ **i.i.d. centrées** |
| Récurrence de la ruine du joueur ? | $f(k)=\frac12f(k+1)+\frac12f(k-1)$ |
| Solution de la ruine du joueur ? | $f(0)=\frac{B}{A+B}$ |
| Pourquoi $f$ est-elle linéaire ? | Les différences successives sont constantes (harmonicité) |
| Propriété de Markov ? | $\mathbb P(X_{n+1}\mid X_n,\dots,X_0)=\mathbb P(X_{n+1}\mid X_n)$ |
| Convention de la matrice $A$ du cours ? | **Stochastique en colonnes** |
| Matrice de transition à $n$ pas ? | $A^n$ |
| Récurrence de Chapman-Kolmogorov ? | $r_{ij}(n)=\sum_kr_{ik}(n-1)p_{kj}$ |
| Définition d'une distribution stationnaire ? | $\pi_j=\sum_k\pi_kp_{kj}$ |
| Lecture algébrique de $\pi$ ? | **Vecteur propre de $A$** de valeur propre $1$ |
| Hypothèse du théorème 3.3 ? | $p_{ij}>0$ pour **tous** $i,j$, espace **fini** |
| Que garantit-il ? | Unicité de $\pi$ et $r_{ij}(n)\to\pi_j$ |
| Vaut-il en espace infini ? | **Non** |
| Définition d'une martingale ? | $X_t=E[X_{t+1}\mid\mathcal F_t]$ |
| Que dit-elle en une phrase ? | Le **gain espéré est nul** — jeu équitable |
| Propriété à tout horizon ? | $X_s=E[X_t\mid\mathcal F_s]$ pour $t\geq s$ |
| La roulette est-elle une martingale ? | **Non** — surmartingale, $X_k>E[X_{k+1}\mid\mathcal F_k]$ |
| Condition pour un produit ? | $E[Y]=1$ (et non $0$) |
| Définition d'un temps d'arrêt ? | $\{\tau\leq k\}$ ne dépend que de $X_0,\dots,X_k$ |
| « Atteindre $100$ » est-il un temps d'arrêt ? | **Oui** |
| « Le premier pic » ? | **Non** — il faut voir le futur |
| Théorème d'arrêt optionnel ? | $X$ martingale, $\tau\leq T$ ⟹ $E[X_\tau]=E[X_0]$ |
| Le pivot de sa démonstration ? | $\mathbf 1_{\{\tau\geq i+1\}}$ est $\mathcal F_i$-mesurable |
| Sa leçon ? | *Un être mortel n'a aucune stratégie gagnante* |
| Pourquoi « atteindre $100$ » ne le contredit pas ? | $\tau$ n'est **pas borné** ; $E[\tau]=\infty$ |
