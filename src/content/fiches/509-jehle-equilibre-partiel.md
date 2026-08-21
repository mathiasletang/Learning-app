# Fiche 509 — Équilibre partiel : concurrence, oligopole et bien-être

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 4 « Partial Equilibrium » (p. 165-188) |
| **Difficulté** | Intermédiaire — le premier chapitre où consommateurs et firmes se rencontrent |
| **Temps d'étude estimé** | 130 min |
| **Prérequis** | Fiches 500 à 508 (en particulier l'utilité indirecte, la fonction de dépense, le lemme de Shephard et la fonction de profit) |
| **Concepts clés** | Demande de marché, offre de marché, équilibre de court terme, équilibre de long terme, entrée et sortie, profit nul, indétermination sous rendements constants, monopole pur, recette marginale, élasticité de la demande, taux de marge, collusion et son instabilité, équilibre de Nash, Cournot, Bertrand, concurrence monopolistique, variation compensatoire, surplus du consommateur, surplus du producteur, amélioration parétienne, efficacité de Pareto, surplus total, perte sèche |
| **Poids à l'examen** | Les **deux conditions** de l'équilibre de long terme · l'**indétermination** sous rendements constants · la formule $mr=p\big(1+1/\varepsilon\big)$ et $\dfrac{p-mc}{p}=\dfrac{1}{\|\varepsilon\|}$ · l'**argument d'instabilité de la collusion** · le calcul **Cournot** complet · le **paradoxe de Bertrand** · $CV=\int qh\,dp$ et son rapport au **surplus du consommateur** · la **démonstration d'inefficacité du monopole** · l'**exemple 4.4** (perte sèche de Cournot). |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE 4 : les agents se RENCONTRENT sur un marche

  §4.1  CONCURRENCE PARFAITE
     demande de marche  qd(p) = SOMME_i  qi(p, pbar, yi)
        homogene de degre 0 en (tous les prix, tous les revenus)
        « l'homogeneite est la SEULE restriction sur la demande de marche
          d'un bien unique »
        elle depend du NIVEAU du revenu agrege ET de sa REPARTITION
     offre de marche    qs(p) = SOMME_j  qj(p, w)

     COURT TERME   qd(p*) = qs(p*)   avec J FIXE
     LONG TERME    DEUX conditions simultanees
        (1) marche equilibre    qd(phat) = SOMME_{j<=Jhat} qj(phat)
        (2) PROFIT NUL          pi_j(phat) = 0  pour tout j
        -> on determine CONJOINTEMENT le prix ET LE NOMBRE DE FIRMES

     ex. 4.2  offre croissante -> Jhat UNIQUEMENT determine (Jhat = 50)
     ex. 4.3  rendements CONSTANTS -> Jhat INDETERMINE
              (1 firme de taille 147, ou 2 de 147/2, ou J de 147/J...)

  §4.2  CONCURRENCE IMPARFAITE
     MONOPOLE PUR   max p(q) q - c(q)   ->   mr(q*) = mc(q*)

        mr(q) = p(q) [ 1 + 1/eps(q) ]

        => p(q*)[1 + 1/eps] = mc >= 0  donc  |eps| >= 1
           LE MONOPOLEUR NE PRODUIT JAMAIS DANS LA ZONE INELASTIQUE

        TAUX DE MARGE   ( p - mc ) / p  =  1 / |eps|

     POURQUOI LA COLLUSION N'EST PAS UN EQUILIBRE
        maximiser le profit JOINT donne  d(pi_k)/d(qk) > 0  pour chaque k
        -> chaque firme a interet a DEVIER en produisant plus
        => il faut un concept NON COOPERATIF : l'EQUILIBRE DE NASH (1951)
        joint :  d(pi_k)/dqk + SOMME_{j != k} d(pi_j)/dqk = 0     (4.9)
        Nash  :  d(pi_k)/dqk = 0                                  (4.10)

     COURNOT (1838)   J firmes identiques, cout cq, demande p = a - b Q
        qbar_j = (a-c) / b(J+1)     pbar - c = (a-c)/(J+1) > 0
        J = 1  -> ecart maximal (monopole)
        J -> infini -> p -> c   : LA CONCURRENCE PARFAITE COMME CAS LIMITE

     BERTRAND (1883)   concurrence en PRIX, deux firmes, bien homogene
        UNIQUE equilibre de Nash :  p1 = p2 = c,  profits NULS
        DEUX firmes suffisent -- contraste radical avec Cournot

     CONCURRENCE MONOPOLISTIQUE
        produits DIFFERENCIES, substituts PROCHES mais pas parfaits
        court terme : mr_j = mc_j,  profit de signe quelconque
        long terme  : mr_j = mc_j  ET  profit NUL
                      -> TANGENCE entre demande et cout moyen

  §4.3  EQUILIBRE ET BIEN-ETRE

     §4.3.1  VARIATION COMPENSATOIRE
        v(p1, y0 + CV) = v(p0, y0)
        CV = e(p1, v0) - e(p0, v0) = INTEGRALE de p0 a p1 de q^h(p, v0) dp
        -> l'aire a gauche de la demande HICKSIENNE

        SURPLUS DU CONSOMMATEUR : l'aire a gauche de la MARSHALLIENNE
        les deux DIVERGENT a cause de l'EFFET DE REVENU
        mais CS approxime bien CV pour de PETITES variations de prix

     §4.3.2  EFFICACITE
        amelioration PARETIENNE : quelqu'un gagne, personne ne perd
        efficacite de PARETO : aucune amelioration paretienne possible

        DEMONSTRATION : partant de (p0,q0) au-dessus du point concurrentiel,
        baisser le prix a p1, prelever A+B au consommateur (il est indifferent),
        le profit de la firme varie de C - A, donc en lui donnant A il gagne C
        et le consommateur garde B  ->  LES DEUX GAGNENT STRICTEMENT
        => (p0,q0) n'etait PAS Pareto-efficace

        SEUL le couple prix-quantite CONCURRENTIEL est Pareto-efficace
        ni le monopole ni Cournot ne le sont

     §4.3.3  SURPLUS TOTAL
        CS + PS = INTEGRALE de 0 a q de [ p(x) - mc(x) ] dx
        maximise en  p(q) = mc(q)  -- le point concurrentiel

     ex. 4.4  Cournot : perte seche = (a-c)^2 / [ 2b (J+1)^2 ]  ->  0
```

> **L'annonce du chapitre.** *« Dans les chapitres précédents nous avons étudié le comportement des consommateurs et des firmes individuels. Ici nous commençons à explorer les **conséquences de ce comportement quand consommateurs et firmes se rencontrent sur des marchés**. […] En chemin, nous prêtons une attention spéciale à la relation étroite entre **la structure concurrentielle d'un marché et sa "performance" sociale**. »*

> ⚠️ **Note de transcription — identique aux fiches 500-508.** Le PDF n'exporte pas $\sum$, $\gg$, $\neq$ ; il rend l'inégalité vectorielle $\geq$ comme un « + », l'élasticité $\varepsilon$ comme une parenthèse, et $\Pi$ (profit) est parfois perdu. Ces symboles sont rétablis depuis la prose et le contexte.

## 🟠 Concept 1 — Demande et offre de marché (§4.1)

### 1.1 Ce qu'est un marché parfaitement concurrentiel

> *« Sur les marchés parfaitement concurrentiels, acheteurs et vendeurs sont **suffisamment nombreux** pour garantir qu'**aucun d'eux, seul, n'a le pouvoir de déterminer le prix de marché**. »*

> *« L'équilibre sur un marché concurrentiel exige donc la **compatibilité simultanée des plans disparates et souvent conflictuels d'un grand nombre d'agents différents**. »*

### 1.2 La demande de marché

$$\boxed{\;q^d(p)\equiv\sum_{i\in\mathcal{I}} q^i(p,\bar p,y^i)\;} \tag{4.1}$$

**Les quatre remarques du livre — chacune est examinable :**

| # | Remarque |
|---|---|
| 1 | $q^d(p)$ donne le **total** demandé par tous les acheteurs |
| 2 | La demande de marché dépend aussi des **prix de tous les autres biens**, *« bien que nous supprimions généralement la mention explicite de ceci »* |
| 3 | *« Alors que la demande d'un acheteur unique dépend du niveau de **son propre** revenu, la demande de marché dépend **à la fois du niveau agrégé de revenu ET de sa répartition entre acheteurs** »* |
| 4 | La demande de marché est **homogène de degré zéro** en tous les prix et le **vecteur** des revenus |

> ⚠️ **La phrase la plus importante du paragraphe :**
>
> *« Bien que plusieurs restrictions sur le système de demande d'un individu découlent de la maximisation d'utilité, **l'homogénéité est la SEULE restriction de ce genre sur la demande de marché d'un bien unique**. »*
>
> Autrement dit : **symétrie et semi-définie négativité de Slutsky ne se transmettent PAS à l'agrégat**. C'est le problème dit d'« agrégation », traité au chapitre 5 et au-delà. Ne transposez pas les résultats du chapitre 1 à la demande de marché.

### 1.3 L'offre de marché et l'équilibre de court terme

> *« Dans la **période de marché de court terme**, le nombre de vendeurs potentiels est **fixé, fini et limité** aux firmes qui "existent déjà" et sont en un certain sens capables de démarrer simplement en acquérant les inputs variables nécessaires. »*

$$q^s(p)\equiv\sum_{j\in\mathcal{J}} q^j(p,w) \tag{4.2}$$

$$\text{Équilibre de court terme :}\qquad q^d(p^*)=q^s(p^*)$$

> *« Nous avons un **vrai équilibre** au sens où **aucun agent du marché n'a d'incitation à changer son comportement** — chacun fait du mieux qu'il peut dans les circonstances qu'il affronte. »*

### 1.4 L'équilibre de long terme

> *« Dans le long terme, aucun input n'est fixe. Les firmes **en place** sont libres de choisir les niveaux optimaux de tous les inputs, y compris la taille de leur usine. Elles sont aussi libres de **quitter** l'industrie entièrement. De plus, **de nouvelles firmes peuvent décider de commencer à produire**. »*

**Les deux conditions :**

$$\boxed{\begin{aligned} q^d(\hat p) &= \sum_{j=1}^{\hat J} q^j(\hat p) &&\text{— le marché s'équilibre}\\[1mm] \pi^j(\hat p) &= 0, \quad j=1,\dots,\hat J &&\text{— PROFIT NUL} \end{aligned}} \tag{4.3}$$

**Le raisonnement du livre sur la condition de profit nul :**

| Sens | Argument |
|---|---|
| $\pi\geq0$ | *« sinon, les firmes de l'industrie voudront **sortir** »* |
| $\pi\leq0$ | *« parce que **toutes les firmes ont libre accès à la technologie les unes des autres** (en particulier, les firmes qui ne produisent pas actuellement ont accès à la technologie de chaque firme qui produit), **aucune firme ne peut faire un profit positif en longue période**. Sinon, les firmes extérieures **adopteraient la technologie** de la firme qui gagne et **entreraient** »* |

> ⚠️ **La différence structurelle avec le court terme, à énoncer explicitement.**
>
> *« Contrairement au court terme, où **le nombre de firmes est donné** et où la condition d'équilibre du marché détermine le prix, **le nombre de firmes n'est pas donné dans le long terme**. Dans le long terme, **le prix d'équilibre $\hat p$ ET le nombre de firmes $\hat J$ doivent être déterminés CONJOINTEMENT**. »*
>
> Deux inconnues, deux équations. C'est ce qui rend le système (4.3) non trivial.

### 1.5 Exemples 4.1 à 4.3 — court terme, long terme, et indétermination

**Exemple 4.1 — l'équilibre de court terme.** $J=48$ firmes identiques, technologie $q=x^\alpha k^{1-\alpha}$ avec $k$ fixe. Avec $\alpha=1/2$, $w_x=4$, $w_k=1$, $k=1$ :

$$q^j=p/8 \qquad q^s=48\,(p/8)=6p \tag{E.3}$$

Avec la demande $q^d=294/p$ (E.4), l'équilibre de court terme :

$$p^*=7 \qquad q^*=42 \qquad q^j=7/8 \qquad \pi^j=2{,}0625>0$$

> **Le profit est strictement positif** — c'est la situation qui déclenchera l'entrée en longue période.

**Exemple 4.2 — l'équilibre de long terme quand l'offre est croissante.**

Demande inverse $p=39-0{,}009q$ (E.1) ; profit de long terme $\pi^j(p)=p^2-2p-399$ (E.2) ; offre $y^j=d\pi/dp=2p-2$ (E.3) *(par le lemme de Hotelling — fiche 508)*.

**On résout (4.3) dans cet ordre :**

| Étape | Équation | Résultat |
|---|---|---|
| 1 | **profit nul** : $\hat p^2-2\hat p-399=0$ | $\hat p=21$ |
| 2 | **équilibre du marché** : $(1000/9)(39-\hat p)=\hat J(2\hat p-2)$ | $\hat J=50$ |
| 3 | offre individuelle | $y^j=40$ |

> ⚠️ **L'ordre de résolution est essentiel.** La condition de **profit nul** ne fait intervenir que $\hat p$ — on la résout **d'abord**. La condition d'équilibre donne ensuite $\hat J$. Faire l'inverse conduit à un système inutilement couplé.

**Exemple 4.3 — l'indétermination sous rendements constants.**

Reprenant la technologie de l'exemple 4.1, à rendements d'échelle **constants** :

$$\pi^j(p,k)=\frac{p^2k}{16}-k=k\left(\frac{p^2}{16}-1\right) \tag{E.1}$$

> *« Quelle que soit la taille d'usine choisie par la firme, ceci ne s'annulera **que pour $\hat p=4$**. »* En effet, $\pi(\hat p,k)=0$ pour **tout** $k>0$ si et seulement si $\hat p=4$.

La condition d'équilibre donne alors $\dfrac{294}{4}=\hat J\hat k$, soit

$$\boxed{\;\hat J\,\hat k=147\;} \tag{E.5}$$

> *« Parce qu'en $\hat p=4$ les profits sont nuls **quelle que soit la taille d'usine**, l'équilibre de long terme est compatible avec **un très large éventail de structures de marché**. L'équilibre peut impliquer **une seule firme** avec une usine de taille $147$, **deux firmes** avec des usines $147/2$, **trois firmes** avec $147/3$, jusqu'à **n'importe quel nombre $J$** de firmes, chacune avec une usine de taille $147/J$. »*

> *« Cette **indétermination du nombre de firmes en longue période est un phénomène commun à toutes les industries à rendements constants**. »* (Exercice 4.5.)

> **Le contraste entre 4.2 et 4.3, à retenir.**
>
> |  | Offre individuelle | $\hat p$ | $\hat J$ |
> |---|---|---|---|
> | **Exemple 4.2** | **croissante** | unique | **unique** ($=50$) |
> | **Exemple 4.3** | **horizontale** (rendements constants) | unique ($=4$) | **indéterminé** |
>
> *« Parce que la demande de marché est décroissante, **le prix d'équilibre de long terme est uniquement déterminé dans les deux cas**. »* Seul le **nombre de firmes** peut être indéterminé.
>
> ⚠️ **C'est la même indétermination qu'au §3.5.2** (fiche 508) : sous rendements constants, l'échelle de la firme est indéterminée. Ici elle se manifeste au niveau de l'industrie.

## 🔴 Concept 2 — Le monopole pur (§4.2)

### 2.1 La définition

> *« Le **monopole pur**, la structure de marché la moins concurrentielle imaginable, est à l'extrémité opposée. Dans le monopole pur, il y a **un vendeur unique** d'un produit pour lequel **il n'y a pas de substituts proches** en consommation, et **l'entrée est complètement bloquée** par des obstacles technologiques, financiers ou légaux. »*

### 2.2 Le problème et sa réduction

> *« Le monopoleur prend la fonction de demande de marché **comme donnée** et choisit prix et quantité pour maximiser le profit. Parce que **le prix le plus élevé qu'il peut demander pour une quantité $q$ donnée est la demande inverse $p(q)$**, le choix de la firme peut se réduire à celui de **choisir $q$ seul**. »*

$$\Pi(q)\equiv r(q)-c(q), \qquad r(q)=p(q)\,q$$

$$\text{CPO :}\qquad \boxed{\;mr(q^*)=mc(q^*)\;} \tag{4.4}$$

### 2.3 La recette marginale et l'élasticité

$$mr(q)=p(q)+\frac{dp(q)}{dq}\,q = p(q)\left[1+\frac{dp(q)}{dq}\cdot\frac{q}{p(q)}\right] = \boxed{\;p(q)\left[1+\frac{1}{\varepsilon(q)}\right]\;} \tag{4.5}$$

où $\varepsilon(q)=\dfrac{dq}{dp}\cdot\dfrac{p}{q}$ est l'**élasticité de la demande de marché**, **supposée négative**.

### 2.4 Deux conséquences majeures

**(a) Le monopoleur ne produit jamais dans la zone inélastique.** En combinant (4.4) et (4.5) :

$$p(q^*)\left[1+\frac{1}{\varepsilon(q^*)}\right]=mc(q^*)\ \geq\ 0 \tag{4.6}$$

*« parce que le coût marginal est toujours non négatif. Le prix est aussi non négatif, donc nous devons avoir »*

$$\boxed{\;|\varepsilon(q^*)|\geq1\;}$$

> *« Ainsi, **le monopoleur ne choisit jamais un output dans la plage inélastique de la demande de marché**. »* (Fig. 4.3.)

> **L'intuition, en une phrase.** Dans la zone inélastique ($|\varepsilon|<1$), **réduire** la quantité **augmente** la recette totale **et** réduit le coût. Aucune firme rationnelle n'y reste.

**(b) Le taux de marge.** En réarrangeant (4.6) :

$$\boxed{\;\frac{p(q^*)-mc(q^*)}{p(q^*)}=\frac{1}{|\varepsilon(q^*)|}\;} \tag{4.7}$$

> *« Quand la demande de marché est **moins qu'infiniment élastique**, $|\varepsilon(q^*)|$ sera fini et **le prix du monopoleur excédera le coût marginal**. De plus, **le prix excédera le coût marginal d'autant plus que la demande est inélastique**, toutes choses égales par ailleurs. »*

> **C'est l'indice de Lerner.** Il mesure le **pouvoir de marché** : $0$ en concurrence parfaite ($|\varepsilon|=\infty$), d'autant plus grand que la demande est rigide.

### 2.5 Ce que concurrence pure et monopole pur ont en commun

> *« Bien qu'étant des formes extrêmes opposées, elles partagent une caractéristique importante : **ni le concurrent pur ni le monopoleur pur n'a besoin de prêter attention aux actions des autres firmes** en formulant ses plans. »*

|  | Pourquoi il ignore les autres |
|---|---|
| **concurrent parfait** | *« individuellement il ne peut pas affecter le prix de marché, ni donc les actions des autres concurrents »* |
| **monopoleur pur** | *« il contrôle complètement prix et quantité, et **n'a même pas besoin de se soucier de l'entrée** parce que l'entrée est effectivement bloquée »* |

> *« Les firmes deviennent **plus interdépendantes** quand le nombre de firmes est **plus petit**, l'entrée **plus facile**, et les substituts disponibles **plus proches**. Quand les firmes perçoivent leur interdépendance, elles ont une incitation à **formuler leurs plans stratégiquement**. »*

## 🔴 Concept 3 — Pourquoi la collusion n'est pas un équilibre

### 3.1 La tentation de l'idée collusive

> *« Parce que les firmes sont conscientes de leur interdépendance, et parce que les actions de l'une peuvent réduire les profits des autres, **ne vont-elles pas simplement travailler ensemble ou s'entendre** pour extraire autant de profit total que possible du marché et le diviser entre elles ? Après tout, si elles peuvent travailler ensemble pour faire la "tarte" de profit aussi grande que possible, ne pourront-elles pas ensuite la diviser de sorte que chacune ait une part au moins aussi grande qu'autrement ? »*

> *« En mettant de côté la légalité d'une telle entente, **il y a quelque chose de tentant dans l'idée d'un équilibre collusif**. Cependant, **il y a aussi un problème**. »*

### 3.2 L'argument formel

Soit $J$ firmes, chacune produisant $q^j$, avec

$$\Pi^j=\Pi^j(q^1,\dots,q^j,\dots,q^J) \qquad\text{et}\qquad \frac{\partial\Pi^j}{\partial q^k}<0 \ \text{ pour } j\neq k \tag{4.8}$$

*(le profit de chaque firme est **défavorablement affecté** par une hausse de l'output de toute autre.)*

**Si les firmes coopèrent** pour maximiser le profit **joint** $\sum_j\Pi^j$, le vecteur $\bar q$ doit satisfaire

$$\frac{\partial\Pi^k(\bar q)}{\partial q^k}+\sum_{j\neq k}\frac{\partial\Pi^j(\bar q)}{\partial q^k}=0, \qquad k=1,\dots,J \tag{4.9}$$

**Le point décisif.** (4.8) et (4.9) ensemble impliquent

$$\boxed{\;\frac{\partial\Pi^k(\bar q)}{\partial q^k}>0, \qquad k=1,\dots,J\;}$$

*(car la somme des termes croisés est **négative**, donc le terme propre doit être **positif** pour que le total s'annule.)*

> *« **Pensez à ce que cela signifie.** Parce que le profit de chaque firme est **croissant en son propre output** en $\bar q$, **chacune peut augmenter son propre profit en s'écartant de son assignation** — pourvu, bien sûr, que **tous les autres continuent à produire leur assignation** ! Si **même une seule firme** succombe à cette tentation, $\bar q$ ne sera pas le vecteur d'output qui prévaudra. »*

> *« **Pratiquement toutes les solutions collusives donnent lieu à de telles incitations à tricher** sur l'accord. […] Il est peut-être plus approprié de penser aux firmes intéressées comme **essentiellement non coopératives**. »*

### 3.3 L'équilibre de Nash

> *« Le concept d'équilibre non coopératif le plus commun est dû à **John Nash (1951)**. Dans un équilibre de Nash, **chaque agent doit faire du mieux qu'il peut, étant données les actions de tous les autres agents**. Quand tous les agents ont atteint un tel point, **aucun n'a d'incitation à changer unilatéralement** ce qu'il fait. »*

**La condition de Nash** — à comparer terme à terme avec (4.9) :

$$\frac{\partial\Pi^k(q^*)}{\partial q^k}=0, \qquad k=1,\dots,J \tag{4.10}$$

> **La différence entre (4.9) et (4.10), en une ligne.**
>
> |  | Ce qu'on annule |
> |---|---|
> | **(4.9) — collusion** | l'effet de $q^k$ sur le profit **de toute l'industrie** |
> | **(4.10) — Nash** | l'effet de $q^k$ sur le profit **de la seule firme $k$** |
>
> *« Clairement, il y a une différence entre (4.9) et (4.10). **En général, elles détermineront des vecteurs d'output tout à fait différents.** »*
>
> ⚠️ **La collusion produit MOINS d'output que Nash.** Puisque $\partial\Pi^k/\partial q^k>0$ en $\bar q$ alors qu'elle est nulle en $q^*$, et que le profit est concave, $\bar q^k<q^{*k}$. C'est ce qui rend la collusion profitable — et instable.

## 🔴 Concept 4 — L'oligopole de Cournot (§4.2.1)

### 4.1 Le cadre

> *« Le modèle d'oligopole suivant date de **1838** et est dû à l'économiste français **Auguste Cournot**. »*

| Hypothèse | Formulation |
|---|---|
| $J$ firmes **identiques**, entrée **bloquée** |  |
| coûts identiques et **linéaires** | $C(q^j)=c\,q^j$, $c\geq0$ (4.11) |
| demande inverse **linéaire** | $p=a-b\sum_{j}q^j$, $a>0$, $b>0$, $a>c$ (4.12) |

$$\Pi^j(q^1,\dots,q^J)=\left(a-b\sum_{k=1}^J q^k\right)q^j-c\,q^j \tag{4.13}$$

### 4.2 La résolution

> *« Nous cherchons un vecteur d'outputs $(\bar q^1,\dots,\bar q^J)$ tel que **le choix de chaque firme soit maximisateur de profit étant donnés les choix des autres**. Un tel vecteur est appelé un **équilibre de Cournot-Nash**. »*

**Pas 1 — la condition du premier ordre** pour la firme $j$, les autres étant fixés :

$$a-2b\bar q^j-b\sum_{k\neq j}\bar q^k-c=0$$

qu'on réécrit *(en faisant apparaître la somme complète)* :

$$b\,\bar q^j=a-c-b\sum_{k=1}^J \bar q^k \tag{4.14}$$

**Pas 2 — l'argument de symétrie.**

> *« En notant que **le membre de droite de (4.14) est indépendant de la firme $j$ considérée**, nous concluons que **toutes les firmes doivent produire le même output** à l'équilibre. »*

En notant $\bar q$ cet output commun, (4.14) devient $b\bar q=a-c-Jb\bar q$, d'où

$$\boxed{\;\bar q=\frac{a-c}{b(J+1)}\;} \tag{4.15}$$

### 4.3 Les grandeurs d'équilibre

$$\bar q^j=\frac{a-c}{b(J+1)} \qquad \sum_j\bar q^j=\frac{J(a-c)}{b(J+1)} \qquad \bar p=a-\frac{J(a-c)}{J+1}<a \qquad \bar\Pi^j=\frac{(a-c)^2}{(J+1)^2b}$$

### 4.4 La lecture — le résultat le plus important du chapitre

$$\boxed{\;\bar p-c=\frac{a-c}{J+1}\ >\ 0\;} \tag{4.16}$$

| Nombre de firmes | Écart prix – coût marginal |
|---|---|
| $J=1$ (monopole pur) | **maximal** : $\dfrac{a-c}{2}$ |
| $J$ fini | positif, décroissant en $J$ |
| $J\to\infty$ | $\displaystyle\lim_{J\to\infty}(\bar p-c)=0$ (4.17) |

> *« L'équation (4.17) nous dit que **le prix approchera le coût marginal quand le nombre de concurrents deviendra grand**. En effet, **cette issue limite correspond précisément à ce qu'on obtiendrait si un nombre fini quelconque de ces firmes se comportaient en concurrents parfaits**. Ainsi, ce modèle simple fournit **une autre interprétation de la concurrence parfaite** : elle peut être vue comme **un cas limite de la concurrence imparfaite**, quand le nombre de firmes devient grand. »*

<details class="details--riche">
<summary>

**Vérifier les grandeurs d'équilibre de Cournot**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre écrit « en faisant quelques calculs ».</span>

</div>

**L'output total.** $\displaystyle\sum_j\bar q^j=J\cdot\frac{a-c}{b(J+1)}=\frac{J(a-c)}{b(J+1)}$

**Le prix.** En substituant dans la demande inverse :

$$\bar p=a-b\cdot\frac{J(a-c)}{b(J+1)}=a-\frac{J(a-c)}{J+1} \quad$$

**Le taux de marge.** En écrivant $a=\dfrac{a(J+1)}{J+1}$ :

$$\bar p-c=\frac{a(J+1)-J(a-c)-c(J+1)}{J+1}=\frac{aJ+a-Ja+Jc-cJ-c}{J+1}=\frac{a-c}{J+1} \quad$$

**Le profit.**

$$\bar\Pi^j=(\bar p-c)\,\bar q^j=\frac{a-c}{J+1}\cdot\frac{a-c}{b(J+1)}=\frac{(a-c)^2}{b(J+1)^2} \quad$$

> **Trois contrôles de cohérence.** — $J=1$ : $\bar q=\dfrac{a-c}{2b}$, $\bar p=\dfrac{a+c}{2}$ — c'est exactement la solution de **monopole** pour une demande linéaire et un coût marginal constant — $\bar\Pi^j>0$ pour tout $J$ fini, mais $\to0$ quand $J\to\infty$ — Le **profit total de l'industrie** vaut $\dfrac{J(a-c)^2}{b(J+1)^2}$, qui est **maximal en $J=1$** — d'où la tentation de la collusion.
>
> ⚠️ **L'hypothèse $a>c$ est essentielle** : sans elle, $\bar q<0$ et il n'y a pas d'équilibre intérieur. Elle dit simplement que le prix maximal que les consommateurs accepteraient dépasse le coût de production.

</details>

## 🔴 Concept 5 — L'oligopole de Bertrand (§4.2.2)

### 5.1 Le changement de variable stratégique

> *« Presque 50 ans après Cournot, un mathématicien français, **Joseph Bertrand (1883)**, a offert une vue différente de la rivalité entre firmes. Bertrand a argumenté qu'**il est bien plus naturel de penser aux firmes comme se concurrençant dans leur choix de PRIX, plutôt que de quantité**. **Cette petite différence suffit à changer complètement le caractère de l'équilibre de marché.** »*

### 5.2 Le cadre

| Hypothèse |  |
|---|---|
| **deux** firmes, bien **homogène** |  |
| coûts marginaux identiques $c>0$, pas de coût fixe |  |
| demande linéaire | $Q=\alpha-\beta p$ |
| les firmes **déclarent simultanément** leurs prix et servent toute la demande à ce prix |  |

**La règle de partage :**

<div class="callout" data-kind="plus">

<span class="callout__lab">source la moins chère</span>

*« Les consommateurs achètent à la . Ainsi, **la firme au prix le plus bas sert toute la demande de marché** au prix qu'elle a déclaré, tandis que **la firme au prix le plus élevé, si les prix diffèrent, n'obtient aucun client**. Si les deux déclarent le même prix, **elles partagent la demande également**. »*

</div>

$$\Pi^1(p_1,p_2)=\begin{cases} (p_1-c)(\alpha-\beta p_1) & c<p_1<p_2\\[1mm] \tfrac12(p_1-c)(\alpha-\beta p_1) & c<p_1=p_2\\[1mm] 0 & \text{sinon} \end{cases}$$

> *« Le profit de la firme 1 est positif tant que son prix excède le coût marginal. […] **Son profit n'a jamais besoin d'être négatif**, cependant, parce qu'elle peut toujours **fixer un prix égal au coût marginal** et s'assurer au pire un profit nul. »* On restreint donc l'attention à $p_i\geq c$.

### 5.3 Le résultat — le paradoxe de Bertrand

> *« Il peut être quelque peu surprenant, mais **dans l'unique équilibre de Nash, les deux firmes fixent un prix égal au coût marginal, et toutes deux font un profit nul**. »*

$$\boxed{\;p_1=p_2=c \qquad \Pi^1=\Pi^2=0\;}$$

> *« Parce que les fonctions de profit sont ici **discontinues**, nous ne pouvons pas argumenter en dérivant et en résolvant les conditions du premier ordre. À la place, **nous utilisons simplement du bon sens**. »*

**Le moteur du résultat :**

> *« Parce que **la firme au prix le plus bas sert tout le marché**, **chaque firme a une incitation à sous-coter sa rivale**. C'est cet effet qui pousse finalement le prix d'équilibre jusqu'au coût marginal. »*

### 5.4 La preuve formelle

**Étape 1 — $(c,c)$ est bien un équilibre.**

> *« Chaque firme sert la moitié du marché et fait un profit nul parce que chaque unité est vendue au coût. De plus, **en augmentant son prix, une firme cesse d'obtenir la moindre demande** parce que le prix de l'autre est alors strictement plus bas. Par conséquent, **il n'est pas possible de gagner plus que zéro**. »*

**Étape 2 — il n'y en a pas d'autre.** Soit $(p_1,p_2)$ un équilibre avec $p_1>c$.

| Pas | Affirmation | Justification |
|---|---|---|
| a | $p_2\in(c,p_1]$ | *« un tel choix rapporte à la firme 2 un profit strictement positif, alors que tous les autres choix rapportent zéro »* |
| b | $p_2\neq p_1$ | *« si la firme 2 peut gagner un profit positif en choisissant $p_2=p_1$ et en partageant le marché, elle peut gagner **encore plus** en choisissant $p_2$ **juste en dessous** de $p_1$ et en servant **tout** le marché à un prix pratiquement identique »* |
| c | donc $p_1>c \Rightarrow p_2>c$ **et** $p_2<p_1$ |  |
| d | par symétrie des rôles : $p_2>c \Rightarrow p_1>c$ **et** $p_1<p_2$ |  |

> *« Par conséquent, si le prix d'une firme est au-dessus du coût marginal, **les deux prix doivent être au-dessus du coût marginal et chaque firme doit strictement sous-coter l'autre — ce qui est impossible**. »* $\blacksquare$

### 5.5 Le contraste avec Cournot

> *« Dans le modèle de Bertrand, **le prix est poussé jusqu'au coût marginal par la concurrence entre deux firmes seulement**. C'est frappant, et **cela contraste fortement** avec ce qui se produit dans le modèle de Cournot, où la différence entre prix et coût marginal ne décline **qu'à mesure que le nombre de firmes augmente**. »*

> |  | Variable stratégique | Nombre de firmes pour $p=c$ |
> |---|---|---|
> | **Cournot** | la **quantité** | $J\to\infty$ |
> | **Bertrand** | le **prix** | **2** |
>
> ⚠️ **C'est le « paradoxe de Bertrand ».** Deux firmes suffisent à produire l'issue concurrentielle. Le résultat dépend crucialement de trois hypothèses : bien **parfaitement homogène**, **absence de contrainte de capacité**, et **interaction en une seule période**. Relâcher l'une d'elles rétablit des profits positifs — c'est l'objet d'une large littérature.

## 🟠 Concept 6 — La concurrence monopolistique (§4.2.3)

### 6.1 Le cadre

> *« Les firmes des oligopoles de Cournot et de Bertrand vendent un produit **homogène**. En **concurrence monopolistique**, un groupe "relativement grand" de firmes vend des **produits différenciés** que les acheteurs voient comme des **substituts proches, quoique non parfaits**. Chaque firme jouit donc d'un **degré limité de pouvoir de monopole** sur le marché de sa variante particulière. »*

> *« Dans un groupe monopolistiquement concurrentiel, **l'entrée se produit quand une nouvelle firme introduit une variante du produit qui n'existait pas auparavant**. »*

**La structure de la demande.** Pour un nombre potentiellement infini de variantes $j=1,2,\dots$ :

$$q^j=q^j(p), \qquad \frac{\partial q^j}{\partial p_j}<0 \quad\text{et}\quad \frac{\partial q^j}{\partial p_k}>0 \ \text{ pour } k\neq j \tag{4.18}$$

*(les variantes sont des **substituts**)*, et *« il y a toujours un prix $\tilde p_j>0$ auquel la demande pour $j$ est nulle, quels que soient les prix des autres produits »*.

$$\Pi^j(p)=q^j(p)\,p_j-c^j\big(q^j(p)\big) \tag{4.19}$$

### 6.2 L'équilibre de court terme

> *« Dans le court terme, **un nombre fini fixe de firmes actives choisit le prix** pour maximiser le profit, étant donnés les prix choisis par les autres. »*

Si $0<\bar p_j<\tilde p_j$, la firme produit un output positif et la condition du premier ordre s'arrange en

$$\frac{\partial q^j(\bar p)}{\partial p_j}\Big[mr^j\big(q^j(\bar p)\big)-mc^j\big(q^j(\bar p)\big)\Big]=0 \tag{4.20}$$

*(en utilisant (4.5))*. Comme $\partial q^j/\partial p_j<0$, cela se réduit à

$$\boxed{\;mr^j=mc^j\;}$$

> *« Comme d'habitude, **le concurrent monopolistique peut avoir un profit de court terme positif, négatif ou nul**. »*

### 6.3 L'équilibre de long terme

> *« Pour analyser le long terme, nous supposons que **chaque variante a des substituts arbitrairement proches qui peuvent être produits au même coût**. Sous cette hypothèse, **un profit positif de long terme pour une firme induirait l'entrée d'arbitrairement nombreuses firmes** produisant des substituts proches. »*

Les **deux** conditions, pour toute firme active $j$ :

$$\frac{\partial q^j(p^*)}{\partial p_j}\Big[mr^j-mc^j\Big]=0 \quad \text{(4.21)} \qquad\qquad \Pi^j\big(q^j(p^*)\big)=0 \quad \text{(4.22)}$$

> *« La Fig. 4.4 montre la **tangence entre la demande et le coût moyen** en équilibre de long terme, impliquée par (4.21) et (4.22). »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi une tangence.</span>

(4.22) dit $p_j=ac^j$ — la demande touche le coût moyen. (4.21) dit $mr^j=mc^j$ — donc en ce point la demande ne peut pas **couper** le coût moyen, sans quoi un point voisin donnerait un profit positif. Les deux courbes sont donc **tangentes**.

⚠️ **La conséquence classique.** À la tangence, la courbe de demande est **décroissante**, donc le coût moyen l'est aussi : la firme produit **à gauche du minimum de son coût moyen**. C'est la fameuse « capacité excédentaire » de la concurrence monopolistique — le prix payé pour la diversité des variantes.

</div>

## 🔴 Concept 7 — Prix et bien-être individuel (§4.3.1)

### 7.1 Le changement de registre

> *« Dans cette section, nous déplaçons notre attention de la **"prédiction" vers l'"évaluation"**. […] Ces questions font passer notre attention **du purement positif à l'essentiellement normatif**. »*

> *« Quand le bien-être de l'agent individuel est une considération importante pour formuler la politique sociale, il y a **deux sortes de questions**. D'abord, la question **positive** : comment la politique proposée affectera-t-elle le bien-être de l'individu ? Ensuite, la question **normative** bien plus difficile : comment devons-nous **pondérer les différents effets sur les différents individus** et arriver à un jugement de l'intérêt de "la société" ? **Ici nous nous concentrons sur le premier ensemble de questions.** »*

### 7.2 Le cadre partiel et le bien composite

> *« Pour garder les choses simples, supposons que **le prix de tous les autres biens reste fixe**. **C'est l'essence de l'approche d'équilibre partiel.** »*

On introduit un **bien composite** $m$ = le revenu dépensé sur tous les biens autres que $q$ :

$$m(p,\bar p,y)\equiv\bar p\cdot x(p,\bar p,y)$$

> *« À l'exercice 4.16, on vous demande de montrer que si $u(q,x)$ satisfait nos hypothèses standard, alors **la fonction d'utilité sur les deux biens $q$ et $m$**, $\bar u(q,m)\equiv\max_x u(q,x)$ s.c. $\bar p\cdot x\leq m$, **les satisfait aussi**. Nous pouvons donc analyser le problème du consommateur **comme s'il n'y avait que deux biens**. »*

$$\max_{q,m} \ \bar u(q,m) \quad\text{s.c.}\quad pq+m\leq y$$

### 7.3 La question concrète du livre

> *« Le gouvernement local envisage de moderniser l'installation de traitement des eaux. Les rénovations amélioreront son efficacité et résulteront en **une baisse du prix de l'eau**. Le coût sera compensé par une **"taxe sur l'eau" ponctuelle**. **L'amélioration doit-elle être entreprise ?** […] Les consommateurs seraient-ils **disposés à payer la taxe supplémentaire** pour obtenir la réduction du prix de l'eau ? »*

### 7.4 La variation compensatoire

**La définition.** Le montant de revenu que le consommateur est disposé à céder pour la baisse de prix est celui qui le laisse **exactement aussi bien** qu'avant :

$$\boxed{\;v(p^1,\,y^0+CV)=v(p^0,\,y^0)\;} \tag{4.23}$$

> *« Ce changement de revenu, requis pour maintenir l'utilité constante à la suite d'un changement de prix, est appelé la **variation compensatoire**, et il a été originellement suggéré par **Hicks**. »*

| Cas | Signe de $CV$ |
|---|---|
| baisse de prix ($p^1<p^0$) | $CV\leq0$ — le consommateur **peut céder** du revenu |
| hausse de prix ($p^1>p^0$) | $CV\geq0$ — il **faut lui donner** du revenu |

**La lecture géométrique (haut de la Fig. 4.5).** Le consommateur est en $A$ avec $v(p^0,y^0)$ ; le prix baisse et il passe en $B$ avec $v(p^1,y^0)>v(p^0,y^0)$ ; on réduit son revenu à $y^0+CV$ pour le ramener en $C$, sur la courbe d'indifférence initiale.

### 7.5 De $CV$ à une intégrale de demande hicksienne

**Pas 1 — passer par la fonction de dépense.** Par l'identité $e\big(p,v(p,y)\big)=y$ (théorème 1.8, fiche 502) appliquée à (4.23) :

$$e\big(p^1,v(p^0,y^0)\big)=e\big(p^1,v(p^1,y^0+CV)\big)=y^0+CV \tag{4.24}$$

**Pas 2 — soustraire.** Comme $y^0=e\big(p^0,v(p^0,y^0)\big)$, en posant $v^0\equiv v(p^0,y^0)$ :

$$\boxed{\;CV=e(p^1,v^0)-e(p^0,v^0)\;} \tag{4.25}$$

**Pas 3 — le lemme de Shephard.** Puisque $\dfrac{\partial e}{\partial p}=q^h(p,v^0)$ :

$$CV=\int_{p^0}^{p^1}\frac{\partial e(p,v^0)}{\partial p}\,dp = \boxed{\;\int_{p^0}^{p^1} q^h(p,v^0)\,dp\;} \tag{4.26}$$

> *« Quand $p^1<p^0$, **$CV$ est l'opposé de l'aire à gauche de la courbe de demande hicksienne** pour le niveau d'utilité de base $v^0$, entre $p^1$ et $p^0$. […] **Ceci est pris en charge automatiquement dans (4.26)** parce qu'on doit changer le signe de l'intégrale quand on intervertit les bornes. »*

> ⚠️ **La subtilité du signe est entièrement contenue dans les bornes.** L'intégrale va de $p^0$ (l'ancien prix) à $p^1$ (le nouveau), **dans cet ordre**. Si $p^1<p^0$, on intègre « à l'envers » et l'intégrale est négative — ce qui donne bien $CV<0$.

### 7.6 Le problème pratique et le surplus du consommateur

> *« La variation compensatoire fait très bon sens comme **mesure en euros** de l'impact d'un changement de prix. **Malheureusement**, cependant, nous venons d'apprendre que $CV$ sera toujours l'aire à gauche d'une courbe de demande **hicksienne**, et **les demandes hicksiennes ne sont pas aussi facilement observables** que les marshalliennes. »*

**Le surplus du consommateur** — l'aire sous la demande **marshallienne** et au-dessus du prix :

$$\Delta CS\equiv CS(p^1,y^0)-CS(p^0,y^0)=\int_{p^1}^{p^0} q(p,y^0)\,dp \tag{4.27}$$

> *« $\Delta CS$ sera toujours **de signe opposé** à $CV$, et il divergera en valeur absolue de $CV$ chaque fois que la demande dépend du revenu, **à cause de l'effet de revenu** d'un changement de prix. »*

**La réponse du livre :**

> *« Tant que la réduction de prix **n'est pas trop grande**, notre économiste peut obtenir **une très bonne estimation** de la disposition à payer de chaque consommateur. »*

> **Le tableau des trois mesures, à garder en tête.**
>
> | Mesure | Sous quelle courbe | Observable ? |
> |---|---|---|
> | $CV$ (Hicks) | **hicksienne** au niveau $v^0$ | non |
> | $\Delta CS$ | **marshallienne** au revenu $y^0$ | **oui** |
> | Leur écart | l'**effet de revenu** | — |
>
> ⚠️ **L'écart s'annule exactement si le bien n'a pas d'effet de revenu**, c'est-à-dire si $\partial q/\partial y=0$ — le cas des préférences **quasi-linéaires**. C'est pourquoi l'analyse de surplus est exacte dans ce cadre et approximative ailleurs.

### 7.7 L'avertissement du livre sur la demande de marché

> *« **Un mot d'avertissement** : quand seule la **demande de marché** est connue, plutôt que les demandes individuelles, la variation du surplus du consommateur donnera une bonne approximation du **montant total** que les consommateurs sont disposés à céder. Cependant, **il se peut que certains soient disposés à céder plus que d'autres** (les gros consommateurs d'eau, par exemple). »*

> *« L'analyse de la demande de marché pourrait bien indiquer que **la disposition à payer totale excède le coût total du projet**, ce qui impliquerait qu'il y a **une façon de répartir le coût** entre consommateurs de sorte que **chacun soit mieux loti**. Cependant, **elle ne donnerait aucun indice sur la façon dont ce coût devrait être réparti**. »*

> ⚠️ **C'est la limite fondamentale de l'analyse de surplus agrégée.** Elle répond à *« le projet vaut-il la peine ? »* mais **jamais** à *« qui doit payer quoi ? »*. La seconde question est **normative** et relève du chapitre 6 (fiches 513-514).

## 🔴 Concept 8 — L'efficacité de l'issue concurrentielle (§4.3.2)

### 8.1 Les définitions

> *« En général, **quand il est possible de rendre quelqu'un mieux loti et personne moins bien loti**, nous disons qu'une **amélioration parétienne** peut être faite. **S'il n'y a aucun moyen de faire une amélioration parétienne**, nous disons que la situation est **Pareto-efficace**. »*

$$\boxed{\;\text{Pareto-efficace} \iff \text{on ne peut améliorer le sort de quelqu'un sans dégrader celui d'un autre}\;}$$

> *« L'idée d'efficacité de Pareto est **omniprésente en économie** et est souvent utilisée comme moyen d'évaluer la performance d'un système économique. »*

**La question posée :**

> *« **Lesquels, s'il y en a, des trois types de concurrence — parfaite, monopole, ou oligopole de Cournot — fonctionnent bien** au sens où ils produisent une issue Pareto-efficace ? »*

### 8.2 La reformulation décisive

> *« Notez que **la différence entre les trois formes de concurrence est simplement les prix et quantités qu'elles déterminent**. […] Notez cependant que **dans tous les cas, le couple prix-quantité est un point sur la courbe de demande de marché**. Par conséquent, nous pouvons tout aussi bien demander : **quels couples prix-quantité sur la courbe de demande donnent des issues Pareto-efficaces ?** »*

> **C'est une simplification majeure.** Au lieu de comparer trois modèles, on compare **des points sur une seule courbe**. Le résultat ne dépendra donc que du **couple $(p,q)$**, pas de la structure institutionnelle qui l'a produit.

**Le cadre simplifié.** *« Nous supposerons **un seul producteur et un seul consommateur**. (Les arguments se généralisent.) »* La figure 4.6 montre : la demande marshallienne $q(p,y^0)$, la hicksienne $q^h(p,v^0)$ avec $v^0=v(p^0,y^0)$, et le coût marginal $mc(q)$.

> *« Si cette firme se comportait en concurrent parfait, le couple d'équilibre serait déterminé par **l'intersection des deux courbes**, parce que **la courbe d'offre d'une firme concurrentielle coïncide avec sa courbe de coût marginal** au-dessus du minimum de son coût variable moyen. »* *(Le livre suppose ce minimum atteint en $q=0$.)*

### 8.3 La démonstration d'inefficacité — à savoir refaire

Partons du point $(p^0,q^0)$ sur la demande, **au-dessus** du point concurrentiel *(c'est le cas du monopole)*. Montrons qu'il **n'est pas** Pareto-efficace.

| Étape | Opération | Effet |
|---|---|---|
| 1 | **Baisser le prix** de $p^0$ à $p^1$ | le consommateur gagne |
| 2 | **Prélever** sur le consommateur le montant qu'il serait disposé à payer — c'est-à-dire $\\|CV\\|=A+B$ | ⟹ il est **exactement aussi bien** qu'avant, et demande $q^1$ selon sa hicksienne |
| 3 | **Faire produire** $q^1$ à la firme | il faut calculer l'effet sur son profit |

**Le calcul de la variation du profit :**

$$\begin{aligned} \big[p^1q^1-c(q^1)\big]-\big[p^0q^0-c(q^0)\big] &= \big(p^1q^1-p^0q^0\big)-\big(c(q^1)-c(q^0)\big)\\ &= \big(p^1q^1-p^0q^0\big)-\int_{q^0}^{q^1} mc(q)\,dq\\ &= \big[C+D-A\big]-D\\ &= \boxed{\,C-A\,} \end{aligned}$$

**La conclusion.**

> *« Si, après avoir fait ces changements, **nous donnons à la firme $A$ euros sur les $A+B$ collectés** auprès du consommateur, **la firme aura gagné strictement $C$ euros**. Nous pouvons alors **donner au consommateur les $B$ euros restants**, de sorte qu'au final **le consommateur ET la firme sont strictement mieux lotis**. »*

$$\boxed{\;\text{Partant de } (p^0,q^0), \text{ une simple REDISTRIBUTION rend les DEUX agents strictement mieux lotis} \;\Longrightarrow\; (p^0,q^0) \text{ n'était PAS Pareto-efficace.}\;}$$

> *« Un argument similaire s'applique aux couples situés **en dessous** du point concurrentiel [exercice 4.21]. Donc **le seul couple prix-quantité pouvant résulter en une issue Pareto-efficace est celui de la concurrence parfaite — et en effet il l'est**. »*

*(Le livre ne donne pas cet argument-là, renvoyant à l'analyse plus générale du chapitre 5, mais invite le lecteur à vérifier que le schéma ci-dessus ne fonctionne pas au point concurrentiel.)*

$$\boxed{\;\text{Ni le monopole ni l'oligopole de Cournot ne sont Pareto-efficaces.}\;}$$

### 8.4 L'avertissement du livre — capital

> *« Notez bien que **nous ne pouvons PAS conclure de cette analyse que forcer un monopole à se comporter autrement qu'il ne le choisirait doive nécessairement résulter en une amélioration parétienne**. Cela peut bien baisser le prix et augmenter la quantité offerte, mais **à moins que les consommateurs qui y gagnent ne compensent le monopoleur qui y perd, le changement ne sera pas Pareto-améliorant**. »*

> ⚠️ **C'est la distinction la plus importante du §4.3, et la plus souvent perdue.**
>
> | Énoncé | Vrai ? |
> |---|---|
> | Le monopole n'est pas Pareto-efficace |  |
> | Il **existe** une redistribution rendant tout le monde mieux loti |  |
> | Réglementer le monopole **est** une amélioration parétienne | **NON** — pas sans **compensation effective** |
>
> L'efficacité de Pareto dit qu'un gain est **possible**, jamais qu'une politique donnée le **réalise**.

## 🔴 Concept 9 — Efficacité et maximisation du surplus total (§4.3.3)

### 9.1 Le surplus du producteur

> *« Il est plus facile de trouver une façon **exacte** de mesurer la valeur en euros pour le producteur. Ce montant, appelé **surplus du producteur**, est simplement **la recette de la firme au-delà de ses coûts variables**. »*

$$PS(q)=p(q)\,q - tvc(q)$$

> ⚠️ **Notez l'asymétrie.** Le surplus du **consommateur** n'est qu'une **approximation** de sa disposition à payer (à cause de l'effet de revenu) ; le surplus du **producteur** est **exact**, parce que le profit est directement mesurable en euros.

### 9.2 La précaution du livre

> *« Or il semblerait que **pour obtenir une issue efficace, le surplus total — la somme des surplus du consommateur et du producteur — doive être maximisé**. Sinon, tous deux pourraient être mieux lotis en redistribuant pour augmenter le surplus total, puis en divisant le surplus plus grand entre eux. »*

> *« **Mais il faut prendre garde.** Le surplus du consommateur **surestime** les bénéfices en euros pour le consommateur chaque fois que des effets de revenu sont présents et que le bien est normal. **Malgré cela**, sous l'hypothèse que **la demande est décroissante** et que **le coût marginal de la firme est croissant**, **l'efficacité ne sera pas atteinte à moins que la somme des surplus ne soit effectivement maximisée**. »*

### 9.3 La démonstration

**Réécriture du surplus du consommateur.** Pour un couple $(p,q)$ sur la demande, avec $p=p(q)$ la demande inverse :

> *« Nous pouvons exprimer cette même aire comme **l'aire sous la courbe de demande inverse jusqu'à $q$, moins l'aire du rectangle $p(q)\,q$**. »*

$$CS=\int_0^q p(\xi)\,d\xi - p(q)\,q$$

**La somme.**

$$\begin{aligned} CS+PS &= \left[\int_0^q p(\xi)\,d\xi - p(q)q\right]+\Big[p(q)q-tvc(q)\Big]\\ &= \int_0^q p(\xi)\,d\xi - tvc(q)\\ &= \boxed{\;\int_0^q \big[\,p(\xi)-mc(\xi)\,\big]\,d\xi\;} \end{aligned}$$

*(La note 2 du livre justifie la dernière ligne : $\int_0^q mc(\xi)d\xi=c(q)-c(0)$, et $c(0)$ étant le coût fixe, la différence est le **coût variable total** $tvc(q)$.)*

> **Notez que le terme $p(q)\,q$ — le transfert du consommateur vers le producteur — DISPARAÎT.** Le surplus total ne dépend pas du prix ; c'est un pur **transfert** entre les deux parties.

**La condition du premier ordre :**

$$\boxed{\;p(q)=mc(q)\;}$$

> *« ce qui se produit **précisément à la quantité d'équilibre parfaitement concurrentielle** quand la demande est décroissante et les coûts marginaux croissants. »*

### 9.4 Le lien entre les deux sections

> *« En fait, **c'est cette relation entre prix et coût marginal qui est responsable du lien entre notre analyse de la section précédente et la présente**. **Chaque fois que prix et coût marginal diffèrent**, une amélioration parétienne comme celle du §4.3.2 peut être mise en œuvre. Et, comme nous venons de le voir, **chaque fois que prix et coût marginal diffèrent, le surplus total peut être augmenté**. »*

> **L'avertissement, répété :** *« Bien que l'efficacité de Pareto **exige** que le surplus total soit maximisé, **une amélioration parétienne ne résulte pas simplement de ce que le surplus total a augmenté**. **À moins que ceux qui gagnent ne compensent ceux qui perdent, le changement n'est pas Pareto-améliorant.** »*

> *« Nous avons vu que quand les marchés sont imparfaitement concurrentiels, l'équilibre implique généralement des **prix qui excèdent le coût marginal**. Cependant, "prix égale coût marginal" est une **condition nécessaire** au maximum de surplus. **Il ne devrait donc pas être surprenant que les issues d'équilibre de la plupart des marchés imparfaitement concurrentiels ne soient pas Pareto-efficaces.** »*

### 9.5 Exemple 4.4 — la perte sèche de l'oligopole de Cournot

**Le surplus total** quand chaque firme produit $q/J$ :

$$W(q)=\int_0^q (a-b\xi)\,d\xi - J\int_0^{q/J} c\,d\xi = aq-\frac b2 q^2 - cq \tag{E.1}$$

**Le maximum.** $W$ étant strictement concave, $W'(q^*)=a-bq^*-c=0$ donne

$$q^*=\frac{a-c}{b} \qquad\qquad \boxed{\;W(q^*)=\frac{(a-c)^2}{2b}\;} \tag{E.2}$$

**Le surplus à l'équilibre de Cournot**, où $\bar q=\dfrac{J(a-c)}{(J+1)b}$ :

$$W(\bar q)=\frac{(a-c)^2}{2b}\cdot\frac{J^2+2J}{(J+1)^2} \tag{E.3}$$

**La perte sèche :**

$$\boxed{\;W(q^*)-W(\bar q)=\frac{(a-c)^2}{2b\,(J+1)^2}\ >\ 0\;} \tag{E.4}$$

> *« Clairement $\bar q<q^*$, donc **l'oligopole de Cournot produit trop peu d'output d'un point de vue social**. […] Le surplus total **croît quand le nombre de firmes augmente**. […] Le surplus total monte vers son niveau maximal en (E.2) et **la perte sèche décline vers zéro** quand $J\to\infty$. »*

<details class="details--riche">
<summary>

**Vérifier (E.3) et (E.4)**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre donne les résultats sans le calcul intermédiaire.</span>

</div>

Posons $\Delta\equiv a-c$. Alors $q^*=\Delta/b$ et $\bar q=\dfrac{J\Delta}{(J+1)b}$.

**Réécrire $W$.** De (E.1), $W(q)=(a-c)q-\dfrac b2 q^2=\Delta q-\dfrac b2 q^2$.

**En $q^*$ :** $W(q^*)=\dfrac{\Delta^2}{b}-\dfrac{b}{2}\cdot\dfrac{\Delta^2}{b^2}=\dfrac{\Delta^2}{b}-\dfrac{\Delta^2}{2b}=\dfrac{\Delta^2}{2b}$

**En $\bar q$**, en posant $\theta\equiv\dfrac{J}{J+1}$ de sorte que $\bar q=\theta\,q^*$ :

$$W(\bar q)=\Delta\theta\frac{\Delta}{b}-\frac b2\theta^2\frac{\Delta^2}{b^2}=\frac{\Delta^2}{b}\left(\theta-\frac{\theta^2}{2}\right)=\frac{\Delta^2}{2b}\big(2\theta-\theta^2\big)$$

Or

$$2\theta-\theta^2=\frac{2J(J+1)-J^2}{(J+1)^2}=\frac{2J^2+2J-J^2}{(J+1)^2}=\frac{J^2+2J}{(J+1)^2} \quad$$

**La perte sèche.**

$$W(q^*)-W(\bar q)=\frac{\Delta^2}{2b}\left[1-\frac{J^2+2J}{(J+1)^2}\right]=\frac{\Delta^2}{2b}\cdot\frac{(J^2+2J+1)-(J^2+2J)}{(J+1)^2}=\frac{\Delta^2}{2b(J+1)^2} \quad$$

> **Trois lectures du résultat.** — $J=1$ (monopole) : perte sèche $=\dfrac{\Delta^2}{8b}$, soit **un quart** du surplus maximal $\dfrac{\Delta^2}{2b}$. — La perte décroît en $\dfrac{1}{(J+1)^2}$ : très vite au début, puis lentement. — $J\to\infty$ : perte $\to0$, **le surplus tend vers son maximum** — c'est la contrepartie en bien-être du résultat $\bar p\to c$ de (4.17).
>
> ⚠️ **Le calcul suppose que chaque firme produit $q/J$**, ce qui est vrai à l'équilibre de Cournot symétrique. Comme le coût marginal est **constant** ($=c$), la répartition entre firmes n'affecte de toute façon pas le coût total — le livre l'utilise implicitement.

</details>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| $J$ donné, offres et demandes | **Équilibre de court terme** | Sommer les offres, égaler à la demande |
| « nombre de firmes en longue période » | **Équilibre de long terme** | Résoudre **d'abord** le profit nul, **puis** l'équilibre du marché |
| Rendements d'échelle constants | **Indétermination** | Le prix est unique, $\hat J$ ne l'est **pas** |
| Un vendeur unique + demande inverse | **Monopole** | $mr=mc$, puis vérifier $\\|\varepsilon\\|\geq1$ |
| Élasticité donnée + « taux de marge » | **Indice de Lerner** | $\dfrac{p-mc}{p}=\dfrac1{\\|\varepsilon\\|}$ |
| $J$ firmes, choix de **quantités** | **Cournot** | CPO pour chaque firme, puis **symétrie** |
| Deux firmes, choix de **prix** | **Bertrand** | Pas de dérivation — argument de **sous-cotation** |
| Produits différenciés, entrée libre | **Concurrence monopolistique** | $mr=mc$ **et** profit nul ⟹ **tangence** |
| « combien serait-il prêt à payer ? » | **Variation compensatoire** | $CV=e(p^1,v^0)-e(p^0,v^0)=\int_{p^0}^{p^1}q^h\,dp$ |
| « surplus du consommateur » | **Aire marshallienne** | $\Delta CS=\int_{p^1}^{p^0}q(p,y^0)dp$ |
| « cette issue est-elle efficace ? » | **Pareto** | Comparer $p$ et $mc$ ; si $p\neq mc$, construire la redistribution |
| « perte sèche » | **Surplus total** | $\int_0^q\big[p(\xi)-mc(\xi)\big]d\xi$, maximisé en $p=mc$ |

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Trouver l'équilibre de long terme

1. **Écrire la fonction de profit** de la firme représentative, $\pi^j(p)$.
2. **Résoudre $\pi^j(\hat p)=0$** — cette équation ne contient **que $\hat p$**.
3. **Injecter $\hat p$** dans la condition d'équilibre $q^d(\hat p)=\hat J\,q^j(\hat p)$ pour obtenir $\hat J$.
4. **Vérifier** : $\hat J$ doit être un entier positif ; sinon, arrondir et discuter.

⚠️ **Si $\pi^j(p)=k\cdot g(p)$ avec $k$ la taille d'usine libre**, alors $\hat p$ est déterminé mais $\hat J$ **ne l'est pas** — seul le produit $\hat J\hat k$ l'est.

### Méthode 2 — Résoudre un monopole

1. Écrire $r(q)=p(q)\,q$ et calculer $mr(q)=p(q)\big[1+1/\varepsilon(q)\big]$.
2. Poser $mr(q^*)=mc(q^*)$ et résoudre.
3. **Vérifier $|\varepsilon(q^*)|\geq1$** — sinon le calcul est faux.
4. Calculer $p^*=p(q^*)$ et le taux de marge $\dfrac{p^*-mc}{p^*}=\dfrac1{|\varepsilon(q^*)|}$.

### Méthode 3 — Résoudre un Cournot

1. **Écrire le profit de la firme $j$** en fonction de **tous** les $q^k$.
2. **Dériver par rapport à $q^j$ seulement**, les autres étant **fixés** — c'est la définition de Nash.
3. **Constater la symétrie** : si le membre de droite ne dépend pas de $j$, toutes les firmes produisent le même $\bar q$.
4. Résoudre pour $\bar q$, puis calculer $\bar Q=J\bar q$, $\bar p$, $\bar\Pi^j$.
5. **Contrôles** : $J=1$ doit redonner le monopole ; $J\to\infty$ doit donner $\bar p\to c$.

### Méthode 4 — Calculer une variation compensatoire

1. **Écrire $v(p,y)$** ou $e(p,u)$ pour la préférence donnée.
2. Poser $v^0=v(p^0,y^0)$.
3. Appliquer $CV=e(p^1,v^0)-e(p^0,v^0)$.
4. **Vérifier le signe** : $CV<0$ si le prix baisse, $CV>0$ s'il monte.
5. Si l'on ne dispose que de la demande marshallienne, calculer $\Delta CS=\int_{p^1}^{p^0}q(p,y^0)dp$ et **signaler** que c'est une approximation valable pour de **petites** variations.

### Méthode 5 — Démontrer une inefficacité

1. **Identifier le point de départ** $(p^0,q^0)$ et le comparer au point où $p=mc$.
2. Si $p^0>mc(q^0)$ : construire la redistribution du §8.3 — – baisser le prix à $p^1$ ; – prélever $|CV|$ au consommateur (il reste indifférent) ; – calculer la variation de profit : $\Delta\pi=\big(p^1q^1-p^0q^0\big)-\int_{q^0}^{q^1}mc$ ; – **partager le surplus dégagé** entre les deux.
3. Conclure que **les deux** sont **strictement** mieux lotis.
4. **Ne pas conclure** qu'une réglementation serait Pareto-améliorante **sans compensation**.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Transposer symétrie et SDN de Slutsky à la demande de **marché** | *« **l'homogénéité est la SEULE restriction** sur la demande de marché d'un bien unique »* | Ne transposer que l'homogénéité |
| 2 | Oublier que la demande de marché dépend de la **répartition** du revenu | Elle en dépend, contrairement à la demande individuelle | Niveau **et** répartition |
| 3 | En longue période, chercher $\hat J$ avant $\hat p$ | La condition de **profit nul** ne contient que $\hat p$ | Résoudre le profit nul **d'abord** |
| 4 | Croire que $\hat J$ est toujours déterminé | Sous rendements **constants**, il ne l'est **pas** | Seul $\hat J\hat k$ est déterminé |
| 5 | Croire que $\hat p$ peut être indéterminé | La demande étant décroissante, $\hat p$ est **toujours** unique | Seul $\hat J$ peut être indéterminé |
| 6 | Écrire $mr=p$ | $mr=p\big(1+1/\varepsilon\big)<p$ car $\varepsilon<0$ | La recette marginale est **sous** le prix |
| 7 | Laisser le monopoleur dans la zone inélastique | $mc\geq0$ **impose** $\\|\varepsilon\\|\geq1$ | Vérifier systématiquement |
| 8 | Écrire l'indice de Lerner avec $\varepsilon$ au lieu de $\\|\varepsilon\\|$ | Le taux de marge est **positif** | $\dfrac{p-mc}{p}=\dfrac1{\\|\varepsilon\\|}$ |
| 9 | Croire que la collusion est un équilibre | (4.8)+(4.9) donnent $\partial\Pi^k/\partial q^k>0$ : **chacun a intérêt à dévier** | Il faut un concept **non coopératif** |
| 10 | Confondre (4.9) et (4.10) | (4.9) annule l'effet sur **toute l'industrie**, (4.10) sur **la seule firme $k$** | Elles donnent des vecteurs **différents** |
| 11 | Dans Cournot, dériver par rapport à l'output **total** | Chaque firme prend les autres comme **données** | Dériver par rapport à **$q^j$ seul** |
| 12 | Oublier l'argument de symétrie | Il permet de passer de $J$ équations à **une** | Le membre de droite de (4.14) ne dépend pas de $j$ |
| 13 | Dériver les profits dans Bertrand | *« les fonctions de profit sont **discontinues** »* | Argument de **sous-cotation**, pas de calcul |
| 14 | Croire qu'il faut beaucoup de firmes pour $p=c$ | Dans Bertrand, **deux suffisent** | Contraste radical avec Cournot |
| 15 | En concurrence monopolistique, oublier la condition de profit nul | Il en faut **deux** : (4.21) **et** (4.22) | D'où la **tangence** |
| 16 | Écrire $CV$ comme l'aire sous la **marshallienne** | $CV$ est l'aire à gauche de la **hicksienne** | $CV=\int_{p^0}^{p^1}q^h(p,v^0)dp$ |
| 17 | Se tromper de signe sur $CV$ | Le signe est porté par **l'ordre des bornes** | De $p^0$ vers $p^1$, dans cet ordre |
| 18 | Croire que $\Delta CS=CV$ | Ils divergent à cause de l'**effet de revenu** | Bonne approximation pour de **petites** variations |
| 19 | Utiliser la demande de marché pour répartir le coût | *« elle ne donnerait **aucun indice** sur la façon dont ce coût devrait être réparti »* | Elle répond au « combien », pas au « qui » |
| 20 | Conclure qu'un monopole réglementé est Pareto-amélioré | **Pas sans compensation effective** du monopoleur | Efficacité = gain **possible**, pas réalisé |
| 21 | Confondre « le surplus total augmente » et « amélioration parétienne » | Le second exige que les **perdants soient compensés** | Le livre le répète **deux fois** |
| 22 | Inclure le transfert $p(q)q$ dans le surplus total | Il **disparaît** dans la somme $CS+PS$ | $CS+PS=\int_0^q\big[p(\xi)-mc(\xi)\big]d\xi$ |
| 23 | Croire que $CS$ est une mesure exacte | Il **surestime** le bénéfice quand le bien est normal | $PS$, lui, est **exact** |
| 24 | Oublier les hypothèses du §9.2 | Le résultat exige demande **décroissante** et $mc$ **croissant** | Le livre les pose explicitement |

## 📌 Ultimate Review

**§4.1 — concurrence parfaite.**

$$q^d(p)=\sum_i q^i(p,\bar p,y^i) \qquad q^s(p)=\sum_j q^j(p,w)$$

**Court terme :** $q^d(p^*)=q^s(p^*)$, $J$ **fixé**.

**Long terme — deux conditions simultanées :**

$$q^d(\hat p)=\sum_{j=1}^{\hat J}q^j(\hat p) \qquad\qquad \pi^j(\hat p)=0 \tag{4.3}$$

⟹ $\hat p$ **et** $\hat J$ déterminés **conjointement**.

|  | Offre individuelle | $\hat p$ | $\hat J$ |
|---|---|---|---|
| Exemple 4.2 | croissante | $21$ | $50$ — **unique** |
| Exemple 4.3 | horizontale (rendements constants) | $4$ | **indéterminé** ($\hat J\hat k=147$) |

**§4.2 — concurrence imparfaite.**

**Monopole.** $mr(q^*)=mc(q^*)$ avec

$$mr(q)=p(q)\left[1+\frac1{\varepsilon(q)}\right] \qquad\Longrightarrow\qquad |\varepsilon(q^*)|\geq1 \qquad\text{et}\qquad \frac{p-mc}{p}=\frac1{|\varepsilon|}$$

**L'instabilité de la collusion.** (4.8) $\partial\Pi^j/\partial q^k<0$ + (4.9) maximisation jointe ⟹ $\partial\Pi^k/\partial q^k>0$ : **chacun a intérêt à dévier**.

$$\text{collusion : } \frac{\partial\Pi^k}{\partial q^k}+\sum_{j\neq k}\frac{\partial\Pi^j}{\partial q^k}=0 \quad \text{(4.9)} \qquad\qquad \text{Nash : } \frac{\partial\Pi^k}{\partial q^k}=0 \quad \text{(4.10)}$$

**Cournot** ($J$ firmes, $C=cq$, $p=a-bQ$, $a>c$) :

$$\bar q^j=\frac{a-c}{b(J+1)} \qquad \bar p-c=\frac{a-c}{J+1} \qquad \bar\Pi^j=\frac{(a-c)^2}{b(J+1)^2}$$

$$\lim_{J\to\infty}(\bar p-c)=0 \quad\text{— la concurrence parfaite comme CAS LIMITE}$$

**Bertrand** (deux firmes, bien homogène, choix de **prix**) :

$$\boxed{\;p_1=p_2=c, \quad \Pi^1=\Pi^2=0\;}$$

⚠️ **Deux firmes suffisent** — moteur : chacune a intérêt à **sous-coter**.

**Concurrence monopolistique.** Court terme : $mr^j=mc^j$. Long terme : $mr^j=mc^j$ **et** $\Pi^j=0$ ⟹ **tangence** demande/coût moyen.

**§4.3.1 — variation compensatoire.**

$$v(p^1,y^0+CV)=v(p^0,y^0) \tag{4.23}$$

$$CV=e(p^1,v^0)-e(p^0,v^0)=\int_{p^0}^{p^1}q^h(p,v^0)\,dp \tag{4.25-4.26}$$

$$\Delta CS=\int_{p^1}^{p^0}q(p,y^0)\,dp \tag{4.27}$$

Les deux divergent par l'**effet de revenu** ; $\Delta CS$ approxime bien $CV$ pour de **petites** variations.

**§4.3.2 — efficacité.** **Amélioration parétienne** : quelqu'un gagne, personne ne perd. **Pareto-efficace** : aucune n'est possible.

**La démonstration** : depuis $(p^0,q^0)$ au-dessus du point concurrentiel, baisser à $p^1$, prélever $A+B$, la variation de profit vaut $C-A$, donner $A$ à la firme et $B$ au consommateur ⟹ **les deux gagnent strictement**.

$$\boxed{\;\text{Seul le couple CONCURRENTIEL est Pareto-efficace.}\;}$$

⚠️ **Mais** : réglementer un monopole n'est **pas** une amélioration parétienne **sans compensation**.

**§4.3.3 — surplus total.**

$$CS+PS=\int_0^q\big[\,p(\xi)-mc(\xi)\,\big]\,d\xi \qquad\Longrightarrow\qquad \text{maximisé en } p(q)=mc(q)$$

Le transfert $p(q)q$ **disparaît**. $PS$ est **exact** ; $CS$ **surestime** quand le bien est normal.

**Exemple 4.4 — Cournot.**

$$W(q^*)=\frac{(a-c)^2}{2b} \qquad W(\bar q)=\frac{(a-c)^2}{2b}\cdot\frac{J^2+2J}{(J+1)^2} \qquad \text{perte sèche}=\frac{(a-c)^2}{2b(J+1)^2}$$

$J=1$ : perte $=\tfrac14$ du surplus maximal. $J\to\infty$ : perte $\to0$.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quelle est la seule restriction que la théorie impose à la demande de marché ?**

</summary>

L'**homogénéité de degré zéro** en tous les prix et le **vecteur** des revenus.

> *« Bien que plusieurs restrictions sur le système de demande d'un individu découlent de la maximisation d'utilité, **l'homogénéité est la SEULE restriction de ce genre sur la demande de marché d'un bien unique**. »*

⚠️ **Symétrie et semi-définie négativité de Slutsky ne se transmettent PAS à l'agrégat.**

</details>

<details class="details--riche">
<summary>

**2. En quoi la demande de marché diffère-t-elle structurellement d'une demande individuelle ?**

</summary>

> *« Alors que la demande d'un acheteur unique dépend du niveau de **son propre** revenu, la demande de marché dépend **à la fois du niveau agrégé de revenu ET de sa répartition entre acheteurs**. »*

Deux marchés ayant le même revenu **total** mais des répartitions différentes n'ont pas la même demande.

</details>

<details class="details--riche">
<summary>

**3. Énoncer les deux conditions de l'équilibre de long terme et dire ce qu'elles déterminent.**

</summary>

$$q^d(\hat p)=\sum_{j=1}^{\hat J}q^j(\hat p) \qquad\qquad \pi^j(\hat p)=0$$

> *« Contrairement au court terme, où le nombre de firmes est donné, **le prix d'équilibre $\hat p$ ET le nombre de firmes $\hat J$ doivent être déterminés CONJOINTEMENT**. »*

Deux inconnues, deux équations.

</details>

<details class="details--riche">
<summary>

**4. Pourquoi le profit de long terme doit-il être exactement nul ?**

</summary>

| Sens | Argument |
|---|---|
| $\pi\geq0$ | sinon les firmes en place **sortent** |
| $\pi\leq0$ | *« toutes les firmes ont **libre accès à la technologie les unes des autres** »* — sinon les extérieures **adopteraient** la technologie rentable et **entreraient** |

</details>

<details class="details--riche">
<summary>

**5. Dans quel ordre résout-on le système (4.3) ?**

</summary>

⚠️ **D'abord la condition de profit nul** — elle ne contient **que $\hat p$**. Ensuite la condition d'équilibre du marché, qui donne $\hat J$.

*Exemple 4.2 :* $\hat p^2-2\hat p-399=0$ ⟹ $\hat p=21$ ; puis $(1000/9)(39-21)=\hat J(2\cdot21-2)$ ⟹ $\hat J=50$.

</details>

<details class="details--riche">
<summary>

**6. Pourquoi le nombre de firmes est-il indéterminé sous rendements constants ?**

</summary>

Parce que le profit s'écrit $\pi^j(p,k)=k\big(g(p)\big)$ — **proportionnel à la taille d'usine**. Il s'annule pour un **unique** $\hat p$, mais **quelle que soit** $k$.

*Exemple 4.3 :* $\hat p=4$, puis $\hat J\hat k=147$ : une firme de taille $147$, deux de $147/2$, … **n'importe quel** $J$.

> *« Cette indétermination est **un phénomène commun à toutes les industries à rendements constants**. »*

⚠️ Le **prix**, lui, reste **unique** (la demande est décroissante).

</details>

<details class="details--riche">
<summary>

**7. Établir la formule de la recette marginale du monopoleur.**

</summary>

$$mr(q)=\frac{d}{dq}\big[p(q)q\big]=p(q)+\frac{dp}{dq}q=p(q)\left[1+\frac{dp}{dq}\frac{q}{p}\right]=\boxed{p(q)\left[1+\frac1{\varepsilon(q)}\right]}$$

où $\varepsilon(q)=\dfrac{dq}{dp}\dfrac pq<0$.

Comme $\varepsilon<0$, **$mr<p$ toujours**.

</details>

<details class="details--riche">
<summary>

**8. Pourquoi le monopoleur ne produit-il jamais dans la zone inélastique ?**

</summary>

De $mr=mc$ :

$$p(q^*)\left[1+\frac1{\varepsilon(q^*)}\right]=mc(q^*)\geq0$$

Comme $p>0$, le crochet doit être $\geq0$, donc $\dfrac1{\varepsilon}\geq-1$, donc $|\varepsilon(q^*)|\geq1$.

**Intuition :** dans la zone inélastique, **réduire** la quantité **augmente** la recette **et** réduit le coût. Aucune firme rationnelle n'y reste.

</details>

<details class="details--riche">
<summary>

**9. Énoncer l'indice de Lerner et l'interpréter.**

</summary>

$$\frac{p(q^*)-mc(q^*)}{p(q^*)}=\frac1{|\varepsilon(q^*)|}$$

> *« Le prix excédera le coût marginal **d'autant plus que la demande est inélastique**. »*

C'est une mesure du **pouvoir de marché** : nulle en concurrence parfaite ($|\varepsilon|=\infty$), maximale quand la demande est rigide.

</details>

<details class="details--riche">
<summary>

**10. Démontrer que la collusion n'est pas un équilibre.**

</summary>

Soit $\partial\Pi^j/\partial q^k<0$ pour $j\neq k$ (4.8). La maximisation **jointe** donne

$$\frac{\partial\Pi^k(\bar q)}{\partial q^k}+\underbrace{\sum_{j\neq k}\frac{\partial\Pi^j(\bar q)}{\partial q^k}}_{<\,0}=0 \qquad\Longrightarrow\qquad \frac{\partial\Pi^k(\bar q)}{\partial q^k}>0$$

> *« Chacune peut **augmenter son propre profit en s'écartant de son assignation** — pourvu que tous les autres continuent la leur. **Si même une seule firme succombe, $\bar q$ ne prévaudra pas.** »*

</details>

<details class="details--riche">
<summary>

**11. Quelle est la différence entre (4.9) et (4.10) ?**

</summary>

|  | Ce qu'on annule |
|---|---|
| **(4.9) collusion** | l'effet de $q^k$ sur le profit **de toute l'industrie** |
| **(4.10) Nash** | l'effet de $q^k$ sur le profit **de la seule firme $k$** |

> *« En général, elles détermineront des vecteurs d'output **tout à fait différents**. »*

**La collusion produit moins d'output** — d'où sa rentabilité et son instabilité.

</details>

<details class="details--riche">
<summary>

**12. Qu'est-ce qu'un équilibre de Nash, selon la formulation du livre ?**

</summary>

> *« Dans un équilibre de Nash, **chaque agent doit faire du mieux qu'il peut, étant données les actions de tous les autres agents**. Quand tous ont atteint un tel point, **aucun n'a d'incitation à changer unilatéralement** ce qu'il fait. »*

Dû à **John Nash (1951)**.

</details>

<details class="details--riche">
<summary>

**13. Dérouler la résolution de Cournot.**

</summary>

$\Pi^j=\big(a-b\sum_k q^k\big)q^j-cq^j$. La CPO **par rapport à $q^j$ seul** :

$$a-2b\bar q^j-b\sum_{k\neq j}\bar q^k-c=0 \qquad\Longleftrightarrow\qquad b\bar q^j=a-c-b\sum_{k=1}^J\bar q^k \tag{4.14}$$

**Le membre de droite ne dépend pas de $j$** ⟹ toutes les firmes produisent le même $\bar q$. Alors $b\bar q=a-c-Jb\bar q$ donne

$$\bar q=\frac{a-c}{b(J+1)}$$

</details>

<details class="details--riche">
<summary>

**14. Quelles sont les grandeurs d'équilibre de Cournot ?**

</summary>

$$\bar q^j=\frac{a-c}{b(J+1)} \qquad \bar Q=\frac{J(a-c)}{b(J+1)} \qquad \bar p=a-\frac{J(a-c)}{J+1} \qquad \bar\Pi^j=\frac{(a-c)^2}{b(J+1)^2}$$

$$\bar p-c=\frac{a-c}{J+1}>0$$

**Contrôles :** $J=1$ redonne le **monopole** ; $J\to\infty$ donne $\bar p\to c$.

</details>

<details class="details--riche">
<summary>

**15. Quelle interprétation de la concurrence parfaite le modèle de Cournot fournit-il ?**

</summary>

> *« Cette issue limite correspond **précisément à ce qu'on obtiendrait si un nombre fini quelconque de ces firmes se comportaient en concurrents parfaits**. Ainsi, ce modèle fournit **une autre interprétation de la concurrence parfaite** : elle peut être vue comme **un cas limite de la concurrence imparfaite**, quand le nombre de firmes devient grand. »*

</details>

<details class="details--riche">
<summary>

**16. Quel est le résultat de Bertrand, et pourquoi ne peut-on pas le démontrer par dérivation ?**

</summary>

$$p_1=p_2=c, \qquad \Pi^1=\Pi^2=0$$

> *« Parce que les fonctions de profit sont ici **discontinues**, nous ne pouvons pas argumenter en dérivant et en résolvant les conditions du premier ordre. À la place, **nous utilisons simplement du bon sens**. »*

Le moteur : **la firme au prix le plus bas sert tout le marché**, donc chacune a intérêt à **sous-coter**.

</details>

<details class="details--riche">
<summary>

**17. Dérouler la preuve d'unicité de l'équilibre de Bertrand.**

</summary>

**$(c,c)$ est un équilibre :** chacune sert la moitié à profit nul ; augmenter son prix ⟹ **plus aucune demande**.

**Il n'y en a pas d'autre :** soit $p_1>c$. Alors — $p_2\in(c,p_1]$ (seul choix rapportant un profit positif) ; — $p_2\neq p_1$ (sous-coter légèrement rapporte **plus** que partager) ; — donc $p_2<p_1$ **et**, par symétrie, $p_1<p_2$.

> *« Chaque firme devrait strictement sous-coter l'autre, **ce qui est impossible**. »* $\blacksquare$

</details>

<details class="details--riche">
<summary>

**18. Comparer Cournot et Bertrand.**

</summary>

|  | Variable stratégique | Firmes nécessaires pour $p=c$ |
|---|---|---|
| **Cournot** | la **quantité** | $J\to\infty$ |
| **Bertrand** | le **prix** | **2** |

> *« C'est frappant, et cela **contraste fortement** avec ce qui se produit dans le modèle de Cournot. »*

Le résultat de Bertrand dépend de : bien **homogène**, **pas de contrainte de capacité**, **une seule période**.

</details>

<details class="details--riche">
<summary>

**19. Quelles sont les deux conditions de l'équilibre de long terme en concurrence monopolistique ?**

</summary>

$$\frac{\partial q^j(p^*)}{\partial p_j}\big[mr^j-mc^j\big]=0 \quad \text{(4.21)} \qquad\qquad \Pi^j=0 \quad \text{(4.22)}$$

Soit $mr^j=mc^j$ **et** profit nul ⟹ **tangence entre la demande et le coût moyen**.

⚠️ **Conséquence :** à la tangence, la demande étant décroissante, le coût moyen l'est aussi — la firme produit **à gauche du minimum de son coût moyen** (« capacité excédentaire »).

</details>

<details class="details--riche">
<summary>

**20. Définir la variation compensatoire.**

</summary>

$$v(p^1,\,y^0+CV)=v(p^0,\,y^0)$$

> *« Ce changement de revenu, requis pour **maintenir l'utilité constante** à la suite d'un changement de prix, est appelé la **variation compensatoire**, originellement suggérée par **Hicks**. »*

$CV<0$ si le prix **baisse** · $CV>0$ s'il **monte**.

</details>

<details class="details--riche">
<summary>

**21. Démontrer que $CV$ est une intégrale de demande hicksienne.**

</summary>

Par l'identité $e\big(p,v(p,y)\big)=y$ appliquée à (4.23) :

$$e\big(p^1,v^0\big)=y^0+CV \qquad\text{et}\qquad y^0=e\big(p^0,v^0\big)$$

d'où $CV=e(p^1,v^0)-e(p^0,v^0)$. Puis, par le **lemme de Shephard** :

$$CV=\int_{p^0}^{p^1}\frac{\partial e(p,v^0)}{\partial p}\,dp=\int_{p^0}^{p^1}q^h(p,v^0)\,dp$$

⚠️ **Le signe est porté par l'ordre des bornes** : de $p^0$ (ancien) vers $p^1$ (nouveau).

</details>

<details class="details--riche">
<summary>

**22. Pourquoi utilise-t-on le surplus du consommateur plutôt que $CV$ ?**

</summary>

> *« $CV$ sera toujours l'aire à gauche d'une courbe de demande **hicksienne**, et **les demandes hicksiennes ne sont pas aussi facilement observables** que les marshalliennes. »*

$$\Delta CS=\int_{p^1}^{p^0}q(p,y^0)\,dp$$

Les deux divergent par l'**effet de revenu**, mais *« tant que la réduction de prix **n'est pas trop grande**, on obtient une **très bonne estimation** »*.

⚠️ L'écart s'annule exactement si $\partial q/\partial y=0$ — préférences **quasi-linéaires**.

</details>

<details class="details--riche">
<summary>

**23. Quel avertissement le livre donne-t-il sur l'usage de la demande de marché ?**

</summary>

> *« Il se peut que **certains soient disposés à céder plus que d'autres**. […] L'analyse de la demande de marché pourrait indiquer que la disposition à payer totale excède le coût, ce qui impliquerait qu'il y a **une façon de répartir le coût** de sorte que chacun soit mieux loti. Cependant, **elle ne donnerait aucun indice sur la façon dont ce coût devrait être réparti**. »*

Elle répond au **« combien »**, jamais au **« qui »**.

</details>

<details class="details--riche">
<summary>

**24. Définir amélioration parétienne et efficacité de Pareto.**

</summary>

**Amélioration parétienne** : *« quand il est possible de rendre quelqu'un **mieux loti et personne moins bien loti** »*.

**Pareto-efficace** : *« s'il n'y a **aucun moyen** de faire une amélioration parétienne »* — c'est-à-dire *« s'il n'y a aucun moyen de rendre quelqu'un mieux loti **sans rendre quelqu'un d'autre moins bien loti** »*.

</details>

<details class="details--riche">
<summary>

**25. Comment le livre reformule-t-il la question de l'efficacité ?**

</summary>

> *« La différence entre les trois formes de concurrence est **simplement les prix et quantités qu'elles déterminent**. […] Dans tous les cas, le couple prix-quantité est **un point sur la courbe de demande de marché**. Nous pouvons donc demander : **quels couples prix-quantité sur la courbe de demande donnent des issues Pareto-efficaces ?** »*

**On compare des points sur une seule courbe**, pas trois institutions.

</details>

<details class="details--riche">
<summary>

**26. Dérouler la démonstration d'inefficacité du monopole.**

</summary>

Partant de $(p^0,q^0)$ **au-dessus** du point concurrentiel :

1. **Baisser** le prix à $p^1$.
2. **Prélever** $A+B=|CV|$ au consommateur ⟹ il est **exactement aussi bien** qu'avant, et demande $q^1$.
3. **Calculer** la variation de profit : $$\big(p^1q^1-p^0q^0\big)-\int_{q^0}^{q^1}mc\,dq=\big[C+D-A\big]-D=C-A$$
4. **Donner $A$** à la firme (elle gagne $C$) et **$B$** au consommateur.

**Les deux sont strictement mieux lotis** ⟹ $(p^0,q^0)$ n'était pas Pareto-efficace. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**27. Quel avertissement accompagne ce résultat ?**

</summary>

> *« Nous ne pouvons **PAS** conclure que **forcer un monopole à se comporter autrement doive nécessairement résulter en une amélioration parétienne**. Cela peut baisser le prix et augmenter la quantité, mais **à moins que les consommateurs qui y gagnent ne compensent le monopoleur qui y perd, le changement ne sera pas Pareto-améliorant**. »*

⚠️ **L'efficacité de Pareto dit qu'un gain est POSSIBLE, jamais qu'une politique donnée le RÉALISE.**

</details>

<details class="details--riche">
<summary>

**28. Qu'est-ce que le surplus du producteur, et en quoi diffère-t-il du surplus du consommateur ?**

</summary>

$$PS=p(q)\,q-tvc(q) \qquad\text{— la recette au-delà des coûts VARIABLES}$$

|  | Exactitude |
|---|---|
| $PS$ | **exact** |
| $CS$ | **surestime** le bénéfice quand des effets de revenu sont présents et le bien normal |

</details>

<details class="details--riche">
<summary>

**29. Démontrer que le surplus total est maximisé en $p=mc$.**

</summary>

$$CS+PS=\left[\int_0^q p(\xi)d\xi-p(q)q\right]+\big[p(q)q-tvc(q)\big]=\int_0^q p(\xi)d\xi-tvc(q)=\int_0^q\big[p(\xi)-mc(\xi)\big]d\xi$$

*(la dernière ligne parce que $\int_0^q mc=c(q)-c(0)=tvc(q)$.)*

**CPO :** $p(q)=mc(q)$ — le point **concurrentiel**, quand la demande est décroissante et $mc$ croissant.

⚠️ **Le transfert $p(q)q$ disparaît** : le surplus total ne dépend pas du prix.

</details>

<details class="details--riche">
<summary>

**30. Quel est le lien entre le §4.3.2 et le §4.3.3 ?**

</summary>

> *« C'est **cette relation entre prix et coût marginal** qui est responsable du lien. **Chaque fois que prix et coût marginal diffèrent**, une amélioration parétienne peut être implémentée. Et **chaque fois que prix et coût marginal diffèrent, le surplus total peut être augmenté**. »*

$$p\neq mc \iff \text{amélioration parétienne possible} \iff \text{surplus total non maximisé}$$

</details>

<details class="details--riche">
<summary>

**31. Calculer la perte sèche de l'oligopole de Cournot.**

</summary>

$$W(q)=aq-\frac b2q^2-cq \qquad\Longrightarrow\qquad q^*=\frac{a-c}{b}, \quad W(q^*)=\frac{(a-c)^2}{2b}$$

À l'équilibre de Cournot $\bar q=\dfrac{J(a-c)}{(J+1)b}$ :

$$W(\bar q)=\frac{(a-c)^2}{2b}\cdot\frac{J^2+2J}{(J+1)^2} \qquad\Longrightarrow\qquad W(q^*)-W(\bar q)=\frac{(a-c)^2}{2b(J+1)^2}>0$$

**$J=1$ :** la perte vaut **un quart** du surplus maximal. **$J\to\infty$ :** elle tend vers **zéro**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La seule restriction sur la demande de marché ? | L'**homogénéité de degré zéro** — pas la symétrie ni la SDN |
| De quoi dépend la demande de marché, en plus des prix ? | Du **niveau** agrégé du revenu **et de sa répartition** |
| Équilibre de court terme ? | $q^d(p^*)=q^s(p^*)$ avec $J$ **fixé** |
| Les deux conditions du long terme ? | Marché équilibré **et** **profit nul** |
| Que déterminent-elles ? | **Conjointement** $\hat p$ **et** $\hat J$ |
| Pourquoi $\pi\leq0$ en longue période ? | **Libre accès à la technologie** des autres ⟹ entrée |
| Dans quel ordre résoudre (4.3) ? | **Profit nul d'abord** (il ne contient que $\hat p$) |
| Sous rendements constants, qu'est-ce qui est indéterminé ? | **$\hat J$** — seul le produit $\hat J\hat k$ est fixé |
| Et le prix ? | **Toujours unique** (demande décroissante) |
| Le monopole pur ? | Un vendeur, **pas de substituts proches**, **entrée bloquée** |
| La condition du monopoleur ? | $mr(q^*)=mc(q^*)$ |
| La formule de la recette marginale ? | $mr(q)=p(q)\big[1+1/\varepsilon(q)\big]$ |
| Pourquoi $mr<p$ ? | Parce que $\varepsilon<0$ |
| Où le monopoleur ne produit-il jamais ? | Dans la **zone inélastique** : $mc\geq0$ impose $\\|\varepsilon\\|\geq1$ |
| L'indice de Lerner ? | $\dfrac{p-mc}{p}=\dfrac1{\\|\varepsilon\\|}$ |
| Ce que concurrent parfait et monopoleur ont en commun ? | Ni l'un ni l'autre **ne se soucie des autres firmes** |
| Quand les firmes deviennent-elles interdépendantes ? | Peu de firmes · entrée **facile** · substituts **proches** |
| Pourquoi la collusion n'est-elle pas un équilibre ? | (4.8)+(4.9) ⟹ $\partial\Pi^k/\partial q^k>0$ : **chacun a intérêt à dévier** |
| La condition (4.9) ? | $\dfrac{\partial\Pi^k}{\partial q^k}+\sum_{j\neq k}\dfrac{\partial\Pi^j}{\partial q^k}=0$ — profit **joint** |
| La condition (4.10) ? | $\dfrac{\partial\Pi^k}{\partial q^k}=0$ — **Nash** |
| L'auteur de l'équilibre non coopératif ? | **John Nash (1951)** |
| L'auteur de l'oligopole en quantités ? | **Auguste Cournot (1838)** |
| L'output d'équilibre de Cournot ? | $\bar q^j=\dfrac{a-c}{b(J+1)}$ |
| Le taux de marge de Cournot ? | $\bar p-c=\dfrac{a-c}{J+1}$ |
| Le profit d'une firme de Cournot ? | $\dfrac{(a-c)^2}{b(J+1)^2}$ |
| Le pivot de la résolution de Cournot ? | L'**argument de symétrie** : (4.14) ne dépend pas de $j$ |
| Cournot quand $J=1$ ? | Le **monopole** |
| Cournot quand $J\to\infty$ ? | $\bar p\to c$ — **la concurrence parfaite comme cas limite** |
| L'auteur de l'oligopole en prix ? | **Joseph Bertrand (1883)** |
| Le résultat de Bertrand ? | $p_1=p_2=c$, profits **nuls** |
| Combien de firmes suffisent ? | **Deux** |
| Pourquoi ne peut-on pas dériver dans Bertrand ? | Les fonctions de profit sont **discontinues** |
| Le moteur du résultat ? | Chaque firme a intérêt à **sous-coter** l'autre |
| Concurrence monopolistique — le produit ? | **Différencié**, substituts **proches mais imparfaits** |
| Comment s'y produit l'entrée ? | Par l'introduction d'une **variante nouvelle** |
| Les deux conditions de long terme ? | $mr^j=mc^j$ **et** $\Pi^j=0$ |
| Ce qu'elles impliquent graphiquement ? | La **tangence** entre demande et coût moyen |
| La conséquence sur l'échelle ? | Production **à gauche du minimum** du coût moyen |
| L'essence de l'approche d'équilibre partiel ? | **Tous les autres prix restent fixes** |
| Qu'est-ce que le bien composite $m$ ? | Le revenu dépensé sur **tous les autres biens** |
| La définition de $CV$ ? | $v(p^1,y^0+CV)=v(p^0,y^0)$ |
| Son auteur ? | **Hicks** |
| $CV$ en fonction de la dépense ? | $e(p^1,v^0)-e(p^0,v^0)$ |
| $CV$ comme intégrale ? | $\displaystyle\int_{p^0}^{p^1}q^h(p,v^0)\,dp$ — l'aire à gauche de la **hicksienne** |
| Ce qui porte le signe de $CV$ ? | L'**ordre des bornes** d'intégration |
| Le surplus du consommateur ? | $\displaystyle\int_{p^1}^{p^0}q(p,y^0)\,dp$ — sous la **marshallienne** |
| Pourquoi $CV\neq\Delta CS$ ? | À cause de l'**effet de revenu** |
| Quand l'écart s'annule-t-il exactement ? | Si $\partial q/\partial y=0$ — préférences **quasi-linéaires** |
| Ce que la demande de marché ne dit PAS ? | **Comment répartir** le coût entre consommateurs |
| Amélioration parétienne ? | Quelqu'un gagne, **personne ne perd** |
| Pareto-efficace ? | **Aucune** amélioration parétienne n'est possible |
| Comment le livre reformule-t-il la question ? | Quels **couples $(p,q)$ sur la courbe de demande** sont efficaces ? |
| La variation de profit dans la démonstration ? | $\big(p^1q^1-p^0q^0\big)-\int_{q^0}^{q^1}mc=C-A$ |
| La conclusion ? | **Seul le couple concurrentiel** est Pareto-efficace |
| L'avertissement du livre ? | Réglementer un monopole n'est **pas** Pareto-améliorant **sans compensation** |
| Le surplus du producteur ? | $p(q)q-tvc(q)$ — la recette au-delà des coûts **variables** |
| Lequel des deux surplus est **exact** ? | Celui du **producteur** ; $CS$ **surestime** |
| Le surplus total ? | $\displaystyle\int_0^q\big[p(\xi)-mc(\xi)\big]d\xi$ |
| Que devient le transfert $p(q)q$ ? | Il **disparaît** de la somme |
| Où le surplus total est-il maximisé ? | En $p(q)=mc(q)$ |
| Les deux hypothèses de ce résultat ? | Demande **décroissante** et $mc$ **croissant** |
| Le lien §4.3.2 / §4.3.3 ? | $p\neq mc$ ⟺ amélioration possible ⟺ surplus non maximisé |
| Le surplus maximal dans l'exemple 4.4 ? | $\dfrac{(a-c)^2}{2b}$ |
| La perte sèche de Cournot ? | $\dfrac{(a-c)^2}{2b(J+1)^2}$ |
| Sa valeur pour $J=1$ ? | **Un quart** du surplus maximal |
| Son comportement quand $J\to\infty$ ? | Elle tend vers **zéro** |
