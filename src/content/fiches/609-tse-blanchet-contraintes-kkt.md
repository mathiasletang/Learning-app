# Fiche 609 — Optimisation sous contraintes : Lagrange, cône tangent linéarisé et KKT

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Blanchet, *Optimisation*, TSE, 9 avril 2024 — **chapitre 3** (Partie II), p. 25–30 |
| **Difficulté** | Must know — l'aboutissement du polycopié |
| **Temps d'étude estimé** | 3 h |
| **Prérequis** | Fiches 606 (Taylor), 607 (convexité), 608 (Euler, ordre 2) ; comparaison utile : fiches 604 et 605 |
| **Concepts clés** | Point régulier, conditions de Lagrange, **lagrangien**, condition d'ordre 2 sur le plan tangent, interprétation des multiplicateurs, contraintes actives, **cône tangent linéarisé**, cône de Bouligand, qualifications, KKT, théorème de John, **suffisance de KKT sous Slater** |
| **Poids à l'examen** | Ce chapitre apporte trois choses absentes du cours de M. Montaru : le **formalisme du lagrangien**, la **condition nécessaire d'ordre 2 sur le plan tangent** (prop. 3.3, exploitée dans les exercices 3.3 et 3.4), et le **corollaire 3.11** qui rend KKT **suffisant** dans le cas convexe. |

> ## 🔴 AVERTISSEMENT DE NOTATION — à lire avant tout
>
> **Les deux professeurs utilisent $g$ et $h$ dans des rôles INVERSÉS.**
>
> |  | Contraintes d'**égalité** | Contraintes d'**inégalité** |
> |---|---|---|
> | **Montaru** (fiches 604, 605) | $g_i(x) = 0$ | $h_j(x) \le 0$ |
> | **Blanchet** (cette fiche) | $\boxed{h_i(x) = 0}$ | $\boxed{g_j(x) \le 0}$ |
>
> **Les multiplicateurs, eux, portent les mêmes lettres dans les deux cours** : $\lambda$ pour les égalités, $\mu$ pour les inégalités. C'est ce qui sauve — **repérez-vous sur $\lambda$ et $\mu$, pas sur $g$ et $h$.**
>
> ⚠️ **En examen, utilisez la notation du professeur qui pose le sujet.** Cette fiche suit celle de M. Blanchet : $h$ pour les égalités, $g$ pour les inégalités.

## 🎯 Vue d'ensemble

```
§3.1  CONTRAINTES D'ÉGALITÉ SEULES        K = { h(x) = 0 }

   POINT RÉGULIER (déf. 3.1)   {∇hᵢ(x₀)} est une famille LIBRE
        │                       (c'est l'hypothèse (Q) de M. Montaru)
        ▼
   LAGRANGE (thm 3.2)    ∇f(x*) + Σ λ*ᵢ ∇hᵢ(x*) = 0

   LE LAGRANGIEN         L(x,λ) = f(x) + Σ λᵢ hᵢ(x)

        ∇L = ( ∇ₓL , ∇_λL ) = ( ∇f + Σλᵢ∇hᵢ ,  hᵢ )

        ⟹  x* extremum lié  ⟺  (x*, λ*) est un POINT CRITIQUE de L
            les n+m conditions se lisent sur UNE SEULE fonction

   ORDRE 2 (prop. 3.3)   ∇²ₓL = ∇²f + Σ λᵢ ∇²hᵢ   doit être ⪰ 0
                         MAIS SEULEMENT sur le PLAN TANGENT
                         { d : ⟨∇hᵢ(x*), d⟩ = 0  ∀i }

   MULTIPLICATEURS (prop. 3.4)     d/dε f(x*(ε))|₀ = λ*ⱼ
                                   f(x*(ε)) = f(x*) + ε λ*ⱼ + o(ε)


§3.2  ÉGALITÉS ET INÉGALITÉS              K = { h = 0 , g ≤ 0 }

   ACTIVE en x₀   gⱼ(x₀) = 0   →   j ∈ I(x₀)

   CÔNE TANGENT LINÉARISÉ (prop. 3.8)
        ⟨∇hᵢ(x), d⟩ = 0                      pour toutes les égalités
        ⟨∇gⱼ(x), d⟩ < 0    (≤ si gⱼ affine)  pour les inégalités ACTIVES

   QUALIFICATIONS : polyèdre convexe · régulier · Mangasarian-Fromowitz · SLATER

   KKT (thm 3.10)   ∇f + Σλ*ᵢ∇hᵢ + Σμ*ⱼ∇gⱼ = 0
                    admissibilité · complémentarité μⱼgⱼ(x*) = 0 · positivité μⱼ ≥ 0

   ══════════ L'APPORT PROPRE DE CE COURS ══════════
   COROLLAIRE 3.11   f convexe, hᵢ AFFINES, gⱼ CONVEXES, Slater vérifiée
                     ⟹  KKT devient SUFFISANTE
   ═════════════════════════════════════════════════
```

## 🔴 Concept 1 — Points réguliers et conditions de Lagrange (§3.1)

Le problème est

$$\inf_{x\in K} f(x) \tag{3.1}$$

où $f:\mathbb{R}^N\to\mathbb{R}$ est de classe $C^1$ et

$$K := \{x\in\mathbb{R}^N : h_i(x)=0,\ \forall i\in\{1,\dots,m\}\} = \{x\in\mathbb{R}^N : h(x)=0\} \tag{3.2}$$

avec $h : \mathbb{R}^N\to\mathbb{R}^m$ de classe $C^1$.

**Définition 3.1 (cours) — points réguliers.** Le point $x_0\in K$ est un **point régulier** si la famille $\{\nabla h_i(x_0)\}_{i\in\{1,\dots,m\}}$ est une **famille libre**. Un ensemble est un **ensemble régulier** si l'ensemble des points de cet ensemble est régulier.

> **C'est exactement la « qualification » (Q) de M. Montaru** (déf. 5.1, fiche 604), sous un autre nom. Retenez le vocabulaire des deux cours : *point régulier* = *point qualifié*.

**Pour aller plus loin (**) (cours) — le cas linéaire.** *Considérons des contraintes linéaires $Ax=b$ avec $A\in\mathcal M_{n,N}$ où $n<N$. Si le rang de $A$ est déficient (c'est-à-dire $\operatorname{rg}(A)=r<n$), alors il existe une matrice $\tilde A\in\mathcal M_{r,n}$ de rang plein composée des lignes $\{l_{i_1},\dots,l_{i_r}\}$ de $A$ telle que $Ax=b \iff \tilde Ax=\tilde b$. **Il est donc toujours possible d'éliminer les lignes redondantes** pour se ramener à une matrice de rang plein.*

> **La conséquence pratique est importante** : pour des contraintes **affines**, la régularité n'est **jamais un vrai obstacle** — il suffit de supprimer les équations redondantes. C'est la raison pour laquelle la condition (QCA) de M. Montaru (fiche 605) qualifie automatiquement tous les polyèdres.
>
> ⚠️ **Ce n'est plus vrai pour des contraintes non linéaires** : l'exercice 3.2 ci-dessous exhibe deux contraintes quadratiques dont les gradients sont **partout colinéaires** sur $K$, sans qu'on puisse en éliminer une.

**Théorème 3.2 (cours) — conditions nécessaires d'optimalité d'ordre 1, conditions de Lagrange.**

> Soit $x^\ast$ un point **régulier** de $K$. Si $x^\ast$ est un **extremum local** de $f$ sur $K$, alors il existe $\{\lambda^\ast_i\}_{i\in\{1,\dots,m\}}\in\mathbb{R}^m$ (appelés **multiplicateurs de Lagrange**) tels que
>
> $$\nabla f(x^\ast)+\sum_{i=1}^m\lambda^\ast_i\nabla h_i(x^\ast) = 0 .$$

**À savoir (fait en cours) 3.1.** *Avoir une intuition des ingrédients de la démonstration du théorème 3.2.*

> **Les ingrédients, en trois temps** — c'est la preuve complète que donne M. Montaru (thm 5.7, fiche 604) :
>
> 1. **La régularité fait de $K$ une sous-variété** au voisinage de $x^\ast$, dont l'**espace tangent** est $\operatorname{Vect}\{\nabla h_i(x^\ast)\}^\perp$.
> 2. **On dérive $f$ le long d'une courbe** $c$ tracée dans $K$ passant par $x^\ast$ : la fonction $t\mapsto f(c(t))$ a un extremum local en $t=0$, point **intérieur** de son intervalle, donc $(f\circ c)'(0)=0$, soit $\langle\nabla f(x^\ast),\ c'(0)\rangle = 0$.
> 3. **Ceci vaut pour tout vecteur tangent**, donc $\nabla f(x^\ast)$ est orthogonal à l'espace tangent, donc appartient à son orthogonal, c'est-à-dire à $\operatorname{Vect}\{\nabla h_i(x^\ast)\}$. ∎
>
> **En une phrase :** *le gradient de $f$ ne doit avoir aucune composante le long de la contrainte — sinon on pourrait glisser dessus et améliorer $f$.*

<details class="details--riche">
<summary>

**Corrigés — exercices 3.1 et 3.2 : le cas simple, puis le cas où la régularité tombe**

</summary>

### Exercice 3.1 — $\min f$ sur $\{(x,y)\in\mathbb{R}^2 : x+y=1\}$ avec $f(x,y)=x^2+y^2$

**Régularité.** $h(x,y) = x+y-1$, donc $\nabla h = (1,1)\neq0$ **partout** : la famille $\{\nabla h\}$ est libre en tout point. **$K$ est un ensemble régulier.** *(C'est le cas d'une contrainte **affine** : toujours régulier, sauf redondance.)*

**Existence.** $K$ est fermé (image réciproque de $\{0\}$ par une fonction continue) et **non borné** ; $f(x,y)=\lVert(x,y)\rVert^2$ est **coercitive**. Le théorème 2.12 (fiche 608) donne l'existence. *Mieux : $f$ est **fortement convexe** ($\alpha=2$) et $K$ est un fermé **convexe**, donc le **théorème 2.14** donne existence **et unicité** sans autre argument.*

**Le système de Lagrange.**

$$\begin{cases}2x+\lambda = 0\\ 2y+\lambda = 0\\ x+y=1\end{cases}$$

Les deux premières donnent $x=y=-\dfrac\lambda2$ ; la troisième donne $-\lambda = 1$, soit

$$\boxed{\lambda = -1, \qquad x^\ast = y^\ast = \tfrac12, \qquad f(x^\ast) = \tfrac14+\tfrac14 = \tfrac12 .}$$

**Contrôle géométrique.** $f$ est le carré de la distance à l'origine ; le minimum sur la droite $x+y=1$ est donc le carré de la distance de $O$ à cette droite :

$$\left(\frac{\lvert -1\rvert}{\sqrt{1^2+1^2}}\right)^2 = \left(\frac{1}{\sqrt2}\right)^2 = \frac12 . \ \checkmark$$

Et le pied de la perpendiculaire est bien $\left(\frac12,\frac12\right)$ .

### Exercice 3.2 — $\min f(x,y,z)=x^2-y+z^2$ sur $\{(x-1)^2+y^2=1 \text{ et } (x+1)^2+y^2=1\}$

**C'est l'exercice qui montre pourquoi l'hypothèse de régularité n'est pas décorative. Traitez-le lentement.**

**Étape 1 — identifier $K$.** Soustrayons les deux équations :

$$\bigl[(x-1)^2+y^2-1\bigr]-\bigl[(x+1)^2+y^2-1\bigr] = -4x = 0 \implies x = 0 .$$

En reportant dans la première : $(0-1)^2+y^2 = 1$, donc $y^2 = 0$, donc $y=0$. La variable $z$ est **libre** :

$$\boxed{K = \{(0,\ 0,\ z) : z\in\mathbb{R}\} \quad \text{— une DROITE, l'axe des } z .}$$

*(Géométriquement : deux cercles de rayon $1$ centrés en $(1,0)$ et $(-1,0)$ sont **tangents extérieurement** en l'origine. Leur intersection est le seul point $(0,0)$.)*

**Étape 2 — la réponse, par le calcul direct.** Sur $K$,

$$f(0,0,z) = 0-0+z^2 = z^2 \ \ge\ 0,$$

avec égalité si et seulement si $z=0$.

$$\boxed{\min_K f = 0, \text{ atteint au seul point } (0,0,0).}$$

**Étape 3 — et pourtant Lagrange ne trouve rien.** Vérifions la régularité. Avec $h_1 = (x-1)^2+y^2-1$ et $h_2 = (x+1)^2+y^2-1$ :

$$\nabla h_1 = \begin{pmatrix}2(x-1)\\2y\\0\end{pmatrix}, \qquad \nabla h_2 = \begin{pmatrix}2(x+1)\\2y\\0\end{pmatrix}.$$

**En tout point de $K$**, c'est-à-dire en $(0,0,z)$ :

$$\nabla h_1 = \begin{pmatrix}-2\\0\\0\end{pmatrix}, \qquad \nabla h_2 = \begin{pmatrix}2\\0\\0\end{pmatrix} = -\nabla h_1 .$$

**Ils sont colinéaires : la famille n'est PAS libre. Aucun point de $K$ n'est régulier.**

**Étape 4 — la conséquence, spectaculaire.** Écrivons quand même le système de Lagrange. Avec $\nabla f = (2x,\ -1,\ 2z)$, en $(0,0,z)$ :

$$\nabla f + \lambda_1\nabla h_1+\lambda_2\nabla h_2 = \begin{pmatrix}0\\-1\\2z\end{pmatrix}+\lambda_1\begin{pmatrix}-2\\0\\0\end{pmatrix}+\lambda_2\begin{pmatrix}2\\0\\0\end{pmatrix} = \begin{pmatrix}-2\lambda_1+2\lambda_2\\ \mathbf{-1}\\ 2z\end{pmatrix}.$$

**La deuxième composante vaut $-1$, quels que soient $\lambda_1$ et $\lambda_2$.** Elle ne peut **jamais** s'annuler :

$$\boxed{\text{Le système de Lagrange n'a AUCUNE solution — alors que le minimum existe bel et bien.}}$$

> **C'est la démonstration la plus claire possible que l'hypothèse de régularité est indispensable.** Sans elle, le théorème 3.2 est **faux** : il existe un extremum, et pourtant aucun multiplicateur ne convient.
>
> **La raison profonde.** Les deux gradients n'engendrent qu'une **droite** ($\operatorname{Vect}(1,0,0)$) au lieu du plan qu'on attendrait de deux contraintes. Or $\nabla f(0,0,0) = (0,-1,0)$ **n'est pas dans cette droite**. L'espace tangent réel à $K$ (l'axe des $z$) est de dimension $1$, alors que la formule $N-m = 3-2 = 1$ le prédit correctement **par coïncidence** — mais l'orthogonalité de la proposition 5.6 tombe.
>
> **Le réflexe à acquérir** : quand deux contraintes se ressemblent, **soustrayez-les d'abord**. Si l'ensemble se simplifie de façon spectaculaire, méfiez-vous de la régularité.

</details>

## 🔴 Concept 2 — Le lagrangien (§3.1)

**Cours.** On peut introduire le **lagrangien** du problème de minimisation sous contraintes :

$$\begin{array}{rccl}\mathcal{L} : & \mathbb{R}^n\times\mathbb{R}^m &\longrightarrow& \mathbb{R}\\ &(x,\lambda) &\longmapsto& f(x)+\displaystyle\sum_{i=1}^m\lambda_ih_i(x)\end{array}$$

On peut alors calculer

$$\nabla\mathcal{L}(x,\lambda) = \begin{pmatrix}\nabla_x\mathcal{L}(x,\lambda)\\ \nabla_\lambda\mathcal{L}(x,\lambda)\end{pmatrix} = \begin{pmatrix}\nabla f(x)+\sum_{i=1}^m\lambda_i\nabla h_i(x)\\ h_i(x)\end{pmatrix}$$

**Donc $x^\ast$ est un extremum de $f$ sous la contrainte $K$ si et seulement si $(x^\ast,\lambda^\ast)$ est un point critique de $\mathcal{L}$.**

> **C'est l'apport de formalisme du chapitre, et il vaut la peine d'être compris.**
>
> ```
>   SANS le lagrangien          AVEC le lagrangien
>   ──────────────────          ──────────────────
>   n équations : ∇f + Σλᵢ∇hᵢ = 0
>   m équations : hᵢ(x) = 0            ∇L(x,λ) = 0
>   deux systèmes à assembler          UNE SEULE équation, en n+m inconnues
> ```
>
> **Les $m$ dernières équations sont la contrainte elle-même** : dériver $\mathcal L$ par rapport à $\lambda_i$ redonne $h_i(x)$. **On ne peut donc pas oublier la contrainte** — c'est le principal bénéfice pratique de cette écriture.
>
> ⚠️ **Un point critique de $\mathcal L$ n'est PAS un minimum de $\mathcal L$.** En $(x^\ast,\lambda^\ast)$, $\mathcal L$ a typiquement un **point selle** : un minimum en $x$, un maximum en $\lambda$. Ne cherchez jamais à minimiser le lagrangien en $(x,\lambda)$.

**Proposition 3.3 (cours) — condition nécessaire d'ordre 2.** Supposons $f$ de classe $C^2$. Considérons la matrice hessienne de $\mathcal L$ **par rapport à la variable $x$** :

$$\nabla_x^2\mathcal{L}(x,\lambda) = \nabla^2f(x)+\sum_{i=1}^m\lambda_i\,\nabla^2h_i(x).$$

Soit $x^\ast$ un point régulier de $K$. Si $x^\ast$ est un **minimum local** de $f$ sur $K$, alors $\nabla_x^2\mathcal L$ doit être **semi-définie positive sur le plan tangent à $K$ en $x^\ast$**, c'est-à-dire

$$\langle\nabla_x^2\mathcal{L}(x,\lambda)\,d,\ d\rangle \ \ge\ 0 \qquad \forall d\in\bigl\{d : \langle\nabla h_i(x^\ast),\ d\rangle = 0,\ \forall i\in\{1,\dots,m\}\bigr\}.$$

> ⚠️ **Deux différences essentielles avec le cas sans contrainte, et ce sont elles qui font l'exercice.**
>
> 1. **Ce n'est PAS $\nabla^2f$ qu'on regarde, mais $\nabla_x^2\mathcal L$** — la hessienne de $f$ **corrigée** par les courbures des contraintes, pondérées par les $\lambda_i$. Si les contraintes sont **affines**, $\nabla^2h_i = 0$ et les deux coïncident ; sinon, non.
> 2. **La condition n'est exigée que sur le PLAN TANGENT**, pas sur $\mathbb{R}^N$ tout entier. Une matrice peut être **indéfinie** sur $\mathbb{R}^N$ et **définie positive** sur le plan tangent : c'est le cas dans les exercices 3.3 et 3.4, et c'est tout l'intérêt de la proposition.
>
> **La méthode de calcul, en trois étapes :**
>
> 1. **paramétrer le plan tangent** : résoudre $\langle\nabla h_i(x^\ast),d\rangle=0$, ce qui donne une base $(d^{(1)},\dots,d^{(N-m)})$ ;
> 2. **restreindre** : calculer $\langle\nabla_x^2\mathcal L\,d,d\rangle$ pour $d$ décrivant cet espace ;
> 3. **lire le signe** : $\ge0$ pour un minimum, $\le0$ pour un maximum.

<details class="details--riche">
<summary>

**Corrigés — exercices 3.3 et 3.4 : la condition d'ordre 2 sur le plan tangent**

</summary>

### Exercice 3.3 — $\displaystyle\max_{(x,y)\in K} 2xy$ où $K = \{(x,y)\in\mathbb{R}^2 : x+y=1\}$

**1. Les candidats.** $h(x,y) = x+y-1$, $\nabla h = (1,1) \neq 0$ : **tout point est régulier** .

$$\nabla f = \begin{pmatrix}2y\\2x\end{pmatrix}, \qquad \nabla f+\lambda\nabla h = 0 \iff \begin{cases}2y+\lambda=0\\ 2x+\lambda=0\end{cases} \iff x = y = -\frac\lambda2 .$$

Avec la contrainte $x+y=1$ : $-\lambda = 1$, donc

$$\boxed{\lambda = -1, \qquad (x^\ast,y^\ast) = \left(\tfrac12,\ \tfrac12\right), \qquad f = 2\cdot\tfrac14 = \tfrac12 .}$$

**Un seul candidat.**

**2. La condition d'ordre 2.** La contrainte est **affine**, donc $\nabla^2h = 0$ et

$$\nabla_x^2\mathcal{L} = \nabla^2f = \begin{pmatrix}0&2\\2&0\end{pmatrix}.$$

⚠️ **Sur $\mathbb{R}^2$ tout entier, cette matrice est INDÉFINIE** : ses valeurs propres sont $+2$ et $-2$. Si l'on s'arrêtait là, on conclurait « point selle » — **et ce serait faux**.

**Le plan tangent.** $\langle\nabla h,d\rangle = d_1+d_2 = 0$, donc

$$T = \{d = t(1,-1) : t\in\mathbb{R}\} \qquad \text{— une droite, de dimension } N-m = 2-1 = 1 .$$

**La restriction.** Pour $d = t(1,-1)$ :

$$\langle\nabla_x^2\mathcal{L}\,d,\ d\rangle = 2\cdot2\cdot d_1d_2 = 4\,t\,(-t) = \boxed{-4t^2 \ <\ 0} \quad \text{pour } t\neq0 .$$

**Sur le plan tangent, la forme est définie NÉGATIVE : le candidat est bien un MAXIMUM.**

**Contrôle direct** (l'exercice se résout aussi sans Lagrange) : en substituant $y = 1-x$,

$$\tilde f(x) = 2x(1-x) = 2x-2x^2, \qquad \tilde f'(x) = 2-4x = 0 \iff x = \tfrac12, \qquad \tilde f'' = -4 < 0 .$$

**Maximum en $x=\frac12$, de valeur $\frac12$** — et notez que $\tilde f'' = -4$ est **exactement** la valeur $-4t^2$ trouvée pour $t=1$. **Ce n'est pas une coïncidence** : la restriction au plan tangent *est* la dérivée seconde de la fonction réduite.

### Exercice 3.4 — $\displaystyle\max_{(x,y,z)\in K} 2xy+2xz+2yz$ où $K = \{x+y+z=1\}$

**1. Les candidats.** $h = x+y+z-1$, $\nabla h = (1,1,1)\neq0$ : **régulier partout** .

$$\nabla f = \begin{pmatrix}2y+2z\\2x+2z\\2x+2y\end{pmatrix}, \qquad \begin{cases}2y+2z+\lambda=0\\ 2x+2z+\lambda=0\\ 2x+2y+\lambda=0\end{cases}$$

En soustrayant la première de la deuxième : $2x-2y=0$, donc $x=y$. La deuxième moins la troisième : $2z-2y=0$, donc $y=z$. Avec la contrainte $x+y+z=1$ :

$$\boxed{x^\ast=y^\ast=z^\ast=\tfrac13, \qquad \lambda = -\tfrac43, \qquad f = 3\times2\times\tfrac19 = \tfrac23 \approx 0{,}6666667 .}$$

**2. La condition d'ordre 2.** Contrainte affine, donc

$$\nabla_x^2\mathcal{L} = \nabla^2f = \begin{pmatrix}0&2&2\\2&0&2\\2&2&0\end{pmatrix}.$$

⚠️ **Sur $\mathbb{R}^3$, cette matrice est INDÉFINIE** (valeurs propres $4$, $-2$, $-2$).

**Le plan tangent.** $\langle\nabla h,d\rangle = d_1+d_2+d_3 = 0$ — un **plan**, de dimension $3-1=2$.

**La restriction — et le calcul élégant.** Pour une telle matrice,

$$\langle\nabla^2f\,d,\ d\rangle = 4\,(d_1d_2+d_1d_3+d_2d_3).$$

Or, sur le plan tangent, $(d_1+d_2+d_3)^2 = 0$, ce qui donne

$$\lVert d\rVert^2 + 2\,(d_1d_2+d_1d_3+d_2d_3) = 0 \qquad\Longrightarrow\qquad d_1d_2+d_1d_3+d_2d_3 = -\frac{\lVert d\rVert^2}{2}.$$

$$\boxed{\langle\nabla_x^2\mathcal{L}\,d,\ d\rangle = 4\times\left(-\frac{\lVert d\rVert^2}{2}\right) = -2\lVert d\rVert^2 \ <\ 0 \quad \text{pour } d\neq0 .}$$

**Définie négative sur le plan tangent : c'est bien un MAXIMUM.**

**Contrôle numérique** : sur $2\times10^5$ directions $d$ tirées au hasard dans le plan tangent (obtenues en centrant des vecteurs gaussiens), le rapport $\dfrac{\langle\nabla^2f\,d,d\rangle}{\lVert d\rVert^2}$ vaut **$-2{,}000000$ dans tous les cas**, à $10^{-14}$ près. La forme est donc exactement $-2$ fois l'identité sur le plan tangent.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que ces deux exercices enseignent, et pourquoi le cours les met côte à côte.</span>

Dans les deux cas, $\nabla^2f$ est **indéfinie** sur l'espace entier — la lecture naïve conclurait « point selle ». **La contrainte change tout** : restreinte au plan tangent, la même matrice devient **définie négative**, et le point est un vrai maximum.

**La leçon** : *la nature d'un point critique sous contrainte ne se lit jamais sur $\nabla^2f$ seule.* Il faut la hessienne du **lagrangien**, et seulement **sur le plan tangent**.

**Le contrôle qui rassure** : dans l'exercice 3.3, la valeur $-4$ trouvée sur le plan tangent est exactement $\tilde f''$ de la fonction réduite $2x(1-x)$. **Quand la contrainte se paramètre facilement, réduisez et vérifiez.**

</div>

</details>

## 🔴 Concept 3 — L'interprétation des multiplicateurs (prop. 3.4)

**Proposition 3.4 (cours) — interprétation des multiplicateurs : *un multiplicateur de Lagrange mesure la sensibilité de la contrainte*.** Considérons le problème de minimisation de $f$ sous la contrainte **perturbée**

$$\{x\in\mathbb{R}^N : h_i(x)=0\ \ \forall i\in\{1,\dots,m\}\setminus\{j\} \quad \text{et} \quad h_j(x)+\varepsilon = 0\}.$$

Supposons que l'on n'a pas de problème de régularité. Si $x^\ast(\varepsilon)$ est solution de ce problème, on a

$$\boxed{\frac{d}{d\varepsilon}f\bigl(x^\ast(\varepsilon)\bigr)\Big|_{\varepsilon=0} = \lambda^\ast_j}$$

où $\lambda^\ast_j$ est le $j$-ième multiplicateur de Lagrange de $(3.1)$ sous la contrainte $(3.2)$.

**À savoir 3.2.** *Démontrer la proposition 3.4 dans le cas où il n'y a pas de problème de régularité.*

**Le développement que le cours en tire.** Par définition de la dérivée,

$$\frac{d}{d\varepsilon}f\bigl(x^\ast(\varepsilon)\bigr) = \frac{f(x^\ast(\varepsilon))-f(x^\ast)}{\varepsilon}+o(1),$$

donc la conclusion $\frac{d}{d\varepsilon}f(x^\ast(\varepsilon)) = \lambda^\ast_j$ s'écrit

$$\varepsilon\lambda^\ast_j = f\bigl(x^\ast(\varepsilon)\bigr)-f(x^\ast)+o(\varepsilon),$$

ou encore

$$\boxed{f\bigl(x^\ast(\varepsilon)\bigr) = f(x^\ast)+\varepsilon\,\lambda^\ast_j+o(\varepsilon).}$$

**Pour aller plus loin — l'interprétation économique (cours).** *Ce résultat donne une interprétation économique aux multiplicateurs de Lagrange : considérons un consommateur qui maximise son utilité $f$ sous les contraintes $\{h_i=0\}$. Notons $f(x^\ast)$ son utilité au niveau de consommation optimale. **Si le consommateur alloue un euro de plus de budget à la contrainte $h_j$, alors il augmente son utilité d'un montant égal à $\lambda^\ast_j$.** Autrement dit, le multiplicateur $\lambda^\ast_j$ est égal à son **gain de productivité marginal**. On appelle ainsi parfois $\lambda^\ast_j$ le **profit marginal de l'argent**, la **valeur interne**, le **prix fantôme** ou le **profit d'opportunité**. $\lambda^\ast_j$ mesure la **sensibilité de la valeur optimale $f(x^\ast)$ à la relaxation de la $j$-ème contrainte**.*

> **Les quatre noms sont à connaître** : *prix fantôme* (**shadow price**), *valeur interne*, *profit marginal de l'argent*, *profit d'opportunité*. Ils désignent tous $\lambda^\ast_j$.
>
> **La formule à retenir**, et c'est la plus utile de tout le chapitre :
>
> $$f\bigl(x^\ast(\varepsilon)\bigr) \approx f(x^\ast)+\varepsilon\,\lambda^\ast_j .$$
>
> *Relâcher la contrainte $j$ d'une unité fait varier l'optimum de $\lambda^\ast_j$.* C'est ce qui permet de **classer les contraintes par ordre d'intérêt** sans refaire aucun calcul.

<details class="details--riche">
<summary>

**Corrigés — exercices 3.5 et 3.6 : $\lambda$ vérifié, du cas trivial au cas complet**

</summary>

### Exercice 3.5 — quatre problèmes en dimension 1

*Le cours propose ici l'illustration la plus dépouillée possible de la proposition 3.4.*

| N° | Problème | Ensemble | Solution | Valeur optimale |
|---|---|---|---|---|
| 1 | $\min_{\{x=0\}}(-x)$ | $\{0\}$ | $x=0$ | $\mathbf{0}$ |
| 2 | $\min_{\{x+\varepsilon=0\}}(-x)$ | $\{-\varepsilon\}$ | $x=-\varepsilon$ | $\boldsymbol{\varepsilon}$ |
| 3 | $\min_{\{x=0\}}(-10x)$ | $\{0\}$ | $x=0$ | $\mathbf{0}$ |
| 4 | $\min_{\{x+\varepsilon=0\}}(-10x)$ | $\{-\varepsilon\}$ | $x=-\varepsilon$ | $\mathbf{10\varepsilon}$ |

**La dérivée de la valeur optimale.** Pour les problèmes 1-2 : $\dfrac{d}{d\varepsilon}(\varepsilon) = 1$. Pour les problèmes 3-4 : $\dfrac{d}{d\varepsilon}(10\varepsilon) = 10$.

**Et les multiplicateurs ?** Avec $h(x)=x$, donc $\nabla h = 1$ :

- problème 1 : $\nabla f+\lambda\nabla h = -1+\lambda = 0$, donc $\boxed{\lambda = 1}$ ;
- problème 3 : $-10+\lambda = 0$, donc $\boxed{\lambda = 10}$ .

**Les deux coïncident exactement avec les dérivées.** La proposition 3.4 est vérifiée dans le cas le plus simple possible — et l'on voit clairement que **$\lambda$ mesure « combien on gagne à déplacer la contrainte d'une unité »** : dix fois plus quand l'objectif est dix fois plus pentu.

> **L'intérêt pédagogique de cet exercice** : ici la contrainte détermine **entièrement** la solution ($K$ est un singleton), donc la valeur optimale se calcule sans aucune optimisation. **Tout ce qui reste, c'est l'effet de la perturbation** — et c'est exactement ce que $\lambda$ mesure.

### Exercice 3.6 — les six questions, avec les deux contraintes en concurrence

**Le problème :** $\min\ x+y$ sous diverses contraintes. $(3.3)$

**1. Sous $\{(x,y)\in\mathbb{R}^2 : x^2+y^2=1,\ y=0\}$, et les multiplicateurs.**

*L'ensemble* : $y=0$ et $x^2=1$, donc $K = \{(1,0),\ (-1,0)\}$ — **deux points**. Le minimum de $x+y$ y vaut

$$\boxed{-1, \text{ atteint en } (-1,\ 0).}$$

*Régularité en $(-1,0)$* : avec $h_1 = x^2+y^2-1$ et $h_2 = y$,

$$\nabla h_1(-1,0) = \begin{pmatrix}-2\\0\end{pmatrix}, \qquad \nabla h_2(-1,0) = \begin{pmatrix}0\\1\end{pmatrix} \quad \text{— famille LIBRE}$$

*Le système* : $\nabla f = (1,1)$, donc

$$\begin{cases}1+\lambda_1(-2)+\lambda_2\cdot0 = 0\\ 1+\lambda_1\cdot0+\lambda_2\cdot1 = 0\end{cases} \implies \boxed{\lambda_1 = \tfrac12, \qquad \lambda_2 = -1 .}$$

*(Pour information, en $(1,0)$ — qui est le **maximum** — on trouve $\lambda_1 = -\frac12$, $\lambda_2 = -1$.)*

**2. Approximativement sous $\{x^2+y^2+\varepsilon=1,\ y=0\}$.** C'est la contrainte $h_1$ qui est perturbée, donc par la proposition 3.4 :

$$f\bigl(x^\ast(\varepsilon)\bigr) \approx -1+\varepsilon\lambda_1 = \boxed{-1+\frac{\varepsilon}{2}}.$$

**3. Exactement.** L'ensemble devient $y=0$ et $x^2 = 1-\varepsilon$, donc $x = \pm\sqrt{1-\varepsilon}$ et

$$\min(x+y) = -\sqrt{1-\varepsilon}.$$

**Développons pour comparer** :

$$-\sqrt{1-\varepsilon} = -\left(1-\frac\varepsilon2-\frac{\varepsilon^2}{8}+O(\varepsilon^3)\right) = -1+\frac{\varepsilon}{2}+\frac{\varepsilon^2}{8}+O(\varepsilon^3).$$

**Le terme d'ordre 1 est bien $\frac\varepsilon2 = \varepsilon\lambda_1$** — la proposition 3.4 est confirmée, et l'on voit que l'erreur est d'ordre $\varepsilon^2$.

**4. Approximativement sous $\{x^2+y^2=1,\ y+\varepsilon=0\}$.** C'est $h_2$ qui est perturbée :

$$f\bigl(x^\ast(\varepsilon)\bigr) \approx -1+\varepsilon\lambda_2 = \boxed{-1-\varepsilon}.$$

**5. Exactement.** Maintenant $y=-\varepsilon$ et $x^2 = 1-\varepsilon^2$, donc

$$\min(x+y) = -\sqrt{1-\varepsilon^2}-\varepsilon = -1-\varepsilon+\frac{\varepsilon^2}{2}+O(\varepsilon^4).$$

**Le terme d'ordre 1 est $-\varepsilon = \varepsilon\lambda_2$** .

**6. Dans laquelle des deux contraintes vaut-il mieux récupérer un budget de $0{,}1$ euro ?**

Comparons, avec $\varepsilon = 0{,}1$ :

| Contrainte relâchée | $\lambda$ | Prédiction $-1+\varepsilon\lambda$ | Valeur **exacte** | Écart |
|---|---|---|---|---|
| $h_1$ (le cercle) | $+\frac12$ | $-0{,}95$ | $-\sqrt{0{,}9} = \mathbf{-0{,}9486833}$ | $1{,}3\times10^{-3}$ |
| $h_2$ (la droite $y=0$) | $-1$ | $-1{,}1$ | $-\sqrt{0{,}99}-0{,}1 = \mathbf{-1{,}0949874}$ | $5{,}0\times10^{-3}$ |

**Il s'agit d'une MINIMISATION : la meilleure option est celle qui donne la plus PETITE valeur.**

$$\boxed{-1{,}0949874 \ <\ -0{,}9486833 : \text{ il vaut mieux relâcher } h_2 .}$$

**Et l'on pouvait le savoir sans aucun calcul exact** : c'est la contrainte de multiplicateur **le plus négatif**, $\lambda_2 = -1$ contre $\lambda_1 = +\frac12$. **La règle : pour un problème de minimisation, on relâche la contrainte dont $\lambda$ est le plus petit.**

<div class="callout callout--warn" data-kind="piege">

<span class="callout__lab">Attention au sens de la comparaison, c'est le piège de la question 6.</span>

⚠️ Chez M. Montaru (fiche 604, §5.4), la même règle est énoncée pour une **maximisation** d'utilité, et c'est alors le **plus grand** $\lambda$ qu'on retient. **Le critère dépend du sens de l'optimisation** — vérifiez toujours si l'énoncé minimise ou maximise avant de conclure.

**Les prédictions au premier ordre sont excellentes** ($1{,}3\times10^{-3}$ et $5{,}0\times10^{-3}$ d'erreur pour $\varepsilon=0{,}1$), ce qui est attendu : l'erreur est en $\varepsilon^2$, soit $\frac{0{,}01}{8}=1{,}25\times10^{-3}$ et $\frac{0{,}01}{2}=5\times10^{-3}$ — **exactement les écarts observés** .

</div>

</details>

## 🔴 Concept 4 — Contraintes actives et cône tangent linéarisé (§3.2.1 et §3.2.2)

Le problème devient

$$\inf_{x\in K}f(x) \tag{3.4} \qquad\text{avec}\qquad K := \left\{x\in\mathbb{R}^N : \begin{array}{l} h_i(x)=0,\ \forall i\in\{1,\dots,m\}\\ g_j(x)\le0,\ \forall j\in\{1,\dots,p\}\end{array}\right\}$$

**Définition 3.5 (cours) — contraintes d'inégalité actives.** L'indice $j$ étant donné, une contrainte d'inégalité $g_j(x)\le0$ est dite **active en $x_0$** si $g_j(x_0)=0$. Sinon, lorsque $g_j(x_0)<0$, elle est dite **inactive en $x_0$**. L'ensemble des indices actifs en $x_0$ est noté

$$I(x_0) := \{j\in\{1,\dots,p\} : g_j(x_0)=0\}.$$

> C'est le $J(a)$ de M. Montaru (fiche 605), rebaptisé $I(x_0)$.

**Pour aller plus loin (**) (cours).** *On peut voir que $x^\ast$ est un minimum local du problème $(3.4)$ si et seulement si $x^\ast$ est un minimum local sous les contraintes où **les contraintes inactives ont été supprimées** et **les contraintes actives sont traitées comme des égalités**. Ainsi le théorème 3.2 s'applique : si la concaténation des familles $\{\nabla h_i(x^\ast)\}$ et $\{\nabla g_j(x^\ast)\}_{j\in I(x^\ast)}$ forme une famille libre, alors il existe $\lambda^\ast_i$ et $\mu_j$ tels que*

$$\nabla f(x^\ast)+\sum_{i=1}^m\lambda^\ast_i\nabla h_i(x^\ast)+\sum_{j\in I(x^\ast)}\mu_j\nabla g_j(x^\ast) = 0 .$$

> **C'est l'explication la plus claire de la condition de complémentarité, et elle vaut la peine d'être retenue :** *localement, une contrainte inactive n'existe pas, et une contrainte active se comporte comme une égalité.* La complémentarité $\mu_jg_j(x^\ast)=0$ n'est que la traduction algébrique de cette phrase.
>
> ⚠️ **Ce raisonnement ne donne pas le signe de $\mu_j$.** Traité comme une égalité, le multiplicateur serait quelconque. **C'est le théorème 3.10 qui ajoute $\mu_j\ge0$**, et cette information vient de l'inégalité, pas de l'égalité.

**Définition 3.6 (cours) — point admissible.** Un élément de $K$ est dit **point admissible**.

**Définition 3.7 (cours) — direction admissible.** Soit $x$ un point admissible. Une direction $d\in\mathbb{R}^N$ est dite **admissible (pour $x$)** s'il existe $\eta>0$ tel que $x+\alpha d$ soit dans $K$ pour tout $\alpha\in[0,\eta[$.

**Proposition 3.8 (cours) — cône tangent linéarisé (ou cône linéarisant).** Soit $x$ un point admissible. Le vecteur $d$ est une direction admissible si

1. $\forall i\in\{1,\dots,m\},\qquad \langle\nabla h_i(x),\ d\rangle = 0$ ; **et**
2. — si $j\notin I(x)$, **toute** direction est admissible ; — si $j\in I(x)$, une direction $d$ est admissible si $$\langle\nabla g_j(x),\ d\rangle < 0 \quad \text{si } g_j \text{ n'est pas affine, et} \quad \langle\nabla g_j(x),\ d\rangle \le 0 \quad \text{si } g_j \text{ est affine.}$$

**À savoir 3.3.** *Avoir une intuition des ingrédients de la démonstration de la proposition 3.8.*

> **L'intuition, contrainte par contrainte.**
>
> ```
>   ÉGALITÉ  hᵢ = 0        pour rester dessus, il faut se déplacer
>                          PERPENDICULAIREMENT au gradient
>                          ⟹  ⟨∇hᵢ, d⟩ = 0        (une ÉGALITÉ)
> 
>   INÉGALITÉ INACTIVE     gⱼ(x) < 0 : on a de la marge, un petit pas
>   gⱼ < 0                 dans N'IMPORTE QUELLE direction reste admissible
>                          ⟹  aucune condition
> 
>   INÉGALITÉ ACTIVE       gⱼ(x) = 0 : on est collé au mur.
>   gⱼ = 0                 Il faut que gⱼ DÉCROISSE dans la direction d
>                          ⟹  ⟨∇gⱼ, d⟩ < 0        (une INÉGALITÉ)
> ```
>
> **Pourquoi le cas affine autorise le $\le$ large.** Si $g_j$ est **affine**, alors $g_j(x+\alpha d) = g_j(x)+\alpha\langle\nabla g_j,d\rangle$ **exactement**, sans reste. Avec $g_j(x)=0$ et $\langle\nabla g_j,d\rangle = 0$, on obtient $g_j(x+\alpha d)=0\le0$ : la direction reste admissible — **on longe le mur**.
>
> Si $g_j$ **n'est pas affine**, il reste un terme d'ordre 2 de signe inconnu qui peut faire sortir de $K$. **Il faut alors une marge stricte** pour que le terme d'ordre 1 domine. C'est toute la raison de la distinction.

**Pour aller plus loin (***) (cours) — le cône tangent au sens de Bouligand.** *On peut définir le **cône tangent** en $x^\ast$ :*

$$\bigl\{d\in\mathbb{R}^N,\ \exists(d_k)_k,\ d_k\to d,\ \exists(\alpha_k)_k,\ \alpha_k\to0 : \forall k,\ x_k = x^\ast+\alpha_kd_k\in K\bigr\}$$

*Plutôt que de travailler avec les directions, on peut même travailler directement sur des **suites admissibles**, ce qui est la façon la plus générale (et la plus intuitive) mais la moins pratique ; le cône obtenu est appelé **cône tangent au sens de Bouligand** ou **cône contingent**.*

*En principe : **cône tangent linéarisé $\subset$ cône tangent $\subset$ suites admissibles**. Ils coïncident dans le cas où les contraintes sont dites **qualifiées**.*

> **C'est la définition la plus honnête de la qualification, et le cours le dit explicitement :**
>
> $$\boxed{\text{« qualifié » = « le cône LINÉARISÉ coïncide avec le VRAI cône tangent ».}}$$
>
> Autrement dit : *l'approximation au premier ordre des contraintes ne trahit pas la géométrie réelle de $K$.* Quand elle la trahit — comme à l'exercice 3.2, où deux contraintes distinctes définissent une droite — les conditions de Lagrange et KKT deviennent fausses.

**Les conditions de qualification (cours).** *Les contraintes sont, par exemple, qualifiées en $x$ si :*

- **$K$ est un polyèdre convexe** : $h$ et $g$ sont **affines** ;
- **$K$ est un ensemble régulier** : la concaténation de $\{\nabla h_i(x)\}$ et $\{\nabla g_j(x)\}_{j\in I(x)}$ forme une **famille libre** ;
- **conditions de Mangasarian-Fromowitz** : la famille $\{\nabla h_i(x)\}$ est libre, **et** il existe une direction $d$ dans le cône tangent linéarisé en $x$ ;
- **critère de qualification de Slater** (proposition 3.9 ci-dessous).

*Il y a d'autres conditions de qualification que nous ne verrons pas ici, comme la condition de qualification du **rang constant**, de **dépendance linéaire** ou de **quasi-normalité**.*

**Proposition 3.9 (cours) — conditions de Slater.** Supposons que les fonctions $\{h_i\}$ et $\{g_j\}$ sont **convexes**. S'il existe $y$ à l'intérieur de $K$ tel que

$$\forall i,\ h_i(y)=0 \qquad \text{et} \qquad \forall j,\ \begin{cases} g_j(y)<0 & \text{si } g_j \text{ n'est pas affine}\\ g_j(y)\le0 & \text{si } g_j \text{ est affine,}\end{cases}$$

alors **pour tout $x\in K$ les contraintes sont qualifiées en $x$**.

**Exercice 3.7.** *Démontrer la proposition 3.9.*

> **L'idée de la démonstration, en trois temps.** Soit $x\in K$ et $d$ dans le cône linéarisé ; il s'agit de montrer que $d$ est une vraie direction tangente.
>
> 1. **Le point de Slater fournit une direction « qui rentre »** : $v = y-x$ vérifie $\langle\nabla g_j(x),v\rangle \le g_j(y)-g_j(x) < 0$ pour toute contrainte non affine active — c'est la caractérisation 2 de la convexité (prop. 2.3, fiche 607), appliquée à $g_j$.
> 2. **On perturbe $d$ vers l'intérieur** : $d_t = d+tv$ est **strictement** admissible pour tout $t>0$.
> 3. **On fait tendre $t\to0$** : les $d_t$ appartiennent au vrai cône tangent, qui est **fermé**, donc leur limite $d$ aussi. ∎
>
> **Ce que Slater a de remarquable** : **un seul point** à exhiber, et **toute** la contrainte devient qualifiée — pas seulement ce point. C'est la même portée que dans le cours de M. Montaru (prop. 6.7, fiche 605).
>
> ⚠️ **Une différence avec M. Montaru, à noter.** M. Blanchet autorise ici $g_j(y)\le0$ pour les contraintes **affines** ; M. Montaru exige $g_j(a_0)<0$ pour **toutes**. **La version de M. Blanchet est plus fine** — et c'est cohérent avec la proposition 3.8, où les contraintes affines admettent déjà l'inégalité large.

## 🔴 Concept 5 — Le théorème de Karush-Kuhn-Tucker (§3.2.3)

**Théorème 3.10 (cours) — théorème de Karush (1939) – Kuhn-Tucker (1951).**

> Soit $x^\ast$ un point en lequel la **qualification des contraintes est vérifiée**. Si $x^\ast$ est **solution** du problème $(3.4)$, alors il existe $\{\lambda^\ast_i\}\in\mathbb{R}^m$ et $\{\mu^\ast_j\}\in\mathbb{R}^p$ tels que
>
> $$\nabla f(x^\ast)+\sum_{i=1}^m\lambda^\ast_i\nabla h_i(x^\ast)+\sum_{j=1}^p\mu^\ast_j\nabla g_j(x^\ast) = 0 \tag{3.7}$$
>
> avec
>
> - **admissibilité** : pour tout $i$, $h_i(x^\ast)=0$ et pour tout $j$, $g_j(x^\ast)\le0$ ;
> - **complémentarité** : pour tout $j$, $\mu_j\,g_j(x^\ast)=0$ ;
> - **positivité** : pour tout $j$, $\mu_j\ge0$.

> **La date de 1939 n'est pas anecdotique.** Karush a démontré le résultat dans son mémoire de master à Chicago en **1939** ; Kuhn et Tucker l'ont redécouvert et publié en **1951**. Le résultat a longtemps porté le seul nom « Kuhn-Tucker » — d'où le nom complet, rétabli, que le cours emploie.
>
> **La différence de présentation avec M. Montaru** (thm 6.1, fiche 605) : celui-ci liste l'**admissibilité de $\mu_j$** ($\mu_j\ge0$) et la **complémentarité** ; M. Blanchet ajoute une troisième condition qu'il appelle **admissibilité** et qui est simplement l'appartenance de $x^\ast$ à $K$. **Les deux énoncés sont identiques** ; M. Blanchet est seulement plus explicite.

**Pour aller plus loin (***) — le théorème de John (1948) (cours).** *On peut **relâcher les hypothèses de qualification**. Si $x^\ast$ est solution du problème $(3.4)$, alors il existe $\mu_0\neq0$, $\{\lambda^\ast_i\}$ et $\{\mu^\ast_j\}$ tels que*

$$\mu_0\,\nabla f(x^\ast)+\sum_{i=1}^m\lambda^\ast_i\nabla h_i(x^\ast)+\sum_{j=1}^p\mu^\ast_j\nabla g_j(x^\ast) = 0$$

*avec les mêmes conditions d'admissibilité, de complémentarité et de positivité.*

> **C'est la réponse élégante au problème de l'exercice 3.2**, et cela mérite d'être compris.
>
> **Le mécanisme** : en autorisant un coefficient $\mu_0$ **devant $\nabla f$**, on peut poser $\mu_0 = 0$ lorsque la qualification échoue — l'équation devient alors une relation de **dépendance linéaire entre les seuls gradients des contraintes**, ce qui est précisément ce qui se produit en un point non régulier.
>
> **Reprenons l'exercice 3.2.** En $(0,0,0)$, les gradients $\nabla h_1 = (-2,0,0)$ et $\nabla h_2 = (2,0,0)$ sont liés : $\nabla h_1+\nabla h_2 = 0$. Le théorème de John est donc satisfait avec
>
> $$\mu_0 = 0, \qquad \lambda_1 = \lambda_2 = 1,$$
>
> **alors que le théorème 3.2 n'avait aucune solution.**
>
> ⚠️ **Mais le prix à payer est lourd** : avec $\mu_0=0$, l'équation ne contient **plus $f$ du tout** et n'apprend donc rien sur l'optimum. **Le théorème de John est toujours vrai, et utile seulement quand $\mu_0\neq0$** — c'est-à-dire, précisément, quand on peut normaliser $\mu_0=1$ et retrouver KKT. *C'est pourquoi la qualification reste indispensable en pratique.*

**Le lagrangien du problème complet (cours).**

$$\mathcal{L}(x,\lambda,\mu) = f(x)+\sum_{i=1}^m\lambda_i\,h_i(x)+\sum_{j=1}^p\mu_j\,g_j(x),$$

et la condition $(3.7)$ s'écrit simplement

$$\boxed{\nabla_x\mathcal{L}(x^\ast,\lambda^\ast,\mu^\ast) = 0 .}$$

**Pour aller plus loin (***) — condition nécessaire d'ordre 2 (cours).** *$\nabla^2\mathcal L$ doit être semi-définie positive pour l'ensemble des directions $d$ telles que*

- *pour tout $i$, $\langle\nabla h_i(x),d\rangle = 0$ ;*
- *pour tout $j\in I(x)$, $\langle\nabla g_j(x),d\rangle\le0$ ;*
- *pour tout $j\in I(x)$ tel que $\mu_j>0$, $\langle\nabla g_j,d\rangle = 0$.*

> **La troisième condition est la plus subtile, et la plus instructive.** Une contrainte active **dont le multiplicateur est strictement positif** est dite **fortement active** : elle « pousse » réellement, et se comporte comme une **égalité**. Les contraintes actives avec $\mu_j=0$ (cas dégénéré) ne contraignent que d'un côté, d'où le $\le$ de la deuxième condition.

## 🔴 Concept 6 — Quand KKT devient SUFFISANT (corollaire 3.11)

**Corollaire 3.11 (cours) — conditions de Slater.**

> Considérons le problème $(3.4)$. Supposons que pour tout $i$, $h_i$ est **affine**, que pour tout $j$, $g_j$ est **convexe**, et que **$f$ est convexe**. Supposons que $x^\ast$ vérifie les conditions de Slater de la proposition 3.9. Alors les **conditions KKT du théorème 3.10 sont SUFFISANTES** pour que $x^\ast$ soit une solution du problème $(3.4)$.

> ## **C'est le résultat le plus fort de tout le polycopié, et il n'a pas d'équivalent chez M. Montaru.**
>
> Jusqu'ici, **toutes** les conditions rencontrées — $f'(t_0)=0$, $\nabla f(a)=0$, extrema liés, KKT — étaient **nécessaires** : elles produisaient des **candidats** qu'il fallait ensuite comparer. Le corollaire 3.11 renverse la situation :
>
> $$\boxed{\text{Dans le cadre convexe avec Slater, un point qui vérifie KKT EST la solution.}}$$
>
> **Plus de comparaison de valeurs. Plus d'étude de nature. Plus de points non qualifiés à traiter à part.** Le tableau à cinq lignes de la fiche 605 devient inutile.
>
> **Les quatre hypothèses, à vérifier une par une :**
>
> | Hypothèse | Ce qu'elle exclut |
> |---|---|
> | $f$ **convexe** | les minima locaux non globaux |
> | $h_i$ **affines** | une contrainte d'égalité courbe, qui rendrait $K$ non convexe |
> | $g_j$ **convexes** | un ensemble admissible non convexe |
> | **Slater** vérifiée | les problèmes où la qualification échoue |
>
> ⚠️ **La deuxième est la plus restrictive** : elle exclut le cercle $\{x^2+y^2=1\}$ de tous les exercices du chapitre 5 de M. Montaru. **Une contrainte d'égalité doit être AFFINE** pour que $K$ soit convexe — car $\{h=0\}$ n'est convexe, pour $h$ convexe, que si $h$ est affine.
>
> **Où le corollaire s'applique, concrètement** : la **programmation linéaire** (tout est affine), la **programmation quadratique convexe** ($f$ quadratique définie positive, contraintes affines), le problème de **transport optimal** du §1.6 de M. Montaru, et l'essentiel des problèmes d'allocation en économie.
>
> **La vérification type, en une phrase** : *« $f$ est convexe, les $h_i$ sont affines, les $g_j$ sont convexes, et le point $y = \dots$ vérifie strictement les inégalités non affines : les conditions de Slater sont satisfaites, donc par le corollaire 3.11, tout point vérifiant KKT est solution. »*

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | La bonne réaction | L'outil |
|---|---|---|
| égalités seules | **Lagrange** | thm 3.2 |
| égalités **et** inégalités | **KKT** | thm 3.10 |
| « déterminer les candidats » | le système de Lagrange, via $\nabla\mathcal L=0$ | le lagrangien |
| « vérifier s'ils sont max ou min » | ordre 2 **sur le plan tangent** | prop. 3.3 |
| deux contraintes qui se ressemblent | **soustrayez-les** : régularité en danger | exercice 3.2 |
| contraintes **affines** | régulier après élimination des redondances | « Pour aller plus loin » (**) |
| « interpréter $\lambda$ » | sensibilité, prix fantôme | prop. 3.4 |
| « quelle contrainte relâcher ? » | le **plus petit** $\lambda$ si l'on **minimise** | exercice 3.6 |
| $f$ convexe, $h$ affines, $g$ convexes | **vérifiez Slater** : KKT devient **suffisant** | corollaire 3.11 |
| qualification en échec | théorème de **John**, avec $\mu_0$ | « Pour aller plus loin » (***) |

**Le signal qui doit déclencher l'usage du corollaire 3.11** : dès que l'énoncé donne (ou permet d'établir) la **convexité de $f$** avec des contraintes **affines**, ne cherchez plus à comparer les candidats — **le premier point KKT trouvé est la réponse**.

## Comment résoudre ce type d'exercice

**Protocole « contraintes d'égalité » (§3.1) — cinq étapes.**

1. **Régularité.** Calculer les $\nabla h_i$ et vérifier qu'ils forment une famille libre **sur $K$**. Si deux contraintes se ressemblent, **soustrayez-les** avant tout (exercice 3.2).
2. **Existence.** Compact → Weierstrass ; fermé + coercivité → théorème 2.12 ; fortement convexe → théorème 2.14 (existence **et** unicité).
3. **Le système $\nabla\mathcal L = 0$** : $n+m$ équations, $n+m$ inconnues. Les $m$ dernières **sont** la contrainte.
4. **Ordre 2, sur le plan tangent.** Calculer $\nabla_x^2\mathcal L = \nabla^2f+\sum\lambda_i\nabla^2h_i$, paramétrer $T = \{d : \langle\nabla h_i,d\rangle = 0\}$, et lire le signe de $\langle\nabla_x^2\mathcal L\,d,d\rangle$ **sur $T$ seulement**.
5. **Comparer** les valeurs des candidats.

**Protocole « avec inégalités » (§3.2) — quatre étapes.**

1. **Écrire toutes les inégalités sous la forme $g_j\le0$** et identifier $I(x)$.
2. **Qualification**, dans cet ordre de rapidité :
  - tout affine → **polyèdre convexe** → qualifié ;
  - cadre convexe + un point strictement admissible → **Slater** (prop. 3.9) → **toute** la contrainte ;
  - sinon → **régularité** ou **Mangasarian-Fromowitz**, point par point.
3. **KKT**, en balayant les configurations d'activité $I \subset\{1,\dots,p\}$ : poser $\mu_j=0$ pour $j\notin I$, $g_j=0$ pour $j\in I$, résoudre, puis **éliminer** si le point sort de $K$ ou si un $\mu_j<0$.
4. **Conclure.**
  - *Cadre convexe + Slater* → **corollaire 3.11** : le point trouvé **est** la solution, sans comparaison ;
  - *sinon* → comparer les valeurs, **sans oublier les points non qualifiés**.

**Comment calculer la restriction au plan tangent, sans erreur.**

1. Résoudre $\langle\nabla h_i(x^\ast),d\rangle=0$ pour obtenir une **base** $(d^{(1)},\dots,d^{(N-m)})$ de $T$.
2. Écrire $d = \sum t_k d^{(k)}$ et développer $\langle\nabla_x^2\mathcal L\,d,\ d\rangle$ en fonction des $t_k$.
3. Étudier le signe de cette **forme quadratique en $t$**, de taille $N-m$ — beaucoup plus petite que $N$.

**Le contrôle qui vaut de l'or** : quand la contrainte se **paramètre** (une droite, un cercle), substituez et dérivez deux fois. Dans l'exercice 3.3, $\tilde f'' = -4$ redonne **exactement** la valeur trouvée sur le plan tangent.

## 🔴 Common mistakes

1. **Confondre $g$ et $h$ entre les deux cours.** M. Blanchet : $h$ = égalités, $g$ = inégalités. M. Montaru : l'**inverse**. Repérez-vous sur $\lambda$ (égalités) et $\mu$ (inégalités).
2. **Oublier la régularité.** L'exercice 3.2 montre un minimum qui existe et pour lequel le système de Lagrange n'a **aucune** solution.
3. **Ne pas soustraire deux contraintes qui se ressemblent.** C'est ce qui révèle instantanément la dégénérescence de l'exercice 3.2.
4. **Étudier $\nabla^2f$ au lieu de $\nabla_x^2\mathcal L$.** Elles ne coïncident que si les contraintes sont **affines**.
5. **Étudier le signe sur $\mathbb{R}^N$ au lieu du plan tangent.** Dans les exercices 3.3 et 3.4, la hessienne est **indéfinie** sur l'espace entier et **définie négative** sur le plan tangent.
6. **Chercher à minimiser le lagrangien en $(x,\lambda)$.** C'est un **point selle**, pas un minimum.
7. **Oublier que $\nabla_\lambda\mathcal L = 0$ EST la contrainte.** Ces $m$ équations font partie du système.
8. **Se tromper de sens dans la question « quelle contrainte relâcher ? »** Pour un **minimum**, on veut le $\lambda$ le **plus petit** ; pour un **maximum**, le plus grand.
9. **Utiliser $\lambda$ pour une grande perturbation.** C'est une **dérivée** : l'erreur est en $\varepsilon^2$ (exercice 3.6 : $1{,}3\times10^{-3}$ et $5{,}0\times10^{-3}$ pour $\varepsilon=0{,}1$).
10. **Oublier la distinction affine / non affine dans la proposition 3.8.** $<$ strict pour les contraintes non affines, $\le$ large pour les affines.
11. **Croire le théorème de John utile en pratique.** Avec $\mu_0=0$, l'équation ne contient plus $f$ : elle n'apprend rien sur l'optimum.
12. **Appliquer le corollaire 3.11 avec une contrainte d'égalité non affine.** L'énoncé exige que les $h_i$ soient **affines** — un cercle ne convient pas, car $\{h=0\}$ ne serait pas convexe.

## 📌 Ultimate Review

**Le chapitre 3 en un paragraphe.** Sous des contraintes d'**égalité** $h_i=0$, un extremum en un point **régulier** — famille des $\nabla h_i$ libre — vérifie les **conditions de Lagrange** (thm 3.2), qui s'écrivent élégamment $\nabla\mathcal L(x,\lambda)=0$ pour le **lagrangien** $\mathcal L = f+\sum\lambda_ih_i$, les $m$ dernières équations étant la contrainte elle-même. À l'ordre 2, c'est $\nabla_x^2\mathcal L = \nabla^2f+\sum\lambda_i\nabla^2h_i$ qu'il faut examiner, et **uniquement sur le plan tangent** (prop. 3.3) — une matrice indéfinie sur $\mathbb{R}^N$ peut y être définie. Le multiplicateur $\lambda^\ast_j$ est la **dérivée de la valeur optimale** par rapport à un relâchement de la contrainte $j$ : le **prix fantôme** (prop. 3.4). Avec des **inégalités** $g_j\le0$, seules comptent les contraintes **actives** ; le **cône tangent linéarisé** (prop. 3.8) les traduit en conditions sur les directions, avec un $<$ **strict** pour les non affines et un $\le$ large pour les affines. Sous **qualification** — polyèdre convexe, régularité, Mangasarian-Fromowitz ou **Slater** — le théorème de **Karush-Kuhn-Tucker** donne les conditions nécessaires. Et si de plus **$f$ est convexe, les $h_i$ affines, les $g_j$ convexes et Slater vérifiée**, le **corollaire 3.11** rend ces conditions **suffisantes**.

**Les sept énoncés à savoir citer.**

| N° | Énoncé | Usage |
|---|---|---|
| **3.1** | point **régulier** : $\{\nabla h_i\}$ libre | l'hypothèse à vérifier |
| **3.2** | **Lagrange** : $\nabla f+\sum\lambda_i\nabla h_i = 0$ | les candidats |
| — | **lagrangien** $\mathcal L$, et $\nabla\mathcal L = 0$ | une seule équation |
| **3.3** | $\nabla_x^2\mathcal L\succeq0$ **sur le plan tangent** | la nature du candidat |
| **3.4** | $(f\circ x^\ast)'(0) = \lambda^\ast_j$ | le **prix fantôme** |
| **3.8** | **cône tangent linéarisé** | les directions admissibles |
| **3.10 / 3.11** | **KKT**, et sa **suffisance** dans le cas convexe | la conclusion |

**Les réponses des sept exercices.**

| Ex. | Problème | Réponse |
|---|---|---|
| **3.1** | $\min x^2+y^2$ sur $x+y=1$ | $\frac12$ en $\left(\frac12,\frac12\right)$, $\lambda=-1$ |
| **3.2** | $\min x^2-y+z^2$ sur deux cercles tangents | $K$ est **l'axe des $z$** ; min $0$ en $(0,0,0)$ ; **aucun point régulier**, Lagrange **sans solution** |
| **3.3** | $\max 2xy$ sur $x+y=1$ | $\frac12$ en $\left(\frac12,\frac12\right)$ ; $\langle\nabla_x^2\mathcal L d,d\rangle = -4t^2 < 0$ sur $T$ |
| **3.4** | $\max 2xy+2xz+2yz$ sur $x+y+z=1$ | $\frac23$ en $\left(\frac13,\frac13,\frac13\right)$, $\lambda=-\frac43$ ; $-2\lVert d\rVert^2$ sur $T$ |
| **3.5** | quatre problèmes en dimension 1 | $\lambda = 1$ et $10$, **égaux** aux dérivées $\frac{d}{d\varepsilon}$ |
| **3.6** | $\min x+y$ sur cercle $\cap$ droite | $-1$ en $(-1,0)$ ; $\lambda_1=\frac12$, $\lambda_2=-1$ ; **relâcher $h_2$** |
| **3.7** | démontrer Slater | perturber $d$ vers le point de Slater, puis passer à la limite |

**La différence essentielle avec le cours de M. Montaru.** Ce chapitre apporte **trois choses** que l'autre n'a pas :

1. le **formalisme du lagrangien** — une seule fonction, une seule équation ;
2. la **condition d'ordre 2 sur le plan tangent** (prop. 3.3) — qui permet enfin de *classer* les candidats des extrema liés, là où M. Montaru s'arrête aux conditions nécessaires ;
3. le **corollaire 3.11** — la seule condition **suffisante** de tout le cursus.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quelle est la différence de notation entre les deux cours, et comment ne pas s'y perdre ?**

</summary>

|  | Égalités | Inégalités |
|---|---|---|
| **Montaru** | $g_i=0$ | $h_j\le0$ |
| **Blanchet** | $h_i=0$ | $g_j\le0$ |

**Les rôles de $g$ et $h$ sont INVERSÉS.**

**La parade** : les **multiplicateurs** portent les mêmes lettres dans les deux cours — $\lambda$ pour les **égalités**, $\mu$ pour les **inégalités**. Repérez-vous sur eux, jamais sur $g$ et $h$.

En examen : utilisez la notation du professeur qui pose le sujet.

</details>

<details class="details--riche">
<summary>

**2. Définir un point régulier et donner les ingrédients de la preuve du théorème 3.2.**

</summary>

**Point régulier** (déf. 3.1) : $x_0\in K$ tel que $\{\nabla h_i(x_0)\}$ soit une **famille libre**. *(C'est la qualification (Q) de M. Montaru.)*

**Les trois ingrédients** (À savoir 3.1) :

1. la **régularité** fait de $K$ une **sous-variété** localement, d'espace tangent $\operatorname{Vect}\{\nabla h_i\}^\perp$ ;
2. on **dérive $f$ le long d'une courbe** tracée dans $K$ : $(f\circ c)'(0)=0$, soit $\langle\nabla f(x^\ast),c'(0)\rangle=0$ ;
3. ceci valant pour **tout** vecteur tangent, $\nabla f(x^\ast)\in\operatorname{Vect}\{\nabla h_i(x^\ast)\}$.

**En une phrase** : le gradient de $f$ ne doit avoir aucune composante **le long** de la contrainte.

</details>

<details class="details--riche">
<summary>

**3. Résoudre l'exercice 3.2 et expliquer ce qu'il démontre.**

</summary>

$K = \{(x-1)^2+y^2=1\} \cap \{(x+1)^2+y^2=1\}$. **Soustraire les deux équations** donne $-4x=0$, donc $x=0$, puis $y=0$. Donc

$$K = \{(0,0,z) : z\in\mathbb{R}\} \quad\text{— l'axe des } z .$$

Sur $K$, $f = z^2$, donc **$\min f = 0$ en $(0,0,0)$**.

**Mais** : $\nabla h_1(0,0,z)=(-2,0,0)$ et $\nabla h_2(0,0,z)=(2,0,0)$ sont **colinéaires** — **aucun point de $K$ n'est régulier**.

**Et le système de Lagrange n'a aucune solution** : sa deuxième composante vaut $-1$ quels que soient $\lambda_1,\lambda_2$.

**Ce que cela démontre** : sans régularité, le théorème 3.2 est **faux**. Un extremum peut exister sans qu'aucun multiplicateur ne convienne. *(Le théorème de John le rattrape avec $\mu_0=0$, $\lambda_1=\lambda_2=1$ — mais l'équation ne contient alors plus $f$.)*

</details>

<details class="details--riche">
<summary>

**4. Qu'est-ce que le lagrangien, et quel est son intérêt ?**

</summary>

$$\mathcal L(x,\lambda) = f(x)+\sum_{i=1}^m\lambda_ih_i(x), \qquad \nabla\mathcal L = \begin{pmatrix}\nabla f+\sum\lambda_i\nabla h_i\\ h_i\end{pmatrix}.$$

**$x^\ast$ est un extremum lié si et seulement si $(x^\ast,\lambda^\ast)$ est un point critique de $\mathcal L$.**

**L'intérêt** : les $n$ conditions de Lagrange **et** les $m$ équations de contrainte deviennent **une seule** équation $\nabla\mathcal L = 0$ en $n+m$ inconnues. Comme $\nabla_\lambda\mathcal L = h_i$, **on ne peut pas oublier la contrainte**.

⚠️ Un point critique de $\mathcal L$ est typiquement un **point selle** (minimum en $x$, maximum en $\lambda$) — ne cherchez jamais à minimiser $\mathcal L$ en $(x,\lambda)$.

</details>

<details class="details--riche">
<summary>

**5. Énoncer la proposition 3.3 et dire quelles sont ses deux particularités.**

</summary>

Si $x^\ast$ régulier est un **minimum local**, alors

$$\langle\nabla_x^2\mathcal L\,d,\ d\rangle\ \ge\ 0 \qquad \forall d \text{ tel que } \langle\nabla h_i(x^\ast),d\rangle = 0\ \forall i,$$

avec $\nabla_x^2\mathcal L = \nabla^2f+\sum\lambda_i\nabla^2h_i$.

**Les deux particularités :**

1. ce n'est **pas $\nabla^2f$** mais la hessienne **du lagrangien** — $f$ corrigée par la courbure des contraintes ; les deux coïncident seulement si les $h_i$ sont **affines** ;
2. la condition n'est exigée que sur le **plan tangent**, pas sur $\mathbb{R}^N$. Une matrice **indéfinie** sur l'espace entier peut y être **définie** — c'est le cas dans les exercices 3.3 et 3.4.

</details>

<details class="details--riche">
<summary>

**6. Résoudre l'exercice 3.4 et détailler le calcul sur le plan tangent.**

</summary>

$\max 2xy+2xz+2yz$ sur $x+y+z=1$. Le système donne $x=y=z$, donc $x^\ast = \left(\frac13,\frac13,\frac13\right)$, $\lambda=-\frac43$, $f = \frac23$.

**Ordre 2** : la contrainte est affine donc $\nabla_x^2\mathcal L = \nabla^2f = \begin{pmatrix}0&2&2\\2&0&2\\2&2&0\end{pmatrix}$, **indéfinie** sur $\mathbb{R}^3$ (valeurs propres $4,-2,-2$).

**Sur le plan tangent** $\{d_1+d_2+d_3=0\}$ : de $(d_1+d_2+d_3)^2=0$ on tire $d_1d_2+d_1d_3+d_2d_3 = -\frac{\lVert d\rVert^2}{2}$, d'où

$$\langle\nabla^2f\,d,d\rangle = 4\left(-\frac{\lVert d\rVert^2}{2}\right) = -2\lVert d\rVert^2 < 0 .$$

**Définie négative sur $T$ : c'est un maximum** . *(Contrôle numérique : le rapport vaut $-2{,}000000$ sur $2\times10^5$ directions tangentes.)*

</details>

<details class="details--riche">
<summary>

**7. Énoncer la proposition 3.4 et ses quatre noms économiques.**

</summary>

En perturbant la contrainte $j$ en $h_j(x)+\varepsilon=0$ :

$$\frac{d}{d\varepsilon}f\bigl(x^\ast(\varepsilon)\bigr)\Big|_{\varepsilon=0} = \lambda^\ast_j, \qquad \text{soit} \qquad f\bigl(x^\ast(\varepsilon)\bigr) = f(x^\ast)+\varepsilon\lambda^\ast_j+o(\varepsilon).$$

**Les quatre noms** : **prix fantôme** (*shadow price*), **valeur interne**, **profit marginal de l'argent**, **profit d'opportunité**.

**L'interprétation** : $\lambda^\ast_j$ mesure la **sensibilité de la valeur optimale à la relaxation de la contrainte $j$**. Un euro de budget de plus sur la contrainte $j$ fait varier l'optimum de $\lambda^\ast_j$.

**Vérification minimale (exercice 3.5)** : $\min(-x)$ sur $\{x=0\}$ donne $\lambda=1$, et sur $\{x+\varepsilon=0\}$ la valeur optimale est $\varepsilon$, de dérivée $1$ . Avec $-10x$ : $\lambda=10$ et valeur $10\varepsilon$ .

</details>

<details class="details--riche">
<summary>

**8. Résoudre l'exercice 3.6 et répondre à sa question 6.**

</summary>

$\min(x+y)$ sur $\{x^2+y^2=1,\ y=0\}$ : $K=\{(\pm1,0)\}$, minimum $-1$ en $(-1,0)$, avec $\lambda_1=\frac12$ et $\lambda_2=-1$.

| Contrainte relâchée de $\varepsilon=0{,}1$ | Prédiction | Exact |
|---|---|---|
| $h_1$ (cercle) | $-1+\frac\varepsilon2 = -0{,}95$ | $-\sqrt{0{,}9} = -0{,}9486833$ |
| $h_2$ (droite) | $-1-\varepsilon = -1{,}1$ | $-\sqrt{0{,}99}-0{,}1 = -1{,}0949874$ |

**On MINIMISE, donc la plus petite valeur gagne : il vaut mieux relâcher $h_2$**, celle dont $\lambda$ est le **plus petit** ($-1 < \frac12$).

⚠️ Chez M. Montaru, la même règle est énoncée pour une **maximisation**, où c'est le **plus grand** $\lambda$ qu'on retient. **Le critère dépend du sens de l'optimisation.**

Les erreurs de prédiction ($1{,}3\times10^{-3}$ et $5{,}0\times10^{-3}$) sont bien d'ordre $\varepsilon^2$ .

</details>

<details class="details--riche">
<summary>

**9. Énoncer la proposition 3.8 et expliquer la distinction affine / non affine.**

</summary>

$d$ est une direction admissible si :

1. $\langle\nabla h_i(x),d\rangle = 0$ pour toutes les **égalités** ;
2. pour les **inégalités actives** : $\langle\nabla g_j(x),d\rangle < 0$ si $g_j$ **n'est pas affine**, et $\le 0$ si $g_j$ **est affine**. Les inégalités **inactives** n'imposent rien.

**Pourquoi le cas affine autorise le $\le$** : si $g_j$ est affine, $g_j(x+\alpha d)=g_j(x)+\alpha\langle\nabla g_j,d\rangle$ **exactement**, sans reste. Avec $g_j(x)=0$ et $\langle\nabla g_j,d\rangle=0$, on reste **sur** le mur, donc dans $K$.

Si $g_j$ n'est pas affine, un terme d'ordre 2 de signe inconnu peut faire sortir : **il faut une marge stricte** pour que l'ordre 1 domine.

</details>

<details class="details--riche">
<summary>

**10. Énoncer le corollaire 3.11 et dire pourquoi c'est le résultat le plus fort du cours.**

</summary>

Si **$f$ est convexe**, les **$h_i$ affines**, les **$g_j$ convexes** et **Slater** est vérifiée, alors les conditions **KKT sont SUFFISANTES** : un point qui les vérifie **est** solution.

**Pourquoi c'est le plus fort** : toutes les autres conditions du cursus — $f'(t_0)=0$, $\nabla f(a)=0$, extrema liés, KKT — sont **nécessaires** et ne produisent que des **candidats** à comparer. Ici, **plus de comparaison, plus d'étude de nature, plus de points non qualifiés à traiter**.

⚠️ **L'hypothèse la plus restrictive est « $h_i$ affines »** : elle exclut le cercle $\{x^2+y^2=1\}$, car $\{h=0\}$ n'est convexe, pour $h$ convexe, que si $h$ est affine.

**Où il s'applique** : programmation linéaire, programmation quadratique convexe, transport optimal, allocation en économie.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Chez Blanchet, les égalités s'écrivent ? | $h_i(x)=0$ |
| Les inégalités ? | $g_j(x)\le0$ |
| Chez Montaru ? | **L'inverse** |
| Comment ne pas s'y perdre ? | $\lambda$ = égalités, $\mu$ = inégalités |
| Point régulier (déf. 3.1) ? | $\{\nabla h_i(x_0)\}$ est une **famille libre** |
| Son autre nom ? | Point **qualifié** |
| Théorème 3.2 ? | $\nabla f(x^\ast)+\sum\lambda^\ast_i\nabla h_i(x^\ast)=0$ |
| Son hypothèse ? | $x^\ast$ **régulier** |
| L'idée de sa preuve ? | Dériver $f$ le long d'une **courbe** de $K$ |
| Contraintes affines : régularité ? | Toujours, après élimination des **redondances** |
| Lagrangien ? | $\mathcal L(x,\lambda)=f(x)+\sum\lambda_ih_i(x)$ |
| $\nabla_\lambda\mathcal L$ vaut ? | La **contrainte** $h_i(x)$ |
| $x^\ast$ extremum lié ⟺ ? | $(x^\ast,\lambda^\ast)$ **point critique** de $\mathcal L$ |
| Est-ce un minimum de $\mathcal L$ ? | **Non** — un point **selle** |
| Proposition 3.3 ? | $\nabla_x^2\mathcal L\succeq0$ **sur le plan tangent** |
| $\nabla_x^2\mathcal L$ vaut ? | $\nabla^2f+\sum\lambda_i\nabla^2h_i$ |
| Quand vaut-elle $\nabla^2f$ ? | Contraintes **affines** |
| Le plan tangent ? | $\{d : \langle\nabla h_i(x^\ast),d\rangle=0\}$ |
| Sa dimension ? | $N-m$ |
| Exercice 3.1 : réponse ? | $\frac12$ en $\left(\frac12,\frac12\right)$, $\lambda=-1$ |
| Exercice 3.2 : que vaut $K$ ? | **L'axe des $z$** |
| Le minimum ? | $0$ en $(0,0,0)$ |
| Les gradients y sont ? | **Colinéaires** : aucun point régulier |
| Le système de Lagrange ? | **Aucune solution** (2e ligne $=-1$) |
| Ce que l'exercice démontre ? | La régularité est **indispensable** |
| Exercice 3.3 : le candidat ? | $\left(\frac12,\frac12\right)$, $f=\frac12$ |
| $\nabla^2f$ sur $\mathbb{R}^2$ ? | **Indéfinie** ($\pm2$) |
| Sur le plan tangent ? | $-4t^2 < 0$ : **maximum** |
| Le contrôle par réduction ? | $\tilde f = 2x(1-x)$, $\tilde f''=-4$ |
| Exercice 3.4 : le candidat ? | $\left(\frac13,\frac13,\frac13\right)$, $f=\frac23$, $\lambda=-\frac43$ |
| Sur le plan tangent ? | $-2\lVert d\rVert^2$ : **maximum** |
| L'astuce du calcul ? | $(d_1+d_2+d_3)^2=0$ |
| Proposition 3.4 ? | $(f\circ x^\ast)'(0)=\lambda^\ast_j$ |
| Le développement ? | $f(x^\ast)+\varepsilon\lambda^\ast_j+o(\varepsilon)$ |
| Les quatre noms de $\lambda$ ? | Prix fantôme, valeur interne, profit marginal, profit d'opportunité |
| Exercice 3.5 : les deux $\lambda$ ? | $1$ et $10$ |
| Exercice 3.6 : $\lambda_1$ et $\lambda_2$ ? | $\frac12$ et $-1$ |
| Quelle contrainte relâcher ? | $h_2$ — le **plus petit** $\lambda$ (on minimise) |
| Chez Montaru, la règle ? | Le **plus grand** — mais il **maximise** |
| L'erreur de la prédiction ? | D'ordre $\varepsilon^2$ |
| Contrainte active (déf. 3.5) ? | $g_j(x_0)=0$ |
| L'ensemble des actives ? | $I(x_0)$ |
| Direction admissible (déf. 3.7) ? | $x+\alpha d\in K$ pour $\alpha\in[0,\eta[$ |
| Cône linéarisé, égalités ? | $\langle\nabla h_i,d\rangle=0$ |
| Inégalités actives non affines ? | $\langle\nabla g_j,d\rangle < 0$ **strict** |
| Inégalités actives affines ? | $\le0$ **large** |
| Pourquoi cette différence ? | L'affine n'a **pas de reste** d'ordre 2 |
| Cône de Bouligand ? | Le **vrai** cône tangent, par les suites |
| Qualifié signifie ? | Linéarisé $=$ vrai cône tangent |
| Les quatre qualifications citées ? | Polyèdre convexe, régulier, Mangasarian-Fromowitz, **Slater** |
| Slater (prop. 3.9) ? | Un point $y$ vérifiant **strictement** les inégalités non affines |
| Sa portée ? | **Toute** la contrainte |
| Théorème 3.10 ? | **KKT**, dû à Karush (**1939**) et Kuhn-Tucker (1951) |
| Ses trois conditions ? | Admissibilité, **complémentarité**, **positivité** |
| $(3.7)$ se réécrit ? | $\nabla_x\mathcal L(x^\ast,\lambda^\ast,\mu^\ast)=0$ |
| Théorème de John (1948) ? | KKT avec un coefficient $\mu_0$ devant $\nabla f$ |
| Son intérêt ? | Vrai **sans qualification** |
| Sa limite ? | Si $\mu_0=0$, l'équation ne contient plus $f$ |
| **Corollaire 3.11** ? | Cas convexe + Slater ⟹ KKT **SUFFISANTE** |
| Ses quatre hypothèses ? | $f$ convexe, $h_i$ **affines**, $g_j$ convexes, Slater |
| La plus restrictive ? | $h_i$ **affines** — exclut le cercle |
| Pourquoi c'est le plus fort du cours ? | La **seule** condition **suffisante** |
| Ce qu'il supprime ? | La comparaison des candidats |
|  |  |
