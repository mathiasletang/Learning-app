# Série 2 — Lagrangien, dualité et KKT

**À faire pendant :** Boyd, chapitre 5.
**Durée :** 5 à 6 heures, étalées sur une semaine.

C'est le seul sujet du parcours que tu n'as jamais vu, et c'est le plus important. Je commence donc par une explication du mécanisme avant les exercices.

---

# Partie A — Le mécanisme

## A.1 Le problème

$$
\begin{array}{ll}
\text{minimize} & f_0(x)\\
\text{s.t.} & f_i(x)\leq 0,\quad i=1,\dots,m\\
& h_j(x)=0,\quad j=1,\dots,p
\end{array}
$$

On note $p^\star$ la valeur optimale.

**Le problème des contraintes :** sans elles, on annulerait le gradient et ce serait fini. Avec elles, l'optimum est souvent *sur le bord* du domaine admissible, là où le gradient ne s'annule pas. Il faut donc un autre outil.

## A.2 L'idée du Lagrangien

Plutôt que d'interdire de violer les contraintes, on les **tarife**.

$$L(x,\lambda,\nu)=f_0(x)+\sum_{i=1}^m\lambda_i f_i(x)+\sum_{j=1}^p\nu_j h_j(x)$$

Chaque $\lambda_i\geq0$ est le **prix à payer** pour violer la contrainte $i$ d'une unité. Si tu violes ($f_i(x)>0$), tu paies. Si tu respectes largement ($f_i(x)<0$), tu es même « récompensé ».

C'est une transformation d'un problème contraint en une famille de problèmes **libres**, indexée par les prix.

**Pourquoi $\lambda_i\geq0$ obligatoirement ?** Parce qu'on veut pénaliser la violation, pas l'encourager. Si $\lambda_i$ était négatif, violer la contrainte ferait *baisser* $L$, et le mécanisme s'inverserait. Pour les contraintes d'égalité, il n'y a pas de sens privilégié de violation, donc $\nu_j$ est de signe libre.

## A.3 La fonction duale

$$g(\lambda,\nu)=\inf_x\, L(x,\lambda,\nu)$$

Deux propriétés remarquables :

**(i) $g$ est toujours concave**, même si le problème de départ ne l'est pas du tout. C'est un infimum de fonctions **affines** en $(\lambda,\nu)$, et un infimum de fonctions affines est concave. Ce résultat est gratuit et vaut pour n'importe quel problème.

**(ii) $g(\lambda,\nu)\leq p^\star$ pour tout $\lambda\succeq0$** — c'est la **dualité faible**.

Preuve, et elle tient en trois lignes. Soit $\tilde x$ un point admissible. Alors $f_i(\tilde x)\leq0$ et $h_j(\tilde x)=0$, donc avec $\lambda_i\geq0$ :
$$\sum_i\lambda_i f_i(\tilde x)+\sum_j\nu_j h_j(\tilde x)\leq 0$$
d'où $L(\tilde x,\lambda,\nu)\leq f_0(\tilde x)$, et donc
$$g(\lambda,\nu)=\inf_x L(x,\lambda,\nu)\leq L(\tilde x,\lambda,\nu)\leq f_0(\tilde x)$$
Vrai pour tout $\tilde x$ admissible, donc en particulier pour l'optimum. ∎

**Ce que ça donne :** chaque choix de prix fournit une **borne inférieure certifiée** sur l'optimum. Même sans savoir résoudre le problème, on peut prouver « la solution ne descendra pas sous telle valeur ».

## A.4 Le problème dual

On cherche la meilleure borne :
$$
\begin{array}{ll}
\text{maximize} & g(\lambda,\nu)\\
\text{s.t.} & \lambda\succeq0
\end{array}
$$
Valeur optimale : $d^\star$. Par dualité faible, $d^\star\leq p^\star$.

**Le problème dual est toujours convexe** (maximiser une fonction concave), même quand le primal ne l'est pas.

L'écart $p^\star-d^\star\geq0$ s'appelle le **saut de dualité** (*duality gap*).

## A.5 Dualité forte et condition de Slater

Quand $d^\star=p^\star$, on parle de **dualité forte**. Ce n'est pas automatique.

**Condition de Slater :** si le problème est **convexe** et s'il existe un point **strictement** admissible ($f_i(x)<0$ pour toutes les contraintes d'inégalité non affines), alors la dualité forte est vérifiée.

Deux points à retenir :
- La convexité seule ne suffit pas. Il faut aussi Slater.
- Les contraintes **affines** n'ont pas besoin d'être strictement satisfaites.

## A.6 Les conditions KKT

Voilà le cœur. Si la dualité forte est vérifiée et les fonctions dérivables, alors $x^\star$ et $(\lambda^\star,\nu^\star)$ sont optimaux **si et seulement si** :

| # | Nom | Condition |
|---|---|---|
| 1 | **Admissibilité primale** | $f_i(x^\star)\leq0$, $h_j(x^\star)=0$ |
| 2 | **Admissibilité duale** | $\lambda_i^\star\geq0$ |
| 3 | **Écarts complémentaires** | $\lambda_i^\star f_i(x^\star)=0$ pour tout $i$ |
| 4 | **Stationnarité** | $\nabla f_0(x^\star)+\sum_i\lambda_i^\star\nabla f_i(x^\star)+\sum_j\nu_j^\star\nabla h_j(x^\star)=0$ |

**Pour un problème convexe vérifiant Slater, KKT est nécessaire ET suffisant.** C'est ce qui rend la convexité si précieuse : les conditions KKT ne donnent pas des candidats à trier, elles donnent la solution.

### La condition 3 est la plus parlante

$\lambda_i^\star f_i(x^\star)=0$ signifie : **au moins l'un des deux est nul**. Donc

$$\lambda_i^\star>0 \implies f_i(x^\star)=0 \quad\text{(contrainte saturée)}$$
$$f_i(x^\star)<0 \implies \lambda_i^\star=0 \quad\text{(contrainte non saturée, prix nul)}$$

**En économie :** une ressource non entièrement consommée a un prix implicite nul. Une ressource qui a un prix strictement positif est nécessairement épuisée. C'est exactement le raisonnement des solutions en coin de ton cours de micro, mais démontré au lieu d'être invoqué.

## A.7 L'interprétation qui change tout : $\lambda^\star$ est un prix

Perturbe la contrainte $i$ : remplace $f_i(x)\leq0$ par $f_i(x)\leq u_i$. Note $p^\star(u)$ la nouvelle valeur optimale. Alors

$$\frac{\partial p^\star}{\partial u_i}\bigg|_{u=0}=-\lambda_i^\star$$

**Traduction : $\lambda_i^\star$ mesure de combien l'optimum s'améliore si on relâche la contrainte $i$ d'une unité.**

C'est le **prix implicite** (*shadow price*). Une contrainte de capacité avec $\lambda^\star=50$ te dit : une unité de capacité supplémentaire vaut 50. Si le marché la vend 30, achète-la. Si elle coûte 70, non.

C'est aussi, mot pour mot, l'**utilité marginale du revenu** de ton cours de microéconomie — tu le vérifieras à l'exercice 6.

---

# Partie B — Exercices

### Exercice 1 — Écrire un Lagrangien

Pour chaque problème, écris $L$ et précise le signe imposé à chaque multiplicateur.

**(a)**
$$\min\ x_1^2+x_2^2 \quad\text{s.t.}\quad x_1+x_2\geq2$$

**(b)**
$$\min\ c^Tx \quad\text{s.t.}\quad Ax\preceq b,\ \ Cx=d$$

**(c)**
$$\min\ x_1^2+x_2^2 \quad\text{s.t.}\quad x_1\geq1,\ x_2\geq1,\ x_1+x_2=3$$

*Attention en (a) : la contrainte n'est pas sous forme standard.*

### Exercice 2 — Calculer une fonction duale

Reprends le problème (a) :
$$\min\ x_1^2+x_2^2 \quad\text{s.t.}\quad x_1+x_2\geq2$$

1. Écris $L(x,\lambda)$ sous forme standard.
2. Calcule $g(\lambda)=\inf_x L(x,\lambda)$ **explicitement**.
3. Vérifie que $g$ est concave.
4. Maximise $g$ sur $\lambda\geq0$. Trouve $\lambda^\star$ et $d^\star$.
5. Résous le primal géométriquement. Trouve $x^\star$ et $p^\star$.
6. Y a-t-il un saut de dualité ?

### Exercice 3 — Vérifier les quatre conditions KKT

Toujours le même problème. Vérifie une par une les quatre conditions KKT au point $(x^\star,\lambda^\star)$ trouvé.

### Exercice 4 — Contrainte active, contrainte inactive

$$\min\ x_1^2+x_2^2 \quad\text{s.t.}\quad x_1+x_2\geq2,\ \ x_1\geq0$$

1. Écris les conditions KKT (deux multiplicateurs, $\lambda$ et $\mu$).
2. Résous.
3. Quelle contrainte est active ? Laquelle ne l'est pas ? Que valent les multiplicateurs correspondants ?
4. Relie ta réponse aux écarts complémentaires.

### Exercice 5 — Sensibilité

Toujours le problème de l'exercice 2, mais avec la contrainte $x_1+x_2\geq c$.

1. Calcule $p^\star(c)$ en fonction de $c$.
2. Calcule $\dfrac{dp^\star}{dc}$ en $c=2$.
3. Compare à $\lambda^\star$. Commente.

### Exercice 6 — Le programme du consommateur ⭐

C'est **l'exercice le plus important de la série** pour toi. Il relie tout ton cours de micro à ce chapitre.

$$\max\ \sum_{i=1}^n \alpha_i\ln x_i \quad\text{s.t.}\quad p^Tx\leq b,\quad x\succ0$$

avec $\alpha_i>0$, $p_i>0$, $b>0$. Note $A=\sum_i\alpha_i$.

1. Mets sous forme standard (minimisation).
2. Écris le Lagrangien.
3. Écris la condition de stationnarité et exprime $x_i$ en fonction de $\lambda$.
4. Montre que la contrainte budgétaire est nécessairement saturée. *(Indice : que se passerait-il si $\lambda=0$ ?)*
5. Déduis $\lambda^\star$ puis $x_i^\star$.
6. Interprète la formule obtenue.
7. Calcule l'utilité optimale $u^\star(b)$ puis $du^\star/db$. Compare à $\lambda^\star$.

### Exercice 7 — Moindres carrés sous contrainte d'égalité

$$\min\ \|x\|_2^2 \quad\text{s.t.}\quad Ax=b$$

avec $A\in\mathbb{R}^{m\times n}$, $m<n$, de rang plein.

1. Écris le Lagrangien (multiplicateur $\nu\in\mathbb{R}^m$).
2. Condition de stationnarité : exprime $x$ en fonction de $\nu$.
3. Injecte dans la contrainte et trouve $\nu^\star$, puis $x^\star$.
4. Quel objet classique reconnais-tu ?

### Exercice 8 — Raisonner par les écarts complémentaires

Une entreprise résout
$$\max\ 3x_1+2x_2 \quad\text{s.t.}\quad x_1+x_2\leq4,\ \ x_1\leq3,\ \ x\succeq0$$

On te dit que la solution optimale est $x^\star=(3,1)$.

1. Quelles contraintes sont actives ?
2. Sans calculer les multiplicateurs, lesquels sont nécessairement nuls ?
3. Calcule les multiplicateurs des contraintes actives.
4. Interprète-les économiquement.

### Exercice 9 — Quand la dualité forte tombe en panne

$$\min\ -x^2 \quad\text{s.t.}\quad -1\leq x\leq1$$

1. Trouve $p^\star$ (c'est immédiat).
2. Écris $L$ et calcule $g(\lambda_1,\lambda_2)$.
3. Que vaut $d^\star$ ?
4. Pourquoi la dualité forte échoue-t-elle ici ?

### Exercice 10 — Slater n'est pas gratuit

$$\min\ e^{-x} \quad\text{s.t.}\quad \frac{x^2}{y}\leq0,\qquad \mathbf{dom}: y>0$$

1. Quel est l'ensemble admissible ? En déduire $p^\star$.
2. Calcule $g(\lambda)$ pour $\lambda\geq0$. *(Indice : fais tendre $y\to\infty$.)*
3. Que vaut $d^\star$ ? Quel est le saut de dualité ?
4. Le problème est **convexe**. Pourquoi la dualité forte échoue-t-elle quand même ?

---
---

# Corrigés

### Corrigé 1

**(a)** La contrainte $x_1+x_2\geq2$ doit être réécrite $2-x_1-x_2\leq0$. Donc
$$L(x,\lambda)=x_1^2+x_2^2+\lambda(2-x_1-x_2),\qquad \lambda\geq0$$

*Erreur classique : écrire $\lambda(x_1+x_2-2)$. On obtient alors un $\lambda$ de signe opposé, et tout le reste part de travers.*

**(b)** $L(x,\lambda,\nu)=c^Tx+\lambda^T(Ax-b)+\nu^T(Cx-d)$, avec $\lambda\succeq0$ et $\nu$ libre.

**(c)** Réécriture : $1-x_1\leq0$, $1-x_2\leq0$, $x_1+x_2-3=0$.
$$L=x_1^2+x_2^2+\lambda_1(1-x_1)+\lambda_2(1-x_2)+\nu(x_1+x_2-3)$$
avec $\lambda_1,\lambda_2\geq0$, $\nu$ **de signe libre**.

### Corrigé 2

**1.** $L(x,\lambda)=x_1^2+x_2^2+\lambda(2-x_1-x_2)$, $\lambda\geq0$.

**2.** $L$ est convexe en $x$ ; on annule le gradient :
$$\frac{\partial L}{\partial x_1}=2x_1-\lambda=0\ \Rightarrow\ x_1=\frac{\lambda}{2},\qquad x_2=\frac{\lambda}{2}$$
On réinjecte :
$$g(\lambda)=\frac{\lambda^2}{4}+\frac{\lambda^2}{4}+\lambda\left(2-\lambda\right)=\frac{\lambda^2}{2}+2\lambda-\lambda^2$$
$$\boxed{g(\lambda)=-\frac{\lambda^2}{2}+2\lambda}$$

**3.** $g''(\lambda)=-1<0$ : $g$ est **strictement concave**. ✓ (Conforme à la théorie : la fonction duale est toujours concave.)

**4.** $g'(\lambda)=-\lambda+2=0\Rightarrow\lambda^\star=2$, qui respecte bien $\lambda\geq0$.
$$d^\star=g(2)=-2+4=\boxed{2}$$

**5.** Géométriquement : on cherche le point du demi-plan $x_1+x_2\geq2$ le plus proche de l'origine. C'est la projection orthogonale de $0$ sur la droite $x_1+x_2=2$, soit
$$x^\star=(1,1),\qquad p^\star=1+1=\boxed{2}$$

**6.** $d^\star=p^\star=2$ : **aucun saut de dualité**. Cohérent avec Slater — le problème est convexe et $(2,2)$ est strictement admissible.

*Remarquer aussi : $x^\star=(\lambda^\star/2,\lambda^\star/2)=(1,1)$. Le minimiseur du Lagrangien au prix optimal **est** la solution primale. Ce n'est pas un hasard : c'est le mécanisme même de la dualité forte.*

### Corrigé 3

Au point $x^\star=(1,1)$, $\lambda^\star=2$ :

**1. Admissibilité primale :** $2-x_1-x_2=2-2=0\leq0$ ✓

**2. Admissibilité duale :** $\lambda^\star=2\geq0$ ✓

**3. Écarts complémentaires :** $\lambda^\star\cdot(2-x_1^\star-x_2^\star)=2\times0=0$ ✓
*La contrainte est saturée et le multiplicateur est strictement positif — cohérent.*

**4. Stationnarité :**
$$\nabla f_0(x^\star)+\lambda^\star\nabla f_1(x^\star)=\begin{pmatrix}2\\2\end{pmatrix}+2\begin{pmatrix}-1\\-1\end{pmatrix}=\begin{pmatrix}0\\0\end{pmatrix}$$ ✓

Les quatre conditions sont vérifiées, le problème est convexe et Slater tient : $(1,1)$ est **la** solution globale. ∎

### Corrigé 4

**1.** Forme standard : $2-x_1-x_2\leq0$ et $-x_1\leq0$.
$$L=x_1^2+x_2^2+\lambda(2-x_1-x_2)+\mu(-x_1),\qquad\lambda,\mu\geq0$$

Stationnarité :
$$2x_1-\lambda-\mu=0,\qquad 2x_2-\lambda=0$$

**2.** Essayons $\mu=0$ (on parie que $x_1\geq0$ n'est pas saturée). Alors $x_1=x_2=\lambda/2$, et si la première contrainte est active : $x_1+x_2=2\Rightarrow\lambda=2$, donc $x^\star=(1,1)$.

Vérification : $x_1^\star=1>0$, la contrainte $x_1\geq0$ est bien respectée **strictement**, et $\mu=0$ est cohérent. ✓

$$\boxed{x^\star=(1,1),\quad \lambda^\star=2,\quad \mu^\star=0}$$

**3.** La contrainte $x_1+x_2\geq2$ est **active** ($\lambda^\star=2>0$). La contrainte $x_1\geq0$ est **inactive** ($\mu^\star=0$).

**4.** Les écarts complémentaires imposent $\mu^\star\cdot(-x_1^\star)=0$. Comme $x_1^\star=1\neq0$, il faut $\mu^\star=0$.

**Lecture économique :** une contrainte qui ne mord pas ne coûte rien. Son prix implicite est nul, et on peut l'ignorer complètement. C'est ce qui rend les KKT exploitables en pratique : on devine quelles contraintes sont actives, on résout le système réduit, puis on vérifie.

### Corrigé 5

**1.** Par le même raisonnement géométrique (projection de l'origine sur $x_1+x_2=c$) : $x^\star=(c/2,\ c/2)$, donc
$$p^\star(c)=\frac{c^2}{4}+\frac{c^2}{4}=\frac{c^2}{2}$$

**2.** $\dfrac{dp^\star}{dc}=c$, donc en $c=2$ : $\dfrac{dp^\star}{dc}=2$.

**3.** On trouve exactement $\lambda^\star=2$.

**Interprétation.** Durcir la contrainte d'une unité (passer de $c=2$ à $c=3$) coûte environ $\lambda^\star=2$ unités d'objectif. La relâcher d'une unité en fait gagner autant.

*Lien avec la formule de la partie A.7 : en écrivant la contrainte perturbée $2-x_1-x_2\leq u$, on a $c=2-u$, d'où $p^\star(u)=(2-u)^2/2$ et $\partial p^\star/\partial u=-(2-u)=-2=-\lambda^\star$ en $u=0$. Les deux formulations disent la même chose ; seule la convention de signe change. Vérifie toujours dans quel sens le livre perturbe.*

### Corrigé 6 ⭐

**1.** Maximiser $\sum\alpha_i\ln x_i$ revient à minimiser $-\sum\alpha_i\ln x_i$ :
$$\min\ -\sum_i\alpha_i\ln x_i \quad\text{s.t.}\quad p^Tx-b\leq0$$
*Objectif convexe ($-\ln$ est convexe), contrainte affine : problème convexe.* ✓

**2.**
$$L(x,\lambda)=-\sum_i\alpha_i\ln x_i+\lambda\left(\sum_i p_ix_i-b\right),\qquad\lambda\geq0$$

**3.**
$$\frac{\partial L}{\partial x_i}=-\frac{\alpha_i}{x_i}+\lambda p_i=0 \quad\Longrightarrow\quad \boxed{x_i=\frac{\alpha_i}{\lambda p_i}}$$

**4.** Si $\lambda=0$, la relation ci-dessus donne $x_i=+\infty$ : pas de minimum fini. Autrement dit, sans prix pour le budget, on consommerait sans limite. Donc $\lambda^\star>0$, et par les écarts complémentaires ($\lambda^\star(p^Tx^\star-b)=0$) :
$$p^Tx^\star=b$$
**Le budget est intégralement dépensé.** C'est la non-satiété, démontrée au lieu d'être supposée.

**5.** On injecte dans la contrainte saturée :
$$\sum_i p_i\cdot\frac{\alpha_i}{\lambda p_i}=\frac{1}{\lambda}\sum_i\alpha_i=\frac{A}{\lambda}=b \quad\Longrightarrow\quad \boxed{\lambda^\star=\frac{A}{b}}$$
puis
$$\boxed{x_i^\star=\frac{\alpha_i}{\lambda^\star p_i}=\frac{\alpha_i}{A}\cdot\frac{b}{p_i}}$$

**6.** C'est la **demande Cobb-Douglas**, celle de ton cours de micro. Elle dit :

> Le consommateur dépense une **part fixe** $\alpha_i/A$ de son budget sur le bien $i$, quels que soient les prix.

En effet, la dépense sur le bien $i$ vaut $p_ix_i^\star=\dfrac{\alpha_i}{A}b$ : elle ne dépend pas de $p_i$. C'est la propriété caractéristique des préférences Cobb-Douglas, et elle tombe ici en quatre lignes de KKT.

**7.**
$$u^\star(b)=\sum_i\alpha_i\ln\left(\frac{\alpha_i b}{A p_i}\right)=\sum_i\alpha_i\ln\frac{\alpha_i}{Ap_i}+\left(\sum_i\alpha_i\right)\ln b$$
Le premier terme ne dépend pas de $b$, donc
$$\frac{du^\star}{db}=\frac{A}{b}=\boxed{\lambda^\star}$$

**C'est l'utilité marginale du revenu.** Le multiplicateur de Lagrange que tu manipulais en micro sans savoir d'où il venait est précisément la variable duale de la contrainte budgétaire, et sa valeur mesure ce que vaut un euro supplémentaire en termes d'utilité.

*Si tu ne retiens qu'un exercice de cette série, c'est celui-là. Toute la théorie du consommateur est un problème d'optimisation convexe, et ses résultats sont des conséquences des conditions KKT.*

### Corrigé 7

**1.** $L(x,\nu)=x^Tx+\nu^T(Ax-b)$, avec $\nu\in\mathbb{R}^m$ **de signe libre**.

**2.**
$$\nabla_xL=2x+A^T\nu=0 \quad\Longrightarrow\quad x=-\tfrac12A^T\nu$$

**3.** On injecte dans $Ax=b$ :
$$-\tfrac12AA^T\nu=b \quad\Longrightarrow\quad \nu^\star=-2(AA^T)^{-1}b$$
($AA^T$ est inversible car $A$ est de rang plein en lignes.) D'où
$$x^\star=-\tfrac12A^T\nu^\star=\boxed{A^T(AA^T)^{-1}b}$$

**4.** C'est la **solution de norme minimale** du système sous-déterminé $Ax=b$, autrement dit $x^\star=A^\dagger b$ où $A^\dagger$ est la **pseudo-inverse de Moore-Penrose**.

*Le système $Ax=b$ avec $m<n$ a une infinité de solutions ; la dualité sélectionne la plus « petite ». On retrouve ici, par un chemin totalement différent, la formule des moindres carrés généralisés — celle qui est derrière la régression linéaire.*

**Vérification numérique** avec $A=\begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$, $b=(2,3)^T$ : la formule donne $x^\star\approx(0{,}333;\ 1{,}667;\ 1{,}333)$, et on vérifie $Ax^\star=b$ exactement.

### Corrigé 8

**1.** En $x^\star=(3,1)$ :
- $x_1+x_2=4\leq4$ → **active**
- $x_1=3\leq3$ → **active**
- $x_1=3\geq0$ → inactive
- $x_2=1\geq0$ → inactive

**2.** Par les écarts complémentaires, les multiplicateurs des contraintes **inactives** sont nuls : ceux de $x_1\geq0$ et $x_2\geq0$.

**3.** Forme standard (on minimise $-3x_1-2x_2$) :
$$L=-3x_1-2x_2+\lambda_1(x_1+x_2-4)+\lambda_2(x_1-3)$$
Stationnarité :
$$-3+\lambda_1+\lambda_2=0,\qquad -2+\lambda_1=0$$
D'où $\boxed{\lambda_1=2,\quad \lambda_2=1}$. Les deux sont $\geq0$ ✓ (admissibilité duale respectée).

**4.** **Interprétation.**
- $\lambda_1=2$ : relâcher la première contrainte d'une unité (passer de 4 à 5) augmente le profit de **2**. Si cette ressource s'achète à moins de 2 l'unité, il faut en acheter.
- $\lambda_2=1$ : une unité supplémentaire de la seconde ressource vaut **1**.
- Les multiplicateurs des contraintes de positivité sont nuls : ces contraintes ne coûtent rien puisqu'elles ne mordent pas.

Ce sont les **prix duaux** que renvoie n'importe quel solveur de programmation linéaire (Gurobi, CPLEX, le solveur d'Excel). En pratique, ils sont souvent plus utiles que la solution elle-même : ils disent où investir.

### Corrigé 9

**1.** $-x^2$ est minimale quand $x^2$ est maximal, soit en $x=\pm1$ : $\boxed{p^\star=-1}$.

**2.** Contraintes sous forme standard : $x-1\leq0$ et $-x-1\leq0$.
$$L(x,\lambda_1,\lambda_2)=-x^2+\lambda_1(x-1)+\lambda_2(-x-1)$$

Pour l'infimum sur $x\in\mathbb{R}$ : le terme dominant est $-x^2$, qui tend vers $-\infty$ quand $|x|\to\infty$. Les termes linéaires ne peuvent pas compenser un terme quadratique négatif. Donc
$$g(\lambda_1,\lambda_2)=-\infty \quad\text{pour tous }\lambda_1,\lambda_2\geq0$$

**3.** $d^\star=\sup g=-\infty$.

**4.** Le saut de dualité est **infini** : $p^\star-d^\star=-1-(-\infty)=+\infty$.

**Pourquoi ?** Le problème n'est **pas convexe** : on minimise $-x^2$, dont la dérivée seconde vaut $-2<0$. L'objectif est concave, pas convexe. La condition de Slater ne s'applique donc pas, et rien ne garantit la dualité forte.

*Ici l'échec est total : le dual ne donne aucune information. C'est le cas général pour les problèmes non convexes — et c'est précisément pour cela qu'on tient tant à la convexité.*

### Corrigé 10

**1.** Avec $y>0$, la contrainte $x^2/y\leq0$ impose $x^2\leq0$, donc $x=0$.
Ensemble admissible : $\{(0,y)\mid y>0\}$. L'objectif $e^{-x}=e^0=1$ y est constant.
$$p^\star=1$$

**2.**
$$L(x,y,\lambda)=e^{-x}+\lambda\frac{x^2}{y}$$
Fixons $x$ quelconque et faisons $y\to+\infty$ : le second terme tend vers 0, donc $L\to e^{-x}$. Puis faisons $x\to+\infty$ : $e^{-x}\to0$.
$$g(\lambda)=\inf_{x,\,y>0}L=0 \quad\text{pour tout }\lambda\geq0$$

**3.** $d^\star=0$, donc le saut de dualité vaut $p^\star-d^\star=\boxed{1}$.

**4.** Le problème **est** convexe : $e^{-x}$ est convexe, et $x^2/y$ est convexe sur $\{y>0\}$ (c'est la fonction *quadratique sur linéaire*, Boyd §3.1.5).

Mais **la condition de Slater échoue** : il n'existe aucun point *strictement* admissible, puisque $x^2/y<0$ est impossible avec $y>0$. Le seul point admissible sature la contrainte.

**C'est l'exemple canonique** (Boyd, §5.3.2) qui montre que la convexité seule ne suffit pas. Il faut la convexité **et** Slater. Retiens-le : c'est le contre-exemple que tout le monde cite.

## Récapitulatif

| Notion | À retenir |
|---|---|
| Lagrangien | Tarifer les contraintes au lieu de les interdire |
| $\lambda\geq0$, $\nu$ libre | Le signe suit le type de contrainte |
| Fonction duale | **Toujours concave**, même si le primal ne l'est pas |
| Dualité faible | $d^\star\leq p^\star$, **toujours vrai** |
| Dualité forte | $d^\star=p^\star$. Demande convexité **+ Slater** |
| KKT | Nécessaire et **suffisant** en convexe avec Slater |
| Écarts complémentaires | Contrainte inactive ⟹ prix nul |
| $\lambda^\star$ | **Prix implicite** = sensibilité de l'optimum |

## Auto-évaluation

Coche honnêtement :

- [ ] Je sais écrire un Lagrangien sans me tromper de signe
- [ ] Je sais calculer une fonction duale simple
- [ ] Je sais énoncer les quatre conditions KKT **de mémoire**
- [ ] Je comprends pourquoi $\lambda_i\geq0$ mais $\nu_j$ libre
- [ ] Je sais expliquer les écarts complémentaires à quelqu'un d'autre
- [ ] Je sais retrouver la demande Cobb-Douglas par KKT (exercice 6)
- [ ] Je sais donner un exemple où la dualité forte échoue

**Moins de 5 cases cochées :** relis la partie A et refais les exercices 2, 3, 4 et 6. C'est normal — c'est le chapitre le plus difficile du parcours, et il se digère en plusieurs passages.

**7 cases :** tu as le chapitre 5 de Boyd. C'est le plus gros obstacle du parcours, et il est derrière toi.
