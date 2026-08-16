# Fiche 12 — Algorithmes : descente de gradient et Newton

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Garrigos, chapitre IV, p. 59–82 |
| **Difficulté** | 🔴 Must know |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Fiches 9–11 (Rayleigh, coercivité, forte convexité) |
| **Concepts clés** | Directions de descente, méthode du gradient, Newton, gradient Lipschitz, conditionnement, vitesses de convergence |
| **Poids à l'examen** | Exercices types : « montrer que $d$ est une direction de descente », « écrire l'itération du gradient pour $f$ », « discuter la convergence selon le pas ». Aussi la base des TP. |

## 🎯 Vue d'ensemble

Annuler $\nabla f$ à la main est rarement possible : on **itère**. Le chapitre définit les méthodes itératives, identifie ce qui fait *descendre* (les directions de descente), en déduit les deux algorithmes canoniques — **gradient** (ordre 1) et **Newton** (ordre 2) — puis quantifie leur vitesse via la régularité de $f$ (gradient lipschitzien, forte convexité, conditionnement).

```
xk+1 = xk + ρk dk        (pas ρk > 0, direction dk)
  dk = −∇f(xk)           → MÉTHODE DU GRADIENT  (plus grande pente)
  dk = −∇²f(xk)⁻¹∇f(xk)  → MÉTHODE DE NEWTON    (minimise le modèle d'ordre 2)
Vitesse : souslinéaire < linéaire (géométrique) < superlinéaire (quadratique)
Régularité : ∇f L-Lipschitz (borne le pas) · µ-convexité (garantit le taux) · cond = L/µ
```

## 🔴 Concept 1 — Méthodes itératives et directions de descente

**Définition (IV.1).** Un **algorithme itératif** du premier ordre génère $x_{k+1} = \mathcal{A}(x_k)$ ; toute méthode du premier ordre s'écrit
$$x_{k+1} = x_k + \rho_k d_k, \qquad \rho_k > 0 \text{ (pas)}, \quad d_k \in \mathbb{R}^N \text{ (direction)}.$$

**Définition (IV.9).**
> $d$ est une **direction de descente** en $x$ si $\dfrac{\partial f}{\partial d}(x) = \langle \nabla f(x), d\rangle < 0$ — un angle strictement obtus avec le gradient.

**Proposition IV.11.** Il existe une direction de descente en $x$ **ssi $x$ n'est pas un point critique** (prendre $d = -\nabla f(x)$ : $\langle\nabla f, d\rangle = -\lVert\nabla f\rVert^2 < 0$).

**Décroissance garantie (prop. IV.12, « lemme d'Armijo »).** Le long d'une direction de descente, $f(x + td) < f(x)$ pour tout pas $t$ **assez petit**. Trois leçons du cours : la descente n'est garantie que localement ; le pas compte autant que la direction ; les directions de descente « pointent vers l'intérieur » des sous-niveaux.

## 🔴 Concept 2 — La méthode du gradient

**Définition (IV.15).**
> $$x_{k+1} = x_k - \rho_k \nabla f(x_k), \qquad \rho_k > 0.$$

**Pourquoi cette direction ? Deux justifications du cours** :
- **Plus grande pente (prop. IV.16)** : $-\nabla f(x)/\lVert\nabla f(x)\rVert$ minimise la dérivée directionnelle parmi les directions unitaires (Cauchy-Schwarz).
- **Modèle d'ordre 1 (prop. IV.17 / exercice IV.22)** : un pas de gradient minimise l'approximation de Taylor d'ordre 1 sur une boule — ou, de façon équivalente, minimise le modèle *régularisé*
$$x_{k+1} = \operatorname{argmin}_{x'} \; f(x_k) + \langle\nabla f(x_k), x' - x_k\rangle + \frac{1}{2\rho}\lVert x' - x_k\rVert^2.$$

### Comment dérouler la méthode sur un exercice ?

1. Calculer $\nabla f$, écrire l'itération explicite $x_{k+1} = x_k - \rho\nabla f(x_k)$.
2. Cas quadratique $f = \tfrac12\langle Ax,x\rangle + \langle b,x\rangle$ : l'itération devient **linéaire**, $x_{k+1} = (I - \rho A)x_k - \rho b$ — la convergence se lit sur les valeurs propres de $I - \rho A$ (il faut $|1 - \rho\lambda_i| < 1$ pour tout $i$, d'où la contrainte de pas $0 < \rho < 2/\lambda_{\max}$).
3. Discuter le pas : trop grand ⟹ divergence/oscillation ; trop petit ⟹ lenteur.

**Exemple entièrement déroulé.** $f(x,y) = \tfrac12(x^2 + 10y^2)$, départ $(10, 1)$, pas $\rho = 0{,}1$ :
- $\nabla f = (x, 10y)$ ⟹ itération $x_{k+1} = 0{,}9\,x_k$, $y_{k+1} = 0$ (car $1 - 0{,}1 \cdot 10 = 0$).
- Trajectoire : $(10, 1) \to (9, 0) \to (8{,}1, 0) \to \cdots$ — $y$ tué en un pas (le pas est *pile* $1/\lambda_2$), $x$ décroît géométriquement en $0{,}9^k$.
- Avec $\rho = 0{,}19$ : $y_{k+1} = -0{,}9\,y_k$ **oscille** en s'amortissant ($1 - 1{,}9 = -0{,}9$) ; avec $\rho = 0{,}21$ : $|1 - 2{,}1| = 1{,}1 > 1$, $y_k$ **diverge**. Trois régimes du même algorithme, uniquement par le pas.
- **Interprétation** : chaque valeur propre a son pas idéal $1/\lambda_i$ ; un pas fixe doit les servir toutes — d'où le compromis dicté par $\lambda_{\max}$, et le zigzag quand $\operatorname{cond}$ est grand.

**Exercice 🟡** — Écrivez deux itérations de gradient pour $f(x,y) = x^2 + y^2 + xy$, départ $(1, 1)$, pas $\rho = \tfrac14$.
<details><summary>Correction</summary>

$\nabla f = (2x + y,\, 2y + x)$. $x_1 = (1,1) - \tfrac14(3,3) = (\tfrac14, \tfrac14)$ ; $\nabla f(x_1) = (\tfrac34, \tfrac34)$, $x_2 = (\tfrac14,\tfrac14) - \tfrac14(\tfrac34,\tfrac34) = (\tfrac{1}{16}, \tfrac{1}{16})$. Sur la diagonale, chaque pas divise par 4 : convergence géométrique de taux $\tfrac14$ vers le minimiseur $(0,0)$ ($A = \begin{pmatrix}2&1\\1&2\end{pmatrix} \succ 0$, direction $(1,1)$ propre pour $\lambda = 3$ : $1 - \tfrac34 = \tfrac14$).
</details>

## 🟠 Concept 3 — La méthode de Newton

**Proposition IV.18.** Si $\nabla^2 f(x) \succ 0$, minimiser le modèle de Taylor **d'ordre 2** en $x$ donne le point
$$x^+ = x - \nabla^2 f(x)^{-1}\,\nabla f(x),$$
et $-\nabla^2 f(x)^{-1}\nabla f(x)$ est une direction de descente (preuve par Rayleigh).

**Définition (IV.19) — méthode de Newton** : $x_{k+1} = x_k - \nabla^2 f(x_k)^{-1}\nabla f(x_k)$ (pas $\rho = 1$).

**Le bilan du cours (remarque IV.20)** :
- **Coût** : calculer la hessienne coûte cher, l'inverser encore plus.
- **Vitesse** : quand elle fonctionne, convergence **superlinéaire** — très rapide.
- **Fragilité** : très sensible au point initial $x_0$.
- Les **quasi-Newton** remplacent $\nabla^2 f^{-1}$ par une approximation peu coûteuse (ex. IV.21 : diagonale de la hessienne).

**Gradient vs Newton en une phrase** : le gradient minimise le modèle d'ordre 1 (robuste, pas cher, linéaire) ; Newton minimise le modèle d'ordre 2 (cher, fragile, superlinéaire).

**Exemple révélateur — Newton sur une quadratique.** $f = \tfrac12\langle Ax,x\rangle + \langle b,x\rangle$ avec $A \succ 0$ : $\nabla f = Ax + b$, $\nabla^2 f = A$, donc
$$x_1 = x_0 - A^{-1}(Ax_0 + b) = -A^{-1}b = x^* :$$
Newton converge en **une itération**, depuis n'importe quel $x_0$ — le modèle d'ordre 2 d'une quadratique, c'est elle-même. C'est le test de santé mentale de tout exercice de Newton.

**Exercice 🟠** — Une itération de Newton pour $f(x,y) = x^4 + y^2$ depuis $(1, 1)$. Que remarque-t-on ?
<details><summary>Correction</summary>

$\nabla f = (4x^3, 2y)$, $\nabla^2 f = \operatorname{diag}(12x^2, 2) \succ 0$ hors de $\{x=0\}$. $x_1 = (1,1) - \operatorname{diag}(\tfrac{1}{12}, \tfrac12)(4, 2) = (1 - \tfrac13,\, 1 - 1) = (\tfrac23, 0)$. La composante quadratique ($y$) est résolue **exactement en un pas** ; la composante quartique ($x$) suit $x_{k+1} = \tfrac23 x_k$ — linéaire seulement. **Interprétation** : la vitesse superlinéaire de Newton est un phénomène *local* (près du minimiseur, où le modèle d'ordre 2 devient exact) ; loin de lui, ou quand la courbure s'annule ($\nabla^2 f(0,0)$ singulière ici), la magie s'éteint.
</details>

## 🟠 Concept 4 — Régularité et conditionnement

**Définition (IV.23).** $F$ est **$L$-lipschitzienne** si $\lVert F(x) - F(y)\rVert \leq L\lVert x - y\rVert$ ; la meilleure constante est $\operatorname{Lip}(F)$. Pour $F$ différentiable, elle se calcule via la jacobienne (prop. IV.25) : $\operatorname{Lip}(F) = \sup_x \lVert J_F(x)\rVert$. Pour $\nabla f$ : $L = \sup_x \lVert \nabla^2 f(x)\rVert = \sup_x \lambda_{\max}$ (symétrie + prop. I.36).

**Définition (IV.31) — conditionnement.** Pour $f \in \Gamma_\mu \cap C^{1,1}_L$ :
$$\operatorname{cond}(f) = \frac{L}{\mu} \;\geq\; 1.$$

**Intuition géométrique (du cours, fig. IV.3).** Les sous-niveaux d'une quadratique sont des ellipses d'excentricité $\operatorname{cond} = \lambda_{\max}/\lambda_{\min}$ : conditionnement proche de 1 = cercles, le gradient pointe presque vers la solution, convergence rapide ; conditionnement grand = ellipses très allongées, le gradient zigzague. **Le conditionnement gouverne le taux de convergence linéaire de la méthode du gradient** — la constante $\theta$ se dégrade quand $L/\mu$ explose.

**Vitesses (déf. IV.5)** : $r_{k+1} \leq \theta r_k$ ($\theta < 1$) : **linéaire** (= géométrique, $r_k \leq \theta^k r_0$) ; $r_{k+1} \leq \theta r_k^\beta$ ($\beta > 1$) : **superlinéaire** ($\beta = 2$ : quadratique) ; $r_k \leq C/k^\alpha$ : **souslinéaire**.

## ⚠️ Common mistakes

1. **Signe de la direction** — on descend selon $-\nabla f$ ; écrire $x_{k+1} = x_k + \rho\nabla f(x_k)$ fait *monter*.
2. **Croire que direction de descente ⟹ décroissance pour tout pas** — la décroissance n'est garantie que pour un pas assez petit (Armijo).
3. **Newton sans $\nabla^2 f \succ 0$** — la direction n'est plus nécessairement de descente ; l'hypothèse fait partie de la définition.
4. **Confondre convergence linéaire et « lente »** — linéaire = géométrique = exponentielle en $k$ ; c'est la *sous*linéaire qui est lente.
5. **Oublier que le taux dépend du conditionnement** — un gradient peut être correct sur une fonction bien conditionnée et interminable sur une vallée étroite.
6. **Pas fixe trop grand sur une quadratique** — divergence dès que $\rho \geq 2/\lambda_{\max}$ : toujours vérifier la contrainte de pas.

## 📌 Ultimate Review

1. Méthode du 1ᵉʳ ordre : $x_{k+1} = x_k + \rho_k d_k$ ; descente ssi $\langle\nabla f(x_k), d_k\rangle < 0$.
2. Directions de descente existent ssi le point n'est pas critique ; $-\nabla f$ en est toujours une (la plus pentue).
3. Gradient : $x_{k+1} = x_k - \rho_k\nabla f(x_k)$ = minimisation du modèle d'ordre 1 régularisé.
4. Newton : $x_{k+1} = x_k - \nabla^2 f(x_k)^{-1}\nabla f(x_k)$ = minimisation du modèle d'ordre 2 ; superlinéaire mais cher et fragile.
5. $\operatorname{Lip}(\nabla f) = \sup \lambda_{\max}(\nabla^2 f)$ ; $\operatorname{cond}(f) = L/\mu$ ; ellipses allongées = zigzag.
6. Quadratique + pas fixe : converge ssi $0 < \rho < 2/\lambda_{\max}$.
7. Vitesses : souslinéaire < linéaire (géométrique) < superlinéaire (quadratique).

**Formulas to know**
$$x_{k+1} = x_k - \rho_k\nabla f(x_k) \qquad x_{k+1} = x_k - \nabla^2 f(x_k)^{-1}\nabla f(x_k) \qquad \operatorname{cond}(f) = L/\mu$$

## 🧠 Active Recall

**Basic** — Définissez « direction de descente » et donnez-en toujours une valable hors point critique.
<details><summary>Réponse</summary>

$d$ telle que $\langle\nabla f(x), d\rangle < 0$. Hors point critique, $d = -\nabla f(x)$ convient : $\langle\nabla f, -\nabla f\rangle = -\lVert\nabla f\rVert^2 < 0$.
</details>

**Understanding** — En quel sens Newton « minimise un modèle » que le gradient ignore ?
<details><summary>Réponse</summary>

Les deux minimisent une approximation de Taylor de $f$ : le gradient, le modèle d'ordre 1 (+ pénalité $\frac{1}{2\rho}\lVert x'-x\rVert^2$ qui ignore la courbure) ; Newton, le vrai modèle d'ordre 2 avec la hessienne. Newton adapte donc son pas à la courbure dans chaque direction — d'où sa vitesse, et son coût.
</details>

**Application** — $f(x) = \tfrac12\langle Ax, x\rangle$ avec $A = \operatorname{diag}(1, 10)$. Écrivez l'itération du gradient à pas fixe $\rho$ et donnez les $\rho$ qui convergent.
<details><summary>Réponse</summary>

$x_{k+1} = (I - \rho A)x_k$, composantes $x^{(1)}_{k+1} = (1-\rho)x^{(1)}_k$ et $x^{(2)}_{k+1} = (1-10\rho)x^{(2)}_k$. Convergence ssi $|1-\rho| < 1$ et $|1-10\rho| < 1$, soit $0 < \rho < 1/5$ ($= 2/\lambda_{\max}$). Conditionnement $10$ : le pas est bridé par la direction raide, la direction plate avance lentement — le zigzag.
</details>

**Comparison** — Gradient vs Newton : trois critères.
<details><summary>Réponse</summary>

Coût par itération : gradient $O(N)$ dérivées / Newton hessienne + système linéaire. Vitesse : linéaire (dépend de $L/\mu$) / superlinéaire. Robustesse : gradient globalement raisonnable / Newton sensible à $x_0$ et exige $\nabla^2 f \succ 0$.
</details>

**Exam-style** — Montrez que $d = -D^{-1}\nabla f(x)$ est une direction de descente si $D$ est symétrique définie positive.
<details><summary>Réponse</summary>

$\langle\nabla f, d\rangle = -\langle\nabla f, D^{-1}\nabla f\rangle \leq -\lambda_{\min}(D^{-1})\lVert\nabla f\rVert^2 < 0$ par Rayleigh ($D^{-1} \succ 0$), pourvu que $\nabla f(x) \neq 0$. (Mécanisme de l'exercice IV.21 de quasi-Newton.)
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Direction de descente ? | $\langle\nabla f(x), d\rangle < 0$ |
| Itération du gradient ? | $x_{k+1} = x_k - \rho_k\nabla f(x_k)$ |
| Pourquoi $-\nabla f$ ? | Plus grande pente : minimise $\langle\nabla f, d\rangle$ sur $\lVert d\rVert = 1$ |
| Itération de Newton ? | $x_{k+1} = x_k - \nabla^2 f(x_k)^{-1}\nabla f(x_k)$, exige $\nabla^2 f \succ 0$ |
| Newton : atout / défauts ? | Superlinéaire / coût de la hessienne + sensibilité à $x_0$ |
| $\operatorname{Lip}(\nabla f)$ pour $f \in C^2$ ? | $\sup_x \lambda_{\max}(\nabla^2 f(x))$ |
| Conditionnement ? | $L/\mu \geq 1$ ; ellipses allongées ⟹ zigzag du gradient |
| Pas admissible (quadratique, pas fixe) ? | $0 < \rho < 2/\lambda_{\max}(A)$ |
| Convergence linéaire = ? | Géométrique : $r_k \leq \theta^k r_0$, $\theta < 1$ |
| La descente est-elle garantie pour tout pas ? | Non — seulement pour un pas assez petit (Armijo) |
