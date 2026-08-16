# Fiche 3 — Dérivées partielles, gradient et règle de la chaîne

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Faccanoni, chapitre 3, §3.1, p. 27–34 |
| **Difficulté** | 🔴 Must know — socle de tout le reste |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 1–2 ; dérivation en une variable |
| **Concepts clés** | Dérivées partielles, gradient, jacobienne, chain rule, dérivée directionnelle, élasticité |
| **Poids à l'examen** | Le calcul de dérivées partielles est présent dans *chaque* exercice d'optimisation. La chain rule et la dérivée en un point « à problème » sont des questions ciblées classiques. |

## 🎯 Vue d'ensemble

Une fonction d'une variable a *une* dérivée ; une fonction de $n$ variables en a $n$ — une par direction d'axe. Ce chapitre définit ces **dérivées partielles**, les rassemble dans le **gradient**, apprend à dériver des compositions (**chain rule**) et généralise à toute direction (**dérivée directionnelle**). C'est la boîte à outils de calcul : les fiches 4 à 7 ne font que l'exploiter.

```
Dérivée partielle ∂f/∂x  (une par variable)
   └── rassemblées → GRADIENT ∇f  (⊥ lignes de niveau)
        ├── empilé pour f: Rⁿ→Rᵐ → JACOBIENNE
        ├── composé → CHAIN RULE
        └── projeté sur v → DÉRIVÉE DIRECTIONNELLE ∇f·v
```

## 🔴 Concept 1 — Dérivées partielles premières

**Définition (déf. 3.1).**
> Les dérivées partielles de $f$ en $(x_0, y_0)$ sont les dérivées des **fonctions partielles** évaluées au point :
> $$\frac{\partial f}{\partial x}(x_0,y_0) = \lim_{h \to 0} \frac{f(x_0 + h, y_0) - f(x_0,y_0)}{h}, \qquad \frac{\partial f}{\partial y}(x_0,y_0) = \lim_{k \to 0} \frac{f(x_0, y_0 + k) - f(x_0,y_0)}{k}.$$
> Ce sont des **limites de fonctions d'une seule variable**. Si $f$ admet toutes ses dérivées partielles premières, on dit que $f$ est **dérivable**.

**Notations** : $\partial_x f$, $f_{,x}$, $\frac{\partial f}{\partial x}\big|_y$. ⚠️ Ne pas confondre $f_{,x}$ (dérivée) et $f_{x=x_0}$ (fonction partielle) — mise en garde explicite du cours.

**Intuition.** $\partial_x f(x_0,y_0)$ est la **pente de la tranche** : on coupe la surface par le plan $y = y_0$, on obtient une courbe, $\partial_x f$ est sa pente en $x_0$. Exemple du cours : pour le paraboloïde $f = 4 - x^2 - 2y^2$ en $(1,1)$, les deux tranches sont des paraboles de pentes $\partial_x f(1,1) = -2$ et $\partial_y f(1,1) = -4$.

**Astuce de calcul (du cours).** Pour calculer $\partial_x f$ : dériver $f$ **comme si $y$ était une constante**, avec toutes les règles usuelles.

**Exemple.** $f(x,y) = 3x^2 + xy - 2y^2$ : $\partial_x f = 6x + y$, $\partial_y f = x - 4y$.

### La gamme de calcul — une forme, un réflexe

Cinq exemples calculés, du plus simple au plus complet ; c'est la variété qu'il faut savoir traiter à vitesse d'examen :

**1. Polynôme.** $f = 3x^2 + xy - 2y^2$ (ci-dessus) : chaque monôme se dérive séparément ; $xy$ donne $y$ en $x$ et $x$ en $y$.

**2. Produit.** $f = x^2\sin y$ : $\partial_x f = 2x\sin y$ — ici $\sin y$ est une **constante multiplicative**, pas besoin de règle du produit ; $\partial_y f = x^2\cos y$. La règle du produit ne sert que si **les deux facteurs contiennent la variable de dérivation**.

**3. Exponentielle composée.** $f = e^{xy^2}$ : $\partial_x f = y^2 e^{xy^2}$, $\partial_y f = 2xy\, e^{xy^2}$ — dériver l'exposant par rapport à la bonne variable, le reste suit.

**4. Logarithme.** $f = \ln(x^2 + y^2)$ (hors de l'origine) : $\partial_x f = \dfrac{2x}{x^2+y^2}$, $\partial_y f = \dfrac{2y}{x^2+y^2}$ — la règle $\left(\ln u\right)' = u'/u$, avec le bon $u'$.

**5. Puissance variable (exercice 3.1 du cours).** $f = x^y$ ($x > 0$) : écrire $x^y = e^{y\ln x}$, d'où $\partial_x f = y\,x^{y-1}$ et $\partial_y f = \ln(x)\, x^y$. Deux règles différentes selon la variable — le piège classique du chapitre.

**Exercice éclair 🟢** — $f(x,y,z) = z\,e^{x}\ln y$ : les trois dérivées partielles ?
<details><summary>Correction</summary>

$\partial_x f = z\,e^x \ln y$ ; $\partial_y f = \dfrac{z\,e^x}{y}$ ; $\partial_z f = e^x \ln y$. À trois variables, la mécanique est identique : on fige les deux autres.
</details>

### ⚠️ Le cas « point à problème » (réflexe d'examen)

Quand $f$ est définie **par cas** (typiquement $f(0,0) = 0$ et une formule ailleurs), les règles de calcul ne s'appliquent pas au point de jonction : il faut **revenir à la définition** :
$$\partial_x f(0,0) = \lim_{h\to 0} \frac{f(h, 0) - f(0,0)}{h}.$$
Le cours répète cette mise en garde dans plusieurs corrigés (« Attention : il faut revenir à la définition de dérivée partielle au point $(0,0)$ »).

**À retenir**
- Une dérivée partielle est une dérivée *ordinaire* de la fonction partielle.
- Aux points définis par cas : la définition, pas les règles.
- Dérivable (toutes les $\partial_i f$ existent) **n'implique pas** continue — contrairement au cas d'une variable ! (Voir fiche 4.)

## 🔴 Concept 2 — Gradient et jacobienne

**Définition (déf. 3.2).**
> Le **gradient** de $f : \mathbb{R}^n \to \mathbb{R}$ en $\hat x$ est le vecteur des dérivées partielles premières :
> $$\nabla f(\hat x) = \begin{pmatrix} \partial_{x_1} f(\hat x) \\ \vdots \\ \partial_{x_n} f(\hat x) \end{pmatrix}.$$
> Il est **orthogonal à la courbe de niveau** de $f$ passant par ce point.

**Intuition géométrique (exemple du cours).** Pour $f(x,y) = x^2 + y$ en $(-1, 1)$ : $\nabla f(-1,1) = (-2, 1)^T$ ; la courbe de niveau 2 est la parabole $y = -x^2 + 2$, dont la tangente en $(-1,1)$ est bien perpendiculaire à $(-2,1)^T$. Le gradient pointe dans la direction de **plus forte montée** — cette orthogonalité aux niveaux est le cœur géométrique de Lagrange (fiche 7).

**Définition (déf. 3.3).** Pour $\mathbf{f} : \mathbb{R}^n \to \mathbb{R}^m$ (un empilement de $m$ fonctions scalaires), la **matrice jacobienne** rassemble les gradients des composantes. Exemple du cours : $\mathbf f(x,y) = (xy,\; x - y,\; x + y^2)$ donne $J_{\mathbf f} = \begin{pmatrix} y & 1 & 1 \\ x & -1 & 2y \end{pmatrix}$.

## 🔴 Concept 3 — Règle de la chaîne (chain rule)

**Les trois cas du cours (déf. 3.4)** — à connaître par cœur :

**Cas $\mathbb{R} \to \mathbb{R}^2 \to \mathbb{R}$** — $g(t) = f(x(t), y(t))$ :
$$g'(t) = \partial_x f\big(x(t), y(t)\big)\, x'(t) + \partial_y f\big(x(t), y(t)\big)\, y'(t)$$

**Cas $\mathbb{R}^2 \to \mathbb{R}^2 \to \mathbb{R}$** — $g(u,v) = f(x(u,v), y(u,v))$ :
$$\partial_u g = \partial_x f \cdot \partial_u x + \partial_y f \cdot \partial_u y, \qquad \partial_v g = \partial_x f \cdot \partial_v x + \partial_y f \cdot \partial_v y$$

**Cas $\mathbb{R}^2 \to \mathbb{R} \to \mathbb{R}$** — $g(u,v) = f(x(u,v))$ :
$$\partial_u g = f'(x(u,v))\,\partial_u x, \qquad \partial_v g = f'(x(u,v))\,\partial_v x$$

**Comment retenir ?** *Une somme sur les variables intermédiaires, un produit le long de chaque chemin.* Dessinez l'arbre de dépendance $g \to (x, y) \to (u,v)$ : chaque chemin de $g$ à $u$ contribue un produit de dérivées, on somme les chemins.

**Exemple complet (gaz parfaits, du cours).** $PV = RT$, donc $P(t) = R\,T(t)/V(t)$. À l'instant où $T = 300$, $T' = 0{,}1$, $V = 100$, $V' = 0{,}2$ :
$$P'(t) = \partial_T P \cdot T' + \partial_V P \cdot V' = \frac{R}{V}T' - \frac{RT}{V^2}V' = \frac{8{,}31}{100}(0{,}1) - \frac{8{,}31 \cdot 300}{100^2}(0{,}2) \approx -0{,}042 \text{ kPa/s}.$$
La pression **décroît** : l'effet volume l'emporte sur l'effet température. Toujours interpréter le signe.

**Deuxième exemple calculé — cas $\mathbb{R}^2 \to \mathbb{R}^2 \to \mathbb{R}$.** $g(u,v) = f(x,y)$ avec $f(x,y) = x^2 y$, $x = uv$, $y = u - v$ :
- $\partial_u g = \underbrace{2xy}_{\partial_x f}\cdot\underbrace{v}_{\partial_u x} + \underbrace{x^2}_{\partial_y f}\cdot\underbrace{1}_{\partial_u y} = 2uv^2(u-v) + u^2v^2$ ;
- $\partial_v g = 2xy \cdot u + x^2 \cdot (-1) = 2u^2v(u-v) - u^2v^2$.
- **Contrôle** : substituer d'abord ($g = u^2v^2(u-v)$) puis dériver directement redonne exactement ces expressions. En examen, ce contrôle par substitution est le meilleur détecteur d'erreur quand il est praticable.

**Exercice 🟡** — La demande d'un bien est $D(p, r) = \dfrac{r}{p^2}$ ; le prix suit $p(t) = 2 + t$ et le revenu $r(t) = 100e^{0{,}02t}$. Calculez $D'(t)$ en $t = 0$ et interprétez.
<details><summary>Correction</summary>

$D' = \partial_p D\cdot p' + \partial_r D\cdot r' = -\dfrac{2r}{p^3}\cdot 1 + \dfrac{1}{p^2}\cdot 2e^{0{,}02t}$. En $t=0$ : $p = 2$, $r = 100$ : $D' = -\dfrac{200}{8} + \dfrac{2}{4} = -24{,}5$. **Interprétation** : la hausse du prix fait chuter la demande bien plus vite que la croissance du revenu ne la soutient — le signe et la comparaison des deux termes sont la réponse attendue, pas seulement le nombre. (Même mécanique que l'exemple des gaz parfaits.)
</details>

**Où la chain rule resurgit** : dérivation implicite ($\varphi' = -\partial_x f / \partial_y f$, fiche 5), théorème d'Euler, justification de Lagrange (fiche 7). C'est la formule la plus réutilisée du cours.

## 🟠 Concept 4 — Dérivée directionnelle et classe C¹

**Définition (déf. 3.5).** $f$ est de **classe $C^1$** sur $D$ si $f$, $\partial_x f$, $\partial_y f$ sont continues sur $D$. (Rôle clé en fiche 4 : $C^1 \Rightarrow$ différentiable.)

**Définition (déf. 3.6).**
> La dérivée de $f$ en $(x_0,y_0)$ **selon la direction** $v = (a,b)$ est
> $$\frac{\partial f}{\partial v}(x_0,y_0) = \lim_{h\to 0} \frac{f(x_0 + ha,\, y_0 + hb) - f(x_0,y_0)}{h}.$$
> **Si $f$ est différentiable**, cette limite vaut $\nabla f(x_0,y_0) \cdot v = a\,\partial_x f + b\,\partial_y f$.

**Exemple (du cours).** $f = x^2 - y^2$ en $(1,2)$, direction $v = (3,5)$ : par la formule, $3 \cdot 2 + 5 \cdot (-4) = -14$ ; la définition redonne bien $-14$.

**⚠️ Nuance.** La formule $\nabla f \cdot v$ exige la **différentiabilité** ; en un point pathologique, seule la définition par limite fait foi.

### Comment savoir quelle définition utiliser ?

| L'énoncé dit… | Outil | Pourquoi |
|---|---|---|
| $f$ polynomiale, $C^1$, « fonction usuelle » | $\nabla f \cdot v$ | Différentiabilité acquise (fiche 4) |
| $f$ définie par cas au point demandé | Définition par limite | Les règles de calcul n'y ont pas cours |
| « Dans quelle direction $f$ croît-elle le plus vite ? » | Direction de $\nabla f$ | La dérivée directionnelle $\nabla f\cdot v$ est maximale pour $v$ colinéaire à $\nabla f$ |

**Exercice 🟠** — $f(x,y) = x^2y$ en $(1,2)$. (a) Dérivée dans la direction $v = \left(\tfrac{3}{5}, \tfrac{4}{5}\right)$ ; (b) direction de plus forte croissance et taux correspondant.
<details><summary>Correction</summary>

$\nabla f = (2xy,\, x^2)$, donc $\nabla f(1,2) = (4, 1)$.
(a) $\partial_v f = 4\cdot\tfrac35 + 1\cdot\tfrac45 = \tfrac{16}{5} = 3{,}2$.
(b) Direction $\dfrac{(4,1)}{\lVert(4,1)\rVert} = \dfrac{1}{\sqrt{17}}(4,1)$, taux $\lVert \nabla f \rVert = \sqrt{17} \approx 4{,}12$. **Interprétation** : 3,2 < 4,12 — dériver dans une direction oblique perd une partie de la pente maximale, exactement comme monter un flanc de colline en biais.
</details>

## 🟡 Concept 5 — Élasticité (applications économiques)

Pour $f(x_0,y_0) \neq 0$, l'**élasticité partielle** par rapport à $x$ est
$$E^x_f(x_0,y_0) = \frac{x_0}{f(x_0,y_0)}\,\partial_x f(x_0,y_0)$$
— le pourcentage de variation de $f$ pour 1 % de variation de $x$. $|E| > 1$ : élastique ; $< 1$ : rigide ; $= 1$ : unitaire.

**Exemple clé (du cours).** Cobb-Douglas $f(x,y) = x^\alpha y^\beta$ : $E^x_f = \alpha$ et $E^y_f = \beta$, **constantes** — c'est précisément ce qui rend ces fonctions si populaires en modélisation. Autre exemple du cours : une demande $D(p, r)$ avec $E^p_D < 0$ (le prix freine) et $E^r_D > 0$ (le revenu stimule).

## ⚠️ Common mistakes

1. **Oublier de figer l'autre variable** — dans $\partial_x(x y^2)$, $y^2$ est une *constante multiplicative* : résultat $y^2$, pas $2xy$.
2. **Utiliser les règles de calcul en un point défini par cas** — revenir à la définition par limite.
3. **Chain rule incomplète** — oublier un des chemins de l'arbre de dépendance (il faut *sommer* sur toutes les variables intermédiaires).
4. **Confondre $\nabla f \cdot v$ et la définition** de la dérivée directionnelle quand $f$ n'est pas différentiable.
5. **$x^y$** : dériver par rapport à $y$ donne $\ln(x)\,x^y$ — pas $y\,x^{y-1}$ (ça, c'est par rapport à $x$).
6. **Croire que dérivable ⟹ continue** — faux en plusieurs variables (voir fiche 4).

## 📌 Ultimate Review

1. $\partial_x f$ = dérivée de la fonction partielle = « $y$ constant, règles usuelles ».
2. Point défini par cas ⟹ définition par limite, obligatoirement.
3. $\nabla f$ = vecteur des dérivées partielles, **orthogonal aux lignes de niveau**, direction de plus forte pente.
4. Jacobienne = gradients empilés pour $f : \mathbb{R}^n \to \mathbb{R}^m$.
5. Chain rule : somme sur les variables intermédiaires, produit le long des chemins.
6. Dérivée directionnelle $= \nabla f \cdot v$ **si** $f$ différentiable.
7. $C^1$ = $f$ et ses partielles continues.
8. Élasticité $E^x_f = \frac{x}{f}\partial_x f$ ; Cobb-Douglas : élasticités constantes $\alpha, \beta$.

**Formulas to know**
$$\partial_x f(x_0,y_0) = \lim_{h\to0}\tfrac{f(x_0+h,\,y_0)-f(x_0,y_0)}{h} \qquad \nabla f = (\partial_{x_1}f, \dots, \partial_{x_n}f)^T$$
$$g' = \partial_x f\, x' + \partial_y f\, y' \qquad \frac{\partial f}{\partial v} = \nabla f \cdot v \ (\text{si diff.}) \qquad E^x_f = \frac{x}{f}\,\partial_x f$$

## 🧠 Active Recall

**Basic** — Définissez $\partial_y f(x_0, y_0)$ par une limite.
<details><summary>Réponse</summary>

$\partial_y f(x_0,y_0) = \lim_{k \to 0} \frac{f(x_0,\, y_0+k) - f(x_0,y_0)}{k}$ — la dérivée en $y_0$ de la fonction partielle $y \mapsto f(x_0, y)$.
</details>

**Understanding** — Pourquoi le gradient est-il orthogonal aux lignes de niveau ?
<details><summary>Réponse</summary>

Le long d'une ligne de niveau, $f$ est constante : pour tout vecteur $v$ tangent à la ligne, la dérivée directionnelle $\nabla f \cdot v = 0$. Le gradient est donc perpendiculaire à toute direction tangente au niveau.
</details>

**Application** — $f(x,y) = x\cos(e^{xy})$. Calculez $\partial_x f$ et $\partial_y f$.
<details><summary>Réponse</summary>

$\partial_x f = \cos(e^{xy}) - xy\,e^{xy}\sin(e^{xy})$ (produit + chaîne) ; $\partial_y f = -x^2 e^{xy}\sin(e^{xy})$. (Exercice 3.1.3 du cours.)
</details>

**Application** — La production $N(x,y) = 2x^{2/3}y^{1/3}$ : quelle est l'élasticité de $N$ par rapport au travail $x$ ? Interprétez.
<details><summary>Réponse</summary>

Cobb-Douglas ⟹ $E^x_N = 2/3$ : une hausse de 1 % des heures de travail augmente la production d'environ 0,67 % — rigide (< 1).
</details>

**Exam-style** — $f(x,y) = \frac{x y}{x^2+y^2}$ hors de l'origine et $f(0,0)=0$. Calculez $\partial_x f(0,0)$. La fonction est-elle continue en $(0,0)$ ? Que concluez-vous ?
<details><summary>Réponse</summary>

Par la définition : $\partial_x f(0,0) = \lim_h \frac{f(h,0)-0}{h} = \lim_h \frac{0}{h} = 0$ ; de même $\partial_y f(0,0) = 0$ : $f$ est *dérivable* en $(0,0)$. Pourtant $f(t,t) = \tfrac12 \not\to 0$ : $f$ n'est **pas continue** en $(0,0)$. Conclusion majeure : en plusieurs variables, dérivable n'implique pas continue.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Astuce de calcul de $\partial_x f$ ? | Dériver en traitant $y$ comme une constante |
| Quand revenir à la définition par limite ? | Aux points où $f$ est définie par cas |
| $\nabla f$ et lignes de niveau ? | Orthogonal ; pointe vers la plus forte montée |
| Chain rule $g(t) = f(x(t),y(t))$ ? | $g' = \partial_x f\,x' + \partial_y f\,y'$ |
| Moyen mnémotechnique de la chain rule ? | Somme sur les chemins de l'arbre de dépendance, produit le long de chaque chemin |
| $\partial f/\partial v$ si $f$ différentiable ? | $\nabla f \cdot v$ |
| $\partial_y (x^y)$ ? | $\ln(x)\, x^y$ (écrire $x^y = e^{y \ln x}$) |
| Élasticité de Cobb-Douglas $x^\alpha y^\beta$ ? | $E^x = \alpha$, $E^y = \beta$ — constantes |
| Dérivable ⟹ continue ? | NON en plusieurs variables (ex. $xy/(x^2+y^2)$) |
