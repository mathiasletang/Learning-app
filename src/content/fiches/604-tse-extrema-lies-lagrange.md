# Fiche 604 — Contraintes d'égalité : sous-variétés, extrema liés et multiplicateurs de Lagrange

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Montaru, *Optimisation*, TSE, 16 mars 2025 — **chapitre 5**, p. 25–31 |
| **Difficulté** | Must know — le chapitre le plus demandé en examen |
| **Temps d'étude estimé** | 3 h |
| **Prérequis** | Fiches 600 (compacité), 602 (gradient, $\varphi(t)=f(a+th)$), 603 (points critiques) |
| **Concepts clés** | Hypothèse de qualification (Q), sous-variété, point qualifié, courbe tracée dans $A$, vecteur tangent, théorème des extrema liés, multiplicateurs de Lagrange, lignes de niveau, interprétation économique de $\lambda$ |
| **Poids à l'examen** | Le **théorème 5.7** est le seul du cours dont la **preuve figure intégralement dans le polycopié** — c'est le signal qu'elle est exigible. L'**interprétation de $\lambda$** (§5.4) est la question de cours qui distingue les copies. |

> ⚠️ **La convention de signe de M. Montaru.** Le cours écrit le théorème des extrema liés avec un **PLUS** :
>
> $$\nabla f(a) + \sum_{i=1}^p \lambda_i \nabla g_i(a) = 0_{\mathbb{R}^n}.$$
>
> ⚠️ Beaucoup de manuels écrivent $\nabla f = \lambda \nabla g$ (donc un moins). **Les deux sont corrects** — seul le signe de $\lambda$ change. **Utilisez la convention du cours en copie**, sans quoi l'interprétation du §5.4 (« relâcher la contrainte de plus grand $\lambda$ ») donnerait la conclusion inverse.

> **Convention de la série.** Les énoncés numérotés sont ceux du cours. La **preuve du théorème 5.7 est celle du polycopié** (elle y figure) ; les corrigés d'exercices et les exemples chiffrés sont rédigés pour cette fiche.

## 🎯 Vue d'ensemble

```
LE PROBLÈME       optimiser f sur   A = { x ∈ U : g₁(x)=0, … , g_p(x)=0 }

  ⚠ A n'est PAS ouvert : la proposition 4.11 (∇f(a)=0) ne s'applique JAMAIS.
     Sur le cercle x²+y²=1, aucun point n'est intérieur.


ÉTAPE 0 — LA CONTRAINTE EST-ELLE « ASSEZ JOLIE » ?    (§5.1)

   hypothèse (Q)   ∀x ∈ A, la famille (∇g₁(x), …, ∇g_p(x)) est LIBRE
                   ⟺ la matrice n×p des gradients est de RANG p
        │
        └──► A est une SOUS-VARIÉTÉ de dimension n − p
             (n variables, p contraintes : p degrés de liberté perdus)


ÉTAPE 1 — LE THÉORÈME DES EXTREMA LIÉS                (thm 5.7)

   a qualifié ET extremum local de f sur A
        ⟹  ∃ λ₁, …, λ_p ∈ ℝ :   ∇f(a) + Σ λᵢ ∇gᵢ(a) = 0

   GÉOMÉTRIQUEMENT :  ∇f(a) ∈ Vect( ∇g₁(a), …, ∇g_p(a) )
                      le gradient de f est ORTHOGONAL à l'espace tangent
                      les lignes de niveau de f sont TANGENTES à A


ÉTAPE 2 — LES POINTS NON QUALIFIÉS                    (encadré ATTENTION)

   A₀ = { points de A où la famille des ∇gᵢ n'est PAS libre }
   Le théorème ne s'y applique pas → il faut les traiter À PART
   et calculer f dessus AUSSI.


ÉTAPE 3 — COMPARER    f sur (candidats de Lagrange) ∪ (points non qualifiés)


ET λ, ALORS ?         (§5.4)     (f ∘ c)'(0) = λ_{i₀}
   λ = la SENSIBILITÉ de la valeur optimale à un relâchement de la contrainte
   « prix fantôme », « utilité marginale du revenu »
```

## 🔴 Concept 1 — Qualification et sous-variétés (§5.1)

Dans ce chapitre, la contrainte est

$$A = \{x \in U,\ g_1(x) = 0,\ \dots,\ g_p(x) = 0\}$$

où $U$ est un ouvert de $\mathbb{R}^n$ et $(g_1,\dots,g_p) \in C^1(U)^p$.

Le cours explique pourquoi une condition technique est nécessaire : *« on a besoin pour nos théorèmes que la contrainte $A$ soit assez jolie, c'est-à-dire que $A$ soit une sous-variété de $\mathbb{R}^n$, notion qui généralise le concept de courbe ou de surface à plus de deux dimensions »*.

**Définition 5.1 (cours).** Soit $U$ ouvert de $\mathbb{R}^n$ et $(g_1,\dots,g_p) \in C^1(U)^p$ vérifiant l'**hypothèse de qualification (Q)** de l'ensemble $A$ suivante :

$$\forall x \in A,\quad (\nabla g_1(x),\ \dots,\ \nabla g_p(x)) \text{ est une famille libre de } \mathbb{R}^n \qquad \textbf{(Q)}$$

Alors $A$ est une **sous-variété de $\mathbb{R}^n$ de dimension $n-p$**.

**Remarque (cours).** La condition (Q) équivaut à dire que la matrice $M \in \mathcal{M}_{n,p}(\mathbb{R})$ formée par les $p$ vecteurs colonnes $(\nabla g_1(x),\dots,\nabla g_p(x))$ est de **rang $p$**.

**Définition 5.2 (cours).** Si $a \in A$, on dit que $a$ est **qualifié** si la condition $(Q_a)$ est satisfaite :

$$(\nabla g_1(a),\dots,\nabla g_p(a)) \text{ est une famille libre de } \mathbb{R}^n \qquad \textbf{(}Q_a\textbf{)}$$

**Proposition 5.3 (cours).** Soit $a \in A$ qualifié. Alors il existe $\epsilon>0$ tel que $\forall x \in B(a,\epsilon)$, $x$ est qualifié. **Conséquence :** $A \cap B(a,\epsilon)$ est une sous-variété de $\mathbb{R}^n$.

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment vérifier (Q) en pratique — les deux seuls cas des exercices.</span>

**Une seule contrainte ($p=1$)** : la famille $(\nabla g(x))$ est libre $\iff \nabla g(x) \neq 0$. **La qualification se réduit à « le gradient de la contrainte ne s'annule pas sur $A$ »** — c'est une vérification en deux lignes, et elle est **exigible**.

**Deux contraintes ($p=2$)** : $(\nabla g_1, \nabla g_2)$ est libre $\iff$ les deux vecteurs ne sont pas **colinéaires**. On cherche donc les points de $A$ où $\nabla g_1 = t\,\nabla g_2$ ; s'il n'y en a pas, tous les points sont qualifiés.

</div>

**Exemple 5 (cours).**

- $g(x,y) = x^2+y^2-1$ sur $\mathbb{R}^2$ : $A=\{g=0\}$ est une sous-variété de **dimension 1** de $\mathbb{R}^2$ (le **cercle unité**).
- $g(x,y,z) = x^2+y^2+z^2-1$ sur $\mathbb{R}^3$ : $A$ est une sous-variété de **dimension 2** de $\mathbb{R}^3$ (la **sphère unité**, une surface).
- $g(x_1,\dots,x_n) = x_1^2+\dots+x_n^2-1$ : sous-variété de **dimension $n-1$** (l'**hypersphère**).

> **La vérification pour le cercle, à savoir rédiger.** $\nabla g(x,y) = (2x,\ 2y)$, qui s'annule **uniquement** en $(0,0)$. Or $(0,0) \notin A$ puisque $g(0,0) = -1 \neq 0$. **Donc $\nabla g \neq 0$ en tout point de $A$ : la contrainte est qualifiée partout.**
>
> Cette phrase de deux lignes est à écrire dans **chaque** exercice sur le cercle — c'est-à-dire les exercices 5.1, 5.2 et l'exemple 9 du cours.

**Exemple 6 (cours).** Soit $g_1(x,y,z) = x^2+y^2+z^2-1$ et $g_2(x,y,z)= x+y+z-1$ sur $\mathbb{R}^3$. Alors

$$A = \{(x,y,z)\in\mathbb{R}^3,\ g_1 = 0,\ g_2 = 0\}$$

est une sous-variété de **dimension 1**.

> **La vérification.** $\nabla g_1 = (2x,2y,2z)$ et $\nabla g_2 = (1,1,1)$. La famille est liée $\iff \nabla g_1 = t\,\nabla g_2$, c'est-à-dire $x=y=z=t/2$. Reportons dans les deux contraintes :
>
> - $g_2 = 0$ donne $3\cdot\frac t2 = 1$, soit $\frac t2 = \frac13$ ;
> - $g_1 = 0$ donne $3\left(\frac t2\right)^2 = 1$, soit $\frac t2 = \pm\frac{1}{\sqrt3} = \pm 0{,}5773503$.
>
> $\frac13 = 0{,}3333333 \neq \pm 0{,}5773503$ : **les deux conditions sont incompatibles**. Il n'existe donc **aucun** point de $A$ où la famille soit liée : (Q) est vérifiée partout, et $\dim A = 3-2 = 1$.
>
> **Ce que $A$ est, concrètement** : l'intersection de la sphère unité et d'un plan. La distance de l'origine au plan vaut $\frac{\lvert -1\rvert}{\lVert(1,1,1)\rVert} = \frac{1}{\sqrt3} \approx 0{,}5774 < 1$, donc le plan **coupe** la sphère : c'est un **cercle**, de rayon $\sqrt{1-\frac13} = \sqrt{2/3} \approx 0{,}8165$. Une courbe, donc bien un objet de dimension 1.

## 🔴 Concept 2 — Vecteurs tangents (déf. 5.4 à prop. 5.6)

**Définition 5.4 (cours).** Soit $a \in A$. On dit que $c$ est une **courbe de $A$ passant par $a$** si $c \in C^1(\,]-\epsilon,\epsilon[\,)$ pour un $\epsilon>0$ et vérifie

$$c(\,]-\epsilon,\epsilon[\,) \subset A \qquad \text{et} \qquad c(0) = a .$$

**Définition 5.5 (cours).** On appelle **vecteur tangent** en $a \in A$ tout vecteur $v\in\mathbb{R}^n$ obtenu comme dérivée en $0$ d'une courbe de $A$ passant par $a$, c'est-à-dire $v = c'(0)$.

**Proposition 5.6 (cours).** L'ensemble des vecteurs tangents en $a\in A$ est un **espace vectoriel de dimension $n-p$**. C'est **l'orthogonal** de $\mathrm{Vect}\bigl(\nabla g_1(a),\dots,\nabla g_p(a)\bigr)$.

**Remarque (cours).** Trouver les vecteurs tangents en $a\in A$ revient à résoudre un **système à $p$ lignes et $n$ inconnues**.

**Exemple 7 (cours).** Décrire les vecteurs tangents dans les exemples précédents.

> **Réponse à l'exemple 7.**
>
> **Le cercle unité en $a=(a_1,a_2)$.** $\nabla g(a) = (2a_1, 2a_2)$. L'espace tangent est
>
> $$\{v : \langle \nabla g(a), v\rangle = 0\} = \{v : a_1 v_1 + a_2 v_2 = 0\} = \mathrm{Vect}\bigl((-a_2,\ a_1)\bigr),$$
>
> une droite ($n-p = 2-1 = 1$) — la **tangente au cercle**, orthogonale au rayon. On le vérifie sur $a = (1,0)$ : l'espace tangent est $\mathrm{Vect}((0,1))$, c'est bien la verticale.
>
> **La sphère unité de $\mathbb{R}^3$ en $a$.** $\{v : \langle a, v\rangle = 0\}$ : le **plan** orthogonal à $a$, de dimension $3-1=2$ .
>
> **L'exemple 6 (sphère ∩ plan) en $a$.** Le système est
>
> $$\begin{cases} a_1v_1 + a_2v_2 + a_3v_3 = 0 \\ v_1+v_2+v_3 = 0\end{cases}$$
>
> — **2 lignes, 3 inconnues**, comme l'annonce la remarque du cours. L'espace des solutions est une **droite** ($3-2=1$) , engendrée par le produit vectoriel $a \wedge (1,1,1)$.
>
> **La façon de retenir la proposition 5.6 :** *l'espace tangent est ce qui reste quand on a retiré, une par une, les directions dans lesquelles les contraintes bougent.* Chaque $\nabla g_i$ « confisque » une dimension.

## 🔴 Concept 3 — Le théorème des extrema liés (thm 5.7)

**Théorème 5.7 (cours).**

> Soit $f : A \to \mathbb{R}$ de classe $C^1$ sur un ouvert contenant $A$. Soit $a \in A$ **qualifié**. Si $a$ est un extremum local de $f$ **sur $A$**, alors il existe $(\lambda_1,\dots,\lambda_p) \in \mathbb{R}^p$ tels que
>
> $$\nabla f(a) + \sum_{i=1}^p \lambda_i \nabla g_i(a) = 0_{\mathbb{R}^n}.$$

**Remarque (cours).** Les réels $\lambda_1,\dots,\lambda_p$ sont appelés **multiplicateurs de Lagrange**.

**Preuve (celle du polycopié, à savoir refaire).**

> Il existe $\epsilon>0$ tel que $A_\epsilon = A\cap B(a,\epsilon)$ est une sous-variété de $\mathbb{R}^n$ (prop. 5.3) et $a$ est un extremum local de $f$ restreinte à $A_\epsilon$. Soit $v$ un vecteur tangent à $A_\epsilon$ en $a$.
>
> *Rappel :* $v$ est dans $\mathrm{Vect}\bigl(\nabla g_1(a),\dots,\nabla g_p(a)\bigr)^\perp$.
>
> Soit $c$ une courbe de $A_\epsilon$ passant par $a$ telle que $c'(0)=v$. Alors $t \mapsto f(c(t))$ admet un extremum local en $t=0$, donc $(f\circ c)'(0) = 0$, donc $\langle \nabla f(a),\ c'(0)\rangle = 0$, d'où
>
> $$\langle \nabla f(a),\ v\rangle = 0 .$$
>
> Ainsi $\nabla f(a)$ est **orthogonal à tous les vecteurs tangents** à $A_\epsilon$ en $a$, donc
>
> $$\nabla f(a) \in \mathrm{Vect}\bigl(\nabla g_1(a),\dots,\nabla g_p(a)\bigr)^{\perp\perp} = \mathrm{Vect}\bigl(\nabla g_1(a),\dots,\nabla g_p(a)\bigr). \qquad \textbf{FIN}$$

> **La preuve en trois mots : dériver le long d'une courbe.** C'est exactement la proposition 4.6 (fiche 602), avec une **courbe tracée dans $A$** au lieu d'une droite. La condition d'extremum local en $t=0$ — un point **intérieur** de $\,]-\epsilon,\epsilon[$ — donne une **égalité** (proposition 3.4). Puis on utilise deux fois la proposition 5.6 : une fois pour dire que $v$ est orthogonal aux $\nabla g_i$, une fois pour conclure par le double orthogonal.
>
> ⚠️ **Où la qualification sert** : elle est ce qui garantit que $A_\epsilon$ **est** une sous-variété, donc que les vecteurs tangents forment bien l'orthogonal de $\mathrm{Vect}(\nabla g_i(a))$ — c'est-à-dire que la proposition 5.6 s'applique. Sans elle, l'espace tangent peut être plus petit et l'argument s'effondre.
>
> **Le cas $p=1$, à visualiser** : $\nabla f(a) = -\lambda\,\nabla g(a)$ signifie que les deux gradients sont **colinéaires**. Comme $\nabla f$ est orthogonal à la ligne de niveau de $f$ et $\nabla g$ orthogonal à $A$, cela veut dire que **la ligne de niveau de $f$ et la contrainte sont tangentes en $a$**.

**Contre-exemple (cours).** Si on considère

$$f(x,y) = x^4+y^4 \quad\text{et}\quad A = \{g=0\} \text{ avec } g(x,y) = y-x^3-1,$$

on peut observer que $a=(0,1)$ vérifie la condition de colinéarité des gradients mais que $a$ **n'est pas un extremum local**.

> **Le contre-exemple, détaillé** (le cours dit « faire un dessin » ; voici le calcul).
>
> $\nabla f(x,y) = (4x^3,\ 4y^3)$, donc $\nabla f(0,1) = (0,\ 4)$. $\nabla g(x,y) = (-3x^2,\ 1)$, donc $\nabla g(0,1) = (0,\ 1)$. **Ils sont colinéaires** : $\nabla f(0,1) + \lambda\nabla g(0,1) = 0$ avec $\lambda = -4$. La condition du théorème 5.7 est satisfaite.
>
> **Et pourtant.** Paramétrons $A$ par $x=t$, $y=t^3+1$ (c'est un graphe, donc le paramétrage est global). Posons
>
> $$h(t) = f(t,\ t^3+1) = t^4 + (t^3+1)^4 .$$
>
> En développant : $(1+t^3)^4 = 1 + 4t^3 + 6t^6 + \dots$, donc
>
> $$h(t) = 1 + 4t^3 + t^4 + O(t^6) .$$
>
> **Le terme dominant est $4t^3$, de degré IMPAIR** : $h(t)-h(0)$ change de signe en $0$. Ce n'est ni un minimum ni un maximum.
>
> **Contrôle numérique** : $h(0) = 1$, $h(0{,}1) = 1{,}0041060$, $h(-0{,}1) = 0{,}9961060$. On a bien $h(-0{,}1) < h(0) < h(0{,}1)$.
>
> **La leçon — identique à celle du chapitre 3.** Le théorème 5.7 est une condition **nécessaire**. Les points qu'il fournit sont des **candidats**, exactement comme $f'(t_0)=0$ produisait des points critiques dont $t^3$ montrait qu'ils pouvaient n'être rien. **Il faut toujours conclure en comparant les valeurs de $f$.**

## 🔴 Concept 4 — Les points non qualifiés (encadré ATTENTION)

**Encadré ATTENTION (cours).** *Parfois, toute la contrainte n'est pas qualifiée. Il faut donc appliquer le théorème des extrema liés aux points **qualifiés** et en déduire quels sont parmi eux les points candidats à être des extrema locaux. Il faut ensuite calculer les valeurs de $f$ en ces points **ET pour les points non qualifiés**.*

⚠️ **C'est l'oubli le plus coûteux du chapitre.** Le théorème 5.7 ne dit **rien** aux points non qualifiés — ni qu'ils sont des extrema, ni qu'ils n'en sont pas. Ils doivent être ajoutés à la main à la liste des candidats.

**Exemple 8 (cours).** Montrer l'existence d'un minimum de $f(x,y) = (x-1)^2+y^2$ sur $A = \{(x,y)\in\mathbb{R}^2,\ x^2-y^2=0\}$. Déterminer le ou les minima de $f$ sur $A$.

<details class="details--riche">
<summary>

**Corrigé — exemple 8 du cours : la contrainte non qualifiée en un point**

</summary>

**Existence (l'argument est donné par le cours).** *On montre que $f$ est coercive sur $\mathbb{R}^2$ donc sur $A$, qu'elle est continue sur $A$ qui est un fermé de $\mathbb{R}^2$, donc $f$ admet un minimum sur $A$.*

Détaillons : $f(x,y) = (x-1)^2+y^2 \to +\infty$ quand $\lVert(x,y)\rVert\to\infty$ (c'est un carré de distance), donc $f$ est coercive. $A$ est l'image réciproque de $\{0\}$ par $g(x,y)=x^2-y^2$, continue : $A$ est **fermé** (prop. 2.12), et non borné. Le **théorème 4.9** donne un minimum global sur $A$. ∎

**Étape 1 — identifier $A$.** $x^2-y^2 = (x-y)(x+y) = 0$, donc

$$A = \{y = x\} \;\cup\; \{y=-x\} : \textbf{deux droites qui se croisent à l'origine.}$$

**Étape 2 — la qualification.** $\nabla g(x,y) = (2x,\ -2y)$, qui s'annule **uniquement** en $(0,0)$. Or $(0,0) \in A$ (puisque $0-0=0$).

$$\boxed{A_0 = \{(0,0)\} : \text{ le seul point NON qualifié.}}$$

C'est visible géométriquement : $A$ n'est pas une courbe lisse en $(0,0)$, c'est un **croisement**. Il n'y a pas de tangente unique. *(Comparez avec la proposition 5.6 : en $(0,0)$, l'espace tangent devrait être de dimension $2-1=1$, or les deux droites donnent deux directions distinctes.)*

**Étape 3 — le théorème 5.7 sur les points qualifiés.** Pour $(x,y) \neq (0,0)$ :

$$\nabla f + \lambda\nabla g = 0 \iff \begin{cases} 2(x-1) + 2\lambda x = 0 \\ 2y - 2\lambda y = 0\end{cases}$$

La **seconde équation** se factorise : $2y(1-\lambda) = 0$, donc $y = 0$ **ou** $\lambda = 1$.

- **Cas $y=0$** : la contrainte $x^2 = y^2 = 0$ impose $x=0$, donc le point $(0,0)$ — **exclu**, il n'est pas qualifié. Ce cas ne produit rien.
- **Cas $\lambda = 1$** : la première équation devient $2(x-1)+2x = 0$, soit $4x = 2$, donc $x = \frac12$. La contrainte donne $y^2 = x^2 = \frac14$, donc $y = \pm\frac12$.

$$\text{Candidats de Lagrange : } \left(\tfrac12,\ \tfrac12\right) \text{ et } \left(\tfrac12,\ -\tfrac12\right).$$

C'est exactement ce que le cours annonce : *« en appliquant le théorème des extrema liés aux autres points, on trouve comme possibilités $(\frac12, \pm\frac12)$ »*.

**Étape 4 — comparer, EN INCLUANT le point non qualifié.** C'est la consigne de l'encadré ATTENTION.

| Point | Statut | $f(x,y) = (x-1)^2+y^2$ |
|---|---|---|
| $\left(\frac12,\ \frac12\right)$ | candidat de Lagrange | $\frac14+\frac14 = \mathbf{0{,}5}$ |
| $\left(\frac12,\ -\frac12\right)$ | candidat de Lagrange | $\frac14+\frac14 = \mathbf{0{,}5}$ |
| $(0,0)$ | **non qualifié** | $1 + 0 = 1$ |

$$\boxed{\min_A f = \tfrac12, \text{ atteint en DEUX points : } \left(\tfrac12,\ \tfrac12\right) \text{ et } \left(\tfrac12,\ -\tfrac12\right).}$$

**Étape 5 — « Retrouver le résultat géométriquement » (demandé par le cours).** $f(x,y) = (x-1)^2+y^2$ est le **carré de la distance au point $P(1,0)$**. La question devient : *quel est le point des deux droites le plus proche de $P(1,0)$ ?*

```
      y
      2 ┤   ╲            ╱  y = x
        │    ╲          ╱
      1 ┤     ╲        ╱
        │      ╲      ╱   ● (½,½)   le pied de la perpendiculaire
        │       ╲    ╱   ╱
      0 ┤─────────╳───────────── ● P(1,0)
        │       ╱    ╲   ╲
        │      ╱      ╲   ● (½,−½)
     −1 ┤     ╱        ╲
        │    ╱  y = −x  ╲
        └────┴────┴────┴────┴───► x
            −1    0    1    2
```

La distance de $P(1,0)$ à la droite $y=x$ (d'équation $x-y=0$) vaut

$$\frac{\lvert 1-0\rvert}{\sqrt{1^2+(-1)^2}} = \frac{1}{\sqrt2}, \qquad \text{donc le carré vaut } \frac12 . \ \checkmark$$

Le pied de la perpendiculaire est le projeté orthogonal de $(1,0)$ sur $y=x$, soit $\left(\frac12,\frac12\right)$. Par symétrie par rapport à l'axe des $x$, la droite $y=-x$ donne $\left(\frac12,-\frac12\right)$, à la **même** distance — d'où les deux minima.

**Contrôle numérique** : minimisation de $f$ sur $A$ paramétré par $(t,t)$ et $(t,-t)$, $t\in[-3,3]$ au pas $10^{-5}$ : minimum $0{,}500000$ atteint en $t=0{,}50000$ sur **les deux** branches ; $f(0,0) = 1$.

**Ce que cet exemple enseigne, et pourquoi le cours le met en avant.**

1. Il faut **chercher** les points non qualifiés avant d'appliquer le théorème — pas après.
2. Il faut **évaluer $f$ dessus** : ils sont candidats de plein droit.
3. Ici $(0,0)$ n'était pas le minimum, mais **rien ne le garantissait**. Si $P$ avait été à l'origine, $(0,0)$ **aurait été** le minimum, et le théorème 5.7 ne l'aurait jamais trouvé.

</details>

<details class="details--riche">
<summary>

**Corrigé — exercices 5.1 et 5.2 du cours : $2x+y$ et $xy$ sur le cercle unité**

</summary>

### Exercice 5.1 — $f(x,y) = 2x+y$ sur $A = \{x^2+y^2=1\}$

**1. Existence.** $A$ est fermé (image réciproque de $\{0\}$ par $g=x^2+y^2-1$ continue, prop. 2.12) et borné ($\lVert(x,y)\rVert_2 = 1$), donc **compact** (thm 2.24). $f$ est linéaire donc continue. **Weierstrass (thm 4.7)** : $f$ admet un minimum **et** un maximum sur $A$, atteints. ∎

**2. Qualification.** $\nabla g(x,y) = (2x,2y)$ s'annule seulement en $(0,0)$, qui **n'est pas dans $A$** ($g(0,0)=-1\neq0$). **Tout point de $A$ est qualifié.**

**3. Le système de Lagrange** (convention du cours, avec un **plus**) :

$$\nabla f + \lambda\nabla g = 0 \iff \begin{cases} 2 + 2\lambda x = 0 \\ 1 + 2\lambda y = 0 \\ x^2+y^2 = 1\end{cases}$$

$\lambda \neq 0$ (sinon la première équation donnerait $2=0$). Donc

$$x = -\frac{1}{\lambda}, \qquad y = -\frac{1}{2\lambda}.$$

**Report dans la contrainte** :

$$\frac{1}{\lambda^2} + \frac{1}{4\lambda^2} = 1 \iff \frac{5}{4\lambda^2} = 1 \iff \lambda^2 = \frac54 \iff \lambda = \pm\frac{\sqrt5}{2}.$$

**4. Les deux candidats.**

| $\lambda$ | $x = -1/\lambda$ | $y=-1/(2\lambda)$ | $f = 2x+y$ |
|---|---|---|---|
| $-\dfrac{\sqrt5}{2}$ | $\dfrac{2}{\sqrt5} \approx 0{,}8944272$ | $\dfrac{1}{\sqrt5}\approx 0{,}4472136$ | $\mathbf{+\sqrt5} \approx 2{,}2360680$ |
| $+\dfrac{\sqrt5}{2}$ | $-\dfrac{2}{\sqrt5}$ | $-\dfrac{1}{\sqrt5}$ | $\mathbf{-\sqrt5} \approx -2{,}2360680$ |

$$\boxed{\max_A f = \sqrt5 \text{ en } \left(\tfrac{2}{\sqrt5},\ \tfrac{1}{\sqrt5}\right), \qquad \min_A f = -\sqrt5 \text{ en } \left(-\tfrac{2}{\sqrt5},\ -\tfrac{1}{\sqrt5}\right).}$$

**L'existence acquise à l'étape 1 fait le travail** : il y a exactement deux candidats, donc le plus grand est le max et le plus petit le min. **Aucune étude de nature n'est nécessaire.**

**Contrôle.** Le point est bien sur le cercle : $\frac45+\frac15 = 1$ . Et $f = \frac{4}{\sqrt5}+\frac{1}{\sqrt5} = \frac{5}{\sqrt5} = \sqrt5$ . Maximisation numérique sur le cercle paramétré au pas $10^{-6}$ rad : $\max = 2{,}2360680$ en $\theta = 0{,}4636476$ rad, et $(\cos\theta,\sin\theta) = (0{,}8944272,\ 0{,}4472136)$ .

> **La lecture géométrique (c'est l'exemple 9 du §5.3).** $f = 2x+y$ a pour lignes de niveau les **droites** $2x+y = \alpha$, toutes parallèles. On augmente $\alpha$ jusqu'à ce que la droite **touche** le cercle sans le couper : au point de tangence. Là, la normale à la droite — qui est $\nabla f = (2,1)$ — est colinéaire à la normale au cercle — qui est $\nabla g = (2x,2y)$. **C'est exactement le théorème 5.7, vu de l'extérieur.** Et $\sqrt5 = \lVert(2,1)\rVert$ : le maximum d'une forme linéaire sur la sphère unité est la norme de son vecteur.

### Exercice 5.2 — $f(x,y) = xy$ sur $A = \{x^2+y^2=1\}$

**1 et 2.** Identiques : $A$ compact, $f$ polynomiale continue, Weierstrass donne min et max ; $\nabla g \neq 0$ sur $A$, tout est qualifié.

**3. Le système.**

$$\begin{cases} y + 2\lambda x = 0 \\ x + 2\lambda y = 0 \\ x^2+y^2=1\end{cases}$$

De la première, $y = -2\lambda x$ ; en reportant dans la seconde : $x + 2\lambda(-2\lambda x) = x(1-4\lambda^2) = 0$.

- Si $x = 0$ : alors $y = 0$, mais $(0,0)\notin A$. **Impossible.**
- Donc $4\lambda^2 = 1$, soit $\lambda = \pm\frac12$.

**4. Les quatre candidats.**

| $\lambda$ | relation | points sur le cercle | $f=xy$ |
|---|---|---|---|
| $-\dfrac12$ | $y = x$ | $\left(\tfrac{1}{\sqrt2},\tfrac{1}{\sqrt2}\right)$ et $\left(-\tfrac{1}{\sqrt2},-\tfrac{1}{\sqrt2}\right)$ | $\mathbf{+\tfrac12}$ |
| $+\dfrac12$ | $y = -x$ | $\left(\tfrac{1}{\sqrt2},-\tfrac{1}{\sqrt2}\right)$ et $\left(-\tfrac{1}{\sqrt2},\tfrac{1}{\sqrt2}\right)$ | $\mathbf{-\tfrac12}$ |

$$\boxed{\max_A xy = \tfrac12 \text{ (deux points)}, \qquad \min_A xy = -\tfrac12 \text{ (deux points)}.}$$

**Quatre candidats, deux valeurs, chacune atteinte deux fois** — encore un cas de non-unicité. La raison est visible : $f(-x,-y) = f(x,y)$.

**Contrôle.** $\frac{1}{\sqrt2} = 0{,}7071068$, et $\left(\frac{1}{\sqrt2}\right)^2\times2 = 1$ , $f = \frac12 = 0{,}5$ . Balayage numérique du cercle au pas $10^{-6}$ rad : $\max = 0{,}5000000$ en $\theta = \frac\pi4$ et $\theta = \frac{5\pi}{4}$ ; $\min = -0{,}5000000$ en $\theta = \frac{3\pi}{4}$ et $\frac{7\pi}{4}$.

> **Le contrôle sans Lagrange, à connaître** : sur le cercle, $x=\cos\theta$, $y=\sin\theta$, donc
>
> $$xy = \cos\theta\sin\theta = \tfrac12\sin(2\theta) \in \left[-\tfrac12,\ \tfrac12\right].$$
>
> Le paramétrage donne la réponse en une ligne. **Quand la contrainte se paramètre facilement, c'est souvent plus rapide que Lagrange** — et cela fournit toujours un excellent contrôle du résultat.

</details>

## 🟠 Concept 5 — Une application : l'inégalité arithmético-géométrique (prop. 5.8)

**Proposition 5.8 (cours).** Soit $(x_1,\dots,x_n)\in(\mathbb{R}_+)^n$. On définit leur **moyenne arithmétique** par $\dfrac{x_1+\dots+x_n}{n}$ et leur **moyenne géométrique** par $\sqrt[n]{x_1\times\dots\times x_n}$. On a l'inégalité

$$\sqrt[n]{x_1\times\dots\times x_n} \;\le\; \frac{x_1+\dots+x_n}{n}.$$

**Idée de la preuve (cours).** *On définit $A = \{t\in(\mathbb{R}_+)^n,\ t_1+\dots+t_n=1\}$ et $f(t)=t_1\times\dots\times t_n$. On montre que le maximum de $f$ sur $A$ est $\left(\frac1n\right)^n$. Ensuite, pour $x\in(\mathbb{R}_+)^n$, on remarque que si l'un des $x_i$ est nul alors l'inégalité arithmético-géométrique est vraie. On travaille donc avec $x\in(\mathbb{R}_+^*)^n$, on pose $S = x_1+\dots+x_n>0$ et $t=\frac1S x \in A$ et on utilise $f(t) \le \left(\frac1n\right)^n$. Cela donne le résultat après un petit calcul.* **FIN**

> **Le « petit calcul » du cours, écrit en entier.** Avec $t_i = x_i/S$ :
>
> $$f(t) = \prod_{i=1}^n \frac{x_i}{S} = \frac{\prod x_i}{S^n} \;\le\; \left(\frac1n\right)^n .$$
>
> Donc $\prod x_i \le \dfrac{S^n}{n^n} = \left(\dfrac{S}{n}\right)^n$, et en prenant la racine $n$-ième (croissante sur $\mathbb{R}_+$) :
>
> $$\sqrt[n]{\prod x_i} \;\le\; \frac{S}{n} = \frac{x_1+\dots+x_n}{n}. \qquad \blacksquare$$
>
> **Le maximum de $f$ sur $A$, par Lagrange.** $g(t) = t_1+\dots+t_n-1$, donc $\nabla g = (1,\dots,1)$ — **jamais nul**, tout est qualifié. Le système $\nabla f + \lambda\nabla g = 0$ s'écrit, pour chaque $i$,
>
> $$\prod_{j\neq i} t_j + \lambda = 0 .$$
>
> À l'intérieur (tous les $t_j > 0$), en multipliant par $t_i$ : $\prod_j t_j = -\lambda t_i$ pour **tout** $i$. Le membre de gauche ne dépend pas de $i$, donc **tous les $t_i$ sont égaux** ; avec la contrainte, $t_i = \frac1n$ et
>
> $$f\left(\tfrac1n,\dots,\tfrac1n\right) = \left(\tfrac1n\right)^n .$$
>
> Les points du bord ($t_i=0$ pour un $i$) donnent $f=0$, qui est plus petit. C'est donc bien le maximum.
>
> **Contrôle numérique pour $n=3$** : $\left(\frac13\right)^3 = \frac1{27} = 0{,}0370370$. Maximisation de $t_1t_2t_3$ sous $t_1+t_2+t_3=1$, $t_i\ge0$, sur une grille au pas $10^{-3}$ : maximum $0{,}0370370$ en $(0{,}333,\ 0{,}333,\ 0{,}334)$ .
>
> **Vérification de l'inégalité elle-même** sur $(x_1,x_2,x_3) = (1,\ 4,\ 16)$ : moyenne géométrique $\sqrt[3]{64} = 4$, moyenne arithmétique $\frac{21}{3} = 7$. On a bien $4 \le 7$ . Sur $(3,3,3)$ : $3 \le 3$ — **égalité**, atteinte exactement quand tous les $x_i$ sont égaux, ce que la preuve explique (tous les $t_i$ égaux).

## 🔴 Concept 6 — Gradient, lignes de niveau et lecture géométrique (§5.3)

**Proposition 5.9 (cours).** Soit $U$ ouvert de $\mathbb{R}^n$, $f\in C^1(U)$, $a\in U$. On appelle **direction** un vecteur $h\in\mathbb{R}^n$ tel que $\lVert h\rVert = 1$. La **pente de $f$ dans la direction $h$** en partant de $a$ est $\varphi'(0)$ où $\varphi(t)=f(a+th)$. On a la formule

$$\varphi'(0) = \langle\nabla f(a),\ h\rangle .$$

$h = \dfrac{\nabla f(a)}{\lVert\nabla f(a)\rVert}$ est la **direction de plus forte pente** de $f$ en partant de $a$. De plus, la plus forte pente est $\lVert\nabla f(a)\rVert$.

> **Preuve reconstruite — c'est Cauchy-Schwarz, en une ligne.** Pour $\lVert h\rVert=1$,
>
> $$\langle\nabla f(a), h\rangle \le \lVert\nabla f(a)\rVert\,\lVert h\rVert = \lVert\nabla f(a)\rVert,$$
>
> avec **égalité si et seulement si $h$ est colinéaire à $\nabla f(a)$ et de même sens**, c'est-à-dire $h = \nabla f(a)/\lVert\nabla f(a)\rVert$. ∎
>
> **Deux conséquences à retenir :** le gradient pointe vers la **montée** la plus rapide (d'où la méthode de descente de gradient, qui suit $-\nabla f$) ; et sa **norme** est la valeur de cette pente.

**Définition 5.10 (cours).** La **ligne de niveau $\alpha$** de $f$ est $L_f(\alpha) = \{x\in U,\ f(x)=\alpha\}$. L'**ensemble de sous-niveau $\alpha$** est $S_f(\alpha) = \{x\in U,\ f(x)\le\alpha\}$.

**Exemple 9 (cours).** Trouver **graphiquement** où $f(x,y)=x+y$ prend ses extrema sur $A=\{x^2+y^2=1\}$ grâce aux lignes de niveau de $f$.

> **Réponse à l'exemple 9.** Les lignes de niveau de $f=x+y$ sont les droites $x+y=\alpha$, de pente $-1$, toutes parallèles. On les fait glisser en augmentant $\alpha$ :
>
> ```
>              ╲          ╲          ╲   les lignes de niveau x+y = α
>               ╲          ╲          ╲
>          ______╲__________╲__________╲______
>               ╱ ╲    ___   ╲          ╲
>              ╱   ╲ ⟋     ⟍  ●          ╲   ← α = √2 : TANGENCE
>             ╱     |   ●     |  ╲          au point (1/√2, 1/√2)
>            ╱      ⟍  0,0   ⟋   ╲          ⟹  MAXIMUM
>           ●        ‾‾‾‾‾‾‾      ╲
>       α = −√2 : tangence de l'autre côté ⟹ MINIMUM
> ```
>
> - $\alpha$ trop grand : la droite **ne touche pas** le cercle — aucune solution.
> - $\alpha$ juste bon : la droite est **tangente** — c'est le maximum.
> - $\alpha$ plus petit : la droite **coupe** le cercle en deux points — on peut faire mieux.
>
> **À la tangence, la normale à la droite ($\nabla f = (1,1)$) est colinéaire à la normale au cercle ($\nabla g = (2x,2y)$)** : c'est le théorème 5.7. Le point est $\left(\frac{1}{\sqrt2},\frac{1}{\sqrt2}\right)$ et
>
> $$\max_A (x+y) = \frac{2}{\sqrt2} = \sqrt2 \approx 1{,}4142136, \qquad \min_A(x+y) = -\sqrt2 .$$
>
> **Contrôle** : $\lVert(1,1)\rVert = \sqrt2$ — la même règle qu'à l'exercice 5.1 ($\sqrt5 = \lVert(2,1)\rVert$).

**Proposition 5.11 (cours).** Si $a\in L_f(\alpha)$ (c'est-à-dire $\alpha = f(a)$) et si $\nabla f(a)\neq 0_{\mathbb{R}^n}$, alors $L_f(\alpha)$ est **localement une hypersurface** de $\mathbb{R}^n$ autour de $a$. De plus, $\nabla f(a)$ est **orthogonal à tout vecteur tangent** à $L_f(\alpha)$ en $a$. En fait, l'ensemble des vecteurs tangents en $a$ à $L_f(\alpha)$ est précisément $\mathrm{Vect}(\nabla f(a))^\perp$.

**Ce que dit le cours pour conclure le §5.3.** *Quand on augmente le niveau pour trouver un minimum local de $f$ sur $A$, la ligne de niveau va forcément rencontrer $A$ en un point $a$ tel que l'espace tangent à $A$ en $a$ soit inclus dans l'hyperplan tangent à $L_f(f(a))$ en $a$. Sinon, $L_f(f(a))$ « couperait » $A$ et $a$ ne pourrait être un minimum local.*

> **La phrase à retenir de tout le §5.3 :** *à l'optimum, la ligne de niveau et la contrainte sont **tangentes**, jamais sécantes.* Si elles se coupaient, on pourrait glisser le long de $A$ vers un meilleur niveau. C'est l'intuition complète du théorème 5.7, et c'est ce qu'on demande de savoir expliquer sur un dessin.

## 🔴 Concept 7 — L'interprétation des multiplicateurs (§5.4)

C'est le paragraphe qui donne son sens économique à $\lambda$, et il tombe en question de cours.

**Le montage (cours).** Pour $U$ ouvert de $\mathbb{R}^n$, on considère le problème $(P)$ d'extremum de $f\in C^1(U)$ sous la contrainte

$$A = \{x\in U,\ \forall i=1\dots p,\ g_i(x)=0\}$$

puis le problème $(P_\epsilon)$ sous la contrainte **perturbée**

$$A_{i_0,\epsilon} = \{x\in U,\ \forall i\neq i_0,\ g_i(x)=0,\ \ g_{i_0}(x)+\epsilon = 0\}.$$

On note $a$ le point où l'extremum est pris pour $(P)$ et $c(\epsilon)$ celui de $(P_\epsilon)$ (en admettant qu'il est unique). Cela définit une courbe $\epsilon\mapsto c(\epsilon)$ avec $c(0)=a$, supposée $C^1$ autour de $0$. On suppose $a$ qualifié.

**Le résultat (cours).**

$$\boxed{(f\circ c)'(0) = \lambda_{i_0}}$$

**Preuve (celle du polycopié).**

> $(f\circ c)'(0) = \langle\nabla f(a),\ c'(0)\rangle = -\left\langle \sum_{i=1}^p \lambda_i\nabla g_i(a),\ c'(0)\right\rangle = -\sum_{i=1}^p \lambda_i\langle\nabla g_i(a),\ c'(0)\rangle = -\sum_{i=1}^p \lambda_i\,(g_i\circ c)'(0).$
>
> Or $c(\epsilon)\in A_{i_0,\epsilon}$ donc $\forall i\neq i_0$, $(g_i\circ c)(\epsilon) = 0$ et $(g_{i_0}\circ c)(\epsilon) = -\epsilon$. D'où $\forall i\neq i_0$, $(g_i\circ c)'(0)=0$ mais $(g_{i_0}\circ c)'(0) = -1$, **d'où la formule**.

> **Décryptage de la preuve.** Elle se lit en trois temps : (1) on remplace $\nabla f(a)$ par son expression du théorème 5.7 ; (2) chaque $\langle\nabla g_i(a), c'(0)\rangle$ est la dérivée de $g_i$ le long de la courbe $c$ ; (3) toutes ces dérivées sont **nulles sauf une**, celle de la contrainte perturbée, qui vaut $-1$. Le double signe moins produit le $+\lambda_{i_0}$.

**Interprétation économique (cours).**

> *Si $f$ est une fonction d'utilité qu'on veut maximiser et les $g_i$ des contraintes de dépense par exemple, supposons qu'on doive baisser les dépenses. On va chercher à baisser les dépenses en faisant baisser le moins possible l'utilité. Les multiplicateurs de Lagrange nous disent donc quelle dépense faire baisser : il suffit de regarder quel est le plus grand des $\lambda_i$.*
>
> *Par exemple, s'il y a 3 contraintes $g_1,g_2,g_3$ et si $\lambda_1 = -5$, $\lambda_2 = -1$, $\lambda_3 = -7$, on va choisir de relâcher la contrainte $g_2$ car c'est elle qui fera le moins baisser l'utilité.*
>
> *Si au contraire, on veut augmenter une dépense de la façon la plus efficace pour l'utilité, on choisira d'augmenter la dépense 3.*
>
> *Voir les notions de profit marginal, coût marginal, gain de productivité marginal.*

> **Le tableau à retenir**, avec les chiffres exacts du cours :
>
> |  | $\lambda_1 = -5$ | $\lambda_2 = -1$ | $\lambda_3 = -7$ |
> |---|---|---|---|
> | **le plus grand** $\lambda_i$ |  | $-1$ |  |
> | à **relâcher** si on doit couper |  | **$g_2$** |  |
> | à **augmenter** pour le meilleur rendement |  |  | **$g_3$** |
>
> **La logique** : $\lambda_i$ mesure de combien varie la valeur optimale quand on relâche la contrainte $i$ d'une unité. Si l'on **doit** perdre, on perd sur la contrainte dont $\lambda$ est le **moins négatif** — c'est-à-dire le **plus grand**. Si l'on **peut** investir, on investit là où $\lVert\lambda\rVert$ est le plus grand, c'est-à-dire sur $g_3$.

**Exemple 10 (cours).** Avec 2 produits en quantité $x$ et $y$, valant $2$ et $3$ euros l'unité, on produit un autre produit en quantité $f(x,y)=xy$. La contrainte de dépense est $g(x,y) = 2x+3y = 120$ euros.

- Déterminer le choix optimal $(x^\ast, y^\ast)$. Quelle est alors la production optimale ? (On notera la valeur du multiplicateur $\lambda$.)
- Mêmes questions avec la contrainte $g(x,y) = 120-\epsilon$.
- Calculer la dérivée en $0$ par rapport à $\epsilon$ de la production optimale. Retrouver le résultat théorique donné par $(f\circ c)'(0)=\lambda$.

<details class="details--riche">
<summary>

**Corrigé — exemple 10 du cours : le problème de production, et $\lambda$ vérifié au chiffre près**

</summary>

**Partie 1 — le choix optimal.**

Posons $g(x,y) = 2x+3y-120$, de sorte que la contrainte s'écrive $g=0$.

*Qualification* : $\nabla g = (2,\ 3) \neq 0$ **partout**. Tous les points sont qualifiés. *(C'est la situation d'une contrainte **affine** : elle est toujours qualifiée — on retrouvera cela sous le nom de condition (QCA) au chapitre 6.)*

*Le système de Lagrange* (convention du cours, un **plus**) :

$$\nabla f + \lambda\nabla g = 0 \iff \begin{cases} y + 2\lambda = 0 \\ x + 3\lambda = 0\end{cases} \iff \begin{cases} y = -2\lambda \\ x = -3\lambda\end{cases}$$

*Report dans la contrainte* :

$$2(-3\lambda) + 3(-2\lambda) = -12\lambda = 120 \qquad\Longrightarrow\qquad \boxed{\lambda = -10}$$

$$\boxed{x^\ast = 30, \qquad y^\ast = 20, \qquad f(x^\ast,y^\ast) = 30\times20 = 600 .}$$

*Contrôle de la contrainte* : $2(30)+3(20) = 60+60 = 120$ . **Le budget est dépensé pour moitié sur chaque produit** — un fait classique pour une fonction de production $xy$ (Cobb-Douglas à exposants égaux).

*C'est bien un maximum* : le domaine admissible $\{2x+3y=120,\ x\ge0,\ y\ge0\}$ est un **segment** — compact — et $f$ y est continue, donc Weierstrass donne un maximum. Sur les extrémités du segment ($(60,0)$ et $(0,40)$), $f=0$. Le seul candidat intérieur est $(30,20)$ avec $f=600 > 0$ : **c'est le maximum**.

**Partie 2 — la contrainte perturbée $2x+3y = 120-\epsilon$.**

Le calcul est le même avec $120$ remplacé par $120-\epsilon$ :

$$-12\lambda(\epsilon) = 120-\epsilon \quad\Longrightarrow\quad \lambda(\epsilon) = -10 + \frac{\epsilon}{12},$$

$$x^\ast(\epsilon) = -3\lambda(\epsilon) = 30 - \frac{\epsilon}{4}, \qquad y^\ast(\epsilon) = -2\lambda(\epsilon) = 20 - \frac{\epsilon}{6}.$$

**La production optimale perturbée :**

$$F(\epsilon) = x^\ast(\epsilon)\,y^\ast(\epsilon) = \left(30-\frac\epsilon4\right)\left(20-\frac\epsilon6\right) = 600 - \frac{30\epsilon}{6} - \frac{20\epsilon}{4} + \frac{\epsilon^2}{24}$$

$$\boxed{F(\epsilon) = 600 - 10\,\epsilon + \frac{\epsilon^2}{24}}$$

**Partie 3 — la dérivée en $0$.**

$$F'(\epsilon) = -10 + \frac{\epsilon}{12}, \qquad\text{donc}\qquad F'(0) = -10 = \lambda . \ \blacksquare$$

**Le résultat théorique $(f\circ c)'(0) = \lambda$ est vérifié exactement.**

**Contrôle numérique.** Prenons $\epsilon = 0{,}12$ (une baisse de budget de 12 centimes) :

|  | Valeur |
|---|---|
| $x^\ast(0{,}12) = 30 - 0{,}03$ | $29{,}97$ |
| $y^\ast(0{,}12) = 20 - 0{,}02$ | $19{,}98$ |
| contrainte : $2(29{,}97)+3(19{,}98)$ | $119{,}88 = 120-0{,}12$ |
| production $F = 29{,}97\times19{,}98$ | $\mathbf{598{,}8006}$ |
| prédiction $600 - 10(0{,}12) + \frac{0{,}0144}{24}$ | $\mathbf{598{,}8006}$ |
| approximation linéaire $600 - 10(0{,}12)$ | $598{,}8$ |
| écart à la linéaire | $6\times10^{-4}$, soit $\epsilon^2/24$ |

**La lecture économique de $\lambda = -10$.** *Retirer un euro de budget fait perdre 10 unités de production.* Symétriquement, **ajouter** un euro en fait gagner 10 : c'est le **rendement marginal de l'euro investi**, ce que le cours appelle le *gain de productivité marginal*, et ce que l'économie nomme **prix fantôme** (*shadow price*).

**Vérification de cette lecture sur un euro entier**, $\epsilon = -1$ (on **ajoute** un euro) :

$$F(-1) = 600 + 10 + \frac{1}{24} = 610{,}0416667 .$$

On gagne $10{,}04$ unités — soit **$\lambda$ à $0{,}4\,\%$ près**. L'écart est le terme du second ordre : $\lambda$ est une dérivée, donc une approximation valable **pour de petites variations**.

⚠️ **Le piège de signe, à ne surtout pas rater.** Avec la convention **plus** du cours, $\lambda = -10$ est **négatif** alors que le budget est manifestement utile. Ce n'est pas une contradiction : ici $\epsilon > 0$ signifie qu'on **retire** du budget (la contrainte devient $g+\epsilon=0$, c'est-à-dire $2x+3y = 120-\epsilon$), et la production **baisse**. Le signe est cohérent.

Avec l'autre convention ($\nabla f = \mu\nabla g$), on aurait $\mu = +10$ et la lecture usuelle « un euro de plus rapporte 10 ». **Les deux disent la même chose ; il faut juste ne pas mélanger les conventions au milieu d'une copie.**

</details>

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | La bonne réaction | L'outil |
|---|---|---|
| « sur $\{g=0\}$ », « sur le cercle », « sous la contrainte $\dots =$ » | contrainte d'**égalité** → Lagrange | thm 5.7 |
| contrainte $\le$ ou $\ge$ | **pas ce chapitre** → KKT | ch. 6, fiche 605 |
| $A$ est borné (cercle, sphère, segment) | compact → Weierstrass d'abord | thm 4.7 |
| $g$ **affine** ($ax+by=c$) | $\nabla g$ constant $\neq0$ : **toujours qualifié** | déf. 5.2 |
| $g$ quadratique ($x^2+y^2-1$) | $\nabla g = 0$ seulement en $0$, hors de $A$ | déf. 5.2 |
| $g$ se factorise ($x^2-y^2$) | **cherchez les points non qualifiés** | encadré ATTENTION |
| « le ou les extrema » | il y en a **plusieurs** | exercices 5.2, exemple 8 |
| « retrouver géométriquement » | compléter les carrés → une **distance** | exemple 8 |
| « interpréter $\lambda$ » | sensibilité de la valeur optimale | §5.4 |
| contrainte facilement paramétrable | **paramétrez** — c'est plus rapide, et ça contrôle | exercice 5.2 |

**Les deux signaux d'un point non qualifié :**

1. $g$ se **factorise** ($x^2-y^2$, $xy$, $x^3-y^2$) → l'ensemble a un **croisement** ou un **rebroussement** ;
2. $\nabla g = 0$ a une solution **qui est dans $A$**. C'est la vérification à faire systématiquement.

## Comment résoudre ce type d'exercice

**Le protocole complet — six étapes, dans cet ordre.**

1. **Existence.** $A$ compact (cercle, sphère, segment) → Weierstrass (thm 4.7), min **et** max. $A$ fermé non borné → coercivité (thm 4.9), min seulement. **Cette étape n'est pas décorative** : elle vous dispensera d'étudier la nature des candidats à l'étape 6.
2. **Qualification — et la chasse aux points non qualifiés.** Calculer $\nabla g_i$. Résoudre $\nabla g = 0$ (cas $p=1$) ou chercher la colinéarité (cas $p=2$). **Noter $A_0$ l'ensemble des points de $A$ où la famille n'est pas libre.**
3. **Le système de Lagrange** sur $A\setminus A_0$ : $$\begin{cases} \nabla f(a) + \sum_i \lambda_i\nabla g_i(a) = 0 & (n \text{ équations})\\ g_i(a) = 0 & (p \text{ équations})\end{cases}$$ soit $n+p$ équations à $n+p$ inconnues $(a_1,\dots,a_n,\lambda_1,\dots,\lambda_p)$.
4. **Résoudre.** Les trois techniques qui couvrent les exercices du cours :
  - **exprimer $x$ et $y$ en fonction de $\lambda$**, puis reporter dans la contrainte (exercice 5.1) ;
  - **factoriser** une équation pour obtenir une disjonction de cas (exercice 5.2, exemple 8) ;
  - **diviser** deux équations membre à membre pour éliminer $\lambda$ (utile quand $\lambda$ apparaît en facteur).
5. **Ajouter $A_0$ à la liste des candidats.** C'est la consigne explicite de l'encadré ATTENTION.
6. **Calculer $f$ sur tous les candidats et comparer.** Si l'étape 1 a donné l'existence, le plus grand est le max et le plus petit le min — **aucune étude de nature n'est nécessaire**.

**Le contrôle qui rattrape les erreurs de calcul.** Vérifiez toujours que vos candidats **satisfont la contrainte**. Dans l'exercice 5.1, $\left(\frac{2}{\sqrt5}\right)^2 + \left(\frac{1}{\sqrt5}\right)^2 = \frac45+\frac15 = 1$ . C'est instantané et cela détecte l'essentiel des fautes de signe.

**Quand la contrainte se paramètre, faites-le en contrôle.** Sur le cercle : $x=\cos\theta$, $y=\sin\theta$. L'exercice 5.2 devient $\frac12\sin2\theta$, dont l'amplitude $\frac12$ se lit sans calcul. **Une réponse obtenue par deux méthodes différentes est une réponse sûre.**

## 🔴 Common mistakes

1. **Chercher $\nabla f(a)=0$ sur la contrainte.** $A$ n'a **aucun** point intérieur (un cercle est d'intérieur vide) : la proposition 4.11 ne s'applique jamais. C'est tout l'objet du chapitre.
2. **Oublier de vérifier la qualification.** C'est une hypothèse **explicite** du théorème 5.7, et elle vaut un point de rédaction dans chaque exercice.
3. **Oublier d'évaluer $f$ sur les points non qualifiés.** L'encadré ATTENTION est catégorique. Dans l'exemple 8, $(0,0)$ doit figurer au tableau final.
4. **Mélanger les conventions de signe.** Le cours écrit $\nabla f + \sum\lambda_i\nabla g_i = 0$. Avec l'autre convention, tous les $\lambda$ changent de signe — et l'interprétation du §5.4 s'inverse.
5. **Conclure qu'un candidat de Lagrange est un extremum.** Le contre-exemple du cours ($x^4+y^4$ sur $y=x^3+1$) le réfute : $(0,1)$ satisfait la colinéarité et n'est rien.
6. **Oublier l'équation de contrainte dans le système.** Elle fait partie des $n+p$ équations ; sans elle, le système est sous-déterminé.
7. **Diviser par $\lambda$ sans traiter le cas $\lambda=0$.** Dans l'exercice 5.1, il faut d'abord constater que $\lambda\neq0$ (sinon la première équation donne $2=0$).
8. **Diviser par une variable sans traiter le cas où elle s'annule.** Dans l'exercice 5.2, le cas $x=0$ doit être écarté explicitement (il donnerait $(0,0)\notin A$).
9. **Croire que l'espace tangent est $\mathrm{Vect}(\nabla g_i)$.** C'est son **orthogonal** (prop. 5.6). Le gradient est **normal** à la contrainte, pas tangent.
10. **Se tromper de dimension.** Une sous-variété de $\mathbb{R}^n$ définie par $p$ contraintes est de dimension $n-p$, pas $p$. Le cercle dans $\mathbb{R}^2$ : $2-1=1$.
11. **Prendre le plus grand $\lvert\lambda_i\rvert$ pour choisir quelle contrainte relâcher.** Le cours dit **le plus grand $\lambda_i$** (avec son signe) : parmi $-5$, $-1$, $-7$, c'est $-1$, donc $g_2$.
12. **Utiliser $\lambda$ pour une grande variation.** $\lambda$ est une **dérivée** : l'approximation vaut au premier ordre. Dans l'exemple 10, un euro entier donne $10{,}04$ au lieu de $10$.

## 📌 Ultimate Review

**Le chapitre 5 en un paragraphe.** Sur une contrainte d'égalité, aucun point n'est intérieur : $\nabla f=0$ est inapplicable. On demande d'abord que la contrainte soit **qualifiée** — les $\nabla g_i$ forment une famille libre (Q) — ce qui fait de $A$ une **sous-variété de dimension $n-p$** dont l'espace tangent en $a$ est l'**orthogonal** de $\mathrm{Vect}(\nabla g_i(a))$. Le **théorème des extrema liés** dit alors qu'en un extremum local qualifié, $\nabla f(a)$ appartient à $\mathrm{Vect}(\nabla g_i(a))$ : géométriquement, la ligne de niveau de $f$ est **tangente** à la contrainte. La preuve consiste à dériver $f$ le long d'une **courbe tracée dans $A$**. Les points **non qualifiés** échappent au théorème et doivent être ajoutés à la main aux candidats. Enfin, le multiplicateur $\lambda_{i_0}$ est la **dérivée de la valeur optimale** par rapport à un relâchement de la contrainte $i_0$ : c'est le prix fantôme.

**Les sept énoncés à savoir citer.**

| N° | Énoncé | Usage |
|---|---|---|
| **(Q)** | les $\nabla g_i(x)$ forment une famille libre sur $A$ | vérification obligatoire |
| **5.1** | (Q) ⟹ $A$ sous-variété de dimension $n-p$ | la structure |
| **5.3** | $a$ qualifié ⟹ tout un voisinage l'est | rend la preuve locale possible |
| **5.6** | tangents $= \mathrm{Vect}(\nabla g_i(a))^\perp$, dimension $n-p$ | le cœur de la preuve |
| **5.7** | $\nabla f(a) + \sum\lambda_i\nabla g_i(a) = 0$ | **le théorème** |
| **5.9** | plus forte pente $=\nabla f/\lVert\nabla f\rVert$, valeur $\lVert\nabla f\rVert$ | lecture géométrique |
| **§5.4** | $(f\circ c)'(0) = \lambda_{i_0}$ | l'interprétation |

**Les réponses des exercices du chapitre.**

| Ex. | Problème | Réponse |
|---|---|---|
| **5.1** | $2x+y$ sur le cercle | $\pm\sqrt5$ en $\pm\left(\frac2{\sqrt5},\frac1{\sqrt5}\right)$ ; $\lambda = \mp\frac{\sqrt5}{2}$ |
| **5.2** | $xy$ sur le cercle | $\pm\frac12$, **deux points chacun** ; $\lambda=\mp\frac12$ |
| **Ex. 8** | $(x-1)^2+y^2$ sur $x^2=y^2$ | min $\frac12$ en $\left(\frac12,\pm\frac12\right)$ ; $(0,0)$ **non qualifié**, $f=1$ |
| **Ex. 9** | $x+y$ sur le cercle | $\pm\sqrt2$ — tangence des lignes de niveau |
| **Ex. 10** | $\max xy$ sous $2x+3y=120$ | $(30,20)$, $f=600$, $\boxed{\lambda=-10}$ |
| **5.8** | inégalité arithmético-géométrique | $\max \prod t_i$ sur le simplexe $=\left(\frac1n\right)^n$ |

**La formule-réflexe et sa lecture.**

$$\nabla f(a) + \sum_{i=1}^p\lambda_i\nabla g_i(a) = 0 \qquad\text{et}\qquad (f\circ c)'(0) = \lambda_{i_0}.$$

*Le gradient de l'objectif est une combinaison des gradients des contraintes ; le coefficient de chacune est le prix qu'on paierait à la relâcher.*

**Ce que le chapitre 6 ajoutera** : des contraintes d'**inégalité**. Le théorème 5.7 y survivra presque tel quel — mais avec deux conditions supplémentaires sur les nouveaux multiplicateurs : $\mu_j \ge 0$ et $\mu_j h_j(a)=0$. Le chapitre 5 est **le cas particulier de KKT sans inégalités**.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Énoncer l'hypothèse (Q) et expliquer comment la vérifier pour une seule contrainte.**

</summary>

**(Q)** : $\forall x\in A$, la famille $(\nabla g_1(x),\dots,\nabla g_p(x))$ est **libre** dans $\mathbb{R}^n$. De façon équivalente, la matrice $n\times p$ de ces gradients est de **rang $p$**.

**Pour $p=1$** : une famille d'un seul vecteur est libre $\iff$ ce vecteur est **non nul**. Il suffit donc de vérifier que $\nabla g(x)\neq0$ pour tout $x\in A$.

**Exemple type (le cercle)** : $g=x^2+y^2-1$, $\nabla g = (2x,2y)$ s'annule uniquement en $(0,0)$, qui n'appartient pas à $A$ car $g(0,0)=-1\neq0$. **Donc tout point de $A$ est qualifié.**

Conséquence : $A$ est une sous-variété de dimension $n-p = 1$.

</details>

<details class="details--riche">
<summary>

**2. Énoncer la proposition 5.6 et l'illustrer sur le cercle.**

</summary>

L'ensemble des vecteurs tangents en $a\in A$ est un **espace vectoriel de dimension $n-p$**, égal à $\mathrm{Vect}(\nabla g_1(a),\dots,\nabla g_p(a))^\perp$.

**Sur le cercle en $a=(a_1,a_2)$** : $\nabla g(a) = (2a_1,2a_2)$, donc l'espace tangent est

$$\{v : a_1v_1+a_2v_2 = 0\} = \mathrm{Vect}\bigl((-a_2,\ a_1)\bigr),$$

une droite ($2-1=1$) : la **tangente au cercle**, orthogonale au rayon. En $a=(1,0)$, c'est $\mathrm{Vect}((0,1))$, la verticale.

**Le point à ne pas inverser** : le gradient est **normal** à la contrainte ; l'espace tangent est son **orthogonal**.

</details>

<details class="details--riche">
<summary>

**3. Démontrer le théorème des extrema liés.**

</summary>

Par la proposition 5.3, il existe $\epsilon>0$ tel que $A_\epsilon = A\cap B(a,\epsilon)$ soit une sous-variété, et $a$ y est un extremum local de $f$.

Soit $v$ un vecteur tangent à $A_\epsilon$ en $a$, et $c$ une courbe de $A_\epsilon$ passant par $a$ avec $c'(0)=v$. Alors $t\mapsto f(c(t))$ a un extremum local **en $t=0$**, point **intérieur** de $\,]-\epsilon,\epsilon[$ : donc $(f\circ c)'(0)=0$, c'est-à-dire

$$\langle\nabla f(a),\ v\rangle = 0 .$$

Ceci vaut pour **tout** vecteur tangent $v$. Donc $\nabla f(a) \in \bigl(\mathrm{Vect}(\nabla g_i(a))^\perp\bigr)^\perp = \mathrm{Vect}(\nabla g_i(a))$ (prop. 5.6), c'est-à-dire qu'il existe des $\lambda_i$ avec $\nabla f(a) + \sum\lambda_i\nabla g_i(a)=0$. ∎

**Où sert la qualification** : elle garantit que $A_\epsilon$ est une sous-variété, donc que la proposition 5.6 s'applique.

</details>

<details class="details--riche">
<summary>

**4. Donner le contre-exemple du cours à la réciproque du théorème 5.7, et le justifier.**

</summary>

$f(x,y)=x^4+y^4$ sur $A=\{y-x^3-1=0\}$, au point $a=(0,1)$.

$\nabla f(0,1) = (0,4)$ et $\nabla g(0,1) = (0,1)$ : **colinéaires**, avec $\lambda=-4$. La condition du théorème 5.7 est satisfaite.

Mais en paramétrant $A$ par $x=t$, $y=t^3+1$ :

$$h(t) = t^4 + (t^3+1)^4 = 1 + 4t^3 + t^4 + O(t^6).$$

Le terme dominant $4t^3$ est de **degré impair** : $h$ traverse la valeur $h(0)=1$.

**Numériquement** : $h(-0{,}1) = 0{,}9961060 < 1 < 1{,}0041060 = h(0{,}1)$. Ni min ni max.

**Conclusion** : le théorème 5.7 donne des **candidats**, jamais une conclusion.

</details>

<details class="details--riche">
<summary>

**5. Que dit l'encadré ATTENTION du §5.2 ? Illustrer avec l'exemple 8.**

</summary>

Quand la contrainte n'est **pas qualifiée partout**, il faut appliquer le théorème 5.7 aux seuls points qualifiés, **puis calculer $f$ sur les points qualifiés candidats ET sur les points non qualifiés**.

**Exemple 8** : $f(x,y)=(x-1)^2+y^2$ sur $A=\{x^2-y^2=0\}$, c'est-à-dire les deux droites $y=\pm x$.

$\nabla g = (2x,-2y)$ s'annule en $(0,0) \in A$ : **le seul point non qualifié**.

Lagrange sur le reste donne $\left(\frac12,\pm\frac12\right)$, avec $f=\frac12$. Et $f(0,0)=1$.

**Conclusion** : $\min_A f = \frac12$, en **deux** points. Le point non qualifié n'était pas le minimum ici — mais rien ne le garantissait a priori.

</details>

<details class="details--riche">
<summary>

**6. Résoudre l'exercice 5.1 : extrema de $2x+y$ sur le cercle unité.**

</summary>

*Existence* : $A$ compact, $f$ continue → Weierstrass, min et max.

*Qualification* : $\nabla g=(2x,2y)\neq0$ sur $A$ .

*Système* : $2+2\lambda x = 0$ et $1+2\lambda y = 0$, donc $x=-\frac1\lambda$, $y=-\frac1{2\lambda}$ (avec $\lambda\neq0$, sinon $2=0$).

*Contrainte* : $\frac1{\lambda^2}+\frac1{4\lambda^2}=1$, soit $\lambda^2=\frac54$, donc $\lambda=\pm\frac{\sqrt5}2$.

*Résultat* : $\max = \sqrt5 \approx 2{,}2360680$ en $\left(\frac2{\sqrt5},\frac1{\sqrt5}\right) \approx (0{,}894,\ 0{,}447)$ ; $\min=-\sqrt5$ au point opposé.

**Le contrôle qui va vite** : $\sqrt5 = \lVert(2,1)\rVert$ — le maximum d'une forme linéaire sur la sphère unité est la norme de son vecteur.

</details>

<details class="details--riche">
<summary>

**7. Résoudre l'exercice 5.2 ($xy$ sur le cercle) par Lagrange PUIS par paramétrage.**

</summary>

**Par Lagrange** : $y+2\lambda x=0$ et $x+2\lambda y=0$ donnent $x(1-4\lambda^2)=0$. Comme $x=0$ forcerait $y=0\notin A$, on a $\lambda=\pm\frac12$, donc $y=\mp x$. Avec la contrainte, $x=\pm\frac1{\sqrt2}$ :

$$\max = \tfrac12 \text{ en } \pm\left(\tfrac1{\sqrt2},\tfrac1{\sqrt2}\right), \qquad \min = -\tfrac12 \text{ en } \pm\left(\tfrac1{\sqrt2},-\tfrac1{\sqrt2}\right).$$

**Par paramétrage** : $x=\cos\theta$, $y=\sin\theta$, donc

$$xy = \cos\theta\sin\theta = \tfrac12\sin(2\theta) \in \left[-\tfrac12,\tfrac12\right].$$

**Une ligne** — et cela confirme les deux valeurs. Quand la contrainte se paramètre, c'est la méthode la plus sûre, et c'est toujours un bon contrôle.

</details>

<details class="details--riche">
<summary>

**8. Énoncer la proposition 5.9 et la démontrer.**

</summary>

Pour $\lVert h\rVert=1$, la pente de $f$ en $a$ dans la direction $h$ est $\varphi'(0) = \langle\nabla f(a),h\rangle$ où $\varphi(t)=f(a+th)$. La direction de plus forte pente est $h=\frac{\nabla f(a)}{\lVert\nabla f(a)\rVert}$, et cette pente vaut $\lVert\nabla f(a)\rVert$.

**Preuve — Cauchy-Schwarz** : $\langle\nabla f(a),h\rangle \le \lVert\nabla f(a)\rVert\lVert h\rVert = \lVert\nabla f(a)\rVert$, avec égalité ssi $h$ est colinéaire à $\nabla f(a)$ **et de même sens**. ∎

**Conséquences** : le gradient pointe vers la montée la plus rapide (la descente de gradient suit $-\nabla f$) ; sa norme est la valeur de cette pente.

</details>

<details class="details--riche">
<summary>

**9. Énoncer et démontrer l'interprétation des multiplicateurs (§5.4).**

</summary>

Avec la contrainte $i_0$ perturbée en $g_{i_0}(x)+\epsilon=0$ et $c(\epsilon)$ le point optimal perturbé, $c(0)=a$ :

$$(f\circ c)'(0) = \lambda_{i_0}.$$

**Preuve** :

$$(f\circ c)'(0) = \langle\nabla f(a),c'(0)\rangle = -\sum_i\lambda_i\langle\nabla g_i(a),c'(0)\rangle = -\sum_i\lambda_i\,(g_i\circ c)'(0).$$

Or $(g_i\circ c)(\epsilon)=0$ pour $i\neq i_0$, donc ces dérivées sont nulles ; et $(g_{i_0}\circ c)(\epsilon)=-\epsilon$, donc $(g_{i_0}\circ c)'(0)=-1$. D'où $(f\circ c)'(0) = -\lambda_{i_0}\times(-1) = \lambda_{i_0}$. ∎

**Lecture** : $\lambda_{i_0}$ est la **sensibilité de la valeur optimale** à un relâchement de la contrainte $i_0$ — le prix fantôme.

</details>

<details class="details--riche">
<summary>

**10. Résoudre l'exemple 10 et vérifier $(f\circ c)'(0)=\lambda$ au chiffre près.**

</summary>

$\max xy$ sous $2x+3y=120$. Avec $g=2x+3y-120$ (affine, donc **toujours qualifiée**) :

$$y+2\lambda=0,\quad x+3\lambda=0 \;\Longrightarrow\; x=-3\lambda,\ y=-2\lambda .$$

La contrainte donne $-12\lambda=120$, soit $\lambda=-10$, $x^\ast=30$, $y^\ast=20$, $f=600$.

**Perturbé** ($2x+3y=120-\epsilon$) : $\lambda(\epsilon)=-10+\frac\epsilon{12}$, $x^\ast=30-\frac\epsilon4$, $y^\ast=20-\frac\epsilon6$, d'où

$$F(\epsilon) = 600 - 10\epsilon + \frac{\epsilon^2}{24}, \qquad F'(0) = -10 = \lambda . \ \checkmark$$

**Contrôle numérique** avec $\epsilon=0{,}12$ : $29{,}97\times19{,}98 = 598{,}8006$, et $600-1{,}2+0{,}0006 = 598{,}8006$ .

**Lecture** : retirer un euro de budget fait perdre 10 unités de production. Sur un euro entier ($\epsilon=-1$), on gagne en réalité $10{,}0417$ : $\lambda$ est une dérivée, valable au premier ordre.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La contrainte du chapitre 5 ? | $A=\{g_1=0,\dots,g_p=0\}$, égalités seulement |
| Pourquoi $\nabla f=0$ ne marche pas ? | $A$ est d'**intérieur vide** |
| Hypothèse (Q) ? | Les $\nabla g_i(x)$ forment une **famille libre** sur $A$ |
| Formulation matricielle ? | La matrice $n\times p$ des gradients est de **rang $p$** |
| (Q) pour $p=1$ ? | $\nabla g(x)\neq0$ sur $A$ |
| Conséquence de (Q) ? | $A$ sous-variété de dimension $n-p$ |
| Cercle unité dans $\mathbb{R}^2$ ? | Dimension $2-1=1$ |
| Sphère unité dans $\mathbb{R}^3$ ? | Dimension $2$ |
| Sphère ∩ plan (exemple 6) ? | Dimension $1$ — un **cercle** de rayon $\sqrt{2/3}$ |
| Vecteur tangent (déf. 5.5) ? | $v=c'(0)$ pour une courbe $c$ tracée dans $A$ |
| Proposition 5.6 ? | Tangents $=\mathrm{Vect}(\nabla g_i(a))^\perp$, dimension $n-p$ |
| Le gradient est-il tangent ? | **Non — normal** à la contrainte |
| Trouver les tangents revient à ? | Résoudre $p$ équations à $n$ inconnues |
| Théorème 5.7 ? | $\nabla f(a)+\sum\lambda_i\nabla g_i(a)=0$ |
| La convention de signe du cours ? | Un **PLUS** |
| Ses hypothèses ? | $f\in C^1$, $a$ **qualifié**, $a$ extremum local sur $A$ |
| Sa preuve en trois mots ? | Dériver le long d'une **courbe** de $A$ |
| Lecture géométrique ? | Ligne de niveau **tangente** à la contrainte |
| Est-il suffisant ? | **Non** |
| Le contre-exemple du cours ? | $x^4+y^4$ sur $y=x^3+1$, en $(0,1)$ |
| Pourquoi ça échoue ? | Le terme dominant $4t^3$ est de degré **impair** |
| Point non qualifié : que faire ? | Y **calculer $f$** et l'ajouter aux candidats |
| Exemple 8 : quel point ? | $(0,0)$, où $\nabla g=(0,0)$ |
| Ce que $A$ y est ? | Deux droites **qui se croisent** |
| Le minimum de l'exemple 8 ? | $\frac12$ en $\left(\frac12,\pm\frac12\right)$ |
| Lecture géométrique ? | Distance de $(1,0)$ aux droites $y=\pm x$ |
| Exercice 5.1 : réponse ? | $\pm\sqrt5$, soit $\pm2{,}2360680$ |
| Le point du maximum ? | $\left(\frac2{\sqrt5},\frac1{\sqrt5}\right)$ |
| Le contrôle immédiat ? | $\sqrt5 = \lVert(2,1)\rVert$ |
| Exercice 5.2 : réponse ? | $\pm\frac12$, **deux points chacun** |
| Par paramétrage ? | $\frac12\sin(2\theta)$ |
| Exemple 9 : $x+y$ sur le cercle ? | $\pm\sqrt2 \approx \pm1{,}4142136$ |
| Inégalité arithmético-géométrique ? | Moyenne géométrique $\le$ moyenne arithmétique |
| Le maximum de $\prod t_i$ sur le simplexe ? | $\left(\frac1n\right)^n$, en $t_i=\frac1n$ |
| Cas d'égalité ? | Tous les $x_i$ **égaux** |
| Proposition 5.9 : plus forte pente ? | $h=\nabla f(a)/\lVert\nabla f(a)\rVert$ |
| Sa valeur ? | $\lVert\nabla f(a)\rVert$ |
| Sa preuve ? | **Cauchy-Schwarz** |
| Ligne de niveau (déf. 5.10) ? | $L_f(\alpha)=\{f=\alpha\}$ |
| Ensemble de sous-niveau ? | $S_f(\alpha)=\{f\le\alpha\}$ |
| À l'optimum, niveau et contrainte sont ? | **Tangents**, jamais sécants |
| Interprétation de $\lambda$ (§5.4) ? | $(f\circ c)'(0)=\lambda_{i_0}$ |
| En un mot ? | La **sensibilité** de la valeur optimale |
| Ses autres noms ? | Prix fantôme, profit marginal |
| $\lambda_1=-5$, $\lambda_2=-1$, $\lambda_3=-7$ : relâcher ? | **$g_2$** — le plus **grand** $\lambda$ |
| Augmenter la dépense la plus efficace ? | **$g_3$** |
| Exemple 10 : le choix optimal ? | $(30,\ 20)$, production $600$ |
| Le multiplicateur ? | $\lambda=-10$ |
| La production perturbée ? | $F(\epsilon)=600-10\epsilon+\frac{\epsilon^2}{24}$ |
| $F'(0)$ ? | $-10 = \lambda$ |
| Une contrainte **affine** est-elle qualifiée ? | **Toujours** — $\nabla g$ constant non nul |
| Ce que le chapitre 6 ajoute ? | $\mu_j\ge0$ et $\mu_j h_j(a)=0$ |
|  |  |
