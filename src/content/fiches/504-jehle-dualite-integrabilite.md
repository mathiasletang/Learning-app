# Fiche 504 — Dualité approfondie et intégrabilité : ce que la théorie prédit vraiment

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 2 « Topics in Consumer Theory », §2.1 « Duality: A Closer Look » et §2.2 « Integrability » (p. 73-91) |
| **Difficulté** | Avancé — le résultat le plus profond du bloc « consommateur » |
| **Temps d'étude estimé** | 135 min |
| **Prérequis** | Fiches 500 à 503 (théorèmes 1.6 à 1.17 en entier) · théorème d'Euler (A2.7) · inégalité du gradient pour les fonctions concaves (A2.4) · théorème de l'enveloppe (A2.22) |
| **Concepts clés** | Dualité inversée, demi-espace $A(p,u)$, intersection infinie $A(u)$, reconstruction de l'utilité, théorème 2.1, théorème 2.2, absence d'implications observables de la convexité et de la monotonicité, fonction $w(x)$, dualité utilité directe-indirecte, théorème 2.3, forme normalisée (T.1′), demandes inverses, théorème de Hotelling-Wold, redondance des restrictions, théorème 2.5, problème d'intégrabilité, Antonelli, Hurwicz-Uzawa, théorème de Frobenius, théorème d'intégrabilité |
| **Poids à l'examen** | La **construction $A(u)$** et pourquoi elle est « juste ce qu'il faut » · les **théorèmes 2.1 et 2.2** comme couple · le fait que **convexité et monotonicité n'ont aucune implication observable** · la **preuve du théorème 2.5** (budget + symétrie ⟹ homogénéité) · les **trois conditions** de l'intégrabilité et le fait qu'elles sont **exhaustives** · l'**exemple 2.3** de bout en bout. |

## 🎯 Vue d'ensemble

```
LE FIL DU §2.1-2.2 : peut-on REMONTER des donnees vers les preferences ?

  CHAPITRE 1        preferences  ->  utilite  ->  demande
                    on part de l'INOBSERVABLE et on descend vers l'OBSERVABLE

  CHAPITRE 2        demande  ->  utilite  ->  preferences
                    on REMONTE.  C'est le programme du §2.1 et du §2.2.

  §2.1.1  DE LA DEPENSE VERS L'UTILITE

     partir d'une fonction E(p,u) qui « ressemble a » une fonction de depense
     (proprietes 1 a 7 du theoreme 1.7)

     construire, pour chaque u, le DEMI-ESPACE FERME
          A(p,u) = { x >= 0  |  p . x >= E(p,u) }
     puis l'INTERSECTION INFINIE sur TOUS les prix
          A(u) = INTERSECTION sur p >> 0 de A(p,u)

     poser        u(x) = max { u >= 0  |  x appartient a A(u) }

     THEOREME 2.1   cette u(x) est CROISSANTE, NON BORNEE, QUASICONCAVE
     THEOREME 2.2   et la fonction de depense qu'elle engendre est EXACTEMENT E

     ==>  toute fonction ayant les 7 proprietes EST une fonction de depense
     ==>  on peut demarrer la theorie par la DEPENSE au lieu des PREFERENCES

  §2.1.2  CONVEXITE ET MONOTONICITE N'ONT PAS D'IMPLICATION OBSERVABLE

     soit u(x) SEULEMENT continue -- ni croissante ni quasiconcave
     construire e(p,u) puis w(x) par le meme procede
     alors  w(x) >= u(x)  toujours,  et  w est croissante ET quasiconcave
     et surtout : tout panier qui maximise u sous budget maximise aussi w
     ==> la demande engendree par u peut TOUJOURS l'etre par une w bien elevee
     (reserve du livre : cela suppose des prix NON NEGATIFS -- note 1, Fig. 2.2e)

  §2.1.3  DE L'UTILITE INDIRECTE VERS L'UTILITE DIRECTE

     THEOREME 2.3     u(x) = min sur p >> 0 de v(p, p.x)                    (T.1)
     forme normalisee u(x) = min v(p,1)  sous contrainte  p.x = 1          (T.1')
     (T.1') est PREFERABLE : (T.1) a toujours une infinite de solutions

     THEOREME 2.4  (Hotelling, Wold)  les demandes INVERSES, pour y = 1 :
          pi(x) = (du/dxi) / SOMME_j xj (du/dxj)

  §2.2  INTEGRABILITE  --  le resultat central

     d'abord, ELAGUER la liste du chapitre 1 :
        agregations d'Engel et de Cournot  <- deja impliquees par le budget (thm 1.17)
        THEOREME 2.5   budget + symetrie   ==>  HOMOGENEITE de degre 0

     il ne reste que TROIS conditions independantes :
        1. EQUILIBRE BUDGETAIRE      p . x(p,y) = y
        2. SYMETRIE                  s(p,y) symetrique
        3. SEMI-DEFINIE NEGATIVITE   s(p,y) semi-definie negative

     THEOREME 2.6  (INTEGRABILITE)   ces trois conditions sont NECESSAIRES
                   ET SUFFISANTES pour qu'une fonction soit la demande
                   d'un consommateur maximisant une utilite

     ==> la liste est COMPLETE : il n'existe AUCUNE autre restriction testable

     la preuve (Antonelli 1886 ; Hurwicz-Uzawa 1971) : resoudre le systeme
     d'equations aux derivees partielles   de/dpi = xi( p , e(p,u) )
     -- FROBENIUS garantit une solution ssi le membre de droite de la derivee
        croisee est SYMETRIQUE, c'est-a-dire ssi la matrice de Slutsky l'est
     -- la CONCAVITE de e equivaut a la SEMI-DEFINIE NEGATIVITE de Slutsky
     -- l'HOMOGENEITE de degre 1 de e vient du budget (exercice 2.4)
```

> **La phrase de programme du chapitre 2.** *« Nous montrerons que, bien que notre théorie du consommateur ait été développée, tout naturellement, **en partant d'axiomes sur les préférences**, une théorie équivalente aurait pu être développée **en partant d'axiomes sur le comportement de dépense**. »*

> ⚠️ **Note de transcription — identique aux fiches 500-503.** Le PDF n'exporte pas $\succsim$, $\succ$, $\gg$, $\sum$, $\nabla$ ; il rend l'inégalité vectorielle $\geq$ et l'opérateur $\nabla$ comme un « + ». Ces symboles sont rétablis depuis la prose et les équations voisines. Un passage particulièrement affecté — $p^0=\nabla u(x^0)$ dans la preuve du théorème 2.3 — est signalé sur place.

## 🔴 Concept 1 — Le renversement de perspective

### 1.1 Ce que le chapitre 2 annonce

> *« Dans ce chapitre, nous explorons quelques sujets additionnels de théorie du consommateur. Nous commençons par la **théorie de la dualité** et investiguons plus complètement les liens entre utilité, utilité indirecte et fonctions de dépense. Puis nous considérons le classique "**problème d'intégrabilité**" et demandons quelles conditions une fonction des prix et du revenu doit satisfaire pour **qualifier comme fonction de demande d'un consommateur maximisant son utilité**. La réponse à cette question fournira une **caractérisation complète des restrictions que notre théorie place sur le comportement de demande observable**. »*

### 1.2 Le programme du §2.1, énoncé par le livre

> *« Nous montrerons que **toute fonction des prix et de l'utilité qui possède toutes les propriétés d'une fonction de dépense est en fait une fonction de dépense**, c'est-à-dire qu'il existe une fonction d'utilité bien élevée qui l'engendre. Bien que ce résultat ait un certain intérêt en lui-même, sa vraie signification devient claire quand il est utilisé pour **caractériser complètement les implications observables** de notre théorie. […] Étant donné l'importance de ce résultat, cette section peut à juste titre être vue comme une **préparation à la suivante**. »*

> **Le renversement en une image.**
>
> | Chapitre 1 | Chapitre 2 |
> |---|---|
> | préférences $\to$ $u$ $\to$ $e$, $v$ $\to$ demandes | demandes $\to$ $e$ $\to$ $u$ $\to$ préférences |
> | de l'inobservable vers l'observable | de l'**observable** vers l'**inobservable** |
> | « quelles prédictions ? » | « quelles prédictions **et seulement lesquelles** ? » |

## 🔴 Concept 2 — Reconstruire l'utilité à partir de la dépense (§2.1.1)

### 2.1 Le point de départ

> *« Considérons une fonction quelconque des prix et de l'utilité, $E(p,u)$, qui **peut être ou ne pas être** une fonction de dépense. Supposons maintenant que $E$ satisfait les propriétés 1 à 7 d'une fonction de dépense du théorème 1.7 — donc qu'elle est continue, strictement croissante et non bornée supérieurement en $u$, ainsi que croissante, homogène de degré un, concave et différentiable en $p$. Ainsi, $E$ "**ressemble à**" une fonction de dépense. Nous allons montrer que $E$ **doit alors en être une**. »*

### 2.2 La construction — pas à pas

**Pas 1 — un demi-espace, à un prix donné.** Choisissons $(p^0,u^0)\in\mathbb{R}^n_{++}\times\mathbb{R}_+$ et évaluons $E$ pour obtenir le nombre $E(p^0,u^0)$. Formons

$$A(p^0,u^0)\equiv\{\,x\in\mathbb{R}^n_+ \mid p^0\cdot x \geq E(p^0,u^0)\,\}$$

> *« $A(p^0,u^0)$ est un ensemble **convexe fermé** contenant tous les points **sur et au-dessus** de l'hyperplan $p^0\cdot x = E(p^0,u^0)$. »* (Fig. 2.1a)

**Pas 2 — recommencer à d'autres prix, à $u^0$ fixé.**

$$A(p^1,u^0)\equiv\{\,x\in\mathbb{R}^n_+ \mid p^1\cdot x \geq E(p^1,u^0)\,\}$$

**Pas 3 — l'intersection infinie.** *« Imaginons procéder ainsi pour **tous** les prix $p\gg0$ et former l'intersection infinie »*

$$\boxed{\;A(u^0)\equiv\bigcap_{p\gg0} A(p,u^0)=\{\,x\in\mathbb{R}^n_+ \mid p\cdot x\geq E(p,u^0) \ \text{ pour tout } p\gg0\,\}\;} \tag{2.1}$$

> *« La zone ombrée de la Fig. 2.1(b) illustre l'intersection d'un nombre **fini** de $A(p,u^0)$ et donne une intuition de ce à quoi $A(u^0)$ ressemblera. Il est facile d'imaginer qu'à mesure qu'on considère de plus en plus de prix, la zone ombrée **ressemblera de plus en plus à un ensemble supérieur** pour une certaine fonction quasiconcave. »*

**Pas 4 — définir l'utilité.**

$$\boxed{\;u(x)\equiv\max\{\,u\geq0 \mid x\in A(u)\,\} = \max\{\,u\geq0 \mid p\cdot x\geq E(p,u) \ \forall\,p\gg0\,\}\;}$$

### 2.3 Pourquoi CETTE définition — la justification du livre

> *« Vous vous demandez peut-être pourquoi nous avons choisi de définir $u(x)$ comme nous l'avons fait. Après tout, il y a **beaucoup de façons** d'employer $E(p,u)$ pour assigner des nombres à chaque $x$. »*

> *« Pour comprendre, oubliez cette définition et supposons un moment que $E(p,u)$ **est** en fait la fonction de dépense engendrée par une certaine $u(x)$. Comment pourrions-nous **récupérer** $u(x)$ à partir de la seule connaissance de $E(p,u)$ ? Notez que par définition d'une fonction de dépense, $p\cdot x\geq E(p,u(x))$ pour tous les prix $p\gg0$, et, typiquement, il y aura **égalité pour certains prix**. Donc, parce que $E$ est strictement croissante en $u$, **$u(x)$ est la plus grande valeur de $u$ telle que $p\cdot x\geq E(p,u)$ pour tout $p\gg0$**. C'est-à-dire, $u(x)$ est la plus grande valeur de $u$ telle que $x\in A(u)$. »*

> *« Par conséquent, la construction que nous avons donnée est **juste ce qu'il faut** pour récupérer la fonction d'utilité qui a engendré $E(p,u)$ quand $E(p,u)$ **est** effectivement une fonction de dépense. »*

**La stratégie en deux temps, telle que le livre l'annonce :**

| Étape | Contenu | Théorème |
|---|---|---|
| 1 | montrer que la $u(x)$ ainsi définie **satisfait nos axiomes** | **2.1** |
| 2 | montrer que $E$ **est** la fonction de dépense engendrée par cette $u(x)$ | **2.2** |

### 2.4 Théorème 2.1 — la fonction construite est une vraie utilité

> **THEOREM 2.1 — Constructing a Utility Function from an Expenditure Function.** Let $E:\mathbb{R}^n_{++}\times\mathbb{R}_+\to\mathbb{R}_+$ satisfy properties 1 through 7 of an expenditure function given in Theorem 1.7. Let $A(u)$ be as in (2.1). Then the function $u:\mathbb{R}^n_+\to\mathbb{R}_+$ given by
>
> $$u(x)\equiv\max\{u\geq0 \mid x\in A(u)\}$$
>
> is **increasing**, **unbounded above**, and **quasiconcave**.

**Preuve — le point préliminaire : $u(x)$ est bien définie.**

> *« La première chose à établir est que $u(x)$ est **bien définie**. C'est-à-dire, il faut montrer que l'ensemble $\{u\geq0 \mid p\cdot x\geq E(p,u) \ \forall p\gg0\}$ contient un **plus grand élément**. Nous esquisserons l'argument. D'abord, cet ensemble — appelons-le $B(x)$ — doit être **majoré** parce que $E(p,u)$ est non bornée supérieurement et croissante en $u$. Donc $B(x)$ possède un majorant et donc aussi une **borne supérieure** $\hat u$. Il faut montrer que $\hat u\in B(x)$. Mais cela découle de ce que $B(x)$ est **fermé**, ce que nous ne montrerons pas. »*

**Preuve — $u$ est croissante.** Soit $x^1 \geq x^2$.

| Pas | Affirmation | Justification |
|---|---|---|
| (P.1) | $p\cdot x^1 \geq p\cdot x^2$ pour tout $p\gg0$ | *« toutes les composantes de $x^1$ sont au moins aussi grandes que celles de $x^2$ »* |
| (P.2) | $p\cdot x^2 \geq E\big(p,u(x^2)\big)$ pour tout $p\gg0$ | définition de $u(x^2)$ |
| (P.3) | donc $p\cdot x^1 \geq E\big(p,u(x^2)\big)$ pour tout $p\gg0$ | (P.1) + (P.2) |
|  | donc $x^1\in A\big(u(x^2)\big)$, et comme $u(x^1)$ est le **plus grand** $u$ tel que $x^1\in A(u)$ : $u(x^1)\geq u(x^2)$ | définition |

$\blacksquare$

**Preuve — $u$ est non bornée.** *« Cela peut être montré en faisant appel aux propriétés de croissance, concavité, homogénéité et différentiabilité de $E$ en $p$, et au fait que son domaine en $u$ est tout $\mathbb{R}_+$. Nous ne donnerons pas la preuve ici (bien qu'on puisse la glaner dans la preuve du théorème 2.2 ci-dessous). »*

**Preuve — $u$ est quasiconcave.** Il faut $u(x^t)\geq\min[u(x^1),u(x^2)]$. Supposons, sans perte de généralité, $u(x^1)=\min[u(x^1),u(x^2)]$.

Comme $E$ est **strictement croissante en $u$** : $E\big(p,u(x^1)\big)\leq E\big(p,u(x^2)\big)$, donc

$$t\,E\big(p,u(x^1)\big)+(1-t)\,E\big(p,u(x^2)\big) \ \geq\ E\big(p,u(x^1)\big) \qquad \forall\,t\in[0,1] \tag{P.4}$$

Par définition de $u(x^1)$ et $u(x^2)$ :

$$p\cdot x^1\geq E\big(p,u(x^1)\big) \qquad\qquad p\cdot x^2\geq E\big(p,u(x^2)\big) \qquad \forall\,p\gg0$$

En multipliant par $t\geq0$ et $(1-t)\geq0$, en additionnant, et en utilisant (P.4) :

$$p\cdot x^t \geq E\big(p,u(x^1)\big) \qquad \forall\,p\gg0,\ t\in[0,1]$$

Donc, par définition de $u(x^t)$ : $u(x^t)\geq u(x^1)=\min[u(x^1),u(x^2)]$. $\blacksquare$

> **Le mécanisme de la preuve de quasiconcavité — à retenir.** C'est encore une fois « pondérer deux inégalités et additionner » (comme la concavité de $e$ et la quasiconvexité de $v$, fiche 502). La seule idée supplémentaire est (P.4) : la combinaison convexe de deux valeurs de $E$ domine la **plus petite** — un fait trivial, mais c'est lui qui produit le $\min$ de la quasiconcavité.

### 2.5 Théorème 2.2 — la boucle se referme

> **THEOREM 2.2 — The Expenditure Function of Derived Utility, $u$, is $E$.** Let $E(p,u)$, defined on $\mathbb{R}^n_{++}\times\mathbb{R}_+$, satisfy properties 1 to 7 of an expenditure function given in Theorem 1.7, and let $u(x)$ be derived from $E$ as in Theorem 2.1. Then for all non-negative prices and utility,
>
> $$E(p,u)=\min_x \ p\cdot x \quad\text{s.c.}\quad u(x)\geq u.$$

**Preuve — la moitié facile.** Fixons $p^0\gg0$, $u^0\geq0$, et soit $x$ tel que $u(x)\geq u^0$. Par construction de $u$ :

$$p\cdot x\geq E\big(p,u(x)\big) \qquad \forall\,p\gg0$$

et comme $E$ est croissante en $u$ et $u(x)\geq u^0$ :

$$p\cdot x\geq E(p,u^0) \qquad \forall\,p\gg0 \tag{P.1}$$

d'où

$$E(p^0,u^0)\ \leq\ \min_{x} \ p^0\cdot x \quad\text{s.c.}\quad u(x)\geq u^0 \tag{P.3}$$

**Preuve — la moitié difficile : montrer que c'est une égalité.** Il suffit de trouver **un seul** $x^0$ tel que

$$p^0\cdot x^0 \leq E(p^0,u^0) \qquad\text{et}\qquad u(x^0)\geq u^0 \tag{P.4}$$

*« car cela impliquerait que le minimum du membre de droite de (P.3) ne peut être plus grand que $E(p^0,u^0)$. »*

**La construction de $x^0$ — l'idée décisive.** Deux propriétés de $E$ sont mobilisées.

**(a) Euler** (théorème A2.7) : $E$ étant différentiable et **homogène de degré 1** en $p$,

$$E(p,u)=\frac{\partial E(p,u)}{\partial p}\cdot p \qquad \forall\,p\gg0 \tag{P.5}$$

**(b) Concavité** (théorème A2.4) : $E$ étant **concave** en $p$, elle est en dessous de ses tangentes :

$$E(p,u^0)\ \leq\ E(p^0,u^0)+\frac{\partial E(p^0,u^0)}{\partial p}\cdot(p-p^0) \qquad \forall\,p\gg0 \tag{P.6}$$

**La combinaison.** En évaluant (P.5) en $(p^0,u^0)$ — ce qui donne $E(p^0,u^0)=\dfrac{\partial E(p^0,u^0)}{\partial p}\cdot p^0$ — et en l'injectant dans (P.6), les deux termes en $p^0$ s'annulent :

$$E(p,u^0)\ \leq\ \frac{\partial E(p^0,u^0)}{\partial p}\cdot p \qquad \forall\,p\gg0 \tag{P.7}$$

**Posons**

$$\boxed{\;x^0 \equiv \frac{\partial E(p^0,u^0)}{\partial p}\;}$$

C'est bien un élément de $\mathbb{R}^n_+$ *« parce que $E$ est croissante en $p$ »*. On peut réécrire (P.7) :

$$p\cdot x^0\geq E(p,u^0) \qquad \forall\,p\gg0 \tag{P.8}$$

**Conclusion.** (P.8) dit exactement que $x^0\in A(u^0)$, donc **par définition de $u(\cdot)$** : $u(x^0)\geq u^0$ . Et (P.5) évaluée en $(p^0,u^0)$ donne $E(p^0,u^0)=p^0\cdot x^0$ . Les deux clauses de (P.4) sont établies. $\blacksquare$

> **L'idée de la preuve, en une phrase.** Le candidat $x^0$ est le **vecteur des dérivées-prix de $E$** — c'est-à-dire ce que Shephard donnerait si $E$ était une vraie fonction de dépense. On ne le suppose pas ; on montre, par Euler et par la concavité, qu'il **fait le travail**.
>
> ⚠️ **Les deux propriétés utilisées ne sont pas interchangeables.** Euler (homogénéité de degré 1) sert à obtenir $E(p^0,u^0)=p^0\cdot x^0$, c'est-à-dire la **seconde** clause de (P.4). La concavité sert à obtenir (P.8), c'est-à-dire la **première**. Retirez l'une des deux et la preuve tombe.

### 2.6 Ce que les théorèmes 2.1 et 2.2 autorisent

> *« Les deux derniers théorèmes nous disent qu'**à chaque fois que nous pouvons écrire une fonction des prix et de l'utilité satisfaisant les propriétés 1 à 7 du théorème 1.7, ce sera une fonction de dépense légitime** pour certaines préférences satisfaisant beaucoup des axiomes usuels. Nous pouvons bien sûr alors la dériver par rapport aux prix pour obtenir le système de demandes hicksiennes associé. Si les préférences sous-jacentes sont continues et strictement croissantes, nous pouvons **inverser** la fonction en $u$, obtenir la fonction d'utilité indirecte associée, appliquer l'**identité de Roy**, et dériver le système de demandes marshalliennes également. **À chaque fois, nous sommes assurés que les systèmes de demande résultants possèdent toutes les propriétés requises par la maximisation d'utilité.** »*

> *« Pour des besoins théoriques, un **choix** peut donc être fait. On peut partir d'une fonction d'utilité directe et procéder en résolvant les problèmes d'optimisation appropriés. Ou l'on peut **partir d'une fonction de dépense** et procéder par la route généralement **plus facile** de l'inversion et de la simple différentiation. »*

$$\boxed{\;E(p,u) \ \xrightarrow{\ \partial/\partial p_i\ } \ x^h \ \xrightarrow{\ \text{inversion}\ } \ v(p,y) \ \xrightarrow{\ \text{Roy}\ } \ x(p,y)\;}$$

> **Le gain pratique est considérable.** Construire un modèle en partant de $u$ oblige à résoudre deux programmes d'optimisation. Partir de $E$ ne demande que des **dérivations** et une **inversion**. C'est pourquoi les systèmes de demande empiriques (AIDS, translog…) sont presque toujours spécifiés par leur **fonction de dépense**.

## 🔴 Concept 3 — Convexité et monotonicité n'ont aucune implication observable (§2.1.2)

### 3.1 Une dette payée

> *« Vous vous souvenez peut-être qu'après avoir introduit l'axiome de convexité, il a été affirmé que "**le contenu prédictif de la théorie serait le même avec ou sans lui**". C'est le moment opportun de soutenir cette affirmation et d'investiguer aussi la portée de l'hypothèse de monotonicité. »*

*(L'affirmation en question est celle de la fiche 500, §3.5.)*

### 3.2 La construction

> *« Pour la présente discussion, supposons **seulement que $u(x)$ est continue**. Ainsi, $u(x)$ n'a besoin d'être ni croissante ni quasiconcave. »*

| Étape | Objet | Statut |
|---|---|---|
| 1 | $u(x)$ continue, **rien de plus** | ni croissante, ni quasiconcave |
| 2 | $e(p,u)$, la fonction de dépense qu'elle engendre | *« la continuité de $u(x)$ suffit à garantir que $e(p,u)$ est bien définie. De plus, $e(p,u)$ est continue »* |
| 3 | $w(x)\equiv\max\{u\geq0 \mid p\cdot x\geq e(p,u) \ \forall\,p\gg0\}$ | *« un coup d'œil à la preuve du théorème 2.1 vous convaincra que $w(x)$ est **croissante et quasiconcave** »* |

> *« Ainsi, **que $u(x)$ soit ou non quasiconcave ou croissante, $w(x)$ sera les deux**. Clairement, $u(x)$ et $w(x)$ n'ont donc pas besoin de coïncider. Comment sont-elles alors reliées ? »*

### 3.3 La relation $w \geq u$

> *« Il est facile de voir que $w(x)\geq u(x)$ pour tout $x\in\mathbb{R}^n_+$. Cela découle de ce que, par définition de $e(\cdot)$, on a $e\big(p,u(x)\big)\leq p\cdot x$ pour tout $p\gg0$. L'inégalité voulue suit alors de la définition de $w(x)$. »*

$$\boxed{\;w(x)\geq u(x) \qquad \forall\,x\in\mathbb{R}^n_+\;}$$

**Conséquence sur les ensembles supérieurs.** Pour tout $u\geq0$, l'ensemble supérieur de niveau $u$ de $u(x)$ — noté $S(u)$ — est **contenu** dans celui de $w(x)$ — noté $T(u)$. Et comme $w$ est quasiconcave, $T(u)$ est **convexe**.

### 3.4 La figure 2.2, panneau par panneau

**Panneau (a) — le cas régulier.** Si $u(x)$ est croissante et quasiconcave, la frontière de $S(u)$ est une courbe d'indifférence décroissante et convexe.

> *« Chaque point de cette frontière est le panier **minimisant la dépense** pour atteindre l'utilité $u$ à un certain vecteur de prix $p\gg0$. Par conséquent, si $u(x^0)=u$, alors pour un certain $p^0\gg0$ on a $e(p^0,u)=p^0\cdot x^0$. Mais comme $e(\cdot)$ est strictement croissante en $u$, cela signifie que $w(x^0)\leq u=u(x^0)$. Mais comme $w(x^0)\geq u(x^0)$ tient toujours, on doit avoir $w(x^0)=u(x^0)$. »*

Donc $w=u$ partout — *« ce qui n'est pas une grande surprise à la lumière des théorèmes 2.1 et 2.2 »*.

**Panneaux (b), (c), (d) — le cas intéressant.** $u(x)$ n'est **ni** croissante **ni** quasiconcave.

| Panneau | Ce qu'on voit |
|---|---|
| (b) | La frontière de $S(u)$ donne une courbe d'indifférence irrégulière |
| (c) | *« Certains paniers sur la courbe d'indifférence **ne minimisent jamais** la dépense requise pour obtenir l'utilité $u$, quel que soit le vecteur de prix. Les **traits épais** montrent ceux qui la minimisent à un certain vecteur de prix positif. »* Sur ces traits épais, $w(x)=u(x)=u$ |
| (d) | *« Mais parce que $w(x)$ est quasiconcave et croissante, la courbe $w(x)=u$ doit être telle que représentée. »* |

> *« Ainsi, **$w(x)$ ne diffère de $u(x)$ que du strict nécessaire pour devenir strictement croissante et quasiconcave**. »*

### 3.5 La conclusion

> *« Étant donné la relation entre leurs courbes d'indifférence, il est clair que **si un panier maximise $u(x)$ sous $p\cdot x\leq y$, alors le même panier maximise $w(x)$ sous $p\cdot x\leq y$**. (Attention : **la réciproque est fausse.**) Par conséquent, **tout comportement de demande observable qui peut être engendré par une fonction d'utilité non croissante et non quasiconcave, comme $u(x)$, peut aussi être engendré par une fonction d'utilité croissante et quasiconcave, comme $w(x)$**. »*

> *« C'est en ce sens que les **hypothèses de monotonicité et de convexité des préférences n'ont aucune implication observable** pour notre théorie de la demande du consommateur. »*

> ⚠️ **La réserve du livre, en note de bas de page — elle est importante.**
>
> *« Le fait que le comportement de demande engendré par $u(x)$ dans le second cas puisse être capturé par la fonction croissante $w(x)$ **repose sur l'hypothèse que le consommateur ne fait face qu'à des prix non négatifs**. Par exemple, si avec deux biens l'un des prix, disons $p_2$, était **négatif**, alors on pourrait avoir une situation telle que celle de la Fig. 2.2(e), où $x^*$ est optimal pour la fonction d'utilité $u(x)$ mais **pas** pour la fonction croissante $w(x)$. Ainsi, **si les prix peuvent être négatifs, la monotonicité n'est pas sans conséquences observables**. »*
>
> Autrement dit : le résultat est vrai **dans le cadre du modèle** ($p\gg0$), et cesse de l'être si l'on autorise des prix négatifs — ce qui arrive dans certains contextes (biens indésirables, déchets, externalités négatives).

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que ce paragraphe règle, et ce qu'il ne règle pas.</span>

Il **règle** la question de la portée empirique : convexité et monotonicité ne peuvent pas être réfutées par des données de demande. — Il **ne dit pas** qu'elles sont inutiles. Elles restent indispensables pour l'**unicité** de la solution (fiche 501), pour la **différentiabilité** de la demande, et pour toute l'analyse d'**équilibre général** du chapitre 5 (existence par point fixe).

</div>

## 🔴 Concept 4 — Dualité entre utilité directe et indirecte (§2.1.3)

### 4.1 L'idée

> *« Nous avons vu comment la dualité nous permet de travailler de la fonction de dépense vers la fonction d'utilité directe. Parce que les fonctions de dépense et d'utilité indirecte sont si étroitement reliées (elles sont **inverses l'une de l'autre**), il ne devrait pas être surprenant qu'il soit aussi possible de **partir d'une fonction d'utilité indirecte et de remonter à la fonction d'utilité directe**. »*

**Le raisonnement.** Si $u(x)$ engendre $v(p,y)$, alors par définition, pour tout $x\in\mathbb{R}^n_+$ :

$$v(p,\,p\cdot x)\ \geq\ u(x) \qquad \forall\,p\gg0$$

*(le consommateur qui dispose d'un revenu exactement égal au coût de $x$ peut au moins s'offrir $x$)*, *« et il y aura typiquement un vecteur de prix pour lequel l'inégalité est une égalité »*. D'où :

$$\boxed{\;u(x)=\min_{p\in\mathbb{R}^n_{++}} \ v(p,\,p\cdot x)\;} \tag{2.2}$$

### 4.2 Théorème 2.3

> **THEOREM 2.3 — Duality Between Direct and Indirect Utility.** Suppose that $u(x)$ is **quasiconcave** and **differentiable** on $\mathbb{R}^n_{++}$ with **strictly positive partial derivatives** there. Then for all $x\in\mathbb{R}^n_{++}$, $v(p,p\cdot x)$ achieves a **minimum** in $p$ on $\mathbb{R}^n_{++}$, and
>
> $$u(x)=\min_{p\in\mathbb{R}^n_{++}} v(p,\,p\cdot x). \tag{T.1}$$

*« bien que les hypothèses ne soient pas les plus faibles possibles. »*

**Preuve.** Le membre de gauche n'excède jamais celui de droite (discussion ci-dessus) ; il suffit donc de trouver, pour chaque $x\gg0$, un $p\gg0$ tel que $u(x)=v(p,\,p\cdot x)$ (P.1).

Soit $x^0\gg0$. **Posons** :

$$p^0 = \nabla u(x^0), \qquad \lambda^0=1, \qquad y^0=p^0\cdot x^0$$

Par hypothèse (dérivées partielles strictement positives), $p^0\gg0$. Alors

$$\frac{\partial u(x^0)}{\partial x_i}-\lambda^0 p_i^0 = 0, \quad i=1,\dots,n \tag{P.2}$$

$$p^0\cdot x^0 = y^0 \tag{P.3}$$

> ⚠️ **Le passage le plus abîmé par l'extraction.** Le PDF rend $p^0=\nabla u(x^0)$ comme « $p^0 = +u(x^0)$ ». Le symbole est bien le **gradient** : c'est la seule lecture qui rende (P.2) vraie avec $\lambda^0=1$, et c'est ce que l'hypothèse « dérivées partielles strictement positives » sert à garantir ($p^0\gg0$).

<div class="callout" data-kind="formel">

<span class="callout__lab">théorème 1.4</span>

*« Par conséquent, $(x^0,\lambda^0)$ satisfont les conditions du premier ordre du problème du consommateur $\max u(x)$ s.c. $p^0\cdot x=y^0$. De plus, par le , parce que $u(x)$ est quasiconcave, ces conditions sont **suffisantes** pour garantir que $x^0$ résout le problème du consommateur quand $p=p^0$ et $y=y^0$. Donc $u(x^0)=v(p^0,y^0)=v(p^0,p^0\cdot x^0)$. »* $\blacksquare$

</div>

> **Le cœur de la preuve, en une phrase.** On **choisit les prix égaux au gradient de l'utilité** au point $x^0$. Alors la condition de tangence $\text{TMS}=p_i/p_j$ est automatiquement satisfaite, et le théorème 1.4 (suffisance sous quasiconcavité, fiche 501) fait le reste.
>
> **Notez le rôle exact des hypothèses :** la quasiconcavité sert **uniquement** à invoquer le théorème 1.4 ; les dérivées strictement positives servent **uniquement** à garantir $p^0\gg0$.

**Une remarque du livre sur la portée du résultat :**

> *« Comme dans le cas des fonctions de dépense, on peut montrer en utilisant (T.1) que si une fonction $V(p,y)$ a toutes les propriétés d'une fonction d'utilité indirecte du théorème 1.6, alors $V(p,y)$ **est** en fait une fonction d'utilité indirecte. Nous ne poursuivrons pas ce résultat ici. Le lecteur intéressé peut consulter **Diewert (1974)**. »*

### 4.3 La forme normalisée (T.1′) — et pourquoi elle est préférable

**La normalisation.** Comme $v(p,y)$ est **homogène de degré zéro** en $(p,y)$, on a $v(p,p\cdot x)=v\big(p/(p\cdot x),\,1\big)$ dès que $p\cdot x>0$. En posant $p\equiv p^*/(p^*\cdot x)$ — de sorte que $p\cdot x=1$ — on obtient :

$$\boxed{\;u(x)=\min_{p\in\mathbb{R}^n_{++}} \ v(p,1) \quad\text{s.c.}\quad p\cdot x = 1\;} \tag{T.1′}$$

> *« Que nous utilisions (T.1) ou (T.1′) pour récupérer $u(x)$ à partir de $v(p,y)$ n'a pas d'importance. Choisissez simplement la plus commode. »*

> ⚠️ **Mais il y a une raison technique de préférer (T.1′), et le livre l'énonce explicitement.**
>
> *« Un désavantage de (T.1) est qu'elle possède **toujours des solutions multiples** à cause de l'homogénéité de $v$ (c'est-à-dire, si $p^*$ résout (T.1), alors $tp^*$ aussi, pour tout $t>0$). Par conséquent, nous ne pourrions **pas**, par exemple, appliquer le théorème A2.22 (**théorème de l'enveloppe**) comme nous aurons l'occasion de le faire dans ce qui suit. À ces fins, **(T.1′) est nettement supérieure**. »*
>
> Autrement dit : la contrainte $p\cdot x=1$ **sélectionne un représentant unique** dans chaque rayon de prix, ce qui rend le problème régulier et le théorème de l'enveloppe applicable. C'est précisément ce dont le théorème 2.4 aura besoin.

### 4.4 Exemple 2.1 — retrouver la CES directe à partir de la CES indirecte

**Le point de départ.** $v(p,y)=y\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r}$ — que l'exemple 1.2 (fiche 502) a établi comme une utilité indirecte valide.

En posant $y=1$ : $v(p,1)=\big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r}$. Par (T.1′) :

$$u(x_1,x_2)=\min_{p_1,p_2} \ \big(p_1^{\,r}+p_2^{\,r}\big)^{-1/r} \quad\text{s.c.}\quad p_1x_1+p_2x_2=1$$

**Les conditions du premier ordre :**

$$-\big((p_1^*)^r+(p_2^*)^r\big)^{(-1/r)-1}(p_1^*)^{r-1}-\lambda^*x_1=0 \tag{E.1}$$

$$-\big((p_1^*)^r+(p_2^*)^r\big)^{(-1/r)-1}(p_2^*)^{r-1}-\lambda^*x_2=0 \tag{E.2}$$

$$1-p_1^*x_1-p_2^*x_2=0 \tag{E.3}$$

**Élimination de $\lambda^*$** entre (E.1) et (E.2) :

$$\frac{p_1^*}{p_2^*}=\left(\frac{x_1}{x_2}\right)^{1/(r-1)} \tag{E.4}$$

> **Notez la symétrie avec l'exemple 1.1.** Là, on obtenait $\dfrac{x_1}{x_2}=\left(\dfrac{p_1}{p_2}\right)^{1/(\rho-1)}$. Ici, **quantités et prix ont échangé leurs rôles**, et $\rho$ est devenu $r$. C'est la dualité au niveau du calcul.

**Les solutions**, après substitution dans (E.3) :

$$p_1^*=\frac{x_1^{\,1/(r-1)}}{x_1^{\,r/(r-1)}+x_2^{\,r/(r-1)}} \qquad\qquad p_2^*=\frac{x_2^{\,1/(r-1)}}{x_1^{\,r/(r-1)}+x_2^{\,r/(r-1)}} \tag{E.5}$$

**La fonction de valeur.** En substituant dans l'objectif :

$$u(x_1,x_2)=\left[\frac{x_1^{\,r/(r-1)}+x_2^{\,r/(r-1)}}{\big(x_1^{\,r/(r-1)}+x_2^{\,r/(r-1)}\big)^{r}}\right]^{-1/r} = \Big[\big(x_1^{\,r/(r-1)}+x_2^{\,r/(r-1)}\big)^{1-r}\Big]^{-1/r}$$

$$= \big(x_1^{\,r/(r-1)}+x_2^{\,r/(r-1)}\big)^{(r-1)/r} \tag{E.6}$$

**Le changement de variable final.** En posant $\rho \equiv \dfrac{r}{r-1}$ :

$$\boxed{\;u(x_1,x_2)=\big(x_1^{\,\rho}+x_2^{\,\rho}\big)^{1/\rho}\;} \tag{E.7}$$

> *« C'est la fonction d'utilité directe CES avec laquelle nous avions commencé à l'exemple 1.2, **comme il se doit**. »*

<details class="details--riche">
<summary>

**La vérification du changement de variable — et pourquoi $\rho$ et $r$ sont involutifs**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre pose $\rho\equiv r/(r-1)$ sans commentaire.</span>

</div>

Rappelons que la fiche 501 avait posé $r\equiv\dfrac{\rho}{\rho-1}$. Vérifions que la relation est **involutive**, c'est-à-dire que l'appliquer deux fois redonne le point de départ.

Soit $f(t)=\dfrac{t}{t-1}$. Alors

$$f\big(f(t)\big)=\frac{\frac{t}{t-1}}{\frac{t}{t-1}-1}=\frac{\frac{t}{t-1}}{\frac{t-(t-1)}{t-1}}=\frac{\frac{t}{t-1}}{\frac{1}{t-1}}=t. \quad$$

**$f$ est donc une involution :** $f\circ f = \text{id}$. C'est pourquoi le passage $u\to v$ (qui remplace $\rho$ par $r$) et le passage $v\to u$ (qui remplace $r$ par $\rho$) **utilisent la même formule** et se compensent exactement.

**Le contrôle de l'exposant final.** $(r-1)/r = 1 - 1/r$. Or $\dfrac1\rho=\dfrac{r-1}{r}$, donc $(r-1)/r=1/\rho$ — l'exposant de (E.6) est bien $1/\rho$, comme dans (E.7).

> ⚠️ **Le domaine se transporte aussi.** L'exemple 1.1 exigeait $\rho<1$, $\rho\neq0$. Sous $f$, cela correspond à $r<1$, $r\neq0$ — le même domaine, par involution. La CES est donc **auto-duale** en ce sens : sa forme indirecte a la même structure algébrique que sa forme directe.

</details>

## 🟠 Concept 5 — Les demandes inverses (théorème 2.4)

### 5.1 De quoi il s'agit

> *« Tout au long du chapitre, nous nous sommes concentrés sur les demandes marshalliennes ordinaires, où la **quantité** demandée est exprimée comme fonction des prix et du revenu. Occasionnellement, il est commode de travailler avec des fonctions de demande sous **forme inverse**. Ici nous voyons le **prix de demande** du bien $i$ comme fonction des quantités du bien $i$ et de tous les autres, et nous écrivons $p_i=p_i(x)$. »*

> **THEOREM 2.4 — (Hotelling, Wold) Duality and the System of Inverse Demands.** Let $u(x)$ be the consumer's direct utility function. Then the inverse demand function for good $i$ associated with income $y=1$ is given by
>
> $$\boxed{\;p_i(x)=\frac{\partial u(x)/\partial x_i}{\displaystyle\sum_{j=1}^n x_j\big(\partial u(x)/\partial x_j\big)}\;}$$

*« où nous supposerons simplement la différentiabilité selon les besoins. »*

### 5.2 La preuve

**Le point de départ.** Par définition de $p(x)$ : $u(x)=v\big(p(x),1\big)$ et $\big[p(x)\big]\cdot x = 1$ pour tout $x$. Par la discussion du §4.1 et l'argument de normalisation :

$$u(x)=v\big(p(x),1\big)=\min_{p\in\mathbb{R}^n_{++}} \ v(p,1) \quad\text{s.c.}\quad p\cdot x=1 \tag{P.1}$$

**Le lagrangien** du problème de minimisation :

$$\mathcal{L}(p,\lambda)=v(p,1)-\lambda\big(1-p\cdot x\big)$$

**Le théorème de l'enveloppe** — et c'est ici que la forme (T.1′) est indispensable, puisque (T.1) n'aurait pas de solution unique :

$$\frac{\partial u(x)}{\partial x_i}=\frac{\partial\mathcal{L}(p^*,\lambda^*)}{\partial x_i}=\lambda^* p_i^*, \qquad i=1,\dots,n \tag{P.2}$$

où $p^*=p(x)$. *(Le calcul : $\mathcal{L}$ contient $x_i$ dans le seul terme $+\lambda p_ix_i$.)*

En supposant $\partial u(x)/\partial x_i>0$, on a $\lambda^*>0$.

**La normalisation.** En multipliant (P.2) par $x_i$ et en sommant sur $i$ :

$$\sum_{i=1}^n x_i\frac{\partial u(x)}{\partial x_i}=\lambda^*\sum_{i=1}^n p_i^*x_i = \lambda^*\sum_{i=1}^n p_i(x)\,x_i=\lambda^* \tag{P.3}$$

*« parce que $\big[p(x)\big]\cdot x=1$. »*

**Conclusion.** En combinant (P.2) et (P.3), avec $p_i^*=p_i(x)$ :

$$p_i(x)=\frac{1}{\lambda^*}\cdot\frac{\partial u(x)}{\partial x_i}=\frac{\partial u(x)/\partial x_i}{\sum_j x_j\big(\partial u(x)/\partial x_j\big)} \qquad\blacksquare$$

> **La lecture de la formule.** Le prix de demande du bien $i$ est son **utilité marginale, normalisée** de sorte que la dépense totale vaille 1. Le dénominateur $\sum_j x_j\,\partial u/\partial x_j$ est exactement le facteur de normalisation qui impose $p(x)\cdot x=1$.
>
> **Le rapport à (1.11).** En faisant le rapport de deux demandes inverses, le dénominateur commun disparaît :
>
> $$\frac{p_i(x)}{p_j(x)}=\frac{\partial u/\partial x_i}{\partial u/\partial x_j}=\text{TMS}_{ij}(x).$$
>
> C'est la condition de tangence de la fiche 501, lue à l'envers. La demande inverse ne fait qu'**ajouter la normalisation** à une relation déjà connue.

### 5.3 Exemple 2.2 — les demandes inverses de la CES

Pour $u(x_1,x_2)=\big(x_1^\rho+x_2^\rho\big)^{1/\rho}$ :

$$\frac{\partial u(x)}{\partial x_j}=\big(x_1^\rho+x_2^\rho\big)^{(1/\rho)-1}x_j^{\,\rho-1}$$

En multipliant par $x_j$, en sommant sur $j=1,2$, le dénominateur vaut

$$\big(x_1^\rho+x_2^\rho\big)^{(1/\rho)-1}\big(x_1^\rho+x_2^\rho\big)=\big(x_1^\rho+x_2^\rho\big)^{1/\rho}$$

d'où, en formant le rapport :

$$\boxed{\;p_1=x_1^{\,\rho-1}\big(x_1^\rho+x_2^\rho\big)^{-1}, \qquad p_2=x_2^{\,\rho-1}\big(x_1^\rho+x_2^\rho\big)^{-1}\;}$$

**Le commentaire du livre, qui referme la boucle :**

> *« Notez soigneusement que **ce sont précisément les solutions des conditions du premier ordre de l'exemple 2.1**, après substitution de $r\equiv\rho/(\rho-1)$. Ce n'est pas une coïncidence. En général, **les solutions du problème de maximisation d'utilité donnent la demande marshallienne comme fonction des prix**, et **les solutions de son dual — le problème de minimisation de l'utilité indirecte normalisée — donnent les demandes inverses comme fonctions des quantités**. »*

> **La symétrie complète des quatre problèmes, à mémoriser.**
>
> | Problème | Ce qui est donné | Ce qu'on obtient |
> |---|---|---|
> | $\max u(x)$ s.c. $p\cdot x\leq y$ | prix, revenu | $x(p,y)$ — demande **marshallienne** |
> | $\min p\cdot x$ s.c. $u(x)\geq u$ | prix, utilité | $x^h(p,u)$ — demande **hicksienne** |
> | $\min v(p,1)$ s.c. $p\cdot x=1$ | **quantités** | $p(x)$ — demande **inverse** |
> | (le quatrième, symétrique, n'est pas traité par le livre) |  |  |

## 🔴 Concept 6 — L'intégrabilité (§2.2)

### 6.1 D'abord, élaguer la liste

> *« Au chapitre 1, nous avons montré que la fonction de demande d'un consommateur maximisateur doit satisfaire l'homogénéité de degré zéro, l'équilibre budgétaire, la symétrie et la semi-définie négativité, ainsi que les agrégations de Cournot et d'Engel. **Mais, en réalité, il y a de la redondance dans ces conditions.** »*

| Condition | Statut |
|---|---|
| Agrégations d'Engel et de Cournot | **redondantes** — elles découlent du seul équilibre budgétaire (théorème 1.17) |
| Homogénéité de degré zéro | **redondante** — elle découle de l'équilibre budgétaire **et** de la symétrie (théorème 2.5) |
| Équilibre budgétaire, symétrie, semi-définie négativité | **les trois seules vraiment indépendantes** |

### 6.2 Théorème 2.5 — budget + symétrie ⟹ homogénéité

> **THEOREM 2.5 — Budget Balancedness and Symmetry Imply Homogeneity.** If $x(p,y)$ satisfies budget balancedness and its Slutsky matrix is symmetric, then it is **homogeneous of degree zero** in $p$ and $y$.

**Preuve.** De l'équilibre budgétaire, en dérivant l'identité $y=p\cdot x(p,y)$ (comme au théorème 1.17) :

$$\sum_{j=1}^n p_j\frac{\partial x_j(p,y)}{\partial p_i}=-x_i(p,y) \tag{P.1}$$

$$\sum_{j=1}^n p_j\frac{\partial x_j(p,y)}{\partial y}=1 \tag{P.2}$$

Fixons $p$ et $y$, et posons $f_i(t)=x_i(tp,ty)$ pour $t>0$. **Il faut montrer $f_i'(t)=0$ pour tout $t>0$.**

$$f_i'(t)=\sum_{j=1}^n \frac{\partial x_i(tp,ty)}{\partial p_j}\,p_j+\frac{\partial x_i(tp,ty)}{\partial y}\,y \tag{P.3}$$

**L'astuce.** Par l'équilibre budgétaire appliqué en $(tp,ty)$ : $tp\cdot x(tp,ty)=ty$. En divisant par $t>0$ :

$$y=\sum_{j=1}^n p_j\,x_j(tp,ty) \tag{P.4}$$

En substituant (P.4) pour $y$ dans (P.3) et en regroupant :

$$f_i'(t)=\sum_{j=1}^n p_j\left[\frac{\partial x_i(tp,ty)}{\partial p_j}+\frac{\partial x_i(tp,ty)}{\partial y}\,x_j(tp,ty)\right]$$

> *« Mais le terme entre crochets est le **$ij$-ème élément de la matrice de Slutsky**, qui, par hypothèse, est **symétrique**. Par conséquent nous pouvons **échanger $i$ et $j$** à l'intérieur de ces crochets et maintenir l'égalité. »*

$$f_i'(t)=\sum_{j=1}^n p_j\left[\frac{\partial x_j(tp,ty)}{\partial p_i}+\frac{\partial x_j(tp,ty)}{\partial y}\,x_i(tp,ty)\right]$$

$$=\sum_j p_j\frac{\partial x_j(tp,ty)}{\partial p_i}+x_i(tp,ty)\sum_j p_j\frac{\partial x_j(tp,ty)}{\partial y}$$

$$=\frac1t\sum_j (tp_j)\frac{\partial x_j(tp,ty)}{\partial p_i}+x_i(tp,ty)\,\frac1t\sum_j (tp_j)\frac{\partial x_j(tp,ty)}{\partial y}$$

$$=\frac1t\big[-x_i(tp,ty)\big]+x_i(tp,ty)\cdot\frac1t\big[1\big] \;=\; 0$$

*« où les deux dernières égalités découlent de (P.1) et (P.2) **évaluées en $(tp,ty)$**. »* $\blacksquare$

> **Le pivot de la preuve — à repérer.** Tout tient dans **une seule ligne** : le crochet est un terme de Slutsky, donc on peut y échanger $i$ et $j$. Avant l'échange, la somme porte sur les dérivées de $x_i$ ; après, sur celles de $x_j$ — et ce sont **celles-là** que (P.1) et (P.2) savent évaluer.
>
> ⚠️ **Le facteur $1/t$ n'est pas cosmétique.** Il faut faire apparaître $tp_j$ pour pouvoir appliquer (P.1) et (P.2) **au point $(tp,ty)$**, où elles sont valides. Écrire $p_j$ au lieu de $tp_j$ ferait échouer la substitution.

### 6.3 Les trois conditions

> *« Ainsi, si $x(p,y)$ est le système de demandes d'un maximisateur d'utilité, nous pouvons résumer (de façon compacte) les implications pour le comportement observable dans **ces trois items seulement** : »*

$$\boxed{\begin{array}{ll} \textbf{Équilibre budgétaire :} & p\cdot x(p,y)=y\\[1mm] \textbf{Semi-définie négativité :} & s(p,y) \text{ semi-définie négative}\\[1mm] \textbf{Symétrie :} & s(p,y) \text{ symétrique} \end{array}}$$

> *« Nous aimerions savoir si cette liste est **exhaustive**. C'est-à-dire, sont-ce là les **seules** implications pour le comportement observable qui découlent de notre modèle ? Y a-t-il peut-être d'autres implications que nous n'avons pas encore découvertes ? **Remarquablement, on peut montrer que cette liste est en fait complète** — il n'y a **aucune autre restriction indépendante** imposée au comportement de demande par la théorie du consommateur maximisateur d'utilité. »*

### 6.4 L'idée d'Antonelli

> *« Mais comment commence-t-on à prouver un tel résultat ? La méthode de solution est **ingénieuse**, et ses origines remontent à **Antonelli (1886)**. L'idée est celle-ci : supposons qu'on nous donne une fonction vectorielle des prix et du revenu, et que nous soyons ensuite capables de **construire une fonction d'utilité qui engendre précisément cette même fonction comme fonction de demande**. Alors, clairement, cette fonction de départ **doit** être cohérente avec notre théorie, parce qu'elle **est** en fait la fonction de demande d'un consommateur ayant la fonction d'utilité que nous avons construite. »*

> *« L'intuition d'Antonelli fut de réaliser que si la fonction de départ satisfait **seulement les trois conditions précédentes**, alors il **doit** exister une fonction d'utilité qui l'engendre comme fonction de demande. Le problème de récupérer la fonction d'utilité d'un consommateur à partir de sa fonction de demande est connu comme le **problème d'intégrabilité**. »*

**La conclusion logique, en toutes lettres :**

> *« **Le comportement de demande est cohérent avec la théorie de la maximisation d'utilité si et seulement s'il satisfait l'équilibre budgétaire, la semi-définie négativité et la symétrie.** »*

### 6.5 Théorème 2.6 — le théorème d'intégrabilité

> **THEOREM 2.6 — Integrability Theorem.** A continuously differentiable function $x:\mathbb{R}^{n+1}_{++}\to\mathbb{R}^n_+$ is the demand function generated by **some increasing, quasiconcave utility function** if (and only if, when utility is continuous, strictly increasing, and strictly quasiconcave) it satisfies **budget balancedness**, **symmetry**, and **negative semidefiniteness**.

### 6.6 L'esquisse de preuve — la version Hurwicz-Uzawa

> *« Nous esquissons maintenant une preuve du résultat d'Antonelli. Cependant, nous adopterons l'approche **moderne** de ce problème développée par **Hurwicz et Uzawa (1971)**. Leur stratégie de preuve est une **belle illustration de la puissance de la théorie de la dualité**. »*

**Pas 1 — l'hypothèse de travail.** Considérons une fonction de dépense arbitraire $e(p,u)$, engendrée par une certaine utilité $u(x)$ croissante et quasiconcave, qui engendre elle-même une demande marshallienne $x^m(p,y)$. *« À ce stade, il n'y a besoin d'aucune relation entre $x(\cdot)$ et $e(\cdot)$, $x(\cdot)$ et $u(\cdot)$, ou $x(\cdot)$ et $x^m(\cdot)$. »*

**Supposons pourtant** que $x(\cdot)$ et $e(\cdot)$ soient liées par

$$\boxed{\;\frac{\partial e(p,u)}{\partial p_i}=x_i\big(p,\,e(p,u)\big) \qquad \forall(p,u),\ i=1,\dots,n\;} \tag{P.1}$$

**Pas 2 — ce que (P.1) implique.** Si (P.1) tient, alors $x(p,y)$ **est** la demande engendrée par $u(x)$. Le raisonnement :

| Pas | Affirmation | Justification |
|---|---|---|
| a | $x^h(p,u)=x\big(p,e(p,u)\big)$ (P.2) | (P.1) + **Shephard** (le membre gauche de (P.1) est $x^h$) |
| b | $x^h(p,u)=x^m\big(p,e(p,u)\big)$ (P.3) | **théorème 1.9** |
| c | donc $x\big(p,e(p,u)\big)=x^m\big(p,e(p,u)\big)$ (P.4) | (a) = (b) |
| d | or, à $p$ fixé, $e(p,u)$ **prend toute valeur non négative** quand $u$ parcourt son domaine | $e$ strictement croissante et non bornée en $u$ |
| e | donc $x(p,y)=x^m(p,y)$ pour tout $(p,y)$ | (c) + (d) |

*« Malgré le fait que ni le lemme de Shephard ni le théorème 1.9 ne puissent peut-être être appliqués [à ce stade], la conclusion précédente peut être établie. »*

**Pas 3 — la tâche restante.** *« Nous avons donc réduit notre tâche à montrer qu'il **existe** une fonction de dépense $e(p,u)$ reliée à $x(p,y)$ selon (P.1). »*

> *« Or, trouver une fonction de dépense telle que (P.1) tienne n'est pas une mince affaire. En effet, (P.1) est connu dans la littérature mathématique comme un **système d'équations aux dérivées partielles**. Bien que de tels systèmes soient souvent notoirement difficiles à résoudre, il existe un résultat important qui nous dit **précisément quand une solution est garantie d'exister**. Et, pour nos besoins, **l'existence suffit**. »*

**Pas 4 — la condition de Frobenius.** Si (P.1) a une solution $e(p,u)$, alors en dérivant les deux membres par $p_j$ :

$$\frac{\partial^2 e(p,u)}{\partial p_j\partial p_i}=\frac{\partial x_i\big(p,e(p,u)\big)}{\partial p_j}+\frac{\partial e(p,u)}{\partial p_j}\cdot\frac{\partial x_i\big(p,e(p,u)\big)}{\partial y}$$

Par Shephard, en utilisant (P.2) et en posant $y=e(p,u)$ :

$$\frac{\partial^2 e(p,u)}{\partial p_j\partial p_i}=\underbrace{\frac{\partial x_i(p,y)}{\partial p_j}+x_j(p,y)\frac{\partial x_i(p,y)}{\partial y}}_{\text{le } ij\text{-ème terme de SLUTSKY}} \tag{P.5}$$

> *« Le membre de gauche de (P.5) est **symétrique** en $i$ et $j$ par le **théorème de Young**. Par conséquent, (P.5) implique que le membre de droite doit être symétrique aussi. Donc la symétrie du membre de droite est une condition **nécessaire** à l'existence d'une solution. »*

> *« **Remarquablement, il s'avère que cette condition est aussi suffisante.** Selon le **théorème de Frobenius**, une solution de (P.1) existe **si et seulement si** le membre de droite de (P.5) est symétrique en $i$ et $j$. Prenez un regard attentif sur ce membre de droite : c'est **précisément le $ij$-ème terme de la matrice de Slutsky** associée à $x(p,y)$. Par conséquent, parce que cette matrice satisfait la symétrie, une fonction $e(p,u)$ satisfaisant (P.1) est **garantie d'exister**. »*

**Pas 5 — mais est-ce une vraie fonction de dépense ?** *« Le théorème de Frobenius est muet sur cette question. Cependant, par le **théorème 2.2**, ce sera une fonction de dépense si elle a toutes les propriétés listées au théorème 1.7. »*

| Propriété du théorème 1.7 | D'où elle vient |
|---|---|
| croissante en $p$ | de (P.1) et de la non-négativité de $x(p,y)$ — **automatique** |
| lemme de Shephard | **garanti par construction** |
| continue, strictement croissante et non bornée en $u$, nulle en $u=0$ | *« on peut s'en assurer »* |
| **homogène de degré 1 en $p$** | de (P.1) et de l'**équilibre budgétaire** — c'est l'**exercice 2.4** |
| **concave en $p$** | ⟺ hessienne en $p$ semi-définie négative (A2.4) ⟺ par (P.5), **matrice de Slutsky semi-définie négative** |

> *« Au total nous avons établi ceci : **une solution $e(\cdot)$ de (P.1) existe et est une fonction de dépense si et seulement si $x(p,y)$ satisfait l'équilibre budgétaire, la symétrie et la semi-définie négativité.** C'est précisément ce que nous nous étions proposé de montrer. »* $\blacksquare$

> **La cartographie des trois conditions — c'est LE tableau de la fiche.**
>
> | Condition sur $x(p,y)$ | Ce qu'elle garantit sur $e$ | Via |
> |---|---|---|
> | **Symétrie** de $s(p,y)$ | l'**existence** d'une solution à (P.1) | théorème de **Frobenius** |
> | **Semi-définie négativité** de $s(p,y)$ | la **concavité** de $e$ en $p$ | (P.5) + théorème A2.4 |
> | **Équilibre budgétaire** | l'**homogénéité de degré 1** de $e$ en $p$ | exercice 2.4 |
>
> Chaque condition observable correspond **exactement** à une propriété de la fonction de dépense. C'est cette correspondance terme à terme qui rend la liste **complète**.

### 6.7 Le bénéfice pratique

> *« Bien que nous ayons souligné l'importance de ce résultat pour la théorie elle-même, il y a aussi des **bénéfices pratiques**. Par exemple, si l'on souhaite estimer la fonction de demande d'un consommateur sur la base d'une quantité limitée de données, et que l'on souhaite imposer comme restriction que la fonction de demande soit **engendrée par une utilité**, on est désormais libre de spécifier **n'importe quelle forme fonctionnelle** pour la demande **tant qu'elle satisfait l'équilibre budgétaire, la symétrie et la semi-définie négativité**. Comme nous le savons maintenant, toute demande de ce type est **garantie** d'être engendrée par une utilité. »*

### 6.8 Exemple 2.3 — récupérer $e$ à partir d'une demande, sur trois biens

**Les données.** Trois biens, et un comportement résumé par

$$x_i(p_1,p_2,p_3,y)=\frac{\alpha_i\,y}{p_i}, \qquad i=1,2,3, \qquad \alpha_i>0,\ \ \alpha_1+\alpha_2+\alpha_3=1.$$

*« Il est simple de vérifier que le vecteur des demandes satisfait l'équilibre budgétaire, la symétrie et la semi-définie négativité. Par conséquent, par le théorème 2.6, $x(p,y)$ **doit** être engendrée par une utilité. »*

**Le système à résoudre.** Il s'agit de trouver $e(p_1,p_2,p_3,u)$ telle que

$$\frac{\partial e(p,u)}{\partial p_i}=\frac{\alpha_i\,e(p,u)}{p_i}, \qquad i=1,2,3.$$

**L'astuce du logarithme.** *« Notez d'abord que cela peut se réécrire »*

$$\frac{\partial \ln\big(e(p,u)\big)}{\partial p_i}=\frac{\alpha_i}{p_i}, \qquad i=1,2,3 \tag{E.1}$$

> *« Si l'on vous demandait de trouver $f(x)$ sachant que $f'(x)=\alpha/x$, vous n'auriez aucune difficulté à déduire $f(x)=\alpha\ln(x)+\text{constante}$. Mais (E.1) dit juste cela, où $f=\ln(e)$. **Le seul élément supplémentaire à garder en tête est que, lorsqu'on dérive partiellement par rapport à $p_1$, toutes les autres variables — $p_2$, $p_3$ et $u$ — sont traitées comme des constantes.** »*

$$\begin{aligned} \ln\big(e(p,u)\big) &= \alpha_1\ln(p_1)+c_1(p_2,p_3,u)\\ \ln\big(e(p,u)\big) &= \alpha_2\ln(p_2)+c_2(p_1,p_3,u)\\ \ln\big(e(p,u)\big) &= \alpha_3\ln(p_3)+c_3(p_1,p_2,u) \end{aligned} \tag{E.2}$$

> *« où les $c_i(\cdot)$ jouent le rôle de la constante ajoutée précédemment. Mais nous devons choisir les $c_i(\cdot)$ de sorte que **les trois égalités tiennent simultanément**. Avec un peu de réflexion, vous vous convaincrez que (E.2) implique alors »*

$$\ln\big(e(p,u)\big)=\alpha_1\ln(p_1)+\alpha_2\ln(p_2)+\alpha_3\ln(p_3)+c(u)$$

$$\Longrightarrow\qquad e(p,u)=c(u)\,p_1^{\alpha_1}p_2^{\alpha_2}p_3^{\alpha_3}$$

**Le choix de $c(u)$.** *« Parce que nous devons nous assurer que $e(\cdot)$ est strictement croissante en $u$, nous pouvons choisir $c(u)$ comme **n'importe quelle fonction strictement croissante**. Peu importe laquelle, parce que le comportement de demande impliqué sera **indépendant** de telles transformations strictement croissantes. »*

En prenant $c(u)=u$ :

$$\boxed{\;e(p,u)=u\,p_1^{\alpha_1}p_2^{\alpha_2}p_3^{\alpha_3}\;}$$

<details class="details--riche">
<summary>

**Vérifier l'exemple 2.3 de bout en bout**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre laisse la vérification au lecteur (« nous vous laissons vérifier »).</span>

</div>

**1. La solution vérifie bien le système.**

$$\frac{\partial e}{\partial p_1}=u\,\alpha_1 p_1^{\alpha_1-1}p_2^{\alpha_2}p_3^{\alpha_3}=\frac{\alpha_1}{p_1}\cdot u\,p_1^{\alpha_1}p_2^{\alpha_2}p_3^{\alpha_3}=\frac{\alpha_1\,e(p,u)}{p_1} \quad$$

**2. Elle a les propriétés d'une fonction de dépense.**

| Propriété | Vérification |
|---|---|
| nulle au plus bas $u$ | $e(p,0)=0$ |
| continue | produit de fonctions continues |
| str. croissante et non bornée en $u$ | $\partial e/\partial u=p_1^{\alpha_1}p_2^{\alpha_2}p_3^{\alpha_3}>0$ |
| croissante en $p$ | $\partial e/\partial p_i=\alpha_i e/p_i>0$ |
| **homogène de degré 1** en $p$ | $e(tp,u)=u\,t^{\alpha_1+\alpha_2+\alpha_3}\prod p_i^{\alpha_i}=t\,e(p,u)$ — **c'est ici que $\sum\alpha_i=1$ sert** |
| **concave** en $p$ | $\ln e$ est linéaire en $\ln p_i$ ; une Cobb-Douglas d'exposants positifs sommant à 1 est concave sur $\mathbb{R}^3_{++}$ |
| Shephard | $\partial e/\partial p_i=\alpha_i e/p_i = x_i^h$ par construction |

**3. Elle redonne bien la demande de départ.** Par inversion, $v(p,y)=y\,\big(p_1^{\alpha_1}p_2^{\alpha_2}p_3^{\alpha_3}\big)^{-1}$. Par Roy :

$$x_i=-\frac{\partial v/\partial p_i}{\partial v/\partial y}=-\frac{-\alpha_i\,y\,p_i^{-1}\prod_j p_j^{-\alpha_j}}{\prod_j p_j^{-\alpha_j}}=\frac{\alpha_i y}{p_i} \quad$$

**4. La vérification des trois conditions du théorème 2.6 sur $x_i=\alpha_i y/p_i$**, que le livre déclare « simple » :

*Équilibre budgétaire :* $\sum_i p_ix_i = \sum_i \alpha_i y = y$ (c'est là encore $\sum\alpha_i=1$).

*Termes de Slutsky :* pour $i\neq j$, $\dfrac{\partial x_i}{\partial p_j}=0$ et $\dfrac{\partial x_i}{\partial y}=\dfrac{\alpha_i}{p_i}$, donc

$$s_{ij}=0+\frac{\alpha_j y}{p_j}\cdot\frac{\alpha_i}{p_i}=\frac{\alpha_i\alpha_j\,y}{p_ip_j}$$

qui est **manifestement symétrique** en $i$ et $j$ .

*Termes diagonaux :* $\dfrac{\partial x_i}{\partial p_i}=-\dfrac{\alpha_i y}{p_i^2}$, donc

$$s_{ii}=-\frac{\alpha_i y}{p_i^2}+\frac{\alpha_i y}{p_i}\cdot\frac{\alpha_i}{p_i}=\frac{\alpha_i y}{p_i^2}(\alpha_i-1)\ <\ 0 \quad  \ \ \text{(car } 0<\alpha_i<1)$$

*Semi-définie négativité :* on peut écrire d'un seul coup $s_{ij}=y\big(\alpha_i\alpha_j-\alpha_i\delta_{ij}\big)/(p_ip_j)$. En posant $z_i\equiv\zeta_i/p_i$ :

$$\zeta^{\mathsf T}s\,\zeta \;=\; y\left[\left(\sum_i \alpha_i z_i\right)^{\!2}-\sum_i \alpha_i z_i^2\right] \;\leq\; 0$$

par l'**inégalité de Jensen** appliquée à la fonction convexe $t\mapsto t^2$ avec les poids $\alpha_i$ sommant à 1 .

> **La leçon de l'exemple.** C'est une demande **Cobb-Douglas** (parts budgétaires constantes $\alpha_i$, fiche 501). L'exemple montre que **partir des données observées** — les parts constantes — et remonter mécaniquement par le système d'équations aux dérivées partielles redonne exactement la fonction de dépense Cobb-Douglas, sans jamais avoir postulé de préférences.
>
> **L'exercice 2.5** demande d'aller un pas plus loin : appliquer la construction du théorème 2.1 à cette $e(p,u)$ pour récupérer une fonction d'utilité, qui doit être $u(x)=x_1^{\alpha_1}x_2^{\alpha_2}x_3^{\alpha_3}$ à transformation croissante près.

</details>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Une fonction $E(p,u)$ donnée + « est-ce une fonction de dépense ? » | **Vérification des 7 propriétés** | Théorème 1.7 propriété par propriété ; si toutes passent, les thm 2.1-2.2 concluent |
| « récupérer $u(x)$ à partir de $e(p,u)$ » | **Construction $A(u)$** | $u(x)=\max\{u\geq0 \mid p\cdot x\geq e(p,u)\ \forall p\gg0\}$ |
| « récupérer $u(x)$ à partir de $v(p,y)$ » | **Théorème 2.3** | Utiliser **(T.1′)** : $\min v(p,1)$ s.c. $p\cdot x=1$ |
| « dériver les demandes inverses » | **Hotelling-Wold** | $p_i(x)=\dfrac{\partial u/\partial x_i}{\sum_j x_j\,\partial u/\partial x_j}$ |
| Une $x(p,y)$ donnée + « est-elle engendrée par une utilité ? » | **Théorème 2.6** | Tester les **trois** conditions, rien de plus |
| « résoudre $\partial e/\partial p_i = x_i(p,e)$ » | **Intégrabilité pratique** | Diviser par $e$ pour faire apparaître $\partial\ln e/\partial p_i$, intégrer, recoller les constantes |
| « la convexité / monotonicité est-elle testable ? » | **§2.1.2** | Non, sous prix positifs — construire $w(x)$ |
| « montrer qu'une restriction est redondante » | **Thm 1.17 ou 2.5** | Engel et Cournot ⟸ budget ; homogénéité ⟸ budget + symétrie |

**Les deux questions de cadrage :**

1. **Dans quel sens va-t-on ?** $u\to e,v\to$ demandes (chapitre 1), ou demandes $\to e\to u$ (chapitre 2) ? La réponse dicte tous les outils.
2. **A-t-on besoin de construire, ou seulement de savoir que ça existe ?** Le théorème 2.6 est un résultat d'**existence** : pour répondre « oui, c'est une demande valide », il suffit de vérifier trois conditions — jamais de produire la $u$.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Vérifier qu'une $E(p,u)$ est une fonction de dépense

Dérouler les sept propriétés du théorème 1.7 dans cet ordre (du moins au plus coûteux) :

| Ordre | Propriété | Test |
|---|---|---|
| 1 | $E(p,u_{\min})=0$ | évaluer |
| 2 | homogène de degré 1 en $p$ | $E(tp,u)=tE(p,u)$ |
| 3 | croissante en $p$ | $\partial E/\partial p_i\geq0$ |
| 4 | str. croissante et non bornée en $u$ | $\partial E/\partial u>0$ et $E\to\infty$ |
| 5 | continue | inspection |
| 6 | **concave en $p$** | hessienne en $p$ semi-définie négative |
| 7 | différentiable en $p$ | inspection |

Si les sept passent, **conclure par les théorèmes 2.1 et 2.2** : $E$ **est** une fonction de dépense, engendrée par une utilité croissante et quasiconcave.

### Méthode 2 — Récupérer $u(x)$ à partir de $v(p,y)$

1. Poser $y=1$ pour obtenir $v(p,1)$.
2. Écrire **(T.1′)** : $u(x)=\min_p v(p,1)$ s.c. $p\cdot x=1$.
3. Lagrangien, conditions du premier ordre, **éliminer $\lambda$ par division** — on obtient une relation entre $p_1^*/p_2^*$ et $x_1/x_2$.
4. Substituer dans la contrainte $p\cdot x=1$ pour obtenir les $p_i^*$.
5. Réinjecter dans l'objectif pour former la **fonction de valeur** $u(x)$.
6. Simplifier par un changement de variable si l'exposant s'y prête.

⚠️ **Ne pas utiliser (T.1)** : elle a une infinité de solutions (homogénéité), ce qui interdit le théorème de l'enveloppe et complique la résolution.

### Méthode 3 — Résoudre le système d'intégrabilité $\partial e/\partial p_i = x_i(p,e)$

1. **Diviser par $e$** pour obtenir $\dfrac{\partial \ln e}{\partial p_i}=\dfrac{x_i(p,e)}{e}$. Si la demande est de la forme $\alpha_i y/p_i$, le membre de droite devient $\alpha_i/p_i$ — indépendant de $e$, ce qui rend le système intégrable directement.
2. **Intégrer chaque équation séparément**, en traitant les autres variables comme des constantes : $\ln e = \alpha_i\ln p_i + c_i(\text{le reste})$.
3. **Recoller** : trouver la forme qui satisfait les $n$ équations **simultanément**.
4. **Choisir $c(u)$** strictement croissante — n'importe laquelle, le plus simple étant $c(u)=u$.
5. **Vérifier** : la solution doit satisfaire le système de départ **et** avoir les sept propriétés du théorème 1.7.

### Méthode 4 — Tester si une $x(p,y)$ est engendrée par une utilité

Trois vérifications, et trois seulement :

1. **Équilibre budgétaire** : $\sum_i p_ix_i(p,y)=y$ — le plus rapide, à faire en premier.
2. **Symétrie** : calculer $s_{ij}=\dfrac{\partial x_i}{\partial p_j}+x_j\dfrac{\partial x_i}{\partial y}$ et comparer à $s_{ji}$.
3. **Semi-définie négativité** : mineurs principaux, ou forme quadratique directe.

⚠️ **Ne pas vérifier l'homogénéité** : elle est **impliquée** par 1 et 2 (théorème 2.5). La vérifier n'est pas faux, mais c'est du travail perdu — et si elle échoue alors que 1 et 2 passent, c'est qu'il y a une erreur de calcul.

### Méthode 5 — Démontrer une redondance

**Le schéma commun** (théorèmes 1.17 et 2.5) :

1. Partir de l'identité $y=p\cdot x(p,y)$.
2. La **dériver** par rapport à la variable pertinente.
3. Utiliser l'hypothèse supplémentaire disponible — la **symétrie de Slutsky** dans le théorème 2.5 — pour **échanger des indices** dans une somme.
4. Réappliquer les identités du pas 2 **au point transformé** $(tp,ty)$.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que le théorème 2.1 suffit à conclure que $E$ est une fonction de dépense | Il ne dit que ceci : la $u$ construite est croissante, non bornée, quasiconcave | Il faut **aussi** le théorème **2.2** |
| 2 | Définir $u(x)$ comme le **min** au lieu du **max** dans la construction $A(u)$ | $E$ est croissante en $u$ : c'est le plus grand $u$ compatible qui est le bon | $u(x)=\max\{u\geq0 \mid x\in A(u)\}$ |
| 3 | Prendre l'intersection sur un nombre fini de prix | La construction exige **tous** les $p\gg0$ | $A(u)=\bigcap_{p\gg0}A(p,u)$ |
| 4 | Dans la preuve du thm 2.2, utiliser la concavité pour obtenir $E(p^0,u^0)=p^0\cdot x^0$ | C'est **Euler** (homogénéité de degré 1) qui donne cette égalité | Concavité ⟹ (P.8) ; Euler ⟹ $E(p^0,u^0)=p^0\cdot x^0$ |
| 5 | Conclure que convexité et monotonicité sont « inutiles » | Elles restent indispensables pour l'**unicité**, la différentiabilité, l'équilibre général | Elles n'ont pas d'implications **observables** |
| 6 | Oublier la réserve sur les prix négatifs | Fig. 2.2(e) : avec $p_2<0$, la monotonicité **a** des conséquences observables | Le résultat suppose $p\gg0$ |
| 7 | Croire que $w(x)=u(x)$ toujours | Elles coïncident seulement là où $u$ est déjà croissante et quasiconcave | $w\geq u$, avec égalité sur les traits épais de la Fig. 2.2(c) |
| 8 | Croire que la réciproque du §2.1.2 est vraie | Le livre écrit : *« Attention, la réciproque est fausse »* | $x$ maximise $u$ ⟹ $x$ maximise $w$ ; l'inverse non |
| 9 | Utiliser (T.1) au lieu de (T.1′) pour un calcul | (T.1) a une **infinité** de solutions ; le théorème de l'enveloppe ne s'y applique pas | Normaliser par $p\cdot x=1$ |
| 10 | Dans le théorème 2.3, lire $p^0 = u(x^0)$ | Le symbole est le **gradient** : $p^0=\nabla u(x^0)$ | Sans quoi (P.2) est fausse |
| 11 | Croire que le thm 2.3 exige la stricte quasiconcavité | Il n'exige que la **quasiconcavité** — c'est ce qu'il faut pour invoquer le thm 1.4 | + dérivées partielles strictement positives |
| 12 | Inverser les indices dans Hotelling-Wold | Le numérateur est $\partial u/\partial x_i$ ; le dénominateur est une **somme sur tous les $j$** | $p_i(x)=\dfrac{\partial u/\partial x_i}{\sum_j x_j\partial u/\partial x_j}$ |
| 13 | Croire que Hotelling-Wold vaut pour un revenu quelconque | Le théorème est énoncé pour $y=1$ | La normalisation est **dans** la formule |
| 14 | Vérifier l'homogénéité pour tester le thm 2.6 | Elle est **impliquée** par budget + symétrie (thm 2.5) | Tester **trois** conditions, pas quatre |
| 15 | Croire que le thm 2.5 utilise la semi-définie négativité | Il n'utilise que le **budget** et la **symétrie** | Relire la preuve : seule la symétrie sert à l'échange d'indices |
| 16 | Dans la preuve du thm 2.5, écrire $p_j$ au lieu de $tp_j$ | (P.1) et (P.2) doivent être appliquées **au point $(tp,ty)$** | D'où le facteur $1/t$ |
| 17 | Croire que Frobenius garantit que $e$ est une fonction de dépense | *« Le théorème de Frobenius est muet sur cette question »* | Il ne donne que l'**existence** d'une solution |
| 18 | Associer la mauvaise condition à la mauvaise propriété | Symétrie ⟹ existence (Frobenius) · SDN ⟹ concavité · budget ⟹ homogénéité de degré 1 | Retenir la table de correspondance |
| 19 | Dans l'exemple 2.3, oublier que $\sum\alpha_i=1$ | C'est ce qui donne l'homogénéité de degré 1 **et** l'équilibre budgétaire | Le signaler explicitement |
| 20 | Croire qu'il faut construire $u$ pour répondre « oui, c'est une demande valide » | Le thm 2.6 est un résultat d'**existence** | Vérifier les trois conditions suffit |

## 📌 Ultimate Review

**§2.1.1 — de la dépense vers l'utilité.**

$$A(p,u)=\{x\in\mathbb{R}^n_+ \mid p\cdot x\geq E(p,u)\} \qquad A(u)=\bigcap_{p\gg0}A(p,u)$$

$$u(x)\equiv\max\{u\geq0 \mid x\in A(u)\}=\max\{u\geq0 \mid p\cdot x\geq E(p,u)\ \forall p\gg0\}$$

| Théorème | Énoncé |
|---|---|
| **2.1** | si $E$ a les propriétés 1-7 du thm 1.7, la $u$ construite est **croissante, non bornée, quasiconcave** |
| **2.2** | et la fonction de dépense engendrée par cette $u$ **est exactement $E$** |

*Preuve de 2.2 : poser $x^0=\partial E(p^0,u^0)/\partial p$ ; **Euler** donne $E(p^0,u^0)=p^0\cdot x^0$, la **concavité** donne $p\cdot x^0\geq E(p,u^0)$ donc $u(x^0)\geq u^0$.*

**Conséquence :** on peut **partir de $E$** au lieu de $u$ —

$$E \xrightarrow{\ \partial/\partial p_i\ } x^h \xrightarrow{\ \text{inversion}\ } v \xrightarrow{\ \text{Roy}\ } x(p,y)$$

**§2.1.2 — convexité et monotonicité.** Avec $u$ seulement **continue**, construire $e$ puis $w$. Alors $w\geq u$, $w$ est **croissante et quasiconcave**, et **tout maximiseur de $u$ sous budget maximise $w$**. Donc ces deux axiomes n'ont **aucune implication observable** — **à prix non négatifs** (note 1, Fig. 2.2e).

**§2.1.3 — de l'utilité indirecte vers l'utilité directe.**

$$u(x)=\min_{p\gg0} v(p,\,p\cdot x) \quad \text{(T.1)} \qquad u(x)=\min_{p\gg0} v(p,1) \ \text{s.c.}\ p\cdot x=1 \quad \text{(T.1′)}$$

**Théorème 2.3** : vrai si $u$ est **quasiconcave, différentiable, à dérivées partielles $>0$**. *Preuve : poser $p^0=\nabla u(x^0)$, $\lambda^0=1$ ; les conditions du premier ordre sont satisfaites, et le **théorème 1.4** les rend suffisantes.*

⚠️ **(T.1′) est préférable** : (T.1) a toujours une infinité de solutions (homogénéité), donc le théorème de l'enveloppe n'y est pas applicable.

**Théorème 2.4 (Hotelling, Wold)** — demandes inverses, pour $y=1$ :

$$\boxed{\;p_i(x)=\frac{\partial u(x)/\partial x_i}{\sum_{j} x_j\big(\partial u(x)/\partial x_j\big)}\;}$$

*Preuve : enveloppe sur $\mathcal{L}=v(p,1)-\lambda(1-p\cdot x)$ donne $\partial u/\partial x_i=\lambda^*p_i^*$ ; multiplier par $x_i$, sommer, utiliser $p(x)\cdot x=1$ pour identifier $\lambda^*$.*

**§2.2 — l'intégrabilité.**

**Élagage :** — agrégations d'Engel et Cournot ⟸ **budget** (thm 1.17) ; — homogénéité ⟸ **budget + symétrie** (thm **2.5**).

**Les trois conditions indépendantes :**

$$\boxed{\text{équilibre budgétaire} \quad\cdot\quad \text{symétrie de } s(p,y) \quad\cdot\quad \text{semi-définie négativité de } s(p,y)}$$

**THÉORÈME 2.6 (intégrabilité).** Une $x:\mathbb{R}^{n+1}_{++}\to\mathbb{R}^n_+$ continûment différentiable est la demande engendrée par une utilité croissante et quasiconcave **si et seulement si** elle satisfait ces trois conditions. **La liste est complète.**

**La preuve (Antonelli 1886 ; Hurwicz-Uzawa 1971)** — chercher $e$ solution de

$$\frac{\partial e(p,u)}{\partial p_i}=x_i\big(p,e(p,u)\big) \tag{P.1}$$

| Condition sur $x(p,y)$ | Ce qu'elle donne sur $e$ | Via |
|---|---|---|
| **symétrie** | l'**existence** d'une solution à (P.1) | **Frobenius** |
| **semi-définie négativité** | la **concavité** en $p$ | (P.5) + A2.4 |
| **équilibre budgétaire** | l'**homogénéité de degré 1** en $p$ | exercice 2.4 |

**Exemple 2.3.** $x_i=\alpha_i y/p_i$ avec $\sum\alpha_i=1$ ⟹ $\dfrac{\partial \ln e}{\partial p_i}=\dfrac{\alpha_i}{p_i}$ ⟹

$$e(p,u)=c(u)\,p_1^{\alpha_1}p_2^{\alpha_2}p_3^{\alpha_3}, \qquad\text{et en prenant } c(u)=u : \quad e(p,u)=u\,\prod_i p_i^{\alpha_i}$$

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quel renversement de perspective le chapitre 2 opère-t-il ?**

</summary>

Le chapitre 1 va des **préférences** vers la **demande** ; le chapitre 2 remonte de la **demande** vers les **préférences**.

Le livre : *« une théorie équivalente aurait pu être développée en partant d'axiomes sur le **comportement de dépense** »*.

L'enjeu final : caractériser **complètement** les restrictions que la théorie impose au comportement observable — c'est-à-dire savoir non seulement ce qu'elle prédit, mais **tout ce qu'elle prédit et rien d'autre**.

</details>

<details class="details--riche">
<summary>

**2. Décrire la construction $A(u)$ en trois étapes.**

</summary>

1. **Un demi-espace par prix** : $A(p,u)=\{x\in\mathbb{R}^n_+ \mid p\cdot x\geq E(p,u)\}$ — convexe fermé, au-dessus de l'hyperplan.
2. **L'intersection sur tous les prix** : $A(u)=\bigcap_{p\gg0}A(p,u)$.
3. **L'utilité** : $u(x)=\max\{u\geq0 \mid x\in A(u)\}$.

⚠️ L'intersection porte sur **tous** les $p\gg0$, pas sur un échantillon fini.

</details>

<details class="details--riche">
<summary>

**3. Pourquoi cette définition de $u(x)$ et pas une autre ?**

</summary>

Parce que si $E$ **était** déjà une fonction de dépense engendrée par une $u$, alors : — par définition, $p\cdot x\geq E\big(p,u(x)\big)$ pour tout $p\gg0$, avec **égalité pour certains prix** ; — $E$ étant strictement croissante en $u$, **$u(x)$ est le plus grand $u$ tel que $p\cdot x\geq E(p,u)$ pour tout $p$**.

La construction est donc *« juste ce qu'il faut »* pour récupérer la bonne fonction — elle est calibrée sur le cas où l'on connaît déjà la réponse.

</details>

<details class="details--riche">
<summary>

**4. Qu'affirme le théorème 2.1, et pourquoi ne suffit-il pas ?**

</summary>

**Il affirme** que la $u$ construite est **croissante, non bornée supérieurement, et quasiconcave** — c'est-à-dire qu'elle satisfait nos axiomes.

**Il ne suffit pas** parce qu'il ne dit rien sur le lien entre cette $u$ et $E$. Il faut le **théorème 2.2** pour établir que la fonction de dépense engendrée par cette $u$ est **exactement $E$**.

Les deux forment un couple : 2.1 = *« c'est une utilité »*, 2.2 = *« et c'est la bonne »*.

</details>

<details class="details--riche">
<summary>

**5. Démontrer que la $u$ construite est croissante.**

</summary>

Soit $x^1\geq x^2$.

1. $p\cdot x^1\geq p\cdot x^2$ pour tout $p\gg0$ (toutes les composantes de $x^1$ dominent).
2. $p\cdot x^2\geq E\big(p,u(x^2)\big)$ pour tout $p\gg0$ (définition de $u(x^2)$).
3. Donc $p\cdot x^1\geq E\big(p,u(x^2)\big)$, c'est-à-dire $x^1\in A\big(u(x^2)\big)$.
4. Or $u(x^1)$ est le **plus grand** $u$ tel que $x^1\in A(u)$, donc $u(x^1)\geq u(x^2)$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**6. Démontrer que la $u$ construite est quasiconcave.**

</summary>

Supposons $u(x^1)=\min[u(x^1),u(x^2)]$. Comme $E$ est **strictement croissante en $u$** :

$$t\,E\big(p,u(x^1)\big)+(1-t)E\big(p,u(x^2)\big)\geq E\big(p,u(x^1)\big) \tag{P.4}$$

Par définition de $u(x^1)$ et $u(x^2)$ : $p\cdot x^1\geq E\big(p,u(x^1)\big)$ et $p\cdot x^2\geq E\big(p,u(x^2)\big)$. En pondérant par $t$ et $1-t$, en additionnant, et en utilisant (P.4) :

$$p\cdot x^t\geq E\big(p,u(x^1)\big) \qquad \forall p\gg0$$

Donc $u(x^t)\geq u(x^1)=\min[u(x^1),u(x^2)]$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**7. Quel est le candidat $x^0$ dans la preuve du théorème 2.2, et pourquoi marche-t-il ?**

</summary>

$$x^0\equiv\frac{\partial E(p^0,u^0)}{\partial p}$$

— c'est-à-dire **ce que Shephard donnerait** si $E$ était une vraie fonction de dépense.

**Deux propriétés le font marcher, chacune pour une clause :**

| Propriété de $E$ | Ce qu'elle donne |
|---|---|
| **homogène de degré 1** ⟹ **Euler** | $E(p^0,u^0)=p^0\cdot x^0$ |
| **concave en $p$** ⟹ sous ses tangentes | $p\cdot x^0\geq E(p,u^0)$ pour tout $p$, donc $u(x^0)\geq u^0$ |

⚠️ Les deux sont nécessaires ; elles ne sont **pas** interchangeables.

</details>

<details class="details--riche">
<summary>

**8. Quelle route pratique les théorèmes 2.1-2.2 ouvrent-ils ?**

</summary>

$$E(p,u) \xrightarrow{\ \partial/\partial p_i\ } x^h(p,u) \xrightarrow{\ \text{inversion en } u\ } v(p,y) \xrightarrow{\ \text{Roy}\ } x(p,y)$$

Au lieu de résoudre **deux** programmes d'optimisation, on ne fait que **dériver et inverser**.

C'est pourquoi les systèmes de demande empiriques (AIDS, translog…) sont presque toujours spécifiés par leur **fonction de dépense**.

</details>

<details class="details--riche">
<summary>

**9. Comment le §2.1.2 montre-t-il que la convexité n'a pas d'implication observable ?**

</summary>

1. Partir d'une $u(x)$ **seulement continue** — ni croissante ni quasiconcave.
2. Construire $e(p,u)$, puis $w(x)=\max\{u\geq0 \mid p\cdot x\geq e(p,u)\ \forall p\gg0\}$.
3. La preuve du théorème 2.1 montre que $w$ est **croissante et quasiconcave**.
4. On a toujours $w\geq u$, et **tout panier qui maximise $u$ sous budget maximise aussi $w$**.

Donc tout comportement engendré par une $u$ irrégulière peut l'être par une $w$ régulière : **les données ne peuvent pas distinguer les deux**.

⚠️ La réciproque est **fausse** : un maximiseur de $w$ n'est pas forcément un maximiseur de $u$.

</details>

<details class="details--riche">
<summary>

**10. Quelle réserve le livre pose-t-il sur ce résultat ?**

</summary>

Il **suppose des prix non négatifs**. En note :

> *« Si avec deux biens l'un des prix, disons $p_2$, était **négatif**, alors on pourrait avoir une situation telle que celle de la Fig. 2.2(e), où $x^*$ est optimal pour $u(x)$ mais **pas** pour la fonction croissante $w(x)$. Ainsi, **si les prix peuvent être négatifs, la monotonicité n'est pas sans conséquences observables**. »*

</details>

<details class="details--riche">
<summary>

**11. Faut-il conclure que convexité et monotonicité sont inutiles ?**

</summary>

**Non.** Elles n'ont pas d'implications **observables**, mais elles restent nécessaires pour : — l'**unicité** de la solution du problème du consommateur (fiche 501) ; — la **différentiabilité** de $x(p,y)$ ; — toute l'analyse d'**équilibre général** (existence par théorème de point fixe, chapitre 5).

Le résultat porte sur le **contenu empirique**, pas sur l'utilité analytique.

</details>

<details class="details--riche">
<summary>

**12. Énoncer le théorème 2.3 sous ses deux formes.**

</summary>

$$u(x)=\min_{p\in\mathbb{R}^n_{++}} v(p,\,p\cdot x) \tag{T.1}$$

$$u(x)=\min_{p\in\mathbb{R}^n_{++}} v(p,1) \quad\text{s.c.}\quad p\cdot x=1 \tag{T.1′}$$

**Hypothèses :** $u$ **quasiconcave**, **différentiable** sur $\mathbb{R}^n_{++}$, à **dérivées partielles strictement positives**.

</details>

<details class="details--riche">
<summary>

**13. Quelle est l'idée de la preuve du théorème 2.3 ?**

</summary>

**Choisir les prix égaux au gradient de l'utilité :**

$$p^0=\nabla u(x^0), \qquad \lambda^0=1, \qquad y^0=p^0\cdot x^0$$

Alors les conditions du premier ordre $\partial u(x^0)/\partial x_i-\lambda^0 p_i^0=0$ et $p^0\cdot x^0=y^0$ sont **automatiquement satisfaites**. Par le **théorème 1.4** (suffisance sous quasiconcavité), $x^0$ résout le problème du consommateur à ces prix, donc $u(x^0)=v(p^0,p^0\cdot x^0)$. $\blacksquare$

**Rôle des hypothèses :** quasiconcavité ⟹ théorème 1.4 applicable ; dérivées $>0$ ⟹ $p^0\gg0$.

</details>

<details class="details--riche">
<summary>

**14. Pourquoi (T.1′) est-elle préférable à (T.1) ?**

</summary>

Parce que (T.1) a **toujours une infinité de solutions** : $v$ étant homogène de degré 0, si $p^*$ résout, alors $tp^*$ aussi pour tout $t>0$.

**Conséquence technique**, énoncée par le livre : le **théorème de l'enveloppe** (A2.22) ne peut pas s'y appliquer. Or c'est précisément ce dont le théorème 2.4 a besoin.

La contrainte $p\cdot x=1$ **sélectionne un représentant unique** dans chaque rayon de prix.

</details>

<details class="details--riche">
<summary>

**15. Sur la CES, comment (T.1′) redonne-t-elle l'utilité directe ?**

</summary>

Partant de $v(p,y)=y\big(p_1^r+p_2^r\big)^{-1/r}$ et $v(p,1)=\big(p_1^r+p_2^r\big)^{-1/r}$ :

$$\min_{p} \big(p_1^r+p_2^r\big)^{-1/r} \quad\text{s.c.}\quad p_1x_1+p_2x_2=1$$

L'élimination de $\lambda$ donne $\dfrac{p_1^*}{p_2^*}=\left(\dfrac{x_1}{x_2}\right)^{1/(r-1)}$ — **le miroir exact** de l'exemple 1.1, prix et quantités échangés.

La fonction de valeur vaut $\big(x_1^{r/(r-1)}+x_2^{r/(r-1)}\big)^{(r-1)/r}$, soit, en posant $\rho\equiv\dfrac{r}{r-1}$ :

$$u(x_1,x_2)=\big(x_1^\rho+x_2^\rho\big)^{1/\rho} \quad$$

</details>

<details class="details--riche">
<summary>

**16. Pourquoi les changements de variable $\rho\to r$ et $r\to\rho$ utilisent-ils la même formule ?**

</summary>

Parce que $f(t)=\dfrac{t}{t-1}$ est une **involution** :

$$f\big(f(t)\big)=\frac{t/(t-1)}{t/(t-1)-1}=\frac{t/(t-1)}{1/(t-1)}=t$$

Le passage $u\to v$ (qui remplace $\rho$ par $r$) et le passage $v\to u$ (qui remplace $r$ par $\rho$) se **compensent exactement**. La CES est en ce sens **auto-duale**.

</details>

<details class="details--riche">
<summary>

**17. Énoncer le théorème de Hotelling-Wold et le démontrer.**

</summary>

$$p_i(x)=\frac{\partial u(x)/\partial x_i}{\sum_{j} x_j\big(\partial u(x)/\partial x_j\big)} \qquad (y=1)$$

**Preuve.** Appliquer le **théorème de l'enveloppe** à $\mathcal{L}(p,\lambda)=v(p,1)-\lambda(1-p\cdot x)$ :

$$\frac{\partial u(x)}{\partial x_i}=\lambda^*p_i^*$$

Multiplier par $x_i$ et sommer : $\sum_i x_i\dfrac{\partial u}{\partial x_i}=\lambda^*\sum_i p_i^*x_i=\lambda^*$, car $p(x)\cdot x=1$.

Diviser. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**18. Que devient le rapport de deux demandes inverses ?**

</summary>

$$\frac{p_i(x)}{p_j(x)}=\frac{\partial u/\partial x_i}{\partial u/\partial x_j}=\text{TMS}_{ij}(x)$$

Le dénominateur commun disparaît. **La demande inverse n'est que la condition de tangence de la fiche 501, plus une normalisation** imposant $p(x)\cdot x=1$.

</details>

<details class="details--riche">
<summary>

**19. Quelles restrictions du chapitre 1 sont redondantes, et pourquoi ?**

</summary>

| Restriction | Impliquée par | Théorème |
|---|---|---|
| Agrégation d'**Engel** | équilibre budgétaire | 1.17 |
| Agrégation de **Cournot** | équilibre budgétaire | 1.17 |
| **Homogénéité** de degré 0 | équilibre budgétaire **+ symétrie** | **2.5** |

Il ne reste que **trois** conditions indépendantes : équilibre budgétaire, symétrie, semi-définie négativité.

</details>

<details class="details--riche">
<summary>

**20. Démontrer le théorème 2.5.**

</summary>

Poser $f_i(t)=x_i(tp,ty)$ ; il faut $f_i'(t)=0$.

$$f_i'(t)=\sum_j \frac{\partial x_i(tp,ty)}{\partial p_j}p_j+\frac{\partial x_i(tp,ty)}{\partial y}\,y$$

Le budget en $(tp,ty)$ donne $y=\sum_j p_jx_j(tp,ty)$. En substituant :

$$f_i'(t)=\sum_j p_j\underbrace{\left[\frac{\partial x_i}{\partial p_j}+\frac{\partial x_i}{\partial y}x_j\right]}_{ij\text{-ème terme de Slutsky}}$$

Par **symétrie**, on échange $i$ et $j$ dans le crochet. On obtient alors des sommes que (P.1) et (P.2) savent évaluer **en $(tp,ty)$** :

$$f_i'(t)=\frac1t\big[-x_i(tp,ty)\big]+x_i(tp,ty)\cdot\frac1t=0. \qquad\blacksquare$$

⚠️ Le facteur $1/t$ vient de ce qu'il faut faire apparaître $tp_j$ pour appliquer (P.1)-(P.2) au bon point.

</details>

<details class="details--riche">
<summary>

**21. Quelles sont les trois conditions de l'intégrabilité, et que dit le théorème 2.6 ?**

</summary>

$$\text{équilibre budgétaire} \quad\cdot\quad \text{symétrie de } s(p,y) \quad\cdot\quad \text{semi-définie négativité de } s(p,y)$$

**Théorème 2.6 :** une fonction continûment différentiable $x:\mathbb{R}^{n+1}_{++}\to\mathbb{R}^n_+$ est la demande engendrée par une utilité croissante et quasiconcave **si et seulement si** elle satisfait ces trois conditions.

**Autrement dit : la liste est COMPLÈTE.** Il n'existe aucune autre restriction testable découlant de la théorie.

</details>

<details class="details--riche">
<summary>

**22. Quelle est l'idée d'Antonelli ?**

</summary>

> *« Supposons qu'on nous donne une fonction vectorielle des prix et du revenu, et que nous soyons capables de **construire une fonction d'utilité qui engendre précisément cette même fonction comme fonction de demande**. Alors cette fonction de départ **doit** être cohérente avec notre théorie, parce qu'elle **est** en fait la demande d'un consommateur ayant l'utilité que nous avons construite. »*

Et l'intuition décisive : **les trois conditions suffisent** à garantir qu'une telle construction est possible.

Le problème de récupérer $u$ à partir de $x(p,y)$ s'appelle le **problème d'intégrabilité**.

</details>

<details class="details--riche">
<summary>

**23. Quel système d'équations la preuve Hurwicz-Uzawa cherche-t-elle à résoudre ?**

</summary>

$$\frac{\partial e(p,u)}{\partial p_i}=x_i\big(p,\,e(p,u)\big), \qquad i=1,\dots,n \tag{P.1}$$

C'est un **système d'équations aux dérivées partielles**. Si une $e$ le résout et est une vraie fonction de dépense, alors $x(p,y)$ **est** la demande engendrée par l'utilité qui produit $e$ (théorème 2.1).

*« Et, pour nos besoins, l'existence suffit. »*

</details>

<details class="details--riche">
<summary>

**24. Que dit le théorème de Frobenius ici, et sur quoi porte-t-il exactement ?**

</summary>

Une solution de (P.1) existe **si et seulement si** le membre de droite de

$$\frac{\partial^2 e(p,u)}{\partial p_j\partial p_i}=\frac{\partial x_i(p,y)}{\partial p_j}+x_j(p,y)\frac{\partial x_i(p,y)}{\partial y} \tag{P.5}$$

est **symétrique** en $i$ et $j$. Or ce membre de droite est **exactement le $ij$-ème terme de la matrice de Slutsky**.

⚠️ **Frobenius est muet** sur le fait que la solution soit une vraie fonction de dépense — c'est le théorème 2.2 qui s'en charge, une fois les sept propriétés vérifiées.

</details>

<details class="details--riche">
<summary>

**25. Faire correspondre chaque condition observable à une propriété de $e$.**

</summary>

| Condition sur $x(p,y)$ | Propriété de $e$ | Via |
|---|---|---|
| **symétrie** de $s(p,y)$ | **existence** d'une solution à (P.1) | théorème de **Frobenius** |
| **semi-définie négativité** de $s(p,y)$ | **concavité** en $p$ | (P.5) + théorème A2.4 |
| **équilibre budgétaire** | **homogénéité de degré 1** en $p$ | exercice 2.4 |

C'est cette correspondance **terme à terme** qui prouve que la liste des trois conditions est exhaustive.

</details>

<details class="details--riche">
<summary>

**26. Quel bénéfice pratique le théorème 2.6 offre-t-il à l'économétrie ?**

</summary>

> *« Si l'on souhaite estimer la fonction de demande d'un consommateur sur la base d'une quantité limitée de données, et imposer que la demande soit **engendrée par une utilité**, on est libre de spécifier **n'importe quelle forme fonctionnelle** tant qu'elle satisfait l'équilibre budgétaire, la symétrie et la semi-définie négativité. »*

On n'a donc **pas besoin de partir d'une fonction d'utilité** pour garantir la cohérence théorique du modèle estimé.

</details>

<details class="details--riche">
<summary>

**27. Résoudre le système d'intégrabilité de l'exemple 2.3.**

</summary>

Avec $x_i=\alpha_i y/p_i$, le système $\partial e/\partial p_i=\alpha_i e/p_i$ se réécrit

$$\frac{\partial \ln\big(e(p,u)\big)}{\partial p_i}=\frac{\alpha_i}{p_i}$$

Chaque équation donne $\ln e=\alpha_i\ln p_i + c_i(\text{le reste})$. Pour que les trois tiennent **simultanément** :

$$\ln e = \alpha_1\ln p_1+\alpha_2\ln p_2+\alpha_3\ln p_3+c(u) \qquad\Longrightarrow\qquad e(p,u)=c(u)\prod_i p_i^{\alpha_i}$$

En prenant $c(u)=u$ (n'importe quelle strictement croissante convient) :

$$e(p,u)=u\,p_1^{\alpha_1}p_2^{\alpha_2}p_3^{\alpha_3}$$

⚠️ **L'astuce est de diviser par $e$ pour faire apparaître $\ln e$** — c'est ce qui découple le système.

</details>

<details class="details--riche">
<summary>

**28. Où la condition $\sum_i\alpha_i=1$ sert-elle dans l'exemple 2.3 ?**

</summary>

À **deux endroits** :

1. **L'équilibre budgétaire** : $\sum_i p_ix_i=\sum_i\alpha_i y = y$ exige $\sum_i\alpha_i=1$.
2. **L'homogénéité de degré 1** de $e$ : $e(tp,u)=u\,t^{\sum\alpha_i}\prod p_i^{\alpha_i}=t\,e(p,u)$ n'est vraie que si $\sum\alpha_i=1$.

Sans cette condition, ni la demande ni la fonction de dépense ne seraient admissibles.

</details>

<details class="details--riche">
<summary>

**29. Comment tester rapidement si $x_i=\alpha_i y/p_i$ satisfait les trois conditions ?**

</summary>

**Budget :** $\sum_i p_ix_i=y$ (grâce à $\sum\alpha_i=1$).

**Termes de Slutsky :** pour $i\neq j$, $\partial x_i/\partial p_j=0$, donc $s_{ij}=\dfrac{\alpha_j y}{p_j}\cdot\dfrac{\alpha_i}{p_i}=\dfrac{\alpha_i\alpha_j y}{p_ip_j}$ — **manifestement symétrique** .

**Diagonale :** $s_{ii}=\dfrac{\alpha_i y}{p_i^2}(\alpha_i-1)<0$ car $0<\alpha_i<1$.

**Semi-définie négativité :** en posant $z_i=\zeta_i/p_i$,

$$\zeta^{\mathsf T}s\,\zeta=y\left[\Big(\sum_i\alpha_iz_i\Big)^2-\sum_i\alpha_iz_i^2\right]\leq0$$

par **Jensen** ($t\mapsto t^2$ convexe, poids $\alpha_i$ sommant à 1) .

</details>

<details class="details--riche">
<summary>

**30. Quelle est la « belle illustration de la puissance de la dualité » dont parle le livre ?**

</summary>

La preuve de Hurwicz-Uzawa. Elle transforme une question sur des **données observées** (une fonction de demande est-elle rationalisable ?) en une question sur l'**existence d'une solution à un système d'EDP** — puis résout celle-ci par un théorème purement mathématique (Frobenius) dont la condition d'application se trouve être **exactement** la symétrie de Slutsky.

Chaque condition économique se traduit en une propriété analytique, et réciproquement. C'est le mécanisme de la dualité poussé à son terme.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Quel renversement le chapitre 2 opère-t-il ? | Des **demandes** vers les **préférences**, au lieu de l'inverse |
| Que veut établir le §2.1 ? | Toute fonction ayant les 7 propriétés du thm 1.7 **est** une fonction de dépense |
| Définition de $A(p,u)$ ? | $\{x\in\mathbb{R}^n_+ \mid p\cdot x\geq E(p,u)\}$ — demi-espace fermé convexe |
| Définition de $A(u)$ ? | $\bigcap_{p\gg0}A(p,u)$ — l'intersection sur **tous** les prix |
| La fonction $u(x)$ construite ? | $\max\{u\geq0 \mid x\in A(u)\}$ |
| Max ou min ? | **Max** — $E$ est croissante en $u$ |
| Pourquoi cette définition et pas une autre ? | Parce que si $E$ **était** une fonction de dépense, $u(x)$ serait exactement ce max |
| Ce qu'affirme le théorème 2.1 ? | La $u$ construite est **croissante, non bornée, quasiconcave** |
| Ce qu'affirme le théorème 2.2 ? | La fonction de dépense de cette $u$ est **exactement $E$** |
| Pourquoi faut-il les deux ? | 2.1 dit « c'est une utilité » ; 2.2 dit « et c'est la bonne » |
| Le candidat $x^0$ de la preuve du thm 2.2 ? | $x^0=\partial E(p^0,u^0)/\partial p$ — ce que Shephard donnerait |
| Ce que donne **Euler** dans cette preuve ? | $E(p^0,u^0)=p^0\cdot x^0$ |
| Ce que donne la **concavité** ? | $p\cdot x^0\geq E(p,u^0)$ pour tout $p$, donc $u(x^0)\geq u^0$ |
| La route pratique ouverte par 2.1-2.2 ? | $E \to x^h$ (Shephard) $\to v$ (inversion) $\to x(p,y)$ (Roy) |
| Le §2.1.2 démontre quoi ? | Convexité et monotonicité n'ont **aucune implication observable** |
| Comment ? | Construire $w(x)$ à partir de $e$ : $w\geq u$, $w$ est régulière, et **mêmes maximiseurs** |
| La réciproque est-elle vraie ? | **Non** — un maximiseur de $w$ n'est pas forcément un maximiseur de $u$ |
| Quelle réserve le livre pose-t-il ? | Le résultat suppose **$p\gg0$** ; avec un prix **négatif** (Fig. 2.2e), la monotonicité redevient testable |
| Convexité et monotonicité sont-elles inutiles ? | **Non** — unicité, différentiabilité, équilibre général |
| L'énoncé (T.1) ? | $u(x)=\min_{p\gg0} v(p,\,p\cdot x)$ |
| L'énoncé (T.1′) ? | $u(x)=\min_{p\gg0} v(p,1)$ s.c. $p\cdot x=1$ |
| Pourquoi préférer (T.1′) ? | (T.1) a une **infinité** de solutions ⟹ l'enveloppe n'y est pas applicable |
| Hypothèses du théorème 2.3 ? | $u$ **quasiconcave**, différentiable, **dérivées partielles $>0$** |
| L'idée de sa preuve ? | Poser $p^0=\nabla u(x^0)$, $\lambda^0=1$ — les CPO sont automatiques, le **thm 1.4** conclut |
| Le symbole abîmé par l'extraction ? | $p^0=\nabla u(x^0)$, rendu « $+u(x^0)$ » |
| Le rôle de chaque hypothèse du thm 2.3 ? | Quasiconcavité ⟹ thm 1.4 · dérivées $>0$ ⟹ $p^0\gg0$ |
| Ce que (T.1′) redonne sur la CES ? | $u(x)=(x_1^\rho+x_2^\rho)^{1/\rho}$ avec $\rho=r/(r-1)$ |
| Pourquoi $\rho\leftrightarrow r$ utilise la même formule ? | $f(t)=t/(t-1)$ est une **involution** : $f\circ f=\text{id}$ |
| Le théorème de Hotelling-Wold ? | $p_i(x)=\dfrac{\partial u/\partial x_i}{\sum_j x_j\,\partial u/\partial x_j}$ pour $y=1$ |
| L'outil de sa preuve ? | Le **théorème de l'enveloppe** sur (T.1′) |
| Le rapport de deux demandes inverses ? | $\text{TMS}_{ij}(x)$ — la tangence, plus une normalisation |
| Quelles restrictions du ch. 1 sont redondantes ? | Engel et Cournot (⟸ budget) · **homogénéité** (⟸ budget + symétrie) |
| Ce qu'affirme le théorème 2.5 ? | **Budget + symétrie ⟹ homogénéité de degré 0** |
| Le pivot de sa preuve ? | Le crochet est un **terme de Slutsky** : on y **échange $i$ et $j$** |
| Le détail technique ? | Faire apparaître $tp_j$ pour appliquer (P.1)-(P.2) **en $(tp,ty)$** |
| Les trois conditions indépendantes ? | Équilibre budgétaire · symétrie de $s$ · semi-définie négativité de $s$ |
| Le théorème 2.6 ? | Ces trois conditions sont **nécessaires ET suffisantes** — la liste est **complète** |
| L'idée d'Antonelli ? | Si l'on peut **construire** une utilité engendrant $x(p,y)$, alors $x$ est cohérente avec la théorie |
| Le nom du problème ? | Le **problème d'intégrabilité** |
| Le système à résoudre (Hurwicz-Uzawa) ? | $\partial e(p,u)/\partial p_i = x_i\big(p,e(p,u)\big)$ |
| Ce que garantit **Frobenius** ? | Une solution existe **ssi** le membre de droite de (P.5) est **symétrique** |
| Et ce membre de droite, c'est ? | Exactement le $ij$-ème **terme de Slutsky** |
| Frobenius garantit-il une vraie fonction de dépense ? | **Non** — *« il est muet sur cette question »* ; c'est le thm 2.2 qui s'en charge |
| Symétrie ⟹ ? | L'**existence** d'une solution (Frobenius) |
| Semi-définie négativité ⟹ ? | La **concavité** de $e$ en $p$ |
| Équilibre budgétaire ⟹ ? | L'**homogénéité de degré 1** de $e$ en $p$ (exercice 2.4) |
| Le bénéfice pratique du thm 2.6 ? | Spécifier **n'importe quelle** forme de demande satisfaisant les trois conditions |
| L'astuce de l'exemple 2.3 ? | **Diviser par $e$** pour faire apparaître $\partial\ln e/\partial p_i$ |
| La solution de l'exemple 2.3 ? | $e(p,u)=u\,p_1^{\alpha_1}p_2^{\alpha_2}p_3^{\alpha_3}$ |
| Où sert $\sum\alpha_i=1$ ? | **Deux fois** : équilibre budgétaire **et** homogénéité de degré 1 |
| Comment choisir $c(u)$ ? | **N'importe quelle** fonction strictement croissante — la demande n'en dépend pas |
| Que demande l'exercice 2.5 ? | Appliquer le thm 2.1 à cette $e$ pour récupérer $u(x)=\prod_i x_i^{\alpha_i}$ |
| Faut-il construire $u$ pour appliquer le thm 2.6 ? | **Non** — c'est un résultat d'**existence** |
