# Fiche 500 — Préférences et utilité : les axiomes du consommateur

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 1 « Consumer Theory », §1.1 « Primitive Notions » et §1.2 « Preferences and Utility » (p. 3-19) |
| **Difficulté** | Fondamental — tout le reste du livre repose sur ces dix pages |
| **Temps d'étude estimé** | 120 min |
| **Prérequis** | Notions d'ensemble ouvert/fermé et de fonction quasiconcave (appendice A1 du livre ; fiche 34 pour les ensembles convexes, fiche 35 pour la quasiconcavité) |
| **Concepts clés** | Ensemble de consommation $X$, ensemble réalisable $B$, relation de préférence $\succsim$, hypothèse comportementale, complétude, transitivité, continuité, non-satiété locale, monotonicité stricte, convexité, convexité stricte, ensembles $\succsim(x^0)$, $\precsim(x^0)$, $\prec(x^0)$, $\succ(x^0)$, $\sim(x^0)$, fonction d'utilité, représentation, transformation monotone croissante, ordinalité, utilité marginale, taux marginal de substitution |
| **Poids à l'examen** | Les **cinq axiomes** et ce que chacun interdit graphiquement · la **preuve du théorème 1.1** (construction $u(x)e \sim x$) · l'**invariance par transformation monotone** (thm 1.2) · le **dictionnaire axiome ↔ propriété de $u$** (thm 1.3) · le **TMS comme rapport d'utilités marginales** · le contre-exemple **lexicographique**. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE : des goûts d'un individu à une fonction qu'on peut deriver

  §1.1  LES QUATRE BRIQUES DU CHOIX
        (1) ensemble de CONSOMMATION X   ce que le consommateur peut CONCEVOIR
        (2) ensemble REALISABLE      B   ce qu'il peut ATTEINDRE       B subset X
        (3) relation de PREFERENCE   >~  comment il CLASSE
        (4) hypothese COMPORTEMENTALE    il choisit le MEILLEUR realisable

  §1.2.1  LA RELATION >~ ET SES AXIOMES

        AXIOME 1  completude    ---+
        AXIOME 2  transitivite  ---+--> "relation de preference" (def 1.1)
                                        le consommateur sait COMPARER

        derivees :  x1 > x2  ssi  x1 >~ x2  ET  NON(x2 >~ x1)     (def 1.2)
                    x1 ~ x2  ssi  x1 >~ x2  ET  x2 >~ x1          (def 1.3)
        trichotomie : pour toute paire, EXACTEMENT un des trois

        cinq ensembles derives (def 1.4) :  >~(x0)  <~(x0)  <(x0)  >(x0)  ~(x0)

        AXIOME 3  continuite         >~(x) et <~(x) FERMES   -> pas de renversement brutal
        AXIOME 4' non-satiete locale toujours mieux TOUT PRES -> pas de zone d'indifference
        AXIOME 4  monotonicite str.  plus = mieux             -> pas de pente positive
        AXIOME 5' convexite          l'equilibre vaut le bord -> pas de creux concave
        AXIOME 5  convexite stricte  l'equilibre vaut MIEUX   -> TMS strictement decroissant

        HIERARCHIE :  4 => 4'        5 => 5'

  §1.2.2  LA FONCTION D'UTILITE

        def 1.5      u represente >~   ssi   u(x0) >= u(x1)  <=>  x0 >~ x1

        THM 1.1  complete + transitive + continue + str. monotone
                        ==> il EXISTE u continue qui represente >~
                 preuve : poser u(x) tel que  u(x)*e ~ x   (e = (1,...,1))

        THM 1.2  v represente aussi >~  <=>  v = f(u) avec f strictement croissante
                 => l'utilite est ORDINALE : seul l'ORDRE des nombres a un sens

        THM 1.3  le DICTIONNAIRE
                 u strictement croissante   <=>  >~ strictement monotone
                 u quasiconcave             <=>  >~ convexe
                 u strictement quasiconcave <=>  >~ strictement convexe

        si u derivable :  utilite marginale  du/dxi
                          TMS_ij(x) = (du/dxi) / (du/dxj)

  ==> HYPOTHESE 1.2, celle qui vaudra dans tout le reste du chapitre :
      >~ complete, transitive, continue, strictement monotone, strictement convexe
      donc u continue, strictement croissante, strictement quasiconcave
```

> **La thèse du chapitre, en une phrase du livre.** *« Dans la théorie moderne, une fonction d'utilité est simplement un instrument commode pour résumer l'information contenue dans la relation de préférence du consommateur — ni plus, ni moins. »* La relation de préférence est le **primitif** ; l'utilité n'en est qu'une **représentation**.

> ⚠️ **Note de transcription — à lire une fois.** Le PDF du livre n'exporte pas certains glyphes : les symboles de préférence $\succsim$ et $\succ$, l'inégalité vectorielle stricte $\gg$ et le signe $\sum$ disparaissent à l'extraction, et l'inégalité vectorielle $\geq$ ressort comme un « + ». Ces symboles ont été rétablis à partir de la prose du livre, qui nomme toujours la relation employée (« at least as good as » $=\succsim$, « strictly preferred to » $=\succ$). Aucun **contenu** n'a été ajouté ; seule la typographie a été réparée.

## 🔴 Concept 1 — Les quatre briques d'un modèle de choix (§1.1)

### 1.1 Pourquoi quatre briques, et pourquoi les distinguer

Le livre ouvre sur un avertissement qui vaut méthode :

> *« Il y a quatre briques dans tout modèle de choix du consommateur. Ce sont l'**ensemble de consommation**, l'**ensemble réalisable**, la **relation de préférence** et l'**hypothèse comportementale**. Chacune est conceptuellement distincte des autres, bien qu'il soit assez courant de perdre ce fait de vue. »*

C'est exactement l'erreur à éviter : confondre « ce que je peux imaginer » avec « ce que je peux m'offrir », ou confondre « comment je classe » avec « ce que je fais ». Les quatre briques sont indépendantes ; on peut changer l'une sans toucher aux autres. C'est ce qui rend la structure *« extrêmement générale, et donc très souple »*.

### 1.2 Brique 1 — l'ensemble de consommation $X$

**Définition (prose du livre).** $X$ représente **l'ensemble de toutes les alternatives, ou plans de consommation complets, que le consommateur peut concevoir** — que certaines soient réalisables en pratique ou non.

Ce que le livre veut capturer : *« l'univers des choix alternatifs sur lequel l'esprit du consommateur est capable de vagabonder, sans être entravé par la considération des réalités de sa situation présente »*. On l'appelle aussi **ensemble de choix** (*choice set*).

**Construction concrète.**

- Chaque bien est mesuré en unités **infiniment divisibles**.
- $x_i \in \mathbb{R}$ est le nombre d'unités du bien $i$. Seules les quantités **non négatives** ont un sens, et il est toujours possible de concevoir n'en avoir **aucune**.
- Le nombre de biens $n$ est **fini, fixé, mais arbitraire**.
- $x = (x_1,\dots,x_n)$ est un **panier de consommation** (*consumption bundle*) ou **plan de consommation**.

Un panier $x \in X$ est donc représenté par un point $x \in \mathbb{R}^n_+$. Le livre simplifie aussitôt :

$$\boxed{\;X = \mathbb{R}^n_+\;}$$

c'est-à-dire l'**orthant non négatif** tout entier.

**ASSUMPTION 1.1 — Propriétés de l'ensemble de consommation $X$.** Les exigences minimales sur $X$ sont :

1. $X \subseteq \mathbb{R}^n_+$
2. $X$ est **fermé**
3. $X$ est **convexe**
4. $0 \in X$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ces quatre-là ?</span>

Le livre ne les commente pas une par une ; il note seulement qu'avec $X=\mathbb{R}^n_+$, *« il est facile de voir que chacune de ces exigences de base est satisfaite »*. Retenez le rôle : (2) et (3) sont des exigences **mathématiques** — elles serviront à appliquer les théorèmes d'existence et de séparation ; (4) garantit que « ne rien consommer » est toujours concevable, ce qui sert de point d'ancrage à tous les raisonnements par comparaison.

</div>

<div class="callout callout--warn" data-kind="piege">

<span class="callout__lab">Attention à l'énoncé de l'exercice 1.1.</span>

⚠️ Le livre demande de vérifier que $X=\mathbb{R}^2_+$ *« satisfait les cinq propriétés requises d'un ensemble de consommation dans l'hypothèse 1.1 »* — alors que l'hypothèse 1.1 telle qu'imprimée n'en liste que **quatre**. C'est une incohérence du texte, pas une erreur de lecture de votre part. Traitez les quatre propriétés listées.

</div>

### 1.3 Brique 2 — l'ensemble réalisable $B$

$B$ représente *« tous les plans de consommation alternatifs qui sont à la fois concevables et, plus important, réalistement atteignables compte tenu des circonstances du consommateur »*.

$B$ est donc le sous-ensemble de $X$ qui reste **après** avoir tenu compte de toute contrainte d'accès aux biens — pratique, institutionnelle ou économique. À ce stade le livre ne dit rien de plus que :

$$B \subset X$$

La forme précise de $B$ dépend de la situation modélisée. (Au §1.3, ce sera l'ensemble budgétaire $B=\{x\in\mathbb{R}^n_+ \mid p\cdot x \le y\}$ — voir fiche 501.)

> **L'idée à retenir.** $X$ est fixé par la nature des biens ; $B$ est fixé par les **circonstances**. Un changement de prix ou de revenu déplace $B$ **sans toucher** ni à $X$ ni aux préférences. C'est cette séparation qui permet plus tard de parler d'« effet de substitution » à préférences inchangées.

### 1.4 Brique 3 — la relation de préférence $\succsim$

Elle *« spécifie les limites, s'il y en a, de la capacité du consommateur à percevoir dans les situations de choix la forme de cohérence ou d'incohérence de ses choix, et l'information sur ses goûts pour les différents objets de choix »*. Le livre lui consacre tout le §1.2 — c'est le Concept 2 ci-dessous.

### 1.5 Brique 4 — l'hypothèse comportementale

Elle *« ferme » le modèle*. Elle exprime le principe directeur que le consommateur utilise pour trancher, et identifie donc l'objectif ultime du choix :

> *« On suppose que le consommateur cherche à identifier et à sélectionner une alternative disponible qui est la plus préférée à la lumière de ses goûts personnels. »*

Formellement, cela deviendra (1.4) au §1.3 : le consommateur cherche $x^* \in B$ tel que $x^* \succsim x$ pour tout $x \in B$.

<details class="details--riche">
<summary>

**Exemple d'application — séparer les quatre briques sur un cas concret**

</summary>

*Cet exemple est un enrichissement pédagogique destiné à fixer la distinction ; il ne figure pas comme tel dans le livre.*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — les quatre briques sur un cas.</span>

</div>

Un étudiant dispose de 60 € par semaine, choisit entre repas au restaurant ($x_1$, 12 € l'unité) et heures de cinéma ($x_2$, 10 € l'unité).

| Brique | Contenu ici | Ce qui la ferait changer |
|---|---|---|
| $X$ | $\mathbb{R}^2_+$ : tout couple (repas, heures) imaginable, y compris 40 repas | Ajouter un troisième bien, ou rendre un bien indivisible |
| $B$ | $\{(x_1,x_2)\in\mathbb{R}^2_+ \mid 12x_1 + 10x_2 \le 60\}$ | Une hausse de prix, une variation de revenu, un rationnement |
| $\succsim$ | Son classement personnel de tous les couples | Rien de ce qui précède — les goûts sont invariants |
| Hypothèse | Il choisit un élément $\succsim$-maximal de $B$ | Remplacer la maximisation par un comportement d'habitude, de satisficing… |

**Le piège que cette table désamorce.** Dire « il ne peut pas concevoir 40 repas puisqu'il n'a que 60 € » confond $X$ et $B$. Le point $(40,0)$ **appartient à $X$** ; il n'appartient simplement pas à $B$. Cette distinction paraît scolaire jusqu'au moment où l'on écrit $e(p,u)$, la fonction de dépense (fiche 502) : là, on demande combien il **faudrait** de revenu pour atteindre un niveau d'utilité — une question qui n'a de sens que si les paniers hors budget existent bel et bien dans $X$.

</details>

## 🔴 Concept 2 — La relation de préférence et ses deux relations dérivées (§1.2.1)

### 2.1 Le choix de méthode : l'axiomatique

> *« Les préférences du consommateur sont caractérisées axiomatiquement. Dans cette méthode de modélisation, on pose aussi peu d'hypothèses significatives et distinctes que possible pour caractériser la structure et les propriétés des préférences. Le reste de la théorie se construit ensuite logiquement à partir de ces axiomes, et les prédictions de comportement sont développées par déduction. »*

Le livre replace cela dans une histoire, et cette histoire explique *pourquoi* les axiomes sont si faibles :

| Époque | Position | Ce qui a été abandonné |
|---|---|---|
| Edgeworth, Mill, école utilitariste | l'« utilité » est une **substance** ; plaisir et peine sont mesurables et **comparables entre individus** ; « loi de l'utilité marginale décroissante » | — |
| Pareto (1896) | soupçonne que l'idée d'une utilité **mesurable** est inessentielle à la théorie de la demande | la cardinalité |
| Slutsky (1915) | premier examen systématique de la demande **sans** substance mesurable appelée utilité | — |
| Hicks (1939) | la décroissance de l'utilité marginale n'est **ni nécessaire ni suffisante** pour la loi de la demande | le principe d'utilité marginale décroissante |
| Debreu (1959) | achève la réduction aux **strictes essentielles** | tout le reste |

> *« La théorie d'aujourd'hui entretient des relations étroites et importantes avec ses ancêtres, mais elle est plus dépouillée, plus précise et plus générale. »*

### 2.2 La relation primitive $\succsim$

On représente les préférences par une **relation binaire** $\succsim$ définie sur $X$.

$$x^1 \succsim x^2 \quad \text{se lit} \quad \text{« } x^1 \text{ est au moins aussi bon que } x^2 \text{ »}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi une relation binaire — le livre insiste.</span>

*« Cela transmet le point important selon lequel, dès le départ, notre théorie exige relativement peu du consommateur qu'elle décrit. Nous exigeons seulement que les consommateurs fassent des comparaisons binaires, c'est-à-dire qu'ils n'examinent que deux plans de consommation à la fois et prennent une décision les concernant. »*

</div>

C'est une exigence cognitive **minimale**. On ne demande pas au consommateur de trier son univers entier ; on lui demande de répondre à des questions à deux options. Tout le reste — le classement complet, la fonction d'utilité — sera **déduit**.

### 2.3 Axiome 1 — Complétude

> **AXIOM 1: Completeness.** For all $x^1$ and $x^2$ in $X$, either $x^1 \succsim x^2$ or $x^2 \succsim x^1$.

**Ce qu'il formalise.** *« La notion que le consommateur peut faire des comparaisons, c'est-à-dire qu'il a la capacité de discriminer et la connaissance nécessaire pour évaluer les alternatives. »*

**Lecture littérale.** Le consommateur peut examiner deux plans **distincts quelconques** $x^1$ et $x^2$ et décider si $x^1$ est au moins aussi bon que $x^2$, ou si $x^2$ est au moins aussi bon que $x^1$.

> ⚠️ **Le « either … or » est INCLUSIF.** Rien n'interdit que les deux soient vrais simultanément — et c'est précisément ce cas qui définira l'indifférence (def. 1.3). L'axiome interdit une seule chose : que **ni l'un ni l'autre** ne soit vrai, autrement dit que le consommateur soit **incapable de trancher**.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — complétude et réflexivité.</span>

En posant $x^1=x^2=x$, la complétude donne $x \succsim x$ : la relation est automatiquement **réflexive**. Le livre ne le mentionne pas, mais c'est un fait utilisé implicitement partout, par exemple pour dire que $x^0 \in \sim(x^0)$.

</div>

### 2.4 Axiome 2 — Transitivité

> **AXIOM 2: Transitivity.** For any three elements $x^1$, $x^2$, and $x^3$ in $X$, if $x^1 \succsim x^2$ and $x^2 \succsim x^3$, then $x^1 \succsim x^3$.

**Ce qu'il formalise.** *« Une forme très particulière de l'exigence que les choix du consommateur soient cohérents. Bien que nous n'exigions du consommateur que la capacité de comparer deux alternatives à la fois, l'hypothèse de transitivité exige que ces comparaisons deux à deux soient reliées entre elles de manière cohérente. »*

**L'honnêteté du livre sur cet axiome — à retenir.**

> *« Au premier abord, exiger que l'évaluation des alternatives soit transitive semble simple et tout naturel. […] Néanmoins, c'est un axiome controversé. Des expériences ont montré que dans diverses situations, les choix d'êtres humains réels ne sont pas toujours transitifs. Néanmoins, nous le conserverons dans notre description du consommateur, quoique non sans une légère appréhension. »*

C'est un point d'examen classique : on ne défend pas la transitivité comme un fait empirique, on l'assume comme une **hypothèse de travail dont on connaît la fragilité**.

### 2.5 Ce que les deux premiers axiomes donnent ensemble

> *« Ces deux axiomes ensemble impliquent que le consommateur peut classer complètement tout nombre **fini** d'éléments de l'ensemble de consommation $X$, du meilleur au pire, éventuellement avec des ex æquo. (Essayez de le prouver.) »*

**DEFINITION 1.1 — Preference Relation.** La relation binaire $\succsim$ sur $X$ est appelée une **relation de préférence** si elle satisfait les axiomes 1 et 2.

<details class="details--riche">
<summary>

**Le « essayez de le prouver » du livre — classement complet d'un ensemble fini**

</summary>

*Le livre pose l'exercice sans le corriger. Le raisonnement ci-dessous est un corrigé pédagogique reconstitué ; il n'est pas fourni par le livre.*

**Énoncé.** Si $\succsim$ est complète et transitive, alors tout sous-ensemble fini non vide $S=\{x^1,\dots,x^m\}\subset X$ peut être classé du meilleur au pire, éventuellement avec des ex æquo.

**Démonstration par récurrence sur $m$.**

*Base $m=1$.* Le classement est trivial.

*Hérédité.* Supposons $\{x^1,\dots,x^m\}$ classé, c'est-à-dire réindexé de sorte que $x^{(1)} \succsim x^{(2)} \succsim \dots \succsim x^{(m)}$. Ajoutons $x^{m+1}$. Par **complétude**, pour chaque $k$, $x^{m+1}\succsim x^{(k)}$ ou $x^{(k)}\succsim x^{m+1}$. Soit $k^\star$ le plus petit indice tel que $x^{m+1}\succsim x^{(k^\star)}$ (s'il n'en existe aucun, on place $x^{m+1}$ en dernier et c'est fini). Insérons $x^{m+1}$ juste avant $x^{(k^\star)}$.

Il faut vérifier que la chaîne reste valide, c'est-à-dire que $x^{(k^\star-1)}\succsim x^{m+1}$ : c'est vrai par minimalité de $k^\star$ (on n'a pas $x^{m+1}\succsim x^{(k^\star-1)}$… attention, la complétude donne alors $x^{(k^\star-1)}\succsim x^{m+1}$, ce qu'on voulait).

Enfin la chaîne est bien un classement au sens voulu : pour $i<j$ quelconques, $x^{(i)}\succsim x^{(j)}$ s'obtient en enchaînant les comparaisons voisines par **transitivité**.

**Où chaque axiome est utilisé — c'est la question d'examen.**

- La **complétude** sert à *placer* chaque nouvel élément : sans elle, il pourrait être incomparable à tous.
- La **transitivité** sert à *propager* : sans elle, une chaîne de comparaisons voisines ne dirait rien des paires éloignées.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi « fini » ?</span>

⚠️ Sur un ensemble **infini**, complétude + transitivité ne suffisent pas à garantir l'existence d'un élément maximal, ni une représentation numérique. C'est précisément pour cela qu'il faudra l'axiome 3 (continuité) au théorème 1.1 — et c'est ce que montre le contre-exemple lexicographique (exercice 1.13, traité au Concept 4).

</div>

</details>

### 2.6 Les deux relations dérivées

**DEFINITION 1.2 — Strict Preference Relation.** La relation binaire $\succ$ sur $X$ est définie par :

$$\boxed{\;x^1 \succ x^2 \iff x^1 \succsim x^2 \ \text{ et } \ \text{non}\,(x^2 \succsim x^1)\;}$$

$\succ$ est la **relation de préférence stricte induite par** $\succsim$. On lit $x^1 \succ x^2$ : « $x^1$ est strictement préféré à $x^2$ ».

**DEFINITION 1.3 — Indifference Relation.** La relation binaire $\sim$ sur $X$ est définie par :

$$\boxed{\;x^1 \sim x^2 \iff x^1 \succsim x^2 \ \text{ et } \ x^2 \succsim x^1\;}$$

$\sim$ est la **relation d'indifférence induite par** $\succsim$. On lit $x^1 \sim x^2$ : « $x^1$ est indifférent à $x^2$ ».

> **Le point de méthode.** $\succsim$ est le **primitif**. $\succ$ et $\sim$ ne sont pas des hypothèses supplémentaires : ce sont des **définitions** construites à partir de $\succsim$. Toute propriété de $\succ$ ou de $\sim$ devra donc se **démontrer**, jamais se postuler.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que $\succ$ et $\sim$ héritent — et ce qu'elles n'héritent pas.</span>

⚠️ Le livre est explicite : *« Parce que chacune est dérivée de la relation de préférence, on peut s'attendre à ce que chacune partage certaines de ses propriétés. Certaines, oui, mais pas toutes. **En général, les deux sont transitives et aucune des deux n'est complète.** »* — $\succ$ n'est pas complète : si $x^1 \sim x^2$, ni $x^1 \succ x^2$ ni $x^2 \succ x^1$. — $\sim$ n'est pas complète : deux paniers peuvent être strictement ordonnés. C'est l'objet de l'exercice 1.3(a).

</div>

### 2.7 La trichotomie

> *« Pour toute paire $x^1$ et $x^2$, exactement une de trois possibilités mutuellement exclusives est vraie : $x^1 \succ x^2$, ou $x^2 \succ x^1$, ou $x^1 \sim x^2$. »*

C'est l'exercice 1.3(b). Ce résultat est ce qui donne son sens géométrique à la définition suivante : les trois cas **partitionnent** l'ensemble de consommation.

<details class="details--riche">
<summary>

**Exercice 1.3(b) — démonstration de la trichotomie**

</summary>

*Le livre pose l'exercice sans corrigé ni indication. Corrigé pédagogique reconstitué.*

Soient $x^1,x^2\in X$. Posons $A:\ x^1\succsim x^2$ et $B:\ x^2\succsim x^1$. Par **complétude**, au moins l'un de $A$, $B$ est vrai. Il reste trois configurations possibles, et trois seulement :

| $A$ | $B$ | Conclusion par les définitions 1.2 et 1.3 |
|---|---|---|
| vrai | faux | $x^1 \succ x^2$ (déf. 1.2) |
| faux | vrai | $x^2 \succ x^1$ (déf. 1.2) |
| vrai | vrai | $x^1 \sim x^2$ (déf. 1.3) |
| faux | faux | **exclu par la complétude** |

Les trois cas retenus sont **exhaustifs** (la complétude élimine la quatrième ligne) et **mutuellement exclusifs** (ils diffèrent par la valeur de vérité du couple $(A,B)$, qui est unique). $\blacksquare$

**Ce que la preuve montre en creux.** Toute la trichotomie tient dans la **complétude** ; la transitivité n'y sert pas. C'est un bon test : si un énoncé n'utilise que la trichotomie, il tient encore sur des préférences intransitives.

</details>

### 2.8 Les cinq ensembles dérivés

**DEFINITION 1.4 — Sets in $X$ Derived from the Preference Relation.** Soit $x^0$ un point quelconque de $X$. Relativement à ce point, on définit les sous-ensembles suivants de $X$ :

| # | Ensemble | Définition | Nom du livre |
|---|---|---|---|
| 1 | $\succsim(x^0)$ | $\{x \mid x\in X,\ x \succsim x^0\}$ | *at least as good as* — « au moins aussi bon que » |
| 2 | $\precsim(x^0)$ | $\{x \mid x\in X,\ x^0 \succsim x\}$ | *no better than* — « pas meilleur que » |
| 3 | $\prec(x^0)$ | $\{x \mid x\in X,\ x^0 \succ x\}$ | *worse than* — « pire que » |
| 4 | $\succ(x^0)$ | $\{x \mid x\in X,\ x \succ x^0\}$ | *preferred to* — « préféré à » |
| 5 | $\sim(x^0)$ | $\{x \mid x\in X,\ x \sim x^0\}$ | *indifference* — l'ensemble d'indifférence |

> ⚠️ **Le sens de lecture change entre 1 et 2, et entre 3 et 4.** Dans $\succsim(x^0)$ et $\succ(x^0)$, c'est $x$ qui est devant : « $x$ est au moins aussi bon / strictement préféré ». Dans $\precsim(x^0)$ et $\prec(x^0)$, c'est $x^0$ : « $x^0$ est au moins aussi bon / strictement préféré ». Une inversion et vous décrivez l'ensemble complémentaire. Le nom en anglais lève l'ambiguïté à chaque fois — apprenez-les avec le nom.

**La conséquence géométrique (Fig. 1.1).** Les axiomes 1 et 2 obligent le consommateur à ranger **tout** point de $X$ dans exactement une des trois catégories relatives à $x^0$ : pire que $x^0$, indifférent à $x^0$, ou préféré à $x^0$. Donc :

$$\boxed{\;\prec(x^0),\ \sim(x^0),\ \succ(x^0)\ \text{ partitionnent } X\;}$$

**Ce que les axiomes 1 et 2 n'interdisent PAS — et c'est le point de la Fig. 1.1.** Le livre insiste :

> *« Les préférences de la Fig. 1.1 peuvent sembler assez étranges. Elles ne possèdent que la structure la plus limitée, et pourtant elles sont entièrement cohérentes avec les deux premiers axiomes, et permises par eux. Rien de ce qui a été supposé jusqu'ici n'interdit aucune des "irrégularités" qui y sont représentées, telles que les zones d'indifférence "épaisses", ou les "trous" et "courbes" à l'intérieur de l'ensemble d'indifférence $\sim(x^0)$. »*

C'est la clé de tout le §1.2.1 : **chaque axiome supplémentaire sert à interdire une pathologie précise**. Le tableau du Concept 3 les recense.

<details class="details--riche">
<summary>

**Exercice 1.2 — les quatre inclusions entre relations**

</summary>

**Énoncé.** Soit $\succsim$ une relation de préférence. Prouver : (a) $\succ\ \subset\ \succsim$ (b) $\sim\ \subset\ \succsim$ (c) $\succ \cup \sim\ =\ \succsim$ (d) $\succ \cap \sim\ =\ \varnothing$.

**Indication du livre (p. 631) :** *« Use the definitions »* — servez-vous des définitions.

*Corrigé pédagogique reconstitué à partir de cette indication.* On raisonne sur les relations vues comme des **ensembles de couples** $(x^1,x^2)$.

**(a) $\succ\ \subset\ \succsim$.** Si $x^1\succ x^2$, la définition 1.2 donne directement $x^1\succsim x^2$ (c'est sa première clause). Donc tout couple de $\succ$ est un couple de $\succsim$.

**(b) $\sim\ \subset\ \succsim$.** Si $x^1\sim x^2$, la définition 1.3 donne $x^1\succsim x^2$ (première clause). Même conclusion.

**(c) $\succ \cup \sim\ =\ \succsim$.** *Inclusion $\subseteq$* : elle résulte de (a) et (b). *Inclusion $\supseteq$* : soit $x^1\succsim x^2$. Deux cas selon que $x^2\succsim x^1$ ou non. – Si oui : les deux clauses de la définition 1.3 sont réunies, donc $x^1\sim x^2$. – Si non : les deux clauses de la définition 1.2 sont réunies, donc $x^1\succ x^2$. Dans les deux cas le couple est dans $\succ \cup \sim$.

**(d) $\succ \cap \sim\ =\ \varnothing$.** Supposons $x^1\succ x^2$ **et** $x^1\sim x^2$. La définition 1.2 exige non$(x^2\succsim x^1)$ ; la définition 1.3 exige $x^2\succsim x^1$. Contradiction. $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que (c) et (d) disent ensemble.</span>

$\succ$ et $\sim$ forment une **partition** de $\succsim$. C'est la version « relationnelle » de la trichotomie du §2.7, et c'est ce qui autorise à écrire, sans perte, tout énoncé sur $\succsim$ comme une disjonction sur $\succ$ et $\sim$.

</div>

</details>

<details class="details--riche">
<summary>

**Exercice 1.4 — transitivité de $\succ$ et de $\sim$ (l'indication du livre, développée)**

</summary>

**Énoncé.** Prouver que si $\succsim$ est une relation de préférence, alors $\succ$ est transitive et $\sim$ est transitive. Montrer aussi que si $x^1 \sim x^2 \succ x^3$, alors $x^1 \succ x^3$.

**Indication du livre (p. 631), citée puis complétée** — c'est l'une des rares fois où le livre déroule presque tout :

> *« Pour vous lancer, prenez la relation d'indifférence. Considérez trois points quelconques $x^i\in X$, $i=1,2,3$, où $x^1\sim x^2$ et $x^2\sim x^3$. Nous voulons montrer que $x^1\sim x^2$ et $x^2\sim x^3 \Rightarrow x^1\sim x^3$. Par définition de $\sim$, $x^1\sim x^2 \Rightarrow x^1\succsim x^2$ et $x^2\succsim x^1$. De même, $x^2\sim x^3 \Rightarrow x^2\succsim x^3$ et $x^3\succsim x^2$. Par transitivité de $\succsim$, $x^1\succsim x^2$ et $x^2\succsim x^3 \Rightarrow x^1\succsim x^3$. Continuez. »*

**« Continuez » — la suite.** Symétriquement, $x^3\succsim x^2$ et $x^2\succsim x^1$ donnent, par transitivité de $\succsim$, $x^3\succsim x^1$. Les deux clauses de la définition 1.3 sont réunies : $x^1\sim x^3$. $\blacksquare$

**Transitivité de $\succ$.** Supposons $x^1\succ x^2$ et $x^2\succ x^3$. – Des premières clauses : $x^1\succsim x^2$ et $x^2\succsim x^3$, d'où $x^1\succsim x^3$ par transitivité de $\succsim$. – Reste à montrer non$(x^3\succsim x^1)$. Par l'absurde, supposons $x^3\succsim x^1$. Avec $x^1\succsim x^2$, la transitivité donne $x^3\succsim x^2$ — ce qui contredit la seconde clause de $x^2\succ x^3$. $\blacksquare$

**Le cas mixte $x^1\sim x^2 \succ x^3 \Rightarrow x^1\succ x^3$.** – $x^1\succsim x^2$ et $x^2\succsim x^3$ donnent $x^1\succsim x^3$. – Par l'absurde, si $x^3\succsim x^1$ : avec $x^1\succsim x^2$ (clause de $\sim$), transitivité $\Rightarrow x^3\succsim x^2$, contredisant $x^2\succ x^3$. $\blacksquare$

> ⚠️ **Le schéma de preuve à mémoriser.** Toute démonstration portant sur $\succ$ se décompose en **deux temps** : la partie « faible » s'obtient par transitivité directe de $\succsim$ ; la partie « stricte » (la négation) s'obtient **par l'absurde**, en réinjectant l'hypothèse contraire dans la transitivité de $\succsim$ pour contredire la clause négative de départ. Ce schéma resservira à l'exercice 1.5 et dans tout le chapitre 5.

**Où ce résultat servira.** La transitivité de $\sim$ est utilisée **explicitement** dans la preuve du théorème 1.1 (unicité du nombre $u(x)$) et dans le calcul de $u^{-1}((a,b))$ à la fin de cette même preuve. Ce n'est donc pas un exercice décoratif.

</details>

<details class="details--riche">
<summary>

**Exercice 1.5 — les sept identités ensemblistes**

</summary>

**Énoncé.** Si $\succsim$ est une relation de préférence, prouver que pour tout $x^0\in X$ :

(a) $\sim(x^0) = \succsim(x^0) \cap \precsim(x^0)$ · (b) $\precsim(x^0) = \sim(x^0) \cup \prec(x^0)$ · (c) $\sim(x^0) \cap \succ(x^0) = \varnothing$ · (d) $\sim(x^0) \cap \prec(x^0) = \varnothing$ · (e) $\prec(x^0) \cap \succ(x^0) = \varnothing$ · (f) $\prec(x^0) \cap \sim(x^0) \cap \succ(x^0) = \varnothing$ · (g) $\prec(x^0) \cup \sim(x^0) \cup \succ(x^0) = X$

**Le livre ne donne ni corrigé ni indication pour cet exercice.** Corrigé pédagogique reconstitué.

**Méthode unique pour les sept.** Traduire chaque appartenance par la définition 1.4, puis appliquer la trichotomie (§2.7) ou les définitions 1.2 et 1.3. Aucun axiome au-delà de 1 et 2 n'est nécessaire.

**(a)** $x\in\succsim(x^0)\cap\precsim(x^0)$ signifie $x\succsim x^0$ **et** $x^0\succsim x$, ce qui est exactement la définition 1.3 de $x\sim x^0$, donc $x\in\sim(x^0)$. La réciproque est la même équivalence lue à l'envers.

**(b)** $x\in\precsim(x^0)$ signifie $x^0\succsim x$. Par la partition $\succsim\ =\ \succ \cup \sim$ (exercice 1.2c) appliquée au couple $(x^0,x)$ : soit $x^0\succ x$ — c'est-à-dire $x\in\prec(x^0)$ — soit $x^0\sim x$ — c'est-à-dire $x\in\sim(x^0)$ (la symétrie de $\sim$ est immédiate sur la définition 1.3).

**(c), (d), (e)** sont les trois exclusions deux à deux de la trichotomie appliquée au couple $(x,x^0)$ : les trois cas $x\succ x^0$, $x\sim x^0$, $x^0\succ x$ sont mutuellement exclusifs.

**(f)** découle de n'importe laquelle des trois précédentes : une intersection triple est incluse dans chacune des intersections doubles, déjà vides.

**(g)** est l'exhaustivité de la trichotomie : tout $x\in X$ vérifie exactement l'un des trois cas.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que l'exercice construit.</span>

(c) à (g) démontrent formellement que $\{\prec(x^0),\ \sim(x^0),\ \succ(x^0)\}$ est une **partition** de $X$ — l'énoncé que le livre avait posé en prose au §2.8. (a) et (b) fournissent les deux réécritures utilisées sans cesse ensuite : $\sim$ comme **intersection de deux fermés** (c'est le point exact où l'axiome 3 fera son travail, §3.1) et $\precsim$ comme **union disjointe**.

</div>

</details>

## 🔴 Concept 3 — Les axiomes de régularité et de goût (§1.2.1, suite)

### 3.1 Comment le livre organise ces axiomes — la clé de lecture

> *« Nous allons considérer plusieurs nouvelles hypothèses sur les préférences. L'une n'a que très peu de signification comportementale et ne parle presque exclusivement que des aspects purement mathématiques de la représentation des préférences ; les autres parlent directement de la question des goûts du consommateur sur les objets du choix. »*

Deux conventions de notation à connaître, énoncées par le livre :

1. À partir d'ici, $X = \mathbb{R}^n_+$ **explicitement**.
2. *« Nous laissons les axiomes à numéro **primé** indiquer des alternatives à la norme, conceptuellement similaires mais légèrement **moins restrictives** que leurs partenaires non primés. »* Et : *« Nous emploierons généralement les versions les plus restrictives considérées. »*

$$\boxed{\;\text{Axiome } 4 \Rightarrow \text{Axiome } 4' \qquad \text{Axiome } 5 \Rightarrow \text{Axiome } 5'\;}$$

> ⚠️ **Le sens du prime est contre-intuitif.** Le prime marque la version **faible**, pas une variante « améliorée ». $4'$ (non-satiété locale) est **plus faible** que $4$ (monotonicité stricte) ; $5'$ (convexité) est **plus faible** que $5$ (convexité stricte). Une erreur d'orientation ici renverse toutes les implications.

### 3.2 Axiome 3 — Continuité

> **AXIOM 3: Continuity.** For all $x \in \mathbb{R}^n_+$, the « at least as good as » set, $\succsim(x)$, and the « no better than » set, $\precsim(x)$, are **closed** in $\mathbb{R}^n_+$.

**Statut.** C'est le seul axiome *« dont le seul effet est d'imposer une sorte de régularité topologique aux préférences, et dont la contribution principale deviendra claire un peu plus tard »*. Il ne dit **rien sur les goûts**.

**Reformulation par complémentation.** *« Rappelons qu'un ensemble est fermé dans un domaine donné si son complémentaire est ouvert dans ce domaine. Ainsi, dire que $\succsim(x)$ est fermé dans $\mathbb{R}^n_+$ revient à dire que son complémentaire, $\prec(x)$, est ouvert dans $\mathbb{R}^n_+$. »*

$$\succsim(x)\ \text{fermé} \iff \prec(x)\ \text{ouvert} \qquad\qquad \precsim(x)\ \text{fermé} \iff \succ(x)\ \text{ouvert}$$

**Reformulation séquentielle — c'est celle qui explique le nom.**

> *« L'axiome de continuité garantit que des renversements soudains de préférence ne se produisent pas. En effet, l'axiome de continuité peut être exprimé de manière équivalente en disant que si chaque élément $y^n$ d'une suite de paniers est au moins aussi bon que (pas meilleur que) $x$, et que $y^n$ converge vers $y$, alors $y$ est au moins aussi bon que (pas meilleur que) $x$. »*

$$y^n \succsim x \ \text{ pour tout } n \quad\text{et}\quad y^n \to y \qquad \Longrightarrow \qquad y \succsim x$$

**Conséquence immédiate sur $\sim(x)$.** *« Notez que parce que $\succsim(x)$ et $\precsim(x)$ sont fermés, $\sim(x)$ l'est aussi, puisque ce dernier est l'intersection des deux premiers. »* — c'est l'exercice 1.5(a) réutilisé, et l'intersection de deux fermés est fermée.

**Ce que l'axiome 3 élimine sur la Fig. 1.1 :** *« la zone ouverte dans l'ensemble d'indifférence représentée au nord-ouest de la Fig. 1.1. »*

<details class="details--riche">
<summary>

**Pourquoi la fermeture, et pas l'ouverture — le raisonnement en clair**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — lire l'axiome 3 comme une interdiction.</span>

</div>

Le livre énonce l'axiome sans détailler *pourquoi* c'est la fermeture qu'il faut. Voici l'argument, en une ligne : **on veut que la limite d'une suite de paniers acceptables reste acceptable**.

Supposons au contraire que $\succsim(x)$ ne soit **pas** fermé. Il existe alors une suite $y^n\in\succsim(x)$ convergeant vers un $y\notin\succsim(x)$, c'est-à-dire — par trichotomie — vers un $y$ tel que $x \succ y$. Le consommateur accepterait donc chaque $y^n$ face à $x$, tout en refusant leur limite : à un cheveu près, sa décision bascule. C'est exactement le « renversement soudain » que l'axiome interdit.

**Le contre-exemple canonique** est celui des préférences **lexicographiques** (exercice 1.13), traité en détail au Concept 4 : l'ensemble « au moins aussi bon que » y est **non fermé**, et c'est précisément pour cela qu'aucune fonction d'utilité continue ne peut les représenter.

</details>

### 3.3 Axiome 4′ — Non-satiété locale

Le livre pose d'abord ce qu'il veut capturer : *« l'idée que les "besoins" sont essentiellement illimités »*, dans un sens **très faible** — *« il existera toujours un ajustement dans la composition du plan de consommation que le consommateur peut imaginer faire pour se donner un plan qu'il préfère. Cet ajustement peut impliquer d'acquérir plus de certains biens et moins d'autres, ou plus de tous les biens, ou même **moins de tous les biens**. »*

> **AXIOM 4′: Local Non-satiation.** For all $x^0 \in \mathbb{R}^n_+$, and for all $\varepsilon > 0$, there exists some $x \in B_\varepsilon(x^0) \cap \mathbb{R}^n_+$ such that $x \succ x^0$.

où $B_\varepsilon(x^0)$ désigne la **boule ouverte de rayon $\varepsilon$ centrée en $x^0$** (le livre renvoie à la définition A1.4 de l'appendice mathématique).

**Lecture.** *« Dans tout voisinage d'un point donné $x^0$, aussi petit soit-il, il y aura toujours au moins un autre point $x$ que le consommateur préfère à $x^0$. »*

**Ce qu'il interdit — Fig. 1.2 vs Fig. 1.3.** *« Son effet sur la structure des ensembles d'indifférence est significatif. Il exclut la possibilité d'avoir des "zones d'indifférence", comme celle qui entoure $x^1$ dans la Fig. 1.2. Pour le voir, notez que nous pouvons toujours trouver un $\varepsilon>0$, et une boule $B_\varepsilon(x^1)$, ne contenant rien que des points indifférents à $x^1$. Cela viole bien sûr l'axiome $4'$, parce qu'il exige qu'il y ait toujours au moins un point strictement préféré à $x^1$, quel que soit le $\varepsilon>0$ que nous choisissons. »*

Les préférences de la Fig. 1.3 satisfont $4'$ **en plus** des axiomes 1 à 3.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que la non-satiété locale ne dit PAS.</span>

⚠️ Le livre le souligne juste avant l'axiome 4 : *« elle n'exclut pas la possibilité que l'alternative préférée puisse impliquer **moins** de certains biens, voire de **tous** les biens. Spécifiquement, elle n'implique pas que donner au consommateur plus de tout rende nécessairement ce consommateur meilleur. »* Un consommateur satisfaisant $4'$ peut parfaitement préférer un panier **plus petit**. C'est un piège d'examen classique.

</div>

### 3.4 Axiome 4 — Monotonicité stricte

**La notation vectorielle d'abord.** Le livre la pose juste avant l'axiome :

| Écriture | Signification |
|---|---|
| $x^0 \geq x^1$ | $x^0$ contient **au moins autant** de **chaque** bien que $x^1$ |
| $x^0 \gg x^1$ | $x^0$ contient **strictement plus** de **chaque** bien que $x^1$ |

> **AXIOM 4: Strict Monotonicity.** For all $x^0, x^1 \in \mathbb{R}^n_+$, if $x^0 \geq x^1$ then $x^0 \succsim x^1$, while if $x^0 \gg x^1$, then $x^0 \succ x^1$.

**Lecture.** *« Si un panier contient au moins autant de chaque bien qu'un autre panier, alors le premier est au moins aussi bon que le second. De plus, il est strictement meilleur s'il contient strictement plus de chaque bien. »*

> ⚠️ **Deux implications, deux forces différentes.** $\geq$ donne seulement $\succsim$ ; il faut $\gg$ (**tous** les biens strictement) pour obtenir $\succ$. Écrire « $x^0\geq x^1$ et $x^0\neq x^1$ implique $x^0\succ x^1$ » est une **hypothèse plus forte** que l'axiome 4 tel qu'énoncé par Jehle & Reny. Ne la substituez pas.

**Hiérarchie.** *« L'axiome 4 implique l'axiome $4'$, donc si les préférences satisfont l'axiome 4, elles satisfont automatiquement l'axiome $4'$. »* Exiger 4 a donc les mêmes effets que $4'$, **plus** d'autres.

**Ce que l'axiome 4 ajoute — Fig. 1.4.** Il *« élimine la possibilité que les ensembles d'indifférence dans $\mathbb{R}^2_+$ "se recourbent vers le haut", ou contiennent des segments à pente positive. Il exige aussi que les ensembles "préférés à" soient "au-dessus" des ensembles d'indifférence et que les ensembles "pires que" soient "en dessous". »*

Le raisonnement du livre sur la Fig. 1.4, quadrant par quadrant :

| Quadrant relatif à $x^0$ | Exemple | Relation avec $x^0$ | Conséquence |
|---|---|---|---|
| Nord-est | $x^1$ | plus des **deux** biens $\Rightarrow x^1 \gg x^0 \Rightarrow x^1 \succ x^0$ | tout le quadrant NE $\subset \succ(x^0)$ |
| Sud-ouest | $x^2$ | moins des **deux** biens $\Rightarrow x^0 \gg x^2 \Rightarrow x^0 \succ x^2$ | tout le quadrant SO $\subset \prec(x^0)$ |

Donc **aucun** point strictement au nord-est ni strictement au sud-ouest de $x^0$ ne peut appartenir à $\sim(x^0)$ : la courbe d'indifférence est nécessairement **décroissante**. Un ensemble de préférences satisfaisant les axiomes 1, 2, 3 et 4 est donné en Fig. 1.5.

### 3.5 Axiomes 5′ et 5 — Convexité et convexité stricte

Il reste une pathologie sur la Fig. 1.5 : *« la région non convexe dans la partie nord-ouest de $\sim(x^0)$ »*.

> **AXIOM 5′: Convexity.** If $x^1 \succsim x^0$, then $t x^1 + (1-t)x^0 \succsim x^0$ for all $t \in [0,1]$.

> **AXIOM 5: Strict Convexity.** If $x^1 \neq x^0$ and $x^1 \succsim x^0$, then $t x^1 + (1-t) x^0 \succ x^0$ for all $t \in (0,1)$.

> ⚠️ **Trois différences entre 5′ et 5, toutes indispensables.** (i) L'axiome 5 ajoute l'hypothèse $x^1 \neq x^0$ — sans elle l'énoncé serait absurde ($x^0 \succ x^0$). (ii) La conclusion passe de $\succsim$ à $\succ$. (iii) L'intervalle passe de **fermé** $[0,1]$ à **ouvert** $(0,1)$ — car aux extrémités le combiné *est* l'un des deux points et ne peut lui être strictement préféré.

**Ce que l'un ou l'autre élimine.** *« Choisissez deux points distincts dans l'ensemble d'indifférence représenté [au nord-ouest de la Fig. 1.5]. Parce que $x^1$ et $x^2$ sont tous deux indifférents à $x^0$, nous avons clairement $x^1 \succsim x^2$. Des combinaisons convexes de ces deux points, telles que $x^t$, se situeront à l'intérieur de $\prec(x^0)$, violant les exigences de l'axiome $5'$ **et** de l'axiome 5. »*

**Le statut méthodologique — une remarque importante du livre.**

> *« Pour les besoins de la théorie du consommateur que nous développerons, il s'avère que l'axiome $5'$ peut être imposé **sans aucune perte de généralité**. Le contenu prédictif de la théorie serait le même avec ou sans lui. Bien que le même énoncé ne vaille pas tout à fait pour l'axiome 5, légèrement plus fort, celui-ci **simplifie grandement l'analyse**. »*

Autrement dit : la convexité n'est pas une contrainte empirique défendue, c'est une **commodité analytique assumée**. (Elle donnera l'unicité de la solution au §1.3 — fiche 501.)

### 3.6 Les deux lectures intuitives de la convexité

**Lecture 1 — le biais en faveur de l'équilibre (Fig. 1.6).** Prenons $x^1 \sim x^2$. Le panier $x^1$ contient une proportion « extrême » de bien 2 ; le panier $x^2$ une proportion « extrême » de bien 1. Le consommateur est indifférent entre les deux. Toute combinaison convexe $x^t$ est un panier **plus équilibré** que l'un ou l'autre extrême.

> *« Le propos de l'axiome $5'$ ou de l'axiome 5 est d'interdire au consommateur de préférer de tels extrêmes de consommation. L'axiome $5'$ exige que tout panier relativement équilibré tel que $x^t$ ne soit **pas pire** que l'un ou l'autre des deux extrêmes entre lesquels le consommateur est indifférent. L'axiome 5 va un peu plus loin et exige que le consommateur préfère **strictement** un tel panier relativement équilibré aux deux extrêmes. »*

**Lecture 2 — la courbure et le TMS.**

**Définition (dans le texte, cas $X=\mathbb{R}^2_+$).** La valeur absolue de la pente d'une courbe d'indifférence est le **taux marginal de substitution du bien 2 pour le bien 1** (*marginal rate of substitution of good two for good one*). *« Cette pente mesure, en tout point, le taux auquel le consommateur est juste disposé à céder du bien deux par unité de bien un reçue. Ainsi, le consommateur est indifférent après l'échange. »*

> *« Si les préférences sont strictement monotones, toute forme de convexité exige que les courbes d'indifférence soient au moins faiblement convexes vers l'origine. Cela équivaut à exiger que **le taux marginal de substitution n'augmente pas** lorsqu'on se déplace des paniers tels que $x^1$ vers les paniers tels que $x^2$. »*

| Axiome | Comportement du TMS le long d'une courbe d'indifférence, du nord-ouest au sud-est |
|---|---|
| $5'$ (convexité) | **constant ou décroissant** |
| $5$ (convexité stricte) | **strictement décroissant** |

Cette dernière propriété porte un nom : le **principe de décroissance du taux marginal de substitution en consommation**.

**La formulation en mots du livre, à citer telle quelle en copie :** *« le consommateur n'est pas plus disposé à céder $x_2$ en échange de $x_1$ quand il a relativement peu de $x_2$ et beaucoup de $x_1$ qu'il ne l'est quand il a relativement beaucoup de $x_2$ et peu de $x_1$. »*

### 3.7 Le bilan que fait le livre — la classification en trois familles

> *« Les axiomes sur les préférences du consommateur peuvent être grossièrement classés de la manière suivante. Les axiomes de **complétude** et de **transitivité** décrivent un consommateur qui peut faire des comparaisons cohérentes entre alternatives. L'axiome de **continuité** vise à garantir l'existence d'ensembles "au moins aussi bon que" et "pas meilleur que" topologiquement corrects, et son propos est essentiellement mathématique. **Tous les autres axiomes servent à caractériser les goûts** des consommateurs sur les objets du choix. Typiquement, nous exigeons que les goûts affichent une forme de non-satiété, faible ou forte, et un biais en faveur de l'équilibre en consommation, faible ou fort. »*

**Le tableau de synthèse — un axiome, une pathologie interdite.**

| Axiome | Famille | Ce qu'il interdit exactement | Figure du livre |
|---|---|---|---|
| 1 Complétude | cohérence | l'**incomparabilité** de deux paniers | — |
| 2 Transitivité | cohérence | les **cycles** de préférence | — |
| 3 Continuité | mathématique | les **trous ouverts** dans $\sim(x^0)$, les renversements soudains | Fig. 1.1 → 1.2 |
| 4′ Non-satiété locale | goût | les **zones épaisses** d'indifférence | Fig. 1.2 → 1.3 |
| 4 Monotonicité stricte | goût | les segments d'indifférence à **pente positive** ; place $\succ(x^0)$ « au-dessus » | Fig. 1.4 → 1.5 |
| 5′ Convexité | goût | les **creux concaves** vers l'origine dans $\sim(x^0)$ | Fig. 1.5 → 1.6 |
| 5 Convexité stricte | goût | en plus, les **segments linéaires** dans $\sim(x^0)$ | Fig. 1.6 |

<details class="details--riche">
<summary>

**Exercice 1.8 — les préférences linéaires : $5'$ oui, $5$ non**

</summary>

**Énoncé.** Esquisser une carte d'ensembles d'indifférence tous parallèles, à pente négative, en droites, la préférence croissant vers le nord-est. On sait que de telles préférences satisfont les axiomes 1, 2, 3 et 4. Prouver qu'elles satisfont aussi l'axiome $5'$. Prouver qu'elles ne satisfont **pas** l'axiome 5.

**Le livre ne donne pas d'indication pour cet exercice.** Corrigé pédagogique reconstitué.

**Mise en forme.** Des courbes d'indifférence droites, parallèles, de pente $-a/b$ avec $a,b>0$, préférence croissant au nord-est : cela revient à représenter $\succsim$ par $u(x_1,x_2)=ax_1+bx_2$ (biens **parfaitement substituables**). Vérifions que $u$ représente bien la carte décrite : les ensembles de niveau de $u$ sont les droites $ax_1+bx_2=c$, parallèles, de pente $-a/b<0$, et $u$ croît vers le nord-est.

**$5'$ est satisfait.** Soit $x^1 \succsim x^0$, c'est-à-dire $u(x^1)\geq u(x^0)$. Pour $t\in[0,1]$, la **linéarité** de $u$ donne

$$u\big(tx^1+(1-t)x^0\big) = t\,u(x^1) + (1-t)\,u(x^0) \geq t\,u(x^0)+(1-t)u(x^0) = u(x^0).$$

Donc $tx^1+(1-t)x^0 \succsim x^0$.

**$5$ est violé.** Prenons $x^1 \neq x^0$ sur la **même** courbe d'indifférence, donc $u(x^1)=u(x^0)$ (et en particulier $x^1\succsim x^0$). Le calcul ci-dessus devient une **égalité** :

$$u\big(tx^1+(1-t)x^0\big) = t\,u(x^0)+(1-t)u(x^0) = u(x^0)$$

pour tout $t\in(0,1)$. Le combiné est donc **indifférent** à $x^0$, pas strictement préféré. L'axiome 5 est violé. $\blacksquare$

> **La morale.** C'est la linéarité — donc les **segments** dans les ensembles d'indifférence — qui sépare $5'$ de $5$. Retenez le couple d'exemples : *substituts parfaits* satisfait $5'$ mais pas $5$ ; *Cobb-Douglas* satisfait les deux.

</details>

<details class="details--riche">
<summary>

**Exercice 1.9 — les préférences en angle droit (Leontief) : $4'$ oui, $4$ non**

</summary>

**Énoncé.** Esquisser une carte d'ensembles d'indifférence tous en angles droits parallèles, « coudés » sur la droite $x_1=x_2$. Si la préférence croît vers le nord-est, ces préférences satisfont les axiomes 1, 2, 3 et $4'$. Prouver qu'elles satisfont aussi l'axiome $5'$. Satisfont-elles l'axiome 4 ? Satisfont-elles l'axiome 5 ?

**Le livre ne donne pas d'indication pour cet exercice.** Corrigé pédagogique reconstitué.

**Mise en forme.** Ces préférences sont représentées par $u(x_1,x_2)=\min\{x_1,x_2\}$ (biens **parfaitement complémentaires**, ou préférences de Leontief). Les ensembles de niveau sont bien des angles droits dont le sommet est sur la diagonale $x_1=x_2$.

**$5'$ est satisfait.** Soit $u(x^1)\geq u(x^0)$ et $t\in[0,1]$. Posons $x^t=tx^1+(1-t)x^0$. Pour chaque coordonnée $i\in\{1,2\}$ :

$$x^t_i = t\,x^1_i + (1-t)\,x^0_i \ \geq\ t\,u(x^1) + (1-t)\,u(x^0) \ \geq\ u(x^0),$$

la première inégalité parce que $x^1_i \geq \min\{x^1_1,x^1_2\}=u(x^1)$ et de même pour $x^0$. Comme les **deux** coordonnées de $x^t$ dominent $u(x^0)$, on a $u(x^t)=\min_i x^t_i \geq u(x^0)$, soit $x^t \succsim x^0$. *(C'est le fait général que $\min$ est une fonction **quasiconcave** — exercice 1.12(b).)*

**L'axiome 4 est violé.** Prenons $x^0=(1,1)$ et $x^1=(2,1)$. Alors $x^1 \geq x^0$ et même $x^1\neq x^0$, mais $u(x^1)=\min\{2,1\}=1=u(x^0)$ : les deux paniers sont **indifférents**. Cela ne suffit pas encore à violer l'axiome tel qu'énoncé, qui n'exige $\succ$ que sous $\gg$. Il faut donc vérifier la première clause : $x^1\geq x^0 \Rightarrow x^1 \succsim x^0$ , et la seconde : $x^1 \gg x^0 \Rightarrow x^1 \succ x^0$. Or si $x^1\gg x^0$ alors $x^1_i > x^0_i$ pour les deux $i$, donc $\min_i x^1_i > \min_i x^0_i$ . **Conclusion : l'axiome 4 tel qu'énoncé par Jehle & Reny est en fait SATISFAIT** par $\min\{x_1,x_2\}$. Ce qui est violé, c'est la version renforcée « $x^1\geq x^0$ et $x^1\neq x^0$ $\Rightarrow x^1\succ x^0$ », que l'on rencontre dans d'autres manuels sous le même nom de « monotonicité forte ».

> ⚠️ **C'est exactement le piège signalé au §3.4.** L'énoncé de l'exercice 1.9 dit que ces préférences satisfont « 1, 2, 3 et $4'$ » et demande ensuite « satisfont-elles l'axiome 4 ? ». La réponse dépend de la convention retenue — et **avec la convention de ce livre, la réponse est oui**. Si votre cours utilise la monotonicité forte au sens « $\geq$ et $\neq$ », la réponse devient non. Vérifiez toujours quelle version votre énoncé emploie avant de répondre.

**L'axiome 5 est violé.** Prenons $x^0=(1,2)$ et $x^1=(2,1)$ : $u(x^0)=u(x^1)=1$, donc $x^1\succsim x^0$ et $x^1\neq x^0$. Pour $t=1/2$, $x^t=(1{,}5;\,1{,}5)$ et $u(x^t)=1{,}5>1$. Ici le combiné est bien **strictement** préféré. Mais prenons $x^0=(1,1)$ et $x^1=(1,3)$ : $u(x^1)=1=u(x^0)$, donc $x^1\succsim x^0$, $x^1\neq x^0$, et $x^t=(1,\,1+2t)$ donne $u(x^t)=\min\{1,1+2t\}=1=u(x^0)$ pour tout $t\in(0,1)$. Le combiné est **indifférent**, pas strictement préféré : l'axiome 5 est violé. $\blacksquare$

> **La morale.** Les segments **horizontaux et verticaux** des angles droits jouent ici le rôle que jouaient les segments obliques dans l'exercice 1.8 : ils empêchent la convexité **stricte** sans empêcher la convexité.

</details>

<details class="details--riche">
<summary>

**Exercice 1.7 — sous l'axiome 5′, l'ensemble $\succsim(x^0)$ est convexe**

</summary>

**Énoncé.** Prouver que sous l'axiome $5'$, l'ensemble $\succsim(x^0)$ est un ensemble convexe pour tout $x^0\in X$.

**Le livre ne donne pas d'indication pour cet exercice.** Corrigé pédagogique reconstitué.

**Ce qu'il faut montrer.** Pour $x^1, x^2 \in \succsim(x^0)$ et $t\in[0,1]$, que $tx^1+(1-t)x^2 \in \succsim(x^0)$.

> ⚠️ **Le piège de l'énoncé.** L'axiome $5'$ est écrit relativement au point $x^0$ **lui-même** : « si $x^1 \succsim x^0$ alors $tx^1+(1-t)x^0 \succsim x^0$ ». Il fait intervenir le segment entre $x^1$ et $x^0$, **pas** entre deux points quelconques de $\succsim(x^0)$. La démonstration demande donc un pas de plus.

**Démonstration.** Soient $x^1,x^2\succsim x^0$. Par **complétude**, $x^1\succsim x^2$ ou $x^2\succsim x^1$ ; quitte à échanger les noms, supposons $x^1 \succsim x^2$.

Appliquons l'axiome $5'$ **au point $x^2$** — il est énoncé pour un point de base arbitraire, et $x^2$ en est un : de $x^1 \succsim x^2$ on tire

$$t x^1 + (1-t) x^2 \ \succsim\ x^2 \qquad \text{pour tout } t\in[0,1].$$

Or $x^2 \succsim x^0$ par hypothèse. Par **transitivité** de $\succsim$ :

$$t x^1 + (1-t) x^2 \ \succsim\ x^0,$$

c'est-à-dire $tx^1+(1-t)x^2 \in \succsim(x^0)$. $\blacksquare$

**Les trois ingrédients — à citer dans une copie.** complétude (pour ordonner $x^1$ et $x^2$), axiome $5'$ appliqué au **plus mauvais** des deux, transitivité pour redescendre jusqu'à $x^0$.

**Pourquoi ce résultat compte.** Il est la moitié « ensembliste » du théorème 1.3(2) : $\succsim$ convexe $\iff$ $u$ quasiconcave. En effet $\succsim(x^0)$ n'est autre que l'**ensemble supérieur** $\{x \mid u(x)\geq u(x^0)\}$ de la fonction d'utilité, et une fonction est quasiconcave précisément quand tous ses ensembles supérieurs sont convexes (théorème A1.14 de l'appendice).

</details>

<details class="details--riche">
<summary>

**Exercice 1.10 — convexe par endroits, linéaire par endroits**

</summary>

**Énoncé.** Esquisser un ensemble de préférences satisfaisant les axiomes 1, 2, 3 et 4, dont les ensembles d'indifférence sont convexes vers l'origine par endroits et contiennent des « segments linéaires » à d'autres endroits. Prouver que de telles préférences sont cohérentes avec l'axiome $5'$ mais violent l'axiome 5.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Construction.** Prenons $u(x_1,x_2)=\min\{x_1+2x_2,\ 2x_1+x_2\}$ — le minimum de deux fonctions linéaires.

- Chaque courbe de niveau est formée de **deux segments** se rencontrant sur la diagonale $x_1=x_2$ : c'est un « coude », convexe vers l'origine au point de rencontre, **linéaire** de part et d'autre.
- $u$ est strictement croissante en chaque argument ⇒ axiomes 4 et $4'$ ; elle est continue ⇒ axiome 3 ; elle représente une relation complète et transitive par construction ⇒ axiomes 1 et 2 .

**$5'$ .** $u$ est le **minimum de deux fonctions concaves** (linéaires), donc concave, donc quasiconcave. Par le théorème 1.3(2), $\succsim$ est convexe. *(Alternativement, sans invoquer le théorème 1.3 : les ensembles supérieurs de $u$ sont des intersections de deux demi-plans, donc convexes.)*

**$5$ .** Prenons deux points **distincts sur un même segment linéaire** d'une courbe de niveau, par exemple $x^0=(3,0)$ et $x^1=(1,1)$ : $u(x^0)=\min\{3,6\}=3$ et $u(x^1)=\min\{3,3\}=3$. Ils sont indifférents. Pour $t=1/2$, $x^t=(2;\,0{,}5)$ et $u(x^t)=\min\{2+1,\ 4+0{,}5\}=3$ : **indifférent**, pas strictement préféré. L'axiome 5 est violé. $\blacksquare$

> **Le principe général qui unifie les exercices 1.8, 1.9 et 1.10.** L'axiome 5 est violé **dès qu'un ensemble d'indifférence contient un segment de droite non réduit à un point** — quelle que soit sa pente et quelle que soit la courbure ailleurs. C'est le test à appliquer immédiatement.

</details>

<details class="details--riche">
<summary>

**Exercice 1.6 — quand la convexité est empiriquement fausse**

</summary>

**Énoncé.** Citer un exemple crédible où les préférences d'un « consommateur ordinaire » seraient peu susceptibles de satisfaire l'axiome de convexité.

**Le livre ne donne pas de corrigé.** Réponse pédagogique reconstitue.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours).</span>

</div>

La convexité dit : *entre deux paniers indifférents, le mélange n'est pas pire*. Elle échoue chaque fois que les biens sont **complémentaires dans le temps ou dans l'usage**, de sorte que le mélange détruit la valeur des deux.

**Exemple type — les vacances.** Un consommateur est indifférent entre (14 jours à la montagne, 0 jour à la mer) et (0 jour à la montagne, 14 jours à la mer). Le mélange (7, 7) implique deux voyages, deux fois les frais de transport et deux fois moins d'installation : il est plausible qu'il le juge **strictement pire** que chacun des extrêmes. Les courbes d'indifférence sont alors **concaves** vers l'origine.

**Autres cas classiques du même type :** un billet d'avion pour Tokyo ou pour New York plutôt que deux demi-billets ; une paire de chaussures de la même pointure plutôt que deux chaussures dépareillées ; l'apprentissage approfondi d'une langue plutôt que des rudiments de deux.

**Le trait commun.** Il y a un **coût fixe** ou une **indivisibilité** dans la consommation. Le modèle de base l'exclut par construction : rappelez-vous que le livre a supposé dès le §1.1 des biens *« infiniment divisibles »*.

</details>

<details class="details--riche">
<summary>

**Exercice 1.12 — deux propriétés stables par combinaison**

</summary>

**Énoncé.** Soient $u(x_1,x_2)$ et $v(x_1,x_2)$ deux fonctions d'utilité. (a) Prouver que si $u$ et $v$ sont toutes deux homogènes de degré $r$, alors $s \equiv u+v$ est homogène de degré $r$. (b) Prouver que si $u$ et $v$ sont quasiconcaves, alors $m \equiv \min\{u,v\}$ est aussi quasiconcave.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**(a)** Par définition, $u$ est homogène de degré $r$ si $u(tx)=t^r u(x)$ pour tout $t>0$. Alors, pour tout $t>0$ :

$$s(tx_1,tx_2)=u(tx_1,tx_2)+v(tx_1,tx_2)=t^r u(x_1,x_2)+t^r v(x_1,x_2)=t^r\,s(x_1,x_2). \ \blacksquare$$

**(b)** On utilise la caractérisation par les **ensembles supérieurs** (théorème A1.14) : $f$ est quasiconcave $\iff$ $S_c(f)\equiv\{x \mid f(x)\geq c\}$ est convexe pour tout $c$.

Or, pour tout $c$ :

$$S_c(m) = \{x \mid \min\{u(x),v(x)\}\geq c\} = \{x \mid u(x)\geq c \ \text{ et } \ v(x)\geq c\} = S_c(u)\cap S_c(v).$$

$S_c(u)$ et $S_c(v)$ sont convexes par quasiconcavité de $u$ et $v$ ; l'**intersection de deux convexes est convexe** (théorème A1.1). Donc $S_c(m)$ est convexe pour tout $c$, et $m$ est quasiconcave. $\blacksquare$

> ⚠️ **Le piège de (b).** Ne cherchez pas à vérifier l'inégalité $m(tx+(1-t)y)\geq\min\{m(x),m(y)\}$ à la main : elle est vraie mais pénible. Le passage par les ensembles supérieurs la rend triviale. C'est le réflexe à prendre pour toute question de quasiconcavité.
>
> **Et une mise en garde qui n'est pas dans l'énoncé :** le résultat (b) est **faux pour la somme**. La somme de deux fonctions quasiconcaves n'est pas nécessairement quasiconcave (contrairement à la somme de deux fonctions **concaves**). C'est une des raisons pour lesquelles la quasiconcavité, plus faible que la concavité, est aussi plus fragile.

</details>

## 🔴 Concept 4 — La fonction d'utilité (§1.2.2)

### 4.1 Le statut de l'utilité — à comprendre avant tout calcul

> *« Dans la théorie moderne, une fonction d'utilité est simplement un instrument commode pour résumer l'information contenue dans la relation de préférence du consommateur — ni plus, ni moins. Parfois il est plus facile de travailler directement avec la relation de préférence et ses ensembles associés. D'autres fois, en particulier lorsqu'on souhaite employer les méthodes du calcul différentiel, il est plus facile de travailler avec une fonction d'utilité. Dans la théorie moderne, **la relation de préférence est prise comme le primitif**, la caractérisation la plus fondamentale des préférences. La fonction d'utilité ne fait que "représenter", ou résumer, l'information transmise par la relation de préférence. »*

**DEFINITION 1.5 — A Utility Function Representing the Preference Relation.** Une fonction à valeurs réelles $u : \mathbb{R}^n_+ \to \mathbb{R}$ est appelée une **fonction d'utilité représentant la relation de préférence** $\succsim$ si, pour tous $x^0, x^1 \in \mathbb{R}^n_+$ :

$$\boxed{\;u(x^0) \geq u(x^1) \iff x^0 \succsim x^1\;}$$

> *« Ainsi, une fonction d'utilité représente la relation de préférence d'un consommateur si elle assigne des nombres plus élevés aux paniers préférés. »*

> ⚠️ **C'est une équivalence, pas une implication.** Les deux sens comptent. « $\Rightarrow$ » dit que $u$ ne crée pas d'ordre là où il n'y en a pas ; « $\Leftarrow$ » dit que $u$ n'en perd aucun. Une fonction qui ne satisferait qu'un seul sens ne **représente pas** $\succsim$.

### 4.2 La question d'existence

> *« Une question qui a attiré autrefois une grande attention des théoriciens concernait les propriétés qu'une relation de préférence doit posséder pour garantir qu'elle puisse être représentée par une fonction continue à valeurs réelles. La question est importante parce que l'analyse de nombreux problèmes de théorie du consommateur est énormément simplifiée si nous pouvons travailler avec une fonction d'utilité, plutôt qu'avec la relation de préférence elle-même. »*

**Le résultat général, cité par le livre sans démonstration :**

> *« Il peut être montré que **toute relation binaire complète, transitive et continue peut être représentée par une fonction d'utilité continue à valeurs réelles**. (Dans les exercices, on vous demande de montrer que ces trois axiomes sont aussi **nécessaires** pour une telle représentation.) […] En particulier, la représentabilité ne dépend d'aucune hypothèse sur les goûts du consommateur, telles que la convexité ou même la monotonicité. »*

Références données en note : Barten et Böhm (1982) ; la référence classique est **Debreu (1954)**.

> ⚠️ **Trois axiomes suffisent — 1, 2 et 3.** Ni la monotonicité, ni la convexité, ni aucun axiome de goût n'est nécessaire à la représentabilité. Confondre « axiomes nécessaires à l'existence de $u$ » et « axiomes de l'hypothèse 1.2 » est une erreur fréquente.

**Ce que le livre démontre effectivement — un résultat un peu moins général :**

> *« Ici nous examinerons en détail un résultat légèrement moins général. En plus des trois axiomes les plus fondamentaux mentionnés précédemment, nous imposerons l'exigence supplémentaire que les préférences soient **strictement monotones**. Bien que ce ne soit pas essentiel à la représentabilité, l'exiger simplifie simultanément les aspects purement mathématiques du problème et augmente le contenu intuitif de la démonstration. Notez cependant que nous n'exigerons **aucune forme de convexité**. »*

### 4.3 Théorème 1.1 — existence

> **THEOREM 1.1 — Existence of a Real-Valued Function Representing the Preference Relation.** If the binary relation $\succsim$ is **complete**, **transitive**, **continuous**, and **strictly monotonic**, there exists a **continuous** real-valued function $u : \mathbb{R}^n_+ \to \mathbb{R}$ which represents $\succsim$.

**La mise en garde du livre sur ce que le théorème ne dit pas :**

<div class="callout" data-kind="formel">

<span class="callout__lab">théorème d'existence</span>

*« Notez soigneusement que c'est seulement un . Il affirme simplement que sous les conditions énoncées, au moins une fonction continue à valeurs réelles représentant la relation de préférence est garantie d'exister. Il peut y en avoir, et en fait il y en aura toujours, plus d'une. Le théorème lui-même, cependant, ne dit rien sur combien il y en a de plus, ni n'indique en aucune façon quelle forme l'une d'elles doit prendre. Par conséquent, si nous pouvons imaginer ne serait-ce qu'**une** fonction qui soit continue et qui représente les préférences données, nous aurons démontré le théorème. »*

</div>

$$\boxed{\;\text{Stratégie : construire UNE fonction, n'importe laquelle, et vérifier qu'elle marche.}\;}$$

### 4.4 La preuve du théorème 1.1 — en entier

C'est **la** démonstration à savoir refaire du §1.2. Elle est courte, mais chaque axiome y sert à un endroit précis.

**L'idée centrale.** Poser $e \equiv (1,\dots,1) \in \mathbb{R}^n_+$, le **vecteur de uns**, et définir $u(x)$ comme le **nombre de fois qu'il faut prendre $e$** pour égaler $x$ en satisfaction :

$$u(x)\,e \sim x \tag{P.1}$$

> *« En mots, (P.1) dit : "prenez n'importe quel $x$ dans le domaine $\mathbb{R}^n_+$ et assignez-lui le nombre $u(x)$ tel que le panier $u(x)e$, avec $u(x)$ unités de chaque bien, soit classé indifférent à $x$". »*

**La géométrie (Fig. 1.7), expliquée par la note 3 du livre.** Pour $t\geq0$, le vecteur $te = t(1,\dots,1)=(t,\dots,t)$ est un point dont **toutes les coordonnées valent $t$**. Si $t=0$, $te$ est l'origine ; si $t=1$, $te=e$ ; si $t>1$, $te$ est plus loin de l'origine que $e$ ; si $0<t<1$, $te$ est entre l'origine et $e$. Bref, $te$ parcourt la **demi-droite issue de l'origine passant par $e$**, c'est-à-dire la **droite à 45°** de la Fig. 1.7.

**Deux questions à régler pour que (P.1) définisse une fonction :**

1. Un tel nombre $u(x)$ **existe-t-il** toujours ?
2. Est-il **unique** — sans quoi $u$ ne serait pas une fonction bien définie ?

**Étape 1 — l'existence.** Fixons $x \in \mathbb{R}^n_+$ et considérons deux sous-ensembles de $\mathbb{R}$ :

$$A \equiv \{\,t \geq 0 \mid te \succsim x\,\} \qquad\qquad B \equiv \{\,t \geq 0 \mid x \succsim te \,\}$$

Si $t^* \in A \cap B$, alors $t^*e \succsim x$ **et** $x \succsim t^*e$, donc $t^*e \sim x$ : poser $u(x)=t^*$ satisfait (P.1). Il suffit donc de montrer que $A \cap B \neq \varnothing$.

| Pas | Argument | Axiome employé |
|---|---|---|
| $A$ et $B$ sont **fermés** dans $\mathbb{R}_+$ | c'est l'exercice 1.11 | **continuité** |
| $t \in A \Rightarrow t' \in A$ pour tout $t' \geq t$ | monter sur la diagonale ne peut que faire monter | **monotonicité stricte** |
| donc $A = [\underline t,\ \infty)$ | un fermé de $\mathbb{R}_+$ stable par le haut est une demi-droite fermée | — |
| de même $B = [0,\ \bar t\,]$ | symétriquement, $B$ est stable par le **bas** | monotonicité + continuité |
| $A \cup B = \mathbb{R}_+$ | pour tout $t\geq0$, soit $te \succsim x$, soit $x \succsim te$ | **complétude** |
| donc $[0,\bar t\,] \cup [\underline t, \infty) = \mathbb{R}_+$, d'où $\underline t \leq \bar t$ | sinon il resterait le trou $(\bar t, \underline t)$ | — |
| **conclusion** $A \cap B = [\underline t, \bar t\,] \neq \varnothing$ |  |  |

**Étape 2 — l'unicité.** Il faut montrer qu'il n'y a **qu'un** nombre $t \geq 0$ tel que $te \sim x$.

Supposons $t_1 e \sim x$ et $t_2 e \sim x$. Par **transitivité de $\sim$** (exercice 1.4), $t_1 e \sim t_2 e$. Par **monotonicité stricte**, il faut $t_1 = t_2$ — car si l'on avait par exemple $t_1 > t_2$, alors $t_1 e \gg t_2 e$ et donc $t_1 e \succ t_2 e$, contredisant l'indifférence.

**Conclusion des étapes 1 et 2 :** pour chaque $x\in\mathbb{R}^n_+$ il existe **exactement un** nombre $u(x)$ satisfaisant (P.1). La fonction $u$ est bien définie.

**Étape 3 — $u$ représente bien $\succsim$.** Considérons deux paniers $x^1$ et $x^2$ et leurs nombres associés $u(x^1)$, $u(x^2)$, qui satisfont par définition $u(x^1)e \sim x^1$ et $u(x^2)e \sim x^2$. Alors :

$$x^1 \succsim x^2 \tag{P.2}$$

$$\iff u(x^1)e \sim x^1 \succsim x^2 \sim u(x^2)e \tag{P.3}$$

$$\iff u(x^1)e \succsim u(x^2)e \tag{P.4}$$

$$\iff u(x^1) \geq u(x^2) \tag{P.5}$$

**Justification de chaque flèche, telle que donnée par le livre :**

| Passage | Justification |
|---|---|
| (P.2) $\iff$ (P.3) | par **définition de $u$** |
| (P.3) $\iff$ (P.4) | par la **transitivité de $\succsim$**, la **transitivité de $\sim$**, et la définition de $u$ |
| (P.4) $\iff$ (P.5) | par la **monotonicité stricte** de $\succsim$ |

Ensemble, (P.2) à (P.5) donnent (P.2) $\iff$ (P.5), c'est-à-dire $x^1 \succsim x^2$ si et seulement si $u(x^1) \geq u(x^2)$ : c'est exactement la définition 1.5.

**Étape 4 — $u$ est continue.** Par le **théorème A1.6**, il suffit de montrer que l'image réciproque par $u$ de toute boule ouverte de $\mathbb{R}$ est ouverte dans $\mathbb{R}^n_+$. Comme les boules ouvertes de $\mathbb{R}$ sont les **intervalles ouverts**, cela revient à montrer que $u^{-1}\big((a,b)\big)$ est ouvert dans $\mathbb{R}^n_+$ pour tous $a<b$.

$$u^{-1}\big((a,b)\big) = \{x \in \mathbb{R}^n_+ \mid a < u(x) < b\}$$

$$= \{x \in \mathbb{R}^n_+ \mid ae \prec u(x)e \prec be\}$$

$$= \{x \in \mathbb{R}^n_+ \mid ae \prec x \prec be\}$$

| Égalité | Justification (livre) |
|---|---|
| 1ʳᵉ | définition de l'image réciproque |
| 2ᵉ | **monotonicité** de $\succsim$ |
| 3ᵉ | $u(x)e \sim x$ et l'exercice 1.4 (le cas mixte $\sim$ puis $\succ$) |

En réécrivant le dernier ensemble comme intersection :

$$u^{-1}\big((a,b)\big) = \succ(ae)\ \cap\ \prec(be) \tag{P.6}$$

Par **continuité** de $\succsim$, les ensembles $\precsim(ae)$ et $\succsim(be)$ sont fermés dans $X=\mathbb{R}^n_+$. Les deux ensembles du membre droit de (P.6), étant leurs **complémentaires**, sont donc **ouverts** dans $\mathbb{R}^n_+$. Donc $u^{-1}((a,b))$, intersection de deux ouverts, est ouvert (exercice A1.28). $\blacksquare$

**Le récapitulatif à mémoriser — quel axiome sert où :**

| Axiome | Rôle exact dans la preuve |
|---|---|
| **Complétude** | $A \cup B = \mathbb{R}_+$ (étape 1) — sans elle, un trou peut subsister |
| **Transitivité** | chaînage (P.3)→(P.4) (étape 3) et transitivité de $\sim$ (étape 2) |
| **Continuité** | fermeture de $A$ et $B$ (étape 1) ; ouverture de $\succ(ae)$ et $\prec(be)$ (étape 4) |
| **Monotonicité stricte** | structure d'intervalle de $A$ et $B$ (étape 1) ; unicité (étape 2) ; (P.4)→(P.5) (étape 3) |

<details class="details--riche">
<summary>

**Exercice 1.11 — la fermeture de $A$ et $B$, le maillon laissé au lecteur**

</summary>

**Énoncé.** Montrer que si $\succsim$ est continue, alors les ensembles $A$ et $B$ définis dans la preuve du théorème 1.1 sont des sous-ensembles **fermés** de $\mathbb{R}$.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Rappel des définitions.** $A = \{t\geq0 \mid te \succsim x\}$, $B=\{t\geq0 \mid x \succsim te\}$, à $x$ **fixé**.

**Méthode : par les suites.** Soit $(t_k)$ une suite de $A$ convergeant vers $t \geq 0$. Il faut montrer $t\in A$.

Posons $y^k \equiv t_k e$. Chaque $y^k$ vérifie $y^k \succsim x$, c'est-à-dire $y^k \in \succsim(x)$. L'application $t \mapsto te$ étant continue de $\mathbb{R}_+$ dans $\mathbb{R}^n_+$, on a $y^k \to te$.

L'axiome 3 dit que $\succsim(x)$ est **fermé** dans $\mathbb{R}^n_+$. Un ensemble fermé contient les limites de ses suites convergentes : donc $te \in \succsim(x)$, c'est-à-dire $te \succsim x$, c'est-à-dire $t \in A$.

**Pour $B$ :** identique, en remplaçant $\succsim(x)$ par $\precsim(x)$, lui aussi fermé par l'axiome 3. $\blacksquare$

> **Le point technique à ne pas manquer.** La preuve utilise que $A$ est l'**image réciproque** du fermé $\succsim(x)$ par l'application continue $t\mapsto te$ — et que l'image réciproque d'un fermé par une application continue est fermée (c'est le théorème A1.6 sous sa forme « fermés »). C'est la version abstraite de l'argument par suites ci-dessus ; l'une ou l'autre convient en copie.

</details>

<details class="details--riche">
<summary>

**Exercice 1.13 — les préférences lexicographiques : pourquoi la continuité est indispensable**

</summary>

**Énoncé.** Un consommateur a des **préférences lexicographiques** sur $x\in\mathbb{R}^2_+$ si $\succsim$ satisfait

$$x^1 \succsim x^2 \quad\text{dès que}\quad x^1_1 > x^2_1, \quad\text{ou}\quad x^1_1 = x^2_1 \ \text{ et } \ x^1_2 \geq x^2_2.$$

(a) Esquisser une carte d'indifférence pour ces préférences. (b) Ces préférences peuvent-elles être représentées par une fonction d'utilité **continue** ? Pourquoi ou pourquoi pas ?

**Le livre ne donne pas d'indication pour cet exercice.** Corrigé pédagogique reconstitué. *C'est le contre-exemple canonique du chapitre : il montre que l'axiome 3 n'est pas décoratif.*

**(a) La carte d'indifférence.** On compare d'abord sur le bien 1 ; en cas d'égalité seulement, on départage sur le bien 2 — comme dans un dictionnaire, d'où le nom.

Deux paniers sont indifférents **si et seulement si ils sont identiques** :

$$x^1 \sim x^2 \iff x^1_1=x^2_1 \ \text{ et } \ x^1_2=x^2_2.$$

Les ensembles d'indifférence sont donc des **points isolés**. Il n'y a pas de « courbe » d'indifférence : la carte est la collection de tous les singletons de $\mathbb{R}^2_+$.

**Vérification des axiomes.** Complétude (on peut toujours comparer). Transitivité (l'ordre lexicographique est un ordre total). Monotonicité stricte . **Continuité** — c'est ce que montre (b).

**(b) Aucune représentation continue n'existe.**

*Argument 1 — l'axiome 3 est violé, donc le théorème 1.1 ne s'applique pas.* Prenons $x^0=(1,1)$ et la suite $y^k = \big(1+\tfrac1k,\ 0\big)$. Pour tout $k$, la première coordonnée de $y^k$ dépasse celle de $x^0$, donc $y^k \succ x^0$ : chaque $y^k$ appartient à $\succsim(x^0)$. Or $y^k \to (1,0)$, et $(1,0)$ a la **même** première coordonnée que $x^0$ mais une seconde coordonnée **inférieure** : donc $x^0 \succ (1,0)$, c'est-à-dire $(1,0) \notin \succsim(x^0)$. L'ensemble $\succsim(x^0)$ **ne contient pas la limite** d'une de ses suites : il n'est pas fermé. L'axiome 3 est violé.

*Argument 2 — l'impossibilité directe, qui est la vraie réponse à « pourquoi pas ».* Supposons qu'une fonction $u$ (même **non continue**) représente ces préférences. Pour chaque réel $a \geq 0$, considérons les deux paniers $(a,0)$ et $(a,1)$. Comme $(a,1) \succ (a,0)$, on a $u(a,1) > u(a,0)$. Choisissons alors un **rationnel** $q(a)$ dans l'intervalle ouvert non vide $\big(u(a,0),\,u(a,1)\big)$.

L'application $a \mapsto q(a)$ est **injective** : si $a < a'$, alors $(a,1)$ a une première coordonnée strictement plus petite que $(a',0)$, donc $(a',0) \succ (a,1)$, donc

$$q(a) < u(a,1) < u(a',0) < q(a').$$

On aurait donc une injection de $\mathbb{R}_+$ (**non dénombrable**) dans $\mathbb{Q}$ (**dénombrable**) — impossible. $\blacksquare$

> ⚠️ **La leçon, et elle est double.** — L'argument 1 montre que ces préférences échouent à l'**axiome 3**, donc échappent au théorème 1.1. Mais échapper à un théorème d'existence ne prouve pas la non-existence. — L'argument 2 est le seul qui prouve vraiment (b) : il n'existe **aucune** fonction d'utilité, continue ou non, représentant l'ordre lexicographique sur $\mathbb{R}^2_+$. C'est un résultat plus fort que ce que l'énoncé demande. En copie, l'argument 1 répond à « l'axiome 3 est-il satisfait ? » ; l'argument 2 répond à « une représentation existe-t-elle ? ». Ne les confondez pas.

</details>

<details class="details--riche">
<summary>

**Exercice 1.14 — la réciproque : si $u$ continue existe, les axiomes 1, 2, 3 suivent**

</summary>

**Énoncé.** Supposons que les préférences $\succsim$ puissent être représentées par une fonction d'utilité **continue**. Montrer que $\succsim$ satisfait les axiomes 1, 2 et 3.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué. *C'est l'exercice annoncé par le texte : « on vous demande de montrer que ces trois axiomes sont aussi nécessaires ».*

Soit $u$ continue représentant $\succsim$, c'est-à-dire $x \succsim y \iff u(x)\geq u(y)$.

**Axiome 1 — complétude.** Pour $x,y\in X$, les nombres réels $u(x)$ et $u(y)$ sont **toujours comparables** : $u(x)\geq u(y)$ ou $u(y)\geq u(x)$. Par la représentation, $x\succsim y$ ou $y\succsim x$. *(C'est la complétude de l'ordre sur $\mathbb{R}$ qui est transportée à $\succsim$.)*

**Axiome 2 — transitivité.** Si $x\succsim y$ et $y\succsim z$, alors $u(x)\geq u(y)$ et $u(y)\geq u(z)$, donc $u(x)\geq u(z)$ par transitivité de $\geq$ sur $\mathbb{R}$, donc $x\succsim z$.

**Axiome 3 — continuité.** Fixons $x$. Alors

$$\succsim(x) = \{y \mid y \succsim x\} = \{y \mid u(y) \geq u(x)\} = u^{-1}\big([\,u(x),+\infty)\big).$$

C'est l'**image réciproque d'un fermé de $\mathbb{R}$ par l'application continue $u$**, donc un fermé de $\mathbb{R}^n_+$ (théorème A1.6). Le même argument avec $u^{-1}\big((-\infty,\,u(x)]\big)$ donne la fermeture de $\precsim(x)$. $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que l'exercice établit, avec le théorème 1.1 et le résultat de Debreu cité par le livre.</span>

$$\boxed{\;\succsim \text{ admet une représentation continue} \iff \succsim \text{ est complète, transitive et continue}\;}$$

Le sens « $\Leftarrow$ » est le théorème de Debreu (1954) que le livre cite sans démontrer ; le sens « $\Rightarrow$ » est cet exercice. Le théorème 1.1 démontre une version affaiblie du sens « $\Leftarrow$ », avec la monotonicité stricte en prime.

</div>

</details>

### 4.5 Théorème 1.2 — l'ordinalité

**Le raisonnement du livre, avant l'énoncé.**

> *« Mais cette représentation par l'utilité n'est **jamais unique**. Si une fonction $u$ représente les préférences d'un consommateur, alors la fonction $v = u+5$ le fera aussi, ou la fonction $v = u^3$, parce que chacune de ces fonctions classe les paniers de la même manière que $u$. C'est un point important sur les fonctions d'utilité qui doit être saisi. »*

> **THEOREM 1.2 — Invariance of the Utility Function to Positive Monotonic Transforms.** Let $\succsim$ be a preference relation on $\mathbb{R}^n_+$ and suppose $u(x)$ is a utility function that represents it. Then $v(x)$ also represents $\succsim$ **if and only if** $v(x) = f(u(x))$ for every $x$, where $f : \mathbb{R} \to \mathbb{R}$ is **strictly increasing on the set of values taken on by $u$**.

C'est l'**exercice 1.19** : le livre laisse la démonstration au lecteur.

> ⚠️ **Trois précisions dans l'énoncé, souvent perdues en le recopiant.** (i) C'est un **si et seulement si** : toute représentation alternative est de cette forme, et toute fonction de cette forme est une représentation. (ii) $f$ doit être **strictement** croissante — pas simplement croissante : une $f$ constante par morceaux écraserait des classements distincts. (iii) $f$ doit être strictement croissante **sur l'ensemble des valeurs prises par $u$**, pas nécessairement sur $\mathbb{R}$ tout entier. C'est ce qui rend l'énoncé exact.

**Le vocabulaire.** *« C'est connu sous plusieurs noms différents dans la littérature. On dit parfois que la fonction d'utilité est **invariante aux transformations monotones positives**, ou parfois qu'elle est **unique à une transformation monotone positive près**. »*

**La conséquence, énoncée deux fois par le livre parce qu'elle est cruciale :**

> *« Si tout ce que nous exigeons de la relation de préférence est que les classements entre paniers aient un sens, alors tout ce qu'une fonction d'utilité représentant cette relation est capable de nous transmettre est une information **ordinale**, ni plus ni moins. »*

> *« Voir la question de la représentation dans une juste perspective nous **libère** et nous **contraint** à la fois. Si nous avons une fonction $u$ qui représente les préférences de certains consommateurs, cela nous libère de transformer $u$ en d'autres formes, peut-être plus commodes ou plus faciles à manipuler, tant que la transformation choisie préserve l'ordre. En même temps, nous sommes contraints par l'avertissement explicite qu'**aucune signification quelconque ne peut être attachée aux nombres réels assignés par une fonction d'utilité donnée à des paniers particuliers** — seulement à l'ordre de ces nombres. »*

Le livre ajoute en note une remarque de vocabulaire : *« Certains théoriciens sont si sensibles à la confusion potentielle entre l'usage moderne du terme "fonction d'utilité" et la notion utilitariste classique d'"utilité" comme quantité mesurable de plaisir ou de peine qu'ils rejettent entièrement la terminologie anachronique et parlent simplement de relations de préférence et de leurs "fonctions de représentation". »*

<details class="details--riche">
<summary>

**Exercice 1.19 — démonstration du théorème 1.2**

</summary>

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

Notons $V = u(\mathbb{R}^n_+)$ l'**ensemble des valeurs prises par $u$**.

**Sens $\Leftarrow$ : si $v = f\circ u$ avec $f$ strictement croissante sur $V$, alors $v$ représente $\succsim$.**

Pour tous $x^0,x^1$ :

$$v(x^0)\geq v(x^1) \iff f\big(u(x^0)\big) \geq f\big(u(x^1)\big) \iff u(x^0) \geq u(x^1) \iff x^0 \succsim x^1.$$

La deuxième équivalence utilise que $f$ est strictement croissante **sur $V$**, donc injective et croissante sur $V$ : $f(s)\geq f(t) \iff s \geq t$ pour $s,t\in V$. La troisième est la définition 1.5 pour $u$.

> ⚠️ **Le détail qui compte.** L'équivalence $f(s)\geq f(t)\iff s\geq t$ exige la **stricte** croissance. Avec $f$ seulement croissante on n'aurait que « $s\geq t \Rightarrow f(s)\geq f(t)$ », et deux paniers strictement ordonnés pourraient recevoir la même valeur.

**Sens $\Rightarrow$ : si $v$ représente aussi $\succsim$, alors $v = f\circ u$ avec $f$ strictement croissante sur $V$.**

*Construction de $f$.* Pour $s \in V$, choisissons un $x_s$ tel que $u(x_s)=s$ et posons $f(s) \equiv v(x_s)$.

*$f$ est bien définie* (indépendante du représentant choisi) : si $u(x)=u(x')=s$, alors $u(x)\geq u(x')$ et $u(x')\geq u(x)$, donc $x\succsim x'$ et $x'\succsim x$ — donc, $v$ représentant aussi $\succsim$, $v(x)\geq v(x')$ et $v(x')\geq v(x)$, soit $v(x)=v(x')$.

*$f$ est strictement croissante sur $V$* : soient $s>t$ dans $V$, avec $u(x_s)=s$, $u(x_t)=t$. Alors $u(x_s)>u(x_t)$, donc $x_s \succsim x_t$ et **non** $x_t\succsim x_s$ — c'est-à-dire $x_s \succ x_t$. Comme $v$ représente $\succsim$, on a $v(x_s)\geq v(x_t)$ et non $v(x_t)\geq v(x_s)$, donc $v(x_s)>v(x_t)$, soit $f(s)>f(t)$.

*Enfin $v = f\circ u$* : pour tout $x$, $f(u(x)) = v(x_{u(x)}) = v(x)$ par le point « bien définie ». $\blacksquare$

**Illustration des deux exemples du livre.** $v=u+5$ : $f(s)=s+5$, strictement croissante sur $\mathbb{R}$ . $v=u^3$ : $f(s)=s^3$, strictement croissante sur $\mathbb{R}$ .

</details>

<details class="details--riche">
<summary>

**Exercice 1.24 — trois transformations à tester**

</summary>

**Énoncé.** Soit $u(x)$ représentant les préférences **monotones** d'un consommateur sur $x\in\mathbb{R}^n_+$. Pour chacune des fonctions $f(x)$ suivantes, dire si $f$ représente aussi les préférences de ce consommateur. Justifier par un argument ou un contre-exemple. (a) $f(x) = u(x) + \big(u(x)\big)^3$ · (b) $f(x) = u(x) - \big(u(x)\big)^2$ · (c) $f(x) = u(x) + \sum_{i=1}^{n} x_i$

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Méthode.** Pour (a) et (b), la fonction est de la forme $f = g\circ u$ : il suffit d'appliquer le théorème 1.2 et de tester la **stricte croissance de $g$**. Pour (c), $f$ n'est **pas** de la forme $g\circ u$ — le théorème 1.2 ne s'applique pas directement et il faut raisonner autrement.

**(a) OUI.** $g(s)=s+s^3$, avec $g'(s)=1+3s^2 \geq 1>0$ pour tout $s$. $g$ est strictement croissante sur $\mathbb{R}$, donc *a fortiori* sur l'ensemble des valeurs de $u$. Par le théorème 1.2, $f$ représente les mêmes préférences.

**(b) NON en général.** $g(s)=s-s^2$, avec $g'(s)=1-2s$, qui est **négatif pour $s>1/2$**. $g$ est donc décroissante sur $(1/2,+\infty)$ : elle **inverse** l'ordre là où $u$ prend des valeurs supérieures à $1/2$.

*Contre-exemple explicite.* Prenons $n=1$ et $u(x)=x$ (préférences monotones ). Alors $f(x)=x-x^2$. On a $u(1)=1 < 2=u(2)$, donc $2 \succ 1$. Mais $f(1)=0$ et $f(2)=-2$, donc $f(1)>f(2)$ : $f$ classe $1$ au-dessus de $2$. $f$ ne représente pas $\succsim$.

> ⚠️ **La réponse « non » a besoin d'un contre-exemple, pas seulement du constat que $g$ n'est pas monotone.** Le théorème 1.2 est un **si et seulement si**, donc en principe le constat suffit ; mais si $u$ ne prenait ses valeurs que dans $(-\infty,1/2]$, $g$ **serait** strictement croissante sur l'ensemble des valeurs de $u$ et $f$ **représenterait** bien $\succsim$. C'est précisément la clause (iii) du théorème 1.2. La bonne réponse est donc : **non en général**, avec le contre-exemple ; **oui** si l'on sait que $u < 1/2$ partout.

**(c) NON.** Ici $f(x)=u(x)+\sum_i x_i$ n'est pas une transformation de $u$ seule, donc le théorème 1.2 est muet. Vérifions directement la définition 1.5… et constatons que **ce n'est pas vrai en général**.

*Contre-exemple.* Prenons $n=2$ et $u(x_1,x_2)=\min\{x_1,x_2\}$ — monotone . Comparons $x^0=(1,1)$ et $x^1=(1,10)$ : $u(x^0)=1=u(x^1)$, donc $x^0 \sim x^1$. Mais $f(x^0)=1+2=3$ et $f(x^1)=1+11=12$ : $f$ les classe strictement.

**Pourquoi cela échoue.** Ajouter un terme qui dépend de $x$ **autrement que par $u(x)$** détruit en général la représentation, car deux paniers indifférents pour $u$ peuvent avoir des $\sum_i x_i$ différents.

> **La morale des trois cas.** Le théorème 1.2 caractérise **exactement** les représentations alternatives : ce sont les $f\circ u$ à $f$ strictement croissante sur $u(X)$, **et rien d'autre**. Toute fonction qui « voit » $x$ au-delà de $u(x)$ est suspecte par construction.

</details>

### 4.6 Théorème 1.3 — le dictionnaire axiomes ↔ propriétés de $u$

> *« Naturellement, toute structure supplémentaire que nous imposons aux préférences se reflétera comme une structure supplémentaire sur la fonction d'utilité qui les représente. De la même manière, chaque fois que nous supposons que la fonction d'utilité a des propriétés au-delà de la continuité, nous invoquerons en fait un ensemble d'hypothèses supplémentaires sur la relation de préférence sous-jacente. **Il y a donc une équivalence entre les axiomes sur les goûts et des propriétés mathématiques spécifiques de la fonction d'utilité.** »*

> **THEOREM 1.3 — Properties of Preferences and Utility Functions.** Let $\succsim$ be represented by $u : \mathbb{R}^n_+ \to \mathbb{R}$. Then:
>
> 1. $u(x)$ is **strictly increasing** if and only if $\succsim$ is **strictly monotonic**.
> 2. $u(x)$ is **quasiconcave** if and only if $\succsim$ is **convex**.
> 3. $u(x)$ is **strictly quasiconcave** if and only if $\succsim$ is **strictly convex**.

$$\boxed{\begin{array}{lcl} \text{axiome } 4 &\longleftrightarrow& u \text{ strictement croissante}\\ \text{axiome } 5' &\longleftrightarrow& u \text{ quasiconcave}\\ \text{axiome } 5 &\longleftrightarrow& u \text{ strictement quasiconcave} \end{array}}$$

C'est l'**exercice 1.23**. Le livre note : *« Le théorème suivant est extrêmement simple à démontrer parce qu'il découle facilement des définitions impliquées. Il vaut la peine d'être vérifié cependant, donc sa démonstration est laissée en exercice. »* Il renvoie au chapitre A1 de l'appendice pour les définitions de *strictement croissante*, *quasiconcave* et *strictement quasiconcave*.

> ⚠️ **L'axiome 3 n'a pas de ligne dans ce dictionnaire.** La continuité de $\succsim$ correspond à la continuité de $u$ — mais ce n'est pas dans le théorème 1.3, c'est dans le théorème 1.1 (sens direct) et l'exercice 1.14 (réciproque). Ne mélangez pas les deux énoncés.

<details class="details--riche">
<summary>

**Exercice 1.23 — démonstration du théorème 1.3**

</summary>

**Indication du livre (p. 631), citée :** *« Pour la partie (2), voir l'axiome $5'$ : notez que les ensembles $\succsim(x)$ sont précisément les **ensembles supérieurs** de la fonction $u(x)$. Rappelez-vous le théorème A1.14. »*

*Corrigé pédagogique reconstitué à partir de cette indication.*

**Rappel des définitions (appendice A1).**

- $u$ est *strictement croissante* si $x^0 \geq x^1 \Rightarrow u(x^0)\geq u(x^1)$, et $x^0 \gg x^1 \Rightarrow u(x^0) > u(x^1)$.
- $u$ est *quasiconcave* si $u(tx^1+(1-t)x^0) \geq \min\{u(x^1),u(x^0)\}$ pour $t\in[0,1]$ ; de façon équivalente (théorème A1.14), si tous ses **ensembles supérieurs** $S_c=\{x\mid u(x)\geq c\}$ sont convexes.
- $u$ est *strictement quasiconcave* si l'inégalité est stricte pour $x^1\neq x^0$ et $t\in(0,1)$.

**(1) $u$ strictement croissante $\iff$ $\succsim$ strictement monotone.** $\Leftarrow$ : si $x^0\geq x^1$, l'axiome 4 donne $x^0\succsim x^1$, donc $u(x^0)\geq u(x^1)$ par la définition 1.5. Si $x^0 \gg x^1$, l'axiome 4 donne $x^0 \succ x^1$, c'est-à-dire $x^0\succsim x^1$ et non $x^1\succsim x^0$ ; par la définition 1.5, $u(x^0)\geq u(x^1)$ et **non** $u(x^1)\geq u(x^0)$, soit $u(x^0)>u(x^1)$. $\Rightarrow$ : exactement le même raisonnement lu à l'envers, la définition 1.5 étant une équivalence.

**(2) $u$ quasiconcave $\iff$ $\succsim$ convexe (axiome $5'$).** L'observation-clé de l'indication : pour tout $x^0$,

$$\succsim(x^0) = \{x \mid x\succsim x^0\} = \{x \mid u(x)\geq u(x^0)\} = S_{u(x^0)},$$

donc **les ensembles $\succsim(x^0)$ sont exactement les ensembles supérieurs de $u$** (pour les niveaux $c$ atteints par $u$).

$\Leftarrow$ (axiome $5'$ $\Rightarrow$ $u$ quasiconcave) : par l'exercice 1.7, l'axiome $5'$ rend chaque $\succsim(x^0)$ convexe, donc chaque ensemble supérieur convexe, donc $u$ quasiconcave par le théorème A1.14. $\Rightarrow$ ($u$ quasiconcave $\Rightarrow$ axiome $5'$) : soit $x^1 \succsim x^0$, donc $u(x^1)\geq u(x^0)$. Par quasiconcavité, pour $t\in[0,1]$,

$$u\big(tx^1+(1-t)x^0\big) \geq \min\{u(x^1),u(x^0)\} = u(x^0),$$

donc $tx^1+(1-t)x^0 \succsim x^0$ : c'est l'axiome $5'$.

**(3) $u$ strictement quasiconcave $\iff$ $\succsim$ strictement convexe (axiome 5).** Même schéma, avec les inégalités strictes. $\Rightarrow$ : si $x^1\neq x^0$ et $x^1\succsim x^0$, alors $u(x^1)\geq u(x^0)$ et, pour $t\in(0,1)$, la stricte quasiconcavité donne $u(tx^1+(1-t)x^0) > \min\{u(x^1),u(x^0)\}=u(x^0)$, soit $tx^1+(1-t)x^0 \succ x^0$. $\Leftarrow$ : symétrique. $\blacksquare$

> **Le fil conducteur des trois preuves.** Aucune n'est difficile parce que la définition 1.5 est une **équivalence** : elle permet de traduire mot à mot chaque énoncé sur $\succsim$ en énoncé sur $u$ et réciproquement. La seule vraie idée est celle de l'indication : *les ensembles « au moins aussi bon que » sont les ensembles supérieurs*.

</details>

## 🟠 Concept 5 — Utilité différentiable, utilité marginale et TMS (fin du §1.2.2)

### 5.1 Différentiabilité : une exigence plus forte que la continuité

> *« La différentiabilité est bien sûr une exigence plus contraignante que la continuité. Intuitivement, la continuité exige qu'il n'y ait pas de renversements soudains de préférence. Elle n'exclut pas les "coudes" ou d'autres formes de comportement continu mais impoli. La différentiabilité exclut spécifiquement de telles choses et garantit que les courbes d'indifférence soient "lisses" aussi bien que continues. »*

**La position du livre, à connaître pour ne pas chercher un axiome qui n'existe pas :**

> *« Comme l'axiome de continuité, ce qu'il faut est juste la bonne condition mathématique. **Nous ne développerons pas cette condition ici**, mais renvoyons le lecteur à Debreu (1972) pour les détails. Pour nos besoins, nous nous contentons de supposer simplement que la représentation par l'utilité est différentiable chaque fois que nécessaire. »*

> ⚠️ **Il n'y a pas d'« axiome 6 » de différentiabilité.** C'est une hypothèse technique posée au coup par coup, pas un axiome sur les préférences. Les préférences de Leontief $\min\{x_1,x_2\}$ satisfont tous les axiomes 1-5′ et ne sont **pas** différentiables (le coude).

### 5.2 L'utilité marginale

**Définition (vocabulaire du livre).** La dérivée partielle première de $u(x)$ par rapport à $x_i$ est l'**utilité marginale du bien $i$** :

$$\text{UM}_i(x) = \frac{\partial u(x)}{\partial x_i}$$

**Le résultat sur son signe :**

> *« Quand $u(x)$ est continûment différentiable sur $\mathbb{R}^n_{++}$ et que les préférences sont strictement monotones, l'utilité marginale de chaque bien est presque toujours strictement positive. C'est-à-dire, $\partial u(x)/\partial x_i > 0$ pour "presque tous" les paniers $x$, et tout $i=1,\dots,n$. »*

Le livre précise en note ce que « presque tous » veut dire : *« tous les paniers sauf un ensemble de mesure de Lebesgue nulle. Cependant, il n'est pas nécessaire d'être familier avec la mesure de Lebesgue pour voir qu'un tel qualificatif est nécessaire. Considérez le cas d'un seul bien, $x$, et la fonction d'utilité $u(x) = x + \sin(x)$. Parce que $u$ est strictement croissante… »*

<details class="details--riche">
<summary>

**Le contre-exemple $u(x) = x + \sin(x)$ — pourquoi « presque tous »**

</summary>

Le livre commence ce contre-exemple en note de bas de page et le laisse au lecteur. *Développement pédagogique reconstitué à partir de la note.*

$$u(x) = x + \sin(x) \qquad\Longrightarrow\qquad u'(x) = 1 + \cos(x).$$

- $u'(x) \geq 0$ **partout**, donc $u$ est croissante.
- $u'(x) = 0$ exactement quand $\cos x = -1$, c'est-à-dire pour $x = \pi + 2k\pi$, $k\in\mathbb{Z}$.
- En ces points, la **tangente est horizontale** : l'utilité marginale s'annule.
- Pourtant $u$ est **strictement croissante** : entre deux points d'annulation consécutifs $u'$ est strictement positive sauf en un point isolé, donc $u(b)-u(a)=\int_a^b u' > 0$ pour $a<b$.

**Conclusion.** Une fonction d'utilité strictement croissante — donc représentant des préférences strictement monotones — peut avoir une utilité marginale **nulle** sur un ensemble de points. Cet ensemble est ici **dénombrable**, donc de mesure de Lebesgue nulle : c'est exactement ce que le qualificatif « presque tous » autorise.

> **L'enjeu pratique.** Beaucoup de raisonnements du chapitre 1 divisent par $\partial u/\partial x_j$ (par exemple pour former le TMS, ou pour éliminer le multiplicateur de Lagrange au §1.3). Le qualificatif « presque tous » est ce qui rend ces divisions légitimes — presque partout.

</details>

### 5.3 Le TMS comme rapport d'utilités marginales — la dérivation complète

Le livre a défini le TMS géométriquement (§3.6) ; il en dérive maintenant l'expression analytique. Suivons-le pas à pas dans le cas de deux biens.

**Pas 1 — paramétrer la courbe d'indifférence.** Considérons un panier $x^1=(x^1_1,x^1_2)$. La courbe d'indifférence passant par $x^1$ est une fonction dans le plan $(x_1,x_2)$ ; notons $x_2 = f(x_1)$ la fonction qui la décrit. Alors, lorsque $x_1$ varie, le panier $(x_1, f(x_1))$ **parcourt** la courbe d'indifférence de $x^1$. Par conséquent, pour tout $x_1$ :

$$u\big(x_1, f(x_1)\big) = \text{constante} \tag{1.1}$$

**Pas 2 — définir le TMS comme valeur absolue de la pente.**

$$\text{MRS}_{12}\big(x^1_1,x^1_2\big) \equiv \big|f'(x^1_1)\big| = -f'(x^1_1) \tag{1.2}$$

la seconde égalité valant *« parce que $f' < 0$ »* — c'est-à-dire parce que la courbe d'indifférence est décroissante (conséquence de l'axiome 4, §3.4).

**Pas 3 — dériver (1.1).** Par (1.1), $u(x_1,f(x_1))$ est une fonction **constante** de $x_1$. Sa dérivée par rapport à $x_1$ est donc nulle. Par la règle de dérivation composée :

$$\frac{\partial u(x_1,x_2)}{\partial x_1} \;+\; \frac{\partial u(x_1,x_2)}{\partial x_2}\, f'(x_1) \;=\; 0 \tag{1.3}$$

**Pas 4 — combiner (1.2) et (1.3).** De (1.3), $f'(x_1) = -\dfrac{\partial u/\partial x_1}{\partial u/\partial x_2}$, donc par (1.2) :

$$\boxed{\;\text{MRS}_{12}(x_1) = \frac{\partial u(x_1)/\partial x_1}{\partial u(x_1)/\partial x_2}\;}$$

**Le cas général à $n$ biens.** *« De même, lorsqu'il y a plus de deux biens, nous définissons le taux marginal de substitution du bien $j$ pour le bien $i$ comme le rapport de leurs utilités marginales »* :

$$\boxed{\;\text{MRS}_{ij}(x) \equiv \frac{\partial u(x)/\partial x_i}{\partial u(x)/\partial x_j}\;}$$

**Interprétation.** *« Lorsque les utilités marginales sont strictement positives, le $\text{MRS}_{ij}(x)$ est à nouveau un nombre positif, et il nous dit le taux auquel le bien $j$ peut être échangé par unité de bien $i$ **sans changement de l'utilité du consommateur**. »*

> ⚠️ **L'ordre des indices — la source d'erreur la plus fréquente du chapitre.** Dans $\text{MRS}_{ij}$, l'utilité marginale du bien **$i$** (le premier indice) est au **numérateur**. Le nom du livre est « taux marginal de substitution **du bien $j$ pour le bien $i$** » — l'ordre des mots est donc **inverse** de l'ordre des indices. Fiez-vous à la formule, pas au nom.
>
> **Vérification de cohérence à faire systématiquement :** $\text{MRS}_{12}$ est la valeur absolue de la pente $|dx_2/dx_1|$, donc « combien de $x_2$ je cède pour une unité de $x_1$ ». Une unité de plus du bien 1 vaut $\partial u/\partial x_1$ ; pour compenser il faut céder $\partial u/\partial x_1 \big/ \partial u/\partial x_2$ unités du bien 2. La formule est bien dans ce sens.

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le TMS est ordinal.</span>

Le TMS ne dépend **pas** de la représentation choisie. Si $v=f\circ u$ avec $f$ strictement croissante et dérivable, alors $\partial v/\partial x_i = f'(u)\,\partial u/\partial x_i$, et le facteur $f'(u)$ **se simplifie** dans le rapport :

$$\text{MRS}^v_{ij}(x) = \frac{f'(u)\,\partial u/\partial x_i}{f'(u)\,\partial u/\partial x_j} = \text{MRS}^u_{ij}(x).$$

C'est le pendant différentiel du théorème 1.2, et c'est ce qui fait du TMS — contrairement à l'utilité marginale elle-même — une **grandeur économiquement significative**.

</div>

### 5.4 Convexité stricte, TMS décroissant et Hessienne

> *« Lorsque les préférences sont strictement convexes, le taux marginal de substitution entre deux biens est toujours **strictement décroissant** le long de toute surface de niveau de la fonction d'utilité. »*

**Le critère matriciel — la caractérisation du second ordre de la quasiconcavité :**

> *« Plus généralement, pour toute fonction d'utilité **quasiconcave**, sa matrice hessienne $H(x)$ des dérivées partielles secondes satisfera*
>
> $$y^{\mathsf T} H(x)\, y \ \leq\ 0 \quad \text{pour tout vecteur } y \text{ tel que } \nabla u(x)\cdot y = 0.\text{ »}$$

**Lecture géométrique donnée par le livre :**

> *« Si l'inégalité est stricte, cela dit que se déplacer depuis $x$ dans une direction $y$ **tangente à la surface d'indifférence** passant par $x$ [c'est-à-dire $\nabla u(x)\cdot y = 0$] **réduit** l'utilité (c'est-à-dire $y^{\mathsf T}H(x)y < 0$). »*

$$\boxed{\;\underbrace{\nabla u(x)\cdot y = 0}_{\text{direction tangente}} \ \Longrightarrow\ \underbrace{y^{\mathsf T}H(x)y \leq 0}_{\text{courbure vers le bas}}\;}$$

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment lire cette condition.</span>

Le gradient $\nabla u(x)$ pointe dans la direction de plus forte augmentation de l'utilité ; les $y$ tels que $\nabla u(x)\cdot y=0$ sont donc les directions dans lesquelles l'utilité ne varie **pas au premier ordre**. La condition dit que dans ces directions-là, le **second ordre** est négatif : la surface d'indifférence s'incurve vers le bas. C'est la traduction exacte de « les ensembles supérieurs sont convexes ».

⚠️ **Ce n'est PAS la concavité de $u$.** La concavité exigerait $y^{\mathsf T}H(x)y\leq0$ pour **tous** les $y$. La quasiconcavité ne l'exige que pour les $y$ **tangents**. Une fonction quasiconcave peut avoir une hessienne indéfinie — c'est le cas de $u(x_1,x_2)=x_1x_2$, dont la hessienne $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ a les valeurs propres $\pm1$.

</div>

## 🟠 Concept 6 — L'hypothèse 1.2, le régime de croisière du chapitre

Le §1.3 s'ouvre en rassemblant les quatre briques. Le consommateur cherche :

$$x^* \in B \quad \text{tel que} \quad x^* \succsim x \ \ \text{pour tout } x \in B \tag{1.4}$$

Et le livre pose alors l'hypothèse qui vaudra **partout ensuite, sauf mention contraire** :

> **ASSUMPTION 1.2 — Consumer Preferences.** The consumer's preference relation $\succsim$ is **complete, transitive, continuous, strictly monotonic, and strictly convex** on $\mathbb{R}^n_+$. Therefore, by Theorems 1.1 and 1.3, it can be represented by a real-valued utility function $u$ that is **continuous, strictly increasing, and strictly quasiconcave** on $\mathbb{R}^n_+$.

$$\boxed{\begin{array}{lcl} \text{axiomes } 1,2,3 &\xrightarrow{\ \text{thm } 1.1\ }& u \text{ continue}\\ \text{axiome } 4 &\xrightarrow{\ \text{thm } 1.3(1)\ }& u \text{ strictement croissante}\\ \text{axiome } 5 &\xrightarrow{\ \text{thm } 1.3(3)\ }& u \text{ strictement quasiconcave} \end{array}}$$

**Ce que cela donne graphiquement (Fig. 1.8).** *« Dans le cas à deux biens, des préférences comme celles-ci peuvent être représentées par une carte d'indifférence dont les ensembles de niveau sont **non sécants**, **strictement convexes** en s'éloignant de l'origine, et **croissants vers le nord-est**. »*

> ⚠️ **L'hypothèse 1.2 est un package, et chaque morceau a un usage précis au §1.3 (fiche 501).** — *continuité* + ensemble budgétaire **compact** → **existence** d'une solution (Weierstrass, thm A1.10) ; — *stricte quasiconcavité* + ensemble budgétaire **convexe** → **unicité** de la solution (exercice 1.16a) ; — *stricte croissance* → la contrainte budgétaire est **saturée**, $p\cdot x^* = y$ (exercice 1.16b). Retenez ce triplet : c'est la réponse type à « à quoi sert chaque hypothèse ? ».

## Comment reconnaître le type d'exercice

Les exercices du §1.6 portant sur ce matériau se répartissent en **six familles**. Chacune se reconnaît à un signal précis dans l'énoncé.

| Signal dans l'énoncé | Famille | Ce qu'on attend de vous | Exercices concernés |
|---|---|---|---|
| « Prouver que $\succ$ / $\sim$ … », des relations sans aucune fonction | **Manipulation des définitions 1.2-1.3** | Dérouler les définitions, et pour toute clause **stricte**, raisonner **par l'absurde** | 1.2, 1.3, 1.4 |
| Des ensembles $\succsim(x^0)$, $\prec(x^0)$… reliés par $\cup$, $\cap$, $=\varnothing$ | **Algèbre des ensembles dérivés** | Traduire par la définition 1.4, puis appliquer la **trichotomie** | 1.5 |
| « Esquisser une carte… puis prouver que l'axiome X est/n'est pas satisfait » | **Test d'axiome sur une carte donnée** | Traduire la carte en une $u$ explicite, tester l'axiome sur $u$ | 1.8, 1.9, 1.10 |
| « Ces préférences peuvent-elles être représentées par une $u$ continue ? » | **Existence d'une représentation** | Tester l'axiome 3 ; si l'on veut la non-existence **absolue**, argument de **cardinalité** | 1.13, 1.14 |
| Une liste de fonctions $f$ construites à partir de $u$ | **Invariance ordinale** | Théorème 1.2 : $f=g\circ u$ ? $g$ strictement croissante **sur $u(X)$** ? | 1.19, 1.21, 1.22, 1.24 |
| « Prouver que si $u$ et $v$ sont …, alors … » | **Stabilité d'une propriété** | Passer par les **ensembles supérieurs** (quasiconcavité) ou la définition d'homogénéité | 1.12 |

**Trois signaux qui trompent — à désamorcer d'emblée :**

- **« Monotone » sans plus de précision.** Le livre a *deux* axiomes de monotonicité (4 et $4'$) et d'autres manuels en ont une troisième version. Avant de répondre, écrivez laquelle vous utilisez.
- **« Convexe ».** Dans un énoncé, « préférences convexes » = axiome $5'$ ; « $u$ convexe » est une propriété **différente** (et incompatible avec la stricte quasiconcavité en général). Ne les confondez pas : c'est **quasiconcave** qui correspond à convexe pour $\succsim$.
- **Une fonction d'utilité donnée par une formule.** Elle est là pour vous laisser calculer, mais la question porte souvent sur $\succsim$. Si la question demande une propriété de $\succsim$, passez par le **théorème 1.3** plutôt que de raisonner sur $u$ sans le dire.

## Comment résoudre ce type d'exercice — les cinq méthodes pas-à-pas

### Méthode 1 — Prouver une propriété de $\succ$ ou de $\sim$

1. **Écrire les définitions 1.2 / 1.3 en clair** pour chaque hypothèse. $x\succ y$ devient *deux* faits : $x\succsim y$ **et** non$(y\succsim x)$.
2. **Traiter la partie faible** par transitivité directe de $\succsim$.
3. **Traiter la partie stricte par l'absurde** : supposer la négation, la réinjecter dans la transitivité de $\succsim$, et contredire une clause négative de départ.
4. Conclure en réunissant les deux clauses de la définition visée.

*Exemple d'application : exercice 1.4, transitivité de $\succ$ (voir le détail plus haut).*

### Méthode 2 — Tester un axiome sur une carte d'indifférence décrite en mots

1. **Traduire la carte en une fonction $u$ explicite.** Droites parallèles décroissantes ⇒ $ax_1+bx_2$. Angles droits sur la diagonale ⇒ $\min\{x_1,x_2\}$. Coudes non extrêmes ⇒ $\min$ de deux formes linéaires.
2. **Vérifier que $u$ représente bien la carte décrite** : ses ensembles de niveau ont-ils la forme annoncée, et croît-elle dans le bon sens ? (Une ligne suffit, mais elle est exigible.)
3. **Écrire l'axiome à tester dans le langage de $u$**, via le théorème 1.3.
4. Pour un **« oui »** : démonstration générale. Pour un **« non »** : **un contre-exemple numérique explicite**, avec les trois valeurs $u(x^0)$, $u(x^1)$, $u(x^t)$ calculées.

> **Le raccourci qui fait gagner du temps.** L'axiome 5 (convexité stricte) est violé **dès qu'un ensemble d'indifférence contient un segment de droite**. Cherchez d'abord un segment ; s'il y en a un, prenez ses deux extrémités et $t=1/2$.

### Méthode 3 — Décider si $f$ représente les mêmes préférences que $u$

1. **$f$ s'écrit-elle $g\circ u$ ?** C'est-à-dire : $f(x)$ ne dépend-il de $x$ que **par l'intermédiaire de $u(x)$** ? – **Non** ⇒ le théorème 1.2 ne s'applique pas. Cherchez deux paniers $x^0 \sim x^1$ (même $u$) mais $f$ différents : la représentation est détruite. – **Oui** ⇒ passer au 2.
2. **Identifier $g$** et calculer $g'$.
3. **Déterminer $V = u(X)$**, l'ensemble des valeurs prises par $u$ — c'est la clause souvent oubliée.
4. **$g$ est-elle strictement croissante sur $V$ ?** – Oui partout ⇒ **$f$ représente $\succsim$**. – Non ⇒ produire un contre-exemple numérique, et préciser que la réponse serait **oui** si $u$ ne prenait ses valeurs que là où $g' > 0$.

### Méthode 4 — Prouver ou réfuter l'existence d'une représentation continue

1. **Tester l'axiome 3** en exhibant une suite : trouver $x^0$ et $y^k \to y$ avec $y^k \succsim x^0$ pour tout $k$ mais $x^0 \succ y$. – Si l'axiome 3 tient, **et** que 1 et 2 tiennent, invoquer le résultat de Debreu (1954) cité p. 13, ou le théorème 1.1 si la monotonicité stricte tient aussi.
2. **Si l'énoncé demande la non-existence d'une représentation quelconque** (pas seulement continue), l'axiome 3 ne suffit pas : il faut un **argument de cardinalité**. Le schéma : associer à chaque élément d'une famille **non dénombrable** un rationnel distinct, et conclure à l'impossibilité.

*Exemple d'application : exercice 1.13 (préférences lexicographiques), traité plus haut.*

### Méthode 5 — Établir une propriété de quasiconcavité

1. **Ne pas** attaquer l'inégalité $u(tx+(1-t)y)\geq\min\{u(x),u(y)\}$ de front.
2. Écrire l'**ensemble supérieur** $S_c=\{x \mid u(x)\geq c\}$ et le simplifier.
3. Montrer que $S_c$ est convexe pour tout $c$, en s'appuyant sur : intersection de convexes convexe (thm A1.1), demi-espaces convexes, images réciproques.
4. Conclure par le **théorème A1.14** (quasiconcavité $\iff$ ensembles supérieurs convexes).

*Exemple d'application : exercice 1.12(b), $\min\{u,v\}$ quasiconcave.*

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Confondre $X$ et $B$ : « il ne peut pas concevoir 40 repas, il n'a que 60 € » | $X$ est ce qui est **concevable**, $B$ ce qui est **atteignable**. $(40,0)\in X$ toujours | $(40,0)\in X$ mais $(40,0)\notin B$ |
| 2 | Lire le « either … or » de l'axiome 1 comme **exclusif** | S'il l'était, l'indifférence serait impossible (déf. 1.3 exige les deux) | Le « ou » est **inclusif** ; l'axiome interdit seulement que **ni** l'un **ni** l'autre ne vaille |
| 3 | Croire que le **prime** marque la version forte | $4'$ et $5'$ sont les versions **faibles** : $4\Rightarrow4'$ et $5\Rightarrow5'$ | Écrire l'implication dans le bon sens avant de raisonner |
| 4 | Énoncer l'axiome 4 comme « $x^0\geq x^1$ et $x^0\neq x^1 \Rightarrow x^0\succ x^1$ » | C'est une hypothèse **strictement plus forte** que celle du livre, qui exige $\gg$ pour conclure $\succ$ | $x^0\geq x^1 \Rightarrow \succsim$ ; **$x^0\gg x^1$** $\Rightarrow \succ$ |
| 5 | Croire que la non-satiété locale implique « plus, c'est mieux » | Le livre le dit explicitement : l'alternative préférée peut contenir **moins** de tous les biens | $4'$ n'ordonne rien selon $\geq$ ; seul l'axiome 4 le fait |
| 6 | Appliquer l'axiome $5'$ à deux points quelconques de $\succsim(x^0)$ | L'axiome est écrit relativement à $x^0$, sur le segment $[x^1,x^0]$ | Ordonner $x^1,x^2$ par complétude, appliquer $5'$ **au plus mauvais**, puis transitivité (exercice 1.7) |
| 7 | Oublier $x^1\neq x^0$ dans l'axiome 5 | Sans elle l'axiome dirait $x^0 \succ x^0$ | Recopier les trois clauses : $x^1\neq x^0$, $x^1\succsim x^0$, $t\in(0,1)$ |
| 8 | Écrire l'axiome 5 avec $t\in[0,1]$ | Aux extrémités, le combiné **est** $x^0$ ou $x^1$ : $\succ$ y est impossible | Intervalle **ouvert** $(0,1)$ pour l'axiome 5, fermé $[0,1]$ pour $5'$ |
| 9 | Croire que la continuité de $\succsim$ est un axiome sur les **goûts** | Le livre : *« son propos est essentiellement mathématique »* | La ranger avec 1 et 2 dans la famille « structure », pas avec 4-5 |
| 10 | Attacher un sens aux **valeurs** de $u$ (« il a 3 fois plus d'utilité ») | L'information est purement **ordinale** (thm 1.2) | Ne comparer que l'**ordre** des nombres |
| 11 | Énoncer le théorème 1.2 avec $f$ « croissante » | Une $f$ croissante non stricte écrase des classements distincts | $f$ **strictement** croissante, **sur $u(X)$** |
| 12 | Oublier la clause « sur l'ensemble des valeurs prises par $u$ » | C'est elle qui décide dans les cas comme $g(s)=s-s^2$ | Toujours déterminer $V=u(X)$ avant de conclure |
| 13 | Confondre quasiconcavité et concavité de $u$ | La concavité exige $y^{\mathsf T}Hy\leq0$ pour **tous** les $y$ ; la quasiconcavité seulement pour les $y$ **tangents** | Citer la restriction $\nabla u(x)\cdot y = 0$ |
| 14 | Croire que la somme de deux fonctions quasiconcaves est quasiconcave | Faux ; c'est vrai pour la concavité, pas pour la quasiconcavité | Seul le **min** est stable (exercice 1.12b) |
| 15 | Inverser les indices du TMS | Dans $\text{MRS}_{ij}$, c'est $\partial u/\partial x_i$ (**premier** indice) au numérateur, alors que le nom dit « du bien $j$ pour le bien $i$ » | Se fier à la formule ; vérifier par « ce que je cède / ce que je reçois » |
| 16 | Croire que le TMS dépend de la fonction d'utilité choisie | Le facteur $f'(u)$ se simplifie dans le rapport | Le TMS est **ordinal**, l'utilité marginale ne l'est pas |
| 17 | Affirmer que sous monotonicité stricte, $\partial u/\partial x_i>0$ **partout** | Contre-exemple du livre : $u(x)=x+\sin x$ s'annule en $\pi+2k\pi$ | Écrire « pour **presque tous** les paniers » |
| 18 | Prétendre que l'axiome 3 est nécessaire à l'existence d'une $u$ **quelconque** | Il l'est pour une $u$ **continue** ; la non-existence absolue demande la cardinalité | Distinguer les deux questions (exercice 1.13) |
| 19 | Croire qu'il existe un « axiome de différentiabilité » | Le livre renvoie explicitement à Debreu (1972) et **ne développe pas** la condition | Dire que la différentiabilité est supposée **au coup par coup** |
| 20 | Dans l'hypothèse 1.2, ne pas savoir à quoi sert chaque morceau | C'est la question type de l'oral | continuité → existence ; stricte quasiconcavité → unicité ; stricte croissance → budget saturé |

## 📌 Ultimate Review

**Les quatre briques.** $X$ (concevable, $=\mathbb{R}^n_+$, hyp. 1.1 : $\subseteq\mathbb{R}^n_+$, fermé, convexe, $0\in X$) · $B\subset X$ (atteignable) · $\succsim$ (classement) · hypothèse comportementale (maximiser).

**Les axiomes, dans l'ordre.**

|  | Nom | Énoncé condensé |
|---|---|---|
| 1 | Complétude | $\forall x^1,x^2$ : $x^1\succsim x^2$ ou $x^2\succsim x^1$ |
| 2 | Transitivité | $x^1\succsim x^2$ et $x^2\succsim x^3 \Rightarrow x^1\succsim x^3$ |
| 3 | Continuité | $\succsim(x)$ et $\precsim(x)$ **fermés** dans $\mathbb{R}^n_+$ |
| $4'$ | Non-satiété locale | $\forall x^0,\ \forall\varepsilon>0,\ \exists x\in B_\varepsilon(x^0)\cap\mathbb{R}^n_+ : x\succ x^0$ |
| 4 | Monotonicité stricte | $x^0\geq x^1\Rightarrow x^0\succsim x^1$ ; $x^0\gg x^1\Rightarrow x^0\succ x^1$ |
| $5'$ | Convexité | $x^1\succsim x^0 \Rightarrow tx^1+(1-t)x^0\succsim x^0$, $t\in[0,1]$ |
| 5 | Convexité stricte | $x^1\neq x^0$, $x^1\succsim x^0 \Rightarrow tx^1+(1-t)x^0\succ x^0$, $t\in(0,1)$ |

**Définitions 1.1 à 1.5.** 1.1 relation de préférence = axiomes 1+2 · 1.2 $x^1\succ x^2 \iff x^1\succsim x^2$ et non$(x^2\succsim x^1)$ · 1.3 $x^1\sim x^2 \iff x^1\succsim x^2$ et $x^2\succsim x^1$ · 1.4 les cinq ensembles $\succsim,\precsim,\prec,\succ,\sim$ de $x^0$ · 1.5 $u$ représente $\succsim$ $\iff$ $\big[u(x^0)\geq u(x^1) \iff x^0\succsim x^1\big]$.

**Les trois théorèmes.**

$$\textbf{1.1}\quad \text{complète}+\text{transitive}+\text{continue}+\text{str. monotone} \Longrightarrow \exists\, u \text{ continue représentant } \succsim$$

*Preuve : poser $u(x)e\sim x$ ; existence par $A\cap B\neq\varnothing$ ; unicité par transitivité de $\sim$ + monotonicité ; représentation par la chaîne (P.2)-(P.5) ; continuité par $u^{-1}((a,b))=\succ(ae)\cap\prec(be)$.*

$$\textbf{1.2}\quad v \text{ représente } \succsim \iff v = f\circ u,\ f \text{ strictement croissante sur } u(X)$$

$$\textbf{1.3}\quad \begin{array}{lcl} u \text{ str. croissante} &\iff& \succsim \text{ str. monotone}\\ u \text{ quasiconcave} &\iff& \succsim \text{ convexe}\\ u \text{ str. quasiconcave} &\iff& \succsim \text{ str. convexe} \end{array}$$

**Le calcul différentiel.**

$$\text{UM}_i(x)=\frac{\partial u(x)}{\partial x_i}\ (>0 \text{ presque partout}) \qquad \text{MRS}_{ij}(x)=\frac{\partial u(x)/\partial x_i}{\partial u(x)/\partial x_j}$$

$$u \text{ quasiconcave} \Longrightarrow y^{\mathsf T}H(x)y\leq0 \ \text{ pour tout } y \text{ tel que } \nabla u(x)\cdot y=0$$

**Hypothèse 1.2, le régime permanent.** $\succsim$ complète, transitive, continue, strictement monotone, strictement convexe ⇒ $u$ continue, strictement croissante, strictement quasiconcave.

**Les six exemples canoniques à avoir en tête.**

| Fonction | Axiomes 1-3 | 4 | $5'$ | 5 | Différentiable ? |
|---|---|---|---|---|---|
| Cobb-Douglas $x_1^\alpha x_2^{1-\alpha}$ |  |  |  |  |  |
| Substituts parfaits $ax_1+bx_2$ |  |  |  |  |  |
| Compléments parfaits $\min\{x_1,x_2\}$ |  |  |  |  | (coude) |
| $\min$ de deux formes linéaires |  |  |  |  |  |
| Lexicographique | 1,2 · 3 |  |  |  | — (pas de $u$) |
| $x+\sin x$ (un bien) |  |  |  |  | mais $u'=0$ par points |

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quelles sont les quatre briques d'un modèle de choix, et laquelle est la seule que les prix modifient ?**

</summary>

L'ensemble de **consommation** $X$, l'ensemble **réalisable** $B$, la relation de **préférence** $\succsim$, l'**hypothèse comportementale**.

Les prix ne modifient que **$B$**. C'est précisément ce qui rend possible l'analyse comparative : on fait varier $B$ à $\succsim$ constante.

</details>

<details class="details--riche">
<summary>

**2. Énoncer les quatre propriétés de l'hypothèse 1.1, et dire lesquelles sont « mathématiques ».**

</summary>

$X\subseteq\mathbb{R}^n_+$ · $X$ fermé · $X$ convexe · $0\in X$.

**Fermé** et **convexe** sont les exigences mathématiques : elles servent à appliquer les théorèmes d'existence (Weierstrass) et de séparation. $0\in X$ garantit qu'un point de référence existe toujours.

</details>

<details class="details--riche">
<summary>

**3. Pourquoi le livre insiste-t-il sur le caractère *binaire* de la relation $\succsim$ ?**

</summary>

Parce que cela minimise l'exigence cognitive : *« nous exigeons seulement que les consommateurs fassent des comparaisons binaires »*. Le classement complet d'un ensemble fini n'est **pas supposé** — il est **déduit** des axiomes 1 et 2.

</details>

<details class="details--riche">
<summary>

**4. Le « either … or » de l'axiome de complétude est-il exclusif ?**

</summary>

**Non, il est inclusif.** Si les deux valent simultanément, on a l'**indifférence** (déf. 1.3). L'axiome interdit uniquement le cas où **aucune** des deux ne vaut, c'est-à-dire l'**incomparabilité**.

Corollaire : en posant $x^1=x^2$, la complétude donne $x\succsim x$ — la relation est **réflexive**.

</details>

<details class="details--riche">
<summary>

**5. Le livre défend-il la transitivité comme un fait empirique ?**

</summary>

**Non.** Il écrit : *« c'est un axiome controversé. Des expériences ont montré que dans diverses situations, les choix d'êtres humains réels ne sont pas toujours transitifs. Néanmoins, nous le conserverons dans notre description du consommateur, quoique non sans une légère appréhension. »*

C'est une hypothèse de travail **assumée comme fragile**, pas une description validée.

</details>

<details class="details--riche">
<summary>

**6. $\succ$ et $\sim$ héritent-elles de la complétude de $\succsim$ ?**

</summary>

**Non.** Le livre : *« en général, les deux sont transitives et aucune des deux n'est complète. »*

— $\succ$ échoue quand $x^1\sim x^2$ : ni $x^1\succ x^2$ ni $x^2\succ x^1$. — $\sim$ échoue quand deux paniers sont strictement ordonnés.

La **transitivité**, elle, est bien héritée — mais elle se **démontre** (exercice 1.4), elle ne se postule pas.

</details>

<details class="details--riche">
<summary>

**7. Écrire les cinq ensembles de la définition 1.4 sans hésiter sur le sens de lecture.**

</summary>

| Ensemble | Condition sur $x$ | Nom anglais |
|---|---|---|
| $\succsim(x^0)$ | $x \succsim x^0$ | *at least as good as* |
| $\precsim(x^0)$ | $x^0 \succsim x$ | *no better than* |
| $\prec(x^0)$ | $x^0 \succ x$ | *worse than* |
| $\succ(x^0)$ | $x \succ x^0$ | *preferred to* |
| $\sim(x^0)$ | $x \sim x^0$ | *indifference* |

**Le repère :** dans $\succsim$ et $\succ$, c'est $x$ qui est devant ; dans $\precsim$ et $\prec$, c'est $x^0$.

</details>

<details class="details--riche">
<summary>

**8. Quels trois ensembles partitionnent $X$, et grâce à quels axiomes ?**

</summary>

$$\prec(x^0),\quad \sim(x^0),\quad \succ(x^0)$$

L'**exhaustivité** vient de la **complétude** (axiome 1) ; la **disjonction** vient des définitions 1.2-1.3 ; le fait qu'il y ait exactement trois cas est la **trichotomie** (exercice 1.3b).

Notez que la **transitivité n'y sert pas**.

</details>

<details class="details--riche">
<summary>

**9. Que représente exactement la Fig. 1.1, et pourquoi le livre la montre-t-il ?**

</summary>

Des préférences satisfaisant **uniquement** les axiomes 1 et 2 — donc pleines de pathologies : zones d'indifférence « épaisses », « trous » et « courbes » dans $\sim(x^0)$.

Le livre la montre pour établir la logique du reste du §1.2.1 : **chaque axiome supplémentaire sert à interdire une pathologie précise**. Sans ce point de départ, les axiomes 3 à 5 paraissent arbitraires.

</details>

<details class="details--riche">
<summary>

**10. Donner les trois formulations équivalentes de l'axiome de continuité.**

</summary>

1. **Fermeture :** $\succsim(x)$ et $\precsim(x)$ sont fermés dans $\mathbb{R}^n_+$.
2. **Ouverture (par complémentation) :** $\prec(x)$ et $\succ(x)$ sont ouverts dans $\mathbb{R}^n_+$.
3. **Séquentielle :** si $y^n\succsim x$ pour tout $n$ et $y^n\to y$, alors $y\succsim x$ (et de même avec $\precsim$).

Conséquence immédiate : $\sim(x)=\succsim(x)\cap\precsim(x)$ est **fermé** comme intersection de deux fermés.

</details>

<details class="details--riche">
<summary>

**11. Que signifie le *prime* dans « axiome $4'$ » et « axiome $5'$ » ?**

</summary>

La version **moins restrictive**. Le livre : *« nous laissons les axiomes à numéro primé indiquer des alternatives à la norme, conceptuellement similaires mais légèrement **moins restrictives** que leurs partenaires non primés »* — et *« nous emploierons généralement les versions les plus restrictives »*.

$$4 \Rightarrow 4' \qquad\qquad 5 \Rightarrow 5'$$

</details>

<details class="details--riche">
<summary>

**12. La non-satiété locale implique-t-elle que « plus, c'est mieux » ?**

</summary>

**Non**, et le livre le souligne : *« elle n'exclut pas la possibilité que l'alternative préférée puisse impliquer moins de certains biens, voire de tous les biens. Spécifiquement, elle n'implique pas que donner au consommateur plus de tout rende nécessairement ce consommateur meilleur. »*

$4'$ dit seulement : dans **toute** boule autour de $x^0$, si petite soit-elle, il existe un point strictement préféré. Rien sur la **direction**.

</details>

<details class="details--riche">
<summary>

**13. Écrire l'axiome 4 en distinguant soigneusement $\geq$ et $\gg$.**

</summary>

$$x^0 \geq x^1 \ \Longrightarrow\ x^0 \succsim x^1 \qquad\qquad x^0 \gg x^1 \ \Longrightarrow\ x^0 \succ x^1$$

où $x^0\geq x^1$ signifie « au moins autant de **chaque** bien » et $x^0\gg x^1$ « strictement plus de **chaque** bien ».

⚠️ La version « $x^0\geq x^1$, $x^0\neq x^1 \Rightarrow x^0\succ x^1$ » est **plus forte** que l'axiome 4 de Jehle & Reny.

</details>

<details class="details--riche">
<summary>

**14. Quelle est la conséquence géométrique de l'axiome 4 sur les courbes d'indifférence ?**

</summary>

Elles sont **décroissantes**. Le raisonnement par quadrants (Fig. 1.4) : tout point strictement au **nord-est** de $x^0$ le domine au sens $\gg$, donc lui est strictement préféré ; tout point strictement au **sud-ouest** est strictement dominé. Aucun des deux quadrants ne peut donc rencontrer $\sim(x^0)$.

De plus $\succ(x^0)$ est « au-dessus » de la courbe et $\prec(x^0)$ « en dessous ».

</details>

<details class="details--riche">
<summary>

**15. Citer les trois différences entre l'axiome $5'$ et l'axiome 5.**

</summary>

|  | Axiome $5'$ | Axiome 5 |
|---|---|---|
| Hypothèse supplémentaire | — | $x^1 \neq x^0$ |
| Conclusion | $tx^1+(1-t)x^0 \succsim x^0$ | $tx^1+(1-t)x^0 \succ x^0$ |
| Intervalle | $t\in[0,1]$ **fermé** | $t\in(0,1)$ **ouvert** |

Les trois sont nécessaires : sans $x^1\neq x^0$ l'énoncé dirait $x^0\succ x^0$ ; avec $[0,1]$ il l'affirmerait aux extrémités.

</details>

<details class="details--riche">
<summary>

**16. Quel est le statut méthodologique de la convexité, selon le livre lui-même ?**

</summary>

Une **commodité analytique**, pas une contrainte empirique :

> *« Il s'avère que l'axiome $5'$ peut être imposé **sans aucune perte de généralité**. Le contenu prédictif de la théorie serait le même avec ou sans lui. Bien que le même énoncé ne vaille pas tout à fait pour l'axiome 5, légèrement plus fort, celui-ci **simplifie grandement l'analyse**. »*

</details>

<details class="details--riche">
<summary>

**17. Que devient le TMS le long d'une courbe d'indifférence sous $5'$, puis sous $5$ ?**

</summary>

Du nord-ouest au sud-est : — sous $5'$ : le TMS est **constant ou décroissant** ; — sous $5$ : il est **strictement décroissant**.

Ce dernier cas porte le nom de **principe de décroissance du taux marginal de substitution en consommation**.

</details>

<details class="details--riche">
<summary>

**18. Énoncer la définition 1.5, et dire pourquoi c'est une équivalence.**

</summary>

$$u \text{ représente } \succsim \iff \big[\,u(x^0)\geq u(x^1) \iff x^0\succsim x^1\,\big] \ \ \forall x^0,x^1.$$

Les deux sens sont nécessaires : « $\Leftarrow$ » garantit que $u$ **conserve** tout l'ordre de $\succsim$ ; « $\Rightarrow$ » garantit qu'elle n'en **invente** aucun. Une fonction qui ne satisferait qu'un sens ne représenterait pas $\succsim$.

</details>

<details class="details--riche">
<summary>

**19. Quels axiomes suffisent à l'existence d'une représentation continue, dans le cas général ?**

</summary>

**Complétude, transitivité, continuité** — c'est-à-dire les axiomes 1, 2 et 3, et rien d'autre. Le livre : *« la représentabilité ne dépend d'aucune hypothèse sur les goûts du consommateur, telles que la convexité ou même la monotonicité. »* Références : Debreu (1954), Barten et Böhm (1982).

Le **théorème 1.1** démontre une version affaiblie, avec la monotonicité stricte en plus — *« pour simplifier les aspects mathématiques et augmenter le contenu intuitif de la démonstration »*.

</details>

<details class="details--riche">
<summary>

**20. Quelle est l'idée de la preuve du théorème 1.1, en une ligne ?**

</summary>

Prendre $e=(1,\dots,1)$ et définir $u(x)$ comme **l'unique multiple de $e$ indifférent à $x$** :

$$u(x)\,e \sim x$$

Géométriquement : projeter $x$ sur la **diagonale à 45°** en suivant sa courbe d'indifférence, et lire la coordonnée.

</details>

<details class="details--riche">
<summary>

**21. Dans la preuve du théorème 1.1, quels sont $A$ et $B$, et pourquoi $A\cap B\neq\varnothing$ ?**

</summary>

$$A=\{t\geq0 \mid te\succsim x\} \qquad B=\{t\geq0 \mid x\succsim te\}$$

— **Continuité** ⇒ $A$ et $B$ fermés (exercice 1.11). — **Monotonicité stricte** ⇒ $A$ est stable vers le haut et $B$ vers le bas, donc $A=[\underline t,\infty)$ et $B=[0,\bar t\,]$. — **Complétude** ⇒ $A\cup B=\mathbb{R}_+$, donc les deux intervalles couvrent $\mathbb{R}_+$ sans trou, d'où $\underline t\leq\bar t$.

Donc $A\cap B=[\underline t,\bar t\,]\neq\varnothing$, et tout $t^*$ de cette intersection vérifie $t^*e\sim x$.

</details>

<details class="details--riche">
<summary>

**22. Comment l'unicité de $u(x)$ est-elle obtenue ?**

</summary>

Si $t_1e\sim x$ et $t_2e\sim x$, la **transitivité de $\sim$** (exercice 1.4) donne $t_1e\sim t_2e$. Si l'on avait $t_1>t_2$, alors $t_1e \gg t_2e$, donc $t_1e \succ t_2e$ par **monotonicité stricte** — contradiction. Donc $t_1=t_2$.

</details>

<details class="details--riche">
<summary>

**23. Justifier chacun des trois passages de la chaîne (P.2) → (P.5).**

</summary>

$$x^1\succsim x^2 \iff u(x^1)e \sim x^1 \succsim x^2 \sim u(x^2)e \iff u(x^1)e \succsim u(x^2)e \iff u(x^1)\geq u(x^2)$$

| Passage | Justification du livre |
|---|---|
| (P.2)↔(P.3) | **définition de $u$** |
| (P.3)↔(P.4) | transitivité de $\succsim$, transitivité de $\sim$, définition de $u$ |
| (P.4)↔(P.5) | **monotonicité stricte** de $\succsim$ |

</details>

<details class="details--riche">
<summary>

**24. Comment la continuité de $u$ est-elle établie ?**

</summary>

Par le **théorème A1.6** : il suffit que l'image réciproque de tout ouvert soit ouverte, donc que $u^{-1}((a,b))$ soit ouvert. Or

$$u^{-1}\big((a,b)\big) = \{x \mid ae \prec x \prec be\} = \succ(ae)\ \cap\ \prec(be).$$

Par l'axiome 3, $\precsim(ae)$ et $\succsim(be)$ sont fermés ; leurs complémentaires $\succ(ae)$ et $\prec(be)$ sont donc ouverts, et l'intersection de deux ouverts est ouverte (exercice A1.28).

</details>

<details class="details--riche">
<summary>

**25. Énoncer le théorème 1.2 avec ses trois précisions.**

</summary>

$v$ représente aussi $\succsim$ **si et seulement si** $v(x)=f(u(x))$ pour tout $x$, où $f:\mathbb{R}\to\mathbb{R}$ est **strictement croissante sur l'ensemble des valeurs prises par $u$**.

(i) C'est une **équivalence** · (ii) **strictement** croissante · (iii) sur **$u(X)$**, pas sur $\mathbb{R}$ tout entier.

</details>

<details class="details--riche">
<summary>

**26. Que veut dire « l'utilité est ordinale », et qu'est-ce que cela interdit ?**

</summary>

Seul l'**ordre** des nombres assignés a un sens. Le livre : *« aucune signification quelconque ne peut être attachée aux nombres réels assignés par une fonction d'utilité donnée à des paniers particuliers — seulement à l'ordre de ces nombres. »*

Cela **interdit** : les rapports (« deux fois plus d'utilité »), les différences (« il gagne 3 utils »), et toute comparaison entre individus. Cela **autorise** : n'importe quelle transformation strictement croissante — d'où la liberté de prendre le logarithme d'une Cobb-Douglas (exercice 1.21).

</details>

<details class="details--riche">
<summary>

**27. Écrire le dictionnaire du théorème 1.3.**

</summary>

| Propriété de $u$ | $\iff$ | Propriété de $\succsim$ |
|---|---|---|
| strictement croissante | $\iff$ | strictement monotone (axiome 4) |
| quasiconcave | $\iff$ | convexe (axiome $5'$) |
| strictement quasiconcave | $\iff$ | strictement convexe (axiome 5) |

L'observation qui rend les trois preuves faciles : **$\succsim(x^0)$ est exactement l'ensemble supérieur $\{x\mid u(x)\geq u(x^0)\}$ de $u$**.

⚠️ L'axiome 3 n'a **pas** de ligne dans ce tableau : sa correspondance avec la continuité de $u$ relève du théorème 1.1 et de l'exercice 1.14.

</details>

<details class="details--riche">
<summary>

**28. Pourquoi les préférences lexicographiques n'admettent-elles aucune représentation ?**

</summary>

Deux niveaux de réponse :

1. **Elles violent l'axiome 3** : $y^k=(1+\tfrac1k,0) \succ (1,1)$ pour tout $k$, mais la limite $(1,0)$ vérifie $(1,1)\succ(1,0)$. Donc $\succsim((1,1))$ n'est pas fermé.
2. **Aucune représentation, même discontinue, n'existe** : à chaque $a\geq0$ on associe un rationnel $q(a)\in\big(u(a,0),u(a,1)\big)$ ; l'application $a\mapsto q(a)$ est injective, ce qui donnerait une injection de $\mathbb{R}_+$ dans $\mathbb{Q}$ — impossible par cardinalité.

Le point 1 répond à « l'axiome 3 tient-il ? » ; seul le point 2 répond à « une $u$ existe-t-elle ? ».

</details>

<details class="details--riche">
<summary>

**29. Existe-t-il un axiome de différentiabilité dans ce livre ?**

</summary>

**Non.** Le livre écrit : *« Nous ne développerons pas cette condition ici, mais renvoyons le lecteur à Debreu (1972) pour les détails. Pour nos besoins, nous nous contentons de supposer simplement que la représentation par l'utilité est différentiable chaque fois que nécessaire. »*

C'est une hypothèse technique posée **au coup par coup**. Les préférences de Leontief satisfont tous les axiomes 1 à $5'$ sans être différentiables.

</details>

<details class="details--riche">
<summary>

**30. Dériver le TMS comme rapport d'utilités marginales, en quatre pas.**

</summary>

1. Paramétrer la courbe d'indifférence par $x_2=f(x_1)$ : alors $u(x_1,f(x_1))=$ constante (1.1).
2. Définir $\text{MRS}_{12}\equiv |f'(x_1)| = -f'(x_1)$, la seconde égalité parce que $f'<0$ (1.2).
3. Dériver (1.1) : $\dfrac{\partial u}{\partial x_1} + \dfrac{\partial u}{\partial x_2}f'(x_1)=0$ (1.3).
4. Combiner : $\text{MRS}_{12}(x)=\dfrac{\partial u/\partial x_1}{\partial u/\partial x_2}$, et en général $\text{MRS}_{ij}(x)=\dfrac{\partial u/\partial x_i}{\partial u/\partial x_j}$.

</details>

<details class="details--riche">
<summary>

**31. Le TMS dépend-il de la fonction d'utilité choisie ?**

</summary>

**Non.** Si $v=f\circ u$ avec $f'>0$, alors $\partial v/\partial x_i = f'(u)\,\partial u/\partial x_i$ et le facteur $f'(u)$ **se simplifie** dans le rapport :

$$\text{MRS}^v_{ij}=\frac{f'(u)\,\partial u/\partial x_i}{f'(u)\,\partial u/\partial x_j}=\text{MRS}^u_{ij}$$

Le TMS est donc une grandeur **ordinale** — contrairement à l'utilité marginale elle-même, qui est multipliée par $f'(u)$.

</details>

<details class="details--riche">
<summary>

**32. Sous monotonicité stricte, l'utilité marginale est-elle strictement positive partout ?**

</summary>

**Non — « pour presque tous » les paniers seulement**, c'est-à-dire hors d'un ensemble de mesure de Lebesgue nulle.

Le contre-exemple du livre : $u(x)=x+\sin(x)$, strictement croissante, mais $u'(x)=1+\cos(x)=0$ aux points $x=\pi+2k\pi$.

</details>

<details class="details--riche">
<summary>

**33. Écrire la condition hessienne de la quasiconcavité, et dire en quoi elle diffère de la concavité.**

</summary>

$$y^{\mathsf T}H(x)\,y \leq 0 \qquad\text{pour tout } y \text{ tel que } \nabla u(x)\cdot y = 0$$

La restriction $\nabla u(x)\cdot y=0$ sélectionne les directions **tangentes** à la surface d'indifférence. La **concavité** exigerait la même inégalité pour **tous** les $y$, sans restriction.

Lecture du livre : se déplacer depuis $x$ dans une direction tangente **réduit** l'utilité (si l'inégalité est stricte).

</details>

<details class="details--riche">
<summary>

**34. Énoncer l'hypothèse 1.2 et dire à quoi sert chacune de ses composantes.**

</summary>

$\succsim$ est **complète, transitive, continue, strictement monotone et strictement convexe** sur $\mathbb{R}^n_+$ ; donc, par les théorèmes 1.1 et 1.3, elle est représentable par $u$ **continue, strictement croissante, strictement quasiconcave**.

| Composante | Usage au §1.3 |
|---|---|
| continuité (+ $B$ compact) | **existence** de la solution (Weierstrass, thm A1.10) |
| stricte quasiconcavité (+ $B$ convexe) | **unicité** de la solution (exercice 1.16a) |
| stricte croissance | la contrainte budgétaire est **saturée** : $p\cdot x^*=y$ (exercice 1.16b) |

</details>

<details class="details--riche">
<summary>

**35. Quelle est la méthode générale pour prouver la quasiconcavité d'une fonction ?**

</summary>

Passer par les **ensembles supérieurs**, jamais par l'inégalité directe.

1. Écrire $S_c=\{x\mid u(x)\geq c\}$ et le simplifier.
2. Montrer que $S_c$ est convexe pour tout $c$ (intersection de convexes, demi-espaces…).
3. Conclure par le **théorème A1.14**.

Exemple : $\min\{u,v\}$ a pour ensembles supérieurs $S_c(u)\cap S_c(v)$, intersection de deux convexes — donc $\min$ de deux quasiconcaves est quasiconcave. Le résultat est **faux pour la somme**.

</details>

<details class="details--riche">
<summary>

**36. Comment reconnaître immédiatement qu'une carte d'indifférence viole l'axiome 5 ?**

</summary>

**Elle contient un segment de droite non réduit à un point.** Prenez ses deux extrémités $x^0\neq x^1$ (indifférentes, donc $x^1\succsim x^0$) et $t=1/2$ : le combiné reste sur le segment, donc **indifférent** à $x^0$, et non strictement préféré.

Ce test résout d'un coup les exercices 1.8 (droites), 1.9 (angles droits) et 1.10 (coudes).

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les quatre briques du modèle de choix ? | Ensemble de **consommation** $X$ · ensemble **réalisable** $B$ · relation de **préférence** $\succsim$ · **hypothèse comportementale** |
| Laquelle les prix modifient-ils ? | **$B$ seul** — ni $X$ ni $\succsim$ |
| Les quatre propriétés de l'hypothèse 1.1 ? | $X\subseteq\mathbb{R}^n_+$ · **fermé** · **convexe** · $0\in X$ |
| Axiome 1 ? | **Complétude** : $\forall x^1,x^2$, $x^1\succsim x^2$ ou $x^2\succsim x^1$ |
| Le « ou » de l'axiome 1 est-il exclusif ? | **Non, inclusif** — les deux ensemble donnent l'indifférence |
| Axiome 2 ? | **Transitivité** : $x^1\succsim x^2$ et $x^2\succsim x^3 \Rightarrow x^1\succsim x^3$ |
| Le livre défend-il la transitivité empiriquement ? | **Non** — *« un axiome controversé »*, conservé *« non sans une légère appréhension »* |
| Définition 1.1 ? | **Relation de préférence** = relation binaire satisfaisant les axiomes **1 et 2** |
| Définition 1.2 ? | $x^1\succ x^2 \iff x^1\succsim x^2$ **et non** $(x^2\succsim x^1)$ |
| Définition 1.3 ? | $x^1\sim x^2 \iff x^1\succsim x^2$ **et** $x^2\succsim x^1$ |
| $\succ$ et $\sim$ sont-elles complètes ? | **Non, ni l'une ni l'autre** — mais toutes deux sont **transitives** |
| Les cinq ensembles de la définition 1.4 ? | $\succsim(x^0)$, $\precsim(x^0)$, $\prec(x^0)$, $\succ(x^0)$, $\sim(x^0)$ |
| Quels trois ensembles partitionnent $X$ ? | $\prec(x^0)$, $\sim(x^0)$, $\succ(x^0)$ — par la **trichotomie** |
| Axiome 3 ? | **Continuité** : $\succsim(x)$ et $\precsim(x)$ **fermés** dans $\mathbb{R}^n_+$ |
| Formulation séquentielle de l'axiome 3 ? | $y^n\succsim x$ et $y^n\to y$ $\Rightarrow$ $y\succsim x$ |
| L'axiome 3 porte-t-il sur les goûts ? | **Non** — *« son propos est essentiellement mathématique »* |
| Que signifie le prime ($4'$, $5'$) ? | La version **plus faible** : $4\Rightarrow4'$ et $5\Rightarrow5'$ |
| Axiome $4'$ ? | **Non-satiété locale** : $\forall x^0,\forall\varepsilon>0$, $\exists x\in B_\varepsilon(x^0)\cap\mathbb{R}^n_+$ avec $x\succ x^0$ |
| $4'$ implique-t-il « plus, c'est mieux » ? | **Non** — le point préféré peut contenir **moins** de tous les biens |
| Axiome 4 ? | **Monotonicité stricte** : $x^0\geq x^1\Rightarrow\succsim$ ; $x^0\gg x^1\Rightarrow\succ$ |
| $x^0\geq x^1$ vs $x^0\gg x^1$ ? | $\geq$ : **au moins autant** de chaque bien · $\gg$ : **strictement plus** de chaque bien |
| Conséquence géométrique de l'axiome 4 ? | Courbes d'indifférence **décroissantes** ; $\succ(x^0)$ au-dessus, $\prec(x^0)$ en dessous |
| Axiome $5'$ ? | **Convexité** : $x^1\succsim x^0 \Rightarrow tx^1+(1-t)x^0\succsim x^0$, $t\in[0,1]$ |
| Axiome 5 ? | **Convexité stricte** : $x^1\neq x^0$, $x^1\succsim x^0 \Rightarrow tx^1+(1-t)x^0\succ x^0$, $t\in(0,1)$ |
| Les trois différences entre 5 et $5'$ ? | $x^1\neq x^0$ ajouté · conclusion $\succ$ au lieu de $\succsim$ · intervalle **ouvert** $(0,1)$ |
| Statut de la convexité selon le livre ? | Une **commodité analytique** — $5'$ *« sans aucune perte de généralité »*, 5 *« simplifie grandement l'analyse »* |
| Le TMS sous $5'$ ? sous 5 ? | $5'$ : **constant ou décroissant** · 5 : **strictement décroissant** |
| Comment repérer qu'une carte viole l'axiome 5 ? | Elle contient un **segment de droite** dans un ensemble d'indifférence |
| Définition 1.5 ? | $u$ représente $\succsim$ $\iff$ $\big[u(x^0)\geq u(x^1) \iff x^0\succsim x^1\big]$ |
| Axiomes suffisants pour une représentation continue ? | **1, 2 et 3** seulement — aucun axiome de goût (Debreu 1954) |
| Hypothèses du théorème 1.1 ? | Complète + transitive + continue + **strictement monotone** |
| L'idée de la preuve du théorème 1.1 ? | Poser $u(x)\,e \sim x$ avec $e=(1,\dots,1)$ — projeter sur la **diagonale à 45°** |
| Les deux ensembles $A$ et $B$ de la preuve ? | $A=\{t\geq0\mid te\succsim x\}$ · $B=\{t\geq0\mid x\succsim te\}$ |
| Quel axiome donne $A\cup B=\mathbb{R}_+$ ? | La **complétude** |
| Quel axiome donne la fermeture de $A$ et $B$ ? | La **continuité** (exercice 1.11) |
| Quel axiome donne l'unicité de $u(x)$ ? | La **monotonicité stricte** (+ transitivité de $\sim$) |
| Comment obtient-on la continuité de $u$ ? | $u^{-1}((a,b))=\succ(ae)\cap\prec(be)$, intersection de deux **ouverts** |
| Théorème 1.2 ? | $v$ représente $\succsim$ $\iff$ $v=f\circ u$ avec $f$ **strictement croissante sur $u(X)$** |
| La clause la plus souvent oubliée du thm 1.2 ? | « **sur l'ensemble des valeurs prises par $u$** », pas sur $\mathbb{R}$ |
| Que veut dire « l'utilité est ordinale » ? | Seul l'**ordre** des nombres a un sens — ni rapports, ni différences, ni comparaisons interpersonnelles |
| Théorème 1.3, ligne 1 ? | $u$ **strictement croissante** $\iff$ $\succsim$ strictement monotone |
| Théorème 1.3, ligne 2 ? | $u$ **quasiconcave** $\iff$ $\succsim$ convexe |
| Théorème 1.3, ligne 3 ? | $u$ **strictement quasiconcave** $\iff$ $\succsim$ strictement convexe |
| L'observation qui rend le thm 1.3 facile ? | $\succsim(x^0)$ **est** l'ensemble supérieur $\{x\mid u(x)\geq u(x^0)\}$ de $u$ |
| Préférences lexicographiques : axiome violé ? | L'**axiome 3** — $\succsim(x^0)$ n'est pas fermé |
| Pourquoi aucune $u$ (même discontinue) ne les représente ? | Argument de **cardinalité** : injection de $\mathbb{R}_+$ dans $\mathbb{Q}$ |
| Existe-t-il un axiome de différentiabilité ? | **Non** — supposée au coup par coup ; le livre renvoie à **Debreu (1972)** |
| Utilité marginale du bien $i$ ? | $\partial u(x)/\partial x_i$ |
| Est-elle strictement positive partout sous l'axiome 4 ? | **Non** — *« presque partout »* ; contre-exemple $u(x)=x+\sin x$ |
| Formule du TMS ? | $\text{MRS}_{ij}(x)=\dfrac{\partial u(x)/\partial x_i}{\partial u(x)/\partial x_j}$ — **premier indice au numérateur** |
| Le TMS dépend-il de la $u$ choisie ? | **Non** : le facteur $f'(u)$ se simplifie — le TMS est **ordinal** |
| Condition hessienne de quasiconcavité ? | $y^{\mathsf T}H(x)y\leq0$ pour tout $y$ tel que $\nabla u(x)\cdot y=0$ |
| Différence avec la concavité ? | La concavité l'exige pour **tous** les $y$ ; la quasiconcavité pour les $y$ **tangents** seulement |
| Le min de deux quasiconcaves est-il quasiconcave ? | **Oui** (ensembles supérieurs = intersection) — mais **pas la somme** |
| Hypothèse 1.2 sur $\succsim$ ? | Complète, transitive, continue, **strictement monotone**, **strictement convexe** |
| Hypothèse 1.2 sur $u$ ? | Continue, **strictement croissante**, **strictement quasiconcave** |
| À quoi sert la continuité dans l'hypothèse 1.2 ? | À l'**existence** de la solution (Weierstrass) |
| À quoi sert la stricte quasiconcavité ? | À l'**unicité** de la solution |
| À quoi sert la stricte croissance ? | À la **saturation** du budget : $p\cdot x^*=y$ |
| Substituts parfaits $ax_1+bx_2$ : axiomes ? | 1-4 , $5'$ , **5** (segments) |
| Compléments parfaits $\min\{x_1,x_2\}$ : axiomes ? | 1-4 , $5'$ , **5** ; **non différentiable** au coude |
| Cobb-Douglas $x_1^\alpha x_2^{1-\alpha}$ : axiomes ? | **Tous** — 1, 2, 3, 4, $5'$, 5, et différentiable |
