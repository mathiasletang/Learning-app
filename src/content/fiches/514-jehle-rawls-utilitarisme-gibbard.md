# Fiche 514 — Rawls, utilitarisme, justice et le théorème de Gibbard-Satterthwaite

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 6 « Social Choice and Welfare », §6.3 « Measurability, Comparability, and Some Possibilities », §6.4 « Justice » et §6.5 « Social Choice and the Gibbard-Satterthwaite Theorem » (p. 279-296) |
| **Difficulté** | Avancé |
| **Temps d'étude estimé** | 150 min |
| **Prérequis** | Fiche 513 (les quatre axiomes d'Arrow, welfarisme strict, la fonction $W$ de (6.2), la preuve diagrammatique) · fiche 506 (utilité de von Neumann-Morgenstern, aversion au risque) · homothéticité et CES *(chapitre 3)* |
| **Concepts clés** | Acyclicité, préférences à pic unique, invariance en niveau d'utilité, invariance en différence d'utilité, anonymat (A), équité de Hammond (HE), fonction de bien-être rawlsienne, maximin, forme utilitariste, utilitarisme généralisé, invariance en pourcentage, courbes radialement parallèles, homothéticité, forme CES, élasticité de substitution sociale, position originelle, voile d'ignorance, Harsanyi, principe de raison insuffisante, critique d'Arrow (1973), fonction de choix social, invulnérabilité stratégique, monotonicité, théorème de Gibbard-Satterthwaite, preuve de Reny (2001) |
| **Poids à l'examen** | La **définition 6.2** et le lien exact entre **information** et **classe d'invariance** · les **deux preuves diagrammatiques** (théorèmes 6.2 et 6.3), en particulier les **transformations explicites** de la preuve utilitariste · la chaîne **invariance en pourcentage → homothéticité → CES** et ses **deux limites** · la **réduction de Rawls à Harsanyi** par l'aversion infinie au risque · les **définitions 6.5 à 6.7** · la **preuve de Gibbard-Satterthwaite en deux parties**, avec les **cinq étapes** de la partie 2. |

## 🎯 Vue d'ensemble

```
LE FIL DES §6.3 A §6.5 : que reste-t-il apres Arrow ?

  §6.3  MESURABILITE, COMPARABILITE, ET DES POSSIBILITES

     DEUX voies de sauvetage :
       (1) AFFAIBLIR les exigences sur R
           transitivite -> ACYCLICITE ;  ordre complet -> « un meilleur »
           OU remplacer U par des preferences A PIC UNIQUE
              -> BLACK (1948) : le vote majoritaire marche
                 si le nombre d'individus est IMPAIR !
       (2) CHANGER L'INFORMATION que les preferences transmettent
           <- c'est la voie suivie ici

     L'INFORMATION determine la CLASSE D'INVARIANCE :

       ordre des NIVEAUX  (« qui est le plus mal loti ? »)
          -> psi COMMUNE strictement croissante
          -> INVARIANCE EN NIVEAU

       ordre des DIFFERENCES (« i gagne-t-il plus que j ne perd ? »)
          -> psi^i(u) = a_i + b u,  b COMMUN > 0
          -> INVARIANCE EN DIFFERENCE

       ordre des POURCENTAGES
          -> psi(u) = b u,  b COMMUN > 0
          -> INVARIANCE EN POURCENTAGE

     DEF. 6.3   A   = ANONYMAT      (permuter ne change rien)
                HE  = EQUITE DE HAMMOND (reduire la DISPERSION)

     THEOREME 6.2  W satisfait HE  <=>  W = min[u1, ..., uN]
                   (RAWLSIEN) ; et alors A + invariance en NIVEAU

     THEOREME 6.3  W satisfait A + invariance en DIFFERENCE
                   <=>  W = SOMME des u_i   (UTILITARISTE)

     §6.3.3  invariance en POURCENTAGE
             -> courbes RADIALEMENT PARALLELES  ->  HOMOTHETIE
             + A  -> symetrie autour de la 45deg
             + quasiconcavite -> l'inegalite n'est pas valorisee
             + SEPARABILITE FORTE -> la famille CES

                W = [ SOMME (u_i)^rho ]^(1/rho),   rho < 1, rho non nul

                rho -> 1        :  UTILITARISTE  (sigma -> infini)
                rho -> -infini  :  RAWLSIEN      (sigma -> 0)

  §6.4  JUSTICE

     DEUX traditions :  UTILITARISTE   (Hume, Smith, Bentham, Mill)
                        CONTRACTARIENNE (Locke, Rousseau, Kant)
     raffinees par      HARSANYI       et  RAWLS

     TOUS DEUX : la POSITION ORIGINELLE, derriere le VOILE D'IGNORANCE

     HARSANYI : VNM + raison insuffisante -> proba 1/N pour chaque
                identite  ->  esperance d'utilite  ->  UTILITARISME

     RAWLS    : aucune base empirique pour ces probas
                -> ignorance COMPLETE + aversion au risque
                -> MAXIMIN

     LA CRITIQUE D'ARROW (1973) :
        v_i = -(u_i)^(-a) est VNM, d'aversion croissante en a
        -> W = SOMME v_i  se transforme en  [SOMME u_i^(-a)]^(-1/a)
        -> c'est la CES avec rho = -a
        -> a -> infini donne le MAXIMIN

        CONCLUSION : le maximin de Rawls est un CAS PARTICULIER
        de l'utilitarisme de Harsanyi -- celui de l'aversion
        INFINIE au risque.

  §6.5  LE THEOREME DE GIBBARD-SATTERTHWAITE

     Le probleme neuf : comment CONNAITRE les preferences ?
        « Les individus auraient interet a MENTIR. »

     FONCTION DE CHOIX SOCIAL c(R) dans X, de RANG PLEIN

     DEF. 6.4  DICTATORIALE
     DEF. 6.5  INVULNERABLE A LA MANIPULATION (strategy-proof)

     THEOREME 6.4  |X| >= 3  =>  toute c invulnerable est DICTATORIALE

     PREUVE (Reny 2001), en DEUX parties :
        PARTIE 1  invulnerabilite => MONOTONICITE + EFFICACITE
        PARTIE 2  |X|>=3 + monotonicite + efficacite => DICTATURE
                  en CINQ etapes, figures 6.11 a 6.16

     LE MESSAGE : impossible de concevoir un systeme NON dictatorial
     fonde sur des preferences AUTO-DECLAREES sans que quelqu'un
     puisse gagner a MENTIR.  ->  la QUASI-LINEARITE au chapitre 9.
```

> ⚠️ **Note de transcription — identique aux fiches 500-513.** Le PDF perd le **barré du $\neq$** (ainsi *« où $0=\rho<1$ »* signifie $\rho\neq0$, et *« $y=x$ »* dans les preuves signifie $y\neq x$), l'implication $\Longrightarrow$ *(qui s'exporte comme « + »)*, ainsi que $\sum$, $\gg$ et $\Pi$. Les étiquettes des figures utilisent l'encodage Symbol Mac (`Ϫ` = « − », `Ͻ` = « &lt; », `␳` = $\rho$, `ϱ` = $\infty$, `Њ` = « ° »). Ces symboles sont rétablis depuis la prose et les équations voisines — **il s'agit d'une réparation de transcription, non d'un ajout de contenu**.

## 🔴 Concept 1 — Les deux voies de sauvetage après Arrow

### 1.1 Le constat

> *« **Le théorème d'Arrow est vraiment dérangeant.** Un regard très attentif sur chacune de ses exigences devrait vous impressionner par **leur caractère raisonnable individuel et leur économie collective**. **Seuls les très audacieux peuvent être sereins à l'idée d'abandonner ou de relâcher l'une d'elles. Pourtant, la portée du théorème est que c'est précisément ce que nous devons être prêts à faire.** »*

> *« Il y a eu **diverses tentatives pour sauver l'analyse du bien-être social de l'emprise du théorème d'Arrow**. »*

### 1.2 La première voie — affaiblir les exigences sur $R$

> *« **L'une a été de relâcher les exigences qui doivent être satisfaites par la relation sociale $R$.** »*

| Ce qu'on relâche | Par quoi | Le résultat |
|---|---|---|
| La **transitivité** de $R$ | *« une restriction plus faible appelée « **ACYCLICITÉ** » »* | — |
| L'exigence que $R$ **ordonne tout** du meilleur au pire | *« la restriction plus simple que nous soyons **simplement capables de trouver une meilleure alternative parmi tout sous-ensemble** »* | *« ouvre la voie à **plusieurs mécanismes de choix possibles**, chacun respectant le reste des conditions d'Arrow »* |
| La condition **U** | l'hypothèse que les préférences individuelles sont **« à PIC UNIQUE »** *(single-peaked)*, la transitivité étant **conservée** | **Black (1948)** : *« le **vote majoritaire** satisfait le reste des conditions d'Arrow, **pourvu que le nombre d'individus soit IMPAIR** ! »* |

⚠️ **Le point d'exclamation est du livre.** La condition d'imparité n'est pas un détail : avec un nombre pair d'électeurs, les égalités réapparaissent.

### 1.3 La seconde voie — changer l'information

> *« **Une autre approche a procédé selon des lignes différentes et a produit des résultats intéressants. Plutôt que de discuter avec les CONDITIONS d'Arrow, l'attention se porte plutôt sur l'INFORMATION supposée transmise par les préférences des individus.** »*

**Ce qu'Arrow utilise, et ce qu'il n'utilise pas :**

> *« Dans le cadre d'Arrow, **seules les relations de préférence $R^i$ sont utilisées comme données**. Ainsi, si une société veut implémenter $f$, **elle obtiendrait de chaque individu son classement des états du meilleur au pire. À partir de CES SEULES données, $f$ fournirait un classement**. »*

> *« Évidemment, **ce processus ne produit AUCUNE information sur** : »*

| Ce qui manque | Formulation du livre |
|---|---|
| L'**intensité comparée** | *« la **force** de la préférence d'un individu particulier pour $x$ **en comparaison** de la préférence d'un autre individu pour $y$ »* |
| L'**ampleur comparée** | *« **combien plus** un individu favorise $x$ sur $y$ **en comparaison de combien plus** un autre individu favorise $y$ sur $x$ »* |

> *« **Par conception, l'approche d'Arrow ne considère pas une telle information.** »*

### 🔴 1.4 L'avertissement du livre avant d'aller plus loin

> *« **Avant de simplement aller de l'avant, un AVERTISSEMENT s'impose. L'idée que l'« intensité de préférence » puisse être comparée de manière cohérente à travers les individus est, au mieux, CONTROVERSÉE.** Néanmoins, l'approche alternative que nous sommes sur le point d'explorer **prend comme point de départ — comme HYPOTHÈSE — que de telles comparaisons peuvent être faites de manière significative**. **Nous ne tenterons pas de justifier cette hypothèse. Voyons simplement ce qu'elle peut faire pour nous.** »*

> *« Les références de base pour cette ligne de travail incluent **Hammond (1976)**, **d'Aspremont et Gevers (1977)**, **Roberts (1980)**, et **Sen (1984)**. Ici, nous ne considérerons **que quelques-uns de leurs résultats** pour essayer d'en saisir la **saveur**. »*

## 🔴 Concept 2 — De l'information à l'invariance : la définition 6.2

### 2.1 L'exemple à deux personnes qui motive tout

**La situation symétrique.** L'individu 1 préfère $x$ à $y$ ; l'individu 2 préfère $y$ à $x$.

> *« Dans une situation aussi **symétrique**, **plus d'information pourrait être utile** afin de faire un choix social. »*

**Supposons que la société veuille rendre son membre le plus mal loti aussi bien loti que possible.**

> *« Il serait alors utile de savoir si **le bien-être de 1 dans l'état qu'il préfère le MOINS, à savoir $y$, est supérieur au bien-être de 2 dans l'état qu'il préfère le moins, à savoir $x$**. »*

**Premier cas.** *« Supposons — **et voici l'hypothèse importante** — que les nombres d'utilité individuels fournissent cette information. »*

$$u^1(y)>u^2(x) \quad\Longrightarrow\quad \text{« 1 est mieux loti en } y \text{ que 2 ne l'est en } x \text{ »} \quad\Longrightarrow\quad y\ P\ x$$

**Second cas.** Avec d'autres fonctions $v^1,v^2$ **représentant les mêmes préférences**, mais telles que $v^1(y)<v^2(x)$ :

$$\text{« le plus mal loti est mieux loti en } x \text{ »} \quad\Longrightarrow\quad x\ P\ y$$

> *« **même si les classements individuels sur $x$ et $y$ n'ont PAS changé** »*

### 🔴 2.2 La leçon de l'exemple

> *« **Le point de cet exemple est de démontrer que si les utilités portent PLUS de sens que le simple classement des états, alors la fonction de bien-être social n'a PAS besoin d'être invariante aux transformations strictement croissantes.** »*

**La raison, exactement :**

> *« **Alors que les transformations strictement croissantes préservent les comparaisons d'utilité entre états pour chaque individu SÉPARÉMENT, elles n'ont pas besoin de préserver les classements d'utilité entre états À TRAVERS les individus.** »*

**Et la conséquence technique :**

> *« Pour garantir que $\psi^i(u^i(x))\geq\psi^j(u^j(y))$ chaque fois que $u^i(x)\geq u^j(y)$, **les transformations $\psi^i$ et $\psi^j$ doivent être strictement croissantes ET IDENTIQUES**, i.e. $\psi^i=\psi^j$. »*

$$\boxed{\;\text{Moins d'invariance exigée} \ \Longrightarrow\ \text{PLUS de possibilités pour } f\;}$$

### 2.3 Le second type d'information : les différences

> *« Un **second type d'information** qui pourrait être utile est **une MESURE DE COMBIEN l'individu $i$ gagne quand l'état social passe de $x$ à $y$, EN COMPARAISON DE COMBIEN l'individu $j$ perd**. »*

**La convention :**

| L'objet | Sa lecture |
|---|---|
| $u^i(y)-u^i(x)$ | le **gain** de $i$ dans le passage de $x$ à $y$ |
| $u^i(y)-u^i(x)\geq u^j(x)-u^j(y)$ | *« **le gain de $i$ est au moins aussi grand que la perte de $j$** »* |

> *« **Il n'est pas difficile de voir** que pour préserver les comparaisons de DIFFÉRENCES d'utilité à travers les individus, **la transformation de chaque individu doit être de la forme $\psi^i(u^i)=a_i+b\,u^i$, où $b>0$ est COMMUN à tous les individus**. »*

⚠️ **Notez l'asymétrie** : les **constantes additives $a_i$ peuvent différer**, la **pente $b$ ne le peut pas**.

### 2.4 La définition 6.2

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 6.2 — Mesurabilité, comparabilité et invariance</span>

**1.** Une fonction de bien-être social $f$ est **invariante en NIVEAU d'utilité** *(utility-level invariant)* si elle est **invariante à des transformations $\psi$ strictement croissantes ARBITRAIRES, mais COMMUNES**, appliquées à la fonction d'utilité de chaque individu. Dès lors, **$f$ est autorisée à ne dépendre que de l'ORDRE DES UTILITÉS, à la fois pour et à travers les individus**.

**2.** Une fonction de bien-être social $f$ est **invariante en DIFFÉRENCE d'utilité** *(utility-difference invariant)* si elle est invariante aux transformations strictement croissantes de la forme $\psi^i(u^i)=a_i+b\,u^i$, où **$b>0$ est commun** à chaque individu. Dès lors, **$f$ est autorisée à ne dépendre que de l'ORDRE DES DIFFÉRENCES d'utilité, à la fois pour et à travers les individus**.

</div>

**Le tableau de correspondance — à connaître par cœur :**

| L'information autorisée | La classe de transformations | Le nom |
|---|---|---|
| L'**ordre des utilités** | $\psi$ strictement croissante, **commune** | **Invariance en niveau** |
| L'**ordre des différences** | $\psi^i(u)=a_i+b\,u$, **$b>0$ commun** | **Invariance en différence** |
| L'**ordre des pourcentages** *(§6.3.3)* | $\psi(u)=b\,u$, **$b>0$ commun** | **Invariance en pourcentage** |

> *« **D'autres formes de mesurabilité et de comparabilité interpersonnelle peuvent être imaginées et combinées de diverses manières**, mais nous nous en tenons simplement aux deux considérées ci-dessus. »*

### 2.5 Le cadre pour tout le reste du §6.3

> *« Dans tout le reste de cette section nous supposerons que **$X$ est un sous-ensemble convexe non réduit à un point** de l'espace euclidien et que **toutes les fonctions de choix social $f$ considérées satisfont le WELFARISME STRICT** (i.e. **U, WP, IIA et PI**), où **U** signifie que $f$ envoie des fonctions d'utilité individuelles continues sur une fonction d'utilité sociale continue. »*

**Par conséquent** *(voir (6.2) et l'exercice 6.4, fiche 513)*, $f$ se **résume** par une fonction $W:\mathbb{R}^N\to\mathbb{R}$ **strictement croissante et continue** avec

$$f_u(x)\geq f_u(y) \iff W\big(u^1(x),\dots,u^N(x)\big)\geq W\big(u^1(y),\dots,u^N(y)\big)$$

### 🔴 2.6 La distinction que le livre insiste pour faire

> *« **Le degré auquel l'utilité est supposée mesurable et interpersonnellement comparable peut être vu au mieux comme une question de COMBIEN D'INFORMATION la société utilise en prenant ses décisions sociales. Ceci est tout à fait DISTINCT du type de restrictions ÉTHIQUES qu'une société pourrait souhaiter voir respecter par ces décisions.** »*

> *« Il y a, bien sûr, **un certain contenu éthique** aux conditions U, WP, IIA et PI incorporées dans le welfarisme strict. Cependant, **une société peut être disposée à aller plus loin et à intégrer encore PLUS de valeurs éthiques dans sa fonction de bien-être social**. **Chacune revient à imposer une exigence SUPPLÉMENTAIRE sur la fonction $W$.** Ici, nous n'en considérons que deux. »*

$$\boxed{\;\text{INFORMATION} \ \neq\ \text{ÉTHIQUE} \qquad\text{ce sont DEUX leviers indépendants}\;}$$

## 🔴 Concept 3 — Les deux axiomes éthiques supplémentaires (définition 6.3)

### 3.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 6.3 — Deux hypothèses éthiques de plus sur la fonction de bien-être social</span>

**A. Anonymat.** Soit $\bar u$ un $N$-vecteur d'utilité, et soit $\tilde u$ un autre vecteur obtenu de $\bar u$ **après une permutation de ses éléments**. Alors $W(\bar u)=W(\tilde u)$.

**HE. Équité de Hammond.** Soient $\bar u$ et $\tilde u$ deux $N$-vecteurs d'utilité **distincts** et supposons que $\bar u_k=\tilde u_k$ **pour tout $k$ sauf $i$ et $j$**. Si

$$\bar u_i<\tilde u_i<\tilde u_j<\bar u_j$$

alors $W(\tilde u)\geq W(\bar u)$.

</div>

### 3.2 Le commentaire du livre sur A

> *« La condition **A** dit simplement que **les gens devraient être traités SYMÉTRIQUEMENT**. Sous A, **le classement des états sociaux ne devrait pas dépendre de l'IDENTITÉ des individus impliqués, seulement des NIVEAUX de bien-être impliqués**. »*

### 🔴 3.3 Le commentaire du livre sur HE — avec sa question piège

> *« La condition **HE** est **légèrement plus controversée**. Elle exprime l'idée que **la société a une préférence pour la DIMINUTION DE LA DISPERSION des utilités à travers les individus**. »*

**La lecture de l'inégalité $\bar u_i<\tilde u_i<\tilde u_j<\bar u_j$ :** le vecteur $\tilde u$ est **« resserré à l'intérieur »** de $\bar u$ sur les coordonnées $i$ et $j$ — le plus mal loti est **relevé**, le mieux loti est **abaissé**, et l'ordre est **conservé**. HE dit que la société **ne perd pas** à ce resserrement.

> *« **(Notez qu'il y a MOINS de dispersion des utilités sous $\bar u$ que sous $\tilde u$.** Néanmoins, **pouvez-vous penser à une raison pour laquelle on pourrait objecter à classer $\bar u$ au-dessus de $\tilde u$ ?)** »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — sur cette parenthèse.</span>

Telle qu'imprimée, elle paraît inverser le sens de l'inégalité de la définition : c'est bien **$\tilde u$** qui est le vecteur **resserré** — celui dont les deux coordonnées mobiles sont **entre** celles de $\bar u$ — et HE conclut $W(\tilde u)\geq W(\bar u)$, donc en faveur du **moins dispersé**. Reportez-vous à l'inégalité $\bar u_i<\tilde u_i<\tilde u_j<\bar u_j$ de la définition 6.3 plutôt qu'à la formulation en prose. **Ce qui reste, et c'est l'essentiel, est la question posée** : pourquoi objecterait-on à ce que la réduction de dispersion soit toujours socialement bonne ? **Parce que HE l'exige même quand le transfert est extrêmement coûteux** — relever le plus mal loti d'un iota peut exiger d'abaisser le mieux loti énormément, et HE l'approuve quand même.

</div>

> *« Dans ce qui suit, nous utilisons ces conditions pour **illustrer comment certaines fonctions de bien-être social bien connues peuvent être caractérisées AXIOMATIQUEMENT**. »*

## 🔴 Concept 4 — §6.3.1 : la forme rawlsienne (théorème 6.2)

### 4.1 Le principe

> *« Dans le système éthique proposé par **Rawls (1971)**, **le bien-être du membre le plus mal loti de la société guide la prise de décision sociale**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 6.2 — Fonctions de bien-être social rawlsiennes</span>

Une fonction de bien-être social $W$ **strictement croissante et continue** satisfait **HE** **si et seulement si** elle peut prendre la **forme rawlsienne**

$$W=\min[u_1,\dots,u_N]$$

De plus, $W$ satisfait alors **A** et est **invariante en niveau d'utilité**.

</div>

> *« La preuve que nous fournissons est **diagrammatique** et donc à nouveau **nous nous restreignons au cas $N=2$**. »* *(Note de bas de page : « Pour $N>2$, voir l'**exercice 6.8** et aussi **Hammond (1976)**. »)*

### 4.2 La preuve — le sens difficile

<details class="details--riche">
<summary>

**Étape 1 — le rayon horizontal issu de $a$**

</summary>

**Ce qu'il faut montrer** : $W(\bar u)\geq W(\tilde u)$ **si et seulement si** $\min[\bar u_1,\dots]\geq\min[\tilde u_1,\dots]$.

> **La figure 6.6.** La bissectrice à $45°$ ; un point $a$ dessus ; le **rayon infini** partant de $a$ **vers la droite** ; un point $\bar u$ sur ce rayon ; un point $\tilde u$ dans la région **I**, et la région **II** en dessous.

> *« Pour commencer, **choisissez un point arbitraire $a$ sur la droite à $45°$** et considérez **le rayon infini s'étendant de $a$ vers la droite**. Nous allons d'abord soutenir que **chaque point de ce rayon est socialement INDIFFÉRENT à $a$ selon $W$**. »*

Soit $\bar u=(\bar u_1,\bar u_2)$ **un point quelconque du rayon**. On veut $W(\bar u)=W(a)$.

| Région | Définition, mot pour mot |
|---|---|
| **I** | *« la région **à gauche de $\bar u$**, **en dessous de la droite à $45°$** et **AU-DESSUS du rayon** »* |
| **II** | *« la région à gauche de $\bar u$, en dessous de la droite à $45°$ et **EN DESSOUS du rayon** »* |

⚠️ *« Ainsi **le rayon n'est dans AUCUNE des deux régions**. »*

</details>

<details class="details--riche">
<summary>

**Étape 2 — HE règle la région I**

</summary>

Soit $\tilde u=(\tilde u_1,\tilde u_2)$ arbitraire dans **I**.

> *« On peut facilement voir que **pour être dans I, $\tilde u$ doit satisfaire les inégalités** »*

$$\bar u_2<\tilde u_2<\tilde u_1<\bar u_1$$

> *« **(Réfléchissez-y.)** »*

<details class="details--riche">
<summary>

*La vérification, coordonnée par coordonnée*

</summary>

| La condition géométrique | L'inégalité |
|---|---|
| **En dessous de la $45°$** | $\tilde u_2<\tilde u_1$ |
| **Au-dessus du rayon** *(qui est à hauteur $\bar u_2$)* | $\tilde u_2>\bar u_2$ |
| **À gauche de $\bar u$** | $\tilde u_1<\bar u_1$ |

Ensemble : $\bar u_2<\tilde u_2<\tilde u_1<\bar u_1$

</details>

⚠️ **C'est exactement la configuration de HE** avec $i=2$ et $j=1$ : $\bar u_2<\tilde u_2<\tilde u_1<\bar u_1$.

> *« Mais alors **HE implique que $W(\tilde u)\geq W(\bar u)$**. Puisque $\tilde u$ était un point arbitraire de I, **l'utilité sociale de chaque point de I est au moins $W(\bar u)$**, ce que nous écrivons $W(\text{I})\geq W(\bar u)$. »*

> *(Note de bas de page 8.)* *« En fait, $W(\text{I})>W(\bar u)$ **parce que $N=2$ et $W$ est strictement croissante**, mais **nous n'aurons pas besoin de l'inégalité stricte**. »*

</details>

<details class="details--riche">
<summary>

**Étape 3 — la stricte croissance règle la région II, puis la continuité conclut**

</summary>

> *« Quant à la région II, **nous devons avoir $W(\text{II})<W(\bar u)$ parce que chaque point de la région II est au SUD-OUEST de $\bar u$ et $W$ est strictement croissante**. »*

$$W(\text{I})\geq W(\bar u)>W(\text{II}) \tag{P.1}$$

**Le pas de continuité :**

> *« Remarquez maintenant que **pour chaque point de la droite joignant $a$ et $\bar u$ il y a des points ARBITRAIREMENT PROCHES dans la région I** dont nous avons montré qu'ils reçoivent une utilité sociale **au moins** $W(\bar u)$, **et des points arbitrairement proches dans la région II** dont nous avons montré qu'ils reçoivent une utilité sociale **inférieure** à $W(\bar u)$. »*

> *« Dès lors, **par la CONTINUITÉ de $W$, chaque point de la droite joignant $a$ et $\bar u$ doit recevoir une utilité sociale ÉGALE à $W(\bar u)$**. En particulier, **$W(a)=W(\bar u)$**, comme nous souhaitions le montrer. »*

⚠️ **L'argument est un « pincement »** : le segment est encadré par des points de valeur $\geq W(\bar u)$ d'un côté et $<W(\bar u)$ de l'autre.

> *« Parce que $\bar u$ était un point arbitraire du rayon infini, **nous concluons que chaque point de ce rayon est socialement indifférent à $a$**. »*

</details>

<details class="details--riche">
<summary>

**Étape 4 — le rayon vertical, puis la conclusion**

</summary>

> *« **Un argument analogue** à celui qui vient d'être donné montre aussi que **chaque point du rayon infini partant de $a$ et s'étendant VERS LE HAUT est aussi socialement indifférent à $a$**. »* *(C'est l'**exercice 6.7**.)*

> *« **Parce que $W$ est strictement croissante, AUCUN autre point ne peut être indifférent à $a$**, et donc **l'UNION DE CES DEUX RAYONS est la courbe d'indifférence sociale passant par $a$**. »*

> **La figure 6.7.** La carte d'indifférence sociale : une famille de **coudes en L** dont les sommets sont sur la $45°$, chaque coude étant l'union d'un rayon horizontal vers la droite et d'un rayon vertical vers le haut, *« les courbes plus éloignées de l'origine recevant une utilité sociale plus élevée parce que $W$ est strictement croissante »*.

> *« Ainsi **$W$ a la MÊME carte d'indifférence que la fonction $\min[u_1,u_2]$**, comme désiré. »*

</details>

<details class="details--riche">
<summary>

**Étape 5 — le sens facile, et les deux propriétés supplémentaires**

</summary>

> *« Enfin, nous notons que **si $W=\min[u_1,\dots,u_N]$ alors A et HE sont facilement montrées être satisfaites**. »*

**L'invariance en niveau, en une ligne :**

> *« De plus, si $\psi:\mathbb{R}\to\mathbb{R}$ est strictement croissante, alors »*

$$W\big(\psi(u_1),\dots,\psi(u_N)\big)=\psi\big(W(u_1,\dots,u_N)\big)$$

> *« et par conséquent $W(\psi(u_1),\dots)\geq W(\psi(\tilde u_1),\dots)$ **si et seulement si** $W(u_1,\dots)\geq W(\tilde u_1,\dots)$. **Dès lors, $W$ est invariante en niveau d'utilité.** »* $\blacksquare$

⚠️ **La clé est l'identité $\min(\psi(u_1),\dots,\psi(u_N))=\psi(\min(u_1,\dots,u_N))$** — le minimum **commute** avec toute transformation croissante. C'est **précisément** pourquoi le maximin n'a besoin que de l'**ordre des niveaux**.

</details>

### 4.3 Le résumé du théorème 6.2

$$\boxed{\;W \text{ strictement croissante et continue satisfait HE} \iff W=\min[u_1,\dots,u_N]\;}$$

| Ce qui vient **en prime** | Pourquoi |
|---|---|
| **A** (anonymat) | Le $\min$ ne regarde pas **qui** est le plus mal loti |
| **Invariance en NIVEAU** | Le $\min$ **commute** avec $\psi$ croissante |

## 🔴 Concept 5 — §6.3.2 : la forme utilitariste (théorème 6.3)

### 5.1 Le principe et l'intuition informationnelle

> *« **La forme utilitariste est de loin la fonction de bien-être social la plus commune et la plus largement appliquée en économie.** Sous une règle utilitariste, **les états sociaux sont classés selon la SOMME LINÉAIRE des utilités**. »*

**L'argument informationnel, exactement :**

> *« En classant deux états sociaux, c'est donc **la somme linéaire des DIFFÉRENCES d'utilité individuelles entre les états qui est le facteur déterminant**. Par conséquent, **des énoncés de la forme « dans le passage de $x$ à $y$, l'individu 1 gagne PLUS que l'individu 2 » doivent être SIGNIFIANTS**. Ainsi, **les différences d'utilité doivent être comparables à la fois pour et à travers les individus**, et donc nous nous attendons à ce que la fonction utilitariste soit liée à la propriété d'**invariance en différence d'utilité**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 6.3 — Fonctions de bien-être social utilitaristes</span>

Une fonction de bien-être social **strictement croissante et continue** $W$ satisfait **A** et l'**invariance en différence d'utilité** **si et seulement si** elle peut prendre la **forme utilitariste**

$$W=\sum_{i=1}^{N}u_i$$

</div>

### 5.2 La preuve — la construction des deux transformations

<details class="details--riche">
<summary>

**Le montage : $\Omega$, $\tilde u$ et son transposé $\tilde u^T$**

</summary>

> *« **Il est clair que si $W=\sum_i u_i$, les conditions du théorème sont satisfaites. Il reste à montrer la réciproque.** »*

> **La figure 6.8.** La bissectrice à $45°$ ; un point $\bar u$ dessus ; la droite $\Omega$ de **pente $-1$** passant par $\bar u$ ; deux points $\tilde u$ et $\tilde u^T$ sur $\Omega$, **symétriques par rapport à la $45°$**.

**Le montage :**

1. **Choisir $\bar u=(\bar u_1,\bar u_2)$ sur la droite à $45°$**, donc $\bar u_1=\bar u_2$.
2. **Définir la constante** $\gamma\equiv\bar u_1+\bar u_2$ et l'ensemble

$$\Omega\equiv\{(u_1,u_2)\ |\ u_1+u_2=\gamma\}$$

> *« Ce sont **tous les points situés sur une droite passant par $\bar u$ de pente $-1$**. »*

3. **Choisir $\tilde u\in\Omega$, distinct de $\bar u$.**
4. **Le transposé** $\tilde u^T=(\tilde u_2,\tilde u_1)$ — *« obtenu en permutant les éléments de $\tilde u$ »* — **doit aussi être dans $\Omega$**.

> *« **Par la condition A, $\tilde u$ et $\tilde u^T$ doivent être classés de la MÊME manière relativement à $\bar u$.** »*

</details>

<details class="details--riche">
<summary>

**Les deux transformations et l'échange qu'elles réalisent — le cœur de la preuve**

</summary>

**Supposons $W(\bar u)>W(\tilde u)$.**

> *« Sous la dépendance en différence d'utilité, **ce classement doit être invariant aux transformations de la forme $a_i+b\,u_i$**. »*

**Poser**

$$\psi^i(u_i)\equiv(\bar u_i-\tilde u_i)+u_i, \qquad i=1,2$$

> *« **Notez soigneusement que toutes deux sont dans la forme admissible.** »*

⚠️ **Pourquoi elles sont admissibles** : ce sont $\psi^i(u)=a_i+b\,u$ avec $a_i=\bar u_i-\tilde u_i$ *(qui peut différer selon $i$)* et $b=1$ *(qui est bien **commun**)*.

**L'observation arithmétique :**

> *« **En notant que $2\bar u_i=\tilde u_1+\tilde u_2$** parce que **$\bar u$ est sur la droite à $45°$** et que **$\bar u$ et $\tilde u$ sont tous deux dans $\Omega$** »*

*(en effet $2\bar u_i=\bar u_1+\bar u_2=\gamma=\tilde u_1+\tilde u_2$)*

**L'effet des transformations :**

| Point de départ | Calcul | Image |
|---|---|---|
| $\tilde u$ | $\psi^1(\tilde u_1)=(\bar u_1-\tilde u_1)+\tilde u_1=\bar u_1$ ; de même $\psi^2(\tilde u_2)=\bar u_2$ | $\boxed{\bar u}$ |
| $\bar u$ | $\psi^1(\bar u_1)=2\bar u_1-\tilde u_1=(\tilde u_1+\tilde u_2)-\tilde u_1=\tilde u_2$ ; de même $\psi^2(\bar u_2)=\tilde u_1$ | $\boxed{\tilde u^T}$ |

> *« Donc, **ces transformations envoient $\tilde u$ sur $\bar u$ et envoient $\bar u$ sur $\tilde u^T$**. »*

**La contradiction :**

> *« Ainsi, si $W(\bar u)>W(\tilde u)$, comme nous l'avons supposé, alors **par l'exigence d'invariance, nous devons de même avoir $W(\tilde u^T)>W(\bar u)$**. Mais **ensemble ceux-ci impliquent $W(\tilde u^T)>W(\tilde u)$, VIOLANT A**, donc $W(\bar u)>W(\tilde u)$ **ne peut pas tenir**. »*

> *« Si, à la place, nous supposons $W(\tilde u)>W(\bar u)$, alors **par un argument similaire, nous obtenons une contradiction similaire**. »*

</details>

<details class="details--riche">
<summary>

**La conclusion : $\Omega$ est une courbe d'indifférence**

</summary>

> *« Nous concluons donc que **$W(\bar u)=W(\tilde u)$. La condition A nous dit alors que $W(\tilde u^T)=W(\bar u)=W(\tilde u)$.** Or rappelez-vous que **$\tilde u$ a été choisi arbitrairement dans $\Omega$**, donc le même argument peut être fait pour **tout** point de cet ensemble, et donc nous avons **$W(\Omega)=W(\bar u)$**. »*

> *« Parce que **$W$ est strictement croissante**, **chaque point au NORD-EST de $\Omega$ doit être strictement préféré à chaque point de $\Omega$**, et **chaque point au sud-ouest doit être strictement pire**. Ainsi, **$\Omega$ est bien une courbe d'indifférence sociale**, et **la carte d'indifférence sociale est un ensemble de DROITES PARALLÈLES, chacune de pente $-1$**, avec la préférence sociale croissant **vers le nord-est**. »*

> *« Ceci, bien sûr, implique que **la fonction de bien-être social peut être choisie de la forme $W=u_1+u_2$**, ce qui achève la preuve. »* $\blacksquare$

</details>

### 5.3 L'utilitarisme généralisé

> *« **Si nous abandonnons l'exigence d'ANONYMAT, toute la gamme des ordres UTILITARISTES GÉNÉRALISÉS est permise.** Ceux-ci sont représentés par des fonctions de bien-être social linéaires de la forme »*

$$W=\sum_{i}a_iu_i, \qquad a_i\geq0\ \ \forall i, \qquad a_j>0 \text{ pour un certain } j$$

> *« Sous les critères utilitaristes généralisés, **la SOMME de bien-être est à nouveau la question importante, mais le bien-être de différents individus peut recevoir un « POIDS » différent dans l'évaluation sociale**. »*

### 5.4 Le tableau de comparaison des théorèmes 6.2 et 6.3

|  | **Théorème 6.2 (Rawls)** | **Théorème 6.3 (utilitariste)** |
|---|---|---|
| **L'axiome caractérisant** | **HE** | **A** + **invariance en différence** |
| **La forme** | $\min[u_1,\dots,u_N]$ | $\sum_i u_i$ |
| **La carte d'indifférence** | Des **coudes en L** sur la $45°$ | Des **droites parallèles** de pente $-1$ |
| **L'invariance obtenue** | En **NIVEAU** *(donnée en prime)* | En **DIFFÉRENCE** *(supposée)* |
| **A ?** | **Oui**, en prime | **Oui**, supposée |
| **L'information exigée** | La **moins** exigeante — l'ordre des niveaux | **Plus** exigeante — l'ordre des différences |
| **La relation à l'égalité** | Biais **absolu** en faveur de l'égalité | **Indifférence complète** à la répartition |
| **Ce qu'on abandonne** | — | Sans **A** : l'utilitarisme **généralisé** $\sum_i a_iu_i$ |

## 🔴 Concept 6 — §6.3.3 : les formes flexibles et la famille CES

### 6.1 Le principe général

> *« **Dans une certaine mesure, PLUS grandes sont la mesurabilité et la comparabilité de l'utilité, PLUS grande est la gamme de fonctions de bien-être social permises.** »*

### 6.2 L'invariance en pourcentage

**L'information que l'on ajoute** : *« l'ordre des CHANGEMENTS EN POURCENTAGE d'utilité à la fois pour et à travers les individus »*, c'est-à-dire des énoncés du type

> *« dans le passage de $x$ à $y$, **l'AUGMENTATION EN POURCENTAGE de l'utilité de $i$ est plus grande que la PERTE EN POURCENTAGE de $j$** »*

$$\frac{u^i(x)-u^i(y)}{u^i(x)} \quad\text{comparé à}\quad \frac{u^j(x)-u^j(y)}{u^j(x)}$$

**La classe de transformations qui préserve cela :**

> *« Alors **la fonction de bien-être social n'a pas besoin d'être invariante aux transformations strictement croissantes SAUF si elles sont IDENTIQUES et LINÉAIRES** (i.e. $\psi(u^i)=b\,u^i$, où $b>0$ est commun à tous les individus), **parce que seules celles-ci sont garanties de maintenir l'ordre des changements en pourcentage** à la fois pour et à travers les individus. »*

⚠️ **On dit alors que $f$ est INVARIANTE EN POURCENTAGE.**

> *« Par conséquent, **les fonctions rawlsienne ET utilitariste sont toutes deux permises ici**. En effet, **toute une CLASSE de fonctions de bien-être social est désormais admise comme possibilité. »*

### 6.3 Le théorème géométrique : les courbes radialement parallèles

> *« Quand une fonction de bien-être social continue satisfait le **welfarisme strict** et est **invariante aux transformations linéaires positives identiques** des utilités, **les courbes d'indifférence sociale doivent être NÉGATIVEMENT PENTUES et RADIALEMENT PARALLÈLES**. »*

<details class="details--riche">
<summary>

**La démonstration géométrique (figure 6.9)**

</summary>

> **La figure 6.9.** Deux rayons $OA$ et $OB$ issus de l'origine. Sur $OA$ : les points $\bar u$ et $b\bar u$. Sur $OB$ : les points $\tilde u$ et $b\tilde u$. Deux cordes : $CC'$ joignant $\bar u$ à $\tilde u$, et $DD'$ joignant $b\bar u$ à $b\tilde u$.

**Pas 1 — la pente est négative.**

> *« Clairement, la courbe d'indifférence passant par $\bar u$ **doit être négativement pentue** parce que, **par le welfarisme strict, $W$ est strictement croissante**. »*

**Pas 2 — le point homothétique.**

> *« Choisissez maintenant **n'importe quel autre point du rayon $OA$** passant par $\bar u$. **Ce point doit être de la forme $b\bar u$ pour une certaine constante $b>0$.** »*

**Pas 3 — l'invariance transporte l'indifférence.**

> *« Choisissez maintenant **n'importe quel autre point $\tilde u$ tel que $W(\bar u)=W(\tilde u)$**. **Par l'exigence d'invariance, nous devons AUSSI avoir $W(b\bar u)=W(b\tilde u)$**, où $\tilde u$ et $b\tilde u$ sont sur le rayon $OB$. »*

**Pas 4 — les triangles semblables.**

> *« Nous voulons montrer que **la pente de la tangente à la courbe d'indifférence en $\bar u$ est égale à la pente de la tangente en $b\bar u$**. D'abord, notez que **la pente de la corde $CC'$ APPROXIME la pente de la tangente en $\bar u$**, et **la pente de la corde $DD'$ approxime la pente de la tangente en $b\bar u$**. »*

> *« **Parce que les triangles $OCC'$ et $ODD'$ sont SEMBLABLES, la pente de $CC'$ est égale à la pente de $DD'$.** »*

**Pas 5 — le passage à la limite.**

> *« Imaginez maintenant choisir notre point $\tilde u$ **de plus en plus proche de $\bar u$** le long de la courbe d'indifférence. **À mesure que $\tilde u$ approche $\bar u$, corrélativement $b\tilde u$ approche $b\bar u$** le long de la courbe d'indifférence passant par $b\bar u$, **et les cordes $CC'$ et $DD'$ restent égales en pente**. »*

> *« **À la limite**, la pente de $CC'$ converge vers la pente de la tangente en $\bar u$, et la pente de $DD'$ converge vers celle en $b\bar u$. Ainsi, **les deux pentes sont égales**. »*

**Pas 6 — la généralisation.**

> *« Parce que **$\bar u$ et $b>0$ ont été choisis arbitrairement**, **la pente de chaque courbe d'indifférence sociale doit être la MÊME en chaque point d'un rayon donné** — bien que, bien sûr, **les pentes puissent DIFFÉRER d'un rayon à l'autre**. »*

</details>

### 🔴 6.4 L'équivalence décisive

> *« **Les courbes de niveau d'une fonction seront radialement parallèles de cette manière SI ET SEULEMENT SI la fonction est HOMOTHÉTIQUE.** »*

$$\boxed{\;\text{welfarisme strict} + \text{invariance en POURCENTAGE} \iff W \text{ continue, strictement croissante, HOMOTHÉTIQUE}\;}$$

### 6.5 Les raffinements successifs

| Ce qu'on ajoute | Ce qu'on obtient | La lecture éthique donnée par le livre |
|---|---|---|
| **A** (anonymat) | *« la fonction doit être **SYMÉTRIQUE**, et donc ses courbes d'indifférence sociale doivent être des « **IMAGES MIROIR** » autour de la droite à $45°$ »* | Les identités ne comptent pas |
| **Quasiconcavité** | *« les ensembles « **socialement au moins aussi bon que** » sont **convexes** »* | *« l'implication éthique est que **l'inégalité dans la distribution du bien-être, EN SOI, n'est pas socialement valorisée** »* |
| **Stricte quasiconcavité** | — | *« il y a un **BIAIS STRICT en faveur de l'égalité**. **(Voyez-vous pourquoi ?)** »* |

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — la réponse à « voyez-vous pourquoi ? ».</span>

Sous stricte quasiconcavité, si $u$ et $u'$ sont socialement indifférents et distincts, alors **toute moyenne** $tu+(1-t)u'$ est **strictement préférée** aux deux. En prenant $u'=u^T$ *(le permuté de $u$)*, l'anonymat donne $W(u)=W(u^T)$, et la moyenne $\tfrac12(u+u^T)$ — qui est **le vecteur égalisé** sur les coordonnées permutées — est **strictement meilleure**. **Égaliser à somme constante améliore strictement le bien-être social.**

</div>

### 6.6 La famille CES

> *« **Parce que toute fonction homothétique devient une fonction linéairement homogène sous une transformation monotone positive**, par simplicité pensons en termes de **formes linéairement homogènes** seules. »*

**La condition finale ajoutée :**

> *« Enfin, supposons qu'**en plus de WP, A et de la convexité**, nous ajoutions l'exigence de **SÉPARABILITÉ FORTE** que **le taux marginal de substitution (SOCIALE) entre deux individus quelconques soit INDÉPENDANT du bien-être de tous les autres individus**. Alors **la fonction de bien-être social doit être un membre de la famille CES** : »*

$$\boxed{\;W=\left[\sum_{i=1}^{N}(u_i)^\rho\right]^{1/\rho}\;} \tag{6.13}$$

> *« où $\rho\neq0$, $\rho<1$, et $\sigma=\dfrac{1}{1-\rho}$ est **l'élasticité (constante et égale) de SUBSTITUTION SOCIALE entre deux individus quelconques**. »*

### 🔴 6.7 Les deux cas limites — le résultat le plus utile du §6.3

> *« **Ceci est une fonction de bien-être social très FLEXIBLE. Différentes valeurs de $\rho$ donnent différents degrés de « COURBURE » aux courbes d'indifférence sociale, et intègrent donc différents degrés auxquels l'ÉGALITÉ est valorisée dans la distribution du bien-être.** »*

| Limite | $\sigma$ | La forme obtenue | Le commentaire du livre |
|---|---|---|---|
| $\rho\to1$ | $\sigma\to\infty$ | **UTILITARISTE** | *« qui implique une **indifférence sociale complète** à la manière dont le bien-être est distribué »* |
| $\rho\to-\infty$ | $\sigma\to0$ | **RAWLSIENNE** | *« où le **biais social en faveur de l'égalité est ABSOLU** »* |

> **La figure 6.10 — trois panneaux.** **(a)** $\rho\to1$ : les courbes d'indifférence sont des **droites** de pente $-1$ — l'utilitarisme. **(b)** $-\infty<\rho<1$ : des courbes **strictement convexes**, symétriques autour de la $45°$. **(c)** $\rho\to-\infty$ : des **coudes en L** — Rawls.

$$\boxed{\;\text{RAWLS} \ \xleftarrow{\ \rho\to-\infty\ } \ \text{CES} \ \xrightarrow{\ \rho\to1\ } \ \text{UTILITARISME}\;}$$

⚠️ **C'est la formulation qui unifie tout le §6.3** — et c'est elle qui va servir au §6.4.

## 🔴 Concept 7 — §6.4 : les deux traditions de la justice

### 7.1 Ce que la section reconnaît d'entrée

> *« **Au-delà de la question technique de ce qui doit être supposé en matière de mesurabilité et de comparabilité pour appliquer sensément une fonction de bien-être social donnée, il y a la réalité fondamentale que le CHOIX entre de telles fonctions est effectivement un CHOIX ENTRE DES ENSEMBLES ALTERNATIFS DE VALEURS ÉTHIQUES.** »*

> *« **Sur ce point, alors, des affaires d'OPINION sont réellement impliquées. Elles appartiennent à juste titre à la toute PREMIÈRE ÉTAPE de toute analyse visant à évaluer la signification sociale des politiques ou institutions économiques**, quand le choix de la fonction de bien-être social est fait. »*

### 7.2 Les deux traditions

> *« **La littérature en économie et la littérature en philosophie — une seule et même chose à l'époque d'avant Adam Smith** — se sont à nouveau combinées plus récemment pour considérer conjointement **le caractère moral du choix qui doit être fait**. »*

| Tradition | Ses auteurs classiques | Son raffinement moderne |
|---|---|---|
| **UTILITARISTE** | **Hume, Smith, Bentham, Mill** | **Harsanyi** (1953, 1955, 1975) |
| **CONTRACTARIENNE** | **Locke, Rousseau, Kant** | **Rawls** (1971) |

### 🔴 7.3 Ce que les DEUX acceptent : la position originelle

> *« **Harsanyi et Rawls acceptent tous deux la notion qu'un critère « JUSTE » de bien-être social doit être un que choisirait une personne RATIONNELLE si elle était « ÉQUITABLE D'ESPRIT » (fair-minded).** »*

> *« Pour aider à garantir que le choix soit équitable d'esprit, **chacun imagine une « POSITION ORIGINELLE », derrière ce que Rawls appelle un « VOILE D'IGNORANCE », dans laquelle l'individu contemple ce choix SANS SAVOIR quelle sera réellement sa situation personnelle et ses circonstances dans la société**. »*

> *« Ainsi, **chacun imagine le choix à faire comme un CHOIX SOUS INCERTITUDE sur QUI l'on finira par devoir être dans la société qu'on prescrit**. »*

> *« **Ils diffèrent, cependant, sur ce qu'ils voient comme la RÈGLE DE DÉCISION appropriée pour guider le choix dans la position originelle.** »*

### 7.4 L'argument de Harsanyi

> *« **L'approche de Harsanyi est remarquablement directe.** »*

| Pas | Le contenu |
|---|---|
| **1** | *« Il accepte la description axiomatique de la rationalité sous incertitude de **von Neumann-Morgenstern**. Ainsi, les préférences peuvent être représentées par une fonction d'utilité **VNM** $u^i(x)$ sur les états sociaux, **unique à une transformation affine positive près**. »* |
| **2** | *« **Par le PRINCIPE DE RAISON INSUFFISANTE**, il suggère qu'une personne rationnelle dans la position originelle doit **assigner une probabilité ÉGALE à la perspective d'être dans les souliers de toute autre personne**. »* |
| **3** | *« S'il y a $N$ personnes, il y a donc une probabilité $1/N$ que $i$ finisse dans les circonstances de toute autre personne $j$. **La personne $i$ doit donc imaginer ces circonstances et imaginer ce que ses préférences $u^j(x)$ seraient.** »* |
| **4** | *« Parce qu'une personne pourrait finir avec l'une quelconque de $N$ « **identités** » possibles, une évaluation « rationnelle » de l'état $x$ serait faite selon son **ESPÉRANCE D'UTILITÉ** : »* |

$$\sum_{i=1}^{N}\frac{1}{N}\,u^i(x) \tag{6.14}$$

> *« Dans un choix social entre $x$ et $y$, celui avec l'espérance d'utilité la plus élevée doit être préféré. **Mais ceci est ÉQUIVALENT à dire que $x$ est socialement préféré à $y$ si et seulement si** »*

$$\sum_{i=1}^{N}u^i(x)>\sum_{i=1}^{N}u^i(y)$$

> *« **un critère purement UTILITARISTE**. »*

⚠️ **Le facteur $1/N$ est constant** — il ne change donc **aucun** classement, et disparaît.

### 7.5 Le rejet par Rawls

> *« **Rawls rejette la règle utilitariste de Harsanyi pour plusieurs raisons.** Parmi elles, **il objecte à l'assignation d'une quelconque probabilité à la perspective d'être un individu particulier PARCE QUE, dans la position originelle, il ne peut y avoir AUCUNE BASE EMPIRIQUE pour assigner de telles probabilités, égales ou non**. »*

> *« Ainsi, **la notion même de choix guidé par l'espérance d'utilité est REJETÉE par Rawls**. Au lieu de cela, **il voit le problème de choix dans la position originelle comme un problème sous IGNORANCE COMPLÈTE**. »*

> *« **En supposant que les gens sont AVERSES AU RISQUE**, il argue qu'**en ignorance totale, une personne rationnelle ordonnerait les états sociaux selon la manière dont elle les verrait si elle finissait comme le membre LE PLUS MAL LOTI de la société**. Ainsi, $x$ sera préféré à $y$ si »*

$$\min\big[u^1(x),\dots,u^N(x)\big]>\min\big[u^1(y),\dots,u^N(y)\big] \tag{6.15}$$

> *« **un critère purement MAXIMIN**. »*

### 🔴 7.6 La critique d'Arrow (1973) — le passage central du §6.4

> *« Ultimement, alors, **l'argument même de Rawls pour le maximin plutôt que l'utilitarisme repose sur l'idée que les gens sont averses au risque. Mais ceci ne peut pas être un argument entièrement convaincant, comme Arrow (1973) l'a souligné.** »*

**Les deux objections d'Arrow :**

| # | L'objection, mot pour mot |
|---|---|
| **1** | *« Pour une chose, **les fonctions d'utilité VNM dans la construction de Harsanyi peuvent être pensées comme incorporant N'IMPORTE QUEL degré d'aversion au risque**. Ainsi, **dans le cadre de Harsanyi, RIEN N'EMPÊCHE les individus d'être averses au risque dans la position originelle.** »* |
| **2** | *« De plus, **on n'a PAS BESOIN de rejeter la règle de l'espérance d'utilité comme base du choix pour arriver au critère de Rawls**. »* |

### 7.7 La construction qui démontre la seconde objection

<details class="details--riche">
<summary>

**De l'utilitarisme de Harsanyi au maximin de Rawls, en quatre pas**

</summary>

**Pas 1 — une reparamétrisation ordinale.**

> *« Prenez n'importe quelle fonction d'utilité $u^i(x)$ sur les états sociaux **avec certitude**. **Ces mêmes préférences peuvent, bien sûr, être représentées tout aussi bien par la transformation monotone positive** »*

$$v^i(x)\equiv-\,u^i(x)^{-a}, \qquad a>0$$

**Pas 2 — l'aversion au risque est réglée par $a$.**

> *« Supposons maintenant que **$v^i(x)$ est la fonction d'utilité VNM de $i$ sur les perspectives incertaines**. **Il est facile de vous convaincre que le degré d'aversion au risque affiché par $v(x)$ est CROISSANT dans le paramètre $a$.** »*

**Pas 3 — appliquer la recette de Harsanyi.**

> *« Supposons maintenant, **comme Harsanyi le fait** : **(1)** des probabilités égales d'avoir n'importe quelle identité, **(2)** un ordre des états sociaux selon leur **espérance d'utilité**, et donc **(3)** une fonction de bien-être social »*

$$W=\sum_{i=1}^{N}v^i(x)\equiv-\sum_{i=1}^{N}u^i(x)^{-a} \tag{6.16}$$

**Pas 4 — la transformation monotone qui révèle la CES.**

> *« Parce que **l'ordre des états donné par (6.16) n'a qu'une signification ORDINALE**, il sera **exactement le même** sous la transformation monotone positive de $W$ donnée par »*

$$W^*=(-W)^{-1/a}\equiv\left[\sum_{i=1}^{N}u^i(x)^{-a}\right]^{-1/a} \tag{6.17}$$

**La reconnaissance :**

> *« Pour $\rho\equiv-a<0$, **ceci est dans la forme** [de la fonction CES]. Nous avons déjà noté que **quand $\rho\to-\infty$ (i.e. $a\to\infty$), ceci approche le critère MAXIMIN comme cas limite**. »*

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — un mot sur les renvois d'équations.</span>

Le texte imprimé renvoie ici aux numéros « (6.11) » et « (6.13) », alors que la forme CES porte le numéro **(6.13)** et le maximin le numéro **(6.15)** aux pages précédentes. Fiez-vous au **contenu** : $W^*=\big[\sum_i u^i(x)^{-a}\big]^{-1/a}$ **est** la CES avec $\rho=-a$, et sa limite quand $a\to\infty$ **est** le maximin.

</div>

</details>

### 🔴 7.8 La conclusion — à savoir énoncer

> *« Ainsi, **le critère maximin de Rawls — LOIN d'être incompatible avec l'utilitarisme de Harsanyi — peut au contraire être vu comme un CAS TRÈS PARTICULIER de celui-ci, à savoir celui qui surgit quand les individus sont INFINIMENT AVERSES AU RISQUE**. »*

$$\boxed{\;\text{RAWLS} \ = \ \text{HARSANYI} \ \text{avec} \ a\to\infty \ (\text{aversion INFINIE au risque})\;}$$

### 7.9 Le jugement final du livre

> *« **Après réflexion, cela a beaucoup de sens. Les règles de décision maximin sont attrayantes dans des situations STRATÉGIQUES où les intérêts d'un adversaire rationnel et pleinement informé sont DIAMÉTRALEMENT OPPOSÉS aux vôtres.** Dans le genre d'expérience de pensée requise dans la position originelle, **il y a peu de justification évidente à adopter une telle règle de décision — à moins, bien sûr, que vous ne soyez extrêmement (IRRATIONNELLEMENT ?) PESSIMISTE**. »*

⚠️ **Le point d'interrogation entre parenthèses est du livre.**

> *« **Une fois encore, votre choix de fonction de bien-être social est un choix de VALEURS DISTRIBUTIONNELLES et, par conséquent, un choix de SYSTÈME ÉTHIQUE. LE CHOIX EST LE VÔTRE.** »*

## 🔴 Concept 8 — §6.5 : le problème neuf, et la fonction de choix social

### 8.1 Ce qui était supposé jusqu'ici

> *« Jusqu'à ce point dans notre analyse du problème du bien-être social, **nous nous sommes concentrés uniquement sur la tâche d'AGRÉGER les préférences de nombreux individus en une relation de préférence unique pour la société**. Cette tâche, comme nous l'avons vu, est **formidable**. En effet, **elle ne peut pas être menée à bien si nous insistons sur toutes les conditions d'Arrow**. »*

> *« **IMPLICITE dans notre analyse a été l'hypothèse que les VRAIES préférences de chaque individu peuvent être OBTENUES** et que les préférences de la société sont alors déterminées selon sa fonction de bien-être social. »*

### 🔴 8.2 La question qui n'avait jamais été posée

> *« **Mais COMMENT, exactement, la société découvre-t-elle les préférences de ses membres individuels ?** Une possibilité, bien sûr, est de **simplement demander à chaque individu de DÉCLARER son classement des états sociaux**. »*

> *« **Mais ceci introduit une difficulté SÉRIEUSE. Les individus seraient mieux lotis en MENTANT sur leurs préférences qu'en les déclarant honnêtement si une fausse déclaration conduit à un meilleur état social pour eux.** »*

> *(Note de bas de page 9.)* *« **Une autre possibilité est d'essayer d'INFÉRER les préférences d'un individu à partir de son COMPORTEMENT DE CHOIX observé. Mais ceci aussi est problématique**, puisqu'**un individu peut ALTÉRER son comportement de choix pour dépeindre avantageusement à la société de FAUSSES préférences**. »*

$$\boxed{\;\text{Deux problèmes, pas un : AGRÉGER les classements, et d'abord LES CONNAÎTRE.}\;}$$

> *« **Le but de cette section est d'aborder cette dernière question de front.** »*

### 8.3 Le cadre

> *« Dans toute cette section **l'ensemble des états sociaux $X$ est FINI** et **chacun des $N$ individus est autorisé à avoir N'IMPORTE QUELLE relation de préférence sur $X$. Ainsi, nous supposons le domaine non restreint, U.** »*

**Le changement d'objet :**

> *« Parce que **le but d'un classement social des états de $X$ est vraisemblablement de permettre à la société de faire un CHOIX dans $X$, concentrons-nous sur ce choix DIRECTEMENT**. »*

Pour chaque profil $R=(R^1,\dots,R^N)$, on note $c(R)\in X$ **le choix de la société**.

**La condition de RANG PLEIN :**

> *« Nous supposerons que **le rang de $c(\cdot)$ est TOUT $X$**. C'est-à-dire, **pour chaque état social $x\in X$ il existe un profil $R$ tel que $c(R)=x$**. **Sinon, nous pourrions tout aussi bien ÉLIMINER l'état social $x$ de l'ensemble $X$.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION — Fonction de choix social</span>

Toute fonction $c(\cdot)$ envoyant **tous les profils** de préférences individuelles sur $X$ vers **un choix dans $X$**, et **dont le rang est tout $X$**, est appelée une **fonction de choix social**.

</div>

> *(Note de bas de page 10.)* *« **Tous les traitements de ce sujet n'incluent pas la condition de rang plein dans la DÉFINITION** d'une fonction de choix social, choisissant plutôt d'ajouter la condition de rang **séparément**. Le présent traitement est **plus commode pour nos besoins**. »*

⚠️ **Le rang plein est une hypothèse de fond, pas un détail** : c'est elle qui rend possible le pas (b) de la partie 1 de la preuve.

### 8.4 La définition 6.4

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 6.4 — Fonction de choix social dictatoriale</span>

Une fonction de choix social $c(\cdot)$ est **dictatoriale** s'il existe un individu $i$ tel que **chaque fois que $c(R^1,\dots,R^N)=x$, on a $x\,R^i\,y$ pour tout $y\in X$**.

</div>

**En mots** : le choix social est **toujours** parmi les **meilleurs** de $i$.

## 🔴 Concept 9 — L'invulnérabilité stratégique (définition 6.5)

### 9.1 L'histoire de l'incitation à mentir

> *« Fixons pour un moment le profil $R^{-i}$ de tous les individus sauf $i$ et considérons deux préférences possibles $R^i$ et $\tilde R^i$ pour $i$. Soient $c(R^i,R^{-i})=x$ et $c(\tilde R^i,R^{-i})=y$. »*

> *« En tout, nous avons donc une situation dans laquelle **quand les autres déclarent $R^{-i}$, l'individu $i$, en choisissant de déclarer soit $R^i$ soit $\tilde R^i$, peut choisir de faire de l'état social soit $x$ soit $y$**. »*

**Quand a-t-il intérêt à mentir ?**

> *« Eh bien, **supposons que ses VRAIES préférences se trouvent être $R^i$ et qu'étant données ces préférences il préfère strictement $y$ à $x$. S'il déclare honnêtement, l'état social sera $x$. Mais s'il MENT et déclare plutôt $\tilde R^i$, l'état social sera $y$, un choix qu'il préfère strictement.** Dès lors, dans ce cas, **il a une incitation à mal déclarer ses préférences**. »*

### 9.2 La définition 6.5

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 6.5 — Fonction de choix social invulnérable à la manipulation</span>

*(strategy-proof)* Une fonction de choix social $c(\cdot)$ est **invulnérable à la manipulation** quand, **pour tout individu $i$**, **pour toute paire $R^i$ et $\tilde R^i$ de ses préférences**, et **pour tout profil $R^{-i}$ des préférences des autres** : si $c(R^i,R^{-i})=x$ et $c(\tilde R^i,R^{-i})=y$, alors

$$x\,R^i\,y$$

</div>

### 🔴 9.3 Ce que la définition dit vraiment

> *« La définition 6.5 exclut **exactement** la situation décrite ci-dessus et, avec un peu de réflexion, vous vous convaincrez que **si une fonction de choix social est invulnérable, AUCUN individu, quelles que soient ses préférences, ne peut JAMAIS gagner strictement en mal déclarant ses préférences, QUOI QUE LES AUTRES DÉCLARENT — MÊME SI LES AUTRES MENTENT sur les leurs**. »*

⚠️ **C'est une propriété en STRATÉGIE DOMINANTE**, pas seulement à l'équilibre — d'où sa force et sa rareté.

> *« Réciproquement, **si une fonction de choix social n'est PAS invulnérable, alors il y a au moins une circonstance (et peut-être beaucoup) sous laquelle un individu peut strictement gagner en mal déclarant ses préférences**. »*

### 9.4 Pourquoi on la veut

> *« Ainsi, **exiger qu'une fonction de choix social soit invulnérable garantit qu'il est OPTIMAL pour les individus de déclarer leurs préférences HONNÊTEMENT, et donc le choix de la société sera fondé sur les VRAIES préférences de ses membres**. »*

> *« **Malheureusement, l'invulnérabilité a des conséquences PROFONDES.** En effet, **rappelant le théorème d'Arrow, nous avons un autre résultat remarquable, quoique à nouveau NÉGATIF**, dû indépendamment à **Gibbard (1973)** et **Satterthwaite (1975)**. »*

## 🔴 Concept 10 — Le théorème de Gibbard-Satterthwaite

### 10.1 L'énoncé

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME 6.4 — Le théorème de Gibbard-Satterthwaite</span>

**S'il y a au moins TROIS états sociaux, alors toute fonction de choix social invulnérable à la manipulation est DICTATORIALE.**

</div>

### 10.2 La structure de la preuve

> *« Notre preuve du théorème 6.4 suit **Reny (2001)** et se divise en **deux parties**. »*

| Partie | Ce qu'elle montre |
|---|---|
| **1** | *« une fonction de choix social invulnérable doit exhiber **deux propriétés — l'EFFICACITÉ DE PARETO et la MONOTONICITÉ** »* |
| **2** | *« **toute** fonction de choix social **monotone et Pareto-efficace est DICTATORIALE** »* |

> *(Note de bas de page 11.)* *« En fait, **parce que la condition de rang plein dans Reny (2001) est appliquée au domaine plus petit des classements STRICTS, notre théorème 6.4 est un résultat légèrement PLUS FORT. (Du moins en apparence ; voir l'exercice 6.22.)** »*

### 10.3 Les deux définitions préparatoires

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 6.6 — Fonction de choix social Pareto-efficace</span>

$c(\cdot)$ est **Pareto-efficace** si $c(R^1,\dots,R^N)=x$ **chaque fois que $x\,P^i\,y$ pour tout individu $i$ et tout $y\in X$ distinct de $x$**.

</div>

> *« Ainsi, une fonction de choix social est Pareto-efficace si **chaque fois que $x$ est AU SOMMET du classement de CHAQUE individu, le choix social est $x$**. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">DÉFINITION 6.7 — Fonction de choix social monotone</span>

$c(\cdot)$ est **monotone** si $c(R^1,\dots,R^N)=x$ implique $c(\tilde R^1,\dots,\tilde R^N)=x$ **chaque fois que, pour chaque individu $i$ et chaque $y\in X$ distinct de $x$** :

$$x\,R^i\,y \ \Longrightarrow\ x\,\tilde P^i\,y$$

</div>

**La lecture donnée par le livre :**

> *« La monotonicité dit que **le choix social NE CHANGE PAS quand les préférences individuelles changent de sorte que chaque individu préfère STRICTEMENT le choix social à tout état social distinct auquel il était originellement AU MOINS AUSSI BON**. En gros, **la monotonicité dit que le choix social ne change pas quand le choix social MONTE dans le classement de chaque individu**. »*

⚠️ *« Notez que **les classements individuels entre paires d'états sociaux AUTRES que le choix social sont autorisés à changer ARBITRAIREMENT**. »*

### 🔴 10.4 L'avertissement du livre avant la preuve

> *« Nous sommes maintenant prêts à prouver le théorème 6.4, mais **encore un mot avant de le faire. NOUS NE SUPPOSONS NI l'efficacité de Pareto NI la monotonicité. La partie 1 de notre preuve prouvera que l'invulnérabilité IMPLIQUE l'efficacité de Pareto et la monotonicité. La SEULE hypothèse que le théorème 6.4 fait sur la fonction de choix social est qu'elle est INVULNÉRABLE.** »*

## 🔴 Concept 11 — La partie 1 : l'invulnérabilité implique monotonicité et efficacité

<details class="details--riche">
<summary>

**Partie 1(a) — l'invulnérabilité implique la monotonicité**

</summary>

> *(Note de bas de page 12.)* *« **Muller et Satterthwaite (1977)** montrent que **l'invulnérabilité est ÉQUIVALENTE à ce qu'ils appellent l'ASSOCIATION POSITIVE FORTE**, qui est **équivalente à la monotonicité quand les préférences individuelles n'affichent pas d'indifférence**. »*

**Le cas d'UN SEUL individu d'abord.**

Soit $(R^1,\dots,R^N)$ un profil arbitraire avec $c(R^1,\dots,R^N)=x$. Fixer un individu $i$ et soit $\tilde R^i$ une préférence telle que, pour tout $y\in X$ distinct de $x$, $x\,R^i\,y\Rightarrow x\,\tilde P^i\,y$. **On veut $c(\tilde R^i,R^{-i})=x$.**

**Par l'absurde**, supposons $c(\tilde R^i,R^{-i})=y\neq x$.

| Pas | L'argument, mot pour mot |
|---|---|
| **1** | *« Alors, étant donné que les autres déclarent $R^{-i}$, **l'individu $i$, quand ses préférences sont $R^i$, peut déclarer HONNÊTEMENT et obtenir $x$, ou il peut MENTIR en déclarant $\tilde R^i$ et obtenir $y$**. »* |
| **2** | *« **L'invulnérabilité exige que mentir ne puisse pas être strictement mieux que dire la vérité. Dès lors nous devons avoir $x\,R^i\,y$.** »* |
| **3** | *« **Selon la définition de $\tilde R^i$, nous avons alors $x\,\tilde P^i\,y$.** »* |
| **4** | *« Par conséquent, **quand les préférences de $i$ sont $\tilde R^i$, il préfère strictement $x$ à $y$** et donc, étant donné que les autres déclarent $R^{-i}$, **$i$ préfère strictement MENTIR (déclarer $R^i$ et obtenir $x$) à DIRE LA VÉRITÉ (déclarer $\tilde R^i$ et obtenir $y$), contredisant l'invulnérabilité**. »* |

⚠️ **La structure est un « double retournement »** : on applique l'invulnérabilité **d'abord** avec $R^i$ comme vraies préférences, **puis** avec $\tilde R^i$ comme vraies préférences.

**Le passage au profil complet.**

> *« Pour prouver que $c(\cdot)$ est monotone, nous devons montrer que $c(\tilde R^1,\dots,\tilde R^N)=x$. **Mais ceci découle IMMÉDIATEMENT du résultat qui vient d'être prouvé — changez simplement le profil de $(R^1,\dots,R^N)$ à $(\tilde R^1,\dots,\tilde R^N)$ en basculant, UN À LA FOIS, les préférences de chaque individu $i$ de $R^i$ à $\tilde R^i$.** »* $\blacksquare$

</details>

<details class="details--riche">
<summary>

**Partie 1(b) — l'invulnérabilité implique l'efficacité de Pareto**

</summary>

Soit $x$ un état arbitraire et soit $\hat R$ un profil avec **$x$ au sommet de chaque classement**. On veut $c(\hat R)=x$.

| Pas | L'argument |
|---|---|
| **1** | *« **Parce que le RANG de $c(\cdot)$ est tout $X$, il y a un certain profil $R$ tel que $c(R)=x$.** »* |
| **2** | *« Obtenez le profil $\tilde R$ à partir de $R$ **en déplaçant $x$ au SOMMET du classement de chaque individu**. **Par la MONOTONICITÉ** (prouvée en (a)), **$c(\tilde R)=x$**. »* |
| **3** | *« Parce que **$\hat R$ place $x$ au sommet de chaque classement individuel** et $c(\tilde R)=x$, **nous pouvons à nouveau appliquer la monotonicité (voyez-vous pourquoi ?) et conclure que $c(\hat R)=x$**, comme désiré. »* $\blacksquare$ |

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — la réponse à « voyez-vous pourquoi ? ».</span>

Dans $\tilde R$, $x$ est **déjà au sommet** de chaque classement, donc pour tout $y\neq x$ on a $x\,\tilde R^i\,y$. Et dans $\hat R$, $x$ est **aussi au sommet**, donc $x\,\hat P^i\,y$ pour tout $y\neq x$. La condition de la définition 6.7 — *« $x\,\tilde R^i\,y\Rightarrow x\,\hat P^i\,y$ »* — est donc **vérifiée pour toute paire**, quelles que soient les positions relatives des **autres** états. La monotonicité s'applique et transporte le choix $x$.

</div>

⚠️ **C'est ici, et seulement ici, que le RANG PLEIN est utilisé.** Sans lui, on ne pourrait pas amorcer le pas 1.

</details>

## 🔴 Concept 12 — La partie 2 : monotonicité + efficacité impliquent la dictature

### 12.1 La méthode et une mise au point

> *« La seconde partie de la preuve, **comme notre première preuve du théorème d'Arrow, utilisera une SÉRIE DE PROFILS BIEN CHOISIS pour découvrir un dictateur**. Étant donné les résultats de la partie 1, **nous pouvons et allons librement utiliser le fait que $c(\cdot)$ est à la fois monotone et Pareto-efficace**. »*

⚠️ **La mise au point sur l'indifférence :**

> *« Aussi, dans chacune des figures particulières employées dans cette preuve, **tous les classements individuels sont STRICTS**. C'est-à-dire, **aucun individu n'est indifférent entre deux états sociaux quelconques. Nous soulignons que ceci n'est PAS une hypothèse supplémentaire — nous n'excluons PAS l'indifférence. Il se trouve simplement que nous sommes capables de fournir une preuve du résultat désiré en considérant un SOUS-ENSEMBLE PARTICULIER de préférences qui n'affichent pas d'indifférence.** »*

### 12.2 Les cinq étapes

<details class="details--riche">
<summary>

**Étape 1 — l'individu $n$ qui fait basculer le choix (figures 6.11 et 6.12)**

</summary>

**Le point de départ.** Deux états distincts $x,y\in X$ et un profil de **classements stricts** où **$x$ est le plus haut** et **$y$ le plus bas** pour **chaque** individu.

> *« **L'efficacité de Pareto implique que le choix social à ce profil est $x$.** »*

**La montée de $y$.**

> *« Considérez maintenant **changer le classement de l'individu 1 en montant strictement $y$ d'UNE POSITION à la fois**. **Par monotonicité, le choix social reste égal à $x$ TANT QUE $y$ est EN DESSOUS de $x$** dans le classement de 1. »*

> *« **Mais quand $y$ passe FINALEMENT au-dessus de $x$, la monotonicité implique que le choix social soit CHANGE en $y$, soit RESTE égal à $x$** (voir exercice 6.18(a)). »*

> *« **Si ce dernier survient, alors commencez le même processus avec l'individu 2, puis 3, etc. jusqu'à ce que pour un certain individu $n$, le choix social CHANGE de $x$ à $y$ quand $y$ monte au-dessus de $x$ dans le classement de $n$.** »*

**Pourquoi un tel $n$ existe :**

> *« **(Il DOIT y avoir un tel individu $n$ parce que $y$ sera finalement au sommet du classement de chaque individu et, par l'efficacité de Pareto, le choix social sera alors $y$.)** »*

> **Les figures 6.11 et 6.12** *« dépeignent les situations juste AVANT et juste APRÈS que le classement de $y$ par l'individu $n$ soit monté au-dessus de $x$ »* :

|  | $R^1\ \cdots\ R^{n-1}$ | $R^n$ | $R^{n+1}\ \cdots\ R^N$ | **Choix** |
|---|---|---|---|---|
| **Fig. 6.11** | $y$ en haut, $x$ juste en dessous | **$x$ en haut, $y$ juste en dessous** | $x$ en haut, $y$ **en bas** | $\mathbf{x}$ |
| **Fig. 6.12** | $y$ en haut, $x$ juste en dessous | **$y$ en haut, $x$ juste en dessous** | $x$ en haut, $y$ **en bas** | $\mathbf{y}$ |

⚠️ **La seule différence entre 6.11 et 6.12 est l'ordre de $x$ et $y$ chez $n$.**

</details>

<details class="details--riche">
<summary>

**Étape 2 — le pas le plus délicat (figures 6.13 et 6.14)**

</summary>

> *« Ceci est **peut-être l'étape la plus délicate de la preuve, alors suivez de près**. »*

**La construction.**

> *« La figure 6.13 est dérivée de la figure 6.11 (et la figure 6.14 de la figure 6.12) **en déplaçant $x$ AU BAS du classement de l'individu $i$ pour $i<n$** et **en le déplaçant à l'AVANT-DERNIÈRE position** dans le classement de $i$ **pour $i>n$**. »*

|  | $R^1\ \cdots\ R^{n-1}$ | $R^n$ | $R^{n+1}\ \cdots\ R^N$ | **Choix** |
|---|---|---|---|---|
| **Fig. 6.13** | $y$ **en haut**, $x$ **tout en BAS** | $x$ puis $y$ | $\dots$, $x$ **avant-dernier**, $y$ **dernier** | $\mathbf{x}$ |
| **Fig. 6.14** | $y$ **en haut**, $x$ **tout en BAS** | $y$ puis $x$ | $\dots$, $x$ **avant-dernier**, $y$ **dernier** | $\mathbf{y}$ |

> *« **Nous souhaitons soutenir que ces changements n'affectent PAS les choix sociaux**, i.e. que les choix sociaux sont comme indiqué dans les figures. »*

**L'argument, en trois temps :**

| # | Le raisonnement |
|---|---|
| **1** | *« D'abord, notez que **le choix social en fig. 6.14 doit, par MONOTONICITÉ, être $y$** parce que **le choix social en fig. 6.12 est $y$** et **le classement de $y$ par rapport à tout autre état ne change chez AUCUN individu** dans le passage de 6.12 à 6.14 (exercice 6.18(b)). »* |
| **2** | *« Ensuite, notez que **les profils des figures 6.13 et 6.14 ne diffèrent QUE par le classement de $x$ et $y$ chez l'individu $n$**. Donc, parce que le choix social en 6.14 est $y$, **le choix social en 6.13 doit, par monotonicité, être SOIT $x$ SOIT $y$** (même logique qu'à l'étape 1 — exercice 6.18(a)). »* |
| **3** | *« **Mais si le choix social en fig. 6.13 était $y$, alors par monotonicité (exercice 6.18(b)), le choix social en fig. 6.11 devrait être $y$ — une CONTRADICTION.** Dès lors, **le choix social en fig. 6.13 est $x$**. »* |

⚠️ **Pourquoi c'est le pas délicat** : il faut faire **trois** appels à la monotonicité **dans trois directions différentes** — de 6.12 vers 6.14, entre 6.13 et 6.14, puis de 6.13 vers 6.11.

</details>

<details class="details--riche">
<summary>

**Étape 3 — introduire un troisième état $z$ (figure 6.15)**

</summary>

> *« **Parce qu'il y a au moins TROIS états sociaux, nous pouvons considérer un état $z\in X$ distinct de $x$ et de $y$.** »*

|  | $R^1\ \cdots\ R^{n-1}$ | $R^n$ | $R^{n+1}\ \cdots\ R^N$ |
|---|---|---|---|
| **Fig. 6.15** | $\dots$, **$z$**, **$y$**, **$x$** *(en bas)* | $x$, puis $z$, puis $y$ | $\dots$, **$z$**, **$x$**, **$y$** *(en bas)* |

**Choix social : $x$.**

> *« Puisque le profil (par ailleurs arbitraire) de classements stricts de la fig. 6.15 **peut être obtenu à partir du profil de la fig. 6.13 SANS changer le classement de $x$ par rapport à tout autre état social dans le classement d'aucun individu**, **le choix social en fig. 6.15 doit, par monotonicité, être $x$** (exercice 6.18(b)). »*

⚠️ **La clause décisive** : on est **libre** de réarranger tout le reste — seule la position **relative de $x$** doit être préservée *(ou améliorée)*.

</details>

<details class="details--riche">
<summary>

**Étape 4 — l'échange de $x$ et $y$ chez les individus $i>n$ (figure 6.16)**

</summary>

> *« Considérez le profil de la fig. 6.16 dérivé du profil de la fig. 6.15 **en INTERVERTISSANT le classement de $x$ et $y$ pour les individus $i>n$**. »*

|  | $R^1\ \cdots\ R^{n-1}$ | $R^n$ | $R^{n+1}\ \cdots\ R^N$ |
|---|---|---|---|
| **Fig. 6.16** | $\dots$, $z$, $y$, $x$ | $x$, $z$, $y$ | $\dots$, $z$, **$y$**, **$x$** |

**Choix social : $x$.**

| # | Le raisonnement |
|---|---|
| **1** | *« Parce que **c'est la SEULE différence** entre les profils de 6.15 et 6.16, et parce que le choix social en 6.15 est $x$, **le choix social en 6.16 doit, par monotonicité, être SOIT $x$ SOIT $y$** (exercice 6.18(a)). »* |
| **2** | *« **Mais le choix social en fig. 6.16 ne peut PAS être $y$, parce que $z$ est classé AU-DESSUS de $y$ dans le classement de CHAQUE individu**, et **la monotonicité impliquerait alors que le choix social RESTERAIT $y$ même si $z$ était monté au SOMMET de chaque classement individuel — contredisant l'EFFICACITÉ DE PARETO**. »* |
| **3** | *« Dès lors **le choix social en fig. 6.16 est $x$**. »* |

⚠️ **C'est le seul endroit de la partie 2 où l'efficacité de Pareto est utilisée pour EXCLURE une possibilité** — et elle a besoin du **troisième état $z$** introduit à l'étape 3.

</details>

<details class="details--riche">
<summary>

**Étape 5 — $n$ est dictateur pour $x$, puis pour tout**

</summary>

> *« Notez qu'**un profil ARBITRAIRE de classements stricts avec $x$ au SOMMET du classement de l'individu $n$ peut être obtenu à partir du profil de la fig. 6.16 SANS RÉDUIRE le classement de $x$ par rapport à tout autre état dans le classement d'aucun individu**. »*

> *« Dès lors, **la monotonicité (exercice 6.18(b)) implique que LE CHOIX SOCIAL DOIT ÊTRE $x$ chaque fois que les classements individuels sont stricts et que $x$ est au sommet du classement de l'individu $n$**. »*

**Le passage aux préférences avec indifférence :**

> *« Il vous est demandé de montrer en **exercice 6.19** que ceci implique que **MÊME quand les classements individuels ne sont pas stricts et que des indifférences sont présentes, le choix social doit être AU MOINS AUSSI BON que $x$ pour l'individu $n$ chaque fois que $x$ est au moins aussi bon que tout autre état social pour $n$**. »*

> *« Donc, **nous pouvons dire que l'individu $n$ est un DICTATEUR POUR L'ÉTAT SOCIAL $x$**. »*

**L'unicité du dictateur :**

> *« **Parce que $x$ était arbitraire, nous avons montré que pour CHAQUE état social $x\in X$, il y a un dictateur POUR $x$. Mais il ne peut pas y avoir de dictateurs DISTINCTS pour des états DISTINCTS** (voir exercice 6.20). »*

> *« Dès lors **il y a un SEUL dictateur pour tous les états sociaux et donc la fonction de choix social est dictatoriale**. »* $\blacksquare$

</details>

### 12.3 Le message du théorème — à savoir énoncer

> *« **Le message que vous devriez retenir du théorème de Gibbard-Satterthwaite est que, dans un cadre suffisamment RICHE, il est IMPOSSIBLE de concevoir un système NON DICTATORIAL dans lequel les choix sociaux sont faits sur la base de préférences AUTO-DÉCLARÉES sans introduire la possibilité que des individus puissent GAGNER EN MENTANT.** »*

### 🔴 12.4 L'issue annoncée

> *« **Heureusement, ceci ne signifie pas que tout est perdu.** Au chapitre 9 nous imposerons **une restriction de domaine importante et utile, connue sous le nom de QUASI-LINÉARITÉ**, sur les préférences individuelles. **Ceci nous permettra d'ÉCHAPPER à la conclusion du théorème de Gibbard-Satterthwaite** et de fournir une introduction à des aspects de **la théorie du DESIGN DE MÉCANISMES**. »*

> *« Ainsi, **le théorème de Gibbard-Satterthwaite fournit une leçon d'importance critique sur les LIMITES de la conception de systèmes de choix social fondés sur l'information auto-déclarée, et nous pointe vers ce que nous trouverons être un terrain plutôt FERTILE**. »*

> *« **Mais avant de pouvoir développer ceci davantage, nous devons nous familiariser avec les outils essentiels et puissants de la THÉORIE DES JEUX, le sujet de notre prochain chapitre.** »*

⚠️ **C'est l'annonce des fiches 515-516 (chapitre 7, théorie des jeux)** et, plus loin, de la fiche 520 (chapitre 9, design de mécanismes).

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| « quelle information la société utilise-t-elle ? » | **Définition 6.2** | Traduire l'information en **classe de transformations invariantes** |
| Une $W$ donnée + « satisfait-elle HE ? » | **Théorème 6.2** | Vérifier $\bar u_i<\tilde u_i<\tilde u_j<\bar u_j\Rightarrow W(\tilde u)\geq W(\bar u)$ |
| « montrer que le rayon vertical est indifférent » | **Exercice 6.7** | Répliquer l'argument du rayon horizontal, régions échangées |
| Le théorème 6.2 pour $N\geq2$ | **Exercice 6.8** | Cinq pas (a)-(e), $\alpha=\min$, HE puis continuité |
| « maximiser $W=\sum u_i$ sous contrainte de revenu » | **Exercice 6.10** | CPO ; répartition égale **ssi** les $\alpha_i$ sont égaux |
| Une WEA + « poids $\alpha_i$ » | **Exercice 6.11** | Utilitarisme **généralisé** ⟹ preuve alternative du 1ᵉʳ théorème du bien-être |
| Un indice d'égalité, revenu équivalent | **Exercices 6.14-6.15** | Atkinson $I(y)=y^e/\mu$ ; Blackorby-Donaldson |
| Une règle de vote + « peut-on gagner à mentir ? » | **Définition 6.5** | Chercher **un** profil et **un** individu — un seul suffit |
| « montrer que c'est dictatorial » | **Théorème 6.4** | Prouver **monotonicité** puis **efficacité**, puis les cinq étapes |
| « le choix change-t-il quand $x$ monte ? » | **Définition 6.7** | **Non** — et les autres paires peuvent bouger **librement** |
| Préférences **quasi-linéaires** | **Chapitre 9** | On **échappe** à Gibbard-Satterthwaite |

**Les trois réflexes de cadrage :**

1. **Traduire toute hypothèse informationnelle en classe de $\psi$.** C'est la grammaire de tout le §6.3.
2. **Pour caractériser une $W$, dessiner sa carte d'indifférence.** Les deux preuves du §6.3 ne font que cela.
3. **Pour réfuter l'invulnérabilité, un seul contre-exemple suffit** — un individu, un profil des autres, deux déclarations.

## Comment résoudre ce type d'exercice — les cinq méthodes

### Méthode 1 — Traduire une information en classe d'invariance

1. **Écrire l'énoncé comparatif** que l'on veut rendre significatif *(niveaux, différences, pourcentages)*.
2. **Chercher la classe de $\psi^i$ la plus large** qui préserve cet énoncé.
3. **En déduire l'invariance** que $f$ doit satisfaire.

| L'énoncé | La contrainte sur $\psi$ | Le nom |
|---|---|---|
| $u^i(x)\geq u^j(y)$ | $\psi^i=\psi^j=\psi$ croissante | **niveau** |
| $u^i(y)-u^i(x)\geq u^j(x)-u^j(y)$ | $\psi^i(u)=a_i+b\,u$, **$b$ commun** | **différence** |
| variations **relatives** comparées | $\psi(u)=b\,u$, **$b$ commun** | **pourcentage** |

### Méthode 2 — Une preuve diagrammatique de caractérisation

1. **Choisir un point de référence** sur la $45°$ *(pour A ou HE)*.
2. **Découper le voisinage en régions** définies par les inégalités de l'axiome.
3. **Appliquer l'axiome** pour ranger une région, la **stricte croissance** pour l'autre.
4. **Pincer par continuité** la frontière entre les deux.
5. **Généraliser** : le point était arbitraire ⟹ toute la carte est déterminée.
6. **Vérifier la réciproque** — souvent immédiate.

### Méthode 3 — Construire les transformations de la preuve utilitariste

1. **Choisir $\bar u$ sur la $45°$**, poser $\gamma=\bar u_1+\bar u_2$ et $\Omega=\{u_1+u_2=\gamma\}$.
2. **Prendre $\tilde u\in\Omega$ et son transposé $\tilde u^T$** — tous deux dans $\Omega$, égaux par **A**.
3. **Poser $\psi^i(u_i)=(\bar u_i-\tilde u_i)+u_i$** — c'est bien $a_i+b\,u$ avec $b=1$ **commun**.
4. **Vérifier les images** : $\tilde u\mapsto\bar u$ et $\bar u\mapsto\tilde u^T$, en utilisant $2\bar u_i=\tilde u_1+\tilde u_2$.
5. **Supposer $W(\bar u)>W(\tilde u)$** ⟹ par invariance $W(\tilde u^T)>W(\bar u)$ ⟹ $W(\tilde u^T)>W(\tilde u)$ ⟹ **viole A**.
6. **Idem dans l'autre sens** ⟹ $W(\bar u)=W(\tilde u)$ ⟹ $\Omega$ est une courbe d'indifférence.

### Méthode 4 — Ramener Rawls à Harsanyi

1. **Partir de $u^i$ ordinal** et poser $v^i=-\,(u^i)^{-a}$, $a>0$ — **même préférence certaine**.
2. **Noter que l'aversion au risque de $v^i$ croît avec $a$**.
3. **Appliquer Harsanyi** : probas $1/N$, espérance d'utilité ⟹ $W=\sum_i v^i=-\sum_i(u^i)^{-a}$.
4. **Transformer monotonement** : $W^*=(-W)^{-1/a}=\big[\sum_i(u^i)^{-a}\big]^{-1/a}$.
5. **Reconnaître la CES** avec $\rho=-a<0$.
6. **Faire tendre $a\to\infty$** ⟹ **le maximin**.

### Méthode 5 — Prouver Gibbard-Satterthwaite

| Partie | Ce qu'on fait |
|---|---|
| **1(a)** | Deux applications de l'invulnérabilité — **avec $R^i$ vraies**, puis **avec $\tilde R^i$ vraies** ; puis changer les individus **un à la fois** |
| **1(b)** | Utiliser le **RANG PLEIN** pour trouver $R$ avec $c(R)=x$, monter $x$ au sommet **deux fois** par monotonicité |
| **2, étape 1** | $x$ en haut / $y$ en bas partout ⟹ **efficacité** donne $x$ ; monter $y$ **individu par individu** ⟹ un **premier $n$** fait basculer |
| **2, étape 2** | Descendre $x$ chez les autres, en **trois** appels à la monotonicité |
| **2, étape 3** | Introduire $z$ **sans toucher aux positions relatives de $x$** |
| **2, étape 4** | Échanger $x$ et $y$ chez $i>n$ ; exclure $y$ par **efficacité** *(via $z$)* |
| **2, étape 5** | Généraliser à tout profil avec $x$ en tête chez $n$, puis à l'indifférence *(ex. 6.19)*, puis à tout $x$ *(ex. 6.20)* |

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Croire qu'on peut sauver Arrow sans rien lâcher | *« **la portée du théorème est que c'est PRÉCISÉMENT ce que nous devons être prêts à faire** »* | Il faut relâcher **quelque chose** |
| 2 | Oublier la condition d'**imparité** de Black (1948) | Le livre l'assortit d'un **point d'exclamation** | Préférences à **pic unique** + nombre **impair** |
| 3 | Confondre acyclicité et transitivité | L'acyclicité est **strictement plus faible** | Elle suffit à trouver **un** meilleur élément |
| 4 | Croire que le §6.3 discute les **axiomes** d'Arrow | *« **Plutôt que de discuter avec les CONDITIONS d'Arrow**, l'attention se porte sur l'**INFORMATION** »* | C'est un levier **différent** |
| 5 | Présenter la comparabilité comme acquise | *« L'idée que l'intensité puisse être comparée est, **au mieux, CONTROVERSÉE** »* | Le livre la pose **comme hypothèse** |
| 6 | Croire que plus d'invariance = plus de possibilités | **L'inverse** : **moins** d'invariance exigée ⟹ **plus** de $f$ admissibles | Moins de contraintes |
| 7 | Croire que $\psi^i$ peut différer pour l'invariance en niveau | **Non** — elles doivent être **identiques** | *« $\psi^i=\psi^j$ »* |
| 8 | Croire que $a_i$ doit être commun en invariance en différence | **Non** — c'est **$b$** qui doit l'être | $\psi^i(u)=a_i+b\,u$ |
| 9 | Confondre information et éthique | *« Ceci est **tout à fait DISTINCT** du type de restrictions éthiques »* | **Deux** leviers indépendants |
| 10 | Mal énoncer HE | La chaîne est $\bar u_i<\tilde u_i<\tilde u_j<\bar u_j$ | Le vecteur **resserré** est $\tilde u$ |
| 11 | Croire que HE est incontestable | *« **légèrement plus CONTROVERSÉE** »* | Elle vaut même pour des transferts **très coûteux** |
| 12 | Dans le théorème 6.2, oublier la **continuité** | Sans elle, l'argument de **pincement** tombe | C'est ce qui donne l'**égalité** sur le rayon |
| 13 | Croire que le rayon appartient à I ou à II | *« le rayon **n'est dans AUCUNE** des deux régions »* | Il est **entre** les deux |
| 14 | Se tromper dans les inégalités de la région I | $\bar u_2<\tilde u_2<\tilde u_1<\bar u_1$ | Trois conditions géométriques |
| 15 | Croire qu'il faut $W(\text{I})>W(\bar u)$ **strict** | *« nous n'aurons **pas besoin** de l'inégalité stricte »* | $\geq$ suffit |
| 16 | Oublier pourquoi $\min$ est invariant en niveau | Parce que $\min(\psi(u_1),\dots)=\psi(\min(u_1,\dots))$ | Le $\min$ **commute** |
| 17 | Croire que le théorème 6.3 suppose la forme somme | Non — il la **déduit** de A + invariance en différence | La réciproque est la partie facile |
| 18 | Se tromper de transformation dans la preuve utilitariste | C'est $\psi^i(u_i)=(\bar u_i-\tilde u_i)+u_i$, **pente 1** | Elle **échange** $\tilde u$ et $\bar u$ / $\bar u$ et $\tilde u^T$ |
| 19 | Oublier l'identité $2\bar u_i=\tilde u_1+\tilde u_2$ | Elle vient de **$\bar u$ sur la $45°$** ET **$\bar u,\tilde u\in\Omega$** | Sans elle le pas 2 ne marche pas |
| 20 | Croire que la contradiction est avec l'invariance | Non — elle est avec **A** *(anonymat)* | $W(\tilde u^T)>W(\tilde u)$ viole A |
| 21 | Croire que l'utilitarisme exige A | Sans A on obtient l'utilitarisme **généralisé** $\sum_i a_iu_i$ | Poids différents autorisés |
| 22 | Croire que les $a_i$ généralisés doivent être $>0$ | *« $a_i\geq0$ pour tout $i$ et $a_j>0$ **pour un certain $j$** »* | Certains peuvent être **nuls** |
| 23 | Confondre les trois invariances | niveau ⟶ $\psi$ commune · différence ⟶ $a_i+bu$ · pourcentage ⟶ $bu$ | Trois classes emboîtées |
| 24 | Croire que « radialement parallèle » est une hypothèse | C'est une **conséquence** de l'invariance en pourcentage | Et c'est **équivalent** à l'homothéticité |
| 25 | Oublier que les pentes **peuvent** différer d'un rayon à l'autre | Seule l'égalité **le long d'un même rayon** est démontrée | *« les pentes peuvent différer d'un rayon à l'autre »* |
| 26 | Croire que la quasiconcavité impose l'égalité | Elle dit que l'inégalité **en soi n'est pas valorisée** | C'est la **stricte** quasiconcavité qui biaise |
| 27 | Écrire la CES avec $\rho$ pouvant valoir $0$ | $\rho\neq0$ et $\rho<1$ | Le cas $\rho=0$ est Cobb-Douglas |
| 28 | Intervertir les deux limites | $\rho\to1$ ⟹ **utilitariste** · $\rho\to-\infty$ ⟹ **rawlsienne** | $\sigma\to\infty$ / $\sigma\to0$ |
| 29 | Croire que Harsanyi et Rawls diffèrent sur le **cadre** | Non — ils partagent la **position originelle** et le **voile d'ignorance** | Ils diffèrent sur la **règle de décision** |
| 30 | Oublier le **principe de raison insuffisante** | C'est lui qui donne les probabilités $1/N$ | Sans lui, pas d'espérance d'utilité |
| 31 | Croire que le facteur $1/N$ change quelque chose | Il est **constant** — il disparaît du classement | D'où l'utilitarisme pur |
| 32 | Croire que Rawls objecte à l'égalité des probabilités | Il objecte à **toute** assignation : *« aucune base empirique, **égales ou non** »* | D'où l'ignorance **complète** |
| 33 | Croire que Harsanyi suppose la neutralité au risque | *« les VNM peuvent incorporer **n'importe quel** degré d'aversion »* | C'est l'objection n°1 d'Arrow |
| 34 | Croire que Rawls contredit Harsanyi | *« **LOIN d'être incompatible** […] un **cas très particulier** »* | Aversion **infinie** au risque |
| 35 | Croire que le maximin est neutre | *« à moins que vous ne soyez extrêmement (**irrationnellement ?**) pessimiste »* | Il est justifié en **situation stratégique** |
| 36 | Croire que le §6.5 poursuit l'agrégation | Il pose la question **antérieure** : comment **connaître** les préférences | Deux problèmes distincts |
| 37 | Croire qu'observer les choix résout le problème | *« Mais ceci aussi est problématique »* — on peut **altérer son comportement** | Note de bas de page 9 |
| 38 | Oublier la condition de **RANG PLEIN** | Elle est dans la **définition** ici, et elle **amorce** la partie 1(b) | Sinon on éliminerait $x$ de $X$ |
| 39 | Croire que l'invulnérabilité ne vaut qu'à l'équilibre | Elle vaut **quoi que les autres déclarent — même s'ils mentent** | Propriété en **stratégie dominante** |
| 40 | Supposer efficacité et monotonicité | *« **NOUS NE LES SUPPOSONS NI L'UNE NI L'AUTRE.** »* | Elles sont **démontrées** en partie 1 |
| 41 | Mal énoncer la monotonicité | Les paires **autres** que le choix social bougent **arbitrairement** | Seule la position de $x$ compte |
| 42 | Faire un seul appel à l'invulnérabilité en 1(a) | Il en faut **deux** — avec $R^i$ puis $\tilde R^i$ comme vraies | Le « double retournement » |
| 43 | Croire que les classements stricts sont une hypothèse | *« **ceci n'est PAS une hypothèse supplémentaire — nous n'excluons PAS l'indifférence** »* | Un **sous-ensemble** suffit |
| 44 | À l'étape 4, oublier pourquoi $y$ est exclu | $z$ est **au-dessus de $y$ partout** ⟹ monter $z$ au sommet contredirait **l'efficacité** | Le rôle de $z$ |
| 45 | Croire qu'il peut y avoir plusieurs dictateurs | *« il ne peut pas y avoir de dictateurs **distincts** pour des états distincts »* *(ex. 6.20)* | Un **seul** |
| 46 | Croire que Gibbard-Satterthwaite ferme la porte | *« **Heureusement, ceci ne signifie pas que tout est perdu.** »* | La **quasi-linéarité** au chapitre 9 |

## 📌 Ultimate Review

**§6.3 — les deux voies de sauvetage.**

**(1) Affaiblir $R$** : transitivité → **acyclicité** ; ordre complet → *« trouver un meilleur élément »*. Ou remplacer **U** par des préférences **à pic unique** ⟹ **Black (1948)** : le vote majoritaire marche *« pourvu que le nombre d'individus soit IMPAIR ! »*.

**(2) Changer l'INFORMATION** — la voie suivie. Arrow n'utilise **que les $R^i$**, donc **aucune** information sur la **force** ou l'**ampleur** comparées.

⚠️ *« L'idée que l'intensité puisse être comparée est **au mieux CONTROVERSÉE**. […] **Nous ne tenterons pas de justifier cette hypothèse.** »*

**DÉFINITION 6.2 — le tableau à connaître.**

| L'information autorisée | La classe de $\psi$ | Le nom |
|---|---|---|
| Ordre des **utilités** | $\psi$ croissante, **COMMUNE** | **invariance en NIVEAU** |
| Ordre des **différences** | $\psi^i(u)=a_i+b\,u$, **$b>0$ commun** | **invariance en DIFFÉRENCE** |
| Ordre des **pourcentages** | $\psi(u)=b\,u$, **$b>0$ commun** | **invariance en POURCENTAGE** |

$$\text{MOINS d'invariance exigée} \ \Longrightarrow\ \text{PLUS de } f \text{ admissibles}$$

⚠️ **INFORMATION ≠ ÉTHIQUE** — *« ceci est tout à fait distinct du type de restrictions éthiques »*.

**DÉFINITION 6.3 — les deux axiomes éthiques.**

**A. Anonymat** : $W$ invariante par **permutation**. *« Seuls les NIVEAUX comptent, pas les IDENTITÉS. »* **HE. Équité de Hammond** : si $\bar u_k=\tilde u_k$ pour $k\neq i,j$ et $\bar u_i<\tilde u_i<\tilde u_j<\bar u_j$, alors $W(\tilde u)\geq W(\bar u)$. *« **légèrement plus controversée** — une préférence pour la **diminution de la DISPERSION** »*.

**THÉORÈME 6.2 — Rawls.**

$$\boxed{\;W \text{ str. croissante et continue satisfait HE} \iff W=\min[u_1,\dots,u_N]\;}$$

**et alors $W$ satisfait A et est invariante en NIVEAU.**

*La preuve : sur le rayon horizontal issu de $a\in45°$, la région **I** (au-dessus, sous la $45°$, à gauche) vérifie $\bar u_2<\tilde u_2<\tilde u_1<\bar u_1$ ⟹ **HE** donne $W(\text{I})\geq W(\bar u)$ ; la région **II** (en dessous) est au **sud-ouest** ⟹ $W(\text{II})<W(\bar u)$. Le **pincement** + **continuité** donnent $W(a)=W(\bar u)$. Même chose pour le rayon vertical ⟹ la courbe d'indifférence est un **coude en L**.*

⚠️ **L'invariance en niveau vient de** $\min(\psi(u_1),\dots)=\psi(\min(u_1,\dots))$ — le $\min$ **commute**.

**THÉORÈME 6.3 — utilitarisme.**

$$\boxed{\;W \text{ satisfait A} + \text{invariance en DIFFÉRENCE} \iff W=\sum_{i=1}^{N}u_i\;}$$

*La preuve : $\bar u$ sur la $45°$, $\gamma=\bar u_1+\bar u_2$, $\Omega=\{u_1+u_2=\gamma\}$, $\tilde u\in\Omega$ et $\tilde u^T$. Poser $\psi^i(u_i)=(\bar u_i-\tilde u_i)+u_i$ — **admissible car $b=1$ est commun**. Avec $2\bar u_i=\tilde u_1+\tilde u_2$ :*

$$\tilde u \ \longmapsto\ \bar u \qquad\qquad \bar u \ \longmapsto\ \tilde u^T$$

*Si $W(\bar u)>W(\tilde u)$, l'invariance donne $W(\tilde u^T)>W(\bar u)$, donc $W(\tilde u^T)>W(\tilde u)$ — **viole A**. Idem dans l'autre sens ⟹ $W(\Omega)=W(\bar u)$ ⟹ **droites parallèles de pente $-1$**.*

**Sans A** : l'**utilitarisme généralisé** $W=\sum_i a_iu_i$, $a_i\geq0$, $a_j>0$ pour un $j$.

**§6.3.3 — les formes flexibles.**

**Invariance en POURCENTAGE** ⟹ courbes **négativement pentues** et **RADIALEMENT PARALLÈLES** *(triangles semblables $OCC'$ et $ODD'$, passage à la limite)*.

$$\boxed{\;\text{radialement parallèle} \iff \textbf{HOMOTHÉTIQUE}\;}$$

**+ A** ⟹ **symétrie** autour de la $45°$. **+ quasiconcavité** ⟹ *« l'inégalité **en soi** n'est pas socialement valorisée »*. **+ stricte quasiconcavité** ⟹ **biais strict pour l'égalité**.

**+ SÉPARABILITÉ FORTE** *(le TMS social entre deux individus est indépendant du bien-être des autres)* ⟹ la **famille CES** :

$$W=\left[\sum_{i=1}^{N}(u_i)^\rho\right]^{1/\rho}, \qquad \rho\neq0,\ \rho<1, \qquad \sigma=\frac{1}{1-\rho} \tag{6.13}$$

$$\boxed{\;\text{RAWLS} \ \xleftarrow{\ \rho\to-\infty,\ \sigma\to0\ } \ \text{CES} \ \xrightarrow{\ \rho\to1,\ \sigma\to\infty\ } \ \text{UTILITARISME}\;}$$

**§6.4 — la justice.**

*« Le choix entre ces fonctions est **effectivement un choix entre des ensembles alternatifs de VALEURS ÉTHIQUES**. »*

| Tradition | Classiques | Moderne |
|---|---|---|
| **Utilitariste** | Hume, Smith, Bentham, Mill | **Harsanyi** |
| **Contractarienne** | Locke, Rousseau, Kant | **Rawls** |

**Les deux partagent** : la **POSITION ORIGINELLE** derrière le **VOILE D'IGNORANCE** — *« un choix sous incertitude sur QUI l'on finira par être »*. **Ils diffèrent sur la RÈGLE DE DÉCISION.**

**HARSANYI** : VNM + **principe de raison insuffisante** ⟹ proba $1/N$ ⟹

$$\sum_{i=1}^{N}\frac1N\,u^i(x) \tag{6.14} \qquad\Longrightarrow\qquad \sum_i u^i(x)>\sum_i u^i(y)$$

**RAWLS** : *« **aucune base empirique** pour assigner de telles probabilités, **égales ou non** »* ⟹ **ignorance complète** + aversion au risque ⟹

$$\min[u^1(x),\dots]>\min[u^1(y),\dots] \tag{6.15}$$

**LA CRITIQUE D'ARROW (1973)** — deux objections : **1.** *« les VNM peuvent incorporer **n'importe quel** degré d'aversion au risque »* ; **2.** *« on n'a **pas besoin de rejeter** l'espérance d'utilité pour arriver au critère de Rawls »*.

*La construction : $v^i=-(u^i)^{-a}$ représente les mêmes préférences certaines, avec une **aversion croissante en $a$**. Harsanyi donne $W=\sum_i v^i=-\sum_i(u^i)^{-a}$ (6.16), et la transformation monotone $W^*=(-W)^{-1/a}=\big[\sum_i(u^i)^{-a}\big]^{-1/a}$ (6.17) est **la CES avec $\rho=-a$**.*

$$\boxed{\;\text{RAWLS} \ = \ \text{HARSANYI avec aversion INFINIE au risque } (a\to\infty)\;}$$

⚠️ *« Le maximin est attrayant dans des situations **stratégiques** où un adversaire est **diamétralement opposé** à vous. Dans la position originelle, **peu de justification évidente — à moins d'être extrêmement (irrationnellement ?) pessimiste**. »*

> *« **Le choix est le vôtre.** »*

**§6.5 — Gibbard-Satterthwaite.**

**Le problème neuf** : *« **Comment la société découvre-t-elle les préférences ?** […] **Les individus seraient mieux lotis en MENTANT.** »* Et observer les choix ne sauve rien — *« un individu peut **altérer son comportement de choix** »*.

**FONCTION DE CHOIX SOCIAL** : $c(R)\in X$, **de RANG PLEIN** *(sinon on éliminerait $x$ de $X$)*.

**DÉF. 6.4** : $c$ est **dictatoriale** si $c(R)=x$ implique **toujours** $x\,R^i\,y$ pour tout $y$. **DÉF. 6.5** : $c$ est **INVULNÉRABLE** si $c(R^i,R^{-i})=x$ et $c(\tilde R^i,R^{-i})=y$ impliquent $x\,R^i\,y$. **En stratégie dominante** — *« quoi que les autres déclarent, **même s'ils mentent** »*.

**THÉORÈME 6.4** :

$$\boxed{\;|X|\geq3 \ \Longrightarrow\ \text{toute } c \text{ invulnérable est DICTATORIALE}\;}$$

**DÉF. 6.6** : $c$ **Pareto-efficace** si $x$ au sommet de **tous** ⟹ $c=x$. **DÉF. 6.7** : $c$ **monotone** si $c(R)=x$ et $\big(x\,R^i\,y\Rightarrow x\,\tilde P^i\,y\ \forall i,\forall y\neq x\big)$ impliquent $c(\tilde R)=x$. *« les paires **autres** que le choix social peuvent changer **arbitrairement** »*.

⚠️ *« **Nous ne supposons NI l'efficacité NI la monotonicité.** La seule hypothèse est l'**invulnérabilité**. »*

**LA PREUVE (Reny 2001), en deux parties.**

| Partie | Le contenu |
|---|---|
| **1(a)** | Invulnérabilité ⟹ **monotonicité** : double retournement *(avec $R^i$ vraies, puis $\tilde R^i$ vraies)*, puis un individu à la fois |
| **1(b)** | ⟹ **efficacité** : le **RANG PLEIN** donne $R$ avec $c(R)=x$ ; deux applications de la monotonicité |
| **2, ét. 1** | $x$ en haut / $y$ en bas partout ⟹ $c=x$ ; monter $y$ un à un ⟹ **premier $n$** qui bascule *(fig. 6.11 → 6.12)* |
| **2, ét. 2** | Descendre $x$ chez les autres — **trois** appels à la monotonicité *(fig. 6.13, 6.14)* |
| **2, ét. 3** | Introduire $z$ **sans changer les positions relatives de $x$** *(fig. 6.15)* |
| **2, ét. 4** | Échanger $x,y$ chez $i>n$ ; **$y$ exclu par l'EFFICACITÉ via $z$** *(fig. 6.16)* |
| **2, ét. 5** | Généraliser ⟹ $n$ dictateur **pour $x$** ; ex. 6.19 *(indifférences)* ; ex. 6.20 *(unicité)* |

**LE MESSAGE** :

> *« Dans un cadre **suffisamment riche**, il est **impossible de concevoir un système NON dictatorial dans lequel les choix sociaux sont faits sur la base de préférences AUTO-DÉCLARÉES sans introduire la possibilité que des individus puissent GAGNER EN MENTANT**. »*

**L'ISSUE** : *« **Heureusement, ceci ne signifie pas que tout est perdu.** »* — la **QUASI-LINÉARITÉ** au chapitre 9 permet d'**échapper** au théorème et ouvre le **design de mécanismes**. Mais d'abord : **la théorie des jeux**, chapitre 7.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quelles sont les deux voies de sauvetage après Arrow ?**

</summary>

**(1) Relâcher les exigences sur $R$** :

- transitivité → **acyclicité** ; ordre complet → *« être **simplement capables de trouver une meilleure alternative parmi tout sous-ensemble** »* ⟹ *« ouvre la voie à **plusieurs mécanismes de choix possibles** »* ;
- ou garder la transitivité et remplacer **U** par des préférences **à PIC UNIQUE** ⟹ **Black (1948)** : *« le **vote majoritaire** satisfait le reste des conditions d'Arrow, **pourvu que le nombre d'individus soit IMPAIR !** »*

**(2) Changer l'INFORMATION** transmise par les préférences — *« **plutôt que de discuter avec les CONDITIONS d'Arrow** »*.

</details>

<details class="details--riche">
<summary>

**2. Quelle information Arrow n'utilise-t-il pas ?**

</summary>

Dans le cadre d'Arrow, on n'obtient de chaque individu que **son classement du meilleur au pire**. Ce processus *« ne produit **AUCUNE** information sur »* :

| Ce qui manque | Formulation du livre |
|---|---|
| L'intensité **comparée** | *« la **force** de la préférence de $i$ pour $x$ **en comparaison** de celle de $j$ pour $y$ »* |
| L'ampleur **comparée** | *« **combien plus** $i$ favorise $x$ sur $y$ **en comparaison de combien plus** $j$ favorise $y$ sur $x$ »* |

> *« **Par conception**, l'approche d'Arrow ne considère pas une telle information. »*

</details>

<details class="details--riche">
<summary>

**3. Quel avertissement le livre donne-t-il avant d'aller plus loin ?**

</summary>

> *« **Avant de simplement aller de l'avant, un AVERTISSEMENT s'impose. L'idée que l'« intensité de préférence » puisse être comparée de manière cohérente à travers les individus est, au mieux, CONTROVERSÉE.** Néanmoins, l'approche alternative **prend comme point de départ — comme HYPOTHÈSE — que de telles comparaisons peuvent être faites de manière significative. Nous ne tenterons pas de justifier cette hypothèse. Voyons simplement ce qu'elle peut faire pour nous.** »*

*Les références : Hammond (1976), d'Aspremont et Gevers (1977), Roberts (1980), Sen (1984).*

</details>

<details class="details--riche">
<summary>

**4. Reconstituer l'exemple à deux personnes qui motive l'invariance en niveau.**

</summary>

1 préfère $x$ à $y$ ; 2 préfère $y$ à $x$ — situation **symétrique**. La société veut *« rendre son membre le plus mal loti aussi bien loti que possible »*, donc veut savoir **qui est le mieux dans son pire état**.

| Hypothèse sur les nombres | La conclusion sociale |
|---|---|
| $u^1(y)>u^2(x)$ | 1 est mieux en $y$ que 2 ne l'est en $x$ ⟹ $y\,P\,x$ |
| $v^1(y)<v^2(x)$ *(mêmes préférences !)* | ⟹ $x\,P\,y$ |

> *« **même si les classements individuels sur $x$ et $y$ n'ont PAS changé** »*

</details>

<details class="details--riche">
<summary>

**5. Quelle est la leçon exacte de cet exemple ?**

</summary>

> *« **Si les utilités portent PLUS de sens que le simple classement des états, alors la fonction de bien-être social n'a pas besoin d'être invariante aux transformations strictement croissantes.** »*

**La raison** : *« alors que les transformations strictement croissantes **préservent les comparaisons entre états pour chaque individu SÉPARÉMENT**, elles n'ont pas besoin de **préserver les classements À TRAVERS les individus** »*.

Pour garantir la préservation à travers les individus, *« les $\psi^i$ et $\psi^j$ doivent être strictement croissantes **ET IDENTIQUES** »*.

</details>

<details class="details--riche">
<summary>

**6. Quelle information rendent significatives les DIFFÉRENCES, et quelle invariance impose-t-elle ?**

</summary>

*« Une **MESURE de combien $i$ gagne** quand l'état passe de $x$ à $y$, **en comparaison de combien $j$ perd**. »*

$$u^i(y)-u^i(x)\geq u^j(x)-u^j(y) \quad\text{signifie}\quad \text{« le gain de } i \text{ est au moins aussi grand que la perte de } j \text{ »}$$

> *« Pour préserver ces comparaisons, **la transformation de chaque individu doit être de la forme $\psi^i(u^i)=a_i+b\,u^i$, où $b>0$ est COMMUN** à tous. »*

⚠️ **Les $a_i$ peuvent différer ; la pente $b$ ne le peut pas.**

</details>

<details class="details--riche">
<summary>

**7. Énoncer la définition 6.2.**

</summary>

**1. Invariante en NIVEAU** : invariante à des $\psi$ strictement croissantes **arbitraires mais COMMUNES**. ⟹ $f$ ne dépend que de **l'ordre des utilités**, pour et à travers les individus.

**2. Invariante en DIFFÉRENCE** : invariante aux $\psi^i(u^i)=a_i+b\,u^i$ avec **$b>0$ commun**. ⟹ $f$ ne dépend que de **l'ordre des différences**, pour et à travers les individus.

*(La troisième, l'**invariance en POURCENTAGE** — $\psi(u)=b\,u$ — arrive au §6.3.3.)*

</details>

<details class="details--riche">
<summary>

**8. Quelle distinction le livre insiste-t-il pour faire ?**

</summary>

> *« **Le degré auquel l'utilité est supposée mesurable et comparable peut être vu comme une question de COMBIEN D'INFORMATION la société utilise. Ceci est tout à fait DISTINCT du type de restrictions ÉTHIQUES qu'une société pourrait souhaiter voir respecter.** »*

> *« Il y a **un certain contenu éthique** aux conditions du welfarisme strict. Cependant, une société peut **intégrer encore plus de valeurs éthiques**. **Chacune revient à imposer une exigence supplémentaire sur $W$.** »*

$$\textbf{INFORMATION} \ \neq\ \textbf{ÉTHIQUE} \qquad \text{deux leviers indépendants}$$

</details>

<details class="details--riche">
<summary>

**9. Énoncer A et HE.**

</summary>

**A. Anonymat.** Si $\tilde u$ est obtenu de $\bar u$ **par une permutation** de ses éléments, alors $W(\bar u)=W(\tilde u)$.

**HE. Équité de Hammond.** Si $\bar u_k=\tilde u_k$ **pour tout $k$ sauf $i$ et $j$**, et si

$$\bar u_i<\tilde u_i<\tilde u_j<\bar u_j$$

alors $W(\tilde u)\geq W(\bar u)$.

</details>

<details class="details--riche">
<summary>

**10. Comment le livre commente-t-il A et HE ?**

</summary>

**A** : *« les gens devraient être traités **SYMÉTRIQUEMENT**. Le classement **ne devrait pas dépendre de l'IDENTITÉ des individus**, seulement des **NIVEAUX** de bien-être. »*

**HE** : *« **légèrement plus CONTROVERSÉE**. Elle exprime l'idée que **la société a une préférence pour la DIMINUTION DE LA DISPERSION des utilités**. »* — accompagnée de la question : *« **pouvez-vous penser à une raison pour laquelle on pourrait objecter ?** »*

*(Une réponse : HE approuve le resserrement **même quand relever le plus mal loti d'un iota exige d'abaisser énormément le mieux loti**.)*

</details>

<details class="details--riche">
<summary>

**11. Énoncer le théorème 6.2.**

</summary>

Une $W$ **strictement croissante et continue** satisfait **HE** **si et seulement si** elle peut prendre la **forme rawlsienne**

$$W=\min[u_1,\dots,u_N]$$

*« De plus, $W$ satisfait alors **A** et est **invariante en niveau d'utilité**. »*

*(Preuve diagrammatique pour $N=2$ ; pour $N>2$ voir l'**exercice 6.8** et **Hammond (1976)**.)*

</details>

<details class="details--riche">
<summary>

**12. Décrire les régions I et II de la figure 6.6.**

</summary>

Choisir $a$ sur la **droite à $45°$**, considérer le **rayon infini vers la droite**, et un point $\bar u$ dessus.

| Région | Sa définition |
|---|---|
| **I** | à gauche de $\bar u$, **sous la $45°$**, **AU-DESSUS du rayon** |
| **II** | à gauche de $\bar u$, sous la $45°$, **EN DESSOUS du rayon** |

⚠️ *« Ainsi **le rayon n'est dans AUCUNE des deux régions**. »*

</details>

<details class="details--riche">
<summary>

**13. Écrire et justifier les inégalités qui caractérisent la région I.**

</summary>

$$\bar u_2<\tilde u_2<\tilde u_1<\bar u_1$$

| La condition géométrique | L'inégalité |
|---|---|
| Sous la $45°$ | $\tilde u_2<\tilde u_1$ |
| Au-dessus du rayon *(à hauteur $\bar u_2$)* | $\tilde u_2>\bar u_2$ |
| À gauche de $\bar u$ | $\tilde u_1<\bar u_1$ |

⚠️ **C'est exactement la configuration de HE** avec $i=2$, $j=1$ — d'où $W(\tilde u)\geq W(\bar u)$, donc $W(\text{I})\geq W(\bar u)$.

*(Note 8 : $W(\text{I})>W(\bar u)$ en fait, mais *« nous n'aurons pas besoin de l'inégalité stricte »*.)*

</details>

<details class="details--riche">
<summary>

**14. Comment la continuité conclut-elle la preuve du théorème 6.2 ?**

</summary>

La région **II** est au **sud-ouest** de $\bar u$ ⟹ $W(\text{II})<W(\bar u)$ par **stricte croissance**. Donc

$$W(\text{I})\geq W(\bar u)>W(\text{II}) \tag{P.1}$$

**Le pincement** : *« pour chaque point de la droite joignant $a$ et $\bar u$ il y a des points **arbitrairement proches dans I** (valeur $\geq W(\bar u)$) et **arbitrairement proches dans II** (valeur $<W(\bar u)$). Dès lors, **par la CONTINUITÉ de $W$, chaque point du segment reçoit exactement $W(\bar u)$**. »*

En particulier **$W(a)=W(\bar u)$**.

</details>

<details class="details--riche">
<summary>

**15. Quelle est la carte d'indifférence rawlsienne, et pourquoi ?**

</summary>

Le rayon **horizontal** et le rayon **vertical** issus de $a$ sont tous deux indifférents à $a$ *(l'exercice 6.7 demande le second)*. Et *« **parce que $W$ est strictement croissante, AUCUN autre point ne peut être indifférent** »*.

⟹ **la courbe d'indifférence est l'UNION DES DEUX RAYONS** — un **coude en L** de sommet sur la $45°$ **(figure 6.7)**, *« les courbes plus éloignées de l'origine recevant une utilité sociale plus élevée »*.

C'est **exactement** la carte de $\min[u_1,u_2]$.

</details>

<details class="details--riche">
<summary>

**16. Pourquoi le maximin est-il invariant en NIVEAU ?**

</summary>

Parce que pour toute $\psi$ strictement croissante :

$$W\big(\psi(u_1),\dots,\psi(u_N)\big)=\psi\big(W(u_1,\dots,u_N)\big)$$

**Le minimum COMMUTE avec toute transformation croissante.** Dès lors l'ordre est préservé, et $W$ est invariante en niveau.

⚠️ **C'est précisément pourquoi le maximin n'a besoin que de l'ORDRE DES NIVEAUX** — l'information la moins exigeante des trois.

</details>

<details class="details--riche">
<summary>

**17. Quelle intuition informationnelle sous-tend l'utilitarisme ?**

</summary>

> *« En classant deux états, c'est **la somme linéaire des DIFFÉRENCES d'utilité individuelles** qui est déterminante. Par conséquent, **des énoncés de la forme « dans le passage de $x$ à $y$, l'individu 1 gagne PLUS que l'individu 2 » doivent être SIGNIFIANTS**. Ainsi, **les différences doivent être comparables pour et à travers les individus**. »*

⟹ on attend un lien avec l'**invariance en différence** — et le théorème 6.3 le confirme.

</details>

<details class="details--riche">
<summary>

**18. Énoncer le théorème 6.3 et poser le montage de sa preuve.**

</summary>

**$W$ strictement croissante et continue satisfait A et l'invariance en différence $\iff$ $W=\sum_{i}u_i$.**

**Le montage :**

1. $\bar u$ sur la **$45°$**, donc $\bar u_1=\bar u_2$.
2. $\gamma\equiv\bar u_1+\bar u_2$ et $\Omega\equiv\{(u_1,u_2):u_1+u_2=\gamma\}$ — *« une droite passant par $\bar u$ de **pente $-1$** »*.
3. $\tilde u\in\Omega$, distinct de $\bar u$ ; son **transposé** $\tilde u^T=(\tilde u_2,\tilde u_1)$, **aussi dans $\Omega$**.
4. *« Par la condition **A**, $\tilde u$ et $\tilde u^T$ doivent être classés **de la même manière** relativement à $\bar u$. »*

</details>

<details class="details--riche">
<summary>

**19. Construire les deux transformations et calculer leurs images.**

</summary>

$$\psi^i(u_i)\equiv(\bar u_i-\tilde u_i)+u_i, \qquad i=1,2$$

⚠️ **Admissibles** : $a_i=\bar u_i-\tilde u_i$ *(libre)*, $b=1$ **commun**.

**L'observation clé** : $2\bar u_i=\tilde u_1+\tilde u_2$, *« parce que $\bar u$ est sur la $45°$ et que $\bar u$ et $\tilde u$ sont tous deux dans $\Omega$ »*.

| Point | Calcul | Image |
|---|---|---|
| $\tilde u$ | $\psi^1(\tilde u_1)=\bar u_1$, $\psi^2(\tilde u_2)=\bar u_2$ | $\bar u$ |
| $\bar u$ | $\psi^1(\bar u_1)=2\bar u_1-\tilde u_1=\tilde u_2$, $\psi^2(\bar u_2)=\tilde u_1$ | $\tilde u^T$ |

</details>

<details class="details--riche">
<summary>

**20. Conclure la preuve du théorème 6.3.**

</summary>

Supposons $W(\bar u)>W(\tilde u)$. **Par invariance** : $W(\tilde u^T)>W(\bar u)$.

**Ensemble** : $W(\tilde u^T)>W(\tilde u)$ — **ce qui VIOLE A** *(ce sont des permutés l'un de l'autre)*. Donc $W(\bar u)>W(\tilde u)$ est impossible. *« Par un argument similaire »*, $W(\tilde u)>W(\bar u)$ l'est aussi.

Donc $W(\bar u)=W(\tilde u)$, et **A** donne $W(\tilde u^T)=W(\bar u)=W(\tilde u)$. $\tilde u$ étant arbitraire ⟹ **$W(\Omega)=W(\bar u)$**.

$W$ strictement croissante ⟹ NE de $\Omega$ strictement mieux, SO strictement pire ⟹ **$\Omega$ est une courbe d'indifférence** ⟹ carte de **droites parallèles de pente $-1$** ⟹ $W=u_1+u_2$. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**21. Qu'obtient-on si l'on abandonne l'anonymat ?**

</summary>

> *« **Toute la gamme des ordres UTILITARISTES GÉNÉRALISÉS est permise** », représentés par »*

$$W=\sum_i a_iu_i, \qquad a_i\geq0\ \forall i, \qquad a_j>0 \text{ pour un certain } j$$

> *« Sous ces critères, **la SOMME de bien-être est à nouveau la question importante, mais le bien-être de différents individus peut recevoir un « POIDS » différent** dans l'évaluation sociale. »*

</details>

<details class="details--riche">
<summary>

**22. Qu'est-ce que l'invariance en POURCENTAGE ?**

</summary>

L'information : *« l'ordre des **CHANGEMENTS EN POURCENTAGE** d'utilité pour et à travers les individus »* — du type *« l'**augmentation en pourcentage** de l'utilité de $i$ est plus grande que la **perte en pourcentage** de $j$ »*.

Seules les transformations **identiques ET LINÉAIRES** la préservent :

$$\psi(u^i)=b\,u^i, \qquad b>0 \text{ commun à tous}$$

⚠️ **Conséquence** : *« les fonctions **rawlsienne ET utilitariste sont toutes deux permises ici** »* — et toute une classe avec elles.

</details>

<details class="details--riche">
<summary>

**23. Démontrer que les courbes d'indifférence sont radialement parallèles.**

</summary>

*(Figure 6.9.)*

1. La courbe par $\bar u$ est **négativement pentue** *(welfarisme strict ⟹ $W$ strictement croissante)*.
2. Tout autre point du rayon $OA$ est de la forme **$b\bar u$**, $b>0$.
3. Prendre $\tilde u$ avec $W(\bar u)=W(\tilde u)$. **L'invariance** donne $W(b\bar u)=W(b\tilde u)$.
4. La corde $CC'$ *(de $\bar u$ à $\tilde u$)* approxime la tangente en $\bar u$ ; $DD'$ *(de $b\bar u$ à $b\tilde u$)* celle en $b\bar u$. **Les triangles $OCC'$ et $ODD'$ sont SEMBLABLES** ⟹ **mêmes pentes**.
5. **Faire tendre $\tilde u\to\bar u$** : $b\tilde u\to b\bar u$, les cordes restent de pente égale, et **à la limite** les tangentes sont égales.
6. $\bar u$ et $b$ arbitraires ⟹ **la pente est la même en chaque point d'un rayon donné** — *« bien que les pentes puissent **différer d'un rayon à l'autre** »*.

</details>

<details class="details--riche">
<summary>

**24. Quelle équivalence en découle, et quels raffinements le livre ajoute-t-il ?**

</summary>

$$\boxed{\;\text{courbes de niveau radialement parallèles} \iff \textbf{fonction HOMOTHÉTIQUE}\;}$$

| L'ajout | La conséquence | La lecture éthique |
|---|---|---|
| **A** | $W$ **symétrique** | courbes en **images miroir** autour de la $45°$ |
| **Quasiconcavité** | ensembles « au moins aussi bon » **convexes** | *« l'inégalité **EN SOI** n'est **pas** socialement valorisée »* |
| **Stricte quasiconcavité** | — | *« **biais STRICT en faveur de l'égalité** »* |

*(Pourquoi : avec $u'=u^T$, l'anonymat donne $W(u)=W(u^T)$, et la moyenne — le vecteur **égalisé** — est **strictement préférée**.)*

</details>

<details class="details--riche">
<summary>

**25. Écrire la famille CES et dire ce qui la caractérise.**

</summary>

Après **WP, A, convexité**, on ajoute la **SÉPARABILITÉ FORTE** : *« le taux marginal de substitution **SOCIALE** entre deux individus quelconques est **indépendant du bien-être de tous les autres** »*. Alors

$$W=\left[\sum_{i=1}^{N}(u_i)^\rho\right]^{1/\rho}, \qquad \rho\neq0,\ \rho<1 \tag{6.13}$$

et $\sigma=\dfrac{1}{1-\rho}$ est *« l'**élasticité constante et égale de substitution sociale** entre deux individus quelconques »*.

</details>

<details class="details--riche">
<summary>

**26. Quels sont les deux cas limites de la CES ?**

</summary>

| Limite | $\sigma$ | La forme | Le commentaire du livre |
|---|---|---|---|
| $\rho\to1$ | $\to\infty$ | **UTILITARISTE** | *« implique une **indifférence sociale COMPLÈTE** à la manière dont le bien-être est distribué »* |
| $\rho\to-\infty$ | $\to0$ | **RAWLSIENNE** | *« le **biais social en faveur de l'égalité est ABSOLU** »* |

> *« **Différentes valeurs de $\rho$ donnent différents degrés de « COURBURE » aux courbes d'indifférence sociale, et intègrent donc différents degrés auxquels l'ÉGALITÉ est valorisée.** »*

*(Figure 6.10 : (a) droites · (b) courbes convexes · (c) coudes en L.)*

</details>

<details class="details--riche">
<summary>

**27. Que reconnaît le §6.4 d'entrée de jeu ?**

</summary>

> *« Au-delà de la question technique […], il y a la réalité fondamentale que **le CHOIX entre de telles fonctions est effectivement un CHOIX ENTRE DES ENSEMBLES ALTERNATIFS DE VALEURS ÉTHIQUES**. **Sur ce point, des affaires d'OPINION sont réellement impliquées.** Elles appartiennent à juste titre à **la toute PREMIÈRE ÉTAPE de toute analyse** visant à évaluer la signification sociale des politiques ou institutions économiques. »*

</details>

<details class="details--riche">
<summary>

**28. Quelles sont les deux traditions, et que partagent-elles ?**

</summary>

| Tradition | Classiques | Moderne |
|---|---|---|
| **UTILITARISTE** | Hume, Smith, **Bentham**, Mill | **Harsanyi** (1953, 1955, 1975) |
| **CONTRACTARIENNE** | Locke, Rousseau, **Kant** | **Rawls** (1971) |

*(« La littérature en économie et celle en philosophie — **une seule et même chose à l'époque d'avant Adam Smith** ».)*

**Ce qu'ils partagent** : *« un critère « juste » doit être un que choisirait une personne **rationnelle** si elle était **ÉQUITABLE D'ESPRIT** »* ⟹ la **POSITION ORIGINELLE** derrière le **VOILE D'IGNORANCE** ⟹ *« un choix **sous incertitude sur QUI l'on finira par devoir être** »*.

⚠️ *« Ils diffèrent sur ce qu'ils voient comme **la RÈGLE DE DÉCISION appropriée**. »*

</details>

<details class="details--riche">
<summary>

**29. Dérouler l'argument de Harsanyi.**

</summary>

1. Il accepte les axiomes **VNM** ⟹ $u^i(x)$ **unique à une transformation affine positive près**.
2. **Par le PRINCIPE DE RAISON INSUFFISANTE** ⟹ probabilité **égale** $1/N$ d'être n'importe qui.
3. *« $i$ doit **imaginer ces circonstances et imaginer ce que ses préférences $u^j(x)$ seraient**. »*
4. L'évaluation rationnelle est **l'espérance d'utilité** :

$$\sum_{i=1}^{N}\frac1N u^i(x) \tag{6.14}$$

⚠️ Le facteur $1/N$ étant **constant**, ceci équivaut à $\sum_i u^i(x)>\sum_i u^i(y)$ — **un critère purement UTILITARISTE**.

</details>

<details class="details--riche">
<summary>

**30. Pourquoi Rawls rejette-t-il cela, et que propose-t-il ?**

</summary>

> *« Il objecte à l'assignation **d'une quelconque probabilité** à la perspective d'être un individu particulier **parce que, dans la position originelle, il ne peut y avoir AUCUNE BASE EMPIRIQUE pour assigner de telles probabilités, ÉGALES OU NON**. »*

⚠️ *« Ainsi, **la notion même de choix guidé par l'espérance d'utilité est REJETÉE**. »* Il voit le problème comme un choix sous **IGNORANCE COMPLÈTE**.

> *« **En supposant que les gens sont AVERSES AU RISQUE**, il argue qu'en ignorance totale, une personne rationnelle ordonnerait les états **selon la manière dont elle les verrait si elle finissait comme le membre LE PLUS MAL LOTI** : »*

$$\min[u^1(x),\dots]>\min[u^1(y),\dots] \tag{6.15}$$

</details>

<details class="details--riche">
<summary>

**31. Quelles sont les deux objections d'Arrow (1973) ?**

</summary>

> *« Ultimement, **l'argument même de Rawls repose sur l'idée que les gens sont averses au risque. Mais ceci ne peut pas être un argument entièrement convaincant.** »*

| # | L'objection |
|---|---|
| **1** | *« Les fonctions VNM dans la construction de Harsanyi peuvent être pensées comme **incorporant N'IMPORTE QUEL degré d'aversion au risque**. Ainsi, **RIEN N'EMPÊCHE les individus d'être averses au risque dans la position originelle**. »* |
| **2** | *« De plus, **on n'a PAS BESOIN de rejeter la règle de l'espérance d'utilité pour arriver au critère de Rawls**. »* |

</details>

<details class="details--riche">
<summary>

**32. Dérouler la construction qui ramène Rawls à Harsanyi.**

</summary>

1. **Reparamétrer** : $v^i(x)\equiv-\,u^i(x)^{-a}$, $a>0$ — *« ces mêmes préférences [certaines] peuvent être représentées **tout aussi bien** »*.
2. *« Le degré d'**aversion au risque** affiché par $v(x)$ est **CROISSANT dans le paramètre $a$**. »*
3. **Appliquer Harsanyi** — probas $1/N$, espérance d'utilité :

$$W=\sum_{i=1}^{N}v^i(x)\equiv-\sum_{i=1}^{N}u^i(x)^{-a} \tag{6.16}$$

4. **L'ordre n'ayant qu'une signification ORDINALE**, transformer :

$$W^*=(-W)^{-1/a}\equiv\left[\sum_{i=1}^{N}u^i(x)^{-a}\right]^{-1/a} \tag{6.17}$$

5. **Reconnaître la CES** avec $\rho\equiv-a<0$ ; **$a\to\infty$ ⟹ $\rho\to-\infty$ ⟹ le MAXIMIN**.

</details>

<details class="details--riche">
<summary>

**33. Énoncer la conclusion du §6.4.**

</summary>

> *« Ainsi, **le critère maximin de Rawls — LOIN d'être incompatible avec l'utilitarisme de Harsanyi — peut au contraire être vu comme un CAS TRÈS PARTICULIER de celui-ci, à savoir celui qui surgit quand les individus sont INFINIMENT AVERSES AU RISQUE**. »*

**Et le jugement qui suit :**

> *« Les règles maximin sont attrayantes **dans des situations STRATÉGIQUES où les intérêts d'un adversaire rationnel et pleinement informé sont DIAMÉTRALEMENT OPPOSÉS aux vôtres**. Dans la position originelle, **il y a peu de justification évidente — à moins d'être extrêmement (IRRATIONNELLEMENT ?) PESSIMISTE**. »*

> *« **Le choix est le vôtre.** »*

</details>

<details class="details--riche">
<summary>

**34. Quelle question neuve le §6.5 pose-t-il ?**

</summary>

> *« **IMPLICITE dans notre analyse a été l'hypothèse que les VRAIES préférences de chaque individu peuvent être obtenues.** Mais **COMMENT, exactement, la société découvre-t-elle les préférences de ses membres ?** »*

> *« Une possibilité est de **simplement demander**. **Mais ceci introduit une difficulté sérieuse. Les individus seraient mieux lotis en MENTANT si une fausse déclaration conduit à un meilleur état social pour eux.** »*

⚠️ *(Note 9)* *« Une autre possibilité est d'**inférer** les préférences du **comportement de choix** observé. **Mais ceci aussi est problématique**, puisqu'un individu peut **altérer son comportement** pour dépeindre de fausses préférences. »*

</details>

<details class="details--riche">
<summary>

**35. Définir la fonction de choix social, et le rôle du RANG PLEIN.**

</summary>

$X$ **fini**, domaine **non restreint (U)**. Pour chaque profil $R$, $c(R)\in X$ est **le choix de la société**.

> *« Nous supposerons que **le RANG de $c(\cdot)$ est TOUT $X$** : pour chaque $x\in X$ il existe un profil $R$ tel que $c(R)=x$. **Sinon, nous pourrions tout aussi bien ÉLIMINER $x$ de $X$.** »*

⚠️ *(Note 10)* : d'autres traitements ajoutent la condition de rang **séparément** ; ici elle est **dans la définition**, *« plus commode pour nos besoins »*.

**C'est le rang plein qui amorce la partie 1(b) de la preuve.**

</details>

<details class="details--riche">
<summary>

**36. Énoncer les définitions 6.4 et 6.5.**

</summary>

**DÉF. 6.4 — dictatoriale.** Il existe $i$ tel que **chaque fois que $c(R^1,\dots,R^N)=x$, on a $x\,R^i\,y$ pour tout $y\in X$**.

**DÉF. 6.5 — invulnérable** *(strategy-proof)*. Pour tout $i$, toute paire $R^i,\tilde R^i$, et **tout** profil $R^{-i}$ : si $c(R^i,R^{-i})=x$ et $c(\tilde R^i,R^{-i})=y$, alors

$$x\,R^i\,y$$

</details>

<details class="details--riche">
<summary>

**37. Que dit vraiment la définition 6.5 ?**

</summary>

> *« **Si une fonction de choix social est invulnérable, AUCUN individu, quelles que soient ses préférences, ne peut JAMAIS gagner strictement en mal déclarant ses préférences, QUOI QUE LES AUTRES DÉCLARENT — MÊME SI LES AUTRES MENTENT sur les leurs.** »*

⚠️ **C'est une propriété en STRATÉGIE DOMINANTE** — pas seulement à l'équilibre.

> *« Réciproquement, si elle n'est pas invulnérable, **il y a au moins une circonstance (et peut-être beaucoup) sous laquelle un individu peut strictement gagner en mentant**. »*

</details>

<details class="details--riche">
<summary>

**38. Énoncer le théorème 6.4 et la structure de sa preuve.**

</summary>

**S'il y a au moins TROIS états sociaux, toute fonction de choix social invulnérable est DICTATORIALE.**

*(Preuve d'après **Reny (2001)**.)*

| Partie | Ce qu'elle montre |
|---|---|
| **1** | Invulnérabilité ⟹ **efficacité de Pareto** ET **monotonicité** |
| **2** | $\|X\|\geq3$ + monotonicité + efficacité ⟹ **dictature** |

⚠️ *« **Nous ne supposons NI l'efficacité NI la monotonicité. La SEULE hypothèse que le théorème fait est l'INVULNÉRABILITÉ.** »*

</details>

<details class="details--riche">
<summary>

**39. Énoncer les définitions 6.6 et 6.7.**

</summary>

**DÉF. 6.6 — Pareto-efficace.** $c(R)=x$ **chaque fois que $x\,P^i\,y$ pour tout $i$ et tout $y\neq x$** — *« si $x$ est au **sommet** de chaque classement, le choix social est $x$ »*.

**DÉF. 6.7 — monotone.** $c(R)=x$ implique $c(\tilde R)=x$ chaque fois que, pour chaque $i$ et chaque $y\neq x$ :

$$x\,R^i\,y \ \Longrightarrow\ x\,\tilde P^i\,y$$

> *« En gros, **le choix social ne change pas quand le choix social MONTE dans le classement de chaque individu**. »*

⚠️ *« Les classements entre paires **autres** que le choix social sont autorisés à changer **arbitrairement**. »*

</details>

<details class="details--riche">
<summary>

**40. Démontrer que l'invulnérabilité implique la monotonicité.**

</summary>

**Cas d'un seul individu.** $c(R)=x$ ; $\tilde R^i$ telle que $x\,R^i\,y\Rightarrow x\,\tilde P^i\,y$ pour tout $y\neq x$. **Par l'absurde**, $c(\tilde R^i,R^{-i})=y\neq x$.

| Pas | L'argument |
|---|---|
| **1** | Avec les vraies préférences $R^i$, $i$ peut **dire la vérité** *(→ $x$)* ou **mentir** en déclarant $\tilde R^i$ *(→ $y$)*. |
| **2** | **L'invulnérabilité** ⟹ mentir n'est pas strictement mieux ⟹ **$x\,R^i\,y$**. |
| **3** | Par définition de $\tilde R^i$ ⟹ **$x\,\tilde P^i\,y$**. |
| **4** | Donc si les vraies préférences sont **$\tilde R^i$**, $i$ préfère **strictement mentir** *(déclarer $R^i$, obtenir $x$)* à dire la vérité *(déclarer $\tilde R^i$, obtenir $y$)* — **contredit l'invulnérabilité**. |

**Puis** : changer le profil complet **un individu à la fois**. $\blacksquare$

⚠️ **C'est un « double retournement »** — on applique l'invulnérabilité **deux fois**, avec deux jeux de vraies préférences.

</details>

<details class="details--riche">
<summary>

**41. Démontrer que l'invulnérabilité implique l'efficacité de Pareto.**

</summary>

Soit $\hat R$ un profil avec **$x$ au sommet de chacun**. On veut $c(\hat R)=x$.

1. **Par le RANG PLEIN**, il existe $R$ avec $c(R)=x$.
2. Former $\tilde R$ en **montant $x$ au sommet de chaque classement** ⟹ **par monotonicité**, $c(\tilde R)=x$.
3. $\hat R$ place aussi $x$ au sommet partout ⟹ **par monotonicité à nouveau**, $c(\hat R)=x$. $\blacksquare$

**Pourquoi le pas 3 marche** : dans $\tilde R$, $x\,\tilde R^i\,y$ pour tout $y\neq x$ ; dans $\hat R$, $x\,\hat P^i\,y$ pour tout $y\neq x$. La condition de la définition 6.7 est donc **vérifiée pour toute paire**.

</details>

<details class="details--riche">
<summary>

**42. Dérouler l'étape 1 de la partie 2.**

</summary>

Profil de **classements stricts** avec **$x$ le plus haut** et **$y$ le plus bas** pour tous ⟹ **l'efficacité** donne $c=x$.

**Monter $y$ chez l'individu 1, une position à la fois.** *« Par monotonicité, le choix reste $x$ **tant que $y$ est en dessous de $x$**. Mais **quand $y$ passe au-dessus de $x$**, la monotonicité implique que le choix **soit change en $y$, soit reste $x$** »* *(exercice 6.18(a))*.

*« Si ce dernier survient, **recommencer avec 2, puis 3, etc. jusqu'à un individu $n$ pour lequel le choix CHANGE de $x$ à $y$**. »*

⚠️ **Un tel $n$ existe** : *« $y$ sera finalement **au sommet de chaque classement** et par l'efficacité le choix sera alors $y$ »*.

*(Figures 6.11 et 6.12 : juste avant / juste après, ne différant que par l'ordre de $x$ et $y$ chez $n$.)*

</details>

<details class="details--riche">
<summary>

**43. Dérouler l'étape 2 — la plus délicate.**

</summary>

**La construction** *(fig. 6.13 depuis 6.11, fig. 6.14 depuis 6.12)* : *« déplacer $x$ **au BAS** du classement de $i$ **pour $i<n$**, et à l'**AVANT-DERNIÈRE** position **pour $i>n$** »*.

| # | Le raisonnement | La direction |
|---|---|---|
| **1** | Le choix en **6.14** est $y$ car il l'est en **6.12** et *« le classement de $y$ par rapport à tout autre état **ne change chez aucun individu** »* | 6.12 → 6.14 |
| **2** | 6.13 et 6.14 **ne diffèrent que par l'ordre de $x,y$ chez $n$** ⟹ le choix en 6.13 est **$x$ ou $y$** | 6.13 ↔ 6.14 |
| **3** | *« **Si le choix en 6.13 était $y$, alors par monotonicité le choix en 6.11 devrait être $y$ — CONTRADICTION.** »* ⟹ **le choix en 6.13 est $x$** | 6.13 → 6.11 |

⚠️ **Trois appels à la monotonicité, dans trois directions différentes.**

</details>

<details class="details--riche">
<summary>

**44. Dérouler les étapes 3 et 4.**

</summary>

**Étape 3** *(fig. 6.15)*. *« **Parce qu'il y a au moins TROIS états sociaux**, considérer $z$ distinct de $x$ et $y$. »* Le profil de 6.15 *« peut être obtenu depuis 6.13 **sans changer le classement de $x$ par rapport à tout autre état chez aucun individu** »* ⟹ **par monotonicité, le choix est $x$**.

**Étape 4** *(fig. 6.16)*. **Intervertir $x$ et $y$ chez les $i>n$** — seule différence ⟹ le choix est **$x$ ou $y$**.

⚠️ **Mais pas $y$** : *« **$z$ est classé AU-DESSUS de $y$ dans le classement de CHAQUE individu**, et la monotonicité impliquerait alors que **le choix resterait $y$ même si $z$ était monté au sommet de chaque classement — contredisant l'EFFICACITÉ DE PARETO** »*.

⟹ **le choix en 6.16 est $x$**.

</details>

<details class="details--riche">
<summary>

**45. Conclure la preuve du théorème 6.4.**

</summary>

**Étape 5.** *« Un profil **arbitraire** de classements stricts **avec $x$ au sommet du classement de $n$** peut être obtenu depuis 6.16 **sans RÉDUIRE le classement de $x$** chez aucun individu. »* ⟹ **par monotonicité**, le choix est $x$ **chaque fois que $x$ est en tête chez $n$**.

**Puis** *(exercice 6.19)* : même avec des **indifférences**, *« le choix social doit être **au moins aussi bon que $x$ pour $n$** chaque fois que $x$ est au moins aussi bon que tout autre état pour $n$ »* ⟹ **$n$ est dictateur POUR $x$**.

**Enfin** : $x$ étant arbitraire, il y a un dictateur pour **chaque** état ; *« mais **il ne peut pas y avoir de dictateurs DISTINCTS pour des états distincts** »* *(exercice 6.20)* ⟹ **un seul dictateur**. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**46. Quel message et quelle issue le chapitre laisse-t-il ?**

</summary>

**Le message :**

> *« Dans un cadre **suffisamment RICHE**, il est **IMPOSSIBLE de concevoir un système NON DICTATORIAL dans lequel les choix sociaux sont faits sur la base de préférences AUTO-DÉCLARÉES sans introduire la possibilité que des individus puissent GAGNER EN MENTANT**. »*

**L'issue :**

> *« **Heureusement, ceci ne signifie pas que tout est perdu.** Au chapitre 9 nous imposerons **la QUASI-LINÉARITÉ** […] **Ceci nous permettra d'ÉCHAPPER à la conclusion du théorème** et de fournir une introduction au **DESIGN DE MÉCANISMES**. »*

> *« **Mais avant de pouvoir développer ceci, nous devons nous familiariser avec les outils essentiels et puissants de la THÉORIE DES JEUX, le sujet de notre prochain chapitre.** »*

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le jugement du livre sur Arrow ? | *« **Vraiment dérangeant** » — « seuls les très audacieux » peuvent relâcher un axiome* |
| La première voie de sauvetage ? | **Affaiblir $R$** : transitivité → **acyclicité** ; ou **pic unique** au lieu de U |
| Le résultat de Black (1948) ? | Le **vote majoritaire** marche — *« pourvu que le nombre d'individus soit **IMPAIR** ! »* |
| La seconde voie ? | Changer l'**INFORMATION**, pas les **conditions** |
| Ce qu'Arrow n'utilise pas ? | La **force** et l'**ampleur** comparées des préférences |
| Le statut de la comparabilité interpersonnelle ? | *« **au mieux CONTROVERSÉE** »* — posée **comme hypothèse** |
| Invariance en **NIVEAU** ? | $\psi$ strictement croissante, **COMMUNE** à tous |
| Ce qu'elle autorise comme information ? | L'**ordre des utilités**, pour et à travers les individus |
| Invariance en **DIFFÉRENCE** ? | $\psi^i(u)=a_i+b\,u$, **$b>0$ COMMUN** |
| Qu'est-ce qui doit être commun ? | La **pente $b$** — **pas** les $a_i$ |
| Invariance en **POURCENTAGE** ? | $\psi(u)=b\,u$, **$b>0$ commun** |
| Le sens de la relation info/possibilités ? | **MOINS** d'invariance exigée ⟹ **PLUS** de $f$ admissibles |
| La distinction que le livre insiste à faire ? | **INFORMATION ≠ ÉTHIQUE** — deux leviers indépendants |
| Le welfarisme strict ? | **U + WP + IIA + PI** |
| Condition **A** ? | $W$ invariante par **permutation** des utilités |
| Ce qu'elle signifie ? | Seuls les **niveaux** comptent, **pas les identités** |
| Condition **HE** ? | $\bar u_i<\tilde u_i<\tilde u_j<\bar u_j$ ⟹ $W(\tilde u)\geq W(\bar u)$ |
| Ce qu'elle exprime ? | Une préférence pour la **diminution de la DISPERSION** |
| Son statut ? | *« **légèrement plus controversée** »* |
| Théorème 6.2 ? | $W$ satisfait **HE** $\iff$ $W=\min[u_1,\dots,u_N]$ |
| Ce qui vient en prime ? | **A** et l'**invariance en NIVEAU** |
| Le point de départ de sa preuve ? | Un point $a$ sur la **$45°$** et le **rayon horizontal** issu de $a$ |
| Le rayon est-il dans I ou II ? | **Dans aucune des deux** |
| Les inégalités de la région I ? | $\bar u_2<\tilde u_2<\tilde u_1<\bar u_1$ |
| Ce que HE en tire ? | $W(\text{I})\geq W(\bar u)$ |
| Ce que donne la région II ? | $W(\text{II})<W(\bar u)$ — elle est au **sud-ouest** |
| L'outil qui conclut ? | La **CONTINUITÉ** — un argument de **pincement** |
| La carte d'indifférence rawlsienne ? | Des **coudes en L** de sommet sur la $45°$ |
| Pourquoi le $\min$ est invariant en niveau ? | Parce qu'il **COMMUTE** : $\min(\psi(u_i))=\psi(\min(u_i))$ |
| Théorème 6.3 ? | **A + invariance en DIFFÉRENCE** $\iff$ $W=\sum_i u_i$ |
| Le montage de sa preuve ? | $\bar u$ sur la $45°$, $\Omega=\{u_1+u_2=\gamma\}$, $\tilde u$ et son **transposé** $\tilde u^T$ |
| La transformation utilisée ? | $\psi^i(u_i)=(\bar u_i-\tilde u_i)+u_i$ |
| Pourquoi est-elle admissible ? | Forme $a_i+b\,u$ avec **$b=1$ commun** |
| L'identité arithmétique clé ? | $2\bar u_i=\tilde u_1+\tilde u_2$ |
| Ce que $\psi$ fait de $\tilde u$ ? | Elle l'envoie sur **$\bar u$** |
| Ce qu'elle fait de $\bar u$ ? | Elle l'envoie sur **$\tilde u^T$** |
| Quel axiome la contradiction viole ? | **A** — pas l'invariance |
| La carte d'indifférence utilitariste ? | Des **droites parallèles** de pente $\boldsymbol{-1}$ |
| L'utilitarisme généralisé ? | $W=\sum_i a_iu_i$, $a_i\geq0$, $a_j>0$ pour un $j$ |
| Ce qu'on abandonne pour l'obtenir ? | L'**anonymat** |
| L'information de l'invariance en pourcentage ? | L'ordre des **changements relatifs**, pour et à travers |
| Ce qu'elle permet ? | **Rawls ET l'utilitarisme sont tous deux permis** |
| La propriété géométrique qui en découle ? | Courbes **négativement pentues** et **RADIALEMENT PARALLÈLES** |
| L'outil de la démonstration ? | Les **triangles semblables** $OCC'$ et $ODD'$, puis la **limite** |
| Ce qui peut quand même varier ? | Les pentes **d'un rayon à l'autre** |
| L'équivalence décisive ? | Radialement parallèle $\iff$ **HOMOTHÉTIQUE** |
| Ce qu'ajoute A ? | La **symétrie** — images miroir autour de la $45°$ |
| Ce qu'ajoute la quasiconcavité ? | *« l'inégalité **EN SOI** n'est pas socialement valorisée »* |
| Ce qu'ajoute la **stricte** quasiconcavité ? | Un **biais STRICT** en faveur de l'égalité |
| La condition qui donne la CES ? | La **SÉPARABILITÉ FORTE** du TMS social |
| La forme CES ? | $W=\big[\sum_i(u_i)^\rho\big]^{1/\rho}$, $\rho\neq0$, $\rho<1$ |
| L'élasticité de substitution sociale ? | $\sigma=1/(1-\rho)$ |
| La limite $\rho\to1$ ? | **UTILITARISTE** — indifférence **complète** à la répartition |
| La limite $\rho\to-\infty$ ? | **RAWLSIENNE** — biais **absolu** pour l'égalité |
| Ce que reconnaît le §6.4 ? | Le choix d'une $W$ est un **choix de VALEURS ÉTHIQUES** |
| Quand doit-il être fait ? | À la **toute première étape** de l'analyse |
| La tradition utilitariste ? | **Hume, Smith, Bentham, Mill** → **Harsanyi** |
| La tradition contractarienne ? | **Locke, Rousseau, Kant** → **Rawls** |
| Ce que les deux partagent ? | La **position originelle** derrière le **voile d'ignorance** |
| Ce sur quoi ils diffèrent ? | La **RÈGLE DE DÉCISION** |
| Le principe qui donne $1/N$ chez Harsanyi ? | Le **principe de RAISON INSUFFISANTE** |
| L'objet que Harsanyi maximise ? | L'**espérance d'utilité** $\sum_i(1/N)u^i(x)$ |
| Pourquoi cela donne l'utilitarisme ? | Le facteur $1/N$ est **constant** — il disparaît |
| L'objection de Rawls ? | **Aucune base empirique** pour ces probabilités, *« égales ou non »* |
| Sa règle ? | Le **MAXIMIN** : $\min[u^1(x),\dots]>\min[u^1(y),\dots]$ |
| Sur quoi repose son argument ? | L'**aversion au risque** |
| Objection n°1 d'Arrow (1973) ? | Les **VNM** peuvent incorporer **n'importe quel** degré d'aversion |
| Objection n°2 ? | On n'a **pas besoin de rejeter** l'espérance d'utilité |
| La reparamétrisation d'Arrow ? | $v^i=-\,(u^i)^{-a}$, $a>0$ |
| Ce que $a$ contrôle ? | Le **degré d'aversion au risque** |
| La fonction obtenue par Harsanyi ? | $W=-\sum_i(u^i)^{-a}$ |
| Sa transformation monotone ? | $W^*=\big[\sum_i(u^i)^{-a}\big]^{-1/a}$ |
| Ce qu'on y reconnaît ? | La **CES** avec $\rho=-a$ |
| La conclusion du §6.4 ? | **RAWLS = HARSANYI avec aversion INFINIE au risque** |
| Quand le maximin est-il justifié ? | En situation **stratégique** contre un adversaire **opposé** |
| Sinon ? | *« à moins d'être extrêmement (**irrationnellement ?**) pessimiste »* |
| Le mot de la fin du §6.4 ? | *« **Le choix est le vôtre.** »* |
| La question neuve du §6.5 ? | Comment la société **CONNAÎT-elle** les préférences ? |
| Le problème de la déclaration ? | *« Les individus seraient mieux lotis en **MENTANT** »* |
| Pourquoi observer les choix ne suffit pas ? | On peut **altérer son comportement** pour feindre |
| Ce qu'est une fonction de choix social ? | $c(R)\in X$, de **RANG PLEIN** |
| Pourquoi le rang plein ? | Sinon *« on pourrait **éliminer $x$ de $X$** »* — et il **amorce** la partie 1(b) |
| Définition 6.4 ? | $c$ **dictatoriale** si $c(R)=x$ implique **toujours** $x\,R^i\,y$ pour tout $y$ |
| Définition 6.5 ? | $c(R^i,R^{-i})=x$ et $c(\tilde R^i,R^{-i})=y$ ⟹ $x\,R^i\,y$ |
| En quel sens est-ce fort ? | **Quoi que les autres déclarent — même s'ils mentent** |
| Théorème 6.4 ? | $\|X\|\geq3$ ⟹ toute $c$ **invulnérable** est **DICTATORIALE** |
| Ses auteurs ? | **Gibbard (1973)** et **Satterthwaite (1975)**, indépendamment |
| L'auteur de la preuve suivie ? | **Reny (2001)** |
| Ce que montre la partie 1 ? | Invulnérabilité ⟹ **efficacité** + **monotonicité** |
| Ce que montre la partie 2 ? | Monotonicité + efficacité + $\|X\|\geq3$ ⟹ **dictature** |
| Que suppose le théorème ? | **Rien d'autre que l'invulnérabilité** |
| Définition 6.6 ? | $x$ au **sommet de tous** ⟹ $c=x$ |
| Définition 6.7 ? | $c(R)=x$ et $\big(xR^iy\Rightarrow x\tilde P^iy\big)$ ⟹ $c(\tilde R)=x$ |
| Ce qui peut bouger librement ? | Les paires **autres** que le choix social |
| La structure de la partie 1(a) ? | Un **double retournement** — invulnérabilité appliquée **deux fois** |
| Ce qui amorce la partie 1(b) ? | Le **RANG PLEIN** |
| L'étape 1 de la partie 2 ? | $x$ en haut / $y$ en bas ⟹ monter $y$ **un individu à la fois** |
| Ce qu'on trouve ? | Un **premier $n$** qui fait basculer le choix de $x$ à $y$ |
| Pourquoi $n$ existe ? | $y$ finira **au sommet de tous** ⟹ **efficacité** donne $y$ |
| L'étape 2 ? | Descendre $x$ chez les autres — **trois** appels à la monotonicité |
| L'étape 3 ? | Introduire $z$ **sans changer les positions relatives de $x$** |
| L'étape 4 ? | Échanger $x,y$ chez $i>n$ |
| Pourquoi $y$ est exclu à l'étape 4 ? | $z$ est **au-dessus de $y$ partout** ⟹ contredirait l'**efficacité** |
| L'étape 5 ? | Généraliser ⟹ **$n$ dictateur pour $x$** |
| Ce que règle l'exercice 6.19 ? | Le cas des **indifférences** |
| Ce que règle l'exercice 6.20 ? | Il ne peut y avoir **plusieurs** dictateurs |
| Le message du théorème ? | Impossible : **non-dictatorial + auto-déclaré + personne ne gagne à mentir** |
| L'issue annoncée ? | La **QUASI-LINÉARITÉ** au chapitre 9 ⟹ **design de mécanismes** |
| Ce qu'il faut d'abord ? | La **THÉORIE DES JEUX** — chapitre 7 |
