# Fiche 506 — Choix dans l'incertain : von Neumann-Morgenstern et aversion au risque

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 2 « Topics in Consumer Theory », §2.4 « Uncertainty » (p. 97-118) |
| **Difficulté** | Fondamental — le socle de toute la finance et de l'économie de l'information |
| **Temps d'étude estimé** | 145 min |
| **Prérequis** | Fiche 500 (axiomes de préférence, représentation) · notions de probabilité élémentaire · concavité (fiche 35) |
| **Concepts clés** | Résultats, pari simple, pari composé, probabilité effective, axiomes G1 à G6, complétude, transitivité, continuité, monotonicité, substitution, réduction aux paris simples, propriété d'espérance d'utilité, fonction d'utilité VNM, théorème 2.7, transformation affine positive, théorème 2.8, aversion au risque, neutralité, goût du risque, concavité, équivalent certain, prime de risque, mesure d'Arrow-Pratt, DARA, CARA, IARA, inégalité de Jensen, concavification, assurance actuariellement équitable |
| **Poids à l'examen** | Les **six axiomes** et ce que chacun interdit · la **propriété d'espérance d'utilité** (déf. 2.3) · la **preuve du théorème 2.7** (construction $g\sim(u(g)\circ a_1,\ (1-u(g))\circ a_n)$) · le **théorème 2.8** et pourquoi les ratios de différences d'utilité sont invariants · **équivalent certain et prime de risque** · la mesure **d'Arrow-Pratt** et sa justification par Jensen · l'**exemple 2.7** (assurance complète sous prime équitable). |

## 🎯 Vue d'ensemble

```
LE FIL DU §2.4 : etendre la theorie du choix a l'INCERTAIN

  LE CHANGEMENT DE PERSPECTIVE
     avant : preferences sur des PANIERS  x  dans X
     ici   : preferences sur des PARIS    g  dans G
     (« Pour tenir compte de l'incertitude, il suffit de deplacer legerement
        la perspective. »)

  LE CADRE
     A = { a1, ..., an }   ensemble FINI de RESULTATS -- eux-memes SANS risque
     PARI SIMPLE   ( p1 o a1 , ... , pn o an )  avec pi >= 0 et somme = 1
     PARI COMPOSE  un pari dont les lots sont eux-memes des paris
                   (on exclut la composition INFINIE : le billet de loterie
                    qui redonne un billet de loterie a l'infini)
     G = tous les paris ;  GS = les paris simples ;  A inclus dans GS

  LES SIX AXIOMES  (indexes G1 a G6)
     G1  COMPLETUDE      tout couple de paris est comparable
     G2  TRANSITIVITE    pas de cycle
     G3  CONTINUITE      pour tout g il existe alpha avec
                         g ~ ( alpha o a1 , (1-alpha) o an )
     G4  MONOTONICITE    ( alpha o a1, (1-alpha) o an ) >~ ( beta o a1, ... )
                         SI ET SEULEMENT SI  alpha >= beta
     G5  SUBSTITUTION    si hi ~ gi pour tout i, alors h ~ g
     G6  REDUCTION       seules comptent les PROBABILITES EFFECTIVES
                         un pari compose ~ le pari simple qu'il induit

     remarque du livre : G1 est REDONDANT -- G2 + G3 + G4 l'impliquent (ex. 2.22)

  DEFINITION 2.3  --  PROPRIETE D'ESPERANCE D'UTILITE
     u a la propriete d'esperance d'utilite si, pour tout g,

          u(g) = SOMME_i  pi . u(ai)

     ou (p1 o a1, ..., pn o an) est le pari simple INDUIT par g
     => u est entierement determinee par ses valeurs sur les n RESULTATS

  THEOREME 2.7   G1 a G6 ==> il existe u representant >~ AVEC cette propriete
     preuve CONSTRUCTIVE : definir u(g) comme l'unique nombre tel que
          g ~ ( u(g) o a1 , (1 - u(g)) o an )
     (G3 donne l'existence, G4 l'unicite -- exercice 2.19)
     => u(a1) = 1 et u(an) = 0 par construction

  THEOREME 2.8   v represente les memes preferences AVEC la propriete
                 SI ET SEULEMENT SI  v = alpha + beta u  avec beta > 0
     => l'utilite VNM n'est PAS purement ordinale
     => ce qui est invariant : les RATIOS DE DIFFERENCES d'utilite
     => ce qui ne l'est PAS : le niveau, l'ecart, les comparaisons entre individus

  AVERSION AU RISQUE  (def. 2.4)   pour g = (p1 o w1, ..., pn o wn)
     AVERSE  si u(E(g)) > u(g)      <=>  u STRICTEMENT CONCAVE
     NEUTRE  si u(E(g)) = u(g)      <=>  u LINEAIRE
     AIMANT  si u(E(g)) < u(g)      <=>  u STRICTEMENT CONVEXE

  DEFINITION 2.5   EQUIVALENT CERTAIN  CE :  u(g) = u(CE)
                   PRIME DE RISQUE      P :  u(g) = u( E(g) - P )
                   donc  P = E(g) - CE

  DEFINITION 2.6   MESURE D'ARROW-PRATT d'aversion ABSOLUE

          Ra(w) = - u''(w) / u'(w)

     pourquoi PAS u'' seul : le theoreme 2.8 permet de multiplier u par
     n'importe quelle constante > 0, donc |u''| est ARBITRAIRE.
     Le RAPPORT, lui, est invariant.

     Ra plus grand  <=>  equivalent certain plus BAS  <=>  accepte MOINS de paris
     preuve : h = u o v^(-1) est strictement CONCAVE, puis JENSEN

  CLASSIFICATION D'ARROW selon la variation de Ra(w)
     DARA  Ra decroissante  -- la restriction PLAUSIBLE
     CARA  Ra constante
     IARA  Ra croissante    -- comportement « pervers »

  DEUX APPLICATIONS
     exemple 2.6  portefeuille : on investit dans l'actif risque SSI son
                  rendement espere est > 0 ;  sous DARA l'actif risque est NORMAL
     exemple 2.7  assurance : a prime ACTUARIELLEMENT EQUITABLE (rho = alpha),
                  un agent averse s'assure COMPLETEMENT  (x = L)
```

> **La phrase d'ouverture.** *« Jusqu'à présent, nous avons supposé que les décideurs agissent dans un monde de **certitude absolue**. […] Clairement, les agents économiques du monde réel ne peuvent pas toujours opérer dans des conditions aussi plaisantes. »*

> **Et la référence fondatrice.** *« L'approche analytique principale de l'incertitude est fondée sur le travail pionnier de **von Neumann et Morgenstern (1944)**. »*

> ⚠️ **Note de transcription — identique aux fiches 500-505.** Le PDF n'exporte pas $\succsim$, $\succ$, $\gg$, $\sum$ ; il rend l'inégalité vectorielle $\geq$ comme un « + ». Ces symboles sont rétablis depuis la prose et les équations voisines.

## 🔴 Concept 1 — Le cadre : résultats, paris simples, paris composés

### 1.1 Le déplacement de perspective

> *« Plus tôt dans le texte, le consommateur était supposé avoir une relation de préférence sur tous les paniers $x$ d'un ensemble de consommation $X$. **Pour tenir compte de l'incertitude, il suffit de déplacer légèrement la perspective.** Nous maintiendrons la notion de relation de préférence mais, au lieu de paniers de consommation, l'individu sera supposé avoir une relation de préférence sur des **paris** (*gambles*). »*

### 1.2 Les résultats

Soit $A=\{a_1,\dots,a_n\}$ un ensemble **fini** de **résultats** (*outcomes*).

> *« Les $a_i$ peuvent bien être des paniers de consommation, des montants d'argent (positifs ou négatifs), ou n'importe quoi. **Le point principal est que les $a_i$ eux-mêmes n'impliquent aucune incertitude.** En revanche, nous utiliserons l'ensemble $A$ comme base pour créer des paris. »*

**L'exemple du livre.** $A=\{1,\,-1\}$ où $1$ = « gagner un dollar » et $-1$ = « perdre un dollar ». Sur un lancer de pièce équitable, chaque issue a probabilité $\tfrac12$.

### 1.3 Les paris simples

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 2.2 — Simple Gambles.</span>

Soit $A=\{a_1,\dots,a_n\}$ l'ensemble des résultats. Alors $\mathcal{G}_S$, l'ensemble des **paris simples** sur $A$, est

$$\mathcal{G}_S \equiv \left\{(p_1\circ a_1,\dots,p_n\circ a_n) \ \Big|\ p_i\geq0,\ \sum_{i=1}^n p_i=1\right\}$$

</div>

**Les conventions de notation du livre :**

| Convention | Exemple |
|---|---|
| On **omet** les composantes de probabilité nulle | $(\alpha\circ a_1,\ 0\circ a_2,\dots,(1-\alpha)\circ a_n)$ s'écrit $(\alpha\circ a_1,\ (1-\alpha)\circ a_n)$ |
| On écrit $a_i$ pour $(1\circ a_i)$ | le pari dégénéré donnant $a_i$ avec certitude |

> **Notez que $A \subset \mathcal{G}_S$.** *« Pour chaque $i$, $(1\circ a_i)$, le pari donnant $a_i$ avec probabilité un, est dans $\mathcal{G}_S$. »* Les résultats certains sont donc des paris comme les autres — c'est ce qui permet de comparer « le certain » et « l'aléatoire » dans un même cadre.

### 1.4 Les paris composés

> *« Bien sûr, tous les paris ne sont pas simples. Par exemple, il est assez courant que les loteries d'État donnent comme lots des **billets pour la loterie suivante** ! Les paris dont les lots sont eux-mêmes des paris sont appelés **paris composés**. »*

**La restriction que pose le livre — et pourquoi.**

> *« Notez qu'il n'y a **pas de limite au niveau de composition** qu'un pari composé pourrait impliquer. En effet, l'exemple de la loterie d'État est un cas extrême particulièrement pertinent. Parce que chaque billet pourrait donner un autre billet comme lot, **chaque billet implique une infinité de niveaux de composition**. »*

> *« **Pour simplifier seulement**, nous exclurons les paris composés à couches infinies comme la loterie d'État. Les paris composés que nous considérerons doivent résulter en un résultat de $A$ **après un nombre fini de randomisations**. »*

**La structure générale.** $\mathcal{G}$ désigne l'ensemble de **tous** les paris, simples et composés. Tout $g\in\mathcal{G}$ s'écrit

$$g=(p_1\circ g_1,\dots,p_k\circ g_k)$$

pour un certain $k\geq1$ et des paris $g_i\in\mathcal{G}$ — qui peuvent être composés, simples, ou des résultats.

<details class="details--riche">
<summary>

**La construction formelle de $\mathcal{G}$ (note 2 du livre)**

</summary>

Le livre donne en note la définition rigoureuse, par récurrence sur le niveau de composition :

$$\mathcal{G}_0 = A$$

et pour chaque $j=1,2,\dots$ :

$$\mathcal{G}_j = \left\{(p_1\circ g_1,\dots,p_k\circ g_k) \ \Big|\ k\geq1;\ p_i\geq0 \text{ et } g_i\in\mathcal{G}_{j-1} \ \forall i;\ \sum_{i=1}^k p_i=1\right\}$$

$$\boxed{\;\mathcal{G}=\bigcup_{j=0}^{\infty}\mathcal{G}_j\;}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que la construction encode.</span>

$\mathcal{G}_j$ contient les paris de **profondeur au plus $j$**. L'union porte sur tous les $j$ **finis** : un pari de $\mathcal{G}$ a donc une profondeur finie, même si cette profondeur peut être arbitrairement grande. C'est exactement la restriction annoncée dans le texte — on exclut la loterie d'État à profondeur infinie.

⚠️ **Ne pas confondre « profondeur non bornée » et « profondeur infinie ».** L'union $\bigcup_j \mathcal{G}_j$ contient des paris de profondeur $1, 2, 3, \dots$ sans limite supérieure ; elle ne contient **aucun** pari de profondeur infinie.

</div>

</details>

### 1.5 Les probabilités effectives — le calcul du livre

C'est le concept qui portera l'axiome G6. Le livre le construit sur un exemple à deux résultats.

**La situation.** $A=\{a_1,a_2\}$. Un pari composé donne : — le résultat $a_1$ avec probabilité $\alpha$ ; — un **billet de loterie** avec probabilité $1-\alpha$, ce billet donnant $a_1$ avec probabilité $\beta$ et $a_2$ avec probabilité $1-\beta$.

**Le calcul.**

> *« $a_1$ peut résulter de **deux manières mutuellement exclusives** : comme résultat immédiat du pari composé, ou comme résultat du billet de loterie. La probabilité de la première est clairement $\alpha$. La probabilité de la seconde est $(1-\alpha)\beta$, parce que pour obtenir $a_1$ via le billet, $a_1$ **ne doit pas** avoir été le résultat immédiat **et** doit avoir été le résultat du billet. »*

$$\boxed{\;\Pr(a_1)=\alpha+(1-\alpha)\beta \qquad\qquad \Pr(a_2)=(1-\alpha)(1-\beta)\;}$$

**Le vocabulaire.** Pour tout $g\in\mathcal{G}$, si $p_i$ est la probabilité effective assignée à $a_i$ par $g$, on dit que $g$ **induit** le pari simple $(p_1\circ a_1,\dots,p_n\circ a_n)\in\mathcal{G}_S$.

> *« Nous soulignons que **chaque $g\in\mathcal{G}$ induit un pari simple unique**. »*

## 🔴 Concept 2 — Les six axiomes du choix dans l'incertain

### 2.1 G1 et G2 — sans surprise

> **AXIOME G1 : Complétude.** Pour deux paris quelconques $g$ et $g'$ de $\mathcal{G}$, soit $g\succsim g'$, soit $g'\succsim g$.

> **AXIOME G2 : Transitivité.** Pour trois paris quelconques $g$, $g'$, $g''$ de $\mathcal{G}$, si $g\succsim g'$ et $g'\succsim g''$, alors $g\succsim g''$.

> *« Parce que chaque $a_i$ de $A$ est représenté dans $\mathcal{G}$ comme un pari dégénéré, les axiomes G1 et G2 impliquent en particulier que les éléments (en nombre fini) de $A$ sont **ordonnés** par $\succsim$. (Voir exercice 2.16.) »*

**La convention d'indexation, posée une fois pour toutes :**

$$\boxed{\;a_1 \succsim a_2 \succsim \dots \succsim a_n\;}$$

$a_1$ est donc **le meilleur** résultat et $a_n$ **le pire**. Toute la construction qui suit repose sur cette indexation.

### 2.2 G3 — la continuité

**La motivation du livre.** Il semble plausible qu'aucun pari ne soit meilleur que $a_1$ avec certitude, ni pire que $a_n$ avec certitude. Donc, pour tout pari $g$ :

$$(\alpha\circ a_1,\ (1-\alpha)\circ a_n) \succsim g \ \text{ quand } \alpha=1 \qquad\text{et}\qquad g \succsim (\alpha\circ a_1,\ (1-\alpha)\circ a_n) \ \text{ quand } \alpha=0.$$

> *« L'axiome suivant dit que si l'indifférence ne tient à aucun des deux extrêmes, alors elle doit tenir pour une valeur **intermédiaire** de $\alpha$. »*

> **AXIOME G3 : Continuité.** Pour tout pari $g$ de $\mathcal{G}$, il existe une probabilité $\alpha\in[0,1]$ telle que
>
> $$g \sim (\alpha\circ a_1,\ (1-\alpha)\circ a_n).$$

**La discussion du livre — à connaître, c'est la question type.**

> *« L'axiome G3 a des implications qui, au premier abord, pourraient sembler **déraisonnables**. Par exemple, supposons que $A=\{1000\,\$,\ 10\,\$,\ \text{« mort »}\}$. Pour la plupart d'entre nous, ces résultats sont strictement ordonnés ainsi : $1000\,\$ \succ 10\,\$ \succ \text{« mort »}$. Considérons maintenant le pari donnant $10\,\$$ avec certitude. Selon G3, il doit exister une probabilité $\alpha$ rendant le pari $(\alpha\circ 1000\,\$,\ (1-\alpha)\circ\text{« mort »})$ **aussi attractif** que $10\,\$$. »*

**La défense du livre :**

> *« L'axiome G3 est-il alors une restriction indûment forte ? **Ne soyez pas trop rapide à conclure.** Si vous traverseriez la ville en voiture pour toucher $1000\,\$$ — une action impliquant une probabilité positive, si minuscule soit-elle, de mort — plutôt que d'accepter un paiement de $10\,\$$ pour rester chez vous, **vous déclareriez votre préférence pour le pari plutôt que pour la petite somme certaine**. Vraisemblablement, nous pourrions augmenter la probabilité d'un accident fatal jusqu'à ce que vous soyez juste indifférent entre les deux choix. Quand c'est le cas, nous aurons trouvé la **probabilité d'indifférence** dont G3 suppose l'existence. »*

> ⚠️ **L'argument est important méthodologiquement.** Il ne dit pas que la mort est « échangeable contre de l'argent » ; il dit que **tout comportement quotidien impliquant un risque minuscule révèle déjà une telle probabilité d'indifférence**. Refuser G3, c'est affirmer qu'on ne prendrait **jamais** le moindre risque pour le moindre gain — ce que personne ne fait.

### 2.3 G4 — la monotonicité

> **AXIOME G4 : Monotonicité.** Pour toutes probabilités $\alpha,\beta\in[0,1]$,
>
> $$(\alpha\circ a_1,\ (1-\alpha)\circ a_n) \succsim (\beta\circ a_1,\ (1-\beta)\circ a_n) \qquad\textbf{si et seulement si}\qquad \alpha\geq\beta.$$

> *« L'axiome exprime l'idée que si deux paris simples ne peuvent chacun donner que le meilleur et le pire résultat, alors **celui qui donne le meilleur résultat avec la probabilité la plus élevée est préféré**. »*

**Une conséquence importante.** *« Notez que la monotonicité implique $a_1\succ a_n$, et exclut donc le cas où le décideur est indifférent entre tous les résultats de $A$. »*

**Le contre-exemple du livre :**

> *« Bien que la plupart des gens préfèrent habituellement les paris donnant une probabilité plus élevée aux meilleurs résultats, il n'en va pas toujours ainsi. Par exemple, pour un **chasseur en safari**, la mort peut être le pire résultat d'une sortie, et pourtant **la possibilité de la mort ajoute à l'excitation** de l'aventure. Une sortie avec une petite probabilité de mort serait alors préférée à une sortie avec probabilité nulle — une violation claire de la monotonicité. »*

> ⚠️ **G4 est un « si et seulement si ».** Le sens $\Leftarrow$ dit que plus de chance sur le meilleur résultat est meilleur ; le sens $\Rightarrow$ dit que **seule** la probabilité compte pour classer ces paris-là. C'est ce second sens qui donnera l'**unicité** du nombre $u(g)$ dans la preuve du théorème 2.7.

### 2.4 G5 — la substitution

> **AXIOME G5 : Substitution.** Si $g=(p_1\circ g_1,\dots,p_k\circ g_k)$ et $h=(p_1\circ h_1,\dots,p_k\circ h_k)$ sont dans $\mathcal{G}$, et si $h_i\sim g_i$ pour **chaque** $i$, alors $h\sim g$.

> *« L'axiome exprime l'idée que le décideur est indifférent entre un pari et un autre s'il est **indifférent entre leurs réalisations**, et que leurs réalisations se produisent **avec les mêmes probabilités**. »*

**Une conséquence, dérivée par le livre :**

> *« Avec G1, l'axiome G5 implique que quand l'agent est indifférent entre deux paris, il doit être indifférent entre **toutes leurs combinaisons convexes**. C'est-à-dire, si $g\sim h$, alors — parce que par G1 $g\sim g$ — l'axiome G5 implique »*

$$(\alpha\circ g,\ (1-\alpha)\circ h) \sim (\alpha\circ g,\ (1-\alpha)\circ g) = g$$

### 2.5 G6 — la réduction aux paris simples

> **AXIOME G6 : Réduction aux paris simples.** Pour tout pari $g\in\mathcal{G}$, si $(p_1\circ a_1,\dots,p_n\circ a_n)$ est le pari simple **induit** par $g$, alors
>
> $$(p_1\circ a_1,\dots,p_n\circ a_n) \sim g.$$

> *« Notre dernier axiome dit que, quand il considère un pari particulier, le décideur **ne se soucie que des probabilités effectives** que ce pari assigne à chaque résultat de $A$. »*

**Une conséquence structurelle :**

> *« Notez que par G6 (et la transitivité G2), les préférences d'un individu sur **tous** les paris — composés ou non — sont **complètement déterminées par ses préférences sur les paris simples**. »*

**La limite que le livre reconnaît :**

> *« Aussi plausible que G6 puisse paraître, il **restreint le domaine de notre analyse**. En particulier, ce ne serait pas une hypothèse appropriée si l'on souhaitait modéliser le comportement des **vacanciers à Las Vegas**. Ils ne seraient probablement pas indifférents entre jouer aux machines à sous de nombreuses fois pendant leur séjour et prendre le **pari unique une fois pour toutes** défini par les probabilités effectives sur gains et pertes. En revanche, beaucoup de décisions dans l'incertain sont entreprises **en dehors de Las Vegas**, et pour beaucoup d'entre elles G6 est raisonnable. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que G6 exclut exactement.</span>

⚠️ Toute valeur attachée au **processus** de la randomisation lui-même — le plaisir de jouer, le suspense, le rituel. G6 dit que seule la **distribution finale** compte. C'est la version « incertitude » du principe de conséquentialisme.

**La note 3 du livre :** *« Dans certains traitements, les axiomes G5 et G6 sont combinés en un seul axiome d'"**indépendance**". (Voir exercice 2.20.) »*

</div>

### 2.6 Le tableau de synthèse des six axiomes

| Axiome | Nom | Ce qu'il dit | Ce qu'il interdit |
|---|---|---|---|
| **G1** | Complétude | tout couple est comparable | l'incomparabilité |
| **G2** | Transitivité | $g\succsim g'\succsim g''\Rightarrow g\succsim g''$ | les cycles |
| **G3** | Continuité | $\exists\alpha$ : $g\sim(\alpha\circ a_1,(1-\alpha)\circ a_n)$ | les résultats « infiniment » mauvais ou bons |
| **G4** | Monotonicité | plus de chance sur $a_1$ ⟺ meilleur | le goût du risque **pour lui-même** (safari) |
| **G5** | Substitution | réalisations indifférentes ⟹ paris indifférents | que le « nom » du lot compte |
| **G6** | Réduction | seules comptent les probabilités **effectives** | le plaisir du **processus** (Las Vegas) |

> ⚠️ **G1 est redondant — et le livre le dit après coup.**
>
> *« Le lecteur attentif aura peut-être remarqué que l'axiome G1 **n'a pas été invoqué** dans le processus de démonstration du théorème 2.7. En effet, **il est redondant** étant donné les autres axiomes. Dans l'exercice 2.22, on vous demande de montrer que **G2, G3 et G4 ensemble impliquent G1**. Par conséquent, nous aurions pu procéder sans mentionner explicitement la complétude. En revanche, supposer la transitivité et **pas** la complétude aurait sûrement soulevé des questions inutiles dans l'esprit du lecteur. Pour vous épargner ce genre de stress, nous avons opté pour l'approche présentée ici. »*

## 🔴 Concept 3 — La propriété d'espérance d'utilité et le théorème 2.7

### 3.1 Ce qu'on cherche de plus

> *« Nous savons de notre étude des préférences sous certitude que, ici, les axiomes G1, G2 et une hypothèse de continuité devraient suffire à garantir l'existence d'une fonction continue représentant $\succsim$. En revanche, **nous avons fait des hypothèses en plus** de G1, G2 et de la continuité. On pourrait alors s'attendre à dériver une représentation qui soit **plus que simplement continue**. »*

> *« En effet, nous montrerons que non seulement nous pouvons obtenir une fonction d'utilité continue représentant $\succsim$ sur $\mathcal{G}$, mais que nous pouvons en obtenir une qui est **linéaire dans les probabilités effectives** sur les résultats. »*

### 3.2 La définition

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 2.3 — Expected Utility Property.</span>

La fonction $u:\mathcal{G}\to\mathbb{R}$ possède la **propriété d'espérance d'utilité** si, pour tout $g\in\mathcal{G}$,

$$\boxed{\;u(g)=\sum_{i=1}^n p_i\,u(a_i)\;}$$

où $(p_1\circ a_1,\dots,p_n\circ a_n)$ est le pari simple **induit** par $g$.

</div>

> *« Ainsi, dire que $u$ a la propriété d'espérance d'utilité, c'est dire qu'elle **assigne à chaque pari l'espérance des utilités qui pourraient en résulter**, chaque utilité possible étant affectée de sa probabilité effective. »*

**La conséquence décisive.**

> *« La fonction $u$ est **complètement déterminée sur tout $\mathcal{G}$ par les valeurs qu'elle prend sur l'ensemble fini des résultats $A$**. »*

$$\boxed{\;n \text{ nombres } u(a_1),\dots,u(a_n) \ \Longrightarrow\ \text{le classement de TOUS les paris de } \mathcal{G}\;}$$

**Le vocabulaire.**

> *« Si les préférences d'un individu sont représentées par une fonction d'utilité ayant la propriété d'espérance d'utilité, et si cette personne choisit toujours l'alternative qu'elle préfère, alors elle choisira un pari plutôt qu'un autre **si et seulement si l'espérance d'utilité de l'un dépasse celle de l'autre**. Un tel individu est un **maximisateur d'espérance d'utilité**. »*

> *« Pour garder à l'esprit les distinctions importantes entre les deux, nous appelons **fonctions d'utilité de von Neumann-Morgenstern (VNM)** les fonctions d'utilité possédant la propriété d'espérance d'utilité. »*

> ⚠️ **Ne confondez pas deux « linéarités ».** $u$ est **linéaire dans les probabilités**, pas dans les résultats. $u(a_i)$ peut être n'importe quelle fonction de $a_i$ — concave, convexe, quelconque. C'est cette forme de $u(a_i)$ qui encodera l'attitude face au risque (§6).

### 3.3 Théorème 2.7 — l'existence

> **THEOREM 2.7 — Existence of a VNM Utility Function on $\mathcal{G}$.** Let $\succsim$ over gambles in $\mathcal{G}$ satisfy axioms G1 to G6. Then there exists a utility function $u:\mathcal{G}\to\mathbb{R}$ representing $\succsim$ on $\mathcal{G}$, such that $u$ has the **expected utility property**.

### 3.4 La preuve — à savoir refaire

> *« Comme dans notre preuve de l'existence d'une fonction d'utilité au chapitre 1, la preuve ici sera **constructive**. »*

**La construction.** Pour un pari arbitraire $g\in\mathcal{G}$, définir $u(g)$ comme le nombre satisfaisant

$$\boxed{\;g \sim \big(u(g)\circ a_1,\ (1-u(g))\circ a_n\big)\;}$$

| Point | Justification |
|---|---|
| un tel nombre **existe** | axiome **G3** (continuité) |
| il est **unique** | axiome **G4** (monotonicité) — exercice 2.19 |
| $u(g)\in[0,1]$ pour tout $g$ | par définition (c'est une probabilité) |

> **La lecture de la construction.** $u(g)$ est la **probabilité d'indifférence** : la chance sur le meilleur résultat qui, dans un pari « meilleur-pire », rend le décideur indifférent à $g$. C'est un nombre **révélé par les préférences elles-mêmes**, pas un choix arbitraire de l'analyste.
>
> **C'est exactement le même schéma qu'au théorème 1.1** (fiche 500), où l'on posait $u(x)\,e\sim x$ : on projette l'objet à évaluer sur une **famille à un paramètre** et on lit le paramètre.

**Étape 1 — $u$ représente $\succsim$.** Soient $g,g'\in\mathcal{G}$. La chaîne d'équivalences :

$$g \succsim g' \tag{P.1}$$

$$\iff \big(u(g)\circ a_1,\ (1-u(g))\circ a_n\big) \succsim \big(u(g')\circ a_1,\ (1-u(g'))\circ a_n\big) \tag{P.2}$$

$$\iff u(g)\geq u(g') \tag{P.3}$$

| Passage | Justification |
|---|---|
| (P.1) ⟺ (P.2) | **transitivité** de $\succsim$, plus $g\sim(\cdots)$ et $g'\sim(\cdots)$ par définition de $u$ |
| (P.2) ⟺ (P.3) | directement la **monotonicité** (G4) |

Donc $g\succsim g'$ si et seulement si $u(g)\geq u(g')$ : $u$ **représente** $\succsim$.

**Étape 2 — $u$ a la propriété d'espérance d'utilité.** Soit $g\in\mathcal{G}$ et $g_s\equiv(p_1\circ a_1,\dots,p_n\circ a_n)$ le pari simple qu'il induit.

Par **G6**, $g\sim g_s$, et comme $u$ représente $\succsim$, $u(g)=u(g_s)$. Il suffit donc de montrer

$$u(g_s)=\sum_{i=1}^n p_i\,u(a_i) \tag{P.4}$$

**Le pari auxiliaire.** Pour chaque $i$, par définition de $u(a_i)$ :

$$a_i \sim \underbrace{\big(u(a_i)\circ a_1,\ (1-u(a_i))\circ a_n\big)}_{\textstyle \equiv\ q_i} \tag{P.5}$$

Comme $q_i\sim a_i$ pour tout $i$, l'axiome de **substitution G5** donne

$$g' \equiv (p_1\circ q_1,\dots,p_n\circ q_n) \ \sim\ (p_1\circ a_1,\dots,p_n\circ a_n)=g_s \tag{P.6}$$

**Le calcul des probabilités effectives de $g'$.**

> *« Chaque $q_i$ ne peut donner que $a_1$ ou $a_n$, donc $g'$ ne peut donner que ces deux résultats. Quelle est la probabilité effective que $g'$ assigne à $a_1$ ? $a_1$ résulte si, pour un certain $i$, $q_i$ se produit (probabilité $p_i$) **et** $a_1$ est le résultat de $q_i$ (probabilité $u(a_i)$). Pour chaque $i$, il y a donc une probabilité $p_i\,u(a_i)$ que $a_1$ résulte. Comme les occurrences des $q_i$ sont **mutuellement exclusives**, la probabilité effective de $a_1$ est la somme $\sum_i p_i u(a_i)$. »*

Et symétriquement, celle de $a_n$ vaut $\sum_i p_i\big(1-u(a_i)\big)=1-\sum_i p_i u(a_i)$, puisque les $p_i$ somment à 1.

Le pari simple induit par $g'$ est donc

$$g'_s \equiv \left(\Big(\sum_i p_iu(a_i)\Big)\circ a_1,\ \Big(1-\sum_i p_iu(a_i)\Big)\circ a_n\right)$$

**La conclusion.** Par **G6**, $g'\sim g'_s$ ; par la **transitivité de $\sim$** et (P.6) :

$$g_s \sim \left(\Big(\sum_i p_iu(a_i)\Big)\circ a_1,\ \Big(1-\sum_i p_iu(a_i)\Big)\circ a_n\right) \tag{P.7}$$

Mais par définition (et l'**unicité** de l'exercice 2.19), $u(g_s)$ est **l'unique** nombre satisfaisant

$$g_s\sim\big(u(g_s)\circ a_1,\ (1-u(g_s))\circ a_n\big) \tag{P.8}$$

En comparant (P.7) et (P.8) : $u(g_s)=\sum_i p_i u(a_i)$. $\blacksquare$

> **Où chaque axiome sert — la question type.**
>
> | Axiome | Rôle exact |
> |---|---|
> | **G2** transitivité | chaînage (P.1)⟺(P.2) et transitivité de $\sim$ en (P.7) |
> | **G3** continuité | **existence** du nombre $u(g)$ |
> | **G4** monotonicité | **unicité** de $u(g)$, et le passage (P.2)⟺(P.3) |
> | **G5** substitution | remplacer chaque $a_i$ par $q_i$ en (P.6) |
> | **G6** réduction | $g\sim g_s$ et $g'\sim g'_s$ — deux fois |
> | **G1** complétude | **jamais utilisé** (il est redondant) |
>
> ⚠️ **L'unicité (G4) est le pivot de l'étape 2.** Sans elle, (P.7) et (P.8) donneraient deux nombres différents et l'identification échouerait. C'est pourquoi G4 est un « si et seulement si ».

### 3.5 Ce que le théorème autorise en pratique

> *« La preuve du théorème 2.7 n'établit pas seulement l'existence : elle nous montre aussi **les étapes à suivre pour construire une telle fonction en pratique**. Pour déterminer l'utilité d'un résultat $a_i$, il suffit de **demander à l'individu la probabilité du meilleur résultat qui le rendrait indifférent** entre un pari meilleur-pire $(\alpha\circ a_1,(1-\alpha)\circ a_n)$ et le résultat $a_i$ avec certitude. En répétant ce processus pour chaque $a_i\in A$, on peut alors calculer l'utilité de **n'importe quel** pari $g\in\mathcal{G}$ comme simplement l'espérance d'utilité qu'il engendre. »*

$$\boxed{\;n \text{ questions posées à l'individu} \ \Longrightarrow \ \text{le classement de tous les paris}\;}$$

### 3.6 Exemple 2.4 — la construction sur trois résultats

**Le cadre.** $A=\{10\,000\,\$,\ 4\,000\,\$,\ -2\,000\,\$\}$ *(le livre écrit $\{\$10,\ \$4,\ -\$2\}$ « où chacun représente des milliers de dollars »)*. Le meilleur est $10$, le pire est $-2$.

**Les trois questions.** *« Quelle probabilité pour le meilleur résultat vous rendrait indifférent entre le pari meilleur-pire que nous avons composé et le résultat $a_i$ avec certitude ? »*

| Réponse | Utilité assignée |
|---|---|
| $10 \sim (1\circ 10,\ 0\circ -2)$ | $u(10)\equiv 1$ (E.1) |
| $4 \sim (0{,}6\circ 10,\ 0{,}4\circ -2)$ | $u(4)\equiv 0{,}6$ (E.2) |
| $-2 \sim (0\circ 10,\ 1\circ -2)$ | $u(-2)\equiv 0$ (E.3) |

> *« Notez soigneusement que sous cette application, **l'utilité du meilleur résultat vaut toujours 1 et celle du pire toujours 0**. Cependant, l'utilité assignée aux résultats intermédiaires, comme $4$ ici, dépendra de **l'attitude de l'individu envers le risque**. »*

**Le classement de deux paris.**

$$g_1\equiv(0{,}2\circ 4,\ 0{,}8\circ 10) \qquad\qquad g_2\equiv(0{,}07\circ -2,\ 0{,}03\circ 4,\ 0{,}9\circ 10)$$

$$u(g_1)=0{,}2\times0{,}6+0{,}8\times1=\mathbf{0{,}92}$$

$$u(g_2)=0{,}07\times0+0{,}03\times0{,}6+0{,}9\times1=\mathbf{0{,}918}$$

**$g_1$ est préféré.** *« En pareille façon, en n'utilisant que les nombres d'utilité de (E.1) à (E.3), nous pouvons classer **n'importe lequel de l'infinité de paris** qui pourraient être construits à partir des trois résultats de $A$. »*

<details class="details--riche">
<summary>

**Ce que l'exemple 2.4 révèle sur l'aversion au risque — l'analyse du livre**

</summary>

Le livre poursuit l'exemple pour en tirer une lecture qualitative.

**Première observation — la réponse (E.2).** Le pari meilleur-pire offert en (E.2) a pour **espérance de valeur**

$$E(g)=0{,}6\times10+0{,}4\times(-2)=\mathbf{5{,}2}$$

> *« Ceci **dépasse** la valeur espérée $4$ qu'il obtient sous le pari simple offrant $4$ avec certitude, et pourtant **l'individu est indifférent** entre ces deux paris. »*

**La conséquence.** Par monotonicité, il **préfère strictement** $4$ avec certitude à **tout** pari meilleur-pire offrant le meilleur résultat avec probabilité inférieure à $0{,}6$.

> *« Cela inclut bien sûr celui offrant $10$ et $-2$ à probabilités égales de $0{,}5$, **même si ce pari et $4$ avec certitude ont la même valeur espérée de $4$**. Ainsi, en un certain sens, cet individu **préfère éviter le risque**. »*

**Seconde observation — le classement de $g_1$ et $g_2$.**

$$E(g_1)=0{,}2\times4+0{,}8\times10=\mathbf{8{,}80} \qquad E(g_2)=0{,}07\times(-2)+0{,}03\times4+0{,}9\times10=\mathbf{8{,}98}$$

> *« Il préfère $g_1$ à $g_2$, **même si la valeur espérée du premier est inférieure** à celle du second. Ici, $g_2$ est évité parce que, contrairement à $g_1$, **il inclut trop de risque du pire résultat**. »*

> **La leçon.** *« Une fonction d'utilité VNM **résume des aspects importants de la volonté d'un individu de prendre des risques**. »* Le nombre $u(4)=0{,}6$ n'est pas arbitraire : il **encode** l'aversion au risque de cet individu. Un individu neutre au risque aurait répondu
>
> $$u(4)=\frac{4-(-2)}{10-(-2)}=\frac{6}{12}=0{,}5,$$
>
> et un individu aimant le risque aurait répondu **moins** de $0{,}5$.
>
> ⚠️ **Le repère à retenir.** Sur l'échelle normalisée $u(a_1)=1$, $u(a_n)=0$ : — $u(a_i) >$ la valeur interpolée linéairement ⟹ **aversion** au risque ; — $u(a_i) =$ la valeur interpolée ⟹ **neutralité** ; — $u(a_i) <$ la valeur interpolée ⟹ **goût** du risque. C'est la concavité de $u$ lue sur trois points, avant même d'avoir dérivé quoi que ce soit.

</details>

## 🔴 Concept 4 — Théorème 2.8 : l'unicité à transformation affine positive près

### 4.1 Pourquoi l'utilité VNM n'est pas purement ordinale

> *« Dans le cas de la théorie du consommateur, **les nombres d'utilité eux-mêmes n'ont qu'un sens ordinal**. Toute transformation strictement monotone d'une représentation en donne une autre. En revanche, **les nombres d'utilité associés à une représentation VNM ont un contenu au-delà de l'ordinalité**. »*

**La démonstration du livre.** Soit $A=\{a,b,c\}$ avec $a\succ b\succ c$, et $\succsim$ satisfaisant G1 à G6. Par G3 et G4, il existe un **unique** $\alpha\in(0,1)$ tel que

$$b\sim(\alpha\circ a,\ (1-\alpha)\circ c)$$

> *« Notez bien que **le nombre $\alpha$ est déterminé par, et reflète, les préférences du décideur. C'est un nombre significatif.** On ne peut ni le doubler, ni lui ajouter une constante, ni le transformer d'aucune façon sans changer aussi les préférences auxquelles il est associé. »*

Si $u$ est une représentation VNM de $\succsim$, l'indifférence donne

$$u(b)=u(\alpha\circ a,\ (1-\alpha)\circ c)=\alpha\,u(a)+(1-\alpha)\,u(c)$$

*(la seconde égalité par la propriété d'espérance d'utilité)*. En réarrangeant :

$$\boxed{\;\frac{u(a)-u(b)}{u(b)-u(c)}=\frac{1-\alpha}{\alpha}\;}$$

> *« Le **ratio des différences** entre ces nombres d'utilité est **uniquement déterminé par $\alpha$**. Mais parce que $\alpha$ était lui-même uniquement déterminé par les préférences du décideur, ce ratio de différences d'utilité l'est aussi. »*

> *« Nous concluons que **le ratio des différences d'utilité a un sens intrinsèque** concernant les préférences de l'individu, et qu'il doit prendre la **même valeur pour toute représentation VNM** de $\succsim$. Donc les représentations VNM fournissent **nettement plus qu'une information ordinale**. »*

### 4.2 L'énoncé

> **THEOREM 2.8 — VNM Utility Functions are Unique up to Positive Affine Transformations.** Suppose that the VNM utility function $u(\cdot)$ represents $\succsim$. Then the VNM utility function $v(\cdot)$ represents those same preferences **if and only if** for some scalar $\alpha$ and some scalar $\beta>0$,
>
> $$\boxed{\;v(g)=\alpha+\beta\,u(g) \qquad \text{pour tout pari } g.\;}$$

### 4.3 La preuve de la nécessité

*(Le livre note : « la suffisance est évidente (mais convainquez-vous en), donc nous ne prouvons ici que la nécessité ». Il suppose de plus $g$ simple, laissant l'extension en exercice.)*

Soit $A=\{a_1,\dots,a_n\}$ avec $a_1\succsim\dots\succsim a_n$ et $a_1\succ a_n$.

**Pas 1 — les probabilités d'indifférence.** Comme $u$ représente $\succsim$ : $u(a_1)\geq\dots\geq u(a_n)$ avec $u(a_1)>u(a_n)$. Donc pour chaque $i$ il existe un **unique** $\alpha_i\in[0,1]$ tel que

$$u(a_i)=\alpha_i\,u(a_1)+(1-\alpha_i)\,u(a_n) \tag{P.1}$$

*(avec $\alpha_i>0$ si et seulement si $a_i\succ a_n$.)*

**Pas 2 — traduire en préférence.** Comme $u$ a la propriété d'espérance d'utilité, (P.1) s'écrit $u(a_i)=u\big(\alpha_i\circ a_1,(1-\alpha_i)\circ a_n\big)$, ce qui — $u$ représentant $\succsim$ — signifie

$$a_i\sim\big(\alpha_i\circ a_1,\ (1-\alpha_i)\circ a_n\big) \tag{P.2}$$

> **Le pivot de la preuve est ici.** (P.2) est un énoncé sur les **préférences**, donc **indépendant de la représentation choisie**. C'est lui qui va transporter l'information de $u$ vers $v$.

**Pas 3 — appliquer $v$.** Comme $v$ représente aussi $\succsim$, (P.2) donne $v(a_i)=v\big(\alpha_i\circ a_1,(1-\alpha_i)\circ a_n\big)$, et comme $v$ a aussi la propriété d'espérance d'utilité :

$$v(a_i)=\alpha_i\,v(a_1)+(1-\alpha_i)\,v(a_n) \tag{P.3}$$

**Pas 4 — égaler les ratios.** (P.1) et (P.3) donnent, pour tout $i$ tel que $a_i\succ a_n$ :

$$\frac{u(a_1)-u(a_i)}{u(a_i)-u(a_n)}=\frac{1-\alpha_i}{\alpha_i}=\frac{v(a_1)-v(a_i)}{v(a_i)-v(a_n)} \tag{P.4}$$

d'où, en multipliant en croix :

$$\big(u(a_1)-u(a_i)\big)\big(v(a_i)-v(a_n)\big)=\big(v(a_1)-v(a_i)\big)\big(u(a_i)-u(a_n)\big) \tag{P.5}$$

> *« Cependant, (P.5) tient **même quand $a_i\sim a_n$**, parce que dans ce cas $u(a_i)=u(a_n)$ et $v(a_i)=v(a_n)$ [les deux membres sont nuls]. Donc (P.5) tient **pour tout $i$**. »*

**Pas 5 — identifier $\alpha$ et $\beta$.** En réarrangeant (P.5) :

$$v(a_i)=\alpha+\beta\,u(a_i), \qquad i=1,\dots,n \tag{P.6}$$

avec

$$\alpha\equiv\frac{u(a_1)v(a_n)-v(a_1)u(a_n)}{u(a_1)-u(a_n)} \qquad\qquad \beta\equiv\frac{v(a_1)-v(a_n)}{u(a_1)-u(a_n)}$$

> *« Notez que $\alpha$ et $\beta$ sont tous deux des **constantes** (indépendantes de $i$), et que $\beta$ est **strictement positif**. »*

**Pas 6 — étendre à tous les paris.** Pour un pari $g$ induisant $(p_1\circ a_1,\dots,p_n\circ a_n)$ :

$$v(g)=\sum_i p_iv(a_i)=\sum_i p_i\big(\alpha+\beta u(a_i)\big)=\alpha+\beta\sum_i p_iu(a_i)=\alpha+\beta\,u(g) \qquad\blacksquare$$

*(La première et la dernière égalité par la propriété d'espérance d'utilité ; la deuxième par (P.6).)*

### 4.4 Ce que le théorème 2.8 permet et interdit

> *« Le théorème 2.8 nous dit que les fonctions d'utilité VNM ne sont **ni complètement uniques, ni entièrement ordinales**. Nous pouvons encore en trouver une infinité qui classeront les paris exactement dans le même ordre **et** posséderont la propriété d'espérance d'utilité. Mais, contrairement aux fonctions d'utilité ordinaires dont nous n'exigions qu'un redimensionnement préservant l'ordre, ici nous devons **nous limiter aux transformations qui multiplient par un nombre positif et/ou ajoutent une constante**. »*

> *« Pourtant, l'ordinalité incomplète de la fonction VNM ne doit pas nous tenter d'attacher une signification indue au **niveau absolu** de l'utilité d'un pari, ou à la **différence** d'utilité entre un pari et un autre. […] nous ne pouvons toujours **ni faire des comparaisons interpersonnelles de bien-être, ni mesurer l'"intensité"** avec laquelle un pari est préféré à un autre. »*

> **Le tableau de ce qui est invariant, à mémoriser.**
>
> | Objet | Invariant par $v=\alpha+\beta u$, $\beta>0$ ? |
> |---|---|
> | l'**ordre** des paris | oui |
> | les **ratios de différences** $\dfrac{u(a)-u(b)}{u(b)-u(c)}$ | oui |
> | la mesure d'**Arrow-Pratt** $-u''/u'$ (§7) | oui |
> | le **niveau** $u(g)$ | non |
> | la **différence** $u(g)-u(g')$ | non |
> | la dérivée seconde $u''$ seule | non |
> | les comparaisons **entre individus** | non |
>
> ⚠️ **La conséquence la plus fréquemment oubliée :** *« Clairement, une transformation strictement croissante d'une représentation VNM **peut ne pas donner une autre représentation VNM**. (Bien sûr, elle donne encore une représentation d'utilité, mais celle-ci n'a pas besoin d'avoir la propriété d'espérance d'utilité.) »*
>
> Prendre $\ln u$ ou $u^3$ d'une utilité VNM **détruit** la propriété d'espérance d'utilité — alors que c'était parfaitement licite au chapitre 1.

## 🔴 Concept 5 — L'aversion au risque (§2.4.3)

### 5.1 Le cadre restreint

> *« Nous confinerons notre attention aux paris dont les résultats consistent en **différents montants de richesse**. De plus, il sera utile de prendre comme ensemble de résultats $A$ **tous les niveaux de richesse non négatifs** : $A=\mathbb{R}_+$. »*

Trois précisions du livre :

| Point | Contenu |
|---|---|
| $A$ est désormais **infini** | mais *« nous continuons à considérer des paris ne donnant qu'un nombre **fini** de résultats de probabilité effective strictement positive »* |
| forme d'un pari simple | $(p_1\circ w_1,\dots,p_n\circ w_n)$, $w_i\geq0$, $\sum p_i=1$ |
| hypothèse technique | $u(\cdot)$ est **différentiable** avec $u'(w)>0$ pour tout $w$ |

> **La note 6 du livre :** *« Dans ce cadre, il est possible de prouver un théorème d'espérance d'utilité analogue au théorème 2.7 en modifiant convenablement les axiomes pour tenir compte du fait que $A$ n'est plus un ensemble fini. »*

### 5.2 Les deux quantités à comparer

Pour un pari simple $g$ donnant $w_i$ avec probabilité $p_i$, la **valeur espérée** est $E(g)=\sum_i p_iw_i$. On compare :

$$u(g)=\sum_{i=1}^n p_i\,u(w_i) \qquad\qquad u\big(E(g)\big)=u\left(\sum_{i=1}^n p_iw_i\right)$$

| Quantité | Ce qu'elle est |
|---|---|
| $u(g)$ | l'utilité VNM **du pari** |
| $u\big(E(g)\big)$ | l'utilité VNM de **la valeur espérée du pari**, reçue avec certitude |

> *« Quand quelqu'un préfère recevoir **la valeur espérée d'un pari avec certitude** plutôt que d'affronter le risque inhérent au pari lui-même, nous disons qu'il est **averse au risque**. »*

### 5.3 La définition

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 2.4 — Risk Aversion, Risk Neutrality, and Risk Loving.</span>

Soit $u(\cdot)$ la fonction VNM d'un individu sur des paris portant sur des niveaux de richesse non négatifs. Alors, pour le pari simple $g=(p_1\circ w_1,\dots,p_n\circ w_n)$, l'individu est dit

1. **averse au risque en $g$** si $u\big(E(g)\big) > u(g)$,
2. **neutre au risque en $g$** si $u\big(E(g)\big) = u(g)$,
3. **aimant le risque en $g$** si $u\big(E(g)\big) < u(g)$.

Si l'individu est, par exemple, averse au risque en **tout** pari simple non dégénéré, il est dit simplement **averse au risque** (ou averse au risque sur $\mathcal{G}$).

</div>

*(Note 7 du livre : « un pari simple est **non dégénéré** s'il assigne une probabilité strictement positive à au moins deux niveaux de richesse distincts ».)*

**Pourquoi il suffit de regarder $u$ sur les paris simples :**

> *« Une fonction VNM sur $\mathcal{G}$ est complètement déterminée par les valeurs qu'elle prend sur $A$. Par conséquent, les caractéristiques de la fonction VNM d'un individu **sur les seuls paris simples** fournissent une description complète de ses préférences sur tous les paris. »*

### 5.4 L'équivalence avec la concavité

> *« Chacune de ces attitudes envers le risque **équivaut à une propriété particulière de la fonction VNM**. Dans les exercices, on vous demande de montrer que l'agent est averse au risque, neutre au risque ou aimant le risque **si et seulement si** sa fonction VNM est respectivement **strictement concave, linéaire ou strictement convexe**. »*

$$\boxed{\begin{array}{lcl} \text{averse au risque} &\iff& u \text{ strictement CONCAVE}\\ \text{neutre au risque} &\iff& u \text{ LINÉAIRE}\\ \text{aimant le risque} &\iff& u \text{ strictement CONVEXE} \end{array}}$$

**L'argument géométrique du livre (Fig. 2.6).** Pour $g\equiv(p\circ w_1,\ (1-p)\circ w_2)$ :

| Objet sur la figure | Coordonnées |
|---|---|
| $R$ | $\big(w_1,\ u(w_1)\big)$ |
| $S$ | $\big(w_2,\ u(w_2)\big)$ |
| $T = pR+(1-p)S$ | abscisse $E(g)$, **ordonnée $u(g)$** |

> *« L'abscisse de $T$ doit être $E(g)$ et son ordonnée $u(g)$. (Convainquez-vous en.) Nous pouvons alors localiser $u(E(g))$ sur l'axe vertical en utilisant le graphe de $u(w)$. La fonction VNM de la Fig. 2.6 a été dessinée **strictement concave**. Comme vous pouvez le voir, $u(E(g))>u(g)$, donc l'individu est averse au risque. »*

> **Le mécanisme, en une phrase.** $u(g)$ est **sur la corde** joignant $R$ à $S$ ; $u(E(g))$ est **sur la courbe**. La concavité place la courbe **au-dessus** de la corde. C'est exactement l'**inégalité de Jensen**.
>
> $$u\left(\sum_i p_iw_i\right) \ \geq\ \sum_i p_iu(w_i) \qquad\text{pour } u \text{ concave}$$
>
> ⚠️ **Attention au sens.** Beaucoup d'étudiants inversent : ce n'est **pas** « le pari vaut plus que sa valeur espérée ». C'est l'inverse — l'averse au risque **préfère l'espérance certaine au pari**.

## 🔴 Concept 6 — Équivalent certain et prime de risque

### 6.1 La définition

> *« Dans la Fig. 2.6, l'individu préfère $E(g)$ avec certitude au pari $g$. Mais il y aura **un certain montant de richesse** qu'on pourrait offrir avec certitude et qui le rendrait **indifférent** entre accepter cette richesse et affronter le pari $g$. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 2.5 — Certainty Equivalent and Risk Premium.</span>

L'**équivalent certain** d'un pari simple $g$ sur des niveaux de richesse est un montant de richesse $CE$, offert avec certitude, tel que

$$u(g)\equiv u(CE).$$

La **prime de risque** est un montant de richesse $P$ tel que

$$u(g)\equiv u\big(E(g)-P\big).$$

Clairement, $P \equiv E(g)-CE$.

</div>

> *« Quand une personne est averse au risque et préfère strictement plus d'argent à moins, il est facile de montrer que **l'équivalent certain est inférieur à la valeur espérée** du pari […]. En effet, **une personne averse au risque "paiera" un montant positif de richesse pour éviter le risque** inhérent au pari. Cette disposition à payer pour éviter le risque est mesurée par la **prime de risque**. »*

$$\boxed{\;CE \ < \ E(g) \qquad\text{et donc}\qquad P = E(g)-CE \ > \ 0 \qquad \text{(agent averse)}\;}$$

> ⚠️ **Les trois quantités sur l'axe des richesses, dans l'ordre (agent averse) :**
>
> $$w_1 \ < \ CE \ < \ E(g) \ < \ w_2$$
>
> ⚠️ La prime $P$ est l'**écart horizontal** entre $CE$ et $E(g)$ sur la figure 2.6.

### 6.2 Exemple 2.5 — le cas logarithmique

**Le cadre.** $u(w)\equiv\ln(w)$ — strictement concave, donc l'individu est **averse au risque**.

Le pari $g$ offre des chances égales de gagner ou perdre un montant $h$ à partir d'une richesse initiale $w_0$ :

$$g\equiv\left(\tfrac12\circ(w_0+h),\ \tfrac12\circ(w_0-h)\right), \qquad E(g)=w_0$$

**L'équivalent certain.**

$$\ln(CE)=\tfrac12\ln(w_0+h)+\tfrac12\ln(w_0-h)=\ln\big[(w_0^2-h^2)^{1/2}\big]$$

$$\boxed{\;CE=\big(w_0^2-h^2\big)^{1/2} \ < \ w_0 = E(g) \qquad\qquad P=w_0-\big(w_0^2-h^2\big)^{1/2} \ > \ 0\;}$$

<details class="details--riche">
<summary>

**Lire l'exemple 2.5 — ce que la formule enseigne**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours).</span>

Le livre s'arrête au calcul ; voici trois lectures qui rendent le résultat mémorable.

</div>

**1. La moyenne géométrique.** Le calcul donne $CE=\sqrt{(w_0+h)(w_0-h)}$ — c'est la **moyenne géométrique** des deux richesses possibles, alors que $E(g)=\dfrac{(w_0+h)+(w_0-h)}{2}$ en est la **moyenne arithmétique**.

$$CE = \text{moyenne géométrique} \ \leq\ \text{moyenne arithmétique} = E(g)$$

L'inégalité arithmético-géométrique **est** ici l'inégalité de Jensen pour $\ln$. C'est la façon la plus rapide de retenir le résultat.

**2. Le comportement de la prime en $h$.**

$$P(h)=w_0-\sqrt{w_0^2-h^2}$$

— $P(0)=0$ : sans risque, pas de prime ; — $P$ est **croissante** en $h$ : plus le pari est risqué, plus on paie pour l'éviter ; — $P(w_0)=w_0$ : si $h=w_0$, le pari peut ruiner complètement ($w_0-h=0$, donc $\ln\to-\infty$) et l'agent paierait **toute sa richesse** pour l'éviter.

**3. L'approximation pour un petit risque.** Pour $h$ petit devant $w_0$ :

$$P \approx w_0\left(1-\sqrt{1-\frac{h^2}{w_0^2}}\right) \approx w_0\cdot\frac{h^2}{2w_0^2}=\frac{h^2}{2w_0}$$

**La prime est proportionnelle au carré du risque et inversement proportionnelle à la richesse.** On peut la réécrire

$$P \approx \tfrac12\,\sigma^2\,R_a(w_0), \qquad\text{où } \sigma^2 = h^2 \text{ est la variance du pari et } R_a(w_0)=\frac1{w_0}$$

*(pour $u=\ln$, $u'=1/w$ et $u''=-1/w^2$, donc $R_a=-u''/u'=1/w$ — voir §7).*

> ⚠️ **Cette formule $P\approx\frac12\sigma^2 R_a(w)$ est l'**approximation d'Arrow-Pratt**. Elle n'est pas énoncée telle quelle par le livre, mais elle explique **pourquoi** $R_a$ est la bonne mesure : c'est exactement le coefficient qui convertit une variance en une prime de risque.

</details>

## 🔴 Concept 7 — La mesure d'Arrow-Pratt

### 7.1 Pourquoi pas $u''$ tout seul

> *« Bien des fois, nous ne voulons pas seulement savoir si quelqu'un est averse au risque, mais aussi **à quel point** il l'est. Idéalement, nous voudrions une mesure résumée permettant à la fois de **comparer le degré d'aversion entre individus** et d'**évaluer comment il varie avec la richesse** pour un même individu. »*

> *« Parce que l'aversion au risque et la concavité sont équivalentes, le candidat apparemment le plus naturel serait la **dérivée seconde** $u''(w)$, mesure de base de la "courbure" d'une fonction. »*

**Mais c'est faux, et le livre dit exactement pourquoi :**

> *« **Mais cela ne conviendra pas.** Bien que le **signe** de la dérivée seconde nous dise si l'individu est averse, aimant ou neutre au risque, sa **taille est entièrement arbitraire**. Le théorème 2.8 a montré que les fonctions VNM sont uniques à transformation affine près. Cela signifie que, pour des préférences données, nous pouvons obtenir **virtuellement n'importe quelle taille de dérivée seconde** que nous souhaitons, en multipliant $u(\cdot)$ par une constante positive convenablement choisie. »*

> **La vérification, en une ligne.** Si $v=\alpha+\beta u$ avec $\beta>0$, alors $v''=\beta u''$. En choisissant $\beta=1000$, on multiplie $|u''|$ par mille **sans changer une seule préférence**. La dérivée seconde ne mesure donc rien.

### 7.2 La définition

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 2.6 — The Arrow-Pratt Measure of Absolute Risk Aversion.</span>

$$\boxed{\;R_a(w)\equiv-\frac{u''(w)}{u'(w)}\;}$$

</div>

*(Arrow (1970) et Pratt (1964).)*

**Les deux propriétés qui la justifient :**

| Propriété | Vérification |
|---|---|
| Le **signe** donne l'attitude | $R_a>0$ ⟺ averse · $R_a<0$ ⟺ aimant · $R_a=0$ ⟺ neutre |
| Elle est **invariante** par transformation affine positive | *« ajouter une constante n'affecte ni le numérateur ni le dénominateur ; multiplier par une constante positive affecte les deux mais **laisse leur rapport inchangé** »* |

$$v=\alpha+\beta u,\ \beta>0 \qquad\Longrightarrow\qquad R_a^v=-\frac{\beta u''}{\beta u'}=-\frac{u''}{u'}=R_a^u \quad$$

### 7.3 La justification comportementale — le résultat central

> *« Pour démontrer l'efficacité de la mesure d'Arrow-Pratt, nous montrons maintenant que **les consommateurs ayant une mesure d'Arrow-Pratt plus grande sont effectivement plus averses au risque dans un sens comportementalement significatif** : ils ont des **équivalents certains plus bas** et sont **disposés à accepter moins de paris**. »*

**Le dispositif.** Deux consommateurs, de fonctions VNM $u(w)$ et $v(w)$, avec $u',v'>0$ partout, et

$$R_a^1(w)=-\frac{u''(w)}{u'(w)} \ > \ -\frac{v''(w)}{v'(w)}=R_a^2(w) \qquad \forall w\geq0 \tag{2.12}$$

**La construction-clé.** En supposant que $v$ prend toutes les valeurs de $[0,\infty)$, définir $h:[0,\infty)\to\mathbb{R}$ par

$$\boxed{\;h(x)=u\big(v^{-1}(x)\big)\;} \tag{2.13}$$

**Les deux dérivées.**

$$h'(x)=\frac{u'\big(v^{-1}(x)\big)}{v'\big(v^{-1}(x)\big)} \ > \ 0$$

$$h''(x)=\frac{u'\big(v^{-1}(x)\big)\Big[\,u''\big(v^{-1}(x)\big)/u'\big(v^{-1}(x)\big)-v''\big(v^{-1}(x)\big)/v'\big(v^{-1}(x)\big)\,\Big]}{\big[v'\big(v^{-1}(x)\big)\big]^2} \ < \ 0$$

> *« pour tout $x>0$, où la **première** inégalité découle de $u',v'>0$, et la **seconde** de (2.12). Donc **$h$ est strictement croissante et strictement concave**. »*

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment le signe de $h''$ sort de (2.12).</span>

⚠️ Le crochet vaut $\dfrac{u''}{u'}-\dfrac{v''}{v'} = -R_a^1+R_a^2 = R_a^2-R_a^1$, qui est **négatif** par (2.12). Le facteur devant est positif ($u'>0$, carré au dénominateur). D'où $h''<0$.

</div>

**L'argument sur les équivalents certains.** Soit $\hat w_i$ l'équivalent certain du consommateur $i$ pour le pari $(p_1\circ w_1,\dots,p_n\circ w_n)$ :

$$\sum_i p_i\,u(w_i)=u(\hat w_1) \quad \text{(2.14)} \qquad\qquad \sum_i p_i\,v(w_i)=v(\hat w_2) \quad \text{(2.15)}$$

En posant $x=v(w)$ dans (2.13) et en utilisant (2.14) :

$$u(\hat w_1)=\sum_i p_i\,h\big(v(w_i)\big) \ \underset{\text{Jensen}}{<} \ h\left(\sum_i p_i\,v(w_i)\right) = h\big(v(\hat w_2)\big) = u(\hat w_2)$$

> *« où l'inégalité, appelée **inégalité de Jensen**, découle de ce que **$h$ est strictement concave**. »*

Comme $u$ est strictement croissante, $u(\hat w_1)<u(\hat w_2)$ donne

$$\boxed{\;\hat w_1 \ < \ \hat w_2\;}$$

**Les deux conséquences.**

> *« Nous pouvons conclure que **l'équivalent certain du consommateur 1 pour n'importe quel pari donné est plus bas que celui de 2**. Et de là il découle facilement que si les consommateurs 1 et 2 ont la même richesse initiale, alors **le consommateur 2 (celui dont la mesure d'Arrow-Pratt est globalement plus basse) acceptera tout pari que le consommateur 1 accepte**. C'est-à-dire, **le consommateur 1 est disposé à accepter moins de paris** que le consommateur 2. »*

**La troisième formulation — la « concavification ».** En posant $x=v(w)$ dans (2.13) :

$$u(w)=h\big(v(w)\big) \qquad \forall w\geq0 \tag{2.16}$$

> *« Selon (2.16), **$u$ est une "concavification" de $v$**. C'est encore une autre expression (équivalente) de l'idée que le consommateur 1 est plus averse au risque que le consommateur 2. »*

> **Les trois formulations équivalentes de « 1 est plus averse au risque que 2 » — à savoir citer.**
>
> | # | Formulation | Nature |
> |---|---|---|
> | 1 | $R_a^1(w) > R_a^2(w)$ pour tout $w$ | **analytique** |
> | 2 | $\hat w_1 < \hat w_2$ pour tout pari — donc 1 accepte moins de paris | **comportementale** |
> | 3 | $u = h\circ v$ avec $h$ strictement concave croissante | **structurelle** |
>
> ⚠️ **C'est la structure de preuve à retenir :** on ne compare pas $u$ et $v$ directement (elles ne sont pas comparables, étant définies à transformation affine près) ; **on les relie par $h=u\circ v^{-1}$** et l'on montre que $h$ est concave. Toute l'information est dans $h$.

## 🟠 Concept 8 — DARA, CARA, IARA et deux applications

### 8.1 La classification d'Arrow

> *« $R_a(w)$ n'est qu'une mesure **locale** d'aversion au risque, donc elle n'a pas besoin d'être la même à chaque niveau de richesse. En effet, on s'attend à ce que les attitudes envers le risque varient avec la richesse, et varient de manière **"sensée"**. »*

> *« Nous disons qu'une fonction VNM affiche une aversion absolue au risque **constante, décroissante ou croissante** sur un domaine de richesse si, sur cet intervalle, $R_a(w)$ **reste constante, décroît ou croît** avec une hausse de la richesse. »*

| Sigle | Nom | Comportement de $R_a(w)$ |
|---|---|---|
| **DARA** | *decreasing absolute risk aversion* | **décroissante** |
| **CARA** | *constant absolute risk aversion* | **constante** |
| **IARA** | *increasing absolute risk aversion* | **croissante** |

**L'argument du livre en faveur de DARA :**

> *« **DARA est généralement une restriction sensée à imposer.** Sous CARA, il n'y aurait **aucune plus grande disposition à accepter un petit pari à des niveaux de richesse plus élevés**, et sous IARA nous avons un comportement plutôt **pervers** : plus la richesse est grande, plus on devient averse à accepter le même petit pari. DARA impose la restriction plus **plausible** que l'individu soit **moins averse aux petits risques quand il est plus riche**. »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — les deux familles standard.</span>

Le livre ne les nomme pas ici, mais elles sont universellement utilisées et se déduisent directement de la définition 2.6.

| Famille | $u(w)$ | $R_a(w)$ | Classe |
|---|---|---|---|
| exponentielle | $-e^{-\theta w}$, $\theta>0$ | $\theta$ (constante) | **CARA** |
| logarithmique | $\ln w$ | $1/w$ | **DARA** |
| puissance (CRRA) | $\dfrac{w^{1-\gamma}}{1-\gamma}$, $\gamma>0$, $\gamma\neq1$ | $\gamma/w$ | **DARA** |
| quadratique | $w-bw^2$, $b>0$ | $\dfrac{2b}{1-2bw}$ | **IARA** |

⚠️ **L'utilité quadratique est IARA** — c'est son principal défaut théorique, alors même qu'elle est omniprésente en finance (elle rend le critère moyenne-variance exact). Le livre qualifie ce comportement de « pervers » : plus on est riche, plus on refuse le même petit pari.

</div>

### 8.2 Exemple 2.6 — le portefeuille et la normalité de l'actif risqué

**Le problème.** Un investisseur de richesse initiale $w$ décide du montant $\beta$ à placer dans un actif risqué, de rendements $r_i$ avec probabilités $p_i$. La richesse finale sous l'issue $i$ est

$$(w-\beta)+(1+r_i)\beta = w+\beta r_i$$

$$\max_\beta \ \sum_{i=1}^n p_i\,u(w+\beta r_i) \quad\text{s.c.}\quad 0\leq\beta\leq w \tag{E.1}$$

**Question 1 — quand n'investit-on rien ?** Si $\beta^*=0$ est optimal, la dérivée de l'objectif doit être **non croissante** en ce point :

$$\sum_i p_i\,u'(w+\beta^* r_i)\,r_i \ \Big|_{\beta^*=0} = u'(w)\sum_i p_ir_i \ \leq\ 0$$

> *« La somme de droite est simplement le **rendement espéré** de l'actif risqué. Comme $u'(w)$ doit être positif, **le rendement espéré doit être non positif**. »*

$$\boxed{\;\text{Un investisseur averse s'abstient complètement de l'actif risqué} \iff \text{son rendement espéré est} \leq 0\;}$$

> *« Alternativement, on peut dire qu'un investisseur averse au risque **préférera toujours placer un peu de richesse dans un actif risqué à rendement espéré strictement positif**. »*

> ⚠️ **Ce résultat est contre-intuitif et important.** Aussi averse au risque qu'il soit, un agent **investit toujours un peu** dans un actif de rendement espéré positif. La raison : au voisinage de $\beta=0$, le gain espéré est du **premier ordre** ($u'(w)\sum p_ir_i>0$) tandis que le coût du risque est du **second ordre** (proportionnel à $\beta^2$). Le premier ordre l'emporte toujours près de zéro.

**Question 2 — l'actif risqué est-il un bien normal ?** Supposons le rendement espéré positif et $\beta^*<w$. Les conditions du premier et du second ordre :

$$\sum_i p_i\,u'(w+\beta^*r_i)\,r_i = 0 \tag{E.2}$$

$$\sum_i p_i\,u''(w+\beta^*r_i)\,r_i^2 < 0 \tag{E.3}$$

*(E.3 est stricte à cause de l'aversion au risque.)*

En dérivant (E.2) par rapport à $w$ :

$$\frac{d\beta^*}{dw}=\frac{-\displaystyle\sum_i p_i\,u''(w+\beta^*r_i)\,r_i}{\displaystyle\sum_i p_i\,u''(w+\beta^*r_i)\,r_i^2} \tag{E.4}$$

Le **dénominateur est négatif** (E.3). L'actif risqué est donc « normal » ($d\beta^*/dw>0$) **si et seulement si le numérateur est négatif**.

**DARA suffit.** La définition de $R_a$ donne

$$-u''(w+\beta^*r_i)\,r_i \equiv R_a(w+\beta^*r_i)\,r_i\,u'(w+\beta^*r_i) \tag{E.5}$$

Sous **DARA** :

| Cas | Inégalité sur $R_a$ | Après multiplication par $r_i$ |
|---|---|---|
| $r_i>0$ | $R_a(w) > R_a(w+\beta^*r_i)$ | $R_a(w)\,r_i > R_a(w+\beta^*r_i)\,r_i$ |
| $r_i<0$ | $R_a(w) < R_a(w+\beta^*r_i)$ | $R_a(w)\,r_i > R_a(w+\beta^*r_i)\,r_i$ |

> ⚠️ **Le point subtil : dans le second cas, multiplier par $r_i<0$ RETOURNE l'inégalité** — et les deux cas aboutissent donc à la **même** conclusion (E.6). C'est exactement ce qui fait fonctionner l'argument.

$$R_a(w)\,r_i \ > \ R_a(w+\beta^*r_i)\,r_i, \qquad i=1,\dots,n \tag{E.6}$$

En substituant $R_a(w)$ à $R_a(w+\beta^*r_i)$ dans (E.5) et en utilisant (E.6) :

$$-u''(w+\beta^*r_i)\,r_i \ < \ R_a(w)\,r_i\,u'(w+\beta^*r_i)$$

En prenant l'espérance :

$$-\sum_i p_i\,u''(w+\beta^*r_i)\,r_i \ < \ R_a(w)\underbrace{\sum_i p_i\,r_i\,u'(w+\beta^*r_i)}_{=\,0 \text{ par (E.2)}} = 0 \tag{E.7}$$

**Le numérateur de (E.4) est donc négatif.** $\dfrac{d\beta^*}{dw}>0$ : **sous DARA, on place davantage de richesse dans l'actif risqué quand on s'enrichit.** $\blacksquare$

> *« L'empirisme informel suggère qu'à mesure que la richesse augmente, un **montant absolu plus grand** est placé dans les actifs risqués, c'est-à-dire que les actifs risqués sont des biens **"normaux"** plutôt qu'"inférieurs". Nous montrerons que c'est le cas sous DARA. »*
>
> **C'est le principal argument en faveur de DARA :** c'est la classe qui produit le comportement observé.

### 8.3 Exemple 2.7 — l'assurance

**Le problème.** Un individu averse au risque, de richesse initiale $w_0$ et de fonction VNM $u(\cdot)$, doit décider s'il assure sa voiture et pour combien. La probabilité d'accident est $\alpha\in(0,1)$, la perte $L$. Combien d'assurance $x$ acheter ?

**Le prix actuariellement équitable.** Si $\rho$ est le prix par euro d'assurance, le profit espéré de l'assureur par euro vendu (à coût nul) est

$$\alpha(\rho-1)+(1-\alpha)\rho$$

*(avec probabilité $\alpha$ l'assureur encaisse $\rho$ et verse $1$ ; avec probabilité $1-\alpha$ il encaisse $\rho$.)*

En annulant ce profit :

$$\boxed{\;\rho=\alpha\;}$$

> **Le prix actuariellement équitable est donc égal à la probabilité du sinistre.** C'est la définition à retenir.

**Le programme.** L'individu maximise son espérance d'utilité :

$$\max_x \ \alpha\,u(w_0-\alpha x-L+x)+(1-\alpha)\,u(w_0-\alpha x) \tag{E.1}$$

| État | Richesse finale |
|---|---|
| accident (probabilité $\alpha$) | $w_0-\alpha x-L+x$ — il paie la prime $\alpha x$, subit $L$, reçoit $x$ |
| pas d'accident (probabilité $1-\alpha$) | $w_0-\alpha x$ — il paie seulement la prime |

**La condition du premier ordre.** En dérivant (E.1) par rapport à $x$ :

$$(1-\alpha)\,\alpha\,u'(w_0-\alpha x-L+x)-\alpha(1-\alpha)\,u'(w_0-\alpha x)=0$$

En divisant par $(1-\alpha)\alpha$ :

$$u'(w_0-\alpha x-L+x)=u'(w_0-\alpha x)$$

**La conclusion.**

> *« Mais parce que l'individu est averse au risque, $u''<0$, de sorte que **l'utilité marginale de la richesse est strictement décroissante** en la richesse. Par conséquent, l'égalité des utilités marginales implique **l'égalité des niveaux de richesse eux-mêmes** : »*

$$w_0-\alpha x-L+x = w_0-\alpha x \qquad\Longrightarrow\qquad \boxed{\;x=L\;}$$

> *« Par conséquent, avec la disponibilité d'une assurance **actuariellement équitable**, un individu averse au risque **s'assure complètement contre tout risque**. Notez qu'à l'optimum, sa richesse est **constante et égale à $w_0-\alpha L$**, qu'il ait ou non un accident. »*

> **Les trois enseignements de l'exemple 2.7.**
>
> 1. **La couverture complète est optimale**, quelle que soit l'intensité de l'aversion au risque — pourvu qu'il y en ait une.
> 2. À l'optimum, la richesse est **déterministe** : $w_0-\alpha L$. L'agent a complètement éliminé le risque.
> 3. La stricte décroissance de $u'$ (donc $u''<0$) est **le seul ingrédient** de la preuve. C'est la traduction analytique de l'aversion au risque.
>
> ⚠️ **Le résultat dépend crucialement de « actuariellement équitable ».** Si $\rho>\alpha$ (l'assureur prend une marge — le cas réel), le calcul change : la condition du premier ordre devient $\dfrac{u'(\text{accident})}{u'(\text{pas d'accident})}=\dfrac{\rho(1-\alpha)}{\alpha(1-\rho)}>1$, donc $u'(\text{accident})>u'(\text{pas d'accident})$, donc — $u'$ étant décroissante — la richesse est **plus faible en cas d'accident**. **La couverture est alors partielle : $x<L$.**

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Un pari composé à décrire | **Probabilités effectives** | Sommer les chemins **mutuellement exclusifs** menant à chaque $a_i$ |
| « ces préférences satisfont-elles G3 / G4 ? » | **Test d'axiome** | Chercher un résultat « infiniment mauvais » (G3) ou un goût du risque **pour lui-même** (G4) |
| Des indifférences données + « classer deux paris » | **Construction VNM** | Poser $u(a_i)=$ probabilité d'indifférence, puis calculer les espérances |
| « $v$ représente-t-elle les mêmes préférences ? » | **Théorème 2.8** | $v=\alpha+\beta u$ avec $\beta>0$ ? Sinon, la propriété d'espérance d'utilité est détruite |
| Une $u(w)$ donnée + « l'agent est-il averse ? » | **Concavité** | Signe de $u''$ — ou de $R_a=-u''/u'$ |
| « calculer $CE$ et $P$ » | **Définition 2.5** | Résoudre $u(CE)=\sum p_iu(w_i)$, puis $P=E(g)-CE$ |
| « qui est le plus averse ? » | **Arrow-Pratt** | Comparer $R_a(w)$ ; ou construire $h=u\circ v^{-1}$ et tester sa concavité |
| « comment $\beta^*$ varie-t-il avec $w$ ? » | **Portefeuille** | Dériver la condition du premier ordre ; DARA ⟹ actif normal |
| Assurance, prime, sinistre | **Exemple 2.7** | Vérifier si le prix est **actuariellement équitable** ($\rho=\alpha$) |

**Les trois questions de cadrage :**

1. **Est-on dans le cadre général ($A$ fini, résultats quelconques) ou dans le cadre richesse ($A=\mathbb{R}_+$) ?** L'aversion au risque n'a de sens que dans le second.
2. **La transformation proposée est-elle affine ?** Si non, elle détruit la propriété d'espérance d'utilité — même si elle préserve l'ordre.
3. **Le prix de l'assurance est-il équitable ?** Si oui, couverture **complète** ; si non, couverture **partielle**.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Calculer des probabilités effectives

1. **Dessiner l'arbre** du pari composé, avec les probabilités sur chaque branche.
2. Pour chaque résultat $a_i$ de $A$, **identifier tous les chemins** de la racine à une feuille portant $a_i$.
3. **Multiplier** les probabilités le long de chaque chemin.
4. **Sommer** sur les chemins — c'est licite parce qu'ils sont **mutuellement exclusifs**.
5. **Vérifier** que les probabilités effectives somment à 1.

### Méthode 2 — Construire une fonction VNM à partir d'indifférences

1. **Identifier le meilleur ($a_1$) et le pire ($a_n$)** résultat ; poser $u(a_1)=1$, $u(a_n)=0$.
2. Pour chaque résultat intermédiaire $a_i$, **lire la probabilité d'indifférence** $\alpha_i$ dans l'énoncé : $a_i\sim(\alpha_i\circ a_1,\ (1-\alpha_i)\circ a_n)$. Poser $u(a_i)=\alpha_i$.
3. Pour classer deux paris, **calculer l'espérance d'utilité** de chacun.
4. **Contrôle qualitatif** : comparer $u(a_i)$ à l'interpolation linéaire $\dfrac{a_i-a_n}{a_1-a_n}$ — au-dessus ⟹ aversion, en dessous ⟹ goût du risque.

### Méthode 3 — Calculer équivalent certain et prime de risque

1. Calculer $u(g)=\sum_i p_i\,u(w_i)$ — **l'utilité du pari**.
2. Calculer $E(g)=\sum_i p_iw_i$ — **la valeur espérée**.
3. Résoudre $u(CE)=u(g)$ en **inversant $u$** : $CE=u^{-1}\big(u(g)\big)$.
4. Poser $P=E(g)-CE$.
5. **Contrôles** : $CE<E(g)$ et $P>0$ si l'agent est averse ; $P=0$ s'il est neutre ; $P<0$ s'il aime le risque.

### Méthode 4 — Comparer deux degrés d'aversion

**Voie directe.** Calculer $R_a^1(w)=-u''/u'$ et $R_a^2(w)=-v''/v'$, comparer.

**Voie structurelle** (si les $R_a$ ne se comparent pas facilement) :

1. Poser $h=u\circ v^{-1}$.
2. Calculer $h'=\dfrac{u'\circ v^{-1}}{v'\circ v^{-1}}$ et vérifier $h'>0$.
3. Calculer le signe de $h''$ : il est du signe de $R_a^2-R_a^1$.
4. $h$ **concave** ⟺ 1 est **plus averse** que 2 ⟺ $\hat w_1<\hat w_2$ pour tout pari.

### Méthode 5 — Un problème de choix sous incertitude (portefeuille, assurance)

1. **Écrire la richesse finale dans chaque état** — c'est l'étape où l'on se trompe le plus.
2. **Écrire l'espérance d'utilité** comme somme pondérée par les probabilités.
3. **Dériver** par rapport à la variable de choix, poser $=0$.
4. **Exploiter la monotonie de $u'$** : sous aversion au risque $u'$ est strictement décroissante, donc $u'(A)=u'(B)\Rightarrow A=B$.
5. **Vérifier les conditions de second ordre** — l'aversion au risque les garantit.
6. **Envisager les solutions en coin** ($\beta^*=0$ ou $\beta^*=w$) et tester la dérivée au bord.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que les résultats $a_i$ peuvent être risqués | *« Les $a_i$ eux-mêmes n'impliquent **aucune** incertitude »* | Le risque est dans les **probabilités**, pas dans les résultats |
| 2 | Autoriser des paris composés à profondeur infinie | Le livre les exclut explicitement (loterie d'État) | Nombre **fini** de randomisations |
| 3 | Additionner les probabilités le long d'un chemin | Le long d'un chemin on **multiplie** ; entre chemins on **additionne** | Chemins **mutuellement exclusifs** |
| 4 | Indexer les résultats dans un ordre quelconque | Toute la construction suppose $a_1\succsim\dots\succsim a_n$ | $a_1$ = **meilleur**, $a_n$ = **pire** |
| 5 | Croire que G3 est déraisonnable à cause de l'exemple « mort » | Le livre le défend : traverser la ville pour 1 000 dollars révèle déjà la probabilité d'indifférence | Refuser G3 = ne jamais prendre aucun risque |
| 6 | Énoncer G4 comme une simple implication | C'est un **si et seulement si** — c'est lui qui donne l'**unicité** | $\succsim$ ⟺ $\alpha\geq\beta$ |
| 7 | Croire que G6 est innocent | Il exclut toute valeur du **processus** (Las Vegas) | Seules comptent les probabilités **effectives** |
| 8 | Croire que G1 est indispensable | Il est **redondant** : G2+G3+G4 l'impliquent (ex. 2.22) | Le livre le garde pour ne pas dérouter |
| 9 | Dire que $u$ est « linéaire » sans préciser | Elle est linéaire **dans les probabilités**, pas dans les résultats | $u(g)=\sum_i p_iu(a_i)$ |
| 10 | Croire qu'il faut connaître $u$ sur tout $\mathcal{G}$ | $u$ est déterminée par ses **$n$ valeurs sur $A$** | C'est tout l'intérêt de la propriété |
| 11 | Dans la preuve du thm 2.7, oublier l'unicité | Sans elle, (P.7) et (P.8) ne s'identifient pas | L'unicité vient de **G4** |
| 12 | Appliquer une transformation monotone quelconque à une $u$ VNM | Cela **détruit** la propriété d'espérance d'utilité | Seules les affines **positives** |
| 13 | Attacher un sens au niveau ou à l'écart d'utilité VNM | Ni l'un ni l'autre n'est invariant | Seuls les **ratios de différences** le sont |
| 14 | Faire des comparaisons interpersonnelles avec des utilités VNM | Le livre l'exclut explicitement | Impossible, comme au chapitre 1 |
| 15 | Inverser le sens de Jensen | L'averse **préfère l'espérance certaine au pari** | $u\big(E(g)\big)>u(g)$ |
| 16 | Confondre $u(E(g))$ et $E\big(u(g)\big)$ | $u(g)$ **est** déjà l'espérance d'utilité | $u(g)=\sum p_iu(w_i)$ ; $u(E(g))=u(\sum p_iw_i)$ |
| 17 | Utiliser $u''$ pour mesurer l'aversion | Sa taille est **arbitraire** (thm 2.8 : $v''=\beta u''$) | Le **rapport** $-u''/u'$ |
| 18 | Comparer $u$ et $v$ directement | Elles ne sont pas comparables (définies à affine près) | Passer par $h=u\circ v^{-1}$ |
| 19 | Croire qu'un agent très averse n'investit rien dans l'actif risqué | Il investit **toujours un peu** si le rendement espéré est $>0$ | Premier ordre vs second ordre |
| 20 | Dans l'exemple 2.6, oublier que multiplier par $r_i<0$ **retourne** l'inégalité | C'est ce qui unifie les deux cas en (E.6) | Traiter $r_i>0$ et $r_i<0$ séparément |
| 21 | Conclure à la couverture complète sans vérifier le prix | Le résultat exige $\rho=\alpha$ (**actuariellement équitable**) | Si $\rho>\alpha$ : couverture **partielle** |
| 22 | Mal écrire la richesse en cas d'accident | Elle vaut $w_0-\alpha x-L+x$ : prime payée, perte subie, indemnité reçue | Écrire chaque état **avant** de dériver |
| 23 | Croire que l'utilité quadratique est DARA | Elle est **IARA** — c'est son défaut théorique | $R_a=\dfrac{2b}{1-2bw}$, croissante |
| 24 | Confondre aversion **absolue** et **relative** | Le livre ne définit ici que $R_a$, l'aversion **absolue** | $R_a=-u''/u'$ |

## 📌 Ultimate Review

**Le cadre.** $A=\{a_1,\dots,a_n\}$ résultats **sans risque**, indexés par $a_1\succsim\dots\succsim a_n$.

$$\mathcal{G}_S=\left\{(p_1\circ a_1,\dots,p_n\circ a_n)\ \Big|\ p_i\geq0,\ \sum p_i=1\right\} \qquad \mathcal{G}=\bigcup_{j\geq0}\mathcal{G}_j$$

**Probabilités effectives.** Multiplier le long d'un chemin, sommer entre chemins mutuellement exclusifs. Chaque $g\in\mathcal{G}$ **induit un pari simple unique**.

**Les six axiomes.**

|  | Nom | Énoncé condensé |
|---|---|---|
| G1 | Complétude | tout couple comparable — **redondant** |
| G2 | Transitivité | pas de cycle |
| G3 | Continuité | $\exists\alpha$ : $g\sim(\alpha\circ a_1,\ (1-\alpha)\circ a_n)$ |
| G4 | Monotonicité | $(\alpha\circ a_1,\dots)\succsim(\beta\circ a_1,\dots)$ **ssi** $\alpha\geq\beta$ |
| G5 | Substitution | $h_i\sim g_i \ \forall i \Rightarrow h\sim g$ |
| G6 | Réduction | $g \sim$ le pari simple qu'il induit |

**DÉFINITION 2.3 — propriété d'espérance d'utilité.**

$$u(g)=\sum_{i=1}^n p_i\,u(a_i)$$

⟹ $u$ est déterminée par ses **$n$ valeurs sur $A$**.

**THÉORÈME 2.7.** G1-G6 ⟹ il existe $u$ représentant $\succsim$ **avec** la propriété d'espérance d'utilité.

*Construction : $u(g)$ = l'unique nombre tel que $g\sim\big(u(g)\circ a_1,\ (1-u(g))\circ a_n\big)$. Existence par **G3**, unicité par **G4**.*

**THÉORÈME 2.8.** $v$ représente les mêmes préférences avec la propriété **ssi** $v=\alpha+\beta u$, $\beta>0$.

⟹ **invariants** : l'ordre, les **ratios de différences**, $R_a$. **Non invariants** : le niveau, l'écart, $u''$, les comparaisons interpersonnelles.

**DÉFINITION 2.4 — attitude face au risque** (sur $A=\mathbb{R}_+$).

$$\begin{array}{lcl} u\big(E(g)\big)>u(g) & \text{averse} & \iff u \text{ str. concave}\\ u\big(E(g)\big)=u(g) & \text{neutre} & \iff u \text{ linéaire}\\ u\big(E(g)\big)<u(g) & \text{aimant} & \iff u \text{ str. convexe} \end{array}$$

**DÉFINITION 2.5.**

$$u(g)=u(CE) \qquad u(g)=u\big(E(g)-P\big) \qquad \boxed{P=E(g)-CE}$$

Agent averse : $CE<E(g)$ et $P>0$.

**Exemple 2.5.** $u=\ln w$, $g=\big(\tfrac12\circ(w_0+h),\ \tfrac12\circ(w_0-h)\big)$ :

$$CE=\sqrt{w_0^2-h^2} \qquad P=w_0-\sqrt{w_0^2-h^2}$$

*($CE$ = moyenne **géométrique**, $E(g)$ = moyenne **arithmétique**.)*

**DÉFINITION 2.6 — Arrow-Pratt.**

$$\boxed{\;R_a(w)=-\frac{u''(w)}{u'(w)}\;}$$

*Pourquoi pas $u''$ : sa taille est arbitraire ($v''=\beta u''$). Le rapport, lui, est invariant.*

**Le théorème de comparaison.** $R_a^1>R_a^2$ partout ⟺ $h=u\circ v^{-1}$ strictement concave ⟺ $\hat w_1<\hat w_2$ pour tout pari ⟺ 1 accepte **moins** de paris. *(Preuve par l'**inégalité de Jensen** appliquée à $h$.)*

**Classification d'Arrow.**

| Sigle | $R_a(w)$ | Exemple | Statut |
|---|---|---|---|
| **DARA** | décroissante | $\ln w$ ($R_a=1/w$), CRRA ($R_a=\gamma/w$) | **plausible** |
| **CARA** | constante | $-e^{-\theta w}$ ($R_a=\theta$) | neutre |
| **IARA** | croissante | quadratique $w-bw^2$ | **« pervers »** |

**Exemple 2.6 — portefeuille.** — On s'abstient de l'actif risqué **ssi** son rendement espéré est $\leq0$. — Sous **DARA**, $\dfrac{d\beta^*}{dw}>0$ : l'actif risqué est un bien **normal**.

**Exemple 2.7 — assurance.** Prix actuariellement équitable : $\rho=\alpha$. Alors la condition du premier ordre donne $u'(\text{accident})=u'(\text{pas d'accident})$, donc — $u'$ strictement décroissante — **égalité des richesses**, donc

$$\boxed{\;x=L \quad\text{: couverture COMPLÈTE, richesse déterministe } w_0-\alpha L\;}$$

⚠️ Si $\rho>\alpha$, la couverture devient **partielle**.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. En quoi consiste le « déplacement de perspective » du §2.4 ?**

</summary>

Les préférences ne portent plus sur des **paniers** $x\in X$ mais sur des **paris** $g\in\mathcal{G}$.

> *« Pour tenir compte de l'incertitude, **il suffit de déplacer légèrement la perspective**. Nous maintiendrons la notion de relation de préférence mais, au lieu de paniers de consommation, l'individu sera supposé avoir une relation de préférence sur des paris. »*

Référence fondatrice : **von Neumann et Morgenstern (1944)**.

</details>

<details class="details--riche">
<summary>

**2. Qu'est-ce qu'un résultat, et quelle est sa propriété essentielle ?**

</summary>

$A=\{a_1,\dots,a_n\}$, un ensemble **fini**. Les $a_i$ peuvent être des paniers, des montants d'argent, n'importe quoi.

> *« Le point principal est que **les $a_i$ eux-mêmes n'impliquent aucune incertitude**. »*

Tout le risque est porté par les **probabilités**, jamais par les résultats.

</details>

<details class="details--riche">
<summary>

**3. Définir un pari simple, et dire pourquoi $A\subset\mathcal{G}_S$.**

</summary>

$$\mathcal{G}_S\equiv\left\{(p_1\circ a_1,\dots,p_n\circ a_n)\ \Big|\ p_i\geq0,\ \sum_i p_i=1\right\}$$

$A\subset\mathcal{G}_S$ parce que $(1\circ a_i)$ — le pari **dégénéré** donnant $a_i$ avec certitude — est un pari simple. On l'écrit simplement $a_i$.

C'est ce qui permet de **comparer le certain et l'aléatoire dans un même cadre**.

</details>

<details class="details--riche">
<summary>

**4. Quelle restriction le livre impose-t-il aux paris composés, et pourquoi ?**

</summary>

Ils doivent aboutir à un résultat de $A$ **après un nombre fini de randomisations**.

> *« Pour simplifier seulement, nous exclurons les paris composés à couches infinies comme **la loterie d'État** [dont les lots sont des billets pour la loterie suivante]. »*

Formellement (note 2) : $\mathcal{G}=\bigcup_{j\geq0}\mathcal{G}_j$ où $\mathcal{G}_j$ contient les paris de profondeur $\leq j$. La profondeur est **non bornée** mais toujours **finie**.

</details>

<details class="details--riche">
<summary>

**5. Calculer les probabilités effectives d'un pari composé à deux niveaux.**

</summary>

$A=\{a_1,a_2\}$. Le pari donne $a_1$ avec probabilité $\alpha$, et un billet avec probabilité $1-\alpha$ ; ce billet donne $a_1$ avec probabilité $\beta$.

$$\Pr(a_1)=\underbrace{\alpha}_{\text{chemin direct}}+\underbrace{(1-\alpha)\beta}_{\text{via le billet}} \qquad \Pr(a_2)=(1-\alpha)(1-\beta)$$

**La règle :** on **multiplie** le long d'un chemin, on **additionne** entre chemins — parce qu'ils sont **mutuellement exclusifs**.

</details>

<details class="details--riche">
<summary>

**6. Énoncer les six axiomes.**

</summary>

|  | Énoncé |
|---|---|
| **G1** Complétude | pour $g,g'\in\mathcal{G}$ : $g\succsim g'$ ou $g'\succsim g$ |
| **G2** Transitivité | $g\succsim g'$ et $g'\succsim g''$ ⟹ $g\succsim g''$ |
| **G3** Continuité | $\forall g\ \exists\alpha\in[0,1]$ : $g\sim(\alpha\circ a_1,\ (1-\alpha)\circ a_n)$ |
| **G4** Monotonicité | $(\alpha\circ a_1,(1-\alpha)\circ a_n)\succsim(\beta\circ a_1,(1-\beta)\circ a_n)$ **ssi** $\alpha\geq\beta$ |
| **G5** Substitution | $h_i\sim g_i\ \forall i$ ⟹ $h\sim g$ |
| **G6** Réduction | $g\sim$ le pari simple **induit** par $g$ |

</details>

<details class="details--riche">
<summary>

**7. Comment le livre défend-il l'axiome de continuité contre l'objection « $1000\,\$$, $10\,\$$, mort » ?**

</summary>

> *« **Ne soyez pas trop rapide à conclure.** Si vous traverseriez la ville en voiture pour toucher $1000\,\$$ — une action impliquant une probabilité positive, si minuscule soit-elle, de mort — plutôt que d'accepter un paiement de $10\,\$$ pour rester chez vous, vous déclareriez votre **préférence pour le pari** plutôt que pour la petite somme certaine. Vraisemblablement, nous pourrions augmenter la probabilité d'accident fatal jusqu'à ce que vous soyez **juste indifférent**. »*

**Refuser G3, c'est affirmer qu'on ne prendrait jamais le moindre risque pour le moindre gain** — ce que personne ne fait.

</details>

<details class="details--riche">
<summary>

**8. Quel contre-exemple le livre donne-t-il à la monotonicité ?**

</summary>

Le **chasseur en safari** :

> *« La mort peut être le pire résultat d'une sortie, et pourtant **la possibilité de la mort ajoute à l'excitation** de l'aventure. Une sortie avec une petite probabilité de mort serait alors préférée à une sortie avec probabilité nulle — une violation claire de la monotonicité. »*

G4 exclut donc le **goût du risque pour lui-même**.

</details>

<details class="details--riche">
<summary>

**9. Que dit exactement G6, et qui le viole ?**

</summary>

Le décideur **ne se soucie que des probabilités effectives** : un pari composé est indifférent au pari simple qu'il induit.

**Qui le viole :** les **vacanciers de Las Vegas**.

> *« Ils ne seraient probablement pas indifférents entre jouer aux machines à sous de nombreuses fois et prendre le **pari unique une fois pour toutes** défini par les probabilités effectives. »*

G6 exclut donc toute valeur attachée au **processus** de randomisation.

</details>

<details class="details--riche">
<summary>

**10. Quel axiome est redondant, et pourquoi le livre le conserve-t-il ?**

</summary>

**G1 (complétude)** — il n'est **jamais utilisé** dans la preuve du théorème 2.7, et G2+G3+G4 l'impliquent (exercice 2.22).

> *« Supposer la transitivité et **pas** la complétude aurait sûrement soulevé des questions inutiles dans l'esprit du lecteur. **Pour vous épargner ce genre de stress**, nous avons opté pour l'approche présentée ici. »*

</details>

<details class="details--riche">
<summary>

**11. Énoncer la propriété d'espérance d'utilité et sa conséquence majeure.**

</summary>

$$u(g)=\sum_{i=1}^n p_i\,u(a_i)$$

où $(p_1\circ a_1,\dots,p_n\circ a_n)$ est le pari simple **induit** par $g$.

**Conséquence :** $u$ est **complètement déterminée par ses $n$ valeurs sur $A$**. Connaître $u(a_1),\dots,u(a_n)$ suffit à classer tous les paris de $\mathcal{G}$.

⚠️ $u$ est linéaire **dans les probabilités**, pas dans les résultats.

</details>

<details class="details--riche">
<summary>

**12. Quelle est la construction au cœur de la preuve du théorème 2.7 ?**

</summary>

Définir $u(g)$ comme le nombre satisfaisant

$$g\sim\big(u(g)\circ a_1,\ (1-u(g))\circ a_n\big)$$

C'est la **probabilité d'indifférence** : la chance sur le meilleur résultat qui rend le décideur indifférent à $g$.

| Point | Axiome |
|---|---|
| existence | **G3** |
| unicité | **G4** (exercice 2.19) |

C'est le même schéma qu'au théorème 1.1 : projeter sur une **famille à un paramètre** et lire le paramètre.

</details>

<details class="details--riche">
<summary>

**13. Où chaque axiome intervient-il dans la preuve du théorème 2.7 ?**

</summary>

| Axiome | Rôle |
|---|---|
| **G2** | chaînage (P.1)⟺(P.2) et transitivité de $\sim$ en (P.7) |
| **G3** | **existence** de $u(g)$ |
| **G4** | **unicité** de $u(g)$, et (P.2)⟺(P.3) |
| **G5** | remplacer chaque $a_i$ par $q_i$ en (P.6) |
| **G6** | $g\sim g_s$ et $g'\sim g'_s$ — **deux fois** |
| **G1** | **jamais** |

</details>

<details class="details--riche">
<summary>

**14. Dans l'étape 2 de la preuve, comment obtient-on la probabilité effective de $a_1$ sous $g'$ ?**

</summary>

$g'=(p_1\circ q_1,\dots,p_n\circ q_n)$ où $q_i=\big(u(a_i)\circ a_1,\ (1-u(a_i))\circ a_n\big)$.

$a_1$ résulte si $q_i$ se produit (probabilité $p_i$) **et** $q_i$ donne $a_1$ (probabilité $u(a_i)$) — soit $p_iu(a_i)$ pour chaque $i$. Les $q_i$ étant **mutuellement exclusifs** :

$$\Pr(a_1)=\sum_i p_i\,u(a_i)$$

En comparant avec la définition de $u(g_s)$ — qui est **unique** — on conclut $u(g_s)=\sum_i p_iu(a_i)$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**15. Comment construire une fonction VNM en pratique ?**

</summary>

> *« Pour déterminer l'utilité d'un résultat $a_i$, il suffit de **demander à l'individu la probabilité du meilleur résultat qui le rendrait indifférent** entre un pari meilleur-pire $(\alpha\circ a_1,(1-\alpha)\circ a_n)$ et $a_i$ avec certitude. »*

$n$ questions suffisent. Ensuite, l'utilité de n'importe quel pari est simplement son **espérance d'utilité**.

Sur l'échelle ainsi construite, $u(a_1)=1$ et $u(a_n)=0$ **toujours** ; seuls les intermédiaires portent l'information sur le risque.

</details>

<details class="details--riche">
<summary>

**16. Dans l'exemple 2.4, comment voit-on l'aversion au risque ?**

</summary>

L'individu répond $u(4)=0{,}6$, c'est-à-dire $4\sim(0{,}6\circ10,\ 0{,}4\circ-2)$.

Or ce pari a pour **valeur espérée** $0{,}6\times10+0{,}4\times(-2)=5{,}2 > 4$.

> *« Il est indifférent entre un pari valant $5{,}2$ en espérance et $4$ avec certitude. »*

Un individu **neutre** aurait répondu $u(4)=\dfrac{4-(-2)}{10-(-2)}=0{,}5$. Comme $0{,}6>0{,}5$, il est **averse**.

De même il préfère $g_1$ ($E=8{,}80$) à $g_2$ ($E=8{,}98$) : *« $g_2$ est évité parce qu'il inclut **trop de risque du pire résultat** »*.

</details>

<details class="details--riche">
<summary>

**17. Pourquoi l'utilité VNM n'est-elle pas purement ordinale ?**

</summary>

Parce que la probabilité $\alpha$ telle que $b\sim(\alpha\circ a,\ (1-\alpha)\circ c)$ est **déterminée par les préférences** — *« c'est un nombre significatif »*. Et l'expected utility property donne

$$\frac{u(a)-u(b)}{u(b)-u(c)}=\frac{1-\alpha}{\alpha}$$

**Le ratio des différences d'utilité est donc le même pour toute représentation VNM.** Une information purement ordinale ne pourrait pas fixer un tel ratio.

</details>

<details class="details--riche">
<summary>

**18. Énoncer le théorème 2.8 et son idée de preuve.**

</summary>

$v$ représente les mêmes préférences avec la propriété d'espérance d'utilité **ssi** $v=\alpha+\beta u$ avec $\beta>0$.

**L'idée :** poser $\alpha_i$ tel que $u(a_i)=\alpha_iu(a_1)+(1-\alpha_i)u(a_n)$. Cela équivaut à l'énoncé de **préférence** $a_i\sim(\alpha_i\circ a_1,(1-\alpha_i)\circ a_n)$ — **indépendant de la représentation**. En l'appliquant à $v$, on obtient le même $\alpha_i$, d'où l'égalité des ratios (P.4), puis $v(a_i)=\alpha+\beta u(a_i)$.

**Le pivot :** (P.2) est un énoncé sur les préférences, pas sur $u$.

</details>

<details class="details--riche">
<summary>

**19. Qu'est-ce qui est invariant, et qu'est-ce qui ne l'est pas ?**

</summary>

| Objet | Invariant ? |
|---|---|
| l'**ordre** des paris |  |
| les **ratios de différences** d'utilité |  |
| la mesure d'**Arrow-Pratt** $-u''/u'$ |  |
| le **niveau** $u(g)$ |  |
| la **différence** $u(g)-u(g')$ |  |
| $u''$ seule |  |
| les comparaisons **interpersonnelles** |  |

⚠️ Une transformation strictement croissante **non affine** ($\ln u$, $u^3$) **détruit** la propriété d'espérance d'utilité.

</details>

<details class="details--riche">
<summary>

**20. Énoncer la définition 2.4 et son équivalence avec la concavité.**

</summary>

Pour $g=(p_1\circ w_1,\dots,p_n\circ w_n)$ :

$$\begin{array}{lll} u\big(E(g)\big)>u(g) & \text{averse au risque} & \iff u \text{ strictement concave}\\ u\big(E(g)\big)=u(g) & \text{neutre} & \iff u \text{ linéaire}\\ u\big(E(g)\big)<u(g) & \text{aimant le risque} & \iff u \text{ strictement convexe} \end{array}$$

C'est l'**inégalité de Jensen** : pour $u$ concave, $u\big(\sum p_iw_i\big)\geq\sum p_iu(w_i)$.

</details>

<details class="details--riche">
<summary>

**21. Sur la figure 2.6, que représentent $R$, $S$ et $T$ ?**

</summary>

Pour $g=(p\circ w_1,\ (1-p)\circ w_2)$ :

| Point | Coordonnées |
|---|---|
| $R$ | $\big(w_1,\ u(w_1)\big)$ |
| $S$ | $\big(w_2,\ u(w_2)\big)$ |
| $T=pR+(1-p)S$ | abscisse $E(g)$, **ordonnée $u(g)$** |

$u(g)$ est **sur la corde** ; $u\big(E(g)\big)$ est **sur la courbe**. La concavité place la courbe au-dessus.

</details>

<details class="details--riche">
<summary>

**22. Définir équivalent certain et prime de risque, et donner leur relation.**

</summary>

$$u(g)\equiv u(CE) \qquad\qquad u(g)\equiv u\big(E(g)-P\big) \qquad\qquad \boxed{P\equiv E(g)-CE}$$

Pour un agent **averse** préférant plus à moins : $CE<E(g)$ et $P>0$.

> *« Une personne averse au risque **"paiera" un montant positif de richesse pour éviter le risque** inhérent au pari. »*

Ordre sur l'axe : $w_1<CE<E(g)<w_2$.

</details>

<details class="details--riche">
<summary>

**23. Calculer $CE$ et $P$ pour $u=\ln w$ et un pari symétrique.**

</summary>

$g=\big(\tfrac12\circ(w_0+h),\ \tfrac12\circ(w_0-h)\big)$, $E(g)=w_0$.

$$\ln(CE)=\tfrac12\ln(w_0+h)+\tfrac12\ln(w_0-h)=\ln\sqrt{w_0^2-h^2}$$

$$CE=\sqrt{w_0^2-h^2} \qquad\qquad P=w_0-\sqrt{w_0^2-h^2}$$

**Lecture :** $CE$ est la moyenne **géométrique**, $E(g)$ la moyenne **arithmétique**. L'inégalité arithmético-géométrique **est** ici Jensen.

Pour $h$ petit : $P\approx\dfrac{h^2}{2w_0}=\tfrac12\sigma^2R_a(w_0)$.

</details>

<details class="details--riche">
<summary>

**24. Pourquoi $u''$ ne mesure-t-elle pas l'aversion au risque ?**

</summary>

Parce que sa **taille est arbitraire**. Par le théorème 2.8, $v=\alpha+\beta u$ représente les mêmes préférences, et $v''=\beta u''$.

En prenant $\beta=1000$, on multiplie $|u''|$ par mille **sans changer une seule préférence**.

Seul le **signe** de $u''$ a un sens ; sa magnitude n'en a aucun.

</details>

<details class="details--riche">
<summary>

**25. Définir la mesure d'Arrow-Pratt et justifier son invariance.**

</summary>

$$R_a(w)\equiv-\frac{u''(w)}{u'(w)}$$

**Invariance :** si $v=\alpha+\beta u$ avec $\beta>0$, alors $v'=\beta u'$ et $v''=\beta u''$, donc

$$R_a^v=-\frac{\beta u''}{\beta u'}=-\frac{u''}{u'}=R_a^u$$

> *« Ajouter une constante n'affecte ni le numérateur ni le dénominateur ; multiplier par une constante positive affecte les deux mais **laisse leur rapport inchangé**. »*

Références : **Arrow (1970)** et **Pratt (1964)**.

</details>

<details class="details--riche">
<summary>

**26. Comment démontre-t-on qu'un $R_a$ plus grand signifie un équivalent certain plus bas ?**

</summary>

Poser $h(x)=u\big(v^{-1}(x)\big)$.

1. $h'=\dfrac{u'\circ v^{-1}}{v'\circ v^{-1}}>0$ : $h$ est **croissante**.
2. Le signe de $h''$ est celui de $\dfrac{u''}{u'}-\dfrac{v''}{v'}=R_a^2-R_a^1<0$ : $h$ est **strictement concave**.
3. Par **Jensen** : $u(\hat w_1)=\sum_i p_ih\big(v(w_i)\big)<h\big(\sum_i p_iv(w_i)\big)=h\big(v(\hat w_2)\big)=u(\hat w_2)$.
4. $u$ étant croissante : $\hat w_1<\hat w_2$. $\blacksquare$

⚠️ **On ne compare jamais $u$ et $v$ directement** — elles sont définies à transformation affine près. Toute l'information est dans $h$.

</details>

<details class="details--riche">
<summary>

**27. Donner les trois formulations équivalentes de « 1 est plus averse que 2 ».**

</summary>

| # | Formulation | Nature |
|---|---|---|
| 1 | $R_a^1(w)>R_a^2(w)$ pour tout $w$ | **analytique** |
| 2 | $\hat w_1<\hat w_2$ pour tout pari — 1 accepte moins de paris | **comportementale** |
| 3 | $u=h\circ v$ avec $h$ strictement concave croissante (« concavification ») | **structurelle** |

</details>

<details class="details--riche">
<summary>

**28. Énoncer la classification d'Arrow et l'argument en faveur de DARA.**

</summary>

| Sigle | $R_a(w)$ |
|---|---|
| **DARA** | décroissante |
| **CARA** | constante |
| **IARA** | croissante |

> *« Sous **CARA**, il n'y aurait aucune plus grande disposition à accepter un petit pari à des niveaux de richesse plus élevés, et sous **IARA** nous avons un comportement plutôt **pervers** : plus la richesse est grande, plus on devient averse à accepter le même petit pari. **DARA** impose la restriction plus **plausible** que l'individu soit moins averse aux petits risques quand il est plus riche. »*

Exemples : $\ln w$ et CRRA sont DARA ; $-e^{-\theta w}$ est CARA ; la quadratique est **IARA**.

</details>

<details class="details--riche">
<summary>

**29. Quand un investisseur averse s'abstient-il de l'actif risqué ?**

</summary>

**Si et seulement si le rendement espéré de l'actif est $\leq0$.**

En $\beta^*=0$, la dérivée de l'objectif vaut $u'(w)\sum_i p_ir_i$, qui doit être $\leq0$. Comme $u'(w)>0$, cela exige $\sum_i p_ir_i\leq0$.

⚠️ **Corollaire contre-intuitif :** un agent averse **investit toujours un peu** dans un actif de rendement espéré strictement positif — aussi averse soit-il. Le gain est du **premier ordre** en $\beta$, le coût du risque du **second ordre**.

</details>

<details class="details--riche">
<summary>

**30. Pourquoi DARA rend-elle l'actif risqué « normal » ?**

</summary>

$$\frac{d\beta^*}{dw}=\frac{-\sum_i p_iu''(w+\beta^*r_i)r_i}{\sum_i p_iu''(w+\beta^*r_i)r_i^2}$$

Le dénominateur est **négatif** (aversion au risque). Il faut donc que le numérateur le soit.

Sous DARA : $R_a(w)>R_a(w+\beta^*r_i)$ si $r_i>0$, et $R_a(w)<R_a(w+\beta^*r_i)$ si $r_i<0$. **Dans les deux cas**, après multiplication par $r_i$ :

$$R_a(w)\,r_i > R_a(w+\beta^*r_i)\,r_i$$

*(le second cas s'obtient parce que multiplier par $r_i<0$ **retourne** l'inégalité)*. En prenant l'espérance et en utilisant $\sum_i p_ir_iu'(\cdot)=0$, le numérateur est négatif. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**31. Qu'est-ce qu'un prix d'assurance actuariellement équitable ?**

</summary>

Celui qui annule le profit espéré de l'assureur. Par euro d'assurance vendu :

$$\alpha(\rho-1)+(1-\alpha)\rho=0 \qquad\Longrightarrow\qquad \boxed{\rho=\alpha}$$

**Le prix par euro d'assurance égale la probabilité du sinistre.**

</details>

<details class="details--riche">
<summary>

**32. Démontrer qu'un agent averse s'assure complètement à prix équitable.**

</summary>

$$\max_x \ \alpha\,u(w_0-\alpha x-L+x)+(1-\alpha)\,u(w_0-\alpha x)$$

La condition du premier ordre, après division par $(1-\alpha)\alpha$ :

$$u'(w_0-\alpha x-L+x)=u'(w_0-\alpha x)$$

Comme l'agent est averse, $u''<0$, donc $u'$ est **strictement décroissante**, donc **injective**. L'égalité des utilités marginales impose l'égalité des richesses :

$$w_0-\alpha x-L+x=w_0-\alpha x \qquad\Longrightarrow\qquad x=L$$

À l'optimum, la richesse vaut $w_0-\alpha L$ **dans les deux états** — le risque est complètement éliminé. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**33. Que devient le résultat si l'assurance n'est pas actuariellement équitable ?**

</summary>

Si $\rho>\alpha$ (l'assureur prend une marge — le cas réel), la condition du premier ordre devient

$$\frac{u'(\text{accident})}{u'(\text{pas d'accident})}=\frac{\rho(1-\alpha)}{\alpha(1-\rho)}>1$$

donc $u'(\text{accident})>u'(\text{pas d'accident})$, donc — $u'$ décroissante — la richesse est **plus faible en cas d'accident**.

$$\boxed{x<L \quad\text{: la couverture est PARTIELLE}}$$

⚠️ Le résultat de couverture complète est **entièrement conditionné** à l'équité actuarielle.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Sur quoi portent les préférences au §2.4 ? | Sur des **paris** $g\in\mathcal{G}$, plus sur des paniers |
| La référence fondatrice ? | **von Neumann et Morgenstern (1944)** |
| Propriété essentielle des résultats $a_i$ ? | Ils **n'impliquent aucune incertitude** |
| Définition d'un pari simple ? | $(p_1\circ a_1,\dots,p_n\circ a_n)$, $p_i\geq0$, $\sum p_i=1$ |
| Pourquoi $A\subset\mathcal{G}_S$ ? | $(1\circ a_i)$ est un pari simple — le pari **dégénéré** |
| Quels paris composés sont exclus ? | Ceux à profondeur **infinie** (la loterie d'État) |
| Règle des probabilités effectives ? | **Multiplier** le long d'un chemin, **additionner** entre chemins exclusifs |
| Convention d'indexation ? | $a_1\succsim a_2\succsim\dots\succsim a_n$ — $a_1$ **meilleur**, $a_n$ **pire** |
| Axiome G3 ? | $\forall g\ \exists\alpha$ : $g\sim(\alpha\circ a_1,\ (1-\alpha)\circ a_n)$ |
| La défense de G3 par le livre ? | Traverser la ville pour 1 000 dollars **révèle déjà** une probabilité d'indifférence |
| Axiome G4 ? | $(\alpha\circ a_1,\dots)\succsim(\beta\circ a_1,\dots)$ **ssi** $\alpha\geq\beta$ |
| Le contre-exemple à G4 ? | Le **chasseur en safari** — le risque **pour lui-même** |
| Que G4 donne-t-il dans la preuve ? | L'**unicité** de $u(g)$ |
| Axiome G5 ? | $h_i\sim g_i$ pour tout $i$ ⟹ $h\sim g$ |
| Axiome G6 ? | Seules comptent les **probabilités effectives** |
| Le contre-exemple à G6 ? | Les **vacanciers de Las Vegas** — valeur du **processus** |
| Quel axiome est redondant ? | **G1** — G2+G3+G4 l'impliquent (ex. 2.22) |
| La propriété d'espérance d'utilité ? | $u(g)=\sum_i p_i\,u(a_i)$ |
| Sa conséquence majeure ? | $u$ est déterminée par ses **$n$ valeurs sur $A$** |
| Linéaire en quoi ? | En les **probabilités** — pas en les résultats |
| La construction du théorème 2.7 ? | $u(g)$ = l'unique nombre tel que $g\sim\big(u(g)\circ a_1,\ (1-u(g))\circ a_n\big)$ |
| Existence et unicité viennent de ? | **G3** et **G4** respectivement |
| Sur l'échelle construite, $u(a_1)$ et $u(a_n)$ ? | Toujours **1** et **0** |
| Comment construire une $u$ VNM en pratique ? | Poser **$n$ questions** de probabilité d'indifférence |
| Dans l'exemple 2.4, $u(4)=0{,}6$ signifie ? | Aversion : un neutre aurait répondu $0{,}5$ |
| Théorème 2.8 ? | $v$ VNM représente les mêmes préférences **ssi** $v=\alpha+\beta u$, $\beta>0$ |
| Le pivot de sa preuve ? | (P.2) est un énoncé sur les **préférences**, donc indépendant de la représentation |
| Qu'est-ce qui est invariant ? | L'**ordre**, les **ratios de différences**, $R_a$ |
| Qu'est-ce qui ne l'est pas ? | Le niveau, l'écart, $u''$, les comparaisons interpersonnelles |
| Peut-on prendre $\ln u$ d'une utilité VNM ? | **Non** — cela détruit la propriété d'espérance d'utilité |
| Définition 2.4 — averse au risque ? | $u\big(E(g)\big)>u(g)$ ⟺ $u$ **strictement concave** |
| Neutre ? | $u\big(E(g)\big)=u(g)$ ⟺ $u$ **linéaire** |
| Aimant le risque ? | $u\big(E(g)\big)<u(g)$ ⟺ $u$ **strictement convexe** |
| Quelle inégalité mathématique est en jeu ? | L'inégalité de **Jensen** |
| Ne pas confondre ? | $u(g)$ **est déjà** l'espérance d'utilité ; $u(E(g))$ est l'utilité de l'espérance |
| Sur la Fig. 2.6, où est $u(g)$ ? | **Sur la corde** $RS$ · $u(E(g))$ est **sur la courbe** |
| Équivalent certain ? | $CE$ tel que $u(CE)=u(g)$ |
| Prime de risque ? | $P$ tel que $u(g)=u\big(E(g)-P\big)$, soit $P=E(g)-CE$ |
| Ordre des quantités (agent averse) ? | $w_1<CE<E(g)<w_2$ |
| $CE$ pour $u=\ln w$ et pari symétrique ? | $\sqrt{w_0^2-h^2}$ — la moyenne **géométrique** |
| $P$ pour un petit risque ? | $P\approx\dfrac{h^2}{2w_0}=\tfrac12\sigma^2R_a(w_0)$ |
| Pourquoi pas $u''$ comme mesure ? | Sa **taille est arbitraire** : $v''=\beta u''$ |
| La mesure d'Arrow-Pratt ? | $R_a(w)=-\dfrac{u''(w)}{u'(w)}$ |
| Ses deux vertus ? | Le **signe** donne l'attitude · elle est **invariante** par affine positive |
| Les auteurs ? | **Arrow (1970)** et **Pratt (1964)** |
| La fonction-clé de la comparaison ? | $h(x)=u\big(v^{-1}(x)\big)$ |
| Signe de $h''$ ? | Celui de $R_a^2-R_a^1$ |
| $R_a^1>R_a^2$ implique quoi sur $h$ ? | $h$ **strictement concave** croissante |
| Et sur les équivalents certains ? | $\hat w_1<\hat w_2$ — 1 accepte **moins** de paris |
| Quel outil conclut la preuve ? | L'inégalité de **Jensen** |
| Le terme du livre pour $u=h\circ v$ ? | Une **« concavification »** de $v$ |
| DARA / CARA / IARA ? | $R_a$ **décroissante** / **constante** / **croissante** |
| Laquelle est plausible ? | **DARA** — moins averse aux petits risques quand plus riche |
| $R_a$ pour $\ln w$ ? | $1/w$ — **DARA** |
| $R_a$ pour $-e^{-\theta w}$ ? | $\theta$ — **CARA** |
| $R_a$ pour $w-bw^2$ ? | $\dfrac{2b}{1-2bw}$ — **IARA**, « pervers » |
| Quand s'abstient-on de l'actif risqué ? | **Ssi** son rendement espéré est $\leq0$ |
| Corollaire contre-intuitif ? | Un agent averse investit **toujours un peu** si $E(r)>0$ |
| Pourquoi ? | Gain du **premier ordre**, coût du risque du **second ordre** |
| Sous DARA, l'actif risqué est ? | **Normal** : $d\beta^*/dw>0$ |
| Le point subtil de cette preuve ? | Multiplier par $r_i<0$ **retourne** l'inégalité — d'où l'unification des deux cas |
| Prix actuariellement équitable ? | $\rho=\alpha$ — le prix par euro **égale la probabilité du sinistre** |
| Combien s'assure un agent averse à ce prix ? | $x=L$ — **couverture complète** |
| Sa richesse à l'optimum ? | $w_0-\alpha L$, **déterministe** |
| Le seul ingrédient de la preuve ? | $u'$ **strictement décroissante**, donc injective |
| Et si $\rho>\alpha$ ? | **Couverture partielle** : $x<L$ |
