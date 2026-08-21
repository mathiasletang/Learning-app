# Fiche 527 — Fonction valeur, théorème de l'enveloppe et théorèmes de séparation

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — appendice mathématique, §A2.4 et §A2.5 (p. 601-611) |
| **Difficulté** | Avancé — les deux outils qui reviennent dans TOUT le livre |
| **Temps d'étude estimé** | 120 min |
| **Prérequis** | [Fiche 526](526-jehle-kuhn-tucker-inegalites.md) — conditions de Kuhn-Tucker, complémentarité · [Fiche 525](525-jehle-lagrange-contraintes-egalite.md) — lagrangien · [Fiche 521](521-jehle-ensembles-applications.md) — Weierstrass, suites, compacité |
| **Concepts clés** | Problème paramétré, vecteur de paramètres, fonction valeur, continuité des contraintes, théorème du maximum, correspondance, théorème de l'enveloppe, effet total contre effet partiel, multiplicateur comme valeur marginale, constante de contrainte, séparation de convexes, hyperplan séparateur, vecteur de longueur un, adhérence |
| **Poids à l'examen** | Le problème (A2.35) et **la FONCTION VALEUR** · la **définition A2.3** et les **deux façons dont la continuité peut échouer** · le **THÉORÈME A2.21 DU MAXIMUM** et ses quatre parties · **LE THÉORÈME A2.22 DE L'ENVELOPPE**, son énoncé, sa lecture et **sa preuve en quatre pas** · l'**exemple A2.11** · **l'interprétation du multiplicateur comme VALEUR MARGINALE** · l'**idée géométrique de la séparation** et les **théorèmes A2.23 et A2.24**. |

## 🎯 Vue d'ensemble

```
LE FIL DU §A2.4 - §A2.5 : LES DEUX GRANDS OUTILS D'ARRIERE-PLAN

  §A2.4  LE PROBLEME PARAMETRE            (A2.35)

     max f(x, a)   s.c.  g_j(x, a) <= 0,  j = 1, ..., m
      x

     x  =  les VARIABLES DE CHOIX
     a  =  UN VECTEUR DE PARAMETRES qui peut entrer dans
           L'OBJECTIF, LES CONTRAINTES, OU LES DEUX

     LA FONCTION VALEUR :

        V(a) = max f(x, a)  s.c.  g_j(x, a) <= 0

     « Les solutions varient-elles CONTINUMENT avec a ?
       La valeur maximisee varie-t-elle CONTINUMENT ? »

     DEUX FACONS D'ECHOUER :  l'ensemble realisable peut
     « SE CONTRACTER OU S'ETENDRE DRAMATIQUEMENT »
       -> la CONTINUITE des g_j interdit les EXPANSIONS
       -> la DEF. A2.3 interdit les CONTRACTIONS

  THEOREME A2.21  LE THEOREME DU MAXIMUM  ( 4 parties )
     (i)   une SOLUTION EXISTE pour tout a
     (ii)  LA FONCTION VALEUR EST CONTINUE
     (iii) la limite de solutions EST UNE SOLUTION
     (iv)  si la solution est UNIQUE, x(a) EST CONTINUE

  THEOREME A2.22  LE THEOREME DE L'ENVELOPPE :

        dV(a)/da_j  =  ( dL/da_j )  evalue en  ( x(a), lambda(a) )

     « L'EFFET TOTAL sur la valeur optimisee quand un parametre
       change -- et donc, PRESUMABLEMENT, TOUT LE PROBLEME DOIT
       ETRE REOPTIMISE -- peut se deduire SIMPLEMENT en prenant
       LA PARTIELLE DU LAGRANGIEN par rapport au parametre. »

     -> LE MULTIPLICATEUR devient LA VALEUR MARGINALE
        du relachement de la contrainte

  §A2.5  LES THEOREMES DE SEPARATION

     « Deux convexes DISJOINTS peuvent etre SEPARES par une
       DROITE ( un PLAN, un HYPERPLAN ). »

        p . a  >  I  >  p . b     pour tout a dans A, b dans B

     THEOREME A2.23  C FERME, CONVEXE, SANS L'ORIGINE
                     ->  il existe p DE LONGUEUR UN et alpha > 0
                         avec  p . c >= alpha  pour tout c

     THEOREME A2.24  A et B CONVEXES DISJOINTS
                     ->  p . a >= p . b
                     et si en plus FERMES avec UN BORNE :
                         p . (a - b) >= alpha > 0
```

> ⚠️ **Note de transcription — spécifique à cette section.** Le PDF **exporte le PRODUIT CARTÉSIEN $\times$ comme un « + »** : *« $g^j:\mathbb{R}^n+A\to\mathbb{R}$ »* signifie **$\mathbb{R}^n\times A$**, et *« un ouvert $W+U$ de $\mathbb{R}^n+A$ »* signifie **$W\times U$**. Il **PERD LES BARRES DE NORME** *(« $\min_{c\in C}c$ » signifie $\min_{c\in C}\lVert c\rVert$)*, **PERD le barré de $\notin$** *(exporté « $\in/$ »)* et de $\neq$, **PERD un $\partial$** dans la formule du proof de l'enveloppe *(« $\partial f(x,a)/a_j$ » signifie $\partial f(x,a)/\partial a_j$)*, et perd $\sum$. **L'adhérence $\bar{C}$ est exportée « $C¯$ ».** Les figures utilisent l'encodage Symbol Mac *(`ϭ` = « = »)*. **Réparation de transcription, non ajout de contenu.**

## 🟠 Concept 1 — §A2.4 : le problème paramétré et la fonction valeur

### 1.1 Le programme

$$\max_{\mathbf{x}\in\mathbb{R}^n}\ f(\mathbf{x},\mathbf{a})\qquad\text{s.c.}\qquad g^j(\mathbf{x},\mathbf{a})\leq0,\quad j=1,\dots,m \tag{A2.35}$$

> *« où **$\mathbf{x}$ est un vecteur de VARIABLES DE CHOIX, et $\mathbf{a}=(a_1,\dots,a_l)$ est UN VECTEUR DE PARAMÈTRES QUI PEUVENT ENTRER DANS LA FONCTION OBJECTIF, DANS LES CONTRAINTES, OU DANS LES DEUX.** »*

### 1.2 Les hypothèses de travail

> *« **Nous maintenons les hypothèses et notations suivantes DANS TOUTE CETTE SECTION.** L'ensemble des paramètres est un sous-ensemble $A$ de $\mathbb{R}^l$ et chaque $g^j:\mathbb{R}^n\times A\to\mathbb{R}$. Soit **$S$ l'ensemble des $(\mathbf{x},\mathbf{a})\in\mathbb{R}^n\times A$ QUI SATISFONT TOUTES LES CONTRAINTES**. **Pour tout $\mathbf{a}\in A$, nous supposons qu'il existe AU MOINS UN $\mathbf{x}$** satisfaisant les contraintes. La fonction objectif $f$ est définie sur un sous-ensemble $D$ de $\mathbb{R}^n\times A$ contenant $S$. »*

### 🔴 1.3 La fonction valeur

> *« Supposons un instant que **pour chaque $\mathbf{a}\in A$ il y ait AU MOINS UNE solution $\mathbf{x}(\mathbf{a})$**. Alors, pour ce vecteur de paramètres, **LA VALEUR MAXIMISÉE de la fonction objectif est $f(\mathbf{x}(\mathbf{a}),\mathbf{a})$. CECI DÉFINIT UNE NOUVELLE FONCTION, $V(\mathbf{a})$, APPELÉE LA FONCTION VALEUR.** »*

$$\boxed{\;V(\mathbf{a})=\max_{\mathbf{x}\in\mathbb{R}^n}\ f(\mathbf{x},\mathbf{a})\qquad\text{s.c.}\qquad g^j(\mathbf{x},\mathbf{a})\leq0,\quad j=1,\dots,m\;}$$

*« chaque fois que le maximum existe »*. *(Fig. A2.13 : **la valeur maximale de $f(\mathbf{x},\mathbf{a})$ sous la contrainte (SATURÉE) $g(\mathbf{x},\mathbf{a})=0$**, avec $y^*=f(\mathbf{x}(\mathbf{a}),\mathbf{a})$ sur le niveau $L(y^*)$.)*

### 1.4 Les deux questions

> *« **CLAIREMENT, les solutions à (A2.35) DÉPENDRONT D'UNE CERTAINE MANIÈRE du vecteur de paramètres $\mathbf{a}\in A$. LES SOLUTIONS VARIENT-ELLES CONTINÛMENT avec $\mathbf{a}$ ? La valeur maximisée $V(\mathbf{a})$ VARIE-T-ELLE CONTINÛMENT avec $\mathbf{a}$ ? NOUS FOURNIRONS DES RÉPONSES AUX DEUX.** »*

## 🔴 Concept 2 — La continuité des contraintes (définition A2.3)

### 2.1 Les deux façons d'échouer

> *« Pour assurer la continuité de la fonction valeur ou de la solution, **NOUS N'AVONS PAS SEULEMENT BESOIN QUE $f$ SOIT CONTINUE, il faut AUSSI assurer que DE PETITS CHANGEMENTS DE $\mathbf{a}$ N'ONT QU'UN PETIT EFFET SUR L'ENSEMBLE DES VALEURS RÉALISABLES DE $\mathbf{x}$.** »*

> ⚠️ *« **IL Y A ESSENTIELLEMENT DEUX FAÇONS DONT CECI PEUT ÉCHOUER. L'ensemble des valeurs réalisables de $\mathbf{x}$ pourrait SE CONTRACTER OU S'ÉTENDRE DRAMATIQUEMENT.** »*

| Le danger | Ce qui l'écarte |
|---|---|
| **Une EXPANSION dramatique** | *« **LA CONTINUITÉ des fonctions $g^j$ assure que DES EXPANSIONS DRAMATIQUES NE PEUVENT PAS SE PRODUIRE quand $\mathbf{a}$ ne change que légèrement** »* |
| **Une CONTRACTION dramatique** | *« **Assurer que DES CONTRACTIONS DRAMATIQUES ne se produisent pas exige UNE CONDITION SUPPLÉMENTAIRE** »* |

### 2.2 La définition A2.3

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION A2.3 — Continuité des contraintes</span>

On dit que **la continuité des contraintes est satisfaite** si **chaque $g^j:\mathbb{R}^n\times A\to\mathbb{R}$ est CONTINUE**, et si, **pour tout $(\mathbf{x}^0,\mathbf{a}^0)\in\mathbb{R}^n\times A$ satisfaisant les $m$ contraintes**, et **pour toute suite $\mathbf{a}^k$ de $A$ convergeant vers $\mathbf{a}^0$**, **il existe une suite $\mathbf{x}^k$ de $\mathbb{R}^n$ convergeant vers $\mathbf{x}^0$ telle que $(\mathbf{x}^k,\mathbf{a}^k)$ SATISFASSE LES CONTRAINTES POUR TOUT $k$**.

</div>

> *(Note 7.)* *« **Cette définition est ÉQUIVALENTE aux notions de SEMI-CONTINUITÉ SUPÉRIEURE ET INFÉRIEURE dans la théorie des CORRESPONDANCES.** »*

⚠️ **En clair** : *si un point était réalisable pour $\mathbf{a}^0$, on peut le SUIVRE de manière continue quand le paramètre bouge un peu.*

## 🔴 Concept 3 — Le théorème A2.21 du maximum

### 3.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.21 — Le théorème du maximum</span>

Supposons que **$S$ est COMPACT**, que **$f:D\to\mathbb{R}$ est CONTINUE**, et que **la continuité des contraintes est satisfaite**. Alors : **(i)** **Une solution à (A2.35) EXISTE pour tout $\mathbf{a}\in A$**, et donc **la fonction valeur $V(\mathbf{a})$ est définie sur TOUT $A$**. **(ii)** **La fonction valeur $V:A\to\mathbb{R}$ est CONTINUE.** **(iii)** Si $(\mathbf{x}^k,\mathbf{a}^k)$ converge vers $(\mathbf{x}^*,\mathbf{a}^*)$ et si, **pour tout $k$, $\mathbf{x}^k$ est une solution quand $\mathbf{a}=\mathbf{a}^k$**, alors **$\mathbf{x}^*$ est une solution quand $\mathbf{a}=\mathbf{a}^*$**. **(iv)** **Si, pour tout $\mathbf{a}$, la solution est UNIQUE et donnée par $\mathbf{x}(\mathbf{a})$, alors $\mathbf{x}:A\to\mathbb{R}^n$ est CONTINUE.**

</div>

### 3.2 La preuve

<details class="details--riche">
<summary>

**Partie (i) — l'existence, par Weierstrass**

</summary>

> *« La partie (i) **découle IMMÉDIATEMENT du THÉORÈME A1.10** parce que **la COMPACITÉ de $S$ et la CONTINUITÉ de chaque $g^j$ impliquent que, pour tout $\mathbf{a}\in A$, l'ensemble des $\mathbf{x}\in\mathbb{R}^n$ satisfaisant les $m$ contraintes est COMPACT**, et parce que **nous avons supposé TOUT DU LONG qu'il est NON VIDE**. »*

⚠️ **C'est WEIERSTRASS** *([fiche 521](521-jehle-ensembles-applications.md), théorème A1.10)* : **fonction continue sur un compact non vide ⟹ le maximum est ATTEINT.**

</details>

<details class="details--riche">
<summary>

**Partie (iii) — la limite de solutions est une solution**

</summary>

> *« **Supposons, PAR L'ABSURDE, que (iii) échoue.** »*

| Pas | L'argument |
|---|---|
| **1** | Alors $\mathbf{x}^*$ **n'est pas** une solution quand $\mathbf{a}=\mathbf{a}^*$ ⟹ *« il existe $\hat{\mathbf{x}}$ tel que $(\hat{\mathbf{x}},\mathbf{a}^*)\in S$ et **$f(\hat{\mathbf{x}},\mathbf{a}^*)>f(\mathbf{x}^*,\mathbf{a}^*)$** »* |
| **2** | *« Parce que $\mathbf{a}^k$ converge vers $\mathbf{a}^*$, **LA CONTINUITÉ DES CONTRAINTES appliquée à $(\hat{\mathbf{x}},\mathbf{a}^*)$** implique qu'il y a **une suite $\hat{\mathbf{x}}^k$ convergeant vers $\hat{\mathbf{x}}$ telle que $(\hat{\mathbf{x}}^k,\mathbf{a}^k)$ satisfasse les contraintes** »* |
| **3** | *« **LA CONTINUITÉ DE $f$ implique (voir le THÉORÈME A1.9)** que $f(\hat{\mathbf{x}}^k,\mathbf{a}^k)\to f(\hat{\mathbf{x}},\mathbf{a}^*)$ et $f(\mathbf{x}^k,\mathbf{a}^k)\to f(\mathbf{x}^*,\mathbf{a}^*)$ »* |
| **4** | ⟹ $\ f(\hat{\mathbf{x}}^k,\mathbf{a}^k)>f(\mathbf{x}^k,\mathbf{a}^k)$ **pour tout $k$ assez grand** |
| **5** | *« **Mais ceci CONTREDIT le fait que $\mathbf{x}^k$ résout (A2.35) quand $\mathbf{a}=\mathbf{a}^k$.** »* |

⚠️ **La continuité des contraintes sert EXACTEMENT à fabriquer la suite $\hat{\mathbf{x}}^k$** — sans elle, le meilleur point $\hat{\mathbf{x}}$ pourrait être **inatteignable** pour les paramètres voisins.

</details>

<details class="details--riche">
<summary>

**Partie (ii) — la continuité de la fonction valeur**

</summary>

> *« Soit $\{\mathbf{a}^k\}$ une suite de $A$ convergeant vers $\mathbf{a}^*$. **Par le THÉORÈME A1.9, IL SUFFIT DE MONTRER QUE $V(\mathbf{a}^k)$ CONVERGE VERS $V(\mathbf{a}^*)$.** »*

**Par l'absurde** : sinon, *« pour un certain $\varepsilon>0$, il y a **un sous-ensemble INFINI $I'$** tel que **$V(\mathbf{a}^k)$ n'est PAS à moins de $\varepsilon$ de $V(\mathbf{a}^*)$** »*.

| Pas | L'argument |
|---|---|
| **1** | Pour chaque $k\in I'$, il existe une solution $\mathbf{x}^k$ avec $V(\mathbf{a}^k)=f(\mathbf{x}^k,\mathbf{a}^k)$ |
| **2** | *« Parce que chaque $(\mathbf{x}^k,\mathbf{a}^k)$ est **DANS LE COMPACT $S$**, **le THÉORÈME A1.8** implique que la suite **A UNE SOUS-SUITE CONVERGENTE** »* vers un $(\hat{\mathbf{x}},\hat{\mathbf{a}})$ |
| **3** | La sous-suite des $\mathbf{a}^k$ converge **aussi vers $\mathbf{a}^*$** ⟹ $\hat{\mathbf{a}}=\mathbf{a}^*$, et **par continuité de $f$**, $V(\mathbf{a}^k)\to f(\hat{\mathbf{x}},\mathbf{a}^*)$ |
| **4** | **Par la partie (iii)**, $\hat{\mathbf{x}}$ **est une solution** quand $\mathbf{a}=\mathbf{a}^*$ ⟹ $V(\mathbf{a}^*)=f(\hat{\mathbf{x}},\mathbf{a}^*)$ |
| **5** | ⟹ $V(\mathbf{a}^k)\to V(\mathbf{a}^*)$ le long de cette sous-suite — **ce qui CONTREDIT le choix de $I'$** |

⚠️ **Les trois outils de la [fiche 521](521-jehle-ensembles-applications.md) sont ici en action** : **A1.8** *(sous-suite convergente)*, **A1.9** *(caractérisation séquentielle)*, **A1.10** *(Weierstrass)*.

</details>

<details class="details--riche">
<summary>

**Partie (iv) — la continuité de la solution**

</summary>

> *« Soit $\{\mathbf{a}^k\}$ convergeant vers $\mathbf{a}^*$. **Par le théorème A1.9, il suffit de montrer que $\mathbf{x}(\mathbf{a}^k)$ converge vers $\mathbf{x}(\mathbf{a}^*)$.** Supposons par l'absurde que non. […] **En définissant $\mathbf{x}^k=\mathbf{x}(\mathbf{a}^k)$, LA PREUVE PROCÈDE ALORS COMME CELLE DE LA PARTIE (ii) ET EST LAISSÉE EN EXERCICE** »* *(exercice A2.35)*.

</details>

## 🔴 Concept 4 — Le théorème A2.22 de l'enveloppe

### 4.1 L'annonce

> *« Si **la solution est TOUJOURS UNIQUE** et si **l'objectif, les contraintes et les solutions sont DIFFÉRENTIABLES en le paramètre $\mathbf{a}$**, il y a **UN THÉORÈME TRÈS PUISSANT qui peut servir à analyser LE COMPORTEMENT DE LA FONCTION VALEUR $V(\mathbf{a})$ quand le vecteur de paramètres change. C'est le THÉORÈME DE L'ENVELOPPE.** »*

> *« Pour **garder la notation SIMPLE**, nous prouverons le théorème **quand il n'y a QU'UNE SEULE contrainte**. **Vous êtes invité à généraliser le résultat au cas de plusieurs contraintes dans les exercices** *(A2.36)*. »*

### 4.2 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.22 — Le théorème de l'enveloppe</span>

Considérons (A2.35) **avec une seule contrainte**, et supposons que $f$ et $g$ sont **continûment différentiables en $(\mathbf{x},\mathbf{a})$** sur un ouvert $W\times U$ de $\mathbb{R}^n\times A$. Pour chaque $\mathbf{a}\in U$, supposons que $\mathbf{x}(\mathbf{a})\in W$ **résout (A2.35) DE MANIÈRE UNIQUE**, **est continûment différentiable en $\mathbf{a}$**, et que **la contrainte $g(\mathbf{x}(\mathbf{a}),\mathbf{a})\leq0$ est SATURÉE pour tout $\mathbf{a}\in U$**. Soit $\mathcal{L}(\mathbf{x},\mathbf{a},\lambda)$ le lagrangien associé et $(\mathbf{x}(\mathbf{a}),\lambda(\mathbf{a}))$ une solution des conditions de Kuhn-Tucker du théorème A2.20. Soit enfin $V(\mathbf{a})$ la fonction valeur. Alors, **pour tout $\mathbf{a}\in U$** :

$$\boxed{\;\frac{\partial V(\mathbf{a})}{\partial a_j}=\left.\frac{\partial\mathcal{L}}{\partial a_j}\right|_{\mathbf{x}(\mathbf{a}),\,\lambda(\mathbf{a})}\qquad j=1,\dots,m\;}$$

*« où le membre de droite désigne **la dérivée partielle du LAGRANGIEN par rapport au paramètre $a_j$ ÉVALUÉE AU POINT $(\mathbf{x}(\mathbf{a}),\lambda(\mathbf{a}))$** ».*

</div>

### 🔴 4.3 CE QUE LE THÉORÈME DIT

$$\boxed{\;\textbf{« L'EFFET TOTAL sur la valeur optimisée de la fonction objectif quand un}\\\textbf{paramètre change (et donc, PRÉSUMABLEMENT, TOUT LE PROBLÈME DOIT ÊTRE}\\\textbf{RÉOPTIMISÉ) peut se déduire SIMPLEMENT en prenant LA PARTIELLE DU}\\\textbf{LAGRANGIEN par rapport au paramètre, puis en ÉVALUANT cette dérivée}\\\textbf{À LA SOLUTION des conditions du premier ordre. »}\;}$$

> *« Bien que nous nous soyons **confinés au cas d'UNE SEULE contrainte**, **le théorème s'applique QUEL QUE SOIT LE NOMBRE DE CONTRAINTES, avec LA RÉSERVE HABITUELLE qu'il y ait MOINS DE CONTRAINTES QUE DE VARIABLES DE CHOIX.** »*

> ⚠️ *« **En raison de L'IMPORTANCE de ce théorème, ET PARCE QU'IL N'EST PAS SI ÉVIDEMMENT VRAI, nous travaillerons une preuve PLUTÔT ÉTENDUE.** »*

### 4.4 La preuve, en quatre pas

<details class="details--riche">
<summary>

**Pas 1 — ce qu'il faut atteindre**

</summary>

**Le lagrangien** : $\ \mathcal{L}\equiv f(\mathbf{x},\mathbf{a})-\lambda\big[g(\mathbf{x},\mathbf{a})\big]$.

**Par hypothèse**, $\mathbf{x}(\mathbf{a})$ et $\lambda(\mathbf{a})$ satisfont les conditions de Kuhn-Tucker, **et la contrainte étant SATURÉE** :

$$\frac{\partial f(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial x_i}-\lambda(\mathbf{a})\frac{\partial g(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial x_i}=0\ \ (i=1,\dots,n) \qquad\qquad g(\mathbf{x}(\mathbf{a}),\mathbf{a})=0 \tag{P.1}$$

**La partielle du lagrangien par rapport à $a_j$**, évaluée en $(\mathbf{x}(\mathbf{a}),\lambda(\mathbf{a}))$ :

$$\left.\frac{\partial\mathcal{L}}{\partial a_j}\right|_{\mathbf{x}(\mathbf{a}),\lambda(\mathbf{a})}=\frac{\partial f(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial a_j}-\lambda(\mathbf{a})\frac{\partial g(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial a_j} \tag{P.2}$$

> *« **Si nous pouvons montrer que la partielle de la fonction valeur par rapport à $a_j$ ÉGALE LE MEMBRE DE DROITE DE (P.2), NOUS AURONS PROUVÉ LE THÉORÈME.** »*

</details>

<details class="details--riche">
<summary>

**Pas 2 — dériver $V$ DIRECTEMENT (et la règle de composition)**

</summary>

> *« Nous commençons **en différentiant DIRECTEMENT $V(\mathbf{a})$ par rapport à $a_j$. Parce que $a_j$ affecte $f$ DIRECTEMENT ET INDIRECTEMENT par son influence sur CHAQUE variable $x_i(\mathbf{a})$, NOUS DEVRONS NOUS SOUVENIR D'UTILISER LA RÈGLE DE COMPOSITION.** »*

$$\frac{\partial V(\mathbf{a})}{\partial a_j}=\underbrace{\sum_{i=1}^{n}\left[\frac{\partial f(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial x_i}\cdot\frac{\partial x_i(\mathbf{a})}{\partial a_j}\right]}_{\textbf{la RÈGLE DE COMPOSITION}}+\frac{\partial f(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial a_j}$$

⚠️ **C'est le terme de la SOMME qui rend le théorème « pas si évidemment vrai » : il représente LA RÉOPTIMISATION.**

</details>

<details class="details--riche">
<summary>

**Pas 3 — substituer les conditions du premier ordre**

</summary>

> *« **Retournez aux conditions du premier ordre (P.1). En réarrangeant la première** »* :

$$\frac{\partial f(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial x_i}\equiv\lambda(\mathbf{a})\frac{\partial g(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial x_i},\qquad i=1,\dots,n$$

**En substituant dans le terme entre crochets de la sommation** :

$$\frac{\partial V(\mathbf{a})}{\partial a_j}=\lambda(\mathbf{a})\sum_{i=1}^{n}\left[\frac{\partial g(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial x_i}\cdot\frac{\partial x_i(\mathbf{a})}{\partial a_j}\right]+\frac{\partial f(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial a_j} \tag{P.3}$$

</details>

<details class="details--riche">
<summary>

**Pas 4 — LE « TRUC » FINAL : différentier l'identité de contrainte**

</summary>

> *« **LE « TRUC » FINAL est de retourner ENCORE aux conditions du premier ordre et de regarder LA SECONDE IDENTITÉ du système. PARCE QUE $g(\mathbf{x}(\mathbf{a}),\mathbf{a})\equiv0$, NOUS POUVONS DIFFÉRENTIER LES DEUX MEMBRES par rapport à $a_j$ et ils doivent être ÉGAUX. Parce que LA DÉRIVÉE DE LA CONSTANTE ZÉRO EST ZÉRO** »* :

$$\underbrace{\sum_{i=1}^{n}\frac{\partial g(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial x_i}\cdot\frac{\partial x_i(\mathbf{a})}{\partial a_j}}_{\textbf{encore la RÈGLE DE COMPOSITION}}+\frac{\partial g(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial a_j}\equiv0$$

**En réarrangeant** :

$$\frac{\partial g(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial a_j}\equiv-\sum_{i=1}^{n}\frac{\partial g(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial x_i}\cdot\frac{\partial x_i(\mathbf{a})}{\partial a_j}$$

> *« **En rentrant le signe moins dans les crochets, nous pouvons SUBSTITUER le membre de gauche de cette identité À TOUT LE TERME DE SOMMATION dans (P.3)** »* :

$$\frac{\partial V(\mathbf{a})}{\partial a_j}=-\lambda(\mathbf{a})\frac{\partial g(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial a_j}+\frac{\partial f(\mathbf{x}(\mathbf{a}),\mathbf{a})}{\partial a_j} \tag{P.4}$$

> ⚠️ *« **Le membre de droite de (P.4) EST LE MÊME QUE LE MEMBRE DE DROITE DE (P.2).** »* $\blacksquare$

⚠️ **LE MIRACLE, en une phrase** : **tout le terme de RÉOPTIMISATION est absorbé par la CONTRAINTE** — la somme qui décrit comment les $x_i$ se réajustent **est exactement compensée** par l'effet direct du paramètre sur la contrainte.

</details>

<details class="details--riche">
<summary>

**EXEMPLE A2.11 — la vérification, DEUX FOIS**

</summary>

$$\max_{x_1,x_2}\ x_1x_2\qquad\text{s.c.}\qquad 2x_1+4x_2-a=0$$

> *« **Nous ferons ceci DE DEUX FAÇONS : d'abord, nous dériverons la fonction $V(a)$ EXPLICITEMENT et la différentierons ; PUIS nous utiliserons le théorème de l'enveloppe pour voir si nous obtenons la MÊME CHOSE.** »*

⚠️ *(Le livre note que ce problème *« diffère légèrement de (A2.35) parce que **NOUS N'EXIGEONS PAS LA NON-NÉGATIVITÉ**. Nous pouvons donc **NOUS PASSER des conditions de Kuhn-Tucker et JUSTE UTILISER LA MÉTHODE LAGRANGIENNE SIMPLE** »*.)*

**MÉTHODE 1 — explicitement.** $\ \mathcal{L}=x_1x_2-\lambda\big[2x_1+4x_2-a\big]$ ⟹

$$\mathcal{L}_1=x_2-2\lambda=0 \qquad \mathcal{L}_2=x_1-4\lambda=0 \qquad \mathcal{L}_\lambda=a-2x_1-4x_2=0 \tag{E.1}$$

⟹ $\ x_1(a)=\dfrac{a}{4}$, $\ x_2(a)=\dfrac{a}{8}$, $\ \lambda(a)=\dfrac{a}{16}$

$$V(a)=x_1(a)\,x_2(a)=\frac{a}{4}\cdot\frac{a}{8}=\frac{a^2}{32} \qquad\Longrightarrow\qquad \frac{dV(a)}{da}=\frac{a}{16}$$

**MÉTHODE 2 — par l'enveloppe.** *« Le théorème nous dit que **pour voir comment la valeur maximisée varie avec un paramètre, DIFFÉRENTIEZ SIMPLEMENT LE LAGRANGIEN par rapport au paramètre et ÉVALUEZ à la solution de (E.1)** »* :

$$\frac{dV(a)}{da}=\frac{\partial\mathcal{L}}{\partial a}=\lambda \qquad\xrightarrow{\ \lambda(a)=a/16\ }\qquad \frac{dV(a)}{da}=\frac{a}{16}$$

> ⚠️ *« **ce qui COLLE.** »*

> ⚠️ *« Outre vérifier que le théorème de l'enveloppe « MARCHE », **cet exemple nous a AUSSI DONNÉ UN APERÇU de l'interprétation que nous pouvons donner à ces variables « INCIDENTES », LES MULTIPLICATEURS DE LAGRANGE.** »*

*(Le livre ajoute : *« nous pourrions **aussi construire des fonctions valeur pour les problèmes de MINIMISATION de manière analogue**, et **le théorème de l'enveloppe s'appliquerait AUSSI pour eux** »*.)*

</details>

### 🔴 4.5 Le multiplicateur enfin interprété

> **L'exercice A2.33, mot pour mot :** *« Considérez un problème de maximisation où **il y a $m$ contraintes de la forme $g^j(\mathbf{x})-a_j=0$. Ici, AUCUN des $a_j$ n'entre dans la fonction objectif ET CHACUN N'ENTRE QUE DANS UNE SEULE CONTRAINTE. Dans de tels problèmes, $a_j$ est appelée LA CONSTANTE DE CONTRAINTE.** Sous les hypothèses du théorème de l'enveloppe, **montrez que nous pouvons interpréter le multiplicateur de Lagrange associé à chaque contrainte comme L'EFFET SUR LA VALEUR MAXIMISÉE de la fonction objectif D'UN CHANGEMENT DE LA CONSTANTE DE CONTRAINTE PERTINENTE.** […] **Ainsi, nous pouvons interpréter le $j$-ième multiplicateur comme LA VALEUR MARGINALE DU RELÂCHEMENT DE LA $j$-IÈME CONTRAINTE.** »*

<details class="details--riche">
<summary>

**Piste (enrichissement pédagogique — hors cours)**

</summary>

> ⚠️ **Le livre ne fournit pas de corrigé.** Le calcul suivant est **un enrichissement pédagogique**.

Avec $\mathcal{L}=f(\mathbf{x})-\sum_j\lambda_j\big[g^j(\mathbf{x})-a_j\big]$, **le paramètre $a_j$ n'apparaît QUE dans le $j$-ième terme**, et **avec un signe $+$** :

$$\frac{\partial\mathcal{L}}{\partial a_j}=+\lambda_j$$

⚠️ **Le théorème de l'enveloppe donne alors IMMÉDIATEMENT** :

$$\boxed{\;\frac{\partial V(\mathbf{a})}{\partial a_j}=\lambda_j^*\;}$$

**Avec des contraintes d'INÉGALITÉ $g^j(\mathbf{x})\leq a_j$**, le même calcul s'applique aux contraintes **SATURÉES** ; pour les contraintes **lâches**, **la complémentarité donne $\lambda_j^*=0$** — et **relâcher une contrainte qui ne mord pas n'apporte effectivement RIEN**.

⚠️ **C'est la réponse à la question laissée en suspens depuis la [fiche 525](525-jehle-lagrange-contraintes-egalite.md)** : le multiplicateur, *« seulement INCIDENT »* dans la résolution, **est en réalité LE PRIX IMPLICITE de la ressource rare.**

</details>

## 🔴 Concept 5 — §A2.5 : l'idée de la séparation

### 5.1 La géométrie, dans le plan

> *« **Nous terminons cet appendice mathématique par un regard sur ce qu'on appelle les théorèmes de « SÉPARATION ». L'IDÉE EST GÉOMÉTRIQUEMENT ASSEZ SIMPLE.** La fig. A2.14 montre **deux convexes DISJOINTS, $A$ et $B$, dans $\mathbb{R}^2$. IL EST ÉVIDENT QUE NOUS POUVONS TRACER UNE DROITE ENTRE EUX. Une telle droite est dite « SÉPARER » les deux ensembles.** »*

**Si la droite est décrite par** $\ p_1x_1+p_2x_2=I$, *« où $p_1$, $p_2$ et $I$ sont des constantes POSITIVES »*, alors

$$\text{tout } (a_1,a_2)\in A:\quad p_1a_1+p_2a_2>I \qquad\qquad \text{tout } (b_1,b_2)\in B:\quad p_1b_1+p_2b_2<I$$

$$\boxed{\;\textbf{« La notion GÉOMÉTRIQUE de séparation s'exprime ANALYTIQUEMENT :}\\\mathbf{p}\cdot\mathbf{a}>\mathbf{p}\cdot\mathbf{b} \textbf{ pour tout } \mathbf{a}\in A \textbf{ et tout } \mathbf{b}\in B. \textbf{ »}\;}$$

### 5.2 La montée en dimension

> *« **Imaginez maintenant deux convexes disjoints dans $\mathbb{R}^3$, disons UNE SPHÈRE ET UNE BOÎTE avec la sphère ENTIÈREMENT À L'EXTÉRIEUR de la boîte. Là encore, IL EST ÉVIDENT que nous pouvons séparer les deux ensembles, CETTE FOIS PAR UN PLAN, et UNE EXPRESSION ANALYTIQUE IDENTIQUE, mais maintenant avec tous les vecteurs dans $\mathbb{R}^3$, décrit la situation.** »*

> *« Les théorèmes ci-dessous **GÉNÉRALISENT ceci à N'IMPORTE QUEL NOMBRE DE DIMENSIONS. Nous fournirons DEUX théorèmes. LE SECOND GÉNÉRALISE STRICTEMENT LE PREMIER et permet aux ensembles $A$ et $B$ d'être, par exemple, OUVERTS et « TANGENTS » l'un à l'autre.** »*

## 🔴 Concept 6 — Le théorème A2.23 (premier théorème de séparation)

### 6.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.23 — Un premier théorème de séparation</span>

Supposons que **$C$ est un sous-ensemble FERMÉ ET CONVEXE de $\mathbb{R}^n$ QUI NE CONTIENT PAS L'ORIGINE $\mathbf{0}$**. Alors il existe **un vecteur $\mathbf{p}\in\mathbb{R}^n$ DE LONGUEUR UN** et **$\alpha>0$** tels que

$$\mathbf{p}\cdot\mathbf{c}\geq\alpha\qquad\textbf{pour tout } \mathbf{c}\in C$$

</div>

⚠️ **L'idée** : *« séparer $C$ de l'origine »* — et **le vecteur $\mathbf{p}$ est le NORMAL à l'hyperplan séparateur**.

### 6.2 La preuve

<details class="details--riche">
<summary>

**Étape 1 — le point de $C$ LE PLUS PROCHE DE L'ORIGINE existe**

</summary>

> *« Si $C$ est vide **il n'y a rien à prouver**, donc supposons $C$ non vide. **Considérez le problème de MINIMISATION** »* :

$$\min_{\mathbf{c}\in C}\ \lVert\mathbf{c}\rVert \tag{P.1}$$

| Pas | L'argument |
|---|---|
| **1** | *« **Si l'ensemble FERMÉ $C$ était BORNÉ, IL SERAIT COMPACT.** Alors, parce que $\lVert\mathbf{c}\rVert$ est **une fonction réelle CONTINUE**, nous pourrions appliquer **le THÉORÈME A1.10** et conclure qu'une solution existe. »* |
| **2** | *« **MAIS $C$ N'A PAS BESOIN D'ÊTRE BORNÉ.** »* — **L'ASTUCE** : choisir **n'importe quel $\mathbf{c}^0\in C$** et considérer $$\min_{\mathbf{c}\in C'}\ \lVert\mathbf{c}\rVert,\qquad\text{où } C'=\{\mathbf{c}\in C\ :\ \lVert\mathbf{c}\rVert\leq\lVert\mathbf{c}^0\rVert\} \tag{P.2}$$ |
| **3** | *« Parce que **$C'$ est FERMÉ ET BORNÉ**, (P.2) a une solution $\hat{\mathbf{c}}$ »* |
| **4** | *« **Mais $\hat{\mathbf{c}}$ est ALORS AUSSI une solution à (P.1)**, car sinon un $\mathbf{c}\in C$ satisferait $\lVert\mathbf{c}\rVert<\lVert\hat{\mathbf{c}}\rVert\leq\lVert\mathbf{c}^0\rVert$, **contredisant que $\hat{\mathbf{c}}$ résout (P.2)** »* |

⚠️ **Le tour de force** : **on TRONQUE l'ensemble non borné en un compact, sans changer le minimum.**

</details>

<details class="details--riche">
<summary>

**Étape 2 — la convexité, et le retour du théorème A2.19**

</summary>

> *« Parce que $\hat{\mathbf{c}}$ résout (P.1) **et parce que $C$ est CONVEXE**, nous avons que pour tout $\mathbf{c}\in C$ »*

$$\lVert\alpha\mathbf{c}+(1-\alpha)\hat{\mathbf{c}}\rVert^2=\alpha^2\,\mathbf{c}\cdot\mathbf{c}+2\alpha(1-\alpha)\,\hat{\mathbf{c}}\cdot\mathbf{c}+(1-\alpha)^2\,\hat{\mathbf{c}}\cdot\hat{\mathbf{c}}$$

*« est **MINIMISÉE en $\alpha\in[0,1]$ EN $\alpha=0$** »*.

> ⚠️ *« **Donc, PAR LE THÉORÈME A2.19, cette fonction QUADRATIQUE de $\alpha$, ÉTANT DIFFÉRENTIABLE, A UNE DÉRIVÉE NON NÉGATIVE par rapport à $\alpha$ ÉVALUÉE EN $\alpha=0$.** »*

⚠️ **C'est EXACTEMENT la condition (i) de minimisation sous contrainte de non-négativité** *([fiche 526](526-jehle-kuhn-tucker-inegalites.md), théorème A2.19(2))* : **un minimum en $\alpha=0$ exige $f'(0)\geq0$.**

$$2\alpha\,\mathbf{c}\cdot\mathbf{c}+2(1-2\alpha)\,\hat{\mathbf{c}}\cdot\mathbf{c}-2(1-\alpha)\,\hat{\mathbf{c}}\cdot\hat{\mathbf{c}}\geq0\qquad\text{quand } \alpha=0$$

**c'est-à-dire** $\ 2\hat{\mathbf{c}}\cdot\mathbf{c}-2\hat{\mathbf{c}}\cdot\hat{\mathbf{c}}\geq0$, **ou de manière équivalente** :

$$\hat{\mathbf{c}}\cdot\mathbf{c}\ \geq\ \hat{\mathbf{c}}\cdot\hat{\mathbf{c}}=\lVert\hat{\mathbf{c}}\rVert^2\qquad\textbf{pour tout } \mathbf{c}\in C$$

</details>

<details class="details--riche">
<summary>

**Étape 3 — la normalisation**

</summary>

> *« Parce que **$\hat{\mathbf{c}}\in C$ et $\mathbf{0}\notin C$ impliquent $\hat{\mathbf{c}}\neq\mathbf{0}$**, nous pouvons conclure que »*

$$\hat{\mathbf{c}}\cdot\mathbf{c}\ \geq\ \lVert\hat{\mathbf{c}}\rVert^2>0\qquad\textbf{pour tout } \mathbf{c}\in C$$

> *« **Donc, en posant $\mathbf{p}=\hat{\mathbf{c}}/\lVert\hat{\mathbf{c}}\rVert$ et $\alpha=\lVert\hat{\mathbf{c}}\rVert>0$** »*, on obtient $\ \mathbf{p}\cdot\mathbf{c}\geq\alpha$ pour tout $\mathbf{c}\in C$. $\blacksquare$

⚠️ **Le vecteur séparateur $\mathbf{p}$ est donc SIMPLEMENT LA DIRECTION DU POINT DE $C$ LE PLUS PROCHE DE L'ORIGINE.**

</details>

## 🔴 Concept 7 — Le théorème A2.24 (second théorème de séparation)

### 7.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME A2.24 — Un second théorème de séparation</span>

Supposons que **$A$ et $B$ sont des sous-ensembles CONVEXES DISJOINTS de $\mathbb{R}^n$**. Alors **il existe un vecteur $\mathbf{p}\in\mathbb{R}^n$ de longueur un** tel que

$$\mathbf{p}\cdot\mathbf{a}\geq\mathbf{p}\cdot\mathbf{b}\qquad\textbf{pour tout } \mathbf{a}\in A \textbf{ et tout } \mathbf{b}\in B$$

**Si, DE PLUS, $A$ et $B$ sont FERMÉS et qu'AU MOINS L'UN est BORNÉ**, $\mathbf{p}$ peut être choisi de sorte que, **pour un certain $\alpha>0$** :

$$\mathbf{p}\cdot(\mathbf{a}-\mathbf{b})\geq\alpha\qquad\textbf{pour tout } \mathbf{a}\in A \textbf{ et tout } \mathbf{b}\in B$$

</div>

⚠️ **Deux niveaux** : la première partie **ne suppose NI fermeture NI bornitude** — c'est elle qui **permet aux ensembles d'être « TANGENTS »** ; la seconde donne **une séparation STRICTE, avec une marge $\alpha$**.

### 7.2 La preuve

<details class="details--riche">
<summary>

**La seconde partie — le passage à la DIFFÉRENCE $A-B$**

</summary>

> *« **Commençons par la SECONDE partie**, où l'on suppose en plus que **$A$ et $B$ sont fermés et que L'UN est borné.** »*

**Définir** $\ C=A-B$, *« l'ensemble de tous les points de la forme $\mathbf{a}-\mathbf{b}$ »*.

| La propriété | La justification du livre |
|---|---|
| **$C$ est CONVEXE** | *« **il n'est pas difficile d'argumenter** que $C$ est convexe **(ESSAYEZ !)** »* |
| **$C$ est FERMÉ** | *« **avec un peu plus d'effort**, on peut aussi montrer que $C$ est fermé »* *(exercice A2.37)* |
| **$\mathbf{0}\notin C$** | *« **parce que $A$ et $B$ sont DISJOINTS** »* |

⟹ **On peut appliquer le THÉORÈME A2.23** : il existe $\mathbf{p}$ de longueur un et $\alpha>0$ avec $\mathbf{p}\cdot\mathbf{c}\geq\alpha$ pour tout $\mathbf{c}\in C$, *« **mais, par la définition de $C$, cela signifie** »*

$$\mathbf{p}\cdot(\mathbf{a}-\mathbf{b})\geq\alpha\qquad\text{pour tout } \mathbf{a}\in A,\ \mathbf{b}\in B \quad$$

⚠️ **L'astuce centrale** : **séparer DEUX ensembles revient à séparer LEUR DIFFÉRENCE DE L'ORIGINE.**

</details>

<details class="details--riche">
<summary>

**La première partie — l'ADHÉRENCE $\bar{C}$ et le cas frontière**

</summary>

> *« Passons maintenant à la première partie, où **NI $A$ NI $B$ n'ont besoin d'être fermés ou bornés.** En posant encore $C=A-B$, **il est toujours vrai que $\mathbf{0}\notin C$ et que $C$ est convexe, MAIS $C$ N'A PLUS BESOIN D'ÊTRE FERMÉ. Ainsi, NOUS NE POUVONS PAS FAIRE APPEL DIRECTEMENT au théorème A2.23.** »*

**À la place** : *« soit $\bar{C}$ **l'ensemble de TOUTES LES LIMITES de suites convergentes de points de $C$**. **L'ensemble $\bar{C}$ est FERMÉ ET CONVEXE (CONVAINQUEZ-VOUS !).** De plus, **$\bar{C}$ CONTIENT $C$ parce que tout point $\mathbf{c}$ de $C$ est la limite de la suite CONSTANTE $\mathbf{c},\mathbf{c},\dots$** »*.

| Le cas | L'argument |
|---|---|
| **$\mathbf{0}\notin\bar{C}$** | *« nous appliquons le théorème A2.23 **EXACTEMENT comme quand $C$ est fermé, et NOUS AVONS FINI** »* |
| **$\mathbf{0}\in\bar{C}$** | *« **par l'exercice A2.38, IL SUFFIT DE MONTRER QUE $\mathbf{0}$ EST UN MEMBRE DE $\partial\bar{C}$, LA FRONTIÈRE de $\bar{C}$** »*, car alors il existe $\mathbf{p}$ de longueur un avec $\mathbf{p}\cdot\mathbf{c}\geq0$ pour tout $\mathbf{c}\in C$ |

**Il reste donc à montrer que $\mathbf{0}\in\partial\bar{C}$.**

</details>

<details class="details--riche">
<summary>

**La contradiction finale — la boule, les vecteurs unitaires et $-\delta\mathbf{1}$**

</summary>

**Par l'absurde** : supposons $\mathbf{0}\in\bar{C}$ **mais $\mathbf{0}\notin\partial\bar{C}$**.

| Pas | L'argument |
|---|---|
| **1** | *« Par la définition de la frontière, **$\mathbf{0}$ n'est la limite d'AUCUNE suite de points HORS de $\bar{C}$** »* ⟹ *« **il existe $\varepsilon>0$ tel que $B_\varepsilon(\mathbf{0})$ EST CONTENUE DANS $\bar{C}$. (RÉFLÉCHISSEZ À POURQUOI IL EN EST AINSI.)** »* |
| **2** | **Choisir $\delta>0$ assez petit** pour que **$\delta\mathbf{e}_i$ ET $-\delta\mathbf{1}$ soient dans $B_\varepsilon(\mathbf{0})\subset\bar{C}$** *(où $\mathbf{e}_i$ est le $i$-ième vecteur unitaire et $\mathbf{1}$ le vecteur de 1)* |
| **3** | **Par définition de $\bar{C}$**, il existe des suites de points de $C$ avec $\ \mathbf{c}^{0,k}\to-\delta\mathbf{1}$ et $\mathbf{c}^{i,k}\to\delta\mathbf{e}_i$ **(P.1)** |
| **4** | **Pour chaque $k$, former $C_k$ = l'ensemble des COMBINAISONS CONVEXES de $\mathbf{c}^{0,k},\dots,\mathbf{c}^{n,k}$** — *« $C_k$ est fermé et convexe **(VÉRIFIEZ !)** »*, *« **et CONTENU DANS $C$ parce que tout point de $C_k$ est une combinaison convexe de points DU CONVEXE $C$** »* ⟹ **$\mathbf{0}\notin C_k$** |
| **5** | ⟹ **Le THÉORÈME A2.23 donne un $\mathbf{p}^k$ de longueur un** avec $\ \mathbf{p}^k\cdot\mathbf{c}^{i,k}\geq0$ pour $i=0,\dots,n$ **(P.2)** |
| **6** | *« Parce que la suite $\{\mathbf{p}^k\}$ est **BORNÉE, le THÉORÈME A1.8 implique qu'elle a UNE SOUS-SUITE CONVERGENTE** »* vers $\hat{\mathbf{p}}$, **avec $\lVert\hat{\mathbf{p}}\rVert=1$ « étant la limite de vecteurs de longueur un »** |
| **7** | **En passant à la limite dans (P.2) via (P.1)** : $\ \hat{\mathbf{p}}\cdot(-\delta\mathbf{1})\geq0\ $ et $\ \hat{\mathbf{p}}\cdot(\delta\mathbf{e}_i)\geq0$ **(P.3)** |
| **8** | *« **Les $n$ dernières inégalités impliquent $\hat{p}_i\geq0$ pour tout $i$. AVEC LA PREMIÈRE, ceci implique $\hat{\mathbf{p}}=\mathbf{0}$, CONTREDISANT LE FAIT QUE $\hat{\mathbf{p}}$ A LONGUEUR UN** »* $\blacksquare$ |

⚠️ **La mécanique du pas 8** : $\hat{\mathbf{p}}\cdot\mathbf{e}_i\geq0$ donne **toutes les coordonnées $\geq0$** ; $\hat{\mathbf{p}}\cdot(-\mathbf{1})\geq0$ donne **leur somme $\leq0$** ⟹ **elles sont TOUTES NULLES**.

</details>

### 7.3 Le mot de la fin

> *« **LES DEUX THÉORÈMES DE SÉPARATION PRÉSENTÉS ICI SUFFISENT POUR LA PLUPART DES USAGES. On pourrait s'interroger sur d'autres théorèmes de ce genre. Par exemple, UN POINT SUR LA FRONTIÈRE D'UN CONVEXE PEUT-IL ÊTRE SÉPARÉ DE L'ENSEMBLE ? L'EXERCICE A2.39 EXPLORE CETTE QUESTION.** »*

⚠️ **Où servent-ils ?** **Le théorème A2.24 est l'outil central de la preuve du théorème A2.20 de KUHN-TUCKER** *([fiche 526](526-jehle-kuhn-tucker-inegalites.md))* — c'est lui qui **sépare $\nabla f(\mathbf{x}^*)$ du cône $B$**. *(Ils servent aussi aux deux théorèmes fondamentaux du bien-être, chapitre 5, [fiche 511](511-jehle-bien-etre-coeur.md).)*

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Un paramètre $\mathbf{a}$ dans l'objectif ou la contrainte | **(A2.35)** | **Former la FONCTION VALEUR $V(\mathbf{a})$** |
| « la solution varie-t-elle continûment ? » | **Théorème A2.21** | **$S$ compact $+$ $f$ continue $+$ CONTINUITÉ DES CONTRAINTES** |
| « comment $V$ varie-t-elle avec $a_j$ ? » | **Théorème A2.22** | **$\partial\mathcal{L}/\partial a_j$ ÉVALUÉE à la solution** |
| « que vaut $\lambda_j^*$ ? » | **Exercice A2.33** | **$\partial V/\partial a_j$ — LA VALEUR MARGINALE** |
| « relâcher la contrainte améliore-t-il ? » | **Exercice A2.34** | **$\lambda^*\geq0$ par Kuhn-Tucker ⟹ $\partial V/\partial a\geq0$** |
| « deux convexes disjoints » | **§A2.5** | **SÉPARATION** — passer à $C=A-B$ |
| « $C$ fermé convexe sans l'origine » | **Théorème A2.23** | **Le POINT LE PLUS PROCHE de l'origine donne $\mathbf{p}$** |
| « $A$ et $B$ ouverts ou non bornés » | **Théorème A2.24, 1ʳᵉ partie** | **Passer par L'ADHÉRENCE $\bar{C}$** |
| « prouver qu'un ensemble est fermé » | **Exercice A2.37** | **Une suite convergente de points de l'ensemble a sa limite dedans** *(thm A1.9(2))* |

**Les trois réflexes de cadrage :**

1. **Devant une dérivée de fonction valeur, NE PAS réoptimiser.** **C'est tout le message de l'enveloppe** : *« l'EFFET TOTAL […] peut se déduire SIMPLEMENT en prenant LA PARTIELLE DU LAGRANGIEN »*.
2. **Vérifier que la contrainte est SATURÉE.** Le théorème A2.22 l'exige explicitement — sinon, **$\lambda=0$ et le paramètre n'a aucun effet**.
3. **Pour séparer deux ensembles, TOUJOURS passer à leur DIFFÉRENCE.** Cela ramène le problème à **séparer un seul convexe de l'ORIGINE**.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Construire une fonction valeur

| Pas | L'action |
|---|---|
| **1** | **Résoudre le programme** pour $\mathbf{x}(\mathbf{a})$ *(en fonction du paramètre)* |
| **2** | **Substituer dans l'objectif** : $V(\mathbf{a})=f(\mathbf{x}(\mathbf{a}),\mathbf{a})$ |
| **3** | **Ne pas oublier que $\lambda$ dépend aussi de $\mathbf{a}$** |

### Méthode 2 — Appliquer le théorème de l'enveloppe

1. **Former le lagrangien** $\mathcal{L}=f(\mathbf{x},\mathbf{a})-\sum_j\lambda_j g^j(\mathbf{x},\mathbf{a})$.
2. **Dériver PARTIELLEMENT par rapport au PARAMÈTRE** — *« en traitant $\mathbf{x}$ et $\boldsymbol{\lambda}$ comme des constantes »*.
3. **Évaluer en $(\mathbf{x}(\mathbf{a}),\boldsymbol{\lambda}(\mathbf{a}))$.**
4. **C'est $\partial V/\partial a_j$** — **aucune réoptimisation nécessaire**.

### Méthode 3 — Vérifier l'enveloppe « à la main »

⚠️ **La méthode du livre dans l'exemple A2.11** :

| Voie | Ce qu'on fait |
|---|---|
| **Explicite** | Résoudre, former $V(a)$, **la dériver** |
| **Enveloppe** | **$\partial\mathcal{L}/\partial a$, puis substituer $\lambda(a)$** |

⟹ **Les deux doivent COÏNCIDER.**

### Méthode 4 — Interpréter les multiplicateurs

$$\boxed{\;\frac{\partial V(\mathbf{a})}{\partial a_j}=\lambda_j^* \qquad\textbf{quand } a_j \textbf{ est LA CONSTANTE DE CONTRAINTE}\;}$$

| Ce qu'on observe | Ce qu'on conclut |
|---|---|
| $\lambda_j^*$ **grand** | **La contrainte $j$ « coûte » cher** — la relâcher rapporterait beaucoup |
| $\lambda_j^*=0$ | **La contrainte est LÂCHE** — la relâcher n'apporte RIEN |
| $\lambda_j^*\geq0$ *(Kuhn-Tucker)* | **Relâcher ne peut JAMAIS NUIRE** |

### Méthode 5 — Séparer deux convexes

1. **Former $C=A-B$** — **convexe, et $\mathbf{0}\notin C$ SSI $A$ et $B$ sont disjoints**.
2. **Si $C$ est FERMÉ** ⟹ **appliquer directement le théorème A2.23**.
3. **Sinon** ⟹ **passer à l'ADHÉRENCE $\bar{C}$**, et traiter à part le cas $\mathbf{0}\in\bar{C}$ *(qui force $\mathbf{0}\in\partial\bar{C}$)*.
4. **Le vecteur séparateur** est **$\mathbf{p}=\hat{\mathbf{c}}/\lVert\hat{\mathbf{c}}\rVert$ où $\hat{\mathbf{c}}$ est le point de $C$ LE PLUS PROCHE DE L'ORIGINE.**

## Les exercices du livre (§A2.6) — ceux qui portent sur §A2.4-§A2.5

> ⚠️ **Le livre NE FOURNIT PAS de corrigé.** Les énoncés sont **ceux de Jehle & Reny** *(exercices A2.33 à A2.39)*. **Les pistes de résolution sont un ENRICHISSEMENT PÉDAGOGIQUE.**

<details class="details--riche">
<summary>

**A2.34 — relâcher une contrainte ne peut pas nuire**

</summary>

> *« Considérez le problème $\max_{x_1,x_2}f(x_1,x_2)$ s.c. $g(x_1,x_2)-a\leq0$. **IL EST ÉVIDENT qu'augmenter $a$ NE PEUT PAS RÉDUIRE la valeur maximisée de $f$ PARCE QUE L'ENSEMBLE RÉALISABLE AUGMENTE. Prouvez ceci D'UNE AUTRE FAÇON, en faisant appel aux théorèmes DE L'ENVELOPPE ET DE KUHN-TUCKER. (Cette seconde preuve n'est bien sûr PAS AUSSI BONNE que la première, à la fois parce qu'elle n'est PAS AUSSI SIMPLE** […] »*

> **Piste (hors cours).** **Le lagrangien** : $\ \mathcal{L}=f(x_1,x_2)-\lambda\big[g(x_1,x_2)-a\big]$ ⟹ $\ \dfrac{\partial\mathcal{L}}{\partial a}=+\lambda$. **Par l'ENVELOPPE** : $\ \dfrac{dV(a)}{da}=\lambda^*$. **Par KUHN-TUCKER** *(théorème A2.20)* : $\ \lambda^*\geq0$.
>
> $$\boxed{\;\Longrightarrow\ \frac{dV(a)}{da}=\lambda^*\geq0 \ : \ \textbf{augmenter } a \textbf{ NE PEUT PAS RÉDUIRE } V. \quad\;}$$
>
> **La remarque du livre est instructive** : *la preuve « évidente » (l'ensemble réalisable grandit) **est MEILLEURE** parce qu'**elle ne suppose ni différentiabilité, ni qualification des contraintes, ni unicité de la solution**.* L'intérêt de la seconde preuve est **de montrer que les deux outils sont COHÉRENTS** — et de **donner en prime L'AMPLEUR de l'effet, $\lambda^*$.*

</details>

<details class="details--riche">
<summary>

**A2.33 — le multiplicateur comme valeur marginale**

</summary>

> ⚠️ **Le corrigé complet est donné au concept 4.5 de cette fiche.** L'essentiel : avec $\mathcal{L}=f(\mathbf{x})-\sum_j\lambda_j[g^j(\mathbf{x})-a_j]$, on a $\partial\mathcal{L}/\partial a_j=\lambda_j$, et **l'enveloppe donne directement $\partial V/\partial a_j=\lambda_j^*$**.
>
> ⚠️ *« Ainsi, nous pouvons interpréter le $j$-ième multiplicateur comme **LA VALEUR MARGINALE DU RELÂCHEMENT DE LA $j$-IÈME CONTRAINTE** »*.

</details>

<details class="details--riche">
<summary>

**A2.35 et A2.36 — compléter les preuves**

</summary>

**A2.35** *« **Complétez la preuve du théorème A2.21.** »* — c'est-à-dire **la partie (iv)**. **A2.36** *« **Généralisez le théorème de l'enveloppe au cas de PLUSIEURS contraintes. Supposez que, LOCALEMENT (c'est-à-dire pour tout $\mathbf{a}\in U$), CERTAINES contraintes sont TOUJOURS SATURÉES et les autres TOUJOURS NON SATURÉES.** »*

> **Piste (hors cours).** **A2.35** : le livre indique lui-même la marche : *« **en définissant $\mathbf{x}^k=\mathbf{x}(\mathbf{a}^k)$, la preuve procède ALORS COMME celle de la partie (ii)** »* — on suppose par l'absurde que $\mathbf{x}(\mathbf{a}^k)\not\to\mathbf{x}(\mathbf{a}^*)$, on **extrait une sous-suite convergente par le théorème A1.8** *(les points sont dans le compact $S$)*, **la partie (iii) montre que sa limite EST une solution**, et **l'UNICITÉ force cette limite à être $\mathbf{x}(\mathbf{a}^*)$** — contradiction. **A2.36** : **L'hypothèse « certaines toujours saturées, les autres toujours non saturées » est ce qui rend la généralisation directe** : les contraintes **lâches ont $\lambda_j=0$** *(complémentarité)* et **disparaissent du lagrangien**, tandis que **les saturées se traitent comme dans la preuve à une contrainte** — il suffit de remplacer l'identité $g\equiv0$ par **les $K$ identités $g^j\equiv0$**, chacune fournissant sa propre substitution du terme de sommation.

</details>

<details class="details--riche">
<summary>

**A2.37 — pourquoi il faut qu'UN ensemble soit BORNÉ**

</summary>

> *« Supposons que $A$ et $B$ sont des sous-ensembles FERMÉS de $\mathbb{R}^n$ **et que $A$ est BORNÉ**. **(a)** Prouvez que **$A-B$ est FERMÉ**. **(b)** Soit $A$ le sous-ensemble de $\mathbb{R}^2$ **faiblement SOUS l'axe horizontal**, et $B$ le sous-ensemble **faiblement AU-DESSUS de l'hyperbole $y=1/x$ dans l'orthant positif. Montrez que $A$ et $B$ sont FERMÉS, MAIS QUE $A-B$ NE L'EST PAS.** »*

> **Piste (hors cours).** **(a)** Soit $\mathbf{a}^k-\mathbf{b}^k\to\mathbf{z}$. **$A$ étant BORNÉ et FERMÉ, il est COMPACT** ⟹ *(théorème A1.8)* **une sous-suite $\mathbf{a}^k\to\mathbf{a}\in A$**. Alors $\mathbf{b}^k=\mathbf{a}^k-(\mathbf{a}^k-\mathbf{b}^k)\to\mathbf{a}-\mathbf{z}$, et **$B$ étant FERMÉ**, $\mathbf{a}-\mathbf{z}\in B$ ⟹ $\mathbf{z}=\mathbf{a}-(\mathbf{a}-\mathbf{z})\in A-B$ **(b) LE CONTRE-EXEMPLE**, où **AUCUN des deux n'est borné** : les points $(k,\,0)\in A$ et $(k,\,1/k)\in B$ donnent $\ (k,0)-(k,1/k)=(0,\,-1/k)$, **qui tend vers $(0,0)$**. Or **$(0,0)\notin A-B$**, car cela exigerait $\mathbf{a}=\mathbf{b}$ — **impossible puisque $A$ et $B$ sont disjoints** *(l'hyperbole reste strictement au-dessus de l'axe)*. ⟹ **$A-B$ n'est PAS fermé** **La morale** : **c'est exactement la raison pour laquelle le théorème A2.24 exige, pour sa version STRICTE, qu'AU MOINS UN des deux ensembles soit BORNÉ.**

</details>

<details class="details--riche">
<summary>

**A2.38 et A2.39 — séparer un point de la FRONTIÈRE**

</summary>

> **A2.38** — *« Supposons que $A$ est **un convexe FERMÉ** et que $\mathbf{a}^*$ est **un élément de LA FRONTIÈRE de $A$**. **(a)** *« Utilisez la définition de la frontière pour montrer qu'**il existe une suite de points $\mathbf{a}^1,\mathbf{a}^2,\dots$ NON CONTENUS DANS $A$ et convergeant vers $\mathbf{a}^*$** »*. **(b)** *« Pour chaque $k$, **utilisez le THÉORÈME A2.23** pour établir l'existence d'un vecteur $\mathbf{p}^k$ de longueur un satisfaisant $\ \mathbf{p}^k\cdot\mathbf{a}\geq\mathbf{p}^k\cdot\mathbf{a}^k$ pour tout $\mathbf{a}\in A$. »* **(c)** *« **En considérant une SOUS-SUITE CONVERGENTE de $\{\mathbf{p}^k\}$**, concluez qu'il existe un vecteur $\hat{\mathbf{p}}$ »* […] **A2.39** — *« **Répétez l'exercice A2.38 SANS supposer que $A$ est FERMÉ.** Dans la partie (b), **utilisez le théorème A2.24 plutôt que le théorème A2.23.** »*

> **Piste (hors cours).** **(a)** **Par définition** *(fiche 521, §7.6)*, **tout point frontière a, dans CHAQUE $\varepsilon$-boule, des points de $A$ ET des points HORS de $A$** ⟹ en prenant $\varepsilon=1/k$, on récolte **une suite de points hors de $A$ convergeant vers $\mathbf{a}^*$**. **(b)** **Appliquer le théorème A2.23 à l'ensemble TRANSLATÉ $A-\mathbf{a}^k$** — il est **fermé, convexe, et ne contient pas $\mathbf{0}$** puisque $\mathbf{a}^k\notin A$. **(c)** **Les $\mathbf{p}^k$ sont de longueur un, donc BORNÉS** ⟹ *(théorème A1.8)* **une sous-suite converge vers $\hat{\mathbf{p}}$, de longueur un**, et **le passage à la limite conserve l'inégalité** ⟹ $\ \hat{\mathbf{p}}\cdot\mathbf{a}\geq\hat{\mathbf{p}}\cdot\mathbf{a}^*$ pour tout $\mathbf{a}\in A$. **C'est LE MÊME schéma de preuve que la première partie du théorème A2.24** — *séparer, extraire une sous-suite bornée, passer à la limite*. **La réponse à la question posée par le livre** : **OUI, un point de la FRONTIÈRE d'un convexe PEUT être séparé de l'ensemble** — mais **seulement au sens FAIBLE ($\geq$)**, sans marge $\alpha>0$. **C'est ce qu'on appelle un HYPERPLAN D'APPUI.**

</details>

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Confondre variables de choix et paramètres | **$\mathbf{x}$ est CHOISI · $\mathbf{a}$ est DONNÉ** | (A2.35) |
| 2 | Croire que $\mathbf{a}$ n'entre que dans la contrainte | *« qui peuvent entrer **DANS L'OBJECTIF, DANS LES CONTRAINTES, OU DANS LES DEUX** »* |  |
| 3 | Écrire $V$ comme une fonction de $\mathbf{x}$ | **$V$ est une fonction DES PARAMÈTRES SEULS** | $\mathbf{x}$ a été **optimisé** |
| 4 | Croire la continuité de $f$ suffisante | *« nous n'avons **PAS SEULEMENT** besoin que $f$ soit continue »* | Il faut la **déf. A2.3** |
| 5 | Oublier l'une des deux façons d'échouer | **CONTRACTION et EXPANSION dramatiques** | La continuité des $g^j$ n'écarte que **l'expansion** |
| 6 | Mal énoncer la définition A2.3 | **Il faut pouvoir SUIVRE le point réalisable par une SUITE $\mathbf{x}^k\to\mathbf{x}^0$** |  |
| 7 | Oublier l'hypothèse de non-vacuité | *« pour tout $\mathbf{a}$, **il existe AU MOINS UN $\mathbf{x}$** »* | Sinon **rien à maximiser** |
| 8 | Croire A2.21(i) évident | **Il faut WEIERSTRASS** *(thm A1.10)*, donc **la COMPACITÉ** |  |
| 9 | Oublier que (ii) découle de (iii) | **La preuve de (ii) INVOQUE la partie (iii)** | Ordre : (i), (iii), (ii), (iv) |
| 10 | Croire (iv) vraie sans unicité | *« **si pour tout $\mathbf{a}$ la solution est UNIQUE** »* | Sinon c'est **une correspondance** |
| 11 | Oublier les outils de la fiche 521 | **A1.8 (sous-suite) · A1.9 (séquentiel) · A1.10 (Weierstrass)** | Les trois servent |
| 12 | Réoptimiser pour dériver $V$ | ***C'est exactement ce que l'enveloppe DISPENSE de faire*** |  |
| 13 | Dériver $f$ au lieu de $\mathcal{L}$ | **C'est LA PARTIELLE DU LAGRANGIEN** | Thm A2.22 |
| 14 | Oublier d'évaluer à la solution | *« **ÉVALUÉE AU POINT $(\mathbf{x}(\mathbf{a}),\lambda(\mathbf{a}))$** »* | Sans quoi le résultat est faux |
| 15 | Dériver totalement le lagrangien | **C'est UNE PARTIELLE — $\mathbf{x}$ et $\lambda$ sont traités comme CONSTANTS** |  |
| 16 | Oublier l'hypothèse de saturation | **Le théorème A2.22 exige la contrainte SATURÉE pour tout $\mathbf{a}\in U$** |  |
| 17 | Oublier l'hypothèse d'unicité | **$\mathbf{x}(\mathbf{a})$ doit résoudre DE MANIÈRE UNIQUE et être différentiable** |  |
| 18 | Croire le théorème limité à une contrainte | *« **il s'applique QUEL QUE SOIT le nombre de contraintes**, avec la réserve habituelle »* | $m<n$ |
| 19 | Rater la règle de composition au pas 2 | *« **$a_j$ affecte $f$ DIRECTEMENT ET INDIRECTEMENT par CHAQUE $x_i(\mathbf{a})$** »* |  |
| 20 | Ne pas voir le rôle du pas 4 | **C'est la différentiation de l'IDENTITÉ $g\equiv0$ qui ABSORBE tout le terme de réoptimisation** | Le « truc » final |
| 21 | Oublier que la dérivée de zéro est zéro | **C'est ce qui donne l'identité du pas 4** |  |
| 22 | Se tromper de signe en substituant | *« **en RENTRANT LE SIGNE MOINS dans les crochets** »* | (P.3) ⟹ (P.4) |
| 23 | Croire l'enveloppe réservée aux maxima | *« nous pourrions **aussi construire des fonctions valeur pour les problèmes de MINIMISATION**, et le théorème **s'appliquerait AUSSI** »* |  |
| 24 | Croire $\lambda$ toujours « incident » | **L'enveloppe lui donne son sens : LA VALEUR MARGINALE** | Exemple A2.11 |
| 25 | Se tromper de signe de $\partial\mathcal{L}/\partial a$ | Avec $\mathcal{L}=f-\lambda[g-a]$, on a $\partial\mathcal{L}/\partial a=\boldsymbol{+}\lambda$ |  |
| 26 | Croire que $\partial V/\partial a_j=\lambda_j$ toujours | **Seulement quand $a_j$ est LA CONSTANTE DE CONTRAINTE** *(exercice A2.33)* |  |
| 27 | Oublier que $\lambda_j^*\geq0$ | **Par Kuhn-Tucker** ⟹ **relâcher NE PEUT PAS nuire** | Exercice A2.34 |
| 28 | Croire la 2ᵉ preuve d'A2.34 meilleure | *« **elle n'est PAS AUSSI BONNE** »* — la première ne suppose **ni différentiabilité ni qualification** |  |
| 29 | Écrire la séparation avec un seul sens | **$\mathbf{p}\cdot\mathbf{a}>I$ POUR $A$ ET $\mathbf{p}\cdot\mathbf{b}<I$ POUR $B$** |  |
| 30 | Oublier la normalisation de $\mathbf{p}$ | **Les deux théorèmes exigent $\lVert\mathbf{p}\rVert=1$** |  |
| 31 | Croire $C$ borné dans A2.23 | *« **MAIS $C$ N'A PAS BESOIN D'ÊTRE BORNÉ** »* — d'où la troncature $C'$ |  |
| 32 | Oublier de vérifier que $\hat{\mathbf{c}}$ résout aussi (P.1) | **Sinon la troncature aurait changé le problème** |  |
| 33 | Rater le rôle du théorème A2.19 dans A2.23 | **C'est la condition de MINIMUM en $\alpha=0$ sous $\alpha\geq0$ : la dérivée doit être $\geq0$** |  |
| 34 | Oublier pourquoi $\hat{\mathbf{c}}\neq\mathbf{0}$ | **Parce que $\hat{\mathbf{c}}\in C$ et $\mathbf{0}\notin C$** |  |
| 35 | Croire A2.23 et A2.24 équivalents | *« **le SECOND GÉNÉRALISE STRICTEMENT le premier** »* et permet **des ensembles OUVERTS et « TANGENTS »** |  |
| 36 | Oublier de passer à $C=A-B$ | **C'est l'astuce de toute la preuve d'A2.24** |  |
| 37 | Croire $A-B$ toujours fermé | **NON — il faut qu'UN des deux soit BORNÉ** | Exercice A2.37(b) |
| 38 | Confondre $C$ et son adhérence $\bar{C}$ | **$\bar{C}$ contient $C$ ; $\bar{C}$ est FERMÉ, pas $C$** |  |
| 39 | Croire $\mathbf{0}\in\bar{C}$ impossible | **C'est précisément le cas TANGENT** — on montre alors $\mathbf{0}\in\partial\bar{C}$ |  |
| 40 | Rater le pas 8 de la preuve | **$\hat{\mathbf{p}}\cdot\mathbf{e}_i\geq0$ ET $\hat{\mathbf{p}}\cdot(-\mathbf{1})\geq0$ FORCENT $\hat{\mathbf{p}}=\mathbf{0}$** | Contradiction avec $\lVert\hat{\mathbf{p}}\rVert=1$ |

## 📌 Ultimate Review

**§A2.4 — LE PROBLÈME PARAMÉTRÉ.**

$$\max_{\mathbf{x}}\ f(\mathbf{x},\mathbf{a})\quad\text{s.c.}\quad g^j(\mathbf{x},\mathbf{a})\leq0 \tag{A2.35} \qquad\qquad V(\mathbf{a})=\max_{\mathbf{x}}\ f(\mathbf{x},\mathbf{a})\ \text{ s.c. } \dots$$

⚠️ **$\mathbf{a}$ peut entrer *« DANS L'OBJECTIF, DANS LES CONTRAINTES, OU DANS LES DEUX »*.**

**DÉF. A2.3 — LA CONTINUITÉ DES CONTRAINTES.** *« Il y a **DEUX FAÇONS dont ceci peut échouer : l'ensemble réalisable pourrait SE CONTRACTER OU S'ÉTENDRE DRAMATIQUEMENT** »* — **la continuité des $g^j$ écarte les EXPANSIONS**, **la définition A2.3 écarte les CONTRACTIONS** *(elle exige de pouvoir SUIVRE un point réalisable par une suite)*.

**THÉORÈME A2.21 — LE THÉORÈME DU MAXIMUM** *($S$ compact, $f$ continue, continuité des contraintes)* :

| # | La conclusion |
|---|---|
| **(i)** | **Une solution EXISTE pour tout $\mathbf{a}$** *(par WEIERSTRASS)* |
| **(ii)** | **$V$ est CONTINUE** |
| **(iii)** | **La limite de solutions EST une solution** |
| **(iv)** | **Si la solution est UNIQUE, $\mathbf{x}(\mathbf{a})$ est CONTINUE** |

*(La preuve enchaîne **A1.10** *(existence)*, **A1.8** *(sous-suite convergente)* et **A1.9** *(caractérisation séquentielle)* — les trois outils de la [fiche 521](521-jehle-ensembles-applications.md).)*

**THÉORÈME A2.22 — L'ENVELOPPE :**

$$\boxed{\;\frac{\partial V(\mathbf{a})}{\partial a_j}=\left.\frac{\partial\mathcal{L}}{\partial a_j}\right|_{\mathbf{x}(\mathbf{a}),\,\lambda(\mathbf{a})}\;}$$

⚠️ *« **L'EFFET TOTAL sur la valeur optimisée quand un paramètre change (et donc, PRÉSUMABLEMENT, TOUT LE PROBLÈME DOIT ÊTRE RÉOPTIMISÉ) peut se déduire SIMPLEMENT en prenant LA PARTIELLE DU LAGRANGIEN.** »*

**Les quatre pas de la preuve** :

| Pas | Ce qu'on fait |
|---|---|
| **1** | Écrire ce qu'il faut atteindre : **(P.2)** |
| **2** | **Dériver $V$ DIRECTEMENT — avec LA RÈGLE DE COMPOSITION** |
| **3** | **Substituer les CPO** $f_i=\lambda g_i$ ⟹ **(P.3)** |
| **4** | **LE « TRUC » : différentier l'IDENTITÉ $g(\mathbf{x}(\mathbf{a}),\mathbf{a})\equiv0$** ⟹ **(P.4) $=$ (P.2)** |

⚠️ **Le miracle** : **tout le terme de RÉOPTIMISATION est absorbé par la CONTRAINTE.**

**EXEMPLE A2.11** : $\max x_1x_2$ s.c. $2x_1+4x_2=a$ ⟹ $x_1=\tfrac a4$, $x_2=\tfrac a8$, $\lambda=\tfrac{a}{16}$, $V(a)=\tfrac{a^2}{32}$ ⟹ **$V'(a)=\tfrac{a}{16}=\lambda(a)=\partial\mathcal{L}/\partial a$**

⚠️ **LE MULTIPLICATEUR ENFIN INTERPRÉTÉ** *(exercice A2.33)* :

$$\boxed{\;\frac{\partial V(\mathbf{a})}{\partial a_j}=\lambda_j^* \ : \ \textbf{« LA VALEUR MARGINALE DU RELÂCHEMENT de la $j$-ième contrainte »}\;}$$

**§A2.5 — LA SÉPARATION.**

⚠️ *« Deux convexes disjoints — **IL EST ÉVIDENT QUE NOUS POUVONS TRACER UNE DROITE ENTRE EUX** »* : $\ \mathbf{p}\cdot\mathbf{a}>I>\mathbf{p}\cdot\mathbf{b}$, soit **$\mathbf{p}\cdot\mathbf{a}>\mathbf{p}\cdot\mathbf{b}$** — et *« dans $\mathbb{R}^3$, **cette fois PAR UN PLAN**, et **UNE EXPRESSION ANALYTIQUE IDENTIQUE** »*.

**THÉORÈME A2.23** : **$C$ fermé, convexe, $\mathbf{0}\notin C$** ⟹ il existe $\mathbf{p}$ **de longueur un** et $\alpha>0$ avec $\mathbf{p}\cdot\mathbf{c}\geq\alpha$.

*La preuve* : **prendre le POINT DE $C$ LE PLUS PROCHE DE L'ORIGINE** *(en TRONQUANT $C$ en un compact $C'$)*, puis **appliquer le THÉORÈME A2.19 à la fonction quadratique de $\alpha$** ⟹ $\hat{\mathbf{c}}\cdot\mathbf{c}\geq\lVert\hat{\mathbf{c}}\rVert^2>0$ ⟹ **poser $\mathbf{p}=\hat{\mathbf{c}}/\lVert\hat{\mathbf{c}}\rVert$ et $\alpha=\lVert\hat{\mathbf{c}}\rVert$**.

**THÉORÈME A2.24** : **$A$, $B$ convexes DISJOINTS** ⟹ $\mathbf{p}\cdot\mathbf{a}\geq\mathbf{p}\cdot\mathbf{b}$ ; **et si en plus FERMÉS avec l'un BORNÉ**, $\ \mathbf{p}\cdot(\mathbf{a}-\mathbf{b})\geq\alpha>0$.

*La preuve* : **poser $C=A-B$** *(convexe, sans l'origine)* ; **si $C$ est fermé, A2.23 suffit** ; **sinon, passer à l'ADHÉRENCE $\bar{C}$** et, dans le cas $\mathbf{0}\in\bar{C}$, **montrer que $\mathbf{0}\in\partial\bar{C}$ par l'absurde** *(la boule $B_\varepsilon(\mathbf{0})\subset\bar{C}$ fournirait $\delta\mathbf{e}_i$ et $-\delta\mathbf{1}$, d'où $\hat{\mathbf{p}}=\mathbf{0}$, contredisant $\lVert\hat{\mathbf{p}}\rVert=1$)*.

⚠️ **OÙ SERVENT-ILS ?** **Le théorème A2.24 est L'OUTIL CENTRAL de la preuve de KUHN-TUCKER** — il sépare $\nabla f(\mathbf{x}^*)$ du cône $B$.

> *« **Les deux théorèmes de séparation présentés ici SUFFISENT POUR LA PLUPART DES USAGES.** […] **UN POINT SUR LA FRONTIÈRE D'UN CONVEXE PEUT-IL ÊTRE SÉPARÉ DE L'ENSEMBLE ? L'exercice A2.39 explore cette question.** »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Écrire le problème paramétré et la fonction valeur.**

</summary>

$$\max_{\mathbf{x}\in\mathbb{R}^n}\ f(\mathbf{x},\mathbf{a})\qquad\text{s.c.}\qquad g^j(\mathbf{x},\mathbf{a})\leq0,\quad j=1,\dots,m \tag{A2.35}$$

> *« $\mathbf{a}=(a_1,\dots,a_l)$ est **un vecteur de PARAMÈTRES QUI PEUVENT ENTRER DANS LA FONCTION OBJECTIF, DANS LES CONTRAINTES, OU DANS LES DEUX** »*.

$$V(\mathbf{a})=\max_{\mathbf{x}}\ f(\mathbf{x},\mathbf{a})\quad\text{s.c.}\quad g^j(\mathbf{x},\mathbf{a})\leq0$$

⚠️ *« **LA VALEUR MAXIMISÉE de la fonction objectif est $f(\mathbf{x}(\mathbf{a}),\mathbf{a})$. CECI DÉFINIT UNE NOUVELLE FONCTION, APPELÉE LA FONCTION VALEUR.** »*

</details>

<details class="details--riche">
<summary>

**2. Les deux façons dont la continuité peut échouer.**

</summary>

> *« Nous n'avons **PAS SEULEMENT besoin que $f$ soit continue**, il faut aussi que **de petits changements de $\mathbf{a}$ n'aient qu'un PETIT EFFET sur l'ensemble des valeurs réalisables.** »*

> ⚠️ *« **IL Y A ESSENTIELLEMENT DEUX FAÇONS DONT CECI PEUT ÉCHOUER : l'ensemble réalisable pourrait SE CONTRACTER OU S'ÉTENDRE DRAMATIQUEMENT.** »*

| Le danger | Ce qui l'écarte |
|---|---|
| **EXPANSION** | **La CONTINUITÉ des $g^j$** |
| **CONTRACTION** | **La DÉFINITION A2.3** — *« exige UNE CONDITION SUPPLÉMENTAIRE »* |

</details>

<details class="details--riche">
<summary>

**3. Énoncer la définition A2.3.**

</summary>

**Chaque $g^j$ est CONTINUE**, et **pour tout $(\mathbf{x}^0,\mathbf{a}^0)$ satisfaisant les contraintes** et **toute suite $\mathbf{a}^k\to\mathbf{a}^0$**, **il existe une suite $\mathbf{x}^k\to\mathbf{x}^0$ telle que $(\mathbf{x}^k,\mathbf{a}^k)$ satisfasse les contraintes POUR TOUT $k$**.

> *(Note 7.)* *« **Cette définition est ÉQUIVALENTE aux notions de SEMI-CONTINUITÉ SUPÉRIEURE ET INFÉRIEURE dans la théorie des CORRESPONDANCES.** »*

⚠️ **En clair** : *on peut SUIVRE continûment un point réalisable quand le paramètre bouge.*

</details>

<details class="details--riche">
<summary>

**4. Énoncer le théorème A2.21.**

</summary>

**Hypothèses** : $S$ **COMPACT**, $f$ **CONTINUE**, **continuité des contraintes**.

**(i)** **une solution EXISTE pour tout $\mathbf{a}$**, donc $V$ est **définie sur tout $A$** · **(ii)** **$V$ est CONTINUE** · **(iii)** **la limite de solutions EST une solution** · **(iv)** **si la solution est UNIQUE, $\mathbf{x}(\mathbf{a})$ est CONTINUE**.

</details>

<details class="details--riche">
<summary>

**5. Démontrer la partie (i).**

</summary>

> *« La partie (i) **découle IMMÉDIATEMENT du théorème A1.10** parce que **la COMPACITÉ de $S$ et la CONTINUITÉ de chaque $g^j$ impliquent que, pour tout $\mathbf{a}$, l'ensemble des $\mathbf{x}$ satisfaisant les contraintes EST COMPACT**, et parce que **nous avons supposé TOUT DU LONG qu'il est NON VIDE**. »*

⚠️ **C'est WEIERSTRASS.**

</details>

<details class="details--riche">
<summary>

**6. Démontrer la partie (iii).**

</summary>

**Par l'absurde** : si $\mathbf{x}^*$ n'était pas solution en $\mathbf{a}^*$, il existerait $\hat{\mathbf{x}}$ réalisable avec $f(\hat{\mathbf{x}},\mathbf{a}^*)>f(\mathbf{x}^*,\mathbf{a}^*)$.

| Pas | L'argument |
|---|---|
| **1** | **LA CONTINUITÉ DES CONTRAINTES appliquée à $(\hat{\mathbf{x}},\mathbf{a}^*)$** fournit **une suite $\hat{\mathbf{x}}^k\to\hat{\mathbf{x}}$ RÉALISABLE pour chaque $\mathbf{a}^k$** |
| **2** | **La continuité de $f$** *(théorème A1.9)* donne $f(\hat{\mathbf{x}}^k,\mathbf{a}^k)\to f(\hat{\mathbf{x}},\mathbf{a}^*)$ et $f(\mathbf{x}^k,\mathbf{a}^k)\to f(\mathbf{x}^*,\mathbf{a}^*)$ |
| **3** | ⟹ $f(\hat{\mathbf{x}}^k,\mathbf{a}^k)>f(\mathbf{x}^k,\mathbf{a}^k)$ pour $k$ grand — **CONTREDIT que $\mathbf{x}^k$ est une solution** |

</details>

<details class="details--riche">
<summary>

**7. Démontrer la partie (ii).**

</summary>

**Par l'absurde**, sur un sous-ensemble infini $I'$, $V(\mathbf{a}^k)$ reste **à plus de $\varepsilon$ de $V(\mathbf{a}^*)$**.

| Pas | L'outil |
|---|---|
| **1** | Prendre $\mathbf{x}^k$ solution, $V(\mathbf{a}^k)=f(\mathbf{x}^k,\mathbf{a}^k)$ |
| **2** | **$(\mathbf{x}^k,\mathbf{a}^k)\in S$ COMPACT** ⟹ **THÉORÈME A1.8** ⟹ **une SOUS-SUITE CONVERGENTE** vers $(\hat{\mathbf{x}},\mathbf{a}^*)$ |
| **3** | **Continuité de $f$** ⟹ $V(\mathbf{a}^k)\to f(\hat{\mathbf{x}},\mathbf{a}^*)$ |
| **4** | **PARTIE (iii)** ⟹ $\hat{\mathbf{x}}$ **est une solution** ⟹ $V(\mathbf{a}^*)=f(\hat{\mathbf{x}},\mathbf{a}^*)$ |
| **5** | ⟹ **contradiction** |

</details>

<details class="details--riche">
<summary>

**8. Énoncer le théorème A2.22 de l'enveloppe.**

</summary>

**Sous** : une seule contrainte, $f$ et $g$ **continûment différentiables**, $\mathbf{x}(\mathbf{a})$ **résout de manière UNIQUE**, **continûment différentiable**, **la contrainte SATURÉE pour tout $\mathbf{a}\in U$** :

$$\frac{\partial V(\mathbf{a})}{\partial a_j}=\left.\frac{\partial\mathcal{L}}{\partial a_j}\right|_{\mathbf{x}(\mathbf{a}),\,\lambda(\mathbf{a})}$$

⚠️ *« **le théorème s'applique QUEL QUE SOIT le nombre de contraintes, avec la réserve habituelle qu'il y ait MOINS DE CONTRAINTES QUE DE VARIABLES DE CHOIX** »*.

</details>

<details class="details--riche">
<summary>

**9. Que dit le théorème, en clair ?**

</summary>

> *« **L'EFFET TOTAL sur la valeur optimisée de la fonction objectif quand un paramètre change (ET DONC, PRÉSUMABLEMENT, TOUT LE PROBLÈME DOIT ÊTRE RÉOPTIMISÉ) peut se déduire SIMPLEMENT en prenant LA PARTIELLE DU LAGRANGIEN par rapport au paramètre, puis en ÉVALUANT cette dérivée À LA SOLUTION des conditions du premier ordre.** »*

> ⚠️ *« En raison de **L'IMPORTANCE de ce théorème, ET PARCE QU'IL N'EST PAS SI ÉVIDEMMENT VRAI**, nous travaillerons une preuve **PLUTÔT ÉTENDUE**. »*

</details>

<details class="details--riche">
<summary>

**10. Dérouler les quatre pas de la preuve.**

</summary>

**Pas 1** — les CPO **(P.1)** et l'objectif **(P.2)** : $\ \partial\mathcal{L}/\partial a_j=\partial f/\partial a_j-\lambda\,\partial g/\partial a_j$.

**Pas 2** — dériver $V$ **directement**, **avec la RÈGLE DE COMPOSITION** :

$$\frac{\partial V}{\partial a_j}=\sum_i\frac{\partial f}{\partial x_i}\frac{\partial x_i(\mathbf{a})}{\partial a_j}+\frac{\partial f}{\partial a_j}$$

**Pas 3** — substituer $\ \partial f/\partial x_i\equiv\lambda\,\partial g/\partial x_i$ ⟹ **(P.3)**.

**Pas 4** — **LE « TRUC »** : différentier $g(\mathbf{x}(\mathbf{a}),\mathbf{a})\equiv0$ ⟹

$$\frac{\partial g}{\partial a_j}\equiv-\sum_i\frac{\partial g}{\partial x_i}\frac{\partial x_i(\mathbf{a})}{\partial a_j}$$

**et substituer À TOUT LE TERME DE SOMMATION** ⟹ **(P.4) $=$ (P.2)**

</details>

<details class="details--riche">
<summary>

**11. Refaire l'exemple A2.11.**

</summary>

$\max x_1x_2$ s.c. $2x_1+4x_2-a=0$.

$\mathcal{L}=x_1x_2-\lambda(2x_1+4x_2-a)$ ⟹ $x_2=2\lambda$, $x_1=4\lambda$, $2x_1+4x_2=a$ ⟹ $16\lambda=a$

$$x_1(a)=\frac a4,\quad x_2(a)=\frac a8,\quad \lambda(a)=\frac{a}{16},\quad V(a)=\frac{a^2}{32},\quad V'(a)=\frac{a}{16}$$

**Par l'enveloppe** : $\ \dfrac{dV}{da}=\dfrac{\partial\mathcal{L}}{\partial a}=\lambda=\dfrac{a}{16}$ — *« **ce qui COLLE** »*

⚠️ *« Cet exemple nous a **AUSSI DONNÉ UN APERÇU de l'interprétation de ces variables « INCIDENTES », LES MULTIPLICATEURS** »*.

</details>

<details class="details--riche">
<summary>

**12. Interpréter le multiplicateur (exercice A2.33).**

</summary>

Avec des contraintes $g^j(\mathbf{x})-a_j=0$ — *« **$a_j$ est appelée LA CONSTANTE DE CONTRAINTE** »* — on a $\ \partial\mathcal{L}/\partial a_j=+\lambda_j$, donc **par l'enveloppe** :

$$\boxed{\;\frac{\partial V(\mathbf{a})}{\partial a_j}=\lambda_j^*\;}$$

> ⚠️ *« Ainsi, nous pouvons interpréter le $j$-ième multiplicateur comme **LA VALEUR MARGINALE DU RELÂCHEMENT de la $j$-ième contrainte** »*.

⚠️ **Avec des contraintes d'INÉGALITÉ**, cela vaut pour les contraintes **SATURÉES** ; pour les **lâches**, **la complémentarité donne $\lambda_j^*=0$** — et **relâcher n'apporte rien**.

</details>

<details class="details--riche">
<summary>

**13. Prouver que relâcher une contrainte ne peut nuire (exercice A2.34).**

</summary>

Avec $\mathcal{L}=f-\lambda[g-a]$ : $\ \partial\mathcal{L}/\partial a=+\lambda$ ⟹ **par l'ENVELOPPE** $\ dV/da=\lambda^*$, et **par KUHN-TUCKER** $\ \lambda^*\geq0$ ⟹ $\ dV/da\geq0$

⚠️ **Le livre note que cette preuve *« n'est bien sûr PAS AUSSI BONNE que la première »*** *(« l'ensemble réalisable augmente »)* — celle-ci ne suppose **ni différentiabilité, ni qualification des contraintes**.

</details>

<details class="details--riche">
<summary>

**14. Exposer l'idée de la séparation.**

</summary>

> *« Deux convexes DISJOINTS dans $\mathbb{R}^2$ : **IL EST ÉVIDENT QUE NOUS POUVONS TRACER UNE DROITE ENTRE EUX.** »* Avec $p_1x_1+p_2x_2=I$ :

$$\mathbf{a}\in A:\ \mathbf{p}\cdot\mathbf{a}>I \qquad\qquad \mathbf{b}\in B:\ \mathbf{p}\cdot\mathbf{b}<I \qquad\Longrightarrow\qquad \mathbf{p}\cdot\mathbf{a}>\mathbf{p}\cdot\mathbf{b}$$

⚠️ *« Dans $\mathbb{R}^3$ — **une SPHÈRE et une BOÎTE** — **cette fois PAR UN PLAN**, et **UNE EXPRESSION ANALYTIQUE IDENTIQUE** »*.

⚠️ *« **Le SECOND théorème GÉNÉRALISE STRICTEMENT le premier** et permet aux ensembles d'être **OUVERTS et « TANGENTS »** »*.

</details>

<details class="details--riche">
<summary>

**15. Énoncer et démontrer le théorème A2.23.**

</summary>

**$C$ fermé, convexe, $\mathbf{0}\notin C$** ⟹ **il existe $\mathbf{p}$ de longueur un et $\alpha>0$ avec $\mathbf{p}\cdot\mathbf{c}\geq\alpha$.**

| Étape | L'argument |
|---|---|
| **1** | **Minimiser $\lVert\mathbf{c}\rVert$ sur $C$** — mais *« **$C$ N'A PAS BESOIN D'ÊTRE BORNÉ** »* ⟹ **TRONQUER** en $C'=\{\mathbf{c}\in C:\lVert\mathbf{c}\rVert\leq\lVert\mathbf{c}^0\rVert\}$, **compact** |
| **2** | La solution $\hat{\mathbf{c}}$ de (P.2) **résout aussi (P.1)** |
| **3** | **La convexité** : $\lVert\alpha\mathbf{c}+(1-\alpha)\hat{\mathbf{c}}\rVert^2$ est **minimisée en $\alpha=0$** ⟹ **par le THÉORÈME A2.19, sa dérivée en $0$ est $\geq0$** |
| **4** | ⟹ $\ \hat{\mathbf{c}}\cdot\mathbf{c}\geq\lVert\hat{\mathbf{c}}\rVert^2>0$ *(car $\hat{\mathbf{c}}\neq\mathbf{0}$)* |
| **5** | **Poser $\mathbf{p}=\hat{\mathbf{c}}/\lVert\hat{\mathbf{c}}\rVert$ et $\alpha=\lVert\hat{\mathbf{c}}\rVert$** |

⚠️ **Le séparateur est LA DIRECTION DU POINT DE $C$ LE PLUS PROCHE DE L'ORIGINE.**

</details>

<details class="details--riche">
<summary>

**16. Énoncer le théorème A2.24.**

</summary>

**$A$, $B$ convexes DISJOINTS** ⟹ **il existe $\mathbf{p}$ de longueur un** avec $\ \mathbf{p}\cdot\mathbf{a}\geq\mathbf{p}\cdot\mathbf{b}$.

⚠️ **Si de plus FERMÉS avec AU MOINS UN BORNÉ** : $\ \mathbf{p}\cdot(\mathbf{a}-\mathbf{b})\geq\alpha$ **pour un $\alpha>0$**.

</details>

<details class="details--riche">
<summary>

**17. Démontrer la seconde partie du théorème A2.24.**

</summary>

**Poser $C=A-B$**, *« l'ensemble de tous les points de la forme $\mathbf{a}-\mathbf{b}$ »*.

| La propriété | La justification |
|---|---|
| **CONVEXE** | *« il n'est pas difficile d'argumenter **(ESSAYEZ !)** »* |
| **FERMÉ** | *« **avec un peu plus d'effort** »* *(exercice A2.37 — **il faut qu'un des deux soit BORNÉ**)* |
| **$\mathbf{0}\notin C$** | **parce que $A$ et $B$ sont DISJOINTS** |

⟹ **le théorème A2.23 s'applique** ⟹ $\ \mathbf{p}\cdot(\mathbf{a}-\mathbf{b})\geq\alpha$

⚠️ **L'astuce** : **séparer DEUX ensembles $=$ séparer LEUR DIFFÉRENCE DE L'ORIGINE.**

</details>

<details class="details--riche">
<summary>

**18. Démontrer la première partie du théorème A2.24.**

</summary>

**$C=A-B$ reste convexe et sans l'origine, MAIS PLUS FORCÉMENT FERMÉ** ⟹ **passer à $\bar{C}$**, *« l'ensemble de toutes les LIMITES de suites convergentes de points de $C$ »* — **fermé, convexe, et contenant $C$** *(« tout point $\mathbf{c}$ est la limite de la suite CONSTANTE »)*.

| Le cas | L'argument |
|---|---|
| **$\mathbf{0}\notin\bar{C}$** | **A2.23 s'applique — FINI** |
| **$\mathbf{0}\in\bar{C}$** | **Il suffit de montrer $\mathbf{0}\in\partial\bar{C}$** *(exercice A2.38)* |

**La contradiction** : si $\mathbf{0}\notin\partial\bar{C}$, alors **$B_\varepsilon(\mathbf{0})\subset\bar{C}$**, d'où des suites de $C$ tendant vers **$\delta\mathbf{e}_i$ et $-\delta\mathbf{1}$** ; **les combinaisons convexes $C_k\subset C$ ne contiennent pas $\mathbf{0}$** ⟹ **A2.23 donne $\mathbf{p}^k$** ; **A1.8 extrait $\hat{\mathbf{p}}$ de longueur un** ; **$\hat{\mathbf{p}}\cdot\mathbf{e}_i\geq0$ ET $\hat{\mathbf{p}}\cdot(-\mathbf{1})\geq0$ FORCENT $\hat{\mathbf{p}}=\mathbf{0}$** — **contradiction**

</details>

<details class="details--riche">
<summary>

**19. Où servent les théorèmes de séparation ?**

</summary>

⚠️ **LE THÉORÈME A2.24 EST L'OUTIL CENTRAL DE LA PREUVE DE KUHN-TUCKER** *([fiche 526](526-jehle-kuhn-tucker-inegalites.md))* — c'est lui qui **sépare $\nabla f(\mathbf{x}^*)$ du cône $B$** et produit ainsi le vecteur $\mathbf{p}$ de la contradiction.

> *« **Les deux théorèmes présentés ici SUFFISENT POUR LA PLUPART DES USAGES.** […] **UN POINT SUR LA FRONTIÈRE D'UN CONVEXE PEUT-IL ÊTRE SÉPARÉ DE L'ENSEMBLE ? L'exercice A2.39 explore cette question.** »*

⚠️ **La réponse** *(enrichissement)* : **OUI, mais SEULEMENT AU SENS FAIBLE ($\geq$), sans marge** — c'est **un HYPERPLAN D'APPUI**.

</details>

<details class="details--riche">
<summary>

**20. Pourquoi $A-B$ n'est pas toujours fermé (exercice A2.37(b)).**

</summary>

Prendre $A$ = **le demi-plan faiblement SOUS l'axe horizontal** et $B$ = **la région faiblement AU-DESSUS de $y=1/x$ dans l'orthant positif** — **tous deux FERMÉS, mais AUCUN BORNÉ**.

⚠️ **Les points $(k,0)\in A$ et $(k,1/k)\in B$ donnent $\ (0,-1/k)\to(0,0)$**, **alors que $(0,0)\notin A-B$** *(cela exigerait $\mathbf{a}=\mathbf{b}$, impossible car $A\cap B=\varnothing$)*.

⚠️ **C'est EXACTEMENT pourquoi le théorème A2.24 exige, pour sa version STRICTE, qu'AU MOINS UN des deux soit BORNÉ.**

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le problème (A2.35) ? | $\max_{\mathbf{x}}f(\mathbf{x},\mathbf{a})$ s.c. $g^j(\mathbf{x},\mathbf{a})\leq0$ |
| Où peut entrer $\mathbf{a}$ ? | **Objectif, contraintes, OU LES DEUX** |
| La fonction valeur ? | **$V(\mathbf{a})=f(\mathbf{x}(\mathbf{a}),\mathbf{a})$** — fonction **des PARAMÈTRES seuls** |
| Les deux questions du livre ? | **Les SOLUTIONS et la VALEUR varient-elles CONTINÛMENT ?** |
| Les deux façons d'échouer ? | **CONTRACTION ou EXPANSION dramatiques** |
| Ce qui écarte l'expansion ? | **La continuité des $g^j$** |
| Ce qui écarte la contraction ? | **La DÉFINITION A2.3** |
| Définition A2.3 ? | **Toute suite $\mathbf{a}^k\to\mathbf{a}^0$ admet une suite RÉALISABLE $\mathbf{x}^k\to\mathbf{x}^0$** |
| Son équivalent en théorie des correspondances ? | **SEMI-CONTINUITÉ supérieure et inférieure** |
| Théorème A2.21, hypothèses ? | **$S$ COMPACT · $f$ CONTINUE · continuité des CONTRAINTES** |
| Sa partie (i) ? | **Une solution EXISTE pour tout $\mathbf{a}$** |
| Sa partie (ii) ? | **$V$ est CONTINUE** |
| Sa partie (iii) ? | **La limite de solutions EST une solution** |
| Sa partie (iv) ? | **Si UNIQUE, $\mathbf{x}(\mathbf{a})$ est CONTINUE** |
| L'outil de (i) ? | **WEIERSTRASS (A1.10)** |
| L'outil de (ii) ? | **A1.8 (sous-suite) $+$ la partie (iii)** |
| L'ordre de la preuve ? | **(i), (iii), (ii), (iv)** |
| Le théorème de l'enveloppe ? | $\dfrac{\partial V}{\partial a_j}=\left.\dfrac{\partial\mathcal{L}}{\partial a_j}\right\|_{\mathbf{x}(\mathbf{a}),\lambda(\mathbf{a})}$ |
| Ce qu'il dispense de faire ? | **RÉOPTIMISER tout le problème** |
| Dérive-t-on $f$ ou $\mathcal{L}$ ? | **LE LAGRANGIEN** |
| Où évalue-t-on ? | **À LA SOLUTION $(\mathbf{x}(\mathbf{a}),\lambda(\mathbf{a}))$** |
| Ses hypothèses ? | **Solution UNIQUE, différentiable, contrainte SATURÉE** |
| Vaut-il pour plusieurs contraintes ? | **OUI, avec $m<n$** |
| Le pas 2 de sa preuve ? | **Dériver $V$ directement — RÈGLE DE COMPOSITION** |
| Le pas 3 ? | **Substituer $f_i=\lambda g_i$** |
| Le « truc » du pas 4 ? | **Différentier l'IDENTITÉ $g\equiv0$** |
| Ce qui rend le théorème vrai ? | **Le terme de RÉOPTIMISATION est ABSORBÉ par la contrainte** |
| $V(a)$ dans l'exemple A2.11 ? | $a^2/32$ |
| $\lambda(a)$ ? | $a/16$ |
| $V'(a)$ ? | **$a/16=\lambda(a)$** |
| L'interprétation du multiplicateur ? | **LA VALEUR MARGINALE DU RELÂCHEMENT de la contrainte** |
| Le nom de $a_j$ dans A2.33 ? | **LA CONSTANTE DE CONTRAINTE** |
| Pourquoi relâcher ne peut nuire ? | **$dV/da=\lambda^*\geq0$ par Kuhn-Tucker** |
| Pourquoi cette preuve est « moins bonne » ? | **Elle suppose différentiabilité et qualification** |
| L'enveloppe vaut-elle pour un min ? | **OUI, « de manière analogue »** |
| L'idée de la séparation ? | **$\mathbf{p}\cdot\mathbf{a}>I>\mathbf{p}\cdot\mathbf{b}$** |
| En dimension 3 ? | **Un PLAN, expression analytique IDENTIQUE** |
| Théorème A2.23, hypothèses ? | **$C$ FERMÉ, CONVEXE, $\mathbf{0}\notin C$** |
| Sa conclusion ? | $\mathbf{p}\cdot\mathbf{c}\geq\alpha>0$, **$\lVert\mathbf{p}\rVert=1$** |
| Comment obtient-on $\mathbf{p}$ ? | **$\hat{\mathbf{c}}/\lVert\hat{\mathbf{c}}\rVert$, le point LE PLUS PROCHE de l'origine** |
| Comment gère-t-on $C$ non borné ? | **On TRONQUE en $C'$, qui est COMPACT** |
| Quel théorème sert au pas 3 ? | **A2.19** *(dérivée $\geq0$ en un min sous $\alpha\geq0$)* |
| Théorème A2.24, 1ʳᵉ partie ? | $\mathbf{p}\cdot\mathbf{a}\geq\mathbf{p}\cdot\mathbf{b}$, **sans fermeture ni bornitude** |
| Sa 2ᵉ partie ? | **$\mathbf{p}\cdot(\mathbf{a}-\mathbf{b})\geq\alpha>0$ si FERMÉS et UN BORNÉ** |
| L'astuce centrale ? | **Poser $C=A-B$** |
| Pourquoi $\mathbf{0}\notin C$ ? | **Parce que $A$ et $B$ sont DISJOINTS** |
| Ce qu'on fait si $C$ n'est pas fermé ? | **Passer à L'ADHÉRENCE $\bar{C}$** |
| Le cas délicat ? | **$\mathbf{0}\in\bar{C}$ — il faut montrer $\mathbf{0}\in\partial\bar{C}$** |
| Ce qui force la contradiction finale ? | **$\hat{\mathbf{p}}\cdot\mathbf{e}_i\geq0$ ET $\hat{\mathbf{p}}\cdot(-\mathbf{1})\geq0$ ⟹ $\hat{\mathbf{p}}=\mathbf{0}$** |
| $A-B$ est-il toujours fermé ? | **NON — il faut UN des deux BORNÉ** |
| Le contre-exemple ? | **Le demi-plan et l'hyperbole $y=1/x$** |
| Où sert le théorème A2.24 ? | **Dans la preuve de KUHN-TUCKER** |
| Peut-on séparer un point de la frontière ? | **OUI, mais AU SENS FAIBLE — un HYPERPLAN D'APPUI** |
