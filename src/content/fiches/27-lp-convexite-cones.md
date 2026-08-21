# Fiche 27 — Enveloppes convexes, cônes et décomposition d'un polyèdre

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 4 « Convexity », 11 diapositives |
| **Difficulté** | Structurant — court, mais c'est le théorème de structure du cours |
| **Temps d'étude estimé** | 1 h 15 |
| **Prérequis** | Fiche 26 (faces, points extrêmes, espace de linéalité) |
| **Concepts clés** | Combinaison convexe, enveloppe convexe, polytope, Carathéodory, cône convexe, cône polyédral, rayons extrêmes, cône de récession, théorème de décomposition |
| **Poids à l'examen** | Le **théorème de décomposition** explique en une ligne pourquoi un LP est soit résolu en un sommet, soit non borné le long d'un rayon. C'est la réponse théorique à « pourquoi le simplexe fonctionne ». |

## 🎯 Vue d'ensemble

La fiche 26 a décrit un polyèdre **par l'extérieur** : une intersection d'inégalités. Cette leçon le décrit **par l'intérieur** : comme engendré par ses sommets et ses directions infinies. Les deux descriptions sont équivalentes, et c'est le contenu du théorème de décomposition :

```
DESCRIPTION EXTERNE   P = { x | Ax ≼ b, Cx = d }        (des inégalités)
DESCRIPTION INTERNE   P = L + conv{v₁..v_r} + cone{w₁..w_s}   (des générateurs)
                          droites  +  sommets  +  directions infinies
```

Trois ingrédients, trois types de combinaisons : **linéaire** (coefficients quelconques) pour l'espace de linéalité, **convexe** (positifs, de somme $1$) pour les sommets, **conique** (positifs, sans contrainte de somme) pour les directions.

## 🟡 Concept 1 — Combinaison convexe et ensemble convexe

**Combinaison convexe** de points $v_1,\dots,v_k$ : une combinaison linéaire

$$x = \theta_1v_1 + \theta_2v_2+\dots+\theta_kv_k \qquad\text{avec}\qquad \theta_i\geq0,\quad \sum_{i=1}^k\theta_i = 1$$

Pour $k=2$, $x$ parcourt le **segment** d'extrémités $v_1$ et $v_2$ : $\theta_1=1$ donne $v_1$, $\theta_1 = 0$ donne $v_2$, $\theta_1 = 0{,}6$ un point aux deux tiers du chemin.

**Ensemble convexe.** $S$ est convexe s'il contient toutes les combinaisons convexes de ses points.

**Deux familles d'exemples, démontrées dans le cours.**

*Les ensembles affines.* Si $Cx=d$ et $Cy=d$, alors pour tout $\theta\in\mathbb{R}$ :

$$C\big(\theta x + (1-\theta)y\big) = \theta Cx + (1-\theta)Cy = \theta d + (1-\theta)d = d$$

*Les polyèdres.* Si $Ax\preceq b$ et $Ay\preceq b$, alors pour $\theta\in[0,1]$ :

$$A\big(\theta x+(1-\theta)y\big) = \theta Ax + (1-\theta)Ay \preceq \theta b + (1-\theta)b = b$$

⚠️ Notez la différence des quantificateurs : pour un affine, $\theta$ parcourt **tout $\mathbb{R}$** ; pour un polyèdre, seulement $[0,1]$. C'est la positivité de $\theta$ et de $1-\theta$ qui préserve le sens des inégalités — avec $\theta = 2$ le calcul s'effondrerait. Affine $\Rightarrow$ convexe, jamais l'inverse.

## 🟠 Concept 2 — Enveloppe convexe et polytope

**Enveloppe convexe** de $S$ : l'ensemble de toutes les combinaisons convexes de points de $S$. Notation $\mathbf{conv}\,S$. C'est aussi le plus petit convexe contenant $S$.

**Polytope** : l'enveloppe convexe $\mathbf{conv}\{v_1,\dots,v_k\}$ d'un **ensemble fini** de points.

**Le vocabulaire à ne pas mélanger.**

| Objet | Définition | Description |
|---|---|---|
| **Polyèdre** | $\{x\mid Ax\preceq b\}$ | par l'**extérieur** (inégalités) ; peut être non borné |
| **Polytope** | $\mathbf{conv}\{v_1,\dots,v_k\}$ | par l'**intérieur** (générateurs) ; toujours borné |

Un polytope est un polyèdre borné, et réciproquement — c'est un cas particulier du théorème de décomposition.

### Théorème de Carathéodory (exercice du cours)

**Énoncé.** Si $S\subseteq\mathbb{R}^n$, tout $x\in\mathbf{conv}(S)$ s'écrit comme combinaison convexe d'**au plus $n+1$** points de $S$. Dans $\mathbb{R}^2$ : trois points suffisent toujours.

**Démonstration (celle du cours — elle réutilise la fiche 26).** Partons d'une décomposition convexe quelconque de $x$ :

$$\begin{pmatrix}v_1 & v_2 & \cdots & v_m\\ 1 & 1 & \cdots & 1\end{pmatrix}\begin{pmatrix}\theta_1\\ \vdots\\ \theta_m\end{pmatrix} = \begin{pmatrix}x\\1\end{pmatrix}, \qquad \theta_i\geq0$$

Soit $P$ l'ensemble des $\theta = (\theta_1,\dots,\theta_m)$ vérifiant ces conditions : c'est un polyèdre non vide **en forme standard** ($\theta\succeq0$ et égalités linéaires), donc **pointu**, donc il a des points extrêmes. Soit $\hat\theta$ l'un d'eux. Par le critère des colonnes (fiche 26), les colonnes associées aux composantes strictement positives sont libres :

$$\mathbf{rank}\begin{pmatrix}v_{i_1} & \cdots & v_{i_k}\\ 1 & \cdots & 1\end{pmatrix} = k \qquad\text{où}\qquad \{i_1,\dots,i_k\} = \{i\mid\hat\theta_i>0\}$$

Cette matrice ayant $n+1$ lignes, son rang est $\leq n+1$, donc $k\leq n+1$. $\blacksquare$

**Ce que la preuve enseigne.** La ligne de $1$ transforme la contrainte « les poids somment à $1$ » en une ligne de matrice ordinaire : c'est le même truc qu'à l'indépendance affine. Et un résultat de géométrie convexe se démontre par un argument de **rang** sur un polyèdre auxiliaire — c'est le style du cours entier.

## 🔴 Concept 3 — Cônes convexes

**Cône convexe** : un ensemble non vide $S$ tel que

$$x_1,\dots,x_k\in S,\quad \theta_1\geq0,\dots,\theta_k\geq0 \ \Longrightarrow\ \theta_1x_1+\dots+\theta_kx_k\in S$$

Toutes les combinaisons **positives** (dites coniques) de points de $S$ restent dans $S$. En particulier $S$ est convexe **et** c'est un cône ($x\in S \Rightarrow \alpha x\in S$ pour $\alpha\geq0$).

**Exemples.** Les sous-espaces ; et le **cône polyédral**

$$S = \{x\mid Ax\preceq0,\ Cx=0\}$$

c'est-à-dire l'ensemble des solutions d'un système fini d'inégalités linéaires **homogènes** (second membre nul).

**Enveloppe conique** de $S$ : l'ensemble des combinaisons positives de points de $S$, aussi appelée le **cône engendré** par $S$. Notation $\mathbf{cone}\,S$. Un **cône de type fini** est $\mathbf{cone}\{v_1,\dots,v_k\}$.

**Cône polyédral pointu.** Pour $K = \{x\in\mathbb{R}^n \mid Ax\preceq0,\ Cx=0\}$ :

- l'espace de linéalité est $\mathbf{nullspace}\binom{A}{C}$ ;
- $K$ est **pointu** si et seulement si $\mathbf{rank}\binom{A}{C} = n$ ;
- s'il est pointu, il a **exactement un** point extrême : l'origine ;
- ses faces de dimension $1$ s'appellent les **rayons extrêmes**.

**Le mémo.** Un cône pointu ressemble à un cornet : une pointe unique (l'origine) et des arêtes qui partent à l'infini (les rayons extrêmes). Un cône non pointu contient une droite entière et n'a ni pointe ni sommet.

## 🔴 Concept 4 — Cône de récession

**Définition.** Le cône de récession (ou cône asymptotique) du polyèdre $P = \{x\mid Ax\preceq b,\ Cx = d\}$ est

$$K = \{y \mid Ay\preceq0,\ Cy = 0\}$$

C'est le polyèdre **homogénéisé** : on remplace $b$ et $d$ par $0$.

**Propriétés.**

- $K$ a le **même espace de linéalité** que $P$ ;
- $K$ est pointu **si et seulement si** $P$ l'est ;
- si $x\in P$, alors $x+y\in P$ pour **tout** $y\in K$ — d'où l'image du cours : $x+K \subseteq P$.

**Interprétation.** $K$ rassemble les **directions dans lesquelles le polyèdre s'étend à l'infini**. Depuis n'importe quel point admissible, on peut avancer indéfiniment dans une direction de récession sans jamais sortir. Un polyèdre est **borné** si et seulement si $K = \{0\}$.

**Le lien direct avec les LP.** Un LP $\min c^Tx$ sur $P$ est **non borné** ($p^\star=-\infty$) si et seulement s'il existe une direction de récession $y\in K$ avec $c^Ty<0$ : on descend le long de $y$ sans jamais quitter $P$. C'est le critère que l'algorithme du simplexe détecte quand aucune variable ne peut sortir de la base.

## 🔴 Concept 5 — Le théorème de décomposition

**Énoncé (du cours).** Tout polyèdre $P$ se décompose en

$$P = L + Q = L + \mathbf{conv}\{v_1,\dots,v_r\} + \mathbf{cone}\{w_1,\dots,w_s\}$$

où :

- $L$ est l'**espace de linéalité** de $P$ ;
- $Q$ est un polyèdre **pointu** ;
- $v_1,\dots,v_r$ sont les **points extrêmes** de $Q$ ;
- $w_1,\dots,w_s$ engendrent les **rayons extrêmes** du cône de récession de $Q$.

*(Le cours passe la preuve.)*

**Applications, telles que listées par le cours.**

- utile à des fins **théoriques** ;
- en général **extrêmement coûteux** à calculer à partir de la description par inégalités ;
- **implicitement utilisé** par certains algorithmes.

**Pourquoi c'est le théorème central.** Il dit qu'un polyèdre est exactement « une enveloppe convexe de sommets, épaissie par des directions infinies, elle-même translatée le long de droites ». Trois conséquences pour l'optimisation linéaire :

1. **Polyèdre borné** ($L = \{0\}$, aucun rayon) : $P = \mathbf{conv}\{v_1,\dots,v_r\}$ est un polytope. Comme $c^Tx$ est linéaire, son minimum sur une enveloppe convexe est atteint **en un générateur** : il suffit d'examiner les **sommets**. C'est la justification du simplexe.
2. **Polyèdre non borné** : soit $c^Tw_j\geq0$ pour tous les rayons, et l'optimum est encore en un sommet ; soit $c^Tw_j<0$ pour un rayon, et le problème est **non borné**. Il n'y a pas d'autre cas.
3. **Polyèdre non pointu** : $L\neq\{0\}$ ; si $c^Tv \neq 0$ pour un $v\in L$, le problème est non borné dans les deux sens. Sinon on peut **éliminer** $L$ et se ramener à un polyèdre pointu, en travaillant dans un espace de dimension plus petite.

### Comment résoudre l'exercice type (protocole)

1. **Identifier la nature de la combinaison** demandée : linéaire, affine, convexe ou conique — c'est la contrainte sur les poids qui change tout.

| Combinaison | Contrainte sur les $\theta_i$ | Objet engendré |
|---|---|---|
| linéaire | aucune | sous-espace |
| affine | $\sum\theta_i = 1$ | ensemble affine |
| **convexe** | $\theta_i\geq0$ et $\sum\theta_i=1$ | enveloppe convexe |
| **conique** | $\theta_i\geq0$ | cône |

2. **Pour montrer qu'un ensemble est convexe** : prendre $x,y$ dedans, $\theta\in[0,1]$, et vérifier la définition — le calcul tient en deux lignes pour un polyèdre ou un affine.
3. **Pour un cône de récession** : réécrire le système avec $b=0$ et $d=0$, puis résoudre.
4. **Pour la bornitude** : $P$ est borné $\iff$ $K = \{0\}$ $\iff$ le système homogène $Ay\preceq0$, $Cy=0$ n'a que la solution nulle.
5. **Pour la non-bornitude d'un LP** : chercher $y\in K$ avec $c^Ty<0$.

### Exercices progressifs

**Niveau 1** — L'ensemble $\{(x_1,x_2)\mid x_1\geq0,\ x_2\geq0\}$ est-il un cône convexe ? Un polytope ?

<details><summary>Correction</summary>

**Cône convexe : oui.** C'est $\{x\mid -x\preceq0\}$, un cône polyédral (système homogène). Toute combinaison positive de vecteurs à composantes positives a des composantes positives. **Polytope : non** — un polytope est borné, or l'orthant positif ne l'est pas. On peut cependant l'écrire $\mathbf{cone}\{e_1,e_2\}$ : c'est un cône de type fini, engendré par ses deux **rayons extrêmes**.

</details>

**Niveau 2** — Calculez le cône de récession de $P = \{x\in\mathbb{R}^2 \mid x_1+x_2\geq1,\ x\succeq0\}$. $P$ est-il borné ? pointu ?

<details><summary>Correction</summary>

Écrivons $P$ sous la forme $Ax\preceq b$ : $-x_1-x_2\leq-1$, $-x_1\leq0$, $-x_2\leq0$. Le cône de récession est le même système avec $b=0$ :

$$K = \{y\mid -y_1-y_2\leq0,\ y\succeq0\} = \{y\mid y\succeq0\}$$

(la première inégalité est impliquée par $y\succeq0$). $K\neq\{0\}$ : **$P$ n'est pas borné** — on peut partir à l'infini dans tout l'orthant positif. **Pointu :** $\mathbf{nullspace}(A) = \{y \mid y_1+y_2 = 0,\ y_1=0,\ y_2=0\} = \{0\}$ : oui. $P$ a donc des sommets, ici $(1,0)$ et $(0,1)$, et la décomposition s'écrit $P = \mathbf{conv}\{(1,0),(0,1)\} + \mathbf{cone}\{e_1,e_2\}$.

</details>

**Niveau 3** — Sur le $P$ de l'exercice précédent, le LP $\min\ -x_1$ est-il borné ? Et $\min\ x_1+x_2$ ?

<details><summary>Correction</summary>

*$\min -x_1$* : $c = (-1,0)$ et le rayon $y = e_1 = (1,0)$ appartient à $K$, avec $c^Ty = -1 < 0$. **Non borné**, $p^\star = -\infty$.

*$\min x_1+x_2$* : $c = (1,1)$ et pour tout $y\in K = \{y\succeq0\}$, $c^Ty = y_1+y_2 \geq 0$. Aucune direction de récession ne fait descendre : l'optimum est atteint **en un sommet**. On compare : $f(1,0) = 1$ et $f(0,1) = 1$ — les deux sommets donnent $1$, et tout le segment entre eux est optimal. $p^\star = 1$.

</details>

**Niveau 4 — type feuille d'exercices** — Montrez que $\mathbf{conv}\{v_1,\dots,v_k\}$ est borné, puis déduisez du théorème de décomposition qu'un polyèdre est borné si et seulement si c'est un polytope.

<details><summary>Correction</summary>

**Bornitude.** Soit $x = \sum_i\theta_iv_i$ une combinaison convexe. Par l'inégalité triangulaire et $\theta_i\geq0$, $\sum\theta_i=1$ :

$$\|x\| \leq \sum_i\theta_i\|v_i\| \leq \Big(\max_i\|v_i\|\Big)\sum_i\theta_i = \max_i\|v_i\|$$

L'enveloppe convexe est donc contenue dans la boule de rayon $\max_i\|v_i\|$ : elle est bornée.

**Équivalence.** ($\Leftarrow$) Un polytope est borné par ce qui précède, et c'est un polyèdre (admis, c'est l'autre sens du théorème de décomposition). ($\Rightarrow$) Soit $P$ un polyèdre borné. Son espace de linéalité est $\{0\}$ (sinon il contiendrait une droite, donc serait non borné) et son cône de récession est $\{0\}$ (sinon $x+ty\in P$ pour tout $t>0$ partirait à l'infini). La décomposition se réduit alors à

$$P = \{0\} + \mathbf{conv}\{v_1,\dots,v_r\} + \{0\} = \mathbf{conv}\{v_1,\dots,v_r\}$$

c'est-à-dire un polytope, engendré par ses **points extrêmes**. $\blacksquare$

**La conséquence pratique.** Minimiser une fonction linéaire sur un polyèdre borné revient à comparer sa valeur aux sommets — un ensemble **fini**. Un problème continu devient combinatoire : c'est exactement l'idée du simplexe.

</details>

## 🔴 Common mistakes

1. **Oublier $\sum\theta_i = 1$** dans une combinaison convexe — sans cette condition on obtient un cône, pas une enveloppe convexe.
2. **Oublier $\theta_i\geq0$** — sans positivité on obtient l'enveloppe **affine**, bien plus grande (le cercle du slide 3-12 a pour enveloppe affine tout un plan).
3. **Confondre polyèdre et polytope** — le second est borné par définition ; le premier peut partir à l'infini.
4. **Calculer un cône de récession en gardant $b$** — il faut homogénéiser : $Ay\preceq0$ et $Cy=0$, seconds membres nuls.
5. **Croire qu'un cône contient toujours des droites** — un cône **pointu** n'en contient aucune ; il a l'origine pour unique point extrême.
6. **Conclure « non borné » sans direction de descente** — un polyèdre non borné peut parfaitement porter un LP borné : il faut $c^Ty<0$ pour un $y$ du cône de récession.
7. **Croire Carathéodory optimal partout** — la borne $n+1$ est générale ; sur un convexe particulier, moins de points peuvent suffire.

## 📌 Ultimate Review

1. Combinaison convexe : $\theta_i\geq0$ **et** $\sum\theta_i=1$ ; conique : $\theta_i\geq0$ seulement.
2. Affines et polyèdres sont convexes ; la preuve tient en une ligne, et la positivité de $\theta$ y est essentielle.
3. $\mathbf{conv}\,S$ = plus petit convexe contenant $S$ ; **polytope** = enveloppe convexe d'un ensemble fini.
4. **Carathéodory** : dans $\mathbb{R}^n$, au plus $n+1$ points suffisent ; se démontre par le critère des sommets en forme standard.
5. Cône convexe : stable par combinaisons positives. **Cône polyédral** : $\{x\mid Ax\preceq0,\ Cx=0\}$, système homogène.
6. Cône polyédral pointu $\iff \mathbf{rank}\binom{A}{C}=n$ ; un seul point extrême, l'origine ; faces de dimension 1 = **rayons extrêmes**.
7. **Cône de récession** $K = \{y\mid Ay\preceq0,\ Cy=0\}$ : $x\in P \Rightarrow x+K\subseteq P$ ; $P$ borné $\iff K=\{0\}$.
8. **Décomposition** : $P = L + \mathbf{conv}\{v_i\} + \mathbf{cone}\{w_j\}$ — droites, sommets, directions infinies.

**Formulas to know**

$$x=\sum_i\theta_iv_i,\ \theta\succeq0,\ \textstyle\sum_i\theta_i=1 \qquad K=\{y\mid Ay\preceq0,\ Cy=0\} \qquad P = L+\mathbf{conv}\{v_i\}+\mathbf{cone}\{w_j\}$$

**Methods to know** : distinguer les quatre types de combinaisons ; calculer un cône de récession par homogénéisation ; conclure à la bornitude d'un LP par le signe de $c^Tw_j$.

## 🧠 Active Recall

**Basic** — Différence entre combinaison convexe et combinaison conique ?

<details><summary>Réponse</summary>

Les deux exigent $\theta_i\geq0$. La combinaison **convexe** impose en plus $\sum_i\theta_i = 1$ ; la combinaison **conique** ne l'impose pas. D'où : enveloppe convexe bornée si les générateurs le sont, cône toujours non borné (sauf $\{0\}$).

</details>

**Understanding** — Pourquoi la preuve de convexité d'un polyèdre exige-t-elle $\theta\in[0,1]$ alors que celle d'un affine autorise tout $\theta\in\mathbb{R}$ ?

<details><summary>Réponse</summary>

Parce qu'on manipule des **inégalités**. De $Ax\preceq b$ on ne peut déduire $\theta Ax \preceq \theta b$ que si $\theta\geq0$ ; multiplier par un négatif renverse le sens. Pour un affine, les contraintes sont des **égalités** : elles survivent à n'importe quel coefficient.

</details>

**Application** — Cône de récession de $P = \{x\in\mathbb{R}^2\mid x_1\geq0,\ x_2 = 3\}$ ? $P$ est-il pointu ?

<details><summary>Réponse</summary>

En homogénéisant : $K = \{y\mid y_1\geq0,\ y_2 = 0\}$, la demi-droite positive de l'axe des abscisses. $P$ n'est donc pas borné. **Pointu :** l'espace de linéalité est $\{y \mid y_1 = 0,\ y_2=0\} = \{0\}$, donc oui — $P$ est une demi-droite, dont l'unique point extrême est $(0,3)$. Décomposition : $P = \{(0,3)\} + \mathbf{cone}\{e_1\}$.

</details>

**Comparison** — Description externe et description interne d'un polyèdre : avantages respectifs ?

<details><summary>Réponse</summary>

*Externe* ($Ax\preceq b$) : compacte, directement exploitable par un algorithme, c'est la forme dans laquelle les problèmes arrivent. *Interne* ($L+\mathbf{conv}+\mathbf{cone}$) : elle rend évidentes la bornitude et la position des optima, mais le cours prévient qu'elle est **extrêmement coûteuse** à calculer à partir des inégalités (le nombre de sommets croît exponentiellement).

</details>

**Exam-style** — Énoncez le théorème de décomposition et déduisez-en la trichotomie d'un LP : optimum en un sommet, non borné, ou non admissible.

<details><summary>Réponse</summary>

$P = L + \mathbf{conv}\{v_1,\dots,v_r\} + \mathbf{cone}\{w_1,\dots,w_s\}$. Si $P=\emptyset$, le problème est **non admissible**. Sinon, tout $x\in P$ s'écrit $x = \ell + \sum_i\theta_iv_i + \sum_j\mu_jw_j$ et

$$c^Tx = c^T\ell + \sum_i\theta_i\,c^Tv_i + \sum_j\mu_j\,c^Tw_j$$

S'il existe $\ell\in L$ ou $w_j$ avec un produit scalaire strictement négatif, on fait tendre le coefficient vers $+\infty$ : **non borné**. Sinon, les deux derniers termes sont minimisés en prenant tous les $\mu_j = 0$, et $\sum_i\theta_ic^Tv_i \geq \min_i c^Tv_i$ : l'optimum est atteint **en un point extrême**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Combinaison convexe ? | $\sum_i\theta_iv_i$ avec $\theta_i\geq0$ et $\sum_i\theta_i=1$ |
| Combinaison conique ? | $\sum_i\theta_iv_i$ avec $\theta_i\geq0$ (pas de contrainte de somme) |
| Polytope ? | $\mathbf{conv}$ d'un ensemble **fini** de points — toujours borné |
| Théorème de Carathéodory ? | Dans $\mathbb{R}^n$, $n+1$ points suffisent pour toute combinaison convexe |
| Cône polyédral ? | $\{x\mid Ax\preceq0,\ Cx=0\}$ — système **homogène** |
| Cône polyédral pointu ? | $\mathbf{rank}\binom{A}{C}=n$ ; un seul point extrême : l'origine |
| Rayon extrême ? | Face de dimension 1 d'un cône pointu |
| Cône de récession ? | $K=\{y\mid Ay\preceq0,\ Cy=0\}$ — les directions infinies de $P$ |
| $P$ borné $\iff$ ? | $K=\{0\}$ |
| LP non borné $\iff$ ? | Il existe $y\in K$ avec $c^Ty<0$ |
| Théorème de décomposition ? | $P = L+\mathbf{conv}\{v_i\}+\mathbf{cone}\{w_j\}$ |
| Pourquoi l'optimum est-il en un sommet ? | Sur $\mathbf{conv}\{v_i\}$, une fonction linéaire atteint son min en un générateur |
