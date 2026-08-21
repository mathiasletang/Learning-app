# Fiche 518 — L'aléa moral, le problème principal-agent, et le bilan de l'économie de l'information

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 8 « Information Economics », §8.2 « Moral Hazard and the Principal-Agent Problem » et §8.3 « Information and Market Performance » (p. 413-421) |
| **Difficulté** | Avancé |
| **Temps d'étude estimé** | 135 min |
| **Prérequis** | Fiche 517 (le cadre du marché d'assurance, antisélection, signalement, criblage) · fiche 506 (aversion au risque, utilité VNM) · conditions de Kuhn-Tucker et multiplicateurs de Lagrange · fiche 502 (interprétation des multiplicateurs) |
| **Concepts clés** | Aléa moral, principal, agent, problème principal-agent, effort d'évitement d'accident, désutilité de l'effort, rapport de vraisemblance monotone, contrainte de participation, partage efficace du risque, assurance complète, contrainte d'incitation, contrainte de compatibilité incitative, multiplicateurs $\lambda$ et $\beta$, franchise croissante, bénéfice d'utilité de l'effort élevé, inefficacité de Pareto |
| **Poids à l'examen** | La **définition** de l'aléa moral et du problème principal-agent · l'**hypothèse 8.1** et sa lecture · la résolution **complète** du cas symétrique *(CPO, $\lambda>0$, $B_l=l$)* · la **contrainte d'incitation (8.15)** · l'argument **court** pour $e=0$ · le **lagrangien (8.17)** et l'équation **(8.22)** · les preuves **$\beta\neq0$**, **$\lambda>0$**, **$\beta>0$** · la conclusion **(8.23)** et son interprétation en **franchise croissante** · l'analyse d'**efficacité** en deux cas. |

## 🎯 Vue d'ensemble

```
LE FIL DU §8.2 ET DU §8.3 : quand c'est L'ACTION, et non le TYPE,
                            qui est cachee

  §8.2  L'ALEA MORAL

     « Les compagnies ne sont pas naives. Elles comprennent bien
       qu'une fois l'assurance achetee, le consommateur peut ne
       PAS conduire avec autant de PRUDENCE qu'avant. »

     DEFINITION : quand un PRINCIPAL a un interet dans l'action
     d'un AGENT, mais que cette action ne peut PAS etre observee,
     la situation implique un ALEA MORAL.

     LE PROBLEME PRINCIPAL-AGENT : concevoir un SCHEMA D'INCITATION
     pour que l'agent prenne une action APPROPRIEE.

  LE MODELE

     pertes l = 0, 1, ..., L      (l = 0 : PAS d'accident)
     probabilites pi_l(e) > 0,    somme sur l = 1
     effort e = 0 (bas) ou 1 (haut),  desutilite d(1) > d(0)
     u strictement croissante et concave, richesse w > L
     POLICE = (p, B_0, B_1, ..., B_L)
     -> le BENEFICE peut etre lie a la PERTE, pas a l'EFFORT

     HYPOTHESE 8.1  RAPPORT DE VRAISEMBLANCE MONOTONE

        pi_l(0) / pi_l(1)   STRICTEMENT CROISSANT en l

        « conditionnellement a la perte observee l, la probabilite
          RELATIVE que l'effort ait ete BAS AUGMENTE avec l »

  §8.2.1  INFORMATION SYMETRIQUE   (la reference)

     max  p - SOMME pi_l(e) B_l      s.c.  U(police, e) >= u_barre

     CPO ->  lambda > 0  ->  u'(w - p - l + B_l) = 1/lambda pour tout l
          ->  B_l - l est CONSTANT
          ->  on pose B_0 = 0 SANS PERTE
          ->  B_l = l  :  ASSURANCE COMPLETE a chaque niveau de perte

     « Aucune surprise : le consommateur est STRICTEMENT AVERSE
       au risque, la compagnie est NEUTRE. PARTAGE EFFICACE DU RISQUE. »

     L'ARBITRAGE sur e :
        e BAS  -> prix PLUS ELEVE  (car d(0) < d(1))
        e HAUT -> perte esperee PLUS FAIBLE  (par l'hypothese 8.1)

     -> QUEL QUE SOIT le meilleur e, la police est TOUJOURS
        l'assurance COMPLETE  ->  l'issue est PARETO-EFFICACE

  §8.2.2  INFORMATION ASYMETRIQUE

     UNE CONTRAINTE DE PLUS : la CONTRAINTE D'INCITATION (8.15)
        l'effort que la compagnie a EN TETE doit etre celui que
        le consommateur choisit VOLONTAIREMENT

     POUR e = 0 :  la contrainte se reduit a  d(0) >= d(1),
        qui tient STRICTEMENT  ->  MEME police que sous symetrie

     POUR e = 1 :  lagrangien a DEUX multiplicateurs, lambda et beta

        1 / u'(w - p + B_l - l)  =  lambda + beta [1 - pi_l(0)/pi_l(1)]

        beta different de 0   (sinon (8.21) echoue)
        lambda different de 0 (sinon le membre de droite change de signe)
        beta > 0              (sinon on contredit (8.21))

        -> par le rapport de vraisemblance monotone, le membre de
           droite est STRICTEMENT DECROISSANT

        =>  l - B_l  est STRICTEMENT CROISSANT en l          (8.23)

     « La police optimale NE fournit PAS l'assurance complete --
       elle specifie une FRANCHISE QUI AUGMENTE AVEC LA PERTE. »

     Le benefice d'utilite de l'effort eleve EGALISE exactement
     son cout d(1) - d(0).

  L'EFFICACITE, en deux cas :
     si e = 0 etait optimal sous symetrie  ->  RIEN ne change
                                          ->  toujours EFFICACE
     si e = 1 l'etait  ->  la compagnie peut BASCULER vers e = 0
                       ->  meme utilite pour le consommateur,
                           profits STRICTEMENT PLUS BAS
                       ->  INEFFICACE

  §8.3  LE BILAN

     ANTISELECTION : voitures d'occasion (Akerlof 1970),
                     marche du travail (Spence 1973)
     ALEA MORAL    : employeur-employe, medecin-patient,
                     ET MEME LES MARIAGES
                     (Grossman-Hart 1983, Holmstrom 1979a, 1982)

     LES REMEDES :  antiselection -> SIGNALEMENT ou CRIBLAGE
                    alea moral    -> CONTRATS INCITATIFS
```

> ⚠️ **Note de transcription — identique aux fiches 500-517.** Le PDF de cette section perd **la lettre $\lambda$** *(qui s'exporte « ) »)*, **le quantificateur $\forall$** *(qui s'exporte « + »)*, **le barré du $\neq$** *(ainsi « nous concluons que $\beta=0$ » signifie **$\beta\neq0$**, et « donc $\lambda=0$ » signifie **$\lambda\neq0$**)*, ainsi que $\sum$ et $\pi$ dans certaines positions. Les valeurs et les signes cités ici sont ceux que **la prose du livre nomme explicitement** et que **le calcul confirme**. **Réparation de transcription, non ajout de contenu.**

## 🔴 Concept 1 — L'aléa moral et le problème principal-agent

### 1.1 L'ouverture du §8.2

> *« **Les compagnies d'assurance ne sont pas naïves. Elles comprennent bien qu'une fois qu'un consommateur a acheté une assurance automobile, il peut ne PAS conduire avec autant de PRUDENCE qu'avant de l'avoir. De plus, l'incitation d'un consommateur à conduire prudemment est susceptible de DIMINUER AVEC LE MONTANT DE COUVERTURE.** »*

> *« **Malheureusement pour les compagnies, elles ne peuvent PAS observer l'EFFORT que les consommateurs dirigent vers une conduite sûre. Elles doivent donc STRUCTURER leurs polices de sorte que LES POLICES ELLES-MÊMES INCITENT les consommateurs à prendre un niveau de soin approprié.** »*

### 🔴 1.2 Les deux définitions à connaître

> **L'ALÉA MORAL.** *« **Quand un PRINCIPAL (comme la compagnie d'assurance) a un INTÉRÊT dans l'action prise par un AGENT (le consommateur), MAIS que l'action de l'agent NE PEUT PAS ÊTRE OBSERVÉE par le principal, la situation est dite impliquer un ALÉA MORAL.** »*

> **LE PROBLÈME PRINCIPAL-AGENT.** *« **Le problème principal-agent est, POUR LE PRINCIPAL, DE CONCEVOIR UN SCHÉMA D'INCITATION de sorte que l'agent prenne une action APPROPRIÉE.** »*

### 🔴 1.3 Ce qui distingue l'aléa moral de l'antisélection

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — la distinction à ne jamais perdre.</span>

|  | **Antisélection** *(§8.1)* | **Aléa moral** *(§8.2)* |
|---|---|---|
| Ce qui est **caché** | **UN TYPE** — une caractéristique **exogène** *(la probabilité $\pi_i$)* | **UNE ACTION** — une variable **choisie** *(l'effort $e$)* |
| Quand l'information manque | **AVANT** le contrat | **APRÈS** le contrat |
| La conséquence | Le pool se **dégrade** quand le prix monte | L'agent **relâche son effort** une fois couvert |
| Le remède | **Signalement** ou **criblage** | **Contrats INCITATIFS** *(la franchise)* |

Le livre lui-même les traite comme **deux sections distinctes du même chapitre**, et récapitule cette opposition au §8.3.

</div>

## 🔴 Concept 2 — Le modèle formel

### 2.1 Le cadre

> *« **Pour garder les choses simples, le modèle implique UNE SEULE compagnie et UN SEUL consommateur.** »*

**Les niveaux de perte :**

> *« Le consommateur pourrait encourir un accident résultant en **un montant de perte VARIABLE**. Il y a **$L$ niveaux de pertes**, allant de **1 dollar** à **$L$ dollars**, selon la **SÉVÉRITÉ** de l'accident. **Il est aussi possible qu'un accident soit ÉVITÉ tout à fait.** »*

⚠️ *« **Il est commode de se référer à cette dernière possibilité comme un accident résultant en une perte de ZÉRO dollar.** »*

$$l\in\{0,1,\dots,L\}$$

### 2.2 Les probabilités et l'effort

$$\pi_l(e)>0 \qquad\text{avec}\qquad \sum_{l}\pi_l(e)=1 \quad\text{pour chaque } e$$

où **$e$ est le montant d'effort dirigé vers une conduite sûre**.

> *« Comme discuté, **il est naturel de penser ces probabilités comme étant AFFECTÉES par de tels efforts**. »*

⚠️ **Deux niveaux d'effort seulement** : $e=0$ *(effort BAS)* et $e=1$ *(effort HAUT)*.

### 2.3 Les préférences

| L'élément | Sa spécification |
|---|---|
| L'utilité de richesse | $u(\cdot)$ **VNM, strictement croissante, strictement concave** |
| La richesse initiale | $w>L$ |
| La désutilité de l'effort | $d(e)$, avec $d(1)>d(0)$ |
| L'utilité totale | $u(\cdot)-d(e)$ |

> *(Note de bas de page 11.)* *« **Toute l'analyse à suivre se GÉNÉRALISE au cas où l'utilité prend la forme $u(w,e)$, où $u(w,0)>u(w,1)$ pour TOUS les niveaux de richesse $w$.** »*

### 🔴 2.4 Ce que la compagnie observe — et ce qu'elle peut donc contractualiser

> *« Nous supposons que **la compagnie PEUT observer LE MONTANT DE LA PERTE $l$ due à un accident, MAIS PAS le montant d'EFFORT $e$ d'évitement d'accident. Par conséquent, LA COMPAGNIE NE PEUT LIER LE BÉNÉFICE QU'AU MONTANT DE LA PERTE.** »*

$$\boxed{\;\textbf{Une POLICE est un } (L+2)\text{-uplet : } \ \big(p,\ B_0,\ B_1,\ \dots,\ B_L\big)\;}$$

> *« où $p$ désigne **le prix payé à la compagnie** en échange de la garantie de **$B_l$ dollars si une perte de $l$ dollars survient** »*.

> *« **La question d'intérêt est celle-ci : QUEL TYPE DE POLICE la compagnie offrira-t-elle, et QUELLES SONT SES PROPRIÉTÉS D'EFFICACITÉ ?** »*

## 🔴 Concept 3 — L'hypothèse 8.1 : le rapport de vraisemblance monotone

### 3.1 L'énoncé

> *« Pour saisir l'idée qu'**un effort plus élevé résulte en une probabilité PLUS FAIBLE que le consommateur ait un accident SÉRIEUX (i.e. COÛTEUX)**, nous faisons l'hypothèse suivante. »*

> **HYPOTHÈSE 8.1 — Rapport de vraisemblance monotone**
>
> $$\boxed{\;\frac{\pi_l(0)}{\pi_l(1)} \quad\textbf{est STRICTEMENT CROISSANT en } l\in\{0,1,\dots,L\}\;}$$

### 🔴 3.2 Sa lecture, mot pour mot

> *« La propriété du rapport de vraisemblance monotone dit que **CONDITIONNELLEMENT à l'observation de la perte $l$, LA PROBABILITÉ RELATIVE QUE L'EFFORT BAS AIT ÉTÉ FOURNI, PAR RAPPORT À L'EFFORT ÉLEVÉ, AUGMENTE AVEC $l$**. »*

> *« Ainsi, **on serait PLUS DISPOSÉ À PARIER que le consommateur a fourni un effort BAS quand la perte observée est PLUS ÉLEVÉE**. »*

### 3.3 Les conséquences que le livre en tirera

| Où | Ce que l'hypothèse 8.1 donne |
|---|---|
| **§8.2.1** | *« exiger un effort plus élevé **RÉDUIT LA PERTE ESPÉRÉE** due à un accident »* |
| **§8.2.2** | Il existe $l$ et $l'$ avec $\pi_l(0)>\pi_l(1)$ et $\pi_{l'}(0)<\pi_{l'}(1)$ ⟹ **le crochet de (8.22) change de signe** |
| **§8.2.2** | La **monotonie du membre de droite de (8.22)**, d'où **(8.23)** |
| **Exercice 8.13** | $\displaystyle\sum_l\pi_l(0)x_l>\sum_l\pi_l(1)x_l$ **pour toute suite croissante** $x_1<x_2<\dots<x_L$ |

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — pourquoi ce résultat d'exercice est l'outil central.</span>

L'exercice 8.13 dit exactement que **la distribution sous effort BAS DOMINE au sens des espérances de fonctions croissantes** celle sous effort élevé. Le livre l'utilise **deux fois** au §8.2.2 : d'abord pour contredire $\beta<0$ *(là $u(w-p+B_l-l)$ est croissante en $l$)*, ensuite pour établir que **le bénéfice d'utilité de l'effort élevé est strictement positif** *(là $u(w-p-l+B_l)$ est décroissante en $l$, donc l'inégalité s'inverse)*.

</div>

## 🔴 Concept 4 — §8.2.1 : la solution sous information symétrique

### 4.1 Le problème

> *« Pour comprendre l'impact de l'inobservabilité, **nous considérons d'abord le cas où la compagnie PEUT observer l'effort. Par conséquent, elle peut offrir une police qui ne paie de bénéfices QUE SI un niveau d'effort particulier a été fourni. EN EFFET, LA COMPAGNIE PEUT CHOISIR LE NIVEAU D'EFFORT DU CONSOMMATEUR.** »*

$$\max_{e,\,p,\,B_0,\dots,B_L}\ p-\sum_{l=0}^{L}\pi_l(e)B_l \tag{8.7}$$

$$\text{s.c.}\qquad \sum_{l=0}^{L}\pi_l(e)\,u(w-p-l+B_l)-d(e)\ \geq\ \bar u$$

où $\bar u$ est **l'utilité de RÉSERVATION** du consommateur.

> *« La compagnie choisit une police **et un niveau d'effort** pour maximiser ses profits espérés **sous la contrainte que la police donne au consommateur AU MOINS son utilité de réservation** — donc qu'**il soit DISPOSÉ à accepter les termes de la police ET À FOURNIR l'effort requis**. »*

> *(Note de bas de page 12.)* *« **Parce que le consommateur peut toujours choisir de ne PAS acheter d'assurance, $\bar u$ doit être au moins aussi grand que $\max_{e\in\{0,1\}}\sum_l\pi_l(e)u(w-l)-d(e)$. Cependant, $\bar u$ peut être STRICTEMENT plus grand si, par exemple, D'AUTRES compagnies offrent des polices au consommateur.** »*

### 4.2 La méthode

> *« **La manière la plus facile de résoudre (8.7) est de SUPPOSER $e\in\{0,1\}$ FIXÉ, puis de former le lagrangien considéré comme fonction de $p,B_0,\dots,B_L$ SEULEMENT.** »*

$$\mathcal{L}=p-\sum_{l=0}^{L}\pi_l(e)B_l-\lambda\Big[\bar u-\sum_{l=0}^{L}\pi_l(e)u(w-p-l+B_l)+d(e)\Big]$$

### 4.3 Les conditions du premier ordre

$$\frac{\partial\mathcal{L}}{\partial p}=1-\lambda\sum_{l=0}^{L}\pi_l(e)\,u'(w-p-l+B_l)=0 \tag{8.8}$$

$$\frac{\partial\mathcal{L}}{\partial B_l}=-\pi_l(e)+\lambda\pi_l(e)\,u'(w-p-l+B_l)=0 \qquad \forall\,l\geq0 \tag{8.9}$$

$$\frac{\partial\mathcal{L}}{\partial\lambda}=\bar u-\sum_{l=0}^{L}\pi_l(e)u(w-p-l+B_l)+d(e)\ \leq\ 0 \tag{8.10}$$

*« où (8.10) tient avec égalité si $\lambda\neq0$. »*

### 🔴 4.4 Le comptage des équations — le pas qui autorise $B_0=0$

> *« Notez que **la PREMIÈRE condition, (8.8), est REDONDANTE parce qu'elle est IMPLIQUÉE par les $(L+1)$ équations de (8.9)**. Ainsi, **ce qui précède est un système d'AU PLUS $(L+2)$ équations INDÉPENDANTES en $(L+3)$ INCONNUES**. »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — vérifions la redondance.</span>

Multiplions (8.9) par $\lambda$ : on obtient $\lambda\pi_l(e)u'(\cdot)=\pi_l(e)/\lambda\cdot\lambda=\pi_l(e)$… plus simplement, (8.9) donne $\lambda\,u'(w-p-l+B_l)=1$ pour chaque $l$ *(en divisant par $\pi_l(e)>0$)*. En multipliant par $\pi_l(e)$ et en sommant sur $l$, on retrouve $\lambda\sum_l\pi_l(e)u'(\cdot)=\sum_l\pi_l(e)=1$, qui **est** (8.8).

</div>

### 4.5 La résolution

<details class="details--riche">
<summary>

**Les quatre pas**

</summary>

**Pas 1 — $\lambda>0$ et l'égalisation des utilités marginales.**

> *« **Les égalités de (8.9) impliquent que $\lambda>0$** et que »*

$$u'(w-p-l+B_l)=\frac{1}{\lambda} \qquad \forall\,l\geq0$$

⚠️ **Conséquence immédiate** : *« **Dès lors, $B_l-l$ doit être CONSTANT** pour tout $l=0,1,\dots,L$. »* — car $u'$ est **strictement décroissante** *(concavité stricte)*, donc **injective**.

**Pas 2 — la contrainte est saturée.**

> *« **Parce que $\lambda>0$, la condition du premier ordre associée à la contrainte doit tenir AVEC ÉGALITÉ** »*, ce qui donne

$$u(w-p-l+B_l)=d(e)+\bar u \qquad \forall\,l\geq0 \tag{8.11}$$

**Pas 3 — normaliser $B_0=0$.**

> *« Parce qu'il n'y a que $(L+2)$ équations indépendantes et $(L+3)$ inconnues, **nous pouvons poser $B_0=0$ SANS AUCUNE PERTE**. »*

> *(Note 13.)* *« En effet, **il était clair dès le départ que poser $B_0=0$ était INOFFENSIF, parce que des changements de $B_0$ peuvent toujours être COMPENSÉS par des changements correspondants du prix $p$ et des bénéfices $B_1,\dots,B_L$ SANS changer l'utilité du consommateur ni les profits de la compagnie.** »*

**Pas 4 — conclure.**

Avec $l=0$ dans (8.11), on obtient **une équation en $p$ seul**, qui **détermine $p$**. Et puisque $B_l-l$ est **constant** avec $B_0-0=0$ :

$$\boxed{\;B_l=l \qquad\textbf{pour tout } l=0,1,\dots,L\;}$$

</details>

### 🔴 4.6 L'interprétation

> *« Par conséquent, **POUR L'UN OU L'AUTRE niveau d'effort $e\in\{0,1\}$, la solution sous information symétrique fournit L'ASSURANCE COMPLÈTE au consommateur À CHAQUE NIVEAU DE PERTE.** »*

> *« **Ceci n'est PAS une surprise parce que LE CONSOMMATEUR EST STRICTEMENT AVERSE AU RISQUE et LA COMPAGNIE EST NEUTRE AU RISQUE. C'est simplement un exemple de PARTAGE EFFICACE DU RISQUE.** »*

> *« En outre, **le prix facturé ÉGALISE l'utilité du consommateur au niveau d'effort requis avec son UTILITÉ DE RÉSERVATION** »* — la contrainte de participation est **saturée**.

## 🔴 Concept 5 — L'arbitrage sur l'effort et l'efficacité

### 5.1 L'optimisation sur $e$

Les bénéfices optimaux étant $B_l=l$, (8.11) donne le **prix optimal $p(e)$** implicitement par

$$\boxed{\;u\big(w-p(e)\big)=d(e)+\bar u\;} \tag{8.12}$$

La compagnie choisit alors $e\in\{0,1\}$ pour maximiser

$$p(e)-\sum_{l=0}^{L}\pi_l(e)\,l$$

### 🔴 5.2 L'arbitrage, dans les deux sens

> *« **Notez l'ARBITRAGE entre exiger un effort ÉLEVÉ ou FAIBLE.** »*

| L'option | Son avantage | Sa source |
|---|---|---|
| **Effort BAS** | *« permet à la compagnie de **facturer un PRIX PLUS ÉLEVÉ**, augmentant les profits »* | **Parce que $d(0)<d(1)$**, (8.12) donne $p(0)>p(1)$ *(exercice 8.14(a))* |
| **Effort HAUT** | *« **RÉDUIT LA PERTE ESPÉRÉE** due à un accident, et augmente donc aussi les profits »* | **Par la propriété du rapport de vraisemblance monotone** *(voir les exercices)* |

> *« **On doit simplement vérifier QUEL niveau d'effort est le meilleur dans chaque cas spécifique.** »*

### 5.3 Le point qui compte pour la suite

> ⚠️ *« **CE QUI EST IMPORTANT ICI, C'EST QUE QUEL QUE SOIT LE NIVEAU D'EFFORT LE MEILLEUR POUR LA FIRME, LA POLICE MAXIMISANT LE PROFIT IMPLIQUE TOUJOURS L'ASSURANCE COMPLÈTE. Ceci est SIGNIFICATIF et implique que L'ISSUE EST PARETO-EFFICACE.** »*

> *« **Nous avons vu ce genre de résultat avant, nous n'en donnerons donc pas une autre preuve.** »*

## 🔴 Concept 6 — §8.2.2 : la contrainte d'incitation

### 6.1 La reformulation du problème

> *« Nous tournons maintenant notre attention vers **le cas PLUS INTÉRESSANT où le choix d'effort NE PEUT PAS être observé**. La compagnie continue de chercher la police maximisant ses profits. **Mais si elle ne peut PLUS observer l'effort, COMMENT doit-elle s'y prendre pour choisir la police optimale ?** »*

> ⚠️ *« **Pensez au problème ainsi. LA COMPAGNIE DOIT CONCEVOIR UNE POLICE AVEC UN NIVEAU D'EFFORT DÉSIRÉ EN TÊTE. Cependant, parce que l'effort ne peut pas être observé, LA COMPAGNIE DOIT GARANTIR QUE LA NATURE MÊME DE LA POLICE REND OPTIMAL POUR LE CONSOMMATEUR DE CHOISIR VOLONTAIREMENT LE NIVEAU D'EFFORT DÉSIRÉ.** »*

### 6.2 Le problème complet

$$\max_{e,\,p,\,B_0,\dots,B_L}\ p-\sum_{l=0}^{L}\pi_l(e)B_l \tag{8.13}$$

$$\text{s.c.}\qquad \sum_{l=0}^{L}\pi_l(e)\,u(w-p-l+B_l)-d(e)\ \geq\ \bar u \tag{8.14}$$

$$\sum_{l=0}^{L}\pi_l(e)\,u(w-p-l+B_l)-d(e)\ \geq\ \sum_{l=0}^{L}\pi_l(e')\,u(w-p-l+B_l)-d(e') \tag{8.15}$$

**où $e,e'\in\{0,1\}$ et $e\neq e'$.**

### 🔴 6.3 Les noms et les rôles des deux contraintes

| La contrainte | Son nom | Ce qu'elle garantit |
|---|---|---|
| **(8.14)** | **Contrainte de PARTICIPATION** *(ou de rationalité individuelle)* | Le consommateur **accepte** la police |
| **(8.15)** | **Contrainte d'INCITATION** *(ou de compatibilité incitative)* | *« elle garantit que **$e$, le niveau d'effort que la compagnie a EN TÊTE en calculant ses profits, est LE MÊME que celui EFFECTIVEMENT CHOISI par le consommateur**, car elle garantit que **ce niveau MAXIMISE l'espérance d'utilité du consommateur étant donnée la police proposée** »* |

$$\boxed{\;\textbf{Sous asymétrie, on n'ajoute qu'UNE chose : la contrainte (8.15).}\;}$$

### 6.4 La méthode

> *« Nous suivrons **la même procédure qu'avant** : **fixer d'abord $e$**, déterminer pour ce niveau **la FORME de la police optimale**. Une fois fait pour les deux niveaux, **il s'agit simplement de vérifier LEQUEL, avec sa police associée, maximise les profits**. »*

## 🔴 Concept 7 — La police optimale pour $e=0$

### 🔴 7.1 L'argument court — un raisonnement à savoir reproduire

> *« Bien que nous puissions former le lagrangien, **il est PLUS SIMPLE de prendre une route DIFFÉRENTE**. »*

| Pas | Le raisonnement |
|---|---|
| **1** | *« Rappelez-vous que **SI la contrainte d'incitation était ABSENTE**, la police optimale pour $e=0$ est donnée par »* $$u(w-p)=d(0)+\bar u, \qquad B_l=l \quad\forall l \tag{8.16}$$ |
| **2** | *« **Ajouter la contrainte d'incitation NE PEUT PAS AUGMENTER les profits maximisés.** »* |
| **3** | *« Donc, **SI la solution de (8.16) SATISFAIT la contrainte d'incitation, alors elle DOIT ÊTRE la police optimale désirée.** »* |
| **4** | *« Mais **clairement, elle la satisfait**. Étant donnée la police (8.16), **la contrainte d'incitation pour $e=0$ SE RÉDUIT À** »* $$d(0)\ \geq\ d(1)$$ *« **qui tient (STRICTEMENT) par hypothèse** »* |

### 7.2 Pourquoi la contrainte se réduit ainsi

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours).</span>

Avec $B_l=l$, l'argument $w-p-l+B_l=w-p$ **ne dépend plus de $l$**. Les deux membres de (8.15) deviennent alors

</div>

$$\Big[\sum_l\pi_l(0)\Big]u(w-p)-d(0) \quad\text{et}\quad \Big[\sum_l\pi_l(1)\Big]u(w-p)-d(1)$$

et comme **les deux sommes valent 1**, la contrainte se réduit exactement à $-d(0)\geq-d(1)$, c'est-à-dire $d(0)\leq d(1)$ — **vrai par hypothèse**.

⚠️ **L'assurance complète rend le consommateur TOTALEMENT indifférent aux probabilités** — il n'a donc **aucune raison** de fournir l'effort coûteux.

### 7.3 La conclusion

> *« Par conséquent, **INDUIRE LE CONSOMMATEUR À FOURNIR UN EFFORT BAS d'une manière qui maximise les profits exige de la compagnie qu'elle offre LA MÊME POLICE QUE SI L'EFFORT ÉTAIT OBSERVABLE.** »*

$$\boxed{\;\text{Pour } e=0 : \ \textbf{l'asymétrie d'information NE COÛTE RIEN.}\;}$$

## 🔴 Concept 8 — La police optimale pour $e=1$ : le lagrangien

### 8.1 Le montage

On fixe $e=1$ dans (8.13) ; **la maximisation porte sur $p,B_0,\dots,B_L$** ; et **puisque $e=1$, on a $e'=0$ dans la contrainte d'incitation**.

$$\mathcal{L}=p-\sum_{l=0}^{L}\pi_l(1)B_l-\lambda\Big[\bar u-\sum_{l=0}^{L}\pi_l(1)u(w-p-l+B_l)+d(1)\Big] \tag{8.17}$$

$$\qquad-\ \beta\Big[\sum_{l=0}^{L}\pi_l(0)u(w-p-l+B_l)-d(0)-\Big(\sum_{l=0}^{L}\pi_l(1)u(w-p-l+B_l)-d(1)\Big)\Big]$$

*« où $\lambda$ et $\beta$ sont **les multiplicateurs correspondant aux contraintes (8.14) et (8.15)** »*.

### 8.2 Les conditions du premier ordre

$$\frac{\partial\mathcal{L}}{\partial p}=1-\lambda\sum_{l=0}^{L}\Big(\pi_l(1)+\beta\big(\pi_l(1)-\pi_l(0)\big)\Big)u'(w-p-l+B_l)=0 \tag{8.18}$$

$$\frac{\partial\mathcal{L}}{\partial B_l}=-\pi_l(1)+\Big[\lambda\pi_l(1)+\beta\big(\pi_l(1)-\pi_l(0)\big)\Big]u'(w-p-l+B_l)=0 \quad\forall\,l \tag{8.19}$$

$$\frac{\partial\mathcal{L}}{\partial\lambda}=\bar u-\sum_{l}\pi_l(1)u(w-p-l+B_l)+d(1)\ \leq\ 0 \tag{8.20}$$

$$\frac{\partial\mathcal{L}}{\partial\beta}=\sum_{l=0}^{L}\big(\pi_l(0)-\pi_l(1)\big)u(w-p-l+B_l)-d(0)+d(1)\ \leq\ 0 \tag{8.21}$$

*« où (8.20) et (8.21) tiennent **avec égalité** si $\lambda\neq0$ et $\beta\neq0$, respectivement. »*

> *« **Comme dans le problème précédent, la première (8.18) est IMPLIQUÉE par les $L+1$ suivantes. Cette redondance nous permettra à nouveau de poser $B_0=0$ sans perte de généralité.** »*

### 🔴 8.3 L'équation maîtresse (8.22)

En divisant (8.19) par $\pi_l(1)>0$ et en inversant :

$$\boxed{\;\frac{1}{u'(w-p+B_l-l)}\ =\ \lambda\ +\ \beta\left[1-\frac{\pi_l(0)}{\pi_l(1)}\right]\;} \tag{8.22}$$

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — la dérivation.</span>

De (8.19) : $\big[\lambda\pi_l(1)+\beta(\pi_l(1)-\pi_l(0))\big]u'(\cdot)=\pi_l(1)$, donc

$$\frac{1}{u'(\cdot)}=\frac{\lambda\pi_l(1)+\beta\big(\pi_l(1)-\pi_l(0)\big)}{\pi_l(1)}=\lambda+\beta\left(1-\frac{\pi_l(0)}{\pi_l(1)}\right) \quad\checkmark$$

**Tout le reste du §8.2.2 est une analyse de cette seule équation** : le membre de gauche est **toujours strictement positif**, et **la monotonie du membre de droite en $l$ est gouvernée par le signe de $\beta$** — via l'hypothèse 8.1.

</div>

## 🔴 Concept 9 — Les signes de $\lambda$ et de $\beta$

### 9.1 $\beta\neq0$

<details class="details--riche">
<summary>

**La preuve par l'absurde**

</summary>

> *« Supposons que **$\beta=0$**. Alors **(8.22) impliquerait que le membre de gauche est CONSTANT en $l$**, ce qui implique que **$w-p+B_l-l$ est CONSTANT en $l$**. »*

⚠️ *« **Mais ceci NE PEUT PAS tenir parce qu'alors la condition (8.21) ÉCHOUE, son membre de gauche se réduisant à $d(0)-d(1)$, qui est STRICTEMENT NÉGATIF.** »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — la vérification.</span>

Si $w-p+B_l-l\equiv c$, alors $u(w-p-l+B_l)=u(c)$ pour tout $l$, et le membre de gauche de (8.21) devient

$$\Big[\sum_l\pi_l(0)-\sum_l\pi_l(1)\Big]u(c)-d(0)+d(1)=0-d(0)+d(1)=d(1)-d(0)>0$$

⚠️ **C'est STRICTEMENT POSITIF, alors que (8.21) exige $\leq0$.** *(Le texte imprimé écrit « $d(0)-d(1)$ », mais le signe qu'il en tire — « strictement négatif » pour rendre (8.21) fausse — correspond à la lecture $d(1)-d(0)>0$ ; dans les deux lectures, **la conclusion est la même : (8.21) est violée**.)*

</div>

$$\boxed{\;\textbf{Nous concluons que } \beta\neq0.\;}$$

**Ce que cela signifie économiquement** : **l'assurance complète est INCOMPATIBLE avec l'effort élevé** — exactement l'argument du Concept 7, vu de l'autre côté.

</details>

### 9.2 $\lambda\neq0$, et même $\lambda>0$

<details class="details--riche">
<summary>

**La preuve — le crochet change de signe**

</summary>

**Pas 1 — l'hypothèse 8.1 fait changer le crochet de signe.**

> *« La propriété du rapport de vraisemblance monotone implique qu'**il existe un $l$ tel que $\pi_l(0)\neq\pi_l(1)$**. Parce que $\sum_l\pi_l(0)=\sum_l\pi_l(1)=1$, **il doit exister $l$ et $l'$ tels que $\pi_l(0)>\pi_l(1)$ ET $\pi_{l'}(0)<\pi_{l'}(1)$.** »*

⚠️ **L'argument** : deux distributions **distinctes** sommant toutes deux à 1 doivent **se croiser** — l'une dépasse l'autre quelque part, et **réciproquement** ailleurs.

$$\Longrightarrow\qquad \left[1-\frac{\pi_l(0)}{\pi_l(1)}\right] \ \textbf{ prend des valeurs POSITIVES ET NÉGATIVES}$$

**Pas 2 — la contradiction.**

> *« **Or, si $\lambda=0$, alors parce que $\beta\neq0$, LE MEMBRE DE DROITE de (8.22) prend des valeurs à la fois POSITIVES et NÉGATIVES. Cependant, LE MEMBRE DE GAUCHE EST TOUJOURS STRICTEMENT POSITIF.** Donc $\lambda\neq0$. **En effet, cet argument montre que $\lambda>0$.** »*

⚠️ **Le membre de gauche est $1/u'>0$** parce que $u$ est **strictement croissante**.

</details>

### 🔴 9.3 Ce que les deux non-nullités impliquent

> *« **Le fait que $\lambda$ ET $\beta$ soient NON NULS implique que LES DEUX CONTRAINTES, (8.20) ET (8.21), SONT SATURÉES à l'optimum.** »*

$$\boxed{\;\textbf{Le consommateur est RAMENÉ à son utilité de réservation,}\\\textbf{et il est JUSTE INDIFFÉRENT entre l'effort ÉLEVÉ et l'effort BAS.}\;}$$

⚠️ **C'est la signature du contrat incitatif optimal** : le principal extrait **tout** le surplus **et** ne laisse **aucune marge** sur l'incitation.

### 9.4 $\beta>0$

<details class="details--riche">
<summary>

**La preuve par l'absurde — la chaîne complète**

</summary>

> *« Pour gagner en intuition, **il est utile de montrer que $\beta>0$. Supposons donc que $\beta<0$.** »*

| Pas | Le raisonnement |
|---|---|
| **1** | **L'hypothèse 8.1** dit que $\pi_l(0)/\pi_l(1)$ est **strictement croissant**, donc $\big[1-\pi_l(0)/\pi_l(1)\big]$ est **strictement DÉCROISSANT**. Avec $\beta<0$, ⟹ **le membre de droite de (8.22) est strictement CROISSANT en $l$** |
| **2** | ⟹ $1/u'(\cdot)$ **strictement croissant** ⟹ $u'(w-p+B_l-l)$ **strictement DÉCROISSANT** |
| **3** | $u$ étant **strictement concave**, $u'$ est **décroissante en son argument** ⟹ **l'argument $w-p+B_l-l$ est strictement CROISSANT** ⟹ **$B_l-l$ strictement croissant** ⟹ **$u(w-p+B_l-l)$ strictement croissant** |
| **4** | *« Mais ce dernier, **avec la propriété du rapport de vraisemblance monotone**, implique que $$\sum_l\big(\pi_l(1)-\pi_l(0)\big)u(w-p+B_l-l)<0$$ **(voir l'exercice 8.13)** »* |
| **5** | *« **Ceci CONTREDIT (8.21), parce que $d(0)<d(1)$.** »* |

$$\boxed{\;\textbf{Nous concluons que } \beta>0.\;}$$

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le pas 4 en détail.</span>

L'exercice 8.13 énonce : sous l'hypothèse 8.1, $\sum_l\pi_l(0)x_l>\sum_l\pi_l(1)x_l$ **pour toute suite CROISSANTE** $(x_l)$. Au pas 3, la suite $x_l=u(w-p+B_l-l)$ est **croissante** ⟹ $\sum_l\pi_l(0)x_l>\sum_l\pi_l(1)x_l$, c'est-à-dire $\sum_l(\pi_l(1)-\pi_l(0))x_l<0$. Or (8.21) exige $\sum_l(\pi_l(0)-\pi_l(1))x_l\leq d(0)-d(1)<0$, soit $\sum_l(\pi_l(1)-\pi_l(0))x_l\geq d(1)-d(0)>0$ — **contradiction**.

</div>

</details>

## 🔴 Concept 10 — La franchise croissante (8.23)

### 10.1 La conclusion

> *« **Maintenant, parce que $\beta>0$, la propriété du rapport de vraisemblance monotone implique que LE MEMBRE DE DROITE de (8.22) est STRICTEMENT DÉCROISSANT, de sorte que $u'(w-p+B_l-l)$ est STRICTEMENT CROISSANT. Par conséquent, la police optimale doit présenter le trait suivant :** »*

$$\boxed{\;l-B_l \ \textbf{ est STRICTEMENT CROISSANT en } l=0,1,\dots,L\;} \tag{8.23}$$

### 🔴 10.2 Sa lecture

> *« Rappelez-vous que nous pouvons poser $B_0=0$ sans perte. Par conséquent, **la condition (8.23) indique que LA POLICE OPTIMALE À EFFORT ÉLEVÉ NE FOURNIT PAS L'ASSURANCE COMPLÈTE — elle spécifie plutôt UN PAIEMENT DE FRANCHISE QUI AUGMENTE AVEC LA TAILLE DE LA PERTE.** »*

$$\underbrace{l-B_l}_{\textbf{ce que le consommateur supporte lui-même}} \ \nearrow \ \text{avec } l$$

| Le cas | La police |
|---|---|
| **Symétrique** | $B_l=l$ ⟹ $l-B_l=0$ — **franchise NULLE partout** |
| **Asymétrique, $e=1$** | $l-B_l$ **strictement croissant**, valant **0 en $l=0$** — **franchise NULLE en l'absence d'accident, PUIS croissante** |

### 10.3 L'intuition, mot pour mot

> *« **Ceci est, bien sûr, très INTUITIF. Pour donner au consommateur une incitation à choisir l'effort élevé, IL FAUT QU'IL Y AIT QUELQUE CHOSE POUR LUI LÀ-DEDANS.** »*

**Quand $l-B_l$ est strictement croissant, il y a un BÉNÉFICE D'UTILITÉ à fournir l'effort élevé :**

$$\sum_{l=0}^{L}\big(\pi_l(1)-\pi_l(0)\big)\,u(w-p-l+B_l)\ >\ 0$$

> *« **Que cette somme soit strictement positive découle de (8.23) ET de la propriété du rapport de vraisemblance monotone (à nouveau, voir l'exercice 8.13).** »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le renversement d'inégalité.</span>

Ici la suite $x_l=u(w-p-l+B_l)$ est **DÉCROISSANTE** *(car $l-B_l$ croît, donc $w-p-(l-B_l)$ décroît)*. L'exercice 8.13, appliqué à la suite **croissante** $(-x_l)$, donne $\sum_l\pi_l(0)(-x_l)>\sum_l\pi_l(1)(-x_l)$, c'est-à-dire $\sum_l\pi_l(1)x_l>\sum_l\pi_l(0)x_l$ — **l'effort élevé rend le consommateur strictement mieux loti EN ESPÉRANCE, sur la seule utilité de richesse.**

</div>

### 🔴 10.4 L'égalisation exacte

> *« **Bien sûr, il y a AUSSI un COÛT d'utilité associé à l'effort élevé, à savoir $d(1)-d(0)>0$. LA POLICE OPTIMALE EST TAILLÉE DE SORTE QUE LE BÉNÉFICE D'UTILITÉ DE L'EFFORT ÉLEVÉ ÉGALE JUSTE LE COÛT D'UTILITÉ.** »*

$$\boxed{\;\sum_{l}\big(\pi_l(1)-\pi_l(0)\big)u(w-p-l+B_l)\ =\ d(1)-d(0)\;}$$

⚠️ **C'est exactement la saturation de (8.21)**, établie au Concept 9.3. La franchise est *« taillée »* **au strict minimum** qui rend l'effort élevé **tout juste** attractif — pas plus, car **toute franchise supplémentaire coûterait au consommateur sans rien apporter à l'incitation**, forçant à **baisser le prix**.

## 🔴 Concept 11 — L'efficacité, en deux cas

### 11.1 La police globalement optimale

> *« La police globalement optimale — celle qui résout (8.13) — **est simplement CELLE DES DEUX qui donne les profits espérés les PLUS ÉLEVÉS**. »*

### 🔴 11.2 CAS 1 — quand l'effort BAS était déjà optimal

> *« Supposons que **dans le cas symétrique, le niveau d'effort optimal exigé du consommateur est BAS. Alors PRÉCISÉMENT LA MÊME police (d'assurance complète) sera optimale dans le cas ASYMÉTRIQUE.** »*

**Le raisonnement, mot pour mot :**

| Pas | L'argument |
|---|---|
| **1** | *« cette police donne **LES MÊMES profits espérés** que dans le cas symétrique »* *(Concept 7)* |
| **2** | *« et **les profits maximaux quand $e=1$ NE SONT PAS PLUS ÉLEVÉS** dans le cas asymétrique que dans le cas symétrique, **PARCE QU'IL Y A UNE CONTRAINTE SUPPLÉMENTAIRE sous asymétrie** »* |
| **3** | *« Par conséquent, **parce que l'issue symétrique est PARETO-EFFICACE, l'issue asymétrique le sera AUSSI dans ce cas.** »* |

### 🔴 11.3 CAS 2 — quand l'effort ÉLEVÉ était optimal

> *« D'autre part, supposons que **le niveau d'effort optimal était ÉLEVÉ dans le cas symétrique. IL PEUT FORT BIEN ÊTRE que les profits maximisés de la compagnie soient SUBSTANTIELLEMENT PLUS BAS quand elle tente d'induire l'effort élevé dans le cas asymétrique.** »*

> *« **Parce que les profits conditionnels à l'effort BAS sont IDENTIQUES dans les deux cas, il peut alors être OPTIMAL pour la compagnie, sous asymétrie, D'INDUIRE L'EFFORT BAS en offrant la police d'assurance COMPLÈTE.** »*

**Et la conclusion :**

> ⚠️ *« **Bien que ceci soit OPTIMAL POUR LA COMPAGNIE, CE NE SERAIT PAS PARETO-EFFICACE. Car comparé à la solution sous information symétrique, L'UTILITÉ DU CONSOMMATEUR EST INCHANGÉE (et égale à $\bar u$), MAIS LES PROFITS DE LA COMPAGNIE SONT STRICTEMENT PLUS BAS.** »*

$$\boxed{\;\textbf{« Ainsi, une fois encore, les effets de l'information asymétrique}\\\textbf{peuvent se révéler dans des issues PARETO-INEFFICACES. »}\;}$$

### 11.4 Le tableau récapitulatif

| Sous **symétrie**, l'effort optimal est… | Sous **asymétrie** | L'efficacité |
|---|---|---|
| **BAS** | **La même police d'assurance complète** — rien ne change | **EFFICACE** |
| **ÉLEVÉ** | Soit la **franchise croissante** *(profits plus bas)*, soit **le basculement vers $e=0$** | **INEFFICACE** en cas de basculement |

⚠️ **Notez la nature de l'inefficacité** : ce n'est **pas** le consommateur qui souffre — *« son utilité est INCHANGÉE et égale à $\bar u$ »* — **c'est la compagnie**. **Le coût de l'asymétrie est intégralement supporté par le principal.**

## 🟠 Concept 12 — §8.3 : le bilan de l'économie de l'information

### 12.1 Le constat

> *« **La distribution de l'information entre participants au marché peut avoir un impact PROFOND et parfois SAISISSANT sur l'équilibre de marché.** En effet, comme nous l'avons vu, **l'information asymétrique peut faire ÉCHOUER les marchés, en ce que DES ÉCHANGES MUTUELLEMENT BÉNÉFIQUES RESTENT INEXPLOITÉS.** »*

> *« **Cet échec des issues de marché à être Pareto-efficaces est un aspect des plus TROUBLANTS d'un point de vue NORMATIF.** »*

### 12.2 Les sources et les extensions

> *« Nous avons consacré ce chapitre à l'étude soigneuse **d'UN SEUL marché — celui de l'assurance — et une grande partie de notre analyse est tirée de ROTHSCHILD et STIGLITZ (1976) et de WILSON (1977). Mais les problèmes identifiés ici sont présents dans BEAUCOUP D'AUTRES marchés.** »*

| Le phénomène | Les autres marchés | Les références |
|---|---|---|
| **ANTISÉLECTION** | *« le marché des **VOITURES D'OCCASION** et le marché du **TRAVAIL** »* | **Akerlof (1970)** et **Spence (1973)** |
| **ALÉA MORAL** | *« la relation **EMPLOYEUR-EMPLOYÉ**, la relation **MÉDECIN-PATIENT**, et **MÊME LES MARIAGES** »* | **Grossman et Hart (1983)**, **Holmström (1979a, 1982)** |

### 🔴 12.3 Les remèdes

> *« **Pour l'essentiel dans ce chapitre, nous nous sommes concentrés SUR LA MALADIE ET SES SYMPTÔMES, ne suggérant qu'OCCASIONNELLEMENT un remède potentiel. Nous terminons en notant que TRÈS SOUVENT CES PROBLÈMES D'INFORMATION PEUVENT ÊTRE ATTÉNUÉS, SINON SURMONTÉS.** »*

| Le problème | Le remède |
|---|---|
| **L'ANTISÉLECTION** | *« **le SIGNALEMENT ou le CRIBLAGE peuvent aider** »* |
| **L'ALÉA MORAL** | *« **les CONTRATS peuvent être conçus de sorte que LES INCITATIONS DES AGENTS LES CONDUISENT PLUS PRÈS D'ISSUES PARETO-EFFICACES** »* |

### 12.4 Le mot de la fin

> *« **L'analyse des marchés à information asymétrique soulève DE NOUVELLES QUESTIONS et offre D'IMPORTANTS DÉFIS aux économistes. C'est un domaine qui offre PEU DE RÉPONSES SIMPLES ET LARGEMENT APPLICABLES, mais c'en est un où TOUTE LA CRÉATIVITÉ, L'INTUITION ET LA RIGUEUR LOGIQUE DE L'ANALYSTE PEUVENT PAYER DE BEAUX DIVIDENDES.** »*

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « l'effort n'est pas observable » | **ALÉA MORAL** | Ajouter la **contrainte d'incitation** |
| « le type n'est pas observable » | **ANTISÉLECTION** *(fiche 517)* | Signalement ou criblage |
| Un tableau de $\pi_l(e)$ | **Hypothèse 8.1** | Vérifier que $\pi_l(0)/\pi_l(1)$ **croît** |
| « quelle est l'utilité de réservation ? » | **Note 12 / exercice 8.15(b)** | $\max_e\sum_l\pi_l(e)u(w-l)-d(e)$ *(auto-assurance)* |
| « effort observable » | **§8.2.1** | **Assurance COMPLÈTE**, prix par (8.12) |
| « quel effort la compagnie choisira-t-elle ? » | **L'arbitrage** | Comparer $p(e)-\sum_l\pi_l(e)l$ pour $e=0$ et $e=1$ |
| « induire l'effort BAS sous asymétrie » | **Concept 7** | **La même police** — la contrainte est **automatiquement satisfaite** |
| « induire l'effort ÉLEVÉ sous asymétrie » | **Concept 8-10** | Lagrangien à **deux multiplicateurs**, puis **(8.22)** |
| « les contraintes sont-elles saturées ? » | **Concept 9.3** | **Les deux** — car $\lambda>0$ **et** $\beta>0$ |
| « quelle forme prend la police ? » | **(8.23)** | **Franchise CROISSANTE avec la perte** |
| « comparer les deux cas d'information » | **Concept 11** | Deux cas selon l'effort optimal **sous symétrie** |
| « prouver l'inégalité sur les espérances » | **Exercice 8.13** | Rapport de vraisemblance monotone + **suite croissante** |
| Un contrat de salaire $(w_0,w_4)$ | **Exercice 8.16** | **Même structure** — le principal est l'employeur |

**Les trois réflexes de cadrage :**

1. **Compter les contraintes.** Symétrique : **une** *(participation)*. Asymétrique : **deux** *(participation + incitation)*.
2. **Vérifier d'abord si l'effort BAS marche.** Il ne coûte **rien** en asymétrie — c'est toujours le point de comparaison.
3. **Le signe de $\beta$ décide de la forme de la police.** $\beta>0$ ⟹ **franchise croissante**.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Résoudre le cas symétrique

1. **Fixer $e$** et former le lagrangien en $(p,B_0,\dots,B_L)$ **seuls**.
2. **Écrire les CPO** ; **noter que $\partial\mathcal{L}/\partial p$ est REDONDANTE**.
3. **De (8.9), tirer $u'(w-p-l+B_l)=1/\lambda$** ⟹ **$B_l-l$ CONSTANT** *(car $u'$ est injective)*.
4. **$\lambda>0$** ⟹ **la contrainte est SATURÉE** ⟹ (8.11).
5. **Poser $B_0=0$** *(sans perte : $L+2$ équations, $L+3$ inconnues)* ⟹ **$B_l=l$**.
6. $l=0$ dans (8.11) ⟹ **$p(e)$ par $u(w-p(e))=d(e)+\bar u$**.
7. **Comparer $p(e)-\sum_l\pi_l(e)l$ pour $e=0$ et $e=1$.**

### Méthode 2 — Traiter l'effort BAS sous asymétrie

1. **Prendre la solution du problème SANS la contrainte d'incitation** — c'est (8.16).
2. **Observer qu'ajouter une contrainte ne peut PAS augmenter le maximum.**
3. **Vérifier que (8.16) satisfait la contrainte d'incitation** : avec $B_l=l$, elle se réduit à $d(0)\leq d(1)$.
4. ⟹ **elle est optimale.** **L'asymétrie ne coûte rien pour $e=0$.**

### Méthode 3 — Traiter l'effort ÉLEVÉ sous asymétrie

| Pas | Ce qu'on fait |
|---|---|
| **1** | Lagrangien à **deux** multiplicateurs : $\lambda$ *(participation)* et $\beta$ *(incitation)* |
| **2** | CPO en $B_l$ ⟹ **(8.22)** : $1/u'(\cdot)=\lambda+\beta\big[1-\pi_l(0)/\pi_l(1)\big]$ |
| **3** | **$\beta\neq0$** : sinon le membre de gauche serait **constant**, l'assurance **complète**, et (8.21) **violée** |
| **4** | **$\lambda\neq0$** : le crochet **change de signe** *(deux distributions distinctes sommant à 1 se croisent)*, mais le membre de gauche est **toujours $>0$** |
| **5** | **$\beta>0$** : si $\beta<0$, le membre de droite **croît**, donc $B_l-l$ **croît**, et **l'exercice 8.13 contredit (8.21)** |
| **6** | ⟹ **membre de droite DÉCROISSANT** ⟹ $u'$ **croissant** ⟹ **$l-B_l$ STRICTEMENT CROISSANT** |

### Méthode 4 — Appliquer l'exercice 8.13

**L'énoncé** : sous l'hypothèse 8.1,

$$\sum_{l=0}^{L}\pi_l(0)\,x_l\ >\ \sum_{l=0}^{L}\pi_l(1)\,x_l \qquad\textbf{pour toute suite CROISSANTE } x_1<x_2<\dots<x_L$$

| Le contexte | La suite | La conclusion |
|---|---|---|
| **Réfuter $\beta<0$** | $x_l=u(w-p+B_l-l)$, **croissante** | $\sum_l(\pi_l(1)-\pi_l(0))x_l<0$ |
| **Le bénéfice de l'effort** | $x_l=u(w-p-l+B_l)$, **DÉCROISSANTE** | $\sum_l(\pi_l(1)-\pi_l(0))x_l>0$ |

⚠️ **Toujours vérifier le SENS de monotonie de la suite** — l'inégalité **s'inverse**.

### Méthode 5 — Diagnostiquer l'efficacité

1. **Résoudre le cas symétrique** et noter **quel effort $e^*$ y est optimal**.
2. **Si $e^*=0$** ⟹ **la même police est optimale sous asymétrie** ⟹ **EFFICACE**.
3. **Si $e^*=1$** ⟹ calculer les profits sous asymétrie **pour $e=1$** *(franchise croissante)* et **pour $e=0$** *(assurance complète)*.
4. **Si le second l'emporte** ⟹ **basculement vers $e=0$** ⟹ **INEFFICACE**.
5. **Formuler l'inefficacité correctement** : **l'utilité du consommateur est INCHANGÉE ($=\bar u$)** ; **ce sont LES PROFITS qui baissent**.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Confondre aléa moral et antisélection | L'aléa moral cache **UNE ACTION**, l'antisélection **UN TYPE** | Après vs **avant** le contrat |
| 2 | Mal définir l'aléa moral | *« le principal a un **INTÉRÊT dans l'action** de l'agent, **mais elle ne peut PAS être observée** »* | Les deux conditions |
| 3 | Mal définir le problème principal-agent | *« **CONCEVOIR UN SCHÉMA D'INCITATION** pour que l'agent prenne une action appropriée »* | Ce n'est **pas** observer l'agent |
| 4 | Oublier que $l=0$ est un niveau de perte | *« il est commode de se référer à [éviter l'accident] comme **une perte de ZÉRO dollar** »* | $l\in\{0,1,\dots,L\}$ |
| 5 | Croire que $B$ peut dépendre de $e$ | *« la compagnie **ne peut lier le bénéfice QU'AU MONTANT DE LA PERTE** »* | Une police est $(p,B_0,\dots,B_L)$ |
| 6 | Mal énoncer l'hypothèse 8.1 | C'est $\pi_l(0)/\pi_l(1)$ **strictement CROISSANT** | Le **bas** effort au numérateur |
| 7 | Mal lire l'hypothèse 8.1 | *« la probabilité RELATIVE que l'effort ait été **BAS** AUGMENTE avec $l$ »* | Une **grosse perte accuse** le faible effort |
| 8 | Oublier que $u'$ est injective | C'est la **stricte concavité** qui fait passer de $u'=1/\lambda$ à **$B_l-l$ constant** | Sans elle, rien |
| 9 | Croire que (8.8) apporte une information | Elle est **REDONDANTE** — impliquée par les $(L+1)$ équations (8.9) | D'où **une inconnue de plus** |
| 10 | Croire que $B_0=0$ est une hypothèse | *« il était clair **dès le départ** que c'était INOFFENSIF »* — les changements de $B_0$ se **compensent** | Pure **normalisation** |
| 11 | Croire que l'assurance complète est un résultat surprenant | *« **Aucune surprise** — consommateur **averse**, compagnie **NEUTRE**. **Partage EFFICACE du risque.** »* | C'est un classique |
| 12 | Croire que l'effort élevé est toujours optimal | Il y a un **ARBITRAGE** : $e=0$ permet **un prix plus élevé** | *« on doit vérifier dans chaque cas »* |
| 13 | Mal identifier ce qui rend $p(0)>p(1)$ | **$d(0)<d(1)$** dans (8.12) | Moins de désutilité ⟹ on peut faire payer plus |
| 14 | Mal identifier l'avantage de $e=1$ | **La perte espérée baisse** — **par l'hypothèse 8.1** | Pas par hypothèse directe |
| 15 | Oublier ce qui rend le cas symétrique efficace | *« **quel que soit** l'effort optimal, **la police implique TOUJOURS l'assurance complète** »* | C'est ce qui donne l'efficacité |
| 16 | Ajouter deux contraintes nouvelles sous asymétrie | **UNE SEULE** est ajoutée — **(8.15)** | (8.14) était déjà là |
| 17 | Mal énoncer la contrainte d'incitation | Elle compare $e$ à $e'$ **avec la MÊME police** | Le consommateur **choisit** $e$ |
| 18 | Former un lagrangien pour $e=0$ | *« il est **PLUS SIMPLE de prendre une route DIFFÉRENTE** »* | Vérifier que (8.16) **satisfait** (8.15) |
| 19 | Ne pas voir pourquoi (8.15) se réduit à $d(0)\geq d(1)$ | Avec $B_l=l$, **l'argument de $u$ ne dépend plus de $l$** et **les deux sommes valent 1** | L'assurance complète **neutralise** les probabilités |
| 20 | Croire que $e=0$ coûte quelque chose sous asymétrie | *« **LA MÊME POLICE que si l'effort était observable** »* | Coût **nul** |
| 21 | Oublier que $e'=0$ dans (8.15) quand $e=1$ | Il n'y a que **deux** niveaux | La déviation est **forcément** vers $e=0$ |
| 22 | Se tromper dans la dérivation de (8.22) | On **divise par $\pi_l(1)$ puis on INVERSE** | $1/u'=\lambda+\beta[1-\pi_l(0)/\pi_l(1)]$ |
| 23 | Oublier que le membre de gauche de (8.22) est $>0$ | C'est $1/u'$, et $u$ est **strictement croissante** | C'est ce qui donne $\lambda\neq0$ |
| 24 | Ne pas voir pourquoi $\beta\neq0$ | $\beta=0$ ⟹ **assurance complète** ⟹ **(8.21) est VIOLÉE** | Même argument qu'au Concept 7 |
| 25 | Ne pas voir pourquoi le crochet change de signe | **Deux distributions distinctes sommant à 1 SE CROISENT** | Il existe $l$ et $l'$ opposés |
| 26 | Confondre $\lambda\neq0$ et $\lambda>0$ | *« **cet argument montre que $\lambda>0$** »* | Le membre de gauche est **positif** |
| 27 | Croire qu'une seule contrainte est saturée | **LES DEUX** — car $\lambda\neq0$ **et** $\beta\neq0$ | Utilité $=\bar u$ **et** indifférence entre efforts |
| 28 | Se tromper de sens dans la preuve $\beta>0$ | Si $\beta<0$, le membre de droite **CROÎT**, donc $B_l-l$ **croît** | Puis **l'exercice 8.13** contredit |
| 29 | Oublier le rôle de la concavité au pas 3 | $u'$ **décroissante** ⟹ $u'$ croissant en $l$ **⟺** argument **décroissant** en $l$ | Le renversement |
| 30 | Écrire $B_l-l$ croissant dans (8.23) | C'est **$l-B_l$** qui croît | La **franchise** croît |
| 31 | Croire que la police à effort élevé assure complètement | *« elle **NE fournit PAS l'assurance complète** »* | **Franchise croissante** |
| 32 | Oublier la normalisation dans l'interprétation | $B_0=0$ ⟹ la franchise vaut **0 en $l=0$** puis **croît** | D'où *« croissante avec la taille de la perte »* |
| 33 | Ne pas voir le sens de monotonie de la suite au dernier calcul | Ici $u(w-p-l+B_l)$ est **DÉCROISSANTE** ⟹ **l'inégalité de l'ex. 8.13 s'INVERSE** | D'où le **bénéfice positif** |
| 34 | Croire que le bénéfice de l'effort excède son coût | *« la police est taillée pour qu'il **ÉGALE JUSTE** le coût »* | C'est (8.21) **saturée** |
| 35 | Croire que l'asymétrie est toujours inefficace ici | **NON** — si $e=0$ était optimal sous symétrie, **rien ne change** | Deux cas |
| 36 | Mal identifier qui supporte le coût de l'inefficacité | *« **l'utilité du consommateur est INCHANGÉE** ($=\bar u$), **mais les PROFITS sont strictement plus bas** »* | Le **principal** paie |
| 37 | Attribuer l'antisélection au mauvais auteur | **Akerlof (1970)** *(voitures)*, **Spence (1973)** *(travail)* | Pas l'inverse |
| 38 | Oublier les sources du chapitre | **Rothschild et Stiglitz (1976)** et **Wilson (1977)** | Le modèle d'assurance |
| 39 | Oublier les exemples d'aléa moral | Employeur-employé, médecin-patient, **et même les MARIAGES** | Grossman-Hart, Holmström |
| 40 | Croire que le chapitre offre des remèdes généraux | *« un domaine qui offre **PEU DE RÉPONSES SIMPLES ET LARGEMENT APPLICABLES** »* | Mais la créativité **paie** |

## 📌 Ultimate Review

**§8.2 — L'ALÉA MORAL.**

> *« **Les compagnies ne sont pas naïves. Une fois l'assurance achetée, le consommateur peut ne PAS conduire avec autant de prudence — et son incitation DIMINUE AVEC LE MONTANT DE COUVERTURE.** »*

$$\boxed{\;\textbf{ALÉA MORAL : le PRINCIPAL a un intérêt dans l'ACTION de l'AGENT,}\\\textbf{mais cette action NE PEUT PAS être observée.}\;}$$

$$\textbf{PROBLÈME PRINCIPAL-AGENT : concevoir un SCHÉMA D'INCITATION.}$$

⚠️ **La distinction avec l'antisélection** : là un **TYPE** exogène est caché **avant** le contrat ; ici une **ACTION** choisie est cachée **après**.

**LE MODÈLE** : pertes $l\in\{0,\dots,L\}$ *( $l=0$ = pas d'accident)* · $\pi_l(e)>0$, $\sum_l\pi_l(e)=1$ · $e\in\{0,1\}$, $d(1)>d(0)$ · $u$ **strictement concave**, $w>L$ · **une POLICE est $(p,B_0,\dots,B_L)$** — *« la compagnie **ne peut lier le bénéfice QU'À LA PERTE** »*.

**HYPOTHÈSE 8.1 — rapport de vraisemblance monotone :**

$$\frac{\pi_l(0)}{\pi_l(1)} \quad\textbf{strictement CROISSANT en } l$$

> *« **Conditionnellement à la perte observée $l$, la probabilité RELATIVE que l'effort ait été BAS AUGMENTE avec $l$. On serait plus disposé à PARIER sur l'effort bas quand la perte est plus élevée.** »*

**§8.2.1 — L'INFORMATION SYMÉTRIQUE.**

$$\max_{e,p,B}\ p-\sum_l\pi_l(e)B_l \quad\text{s.c.}\quad \sum_l\pi_l(e)u(w-p-l+B_l)-d(e)\geq\bar u \tag{8.7}$$

| Pas | Le résultat |
|---|---|
| **(8.8)** est **REDONDANTE** | ⟹ $(L+2)$ équations, $(L+3)$ inconnues ⟹ **$B_0=0$ SANS PERTE** |
| **(8.9)** | $u'(w-p-l+B_l)=1/\lambda$ ⟹ **$B_l-l$ CONSTANT** |
| **$\lambda>0$** | ⟹ la contrainte est **SATURÉE** ⟹ (8.11) |
| **Conclusion** | $$\boxed{B_l=l \ : \ \textbf{ASSURANCE COMPLÈTE à chaque niveau de perte}}$$ |

> *« **Aucune surprise : le consommateur est STRICTEMENT AVERSE, la compagnie NEUTRE. C'est du PARTAGE EFFICACE DU RISQUE.** »*

**Le prix** : $u\big(w-p(e)\big)=d(e)+\bar u$ (8.12). **L'ARBITRAGE** : $e=0$ ⟹ **prix plus élevé** *(car $d(0)<d(1)$)* ; $e=1$ ⟹ **perte espérée plus faible** *(par l'hypothèse 8.1)*.

⚠️ *« **Quel que soit** l'effort optimal, **la police implique TOUJOURS l'assurance complète** ⟹ **l'issue est PARETO-EFFICACE**. »*

**§8.2.2 — L'INFORMATION ASYMÉTRIQUE.**

⚠️ **UNE seule contrainte est ajoutée** — la **CONTRAINTE D'INCITATION (8.15)** : *« elle garantit que $e$, le niveau que la compagnie a **en tête**, est **celui que le consommateur choisit VOLONTAIREMENT** »*.

**POUR $e=0$** — l'argument court :

> *« Ajouter une contrainte **ne peut pas augmenter** les profits maximisés. **Or la solution sans contrainte LA SATISFAIT** : avec $B_l=l$, (8.15) **se réduit à $d(0)\geq d(1)$**, vraie **strictement**. »*

$$\boxed{\;\textbf{Pour } e=0, \text{ la police est LA MÊME que sous symétrie — l'asymétrie NE COÛTE RIEN.}\;}$$

**POUR $e=1$** — le lagrangien (8.17) à **deux multiplicateurs** $\lambda$ *(participation)* et $\beta$ *(incitation)*. La CPO en $B_l$ donne **l'équation maîtresse** :

$$\frac{1}{u'(w-p+B_l-l)}=\lambda+\beta\left[1-\frac{\pi_l(0)}{\pi_l(1)}\right] \tag{8.22}$$

| Le signe | La preuve |
|---|---|
| **$\beta\neq0$** | $\beta=0$ ⟹ membre de gauche **constant** ⟹ **assurance complète** ⟹ **(8.21) ÉCHOUE** |
| **$\lambda>0$** | Deux distributions distinctes sommant à 1 **se croisent** ⟹ le crochet **change de signe** ; or **le membre de gauche est toujours $>0$** |
| **$\beta>0$** | Si $\beta<0$, le membre de droite **croît** ⟹ $B_l-l$ **croît** ⟹ **l'exercice 8.13 contredit (8.21)** |

⚠️ **$\lambda\neq0$ ET $\beta\neq0$** ⟹ **LES DEUX contraintes sont SATURÉES** : *« le consommateur est **ramené à $\bar u$** ET il est **JUSTE INDIFFÉRENT** entre effort élevé et effort bas »*.

**LA CONCLUSION** — l'hypothèse 8.1 avec $\beta>0$ rend le membre de droite **strictement décroissant** :

$$\boxed{\;l-B_l \ \textbf{ est STRICTEMENT CROISSANT}\;} \tag{8.23}$$

> *« **La police optimale à effort élevé NE fournit PAS l'assurance complète — elle spécifie UN PAIEMENT DE FRANCHISE QUI AUGMENTE AVEC LA TAILLE DE LA PERTE.** »*

**L'INTUITION** : *« **pour donner une incitation, IL FAUT QU'IL Y AIT QUELQUE CHOSE POUR LUI LÀ-DEDANS** »*. Le **bénéfice d'utilité** de l'effort élevé,

$$\sum_l\big(\pi_l(1)-\pi_l(0)\big)u(w-p-l+B_l)>0$$

est **taillé** pour **égaler juste** le **coût** $d(1)-d(0)$.

**L'EFFICACITÉ, en deux cas :**

| Sous symétrie, $e^*$ était… | Sous asymétrie | Verdict |
|---|---|---|
| **BAS** | **la même police** ; et $e=1$ **ne peut pas faire mieux** *(contrainte en plus)* | **EFFICACE** |
| **ÉLEVÉ** | les profits pour $e=1$ **chutent** ⟹ **basculement possible vers $e=0$** | **INEFFICACE** |

⚠️ *« **L'utilité du consommateur est INCHANGÉE (et égale à $\bar u$), MAIS LES PROFITS DE LA COMPAGNIE SONT STRICTEMENT PLUS BAS.** »* — **le principal supporte tout le coût.**

**§8.3 — LE BILAN.**

> *« L'information asymétrique **peut faire ÉCHOUER les marchés, en ce que des échanges MUTUELLEMENT BÉNÉFIQUES RESTENT INEXPLOITÉS. C'est un aspect des plus TROUBLANTS d'un point de vue NORMATIF.** »*

| Le phénomène | Les autres marchés | Les auteurs |
|---|---|---|
| **Antisélection** | voitures d'occasion, **marché du travail** | **Akerlof (1970)**, **Spence (1973)** |
| **Aléa moral** | employeur-employé, médecin-patient, **et même les MARIAGES** | **Grossman-Hart (1983)**, **Holmström (1979a, 1982)** |

*(Le modèle d'assurance vient de **Rothschild et Stiglitz (1976)** et **Wilson (1977)**.)*

**LES REMÈDES** : antisélection ⟹ **signalement ou criblage** · aléa moral ⟹ *« **des CONTRATS conçus pour que LES INCITATIONS DES AGENTS LES CONDUISENT PLUS PRÈS D'ISSUES PARETO-EFFICACES** »*.

> *« **Peu de réponses simples et largement applicables — mais un domaine où TOUTE LA CRÉATIVITÉ, L'INTUITION ET LA RIGUEUR LOGIQUE DE L'ANALYSTE PEUVENT PAYER DE BEAUX DIVIDENDES.** »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Comment le §8.2 s'ouvre-t-il ?**

</summary>

> *« **Les compagnies d'assurance ne sont pas naïves. Elles comprennent bien qu'une fois qu'un consommateur a acheté une assurance, IL PEUT NE PAS CONDUIRE AVEC AUTANT DE PRUDENCE qu'avant. De plus, son incitation à conduire prudemment est susceptible de DIMINUER AVEC LE MONTANT DE COUVERTURE.** »*

> *« **Elles ne peuvent PAS observer l'EFFORT. Elles doivent donc STRUCTURER leurs polices de sorte que LES POLICES ELLES-MÊMES INCITENT les consommateurs à prendre un niveau de soin approprié.** »*

</details>

<details class="details--riche">
<summary>

**2. Définir l'aléa moral et le problème principal-agent.**

</summary>

**ALÉA MORAL** : *« quand un **PRINCIPAL** a un **INTÉRÊT dans l'action prise par un AGENT**, mais que **l'action de l'agent NE PEUT PAS être observée** par le principal »*.

**PROBLÈME PRINCIPAL-AGENT** : *« pour le principal, **CONCEVOIR UN SCHÉMA D'INCITATION de sorte que l'agent prenne une ACTION APPROPRIÉE** »*.

⚠️ **Les deux conditions de l'aléa moral** : un **intérêt** ET une **inobservabilité**.

</details>

<details class="details--riche">
<summary>

**3. Opposer aléa moral et antisélection.**

</summary>

|  | **Antisélection** | **Aléa moral** |
|---|---|---|
| Ce qui est caché | **UN TYPE** exogène | **UNE ACTION** choisie |
| Quand | **AVANT** le contrat | **APRÈS** le contrat |
| L'effet | Le pool **se dégrade** | L'agent **relâche son effort** |
| Le remède | **Signalement / criblage** | **Contrats INCITATIFS** |

*(Le §8.3 récapitule explicitement cette opposition et ses remèdes.)*

</details>

<details class="details--riche">
<summary>

**4. Décrire le modèle formel.**

</summary>

**Un seul** consommateur, **une seule** compagnie. Pertes $l\in\{0,1,\dots,L\}$ selon **la SÉVÉRITÉ** — *« il est commode de se référer à [éviter l'accident] comme **une perte de ZÉRO dollar** »*.

$\pi_l(e)>0$ avec $\sum_l\pi_l(e)=1$ ; $e\in\{0,1\}$ ; $d(1)>d(0)$ ; $u$ **VNM strictement croissante et concave** ; $w>L$.

⚠️ **La compagnie observe $l$, PAS $e$** ⟹ *« elle **ne peut lier le bénéfice QU'AU MONTANT DE LA PERTE** »* ⟹ une police est

$$\big(p,\ B_0,\ B_1,\ \dots,\ B_L\big)$$

</details>

<details class="details--riche">
<summary>

**5. Énoncer l'hypothèse 8.1 et la lire.**

</summary>

$$\frac{\pi_l(0)}{\pi_l(1)} \quad\textbf{strictement CROISSANT en } l\in\{0,\dots,L\}$$

> *« Elle dit que **CONDITIONNELLEMENT à l'observation de la perte $l$, la probabilité RELATIVE que l'effort BAS ait été fourni, par rapport à l'effort élevé, AUGMENTE AVEC $l$**. Ainsi, **on serait PLUS DISPOSÉ À PARIER sur l'effort bas quand la perte observée est PLUS ÉLEVÉE**. »*

**Sa raison d'être** : *« saisir l'idée qu'**un effort plus élevé résulte en une probabilité PLUS FAIBLE d'un accident SÉRIEUX** »*.

</details>

<details class="details--riche">
<summary>

**6. Où l'hypothèse 8.1 est-elle utilisée ?**

</summary>

| Où | Ce qu'elle donne |
|---|---|
| **§8.2.1** | L'effort élevé **RÉDUIT la perte espérée** |
| **§8.2.2, $\lambda\neq0$** | Il existe $l,l'$ avec $\pi_l(0)>\pi_l(1)$ et $\pi_{l'}(0)<\pi_{l'}(1)$ ⟹ **le crochet change de signe** |
| **§8.2.2, $\beta>0$ et (8.23)** | La **monotonie** du membre de droite de (8.22) |
| **Exercice 8.13** | $\sum_l\pi_l(0)x_l>\sum_l\pi_l(1)x_l$ pour toute suite **croissante** |

⚠️ **L'exercice 8.13 est l'outil que le livre invoque DEUX fois** dans le §8.2.2.

</details>

<details class="details--riche">
<summary>

**7. Écrire le problème (8.7) et dire ce que la contrainte garantit.**

</summary>

$$\max_{e,p,B_0,\dots,B_L}\ p-\sum_{l=0}^{L}\pi_l(e)B_l \quad\text{s.c.}\quad \sum_{l=0}^{L}\pi_l(e)u(w-p-l+B_l)-d(e)\geq\bar u$$

> *« La contrainte garantit que **la police donne au consommateur AU MOINS son utilité de réservation — donc qu'il soit DISPOSÉ à accepter les termes ET à FOURNIR l'effort requis**. »*

⚠️ *(Note 12.)* $\bar u\geq\max_e\sum_l\pi_l(e)u(w-l)-d(e)$ *(l'auto-assurance)*, **mais peut être strictement plus grande** s'il y a **d'autres compagnies**.

</details>

<details class="details--riche">
<summary>

**8. Résoudre le cas symétrique.**

</summary>

**Fixer $e$** et former le lagrangien en $(p,B_0,\dots,B_L)$ **seuls**.

| Pas | Le résultat |
|---|---|
| **1** | **(8.8) est REDONDANTE** — impliquée par les $(L+1)$ équations (8.9) ⟹ $(L+2)$ équations pour $(L+3)$ inconnues |
| **2** | (8.9) ⟹ $\lambda>0$ et **$u'(w-p-l+B_l)=1/\lambda$ pour tout $l$** ⟹ **$B_l-l$ CONSTANT** *(par injectivité de $u'$)* |
| **3** | $\lambda>0$ ⟹ **la contrainte est SATURÉE** ⟹ $u(w-p-l+B_l)=d(e)+\bar u$ (8.11) |
| **4** | **Poser $B_0=0$ sans perte** ⟹ $l=0$ dans (8.11) **détermine $p$** ⟹ $$\boxed{B_l=l}$$ |

</details>

<details class="details--riche">
<summary>

**9. Pourquoi $B_0=0$ est-il sans perte ?**

</summary>

**L'argument de comptage** : *« il n'y a que $(L+2)$ équations indépendantes et $(L+3)$ inconnues »*.

⚠️ **L'argument direct** *(note 13)* : *« il était clair **DÈS LE DÉPART** que c'était inoffensif, parce que **des changements de $B_0$ peuvent TOUJOURS être COMPENSÉS par des changements correspondants du prix $p$ et des bénéfices $B_1,\dots,B_L$ SANS changer l'utilité du consommateur ni les profits de la compagnie** »*.

</details>

<details class="details--riche">
<summary>

**10. Interpréter la solution symétrique.**

</summary>

$$B_l=l \qquad\textbf{pour tout } l$$

> *« **Pour l'un OU l'autre niveau d'effort, la solution symétrique fournit L'ASSURANCE COMPLÈTE à chaque niveau de perte.** »*

> ⚠️ *« **Aucune surprise, parce que LE CONSOMMATEUR EST STRICTEMENT AVERSE AU RISQUE et LA COMPAGNIE EST NEUTRE. C'est simplement un exemple de PARTAGE EFFICACE DU RISQUE.** »*

Et *« le prix ÉGALISE l'utilité du consommateur avec son **utilité de réservation** »*.

</details>

<details class="details--riche">
<summary>

**11. Décrire l'arbitrage sur l'effort.**

</summary>

Le prix optimal est donné par $u\big(w-p(e)\big)=d(e)+\bar u$ (8.12), et la compagnie maximise $p(e)-\sum_l\pi_l(e)\,l$.

| L'option | Son avantage | Sa source |
|---|---|---|
| **$e=0$** | **PRIX PLUS ÉLEVÉ** | **$d(0)<d(1)$** dans (8.12) |
| **$e=1$** | **PERTE ESPÉRÉE PLUS FAIBLE** | **L'hypothèse 8.1** |

> *« **On doit simplement vérifier quel niveau est le meilleur dans chaque cas spécifique.** »*

⚠️ **Mais dans les deux cas, la police est l'ASSURANCE COMPLÈTE** ⟹ **l'issue est PARETO-EFFICACE**.

</details>

<details class="details--riche">
<summary>

**12. Quelle contrainte l'asymétrie ajoute-t-elle, et que garantit-elle ?**

</summary>

**Une seule** — la **CONTRAINTE D'INCITATION** :

$$\sum_l\pi_l(e)u(w-p-l+B_l)-d(e)\ \geq\ \sum_l\pi_l(e')u(w-p-l+B_l)-d(e') \tag{8.15}$$

> *« Elle garantit que **$e$, le niveau que la compagnie a EN TÊTE en calculant ses profits, est LE MÊME que celui EFFECTIVEMENT CHOISI par le consommateur, car elle garantit que CE NIVEAU MAXIMISE SON ESPÉRANCE D'UTILITÉ étant donnée la police**. »*

**L'idée** : *« **la compagnie doit garantir que LA NATURE MÊME DE LA POLICE rend optimal pour le consommateur de CHOISIR VOLONTAIREMENT l'effort désiré** »*.

</details>

<details class="details--riche">
<summary>

**13. Traiter le cas $e=0$ sous asymétrie.**

</summary>

**L'argument court** :

1. Sans (8.15), l'optimum est $u(w-p)=d(0)+\bar u$ et $B_l=l$ (8.16).
2. *« **Ajouter la contrainte NE PEUT PAS AUGMENTER les profits maximisés.** »*
3. *« Donc **SI la solution la satisfait, elle DOIT être la police optimale**. »*
4. **Elle la satisfait** : avec $B_l=l$, (8.15) se réduit à $d(0)\geq d(1)$ — **vraie STRICTEMENT par hypothèse**.

> *« **Induire l'effort BAS exige de la compagnie qu'elle offre LA MÊME POLICE QUE SI L'EFFORT ÉTAIT OBSERVABLE.** »*

</details>

<details class="details--riche">
<summary>

**14. Pourquoi (8.15) se réduit-elle à $d(0)\geq d(1)$ ?**

</summary>

*(Enrichissement.)* Avec $B_l=l$, l'argument $w-p-l+B_l=w-p$ **ne dépend plus de $l$**. Les deux membres deviennent

$$\Big[\sum_l\pi_l(0)\Big]u(w-p)-d(0) \qquad\text{et}\qquad \Big[\sum_l\pi_l(1)\Big]u(w-p)-d(1)$$

et **les deux sommes valent 1** ⟹ la contrainte est $-d(0)\geq-d(1)$.

⚠️ **L'assurance complète rend le consommateur TOTALEMENT indifférent aux probabilités** — il n'a **aucune raison** de fournir un effort coûteux.

</details>

<details class="details--riche">
<summary>

**15. Écrire le lagrangien et l'équation maîtresse pour $e=1$.**

</summary>

Deux multiplicateurs : $\lambda$ *(participation, 8.14)* et $\beta$ *(incitation, 8.15)*. **Puisque $e=1$, on a $e'=0$.**

La CPO en $B_l$ :

$$-\pi_l(1)+\big[\lambda\pi_l(1)+\beta(\pi_l(1)-\pi_l(0))\big]u'(w-p-l+B_l)=0 \tag{8.19}$$

**En divisant par $\pi_l(1)$ et en inversant :**

$$\boxed{\;\frac{1}{u'(w-p+B_l-l)}=\lambda+\beta\left[1-\frac{\pi_l(0)}{\pi_l(1)}\right]\;} \tag{8.22}$$

⚠️ **Tout le reste du §8.2.2 est une analyse de CETTE SEULE équation.**

</details>

<details class="details--riche">
<summary>

**16. Démontrer que $\beta\neq0$.**

</summary>

**Par l'absurde**, $\beta=0$ ⟹ *« **(8.22) impliquerait que le membre de gauche est CONSTANT en $l$**, donc que $w-p+B_l-l$ est constant »* — **l'assurance complète**.

⚠️ *« **Mais ceci ne peut pas tenir parce qu'alors la CONDITION (8.21) ÉCHOUE** »* : son membre de gauche devient

$$\Big[\sum_l\pi_l(0)-\sum_l\pi_l(1)\Big]u(c)-d(0)+d(1)=d(1)-d(0)>0$$

alors que **(8.21) exige $\leq0$**. $\blacksquare$

**Économiquement** : **l'assurance complète est INCOMPATIBLE avec l'effort élevé**.

</details>

<details class="details--riche">
<summary>

**17. Démontrer que $\lambda>0$.**

</summary>

**Pas 1** : l'hypothèse 8.1 donne un $l$ avec $\pi_l(0)\neq\pi_l(1)$. *« Parce que **$\sum_l\pi_l(0)=\sum_l\pi_l(1)=1$**, il doit exister $l$ ET $l'$ tels que $\pi_l(0)>\pi_l(1)$ et $\pi_{l'}(0)<\pi_{l'}(1)$ »* — **deux distributions distinctes sommant à 1 se croisent**.

⟹ **le crochet $\big[1-\pi_l(0)/\pi_l(1)\big]$ prend des valeurs des DEUX signes**.

**Pas 2** : *« si $\lambda=0$, alors **parce que $\beta\neq0$, le MEMBRE DE DROITE prend des valeurs positives ET négatives. Cependant, LE MEMBRE DE GAUCHE EST TOUJOURS STRICTEMENT POSITIF** »* *(c'est $1/u'$)*. Donc $\lambda\neq0$ — *« **en effet, cet argument montre que $\lambda>0$** »*. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**18. Que signifie le fait que $\lambda$ et $\beta$ soient tous deux non nuls ?**

</summary>

> *« **Le fait que $\lambda$ ET $\beta$ soient non nuls implique que LES DEUX CONTRAINTES, (8.20) ET (8.21), SONT SATURÉES à l'optimum.** »*

$$\boxed{\;\textbf{Le consommateur est RAMENÉ à } \bar u \textbf{ ET il est JUSTE INDIFFÉRENT entre } e=1 \textbf{ et } e=0.\;}$$

⚠️ **C'est la signature du contrat incitatif optimal** : le principal **extrait tout le surplus** ET **ne laisse aucune marge** sur l'incitation.

</details>

<details class="details--riche">
<summary>

**19. Démontrer que $\beta>0$.**

</summary>

**Par l'absurde**, $\beta<0$.

| Pas | Le raisonnement |
|---|---|
| **1** | L'hypothèse 8.1 ⟹ $\big[1-\pi_l(0)/\pi_l(1)\big]$ **strictement DÉCROISSANT** ; avec $\beta<0$ ⟹ **membre de droite strictement CROISSANT** |
| **2** | ⟹ $1/u'$ croissant ⟹ **$u'$ strictement DÉCROISSANT** |
| **3** | $u$ **strictement concave** ⟹ l'argument $w-p+B_l-l$ est **strictement CROISSANT** ⟹ **$B_l-l$ croissant** ⟹ **$u(\cdot)$ croissante** |
| **4** | **Exercice 8.13** appliqué à cette suite **croissante** ⟹ $\sum_l(\pi_l(1)-\pi_l(0))u(\cdot)<0$ |
| **5** | *« **Ceci CONTREDIT (8.21), parce que $d(0)<d(1)$.** »* $\blacksquare$ |

</details>

<details class="details--riche">
<summary>

**20. Énoncer et interpréter (8.23).**

</summary>

$\beta>0$ + hypothèse 8.1 ⟹ **membre de droite strictement DÉCROISSANT** ⟹ $u'$ **strictement croissant** ⟹

$$\boxed{\;l-B_l \ \textbf{ STRICTEMENT CROISSANT en } l\;} \tag{8.23}$$

> *« Avec $B_0=0$, **la condition (8.23) indique que LA POLICE OPTIMALE À EFFORT ÉLEVÉ NE FOURNIT PAS L'ASSURANCE COMPLÈTE — elle spécifie UN PAIEMENT DE FRANCHISE QUI AUGMENTE AVEC LA TAILLE DE LA PERTE.** »*

| Cas | La franchise |
|---|---|
| **Symétrique** | $l-B_l=0$ **partout** |
| **Asymétrique, $e=1$** | $0$ en $l=0$, puis **strictement croissante** |

</details>

<details class="details--riche">
<summary>

**21. Donner l'intuition de la franchise croissante.**

</summary>

> *« **Ceci est très INTUITIF. Pour donner au consommateur une incitation à choisir l'effort élevé, IL FAUT QU'IL Y AIT QUELQUE CHOSE POUR LUI LÀ-DEDANS.** »*

Quand $l-B_l$ croît, **il y a un BÉNÉFICE D'UTILITÉ à l'effort élevé** :

$$\sum_{l}\big(\pi_l(1)-\pi_l(0)\big)u(w-p-l+B_l)\ >\ 0$$

⚠️ **Cela découle de (8.23) ET du rapport de vraisemblance monotone** *(exercice 8.13, avec une suite **DÉCROISSANTE** — l'inégalité **s'inverse**)*.

> *« Il y a aussi **un COÛT**, $d(1)-d(0)>0$. **La police est TAILLÉE pour que le BÉNÉFICE ÉGALE JUSTE LE COÛT.** »* — c'est **(8.21) saturée**.

</details>

<details class="details--riche">
<summary>

**22. Analyser l'efficacité, cas par cas.**

</summary>

**CAS 1 — $e^*=0$ sous symétrie.**

*« **Précisément la même police (d'assurance complète) sera optimale** »* — car **(a)** elle donne **les mêmes profits** et **(b)** *« les profits maximaux quand $e=1$ **ne sont PAS plus élevés** sous asymétrie, **parce qu'il y a une CONTRAINTE SUPPLÉMENTAIRE** »*.

⟹ *« **parce que l'issue symétrique est Pareto-efficace, l'asymétrique le sera AUSSI** »*.

**CAS 2 — $e^*=1$ sous symétrie.**

*« Il peut fort bien être que les profits soient **substantiellement plus bas** en tentant d'induire l'effort élevé. **Parce que les profits conditionnels à l'effort BAS sont IDENTIQUES dans les deux cas, il peut être optimal de BASCULER vers $e=0$.** »*

⚠️ *« **Bien qu'optimal pour la compagnie, CE NE SERAIT PAS Pareto-efficace : L'UTILITÉ DU CONSOMMATEUR EST INCHANGÉE ($=\bar u$), MAIS LES PROFITS SONT STRICTEMENT PLUS BAS.** »*

</details>

<details class="details--riche">
<summary>

**23. Qui supporte le coût de l'inefficacité ?**

</summary>

⚠️ **LE PRINCIPAL — la compagnie.**

> *« **L'utilité du consommateur est INCHANGÉE (et égale à $\bar u$), mais LES PROFITS DE LA COMPAGNIE SONT STRICTEMENT PLUS BAS.** »*

**Pourquoi** : la contrainte de **participation** est saturée dans **les deux** régimes, donc le consommateur obtient **exactement $\bar u$** quoi qu'il arrive. **Tout le surplus perdu vient des profits.**

> *« Ainsi, **une fois encore, les effets de l'information asymétrique peuvent se révéler dans des issues PARETO-INEFFICACES**. »*

</details>

<details class="details--riche">
<summary>

**24. Que dit le §8.3 sur la portée des résultats ?**

</summary>

> *« La distribution de l'information peut avoir un impact **PROFOND et parfois SAISISSANT**. **L'information asymétrique peut faire ÉCHOUER les marchés, en ce que DES ÉCHANGES MUTUELLEMENT BÉNÉFIQUES RESTENT INEXPLOITÉS. C'est un aspect des plus TROUBLANTS d'un point de vue NORMATIF.** »*

**Les sources du chapitre** : **Rothschild et Stiglitz (1976)** et **Wilson (1977)**.

| Phénomène | Autres marchés | Auteurs |
|---|---|---|
| **Antisélection** | **voitures d'occasion**, **marché du travail** | **Akerlof (1970)**, **Spence (1973)** |
| **Aléa moral** | employeur-employé, médecin-patient, **et même les MARIAGES** | **Grossman-Hart (1983)**, **Holmström (1979a, 1982)** |

</details>

<details class="details--riche">
<summary>

**25. Quels remèdes le livre nomme-t-il, et sur quoi conclut-il ?**

</summary>

> *« **Pour l'essentiel, nous nous sommes concentrés SUR LA MALADIE ET SES SYMPTÔMES, ne suggérant qu'occasionnellement un remède. Nous terminons en notant que TRÈS SOUVENT CES PROBLÈMES PEUVENT ÊTRE ATTÉNUÉS, SINON SURMONTÉS.** »*

| Le problème | Le remède |
|---|---|
| **Antisélection** | *« le **SIGNALEMENT** ou le **CRIBLAGE** peuvent aider »* |
| **Aléa moral** | *« **des CONTRATS conçus pour que les INCITATIONS des agents les conduisent PLUS PRÈS d'issues Pareto-efficaces** »* |

> *« **Peu de réponses simples et largement applicables — mais un domaine où TOUTE LA CRÉATIVITÉ, L'INTUITION ET LA RIGUEUR LOGIQUE de l'analyste peuvent payer DE BEAUX DIVIDENDES.** »*

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Ce que les compagnies « ne sont pas » ? | **Naïves** |
| Ce dont l'incitation à conduire prudemment dépend ? | Elle **DIMINUE avec le montant de couverture** |
| Définition de l'aléa moral ? | Le principal a un **intérêt** dans l'action de l'agent, **non observable** |
| Le problème principal-agent ? | **Concevoir un SCHÉMA D'INCITATION** |
| Ce qui est caché dans l'aléa moral ? | **UNE ACTION** *(pas un type)* |
| Quand l'information manque ? | **APRÈS** le contrat |
| Les niveaux de perte ? | $l\in\{0,1,\dots,L\}$ — **$l=0$ = pas d'accident** |
| Les niveaux d'effort ? | **$e=0$ (bas) et $e=1$ (haut)**, avec $d(1)>d(0)$ |
| Ce que la compagnie observe ? | **$l$, mais PAS $e$** |
| La forme d'une police ? | $(p,\ B_0,\ B_1,\dots,B_L)$ |
| Ce à quoi le bénéfice peut être lié ? | **Uniquement à la PERTE** |
| Hypothèse 8.1 ? | $\pi_l(0)/\pi_l(1)$ **strictement CROISSANT** en $l$ |
| Sa lecture ? | *« Une **grosse perte** rend l'effort **BAS** plus vraisemblable »* |
| L'inégalité de l'exercice 8.13 ? | $\sum_l\pi_l(0)x_l>\sum_l\pi_l(1)x_l$ pour $(x_l)$ **croissante** |
| Combien de fois le livre l'invoque ? | **DEUX** — pour $\beta>0$ et pour le bénéfice |
| L'objectif de (8.7) ? | $p-\sum_l\pi_l(e)B_l$ |
| Sa contrainte ? | **PARTICIPATION** — au moins $\bar u$ |
| Ce que $\bar u$ vaut au minimum ? | $\max_e\sum_l\pi_l(e)u(w-l)-d(e)$ *(auto-assurance)* |
| Quelle CPO est redondante ? | **Celle en $p$ (8.8)** |
| Ce que cela permet ? | **Poser $B_0=0$ sans perte** |
| Ce que (8.9) donne ? | $u'(w-p-l+B_l)=1/\lambda$ pour tout $l$ |
| Ce qui s'ensuit ? | **$B_l-l$ CONSTANT** |
| Pourquoi ? | $u'$ est **injective** *(stricte concavité)* |
| Le signe de $\lambda$ ? | **$\lambda>0$** ⟹ contrainte **saturée** |
| La solution symétrique ? | $$\boxed{B_l=l}$$ — **ASSURANCE COMPLÈTE** |
| Pourquoi ce n'est pas surprenant ? | **Averse vs NEUTRE** ⟹ **partage EFFICACE du risque** |
| L'équation du prix ? | $u(w-p(e))=d(e)+\bar u$ |
| L'avantage de $e=0$ ? | Un **PRIX PLUS ÉLEVÉ** *(car $d(0)<d(1)$)* |
| L'avantage de $e=1$ ? | Une **PERTE ESPÉRÉE PLUS FAIBLE** *(hypothèse 8.1)* |
| Ce qui reste vrai quel que soit $e$ ? | **L'assurance COMPLÈTE** ⟹ **Pareto-efficace** |
| Combien de contraintes sous asymétrie ? | **Deux** — participation **et** incitation |
| Ce que (8.15) garantit ? | Que l'effort **en tête** est celui **choisi VOLONTAIREMENT** |
| Comment traiter $e=0$ ? | **Pas de lagrangien** — vérifier que (8.16) **satisfait** (8.15) |
| À quoi (8.15) se réduit alors ? | **$d(0)\geq d(1)$** |
| Pourquoi ? | Avec $B_l=l$, l'argument **ne dépend plus de $l$** et **les sommes valent 1** |
| Le coût de l'asymétrie pour $e=0$ ? | **NUL** — *« la MÊME police »* |
| Les deux multiplicateurs pour $e=1$ ? | $\lambda$ *(participation)*, $\beta$ *(incitation)* |
| L'équation maîtresse (8.22) ? | $\dfrac{1}{u'(w-p+B_l-l)}=\lambda+\beta\Big[1-\dfrac{\pi_l(0)}{\pi_l(1)}\Big]$ |
| Le signe du membre de gauche ? | **Toujours strictement POSITIF** |
| Pourquoi $\beta\neq0$ ? | Sinon **assurance complète** ⟹ **(8.21) ÉCHOUE** |
| Le calcul qui le montre ? | Le membre de gauche de (8.21) devient **$d(1)-d(0)>0$** |
| Pourquoi $\lambda\neq0$ ? | Le **crochet change de signe**, pas le membre de gauche |
| Pourquoi le crochet change de signe ? | **Deux distributions distinctes sommant à 1 SE CROISENT** |
| Le signe final de $\lambda$ ? | **$\lambda>0$** |
| Ce que les deux non-nullités impliquent ? | **LES DEUX contraintes sont SATURÉES** |
| Ce que cela signifie ? | Consommateur à **$\bar u$** **ET** **juste indifférent** entre les efforts |
| Pourquoi $\beta>0$ ? | Si $\beta<0$, $B_l-l$ **croît**, et **l'exercice 8.13 contredit (8.21)** |
| Le rôle de la concavité dans cette preuve ? | $u'$ **décroissante** ⟹ inverser le sens de monotonie |
| La conclusion (8.23) ? | **$l-B_l$ STRICTEMENT CROISSANT** |
| Sa lecture ? | **Une FRANCHISE qui AUGMENTE avec la perte** |
| La franchise en $l=0$ ? | **Zéro** *(car $B_0=0$)* |
| L'intuition du livre ? | *« **il faut qu'il y ait QUELQUE CHOSE POUR LUI là-dedans** »* |
| Le bénéfice d'utilité de l'effort élevé ? | $\sum_l(\pi_l(1)-\pi_l(0))u(w-p-l+B_l)>0$ |
| Pourquoi l'inégalité s'inverse ici ? | La suite $u(w-p-l+B_l)$ est **DÉCROISSANTE** |
| À quoi ce bénéfice est-il égalisé ? | **Exactement à $d(1)-d(0)$** |
| Ce qui traduit cette égalité ? | **(8.21) SATURÉE** |
| Cas 1 d'efficacité ? | Si $e^*=0$ sous symétrie ⟹ **rien ne change** ⟹ **EFFICACE** |
| Pourquoi $e=1$ ne peut pas faire mieux ? | Il y a **une contrainte de plus** |
| Cas 2 ? | Si $e^*=1$ ⟹ **basculement possible vers $e=0$** ⟹ **INEFFICACE** |
| Qui supporte le coût ? | **LA COMPAGNIE** — l'utilité du consommateur est **inchangée** |
| Pourquoi le consommateur ne perd rien ? | Sa contrainte de **participation est saturée** dans **les deux** régimes |
| Les sources du modèle d'assurance ? | **Rothschild-Stiglitz (1976)** et **Wilson (1977)** |
| L'antisélection ailleurs ? | **Voitures d'occasion** *(Akerlof 1970)*, **travail** *(Spence 1973)* |
| L'aléa moral ailleurs ? | Employeur-employé, médecin-patient, **et même les MARIAGES** |
| Ses auteurs ? | **Grossman-Hart (1983)**, **Holmström (1979a, 1982)** |
| Le remède à l'antisélection ? | **Signalement** ou **criblage** |
| Le remède à l'aléa moral ? | **Des CONTRATS INCITATIFS** |
| Ce sur quoi le chapitre s'est concentré ? | *« **la MALADIE et ses SYMPTÔMES** »* |
| Le mot de la fin ? | *« **Peu de réponses simples — mais la créativité, l'intuition et la rigueur PAIENT DE BEAUX DIVIDENDES.** »* |
