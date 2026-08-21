# Fiche 519 — Les quatre enchères standard et le théorème d'équivalence des revenus

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 9 « Auctions and Mechanism Design », §9.1 « The Four Standard Auctions », §9.2 « The Independent Private Values Model » et §9.3 « The Revenue Equivalence Theorem » (p. 427-444) |
| **Difficulté** | Avancé |
| **Temps d'étude estimé** | 150 min |
| **Prérequis** | Fiche 515 (équilibre de Nash, jeux bayésiens, équilibre bayésien-nashien) · fiche 506 (utilité VNM, neutralité au risque) · fiche 517 (information asymétrique) · calcul intégral : intégration par parties, interversion de l'ordre d'intégration, théorème fondamental |
| **Concepts clés** | Enchère au premier prix sous pli scellé, enchère au second prix, enchère hollandaise, enchère anglaise, valeurs privées indépendantes, fonction d'enchère, équilibre de Nash symétrique, sous-enchère, stratégie faiblement dominante, statistique d'ordre, revenu espéré, mécanisme de vente direct, compatibilité incitative, caractérisation des mécanismes incitatifs, théorème d'équivalence des revenus, efficacité allocative |
| **Poids à l'examen** | Les **définitions des quatre enchères** · la dérivation **complète** de $\hat b(v)$ par le procédé de « l'ami » · l'**interprétation** de $\hat b$ *(l'espérance de la seconde valeur conditionnellement à la victoire)* · les **arguments de dominance faible** pour le second prix et l'enchère anglaise · le **calcul d'équivalence** par interversion d'intégrales · les **définitions 9.1 et 9.2** · la **construction (9.9)** · le **théorème 9.5** et sa preuve dans les deux sens · le **théorème 9.6** et son interprétation. |

## 🎯 Vue d'ensemble

```
LE FIL DES §9.1 A §9.3 :
les quatre encheres standard rapportent-elles la MEME chose ?

  L'ANNONCE DU CHAPITRE 9

     « Dans la plupart des marches reels, LES VENDEURS N'ONT PAS
       une connaissance parfaite de la demande. »

     LE DESIGN DE MECANISMES : « une theorie generale sur COMMENT
     et QUAND la conception d'institutions appropriees peut
     atteindre des OBJECTIFS particuliers. »

     « LA SUBTILITE est de garantir que le mecanisme donne a ceux
       qui possedent l'information L'INCITATION A LA REVELER. »

  §9.1  LES QUATRE ENCHERES STANDARD

     PREMIER PRIX sous pli scelle : le plus offrant paie SON offre
     SECOND PRIX sous pli scelle  : le plus offrant paie la
                                    DEUXIEME offre
     HOLLANDAISE : le prix DESCEND, le premier a lever la main gagne
     ANGLAISE    : le prix MONTE, on se retire, le dernier gagne

  §9.2  LE MODELE A VALEURS PRIVEES INDEPENDANTES

     vendeur et acheteurs NEUTRES au risque ; valeur du vendeur = 0
     v_i tiree sur [0, 1] selon F_i, densite f_i, INDEPENDANTES
     chacun connait SA valeur ; les DENSITES sont publiques
     paiement de i : v_i - p s'il gagne,  -p sinon

  §9.2.1  LE PREMIER PRIX

     Le procede de « L'AMI » :  u(r, v) = F^{N-1}(r) (v - bhat(r))
     maximise en r = v  ->  deriver, evaluer en r = v, reconnaitre
     une derivee de PRODUIT, integrer

        bhat(v) = [1 / F^{N-1}(v)] . INTEGRALE_0^v  x d F^{N-1}(x)

     THEOREME 9.1 : c'est L'UNIQUE equilibre symetrique

     EXEMPLE 9.1 (uniforme) :  bhat(v) = v - v/N

     LA LECTURE :  « chaque encherisseur mise L'ESPERANCE DE LA
     VALEUR DU SECOND, CONDITIONNELLEMENT A GAGNER l'enchere. »

  §9.2.2  LA HOLLANDAISE  =  LE PREMIER PRIX  (THEOREME 9.2)
          -> memes revenus EX POST

  §9.2.3  LE SECOND PRIX

     Miser SA VALEUR est une strategie FAIBLEMENT DOMINANTE
     (THEOREME 9.3) -- pas besoin de symetrie NI d'independance

  §9.2.4  L'ANGLAISE

     Se retirer QUAND LE PRIX ATTEINT SA VALEUR est faiblement
     dominant (THEOREME 9.4)
     -> issue IDENTIQUE au second prix, EX POST

  §9.2.5  LA COMPARAISON DES REVENUS

     R_FPA = N INT bhat(v) f(v) F^{N-1}(v) dv          (9.6)
     R_SPA = N(N-1) INT v F^{N-2}(v) f(v) (1 - F(v)) dv (9.7)

     -> par INTERVERSION DE L'ORDRE D'INTEGRATION :  R_FPA = R_SPA

     « Remarquablement, les deux rapportent LE MEME revenu espere,
       QUELLE QUE SOIT la distribution commune des valeurs ! »

  §9.3  LE THEOREME D'EQUIVALENCE DES REVENUS

     DEF. 9.1  MECANISME DE VENTE DIRECT : p_i(v) et c_i(v)
     DEF. 9.2  COMPATIBLE INCITATIVEMENT : dire la VERITE est un
               equilibre BAYESIEN-NASHIEN

     ATTENTION : ce N'EST PAS une strategie DOMINANTE

     La CONSTRUCTION (9.9) : chaque enchere standard EQUIVAUT a un
     mecanisme direct compatible incitativement

     THEOREME 9.5  CARACTERISATION
        (i)  pbar_i(v_i) NON DECROISSANTE
        (ii) cbar_i(v_i) = cbar_i(0) + pbar_i(v_i) v_i
                           - INTEGRALE_0^{v_i} pbar_i(x) dx

     THEOREME 9.6  EQUIVALENCE DES REVENUS
        memes fonctions d'assignation + meme sort du type ZERO
        =>  MEMES revenus esperes

     §9.3.2  EFFICACITE : les quatre encheres allouent l'objet a
     celui qui l'evalue le plus -- MAIS pour la hollandaise et le
     premier prix, CELA REPOSE SUR LA SYMETRIE.
```

> ⚠️ **Note de transcription — identique aux fiches 500-518.** Le PDF de ce chapitre exporte **le signe moins « $-$ » comme un point d'exclamation « ! »** *(ainsi « $v_i\,!\,p$ » signifie $v_i-p$ et « $F^{N!1}$ » signifie $F^{N-1}$)*, perd le **barré du $\neq$** *(« $j=i$ » signifie $j\neq i$)*, ainsi que $\sum$, $\int$ et $\Pi$. Les exposants et les indices sont fréquemment **recollés** au symbole. Les formules citées ici sont **rétablies depuis la prose et vérifiées par le calcul**. **Réparation de transcription, non ajout de contenu.**

## 🔴 Concept 1 — L'annonce du chapitre 9

### 1.1 Le problème du monopoleur mal informé

> *« **Dans la plupart des marchés du monde réel, LES VENDEURS N'ONT PAS une connaissance PARFAITE de la demande de marché. Au lieu de cela, les vendeurs n'ont typiquement qu'une information STATISTIQUE. SEULS LES ACHETEURS EUX-MÊMES savent précisément combien du bien ils sont disposés à acheter à un prix donné.** Dans ce chapitre, **nous revisitons le problème du MONOPOLE dans cette circonstance plus typique**. »*

> *« Peut-être **la situation la plus simple** où ces éléments sont présents survient **quand UN SEUL objet est mis aux enchères**. Là, **le vendeur ignore typiquement les valeurs des acheteurs mais peut néanmoins avoir de l'information sur LA DISTRIBUTION de ces valeurs**. »*

### 1.2 Les questions du chapitre

> *« **Chacune de ces enchères standard rapporte-t-elle le MÊME revenu au vendeur ? Sinon, laquelle est la MEILLEURE ? Y a-t-il un mécanisme de vente NON STANDARD encore MEILLEUR pour le vendeur ?** »*

### 🔴 1.3 Ce qu'est le design de mécanismes

> *« **Le DESIGN DE MÉCANISMES est une théorie GÉNÉRALE sur COMMENT et QUAND la conception d'INSTITUTIONS APPROPRIÉES peut atteindre des OBJECTIFS particuliers. Cette théorie est spécialement pertinente QUAND LE CONCEPTEUR A BESOIN, POUR ATTEINDRE SON BUT, D'UNE INFORMATION POSSÉDÉE UNIQUEMENT PAR D'AUTRES.** »*

$$\boxed{\;\textbf{« LA SUBTILITÉ dans la conception d'un mécanisme RÉUSSI est de GARANTIR}\\\textbf{QUE LE MÉCANISME DONNE À CEUX QUI POSSÈDENT L'INFORMATION NÉCESSAIRE}\\\textbf{L'INCITATION À LA RÉVÉLER AU CONCEPTEUR. »}\;}$$

**Le plan annoncé :**

> *« Nous commencerons par considérer **le problème de concevoir un mécanisme de vente MAXIMISANT LE REVENU**. Nous passerons ensuite au **problème de l'ALLOCATION EFFICACE DES RESSOURCES**. Dans les deux cas, **le problème de conception sera soumis à des CONTRAINTES INFORMATIONNELLES — les agents possédant de l'information privée devront être INCITÉS à la rapporter VÉRIDIQUEMENT**. »*

## 🔴 Concept 2 — §9.1 : les quatre enchères standard

### 2.1 Les définitions

> *« Considérez un vendeur avec **un seul objet** à vendre qui souhaite le vendre **à l'un de $N$ acheteurs au prix le plus élevé possible**. »*

| L'enchère | Sa règle |
|---|---|
| **PREMIER PRIX sous pli scellé** | *« Chaque enchérisseur soumet **une offre scellée**. **Le plus offrant GAGNE et paie SON OFFRE.** »* |
| **SECOND PRIX sous pli scellé** | *« Chaque enchérisseur soumet une offre scellée. **Le plus offrant gagne et paie LA DEUXIÈME OFFRE LA PLUS ÉLEVÉE.** »* |
| **HOLLANDAISE** | *« Le vendeur commence par **un prix TRÈS ÉLEVÉ et le RÉDUIT**. **Le PREMIER enchérisseur à lever la main gagne au prix courant.** »* |
| **ANGLAISE** | *« Le vendeur commence par **un prix très BAS (peut-être zéro) et l'AUGMENTE**. Chaque enchérisseur **signale quand il souhaite se RETIRER. Une fois retiré, il ne peut PAS reprendre.** Quand **un seul reste**, il gagne et paie le prix courant. »* |

> *(Note de bas de page 1.)* *« Nous supposerons **partout et sauf mention contraire** que, dans toutes les enchères, **les ÉGALITÉS d'offres sont brisées AU HASARD : chaque enchérisseur à égalité est également susceptible d'être déclaré vainqueur.** »*

### 🔴 2.2 La question qui organise tout

> *« **Pouvons-nous décider, même parmi ces quatre, laquelle est LA MEILLEURE pour le vendeur ? Pour avoir prise sur ce problème, nous devons commencer par UN MODÈLE.** »*

## 🔴 Concept 3 — §9.2 : le modèle à valeurs privées indépendantes

### 3.1 Les ingrédients

| L'élément | Sa spécification |
|---|---|
| Le vendeur | **NEUTRE au risque**, valeur de l'objet $=$ **zéro** |
| Les acheteurs | $N$, **tous NEUTRES au risque** |
| La valeur de $i$ | $v_i$ tirée sur $[0,1]$ selon $F_i$, de densité $f_i$ |
| L'indépendance | *« les valeurs des acheteurs sont **MUTUELLEMENT INDÉPENDANTES** »* |
| L'information | *« Chaque acheteur connaît **SA PROPRE valeur**, mais pas celles des autres. **Cependant, les densités $f_1,\dots,f_N$ sont PUBLIQUES** »* |
| Les paiements | **$v_i-p$ s'il gagne et paie $p$** ; **$-p$ s'il paie $p$ SANS gagner** |

> *(Note 2.)* *« Ceci revient à supposer que **l'objet a DÉJÀ été produit** et que **la valeur d'usage du vendeur est zéro**. »*

> *(Note 4.)* *« Bien qu'une telle issue [payer sans gagner] **ne soit possible dans AUCUNE des quatre enchères**, il y a **d'autres enchères (les enchères « TOUS PAIENT ») dans lesquelles les paiements doivent être faits QU'ON GAGNE OU NON**. »*

### 🔴 3.2 Ce que les deux mots signifient

> *« Ceci est connu comme le modèle à **VALEURS PRIVÉES INDÉPENDANTES**. »*

| Le mot | Sa signification, mot pour mot |
|---|---|
| **INDÉPENDANT** | *« l'information privée de chaque acheteur **est INDÉPENDANTE de celle de tout autre** »* |
| **VALEUR PRIVÉE** | *« une fois qu'un acheteur emploie sa propre information pour évaluer l'objet, **CETTE ÉVALUATION SERAIT INCHANGÉE s'il apprenait ensuite l'information privée de N'IMPORTE QUEL autre acheteur** — i.e. **l'information privée de chacun SUFFIT à déterminer sa valeur** »* |

> *(Note 5.)* *« Il y a des **modèles plus généraux** où les acheteurs obtiendraient **de l'information SUPPLÉMENTAIRE sur la valeur de l'objet** en apprenant l'information d'un autre, **mais nous ne les considérons pas ici**. »*

⚠️ **Un point de comptabilité** : *« avec **la décision de production DERRIÈRE lui** et **sa propre valeur égale à ZÉRO**, **maximiser le PROFIT équivaut à maximiser le REVENU** »*.

## 🔴 Concept 4 — §9.2.1 : la fonction d'enchère du premier prix

### 4.1 Le cadre et la difficulté

⚠️ **On suppose les acheteurs SYMÉTRIQUES ex ante** : $f_i(v)=f(v)$ pour tous $i$ et tout $v$.

> *« Si vous êtes un enchérisseur, **parce que vous préféreriez gagner à un prix PLUS BAS, vous voudrez miser BAS quand les autres misent bas et PLUS HAUT quand ils misent haut. Bien sûr, VOUS NE CONNAISSEZ PAS leurs offres, à cause du pli scellé. Pourtant, VOTRE OFFRE OPTIMALE DÉPEND de la manière dont les autres misent.** »*

⟹ *« un cadre **STRATÉGIQUE** dans lequel **l'action optimale de chacun dépend des actions des autres** »* ⟹ **on emploie les outils du chapitre 7**.

### 4.2 La stratégie d'un enchérisseur

> *« Parce que $b_i$ dépendra en général de la valeur de $i$, écrivons $b_i(v_i)$. **Parce que l'enchérisseur $i$ doit être prêt à soumettre une offre POUR CHACUNE de ses valeurs potentielles, nous pouvons voir sa stratégie comme UNE FONCTION D'ENCHÈRE** »*

$$b_i:\ [0,1]\ \longrightarrow\ \mathbb{R}_+$$

### 🔴 4.3 Les deux restrictions naturelles

| La restriction | Sa justification |
|---|---|
| **Fonctions STRICTEMENT CROISSANTES** | *« Il semble très naturel d'attendre que **les enchérisseurs à valeur plus élevée placent des offres plus élevées** »* |
| **SYMÉTRIE** | *« Parce que les enchérisseurs sont **symétriques ex ante**, il est naturel de supposer que **ceux ayant la MÊME valeur soumettent la MÊME offre** »* |

> *« Nous nous concentrons donc sur **la recherche d'une fonction $\hat b:[0,1]\to\mathbb{R}_+$ strictement croissante qui soit OPTIMALE pour chaque enchérisseur, ÉTANT DONNÉ que tous les autres l'emploient AUSSI. C'est-à-dire, nous cherchons UN ÉQUILIBRE DE NASH SYMÉTRIQUE en fonctions d'enchère strictement croissantes.** »*

### 🔴 4.4 Le procédé de « l'ami » — le cœur de la méthode

> *« L'exercice **mystérieux mais UTILE** est celui-ci : **imaginez que l'enchérisseur $i$ ne peut PAS assister à l'enchère et qu'il ENVOIE UN AMI miser pour lui. L'ami CONNAÎT la fonction d'équilibre $\hat b(\cdot)$, MAIS IL NE CONNAÎT PAS la valeur de $i$.** »*

> *« Si la valeur de $i$ est $v$, **il voudrait que son ami soumette $\hat b(v)$. Son ami peut le faire une fois que $i$ l'APPELLE et lui dit sa valeur.** »*

> ⚠️ *« **Clairement, l'enchérisseur $i$ N'A AUCUNE INCITATION À MENTIR À SON AMI. C'est-à-dire que, parmi toutes les valeurs $r\in[0,1]$ qu'il peut rapporter, SON PAIEMENT EST MAXIMISÉ EN RAPPORTANT SA VRAIE VALEUR $v$. Car rapporter $r$ résulte en ce que son ami soumette $\hat b(r)$ — mais si $i$ était là lui-même, il soumettrait $\hat b(v)$.** »*

### 4.5 Le paiement espéré

> *« Pour le calculer, **il est nécessaire de remarquer JUSTE DEUX choses.** »*

| # | La remarque |
|---|---|
| **1** | *« $i$ ne gagne que **quand l'offre soumise pour lui est la plus élevée**, i.e. quand $\hat b(r)>\hat b(v_j)$ pour tout $j\neq i$. **Parce que $\hat b$ est STRICTEMENT CROISSANTE, ceci survient précisément quand $r$ EXCÈDE LES VALEURS DES $N-1$ AUTRES**, ce qui a probabilité $\big(F(r)\big)^{N-1}$ »* |
| **2** | *« $i$ **ne paie QUE quand il gagne**, et il paie alors **son offre $\hat b(r)$** »* |

$$\boxed{\;u(r,v)=F^{N-1}(r)\big(v-\hat b(r)\big)\;} \tag{9.1}$$

### 4.6 La dérivation

<details class="details--riche">
<summary>

**Les quatre pas du calcul**

</summary>

**Pas 1 — la condition du premier ordre.** *« Parce que $\hat b$ est un équilibre, **(9.1) doit être maximisé quand $r=v$** »* ⟹ **la dérivée en $r$ s'annule en $r=v$**.

$$\frac{d}{dr}\Big[F^{N-1}(r)\big(v-\hat b(r)\big)\Big]=(N-1)F^{N-2}(r)f(r)\big(v-\hat b(r)\big)-F^{N-1}(r)\hat b'(r) \tag{9.2}$$

**Pas 2 — évaluer en $r=v$ et réarranger.**

$$(N-1)F^{N-2}(v)f(v)\hat b(v)+F^{N-1}(v)\hat b'(v)=(N-1)\,v\,f(v)\,F^{N-2}(v) \tag{9.3}$$

**Pas 3 — RECONNAÎTRE UNE DÉRIVÉE DE PRODUIT.**

> *« **En regardant de près le membre de gauche de (9.3), nous voyons que c'est JUSTE LA DÉRIVÉE DU PRODUIT $F^{N-1}(v)\hat b(v)$ par rapport à $v$.** »*

$$\frac{d}{dv}\Big[F^{N-1}(v)\hat b(v)\Big]=(N-1)\,v\,f(v)\,F^{N-2}(v) \tag{9.4}$$

**Pas 4 — intégrer et fixer la constante.**

$$F^{N-1}(v)\hat b(v)=(N-1)\int_0^v x\,f(x)\,F^{N-2}(x)\,dx+\text{constante}$$

> ⚠️ *« **En notant qu'un enchérisseur de valeur ZÉRO doit miser ZÉRO, nous concluons que LA CONSTANTE EST NULLE.** »*

$$\boxed{\;\hat b(v)=\frac{N-1}{F^{N-1}(v)}\int_0^v x\,f(x)\,F^{N-2}(x)\,dx \ =\ \frac{1}{F^{N-1}(v)}\int_0^v x\,dF^{N-1}(x)\;} \tag{9.5}$$

</details>

### 4.7 Le théorème 9.1

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.1 — Équilibre symétrique de l'enchère au premier prix</span>

Si $N$ enchérisseurs ont des valeurs privées indépendantes tirées de la distribution **commune** $F$, alors miser

$$\hat b(v)=\frac{1}{F^{N-1}(v)}\int_0^v x\,dF^{N-1}(x)$$

quand sa valeur est $v$ constitue **un équilibre de Nash SYMÉTRIQUE**. De plus, **c'est LE SEUL équilibre symétrique.**

</div>

> *« **Deux choses à remarquer** : d'abord, **comme nous l'avions SUPPOSÉ, elle est strictement croissante en $v$** *(exercice 9.1)* ; ensuite, **elle a été DÉTERMINÉE DE MANIÈRE UNIQUE**. »*

> *(Note 6.)* *« **Strictement parlant, nous n'avons PAS montré que c'est UN équilibre. Nous avons montré que SI un équilibre symétrique existe, ALORS ce doit être celui-ci.** Il vous est demandé de montrer que c'en est bien un en exercice. Vous pourriez aussi vous interroger sur les équilibres **ASYMÉTRIQUES** : **on peut montrer qu'il n'y en a AUCUN**, bien que nous ne le fassions pas ici. »*

### 4.8 L'exemple 9.1 : le cas uniforme

<details class="details--riche">
<summary>

**Le calcul complet**

</summary>

Avec $F(v)=v$ et $f(v)=1$ :

$$\hat b(v)=\frac{1}{v^{N-1}}\int_0^v x\,dx^{N-1}=\frac{1}{v^{N-1}}\int_0^v x(N-1)x^{N-2}dx=\frac{N-1}{v^{N-1}}\int_0^v x^{N-1}dx$$

$$=\frac{N-1}{v^{N-1}}\cdot\frac{1}{N}v^N=\boxed{\;v-\frac{v}{N}\;}$$

> *« Ainsi, **chaque enchérisseur RABOTE son offre, en misant MOINS que sa valeur. Notez que À MESURE QUE LE NOMBRE D'ENCHÉRISSEURS AUGMENTE, LES ENCHÉRISSEURS MISENT PLUS AGRESSIVEMENT.** »*

⚠️ **Le rabot vaut $v/N$** — il **s'évanouit** quand $N\to\infty$.

</details>

### 🔴 4.9 L'interprétation — l'idée à retenir de tout le §9.2

> *« Parce que **$F^{N-1}(\cdot)$ est la fonction de répartition de LA PLUS HAUTE VALEUR parmi les $N-1$ concurrents**, la stratégie du théorème 9.1 dit que **chaque enchérisseur mise L'ESPÉRANCE DE LA VALEUR DU SECOND, CONDITIONNELLEMENT À CE QUE LA SIENNE SOIT LA PLUS HAUTE**. »*

> *« Mais parce que **tous emploient la MÊME fonction strictement croissante, avoir la plus haute VALEUR équivaut à avoir la plus haute OFFRE, donc à GAGNER**. Nous pouvons donc dire : »*

$$\boxed{\;\textbf{« Dans l'unique équilibre symétrique du premier prix, chaque enchérisseur mise}\\\textbf{L'ESPÉRANCE DE LA VALEUR DU SECOND, CONDITIONNELLEMENT À GAGNER L'ENCHÈRE. »}\;}$$

> ⚠️ *« **L'idée qu'il faut miser CONDITIONNELLEMENT À GAGNER est très intuitive au premier prix, à cause du trait que SON OFFRE NE COMPTE QUE QUAND ON GAGNE. Parce que ce trait est présent dans D'AUTRES enchères aussi, CETTE IDÉE DOIT ÊTRE CONSIDÉRÉE COMME L'UN DES APERÇUS DE BASE DE NOTRE ANALYSE STRATÉGIQUE.** »*

## 🔴 Concept 5 — §9.2.2 : la hollandaise est le premier prix

### 5.1 L'argument, en une phrase

> *« Dans une enchère hollandaise, **chaque enchérisseur n'a QU'UNE SEULE décision à prendre, à savoir : « À QUEL PRIX dois-je lever la main pour signaler que je suis disposé à acheter à ce prix ? » De plus, celui qui choisit LE PRIX LE PLUS ÉLEVÉ gagne et PAIE CE PRIX.** »*

> ⚠️ *« **Par conséquent, en remplaçant le mot « PRIX » par le mot « OFFRE » dans la phrase précédente, nous voyons que CETTE ENCHÈRE EST ÉQUIVALENTE À UNE ENCHÈRE AU PREMIER PRIX !** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.2 — Équilibre symétrique de l'enchère hollandaise</span>

Lever la main quand le prix atteint $\dfrac{1}{F^{N-1}(v)}\displaystyle\int_0^v x\,dF^{N-1}(x)$ constitue **l'unique équilibre de Nash symétrique** d'une enchère hollandaise.

</div>

> *« **Clairement alors, le premier prix et la hollandaise rapportent EXACTEMENT le même revenu, EX POST (i.e. POUR CHAQUE réalisation des valeurs $v_1,\dots,v_N$).** »*

⚠️ **« Ex post » est le mot fort** : ce n'est pas seulement en espérance — **c'est réalisation par réalisation**.

## 🔴 Concept 6 — §9.2.3 : le second prix

### 6.1 L'objection naïve, et sa réfutation

<div class="callout" data-kind="intu">

<span class="callout__lab">pourquoi considérer une enchère au second prix. N'est-il pas ÉVIDENT que le premier prix doit rapporter PLUS ?</span>

*« On pourrait se demander Après tout, au premier prix le vendeur reçoit **l'offre la plus élevée**, alors qu'au second prix il ne reçoit que **la deuxième**. »*

</div>

> ⚠️ *« **Bien que cela puisse sembler convaincant, cela NÉGLIGE UN POINT CRUCIAL : LES ENCHÉRISSEURS MISERONT DIFFÉREMMENT dans les deux enchères.** »*

| L'enchère | Les incitations |
|---|---|
| **Premier prix** | *« il a une incitation à **AUGMENTER** son offre pour augmenter ses chances de gagner, **MAIS AUSSI une incitation à la RÉDUIRE pour baisser le prix qu'il paie quand il gagne** »* |
| **Second prix** | *« **LE SECOND EFFET EST ABSENT, parce que quand un enchérisseur gagne, LE MONTANT QU'IL PAIE EST INDÉPENDANT DE SON OFFRE** »* |

> *« Nous devrions donc attendre que **les enchérisseurs misent PLUS AGRESSIVEMENT au second prix**. Donc **il y a une chance que le second prix génère des revenus espérés PLUS ÉLEVÉS**. »*

> *« **Quand nous reconnaissons que le comportement CHANGE avec le format, la question de savoir laquelle rapporte plus n'est plus si évidente, n'est-ce pas ?** »*

### 🔴 6.2 L'argument de dominance faible

> *« **Heureusement, analyser le second prix est REMARQUABLEMENT DIRECT. Contrairement au premier prix, NOUS N'AVONS PAS BESOIN de restreindre à des enchérisseurs symétriques.** »*

> *(Note 7.)* *« **En fait, MÊME L'HYPOTHÈSE D'INDÉPENDANCE peut être abandonnée** *(exercice 9.5)*. »*

<details class="details--riche">
<summary>

**La démonstration, pas à pas**

</summary>

Soit $B$ **la plus haute offre soumise par les AUTRES** — inconnue de $i$.

> *« **Si $i$ gagnait, son offre serait la plus élevée et $B$ serait alors la DEUXIÈME. Il devrait donc payer $B$. EN EFFET, LE PRIX QUE $i$ DOIT PAYER EST LA PLUS HAUTE OFFRE DES AUTRES, $B$.** »*

| La situation | Ce que $i$ veut |
|---|---|
| $v_i>B$ | **GAGNER** *(sa valeur excède le prix)* |
| $v_i<B$ | **PERDRE** |
| $v_i=B$ | **Indifférent** |

> ⚠️ *« **Peut-il miser d'une manière qui GARANTISSE qu'il gagne quand $v_i>B$ et perd quand $v_i<B$, MÊME S'IL NE CONNAÎT PAS $B$ ? LA RÉPONSE EST OUI. Il peut garantir précisément cela SIMPLEMENT EN MISANT SA VALEUR $v_i$ !** »*

**Pourquoi c'est FAIBLEMENT DOMINANT** :

> *« **Parce que miser EN DESSOUS de sa valeur RISQUE de perdre l'enchère quand on aurait strictement préféré la gagner, et miser AU-DESSUS risque de la GAGNER POUR UN PRIX SUPÉRIEUR À SA VALEUR, MISER SA VALEUR EST UNE STRATÉGIE FAIBLEMENT DOMINANTE.** »*

</details>

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.3 — Équilibre de l'enchère au second prix</span>

Si $N$ enchérisseurs ont des valeurs privées indépendantes, alors **miser SA VALEUR est L'UNIQUE stratégie faiblement dominante** de chaque enchérisseur.

</div>

## 🔴 Concept 7 — §9.2.4 : l'enchère anglaise

### 7.1 La complexité apparente

> *« **Contrairement aux enchères considérées jusqu'ici, dans une enchère anglaise il y a POTENTIELLEMENT DE NOMBREUSES décisions à prendre.** Par exemple, quand le prix est très bas, il doit décider **à quel prix il se retirerait si personne ne s'est encore retiré**. Mais **si un autre se retire d'abord, il doit alors décider à quel prix se retirer ÉTANT DONNÉ les enchérisseurs restants**, et ainsi de suite. »*

> ⚠️ *« **Malgré cela, il y a une connexion ÉTROITE entre l'anglaise et le second prix.** »*

### 7.2 L'argument

> *« **Il s'avère qu'il est DOMINANT de se retirer QUAND LE PRIX ATTEINT SA VALEUR, QUELS QUE SOIENT les enchérisseurs qui restent actifs. La raison est plutôt directe.** »*

| Le scénario | Le résultat |
|---|---|
| **Il reste actif jusqu'à $v_i$** | *« **Le PIRE qui puisse arriver est qu'il finisse par se retirer quand le prix atteint sa valeur. Son paiement serait alors ZÉRO — exactement comme s'il s'était retiré MAINTENANT au prix $p$.** »* |
| **Mais il se peut que…** | *« **tous les autres se retirent AVANT que le prix atteigne $v_i$. Dans ce cas, $i$ serait STRICTEMENT MIEUX loti en étant resté actif, puisqu'il gagne alors l'objet à un prix STRICTEMENT INFÉRIEUR à sa valeur, obtenant un paiement POSITIF.** »* |

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.4 — Équilibre de l'enchère anglaise</span>

Si $N$ enchérisseurs ont des valeurs privées indépendantes, alors **se retirer quand le prix atteint SA VALEUR est L'UNIQUE stratégie faiblement dominante**.

</div>

> *(Note 8.)* *« Comme au second prix, **ce résultat de dominance faible ne repose PAS sur l'indépendance. Il tient MÊME SI LES VALEURS SONT CORRÉLÉES. Cependant, IL EST IMPORTANT QUE LES VALEURS SOIENT PRIVÉES.** »*

### 🔴 7.3 L'issue

> *« Il est facile de voir que **l'enchérisseur de plus haute valeur GAGNERA**. Mais **QUEL PRIX paiera-t-il ?** Cela dépend du prix auquel **son DERNIER concurrent restant se retire. Mais ce sera l'enchérisseur de DEUXIÈME plus haute valeur, et il se retirera quand le prix atteint SA valeur.** »*

$$\boxed{\;\textbf{Le plus offrant gagne et paie LA DEUXIÈME VALEUR LA PLUS ÉLEVÉE.}\;}$$

> *« **Nous voyons donc que l'issue de l'anglaise est IDENTIQUE à celle du second prix. En particulier, elles rapportent EXACTEMENT le même revenu au vendeur, EX POST.** »*

## 🔴 Concept 8 — §9.2.5 : la comparaison des revenus

### 8.1 Ce qu'il reste à comparer

> *« Parce que **le premier prix et la hollandaise rapportent le même revenu EX POST**, et **le second prix et l'anglaise aussi**, **il reste SEULEMENT à comparer le premier et le second prix**. »*

⚠️ **Ex post, ils diffèrent :**

| La configuration | Le gagnant |
|---|---|
| *« la plus haute valeur est **assez haute** et la seconde **assez basse** »* | **le PREMIER prix** rapporte plus |
| *« les deux plus hautes valeurs sont **PROCHES l'une de l'autre** »* | **le SECOND prix** rapporte plus |

> *« **Mais quand le vendeur doit décider, IL NE CONNAÎT PAS les valeurs. Cependant, SACHANT COMMENT LES ENCHÉRISSEURS MISENT en fonction de leurs valeurs, et connaissant LA DISTRIBUTION, il peut calculer LE REVENU ESPÉRÉ de chaque enchère.** »*

⚠️ **Il faut supposer la symétrie ici**, *« parce que notre analyse du premier prix impliquait des enchérisseurs symétriques »*.

### 8.2 Les deux formules

<details class="details--riche">
<summary>

**Le revenu du premier prix**

</summary>

*« Parce que **l'offre la plus élevée gagne** et que **l'enchérisseur de plus haute valeur soumet l'offre la plus élevée**, si $v$ est la plus haute valeur, le revenu est $\hat b(v)$. »*

$$R_{\text{FPA}}=\int_0^1\hat b(v)\,g(v)\,dv$$

où $g$ est **la densité du MAXIMUM**.

> *(Note 9.)* *« **La plus haute valeur est $\leq v$ SI ET SEULEMENT SI TOUTES les $N$ valeurs le sont**, ce qui a probabilité $F^N(v)$. **La fonction de répartition du maximum est donc $F^N$. La densité étant la DÉRIVÉE de la répartition, le résultat suit :** $g=N\,f\,F^{N-1}$. »*

$$\boxed{\;R_{\text{FPA}}=N\int_0^1\hat b(v)\,f(v)\,F^{N-1}(v)\,dv\;} \tag{9.6}$$

</details>

<details class="details--riche">
<summary>

**Le revenu du second prix**

</summary>

*« Parce que **chacun mise sa valeur, le vendeur reçoit comme prix LA DEUXIÈME plus haute valeur** »* :

$$R_{\text{SPA}}=\int_0^1 v\,h(v)\,dv$$

> *(Note 10 — l'argument heuristique du livre.)* *« Une manière de le voir est de **traiter la DENSITÉ de probabilité comme une PROBABILITÉ**. Alors la probabilité qu'un enchérisseur PARTICULIER ait la valeur $v$ est $f(v)$, et la probabilité qu'**EXACTEMENT UN des $N-1$ autres soit AU-DESSUS** est $(N-1)F^{N-2}(v)(1-F(v))$. Donc la probabilité que **sa valeur soit $v$ ET qu'elle soit la deuxième** est $(N-1)f(v)F^{N-2}(v)(1-F(v))$. **Comme il y a $N$ enchérisseurs**, la densité de la deuxième plus haute valeur est »*

$$h=N(N-1)\,F^{N-2}\,f\,(1-F)$$

$$\boxed{\;R_{\text{SPA}}=N(N-1)\int_0^1 v\,F^{N-2}(v)\,f(v)\,\big(1-F(v)\big)\,dv\;} \tag{9.7}$$

</details>

### 🔴 8.3 La démonstration de l'égalité — par interversion d'intégrales

<details class="details--riche">
<summary>

**La chaîne de calcul, ligne par ligne**

</summary>

$$\begin{aligned}
R_{\text{FPA}}&=N\int_0^1\left[\frac{1}{F^{N-1}(v)}\int_0^v x\,dF^{N-1}(x)\right]f(v)F^{N-1}(v)\,dv\\[6pt]
&=N(N-1)\int_0^1\left[\int_0^v x\,F^{N-2}(x)f(x)\,dx\right]f(v)\,dv\\[6pt]
&=N(N-1)\int_0^1\!\!\int_0^v\big[x\,F^{N-2}(x)f(x)f(v)\big]\,dx\,dv\\[6pt]
&=N(N-1)\int_0^1\!\!\int_x^1\big[x\,F^{N-2}(x)f(x)f(v)\big]\,dv\,dx\\[6pt]
&=N(N-1)\int_0^1 x\,F^{N-2}(x)f(x)\big(1-F(x)\big)\,dx\\[6pt]
&=R_{\text{SPA}}
\end{aligned}$$

| Le pas | Sa justification |
|---|---|
| **1ʳᵉ ligne** | Substituer $\hat b$ de (9.5) dans (9.6) |
| **2ᵉ ligne** | **Le $F^{N-1}(v)$ se SIMPLIFIE**, et $dF^{N-1}(x)=(N-1)F^{N-2}(x)f(x)dx$ |
| **4ᵉ ligne** | *« **l'INTERVERSION DE L'ORDRE D'INTÉGRATION (i.e. de $dx\,dv$ à $dv\,dx$)** »* — le domaine $\{0\leq x\leq v\leq1\}$ se décrit **soit** par $x$ de $0$ à $v$ puis $v$ de $0$ à $1$, **soit** par $v$ de $x$ à $1$ puis $x$ de $0$ à $1$ |
| **5ᵉ ligne** | $\int_x^1 f(v)\,dv=1-F(x)$ |
| **6ᵉ ligne** | C'est **exactement (9.7)**, à la variable muette près |

</details>

### 8.4 L'exemple 9.2 : le cas uniforme

<details class="details--riche">
<summary>

**Les deux calculs**

</summary>

Avec $F(v)=v$, $f(v)=1$ et $\hat b(v)=v-v/N$ :

$$R_{\text{FPA}}=N\int_0^1\Big(v-\frac{v}{N}\Big)v^{N-1}dv=(N-1)\int_0^1 v^N\,dv=\boxed{\frac{N-1}{N+1}}$$

$$R_{\text{SPA}}=N(N-1)\int_0^1 v^{N-1}(1-v)\,dv=N(N-1)\left[\frac{1}{N}-\frac{1}{N+1}\right]=\boxed{\frac{N-1}{N+1}}$$

⚠️ **Remarquez que $R\to1$ quand $N\to\infty$** : avec beaucoup d'enchérisseurs, le vendeur capte **presque toute** la valeur maximale possible.

</details>

### 🔴 8.5 La conclusion du §9.2

> *« **REMARQUABLEMENT, le premier prix et le second prix rapportent LE MÊME REVENU ESPÉRÉ, QUELLE QUE SOIT la distribution commune des valeurs !** »*

$$\boxed{\;\textbf{« Si $N$ enchérisseurs ont des valeurs privées indépendantes tirées de la distribution}\\\textbf{COMMUNE $F$, alors LES QUATRE ENCHÈRES STANDARD rapportent LE MÊME REVENU ESPÉRÉ. »}\;}$$

> *« **Ce résultat d'ÉQUIVALENCE DES REVENUS peut expliquer, dans une certaine mesure, POURQUOI NOUS VOYONS LES QUATRE FORMES EN PRATIQUE. S'il était vrai que l'une rapportait plus que les autres EN MOYENNE, nous nous attendrions à ce QU'ELLE SOIT UTILISÉE PLUTÔT QUE LES AUTRES.** »*

> *« **Mais qu'est-ce qui explique cette COÏNCIDENCE ? Notre prochain objectif est d'y gagner une intuition.** »*

## 🔴 Concept 9 — §9.3 : le mécanisme de vente direct

### 9.1 Pourquoi ce détour

> *« **Pour expliquer l'équivalence des revenus dans les quatre formes, NOUS DEVONS D'ABORD TROUVER UN MOYEN DE LES FAIRE ENTRER TOUTES DANS UN CADRE UNIQUE.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 9.1 — Mécanisme de vente direct</span>

Un **mécanisme de vente direct** est la donnée de $N$ **fonctions d'assignation de probabilité**

$$p_1(v_1,\dots,v_N),\ \dots,\ p_N(v_1,\dots,v_N)$$

et de $N$ **fonctions de coût**

$$c_1(v_1,\dots,v_N),\ \dots,\ c_N(v_1,\dots,v_N)$$

Pour chaque vecteur de valeurs **RAPPORTÉES** $(v_1,\dots,v_N)$ : $p_i(\cdot)\in[0,1]$ est **la probabilité que $i$ reçoive l'objet** et $c_i(\cdot)\in\mathbb{R}$ **son paiement**.

</div>

*(La présentation suit **Myerson (1981)**.)*

> *(Note 12.)* *« C'est **plus de généralité que nécessaire pour le moment**, parce que **le vendeur ne garde JAMAIS l'objet dans aucune des quatre enchères standard. Cependant, ceci sera utile un peu plus tard.** »*

⚠️ **On n'impose donc PAS $\sum_i p_i=1$** — le vendeur peut garder l'objet.

### 9.2 Le paiement espéré d'un rapport

Si $i$ a la valeur $v_i$ et **rapporte $r_i$**, tandis que **tous les autres rapportent véridiquement** :

$$u_i(r_i,v_i)=\int_0^1\!\!\cdots\!\int_0^1\Big(p_i(r_i,v_{-i})\,v_i-c_i(r_i,v_{-i})\Big)f_{-i}(v_{-i})\,dv_{-i}$$

**Les deux marginales** :

$$\bar p_i(r_i)=\int_0^1\!\!\cdots\!\int_0^1 p_i(r_i,v_{-i})f_{-i}(v_{-i})\,dv_{-i} \qquad \bar c_i(r_i)=\int_0^1\!\!\cdots\!\int_0^1 c_i(r_i,v_{-i})f_{-i}(v_{-i})\,dv_{-i}$$

> *« Ainsi, **$\bar p_i(r_i)$ est LA PROBABILITÉ que $i$ reçoive l'objet quand il rapporte $r_i$**, et **$\bar c_i(r_i)$ SON PAIEMENT ESPÉRÉ** — les deux étant **CONDITIONNELS à ce que tous les autres rapportent VÉRIDIQUEMENT**. »*

$$\boxed{\;u_i(r_i,v_i)=\bar p_i(r_i)\,v_i-\bar c_i(r_i)\;} \tag{9.8}$$

⚠️ **C'est une expression LINÉAIRE en $v_i$** — ce fait porte toute la théorie.

### 9.3 La définition 9.2

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 9.2 — Mécanismes de vente directs compatibles incitativement</span>

Un mécanisme de vente direct est **COMPATIBLE INCITATIVEMENT** si, **quand les autres rapportent toujours véridiquement**, **le paiement espéré de chaque enchérisseur $i$ est MAXIMISÉ en rapportant toujours véridiquement** — i.e. si pour chaque $i$ et chaque $v_i\in[0,1]$, $u_i(r_i,v_i)$ est **maximisé en $r_i=v_i$**. On dit alors que **c'est un ÉQUILIBRE BAYÉSIEN-NASHIEN que chacun rapporte véridiquement**.

</div>

### 🔴 9.4 Ce que la définition NE dit PAS

> *« **Notez TRÈS ATTENTIVEMENT ce que la définition NE dit PAS. Elle ne dit PAS que rapporter véridiquement est le mieux QUELS QUE SOIENT les rapports des autres. Elle dit SEULEMENT qu'un enchérisseur ne peut pas faire mieux que de rapporter véridiquement TANT QUE TOUS LES AUTRES RAPPORTENT VÉRIDIQUEMENT.** »*

> ⚠️ *« **Ainsi, bien que la révélation véridique soit un ÉQUILIBRE BAYÉSIEN-NASHIEN dans un mécanisme compatible incitativement, ELLE N'A PAS BESOIN D'ÊTRE UNE STRATÉGIE DOMINANTE POUR AUCUN joueur.** »*

*(Note 13 : c'était **une conséquence** de la définition du chapitre 7, *« n'était le fait que nous y avions restreint l'attention à des espaces de types FINIS »*.)*

## 🔴 Concept 10 — La construction (9.9) : le premier prix comme mécanisme direct

### 10.1 L'idée

> *« **L'idée derrière notre construction est SIMPLE. Au lieu que les enchérisseurs soumettent des offres calculées en injectant leurs valeurs dans la fonction d'équilibre, ILS SERONT PRIÉS DE SOUMETTRE LEURS VALEURS, ET LE VENDEUR CALCULERA LEURS OFFRES D'ÉQUILIBRE POUR EUX.** »*

⚠️ **Le fait qui autorise cela** : *« parce que $\hat b(\cdot)$ est **strictement croissante**, **un enchérisseur gagne au premier prix SI ET SEULEMENT SI il a la plus haute VALEUR** »*.

### 10.2 Le mécanisme

$$p_i(v_1,\dots,v_N)=\begin{cases}1,&\text{si } v_i>v_j \ \text{ pour tout } j\neq i\\0,&\text{sinon}\end{cases}$$

$$c_i(v_1,\dots,v_N)=\begin{cases}\hat b(v_i),&\text{si } v_i>v_j \ \text{ pour tout } j\neq i\\0,&\text{sinon}\end{cases} \tag{9.9}$$

> *« **Le bidder de plus haute valeur RAPPORTÉE, $v$, reçoit l'objet et paie $\hat b(v)$ — EXACTEMENT comme il l'aurait fait à l'équilibre du premier prix.** »*

### 🔴 10.3 La vérification de la compatibilité incitative

> *« Supposons que tous les autres rapportent véridiquement et que le restant a la valeur $v$ et **considère rapporter $r$**. **Il gagne alors et paie $\hat b(r)$ si et seulement si $r>v_j$ pour tout autre $j$** — ce qui, les $N-1$ autres valeurs étant **indépendamment distribuées selon $F$**, a probabilité $F^{N-1}(r)$. »*

$$\text{son paiement espéré} \ = \ F^{N-1}(r)\big(v-\hat b(r)\big)$$

> ⚠️ *« **Mais c'est EXACTEMENT le paiement de (9.1), dont nous savons DÉJÀ qu'il est maximisé quand $r=v$. Donc le mécanisme (9.9) est bien COMPATIBLE INCITATIVEMENT.** »*

### 10.4 Le bilan de la construction

> *« **Partant de l'équilibre d'une enchère au premier prix, nous avons construit un mécanisme direct compatible incitativement dont L'ÉQUILIBRE VÉRIDIQUE RÉSULTE EN LA MÊME ASSIGNATION EX POST de l'objet et LES MÊMES PAIEMENTS EX POST. En particulier, LE MÊME REVENU EX POST pour le vendeur.** »*

> ⚠️ *« **De plus, cette méthode de construction est TOUT À FAIT GÉNÉRALE. En effet, en partant de l'équilibre de N'IMPORTE LAQUELLE des quatre enchères standard, nous pouvons SEMBLABLEMENT construire un mécanisme direct compatible incitativement donnant la même assignation ex post et les mêmes paiements ex post.** (Il vous est demandé de le faire en exercice.) »*

$$\boxed{\;\textbf{Chacune des quatre enchères standard ÉQUIVAUT à un mécanisme direct}\\\textbf{compatible incitativement — on peut donc étudier les premières PAR les seconds.}\;}$$

## 🔴 Concept 11 — Le théorème 9.5 : la caractérisation

### 11.1 L'énoncé

> *« Parce que les mécanismes compatibles incitativement sont **si importants**, **il est très utile de savoir COMMENT LES IDENTIFIER. Le résultat suivant fournit une caractérisation COMPLÈTE.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.5 — Mécanismes de vente directs compatibles incitativement</span>

Un mécanisme $(p_i(\cdot),c_i(\cdot))_{i=1}^N$ est **compatible incitativement SI ET SEULEMENT SI**, pour chaque enchérisseur $i$ :

**(i)** $\bar p_i(v_i)$ est **NON DÉCROISSANTE** en $v_i$ ;

**(ii)** $\displaystyle \bar c_i(v_i)=\bar c_i(0)+\bar p_i(v_i)\,v_i-\int_0^{v_i}\bar p_i(x)\,dx$, pour tout $v_i\in[0,1]$.

</div>

**La lecture, mot pour mot :**

> *« Il énonce qu'un mécanisme est compatible incitativement si **DEUX conditions** sont réunies. **D'abord, il doit être le cas que RAPPORTER UNE VALEUR PLUS ÉLEVÉE amène l'enchérisseur à s'attendre à recevoir l'objet AVEC UNE PROBABILITÉ PLUS ÉLEVÉE. Ensuite, LE COÛT qu'il s'attend à payer doit être RELIÉ D'UNE MANIÈRE TRÈS PARTICULIÈRE à cette probabilité.** »*

### 11.2 La preuve du sens ⟹

<details class="details--riche">
<summary>

**(i) — la monotonie, par une chaîne d'inégalités**

</summary>

Par compatibilité incitative, pour tous $r_i,v_i$ :

$$\bar p_i(r_i)v_i-\bar c_i(r_i)=u_i(r_i,v_i)\ \leq\ u_i(v_i,v_i)=\bar p_i(v_i)v_i-\bar c_i(v_i)$$

**En AJOUTANT et RETRANCHANT $\bar p_i(v_i)r_i$ au membre de droite :**

$$\bar p_i(r_i)v_i-\bar c_i(r_i)\ \leq\ \underbrace{\big[\bar p_i(v_i)r_i-\bar c_i(v_i)\big]}_{\textbf{= } u_i(v_i,r_i)}+\bar p_i(v_i)(v_i-r_i)$$

> ⚠️ *« **Mais un regard attentif au terme entre crochets révèle que c'est $u_i(v_i,r_i)$ — le paiement de $i$ quand il rapporte $v_i$ ALORS QUE SA VRAIE VALEUR EST $r_i$.** Par compatibilité incitative, **ceci ne peut PAS excéder $u_i(r_i,r_i)$**. »*

$$\bar p_i(r_i)v_i-\bar c_i(r_i)\ \leq\ u_i(r_i,r_i)+\bar p_i(v_i)(v_i-r_i)=\big[\bar p_i(r_i)r_i-\bar c_i(r_i)\big]+\bar p_i(v_i)(v_i-r_i)$$

**En réécrivant :**

$$\boxed{\;\big(\bar p_i(v_i)-\bar p_i(r_i)\big)\big(v_i-r_i\big)\ \geq\ 0\;}$$

> *« Donc, **quand $v_i>r_i$, il doit être le cas que $\bar p_i(v_i)\geq\bar p_i(r_i)$. Nous concluons que $\bar p_i(\cdot)$ est NON DÉCROISSANTE.** »*

⚠️ **L'astuce est le « double emploi » de la compatibilité incitative** — une fois pour $v_i$, une fois pour $r_i$.

</details>

<details class="details--riche">
<summary>

**(ii) — la formule de coût, par intégration par parties**

</summary>

*« Parce que le paiement doit être maximisé en rapportant véridiquement, **la DÉRIVÉE de $u_i(r_i,v_i)$ par rapport à $r_i$ doit être NULLE en $r_i=v_i$**. »*

$$\frac{\partial u_i(r_i,v_i)}{\partial r_i}=\bar p_i'(r_i)v_i-\bar c_i'(r_i)$$

**En l'annulant en $r_i=v_i$ :**

$$\bar c_i'(v_i)=\bar p_i'(v_i)\,v_i \tag{P.1}$$

**Puis** *(« $v_i$ étant arbitraire, (P.1) vaut pour tout $v_i$ »)* :

$$\bar c_i(v_i)-\bar c_i(0)=\int_0^{v_i}\bar c_i'(x)\,dx=\int_0^{v_i}\bar p_i'(x)\,x\,dx=\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)\,dx$$

| L'égalité | Sa justification |
|---|---|
| **1ʳᵉ** | Le **théorème fondamental du calcul** |
| **2ᵉ** | **(P.1)** |
| **3ᵉ** | **L'INTÉGRATION PAR PARTIES** |

$$\boxed{\;\bar c_i(v_i)=\bar c_i(0)+\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)\,dx\;} \tag{P.2}$$

> *(Note 14.)* *« Nous **ignorons deux points**. Le premier est de savoir **si $u_i(r_i,v_i)$ est effectivement DIFFÉRENTIABLE en $r_i$. Bien qu'elle n'ait pas besoin de l'être PARTOUT, la compatibilité incitative implique qu'elle doit l'être PRESQUE PARTOUT, et l'analyse peut être rendue parfaitement RIGOUREUSE.** Le second est **la condition du premier ordre aux deux valeurs NON INTÉRIEURES $v_i=0$ ou $1$** — mais **il n'y a pas de mal, parce que CES DEUX VALEURS SURVIENNENT AVEC PROBABILITÉ ZÉRO**. »*

</details>

### 11.3 La preuve du sens ⟸

<details class="details--riche">
<summary>

**La réécriture qui fait tout**

</summary>

Supposons (i) et (ii). **En substituant (ii) dans (9.8)** :

$$u_i(r_i,v_i)=\bar p_i(r_i)v_i-\left[\bar c_i(0)+\bar p_i(r_i)r_i-\int_0^{r_i}\bar p_i(x)dx\right] \tag{P.3}$$

⚠️ **Ceci se réécrit** :

$$u_i(r_i,v_i)=-\bar c_i(0)+\int_0^{v_i}\bar p_i(x)dx-\left\{\int_{r_i}^{v_i}\big(\bar p_i(x)-\bar p_i(r_i)\big)dx\right\}$$

> *« **où cette expression est valide QUE $r_i\leq v_i$ OU $r_i\geq v_i$.** »*

> *(Note 15.)* *« Rappelez-vous la convention selon laquelle **quand $a<b$, $\int_b^a f=-\int_a^b f$**. »*

**Le pas décisif** :

> ⚠️ *« **Parce que, par (i), $\bar p_i(\cdot)$ est NON DÉCROISSANTE, L'INTÉGRALE ENTRE ACCOLADES EST NON NÉGATIVE pour tous $r_i$ et $v_i$.** »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — pourquoi elle est non négative dans les DEUX cas.</span>

Si $r_i<v_i$, on intègre $\bar p_i(x)-\bar p_i(r_i)\geq0$ sur $[r_i,v_i]$ ⟹ **positif**. Si $r_i>v_i$, on intègre $\bar p_i(x)-\bar p_i(r_i)\leq0$ sur $[v_i,r_i]$ **avec les bornes INVERSÉES** ⟹ **encore positif**.

</div>

$$u_i(r_i,v_i)\ \leq\ -\bar c_i(0)+\int_0^{v_i}\bar p_i(x)dx \tag{P.4}$$

> *« **Mais, par (P.3), le membre de droite de (P.4) est ÉGAL à $u_i(v_i,v_i)$.** Par conséquent $u_i(r_i,v_i)\leq u_i(v_i,v_i)$ »* — **la révélation véridique est optimale**. $\blacksquare$

</details>

### 🔴 11.4 La lecture du théorème 9.5

> *« La partie (ii) dit qu'**il doit y avoir UNE CONNEXION entre les fonctions d'assignation et les fonctions de coût. En particulier, elle dit qu'UNE FOIS QUE LA FONCTION D'ASSIGNATION A ÉTÉ CHOISIE, ET UNE FOIS CHOISI LE COÛT ESPÉRÉ D'UN ENCHÉRISSEUR DE VALEUR ZÉRO, LE RESTE DE LA FONCTION DE COÛT EST CHOISI AUSSI.** »*

$$\boxed{\;\textbf{« Sous compatibilité incitative, LE PAIEMENT ESPÉRÉ d'un enchérisseur}\\\textbf{est COMPLÈTEMENT DÉTERMINÉ par son paiement quand sa valeur est ZÉRO}\\\textbf{et par sa FONCTION D'ASSIGNATION. »}\;}$$

> *« **Cette observation est ESSENTIELLE pour comprendre le résultat suivant.** »*

## 🔴 Concept 12 — Le théorème 9.6 : l'équivalence des revenus

### 12.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 9.6 — Équivalence des revenus</span>

**Si DEUX mécanismes de vente directs compatibles incitativement ont LES MÊMES FONCTIONS D'ASSIGNATION DE PROBABILITÉ, et si TOUT enchérisseur DE VALEUR ZÉRO est INDIFFÉRENT entre les deux mécanismes, alors LES DEUX GÉNÈRENT LE MÊME REVENU ESPÉRÉ pour le vendeur.**

</div>

### 12.2 La preuve

<details class="details--riche">
<summary>

**La chaîne de six égalités**

</summary>

$$\begin{aligned}
R&=\int_0^1\!\!\cdots\!\int_0^1\sum_{i=1}^{N}c_i(v_1,\dots,v_N)f(v_1)\cdots f(v_N)\,dv_1\cdots dv_N\\[4pt]
&=\sum_{i=1}^{N}\int_0^1\!\!\cdots\!\int_0^1 c_i(v_1,\dots,v_N)f(v_1)\cdots f(v_N)\,dv_1\cdots dv_N\\[4pt]
&=\sum_{i=1}^{N}\int_0^1\left[\int_0^1\!\!\cdots\!\int_0^1 c_i(v_i,v_{-i})f_{-i}(v_{-i})\,dv_{-i}\right]f_i(v_i)\,dv_i\\[4pt]
&=\sum_{i=1}^{N}\int_0^1\bar c_i(v_i)\,f_i(v_i)\,dv_i\\[4pt]
&=\sum_{i=1}^{N}\int_0^1\left[\bar c_i(0)+\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx\right]f_i(v_i)\,dv_i\\[4pt]
&=\boxed{\;\sum_{i=1}^{N}\int_0^1\left[\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx\right]f_i(v_i)\,dv_i\ +\ \sum_{i=1}^{N}\bar c_i(0)\;}
\end{aligned}$$

| Le pas | Sa justification |
|---|---|
| **2ᵉ** | Intervertir somme et intégrale |
| **3ᵉ** | Séparer $v_i$ des $v_{-i}$ |
| **4ᵉ** | **La définition de $\bar c_i(v_i)$** |
| **5ᵉ** | **La partie (ii) du THÉORÈME 9.5** |

**La conclusion** :

> ⚠️ *« **Par conséquent, le revenu espéré du vendeur NE DÉPEND QUE DES FONCTIONS D'ASSIGNATION ET DU MONTANT QUE LES ENCHÉRISSEURS S'ATTENDENT À PAYER QUAND LEURS VALEURS SONT ZÉRO. Parce que le PAIEMENT ESPÉRÉ d'un enchérisseur de valeur zéro est complètement DÉTERMINÉ par son COÛT espéré à valeur zéro, le résultat suit.** »* $\blacksquare$

</details>

### 🔴 12.3 L'explication de la coïncidence

> *« **Le théorème d'équivalence des revenus fournit UNE EXPLICATION de l'égalité apparemment COÏNCIDENTE des revenus espérés entre les quatre enchères standard.** »*

| La condition du théorème 9.6 | Comment les quatre l'ont |
|---|---|
| **Mêmes fonctions d'assignation** | *« avec des enchérisseurs SYMÉTRIQUES, **chacune assigne l'objet À CELUI DE PLUS HAUTE VALEUR** »* |
| **Même sort du type zéro** | *« dans chacune, **un enchérisseur de valeur ZÉRO reçoit une utilité espérée ÉGALE À ZÉRO** »* |

### 12.4 La portée

> *« **Le théorème est TRÈS GÉNÉRAL et nous permet d'AJOUTER d'autres enchères à la liste de celles rapportant le même revenu espéré.** »*

**L'exemple donné** : *« une **enchère TOUS PAIENT au premier prix**, dans laquelle **la plus haute offre gagne MAIS où CHAQUE enchérisseur paie un montant égal à SON offre**, rapporte **AUSSI le même revenu espéré** sous symétrie. »*

## 🟠 Concept 13 — §9.3.2 : l'efficacité allocative

### 13.1 Le résultat

> *« Comme nous l'avons déjà noté plusieurs fois, **chacune de ces enchères alloue l'objet à L'ENCHÉRISSEUR QUI L'ÉVALUE LE PLUS. C'est-à-dire que CHACUNE DE CES ENCHÈRES EST EFFICACE.** »*

### 🔴 13.2 La réserve

> *« **Dans le cas de la HOLLANDAISE et du PREMIER PRIX, CE RÉSULTAT REPOSE SUR LA SYMÉTRIE DES ENCHÉRISSEURS.** »*

> *« **SANS symétrie, différents enchérisseurs au premier prix emploieront des FONCTIONS D'ENCHÈRE DIFFÉRENTES (strictement croissantes). Par conséquent, SI L'UN EMPLOIE UNE FONCTION PLUS BASSE QU'UN AUTRE, ALORS IL PEUT AVOIR UNE VALEUR PLUS ÉLEVÉE ET POURTANT ÊTRE SURENCHÉRI PAR L'AUTRE.** »*

| L'enchère | L'efficacité |
|---|---|
| **Second prix** et **anglaise** | **TOUJOURS efficaces** — la dominance faible ne suppose **ni symétrie ni indépendance** |
| **Premier prix** et **hollandaise** | **Efficaces SEULEMENT sous SYMÉTRIE** |

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — pourquoi cette asymétrie.</span>

Au **second prix**, chacun mise **sa valeur** ; le classement des offres **est** le classement des valeurs, quelles que soient les distributions. Au **premier prix**, chacun mise **une fonction de sa valeur** ; si les fonctions diffèrent, le classement des offres **peut renverser** celui des valeurs. **C'est le prix payé pour que l'offre dépende de la distribution des concurrents.**

</div>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « trouver l'équilibre symétrique du premier prix » | **Théorème 9.1** | Le procédé de **l'ami**, puis (9.1)→(9.5) |
| Une distribution explicite $F$ | **Exemple 9.1** | Injecter dans $\hat b(v)=\dfrac{1}{F^{N-1}(v)}\displaystyle\int_0^v x\,dF^{N-1}(x)$ |
| « enchère hollandaise » | **Théorème 9.2** | **Identique au premier prix** — pas de calcul nouveau |
| « quelle est la meilleure stratégie au second prix ? » | **Théorème 9.3** | **Miser sa valeur** — faiblement **dominante** |
| « enchère anglaise » | **Théorème 9.4** | **Se retirer à sa valeur** ⟹ issue **identique** au second prix |
| « comparer les revenus espérés » | **§9.2.5** | Densités du **max** et du **second**, puis **interversion** |
| « densité de la $k$-ième plus grande valeur » | **Statistiques d'ordre** | Max : $NfF^{N-1}$ · Second : $N(N-1)F^{N-2}f(1-F)$ |
| « construire un mécanisme direct équivalent » | **(9.9)** | $p_i=\mathbb{1}\{v_i \text{ max}\}$, $c_i=\hat b(v_i)$ si gagnant |
| « ce mécanisme est-il incitatif ? » | **Théorème 9.5** | Vérifier **(i) monotonie** et **(ii) la formule de coût** |
| « ces deux enchères rapportent-elles pareil ? » | **Théorème 9.6** | **Mêmes assignations** ET **même sort du type zéro** |
| Une enchère « tous paient » | **§9.3, portée** | Elle rapporte **le même** revenu sous symétrie |
| « cette enchère est-elle efficace ? » | **§9.3.2** | Premier prix / hollandaise : **seulement sous symétrie** |

**Les trois réflexes de cadrage :**

1. **Toujours vérifier si la symétrie est supposée.** Elle est **indispensable** au premier prix, **inutile** au second.
2. **Devant un mécanisme, calculer d'abord $\bar p_i$.** Le théorème 9.5 réduit **tout le reste** à cette fonction et à $\bar c_i(0)$.
3. **Pour comparer deux enchères, ne PAS calculer les revenus.** Vérifier les **deux conditions** du théorème 9.6.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Dériver la fonction d'enchère du premier prix

1. **Écrire le paiement espéré du procédé de l'ami** : $u(r,v)=F^{N-1}(r)\big(v-\hat b(r)\big)$.
2. **Dériver en $r$** *(règle du produit)*.
3. **Évaluer en $r=v$** et **poser égal à zéro**.
4. **RECONNAÎTRE une dérivée de produit** : le membre de gauche est $\dfrac{d}{dv}\big[F^{N-1}(v)\hat b(v)\big]$.
5. **Intégrer** de $0$ à $v$.
6. **Fixer la constante à ZÉRO** — *« un enchérisseur de valeur zéro doit miser zéro »*.
7. **Diviser par $F^{N-1}(v)$**.

### Méthode 2 — Prouver une dominance faible

| Pas | Ce qu'on fait |
|---|---|
| **1** | **Fixer arbitrairement le comportement des autres** — au second prix, résumé par $B$ |
| **2** | **Identifier ce que le joueur VEUT** selon la comparaison de $v_i$ et du prix qu'il paierait |
| **3** | **Exhiber une stratégie qui réalise ce vœu SANS connaître $B$** |
| **4** | **Vérifier les deux déviations** : miser **moins** *(on risque de perdre une victoire profitable)* et miser **plus** *(on risque de gagner à perte)* |

### Méthode 3 — Calculer un revenu espéré

1. **Identifier quelle statistique d'ordre le vendeur reçoit** : le **max** *(premier prix, via $\hat b$)* ou le **second** *(second prix)*.
2. **Écrire sa densité** :

$$g_{\max}=N\,f\,F^{N-1} \qquad\qquad h_{2^{\text{e}}}=N(N-1)\,F^{N-2}\,f\,(1-F)$$

3. **Intégrer** le paiement contre cette densité.
4. **Pour comparer** : substituer $\hat b$, **échanger l'ordre d'intégration**, reconnaître $\int_x^1 f=1-F(x)$.

### Méthode 4 — Vérifier la compatibilité incitative

1. **Calculer $\bar p_i(r_i)$** — la probabilité de gagner en rapportant $r_i$.
2. **Vérifier qu'elle est NON DÉCROISSANTE** *(condition (i))*.
3. **Calculer $\bar c_i(r_i)$** — le paiement espéré.
4. **Vérifier la formule (ii)** : $\bar c_i(v_i)=\bar c_i(0)+\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx$.
5. **Alternativement** : vérifier directement que $u_i(r_i,v_i)$ est maximisé en $r_i=v_i$.

### Méthode 5 — Appliquer l'équivalence des revenus

| Pas | Ce qu'on vérifie |
|---|---|
| **1** | Les **deux mécanismes sont-ils compatibles incitativement** ? |
| **2** | Ont-ils **les MÊMES fonctions d'assignation $p_i(\cdot)$** ? *(typiquement : l'objet va au plus offrant)* |
| **3** | Un enchérisseur de **valeur ZÉRO** est-il **indifférent** entre les deux ? *(typiquement : il obtient zéro dans les deux)* |
| **4** | Si oui ⟹ **MÊMES REVENUS ESPÉRÉS — sans aucun calcul d'intégrale** |

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que le vendeur connaît la demande | *« il n'a typiquement qu'une **information STATISTIQUE** »* | Il connaît **les distributions** |
| 2 | Mal définir le design de mécanismes | *« **COMMENT et QUAND la conception d'institutions peut atteindre des objectifs** »* | Et sa **subtilité** : **inciter à révéler** |
| 3 | Confondre premier et second prix | **Premier** : on paie **son** offre · **Second** : on paie **la deuxième** | Les deux sous **pli scellé** |
| 4 | Confondre hollandaise et anglaise | **Hollandaise** : le prix **DESCEND** · **Anglaise** : il **MONTE** | Sens opposés |
| 5 | Oublier la règle des égalités | *« brisées **AU HASARD** »* | Note de bas de page 1 |
| 6 | Croire que le vendeur est averse au risque | **Tous NEUTRES** — vendeur **et** acheteurs | Valeur du vendeur $=0$ |
| 7 | Mal définir « valeur privée » | *« l'évaluation serait **INCHANGÉE** s'il apprenait l'information d'un autre »* | Son information **SUFFIT** |
| 8 | Mal définir « indépendante » | Les **informations privées** sont indépendantes | Pas les valeurs des objets |
| 9 | Oublier que le paiement peut être $-p$ sans gagner | **Impossible dans les quatre**, mais possible dans les enchères **« tous paient »** | Note 4 |
| 10 | Chercher $\hat b$ sans supposer la monotonie | **On la SUPPOSE**, puis on **vérifie** qu'elle est vraie | Exercice 9.1 |
| 11 | Oublier pourquoi la symétrie est supposée au premier prix | Sinon les fonctions **diffèrent** et le calcul ne se ferme pas | Elle est **inutile** au second prix |
| 12 | Mal écrire le paiement du procédé de l'ami | $F^{N-1}(r)\big(v-\hat b(r)\big)$ — **$r$ dans la probabilité ET dans l'offre**, **$v$ dans la valeur** | Le cœur du calcul |
| 13 | Oublier pourquoi $F^{N-1}(r)$ | $\hat b$ **strictement croissante** ⟹ gagner $\Leftrightarrow$ $r$ excède les $N-1$ autres **valeurs** | Indépendance ⟹ le produit |
| 14 | Ne pas reconnaître la dérivée de produit | Le membre de gauche de (9.3) **EST** $\frac{d}{dv}\big[F^{N-1}(v)\hat b(v)\big]$ | Sans cela, pas d'intégration |
| 15 | Oublier de fixer la constante | *« un enchérisseur de valeur **zéro** doit miser **zéro** »* ⟹ constante $=0$ | Condition initiale |
| 16 | Croire que le théorème 9.1 prouve l'existence | *« **nous n'avons PAS montré que c'est UN équilibre** — seulement que si un équilibre symétrique existe, c'est celui-ci »* | Note 6 |
| 17 | Croire qu'il y a des équilibres asymétriques | *« **on peut montrer qu'il n'y en a AUCUN** »* | Non démontré ici |
| 18 | Croire que $\hat b(v)=v$ | Chacun **RABOTE** son offre — au cas uniforme, de $v/N$ | La sous-enchère |
| 19 | Croire que plus de concurrents ⟹ offres plus timides | **L'INVERSE** : *« les enchérisseurs misent PLUS AGRESSIVEMENT »* | Le rabot $v/N$ **s'évanouit** |
| 20 | Mal énoncer l'interprétation de $\hat b$ | **L'espérance de la valeur du SECOND, CONDITIONNELLEMENT À GAGNER** | Pas l'espérance inconditionnelle |
| 21 | Oublier pourquoi cette idée est générale | *« **son offre ne compte QUE quand on gagne** — un des aperçus de base »* | Vrai aussi ailleurs |
| 22 | Croire que la hollandaise exige un calcul propre | *« **remplacer le mot PRIX par le mot OFFRE** »* ⟹ **c'est le premier prix** | Équivalence **ex post** |
| 23 | Croire que le premier prix rapporte plus « évidemment » | *« cela **NÉGLIGE UN POINT CRUCIAL : LES ENCHÉRISSEURS MISERONT DIFFÉREMMENT** »* | D'où la question ouverte |
| 24 | Oublier pourquoi on mise plus agressivement au second prix | *« **le second effet est ABSENT — le montant payé est INDÉPENDANT de son offre** »* | Une seule incitation |
| 25 | Croire que le second prix exige la symétrie | *« nous **n'avons PAS besoin** de restreindre à des enchérisseurs symétriques »* | Ni même **l'indépendance** *(note 7)* |
| 26 | Dire « dominante » au lieu de « faiblement dominante » | Le mot du livre est **WEAKLY dominant** | Il peut y avoir **égalité** |
| 27 | Croire que l'anglaise est compliquée à résoudre | **Se retirer à sa valeur est dominant**, quels que soient les restants | *« La raison est plutôt directe »* |
| 28 | Oublier ce qui est essentiel dans le résultat anglais | *« **il est IMPORTANT que les valeurs soient PRIVÉES** »* — pas l'indépendance | Note 8 |
| 29 | Croire que les quatre rapportent pareil **ex post** | **NON** — seulement **premier=hollandaise** et **second=anglaise** ex post | L'égalité générale est **en espérance** |
| 30 | Se tromper de densité | Max : $NfF^{N-1}$ · Second : $N(N-1)F^{N-2}f(1-F)$ | Le facteur $N(N-1)$ |
| 31 | Rater l'interversion d'intégrales | $\{0\leq x\leq v\leq1\}$ se décrit **aussi** comme $x\in[0,1]$, $v\in[x,1]$ | C'est **le** pas de la preuve |
| 32 | Croire que l'équivalence dépend de $F$ | *« **QUELLE QUE SOIT la distribution commune** »* | D'où « remarquablement » |
| 33 | Oublier ce que l'équivalence explique | *« **pourquoi nous voyons les quatre formes EN PRATIQUE** »* | Aucune ne domine |
| 34 | Croire que $\sum_i p_i=1$ | **Non imposé** — *« le vendeur ne garde jamais l'objet dans les quatre, mais ceci sera utile plus tard »* | Note 12 |
| 35 | Croire que la compatibilité incitative est une dominance | *« elle ne dit PAS que c'est le mieux **QUELS QUE SOIENT** les rapports des autres »* | Un **Bayes-Nash**, pas une dominance |
| 36 | Ne pas voir pourquoi (9.9) est incitatif | Le paiement devient **exactement (9.1)** | Déjà maximisé en $r=v$ |
| 37 | Croire la construction propre au premier prix | *« cette méthode est **TOUT À FAIT GÉNÉRALE** »* | Les quatre s'y ramènent |
| 38 | Oublier une des deux conditions du théorème 9.5 | **(i) MONOTONIE** ET **(ii) la formule de coût** | Les deux, dans les deux sens |
| 39 | Rater le double emploi de la CI dans la preuve de (i) | Il faut l'appliquer **à $v_i$ PUIS à $r_i$** | D'où $(\bar p_i(v_i)-\bar p_i(r_i))(v_i-r_i)\geq0$ |
| 40 | Oublier l'intégration par parties dans (ii) | $\int_0^{v_i}\bar p_i'(x)x\,dx=\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx$ | Le troisième pas |
| 41 | Croire que la différentiabilité est acquise | *« elle n'a pas besoin de l'être **PARTOUT** — mais **PRESQUE PARTOUT**, et l'analyse peut être rendue rigoureuse »* | Note 14 |
| 42 | Rater pourquoi l'accolade est $\geq0$ dans les deux cas | Si $r_i>v_i$, **les bornes sont inversées** et le signe **se compense** | Note 15 |
| 43 | Croire que le théorème 9.6 exige les mêmes RÈGLES | **Non** — les mêmes **ASSIGNATIONS** et le même **sort du type zéro** | Deux conditions seulement |
| 44 | Oublier la seconde condition | *« tout enchérisseur de **valeur ZÉRO** est **INDIFFÉRENT** »* | Sans elle, les revenus diffèrent de $\sum_i\bar c_i(0)$ |
| 45 | Croire que les quatre enchères sont toujours efficaces | **Premier prix et hollandaise : SEULEMENT sous SYMÉTRIE** | *« l'un peut avoir une valeur plus élevée et être SURENCHÉRI »* |

## 📌 Ultimate Review

**L'ANNONCE DU CHAPITRE 9.**

> *« Dans la plupart des marchés réels, **les vendeurs n'ont qu'une information STATISTIQUE**. »* *« **Le DESIGN DE MÉCANISMES est une théorie GÉNÉRALE sur COMMENT et QUAND la conception d'INSTITUTIONS peut atteindre des objectifs.** »*

$$\boxed{\;\textbf{« LA SUBTILITÉ est de garantir que le mécanisme donne à ceux qui possèdent}\\\textbf{l'information L'INCITATION À LA RÉVÉLER. »}\;}$$

**§9.1 — LES QUATRE ENCHÈRES STANDARD.**

| L'enchère | La règle |
|---|---|
| **PREMIER PRIX** | plis scellés ; le plus offrant paie **SON offre** |
| **SECOND PRIX** | plis scellés ; le plus offrant paie **LA DEUXIÈME offre** |
| **HOLLANDAISE** | le prix **DESCEND** ; le premier à lever la main gagne |
| **ANGLAISE** | le prix **MONTE** ; on se retire sans retour ; le dernier gagne |

*(Égalités brisées **au hasard**.)*

**§9.2 — LE MODÈLE À VALEURS PRIVÉES INDÉPENDANTES.**

Vendeur et acheteurs **NEUTRES au risque** ; valeur du vendeur $=0$ ; $v_i\sim F_i$ sur $[0,1]$, **indépendantes** ; **chacun connaît SA valeur, les DENSITÉS sont publiques** ; paiement $v_i-p$ s'il gagne, $-p$ sinon.

| Le mot | Sa signification |
|---|---|
| **INDÉPENDANT** | Les **informations privées** sont indépendantes |
| **VALEUR PRIVÉE** | Apprendre l'information d'un autre **ne changerait RIEN** à son évaluation |

**§9.2.1 — LE PREMIER PRIX.** Le procédé de **« l'AMI »** : $i$ n'a **aucune incitation à mentir à son ami**.

$$u(r,v)=F^{N-1}(r)\big(v-\hat b(r)\big) \tag{9.1}$$

⚠️ Maximisé en $r=v$ ⟹ dériver, évaluer en $r=v$, **reconnaître $\frac{d}{dv}\big[F^{N-1}(v)\hat b(v)\big]$**, intégrer, **constante $=0$** *(valeur zéro ⟹ offre zéro)* :

$$\boxed{\;\hat b(v)=\frac{1}{F^{N-1}(v)}\int_0^v x\,dF^{N-1}(x)\;} \tag{9.5}$$

**THÉORÈME 9.1** : c'est **l'UNIQUE** équilibre symétrique.

**EXEMPLE 9.1 (uniforme)** : $\hat b(v)=v-\dfrac{v}{N}$ ⟹ *« chacun **RABOTE** son offre »*, et *« à mesure que $N$ augmente, **on mise plus AGRESSIVEMENT** »*.

$$\boxed{\;\textbf{« Chacun mise L'ESPÉRANCE DE LA VALEUR DU SECOND,}\\\textbf{CONDITIONNELLEMENT À GAGNER l'enchère. »}\;}$$

⚠️ *« **Son offre ne compte QUE quand il gagne** — **un des aperçus de base de l'analyse stratégique**. »*

**§9.2.2 — LA HOLLANDAISE.** *« **Remplacez le mot PRIX par le mot OFFRE** »* ⟹ **c'est le premier prix** ⟹ **mêmes revenus EX POST** *(théorème 9.2)*.

**§9.2.3 — LE SECOND PRIX.** L'objection naïve **néglige que les enchérisseurs misent DIFFÉREMMENT**. Au second prix, *« **le second effet est ABSENT — le montant payé est INDÉPENDANT de son offre** »*.

⚠️ **Miser SA VALEUR garantit de gagner ssi $v_i>B$**, **sans connaître $B$** ⟹ **FAIBLEMENT DOMINANT** *(théorème 9.3)*. **Ni symétrie ni indépendance nécessaires.**

**§9.2.4 — L'ANGLAISE.** **Se retirer à sa valeur est faiblement dominant** *(théorème 9.4)* : rester **ne peut pas nuire** et **peut rapporter**. ⟹ **le plus offrant gagne et paie la DEUXIÈME valeur** ⟹ **issue IDENTIQUE au second prix, EX POST**.

**§9.2.5 — LA COMPARAISON.**

$$g_{\max}=N\,f\,F^{N-1} \qquad h_{2^{\text{e}}}=N(N-1)\,F^{N-2}\,f\,(1-F)$$

$$R_{\text{FPA}}=N\!\int_0^1\!\hat b(v)f(v)F^{N-1}(v)dv \quad \text{(9.6)} \qquad R_{\text{SPA}}=N(N-1)\!\int_0^1\! vF^{N-2}(v)f(v)(1-F(v))dv \quad \text{(9.7)}$$

⚠️ **La preuve** : substituer $\hat b$, **le $F^{N-1}$ se SIMPLIFIE**, puis **INTERVERTIR L'ORDRE D'INTÉGRATION** *(de $dx\,dv$ à $dv\,dx$)*, et $\int_x^1 f=1-F(x)$.

**EXEMPLE 9.2 (uniforme)** : **les deux valent $\dfrac{N-1}{N+1}$**.

$$\boxed{\;\textbf{« Les quatre enchères standard rapportent LE MÊME REVENU ESPÉRÉ,}\\\textbf{QUELLE QUE SOIT la distribution commune. »}\;}$$

> *« Ceci **explique peut-être pourquoi nous voyons LES QUATRE FORMES en pratique** : si l'une rapportait plus, **elle serait utilisée plutôt que les autres**. »*

**§9.3 — LE THÉORÈME D'ÉQUIVALENCE.**

**DÉF. 9.1** : un **mécanisme direct** est $\big(p_i(\cdot),c_i(\cdot)\big)_{i=1}^N$ — **on n'impose PAS $\sum_i p_i=1$**.

$$u_i(r_i,v_i)=\bar p_i(r_i)\,v_i-\bar c_i(r_i) \tag{9.8}$$

**DÉF. 9.2** : **COMPATIBLE INCITATIVEMENT** si $u_i(r_i,v_i)$ est maximisé en $r_i=v_i$ **quand les autres disent la vérité**.

⚠️ *« Elle ne dit PAS que c'est le mieux **QUELS QUE SOIENT** les rapports des autres. **La révélation véridique N'A PAS BESOIN D'ÊTRE UNE STRATÉGIE DOMINANTE.** »*

**LA CONSTRUCTION (9.9)** : $p_i=1$ ssi $v_i$ est le max, $c_i=\hat b(v_i)$ dans ce cas ⟹ le paiement d'un rapport $r$ est **exactement (9.1)** ⟹ **incitatif**.

⚠️ *« Cette méthode est **TOUT À FAIT GÉNÉRALE** — les quatre enchères s'y ramènent. »*

**THÉORÈME 9.5 — LA CARACTÉRISATION.**

$$\textbf{(i) } \bar p_i(v_i) \textbf{ NON DÉCROISSANTE} \qquad \textbf{(ii) } \bar c_i(v_i)=\bar c_i(0)+\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx$$

*Preuve de (i) : appliquer la CI **deux fois** ⟹ $\big(\bar p_i(v_i)-\bar p_i(r_i)\big)(v_i-r_i)\geq0$. Preuve de (ii) : CPO en $r_i=v_i$ ⟹ $\bar c_i'(v_i)=\bar p_i'(v_i)v_i$ ⟹ **théorème fondamental** puis **INTÉGRATION PAR PARTIES**. Réciproque : substituer (ii) dans (9.8) et réécrire ⟹ **une accolade $\geq0$ par la monotonie**, valable **dans les deux sens**.*

> ⚠️ *« **Une fois choisie l'assignation ET le coût du type ZÉRO, LE RESTE DE LA FONCTION DE COÛT EST CHOISI AUSSI.** »*

**THÉORÈME 9.6 — L'ÉQUIVALENCE DES REVENUS.**

$$R=\sum_{i=1}^{N}\int_0^1\left[\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx\right]f_i(v_i)dv_i\ +\ \sum_{i=1}^{N}\bar c_i(0)$$

⟹ *« **le revenu ne dépend QUE des fonctions d'ASSIGNATION et du paiement du type ZÉRO** »*.

**Pourquoi les quatre coïncident** : **même assignation** *(l'objet va à la plus haute valeur, sous symétrie)* **ET** **le type zéro obtient zéro** dans les quatre.

**La portée** : **l'enchère « TOUS PAIENT » au premier prix** rapporte **aussi** le même revenu.

**§9.3.2 — L'EFFICACITÉ.**

| L'enchère | Efficace ? |
|---|---|
| **Second prix**, **anglaise** | **TOUJOURS** |
| **Premier prix**, **hollandaise** | **SEULEMENT sous SYMÉTRIE** |

> *« **Sans symétrie, l'un peut avoir une valeur plus élevée et pourtant être SURENCHÉRI par l'autre.** »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quel problème le chapitre 9 pose-t-il, et qu'est-ce que le design de mécanismes ?**

</summary>

> *« **Dans la plupart des marchés réels, LES VENDEURS N'ONT PAS une connaissance parfaite de la demande. SEULS LES ACHETEURS savent précisément combien ils sont disposés à acheter.** »*

> *« **Le DESIGN DE MÉCANISMES est une théorie GÉNÉRALE sur COMMENT et QUAND la conception d'INSTITUTIONS APPROPRIÉES peut atteindre des objectifs particuliers. Elle est spécialement pertinente QUAND LE CONCEPTEUR A BESOIN D'UNE INFORMATION POSSÉDÉE UNIQUEMENT PAR D'AUTRES.** »*

⚠️ *« **LA SUBTILITÉ est de GARANTIR QUE LE MÉCANISME DONNE À CEUX QUI POSSÈDENT L'INFORMATION L'INCITATION À LA RÉVÉLER.** »*

</details>

<details class="details--riche">
<summary>

**2. Décrire les quatre enchères standard.**

</summary>

| L'enchère | Sa règle |
|---|---|
| **Premier prix, pli scellé** | Le plus offrant **gagne et paie SON offre** |
| **Second prix, pli scellé** | Le plus offrant **gagne et paie LA DEUXIÈME offre** |
| **Hollandaise** | Le prix **DESCEND** ; **le premier à lever la main gagne au prix courant** |
| **Anglaise** | Le prix **MONTE** ; on se retire **sans pouvoir revenir** ; **quand un seul reste, il gagne au prix courant** |

⚠️ *(Note 1)* **Les égalités sont brisées AU HASARD.**

</details>

<details class="details--riche">
<summary>

**3. Décrire le modèle à valeurs privées indépendantes.**

</summary>

⚠️ **Vendeur ET acheteurs NEUTRES au risque** ; valeur du vendeur $=0$ ; $v_i$ tirée sur $[0,1]$ selon $F_i$ de densité $f_i$ ; **valeurs mutuellement INDÉPENDANTES** ; *« chacun connaît **SA** valeur, mais **les DENSITÉS sont PUBLIQUES** »* ; paiement $v_i-p$ s'il gagne, **$-p$ s'il paie sans gagner**.

*(Note 2 : la valeur du vendeur est nulle car **l'objet est déjà produit**. Note 4 : payer sans gagner est **impossible dans les quatre**, mais possible dans les enchères **« tous paient »**.)*

</details>

<details class="details--riche">
<summary>

**4. Que signifient « indépendant » et « valeur privée » ?**

</summary>

| Le mot | La définition, mot pour mot |
|---|---|
| **INDÉPENDANT** | *« l'information privée de chaque acheteur est **INDÉPENDANTE de celle de tout autre** »* |
| **VALEUR PRIVÉE** | *« une fois qu'il emploie sa propre information, **cette évaluation serait INCHANGÉE s'il apprenait ensuite l'information de N'IMPORTE QUEL autre** — son information **SUFFIT** à déterminer sa valeur »* |

*(Note 5 : il existe des modèles où l'information des autres **changerait** l'évaluation — **pas considérés ici**.)*

</details>

<details class="details--riche">
<summary>

**5. Quelles deux restrictions naturelles impose-t-on aux fonctions d'enchère ?**

</summary>

| La restriction | Sa justification |
|---|---|
| **Strictement CROISSANTES** | *« il semble très naturel d'attendre que **les enchérisseurs à valeur plus élevée placent des offres plus élevées** »* |
| **SYMÉTRIE** | *« parce que les enchérisseurs sont **symétriques ex ante**, ceux ayant **la même valeur soumettent la même offre** »* |

⟹ on cherche **un équilibre de Nash SYMÉTRIQUE en fonctions strictement croissantes**.

</details>

<details class="details--riche">
<summary>

**6. Exposer le procédé de « l'ami ».**

</summary>

> *« **Imaginez que l'enchérisseur $i$ ne peut pas assister à l'enchère et ENVOIE UN AMI. L'ami CONNAÎT $\hat b(\cdot)$ mais PAS la valeur de $i$.** »*

> ⚠️ *« **Clairement, $i$ N'A AUCUNE INCITATION À MENTIR À SON AMI : parmi toutes les valeurs $r$ qu'il peut rapporter, SON PAIEMENT EST MAXIMISÉ EN RAPPORTANT SA VRAIE VALEUR $v$. Car rapporter $r$ fait soumettre $\hat b(r)$ — mais s'il était là, il soumettrait $\hat b(v)$.** »*

**L'intérêt** : cela transforme un problème de **choix d'offre** en un problème de **choix de RAPPORT** — dont la solution est **connue d'avance** *(dire la vérité)*.

</details>

<details class="details--riche">
<summary>

**7. Écrire le paiement espéré (9.1) et justifier ses deux facteurs.**

</summary>

$$u(r,v)=F^{N-1}(r)\big(v-\hat b(r)\big)$$

| Le facteur | Sa justification |
|---|---|
| $F^{N-1}(r)$ | *« Parce que **$\hat b$ est STRICTEMENT CROISSANTE**, gagner survient **précisément quand $r$ EXCÈDE LES VALEURS des $N-1$ autres** »* — et **l'indépendance** donne le **produit** |
| $\big(v-\hat b(r)\big)$ | *« $i$ **ne paie QUE quand il gagne**, et il paie alors **son offre $\hat b(r)$** »* |

</details>

<details class="details--riche">
<summary>

**8. Dériver $\hat b(v)$.**

</summary>

**1.** La dérivée de (9.1) en $r$ **s'annule en $r=v$** :

$$(N-1)F^{N-2}(r)f(r)\big(v-\hat b(r)\big)-F^{N-1}(r)\hat b'(r) \tag{9.2}$$

**2.** En $r=v$ et en réarrangeant :

$$(N-1)F^{N-2}(v)f(v)\hat b(v)+F^{N-1}(v)\hat b'(v)=(N-1)vf(v)F^{N-2}(v) \tag{9.3}$$

**3.** **Le membre de gauche EST $\dfrac{d}{dv}\big[F^{N-1}(v)\hat b(v)\big]$.**

**4.** **Intégrer** ; **la constante est NULLE** *(« un enchérisseur de valeur zéro doit miser zéro »)* :

$$\hat b(v)=\frac{1}{F^{N-1}(v)}\int_0^v x\,dF^{N-1}(x) \tag{9.5}$$

</details>

<details class="details--riche">
<summary>

**9. Traiter le cas uniforme, et interpréter.**

</summary>

$$\hat b(v)=\frac{N-1}{v^{N-1}}\int_0^v x^{N-1}dx=\frac{N-1}{v^{N-1}}\cdot\frac{v^N}{N}=\boxed{v-\frac{v}{N}}$$

> *« Ainsi, **chacun RABOTE son offre, en misant MOINS que sa valeur. À mesure que le nombre d'enchérisseurs AUGMENTE, ILS MISENT PLUS AGRESSIVEMENT.** »*

⚠️ **Le rabot est $v/N$** — il **tend vers zéro** quand $N\to\infty$.

</details>

<details class="details--riche">
<summary>

**10. Énoncer l'interprétation de $\hat b$, et dire pourquoi elle est générale.**

</summary>

$F^{N-1}$ étant **la répartition de la plus haute valeur des $N-1$ concurrents** :

$$\boxed{\;\textbf{« Chacun mise L'ESPÉRANCE DE LA VALEUR DU SECOND,}\\\textbf{CONDITIONNELLEMENT À GAGNER l'enchère. »}\;}$$

> ⚠️ *« **L'idée qu'il faut miser CONDITIONNELLEMENT À GAGNER est très intuitive au premier prix, à cause du trait que SON OFFRE NE COMPTE QUE QUAND ON GAGNE. Parce que ce trait est présent dans d'autres enchères, CETTE IDÉE DOIT ÊTRE CONSIDÉRÉE COMME L'UN DES APERÇUS DE BASE.** »*

</details>

<details class="details--riche">
<summary>

**11. Pourquoi la hollandaise est-elle le premier prix ?**

</summary>

> *« Chaque enchérisseur n'a **qu'UNE SEULE décision** : « **à quel PRIX lever la main ?** » et **celui qui choisit LE PRIX LE PLUS ÉLEVÉ gagne et PAIE CE PRIX**. »*

> ⚠️ *« **En remplaçant le mot « PRIX » par le mot « OFFRE » dans la phrase précédente, nous voyons que CETTE ENCHÈRE EST ÉQUIVALENTE AU PREMIER PRIX !** »*

⟹ *« elles rapportent **exactement le même revenu, EX POST — c'est-à-dire POUR CHAQUE réalisation des valeurs** »*.

</details>

<details class="details--riche">
<summary>

**12. Pourquoi l'objection « le premier prix rapporte évidemment plus » échoue-t-elle ?**

</summary>

> *« Cela **NÉGLIGE UN POINT CRUCIAL : LES ENCHÉRISSEURS MISERONT DIFFÉREMMENT dans les deux enchères.** »*

| L'enchère | Les incitations |
|---|---|
| **Premier prix** | **Deux** forces opposées : monter pour **gagner**, baisser pour **payer moins** |
| **Second prix** | *« **le second effet est ABSENT, parce que quand on gagne, LE MONTANT PAYÉ EST INDÉPENDANT DE SON OFFRE** »* |

⟹ *« on doit attendre **des offres PLUS AGRESSIVES** au second prix. **La question n'est plus si évidente, n'est-ce pas ?** »*

</details>

<details class="details--riche">
<summary>

**13. Démontrer le théorème 9.3.**

</summary>

Soit $B$ **la plus haute offre des AUTRES**. *« **EN EFFET, LE PRIX QUE $i$ DOIT PAYER EST $B$.** »*

$i$ veut **gagner ssi $v_i>B$**. *« **Peut-il miser de manière à le GARANTIR SANS connaître $B$ ? OUI — SIMPLEMENT EN MISANT SA VALEUR !** »*

**En misant $v_i$** : il est le plus offrant **ssi $v_i>B$**.

**La dominance FAIBLE** : *« miser **EN DESSOUS** risque de **perdre une victoire profitable** ; miser **AU-DESSUS** risque de **gagner à un prix supérieur à sa valeur** »*.

⚠️ **Ni symétrie ni indépendance nécessaires** *(note 7)*.

</details>

<details class="details--riche">
<summary>

**14. Démontrer le théorème 9.4.**

</summary>

Un enchérisseur $i$ au prix courant $p<v_i$ *« **ne peut pas faire PIRE en prévoyant de rester actif jusqu'à ce que le prix atteigne sa valeur** »* :

| Le scénario | Le résultat |
|---|---|
| Le prix atteint $v_i$ | Il se retire, paiement **zéro** — **exactement comme s'il s'était retiré à $p$** |
| **Tous les autres se retirent avant** | **Il gagne à un prix STRICTEMENT inférieur à $v_i$** ⟹ **paiement POSITIF** |

⟹ **se retirer à sa valeur est faiblement dominant**, *« **quels que soient les enchérisseurs restants** »*.

*(Note 8 : ne repose **pas** sur l'indépendance — *« mais **il est IMPORTANT que les valeurs soient PRIVÉES** »*.)*

</details>

<details class="details--riche">
<summary>

**15. Quelle est l'issue de l'enchère anglaise ?**

</summary>

*« **L'enchérisseur de plus haute valeur GAGNERA. Mais quel prix ?** Cela dépend du prix auquel **son dernier concurrent se retire — mais ce sera celui de DEUXIÈME plus haute valeur, et il se retirera à SA valeur.** »*

$$\boxed{\;\text{Le plus offrant gagne et paie LA DEUXIÈME VALEUR.}\;}$$

⟹ *« **l'issue de l'anglaise est IDENTIQUE à celle du second prix. Elles rapportent EXACTEMENT le même revenu, EX POST.** »*

</details>

<details class="details--riche">
<summary>

**16. Écrire les densités du maximum et de la deuxième plus grande valeur.**

</summary>

**Le maximum** *(note 9)* : *« la plus haute valeur est $\leq v$ **ssi TOUTES les $N$ le sont**, ce qui a probabilité $F^N(v)$ »* ⟹ la répartition est $F^N$ ⟹

$$g=N\,f\,F^{N-1}$$

**La deuxième** *(note 10)* : *« la probabilité qu'un enchérisseur **particulier** ait la valeur $v$ est $f(v)$, et que **EXACTEMENT UN des $N-1$ autres** soit au-dessus est $(N-1)F^{N-2}(v)(1-F(v))$ ; **comme il y a $N$ enchérisseurs** »* ⟹

$$h=N(N-1)\,F^{N-2}\,f\,(1-F)$$

</details>

<details class="details--riche">
<summary>

**17. Démontrer l'égalité $R_{\text{FPA}}=R_{\text{SPA}}$.**

</summary>

$$\begin{aligned}
R_{\text{FPA}}&=N\int_0^1\left[\frac{1}{F^{N-1}(v)}\int_0^v x\,dF^{N-1}(x)\right]f(v)F^{N-1}(v)dv\\
&=N(N-1)\int_0^1\!\!\int_0^v x\,F^{N-2}(x)f(x)f(v)\,dx\,dv\\
&=N(N-1)\int_0^1\!\!\int_x^1 x\,F^{N-2}(x)f(x)f(v)\,dv\,dx\\
&=N(N-1)\int_0^1 x\,F^{N-2}(x)f(x)\big(1-F(x)\big)dx\ =\ R_{\text{SPA}}
\end{aligned}$$

⚠️ **Deux pas décisifs** : le $F^{N-1}(v)$ **se simplifie**, et *« la quatrième égalité vient de **L'INTERVERSION DE L'ORDRE D'INTÉGRATION (de $dx\,dv$ à $dv\,dx$)** »*.

</details>

<details class="details--riche">
<summary>

**18. Traiter l'exemple 9.2.**

</summary>

$$R_{\text{FPA}}=N\int_0^1\Big(v-\frac{v}{N}\Big)v^{N-1}dv=(N-1)\int_0^1 v^Ndv=\frac{N-1}{N+1}$$

$$R_{\text{SPA}}=N(N-1)\int_0^1 v^{N-1}(1-v)dv=N(N-1)\Big[\frac1N-\frac1{N+1}\Big]=\frac{N-1}{N+1}$$

> *« **REMARQUABLEMENT, ils rapportent le même revenu espéré, QUELLE QUE SOIT la distribution commune !** »*

⚠️ Et $R\to1$ quand $N\to\infty$.

</details>

<details class="details--riche">
<summary>

**19. Que le résultat d'équivalence explique-t-il ?**

</summary>

> *« **Ce résultat d'équivalence peut expliquer, dans une certaine mesure, POURQUOI NOUS VOYONS LES QUATRE FORMES EN PRATIQUE. S'il était vrai que l'une rapportait plus que les autres EN MOYENNE, nous nous attendrions à ce QU'ELLE SOIT UTILISÉE PLUTÔT QUE LES AUTRES.** »*

> *« **Mais qu'est-ce qui explique cette COÏNCIDENCE ? Notre prochain objectif est d'y gagner une intuition.** »*

</details>

<details class="details--riche">
<summary>

**20. Énoncer la définition 9.1.**

</summary>

Un **mécanisme de vente direct** est la donnée de $N$ **fonctions d'assignation** $p_i(v_1,\dots,v_N)\in[0,1]$ et de $N$ **fonctions de coût** $c_i(v_1,\dots,v_N)\in\mathbb{R}$, pour chaque vecteur de valeurs **RAPPORTÉES**.

⚠️ *(Note 12)* *« C'est **plus de généralité que nécessaire pour le moment**, parce que **le vendeur ne garde JAMAIS l'objet dans les quatre enchères. Cependant, ceci sera utile un peu PLUS TARD.** »* — **on n'impose donc pas $\sum_i p_i=1$**.

*(La présentation suit **Myerson (1981)**.)*

</details>

<details class="details--riche">
<summary>

**21. Définir $\bar p_i$ et $\bar c_i$, et écrire (9.8).**

</summary>

Ce sont **les MARGINALES**, obtenues en **intégrant sur les valeurs des autres** :

$$\bar p_i(r_i)=\int\!\cdots\!\int p_i(r_i,v_{-i})f_{-i}(v_{-i})dv_{-i} \qquad \bar c_i(r_i)=\int\!\cdots\!\int c_i(r_i,v_{-i})f_{-i}(v_{-i})dv_{-i}$$

> *« **$\bar p_i(r_i)$ est la PROBABILITÉ que $i$ reçoive l'objet en rapportant $r_i$, et $\bar c_i(r_i)$ son PAIEMENT ESPÉRÉ — les deux CONDITIONNELS à ce que les autres rapportent véridiquement.** »*

$$u_i(r_i,v_i)=\bar p_i(r_i)v_i-\bar c_i(r_i) \tag{9.8}$$

⚠️ **Linéaire en $v_i$** — ce fait porte **toute** la théorie.

</details>

<details class="details--riche">
<summary>

**22. Énoncer la définition 9.2, et surtout ce qu'elle NE dit PAS.**

</summary>

**Compatible incitativement** : quand **les autres rapportent véridiquement**, $u_i(r_i,v_i)$ est **maximisé en $r_i=v_i$** ⟹ *« **c'est un ÉQUILIBRE BAYÉSIEN-NASHIEN que chacun rapporte véridiquement** »*.

> ⚠️ *« **Notez TRÈS ATTENTIVEMENT ce que la définition NE dit PAS. Elle ne dit PAS que rapporter véridiquement est le mieux QUELS QUE SOIENT les rapports des autres. Elle dit SEULEMENT qu'on ne peut pas faire mieux TANT QUE TOUS LES AUTRES RAPPORTENT VÉRIDIQUEMENT.** »*

> ⚠️ *« **La révélation véridique N'A PAS BESOIN D'ÊTRE UNE STRATÉGIE DOMINANTE pour aucun joueur.** »*

</details>

<details class="details--riche">
<summary>

**23. Construire le mécanisme direct équivalent au premier prix.**

</summary>

**L'idée** : *« **au lieu que les enchérisseurs soumettent des offres, ILS SOUMETTENT LEURS VALEURS, ET LE VENDEUR CALCULE LEURS OFFRES D'ÉQUILIBRE POUR EUX** »*.

$$p_i(v)=\begin{cases}1,&v_i>v_j \ \forall j\neq i\\0,&\text{sinon}\end{cases} \qquad c_i(v)=\begin{cases}\hat b(v_i),&v_i>v_j \ \forall j\neq i\\0,&\text{sinon}\end{cases} \tag{9.9}$$

**La vérification** : en rapportant $r$, on gagne et paie $\hat b(r)$ **avec probabilité $F^{N-1}(r)$** ⟹ le paiement espéré est

$$F^{N-1}(r)\big(v-\hat b(r)\big)$$

⚠️ *« **Mais c'est EXACTEMENT (9.1), dont nous savons DÉJÀ qu'il est maximisé en $r=v$.** »*

</details>

<details class="details--riche">
<summary>

**24. Quelle est la portée de cette construction ?**

</summary>

> *« Partant de l'équilibre du premier prix, nous avons construit un mécanisme incitatif dont **l'équilibre véridique donne LA MÊME ASSIGNATION EX POST et LES MÊMES PAIEMENTS EX POST — donc LE MÊME REVENU EX POST**. »*

> ⚠️ *« **Cette méthode est TOUT À FAIT GÉNÉRALE. En partant de l'équilibre de N'IMPORTE LAQUELLE des quatre, nous pouvons SEMBLABLEMENT construire un mécanisme incitatif équivalent.** »*

⟹ *« **chacune des quatre ÉQUIVAUT à un mécanisme direct incitatif — nous pouvons donc gagner en compréhension des premières EN ÉTUDIANT LES SECONDS** »*.

</details>

<details class="details--riche">
<summary>

**25. Énoncer le théorème 9.5 et le lire.**

</summary>

**(i)** $\bar p_i(v_i)$ **NON DÉCROISSANTE** · **(ii)** $\bar c_i(v_i)=\bar c_i(0)+\bar p_i(v_i)v_i-\displaystyle\int_0^{v_i}\bar p_i(x)dx$.

> *« **D'abord, RAPPORTER UNE VALEUR PLUS ÉLEVÉE doit amener à s'attendre à recevoir l'objet AVEC UNE PROBABILITÉ PLUS ÉLEVÉE. Ensuite, LE COÛT espéré doit être RELIÉ D'UNE MANIÈRE TRÈS PARTICULIÈRE à cette probabilité.** »*

⚠️ **C'est une caractérisation COMPLÈTE** — les deux sens.

</details>

<details class="details--riche">
<summary>

**26. Démontrer (i).**

</summary>

Par la CI : $\bar p_i(r_i)v_i-\bar c_i(r_i)\leq\bar p_i(v_i)v_i-\bar c_i(v_i)$.

**En ajoutant et retranchant $\bar p_i(v_i)r_i$ à droite :**

$$\bar p_i(r_i)v_i-\bar c_i(r_i)\leq\underbrace{\big[\bar p_i(v_i)r_i-\bar c_i(v_i)\big]}_{=\,u_i(v_i,r_i)}+\bar p_i(v_i)(v_i-r_i)$$

⚠️ *« **Un regard attentif révèle que le crochet est $u_i(v_i,r_i)$** — et **par CI, il ne peut excéder $u_i(r_i,r_i)$** »* ⟹

$$\bar p_i(r_i)v_i-\bar c_i(r_i)\leq\big[\bar p_i(r_i)r_i-\bar c_i(r_i)\big]+\bar p_i(v_i)(v_i-r_i)$$

$$\Longrightarrow\qquad \big(\bar p_i(v_i)-\bar p_i(r_i)\big)(v_i-r_i)\geq0$$

⚠️ **L'astuce : appliquer la CI DEUX fois** — une fois du point de vue de $v_i$, une fois de celui de $r_i$.

</details>

<details class="details--riche">
<summary>

**27. Démontrer (ii).**

</summary>

La CPO en $r_i=v_i$ :

$$\frac{\partial u_i}{\partial r_i}=\bar p_i'(r_i)v_i-\bar c_i'(r_i)=0 \quad\text{en } r_i=v_i \qquad\Longrightarrow\qquad \bar c_i'(v_i)=\bar p_i'(v_i)v_i \tag{P.1}$$

Puis

$$\bar c_i(v_i)-\bar c_i(0)=\underbrace{\int_0^{v_i}\bar c_i'(x)dx}_{\textbf{thm fondamental}}=\underbrace{\int_0^{v_i}\bar p_i'(x)x\,dx}_{\textbf{(P.1)}}=\underbrace{\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx}_{\textbf{INTÉGRATION PAR PARTIES}}$$

*(Note 14 : la différentiabilité n'est pas garantie **partout**, mais **presque partout**, et **l'analyse peut être rendue rigoureuse** ; les bords $v_i=0,1$ ont **probabilité zéro**.)*

</details>

<details class="details--riche">
<summary>

**28. Démontrer la réciproque du théorème 9.5.**

</summary>

En substituant (ii) dans (9.8) puis en réécrivant :

$$u_i(r_i,v_i)=-\bar c_i(0)+\int_0^{v_i}\bar p_i(x)dx-\left\{\int_{r_i}^{v_i}\big(\bar p_i(x)-\bar p_i(r_i)\big)dx\right\}$$

> *« **où cette expression est valide QUE $r_i\leq v_i$ OU $r_i\geq v_i$.** »*

⚠️ **Par (i), l'accolade est NON NÉGATIVE dans les DEUX cas** : si $r_i<v_i$ l'intégrande est $\geq0$ ; si $r_i>v_i$ il est $\leq0$ **mais les bornes sont inversées**.

$$\Longrightarrow\quad u_i(r_i,v_i)\leq-\bar c_i(0)+\int_0^{v_i}\bar p_i(x)dx=u_i(v_i,v_i)$$

</details>

<details class="details--riche">
<summary>

**29. Quelle est la lecture du théorème 9.5(ii) ?**

</summary>

> *« **Une fois que la fonction d'ASSIGNATION a été choisie, ET une fois choisi LE COÛT ESPÉRÉ D'UN ENCHÉRISSEUR DE VALEUR ZÉRO, LE RESTE DE LA FONCTION DE COÛT EST CHOISI AUSSI.** »*

$$\boxed{\;\bar p_i(\cdot) \ + \ \bar c_i(0) \ \Longrightarrow \ \bar c_i(\cdot) \textbf{ TOUT ENTIÈRE}\;}$$

> *« **Cette observation est ESSENTIELLE pour comprendre le résultat suivant.** »*

</details>

<details class="details--riche">
<summary>

**30. Énoncer et démontrer le théorème 9.6.**

</summary>

**Si deux mécanismes incitatifs ont LES MÊMES FONCTIONS D'ASSIGNATION et que TOUT enchérisseur DE VALEUR ZÉRO est INDIFFÉRENT entre eux, ils génèrent LE MÊME REVENU ESPÉRÉ.**

**La preuve** : développer $R=\int\!\cdots\!\int\sum_i c_i(\cdot)\prod f$, intervertir, reconnaître $\bar c_i(v_i)$, **substituer (ii) du théorème 9.5** :

$$R=\sum_{i}\int_0^1\left[\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx\right]f_i(v_i)dv_i+\sum_i\bar c_i(0)$$

⚠️ *« **Le revenu ne dépend QUE des fonctions d'assignation ET du montant payé quand les valeurs sont ZÉRO.** »* $\blacksquare$

</details>

<details class="details--riche">
<summary>

**31. Pourquoi les quatre enchères coïncident-elles ?**

</summary>

| La condition du thm 9.6 | Comment les quatre la satisfont |
|---|---|
| **Mêmes assignations** | *« avec des enchérisseurs **SYMÉTRIQUES**, chacune **assigne l'objet à celui de PLUS HAUTE VALEUR** »* |
| **Même sort du type zéro** | *« dans chacune, **un enchérisseur de valeur ZÉRO reçoit une utilité espérée ÉGALE À ZÉRO** »* |

**La portée** : *« une **enchère TOUS PAIENT au premier prix**, où **la plus haute offre gagne MAIS où CHACUN paie SON offre**, rapporte **AUSSI** le même revenu sous symétrie »*.

</details>

<details class="details--riche">
<summary>

**32. Les quatre enchères sont-elles efficaces ?**

</summary>

> *« **Chacune alloue l'objet à l'enchérisseur qui l'évalue le plus. C'est-à-dire que CHACUNE est EFFICACE.** »*

⚠️ **MAIS** : *« **dans le cas de la HOLLANDAISE et du PREMIER PRIX, CE RÉSULTAT REPOSE SUR LA SYMÉTRIE.** Sans symétrie, **différents enchérisseurs emploieront des fonctions DIFFÉRENTES. Si l'un emploie une fonction PLUS BASSE, il peut avoir une valeur PLUS ÉLEVÉE et pourtant ÊTRE SURENCHÉRI.** »*

| Toujours efficaces | Efficaces **seulement sous symétrie** |
|---|---|
| **Second prix**, **anglaise** | **Premier prix**, **hollandaise** |

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Ce que les vendeurs connaissent en général ? | Une **information STATISTIQUE** — les **distributions** |
| Le design de mécanismes ? | **Comment et quand la conception d'INSTITUTIONS atteint des objectifs** |
| Sa subtilité ? | **Donner l'INCITATION À RÉVÉLER l'information** |
| Enchère au **premier prix** ? | Plis scellés ; le plus offrant paie **SON offre** |
| Au **second prix** ? | Plis scellés ; le plus offrant paie **LA DEUXIÈME offre** |
| **Hollandaise** ? | Le prix **DESCEND** ; le premier à lever la main **gagne** |
| **Anglaise** ? | Le prix **MONTE** ; on se retire **sans retour** |
| Comment sont brisées les égalités ? | **Au hasard** |
| L'attitude au risque dans le modèle ? | **Tous NEUTRES** — vendeur **et** acheteurs |
| La valeur du vendeur ? | **Zéro** *(l'objet est déjà produit)* |
| Ce que « **indépendant** » signifie ? | Les **informations privées** sont indépendantes |
| Ce que « **valeur privée** » signifie ? | Apprendre l'info d'un autre **ne changerait RIEN** à son évaluation |
| Ce que les acheteurs savent des autres ? | **Seulement les DENSITÉS** — pas les valeurs |
| Le paiement s'il gagne à $p$ ? | $v_i-p$ |
| S'il paie sans gagner ? | $-p$ — possible dans les enchères **« tous paient »** |
| Les deux restrictions sur $b(\cdot)$ ? | **Strictement croissante** et **symétrique** |
| Le procédé de « l'ami » ? | $i$ **n'a aucune incitation à MENTIR à son ami** |
| L'équation (9.1) ? | $u(r,v)=F^{N-1}(r)\big(v-\hat b(r)\big)$ |
| Pourquoi $F^{N-1}(r)$ ? | $\hat b$ **strictement croissante** + **indépendance** |
| Le pas clé du calcul ? | **Reconnaître $\frac{d}{dv}\big[F^{N-1}(v)\hat b(v)\big]$** |
| Comment fixe-t-on la constante ? | **Valeur zéro ⟹ offre zéro** |
| La formule (9.5) ? | $\hat b(v)=\dfrac{1}{F^{N-1}(v)}\displaystyle\int_0^v x\,dF^{N-1}(x)$ |
| Théorème 9.1 ? | C'est **l'UNIQUE** équilibre symétrique |
| Le théorème prouve-t-il l'existence ? | **NON** — *« si un équilibre symétrique existe, c'est celui-ci »* |
| $\hat b$ dans le cas uniforme ? | $v-\dfrac{v}{N}$ |
| L'effet de $N$ sur l'agressivité ? | **On mise PLUS agressivement** quand $N$ **augmente** |
| L'interprétation de $\hat b$ ? | **L'espérance de la valeur du SECOND, CONDITIONNELLEMENT À GAGNER** |
| Pourquoi cette idée est générale ? | **Son offre ne compte QUE quand on gagne** |
| Pourquoi la hollandaise $=$ le premier prix ? | **Remplacer « PRIX » par « OFFRE »** |
| En quel sens sont-elles égales ? | **EX POST** — réalisation par réalisation |
| L'objection naïve au second prix ? | *« Le premier prix rapporte **évidemment** plus »* |
| Ce qu'elle néglige ? | **Les enchérisseurs misent DIFFÉREMMENT** |
| Ce qui est absent au second prix ? | **L'incitation à baisser** — le prix payé est **indépendant de son offre** |
| La stratégie optimale au second prix ? | **Miser SA VALEUR** |
| Son statut ? | **Faiblement DOMINANTE** |
| Faut-il la symétrie ? | **NON** — ni même **l'indépendance** |
| La stratégie à l'anglaise ? | **Se retirer quand le prix atteint SA valeur** |
| L'argument ? | Rester **ne peut pas nuire** et **peut rapporter** |
| Ce qui est essentiel dans ce résultat ? | **Que les valeurs soient PRIVÉES** — pas l'indépendance |
| L'issue de l'anglaise ? | Le plus offrant paie **la DEUXIÈME valeur** |
| Elle équivaut à ? | **Le second prix, EX POST** |
| La densité du **maximum** ? | $N\,f\,F^{N-1}$ |
| La densité de la **deuxième** ? | $N(N-1)\,F^{N-2}\,f\,(1-F)$ |
| L'équation (9.6) ? | $R_{\text{FPA}}=N\int_0^1\hat b(v)f(v)F^{N-1}(v)dv$ |
| L'équation (9.7) ? | $R_{\text{SPA}}=N(N-1)\int_0^1 vF^{N-2}(v)f(v)(1-F(v))dv$ |
| Le pas décisif de la preuve d'égalité ? | **L'INTERVERSION DE L'ORDRE D'INTÉGRATION** |
| Le résultat au cas uniforme ? | $\dfrac{N-1}{N+1}$ **pour les deux** |
| De quoi l'équivalence dépend-elle ? | **De RIEN** — elle vaut pour **toute** $F$ commune |
| Ce qu'elle explique ? | **Pourquoi les quatre formes coexistent en pratique** |
| Définition 9.1 ? | $N$ **fonctions d'assignation** $p_i$ et $N$ **fonctions de coût** $c_i$ |
| Impose-t-on $\sum_i p_i=1$ ? | **NON** — *« ceci sera utile plus tard »* |
| Ce qu'est $\bar p_i(r_i)$ ? | La **probabilité de gagner** en rapportant $r_i$ |
| L'équation (9.8) ? | $u_i(r_i,v_i)=\bar p_i(r_i)v_i-\bar c_i(r_i)$ |
| Définition 9.2 ? | Dire la vérité **maximise**, **quand les autres le font** |
| Ce que la définition NE dit PAS ? | Que c'est **le mieux QUOI QUE FASSENT les autres** |
| Le statut de la révélation véridique ? | Un **Bayes-Nash** — **PAS** une dominance |
| L'idée de la construction (9.9) ? | Les enchérisseurs **soumettent leurs VALEURS**, le vendeur **calcule leurs offres** |
| Pourquoi (9.9) est incitatif ? | Le paiement devient **EXACTEMENT (9.1)** |
| La portée de la construction ? | *« **TOUT À FAIT GÉNÉRALE** »* — les quatre s'y ramènent |
| Théorème 9.5(i) ? | $\bar p_i$ **NON DÉCROISSANTE** |
| Théorème 9.5(ii) ? | $\bar c_i(v_i)=\bar c_i(0)+\bar p_i(v_i)v_i-\int_0^{v_i}\bar p_i(x)dx$ |
| L'astuce de la preuve de (i) ? | **Appliquer la CI DEUX fois** |
| L'inégalité obtenue ? | $\big(\bar p_i(v_i)-\bar p_i(r_i)\big)(v_i-r_i)\geq0$ |
| La CPO de la preuve de (ii) ? | $\bar c_i'(v_i)=\bar p_i'(v_i)v_i$ |
| Les trois outils de (ii) ? | **Thm fondamental** · **(P.1)** · **INTÉGRATION PAR PARTIES** |
| Ce qui rend l'accolade $\geq0$ ? | La **MONOTONIE** de $\bar p_i$ — **dans les deux sens** |
| La lecture de (ii) ? | $\bar p_i(\cdot)$ **et** $\bar c_i(0)$ **déterminent TOUT** $\bar c_i$ |
| Théorème 9.6, ses deux conditions ? | **Mêmes assignations** ET **même sort du type ZÉRO** |
| La formule du revenu ? | $\sum_i\int\big[\bar p_iv_i-\int\bar p_i\big]f_i+\sum_i\bar c_i(0)$ |
| De quoi le revenu dépend-il ? | **Uniquement** des **assignations** et du **type zéro** |
| Pourquoi les quatre coïncident ? | Même **assignation** *(sous symétrie)* + **type zéro à zéro** |
| Une cinquième enchère équivalente ? | **L'enchère « TOUS PAIENT » au premier prix** |
| Les quatre sont-elles efficaces ? | **Oui** — mais **premier prix et hollandaise : SEULEMENT sous SYMÉTRIE** |
| Pourquoi cette réserve ? | Des fonctions **différentes** peuvent **renverser** le classement des valeurs |
