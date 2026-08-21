# Fiche 503 — Propriétés de la demande : Slutsky, loi de la demande et agrégation

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 1 « Consumer Theory », §1.5 « Properties of Consumer Demand » (p. 48-63) |
| **Difficulté** | Fondamental — les restrictions testables que la théorie impose aux données |
| **Temps d'étude estimé** | 130 min |
| **Prérequis** | Fiches 500, 501, 502 (en particulier le lemme de Shephard, la concavité de $e$ et le théorème 1.9) · théorème de Young (A2.2) · matrices semi-définies (A2.4, A2.5) |
| **Concepts clés** | Prix relatif, revenu réel, absence d'illusion monétaire, numéraire, équilibre budgétaire, effet de substitution, effet de revenu, effet total, décomposition de Hicks, équation de Slutsky, terme de substitution propre, loi de la demande, bien normal, bien inférieur, paradoxe de Giffen, symétrie des termes croisés, théorème de Young, matrice de substitution, semi-définie négative, matrice de Slutsky, élasticité-revenu, élasticité-prix, part budgétaire, agrégation d'Engel, agrégation de Cournot |
| **Poids à l'examen** | La **preuve de l'équation de Slutsky** (dérivation du théorème 1.9) · le **schéma logique** concavité de $e$ → propriétés de $\sigma$ → propriétés de $s$ · la **loi de la demande** et sa réciproque fausse · les **deux agrégations** d'Engel et de Cournot avec leurs démonstrations · la **figure 1.21** en entier. |

## 🎯 Vue d'ensemble

```
LE FIL DU §1.5 : quelles PREDICTIONS TESTABLES la theorie produit-elle ?

  LE PROBLEME     l'effet total d'une variation de prix est OBSERVABLE
                  mais il ne se lit pas directement : trois cas possibles (Fig. 1.19)
                  (a) p1 baisse -> x1 monte     (b) x1 inchange     (c) x1 BAISSE (Giffen)
                  la theorie n'exclut AUCUN des trois

  LA STRATEGIE    1. decomposer l'effet total en SUBSTITUTION + REVENU (Slutsky)
                  2. demontrer tout ce qu'on peut sur la partie SUBSTITUTION
                     (invisible, mais tres contrainte)
                  3. retraduire en restrictions sur la demande MARSHALLIENNE (visible)

  §1.5.1  PRIX RELATIFS ET REVENU REEL
          prix relatif  pi/pj = unites de j sacrifiees par unite de i
          revenu reel   y/pj  = unites de j que le revenu permet d'acheter

          THEOREME 1.10   x(p,y) est HOMOGENE DE DEGRE 0  -> pas d'illusion monetaire
                          p . x(p,y) = y                  -> EQUILIBRE BUDGETAIRE
          consequence : choisir un NUMERAIRE, t = 1/pn
                        la demande ne depend que de n-1 prix relatifs et du revenu reel

  §1.5.2  DECOMPOSITION DE HICKS  (Fig. 1.20)
          SE  = variation HYPOTHETIQUE a UTILITE CONSTANTE  (nouveaux prix relatifs)
          IE  = TOUT LE RESTE  --  defini comme un RESIDU
          donc  TE = SE + IE  par construction, toujours

          la courbe HICKSIENNE capture le SE seul
          la courbe MARSHALLIENNE capture le TE
          elles divergent exactement de l'IE

          THEOREME 1.11  EQUATION DE SLUTSKY  (« equation fondamentale »)

              dxi/dpj      =     dxi^h/dpj      -     xj . dxi/dy
              --------           ----------           -----------
                 TE                  SE                   IE

          preuve : DERIVER l'identite  xi^h(p,u*) = xi( p , e(p,u*) )  du theoreme 1.9

  CE QU'ON SAIT DES TERMES DE SUBSTITUTION -- tout vient de la CONCAVITE de e

          THEOREME 1.12  dxi^h/dpi <= 0        (derivee seconde propre d'une concave)
          THEOREME 1.14  dxi^h/dpj = dxj^h/dpi (theoreme de YOUNG)
          THEOREME 1.15  la matrice sigma(p,u) est SEMI-DEFINIE NEGATIVE

          THEOREME 1.13  LOI DE LA DEMANDE
                 bien NORMAL  + baisse de son prix  =>  quantite AUGMENTE
                 quantite BAISSE quand le prix baisse  =>  le bien est INFERIEUR
                 (les reciproques sont FAUSSES -- exercice 1.42)

          THEOREME 1.16  la matrice de SLUTSKY s(p,y), toute en grandeurs OBSERVABLES,
                         est SYMETRIQUE et SEMI-DEFINIE NEGATIVE
                         car  s(p,y) = sigma(p,u*)  terme a terme

  §1.5.3  ELASTICITES ET AGREGATION  (def. 1.6)
          eta_i    = (dxi/dy)(y/xi)      elasticite-REVENU
          eps_ij   = (dxi/dpj)(pj/xi)    elasticite-PRIX
          s_i      = pi xi / y           PART BUDGETAIRE,  somme = 1

          THEOREME 1.17   ENGEL    somme_i  s_i eta_i  =  1
                          COURNOT  somme_i  s_i eps_ij = -s_j
          (+ exercice 1.46 : somme_j eps_ij + eta_i = 0, qui vient de l'homogeneite)

  ==> FIGURE 1.21 : le tableau recapitulatif de TOUTES les proprietes de la demande
```

> **La phrase de programme du §1.5.** *« Il est extrêmement important, à des fins tant théoriques qu'empiriques, que nous **tirions toutes les implications pour le comportement de demande observable** que nous pouvons de notre modèle du consommateur maximisateur d'utilité. C'est la tâche de cette section. »*

> ⚠️ **Note de transcription — identique aux fiches 500-502.** Le PDF n'exporte pas $\succsim$, $\succ$, $\gg$, $\sum$, rend $\geq$ vectoriel comme un « + », et rend $\varepsilon$ (l'élasticité-prix) comme une parenthèse fermante « ) » dans les exercices. Ces symboles sont rétablis à partir du contexte.

> **L'hypothèse en vigueur dans tout le §1.5**, posée explicitement par le livre : *« Dans tout le reste de ce chapitre, l'**hypothèse 1.2 sera en vigueur**, et, de plus, nous **différencierons librement** chaque fois que nécessaire. »*

## 🔴 Concept 1 — Prix relatifs, revenu réel et théorème 1.10 (§1.5.1)

### 1.1 Pourquoi « réel » plutôt que « monétaire »

> *« Les économistes préfèrent généralement mesurer les variables importantes en termes **réels** plutôt que **monétaires**. C'est parce que "la monnaie est un voile", qui ne fait que tendre à obscurcir la vue de l'analyste sur ce à quoi les gens tiennent vraiment (ou devraient tenir) : à savoir, les **biens réels**. »*

### 1.2 Le prix relatif

> *« Par **prix relatif** d'un bien, nous entendons le **nombre d'unités d'un autre bien auxquelles il faut renoncer pour acquérir 1 unité du bien en question**. »*

L'analyse dimensionnelle, telle que le livre la déroule :

$$\frac{p_i}{p_j}=\frac{\$/\text{unité de } i}{\$/\text{unité de } j}=\frac{\$}{\text{unité de } i}\cdot\frac{\text{unité de } j}{\$}=\frac{\text{unités de } j}{\text{unité de } i}$$

$$\boxed{\;\frac{p_i}{p_j} = \text{unités de } j \text{ sacrifiées par unité de } i \text{ acquise}\;}$$

### 1.3 Le revenu réel

> *« Par **revenu réel**, nous entendons le **nombre maximal d'unités d'un certain bien que le consommateur pourrait acquérir s'il dépensait la totalité de son revenu monétaire**. Le revenu réel est destiné à refléter la maîtrise totale du consommateur sur toutes les ressources, en mesurant sa maîtrise potentielle sur un seul bien réel. »*

$$\frac{y}{p_j}=\frac{\$}{\$/\text{unité de } j}=\text{unités de } j$$

C'est le **revenu réel en termes du bien $j$**.

> **Les deux notions se lisent directement sur la droite de budget.** Le prix relatif $p_1/p_2$ en est la **pente** ; le revenu réel $y/p_j$ en est l'**intercept** sur l'axe $j$. C'est ce qui rend le théorème 1.10 presque évident géométriquement.

### 1.4 Théorème 1.10 — homogénéité et équilibre budgétaire

> *« La déduction la plus simple que nous puissions faire de notre modèle du consommateur maximisateur d'utilité est que **seuls les prix relatifs et le revenu réel affectent le comportement**. On exprime cela parfois en disant que le comportement de demande du consommateur affiche une **absence d'illusion monétaire**. »*

> *« Pour le voir, rappelez-vous simplement la discussion de la Fig. 1.14. Là, des changements équiproportionnels du revenu monétaire et du niveau de tous les prix laissent inchangés la **pente** (prix relatifs) et les **deux intercepts** de la contrainte budgétaire (revenu réel mesuré en termes de n'importe quel bien), et n'appellent donc **aucun changement de comportement de demande**. »*

> *« Parce que le seul rôle que la monnaie a joué dans la construction de notre modèle est celui d'**unité de compte**, il serait en effet étrange qu'il n'en fût pas ainsi. »*

> **THEOREM 1.10 — Homogeneity and Budget Balancedness.** Under Assumption 1.2, the consumer demand function $x_i(p,y)$, $i=1,\dots,n$, is **homogeneous of degree zero** in all prices and income, and it satisfies **budget balancedness**, $p\cdot x(p,y)=y$ for all $(p,y)$.

**La preuve de l'homogénéité.**

> *« Nous avons déjà essentiellement prouvé l'homogénéité au théorème 1.6, partie 2, où nous avons montré que la fonction d'utilité indirecte est homogène de degré zéro, de sorte que $v(p,y)=v(tp,ty)$ pour tout $t>0$. »*

Ceci équivaut à

$$u\big(x(p,y)\big)=u\big(x(tp,ty)\big) \qquad \forall\,t>0.$$

> *« Or, parce que **les ensembles budgétaires en $(p,y)$ et en $(tp,ty)$ sont les mêmes**, chacun de $x(p,y)$ et $x(tp,ty)$ était **réalisable** quand l'autre a été choisi. Donc l'égalité précédente et la **stricte quasiconcavité** de $u$ impliquent que $x(p,y)=x(tp,ty)$ pour tout $t>0$. »* $\blacksquare$

> ⚠️ **L'argument est plus subtil qu'il n'y paraît — et le point est examinable.** Que $v$ soit homogène de degré 0 dit seulement que les deux paniers donnent **la même utilité**. Pour conclure qu'ils sont **le même panier**, il faut l'**unicité** du maximiseur, donc la **stricte quasiconcavité**. Deux paniers distincts et également bons, tous deux réalisables dans le même ensemble budgétaire, contrediraient l'unicité.
>
> **Ce que l'homogénéité de $v$ seule ne donne pas :** $x(p,y)=x(tp,ty)$. Ne sautez pas cette étape.

**L'équilibre budgétaire.**

> *« Nous avons déjà mentionné à de nombreuses reprises que, parce que $u(\cdot)$ est strictement croissante, $x(p,y)$ doit **épuiser** le revenu du consommateur. Sinon, il pourrait s'offrir strictement plus de chaque bien et augmenter strictement son utilité. Nous appellerons cette relation **équilibre budgétaire** (*budget balancedness*) à partir de maintenant. »*

$$\boxed{\;p\cdot x(p,y)=y \qquad \forall\,(p,y)\;}$$

### 1.5 La conséquence : le numéraire

> *« L'homogénéité nous permet d'**éliminer complètement l'étalon monétaire** de toute analyse du comportement de demande. Cela se fait généralement en désignant arbitrairement l'un des $n$ biens pour servir de **numéraire** à la place de la monnaie. »*

Si son prix monétaire est $p_n$, on pose $t=1/p_n$ et l'homogénéité donne

$$\boxed{\;x(p,y)=x(tp,ty)=x\!\left(\frac{p_1}{p_n},\dots,\frac{p_{n-1}}{p_n},\,1,\,\frac{y}{p_n}\right)\;}$$

> *« En mots, la demande pour chacun des $n$ biens ne dépend que de **$n-1$ prix relatifs** et du **revenu réel** du consommateur. »*

> **Le décompte des degrés de liberté.** On part de $n+1$ variables $(p_1,\dots,p_n,y)$. L'homogénéité de degré 0 en retire **une** : il en reste $n$. C'est exactement la réduction que le numéraire opère. Retenez que l'homogénéité **n'est pas une hypothèse** mais un **théorème** — c'est une prédiction testable du modèle.

<details class="details--riche">
<summary>

**Exercice 1.40 — l'homogénéité par l'identité de Roy et le théorème d'Euler**

</summary>

**Énoncé.** Utiliser l'identité de Roy et le **théorème A2.6** pour donner une preuve alternative que $x_i(p,y)$ est homogène de degré zéro en prix et revenu.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Le théorème A2.6 rappelé** (*« Partial Derivatives of Homogeneous Functions »*) : si $f$ est homogène de degré $k$, alors **ses dérivées partielles sont homogènes de degré $k-1$**.

**Application.** $v(p,y)$ est homogène de degré $0$ (thm 1.6, propriété 2). Donc, par A2.6, chacune de ses dérivées partielles est homogène de degré $0-1=-1$ :

$$\frac{\partial v(tp,ty)}{\partial p_i}=t^{-1}\frac{\partial v(p,y)}{\partial p_i} \qquad\qquad \frac{\partial v(tp,ty)}{\partial y}=t^{-1}\frac{\partial v(p,y)}{\partial y}$$

**Par l'identité de Roy :**

$$x_i(tp,ty) = -\frac{\partial v(tp,ty)/\partial p_i}{\partial v(tp,ty)/\partial y} = -\frac{t^{-1}\,\partial v(p,y)/\partial p_i}{t^{-1}\,\partial v(p,y)/\partial y} = -\frac{\partial v(p,y)/\partial p_i}{\partial v(p,y)/\partial y}=x_i(p,y). \qquad\blacksquare$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que cette preuve a de mieux que celle du texte.</span>

Elle est purement calculatoire et **n'utilise pas la stricte quasiconcavité** — le facteur $t^{-1}$, commun aux deux dérivées, se simplifie dans le rapport. C'est la troisième fois que ce mécanisme apparaît (TMS ordinal, invariance des demandes, Roy) : **tout ce qui s'écrit comme un rapport de dérivées de $v$ hérite d'une invariance**.

</div>

</details>

<details class="details--riche">
<summary>

**Exercice 1.41 — les demandes hicksiennes sont homogènes de degré zéro en prix**

</summary>

**Énoncé.** Prouver que les demandes hicksiennes sont homogènes de degré zéro en prix.

**Indication du livre (p. 631) :** *« Theorem A2.6. »*

*Développement à partir de cette indication.*

**Voie 1 — par le théorème A2.6 et Shephard.** $e(p,u)$ est homogène de **degré 1** en $p$ (thm 1.7, propriété 5). Par A2.6, ses dérivées partielles sont homogènes de degré $1-1=0$. Or, par le **lemme de Shephard**, $\partial e/\partial p_i=x_i^h(p,u)$. Donc

$$x_i^h(tp,u)=x_i^h(p,u). \qquad\blacksquare$$

**Voie 2 — directement (exercice 1.35 de la fiche 502).** L'ensemble de contrainte $\{x \mid u(x)\geq u\}$ ne dépend pas de $p$, et multiplier l'objectif $p\cdot x$ par $t>0$ ne change pas l'**argmin**. Donc $x^h(tp,u)=x^h(p,u)$.

> **Comparez les deux homogénéités et leur origine.**
>
> |  | Degré de la fonction de valeur | ⇒ degré de sa dérivée | Ce que la dérivée est |
> |---|---|---|---|
> | $v(p,y)$ | $0$ en $(p,y)$ | $-1$ | $\partial v/\partial p_i$, $\partial v/\partial y$ |
> | $e(p,u)$ | $1$ en $p$ | $0$ | $x_i^h$ — **la demande elle-même** |
>
> Chez $e$, le théorème A2.6 donne **directement** l'homogénéité de la demande ; chez $v$, il faut passer par un rapport. Encore une fois, Shephard est plus court que Roy.

</details>

## 🔴 Concept 2 — Effets de revenu et de substitution : la décomposition de Hicks (§1.5.2)

### 2.1 Le problème : la théorie ne prédit pas le signe

> *« Ordinairement, nous tendons à penser qu'un consommateur achètera **plus** d'un bien quand son prix baisse et **moins** quand son prix augmente, toutes choses égales par ailleurs. **Que cela ne doive pas toujours être le cas** est illustré par la Fig. 1.19. »*

Les trois panneaux, tous *« pleinement cohérents avec notre modèle »* :

| Panneau | Effet d'une baisse de $p_1$ sur $x_1$ | Statut |
|---|---|---|
| (a) | $x_1$ **augmente** | le cas usuel |
| (b) | $x_1$ **inchangé** | possible |
| (c) | $x_1$ **diminue** en valeur absolue | possible — c'est le **cas de Giffen** |

> *« Chacun de ces cas est pleinement cohérent avec notre modèle. Que prédit alors la théorie — **si tant est qu'elle prédise quelque chose** — sur la façon dont le comportement de demande de quelqu'un répond aux changements de prix (relatifs) ? »*

> ⚠️ **C'est le point de départ intellectuel de tout le §1.5.** La théorie ne dit **rien** directement sur le signe de $\partial x_i/\partial p_i$. Pour obtenir des prédictions, il faut **décomposer**.

### 2.2 L'intuition des deux effets

> *« Abordons-le intuitivement d'abord. Quand le prix d'un bien baisse, il y a **au moins deux raisons conceptuellement distinctes** pour lesquelles nous attendons un changement de la quantité demandée. »*

| Effet | Mécanisme, dans les mots du livre |
|---|---|
| **Effet de substitution (SE)** | *« Ce bien devient **relativement moins cher** que les autres. Parce que tous les biens sont désirables, **même si la maîtrise totale du consommateur sur les biens était inchangée**, nous attendrions qu'il substitue le bien relativement moins cher aux biens désormais relativement plus chers. »* |
| **Effet de revenu (IE)** | *« En même temps, chaque fois qu'un prix change, la maîtrise du consommateur sur les biens en général **n'est pas inchangée**. Quand le prix d'un bien baisse, la maîtrise totale du consommateur sur tous les biens est effectivement **augmentée**, lui permettant de changer ses achats de tous les biens comme il l'entend. »* |

> *« Bien que l'intuition nous dise que nous pouvons en un certain sens décomposer l'effet total (TE) d'un changement de prix en ces deux catégories conceptuelles séparées, **nous devrons être beaucoup plus précis** si ces idées doivent avoir la moindre utilité analytique. Différentes façons de formaliser l'intuition ont été proposées. **Nous suivrons celle proposée par Hicks (1939).** »*

### 2.3 La décomposition de Hicks — la définition exacte

> *« La décomposition hicksienne de l'effet total d'un changement de prix part de l'observation que le consommateur atteint **un certain niveau d'utilité aux prix originaux**, avant tout changement. »*

$$\boxed{\begin{aligned} \textbf{Effet de substitution} &= \text{la variation (hypothétique) de consommation qui se produirait}\\ &\quad\text{si les prix relatifs passaient à leurs nouveaux niveaux MAIS que}\\ &\quad\text{l'utilité maximale atteignable restait LA MÊME qu'avant.}\\[2mm] \textbf{Effet de revenu} &= \text{tout ce qui reste de l'effet total après l'effet de substitution.} \end{aligned}}$$

> *« Notez que **parce que l'effet de revenu est défini comme un résidu, l'effet total est toujours complètement expliqué par la somme** de l'effet de substitution et de l'effet de revenu. »*

> ⚠️ **« TE = SE + IE » n'est pas un théorème : c'est une conséquence de la définition.** L'IE est **défini** comme le résidu. Ce qui est un théorème, c'est l'expression **analytique** de chacun des trois termes — l'équation de Slutsky.
>
> **La conséquence méthodologique.** Il existe d'autres décompositions, notamment celle de **Slutsky** lui-même (compenser le revenu de façon à ce que le **panier initial** reste tout juste accessible, plutôt que le **niveau d'utilité** initial). Elles ne donnent pas les mêmes SE et IE — mais l'exercice 1.45 montre qu'elles ont **les mêmes pentes au point de départ**.

> *« Au premier abord, cela pourrait sembler une façon étrange de faire les choses, mais un coup d'œil à la Fig. 1.20 devrait vous convaincre d'au moins deux choses : sa **correspondance raisonnable** aux concepts intuitifs, et son **ingéniosité analytique**. »*

### 2.4 La figure 1.20, panneau par panneau

**Panneau (a) — l'espace des biens.** Le consommateur fait face à $p_1^0$, $p_2^0$, revenu $y$ ; il achète $x_1^0$, $x_2^0$ et atteint $u^0$. Le prix du bien 1 tombe à $p_1^1<p_1^0$. L'effet total le porte à $x_1^1$ (hausse) et $x_2^1$ (baisse).

| Étape | Ce qu'on fait | Résultat |
|---|---|---|
| **SE** | On laisse $p_1$ tomber à $p_1^1$ **en maintenant le consommateur sur la courbe $u^0$** — c'est-à-dire qu'on lui **réduit le revenu** pour qu'il fasse face à la droite budgétaire *hypothétique* en pointillés | $x_1$ passe de $x_1^0$ à $x_1^s$ (**hausse**, le bien 1 est devenu relativement moins cher) ; $x_2$ passe de $x_2^0$ à $x_2^s$ (**baisse**) |
| **IE** | On rend le revenu retiré : la droite pointillée se déplace parallèlement jusqu'à la droite finale, tangente à $u^1$ | $x_1$ passe de $x_1^s$ à $x_1^1$ ; $x_2$ de $x_2^s$ à $x_2^1$ |

> *« Ces changements hypothétiques de consommation sont les **effets de substitution hicksiens** sur le bien 1 et le bien 2, et nous les regardons comme dus "purement" au changement de prix relatifs **sans aucun changement du bien-être du consommateur**. »*

> *« C'est en ce sens que l'effet de revenu hicksien capture le changement de consommation dû "purement" au changement **de type revenu** qui accompagne un changement de prix. »*

**Panneau (b) — les deux courbes de demande.**

| Points | Courbe |
|---|---|
| $(p_1^0,x_1^0)$ et $(p_1^1,x_1^1)$ | la demande **marshallienne** du bien 1 |
| $(p_1^0,x_1^0)$ et $(p_1^1,x_1^s)$ | la demande **hicksienne** du bien 1, relative au niveau $u^0$ |

> *« Nous pouvons voir que la **courbe de demande hicksienne capture précisément le pur effet de substitution hicksien** d'un changement de prix propre. (Vous voyez ?) La **courbe de demande marshallienne capture l'effet total** d'un changement de prix propre. **Les deux divergent l'une de l'autre précisément à cause de, et d'un montant égal à, l'effet de revenu hicksien** d'un changement de prix propre. »*

> **La lecture à retenir, en une image.** Les deux courbes se **croisent** en $(p_1^0,x_1^0)$ — c'est le théorème 1.9 de la fiche 502. Ce qui les sépare **ailleurs**, c'est l'effet de revenu. C'est exactement ce que l'équation de Slutsky va écrire terme à terme.
>
> ⚠️ **Le niveau d'utilité de référence est $u^0$, celui d'AVANT le changement.** La courbe hicksienne tracée est celle indexée par $u^0$. Si l'on prenait $u^1$ comme référence, on obtiendrait une **autre** courbe hicksienne (il y en a une par niveau d'utilité), et donc une autre décomposition. Le livre choisit $u^0$ ; c'est la convention standard, mais il faut la nommer.

## 🔴 Concept 3 — L'équation de Slutsky (théorème 1.11)

### 3.1 L'énoncé

> *« La décomposition hicksienne nous donne une façon analytique nette d'isoler les deux forces distinctes qui agissent pour changer le comportement de demande après un changement de prix. […] Les relations entre effet total, effet de substitution et effet de revenu sont résumées dans l'**équation de Slutsky**. L'équation de Slutsky est parfois appelée l'"**équation fondamentale de la théorie de la demande**", de sorte que ce qui suit mérite d'être réfléchi assez soigneusement. »*

> **THEOREM 1.11 — The Slutsky Equation.** Let $x(p,y)$ be the consumer's Marshallian demand system. Let $u^*$ be the level of utility the consumer achieves at prices $p$ and income $y$. Then

$$\boxed{\;\underbrace{\frac{\partial x_i(p,y)}{\partial p_j}}_{\textbf{TE}} \;=\; \underbrace{\frac{\partial x_i^h(p,u^*)}{\partial p_j}}_{\textbf{SE}} \;-\; \underbrace{x_j(p,y)\,\frac{\partial x_i(p,y)}{\partial y}}_{\textbf{IE}}\;} \qquad i,j=1,\dots,n$$

### 3.2 La preuve — à savoir refaire

> *« La preuve de ce théorème remarquable est assez facile, bien que vous deviez la suivre très soigneusement pour éviter de vous perdre. »*

**Pas 1 — le point de départ.** Du **théorème 1.9** (fiche 502) :

$$x_i^h(p,u^*)=x_i\big(p,\,e(p,u^*)\big)$$

pour tous prix et tout niveau $u^*$.

**Pas 2 — dériver par rapport à $p_j$.**

> *« Comme ceci tient pour tout $p\gg0$, nous pouvons dériver les deux membres par rapport à $p_j$ et l'égalité est préservée. La demande hicksienne à gauche, parce qu'elle ne dépend que **directement** des prix, est simple à dériver. La demande marshallienne à droite, cependant, dépend **directement** des prix par son argument prix, mais dépend aussi **indirectement** des prix par la fonction de dépense dans son argument revenu. Il faudra appliquer la **règle de la chaîne**. »*

$$\frac{\partial x_i^h(p,u^*)}{\partial p_j}=\frac{\partial x_i\big(p,e(p,u^*)\big)}{\partial p_j}+\frac{\partial x_i\big(p,e(p,u^*)\big)}{\partial y}\cdot\frac{\partial e(p,u^*)}{\partial p_j} \tag{P.1}$$

**Pas 3 — la première substitution.** Par définition, $u^*$ est l'utilité atteinte face à $p$ et $y$, donc $u^*=v(p,y)$. Par le **théorème 1.8** :

$$e(p,u^*)=e\big(p,v(p,y)\big)=y \tag{P.2}$$

**Pas 4 — la seconde substitution.** Par le **théorème 1.7** (lemme de Shephard), la dérivée de $e$ par rapport à $p_j$ est la demande hicksienne du bien $j$ :

$$\frac{\partial e(p,u^*)}{\partial p_j}=x_j^h(p,u^*)=x_j^h\big(p,v(p,y)\big)$$

Puis, par le **théorème 1.9** appliqué au bien $j$ :

$$\boxed{\;\frac{\partial e(p,u^*)}{\partial p_j}=x_j(p,y)\;} \tag{P.3}$$

> ⚠️ **L'avertissement du livre, en toutes lettres :** *« **Attention ici.** Prenez note que nous avons montré que la dérivée-prix de la fonction de dépense en (P.1) est la demande marshallienne pour le bien $j$, **pas** le bien $i$. »*
>
> C'est l'erreur la plus fréquente sur cette preuve. Le terme de revenu porte $x_j$ (le bien **dont le prix change**) multiplié par $\partial x_i/\partial y$ (la réaction du bien **qu'on observe**).

**Pas 5 — conclure.** En substituant (P.2) et (P.3) dans (P.1) :

$$\frac{\partial x_i^h(p,u^*)}{\partial p_j}=\frac{\partial x_i(p,y)}{\partial p_j}+\frac{\partial x_i(p,y)}{\partial y}\,x_j(p,y)$$

et en réarrangeant :

$$\frac{\partial x_i(p,y)}{\partial p_j}=\frac{\partial x_i^h(p,u^*)}{\partial p_j}-x_j(p,y)\frac{\partial x_i(p,y)}{\partial y}. \qquad\blacksquare$$

> **La preuve en une ligne, pour la mémoriser.** *Dériver l'identité $x^h = x\circ e$, puis remplacer $e$ par $y$ (thm 1.8) et $\partial e/\partial p_j$ par $x_j$ (Shephard + thm 1.9).* Trois théorèmes de la fiche 502 y entrent : 1.7 (Shephard), 1.8 (les fonctions de valeur) et 1.9 (les demandes).

### 3.3 Ce que Slutsky apporte — et ce qu'il n'apporte pas encore

> *« Les équations de Slutsky fournissent des expressions analytiques nettes pour les effets de substitution et de revenu. Elles nous donnent aussi un **cadre comptable**, détaillant comment ceux-ci doivent se combiner pour expliquer tout effet total. **Pourtant, en elles-mêmes, les relations de Slutsky ne répondent à aucune des questions que nous nous étions posées.** En fait, vous pourriez penser que tout cela n'a fait que rendre plus difficile de déduire des implications pour le comportement observable. Après tout, la seule chose que nous ayons faite jusqu'ici est de décomposer un **effet total observable** en (1) un **effet de revenu observable** et (2) un **effet de substitution inobservable**. »*

**Le cas particulier du prix propre** ($i=j$) :

$$\frac{\partial x_i(p,y)}{\partial p_i}=\frac{\partial x_i^h(p,u^*)}{\partial p_i}-x_i(p,y)\frac{\partial x_i(p,y)}{\partial y} \tag{1.20}$$

> *« Le terme de gauche est la pente de la courbe de demande marshallienne du bien $i$ — et c'est ce que nous voulons expliquer. Pour le faire, cependant, nous avons apparemment besoin de savoir quelque chose sur le premier terme de droite. Mais celui-ci est la **pente d'une courbe de demande hicksienne**, et les courbes hicksiennes **ne sont pas directement observables**. Que pouvons-nous savoir de courbes que nous ne pouvons même pas voir ? »*

> *« **Étonnamment, notre théorie nous en dit beaucoup** sur les demandes hicksiennes, et donc beaucoup sur les termes de substitution — que nous puissions les voir ou non. Tout ce que nous apprenons sur les termes de substitution peut alors être traduit en connaissance sur les demandes marshalliennes **observables** via les équations de Slutsky. **C'est ainsi que les équations de Slutsky nous aideront, et ce sera notre stratégie.** »*

$$\boxed{\;\underbrace{\text{concavité de } e \text{ en } p}_{\text{fiche 502, thm 1.7}} \ \longrightarrow\ \underbrace{\text{propriétés de } \sigma(p,u)}_{\text{thm 1.12, 1.14, 1.15}} \ \xrightarrow{\ \text{Slutsky}\ } \ \underbrace{\text{propriétés de } s(p,y)}_{\text{thm 1.16, OBSERVABLE}}\;}$$

<details class="details--riche">
<summary>

**Exercice 1.45 — la compensation « à la Slutsky » a les mêmes pentes**

</summary>

**Énoncé.** Fixons $x^0\in\mathbb{R}^n_+$. On définit la **demande compensée au sens de Slutsky** en $x^0$ par

$$x^s(p,x^0)\equiv x\big(p,\ p\cdot x^0\big).$$

C'est la demande qu'on ferait si, les prix changeant, le revenu du consommateur était compensé de sorte qu'il puisse **toujours s'offrir le panier $x^0$**. Soit $x^0=x(p^0,y^0)$. Montrer que

$$\frac{\partial x_i^s(p^0,x^0)}{\partial p_j}=\frac{\partial x_i^h(p^0,u^0)}{\partial p_j}, \qquad i,j=1,\dots,n,$$

où $u^0=u(x^0)$.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué. *Le livre commente : « ainsi les pentes des demandes hicksiennes et compensées à la Slutsky sont les mêmes. Par conséquent, la matrice de Slutsky est la matrice des pentes des demandes compensées à la Slutsky, et c'est ainsi qu'elle a reçu son nom. »*

**Le calcul.** Par la règle de la chaîne appliquée à $x^s(p,x^0)=x\big(p,\,p\cdot x^0\big)$ :

$$\frac{\partial x_i^s(p,x^0)}{\partial p_j}=\frac{\partial x_i(p,y)}{\partial p_j}\bigg|_{y=p\cdot x^0}+\frac{\partial x_i(p,y)}{\partial y}\bigg|_{y=p\cdot x^0}\cdot\underbrace{\frac{\partial (p\cdot x^0)}{\partial p_j}}_{=\,x_j^0}$$

Évaluons en $p=p^0$. Alors $p^0\cdot x^0 = y^0$ (équilibre budgétaire), donc les dérivées de $x$ sont évaluées en $(p^0,y^0)$, et $x_j^0=x_j(p^0,y^0)$ :

$$\frac{\partial x_i^s(p^0,x^0)}{\partial p_j}=\frac{\partial x_i(p^0,y^0)}{\partial p_j}+x_j(p^0,y^0)\,\frac{\partial x_i(p^0,y^0)}{\partial y}.$$

Or c'est **exactement** le membre de droite de l'équation de Slutsky réarrangée, c'est-à-dire $\dfrac{\partial x_i^h(p^0,u^0)}{\partial p_j}$. $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que l'exercice enseigne — et c'est important conceptuellement.</span>

Les deux compensations sont **différentes** :

| Compensation | Ce qu'on maintient constant |
|---|---|
| **Hicks** | le **niveau d'utilité** $u^0$ |
| **Slutsky** | le **pouvoir d'achat du panier initial** $x^0$ |

Elles donnent des demandes compensées **différentes** en général — mais **les mêmes dérivées au point de départ $p^0$**. C'est ce qui rend les deux approches interchangeables pour l'analyse locale.

**L'intérêt pratique de la version Slutsky :** la compensation « pouvoir acheter $x^0$ » est **observable** (on connaît $x^0$ et $p$), alors que « rester sur $u^0$ » ne l'est pas. Historiquement, c'est ce qui a permis de tester la théorie sur données réelles — d'où le nom de la matrice.

</div>

</details>

## 🔴 Concept 4 — Ce que la théorie sait des termes de substitution

Tout ce qui suit découle d'**une seule** propriété : la **concavité de $e$ en $p$** (théorème 1.7, propriété 6).

### 4.1 Théorème 1.12 — les termes de substitution propres sont négatifs

> **THEOREM 1.12 — Negative Own-Substitution Terms.** Let $x_i^h(p,u)$ be the Hicksian demand for good $i$. Then
>
> $$\frac{\partial x_i^h(p,u)}{\partial p_i} \ \leq\ 0, \qquad i=1,\dots,n.$$

> *« Ce théorème nous dit que **les courbes de demande hicksiennes doivent toujours être comme nous les avons dessinées** dans la Fig. 1.16 et ailleurs : à savoir, de **pente négative** (non positive) par rapport à leur propre prix. La preuve est facile. »*

**La preuve, en trois lignes.** Par le lemme de Shephard (thm 1.7, propriété 7) :

$$\frac{\partial e(p,u)}{\partial p_i}=x_i^h(p,u).$$

En dérivant **encore** par rapport à $p_i$ :

$$\frac{\partial^2 e(p,u)}{\partial p_i^2}=\frac{\partial x_i^h(p,u)}{\partial p_i}.$$

Or $e$ est **concave** en $p$ (thm 1.7, propriété 6). Par le **théorème A2.5**, toutes ses dérivées partielles secondes **propres** sont non positives. $\blacksquare$

> **La chaîne à retenir.**
>
> $$e \text{ concave en } p \ \xrightarrow{\ \text{A2.5}\ } \ \frac{\partial^2 e}{\partial p_i^2}\leq0 \ \xrightarrow{\ \text{Shephard}\ } \ \frac{\partial x_i^h}{\partial p_i}\leq0$$
>
> ⚠️ **Il n'y a pas de « loi de la demande hicksienne » à démontrer séparément** : c'est une conséquence directe de la concavité. C'est la seule prédiction **inconditionnelle** de signe de tout le chapitre — la seule qui ne dépende d'aucune hypothèse sur la normalité du bien.
>
> **Notez le sens large.** $\leq0$, pas $<0$ : le cas d'égalité correspond à des préférences où le bien $i$ n'est pas substituable localement.

### 4.2 Théorème 1.14 — les termes croisés sont symétriques

> **THEOREM 1.14 — Symmetric Substitution Terms.** Let $x^h(p,u)$ be the consumer's system of Hicksian demands and suppose that $e(\cdot)$ is **twice continuously differentiable**. Then
>
> $$\frac{\partial x_i^h(p,u)}{\partial p_j}=\frac{\partial x_j^h(p,u)}{\partial p_i}, \qquad i,j=1,\dots,n.$$

**Le commentaire du livre, qui vaut d'être cité tel quel :**

> *« On est bien en peine de comprendre directement la signification de ce résultat. **Remarquablement, cependant, il peut être montré que cette condition de symétrie est intimement liée à la transitivité supposée de la relation de préférence du consommateur !** Nous ne poursuivrons pas ici cette connexion profonde, bien que nous y touchions un peu plus loin dans ce livre. »*

**La preuve.** Comme dans le théorème 1.12, les dérivées **secondes** en prix de $e$ donnent les dérivées **premières** en prix des demandes hicksiennes :

$$\frac{\partial}{\partial p_j}\left(\frac{\partial e(p,u)}{\partial p_i}\right)=\frac{\partial}{\partial p_j}x_i^h(p,u), \qquad\text{soit}\qquad \frac{\partial^2 e(p,u)}{\partial p_j\,\partial p_i}=\frac{\partial x_i^h(p,u)}{\partial p_j} \tag{P.1}$$

Par le **théorème de Young** (A2.2), l'ordre de dérivation ne change rien :

$$\frac{\partial^2 e(p,u)}{\partial p_i\,\partial p_j}=\frac{\partial^2 e(p,u)}{\partial p_j\,\partial p_i}$$

Avec (P.1), cela donne la symétrie annoncée. $\blacksquare$

> **La portée du résultat, en une phrase.** Si l'on comprime le prix du bien $j$ et qu'on observe la réponse **compensée** du bien $i$, on obtient exactement le même nombre qu'en comprimant le prix de $i$ et en observant la réponse compensée de $j$. Rien dans l'intuition ne l'annonce ; c'est une **prédiction forte** et testable.
>
> ⚠️ **La symétrie porte sur les termes HICKSIENS, jamais sur les termes marshalliens.** En général $\partial x_i/\partial p_j \neq \partial x_j/\partial p_i$ : les effets de revenu ne sont pas symétriques. Ce qui est symétrique, c'est la matrice de **Slutsky** $s(p,y)$ — qui est la matrice de substitution réécrite en grandeurs observables (thm 1.16).
>
> **La remarque du livre sur la transitivité mérite d'être retenue.** Elle annonce le chapitre 2 : la symétrie des termes de substitution est, avec l'homogénéité et l'équilibre budgétaire, l'une des conditions d'**intégrabilité** (§2.2) qui permettent de reconstruire les préférences à partir des demandes. La transitivité est ce qui, du côté des préférences, correspond à la symétrie du côté des demandes.

### 4.3 Théorème 1.15 — la matrice de substitution est semi-définie négative

**Le regroupement que fait le livre.**

> *« Si nous imaginons ranger tous les $n^2$ termes de substitution du système de demande entier du consommateur dans une matrice $n\times n$, avec les **termes de substitution propres sur la diagonale** et les **termes croisés hors diagonale**, les théorèmes 1.12 et 1.14 ensemble nous disent déjà pas mal à quoi cette matrice ressemblera. Le théorème 1.12 dit que **tous les éléments de la diagonale principale seront non positifs**, et le théorème 1.14 que la **matrice sera symétrique**. En fait, nous pouvons en dire encore plus : elle doit être **semi-définie négative** aussi. »*

> **THEOREM 1.15 — Negative Semidefinite Substitution Matrix.** Let $x^h(p,u)$ be the consumer's system of Hicksian demands and let
>
> $$\sigma(p,u)\equiv\begin{pmatrix} \dfrac{\partial x_1^h(p,u)}{\partial p_1} & \cdots & \dfrac{\partial x_1^h(p,u)}{\partial p_n}\\[2mm] \vdots & \ddots & \vdots\\[2mm] \dfrac{\partial x_n^h(p,u)}{\partial p_1} & \cdots & \dfrac{\partial x_n^h(p,u)}{\partial p_n} \end{pmatrix},$$
>
> called the **substitution matrix**, contain all the Hicksian substitution terms. Then $\sigma(p,u)$ is **negative semidefinite**.

**La preuve.** Chaque terme de cette matrice est une dérivée partielle seconde en prix de $e$ :

$$\sigma(p,u)=\begin{pmatrix} \dfrac{\partial^2 e(p,u)}{\partial p_1^2} & \cdots & \dfrac{\partial^2 e(p,u)}{\partial p_n\partial p_1}\\[2mm] \vdots & \ddots & \vdots\\[2mm] \dfrac{\partial^2 e(p,u)}{\partial p_1\partial p_n} & \cdots & \dfrac{\partial^2 e(p,u)}{\partial p_n^2} \end{pmatrix} = H_p\,e(p,u)$$

> *« La matrice de droite est simplement la **matrice hessienne** des dérivées partielles secondes en prix de la fonction de dépense. Par le théorème 1.7, la fonction de dépense est **concave** en prix. Par le **théorème A2.4**, la matrice hessienne d'une fonction concave est **semi-définie négative**. Parce que les deux matrices sont égales, la matrice de substitution sera donc aussi semi-définie négative. »* $\blacksquare$

$$\boxed{\;z^{\mathsf T}\sigma(p,u)\,z \ \leq\ 0 \qquad \forall\,z\in\mathbb{R}^n\;}$$

<details class="details--riche">
<summary>

**Exercice 1.43 — le théorème 1.15 contient le théorème 1.12**

</summary>

**Énoncé.** *« Pour des raisons d'exposition, nous avons dérivé les théorèmes 1.14 et 1.15 séparément, mais en réalité le second implique le premier. »* Montrer que lorsque la matrice de substitution $\sigma(p,u)$ est semi-définie négative, **tous les termes de substitution propres sont non positifs**.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

*(Notez au passage que la phrase citée de l'énoncé parle des théorèmes 1.14 et 1.15, mais la question porte sur les **termes propres**, c'est-à-dire sur le théorème **1.12**.)*

**La preuve, en une ligne.** Prenons $z = e_i$, le $i$-ème vecteur de la base canonique — c'est-à-dire le vecteur dont la $i$-ème coordonnée vaut 1 et les autres 0. Alors

$$e_i^{\mathsf T}\,\sigma(p,u)\,e_i = \sigma_{ii}(p,u)=\frac{\partial x_i^h(p,u)}{\partial p_i}.$$

La semi-définie négativité donne $e_i^{\mathsf T}\sigma e_i\leq0$, donc

$$\frac{\partial x_i^h(p,u)}{\partial p_i}\leq0. \qquad\blacksquare$$

> **Le principe général.** Pour une matrice semi-définie négative, **tous les éléments diagonaux sont $\leq0$** — il suffit de tester la forme quadratique sur les vecteurs de base. C'est le théorème A2.5 dont le livre se sert au théorème 1.12, démontré ici en une ligne.
>
> **Ce que la réciproque n'est PAS.** Une matrice symétrique à diagonale négative n'est **pas** nécessairement semi-définie négative. Contre-exemple : $\begin{pmatrix}-1&5\\5&-1\end{pmatrix}$, dont les valeurs propres sont $4$ et $-6$. Le théorème 1.15 est donc **strictement plus fort** que le théorème 1.12.

</details>

<details class="details--riche">
<summary>

**Ce que la semi-définie négativité impose concrètement**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours).</span>

Le livre énonce la propriété sans détailler ce qu'elle contraint. Voici les trois conséquences les plus utilisables.

</div>

**1. Diagonale négative.** $\dfrac{\partial x_i^h}{\partial p_i}\leq0$ — c'est le théorème 1.12 (exercice 1.43).

**2. Mineurs principaux d'ordre 2.** Pour toute paire $i\neq j$, le mineur $2\times2$ extrait doit avoir un déterminant $\geq0$ :

$$\frac{\partial x_i^h}{\partial p_i}\cdot\frac{\partial x_j^h}{\partial p_j} \ \geq\ \left(\frac{\partial x_i^h}{\partial p_j}\right)^{\!2}$$

(en utilisant la symétrie, thm 1.14). Autrement dit : **les effets croisés ne peuvent pas être plus grands, en valeur absolue, que la moyenne géométrique des effets propres**. C'est une restriction quantitative forte, directement testable.

**3. Le vecteur des prix est dans le noyau.** Comme $x^h(p,u)$ est homogène de degré 0 en $p$ (exercice 1.41), le théorème d'Euler pour les fonctions homogènes de degré 0 donne, pour chaque $i$ :

$$\sum_{j=1}^n \frac{\partial x_i^h(p,u)}{\partial p_j}\,p_j = 0, \qquad\text{c'est-à-dire}\qquad \sigma(p,u)\,p = 0.$$

**La matrice de substitution est donc singulière**, avec $p$ dans son noyau. Elle ne peut jamais être *définie* négative — seulement semi-définie. C'est pourquoi le livre écrit « semi-definite » et non « definite ».

> ⚠️ **Ce point 3 est une source d'erreur classique.** On lit parfois « la matrice de substitution est définie négative » : c'est **faux**, et pour une raison structurelle, pas accidentelle. L'homogénéité de degré 0 force $\det\sigma=0$.

</details>

## 🔴 Concept 5 — La loi de la demande et le paradoxe de Giffen (théorème 1.13)

### 5.1 Le contexte historique

> *« Les économistes classiques comme Edgeworth et Marshall supposaient que l'"utilité" était quelque chose de **mesurable**, et ils croyaient au **principe de l'utilité marginale décroissante**. Les énoncés classiques de la loi de la demande étaient donc plutôt **emphatiques** : "**Si le prix baisse, la quantité demandée monte.**" »*

> *« Cela semblait généralement conforme aux observations, mais il y avait des **exceptions troublantes**. Le fameux **paradoxe de Giffen** était la plus remarquable. Bien que peu nombreux, il semblait qu'il y eût au moins quelques biens pour lesquels une **baisse** de prix était suivie d'une **baisse** de la quantité demandée. Cela violait la doctrine reçue, et **la théorie classique ne pouvait pas l'expliquer**. »*

> *« La théorie moderne fait **moins d'hypothèses** sur les préférences que la théorie classique. En ce sens, elle est **moins restrictive et plus largement applicable**. En effet, elle est même capable de **résoudre le paradoxe de Giffen**. Regardez à nouveau la Fig. 1.19(c) et notez que la quantité de $x_1$ demandée **décline bien** quand son propre prix décline. **Rien ne l'exclut, donc il n'y a rien de paradoxal dans le paradoxe de Giffen** dans le contexte de la théorie moderne. Cependant, nous payons un prix pour cette plus grande généralité : **la loi de la demande moderne doit être plus équivoque que son précurseur classique**. »*

### 5.2 Le vocabulaire

**Définitions (dans le texte).**

| Terme | Définition |
|---|---|
| Bien **normal** | *« un bien dont la consommation **augmente** quand le revenu augmente, à prix constants »* — $\partial x_i/\partial y > 0$ |
| Bien **inférieur** | *« un bien dont la consommation **décline** quand le revenu augmente, à prix constants »* — $\partial x_i/\partial y < 0$ |

### 5.3 L'énoncé

> **THEOREM 1.13 — The Law of Demand.** A decrease in the own price of a **normal** good will cause quantity demanded to **increase**. If an own price decrease causes a **decrease** in quantity demanded, the good must be **inferior**.

> *« Cela découle facilement du théorème 1.12, si vous utilisez le théorème 1.11. Vous devriez le faire vous-même, donc nous le laissons en exercice. »* — c'est l'**exercice 1.42**.

<details class="details--riche">
<summary>

**Exercice 1.42 — démontrer la loi de la demande, et réfuter ses réciproques**

</summary>

**Énoncé.** Prouver la loi de la demande moderne donnée au théorème 1.13. Prouver que **la réciproque de chacun des deux énoncés est fausse**.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Point de départ — Slutsky en prix propre (1.20) :**

$$\frac{\partial x_i(p,y)}{\partial p_i}=\underbrace{\frac{\partial x_i^h(p,u^*)}{\partial p_i}}_{\leq\,0 \text{ (thm 1.12)}}-\;x_i(p,y)\,\frac{\partial x_i(p,y)}{\partial y}$$

**Énoncé 1 — un bien normal obéit à la loi.** Si le bien $i$ est **normal**, $\partial x_i/\partial y>0$. Comme $x_i(p,y)\geq0$, le terme de revenu $-x_i\,\partial x_i/\partial y$ est $\leq0$. Le premier terme est $\leq0$ par le théorème 1.12. **Les deux termes sont donc de même signe (négatif)**, d'où

$$\frac{\partial x_i(p,y)}{\partial p_i}\leq0.$$

Une **baisse** de $p_i$ fait donc **monter** (au sens large) $x_i$.

**Énoncé 2 — la contraposée.** Si $\dfrac{\partial x_i}{\partial p_i}>0$ (une baisse de prix fait **baisser** la quantité), alors, puisque le terme de substitution est $\leq0$, il faut que le terme de revenu soit **strictement positif** :

$$-x_i\,\frac{\partial x_i}{\partial y}>0 \qquad\Longrightarrow\qquad \frac{\partial x_i}{\partial y}<0$$

(en supposant $x_i>0$). Le bien est donc **inférieur**. $\blacksquare$

**Les deux réciproques sont fausses.**

**Réciproque de 1 : « si le bien obéit à la loi de la demande, il est normal » — FAUX.** Un bien **inférieur** peut parfaitement obéir à la loi de la demande, dès que l'effet de substitution **domine** l'effet de revenu :

$$\underbrace{\left|\frac{\partial x_i^h}{\partial p_i}\right|}_{\text{substitution}} \ > \ \underbrace{x_i\left|\frac{\partial x_i}{\partial y}\right|}_{\text{revenu}} \qquad\Longrightarrow\qquad \frac{\partial x_i}{\partial p_i}<0 \ \text{ malgré l'infériorité.}$$

C'est le cas de la **grande majorité des biens inférieurs** : la plupart ne sont pas des biens de Giffen.

**Réciproque de 2 : « si le bien est inférieur, une baisse de prix fait baisser la quantité » — FAUX.** C'est la même chose lue autrement : l'infériorité est **nécessaire** mais **pas suffisante** pour l'effet Giffen. Il faut en plus que l'effet de revenu **domine**.

> **La hiérarchie à mémoriser.**
>
> $$\text{bien de Giffen} \ \subsetneq \ \text{bien inférieur} \ \subsetneq \ \text{tous les biens}$$
>
> — Tout bien de Giffen **est** inférieur (énoncé 2). — Tout bien inférieur **n'est pas** de Giffen (réciproque fausse). — Un bien normal **n'est jamais** de Giffen (énoncé 1).
>
> **Les deux conditions d'un bien de Giffen :** (i) il est inférieur, **et** (ii) sa part budgétaire $s_i$ est assez grande pour que l'effet de revenu domine. C'est pourquoi les exemples historiques concernent des biens de subsistance représentant une large fraction du budget.
>
> ⚠️ **Le mot « équivoque » du livre est bien choisi.** La loi moderne n'affirme rien de façon **inconditionnelle** sur la demande marshallienne. La seule affirmation inconditionnelle du chapitre est celle du théorème 1.12, et elle porte sur la demande **hicksienne**.

</details>

<details class="details--riche">
<summary>

**Exercice 1.44 — dans un monde à deux biens, l'infériorité ne peut pas être partagée**

</summary>

**Énoncé.** Dans un cas à deux biens, montrer que si un bien est **inférieur**, l'autre doit être **normal**.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Point de départ — l'équilibre budgétaire (thm 1.10) :**

$$p_1x_1(p,y)+p_2x_2(p,y)=y \qquad \forall\,y.$$

En dérivant les deux membres par rapport à $y$ (les prix étant fixés) :

$$p_1\frac{\partial x_1}{\partial y}+p_2\frac{\partial x_2}{\partial y}=1.$$

Comme $p_1,p_2>0$, **au moins un des deux termes doit être strictement positif** — sinon le membre de gauche serait $\leq0$, ce qui contredirait l'égalité à 1.

Donc si $\dfrac{\partial x_1}{\partial y}<0$ (bien 1 inférieur), il faut nécessairement $\dfrac{\partial x_2}{\partial y}>0$ : le bien 2 est **normal**. $\blacksquare$

> **La généralisation à $n$ biens, qui vaut d'être retenue.** Le même calcul donne $\sum_i p_i\,\partial x_i/\partial y = 1$, donc **au moins un bien est normal**. On ne peut pas avoir tous les biens inférieurs : le revenu supplémentaire doit bien aller quelque part.
>
> **La version en élasticités.** En divisant par… c'est exactement l'**agrégation d'Engel** du théorème 1.17 : $\sum_i s_i\eta_i=1$. Comme les parts $s_i$ sont positives et somment à 1, la moyenne pondérée des élasticités-revenu vaut **exactement 1** — donc au moins une est positive, et même $\geq1$.

</details>

## 🔴 Concept 6 — Théorème 1.16 : la matrice de Slutsky, tout en grandeurs observables

### 6.1 L'aboutissement de la stratégie

> *« Ayant passé tant de temps à explorer les propriétés du système de demande hicksien **inobservable**, nous sommes enfin en position d'utiliser cette connaissance pour dire quelque chose d'assez concret sur le comportement de demande **observable** du consommateur. »*

> **THEOREM 1.16 — Symmetric and Negative Semidefinite Slutsky Matrix.** Let $x(p,y)$ be the consumer's Marshallian demand system. Define the $ij$-th **Slutsky term** as
>
> $$\frac{\partial x_i(p,y)}{\partial p_j}+x_j(p,y)\frac{\partial x_i(p,y)}{\partial y},$$
>
> and form the $n\times n$ **Slutsky matrix** $s(p,y)$ of price and income responses. Then $s(p,y)$ is **symmetric** and **negative semidefinite**.

$$s(p,y)=\begin{pmatrix} \dfrac{\partial x_1}{\partial p_1}+x_1\dfrac{\partial x_1}{\partial y} & \cdots & \dfrac{\partial x_1}{\partial p_n}+x_n\dfrac{\partial x_1}{\partial y}\\[2mm] \vdots & \ddots & \vdots\\[2mm] \dfrac{\partial x_n}{\partial p_1}+x_1\dfrac{\partial x_n}{\partial y} & \cdots & \dfrac{\partial x_n}{\partial p_n}+x_n\dfrac{\partial x_n}{\partial y} \end{pmatrix}$$

### 6.2 La preuve

> *« La preuve est très simple. »*

Soit $u^*=v(p,y)$. En résolvant l'équation de Slutsky (thm 1.11) pour le terme de substitution :

$$\frac{\partial x_i^h(p,u^*)}{\partial p_j}=\frac{\partial x_i(p,y)}{\partial p_j}+x_j(p,y)\frac{\partial x_i(p,y)}{\partial y}$$

> *« Si maintenant nous formons la matrice $s(p,y)$, il est clair que **chaque élément de cette matrice est exactement égal à l'élément correspondant de la matrice de substitution hicksienne $\sigma(p,u^*)$**. Par le théorème 1.14, la matrice de substitution est symétrique pour tout $u$, et par le théorème 1.15 elle est semi-définie négative pour tout $u$ ; elle le sera donc en $u^*$ aussi. Parce que les deux matrices sont égales, la matrice de Slutsky $s(p,y)$ doit aussi être symétrique et semi-définie négative. »* $\blacksquare$

$$\boxed{\;s(p,y) = \sigma\big(p,\,v(p,y)\big) \quad\text{terme à terme}\;}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi c'est l'aboutissement du chapitre.</span>

Chaque élément de $s(p,y)$ ne fait intervenir que des grandeurs **observables** : $\partial x_i/\partial p_j$, $\partial x_i/\partial y$ et $x_j$. On peut donc **estimer** cette matrice sur données et tester si elle est symétrique et semi-définie négative. Si elle ne l'est pas, le modèle du consommateur maximisateur d'utilité preneur de prix est **rejeté**.

</div>

### 6.3 L'usage empirique — ce que le livre en dit

> *« Les théorèmes 1.10 et 1.16 peuvent être utilisés comme **point de départ pour tester** la théorie que nous avons développée, ou pour l'**appliquer empiriquement**. Les exigences que la demande du consommateur satisfasse l'**homogénéité** et l'**équilibre budgétaire**, et que la matrice de Slutsky associée soit **symétrique et semi-définie négative**, fournissent un ensemble de **restrictions sur les valeurs admissibles des paramètres** dans tout système de demande marshallien estimé empiriquement — si ce système doit être vu comme appartenant à un consommateur preneur de prix maximisateur d'utilité. »*

> *« Y a-t-il d'autres restrictions testables impliquées par la théorie ? C'est une question que nous reprendrons au chapitre suivant. »* — c'est le §2.2 sur l'**intégrabilité** (fiche 504).

> **Le lien avec l'estimation économétrique, que le livre mentionne en ouverture du §1.5 :** *« pour estimer statistiquement des systèmes de demande, les caractéristiques prédites par la théorie peuvent être utilisées pour fournir des **restrictions sur les valeurs que les paramètres estimés sont autorisés à prendre**. Cette application de la théorie aide à **améliorer la précision statistique** des estimations obtenues. »*
>
> Autrement dit : la théorie n'est pas seulement testable, elle est **utile** même si on l'accepte — elle réduit le nombre de paramètres libres à estimer.

## 🟠 Concept 7 — Élasticités et agrégation (§1.5.3)

### 7.1 Pourquoi ce détour

> *« Pour compléter notre discussion de la demande du consommateur, nous examinons de plus près les implications de la condition d'**équilibre budgétaire**. Ici nous n'avons besoin d'aucune de l'artillerie lourde déployée précédemment. Il nous suffit de nous rappeler que **la contrainte budgétaire impose une sorte d'ordre et de discipline** à la réponse du consommateur à tout changement de circonstances. »*

> *« Parce que cette égalité tient pour tout $p$ et $y$, nous savons que si un seul prix ou le revenu change, elle doit tenir **avant et après** le changement. Toutes les réponses de demande doivent donc **s'agréger** de façon à préserver l'égalité de la contrainte budgétaire. »*

### 7.2 Les définitions

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 1.6 — Demand Elasticities and Income Shares.</span>

</div>

$$\eta_i \equiv \frac{\partial x_i(p,y)}{\partial y}\cdot\frac{y}{x_i(p,y)} \qquad \varepsilon_{ij}\equiv\frac{\partial x_i(p,y)}{\partial p_j}\cdot\frac{p_j}{x_i(p,y)} \qquad s_i \equiv \frac{p_ix_i(p,y)}{y}$$

$$\text{avec}\qquad s_i\geq0 \qquad\text{et}\qquad \sum_{i=1}^n s_i = 1$$

| Symbole | Nom | Lecture |
|---|---|---|
| $\eta_i$ | **élasticité-revenu** de la demande du bien $i$ | variation en % de $x_i$ pour 1 % de variation du revenu |
| $\varepsilon_{ii}$ | **élasticité-prix propre** | variation en % de $x_i$ pour 1 % de variation de $p_i$ |
| $\varepsilon_{ij}$, $j\neq i$ | **élasticité-prix croisée** | variation en % de $x_i$ pour 1 % de variation de $p_j$ |
| $s_i$ | **part budgétaire** du bien $i$ | proportion du revenu dépensée en bien $i$ |

> ⚠️ **La note de bas de page du livre, à ne pas manquer.** *« Notez que ceci n'a **pas** été défini ici, comme on le fait parfois, de façon à garantir que l'élasticité-prix propre soit un nombre **positif** chaque fois que la demande est de pente négative par rapport à son propre prix. »*
>
> Autrement dit : dans ce livre, $\varepsilon_{ii}$ est **négative** pour un bien ordinaire. Beaucoup d'ouvrages définissent l'élasticité-prix avec un signe moins pour la rendre positive. **Vérifiez toujours la convention** avant de manipuler un énoncé.

**Le vocabulaire associé aux élasticités croisées** *(non défini formellement par le livre au §1.5.3, mais utilisé à l'exercice 1.51)* :

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours).</span>

$\varepsilon_{ij}>0$ : les biens $i$ et $j$ sont des **substituts bruts** (*gross substitutes*) ; $\varepsilon_{ij}<0$ : des **compléments bruts**. Le mot « brut » (*gross*) rappelle que la mesure est **marshallienne**, donc effet de revenu inclus. La classification **nette**, fondée sur $\partial x_i^h/\partial p_j$, est symétrique (thm 1.14) ; la classification **brute** ne l'est pas.

</div>

### 7.3 Théorème 1.17 — les deux agrégations

> **THEOREM 1.17 — Aggregation in Consumer Demand.**
>
> 1. **Engel aggregation:** $\displaystyle\sum_{i=1}^n s_i\,\eta_i = 1$
> 2. **Cournot aggregation:** $\displaystyle\sum_{i=1}^n s_i\,\varepsilon_{ij} = -s_j$, $\quad j=1,\dots,n$

**Le point de départ commun :**

$$y = p\cdot x(p,y) \qquad \forall\,p,y \tag{P.1}$$

**Preuve de l'agrégation d'Engel.**

> *« L'agrégation d'Engel dit que les **élasticités-revenu pondérées par les parts doivent toujours sommer à un**. »*

En dérivant les deux membres de (P.1) par rapport au **revenu** :

$$1 = \sum_{i=1}^n p_i\,\frac{\partial x_i}{\partial y}$$

*« Multipliez et divisez chaque élément de la somme par $x_i y$, réarrangez, et obtenez »*

$$1 = \sum_{i=1}^n \underbrace{\frac{p_ix_i}{y}}_{s_i}\cdot\underbrace{\frac{\partial x_i}{\partial y}\cdot\frac{y}{x_i}}_{\eta_i} = \sum_{i=1}^n s_i\,\eta_i \qquad\blacksquare$$

**Preuve de l'agrégation de Cournot.**

> *« L'agrégation de Cournot dit que les **élasticités-prix propres et croisées pondérées par les parts doivent toujours sommer d'une façon particulière**. Pour prouver 2, nous examinons l'effet du changement d'**un seul prix**, $p_j$. »*

En dérivant (P.1) par rapport à $p_j$ :

$$0 = \sum_{i\neq j} p_i\frac{\partial x_i}{\partial p_j} \;+\; x_j \;+\; p_j\frac{\partial x_j}{\partial p_j}$$

> *« où nous avons dérivé le $j$-ème terme séparément des autres pour souligner que la **règle du produit** doit être utilisée pour dériver le terme $p_jx_j(p,y)$. »*

En regroupant :

$$-x_j = \sum_{i=1}^n p_i\frac{\partial x_i}{\partial p_j}$$

En multipliant les deux membres par $p_j/y$ :

$$-\frac{p_jx_j}{y}=\sum_{i=1}^n \frac{p_i}{y}\cdot\frac{\partial x_i}{\partial p_j}\cdot p_j$$

En multipliant et divisant chaque terme de la somme par $x_i$ :

$$-\underbrace{\frac{p_jx_j}{y}}_{s_j}=\sum_{i=1}^n \underbrace{\frac{p_ix_i}{y}}_{s_i}\cdot\underbrace{\frac{\partial x_i}{\partial p_j}\cdot\frac{p_j}{x_i}}_{\varepsilon_{ij}} \qquad\Longrightarrow\qquad \sum_{i=1}^n s_i\varepsilon_{ij}=-s_j \qquad\blacksquare$$

> ⚠️ **La règle du produit sur le terme $j$ est le seul point technique de la preuve.** Le terme $p_jx_j(p,y)$ dépend de $p_j$ **deux fois** : explicitement (le facteur $p_j$) et implicitement (par $x_j$). Le terme $x_j$ isolé dans la première ligne vient de $\partial p_j/\partial p_j = 1$. L'oublier fait perdre le $-s_j$ du membre de droite.
>
> **Les deux agrégations ont la même architecture :** dériver l'identité budgétaire, puis multiplier-diviser pour faire apparaître les parts et les élasticités. Engel dérive par rapport à $y$, Cournot par rapport à $p_j$.

<details class="details--riche">
<summary>

**Exercice 1.46 — la troisième relation, qui vient de l'homogénéité**

</summary>

**Énoncé.** *« Nous pouvons dériver encore un autre ensemble de relations qui doivent tenir entre les élasticités-prix et -revenu. Celle-ci découle directement de l'**homogénéité**, et peut en fait être considérée simplement comme une **reformulation** de ce principe. »* Prouver que

$$\sum_{j=1}^n \varepsilon_{ij}+\eta_i = 0, \qquad i=1,\dots,n.$$

**Indication du livre (p. 631), citée :** *« Le théorème d'Euler et n'importe quelle fonction de demande $x_i(p,y)$. »*

*Développement à partir de cette indication.*

**Le théorème d'Euler rappelé** (thm A2.7) : si $f$ est homogène de degré $k$, alors

$$\sum_{m} \frac{\partial f(z)}{\partial z_m}\,z_m = k\,f(z).$$

**Application.** $x_i(p,y)$ est homogène de **degré 0** en $(p,y)$ (théorème 1.10) — les variables étant les $n$ prix **et** le revenu. Euler donne donc, avec $k=0$ :

$$\sum_{j=1}^n \frac{\partial x_i(p,y)}{\partial p_j}\,p_j \;+\; \frac{\partial x_i(p,y)}{\partial y}\,y \;=\; 0.$$

En divisant par $x_i(p,y)>0$ :

$$\sum_{j=1}^n \underbrace{\frac{\partial x_i}{\partial p_j}\cdot\frac{p_j}{x_i}}_{\varepsilon_{ij}} \;+\; \underbrace{\frac{\partial x_i}{\partial y}\cdot\frac{y}{x_i}}_{\eta_i} \;=\; 0 \qquad\Longrightarrow\qquad \sum_{j=1}^n \varepsilon_{ij}+\eta_i=0. \qquad\blacksquare$$

> **La lecture économique.** Si **tous** les prix **et** le revenu augmentent de 1 %, la demande ne change pas — c'est l'absence d'illusion monétaire. La relation dit exactement cela en élasticités : la somme de toutes les réponses en pourcentage est nulle.
>
> **Le tableau des trois relations d'agrégation, à ne pas confondre :**
>
> | Relation | Somme sur | Origine | Formule |
> |---|---|---|---|
> | **Engel** | les biens $i$ | équilibre budgétaire, dérivé en $y$ | $\sum_i s_i\eta_i=1$ |
> | **Cournot** | les biens $i$ | équilibre budgétaire, dérivé en $p_j$ | $\sum_i s_i\varepsilon_{ij}=-s_j$ |
> | **Homogénéité** (ex. 1.46) | les **prix** $j$ | homogénéité de degré 0 | $\sum_j \varepsilon_{ij}+\eta_i=0$ |
>
> ⚠️ **Engel et Cournot somment sur l'indice de LIGNE $i$ (les biens), pondérées par $s_i$. La relation d'homogénéité somme sur l'indice de COLONNE $j$ (les prix), SANS pondération.** C'est la confusion la plus fréquente sur ce paragraphe.

</details>

<details class="details--riche">
<summary>

**Exercice 1.49 — un exercice numérique typique sur les agrégations**

</summary>

**Énoncé.** On vous donne les informations suivantes sur un consommateur qui dépense tout son revenu en deux biens : (1) aux prix courants, **le même montant est dépensé sur les deux biens** ; (2) aux prix courants, l'**élasticité-prix propre de la demande du bien 1 vaut $-3$**. (a) Aux prix courants, quelle est l'élasticité de la demande du bien 2 par rapport au prix du bien 1 ? (b) Les affirmations (1) et (2) peuvent-elles toutes deux tenir **à tous les prix** ? Pourquoi ou pourquoi pas ?

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**(a)** L'information (1) donne $s_1=s_2=\tfrac12$. L'**agrégation de Cournot** avec $j=1$ :

$$s_1\varepsilon_{11}+s_2\varepsilon_{21}=-s_1 \qquad\Longrightarrow\qquad \tfrac12(-3)+\tfrac12\,\varepsilon_{21}=-\tfrac12$$

$$\Longrightarrow\qquad -\tfrac32+\tfrac12\varepsilon_{21}=-\tfrac12 \qquad\Longrightarrow\qquad \boxed{\varepsilon_{21}=2}$$

Les deux biens sont donc des **substituts bruts** aux prix courants.

**(b) Non.** Si (1) tenait à **tous** les prix, cela signifierait $s_1=\tfrac12$ pour tout $p$ — c'est-à-dire des **parts budgétaires constantes**, donc des préférences **Cobb-Douglas** (fiche 501). Or sous Cobb-Douglas, $x_1=\dfrac{y}{2p_1}$, d'où

$$\varepsilon_{11}=\frac{\partial x_1}{\partial p_1}\cdot\frac{p_1}{x_1}=-\frac{y}{2p_1^2}\cdot\frac{p_1}{y/(2p_1)}=-1 \ \neq\ -3.$$

**Les deux affirmations sont donc incompatibles à tous les prix**, bien qu'elles puissent parfaitement coexister **à un jeu de prix particulier**. $\blacksquare$

> **Le principe à retenir.** « Parts constantes » $\iff$ « élasticité-prix propre $=-1$ pour chaque bien » $\iff$ « Cobb-Douglas ». Toute donnée qui affirme des parts constantes **et** une élasticité propre différente de $-1$ est contradictoire.
>
> **La vérification par Engel :** sous parts constantes, $\eta_i=1$ pour tout $i$, et $\sum_i s_i\eta_i = \sum_i s_i = 1$ .

</details>

<details class="details--riche">
<summary>

**Exercice 1.48 — dépense multiplicativement séparable ⟹ élasticités-revenu unitaires**

</summary>

**Énoncé.** Supposons que la fonction de dépense soit **multiplicativement séparable** en $p$ et $u$, de sorte que $e(p,u)=k(u)\,g(p)$, où $k(\cdot)$ est une fonction positive monotone d'une variable et $g:\mathbb{R}^n_+\to\mathbb{R}_+$. Montrer que l'**élasticité-revenu de la demande (marshallienne) de chaque bien vaut 1**.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Pas 1 — les hicksiennes.** Par le lemme de Shephard :

$$x_i^h(p,u)=\frac{\partial e}{\partial p_i}=k(u)\,\frac{\partial g(p)}{\partial p_i}.$$

**Pas 2 — inverser pour obtenir $v$.** De $e(p,u)=y$ on tire $k(u)=\dfrac{y}{g(p)}$, donc, $k$ étant monotone :

$$v(p,y)=k^{-1}\!\left(\frac{y}{g(p)}\right).$$

**Pas 3 — les marshalliennes, par le théorème 1.9.**

$$x_i(p,y)=x_i^h\big(p,v(p,y)\big)=k\big(v(p,y)\big)\,\frac{\partial g(p)}{\partial p_i} = \frac{y}{g(p)}\cdot\frac{\partial g(p)}{\partial p_i}.$$

**Pas 4 — l'élasticité.** La demande est **linéaire en $y$** : $x_i(p,y)=y\cdot h_i(p)$ avec $h_i(p)=\dfrac{\partial g/\partial p_i}{g(p)}$. Donc

$$\eta_i = \frac{\partial x_i}{\partial y}\cdot\frac{y}{x_i}=h_i(p)\cdot\frac{y}{y\,h_i(p)}=1. \qquad\blacksquare$$

> **Le vocabulaire associé.** Des préférences dont la fonction de dépense est multiplicativement séparable sont dites **homothétiques**. Elles se caractérisent de façon équivalente par : — $e(p,u)=k(u)\,g(p)$ ; — $v(p,y)=y\cdot$ (fonction de $p$) — la forme qu'on a vue sur la CES (fiche 502) ; — $x(p,y)$ **linéaire en $y$** : les **courbes d'Engel sont des droites passant par l'origine** ; — toutes les élasticités-revenu valent **1**, donc toutes les parts budgétaires sont **indépendantes du revenu**.
>
> **L'exercice 1.47** est le cas particulier où $u$ est **homogène de degré 1** : le livre y demande de montrer $e(p,u)=e(p,1)\,u$ (donc $k(u)=u$) et que **l'utilité marginale du revenu dépend de $p$ mais pas de $y$**.
>
> ⚠️ **La conséquence empirique est forte — et souvent rejetée par les données.** L'homothétie impose que la structure de consommation d'un ménage riche soit **identique en proportions** à celle d'un ménage pauvre. La **loi d'Engel** (la part de l'alimentation décroît avec le revenu) la contredit directement. C'est pourquoi les systèmes de demande estimés utilisent rarement des préférences homothétiques.

</details>

### 7.4 La figure 1.21 — le récapitulatif du livre

Le chapitre se clôt sur un tableau que le livre présente comme le bilan de tout ce qui a été établi.

| Objet | Propriété | Formule | Domaine de validité |
|---|---|---|---|
| **Demandes marshalliennes** | Homogénéité | $x(p,y)=x(tp,ty)$ | pour tout $(p,y)$, $t>0$ |
|  | Symétrie | $\dfrac{\partial x_i}{\partial p_j}+x_j\dfrac{\partial x_i}{\partial y}=\dfrac{\partial x_j}{\partial p_i}+x_i\dfrac{\partial x_j}{\partial y}$ | pour tout $(p,y)$, $i,j$ |
|  | Semi-définie négativité | $z^{\mathsf T}s(p,y)\,z\leq0$ | pour tout $(p,y)$ et $z$ |
|  | Équilibre budgétaire | $p\cdot x(p,y)=y$ | pour tout $(p,y)$ |
|  | Agrégation d'Engel | $\sum_i s_i\eta_i=1$ | pour tout $(p,y)$ |
|  | Agrégation de Cournot | $\sum_i s_i\varepsilon_{ij}=-s_j$ | pour $j=1,\dots,n$ |
| **Demandes hicksiennes** | Homogénéité | $x^h(tp,u)=x^h(p,u)$ | pour tout $(p,u)$, $t>0$ |
|  | Symétrie | $\dfrac{\partial x_i^h}{\partial p_j}=\dfrac{\partial x_j^h}{\partial p_i}$ | pour $i,j=1,\dots,n$ |
|  | Semi-définie négativité | $z^{\mathsf T}\sigma(p,u)\,z\leq0$ | pour tout $p$, $u$, $z$ |
| **Le pont** | Équation de Slutsky | $\dfrac{\partial x_i}{\partial p_j}=\dfrac{\partial x_i^h}{\partial p_j}-x_j\dfrac{\partial x_i}{\partial y}$ | $u=v(p,y)$, $i,j=1,\dots,n$ |

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment lire ce tableau.</span>

Les trois propriétés hicksiennes sont **jumelles** des trois premières propriétés marshalliennes — l'équation de Slutsky étant le dictionnaire qui traduit les unes dans les autres. Les deux agrégations, elles, n'ont **pas de pendant hicksien** : elles viennent de l'équilibre budgétaire, qui n'a de sens que dans le problème primal.

</div>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « décomposer l'effet d'une variation de prix » | **Slutsky** | Écrire les trois termes, identifier lequel est demandé |
| « calculer le terme de substitution » | **Slutsky réarrangé** | $\dfrac{\partial x_i^h}{\partial p_j}=\dfrac{\partial x_i}{\partial p_j}+x_j\dfrac{\partial x_i}{\partial y}$ — tout est marshallien |
| « le bien est-il normal / inférieur / de Giffen ? » | **Signes dans Slutsky** | Signe de $\partial x_i/\partial y$, puis comparer les magnitudes |
| « substituts ou compléments ? » | **Élasticité croisée** | *Bruts* (marshallien, non symétrique) ou *nets* (hicksien, symétrique) ? |
| « montrer que $\sum \dots = \dots$ » avec des parts et des élasticités | **Agrégation** | Dériver $p\cdot x = y$ (Engel/Cournot) ou appliquer Euler (ex. 1.46) |
| « prouver l'homogénéité » | **Théorème 1.10 ou Euler** | Par les ensembles budgétaires + unicité, ou par A2.6 et Roy |
| Une matrice de dérivées à examiner | **Propriétés de $\sigma$ ou $s$** | Symétrie (Young), diagonale $\leq0$, semi-définie négative, $\sigma p=0$ |
| Données numériques (parts, élasticités) avec une inconnue | **Agrégation numérique** | Poser Engel ou Cournot et résoudre |
| « ces affirmations peuvent-elles tenir à tous les prix ? » | **Cohérence globale** | Chercher la forme fonctionnelle qu'elles impliquent et tester |

**Les trois questions à se poser avant de commencer :**

1. **Marshallien ou hicksien ?** Le premier est observable et non symétrique ; le second est théorique et symétrique. Un énoncé qui parle de « demande compensée » ou « à utilité constante » est hicksien.
2. **Quelle convention de signe pour $\varepsilon_{ii}$ ?** Chez Jehle & Reny, elle est **négative** pour un bien ordinaire. D'autres manuels la définissent positive.
3. **Somme sur les biens ou sur les prix ?** Engel et Cournot somment sur $i$ **avec les poids $s_i$** ; la relation d'homogénéité somme sur $j$ **sans poids**.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Décomposer une variation de prix

1. Écrire l'équation de Slutsky pour le couple $(i,j)$ voulu : $$\frac{\partial x_i}{\partial p_j}=\frac{\partial x_i^h}{\partial p_j}-x_j\frac{\partial x_i}{\partial y}.$$
2. **Identifier ce qu'on connaît.** Si l'on a la demande marshallienne explicite, on calcule $\partial x_i/\partial p_j$, $\partial x_i/\partial y$ et $x_j$ directement, et l'on en **déduit** le terme de substitution.
3. Si l'on a $e(p,u)$, calculer $x_i^h$ par Shephard puis dériver.
4. **Contrôler les signes :** le terme de substitution propre est toujours $\leq0$ ; le terme de revenu a le signe de $-\partial x_i/\partial y$.

### Méthode 2 — Classer un bien

$$\begin{array}{ll} \dfrac{\partial x_i}{\partial y}>0 & \text{bien \textbf{normal}} \Rightarrow \text{obéit à la loi de la demande}\\[2mm] \dfrac{\partial x_i}{\partial y}<0 & \text{bien \textbf{inférieur}} \Rightarrow \text{peut être de Giffen, mais pas nécessairement}\\[2mm] \dfrac{\partial x_i}{\partial p_i}>0 & \text{bien de \textbf{Giffen}} \Rightarrow \text{nécessairement inférieur} \end{array}$$

Pour trancher entre « inférieur » et « de Giffen », comparer les **magnitudes** :

$$\left|\frac{\partial x_i^h}{\partial p_i}\right| \ \gtrless \ x_i\left|\frac{\partial x_i}{\partial y}\right|$$

### Méthode 3 — Vérifier les propriétés d'une matrice

| Propriété | Test |
|---|---|
| Symétrie | comparer $\sigma_{ij}$ et $\sigma_{ji}$ terme à terme |
| Diagonale $\leq0$ | lire les $\sigma_{ii}$ |
| Semi-définie négative | mineurs principaux **de tous ordres** : $\leq0$ aux ordres impairs, $\geq0$ aux ordres pairs |
| Singularité | vérifier $\sigma\,p=0$ (conséquence de l'homogénéité) |

⚠️ Un contrôle rapide et rentable : **une matrice de substitution dont le déterminant n'est pas nul est fausse**.

### Méthode 4 — Établir une relation d'agrégation

**Le canevas commun :**

1. Partir de l'identité $y=\sum_i p_ix_i(p,y)$ — ou de l'homogénéité de degré 0.
2. Dériver par rapport à la variable pertinente : $y$ (Engel), $p_j$ (Cournot), ou appliquer Euler (homogénéité).
3. **Attention à la règle du produit** sur le terme $p_jx_j$ dans Cournot.
4. Multiplier et diviser par $x_i$ et $y$ pour faire apparaître $s_i$, $\eta_i$, $\varepsilon_{ij}$.

### Méthode 5 — Résoudre un exercice numérique d'agrégation

1. Traduire les données en $s_i$, $\eta_i$, $\varepsilon_{ij}$.
2. Poser la relation adaptée : – une inconnue d'élasticité **croisée** avec un prix fixé → **Cournot** ; – une inconnue d'élasticité-**revenu** → **Engel** ; – une somme sur **tous les prix** pour un bien → **exercice 1.46**.
3. Résoudre.
4. Si l'énoncé demande « est-ce possible à tous les prix ? », **identifier la forme fonctionnelle** implicite (parts constantes ⟹ Cobb-Douglas ⟹ $\varepsilon_{ii}=-1$ et $\eta_i=1$) et tester la compatibilité.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que l'homogénéité de $v$ suffit à donner $x(p,y)=x(tp,ty)$ | Elle ne donne que l'égalité des **utilités** ; il faut l'**unicité** du maximiseur | Invoquer la **stricte quasiconcavité** |
| 2 | Dire que la théorie prédit $\partial x_i/\partial p_i<0$ | Les trois cas de la Fig. 1.19 sont tous admissibles | Seule la demande **hicksienne** a un signe garanti |
| 3 | Traiter « TE = SE + IE » comme un théorème | L'effet de revenu est **défini comme un résidu** | Le théorème, c'est l'**expression** des trois termes |
| 4 | Oublier que la courbe hicksienne de référence est indexée par $u^0$ | Il y a une hicksienne **par niveau d'utilité** | Nommer le niveau de référence |
| 5 | Dans Slutsky, écrire $x_i$ au lieu de $x_j$ dans le terme de revenu | Le livre le signale en toutes lettres : c'est la demande du bien **dont le prix change** | $-\,x_j(p,y)\,\dfrac{\partial x_i}{\partial y}$ |
| 6 | Oublier la règle de la chaîne dans la preuve de Slutsky | $x_i\big(p,e(p,u)\big)$ dépend de $p$ **deux fois** | Deux termes en (P.1) |
| 7 | Se tromper de signe en réarrangeant Slutsky | Le terme de revenu est **soustrait** dans la forme TE, **ajouté** dans la forme SE | $\dfrac{\partial x_i^h}{\partial p_j}=\dfrac{\partial x_i}{\partial p_j}+x_j\dfrac{\partial x_i}{\partial y}$ |
| 8 | Affirmer que $\partial x_i/\partial p_j=\partial x_j/\partial p_i$ | La symétrie porte sur les termes **hicksiens** (ou de Slutsky), jamais sur les termes marshalliens bruts | Symétrie de $\sigma$ et de $s$, pas des $\partial x_i/\partial p_j$ |
| 9 | Dire que $\sigma(p,u)$ est **définie** négative | Elle est **singulière** : $\sigma p = 0$ par homogénéité | **Semi-**définie négative |
| 10 | Croire qu'une matrice symétrique à diagonale $\leq0$ est semi-définie négative | Contre-exemple : $\begin{pmatrix}-1&5\\5&-1\end{pmatrix}$ | Le thm 1.15 est **strictement plus fort** que le 1.12 |
| 11 | Croire que la réciproque de la loi de la demande est vraie | La plupart des biens inférieurs **obéissent** à la loi | Infériorité = **nécessaire**, pas suffisante, pour Giffen |
| 12 | Dire qu'un bien normal peut être de Giffen | Les deux termes de Slutsky sont alors de même signe | Un bien de Giffen est **toujours** inférieur |
| 13 | Croire que tous les biens peuvent être inférieurs | $\sum_i p_i\,\partial x_i/\partial y = 1$ force au moins un bien normal | Au moins un bien est normal |
| 14 | Utiliser $\varepsilon_{ii}>0$ pour un bien ordinaire | Chez Jehle & Reny, $\varepsilon_{ii}$ est **négative** | Vérifier la convention du texte |
| 15 | Confondre substituts **bruts** et **nets** | Les bruts (marshalliens) ne sont **pas symétriques** ; les nets (hicksiens) le sont | Préciser lequel |
| 16 | Dans Cournot, oublier la règle du produit sur $p_jx_j$ | C'est ce terme qui produit le $-s_j$ | Dériver le terme $j$ **séparément** |
| 17 | Confondre les trois relations d'agrégation | Engel et Cournot somment sur $i$ **avec poids $s_i$** ; l'ex. 1.46 somme sur $j$ **sans poids** | Vérifier l'indice de sommation |
| 18 | Écrire l'agrégation de Cournot avec $+s_j$ | Le signe est **négatif** | $\sum_i s_i\varepsilon_{ij}=-s_j$ |
| 19 | Croire que la matrice de Slutsky contient des grandeurs inobservables | Chaque terme s'écrit avec $\partial x_i/\partial p_j$, $\partial x_i/\partial y$, $x_j$ | C'est ce qui la rend **testable** |
| 20 | Affirmer que l'homothétie est une hypothèse anodine | Elle impose des **parts budgétaires indépendantes du revenu** — contredit par la loi d'Engel | Toutes les $\eta_i=1$ |

## 📌 Ultimate Review

**§1.5.1 — prix relatifs et revenu réel.**

$$\frac{p_i}{p_j}=\text{unités de } j \text{ par unité de } i \qquad\qquad \frac{y}{p_j}=\text{revenu réel en termes de } j$$

**THÉORÈME 1.10.** $x(p,y)$ est **homogène de degré 0** en $(p,y)$ *(preuve : ensembles budgétaires identiques + **stricte quasiconcavité** pour l'unicité)* et satisfait l'**équilibre budgétaire** $p\cdot x(p,y)=y$ *(preuve : stricte croissance de $u$)*.

**Numéraire :** $x(p,y)=x\big(p_1/p_n,\dots,p_{n-1}/p_n,\,1,\,y/p_n\big)$ — $n-1$ prix relatifs et le revenu réel.

**§1.5.2 — la décomposition de Hicks.**

| Effet | Définition |
|---|---|
| **SE** | variation hypothétique à **utilité constante**, nouveaux prix relatifs |
| **IE** | **le résidu** : tout ce qui reste de l'effet total |

La courbe **hicksienne** capture le SE ; la **marshallienne** capture le TE ; elles divergent de l'IE.

**THÉORÈME 1.11 — ÉQUATION DE SLUTSKY.**

$$\boxed{\;\frac{\partial x_i(p,y)}{\partial p_j}=\frac{\partial x_i^h(p,u^*)}{\partial p_j}-x_j(p,y)\frac{\partial x_i(p,y)}{\partial y}\;}$$

*Preuve : dériver $x_i^h(p,u^*)=x_i\big(p,e(p,u^*)\big)$ (thm 1.9) par rapport à $p_j$ avec la règle de la chaîne, puis substituer $e(p,u^*)=y$ (thm 1.8) et $\partial e/\partial p_j=x_j(p,y)$ (Shephard + thm 1.9).*

**La stratégie du chapitre :**

$$e \text{ concave en } p \ \longrightarrow\ \sigma(p,u) \ \xrightarrow{\ \text{Slutsky}\ } \ s(p,y) \text{ observable}$$

**Les propriétés de $\sigma(p,u)$.**

| Théorème | Énoncé | Source |
|---|---|---|
| **1.12** | $\dfrac{\partial x_i^h}{\partial p_i}\leq0$ | dérivée seconde propre d'une fonction concave (A2.5) |
| **1.14** | $\dfrac{\partial x_i^h}{\partial p_j}=\dfrac{\partial x_j^h}{\partial p_i}$ | **théorème de Young** (A2.2) |
| **1.15** | $\sigma(p,u)$ **semi-définie négative** | hessienne d'une fonction concave (A2.4) |

De plus : $\sigma(p,u)\,p=0$ (Euler, homogénéité de degré 0 de $x^h$) — donc $\sigma$ est **singulière**.

**THÉORÈME 1.13 — LOI DE LA DEMANDE.** — Bien **normal** + baisse de son prix ⇒ quantité **augmente**. — Baisse de prix ⇒ baisse de quantité ⇒ le bien est **inférieur**. — **Les deux réciproques sont fausses.**

$$\text{Giffen} \subsetneq \text{inférieur} \subsetneq \text{tous les biens}$$

**THÉORÈME 1.16.** $s(p,y)=\sigma\big(p,v(p,y)\big)$ terme à terme, donc $s(p,y)$ est **symétrique** et **semi-définie négative** — en grandeurs entièrement **observables**.

**§1.5.3 — élasticités (définition 1.6).**

$$\eta_i=\frac{\partial x_i}{\partial y}\frac{y}{x_i} \qquad \varepsilon_{ij}=\frac{\partial x_i}{\partial p_j}\frac{p_j}{x_i} \qquad s_i=\frac{p_ix_i}{y}, \quad \sum_i s_i=1$$

⚠️ Chez Jehle & Reny, $\varepsilon_{ii}$ est **négative** pour un bien ordinaire.

**THÉORÈME 1.17 + exercice 1.46 — les trois agrégations.**

| Nom | Formule | Somme sur | Origine |
|---|---|---|---|
| **Engel** | $\sum_i s_i\eta_i=1$ | les **biens**, pondérée | budget dérivé en $y$ |
| **Cournot** | $\sum_i s_i\varepsilon_{ij}=-s_j$ | les **biens**, pondérée | budget dérivé en $p_j$ |
| **Homogénéité** | $\sum_j \varepsilon_{ij}+\eta_i=0$ | les **prix**, non pondérée | Euler, degré 0 |

**Les cas particuliers à connaître.**

| Préférences | Parts | $\eta_i$ | $\varepsilon_{ii}$ |
|---|---|---|---|
| Cobb-Douglas | constantes | $1$ | $-1$ |
| Homothétiques ($e=k(u)g(p)$) | indépendantes de $y$ | $1$ | variable |

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Que mesure un prix relatif, et que mesure le revenu réel ?**

</summary>

$$\frac{p_i}{p_j}=\frac{\$/\text{unité } i}{\$/\text{unité } j}=\frac{\text{unités de } j}{\text{unité de } i}$$

Le **prix relatif** est le nombre d'unités de $j$ auxquelles il faut renoncer pour acquérir une unité de $i$.

$$\frac{y}{p_j}=\text{unités de } j$$

Le **revenu réel** en termes de $j$ est le nombre d'unités de $j$ que le revenu permettrait d'acheter en totalité.

**Sur la droite de budget :** le prix relatif est la **pente**, le revenu réel est l'**intercept**.

</details>

<details class="details--riche">
<summary>

**2. Énoncer le théorème 1.10 et démontrer l'homogénéité.**

</summary>

$x(p,y)$ est **homogène de degré 0** en $(p,y)$ et satisfait $p\cdot x(p,y)=y$.

**Preuve de l'homogénéité :** $v(p,y)=v(tp,ty)$ (thm 1.6), donc $u\big(x(p,y)\big)=u\big(x(tp,ty)\big)$. Or **les ensembles budgétaires en $(p,y)$ et $(tp,ty)$ sont identiques**, donc chacun des deux paniers était réalisable quand l'autre a été choisi. Par **stricte quasiconcavité** (unicité du maximiseur), les deux paniers sont **le même**. $\blacksquare$

⚠️ L'homogénéité de $v$ seule ne donne que l'égalité des **utilités**, pas celle des paniers.

</details>

<details class="details--riche">
<summary>

**3. Qu'est-ce que « l'absence d'illusion monétaire », et pourquoi n'est-ce pas surprenant ?**

</summary>

Multiplier tous les prix **et** le revenu par $t>0$ ne change rien au comportement : ni la **pente** (prix relatifs), ni les **intercepts** (revenu réel) de la contrainte budgétaire ne bougent.

Le livre : *« parce que le seul rôle que la monnaie a joué dans la construction de notre modèle est celui d'**unité de compte**, il serait en effet étrange qu'il n'en fût pas ainsi. »*

⚠️ Ce n'est **pas une hypothèse** mais un **théorème** — donc une prédiction testable.

</details>

<details class="details--riche">
<summary>

**4. Qu'est-ce qu'un numéraire, et combien de variables cela élimine-t-il ?**

</summary>

On désigne un bien (disons le $n$-ième) comme unité de compte et on pose $t=1/p_n$ :

$$x(p,y)=x\!\left(\frac{p_1}{p_n},\dots,\frac{p_{n-1}}{p_n},\,1,\,\frac{y}{p_n}\right)$$

La demande ne dépend plus que de **$n-1$ prix relatifs** et du **revenu réel** — soit $n$ variables au lieu de $n+1$. L'homogénéité de degré 0 en élimine exactement **une**.

</details>

<details class="details--riche">
<summary>

**5. Que montrent les trois panneaux de la figure 1.19, et pourquoi le livre les montre-t-il ?**

</summary>

Trois réactions possibles de $x_1$ à une **baisse** de $p_1$ : (a) $x_1$ **augmente** ; (b) $x_1$ **inchangé** ; (c) $x_1$ **diminue**.

**Les trois sont pleinement compatibles avec le modèle.** Le livre les montre pour établir que la théorie **ne prédit rien directement** sur le signe de $\partial x_i/\partial p_i$ — d'où la nécessité de la décomposition.

</details>

<details class="details--riche">
<summary>

**6. Donner la définition exacte de l'effet de substitution et de l'effet de revenu au sens de Hicks.**

</summary>

**SE** = la variation (hypothétique) de consommation qui se produirait si les prix relatifs passaient à leurs nouveaux niveaux **mais que l'utilité maximale atteignable restait la même qu'avant**.

**IE** = **tout ce qui reste** de l'effet total après l'effet de substitution.

⚠️ L'IE est **défini comme un résidu** : « TE = SE + IE » est donc vrai **par construction**, pas par théorème.

</details>

<details class="details--riche">
<summary>

**7. Comment la figure 1.20 construit-elle les deux effets ?**

</summary>

**SE :** on laisse $p_1$ tomber à $p_1^1$ **en réduisant le revenu** pour maintenir le consommateur sur la courbe $u^0$ — droite budgétaire en pointillés. $x_1$ passe de $x_1^0$ à $x_1^s$.

**IE :** on rend le revenu retiré — la droite pointillée se déplace **parallèlement** jusqu'à la tangente à $u^1$. $x_1$ passe de $x_1^s$ à $x_1^1$.

**Panneau (b) :** $(p_1^0,x_1^0)$ et $(p_1^1,x_1^1)$ sont sur la **marshallienne** ; $(p_1^0,x_1^0)$ et $(p_1^1,x_1^s)$ sur la **hicksienne** indexée par $u^0$.

</details>

<details class="details--riche">
<summary>

**8. Énoncer l'équation de Slutsky et nommer les trois termes.**

</summary>

$$\underbrace{\frac{\partial x_i(p,y)}{\partial p_j}}_{\textbf{TE}}=\underbrace{\frac{\partial x_i^h(p,u^*)}{\partial p_j}}_{\textbf{SE}}-\underbrace{x_j(p,y)\frac{\partial x_i(p,y)}{\partial y}}_{\textbf{IE}}$$

où $u^*=v(p,y)$.

Le livre l'appelle *« l'équation fondamentale de la théorie de la demande »*.

</details>

<details class="details--riche">
<summary>

**9. Démontrer l'équation de Slutsky.**

</summary>

**Pas 1.** Partir de l'identité du **théorème 1.9** : $x_i^h(p,u^*)=x_i\big(p,e(p,u^*)\big)$.

**Pas 2.** Dériver par rapport à $p_j$ avec la **règle de la chaîne** (le membre de droite dépend de $p_j$ **deux fois**) :

$$\frac{\partial x_i^h}{\partial p_j}=\frac{\partial x_i}{\partial p_j}+\frac{\partial x_i}{\partial y}\cdot\frac{\partial e(p,u^*)}{\partial p_j}$$

**Pas 3.** $u^*=v(p,y)$ et le **théorème 1.8** donnent $e(p,u^*)=y$.

**Pas 4.** **Shephard** donne $\partial e/\partial p_j=x_j^h(p,u^*)$, et le **théorème 1.9** appliqué au bien $j$ donne $x_j^h(p,u^*)=x_j(p,y)$.

**Pas 5.** Réarranger. $\blacksquare$

⚠️ Le livre avertit explicitement : c'est la demande du bien **$j$**, pas $i$, qui apparaît dans le terme de revenu.

</details>

<details class="details--riche">
<summary>

**10. Quelle est la stratégie du §1.5, en une ligne ?**

</summary>

$$\underbrace{e \text{ concave en } p}_{\text{fiche 502}} \ \longrightarrow\ \underbrace{\text{propriétés de } \sigma(p,u)}_{\text{invisible mais très contraint}} \ \xrightarrow{\ \text{Slutsky}\ } \ \underbrace{\text{propriétés de } s(p,y)}_{\text{OBSERVABLE, donc testable}}$$

Le livre : *« Tout ce que nous apprenons sur les termes de substitution peut alors être traduit en connaissance sur les demandes marshalliennes observables via les équations de Slutsky. »*

</details>

<details class="details--riche">
<summary>

**11. Démontrer le théorème 1.12 (termes de substitution propres négatifs).**

</summary>

Par **Shephard** : $\dfrac{\partial e(p,u)}{\partial p_i}=x_i^h(p,u)$.

En dérivant à nouveau : $\dfrac{\partial^2 e(p,u)}{\partial p_i^2}=\dfrac{\partial x_i^h(p,u)}{\partial p_i}$.

$e$ étant **concave** en $p$ (thm 1.7, prop. 6), le **théorème A2.5** donne que toutes ses dérivées secondes **propres** sont $\leq0$. $\blacksquare$

**C'est la seule prédiction inconditionnelle de signe du chapitre** — et elle porte sur une grandeur inobservable.

</details>

<details class="details--riche">
<summary>

**12. Démontrer la symétrie des termes de substitution croisés.**

</summary>

Par Shephard puis dérivation :

$$\frac{\partial^2 e(p,u)}{\partial p_j\partial p_i}=\frac{\partial x_i^h(p,u)}{\partial p_j}$$

Par le **théorème de Young** (A2.2), l'ordre de dérivation est indifférent :

$$\frac{\partial^2 e}{\partial p_i\partial p_j}=\frac{\partial^2 e}{\partial p_j\partial p_i} \qquad\Longrightarrow\qquad \frac{\partial x_i^h}{\partial p_j}=\frac{\partial x_j^h}{\partial p_i}. \qquad\blacksquare$$

**La remarque du livre :** *« cette condition de symétrie est intimement liée à la **transitivité** supposée de la relation de préférence ! »* — c'est le pont vers l'intégrabilité (§2.2).

</details>

<details class="details--riche">
<summary>

**13. Pourquoi la matrice de substitution est-elle semi-définie négative, et pourquoi pas définie ?**

</summary>

**Semi-définie négative** parce qu'elle **est** la hessienne en prix de $e$, et que la hessienne d'une fonction **concave** est semi-définie négative (thm A2.4).

**Pas définie** parce qu'elle est **singulière** : $x^h$ étant homogène de degré 0 en $p$, le théorème d'Euler donne

$$\sum_j \frac{\partial x_i^h}{\partial p_j}\,p_j=0 \qquad\text{soit}\qquad \sigma(p,u)\,p=0.$$

Le vecteur $p$ est dans le **noyau** de $\sigma$ : le déterminant est nul.

⚠️ Une matrice de substitution de déterminant non nul est **fausse**.

</details>

<details class="details--riche">
<summary>

**14. Montrer que le théorème 1.15 implique le théorème 1.12 (exercice 1.43).**

</summary>

Prendre $z=e_i$, le $i$-ème vecteur de la base canonique. Alors

$$e_i^{\mathsf T}\sigma(p,u)\,e_i=\sigma_{ii}(p,u)=\frac{\partial x_i^h(p,u)}{\partial p_i}\leq0$$

par semi-définie négativité. $\blacksquare$

**La réciproque est fausse :** $\begin{pmatrix}-1&5\\5&-1\end{pmatrix}$ est symétrique à diagonale négative, mais ses valeurs propres sont $4$ et $-6$.

</details>

<details class="details--riche">
<summary>

**15. Distinguer bien normal, bien inférieur, bien de Giffen.**

</summary>

| Terme | Définition | Relation à Slutsky |
|---|---|---|
| **normal** | $\partial x_i/\partial y>0$ | terme de revenu $\leq0$, même signe que le SE |
| **inférieur** | $\partial x_i/\partial y<0$ | terme de revenu $>0$, signe opposé au SE |
| **de Giffen** | $\partial x_i/\partial p_i>0$ | l'IE **domine** le SE |

$$\text{Giffen}\subsetneq\text{inférieur}\subsetneq\text{tous les biens}$$

</details>

<details class="details--riche">
<summary>

**16. Énoncer la loi de la demande moderne et démontrer ses deux volets.**

</summary>

**Énoncé 1.** Une baisse du prix propre d'un bien **normal** fait **augmenter** la quantité demandée. **Énoncé 2.** Si une baisse de prix fait **baisser** la quantité, le bien est **inférieur**.

**Preuve.** De $\dfrac{\partial x_i}{\partial p_i}=\underbrace{\dfrac{\partial x_i^h}{\partial p_i}}_{\leq0}-x_i\dfrac{\partial x_i}{\partial y}$ :

— si $\partial x_i/\partial y>0$, le second terme est $\leq0$ : **les deux termes sont négatifs**, donc $\partial x_i/\partial p_i\leq0$ ; — si $\partial x_i/\partial p_i>0$, il faut que $-x_i\,\partial x_i/\partial y>0$, donc $\partial x_i/\partial y<0$ . $\blacksquare$

</details>

<details class="details--riche">
<summary>

**17. Pourquoi les réciproques de la loi de la demande sont-elles fausses ?**

</summary>

**« Obéit à la loi ⟹ normal » est faux.** Un bien inférieur obéit à la loi dès que le SE **domine** :

$$\left|\frac{\partial x_i^h}{\partial p_i}\right|>x_i\left|\frac{\partial x_i}{\partial y}\right| \qquad\Longrightarrow\qquad \frac{\partial x_i}{\partial p_i}<0.$$

**« Inférieur ⟹ Giffen » est faux.** L'infériorité est **nécessaire** mais pas **suffisante** : il faut en plus que l'effet de revenu domine, ce qui exige une **part budgétaire importante**.

C'est pourquoi le livre dit que la loi moderne est nécessairement plus **équivoque** que la loi classique.

</details>

<details class="details--riche">
<summary>

**18. Le paradoxe de Giffen est-il un paradoxe pour la théorie moderne ?**

</summary>

**Non.** Le livre : *« **Rien ne l'exclut, donc il n'y a rien de paradoxal dans le paradoxe de Giffen** dans le contexte de la théorie moderne. »*

C'était un paradoxe pour la théorie **classique**, qui supposait l'utilité mesurable et la décroissance de l'utilité marginale, et affirmait donc emphatiquement « si le prix baisse, la quantité monte ».

**Le prix payé pour cette généralité :** la loi moderne est conditionnelle.

</details>

<details class="details--riche">
<summary>

**19. Montrer qu'à deux biens, si l'un est inférieur, l'autre est normal.**

</summary>

En dérivant l'équilibre budgétaire $p_1x_1+p_2x_2=y$ par rapport à $y$ :

$$p_1\frac{\partial x_1}{\partial y}+p_2\frac{\partial x_2}{\partial y}=1.$$

Comme $p_1,p_2>0$, au moins un des deux termes est **strictement positif**. Si $\partial x_1/\partial y<0$, alors nécessairement $\partial x_2/\partial y>0$. $\blacksquare$

**Généralisation :** $\sum_i p_i\,\partial x_i/\partial y=1$ ⇒ **au moins un bien est normal**, quel que soit $n$.

</details>

<details class="details--riche">
<summary>

**20. Énoncer le théorème 1.16 et expliquer pourquoi c'est l'aboutissement du chapitre.**

</summary>

La **matrice de Slutsky** $s(p,y)$, de terme général

$$s_{ij}=\frac{\partial x_i(p,y)}{\partial p_j}+x_j(p,y)\frac{\partial x_i(p,y)}{\partial y},$$

est **symétrique** et **semi-définie négative**.

**Preuve :** en réarrangeant Slutsky, $s_{ij}=\partial x_i^h(p,u^*)/\partial p_j$ terme à terme, donc $s(p,y)=\sigma\big(p,v(p,y)\big)$. Les théorèmes 1.14 et 1.15 s'appliquent.

**Pourquoi c'est l'aboutissement :** chaque terme est **observable**. On peut estimer $s$ sur données et **rejeter** le modèle si elle n'est pas symétrique et semi-définie négative.

</details>

<details class="details--riche">
<summary>

**21. À quoi servent concrètement les théorèmes 1.10 et 1.16 en économétrie ?**

</summary>

Le livre : ils *« fournissent un ensemble de **restrictions sur les valeurs admissibles des paramètres** dans tout système de demande marshallien estimé »*.

Deux usages :

1. **Tester** la théorie — si les restrictions sont violées, le modèle du consommateur maximisateur preneur de prix est rejeté ;
2. **Améliorer la précision** — imposer les restrictions réduit le nombre de paramètres libres, ce qui *« aide à améliorer la précision statistique des estimations »*.

</details>

<details class="details--riche">
<summary>

**22. Écrire les trois définitions de la définition 1.6, avec la convention de signe du livre.**

</summary>

$$\eta_i=\frac{\partial x_i}{\partial y}\cdot\frac{y}{x_i} \qquad \varepsilon_{ij}=\frac{\partial x_i}{\partial p_j}\cdot\frac{p_j}{x_i} \qquad s_i=\frac{p_ix_i}{y}$$

avec $s_i\geq0$ et $\sum_i s_i=1$.

⚠️ **Convention du livre :** $\varepsilon_{ii}$ est **négative** pour un bien ordinaire. Le livre le signale en note : *« ceci n'a pas été défini ici, comme on le fait parfois, de façon à garantir que l'élasticité-prix propre soit un nombre positif. »*

</details>

<details class="details--riche">
<summary>

**23. Démontrer l'agrégation d'Engel.**

</summary>

Dériver $y=\sum_i p_i x_i(p,y)$ par rapport à $y$ :

$$1=\sum_{i=1}^n p_i\frac{\partial x_i}{\partial y}.$$

Multiplier et diviser chaque terme par $x_iy$ :

$$1=\sum_{i=1}^n \underbrace{\frac{p_ix_i}{y}}_{s_i}\cdot\underbrace{\frac{\partial x_i}{\partial y}\frac{y}{x_i}}_{\eta_i}=\sum_i s_i\eta_i. \qquad\blacksquare$$

**Lecture :** la moyenne pondérée des élasticités-revenu vaut **exactement 1**. Donc au moins un bien a $\eta_i\geq1$.

</details>

<details class="details--riche">
<summary>

**24. Démontrer l'agrégation de Cournot, en soignant le point technique.**

</summary>

Dériver $y=\sum_i p_ix_i(p,y)$ par rapport à $p_j$, **en isolant le terme $j$** :

$$0=\sum_{i\neq j}p_i\frac{\partial x_i}{\partial p_j}+\underbrace{x_j+p_j\frac{\partial x_j}{\partial p_j}}_{\text{règle du produit sur } p_jx_j}$$

En regroupant : $-x_j=\sum_{i=1}^n p_i\dfrac{\partial x_i}{\partial p_j}$.

Multiplier par $p_j/y$ puis multiplier-diviser par $x_i$ :

$$-\underbrace{\frac{p_jx_j}{y}}_{s_j}=\sum_i \underbrace{\frac{p_ix_i}{y}}_{s_i}\underbrace{\frac{\partial x_i}{\partial p_j}\frac{p_j}{x_i}}_{\varepsilon_{ij}} \qquad\Longrightarrow\qquad \sum_i s_i\varepsilon_{ij}=-s_j. \qquad\blacksquare$$

⚠️ **Le terme $x_j$ isolé vient de $\partial p_j/\partial p_j=1$.** L'oublier fait perdre le $-s_j$.

</details>

<details class="details--riche">
<summary>

**25. Démontrer la relation de l'exercice 1.46 et dire d'où elle vient.**

</summary>

$$\sum_{j=1}^n \varepsilon_{ij}+\eta_i=0$$

**Origine : l'homogénéité de degré 0**, via le **théorème d'Euler** (A2.7). Pour $f$ homogène de degré $k$ : $\sum_m \partial f/\partial z_m\cdot z_m=k\,f$. Avec $k=0$ et les variables $(p_1,\dots,p_n,y)$ :

$$\sum_j \frac{\partial x_i}{\partial p_j}p_j+\frac{\partial x_i}{\partial y}\,y=0.$$

En divisant par $x_i$, on obtient la relation. $\blacksquare$

**Lecture :** si tous les prix **et** le revenu montent de 1 %, la demande ne bouge pas.

</details>

<details class="details--riche">
<summary>

**26. Comment ne pas confondre les trois relations d'agrégation ?**

</summary>

| Relation | Somme sur | Pondération | Origine |
|---|---|---|---|
| **Engel** | les **biens** $i$ | $s_i$ | budget, dérivé en $y$ |
| **Cournot** | les **biens** $i$ | $s_i$ | budget, dérivé en $p_j$ |
| **Homogénéité** | les **prix** $j$ | **aucune** | Euler, degré 0 |

⚠️ Le repère : Engel et Cournot somment sur l'indice de **ligne** avec les parts ; l'exercice 1.46 somme sur l'indice de **colonne** sans pondération.

</details>

<details class="details--riche">
<summary>

**27. Quelle est la différence entre substituts bruts et substituts nets ?**

</summary>

|  | Fondé sur | Symétrique ? |
|---|---|---|
| **Bruts** (*gross*) | $\varepsilon_{ij}$, donc $\partial x_i/\partial p_j$ **marshallien** | **Non** |
| **Nets** | $\partial x_i^h/\partial p_j$ **hicksien** | **Oui** (thm 1.14) |

Le mot « brut » rappelle que la mesure inclut l'**effet de revenu**. Deux biens peuvent être substituts nets et compléments bruts.

</details>

<details class="details--riche">
<summary>

**28. Que caractérisent des préférences homothétiques ?**

</summary>

Quatre formulations **équivalentes** :

1. $e(p,u)=k(u)\,g(p)$ — dépense **multiplicativement séparable** ;
2. $v(p,y)=y\cdot$ (fonction de $p$) ;
3. $x(p,y)$ **linéaire en $y$** — courbes d'Engel = droites par l'origine ;
4. toutes les élasticités-revenu valent $\eta_i=1$ — parts budgétaires **indépendantes du revenu**.

⚠️ **C'est empiriquement fort et souvent rejeté :** la **loi d'Engel** (la part de l'alimentation décroît avec le revenu) contredit directement l'homothétie.

</details>

<details class="details--riche">
<summary>

**29. Qu'est-ce que la compensation « à la Slutsky », et pourquoi porte-t-elle ce nom ?**

</summary>

$$x^s(p,x^0)\equiv x\big(p,\ p\cdot x^0\big)$$

On compense le revenu de sorte que le consommateur puisse **toujours s'offrir le panier initial $x^0$** — au lieu de rester au même **niveau d'utilité** (Hicks).

**Le résultat de l'exercice 1.45 :** les deux compensations ont **les mêmes dérivées** au point de départ. C'est pourquoi la matrice de Slutsky est *« la matrice des pentes des demandes compensées à la Slutsky, et c'est ainsi qu'elle a reçu son nom »*.

**L'avantage pratique :** la compensation de Slutsky est **observable** ($x^0$ et $p$ sont mesurables), celle de Hicks ne l'est pas.

</details>

<details class="details--riche">
<summary>

**30. Un consommateur dépense autant sur deux biens et $\varepsilon_{11}=-3$. Que vaut $\varepsilon_{21}$ ?**

</summary>

$s_1=s_2=\tfrac12$. **Cournot** avec $j=1$ :

$$s_1\varepsilon_{11}+s_2\varepsilon_{21}=-s_1 \qquad\Longrightarrow\qquad \tfrac12(-3)+\tfrac12\varepsilon_{21}=-\tfrac12 \qquad\Longrightarrow\qquad \varepsilon_{21}=2.$$

Les deux biens sont des **substituts bruts**.

**Ces deux données peuvent-elles tenir à tous les prix ?** **Non.** Des parts constantes impliquent des préférences **Cobb-Douglas**, donc $\varepsilon_{11}=-1$, ce qui contredit $-3$.

</details>

<details class="details--riche">
<summary>

**31. Restituer la figure 1.21 de mémoire.**

</summary>

| Marshalliennes | Hicksiennes |
|---|---|
| $x(p,y)=x(tp,ty)$ | $x^h(tp,u)=x^h(p,u)$ |
| $s(p,y)$ symétrique | $\dfrac{\partial x_i^h}{\partial p_j}=\dfrac{\partial x_j^h}{\partial p_i}$ |
| $z^{\mathsf T}s(p,y)z\leq0$ | $z^{\mathsf T}\sigma(p,u)z\leq0$ |
| $p\cdot x(p,y)=y$ | — |
| $\sum_i s_i\eta_i=1$ | — |
| $\sum_i s_i\varepsilon_{ij}=-s_j$ | — |

**Le pont :** $\dfrac{\partial x_i}{\partial p_j}=\dfrac{\partial x_i^h}{\partial p_j}-x_j\dfrac{\partial x_i}{\partial y}$ avec $u=v(p,y)$.

Les **agrégations n'ont pas de pendant hicksien** : elles viennent de l'équilibre budgétaire, propre au problème primal.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Que mesure $p_i/p_j$ ? | Les **unités de $j$ sacrifiées** par unité de $i$ acquise |
| Que mesure $y/p_j$ ? | Le **revenu réel** en unités de $j$ |
| Où lit-on ces deux grandeurs ? | Le prix relatif est la **pente** de la droite de budget, le revenu réel l'**intercept** |
| Théorème 1.10, partie 1 ? | $x(p,y)$ est **homogène de degré 0** en $(p,y)$ |
| Théorème 1.10, partie 2 ? | **Équilibre budgétaire** : $p\cdot x(p,y)=y$ |
| Que faut-il en plus de l'homogénéité de $v$ ? | La **stricte quasiconcavité** — sinon on n'a que l'égalité des utilités |
| L'absence d'illusion monétaire est-elle une hypothèse ? | **Non, un théorème** — donc une prédiction testable |
| Que gagne-t-on avec un numéraire ? | La demande ne dépend que de **$n-1$ prix relatifs** et du revenu réel |
| Que montre la figure 1.19 ? | Les **trois** réactions possibles à une baisse de prix — toutes admissibles |
| Définition de l'effet de substitution (Hicks) ? | La variation à **utilité constante**, aux nouveaux prix relatifs |
| Définition de l'effet de revenu (Hicks) ? | **Le résidu** — tout ce qui reste de l'effet total |
| « TE = SE + IE » est-il un théorème ? | **Non** — c'est vrai **par construction** |
| Que capture la courbe hicksienne ? | Le **SE seul** |
| Que capture la courbe marshallienne ? | Le **TE** |
| De quoi divergent-elles ? | Exactement de l'**effet de revenu** |
| L'équation de Slutsky ? | $\dfrac{\partial x_i}{\partial p_j}=\dfrac{\partial x_i^h}{\partial p_j}-x_j\dfrac{\partial x_i}{\partial y}$ |
| Le nom que lui donne le livre ? | L'« **équation fondamentale de la théorie de la demande** » |
| De quelle identité part sa preuve ? | $x_i^h(p,u^*)=x_i\big(p,e(p,u^*)\big)$ — **théorème 1.9** |
| Quels deux résultats substitue-t-on ensuite ? | $e(p,u^*)=y$ (thm 1.8) et $\partial e/\partial p_j=x_j(p,y)$ (Shephard + thm 1.9) |
| Quelle demande apparaît dans le terme de revenu ? | Celle du bien **$j$** — le bien **dont le prix change** |
| La stratégie du §1.5 ? | Concavité de $e$ → propriétés de $\sigma$ → propriétés de $s$ **observable** |
| Théorème 1.12 ? | $\dfrac{\partial x_i^h}{\partial p_i}\leq0$ |
| D'où vient-il ? | Dérivée seconde **propre** d'une fonction concave (A2.5) + Shephard |
| Est-ce la seule prédiction inconditionnelle de signe ? | **Oui** — et elle porte sur une grandeur **inobservable** |
| Théorème 1.14 ? | $\dfrac{\partial x_i^h}{\partial p_j}=\dfrac{\partial x_j^h}{\partial p_i}$ |
| Quel théorème mathématique le donne ? | Le **théorème de Young** (A2.2) |
| À quoi la symétrie est-elle liée, selon le livre ? | À la **transitivité** des préférences — pont vers l'intégrabilité (§2.2) |
| Théorème 1.15 ? | $\sigma(p,u)$ est **semi-définie négative** |
| Pourquoi ? | Elle **est** la hessienne en $p$ de $e$, qui est **concave** (A2.4) |
| Pourquoi pas **définie** négative ? | $\sigma(p,u)\,p=0$ par homogénéité — elle est **singulière** |
| Comment le thm 1.15 implique-t-il le thm 1.12 ? | Tester la forme quadratique sur $z=e_i$ |
| La réciproque (diagonale $\leq0$ ⟹ SDN) ? | **Fausse** : $\begin{pmatrix}-1&5\\5&-1\end{pmatrix}$ |
| Bien **normal** ? | $\partial x_i/\partial y>0$ |
| Bien **inférieur** ? | $\partial x_i/\partial y<0$ |
| Bien de **Giffen** ? | $\partial x_i/\partial p_i>0$ — l'IE **domine** le SE |
| La hiérarchie ? | Giffen $\subsetneq$ inférieur $\subsetneq$ tous les biens |
| Loi de la demande, énoncé 1 ? | Bien **normal** + baisse de prix ⇒ quantité **augmente** |
| Loi de la demande, énoncé 2 ? | Baisse de prix ⇒ baisse de quantité ⇒ bien **inférieur** |
| Les réciproques sont-elles vraies ? | **Non, les deux sont fausses** (exercice 1.42) |
| Un bien normal peut-il être de Giffen ? | **Jamais** — les deux termes de Slutsky sont alors de même signe |
| Les deux conditions d'un bien de Giffen ? | (i) inférieur **et** (ii) part budgétaire assez grande |
| Le paradoxe de Giffen est-il paradoxal aujourd'hui ? | **Non** — *« rien ne l'exclut »* |
| Le prix payé pour cette généralité ? | La loi moderne est **équivoque**, conditionnelle |
| Peut-on avoir tous les biens inférieurs ? | **Non** — $\sum_i p_i\,\partial x_i/\partial y=1$ |
| Théorème 1.16 ? | $s(p,y)$ est **symétrique** et **semi-définie négative** |
| Sa preuve, en une ligne ? | $s(p,y)=\sigma\big(p,v(p,y)\big)$ terme à terme |
| Pourquoi est-ce l'aboutissement du chapitre ? | Chaque terme est **observable** — donc la théorie est **testable** |
| Les deux usages empiriques des thm 1.10 et 1.16 ? | **Tester** la théorie · **améliorer la précision** des estimations |
| $\eta_i$ ? | $\dfrac{\partial x_i}{\partial y}\dfrac{y}{x_i}$ — élasticité-**revenu** |
| $\varepsilon_{ij}$ ? | $\dfrac{\partial x_i}{\partial p_j}\dfrac{p_j}{x_i}$ — élasticité-**prix** |
| $s_i$ ? | $\dfrac{p_ix_i}{y}$ — **part budgétaire**, $\sum_i s_i=1$ |
| Signe de $\varepsilon_{ii}$ chez Jehle & Reny ? | **Négatif** pour un bien ordinaire — pas de signe moins dans la définition |
| Agrégation d'**Engel** ? | $\sum_i s_i\eta_i=1$ |
| Agrégation de **Cournot** ? | $\sum_i s_i\varepsilon_{ij}=-s_j$ |
| Le point technique de la preuve de Cournot ? | La **règle du produit** sur $p_jx_j$ — c'est elle qui produit le $-s_j$ |
| La relation de l'exercice 1.46 ? | $\sum_j\varepsilon_{ij}+\eta_i=0$ |
| D'où vient-elle ? | De l'**homogénéité de degré 0**, via le **théorème d'Euler** |
| Comment distinguer les trois agrégations ? | Engel/Cournot somment sur $i$ **avec $s_i$** ; l'ex. 1.46 sur $j$ **sans poids** |
| Substituts **bruts** vs **nets** ? | Bruts = marshalliens, **non symétriques** · Nets = hicksiens, **symétriques** |
| Parts budgétaires constantes ⟺ ? | **Cobb-Douglas** ⟺ $\eta_i=1$ et $\varepsilon_{ii}=-1$ |
| Préférences **homothétiques** ? | $e(p,u)=k(u)g(p)$ ⟺ $x$ linéaire en $y$ ⟺ toutes les $\eta_i=1$ |
| Pourquoi l'homothétie est-elle empiriquement contestée ? | Elle contredit la **loi d'Engel** |
| Compensation « à la Slutsky » ? | $x^s(p,x^0)=x(p,\,p\cdot x^0)$ — pouvoir toujours s'offrir $x^0$ |
| Son rapport avec Hicks ? | Compensations **différentes**, mais **mêmes pentes** au point de départ |
| Pourquoi la matrice porte-t-elle le nom de Slutsky ? | Parce qu'elle est la matrice des **pentes des demandes compensées à la Slutsky** |
