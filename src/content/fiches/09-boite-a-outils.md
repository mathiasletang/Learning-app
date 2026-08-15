# Fiche 9 — Boîte à outils : matrices symétriques, Taylor, quadratiques

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Garrigos, *Optimisation L3* (Univ. Paris-Cité), chapitre I, p. 9–28 |
| **Difficulté** | 🟡 Intermédiaire (rappels instrumentaux) |
| **Temps d'étude estimé** | 1 h |
| **Prérequis** | Algèbre linéaire L2, fiches 3–4 (gradient, hessienne) |
| **Concepts clés** | Valeurs propres, (semi-)définie positive, inégalité de Rayleigh, Taylor-Lagrange, fonctions quadratiques |
| **Poids à l'examen** | Ces outils ne font pas l'objet de questions isolées : ils sont *les briques de chaque preuve et de chaque exercice* des chapitres II à V. |

## 🎯 Vue d'ensemble

Le cours de Garrigos commence par affûter les outils : tout ce qui suit — existence, convexité, algorithmes, KKT — s'exprime en langage matriciel. Trois familles d'outils à maîtriser : le **spectre des matrices symétriques** (et la définie-positivité), les **formules de Taylor** version $\mathbb{R}^N$, et les **fonctions quadratiques**, le laboratoire de tout le cours.

```
Matrices symétriques → λmin, λmax → Rayleigh → (semi-)définie positive
Différentielle → gradient, jacobienne, hessienne → Taylor (Young / Lagrange)
Quadratiques  f = ⟨Ax,x⟩+⟨b,x⟩+c → ∇f, ∇²f explicites → cas d'école permanent
```

## 🔴 Concept 1 — Spectre et définie-positivité

**Rappels structurants du cours** : une matrice symétrique réelle a un spectre réel et se diagonalise en base orthonormée ; sa norme d'opérateur vaut son rayon spectral (prop. I.36) : $\lVert A \rVert = \rho(A) = \max_i |\lambda_i|$ — **faux pour une matrice quelconque** (remarque I.37 du cours).

**Inégalité de Rayleigh (prop. I.39)** — l'inégalité la plus utilisée du cours :
> Pour $A$ symétrique : $\quad \lambda_{\min}(A)\,\lVert x\rVert^2 \;\leq\; \langle Ax, x\rangle \;\leq\; \lambda_{\max}(A)\,\lVert x\rVert^2.$

Le cours insiste : la borne *inférieure* est « la seule » inégalité classique pour minorer une quantité matricielle — elle porte les preuves des CSO du 2ᵉ ordre et de Newton.

**Caractérisation (prop. I.45).**
> $A$ symétrique : semi-définie positive $\iff \lambda_{\min}(A) \geq 0$ ; définie positive $\iff \lambda_{\min}(A) > 0 \iff$ SDP **et** inversible.

**En pratique (2×2)** : $A \succeq 0 \iff$ diagonale $\geq 0$ et $\det A \geq 0$ ; $A \succ 0 \iff \operatorname{tr}$-diagonale $> 0$ et $\det A > 0$ — le pont avec le critère de la fiche 4.

**À retenir** — $\lambda_{\min}$ est *le* nombre à connaître d'une matrice symétrique : il décide de la positivité (I.45), minore les formes quadratiques (I.39), et mesurera la forte convexité (fiche 11).

## 🟠 Concept 2 — Différentielle, gradient, hessienne (version compacte)

- **Jacobienne** (prop. I.61) : matrice des dérivées partielles d'une application $F : \mathbb{R}^N \to \mathbb{R}^M$.
- **Dérivée directionnelle** (prop. I.63) : si $f$ est différentiable, $\frac{\partial f}{\partial d}(x) = \langle \nabla f(x), d\rangle$.
- **Hessienne** (prop. I.78) : symétrique ; matrice des dérivées secondes ; **jacobienne du gradient** $\nabla^2 f = J(\nabla f)$ ; et Taylor-Young à l'ordre 2 :
$$f(x+h) = f(x) + \langle \nabla f(x), h\rangle + \tfrac12 \langle \nabla^2 f(x)\,h, h\rangle + o(\lVert h\rVert^2).$$

**Taylor-Lagrange (versions exactes)** — ordre 1 (prop. I.74) : il existe $z \in \,]a, x[$ tel que $f(x) = f(a) + \langle \nabla f(z), x - a\rangle$ ; ordre 2 (prop. I.87) : reste exact avec la hessienne en un point intermédiaire. **Différence d'usage** : Young ($o(\cdot)$) sert aux limites et aux conditions d'optimalité ; Lagrange (point intermédiaire) sert aux **majorations globales** (convergence des algorithmes, fiche 12).

## 🔴 Concept 3 — Fonctions quadratiques : le cas d'école

**Proposition I.93.**
> Pour $f(x) = \langle Ax, x\rangle + \langle b, x\rangle + c$ : $\ \nabla f(x) = (A + A^\top)x + b$ et $\nabla^2 f(x) = A + A^\top$.
> Si $A$ est **symétrique** : $\nabla f(x) = 2Ax + b$, $\nabla^2 f(x) = 2A$.

Avec la normalisation $f(x) = \tfrac12\langle Ax,x\rangle + \langle b,x\rangle + c$ ($A$ symétrique) : $\nabla f = Ax + b$, $\nabla^2 f = A$ — la forme la plus commode, utilisée au chapitre III (prop. III.27).

**Pourquoi ce cas est central** : hessienne **constante** ⟹ tout se lit sur $A$ ; les moindres carrés $\lVert Ax - y\rVert^2$ sont quadratiques (exercice I.94) ; et chaque théorème du cours se teste d'abord sur les quadratiques.

### Comment dériver une expression quadratique sans se tromper ?

1. Mettre sous la forme $\tfrac12\langle Ax,x\rangle + \langle b,x\rangle + c$ avec $A$ **symétrique** (symétriser par $\frac{A+A^\top}{2}$, prop. I.47, au besoin).
2. Lire directement $\nabla f = Ax + b$, $\nabla^2 f = A$.
3. Contrôle : les dérivées partielles calculées à la main doivent coïncider.

## ⚠️ Common mistakes

1. **« Norme d'opérateur = rayon spectral » pour une matrice non symétrique** — faux (remarque I.37) ; en général c'est $\sqrt{\lambda_{\max}(A^\top A)}$.
2. **Oublier de symétriser** avant de lire $\nabla f = 2Ax + b$ — la formule exige $A$ symétrique.
3. **Confondre définie positive et semi-définie positive** — l'inversibilité fait la différence (I.45.ii).
4. **Utiliser Taylor-Young pour une borne globale** — le $o(\lVert h \rVert^2)$ n'est valable qu'au voisinage ; pour une inégalité valable partout, c'est Taylor-Lagrange.
5. **Tester la positivité sur quelques vecteurs** — il faut un argument spectral ou un critère (diagonale/déterminant), pas trois essais.

## 📌 Ultimate Review

1. Symétrique ⟹ spectre réel, diagonalisable en base orthonormée, $\lVert A\rVert = \max|\lambda_i|$.
2. Rayleigh : $\lambda_{\min}\lVert x\rVert^2 \leq \langle Ax,x\rangle \leq \lambda_{\max}\lVert x\rVert^2$.
3. SDP $\iff \lambda_{\min} \geq 0$ ; définie positive $\iff \lambda_{\min} > 0$.
4. $\nabla^2 f = J(\nabla f)$, symétrique ; Taylor-Young ordre 2 avec $\tfrac12\langle \nabla^2 f\, h, h\rangle$.
5. Quadratique $\tfrac12\langle Ax,x\rangle + \langle b,x\rangle + c$ ($A$ sym.) : $\nabla f = Ax + b$, $\nabla^2 f = A$.
6. Moindres carrés = fonction quadratique.

## 🧠 Active Recall

**Basic** — Énoncez l'inégalité de Rayleigh et ses hypothèses.
<details><summary>Réponse</summary>

Pour $A$ symétrique et tout $x$ : $\lambda_{\min}(A)\lVert x\rVert^2 \leq \langle Ax,x\rangle \leq \lambda_{\max}(A)\lVert x\rVert^2$ (prop. I.39).
</details>

**Understanding** — Pourquoi $\nabla^2 f = J(\nabla f)$ est-elle une formule si utile ?
<details><summary>Réponse</summary>

Elle ramène le calcul de la hessienne à un calcul de jacobienne d'un champ de vecteurs — et elle fait le lien conceptuel : la hessienne mesure comment le gradient varie, ce qui est exactement ce que les algorithmes de descente exploitent (fiche 12).
</details>

**Application** — $f(x,y) = 3x^2 + 2xy + y^2 - 4x$. Écrivez $A$, $b$, puis $\nabla f$ et $\nabla^2 f$.
<details><summary>Réponse</summary>

$f = \tfrac12\langle Ax,x\rangle + \langle b,x\rangle$ avec $A = \begin{pmatrix} 6 & 2 \\ 2 & 2\end{pmatrix}$, $b = (-4, 0)^\top$. $\nabla f = Ax + b = (6x + 2y - 4,\; 2x + 2y)^\top$, $\nabla^2 f = A$. ($\det A = 8 > 0$, diagonale $> 0$ : définie positive.)
</details>

**Exam-style** — $A$ symétrique avec $\lambda_{\min}(A) = 2$. Minorez $f(x) = \tfrac12\langle Ax, x\rangle - \langle b, x\rangle$ et déduisez que $f$ est coercive.
<details><summary>Réponse</summary>

Rayleigh + Cauchy-Schwarz : $f(x) \geq \lVert x\rVert^2 - \lVert b\rVert \lVert x\rVert \to +\infty$ quand $\lVert x \rVert \to \infty$ : coercive (et fortement convexe — fiche 11).
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| $\lVert A \rVert$ pour $A$ symétrique ? | $\rho(A) = \max_i \lvert\lambda_i\rvert$ (faux si non symétrique) |
| Rayleigh ? | $\lambda_{\min}\lVert x\rVert^2 \leq \langle Ax,x\rangle \leq \lambda_{\max}\lVert x\rVert^2$ |
| $A \succ 0 \iff$ ? | $\lambda_{\min}(A) > 0 \iff$ SDP et inversible |
| $\nabla^2 f$ en fonction de $\nabla f$ ? | $J(\nabla f)$ — la jacobienne du gradient |
| Taylor-Young ordre 2 dans $\mathbb{R}^N$ ? | $f + \langle\nabla f, h\rangle + \tfrac12\langle\nabla^2 f\,h,h\rangle + o(\lVert h\rVert^2)$ |
| Young vs Lagrange : quel usage ? | Young : local (optimalité) ; Lagrange : bornes globales (algorithmes) |
| $\nabla f$ de $\tfrac12\langle Ax,x\rangle + \langle b,x\rangle$ ($A$ sym.) ? | $Ax + b$ ; hessienne $A$ |
| Symétriser $A$ quelconque ? | $\frac{A + A^\top}{2}$ — même forme quadratique (prop. I.47) |
