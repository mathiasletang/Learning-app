# Fiche 6 — Extrema libres

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Faccanoni, chapitre 4, §4.1, p. 89–96 (+ moindres carrés p. 93) |
| **Difficulté** | 🔴 Must know — le cœur de l'examen |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 3–4 (gradient, hessienne, convexité) |
| **Concepts clés** | Max/min local et global, Weierstrass, Fermat, point critique, condition du 2ᵉ ordre, étude directe |
| **Poids à l'examen** | LA question centrale : « déterminer et classer les extrema de $f$ ». Tombera, sous une forme ou une autre, à chaque épreuve. |

---

## 🎯 Vue d'ensemble

Optimiser, c'est répondre à deux questions que le cours sépare soigneusement : **existe-t-il** un extremum (Weierstrass) ? et **où est-il** (Fermat + classification) ? La mécanique est un entonnoir :

```
1. EXISTENCE   Weierstrass (continue sur compact) — quand applicable
2. CANDIDATS   ∇f = 0  →  points critiques (Fermat, condition nécessaire)
3. NATURE      dét H_f : > 0 extremum (signe de ∂xx f) · < 0 selle · = 0 étude directe
4. GLOBAL ?    convexité, comparaison des valeurs, ou comportement à l'infini
```

Chaque flèche a ses hypothèses et ses pièges : c'est exactement là-dessus que les copies se départagent.

---

## 🟠 Concept 1 — Vocabulaire et existence

**Définition (déf. 4.1).** $f$ admet un **maximum global** en $x_0$ si $f(x) \leq f(x_0)$ pour tout $x \in D$ ; un **maximum local** si c'est vrai dans une boule $B(x_0, r) \cap D$. (Minimum : inégalités inverses.)

**Théorème de Weierstrass (thm. 4.2).**
> $D$ **compact** (fermé **et** borné) et $f$ **continue** sur $D$ ⟹ $f$ atteint un maximum et un minimum globaux sur $D$.

**Intuition et limites.** Fermé : contient sa frontière ; borné : tient dans une boule. Exemples du cours : $[-1;1]^2$ compact ✓ ; $\{x \geq 0, y \geq 0\}$ fermé mais non borné ✗ ; le disque *ouvert* borné mais non fermé ✗. Les extrema garantis peuvent être **au bord** — que Fermat ne détecte pas : sur un compact, il faut étudier l'intérieur (points critiques) *et* la frontière (fiche 7).

---

## 🔴 Concept 2 — Condition nécessaire : Fermat et points critiques

**Théorème de Fermat (thm. 4.3).**
> $D$ **ouvert**, $f \in C^1$, $f$ présente un extremum local en $x_0$ ⟹ $\nabla f(x_0) = 0$.

**Définition (déf. 4.4).** Un point où $\nabla f = 0$ est un **point stationnaire** (ou critique).

**Intuition.** Plan tangent horizontal. Mais attention au sens de l'implication : **extremum ⟹ critique**, jamais l'inverse — le point-selle $f(x,y) = x^2 - y^2$ en $(0,0)$ est critique sans être un extremum (col de montagne : minimum le long de la crête, maximum le long de la route).

---

## 🔴 Concept 3 — Classification : la condition du second ordre

**Théorème (thm. 4.5).** Soit $f \in C^2$, $(x_0,y_0)$ **critique**, et $\det H_f(x_0,y_0) = \partial_{xx}f\,\partial_{yy}f - (\partial_{xy}f)^2$ :

| $\det H_f(x_0,y_0)$ | $\partial_{xx}f(x_0,y_0)$ | Nature |
|---|---|---|
| $> 0$ | $> 0$ | **minimum local** |
| $> 0$ | $< 0$ | **maximum local** |
| $< 0$ | — | **point-selle** (pas un extremum) |
| $= 0$ | — | **on ne peut pas conclure** → étude directe |

**Le cas douteux : l'étude directe (du cours).** Étudier le signe de
$$d(h,k) = f(x_0 + h,\, y_0 + k) - f(x_0, y_0)$$
pour $(h,k)$ voisin de $(0,0)$ : signe constant $\geq 0$ ⟹ minimum local ($\leq 0$ : maximum) ; deux signes ⟹ selle. **Bonus** : si le signe est constant pour $(h,k)$ *quelconque*, l'extremum est **global**.

### Comment résoudre « déterminer les extrema de f » ?

1. **Cadre** : $f$ polynomiale/élémentaire sur un ouvert ⟹ $C^2$, les seuls candidats sont les points critiques (le dire !).
2. **Points critiques** : résoudre le système $\partial_x f = 0$, $\partial_y f = 0$. Soigner la discussion (factoriser, distinguer les cas).
3. **Hessienne** : calculer $\partial_{xx} f, \partial_{yy} f, \partial_{xy} f$, puis $\det H_f$ **en chaque candidat**.
4. **Classer** avec le tableau ; cas $\det = 0$ → étude directe de $d(h,k)$.
5. **Global ?** Trois armes : (a) $f$ convexe/concave sur $D$ ⟹ le min/max local est global ; (b) signe de $d(h,k)$ pour $(h,k)$ quelconque ; (c) comportement à l'infini (si $f \to +\infty$ dans une direction, pas de max global).

**Exemple complet (du cours).** $f(x,y) = x^2 + y^3 - 2xy - y$ sur $\mathbb{R}^2$.
1. Polynôme ⟹ $C^\infty$ sur l'ouvert $\mathbb{R}^2$.
2. $\nabla f = (2x - 2y,\; 3y^2 - 2x - 1) = (0,0)$. De la première : $x = y$ ; en substituant : $3y^2 - 2y - 1 = 0 \Rightarrow y = 1$ ou $y = -\tfrac13$. **Candidats** : $(1,1)$ et $\left(-\tfrac13, -\tfrac13\right)$.
3. $H_f(x,y) = \begin{pmatrix} 2 & -2 \\ -2 & 6y \end{pmatrix}$, $\det H_f = 12y - 4$.
4. En $(1,1)$ : $\det = 8 > 0$, $\partial_{xx} f = 2 > 0$ ⟹ **minimum local**. En $\left(-\tfrac13,-\tfrac13\right)$ : $\det = -8 < 0$ ⟹ **point-selle**.
5. Global ? $f(0, y) = y^3 - y \to \pm\infty$ : ni max ni min **globaux**. Le minimum de l'étape 4 reste local.

**Exemple « cas douteux » type.** $f(x,y) = x^2 + y^4$ : en $(0,0)$, $\det H_f = 0$. Étude directe : $d(h,k) = h^2 + k^4 \geq 0$ pour tout $(h,k)$ ⟹ **minimum global**. (Alors que $f(x,y) = x^2 + y^3$ : $d(0,k) = k^3$ change de signe ⟹ selle. Même hessienne, natures opposées — d'où l'impossibilité de conclure par $H$.)

---

## 🟡 Concept 4 — Application : les moindres carrés

Le cours (§4.1.1) applique la machinerie au problème d'ajuster une droite $y = mx + q$ à $n$ points $(x_i, y_i)$ : minimiser
$$E(m, q) = \sum_{i=1}^n \big(y_i - (m x_i + q)\big)^2.$$
On annule $\nabla E$ (deux équations linéaires — les *équations normales*), et la hessienne est définie positive : l'unique point critique est le minimum global. C'est la **droite de régression** — à savoir reconstruire, elle sert aussi en statistiques et en économétrie.

---

## ⚠️ Common mistakes

1. **Conclure « extremum » dès que $\nabla f = 0$** — Fermat est une condition *nécessaire*. Il faut classer.
2. **Se tromper dans le tableau** : $\det < 0$ = selle *toujours* (peu importe $\partial_{xx}f$) ; l'extremum exige $\det > 0$.
3. **Cas $\det = 0$ expédié** — « on ne peut pas conclure » n'est pas une réponse finale : l'étude directe de $d(h,k)$ s'impose.
4. **Confondre local et global** — la hessienne ne donne que du *local*. Global = convexité, ou signe de $d$ partout, ou argument d'infini.
5. **Oublier la frontière** quand le domaine n'est pas ouvert — Fermat ne voit pas les bords (Weierstrass peut y placer les extrema).
6. **Erreurs de résolution du système** $\nabla f = 0$ — diviser par une quantité qui peut être nulle fait perdre des candidats ; factoriser plutôt.
7. **Évaluer la hessienne « en général » et pas au point critique** — les signes doivent être pris *au candidat*.

---

## 📌 Ultimate Review

1. Weierstrass : continue sur compact ⟹ max et min globaux existent (peut-être au bord).
2. Fermat (ouvert, $C^1$) : extremum local ⟹ $\nabla f = 0$. Jamais la réciproque.
3. Tableau de classification : $\det H > 0$ + signe de $\partial_{xx} f$ ⟹ min/max local ; $\det < 0$ ⟹ selle ; $\det = 0$ ⟹ étude directe.
4. Étude directe : signe de $d(h,k) = f(x_0+h, y_0+k) - f(x_0,y_0)$ ; signe constant partout ⟹ global.
5. Global : convexité (fiche 4) ou comportement à l'infini.
6. Moindres carrés : minimiser $\sum (y_i - mx_i - q)^2$, équations normales, min global.
7. Un point-selle est un col : critique, pas extrémal.

**Formulas to know**
$$\nabla f = 0 \quad ; \quad \det H_f = \partial_{xx}f\,\partial_{yy}f - (\partial_{xy}f)^2 \quad ; \quad d(h,k) = f(x_0{+}h, y_0{+}k) - f(x_0,y_0)$$

**Methods to know** : le protocole complet en 5 étapes ; l'étude directe ; l'argument de globalité.

---

## 🧠 Active Recall

**Basic** — Énoncez le théorème de Weierstrass et définissez « compact ».
<details><summary>Réponse</summary>

Sur un compact (fermé + borné) de $\mathbb{R}^n$, toute fonction continue atteint un maximum et un minimum globaux. Fermé : contient sa frontière ; borné : inclus dans une boule de rayon fini.
</details>

**Understanding** — Pourquoi $\det H_f = 0$ ne permet-il pas de conclure ? Donnez deux fonctions le prouvant.
<details><summary>Réponse</summary>

Le terme d'ordre 2 du développement s'annule dans une direction : la nature dépend des ordres supérieurs. $f = x^2 + y^4$ (minimum global) et $f = x^2 + y^3$ (selle) ont exactement la même hessienne en $(0,0)$.
</details>

**Application** — Classez les points critiques de $f(x,y) = x^2 + y^2 - 2x - 4y$.
<details><summary>Réponse</summary>

$\nabla f = (2x-2,\, 2y-4) = 0$ en $(1,2)$ unique. $H_f = \operatorname{diag}(2,2)$, $\det = 4 > 0$, $\partial_{xx} = 2 > 0$ : minimum local ; et $d(h,k) = h^2 + k^2 \geq 0$ pour tous $(h,k)$ ⟹ minimum **global**. (Exemple du cours.)
</details>

**Comparison** — Fermat vs condition du second ordre : que donne chacune ?
<details><summary>Réponse</summary>

Fermat (ordre 1) : *filtre* les candidats — condition nécessaire, ne classe rien. Le second ordre (hessienne) : *classe* les candidats — condition suffisante quand $\det \neq 0$.
</details>

**Exam-style** — Une fonction $C^2$ strictement convexe sur $\mathbb{R}^2$ possède un point critique. Que peut-on conclure, et pourquoi ?
<details><summary>Réponse</summary>

C'est un minimum **global** (unique) : pour une fonction convexe, le graphe est au-dessus de son plan tangent en ce point, qui est horizontal — donc $f(x) \geq f(x_0)$ partout.
</details>

---

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Weierstrass : hypothèses ? | $f$ continue, $D$ compact (fermé + borné) |
| Fermat : énoncé exact ? | Ouvert + $C^1$ + extremum local ⟹ $\nabla f = 0$ (nécessaire seulement) |
| $\det H > 0$, $\partial_{xx}f > 0$ ? | Minimum local |
| $\det H > 0$, $\partial_{xx}f < 0$ ? | Maximum local |
| $\det H < 0$ ? | Point-selle, quel que soit $\partial_{xx} f$ |
| $\det H = 0$ ? | Aucune conclusion — étude directe de $d(h,k)$ |
| Étude directe : quoi calculer ? | Signe de $f(x_0+h, y_0+k) - f(x_0,y_0)$ près de $(0,0)$ |
| Quand un extremum local est-il global ? | $f$ convexe/concave, ou $d$ de signe constant partout |
| Un point-selle, en image ? | Un col : min sur la crête, max sur la route |
| Moindres carrés : fonction minimisée ? | $\sum_i (y_i - mx_i - q)^2$ |
