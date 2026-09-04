# Fiche 600 — Topologie et premiers résultats d'existence

|  |  |
|---|---|
| **Matière** | Maths · Optimisation — **cours suivi cette année** |
| **Cours source** | Montaru, *Optimisation*, TSE, 16 mars 2025 — **chapitre 1** (Introduction) et **chapitre 2** (Rappels de topologie), p. 5–11 |
| **Difficulté** | Must know — sans existence, aucun calcul ne vaut |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Aucun. C'est le point de départ du cours. |
| **Concepts clés** | Espace métrique, norme, boules, ouvert, fermé, intérieur, adhérence, frontière, limite, continuité, borné, compact, Weierstrass, Bolzano-Weierstrass, coercivité |
| **Poids à l'examen** | La **question 1 de tout exercice d'optimisation** est « montrer que $f$ admet un minimum ». On y répond avec **deux théorèmes seulement** : Weierstrass (2.22) sur un compact, coercivité (2.26 / 2.28) sur un fermé non borné. Savoir lequel choisir vaut des points à chaque copie. |

> **Convention de toute la série 600.** Ce qui porte un **numéro du cours** (« Définition 2.1 », « Théorème 2.22 », « Proposition 2.14 ») est l'énoncé **exact** de M. Montaru, notations comprises. Le polycopié prévient en première page qu'il n'est *« que le squelette du cours qui sera donné en amphi »* et que *« les preuves seront faites au tableau »* : tout ce qui les complète — démonstrations, dessins décrits, exemples chiffrés, corrigés — est signalé par **Preuve reconstruite** ou **Enrichissement pédagogique (hors cours)**. Rien n'est présenté comme du cours sans l'être.

## 🎯 Vue d'ensemble

```
LE PROBLÈME              minimiser f(x)  pour  x ∈ A
                         f : fonction objectif      A : ensemble de contrainte

DEUX QUESTIONS SÉPARÉES, DANS CET ORDRE

  1. EXISTENCE   « le minimum existe-t-il ? »     ← CHAPITRE 2, cette fiche
     A compact + f continue ........... Weierstrass (2.22)      min ET max
     A fermé non borné + f coercive ... Théorème 2.26 / 4.9     min seulement

  2. LOCALISATION « où est-il pris ? »            ← CHAPITRES 3 à 6
     ∇f(a) = 0, extrema liés, KKT

  ATTENTION : le chapitre 2 ne répond QU'À LA QUESTION 1.
  Il garantit que le minimum existe, sans dire un mot de l'endroit.

LA CHAÎNE D'OUTILS DU CHAPITRE 2

  norme ──► distance d(x,y) = ‖x−y‖ ──► boules B(x,r)
                                          │
                      ┌───────────────────┼───────────────────┐
                   OUVERT               FERMÉ             COMPACT
                ∀x ∃ε B(x,ε)⊂A        Aᶜ ouvert      toute suite a une
                                                   sous-suite convergente
                                                          DANS A
                                                             │
                      continuité ─────────────────────────► WEIERSTRASS
                                                    f bornée, bornes ATTEINTES

DANS ℝᵈ SEULEMENT (théorème 2.24)     compact ⟺ fermé ET borné
```

## 🔴 Concept 1 — Le vocabulaire du chapitre 1 (le squelette, rempli)

Le chapitre 1 du polycopié n'est **qu'une liste de titres** : le contenu est fait en amphi. Voici ce que ces titres recouvrent — à confronter avec vos notes de cours.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — §1.1 à §1.5, reconstruits.</span>

**But de l'optimisation.** Étant donné une fonction $f$ (coût, utilité, erreur, risque) et un ensemble $A$ de choix possibles, trouver le meilleur choix. Deux objets, jamais un seul :

$$\min_{x \in A} f(x) \qquad \text{ou} \qquad \max_{x \in A} f(x).$$

**Vocabulaire.**

- $f$ : la **fonction objectif** (aussi : critère, fonction de coût).
- $A$ : l'**ensemble de contrainte** (aussi : ensemble admissible, réalisable).
- Un point de $A$ est dit **admissible**.
- La **valeur optimale** est $\min_{x\in A} f(x)$ — un nombre.
- Le **point optimal** est le $x^\ast$ où elle est atteinte — un vecteur. **Ce ne sont pas les mêmes objets** ; l'un peut exister sans l'autre (voir le contre-exemple $e^x$ plus bas).

**Types de problèmes.** Le cours en croise deux :

|  | Sans contrainte | Contrainte d'égalité | Égalité **et** inégalité |
|---|---|---|---|
| **Chapitre** | 3 (dim. 1) et 4 | 5 | 6 |
| **Outil** | $f'=0$, $\nabla f = 0$ | extrema liés | KKT |

**Maximum.** Il n'y a **rien à apprendre de neuf** pour les maxima :

$$\max_{x\in A} f(x) = -\min_{x\in A}\bigl(-f(x)\bigr),$$

et l'argument du max de $f$ est l'argument du min de $-f$. Tout théorème sur les minima se transporte. Le cours l'utilise explicitement deux fois : dans la remarque qui suit le théorème 2.26, et dans la « remarque importante » du théorème KKT 6.1.

⚠️ **La seule exception de tout le cours** : dans KKT, la condition $\mu_j \ge 0$ **n'est pas symétrique**. C'est le seul endroit où min et max se distinguent vraiment (fiche 605).

</div>

### 1.1 Les trois exemples que le cours annonce (§1.6)

Le polycopié nomme trois problèmes sans les développer. Les voici — ce sont les fils rouges de l'année.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — les trois exemples fondateurs.</span>

**(a) Régression linéaire.** On dispose de $n$ points $(x_i, y_i)$ et on cherche la droite $y = ax+b$ qui les résume le mieux :

$$\min_{(a,b)\in\mathbb{R}^2} \; f(a,b) = \sum_{i=1}^n \bigl(y_i - a x_i - b\bigr)^2.$$

Problème **sans contrainte**, en dimension 2, $f$ **coercive** et **convexe** : c'est le cas le plus simple possible. On le résoudra par $\nabla f = 0$ (chapitre 4). C'est la raison pour laquelle un économètre a besoin de ce cours.

**(b) Un problème de production (contrainte d'égalité).** Deux facteurs en quantités $x$ et $y$, aux prix unitaires $2$ et $3$ euros, produisent $f(x,y) = xy$. Le budget est de $120$ euros :

$$\max\; xy \quad \text{sous} \quad 2x + 3y = 120.$$

C'est **mot pour mot l'exemple 10 du chapitre 5**. On le résoudra par les extrema liés (fiche 604), et le multiplicateur $\lambda$ y recevra son sens économique.

**(c) Transport optimal de marchandises.** $m$ entrepôts détenant $a_i$ unités, $n$ magasins en demandant $b_j$, coût $c_{ij}$ pour acheminer une unité de $i$ vers $j$ :

$$\min \sum_{i,j} c_{ij}\, x_{ij} \quad \text{sous} \quad \sum_j x_{ij} = a_i,\quad \sum_i x_{ij} = b_j,\quad x_{ij} \ge 0.$$

Contraintes d'égalité **et** d'inégalité : c'est le chapitre 6 (KKT). Objectif **linéaire**, contraintes **affines** — donc la condition (QCA) de la définition 6.4 s'applique automatiquement, et *tous* les points sont qualifiés. À retenir dès maintenant : les problèmes de transport sont le cas le plus confortable de tout le cours.

</div>

## 🔴 Concept 2 — Espace métrique et norme (déf. 2.1 et 2.2)

**Définition 2.1 (cours).** Un **espace métrique** est la donnée d'un ensemble $E$ et d'une application

$$d : E \times E \longrightarrow [0, +\infty[$$

vérifiant, pour tout $(x,y,z) \in E^3$ :

1. $d(x,y) = 0 \iff x = y$ — **séparation** ;
2. $d(x,y) = d(y,x)$ — **symétrie** ;
3. $d(x,y) \le d(x,z) + d(z,y)$ — **inégalité triangulaire**.

Cette application $d$, appelée **distance**, est une manière de mesurer la distance entre 2 objets mathématiques, mais cela peut être fait de beaucoup de façons.

**Définition 2.2 (cours).** Soit $E$ un espace vectoriel sur $\mathbb{R}$. Une **norme** $\lVert \cdot \rVert$ est une application $E \to [0,+\infty[$ vérifiant :

1. $\forall x \in E,\ \lVert x \rVert = 0 \iff x = 0$ — **séparation** ;
2. $\forall x \in E,\ \forall \lambda \in \mathbb{R},\ \lVert \lambda x \rVert = \lvert \lambda \rvert \, \lVert x \rVert$ — **absolue homogénéité** ;
3. $\forall (x,y) \in E^2,\ \lVert x+y \rVert \le \lVert x \rVert + \lVert y \rVert$ — **sous-additivité**.

**Le lien.** Si $E$ est un espace vectoriel, la façon la plus simple d'obtenir une distance est de la définir à partir d'une norme :

$$d(x,y) = \lVert x - y \rVert.$$

> **Preuve reconstruite — cette formule définit bien une distance.** Le cours écrit « le lecteur vérifiera » ; voici la vérification, en trois lignes qui sont exactement les trois axiomes de la norme.
>
> - *Séparation* : $d(x,y) = 0 \iff \lVert x-y \rVert = 0 \iff x - y = 0 \iff x = y$, par l'axiome 1 de la norme.
> - *Symétrie* : $d(y,x) = \lVert y-x \rVert = \lVert (-1)(x-y) \rVert = \lvert -1 \rvert \, \lVert x-y \rVert = d(x,y)$, par l'axiome 2 avec $\lambda = -1$.
> - *Inégalité triangulaire* : $d(x,y) = \lVert (x-z)+(z-y) \rVert \le \lVert x-z \rVert + \lVert z-y \rVert = d(x,z)+d(z,y)$, par l'axiome 3.
>
> Retenez le **procédé** : chaque axiome de distance se déduit de l'axiome de norme de même rang. Ce n'est pas une coïncidence, c'est la manière dont les axiomes ont été choisis.

**Remarque (cours) — seconde inégalité triangulaire.** Des axiomes 2 et 3 découle

$$\forall (x,y) \in E^2, \quad \Bigl\lvert\, \lVert x \rVert - \lVert y \rVert \,\Bigr\rvert \le \lVert x - y \rVert.$$

> **Preuve reconstruite.** $\lVert x \rVert = \lVert (x-y)+y \rVert \le \lVert x-y \rVert + \lVert y \rVert$, donc $\lVert x \rVert-\lVert y \rVert \le \lVert x-y \rVert$. En échangeant $x$ et $y$ : $\lVert y \rVert-\lVert x \rVert \le \lVert y-x \rVert = \lVert x-y \rVert$. Les deux réunies donnent la valeur absolue.
>
> **À quoi elle sert, concrètement.** Elle dit que la norme est **1-lipschitzienne**, donc **continue**. C'est ce qui autorise, dans toute la suite du cours, à écrire des choses comme « la norme de $x_n$ tend vers celle de $a$ dès que $x_n \to a$ » — et notamment à manipuler la coercivité sans précaution.

### 2.1 Les trois normes de $\mathbb{R}^d$ (cours)

Dans ce cours, on aura simplement besoin du cas où $E = \mathbb{R}^d$. Soit $x = (x_1, \dots, x_d) \in \mathbb{R}^d$ :

$$\lVert x \rVert_2 = \sqrt{\sum_{k=1}^{d} x_k^{\,2}} \quad \text{(norme euclidienne)}, \qquad \lVert x \rVert_1 = \sum_{k=1}^{d} \lvert x_k \rvert, \qquad \lVert x \rVert_\infty = \max\bigl(\lvert x_1 \rvert, \dots, \lvert x_d \rvert\bigr).$$

**Exemple 1 (cours).** Représenter dans $\mathbb{R}^2$ les boules ouvertes de centre $(0,0)$ de rayon $1$ pour les distances correspondant aux 3 normes ci-dessus.

> **Réponse au dessin de l'exemple 1** (le dessin est fait au tableau ; le voici décrit, puisqu'il tombe régulièrement).
>
> ```
>    norme 1 : le LOSANGE          norme 2 : le DISQUE       norme infinie : le CARRÉ
>    sommets (±1,0), (0,±1)        rayon 1                   côtés x=±1, y=±1
> 
>          |                            |                        +---+---+
>        / | \                       ,--+--.                     |   |   |
>    ---+--+--+---                  (   |   )                ----+---+---+----
>        \ | /                       `--+--'                     |   |   |
>          |                            |                        +---+---+
> ```
>
> **L'emboîtement est l'information à retenir** : la boule unité de la norme 1 est incluse dans celle de la norme 2, elle-même incluse dans celle de la norme infinie. Autrement dit
>
> $$\lVert x \rVert_\infty \;\le\; \lVert x \rVert_2 \;\le\; \lVert x \rVert_1 .$$
>
> Mnémonique : plus l'indice est **petit**, plus la norme est **grande** — et plus la boule est **petite**.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — l'équivalence, avec les constantes.</span>

Le cours affirme (encadré IMPORTANT ci-dessous) que toutes les normes de $\mathbb{R}^d$ sont équivalentes. Les constantes optimales pour ces trois-là sont :

$$\lVert x \rVert_\infty \le \lVert x \rVert_2 \le \sqrt{d}\,\lVert x \rVert_\infty, \qquad \lVert x \rVert_\infty \le \lVert x \rVert_1 \le d\,\lVert x \rVert_\infty, \qquad \lVert x \rVert_2 \le \lVert x \rVert_1 \le \sqrt{d}\,\lVert x \rVert_2.$$

**Vérification sur $x = (3, -4, 12) \in \mathbb{R}^3$** (choisi parce que $9+16+144 = 169$ tombe juste) :

$$\lVert x \rVert_1 = 19, \qquad \lVert x \rVert_2 = 13, \qquad \lVert x \rVert_\infty = 12.$$

On lit bien $12 \le 13 \le 19$. Et les constantes : $\sqrt{3}\cdot 12 \approx 20{,}785 \ge 13$ , $3 \cdot 12 = 36 \ge 19$ , $\sqrt{3}\cdot 13 \approx 22{,}517 \ge 19$ . Aucune n'est saturée ici ; l'égalité $\lVert x \rVert_1 = \sqrt d\,\lVert x \rVert_2$ ne se produit que pour les vecteurs à coordonnées de même valeur absolue, comme $(1,1,1)$ : $\lVert x \rVert_1 = 3$ et $\sqrt 3\,\lVert x \rVert_2 = \sqrt3 \cdot \sqrt3 = 3$.

</div>

## 🔴 Concept 3 — Ouverts et fermés (déf. 2.3 à 2.6)

**Définition 2.3 (cours).** Soit $x \in E$ et $r \ge 0$. La **boule ouverte** de centre $x$ et de rayon $r$ est

$$B(x,r) = \{ y \in E,\ d(x,y) < r \},$$

la **boule fermée**

$$\bar B(x,r) = \{ y \in E,\ d(x,y) \le r \}.$$

**Définition 2.4 (cours).** Soit $A \subset E$.

$$A \text{ est ouvert dans } E \iff \forall x \in A,\ \exists \epsilon > 0,\ B(x,\epsilon) \subset A.$$

$A$ est dit **fermé** dans $E$ si $A^c$ est ouvert dans $E$.

⚠️ **Le piège numéro un de tout le chapitre.** « Fermé » n'est **pas** la négation d'« ouvert ». Un ensemble peut être :

| Ensemble | ouvert | fermé |
|---|---|---|
| $\,]0,1[$ |  |  |
| $[0,1]$ |  |  |
| $[0,1[$ |  | — **ni l'un ni l'autre** |
| l'ensemble vide et $\mathbb{R}^d$ |  | — **les deux à la fois** |

Le mot juste est : *fermé* = *complémentaire d'un ouvert*. Rien d'autre.

**Proposition 2.5 (cours).** Une boule ouverte de $E$ est un ouvert de $E$. Une boule fermée de $E$ est un fermé de $E$.

> **Preuve reconstruite (cas de la boule ouverte).** Soit $y \in B(x,r)$, donc $d(x,y) < r$. Posons
>
> $$\epsilon = r - d(x,y) > 0.$$
>
> Si $z \in B(y,\epsilon)$, alors par l'inégalité triangulaire
>
> $$d(x,z) \le d(x,y) + d(y,z) < d(x,y) + \epsilon = r,$$
>
> donc $z \in B(x,r)$. Ainsi $B(y,\epsilon) \subset B(x,r)$. ∎
>
> **L'idée en une image** : plus on est près du bord, plus il faut choisir $\epsilon$ petit — et le bon $\epsilon$ est exactement *la distance qu'il reste à parcourir jusqu'au bord*. Ce choix « $\epsilon$ = ce qu'il reste » revient dans presque toutes les preuves de topologie.

**Proposition 2.6 (cours).**

- Une **union quelconque** d'ouverts de $E$ est un ouvert de $E$.
- Une **intersection finie** d'ouverts de $E$ est un ouvert de $E$.
- Une **union finie** de fermés de $E$ est un fermé de $E$.
- Une **intersection quelconque** de fermés de $E$ est un fermé de $E$.

⚠️ **« Finie » n'est pas décoratif.** L'intersection infinie d'ouverts peut être fermée :

$$\bigcap_{n \ge 1} \left] -\tfrac1n,\ \tfrac1n \right[ \;=\; \{0\},$$

⚠️ qui est fermé et non ouvert. Symétriquement, la réunion des $\bigl[\tfrac1n, 1\bigr]$ vaut $\,]0,1]$, union infinie de fermés qui n'est pas fermée. **En examen, le mot « finie » est la moitié de la note** sur ce type de question.

**Encadré IMPORTANT (cours).** Sur $E = \mathbb{R}^d$, **toutes les normes sont équivalentes** et définissent donc la même topologie. Donc peu importe la norme choisie pour définir la distance, les ouverts et fermés seront les mêmes. Idem pour les bornés, les compacts, l'adhérence, l'intérieur, les limites, etc.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi c'est une bonne nouvelle, et pas un détail technique.</span>

Sans ce résultat, il faudrait préciser « ouvert **pour quelle norme** » à chaque énoncé du cours. Grâce à lui, on écrit une norme sans indice pendant six chapitres. C'est un résultat **propre à la dimension finie** : en dimension infinie il est faux, et c'est là que commence l'analyse fonctionnelle.

</div>

## 🔴 Concept 4 — Intérieur, adhérence, frontière (déf. 2.7 à 2.9)

**Définition 2.7 (cours).** Soit $A \subset E$ et $x \in E$. On dit que $x \in \mathring{A}$ s'il existe $\epsilon > 0$ tel que $B(x,\epsilon) \subset A$. $\mathring{A}$ est appelé l'**intérieur** de $A$.

**Remarque (cours).** $\mathring{A} \subset A$ et $\mathring{A}$ est un ouvert de $E$. En fait, $\mathring{A}$ est le **plus grand ouvert** de $E$ inclus dans $A$. Si $A$ est ouvert, $\mathring{A} = A$.

**Définition 2.8 (cours).** Soit $A \subset E$ et $x \in E$. On dit que $x \in \bar{A}$ si

$$\forall \epsilon > 0,\quad B(x,\epsilon) \cap A \neq \emptyset .$$

$\bar A$ est appelé l'**adhérence** de $A$.

**Remarque (cours).** $A \subset \bar A$ et $\bar A$ est un fermé de $E$. En fait, $\bar A$ est le **plus petit fermé** de $E$ contenant $A$. Si $A$ est fermé, $\bar A = A$.

**Définition 2.9 (cours).** La **frontière** de $A$ est $Fr(A) = \bar A \setminus \mathring A$.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — les trois notions sur un exemple.</span>

Prenons $A = [0,1[ \;\cup\; \{2\}$ dans $\mathbb{R}$ :

| Objet | Valeur | Pourquoi |
|---|---|---|
| $\mathring A$ | $\,]0,1[$ | $0$ n'a aucune boule incluse (elle déborde à gauche) ; $\{2\}$ est isolé |
| $\bar A$ | $[0,1] \cup \{2\}$ | $1$ est limite de $1-\frac1n \in A$ |
| $Fr(A)$ | $\{0, 1, 2\}$ | ce que $\bar A$ contient en plus de $\mathring A$ |

**Retenez la caractérisation utile** : $x \in Fr(A)$ ⟺ toute boule autour de $x$ rencontre **à la fois** $A$ et son complémentaire. C'est le « bord » au sens intuitif.

⚠️ **Contre-intuition à connaître** : $A = \mathbb{Q} \cap [0,1]$ a un intérieur **vide** et une adhérence égale à $[0,1]$, donc $Fr(A) = [0,1]$ tout entier. La frontière peut être **plus grosse** que l'ensemble. Cela empêche de raisonner sur les frontières « par le dessin » sans vérification.

</div>

**Pourquoi ces notions comptent pour l'optimisation.** La proposition 4.11 du chapitre 4 s'énonce « soit $a \in \mathring{A}$ un extremum local » : la condition $\nabla f(a) = 0$ n'est **valable qu'à l'intérieur**. Sur la frontière, il faut le cône des directions admissibles (fiche 603) ou KKT (fiche 605). L'intérieur et la frontière découpent le travail de toute l'année.

## 🔴 Concept 5 — Limites, continuité, caractérisation séquentielle (déf. 2.10 à prop. 2.16)

**Définition 2.10 (cours).** Soit $f : A \to \mathbb{R}$, $a \in A$ et $l \in \mathbb{R}$. On dit que $\lim_{x \to a} f(x) = l$ si

$$\forall \alpha > 0,\ \exists \epsilon > 0,\ \forall x \in A,\quad d(x,a) < \epsilon \implies \lvert f(x) - l \rvert < \alpha .$$

⚠️ **Attention aux lettres.** M. Montaru appelle $\alpha$ la tolérance sur l'**arrivée** et $\epsilon$ la tolérance sur le **départ** — l'inverse de la convention « epsilon–delta » de beaucoup de manuels. **Utilisez ses lettres en copie** ; peu importe le nom, seul l'ordre des quantificateurs compte : on choisit d'abord la précision voulue $\alpha$, **puis** on trouve $\epsilon$ qui en dépend.

**Définition 2.11 (cours).** $f$ est **continue en $a$** si $\lim_{x\to a} f(x)$ existe et vaut $f(a)$. $f$ est **continue sur $A$** si elle l'est en tout point de $A$. **Notation :** $C(A)$ est l'ensemble des fonctions continues sur $A$ à valeurs réelles.

**Proposition 2.12 (cours).** Soit $f \in C(E)$.

- Si $O$ est un ouvert de $\mathbb{R}$, alors $f^{-1}(O)$ est un ouvert de $E$.
- Si $F$ est un fermé de $\mathbb{R}$, alors $f^{-1}(F)$ est un fermé de $E$.

**Exemple 2 (cours).** Soit $f \in C(\mathbb{R}^d)$. Alors $A = \{x \in \mathbb{R}^d,\ f(x) < 0\}$ est un **ouvert** et $B = \{x\in\mathbb{R}^d,\ f(x) \le 0\}$ est un **fermé** de $\mathbb{R}^d$.

> **C'est l'outil le plus rentable du chapitre.** Il transforme *toute* question « cet ensemble est-il fermé ? » en *« est-il décrit par des inégalités larges entre fonctions continues ? »*. Trois exemples immédiats :
>
> | Ensemble | Écriture | Conclusion |
> |---|---|---|
> | $\{x^2+y^2 = 1\}$ | image réciproque de $\{0\}$ par $g = x^2+y^2-1$ continue | **fermé** |
> | $\{x \ge 0,\ y\ge 0,\ x+y\le 1\}$ | intersection de 3 images réciproques de fermés | **fermé** |
> | $\{x^2 + y^2 < 1\}$ | image réciproque de $\,]-\infty,0[\,$ par $g$ | **ouvert** |
>
> Le premier et le deuxième sont exactement les ensembles de contrainte des exercices 5.1 et 6.2 du cours. **Écrire ces deux lignes vaut le point « $A$ est fermé » à chaque fois.**

**Définition 2.13 (cours).** Soit $(x_n)$ une suite de $E$ et $a \in E$. On dit que $\lim_{n\to+\infty} x_n = a$ si

$$\forall \epsilon > 0,\ \exists n_0 \in \mathbb{N},\ \forall n \ge n_0,\quad d(x_n, a) < \epsilon .$$

**Proposition 2.14 (cours).** Soit $A \subset E$. Alors $a \in \bar A$ **si et seulement si** il existe une suite $(x_n)$ de $A$ telle que $\lim_{n\to+\infty} x_n = a$.

**Proposition 2.15 (cours) — caractérisation séquentielle des fermés.** $A$ est un fermé de $E$ **si et seulement si** toute suite de $A$ qui converge dans $E$ a en fait sa limite dans $A$.

> **La formulation à retenir mot pour mot :** *« un fermé, c'est un ensemble stable par passage à la limite »*. C'est la version utilisable en pratique — la définition 2.4 par le complémentaire est celle qu'on écrit, celle-ci est celle dont on se sert.

**Proposition 2.16 (cours) — composition de limites.** Soit $(x_n)$ une suite de $A$ et $f : A \to \mathbb{R}$.

- Si $\lim_{n\to+\infty} x_n = a$ et $\lim_{x\to a} f(x) = l$, alors $\lim_{n\to+\infty} f(x_n) = l$.
- **Conséquence :** si $\lim_{n\to+\infty} x_n = a \in A$ et $f$ est continue en $a$, alors $\lim_{n\to+\infty} f(x_n) = f(a)$.

> **C'est la clé de la preuve de Weierstrass.** Toute la démonstration du théorème 2.22 consiste à extraire une sous-suite convergente (compacité), puis à faire passer $f$ à la limite (proposition 2.16). Deux outils, deux lignes.

## 🔴 Concept 6 — Bornés et compacts (déf. 2.17 à prop. 2.21)

**Définition 2.17 (cours).** $A \subset E$ est dite **bornée** si $A$ est incluse dans une boule (fermée ou ouverte, peu importe).

**Exemple 3 (cours).** Si $E$ est un espace vectoriel et $d$ provient de la norme, alors $A$ est bornée ssi il existe $R>0$ tel que $\forall x \in A,\ \lVert x \rVert \le R$, ce qui équivaut à $A \subset \bar B(0,R)$.

**Définition 2.18 (cours) — la définition à connaître par cœur.** $A \subset E$ est dite **compacte** si **toute suite de $A$ admet une sous-suite convergente dans $A$**.

⚠️ **Les deux conditions cachées dans « dans $A$ »** : la sous-suite doit converger, **et** sa limite doit appartenir à $A$. Oublier la seconde est l'erreur classique — c'est elle qui exclut $\,]0,1]$, où $x_n = 1/n$ n'a aucune sous-suite convergeant *dans* $\,]0,1]$.

**Proposition 2.19 (cours).** Soit $A$ compacte. Alors $A$ est bornée et fermée dans $E$.

**Proposition 2.20 (cours).** Si $A$ est compacte et si $F$ est un fermé de $E$ inclus dans $A$, alors $F$ est compact.

**Proposition 2.21 (cours).** Soit $f \in C(A)$. Si $A$ est compacte, alors $f(A)$ est compacte.

> **Preuve reconstruite de 2.21 — courte et instructive.** Soit $(y_n)$ une suite de $f(A)$ ; écrivons $y_n = f(x_n)$ avec $x_n \in A$. Par compacité de $A$, il existe une sous-suite $x_{\varphi(n)} \to a \in A$. Par continuité (prop. 2.16), $y_{\varphi(n)} = f(x_{\varphi(n)}) \to f(a) \in f(A)$. Donc $(y_n)$ admet une sous-suite convergente dans $f(A)$. ∎
>
> **Ce schéma — extraire, puis passer à la limite par continuité — est exactement celui de Weierstrass.** Si vous savez rédiger cette preuve, vous savez rédiger la suivante.

## 🔴 Concept 7 — Weierstrass et la caractérisation des compacts de $\mathbb{R}^d$ (thm 2.22 à 2.24)

**Théorème 2.22 (cours) — théorème de Weierstrass.**

> Soit $f \in C(A)$ avec $A$ **compacte**. Alors $f$ est bornée et **atteint ses bornes**. Autrement dit, $f$ admet un minimum et un maximum atteints sur $A$.

**Théorème 2.23 (cours) — théorème de Bolzano-Weierstrass.** Soit $a < b$ des réels. $[a,b]$ est un compact.

**Théorème 2.24 (cours) — caractérisation des compacts de $\mathbb{R}^d$.**

> Soit $A \subset \mathbb{R}^d$. $A$ est compacte **ssi** $A$ est **fermée dans $\mathbb{R}^d$ et bornée**.

⚠️ **Le « ssi » du théorème 2.24 vaut uniquement dans $\mathbb{R}^d$.** La proposition 2.19 (compact ⟹ fermé borné) est vraie dans tout espace métrique ; **la réciproque est propre à la dimension finie**. En examen, on ne vous demandera jamais autre chose que $\mathbb{R}^d$, mais écrire « fermé borné donc compact **dans $\mathbb{R}^d$** » montre que vous savez pourquoi la précision existe.

> **Preuve reconstruite de Weierstrass (2.22) — la démonstration à savoir refaire.**
>
> *Étape 1 — $f$ est bornée.* Par la proposition 2.21, $f(A)$ est une partie compacte de $\mathbb{R}$, donc bornée par la proposition 2.19.
>
> *Étape 2 — les bornes sont atteintes.* Notons $m = \inf_A f$, fini par l'étape 1. Par définition de la borne inférieure, pour tout $n \ge 1$ il existe $x_n \in A$ tel que
>
> $$m \le f(x_n) < m + \tfrac1n .$$
>
> $A$ étant compacte, il existe une sous-suite $x_{\varphi(n)} \to a \in A$. Par continuité de $f$ en $a$ (prop. 2.16), $f(x_{\varphi(n)}) \to f(a)$. Or l'encadrement force $f(x_{\varphi(n)}) \to m$. Par unicité de la limite, $f(a) = m$ : **le minimum est atteint en $a$**. Le maximum s'obtient en appliquant ce qui précède à $-f$. ∎
>
> **La technique porte un nom : la suite minimisante.** On fabrique une suite dont les valeurs tendent vers l'infimum, on en extrait une sous-suite convergente, on conclut par continuité. On la retrouve à l'identique dans la preuve du théorème 2.26 ci-dessous — c'est la seule idée de tout le chapitre.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — les trois contre-exemples qui montrent que chaque hypothèse sert.</span>

| Ce qu'on retire | Exemple | Ce qui casse |
|---|---|---|
| la **bornitude** | $f(x)=x$ sur $A = [0,+\infty[$ (fermé, non borné) | pas de maximum |
| la **fermeture** | $f(x)=x$ sur $A = \,]0,1[$ (borné, non fermé) | infimum $0$ et supremum $1$, **aucun atteint** |
| la **continuité** | $f(x) = x$ sur $[0,1[$ et $f(1) = 0$, sur $A=[0,1]$ compact | supremum $1$ non atteint |

Et le contre-exemple qui sépare « valeur optimale » et « point optimal » : $f(x) = e^x$ sur $\mathbb{R}$ a pour infimum $0$, qui **n'est atteint nulle part**. La valeur optimale existe (c'est un inf), le point optimal n'existe pas. Weierstrass sert précisément à interdire cette situation.

</div>

## 🔴 Concept 8 — La coercivité (déf. 2.25 à thm 2.28)

Quand $A$ n'est **pas borné**, Weierstrass ne s'applique plus. Le cours propose alors un second outil.

**Définition 2.25 (cours).** Soit $f : \mathbb{R}^d \to \mathbb{R}$. On dit que $f$ est **coercitive** (ou *infinie à l'infini*) si $\lim_{\lVert x \rVert \to +\infty} f(x) = +\infty$, c'est-à-dire si

$$\forall K > 0,\ \exists R > 0,\ \forall x \in \mathbb{R}^d,\quad \lVert x \rVert \ge R \implies f(x) \ge K .$$

**Théorème 2.26 (cours).** Soit $f \in C(\mathbb{R}^d)$ **coercitive**. Alors $f$ admet un **minimum global** sur $\mathbb{R}^d$.

**Remarque (cours).** Si $f \in C(\mathbb{R}^d)$ et si $-f$ est coercitive, alors $f$ admet un maximum global sur $\mathbb{R}^d$.

> **Preuve reconstruite du théorème 2.26 — comment la coercivité ramène à Weierstrass.**
>
> Posons $K = f(0) + 1$. Par coercivité, il existe $R > 0$ tel que $\lVert x \rVert \ge R \Rightarrow f(x) \ge K > f(0)$.
>
> Sur la boule fermée $\bar B(0,R)$ — **fermée et bornée dans $\mathbb{R}^d$, donc compacte** par le théorème 2.24 — Weierstrass donne un minimum, atteint en un point $a$ :
>
> $$\forall x \in \bar B(0,R), \quad f(a) \le f(x).$$
>
> En particulier $f(a) \le f(0)$, puisque $0 \in \bar B(0,R)$.
>
> Et pour $x$ **hors** de la boule, $f(x) \ge K > f(0) \ge f(a)$.
>
> Donc $f(a) \le f(x)$ pour tout $x \in \mathbb{R}^d$ : $a$ est un minimum **global**. ∎
>
> **L'idée en une phrase :** *la coercivité enferme le minimum dans une boule, et sur la boule c'est Weierstrass.* Le rôle de $f(0)$ est celui d'un **niveau témoin** : n'importe quelle valeur connue de $f$ ferait l'affaire.

**Ce que ces théorèmes ne font pas (cours, en toutes lettres).** *« Ces résultats sont intéressants car ils nous garantissent l'existence d'un extremum global mais ils ne nous aident pas du tout à trouver en quel point cet extremum est pris. Or, ceci est important dans un cas pratique en économie où on veut maximiser une fonction d'utilité par exemple. On verra que les extrema ne peuvent être pris qu'en certains points, dits critiques, ce qui réduira énormément le champ de recherche dans la plupart des cas. »*

### 8.1 La version sur un ouvert (déf. 2.27 et thm 2.28)

**Définition 2.27 (cours).** Soit $U$ un ouvert de $\mathbb{R}^n$ et $f : U \to \mathbb{R}$. On dit que $f$ est **coercitive** si

$$\lim_{x \in U,\ \lVert x \rVert \to +\infty} f(x) = +\infty \qquad \text{et} \qquad \lim_{x \in U,\ x \to \partial U} f(x) = +\infty .$$

**Théorème 2.28 (cours).** Soit $U$ un ouvert de $\mathbb{R}^n$ et $f \in C(U)$ coercitive. Alors $f$ admet un minimum global sur $U$.

⚠️ **La deuxième condition est celle qu'on oublie.** Sur un ouvert, le minimum peut fuir de deux manières : vers l'infini, **ou vers le bord**. La définition 2.27 les interdit toutes les deux. Sans la seconde, l'énoncé est faux : $f(x) = x$ sur $U = \,]0,1[$ ne tend pas vers $+\infty$ au bord gauche, et n'a pas de minimum.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — l'exemple type de la 2.27, celui qui revient en microéconomie.</span>

Sur $U = \,]0,+\infty[$, la fonction

$$f(x) = x + \frac1x$$

est continue, tend vers $+\infty$ en $+\infty$ **et** en $0^+$ (le bord de $U$). Elle est donc coercitive au sens 2.27 et admet un minimum global. On le calcule : $f'(x) = 1 - 1/x^2$ s'annule en $x = 1$, et $f(1) = 2$. **Contrôle numérique** : $f(0{,}5) = 2{,}5$, $f(1) = 2$, $f(2) = 2{,}5$. Le minimum vaut bien $2$. C'est le squelette de tout arbitrage « coût fixe contre coût variable » : un terme qui explose en $0$, un qui explose à l'infini, un optimum entre les deux.

</div>

## 🟠 Concept 9 — Choisir entre les deux théorèmes

C'est **la** décision de la question 1 de chaque exercice.

```
L'ENSEMBLE A EST-IL BORNÉ ?
│
├── OUI ──► est-il FERMÉ ?  (prop. 2.12 : décrit par des inégalités LARGES ?)
│           ├── OUI ──► A COMPACT (thm 2.24) ──► WEIERSTRASS (2.22)
│           │                                    → minimum ET maximum
│           └── NON ──► aucun théorème du cours. Étudier à la main,
│                        ou passer à l'adhérence et vérifier après coup.
│
└── NON ──► A est-il FERMÉ ?
            ├── OUI ──► f est-elle COERCIVE sur A ?
            │           ├── OUI ──► MINIMUM global (thm 2.26 / 4.9)
            │           │            (et si f → −∞, MAXIMUM global : thm 4.9)
            │           └── NON ──► pas de conclusion. Chercher un contre-exemple.
            └── NON (A ouvert) ──► coercivité au sens 2.27 :
                        +∞ à l'infini ET +∞ au bord ──► MINIMUM (thm 2.28)
```

**Les trois phrases à écrire en copie**, selon le cas :

1. *« $A$ est fermé comme image réciproque d'un fermé par une fonction continue (prop. 2.12), et borné car inclus dans une boule. Donc $A$ est compact (thm 2.24). $f$ étant continue, le théorème de Weierstrass (2.22) donne l'existence d'un minimum et d'un maximum sur $A$. »*
2. *« $A$ est fermé et non borné. On minore $f$ par une fonction de la norme qui tend vers l'infini, donc $f$ est coercive sur $A$. Le théorème 2.26 donne l'existence d'un minimum global. »*
3. *« $U$ est ouvert, $f$ tend vers $+\infty$ à l'infini et au bord de $U$ ; $f$ est donc coercitive au sens de la définition 2.27, et le théorème 2.28 donne l'existence d'un minimum global. »*

<details class="details--riche">
<summary>

**Exercice résolu — l'ensemble de l'exercice 5.1 du cours est-il compact ?**

</summary>

**Énoncé (cours, exercice 5.1).** On veut montrer l'existence d'un minimum et d'un maximum de $f(x,y) = 2x+y$ sur $A = \{(x,y) \in \mathbb{R}^2,\ x^2+y^2 = 1\}$. *(La détermination des extrema est faite en fiche 604 ; ici on ne traite que l'existence.)*

**Étape 1 — $A$ est fermé.** Posons $g(x,y) = x^2+y^2-1$. C'est un polynôme, donc $g \in C(\mathbb{R}^2)$. Or $A$ est l'image réciproque de $\{0\}$ par $g$, et $\{0\}$ est un fermé de $\mathbb{R}$. Par la **proposition 2.12**, $A$ est un fermé de $\mathbb{R}^2$.

**Étape 2 — $A$ est borné.** Pour $(x,y) \in A$, $\lVert (x,y) \rVert_2 = \sqrt{x^2+y^2} = 1$. Donc $A \subset \bar B(0,1)$, et $A$ est borné (exemple 3).

**Étape 3 — $A$ est compact.** Fermé et borné dans $\mathbb{R}^2$ : le **théorème 2.24** conclut.

**Étape 4 — conclusion.** $f(x,y) = 2x+y$ est continue (application linéaire, donc polynomiale). Le **théorème de Weierstrass (2.22)** s'applique : $f$ admet un minimum **et** un maximum sur $A$, tous deux **atteints**.

⚠️ **Le piège de l'étape 1.** Beaucoup écrivent $A = \{x^2+y^2 \le 1\}$ par distraction. Ici la contrainte est une **égalité** : $A$ est le **cercle**, pas le disque. Les deux sont compacts, mais le cercle est d'intérieur **vide** — ce qui aura une conséquence directe au chapitre 4 : aucun point de $A$ n'est intérieur, donc la condition $\nabla f = 0$ n'est **jamais** applicable, et il faut les extrema liés. Confondre les deux change complètement la méthode de résolution.

**Contrôle numérique de la valeur (anticipation de la fiche 604).** Sur le cercle, $2x+y$ s'écrit $\sqrt5\cos(t - \theta)$ pour un certain $\theta$, donc les extrema valent $\pm\sqrt5 \approx \pm 2{,}2360680$. On vérifie que le point $(x,y) = (2/\sqrt5,\ 1/\sqrt5) \approx (0{,}8944272,\ 0{,}4472136)$ est bien sur le cercle : $0{,}8+0{,}2 = 1$ , et donne $f = 2(0{,}8944272)+0{,}4472136 = 2{,}2360680 = \sqrt5$ .

</details>

<details class="details--riche">
<summary>

**Exercice résolu — trois fonctions, trois destins : reconnaître la coercivité**

</summary>

**Énoncé.** Pour chacune de ces fonctions sur $\mathbb{R}^2$, dire si elle est coercive, si elle admet un minimum global, et si ce minimum est unique.

$$f_1(x,y) = x^2+y^2, \qquad f_2(x,y) = (x-y)^2, \qquad f_3(x,y) = x^2 - y^2 .$$

**$f_1$ — coercive.** $f_1$ est le carré de la norme euclidienne. Pour $K>0$, prenons $R = \sqrt K$ : si $\lVert (x,y) \rVert \ge R$ alors $f_1 \ge K$. La définition 2.25 est vérifiée. Par le **théorème 2.26**, $f_1$ admet un minimum global. Il vaut $0$, atteint **au seul point** $(0,0)$.

**$f_2$ — non coercive, mais minimum quand même.** Le long de la droite $y = x$, $f_2(t,t) = 0$ pour tout $t$, alors que $\lVert (t,t) \rVert = \lvert t \rvert\sqrt2 \to +\infty$. La limite quand la norme tend vers l'infini **n'existe pas** ; en particulier elle ne vaut pas $+\infty$ : $f_2$ **n'est pas coercive**.

Pourtant $f_2 \ge 0$ et $f_2(0,0) = 0$ : le minimum global existe et vaut $0$. **Il est atteint sur toute la droite $y=x$** — une infinité de points.

> C'est exactement l'**encadré ATTENTION du chapitre 4** : *« L'existence d'un extremum global ne garantit absolument pas l'unicité du point où cet extremum est pris »*, illustré dans le cours par $f(x_1,x_2)=x_1^2$, minimal sur toute la droite $x_1 = 0$.

**Ce que cet exemple prouve.** Le théorème 2.26 donne une condition **suffisante**, pas nécessaire. Une fonction non coercive peut très bien avoir un minimum ; simplement, le cours ne fournit alors aucun théorème, et il faut un argument direct (ici : $f_2$ est un carré, donc positive, et la valeur $0$ est atteinte).

**$f_3$ — non coercive, pas de minimum.** Le long de $x=0$, $f_3(0,t) = -t^2 \to -\infty$. Donc l'infimum vaut $-\infty$ : **ni minimum ni maximum**. Le point $(0,0)$ est critique — le gradient $(2x,-2y)$ s'y annule — mais c'est un **point selle**, ce qu'on démontrera au chapitre 4 (fiche 603) avec le critère $rt-s^2 = (2)(-2) - 0 = -4 < 0$.

**Contrôle numérique.** $f_3(1,0) = 1 > 0 = f_3(0,0)$ et $f_3(0,1) = -1 < 0 = f_3(0,0)$ : la valeur en $(0,0)$ est **dépassée dans les deux sens** dans n'importe quel voisinage. Ce n'est donc ni un min ni un max local.

**La leçon des trois.**

| Fonction | coercive ? | minimum global ? | unique ? |
|---|---|---|---|
| $f_1 = x^2+y^2$ |  | (vaut $0$) |  |
| $f_2 = (x-y)^2$ |  | (vaut $0$) | (une droite entière) |
| $f_3 = x^2-y^2$ |  |  | — |

**Coercive ⟹ minimum**, mais aucune des deux réciproques n'est vraie.

</details>

<details class="details--riche">
<summary>

**Exercice résolu — quand aucun théorème ne s'applique, restreindre (rédaction type)**

</summary>

**Énoncé.** Soit $f(x,y) = \dfrac{1}{x^2+y^2}$ définie sur $U = \mathbb{R}^2 \setminus \{(0,0)\}$. Montrer que $f$ n'admet pas de maximum sur $U$. Puis dire quelle hypothèse du chapitre 2 fait défaut.

**Étape 1 — $U$ est-il fermé ?** Non : $U$ est le complémentaire du fermé $\{(0,0)\}$, donc $U$ est **ouvert**. La suite $x_n = (1/n, 0)$ est dans $U$ et converge vers $(0,0) \notin U$ : la **proposition 2.15** est violée, $U$ n'est pas fermé.

**Étape 2 — $f$ n'est pas majorée.** $f(1/n, 0) = n^2 \to +\infty$. Donc le supremum vaut $+\infty$ : **aucun maximum**.

**Étape 3 — l'hypothèse qui manque.** Weierstrass exige $A$ **compacte**. Ici $U$ n'est ni fermé ni borné. Peut-on sauver la situation avec le théorème 2.28 ? Il faudrait que $f$ soit coercitive **au sens de la définition 2.27** sur l'ouvert $U$, donc qu'elle tende vers $+\infty$ à l'infini. Or $f$ tend vers $0$ quand la norme tend vers l'infini. **La première condition de 2.27 échoue** : aucun théorème ne s'applique, et de fait il n'y a pas de minimum (l'infimum vaut $0$, non atteint).

**Étape 4 — le sauvetage.** Sur $A = \{(x,y),\ 1 \le x^2+y^2 \le 4\}$, en revanche :

- $A$ est fermé (intersection de deux images réciproques de fermés par $g = x^2+y^2$, continue) ;
- $A$ est borné (la norme y est majorée par $2$) ;
- donc $A$ est compact (thm 2.24) et $f$ y est continue.

Weierstrass s'applique : $f$ atteint son maximum $1$ sur le cercle $x^2+y^2=1$ et son minimum $1/4$ sur le cercle $x^2+y^2=4$.

**Contrôle numérique.** $f(1,0)=1$, $f(2,0)=0{,}25$, $f(\sqrt2,\sqrt2) = 1/4 = 0{,}25$ (le point est sur le cercle de rayon $2$ : $2+2=4$). Et pour un point intermédiaire, $f(1{,}5,0) = 1/2{,}25 \approx 0{,}4444$, bien compris entre $0{,}25$ et $1$.

**Ce que l'exercice enseigne.** Quand aucun théorème d'existence ne s'applique, **la bonne réaction n'est pas de forcer, c'est de restreindre l'ensemble** à un compact où le comportement est maîtrisé, puis de traiter le reste séparément. C'est exactement le mécanisme de la preuve du théorème 2.26.

</details>

## Comment reconnaître le type de problème

| Ce que dit l'énoncé | Ce qu'on vous demande vraiment | L'outil |
|---|---|---|
| « Montrer que $f$ admet un minimum sur $A$ » | l'**existence** seule — ne calculez rien | Weierstrass ou coercivité |
| « $A = \{g = 0\}$ » avec $g$ polynomiale bornante | fermé par prop. 2.12 + borné ⟹ **compact** | thm 2.24 puis 2.22 |
| « $A = \mathbb{R}^d$ », « $A = \mathbb{R}_+ \times [0,1]$ » (non borné) | **coercivité** | déf. 2.25, thm 2.26 / 4.9 |
| « sur l'ouvert $U$ » | coercivité **au bord aussi** | déf. 2.27, thm 2.28 |
| « montrer que $A$ est fermé » | image réciproque d'un fermé, ou suites | prop. 2.12 ou 2.15 |
| « $f$ est-elle bornée ? » | passe par la compacité de l'image | prop. 2.21 |
| « déterminer les extrema » | l'existence n'est que la **question 1** | chapitres 3 à 6 |

**Le signal le plus fiable :** si l'énoncé dit *« montrer l'existence »* **puis** *« déterminer »*, ce sont **deux questions indépendantes**. La première se traite entièrement avec cette fiche, sans jamais dériver quoi que ce soit. Beaucoup d'étudiants perdent le point de la première question en se précipitant sur les calculs de la seconde.

## Comment résoudre ce type d'exercice

**Protocole d'existence — cinq lignes, toujours les mêmes.**

1. **Identifier $f$ et $A$.** Écrire explicitement l'ensemble de contrainte. Distinguer égalité (cercle) et inégalité (disque) : ce n'est pas le même ensemble.
2. **Continuité de $f$.** Polynôme, quotient à dénominateur non nul, composée de continues : une phrase suffit, mais elle doit y être — c'est une hypothèse des deux théorèmes.
3. **Nature de $A$.**
  - *Fermé ?* → proposition 2.12 : $A$ décrit par des égalités ou des **inégalités larges** entre fonctions continues.
  - *Borné ?* → majorer la norme sur $A$ explicitement.
4. **Choisir le théorème** avec l'arbre du concept 9.
  - Compact → **Weierstrass 2.22** : min **et** max.
  - Fermé non borné + coercivité → **2.26** : min seulement (max si $f$ tend vers $-\infty$).
  - Ouvert + coercivité 2.27 → **2.28** : min.
5. **Conclure en nommant le théorème et son numéro.** « Par le théorème de Weierstrass (thm 2.22) » vaut mieux que « donc ça existe ».

**Comment prouver une coercivité en pratique — la seule technique.** Minorer $f$ par une fonction de la norme seule :

$$f(x) \ge \varphi\bigl(\lVert x \rVert\bigr) \quad \text{avec} \quad \varphi(t) \xrightarrow[t\to+\infty]{} +\infty .$$

Exemples de minorations utiles :

- $f(x) = \lVert x \rVert^2 - \langle b, x\rangle \ge \lVert x \rVert^2 - \lVert b \rVert\,\lVert x \rVert \to +\infty$ (Cauchy-Schwarz) ;
- $f(x,y) = x^4+y^4 - 4xy \ge x^4+y^4 - 2(x^2+y^2) \to +\infty$ (car $2\lvert xy \rvert \le x^2+y^2$) ;
- tout polynôme de degré pair dont le terme dominant est défini positif.

⚠️ **L'erreur de méthode la plus fréquente** : vérifier la coercivité *le long des axes seulement*. $f(x,y) = (x-y)^2$ tend bien vers $+\infty$ le long de $x$ et le long de $y$, et n'est pourtant **pas** coercive — la direction $y=x$ la tue. La coercivité doit valoir dans **toutes** les directions **simultanément**, et c'est précisément ce que garantit une minoration par une fonction de la norme.

## 🔴 Common mistakes

1. **Croire que « fermé » = « pas ouvert ».** $[0,1[$ n'est ni l'un ni l'autre ; l'ensemble vide et $\mathbb{R}^d$ sont les deux. La définition 2.4 est : fermé = complémentaire d'un ouvert.
2. **Oublier « dans $A$ » dans la définition 2.18.** Une suite de $\,]0,1]$ peut converger — vers $0$, qui n'y est pas. $\,]0,1]$ n'est pas compact.
3. **Utiliser la réciproque de la proposition 2.19 hors de $\mathbb{R}^d$.** « Fermé et borné ⟹ compact » est le théorème 2.24, **valable dans $\mathbb{R}^d$**. La proposition 2.19 est le sens facile.
4. **Confondre inégalité stricte et large.** $\{f < 0\}$ est ouvert, $\{f \le 0\}$ est fermé (exemple 2). Une contrainte $x > 0$ ne donne **pas** un ensemble fermé — et c'est souvent ce qui fait échouer l'argument d'existence dans les problèmes de microéconomie.
5. **Écrire « intersection d'ouverts est un ouvert » sans « finie ».** L'intersection des intervalles $\,]-1/n, 1/n[\,$ vaut $\{0\}$.
6. **Vérifier la coercivité seulement le long des axes.** Voir $(x-y)^2$ ci-dessus.
7. **Oublier la condition au bord dans la définition 2.27.** Sur un ouvert, il faut $f \to +\infty$ **à l'infini ET au bord**. C'est la moitié de la définition.
8. **Conclure « donc $\nabla f = 0$ » après un argument de Weierstrass.** Le chapitre 2 donne l'**existence**, pas la localisation. Et si l'extremum est sur la frontière, $\nabla f$ n'a aucune raison de s'annuler (chapitre 4, §4.3.2).
9. **Confondre valeur optimale et point optimal.** L'infimum de $e^x$ sur $\mathbb{R}$ vaut $0$ et existe ; aucun point ne le réalise.
10. **Croire que la coercivité est nécessaire.** Elle est **suffisante** (thm 2.26). $(x-y)^2$ a un minimum sans être coercive.
11. **Appliquer Weierstrass sans vérifier la continuité.** L'hypothèse $f \in C(A)$ est dans l'énoncé du théorème ; l'omettre coûte le point même si le résultat est juste.
12. **Prendre la norme euclidienne quand la norme infinie est plus simple.** L'encadré IMPORTANT du cours autorise **n'importe quelle norme** pour décider si un ensemble est ouvert, fermé, borné ou compact. Sur un carré $[0,2]^2$, la norme infinie donne la majoration en une ligne.

## 📌 Ultimate Review

**Le chapitre 2 en un paragraphe.** Une norme donne une distance ; une distance donne des boules ; les boules donnent les ouverts ; les fermés sont leurs complémentaires. Un compact est un ensemble où **toute suite a une sous-suite convergente qui reste dedans** — et dans $\mathbb{R}^d$, c'est exactement « fermé et borné » (2.24). Sur un compact, une fonction continue **atteint** son minimum et son maximum : c'est Weierstrass (2.22). Si l'ensemble n'est pas borné, on remplace la compacité par la **coercivité** — $f$ infinie à l'infini — et le minimum existe encore (2.26), parce que la coercivité enferme le minimum dans une boule où Weierstrass reprend la main.

**Les huit énoncés à savoir citer avec leur numéro.**

| N° | Énoncé | Usage |
|---|---|---|
| **2.12** | $f$ continue : image réciproque d'un fermé est fermée | prouver que $A$ est fermé |
| **2.15** | fermé ⟺ stable par limite de suites | l'autre méthode |
| **2.18** | compact = toute suite a une sous-suite convergente **dans $A$** | la définition |
| **2.21** | $A$ compact, $f$ continue ⟹ image compacte | étape de Weierstrass |
| **2.22** | **Weierstrass** : $f$ continue sur un compact atteint ses bornes | min **et** max |
| **2.24** | dans $\mathbb{R}^d$ : compact ⟺ fermé et borné | le critère pratique |
| **2.26** | $f$ continue coercive sur $\mathbb{R}^d$ ⟹ minimum global | ensemble non borné |
| **2.28** | idem sur un ouvert, avec coercivité **au bord** | contraintes strictes |

**Les trois formules-réflexes.**

$$\lVert x \rVert_\infty \le \lVert x \rVert_2 \le \lVert x \rVert_1, \qquad \max f = -\min(-f), \qquad Fr(A) = \bar A \setminus \mathring A .$$

**Le seul schéma de preuve du chapitre.** *Suite minimisante → sous-suite convergente (compacité) → passage à la limite (continuité) → la limite réalise l'infimum.* Il démontre 2.21, 2.22 et 2.26.

**Ce que le chapitre 2 ne fait pas :** localiser. Aucun gradient, aucune dérivée. La localisation commence au chapitre 3.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Énoncer les trois axiomes d'une distance, puis les trois d'une norme. Quel lien entre les deux ?**

</summary>

**Distance** (déf. 2.1) : séparation $d(x,y)=0 \iff x=y$ ; symétrie $d(x,y)=d(y,x)$ ; inégalité triangulaire $d(x,y) \le d(x,z)+d(z,y)$.

**Norme** (déf. 2.2, $E$ espace vectoriel) : séparation $\lVert x \rVert=0\iff x=0$ ; absolue homogénéité $\lVert \lambda x \rVert = \lvert \lambda \rvert \lVert x \rVert$ ; sous-additivité $\lVert x+y \rVert\le\lVert x \rVert+\lVert y \rVert$.

**Lien** : $d(x,y) = \lVert x-y \rVert$ est une distance. Chaque axiome de distance se déduit de l'axiome de norme de même rang — la symétrie venant de l'homogénéité avec $\lambda=-1$. La réciproque est fausse : toutes les distances ne viennent pas d'une norme (il faut $E$ vectoriel, et $d$ invariante par translation et homogène).

</details>

<details class="details--riche">
<summary>

**2. Donner un ensemble ni ouvert ni fermé, et un ensemble à la fois ouvert et fermé.**

</summary>

Ni l'un ni l'autre : $[0,1[$ dans $\mathbb{R}$. Il n'est pas ouvert car aucune boule autour de $0$ n'y est incluse ; il n'est pas fermé car $1-\frac1n \to 1 \notin [0,1[$ (prop. 2.15).

Les deux : l'ensemble vide et $\mathbb{R}^d$. Ce sont les **seuls** dans $\mathbb{R}^d$ — c'est la traduction topologique du fait que $\mathbb{R}^d$ est connexe.

</details>

<details class="details--riche">
<summary>

**3. Pourquoi le mot « finie » est-il indispensable dans « une intersection finie d'ouverts est un ouvert » ?**

</summary>

Parce que l'énoncé est faux sans lui :

$$\bigcap_{n\ge1}\left]-\tfrac1n,\tfrac1n\right[ = \{0\},$$

qui n'est pas ouvert. La raison profonde : pour une intersection **finie**, on prend $\epsilon = \min(\epsilon_1,\dots,\epsilon_k) > 0$ — un minimum **fini** de réels strictement positifs reste strictement positif. Pour une intersection infinie, l'infimum des $\epsilon_i$ peut être nul, et l'argument s'effondre.

</details>

<details class="details--riche">
<summary>

**4. Écrire la définition 2.18 d'un compact, puis expliquer pourquoi $\,]0,1]$ n'en est pas un.**

</summary>

$A$ est compacte si **toute suite de $A$ admet une sous-suite convergente dans $A$**.

Pour $\,]0,1]$ : la suite $x_n = 1/n$ y est. Toute sous-suite converge vers $0$ — donc converge, mais **pas dans $\,]0,1]$**. La condition « dans $A$ » est violée.

Autre voie : $\,]0,1]$ n'est pas fermé, donc pas compact par la proposition 2.19 (contraposée).

</details>

<details class="details--riche">
<summary>

**5. Démontrer le théorème de Weierstrass (2.22).**

</summary>

*$f$ bornée* : l'image $f(A)$ est compacte (prop. 2.21) donc bornée (prop. 2.19).

*Bornes atteintes* : soit $m = \inf_A f \in \mathbb{R}$. Pour tout $n\ge1$ il existe $x_n \in A$ avec $m \le f(x_n) < m + \frac1n$ (définition de l'infimum). Par compacité de $A$, une sous-suite $x_{\varphi(n)} \to a \in A$. Par continuité (prop. 2.16), $f(x_{\varphi(n)}) \to f(a)$ ; par l'encadrement, $f(x_{\varphi(n)}) \to m$. Donc $f(a) = m$, atteint en $a \in A$.

Le maximum s'obtient en appliquant le résultat à $-f$. ∎

</details>

<details class="details--riche">
<summary>

**6. Énoncer la définition 2.25 de la coercivité avec les quantificateurs, puis démontrer le théorème 2.26.**

</summary>

**Déf. 2.25** : $\forall K>0,\ \exists R>0,\ \forall x\in\mathbb{R}^d,\ \lVert x \rVert\ge R \Rightarrow f(x)\ge K$.

**Thm 2.26** : posons $K = f(0)+1$ ; la coercivité fournit $R>0$ tel que $\lVert x \rVert\ge R \Rightarrow f(x) > f(0)$. La boule $\bar B(0,R)$ est fermée bornée dans $\mathbb{R}^d$, donc compacte (2.24) ; Weierstrass y donne un minimum en $a$, et $f(a)\le f(0)$ car $0 \in \bar B(0,R)$. Hors de la boule, $f(x) > f(0) \ge f(a)$. Donc $f(a) \le f(x)$ partout : minimum global. ∎

</details>

<details class="details--riche">
<summary>

**7. La coercivité est-elle nécessaire à l'existence d'un minimum global ? Et l'unicité ?**

</summary>

**Non, ni l'une ni l'autre.**

*Pas nécessaire* : $f(x,y) = (x-y)^2$ n'est pas coercive (elle vaut $0$ sur toute la droite $y=x$, qui part à l'infini) et admet pourtant un minimum global, $0$.

*Pas d'unicité* : ce même exemple atteint son minimum en une **infinité** de points. Le cours le signale par l'encadré ATTENTION du chapitre 4 avec $f(x_1,x_2)=x_1^2$, minimal sur toute la droite $x_1=0$.

Le théorème 2.26 est donc une implication **suffisante et strictement à sens unique**.

</details>

<details class="details--riche">
<summary>

**8. Sur un ouvert, quelles sont les DEUX conditions de la définition 2.27 ? Que se passe-t-il si l'on oublie la seconde ?**

</summary>

$f$ tend vers $+\infty$ quand la norme tend vers l'infini dans $U$, **et** $f$ tend vers $+\infty$ quand $x$ tend vers le bord de $U$.

Sans la seconde, l'énoncé du théorème 2.28 est faux : $f(x)=x$ sur $U=\,]0,1[$ vérifie trivialement la première condition (il n'y a pas d'infini dans $U$) mais tend vers $0$ au bord gauche, et n'a pas de minimum sur $U$.

L'exemple type qui vérifie **les deux** : $f(x) = x + 1/x$ sur $\,]0,+\infty[$, de minimum $2$ en $x=1$.

</details>

<details class="details--riche">
<summary>

**9. On vous donne $A = \{(x,y) : x \ge 0,\ y \ge 0,\ x+y \le 1\}$ et $f$ polynomiale. Rédiger la question d'existence.**

</summary>

$A$ s'écrit comme l'intersection des trois ensembles $\{h_1 \le 0\}$, $\{h_2\le 0\}$, $\{h_3 \le 0\}$ avec $h_1 = -x$, $h_2 = -y$, $h_3 = x+y-1$, toutes continues (c'est **exactement** l'écriture du §6.1 du cours). Chaque ensemble $\{h_i \le 0\}$ est un fermé par la proposition 2.12 ; une **intersection finie** de fermés est fermée (prop. 2.6). Donc $A$ est fermé.

$A$ est borné : sur $A$, $0 \le x \le 1$ et $0 \le y \le 1$, donc $\lVert (x,y) \rVert_\infty \le 1$.

Fermé et borné dans $\mathbb{R}^2$ ⟹ $A$ **compact** (thm 2.24). $f$ polynomiale donc continue. **Weierstrass (2.22)** : $f$ admet sur $A$ un minimum et un maximum, atteints.

*(C'est l'ensemble de l'exemple 12 du chapitre 6, résolu en fiche 605.)*

</details>

<details class="details--riche">
<summary>

**10. Quelle est la différence entre ce que garantit le chapitre 2 et ce que cherchent les chapitres 3 à 6 ?**

</summary>

Le chapitre 2 garantit **qu'un extremum existe** ; il ne dit **rien** de l'endroit. Le cours l'écrit lui-même : *« ils ne nous aident pas du tout à trouver en quel point cet extremum est pris »*.

Les chapitres 3 à 6 **localisent** : ils réduisent la recherche aux points **critiques**, puis aux points vérifiant les extrema liés (ch. 5) ou KKT (ch. 6).

**Les deux sont indispensables et se complètent** : sans le chapitre 2, on ne sait pas si la liste de candidats a un sens ; sans les suivants, on ne sait pas où chercher. La combinaison gagnante, utilisée dans toute la fin du cours : *l'existence est acquise (Weierstrass) + il n'y a qu'un seul candidat (KKT) ⟹ c'est lui, sans avoir à étudier sa nature.*

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les 3 axiomes d'une distance ? | Séparation, symétrie, inégalité triangulaire |
| Distance issue d'une norme ? | $d(x,y)=\lVert x-y \rVert$ |
| Seconde inégalité triangulaire ? | $\bigl\lvert \lVert x \rVert-\lVert y \rVert \bigr\rvert \le \lVert x-y \rVert$ |
| Ce qu'elle prouve ? | La norme est **1-lipschitzienne**, donc continue |
| Les 3 normes du cours ? | $\lVert x \rVert_2$, $\lVert x \rVert_1$, $\lVert x \rVert_\infty$ |
| Leur ordre ? | $\lVert x \rVert_\infty \le \lVert x \rVert_2 \le \lVert x \rVert_1$ |
| Boules unités dans $\mathbb{R}^2$ ? | Losange (norme 1), disque (norme 2), carré (norme infinie) |
| Définition d'un ouvert (2.4) ? | $\forall x\in A,\ \exists\epsilon>0,\ B(x,\epsilon)\subset A$ |
| Définition d'un fermé ? | **Complémentaire d'un ouvert** |
| $[0,1[$ est ? | **Ni ouvert ni fermé** |
| Union quelconque d'ouverts ? | Ouverte |
| Intersection d'ouverts ? | Ouverte si **finie** |
| Contre-exemple ? | L'intersection des $\,]-\frac1n,\frac1n[\,$ vaut $\{0\}$ |
| Intérieur ? | Le **plus grand ouvert** inclus dans $A$ |
| Adhérence ? | Le **plus petit fermé** contenant $A$ |
| Frontière ? | $Fr(A)=\bar A\setminus\mathring A$ |
| Toutes les normes de $\mathbb{R}^d$ ? | **Équivalentes** — même topologie |
| Proposition 2.12 ? | Par une fonction continue, l'image réciproque d'un ouvert est ouverte, celle d'un fermé est fermée |
| $\{f<0\}$ et $\{f\le0\}$ ? | **Ouvert** et **fermé** |
| Caractérisation séquentielle des fermés ? | Stable par passage à la limite (2.15) |
| $a$ adhérent à $A$ ⟺ ? | Limite d'une suite de $A$ (2.14) |
| Définition d'un compact (2.18) ? | Toute suite a une sous-suite convergente **dans $A$** |
| Le mot à ne pas oublier ? | **« dans $A$ »** |
| $\,]0,1]$ compact ? | **Non** — $1/n$ converge hors de l'ensemble |
| Compact ⟹ ? | Fermé et borné (2.19), **partout** |
| Fermé borné ⟹ compact ? | Oui **dans $\mathbb{R}^d$** seulement (2.24) |
| $f$ continue, $A$ compact ⟹ ? | Image compacte (2.21) |
| Théorème 2.22 ? | **Weierstrass** : bornes atteintes sur un compact |
| Il donne ? | Un minimum **et** un maximum |
| Schéma de sa preuve ? | Suite minimisante → sous-suite → continuité |
| Théorème 2.23 ? | $[a,b]$ est compact (Bolzano-Weierstrass) |
| Coercive (2.25) ? | $f$ tend vers $+\infty$ quand la norme tend vers l'infini |
| Avec quantificateurs ? | $\forall K>0,\exists R>0,\ \lVert x \rVert\ge R\Rightarrow f(x)\ge K$ |
| Théorème 2.26 ? | $f$ continue coercive sur $\mathbb{R}^d$ ⟹ **minimum global** |
| Idée de la preuve ? | La coercivité **enferme** le minimum dans une boule |
| Maximum global ? | Si $-f$ est coercive |
| Coercivité sur un ouvert (2.27) ? | $+\infty$ à l'infini **ET** au bord |
| Théorème 2.28 ? | Minimum global sur l'ouvert |
| Exemple type de 2.27 ? | $x+1/x$ sur $\,]0,+\infty[$, minimum $2$ en $x=1$ |
| $(x-y)^2$ est-elle coercive ? | **Non** — nulle sur $y=x$ |
| A-t-elle un minimum ? | **Oui**, $0$, sur toute une droite |
| Ce que cela prouve ? | Coercivité **suffisante**, pas nécessaire |
| $x^2-y^2$ ? | Ni min ni max — **point selle** en $(0,0)$ |
| Prouver une coercivité ? | Minorer par une fonction de la norme tendant vers $+\infty$ |
| L'erreur classique ? | Vérifier **le long des axes** seulement |
| Ce que le chapitre 2 ne donne pas ? | La **localisation** de l'extremum |
| Valeur optimale ≠ point optimal ? | L'infimum de $e^x$ vaut $0$, jamais atteint |
| Maximum en fonction du minimum ? | $\max f = -\min(-f)$ |
| Où cette symétrie tombe-t-elle ? | **KKT** : la condition $\mu_j\ge0$ (ch. 6) |
| Les 3 exemples du §1.6 ? | Régression linéaire, production sous budget, transport optimal |
| Le transport optimal relève de ? | **KKT** (ch. 6), contraintes affines donc (QCA) |
|  |  |
