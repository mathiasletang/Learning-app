# Fiche 513 — Le choix social et le théorème d'impossibilité d'Arrow

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 6 « Social Choice and Welfare », §6.1 « The Nature of the Problem » et §6.2 « Social Choice and Arrow's Theorem » (p. 267-279) |
| **Difficulté** | Avancé |
| **Temps d'étude estimé** | 140 min |
| **Prérequis** | Fiche 500 (relations de préférence, complétude, transitivité, représentation par une utilité) · fiche 511 (efficacité de Pareto, courbe des contrats, boîte d'Edgeworth) · théorèmes 1.1 et 1.3 (existence d'une représentation continue) |
| **Concepts clés** | Économie positive vs normative, état social, problème de distribution, relation de préférence sociale, paradoxe de Condorcet, fonction de bien-être social $f$, domaine non restreint (U), principe de Pareto faible (WP), indépendance des alternatives non pertinentes (IIA), non-dictature (D), théorème d'impossibilité d'Arrow, preuve de Geanakoplos, individu pivot, dictature lexicographique, welfarisme, principe d'indifférence de Pareto (PI), invariance à l'ordre, preuve diagrammatique de Blackorby-Donaldson-Weymark |
| **Poids à l'examen** | Le **paradoxe de Condorcet** et ce qu'il exclut · les **quatre axiomes** énoncés **mot pour mot** et le commentaire du livre sur chacun · la **preuve en quatre étapes** de Geanakoplos, en particulier l'**étape 2** (l'individu pivot) et l'**étape 3** (la dictature partielle) · la lecture d'Arrow comme résultat de **possibilité** · le **cadre modifié** du §6.2.1 et la condition d'**invariance** (6.1) · la **preuve diagrammatique** complète, régions I à IV. |

## 🎯 Vue d'ensemble

```
LE FIL DU CHAPITRE 6, §6.1 ET §6.2 :
peut-on agreger des preferences individuelles COHERENTES
en une preference sociale COHERENTE et DECENTE ?

  L'ANNONCE DU CHAPITRE

     jusqu'ici : ECONOMIE POSITIVE  (caracteriser, predire)
     ici       : ECONOMIE NORMATIVE (juger, prescrire)
     a la fin  : retour au POSITIF (l'interet personnel, ch. §6.5)

  §6.1  LA NATURE DU PROBLEME

     La boite d'Edgeworth (fig. 6.1)
        hors de la courbe des contrats  ->  facile a exclure
        MAIS parmi les points EFFICACES : lequel est le meilleur ?

     « Le principe de Pareto est MUET sur la question essentielle :
       comment arbitrer le bien-etre de 2 contre celui de 1 ? »

     Les questions qui s'ouvrent :
        l'INTENSITE de preference compte-t-elle ?
        peut-elle etre CONNUE ?  COMPAREE entre personnes ?

  §6.2  LE CADRE FORMEL

     X = ensemble d'etats sociaux (FINI dans cette section)
     N >= 2 individus, chacun avec R^i complete et transitive

     DEF. 6.1  R = relation de PREFERENCE SOCIALE
               = binaire, COMPLETE et TRANSITIVE sur X

     PARADOXE DE CONDORCET  (N=3, X={x,y,z})
        1 : x y z      x bat y (2-1)
        2 : y z x      y bat z (2-1)
        3 : z x y      MAIS z bat x (2-1)  ->  TRANSITIVITE VIOLEE

     On cherche une FONCTION DE BIEN-ETRE SOCIAL
        R = f(R^1, ..., R^N)

  HYPOTHESE 6.1  LES QUATRE AXIOMES D'ARROW

     U    Domaine NON RESTREINT
     WP   Principe de Pareto FAIBLE
     IIA  Independance des alternatives NON PERTINENTES
     D    NON-DICTATURE

  THEOREME 6.1  L'IMPOSSIBILITE D'ARROW

     Si |X| >= 3, AUCUNE f ne satisfait U, WP, IIA et D a la fois.

     PREUVE (Geanakoplos 1996), en 4 etapes :
        1. c au BAS de tous  ->  c au bas du social      (WP)
        2. remonter c un par un  ->  un individu PIVOT n
           et c saute directement AU SOMMET du social    (IIA + WP)
        3. pour a, b differents de c :  a P^n b  =>  a P b
           n est DICTATEUR sur les paires SANS c
        4. recommencer avec a a la place de c
           ->  n est dictateur PARTOUT

     LECTURE « POSSIBILITE » : U + WP + IIA forcent f a coincider
     avec les preferences STRICTES d'UNE personne.

  §6.2.1  LA PREUVE DIAGRAMMATIQUE  (N = 2)

     Trois departs :  X convexe INFINI dans R^K
                      preferences representees par u^i CONTINUES
                      f envoie des PROFILS D'UTILITE sur une
                      utilite sociale CONTINUE

     (6.1) INVARIANCE : f inchangee par toute transformation
           psi^i strictement croissante et continue

     + PI (indifference de Pareto)  ->  (6.2) : il existe
           W : R^N -> R strictement croissante et continue

     Autour d'un point ubar, QUATRE regions :
        I  (NE) : preferee par WP      III (SO) : pire par WP
        II (NO) et IV (SE) : A DETERMINER

     L'invariance force II a etre rangee TOUT ENTIERE d'un seul cote,
     puis force IV a etre rangee du cote OPPOSE :

        soit  W(IV) < W(ubar) < W(II)     ->  courbes HORIZONTALES
        soit  W(II) < W(ubar) < W(IV)     ->  courbes VERTICALES

     Horizontales  =>  l'individu 2 est DICTATEUR
     Verticales    =>  l'individu 1 est DICTATEUR
```

> ⚠️ **Note de transcription — identique aux fiches 500-512.** Le PDF de ce chapitre perd le **barré du signe $\neq$**, qui s'exporte comme un simple « = » (ainsi *« all other individuals $j=i$ »* signifie $j\neq i$, et *« $\alpha,\beta=c$ »* signifie $\alpha,\beta\neq c$). Il perd aussi entièrement $\gg$, $\sum$ et $\succ$. Les étiquettes des figures utilisent l'encodage Symbol Mac (`ϩ` = « + », `Ϫ` = « − »). Ces symboles sont rétablis depuis la prose et les équations voisines — **il s'agit d'une réparation de transcription, non d'un ajout de contenu**.

## 🔴 Concept 1 — Le changement de perspective : du positif au normatif

### 1.1 L'annonce du chapitre

> *« À quelques exceptions près, nous avons jusqu'ici eu tendance à nous concentrer sur des questions d'« **économie positive** ». Nous nous sommes principalement contentés de **faire des hypothèses sur les motivations et les circonstances des agents, et d'en déduire les conséquences de leurs actions individuelles et collectives**. En substance, **nous avons caractérisé et prédit le comportement, plutôt que de le juger ou de le prescrire de quelque manière que ce soit**. »*

> *« Dans la majeure partie de ce chapitre, **nous changeons notre perspective du positif au normatif**, et jetons un œil à quelques questions importantes d'**économie du bien-être**. À la fin du chapitre **nous revenons à l'économie positive** et considérons comment **les individus motivés par leur intérêt personnel rendent le problème du choix social DOUBLEMENT difficile**. »*

| Section | Perspective |
|---|---|
| §6.1 à §6.4 | **Normative** — juger, prescrire |
| §6.5 *(fiche 514)* | **Retour au positif** — l'intérêt personnel et la manipulation |

### 🔴 1.2 La défense de l'économie normative

> *« Quand nous jugeons une situation, telle qu'un équilibre de marché, comme « bonne » ou « mauvaise », ou « meilleure » ou « pire » qu'une autre, **nous faisons nécessairement appel, au moins implicitement, à quelque norme éthique sous-jacente**. Les gens diffèrent souvent dans leurs systèmes d'éthique et donc diffèrent dans leurs jugements sur les mérites d'une situation donnée. »*

> *« **Ce fait évident ne doit pas nous décourager ni nous faire désespérer que l'économie normative ne soit « qu'affaire d'opinion ». Au contraire, il existe une chose telle que la COHÉRENCE dans le raisonnement des prémisses aux conclusions et donc aux prescriptions.** L'économie du bien-être aide à éclairer le débat sur les questions sociales **en nous forçant à confronter les prémisses éthiques sous-jacentes à nos arguments** aussi bien qu'en nous aidant à **en voir les implications logiques**. »*

⚠️ **C'est le manifeste méthodologique du chapitre** : l'économie du bien-être ne prétend pas trancher entre systèmes éthiques, elle **exhibe** les prémisses et **en tire les conséquences**.

### 1.3 Ce qu'est un « état social »

> *« Vu largement, notre but dans une grande partie de ce chapitre est **d'étudier des moyens d'obtenir un classement COHÉRENT de différentes situations sociales, ou « ÉTATS SOCIAUX », en partant de prémisses éthiques bien définies et explicites**. »*

> *« Au niveau de généralité auquel nous travaillerons, un « état social » **peut être à peu près n'importe quoi** : »*

| Exemples donnés par le livre |
|---|
| *« l'**élection d'un candidat particulier** à une fonction politique »* |
| *« une manière particulière de **partager une tarte** entre un groupe de personnes »* |
| *« l'adoption d'une forme **orientée vers le marché** d'organisation de la société »* |
| *« une manière particulière de **distribuer les ressources de la société** entre ses membres »* |

> *« **Un problème de choix social surgit chaque fois qu'un groupe quelconque d'individus doit faire un choix collectif parmi un ensemble d'alternatives qui s'offrent à lui.** »*

## 🔴 Concept 2 — §6.1 : le problème de distribution dans la boîte d'Edgeworth

### 2.1 La figure 6.1

> **La figure 6.1 — le problème de distribution.** Une boîte d'Edgeworth à deux biens et deux personnes, origines $0^1$ (en bas à gauche) et $0^2$ (en haut à droite), traversée par la **courbe des contrats** $C\!-\!C$. Un point $\bar x$ est marqué **près d'un coin** : il est Pareto-efficace mais **extrêmement inégalitaire**.

> *« Chaque point dans la boîte représente **une manière de diviser la dotation fixe de biens de la société entre ses deux membres**, de sorte que nous pouvons voir chaque point dans la boîte comme **l'un des états sociaux alternatifs (mutuellement exclusifs) que nous pourrions atteindre**. »*

> *« Chaque agent a ses propres préférences sur ces alternatives, et **clairement ces préférences sont souvent en désaccord les unes avec les autres**. Le problème de choix social impliqué est **facile à énoncer**. **Laquelle des distributions alternatives possibles est la meilleure pour la société ?** »*

### 2.2 Ce que l'on peut exclure sans peine

> *« **Bien que facile à énoncer, la question est difficile à répondre.** Peut-être sans trop de désaccord, **les points HORS de la courbe des contrats peuvent être exclus**. Si l'un d'eux devait être recommandé comme le meilleur, il serait facile de trouver **un autre point sur la courbe des contrats que TOUT LE MONDE préfère**. Parce qu'il serait difficile de discuter avec une telle **unanimité d'opinion**, il est probablement sûr de dire que **notre recherche de la meilleure alternative devrait être restreinte aux alternatives PARETO-EFFICACES**. »*

### 🔴 2.3 Mais alors, laquelle ? — le mur

> *« **Mais laquelle d'entre elles est la meilleure ?** Beaucoup trouveront facile de dire que des alternatives **follement inégales telles que $\bar x$ doivent aussi être exclues, MÊME SI ELLES SONT PARETO-EFFICACES**. »*

> *« Pourtant, **ce faisant, appel est fait à quelque norme éthique SUPPLÉMENTAIRE au-delà du simple principe de Pareto, parce que ce principe est MUET sur la question essentielle impliquée** : à savoir, **comment pouvons-nous arbitrer le bien-être de la personne 2 contre celui de la personne 1 dans l'intérêt de la société dans son ensemble ?** »*

$$\boxed{\;\text{Le principe de Pareto EXCLUT, il ne CHOISIT pas.}\;}$$

### 2.4 La cascade de questions qui s'ouvre

> *« En essayant de faire de tels arbitrages, **l'INTENSITÉ de préférence importe-t-elle** ? **Si nous pensons qu'elle importe, d'autres questions entrent en scène.** »*

| # | La question, mot pour mot |
|---|---|
| 1 | *« L'intensité de préférence **peut-elle être CONNUE** ? »* |
| 2 | *« Les gens **peuvent-ils nous dire à quel point ils ressentent fortement** sur différentes alternatives ? »* |
| 3 | *« Les désirs intenses de différentes personnes **peuvent-ils être COMPARÉS** de sorte qu'un **équilibrage des gains et des pertes** puisse être atteint ? »* |

> *« **Les questions sont nombreuses et les problèmes sont profonds.** Pour aller un tant soit peu loin, **nous aurons besoin d'un cadre systématique pour y penser**. **Arrow (1951)** a offert un tel cadre, et nous commençons par un regard sur son **analyse novatrice** de certains de ces problèmes. »*

⚠️ **Ces trois questions structurent tout le chapitre.** Le §6.2 les met **délibérément de côté** ; le §6.3 *(fiche 514)* les reprend une par une sous le nom de **mesurabilité et comparabilité**.

## 🔴 Concept 3 — Le cadre formel du §6.2

### 3.1 Les données

> *« La structure formelle que nous adoptons est **très simple et très générale**. »*

| Objet | Définition |
|---|---|
| $X$ | Un ensemble **non vide** d'**états sociaux mutuellement exclusifs** |
| $N\geq2$ | Le nombre d'individus |
| $R^i$ | La **relation de préférence** de $i$ sur $X$, avec $P^i$ (stricte) et $I^i$ (indifférence) |

> *« Bien que presque tout ce que nous faisons dans ce chapitre puisse être accompli que $X$ soit **fini ou infini**, pour garder les choses simples nous supposerons **parfois** que $X$ est fini et **d'autres fois** qu'il est infini. **Nous ne manquerons pas de vous faire savoir laquelle de ces hypothèses nous faisons à tout moment.** »*

⚠️ **Pour tout le §6.2 (hors §6.2.1), $X$ est FINI** — le livre le dit explicitement juste avant l'hypothèse 6.1.

### 3.2 Ce qu'on demande aux préférences individuelles

> *« Étant une relation de préférence, **chaque $R^i$ est complète et transitive**. Intuitivement, **nous n'exigeons rien d'autre que les gens soient capables de faire des comparaisons binaires entre deux éléments quelconques de $X$, et que ces comparaisons soient cohérentes au sens d'être transitives**. »*

### 🔴 3.3 L'ampleur voulue de $X$ et des $R^i$

> *« L'ensemble $X$ a été défini **très largement**, gardez donc à l'esprit que **ses éléments peuvent aller du purement mondain au purement spirituel**. Les relations $R^i$, par conséquent, doivent aussi être **interprétées largement**. **Elles n'ont pas besoin de refléter simplement des attitudes égoïstes envers des objets matériels. Elles peuvent aussi refléter l'ALTRUISME de la personne, son sens de la BONTÉ, ou même ses valeurs RELIGIEUSES.** »*

**C'est un point de portée** : le théorème d'Arrow ne suppose **rien** de la nature des préférences — il ne peut donc pas être esquivé en disant « les gens ne sont pas égoïstes ».

### 3.4 Pourquoi il faut une préférence *sociale*

> *« Rappelez-vous maintenant que **quand les préférences sont complètes et transitives, et $X$ est fini, l'individu peut ordonner complètement les éléments de $X$ du meilleur au pire**. Les $R^i$, par conséquent, **transmettent toute l'information dont nous avons besoin pour déterminer le choix de l'individu**. »*

> *« **Pour déterminer le choix SOCIAL, cependant, nous aurons besoin d'un certain classement des états sociaux de $X$ qui reflète les préférences de la « SOCIÉTÉ ».** Idéalement, nous aimerions pouvoir **comparer deux alternatives quelconques de $X$ d'un point de vue social**, et nous aimerions que **ces comparaisons binaires soient cohérentes de la manière habituelle**. »*

### 3.5 La définition 6.1

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 6.1 — Une relation de préférence sociale</span>

Une **relation de préférence sociale**, $R$, est une relation binaire **complète et transitive** sur l'ensemble $X$ des états sociaux. Pour $x$ et $y$ dans $X$, on lit $xRy$ comme l'énoncé « **$x$ est socialement au moins aussi bon que $y$** ». On note $P$ et $I$ les relations associées de **préférence sociale stricte** et d'**indifférence sociale**.

</div>

### 3.6 La question d'Arrow, en une phrase

> *« **Nous tenons pour acquis que le classement des alternatives d'un point de vue social devrait dépendre de la manière dont les individus les classent.** Le problème considéré par Arrow peut être simplement posé. »*

$$\boxed{\;\textbf{Comment aller des vues personnelles souvent DIVERGENTES mais individuellement}\\\textbf{COHÉRENTES des membres de la société à une vue sociale UNIQUE et COHÉRENTE ?}\;}$$

## 🔴 Concept 4 — Le paradoxe de Condorcet

### 4.1 L'avertissement

> *« **Ce n'est pas du tout un problème facile.** Quand nous insistons sur la **transitivité** comme critère de cohérence dans le choix social, **certaines difficultés bien connues peuvent facilement surgir**. Par exemple, **le paradoxe de Condorcet illustre que la méthode familière du VOTE À LA MAJORITÉ peut échouer à satisfaire l'exigence de transitivité sur $R$**. »*

### 4.2 L'exemple, en entier

$N=3$, $X=\{x,y,z\}$, et les préférences **strictes** individuelles sont :

|  | **Personne 1** | **Personne 2** | **Personne 3** |
|---|---|---|---|
| **1ᵉʳ** | $x$ | $y$ | $z$ |
| **2ᵉ** | $y$ | $z$ | $x$ |
| **3ᵉ** | $z$ | $x$ | $y$ |

**Les trois duels :**

| Duel | Le décompte | Le résultat social |
|---|---|---|
| $x$ contre $y$ | $x$ a **2** voix *(1 et 3)*, $y$ en a **1** *(2)* | $xPy$ |
| $y$ contre $z$ | $y$ a **2** voix *(1 et 2)*, $z$ en a **1** *(3)* | $yPz$ |
| $x$ contre $z$ | $z$ a **2** voix *(2 et 3)*, $x$ en a **1** *(1)* | $zPx$ |

> *« Parce que $xPy$ et $yPz$, **la transitivité des préférences sociales exigerait que $xPz$**. Cependant, avec ces préférences individuelles, **$z$ obtient deux voix contre une pour $x$**, donc le vote majoritaire donnerait ici la préférence sociale comme **$zPx$, violant ainsi la transitivité**. »*

### 🔴 4.3 La lecture exacte du paradoxe

> *« Notez que dans cet exemple, **le mécanisme de la règle majoritaire est « COMPLET »** en ce qu'il est **capable de donner une meilleure alternative dans toute comparaison par paires possible** d'alternatives de $X$. **L'échec de la transitivité, cependant, signifie qu'à l'intérieur de cet ensemble de trois alternatives, AUCUNE meilleure alternative unique ne peut être déterminée par la règle majoritaire.** »*

$$\text{la complétude est SATISFAITE} \qquad\qquad \text{la transitivité est VIOLÉE}$$

> *« Exiger la **complétude ET la transitivité** de la relation de préférence sociale implique **qu'elle doit être capable de placer chaque élément de $X$ dans une HIÉRARCHIE du meilleur au pire**. Le type de cohérence exigé par la transitivité a, par conséquent, **des implications structurelles considérables**. »*

### 🔴 4.4 Mais la cohérence ne suffit pas

> *« Pourtant **la cohérence, à elle seule, n'est pas particulièrement intéressante ou convaincante en matière de choix social. On peut être parfaitement cohérent et violer néanmoins chaque précepte moral que la communauté pourrait partager.** »*

**La question, reformulée :**

> *« Comment pouvons-nous aller de vues individuelles cohérentes à une vue sociale **qui soit cohérente ET qui respecte AUSSI certaines valeurs fondamentales** en matière de choix social, **partagées par les membres de la communauté** ? »*

**Et l'avertissement qui suit immédiatement :**

> *« Parce que **le désaccord entre individus sur les questions de « valeurs fondamentales » est en fait la raison même pour laquelle un problème de choix social surgit en premier lieu**, il nous faudra **être très prudents en les spécifiant si nous voulons éviter de trivialiser le problème dès le départ**. »*

### 4.5 La fonction de bien-être social

> *« Nous pouvons imaginer notre problème comme celui de **trouver une « RÈGLE », ou fonction, capable d'AGRÉGER et de RÉCONCILIER les différentes vues individuelles** représentées par les relations $R^i$ **en une relation de préférence sociale unique $R$ satisfaisant certains principes éthiques**. »*

$$\boxed{\;R=f\big(R^1,\dots,R^N\big)\;}$$

> *« Ainsi, **$f$ prend un $N$-uplet de relations de préférence individuelles sur $X$ et les TRANSFORME (les envoie) en une relation de préférence sociale sur $X$**. »*

## 🔴 Concept 5 — Les quatre axiomes d'Arrow (hypothèse 6.1)

*« Pour le reste de cette sous-section nous supposerons que l'ensemble des états sociaux, $X$, est **FINI**. »*

> *« Arrow a proposé **un ensemble de quatre conditions qui pourraient être considérées comme les propriétés MINIMALES que la fonction de bien-être social $f$ devrait posséder**. »*

### 5.1 L'énoncé

> **HYPOTHÈSE 6.1 — Les exigences d'Arrow sur la fonction de bien-être social**
>
> **U. Domaine non restreint (Unrestricted Domain).** Le domaine de $f$ doit inclure **toutes les combinaisons possibles** de relations de préférence individuelles sur $X$.
>
> **WP. Principe de Pareto faible (Weak Pareto Principle).** Pour toute paire d'alternatives $x$ et $y$ dans $X$, **si $xP^iy$ pour tout $i$, alors $xPy$**.
>
> **IIA. Indépendance des alternatives non pertinentes (Independence of Irrelevant Alternatives).** Soient $R=f(R^1,\dots,R^N)$, $\tilde R=f(\tilde R^1,\dots,\tilde R^N)$, et soient $x$ et $y$ deux alternatives quelconques de $X$. **Si chaque individu $i$ classe $x$ contre $y$ sous $R^i$ de la même manière qu'il le fait sous $\tilde R^i$, alors le classement social de $x$ contre $y$ est le même sous $R$ et sous $\tilde R$.**
>
> **D. Non-dictature (Non-dictatorship).** **Il n'existe aucun individu $i$ tel que, pour tous $x$ et $y$ dans $X$, $xP^iy$ implique $xPy$, quelles que soient les préférences $R^j$ de tous les autres individus $j\neq i$.**

### 5.2 Le commentaire du livre sur U

> *« La condition **U** dit que **$f$ est capable de générer un ordre de préférence social QUELLES QUE SOIENT les relations de préférence des individus**. Elle formalise le principe que **la capacité d'un mécanisme à faire des choix sociaux ne devrait PAS dépendre de ce que les membres de la société aient des vues d'un type particulier**. »*

> *« Comme nous l'avons vu, **cette condition, avec l'exigence de transitivité sur $R$, exclut le VOTE MAJORITAIRE comme mécanisme approprié** parce qu'il échoue parfois à produire un ordre social transitif. »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — une remarque sur cette phrase.</span>

Le livre écrit que le vote majoritaire échoue *« quand il y a plus de trois alternatives à considérer »*, alors que **le paradoxe de Condorcet qu'il vient d'exposer n'en utilise que trois**, et que le théorème 6.1 lui-même porte sur *« au moins trois »* états sociaux. Le seuil pertinent est bien **trois**, comme l'exemple le montre.

</div>

### 5.3 Le commentaire du livre sur WP

> *« La condition **WP** est **très directe**, et **une avec laquelle les économistes, du moins, sont tout à fait à l'aise**. Elle dit que **la société devrait préférer $x$ à $y$ si CHAQUE membre de la société préfère $x$ à $y$**. »*

> *« Notez que c'est une exigence de Pareto **FAIBLE** parce qu'**elle n'exige PAS spécifiquement que la préférence sociale soit pour $x$ si, disons, TOUS SAUF UN préfèrent strictement $x$ à $y$, mais qu'une personne est INDIFFÉRENTE entre $x$ et $y$**. »*

⚠️ **Le mot « faible » a un sens technique précis** : la conclusion n'est exigée que pour l'unanimité **stricte**. *(L'exercice 6.2 montre qu'on peut l'affaiblir encore en **VWP** sans rien changer à la conclusion.)*

### 🔴 5.4 Le commentaire du livre sur IIA — le plus important

> *« La condition **IIA** est **peut-être la plus délicate à interpréter, alors lisez-la attentivement**. En bref, la condition dit que **le classement social de $x$ et $y$ ne devrait dépendre QUE des classements individuels de $x$ et $y$**. Notez que **les préférences individuelles $R^i$ et $\tilde R^i$ sont autorisées à DIFFÉRER dans leurs classements sur des paires autres que $x,y$**. »*

**L'exemple du matin et de l'après-midi, en entier :**

> *« Comme vous considérez par vous-même le caractère raisonnable de IIA, **pensez à ce qui pourrait arriver si nous ne l'exigions pas**. Par exemple, supposons que **le MATIN**, tous les individus classent $z$ **en dessous** de $x$ et de $y$, mais certains préfèrent $x$ à $y$ et d'autres préfèrent $y$ à $x$. Supposons maintenant qu'étant données ces préférences individuelles, **la fonction de bien-être social conduit à une préférence sociale de $x$ strictement préféré à $y$**. Donc le matin, si un choix devait être fait entre $x$ et $y$, la « société » choisirait $x$. »*

> *« Il se trouve, cependant, que **le choix entre $x$ et $y$ est reporté à l'APRÈS-MIDI**. Mais d'ici là, supposons que les préférences individuelles ont changé de sorte que **maintenant $z$ est classé AU-DESSUS de $x$ et de $y$ par tous les individus. Cependant, le classement de $x$ contre $y$ par chaque individu reste INCHANGÉ.** »*

> *« **Serait-il raisonnable que la préférence sociale bascule maintenant vers $y$ classé au-dessus de $x$ ? IIA dit que non.** »*

$$\boxed{\;\text{IIA : le sort de la paire } (x,y) \text{ ne dépend QUE des positions relatives de } x \text{ et } y.\;}$$

### 5.5 Le commentaire du livre sur D — à ne pas sous-estimer

> *« La condition **D** est **une restriction vraiment très douce**. Elle dit simplement qu'**il ne devrait pas y avoir un individu unique qui « obtienne ce qu'il veut » sur CHAQUE choix social, quelles que soient les vues de tous les autres dans la société**. »*

> *« Ainsi, **SEULE la forme la plus extrême et absolue de dictature est spécifiquement exclue. Même un dictateur « VIRTUEL », qui obtient toujours ce qu'il veut sur toutes les paires SAUF UNE d'alternatives sociales, ne serait PAS exclu par cette condition seule.** »*

⚠️ **C'est ce qui rend le théorème d'Arrow si dévastateur** : l'axiome que le théorème contredit est le plus **faible** des quatre.

### 5.6 L'invitation du livre avant le théorème

> *« Prenez maintenant un moment pour **réexaminer et reconsidérer chacune de ces conditions à son tour**. **Jouez avec elles**, et essayez d'imaginer le genre de situations qui pourraient survenir dans un problème de choix social **si l'une ou plusieurs d'entre elles ne tenaient pas**. Si, en fin de compte, vous convenez que **ce sont des exigences douces et minimales** pour une fonction de bien-être social raisonnable, **vous trouverez le théorème suivant ASTONNANT, et peut-être DÉRANGEANT**. »*

## 🔴 Concept 6 — Le théorème d'impossibilité d'Arrow

### 6.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 6.1 — Le théorème d'impossibilité d'Arrow</span>

S'il y a **au moins trois** états sociaux dans $X$, alors **il n'existe AUCUNE fonction de bien-être social $f$ qui satisfasse simultanément les conditions U, WP, IIA et D**.

</div>

### 6.2 La stratégie

> *« **La stratégie de la preuve est de montrer que les conditions U, WP et IIA impliquent l'EXISTENCE D'UN DICTATEUR.** Par conséquent, **si U, WP et IIA tiennent, alors D doit échouer**, et donc aucune fonction de bien-être social ne peut satisfaire les quatre conditions. »*

$$\boxed{\;\text{U} \ \wedge\ \text{WP} \ \wedge\ \text{IIA} \ \Longrightarrow\ \neg\,\text{D}\;}$$

> *« La preuve, suivant **Geanakoplos (1996)**, procède en **quatre étapes**. »*

### 🔴 6.3 Où l'axiome U est-il utilisé ?

> *« Notez que **l'axiome U, domaine non restreint, est utilisé À CHAQUE ÉTAPE chaque fois que nous CHOISISSONS ou ALTÉRONS le profil de préférences considéré. Le domaine non restreint garantit que chaque profil de préférences de ce type est ADMISSIBLE.** »*

**C'est un point qu'on oublie systématiquement en récitant la preuve** : chaque « supposons maintenant que… » **est** un appel à U.

### 6.4 Les quatre étapes

<details class="details--riche">
<summary>

**Étape 1 — $c$ au bas de tous les classements**

</summary>

> *« Considérez un état social quelconque, $c$. Supposez que **chaque individu place l'état $c$ AU BAS de son classement**. **Par WP, le classement social doit placer $c$ au bas également.** »*

> **La figure 6.2.** Un tableau à $N+1$ colonnes $R^1,R^2,\dots,R^N,R$ : chaque colonne a $x$ en haut, $y$ juste en dessous, des points de suspension, puis **$c$ tout en bas** — y compris la colonne sociale $R$.

</details>

<details class="details--riche">
<summary>

**Étape 2 — l'individu PIVOT, et le saut de $c$ au sommet**

</summary>

**La construction :**

> *« Imaginez maintenant **déplacer $c$ AU SOMMET du classement de l'individu 1**, en laissant le classement de tous les autres états inchangé. Ensuite, faites de même avec l'individu 2 : déplacez $c$ au sommet du classement de 2. **Continuez à faire ceci UN INDIVIDU À LA FOIS**, en gardant à l'esprit que **chacun de ces changements dans les préférences individuelles pourrait avoir un effet sur le classement social**. »*

> *« Finalement, **$c$ sera au sommet du classement de CHAQUE individu**, et donc **il doit alors aussi être au sommet du classement SOCIAL par WP**. Par conséquent, **il doit y avoir une PREMIÈRE fois durant ce processus où le classement social de $c$ AUGMENTE**. »*

$$\boxed{\;\text{Soit } n \text{ le PREMIER individu dont le passage de } c \text{ au sommet fait monter } c \text{ socialement.}\;}$$

**L'affirmation à démontrer :**

> *« Nous affirmons que, comme montré en **figure 6.3**, quand $c$ monte au sommet du classement de l'individu $n$, **le classement social de $c$ non seulement augmente, mais $c$ monte AUSSI AU SOMMET du classement social**. »*

> **La figure 6.3.** Le tableau après le passage de $n$ : les colonnes $1$ à $n$ ont $c$ **au sommet**, les colonnes $n+1$ à $N$ ont $c$ **au bas** *(elles montrent $x$ en haut, $\dots$, $c$ en bas)*, et **la colonne sociale $R$ a $c$ au sommet**.

**La preuve de l'affirmation, par l'absurde :**

Supposons que le classement social de $c$ augmente **mais pas jusqu'au sommet**, c'est-à-dire

$$\alpha\,R\,c \qquad\text{et}\qquad c\,R\,\beta \qquad\text{pour certains états } \alpha,\beta\neq c$$

> *« Or, **parce que $c$ est SOIT au bas SOIT au sommet du classement de chaque individu**, nous pouvons **changer les préférences de chaque individu $i$ de sorte que $\beta P^i\alpha$, tout en laissant la position de $c$ INCHANGÉE pour cet individu**. »*

⚠️ **C'est ici que la structure « $c$ tout en haut ou tout en bas » est indispensable** : elle laisse les positions relatives de $\alpha$ et $\beta$ **entièrement libres**.

**Les deux conclusions contradictoires :**

|  | L'argument | La conclusion |
|---|---|---|
| **D'une part** | $\beta P^i\alpha$ pour **tout** individu ⟹ **WP** | $\beta P\alpha$ |
| **D'autre part** | Les classements de $c$ **relativement à $\alpha$** et de $c$ **relativement à $\beta$** n'ont changé **chez personne** ⟹ **IIA** | $\alpha Rc$ et $cR\beta$ inchangés ⟹ par **transitivité** $\alpha R\beta$ |

> *« Mais la transitivité implique alors $\alpha R\beta$, **contredisant $\beta P\alpha$**. Ceci établit notre affirmation que **$c$ doit avoir monté au sommet du classement social** comme en figure 6.3. »*

</details>

<details class="details--riche">
<summary>

**Étape 3 — $n$ est dictateur sur toutes les paires ne contenant pas $c$**

</summary>

**La construction :**

Soient $a$ et $b$ deux états sociaux distincts, **chacun distinct de $c$**. Dans la figure 6.3, on change le profil ainsi :

| Individu | Nouveau classement |
|---|---|
| **$n$** | $a\,P^n\,c\,P^n\,b$ — **$c$ redescend entre $a$ et $b$** |
| **tous les autres** | $a$ et $b$ classés **de n'importe quelle manière**, à condition que **la position de $c$ soit inchangée** |

**Le premier appel à IIA — on obtient $aPc$ :**

> *« Notez que dans le nouveau profil de préférences, **le classement de $a$ par rapport à $c$ est le même pour chaque individu qu'il l'était JUSTE AVANT de monter $c$ au sommet du classement de l'individu $n$ à l'étape 2**. Par conséquent, **par IIA, le classement social de $a$ et $c$ doit être le même qu'il l'était à ce moment-là. Mais ceci signifie que $aPc$, parce qu'à ce moment-là $c$ était encore AU BAS du classement social.** »*

**Le second appel à IIA — on obtient $cPb$ :**

> *« De même, dans le nouveau profil, **le classement de $c$ par rapport à $b$ est le même pour chaque individu qu'il l'était JUSTE APRÈS avoir monté $c$ au sommet du classement de l'individu $n$**. Par conséquent, par IIA, le classement social de $c$ et $b$ doit être le même qu'à ce moment-là. **Mais ceci signifie que $cPb$, parce qu'à ce moment-là $c$ venait de monter AU SOMMET du classement social.** »*

**La conclusion par transitivité :**

$$aPc \quad\text{et}\quad cPb \quad\Longrightarrow\quad aPb$$

> *« Notez alors que **PEU IMPORTE comment les autres classent $a$ et $b$, le classement social COÏNCIDE avec le classement de l'individu $n$**. Par IIA, et parce que $a$ et $b$ étaient arbitraires, nous pouvons donc conclure que **pour tous états sociaux $a$ et $b$ distincts de $c$** : »*

$$\boxed{\;a\,P^n\,b \ \Longrightarrow\ a\,P\,b\;}$$

> *« C'est-à-dire, **l'individu $n$ est un DICTATEUR sur toutes les paires d'états sociaux n'impliquant pas $c$**. »*

⚠️ **Le tour de force de l'étape 3** : le nouveau profil est construit pour **imiter simultanément** deux instantanés différents de l'étape 2 — l'un pour la paire $(a,c)$, l'autre pour la paire $(c,b)$. IIA permet d'en importer les conclusions **séparément**, et la transitivité les recolle.

</details>

<details class="details--riche">
<summary>

**Étape 4 — $n$ est dictateur partout**

</summary>

> *« Soit $a$ distinct de $c$. **Nous pouvons répéter les étapes ci-dessus avec $a$ jouant le rôle de $c$** pour conclure que **QUELQU'UN est dictateur sur toutes les paires n'impliquant pas $a$**. »*

**Mais qui ?**

> *« Cependant, **rappelez-vous que le classement de $c$ par l'individu $n$ (bas ou sommet) en figure 6.3 AFFECTE le classement social de $c$ (bas ou sommet)**. Par conséquent, **ce doit être l'individu $n$ qui est le dictateur sur toutes les paires n'impliquant pas $a$**. »*

> *« **Parce que $a$ était un état arbitraire distinct de $c$**, et avec notre conclusion précédente sur l'individu $n$, **ceci implique que $n$ est un dictateur**. »* $\blacksquare$

**Le recollement, explicitement :**

| Conclusion | Sa portée |
|---|---|
| Étape 3 | $n$ dicte sur toutes les paires **sans $c$** |
| Étape 4 | $n$ dicte sur toutes les paires **sans $a$**, pour **tout** $a\neq c$ |

Toute paire contenant $c$ ne contient pas certains $a\neq c$ *(il en existe, car $|X|\geq3$)* ⟹ elle est couverte par l'étape 4. **Toutes les paires sont couvertes.**

</details>

### 🔴 6.5 Où $|X|\geq3$ est-il vraiment utilisé ?

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours).</span>

L'hypothèse sert **deux fois**. À l'**étape 2**, l'argument par l'absurde a besoin de **deux** états $\alpha,\beta$ distincts de $c$ pour construire la contradiction. À l'**étape 4**, le recollement a besoin qu'il existe, pour toute paire contenant $c$, **un troisième état $a$** en dehors d'elle. Avec deux alternatives seulement, le théorème **tombe** — et c'est exactement l'objet de l'**exercice 6.1**, qui rappelle qu'Arrow (1951) a montré que **le vote à la majorité satisfait alors les quatre conditions**.

</div>

## 🟠 Concept 7 — Arrow comme résultat de « possibilité »

### 7.1 Le retournement

> *« Bien que nous ayons présenté ici le théorème d'Arrow comme un résultat d'« **IMPOSSIBILITÉ** », **la preuve qui vient d'être esquissée suggère qu'il peut aussi être énoncé comme un résultat de « POSSIBILITÉ »**. »*

> *« C'est-à-dire, **nous avons montré que toute fonction de bien-être social satisfaisant les trois conditions U, WP et IIA doit produire une relation de préférence sociale qui COÏNCIDE EXACTEMENT avec les préférences d'UNE personne, chaque fois que les préférences de cette personne sont STRICTES**. »*

⚠️ **Le membre de phrase à ne pas perdre** : *« chaque fois que les préférences de cette personne sont strictes »*. Quand le dictateur est **indifférent**, la fonction $f$ reste **libre**.

### 7.2 Ce que cela laisse ouvert

> *« Comme il vous est demandé de l'explorer en **exercice 6.3**, **ceci laisse plusieurs « POSSIBILITÉS » pour la fonction de bien-être social**, bien que **toutes soient dictatoriales selon la condition D**. »*

**Les trois objets de l'exercice 6.3 :**

| Partie | L'objet |
|---|---|
| **(a)** | La **dictature de l'individu $i$** : la fonction qui coïncide avec les préférences de $i$. Montrer qu'elle satisfait **U, WP et IIA** |
| **(b)** | La **dictature LEXICOGRAPHIQUE** : *« la société classe deux états sociaux quelconques $x$ et $y$ selon les préférences de l'individu 1, **sauf s'il est indifférent**, auquel cas $x$ et $y$ sont classés selon les préférences de 2, **sauf s'il est indifférent**, etc. »* Montrer qu'elle satisfait **U, WP et IIA** et qu'elle est **distincte** d'une dictature d'un individu $i$ |
| **(c)** | Décrire **encore une autre** fonction, distincte des deux précédentes, satisfaisant U, WP et IIA |

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — pourquoi la dictature lexicographique est instructive.</span>

Elle montre que la conclusion de la preuve de Geanakoplos est **exactement** ce qu'elle dit et **pas plus** : $n$ dicte sur les préférences **strictes**, mais la fonction n'est pas pour autant identique à $R^n$. L'**exercice 6.5** fait remarquer que **la seconde preuve, diagrammatique, exclut au contraire la dictature lexicographique** — et demande d'expliquer d'où vient ce résultat plus fort.

</div>

## 🔴 Concept 8 — §6.2.1 : le cadre de la preuve diagrammatique

### 8.1 Pourquoi une seconde preuve

> *« **L'importance du théorème d'Arrow justifie de présenter une autre preuve.** Notre seconde preuve sera **diagrammatique**, traitant du cas de **seulement deux individus**. Ensemble, nous espérons que les deux preuves fournissent **un aperçu utile de la nature de ce résultat remarquable**. »*

> **Note de bas de page du livre.** *« L'idée diagrammatique de cette preuve est due à **Blackorby, Donaldson et Weymark (1984)**. »*

### 8.2 Les trois écarts par rapport au cadre précédent

> *« **Nous nous écarterons du cadre de la section précédente de plusieurs manières.** »*

| # | L'écart | La formulation exacte |
|---|---|---|
| **1** | $X$ devient **infini** | *« nous supposerons que $X$ contient **non pas seulement trois états sociaux ou plus, mais une INFINITÉ**. En effet, nous supposons que $X$ est **un sous-ensemble convexe non réduit à un point de $\mathbb{R}^K$** pour un certain $K\geq1$ »* |
| **2** | Les préférences sont **représentées** | *« nous supposons que les préférences individuelles $R^i$ sur $X$ peuvent être représentées par des **fonctions d'utilité CONTINUES** $u^i:X\to\mathbb{R}$. **Ainsi, notre domaine de préférences n'est PAS complètement non restreint.** »* |
| **3** | $f$ agit sur des **fonctions d'utilité** | *« nous supposons que $f$ envoie des **profils de fonctions d'utilité individuelles continues** $u(\cdot)=(u^1(\cdot),\dots,u^N(\cdot))$ **sur une fonction d'utilité continue pour la société** »* |

**Les notes de bas de page qui accompagnent ces écarts :**

> *(sur l'écart 1)* *« Cette hypothèse peut être **substantiellement affaiblie**. Par exemple, l'argument que nous fournirons est valide **du moment que $X\subseteq\mathbb{R}^K$ contient un point et une suite de points distincts convergeant vers lui**. »*

> *(sur l'écart 2)* *« **Si $X$ était FINI, chaque $R^i$ aurait une représentation par une utilité et chaque représentation serait continue.** Donc, dans le cas fini, **supposer la continuité ne restreint pas du tout le domaine de préférences. C'est pourquoi nous supposons ici un $X$ infini, de sorte que la continuité ait du « MORDANT ».** »*

### 8.3 La notation

> *« Pour chaque $u(\cdot)$ continu, nous notons désormais **$f_u$** la fonction d'utilité sociale $f(u^1(\cdot),\dots,u^N(\cdot))$, et **$f_u(x)$** l'utilité assignée à $x\in X$. »*

⚠️ **Un point subtil, souligné par le livre :**

> *« Notez que **l'utilité assignée à $x$, à savoir $[f(u^1(\cdot),\dots,u^N(\cdot))](x)$, peut EN PRINCIPE dépendre de la fonction d'utilité ENTIÈRE de chaque individu, et pas seulement de l'utilité $u^i(x)$ que chaque individu assigne à $x$**. »*

### 8.4 La condition d'invariance (6.1) — le cœur du cadre

**Le raisonnement :**

> *« Pour maintenir l'idée que **la relation de préférence sociale est déterminée UNIQUEMENT par les relations de préférence individuelles $R^i$** — une idée intégrée au traitement du théorème d'Arrow dans la section précédente — **il doit être le cas que l'ordre des états sociaux selon $f_u$ serait INCHANGÉ si un quelconque $u^i(\cdot)$ était remplacé par une fonction d'utilité représentant LES MÊMES préférences**. »*

> *« Ainsi, **parce que deux fonctions d'utilité représentent les mêmes préférences si et seulement si l'une est une transformation strictement croissante de l'autre**, la fonction de bien-être social $f$ doit avoir la propriété suivante : »*

$$\boxed{\;f_u(x)\geq f_u(y) \quad\Longleftrightarrow\quad f_{\psi\circ u}(x)\geq f_{\psi\circ u}(y)\;} \tag{6.1}$$

où $\psi\circ u(\cdot)=\big(\psi^1(u^1(\cdot)),\dots,\psi^N(u^N(\cdot))\big)$, pour toutes $\psi^i:\mathbb{R}\to\mathbb{R}$ **strictement croissantes et continues**.

> *« C'est-à-dire, **$f$ doit être INVARIANTE À L'ORDRE sous les transformations strictement croissantes et continues des fonctions d'utilité individuelles**, où **seules les transformations CONTINUES $\psi^i$ sont considérées, afin de garantir que les fonctions d'utilité individuelles transformées restent continues**. »*

### 8.5 Ce que deviennent U, IIA, WP et D dans ce cadre

| Condition | Sa traduction |
|---|---|
| **U** | *« le domaine de $f$ est **l'ensemble ENTIER des profils de fonctions d'utilité individuelles continues** »* |
| **IIA** | *« signifie précisément ce qu'elle signifiait avant, mais notez en particulier qu'elle implique que **savoir si $f_u(x)$ est supérieur, inférieur ou égal à $f_u(y)$ ne peut dépendre QUE des vecteurs $u(x)=(u^1(x),\dots,u^N(x))$ et $u(y)$, et d'AUCUNE autre valeur prise par la fonction vectorielle $u(\cdot)$** »* |
| **WP**, **D** | *« Les significations des conditions WP et D **restent comme avant**. »* |

> **Note de bas de page du livre sur IIA.** *« Comme déjà noté, l'utilité sociale $f_u(x)$ assignée à $x$ **pourrait dépendre de la fonction d'utilité entière de chaque individu**. **IIA va loin vers l'exigence que $f_u(x)$ ne dépende que du vecteur d'utilités $(u^1(x),\dots,u^N(x))$.** »*

### 8.6 Le principe d'indifférence de Pareto

> **PI. Principe d'indifférence de Pareto (Pareto Indifference Principle).** Si $u^i(x)=u^i(y)$ pour tout $i=1,\dots,N$, alors $f_u(x)=f_u(y)$.

> *« Le principe d'indifférence de Pareto exige que **la société soit INDIFFÉRENTE entre deux états si CHAQUE individu est indifférent entre eux**. »*

### 8.7 Le résultat de représentation (6.2)

> *« **Il peut être montré** (voir **exercice 6.4** et aussi **Sen (1970a)**) que **si $f$ satisfait U, IIA, WP et PI, alors il existe une fonction $W:\mathbb{R}^N\to\mathbb{R}$ STRICTEMENT CROISSANTE et CONTINUE** telle que, pour tous états sociaux $x,y$ et tout profil continu $u(\cdot)$ : »*

$$\boxed{\;f_u(x)\geq f_u(y) \quad\Longleftrightarrow\quad W\big(u^1(x),\dots,u^N(x)\big)\geq W\big(u^1(y),\dots,u^N(y)\big)\;} \tag{6.2}$$

> *« La condition (6.2) dit que **la fonction de bien-être social $f$ peut être RÉSUMÉE par une fonction $W$ strictement croissante et continue — que nous appellerons AUSSI une fonction de bien-être social — qui ordonne simplement les VECTEURS DE NOMBRES D'UTILITÉ individuels correspondant aux alternatives**. »*

> *« Par conséquent, **nous pouvons restreindre notre attention à cette forme plus simple mais ÉQUIVALENTE**. **Elle est plus simple parce qu'elle énonce directement que l'utilité sociale d'une alternative ne dépend QUE du vecteur des utilités individuelles de cette alternative.** »*

⚠️ **Vocabulaire** : le livre appelle **welfarisme strict** *(strict welfarism)* la conjonction **U + WP + IIA + PI**. *(La note de bas de page précise que Sen (1970a) réserve le mot **welfarisme** à U + IIA + PI, sans WP.)*

### 🔴 8.8 La conséquence décisive de (6.1) sur $W$

> *« La propriété exprimée en (6.1), que $f$ est **invariante à l'ordre** sous les transformations continues strictement croissantes, **a des implications importantes pour la fonction de bien-être $W$**. »*

Si $(u_1,\dots,u_N)$ et $(\tilde u_1,\dots,\tilde u_N)$ sont les vecteurs d'utilité de deux états $x$ et $y$, alors **(6.1) combinée à (6.2)** implique que **l'ordre de $\mathbb{R}^N$ par $W$ doit être invariant sous toute transformation continue strictement croissante des NOMBRES d'utilité individuels**. Donc si

$$W(u_1,\dots,u_N)>W(\tilde u_1,\dots,\tilde u_N)$$

alors on doit **aussi** avoir

$$W\big(\psi^1(u_1),\dots,\psi^N(u_N)\big)>W\big(\psi^1(\tilde u_1),\dots,\psi^N(\tilde u_N)\big)$$

pour **toutes** $\psi^i:\mathbb{R}\to\mathbb{R}$ continues strictement croissantes.

> *« **Apprécier ceci est LA CLÉ de l'argument qui suit.** »*

## 🔴 Concept 9 — La preuve diagrammatique elle-même

*« Pour la preuve diagrammatique nous supposons que $N=2$ afin de pouvoir travailler dans le plan. »*

### 9.1 Le point de départ : les quatre régions

> **La figure 6.4.** Un point arbitraire $\bar u$ dans le plan $(u_1,u_2)$. Deux droites en pointillés — l'horizontale $u_2=\bar u_2$ et la verticale $u_1=\bar u_1$ — découpent le plan en **quatre régions**, **les régions n'incluant PAS les droites en pointillés**.

| Région | Position | Caractérisation |
|---|---|---|
| **I** | **nord-est** | $u_1>\bar u_1$ **et** $u_2>\bar u_2$ |
| **II** | **nord-ouest** | $u_1<\bar u_1$ **et** $u_2>\bar u_2$ |
| **III** | **sud-ouest** | $u_1<\bar u_1$ **et** $u_2<\bar u_2$ |
| **IV** | **sud-est** | $u_1>\bar u_1$ **et** $u_2<\bar u_2$ |

> *« D'abord, notez que, **par WP, tous les points de la région I doivent être socialement préférés à $\bar u$. De même, $\bar u$ doit être socialement préféré à tous les points de la région III.** **Notre problème, alors, est de classer les points de II, IV, et les frontières exclues, relativement à $\bar u$.** »*

### 🔴 9.2 Le pas central : la région II est classée d'un seul bloc

Soit $\tilde u$ un point **arbitraire** de la région II. **L'une** des trois relations suivantes doit valoir :

$$W(\bar u)>W(\tilde u) \tag{6.3}$$

$$W(\bar u)=W(\tilde u) \tag{6.4}$$

$$W(\bar u)<W(\tilde u) \tag{6.5}$$

**Supposons pour un moment (6.5).**

> *« Alors, **parce que l'ordre de $\mathbb{R}^N$ par $W$ est invariant sous les transformations continues strictement croissantes, ce même classement doit être PRÉSERVÉ quand nous appliquons de telles transformations aux utilités des individus**. »*

**Choisissons $\psi^1,\psi^2$ strictement croissantes telles que**

$$\psi^1(\bar u_1)=\bar u_1,\qquad \psi^2(\bar u_2)=\bar u_2$$

⚠️ **Elles FIXENT $\bar u$**, tout en pouvant faire ce qu'elles veulent ailleurs.

**Appliquons-les à $\tilde u$.** Comme $\tilde u\in$ II, on sait $\tilde u_1<\bar u_1$ et $\tilde u_2>\bar u_2$. Les $\psi^i$ étant **strictement croissantes** :

$$\tilde v_1\equiv\psi^1(\tilde u_1)<\psi^1(\bar u_1)=\bar u_1 \tag{6.6}$$

$$\tilde v_2\equiv\psi^2(\tilde u_2)>\psi^2(\bar u_2)=\bar u_2 \tag{6.7}$$

> *« Les équations (6.6) et (6.7), ensemble, nous informent que **le point $\tilde v\equiv(\tilde v_1,\tilde v_2)$ doit être quelque part dans la région II, LUI AUSSI**. »*

**Et voici la bascule :**

> *« **Parce que nous avons une flexibilité COMPLÈTE dans notre choix des $\psi^i$ continues strictement croissantes, nous pouvons, par un choix approprié, envoyer $\tilde u$ sur N'IMPORTE QUEL point de la région II.** Mais alors, parce que le classement social des états sociaux sous-jacents doit être invariant sous de telles transformations, **CHAQUE point de la région II doit être classé de la MÊME manière relativement à $\bar u$ !** »*

**Et la remarque qui généralise :**

> *« Si, comme nous l'avons supposé, $W(\bar u)<W(\tilde u)$, alors **chaque point de la région II doit être préféré à $\bar u$**. **Pourtant NULLE PART dans l'argument nous n'avons utilisé le fait que $W(\bar u)<W(\tilde u)$.** Nous aurions pu commencer en supposant n'importe laquelle de (6.3), (6.4) ou (6.5), et atteindre la **même conclusion générale par le même argument**. »*

**Exactement une des trois relations suivantes doit donc valoir :**

$$W(\bar u)>W(\text{II}) \tag{6.8}$$

$$W(\bar u)=W(\text{II}) \tag{6.9}$$

$$W(\bar u)<W(\text{II}) \tag{6.10}$$

<details class="details--riche">
<summary>

**La transformation explicite qui envoie $\tilde u$ où l'on veut — note de bas de page du livre**

</summary>

> *« Par exemple, pour obtenir $\psi^i(\bar u_i)=\bar u_i$ et $\psi^i(\tilde u_i)=u_i$ nous pouvons choisir la fonction continue »*

$$\psi^i(t)\equiv\frac{\bar u_i-u_i}{\bar u_i-\tilde u_i}\,t+\frac{u_i-\tilde u_i}{\bar u_i-\tilde u_i}\,\bar u_i$$

> *« qui est de la forme $\psi^i(t)=\alpha_it+\beta_i$. Notez que **pour tout choix de $(u_1,u_2)$ dans la région II, $\alpha_1,\alpha_2>0$**. »*

**Vérification** *(reconstitution)*. En posant $\psi^i(t)=\alpha_it+\beta_i$ et en imposant les deux conditions :

$$\alpha_i\bar u_i+\beta_i=\bar u_i \qquad\text{et}\qquad \alpha_i\tilde u_i+\beta_i=u_i$$

**Soustraire** : $\alpha_i(\bar u_i-\tilde u_i)=\bar u_i-u_i$, d'où $\alpha_i=\dfrac{\bar u_i-u_i}{\bar u_i-\tilde u_i}$

Puis $\beta_i=\bar u_i(1-\alpha_i)=\bar u_i\cdot\dfrac{(\bar u_i-\tilde u_i)-(\bar u_i-u_i)}{\bar u_i-\tilde u_i}=\dfrac{u_i-\tilde u_i}{\bar u_i-\tilde u_i}\,\bar u_i$

⚠️ **La condition $\alpha_i>0$** est ce qui rend $\psi^i$ **strictement croissante** — et elle est automatique quand la cible $(u_1,u_2)$ est dans la région II, puisque numérateur et dénominateur y ont le **même signe** pour chaque coordonnée.

</details>

### 9.3 Pourquoi (6.9) est impossible

> *« Notez que **(6.9) ne peut certainement PAS tenir**, car cela signifierait que **tous les points de la région II, étant indifférents (sous $W$) à $\bar u$, sont indifférents LES UNS AUX AUTRES**. Mais ceci **contredit que $W$ soit strictement croissante**, parce que le point $\tilde v\gg\tilde u$ dans la région II (voir fig. 6.4) est **strictement préféré** à $\tilde u$. »*

⚠️ **L'argument tient en une ligne** : la région II contient des paires de points **comparables coordonnée par coordonnée** — donc $W$, strictement croissante, ne peut pas les rendre tous indifférents.

**Il reste donc :** soit $W(\bar u)>W(\text{II})$, soit $W(\bar u)<W(\text{II})$.

> *« **Par un argument parallèle à celui qui vient d'être donné**, nous pourrions considérer les points de la région IV et montrer que **soit $W(\bar u)>W(\text{IV})$, soit $W(\bar u)<W(\text{IV})$**. »* *(C'est l'**exercice 6.6**.)*

### 🔴 9.4 II et IV sont classées à l'OPPOSÉ

**Supposons $W(\bar u)<W(\text{II})$.** Alors en particulier

$$W(\bar u)<W(\bar u_1-1,\ \bar u_2+1)$$

**Considérons la paire de fonctions strictement croissantes**

$$\psi^1(u_1)=u_1+1 \qquad \psi^2(u_2)=u_2-1$$

**Leur effet :**

| Point d'origine | Son image |
|---|---|
| $\bar u=(\bar u_1,\bar u_2)$ | $(\bar u_1+1,\ \bar u_2-1)$ — **dans la région IV** |
| $(\bar u_1-1,\ \bar u_2+1)$ | $(\bar u_1,\ \bar u_2)=\bar u$ |

> *« Mais **parce que $W$ doit être invariante à l'ordre sous de telles transformations, ces images doivent être ordonnées de la MÊME manière que leurs préimages le sont**. Par conséquent, nous devons avoir $W(\bar u_1+1,\bar u_2-1)<W(\bar u)$. »*

> *« Mais ceci signifie que **$\bar u$ est strictement socialement préféré au point $(\bar u_1+1,\bar u_2-1)$ dans la région IV**. Par conséquent, **$\bar u$ doit être strictement socialement préféré à CHAQUE point de la région IV** »* *(par le résultat de bloc du §9.2)*.

**Les deux seules configurations possibles :**

$$\text{soit}\qquad W(\text{IV})<W(\bar u)<W(\text{II}) \tag{6.11}$$

$$\text{soit}\qquad W(\text{II})<W(\bar u)<W(\text{IV}) \tag{6.12}$$

### 9.5 Les frontières en pointillés

> *« Notez maintenant que **si des régions ADJACENTES sont classées de la même manière relativement à $\bar u$, alors la droite en pointillés qui les sépare doit être classée de cette même manière relativement à $\bar u$**. »*

**L'exemple donné par le livre :**

> *« Par exemple, supposons que **les régions I et II sont classées au-dessus de $\bar u$**. Puisque **par WP** tout point de la droite en pointillés au-dessus de $\bar u$ est classé au-dessus des points de la région II qui se trouvent strictement en dessous de lui, **la transitivité implique que ce point de la droite en pointillés doit être classé au-dessus de $\bar u$**. »*

### 9.6 La conclusion : les courbes d'indifférence sont des droites

> **La figure 6.5.** Deux panneaux montrant le plan $(u_1,u_2)$ semé de « $+$ » et de « $-$ », où *« « $+$ » (« $-$ ») désigne les vecteurs d'utilité $u=(u_1,u_2)$ avec $W(u)$ supérieur (inférieur) à $W(\bar u)$ »*. **(a)** correspond à **(6.11)** : tout ce qui est **au-dessus** de la droite horizontale passant par $\bar u$ porte « $+$ », tout ce qui est **en dessous** porte « $-$ ». **(b)** correspond à **(6.12)** : tout ce qui est **à droite** de la droite verticale porte « $+$ », tout ce qui est **à gauche** porte « $-$ ».

> *« Par conséquent, **si (6.11) tient**, alors parce que la région I est classée au-dessus de $\bar u$ et la région III en dessous, le classement social doit être comme donné en figure 6.5(a). **Mais la CONTINUITÉ de $W$ implique alors que la courbe d'indifférence passant par $\bar u$ est une DROITE HORIZONTALE.** D'autre part, **si (6.12) tient**, de sorte que la figure 6.5(b) est pertinente, alors **la courbe d'indifférence passant par $\bar u$ serait une DROITE VERTICALE**. »*

**Le pas final :**

> *« Donc, **parce que $\bar u$ était arbitraire**, nous pouvons conclure que **la courbe d'indifférence passant par CHAQUE vecteur d'utilité est soit une droite horizontale, soit une droite verticale**. »*

> *« Cependant, **parce que les courbes d'indifférence ne peuvent pas se croiser**, ceci signifie que : »*

| Configuration | Conséquence |
|---|---|
| **Toutes horizontales** | Seul $u_2$ compte ⟹ **l'individu 2 est DICTATEUR** |
| **Toutes verticales** | Seul $u_1$ compte ⟹ **l'individu 1 est DICTATEUR** |

> *« **Dans les deux cas, nous avons établi l'existence d'un dictateur et la preuve est complète.** »* $\blacksquare$

### 🔴 9.7 Pourquoi la seconde preuve est PLUS FORTE

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — la comparaison que demande l'exercice 6.5.</span>

La première preuve laisse subsister la **dictature lexicographique** *(exercice 6.3(b))*. La seconde ne le peut pas : sous une dictature lexicographique, les **ensembles d'indifférence** de $W$ ne sont pas des droites entières — ce sont des **points isolés** sur chaque verticale, l'individu 2 servant à départager quand 1 est indifférent. Or la preuve diagrammatique **force la courbe d'indifférence à être une droite complète**. La différence tient entièrement aux **hypothèses supplémentaires du §6.2.1** : **PI** *(qui impose l'indifférence sociale dès que tous sont indifférents)* et la **continuité** de $W$ — ni l'une ni l'autre n'étant disponibles dans le cadre fini du §6.2.

</div>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Trois personnes, trois options, vote majoritaire | **Paradoxe de Condorcet** | Faire les **trois duels** et chercher le **cycle** |
| « seulement deux alternatives » | **Exercice 6.1** | Là, le vote majoritaire **satisfait** les quatre conditions |
| « remplacer WP par une condition plus faible » | **Exercice 6.2 (VWP)** | Vérifier que la preuve ne se sert de WP que sur des **profils stricts** |
| « montrer que telle règle satisfait U, WP, IIA » | **Exercice 6.3** | Vérifier les trois ; conclure qu'elle **doit** être dictatoriale |
| Une règle qui départage les indifférences | **Dictature lexicographique** | Elle satisfait U, WP, IIA — et est **distincte** de la dictature simple |
| Comptage de Borda | **Exercice 6.12** | Il satisfait **U, WP, D** ; il **viole IIA** |
| « chacun décisif sur au moins une paire » | **Exercice 6.13 (Sen)** | **Libéralisme minimal L*** incompatible avec U + WP |
| Une règle définie par « majorité, sinon $xPyPz$ » | **Exercice 6.9** | Vérifier WP et D, en déduire que **IIA** tombe, puis l'exhiber |
| « construire $\psi$ envoyant tel point sur tel autre » | **Preuve diagrammatique** | La forme **affine** $\psi^i(t)=\alpha_it+\beta_i$ avec $\alpha_i>0$ |
| « prouver que $W(\bar u)>W(\text{IV})$ ou $<$ » | **Exercice 6.6** | Répliquer l'argument de la région II |
| « déduire l'existence de $W$ » | **Exercice 6.4** | Construire $\succsim$ sur $\mathbb{R}^N$, montrer complétude, monotonie, transitivité, puis **théorèmes 1.1 et 1.3** |

**Les trois réflexes de cadrage :**

1. **Toujours identifier quel axiome tombe.** Une règle « raisonnable » qui existe viole **nécessairement** l'un des quatre — le trouver est l'exercice.
2. **IIA est presque toujours le coupable.** Borda, la règle de l'exercice 6.9, tout mécanisme qui utilise **les positions** plutôt que **les paires**.
3. **Compter les alternatives.** Le théorème exige $|X|\geq3$ ; à deux alternatives, tout est possible.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Exhiber un cycle de Condorcet

1. **Trois personnes, trois options.** Écrire les préférences en **rotation cyclique** : $xyz$, $yzx$, $zxy$.
2. **Faire les trois duels** en comptant les voix : chacun se gagne **2 contre 1**.
3. **Constater le cycle** $xPy$, $yPz$, $zPx$.
4. **Conclure** : la complétude tient, **la transitivité tombe**.

### Méthode 2 — Montrer qu'une règle viole IIA

1. **Construire un premier profil** et calculer le classement social de la paire $(x,y)$.
2. **Modifier les préférences ailleurs uniquement** — chaque individu garde **la même position relative de $x$ et $y$**.
3. **Recalculer** le classement social de $(x,y)$.
4. **S'il a changé, IIA est violée.** *(Pour Borda : déplacer une troisième alternative change les comptes, donc l'ordre.)*

### Méthode 3 — Dérouler la preuve de Geanakoplos

1. **Étape 1.** Placer $c$ **au bas de tous** ⟹ par **WP**, $c$ est au bas du social.
2. **Étape 2.** Remonter $c$ au sommet **un individu à la fois** ⟹ il existe un **premier** $n$ qui fait bouger le social. Montrer par l'absurde ($\alpha Rc$, $cR\beta$) que $c$ saute **au sommet**, en utilisant que $c$ est **au bas ou au sommet chez chacun** pour rendre $\beta P^i\alpha$ universel.
3. **Étape 3.** Poser $aP^ncP^nb$ chez $n$ seul. Deux appels à **IIA** *(l'un vers l'instant « juste avant », l'autre vers « juste après »)* donnent $aPc$ et $cPb$ ; la **transitivité** donne $aPb$.
4. **Étape 4.** Recommencer avec $a$ dans le rôle de $c$ ; l'identité du dictateur est forcée par le fait que **$n$ contrôle la position sociale de $c$**.

### Méthode 4 — Le raisonnement d'invariance dans la preuve diagrammatique

1. **Fixer $\bar u$** et découper le plan en quatre régions **sans les frontières**.
2. **WP règle I et III** *(préférée / pire)*.
3. **Pour II** : prendre $\tilde u\in$ II, choisir $\psi^i$ **fixant $\bar u$** et envoyant $\tilde u$ où l'on veut **dans II** ⟹ **toute la région II est classée pareil**.
4. **Éliminer l'indifférence** : sinon deux points comparables de II seraient indifférents, contredisant la **stricte croissance**.
5. **Pour IV** : prendre $\psi^1(u)=u+1$, $\psi^2(u)=u-1$ ⟹ **IV est classée à l'opposé de II**.
6. **Les frontières** suivent la région adjacente par **WP + transitivité**.
7. **La continuité** transforme le motif de « $+$ » et « $-$ » en une **droite d'indifférence**.
8. **Les courbes ne se croisent pas** ⟹ toutes horizontales **ou** toutes verticales ⟹ **dictateur**.

### Méthode 5 — Construire $W$ à partir de $f$ *(exercice 6.4)*

| Pas | Ce qu'on fait | L'outil |
|---|---|---|
| **(a)** | Montrer que $u(x)=v(x')$ et $u(y)=v(y')$ ⟹ $f_u(x)\geq f_u(y)\Leftrightarrow f_v(x')\geq f_v(y')$ | **U, IIA, PI** |
| — | Définir $\succsim$ sur $\mathbb{R}^N$ : $a\succsim b$ si $f_u(x)\geq f_u(y)$ pour **un** profil et **une** paire réalisant $u^i(x)=a_i$, $u^i(y)=b_i$ |  |
| **(b)** | $\succsim$ est **complète** |  |
| **(c)** | $\succsim$ est **strictement monotone** | **WP** |
| **(d)** | $\succsim$ est **transitive** — *« c'est ici qu'au moins trois états sociaux sont nécessaires »* | (a) |
| **(e)** | Admettre la **continuité**, en déduire l'existence de $W$ continue et strictement croissante | **Théorèmes 1.1 et 1.3** |
| **(f)** | Conclure (6.2) |  |

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire que l'économie normative est « affaire d'opinion » | *« **Au contraire**, il existe une chose telle que la **cohérence** dans le raisonnement »* | Elle **exhibe** les prémisses et en tire les conséquences |
| 2 | Restreindre les $R^i$ à des préférences égoïstes | *« Elles peuvent refléter l'**altruisme**, le sens de la **bonté**, ou même les valeurs **religieuses** »* | Le théorème ne suppose **rien** de leur nature |
| 3 | Croire que le principe de Pareto choisit le meilleur point | *« ce principe est **MUET** sur la question essentielle »* | Il **exclut**, il ne **choisit** pas |
| 4 | Oublier que la préférence sociale doit être **transitive** | C'est la définition 6.1 | Sinon aucune hiérarchie n'existe |
| 5 | Dire que le vote majoritaire est « incomplet » | *« le mécanisme est « **complet** » en ce qu'il donne une meilleure alternative dans **toute** comparaison par paires »* | C'est la **transitivité** qui tombe |
| 6 | Croire que la cohérence suffit | *« On peut être **parfaitement cohérent** et violer **chaque précepte moral** »* | D'où les axiomes de valeur |
| 7 | Croire que $f$ prend des utilités au §6.2 | Non — elle prend des **relations** $R^i$ | Les utilités n'apparaissent qu'au §6.2.1 |
| 8 | Confondre WP et le principe de Pareto fort | WP **n'exige rien** si une seule personne est **indifférente** | D'où le mot « **faible** » |
| 9 | Mal énoncer IIA | Les profils **peuvent différer** sur les autres paires | Seules comptent les positions **relatives de $x$ et $y$** |
| 10 | Croire que D exclut les dictateurs partiels | *« Même un dictateur « **virtuel** », qui obtient toujours ce qu'il veut sur toutes les paires **sauf une**, ne serait pas exclu »* | C'est ce qui rend le théorème dévastateur |
| 11 | Croire que le théorème dit qu'aucune $f$ n'existe | Beaucoup existent — **aucune** ne satisfait **les quatre** conditions | U + WP + IIA ⟹ **dictature** |
| 12 | Oublier $\|X\|\geq3$ | À deux alternatives, **le vote majoritaire satisfait tout** *(exercice 6.1)* | Le seuil est **trois** |
| 13 | Oublier où l'axiome U sert dans la preuve | *« Il est utilisé **à chaque étape** chaque fois que nous choisissons ou altérons le profil »* | Chaque « supposons » **est** un appel à U |
| 14 | À l'étape 2, oublier pourquoi $c$ est en haut ou en bas partout | C'est **précisément** ce qui permet de rendre $\beta P^i\alpha$ chez **tous** sans bouger $c$ | Le pivot de la contradiction |
| 15 | À l'étape 2, conclure que $c$ monte « un peu » | Non — la preuve montre qu'il monte **AU SOMMET** | Sinon $\alpha Rc$, $cR\beta$ ⟹ contradiction |
| 16 | À l'étape 3, ne faire qu'un seul appel à IIA | Il en faut **deux** — vers deux instants **différents** de l'étape 2 | L'un donne $aPc$, l'autre $cPb$ |
| 17 | À l'étape 3, oublier la transitivité | $aPc$ et $cPb$ **seuls** ne donnent pas $aPb$ | La transitivité recolle |
| 18 | À l'étape 4, croire que le dictateur pourrait changer | Non : *« le classement de $c$ par $n$ **affecte** le classement social de $c$ »* | Ce **doit** être $n$ |
| 19 | Lire Arrow comme excluant toute règle | *« il peut aussi être énoncé comme un résultat de **POSSIBILITÉ** »* | Elles sont **toutes dictatoriales** |
| 20 | Oublier « quand ses préférences sont **strictes** » | Le dictateur ne dicte que sur les **strictes** | D'où la **dictature lexicographique** |
| 21 | Croire que le §6.2.1 a le même domaine | *« notre domaine de préférences **n'est PAS complètement non restreint** »* | Utilités **continues** |
| 22 | Croire que la continuité est innocente | Si $X$ était **fini**, elle ne restreindrait **rien** — d'où le $X$ **infini**, *« pour que la continuité ait du MORDANT »* | Note de bas de page 3 |
| 23 | Croire que $f_u(x)$ ne dépend que de $u(x)$ *a priori* | *« peut **en principe** dépendre de la fonction d'utilité **entière** »* | C'est **IIA** qui le force |
| 24 | Oublier pourquoi les $\psi^i$ doivent être **continues** | *« pour garantir que les utilités **transformées restent continues** »* | Le domaine l'exige |
| 25 | Confondre invariance et indifférence | (6.1) dit que **l'ORDRE** est préservé, pas les **valeurs** | Deux représentations, mêmes préférences |
| 26 | Oublier PI dans la liste du welfarisme strict | **U + WP + IIA + PI** | Sen (1970a) réserve « welfarisme » à **U + IIA + PI** |
| 27 | Croire que les régions incluent les pointillés | *« les régions **n'incluent PAS** les droites en pointillés »* | Elles sont traitées **séparément** |
| 28 | Croire que WP règle les régions II et IV | **Non** — WP ne règle que **I** et **III** | II et IV sont **le problème** |
| 29 | Croire que $\psi^i$ doit fixer $\tilde u$ | **Elle fixe $\bar u$** et déplace $\tilde u$ librement | C'est l'inverse |
| 30 | Croire que (6.9) est possible | Elle rendrait tous les points de II **indifférents entre eux** | Contredit la **stricte croissance** ($\tilde v\gg\tilde u$) |
| 31 | Croire que II et IV peuvent être du **même** côté | Les transformations $u_1+1$, $u_2-1$ l'interdisent | (6.11) **ou** (6.12), jamais autre chose |
| 32 | Oublier la **continuité** dans le pas final | Sans elle, le motif de $+$ et $-$ ne donnerait pas une **droite** | C'est ce qui produit la courbe d'indifférence |
| 33 | Confondre les deux conclusions finales | **Horizontales** ⟹ **individu 2** dictateur · **verticales** ⟹ **individu 1** | Ne pas les intervertir |
| 34 | Croire les deux preuves équivalentes | La seconde **exclut** la dictature lexicographique, la première non | *(exercice 6.5)* |

## 📌 Ultimate Review

**L'annonce du chapitre.**

> *« Nous changeons notre perspective **du positif au normatif** […] À la fin du chapitre nous **revenons à l'économie positive** et considérons comment **les individus motivés par leur intérêt personnel rendent le problème du choix social DOUBLEMENT difficile**. »*

⚠️ *« L'économie normative n'est pas « qu'affaire d'opinion » : **il existe une chose telle que la COHÉRENCE dans le raisonnement des prémisses aux conclusions**. »*

**§6.1 — le problème.**

Un **état social** peut être *« à peu près n'importe quoi »* : une élection, un partage de tarte, une forme d'organisation, une distribution de ressources.

**Dans la boîte d'Edgeworth (fig. 6.1)** : les points **hors de la courbe des contrats** s'excluent **par unanimité**. Mais parmi les efficaces ?

$$\boxed{\;\text{Le principe de Pareto EXCLUT ; il est MUET sur l'arbitrage entre les personnes.}\;}$$

**Les trois questions ouvertes** : l'intensité **compte-t-elle** ? peut-elle être **connue** ? peut-elle être **comparée** entre personnes ?

**§6.2 — le cadre.**

$X$ **fini**, $N\geq2$, chaque $R^i$ **complète et transitive**. Les $R^i$ peuvent refléter *« l'**altruisme**, la **bonté**, les valeurs **religieuses** »*.

**DÉF. 6.1** : $R$ est une relation binaire **complète et transitive** sur $X$.

**PARADOXE DE CONDORCET** : $1:xyz$ · $2:yzx$ · $3:zxy$ ⟹ $xPy$, $yPz$, mais $zPx$. **La complétude tient ; la TRANSITIVITÉ tombe.**

*« La cohérence, à elle seule, n'est pas particulièrement intéressante. **On peut être parfaitement cohérent et violer chaque précepte moral.** »*

$$R=f\big(R^1,\dots,R^N\big)$$

**HYPOTHÈSE 6.1 — les quatre axiomes.**

|  | L'axiome | Le commentaire du livre |
|---|---|---|
| **U** | Le domaine inclut **toutes** les combinaisons | Exclut le **vote majoritaire** (avec la transitivité) |
| **WP** | $xP^iy\ \forall i\Rightarrow xPy$ | **Faible** : rien si **un seul** est indifférent |
| **IIA** | Le social sur $(x,y)$ ne dépend que des **positions relatives** de $x$ et $y$ | *« la plus **délicate** — lisez-la attentivement »* |
| **D** | Aucun $i$ tel que $xP^iy\Rightarrow xPy$ **toujours** | *« Même un dictateur **virtuel** ne serait pas exclu »* |

**THÉORÈME 6.1 — l'impossibilité d'Arrow.**

$$\boxed{\;|X|\geq3 \ \Longrightarrow\ \text{aucune } f \text{ ne satisfait U, WP, IIA et D à la fois}\;}$$

**La stratégie** : $\text{U}\wedge\text{WP}\wedge\text{IIA}\Rightarrow$ **il existe un dictateur** $\Rightarrow\neg\text{D}$.

⚠️ **U est utilisé À CHAQUE ÉTAPE**, chaque fois qu'on choisit ou altère un profil.

**LA PREUVE (Geanakoplos 1996), en quatre étapes.**

| Étape | Le contenu | Les outils |
|---|---|---|
| **1** | $c$ au **bas de tous** ⟹ $c$ au bas du **social** | **WP** |
| **2** | Remonter $c$ un à un ⟹ un **premier** $n$ fait bouger le social, et $c$ saute **AU SOMMET** | **WP + IIA + transitivité** |
| **3** | Poser $aP^ncP^nb$ ⟹ **deux** appels à IIA donnent $aPc$ et $cPb$ ⟹ $aPb$. **$n$ dicte sans $c$** | **IIA + transitivité** |
| **4** | Répéter avec $a$ au rôle de $c$ ; c'est **encore $n$** ⟹ **$n$ dicte partout** |  |

*L'argument par l'absurde de l'étape 2 : si $\alpha Rc$ et $cR\beta$ pour $\alpha,\beta\neq c$, comme $c$ est **au bas ou au sommet chez chacun**, on peut rendre $\beta P^i\alpha$ **universel** sans bouger $c$ ⟹ WP donne $\beta P\alpha$, IIA + transitivité donnent $\alpha R\beta$ — **contradiction**.*

**LA LECTURE « POSSIBILITÉ »** :

> *« Toute $f$ satisfaisant U, WP et IIA doit produire une préférence sociale qui **coïncide exactement avec les préférences d'UNE personne, chaque fois que ses préférences sont STRICTES**. »*

⟹ la **dictature lexicographique** *(exercice 6.3(b))* satisfait U, WP, IIA et est **distincte** de la dictature simple.

**§6.2.1 — la preuve diagrammatique** *(Blackorby, Donaldson et Weymark 1984)*.

**Les trois écarts** : $X$ **convexe infini** dans $\mathbb{R}^K$ · préférences représentées par des $u^i$ **continues** · $f$ envoie des **profils d'utilité** sur une **utilité sociale continue**.

⚠️ *« Si $X$ était fini, la continuité **ne restreindrait rien**. C'est pourquoi nous supposons $X$ infini, **pour qu'elle ait du MORDANT**. »*

**(6.1) L'INVARIANCE À L'ORDRE :**

$$f_u(x)\geq f_u(y) \iff f_{\psi\circ u}(x)\geq f_{\psi\circ u}(y)$$

pour toutes $\psi^i$ **strictement croissantes et continues**. *« **Apprécier ceci est LA CLÉ de l'argument qui suit.** »*

**PI** : tous indifférents ⟹ **société indifférente**.

**WELFARISME STRICT** $=$ **U + WP + IIA + PI** $\Longrightarrow$ *(exercice 6.4, Sen 1970a)* il existe $W:\mathbb{R}^N\to\mathbb{R}$ **strictement croissante et continue** avec

$$f_u(x)\geq f_u(y) \iff W\big(u^1(x),\dots\big)\geq W\big(u^1(y),\dots\big) \tag{6.2}$$

**LA PREUVE, pour $N=2$.**

Autour de $\bar u$, quatre régions **sans les pointillés** : **I** (NE) · **II** (NO) · **III** (SO) · **IV** (SE).

| Pas | Le résultat |
|---|---|
| **WP** | I **préférée**, III **pire** |
| **Invariance** | On peut envoyer $\tilde u\in$ II sur **n'importe quel** point de II en **fixant $\bar u$** ⟹ **II est classée D'UN SEUL BLOC** |
| **Stricte croissance** | (6.9) **impossible** : $\tilde v\gg\tilde u$ dans II est strictement préféré |
| $\psi^1=u+1,\ \psi^2=u-1$ | **IV est classée à l'OPPOSÉ de II** |
| **WP + transitivité** | Les **pointillés** suivent la région adjacente |
| **Continuité** | Le motif devient une **DROITE d'indifférence** |

$$\text{soit } W(\text{IV})<W(\bar u)<W(\text{II}) \tag{6.11}$$

$$\text{soit } W(\text{II})<W(\bar u)<W(\text{IV}) \tag{6.12}$$

**Les courbes d'indifférence ne se croisant pas :**

$$\boxed{\;\text{toutes HORIZONTALES} \Rightarrow \textbf{2 est dictateur} \qquad \text{toutes VERTICALES} \Rightarrow \textbf{1 est dictateur}\;}$$

⚠️ **La seconde preuve est PLUS FORTE** : elle exclut la dictature lexicographique, que la première laisse subsister *(exercice 6.5)* — grâce à **PI** et à la **continuité**.

**La transformation affine explicite** *(note de bas de page 5)* :

$$\psi^i(t)=\frac{\bar u_i-u_i}{\bar u_i-\tilde u_i}\,t+\frac{u_i-\tilde u_i}{\bar u_i-\tilde u_i}\,\bar u_i \qquad\text{avec}\qquad \alpha_1,\alpha_2>0$$

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quel est le changement de perspective annoncé par le chapitre 6 ?**

</summary>

> *« Nous avons eu tendance à nous concentrer sur des questions d'« **économie positive** » […] **nous avons caractérisé et prédit le comportement, plutôt que de le juger ou de le prescrire**. Dans la majeure partie de ce chapitre, **nous changeons notre perspective du positif au normatif**. »*

Et à la fin : *« nous **revenons à l'économie positive** et considérons comment **les individus motivés par leur intérêt personnel rendent le problème du choix social DOUBLEMENT difficile** »*.

</details>

<details class="details--riche">
<summary>

**2. Comment le livre défend-il l'économie normative contre le relativisme ?**

</summary>

> *« Ce fait évident **ne doit pas nous décourager ni nous faire désespérer que l'économie normative ne soit « qu'affaire d'opinion »**. **Au contraire, il existe une chose telle que la COHÉRENCE dans le raisonnement des prémisses aux conclusions et donc aux prescriptions.** L'économie du bien-être aide à éclairer le débat **en nous forçant à confronter les prémisses éthiques sous-jacentes à nos arguments** aussi bien qu'en nous aidant à **en voir les implications logiques**. »*

</details>

<details class="details--riche">
<summary>

**3. Qu'est-ce qu'un « état social » ?**

</summary>

> *« Au niveau de généralité auquel nous travaillerons, un état social peut être **à peu près n'importe quoi** : l'**élection d'un candidat**, une manière de **partager une tarte**, l'adoption d'une **forme d'organisation orientée vers le marché**, ou une manière particulière de **distribuer les ressources de la société**. »*

> *« **Un problème de choix social surgit chaque fois qu'un groupe quelconque d'individus doit faire un choix collectif parmi un ensemble d'alternatives.** »*

</details>

<details class="details--riche">
<summary>

**4. Que montre la figure 6.1, et que peut-on exclure sans peine ?**

</summary>

Une boîte d'Edgeworth où **chaque point est un état social**. Les **points hors de la courbe des contrats** s'excluent :

> *« Si l'un d'eux devait être recommandé comme le meilleur, il serait facile de trouver **un autre point sur la courbe des contrats que TOUT LE MONDE préfère**. Parce qu'il serait difficile de discuter avec une telle **unanimité**, notre recherche devrait être **restreinte aux alternatives Pareto-efficaces**. »*

</details>

<details class="details--riche">
<summary>

**5. Pourquoi le principe de Pareto ne suffit-il pas ?**

</summary>

Parce que le point $\bar x$ de la figure 6.1 est **follement inégal** et pourtant **Pareto-efficace**. L'exclure exige *« quelque norme éthique **supplémentaire** »*.

> *« Ce principe est **MUET sur la question essentielle** : à savoir, **comment pouvons-nous arbitrer le bien-être de la personne 2 contre celui de la personne 1 dans l'intérêt de la société dans son ensemble ?** »*

$$\text{Le principe de Pareto EXCLUT ; il ne CHOISIT pas.}$$

</details>

<details class="details--riche">
<summary>

**6. Quelles trois questions le §6.1 ouvre-t-il ?**

</summary>

*« En essayant de faire de tels arbitrages, **l'intensité de préférence importe-t-elle** ? Si nous pensons qu'elle importe, d'autres questions entrent en scène : »*

1. *« L'intensité de préférence **peut-elle être CONNUE** ? »*
2. *« Les gens **peuvent-ils nous dire à quel point ils ressentent fortement** ? »*
3. *« Les désirs intenses de différentes personnes **peuvent-ils être COMPARÉS** de sorte qu'un **équilibrage des gains et des pertes** puisse être atteint ? »*

⚠️ Le §6.2 les met **délibérément de côté** ; le §6.3 les reprend sous le nom de **mesurabilité et comparabilité**.

</details>

<details class="details--riche">
<summary>

**7. Qu'exige-t-on des préférences individuelles, et jusqu'où vont-elles ?**

</summary>

Chaque $R^i$ est **complète et transitive** — *« nous n'exigeons rien d'autre que les gens soient capables de faire des **comparaisons binaires** et que ces comparaisons soient **transitives** »*.

⚠️ **Leur portée est délibérément immense :**

> *« Les éléments de $X$ peuvent aller **du purement mondain au purement spirituel**. Les $R^i$ **n'ont pas besoin de refléter simplement des attitudes égoïstes envers des objets matériels. Elles peuvent aussi refléter l'ALTRUISME de la personne, son sens de la BONTÉ, ou même ses valeurs RELIGIEUSES.** »*

</details>

<details class="details--riche">
<summary>

**8. Énoncer la définition 6.1.**

</summary>

Une **relation de préférence sociale** $R$ est une relation binaire **complète et transitive** sur $X$. On lit $xRy$ comme *« $x$ est socialement au moins aussi bon que $y$ »*, avec $P$ (stricte) et $I$ (indifférence).

**La question d'Arrow** : *« Comment aller des vues personnelles souvent **divergentes** mais individuellement **cohérentes** à une vue sociale **unique et cohérente** ? »*

</details>

<details class="details--riche">
<summary>

**9. Exposer le paradoxe de Condorcet.**

</summary>

$N=3$, $X=\{x,y,z\}$ :

|  | **1** | **2** | **3** |
|---|---|---|---|
| 1ᵉʳ | $x$ | $y$ | $z$ |
| 2ᵉ | $y$ | $z$ | $x$ |
| 3ᵉ | $z$ | $x$ | $y$ |

$x$ bat $y$ **2-1** ⟹ $xPy$. $y$ bat $z$ **2-1** ⟹ $yPz$. **Transitivité exigerait $xPz$.** Or **$z$ bat $x$ 2-1** ⟹ $zPx$.

⚠️ **La transitivité est violée.**

</details>

<details class="details--riche">
<summary>

**10. Quelle est la lecture exacte du paradoxe ?**

</summary>

> *« Notez que dans cet exemple, **le mécanisme de la règle majoritaire est « COMPLET »** en ce qu'il est capable de donner **une meilleure alternative dans toute comparaison par paires**. **L'échec de la transitivité, cependant, signifie qu'à l'intérieur de cet ensemble de trois alternatives, AUCUNE meilleure alternative unique ne peut être déterminée.** »*

$$\text{complétude : OK} \qquad \text{transitivité : VIOLÉE}$$

*« Exiger la complétude et la transitivité implique que $R$ **doit être capable de placer chaque élément dans une hiérarchie du meilleur au pire**. »*

</details>

<details class="details--riche">
<summary>

**11. Pourquoi la cohérence ne suffit-elle pas ?**

</summary>

> *« **La cohérence, à elle seule, n'est pas particulièrement intéressante ou convaincante en matière de choix social. On peut être parfaitement cohérent et violer néanmoins CHAQUE précepte moral que la communauté pourrait partager.** »*

**Et l'avertissement qui suit** : *« Parce que **le désaccord sur les « valeurs fondamentales » est la raison même pour laquelle un problème de choix social surgit**, il nous faudra **être très prudents en les spécifiant si nous voulons éviter de TRIVIALISER le problème dès le départ**. »*

</details>

<details class="details--riche">
<summary>

**12. Qu'est-ce qu'une fonction de bien-être social ?**

</summary>

Une **règle** capable *« d'AGRÉGER et de RÉCONCILIER les différentes vues individuelles en une relation de préférence sociale unique satisfaisant certains principes éthiques »* :

$$R=f\big(R^1,\dots,R^N\big)$$

*« $f$ prend un **$N$-uplet de relations de préférence individuelles** sur $X$ et les **envoie sur une relation de préférence sociale** sur $X$. »*

⚠️ **Au §6.2, $f$ prend des RELATIONS**, pas des utilités.

</details>

<details class="details--riche">
<summary>

**13. Énoncer les quatre axiomes d'Arrow.**

</summary>

**U.** Le domaine de $f$ inclut **toutes les combinaisons possibles** de relations individuelles sur $X$.

**WP.** Si $xP^iy$ **pour tout $i$**, alors $xPy$.

**IIA.** Si chaque individu classe $x$ contre $y$ **de la même manière** sous $R^i$ et sous $\tilde R^i$, alors **le classement social de $x$ contre $y$ est le même** sous $R$ et $\tilde R$.

**D.** Il n'existe **aucun** $i$ tel que $xP^iy\Rightarrow xPy$ pour tous $x,y$, **quelles que soient** les préférences des autres.

</details>

<details class="details--riche">
<summary>

**14. Que dit le livre de la condition U ?**

</summary>

> *« **U** dit que $f$ est capable de générer un ordre social **quelles que soient** les relations de préférence des individus. Elle formalise le principe que **la capacité d'un mécanisme à faire des choix sociaux ne devrait pas dépendre de ce que les membres de la société aient des vues d'un type particulier**. »*

> *« Cette condition, **avec l'exigence de transitivité sur $R$**, **exclut le vote majoritaire** comme mécanisme approprié. »*

</details>

<details class="details--riche">
<summary>

**15. En quel sens WP est-il « faible » ?**

</summary>

> *« Notez que c'est une exigence de Pareto **FAIBLE** parce qu'**elle n'exige pas spécifiquement que la préférence sociale soit pour $x$ si, disons, TOUS SAUF UN préfèrent strictement $x$ à $y$, mais qu'une personne est INDIFFÉRENTE**. »*

⚠️ La conclusion n'est exigée que pour l'**unanimité stricte**.

*(L'**exercice 6.2** demande de montrer qu'on peut l'affaiblir encore en **VWP** — « si $xP^iy$ pour tout $i$, alors $xPy$ » — sans affecter la conclusion du théorème.)*

</details>

<details class="details--riche">
<summary>

**16. Expliquer IIA avec l'exemple du matin et de l'après-midi.**

</summary>

**Le matin** : tous classent $z$ **en dessous** de $x$ et $y$ ; certains préfèrent $x$ à $y$, d'autres l'inverse. La fonction donne $xPy$.

**L'après-midi** : les préférences ont changé — **$z$ est maintenant classé AU-DESSUS** de $x$ et $y$ par tous. Mais *« **le classement de $x$ contre $y$ par chaque individu reste INCHANGÉ** »*.

> *« **Serait-il raisonnable que la préférence sociale bascule maintenant vers $y$ au-dessus de $x$ ? IIA dit que non.** »*

$$\text{Le sort de } (x,y) \text{ ne dépend QUE des positions relatives de } x \text{ et } y.$$

</details>

<details class="details--riche">
<summary>

**17. Pourquoi D est-elle une condition si faible ?**

</summary>

> *« La condition D est **une restriction vraiment très douce**. Elle dit simplement qu'il ne devrait pas y avoir un individu unique qui « **obtienne ce qu'il veut** » sur **chaque** choix social. Ainsi, **SEULE la forme la plus extrême et absolue de dictature est spécifiquement exclue. Même un dictateur « VIRTUEL », qui obtient toujours ce qu'il veut sur toutes les paires SAUF UNE, ne serait pas exclu par cette condition seule.** »*

⚠️ **C'est ce qui rend l'impossibilité si dévastatrice** : l'axiome contredit est le plus **faible** des quatre.

</details>

<details class="details--riche">
<summary>

**18. Énoncer le théorème 6.1 et sa stratégie de preuve.**

</summary>

**S'il y a au moins TROIS états sociaux dans $X$, aucune $f$ ne satisfait simultanément U, WP, IIA et D.**

> *« **La stratégie de la preuve est de montrer que U, WP et IIA impliquent l'EXISTENCE D'UN DICTATEUR.** Par conséquent, si U, WP et IIA tiennent, **D doit échouer**. »*

$$\text{U}\wedge\text{WP}\wedge\text{IIA}\ \Longrightarrow\ \neg\,\text{D}$$

*(La preuve suit **Geanakoplos (1996)**.)*

</details>

<details class="details--riche">
<summary>

**19. Où l'axiome U est-il utilisé dans la preuve ?**

</summary>

> *« Notez que **l'axiome U, domaine non restreint, est utilisé À CHAQUE ÉTAPE chaque fois que nous CHOISISSONS ou ALTÉRONS le profil de préférences considéré. Le domaine non restreint garantit que chaque profil de préférences de ce type est ADMISSIBLE.** »*

**Chaque « supposons maintenant que… » de la preuve EST un appel à U.**

</details>

<details class="details--riche">
<summary>

**20. Dérouler l'étape 1.**

</summary>

> *« Considérez un état social quelconque, $c$. Supposez que **chaque individu place $c$ au BAS de son classement**. **Par WP, le classement social doit placer $c$ au bas également.** »*

**La figure 6.2** montre le tableau : $x$ en haut, $y$ juste en dessous, …, **$c$ tout en bas** dans **chaque** colonne $R^1,\dots,R^N$ **et** dans la colonne sociale $R$.

</details>

<details class="details--riche">
<summary>

**21. Dérouler la construction de l'étape 2.**

</summary>

> *« Imaginez déplacer $c$ **au sommet** du classement de l'individu 1 […] Ensuite, faites de même avec l'individu 2 […] **Continuez UN INDIVIDU À LA FOIS**, en gardant à l'esprit que **chacun de ces changements pourrait avoir un effet sur le classement social**. »*

> *« Finalement, $c$ sera au sommet de **chaque** classement individuel, et donc **au sommet du classement social par WP**. Par conséquent, **il doit y avoir une PREMIÈRE fois durant ce processus où le classement social de $c$ AUGMENTE**. »*

**Soit $n$ ce premier individu — l'individu PIVOT.**

</details>

<details class="details--riche">
<summary>

**22. Démontrer que $c$ saute AU SOMMET du classement social.**

</summary>

**Par l'absurde.** Supposons que le classement social de $c$ augmente **mais pas jusqu'au sommet** : $\alpha Rc$ et $cR\beta$ pour certains $\alpha,\beta\neq c$.

**Le pas décisif** : *« parce que **$c$ est soit au bas soit au sommet du classement de CHAQUE individu**, nous pouvons **changer les préférences de chaque $i$ de sorte que $\beta P^i\alpha$, tout en laissant la position de $c$ INCHANGÉE** »*.

|  | L'argument | La conclusion |
|---|---|---|
| **D'une part** | $\beta P^i\alpha$ pour tout $i$ ⟹ **WP** | $\beta P\alpha$ |
| **D'autre part** | Les positions de $c$ vs $\alpha$ et de $c$ vs $\beta$ **n'ont bougé chez personne** ⟹ **IIA** | $\alpha Rc$, $cR\beta$ ⟹ **transitivité** ⟹ $\alpha R\beta$ |

**Contradiction.** Donc $c$ est **au sommet** du classement social. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**23. Dérouler l'étape 3.**

</summary>

Soient $a,b$ distincts et **distincts de $c$**. Nouveau profil :

| Individu | Classement |
|---|---|
| **$n$** | $a\,P^n\,c\,P^n\,b$ |
| Les autres | $a$ et $b$ **comme on veut**, la position de $c$ **inchangée** |

**Premier appel à IIA** : le classement de $a$ vs $c$ est chez chacun **le même que JUSTE AVANT** l'étape 2 pour $n$ ⟹ le social est le même ⟹ **$aPc$** *(car $c$ était alors au bas)*.

**Second appel à IIA** : le classement de $c$ vs $b$ est chez chacun **le même que JUSTE APRÈS** ⟹ **$cPb$** *(car $c$ venait de monter au sommet)*.

**Transitivité** ⟹ $aPb$, **peu importe** comment les autres classent $a$ et $b$.

$$\boxed{\;a\,P^n\,b \Rightarrow a\,P\,b \quad\text{pour tous } a,b\neq c\;}$$

</details>

<details class="details--riche">
<summary>

**24. Quel est le tour de force de l'étape 3 ?**

</summary>

**Le nouveau profil est construit pour IMITER SIMULTANÉMENT deux instantanés différents de l'étape 2** — l'un *(juste avant le passage de $n$)* pour la paire $(a,c)$, l'autre *(juste après)* pour la paire $(c,b)$.

**IIA permet d'importer les deux conclusions séparément**, et la **transitivité** les recolle en $aPb$.

</details>

<details class="details--riche">
<summary>

**25. Dérouler l'étape 4.**

</summary>

> *« Soit $a$ distinct de $c$. Nous pouvons **répéter les étapes ci-dessus avec $a$ jouant le rôle de $c$** pour conclure que **quelqu'un est dictateur sur toutes les paires n'impliquant pas $a$**. »*

**Qui ?** *« Rappelez-vous que **le classement de $c$ par l'individu $n$ (bas ou sommet) affecte le classement social de $c$**. Par conséquent, **ce doit être l'individu $n$**. »*

**Le recollement** : toute paire contenant $c$ ne contient pas un certain $a\neq c$ — il en existe car $|X|\geq3$ — donc elle est couverte. **$n$ est dictateur.** $\blacksquare$

</details>

<details class="details--riche">
<summary>

**26. Où l'hypothèse $|X|\geq3$ est-elle vraiment utilisée ?**

</summary>

**Deux fois** *(enrichissement)* :

1. À l'**étape 2**, l'argument par l'absurde exige **deux** états $\alpha,\beta$ distincts de $c$.
2. À l'**étape 4**, le recollement exige que pour toute paire contenant $c$, il existe **un troisième état** $a$ en dehors d'elle.

⚠️ **À deux alternatives, le théorème tombe** : l'**exercice 6.1** rappelle qu'Arrow (1951) a montré que **le vote majoritaire satisfait alors les quatre conditions**.

</details>

<details class="details--riche">
<summary>

**27. Comment Arrow peut-il se lire comme un résultat de POSSIBILITÉ ?**

</summary>

> *« Bien que nous ayons présenté ici le théorème comme un résultat d'« impossibilité », **la preuve suggère qu'il peut aussi être énoncé comme un résultat de « POSSIBILITÉ »**. C'est-à-dire, **toute $f$ satisfaisant U, WP et IIA doit produire une relation sociale qui COÏNCIDE EXACTEMENT avec les préférences d'UNE personne, chaque fois que les préférences de cette personne sont STRICTES**. »*

⚠️ **Le membre de phrase à ne pas perdre** : *« chaque fois que ses préférences sont strictes »* — quand le dictateur est **indifférent**, $f$ reste **libre**.

</details>

<details class="details--riche">
<summary>

**28. Qu'est-ce qu'une dictature lexicographique, et pourquoi est-elle instructive ?**

</summary>

*(Exercice 6.3(b))* : *« la société classe $x$ et $y$ **selon les préférences de l'individu 1, sauf s'il est indifférent**, auquel cas selon celles de **2, sauf s'il est indifférent**, etc. »*

Elle satisfait **U, WP et IIA** et elle est **distincte** d'une dictature d'un individu $i$.

⚠️ **Ce qu'elle montre** : la conclusion de la preuve de Geanakoplos est **exactement** ce qu'elle dit — $n$ dicte sur les préférences **strictes**, mais $f\neq R^n$.

*(L'**exercice 6.5** demande de constater que **la preuve diagrammatique, elle, l'exclut** — et d'expliquer d'où vient ce résultat plus fort.)*

</details>

<details class="details--riche">
<summary>

**29. Quels sont les trois écarts du §6.2.1 par rapport au §6.2 ?**

</summary>

| # | L'écart |
|---|---|
| **1** | $X$ est **infini** — *« un sous-ensemble convexe non réduit à un point de $\mathbb{R}^K$ »* |
| **2** | Les $R^i$ sont **représentées par des utilités continues** — *« notre domaine **n'est PAS complètement non restreint** »* |
| **3** | $f$ envoie des **profils de fonctions d'utilité continues** sur une **utilité sociale continue** |

*(L'idée diagrammatique est due à **Blackorby, Donaldson et Weymark (1984)**.)*

</details>

<details class="details--riche">
<summary>

**30. Pourquoi faut-il un $X$ INFINI ici ?**

</summary>

> *« **Si $X$ était fini, chaque $R^i$ aurait une représentation par une utilité et chaque représentation serait continue. Donc, dans le cas fini, supposer la continuité ne restreint PAS DU TOUT le domaine de préférences. C'est pourquoi nous supposons ici un $X$ infini, de sorte que la continuité ait du « MORDANT ».** »*

*(Note de bas de page : l'hypothèse de convexité peut être affaiblie — *« l'argument est valide du moment que $X$ contient **un point et une suite de points distincts convergeant vers lui** »*.)*

</details>

<details class="details--riche">
<summary>

**31. Énoncer et justifier la condition d'invariance (6.1).**

</summary>

**La justification** : *« pour maintenir l'idée que **la relation sociale est déterminée uniquement par les RELATIONS de préférence individuelles**, il doit être le cas que l'ordre selon $f_u$ serait **inchangé si un $u^i$ était remplacé par une fonction représentant LES MÊMES préférences** »*. Or c'est le cas **ssi** l'une est une transformation strictement croissante de l'autre.

$$f_u(x)\geq f_u(y) \iff f_{\psi\circ u}(x)\geq f_{\psi\circ u}(y) \tag{6.1}$$

⚠️ **Pourquoi les $\psi^i$ doivent être CONTINUES** : *« pour garantir que **les fonctions d'utilité transformées restent continues** »*.

</details>

<details class="details--riche">
<summary>

**32. Que devient IIA dans le cadre du §6.2.1 ?**

</summary>

> *« IIA signifie **précisément ce qu'elle signifiait avant**, mais notez en particulier qu'elle implique que **savoir si $f_u(x)$ est supérieur, inférieur ou égal à $f_u(y)$ ne peut dépendre QUE des vecteurs $u(x)$ et $u(y)$, et d'AUCUNE autre valeur prise par $u(\cdot)$**. »*

⚠️ **C'est nécessaire** parce que *a priori* *« l'utilité sociale assignée à $x$ **peut en principe dépendre de la fonction d'utilité ENTIÈRE de chaque individu** »*.

</details>

<details class="details--riche">
<summary>

**33. Énoncer PI et le résultat (6.2).**

</summary>

**PI — indifférence de Pareto** : si $u^i(x)=u^i(y)$ pour tout $i$, alors $f_u(x)=f_u(y)$. *« La société est indifférente entre deux états si **chaque individu** est indifférent. »*

**Le résultat** *(exercice 6.4, Sen 1970a)* : si $f$ satisfait **U, IIA, WP et PI**, il existe $W:\mathbb{R}^N\to\mathbb{R}$ **strictement croissante et continue** telle que

$$f_u(x)\geq f_u(y) \iff W\big(u^1(x),\dots,u^N(x)\big)\geq W\big(u^1(y),\dots,u^N(y)\big) \tag{6.2}$$

⚠️ **Sa portée** : *« l'utilité sociale d'une alternative **ne dépend QUE du vecteur des utilités individuelles de cette alternative** »*.

</details>

<details class="details--riche">
<summary>

**34. Quelle propriété de $W$ (6.1) impose-t-elle, et pourquoi est-ce la clé ?**

</summary>

**L'ordre de $\mathbb{R}^N$ par $W$ est invariant sous toute transformation continue strictement croissante appliquée coordonnée par coordonnée** :

$$W(u_1,\dots,u_N)>W(\tilde u_1,\dots,\tilde u_N)\ \Longrightarrow\ W\big(\psi^1(u_1),\dots\big)>W\big(\psi^1(\tilde u_1),\dots\big)$$

> *« **Apprécier ceci est LA CLÉ de l'argument qui suit.** »*

</details>

<details class="details--riche">
<summary>

**35. Décrire la figure 6.4 et ce que WP règle immédiatement.**

</summary>

Un point $\bar u$ arbitraire ; deux pointillés découpent le plan en quatre régions **qui n'incluent PAS les pointillés** :

| Région | Position |
|---|---|
| **I** | NE — $u_1>\bar u_1$, $u_2>\bar u_2$ |
| **II** | NO — $u_1<\bar u_1$, $u_2>\bar u_2$ |
| **III** | SO |
| **IV** | SE |

> *« Par WP, **tous les points de I sont socialement préférés à $\bar u$** ; **$\bar u$ est préféré à tous les points de III**. **Notre problème est de classer II, IV, et les frontières exclues.** »*

</details>

<details class="details--riche">
<summary>

**36. Démontrer que la région II est classée d'un seul bloc.**

</summary>

Soit $\tilde u\in$ II. Supposons (par exemple) $W(\bar u)<W(\tilde u)$.

**Choisir $\psi^1,\psi^2$ strictement croissantes avec $\psi^1(\bar u_1)=\bar u_1$ et $\psi^2(\bar u_2)=\bar u_2$** — elles **FIXENT $\bar u$**.

Comme $\tilde u_1<\bar u_1$ et $\tilde u_2>\bar u_2$, la stricte croissance donne

$$\tilde v_1=\psi^1(\tilde u_1)<\bar u_1 \qquad \tilde v_2=\psi^2(\tilde u_2)>\bar u_2$$

donc **$\tilde v$ est encore dans II**. Et :

> *« Parce que nous avons une **flexibilité complète** dans notre choix des $\psi^i$, nous pouvons envoyer $\tilde u$ sur **N'IMPORTE QUEL** point de II. Mais alors, par l'invariance, **CHAQUE point de II doit être classé de la MÊME manière relativement à $\bar u$ !** »*

⚠️ *« **Nulle part dans l'argument nous n'avons utilisé** $W(\bar u)<W(\tilde u)$ »* — on aurait pu partir de (6.3), (6.4) ou (6.5).

</details>

<details class="details--riche">
<summary>

**37. Donner la transformation affine explicite de la note de bas de page.**

</summary>

Pour obtenir $\psi^i(\bar u_i)=\bar u_i$ et $\psi^i(\tilde u_i)=u_i$ :

$$\psi^i(t)\equiv\frac{\bar u_i-u_i}{\bar u_i-\tilde u_i}\,t+\frac{u_i-\tilde u_i}{\bar u_i-\tilde u_i}\,\bar u_i$$

**Vérification** : en posant $\psi^i(t)=\alpha_it+\beta_i$, les deux conditions donnent $\alpha_i(\bar u_i-\tilde u_i)=\bar u_i-u_i$ puis $\beta_i=\bar u_i(1-\alpha_i)$.

> *« Notez que **pour tout choix de $(u_1,u_2)$ dans la région II, $\alpha_1,\alpha_2>0$**. »* — ce qui garantit la **stricte croissance**.

</details>

<details class="details--riche">
<summary>

**38. Pourquoi (6.9) — l'indifférence — est-elle impossible ?**

</summary>

> *« (6.9) **ne peut certainement pas tenir**, car cela signifierait que **tous les points de la région II, étant indifférents à $\bar u$, sont indifférents LES UNS AUX AUTRES**. Mais ceci contredit que **$W$ soit strictement croissante**, parce que le point $\tilde v\gg\tilde u$ dans la région II est **strictement préféré** à $\tilde u$. »*

⚠️ **En une ligne** : la région II contient des paires **comparables coordonnée par coordonnée**.

</details>

<details class="details--riche">
<summary>

**39. Démontrer que II et IV sont classées à l'OPPOSÉ.**

</summary>

Supposons $W(\bar u)<W(\text{II})$. En particulier $W(\bar u)<W(\bar u_1-1,\ \bar u_2+1)$.

**Prendre** $\psi^1(u_1)=u_1+1$ et $\psi^2(u_2)=u_2-1$ :

| Préimage | Image |
|---|---|
| $\bar u$ | $(\bar u_1+1,\ \bar u_2-1)\in$ **IV** |
| $(\bar u_1-1,\ \bar u_2+1)$ | $\bar u$ |

**L'invariance à l'ordre** force $W(\bar u_1+1,\bar u_2-1)<W(\bar u)$, donc $\bar u$ est **strictement préféré** à un point de IV — donc à **toute** la région IV.

$$\text{soit } W(\text{IV})<W(\bar u)<W(\text{II}) \quad \text{(6.11)} \qquad \text{soit } W(\text{II})<W(\bar u)<W(\text{IV}) \quad \text{(6.12)}$$

</details>

<details class="details--riche">
<summary>

**40. Comment traite-t-on les frontières en pointillés ?**

</summary>

> *« **Si des régions ADJACENTES sont classées de la même manière relativement à $\bar u$, alors la droite en pointillés qui les sépare doit être classée de cette même manière.** »*

**L'exemple** : si I et II sont **au-dessus** de $\bar u$, alors **par WP** tout point du pointillé au-dessus de $\bar u$ est classé **au-dessus des points de II strictement en dessous de lui** ; la **transitivité** donne alors qu'il est classé **au-dessus de $\bar u$**.

</details>

<details class="details--riche">
<summary>

**41. Conclure la preuve diagrammatique.**

</summary>

**Sous (6.11)** — fig. 6.5(a) — I est au-dessus, III en dessous ; **la continuité de $W$** implique que *« la courbe d'indifférence passant par $\bar u$ est une **DROITE HORIZONTALE** »*. **Sous (6.12)** — fig. 6.5(b) — elle est **VERTICALE**.

> *« Parce que **$\bar u$ était arbitraire**, la courbe d'indifférence passant par **chaque** vecteur est soit horizontale soit verticale. Cependant, **parce que les courbes d'indifférence ne peuvent pas se croiser** : »*

| Toutes **horizontales** | ⟹ **l'individu 2 est dictateur** |
|---|---|
| Toutes **verticales** | ⟹ **l'individu 1 est dictateur** |

> *« **Dans les deux cas, nous avons établi l'existence d'un dictateur et la preuve est complète.** »* $\blacksquare$

</details>

<details class="details--riche">
<summary>

**42. Pourquoi la seconde preuve est-elle PLUS FORTE que la première ?**

</summary>

*(Enrichissement, en réponse à l'exercice 6.5.)*

La première laisse subsister la **dictature lexicographique**. La seconde ne le peut pas : sous une telle dictature, les **ensembles d'indifférence** ne sont pas des droites entières mais des **points isolés** sur chaque verticale — l'individu 2 départageant quand 1 est indifférent. Or la preuve diagrammatique **force la courbe d'indifférence à être une droite complète**.

**La différence tient aux hypothèses supplémentaires du §6.2.1** : **PI** et la **continuité** de $W$, absentes du cadre fini.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le changement de perspective du chapitre 6 ? | Du **positif** au **normatif** — et retour au positif au §6.5 |
| Ce qui sauve l'économie normative du relativisme ? | La **cohérence** dans le raisonnement des prémisses aux conclusions |
| Ce qu'est un « état social » ? | *« À peu près **n'importe quoi** »* — élection, partage, forme d'organisation |
| Quand surgit un problème de choix social ? | Dès qu'**un groupe doit faire un choix collectif** parmi des alternatives |
| Ce qu'on exclut sans peine dans la fig. 6.1 ? | Les points **hors de la courbe des contrats** — par **unanimité** |
| Pourquoi Pareto ne suffit pas ? | *« Ce principe est **MUET** sur la question essentielle »* — l'arbitrage entre personnes |
| En une formule ? | **Pareto EXCLUT ; il ne CHOISIT pas** |
| Les trois questions ouvertes par le §6.1 ? | L'intensité **compte**-t-elle ? peut-elle être **connue** ? **comparée** ? |
| Ce qu'on exige des $R^i$ ? | **Complétude** et **transitivité** — rien de plus |
| Ce que les $R^i$ peuvent refléter ? | L'**altruisme**, la **bonté**, les valeurs **religieuses** |
| Définition 6.1 ? | $R$ est une relation binaire **complète et transitive** sur $X$ |
| La lecture de $xRy$ ? | *« $x$ est **socialement au moins aussi bon** que $y$ »* |
| Le paradoxe de Condorcet, les profils ? | $1:xyz$ · $2:yzx$ · $3:zxy$ |
| Ses trois duels ? | $xPy$ (2-1), $yPz$ (2-1), **mais $zPx$** (2-1) |
| Ce qui échoue exactement ? | La **TRANSITIVITÉ** — la complétude, elle, tient |
| Pourquoi la cohérence ne suffit-elle pas ? | *« On peut être **parfaitement cohérent** et violer **chaque précepte moral** »* |
| Le risque en spécifiant les valeurs ? | **Trivialiser le problème dès le départ** |
| Ce qu'est une fonction de bien-être social ? | $R=f(R^1,\dots,R^N)$ |
| Ce que $f$ prend en entrée au §6.2 ? | Des **relations**, pas des utilités |
| L'axiome U ? | Le domaine inclut **toutes** les combinaisons possibles |
| Ce que U + transitivité excluent ? | Le **vote majoritaire** |
| L'axiome WP ? | $xP^iy$ pour **tout** $i$ ⟹ $xPy$ |
| En quel sens est-il « faible » ? | Rien n'est exigé si **une seule** personne est **indifférente** |
| Sa version encore plus faible ? | **VWP** *(exercice 6.2)* — même conclusion |
| L'axiome IIA ? | Le social sur $(x,y)$ ne dépend que des **positions relatives** de $x$ et $y$ |
| Ce que les profils peuvent faire ? | **Différer librement** sur toutes les **autres** paires |
| L'exemple du livre pour IIA ? | Le **matin** / l'**après-midi** : $z$ remonte, $x$ vs $y$ ne bouge pas |
| L'axiome D ? | Aucun $i$ tel que $xP^iy\Rightarrow xPy$ **quoi qu'en pensent les autres** |
| Ce que D **n'exclut pas** ? | Un **dictateur virtuel** — qui gagne sur **toutes les paires sauf une** |
| Théorème 6.1 ? | $\|X\|\geq3$ ⟹ **aucune $f$** ne satisfait U, WP, IIA **et** D |
| Sa stratégie ? | **U ∧ WP ∧ IIA ⟹ dictateur ⟹ ¬D** |
| L'auteur de la preuve présentée ? | **Geanakoplos (1996)** |
| Où U est-il utilisé ? | **À CHAQUE étape**, chaque fois qu'on altère un profil |
| Étape 1 ? | $c$ au **bas de tous** ⟹ **par WP** $c$ au bas du social |
| Étape 2, la construction ? | Remonter $c$ au sommet **un individu à la fois** |
| Ce qu'est l'individu $n$ ? | Le **PREMIER** dont le passage fait **monter $c$ socialement** |
| Ce que la preuve montre alors ? | $c$ ne monte pas « un peu » — il monte **AU SOMMET** |
| L'hypothèse par l'absurde ? | $\alpha Rc$ et $cR\beta$ pour $\alpha,\beta\neq c$ |
| Le pas décisif de l'étape 2 ? | $c$ étant **au bas ou au sommet chez chacun**, on rend $\beta P^i\alpha$ **universel** |
| La contradiction ? | **WP** donne $\beta P\alpha$ ; **IIA + transitivité** donnent $\alpha R\beta$ |
| Étape 3, le profil de $n$ ? | $a\,P^n\,c\,P^n\,b$ |
| Ce que doivent respecter les autres ? | La **position de $c$ inchangée**, $a$ et $b$ libres |
| Le premier appel à IIA ? | Vers l'instant **juste AVANT** ⟹ **$aPc$** *(c au bas)* |
| Le second ? | Vers l'instant **juste APRÈS** ⟹ **$cPb$** *(c au sommet)* |
| Ce qui recolle ? | La **transitivité** ⟹ $aPb$ |
| La conclusion de l'étape 3 ? | $n$ est dictateur sur toutes les paires **ne contenant pas $c$** |
| Le tour de force de l'étape 3 ? | Imiter **deux instantanés différents** de l'étape 2 simultanément |
| Étape 4 ? | Répéter avec **$a$ au rôle de $c$** |
| Pourquoi c'est encore $n$ ? | Parce que **$n$ contrôle la position sociale de $c$** |
| Où $\|X\|\geq3$ sert-il ? | À l'**étape 2** (deux états $\alpha,\beta$) et à l'**étape 4** (le recollement) |
| À deux alternatives ? | Le **vote majoritaire satisfait les quatre conditions** *(exercice 6.1)* |
| La lecture « possibilité » ? | $f$ **coïncide** avec les préférences **strictes** d'une personne |
| Le membre de phrase à ne pas perdre ? | *« **chaque fois que ses préférences sont STRICTES** »* |
| Ce qu'est une dictature lexicographique ? | 1 décide, **sauf s'il est indifférent** — alors 2, etc. |
| Satisfait-elle U, WP, IIA ? | **Oui** — et elle est **distincte** de la dictature simple |
| L'écart n°1 du §6.2.1 ? | $X$ **convexe infini** dans $\mathbb{R}^K$ |
| L'écart n°2 ? | Préférences représentées par des $u^i$ **continues** |
| Le domaine est-il encore non restreint ? | **NON** — *« pas complètement non restreint »* |
| L'écart n°3 ? | $f$ envoie des **profils d'utilité** sur une **utilité sociale continue** |
| Pourquoi $X$ infini ? | Pour que la **continuité ait du « MORDANT »** — en fini elle ne restreint rien |
| Les auteurs de la preuve diagrammatique ? | **Blackorby, Donaldson et Weymark (1984)** |
| La condition (6.1) ? | **Invariance à l'ordre** sous $\psi^i$ strictement croissantes et **continues** |
| Sa justification ? | Deux $u$ représentent les mêmes préférences **ssi** l'une transforme l'autre |
| Pourquoi les $\psi^i$ continues ? | Pour que les utilités **transformées restent continues** |
| Ce que IIA implique ici ? | $f_u(x)$ vs $f_u(y)$ ne dépend **que** de $u(x)$ et $u(y)$ |
| Ce qui serait vrai sans IIA ? | $f_u(x)$ pourrait dépendre de la fonction d'utilité **entière** |
| La condition PI ? | Tous **indifférents** ⟹ **société indifférente** |
| Le welfarisme strict ? | **U + WP + IIA + PI** |
| Ce que Sen appelle « welfarisme » ? | **U + IIA + PI** *(sans WP)* |
| Le résultat (6.2) ? | Il existe $W:\mathbb{R}^N\to\mathbb{R}$ **strictement croissante et continue** |
| Sa portée ? | L'utilité sociale ne dépend **que du VECTEUR d'utilités** |
| Ce que (6.1) impose à $W$ ? | Son ordre de $\mathbb{R}^N$ est **invariant** sous les $\psi^i$ |
| La phrase du livre là-dessus ? | *« **Apprécier ceci est LA CLÉ de l'argument qui suit.** »* |
| Les quatre régions ? | **I** NE · **II** NO · **III** SO · **IV** SE |
| Incluent-elles les pointillés ? | **NON** — ils sont traités **séparément** |
| Ce que WP règle ? | **I préférée**, **III pire** — et rien d'autre |
| Ce qui reste à régler ? | **II**, **IV**, et **les frontières** |
| Les $\psi^i$ du pas central fixent quoi ? | Elles fixent **$\bar u$** — et déplacent $\tilde u$ **librement dans II** |
| Le résultat obtenu ? | **Toute la région II est classée D'UN SEUL BLOC** |
| Le fait remarquable de cet argument ? | Il n'utilise **jamais** laquelle de (6.3)-(6.5) on a supposée |
| La forme de $\psi^i$ ? | **Affine** : $\psi^i(t)=\alpha_it+\beta_i$ avec $\alpha_i>0$ |
| Pourquoi (6.9) est impossible ? | Tous les points de II seraient **indifférents entre eux** — or $\tilde v\gg\tilde u$ |
| Les $\psi$ qui relient II et IV ? | $\psi^1(u)=u+1$ et $\psi^2(u)=u-1$ |
| Ce qu'elles font ? | Envoient $\bar u$ **dans IV** et $(\bar u_1-1,\bar u_2+1)$ **sur $\bar u$** |
| La conclusion ? | **IV est classée à l'OPPOSÉ de II** |
| Les deux configurations ? | (6.11) $W(\text{IV})<W(\bar u)<W(\text{II})$ · (6.12) l'inverse |
| Comment on traite les pointillés ? | **WP + transitivité** — ils suivent la région **adjacente** |
| Ce que la **continuité** produit ? | La courbe d'indifférence est une **DROITE** |
| Courbes **horizontales** ⟹ ? | L'**individu 2** est dictateur |
| Courbes **verticales** ⟹ ? | L'**individu 1** est dictateur |
| Ce qui interdit de mélanger ? | Les courbes d'indifférence **ne se croisent pas** |
| Pourquoi la 2ᵉ preuve est plus forte ? | Elle **exclut la dictature lexicographique** — grâce à **PI** et à la **continuité** |
| Quelle règle satisfait U, WP et D mais pas IIA ? | Le **comptage de Borda** *(exercice 6.12)* |
| Ce que montre l'exercice 6.13 (Sen) ? | Aucune $f$ ne satisfait **U + WP + libéralisme minimal L*** |
