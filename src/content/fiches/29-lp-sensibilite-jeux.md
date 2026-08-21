# Fiche 29 — Dualité II : sensibilité, prix implicites et jeux à somme nulle

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 7 « Duality II », 21 diapositives |
| **Difficulté** | Fondamental — c'est ici que la dualité devient un outil de décision |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiche 28 (dualité, écarts complémentaires), fiche 27 (cône de récession, points extrêmes) |
| **Concepts clés** | Fonction valeur optimale, borne globale, analyse locale de sensibilité, dérivée $-z_i$, point extrême non dégénéré, jeu matriciel, stratégie mixte, théorème du minimax |
| **Poids à l'examen** | La question « de combien varie l'optimum si la ressource $i$ augmente d'une unité ? » se répond **sans recalculer**, par la variable duale. C'est le résultat le plus utilisé en pratique, et le lien direct avec l'économie. |

## 🎯 Vue d'ensemble

La fiche 28 a montré que la variable duale $z_i$ est le **prix implicite** de la contrainte $i$. Cette leçon lui donne un sens exact : $-z_i$ est la **dérivée** de la valeur optimale par rapport au second membre $b_i$. On obtient donc, gratuitement, la sensibilité de la solution à toutes les données du problème.

Deux résultats, l'un global, l'autre local :

```
BORNE GLOBALE   p(u) ≥ p(0) − uᵀz*        valable pour tout u, sans hypothèse
ANALYSE LOCALE  p(u) = p(0) − z_Jᵀu_J     exacte, au voisinage de 0, si le sommet est non dégénéré
```

La leçon se termine par deux applications où la dualité **est** le contenu du problème : les jeux à somme nulle (où le théorème du minimax **est** la dualité forte) et les circuits électriques (où la diode idéale **est** un écart complémentaire).

## 🔴 Concept 1 — La fonction valeur optimale

On perturbe le second membre du primal. Pour $u\in\mathbb{R}^m$, on définit

$$p(u) = \min\{c^Tx \mid Ax\preceq b+u\}$$

$u_i>0$ **relâche** la contrainte $i$ (plus de ressource), $u_i<0$ la **resserre**. On veut lire les propriétés de $p$ sur les solutions optimales $x^\star$ et $z^\star$ calculées en $u=0$.

**Le dual du problème perturbé** est

$$\max\ -(b+u)^Tz \quad\text{s.c.}\quad A^Tz+c=0,\quad z\succeq0$$

**L'ensemble admissible dual ne dépend pas de $u$** : seule l'objectif change. C'est toute la raison pour laquelle la sensibilité se lit dans le dual.

## 🔴 Concept 2 — La borne globale

**Résultat.** Si $z^\star$ est **une** solution duale optimale pour $u=0$, alors pour **tout** $u$ :

$$p(u) \geq -(b+u)^Tz^\star = p(0) - u^Tz^\star$$

**Démonstration.** $z^\star$ reste dual admissible pour le problème perturbé (l'admissibilité duale ne dépend pas de $u$) ; la dualité faible donne $p(u)\geq -(b+u)^Tz^\star$. Et $-b^Tz^\star = p(0)$ par dualité forte en $u=0$. $\blacksquare$

⚠️ Cette inégalité vaut pour **tout** $u$, même très grand — d'où son nom. C'est un demi-espace qui contient toujours le graphe de $p$ : on connaît toujours une borne, jamais une valeur exacte.

**Exemple à un paramètre.** Prenons $u = t\,d$ avec $d$ fixé. Alors

$$p(td) \geq p(0) - t\,d^Tz^\star$$

En supposant $d^Tz^\star>0$, le cours en tire trois lectures :

- si $t<0$, la valeur optimale **augmente** (fortement si $|t|$ est grand) — on a serré la contrainte ;
- si $t>0$, elle **peut** augmenter ou diminuer : la borne ne dit rien ;
- si $t$ est positif et **petit**, elle ne peut certainement pas beaucoup diminuer.

**L'asymétrie est le point à retenir.** Serrer une contrainte coûte **au moins** ce que dit le prix implicite ; la relâcher rapporte **au plus** ce même prix. La dualité protège toujours du côté défavorable.

## 🟠 Concept 3 — Forme de la fonction $p$

**Propriétés (en supposant $p(0)$ finie).**

1. $p(u) > -\infty$ partout — conséquence directe de la borne globale.
2. Le **domaine** $\{u \mid p(u)<+\infty\}$ est un **polyèdre**.
3. $p$ est **affine par morceaux** (et convexe) sur son domaine.

**Démonstration (celle du cours).** Notons $P$ l'ensemble admissible dual et $K$ son cône de récession :

$$P = \{z\mid A^Tz+c = 0,\ z\succeq0\}, \qquad K = \{w \mid A^Tw = 0,\ w\succeq0\}$$

*Le domaine.* $p(u)=+\infty$ (primal perturbé non admissible) si et seulement s'il existe $w$ avec

$$A^Tw = 0,\quad w\succeq0,\quad b^Tw + u^Tw<0$$

Donc $p(u)<+\infty$ si et seulement si $b^Tw_k + u^Tw_k\geq0$ pour tous les **rayons extrêmes** $w_k$ de $K$ : c'est un **nombre fini d'inégalités linéaires en $u$**, donc un polyèdre.

*La forme.* Quand $p(u)$ est finie, la dualité forte donne

$$p(u) = \max_{z\in P}\ \big(-b^Tz - u^Tz\big) = \max_{k=1,\dots,r}\ \big(-b^Tz_k - u^Tz_k\big)$$

où $z_1,\dots,z_r$ sont les **points extrêmes** de $P$ — le maximum d'une fonction linéaire sur un polyèdre est atteint en un sommet (fiche 27). C'est donc un maximum d'un nombre fini de fonctions affines de $u$ : **affine par morceaux**, au sens exact de la fiche 25. $\blacksquare$

**Ce que la formule raconte.** Chaque sommet dual $z_k$ fournit une borne affine $p(0)-u^Tz_k$, et $p$ est l'**enveloppe supérieure** de ces bornes. Tant que le même sommet dual reste optimal, la sensibilité est constante ; quand $u$ franchit une frontière, on change de sommet dual et **le prix implicite change brutalement**. C'est pourquoi une analyse de sensibilité n'est valable que dans un intervalle.

## 🔴 Concept 4 — Analyse locale : la formule exacte

**Hypothèses.** Soit $x^\star$ optimal pour $u=0$, d'ensemble de contraintes actives $J = \{i \mid a_i^Tx^\star = b_i\}$. On suppose que $x^\star$ est un point extrême **non dégénéré** :

- **point extrême** : $A_J$ est de rang colonne plein, $\mathbf{rank}(A_J)=n$ (test du rang, fiche 26) ;
- **non dégénéré** : $|J| = n$ — exactement $n$ contraintes actives, ni plus ni moins.

$A_J$ est donc **carrée et inversible**.

**Résultat.** Pour $u$ dans un voisinage de l'origine, les points

$$x(u) = A_J^{-1}(b_J+u_J), \qquad z_J = -A_J^{-T}c, \qquad z_i = 0 \ \text{ pour } i\notin J$$

sont primal et dual optimaux pour le problème perturbé. **$x(u)$ est affine en $u$ et $z$ ne dépend pas de $u$.**

**Démonstration (celle du cours).**

*En $u=0$.* $A_J$ étant carrée inversible, $x^\star = A_J^{-1}b_J$. Les écarts complémentaires imposent $z_i=0$ pour $i\notin J$, et l'admissibilité duale $A_J^Tz_J+c=0$ détermine $z_J$ de façon **unique**.

*Pour $u$ petit.* $x(u)$ vérifie les contraintes de $J$ avec égalité : $A_Jx(u) = b_J+u_J$, pour tout $u$. Pour $i\notin J$, la contrainte reste satisfaite tant que $u$ est assez petit, car

$$a_i^Tx(u) - (b_i+u_i) = a_i^TA_J^{-1}u_J - u_i - (b_i - a_i^Tx^\star)$$

et $b_i - a_i^Tx^\star>0$ (contrainte **strictement** inactive) : le terme constant domine les termes linéaires en $u$. Enfin $z$ est dual admissible pour tout $u$, et le couple vérifie les écarts complémentaires. $\blacksquare$

⚠️ **Le rôle de la non-dégénérescence.** Si $|J|>n$ (plus de $n$ contraintes actives : un sommet « surdéterminé »), $A_J$ n'est plus carrée, le dual n'est plus unique, et **la sensibilité n'est plus définie sans ambiguïté** : la dérivée à droite et la dérivée à gauche diffèrent. C'est le cas dégénéré, fréquent dans les problèmes réels, et c'est pourquoi les logiciels donnent des **intervalles** de validité.

## 🔴 Concept 5 — La dérivée de la valeur optimale

Sous les hypothèses ci-dessus, pour $u$ au voisinage de l'origine :

$$p(u) = c^Tx(u) = c^Tx^\star + c^TA_J^{-1}u_J = p(0) - z_J^Tu_J$$

(la dernière égalité utilise $z_J = -A_J^{-T}c$, donc $z_J^T = -c^TA_J^{-1}$).

**Conclusions.**

- la fonction valeur optimale est **affine** en $u$ au voisinage de $0$ ;
- $-z_i$ est la **dérivée** de $p(u)$ par rapport à $u_i$ en $u=0$ : $$\boxed{\ \frac{\partial p}{\partial u_i}(0) = -z_i\ }$$

**Lecture.** Relâcher la contrainte $i$ d'une unité ($u_i = +1$) fait **baisser** la valeur optimale de $z_i$. Comme on minimise, baisser est un gain : $z_i$ est bien la **valeur marginale** de la ressource $i$. Pour un problème de maximisation, le signe s'inverse et $z_i$ est le gain marginal direct.

**Cohérence avec la borne globale.** La borne globale disait $p(u)\geq p(0)-u^Tz^\star$ pour tout $u$ ; l'analyse locale dit qu'il y a **égalité** près de $0$. La borne est donc **tangente** au graphe de $p$ à l'origine — c'est exactement la relation entre une fonction convexe affine par morceaux et ses hyperplans d'appui.

## 🟠 Concept 6 — Jeux à somme nulle à deux joueurs

**Le jeu matriciel.** Le joueur 1 choisit un nombre dans $\{1,\dots,m\}$, le joueur 2 dans $\{1,\dots,n\}$, **indépendamment**. Si J1 choisit $i$ et J2 choisit $j$, J1 paie $A_{ij}$ à J2 (une valeur négative signifiant que J2 paie $-A_{ij}$ à J1). La matrice $A\in\mathbb{R}^{m\times n}$ est la **matrice de gains**.

**Stratégies mixtes.** Chaque joueur tire son action au hasard selon une distribution : $x_i$ est la probabilité que J1 joue $i$, $y_j$ celle que J2 joue $j$. Le **gain espéré** de J1 vers J2 est

$$\sum_{i=1}^m\sum_{j=1}^n x_iy_jA_{ij} = x^TAy$$

**Stratégies optimales.** Notons $\mathcal{P}_k = \{p\in\mathbb{R}^k \mid p\succeq0,\ \mathbf1^Tp=1\}$ le simplexe de probabilité.

*Joueur 1* (il paie, donc il minimise le pire des cas) :

$$\min_{x\in\mathcal{P}_m}\ \max_{y\in\mathcal{P}_n} x^TAy \qquad\Longleftrightarrow\qquad \min_{x\in\mathcal{P}_m}\ \max_{j=1,\dots,n}(A^Tx)_j$$

*Joueur 2* (il reçoit, donc il maximise le pire des cas) :

$$\max_{y\in\mathcal{P}_n}\ \min_{x\in\mathcal{P}_m} x^TAy \qquad\Longleftrightarrow\qquad \max_{y\in\mathcal{P}_n}\ \min_{i=1,\dots,m}(Ay)_i$$

**L'équivalence** (le passage du $\max$ sur $y$ au $\max$ sur $j$) vient de ce qu'une fonction linéaire sur le simplexe atteint son maximum en un **sommet**, c'est-à-dire sur une stratégie **pure**. C'est encore la fiche 27.

**Les deux LP.** Par la reformulation de la fiche 25 :

$$\text{J1 :}\quad \begin{array}{ll}\text{minimiser} & t\\ \text{sous} & A^Tx\preceq t\mathbf1\\ & x\succeq0,\ \mathbf1^Tx = 1\end{array} \qquad\qquad \text{J2 :}\quad \begin{array}{ll}\text{maximiser} & w\\ \text{sous} & Ay\succeq w\mathbf1\\ & y\succeq0,\ \mathbf1^Ty=1\end{array}$$

**Ces deux LP sont duaux l'un de l'autre.** La dualité forte donne alors le **théorème du minimax** :

$$\max_{y\in\mathcal{P}_n}\ \min_{x\in\mathcal{P}_m}\ x^TAy \ = \ \min_{x\in\mathcal{P}_m}\ \max_{y\in\mathcal{P}_n}\ x^TAy$$

**Conséquences (du cours).** Si $x^\star$ et $y^\star$ sont les stratégies optimales, alors

$$\min_{x\in\mathcal{P}_m} x^TAy^\star = \max_{y\in\mathcal{P}_n} (x^\star)^TAy$$

et surtout, pour toutes stratégies $x\in\mathcal{P}_m$, $y\in\mathcal{P}_n$ :

$$(x^\star)^TAy \ \leq\ (x^\star)^TAy^\star\ \leq\ x^TAy^\star$$

C'est la définition d'un **point-selle** : aucun joueur n'a intérêt à dévier unilatéralement — un équilibre de Nash, obtenu ici par pure dualité linéaire.

### L'exemple du cours

$$A = \begin{pmatrix} 4 & 2 & 0 & -3\\ -2 & -4 & -3 & 3\\ -2 & -3 & 4 & 1\end{pmatrix}$$

**Stratégies pures : pas d'équilibre.** Les maxima de lignes sont $4,3,4$, donc $\min_i\max_j A_{ij} = 3$ ; les minima de colonnes sont $-2,-4,-3,-3$, donc $\max_j\min_i A_{ij} = -2$. Comme

$$3 > -2$$

il n'existe **pas** de point-selle en stratégies pures : chaque joueur peut être exploité s'il joue de façon déterministe.

**Stratégies mixtes : équilibre.** Le cours donne

$$x^\star = (0{,}37,\ 0{,}33,\ 0{,}30), \qquad y^\star = (0{,}40,\ 0,\ 0{,}13,\ 0{,}47)$$

avec un gain espéré $ (x^\star)^TAy^\star = 0{,}2$, valeur bien comprise entre $-2$ et $3$.

**La leçon.** Randomiser **crée** l'équilibre que les stratégies pures n'ont pas. C'est le résultat fondateur de la théorie des jeux (von Neumann, 1928) — et ce n'est rien d'autre que la dualité forte de la programmation linéaire.

## 🟢 Concept 7 — Interprétation par les circuits

Le cours termine par une lecture électrique de la dualité. Les composants s'écrivent ainsi :

| Composant | Équations |
|---|---|
| Source de tension | $v = E$ |
| Source de courant | $i = I$ |
| **Diode idéale** | $v\leq0$, $i\geq0$, $vi = 0$ |
| Transformateur multi-accès | $\tilde v = Av$, $i = -A^T\tilde i$ |

**Le point remarquable.** Les équations de la diode idéale, $v\leq0$, $i\geq0$, $vi=0$, sont **exactement** un écart complémentaire : la tension joue le rôle de $b_i - a_i^Tx$ et le courant celui de $z_i$. Un circuit de sources, diodes et transformateurs **résout physiquement** un couple primal-dual de LP : les lois de Kirchhoff donnent l'admissibilité, les diodes la complémentarité.

### Comment résoudre l'exercice type (protocole de sensibilité)

1. **Résoudre le LP** et récupérer $x^\star$ **et** une solution duale $z^\star$.
2. **Vérifier la non-dégénérescence** : compter les contraintes actives. Si $|J| = n$ et $A_J$ inversible, la sensibilité est exacte et unique.
3. **Lire les prix implicites** : $z_i$ = valeur marginale de la contrainte $i$ ; $z_i = 0$ pour toute contrainte non saturée.
4. **Estimer l'effet d'une perturbation** : $\Delta p \simeq -z^Tu$, exact pour $u$ petit.
5. **Borner sans hypothèse** : $p(u)\geq p(0)-u^Tz^\star$ vaut pour tout $u$, aussi grand soit-il.
6. **Chercher l'intervalle de validité** : la formule locale cesse de valoir quand une contrainte inactive devient active, c'est-à-dire quand $u$ atteint un morceau suivant de $p$.
7. **Classer les priorités** : la ressource au plus grand $z_i$ est celle qu'il faut augmenter d'abord.

### Exercices progressifs

**Niveau 1** — Un LP de minimisation a $z^\star = (0,\ 3,\ 1{,}5)$. Quelle contrainte relâcher en priorité ? Que gagne-t-on à relâcher la première d'une unité ?

<details><summary>Correction</summary>

La contrainte **2**, de prix implicite $3$ : relâchée d'une unité, elle fait baisser l'optimum d'environ $3$, contre $1{,}5$ pour la troisième. La contrainte **1** a un prix nul : elle n'est pas saturée (écarts complémentaires), la relâcher ne rapporte **rien**. Gain nul.

</details>

**Niveau 2** — Sur le LP de la fiche 28 ($\min -4x_1-5x_2$ s.c. $2x_1+x_2\leq3$, $x_1+2x_2\leq3$, $x\succeq0$), l'optimum $x^\star=(1,1)$ est-il non dégénéré ? Donnez $\partial p/\partial u$ pour les deux capacités.

<details><summary>Correction</summary>

Contraintes actives : les deux capacités seulement, donc $|J| = 2 = n$ : **non dégénéré**, et

$$A_J = \begin{pmatrix}2&1\\1&2\end{pmatrix}, \qquad \det A_J = 3 \neq 0$$

donc $A_J$ est inversible : les hypothèses de l'analyse locale sont réunies. Le dual optimal est $z_J = (1,2)$ (fiche 28), d'où

$$\frac{\partial p}{\partial u_1}(0) = -1, \qquad \frac{\partial p}{\partial u_2}(0) = -2$$

En minimisation de $-4x_1-5x_2$ : une heure de plus sur la machine A fait baisser $p$ de $1$ (donc **augmente le profit** de $1$), une heure sur la machine B de $2$. On retrouve les prix implicites, cette fois comme de vraies **dérivées**.

</details>

**Niveau 3** — Montrez que $p$ est convexe, en utilisant sa forme du concept 3.

<details><summary>Correction</summary>

Sur son domaine, $p(u) = \max_{k=1,\dots,r}(-b^Tz_k - u^Tz_k)$ : c'est un **maximum d'un nombre fini de fonctions affines** de $u$, donc une fonction affine par morceaux **convexe** (fiche 25, concept 1). Hors du domaine, $p = +\infty$, et le domaine est un polyèdre, donc convexe. **Conséquence économique.** La convexité de $p$ signifie que les prix implicites sont **décroissants** : chaque unité supplémentaire d'une ressource rapporte moins que la précédente. C'est la loi des rendements marginaux décroissants, démontrée ici par la dualité linéaire.

</details>

**Niveau 4 — type feuille d'exercices** — Résolvez le jeu de matrice $A = \begin{pmatrix} 1 & -1\\ -1 & 1\end{pmatrix}$ (pile ou face à somme nulle) : stratégies optimales et valeur.

<details><summary>Correction</summary>

**Stratégies pures.** Maxima de lignes : $1$ et $1$, donc $\min_i\max_j = 1$. Minima de colonnes : $-1$ et $-1$, donc $\max_j\min_i = -1$. Comme $1 > -1$, **aucun équilibre en pur** — c'est le jeu de pile ou face : si votre adversaire connaît votre choix, il gagne toujours.

**Stratégies mixtes.** Posons $x = (\alpha,1-\alpha)$ pour J1. Les gains espérés contre les deux actions pures de J2 sont

$$(A^Tx)_1 = \alpha - (1-\alpha) = 2\alpha-1, \qquad (A^Tx)_2 = -\alpha+(1-\alpha) = 1-2\alpha$$

J1 minimise le maximum des deux ; ces deux fonctions affines de $\alpha$ se croisent en $\alpha = 1/2$, où elles valent toutes deux $0$. Donc $x^\star = (1/2,1/2)$ et la valeur du jeu est $0$. Par symétrie, $y^\star = (1/2,1/2)$.

**Vérification du point-selle.** $(x^\star)^TAy = 0$ pour **tout** $y$, et $x^TAy^\star = 0$ pour tout $x$ : les inégalités du minimax sont des égalités. Personne ne peut être exploité, et personne ne gagne — le jeu est équitable **à condition de randomiser**.

</details>

## 🔴 Common mistakes

1. **Se tromper de signe dans la dérivée** — $\partial p/\partial u_i = -z_i$ pour un **minimum**. Relâcher fait baisser la valeur minimale ; en maximisation, le signe s'inverse.
2. **Appliquer la formule locale loin de $0$** — elle n'est exacte qu'au voisinage. Au-delà, seule la **borne globale** subsiste.
3. **Oublier de vérifier la non-dégénérescence** — avec $|J|>n$, le dual n'est pas unique et la « dérivée » n'existe pas (dérivées à droite et à gauche différentes).
4. **Attribuer un prix à une contrainte non saturée** — les écarts complémentaires imposent $z_i = 0$ : relâcher ne sert à rien.
5. **Croire que la sensibilité est constante** — $p$ est affine **par morceaux** ; le prix implicite change quand on franchit un morceau.
6. **Chercher un équilibre en stratégies pures** — il n'existe que si $\min_i\max_j A_{ij} = \max_j\min_i A_{ij}$. Sinon il faut randomiser.
7. **Confondre les rôles des joueurs** — celui qui **paie** minimise le maximum ; celui qui **reçoit** maximise le minimum. Inverser donne la mauvaise borne.

## 📌 Ultimate Review

1. $p(u) = \min\{c^Tx\mid Ax\preceq b+u\}$ ; l'ensemble admissible **dual ne dépend pas de $u$**.
2. **Borne globale** : $p(u)\geq p(0)-u^Tz^\star$, pour tout $u$, sans hypothèse.
3. $p$ est convexe, affine par morceaux, de domaine polyédral ; $p(u) = \max_k(-b^Tz_k-u^Tz_k)$ sur les sommets duaux.
4. **Analyse locale**, si $x^\star$ est un sommet **non dégénéré** ($|J|=n$, $A_J$ inversible) : $x(u) = A_J^{-1}(b_J+u_J)$, $z_J = -A_J^{-T}c$, $z$ indépendant de $u$.
5. **Dérivée** : $\partial p/\partial u_i(0) = -z_i$ — le prix implicite est une vraie dérivée.
6. Jeu matriciel : gain espéré $x^TAy$ ; J1 minimise le max, J2 maximise le min ; les deux LP sont duaux.
7. **Théorème du minimax** $=$ dualité forte ; les stratégies optimales forment un **point-selle**.
8. La diode idéale ($v\leq0$, $i\geq0$, $vi=0$) est un écart complémentaire physique.

**Formulas to know**

$$p(u)\geq p(0)-u^Tz^\star \qquad x(u) = A_J^{-1}(b_J+u_J) \qquad z_J = -A_J^{-T}c \qquad \frac{\partial p}{\partial u_i}(0) = -z_i$$

**Methods to know** : le protocole de sensibilité en 7 étapes ; la mise en LP d'un jeu matriciel ; la lecture de la convexité de $p$ comme rendements décroissants.

## 🧠 Active Recall

**Basic** — Que vaut la dérivée de la valeur optimale par rapport au second membre $b_i$, et sous quelles hypothèses ?

<details><summary>Réponse</summary>

$\partial p/\partial u_i(0) = -z_i$, où $z$ est la solution duale optimale. Hypothèses : $x^\star$ est un point extrême **non dégénéré** — $A_J$ carrée inversible, exactement $n$ contraintes actives. Sans elles, la dérivée peut ne pas exister.

</details>

**Understanding** — Pourquoi la borne $p(u)\geq p(0)-u^Tz^\star$ vaut-elle pour tout $u$, aussi grand soit-il ?

<details><summary>Réponse</summary>

Parce que l'ensemble admissible du dual ne dépend pas de $u$ : $z^\star$ reste dual admissible pour le problème perturbé, quel que soit $u$. La dualité faible s'applique alors sans condition et donne $p(u)\geq-(b+u)^Tz^\star$.

</details>

**Application** — Un LP a deux contraintes, de prix implicites $z = (0,\ 4)$. On relâche la première de 10 unités. Que devient l'optimum ?

<details><summary>Réponse</summary>

$z_1 = 0$, donc la première contrainte n'est pas saturée : la relâcher **ne change rien** au voisinage. La borne globale donne $p(u)\geq p(0)-10\cdot0 = p(0)$, et l'analyse locale donne l'égalité près de $0$. Attention cependant : pour une perturbation de $10$, on peut sortir du morceau affine — la conclusion exacte demande de vérifier l'intervalle de validité.

</details>

**Comparison** — Borne globale et analyse locale : que donne chacune, à quel prix ?

<details><summary>Réponse</summary>

*Globale* : une **inégalité**, valable partout, sans aucune hypothèse — elle protège du côté défavorable mais ne donne pas la valeur. *Locale* : une **égalité** exacte, mais seulement au voisinage de $0$ et sous non-dégénérescence. La borne globale est tangente au graphe de $p$ en $0$ : les deux coïncident là où l'analyse locale s'applique.

</details>

**Exam-style** — Expliquez pourquoi le théorème du minimax est un cas particulier de la dualité forte.

<details><summary>Réponse</summary>

La stratégie optimale de J1 est solution du LP $\min t$ s.c. $A^Tx\preceq t\mathbf1$, $x\succeq0$, $\mathbf1^Tx=1$, dont la valeur est $\min_x\max_y x^TAy$. Celle de J2 est solution de $\max w$ s.c. $Ay\succeq w\mathbf1$, $y\succeq0$, $\mathbf1^Ty=1$, de valeur $\max_y\min_x x^TAy$. Ces deux LP sont **duaux l'un de l'autre** et tous deux admissibles (le simplexe de probabilité n'est jamais vide). La dualité forte donne $p^\star=d^\star$, c'est-à-dire l'égalité du min-max et du max-min.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Fonction valeur optimale ? | $p(u)=\min\{c^Tx\mid Ax\preceq b+u\}$ |
| Borne globale ? | $p(u)\geq p(0)-u^Tz^\star$, pour tout $u$ |
| Pourquoi la borne est-elle globale ? | L'admissibilité duale ne dépend pas de $u$ |
| Forme de $p$ ? | Convexe, affine par morceaux, domaine polyédral |
| $p$ comme maximum ? | $p(u)=\max_k(-b^Tz_k-u^Tz_k)$ sur les sommets duaux |
| Sommet non dégénéré ? | $\mathbf{rank}(A_J)=n$ **et** $\vert J\vert=n$ |
| Solution primale perturbée ? | $x(u)=A_J^{-1}(b_J+u_J)$ — affine en $u$ |
| Solution duale perturbée ? | $z_J=-A_J^{-T}c$ — **indépendante** de $u$ |
| Dérivée de la valeur optimale ? | $\partial p/\partial u_i(0)=-z_i$ |
| Gain espéré d'un jeu matriciel ? | $x^TAy$ |
| Problème du joueur qui paie ? | $\min_{x\in\mathcal{P}_m}\max_j (A^Tx)_j$ |
| Théorème du minimax ? | $\max_y\min_x x^TAy=\min_x\max_y x^TAy$ — c'est la dualité forte |
| Équilibre en stratégies pures ? | Seulement si $\min_i\max_j A_{ij}=\max_j\min_i A_{ij}$ |
| Diode idéale ? | $v\leq0$, $i\geq0$, $vi=0$ — un écart complémentaire |
