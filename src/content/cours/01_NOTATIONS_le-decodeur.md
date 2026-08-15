# Le décodeur de notations

Le vrai obstacle quand on vient de l'économie n'est pas la difficulté mathématique. C'est que les textes sont écrits dans un code que personne n'explique, parce que tout le monde suppose qu'il est déjà connu.

Ce fichier est ce code. Garde-le ouvert à côté de toi.

## 1. Comment est bâti un texte mathématique

Tout cours d'optimisation alterne cinq types de blocs. Les reconnaître fait gagner un temps considérable, parce qu'on ne les lit pas de la même façon.

| Bloc | Ce que c'est | Comment le lire |
|---|---|---|
| **Definition** | Une convention de vocabulaire. Rien à démontrer. | À apprendre par cœur, littéralement. Une définition mal mémorisée bloque tout le chapitre. |
| **Theorem / Proposition** | Un énoncé vrai, important, démontré. | Lire l'énoncé **deux fois avant** la preuve. Identifier hypothèses et conclusion. |
| **Lemma** | Un petit théorème auxiliaire, marche vers un plus grand. | Souvent technique. On peut l'admettre au premier passage. |
| **Corollary** | Conséquence immédiate de ce qui précède. | Lecture rapide. |
| **Remark / Example** | Commentaire, cas particulier, contre-exemple. | **Ne saute jamais les exemples.** Ce sont eux qui donnent l'intuition. |

Une preuve se termine par `□`, `∎` ou `QED`. Quand tu vois ce symbole, l'argument est clos.

Un réflexe utile : devant un théorème, demande-toi toujours **« que se passe-t-il si je retire une hypothèse ? »**. En général tout s'écroule, et comprendre *comment* ça s'écroule est la meilleure façon de comprendre à quoi sert l'hypothèse.

## 2. Ensembles et espaces

| Notation | Lecture | Sens |
|---|---|---|
| $\mathbb{R}$ | « R » | Les nombres réels |
| $\mathbb{R}^n$ | « R n » | Vecteurs à $n$ composantes réelles |
| $\mathbb{R}^{m\times n}$ | « R m croix n » | Matrices à $m$ lignes et $n$ colonnes |
| $\mathbb{R}_+$ | « R plus » | Les réels $\geq 0$ |
| $\mathbb{R}_{++}$ | « R plus plus » | Les réels **strictement** $> 0$ |
| $\mathbb{R}^n_+$ | | L'orthant positif : tous les vecteurs dont **chaque** composante est $\geq 0$ |
| $\mathbf{S}^n$ | « S n » | Matrices **symétriques** $n\times n$ |
| $\mathbf{S}^n_+$ | | Matrices symétriques **semi-définies positives** |
| $\mathbf{S}^n_{++}$ | | Matrices symétriques **définies positives** |
| $x \in C$ | « x appartient à C » | |
| $A \subseteq B$ | « A inclus dans B » | |
| $A \cap B$, $A \cup B$ | intersection, union | |
| $\emptyset$ | ensemble vide | |
| $\{x \mid P(x)\}$ | « l'ensemble des x tels que P(x) » | La barre `|` se lit **« tels que »**. Parfois notée `:` |

**Le double indice `++` compte.** $\mathbb{R}_+$ inclut zéro, $\mathbb{R}_{++}$ non. Cette différence d'un seul caractère change des théorèmes entiers (typiquement : la condition de Slater exige une inégalité **stricte**).

## 3. Vecteurs et matrices

**Convention fondamentale : un vecteur est toujours une colonne.** Chez Boyd, chez Vandenberghe, partout. $x \in \mathbb{R}^n$ signifie

$$x = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$$

C'est pour cela que le produit scalaire s'écrit $x^T y$ : il faut transposer $x$ en ligne pour que le produit matriciel ait un sens.

| Notation | Sens |
|---|---|
| $x^T$ ou $x'$ | Transposée. $x^T$ est une **ligne** |
| $A^T$ | Transposée de la matrice |
| $x^Ty$, $\langle x,y\rangle$, $x\cdot y$ | Produit scalaire $\sum_i x_i y_i$ — trois notations, même objet |
| $\mathbf{1}$ | Vecteur de tous les 1 |
| $e_i$ | Vecteur nul sauf un 1 en position $i$ |
| $I$ ou $I_n$ | Matrice identité |
| $\mathbf{tr}(A)$ | Trace : somme des éléments diagonaux |
| $\det(A)$ | Déterminant |
| $\mathbf{rank}(A)$ | Rang |
| $\lambda_i(A)$ | La $i$-ème valeur propre |
| $\lambda_{\max}(A)$, $\lambda_{\min}(A)$ | Plus grande, plus petite valeur propre |
| $\mathbf{diag}(x)$ | Matrice diagonale dont la diagonale est $x$ |
| $A^{-1}$ | Inverse |
| $A^\dagger$ | Pseudo-inverse (quand $A$ n'est pas inversible) |

## 4. Normes

| Notation | Nom | Formule |
|---|---|---|
| $\|x\|_2$ | Norme euclidienne | $\sqrt{\sum_i x_i^2}$ |
| $\|x\|_1$ | Norme 1, « norme de Manhattan » | $\sum_i \lvert x_i\rvert$ |
| $\|x\|_\infty$ | Norme infinie, « sup » | $\max_i \lvert x_i\rvert$ |
| $\|x\|_p$ | Norme p | $\left(\sum_i \lvert x_i\rvert^p\right)^{1/p}$ |
| $\|x\|$ | Norme générique | Sans indice, c'est en général la norme 2 |

**Pourquoi trois normes ?** Parce qu'elles ne pénalisent pas de la même façon. La norme 1 favorise les solutions **creuses** (beaucoup de zéros) — c'est tout le principe du LASSO en économétrie. La norme 2 lisse. La norme infinie ne regarde que le pire écart.

## 5. Le piège n°1 : $\succeq$ contre $\geq$

C'est l'erreur la plus fréquente et elle coûte cher.

| Notation | Sens |
|---|---|
| $a \geq b$ (scalaires) | Ordre usuel |
| $x \succeq y$ (vecteurs) | **Composante par composante** : $x_i \geq y_i$ pour tout $i$ |
| $A \succeq 0$ (matrice) | $A$ est **semi-définie positive**, c'est-à-dire $z^TAz \geq 0$ pour tout $z$ |
| $A \succ 0$ (matrice) | $A$ est **définie positive** : $z^TAz > 0$ pour tout $z \neq 0$ |
| $A \succeq B$ | $A - B \succeq 0$ |

**$A \succeq 0$ ne veut PAS dire que les coefficients de $A$ sont positifs.** La matrice

$$\begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}$$

a un coefficient négatif et est pourtant définie positive. Inversement,

$$\begin{pmatrix} 1 & 3 \\ 3 & 1 \end{pmatrix}$$

n'a que des coefficients positifs et **n'est pas** semi-définie positive (ses valeurs propres sont $4$ et $-2$).

**Trois façons équivalentes de dire qu'une matrice symétrique $A$ est semi-définie positive :**

1. $z^TAz \geq 0$ pour tout $z$
2. Toutes ses valeurs propres sont $\geq 0$
3. Tous ses mineurs principaux sont $\geq 0$

En pratique, la voie 2 est la plus rapide en petite dimension.

**Pourquoi c'est central en optimisation :** une fonction deux fois dérivable est convexe **si et seulement si** sa hessienne est semi-définie positive partout. Toute la convexité se ramène à cette vérification.

## 6. Dérivées

| Notation | Nom | Nature |
|---|---|---|
| $f'(x)$ | Dérivée | Scalaire (fonction d'une variable) |
| $\nabla f(x)$ | **Gradient** — « nabla f » | **Vecteur** de $\mathbb{R}^n$ : $\left(\frac{\partial f}{\partial x_1},\dots,\frac{\partial f}{\partial x_n}\right)^T$ |
| $\nabla^2 f(x)$ | **Hessienne** | **Matrice** $n\times n$ des dérivées secondes $\frac{\partial^2 f}{\partial x_i \partial x_j}$ |
| $Df(x)$ ou $J_f$ | Jacobienne | Matrice, pour une fonction à valeurs vectorielles |
| $\partial f(x)$ | **Sous-différentiel** | **Ensemble** de vecteurs. Généralise le gradient aux fonctions non dérivables |

**Attention :** $\nabla^2 f$ n'est pas « le gradient au carré ». C'est la matrice des dérivées secondes. La notation est trompeuse, tout le monde s'y fait piéger une fois.

**Le sous-différentiel** apparaît dès qu'on manipule $\lvert x\rvert$ ou $\|x\|_1$, qui ne sont pas dérivables en 0. Au lieu d'une pente unique, on prend l'**ensemble** des pentes des droites passant sous la courbe. Pour $f(x)=\lvert x\rvert$ : $\partial f(0) = [-1,1]$.

**Développement de Taylor à l'ordre 2** — la formule à connaître par cœur, elle revient en permanence :

$$f(x+h) \approx f(x) + \nabla f(x)^T h + \tfrac{1}{2}h^T\nabla^2 f(x)\,h$$

Le terme du milieu est un scalaire (produit scalaire), le dernier aussi (forme quadratique).

## 7. Vocabulaire des ensembles et des fonctions

| Notation | Nom | Sens |
|---|---|---|
| $\mathbf{dom}\, f$ | Domaine | Les $x$ où $f$ est définie |
| $\mathbf{epi}\, f$ | **Épigraphe** | $\{(x,t) \mid f(x)\leq t\}$ : tout ce qui est **au-dessus** du graphe |
| $\mathbf{int}\, C$ | Intérieur | |
| $\mathbf{relint}\, C$ | Intérieur **relatif** | Intérieur vu depuis le sous-espace engendré par $C$ |
| $\mathbf{cl}\, C$ | Adhérence (closure) | |
| $\mathbf{bd}\, C$ | Frontière (boundary) | |
| $\mathbf{conv}\, C$ | Enveloppe convexe | Le plus petit convexe contenant $C$ |
| $\mathbf{aff}\, C$ | Enveloppe affine | |

**L'épigraphe mérite un mot**, parce que c'est le pont entre ensembles convexes et fonctions convexes : *une fonction est convexe si et seulement si son épigraphe est un ensemble convexe*. Tout le chapitre 3 de Boyd repose sur cette équivalence. Retiens l'image : l'épigraphe, c'est la région située au-dessus de la courbe.

**Pourquoi `relint` et pas `int` ?** Un segment dans le plan a un intérieur vide (il est « plat »), mais son intérieur relatif ne l'est pas. C'est une précaution technique qui revient dans les conditions de Slater.

## 8. Le piège n°2 : $\inf$ contre $\min$

| Notation | Sens |
|---|---|
| $\min_x f(x)$ | La valeur minimale, **et elle est atteinte** par un certain $x$ |
| $\inf_x f(x)$ | La borne inférieure — la plus grande valeur qui minore $f$. **Peut ne pas être atteinte** |
| $\max$, $\sup$ | Idem en miroir |
| $\arg\min_x f(x)$ | **Le ou les $x$** qui réalisent le minimum — pas la valeur ! |

Exemple : $f(x)=e^{x}$ sur $\mathbb{R}$. On a $\inf f = 0$, mais aucun $x$ ne donne $f(x)=0$. Écrire $\min f = 0$ serait faux.

Les auteurs écrivent `inf` par prudence quand ils ne savent pas encore si le minimum est atteint. Une bonne partie des théorèmes d'existence sert précisément à passer de `inf` à `min`.

**Ne confonds jamais $\min$ et $\arg\min$.** $\min_x (x-3)^2 = 0$ ; $\arg\min_x (x-3)^2 = 3$. L'un est une valeur, l'autre un point.

## 9. La forme standard d'un problème

Tu verras cette structure des milliers de fois :

$$
\begin{array}{ll}
\text{minimize} & f_0(x)\\
\text{subject to} & f_i(x) \leq 0, \quad i=1,\dots,m\\
& h_j(x) = 0, \quad j=1,\dots,p
\end{array}
$$

- `subject to`, abrégé **s.t.**, veut dire « sous les contraintes »
- $f_0$ est la **fonction objectif** (`objective function`)
- $f_i \leq 0$ sont les **contraintes d'inégalité**
- $h_j = 0$ sont les **contraintes d'égalité**
- $x$ est la **variable de décision**

| Notation | Sens |
|---|---|
| $p^\star$ | La **valeur optimale** du problème (primal) |
| $d^\star$ | La valeur optimale du **problème dual** |
| $x^\star$ | Un point optimal |
| $\mathcal{D}$ | Le domaine du problème |
| **feasible** | *Admissible* : un point qui respecte toutes les contraintes |
| **infeasible** | Aucun point admissible n'existe |
| **unbounded below** | $p^\star = -\infty$ |

**Convention à retenir :** tout est ramené à une **minimisation**, et toutes les inégalités sont écrites $\leq 0$. Maximiser $f$ revient à minimiser $-f$ ; une contrainte $g(x)\geq 0$ se réécrit $-g(x)\leq 0$. Cette normalisation est systématique et permet d'avoir une théorie unique.

## 10. Lagrangien et dualité

C'est le sujet que tu n'as jamais vu. Voici les notations, le mécanisme est traité dans la Série 2.

$$L(x,\lambda,\nu) = f_0(x) + \sum_{i=1}^m \lambda_i f_i(x) + \sum_{j=1}^p \nu_j h_j(x)$$

| Symbole | Nom | Contrainte |
|---|---|---|
| $\lambda_i$ (lambda) | Multiplicateur associé à une **inégalité** | $\lambda_i \geq 0$ **obligatoirement** |
| $\nu_j$ (nu) | Multiplicateur associé à une **égalité** | Signe libre |
| $L(x,\lambda,\nu)$ | **Lagrangien** | |
| $g(\lambda,\nu)$ | **Fonction duale** : $g(\lambda,\nu)=\inf_x L(x,\lambda,\nu)$ | |

**La lettre grecque indique le type de contrainte.** $\lambda$ pour les inégalités (signe imposé), $\nu$ pour les égalités (signe libre). Cette convention est universelle chez Boyd, Vandenberghe et Bertsekas.

**Pourquoi $\lambda \geq 0$ et pas $\nu$ ?** Intuition économique : $\lambda_i$ est le prix implicite d'une ressource. Relâcher une contrainte de ressource ne peut qu'améliorer (ou laisser inchangé) l'optimum — jamais le dégrader. D'où un prix positif. Une contrainte d'égalité, elle, peut être violée dans les deux sens : son prix peut être de n'importe quel signe.

Autres notations liées :

| Notation | Nom |
|---|---|
| $f^*(y) = \sup_x (y^Tx - f(x))$ | **Conjuguée de Fenchel** |
| $\lambda_i f_i(x^\star)=0$ | **Complementary slackness** (écarts complémentaires) |
| **strong duality** | $p^\star = d^\star$ |
| **weak duality** | $d^\star \leq p^\star$ — toujours vrai |
| **duality gap** | L'écart $p^\star - d^\star$ |
| **Slater's condition** | Condition suffisante garantissant $p^\star=d^\star$ |

⚠️ **Attention à $f^\star$.** Selon le contexte, l'étoile désigne soit la **valeur optimale**, soit la **conjuguée de Fenchel**. Ce sont deux objets sans rapport. On les distingue au contexte : $p^\star$ est un nombre, $f^*(y)$ est une fonction évaluée en $y$.

## 11. Symboles logiques

| Symbole | Lecture |
|---|---|
| $\forall$ | pour tout |
| $\exists$ | il existe |
| $\exists!$ | il existe un unique |
| $\Rightarrow$ | implique |
| $\Leftrightarrow$ | équivaut à (si et seulement si) |
| $:=$ ou $\triangleq$ | est **défini** comme |
| $\equiv$ | identiquement égal |
| $\approx$ | approximativement |
| $\propto$ | proportionnel à |
| $\ll$ | très petit devant |
| $\to$ | tend vers |
| $\mapsto$ | « s'envoie sur » (définit une application) |
| $\setminus$ | privé de : $A\setminus B$ |
| $\square$, $\blacksquare$ | fin de preuve |

## 12. Les abréviations anglaises

Tes cours sont majoritairement en anglais. Celles-ci reviennent constamment :

| Abréviation | Développé | Sens |
|---|---|---|
| **s.t.** | subject to | sous les contraintes |
| **iff** | if and only if | si et seulement si |
| **w.l.o.g.** | without loss of generality | quitte à... , sans perte de généralité |
| **TFAE** | the following are equivalent | les énoncés suivants sont équivalents |
| **WTS** | we want to show | on veut montrer |
| **resp.** | respectively | respectivement |
| **s.p.d.** | symmetric positive definite | symétrique définie positive |
| **LHS / RHS** | left / right hand side | membre de gauche / de droite |
| **wrt** | with respect to | par rapport à |
| **st / s.t.** | such that | tel que (⚠️ même abréviation que *subject to* — au contexte) |
| **QED** | quod erat demonstrandum | ce qu'il fallait démontrer |

Quelques tournures qui déroutent au début :

- *« It suffices to show that… »* → Il suffit de montrer que…
- *« By a similar argument… »* → Par un raisonnement analogue… (souvent : « à toi de le refaire »)
- *« The proof is left as an exercise »* → Fais-le. C'est là qu'on apprend.
- *« Clearly / It is easy to see that… »* → Ce n'est presque jamais évident. Si tu bloques, ce n'est pas un problème de niveau : l'auteur a sauté des étapes.

## 13. Sigles des familles de problèmes

| Sigle | Développé | Ce que c'est |
|---|---|---|
| **LP** | Linear Program | Objectif et contraintes linéaires |
| **QP** | Quadratic Program | Objectif quadratique, contraintes linéaires |
| **QCQP** | Quadratically Constrained QP | Contraintes quadratiques aussi |
| **SOCP** | Second-Order Cone Program | Contraintes de type cône du second ordre |
| **SDP** | Semidefinite Program | Variables matricielles avec $X \succeq 0$ |
| **GP** | Geometric Program | Devient convexe après changement de variable logarithmique |
| **MILP** | Mixed-Integer LP | Variables entières — **non convexe**, beaucoup plus dur |
| **KKT** | Karush–Kuhn–Tucker | Les conditions d'optimalité |
| **ADMM** | Alternating Direction Method of Multipliers | Algorithme de décomposition |
| **IPM** | Interior Point Method | Méthode de points intérieurs |

Ces familles sont **emboîtées** : LP ⊂ QP ⊂ SOCP ⊂ SDP. Chacune est un cas particulier de la suivante. Savoir dans quelle famille tombe un problème détermine quel solveur l'attaque et à quelle vitesse.

## 14. Correspondances avec ce que tu connais déjà en économie

C'est le tableau qui te fera gagner le plus de temps. La théorie que tu as apprise en micro **est** de l'optimisation convexe — sous un autre vocabulaire.

| En économie | En optimisation | Remarque |
|---|---|---|
| Maximiser l'utilité sous contrainte budgétaire | Problème convexe avec une contrainte d'inégalité | Cas d'école du chapitre 5 de Boyd |
| Multiplicateur de Lagrange $\lambda$ | Variable duale $\lambda$ | **Même objet.** Boyd explique enfin *pourquoi* il est positif |
| Utilité marginale du revenu | $\lambda^\star$, la valeur duale optimale | $\lambda^\star = \partial p^\star/\partial b$ : la sensibilité de l'optimum au relâchement de la contrainte |
| Prix implicite / prix fictif | **Shadow price**, variable duale | Terme identique en anglais |
| Rendements décroissants | Concavité de la fonction de production | Hessienne $\preceq 0$ |
| Convexité des préférences | Quasi-concavité de l'utilité | Boyd, ch. 3.4 |
| Conditions du premier ordre | Stationnarité du Lagrangien | La 1ʳᵉ condition KKT |
| Solution en coin | Contrainte **active** ($f_i(x^\star)=0$) | |
| Contrainte non saturée | Contrainte **inactive**, donc $\lambda_i^\star = 0$ | C'est exactement le *complementary slackness* |
| Équilibre concurrentiel | Solution d'un couple primal-dual | Le résultat le plus profond du lot |
| Théorème de l'enveloppe | Sensibilité de $p^\star$ aux paramètres | Boyd, ch. 5.6 |

La dernière ligne mérite qu'on s'y arrête. **Le premier théorème du bien-être — l'équilibre concurrentiel est Pareto-optimal — est, mathématiquement, un résultat de dualité.** Les prix d'équilibre sont les variables duales du problème d'allocation. Quand tu auras fini le chapitre 5 de Boyd, relis ton cours de micro : tu ne le liras plus de la même façon.

## 15. Les cinq pièges à mémoriser

1. **$A \succeq 0$ ≠ coefficients positifs.** C'est une propriété spectrale, pas une propriété des entrées.
2. **$\nabla^2 f$ n'est pas un carré**, c'est la hessienne.
3. **$\min$ ≠ $\arg\min$.** Une valeur contre un point.
4. **$\inf$ ≠ $\min$.** La borne inférieure peut ne pas être atteinte.
5. **$f^\star$ est ambigu** : valeur optimale ou conjuguée de Fenchel, selon le contexte.

## 16. Quand tu bloques sur une notation inconnue

Dans l'ordre :

1. **Boyd, pages xi–xiv** — il y a une table complète des notations au début du livre. La plupart des textes en ont une ; on l'oublie systématiquement.
2. **L'index en fin d'ouvrage** — les notations y figurent souvent.
3. **Ce fichier.**
4. Demande-moi. Recopie le passage exact ; je le décortique symbole par symbole.

Ne reste jamais bloqué plus de dix minutes sur un symbole. Ce n'est pas là qu'est la difficulté, et c'est là qu'on abandonne.
