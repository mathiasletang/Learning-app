# Fiche 13 — Optimisation sous contraintes : Lagrange-KKT

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Garrigos, chapitre V, p. 83–124 |
| **Difficulté** | 🔴 Must know — le sommet du cours |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 7, 10, 11 (Lagrange à égalités, Fermat intérieur, convexité) |
| **Concepts clés** | Polyèdres, contraintes actives, qualification, stationnarité, complémentarité, système KKT |
| **Poids à l'examen** | L'exercice « résoudre le système KKT » est l'aboutissement du programme — c'est lui qui départage les copies. La complémentarité ($\alpha_i g_i = 0$) structure toute la résolution. |

## 🎯 Vue d'ensemble

La fiche 7 traitait les contraintes d'**égalité** (Lagrange classique). Garrigos généralise aux **inégalités** $g_i(x) \leq 0$ — le cas réellement courant (budgets, capacités, positivité). L'idée-force : au bord, Fermat devient « $\nabla f(\bar x) + \text{gradient de la contrainte} = 0$ », et le signe du multiplicateur encode *de quel côté* la contrainte pousse.

```
Fermat (intérieur)          ∇f = 0
Une inégalité g ≤ 0 (bord)  ∇f + α∇g = 0,  α ≥ 0,  αg(x̄) = 0   (complémentarité)
Contraintes mixtes          ∇f + Σ αi∇gi + Σ βj∇hj = 0
                            αi ≥ 0 (inégalités) · βj libres (égalités) · αi gi = 0
Hypothèse : contrainte RÉGULIÈRE (affine, ou gradients actifs indépendants)
```

## 🟡 Concept 1 — Le décor : polyèdres et optimisation linéaire

**Définition (V.3).** Un **polyèdre** est $C = \{x \mid Ax \preceq b\}$ — une intersection **finie de demi-espaces** (remarque V.4). Boîtes $\{\alpha_i \leq x_i \leq \beta_i\}$, sous-espaces affines $[Ax = b]$ : tous des polyèdres, tous **convexes**.

**Définition (V.11).** L'**optimisation linéaire** (LP) : minimiser $\langle c, x\rangle$ sous $Ax \preceq b$ — objectif linéaire, contrainte polyédrale. Exemple historique du cours : le transport optimal de Monge.

## 🔴 Concept 2 — Une inégalité simple : d'où viennent les conditions

**Proposition (V.21).** $\bar x$ minimiseur local de $f$ sur $C = [g \leq 0]$, avec $\nabla g(\bar x) \neq 0$ (**qualification**) :
$$\exists\, \alpha \geq 0 : \quad \nabla f(\bar x) + \alpha\,\nabla g(\bar x) = 0, \qquad \alpha\, g(\bar x) = 0.$$

**Le vocabulaire officiel (remarque V.22) — à employer tel quel en copie** :
- **Admissibilité** : $g(\bar x) \leq 0$ ($\bar x$ respecte la contrainte).
- Contrainte **active** en $\bar x$ si $g(\bar x) = 0$ (on est sur le bord), **inactive** si $g(\bar x) < 0$.
- **Stationnarité** : $\nabla f + \alpha\nabla g = 0$.
- **Complémentarité** : $\alpha\, g(\bar x) = 0$ — *si la contrainte est inactive, son multiplicateur est nul*, et la stationnarité redevient $\nabla f = 0$ (Fermat intérieur).
- **Qualification** : $\nabla g(\bar x) \neq 0$ — sans elle, le théorème peut échouer (exercice V.26 du cours : contrainte non régulière, minimiseurs qui ne vérifient pas KKT).

**Intuition de la preuve (du cours).** Si $\nabla f(\bar x)$ n'était pas colinéaire à $\nabla g(\bar x)$, on trouverait une *direction de descente commune* à $f$ et $g$ (surjectivité) : on améliorerait $f$ tout en restant admissible — contradiction. Et si $\alpha < 0$, $-\nabla f$ redeviendrait une telle direction. Le signe $\alpha \geq 0$ dit que **le gradient de $f$ pousse vers l'extérieur** de la contrainte.

## 🔴 Concept 3 — Le théorème général de Lagrange-KKT

**Définitions préalables.** Contraintes **actives** en $x$ : $I(x) = \{i \mid g_i(x) = 0\}$ (déf. V.28 — la notion n'a de sens que pour les inégalités, remarque V.29). La contrainte mixte est **qualifiée** en $x$ si la famille $\{\nabla g_i(x)\}_{i \in I(x)} \cup \{\nabla h_j(x)\}_j$ est **libre** (déf. V.30) ; elle est **régulière** si toutes les fonctions sont affines **ou** si elle est qualifiée (déf. V.33).

**Théorème V.34 (CNO de KKT du 1ᵉʳ ordre).**
> $f, g_1, \dots, g_p, h_1, \dots, h_q \in C^1$, $C = \bigcap_i [g_i \leq 0] \cap \bigcap_j [h_j = 0]$, $\bar x$ minimiseur local de $f$ sur $C$, contrainte **régulière** en $\bar x$. Alors il existe $\alpha \in \mathbb{R}^p$, $\beta \in \mathbb{R}^q$ :
> $$\begin{cases} \nabla f(\bar x) + \sum_{i=1}^p \alpha_i \nabla g_i(\bar x) + \sum_{j=1}^q \beta_j \nabla h_j(\bar x) = 0 & \text{(stationnarité)}\\[2pt] g_i(\bar x) \leq 0, \quad h_j(\bar x) = 0 & \text{(admissibilité)}\\[2pt] \alpha_i \geq 0 & \text{(multiplicateurs : inégalités)}\\[2pt] \alpha_i\, g_i(\bar x) = 0 & \text{(complémentarité)} \end{cases}$$
> Les $\beta_j$ (égalités) sont **de signe libre**.

Un point vérifiant ce système est un **point critique du problème** (remarque V.35) — un *candidat*, exactement comme en optimisation libre.

### Comment résoudre un système KKT (la méthode qui marche)

1. **Écrire le système complet** (stationnarité + admissibilité + signes + complémentarité).
2. **Discuter par cas sur les contraintes actives** : la complémentarité dit que pour chaque inégalité, *soit* $\alpha_i = 0$, *soit* $g_i(x) = 0$. Avec $p$ inégalités, au plus $2^p$ cas — en pratique 2 ou 4 :
   - **Cas « inactive »** ($\alpha_i = 0$) : résoudre la stationnarité sans cette contrainte, puis **vérifier l'admissibilité** $g_i(x) < 0$ ;
   - **Cas « active »** ($g_i(x) = 0$) : résoudre avec l'équation du bord, puis **vérifier le signe** $\alpha_i \geq 0$.
3. **Éliminer** les cas incohérents (signe négatif, inadmissible).
4. **Conclure** : parmi les candidats survivants, identifier le minimiseur (existence par coercivité/compacité + comparaison des valeurs ; ou convexité : voir ci-dessous).
5. **Vérifier la régularité** de la contrainte aux candidats (affine ⟹ automatique).

**Le cas confortable — convexe.** Si $f$ est convexe et les contraintes affines (ou $g_i$ convexes), le point KKT n'est plus seulement candidat : c'est un **minimiseur global** (le cours le formalise au thm. V.39, pendant contraint du « point critique = min global »).

**Exemple type (exercice V.24 du cours).** Minimiser $f(x,y) = \tfrac12(x^2+y^2) - 2x$ sur $C = \{x + y \leq 1\}$.
1. Existence : $f$ fortement convexe ⟹ minimiseur unique sur le convexe fermé $C$.
2. KKT ($g = x + y - 1$, affine ⟹ régulière) : $\begin{cases} x - 2 + \alpha = 0 \\ y + \alpha = 0 \\ \alpha \geq 0,\ x + y \leq 1,\ \alpha(x+y-1) = 0\end{cases}$
3. **Cas inactive** ($\alpha = 0$) : $(x,y) = (2, 0)$ ; admissibilité : $2 + 0 = 2 > 1$ ✗.
4. **Cas active** ($x + y = 1$) : $x = 2 - \alpha$, $y = -\alpha$, somme $= 2 - 2\alpha = 1 \Rightarrow \alpha = \tfrac12 \geq 0$ ✓, $(x,y) = \left(\tfrac32, -\tfrac12\right)$.
5. Unique candidat + existence + convexité ⟹ **minimiseur global** $\left(\tfrac32, -\tfrac12\right)$. La contrainte est active : l'optimum libre $(2,0)$ violait le budget, la solution s'est plaquée au bord.

## ⚠️ Common mistakes

1. **Se tromper de signe sur les multiplicateurs** — $\alpha_i \geq 0$ pour les *inégalités* (écrites $g_i \leq 0$, stationnarité écrite avec $+$), $\beta_j$ **libres** pour les égalités. Toujours normaliser les contraintes en $g \leq 0$ d'abord.
2. **Oublier la complémentarité** — c'est elle qui structure la discussion par cas ; sans elle le système est sous-déterminé.
3. **Oublier de vérifier l'admissibilité dans le cas « inactive »** (ou le signe dans le cas « active ») — la moitié des candidats s'éliminent là.
4. **Ignorer la qualification** — l'exercice V.26 du cours construit un minimiseur qui ne vérifie *pas* KKT car la contrainte n'y est pas qualifiée. Contraintes affines : régularité automatique, dites-le.
5. **Croire qu'un point KKT est un minimiseur** — candidat seulement, sauf convexité.
6. **Compter les contraintes actives dans $I(x)$ pour les égalités** — la notion d'« active » ne concerne que les inégalités.

## 📌 Ultimate Review

1. Polyèdre = intersection finie de demi-espaces $[Ax \preceq b]$ ; toujours convexe.
2. Une inégalité : $\nabla f + \alpha\nabla g = 0$, $\alpha \geq 0$, $\alpha g(\bar x) = 0$, sous $\nabla g(\bar x) \neq 0$.
3. Vocabulaire : admissibilité, activité, stationnarité, complémentarité, qualification — les cinq mots de la copie.
4. Général : stationnarité avec $\sum\alpha_i\nabla g_i + \sum\beta_j\nabla h_j$ ; $\alpha_i \geq 0$, $\beta_j$ libres ; complémentarité par inégalité.
5. Qualification : gradients **actifs** libres ; régulière = affine OU qualifiée.
6. Résolution = discussion par cas actifs/inactifs + vérifications croisées (admissibilité / signe).
7. Convexe + KKT ⟹ minimiseur global ; sinon, candidats à départager par existence + comparaison.
8. Contrainte inactive ⟹ multiplicateur nul ⟹ retour à Fermat.

**Formulas to know** — le système KKT complet (les 4 blocs), et le cas simple $\nabla f + \alpha\nabla g = 0$, $\alpha g = 0$, $\alpha \geq 0$.

## 🧠 Active Recall

**Basic** — Écrivez le système KKT pour une contrainte mixte $\{g_1 \leq 0, h_1 = 0\}$.
<details><summary>Réponse</summary>

$\nabla f + \alpha_1\nabla g_1 + \beta_1\nabla h_1 = 0$ ; $g_1(x) \leq 0$ ; $h_1(x) = 0$ ; $\alpha_1 \geq 0$ ; $\alpha_1 g_1(x) = 0$. ($\beta_1$ libre.)
</details>

**Understanding** — Pourquoi le multiplicateur d'une inégalité est-il positif, alors que celui d'une égalité est libre ?
<details><summary>Réponse</summary>

Une inégalité $g \leq 0$ n'interdit qu'un seul côté : à l'optimum au bord, $\nabla f$ doit pointer vers l'*extérieur* (sinon on pourrait descendre en restant admissible), d'où $\nabla f = -\alpha\nabla g$ avec $\alpha \geq 0$. Une égalité bloque les deux côtés : aucune orientation n'est privilégiée, $\beta$ peut prendre n'importe quel signe.
</details>

**Application** — Minimisez $f(x,y) = 2x - y$ sur $C = \{\tfrac12 x^2 + y^2 \leq 1\}$ (exercice V.25 du cours).
<details><summary>Réponse</summary>

Existence : $C$ compact, $f$ continue (Bolzano). $g = \tfrac12 x^2 + y^2 - 1$, $\nabla g = (x, 2y)$, nul seulement en $(0,0) \notin \partial C$ : qualifiée. Cas inactive : $\nabla f = (2,-1) \neq 0$ ✗ — la contrainte est forcément active. Cas actif : $2 + \alpha x = 0$, $-1 + 2\alpha y = 0$, $\tfrac12x^2 + y^2 = 1$. D'où $x = -2/\alpha$, $y = 1/(2\alpha)$ ; le bord donne $\tfrac{2}{\alpha^2} + \tfrac{1}{4\alpha^2} = 1 \Rightarrow \alpha = \tfrac32 \geq 0$ ✓. Minimiseur : $\left(-\tfrac43, \tfrac13\right)$, valeur $-3$.
</details>

**Comparison** — KKT (Garrigos) vs multiplicateurs de Lagrange (fiche 7, Faccanoni) : qu'est-ce qui change ?
<details><summary>Réponse</summary>

Lagrange classique : contraintes d'égalité seulement, multiplicateurs libres. KKT ajoute les inégalités : multiplicateurs positifs, complémentarité $\alpha_i g_i = 0$ (qui crée la discussion actifs/inactifs), et une qualification portant sur les seuls gradients actifs. À égalités seules, KKT redonne exactement Lagrange.
</details>

**Exam-style** — Dans un problème de consommateur avec budget $\langle p, x\rangle \leq R$, que signifie économiquement « contrainte active » et « $\alpha > 0$ » ?
<details><summary>Réponse</summary>

Active : le budget est entièrement dépensé (l'optimum est sur le bord). $\alpha > 0$ : le budget est *contraignant* — un euro de plus augmenterait strictement l'utilité optimale, $\alpha$ mesurant cette utilité marginale du revenu. $\alpha = 0$ (inactive) : l'optimum n'épuise pas le budget, le relâcher ne change rien.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Système KKT (4 blocs) ? | Stationnarité · admissibilité · $\alpha_i \geq 0$ · complémentarité $\alpha_i g_i = 0$ |
| Signe des multiplicateurs ? | $\alpha_i \geq 0$ (inégalités $g_i \leq 0$) ; $\beta_j$ libres (égalités) |
| Complémentarité ? | $\alpha_i g_i(\bar x) = 0$ : contrainte inactive ⟹ multiplicateur nul |
| Contrainte active ? | $g_i(\bar x) = 0$ — on est sur le bord (inégalités seulement) |
| Qualification (cas général) ? | Gradients des contraintes ACTIVES + égalités : famille libre |
| Régulière ? | Toutes affines, OU qualifiée |
| Méthode de résolution ? | Discussion par cas actifs/inactifs + vérifier admissibilité et signes |
| Point KKT = minimiseur ? | Candidat seulement — sauf problème convexe : alors global |
| Polyèdre ? | $[Ax \preceq b]$ : intersection finie de demi-espaces, convexe |
| KKT à égalités seules ? | Redonne le théorème de Lagrange (fiche 7), $\beta$ libres |
