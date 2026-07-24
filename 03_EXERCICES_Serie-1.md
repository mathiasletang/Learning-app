# Série 1 — Convexité

**À faire après :** le poly de Dossal, ou Boyd chapitres 2–3.
**Durée :** 3 à 4 heures.

Cette série couvre le contenu des chapitres 2 et 3 de Boyd. C'est le socle : tout le reste en dépend.

---

## Rappels utiles

**Ensemble convexe.** $C$ est convexe si pour tous $x,y\in C$ et $\theta\in[0,1]$ :
$$\theta x+(1-\theta)y\in C$$
*En clair : le segment joignant deux points de $C$ reste dans $C$.*

**Fonction convexe.** $f$ est convexe si $\mathbf{dom}\,f$ est convexe et si pour tous $x,y$ et $\theta\in[0,1]$ :
$$f(\theta x+(1-\theta)y)\leq \theta f(x)+(1-\theta)f(y)$$
*En clair : la corde est au-dessus de la courbe.*

**Condition du premier ordre** (si $f$ dérivable) :
$$f \text{ convexe} \iff f(y)\geq f(x)+\nabla f(x)^T(y-x)\quad \forall x,y$$
*En clair : la tangente est sous la courbe. Conséquence capitale : si $\nabla f(x)=0$, alors $f(y)\geq f(x)$ pour tout $y$ — donc **tout minimum local est global**.*

**Condition du second ordre** (si $f$ deux fois dérivable) :
$$f \text{ convexe} \iff \nabla^2 f(x)\succeq 0 \quad \forall x$$

---

## Énoncés

### Exercice 1 — Reconnaître les ensembles convexes

Lesquels sont convexes ? Justifie en une phrase.

1. $\{x\in\mathbb{R}^2 \mid x_1^2+x_2^2\leq 1\}$
2. $\{x\in\mathbb{R}^2 \mid x_1^2+x_2^2 = 1\}$
3. $\{x\in\mathbb{R}^2 \mid x_1x_2\geq 1,\ x_1>0\}$
4. $\{x\in\mathbb{R}^n \mid a^Tx=b\}$
5. $\{x\in\mathbb{R}^n \mid a^Tx\leq b\}$
6. $\{x\in\mathbb{R}^2 \mid x_1\geq 0\}\cup\{x\in\mathbb{R}^2\mid x_2\geq 0\}$
7. $\mathbb{Z}$ (les entiers)
8. $\{X\in\mathbf{S}^n \mid X\succeq 0\}$

---

### Exercice 2 — L'intersection

Montre que si $C_1$ et $C_2$ sont convexes, alors $C_1\cap C_2$ l'est.
Puis : l'union de deux convexes est-elle convexe ? Justifie.

---

### Exercice 3 — Le polyèdre

Un **polyèdre** est $P=\{x \mid Ax\preceq b,\ Cx=d\}$.

1. Montre que $P$ est convexe, en utilisant l'exercice 2.
2. Quel objet économique très classique est un polyèdre ? (indice : contrainte de budget)

---

### Exercice 4 — Convexité par la définition

Montre **directement par la définition** (sans dériver) que $f(x)=|x|$ est convexe sur $\mathbb{R}$.

---

### Exercice 5 — La condition du premier ordre

Soit $f$ convexe et dérivable, et $x^\star$ tel que $\nabla f(x^\star)=0$.

1. Déduis de la condition du premier ordre que $x^\star$ est un **minimum global**.
2. Pourquoi est-ce faux si $f$ n'est pas convexe ? Donne un contre-exemple.
3. En une phrase : pourquoi est-ce **la** raison pour laquelle on aime la convexité ?

---

### Exercice 6 — Opérations qui préservent la convexité

Vrai ou faux ? Justifie.

1. Si $f_1,f_2$ convexes, alors $f_1+f_2$ est convexe.
2. Si $f$ convexe et $\alpha\in\mathbb{R}$, alors $\alpha f$ est convexe.
3. Si $f_1,f_2$ convexes, alors $\max(f_1,f_2)$ est convexe.
4. Si $f_1,f_2$ convexes, alors $\min(f_1,f_2)$ est convexe.
5. Si $f$ convexe et $A$ une matrice, alors $x\mapsto f(Ax+b)$ est convexe.
6. Si $f_1,f_2$ convexes, alors $f_1f_2$ est convexe.

---

### Exercice 7 — Les normes sont convexes

Montre que toute norme $\|\cdot\|$ est une fonction convexe, en n'utilisant que les deux axiomes : homogénéité $\|\alpha x\|=|\alpha|\,\|x\|$ et inégalité triangulaire.

---

### Exercice 8 — log-sum-exp

Soit $f(x)=\ln\left(e^{x_1}+e^{x_2}\right)$ sur $\mathbb{R}^2$.

1. Montre que $f(x)\geq\max(x_1,x_2)$.
2. Calcule $\nabla f$.
3. On admet que $\nabla^2 f\succeq 0$. Que peut-on en conclure ?

*Cette fonction est l'approximation lisse du maximum. Elle est partout : en optimisation, en apprentissage (softmax), en économie (modèles de choix discret / logit).*

---

### Exercice 9 — Quasi-concavité et économie

Soit $u(x_1,x_2)=x_1x_2$ sur $\mathbb{R}^2_{++}$ (utilité Cobb-Douglas).

1. On a vu en Série 0 que $u$ n'est **pas** concave. Redis pourquoi en une ligne.
2. Montre que l'ensemble $\{x\in\mathbb{R}^2_{++} \mid u(x)\geq \alpha\}$ est convexe pour tout $\alpha>0$.
3. Comment appelle-t-on cette propriété ? Que représente cet ensemble en microéconomie ?

---

### Exercice 10 — Mise en forme

Le problème suivant est-il convexe ? Si non, peut-on le rendre convexe ?

$$\begin{array}{ll}\text{minimize} & x_1^2+x_2^2\\ \text{s.t.} & \dfrac{x_1}{x_2}\leq 1,\quad x_2>0\end{array}$$

---
---

# Corrigés

---

### Corrigé 1

1. **Convexe.** C'est la boule unité (norme 2). Toute boule d'une norme est convexe.
2. **Non convexe.** C'est le *cercle*, pas le disque. Le segment entre $(1,0)$ et $(-1,0)$ passe par l'origine, qui n'est pas sur le cercle.
3. **Convexe.** C'est $\{x_1>0,\ x_2\geq 1/x_1\}$ : l'épigraphe de la fonction convexe $x_1\mapsto 1/x_1$ sur $\mathbb{R}_{++}$.
4. **Convexe.** C'est un **hyperplan**. Si $a^Tx=a^Ty=b$, alors $a^T(\theta x+(1-\theta)y)=\theta b+(1-\theta)b=b$. ✓
5. **Convexe.** C'est un **demi-espace**. Même calcul avec des inégalités.
6. **Non convexe.** Cette union est exactement $\mathbb{R}^2$ privé du troisième quadrant ouvert $\{x_1<0,\ x_2<0\}$.
   Contre-exemple : $(-2,1)$ appartient au second ensemble ($x_2\geq0$), $(1,-2)$ appartient au premier ($x_1\geq0$). Leur milieu est $(-0{,}5,\,-0{,}5)$, dont les deux coordonnées sont négatives : il n'appartient à aucun des deux.
   *Leçon générale : l'union de convexes n'est presque jamais convexe.*
7. **Non convexe.** Le milieu de $0$ et $1$ est $0{,}5\notin\mathbb{Z}$.
8. **Convexe.** C'est le **cône des matrices semi-définies positives**. Si $X\succeq0$ et $Y\succeq0$, alors pour $\theta\in[0,1]$ : $z^T(\theta X+(1-\theta)Y)z=\theta z^TXz+(1-\theta)z^TYz\geq0$. ✓

---

### Corrigé 2

**Intersection.** Soient $x,y\in C_1\cap C_2$ et $\theta\in[0,1]$.
- $x,y\in C_1$ convexe ⟹ $\theta x+(1-\theta)y\in C_1$
- $x,y\in C_2$ convexe ⟹ $\theta x+(1-\theta)y\in C_2$

Donc le point appartient à l'intersection. ∎

*Ce résultat se généralise à une intersection quelconque, même infinie. C'est l'outil n°1 pour prouver qu'un ensemble est convexe : l'écrire comme intersection de demi-espaces.*

**Union : non.** Contre-exemple dans $\mathbb{R}$ : $C_1=[0,1]$, $C_2=[2,3]$. Le milieu de $0$ et $3$ est $1{,}5$, qui n'est dans ni l'un ni l'autre.

---

### Corrigé 3

**1.** $Ax\preceq b$ signifie $a_i^Tx\leq b_i$ pour chaque ligne $i$ : c'est une intersection de **demi-espaces**. $Cx=d$ est une intersection d'**hyperplans**. Chacun est convexe (exercice 1), et une intersection de convexes est convexe (exercice 2). Donc $P$ est convexe. ∎

**2.** **L'ensemble budgétaire** $\{x\succeq 0 \mid p^Tx\leq b\}$. C'est un polyèdre : l'intersection de l'orthant positif et d'un demi-espace. En dimension 2, c'est le triangle familier du cours de micro.

*C'est le premier point de contact concret entre ton cours d'économie et Boyd. Ta droite de budget est un hyperplan ; ton ensemble de consommation admissible est un polyèdre ; le programme du consommateur est un problème d'optimisation convexe.*

---

### Corrigé 4

Soient $x,y\in\mathbb{R}$ et $\theta\in[0,1]$. Alors $\theta\geq0$ et $1-\theta\geq0$, donc :
$$|\theta x+(1-\theta)y| \leq |\theta x|+|(1-\theta)y| \quad \text{(inégalité triangulaire)}$$
$$= \theta|x|+(1-\theta)|y| \quad \text{(car } \theta,1-\theta\geq 0)$$

C'est exactement la définition de la convexité. ∎

*Noter qu'on n'a jamais dérivé — c'est heureux, $|x|$ n'est pas dérivable en 0. La définition par la corde s'applique aux fonctions non lisses, contrairement aux critères par la hessienne.*

---

### Corrigé 5

**1.** La condition du premier ordre donne, pour tout $y$ :
$$f(y)\geq f(x^\star)+\nabla f(x^\star)^T(y-x^\star) = f(x^\star)+0 = f(x^\star)$$
Donc $f(y)\geq f(x^\star)$ pour **tout** $y$ : $x^\star$ est un minimum global. ∎

**2.** Sans convexité, la tangente n'est plus sous la courbe et l'inégalité tombe.
Contre-exemple : $f(x)=x^3$. On a $f'(0)=0$, mais $0$ n'est ni un minimum ni un maximum (point d'inflexion).
Autre : $f(x)=-x^2$, où $f'(0)=0$ correspond à un **maximum**.

**3.** **Parce que « annuler le gradient » devient une condition suffisante d'optimalité globale.** Dans le cas général, résoudre $\nabla f=0$ ne fournit que des candidats locaux, sans moyen de savoir lequel est le meilleur — algorithmiquement, c'est un problème très dur. En convexe, il n'y a rien à comparer : tout point stationnaire est LA solution. C'est toute la différence entre un problème que l'on sait résoudre et un problème que l'on ne sait pas résoudre.

---

### Corrigé 6

1. **VRAI.** Somme des deux inégalités de convexité.
2. **FAUX en général** — vrai seulement si $\alpha\geq 0$. Si $\alpha<0$, $\alpha f$ est **concave**.
3. **VRAI.** Le maximum ponctuel de fonctions convexes est convexe.
   Preuve : $\max_i f_i(\theta x+(1-\theta)y)\leq \max_i[\theta f_i(x)+(1-\theta)f_i(y)]\leq \theta\max_i f_i(x)+(1-\theta)\max_i f_i(y)$.
   *Vu par les épigraphes : $\mathbf{epi}\max(f_1,f_2)=\mathbf{epi}f_1\cap\mathbf{epi}f_2$, intersection de convexes.*
4. **FAUX.** Contre-exemple : $f_1(x)=x$, $f_2(x)=-x$, toutes deux convexes (linéaires). $\min(f_1,f_2)=-|x|$ est **concave**, pas convexe.
5. **VRAI.** La composition avec une application affine préserve la convexité :
   $g(\theta x+(1-\theta)y)=f(\theta(Ax+b)+(1-\theta)(Ay+b))\leq\theta f(Ax+b)+(1-\theta)f(Ay+b)$.
   *Règle très utilisée : c'est elle qui rend convexe $\|Ax-b\|^2$, l'objectif des moindres carrés.*
6. **FAUX.** Contre-exemple : $f_1(x)=x$ et $f_2(x)=1-x$, toutes deux affines donc convexes. Leur produit $f_1f_2 = x-x^2$ a pour dérivée seconde $-2<0$ : il est **concave**.
   *Le produit de fonctions convexes n'a aucune raison d'être convexe. Il faut des hypothèses supplémentaires (positivité et monotonie de même sens) pour que ça marche.*

---

### Corrigé 7

Soient $x,y$ et $\theta\in[0,1]$ :
$$\|\theta x+(1-\theta)y\| \leq \|\theta x\|+\|(1-\theta)y\| \quad \text{(inégalité triangulaire)}$$
$$= |\theta|\,\|x\|+|1-\theta|\,\|y\| \quad \text{(homogénéité)}$$
$$= \theta\|x\|+(1-\theta)\|y\| \quad \text{(car } 0\leq\theta\leq1)$$
∎

*Conséquence : $\|x\|_1$, $\|x\|_2$, $\|x\|_\infty$ sont toutes convexes. C'est pourquoi on peut mettre une pénalité en norme dans un objectif sans casser la convexité — le LASSO, la ridge regression et le compressed sensing reposent entièrement là-dessus.*

---

### Corrigé 8

**1.** Supposons sans perte de généralité $x_1\geq x_2$. Alors
$$f(x)=\ln(e^{x_1}+e^{x_2})\geq\ln(e^{x_1})=x_1=\max(x_1,x_2)$$
puisque $e^{x_2}>0$ et que $\ln$ est croissant. ∎

On a aussi la borne supérieure $f(x)\leq\max(x_1,x_2)+\ln 2$ : la fonction encadre le max à $\ln 2$ près.

**2.**
$$\frac{\partial f}{\partial x_1}=\frac{e^{x_1}}{e^{x_1}+e^{x_2}}, \qquad \frac{\partial f}{\partial x_2}=\frac{e^{x_2}}{e^{x_1}+e^{x_2}}$$
$$\nabla f(x)=\frac{1}{e^{x_1}+e^{x_2}}\begin{pmatrix}e^{x_1}\\e^{x_2}\end{pmatrix}$$

**Le gradient est le vecteur softmax.** Ses composantes sont positives et somment à 1 : c'est une distribution de probabilité. En économie, c'est **exactement** la formule des parts de marché du modèle logit multinomial.

**3.** $\nabla^2f\succeq0$ partout ⟹ $f$ est **convexe** sur $\mathbb{R}^2$.

---

### Corrigé 9

**1.** Sa hessienne $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ a pour valeurs propres $+1$ et $-1$ : elle est indéfinie, donc $u$ n'est ni convexe ni concave.

**2.** L'ensemble $\{x_1x_2\geq\alpha,\ x>0\}$ se réécrit, pour $x_1>0$ :
$$x_2\geq \frac{\alpha}{x_1}$$
C'est l'**épigraphe** de la fonction $x_1\mapsto\alpha/x_1$, qui est convexe sur $\mathbb{R}_{++}$ (sa dérivée seconde vaut $2\alpha/x_1^3>0$). Un épigraphe de fonction convexe est convexe. ∎

**3.** On dit que $u$ est **quasi-concave** : tous ses ensembles de sur-niveau sont convexes.

En microéconomie, $\{x \mid u(x)\geq\alpha\}$ est l'ensemble des paniers **au moins aussi bons** qu'un niveau de satisfaction donné. Sa frontière est la **courbe d'indifférence**. Dire que cet ensemble est convexe, c'est exactement l'hypothèse de **convexité des préférences** — le goût pour la diversité : un mélange de deux paniers équivalents est au moins aussi bon que chacun.

*Retiens ce point : l'économie n'a besoin que de la quasi-concavité, jamais de la concavité. C'est une hypothèse strictement plus faible, et c'est la bonne. Boyd traite la quasi-convexité au chapitre 3.4.*

---

### Corrigé 10

**Tel qu'écrit, le problème n'est pas sous forme convexe.** La contrainte $x_1/x_2\leq1$ fait intervenir un quotient : la fonction $(x_1,x_2)\mapsto x_1/x_2$ n'est pas convexe sur $\{x_2>0\}$.

**Mais le problème est convexe après réécriture.** Comme $x_2>0$, on peut multiplier les deux membres sans changer le sens :
$$\frac{x_1}{x_2}\leq1 \iff x_1\leq x_2 \iff x_1-x_2\leq 0$$

Le problème devient
$$\begin{array}{ll}\text{minimize} & x_1^2+x_2^2\\ \text{s.t.} & x_1-x_2\leq0\end{array}$$
objectif convexe, contrainte **linéaire** : c'est un QP, parfaitement convexe.

*La leçon dépasse l'exercice. Un problème peut être convexe sans en avoir l'air ; savoir le mettre en forme est une compétence à part entière — c'est tout l'objet du chapitre 4 de Boyd, et la raison d'être de la « programmation convexe disciplinée » (DCP) derrière CVXPY. Un solveur refusera la première écriture et acceptera la seconde, alors que c'est le même problème.*

---

## Ce qu'il faut retenir

| Idée | Pourquoi elle compte |
|---|---|
| Intersection de convexes = convexe | L'outil de preuve n°1 |
| Convexe ⟹ minimum local = minimum global | La raison d'être de toute la théorie |
| Épigraphe convexe ⟺ fonction convexe | Le pont ensembles ↔ fonctions |
| Max de convexes = convexe, min = non | Erreur classique |
| Composition affine préserve la convexité | Rend convexes les moindres carrés |
| Quasi-concave ≠ concave | La distinction qui compte en économie |
| Un problème peut être convexe *après* réécriture | Chapitre 4 de Boyd, et CVXPY |

**Prochaine étape :** Boyd chapitre 5, avec la `Série 2` en parallèle.
