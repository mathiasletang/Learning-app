# Fiche 5 — Fonctions implicites

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Faccanoni, chapitre 3, §3.4, p. 45–46 |
| **Difficulté** | 🟠 Should know |
| **Temps d'étude estimé** | 45 min |
| **Prérequis** | Fiches 3–4 (chain rule, $C^1$) |
| **Concepts clés** | Théorème des fonctions implicites, dérivation implicite, tangente à une courbe de niveau |
| **Poids à l'examen** | Question type : « montrer que $f(x,y)=0$ définit $y = \varphi(x)$ au voisinage de tel point, calculer $\varphi'$ et la tangente ». Aussi l'outil caché derrière la méthode de réduction (fiche 7). |

## 🎯 Vue d'ensemble

Une équation $f(x,y) = 0$ dessine une courbe. Peut-on la lire comme le graphe d'une fonction $y = \varphi(x)$ ? Globalement, rarement (le cercle échoue) ; **localement**, oui — sous une condition simple : $\partial_y f \neq 0$. Le théorème des fonctions implicites donne l'existence de $\varphi$, **et** une formule pour $\varphi'$ sans jamais résoudre l'équation. C'est de la chain rule déguisée, et c'est l'outil qui justifie la dérivation « le long d'une contrainte » (fiche 7).

## 🔴 Concept — Le théorème des fonctions implicites

**Théorème (3.24, deux variables).**
> Soit $f : D \subset \mathbb{R}^2 \to \mathbb{R}$ de classe $C^1$ au voisinage de $(x_0, y_0)$, avec $f(x_0,y_0) = k$ et $\partial_y f(x_0,y_0) \neq 0$. Alors il existe un intervalle ouvert $I \ni x_0$ et **une unique** fonction $\varphi : I \to \mathbb{R}$ de classe $C^1$ telle que :
> 1. $\varphi(x_0) = y_0$ ;
> 2. $f(x, \varphi(x)) = k$ pour tout $x \in I$ ;
> 3. $\displaystyle \varphi'(x) = -\frac{\partial_x f(x, \varphi(x))}{\partial_y f(x, \varphi(x))}$ ;
> 4. la tangente en $x_0$ : $y = \varphi'(x_0)(x - x_0) + y_0$.

**Intuition.** $\partial_y f \neq 0$ signifie que la courbe de niveau n'est pas « verticale » en ce point : localement, à chaque $x$ correspond un seul $y$ sur la courbe. Le cercle $x^2 + y^2 = 1$ en $(1, 0)$ : $\partial_y f = 2y = 0$ — précisément là où le cercle est vertical et où *deux* branches $y = \pm\sqrt{1-x^2}$ se rejoignent (exemple du cours).

**D'où vient la formule ?** Chain rule sur l'identité $f(x, \varphi(x)) = k$ :
$$\partial_x f + \partial_y f \cdot \varphi'(x) = 0 \implies \varphi'(x) = -\frac{\partial_x f}{\partial_y f}.$$
En dérivant *encore* l'identité, on obtient $\varphi''$ (formule au cours, à savoir retrouver plutôt qu'apprendre) :
$$\varphi'' = -\frac{\partial_{xx}f + \big(\partial_{xy}f + \partial_{yy}f\,\varphi'\big)\varphi'}{\partial_y f}.$$

**Version trois variables (thm. 3.25).** Si $f(x_0,y_0,z_0) = k$ et $\partial_z f \neq 0$, alors $z = \varphi(x,y)$ localement, avec
$$\partial_x \varphi = -\frac{\partial_x f}{\partial_z f}, \qquad \partial_y \varphi = -\frac{\partial_y f}{\partial_z f}.$$
(C'est la pente du plan tangent à une **surface** de niveau.)

### Comment résoudre l'exercice type ?

1. **Vérifier le point** : calculer $f(x_0, y_0)$ et confirmer qu'il vaut bien $k$.
2. **Vérifier l'hypothèse** : $\partial_y f(x_0,y_0) \neq 0$ (et citer $f \in C^1$, souvent évident).
3. **Conclure à l'existence** de $\varphi$ (citer le théorème).
4. **Calculer $\varphi'(x_0)$** par la formule $-\partial_x f/\partial_y f$ évaluée au point.
5. **Écrire la tangente** $y = \varphi'(x_0)(x - x_0) + y_0$ si demandé.

**Comment savoir que c'est cet outil qu'il faut ?** Dès que l'énoncé donne *une équation* (pas une fonction explicite) et demande une dérivée, une tangente, ou « au voisinage de tel point ».

**Exemple complet (du cours).** $f(x,y) = y^2 - y - 3x$, point $(2, -2)$.
1. $f(2,-2) = 4 + 2 - 6 = 0$ ✓.
2. $\partial_y f = 2y - 1$, en $(2,-2)$ : $-5 \neq 0$ ✓.
3. Donc $y = \varphi(x)$ existe localement, avec $\varphi(2) = -2$.
4. $\varphi'(x) = -\frac{-3}{2\varphi(x) - 1} = \frac{3}{2\varphi(x)-1}$, d'où $\varphi'(2) = \frac{3}{-5} = -\frac35$.
5. Tangente : $y = -\frac35(x-2) - 2 = -\frac35 x - \frac45$.
(Ici on peut vérifier : $y = \frac{1 - \sqrt{12x+1}}{2}$ est la branche passant par $(2,-2)$.)

### Exercices résolus

**🟢 Niveau 1** — L'ellipse $x^2 + 4y^2 = 8$ au point $(2, 1)$ : existence de $\varphi$ et pente de la tangente.
<details><summary>Correction</summary>

$f(2,1) = 4 + 4 = 8$ ✓ ; $\partial_y f = 8y = 8 \neq 0$ ✓ ⟹ $y = \varphi(x)$ existe. $\varphi'(2) = -\dfrac{2x}{8y}\Big|_{(2,1)} = -\dfrac{4}{8} = -\dfrac12$. Tangente : $y = -\tfrac12(x-2) + 1$.
</details>

**🟡 Niveau 2 — dérivée seconde** — Reprendre $y^2 - y - 3x = 0$ en $(2,-2)$ et calculer $\varphi''(2)$. La courbe est-elle localement convexe ou concave ?
<details><summary>Correction</summary>

Redériver l'identité $2\varphi\varphi' - \varphi' - 3 = 0$ (déjà dérivée une fois) : $2(\varphi')^2 + 2\varphi\varphi'' - \varphi'' = 0$, d'où $\varphi'' = \dfrac{-2(\varphi')^2}{2\varphi - 1}$. En $(2,-2)$ : $\varphi'' = \dfrac{-2 \cdot \tfrac{9}{25}}{-5} = \dfrac{18}{125} > 0$ ⟹ la branche est localement **convexe**. **Interprétation** : le signe de $\varphi''$ se lit sans jamais expliciter $\varphi$ — tout sort de l'identité dérivée deux fois.
</details>

**🟠 Niveau 3 — trois variables** — La surface $x^2 + y^2 + z^2 - xyz = 4$ au point $(0, 0, 2)$ : montrer que $z = \varphi(x,y)$ localement et écrire le plan tangent.
<details><summary>Correction</summary>

$f(0,0,2) = 4$ ✓ ; $\partial_z f = 2z - xy = 4 \neq 0$ ✓ ⟹ $\varphi$ existe. $\partial_x \varphi = -\dfrac{2x - yz}{2z - xy}\Big|_{(0,0,2)} = 0$ ; $\partial_y \varphi = -\dfrac{2y - xz}{2z - xy}\Big|_{(0,0,2)} = 0$. Plan tangent : $z = 2$ — horizontal : le point est un « sommet » local de la surface de niveau.
</details>

**🔴 Niveau 4 — le piège du point singulier** — Que dire de $y^2 = x^3$ (courbe $f = y^2 - x^3 = 0$) au voisinage de $(0,0)$ ?
<details><summary>Correction</summary>

*Approche naïve* : appliquer la formule $\varphi' = 3x^2/2y$ — mais en $(0,0)$, $\partial_y f = 2y = 0$ **et** $\partial_x f = -3x^2 = 0$ : aucune des deux versions du théorème ne s'applique (on ne peut ni exprimer $y(x)$, ni $x(y)$ par le théorème).
*Ce qui se passe réellement* : la courbe a un **point de rebroussement** en $(0,0)$ (deux branches $y = \pm x^{3/2}$ qui se rejoignent en pointe). Quand les deux dérivées partielles s'annulent, le point est *singulier* : le théorème est muet, et la géométrie peut être pathologique. À l'examen : signaler l'échec des hypothèses est la réponse attendue.
</details>

## ⚠️ Common mistakes

1. **Oublier le signe moins** dans $\varphi' = -\partial_x f / \partial_y f$ — l'erreur n° 1, catastrophique en cascade.
2. **Inverser numérateur et dénominateur** — au numérateur : la dérivée par rapport à la variable *libre* ($x$) ; au dénominateur : celle par rapport à la variable *exprimée* ($y$).
3. **Ne pas vérifier $\partial_y f \neq 0$** — c'est l'hypothèse qui fait tout ; en un point où elle échoue, il n'y a souvent *pas* de fonction implicite (cercle en $(1,0)$).
4. **Oublier de vérifier que le point est sur la courbe** ($f(x_0,y_0) = k$) avant tout.
5. Si $\partial_y f = 0$ mais $\partial_x f \neq 0$ : on peut exprimer **$x = \psi(y)$** — le théorème marche en échangeant les rôles.

## 📌 Ultimate Review

1. Hypothèses : $f \in C^1$, $f(x_0,y_0) = k$, $\partial_y f(x_0,y_0) \neq 0$.
2. Conclusion : $y = \varphi(x)$ unique, $C^1$, localement.
3. $\varphi' = -\dfrac{\partial_x f}{\partial_y f}$ — retrouvable en 5 secondes par chain rule sur $f(x,\varphi(x)) = k$.
4. Tangente : $y = \varphi'(x_0)(x-x_0) + y_0$.
5. Trois variables : $z = \varphi(x,y)$, $\partial_x \varphi = -\partial_x f/\partial_z f$, $\partial_y \varphi = -\partial_y f/\partial_z f$.
6. $\partial_y f = 0$ : point suspect (tangente verticale, croisement de branches) ; essayer $x = \psi(y)$.

## 🧠 Active Recall

**Basic** — Donnez la formule de $\varphi'(x)$ et ses hypothèses.
<details><summary>Réponse</summary>

Sous $f \in C^1$, $f(x_0,y_0)=k$, $\partial_y f(x_0,y_0) \neq 0$ : $\varphi'(x) = -\partial_x f(x,\varphi(x)) / \partial_y f(x,\varphi(x))$.
</details>

**Understanding** — Retrouvez cette formule par la chain rule.
<details><summary>Réponse</summary>

$f(x, \varphi(x)) = k$ pour tout $x$ ; on dérive : $\partial_x f \cdot 1 + \partial_y f \cdot \varphi'(x) = 0$, d'où la formule en isolant $\varphi'$.
</details>

**Application** — L'équation $x^2 + y^2 = 1$ définit-elle $y = \varphi(x)$ au voisinage de $(0, 1)$ ? de $(1, 0)$ ?
<details><summary>Réponse</summary>

En $(0,1)$ : $\partial_y f = 2y = 2 \neq 0$ ⟹ oui ($\varphi(x) = \sqrt{1-x^2}$, $\varphi'(0) = 0$). En $(1,0)$ : $\partial_y f = 0$ ⟹ le théorème ne s'applique pas — et de fait, aucune fonction $y(x)$ ne décrit le cercle près de ce point (tangente verticale).
</details>

**Exam-style** — Sans résoudre, calculez la pente de la tangente à la courbe $e^{xy} + x - y = 1$ au point $(0, 0)$.
<details><summary>Réponse</summary>

$f = e^{xy} + x - y$, $f(0,0) = 1$ ✓. $\partial_x f = ye^{xy} + 1 \to 1$ ; $\partial_y f = xe^{xy} - 1 \to -1 \neq 0$. $\varphi'(0) = -\frac{1}{-1} = 1$ : tangente $y = x$.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| $\varphi'(x)$ pour $f(x,\varphi(x)) = k$ ? | $-\partial_x f / \partial_y f$ (signe moins !) |
| Hypothèse cruciale du théorème ? | $\partial_y f(x_0,y_0) \neq 0$ |
| Que signifie $\partial_y f = 0$ géométriquement ? | Tangente verticale de la courbe de niveau — pas de $y = \varphi(x)$ local |
| Trois variables, $z = \varphi(x,y)$ ? | $\partial_x\varphi = -\partial_x f/\partial_z f$, $\partial_y\varphi = -\partial_y f/\partial_z f$ |
| Comment retrouver la formule en examen ? | Dériver l'identité $f(x, \varphi(x)) = k$ par la chain rule |
