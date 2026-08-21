# Fiche 520 — L'enchère optimale et les mécanismes allocativement efficaces (VCG)

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 9 « Auctions and Mechanism Design », §9.4 « Designing a Revenue Maximising Mechanism » et §9.5 « Designing Allocatively Efficient Mechanisms » (p. 444-484) |
| **Difficulté** | Avancé — le sommet technique du livre |
| **Temps d'étude estimé** | 160 min |
| **Prérequis** | Fiche 519 (mécanismes directs, compatibilité incitative, théorèmes 9.5 et 9.6) · fiche 514 (théorème de Gibbard-Satterthwaite) · fiche 515 (jeux bayésiens, a priori commun) · fiche 512 (efficacité de Pareto avec production) |
| **Concepts clés** | Principe de révélation, rationalité individuelle, revenu marginal virtuel, régularité, mécanisme de vente optimal, prix de réserve, enchère au second prix avec réserve, inefficacité du monopole discriminant, utilité quasi-linéaire, efficacité de Pareto ex post, fonction d'allocation, mécanisme de Vickrey-Clarke-Groves, externalité, dominance de la révélation véridique, équilibre budgétaire, mécanisme à externalité espérée, droits de propriété, contrainte de rationalité individuelle, mécanisme IR-VCG, surplus espéré, théorème d'impossibilité de Myerson-Satterthwaite, théorème de Coase |
| **Poids à l'examen** | Le **principe de révélation** et ce qu'il permet · la **réécriture (9.11)** du revenu · la **maximisation point par point** et $p_i^*$ · l'hypothèse de **régularité (9.18)** · le **revenu marginal** $MR_i(v_i)$ et son interprétation · le **théorème 9.9** *(second prix avec réserve $\rho^*$)* · la **définition 9.3** et la caractérisation par la somme des utilités · le **mécanisme VCG** et la **preuve du théorème 9.10** · le **théorème 9.11** *(table circulaire)* · l'**IR-VCG**, les $\psi_i^*$ et le **critère de surplus espéré** · l'**exemple 9.8** et ses **quatre leçons**. |

## 🎯 Vue d'ensemble

```
LE FIL DES §9.4 ET §9.5 : concevoir LE MEILLEUR mecanisme

  §9.4  MAXIMISER LE REVENU

     §9.4.1  LE PRINCIPE DE REVELATION
        « De toute procedure de vente et de son equilibre, on peut
          construire un mecanisme direct EQUIVALENT compatible
          incitativement. »
        =>  on peut RESTREINDRE la recherche a l'ensemble
            (GERABLE) des mecanismes directs incitatifs

     §9.4.2  LA RATIONALITE INDIVIDUELLE
        la participation est VOLONTAIRE  =>  cbar_i(0) <= 0

     §9.4.3  LE MECANISME OPTIMAL

        Reecriture du revenu (9.11) :

           R = INT SOMME_i p_i(v) [ v_i - (1 - F_i(v_i))/f_i(v_i) ]
                 . f_1 ... f_N dv   +   SOMME_i cbar_i(0)

        -> MAXIMISER POINT PAR POINT : donner l'objet a celui dont
           le crochet est LE PLUS GRAND -- ET POSITIF

        HYPOTHESE (9.18) de REGULARITE :
           v_i - (1 - F_i(v_i))/f_i(v_i)  STRICTEMENT CROISSANT

     §9.4.4  L'INTERPRETATION

        MR_i(v_i) = v_i - (1 - F_i(v_i))/f_i(v_i)  =  LE REVENU
        MARGINAL que le vendeur tire d'augmenter la probabilite
        d'assigner l'objet a i

        Le PAIEMENT : celui qui gagne paie r_i*(v_-i) -- LA PLUS
        GRANDE VALEUR QU'IL AURAIT PU DECLARER SANS GAGNER

     §9.4.5  SOUS SYMETRIE :  une SECOND PRIX AVEC PRIX DE RESERVE

           rho* - (1 - F(rho*))/f(rho*) = 0

        « Est-il etonnant que ces encheres soient si repandues ? »

  §9.5  L'EFFICACITE ALLOCATIVE

     Le cadre : X FINI d'etats sociaux, une monnaie, N individus,
     types T_i, A PRIORI COMMUN q, types INDEPENDANTS

     UTILITE QUASI-LINEAIRE :   v_i(x, t_i) + m

     DEF. 9.3  EFFICACITE EX POST : xhat(t) maximise SOMME_i v_i(x, t_i)

     DEF. 9.4-9.5  mecanismes directs, compatibilite incitative
     LE PRINCIPE DE REVELATION, a nouveau

     §9.5.4  LE MECANISME DE VICKREY-CLARKE-GROVES

        « CHACUN PAIE SON EXTERNALITE » :

        c_i^VCG(t) = SOMME_{j =/= i} v_j(xtilde_i(t_-i), t_j)
                   - SOMME_{j =/= i} v_j(xhat(t), t_j)

        THEOREME 9.10 : dire la VERITE est FAIBLEMENT DOMINANT
        -> le VCG est INCITATIF et EX POST EFFICACE

        MAIS il degage un SURPLUS  ->  pas d'equilibre budgetaire

     §9.5.5  LA TABLE CIRCULAIRE  (theoreme 9.11)
        chacun paie A SON VOISIN DE DROITE son EXTERNALITE ESPEREE
        -> budget EQUILIBRE, MAIS on PERD la dominance

     §9.5.6  LES DROITS DE PROPRIETE  ->  IR_i(t_i)

     §9.5.7  LE MECANISME IR-VCG
        subvention de participation  psi_i* = max ( IR_i - U_i^VCG )
        THEOREME 9.13 : SI l'IR-VCG degage un SURPLUS ESPERE,
        ALORS tout est possible

     §9.5.8  ET C'EST AUSSI NECESSAIRE  (theoreme 9.17)

        EXEMPLE 9.8 (MYERSON-SATTERTHWAITE) : un acheteur, un
        vendeur, valeurs uniformes ->  psi* = 1/2  >  1/3 = revenu
        ->  IMPOSSIBLE

     LES QUATRE LECONS :  les GREVES · LES DROITS DE PROPRIETE
     COMPTENT (limite du theoreme de COASE) · la PRIVATISATION ·
     la SYMETRIE de la propriete
```

> ⚠️ **Note de transcription — identique aux fiches 500-519.** Le PDF exporte **le signe moins comme « ! »** *(ainsi « $v_i\,!\,(1\,!\,F_i(v_i))/f_i(v_i)$ » signifie $v_i-\big(1-F_i(v_i)\big)/f_i(v_i)$)*, perd le **barré du $\neq$** *(« $j=i$ » signifie $j\neq i$)*, ainsi que $\sum$, $\int$, $\lambda$, $\psi$ *(qui devient parfois « ( »)* et $\rho$. Les indices et exposants sont fréquemment **recollés**. Toutes les formules citées ici sont **rétablies depuis la prose et VÉRIFIÉES par le calcul**. **Réparation de transcription, non ajout de contenu.**

## 🔴 Concept 1 — §9.4.1 : le principe de révélation

### 1.1 Le problème

> *« **Apparemment, trouver un mécanisme de vente MAXIMISANT LE REVENU est susceptible d'être une TÂCHE DIFFICILE. Étant donnée la LIBERTÉ de choisir N'IMPORTE QUELLE procédure de vente, PAR OÙ COMMENCER ?** »*

**Les questions ouvertes du §9.4** : *« Les enchérisseurs soumettent-ils des offres scellées ? Misent-ils **SÉQUENTIELLEMENT** ? Une **COMBINAISON** des deux ? **UNE ENCHÈRE EST-ELLE MÊME LE MEILLEUR mécanisme de vente ?** »*

### 🔴 1.2 L'observation clé

> *« **L'observation clé est de se rappeler COMMENT nous avons construit un mécanisme direct incitatif à partir de l'équilibre d'une enchère au premier prix, et comment l'issue du premier prix était EXACTEMENT RÉPLIQUÉE dans l'équilibre véridique du mécanisme direct.** »*

> *« **Il s'avère que LE MÊME TYPE DE CONSTRUCTION PEUT ÊTRE APPLIQUÉ À N'IMPORTE QUELLE PROCÉDURE DE VENTE.** C'est-à-dire, **étant donnée une procédure de vente ARBITRAIRE et un ÉQUILIBRE DE NASH dans lequel chaque enchérisseur emploie une stratégie associant à sa valeur un COMPORTEMENT MAXIMISANT SON PAIEMENT, nous pouvons construire UN MÉCANISME DIRECT INCITATIF ÉQUIVALENT.** »*

**Comment** : *« **les fonctions d'assignation et de coût requises envoient chaque vecteur de valeurs sur LES PROBABILITÉS ET LES COÛTS QUE CHAQUE ENCHÉRISSEUR SUBIRAIT SELON LES STRATÉGIES D'ÉQUILIBRE de la procédure originale.** »*

### 🔴 1.3 La conséquence — l'énoncé à retenir

> *« Par conséquent, **si une procédure de vente donne au vendeur un revenu espéré égal à $R$, ALORS UN MÉCANISME DIRECT INCITATIF LE FAIT AUSSI. Mais ceci signifie qu'AUCUN mécanisme de vente PARMI TOUS LES MÉCANISMES CONCEVABLES ne donne plus de revenu que le mécanisme direct incitatif MAXIMISANT LE REVENU.** »*

$$\boxed{\;\textbf{« Nous pouvons donc RESTREINDRE notre recherche à l'ensemble (GÉRABLE) des}\\\textbf{mécanismes directs incitatifs. Ainsi, NOUS AVONS CONSIDÉRABLEMENT SIMPLIFIÉ}\\\textbf{NOTRE PROBLÈME SANS RIEN PERDRE. »}\;}$$

> *« Cette technique **SIMPLE mais EXTRÊMEMENT IMPORTANTE** de réduction est une instance de ce qu'on appelle **LE PRINCIPE DE RÉVÉLATION. Ce principe est utilisé ENCORE ET ENCORE dans la théorie du design de mécanismes**, et nous le reverrons **en action au §9.5**. »*

## 🔴 Concept 2 — §9.4.2 : la rationalité individuelle

### 2.1 La contrainte supplémentaire

> *« **Parce que la participation des enchérisseurs est ENTIÈREMENT VOLONTAIRE, LE PAIEMENT ESPÉRÉ D'AUCUN enchérisseur ne peut être NÉGATIF étant donnée sa valeur. Sinon, chaque fois qu'il a cette valeur, IL NE PARTICIPERA SIMPLEMENT PAS.** »*

⟹ on restreint aux mécanismes **INDIVIDUELLEMENT RATIONNELS** : *« qui donnent à chaque enchérisseur, **quelle que soit sa valeur**, un paiement espéré **non négatif** dans l'équilibre véridique »*.

### 🔴 2.2 La réduction à une seule inégalité

$$u_i(v_i,v_i)=\bar p_i(v_i)v_i-\bar c_i(v_i)\ \geq\ 0 \qquad\forall v_i\in[0,1]$$

**Mais par le théorème 9.5(ii)** :

$$\bar c_i(v_i)=\bar c_i(0)+\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx$$

⟹

$$u_i(v_i,v_i)=-\bar c_i(0)+\int_0^{v_i}\bar p_i(x)dx\ \geq\ 0 \qquad\forall v_i$$

⚠️ *« **ce qui tient clairement SI ET SEULEMENT SI** »*

$$\boxed{\;\bar c_i(0)\ \leq\ 0\;} \tag{9.10}$$

> *« **Un mécanisme direct incitatif est individuellement rationnel SI ET SEULEMENT SI le COÛT ESPÉRÉ de chaque enchérisseur QUAND SA VALEUR EST ZÉRO est NON POSITIF.** »*

⚠️ **L'intégrale $\int_0^{v_i}\bar p_i(x)dx$ est toujours $\geq0$** — donc **seule la valeur zéro peut poser problème**.

## 🔴 Concept 3 — §9.4.3 : la réécriture du revenu (9.11)

### 3.1 Le problème complet

> *« Notre tâche est réduite à : **choisir un mécanisme direct $p_i(\cdot),c_i(\cdot)$ pour MAXIMISER** »*

$$R=\sum_{i=1}^{N}\int_0^1\left[\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx\right]f_i(v_i)dv_i+\sum_{i=1}^{N}\bar c_i(0)$$

**sous les contraintes :**

| # | La contrainte | Son origine |
|---|---|---|
| **(i)** | $\bar p_i(v_i)$ **non décroissante** | **Théorème 9.5(i)** |
| **(ii)** | $\bar c_i(v_i)=\bar c_i(0)+\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx$ | **Théorème 9.5(ii)** |
| **(iii)** | $\bar c_i(0)\leq0$ | **Rationalité individuelle** |

### 🔴 3.2 La transformation décisive

<details class="details--riche">
<summary>

**Les trois pas de la réécriture**

</summary>

**Pas 1 — développer et intervertir.**

$$R=\sum_i\left[\int_0^1\bar p_i(v_i)v_if_i(v_i)dv_i-\int_0^1\!\!\int_0^{v_i}\bar p_i(x)f_i(v_i)\,dx\,dv_i\right]+\sum_i\bar c_i(0)$$

> *« **En INTERVERTISSANT L'ORDRE D'INTÉGRATION dans l'intégrale itérée (i.e. de $dx\,dv_i$ à $dv_i\,dx$) »* :

$$R=\sum_i\left[\int_0^1\bar p_i(v_i)v_if_i(v_i)dv_i-\int_0^1\!\!\int_x^1\bar p_i(x)f_i(v_i)\,dv_i\,dx\right]+\sum_i\bar c_i(0)$$

$$=\sum_i\left[\int_0^1\bar p_i(v_i)v_if_i(v_i)dv_i-\int_0^1\bar p_i(x)\big(1-F_i(x)\big)dx\right]+\sum_i\bar c_i(0)$$

**Pas 2 — renommer la variable muette $x$ en $v_i$ et factoriser.**

$$R=\sum_i\int_0^1\bar p_i(v_i)\left[v_i-\frac{1-F_i(v_i)}{f_i(v_i)}\right]f_i(v_i)\,dv_i+\sum_i\bar c_i(0)$$

⚠️ **Le facteur $f_i(v_i)$ apparaît en divisant ET multipliant par lui** — c'est ce qui fait surgir le crochet.

**Pas 3 — remonter des $\bar p_i$ aux $p_i$.**

En rappelant que $\bar p_i(r_i)=\int\!\cdots\!\int p_i(r_i,v_{-i})f_{-i}(v_{-i})dv_{-i}$ :

$$\boxed{\;R=\int_0^1\!\!\cdots\!\int_0^1\left\{\sum_{i=1}^{N}p_i(v_1,\dots,v_N)\left[v_i-\frac{1-F_i(v_i)}{f_i(v_i)}\right]\right\}f_1(v_1)\cdots f_N(v_N)\,dv_1\cdots dv_N+\sum_{i=1}^{N}\bar c_i(0)\;} \tag{9.11}$$

</details>

## 🔴 Concept 4 — La maximisation point par point

### 🔴 4.1 L'idée

> *« Clairement, **(9.12) serait MAXIMISÉE si le terme entre ACCOLADES était MAXIMISÉ POUR CHAQUE VECTEUR DE VALEURS $v_1,\dots,v_N$.** »*

**L'observation structurelle :**

> *« Parce que les $p_i(v)$ sont **non négatifs et somment à UN OU MOINS**, les $N+1$ nombres »*

$$p_1(v),\ \dots,\ p_N(v),\ 1-\sum_{i=1}^{N}p_i(v)$$

*« sont **non négatifs et somment à UN** »*. On peut donc réécrire l'accolade comme

$$\sum_{i}p_i(v)\left[v_i-\frac{1-F_i(v_i)}{f_i(v_i)}\right]+\left(1-\sum_i p_i(v)\right)\cdot 0$$

> ⚠️ *« **c'est-à-dire JUSTE UNE MOYENNE PONDÉRÉE des $N+1$ nombres** »*

$$v_1-\frac{1-F_1(v_1)}{f_1(v_1)},\ \dots,\ v_N-\frac{1-F_N(v_N)}{f_N(v_N)},\ \boxed{0}$$

⚠️ **Le zéro est le « poids du vendeur »** — c'est ce qui rend légitime de **garder l'objet**.

### 4.2 La conclusion

> *« **Mais alors la somme entre accolades ne peut être PLUS GRANDE QUE LE PLUS GRAND de ces termes SI L'UN D'EUX EST POSITIF, et PAS PLUS GRANDE QUE ZÉRO si tous sont NÉGATIFS.** »*

$$\boxed{\;p_i^*(v_1,\dots,v_N)=\begin{cases}1,&\text{si } \ v_i-\dfrac{1-F_i(v_i)}{f_i(v_i)}\ >\ \max\left\{0,\ v_j-\dfrac{1-F_j(v_j)}{f_j(v_j)}\right\} \ \text{ pour tout } j\neq i\\[10pt]0,&\text{sinon}\end{cases}\;} \tag{9.13}$$

### 4.3 La borne supérieure

Puisque **(iii) impose $\bar c_i(0)\leq0$**, on obtient pour **tout** mécanisme incitatif :

$$R\ \leq\ \int_0^1\!\!\cdots\!\int_0^1\sum_{i}p_i^*(v)\left[v_i-\frac{1-F_i(v_i)}{f_i(v_i)}\right]f_1(v_1)\cdots f_N(v_N)\,dv \tag{9.14}$$

⚠️ **Le raisonnement suppose que les crochets sont DISTINCTS avec probabilité un** — *« nous introduirons une hypothèse sur les distributions qui le garantit sous peu »*.

## 🔴 Concept 5 — Les coûts optimaux et l'hypothèse de régularité

### 5.1 La construction des $c_i^*$

> *« La contrainte (ii) exige que $\bar c_i^*$ et $\bar p_i^*$ soient reliés. **Or, parce que les $\bar c_i^*$ et $\bar p_i^*$ sont des MOYENNES des $c_i^*$ et $p_i^*$, CETTE RELATION ENTRE MOYENNES TIENDRA SI ELLE TIENT POUR CHAQUE VECTEUR DE VALEURS.** »*

$$c_i^*(v_1,\dots,v_N)=c_i^*(0,v_{-i})+p_i^*(v_1,\dots,v_N)\,v_i-\int_0^{v_i}p_i^*(x,v_{-i})\,dx \tag{9.15}$$

**Pour satisfaire (iii)**, on pose $c_i^*(0,v_{-i})=0$, d'où :

$$\boxed{\;c_i^*(v_1,\dots,v_N)=p_i^*(v)\,v_i-\int_0^{v_i}p_i^*(x,v_{-i})\,dx\;} \tag{9.17}$$

> *« **Par construction, ce mécanisme satisfait (ii) et (iii), ET IL ATTEINT LA BORNE SUPÉRIEURE (9.14).** »*

### 🔴 5.2 Le problème restant : la contrainte (i)

> *« Si nous pouvons montrer que les $p_i^*$ satisfont **(i)**, alors ce mécanisme sera la solution. **Malheureusement, les $p_i^*$ définis en (9.16) N'ONT PAS BESOIN de satisfaire (i).** »*

> **L'HYPOTHÈSE DE RÉGULARITÉ.** Pour tout $i$ :
>
> $$\boxed{\;v_i-\frac{1-F_i(v_i)}{f_i(v_i)} \quad\textbf{est STRICTEMENT CROISSANT en } v_i\;} \tag{9.18}$$

> *« Cette hypothèse est satisfaite pour **un certain nombre de distributions, dont l'UNIFORME**. De plus, il vous est demandé de montrer qu'**elle tient chaque fois que chaque $F_i$ est une fonction CONVEXE** »*.

⚠️ **Elle fait DEUX choses :**

| # | Ce qu'elle garantit |
|---|---|
| **1** | La contrainte **(i)** est satisfaite |
| **2** | *« les nombres $v_1-(1-F_1)/f_1,\dots$ sont **DISTINCTS AVEC PROBABILITÉ UN** — une exigence que nous avions employée **mais laissée injustifiée jusqu'ici** »* |

> *(Note 17.)* *« Quand cette hypothèse **ÉCHOUE**, le mécanisme construit ici **n'est PAS optimal. On peut néanmoins construire l'optimal, mais nous ne le ferons pas ici.** L'hypothèse supplémentaire est **seulement par souci de SIMPLICITÉ**. »*

### 5.3 Pourquoi (9.18) implique (i)

<details class="details--riche">
<summary>

**L'argument**

</summary>

Fixons $v_{-i}$ et supposons $\bar v_i>v_i$ avec $p_i^*(v_i,v_{-i})=1$.

> *« Alors, par définition de $p_i^*$, **$v_i-(1-F_i(v_i))/f_i(v_i)$ est POSITIF et STRICTEMENT SUPÉRIEUR à $v_j-(1-F_j(v_j))/f_j(v_j)$ pour tout $j\neq i$**. »*

> *« Par conséquent, **parce que $v_i-(1-F_i(v_i))/f_i(v_i)$ est STRICTEMENT CROISSANT, il doit AUSSI être le cas que $\bar v_i-(1-F_i(\bar v_i))/f_i(\bar v_i)$ est à la fois POSITIF et STRICTEMENT SUPÉRIEUR aux mêmes quantités** »* ⟹ $p_i^*(\bar v_i,v_{-i})=1$.

⚠️ **Donc $p_i^*(\cdot,v_{-i})$ est NON DÉCROISSANTE pour chaque $v_{-i}$** ⟹ **$\bar p_i^*$ aussi**, étant une moyenne.

</details>

### 5.4 Le théorème 9.7

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.7 — Un mécanisme de vente optimal</span>

Si $N$ enchérisseurs ont des **valeurs privées indépendantes**, la valeur de $i$ étant tirée de la densité **continue positive $f_i$ satisfaisant (9.18)**, alors **le mécanisme direct défini par (9.16) et (9.17) donne au vendeur LE PLUS GRAND REVENU ESPÉRÉ POSSIBLE**.

</div>

> *« **En fin de compte, notre dur labeur a PAYÉ GÉNÉREUSEMENT.** »*

## 🔴 Concept 6 — §9.4.4 : le revenu marginal

### 🔴 6.1 La lecture de $v_i-(1-F_i(v_i))/f_i(v_i)$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que nous allons soutenir, c'est que $v_i-(1-F_i(v_i))/f_i(v_i)$ représente LE REVENU MARGINAL, $MR_i(v_i)$, que le vendeur obtient en AUGMENTANT LA PROBABILITÉ QUE L'OBJET SOIT ASSIGNÉ À L'ENCHÉRISSEUR $i$ QUAND SA VALEUR EST $v_i$.</span>

*« »*

</div>

<details class="details--riche">
<summary>

**L'argument intuitif du livre, en deux effets**

</summary>

| L'effet | Le raisonnement |
|---|---|
| **POSITIF** | *« Augmenter cette probabilité **permet au vendeur d'augmenter le coût jusqu'à $v_i$ de sorte à laisser son utilité INCHANGÉE. Parce que la densité de $v_i$ est $f_i(v_i)$, LE REVENU DU VENDEUR AUGMENTE AU TAUX $v_if_i(v_i)$.** »* |
| **NÉGATIF** | *« **la COMPATIBILITÉ INCITATIVE force une CONNEXION entre la probabilité que le bien soit assigné à $i$ de valeur $v_i$ et LE COÛT IMPOSÉ À TOUTES LES VALEURS PLUS ÉLEVÉES $v_i'>v_i$. En effet, selon la contrainte (ii), AUGMENTER la probabilité que les valeurs BASSES reçoivent l'objet RÉDUIT UN POUR UN le coût que toutes les valeurs plus élevées peuvent supporter. Parce qu'il y a une MASSE de $1-F_i(v_i)$ valeurs au-dessus de $v_i$, cette réduction totale est $1-F_i(v_i)$.** »* |

**Le net** : les revenus augmentent de $v_if_i(v_i)-\big(1-F_i(v_i)\big)$. *« Mais **c'est l'effet TOTAL dû à la densité $f_i(v_i)$ de valeurs égales à $v_i$** »* ⟹ **en divisant par $f_i(v_i)$** :

$$\boxed{\;MR_i(v_i)=v_i-\frac{1-F_i(v_i)}{f_i(v_i)}\;}$$

</details>

### 6.2 La règle d'allocation devient transparente

> *« **La règle d'allocation prend maintenant PARFAITEMENT SENS. Si $MR_i(v_i)>MR_j(v_j)$, le vendeur peut AUGMENTER SON REVENU en RÉDUISANT la probabilité que l'objet aille à $j$ et en AUGMENTANT celle qu'il aille à $i$.** »*

> *« Clairement, **le vendeur maximise son revenu en assignant TOUTE la probabilité à l'enchérisseur au $MR_i(v_i)$ LE PLUS ÉLEVÉ, TANT QU'IL EST POSITIF. SI TOUS LES REVENUS MARGINAUX SONT NÉGATIFS, LE VENDEUR FAIT MIEUX DE GARDER L'OBJET.** »*

⚠️ **C'est exactement la logique du monopoleur** : produire là où le **revenu marginal** est le plus grand, et **ne pas produire** s'il est **négatif**.

## 🔴 Concept 7 — Le paiement, et le théorème 9.8

### 7.1 Le perdant ne paie rien

<details class="details--riche">
<summary>

**L'argument**

</summary>

Si $p_i^*(v_i,v_{-i})=0$, alors par (9.17) :

$$c_i^*(v_i,v_{-i})=0\cdot v_i-\int_0^{v_i}p_i^*(x,v_{-i})dx$$

> *« Mais, **par l'hypothèse (9.18), $p_i^*(\cdot,v_{-i})$ est NON DÉCROISSANTE. Par conséquent, parce que $p_i^*(v_i,v_{-i})=0$, il doit être le cas que $p_i^*(x,v_{-i})=0$ POUR TOUT $x\leq v_i$. L'intégrale est donc NULLE.** »*

$$\boxed{\;c_i^*(v_i,v_{-i})=0 \ : \ \textbf{qui ne reçoit pas l'objet NE PAIE RIEN.}\;}$$

</details>

### 🔴 7.2 Le gagnant paie $r_i^*(v_{-i})$

<details class="details--riche">
<summary>

**La dérivation**

</summary>

Si $p_i^*(v_i,v_{-i})=1$ :

$$c_i^*(v_i,v_{-i})=v_i-\int_0^{v_i}p_i^*(x,v_{-i})\,dx$$

**La monotonie de $p_i^*(\cdot,v_{-i})$** *(qui ne prend que les valeurs 0 et 1)* implique qu'il existe un seuil $r_i^*(v_{-i})$ tel que $p_i^*(x,v_{-i})=0$ pour $x<r_i^*$ et $=1$ pour $x>r_i^*$. Donc

$$c_i^*(v_i,v_{-i})=v_i-\int_{r_i^*(v_{-i})}^{v_i}1\,dx=v_i-\big(v_i-r_i^*(v_{-i})\big)=\boxed{r_i^*(v_{-i})}$$

> ⚠️ *« Ainsi, **quand $i$ gagne, IL PAIE UN PRIX $r_i^*(v_{-i})$ QUI EST INDÉPENDANT DE SA PROPRE VALEUR DÉCLARÉE. De plus, LE PRIX QU'IL PAIE EST LA VALEUR MAXIMALE QU'IL AURAIT PU DÉCLARER, ÉTANT DONNÉES LES DÉCLARATIONS DES AUTRES, SANS RECEVOIR L'OBJET.** »*

</details>

### 7.3 Le théorème 9.8

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.8 — Le mécanisme de vente optimal, simplifié</span>

Si $N$ enchérisseurs ont des valeurs privées indépendantes de densités continues positives $f_i$ **avec chaque $v_i-(1-F_i(v_i))/f_i(v_i)$ strictement croissant**, alors le mécanisme suivant est **optimal** :

Pour chaque vecteur déclaré, **le vendeur assigne l'objet à l'enchérisseur $i$ dont $v_i-(1-F_i(v_i))/f_i(v_i)$ est STRICTEMENT LE PLUS GRAND ET POSITIF. S'il n'y en a aucun, LE VENDEUR GARDE L'OBJET et aucun paiement n'est fait.** S'il y en a un, **lui seul paie**, et il paie

$$r_i^*(v_{-i})=\textbf{la plus grande valeur qu'il aurait pu déclarer sans recevoir l'objet.}$$

</div>

### 🔴 7.4 Deux remarques importantes

> *« Comme nous le savons, ce mécanisme est **incitatif** — dire la vérité est un **équilibre de Nash**. **MAIS, EN FAIT, L'INCITATION À DIRE LA VÉRITÉ EST BIEN PLUS FORTE : dans ce mécanisme, C'EST UNE STRATÉGIE DOMINANTE pour chaque enchérisseur de déclarer véridiquement — MÊME SI LES AUTRES NE LE FONT PAS.** »*

> ⚠️ *« **UN INCONVÉNIENT** : pour l'implémenter, **le vendeur doit CONNAÎTRE les distributions $F_i$. Ceci CONTRASTE avec les enchères standard, que le vendeur peut implémenter SANS AUCUNE information sur les enchérisseurs.** »*

## 🔴 Concept 8 — §9.4.5 : les inefficacités, et l'enchère optimale sous symétrie

### 🔴 8.1 Les DEUX sources d'inefficacité

> *« **Dans le mécanisme optimal, l'objet n'est PAS toujours alloué efficacement.** »*

| # | La source | Sa description |
|---|---|---|
| **1** | **Le vendeur GARDE l'objet** | *« **même si sa valeur est ZÉRO et que tous les enchérisseurs ont des valeurs POSITIVES.** Ceci survient quand $v_i-(1-F_i(v_i))/f_i(v_i)\leq0$ **pour tous** »* |
| **2** | **Le mauvais enchérisseur reçoit l'objet** | *« **même quand le vendeur assigne l'objet, il peut ne PAS être assigné à celui de plus haute valeur** »* |

<details class="details--riche">
<summary>

**Comment la seconde inefficacité survient**

</summary>

*« Avec deux enchérisseurs **ASYMÉTRIQUES**, il existe $v$ tel que $v-(1-F_1(v))/f_1(v)\neq v-(1-F_2(v))/f_2(v)$. Supposons »*

$$v-\frac{1-F_1(v)}{f_1(v)}\ >\ v-\frac{1-F_2(v)}{f_2(v)}\ >\ 0$$

*« Quand les deux valeurs sont $v$, **c'est 1 qui reçoit l'objet. Mais, PAR CONTINUITÉ, même si la valeur de 1 CHUTE légèrement à $v'<v$**, tant que $v'$ est assez proche de $v$, l'inégalité »*

$$v'-\frac{1-F_1(v')}{f_1(v')}\ >\ v-\frac{1-F_2(v)}{f_2(v)}\ >\ 0$$

*« continuera de tenir. **Dès lors, 1 recevra l'objet MÊME SI SA VALEUR EST STRICTEMENT INFÉRIEURE à celle de 2.** »*

</details>

### 🔴 8.2 Le diagnostic — la comparaison avec le monopole du chapitre 4

> *« **La présence d'inefficacités n'est PAS SURPRENANTE. Après tout, LE VENDEUR EST UN MONOPOLEUR cherchant le profit maximal.** »*

| L'inefficacité | Son analogue |
|---|---|
| **La première** | *« Au chapitre 4, nous avons vu qu'**un monopoleur RESTREINT LA PRODUCTION en dessous du niveau efficace pour commander un PRIX PLUS ÉLEVÉ. Le même effet est présent. Mais, parce qu'il n'y a QU'UNE UNITÉ INDIVISIBLE, LE VENDEUR RESTREINT L'OFFRE EN GARDANT PARFOIS L'OBJET.** »* |
| **La seconde** | *« Elle **NE SURVENAIT PAS** au chapitre 4. **La raison est que là, nous supposions que le monopoleur ÉTAIT INCAPABLE DE DISTINGUER un consommateur d'un autre** et devait donc **facturer le MÊME prix à tous. Ici, LE VENDEUR PEUT distinguer $i$ de $j$ et SAIT que la distribution de $i$ est $F_i$. CETTE CONNAISSANCE SUPPLÉMENTAIRE LUI PERMET DE DISCRIMINER, CE QUI MÈNE À DES PROFITS PLUS ÉLEVÉS.** »* |

### 8.3 Sous symétrie : le prix de réserve

<details class="details--riche">
<summary>

**La simplification, pas à pas**

</summary>

Sous symétrie, $f_i=f$ et $F_i=F$. **Comme $v-(1-F(v))/f(v)$ est strictement croissante, l'objet va à celui de plus haute VALEUR $v_i$, tant que $v_i>\rho^*$**, où

$$\boxed{\;\rho^*-\frac{1-F(\rho^*)}{f(\rho^*)}=0\;} \tag{9.19}$$

*(Un tel $\rho^*$ **unique existe** — exercice.)*

**Que paie le gagnant ?** *« Il n'obtient pas l'objet à moins que sa déclaration soit **strictement la plus haute ET strictement au-dessus de $\rho^*$**. Donc **la plus grande déclaration possible SANS recevoir l'objet est LA PLUS GRANDE des autres valeurs OU $\rho^*$, SELON CE QUI EST LE PLUS GRAND.** »*

$$\boxed{\;\textbf{Le gagnant paie } \max\Big\{\rho^*,\ \max_{j\neq i}v_j\Big\}\;}$$

</details>

### 🔴 8.4 Le théorème 9.9

> ⚠️ *« **REMARQUABLEMENT, ce mécanisme optimal peut être MIMÉ en organisant UNE ENCHÈRE AU SECOND PRIX AVEC PRIX DE RÉSERVE $\rho^*$** — c'est-à-dire une enchère où **l'enchérisseur dont l'offre est la plus haute ET STRICTEMENT AU-DESSUS DU PRIX DE RÉSERVE gagne et paie LA DEUXIÈME OFFRE OU LE PRIX DE RÉSERVE, SELON CE QUI EST LE PLUS GRAND. Si aucune offre n'est au-dessus, LE VENDEUR GARDE L'OBJET.** »*

> *« **Ceci est optimal parce que, JUSTE COMME dans une enchère au second prix standard, IL EST DOMINANT DE MISER SA VALEUR dans une enchère au second prix AVEC PRIX DE RÉSERVE.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.9 — Une enchère optimale sous symétrie</span>

Si $N$ enchérisseurs ont des valeurs privées indépendantes tirées de la même densité **continue positive $f$**, où $v-(1-F(v))/f(v)$ est **strictement croissant**, alors **une ENCHÈRE AU SECOND PRIX AVEC PRIX DE RÉSERVE $\rho^*$ satisfaisant $\rho^*-(1-F(\rho^*))/f(\rho^*)=0$ MAXIMISE le revenu espéré du vendeur.**

</div>

> *« **Vous pourriez vous interroger sur les trois autres enchères. Ajouter un prix de réserve approprié les rend-il optimales aussi ? LA RÉPONSE EST OUI** »* *(laissé en exercice)*.

### 8.5 La boucle est bouclée

> *« **Nous avons donc bouclé la boucle. Les quatre enchères standard donnent toutes le MÊME revenu sous symétrie. De plus, EN LES COMPLÉTANT PAR UN PRIX DE RÉSERVE APPROPRIÉ, LE VENDEUR MAXIMISE SON REVENU ESPÉRÉ.** »*

$$\boxed{\;\textbf{« Est-il alors ÉTONNANT que ces enchères soient d'un usage si RÉPANDU ? »}\;}$$

## 🔴 Concept 9 — §9.5 : le cadre de l'efficacité allocative

### 9.1 Le changement d'objectif

> *« Nous détournons maintenant notre attention **de la maximisation du profit vers L'EFFICACITÉ ALLOCATIVE. LA QUESTION DE BASE EST COMMENT ATTEINDRE UNE ISSUE PARETO-EFFICACE QUAND DES PIÈCES CRITIQUES D'INFORMATION SONT DÉTENUES PRIVÉMENT PAR LES INDIVIDUS.** Une telle information pourrait inclure **les préférences individuelles, les coûts de production, le revenu, etc.** »*

### 9.2 Le modèle

| L'élément | Sa spécification |
|---|---|
| $X$ | L'ensemble des **états sociaux** — **FINI**, comme au chapitre 6 |
| La **monnaie** | *« un bien distingué appelé « **MONNAIE** » »* |
| Les préférences | Les individus se soucient de $x$ **ET** de **combien de monnaie ils ont** |
| $T_i$ | L'ensemble **fini** des **types** de $i$ |
| $q$ | Un **A PRIORI COMMUN**, avec $q(t)>0$ et **types INDÉPENDANTS** : $q(t)=q_1(t_1)\cdots q_N(t_N)$ |

> ⚠️ *« **L'état social ne décrit PAS complètement tout ce qui est pertinent pour l'utilité. Pour tout état social fixé, un individu peut UTILISER SA MONNAIE POUR ACHETER DES MARCHANDISES DÉSIRABLES QUI SONT INDÉPENDANTES DE, ET N'ONT AUCUN EFFET SUR, L'ÉTAT SOCIAL.** »*

> *« L'indépendance implique qu'**aucun type d'individu ne fournit d'information sur les types des autres** »*.

### 🔴 9.3 La quasi-linéarité

> *« Pour le reste du chapitre, nous restreignons le domaine des préférences à celles représentables par des **FONCTIONS D'UTILITÉ QUASI-LINÉAIRES** : si $i$ a $m$ dollars et $x$ est l'état social, son utilité **VNM** est »*

$$\boxed{\;v_i(x,t_i)+m\;}$$

> *« Parce que nous interprétons $m$ comme de la monnaie, **$v_i(x,t_i)$ est correctement interprétée comme LA VALEUR, EN DOLLARS, que $i$ place sur l'état social $x$ quand son type est $t_i$**. »*

> ⚠️ *« Notez que **la valeur de $i$ pour $x$ dépend SEULEMENT de SON type $t_i$ et PAS des types des autres. Chaque individu a donc des VALEURS PRIVÉES. Par conséquent, JUSTE COMME AU §9.2, C'EST UN MODÈLE À VALEURS PRIVÉES INDÉPENDANTES.** »*

> *(Note 20.)* *« En fait, **le modèle à un seul bien du §9.2 est LUI-MÊME UN CAS PARTICULIER** d'un modèle quasi-linéaire à valeurs privées indépendantes. »*

### 9.4 L'exemple 9.3 : la piscine ou le pont

> *« Une **petite ville** avec $N$ individus a été **sélectionnée par l'État** pour recevoir **soit une nouvelle PISCINE ($S$) soit un nouveau PONT ($B$)** et doit décider lequel. »*

$$X=\{S,B\} \qquad\qquad v_i(x,t_i)=\begin{cases}t_i+5,&\text{si } x=S\\2t_i,&\text{si } x=B\end{cases}$$

où $t_i$ est **équiprobable parmi $\{1,2,\dots,9\}$**, **indépendamment** entre individus.

> ⚠️ *« Chaque individu est donc **aussi susceptible de préférer STRICTEMENT la piscine** ($t_i\in\{1,2,3,4\}$) **que de préférer STRICTEMENT le pont** ($t_i\in\{6,7,8,9\}$). **SEUL L'INDIVIDU LUI-MÊME sait lequel est le cas ET DE COMBIEN il préfère l'un à l'autre. Et PLUS LE TYPE EST EXTRÊME, PLUS il préfère l'un des deux états.** »*

### 🔴 9.5 La force de l'hypothèse de quasi-linéarité

> *« **La quasi-linéarité est une hypothèse FORTE. Elle implique qu'IL Y A UN TAUX COMMUN AUQUEL L'UTILITÉ PEUT ÊTRE SUBSTITUÉE ENTRE INDIVIDUS, quel que soit l'état social et quel que soit** [le niveau de richesse]. »*

**Sa conséquence** *(le passage précédant la définition 9.3)* : un état social $x$ **n'est PAS Pareto-efficace** dès qu'il existe $y$ avec

$$\sum_{i=1}^{N}v_i(y)\ >\ \sum_{i=1}^{N}v_i(x) \tag{9.21}$$

<details class="details--riche">
<summary>

**La construction des transferts compensatoires**

</summary>

> *« **Merely passer de $x$ à $y$ n'a PAS besoin de résulter en une amélioration de Pareto, parce que certaines utilités peuvent BAISSER. L'IDÉE CLÉ EST DE COMPENSER ceux dont l'utilité baisse EN LEUR TRANSFÉRANT DU REVENU de ceux dont l'utilité monte. C'EST ICI QUE LE TAUX COMMUN AUQUEL LE REVENU SE TRADUIT EN UTILITÉ EST ABSOLUMENT CENTRAL.** »*

$$\tau_i=v_i(x)-v_i(y)+\frac{1}{N}\sum_{i=1}^{N}\big(v_i(y)-v_i(x)\big)$$

> *« Si $\tau_i>0$, $i$ **reçoit** $\tau_i$ dollars ; si $\tau_i<0$, il est **taxé**. **Par construction, les $\tau_i$ SOMMENT À ZÉRO** — ce sont donc bien des **transferts**. »*

**Le changement d'utilité de $i$** est $v_i(y)+\tau_i-v_i(x)$, qui vaut

$$\frac{1}{N}\sum_{j}\big(v_j(y)-v_j(x)\big)\ >\ 0 \quad\text{par (9.21)}$$

⚠️ **Chacun gagne EXACTEMENT le même montant** : $1/N$ du gain social total.

> *(Note 21.)* *« Nous supposons implicitement que **les individus taxés ONT SUFFISAMMENT DE REVENU pour payer la taxe**. »*

</details>

## 🔴 Concept 10 — L'efficacité de Pareto ex post

### 10.1 Les trois moments

> *« Il y a **PLUSIEURS STADES** auxquels les économistes pensent typiquement l'efficacité de Pareto : »*

| Le stade | Ce que chacun sait |
|---|---|
| **EX ANTE** | *« **avant** que les individus découvrent leurs types »* |
| **INTÉRIMAIRE** | *« chacun ne connaît que **SON PROPRE** type »* |
| **EX POST** | *« **tous les types sont connus de tous** »* |

> *« **En général, PLUS IL Y A D'INCERTITUDE, PLUS GRANDE EST LA PORTÉE POUR UNE ASSURANCE MUTUELLEMENT BÉNÉFIQUE. Nous attendons donc que l'efficacité EX ANTE implique l'efficacité INTÉRIMAIRE, qui implique l'efficacité EX POST. NOUS NOUS CONCENTRERONS SUR LA DERNIÈRE.** »*

### 10.2 La fonction d'allocation

> *« Parce que les préférences dépendent des types, **atteindre des issues ex post efficaces exigera TYPIQUEMENT que L'ÉTAT SOCIAL DÉPENDE DES TYPES** »* ⟹ on appelle **fonction d'allocation** une fonction $x:T\to X$.

> *(Note 22.)* *« Nous ne l'appelons **PAS** une fonction de choix social, comme au §6.5, **parce que nous n'exigeons PAS que le RANG de $x(\cdot)$ soit TOUT $X$**. »*

### 10.3 La définition 9.3

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 9.3 — Efficacité de Pareto ex post</span>

Une fonction d'allocation $\hat x:T\to X$ est **ex post Pareto-efficace** si, **pour chaque $t\in T$**, $\hat x(t)$ résout

$$\boxed{\;\max_{x\in X}\ \sum_{i=1}^{N}v_i(x,t_i)\;}$$

</div>

> *« Ainsi, $\hat x$ est ex post efficace si, **pour chaque vecteur de types, l'état social MAXIMISE LA SOMME DES UTILITÉS EX POST**. »*

⚠️ **C'est la quasi-linéarité qui autorise cette caractérisation par une simple somme.**

## 🔴 Concept 11 — §9.5.3 : le principe de révélation, à nouveau

### 🔴 11.1 L'immensité de l'espace des mécanismes

> *« **Les possibilités sont en fait plutôt DÉCOURAGEANTES.** Par exemple, **nous pourrions demander aux individus UN À UN d'annoncer PUBLIQUEMENT leur type (bien sûr ils pourraient MENTIR). Nous pourrions ensuite demander si quelqu'un croit que quelqu'un d'autre a menti, en PUNISSANT CONVENABLEMENT (via des taxes) ceux dont les annonces sont DOUTÉES PAR ASSEZ D'AUTRES** — l'espoir étant que cela encourage l'honnêteté. »*

> *« D'autre part, **nous pourrions ne PAS leur demander leurs types du tout. Nous pourrions leur demander de VOTER directement pour l'état social. Mais QUEL SYSTÈME DE VOTE ? La règle de PLURALITÉ ? La majorité PAR PAIRES avec égalités brisées au hasard ? Les votes doivent-ils être à BULLETIN SECRET ? Ou PUBLICS ET SÉQUENTIELS ?** »*

> *« **Comme vous le sentez, NOUS POURRIONS CONTINUER ENCORE ET ENCORE. Il y a des possibilités SANS FIN.** »*

$$\boxed{\;\textbf{« Heureusement, JUSTE COMME dans le cadre de maximisation du revenu,}\\\textbf{LE PRINCIPE DE RÉVÉLATION S'APPLIQUE ICI et nous permet de LIMITER}\\\textbf{notre recherche aux mécanismes DIRECTS INCITATIFS. »}\;}$$

### 11.2 Les définitions 9.4 et 9.5

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 9.4 — Mécanismes directs</span>

Une collection de **fonctions d'assignation de probabilité $p_x(t_1,\dots,t_N)$, UNE POUR CHAQUE $x\in X$**, et de $N$ **fonctions de coût** $c_i(t_1,\dots,t_N)$. *« **Parce qu'UN état social DOIT être choisi, nous exigeons $\sum_{x\in X}p_x(t)=1$ pour tout $t\in T$.** »*

</div>

⚠️ **La différence avec la définition 9.1** : ici on indexe par **les états sociaux**, et **la somme vaut exactement 1**.

> *« La définition 9.4 devient **équivalente** à la 9.1 quand **(i)** il y a **un seul objet**, **(ii)** il y a **$N+1$ individus : $N$ enchérisseurs et un vendeur**, et **(iii)** les états sociaux sont les **$N+1$ allocations** où soit un enchérisseur soit le vendeur finit avec le bien. »*

$$\bar p_i^x(r_i)=\sum_{t_{-i}}q_{-i}(t_{-i})p_x(r_i,t_{-i}) \qquad \bar c_i(r_i)=\sum_{t_{-i}}q_{-i}(t_{-i})c_i(r_i,t_{-i}) \tag{9.22}$$

$$u_i(r_i,t_i)=\sum_{x\in X}\bar p_i^x(r_i)\,v_i(x,t_i)-\bar c_i(r_i) \tag{9.23}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 9.5 — Mécanismes directs compatibles incitativement</span>

$u_i(r_i,t_i)$ est **maximisé en $r_i=t_i$** quand les autres rapportent véridiquement ⟹ *« **c'est un ÉQUILIBRE BAYÉSIEN-NASHIEN que chacun rapporte son type véridiquement** »*.

</div>

### 🔴 11.3 L'argument du principe de révélation, en entier

> *« Supposons que nous parvenions à concevoir **un jeu sous forme extensive, POSSIBLEMENT TRÈS COMPLEXE**. […] Tout « équilibre » qu'ils jouent **(Nash, parfait en sous-jeux, séquentiel) sera un ÉQUILIBRE BAYÉSIEN-NASHIEN de la forme stratégique**. Supposons que dans un tel équilibre, **un état social ex post efficace soit TOUJOURS CERTAIN de survenir. Nous dirions alors que le mécanisme IMPLÉMENTE avec succès une issue ex post efficace.** »*

> ⚠️ *« **Selon le principe de révélation, UN MÉCANISME DIRECT INCITATIF PEUT FAIRE EXACTEMENT LA MÊME CHOSE. VOICI COMMENT. Au lieu que les individus jouent leurs stratégies EUX-MÊMES, concevez un nouveau mécanisme (direct) QUI JOUE LEURS STRATÉGIES POUR EUX APRÈS QU'ILS ONT RAPPORTÉ LEURS TYPES.** »*

> *« Par conséquent, **si les autres rapportent honnêtement, alors, DE VOTRE PERSPECTIVE, C'EST COMME SI VOUS PARTICIPIEZ AU JEU EXTENSIF ORIGINAL contre eux. Mais dans ce jeu, IL ÉTAIT OPTIMAL pour vous d'effectuer les actions spécifiées par votre stratégie CONDITIONNELLEMENT À VOTRE TYPE RÉEL. Il est donc OPTIMAL de RAPPORTER VOTRE TYPE VÉRIDIQUEMENT dans le nouveau mécanisme, de sorte que CES MÊMES ACTIONS soient effectuées EN VOTRE NOM.** »*

> *« **C'est tout ce qu'il y a à dire !** »*

**Vocabulaire** : un mécanisme direct incitatif est **ex post efficace** *« s'il assigne probabilité un à un ensemble d'états sociaux ex post efficaces pour tout vecteur de types rapportés »*.

## 🔴 Concept 12 — §9.5.4 : le mécanisme de Vickrey-Clarke-Groves

### 🔴 12.1 L'analogie avec le second prix

> *« **Un trait INTÉRESSANT du mécanisme VCG est qu'il peut être pensé comme UNE GÉNÉRALISATION DE L'ENCHÈRE AU SECOND PRIX.** »*

> *« Cette enchère est parfois décrite comme une où **LE GAGNANT « PAIE SON EXTERNALITÉ ». La raison est que SI LE GAGNANT N'ÉTAIT PAS PRÉSENT, l'enchérisseur de deuxième valeur aurait gagné. Ainsi, LE GAGNANT, PAR SA SEULE PRÉSENCE, EMPÊCHE la deuxième valeur d'être réalisée — IL IMPOSE UNE EXTERNALITÉ. Bien sûr, IL PAIE PRÉCISÉMENT LE MONTANT DE L'EXTERNALITÉ QU'IL IMPOSE, et le résultat final est EFFICACE.** »*

### 12.2 La construction de l'externalité

Soit $\hat x:T\to X$ **une fonction d'allocation ex post efficace** *(« une telle solution EXISTE toujours parce que $X$ est FINI ; s'il y en a plusieurs, en choisir une »)*.

> *« **L'ASTUCE pour calculer l'externalité de $i$ est de penser À LA DIFFÉRENCE QUE SA PRÉSENCE FAIT À L'UTILITÉ TOTALE DES AUTRES.** »*

| La situation | L'utilité totale des autres |
|---|---|
| **$i$ PRÉSENT** | $\displaystyle\sum_{j\neq i}v_j\big(\hat x(t),t_j\big)$ |
| **$i$ ABSENT** | $\displaystyle\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)$ où $\tilde x^i(t_{-i})$ **résout $\max_{x\in X}\sum_{j\neq i}v_j(x,t_j)$** |

$$\boxed{\;\textbf{L'EXTERNALITÉ de } i \ = \ \sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)-\sum_{j\neq i}v_j\big(\hat x(t),t_j\big)\;}$$

> ⚠️ *« Notez que **l'externalité est TOUJOURS NON NÉGATIVE et typiquement POSITIVE parce que, PAR DÉFINITION, $\tilde x^i(t_{-i})$ MAXIMISE la somme des utilités des $j\neq i$**. »*

> *« **Vous devriez vous convaincre que, dans le cas d'un seul bien, l'externalité de chacun est ZÉRO SAUF pour l'individu de plus haute valeur, dont l'externalité est LA DEUXIÈME PLUS HAUTE VALEUR — exactement comme il se doit.** »*

### 12.3 La définition 9.6

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 9.6 — Le mécanisme de Vickrey-Clarke-Groves</span>

Chacun **rapporte simultanément son type** au concepteur. Si le vecteur rapporté est $t$, **l'état social $\hat x(t)$ est choisi**. En outre, **chaque individu $i$ paie**

$$c_i^{\text{VCG}}(t)=\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)-\sum_{j\neq i}v_j\big(\hat x(t),t_j\big)$$

C'est-à-dire, **CHACUN PAIE SON EXTERNALITÉ, calculée sur les types RAPPORTÉS.**

</div>

> *« **L'IDÉE CLÉ derrière le VCG est de définir les coûts de sorte que CHACUN INTERNALISE L'EXTERNALITÉ QUE, PAR SON RAPPORT, IL IMPOSE AU RESTE DE LA SOCIÉTÉ.** »*

*(D'après **Vickrey (1961)**, **Clarke (1971)** et **Groves (1973)**, *« qui ont indépendamment fourni des contributions importantes »*.)*

### 12.4 L'exemple 9.4 : le VCG pour la ville

<details class="details--riche">
<summary>

**La construction complète**

</summary>

**La fonction d'allocation efficace** : construire le pont ssi $\sum_i v_i(B,t_i)>\sum_i v_i(S,t_i)$, i.e. $\sum_i 2t_i>\sum_i(t_i+5)$ :

$$\hat x(t)=\begin{cases}B,&\text{si } \displaystyle\sum_{i=1}^{N}(t_i-5)>0\\S,&\text{sinon}\end{cases}$$

*(Note 26 : *« la piscine est construite si les deux sommes sont **ÉGALES** »*.)*

**Quand l'externalité est-elle nulle ?**

> *« Supposons que les autres rapportent des types **très élevés**, e.g. $t_j=9$ pour tout $j\neq i$. Alors, **s'il y a au moins deux autres individus, LE PONT SERA CONSTRUIT QUEL QUE SOIT le rapport de $i$ — et même QU'IL SOIT PRÉSENT OU NON. Dès lors, son externalité, et donc son coût, EST ZÉRO.** »*

⚠️ **VOCABULAIRE** : *« $i$ est **PIVOT** pour l'état $x$ au vecteur $t$ quand **sa présence CHANGE l'état social de $x'$ à $x$** »*.

**$i$ est pivot pour $B$** ssi $\sum_{j=1}^N(t_j-5)>0$ **ET** $\sum_{j\neq i}(t_j-5)\leq0$.

$$\boxed{\;c_i^{\text{VCG}}(t)=\begin{cases}\displaystyle\sum_{j\neq i}(5-t_j),&\text{si } i \text{ est PIVOT pour } B\\[8pt]\displaystyle\sum_{j\neq i}(t_j-5),&\text{si } i \text{ est PIVOT pour } S\\[8pt]0,&\text{sinon}\end{cases}\;}$$

**La vérification du premier cas** : *« son externalité est $\sum_{j\neq i}(t_j+5)-\sum_{j\neq i}2t_j$ — **la différence entre l'utilité totale des autres QUAND IL EST ABSENT et QUAND IL EST PRÉSENT** »* $=\sum_{j\neq i}(5-t_j)$

</details>

### 12.5 Le théorème 9.10

> *« **Jusqu'ici tout va bien, mais LE VCG RÉUSSIRA-T-IL EFFECTIVEMENT ? Par construction, il choisit une issue efficace SUR LA BASE DES TYPES RAPPORTÉS. Cependant, LES INDIVIDUS SONT LIBRES DE MENTIR, et s'ils le font, l'issue ne sera typiquement PAS efficace par rapport aux VRAIS types.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.10 — La révélation véridique est dominante dans le VCG</span>

Dans le mécanisme VCG, il est **une stratégie FAIBLEMENT DOMINANTE** pour chaque individu de rapporter son type **véridiquement**. Dès lors, **le VCG est COMPATIBLE INCITATIVEMENT et EX POST EFFICACE**.

</div>

<details class="details--riche">
<summary>

**La preuve — trois lignes d'algèbre**

</summary>

Les autres rapportent $t_{-i}$ *( **pas nécessairement véridiquement**)*, $i$ est de type $t_i$ et rapporte $r_i$. Son utilité est

$$v_i\big(\hat x(r_i,t_{-i}),t_i\big)-c_i^{\text{VCG}}(r_i,t_{-i}) \tag{P.1}$$

> ⚠️ *« Notez que **$\hat x(\cdot)$ et $c^{\text{VCG}}(\cdot)$ sont évalués au type RAPPORTÉ $r_i$, tandis que $v_i(x,\cdot)$ est évaluée au type RÉEL $t_i$**. »*

**En substituant la définition du coût :**

$$\begin{aligned}
&v_i\big(\hat x(r_i,t_{-i}),t_i\big)-\left[\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)-\sum_{j\neq i}v_j\big(\hat x(r_i,t_{-i}),t_j\big)\right]\\[6pt]
&\qquad=\ \underbrace{\sum_{j=1}^{N}v_j\big(\hat x(r_i,t_{-i}),t_j\big)}_{\textbf{contient } r_i}\ -\ \underbrace{\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)}_{\textbf{NE contient PAS } r_i}
\end{aligned} \tag{P.2}$$

> ⚠️ *« **$r_i$ n'apparaît QUE DANS LA PREMIÈRE SOMMATION**, il suffit donc de montrer que »*

$$\sum_{j=1}^{N}v_j\big(\hat x(t_i,t_{-i}),t_j\big)\ \geq\ \sum_{j=1}^{N}v_j\big(\hat x(r_i,t_{-i}),t_j\big) \tag{P.3}$$

> *« **Mais PAR LA DÉFINITION MÊME de $\hat x(t_i,t_{-i})$** : »*

$$\sum_{j=1}^{N}v_j\big(\hat x(t_i,t_{-i}),t_j\big)\geq\sum_{j=1}^{N}v_j(x,t_j) \qquad\textbf{pour TOUT } x\in X$$

> *« Dès lors, **(P.3) est satisfaite parce que $\hat x(r_i,t_{-i})\in X$**. »* $\blacksquare$

$$\boxed{\;\textbf{L'individu qui rapporte véridiquement MAXIMISE LA SOMME DES UTILITÉS —}\\\textbf{c'est exactement ce que le VCG lui fait internaliser.}\;}$$

</details>

## 🔴 Concept 13 — Les trois remarques sur le VCG

### 13.1 Le surplus

> *« **Parce que le coût de chacun, $c_i^{\text{VCG}}(t)$, est TOUJOURS NON NÉGATIF, LE MÉCANISME NE FAIT JAMAIS DE DÉFICIT ET DÉGAGE TYPIQUEMENT UN SURPLUS.** »*

### 🔴 13.2 La participation volontaire

> *« On pourrait se demander si **un individu préférerait ÉVITER de payer son coût EN NE PARTICIPANT PAS**. Pour traiter correctement cette question, **nous devons spécifier ce qui arriverait s'il ne participait pas. Une spécification ÉVIDENTE est de supposer que le VCG serait appliqué COMME D'HABITUDE, MAIS SEULEMENT À CEUX QUI PARTICIPENT.** »*

<details class="details--riche">
<summary>

**La démonstration que la participation est un équilibre**

</summary>

**S'il participe** *(et tous rapportent véridiquement)* :

$$v_i\big(\hat x(t),t_i\big)-c_i^{\text{VCG}}(t)=\sum_{j=1}^{N}v_j\big(\hat x(t),t_j\big)-\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big) \tag{9.24}$$

**S'il ne participe pas** : *« il évite le coût, **mais l'état social devient $\tilde x^i(t_{-i})$** »* ⟹ son utilité est

$$v_i\big(\tilde x^i(t_{-i}),t_i\big) \tag{9.25}$$

**Par la définition de $\hat x(t)$** *(qui maximise sur tout $X$, et $\tilde x^i(t_{-i})\in X$)* :

$$\sum_{j=1}^{N}v_j\big(\hat x(t),t_j\big)\ \geq\ \sum_{j=1}^{N}v_j\big(\tilde x^i(t_{-i}),t_j\big)$$

**En réarrangeant** *(retrancher $\sum_{j\neq i}v_j(\tilde x^i,t_j)$ des deux côtés)* :

$$\sum_{j=1}^{N}v_j\big(\hat x(t),t_j\big)-\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)\ \geq\ v_i\big(\tilde x^i(t_{-i}),t_i\big)$$

⟹ **(9.24) $\geq$ (9.25)** ⟹ *« **c'est un ÉQUILIBRE que TOUS participent VOLONTAIREMENT au VCG** »*. $\blacksquare$

</details>

### 🔴 13.3 La contradiction apparente avec Gibbard-Satterthwaite

> *« **Troisièmement, la DOMINANCE de la révélation véridique dans le VCG pourrait sembler CONTREDIRE LE THÉORÈME 6.4 (GIBBARD-SATTERTHWAITE).** »*

**L'argument de la contradiction apparente :**

> *« En effet, **$\hat x(\cdot)$ associe à des vecteurs de types (qui INDEXENT les fonctions d'utilité individuelles) des choix sociaux DE TELLE SORTE QU'AUCUN INDIVIDU NE PEUT JAMAIS GAGNER À RAPPORTER FAUSSEMENT. C'est-à-dire que $\hat x(\cdot)$ EST INVULNÉRABLE À LA MANIPULATION.** De plus, **parce que nous n'avons RIEN supposé sur le RANG de $\hat x(\cdot)$, le rang pourrait fort bien être TOUT $X$** (sinon, il suffit de retirer les éléments absents du rang). Dans ce cas, **$\hat x(\cdot)$ est une fonction de choix social INVULNÉRABLE. MAIS ELLE N'EST CERTAINEMENT PAS DICTATORIALE !** »*

**La résolution :**

> ⚠️ *« **Mais RASSUREZ-VOUS, IL N'Y A AUCUNE CONTRADICTION parce que, CONTRAIREMENT à la situation du chapitre 6, NOUS AVONS RESTREINT LE DOMAINE DES PRÉFÉRENCES À CELLES QUI SONT QUASI-LINÉAIRES. CETTE RESTRICTION NOUS PERMET D'ÉVITER LA CONCLUSION NÉGATIVE DE GIBBARD-SATTERTHWAITE.** »*

$$\boxed{\;\textbf{C'est EXACTEMENT la « restriction de domaine importante et utile » annoncée}\\\textbf{à la fin du chapitre 6 (fiche 514).}\;}$$

## 🔴 Concept 14 — §9.5.5 : atteindre l'équilibre budgétaire

### 14.1 Pourquoi le surplus est un problème

> *« Le VCG **dégage un SURPLUS. Mais QU'ARRIVE-T-IL au revenu généré ? EST-CE QUE CELA IMPORTE ? EN FAIT, OUI.** »*

| Le sort du revenu | La conséquence |
|---|---|
| **DÉTRUIT** | *« l'issue globale — l'état social **PLUS** le montant de monnaie que chacun possède — **n'est clairement PAS ex post Pareto-efficace. DÉTRUIRE UNE PORTION QUELCONQUE N'EST SIMPLEMENT PAS UNE OPTION.** »* |
| **REDISTRIBUÉ** | *« Mais **ceci cause aussi des problèmes : les coûts $c_i^{\text{VCG}}(t)$ NE SONT PLUS LES BONS COÛTS. Ils SURESTIMENT les coûts réels parce qu'ils NE TIENNENT PAS COMPTE du revenu redistribué. Il n'est PAS DU TOUT CLAIR qu'il reste dominant de rapporter véridiquement.** »* |

> *« **Heureusement, parce que les utilités sont QUASI-LINÉAIRES et les types INDÉPENDANTS, ce problème PEUT être résolu, du moment que le revenu est redistribué D'UNE MANIÈRE SUFFISAMMENT SOIGNEUSE.** »*

### 14.2 La définition 9.7

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 9.7 — Fonctions de coût à budget équilibré</span>

$c_1,\dots,c_N$ sont **à BUDGET ÉQUILIBRÉ** si elles **somment à zéro quel que soit le vecteur rapporté** :

$$\sum_{i=1}^{N}c_i(t)=0 \qquad\textbf{pour tout } t\in T$$

</div>

> *« Un mécanisme à budget équilibré **non seulement ne GASPILLE aucun argent, il est COMPLÈTEMENT AUTOSUFFISANT, n'exigeant AUCUN argent de l'extérieur** ». »*

### 🔴 14.3 Le théorème 9.11 : la table circulaire

**L'externalité ESPÉRÉE de $i$** quand son type est $t_i$ :

$$\bar c_i^{\text{VCG}}(t_i)=\sum_{t_{-i}\in T_{-i}}q_{-i}(t_{-i})\left[\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)-\sum_{j\neq i}v_j\big(\hat x(t),t_j\big)\right] \tag{9.26}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.11 — Le mécanisme à externalité espérée à budget équilibré</span>

Le mécanisme dans lequel l'état $\hat x(t)$ est choisi et **le coût de $i$ est**

$$\boxed{\;\bar c_i^{\text{VCG}}(t_i)-\bar c_{i+1}^{\text{VCG}}(t_{i+1})\;}$$

*(avec $i+1=1$ quand $i=N$)* est **COMPATIBLE INCITATIVEMENT, EX POST EFFICACE, et À BUDGET ÉQUILIBRÉ**. De plus, **dans l'équilibre véridique, CHACUN est volontairement disposé à participer, quel que soit son type**.

</div>

> ⚠️ **La description imagée du livre.** *« **Disposez les $N$ individus DANS LE SENS DES AIGUILLES D'UNE MONTRE AUTOUR D'UNE TABLE RONDE. Le mécanisme exige que chaque individu $i$ PAIE À LA PERSONNE À SA DROITE SON EXTERNALITÉ ESPÉRÉE $\bar c_i^{\text{VCG}}(t_i)$, étant donné son type rapporté.** »*

> *(Note 28.)* *« **Payer son externalité à UN SEUL autre individu garde la formule SIMPLE. Mais la payer à N'IMPORTE QUEL NOMBRE des autres ferait TOUT AUSSI BIEN.** »* *(Note 29 : ces mécanismes viennent de **Arrow (1979)** et **d'Aspremont et Gérard-Varet (1979)**.)*

### 14.4 Les deux points à souligner

| # | Le point |
|---|---|
| **1** | *« $\bar c_i^{\text{VCG}}(t_i)-\bar c_{i+1}^{\text{VCG}}(t_{i+1})$ est **LE COÛT RÉEL** de $i$ quand le vecteur rapporté est $t$. **CE N'EST PAS son coût ESPÉRÉ.** »* |
| **2** | *« Parce qu'il **paie son externalité espérée à une personne ET REÇOIT celle d'une autre, SON COÛT RÉEL EST INFÉRIEUR à son externalité espérée. Son coût ESPÉRÉ dans le nouveau mécanisme est donc PLUS BAS que dans le VCG original.** »* |

### 14.5 La preuve

<details class="details--riche">
<summary>

**L'argument, en trois pas**

</summary>

**Pas 1 — l'équilibre budgétaire.** *« **Le mécanisme est CLAIREMENT à budget équilibré. (Voyez-vous pourquoi ?)** »* — **chaque $\bar c_j^{\text{VCG}}(t_j)$ apparaît une fois avec le signe $+$ et une fois avec le signe $-$** dans la somme cyclique.

**Pas 2 — l'incitation.** Dans le VCG, l'utilité espérée de $i$ rapportant $r_i$ est

$$u_i^{\text{VCG}}(r_i,t_i)=\sum_{t_{-i}}q(t_{-i})v_i\big(\hat x(r_i,t_{-i}),t_i\big)-\bar c_i^{\text{VCG}}(r_i)$$

⚠️ **Dans le nouveau mécanisme**, ses coûts espérés sont $\bar c_i^{\text{VCG}}(r_i)-\bar c_{i+1}$, où

$$\bar c_{i+1}=\sum_{t_{i+1}}q_{i+1}(t_{i+1})\bar c_{i+1}^{\text{VCG}}(t_{i+1}) \qquad\textbf{est UNE CONSTANTE}$$

⟹ son utilité espérée est $u_i^{\text{VCG}}(r_i,t_i)+\bar c_{i+1}$, **qui est donc MAXIMISÉE au MÊME endroit** ⟹ **en $r_i=t_i$**.

**Pas 3 — la participation.** *« Parce que **$\bar c_{i+1}$ est TOUJOURS NON NÉGATIVE (c'est le coût VCG ex ante espéré de $i+1$), $i$ est AU MOINS AUSSI BIEN LOTI dans le nouveau mécanisme — il s'attend à des coûts FAIBLEMENT PLUS BAS, quel que soit son type.** »* $\blacksquare$

</details>

### 🔴 14.6 Le prix payé

> *« **Notez ATTENTIVEMENT que le théorème 9.11 NE DIT PAS que la révélation véridique est FAIBLEMENT DOMINANTE dans le nouveau mécanisme. Il dit SEULEMENT que c'est un ÉQUILIBRE BAYÉSIEN-NASHIEN.** »*

> ⚠️ *« Par conséquent, **bien que nous GAGNIONS un budget équilibré (et donc la PLEINE efficacité) en ajustant les coûts du VCG, NOUS PERDONS la propriété par ailleurs TRÈS AGRÉABLE d'équilibre en STRATÉGIES DOMINANTES.** »*

> *(Note 30.)* *« En fait, **il existe des théorèmes énonçant qu'il est IMPOSSIBLE d'atteindre LES DEUX dans une grande variété de circonstances.** Voir **Green et Laffont (1977)** et **Holmström (1979b)**. »*

### 14.7 L'exemple 9.5 : la table pour $N=2$

<details class="details--riche">
<summary>

**Le tableau et sa lecture**

</summary>

| Si votre type déclaré est | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ |
|---|---|---|---|---|---|---|---|---|---|
| **Vous payez à l'autre** | $\tfrac{10}{9}$ | $\tfrac{2}{3}$ | $\tfrac{1}{3}$ | $\tfrac{1}{9}$ | $0$ | $0$ | $\tfrac{1}{9}$ | $\tfrac{1}{3}$ | $\tfrac{2}{3}$ |

**La vérification d'une entrée** *(celle du livre)* : *« la quatrième entrée est $\bar c_1^{\text{VCG}}(4)$. **En rapportant $t_1=4<5$, il ne peut être PIVOT QUE pour la piscine, et il l'est SEULEMENT quand 2 rapporte $t_2=6$**, auquel cas son coût est $6-5$. Parce que la probabilité que $t_2=6$ est $1/9$ »* :

$$\bar c_1^{\text{VCG}}(4)=\tfrac19(6-5)=\tfrac19 \quad\checkmark$$

> ⚠️ **LA LECTURE** : *« **Notez que le paiement à l'autre est PLUS ÉLEVÉ QUAND SON RAPPORT EST PLUS EXTRÊME. Ceci est conforme à l'idée que, POUR DE BONNES INCITATIONS, LES INDIVIDUS DOIVENT PAYER LEUR EXTERNALITÉ.** »*

> *« En effet, **PLUS le rapport d'un individu est EXTRÊME, PLUS il est PROBABLE QU'IL OBTIENNE CE QU'IL VEUT — ou, de façon équivalente, MOINS il est probable que l'autre l'obtienne. EXIGER DE PAYER PLUS QUAND LES RAPPORTS SONT PLUS EXTRÊMES LES GARDE HONNÊTES.** »*

⚠️ *« Gardez à l'esprit que **le montant payé selon la table N'EST PAS son COÛT, parce que chacun REÇOIT AUSSI un paiement de l'autre** »*.

</details>

## 🔴 Concept 15 — §9.5.6 : les droits de propriété

### 15.1 Les deux hypothèses implicites qu'on lève

> *« Jusqu'ici nous avons **implicitement** supposé que, **d'une part, LES INDIVIDUS NE PEUVENT PAS ÊTRE FORCÉS D'ABANDONNER LEUR REVENU et, d'autre part, ILS N'ONT AUCUN DROIT DE PROPRIÉTÉ SUR LES ÉTATS SOCIAUX.** »*

> *« Nous présumions que, quand un individu ne participe pas, **(1) son revenu est INCHANGÉ** et **(2) l'ensemble des états sociaux disponibles aux autres est AUSSI inchangé — impliquant qu'il n'a AUCUN CONTRÔLE sur eux**. »*

### 🔴 15.2 Quand cela n'a plus de sens

| La situation | Le problème |
|---|---|
| Une **enchère** avec les enchérisseurs | *« il est **naturel** de supposer qu'aucun enchérisseur n'affecte la disponibilité du bien »* |
| Une enchère **incluant le VENDEUR** | *« **il ne sera typiquement PAS sensé de supposer que le bien reste disponible SI LE VENDEUR ne participe pas** »* |
| Un **propriétaire de firme** avec une technologie | *« l'ensemble des états sociaux **n'est pas le même** pour le consommateur seul que pour le consommateur ET le propriétaire »* |
| **Dissoudre un partenariat** | *« un cabinet d'avocats, **UN MARIAGE**, etc., où **chaque partenaire a des DROITS sur la propriété conjointe** »* |

### 15.3 L'exemple qui guide

> *« Un vendeur possède un objet et un acheteur potentiel. […] **Si nous voulons donner au vendeur des DROITS DE PROPRIÉTÉ, alors NOUS NE POUVONS PAS LE FORCER À CÉDER L'OBJET. Par conséquent, LE VENDEUR NE PARTICIPERA que s'il s'attend à recevoir une utilité AU MOINS $v_s$, parce qu'IL PEUT ATTEINDRE CETTE UTILITÉ EN NE PARTICIPANT PAS et en gardant l'objet.** »*

> ⚠️ *« **Le trait NOTABLE est que LA VALEUR DE NE PAS PARTICIPER DÉPEND NON TRIVIALEMENT DE SON TYPE PRIVÉ.** »*

### 15.4 La définition 9.8

Pour chaque $i$ et chaque $t_i$, **$IR_i(t_i)$** désigne *« l'utilité espérée de $i$ quand il NE participe PAS et que son type est $t_i$ »*.

**Dans l'exemple** : $IR_1(v_s)=v_s$ *(le vendeur)* et $IR_2(v_b)=0$ *(l'acheteur)*.

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 9.8 — Rationalité individuelle</span>

Un mécanisme direct incitatif est **individuellement rationnel** si, pour chaque $i$ et chaque $t_i$ :

$$\sum_{x\in X}\bar p_i^x(t_i)\,v_i(x,t_i)-\bar c_i(t_i)\ \geq\ IR_i(t_i)$$

</div>

> ⚠️ *« **Ce sont des contraintes SUPPLÉMENTAIRES, AU-DELÀ de celles imposées par la compatibilité incitative et par l'efficacité ex post. PLUS LES $IR_i(t_i)$ SONT ÉLEVÉS, PLUS IL SERA DIFFICILE de construire un mécanisme incitatif ex post efficace. Parce que LES DROITS DE PROPRIÉTÉ AUGMENTENT SOUVENT les $IR_i(t_i)$, LEUR PRÉSENCE PEUT CRÉER DES DIFFICULTÉS.** »*

**Deux remarques :**

| # | La remarque |
|---|---|
| **1** | *« On peut toujours **revenir au modèle SANS droits de propriété** en définissant $IR_i(t_i)=\min_{x\in X}v_i(x,t_i)$ »* |
| **2** | *« Les $IR_i$ permettent aussi de modéliser des **« OPTIONS EXTÉRIEURES »**. Si $U_i^k(t_i)$ est l'utilité de participer à un autre mécanisme $k$, alors **$i$ ne participera au vôtre que si son utilité y est au moins $\max_k U_i^k(t_i)$** — d'où $IR_i(t_i)=\max_k U_i^k(t_i)$ »* |

### 15.5 L'exemple 9.6 : l'ingénieur

<details class="details--riche">
<summary>

**Quand le mécanisme à externalité espérée ÉCHOUE**

</summary>

**Le montage** : la ville **finance elle-même** ; un troisième état **$D$ (« Ne rien construire »)** est disponible. **L'individu 1 est le SEUL INGÉNIEUR de la ville** :

$$v_1(D,t_1)=10 \qquad\qquad v_i(D,t_i)=0 \ \text{ pour } i>1$$

> *« Vous pouvez penser $v_1(D,t_1)=10$ comme **le coût (d'OPPORTUNITÉ) de l'ingénieur** de construire l'un ou l'autre. »*

⟹ $IR_1(t_1)=10$ et $IR_i(t_i)=0$ pour $i>1$.

**Il est toujours efficace de construire** : *« l'utilité totale est **10 si rien n'est construit**, tandis qu'elle est **strictement supérieure à 10** si la piscine est construite »*.

**Mais avec $N=2$, le mécanisme à externalité espérée ÉCHOUE :**

> ⚠️ *« Si le type de l'ingénieur est $t_1<4$, alors **quels que soient les rapports, le mécanisme indiquera de construire, et le paiement de 2 à l'ingénieur sera AU PLUS $10/9$. Par conséquent, MÊME EN IGNORANT le paiement que l'ingénieur doit faire, son utilité espérée s'il construit est STRICTEMENT INFÉRIEURE À 10, parce que** »*

$$\max(t_1+5,\ 2t_1)+\tfrac{10}{9}\ <\ 10 \qquad\text{quand } t_1<4$$

> *« **L'ingénieur est donc STRICTEMENT MIEUX LOTI en EXERÇANT SON DROIT DE NE PAS CONSTRUIRE. Ainsi, l'issue est INEFFICACE chaque fois que $t_1<4$, parce que SA CONTRAINTE DE RATIONALITÉ INDIVIDUELLE EST VIOLÉE.** »*

</details>

## 🔴 Concept 16 — §9.5.7 : le mécanisme IR-VCG et la suffisance du surplus espéré

### 16.1 La subvention de participation

$U_i^{\text{VCG}}(t_i)$ = **l'utilité espérée de $i$ dans l'équilibre véridique (dominant) du VCG**. On cherche à rendre le mécanisme **individuellement rationnel** *« de la manière la plus simple possible, à savoir EN DONNANT UN MONTANT FIXE d'argent à chacun »*.

La subvention $\psi_i$ doit satisfaire $U_i^{\text{VCG}}(t_i)+\psi_i\geq IR_i(t_i)$ **pour tout $t_i$**, d'où :

$$\boxed{\;\psi_i^*=\max_{t_i\in T_i}\Big(IR_i(t_i)-U_i^{\text{VCG}}(t_i)\Big)\;} \tag{9.27}$$

⚠️ *« la **SUBVENTION MINIMALE** que nous devons donner à $i$ **(ET ELLE PEUT ÊTRE NÉGATIVE)** pour qu'il participe **quel que soit son type** »*.

### 16.2 Le mécanisme IR-VCG

> **LE MÉCANISME IR-VCG.** Chacun rapporte son type et **reçoit $\psi_i^*$ dollars QUEL QUE SOIT le type rapporté**. L'état social est $\hat x(t)$ et le coût total de $i$ est
>
> $$c_i^{\text{VCG}}(t)-\psi_i^*$$

| La propriété | Pourquoi |
|---|---|
| **La dominance survit** | *« Parce que **les subventions sont distribuées QUELS QUE SOIENT les rapports, ELLES N'ONT AUCUN EFFET SUR LES INCITATIONS À MENTIR** »* |
| **Individuellement rationnel** | **Par construction** |
| **Ex post efficace** | Il utilise $\hat x$ |
| **MAIS pas forcément à budget équilibré** | C'est **le seul problème** |

### 🔴 16.3 Pourquoi la « table circulaire » ne suffit plus

> *« Pour équilibrer le budget, **nous pourrions essayer LA MÊME ASTUCE qu'au théorème 9.11. MAIS IL Y A UN PROBLÈME. Parce que LES COÛTS VCG ONT ÉTÉ RÉDUITS PAR LES SUBVENTIONS, IL SE POURRAIT QUE LE COÛT ESPÉRÉ D'UN INDIVIDU SOIT MAINTENANT NÉGATIF.** »*

> *« **Il ne PAIERAIT alors PAS son voisin de droite. Au contraire, IL LUI PRENDRAIT de l'argent (alors que celui-ci paie AUSSI son propre coût à SON voisin). CETTE DÉPENSE SUPPLÉMENTAIRE pour le voisin POURRAIT VIOLER SA CONTRAINTE DE RATIONALITÉ INDIVIDUELLE.** »*

⟹ *« **équilibrer le budget quand les coûts espérés sont négatifs exige une méthode PLUS SOPHISTIQUÉE — si tant est que ce soit possible.** »*

### 16.4 Le critère du surplus espéré

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION.</span>

Un mécanisme incitatif **DÉGAGE UN SURPLUS ESPÉRÉ** si, dans l'équilibre véridique, **le revenu espéré EX ANTE est non négatif** :

$$\sum_{t\in T}q(t)\sum_{i=1}^{N}c_i(t)\ \geq\ 0$$

</div>

| Le mécanisme | Son surplus |
|---|---|
| **VCG** | **Toujours un surplus** — car $c_i^{\text{VCG}}(t)\geq0$ **partout** |
| **IR-VCG** | *« **PEUT OU NON** dégager un surplus, parce qu'**il RÉDUIT celui du VCG DU MONTANT DES SUBVENTIONS** »* |

### 16.5 Le théorème 9.12 : équilibrer le budget en général

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.12 — Atteindre un budget équilibré</span>

Supposons qu'un mécanisme direct incitatif de coûts $c_1,\dots,c_N$ **dégage un surplus espéré**. Remplaçons $c_i$ par

$$\boxed{\;c_i^B(t)=\bar c_i(t_i)-\bar c_{i+1}(t_{i+1})+\bar c_{i+1}-\frac{1}{N}\sum_{j=1}^{N}\bar c_j\;}$$

où $\bar c_i=\sum_{t}q(t)c_i(t)$. Alors le mécanisme résultant **— avec LA MÊME fonction d'assignation —** est **À BUDGET ÉQUILIBRÉ et reste INCITATIF**. De plus, il est **FAIBLEMENT PRÉFÉRÉ par CHAQUE TYPE de CHAQUE individu** au mécanisme original. **Donc, si l'original était individuellement rationnel, LE NOUVEAU L'EST AUSSI.**

</div>

### 🔴 16.6 La description imagée

> *« **Asseyez les $N$ individus DANS L'ORDRE, de 1 à $N$, DANS LE SENS DES AIGUILLES D'UNE MONTRE autour d'une table ronde. Si $i$ rapporte $t_i$, IL PAIE À CHAQUE AUTRE INDIVIDU LE MONTANT FIXE $\bar c_{i+1}/N$ et PAIE À CELUI DE SA DROITE LE MONTANT SUPPLÉMENTAIRE $\bar c_i(t_i)$. C'EST TOUT !** »*

> ⚠️ *« La belle chose avec cette manière de voir est qu'**il est « ÉVIDENT » que ces coûts ÉQUILIBRENT LE BUDGET. Pourquoi ? PARCE QUE LES $N$ INDIVIDUS FONT SIMPLEMENT DES PAIEMENTS ENTRE EUX. Aucun argent NE QUITTE le système (donc aucun revenu n'est généré) et aucun argent N'Y EST INJECTÉ (donc aucune perte).** »*

### 16.7 La preuve

<details class="details--riche">
<summary>

**Les trois pas**

</summary>

**Pas 1 — le coût espéré diffère d'une constante.**

$$\begin{aligned}
\bar c_i^B(r_i)&=\bar c_i(r_i)-\Big[\sum_{t_{i+1}}q_{i+1}(t_{i+1})\bar c_{i+1}(t_{i+1})\Big]+\bar c_{i+1}-\frac1N\sum_j\bar c_j\\
&=\bar c_i(r_i)-\bar c_{i+1}+\bar c_{i+1}-\frac1N\sum_j\bar c_j\ =\ \bar c_i(r_i)-\frac{1}{N}\sum_{j=1}^{N}\bar c_j
\end{aligned} \tag{P.1}$$

⚠️ **Les deux termes en $\bar c_{i+1}$ se DÉTRUISENT.**

**Pas 2 — l'incitation survit.** *« Parce que **la fonction d'assignation n'a PAS changé** »* :

$$u_i^B(r_i,t_i)=u_i(r_i,t_i)+\frac{1}{N}\sum_{j=1}^{N}\bar c_j \tag{P.2}$$

⟹ **maximisé au MÊME endroit** ⟹ **incitatif**.

**Pas 3 — la rationalité individuelle survit.** *« L'hypothèse de **SURPLUS ESPÉRÉ** signifie précisément que $\sum_j\bar c_j\geq0$. Par conséquent, en évaluant (P.2) en $r_i=t_i$, **l'utilité espérée de CHAQUE TYPE de CHAQUE individu est AU MOINS AUSSI ÉLEVÉE dans le nouveau mécanisme**. »* $\blacksquare$

</details>

### 16.8 Le théorème 9.13 : la SUFFISANCE

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.13 — Surplus espéré de l'IR-VCG : suffisance</span>

**Si l'IR-VCG dégage un surplus espéré**, i.e. si

$$\sum_{t\in T}q(t)\sum_{i=1}^{N}\big(c_i^{\text{VCG}}(t)-\psi_i^*\big)\ \geq\ 0$$

alors le mécanisme suivant est **INCITATIF, EX POST EFFICACE, À BUDGET ÉQUILIBRÉ et INDIVIDUELLEMENT RATIONNEL** : l'état est $\hat x(t)$ et $i$ paie

$$\bar c_i^{\text{VCG}}(t_i)-\psi_i^*-\bar c_{i+1}^{\text{VCG}}(t_{i+1})+\bar c_{i+1}^{\text{VCG}}-\frac{1}{N}\sum_{j=1}^{N}\big(\bar c_j^{\text{VCG}}-\psi_j^*\big)$$

</div>

> *« **La preuve est VRAIMENT IMMÉDIATE** parce que l'IR-VCG est incitatif, ex post efficace et individuellement rationnel. **S'il dégage un surplus, ajuster ses coûts selon le théorème 9.12 donne le résultat. Vous n'avez plus qu'à VOUS CONVAINCRE que le mécanisme résultant est PRÉCISÉMENT celui-ci. (CONVAINQUEZ-VOUS !)** »*

$$\boxed{\;\textbf{Le SURPLUS ESPÉRÉ de l'IR-VCG est une condition SUFFISANTE pour}\\\textbf{l'existence d'un mécanisme satisfaisant TOUTES nos exigences.}\;}$$

### 16.9 L'exemple 9.7 : l'ingénieur, revisité

<details class="details--riche">
<summary>

**Le calcul complet**

</summary>

Avec **$N=2$** et $IR_1(t_1)=10$ pour tout $t_1$ :

$$\psi_1^*=\max_{t_1}\big(10-U_1^{\text{VCG}}(t_1)\big)=10-\min_{t_1}U_1^{\text{VCG}}(t_1)$$

> *« Il n'est **pas difficile d'argumenter que PLUS le type de l'ingénieur est ÉLEVÉ, MIEUX il est loti** dans le VCG *(exercice 9.32)*. **Le minimum survient donc en $t_1=1$.** »*

$$U_1^{\text{VCG}}(1)=(1+5)-\tfrac{10}{9}$$

*« **parce que la piscine sera construite QUEL QUE SOIT le rapport de 2**, et son coût VCG espéré est $\bar c_1^{\text{VCG}}(1)=10/9$ »* ⟹

$$\psi_1^*=10-6+\tfrac{10}{9}=\boxed{\tfrac{46}{9}}$$

**Pour l'individu 2** *(avec $IR_2=0$ et $\bar c_2^{\text{VCG}}(1)=20/9$)* :

$$\psi_2^*=0-\Big((1+5)-\tfrac{20}{9}\Big)=\boxed{-\tfrac{34}{9}}$$

$$\psi_1^*+\psi_2^*=\tfrac{46}{9}-\tfrac{34}{9}=\tfrac{12}{9}=\boxed{\tfrac{4}{3}}$$

**Le revenu VCG ex ante espéré est $50/27$** *(exercice 9.33)*, et

$$\frac{50}{27}\ >\ \frac{4}{3}=\frac{36}{27}$$

> ⚠️ *« Par conséquent, **l'IR-VCG DÉGAGE UN SURPLUS ESPÉRÉ, et il est donc POSSIBLE de garantir une issue ex post efficace TOUT EN RESPECTANT LA CONTRAINTE DE RATIONALITÉ INDIVIDUELLE DE L'INGÉNIEUR.** »*

⚠️ **Notez que $\psi_2^*<0$** : l'individu 2 **PAIE** une taxe de participation — c'est elle qui **finance** la subvention de l'ingénieur.

</details>

## 🔴 Concept 17 — §9.5.8 : la NÉCESSITÉ du surplus espéré

### 17.1 Le changement de cadre

> *« Jusqu'ici nous avons supposé les ensembles de types **FINIS. C'était PAR SIMPLICITÉ seulement.** […] **Mais nous souhaitons maintenant montrer que le surplus espéré n'est PAS SEULEMENT SUFFISANT mais AUSSI NÉCESSAIRE. Et pour cela, NOUS DEVONS ABANDONNER LES ESPACES DE TYPES FINIS.** »*

⟹ on suppose $T_i=[0,1]$, **$X$ restant FINI**, et *« les sommes sur les types deviennent des INTÉGRALES, les probabilités $q_i(t_i)$ deviennent des DENSITÉS »*.

### 🔴 17.2 La condition du premier ordre générale

La compatibilité incitative ⟹ $u_i(r_i,t_i)$ **maximisée en $r_i=t_i$** ⟹

$$\left.\frac{\partial u_i(r_i,t_i)}{\partial r_i}\right|_{r_i=t_i}=\sum_{x\in X}\bar p_i^{x\prime}(t_i)\,v_i(x,t_i)-\bar c_i'(t_i)=0$$

$$\boxed{\;\bar c_i'(t_i)=\sum_{x\in X}\bar p_i^{x\prime}(t_i)\,v_i(x,t_i)\;} \tag{9.28}$$

> ⚠️ *« Par conséquent, **si DEUX mécanismes ont LA MÊME fonction d'assignation, alors LES DÉRIVÉES DE LEURS COÛTS ESPÉRÉS DOIVENT ÊTRE IDENTIQUES.** Mais alors, **du moment que le THÉORÈME FONDAMENTAL DU CALCUL s'applique, LES FONCTIONS DE COÛT ESPÉRÉ ELLES-MÊMES DOIVENT DIFFÉRER D'UNE CONSTANTE** »* :

$$\bar c_i^A(t_i)-\bar c_i^A(0)=\int_0^{t_i}\bar c_i^{A\prime}(s)ds=\int_0^{t_i}\bar c_i^{B\prime}(s)ds=\bar c_i^B(t_i)-\bar c_i^B(0)$$

⚠️ *« Notez que **parce que (9.28) ne dépend que des probabilités ESPÉRÉES $\bar p_i^x$, il SUFFIT que les deux mécanismes aient LES MÊMES FONCTIONS D'ASSIGNATION ESPÉRÉES** »*.

### 17.3 Les théorèmes 9.14 et 9.15

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.14 — Les coûts diffèrent d'une constante</span>

Si, pour chaque $i$, $\partial v_i(x,t_i)/\partial t_i$ **existe et est continue** en $t_i\in[0,1]$ pour chaque $x\in X$, et si **deux mécanismes incitatifs ont les mêmes fonctions d'assignation ESPÉRÉES $\bar p_i^x$**, alors leurs **fonctions de coût espéré DIFFÈRENT D'UNE CONSTANTE** *(qui peut dépendre de $i$)*.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.15 — Un théorème général d'équivalence des revenus</span>

Sous les mêmes hypothèses, si **deux mécanismes incitatifs ont les mêmes $\bar p_i^x$ ET si CHAQUE individu est INDIFFÉRENT entre eux QUAND SON TYPE EST ZÉRO**, alors ils **génèrent le MÊME revenu espéré**.

</div>

⚠️ *« Il **GÉNÉRALISE le théorème 9.6** »* — l'équivalence des revenus de la fiche 519.

### 17.4 Le théorème 9.16

> *« Suppose que **pour chaque $t$ il y a UN UNIQUE état social ex post efficace. Alors DEUX mécanismes incitatifs ex post efficaces QUELCONQUES ont LES MÊMES fonctions d'assignation.** Dès lors, **par le théorème 9.14, parce que le VCG est incitatif et efficace, TOUT autre mécanisme incitatif ex post efficace doit avoir des COÛTS ESPÉRÉS QUI DIFFÈRENT DES COÛTS VCG (les externalités espérées) PAR UNE CONSTANTE.** »*

> ⚠️ *« En effet, **si vous regardez en arrière TOUS les mécanismes ex post efficaces que nous avons construits, LES COÛTS ESPÉRÉS DIFFÈRENT D'UNE CONSTANTE des coûts VCG espérés.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.16 — Revenu maximal sous efficacité et rationalité individuelle</span>

Sous les hypothèses de régularité, **l'IR-VCG génère LE MAXIMUM de revenu espéré ex ante PARMI TOUS les mécanismes directs INCITATIFS, EX POST EFFICACES et INDIVIDUELLEMENT RATIONNELS.**

</div>

<details class="details--riche">
<summary>

**La preuve — l'argument de minimalité des subventions**

</summary>

Soit un tel mécanisme, de coûts $c_1,\dots,c_N$. Ses assignations espérées **coïncident** avec celles de l'IR-VCG ⟹ **par le théorème 9.14**, ses coûts espérés en diffèrent d'une constante :

$$\bar c_i(t_i)=\bar c_i^{\text{VCG}}(t_i)-\psi_i^*-k_i \tag{P.1}$$

> ⚠️ *« Or, **(P.1) dit que, en partant du VCG et en l'ajustant en donnant à chacun la subvention $\psi_i^*+k_i$, on rend le mécanisme INDIVIDUELLEMENT RATIONNEL ET ex post efficace. MAIS PARCE QUE LES $\psi_i^*$ SONT, PAR DÉFINITION, LES PLUS PETITES TELLES SUBVENTIONS, IL DOIT ÊTRE LE CAS QUE $k_i\geq0$ POUR TOUT $i$.** »*

⟹ $\bar c_i(t_i)\leq\bar c_i^{\text{VCG}}(t_i)-\psi_i^*$ ⟹ *« **chacun, quel que soit son type, s'attend à payer un coût PLUS BAS dans l'autre mécanisme. Dès lors, L'IR-VCG génère AU MOINS AUTANT de revenu espéré.** »* $\blacksquare$

</details>

### 🔴 17.5 Le théorème 9.17 : la nécessité

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.17 — Surplus espéré de l'IR-VCG : nécessité</span>

Sous les mêmes hypothèses de régularité : **s'il EXISTE un mécanisme direct INCITATIF, EX POST EFFICACE, À BUDGET ÉQUILIBRÉ et INDIVIDUELLEMENT RATIONNEL, alors L'IR-VCG DÉGAGE UN SURPLUS ESPÉRÉ.**

</div>

<details class="details--riche">
<summary>

**La preuve — deux lignes**

</summary>

> *« **Si un tel mécanisme existe, alors, PARCE QU'IL EST À BUDGET ÉQUILIBRÉ, ses revenus espérés sont ZÉRO. D'autre part, PAR LE THÉORÈME 9.16, l'IR-VCG lève AU MOINS AUTANT. Donc le revenu ex ante espéré de l'IR-VCG DOIT ÊTRE NON NÉGATIF.** »* $\blacksquare$

</details>

$$\boxed{\;\textbf{SURPLUS ESPÉRÉ DE L'IR-VCG} \ \Longleftrightarrow\ \textbf{EXISTENCE d'un mécanisme}\\\textbf{incitatif, ex post efficace, à budget équilibré et individuellement rationnel}\;}$$

*(Le §9.5.8 s'appuie fortement sur **Krishna et Perry (1998)** ; voir aussi **Williams (1999)**.)*

## 🔴 Concept 18 — L'exemple 9.8 : Myerson-Satterthwaite

### 18.1 Le montage

> *« **Un acheteur et un vendeur.** Le vendeur possède un objet indivisible, les deux ont des préférences **quasi-linéaires** et des **valeurs privées**. Deux états sociaux : **$B$ (l'acheteur reçoit l'objet)** et **$S$ (le vendeur le garde)**. »*

| L'élément | Sa valeur |
|---|---|
| $t_b$, $t_s$ | **uniformes et indépendants sur $[0,1]$** |
| $v_b(B,t_b)=t_b$, $v_b(S,t_b)=0$ | et symétriquement pour le vendeur |
| $IR_s(t_s)=t_s$ | *« **le vendeur a des DROITS DE PROPRIÉTÉ — il peut toujours ne pas participer et GARDER son objet** »* |
| $IR_b(t_b)=0$ | *« la non-participation laisse l'acheteur avec une utilité NULLE »* |

### 18.2 Le calcul

<details class="details--riche">
<summary>

**Les cinq étapes**

</summary>

**1. Les coûts VCG.** Il est efficace que l'objet aille à l'acheteur ssi $t_b>t_s$.

> *« Dans ce cas, **l'externalité de l'acheteur est $t_s-0$ parce que, SANS l'acheteur, le vendeur reçoit l'objet et obtient $t_s$, MAIS AVEC lui, l'acheteur reçoit l'objet et le vendeur obtient ZÉRO. Si $t_b<t_s$, l'externalité est ZÉRO parce que, AVEC OU SANS lui, le vendeur reçoit l'objet.** »*

$$c_b^{\text{VCG}}(t_b,t_s)=\begin{cases}t_s,&\text{si } t_b>t_s\\0,&\text{si } t_b<t_s\end{cases}$$

**2. Les coûts espérés.**

$$\bar c_b^{\text{VCG}}(t_b)=\int_0^{t_b}t_s\,dt_s=\tfrac12t_b^2 \qquad\qquad \bar c_s^{\text{VCG}}(t_s)=\tfrac12t_s^2$$

*(Note 39 : **« le fait que le vendeur POSSÈDE l'objet NE JOUE AUCUN RÔLE dans le VCG, qui opère TOUJOURS COMME S'IL N'Y AVAIT AUCUN droit de propriété. »**)*

**3. Les utilités VCG.**

$$U_b^{\text{VCG}}(t_b)=\underbrace{\int_0^{t_b}t_b\,dt_s}_{=\,t_b^2}-\tfrac12t_b^2=\tfrac12t_b^2 \qquad\qquad U_s^{\text{VCG}}(t_s)=\tfrac12t_s^2$$

**4. Le revenu VCG ex ante.**

$$\int_0^1\tfrac12t_b^2dt_b+\int_0^1\tfrac12t_s^2dt_s=\tfrac16+\tfrac16=\boxed{\tfrac13}$$

**5. Les subventions.**

$$\psi_b^*=\max_{t_b}\big(0-\tfrac12t_b^2\big)=\boxed{0} \qquad\qquad \psi_s^*=\max_{t_s}\Big(t_s-\tfrac12t_s^2\Big)=\boxed{\tfrac12}$$

*(le maximum de $t_s-t_s^2/2$ sur $[0,1]$ est atteint en $t_s=1$)*

$$\boxed{\;\psi_b^*+\psi_s^*=\tfrac12\ >\ \tfrac13\;}$$

> ⚠️ *« Nous concluons qu'**IL N'EXISTE PAS de mécanisme direct incitatif, ex post efficace, à budget équilibré et individuellement rationnel dans cette situation.** »*

</details>

### 🔴 18.3 Les quatre leçons

> *« **Il y a PLUSIEURS LEÇONS à tirer de l'exemple 9.8.** »*

<details class="details--riche">
<summary>

**Leçon 1 — les GRÈVES**

</summary>

> *« **L'exemple fournit une EXPLICATION du phénomène autrement DÉCONCERTANT DES GRÈVES ET DES DÉSACCORDS dans les situations de MARCHANDAGE. Ce qui est déconcertant dans les grèves, c'est qu'on imagine que QUEL QUE SOIT L'ACCORD FINALEMENT ATTEINT, IL AURAIT PU L'ÊTRE SANS LA GRÈVE, épargnant aux deux côtés temps et ressources.** »*

> ⚠️ *« **Mais le résultat de l'exemple démontre que cette « INTUITION » EST SIMPLEMENT FAUSSE. PARFOIS IL N'Y A AUCUN MÉCANISME QUI PUISSE ASSURER L'EFFICACITÉ EX POST — DES INEFFICACITÉS DOIVENT OCCASIONNELLEMENT APPARAÎTRE. Et un exemple d'une telle inefficacité EST CELLE ASSOCIÉE À UNE GRÈVE.** »*

</details>

<details class="details--riche">
<summary>

**Leçon 2 — les DROITS DE PROPRIÉTÉ comptent (la limite du théorème de Coase)**

</summary>

> *« **L'exemple illustre que LES DROITS DE PROPRIÉTÉ COMPTENT.** »*

> *« **Un résultat très célèbre en droit et économie est le « THÉORÈME DE COASE », qui énonce, grossièrement, que SI L'ON NE S'INTÉRESSE QU'À L'EFFICACITÉ DE PARETO, LES DROITS DE PROPRIÉTÉ N'IMPORTENT PAS** — e.g. **que la pêcherie EN AVAL ait le droit légal à une eau propre, ou que l'aciérie EN AMONT ait le droit légal de DÉVERSER ses déchets dans le ruisseau, les deux parties atteindront, PAR DES TRANSFERTS APPROPRIÉS, un accord Pareto-efficace.** »*

> ⚠️ *« **Notre analyse révèle une MISE EN GARDE IMPORTANTE : LE THÉORÈME DE COASE PEUT ÉCHOUER QUAND LES PARTIES ONT DE L'INFORMATION PRIVÉE SUR LEURS PRÉFÉRENCES. Si AUCUN individu n'a de droits de propriété, nous avons trouvé que L'EFFICACITÉ ÉTAIT TOUJOURS POSSIBLE. Cependant, QUAND LES DROITS SONT ASSIGNÉS, UN ACCORD EFFICACE NE PEUT PAS TOUJOURS ÊTRE GARANTI.** »*

</details>

<details class="details--riche">
<summary>

**Leçon 3 — la PRIVATISATION**

</summary>

> *« Le fait que **les droits de propriété puissent FAIRE OBSTACLE à l'efficacité fournit une leçon importante POUR LA PRIVATISATION D'ACTIFS PUBLICS** (e.g. **la vente de droits pétroliers offshore, ou du SPECTRE RADIO pour les communications commerciales — téléphonie mobile, télévision, radio**). »*

> ⚠️ *« **Si l'objectif du gouvernement est l'EFFICACITÉ, alors IL EST IMPORTANT DE CONCEVOIR LE MÉCANISME DE PRIVATISATION DE SORTE QU'IL ASSIGNE LES OBJETS EFFICACEMENT, SI POSSIBLE. Car L'ASSIGNATION, PAR SA NATURE MÊME, CRÉE DES DROITS DE PROPRIÉTÉ. SI L'ASSIGNATION EST INEFFICACE et que l'information privée demeure, L'ÉTABLISSEMENT DES DROITS PEUT FORT BIEN MENER À DES PERTES D'EFFICACITÉ INÉVITABLES, PERSISTANTES ET POTENTIELLEMENT GRANDES.** »*

</details>

<details class="details--riche">
<summary>

**Leçon 4 — la SYMÉTRIE de la propriété**

</summary>

> *« L'exemple suggère que **LE MANQUE DE SYMÉTRIE DANS LA PROPRIÉTÉ peut jouer un rôle dans le résultat d'impossibilité. Par exemple, UN CADRE SANS droits de propriété EST UN CADRE OÙ LES DROITS SONT SYMÉTRIQUES — et c'est aussi un cadre où il EST possible de construire un mécanisme ex post efficace, à budget équilibré, avec participation volontaire.** »*

*(À explorer dans les exercices ; voir aussi **Cramton, Gibbons et Klemperer (1987)**.)*

</details>

### 18.4 Le mot de la fin du chapitre

> *« **Une excellente question à ce stade est : « QUE FAIT-ON quand un tel mécanisme N'EXISTE PAS ? » C'est une question FORMIDABLE et IMPORTANTE, mais que nous ne poursuivrons pas dans cette introduction.** »*

> *« **UNE réponse, cependant, est que NOUS FAISONS LE MIEUX POSSIBLE ENSUITE. Nous cherchons plutôt, parmi tous les mécanismes incitatifs, CEUX QUI NE PEUVENT PAS ÊTRE PARETO-AMÉLIORÉS soit du point de vue INTÉRIMAIRE, soit du point de vue EX ANTE.** Un excellent exemple de cette méthodologie se trouve dans **Myerson et Satterthwaite (1983)**. »*

> *« **La théorie du design de mécanismes est RICHE, PUISSANTE et IMPORTANTE, et, bien que nous n'ayons fait qu'EFFLEURER LA SURFACE ici, nous espérons vous avoir donné un sens de son UTILITÉ pour traiter LE PROBLÈME FONDAMENTAL DE L'ALLOCATION DES RESSOURCES EN PRÉSENCE D'INFORMATION PRIVÉE.** »*

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « trouver le meilleur mécanisme de vente » | **§9.4** | **Principe de révélation** ⟹ se restreindre aux directs incitatifs |
| « la participation est volontaire » | **§9.4.2** | ⟹ $\bar c_i(0)\leq0$ |
| Un revenu à maximiser sur des mécanismes | **(9.11)** | **Réécrire**, puis **maximiser POINT PAR POINT** |
| « cette distribution est-elle régulière ? » | **(9.18)** | Vérifier que $v-\frac{1-F(v)}{f(v)}$ **croît** — vrai si $F$ **convexe** |
| « interpréter $v-\frac{1-F}{f}$ » | **§9.4.4** | C'est le **REVENU MARGINAL** $MR_i(v_i)$ |
| « que paie le gagnant ? » | **Théorème 9.8** | **La plus grande valeur qu'il aurait pu déclarer SANS gagner** |
| Enchérisseurs **symétriques** + optimalité | **Théorème 9.9** | **Second prix avec RÉSERVE $\rho^*$** |
| « trouver $\rho^*$ » | **(9.19)** | Résoudre $\rho^*-\frac{1-F(\rho^*)}{f(\rho^*)}=0$ |
| « quel état social est efficace ? » | **Définition 9.3** | **Maximiser $\sum_i v_i(x,t_i)$** — grâce à la **quasi-linéarité** |
| « concevoir un mécanisme efficace » | **§9.5.4** | Le **VCG** : chacun **paie son externalité** |
| « calculer $c_i^{\text{VCG}}$ » | **Définition 9.6** | **Utilité des autres SANS $i$ MOINS utilité des autres AVEC $i$** |
| « qui est PIVOT ? » | **Exemple 9.4** | Celui dont **la présence CHANGE l'état social** |
| « le budget est-il équilibré ? » | **Définition 9.7** | $\sum_i c_i(t)=0$ **pour tout $t$** |
| « équilibrer le budget » | **Théorème 9.11 / 9.12** | **La TABLE CIRCULAIRE** |
| Un vendeur qui **possède** le bien | **§9.5.6** | $IR_s(t_s)=t_s$ — **droits de propriété** |
| « un tel mécanisme existe-t-il ? » | **Théorèmes 9.13 et 9.17** | **Comparer le revenu VCG à $\sum_i\psi_i^*$** |
| Acheteur / vendeur uniformes | **Exemple 9.8** | $1/2>1/3$ ⟹ **IMPOSSIBLE** |

**Les trois réflexes de cadrage :**

1. **Le principe de révélation d'abord.** Il réduit **toujours** l'espace de recherche aux mécanismes directs incitatifs.
2. **L'externalité se calcule TOUJOURS de la même manière** : *utilité des autres SANS moi* $-$ *utilité des autres AVEC moi*.
3. **Devant une question d'existence, calculer $\sum_i\psi_i^*$ et le comparer au revenu VCG.** C'est **le** critère.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Construire le mécanisme de vente optimal

| Pas | Ce qu'on fait |
|---|---|
| **1** | **Principe de révélation** ⟹ chercher parmi les mécanismes directs incitatifs |
| **2** | **Théorème 9.5** ⟹ substituer (ii) et **réécrire le revenu** |
| **3** | **Intervertir l'ordre d'intégration** ⟹ faire apparaître $1-F_i(v_i)$ |
| **4** | **Diviser ET multiplier par $f_i(v_i)$** ⟹ le crochet $v_i-\frac{1-F_i(v_i)}{f_i(v_i)}$ |
| **5** | **Maximiser POINT PAR POINT** : l'accolade est une **moyenne pondérée** de $N+1$ nombres dont **un zéro** |
| **6** | **Vérifier la régularité (9.18)** ⟹ la contrainte (i) est satisfaite |
| **7** | **Poser $\bar c_i(0)=0$** ⟹ la contrainte (iii) est saturée |

### Méthode 2 — Calculer un coût VCG

1. **Écrire $\hat x(t)$** — l'état qui maximise $\sum_{j=1}^N v_j(x,t_j)$.
2. **Écrire $\tilde x^i(t_{-i})$** — celui qui maximise $\sum_{j\neq i}v_j(x,t_j)$.
3. **Calculer l'externalité** :

$$c_i^{\text{VCG}}(t)=\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)-\sum_{j\neq i}v_j\big(\hat x(t),t_j\big)$$

4. **Si $\hat x(t)=\tilde x^i(t_{-i})$, l'externalité est NULLE** — $i$ n'est **pas pivot**.
5. **Vérifier** qu'elle est **toujours $\geq0$**.

### Méthode 3 — Vérifier la dominance dans le VCG

1. **Écrire l'utilité de $i$ rapportant $r_i$** : $v_i\big(\hat x(r_i,t_{-i}),t_i\big)-c_i^{\text{VCG}}(r_i,t_{-i})$.
2. **Substituer la définition du coût** et **simplifier** ⟹

$$\sum_{j=1}^{N}v_j\big(\hat x(r_i,t_{-i}),t_j\big)\ -\ \underbrace{\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)}_{\textbf{INDÉPENDANT de } r_i}$$

3. **Observer que $r_i$ n'apparaît QUE dans la première somme.**
4. **Par définition même de $\hat x(t_i,t_{-i})$**, cette somme est maximisée en $r_i=t_i$. $\blacksquare$

### Méthode 4 — Équilibrer le budget

| Situation | La recette |
|---|---|
| **Coûts espérés tous $\geq0$** *(VCG pur)* | **Table circulaire simple** : $\bar c_i^{\text{VCG}}(t_i)-\bar c_{i+1}^{\text{VCG}}(t_{i+1})$ |
| **Cas général** *(après subventions)* | **Théorème 9.12** : $\bar c_i(t_i)-\bar c_{i+1}(t_{i+1})+\bar c_{i+1}-\frac1N\sum_j\bar c_j$ |

**La vérification** : *« **les $N$ individus font simplement des paiements ENTRE EUX** »* ⟹ la somme est **nulle**.

⚠️ **Ce qu'on PERD** : la **dominance** ; il ne reste qu'un **équilibre bayésien-nashien**.

### Méthode 5 — Tester l'existence d'un mécanisme parfait

1. **Calculer $\hat x$, $\tilde x^i$, et les $c_i^{\text{VCG}}$.**
2. **Calculer $U_i^{\text{VCG}}(t_i)$** — l'utilité espérée dans le VCG.
3. **Identifier les $IR_i(t_i)$** — **attention aux DROITS DE PROPRIÉTÉ**.
4. **Calculer $\psi_i^*=\max_{t_i}\big(IR_i(t_i)-U_i^{\text{VCG}}(t_i)\big)$** — **elle peut être NÉGATIVE**.
5. **Calculer le revenu ex ante espéré du VCG.**
6. **Comparer** :

$$\text{revenu VCG}\ \geq\ \sum_i\psi_i^* \ \Longleftrightarrow\ \textbf{le mécanisme parfait EXISTE}$$

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire qu'il faut examiner tous les mécanismes | **Le principe de révélation** réduit à l'ensemble **gérable** des directs incitatifs | *« sans rien perdre »* |
| 2 | Mal énoncer le principe de révélation | *« **de N'IMPORTE QUELLE procédure ET DE SON ÉQUILIBRE**, on construit un direct incitatif équivalent »* | Il faut **l'équilibre** aussi |
| 3 | Oublier la rationalité individuelle | *« la participation est **entièrement VOLONTAIRE** »* | ⟹ $\bar c_i(0)\leq0$ |
| 4 | Croire qu'il faut $u_i(v_i,v_i)\geq0$ pour tout $v_i$ séparément | Le théorème 9.5(ii) **réduit tout à $\bar c_i(0)\leq0$** | L'intégrale est **toujours $\geq0$** |
| 5 | Rater l'interversion d'intégrales en (9.11) | C'est **le** pas qui fait apparaître $1-F_i$ | De $dx\,dv_i$ à $dv_i\,dx$ |
| 6 | Oublier le « $+\sum_i\bar c_i(0)$ » | Il est **essentiel** — c'est lui qui donne la borne (9.14) | Et il est **$\leq0$** |
| 7 | Ne pas voir la moyenne pondérée | Les $N+1$ nombres somment à **un** avec le poids du vendeur, **associé au nombre ZÉRO** | D'où la règle du $\max$ **avec 0** |
| 8 | Oublier le « $\max\{0,\dots\}$ » dans $p_i^*$ | **Le vendeur GARDE l'objet** si tous les crochets sont négatifs | C'est **la première inefficacité** |
| 9 | Omettre l'hypothèse de régularité | Sans elle, **$p_i^*$ n'a PAS besoin de satisfaire (i)** | *« l'hypothèse est seulement par SIMPLICITÉ »* |
| 10 | Croire que la régularité n'a qu'un rôle | Elle fait **DEUX** choses : **(i)** ET la **distinctivité avec probabilité un** |  |
| 11 | Croire que $F$ uniforme est le seul cas | Elle tient **chaque fois que $F_i$ est CONVEXE** | Exercice |
| 12 | Mal interpréter $v-\frac{1-F}{f}$ | C'est **LE REVENU MARGINAL** du vendeur | Pas une « valeur virtuelle » quelconque |
| 13 | Se tromper d'effet dans la dérivation de $MR$ | **Positif** : $v_if_i(v_i)$ · **négatif** : $1-F_i(v_i)$, la **masse des valeurs au-dessus** | Puis **diviser par $f_i$** |
| 14 | Croire que le perdant paie quelque chose | **NON** — la monotonie force l'intégrale à **zéro** | Il paie **rien** |
| 15 | Croire que le gagnant paie sa valeur | Il paie $r_i^*(v_{-i})$, **INDÉPENDANT de sa propre déclaration** | La plus grande déclaration **perdante** |
| 16 | Croire que la véracité est seulement un Nash ici | *« **c'est une STRATÉGIE DOMINANTE — MÊME SI les autres ne disent pas la vérité** »* | Théorème 9.8 |
| 17 | Oublier l'inconvénient du mécanisme optimal | *« **le vendeur doit CONNAÎTRE les distributions $F_i$** »* — contrairement aux enchères standard | Une exigence lourde |
| 18 | Ne citer qu'une source d'inefficacité | **DEUX** : le vendeur **garde** l'objet · le **mauvais** enchérisseur le reçoit |  |
| 19 | Croire que la seconde inefficacité existait au chapitre 4 | **NON** — là le monopoleur **ne pouvait pas distinguer** les consommateurs | Ici il **discrimine** |
| 20 | Oublier ce qui élimine la seconde inefficacité | **La SYMÉTRIE** | Elle rend les crochets **identiques** |
| 21 | Mal poser l'équation de $\rho^*$ | $\rho^*-\frac{1-F(\rho^*)}{f(\rho^*)}=0$ | $MR(\rho^*)=0$ |
| 22 | Croire que le gagnant paie la deuxième offre | Il paie **$\max\{\rho^*,\ \text{deuxième offre}\}$** | Le prix de réserve peut mordre |
| 23 | Croire que seule l'enchère au second prix marche | *« **Ajouter un prix de réserve approprié rend les trois autres optimales AUSSI** »* | Exercice |
| 24 | Croire que $X$ peut être infini au §9.5 | *« **Pour garder les choses simples, nous supposons que $X$ est FINI** »* | Et il le reste au §9.5.8 |
| 25 | Croire que l'état social décrit tout | *« **il ne décrit PAS complètement tout ce qui est pertinent** — il y a la MONNAIE »* | D'où la quasi-linéarité |
| 26 | Oublier ce que la quasi-linéarité permet | **Un TAUX COMMUN de substitution d'utilité entre individus** | D'où la **somme** |
| 27 | Croire qu'un état efficace maximise autre chose | **Il maximise $\sum_i v_i(x,t_i)$** — définition 9.3 | Grâce à la quasi-linéarité |
| 28 | Confondre les trois moments d'efficacité | **Ex ante ⟹ intérimaire ⟹ ex post** — le livre se concentre sur **la DERNIÈRE** | Plus d'incertitude, plus d'assurance |
| 29 | Appeler $x(\cdot)$ une « fonction de choix social » | *« **nous ne l'appelons PAS ainsi parce que nous n'exigeons PAS que le RANG soit tout $X$** »* | Note 22 |
| 30 | Oublier $\sum_x p_x(t)=1$ dans la déf. 9.4 | **Un état social DOIT être choisi** | Contrairement à la déf. 9.1 |
| 31 | Mal calculer l'externalité | **Sans $i$ MOINS avec $i$**, et **seulement sur les $j\neq i$** | Pas l'inverse |
| 32 | Croire que l'externalité peut être négative | **NON** — $\tilde x^i$ **maximise** la somme des autres | *« toujours non négative »* |
| 33 | Se tromper dans la preuve du théorème 9.10 | $r_i$ **n'apparaît QUE dans la PREMIÈRE somme** | Le second terme est **fixe** |
| 34 | Croire que le VCG équilibre le budget | **NON** — il **dégage un SURPLUS** | D'où le §9.5.5 |
| 35 | Croire qu'on peut détruire le surplus | *« **détruire une portion quelconque N'EST SIMPLEMENT PAS UNE OPTION** »* | Cela tuerait l'efficacité |
| 36 | Croire que le VCG contredit Gibbard-Satterthwaite | **NON** — *« **la restriction à la QUASI-LINÉARITÉ nous permet d'éviter la conclusion négative** »* | La restriction de domaine |
| 37 | Croire que le théorème 9.11 préserve la dominance | **NON** — *« il dit SEULEMENT que c'est un **BAYES-NASH** »* | On **perd** la dominance |
| 38 | Croire qu'on peut avoir tout à la fois | *« **il existe des théorèmes disant que c'est IMPOSSIBLE** dans une grande variété de circonstances »* | Green-Laffont, Holmström |
| 39 | Croire que le paiement de la table est le coût | **NON** — chacun **REÇOIT aussi** un paiement | Le coût est la **différence** |
| 40 | Oublier pourquoi les rapports extrêmes coûtent plus | *« **plus le rapport est extrême, plus il est probable qu'il obtienne ce qu'il veut** »* | Cela **les garde honnêtes** |
| 41 | Croire que les droits de propriété ne changent rien | Ils **augmentent les $IR_i(t_i)$** ⟹ **plus difficile** | Exemple 9.6 |
| 42 | Croire que le VCG tient compte de la propriété | *« **le fait que le vendeur possède l'objet NE JOUE AUCUN RÔLE dans le VCG** »* | Note 39 |
| 43 | Croire que $\psi_i^*\geq0$ | *« **et elle peut être NÉGATIVE** »* | Cf. $\psi_2^*=-34/9$ |
| 44 | Oublier que la subvention préserve la dominance | Elle est versée **quel que soit le rapport** ⟹ **aucun effet sur les incitations** |  |
| 45 | Croire que la table circulaire suffit pour l'IR-VCG | **NON** — un coût espéré **négatif** peut **violer l'IR du voisin** | D'où le théorème 9.12 |
| 46 | Croire que le critère est seulement suffisant | **Il est NÉCESSAIRE AUSSI** *(théorème 9.17)* | Une **équivalence** |
| 47 | Se tromper dans le calcul de l'exemple 9.8 | $\psi_s^*=\max(t_s-t_s^2/2)=\tfrac12$ en $t_s=1$, et le revenu VCG vaut $\tfrac13$ | $\tfrac12>\tfrac13$ ⟹ **impossible** |
| 48 | Croire que les grèves sont irrationnelles | *« cette « intuition » est **SIMPLEMENT FAUSSE — des inefficacités DOIVENT occasionnellement apparaître** »* | Leçon 1 |
| 49 | Croire au théorème de Coase sans réserve | *« **il PEUT ÉCHOUER quand les parties ont de l'INFORMATION PRIVÉE** »* | Leçon 2 |
| 50 | Sous-estimer l'enjeu de la privatisation | *« **l'assignation, PAR SA NATURE MÊME, CRÉE DES DROITS DE PROPRIÉTÉ** »* | Des pertes **persistantes** |

## 📌 Ultimate Review

**§9.4 — MAXIMISER LE REVENU.**

**LE PRINCIPE DE RÉVÉLATION** : de **toute** procédure de vente **et de son équilibre**, on construit un mécanisme direct **incitatif équivalent** ⟹

$$\boxed{\;\textbf{« Nous pouvons RESTREINDRE notre recherche à l'ensemble GÉRABLE des mécanismes}\\\textbf{directs incitatifs. SANS RIEN PERDRE. »}\;}$$

**LA RATIONALITÉ INDIVIDUELLE** : la participation étant **volontaire**, $u_i(v_i,v_i)\geq0$. Par le théorème 9.5(ii), $u_i(v_i,v_i)=-\bar c_i(0)+\int_0^{v_i}\bar p_i$, d'où

$$\boxed{\;\bar c_i(0)\leq0\;} \tag{9.10}$$

**LA RÉÉCRITURE DU REVENU** *(interversion d'intégrales, puis diviser-multiplier par $f_i$)* :

$$R=\int\!\cdots\!\int\left\{\sum_i p_i(v)\left[v_i-\frac{1-F_i(v_i)}{f_i(v_i)}\right]\right\}f_1\cdots f_N\,dv+\sum_i\bar c_i(0) \tag{9.11}$$

**LA MAXIMISATION POINT PAR POINT** : l'accolade est **une MOYENNE PONDÉRÉE des $N+1$ nombres** $\big\{v_i-\frac{1-F_i}{f_i}\big\}_i$ **et $\boxed{0}$** *(le poids du vendeur)* ⟹

$$p_i^*(v)=1 \ \iff \ v_i-\frac{1-F_i(v_i)}{f_i(v_i)}>\max\Big\{0,\ v_j-\frac{1-F_j(v_j)}{f_j(v_j)}\ \forall j\neq i\Big\} \tag{9.16}$$

$$c_i^*(v)=p_i^*(v)v_i-\int_0^{v_i}p_i^*(x,v_{-i})dx \tag{9.17}$$

**L'HYPOTHÈSE DE RÉGULARITÉ (9.18)** : $v_i-\frac{1-F_i(v_i)}{f_i(v_i)}$ **strictement croissante**. Elle assure **(i)** ET **la distinctivité avec probabilité un**. **Vraie si $F_i$ est CONVEXE.**

**THÉORÈME 9.7** : ce mécanisme donne **le plus grand revenu espéré possible**.

**L'INTERPRÉTATION** :

$$\boxed{\;MR_i(v_i)=v_i-\frac{1-F_i(v_i)}{f_i(v_i)} \ = \ \textbf{LE REVENU MARGINAL}\;}$$

*Effet **positif** : $v_if_i(v_i)$. Effet **négatif** : $1-F_i(v_i)$, **la MASSE de valeurs au-dessus dont le coût baisse UN POUR UN**. Puis **diviser par $f_i(v_i)$**.*

**LE PAIEMENT** : **le perdant ne paie RIEN** *(monotonie ⟹ intégrale nulle)* ; **le gagnant paie**

$$r_i^*(v_{-i})=\textbf{la plus grande valeur qu'il aurait pu déclarer SANS gagner}$$

⚠️ **INDÉPENDANT de sa propre déclaration** ⟹ **la véracité est DOMINANTE** *(théorème 9.8)*. **L'inconvénient** : *« le vendeur doit **CONNAÎTRE les $F_i$** »*.

**LES DEUX INEFFICACITÉS** : **le vendeur garde parfois l'objet** *(analogue à la restriction d'offre du monopole)* · **le mauvais enchérisseur peut le recevoir** *(nouveau : le vendeur peut DISCRIMINER)*.

**SOUS SYMÉTRIE** — **THÉORÈME 9.9** :

$$\boxed{\;\textbf{UNE ENCHÈRE AU SECOND PRIX AVEC PRIX DE RÉSERVE } \rho^* \ : \ \rho^*-\frac{1-F(\rho^*)}{f(\rho^*)}=0\;}$$

> *« **Est-il alors ÉTONNANT que ces enchères soient d'un usage si RÉPANDU ?** »*

**§9.5 — L'EFFICACITÉ ALLOCATIVE.**

**Le cadre** : $X$ **FINI**, une **monnaie**, types $T_i$ finis, **a priori commun $q$**, types **indépendants**.

$$\textbf{UTILITÉ QUASI-LINÉAIRE} \ : \ v_i(x,t_i)+m$$

⚠️ **Elle donne un TAUX COMMUN de substitution d'utilité** ⟹ **DÉFINITION 9.3** : $\hat x(t)$ est **ex post efficace** ssi elle **maximise $\sum_i v_i(x,t_i)$**.

**LE PRINCIPE DE RÉVÉLATION, à nouveau** : *« Au lieu que les individus jouent leurs stratégies eux-mêmes, **concevez un mécanisme qui LES JOUE POUR EUX après qu'ils ont rapporté leurs types. C'est tout ce qu'il y a à dire !** »*

**LE MÉCANISME VCG** — **CHACUN PAIE SON EXTERNALITÉ** :

$$c_i^{\text{VCG}}(t)=\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)-\sum_{j\neq i}v_j\big(\hat x(t),t_j\big)$$

⚠️ *« **Généralisation de l'enchère au SECOND PRIX** : le gagnant, **par sa seule présence, EMPÊCHE la deuxième valeur d'être réalisée** — et **il paie précisément ce qu'il empêche**. »*

**THÉORÈME 9.10** : la véracité est **FAIBLEMENT DOMINANTE**.

*Preuve : substituer le coût ⟹ l'utilité vaut $\sum_{j=1}^N v_j(\hat x(r_i,t_{-i}),t_j)-\sum_{j\neq i}v_j(\tilde x^i(t_{-i}),t_j)$ ; **$r_i$ n'apparaît QUE dans la première somme**, que $\hat x(t_i,t_{-i})$ **maximise par définition**.*

**LES TROIS REMARQUES** : le VCG **dégage un SURPLUS** · **la participation est un équilibre** · **AUCUNE contradiction avec Gibbard-Satterthwaite, grâce à la QUASI-LINÉARITÉ**.

**L'ÉQUILIBRE BUDGÉTAIRE — THÉORÈME 9.11.** **La TABLE CIRCULAIRE** : chacun paie **à son voisin de droite** son **externalité ESPÉRÉE** $\bar c_i^{\text{VCG}}(t_i)$.

⚠️ **Le prix payé** : *« nous **PERDONS** la propriété très agréable d'équilibre en **STRATÉGIES DOMINANTES** »* — il ne reste qu'un **Bayes-Nash**.

**LES DROITS DE PROPRIÉTÉ — $IR_i(t_i)$.** *« **plus les $IR_i$ sont ÉLEVÉS, plus il est DIFFICILE de construire un mécanisme efficace** »*. **Exemple 9.6** : l'ingénieur **refuse de construire** quand $t_1<4$.

**LE MÉCANISME IR-VCG** :

$$\psi_i^*=\max_{t_i}\big(IR_i(t_i)-U_i^{\text{VCG}}(t_i)\big) \tag{9.27}$$

⚠️ **Les subventions, versées quels que soient les rapports, N'AFFECTENT PAS les incitations** ⟹ la **dominance survit**.

**THÉORÈME 9.12** : si un mécanisme incitatif **dégage un surplus espéré**, on peut **l'équilibrer** par

$$c_i^B(t)=\bar c_i(t_i)-\bar c_{i+1}(t_{i+1})+\bar c_{i+1}-\frac1N\sum_j\bar c_j$$

*(« payer à chacun $\bar c_{i+1}/N$, et à son voisin de droite $\bar c_i(t_i)$ en plus »)*

**THÉORÈME 9.13 (SUFFISANCE)** et **THÉORÈME 9.17 (NÉCESSITÉ)** :

$$\boxed{\;\textbf{L'IR-VCG dégage un SURPLUS ESPÉRÉ} \ \iff \ \textbf{il EXISTE un mécanisme incitatif,}\\\textbf{ex post efficace, à budget équilibré ET individuellement rationnel}\;}$$

**L'EXEMPLE 9.8 (MYERSON-SATTERTHWAITE)** : acheteur et vendeur, valeurs **uniformes sur $[0,1]$**, $IR_s(t_s)=t_s$.

$$\bar c_i^{\text{VCG}}(t_i)=\tfrac12t_i^2 \qquad U_i^{\text{VCG}}(t_i)=\tfrac12t_i^2 \qquad \text{revenu VCG}=\tfrac13$$

$$\psi_b^*=0 \qquad \psi_s^*=\tfrac12 \qquad\Longrightarrow\qquad \boxed{\tfrac12>\tfrac13 \ : \ \textbf{IMPOSSIBLE}}$$

**LES QUATRE LEÇONS :**

| # | La leçon |
|---|---|
| **1** | **LES GRÈVES** : *« l'intuition qu'un accord aurait pu être atteint sans grève est **SIMPLEMENT FAUSSE — des inefficacités DOIVENT occasionnellement apparaître** »* |
| **2** | **LES DROITS DE PROPRIÉTÉ COMPTENT** : *« **le théorème de COASE PEUT ÉCHOUER quand les parties ont de l'INFORMATION PRIVÉE** »* |
| **3** | **LA PRIVATISATION** : *« **l'assignation, PAR SA NATURE MÊME, CRÉE DES DROITS** ⟹ une assignation inefficace mène à des **pertes INÉVITABLES, PERSISTANTES et POTENTIELLEMENT GRANDES** »* |
| **4** | **LA SYMÉTRIE** : *« **un cadre SANS droits est un cadre où les droits sont SYMÉTRIQUES** »* — et là tout est possible |

> *« **La théorie du design de mécanismes est RICHE, PUISSANTE et IMPORTANTE, et bien que nous n'ayons fait qu'EFFLEURER LA SURFACE, nous espérons vous avoir donné un sens de son UTILITÉ pour traiter LE PROBLÈME FONDAMENTAL DE L'ALLOCATION DES RESSOURCES EN PRÉSENCE D'INFORMATION PRIVÉE.** »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Énoncer le principe de révélation et dire ce qu'il permet.**

</summary>

> *« **Étant donnée une procédure de vente ARBITRAIRE et un ÉQUILIBRE DE NASH** dans lequel chaque enchérisseur emploie une stratégie associant à sa valeur un comportement maximisant son paiement, **nous pouvons construire UN MÉCANISME DIRECT INCITATIF ÉQUIVALENT.** »*

> *« Par conséquent, **AUCUN mécanisme parmi TOUS LES MÉCANISMES CONCEVABLES ne donne plus de revenu que le mécanisme direct incitatif maximisant le revenu.** »*

⚠️ *« **Nous pouvons donc restreindre notre recherche à l'ensemble GÉRABLE des mécanismes directs incitatifs. Nous avons CONSIDÉRABLEMENT SIMPLIFIÉ notre problème SANS RIEN PERDRE.** »*

</details>

<details class="details--riche">
<summary>

**2. Réduire la rationalité individuelle à une seule inégalité.**

</summary>

**La contrainte** : $u_i(v_i,v_i)=\bar p_i(v_i)v_i-\bar c_i(v_i)\geq0$ pour tout $v_i$ — *« sinon, **chaque fois qu'il a cette valeur, IL NE PARTICIPERA SIMPLEMENT PAS** »*.

**Par le théorème 9.5(ii)** :

$$u_i(v_i,v_i)=-\bar c_i(0)+\int_0^{v_i}\bar p_i(x)dx$$

⚠️ **L'intégrale est TOUJOURS $\geq0$** ⟹ la contrainte tient **ssi**

$$\boxed{\bar c_i(0)\leq0} \tag{9.10}$$

</details>

<details class="details--riche">
<summary>

**3. Réécrire le revenu sous la forme (9.11).**

</summary>

**Trois pas** :

1. Développer et **INTERVERTIR L'ORDRE D'INTÉGRATION** dans $\int_0^1\!\int_0^{v_i}\bar p_i(x)f_i(v_i)dx\,dv_i$ ⟹ $\int_0^1\bar p_i(x)\big(1-F_i(x)\big)dx$.
2. **Renommer $x$ en $v_i$** et **diviser-multiplier par $f_i(v_i)$** ⟹ le crochet.
3. **Remonter des $\bar p_i$ aux $p_i$**.

$$R=\int\!\cdots\!\int\left\{\sum_i p_i(v)\left[v_i-\frac{1-F_i(v_i)}{f_i(v_i)}\right]\right\}f_1\cdots f_N\,dv+\sum_i\bar c_i(0)$$

</details>

<details class="details--riche">
<summary>

**4. Expliquer la maximisation point par point.**

</summary>

> *« **(9.12) serait maximisée si l'accolade était maximisée POUR CHAQUE vecteur de valeurs.** »*

⚠️ **L'observation clé** : les $p_i(v)$ étant **non négatifs et de somme $\leq1$**, les $N+1$ nombres $p_1(v),\dots,p_N(v),1-\sum_ip_i(v)$ **somment à UN** ⟹ l'accolade est

$$\sum_i p_i(v)\left[v_i-\frac{1-F_i}{f_i}\right]+\Big(1-\sum_ip_i(v)\Big)\cdot 0$$

*« c'est **JUSTE UNE MOYENNE PONDÉRÉE** des $N+1$ nombres »* ⟹ elle *« ne peut être plus grande que **LE PLUS GRAND** de ces termes **SI L'UN EST POSITIF**, et **PAS PLUS GRANDE QUE ZÉRO si tous sont négatifs** »*.

⚠️ **Le zéro est le « poids du vendeur »** — il autorise de **garder l'objet**.

</details>

<details class="details--riche">
<summary>

**5. Écrire le mécanisme optimal (9.16)-(9.17).**

</summary>

$$p_i^*(v)=\begin{cases}1,&\text{si } v_i-\dfrac{1-F_i(v_i)}{f_i(v_i)}>\max\Big\{0,\ v_j-\dfrac{1-F_j(v_j)}{f_j(v_j)}\Big\} \ \forall j\neq i\\0,&\text{sinon}\end{cases}$$

$$c_i^*(v)=p_i^*(v)\,v_i-\int_0^{v_i}p_i^*(x,v_{-i})\,dx$$

*(Obtenu en imposant (ii) **vecteur par vecteur** — *« parce que les $\bar c_i^*$ et $\bar p_i^*$ sont des MOYENNES »* — puis en posant $c_i^*(0,v_{-i})=0$ pour (iii).)*

</details>

<details class="details--riche">
<summary>

**6. Énoncer l'hypothèse de régularité et ses DEUX rôles.**

</summary>

$$v_i-\frac{1-F_i(v_i)}{f_i(v_i)} \quad\textbf{strictement CROISSANTE en } v_i \tag{9.18}$$

| Rôle | Ce qu'il assure |
|---|---|
| **1** | La contrainte **(i) de monotonie** de $\bar p_i^*$ |
| **2** | *« les nombres sont **DISTINCTS AVEC PROBABILITÉ UN** — une exigence que nous avions employée **mais laissée injustifiée jusqu'ici** »* |

⚠️ *« Elle tient **chaque fois que $F_i$ est CONVEXE** »*, dont **l'uniforme**.

*(Note 17 : quand elle échoue, **le mécanisme construit n'est PAS optimal** ; on peut construire l'optimal, mais *« l'hypothèse est **seulement par SIMPLICITÉ** »*.)*

</details>

<details class="details--riche">
<summary>

**7. Interpréter $v_i-\frac{1-F_i(v_i)}{f_i(v_i)}$.**

</summary>

> *« Il représente **LE REVENU MARGINAL $MR_i(v_i)$ que le vendeur obtient en AUGMENTANT la probabilité que l'objet soit assigné à $i$ quand sa valeur est $v_i$**. »*

| L'effet | Le raisonnement |
|---|---|
| **$+\ v_if_i(v_i)$** | *« cela permet **d'augmenter le coût jusqu'à $v_i$** en laissant son utilité inchangée ; la densité étant $f_i(v_i)$ »* |
| **$-\ \big(1-F_i(v_i)\big)$** | *« **la compatibilité incitative** force que **augmenter la probabilité pour les valeurs BASSES RÉDUIT UN POUR UN le coût de TOUTES les valeurs plus élevées**. Il y a **une MASSE de $1-F_i(v_i)$** au-dessus »* |

Puis **diviser par $f_i(v_i)$** *(« c'est l'effet TOTAL dû à la densité »)*.

</details>

<details class="details--riche">
<summary>

**8. Comment la règle d'allocation devient-elle transparente ?**

</summary>

> *« **Si $MR_i(v_i)>MR_j(v_j)$, le vendeur peut AUGMENTER SON REVENU en RÉDUISANT la probabilité pour $j$ et en L'AUGMENTANT pour $i$.** »*

> *« Le vendeur maximise donc **en assignant TOUTE la probabilité à celui de $MR$ LE PLUS ÉLEVÉ, TANT QU'IL EST POSITIF. SI TOUS SONT NÉGATIFS, LE VENDEUR FAIT MIEUX DE GARDER L'OBJET.** »*

⚠️ **C'est exactement la logique du monopoleur.**

</details>

<details class="details--riche">
<summary>

**9. Que paie le gagnant, et que paie le perdant ?**

</summary>

**Le PERDANT** : $p_i^*(v_i,v_{-i})=0$ ⟹ **par la monotonie**, $p_i^*(x,v_{-i})=0$ pour **tout $x\leq v_i$** ⟹ **l'intégrale est NULLE** ⟹

$$c_i^*(v_i,v_{-i})=0 \ : \ \textbf{il ne paie RIEN.}$$

**Le GAGNANT** : la monotonie donne un **seuil** $r_i^*(v_{-i})$, et

$$c_i^*=v_i-\int_{r_i^*}^{v_i}1\,dx=\boxed{r_i^*(v_{-i})}$$

⚠️ *« **INDÉPENDANT de sa propre valeur déclarée. C'est LA VALEUR MAXIMALE QU'IL AURAIT PU DÉCLARER, ÉTANT DONNÉES LES DÉCLARATIONS DES AUTRES, SANS RECEVOIR L'OBJET.** »*

</details>

<details class="details--riche">
<summary>

**10. Énoncer le théorème 9.8 et ses deux remarques.**

</summary>

**Le mécanisme optimal** : l'objet va à celui dont $v_i-\frac{1-F_i}{f_i}$ est **strictement le plus grand ET positif** ; s'il n'y en a aucun, **le vendeur garde et personne ne paie** ; le gagnant paie $r_i^*(v_{-i})$.

**Remarque 1** : *« **l'incitation à dire la vérité est BIEN PLUS FORTE : c'est une STRATÉGIE DOMINANTE — MÊME SI les autres ne disent pas la vérité** »*.

**Remarque 2** : *« **UN INCONVÉNIENT : pour l'implémenter, LE VENDEUR DOIT CONNAÎTRE LES DISTRIBUTIONS $F_i$. Ceci CONTRASTE avec les enchères standard**, que le vendeur peut implémenter **SANS AUCUNE information**. »*

</details>

<details class="details--riche">
<summary>

**11. Quelles sont les deux sources d'inefficacité, et d'où viennent-elles ?**

</summary>

| # | La source | Son analogue |
|---|---|---|
| **1** | **Le vendeur GARDE l'objet** quand tous les $MR_i\leq0$ | *« le monopoleur **RESTREINT LA PRODUCTION** — ici, **il restreint l'offre EN GARDANT PARFOIS L'OBJET** »* |
| **2** | **Le mauvais enchérisseur le reçoit** | *« Elle **NE SURVENAIT PAS au chapitre 4**, où le monopoleur **ne pouvait pas distinguer les consommateurs. ICI, il SAIT que la distribution de $i$ est $F_i$ — CETTE CONNAISSANCE LUI PERMET DE DISCRIMINER** »* |

> *« **La présence d'inefficacités n'est PAS surprenante. Après tout, LE VENDEUR EST UN MONOPOLEUR.** »*

</details>

<details class="details--riche">
<summary>

**12. Énoncer le théorème 9.9.**

</summary>

Sous **symétrie** et régularité, *« **REMARQUABLEMENT, le mécanisme optimal peut être MIMÉ par une ENCHÈRE AU SECOND PRIX AVEC PRIX DE RÉSERVE $\rho^*$** »* où

$$\rho^*-\frac{1-F(\rho^*)}{f(\rho^*)}=0 \tag{9.19}$$

**La règle** : *« celui dont l'offre est **la plus haute ET STRICTEMENT au-dessus de la réserve** gagne et paie **la deuxième offre OU la réserve, SELON CE QUI EST LE PLUS GRAND** »*.

⚠️ *« C'est optimal parce que, **JUSTE COMME au second prix standard, IL EST DOMINANT DE MISER SA VALEUR** »*.

⚠️ **Les trois autres enchères** deviennent **aussi optimales** avec un prix de réserve approprié.

</details>

<details class="details--riche">
<summary>

**13. Décrire le cadre du §9.5.**

</summary>

$X$ **FINI** d'états sociaux · une **MONNAIE** · $N$ individus de types $T_i$ **finis** · un **A PRIORI COMMUN $q$** avec **types INDÉPENDANTS**.

⚠️ *« **L'état social ne décrit PAS complètement tout ce qui est pertinent. Pour tout état FIXÉ, un individu peut utiliser sa monnaie pour acheter des marchandises INDÉPENDANTES de, et SANS EFFET sur, l'état social.** »*

$$\textbf{UTILITÉ QUASI-LINÉAIRE} \ : \ v_i(x,t_i)+m$$

⚠️ *« $v_i(x,t_i)$ est **LA VALEUR, EN DOLLARS**, que $i$ place sur $x$ »* — et elle **ne dépend QUE de SON type** ⟹ **VALEURS PRIVÉES INDÉPENDANTES**, comme au §9.2.

</details>

<details class="details--riche">
<summary>

**14. Qu'implique la quasi-linéarité pour l'efficacité ?**

</summary>

> *« **La quasi-linéarité est une hypothèse FORTE. Elle implique qu'IL Y A UN TAUX COMMUN AUQUEL L'UTILITÉ PEUT ÊTRE SUBSTITUÉE ENTRE INDIVIDUS.** »*

**Sa conséquence** : $x$ **n'est PAS efficace** dès que $\sum_i v_i(y)>\sum_i v_i(x)$, car **les transferts**

$$\tau_i=v_i(x)-v_i(y)+\frac1N\sum_j\big(v_j(y)-v_j(x)\big)$$

*« **somment à zéro par construction** »* et donnent à **chacun** un gain de $\frac1N\sum_j(v_j(y)-v_j(x))>0$.

⚠️ *« **C'EST ICI que le taux commun est ABSOLUMENT CENTRAL.** »*

</details>

<details class="details--riche">
<summary>

**15. Énoncer la définition 9.3, et distinguer les trois moments.**

</summary>

$\hat x:T\to X$ est **ex post Pareto-efficace** si, **pour chaque $t$**, $\hat x(t)$ résout $\displaystyle\max_{x\in X}\sum_{i=1}^{N}v_i(x,t_i)$.

| Le moment | Ce que chacun sait |
|---|---|
| **Ex ante** | rien de son type |
| **Intérimaire** | **son** type seulement |
| **Ex post** | **tous** les types |

> *« **Plus il y a d'incertitude, plus grande est la portée pour une ASSURANCE mutuellement bénéfique. Nous attendons donc EX ANTE ⟹ INTÉRIMAIRE ⟹ EX POST. Nous nous concentrerons sur LA DERNIÈRE.** »*

*(Note 22 : on n'appelle **pas** $x(\cdot)$ une **fonction de choix social** parce qu'on **n'exige pas que son rang soit tout $X$**.)*

</details>

<details class="details--riche">
<summary>

**16. Exposer le principe de révélation dans le cadre du §9.5.**

</summary>

**Le problème** : *« les possibilités sont **DÉCOURAGEANTES** — annonces publiques une à une, punitions par les doutes des autres, votes à la pluralité, majorité par paires, bulletins secrets ou publics et séquentiels… **NOUS POURRIONS CONTINUER ENCORE ET ENCORE.** »*

**La solution** : *« Supposons qu'un jeu extensif complexe **implémente** une issue efficace dans un **Bayes-Nash**. »*

> ⚠️ *« **Au lieu que les individus jouent leurs stratégies EUX-MÊMES, concevez un mécanisme direct QUI LES JOUE POUR EUX après qu'ils ont rapporté leurs types.** Si les autres rapportent honnêtement, **de votre perspective, C'EST COMME SI vous participiez au jeu original. Mais là, IL ÉTAIT OPTIMAL d'effectuer les actions de votre stratégie CONDITIONNELLEMENT À VOTRE TYPE RÉEL.** »*

> *« **C'est tout ce qu'il y a à dire !** »*

</details>

<details class="details--riche">
<summary>

**17. Énoncer les définitions 9.4 et 9.5.**

</summary>

**DÉF. 9.4** : des **probabilités $p_x(t)$, UNE POUR CHAQUE $x\in X$**, et des **coûts $c_i(t)$**. *« **Parce qu'UN état social DOIT être choisi, nous exigeons $\sum_{x\in X}p_x(t)=1$.** »*

⚠️ **La différence avec la déf. 9.1** : on indexe par **les états**, et la somme vaut **exactement 1**.

**DÉF. 9.5** : le mécanisme est **compatible incitativement** si $u_i(r_i,t_i)=\sum_x\bar p_i^x(r_i)v_i(x,t_i)-\bar c_i(r_i)$ est **maximisée en $r_i=t_i$** quand les autres disent la vérité — *« un **ÉQUILIBRE BAYÉSIEN-NASHIEN** »*.

</details>

<details class="details--riche">
<summary>

**18. Définir l'externalité, et l'analogie du second prix.**

</summary>

> *« Le second prix est décrit comme une enchère où **LE GAGNANT « PAIE SON EXTERNALITÉ » : PAR SA SEULE PRÉSENCE, IL EMPÊCHE la deuxième valeur d'être réalisée — et il paie PRÉCISÉMENT LE MONTANT DE L'EXTERNALITÉ QU'IL IMPOSE.** »*

**L'ASTUCE** : *« penser **À LA DIFFÉRENCE QUE SA PRÉSENCE FAIT À L'UTILITÉ TOTALE DES AUTRES** »*.

$$\boxed{\;\underbrace{\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)}_{\textbf{SANS } i}-\underbrace{\sum_{j\neq i}v_j\big(\hat x(t),t_j\big)}_{\textbf{AVEC } i}\;}$$

⚠️ *« **Elle est TOUJOURS NON NÉGATIVE**, parce que $\tilde x^i$ **MAXIMISE** la somme des autres. »*

</details>

<details class="details--riche">
<summary>

**19. Énoncer la définition 9.6.**

</summary>

**Chacun rapporte simultanément son type.** L'état $\hat x(t)$ est choisi, et **chacun paie son externalité** :

$$c_i^{\text{VCG}}(t)=\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)-\sum_{j\neq i}v_j\big(\hat x(t),t_j\big)$$

> *« **L'IDÉE CLÉ est de définir les coûts de sorte que CHACUN INTERNALISE L'EXTERNALITÉ QUE, PAR SON RAPPORT, IL IMPOSE AU RESTE DE LA SOCIÉTÉ.** »*

*(D'après **Vickrey (1961)**, **Clarke (1971)**, **Groves (1973)**.)*

</details>

<details class="details--riche">
<summary>

**20. Démontrer le théorème 9.10.**

</summary>

Les autres rapportent $t_{-i}$ *( **pas nécessairement véridiquement**)*. L'utilité de $i$ rapportant $r_i$ est

$$v_i\big(\hat x(r_i,t_{-i}),t_i\big)-c_i^{\text{VCG}}(r_i,t_{-i})$$

**En substituant le coût :**

$$=\ \underbrace{\sum_{j=1}^{N}v_j\big(\hat x(r_i,t_{-i}),t_j\big)}_{\textbf{contient } r_i}\ -\ \underbrace{\sum_{j\neq i}v_j\big(\tilde x^i(t_{-i}),t_j\big)}_{\textbf{ne contient PAS } r_i}$$

⚠️ **Il suffit donc de maximiser la première somme** — et **par la définition même de $\hat x(t_i,t_{-i})$**, elle est **maximisée en $r_i=t_i$**, car $\hat x(r_i,t_{-i})\in X$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**21. Quelles sont les trois remarques sur le VCG ?**

</summary>

**1.** *« Parce que $c_i^{\text{VCG}}(t)$ est **toujours non négatif, le mécanisme NE FAIT JAMAIS DE DÉFICIT et DÉGAGE TYPIQUEMENT UN SURPLUS** »*.

**2. La participation est un équilibre** : s'il ne participe pas, **l'état devient $\tilde x^i(t_{-i})$** ; la définition de $\hat x$ donne $\sum_j v_j(\hat x)\geq\sum_j v_j(\tilde x^i)$, qui **se réarrange exactement** en « participer $\geq$ ne pas participer ».

**3.** **Aucune contradiction avec Gibbard-Satterthwaite** : *« **CONTRAIREMENT au chapitre 6, NOUS AVONS RESTREINT LE DOMAINE À LA QUASI-LINÉARITÉ. CETTE RESTRICTION NOUS PERMET D'ÉVITER LA CONCLUSION NÉGATIVE.** »*

</details>

<details class="details--riche">
<summary>

**22. Pourquoi le surplus du VCG est-il un problème ?**

</summary>

| Le sort du surplus | La conséquence |
|---|---|
| **Détruit** | *« l'issue — état social **PLUS** monnaie — **n'est PAS ex post efficace. DÉTRUIRE N'EST SIMPLEMENT PAS UNE OPTION.** »* |
| **Redistribué** | *« les $c_i^{\text{VCG}}$ **NE SONT PLUS LES BONS COÛTS — ils SURESTIMENT. Il n'est PAS DU TOUT CLAIR qu'il reste dominant de dire la vérité.** »* |

> *« **Heureusement, parce que les utilités sont QUASI-LINÉAIRES et les types INDÉPENDANTS, ce problème PEUT être résolu.** »*

**DÉF. 9.7** : à **budget équilibré** ssi $\sum_i c_i(t)=0$ **pour tout $t$**.

</details>

<details class="details--riche">
<summary>

**23. Énoncer le théorème 9.11 et sa description imagée.**

</summary>

Le coût de $i$ devient $\bar c_i^{\text{VCG}}(t_i)-\bar c_{i+1}^{\text{VCG}}(t_{i+1})$ *(avec $i+1=1$ quand $i=N$)*.

> ⚠️ *« **Disposez les $N$ individus AUTOUR D'UNE TABLE RONDE. Chacun PAIE À LA PERSONNE À SA DROITE SON EXTERNALITÉ ESPÉRÉE.** »*

**Le mécanisme est** : incitatif · ex post efficace · **à budget équilibré** · **avec participation volontaire**.

**Deux points** : c'est **le coût RÉEL**, pas espéré · *« **son coût réel est INFÉRIEUR à son externalité espérée**, parce qu'il **reçoit aussi** celle d'un autre »*.

*(Arrow 1979 ; d'Aspremont et Gérard-Varet 1979.)*

</details>

<details class="details--riche">
<summary>

**24. Démontrer le théorème 9.11.**

</summary>

**Budget** : **chaque $\bar c_j^{\text{VCG}}(t_j)$ apparaît une fois en $+$ et une fois en $-$** dans la somme cyclique.

**Incitation** : dans le nouveau mécanisme, le coût espéré est $\bar c_i^{\text{VCG}}(r_i)-\bar c_{i+1}$, où **$\bar c_{i+1}$ est UNE CONSTANTE** ⟹

$$u_i^{\text{nouveau}}(r_i,t_i)=u_i^{\text{VCG}}(r_i,t_i)+\bar c_{i+1}$$

⟹ **maximisé au même endroit** ⟹ en $r_i=t_i$.

**Participation** : $\bar c_{i+1}\geq0$ *(c'est un coût VCG ex ante espéré)* ⟹ **coûts faiblement plus bas** ⟹ **au moins aussi bien loti**. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**25. Qu'est-ce qu'on PERD au théorème 9.11 ?**

</summary>

> *« **Notez ATTENTIVEMENT que le théorème 9.11 NE DIT PAS que la révélation véridique est FAIBLEMENT DOMINANTE. Il dit SEULEMENT que c'est un ÉQUILIBRE BAYÉSIEN-NASHIEN.** »*

> ⚠️ *« **Bien que nous GAGNIONS un budget équilibré (et donc la PLEINE efficacité), NOUS PERDONS la propriété par ailleurs TRÈS AGRÉABLE d'équilibre en STRATÉGIES DOMINANTES.** »*

*(Note 30 : *« **il existe des théorèmes énonçant qu'il est IMPOSSIBLE d'atteindre LES DEUX** dans une grande variété de circonstances »* — **Green-Laffont (1977)**, **Holmström (1979b)**.)*

</details>

<details class="details--riche">
<summary>

**26. Que lit-on dans la table de l'exemple 9.5 ?**

</summary>

| Type | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ |
|---|---|---|---|---|---|---|---|---|---|
| **Paiement** | $\tfrac{10}{9}$ | $\tfrac23$ | $\tfrac13$ | $\tfrac19$ | $0$ | $0$ | $\tfrac19$ | $\tfrac13$ | $\tfrac23$ |

**Le calcul de $\bar c_1^{\text{VCG}}(4)$** : *« en rapportant $4<5$, **il ne peut être pivot QUE pour la piscine**, et **seulement quand 2 rapporte 6** »* ⟹ $\tfrac19(6-5)=\tfrac19$

> ⚠️ *« **Le paiement est PLUS ÉLEVÉ quand le rapport est PLUS EXTRÊME. Plus le rapport est extrême, PLUS il est probable qu'il OBTIENNE CE QU'IL VEUT. EXIGER DE PAYER PLUS LES GARDE HONNÊTES.** »*

</details>

<details class="details--riche">
<summary>

**27. Quelles hypothèses implicites le §9.5.6 lève-t-il ?**

</summary>

> *« Nous avons implicitement supposé **(1) que les individus NE PEUVENT PAS être forcés d'abandonner leur revenu** et **(2) qu'ils N'ONT AUCUN DROIT DE PROPRIÉTÉ sur les états sociaux** »*.

⚠️ **Quand (2) tombe** : quand on inclut **le VENDEUR** dans le mécanisme · un **propriétaire de firme** · **dissoudre un PARTENARIAT — un cabinet, UN MARIAGE**.

⟹ on introduit **$IR_i(t_i)$** = *« l'utilité espérée de $i$ **quand il NE participe PAS** »*. **Le trait notable** : *« **elle dépend NON TRIVIALEMENT de son TYPE PRIVÉ** »*.

</details>

<details class="details--riche">
<summary>

**28. Énoncer la définition 9.8 et ses deux remarques.**

</summary>

$$\sum_{x\in X}\bar p_i^x(t_i)v_i(x,t_i)-\bar c_i(t_i)\ \geq\ IR_i(t_i) \qquad\forall i,\ \forall t_i$$

> ⚠️ *« **Ce sont des contraintes SUPPLÉMENTAIRES. PLUS les $IR_i$ sont ÉLEVÉS, PLUS il sera DIFFICILE de construire un mécanisme efficace. Parce que LES DROITS DE PROPRIÉTÉ LES AUGMENTENT SOUVENT, LEUR PRÉSENCE PEUT CRÉER DES DIFFICULTÉS.** »*

| # | La remarque |
|---|---|
| **1** | On revient au cas **sans droits** en posant $IR_i(t_i)=\min_x v_i(x,t_i)$ |
| **2** | Ils modélisent aussi les **OPTIONS EXTÉRIEURES** : $IR_i(t_i)=\max_k U_i^k(t_i)$ |

</details>

<details class="details--riche">
<summary>

**29. Pourquoi le mécanisme à externalité espérée échoue-t-il dans l'exemple 9.6 ?**

</summary>

L'ingénieur *(individu 1)* a $v_1(D,t_1)=10$ — **son coût d'opportunité de construire** ⟹ $IR_1(t_1)=10$.

> *« Si $t_1<4$, alors **quels que soient les rapports, le mécanisme indiquera de CONSTRUIRE, et le paiement de 2 sera AU PLUS $10/9$. MÊME EN IGNORANT le paiement qu'il doit faire, son utilité s'il construit est STRICTEMENT INFÉRIEURE À 10** »* :

$$\max(t_1+5,\ 2t_1)+\tfrac{10}{9}<10 \quad\text{quand } t_1<4$$

⟹ *« **il est STRICTEMENT MIEUX LOTI en EXERÇANT SON DROIT DE NE PAS CONSTRUIRE. L'issue est INEFFICACE chaque fois que $t_1<4$.** »*

</details>

<details class="details--riche">
<summary>

**30. Construire le mécanisme IR-VCG.**

</summary>

$$\psi_i^*=\max_{t_i}\big(IR_i(t_i)-U_i^{\text{VCG}}(t_i)\big) \tag{9.27}$$

⚠️ *« la subvention **MINIMALE** — **et elle peut être NÉGATIVE** »*.

**Le mécanisme** : chacun rapporte, **reçoit $\psi_i^*$ QUEL QUE SOIT son rapport**, l'état est $\hat x(t)$, et il paie $c_i^{\text{VCG}}(t)-\psi_i^*$.

⚠️ *« **Parce que les subventions sont distribuées QUELS QUE SOIENT les rapports, ELLES N'ONT AUCUN EFFET SUR LES INCITATIONS. Il reste DOMINANT de dire la vérité.** »*

⟹ **incitatif, ex post efficace, individuellement rationnel** — **mais peut-être PAS à budget équilibré**.

</details>

<details class="details--riche">
<summary>

**31. Pourquoi la table circulaire simple ne suffit-elle plus ?**

</summary>

> *« **Parce que LES COÛTS VCG ONT ÉTÉ RÉDUITS par les subventions, IL SE POURRAIT QUE LE COÛT ESPÉRÉ D'UN INDIVIDU SOIT MAINTENANT NÉGATIF.** »*

> *« **Il ne PAIERAIT alors PAS son voisin de droite — IL LUI PRENDRAIT de l'argent (alors que celui-ci paie AUSSI son propre coût à SON voisin). CETTE DÉPENSE SUPPLÉMENTAIRE POURRAIT VIOLER SA CONTRAINTE DE RATIONALITÉ INDIVIDUELLE.** »*

⟹ *« **équilibrer le budget quand les coûts espérés sont négatifs exige une méthode PLUS SOPHISTIQUÉE** »* — d'où le **théorème 9.12**.

</details>

<details class="details--riche">
<summary>

**32. Énoncer et démontrer le théorème 9.12.**

</summary>

Si le mécanisme **dégage un surplus espéré**, poser

$$c_i^B(t)=\bar c_i(t_i)-\bar c_{i+1}(t_{i+1})+\bar c_{i+1}-\frac1N\sum_{j=1}^{N}\bar c_j$$

**La description imagée** : *« $i$ **paie à CHAQUE autre le montant FIXE $\bar c_{i+1}/N$** et **à celui de sa droite le montant SUPPLÉMENTAIRE $\bar c_i(t_i)$. C'EST TOUT !** »*

**La preuve** : le coût espéré devient $\bar c_i(r_i)-\frac1N\sum_j\bar c_j$ *( **les deux $\bar c_{i+1}$ se détruisent**)* ⟹ $u_i^B=u_i+\frac1N\sum_j\bar c_j$ ⟹ **même maximiseur** ; et **$\sum_j\bar c_j\geq0$** ⟹ **chacun est au moins aussi bien loti**. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**33. Énoncer le critère d'existence complet.**

</summary>

**THÉORÈME 9.13 (SUFFISANCE)** : si l'IR-VCG **dégage un surplus espéré**, alors il existe un mécanisme **incitatif, ex post efficace, à budget équilibré ET individuellement rationnel** — et le théorème **le construit explicitement**.

**THÉORÈME 9.17 (NÉCESSITÉ)** : si un tel mécanisme **existe**, alors l'IR-VCG **dégage un surplus espéré**.

*Preuve : un tel mécanisme, **étant à budget équilibré, a des revenus espérés NULS** ; **par le théorème 9.16, l'IR-VCG lève AU MOINS AUTANT** ⟹ **son revenu est non négatif**.*

$$\boxed{\;\textbf{SURPLUS ESPÉRÉ DE L'IR-VCG} \ \Longleftrightarrow\ \textbf{EXISTENCE}\;}$$

</details>

<details class="details--riche">
<summary>

**34. Énoncer le théorème 9.16 et l'idée de sa preuve.**

</summary>

**L'IR-VCG génère LE MAXIMUM de revenu ex ante parmi tous les mécanismes incitatifs, ex post efficaces et individuellement rationnels.**

**La preuve** : les assignations espérées **coïncident** *(unicité de l'état efficace)* ⟹ **par le théorème 9.14**, les coûts espérés **diffèrent d'une constante** : $\bar c_i(t_i)=\bar c_i^{\text{VCG}}(t_i)-\psi_i^*-k_i$.

⚠️ *« **(P.1) dit qu'en donnant à chacun la subvention $\psi_i^*+k_i$, on rend le VCG individuellement rationnel. MAIS PARCE QUE LES $\psi_i^*$ SONT, PAR DÉFINITION, LES PLUS PETITES TELLES SUBVENTIONS, IL DOIT ÊTRE LE CAS QUE $k_i\geq0$.** »*

⟹ **coûts plus bas dans l'autre mécanisme** ⟹ **l'IR-VCG lève au moins autant**. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**35. Énoncer les théorèmes 9.14 et 9.15.**

</summary>

**La CPO générale** :

$$\bar c_i'(t_i)=\sum_{x\in X}\bar p_i^{x\prime}(t_i)\,v_i(x,t_i) \tag{9.28}$$

**THÉORÈME 9.14** : deux mécanismes incitatifs de **mêmes assignations ESPÉRÉES** ont des **coûts espérés qui diffèrent d'une CONSTANTE**.

**THÉORÈME 9.15 — équivalence générale des revenus** : si en outre **chacun est indifférent quand son type est ZÉRO**, ils génèrent **le même revenu espéré**.

⚠️ *« Il **GÉNÉRALISE le théorème 9.6** »* — l'équivalence des quatre enchères standard.

</details>

<details class="details--riche">
<summary>

**36. Dérouler l'exemple 9.8 (Myerson-Satterthwaite).**

</summary>

Un acheteur, un vendeur, $t_b,t_s\sim\mathcal{U}[0,1]$ **indépendantes**, $IR_s(t_s)=t_s$ *(**droits de propriété**)*, $IR_b=0$.

| L'objet | Sa valeur |
|---|---|
| $c_b^{\text{VCG}}(t_b,t_s)$ | $t_s$ si $t_b>t_s$, sinon $0$ |
| $\bar c_i^{\text{VCG}}(t_i)$ | $\int_0^{t_i}s\,ds=\tfrac12t_i^2$ |
| $U_i^{\text{VCG}}(t_i)$ | $t_i^2-\tfrac12t_i^2=\tfrac12t_i^2$ |
| **Revenu VCG** | $\tfrac16+\tfrac16=\boxed{\tfrac13}$ |
| $\psi_b^*$ | $\max(0-\tfrac12t_b^2)=\boxed{0}$ |
| $\psi_s^*$ | $\max(t_s-\tfrac12t_s^2)=\boxed{\tfrac12}$ *(en $t_s=1$)* |

$$\tfrac12\ >\ \tfrac13 \qquad\Longrightarrow\qquad \boxed{\textbf{AUCUN mécanisme parfait n'existe.}}$$

*(Note 39 : *« **le fait que le vendeur POSSÈDE l'objet NE JOUE AUCUN RÔLE dans le VCG** »*.)*

</details>

<details class="details--riche">
<summary>

**37. La leçon sur les GRÈVES.**

</summary>

> *« **L'exemple fournit une EXPLICATION du phénomène autrement DÉCONCERTANT DES GRÈVES. Ce qui est déconcertant, c'est qu'on imagine que QUEL QUE SOIT L'ACCORD FINALEMENT ATTEINT, IL AURAIT PU L'ÊTRE SANS LA GRÈVE, épargnant temps et ressources.** »*

> ⚠️ *« **Mais le résultat démontre que cette « INTUITION » EST SIMPLEMENT FAUSSE. PARFOIS IL N'Y A AUCUN MÉCANISME QUI PUISSE ASSURER L'EFFICACITÉ EX POST — DES INEFFICACITÉS DOIVENT OCCASIONNELLEMENT APPARAÎTRE.** »*

</details>

<details class="details--riche">
<summary>

**38. La leçon sur le théorème de Coase.**

</summary>

**Le théorème de Coase** : *« **si l'on ne s'intéresse qu'à l'EFFICACITÉ, LES DROITS DE PROPRIÉTÉ N'IMPORTENT PAS** — que **la pêcherie en AVAL** ait droit à l'eau propre ou que **l'aciérie en AMONT** ait droit de déverser, **les deux parties atteindront, par des transferts, un accord Pareto-efficace** »*.

> ⚠️ *« **Notre analyse révèle une MISE EN GARDE IMPORTANTE : LE THÉORÈME DE COASE PEUT ÉCHOUER QUAND LES PARTIES ONT DE L'INFORMATION PRIVÉE. SI AUCUN individu n'a de droits, L'EFFICACITÉ EST TOUJOURS POSSIBLE. QUAND LES DROITS SONT ASSIGNÉS, UN ACCORD EFFICACE NE PEUT PAS TOUJOURS ÊTRE GARANTI.** »*

</details>

<details class="details--riche">
<summary>

**39. Les leçons sur la privatisation et la symétrie.**

</summary>

**LA PRIVATISATION** *(spectre radio, droits pétroliers offshore)* :

> ⚠️ *« **Si l'objectif est l'EFFICACITÉ, IL EST IMPORTANT DE CONCEVOIR LE MÉCANISME DE PRIVATISATION POUR QU'IL ASSIGNE EFFICACEMENT. Car L'ASSIGNATION, PAR SA NATURE MÊME, CRÉE DES DROITS DE PROPRIÉTÉ. Si elle est inefficace et que l'information privée demeure, L'ÉTABLISSEMENT DES DROITS PEUT MENER À DES PERTES INÉVITABLES, PERSISTANTES ET POTENTIELLEMENT GRANDES.** »*

**LA SYMÉTRIE** :

> *« **Un cadre SANS droits de propriété est un cadre où LES DROITS SONT SYMÉTRIQUES — et c'est AUSSI un cadre où il EST possible de construire un mécanisme parfait.** »* *(Cramton, Gibbons et Klemperer 1987.)*

</details>

<details class="details--riche">
<summary>

**40. Sur quoi le chapitre 9 se conclut-il ?**

</summary>

> *« « **QUE FAIT-ON quand un tel mécanisme N'EXISTE PAS ?** » **C'est une question FORMIDABLE, mais que nous ne poursuivrons pas.** »*

> *« **UNE réponse est que NOUS FAISONS LE MIEUX POSSIBLE ENSUITE : nous cherchons, parmi tous les mécanismes incitatifs, CEUX QUI NE PEUVENT PAS ÊTRE PARETO-AMÉLIORÉS, soit du point de vue INTÉRIMAIRE, soit du point de vue EX ANTE.** »* *(Myerson et Satterthwaite 1983.)*

> *« **La théorie du design de mécanismes est RICHE, PUISSANTE et IMPORTANTE, et bien que nous n'ayons fait qu'EFFLEURER LA SURFACE, nous espérons vous avoir donné un sens de son UTILITÉ pour traiter LE PROBLÈME FONDAMENTAL DE L'ALLOCATION DES RESSOURCES EN PRÉSENCE D'INFORMATION PRIVÉE.** »*

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Ce que permet le principe de révélation ? | Restreindre à l'ensemble **GÉRABLE** des directs incitatifs, **sans rien perdre** |
| Ce dont on part pour l'appliquer ? | Une procédure **ET SON ÉQUILIBRE** |
| La contrainte de rationalité individuelle ? | $\bar c_i(0)\leq0$ |
| Pourquoi elle se réduit à cela ? | L'intégrale $\int_0^{v_i}\bar p_i$ est **toujours $\geq0$** |
| Le pas clé de la réécriture (9.11) ? | **L'INTERVERSION** de l'ordre d'intégration |
| Ce qui fait apparaître le crochet ? | **Diviser ET multiplier par $f_i(v_i)$** |
| L'accolade de (9.12) est ? | Une **MOYENNE PONDÉRÉE** de $N+1$ nombres |
| Le $(N+1)$-ième nombre ? | **ZÉRO** — le « poids du vendeur » |
| La règle d'allocation optimale ? | Le **plus grand crochet**, **et POSITIF** |
| Que fait le vendeur sinon ? | **Il GARDE l'objet** |
| L'hypothèse (9.18) ? | $v_i-\frac{1-F_i}{f_i}$ **strictement croissante** |
| Ses DEUX rôles ? | La **monotonie (i)** ET la **distinctivité avec probabilité un** |
| Quand tient-elle ? | Chaque fois que **$F_i$ est CONVEXE** |
| Ce qu'est $v_i-\frac{1-F_i}{f_i}$ ? | **LE REVENU MARGINAL $MR_i(v_i)$** |
| L'effet positif dans sa dérivation ? | $v_if_i(v_i)$ — on **relève le coût** |
| L'effet négatif ? | $1-F_i(v_i)$ — **la MASSE des valeurs au-dessus** |
| Pourquoi diviser par $f_i$ ? | C'est **l'effet TOTAL dû à la densité** |
| Ce que paie le perdant ? | **RIEN** |
| Pourquoi ? | La **monotonie** force l'intégrale à **zéro** |
| Ce que paie le gagnant ? | $r_i^*(v_{-i})$ |
| Ce que $r_i^*$ représente ? | **La plus grande valeur qu'il aurait pu déclarer SANS gagner** |
| En dépend-il de sa déclaration ? | **NON** |
| Le statut de la véracité au thm 9.8 ? | **STRATÉGIE DOMINANTE** |
| L'inconvénient du mécanisme optimal ? | **Le vendeur doit CONNAÎTRE les $F_i$** |
| La première inefficacité ? | Le vendeur **GARDE** parfois l'objet |
| Son analogue au chapitre 4 ? | La **restriction d'offre** du monopoleur |
| La seconde inefficacité ? | **Le mauvais enchérisseur** reçoit l'objet |
| Pourquoi elle est NOUVELLE ? | Le vendeur peut ici **DISCRIMINER** — il connaît les $F_i$ |
| Ce qui l'élimine ? | **La SYMÉTRIE** |
| Théorème 9.9 ? | **Second prix avec PRIX DE RÉSERVE $\rho^*$** |
| L'équation de $\rho^*$ ? | $\rho^*-\frac{1-F(\rho^*)}{f(\rho^*)}=0$, i.e. $MR(\rho^*)=0$ |
| Ce que paie le gagnant alors ? | $\max\{\rho^*,\ \text{deuxième offre}\}$ |
| Les trois autres enchères ? | **Aussi optimales** avec un prix de réserve approprié |
| Le cadre du §9.5 ? | $X$ **FINI**, une **monnaie**, **a priori commun**, types **indépendants** |
| L'utilité quasi-linéaire ? | $v_i(x,t_i)+m$ |
| Ce qu'elle implique ? | **UN TAUX COMMUN de substitution d'utilité entre individus** |
| Définition 9.3 ? | $\hat x(t)$ **maximise $\sum_i v_i(x,t_i)$** |
| Les trois moments d'efficacité ? | **Ex ante ⟹ intérimaire ⟹ ex post** |
| Sur lequel le livre se concentre ? | **EX POST** |
| Pourquoi $x(\cdot)$ n'est pas une « fonction de choix social » ? | On **n'exige pas que son RANG soit tout $X$** |
| Définition 9.4, sa contrainte ? | $\sum_{x\in X}p_x(t)=1$ |
| Définition 9.5 ? | $u_i(r_i,t_i)$ **maximisée en $r_i=t_i$** — un **Bayes-Nash** |
| Le principe de révélation, en une phrase ? | **Concevez un mécanisme QUI JOUE LEURS STRATÉGIES POUR EUX** |
| L'analogie du VCG ? | **Une généralisation du SECOND PRIX** |
| L'image de « payer son externalité » ? | Le gagnant **empêche** la deuxième valeur d'être réalisée |
| La formule de l'externalité ? | **Utilité des autres SANS $i$ MOINS avec $i$** |
| Ce qu'est $\tilde x^i(t_{-i})$ ? | L'état qui **maximise $\sum_{j\neq i}v_j$** |
| L'externalité peut-elle être négative ? | **NON** — $\tilde x^i$ **maximise** |
| Théorème 9.10 ? | La véracité est **FAIBLEMENT DOMINANTE** |
| Le pas clé de sa preuve ? | **$r_i$ n'apparaît QUE dans la PREMIÈRE somme** |
| Ce que cette somme est ? | $\sum_{j=1}^N v_j(\hat x(r_i,t_{-i}),t_j)$ — **maximisée par définition** |
| Le VCG équilibre-t-il le budget ? | **NON** — il **dégage un SURPLUS** |
| Les autres peuvent-ils refuser de participer ? | **NON** — **c'est un équilibre de participer** |
| Y a-t-il contradiction avec Gibbard-Satterthwaite ? | **NON** — grâce à la **QUASI-LINÉARITÉ** |
| Peut-on détruire le surplus ? | *« **PAS UNE OPTION** »* — cela tuerait l'efficacité |
| Définition 9.7 ? | $\sum_i c_i(t)=0$ **pour tout $t$** |
| L'image du théorème 9.11 ? | **LA TABLE RONDE** — chacun paie **son voisin de droite** |
| Ce qu'il paie ? | Son **EXTERNALITÉ ESPÉRÉE** $\bar c_i^{\text{VCG}}(t_i)$ |
| Pourquoi le budget s'équilibre ? | Chaque terme apparaît **une fois en $+$, une fois en $-$** |
| Ce qu'on PERD ? | **LA DOMINANCE** — il ne reste qu'un **Bayes-Nash** |
| Peut-on avoir les deux ? | *« **des théorèmes disent que c'est IMPOSSIBLE** »* |
| Ce que la table de l'exemple 9.5 montre ? | **Plus le rapport est EXTRÊME, plus on paie** |
| Pourquoi ? | Cela **les garde HONNÊTES** |
| Ce qu'est $IR_i(t_i)$ ? | L'utilité espérée **s'il NE participe PAS** |
| Son trait notable ? | **Elle dépend de son TYPE PRIVÉ** |
| $IR_s$ pour un vendeur propriétaire ? | $IR_s(t_s)=t_s$ |
| L'effet des droits de propriété ? | Ils **AUGMENTENT les $IR_i$** ⟹ **plus difficile** |
| Le cas sans droits ? | $IR_i(t_i)=\min_x v_i(x,t_i)$ |
| Ce que les $IR_i$ modélisent aussi ? | Les **OPTIONS EXTÉRIEURES** : $\max_k U_i^k(t_i)$ |
| L'exemple 9.6 ? | **L'INGÉNIEUR** refuse de construire quand $t_1<4$ |
| Son $IR_1$ ? | $10$ — **son coût d'opportunité** |
| La formule de $\psi_i^*$ ? | $\max_{t_i}\big(IR_i(t_i)-U_i^{\text{VCG}}(t_i)\big)$ |
| Peut-elle être négative ? | **OUI** |
| Pourquoi la dominance survit dans l'IR-VCG ? | La subvention est versée **quel que soit le rapport** |
| Ce qui manque à l'IR-VCG ? | **L'équilibre budgétaire** |
| Pourquoi la table simple ne marche plus ? | Un coût espéré **négatif** violerait **l'IR du voisin** |
| La recette du théorème 9.12 ? | Payer $\bar c_{i+1}/N$ **à chacun** et $\bar c_i(t_i)$ **au voisin** |
| Ce qui garantit l'équilibre ? | **Les individus paient ENTRE EUX** — rien ne sort ni n'entre |
| L'hypothèse du théorème 9.12 ? | **Le SURPLUS ESPÉRÉ** |
| Théorème 9.13 ? | **SUFFISANCE** du surplus espéré de l'IR-VCG |
| Théorème 9.17 ? | **NÉCESSITÉ** |
| Le critère complet ? | **surplus espéré de l'IR-VCG $\iff$ existence** |
| L'idée du théorème 9.16 ? | **Les $\psi_i^*$ sont les PLUS PETITES subventions** ⟹ $k_i\geq0$ |
| Théorème 9.14 ? | Mêmes assignations **espérées** ⟹ coûts espérés **à une constante près** |
| Théorème 9.15 ? | **L'équivalence GÉNÉRALE des revenus** — il généralise le thm 9.6 |
| L'exemple 9.8 ? | **MYERSON-SATTERTHWAITE** — acheteur / vendeur uniformes |
| $\bar c_i^{\text{VCG}}(t_i)$ ? | $\tfrac12t_i^2$ |
| $U_i^{\text{VCG}}(t_i)$ ? | $\tfrac12t_i^2$ |
| Le revenu VCG ? | $\tfrac13$ |
| $\psi_b^*$ ? | $0$ |
| $\psi_s^*$ ? | $\tfrac12$ *(en $t_s=1$)* |
| La conclusion ? | $\tfrac12>\tfrac13$ ⟹ **AUCUN mécanisme parfait** |
| Le VCG tient-il compte de la propriété ? | **NON** — *« cela ne joue AUCUN rôle »* |
| La leçon sur les grèves ? | *« l'intuition est **SIMPLEMENT FAUSSE** — des inefficacités **DOIVENT** apparaître »* |
| La leçon sur Coase ? | **Il PEUT ÉCHOUER avec de l'INFORMATION PRIVÉE** |
| L'exemple classique de Coase ? | La **pêcherie en aval** et **l'aciérie en amont** |
| La leçon sur la privatisation ? | **L'assignation CRÉE des droits** ⟹ pertes **persistantes** |
| Les exemples cités ? | **Droits pétroliers offshore**, **spectre radio** |
| La quatrième leçon ? | **La SYMÉTRIE de la propriété** compte |
| Que faire si aucun mécanisme parfait n'existe ? | Chercher les **non Pareto-dominés** aux stades **intérimaire** ou **ex ante** |
| Le mot de la fin ? | *« nous n'avons fait qu'**EFFLEURER LA SURFACE** »* |
