# Fiche 40 — Minimisation sous contraintes d'égalité (Boyd, chapitre 10)

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Boyd & Vandenberghe, *Convex Optimization*, chapitre 10 « Equality constrained minimization », p. 521–560 |
| **Difficulté** | Fondamental — la brique intermédiaire, entre Newton libre et points intérieurs |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiche 39 (Newton, décrément, recherche linéaire), fiche 38 (KKT) |
| **Concepts clés** | Équations KKT, système KKT, matrice KKT, élimination, pas de Newton contraint, méthode de descente admissible, départ non admissible, résidu, méthode primale-duale |
| **Poids à l'examen** | Savoir **écrire et interpréter le système KKT** $\begin{pmatrix}P & A^T\\ A & 0\end{pmatrix}$, et savoir dire pourquoi on préfère traiter les égalités **directement** plutôt que les éliminer. |

## 🎯 Vue d'ensemble

$$\min\ f(x) \quad\text{sous}\quad Ax=b$$

avec $f$ convexe $C^2$ et $A\in\mathbb{R}^{p\times n}$ de rang $p<n$ — **moins de contraintes que de variables, et contraintes indépendantes**.

Ce chapitre est la **marche intermédiaire** de la hiérarchie algorithmique du livre :

```
QUADRATIQUE à égalités  →  système LINÉAIRE, résolution analytique
NEWTON contraint        →  une suite de quadratiques à égalités
POINTS INTÉRIEURS (ch.11) →  une suite de problèmes à égalités
```

Chaque niveau se ramène à une **suite** de problèmes du niveau précédent. C'est l'architecture de toute l'optimisation convexe numérique.

## 🟡 Concept 1 — Les équations KKT

Par le critère d'optimalité (fiche 36) ou par KKT (fiche 38), un point $x^\star\in\mathbf{dom}\,f$ est optimal **si et seulement si** il existe $\nu^\star\in\mathbb{R}^p$ tel que

$$Ax^\star = b, \qquad \nabla f(x^\star)+A^T\nu^\star = 0 \tag{10.2}$$

C'est un système de **$n+p$ équations à $n+p$ inconnues** $(x,\nu)$, composé de deux blocs de natures très différentes :

| Bloc | Nom | Nature |
|---|---|---|
| $Ax=b$ | **faisabilité primale** | **linéaire** |
| $\nabla f(x)+A^T\nu=0$ | **faisabilité duale** | en général **non linéaire** |

> **Toute la difficulté est dans le second bloc.** Si $f$ est quadratique, son gradient est affine et le système entier devient linéaire : on sait le résoudre exactement. Sinon, on **linéarise** — et c'est exactement la méthode de Newton.

## 🔴 Concept 2 — Le cas quadratique et la matrice KKT

$$\min\ \tfrac12x^TPx+q^Tx+r \quad\text{sous}\quad Ax=b, \qquad P\in\mathbf{S}^n_+ \tag{10.3}$$

Les conditions d'optimalité $Ax=b$ et $Px+q+A^T\nu=0$ s'écrivent en un seul **système KKT** :

$$\begin{pmatrix} P & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}x^\star\\ \nu^\star\end{pmatrix} = \begin{pmatrix}-q\\ b\end{pmatrix} \tag{10.4}$$

La matrice de gauche s'appelle la **matrice KKT**.

**Les trois cas.**

| Situation | Conclusion |
|---|---|
| matrice KKT **inversible** | couple primal-dual $(x^\star,\nu^\star)$ **unique** |
| matrice **singulière**, système **soluble** | toute solution donne un couple optimal |
| système **non soluble** | le problème est **non borné** ou **non admissible** |

**Pourquoi le troisième cas donne un problème non borné.** Si le système n'est pas soluble, il existe $v$ et $w$ avec

$$Pv+A^Tw=0, \qquad Av=0, \qquad -q^Tv+b^Tw>0$$

Alors, depuis n'importe quel point admissible $\hat x$, les points $\hat x+tv$ restent admissibles ($Av=0$) et

$$f(\hat x+tv) = f(\hat x) + t\,(-b^Tw+q^Tv) \ \xrightarrow[t\to\infty]{}\ -\infty$$

$v$ est une **direction de récession** faisant baisser l'objectif — exactement le mécanisme de la fiche 27.

⚠️ La matrice KKT n'est **jamais définie positive** : son bloc en bas à droite est nul. C'est une matrice **symétrique indéfinie**, ce qui interdit une factorisation de Cholesky ordinaire. On utilise des factorisations $LDL^T$ adaptées.

## 🟠 Concept 3 — Trois façons de traiter les égalités

**1. Élimination (§10.1.2).** On paramètre l'ensemble admissible : $\{x\mid Ax=b\} = \{Fz+\hat x\mid z\in\mathbb{R}^{n-p}\}$ où $\hat x$ est une solution particulière et les colonnes de $F$ engendrent $\mathbf{nullspace}(A)$. Le problème devient **sans contrainte** :

$$\min_z\ \tilde f(z) = f(Fz+\hat x)$$

et l'on applique tout le chapitre 9. On récupère ensuite $\nu^\star$ à partir de $\nabla f(x^\star)$.

**2. Passage au dual (§10.1.3).** Si la fonction duale est deux fois dérivable, on maximise $g(\nu)$ **sans contrainte**, puis on reconstruit $x^\star$.

**3. Newton direct (§10.2).** On étend Newton pour traiter les égalités **telles quelles**. **C'est l'approche du chapitre**, et Boyd donne deux raisons de la préférer :

> *La structure du problème — par exemple sa **parcimonie** — est souvent détruite par l'élimination (ou par le passage au dual) ; une méthode qui traite directement les contraintes d'égalité peut, elle, l'exploiter.* Et, conceptuellement : *une telle méthode s'interprète comme une résolution directe des conditions d'optimalité.*

⚠️ Le point sur la parcimonie est décisif en pratique. Une matrice $A$ creuse a en général un noyau **dense** : la matrice $F$ de l'élimination est pleine, et le problème réduit, plus petit, devient beaucoup plus cher à résoudre.

## 🔴 Concept 4 — Le pas de Newton contraint

**Définition par le modèle quadratique.** Au point **admissible** $x$, on remplace l'objectif par son approximation du second ordre :

$$\min_v\ f(x)+\nabla f(x)^Tv+\tfrac12v^T\nabla^2f(x)v \quad\text{sous}\quad A(x+v)=b \tag{10.10}$$

C'est un problème quadratique à contraintes d'égalité : on le résout **analytiquement** par le concept 2. Le **pas de Newton** $\Delta x_{\text{nt}}$ est sa solution, caractérisée par

$$\begin{pmatrix}\nabla^2f(x) & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}\Delta x_{\text{nt}}\\ w\end{pmatrix} = \begin{pmatrix}-\nabla f(x)\\ 0\end{pmatrix} \tag{10.11}$$

où $w$ est la variable duale optimale du sous-problème quadratique.

**Deuxième interprétation — conditions d'optimalité linéarisées.** On substitue $x+\Delta x_{\text{nt}}$ à $x$ et $w$ à $\nu$ dans (10.2), en linéarisant le gradient :

$$A(x+\Delta x_{\text{nt}})=b, \qquad \nabla f(x)+\nabla^2f(x)\Delta x_{\text{nt}}+A^Tw = 0$$

Comme $Ax=b$, la première devient $A\Delta x_{\text{nt}}=0$ — **le pas reste dans le noyau de $A$**, donc l'itéré reste admissible — et l'on retrouve exactement (10.11).

> **Si $f$ est exactement quadratique, $x+\Delta x_{\text{nt}}$ résout exactement le problème**, et $w$ **est** la variable duale optimale $\nu^\star$. Quand $f$ est presque quadratique, $x+\Delta x_{\text{nt}}$ est une excellente estimation de $x^\star$, et $w$ de $\nu^\star$ — même intuition qu'au chapitre 9.

**Décrément de Newton.**

$$\lambda(x) = \big(\Delta x_{\text{nt}}^T\nabla^2f(x)\Delta x_{\text{nt}}\big)^{1/2} \tag{10.12}$$

C'est **exactement** la même expression que dans le cas sans contrainte, avec les mêmes interprétations : $\lambda(x)$ est la norme du pas de Newton **dans la norme définie par la hessienne**, et $\lambda^2/2$ estime $f(x)-p^\star$.

**Algorithme 10.1 — méthode de Newton sous contraintes d'égalité.**

```
donné un point de départ x ∈ dom f avec Ax = b, une tolérance ε > 0
répéter
  1. calculer Δx_nt et λ(x) par le système KKT (10.11)
  2. arrêt : terminer si λ²/2 ≤ ε
  3. recherche linéaire rétrograde
  4. mise à jour : x := x + t Δx_nt
```

> **C'est une méthode de descente *admissible* :** tous les itérés satisfont $Ax^{(k)}=b$ (puisque $A\Delta x_{\text{nt}}=0$) et $f(x^{(k+1)})<f(x^{(k)})$. Il faut donc partir d'un point **admissible** — c'est précisément la limitation que lève le concept 5.

**Newton et élimination (§10.2.3).** Les deux approches ne sont pas seulement voisines : appliquer Newton au problème **éliminé** produit **exactement les mêmes itérés** que Newton contraint appliqué au problème d'origine. La différence est purement **numérique** — quelle structure on exploite — non mathématique.

## 🔴 Concept 5 — Newton à départ non admissible (§10.3)

**Le problème.** Trouver un $x^{(0)}$ avec $Ax^{(0)}=b$ demande de résoudre un système linéaire — faisable, mais parfois coûteux, et impossible si l'on veut réutiliser un point venu d'ailleurs.

**La solution.** On refait le raisonnement du concept 4 **sans supposer $Ax=b$** :

$$\begin{pmatrix}\nabla^2f(x) & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}\Delta x\\ w\end{pmatrix} = -\begin{pmatrix}\nabla f(x)\\ Ax-b\end{pmatrix} \tag{10.19}$$

**La seule différence** avec (10.11) est le second bloc du membre de droite : il contient le **résidu** $Ax-b$ des contraintes d'égalité. Quand $x$ est admissible, ce résidu s'annule et l'on retrouve le pas de Newton ordinaire.

**Interprétation primale-duale.** On peut lire (10.19) comme une méthode qui met à jour **à la fois** la variable primale $x$ et la variable duale $\nu$, en cherchant à annuler le **résidu total** des conditions d'optimalité

$$r(x,\nu) = \big(\underbrace{\nabla f(x)+A^T\nu}_{\text{résidu dual}},\ \underbrace{Ax-b}_{\text{résidu primal}}\big)$$

Le pas est le pas de **Newton pour le système non linéaire $r(x,\nu)=0$**.

⚠️ **La recherche linéaire change de critère.** On ne peut plus exiger la décroissance de $f$ : les itérés ne sont pas admissibles, et $f$ n'y a pas le sens attendu. On fait décroître la **norme du résidu** $\|r(x,\nu)\|_2$. Une fois l'admissibilité atteinte (le résidu primal devient nul), elle le **reste** — et la méthode redevient la méthode de descente admissible du concept 4.

### Comment résoudre l'exercice type (protocole)

1. **Vérifier les hypothèses** : $f$ convexe $C^2$, $\mathbf{rank}\,A=p<n$.
2. **Écrire les conditions KKT** $Ax=b$ et $\nabla f(x)+A^T\nu=0$.
3. **Si $f$ est quadratique** : assembler le système KKT (10.4) et le résoudre — c'est fini, pas d'itération.
4. **Sinon, choisir un point de départ** : admissible ($\to$ algorithme 10.1) ou non ($\to$ Newton à départ non admissible).
5. **À chaque itération** : résoudre le système KKT (10.11) ou (10.19) — jamais inverser la matrice.
6. **Recherche linéaire** : rétrograde sur $f$ (cas admissible) ou sur $\|r\|_2$ (cas non admissible).
7. **Arrêt** : $\lambda^2/2\leq\varepsilon$, en vérifiant aussi que le résidu primal est négligeable.
8. **Récupérer $\nu^\star$** : c'est la variable duale $w$ de la dernière résolution KKT — utile pour la sensibilité (fiche 38).

### Exercices progressifs

**Niveau 1** — Résolvez $\min\ \tfrac12\|x\|_2^2$ sous $Ax=b$ par le système KKT.

<details><summary>Correction</summary>

Ici $P=I$, $q=0$. Le système (10.4) s'écrit

$$\begin{pmatrix}I & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}x\\ \nu\end{pmatrix}=\begin{pmatrix}0\\ b\end{pmatrix}$$

La première ligne donne $x=-A^T\nu$ ; en reportant dans la seconde, $-AA^T\nu = b$, soit $\nu = -(AA^T)^{-1}b$ (inversible car $\mathbf{rank}\,A=p$). Donc

$$x^\star = A^T(AA^T)^{-1}b$$

C'est la **solution de norme minimale** de $Ax=b$, c'est-à-dire $A^\dagger b$ avec le pseudo-inverse. On la retrouve par une simple résolution de système KKT.

</details>

**Niveau 2** — Pourquoi le pas de Newton contraint conserve-t-il l'admissibilité ?

<details><summary>Correction</summary>

La deuxième ligne du système (10.11) impose $A\Delta x_{\text{nt}} = 0$ : le pas appartient au **noyau de $A$**. Donc pour tout $t$,

$$A(x+t\Delta x_{\text{nt}}) = Ax + t\cdot0 = Ax = b$$

L'admissibilité est préservée **quel que soit le pas** — c'est ce qui autorise la recherche linéaire sur $f$ seule, et fait de l'algorithme 10.1 une méthode de descente **admissible**.

</details>

**Niveau 3** — La matrice KKT peut-elle être définie positive ? Quelle factorisation utiliser ?

<details><summary>Correction</summary>

**Non, jamais.** Pour tout vecteur de la forme $(0,w)$ avec $w\neq0$ :

$$\begin{pmatrix}0\\ w\end{pmatrix}^T\begin{pmatrix}P & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}0\\ w\end{pmatrix} = w^T\cdot0\cdot w = 0$$

La forme quadratique s'annule sur un sous-espace non trivial : la matrice est au mieux **semi**-définie, et en réalité **indéfinie** (elle a $n$ valeurs propres positives et $p$ négatives quand elle est inversible).

**Conséquence pratique :** Cholesky est **inapplicable**. On utilise une factorisation $LDL^T$ avec pivotage symétrique, ou l'on élimine le bloc $P$ pour se ramener au **complément de Schur** $-AP^{-1}A^T$, définie négative quand $P\succ0$ — et là, Cholesky redevient utilisable.

</details>

**Niveau 4 — type examen** — Comparez, sur $\min f(x)$ s.c. $Ax=b$ avec $A$ **creuse**, l'approche par élimination et l'approche Newton directe.

<details><summary>Correction</summary>

**Élimination.** On construit $F$ dont les colonnes engendrent $\mathbf{nullspace}(A)$, puis on minimise $\tilde f(z)=f(Fz+\hat x)$ sur $\mathbb{R}^{n-p}$. Chaque itération demande la hessienne réduite

$$\nabla^2\tilde f(z) = F^T\nabla^2f(Fz+\hat x)F$$

Le problème est **plus petit** ($n-p$ variables au lieu de $n+p$). Mais : le noyau d'une matrice creuse est en général **dense**, donc $F$ est pleine, donc $F^T\nabla^2fF$ est **pleine** même si $\nabla^2f$ est creuse. Coût par itération : $O((n-p)^3)$, sans structure exploitable.

**Newton direct.** On résout à chaque itération le système KKT (10.11), de taille $(n+p)$ — **plus grand**, mais dont la matrice

$$\begin{pmatrix}\nabla^2f(x) & A^T\\ A & 0\end{pmatrix}$$

hérite de la **parcimonie** de $\nabla^2f$ **et** de celle de $A$. Un solveur creux le résout en un temps très inférieur à $O((n+p)^3)$.

**Verdict.** Mathématiquement les deux approches produisent **exactement les mêmes itérés** (§10.2.3) ; numériquement, Newton direct gagne dès que le problème est creux — ce qui est le cas dans presque toutes les applications de grande taille. C'est l'argument que Boyd met en avant, et c'est aussi la raison pour laquelle les méthodes de points intérieurs (fiche 41) sont bâties sur Newton contraint et non sur l'élimination.

</details>

## 🔴 Common mistakes

1. **Croire la matrice KKT définie positive** — elle est **indéfinie** ; Cholesky ne s'applique pas directement.
2. **Partir d'un point non admissible avec l'algorithme 10.1** — il exige $Ax^{(0)}=b$ ; sinon il faut la variante du §10.3.
3. **Faire une recherche linéaire sur $f$ en départ non admissible** — le bon critère est la norme du **résidu**.
4. **Éliminer systématiquement les égalités** — cela détruit la parcimonie et coûte plus cher sur les grands problèmes.
5. **Oublier l'hypothèse $\mathbf{rank}\,A=p<n$** — sans indépendance des contraintes, la matrice KKT est singulière et $\nu^\star$ n'est plus unique.
6. **Oublier de récupérer $\nu^\star$** — la variable duale $w$ du dernier système KKT donne gratuitement les sensibilités.
7. **Inverser la matrice KKT** — on la **factorise** et l'on résout ; l'inversion est plus chère et moins stable.

## 📌 Ultimate Review

1. Problème : $\min f(x)$ s.c. $Ax=b$, $f$ convexe $C^2$, $\mathbf{rank}\,A=p<n$.
2. **Conditions KKT** (10.2) : $Ax^\star=b$ (linéaire) et $\nabla f(x^\star)+A^T\nu^\star=0$ (non linéaire) — $n+p$ équations, $n+p$ inconnues.
3. **Cas quadratique** : système KKT $\begin{pmatrix}P & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}x\\ \nu\end{pmatrix}=\begin{pmatrix}-q\\ b\end{pmatrix}$ — résolution **analytique**.
4. Matrice KKT **symétrique indéfinie** ; système non soluble $\Rightarrow$ problème non borné ou non admissible.
5. Trois approches : **élimination**, **dual**, **Newton direct** — cette dernière préserve la **parcimonie**.
6. **Pas de Newton** (10.11) : même système KKT avec $\nabla^2f(x)$ et second membre $(-\nabla f(x),0)$ ; $A\Delta x_{\text{nt}}=0$ donc l'admissibilité est **préservée**.
7. **Décrément** $\lambda(x)=(\Delta x_{\text{nt}}^T\nabla^2f(x)\Delta x_{\text{nt}})^{1/2}$ ; arrêt $\lambda^2/2\leq\varepsilon$.
8. Newton contraint et Newton après élimination donnent **les mêmes itérés**.
9. **Départ non admissible** (10.19) : le second membre devient $-(\nabla f(x),\ Ax-b)$ ; méthode **primale-duale**, recherche linéaire sur $\|r\|_2$ ; une fois admissible, on le reste.

**Formulas to know**

$$\begin{pmatrix}P & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}x^\star\\ \nu^\star\end{pmatrix}=\begin{pmatrix}-q\\ b\end{pmatrix} \qquad \begin{pmatrix}\nabla^2f & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}\Delta x_{\text{nt}}\\ w\end{pmatrix}=\begin{pmatrix}-\nabla f\\ 0\end{pmatrix}$$

$$\lambda(x)^2=\Delta x_{\text{nt}}^T\nabla^2f(x)\Delta x_{\text{nt}} \qquad r(x,\nu)=\big(\nabla f(x)+A^T\nu,\ Ax-b\big)$$

**Methods to know** : le protocole en 8 étapes ; la lecture du système KKT ; l'argument de parcimonie contre l'élimination.

## 🧠 Active Recall

**Basic** — Écrivez les conditions d'optimalité de $\min f(x)$ s.c. $Ax=b$ et dites lequel des deux blocs est non linéaire.

<details><summary>Réponse</summary>

$Ax^\star=b$ (**faisabilité primale**, linéaire) et $\nabla f(x^\star)+A^T\nu^\star=0$ (**faisabilité duale**, non linéaire en général). C'est ce second bloc qui impose une méthode itérative — on le linéarise, et l'on obtient le pas de Newton.

</details>

**Understanding** — Pourquoi la matrice KKT ne peut-elle pas être définie positive ?

<details><summary>Réponse</summary>

Son bloc en bas à droite est **nul**. Pour tout vecteur $(0,w)$ avec $w\neq0$, la forme quadratique vaut $0$ : la matrice n'est pas définie. Quand elle est inversible, elle a en fait $n$ valeurs propres positives et $p$ négatives — elle est **indéfinie**, d'où l'usage de factorisations $LDL^T$ plutôt que Cholesky.

</details>

**Application** — Que devient le système du pas de Newton si le point courant n'est pas admissible ?

<details><summary>Réponse</summary>

Le second membre gagne le **résidu primal** :

$$\begin{pmatrix}\nabla^2f(x) & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}\Delta x\\ w\end{pmatrix} = -\begin{pmatrix}\nabla f(x)\\ Ax-b\end{pmatrix}$$

La recherche linéaire porte alors sur la norme du résidu complet, et non sur $f$. Dès que $Ax=b$ est atteint, le résidu primal reste nul et l'on retrouve la méthode admissible.

</details>

**Comparison** — Élimination et Newton direct : quelle différence mathématique, quelle différence numérique ?

<details><summary>Réponse</summary>

**Mathématiquement, aucune** : les deux produisent exactement les mêmes itérés (§10.2.3). **Numériquement**, l'élimination réduit la taille ($n-p$ au lieu de $n+p$) mais **détruit la parcimonie** — le noyau d'une matrice creuse est dense. Newton direct travaille sur un système plus grand mais qui conserve la structure creuse, et gagne dès que le problème est de grande taille.

</details>

**Exam-style** — Expliquez la place de ce chapitre dans la hiérarchie algorithmique du livre.

<details><summary>Réponse</summary>

Trois niveaux emboîtés. **(1)** Les problèmes quadratiques à contraintes d'égalité linéaires sont les plus simples : leurs conditions KKT forment un **système linéaire**, résolu analytiquement. **(2)** La **méthode de Newton** résout un problème à égalités linéaires et objectif $C^2$ en le réduisant à une **suite** de problèmes du niveau 1. **(3)** Les **méthodes de points intérieurs** (chapitre 11) résolvent un problème avec inégalités **et** égalités en le réduisant à une **suite** de problèmes du niveau 2.

Chaque niveau se ramène à une suite de problèmes du niveau inférieur : c'est l'architecture complète de l'optimisation convexe numérique.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le problème du chapitre ? | $\min f(x)$ s.c. $Ax=b$, $f$ convexe $C^2$, $\mathbf{rank}\,A=p<n$ |
| Conditions d'optimalité ? | $Ax^\star=b$ et $\nabla f(x^\star)+A^T\nu^\star=0$ |
| Système KKT quadratique ? | $\begin{pmatrix}P & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}x\\ \nu\end{pmatrix}=\begin{pmatrix}-q\\ b\end{pmatrix}$ |
| Nature de la matrice KKT ? | Symétrique **indéfinie** — pas de Cholesky direct |
| Si le système KKT n'est pas soluble ? | Problème non borné ou non admissible |
| Système du pas de Newton contraint ? | Même matrice avec $\nabla^2f$, second membre $(-\nabla f,\ 0)$ |
| Pourquoi l'admissibilité est-elle préservée ? | Parce que $A\Delta x_{\text{nt}}=0$ |
| Décrément de Newton contraint ? | $\lambda(x)=(\Delta x_{\text{nt}}^T\nabla^2f(x)\Delta x_{\text{nt}})^{1/2}$ |
| Élimination et Newton direct donnent-ils la même chose ? | Les mêmes **itérés** ; ils diffèrent numériquement |
| Pourquoi préférer Newton direct ? | Il préserve la **parcimonie** ; l'élimination la détruit |
| Départ non admissible : que change-t-on ? | Le second membre devient $-(\nabla f,\ Ax-b)$ |
| Recherche linéaire en départ non admissible ? | Sur la norme du **résidu**, pas sur $f$ |
| Où récupère-t-on $\nu^\star$ ? | C'est la variable duale $w$ du dernier système KKT |
