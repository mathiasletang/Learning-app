# Fiche 2 — Limites et continuité

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Faccanoni, *Optimisation L3*, chapitre 2, p. 15–26 |
| **Difficulté** | 🟡 Intermédiaire |
| **Temps d'étude estimé** | 1 h 15 |
| **Prérequis** | Fiche 1 ; limites d'une variable |
| **Concepts clés** | Normes, boules, limite en un point, coordonnées polaires, continuité, prolongement |
| **Poids à l'examen** | L'exercice « la limite existe-t-elle ? » est un classique absolu. La technique polaire est l'outil n° 1. |

## 🎯 Vue d'ensemble

En une variable, on approche un point par la gauche ou par la droite. Dans le plan, on peut l'approcher par **une infinité de chemins** : droites, paraboles, spirales… C'est *le* saut conceptuel du chapitre, et la source de tous les pièges. Le cours construit d'abord les outils de mesure de distance (**normes**, **boules**), définit la limite, puis donne les deux armes pratiques : les **restrictions à des courbes** (pour montrer qu'une limite n'existe PAS) et les **coordonnées polaires** (pour montrer qu'elle existe).

```
Norme ‖·‖  →  Boule B(A,r)  →  Limite (déf. ε-δ)
                                ├── N'existe pas ? → deux chemins, deux limites ≠
                                └── Existe ?       → majoration polaire |f − ℓ| ≤ s(r) → 0
Limite = f(A)  →  Continuité  →  Prolongement par continuité
```

**Connexion** : la continuité est la brique de Weierstrass (fiche 6) ; le critère de différentiabilité (fiche 4) est *une limite de ce type* — cette fiche est donc un outil permanent.

## 🟡 Concept 1 — Normes et boules

**Définition (déf. 2.1).**
> Une **norme** sur $\mathbb{R}^n$ est une application $N : \mathbb{R}^n \to [0; +\infty[$ telle que :
> 1. $N(x) = 0 \iff x = 0$ (séparation) ;
> 2. $N(\lambda x) = |\lambda| N(x)$ (homogénéité) ;
> 3. $N(x+y) \leq N(x) + N(y)$ (inégalité triangulaire).
> On note $\lVert x \rVert$.

**Normes classiques** : $\lVert x \rVert_p = \big(\sum_i \lvert x_i\rvert^p\big)^{1/p}$ et $\lVert x \rVert_\infty = \sup_i \lvert x_i \rvert$. Pour $p = 2$ : **norme euclidienne**.

**Exemple (du cours).** Pour $(5,2)$ : $\lVert\cdot\rVert_1 = 7$, $\lVert\cdot\rVert_2 = \sqrt{29} \approx 5{,}39$, $\lVert\cdot\rVert_\infty = 5$.

**Définition (déf. 2.3).** La **boule ouverte** $B(A,r) = \{x \mid \lVert x - A\rVert < r\}$ ; fermée avec $\leq$.

**Intuition.** La « boule » unité n'est ronde que pour $\lVert\cdot\rVert_2$ : c'est un carré pointe en haut pour $\lVert\cdot\rVert_1$, un carré droit pour $\lVert\cdot\rVert_\infty$. Le mot boule est plus général que dans la vie courante — remarque explicite du cours.

**À retenir** — Les trois axiomes ; les trois boules dessinées ; et surtout : *l'existence et la valeur d'une limite ne dépendent pas de la norme choisie* (propriété 2.5).

## 🔴 Concept 2 — Limite en un point

**Définition (déf. 2.4).**
> $f$ a pour limite $\ell \in \mathbb{R}$ en $A$, noté $\lim_{x \to A} f(x) = \ell$, si pour tout $\varepsilon > 0$ il existe $\delta > 0$ tel que
> $$x \in D \setminus \{A\} \text{ et } \lVert x - A \rVert < \delta \implies |f(x) - \ell| < \varepsilon.$$

**Propriétés clés** : la limite, si elle existe, est **unique** et indépendante de la norme (prop. 2.5) ; les opérations (somme, produit, quotient…) fonctionnent comme en une variable.

**Propriété 2.6 — l'arme anti-existence.**
> Si $f$ a pour limite $\ell$ en $A$, alors la restriction de $f$ à **toute courbe continue** passant par $A$ (pas seulement les droites !) admet la même limite $\ell$.

**⚠️ Le piège central du chapitre (encadré ATTENTION du cours).**
- Pour prouver qu'une limite **n'existe pas** : il *suffit* d'exhiber deux chemins donnant deux limites différentes (ou un chemin sans limite).
- Pour prouver qu'une limite **existe** : il ne suffit *jamais* de tester des chemins — même *toutes les droites* ne suffisent pas. Il faut un argument valable dans toutes les directions à la fois (polaires + majoration).

**Exemple type (du cours).** $f(x,y) = \dfrac{x^2 - y^2}{x^2 + y^2}$ en $(0,0)$ :
le chemin $y=0$ donne $f(x, 0) = 1 \to 1$ ; le chemin $x=0$ donne $f(0,y) = -1 \to -1$. Deux limites différentes ⟹ **la limite n'existe pas**.

**Contre-exemple célèbre (du cours, à méditer).** $f(x,y) = \dfrac{xy^2}{x^2+y^4}$ : la limite le long de *toute droite* passant par l'origine vaut $0$, mais le long de la parabole $x = y^2$, $f(y^2, y) = \tfrac12$. Les droites ne suffisent pas !

## 🔴 Concept 3 — Coordonnées polaires : l'arme pro-existence

On pose $x = a + r\cos\vartheta$, $y = b + r\sin\vartheta$ ($r > 0$, $\vartheta \in [0; 2\pi[$) : $r$ est la **distance** au point $(a,b)$, et

$$\lim_{(x,y)\to(a,b)} f(x,y) = \lim_{\substack{r \to 0 \\ \forall \vartheta}} f(a + r\cos\vartheta,\, b + r\sin\vartheta).$$

**Proposition 2.7 (condition suffisante).**
> Soit $\ell$ une candidate limite.
> - S'il existe $s(r)$ **indépendante de $\vartheta$** telle que $|f(a + r\cos\vartheta, b + r\sin\vartheta) - \ell| \leq s(r) \xrightarrow[r\to 0]{} 0$, alors la limite vaut $\ell$.
> - S'il existe $M(r)$ telle que $|f - \ell| \geq M(r) \xrightarrow[r\to 0]{} +\infty$, la limite n'existe pas.

### Comment résoudre « la limite existe-t-elle ? »

1. **Trouver la candidate** $\ell$ : calculer la limite le long d'un chemin simple ($x = 0$, $y = 0$, $y = x$…). Si deux chemins donnent des valeurs différentes → **terminé, pas de limite**.
2. Tester au besoin un chemin plus retors (parabole $y = x^2$, $x = y^2$) — surtout si les degrés du numérateur et du dénominateur déséquilibrés le suggèrent.
3. Si tous les chemins concordent vers $\ell$ : **passer en polaires** et majorer $|f - \ell|$ par une fonction de $r$ seul, en utilisant $|\cos\vartheta| \leq 1$, $|\sin\vartheta| \leq 1$, $|\cos\vartheta\sin\vartheta| \leq 1$.
4. Conclure : majoration $\to 0$ ⟹ limite $= \ell$.

**Comment savoir quelle issue viser ?** Comparez les **degrés** : si le numérateur l'emporte en degré sur le dénominateur (après passage en polaires, il reste des puissances de $r$ positives), la limite a des chances d'exister ; à degrés égaux, il reste du $\vartheta$ seul — mauvais signe (ex. $\frac{x^2-y^2}{x^2+y^2} = \cos 2\vartheta$ : dépend de la direction, pas de limite).

**Exemple complet (du cours).** $f(x,y) = \dfrac{xy}{\sqrt{x^2+y^2}}$ en $(0,0)$ :
1. Chemin $x = 0$ : $f(0,t) = 0$ → candidate $\ell = 0$.
2. Polaires : $f = \dfrac{r^2\cos\vartheta\sin\vartheta}{r} = r\cos\vartheta\sin\vartheta = \tfrac{r}{2}\sin 2\vartheta$.
3. Majoration : $|f - 0| \leq \tfrac{r}{2} \xrightarrow[r \to 0]{} 0$, **indépendamment de $\vartheta$**.
4. Conclusion : $\lim = 0$. ✓

## 🟠 Concept 4 — Continuité et prolongement

**Définition (déf. 2.9).** $f$ est **continue en $A \in D$** si elle y possède une limite égale à $f(A)$ ; continue sur $D$ si c'est vrai en tout point.

**Définition (déf. 2.10).** Si $f$ n'est pas définie en $A$ mais $\lim_{x\to A} f(x) = \ell$ existe, la fonction $\tilde f$ qui vaut $f$ ailleurs et $\ell$ en $A$ est le **prolongement par continuité** de $f$ en $A$ — c'est l'unique prolongement continu.

**Propriété 2.11 (le réflexe pratique).** Polynômes, exponentielles, logarithmes, fonctions trigonométriques sont continus sur leur domaine ; sommes, produits, composées, quotients (dénominateur non nul) de fonctions continues sont continus. **En dehors des points à problème, la continuité est donc automatique** — tout l'exercice se concentre sur le point spécial (souvent $(0,0)$ où la fonction est définie par cas).

**Exemple (du cours).** $f(x,y) = \dfrac{xy}{x^2+y^2}$ : $f(0,t) = 0$ mais $f(t,t) = \tfrac12$ ⟹ pas de limite en $(0,0)$ ⟹ **pas prolongeable**. En revanche $\dfrac{xy}{\sqrt{x^2+y^2}} \to 0$ : prolongeable par la valeur $0$.

## ⚠️ Common mistakes

1. **Conclure à l'existence après avoir testé des chemins** — même toutes les droites ne prouvent rien (contre-exemple $\frac{xy^2}{x^2+y^4}$). Les chemins ne servent qu'à **réfuter**.
2. **Oublier « indépendamment de $\vartheta$ »** dans la majoration polaire : $s(r)$ ne doit contenir **aucun** $\vartheta$. Majorer les sinus/cosinus par 1 d'abord.
3. **Choisir la mauvaise candidate** $\ell$ : toujours la calculer sur un chemin *avant* de majorer.
4. **Polaires mal centrées** : pour une limite en $(a,b) \neq (0,0)$, poser $x = a + r\cos\vartheta$, $y = b + r\sin\vartheta$ — pas $x = r\cos\vartheta$.
5. **Confondre « pas de limite » et « limite infinie »** : $\lim = +\infty$ est un énoncé précis (déf. 2.4), pas une absence de limite.

## 📌 Ultimate Review

1. Norme : séparation, homogénéité, inégalité triangulaire ; $\lVert\cdot\rVert_1, \lVert\cdot\rVert_2, \lVert\cdot\rVert_\infty$ et leurs boules.
2. La limite est unique et indépendante de la norme.
3. **Réfuter** une limite : deux chemins, deux valeurs. **Prouver** une limite : polaires + majoration par $s(r) \to 0$ sans $\vartheta$.
4. Les droites ne suffisent jamais pour prouver ; penser aux paraboles pour réfuter.
5. Continuité en $A$ : limite $=$ valeur. Fonctions élémentaires et leurs combinaisons : continues d'office.
6. Prolongement par continuité : possible ssi la limite existe et est finie.
7. $|\!\sin|, |\!\cos| \leq 1$ : l'inégalité qui fait tout le travail en polaires.

**Formulas to know**
$$x = a + r\cos\vartheta,\quad y = b + r\sin\vartheta,\quad r = \text{distance à } (a,b)$$
$$|f(a{+}r\cos\vartheta,\, b{+}r\sin\vartheta) - \ell| \leq s(r) \xrightarrow[r\to0]{} 0 \implies \lim f = \ell$$

**Methods to know** : la procédure en 4 étapes « la limite existe-t-elle ? » ; l'étude de continuité en un point spécial ; le prolongement.

## 🧠 Active Recall

**Basic** — Énoncez les trois axiomes d'une norme.
<details><summary>Réponse</summary>

Séparation ($N(x)=0 \iff x=0$), homogénéité ($N(\lambda x) = |\lambda| N(x)$), inégalité triangulaire ($N(x+y) \leq N(x)+N(y)$).
</details>

**Understanding** — Pourquoi tester toutes les droites ne suffit-il pas à prouver l'existence d'une limite ?
<details><summary>Réponse</summary>

Parce que l'approche peut se faire par n'importe quelle courbe continue. Contre-exemple du cours : $f = \frac{xy^2}{x^2+y^4}$ vaut $0$ le long de toute droite passant par l'origine, mais $\tfrac12$ le long de la parabole $x = y^2$ — la limite n'existe donc pas alors que le « test des droites » était concluant.
</details>

**Application** — Étudiez $\lim_{(x,y)\to(1,0)} \dfrac{y^3}{(x-1)^2 + y^2}$.
<details><summary>Réponse</summary>

Polaires centrées en $(1,0)$ : $x = 1 + r\cos\vartheta$, $y = r\sin\vartheta$. Alors $f = \frac{r^3\sin^3\vartheta}{r^2} = r\sin^3\vartheta$ et $|f| \leq r \to 0$ : la limite existe et vaut $0$. (Exercice 2.1.2 du cours.)
</details>

**Comparison** — Quelle est la différence de stratégie entre prouver et réfuter l'existence d'une limite ?
<details><summary>Réponse</summary>

Réfuter est *local à un chemin* : deux restrictions discordantes suffisent. Prouver est *global en directions* : il faut une majoration uniforme en $\vartheta$ qui tend vers 0 avec $r$.
</details>

**Exam-style** — On vous donne $f = \frac{P(x,y)}{Q(x,y)}$ avec $P$, $Q$ homogènes de même degré, $Q > 0$ hors de l'origine. Que pouvez-vous prédire ?
<details><summary>Réponse</summary>

En polaires, les $r$ se simplifient totalement : $f$ ne dépend que de $\vartheta$. Sauf cas dégénéré (quotient constant), la valeur varie avec la direction : la limite en $(0,0)$ n'existe pas. Exemple : $\frac{x^2-y^2}{x^2+y^2} = \cos 2\vartheta$.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Prouver qu'une limite n'existe pas ? | Exhiber 2 chemins continus donnant 2 limites différentes |
| Prouver qu'une limite vaut $\ell$ ? | Polaires : majorer $\lvert f-\ell\rvert \leq s(r) \to 0$, sans $\vartheta$ |
| D'où vient la candidate $\ell$ ? | D'un chemin simple ($x=0$, $y=0$, $y=x$) |
| Le test de toutes les droites prouve-t-il l'existence ? | NON — contre-exemple $xy^2/(x^2+y^4)$, parabole $x=y^2$ |
| Continuité en $A$ ? | $\lim_{x\to A} f(x) = f(A)$ |
| Prolongement par continuité possible ssi… | la limite existe et est finie en ce point |
| Boule unité de $\lVert\cdot\rVert_1$ / $\lVert\cdot\rVert_\infty$ ? | Carré pointe en haut / carré droit |
| $\lvert\sin 2\vartheta\rvert \leq {}$ ? | $1$ — l'inégalité clé des majorations polaires |
