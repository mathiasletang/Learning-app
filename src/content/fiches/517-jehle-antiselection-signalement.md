# Fiche 517 — L'antisélection, le signalement et le criblage sur le marché de l'assurance

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 8 « Information Economics », §8.1 « Adverse Selection » (p. 379-413) |
| **Difficulté** | Avancé |
| **Temps d'étude estimé** | 155 min |
| **Prérequis** | Fiche 506 (aversion au risque, assurance actuariellement équitable) · fiche 511 (premier théorème du bien-être) · fiche 515 (équilibre de Nash, jeux bayésiens) · fiche 516 (équilibre séquentiel, perfection en sous-jeux, croyances) |
| **Concepts clés** | Information asymétrique, échec de marché, marché de l'assurance, information symétrique, efficacité de l'allocation concurrentielle, prix unique, condition d'équilibre sous asymétrie, point fixe d'une fonction croissante, antisélection, effondrement du marché, signalement, jeu de signalement, équilibre séquentiel en stratégies pures, propriété de croisement unique, équilibre séparateur, équilibre mélangeant, droite de profit nul, critère intuitif de Cho-Kreps, criblage, écrémage, non-existence en stratégies pures |
| **Poids à l'examen** | L'argument d'**efficacité** sous information symétrique · la fonction $h(p)$ et la **condition (8.4)** · l'**argument d'existence par point fixe** · l'exemple **uniforme** et l'effondrement du marché · le **mécanisme** de l'antisélection en une phrase · les **FACTS** et le **croisement unique** · le **lemme 8.1** et les **théorèmes 8.1 à 8.3** · l'**écrémage** et les **théorèmes 8.4 et 8.5** · le cas de **non-existence**. |

## 🎯 Vue d'ensemble

```
LE FIL DU §8.1 : ce que l'asymetrie d'information fait au marche

  L'ANNONCE DU CHAPITRE 8

     « Sous information asymetrique, LE PREMIER THEOREME DU
       BIEN-ETRE NE TIENT PLUS generalement. »

     Le cadre unique : LE MARCHE DE L'ASSURANCE AUTOMOBILE
        richesse w, perte L en cas d'accident, u strictement
        concave, probabilite d'accident pi_i propre a chacun

  §8.1.1  INFORMATION ET EFFICACITE

     INFORMATION SYMETRIQUE  (reference)
        chaque police i a son prix : p*_i = pi_i L
        -> profits NULS, assurance COMPLETE pour tous
        -> l'allocation est PARETO-EFFICACE  (preuve directe)

     INFORMATION ASYMETRIQUE
        les compagnies ne connaissent que la DISTRIBUTION F
        -> il ne peut y avoir qu'UN SEUL PRIX p

        un consommateur achete SSI  pi >= h(p), ou

           h(p) = [u(w) - u(w-p)] / [u(w) - u(w-L)]

        CONDITION D'EQUILIBRE (8.4) :

           p* = E(pi | pi >= h(p*)) . L

        EXISTENCE : g(p) = E(pi | pi >= h(p))L envoie [0, pi_barre L]
        dans lui-meme et est NON DECROISSANTE -> POINT FIXE

        EXEMPLE UNIFORME sur [0,1] :  g(p) = (1 + h(p))L/2
           comme h(L) = 1,  p* = L est TOUJOURS un equilibre
           -> SEULS ceux qui sont CERTAINS d'avoir un accident
              « s'assurent » -- et leur richesse est INCHANGEE
           -> EFFONDREMENT TOTAL du marche

     LE MECANISME DE L'ANTISELECTION :
        « quand le PRIX monte, ceux qui CONTINUENT d'acheter sont
          precisement ceux dont la PROBABILITE D'ACCIDENT est la
          plus elevee -> le pool devient PLUS RISQUE en moyenne »

  §8.1.2  LE SIGNALEMENT   (le consommateur PROPOSE)

     Jeu extensif : Nature choisit le type -> le consommateur
     propose (B, p) -> la compagnie ACCEPTE ou REFUSE

     DEF. 8.1  equilibre sequentiel en strategies pures
     LES FACTS :  MRS_l(B,p) < MRS_h(B,p)  = CROISEMENT UNIQUE

     LEMME 8.1  bornes inferieures :  u*_l >= u_tilde_l
                                      u*_h >= u^c_h
     DEF. 8.2  SEPARATEUR  ou  MELANGEANT

     THM 8.1  caracterisation des SEPARATEURS  (4 conditions)
     THM 8.2  caracterisation des MELANGEANTS  (8.5) et (8.6)

     LE CRITERE INTUITIF  (Cho et Kreps) :  si SEUL le type i
     gagne a devier vers psi, la croyance doit se porter sur i

     THM 8.3  il ne reste qu'UNE SEULE paire :
              (psi_barre_l, psi^c_h) -- le MEILLEUR separateur
              pour le consommateur A FAIBLE RISQUE

  §8.1.3  LE CRIBLAGE   (la compagnie OFFRE UN MENU)

     DEUX compagnies (necessaire !), qui offrent simultanement
     des MENUS ; puis Nature ; puis le consommateur CHOISIT

     L'ECREMAGE (cream skimming) : attirer SEULEMENT les bons
     risques du concurrent, en lui laissant les mauvais

     LEMME 8.2  profits NULS a l'equilibre  (a la Bertrand)
     THM 8.4    AUCUN equilibre MELANGEANT
     THM 8.5    le SEUL separateur possible est (psi_barre_l, psi^c_h)

     MAIS : quand alpha est proche de 1, AUCUN equilibre en
     strategies pures n'existe.
```

> ⚠️ **Note de transcription — identique aux fiches 500-516.** Le PDF de ce chapitre perd le **barré du $\neq$** *(ainsi « $\psi_l=\psi_h$ » dans le théorème 8.1 signifie $\psi_l\neq\psi_h$, et « $(B,p)=\psi_l$ » dans les définitions de $\beta$ et $\sigma$ signifie $(B,p)\neq\psi_l$)*, ainsi que $\sum$, $\int$, $\Pi$ et $\notin$. Les barres supérieures $\bar\pi$, $\bar\psi_l$ et les indices sont souvent redistribués par l'extracteur ; les valeurs citées ici sont celles que **la prose du livre nomme explicitement**. Les figures utilisent l'encodage Symbol Mac (`Ϫ` = « − », `Ј` = « ′ », `Љ` = « ″ », `␺` = $\psi$, `␲` = $\pi$, `␣` = $\alpha$, `Њ` = « ° »). **Réparation de transcription, non ajout de contenu.**

## 🔴 Concept 1 — Pourquoi l'information change tout

### 1.1 Le point de départ néoclassique

> *« Dans la théorie néoclassique du comportement du consommateur et de la firme, **les consommateurs ont une information PARFAITE sur les caractéristiques importantes des marchandises qu'ils achètent, telles que leur QUALITÉ et leur DURABILITÉ. Les firmes ont une information parfaite sur la PRODUCTIVITÉ des inputs qu'ils demandent.** »*

> *« **À cause de cela, il était possible de développer SÉPARÉMENT les théories de la demande du consommateur et de l'offre du producteur, puis de simplement les mettre ensemble en insistant sur des prix qui clarifient le marché.** »*

### 🔴 1.2 Pourquoi l'extension naïve échoue

> *« On pourrait espérer qu'étendre la théorie pour inclure l'information imparfaite serait **aussi simple que d'incorporer la décision sous incertitude** dans ces modèles néoclassiques. […] **Malheureusement, cette approche n'aurait de sens QUE SI les sources de l'incertitude des deux côtés du marché étaient EXOGÈNES et donc HORS DU CONTRÔLE de tout agent impliqué.** »*

**L'argument, en entier :**

> *« Bien sûr, **la qualité et la durabilité d'une marchandise ne sont PAS des caractéristiques exogènes. Ce sont des caractéristiques qui sont ultimement CHOISIES PAR LE PRODUCTEUR.** »*

> *« **Si les consommateurs ne peuvent pas observer directement la qualité avant d'acheter, alors il peut fort bien être DANS L'INTÉRÊT du producteur de ne produire que des articles de BASSE QUALITÉ. Bien sûr, SACHANT CELA, les consommateurs pourront INFÉRER que la qualité doit être basse et ils agiront en conséquence.** »*

$$\boxed{\;\textbf{« Nous ne pouvons pas développer une théorie de la valeur adéquate sous information}\\\textbf{imparfaite sans tenir explicitement compte des OPPORTUNITÉS STRATÉGIQUES. »}\;}$$

### 1.3 La thèse du chapitre

> *« Une situation dans laquelle **différents agents possèdent une information différente** est dite d'**INFORMATION ASYMÉTRIQUE**. Comme nous le verrons, **les opportunités stratégiques qui surgissent en présence d'information asymétrique conduisent TYPIQUEMENT à des issues de marché INEFFICACES — une forme d'ÉCHEC DE MARCHÉ**. »*

> ⚠️ *« **Sous information asymétrique, LE PREMIER THÉORÈME DU BIEN-ÊTRE NE TIENT PLUS généralement.** »*

**Le choix méthodologique :**

> *« Dans l'intérêt de la **simplicité et de la clarté**, nous développerons ce thème **dans le contexte d'UN marché spécifique : LE MARCHÉ DE L'ASSURANCE**. En travaillant les détails, **vous gagnerez une intuition sur la manière dont les théoriciens modéliseraient d'AUTRES marchés avec des asymétries semblables**. »*

## 🔴 Concept 2 — Le cadre du modèle d'assurance

### 2.1 Les consommateurs

> *« Considérez un marché de **l'assurance automobile** dans lequel de nombreuses compagnies vendent de l'assurance à de nombreux consommateurs. »*

⚠️ *« **Les consommateurs sont IDENTIQUES SAUF pour la probabilité EXOGÈNE d'être impliqués dans un accident.** »*

| L'élément | Sa valeur |
|---|---|
| Probabilité d'accident de $i$ | $\pi_i\in[0,1]$, *« l'occurrence des accidents est **INDÉPENDANTE** entre consommateurs »* |
| Richesse initiale | $w$, la **même** pour tous |
| Perte en cas d'accident | $L$ dollars |
| L'utilité | $u(\cdot)$ **VNM**, **continue, strictement croissante, strictement concave** |
| Le comportement | maximiser **l'espérance d'utilité** |

> *(Note de bas de page 1.)* *« Pensez donc à un accident comme « **heurter un ARBRE** » plutôt que « **heurter une autre VOITURE** ». »* — **c'est ce qui justifie l'indépendance.**

### 2.2 Les compagnies

> *« Chacune n'offre à la vente que **l'ASSURANCE COMPLÈTE**. C'est-à-dire que, contre un prix, **elles promettent de payer $L$ dollars en cas d'accident et zéro sinon**. »*

⚠️ **Deux simplifications explicites :**

| L'hypothèse | Sa formulation |
|---|---|
| **Indivisibilité** | *« cette police est **un bien INDIVISIBLE** — **des montants fractionnaires ne peuvent être ni achetés ni vendus** »* |
| **Coût nul** | *« nous supposons aussi que **le coût de fournir l'assurance est ZÉRO** »* |

**Le profit espéré** de la vente au consommateur $i$ au prix $p$ :

$$\boxed{\;p-\pi_iL\;}$$

## 🔴 Concept 3 — L'information symétrique : la référence

### 🔴 3.1 Pourquoi les polices sont des marchandises DISTINCTES

> *« Il est important de reconnaître que **le prix d'une marchandise particulière peut fort bien dépendre de « L'ÉTAT DU MONDE ». Par exemple, un PARAPLUIE dans l'état « PLUIE » est une marchandise DIFFÉRENTE d'un parapluie dans l'état « SOLEIL ». Par conséquent, ces marchandises distinctes pourraient commander des PRIX DISTINCTS.** »*

> *« Il en va de même ici, où **un état spécifie QUEL SOUS-ENSEMBLE de consommateurs a des accidents**. Parce que **l'état où $i$ a un accident DIFFÈRE de celui où $j$ en a un**, la police payant $L$ dollars à $i$ **diffère** de celle payant $L$ à $j$. »*

⟹ **on note $p_i$ le prix de la « police $i$ »** *(celle qui paie $L$ à $i$ s'il a un accident)*.

**C'est une application directe du §5.4** *(les biens contingents, fiche 512)*.

### 3.2 La détermination de $p_i^*$

<details class="details--riche">
<summary>

**L'offre et la demande, cas par cas**

</summary>

**L'offre :**

| Si | Alors |
|---|---|
| $p_i<\pi_iL$ | *« vendre une telle police entraîne des **pertes espérées** »* ⟹ **offre NULLE** |
| $p_i>\pi_iL$ | *« des profits espérés positifs peuvent être gagnés »* ⟹ **offre INFINIE** |
| $p_i=\pi_iL$ | *« les compagnies **font tout juste leurs frais** »* ⟹ elles sont *« disposées à en fournir **n'importe quel nombre** »* |

**La demande :**

| Si | Alors |
|---|---|
| $p_i<\pi_iL$ | *« le consommateur $i$, **étant AVERSE AU RISQUE**, demandera **au moins une** police »* — car *« **les averses au risque préfèrent STRICTEMENT s'assurer complètement plutôt que pas du tout dès que l'assurance est ACTUARIELLEMENT ÉQUITABLE** »* *(chapitre 2)* |
| $p_i>\pi_iL$ | *« $i$ achètera **au plus une** police »* — *« rappelez-vous que **les polices fractionnaires ne peuvent pas être achetées** »* |

**La conclusion :**

> *« **La SEULE possibilité d'équilibre est quand $p_i=\pi_iL$.** Dans ce cas, chaque consommateur $i$ demande **exactement une** police $i$, et elle est fournie par **exactement une** compagnie (**n'importe laquelle fera l'affaire**). »*

</details>

$$\boxed{\;p_i^*=\pi_i\,L \qquad\text{pour chaque } i=1,\dots,m\;}$$

> *« Notez que dans cet équilibre concurrentiel, **TOUTES les compagnies gagnent des profits espérés NULS, et TOUS les consommateurs sont COMPLÈTEMENT ASSURÉS**. »*

### 3.3 L'argument direct d'efficacité

<details class="details--riche">
<summary>

**La preuve que l'allocation concurrentielle est Pareto-efficace**

</summary>

> *« En construisant une économie d'échange pur appropriée, **on peut arriver à cette conclusion en faisant appel au PREMIER THÉORÈME DU BIEN-ÊTRE** *(exercice 8.1)*. **Nous donnerons ici un argument DIRECT.** »*

**Le cadre** : une **allocation** assigne de la richesse aux consommateurs et aux compagnies **dans chaque état** ; elle est **réalisable** si *« dans chaque état, **la richesse totale assignée égale la richesse totale des consommateurs** »*.

**Par l'absurde** : supposons qu'une allocation réalisable **domine** l'allocation concurrentielle.

**Pas 1 — deux normalisations sans perte de généralité** *(exercice 8.6)* :

- la richesse de chaque consommateur est **la même qu'il ait ou non un accident** ⟹ elle vaut un $\bar w_i$ **certain** ;
- il n'y a **aucun transfert entre deux consommateurs** ⟹ *« la richesse de chaque consommateur n'est transférée directement qu'**vers ou depuis les compagnies** »*.

**Pas 2 — la domination impose $\bar w_i\geq w-\pi_iL$** *(la richesse certaine concurrentielle)*.

**Pas 3 — les profits espérés agrégés sur le consommateur $i$ :**

$$(1-\pi_i)(w-\bar w_i)+\pi_i(w-L-\bar w_i)=w-\pi_iL-\bar w_i \tag{8.1}$$

*« parce que $\bar w_i-w$ (resp. $\bar w_i+L-w$) est le supplément à la richesse de $i$ dans les états où il **n'a pas** (resp. **a**) un accident, et **la réalisabilité implique que ce supplément doit être compensé par un changement de la richesse agrégée des compagnies** »*.

**Pas 4 — les deux familles d'inégalités.** Le membre de droite de (8.1) est **non positif** *(pas 2)*, donc

$$w-\pi_iL-\bar w_i=\sum_j EP_j^i\ \leq\ 0 \qquad\text{pour chaque consommateur } i \tag{8.2}$$

Et *« chaque compagnie doit gagner des profits espérés **NON NÉGATIFS** dans l'allocation dominante **parce qu'elle en gagne ZÉRO dans l'allocation concurrentielle** »* :

$$\sum_i EP_j^i\ \geq\ 0 \qquad\text{pour chaque compagnie } j \tag{8.3}$$

**Pas 5 — la contradiction.**

> *« **Sommer (8.2) sur $i$ et (8.3) sur $j$ montre que CHACUNE des deux inégalités doit être une ÉGALITÉ pour tous $i$ et $j$.** Par conséquent, **la richesse constante de chaque consommateur et les profits de chaque firme dans l'allocation dominante sont IDENTIQUES à leurs contreparties concurrentielles. Mais ceci CONTREDIT la définition d'une allocation dominante.** »* $\blacksquare$

⚠️ **Le pas 5 est l'astuce** : les deux sommations portent sur **la même** double somme $\sum_i\sum_j EP_j^i$, l'une la majorant par $0$, l'autre la minorant par $0$.

</details>

## 🔴 Concept 4 — L'information asymétrique : le prix unique et la condition (8.4)

### 4.1 Ce que les compagnies savent

> *« Bien que les compagnies puissent employer les **historiques** des consommateurs pour déterminer partiellement leurs probabilités d'accident, **nous prendrons une vue plus EXTRÊME par simplicité. Spécifiquement, nous supposerons que les compagnies ne connaissent QUE LA DISTRIBUTION des probabilités d'accident et RIEN D'AUTRE.** »*

Soit $[\underline\pi,\bar\pi]$ l'intervalle **non dégénéré** contenant toutes les $\pi_i$, et $F$ une **fonction de répartition** sur $[\underline\pi,\bar\pi]$. *« Cette spécification permet **soit un nombre FINI de consommateurs, soit un CONTINUUM. La possibilité d'un continuum est commode pour les EXEMPLES.** »*

**On suppose $\underline\pi$ et $\bar\pi$ dans le SUPPORT de $F$** *(note 2 : dans le cas fini, cela signifie que $F$ leur donne une probabilité positive)*.

### 🔴 4.2 Pourquoi il n'y a qu'UN SEUL prix

> *« **L'impact de l'asymétrie d'information est tout à fait DRAMATIQUE. En effet, MÊME SI les polices vendues à des consommateurs différents peuvent potentiellement commander des prix distincts, À L'ÉQUILIBRE ELLES NE LE FERONT PAS.** »*

**L'argument, en trois pas :**

| Pas | Le raisonnement |
|---|---|
| **1** | *« Supposons au contraire que **le prix payé par $i$ EXCÈDE celui payé par $j$** »* |
| **2** | *« Parce que **tous deux achètent** effectivement une police, **les profits espérés sur chaque vente doivent être NON NÉGATIFS** — sinon la compagnie qui perd de l'argent ne maximiserait pas son profit »* |
| **3** | *« Parce que $i$ et $j$ sont **IDENTIQUES du point de vue des compagnies**, **la police vendue à $i$ doit gagner des profits STRICTEMENT positifs. Mais alors chaque compagnie voudrait en fournir un montant INFINI**, ce qui ne peut pas être le cas à l'équilibre. »* |

$$\boxed{\;\textbf{Il y a UN SEUL prix d'équilibre de la police d'assurance complète, pour TOUS les consommateurs.}\;}$$

### 🔴 4.3 Pourquoi $p^*=E(\pi)L$ est FAUX

> *« Une intuition naturelle serait de poser $p^*=E(\pi)L$, où $E(\pi)=\int_{\underline\pi}^{\bar\pi}\pi\,dF(\pi)$. **Un tel prix est CENSÉ rendre les profits nuls. MAIS LE FAIT-IL ?** »*

> *« Pour voir qu'il pourrait ne pas le faire, notez que **ce prix pourrait être si ÉLEVÉ que SEULS les consommateurs à probabilité d'accident RELATIVEMENT ÉLEVÉE choisiraient de s'assurer**. Par conséquent, **les compagnies SOUS-ESTIMERAIENT la probabilité d'accident espérée en utilisant l'espérance INCONDITIONNELLE $E(\pi)$ plutôt que l'espérance CONDITIONNELLE aux consommateurs effectivement disposés à acheter. En sous-estimant ainsi, les profits seraient STRICTEMENT NÉGATIFS en moyenne.** »*

### 4.4 La fonction $h(p)$

Un consommateur de probabilité $\pi$ achète au prix $p$ **seulement si**

$$u(w-p)\ \geq\ \pi\,u(w-L)+(1-\pi)\,u(w)$$

**En réarrangeant** :

$$\boxed{\;\pi\ \geq\ \frac{u(w)-u(w-p)}{u(w)-u(w-L)}\ \equiv\ h(p)\;}$$

> *(Note 3.)* *« Par simplicité, nous supposons qu'**un consommateur INDIFFÉRENT entre acheter ou non ACHÈTE en fait** la police. »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — comment lire $h(p)$.</span>

Le **numérateur** est la **perte d'utilité** subie en payant la prime $p$ ; le **dénominateur** est la **perte d'utilité** subie en encaissant le sinistre $L$. $h(p)$ est donc le **rapport de ces deux pertes** — et le consommateur s'assure exactement quand **sa probabilité d'accident dépasse ce rapport**. Notez immédiatement que $h(L)=1$ *(le numérateur devient le dénominateur)*, un fait qui sera **décisif** au Concept 5.

</div>

### 4.5 La condition d'équilibre

> **La condition d'équilibre sous information asymétrique.** $p^*$ est un **prix d'équilibre concurrentiel sous information asymétrique** s'il satisfait
>
> $$\boxed{\;p^*=E\big(\pi\mid\pi\geq h(p^*)\big)\,L\;} \tag{8.4}$$
>
> où
>
> $$E\big(\pi\mid\pi\geq h(p^*)\big)=\frac{\displaystyle\int_{h(p^*)}^{\bar\pi}\pi\,dF(\pi)}{1-F\big(h(p^*)\big)}$$

> *« Ainsi, la condition (8.4) garantit que **les firmes gagnent des profits espérés NULS sur chaque police vendue, CONDITIONNELLEMENT aux probabilités d'accident des consommateurs QUI ACHÈTENT EFFECTIVEMENT la police**. L'offre de polices peut alors être fixée égale au nombre demandé. »*

### 4.6 L'existence par point fixe

<details class="details--riche">
<summary>

**L'argument, en quatre pas**

</summary>

Poser $g(p)=E\big(\pi\mid\pi\geq h(p)\big)L$ pour tout $p\in[0,\bar\pi L]$.

| Pas | Le fait |
|---|---|
| **1** | *« L'espérance conditionnelle est **bien définie** parce que $h(p)\leq\bar\pi$ pour tout $p\in[0,\bar\pi L]$ (**vérifiez ceci**) »* |
| **2** | *« Parce que $E(\pi\mid\pi\geq h(p))\in[0,\bar\pi]$, **la fonction $g$ envoie l'intervalle $[0,\bar\pi L]$ DANS LUI-MÊME** »* |
| **3** | *« Parce que **$h$ est strictement croissante en $p$**, nous savons que **$g$ est NON DÉCROISSANTE en $p$** »* |
| **4** | *« Ainsi, **$g$ est une fonction non décroissante envoyant un intervalle FERMÉ dans lui-même. Comme vous êtes invité à l'explorer dans les exercices, MÊME SI $g$ N'A PAS BESOIN D'ÊTRE CONTINUE, elle doit néanmoins avoir un POINT FIXE $p^*\in[0,\bar\pi L]$.** »* |

> *(Note 4.)* *« Bien sûr, **si $g$ est continue, on peut appliquer le théorème A1.11, BROUWER**. Cependant, vous montrerez en exercice que **s'il y a un nombre FINI de consommateurs, $g$ NE PEUT PAS être continue.** »*

⚠️ **C'est un théorème de point fixe pour les fonctions MONOTONES**, pas continues — un outil différent de celui du chapitre 7.

</details>

## 🔴 Concept 5 — L'exemple uniforme et l'effondrement du marché

### 5.1 Le calcul

> *« Premièrement, **il n'y a aucune raison d'attendre l'UNICITÉ ici. En effet, on peut facilement construire des exemples à équilibres MULTIPLES. Mais plus important, LES ÉQUILIBRES N'ONT PAS BESOIN D'ÊTRE EFFICACES.** »*

Prenons $F$ **uniforme sur $[\underline\pi,\bar\pi]=[0,1]$**. Alors

$$g(p)=\frac{\big(1+h(p)\big)L}{2}$$

*(car pour une uniforme sur $[0,1]$, $E(\pi\mid\pi\geq a)=\tfrac{1+a}{2}$)*.

> *« $g$ est **strictement croissante et strictement CONVEXE** parce que $h(p)$ l'est. Par conséquent, comme il vous est demandé de le montrer en exercice, **il peut y avoir AU PLUS DEUX prix d'équilibre.** »*

**Tout équilibre satisfait** $p^*=\big(1+h(p^*)\big)L/2$.

$$\boxed{\;\textbf{Mais puisque } h(L)=1,\ \ p^*=L \textbf{ est TOUJOURS un équilibre — et il peut être le SEUL.}\;}$$

### 🔴 5.2 Ce que cet équilibre signifie

> *« Cependant, quand $p^*=L$, **(8.4) nous dit que la probabilité d'accident espérée pour ceux qui achètent doit être $E(\pi\mid\pi\geq h(L))=1$.** »*

> *« Ainsi, dans cet équilibre, **TOUS les consommateurs seront NON ASSURÉS, SAUF ceux qui sont CERTAINS d'avoir un accident. Mais MÊME CEUX-CI ne sont assurés qu'au sens FORMEL, parce qu'ils doivent payer LE MONTANT INTÉGRAL de la perte, $L$, pour obtenir la police. Ainsi, leur richesse (et donc leur utilité) RESTE LA MÊME que s'ils n'avaient PAS acheté la police du tout.** »*

> *« **Clairement, cette issue est INEFFICACE À L'EXTRÊME.** L'issue concurrentielle sous information symétrique donne à **chaque** consommateur (sauf ceux certains d'avoir un accident) une utilité **strictement plus élevée**, tout en garantissant aussi que **les profits de chaque compagnie sont nuls**. »*

$$\text{« Ici, l'asymétrie cause un ÉCHEC DE MARCHÉ SIGNIFICATIF. } \textbf{Effectivement, AUCUN échange n'a lieu.} \text{ »}$$

## 🔴 Concept 6 — Le mécanisme de l'antisélection

### 🔴 6.1 Le passage à retenir par cœur

<div class="callout" data-kind="intu">

<span class="callout__lab">pourquoi les prix sont incapables de produire un équilibre efficace ici</span>

*« Pour comprendre , considérez un prix auquel les profits espérés sont négatifs. Alors, **toutes choses égales par ailleurs**, vous pourriez penser qu'**AUGMENTER le prix tendra à augmenter les profits**. »*

</div>

> ⚠️ *« **MAIS SUR LES MARCHÉS D'ASSURANCE, LES AUTRES CHOSES NE RESTENT PAS ÉGALES.** »*

**La chaîne causale, mot pour mot :**

| Pas | Le raisonnement |
|---|---|
| **1** | *« Chaque fois que le prix de l'assurance augmente, **l'espérance d'utilité qu'un consommateur retire de s'assurer BAISSE, alors que celle de NE PAS s'assurer reste la même**. »* |
| **2** | *« Pour certains consommateurs, **il ne vaudra plus la peine d'acheter**, et ils cesseront de le faire. »* |
| **3** | *« **Mais QUI continue d'acheter quand le prix augmente ? SEULEMENT ceux pour qui la PERTE ESPÉRÉE de ne pas le faire est la PLUS GRANDE — et ce sont PRÉCISÉMENT les consommateurs aux PROBABILITÉS D'ACCIDENT LES PLUS ÉLEVÉES.** »* |
| **4** | *« En conséquence, **chaque fois que le prix de l'assurance monte, le POOL de clients qui continuent d'acheter devient PLUS RISQUÉ EN MOYENNE**. »* |

$$\boxed{\;\textbf{C'est un exemple d'ANTISÉLECTION.}\;}$$

### 6.2 La conclusion

> *« Si, **comme dans notre exemple, l'impact NÉGATIF de l'antisélection sur les profits l'emporte sur l'impact POSITIF de prix plus élevés, IL PEUT N'Y AVOIR AUCUN équilibre efficace du tout, et des échanges MUTUELLEMENT BÉNÉFIQUES entre compagnies et consommateurs à FAIBLE risque peuvent NE PAS AVOIR LIEU.** »*

> *« **La leçon est claire. En présence d'information asymétrique et d'antisélection, l'issue concurrentielle N'A PAS BESOIN D'ÊTRE EFFICACE. En effet, elle peut être DRAMATIQUEMENT inefficace.** »*

### 6.3 L'ouverture vers la suite

> *« **L'un des avantages des marchés libres est leur capacité à « ÉVOLUER ». On pourrait donc imaginer que le marché de l'assurance s'AJUSTERAIT d'une manière ou d'une autre pour faire face à l'antisélection. EN FAIT, LES MARCHÉS RÉELS PERFORMENT BEAUCOUP MIEUX que celui que nous venons d'analyser. La section suivante est consacrée à expliquer COMMENT.** »*

## 🔴 Concept 7 — §8.1.2 : le jeu de signalement

### 7.1 L'intuition

> *« **Considérez-vous comme un consommateur à FAIBLE risque coincé dans l'équilibre inefficace. Le prix est si élevé que vous avez choisi de ne pas vous assurer. SI SEULEMENT il y avait un moyen de CONVAINCRE une compagnie que vous êtes un faible risque !** Elles seraient alors disposées à vous vendre une police à un prix que vous seriez disposé à payer. »*

> *« En fait, il y a souvent des moyens pour les consommateurs de **communiquer de manière CRÉDIBLE à quel point ils sont risqués — et nous appelons ce comportement le SIGNALEMENT**. »*

> ⚠️ *« **Dans les marchés d'assurance réels, les consommateurs PEUVENT et SE distinguent les uns des autres — et ils le font EN ACHETANT DIFFÉRENTS TYPES DE POLICES.** »*

### 7.2 Le cadre simplifié

Deux probabilités seulement, $0<\underline\pi<\bar\pi<1$ ; une fraction $\alpha\in(0,1)$ des consommateurs a $\underline\pi$ — les **faibles risques** ; les autres ont $\bar\pi$ — les **hauts risques**.

### 7.3 Le jeu

> **Le jeu de signalement de l'assurance** — un jeu sous forme extensive à **deux consommateurs et UNE compagnie** :

| Ordre | Le joueur | Son action |
|---|---|---|
| **1** | **La Nature** | choisit qui fera une proposition : le **faible risque** avec probabilité $\alpha$, le **haut risque** avec $1-\alpha$ |
| **2** | **Le consommateur choisi** | *« choisit une police $(B,p)$, consistant en **un BÉNÉFICE $B\geq0$** que la compagnie lui paie s'il a un accident, et **une PRIME $0\leq p\leq w$** qu'il paie **qu'il ait ou non un accident** »* |
| **3** | **La compagnie** | *« **NE SACHANT PAS quel consommateur a été choisi**, mais **connaissant la police proposée** : elle **ACCEPTE ou REJETTE** »* |

> *(Note 5.)* *« Notez le léger changement d'usage du mot **police** : il se réfère maintenant à un **COUPLE bénéfice-prime $(B,p)$**, plutôt qu'au seul bénéfice. **Restreindre $p$ à ne pas dépasser $w$ garantit que le consommateur ne fait pas FAILLITE.** »*

> *« En interprétant le jeu, **pensez à la compagnie comme étant l'UNE DE PLUSIEURS compagnies en concurrence, et au consommateur choisi comme un membre TIRÉ AU HASARD de l'ensemble de tous les consommateurs.** »*

### 7.4 Les stratégies

| Le joueur | Sa stratégie pure |
|---|---|
| Le **faible risque** | une police $\psi_l=(B_l,p_l)$ |
| Le **haut risque** | une police $\psi_h=(B_h,p_h)$ |
| **La compagnie** | une **FONCTION DE RÉPONSE** $\sigma$, avec $\sigma(B,p)\in\{A,R\}$ **pour CHAQUE police** |

> ⚠️ *« Notez que **$\sigma$ ne dépend QUE de la police proposée, et PAS de si le consommateur qui la propose est faible ou haut risque. Ceci reflète l'hypothèse que la compagnie NE SAIT PAS quel type fait la proposition.** »*

**Les croyances** : $\beta(B,p)$ = *« la probabilité que la compagnie assigne au fait que le consommateur ayant proposé $(B,p)$ est **le type à FAIBLE risque** »*.

### 🔴 7.5 La difficulté technique, et sa résolution

> *« **La définition d'un équilibre séquentiel exige que le jeu soit FINI, mais le jeu considéré ne l'est PAS — le consommateur peut choisir n'importe laquelle d'un CONTINUUM de polices.** »*

> *« Or, la définition exige la finitude **seulement parce que la condition de COHÉRENCE n'est pas facilement définie pour les jeux infinis**. Cependant, comme vous le démontrerez en exercice, **quand l'ensemble de choix du consommateur est restreint à un ensemble FINI de polices, TOUTE ÉVALUATION SATISFAISANT LA RÈGLE DE BAYES SATISFAIT AUSSI LA CONDITION DE COHÉRENCE**. »*

⟹ *« Dans chaque version FINIE, **une évaluation est un équilibre séquentiel SI ET SEULEMENT SI elle est séquentiellement rationnelle et satisfait Bayes.** »* — **on prend donc cela comme définition.**

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 8.1 — Équilibre séquentiel en stratégies pures du jeu de signalement</span>

L'évaluation $\big(\psi_l,\psi_h,\sigma(\cdot),\beta(\cdot)\big)$ en est un si :

**1.** **Rationalité du consommateur.** Étant donné $\sigma(\cdot)$, proposer $\psi_l$ **maximise** l'espérance d'utilité du faible risque, et proposer $\psi_h$ celle du haut risque.

**2.** **Bayes.** **(a)** $\beta(\psi)\in[0,1]$ pour toute police ; **(b)** **si $\psi_l\neq\psi_h$**, alors $\beta(\psi_l)=1$ et $\beta(\psi_h)=0$ ; **(c)** **si $\psi_l=\psi_h$**, alors $\beta(\psi_l)=\beta(\psi_h)=\alpha$.

**3.** **Rationalité de la compagnie.** Pour **toute** police $\psi$, la réaction $\sigma(\psi)$ **maximise ses profits espérés étant données ses croyances** $\beta(B,p)$.

</div>

> *« Les conditions **(1) et (3) garantissent la RATIONALITÉ SÉQUENTIELLE**, tandis que **(2) garantit BAYES**. »*

**La lecture de la condition 2 :**

> *« Si les types choisissent des polices **différentes**, alors **en observant la police du faible (haut) risque, la compagnie INFÈRE qu'elle fait face au faible (haut) risque** — c'est **2(b)**. **Si, en revanche, ils choisissent LA MÊME police, alors les croyances RESTENT INCHANGÉES et égales à la croyance A PRIORI** — c'est **2(c)**. »*

## 🔴 Concept 8 — La question centrale et la propriété de croisement unique

### 🔴 8.1 Le signal est IMPRODUCTIF

> *« **La question de base est celle-ci : le consommateur à faible risque peut-il se DISTINGUER du haut risque ici, et ainsi atteindre une issue PLUS EFFICACE ? IL N'EST PAS ÉVIDENT que la réponse soit OUI.** »*

> *« Car notez qu'**il n'y a AUCUNE connexion DIRECTE entre le type de risque d'un consommateur et la police qu'il propose. C'est-à-dire que L'ACTE D'ACHETER MOINS D'ASSURANCE NE DIMINUE PAS la probabilité qu'un accident survienne. En ce sens, LES SIGNAUX UTILISÉS PAR LES CONSOMMATEURS — les polices qu'ils proposent — SONT IMPRODUCTIFS.** »*

### 8.2 Pourquoi cela marche quand même

> *« **Cependant, malgré cela, le faible risque peut néanmoins tenter de signaler qu'il est faible risque EN DÉMONTRANT SA DISPOSITION À ACCEPTER UNE BAISSE DU BÉNÉFICE POUR UNE RÉDUCTION COMPENSATOIRE DE PRIME PLUS PETITE QUE NE L'ACCEPTERAIT LE HAUT RISQUE.** »*

> ⚠️ *« Bien sûr, **pour que ce genre de signalement (improductif) soit EFFICACE, les types de risque doivent afficher des TAUX MARGINAUX DE SUBSTITUTION DIFFÉRENTS entre bénéfices $B$ et primes $p$.** »*

### 8.3 Les fonctions d'utilité et les FACTS

$$u_l(B,p)=\underline\pi\,u(w-L+B-p)+(1-\underline\pi)\,u(w-p)$$

$$u_h(B,p)=\bar\pi\,u(w-L+B-p)+(1-\bar\pi)\,u(w-p)$$

> **LES FAITS** *(« facilement établis »)* :
>
> **(a)** $u_l$ et $u_h$ sont **continues, différentiables, strictement concaves** en $(B,p)$, **strictement CROISSANTES en $B$** et **strictement DÉCROISSANTES en $p$**.
>
> **(b)** $\mathrm{MRS}_l(B,p)$ est **supérieur, égal ou inférieur à $\underline\pi$** selon que $B$ est **inférieur, égal ou supérieur à $L$**. De même $\mathrm{MRS}_h(B,p)$ par rapport à $\bar\pi$.
>
> **(c)**
>
> $$\boxed{\;\mathrm{MRS}_l(B,p)\ <\ \mathrm{MRS}_h(B,p) \qquad\textbf{pour TOUT } (B,p)\;}$$

> *« **Le dernier de ceux-ci est souvent appelé la PROPRIÉTÉ DE CROISEMENT UNIQUE. Comme son nom le suggère, il implique que les courbes d'indifférence des deux types se COUPENT AU PLUS UNE FOIS.** »*

### 8.4 Les objets géométriques

| L'objet | Son équation | Ce qu'il sépare |
|---|---|---|
| **Droite de profit nul HAUT risque** | $p=\bar\pi B$ | au-dessus : profits **positifs** sur le haut risque |
| **Droite de profit nul FAIBLE risque** | $p=\underline\pi B$ | au-dessus : profits **positifs** sur le faible risque |
| **Droite de profit nul de MÉLANGE** | $p=\hat\pi B$ avec $\hat\pi=\alpha\underline\pi+(1-\alpha)\bar\pi$ | **entre les deux** |

> **La figure 8.3.** *« La police $\psi^1$ gagne des profits positifs sur **les deux** types ; $\psi^2$ des profits **positifs** sur le faible risque et **négatifs** sur le haut risque ; $\psi^3$ des profits **négatifs** sur les deux. »*

> **La figure 8.4 — l'issue concurrentielle sous information symétrique.**

$$\psi_l^c=(L,\ \underline\pi L) \qquad\qquad \psi_h^c=(L,\ \bar\pi L)$$

⚠️ **Assurance COMPLÈTE ($B=L$) à prime actuariellement équitable pour chacun** — *« l'issue concurrentielle est EFFICACE »*.

## 🔴 Concept 9 — Le lemme 8.1 : les bornes inférieures

### 9.1 L'idée

> *« **La pire chose qu'une compagnie puisse croire est qu'elle fait face au HAUT risque. Par conséquent, les utilités des DEUX types devraient être BORNÉES INFÉRIEUREMENT par le maximum qu'ils pourraient obtenir quand la compagnie les croit être le haut risque.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">LEMME 8.1 — Bornes inférieures</span>

Soit $(\psi_l,\psi_h,\sigma(\cdot),\beta(\cdot))$ un équilibre séquentiel, et $u_l^*$, $u_h^*$ les utilités d'équilibre. Alors

$$\textbf{1. } u_l^*\geq\tilde u_l \qquad\qquad \textbf{2. } u_h^*\geq u_h^c$$

où

$$\tilde u_l\equiv\max_{(B,p)}\ u_l(B,p) \quad\text{s.c.}\quad p=\bar\pi B\leq w \qquad\text{et}\qquad u_h^c\equiv u_h(L,\bar\pi L)$$

</div>

### 9.2 La preuve

<details class="details--riche">
<summary>

**Les quatre pas**

</summary>

**Pas 1 — toute police AU-DESSUS de la droite du haut risque est acceptée.**

Soit $(B,p)$ avec $p>\bar\pi B$. Les profits espérés de l'accepter, **étant données les croyances $\beta(B,p)$**, sont

$$p-\big\{\beta(B,p)\underline\pi+(1-\beta(B,p))\bar\pi\big\}B\ \geq\ p-\bar\pi B\ >\ 0$$

⚠️ **L'inégalité vient de ce que $\underline\pi<\bar\pi$** : la moyenne pondérée est **au plus $\bar\pi$**, **quelles que soient les croyances**.

> *« Accepter est donc **strictement meilleur** que rejeter, qui donne zéro. **Nous concluons que TOUTES les polices au-dessus de la droite de profit nul du haut risque sont ACCEPTÉES.** »*

**Pas 2 — les garanties d'utilité.** Pour toute police avec $\bar\pi B<p\leq w$ :

$$u_l^*\geq u_l(B,p) \quad \text{(P.1)} \qquad\qquad u_h^*\geq u_h(B,p) \quad \text{(P.2)}$$

**Pas 3 — passage à l'inégalité large par CONTINUITÉ** :

$$u_l^*\geq u_l(B,p) \quad\text{et}\quad u_h^*\geq u_h(B,p) \qquad \textbf{pour tout } \bar\pi B\leq p\leq w$$

**Pas 4 — conclure.**

> *« **(P.3) est équivalent à (1) parce que l'utilité est DÉCROISSANTE en $p$**, et **(P.4) est équivalent à (2) parce que, parmi toutes les polices PAS MEILLEURES QU'ÉQUITABLES, celle d'assurance COMPLÈTE maximise UNIQUEMENT l'utilité du haut risque**. »* $\blacksquare$

</details>

### 🔴 9.3 Les conséquences — asymétriques entre les deux types

> **La figure 8.5.** *« Parce que toutes les polices au-dessus de la droite du haut risque sont acceptées, **le faible risque doit obtenir au moins $\tilde u_l=u_l(\tilde\psi_l)$ et le haut risque au moins $u_h^c$**. Notez que **bien que dans la figure $\tilde\psi_l\neq(0,0)$, il est possible que $\tilde\psi_l=(0,0)$**. »*

| Le type | La conséquence |
|---|---|
| **Haut risque** | **Il DOIT s'assurer en équilibre** — *« sans assurance son utilité serait $u_h(0,0)$ qui, **par stricte aversion au risque**, est strictement inférieure à $u_h^c$ »* |
| **Faible risque** | **On ne peut PAS le dire** — cela dépend du signe de $\mathrm{MRS}_l(0,0)-\bar\pi$ |

**Les deux cas :**

$$\mathrm{MRS}_l(0,0)>\bar\pi \ \Longrightarrow\ u_l(0,0)<\tilde u_l \qquad\qquad \mathrm{MRS}_l(0,0)<\bar\pi \ \Longrightarrow\ u_l(0,0)\geq\tilde u_l$$

> *« Dans ce dernier cas, **le faible risque peut CHOISIR de ne pas s'assurer en équilibre (en faisant une proposition qui est REJETÉE) sans violer la conclusion du lemme 8.1.** »*

## 🔴 Concept 10 — Les équilibres séparateurs (théorème 8.1)

### 10.1 La définition 8.2

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 8.2 — Équilibres de signalement séparateurs et mélangeants</span>

Un équilibre séquentiel en stratégies pures est **SÉPARATEUR** si $\psi_l\neq\psi_h$, et **MÉLANGEANT** *(pooling)* sinon.

</div>

> *« Dans un équilibre **séparateur**, les consommateurs **se SÉPARENT** les uns des autres et **peuvent être IDENTIFIÉS** par la compagnie en vertu de la police choisie. Dans un équilibre **mélangeant**, **ils ne peuvent PAS être identifiés**. »*

⚠️ *« **Avec seulement DEUX types possibles, un équilibre est SOIT séparateur SOIT mélangeant. Il suffit donc de caractériser ces deux ensembles.** »*

### 🔴 10.2 Le point conceptuel clé

> *« Dans un équilibre séparateur, **chaque type pourrait FEINDRE l'identité de l'autre simplement en se comportant comme l'autre le ferait selon l'équilibre**. »*

$$\boxed{\;\textbf{« LE POINT CONCEPTUEL CLÉ est que, dans un équilibre séparateur, IL NE DOIT PAS}\\\textbf{ÊTRE DANS L'INTÉRÊT de l'un ou l'autre type d'IMITER le comportement de l'autre. »}\;}$$

> *(Note 7.)* *« Il y a **d'autres manières** de feindre l'identité de l'autre. Par exemple, **le faible risque pourrait choisir une proposition qu'AUCUN type n'est censé choisir en équilibre**, mais qui induirait néanmoins la compagnie à croire qu'elle fait face au haut risque. »*

### 10.3 Le théorème 8.1

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 8.1 — Caractérisation des équilibres séparateurs</span>

Les polices $\psi_l=(B_l,p_l)$ et $\psi_h=(B_h,p_h)$ sont proposées par le faible et le haut risque, et **acceptées** par la compagnie, dans un équilibre séparateur **si et seulement si** :

**1.** $\ \psi_l\neq\psi_h=(L,\ \bar\pi L)$ — **le haut risque obtient EXACTEMENT sa police concurrentielle** ; **2.** $\ p_l\geq\underline\pi B_l$ — la police du faible risque est **au-dessus de SA droite de profit nul** ; **3.** $\ u_l(\psi_l)\geq\tilde u_l$ — **le faible risque ne gagne pas à se faire passer pour un haut risque** ; **4.** $\ u_h(\psi_h)\geq u_h(\psi_l)$ — **le haut risque ne gagne pas à IMITER le faible risque.**

</div>

### 10.4 La preuve

<details class="details--riche">
<summary>

**Sens ⟸ : construire $\sigma$ et $\beta$**

</summary>

$$\beta(B,p)=\begin{cases}1,&\text{si }(B,p)=\psi_l\\0,&\text{si }(B,p)\neq\psi_l\end{cases} \qquad \sigma(B,p)=\begin{cases}A,&\text{si }(B,p)=\psi_l \text{ ou } p\geq\bar\pi B\\R,&\text{sinon}\end{cases}$$

⚠️ **La lecture des croyances** : *« **TOUTE police proposée AUTRE que $\psi_l$ induit la compagnie à croire qu'elle fait face au HAUT risque avec probabilité UN.** »* — Bayes est satisfait car les deux polices d'équilibre reçoivent bien les croyances $1$ et $0$.

**Pourquoi $\sigma$ maximise les profits** : *« la compagnie accepte une police **si et seulement si elle donne des profits espérés NON NÉGATIFS** »* :

| La proposition | Les profits espérés | Pourquoi acceptée |
|---|---|---|
| $\psi_l$ | $p_l-\underline\pi B_l$ | **non négatif par (2)** |
| $\psi_h=(L,\bar\pi L)$ | $\bar\pi L-\bar\pi L=0$ | **nul** |
| **toute autre** $(B,p)$ | $p-\bar\pi B$ | acceptée **précisément quand** $p\geq\bar\pi B$ |

**Pourquoi les consommateurs maximisent** : *« parce que la compagnie **accepte la police $(0,0)$**, et que celle-ci **équivaut à un REJET**, les deux consommateurs peuvent maximiser en faisant une proposition **acceptée**. »* On restreint donc à

$$\mathcal{A}=\{\psi_l\}\cup\{(B,p)\mid p\geq\bar\pi B\}$$

Il reste $u_l(\psi_l)\geq u_l(B,p)$ **— qui découle de (3) —** et $u_h(\psi_h)\geq u_h(B,p)$ **— qui découle de (1), (3), (4) et de ce que $(L,\bar\pi L)$ est le meilleur pour le haut risque parmi les polices pas meilleures qu'équitables**.

</details>

<details class="details--riche">
<summary>

**Sens ⟹ : les quatre conditions sont nécessaires**

</summary>

| # | L'argument |
|---|---|
| **1** | Le **lemme 8.1** donne $u_h(B_h,p_h)\geq u_h(L,\bar\pi L)$. La compagnie **accepte**, donc **profits non négatifs** : $p_h\geq\bar\pi B_h$ — *« parce que dans un équilibre séparateur, **les croyances placent probabilité un sur le haut risque** après sa proposition »*. **Ces deux inégalités forcent $\psi_h=(L,\bar\pi L)$** *(fig. 8.4)*. |
| **2** | Après $\psi_l$, **Bayes place probabilité un sur le faible risque** ⟹ les profits d'accepter sont $p_l-\underline\pi B_l$ ⟹ **non négatifs par hypothèse d'acceptation**. |
| **3** | C'est **exactement le point (1) du lemme 8.1**. |
| **4** | *« Selon la stratégie de la compagnie, **elle ACCEPTE la police $\psi_l$**. Parce que l'utilité d'équilibre du haut risque est $u_h(\psi_h)$, **on doit avoir $u_h(\psi_h)\geq u_h(\psi_l)$** »* — sinon il imiterait. |

</details>

### 🔴 10.5 La lecture géométrique — les trois contraintes sur $\psi_l$

> **La figure 8.6.** *« Le haut risque obtient $\psi_h^c=(L,\bar\pi L)$ et le faible risque obtient $\psi_l$, qui doit se trouver quelque part dans **la région ombrée**. »*

> *« **Notez les traits essentiels de l'ensemble des polices du faible risque. CHACUNE est :** »*

| La contrainte | Sa raison |
|---|---|
| **au-dessus de la droite de profit nul du FAIBLE risque** | *« **pour induire l'ACCEPTATION** par la compagnie »* |
| **au-dessus de la courbe d'indifférence du HAUT risque passant par $\psi_h^c$** | *« **pour garantir qu'il n'a AUCUNE INCITATION à imiter le faible risque** »* |
| **en dessous de la courbe d'indifférence donnant $\tilde u_l$ au faible risque** | *« **pour garantir qu'il n'a aucune incitation à DÉVIER et à être identifié comme un haut risque** »* |

### 10.6 L'existence et la portée

> *« **La région ombrée est TOUJOURS NON VIDE, même quand $\mathrm{MRS}_l(0,0)\leq\bar\pi$. Ceci requiert d'utiliser le fait que $\mathrm{MRS}_l(0,0)>\underline\pi$. Par conséquent, UN ÉQUILIBRE SÉPARATEUR EN STRATÉGIES PURES EXISTE TOUJOURS.** »*

> *« **Parce que les équilibres séparateurs existent toujours, permettre aux propositions d'agir comme SIGNAUX est TOUJOURS EFFICACE au sens où cela rend effectivement POSSIBLE au faible risque de se distinguer.** »*

### 🔴 10.7 Mais l'efficacité n'est PAS garantie

> *« **D'autre part, il n'y a pas nécessairement BEAUCOUP D'AMÉLIORATION en termes d'efficacité.** »*

> *« Par exemple, quand $\mathrm{MRS}_l(0,0)\leq\bar\pi$, **il y a un équilibre séparateur dans lequel le faible risque reçoit la police NULLE $(0,0)$ et le haut risque reçoit $(L,\bar\pi L)$. C'est-à-dire que SEUL LE HAUT RISQUE EST ASSURÉ.** »*

> ⚠️ *« **De plus, ceci reste une issue d'équilibre QUELLE QUE SOIT la probabilité que le consommateur soit un haut risque ! Ainsi, la présence d'UNE SEULE POMME POURRIE — même avec une probabilité très faible — peut GÂTER l'issue exactement comme dans l'équilibre concurrentiel sans signalement.** »*

> *(Note 8.)* *« Ou, selon notre seconde interprétation, **quelle que soit la PROPORTION de hauts risques dans la population**. »*

### 10.8 Le meilleur équilibre séparateur

> *« Malgré l'existence d'équilibres aussi inefficaces que dans le modèle sans signalement, **quand le signalement est présent, IL Y A TOUJOURS des équilibres dans lesquels le faible risque reçoit UNE CERTAINE COUVERTURE. Celui de ceux-ci qui est LE MEILLEUR pour le faible risque et LE PIRE pour la compagnie lui donne la police notée $\bar\psi_l$** *(figure 8.7)*. »*

> **La figure 8.7.** **$\bar\psi_l$ est le point d'intersection de la droite de profit nul du faible risque avec la courbe d'indifférence du haut risque passant par $\psi_h^c$.**

> *« Parce que **le haut risque obtient la même police $\psi_h^c$ dans CHAQUE équilibre séparateur**, l'issue $(\bar\psi_l,\psi_h^c)$ est **PARETO-EFFICACE PARMI LES ÉQUILIBRES SÉPARATEURS** et elle **donne des profits NULS**. »*

> ⚠️ *« Cette issue est présente **QUELLE QUE SOIT la probabilité que le consommateur soit à faible risque**. Ainsi, **MÊME QUAND l'unique équilibre concurrentiel sous information asymétrique ne donne AUCUNE assurance au faible risque (ce qui arrive quand $\alpha$ est suffisamment PETIT), le faible risque peut obtenir de l'assurance, et l'efficacité du marché peut être AMÉLIORÉE quand le signalement est possible.** »*

<details class="details--riche">
<summary>

**Pourquoi $\bar\psi_l$ domine les autres — la légende de la figure 8.7**

</summary>

> *« Notez que $(\psi_l',\psi_h^c)$ **domine au sens de Pareto** $(\psi_l'',\psi_h^c)$. **Le haut risque est INDIFFÉRENT entre elles, tout comme la compagnie** ($\psi_l'$ et $\psi_l''$ sont **sur la même droite d'ISO-PROFIT du faible risque**, donnant des profits $a>0$). **Mais le faible risque préfère STRICTEMENT $\psi_l'$ à $\psi_l''$, PAR LE FAIT (b).** »*

> *« Par conséquent, **parmi les équilibres séparateurs, SEULS ceux dont la police $\psi_l$ est entre $\bar\psi_l$ et $\psi_l'$ ne sont PAS dominés au sens de Pareto par un autre équilibre séparateur**. »*

⚠️ **Le fait (b) entre en jeu** : $\mathrm{MRS}_l>\underline\pi$ quand $B<L$, donc le long d'une iso-profit de pente $\underline\pi$, **le faible risque préfère le point de plus GRAND bénéfice**.

</details>

## 🔴 Concept 11 — Les équilibres mélangeants (théorème 8.2)

### 11.1 La droite de profit nul de mélange

> *« Si **les deux** consommateurs proposent la même police en équilibre, alors **la compagnie n'apprend RIEN** en entendant la proposition. Par conséquent, accepter $(B,p)$ donnerait des profits espérés »*

$$p-\big(\alpha\underline\pi+(1-\alpha)\bar\pi\big)B$$

$$\boxed{\;\hat\pi\equiv\alpha\,\underline\pi+(1-\alpha)\,\bar\pi\;}$$

> *« La police sera **acceptée si $p>\hat\pi B$**, **rejetée si $p<\hat\pi B$**, et la compagnie sera **INDIFFÉRENTE si $p=\hat\pi B$**. »*

> **La figure 8.8.** Ces polices *« se trouvent sur **un rayon issu de l'origine** appelé la **DROITE DE PROFIT NUL DE MÉLANGE** »*, **entre** les deux autres.

### 11.2 Le théorème 8.2

Par le **lemme 8.1**, la proposition $(B',p')$ doit satisfaire

$$u_l(B',p')\geq\tilde u_l \qquad\text{et}\qquad u_h(B',p')\geq u_h^c \tag{8.5}$$

et, devant être **acceptée**, elle doit être **sur ou au-dessus** de la droite de mélange :

$$p'\geq\hat\pi B' \tag{8.6}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 8.2 — Caractérisation des équilibres mélangeants</span>

La police $\psi'=(B',p')$ est l'issue d'un équilibre mélangeant **si et seulement si** elle satisfait **(8.5) et (8.6)**.

</div>

<details class="details--riche">
<summary>

**La preuve du sens ⟸**

</summary>

On pose

$$\beta(B,p)=\begin{cases}\alpha,&\text{si }(B,p)=\psi'\\0,&\text{si }(B,p)\neq\psi'\end{cases} \qquad \sigma(B,p)=\begin{cases}A,&\text{si }(B,p)=\psi' \text{ ou } p\geq\bar\pi B\\R,&\text{sinon}\end{cases}$$

> *« Ainsi, **exactement comme dans la preuve du théorème 8.1, la compagnie considère TOUTE DÉVIATION de la proposition d'équilibre comme venant du HAUT risque.** »*

**Bayes** : *« quand $\psi'$ est proposée, **Bayes exige que les croyances soient INCHANGÉES parce que cette proposition est faite par LES DEUX types**. Comme $\beta(\psi')=\alpha$, **les croyances satisfont bien Bayes.** »*

**Profits** : accepter $\psi'$ donne **des profits non négatifs par (8.6)**.

**Consommateurs** : en déviant vers $(B,p)\neq\psi'$, le consommateur obtient $(0,0)$ si rejetée *(i.e. si $p<\bar\pi B$)* et $(B,p)$ si acceptée. Proposer $\psi'$ est donc optimal si

$$u_i(\psi')\geq u_i(0,0) \qquad\text{et}\qquad u_i(\psi')\geq u_i(B,p) \ \text{ pour tout } \bar\pi B\leq p\leq w$$

> *« **Mais ces inégalités découlent de (8.5).** »* $\blacksquare$

</details>

### 🔴 11.3 Comment l'ensemble des mélangeants varie avec $\alpha$

> **La figure 8.9.** La région ombrée = *« l'ensemble des polices pouvant surgir comme équilibres mélangeants »*.

| Si $\alpha$… | Alors |
|---|---|
| **BAISSE** | *« la région ombrée **RÉTRÉCIT** parce que **la PENTE de la droite de mélange AUGMENTE**, tout le reste étant fixe. **Éventuellement, la région DISPARAÎT tout à fait.** »* ⟹ **si les hauts risques sont assez probables, il n'y a AUCUN équilibre mélangeant** |
| **AUGMENTE** | *« la région **S'ÉTEND** parce que la pente **DIMINUE** »* ⟹ **il existe des mélangeants MEILLEURS pour les DEUX types que TOUT séparateur — même pour le faible risque** *(figure 8.10)* |

### 🔴 11.4 Pourquoi le mélange peut battre la séparation

> *« **Ce n'est pas surprenant pour le haut risque. La raison pour laquelle c'est possible pour le FAIBLE risque est qu'IL LUI EST COÛTEUX DE SE SÉPARER du haut risque.** »*

**L'argument complet :**

| Pas | Le raisonnement |
|---|---|
| **1** | *« Une séparation efficace exige que le faible risque **choisisse une police que le haut risque NE PRÉFÈRE PAS à $\psi_h^c$. Ceci RESTREINT son choix et réduit certainement son utilité en dessous de ce qu'il pourrait obtenir EN L'ABSENCE du haut risque.** »* |
| **2** | *« Quand $\alpha$ est suffisamment élevé et que l'équilibre est mélangeant, **c'est un peu comme si le haut risque N'ÉTAIT PAS LÀ.** »* |
| **3** | *« **Le coût du mélange pour le faible risque est alors simplement un coût marginal LÉGÈREMENT GONFLÉ par unité de bénéfice ($\hat\pi$ au lieu de $\underline\pi$). CE COÛT S'ÉVANOUIT quand $\alpha$ tend vers UN.** »* |
| **4** | *« **En revanche, le coût de SE SÉPARER du haut risque est BORNÉ LOIN DE ZÉRO.** »* |

$$\boxed{\;\text{coût du MÉLANGE} \ \xrightarrow{\ \alpha\to1\ } \ 0 \qquad\text{mais}\qquad \text{coût de la SÉPARATION} \ \geq\ \text{une constante} > 0\;}$$

## 🔴 Concept 12 — Le critère intuitif de Cho et Kreps

### 12.1 Le problème avec les croyances construites

> *« Le lecteur aura peut-être remarqué que dans les preuves des théorèmes 8.1 et 8.2, **il y avait une composante COMMUNE, et PEU SÉDUISANTE. Dans chaque cas, les croyances assignées à la compagnie étaient plutôt EXTRÊMES : TOUTE déviation était interprétée comme ayant été proposée par le HAUT risque.** »*

> ⚠️ *« **Soyons clairs. Les croyances construites sont PARFAITEMENT EN LIGNE avec notre définition d'un équilibre séquentiel. Ce dont nous allons discuter est de savoir si nous souhaitons ou non placer des restrictions SUPPLÉMENTAIRES.** »*

### 12.2 L'argument de la figure 8.11

Soit $\psi'$ une issue mélangeante typique, et $\psi''$ une police telle que *(figure 8.11)* :

$$u_l^*<u_l(\psi'') \qquad\text{et}\qquad u_h(\psi'')<u_h^*$$

> *« Par conséquent, **QUE la compagnie accepte ou rejette $\psi''$, LE HAUT RISQUE serait PLUS MAL LOTI en faisant cette proposition qu'en faisant la proposition d'équilibre $\psi'$. En revanche, si la compagnie ACCEPTAIT $\psi''$, LE FAIBLE RISQUE serait MIEUX loti.** »*

> ⚠️ *« **Simplement dit, SEUL LE FAIBLE RISQUE A UN QUELCONQUE INTÉRÊT à faire la proposition $\psi''$, étant donné que $\psi'$ est la proposition d'équilibre.** »*

> *« **Il semble donc DÉRAISONNABLE que la compagnie croie, après avoir vu $\psi''$, qu'elle fait face au HAUT risque. En effet, il est bien plus raisonnable d'insister pour qu'elle croie faire face au FAIBLE risque.** »*

⚠️ *« Une telle police $\psi''$ **existe TOUJOURS**, parce que **$\psi'$ est sur ou au-dessus de la droite de mélange** et que **$\mathrm{MRS}_l(\psi')<\mathrm{MRS}_h(\psi')$** »* — c'est **le croisement unique** qui la fournit.

### 12.3 La définition 8.3

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 8.3 — (Cho et Kreps) Un critère intuitif</span>

Un équilibre séquentiel donnant les utilités $u_l^*$ et $u_h^*$ **satisfait le critère intuitif** si, **pour toute police $\psi\neq\psi_l,\psi_h$** :

$$\text{si}\quad u_i(\psi)>u_i^* \quad\text{et}\quad u_j(\psi)<u_j^* \quad\text{alors}\quad \beta(\psi) \text{ place probabilité UN sur le type } i$$

c'est-à-dire $\beta(\psi)=1$ si $i=l$, et $\beta(\psi)=0$ si $i=h$.

</div>

⚠️ *« Il s'applique à **TOUS** les équilibres séquentiels, **pas seulement aux mélangeants**. »*

### 12.4 Le théorème 8.3

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 8.3 — L'équilibre satisfaisant le critère intuitif</span>

**Il y a une UNIQUE paire de polices $(\psi_l,\psi_h)$ pouvant être soutenue par un équilibre séquentiel satisfaisant le critère intuitif. De plus, c'est LE MEILLEUR ÉQUILIBRE SÉPARATEUR POUR LE FAIBLE RISQUE :**

$$\boxed{\;\psi_l=\bar\psi_l \qquad\text{et}\qquad \psi_h=\psi_h^c\;}$$

</div>

<details class="details--riche">
<summary>

**Pas 1 — aucun équilibre MÉLANGEANT ne survit**

</summary>

> *« Nous l'avons **presque déjà fait** dans notre discussion de la figure 8.11. »*

| Pas | L'argument |
|---|---|
| **1** | Si $\psi'$ est mélangeant, **il existe $\psi''$ préférée SEULEMENT par le faible risque**, et qui **se trouve strictement AU-DESSUS de la droite de profit nul du faible risque** |
| **2** | Si le faible risque la propose et que **le critère intuitif est satisfait**, **la compagnie DOIT croire qu'elle fait face au faible risque** |
| **3** | $\psi''$ étant **strictement au-dessus de sa droite de profit nul**, **la compagnie DOIT l'accepter (par rationalité séquentielle)** |
| **4** | ⟹ **le faible risque améliore son paiement en déviant** — contradiction. $\blacksquare$ |

</details>

<details class="details--riche">
<summary>

**Pas 2 — parmi les séparateurs, seul $(\bar\psi_l,\psi_h^c)$ survit**

</summary>

Par le **lemme 8.1**, $u_h^*\geq u_h^c$. **Par l'absurde**, supposons $u_l^*<u_l(\bar\psi_l)$.

Écrivons $\bar\psi_l=(\bar B_l,\bar p_l)$ et considérons

$$\psi_l^\varepsilon\equiv\big(\bar B_l-\varepsilon,\ \bar p_l+\varepsilon\big) \qquad \varepsilon>0 \text{ petit}$$

⚠️ **Une police LÉGÈREMENT moins généreuse et LÉGÈREMENT plus chère.** Par **continuité de $u_l$**, pour $\varepsilon$ assez petit *(figure 8.12)* :

$$u_h^*\geq u_h^c>u_h(\psi_l^\varepsilon), \qquad u_l(\psi_l^\varepsilon)>u_l^*, \qquad \bar p_l+\varepsilon>\underline\pi(\bar B_l-\varepsilon)$$

| L'inégalité | Ce qu'elle donne |
|---|---|
| Les **deux premières** | **par le CRITÈRE INTUITIF**, la compagnie croit faire face **au FAIBLE risque** |
| La **troisième** | elle est **strictement au-dessus de la droite de profit nul du faible risque** ⟹ **par rationalité séquentielle, la compagnie l'ACCEPTE** |

⟹ *« Le faible risque **peut atteindre l'utilité $u_l(\psi_l^\varepsilon)>u_l^*$. Mais ceci CONTREDIT que $u_l^*$ soit son utilité d'équilibre.** »*

**Donc** $u_l^*\geq u_l(\bar\psi_l)$ et $u_h^*\geq u_h(\psi_h^c)$.

> *« Or, **ces inégalités impliquent que les propositions des DEUX types sont ACCEPTÉES**. Les hypothèses du **théorème 8.1** sont donc satisfaites. **Mais selon le théorème 8.1, ces deux inégalités ne peuvent tenir que si $\psi_l=\bar\psi_l$ et $\psi_h=\psi_h^c$** *(figure 8.7)*. »*

</details>

<details class="details--riche">
<summary>

**Pas 3 — la construction qui prouve l'existence**

</summary>

Poser $\psi_l=\bar\psi_l$, $\psi_h=\psi_h^c$, et définir **l'ensemble des polices que SEUL le faible risque préfère** *(figure 8.13)* :

$$\mathcal{A}=\Big\{\psi\ \Big|\ u_l(\psi)>u_l(\bar\psi_l) \ \textbf{ et } \ u_h(\psi)<u_h(\psi_h^c)\Big\}$$

$$\beta(B,p)=\begin{cases}1,&\text{si }(B,p)\in\mathcal{A}\cup\{\psi_l\}\\0,&\text{sinon}\end{cases} \qquad \sigma(B,p)=\begin{cases}A,&\text{si }(B,p)=\psi_l \text{ ou } p\geq\bar\pi B\\R,&\text{sinon}\end{cases}$$

> *« **Il est direct de vérifier que PAR CONSTRUCTION les croyances satisfont le critère intuitif.** En outre, on peut **virtuellement MIMER la portion pertinente de la preuve du théorème 8.1** pour conclure que c'est un équilibre séparateur. »* $\blacksquare$

</details>

### 12.5 La portée

> *« **Le caractère intrinsèquement RAISONNABLE de la restriction supplémentaire suggère que l'équilibre séparateur LE MEILLEUR POUR LE FAIBLE RISQUE est peut-être L'ISSUE LA PLUS PROBABLE du jeu de signalement.** Comme nous en avons discuté, **cette issue particulière peut SURPASSER l'issue concurrentielle sous information asymétrique. Ainsi, LE SIGNALEMENT EST BIEN UN MOYEN D'AMÉLIORER L'EFFICACITÉ de ce marché.** »*

> ⚠️ *« Il y a **UNE AUTRE ROUTE** vers l'amélioration de l'efficacité. **En effet, dans le marché d'assurance du monde réel, CETTE ALTERNATIVE EST LA ROUTE LA PLUS FRÉQUENTÉE.** »*

## 🔴 Concept 13 — §8.1.3 : le criblage

### 13.1 Le renversement de l'initiative

> *« **Quand la plupart des consommateurs achètent de l'assurance automobile, ils ne présentent PAS une police à la compagnie en attendant une réponse, comme dans le modèle précédent. Plutôt, LA COMPAGNIE OFFRE TYPIQUEMENT AU CONSOMMATEUR UN MENU DE POLICES parmi lesquelles il fait simplement un choix.** »*

> *« **En offrant un menu, les compagnies peuvent (implicitement) CRIBLER les consommateurs en TAILLANT les polices offertes de sorte que les hauts risques soient induits à choisir l'une, et les faibles risques une autre.** »*

### 🔴 13.2 Pourquoi DEUX compagnies

> *« Bien qu'il ait été possible d'illustrer les traits essentiels du signalement avec **UNE SEULE** compagnie, **il y a des NUANCES DU CRIBLAGE QUI EXIGENT DEUX compagnies pour se révéler. Nous ajoutons donc une compagnie supplémentaire.** »*

> *(Note 9.)* *« Nous aurions **aussi pu** inclure deux compagnies dans le modèle de signalement. **Cela n'aurait changé les résultats en RIEN de significatif.** »*

### 13.3 Le jeu de criblage

| Ordre | Le joueur | Son action |
|---|---|---|
| **1** | **Les deux compagnies** | *« choisissent **SIMULTANÉMENT** une liste FINIE (un MENU) de polices »* |
| **2** | **La Nature** | choisit le type : faible risque avec $\alpha$, haut risque avec $1-\alpha$ |
| **3** | **Le consommateur choisi** | *« choisit **UNE SEULE police** dans l'une des listes »* |

**Les stratégies :**

> *« Parce qu'il n'y a que **deux types possibles**, nous pouvons restreindre les compagnies à des listes d'**au plus deux polices** : $\Psi^j=(\psi_l^j,\psi_h^j)$ pour $j=A,B$. »*

⚠️ *« Gardez à l'esprit que **le faible (haut) risque N'A PAS BESOIN de choisir CETTE police, parce que la compagnie ne peut pas identifier son type. LE CONSOMMATEUR CHOISIRA LA POLICE LUI DONNANT LA PLUS HAUTE UTILITÉ parmi celles offertes par LES DEUX compagnies.** »*

**Pour le consommateur** : une **fonction de choix** $c_i(\Psi^A,\Psi^B)=(j,\psi)$.

> *« **Nous donnons TOUJOURS aux consommateurs l'option de choisir la police NULLE** de l'une ou l'autre compagnie, **même si elle n'est pas formellement sur leur liste. C'est simplement une manière commode de leur permettre de NE PAS S'ASSURER.** »*

### 🔴 13.4 Pourquoi la perfection en sous-jeux suffit ici

> *« Comme il est évident de la figure 8.14, **le SEUL ensemble d'information non singleton appartient à la compagnie B. Cependant, notez que QUELLES QUE SOIENT les stratégies employées, CET ENSEMBLE D'INFORMATION DOIT ÊTRE ATTEINT. Par conséquent, IL SUFFIT DE CONSIDÉRER LES ÉQUILIBRES PARFAITS EN SOUS-JEUX.** »*

> *« Il vous est demandé de montrer en exercice que **si le jeu était FINI, son ensemble d'issues d'équilibre SÉQUENTIEL serait IDENTIQUE à son ensemble d'issues parfaites en sous-jeux.** »*

⚠️ **C'est exactement la note 17 de la fiche 516** : la perfection ne diffère de Nash que sur les sous-jeux **non atteints**.

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 8.4 — Équilibres de criblage séparateurs et mélangeants</span>

L'équilibre parfait en sous-jeux $(\Psi^A,\Psi^B,c_l(\cdot),c_h(\cdot))$ est **SÉPARATEUR** si $\psi_l\neq\psi_h$, où $(j_l,\psi_l)=c_l(\Psi^A,\Psi^B)$ et $(j_h,\psi_h)=c_h(\Psi^A,\Psi^B)$. Sinon il est **MÉLANGEANT**.

</div>

⚠️ *« Notez que dans un équilibre mélangeant, **bien que les deux types doivent choisir d'acheter LA MÊME police, ils n'ont PAS BESOIN de l'acheter à LA MÊME COMPAGNIE**. »*

## 🔴 Concept 14 — L'écrémage et le lemme 8.2

### 🔴 14.1 Ce qu'est l'écrémage

> *« **Une force motrice importante de l'analyse est un phénomène appelé l'ÉCRÉMAGE (cream skimming).** »*

> *« **L'écrémage survient quand une compagnie prend AVANTAGE STRATÉGIQUE de l'ensemble des polices offertes par l'autre EN OFFRANT UNE POLICE QUI N'ATTIRERAIT QUE LES CONSOMMATEURS À FAIBLE RISQUE de la compagnie concurrente. La compagnie « RAIDEUSE » ne gagne donc QUE LES TRÈS BONS clients (LA CRÈME) tandis qu'elle laisse à son concurrent LES TRÈS MAUVAIS.** »*

> *« **À l'équilibre, les deux compagnies doivent garantir que l'autre ne peut PAS écrémer ainsi.** **Notez qu'AU MOINS DEUX firmes sont requises pour que l'écrémage devienne une préoccupation stratégique. C'est ce qui nous a motivés à introduire une seconde compagnie.** »*

### 14.2 Le lemme 8.2

<div class="callout" data-kind="formel">

<span class="callout__lab">LEMME 8.2 — Profits nuls</span>

**Les deux compagnies gagnent des profits espérés NULS dans TOUT équilibre parfait en sous-jeux en stratégies pures.**

</div>

> *« **La preuve de ce résultat est ANALOGUE à celle du modèle de concurrence de BERTRAND du chapitre 4.** »*

<details class="details--riche">
<summary>

**La preuve — les deux cas**

</summary>

**Le préliminaire** : *« chaque compagnie doit gagner des profits **NON NÉGATIFS** parce que **chacune peut garantir zéro en offrant une paire de polices NULLES ($B=p=0$)**. Il suffit donc de montrer qu'**aucune ne gagne strictement positif**. »*

**Par l'absurde** : $A$ gagne strictement positif, et les profits de $B$ ne sont **pas plus élevés**. Les profits **TOTAUX** des deux firmes s'écrivent

$$\Pi\equiv\alpha\big(p_l^*-\underline\pi B_l^*\big)+(1-\alpha)\big(p_h^*-\bar\pi B_h^*\big)>0$$

⚠️ *« **Clairement, $\Pi$ EXCÈDE STRICTEMENT les profits de la compagnie B.** »*

**CAS 1 — mélangeant** *(les deux choisissent $(B^*,p^*)$)*.

> *« Considérez la déviation suivante par **B** : elle offre la paire $\{(B^*+\varepsilon,p^*),(B^*+\varepsilon,p^*)\}$ avec $\varepsilon>0$. **Clairement, chaque type préférera STRICTEMENT cette police, et pour $\varepsilon$ assez petit, les profits de B seront ARBITRAIREMENT PROCHES de $\Pi$** — donc plus élevés qu'à l'équilibre. **Contradiction.** »*

⚠️ **L'idée** : $B$ **rafle tout le marché** en offrant un iota de bénéfice de plus, et empoche **les profits TOTAUX**.

**CAS 2 — séparateur** *($\psi_l^*\neq\psi_h^*$)*.

> *« L'équilibre exige qu'**aucun consommateur ne puisse améliorer son paiement en basculant vers le choix de l'autre**. Avec cela et le fait que les choix sont **distincts**, **LA PROPRIÉTÉ DE CROISEMENT UNIQUE implique qu'AU MOINS L'UN des consommateurs préfère STRICTEMENT son propre choix** : »*

$$u_l(\psi_l^*)>u_l(\psi_h^*) \quad \text{(P.1)} \qquad\text{ou}\qquad u_h(\psi_h^*)>u_h(\psi_l^*) \quad \text{(P.2)}$$

**Supposons (P.1).** $B$ dévie en offrant $\psi_l^\varepsilon=(B_l^*+\varepsilon,\ p_l^*)$ et $\psi_h^\beta=(B_h^*+\beta,\ p_h^*)$, avec $\varepsilon,\beta>0$.

> *« Clairement, **chaque type $i$ préfère strictement $\psi_i^\varepsilon$ à $\psi_i^*$.** En outre, nous affirmons que $\varepsilon$ et $\beta$ peuvent être choisis **arbitrairement petits** de sorte que »*

$$u_l(\psi_l^\varepsilon)>u_l(\psi_h^\beta) \quad \text{(P.3)} \qquad\text{et}\qquad u_h(\psi_h^\beta)>u_h(\psi_l^\varepsilon) \quad \text{(P.4)}$$

⚠️ **L'ORDRE des choix compte** : *« **(P.3) tiendra tant que $\varepsilon$ et $\beta$ sont assez petits** *(par (P.1))*. **(P.4) peut ensuite être assurée en FIXANT $\beta$ PUIS en choisissant $\varepsilon$ assez petit**, parce que pour $\beta>0$ **fixé** : »*

$$u_h(\psi_h^\beta)>u_h(\psi_h^*)\geq u_h(\psi_l^*)=\lim_{\varepsilon\to0}u_h(\psi_l^\varepsilon)$$

*« où l'inégalité faible vient de ce qu'**à l'équilibre, le haut risque ne peut préférer aucun autre choix au sien** »* *(figure 8.15)*.

⟹ **le faible risque choisit $\psi_l^\varepsilon$ et le haut risque $\psi_h^\beta$**, donnant à $B$ des profits **arbitrairement proches de $\Pi$**. **Contradiction.** $\blacksquare$

</details>

### 14.3 Le théorème 8.4 : pas d'équilibre mélangeant

> *« On pourrait soupçonner que l'ensemble des équilibres mélangeants serait **RABOTÉ** par l'écrémage. […] **Cette intuition s'avère correcte AVEC VENGEANCE. En effet, L'ÉCRÉMAGE ÉLIMINE LA POSSIBILITÉ DE TOUT ÉQUILIBRE MÉLANGEANT.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 8.4 — Non-existence des équilibres mélangeants</span>

**Il n'y a AUCUN équilibre mélangeant en stratégies pures dans le jeu de criblage.**

</div>

<details class="details--riche">
<summary>

**La preuve — deux cas**

</summary>

Par l'absurde, $\psi^*=(B^*,p^*)$ est choisie par les deux. Par le **lemme 8.2** :

$$\alpha\big(p^*-\underline\pi B^*\big)+(1-\alpha)\big(p^*-\bar\pi B^*\big)=0 \tag{P.1}$$

**CAS 1 — $B^*>0$.** Alors (P.1) implique

$$p^*-\underline\pi B^*>0 \tag{P.2}$$

⚠️ **Pourquoi** : la somme pondérée est nulle et le second terme est **plus petit** que le premier *(car $\bar\pi>\underline\pi$)*, donc le premier est **strictement positif**.

Donc $p^*>0$ aussi, et *« $\psi^*$ ne se trouve sur **aucun des deux axes** »* *(figure 8.16)*.

> *« **Par la propriété de CROISEMENT UNIQUE, il y a une RÉGION $R$ telle que $\psi^*$ est la LIMITE de polices dans $R$.** »* — **$R$ est le « coin » entre les deux courbes d'indifférence, préféré SEULEMENT par le faible risque.**

> *« Si $A$ offre $\psi^*$ et que **$B$ offre $\psi'\in R$ TRÈS PROCHE de $\psi^*$, ET SEULEMENT ELLE**, alors **le haut risque choisira $\psi^*$ chez $A$, tandis que le FAIBLE risque achètera $\psi'$ chez $B$. Par (P.2), B gagnera des profits STRICTEMENT POSITIFS de cette déviation d'ÉCRÉMAGE.** »* **Contradiction avec le lemme 8.2.**

**CAS 2 — $B^*=0$.** Alors (P.1) donne $p^*=0$ : $\psi^*$ est **la police nulle** *(figure 8.17)*.

> *« **Mais l'une ou l'autre compagnie peut maintenant gagner des profits positifs en offrant la SEULE police $(L,\ \bar\pi L+\varepsilon)$ pour $\varepsilon>0$ petit. Elle gagne strictement positif parce qu'elle gagne strictement positif sur LES DEUX types (elle est AU-DESSUS des deux droites de profit nul), et LE HAUT RISQUE CHOISIRA CERTAINEMENT cette police plutôt que la police nulle.** »* $\blacksquare$

</details>

> *« **Notez l'importance de l'écrémage. C'est un trait TYPIQUE des modèles de criblage CONCURRENTIELS, dans lesquels de multiples agents d'un côté du marché se font concurrence pour attirer un pool commun d'agents de l'autre côté EN OFFRANT SIMULTANÉMENT UN MENU DE « CONTRATS ».** »*

## 🔴 Concept 15 — Le théorème 8.5 et la non-existence

### 15.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 8.5 — Caractérisation de l'équilibre séparateur</span>

Si $\psi_l^*$ et $\psi_h^*$ sont les polices choisies dans un équilibre séparateur en stratégies pures, alors

$$\boxed{\;\psi_l^*=\bar\psi_l \qquad\text{et}\qquad \psi_h^*=\psi_h^c\;}$$

</div>

> ⚠️ *« Notez alors que **le seul équilibre séparateur possible du modèle de CRIBLAGE COÏNCIDE avec le MEILLEUR équilibre séparateur pour les consommateurs du jeu de SIGNALEMENT. Par le théorème 8.4, ce sera LE SEUL équilibre possible du jeu.** »*

### 15.2 La preuve en quatre revendications

<details class="details--riche">
<summary>

**Claims 1 à 4**

</summary>

**Claim 1 — le haut risque obtient au moins $u_h^c$.**

> *« Par le lemme 8.2, les deux compagnies font zéro. **Il ne peut donc PAS être le cas que le haut risque préfère STRICTEMENT $(L,\bar\pi L+\varepsilon)$ à $\psi_h^*$ — sinon une compagnie pourrait offrir juste cette police et gagner des profits POSITIFS** ( **elle gagne positif sur LES DEUX types**). »*

$$u_h(\psi_h^*)\geq u_h(L,\bar\pi L+\varepsilon) \quad\forall\varepsilon>0 \qquad\xrightarrow{\ \varepsilon\to0\ }\qquad u_h(\psi_h^*)\geq u_h^c$$

**Claim 2 — $\psi_l^*$ est SUR la droite de profit nul du faible risque.**

| Pas | L'argument |
|---|---|
| **1** | Par le Claim 1, $\psi_h^*$ est **sur ou en dessous** de la droite du haut risque ⟹ **profits non positifs sur le haut risque** |
| **2** | Le lemme 8.2 donnant des profits agrégés **nuls** ⟹ **$\psi_l^*$ est sur ou AU-DESSUS de la droite du faible risque** |
| **3** | **Par l'absurde**, si elle est **strictement au-dessus**, alors $p_l^*>0$, donc $B_l^*>0$ *(sinon le faible risque prendrait la police nulle, toujours disponible)* ⟹ **la région d'écrémage $R$ est présente** *(figure 8.19)* |
| **4** | *« Si **la compagnie qui NE vend PAS au haut risque** offre des polices **strictement dans $R$**, alors **SEUL le faible risque en achètera** — car une telle police est **strictement préférée par lui** et **strictement PIRE que $\psi_h^*$ pour le haut risque**. **Elle gagne strictement positif** car $R$ est au-dessus de la droite du faible risque. » ⟹ contradiction |

**Claim 3 — $\psi_h^*=\psi_h^c$.**

Par le **Claim 2** et le **lemme 8.2**, $\psi_h^*$ est **sur la droite de profit nul du haut risque** ; par le **Claim 1**, $u_h(\psi_h^*)\geq u_h(\psi_h^c)$. **Ces deux faits forcent $\psi_h^*=\psi_h^c$** *(figure 8.18)*.

**Claim 4 — $\psi_l^*=\bar\psi_l$.**

Par le Claim 2, $\psi_l^*$ est **sur** la droite du faible risque. Elle ne peut **pas** donner au faible risque **plus** que $\bar\psi_l$, sinon **le haut risque la préférerait à $\psi_h^c$**. **Par l'absurde**, si elle lui donne **strictement moins**, **la région $R$ de la figure 8.20 est présente** ⟹ *« la compagnie qui ne vend pas $\psi_h^c$ peut offrir une police **strictement dans $R$**, **achetée SEULEMENT par le faible risque** et gagnant **strictement positif** »* ⟹ contradiction. $\blacksquare$

</details>

### 🔴 15.3 La non-existence

> *« Notez que **le théorème 8.5 N'AFFIRME PAS qu'un équilibre séparateur de criblage EXISTE. Avec le théorème 8.4, il dit SEULEMENT que SI un équilibre parfait en sous-jeux en stratégies pures existe, il doit être séparateur et les polices sont UNIQUES.** »*

> ⚠️ *« **L'écrémage est un instrument PUISSANT pour éliminer les équilibres. MAIS IL PEUT ÊTRE TROP PUISSANT. En effet, il y a des cas où AUCUN équilibre parfait en sous-jeux en stratégies pures N'EXISTE DU TOUT.** »*

<details class="details--riche">
<summary>

**L'argument de la figure 8.21**

</summary>

> *« Il suffit de montrer qu'**il n'est PAS un équilibre que les consommateurs obtiennent $\bar\psi_l$ et $\psi_h^c$**. »*

> *« **Mais c'est bien le cas, parce que l'une ou l'autre compagnie peut dévier en offrant SEULEMENT la police $\psi'$, qui sera achetée PAR LES DEUX types (parce qu'ils la préfèrent strictement à leurs polices d'équilibre). Cette compagnie gagnera des profits STRICTEMENT POSITIFS parce que $\psi'$ est strictement AU-DESSUS DE LA DROITE DE PROFIT NUL DE MÉLANGE — qui est la droite pertinente puisque LES DEUX types achèteront $\psi'$.** Ceci contredit le lemme 8.2. »*

$$\boxed{\;\textbf{Quand } \alpha \textbf{ est assez proche de 1 — de sorte que la droite de MÉLANGE}\\\textbf{coupe la courbe d'indifférence } \bar u_l \textbf{ — il n'y a AUCUN équilibre en stratégies pures.}\;}$$

> *(Note 10.)* *« **Même quand la droite de mélange ne coupe PAS la courbe $\bar u_l$, un équilibre n'est PAS garanti d'exister. Il peut encore y avoir une PAIRE de polices telle que l'une attire les faibles risques en faisant des profits POSITIFS, et l'autre attire les hauts risques (les tenant à l'écart de la première) en faisant des profits NÉGATIFS, de sorte que les profits GLOBAUX sont strictement positifs.** »*

</details>

### 15.4 La lecture finale

> *« **On peut montrer qu'il existe TOUJOURS un équilibre parfait en sous-jeux EN STRATÉGIES COMPORTEMENTALES, mais nous ne poursuivrons pas. Nous nous contentons de noter que LA NON-EXISTENCE dans ce modèle ne surgit QUE quand l'ampleur de l'asymétrie d'information est RELATIVEMENT MINEURE, et en particulier quand la présence de hauts risques est FAIBLE.** »*

⚠️ **C'est un renversement paradoxal** : **plus** l'asymétrie est **petite**, **plus** le modèle est **fragile**.

> *« **Nous considérons ensuite une question que nous avons jusqu'ici ignorée. QUEL EST L'EFFET DE LA DISPONIBILITÉ DE L'ASSURANCE SUR LE COMPORTEMENT DE CONDUITE du consommateur ?** »* — l'annonce du **§8.2** *(fiche 518)*.

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « information observable » + assurance | **§8.1.1, cas symétrique** | $p_i^*=\pi_iL$, assurance **complète**, profits **nuls** |
| « montrer que c'est efficace » | **Exercices 8.1 / 8.6** | Soit le **1ᵉʳ théorème du bien-être**, soit l'argument **direct** |
| « qui achète à ce prix ? » | **La fonction $h(p)$** | Le consommateur achète **ssi $\pi\geq h(p)$** |
| « trouver le prix d'équilibre » | **Condition (8.4)** | **Espérance CONDITIONNELLE**, pas inconditionnelle |
| « un équilibre existe-t-il ? » | **Point fixe monotone** | $g$ **non décroissante** de $[0,\bar\pi L]$ dans lui-même |
| « uniforme sur $[0,1]$ » | **L'exemple du livre** | $g(p)=(1+h(p))L/2$ ; **$p^*=L$ est toujours un équilibre** |
| Le consommateur **propose** | **§8.1.2, SIGNALEMENT** | Déf. 8.1 ; chercher séparateurs et mélangeants |
| « les courbes se coupent-elles ? » | **Croisement unique** | $\mathrm{MRS}_l<\mathrm{MRS}_h$ **partout** |
| « quelle est la pire croyance ? » | **Lemme 8.1** | Celle du **haut risque** ⟹ bornes $\tilde u_l$ et $u_h^c$ |
| « caractériser les séparateurs » | **Théorème 8.1** | Quatre conditions ; **le haut risque obtient TOUJOURS $\psi_h^c$** |
| « caractériser les mélangeants » | **Théorème 8.2** | (8.5) + (8.6), avec $\hat\pi=\alpha\underline\pi+(1-\alpha)\bar\pi$ |
| « ces croyances sont-elles raisonnables ? » | **Critère intuitif** | Chercher $\psi$ que **SEUL un type** préfère |
| La compagnie **offre un menu** | **§8.1.3, CRIBLAGE** | Deux compagnies, perfection en **sous-jeux** |
| « une firme peut-elle dévier profitablement ? » | **ÉCRÉMAGE** | Chercher la région $R$ que **seul le faible risque** préfère |
| $\alpha$ proche de 1 | **Non-existence** | La droite de **mélange** coupe $\bar u_l$ |

**Les trois réflexes de cadrage :**

1. **Toujours dessiner les TROIS droites de profit nul.** Faible risque, haut risque, mélange — dans cet ordre de pente croissante.
2. **La police du haut risque est presque toujours $\psi_h^c=(L,\bar\pi L)$.** C'est la conclusion des théorèmes 8.1, 8.3 et 8.5.
3. **Devant une déviation, demander : QUI la préfère ?** Le critère intuitif et l'écrémage reposent tous deux sur cette question.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Trouver un équilibre sous information asymétrique

1. **Écrire la condition d'achat** : $u(w-p)\geq\pi u(w-L)+(1-\pi)u(w)$.
2. **Isoler $\pi$** ⟹ $h(p)=\dfrac{u(w)-u(w-p)}{u(w)-u(w-L)}$.
3. **Écrire (8.4)** : $p^*=E(\pi\mid\pi\geq h(p^*))L$.
4. **Spécialiser $F$** et calculer l'espérance conditionnelle.
5. **Résoudre le point fixe** — **tester $p=L$ en premier**, car $h(L)=1$.
6. **Interpréter** : qui reste assuré ? à quel coût ?

### Méthode 2 — Caractériser les équilibres séparateurs de signalement

| Contrainte | Sa lecture géométrique |
|---|---|
| $\psi_h=(L,\bar\pi L)$ | Le haut risque est **complètement assuré à prix équitable** |
| $p_l\geq\underline\pi B_l$ | $\psi_l$ **au-dessus** de la droite du faible risque |
| $u_l(\psi_l)\geq\tilde u_l$ | $\psi_l$ **en dessous** de la courbe $\tilde u_l$ |
| $u_h(\psi_h)\geq u_h(\psi_l)$ | $\psi_l$ **au-dessus** de la courbe du haut risque passant par $\psi_h^c$ |

**Puis** : construire $\beta$ *(tout écart ⟹ haut risque)* et $\sigma$ *(accepter ssi profits $\geq0$)*.

### Méthode 3 — Appliquer le critère intuitif

1. **Prendre l'équilibre candidat** et noter $u_l^*$, $u_h^*$.
2. **Chercher une police $\psi$** telle que $u_l(\psi)>u_l^*$ **et** $u_h(\psi)<u_h^*$ — **le croisement unique en fournit toujours une** au-dessus de la droite de mélange.
3. **Vérifier qu'elle est au-dessus de la droite de profit nul du faible risque.**
4. **Le critère force la croyance à 1 sur le faible risque** ⟹ **la compagnie doit l'accepter**.
5. ⟹ **le faible risque dévie profitablement** ⟹ **l'équilibre est éliminé**.

### Méthode 4 — Construire une déviation d'écrémage

1. **Identifier les polices d'équilibre** $\psi_l^*$ et $\psi_h^*$.
2. **Tracer les deux courbes d'indifférence** passant par elles.
3. **Localiser la région $R$** : au-dessus de la courbe du **faible risque**, en dessous de celle du **haut risque**, **au-dessus de la droite de profit nul du faible risque**.
4. **Si $R$ est non vide, l'équilibre tombe** : la compagnie qui ne sert pas le haut risque y offre une police, **n'attire que la crème**, et gagne **strictement positif**.
5. **Le croisement unique garantit que $R$ existe** dès que $\psi_l^*$ n'est pas exactement $\bar\psi_l$.

### Méthode 5 — Diagnostiquer la non-existence

| Pas | Ce qu'on vérifie |
|---|---|
| **1** | Le candidat obligé est $(\bar\psi_l,\psi_h^c)$ *(théorèmes 8.4 et 8.5)* |
| **2** | Tracer la **droite de profit nul de mélange** $p=\hat\pi B$ |
| **3** | **Coupe-t-elle la courbe d'indifférence $\bar u_l$ ?** Si oui, il existe $\psi'$ **préférée par les deux types** et **au-dessus** de la droite de mélange |
| **4** | ⟹ une compagnie l'offre seule, **attire tout le monde**, gagne **strictement positif** ⟹ **contradiction avec le lemme 8.2** |
| **5** | **Cela arrive quand $\alpha$ est PROCHE DE 1** — *« quand l'asymétrie est relativement MINEURE »* |

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire qu'il suffit d'ajouter de l'incertitude aux modèles néoclassiques | *« cela n'aurait de sens **que si** les sources d'incertitude étaient **EXOGÈNES** »* | La qualité est **CHOISIE** par le producteur |
| 2 | Croire que le 1ᵉʳ théorème du bien-être survit | *« **il ne tient plus généralement** »* | C'est **la thèse du chapitre** |
| 3 | Croire que les accidents peuvent être corrélés | *« heurter **un ARBRE**, pas une autre voiture »* | L'**indépendance** est stipulée |
| 4 | Oublier l'indivisibilité de la police | *« des montants **fractionnaires** ne peuvent être ni achetés ni vendus »* | Sinon la demande serait continue |
| 5 | Croire que toutes les polices sont la même marchandise | *« un **parapluie** dans l'état **pluie** est différent d'un parapluie dans l'état **soleil** »* | Ce sont des **biens contingents** |
| 6 | Croire que l'offre est finie hors équilibre | Si $p_i>\pi_iL$, **l'offre est INFINIE** | C'est ce qui force $p_i^*=\pi_iL$ |
| 7 | Dans la preuve d'efficacité, oublier la normalisation | Richesse **certaine** + **aucun transfert entre consommateurs** *(exercice 8.6)* | Sans elles, l'argument ne se ferme pas |
| 8 | Ne sommer que d'un côté | Il faut sommer **(8.2) sur $i$ ET (8.3) sur $j$** | Les deux encadrent **la même double somme** |
| 9 | Croire que les prix restent distincts sous asymétrie | **Un SEUL prix** — sinon la police chère ferait des profits **strictement positifs** | ⟹ offre **infinie** |
| 10 | Poser $p^*=E(\pi)L$ | **Sous-estimation** : c'est l'espérance **CONDITIONNELLE** qui compte | Les profits seraient **négatifs** |
| 11 | Se tromper de sens dans $h(p)$ | On achète **ssi $\pi\geq h(p)$** — les **hauts** risques achètent | Pas l'inverse |
| 12 | Oublier que $h(L)=1$ | Numérateur $=$ dénominateur | C'est ce qui fait de $p^*=L$ un équilibre |
| 13 | Invoquer Brouwer pour l'existence | *« si les consommateurs sont en nombre **FINI**, **$g$ ne peut PAS être continue** »* | C'est un point fixe **MONOTONE** |
| 14 | Croire que l'équilibre est unique | *« aucune raison d'attendre l'unicité »* — au plus **deux** dans le cas uniforme | Multiplicité possible |
| 15 | Croire que les « assurés » de l'équilibre $p^*=L$ gagnent quelque chose | *« leur richesse (et donc leur utilité) **reste la même** »* | Assurance **au sens formel seulement** |
| 16 | Croire qu'augmenter le prix augmente les profits | *« **les autres choses ne restent PAS égales** »* | C'est **l'antisélection** |
| 17 | Mal énoncer le mécanisme | Ceux qui **continuent** d'acheter sont ceux dont **la perte espérée est la plus grande** | ⟹ le pool devient **plus risqué** |
| 18 | Croire que le signal est productif | *« **acheter moins d'assurance ne DIMINUE PAS la probabilité d'accident** »* | Les signaux sont **improductifs** |
| 19 | Ne pas voir ce qui fait marcher le signalement | Les types ont des **TMS différents** entre $B$ et $p$ | C'est le **croisement unique** |
| 20 | Mal orienter le croisement unique | $\mathrm{MRS}_l<\mathrm{MRS}_h$ **partout** | Le faible risque a les courbes **plus plates** |
| 21 | Oublier pourquoi la définition 8.1 remplace la cohérence | Le jeu est **infini** ; en version **finie**, **Bayes ⟺ cohérence** | Justification explicite du livre |
| 22 | Croire que $\sigma$ peut dépendre du type | *« $\sigma$ dépend **seulement de la police**, pas du type »* | La compagnie **ne sait pas** |
| 23 | Dans le lemme 8.1, oublier pourquoi toute police au-dessus de $p=\bar\pi B$ est acceptée | Les profits valent **au moins $p-\bar\pi B>0$**, **quelles que soient les croyances** | La moyenne est **au plus $\bar\pi$** |
| 24 | Croire que le faible risque s'assure toujours | **Non** — cela dépend du signe de $\mathrm{MRS}_l(0,0)-\bar\pi$ | Le haut risque, lui, **s'assure toujours** |
| 25 | Oublier la condition 4 du théorème 8.1 | Sans elle, **le haut risque imiterait** le faible | C'est **le point conceptuel clé** |
| 26 | Ne retenir que deux contraintes sur $\psi_l$ | Il y en a **TROIS** : acceptation, non-imitation par le haut risque, non-déviation du faible risque | Fig. 8.6 |
| 27 | Croire que le signalement garantit l'efficacité | *« la présence d'**une seule pomme pourrie** peut gâter l'issue »* | **Quelle que soit** la probabilité |
| 28 | Croire que $\bar\psi_l$ est arbitraire | C'est **l'intersection** de la droite de profit nul du faible risque avec la courbe du haut risque par $\psi_h^c$ | Le **meilleur** séparateur |
| 29 | Se tromper sur $\hat\pi$ | $\hat\pi=\alpha\underline\pi+(1-\alpha)\bar\pi$ — **$\alpha$ pèse le FAIBLE risque** | Attention au sens |
| 30 | Croire que les mélangeants existent toujours | *« si $\alpha$ est assez petit, **il n'y a AUCUN mélangeant** »* | La région **disparaît** |
| 31 | Croire que le mélange nuit toujours au faible risque | Quand $\alpha$ est **grand**, le mélange bat **tous** les séparateurs | Le coût du mélange **s'évanouit** |
| 32 | Mal comparer les deux coûts | Coût du **mélange** $\to0$ quand $\alpha\to1$ ; coût de la **séparation** **borné loin de zéro** | L'asymétrie décisive |
| 33 | Croire que les croyances extrêmes sont interdites | *« elles sont **parfaitement en ligne** avec la définition »* | Le critère intuitif est un **ajout** |
| 34 | Mal énoncer le critère intuitif | Il faut $u_i(\psi)>u_i^*$ **ET** $u_j(\psi)<u_j^*$ | **Un gagnant ET un perdant** |
| 35 | Croire qu'il ne s'applique qu'aux mélangeants | *« il s'applique à **TOUS** les équilibres séquentiels »* | Le théorème 8.3 le montre |
| 36 | Croire que le criblage se modélise avec une firme | *« il y a des nuances **qui exigent DEUX compagnies** »* | Pour que **l'écrémage** existe |
| 37 | Chercher les équilibres séquentiels du jeu de criblage | L'unique ensemble non singleton **est toujours atteint** ⟹ **la perfection en sous-jeux suffit** | Cf. note 17, fiche 516 |
| 38 | Croire que les deux types achètent à la même firme dans un mélangeant | *« ils n'ont **pas besoin** de l'acheter à la même compagnie »* | Seule **la police** est commune |
| 39 | Mal définir l'écrémage | Attirer **SEULEMENT les BONS risques**, en laissant **les mauvais** au concurrent | La « crème » |
| 40 | Dans le lemme 8.2, oublier l'ordre de choix de $\varepsilon$ et $\beta$ | **FIXER $\beta$ PUIS choisir $\varepsilon$** assez petit | Sinon (P.4) peut échouer |
| 41 | Croire que le théorème 8.4 laisse subsister des mélangeants | *« l'écrémage les élimine **AVEC VENGEANCE** »* — **aucun** ne survit | Deux cas : $B^*>0$ et $B^*=0$ |
| 42 | Croire que le théorème 8.5 prouve l'existence | *« il **n'affirme PAS** qu'un équilibre existe »* | Il dit **si** il existe, **alors** il est unique |
| 43 | Croire que la non-existence vient d'une grande asymétrie | **L'INVERSE** : *« elle ne surgit que quand l'asymétrie est **relativement MINEURE** »* | Quand $\alpha\to1$ |
| 44 | Croire que le seul cas de non-existence est le croisement de $\bar u_l$ | *(Note 10)* Il peut aussi y avoir une **PAIRE** de polices, l'une profitable sur les bons, l'autre déficitaire sur les mauvais | Profits **globaux** positifs |

## 📌 Ultimate Review

**L'annonce du chapitre 8.**

> *« **Nous ne pouvons pas développer une théorie de la valeur adéquate sous information imparfaite sans tenir explicitement compte des OPPORTUNITÉS STRATÉGIQUES.** »*

⚠️ **La thèse** : *« **Sous information asymétrique, LE PREMIER THÉORÈME DU BIEN-ÊTRE NE TIENT PLUS généralement.** »*

**Le cadre** : $m$ consommateurs, richesse $w$, perte $L$, utilité $u$ **VNM strictement concave**, probabilités $\pi_i$ **indépendantes** *(« heurter un ARBRE »)*. Les compagnies vendent l'assurance **complète**, **indivisible**, à **coût nul**. Profit espéré : $p-\pi_iL$.

**§8.1.1 — L'INFORMATION SYMÉTRIQUE.**

Les polices bénéficiant à des consommateurs distincts sont **des marchandises distinctes** *(le parapluie « pluie » vs « soleil »)*.

| $p_i$ | Offre | Demande |
|---|---|---|
| $<\pi_iL$ | **nulle** | **au moins une** |
| $>\pi_iL$ | **INFINIE** | **au plus une** |
| $=\pi_iL$ | **quelconque** | exactement une |

$$\boxed{\;p_i^*=\pi_i L \quad\Longrightarrow\quad \text{profits NULS, assurance COMPLÈTE pour tous}\;}$$

**L'efficacité, par argument direct** : normaliser *(richesse certaine, pas de transfert entre consommateurs)*, écrire $w-\pi_iL-\bar w_i=\sum_j EP_j^i\leq0$ (8.2) et $\sum_i EP_j^i\geq0$ (8.3), **sommer (8.2) sur $i$ ET (8.3) sur $j$** ⟹ **toutes égalités** ⟹ contradiction.

**§8.1.1 — L'INFORMATION ASYMÉTRIQUE.**

Les compagnies ne connaissent que $F$ sur $[\underline\pi,\bar\pi]$.

⚠️ **UN SEUL PRIX** : sinon la police la plus chère ferait des profits **strictement positifs** ⟹ **offre infinie**.

$$\text{On achète ssi}\quad \pi\ \geq\ h(p)\equiv\frac{u(w)-u(w-p)}{u(w)-u(w-L)}$$

**La condition d'équilibre :**

$$\boxed{\;p^*=E\big(\pi\mid\pi\geq h(p^*)\big)\,L\;} \tag{8.4}$$

⚠️ **Pourquoi pas $E(\pi)L$** : *« les compagnies **SOUS-ESTIMERAIENT** la probabilité en utilisant l'espérance **inconditionnelle** »*.

**L'existence** : $g(p)=E(\pi\mid\pi\geq h(p))L$ envoie $[0,\bar\pi L]$ **dans lui-même** et est **NON DÉCROISSANTE** *(car $h$ est croissante)* ⟹ **point fixe**. *« Si les consommateurs sont en nombre **fini**, **$g$ ne peut pas être continue** »* — ce n'est **pas** Brouwer.

**L'EXEMPLE UNIFORME sur $[0,1]$** : $g(p)=\big(1+h(p)\big)L/2$, **strictement croissante et convexe** ⟹ **au plus deux** équilibres.

$$\boxed{\;h(L)=1 \ \Longrightarrow\ p^*=L \text{ est TOUJOURS un équilibre}\;}$$

⚠️ Alors $E(\pi\mid\pi\geq h(L))=1$ : **seuls ceux CERTAINS d'avoir un accident « s'assurent »**, et *« **leur richesse RESTE LA MÊME que s'ils n'avaient pas acheté** »*. **Effondrement total.**

**LE MÉCANISME DE L'ANTISÉLECTION :**

> ⚠️ *« Quand le prix monte, **QUI continue d'acheter ? SEULEMENT ceux pour qui la perte espérée de ne pas le faire est LA PLUS GRANDE — précisément ceux aux probabilités d'accident LES PLUS ÉLEVÉES. Le pool devient PLUS RISQUÉ EN MOYENNE.** »*

**§8.1.2 — LE SIGNALEMENT.**

**Le jeu** : Nature *(le faible risque avec $\alpha$)* → **le consommateur PROPOSE $(B,p)$** → **la compagnie ACCEPTE ou REJETTE**.

**DÉF. 8.1** : rationalité des deux côtés + **Bayes** — *(b)* si $\psi_l\neq\psi_h$ alors $\beta=1$ et $0$ ; *(c)* si $\psi_l=\psi_h$ alors $\beta=\alpha$.

⚠️ **Le signal est IMPRODUCTIF** : *« acheter moins d'assurance **ne diminue pas** la probabilité d'accident »*. Ce qui le rend efficace : **les TMS diffèrent**.

**LES FACTS** : $u_l,u_h$ continues, concaves, **croissantes en $B$, décroissantes en $p$** · $\mathrm{MRS}_l\gtrless\underline\pi$ selon $B\lessgtr L$ · et surtout

$$\boxed{\;\mathrm{MRS}_l(B,p)<\mathrm{MRS}_h(B,p) \quad\forall(B,p) \qquad\textbf{= CROISEMENT UNIQUE}\;}$$

**LEMME 8.1** : $u_l^*\geq\tilde u_l$ et $u_h^*\geq u_h^c$, où $\tilde u_l=\max u_l$ s.c. $p=\bar\pi B\leq w$ et $u_h^c=u_h(L,\bar\pi L)$.

*Preuve : toute police au-dessus de $p=\bar\pi B$ donne des profits $\geq p-\bar\pi B>0$ **quelles que soient les croyances** ⟹ elle est **acceptée** ⟹ chaque type peut se la **garantir**.*

⚠️ **Conséquence asymétrique** : le **haut risque s'assure TOUJOURS** ; le **faible risque, pas nécessairement** *(selon le signe de $\mathrm{MRS}_l(0,0)-\bar\pi$)*.

**THÉORÈME 8.1 — les SÉPARATEURS.** $\psi_l\neq\psi_h=(L,\bar\pi L)$ · $p_l\geq\underline\pi B_l$ · $u_l(\psi_l)\geq\tilde u_l$ · $u_h(\psi_h)\geq u_h(\psi_l)$.

**Les trois contraintes géométriques sur $\psi_l$** : **au-dessus** de sa droite de profit nul *(acceptation)* · **au-dessus** de la courbe du haut risque par $\psi_h^c$ *(non-imitation)* · **en dessous** de la courbe $\tilde u_l$ *(non-déviation)*.

⚠️ **Ils existent toujours**, mais *« la présence d'**une seule pomme pourrie — même avec une probabilité très faible — peut GÂTER l'issue** »*.

**Le meilleur** : $\bar\psi_l$, à l'intersection de la droite de profit nul du faible risque et de la courbe du haut risque.

**THÉORÈME 8.2 — les MÉLANGEANTS.** Avec $\hat\pi=\alpha\underline\pi+(1-\alpha)\bar\pi$ :

$$u_l(\psi')\geq\tilde u_l,\quad u_h(\psi')\geq u_h^c \quad \text{(8.5)} \qquad\qquad p'\geq\hat\pi B' \quad \text{(8.6)}$$

| $\alpha$ | L'effet |
|---|---|
| **baisse** | la région **rétrécit** ⟹ **plus AUCUN mélangeant** |
| **monte** | la région **s'étend** ⟹ **des mélangeants battent TOUS les séparateurs — même pour le FAIBLE risque** |

⚠️ **Pourquoi** : coût du **mélange** $=\hat\pi-\underline\pi\ \to0$ quand $\alpha\to1$ ; coût de la **séparation** **borné loin de zéro**.

**LE CRITÈRE INTUITIF (Cho et Kreps).** Si $u_i(\psi)>u_i^*$ **et** $u_j(\psi)<u_j^*$, alors $\beta(\psi)$ **place probabilité un sur $i$**.

**THÉORÈME 8.3** :

$$\boxed{\;\textbf{UNE SEULE paire survit : } \psi_l=\bar\psi_l \text{ et } \psi_h=\psi_h^c\;}$$

*Preuve : **aucun mélangeant** ne survit *(le croisement unique fournit toujours une $\psi''$ que seul le faible risque préfère, au-dessus de sa droite de profit nul)* ; et parmi les séparateurs, la déviation $\psi_l^\varepsilon=(\bar B_l-\varepsilon,\ \bar p_l+\varepsilon)$ élimine tous ceux donnant moins que $u_l(\bar\psi_l)$.*

**§8.1.3 — LE CRIBLAGE.**

**Le jeu** : **DEUX compagnies** offrent **simultanément des MENUS** → Nature → **le consommateur CHOISIT**.

⚠️ *« Il suffit de considérer les équilibres **PARFAITS EN SOUS-JEUX**, parce que **l'unique ensemble d'information non singleton EST TOUJOURS ATTEINT**. »*

**L'ÉCRÉMAGE** : *« offrir une police qui **n'attirerait QUE les FAIBLES risques** du concurrent — **gagner la CRÈME et lui laisser les très mauvais** »*. **Il exige DEUX firmes.**

**LEMME 8.2** : **profits NULS** dans tout équilibre pur — *« analogue à BERTRAND »*. *(Cas mélangeant : $B$ offre $(B^*+\varepsilon,p^*)$ et rafle tout. Cas séparateur : le **croisement unique** donne (P.1) ou (P.2), puis on **fixe $\beta$ PUIS choisit $\varepsilon$**.)*

**THÉORÈME 8.4** : **AUCUN équilibre mélangeant** — *« l'écrémage les élimine **AVEC VENGEANCE** »*.

**THÉORÈME 8.5** : le **seul** séparateur possible est

$$\psi_l^*=\bar\psi_l \qquad \psi_h^*=\psi_h^c$$

⚠️ **Il coïncide avec le MEILLEUR séparateur du jeu de SIGNALEMENT.**

**LA NON-EXISTENCE** : quand $\alpha$ est **proche de 1**, la **droite de mélange coupe $\bar u_l$** ⟹ il existe $\psi'$ **préférée par les deux** et **au-dessus** de la droite de mélange ⟹ une firme l'offre seule et gagne **positif** ⟹ **contradiction**.

$$\boxed{\;\textbf{« La non-existence ne surgit que quand l'asymétrie est RELATIVEMENT MINEURE. »}\;}$$

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Pourquoi ne peut-on pas simplement ajouter de l'incertitude aux modèles néoclassiques ?**

</summary>

> *« Cette approche **n'aurait de sens QUE SI les sources de l'incertitude des deux côtés du marché étaient EXOGÈNES et donc hors du contrôle de tout agent**. »*

**Or** : *« **la qualité et la durabilité NE SONT PAS exogènes — elles sont CHOISIES par le producteur**. Si les consommateurs ne peuvent pas les observer, **il peut être dans l'intérêt du producteur de ne produire que de la BASSE qualité. SACHANT CELA, les consommateurs l'INFÉRERONT.** »*

⟹ *« **Nous ne pouvons pas développer une théorie de la valeur adéquate sans tenir explicitement compte des OPPORTUNITÉS STRATÉGIQUES.** »*

</details>

<details class="details--riche">
<summary>

**2. Quelle est la thèse du chapitre 8 ?**

</summary>

> *« Les opportunités stratégiques en présence d'information asymétrique **conduisent TYPIQUEMENT à des issues de marché INEFFICACES — une forme d'ÉCHEC DE MARCHÉ**. »*

⚠️ *« **Sous information asymétrique, LE PREMIER THÉORÈME DU BIEN-ÊTRE NE TIENT PLUS généralement.** »*

**Le choix méthodologique** : tout développer *« **dans le contexte d'UN marché spécifique : LE MARCHÉ DE L'ASSURANCE** »*, pour que le lecteur *« gagne une intuition sur la manière dont on modéliserait **d'autres marchés** »*.

</details>

<details class="details--riche">
<summary>

**3. Décrire le cadre du modèle d'assurance.**

</summary>

**Les consommateurs** : identiques **sauf** pour $\pi_i\in[0,1]$, **indépendantes** ; richesse $w$ ; perte $L$ ; $u(\cdot)$ **VNM continue, strictement croissante, strictement concave** ; maximisation de l'**espérance d'utilité**.

⚠️ *(Note 1.)* *« Pensez à un accident comme « **heurter un ARBRE** » plutôt que « **heurter une autre voiture** ». »* — c'est ce qui justifie **l'indépendance**.

**Les compagnies** : **assurance COMPLÈTE seulement**, **police INDIVISIBLE**, **coût NUL**. Profit espéré $=p-\pi_iL$.

</details>

<details class="details--riche">
<summary>

**4. Pourquoi les polices de deux consommateurs sont-elles des marchandises différentes ?**

</summary>

> *« **Un PARAPLUIE dans l'état « PLUIE » est une marchandise DIFFÉRENTE d'un parapluie dans l'état « SOLEIL ». Ces marchandises distinctes pourraient commander des PRIX DISTINCTS.** »*

> *« De même ici, où **un état spécifie QUEL SOUS-ENSEMBLE de consommateurs a des accidents**. L'état où $i$ a un accident **diffère** de celui où $j$ en a un ⟹ **les polices bénéficiant à des consommateurs distincts sont en fait des marchandises distinctes**. »*

C'est une application du **§5.4** *(les biens contingents, fiche 512)*.

</details>

<details class="details--riche">
<summary>

**5. Déterminer l'équilibre concurrentiel sous information symétrique.**

</summary>

| $p_i$ | Offre | Demande |
|---|---|---|
| $<\pi_iL$ | **ZÉRO** *(pertes espérées)* | **au moins une** *(aversion au risque, assurance meilleure qu'équitable)* |
| $>\pi_iL$ | **INFINIE** | **au plus une** *(indivisibilité)* |
| $=\pi_iL$ | **n'importe quel nombre** | **exactement une** |

$$\boxed{\;p_i^*=\pi_iL\;}$$

⟹ *« **toutes les compagnies gagnent zéro, et TOUS les consommateurs sont COMPLÈTEMENT assurés** »*.

</details>

<details class="details--riche">
<summary>

**6. Démontrer directement que l'allocation concurrentielle est efficace.**

</summary>

**Deux normalisations** *(exercice 8.6)* : richesse **certaine** $\bar w_i$, et **aucun transfert entre consommateurs**.

**La domination impose** $\bar w_i\geq w-\pi_iL$. Les profits agrégés sur $i$ valent

$$(1-\pi_i)(w-\bar w_i)+\pi_i(w-L-\bar w_i)=w-\pi_iL-\bar w_i \tag{8.1}$$

qui est **non positif**. Donc

$$w-\pi_iL-\bar w_i=\sum_j EP_j^i\leq0 \quad \text{(8.2)} \qquad\text{et}\qquad \sum_i EP_j^i\geq0 \quad \text{(8.3)}$$

⚠️ *« **Sommer (8.2) sur $i$ et (8.3) sur $j$ montre que CHACUNE doit être une ÉGALITÉ.** »* ⟹ l'allocation dominante **est identique** à la concurrentielle ⟹ **contradiction**. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**7. Pourquoi n'y a-t-il qu'un seul prix sous information asymétrique ?**

</summary>

1. Supposons que $i$ paie **plus** que $j$.
2. Les deux achetant, les profits sur chaque vente sont **non négatifs**.
3. $i$ et $j$ étant **identiques du point de vue des compagnies**, **la police de $i$ gagne strictement positif** ⟹ **chaque compagnie en voudrait un montant INFINI** ⟹ **impossible à l'équilibre**.

$$\boxed{\;\text{UN SEUL prix pour tous.}\;}$$

</details>

<details class="details--riche">
<summary>

**8. Dériver $h(p)$ et l'interpréter.**

</summary>

On achète ssi $u(w-p)\geq\pi u(w-L)+(1-\pi)u(w)$, c'est-à-dire

$$\pi\ \geq\ \frac{u(w)-u(w-p)}{u(w)-u(w-L)}\ \equiv\ h(p)$$

**L'interprétation** *(enrichissement)* : le **numérateur** est la perte d'utilité due à **payer la prime**, le **dénominateur** celle due à **subir le sinistre**. **On s'assure quand sa probabilité d'accident dépasse ce RAPPORT.**

⚠️ **Le fait décisif** : $h(L)=1$.

*(Note 3 : l'indifférent **achète**.)*

</details>

<details class="details--riche">
<summary>

**9. Écrire la condition (8.4) et expliquer pourquoi $E(\pi)L$ est faux.**

</summary>

$$p^*=E\big(\pi\mid\pi\geq h(p^*)\big)L \qquad\text{avec}\qquad E(\pi\mid\pi\geq h)=\frac{\int_h^{\bar\pi}\pi\,dF(\pi)}{1-F(h)}$$

> ⚠️ *« Ce prix pourrait être **si ÉLEVÉ que seuls les consommateurs à probabilité RELATIVEMENT ÉLEVÉE choisiraient de s'assurer**. Les compagnies **SOUS-ESTIMERAIENT** en utilisant l'espérance **INCONDITIONNELLE**. **En sous-estimant ainsi, les profits seraient STRICTEMENT NÉGATIFS en moyenne.** »*

</details>

<details class="details--riche">
<summary>

**10. Démontrer l'existence d'un équilibre.**

</summary>

Poser $g(p)=E(\pi\mid\pi\geq h(p))L$ sur $[0,\bar\pi L]$.

| Pas | Le fait |
|---|---|
| **1** | L'espérance est **bien définie** car $h(p)\leq\bar\pi$ sur cet intervalle |
| **2** | $E(\pi\mid\cdot)\in[0,\bar\pi]$ ⟹ **$g$ envoie $[0,\bar\pi L]$ DANS LUI-MÊME** |
| **3** | **$h$ strictement croissante ⟹ $g$ NON DÉCROISSANTE** |
| **4** | *« **même si $g$ n'a PAS besoin d'être continue, elle doit avoir un POINT FIXE** »* |

*(Note 4 : *« **si les consommateurs sont en nombre FINI, $g$ NE PEUT PAS être continue** »* — ce n'est donc **pas** Brouwer.)*

</details>

<details class="details--riche">
<summary>

**11. Traiter l'exemple uniforme sur $[0,1]$.**

</summary>

$$g(p)=\frac{\big(1+h(p)\big)L}{2}$$

*« **strictement croissante et strictement CONVEXE** parce que $h$ l'est »* ⟹ **au plus DEUX équilibres**.

$$\boxed{\;h(L)=1 \ \Longrightarrow\ p^*=L \text{ est TOUJOURS un équilibre — et peut être le SEUL}\;}$$

Alors (8.4) donne $E(\pi\mid\pi\geq h(L))=1$ : *« **TOUS sont NON assurés SAUF ceux CERTAINS d'avoir un accident. MAIS MÊME CEUX-CI ne le sont qu'au sens FORMEL — ils paient le montant INTÉGRAL $L$. Leur richesse (et leur utilité) RESTE LA MÊME.** »*

</details>

<details class="details--riche">
<summary>

**12. Énoncer le mécanisme de l'antisélection.**

</summary>

> *« Toutes choses égales, vous pourriez penser qu'**augmenter le prix augmente les profits. MAIS SUR LES MARCHÉS D'ASSURANCE, LES AUTRES CHOSES NE RESTENT PAS ÉGALES.** »*

| Pas | Le raisonnement |
|---|---|
| **1** | Le prix monte ⟹ l'utilité de **s'assurer** baisse ; celle de **ne pas s'assurer** est **inchangée** |
| **2** | Certains **cessent** d'acheter |
| **3** | *« **QUI continue ? SEULEMENT ceux pour qui la PERTE ESPÉRÉE de ne pas le faire est LA PLUS GRANDE — précisément ceux aux PROBABILITÉS LES PLUS ÉLEVÉES.** »* |
| **4** | *« **Le pool devient PLUS RISQUÉ EN MOYENNE.** »* |

</details>

<details class="details--riche">
<summary>

**13. Décrire le jeu de signalement.**

</summary>

**Nature** choisit le type *(faible risque avec $\alpha$)* → **le consommateur propose $(B,p)$** — un **bénéfice $B\geq0$** payé en cas d'accident, une **prime $0\leq p\leq w$** payée **dans tous les cas** → **la compagnie**, **ne sachant pas le type mais voyant la police**, **ACCEPTE ou REJETTE**.

*(Note 5 : « police » désigne désormais **le COUPLE $(B,p)$** ; la borne $p\leq w$ **évite la faillite**.)*

⚠️ **La stratégie de la compagnie est une FONCTION $\sigma(B,p)\in\{A,R\}$** — elle **ne dépend que de la police**.

</details>

<details class="details--riche">
<summary>

**14. Pourquoi la définition 8.1 remplace-t-elle la cohérence ?**

</summary>

> *« **La définition d'un équilibre séquentiel exige que le jeu soit FINI, mais celui-ci ne l'est PAS** — le consommateur peut choisir dans un **continuum**. »*

> *« Or elle l'exige **seulement parce que la COHÉRENCE n'est pas facilement définie pour les jeux infinis**. Cependant, **quand l'ensemble de choix est restreint à un ensemble FINI, TOUTE ÉVALUATION SATISFAISANT BAYES SATISFAIT AUSSI LA COHÉRENCE.** »*

⟹ on **définit** l'équilibre par **rationalité séquentielle + Bayes seuls**.

</details>

<details class="details--riche">
<summary>

**15. Énoncer les trois conditions de la définition 8.1.**

</summary>

**1.** Étant donné $\sigma(\cdot)$, **$\psi_l$ maximise** l'utilité du faible risque et **$\psi_h$** celle du haut risque.

**2. Bayes** : $\beta(\psi)\in[0,1]$ ; **si $\psi_l\neq\psi_h$** alors $\beta(\psi_l)=1$, $\beta(\psi_h)=0$ ; **si $\psi_l=\psi_h$** alors $\beta=\alpha$.

**3.** Pour **toute** police, $\sigma(\psi)$ **maximise les profits espérés étant données les croyances**.

*« (1) et (3) donnent la **rationalité séquentielle**, (2) donne **Bayes**. »*

</details>

<details class="details--riche">
<summary>

**16. Le signal est-il productif ? Qu'est-ce qui le rend efficace ?**

</summary>

> *« Il n'y a **AUCUNE connexion directe** entre le type et la police. **L'ACTE D'ACHETER MOINS D'ASSURANCE NE DIMINUE PAS la probabilité d'accident. LES SIGNAUX SONT IMPRODUCTIFS.** »*

**Ce qui le sauve** : *« le faible risque peut signaler **en démontrant sa DISPOSITION À ACCEPTER UNE BAISSE DU BÉNÉFICE POUR UNE RÉDUCTION DE PRIME PLUS PETITE QUE NE L'ACCEPTERAIT LE HAUT RISQUE** »*.

⚠️ *« Pour que cela soit efficace, **les types doivent afficher des TMS DIFFÉRENTS** entre $B$ et $p$. »*

</details>

<details class="details--riche">
<summary>

**17. Énoncer les FACTS et la propriété de croisement unique.**

</summary>

$$u_l(B,p)=\underline\pi\,u(w-L+B-p)+(1-\underline\pi)\,u(w-p) \qquad u_h \text{ idem avec } \bar\pi$$

**(a)** continues, différentiables, **strictement concaves**, **croissantes en $B$**, **décroissantes en $p$**. **(b)** $\mathrm{MRS}_l\gtrless\underline\pi$ selon $B\lessgtr L$ ; $\mathrm{MRS}_h\gtrless\bar\pi$ de même. **(c)** $\mathrm{MRS}_l(B,p)<\mathrm{MRS}_h(B,p)$ **pour tout $(B,p)$**.

> *« Le dernier est **la PROPRIÉTÉ DE CROISEMENT UNIQUE** : **les courbes d'indifférence des deux types se coupent AU PLUS UNE FOIS.** »*

</details>

<details class="details--riche">
<summary>

**18. Décrire les trois droites de profit nul et les polices concurrentielles.**

</summary>

| Droite | Équation |
|---|---|
| **Haut risque** | $p=\bar\pi B$ |
| **Mélange** | $p=\hat\pi B$, $\hat\pi=\alpha\underline\pi+(1-\alpha)\bar\pi$ |
| **Faible risque** | $p=\underline\pi B$ |

**Fig. 8.3** : $\psi^1$ gagne sur **les deux** · $\psi^2$ gagne sur le **faible** et perd sur le **haut** · $\psi^3$ perd sur **les deux**.

**Fig. 8.4 — l'issue sous information symétrique** :

$$\psi_l^c=(L,\underline\pi L) \qquad \psi_h^c=(L,\bar\pi L)$$

</details>

<details class="details--riche">
<summary>

**19. Démontrer le lemme 8.1.**

</summary>

**Pas 1** — pour $(B,p)$ avec $p>\bar\pi B$, les profits d'accepter valent

$$p-\big\{\beta\underline\pi+(1-\beta)\bar\pi\big\}B\ \geq\ p-\bar\pi B\ >\ 0$$

⚠️ **L'inégalité tient QUELLES QUE SOIENT les croyances** — la moyenne est **au plus $\bar\pi$**. ⟹ **toutes ces polices sont ACCEPTÉES**.

**Pas 2** — chaque type peut donc **se garantir** $u_l(B,p)$ ou $u_h(B,p)$ ⟹ $u_l^*\geq u_l(B,p)$, $u_h^*\geq u_h(B,p)$.

**Pas 3** — **par continuité**, valable aussi pour $p=\bar\pi B$.

**Pas 4** — l'utilité étant **décroissante en $p$**, cela donne $u_l^*\geq\tilde u_l$ ; et *« parmi les polices **pas meilleures qu'équitables**, **la COMPLÈTE maximise uniquement** l'utilité du haut risque »* ⟹ $u_h^*\geq u_h^c$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**20. Quelle conséquence asymétrique le lemme 8.1 a-t-il ?**

</summary>

**Le HAUT risque DOIT s'assurer** : *« sans assurance son utilité serait $u_h(0,0)$ qui, **par stricte aversion au risque**, est strictement inférieure à $u_h^c$ »*.

⚠️ **Le FAIBLE risque, PAS nécessairement** :

| Si | Alors |
|---|---|
| $\mathrm{MRS}_l(0,0)>\bar\pi$ | $u_l(0,0)<\tilde u_l$ ⟹ il **doit** s'assurer |
| $\mathrm{MRS}_l(0,0)<\bar\pi$ | $u_l(0,0)\geq\tilde u_l$ ⟹ *« il **peut choisir de NE PAS s'assurer** (en faisant une proposition **rejetée**) »* |

</details>

<details class="details--riche">
<summary>

**21. Énoncer la définition 8.2 et le point conceptuel clé.**

</summary>

**SÉPARATEUR** si $\psi_l\neq\psi_h$ ; **MÉLANGEANT** sinon. *« Avec **deux types**, un équilibre est **soit l'un soit l'autre**. »*

> ⚠️ *« **LE POINT CONCEPTUEL CLÉ est que, dans un séparateur, IL NE DOIT PAS ÊTRE DANS L'INTÉRÊT de l'un ou l'autre type d'IMITER l'autre.** »*

*(Note 7 : il y a **d'autres** manières de feindre — par exemple **une proposition hors équilibre** qui induirait la croyance « haut risque ».)*

</details>

<details class="details--riche">
<summary>

**22. Énoncer le théorème 8.1.**

</summary>

**1.** $\psi_l\neq\psi_h=(L,\bar\pi L)$ · **2.** $p_l\geq\underline\pi B_l$ · **3.** $u_l(\psi_l)\geq\tilde u_l$ · **4.** $u_h(\psi_h)\geq u_h(\psi_l)$.

⚠️ **La condition 1 est remarquable** : **le haut risque obtient EXACTEMENT sa police concurrentielle**, quel que soit l'équilibre.

</details>

<details class="details--riche">
<summary>

**23. Construire $\sigma$ et $\beta$ pour le sens ⟸ du théorème 8.1.**

</summary>

$$\beta(B,p)=\begin{cases}1,&(B,p)=\psi_l\\0,&(B,p)\neq\psi_l\end{cases} \qquad \sigma(B,p)=\begin{cases}A,&(B,p)=\psi_l \text{ ou } p\geq\bar\pi B\\R,&\text{sinon}\end{cases}$$

⚠️ *« **TOUTE police autre que $\psi_l$ induit la croyance « haut risque » avec probabilité UN.** »*

| La proposition | Profits | Acceptée ? |
|---|---|---|
| $\psi_l$ | $p_l-\underline\pi B_l$ | **oui, par (2)** |
| $\psi_h$ | $\bar\pi L-\bar\pi L=0$ | **oui** |
| autre | $p-\bar\pi B$ | **ssi $p\geq\bar\pi B$** |

</details>

<details class="details--riche">
<summary>

**24. Quelles sont les trois contraintes géométriques sur $\psi_l$ ?**

</summary>

| Contrainte | Sa raison |
|---|---|
| **Au-dessus de la droite de profit nul du FAIBLE risque** | pour **induire l'ACCEPTATION** |
| **Au-dessus de la courbe du HAUT risque par $\psi_h^c$** | pour qu'il **n'ait aucune incitation à IMITER** |
| **En dessous de la courbe $\tilde u_l$** | pour que **le faible risque n'ait aucune incitation à DÉVIER** et se faire prendre pour un haut risque |

*(Figure 8.6 ; la région ombrée est **toujours non vide**, ce qui utilise $\mathrm{MRS}_l(0,0)>\underline\pi$ ⟹ **un séparateur existe toujours**.)*

</details>

<details class="details--riche">
<summary>

**25. Le signalement garantit-il l'efficacité ?**

</summary>

**Il garantit la SÉPARATION** : *« permettre aux propositions d'agir comme signaux est **TOUJOURS EFFICACE au sens où cela rend possible au faible risque de se DISTINGUER** »*.

⚠️ **Mais pas l'efficacité** : quand $\mathrm{MRS}_l(0,0)\leq\bar\pi$, *« il y a un séparateur où **le faible risque reçoit la police NULLE** »* — et

> *« **ceci reste une issue d'équilibre QUELLE QUE SOIT la probabilité que le consommateur soit un haut risque ! La présence d'UNE SEULE POMME POURRIE — même avec probabilité très faible — peut GÂTER l'issue.** »*

</details>

<details class="details--riche">
<summary>

**26. Décrire $\bar\psi_l$ et pourquoi elle domine.**

</summary>

$\bar\psi_l$ = **l'intersection** de la droite de profit nul du faible risque avec **la courbe d'indifférence du haut risque passant par $\psi_h^c$**.

> *« C'est celui **LE MEILLEUR pour le faible risque et LE PIRE pour la compagnie**. Parce que **le haut risque obtient $\psi_h^c$ dans CHAQUE séparateur**, l'issue $(\bar\psi_l,\psi_h^c)$ est **PARETO-EFFICACE PARMI LES SÉPARATEURS** et donne **des profits NULS**. »*

**L'argument de domination** *(fig. 8.7)* : $\psi_l'$ et $\psi_l''$ sont sur **la même iso-profit** ⟹ compagnie **indifférente** ; le haut risque **indifférent** ; **mais le faible risque préfère STRICTEMENT $\psi_l'$, par le FAIT (b)**.

</details>

<details class="details--riche">
<summary>

**27. Énoncer le théorème 8.2.**

</summary>

Avec $\hat\pi=\alpha\underline\pi+(1-\alpha)\bar\pi$, la police $\psi'=(B',p')$ est une issue mélangeante **ssi**

$$u_l(\psi')\geq\tilde u_l \quad\text{et}\quad u_h(\psi')\geq u_h^c \quad \text{(8.5)} \qquad\qquad p'\geq\hat\pi B' \quad \text{(8.6)}$$

*(8.5 vient du **lemme 8.1** ; 8.6 de ce que la police **doit être acceptée**.)*

**Les croyances** : $\beta(\psi')=\alpha$ **par Bayes** *(les deux types la proposent)*, et **$0$ ailleurs**.

</details>

<details class="details--riche">
<summary>

**28. Comment $\alpha$ affecte-t-il l'ensemble des mélangeants ?**

</summary>

| $\alpha$ | L'effet géométrique | La conséquence |
|---|---|---|
| **BAISSE** | *« la région **RÉTRÉCIT** parce que la **pente de la droite de mélange AUGMENTE** »* | *« **éventuellement elle DISPARAÎT** »* — **plus aucun mélangeant** |
| **AUGMENTE** | *« la région **S'ÉTEND** »* | **des mélangeants battent TOUS les séparateurs — même pour le FAIBLE risque** *(fig. 8.10)* |

</details>

<details class="details--riche">
<summary>

**29. Pourquoi le mélange peut-il battre la séparation pour le FAIBLE risque ?**

</summary>

> *« **Il lui est COÛTEUX DE SE SÉPARER.** Une séparation efficace exige qu'il **choisisse une police que le haut risque ne préfère pas à $\psi_h^c$. Ceci RESTREINT son choix.** »*

> *« Quand $\alpha$ est élevé et l'équilibre mélangeant, **c'est un peu comme si le haut risque N'ÉTAIT PAS LÀ. Le coût du mélange est simplement un coût marginal LÉGÈREMENT GONFLÉ ($\hat\pi$ au lieu de $\underline\pi$).** »*

$$\boxed{\;\text{coût du MÉLANGE}\ \xrightarrow{\ \alpha\to1\ }0 \qquad\text{coût de la SÉPARATION : } \textbf{BORNÉ LOIN DE ZÉRO}\;}$$

</details>

<details class="details--riche">
<summary>

**30. Quel problème le critère intuitif corrige-t-il ?**

</summary>

> *« Dans les preuves des théorèmes 8.1 et 8.2, **les croyances assignées étaient plutôt EXTRÊMES : TOUTE déviation était interprétée comme venant du HAUT risque**. »*

⚠️ *« **Soyons clairs : ces croyances sont PARFAITEMENT EN LIGNE avec notre définition. Ce dont nous discutons est de savoir si nous souhaitons placer des restrictions SUPPLÉMENTAIRES.** »*

**L'argument** *(fig. 8.11)* : il existe $\psi''$ avec $u_l(\psi'')>u_l^*$ et $u_h(\psi'')<u_h^*$ ⟹ *« **SEUL le faible risque a un intérêt à faire cette proposition. Il semble DÉRAISONNABLE de croire qu'on fait face au haut risque.** »*

</details>

<details class="details--riche">
<summary>

**31. Énoncer la définition 8.3.**

</summary>

Un équilibre séquentiel **satisfait le critère intuitif** si, pour toute police $\psi\neq\psi_l,\psi_h$ :

$$\text{si } u_i(\psi)>u_i^* \ \textbf{ et } \ u_j(\psi)<u_j^*, \quad\text{alors } \beta(\psi) \text{ place probabilité UN sur } i$$

⚠️ **Il faut UN GAGNANT ET UN PERDANT** — l'une des conditions seule ne suffit pas.

⚠️ *« Il s'applique à **TOUS** les équilibres séquentiels, **pas seulement aux mélangeants**. »*

*(Cho et Kreps.)*

</details>

<details class="details--riche">
<summary>

**32. Démontrer qu'aucun mélangeant ne survit au critère intuitif.**

</summary>

1. Si $\psi'$ est mélangeante, **le CROISEMENT UNIQUE fournit une $\psi''$ préférée SEULEMENT par le faible risque** — et *« qui, en outre, **se trouve strictement AU-DESSUS de la droite de profit nul du faible risque** »*.

*(Une telle $\psi''$ **existe toujours** parce que $\psi'$ est **sur ou au-dessus de la droite de mélange** et que $\mathrm{MRS}_l(\psi')<\mathrm{MRS}_h(\psi')$.)*

2. **Le critère intuitif** force la croyance à **1 sur le faible risque**.
3. $\psi''$ étant **strictement au-dessus** de sa droite de profit nul, **la rationalité séquentielle force l'ACCEPTATION**.
4. ⟹ **le faible risque dévie profitablement** — contradiction. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**33. Démontrer que seul $(\bar\psi_l,\psi_h^c)$ survit parmi les séparateurs.**

</summary>

**Par l'absurde**, $u_l^*<u_l(\bar\psi_l)$. Poser, avec $\bar\psi_l=(\bar B_l,\bar p_l)$ :

$$\psi_l^\varepsilon\equiv\big(\bar B_l-\varepsilon,\ \bar p_l+\varepsilon\big)$$

⚠️ **Moins de bénéfice ET plus de prime** — une police que **seul un très bon risque accepterait**. Par **continuité**, pour $\varepsilon$ petit :

$$u_h^*\geq u_h^c>u_h(\psi_l^\varepsilon), \qquad u_l(\psi_l^\varepsilon)>u_l^*, \qquad \bar p_l+\varepsilon>\underline\pi(\bar B_l-\varepsilon)$$

Les **deux premières** ⟹ **le critère intuitif** donne la croyance « faible risque » ; la **troisième** ⟹ **profits positifs** ⟹ **acceptation**. ⟹ contradiction.

**Donc** $u_l^*\geq u_l(\bar\psi_l)$ et $u_h^*\geq u_h^c$ ⟹ **les deux propositions sont acceptées** ⟹ le **théorème 8.1** s'applique ⟹ $\psi_l=\bar\psi_l$, $\psi_h=\psi_h^c$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**34. Comment construit-on l'équilibre qui satisfait le critère intuitif ?**

</summary>

$$\mathcal{A}=\big\{\psi\ \big|\ u_l(\psi)>u_l(\bar\psi_l) \ \text{ et } \ u_h(\psi)<u_h(\psi_h^c)\big\}$$

— **l'ensemble des polices que SEUL le faible risque préfère à son équilibre**.

$$\beta(B,p)=\begin{cases}1,&(B,p)\in\mathcal{A}\cup\{\psi_l\}\\0,&\text{sinon}\end{cases} \qquad \sigma(B,p)=\begin{cases}A,&(B,p)=\psi_l \text{ ou } p\geq\bar\pi B\\R,&\text{sinon}\end{cases}$$

> *« **Par construction, les croyances satisfont le critère intuitif**, et on peut **virtuellement MIMER** la preuve du théorème 8.1. »*

</details>

<details class="details--riche">
<summary>

**35. Qu'est-ce que le criblage, et pourquoi deux compagnies ?**

</summary>

> *« **Les compagnies offrent typiquement un MENU de polices parmi lesquelles le consommateur fait un choix. En offrant un menu, elles CRIBLENT les consommateurs en TAILLANT les polices de sorte que les hauts risques soient induits à choisir l'une, et les faibles risques une autre.** »*

⚠️ *« Il y a des **nuances du criblage QUI EXIGENT DEUX compagnies** pour se révéler »* — c'est **l'ÉCRÉMAGE**, qui *« exige au moins deux firmes pour devenir une préoccupation stratégique »*.

*(Note 9 : ajouter une seconde firme au modèle de signalement **n'aurait rien changé**.)*

</details>

<details class="details--riche">
<summary>

**36. Pourquoi la perfection en sous-jeux suffit-elle au jeu de criblage ?**

</summary>

> *« **Le SEUL ensemble d'information non singleton appartient à la compagnie B. MAIS, QUELLES QUE SOIENT les stratégies employées, CET ENSEMBLE DOIT ÊTRE ATTEINT. Par conséquent, IL SUFFIT de considérer les équilibres PARFAITS EN SOUS-JEUX.** »*

*(Et il est demandé en exercice de montrer que dans une version **finie**, les issues séquentielles et parfaites **coïncident**.)*

⚠️ **C'est exactement la note 17 de la fiche 516** : la perfection ne se distingue de Nash que sur les sous-jeux **non atteints**.

</details>

<details class="details--riche">
<summary>

**37. Définir l'écrémage.**

</summary>

> *« **L'écrémage survient quand une compagnie prend AVANTAGE STRATÉGIQUE de l'ensemble des polices offertes par l'autre EN OFFRANT UNE POLICE QUI N'ATTIRERAIT QUE LES FAIBLES RISQUES. La compagnie « RAIDEUSE » gagne donc SEULEMENT les très bons clients (LA CRÈME) tandis qu'elle laisse à son concurrent LES TRÈS MAUVAIS.** »*

> *« **À l'équilibre, les deux doivent garantir que l'autre ne peut PAS écrémer.** **Au moins DEUX firmes sont requises.** »*

</details>

<details class="details--riche">
<summary>

**38. Démontrer le lemme 8.2.**

</summary>

**Profits non négatifs** : chacune peut *« garantir zéro **en offrant des polices NULLES** »*. Il reste à exclure le strictement positif.

**Par l'absurde**, $A$ gagne positif et $B$ **pas plus**. Les profits **totaux** sont $\Pi>0$, qui **excède strictement ceux de $B$**.

**CAS 1 (mélangeant)** : $B$ offre $(B^*+\varepsilon,p^*)$ ⟹ **elle rafle TOUT le marché** et gagne **presque $\Pi$**.

**CAS 2 (séparateur)** : le **croisement unique** donne $u_l(\psi_l^*)>u_l(\psi_h^*)$ **ou** $u_h(\psi_h^*)>u_h(\psi_l^*)$. Sous la première, $B$ offre $\psi_l^\varepsilon=(B_l^*+\varepsilon,p_l^*)$ et $\psi_h^\beta=(B_h^*+\beta,p_h^*)$ **en FIXANT $\beta$ PUIS en choisissant $\varepsilon$ petit** ⟹ chaque type choisit **la sienne** ⟹ profits presque $\Pi$. **Contradiction.** $\blacksquare$

</details>

<details class="details--riche">
<summary>

**39. Démontrer le théorème 8.4 (pas de mélangeant).**

</summary>

Par le **lemme 8.2** : $\alpha(p^*-\underline\pi B^*)+(1-\alpha)(p^*-\bar\pi B^*)=0$.

**CAS $B^*>0$** ⟹ **$p^*-\underline\pi B^*>0$** *(le premier terme est le plus grand des deux et leur moyenne est nulle)* ⟹ $\psi^*$ **n'est sur aucun axe**.

> *« **Par le CROISEMENT UNIQUE, il y a une région $R$ dont $\psi^*$ est la LIMITE.** Si $B$ offre **seulement** une $\psi'\in R$ très proche, **le haut risque reste chez $A$ et le FAIBLE risque vient chez $B$ — qui gagne STRICTEMENT POSITIF.** »*

**CAS $B^*=0$** ⟹ $p^*=0$, **police nulle** ⟹ *« l'une ou l'autre peut offrir $(L,\bar\pi L+\varepsilon)$ : elle gagne positif **sur les deux types** et **le haut risque la choisira certainement** »*. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**40. Énoncer le théorème 8.5 et ses quatre revendications.**

</summary>

$$\psi_l^*=\bar\psi_l \qquad \psi_h^*=\psi_h^c$$

| Claim | Le contenu |
|---|---|
| **1** | Le haut risque obtient **au moins $u_h^c$** — sinon une firme offrirait $(L,\bar\pi L+\varepsilon)$, **profitable sur les DEUX** |
| **2** | $\psi_l^*$ est **SUR** la droite de profit nul du faible risque — sinon **la région $R$ d'écrémage existe** |
| **3** | $\psi_h^*=\psi_h^c$ — **sur** la droite du haut risque *(Claim 2 + lemme 8.2)* **et** $u_h\geq u_h^c$ *(Claim 1)* |
| **4** | $\psi_l^*=\bar\psi_l$ — plus haut, **le haut risque imiterait** ; plus bas, **une nouvelle région $R$ apparaît** |

⚠️ *« **Il coïncide avec le MEILLEUR séparateur pour les consommateurs du jeu de SIGNALEMENT.** »*

</details>

<details class="details--riche">
<summary>

**41. Quand aucun équilibre en stratégies pures n'existe-t-il ?**

</summary>

> *« Le théorème 8.5 **n'affirme PAS qu'un équilibre EXISTE**. Il dit **seulement que S'IL en existe un, il doit être séparateur et les polices sont UNIQUES**. »*

> ⚠️ *« **L'écrémage est PUISSANT pour éliminer les équilibres. MAIS IL PEUT ÊTRE TROP PUISSANT.** »*

**L'argument** *(fig. 8.21)* : quand $\alpha$ est proche de 1, **la droite de mélange coupe $\bar u_l$** ⟹ il existe $\psi'$ **préférée strictement par LES DEUX** et **au-dessus de la droite de mélange** ⟹ une firme l'offre **seule**, **attire tout le monde**, gagne **positif** ⟹ **contredit le lemme 8.2**.

*(Note 10 : **même sans ce croisement**, il peut y avoir une **PAIRE** de polices — l'une profitable sur les bons, l'autre déficitaire sur les mauvais — dont les profits **globaux** sont positifs.)*

</details>

<details class="details--riche">
<summary>

**42. Quelle est la lecture paradoxale de la non-existence ?**

</summary>

> *« On peut montrer qu'**il existe toujours un équilibre en stratégies COMPORTEMENTALES**, mais nous ne poursuivrons pas. **Nous nous contentons de noter que LA NON-EXISTENCE ne surgit QUE quand l'ampleur de l'asymétrie d'information est RELATIVEMENT MINEURE, et en particulier quand la présence de HAUTS RISQUES est FAIBLE.** »*

$$\boxed{\;\textbf{PLUS l'asymétrie est PETITE, PLUS le modèle est FRAGILE.}\;}$$

**Et l'annonce du §8.2** : *« **Quel est l'effet de la disponibilité de l'assurance sur le COMPORTEMENT DE CONDUITE ?** »*

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Pourquoi l'extension naïve échoue ? | La **qualité** n'est pas exogène — elle est **CHOISIE** |
| La thèse du chapitre 8 ? | **Le 1ᵉʳ théorème du bien-être ne tient plus** |
| Le marché choisi ? | **L'ASSURANCE automobile** |
| Ce qui distingue les consommateurs ? | **Uniquement** $\pi_i$ |
| Pourquoi « heurter un arbre » ? | Pour justifier l'**INDÉPENDANCE** des accidents |
| Les deux simplifications sur les polices ? | **Indivisibles** et de **coût NUL** |
| Le profit espéré ? | $p-\pi_iL$ |
| Pourquoi les polices sont des biens distincts ? | L'analogie du **parapluie « pluie » / « soleil »** |
| L'offre si $p_i>\pi_iL$ ? | **INFINIE** |
| La demande si $p_i>\pi_iL$ ? | **Au plus UNE** *(indivisibilité)* |
| L'équilibre symétrique ? | $p_i^*=\pi_iL$ — **profits nuls, assurance complète** |
| Les deux normalisations de la preuve d'efficacité ? | Richesse **certaine** · **aucun transfert entre consommateurs** |
| L'astuce finale de cette preuve ? | **Sommer (8.2) sur $i$ ET (8.3) sur $j$** |
| Ce que les compagnies savent sous asymétrie ? | **Seulement la distribution $F$** |
| Pourquoi un seul prix ? | Un prix plus élevé ⟹ profits **positifs** ⟹ **offre infinie** |
| La condition d'achat ? | $u(w-p)\geq\pi u(w-L)+(1-\pi)u(w)$ |
| La fonction $h(p)$ ? | $\dfrac{u(w)-u(w-p)}{u(w)-u(w-L)}$ |
| On achète ssi ? | $\pi\geq h(p)$ — **les HAUTS risques achètent** |
| La valeur de $h(L)$ ? | **$1$** |
| Pourquoi $E(\pi)L$ est faux ? | **Sous-estimation** — il faut l'espérance **CONDITIONNELLE** |
| La condition (8.4) ? | $p^*=E(\pi\mid\pi\geq h(p^*))L$ |
| La fonction d'existence ? | $g(p)=E(\pi\mid\pi\geq h(p))L$ sur $[0,\bar\pi L]$ |
| Ses deux propriétés ? | Elle **envoie l'intervalle dans lui-même** et est **NON DÉCROISSANTE** |
| Est-ce Brouwer ? | **NON** — avec un nombre **fini** de consommateurs, **$g$ n'est pas continue** |
| $g$ dans le cas uniforme sur $[0,1]$ ? | $(1+h(p))L/2$ |
| Combien d'équilibres au plus ? | **Deux** *(car $g$ est strictement convexe)* |
| L'équilibre toujours présent ? | **$p^*=L$** |
| Qui s'assure alors ? | **Seulement ceux CERTAINS d'avoir un accident** |
| Y gagnent-ils ? | **NON** — *« leur richesse reste la même »* |
| Le mécanisme de l'antisélection ? | Quand le prix monte, **seuls les plus risqués continuent** |
| Ce qui ne reste pas égal ? | **La COMPOSITION du pool** |
| Le jeu de signalement, l'ordre ? | **Nature → le consommateur PROPOSE → la compagnie ACCEPTE/REJETTE** |
| Ce qu'est une police ici ? | **Le couple $(B,p)$** |
| Pourquoi $p\leq w$ ? | Pour éviter la **FAILLITE** |
| La stratégie de la compagnie ? | Une **FONCTION** $\sigma(B,p)\in\{A,R\}$ |
| Ce que $\beta(B,p)$ mesure ? | La probabilité que ce soit le **FAIBLE** risque |
| Pourquoi la déf. 8.1 remplace la cohérence ? | Le jeu est **INFINI** ; en fini, **Bayes ⟺ cohérence** |
| Déf. 8.1, condition 2(b) ? | $\psi_l\neq\psi_h$ ⟹ $\beta=1$ et $0$ |
| Condition 2(c) ? | $\psi_l=\psi_h$ ⟹ $\beta=\alpha$ |
| Le signal est-il productif ? | **NON** — *« acheter moins ne diminue pas la probabilité »* |
| Ce qui le rend efficace malgré tout ? | Les **TMS DIFFÈRENT** entre les types |
| Le FAIT (c) ? | $\mathrm{MRS}_l<\mathrm{MRS}_h$ **partout** |
| Son nom ? | La propriété de **CROISEMENT UNIQUE** |
| Ce qu'elle implique ? | Les indifférences **se coupent au plus UNE FOIS** |
| Le FAIT (b) ? | $\mathrm{MRS}_l\gtrless\underline\pi$ selon $B\lessgtr L$ |
| Les trois droites de profit nul ? | $p=\underline\pi B$ · $p=\hat\pi B$ · $p=\bar\pi B$ |
| $\psi_l^c$ et $\psi_h^c$ ? | $(L,\underline\pi L)$ et $(L,\bar\pi L)$ |
| Lemme 8.1 ? | $u_l^*\geq\tilde u_l$ et $u_h^*\geq u_h^c$ |
| Son pas clé ? | Toute police **au-dessus de $p=\bar\pi B$** est **ACCEPTÉE**, quelles que soient les croyances |
| Pourquoi ? | La moyenne $\beta\underline\pi+(1-\beta)\bar\pi$ est **au plus $\bar\pi$** |
| Le haut risque s'assure-t-il toujours ? | **OUI** |
| Le faible risque ? | **PAS nécessairement** — cela dépend de $\mathrm{MRS}_l(0,0)$ vs $\bar\pi$ |
| Définition 8.2 ? | **Séparateur** si $\psi_l\neq\psi_h$, **mélangeant** sinon |
| Le point conceptuel clé d'un séparateur ? | **Aucun type ne doit avoir intérêt à IMITER l'autre** |
| Théorème 8.1, condition 1 ? | $\psi_h=(L,\bar\pi L)$ **toujours** |
| Condition 2 ? | $p_l\geq\underline\pi B_l$ |
| Condition 3 ? | $u_l(\psi_l)\geq\tilde u_l$ |
| Condition 4 ? | $u_h(\psi_h)\geq u_h(\psi_l)$ |
| Les trois contraintes géométriques sur $\psi_l$ ? | Au-dessus de **sa** droite · au-dessus de la **courbe du haut risque** · **en dessous** de $\tilde u_l$ |
| Un séparateur existe-t-il toujours ? | **OUI** — la région est **toujours non vide** |
| Cela garantit-il l'efficacité ? | **NON** — *« une seule pomme pourrie peut gâter l'issue »* |
| Ce qu'est $\bar\psi_l$ ? | L'intersection de la droite du **faible risque** et de la **courbe du haut risque par $\psi_h^c$** |
| Sa propriété ? | **Pareto-efficace parmi les séparateurs**, profits **nuls** |
| $\hat\pi$ ? | $\alpha\underline\pi+(1-\alpha)\bar\pi$ |
| Théorème 8.2, les deux conditions ? | **(8.5)** les bornes du lemme 8.1 · **(8.6)** $p'\geq\hat\pi B'$ |
| Quand $\alpha$ baisse ? | La région **rétrécit**, puis **disparaît** |
| Quand $\alpha$ monte ? | Des mélangeants **battent tous les séparateurs** |
| Pourquoi, même pour le faible risque ? | Le coût du **mélange $\to0$** ; celui de la **séparation reste borné** |
| Ce que le critère intuitif corrige ? | Les croyances **EXTRÊMES** *(tout écart = haut risque)* |
| Ces croyances sont-elles illégales ? | **NON** — *« parfaitement en ligne avec la définition »* |
| Définition 8.3 ? | $u_i(\psi)>u_i^*$ **ET** $u_j(\psi)<u_j^*$ ⟹ **croyance 1 sur $i$** |
| Ses auteurs ? | **Cho et Kreps** |
| Théorème 8.3 ? | **UNE seule paire** : $(\bar\psi_l,\ \psi_h^c)$ |
| Pourquoi aucun mélangeant ne survit ? | Le **croisement unique** fournit une $\psi''$ que **seul le faible risque préfère** |
| La déviation qui élimine les autres séparateurs ? | $\psi_l^\varepsilon=(\bar B_l-\varepsilon,\ \bar p_l+\varepsilon)$ |
| L'ensemble $\mathcal{A}$ de la construction ? | Les polices que **SEUL le faible risque** préfère |
| Ce qu'est le criblage ? | La compagnie **offre un MENU** ; le consommateur **choisit** |
| Pourquoi deux compagnies ? | Pour que **l'ÉCRÉMAGE** devienne stratégique |
| L'ordre du jeu de criblage ? | **Menus simultanés → Nature → choix du consommateur** |
| Pourquoi la perfection en sous-jeux suffit ? | L'unique ensemble non singleton **est toujours ATTEINT** |
| Définition de l'écrémage ? | Attirer **SEULEMENT les bons risques**, laisser **les mauvais** |
| Lemme 8.2 ? | **Profits NULS** dans tout équilibre pur |
| Son analogie ? | La concurrence de **BERTRAND** |
| Le cas 1 de sa preuve ? | $B$ offre $(B^*+\varepsilon,p^*)$ et **rafle tout** |
| L'ordre de choix au cas 2 ? | **FIXER $\beta$ PUIS choisir $\varepsilon$** |
| Théorème 8.4 ? | **AUCUN équilibre mélangeant** |
| Le mot du livre ? | *« l'écrémage les élimine **AVEC VENGEANCE** »* |
| Le cas $B^*>0$ ? | $p^*-\underline\pi B^*>0$ ⟹ **région $R$** d'écrémage |
| Le cas $B^*=0$ ? | Offrir $(L,\bar\pi L+\varepsilon)$ — **profitable sur les deux** |
| Théorème 8.5 ? | Le seul séparateur est $(\bar\psi_l,\ \psi_h^c)$ |
| Sa coïncidence remarquable ? | **C'est le MEILLEUR séparateur du jeu de SIGNALEMENT** |
| Le Claim 2 de sa preuve ? | $\psi_l^*$ est **SUR** la droite du faible risque |
| Le théorème 8.5 prouve-t-il l'existence ? | **NON** — seulement l'**unicité conditionnelle** |
| Quand la non-existence survient ? | Quand la **droite de mélange coupe $\bar u_l$** |
| C'est-à-dire quand ? | Quand **$\alpha$ est proche de 1** |
| La lecture paradoxale ? | *« la non-existence ne surgit que quand l'asymétrie est **RELATIVEMENT MINEURE** »* |
| Ce qui existe toujours ? | Un équilibre en **stratégies COMPORTEMENTALES** |
| La question du §8.2 ? | **L'effet de l'assurance sur le COMPORTEMENT DE CONDUITE** |
