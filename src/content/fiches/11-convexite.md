# Fiche 11 — Optimisation convexe et forte convexité

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Garrigos, chapitre III, p. 43–58 |
| **Difficulté** | 🔴 Must know |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 4, 9, 10 (hessienne, Rayleigh, existence) |
| **Concepts clés** | Ensemble convexe, fonction convexe (3 caractérisations), min local = global, forte convexité, existence + unicité |
| **Poids à l'examen** | Le théorème « convexe ⟹ point critique = min global » est l'argument le plus rentable de toute copie d'optimisation. La forte convexité est le cœur des exercices d'algorithmes. |

## 🎯 Vue d'ensemble

La convexité est la propriété qui **globalise** : tout ce que les fiches 6 et 10 concluaient localement devient global. Le chapitre construit l'échelle complète :

```
CONVEXE          min local = min global · point critique = min global · argmin convexe
   ↑ caractérisations : sécantes ≥ graphe · plan tangent ≤ graphe · ∇²f ≽ 0
FORTEMENT CONVEXE (µ > 0)   =  convexe + µ/2‖·‖²  ·  λmin(∇²f) ≥ µ partout
   ⟹ coercive ⟹ EXISTENCE + UNICITÉ du minimiseur
Quadratiques :  convexe ⟺ A ≽ 0  ·  fortement convexe ⟺ A ≻ 0
```

## 🔴 Concept 1 — Ensembles et fonctions convexes

**Définitions (III.2, III.7).**
> $C$ est **convexe** si pour tous $x, y \in C$ le segment $[x,y] = \{(1-\alpha)x + \alpha y \mid \alpha \in [0,1]\}$ reste dans $C$.
> $f$ est **convexe sur $C$** (noté $f \in \Gamma_0(C)$) si $C$ est convexe et
> $$\forall \alpha \in [0,1],\ \forall x,y \in C : \quad f((1-\alpha)x + \alpha y) \;\leq\; (1-\alpha) f(x) + \alpha f(y).$$

**Intuition.** Ensemble convexe : sans creux (la boule oui, la *sphère* non — elle est creuse, exemple III.3). Fonction convexe : le graphe sous ses cordes ; l'**épigraphe** $\{(x,y) \mid f(x) \leq y\}$ est un ensemble convexe (prop. III.8) — le pont entre les deux notions.

**Stabilité (props. III.10–III.12)** : somme de convexes convexe ; composée $f \circ A$ avec $A$ linéaire convexe ; et $\operatorname{argmin}_C f$ est un ensemble **convexe**.

## 🔴 Concept 2 — Les trois caractérisations (différentiable)

**Ordre 1, une variable (prop. III.13)** : $f$ convexe sur $I$ $\iff$ $f(y) \geq f(x) + f'(x)(y-x)$ $\iff$ $f'$ croissante.

**Ordre 1, $\mathbb{R}^N$ (prop. III.18)** :
> $f$ différentiable, $C$ convexe : $f$ convexe sur $C$ $\iff$
> $$\forall x, y \in C : \quad f(y) \;\geq\; f(x) + \langle \nabla f(x),\, y - x\rangle$$
> — le graphe est **au-dessus de tous ses hyperplans tangents**.

**Ordre 2 (thm. III.19)** :
> $\nabla^2 f(x) \succeq 0$ pour tout $x \in C$ ⟹ $f$ convexe sur $C$ ; **équivalence si $C$ est ouvert**.

**⚠️ Trois précisions du cours qui font la différence en copie** :
- Il faut la positivité d'une **famille** de matrices $\{\nabla^2 f(x)\}_{x \in C}$ — une seule hessienne qui échoue (sur un ouvert) et la convexité tombe (remarque III.21).
- Si $\operatorname{int} C = \varnothing$, on ne peut rien dire : $f(x) = x^3$ est convexe (car constante !) sur $C = \{-1\}$ alors que $f'' < 0$ (remarque III.22).
- Quadratiques (prop. III.23) : $f = \langle Ax,x\rangle + \langle b,x\rangle + c$ convexe $\iff A \succeq 0$.

## 🔴 Concept 3 — Ce que la convexité achète

**Théorème III.24 (min local = global).**
> $C$ convexe, $f \in \Gamma_0(C)$ : tout minimiseur **local** de $f$ sur $C$ est **global**.

**Théorème III.25 (point critique = min global).**
> $C$ convexe, $f \in \Gamma_0(C)$, $f$ différentiable en $\bar x \in \operatorname{int} C$ :
> $$\nabla f(\bar x) = 0 \iff \bar x \text{ est un minimiseur global de } f \text{ sur } C.$$

C'est *l'équivalence* qui court-circuite toute l'étude de nature : plus de hessienne à classer, plus d'étude directe — annuler le gradient suffit. **Gare au bord** (remarque III.26) : l'équivalence exige $\bar x$ intérieur ; au bord, voir KKT (fiche 13).

**Quadratiques (prop. III.27)** : $f = \tfrac12\langle Ax,x\rangle + \langle b,x\rangle + c$ admet des minimiseurs $\iff A \succeq 0$ **et** $b \in \operatorname{Im} A$ ; alors $\operatorname{argmin} f = \{x \mid Ax + b = 0\}$.

## 🔴 Concept 4 — Forte convexité : existence ET unicité

**Définition (III.28).**
> $f$ est **$\mu$-fortement convexe** sur $C$ ($f \in \Gamma_\mu(C)$, $\mu > 0$) si
> $$f((1{-}\alpha)x + \alpha y) + \frac{\mu}{2}\alpha(1{-}\alpha)\lVert x - y\rVert^2 \;\leq\; (1{-}\alpha)f(x) + \alpha f(y).$$

**Trois lectures équivalentes** :
- **Décomposition (prop. III.30)** : $f \in \Gamma_\mu \iff f - \frac{\mu}{2}\lVert\cdot\rVert^2$ est convexe — fortement convexe = convexe + une parabole.
- **Hessienne (prop. III.33, $C$ ouvert convexe)** : $f \in \Gamma_\mu \iff \lambda_{\min}(\nabla^2 f(x)) \geq \mu$ pour tout $x$ — une borne **uniforme**.
- **Quadratiques (prop. III.36)** : fortement convexe $\iff A \succ 0$.

**⚠️ La nuance-piège (remarque III.34 + exemple III.35).** Forte convexité = $(\exists \mu > 0)(\forall x)\ \lambda_{\min} \geq \mu$ ; c'est **strictement plus fort** que $(\forall x)\ \lambda_{\min} > 0$. Contre-exemple canonique : $f(x) = e^x$, $f'' > 0$ partout mais $f'' \to 0$ en $-\infty$ — strictement convexe, **pas** fortement convexe (et pas coercive : les deux défauts vont ensemble).

**Le théorème de récompense (III.41 + cor.).**
> $f$ continue et fortement convexe sur $C$ fermé ⟹ $f$ est coercive et admet un **unique** minimiseur.

C'est le trio gagnant : existence (coercivité), unicité (forte convexité), et le point critique le désigne (convexité).

### Comment calculer la constante µ en pratique (remarque III.37) ?

1. Calculer $\nabla^2 f(x)$.
2. **Méthode des valeurs propres** : calculer $\lambda_{\min}(\nabla^2 f(x))$ et le minorer uniformément en $x$.
3. **Méthode des inégalités** (souvent plus rapide) : chercher $\mu > 0$ tel que $\nabla^2 f(x) - \mu I \succeq 0$ pour tout $x$ — critères diagonale/déterminant, sans calculer de valeurs propres.

**Exemple du cours (III.38).** $f = \tfrac12\langle Ax,x\rangle$, $A = \begin{pmatrix}3&1\\1&2\end{pmatrix}$ : $\chi_A(\mu) = \mu^2 - 5\mu + 5$, racines $\frac{5 \pm \sqrt5}{2}$, donc $f$ est $\mu$-convexe avec $\mu = \frac{5-\sqrt5}{2}$.

**Exemple par la méthode des inégalités.** $f(x,y) = 2x^2 + y^2 + \tfrac{xy}{2}$ : $\nabla^2 f = \begin{pmatrix} 4 & \tfrac12 \\ \tfrac12 & 2 \end{pmatrix}$. Tester $\nabla^2 f - \mu I \succeq 0$ : diagonale $\geq 0$ exige $\mu \leq 2$ ; déterminant $(4-\mu)(2-\mu) - \tfrac14 \geq 0$. En $\mu = 2$ : $-\tfrac14 < 0$, trop grand. En $\mu = \tfrac{3}{2}$ : $\tfrac52 \cdot \tfrac12 - \tfrac14 = 1 \geq 0$ ✓ — donc $f \in \Gamma_{3/2}$, sans calcul de valeurs propres. (Le $\mu$ optimal — $\lambda_{\min} = 3 - \sqrt{1 + \tfrac14} \approx 1{,}88$ — est meilleur, mais un $\mu$ valide suffit presque toujours en exercice.)

### Exercices résolus

**🟢 Niveau 1** — $f(x,y) = e^x + e^y$ : convexe ? fortement convexe ? coercive ?
<details><summary>Correction</summary>

$\nabla^2 f = \operatorname{diag}(e^x, e^y) \succ 0$ partout ⟹ (strictement) convexe. Mais $\lambda_{\min} = \min(e^x, e^y) \to 0$ quand $x \to -\infty$ : pas de $\mu > 0$ uniforme ⟹ **pas fortement convexe**. Pas coercive non plus : $f(x, 0) = e^x + 1 \to 1$ quand $x \to -\infty$ — c'est $e^x$ en deux dimensions, le contre-exemple canonique dédoublé.
</details>

**🟡 Niveau 2** — La somme d'une fonction convexe et d'une fonction $\mu$-fortement convexe est-elle fortement convexe ?
<details><summary>Correction</summary>

Oui, $\mu$-fortement : si $g \in \Gamma_0$ et $h \in \Gamma_\mu$, alors $(g + h) - \tfrac{\mu}{2}\lVert\cdot\rVert^2 = g + (h - \tfrac{\mu}{2}\lVert\cdot\rVert^2)$ est une somme de deux convexes (prop. III.30 + stabilité III.10). Application immédiate : $f + \tfrac{\mu}{2}\lVert\cdot\rVert^2$ (régularisation) est fortement convexe pour toute $f$ convexe — l'astuce constante du chapitre algorithmes.
</details>

**🟠 Niveau 3** — Montrez que $f(x,y) = \ln(e^x + e^y)$ est convexe mais jamais fortement convexe.
<details><summary>Correction</summary>

Convexité : $\nabla^2 f = \dfrac{e^{x+y}}{(e^x+e^y)^2}\begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix} \succeq 0$ (diagonale $\geq 0$, $\det = 0$) — SDP partout ⟹ convexe. Mais $\det \nabla^2 f = 0$ **partout** : $\lambda_{\min} = 0$ en tout point, aucune marge $\mu > 0$ possible. **Interprétation** : $f$ est constante le long de la direction $(1,1)$ à une fonction affine près ($f(x+t, y+t) = f(x,y) + t$) — plate dans une direction, donc jamais fortement convexe.
</details>

**🔴 Niveau 4 — type examen (le trio complet)** — $f(x,y) = x^2 + 2y^2 + \cos(x) $ : montrer que $f$ admet un unique minimiseur sur $\mathbb{R}^2$.
<details><summary>Correction</summary>

$\nabla^2 f = \begin{pmatrix} 2 - \cos x & 0 \\ 0 & 4 \end{pmatrix}$ avec $2 - \cos x \geq 1$ : $\lambda_{\min}(\nabla^2 f) \geq 1$ **partout** ⟹ $f \in \Gamma_1(\mathbb{R}^2)$, fortement convexe. Continue + $\mathbb{R}^2$ fermé ⟹ (thm. III.41) coercive, existence et **unicité** du minimiseur — sans résoudre $\nabla f = 0$ (qui est transcendant : $2x = \sin x$, $y = 0$). **Interprétation** : la forte convexité permet de conclure sur l'existence/unicité même quand le point exact est incalculable à la main — c'est sa vraie puissance en examen.
</details>

## ⚠️ Common mistakes

1. **Vérifier $\nabla^2 f \succeq 0$ en un seul point** — la convexité exige la famille entière.
2. **Confondre stricte et forte convexité** — $e^x$ (et $x^4$) : strictement convexe, pas fortement. L'ordre des quantificateurs ($\exists \mu\ \forall x$ vs $\forall x\ \exists \mu$) est le cœur de l'affaire.
3. **Utiliser « point critique = min global » au bord de $C$** — l'équivalence exige l'intérieur.
4. **Oublier $b \in \operatorname{Im} A$** pour les quadratiques semi-définies — $A \succeq 0$ seul ne suffit pas à l'existence ($f(x) = 0\cdot x^2 + x$…).
5. **Conclure la convexité d'une fonction sur un ensemble d'intérieur vide via la hessienne** — on est « aveugle » hors de $C$ ($x^3$ sur $\{-1\}$).
6. **Chercher la nature d'un point critique d'une fonction convexe** — inutile : c'est un minimum global, par théorème.

## 📌 Ultimate Review

1. Convexe : segment dans l'ensemble ; graphe sous les cordes ; épigraphe convexe.
2. Caractérisations : tangentes en dessous ($\iff$, ordre 1) ; $\nabla^2 f \succeq 0$ partout ($\iff$ sur un ouvert).
3. Convexe ⟹ min local = global ; **point critique intérieur $\iff$ min global** ; argmin convexe.
4. Fortement convexe = convexe + $\frac{\mu}{2}\lVert\cdot\rVert^2$ $\iff$ $\lambda_{\min}(\nabla^2 f) \geq \mu > 0$ uniformément.
5. Fortement convexe (continue, $C$ fermé) ⟹ coercive ⟹ existence + **unicité**.
6. Quadratiques : convexe $\iff A \succeq 0$ ; fortement $\iff A \succ 0$ ; argmin $= \{Ax + b = 0\}$.
7. $e^x$ : le contre-exemple à citer (stricte ≠ forte, $f''>0$ ≠ coercive).

**Formulas to know**
$$f(y) \geq f(x) + \langle\nabla f(x), y-x\rangle \quad ; \quad f \in \Gamma_\mu \iff f - \tfrac{\mu}{2}\lVert\cdot\rVert^2 \in \Gamma_0 \iff \lambda_{\min}(\nabla^2 f) \geq \mu$$

## 🧠 Active Recall

**Basic** — Énoncez la caractérisation de la convexité par le gradient.
<details><summary>Réponse</summary>

$f$ différentiable sur $C$ convexe : $f$ convexe $\iff f(y) \geq f(x) + \langle\nabla f(x), y - x\rangle$ pour tous $x,y \in C$ — le graphe au-dessus de chaque hyperplan tangent (prop. III.18).
</details>

**Understanding** — Pourquoi un point critique d'une fonction convexe est-il un minimum global ?
<details><summary>Réponse</summary>

Par la caractérisation du gradient : $f(y) \geq f(\bar x) + \langle\nabla f(\bar x), y - \bar x\rangle = f(\bar x)$ pour tout $y$, puisque $\nabla f(\bar x) = 0$. L'inégalité de tangence devient une inégalité globale de minimalité.
</details>

**Application** — $f(x,y) = x^2 + y^2 + e^{x+y}$ : convexe ? fortement convexe ? Minimiseur ?
<details><summary>Réponse</summary>

$\nabla^2 f = 2I + e^{x+y}\begin{pmatrix}1&1\\1&1\end{pmatrix}$ : somme de $2I$ (définie positive, $\lambda_{\min} = 2$) et d'une matrice SDP ⟹ $\lambda_{\min}(\nabla^2 f) \geq 2$ partout : $f \in \Gamma_2(\mathbb{R}^2)$, fortement convexe. Donc coercive, minimiseur **unique**, caractérisé par $\nabla f = 0$.
</details>

**Comparison** — Stricte convexité vs forte convexité : définitions, et lequel des deux garantit l'existence ?
<details><summary>Réponse</summary>

Stricte : inégalité de convexité stricte (ou $\nabla^2 f \succ 0$ point par point — suffisant). Forte : marge quadratique uniforme $\mu > 0$. Seule la **forte** convexité garantit l'existence (via la coercivité) ; $e^x$ est strictement convexe sans minimiseur.
</details>

**Exam-style** — Montrez que $f(x) = \tfrac12\langle Ax,x\rangle - \langle b,x\rangle$ avec $A \succ 0$ admet un unique minimiseur et donnez-le.
<details><summary>Réponse</summary>

$A \succ 0$ ⟹ $f$ fortement convexe (prop. III.36) ⟹ existence + unicité (thm. III.41). Le point critique : $\nabla f = Ax - b = 0 \iff x^* = A^{-1}b$, minimum global par le théorème III.25.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| $f$ convexe (définition) ? | $f((1{-}\alpha)x + \alpha y) \leq (1{-}\alpha)f(x) + \alpha f(y)$, $C$ convexe |
| Caractérisation ordre 1 ? | Graphe au-dessus des tangentes : $f(y) \geq f(x) + \langle\nabla f(x), y{-}x\rangle$ ($\iff$) |
| Caractérisation ordre 2 ? | $\nabla^2 f \succeq 0$ **partout** ($\iff$ sur un ouvert) |
| Convexe + point critique intérieur ? | Minimum GLOBAL ($\iff$, thm. III.25) |
| Fortement convexe (3 lectures) ? | Marge $\frac{\mu}{2}\alpha(1{-}\alpha)\lVert x{-}y\rVert^2$ ; $f - \frac{\mu}{2}\lVert\cdot\rVert^2$ convexe ; $\lambda_{\min}(\nabla^2 f) \geq \mu$ |
| Récompense de la forte convexité ? | Coercive ⟹ existence + UNICITÉ du minimiseur |
| $e^x$ illustre quoi ? | Strictement convexe ≠ fortement convexe (et pas coercive) |
| Quadratique convexe / fortement ? | $A \succeq 0$ / $A \succ 0$ |
| argmin d'une fonction convexe ? | Ensemble convexe (prop. III.12) |
| La sphère est-elle convexe ? | Non — elle est creuse (la boule, oui) |
