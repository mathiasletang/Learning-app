# Fiche 44 — Programmation dynamique : le problème de base et le principe d'optimalité

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Bertsekas, *6.231 Dynamic Programming*, MIT OpenCourseWare, automne 2015 — cours 1 et 2 |
| **Difficulté** | Must know — la porte d'entrée de toute la décision séquentielle |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Probabilités introductives, espérance conditionnelle ; fiche 36 (forme standard d'un problème d'optimisation) |
| **Concepts clés** | Système dynamique discret, état, commande, aléa, politique, coût additif, principe d'optimalité, algorithme DP, rétropropagation, boucle ouverte contre boucle fermée, augmentation d'état |
| **Poids à l'examen** | Deux gestes : **écrire la récurrence de Bellman** pour un problème donné, et **la dérouler à rebours** sur un petit exemple. C'est aussi le socle mathématique de la macroéconomie dynamique et des modèles de décision intertemporelle. |

## 🎯 Vue d'ensemble

Jusqu'ici, on optimisait **un vecteur** $x$, une fois pour toutes. La programmation dynamique optimise **une suite de décisions**, prises l'une après l'autre, en tenant compte de l'information qui arrive **entre** les décisions.

```
SYSTÈME     x_{k+1} = f_k(x_k, u_k, w_k)        état, commande, aléa
COÛT        E[ g_N(x_N) + Σ_k g_k(x_k, u_k, w_k) ]     additif dans le temps
DÉCIDER     non pas une suite de nombres u_0,…,u_{N−1}
            mais une suite de RÈGLES  u_k = μ_k(x_k)   ← une POLITIQUE
```

**L'idée qui rend tout calculable** tient en une phrase : *l'optimisation du futur ne dépend pas de ce qu'on a fait dans le passé.* C'est le **principe d'optimalité**, et il transforme un problème d'optimisation sur des fonctions en une **récurrence à rebours**.

## 🟡 Concept 1 — La programmation dynamique comme méthodologie

**Le problème d'optimisation générique** du cours :

$$\min_{u\in U} g(u)$$

où $u$ est la variable de décision, $g$ le coût, $U$ l'ensemble de contraintes. Les catégories habituelles :

- **discret** ($U$ fini) ou **continu** ;
- **linéaire** ($g$ linéaire, $U$ polyédral) ou non linéaire ;
- **stochastique** ou déterministe — dans le cas stochastique, le coût fait intervenir un paramètre aléatoire $w$ que l'on moyenne : $g(u) = \mathbb{E}_w\big[G(u,w)\big]$.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que la DP apporte de spécifique.</span>

*Elle sait traiter des problèmes stochastiques complexes où l'information sur $w$ devient disponible **par étapes**, et où les décisions sont elles aussi prises **par étapes** en utilisant cette information.* C'est exactement ce qu'aucun des chapitres précédents ne savait faire : là, on décidait tout d'un coup, avant de rien observer.

</div>

## 🔴 Concept 2 — La structure de base

**Système en temps discret.**

$$x_{k+1} = f_k(x_k,u_k,w_k), \qquad k=0,1,\dots,N-1$$

| Symbole | Nom | Rôle |
|---|---|---|
| $k$ | temps discret | l'étape |
| $x_k$ | **état** | *résume l'information passée pertinente pour l'optimisation future* |
| $u_k$ | **commande** | la décision, choisie dans un ensemble donné |
| $w_k$ | **aléa** | perturbation ou bruit selon le contexte |
| $N$ | **horizon** | nombre de fois où l'on applique une commande |

**Coût additif dans le temps.**

$$\mathbb{E}\Big[g_N(x_N) + \sum_{k=0}^{N-1}g_k(x_k,u_k,w_k)\Big]$$

> **La définition de l'état est la seule chose vraiment difficile.** *L'état résume l'information passée pertinente pour l'optimisation future* : ni plus (on gonflerait inutilement le problème), ni moins (la récurrence serait fausse). Tout le travail de modélisation en DP consiste à trouver le bon état.

**Description alternative.** Au lieu de $f_k$ et de la loi de $w_k$, on peut se donner directement la **loi de transition** $P(x_{k+1}\mid x_k,u_k)$ : il suffit de poser $x_{k+1}=w_k$ avec $P(w_k\mid x_k,u_k) = P(x_{k+1}\mid x_k,u_k)$. C'est la formulation « chaîne de Markov contrôlée », celle qu'on rencontre en économie.

### Les deux hypothèses qui font marcher la DP

1. L'ensemble des valeurs que peut prendre $u_k$ dépend **au plus de $x_k$**, et non des $x$ ou $u$ antérieurs.
2. La loi de $w_k$ **ne dépend pas** des valeurs passées $w_{k-1},\dots,w_0$ ; elle peut dépendre de $x_k$ et $u_k$.

> *Sinon, les valeurs passées de $w$ ou de $x$ seraient utiles pour l'optimisation future* — c'est-à-dire que $x_k$ ne serait pas un état. Les deux hypothèses ne sont donc pas des restrictions techniques : elles **définissent** ce qu'est un état.

**La chronologie d'une période $k$**, à avoir en tête :

$$x_k \ \text{ apparaît, } \ x_k = f_{k-1}(x_{k-1},u_{k-1},w_{k-1}) \ \longrightarrow\ u_k \ \text{ choisi en CONNAISSANT } x_k \ \longrightarrow\ w_k \ \text{ tiré selon } P_{w_k}(\cdot\mid x_k,u_k)$$

⚠️ L'ordre compte : on choisit $u_k$ **après** avoir observé $x_k$ mais **avant** de connaître $w_k$. C'est ce décalage qui crée toute la difficulté — et toute la valeur de l'information.

### Exemple fil rouge : la gestion de stock

$$x_{k+1} = f_k(x_k,u_k,w_k) = x_k+u_k-w_k$$

avec $x_k$ le stock en début de période, $u_k$ la quantité commandée, $w_k$ la **demande** de la période. Le coût :

$$\mathbb{E}\Big[g_N(x_N)+\sum_{k=0}^{N-1}\big(c\,u_k + r(x_k+u_k-w_k)\big)\Big]$$

où $c$ est le coût unitaire d'achat et $r(\cdot)$ le coût de stockage ou de rupture sur le stock final de période.

## 🔴 Concept 3 — Politiques et problème de base

**Politique.** $\pi = \{\mu_0,\dots,\mu_{N-1}\}$, où chaque $\mu_k$ associe à un état $x_k$ une commande $u_k=\mu_k(x_k)$, avec $\mu_k(x_k)\in U_k(x_k)$ pour tout $x_k$.

> **On n'optimise pas sur des nombres, on optimise sur des FONCTIONS.** C'est la différence fondamentale avec tout ce qui précède. Une politique est une *règle* qui dit quoi faire dans chaque situation possible — pas un plan d'action figé.

**Coût espéré d'une politique** partant de $x_0$ :

$$J_\pi(x_0) = \mathbb{E}\Big[g_N(x_N)+\sum_{k=0}^{N-1}g_k\big(x_k,\mu_k(x_k),w_k\big)\Big]$$

**Fonction de coût optimal** et **politique optimale** :

$$J^\star(x_0) = \min_\pi J_\pi(x_0), \qquad \pi^\star \text{ optimale si } J_{\pi^\star}(x_0)=J^\star(x_0)$$

> **Un fait remarquable, souligné par Bertsekas.** Lorsqu'elle est produite par la DP, la politique optimale $\pi^\star$ est **indépendante de $x_0$** : la même règle est optimale quel que soit le point de départ. On ne calcule pas une trajectoire, on calcule une **stratégie universelle**.

## 🟠 Concept 4 — Boucle ouverte contre boucle fermée

**Boucle ouverte** : on fixe la suite $u_0,\dots,u_{N-1}$ à l'avance, sans jamais regarder l'état. **Boucle fermée** (*feedback*) : $u_k = \mu_k(x_k)$, la décision s'adapte à ce qu'on observe.

> **Dans les problèmes déterministes, la boucle ouverte vaut la boucle fermée.** Comme il n'y a pas d'aléa, l'état futur est parfaitement prévisible : observer ne apprend rien. **Dès qu'il y a de l'aléa, la boucle fermée est strictement meilleure** — c'est la *valeur de l'information*.

### L'exemple du match d'échecs

Deux parties. Le joueur a deux styles :

| Style | Résultat |
|---|---|
| **prudent** | nulle avec probabilité $p_d>0$, défaite avec probabilité $1-p_d$ |
| **audacieux** | victoire avec probabilité $p_w<1/2$, défaite avec probabilité $1-p_w$ |

- **Politique en boucle ouverte** : jouer toujours audacieux.
- **Politique en boucle fermée** : *jouer prudent si et seulement si l'on mène*.

**L'arbre de la politique en boucle fermée** (slide 10 du cours). On n'est pas devant, donc **audacieux** en première partie :

- **victoire** (prob. $p_w$) → score $1$–$0$, on mène → **prudent** :
  - nulle (prob. $p_d$) → $1{,}5$–$0{,}5$ : **match gagné** ;
  - défaite (prob. $1-p_d$) → $1$–$1$ : égalité ;
- **défaite** (prob. $1-p_w$) → $0$–$1$, on est mené → **audacieux** :
  - victoire (prob. $p_w$) → $1$–$1$ : égalité ;
  - défaite (prob. $1-p_w$) → $0$–$2$ : **match perdu**.

<div class="callout" data-kind="plus">

<span class="callout__lab">AJOUT — le calcul, sous une hypothèse explicite.</span>

Le cours ne chiffre pas l'exemple. Si l'on suppose qu'une égalité $1$–$1$ se départage par une partie de mort subite jouée en audacieux (gagnée avec probabilité $p_w$), on obtient

$$\mathbb{P}(\text{match gagné}) = \underbrace{p_w p_d}_{\text{gagné en deux parties}} + \underbrace{\big(p_w(1-p_d)+(1-p_w)p_w\big)}_{\mathbb{P}(1\text{–}1)}\cdot p_w = p_wp_d + p_w^2(2-p_d-p_w)$$

Avec $p_w = 0{,}45$ et $p_d = 0{,}9$ : $\approx0{,}405+0{,}2025\times0{,}65\approx0{,}54$ — **le joueur est favori**, alors qu'il perd chaque partie plus souvent qu'il ne la gagne. Cette hypothèse de départage n'est **pas** dans les transparents : c'est une convention que j'ajoute pour rendre le calcul possible.

</div>

**Ce que l'exemple enseigne.** Adapter son style à la position **crée** un avantage à partir de deux styles individuellement défavorables. C'est la valeur de l'information, et c'est exactement pourquoi on optimise sur des **politiques** et non sur des suites.

## 🔴 Concept 5 — Le principe d'optimalité

Soit $\pi^\star=\{\mu_0^\star,\dots,\mu_{N-1}^\star\}$ une politique optimale. Considérons le **sous-problème de queue** : on est en $x_i$ à l'instant $i$ et l'on veut minimiser le **coût-à-venir** de $i$ à $N$ :

$$\mathbb{E}\Big[g_N(x_N)+\sum_{k=i}^{N-1}g_k\big(x_k,\mu_k(x_k),w_k\big)\Big]$$

et la **politique de queue** $\{\mu_i^\star,\mu_{i+1}^\star,\dots,\mu_{N-1}^\star\}$.

> **Principe d'optimalité.** *La politique de queue est optimale pour le sous-problème de queue.* Autrement dit : **l'optimisation du futur ne dépend pas de ce qu'on a fait dans le passé.**

**Ce que la DP en fait.** Elle résout **d'abord tous** les sous-problèmes de queue de la **dernière** étape ; puis, à l'étape générique, elle résout **tous** les sous-problèmes de queue d'une longueur donnée, **en utilisant** la solution des sous-problèmes de queue plus courts.

⚠️ Le principe d'optimalité ne dit pas que le passé est sans importance : il dit que **tout ce qui compte du passé est résumé dans l'état courant $x_i$**. Si ce n'est pas le cas, c'est que l'état est mal choisi — voir l'augmentation d'état (concept 8).

## 🔴 Concept 6 — L'algorithme de programmation dynamique

**Initialisation** — le coût terminal :

$$J_N(x_N) = g_N(x_N)$$

**Récurrence à rebours**, pour $k=N-1,N-2,\dots,0$ :

$$\boxed{\ J_k(x_k) = \min_{u_k\in U_k(x_k)} \ \mathbb{E}_{w_k}\Big[g_k(x_k,u_k,w_k) + J_{k+1}\big(f_k(x_k,u_k,w_k)\big)\Big]\ }$$

Alors $J_0(x_0)$, produit au dernier pas, **est égal** au coût optimal $J^\star(x_0)$. Et la politique $\pi^\star=\{\mu_0^\star,\dots,\mu_{N-1}^\star\}$ où $\mu_k^\star(x_k)$ **atteint le minimum** du membre de droite, pour chaque $x_k$ et chaque $k$, est **optimale**.

**Justification.** Récurrence sur $k$ : on montre que $J_k(x_k)$ est égal au coût optimal $J_k^\star(x_k)$ du sous-problème de queue démarrant à l'instant $k$ dans l'état $x_k$.

**La preuve du pas de récurrence (celle du cours).** En supposant $J_{k+1}=J_{k+1}^\star$ :

$$\begin{aligned} J_k^\star(x_k) &= \min_{(\mu_k,\pi^{k+1})}\ \mathbb{E}_{w_k,\dots,w_{N-1}}\Big[g_k\big(x_k,\mu_k(x_k),w_k\big)+g_N(x_N)+\sum_{i=k+1}^{N-1}g_i\big(x_i,\mu_i(x_i),w_i\big)\Big]\\[4pt] &= \min_{\mu_k}\ \mathbb{E}_{w_k}\Big[g_k\big(x_k,\mu_k(x_k),w_k\big) + \min_{\pi^{k+1}}\mathbb{E}\Big[g_N(x_N)+\sum_{i=k+1}^{N-1}g_i\big(x_i,\mu_i(x_i),w_i\big)\Big]\Big]\\[4pt] &= \min_{\mu_k}\ \mathbb{E}_{w_k}\Big[g_k\big(x_k,\mu_k(x_k),w_k\big)+J_{k+1}\big(f_k(x_k,\mu_k(x_k),w_k)\big)\Big]\\[4pt] &= \min_{u_k\in U_k(x_k)}\ \mathbb{E}_{w_k}\Big[g_k(x_k,u_k,w_k)+J_{k+1}\big(f_k(x_k,u_k,w_k)\big)\Big] \ = \ J_k(x_k)\end{aligned}$$

> **La deuxième ligne est le cœur de la preuve** : on **sépare** le minimum sur $\mu_k$ de celui sur la politique de queue $\pi^{k+1}$. C'est licite précisément parce que le sous-problème de queue ne dépend du passé qu'à travers $x_{k+1}$ — c'est le principe d'optimalité en action. **La dernière ligne** remplace la minimisation sur une **fonction** $\mu_k$ par une minimisation sur un **vecteur** $u_k$, état par état : c'est ce qui rend le calcul possible.

**Les deux remarques du cours, à retenir.**

- **Tous** les sous-problèmes de queue sont résolus, en plus du problème d'origine — on obtient bien plus qu'une trajectoire.
- **Les besoins de calcul sont intensifs** : il faut balayer tout l'espace d'états à chaque étape. C'est la fameuse « malédiction de la dimension », et c'est ce qui motivera les méthodes approchées.

### Exemple : ordonnancement déterministe

Trouver l'ordre optimal des opérations A, B, C, D, sachant que **A précède B** et **C précède D**, avec des coûts de démarrage $S_A$, $S_C$ et des coûts de transition $C_{mn}$ de l'opération $m$ à l'opération $n$.

**La méthode.** On part du **dernier** sous-problème de queue et l'on remonte. **À chaque couple état-instant, on enregistre le coût-à-venir optimal et la décision optimale.** L'état est ici la suite des opérations déjà effectuées — et le graphe des états se referme : `AC` et `CA` mènent au même état, ce qui est précisément l'économie que réalise la DP par rapport à l'énumération des $4!$ ordres.

### Exemple : gestion de stock stochastique

**Sous-problèmes de queue de longueur 1 :**

$$J_{N-1}(x_{N-1}) = \min_{u_{N-1}\geq0}\ \mathbb{E}_{w_{N-1}}\Big[c\,u_{N-1}+r(x_{N-1}+u_{N-1}-w_{N-1})\Big]$$

**Sous-problèmes de queue de longueur $N-k$ :**

$$J_k(x_k) = \min_{u_k\geq0}\ \mathbb{E}_{w_k}\Big[c\,u_k+r(x_k+u_k-w_k)+J_{k+1}(x_k+u_k-w_k)\Big]$$

et $J_0(x_0)$ est le coût optimal depuis l'état initial $x_0$.

## 🟠 Concept 7 — L'exemple linéaire-quadratique

Deux fours en série. Une pièce de température initiale $x_0$ traverse le four 1 puis le four 2 ; on veut atteindre une température cible $T$ en dépensant peu d'énergie.

**Système** : $x_{k+1} = (1-a)x_k + a\,u_k$ pour $k=0,1$, avec $a\in\,]0,1[$ donné. **Coût** : $r(x_2-T)^2+u_0^2+u_1^2$, avec $r>0$ donné.

**Algorithme DP.**

$$J_2(x_2) = r(x_2-T)^2$$

$$J_1(x_1) = \min_{u_1}\Big[u_1^2 + r\big((1-a)x_1+a u_1 - T\big)^2\Big]$$

$$J_0(x_0) = \min_{u_0}\Big[u_0^2 + J_1\big((1-a)x_0+a u_0\big)\Big]$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ce cas est central.</span>

Chaque minimisation est celle d'une **quadratique convexe en $u_k$** : elle se résout **analytiquement**, et le résultat $J_1$ est encore une quadratique en $x_1$. La forme quadratique se **propage** à rebours. C'est le seul cadre continu où la DP se mène entièrement à la main — d'où son omniprésence en contrôle et en macroéconomie.

</div>

## 🟠 Concept 8 — Augmentation d'état

Quand les hypothèses du problème de base sont violées — perturbations **corrélées**, coût **non additif**, retards — on **reformule en augmentant l'état**. L'algorithme DP s'applique toujours, mais **le problème grossit**.

**Exemple : les retards.** Si le système s'écrit

$$x_{k+1} = f_k(x_k,\,x_{k-1},\,u_k,w_k)$$

alors $x_k$ **n'est pas** un état : le passé lointain influence encore le futur. On introduit la variable supplémentaire $y_k = x_{k-1}$, et le nouveau système devient

$$\begin{pmatrix}x_{k+1}\\ y_{k+1}\end{pmatrix} = \begin{pmatrix}f_k(x_k,y_k,u_k,w_k)\\ x_k\end{pmatrix}$$

On considère $\tilde x_k = (x_k,y_k)$ comme le **nouvel état**, et la récurrence devient

$$J_k(x_k,x_{k-1}) = \min_{u_k\in U_k(x_k)}\ \mathbb{E}_{w_k}\Big[g_k(x_k,u_k,w_k)+J_{k+1}\big(f_k(x_k,x_{k-1},u_k,w_k),\ x_k\big)\Big]$$

⚠️ **L'augmentation d'état n'est pas gratuite.** Chaque variable ajoutée multiplie la taille de l'espace d'états, donc le coût de la récurrence. C'est le compromis permanent de la DP : un état plus riche rend le problème correct, mais plus cher.

### Comment résoudre l'exercice type (protocole)

1. **Identifier l'horizon $N$** et le découpage temporel.
2. **Choisir l'état $x_k$** — la question décisive : quelle information passée est **pertinente pour le futur** ? Si un élément du passé influence encore le futur, il doit entrer dans l'état.
3. **Identifier la commande $u_k$** et son ensemble de contraintes $U_k(x_k)$.
4. **Identifier l'aléa $w_k$** et sa loi conditionnelle $P(w_k\mid x_k,u_k)$ — vérifier qu'elle ne dépend pas du passé.
5. **Écrire la dynamique** $x_{k+1}=f_k(x_k,u_k,w_k)$ et le **coût par étape** $g_k$, plus le coût terminal $g_N$.
6. **Vérifier l'additivité** du coût ; sinon, augmenter l'état.
7. **Poser $J_N=g_N$** et dérouler la récurrence **à rebours**, en enregistrant à chaque couple état-instant le **coût-à-venir** et la **décision optimale**.
8. **Lire la politique** : $\mu_k^\star(x_k)$ est l'argmin à l'étape $k$. Conclure sur $J_0(x_0)$.

### Exercices progressifs

**Niveau 1** — Dans le problème de gestion de stock, quel est l'état ? Pourquoi la demande passée n'en fait-elle pas partie ?

<details><summary>Correction</summary>

L'état est le **stock disponible** $x_k$. La demande passée $w_{k-1},w_{k-2},\dots$ n'en fait pas partie parce que, sous l'hypothèse que les $w_k$ sont indépendants, elle n'apporte **aucune information sur la demande future** — et son effet sur le futur est déjà **entièrement résumé** par le stock courant.

**Attention à la réciproque :** si les demandes étaient **corrélées** (par exemple $w_k$ dépendant de $w_{k-1}$), l'hypothèse 2 tomberait, et il faudrait **augmenter l'état** en $(x_k,w_{k-1})$.

</details>

**Niveau 2** — Pourquoi la boucle fermée n'apporte-t-elle rien dans un problème déterministe ?

<details><summary>Correction</summary>

Sans aléa, la trajectoire $x_1,x_2,\dots$ est **entièrement déterminée** par $x_0$ et la suite $u_0,u_1,\dots$ : on peut la calculer d'avance. Observer $x_k$ en cours de route **n'apprend donc rien** qu'on ne sût déjà. Toute politique en boucle fermée $\{\mu_k\}$ engendre depuis $x_0$ une suite de commandes que l'on peut reproduire à l'identique en boucle ouverte, et réciproquement : les deux classes atteignent **le même coût optimal**.

*La conséquence pratique :* en déterministe, la DP reste utile comme **méthode de calcul** (elle décompose le problème), pas comme façon d'exploiter l'information.

</details>

**Niveau 3** — Résolvez le problème des deux fours pour $a=1/2$, $r=1$, $T=0$.

<details><summary>Correction</summary>

Avec $a=1/2$ : $x_{k+1}=\tfrac12x_k+\tfrac12u_k$, et le coût est $x_2^2+u_0^2+u_1^2$.

*Étape 1 — $J_2$.* $J_2(x_2)=x_2^2$.

*Étape 2 — $J_1$.*

$$J_1(x_1) = \min_{u_1}\Big[u_1^2+\big(\tfrac12x_1+\tfrac12u_1\big)^2\Big]$$

On dérive : $2u_1 + 2\cdot\tfrac12\big(\tfrac12x_1+\tfrac12u_1\big) = 0$, soit $2u_1+\tfrac12 u_1 = -\tfrac12x_1$, d'où

$$\mu_1^\star(x_1) = -\frac{x_1}{5}$$

En reportant : $x_2 = \tfrac12x_1-\tfrac1{10}x_1 = \tfrac25x_1$, et

$$J_1(x_1) = \frac{x_1^2}{25}+\frac{4x_1^2}{25} = \frac{x_1^2}{5}$$

*Étape 3 — $J_0$.*

$$J_0(x_0)=\min_{u_0}\Big[u_0^2+\tfrac15\big(\tfrac12x_0+\tfrac12u_0\big)^2\Big]$$

Dérivée : $2u_0+\tfrac15\cdot\tfrac12\big(\tfrac12x_0+\tfrac12u_0\big)\cdot 2 = 0$, soit $2u_0+\tfrac1{10}u_0 = -\tfrac1{10}x_0$, d'où

$$\mu_0^\star(x_0) = -\frac{x_0}{21}, \qquad J_0(x_0) = \frac{x_0^2}{21}$$

**Ce qu'on observe.** La politique optimale est **linéaire en l'état** ($\mu_k^\star(x_k)=L_kx_k$) et le coût optimal **quadratique** ($J_k(x_k)=K_kx_k^2$) : la structure se propage à rebours. C'est le résultat général du cas linéaire-quadratique.

</details>

**Niveau 4 — type examen** — Un consommateur dispose d'une richesse $x_0$ et vit $N$ périodes. À chaque période il consomme $u_k\in[0,x_k]$, en tire l'utilité $\log u_k$, et le reste croît au taux $R>0$ : $x_{k+1}=R(x_k-u_k)$. Il maximise $\sum_{k=0}^{N-1}\beta^k\log u_k$ avec $\beta\in\,]0,1[$. Écrivez la récurrence de Bellman et résolvez pour $N=2$.

<details><summary>Correction</summary>

**Mise en forme.** On maximise, donc on écrit la récurrence en $\max$ (ou l'on minimise $-\sum\beta^k\log u_k$). Avec un coût terminal nul, $J_2(x_2)=0$ et

$$J_k(x_k) = \max_{0\leq u_k\leq x_k}\Big[\beta^k\log u_k + J_{k+1}\big(R(x_k-u_k)\big)\Big]$$

**Étape 1 — dernière période ($k=1$).** Comme $J_2\equiv0$, on maximise $\beta\log u_1$ sur $[0,x_1]$ : la fonction est croissante, donc

$$\mu_1^\star(x_1)=x_1, \qquad J_1(x_1)=\beta\log x_1$$

*On consomme tout à la dernière période — il n'y a plus de futur à financer.*

**Étape 2 — première période ($k=0$).**

$$J_0(x_0)=\max_{0\leq u_0\leq x_0}\Big[\log u_0 + \beta\log\big(R(x_0-u_0)\big)\Big]$$

La dérivée en $u_0$ vaut $\dfrac{1}{u_0}-\dfrac{\beta}{x_0-u_0}$, nulle pour $x_0-u_0 = \beta u_0$, soit

$$\mu_0^\star(x_0) = \frac{x_0}{1+\beta}$$

et

$$J_0(x_0) = \log\frac{x_0}{1+\beta}+\beta\log\frac{\beta R\,x_0}{1+\beta} = (1+\beta)\log x_0 + \text{const}$$

**Lecture économique.** La politique optimale est de consommer une **fraction fixe de la richesse** : $\frac{1}{1+\beta}$ à la première période, puis tout. La fraction ne dépend **pas** du niveau de richesse — propriété caractéristique de l'utilité logarithmique. Et l'on retrouve la structure du cas linéaire-quadratique : la forme fonctionnelle de $J$ (ici $a\log x + b$) se **propage** à rebours.

**Ce que l'exercice enseigne.** C'est le modèle de consommation intertemporelle de la macroéconomie, écrit exactement dans le formalisme de Bertsekas : état $=$ richesse, commande $=$ consommation, dynamique $=$ accumulation du capital, coût $=$ utilité actualisée. Le passage à $N=\infty$ donnera l'équation de Bellman stationnaire.

</details>

## 🔴 Common mistakes

1. **Choisir un état trop pauvre** — si un élément du passé influence encore le futur, la récurrence est **fausse**. Il faut augmenter l'état.
2. **Choisir un état trop riche** — chaque variable ajoutée multiplie le coût de calcul ; l'état doit contenir **exactement** l'information pertinente.
3. **Optimiser sur des suites au lieu de politiques** — en stochastique, une suite $u_0,\dots,u_{N-1}$ fixée d'avance est strictement moins bonne qu'une règle $\mu_k(x_k)$.
4. **Dérouler la récurrence dans le sens du temps** — la DP va **à rebours** : on part du coût terminal.
5. **Oublier l'espérance** — le minimum porte sur $u_k$, l'espérance sur $w_k$, et **dans cet ordre** : $\min_u\mathbb{E}_w$, jamais $\mathbb{E}_w\min_u$ (qui supposerait de connaître $w_k$ avant de décider).
6. **Croire que l'ordre $\min$ / $\mathbb{E}$ est indifférent** — $\mathbb{E}_w\min_u \leq \min_u\mathbb{E}_w$ : l'inversion donne la valeur d'un devin, pas celle d'un décideur.
7. **Oublier de mémoriser la décision optimale** — la récurrence sur $J_k$ donne le **coût** ; c'est l'argmin qui donne la **politique**, et c'est elle qu'on veut.
8. **Croire que la DP ne donne qu'une trajectoire** — elle résout **tous** les sous-problèmes de queue, donc donne la politique pour **tout** état et **tout** instant.

## 📌 Ultimate Review

1. Système $x_{k+1}=f_k(x_k,u_k,w_k)$ ; coût **additif** $\mathbb{E}\big[g_N(x_N)+\sum_kg_k(x_k,u_k,w_k)\big]$.
2. **L'état résume l'information passée pertinente pour l'optimisation future** — c'est la définition, et le seul vrai travail de modélisation.
3. Deux hypothèses : $U_k$ dépend au plus de $x_k$ ; la loi de $w_k$ ne dépend pas du passé de $w$.
4. Chronologie : $x_k$ observé $\to$ $u_k$ choisi $\to$ $w_k$ tiré.
5. **Politique** $\pi=\{\mu_0,\dots,\mu_{N-1}\}$ : on optimise sur des **fonctions**, pas sur des nombres. La politique optimale produite par la DP est **indépendante de $x_0$**.
6. **Boucle ouverte $=$ boucle fermée en déterministe** ; en stochastique la boucle fermée est strictement meilleure — c'est la **valeur de l'information**.
7. **Principe d'optimalité** : la politique de queue est optimale pour le sous-problème de queue ; l'optimisation du futur ne dépend pas du passé.
8. **Algorithme DP** : $J_N=g_N$, puis à rebours $J_k(x_k)=\min_{u_k}\mathbb{E}_{w_k}\big[g_k+J_{k+1}(f_k)\big]$ ; $J_0(x_0)=J^\star(x_0)$, et l'argmin donne $\mu_k^\star$.
9. Preuve par récurrence : on **sépare** le min sur $\mu_k$ du min sur la politique de queue.
10. **Linéaire-quadratique** : chaque minimisation est analytique et la forme quadratique se **propage** à rebours.
11. **Augmentation d'état** pour les retards, les aléas corrélés, les coûts non additifs — au prix d'un espace d'états plus grand.

**Formulas to know**

$$x_{k+1}=f_k(x_k,u_k,w_k) \qquad J_\pi(x_0)=\mathbb{E}\Big[g_N(x_N)+\sum_{k=0}^{N-1}g_k\big(x_k,\mu_k(x_k),w_k\big)\Big]$$

$$J_N(x_N)=g_N(x_N) \qquad J_k(x_k)=\min_{u_k\in U_k(x_k)}\mathbb{E}_{w_k}\Big[g_k(x_k,u_k,w_k)+J_{k+1}\big(f_k(x_k,u_k,w_k)\big)\Big]$$

**Methods to know** : le protocole de modélisation en 8 étapes ; la récurrence à rebours ; la preuve du pas de récurrence ; l'augmentation d'état.

## 🧠 Active Recall

**Basic** — Écrivez l'algorithme de programmation dynamique et dites ce que produit chacune de ses sorties.

<details><summary>Réponse</summary>

$J_N(x_N)=g_N(x_N)$, puis pour $k=N-1,\dots,0$ :

$$J_k(x_k)=\min_{u_k\in U_k(x_k)}\mathbb{E}_{w_k}\Big[g_k(x_k,u_k,w_k)+J_{k+1}\big(f_k(x_k,u_k,w_k)\big)\Big]$$

$J_0(x_0)$ est le **coût optimal** $J^\star(x_0)$ ; l'**argmin** à chaque étape donne $\mu_k^\star(x_k)$, c'est-à-dire la **politique optimale**.

</details>

**Understanding** — Énoncez le principe d'optimalité et expliquez où il intervient dans la preuve de l'algorithme.

<details><summary>Réponse</summary>

*Énoncé.* Si $\pi^\star$ est optimale, alors sa **politique de queue** $\{\mu_i^\star,\dots,\mu_{N-1}^\star\}$ est optimale pour le **sous-problème de queue** démarrant en $x_i$ à l'instant $i$ — l'optimisation du futur ne dépend pas du passé.

*Où il intervient.* Dans la deuxième ligne de la preuve du pas de récurrence, quand on **sépare** $\min_{(\mu_k,\pi^{k+1})}$ en $\min_{\mu_k}$ puis $\min_{\pi^{k+1}}$. Cette séparation n'est licite que parce que le sous-problème de queue ne dépend du passé qu'à travers $x_{k+1}$.

</details>

**Application** — Dans quel ordre écrit-on le minimum et l'espérance, et pourquoi ?

<details><summary>Réponse</summary>

$\min_{u_k}\mathbb{E}_{w_k}[\cdots]$ — **le minimum d'abord, l'espérance ensuite**. C'est la chronologie : on choisit $u_k$ en connaissant $x_k$ mais **avant** de connaître $w_k$, donc on ne peut optimiser que la **moyenne** sur $w_k$.

L'ordre inverse $\mathbb{E}_{w_k}\min_{u_k}$ correspondrait à choisir $u_k$ **après** avoir vu $w_k$ : c'est la valeur d'un devin. On a toujours $\mathbb{E}\min\leq\min\mathbb{E}$, et l'écart est précisément la valeur de l'information future.

</details>

**Comparison** — Boucle ouverte et boucle fermée : quand diffèrent-elles, et de combien ?

<details><summary>Réponse</summary>

Elles **coïncident** en déterministe : sans aléa, la trajectoire est prévisible et observer n'apprend rien. Elles **diffèrent** dès qu'il y a de l'aléa, et l'écart est la **valeur de l'information**.

L'exemple du match d'échecs le montre de façon spectaculaire : avec deux styles individuellement défavorables ($p_w<1/2$), la politique « prudent si et seulement si l'on mène » rend le joueur favori, ce qu'aucune politique en boucle ouverte n'obtient.

</details>

**Exam-style** — Une entreprise doit décider chaque mois de sa production, avec une demande aléatoire corrélée d'un mois sur l'autre. Le stock suffit-il comme état ?

<details><summary>Réponse</summary>

**Non.** L'hypothèse 2 du problème de base exige que la loi de $w_k$ ne dépende pas de $w_{k-1},\dots,w_0$. Si les demandes sont **corrélées**, la demande passée porte de l'information sur la demande future : elle est donc « pertinente pour l'optimisation future » et doit entrer dans l'état.

**La parade : augmenter l'état.** On prend $\tilde x_k = (x_k,\ w_{k-1})$, ou plus généralement l'état de la chaîne qui engendre la demande. La récurrence DP s'applique alors sans changement — mais l'espace d'états est **multiplié** par le nombre de valeurs possibles de $w_{k-1}$, ce qui alourdit d'autant le calcul.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Système de la DP ? | $x_{k+1}=f_k(x_k,u_k,w_k)$ |
| Qu'est-ce que l'état ? | Ce qui résume l'information passée **pertinente pour le futur** |
| Structure du coût ? | **Additif** : $\mathbb{E}[g_N(x_N)+\sum_kg_k(x_k,u_k,w_k)]$ |
| Les deux hypothèses du problème de base ? | $U_k$ dépend au plus de $x_k$ ; la loi de $w_k$ ne dépend pas du passé de $w$ |
| Chronologie d'une période ? | $x_k$ observé, puis $u_k$ choisi, puis $w_k$ tiré |
| Qu'est-ce qu'une politique ? | $\pi=\{\mu_0,\dots,\mu_{N-1}\}$, des **règles** $u_k=\mu_k(x_k)$ |
| Boucle ouverte contre fermée ? | Équivalentes en déterministe ; la fermée est meilleure en stochastique |
| Principe d'optimalité ? | La politique de queue est optimale pour le sous-problème de queue |
| Initialisation de la DP ? | $J_N(x_N)=g_N(x_N)$ |
| Récurrence de la DP ? | $J_k(x_k)=\min_{u_k}\mathbb{E}_{w_k}[g_k+J_{k+1}(f_k)]$ |
| Dans quel sens déroule-t-on ? | **À rebours**, de $N$ vers $0$ |
| Ordre du min et de l'espérance ? | $\min_u\mathbb{E}_w$ — on décide avant de connaître l'aléa |
| Que donne l'argmin ? | La politique optimale $\mu_k^\star(x_k)$ |
| La politique optimale dépend-elle de $x_0$ ? | **Non**, quand elle est produite par la DP |
| Cas linéaire-quadratique ? | Minimisations analytiques ; la forme quadratique se propage à rebours |
| Quand augmente-t-on l'état ? | Retards, aléas corrélés, coût non additif |
| Prix de l'augmentation d'état ? | L'espace d'états grossit, donc le calcul aussi |
