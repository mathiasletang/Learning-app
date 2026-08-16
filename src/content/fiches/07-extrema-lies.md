# Fiche 7 — Extrema liés : Lagrange et réduction

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Faccanoni, chapitre 4, §4.2, p. 100–103 (+ nombreux exercices corrigés) |
| **Difficulté** | 🔴 Must know — l'autre moitié de l'examen |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 3–6 (gradient, hessienne, extrema libres, implicites) |
| **Concepts clés** | Contrainte d'égalité, multiplicateur de Lagrange, lagrangien, méthode de réduction, interprétation de λ |
| **Poids à l'examen** | L'exercice « optimiser sous contrainte » (utilité sous budget, coût sous production…) est systématique. Le cours résout *chaque* exercice par les **deux** méthodes : faites pareil. |

## 🎯 Vue d'ensemble

Optimiser $f$ **le long d'une courbe** $g(x,y) = 0$ — suivre le chemin de montagne et chercher son point le plus haut — change la donne : les extrema n'annulent plus $\nabla f$. La bonne condition devient géométrique : à l'optimum, la courbe de niveau de $f$ et la contrainte sont **tangentes**, donc leurs gradients **parallèles** :
$$\nabla f = \lambda\, \nabla g.$$
Deux stratégies pour exploiter cela :

```
MÉTHODE 1 · LAGRANGIEN   L(x, y, λ) = f − λg,  ∇L = 0  →  candidats  →  classer (Δ ou étude directe)
MÉTHODE 2 · RÉDUCTION    exprimer la contrainte (y = h(x) ou paramétrage) → optimisation à UNE variable
```

La réduction est plus simple *quand elle est possible* ; Lagrange marche toujours (sous ses hypothèses). En examen, savoir les deux — et vérifier l'une par l'autre.

## 🔴 Concept 1 — Le théorème des multiplicateurs de Lagrange

**Définition (déf. 4.6).** $f$ (fonction **objectif**) admet en $x_0$ un extremum **lié** sous les contraintes $g_1 = 0, \dots, g_m = 0$ si elle y admet un extremum libre restreinte à l'ensemble $A = \{x \mid g_i(x) = 0\ \forall i\}$. Toujours $m < n$ (moins de contraintes que de variables).

**Théorème (thm. 4.7).**
> $f, g_1, \dots, g_m$ de classe $C^1$ sur un ouvert $D \subset \mathbb{R}^n$. Si $f$ admet en $x_0$ un extremum lié sous les contraintes et si la jacobienne des contraintes en $x_0$ est de **rang $m$** (pour $m=1$ : $\nabla g(x_0) \neq 0$), alors
> $$\exists\, \lambda_1, \dots, \lambda_m \in \mathbb{R} : \quad \nabla f(x_0) = \sum_{i=1}^m \lambda_i\, \nabla g_i(x_0).$$

**Intuition géométrique (figure 4.1 du cours).** Chercher le plus grand $c$ tel que la courbe de niveau $f = c$ rencontre encore la contrainte : au moment limite, les deux courbes se **touchent sans se traverser** — tangence — donc gradients colinéaires. Si $\nabla f$ avait une composante le long de la contrainte, on pourrait encore glisser le long de celle-ci et améliorer $f$.

**Interprétation de $\lambda$ (à citer en examen, très apprécié).** $\lambda$ mesure l'**intensité de la contrainte** : c'est la variation de la valeur optimale de $f$ quand on relâche la contrainte d'une unité ($g = k \to k+1$). $\lambda = 0$ : contrainte inopérante ; $\lambda$ grand : contrainte très pénalisante. En économie, c'est l'*utilité marginale du revenu* dans le problème du consommateur.

**⚠️ Encadré ATTENTION du cours.** Lagrange ne fournit que des **candidats**. Il ne classe rien : la nature (max/min/ni l'un ni l'autre) doit être établie ensuite.

## 🔴 Concept 2 — Méthode 1 : le lagrangien (cas $n=2$, $m=1$)

$$\mathcal{L}(x, y, \lambda) = f(x,y) - \lambda\, g(x,y)$$

**Système à résoudre** ($\nabla \mathcal{L} = 0$) :
$$\begin{cases} \partial_x f(x,y) = \lambda\, \partial_x g(x,y) \\ \partial_y f(x,y) = \lambda\, \partial_y g(x,y) \\ g(x,y) = 0 \end{cases}$$
La 3ᵉ équation est *la contrainte elle-même* — c'est $\partial_\lambda \mathcal{L} = 0$.

**Classification des candidats $(x_0, y_0, \lambda_0)$ (du cours).** Poser
$$\Delta(x_0,y_0,\lambda_0) = \partial_{xx}\mathcal{L}\cdot\partial_{yy}\mathcal{L} - (\partial_{xy}\mathcal{L})^2 \quad \text{(évalué en } (x_0,y_0,\lambda_0))$$
- $\Delta > 0$, $\partial_{xx}\mathcal{L} < 0$ et $\partial_{yy}\mathcal{L} < 0$ ⟹ **maximum** local lié ;
- $\Delta > 0$, $\partial_{xx}\mathcal{L} > 0$ et $\partial_{yy}\mathcal{L} > 0$ ⟹ **minimum** local lié ;
- $\Delta \leq 0$ ⟹ pas de conclusion directe → **étude directe** : signe de $d(h,k) = f(x_0{+}h, y_0{+}k) - f(x_0,y_0)$ pour $(h,k)$ voisins de $(0,0)$ **liés par la contrainte** $g(x_0{+}h, y_0{+}k) = 0$.

⚠️ Notez la différence avec les extrema libres : ici c'est la hessienne **du lagrangien** (à $\lambda_0$ fixé), et le cas $\Delta \leq 0$ n'est pas synonyme de selle — seulement d'indétermination.

## 🔴 Concept 3 — Méthode 2 : la réduction

Si la contrainte permet d'**exprimer une variable** ($y = h(x)$, ou $x = h(y)$, ou un paramétrage $x = x(t), y = y(t)$ — les trois formes listées par le cours), alors :
$$\text{optimiser } f \text{ sous } g = 0 \iff \text{optimiser } \tilde f(x) = f(x, h(x)) \text{ à UNE variable.}$$
On retombe sur la routine du lycée : $\tilde f' = 0$, signe de $\tilde f'$ ou $\tilde f''$, conclusion — **avec** la nature des extrema en prime (avantage sur Lagrange).

**Quand la préférer ?** Contrainte linéaire ou facilement résoluble ($2(x+y) = \ell$, $z = \frac{12 - xy}{x+y}$…) : réduction. Contrainte symétrique ou insoluble explicitement ($x^2 + y^2 = 1$ marche aussi en paramétrant $x = \cos t$, $y = \sin t$) : Lagrange, ou paramétrage.

### Comment résoudre l'exercice type (protocole complet)

1. **Modéliser** : identifier $f$ (objectif) et $g = 0$ (contrainte) ; préciser le domaine ($(\mathbb{R}_+^*)^2$ pour des quantités…).
2. **Existence** : si l'ensemble contraint est compact (cercle, segment…), citer Weierstrass — les extrema existent.
3. **Méthode 1** : lagrangien, système $\nabla\mathcal{L} = 0$, candidats. Vérifier $\nabla g \neq 0$ sur les candidats.
4. **Classer** : $\Delta$, ou étude directe, ou argument de compacité (un seul candidat + existence garantie ⟹ c'est lui).
5. **Méthode 2 en contrôle** : réduire, retrouver le même candidat, lire la nature sur la fonction d'une variable.
6. **Conclure en contexte** : valeur optimale, interprétation de $\lambda$.

**Exemple complet (du cours) — le champ d'aire maximale.** Maximiser l'aire $f(x,y) = xy$ sous la contrainte de clôture $2(x+y) = \ell$.

*Méthode 1.* $\mathcal{L} = xy - \lambda(2(x+y) - \ell)$ ;
$$\nabla\mathcal{L} = 0 \iff \begin{cases} y = 2\lambda \\ x = 2\lambda \\ 2(x+y) = \ell \end{cases} \iff x = y = \frac{\ell}{4},\ \lambda = \frac{\ell}{8}.$$
*Méthode 2.* $y = \frac{\ell}{2} - x$, $\tilde f(x) = x\left(\frac{\ell}{2} - x\right)$ : parabole tournée vers le bas, maximum en $x = \frac{\ell}{4}$. ✓ Les deux méthodes concordent : le champ optimal est le **carré** de côté $\ell/4$, d'aire $\ell^2/16$.

**Exemple économique canonique (du cours).** Maximiser l'utilité $U(x,y)$ sous le budget $p_1 x + p_2 y = R$ : la condition de Lagrange s'écrit
$$\frac{\partial_x U}{p_1} = \frac{\partial_y U}{p_2} = \lambda$$
— à l'optimum, les utilités marginales par euro dépensé s'égalisent, et $\lambda$ est l'utilité marginale du revenu. Formulation à connaître **par cœur** pour les applications micro.

### Comment savoir quelle méthode utiliser ?

| Indice dans l'énoncé | Méthode | Pourquoi |
|---|---|---|
| Contrainte linéaire ($2x + 8y = 240$) | Réduction (ou Lagrange) | $y$ s'exprime en une ligne ; nature offerte |
| Contrainte cercle/ellipse | Paramétrage ou Lagrange | $x = r\cos t$ marche ; expliciter $y(x)$ casse la symétrie |
| Contrainte insoluble ($x^5 + y + e^y = 3$) | Lagrange seul | Aucune explicitation possible |
| « Interpréter le multiplicateur » | Lagrange obligatoire | $\lambda$ n'existe que là |
| Domaine compact + une seule question | L'une des deux + Weierstrass | Candidat unique ⟹ conclusion sans classification fine |

### Exemple piège — le candidat que Lagrange ne voit pas

**Question.** Minimiser $f(x,y) = x$ sous $g(x,y) = x^3 - y^2 = 0$.

**Approche standard.** $\nabla\mathcal{L} = 0$ : $1 = 3\lambda x^2$, $0 = -2\lambda y$, $x^3 = y^2$. De la deuxième : $\lambda = 0$ (impossible, contredit la première) ou $y = 0$ — alors $x = 0$, mais la première devient $1 = 0$ : **aucun candidat**. Conclure « pas d'extremum » ?

**Pourquoi c'est faux.** La contrainte $x^3 = y^2$ impose $x \geq 0$ : le point $(0,0)$ **minimise** $f = x$ sur la courbe. Lagrange ne le trouve pas car $\nabla g(0,0) = (0, 0)$ : l'hypothèse de qualification $\nabla g \neq 0$ **échoue** précisément là.

**Leçon.** Toujours vérifier séparément les points où $\nabla g = 0$ *sur la contrainte* : ce sont des candidats hors-système. (Même pathologie que le point de rebroussement de la fiche 5.)

### Exercices progressifs

**🟢 Niveau 1** — Extrema de $f(x,y) = xy$ sous $x + y = 6$.
<details><summary>Correction</summary>

*Réduction* : $y = 6 - x$, $\tilde f = 6x - x^2$, $\tilde f' = 6 - 2x = 0$ en $x = 3$, $\tilde f'' = -2 < 0$ : **maximum** lié en $(3,3)$, $f = 9$. *Lagrange en contrôle* : $y = \lambda$, $x = \lambda$, $x + y = 6$ ⟹ $(3,3)$, $\lambda = 3$ ✓.
</details>

**🟡 Niveau 2** — Distance minimale de l'origine à la droite $x + 2y = 5$.
<details><summary>Correction</summary>

Minimiser $f = x^2 + y^2$ (le **carré** de la distance — même optimum, calculs plus doux) sous $g = x + 2y - 5 = 0$. Lagrange : $2x = \lambda$, $2y = 2\lambda$ ⟹ $y = 2x$ ; contrainte : $x + 4x = 5$, $x = 1$ : candidat $(1, 2)$, distance $\sqrt{5}$. Unique candidat, $f \to \infty$ le long de la droite ⟹ minimum global. **Interprétation** : $(1,2)$ est le pied de la perpendiculaire — Lagrange retrouve la géométrie élémentaire ($\nabla f \parallel (1,2)$, normale à la droite).
</details>

**🟠 Niveau 3** — Extrema de $f(x,y) = x^2 + y^2$ sous $\dfrac{x^2}{4} + y^2 = 1$ (ellipse).
<details><summary>Correction</summary>

Lagrange : $2x = \lambda \tfrac{x}{2}$, $2y = 2\lambda y$, contrainte. Première équation : $x(2 - \tfrac{\lambda}{2}) = 0$ ⟹ $x = 0$ **ou** $\lambda = 4$ — ne pas diviser par $x$ ! · $x = 0$ ⟹ $y = \pm 1$, $f = 1$ ($\lambda = 1$). · $\lambda = 4$ ⟹ deuxième équation : $y = 0$ ⟹ $x = \pm 2$, $f = 4$. Ellipse compacte : **min $1$ en $(0, \pm1)$, max $4$ en $(\pm2, 0)$**. **Interprétation** : le point de l'ellipse le plus proche de l'origine est au bout du petit axe, le plus éloigné au bout du grand axe.
</details>

**🔴 Niveau 4 — type partiel (production)** — Une firme produit $Q(K, L) = K^{1/2}L^{1/2}$ au coût $2K + 8L$. Minimisez le coût pour produire $Q = 4$, et donnez le coût marginal d'une unité de production supplémentaire.
<details><summary>Correction</summary>

Minimiser $f = 2K + 8L$ sous $g = K^{1/2}L^{1/2} - 4 = 0$. Lagrange : $2 = \lambda \tfrac12 K^{-1/2}L^{1/2}$ et $8 = \lambda \tfrac12 K^{1/2}L^{-1/2}$. Le quotient des deux : $\tfrac14 = \tfrac{L}{K}$ ⟹ $K = 4L$. Contrainte : $(4L)^{1/2}L^{1/2} = 2L = 4$ ⟹ $L = 2$, $K = 8$. Coût optimal $= 16 + 16 = 32$ (les dépenses en chaque facteur s'égalisent — propriété Cobb-Douglas). $\lambda$ : de $2 = \lambda \tfrac12 (L/K)^{1/2} = \lambda \tfrac12 \cdot \tfrac12$ ⟹ $\lambda = 8$ : produire une **5ᵉ unité coûterait environ 8** — c'est le coût marginal à l'optimum.
</details>

## ⚠️ Common mistakes

1. **Oublier la contrainte dans le système** — trois équations, pas deux : $g = 0$ en fait partie.
2. **Diviser par $\partial_x g$ ou par $\lambda$ sans précaution** — on perd des candidats si la quantité s'annule. Discuter les cas.
3. **Classer avec la hessienne de $f$** au lieu de celle de $\mathcal{L}$ — erreur structurelle : la courbure de la contrainte compte.
4. **Croire que $\Delta < 0$ ⟹ point-selle** — en lié, $\Delta \leq 0$ signifie seulement « étudier autrement ».
5. **Oublier l'hypothèse $\nabla g \neq 0$** aux candidats — un point où $\nabla g = 0$ peut être un extremum *non détecté* par Lagrange.
6. **Réduction : oublier de restreindre le domaine** de la variable restante ($x \in ]0; \ell/2[$ pour le champ : les côtés sont positifs).
7. **Signe de $\lambda$ sur-interprété** — dans la convention $\mathcal{L} = f - \lambda g$, comparer $\nabla f = \lambda \nabla g$ ; ne pas tirer de conclusions de son signe sans réfléchir à l'orientation de $g$.

## 📌 Ultimate Review

1. Condition de Lagrange : $\nabla f = \lambda \nabla g$ **et** $g = 0$, sous $\nabla g \neq 0$ — condition **nécessaire** seulement.
2. Géométrie : tangence entre la courbe de niveau de $f$ et la contrainte.
3. Lagrangien $\mathcal{L} = f - \lambda g$ : les candidats annulent $\nabla \mathcal{L}$ (3 équations).
4. Classification : $\Delta$ de la hessienne de $\mathcal{L}$ ($>0$ + signes de $\partial_{xx}\mathcal{L}, \partial_{yy}\mathcal{L}$), sinon étude directe *le long de la contrainte*.
5. Réduction : contrainte explicitable ⟹ problème à une variable, nature incluse.
6. $\lambda$ = sensibilité de l'optimum au niveau de la contrainte (intensité).
7. Consommateur : $\partial_x U / p_1 = \partial_y U / p_2 = \lambda$.
8. Compact + Weierstrass + candidat unique ⟹ conclusion immédiate.

**Formulas to know**
$$\mathcal{L}(x,y,\lambda) = f - \lambda g \qquad \nabla f = \lambda \nabla g \qquad \Delta = \partial_{xx}\mathcal{L}\,\partial_{yy}\mathcal{L} - (\partial_{xy}\mathcal{L})^2$$

**Methods to know** : le protocole en 6 étapes ; les deux méthodes sur un même exercice ; l'argument Weierstrass + candidat unique.

## 🧠 Active Recall

**Basic** — Écrivez le système de Lagrange pour optimiser $f$ sous $g = 0$ ($n = 2$).
<details><summary>Réponse</summary>

$\partial_x f = \lambda \partial_x g$ ; $\partial_y f = \lambda \partial_y g$ ; $g(x,y) = 0$ — trois équations, trois inconnues $(x, y, \lambda)$.
</details>

**Understanding** — Expliquez géométriquement pourquoi $\nabla f$ et $\nabla g$ sont parallèles à l'optimum.
<details><summary>Réponse</summary>

À l'optimum, la courbe de niveau de $f$ et la contrainte sont tangentes : sinon la contrainte *traverse* les niveaux de $f$ et on peut encore améliorer $f$ en glissant le long de la contrainte. Tangence des courbes = colinéarité des normales, c'est-à-dire des gradients.
</details>

**Application** — Optimisez $f(x,y) = x + y$ sous $x^2 + y^2 = 2$ (les deux méthodes).
<details><summary>Réponse</summary>

*Lagrange* : $1 = 2\lambda x$, $1 = 2\lambda y$, $x^2 + y^2 = 2$ ⟹ $x = y = \pm 1$ ($\lambda = \pm\frac12$). *Paramétrage* : $x = \sqrt2\cos t$, $y = \sqrt2\sin t$, $\tilde f = 2\sin(t + \pi/4)$ : max $2$ en $(1,1)$, min $-2$ en $(-1,-1)$. Le cercle est compact : Weierstrass garantit que ces deux candidats sont bien le max et le min globaux.
</details>

**Comparison** — Avantages respectifs de Lagrange et de la réduction ?
<details><summary>Réponse</summary>

Réduction : plus simple, donne directement la *nature* (fonction d'une variable) — mais exige une contrainte explicitable. Lagrange : toujours applicable ($C^1$, $\nabla g \neq 0$), fournit $\lambda$ et son interprétation — mais ne classe pas les candidats.
</details>

**Exam-style** — Un consommateur a $U(x,y) = xy$ et le budget $2x + 8y = 240$. Panier optimal ? Interprétez $\lambda$.
<details><summary>Réponse</summary>

Lagrange : $y = 2\lambda$, $x = 8\lambda$, $2x + 8y = 240$ ⟹ $16\lambda + 16\lambda = 240$, $\lambda = 7{,}5$, $(x, y) = (60, 15)$, $U = 900$. Réduction en contrôle : $y = 30 - x/4$, $\tilde U = 30x - x^2/4$, max en $x = 60$ ✓. $\lambda = 7{,}5$ : un euro de budget supplémentaire augmenterait l'utilité optimale d'environ 7,5 unités.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Condition de Lagrange ($m=1$) ? | $\nabla f = \lambda \nabla g$ et $g = 0$, sous $\nabla g \neq 0$ |
| Le lagrangien ? | $\mathcal{L}(x,y,\lambda) = f(x,y) - \lambda g(x,y)$ |
| Lagrange donne-t-il la nature des candidats ? | NON — candidats seulement ; classer ensuite ($\Delta$ ou étude directe) |
| $\Delta$ en optimisation liée ? | $\partial_{xx}\mathcal{L}\,\partial_{yy}\mathcal{L} - (\partial_{xy}\mathcal{L})^2$ — hessienne du **lagrangien** |
| $\Delta \leq 0$ en lié signifie ? | Indétermination (pas « selle ») → étude directe le long de la contrainte |
| Interprétation de $\lambda$ ? | Sensibilité de l'optimum au niveau de la contrainte (intensité) |
| Méthode de réduction ? | Expliciter la contrainte, optimiser une fonction d'UNE variable |
| Optimum du consommateur ? | $\partial_x U/p_1 = \partial_y U/p_2 = \lambda$ (utilités marginales par euro égalisées) |
| Candidat unique sur un compact ? | Weierstrass ⟹ c'est l'extremum global |
| Champ rectangulaire, clôture fixée ? | Le carré ($x = y = \ell/4$) maximise l'aire |
