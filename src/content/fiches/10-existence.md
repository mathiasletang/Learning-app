# Fiche 10 — Existence de minimiseurs et coercivité

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Garrigos, chapitre II, p. 29–42 |
| **Difficulté** | 🔴 Must know |
| **Temps d'étude estimé** | 1 h 15 |
| **Prérequis** | Fiches 6 et 9 (extrema libres, Rayleigh) |
| **Concepts clés** | Infimum vs minimum, minimiseur, coercivité, existence, conditions d'optimalité revisitées |
| **Poids à l'examen** | « Montrer que $f$ admet un minimiseur » — la question d'ouverture type des sujets d'optimisation. La coercivité est l'argument attendu. |

## 🎯 Vue d'ensemble

La fiche 6 (Faccanoni) répondait à « *où* sont les extrema ». Garrigos pose la question préalable, plus profonde : **existent-ils ?** L'inf d'une fonction peut ne jamais être atteint ($e^x$), ou n'être pas fini ($x$). Le chapitre construit le bon vocabulaire (infimum / minimum / minimiseur / argmin), l'outil d'existence (**coercivité**), puis re-démontre les conditions d'optimalité avec le formalisme $\nabla^2 f \succeq 0$.

```
Vocabulaire : inf f (toujours défini) ─ min f (si atteint) ─ argmin f (les minimiseurs)
EXISTENCE   : f continue + coercive + C fermé  ⟹  argmin ≠ ∅
              (cas particulier : C compact — Weierstrass/Bolzano)
CANDIDATS   : ∇f = 0 (Fermat, à l'INTÉRIEUR de C seulement !)
NATURE      : CNO : ∇²f ≽ 0 · CSO : ∇²f ≻ 0 ⟹ min local · ni ≽0 ni ≼0 ⟹ selle
```

## 🔴 Concept 1 — Vocabulaire de précision

**Définition (II.1) et mise en garde martelée par le cours (remarque II.2).**
> - Le **minimum** est la plus petite *valeur* prise par la fonction ;
> - un **minimiseur** est un *point* où cette valeur est atteinte ;
> - $\operatorname{argmin}_C f$ est l'*ensemble* des minimiseurs ; l'infimum $\inf_C f$ existe toujours (dans $\mathbb{R} \cup \{-\infty\}$), le minimum seulement si l'inf est atteint.

**La galerie d'exemples types (exemple II.3 — « à toujours garder en tête », dit le cours)** :

| Situation | Exemple | $\inf$ | $\operatorname{argmin}$ |
|---|---|---|---|
| Pas minorée | $f(x) = x$, $\ln x$ | $-\infty$ | $\varnothing$ |
| Minorée, pas de minimiseur | $e^x$, $1/x$ sur $]0,\infty[$ | $0$ | $\varnothing$ |
| Minimiseur unique | $x^2$ | $0$ | $\{0\}$ |
| Plusieurs, en nombre fini | $((x-1)(x+1))^2$ | $0$ | $\{-1, 1\}$ |
| Infinité discrète | $\cos x$ | $-1$ | $-\pi + 2\pi\mathbb{Z}$ |
| Continuum | $f(x,y) = x^2$ | $0$ | $\{0\} \times \mathbb{R}$ |

**Contre-exemple frappant (II.7).** $f(x) = x(x-1)(x+1)$ : $\inf f = -\infty$ (pas minorée !) et pourtant $x = 1/\sqrt3$ est un minimiseur **local**. Le local ne dit rien du global.

## 🔴 Concept 2 — Coercivité : l'arme d'existence

**Définition (II.25).**
> $f$ est **coercive** sur $C$ si $\displaystyle\lim_{\substack{\lVert x\rVert \to \infty \\ x \in C}} f(x) = +\infty$ — pour *toute* suite $(x_n) \subset C$ avec $\lVert x_n\rVert \to \infty$, on a $f(x_n) \to +\infty$.

**Exemples du cours** : $|x|^p$ ($p \geq 1$) coercive ; $e^x$ non coercive sur $\mathbb{R}$ (elle « s'aplatit » en $-\infty$) mais coercive sur $[0, +\infty[$ ; $f(x,y) = x^2$ **non coercive** (constante le long de $\{x\} \times \mathbb{R}$).

**⚠️ Le piège central (remarque II.30 + exercice II.31).** Il ne suffit PAS de faire tendre chaque variable vers l'infini *séparément* : $f(x,y) = \frac{x}{y} + \frac{y}{x}$ sur $]0,\infty[^2$ tend vers $+\infty$ à $x$ fixé et à $y$ fixé… mais n'est **pas coercive** (le long de $y = x$, $f = 2$ constante).

### Comment traiter « f est-elle coercive ? »

1. **Une variable** : calculer $\lim_{x \to \pm\infty} f(x)$ ; il faut $+\infty$ des deux côtés.
2. **Vous pensez que NON** : exhiber une suite $\lVert x_n\rVert \to \infty$ avec $f(x_n) \not\to +\infty$ — typiquement le long d'une direction où la fonction est bornée ($y = x$, un axe…).
3. **Vous pensez que OUI** : **minorer** $f(x) \geq g(x)$ avec $g$ visiblement coercive — idéalement $g(x) = \varphi(\lVert x\rVert)$. Pour les quadratiques, l'outil est Rayleigh : $\tfrac12\langle Ax,x\rangle + \langle b,x\rangle \geq \tfrac{\lambda_{\min}}{2}\lVert x\rVert^2 - \lVert b\rVert\lVert x\rVert$, coercive dès que $\lambda_{\min}(A) > 0$.

**Propositions utiles** : sur un $C$ **borné**, toute fonction est coercive (prop. II.33 — la limite est vide) ; coercivité $\iff$ sous-niveaux bornés (prop. II.34).

## 🔴 Concept 3 — Le théorème d'existence

**Théorème (II.35, via le lemme des suites minimisantes II.37).**
> $f$ **continue** sur $C$ **fermé**, et **coercive** sur $C$ ⟹ $f$ admet (au moins) un minimiseur global sur $C$.

**Corollaire (II.39, théorème des valeurs extrêmes — Bolzano).** $f$ continue sur $C$ **compact** ⟹ minimum et maximum globaux atteints. (C'est Weierstrass, fiche 6 : compact = fermé + borné, et borné rend la coercivité automatique.)

**Schéma de rédaction (à recopier en examen)** :
1. $f$ est continue sur $C$ (fonctions élémentaires…).
2. $C$ est fermé (image réciproque d'un fermé par une fonction continue, produit de fermés…).
3. $f$ est coercive sur $C$ (minoration).
4. Donc, par le théorème d'existence, $\operatorname{argmin}_C f \neq \varnothing$. ∎

## 🟠 Concept 4 — Conditions d'optimalité, version Garrigos

Reformulation matricielle de la fiche 6, avec deux précisions importantes :

- **Fermat (thm. II.9–II.10)** : valable en un minimiseur local $\bar x$ **intérieur** à $C$. Contre-exemple du cours (remarque II.12) : $f(x) = x^2$ sur $C = [1,2]$ — le minimiseur est $\bar x = 1$, au bord, et $f'(1) = 2 \neq 0$. **Fermat ne voit pas les bords** (⟶ fiche 13, KKT).
- **CNO du 2ᵉ ordre (thm. II.16)** : minimiseur local intérieur ⟹ $\nabla f(\bar x) = 0$ **et** $\nabla^2 f(\bar x) \succeq 0$. Un tel point est un **point critique du 2ᵉ ordre** (déf. II.17).
- **CSO (thm. II.19)** : $\nabla f(\bar x) = 0$ et $\nabla^2 f(\bar x) \succ 0$ ⟹ minimiseur **local**. Réciproque fausse : $x^3$ et $-x^4$ sont des points critiques du 2ᵉ ordre en 0 sans être des minimiseurs (exemple II.18).
- **Corollaire II.24 (selle)** : si $\nabla f(\bar x) = 0$ et $\nabla^2 f(\bar x)$ n'est **ni** SDP **ni** semi-définie négative ⟹ point-selle.
- **Local → global (remarque II.20)** : pour disqualifier un candidat du titre de minimiseur global, il suffit d'exhiber *un* point où $f$ est plus petite.

## ⚠️ Common mistakes

1. **Confondre minimum et minimiseur** — valeur vs point ; le cours « martèle » la distinction.
2. **Tester la coercivité variable par variable** — insuffisant ($\frac{x}{y} + \frac{y}{x}$). Il faut toutes les suites divergentes, ou une minoration globale.
3. **Invoquer Weierstrass sur un domaine non compact** — sur $\mathbb{R}^N$, c'est *coercivité + continuité + fermé* qui donne l'existence.
4. **Appliquer Fermat en un point du bord** — $x^2$ sur $[1,2]$ : le minimiseur ne vérifie pas $f' = 0$.
5. **Croire que point critique du 2ᵉ ordre ⟹ minimiseur** — $x^3$, $-x^4$ en 0.
6. **Conclure « global » depuis la CSO** — elle ne donne que du local ; global = coercivité + comparaison, ou convexité (fiche 11).

## 📌 Ultimate Review

1. $\inf$ existe toujours ; min = inf atteint ; argmin = ensemble des minimiseurs.
2. La galerie II.3 : six situations à savoir citer avec leurs exemples.
3. Coercive = tend vers $+\infty$ le long de *toute* suite divergente dans $C$.
4. Test négatif : une suite qui plafonne. Test positif : minorer par $\varphi(\lVert x\rVert)$ coercive.
5. **Existence** : continue + coercive + fermé ⟹ argmin non vide ; compact ⟹ Bolzano.
6. Fermat : intérieur seulement. CNO2 : $\nabla^2 f \succeq 0$ ; CSO : $\succ 0$ ⟹ min local ; ni-ni ⟹ selle.
7. Quadratique : coercive $\iff$ fortement convexe $\iff A \succ 0$ (avec Rayleigh).

**Methods to know** : le schéma de rédaction d'existence en 4 lignes ; les deux tests de coercivité.

## 🧠 Active Recall

**Basic** — Quelle est la différence entre $\min f$ et $\operatorname{argmin} f$ ?
<details><summary>Réponse</summary>

$\min f$ est un **nombre** (la plus petite valeur, quand elle est atteinte) ; $\operatorname{argmin} f$ est un **ensemble de points** (ceux où cette valeur est atteinte).
</details>

**Understanding** — Pourquoi la coercivité et la fermeture sont-elles toutes deux nécessaires dans le théorème d'existence ?
<details><summary>Réponse</summary>

Sans coercivité, la fonction peut « s'aplatir » à l'infini sans atteindre son inf ($e^x$ sur $\mathbb{R}$). Sans fermeture, l'inf peut être approché en un point limite exclu du domaine ($1/x$ sur $]0, \infty[$, ou une fonction continue sur un ouvert dont l'inf est au bord).
</details>

**Application** — $f(x,y) = x^4 + y^4 - 3xy$ admet-elle un minimiseur global sur $\mathbb{R}^2$ ?
<details><summary>Réponse</summary>

Oui. Continue (polynôme) ; $\mathbb{R}^2$ fermé ; coercive car $x^4 + y^4 \geq \tfrac12(x^2+y^2)^2 - c$ domine le terme croisé : $|3xy| \leq \tfrac32(x^2+y^2)$, donc $f \geq \tfrac12\lVert(x,y)\rVert^4 - \tfrac32\lVert(x,y)\rVert^2 - c \to +\infty$. Le théorème d'existence conclut.
</details>

**Comparison** — Coercivité vs compacité : quand utiliser l'une ou l'autre ?
<details><summary>Réponse</summary>

Domaine borné (fermé) ⟹ compacité : Bolzano suffit, pas besoin d'étudier la fonction. Domaine non borné ($\mathbb{R}^N$, demi-espace fermé…) ⟹ la coercivité *de la fonction* remplace la bornitude *du domaine*.
</details>

**Exam-style** — $f(x,y) = (x - y)^2$ : coercive ? Admet-elle des minimiseurs ? Que vaut argmin ?
<details><summary>Réponse</summary>

Non coercive : le long de $y = x$, $f = 0$ constante alors que $\lVert(x,x)\rVert \to \infty$ (exercice II.29.3). Mais l'existence n'exige pas la coercivité (condition suffisante, pas nécessaire !) : $f \geq 0 = f(x,x)$, donc $\min f = 0$ et $\operatorname{argmin} f = \{(x,y) \mid y = x\}$ — un continuum de minimiseurs.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Minimum vs minimiseur ? | Valeur vs point ; argmin = ensemble des points |
| Définition de coercive sur $C$ ? | $f(x_n) \to +\infty$ pour toute suite de $C$ avec $\lVert x_n\rVert \to \infty$ |
| Théorème d'existence ? | Continue + coercive + $C$ fermé ⟹ argmin ≠ ∅ |
| Le test « variable par variable » suffit-il ? | NON — contre-exemple $\frac{x}{y} + \frac{y}{x}$ le long de $y=x$ |
| Prouver la non-coercivité ? | Une suite divergente le long de laquelle $f$ reste bornée |
| Prouver la coercivité ? | Minorer par $\varphi(\lVert x \rVert) \to +\infty$ (Rayleigh pour les quadratiques) |
| Fermat au bord de $C$ ? | Ne s'applique pas — $x^2$ sur $[1,2]$, min en 1 avec $f'(1)=2$ |
| Point critique du 2ᵉ ordre ? | $\nabla f = 0$ et $\nabla^2 f \succeq 0$ (nécessaire, pas suffisant : $x^3$) |
| $\nabla f = 0$, $\nabla^2 f$ ni SDP ni SDN ? | Point-selle (cor. II.24) |
| La coercivité est-elle nécessaire à l'existence ? | Non — condition suffisante ($e$.g. $(x-y)^2$ atteint son min) |
