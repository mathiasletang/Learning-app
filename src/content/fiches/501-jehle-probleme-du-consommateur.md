# Fiche 501 — Le problème du consommateur : contrainte budgétaire, Lagrange et demande marshallienne

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 1 « Consumer Theory », §1.3 « The Consumer's Problem » (p. 19-27) |
| **Difficulté** | Fondamental — le calcul central de toute la microéconomie du consommateur |
| **Temps d'étude estimé** | 110 min |
| **Prérequis** | Fiche 500 (axiomes, hypothèse 1.2, TMS) · conditions de Kuhn-Tucker (thm A2.20 ; fiches 39-41 pour le traitement approfondi) · théorème de Weierstrass (thm A1.10) |
| **Concepts clés** | Économie de marché, preneur de prix, ensemble budgétaire $B$, contrainte budgétaire, problème de maximisation de l'utilité, théorème de Weierstrass, existence, unicité, saturation du budget, demande marshallienne $x(p,y)$, courbe de demande, lagrangien, conditions de Kuhn-Tucker, multiplicateur $\lambda^*$, utilité marginale proportionnelle au prix, $\text{TMS}=$ rapport des prix, suffisance des conditions du premier ordre, utilité CES, demande différentiable, hessien bordé |
| **Poids à l'examen** | Le triptyque **existence / unicité / saturation** et quelle hypothèse produit laquelle · les **conditions (1.10)** et leur réduction depuis Kuhn-Tucker · la condition de tangence **$\text{TMS}_{jk}=p_j/p_k$** · la **preuve du théorème 1.4** · l'**exemple 1.1 (CES)** de bout en bout, à savoir refaire sans notes. |

## 🎯 Vue d'ensemble

```
LE FIL DU §1.3 : des goûts a une FONCTION DE DEMANDE qu'on peut deriver

  LES CIRCONSTANCES                  economie de MARCHE
        un marche par bien, prix pi > 0, donc  p >> 0
        le consommateur est INSIGNIFIANT -> il est PRENEUR DE PRIX
        revenu monetaire fixe  y >= 0

  L'ENSEMBLE BUDGETAIRE              B = { x | x dans R^n_+ ,  p . x <= y }

  LE PROBLEME, deux ecritures equivalentes
        (1.4)  chercher x* dans B tel que  x* >~ x  pour tout x de B
        (1.5)  max u(x)  sous contrainte  p . x <= y
        les solutions de (1.5) sont exactement celles de (1.4)

  LA STRUCTURE MATHEMATIQUE   -- le triptyque a savoir par coeur
        u CONTINUE      + B COMPACT   -> Weierstrass (A1.10) -> EXISTENCE
        u STR. QUASICONCAVE + B CONVEXE               -> UNICITE
        preferences STR. MONOTONES         -> p . x* = y  (budget SATURE)
        => x* est une FONCTION de (p,y) : la DEMANDE MARSHALLIENNE  x(p,y)

  LE CALCUL                          L(x,lambda) = u(x) - lambda [ p.x - y ]

        Kuhn-Tucker (A2.20) :  (1.7) du/dxi - lambda* pi = 0
                               (1.8) p.x* - y <= 0
                               (1.9) lambda* [ p.x* - y ] = 0
        stricte monotonie => (1.8) est une EGALITE => (1.9) est REDONDANTE

        (1.10)  n+1 equations, n+1 inconnues  x1*,...,xn*, lambda*

        consequences :  lambda* = ui(x*)/pi > 0
                        du/dxj = lambda* pj   (utilite marg. PROPORTIONNELLE au prix)
                (1.11)  TMS_jk = (du/dxj)/(du/dxk) = pj / pk    <-- TANGENCE

  THEOREME 1.4   les conditions (1.10) ne sont pas seulement NECESSAIRES :
                 pour ce probleme elles sont SUFFISANTES (optimum GLOBAL)
                 il suffit donc de resoudre le systeme

  EXEMPLE 1.1    utilite CES  u = (x1^rho + x2^rho)^(1/rho),  rho < 1, rho != 0
                 -> x1 = p1^(r-1) y / (p1^r + p2^r)   avec  r = rho/(rho-1)
                 -> x2 = p2^(r-1) y / (p1^r + p2^r)

  THEOREME 1.5   quand x(p,y) est-elle DERIVABLE ?
                 u deux fois C1  +  une utilite marginale > 0
                 +  hessien BORDE de determinant non nul en x*
```

> **La phrase qui résume le §1.3.** Le §1.2 disait *comment* le consommateur classe ; le §1.3 dit *ce qu'il achète*. Le passage de l'un à l'autre tient en une ligne : $x^*\in B$ tel que $x^*\succsim x$ pour tout $x\in B$ — et tout le reste n'est que la mise en forme calculable de cette ligne.

> ⚠️ **Note de transcription — identique à la fiche 500.** Le PDF n'exporte pas $\succsim$, $\succ$, $\gg$, $\sum$, et rend l'inégalité vectorielle $\geq$ comme un « + ». Ces symboles sont rétablis à partir de la prose et des équations voisines. Deux passages du livre où cela compte particulièrement sont signalés en cours de route.

## 🔴 Concept 1 — Les circonstances du consommateur et l'ensemble budgétaire

### 1.1 Le rappel de structure que fait le livre

> *« Nous nous sommes attardés sur la manière de structurer et de représenter les préférences, mais celles-ci ne sont que l'une des quatre briques majeures de notre théorie du choix du consommateur. Dans cette section, nous considérons les autres et les combinons toutes ensemble pour construire une description formelle de l'acteur central d'une grande partie de la théorie économique — l'humble consommateur atomistique. »*

Au niveau le plus abstrait :

| Brique | Contenu | Statut |
|---|---|---|
| $X = \mathbb{R}^n_+$ | toutes les alternatives concevables | posé au §1.1 |
| $\succsim$ sur $\mathbb{R}^n_+$ | inclinations et attitudes | axiomatisé au §1.2 |
| $B \subset \mathbb{R}^n_+$ | ce que les circonstances permettent | **construit ici** |
| hypothèse comportementale | choisir le plus préféré parmi les réalisables | **formalisée ici** |

$$\boxed{\;x^* \in B \quad \text{tel que} \quad x^* \succsim x \ \ \text{pour tout } x \in B\;} \tag{1.4}$$

Et l'hypothèse de travail, reprise de la fiche 500 :

> **ASSUMPTION 1.2 — Consumer Preferences.** $\succsim$ est **complète, transitive, continue, strictement monotone et strictement convexe** sur $\mathbb{R}^n_+$. Donc, par les théorèmes 1.1 et 1.3, elle est représentable par une fonction d'utilité $u$ à valeurs réelles, **continue, strictement croissante et strictement quasiconcave** sur $\mathbb{R}^n_+$.

*Dans le cas à deux biens, la carte d'indifférence a des ensembles de niveau **non sécants**, **strictement convexes** en s'éloignant de l'origine, et **croissants vers le nord-est** (Fig. 1.8).*

### 1.2 Ce qu'est une « économie de marché » ici

> *« Notre préoccupation porte sur un consommateur individuel opérant à l'intérieur d'une **économie de marché**. Par économie de marché, nous entendons un système économique dans lequel les transactions entre agents sont **médiatisées par des marchés**. »*

Les quatre hypothèses sur l'environnement, énoncées l'une après l'autre :

**(a) Un marché par bien, un prix par marché.** *« Il y a un marché pour chaque bien, et sur ces marchés, un prix $p_i$ prévaut pour chaque bien $i$. »*

**(b) Les prix sont strictement positifs.** $p_i > 0$ pour $i=1,\dots,n$, c'est-à-dire

$$p \gg 0$$

**(c) Le consommateur est preneur de prix.** *« Nous supposons que le consommateur individuel est une force **insignifiante** sur chaque marché. Par là nous entendons, spécifiquement, que la taille de chaque marché relativement aux achats potentiels du consommateur individuel est si grande que, **quelle que soit la quantité qu'il achète**, il n'y aura aucun effet perceptible sur aucun prix de marché. Formellement, cela signifie que nous prenons le vecteur des prix de marché, $p \gg 0$, comme **fixé** du point de vue du consommateur. »*

**(d) Le revenu est fixe.** *« Le consommateur est doté d'un **revenu monétaire fixe** $y \geq 0$. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que « preneur de prix » veut dire exactement — et ne veut pas dire.</span>

⚠️ Ce n'est pas une hypothèse sur le *pouvoir* du consommateur mais sur la **taille relative** du marché. Formellement, elle a une seule conséquence technique, mais décisive : $p$ est un **paramètre** du problème, pas une variable de choix. C'est ce qui permet d'écrire $x(p,y)$ — une fonction *de* $p$ — et donc de parler de courbe de demande.

</div>

### 1.3 La construction de l'ensemble budgétaire

Le raisonnement du livre, en une ligne : *« parce que l'achat de $x_i$ unités du bien $i$ au prix $p_i$ par unité requiert une dépense de $p_ix_i$ euros, l'exigence que la dépense n'excède pas le revenu peut être énoncée comme »*

$$\sum_{i=1}^{n} p_i x_i \ \leq\ y \qquad\text{ou, plus compactement,}\qquad p \cdot x \leq y$$

**Définition (dans le texte).** L'**ensemble budgétaire** est

$$\boxed{\;B = \{\, x \mid x \in \mathbb{R}^n_+,\ p \cdot x \leq y \,\}\;}$$

*« Dans le cas à deux biens, $B$ consiste en tous les paniers situés à l'intérieur ou sur les frontières de la région ombrée de la Fig. 1.9. »* La droite de budget a pour pente $-p_1/p_2$ et coupe les axes en $y/p_1$ et $y/p_2$.

<details class="details--riche">
<summary>

**Exercice 1.15 — $B$ est compact et convexe dès que $p\gg0$**

</summary>

**Énoncé.** Prouver que l'ensemble budgétaire $B$ est un ensemble **compact et convexe** dès que $p \gg 0$.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué. *Ce résultat est utilisé sans démonstration dans le texte principal — c'est lui qui autorise Weierstrass.*

**Non vide.** $0 \in \mathbb{R}^n_+$ et $p\cdot 0 = 0 \leq y$ (car $y\geq0$). Donc $0 \in B$.

**Fermé.** $B$ est l'intersection de deux fermés :

$$B = \underbrace{\mathbb{R}^n_+}_{\text{fermé}} \ \cap\ \underbrace{\{x \mid p\cdot x \leq y\}}_{\text{demi-espace fermé}}.$$

Le second est l'image réciproque du fermé $(-\infty,y]$ par l'application **continue** (linéaire) $x\mapsto p\cdot x$, donc fermé.

**Borné — c'est ici que $p\gg0$ sert.** Soit $x \in B$. Pour chaque $i$, comme tous les termes de $p\cdot x$ sont $\geq0$ :

$$p_i x_i \ \leq\ \sum_{j=1}^n p_j x_j \ =\ p\cdot x \ \leq\ y,$$

donc, **puisque $p_i > 0$**, $x_i \leq y/p_i$. Ainsi $B \subseteq \prod_{i=1}^n [0,\ y/p_i]$, un pavé borné.

> ⚠️ **Sans $p\gg0$, $B$ n'est pas borné.** Si un prix $p_k$ valait $0$, la coordonnée $x_k$ pourrait croître indéfiniment sans jamais violer la contrainte. Weierstrass ne s'appliquerait plus, et — sous monotonicité stricte — il n'y aurait tout simplement **aucun** panier optimal. C'est la raison précise pour laquelle le livre impose $p_i>0$ plutôt que $p_i\geq0$.

**Compact.** Fermé et borné dans $\mathbb{R}^n$, donc compact (Heine-Borel).

**Convexe.** Soient $x,x'\in B$ et $t\in[0,1]$. Alors $tx+(1-t)x' \in \mathbb{R}^n_+$ (combinaison de vecteurs positifs à coefficients positifs), et par **linéarité** du produit scalaire :

$$p\cdot\big(tx+(1-t)x'\big) = t\,(p\cdot x) + (1-t)(p\cdot x') \leq t\,y + (1-t)\,y = y.$$

Donc $tx+(1-t)x' \in B$. $\blacksquare$

**Récapitulatif de ce que chaque propriété servira :**

| Propriété de $B$ | Où elle sert |
|---|---|
| non vide | Weierstrass exige un compact **non vide** |
| **compact** | existence de la solution (thm A1.10) |
| **convexe** | unicité, en combinaison avec la stricte quasiconcavité de $u$ |

</details>

## 🔴 Concept 2 — Le problème et sa structure mathématique

### 2.1 Les deux écritures du problème, et leur équivalence

Sous l'hypothèse 1.2, les préférences sont représentées par $u$ strictement croissante et strictement quasiconcave. Le problème (1.4) *« peut donc être posé de manière équivalente comme le problème de maximiser la fonction d'utilité sous la contrainte budgétaire »* :

$$\boxed{\;\max_{x \in \mathbb{R}^n_+} \ u(x) \quad \text{s.c.} \quad p \cdot x \leq y\;} \tag{1.5}$$

**L'argument d'équivalence, donné par le livre :**

> *« Notez que si $x^*$ résout ce problème, alors $u(x^*) \geq u(x)$ pour tout $x \in B$, ce qui signifie que $x^* \succsim x$ pour tout $x \in B$. C'est-à-dire, les solutions de (1.5) sont bien des solutions de (1.4). **La réciproque est également vraie.** »*

> **Le point logique.** L'équivalence repose entièrement sur le fait que la définition 1.5 est une **équivalence** : $u(x^*)\geq u(x) \iff x^*\succsim x$. Le passage de (1.4) à (1.5) n'est donc pas une approximation ni une simplification — c'est une **traduction exacte**. C'est ce qui justifie que toute la suite du chapitre travaille sur $u$ sans jamais revenir à $\succsim$.

### 2.2 Le triptyque existence / unicité / saturation

C'est **le** passage à savoir citer. Le livre : *« Nous devrions prendre un moment pour examiner la structure mathématique de ce problème. »*

**(a) EXISTENCE.**

> *« Comme nous l'avons noté, sous les hypothèses sur les préférences, la fonction d'utilité $u(x)$ est à valeurs réelles et **continue**. L'ensemble budgétaire $B$ est un sous-ensemble **non vide** (il contient $0 \in \mathbb{R}^n_+$), **fermé**, **borné** (parce que tous les prix sont strictement positifs), et donc **compact** de $\mathbb{R}^n$. Par le **théorème de Weierstrass**, théorème A1.10, nous sommes donc assurés qu'un maximum de $u(x)$ sur $B$ **existe**. »*

$$\underbrace{u \text{ continue}}_{\text{hyp. }1.2} \ + \ \underbrace{B \text{ compact non vide}}_{p\gg0,\ y\geq0} \ \xRightarrow{\ \text{Weierstrass}\ } \ \text{le maximum est ATTEINT}$$

**(b) UNICITÉ.**

> *« De plus, parce que $B$ est **convexe** et que la fonction objectif est **strictement quasiconcave**, le maximiseur de $u(x)$ sur $B$ est **unique**. »*

**(c) SATURATION DU BUDGET.**

> *« Parce que les préférences sont **strictement monotones**, la solution $x^*$ satisfera la contrainte budgétaire **avec égalité**, se situant **sur** la frontière de l'ensemble budgétaire plutôt qu'à l'intérieur. »*

$$p \cdot x^* = y$$

Et le livre ajoute une conséquence : *« Ainsi, quand $y>0$ et parce que $x^*\geq0$ mais $x^*\neq0$, nous savons que $x_i^*>0$ pour au moins un bien $i$. »*

> ⚠️ **La question d'oral type : « à quoi sert chaque hypothèse de l'hypothèse 1.2 ? »** La réponse tient dans ce triptyque, et il faut savoir l'écrire dans les deux sens.
>
> | Hypothèse sur $\succsim$ | Propriété de $u$ | Ce qu'elle produit |
> |---|---|---|
> | continuité (ax. 3) | $u$ continue | **existence** (avec $B$ compact) |
> | convexité stricte (ax. 5) | $u$ str. quasiconcave | **unicité** (avec $B$ convexe) |
> | monotonicité stricte (ax. 4) | $u$ str. croissante | **saturation** $p\cdot x^*=y$ |
> | complétude + transitivité (ax. 1-2) | $u$ existe | rend le problème (1.5) **équivalent** à (1.4) |
>
> Notez que **chacune** des trois premières a besoin d'une propriété de $B$ en face : compacité, convexité, et… rien pour la troisième — la saturation ne dépend que de $u$.

<details class="details--riche">
<summary>

**Exercice 1.16 — démontrer l'unicité et la saturation (indication du livre)**

</summary>

**Énoncé.** Prouver les assertions faites dans le texte sous l'hypothèse 1.2 : (a) Si $x^*$ résout le problème du consommateur, alors $x^*$ est **unique**. (b) $x^*$ **épuisera** le revenu du consommateur et satisfera $y = p\cdot x^*$.

**Indication du livre (p. 631), citée :** *« Pour (a), supposez qu'il existe un autre panier réalisable $x'$, où $x' \sim x^*$. Utilisez le fait que $B$ est convexe, ainsi que la convexité stricte des préférences, pour dériver une contradiction. Pour (b), supposez le contraire. Utilisez la monotonicité stricte pour dériver une contradiction. »*

*Développement pédagogique de ces deux indications.*

**(a) Unicité.** Supposons deux solutions $x^*$ et $x'$, avec $x' \neq x^*$. Comme les deux sont optimales, $u(x')=u(x^*)$, donc $x' \sim x^*$ et en particulier $x' \succsim x^*$.

Considérons le point milieu $x^t = \tfrac12 x' + \tfrac12 x^*$.

- **$x^t$ est réalisable** : $B$ est convexe (exercice 1.15), et $x',x^*\in B$, donc $x^t\in B$.
- **$x^t$ est strictement meilleur** : par l'**axiome 5** (convexité stricte), puisque $x'\neq x^*$ et $x'\succsim x^*$, on a $x^t \succ x^*$ pour tout $t\in(0,1)$, en particulier $t=\tfrac12$.

Donc $x^t \in B$ et $x^t \succ x^*$ : $x^*$ n'était pas optimal. **Contradiction.** $\blacksquare$

> **Où chaque ingrédient sert.** La convexité de $B$ garantit que le point milieu est *disponible* ; la convexité stricte de $\succsim$ garantit qu'il est *strictement meilleur*. Retirez l'une des deux et la preuve tombe — et effectivement, avec des préférences seulement convexes (axiome $5'$), la solution **peut** ne pas être unique : c'est l'objet de l'exercice 1.17.

**(b) Saturation.** Supposons au contraire $p\cdot x^* < y$. Posons $\delta \equiv y - p\cdot x^* > 0$.

Construisons un panier strictement meilleur et encore réalisable. Prenons

$$x' \equiv x^* + \varepsilon\,e, \qquad e=(1,\dots,1), \qquad \varepsilon \equiv \frac{\delta}{2\sum_i p_i} > 0.$$

- **$x'$ est réalisable** : $p\cdot x' = p\cdot x^* + \varepsilon \sum_i p_i = p\cdot x^* + \tfrac{\delta}{2} = y - \tfrac{\delta}{2} < y$. Et $x' \in \mathbb{R}^n_+$ puisque $x^*\geq0$ et $\varepsilon>0$.
- **$x'$ est strictement meilleur** : $x' \gg x^*$ (chaque coordonnée a strictement augmenté), donc par l'**axiome 4** (monotonicité stricte), $x' \succ x^*$.

Donc $x'\in B$ et $x'\succ x^*$ : contradiction avec l'optimalité de $x^*$. Donc $p\cdot x^* = y$. $\blacksquare$

> **Le détail à ne pas bâcler.** Il faut augmenter **toutes** les coordonnées pour obtenir $\gg$, car l'axiome 4 de ce livre n'accorde $\succ$ que sous $\gg$ (voir fiche 500, piège n° 4). Augmenter une seule coordonnée donnerait seulement $x' \geq x^*$, donc $x'\succsim x^*$ — insuffisant pour la contradiction. Le choix du pas $\varepsilon = \delta/(2\sum p_i)$ n'a rien de magique : n'importe quel $\varepsilon$ assez petit convient.

</details>

<details class="details--riche">
<summary>

**Exercice 1.17 — convexité sans convexité stricte : l'existence survit, l'unicité non**

</summary>

**Énoncé.** Supposons que les préférences soient **convexes mais non strictement convexes**. Donner un argument clair et convaincant montrant qu'une solution au problème du consommateur existe toujours, mais qu'elle **n'a pas besoin d'être unique**. Illustrer par un exemple à deux biens.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**L'existence survit — et c'est immédiat.** Relisez l'argument d'existence : il n'invoque que la **continuité** de $u$ et la **compacité** de $B$. Ni la convexité de $\succsim$ ni sa stricte convexité n'y interviennent. Weierstrass s'applique donc à l'identique et le maximum est atteint.

**L'unicité tombe.** La preuve de l'exercice 1.16(a) utilisait l'axiome **5** pour conclure $x^t \succ x^*$. Avec seulement l'axiome $5'$, on n'obtient que $x^t \succsim x^*$ — ce qui est compatible avec $x^t \sim x^*$, et donc avec l'existence de plusieurs optima.

**L'exemple à deux biens : les substituts parfaits.** Prenons $u(x_1,x_2)= x_1 + x_2$, qui satisfait l'axiome $5'$ mais pas l'axiome 5 (fiche 500, exercice 1.8). Avec $p_1 = p_2 = p$ et revenu $y$ :

- La contrainte s'écrit $p(x_1+x_2)\leq y$, donc $u(x)=x_1+x_2 \leq y/p$ pour tout $x\in B$.
- La valeur $y/p$ est atteinte par **tout** panier de la droite de budget : $(y/p,\,0)$, $(0,\,y/p)$, $(y/2p,\ y/2p)$, etc.

**L'ensemble des solutions est donc la droite de budget tout entière** — un continuum d'optima.

> **La géométrie derrière les deux cas.** Une solution multiple exige que la courbe d'indifférence optimale **coïncide** avec la droite de budget sur un segment. La convexité stricte interdit précisément les segments dans les ensembles d'indifférence (fiche 500, § « comment reconnaître qu'une carte viole l'axiome 5 ») — d'où l'unicité. Avec la convexité seule, ces segments sont autorisés, et il suffit que l'un d'eux ait la pente $-p_1/p_2$ pour que l'unicité tombe.
>
> ⚠️ **La conséquence pratique, souvent passée sous silence.** Sans unicité, $x^*$ n'est plus une **fonction** de $(p,y)$ mais une **correspondance**. Tout le §1.5 (Slutsky, élasticités) — qui dérive $x(p,y)$ — devient impossible tel quel. C'est la vraie raison pour laquelle le livre impose l'axiome 5 alors qu'il reconnaît que l'axiome $5'$ suffirait au « contenu prédictif ».

</details>

### 2.3 La demande marshallienne

> *« Il est clair que le vecteur solution $x^*$ dépend des paramètres du problème du consommateur. Parce qu'il sera **unique** pour des valeurs données de $p$ et $y$, nous pouvons proprement voir la solution de (1.5) comme une **fonction** de l'ensemble des prix et du revenu vers l'ensemble des quantités, $X = \mathbb{R}^n_+$. Nous écrirons donc souvent $x_i^* = x_i(p,y)$, $i=1,\dots,n$, ou, en notation vectorielle, $x^* = x(p,y)$. »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (dans le texte).</span>

*« Vues comme fonctions de $p$ et $y$, les solutions du problème de maximisation de l'utilité sont connues sous le nom de fonctions de demande **ordinaires**, ou **marshalliennes**. »*

</div>

$$\boxed{\;x(p,y) = \arg\max_{x\in\mathbb{R}^n_+} \ u(x) \quad \text{s.c.} \quad p\cdot x \leq y\;}$$

**La courbe de demande.** *« Lorsque le revenu et tous les prix autres que le prix propre du bien sont maintenus **fixes**, le graphe de la relation entre la quantité demandée de $x_i$ et son propre prix $p_i$ est la **courbe de demande** standard pour le bien $i$. »*

> ⚠️ **La demande marshallienne est une fonction de $n+1$ variables ; la courbe de demande n'en montre qu'une.** $x_1(p_1,p_2,y)$ dépend de $p_1$, de $p_2$ **et** de $y$. La « courbe de demande » est une **coupe** : on fixe $p_2$ et $y$, on fait varier $p_1$. Changer $p_2$ ou $y$ **déplace toute la courbe**. Confondre déplacement *le long* de la courbe et déplacement *de* la courbe est l'erreur la plus classique du chapitre.

**La construction géométrique (Fig. 1.11), pas à pas.**

| Étape | Panneau (a) — l'espace des biens | Panneau (b) — le plan $(x_1,p_1)$ |
|---|---|---|
| 1 | Aux prix $p_1^0, p_2^0$ et revenu $y^0$, la solution donne $x_1(p_1^0,p_2^0,y^0)$ et $x_2(p_1^0,p_2^0,y^0)$ | on reporte le point $\big(x_1(p_1^0,p_2^0,y^0),\ p_1^0\big)$ |
| 2 | À $p_1^1 < p_1^0$, même $p_2^0$ et même $y^0$ : nouvelle solution, $x_1$ plus grand | on reporte $\big(x_1(p_1^1,p_2^0,y^0),\ p_1^1\big)$ |
| 3 | En considérant **toutes** les valeurs de $p_1$ | on trace la **courbe de demande entière** pour le bien 1 |

> *« Comme vous pouvez facilement le vérifier, des niveaux de revenu différents et des prix différents du bien 2 feront changer la position et la forme de la courbe de demande pour le bien 1. Cette position et cette forme, cependant, seront **toujours déterminées par les propriétés de la relation de préférence sous-jacente** du consommateur. »*

## 🔴 Concept 3 — Le calcul : lagrangien et conditions de Kuhn-Tucker

### 3.1 L'hypothèse supplémentaire

> *« Si nous **renforçons** les exigences sur $u(x)$ pour y inclure la **différentiabilité**, nous pouvons utiliser les méthodes du calcul pour explorer davantage le comportement de demande. »*

Le problème, réécrit :

$$\max_{x\in\mathbb{R}^n_+} \ u(x) \quad \text{s.c.} \quad p\cdot x \leq y \tag{1.6}$$

> *« C'est un problème de **programmation non linéaire avec une contrainte d'inégalité**. Comme nous l'avons noté, une solution $x^*$ existe et est unique. »*

⚠️ Notez l'ordre logique : **l'existence et l'unicité ont déjà été établies sans calcul différentiel**. Le lagrangien ne sert qu'à *calculer* une solution dont on sait déjà qu'elle existe et qu'elle est seule. C'est une différence importante avec beaucoup de cours qui présentent Lagrange comme s'il démontrait quelque chose sur l'existence.

### 3.2 Le lagrangien

En réécrivant la contrainte $p\cdot x - y \leq 0$ :

$$\boxed{\;\mathcal{L}(x,\lambda) = u(x) - \lambda\,\big[\,p\cdot x - y\,\big]\;}$$

> *« En supposant que la solution $x^*$ est **strictement positive**, nous pouvons appliquer les méthodes de Kuhn-Tucker pour la caractériser. »*

### 3.3 Les conditions de Kuhn-Tucker

<div class="callout" data-kind="formel">

<span class="callout__lab">théorème A2.20</span>

*« Si $x^* \gg 0$ résout (1.6), alors par le , il existe un $\lambda^* \geq 0$ tel que $(x^*,\lambda^*)$ satisfont les conditions de Kuhn-Tucker suivantes : »*

</div>

$$\frac{\partial \mathcal{L}}{\partial x_i} = \frac{\partial u(x^*)}{\partial x_i} - \lambda^* p_i = 0, \qquad i = 1,\dots,n \tag{1.7}$$

$$p\cdot x^* - y \ \leq\ 0 \tag{1.8}$$

$$\lambda^*\big[\,p\cdot x^* - y\,\big] = 0 \tag{1.9}$$

| Condition | Nom | Ce qu'elle dit |
|---|---|---|
| (1.7) | stationnarité | le gradient de $u$ est proportionnel au vecteur des prix |
| (1.8) | réalisabilité | la contrainte est respectée |
| (1.9) | **complémentarité des écarts** | soit $\lambda^*=0$, soit la contrainte est saturée |

### 3.4 La simplification décisive

> *« Or, par **monotonicité stricte**, (1.8) doit être satisfaite **avec égalité**, de sorte que (1.9) devient **redondante**. Par conséquent, ces conditions se réduisent à : »*

$$\boxed{\begin{aligned} \frac{\partial \mathcal{L}}{\partial x_1} &= \frac{\partial u(x^*)}{\partial x_1} - \lambda^* p_1 = 0\\ &\ \ \vdots\\ \frac{\partial \mathcal{L}}{\partial x_n} &= \frac{\partial u(x^*)}{\partial x_n} - \lambda^* p_n = 0\\ p\cdot x^* - y &= 0 \end{aligned}} \tag{1.10}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que cette réduction fait gagner.</span>

Kuhn-Tucker, dans le cas général, oblige à **discuter des cas** : la contrainte est-elle active ou non ? Ici, la monotonicité stricte tranche d'avance — elle l'est **toujours**. On retombe donc sur les conditions ordinaires de Lagrange avec contrainte d'égalité. C'est la raison pour laquelle, dans la pratique du chapitre 1, on écrit directement le lagrangien avec un « $=$ » sans se poser de question.

</div>

$$\underbrace{n+1 \text{ équations}}_{n \text{ conditions } (1.7) \ + \ \text{le budget}} \qquad \underbrace{n+1 \text{ inconnues}}_{x_1^*,\dots,x_n^*,\ \lambda^*}$$

### 3.5 Ce que les conditions (1.10) racontent

**Pas 1 — le gradient est-il nul ?** *« Il y a deux possibilités. Soit $\nabla u(x^*) = 0$, soit $\nabla u(x^*)\neq 0$. Sous la monotonicité stricte, le premier cas est possible, mais **assez improbable**. Nous supposerons donc simplement que $\nabla u(x^*)\neq0$. »*

*(C'est le même « presque partout » que celui du contre-exemple $u(x)=x+\sin x$ de la fiche 500.)*

**Pas 2 — le multiplicateur est strictement positif.** Par monotonicité stricte, $\partial u(x^*)/\partial x_i > 0$ pour un certain $i$. Comme $p_i>0$ pour tout $i$, il est clair d'après (1.7) que

$$\lambda^* = \frac{u_i(x^*)}{p_i} > 0$$

**Pas 3 — l'utilité marginale est proportionnelle au prix.** Par conséquent, pour **tout** $j$ :

$$\frac{\partial u(x^*)}{\partial x_j} = \lambda^* p_j > 0$$

> *« … de sorte que **l'utilité marginale est proportionnelle au prix pour tous les biens à l'optimum**. »*

**Pas 4 — la condition de tangence.** En combinant les conditions pour deux biens $j$ et $k$ :

$$\boxed{\;\frac{\partial u(x^*)/\partial x_j}{\partial u(x^*)/\partial x_k} = \frac{p_j}{p_k}\;} \tag{1.11}$$

> *« Cela dit qu'à l'optimum, le **taux marginal de substitution entre deux biens quelconques doit être égal au rapport des prix des biens**. Dans le cas à deux biens, les conditions (1.10) exigent donc que la **pente de la courbe d'indifférence** passant par $x^*$ soit égale à la **pente de la contrainte budgétaire**, et que $x^*$ soit **sur** la droite de budget plutôt qu'à l'intérieur. »*

$$\text{TMS}_{jk}(x^*) = \frac{p_j}{p_k}$$

> **L'interprétation économique, en une phrase.** Le TMS est le taux d'échange auquel le consommateur est *indifférent* ; le rapport des prix est le taux d'échange auquel le *marché* lui permet d'échanger. À l'optimum, les deux coïncident : aucun réarrangement du panier ne peut plus améliorer sa situation. S'ils différaient, il y aurait un échange profitable disponible.
>
> **Lecture par le « bang pour l'euro » (pas 3).** $\partial u/\partial x_j = \lambda^* p_j$ se réécrit
>
> $$\frac{\partial u/\partial x_j}{p_j} = \lambda^* \quad \text{pour tout } j,$$
>
> c'est-à-dire : **le dernier euro dépensé rapporte la même utilité, quel que soit le bien sur lequel on le dépense**. Si ce n'était pas le cas, il faudrait transférer de l'euro du bien le moins rentable vers le plus rentable. $\lambda^*$ est cette utilité marginale commune de l'euro — l'**utilité marginale du revenu** (résultat démontré au §1.4, fiche 502).

<details class="details--riche">
<summary>

**Exercice 1.18 — la solution en coin : $x_1^*>0$, $x_2^*=0$**

</summary>

**Énoncé.** Considérer un cas à deux biens où $x_1^* > 0$ et $x_2^* = 0$ à la solution du problème du consommateur. Énoncer des conditions, semblables à celles de (1.11), qui caractérisent cette solution, et illustrer par un diagramme semblable à la Fig. 1.10.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Pourquoi (1.10) ne s'applique plus.** Le texte a supposé $x^*\gg0$ pour écrire (1.7) comme une **égalité**. Quand une coordonnée est nulle, on est au bord du domaine $\mathbb{R}^n_+$, et la condition de Kuhn-Tucker prend la forme d'une **inégalité**.

**Les conditions du théorème A2.20 dans le cas général** (contraintes de non-négativité incluses) : il existe $\lambda^*\geq0$ tel que, pour chaque $i$,

$$\frac{\partial u(x^*)}{\partial x_i} - \lambda^* p_i \ \leq\ 0, \qquad\text{et}\qquad x_i^*\left[\frac{\partial u(x^*)}{\partial x_i} - \lambda^* p_i\right] = 0.$$

Autrement dit : **égalité pour les biens consommés, inégalité $\leq$ pour les biens non consommés.**

**Application au cas $x_1^*>0$, $x_2^*=0$ :**

$$\frac{\partial u(x^*)}{\partial x_1} = \lambda^* p_1 \qquad\qquad \frac{\partial u(x^*)}{\partial x_2} \ \leq\ \lambda^* p_2$$

En divisant la seconde par la première (toutes deux positives) :

$$\boxed{\;\text{TMS}_{21}(x^*) = \frac{\partial u(x^*)/\partial x_2}{\partial u(x^*)/\partial x_1} \ \leq\ \frac{p_2}{p_1}\;}$$

à quoi s'ajoute la saturation $p_1x_1^* = y$, c'est-à-dire $x_1^* = y/p_1$.

**La lecture économique.** À l'optimum en coin, l'utilité que procurerait la première unité du bien 2 est **inférieure ou égale** à ce qu'elle coûte en unités du bien 1 sacrifiées. Le consommateur voudrait consommer une quantité **négative** du bien 2 s'il le pouvait ; la contrainte $x_2\geq0$ mord.

**Le diagramme.** La solution est le point $(y/p_1,\ 0)$, sur l'axe horizontal. La courbe d'indifférence qui y passe est **plus plate** que la droite de budget (en valeur absolue, sa pente $\text{TMS}_{12}$ est **supérieure** à $p_1/p_2$) : les deux ne sont **pas tangentes**, elles se croisent au bord.

> ⚠️ **Le sens de l'inégalité — la faute classique.** Écrite en $\text{TMS}_{12}$ (bien 1 au numérateur), la condition s'inverse : $\text{TMS}_{12}(x^*) \geq p_1/p_2$. Choisissez un sens et vérifiez-le sur le dessin avant de le poser en copie. Repère infaillible : **au coin sur l'axe du bien 1, le bien 1 est "trop bon" relativement à son prix**, donc son utilité marginale par euro est au moins aussi grande que celle du bien 2.
>
> **Pourquoi le cas ne se produit pas dans le corps du chapitre.** Sous des préférences à la Cobb-Douglas ou CES avec $\rho<1$, $\partial u/\partial x_i \to \infty$ quand $x_i\to0$ (conditions dites « d'Inada ») : il est toujours strictement profitable de consommer un peu de chaque bien, donc la solution est **intérieure**. C'est pourquoi les exemples du livre supposent tous « an interior solution ».

</details>

## 🔴 Concept 4 — Théorème 1.4 : les conditions du premier ordre suffisent

### 4.1 L'énoncé

> *« En général, les conditions (1.10) sont **seulement des conditions nécessaires** pour un optimum **local** (voir la fin de la section A2.3). Cependant, pour le problème particulier que nous avons ici, ces conditions nécessaires du premier ordre sont en fait **suffisantes pour un optimum global**. »*

> **THEOREM 1.4 — Sufficiency of Consumer's First-Order Conditions.** Suppose that $u(x)$ is **continuous** and **quasiconcave** on $\mathbb{R}^n_+$, and that $(p,y)\gg0$. If $u$ is **differentiable at $x^*$**, and $(x^*,\lambda^*)\gg0$ solves (1.10), then $x^*$ solves the consumer's maximisation problem at prices $p$ and income $y$.

> ⚠️ **Les hypothèses sont plus faibles que l'hypothèse 1.2 — et c'est le point.** — $u$ est seulement **quasiconcave**, pas *strictement* quasiconcave ; — $u$ n'est **pas** supposée strictement croissante ; — la différentiabilité n'est exigée **qu'au point $x^*$**, pas partout ; — en revanche on exige $(x^*,\lambda^*) \gg 0$ — donc une solution **intérieure** et un multiplicateur **strictement positif**. Le théorème 1.4 est donc un résultat autonome, applicable bien au-delà du cadre de l'hypothèse 1.2.

### 4.2 La preuve, pas à pas

**Le fait préliminaire, emprunté à l'exercice 1.28.**

> *« Nous emploierons le fait suivant, qu'on vous demande de prouver dans l'exercice 1.28 : pour tous $x, x^1 \geq 0$, parce que $u$ est **quasiconcave**, $\nabla u(x)\,(x^1-x) \geq 0$ dès que $u(x^1)\geq u(x)$ et que $u$ est différentiable en $x$. »*

$$u(x^1)\geq u(x) \quad\Longrightarrow\quad \nabla u(x)\cdot(x^1-x) \ \geq\ 0 \tag{$\star$}$$

**Les hypothèses, mises en forme.** Supposons $\nabla u(x^*)$ existe et $(x^*,\lambda^*)\gg0$ résout (1.10). Alors :

$$\nabla u(x^*) = \lambda^* p \tag{P.1}$$

$$p\cdot x^* = y \tag{P.2}$$

**Le raisonnement par l'absurde.** Si $x^*$ n'est pas maximisateur d'utilité, il existe $x^0 \geq 0$ tel que

$$u(x^0) > u(x^*), \qquad p\cdot x^0 \leq y.$$

**L'astuce de la contraction — pourquoi il faut passer par $tx^0$.** Le livre écrit :

> *« Parce que $u$ est **continue** et $y > 0$, les inégalités précédentes impliquent que »*

$$u(t x^0) > u(x^*) \tag{P.3}$$

$$p\cdot t x^0 < y \tag{P.4}$$

*« pour un certain $t\in[0,1]$ **assez proche de un**. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi cette étape est indispensable.</span>

L'hypothèse ne donne que $p\cdot x^0 \leq y$ — une inégalité **large**. Pour obtenir la contradiction finale il faut une inégalité **stricte**. En contractant légèrement le panier ($t$ juste en dessous de 1), on rend la contrainte strictement satisfaite ; la **continuité** de $u$ garantit qu'on ne perd pas la stricte préférence $u(tx^0)>u(x^*)$ en chemin, à condition que $t$ soit assez proche de 1. C'est là et seulement là que sert la continuité de $u$. *(Le cas $p\cdot x^0 < y$ d'emblée est couvert en prenant $t=1$.)*

</div>

**La contradiction.** Posons $x^1 = tx^0$. Alors :

$$\nabla u(x^*)\cdot(x^1 - x^*) \;\overset{\text{(P.1)}}{=}\; (\lambda^* p)\cdot(x^1-x^*) \;=\; \lambda^*\big(p\cdot x^1 - p\cdot x^*\big) \;\overset{\text{(P.2),(P.4)}}{<}\; \lambda^*\,(y - y) \;=\; 0.$$

Or par (P.3), $u(x^1) > u(x^*)$, ce qui par le fait $(\star)$ impose $\nabla u(x^*)\cdot(x^1-x^*) \geq 0$. **Contradiction.** $\blacksquare$

> ⚠️ **Une coquille du livre à connaître.** Dans le texte imprimé, la conclusion renvoie à *« (P.5) contredit le fait énoncé au début de la preuve »*, alors qu'**aucune équation n'est numérotée (P.5)** dans cette démonstration : le renvoi vise la chaîne d'inégalités ci-dessus. Ce n'est pas une erreur de lecture de votre part.
>
> **Où chaque hypothèse sert — la question type.**
>
> | Hypothèse | Rôle |
> |---|---|
> | $u$ **quasiconcave** | donne le fait $(\star)$ (exercice 1.28) |
> | $u$ **continue** | permet la contraction $t\to1$ en (P.3) |
> | $u$ différentiable **en $x^*$** | donne un sens à $\nabla u(x^*)$ |
> | $\lambda^* > 0$ | préserve le **sens** de l'inégalité quand on multiplie par $\lambda^*$ |
> | $y>0$ | assure que la contraction est possible |

### 4.3 Ce que le théorème 1.4 autorise en pratique

> *« Avec ce résultat de suffisance en main, **il suffit de trouver une solution $(x^*,\lambda^*)\gg0$ à (1.10)**. Notez que (1.10) est un système de $n+1$ équations en les $n+1$ inconnues $x_1^*,\dots,x_n^*,\lambda^*$. Ces équations peuvent typiquement être utilisées pour résoudre les fonctions de demande $x_i(p,y)$. »*

$$\boxed{\;\text{résoudre (1.10)} \ \Longrightarrow\ \text{on a l'optimum GLOBAL, pas seulement un point critique}\;}$$

<details class="details--riche">
<summary>

**Exercice 1.28 — le fait $(\star)$ qui porte la preuve du théorème 1.4**

</summary>

**Énoncé.** Dans la preuve du théorème 1.4 nous utilisons le fait que si $u(\cdot)$ est quasiconcave et différentiable en $x$ et que $u(y) \geq u(x)$, alors $\nabla u(x)\cdot(y-x)\geq0$. Prouver ce fait en deux étapes : (a) Prouver que si $u(y)\geq u(x)$, la quasiconcavité de $u$ et sa différentiabilité en $x$ impliquent que la dérivée de $u\big((1-t)x + ty\big)$ par rapport à $t$ doit être **non négative en $t=0$**. (b) Calculer cette dérivée en $t=0$ et montrer qu'elle vaut $\nabla u(x)\cdot(y-x)$.

**Indication du livre (p. 631), citée :** *« Pour la partie (a), supposez par l'absurde que la dérivée est négative. »*

*Développement pédagogique à partir de cette indication.*

**Mise en place.** Posons $\varphi(t) \equiv u\big((1-t)x + t y\big) = u\big(x + t(y-x)\big)$ pour $t\in[0,1]$. Alors $\varphi(0)=u(x)$ et $\varphi(1)=u(y)$.

**(a) $\varphi'(0)\geq0$.**

*Ce que donne la quasiconcavité.* Puisque $u(y)\geq u(x)$, la définition de la quasiconcavité donne, pour tout $t\in[0,1]$ :

$$\varphi(t) = u\big((1-t)x+ty\big) \ \geq\ \min\{u(x),u(y)\} = u(x) = \varphi(0).$$

Donc $\varphi(t) \geq \varphi(0)$ pour **tout** $t\in[0,1]$ : la fonction $\varphi$ ne descend jamais en dessous de sa valeur initiale.

*L'argument par l'absurde de l'indication.* Supposons $\varphi'(0) < 0$. Par définition de la dérivée,

$$\varphi'(0) = \lim_{t\to0^+}\frac{\varphi(t)-\varphi(0)}{t} < 0,$$

donc il existe $\bar t > 0$ tel que pour tout $t\in(0,\bar t\,)$ le quotient soit strictement négatif, c'est-à-dire $\varphi(t) < \varphi(0)$ — puisque $t>0$. Cela **contredit** l'inégalité établie ci-dessus. Donc $\varphi'(0)\geq0$.

**(b) Le calcul de $\varphi'(0)$.**

$\varphi$ est la composée de $t\mapsto x+t(y-x)$, affine, et de $u$, différentiable en $x$. Par la règle de dérivation en chaîne :

$$\varphi'(t) = \nabla u\big(x+t(y-x)\big)\cdot(y-x),$$

et en $t=0$ :

$$\varphi'(0) = \nabla u(x)\cdot(y-x).$$

**Conclusion.** En combinant (a) et (b) : $\nabla u(x)\cdot(y-x) \geq 0$. $\blacksquare$

> **La lecture géométrique du fait $(\star)$.** Le gradient $\nabla u(x)$ pointe vers l'augmentation d'utilité. Le fait dit : **si $y$ est au moins aussi bon que $x$, alors la direction $y-x$ ne s'éloigne pas du gradient** — l'angle entre les deux est au plus droit. C'est exactement la propriété de « support » des ensembles supérieurs convexes, et c'est ce qui rend une condition du **premier ordre** suffisante : sous quasiconcavité, il n'y a nulle part où le premier ordre puisse mentir.
>
> ⚠️ **Attention à la différentiabilité seulement en $x$.** L'énoncé n'exige pas que $u$ soit différentiable ailleurs. La preuve ci-dessus n'utilise effectivement la dérivée qu'en $t=0$, c'est-à-dire au point $x$ — c'est pourquoi elle passe par $\varphi'(0)$ et non par un théorème des accroissements finis sur $[0,1]$.

</details>

## 🔴 Concept 5 — Exemple 1.1 : la fonction d'utilité CES, de bout en bout

C'est **l'exemple de référence du chapitre**. Le livre le déroule intégralement ; le voici avec toutes les étapes intermédiaires explicitées.

### 5.1 L'énoncé

> *« La fonction $u(x_1,x_2)=\big(x_1^\rho + x_2^\rho\big)^{1/\rho}$, où $\rho \neq 0$ et $\rho < 1$, est connue sous le nom de **fonction d'utilité CES**. Vous pouvez facilement vérifier que cette fonction d'utilité représente des préférences **strictement monotones** et **strictement convexes**. »*

Le problème :

$$\max_{x_1,x_2} \ \big(x_1^\rho + x_2^\rho\big)^{1/\rho} \quad\text{s.c.}\quad p_1x_1 + p_2x_2 - y \leq 0 \tag{E.1}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi les deux restrictions sur $\rho$.</span>

$\rho\neq0$ parce que $1/\rho$ n'aurait pas de sens ; $\rho<1$ parce que c'est ce qui rend $u$ strictement quasiconcave. *(Le sigle CES signifie « Constant Elasticity of Substitution » ; le lien entre $\rho$ et l'élasticité de substitution est traité au chapitre 3 — voir fiche 507.)*

</div>

### 5.2 Le lagrangien et les conditions du premier ordre

$$\mathcal{L}(x_1,x_2,\lambda) \equiv \big(x_1^\rho+x_2^\rho\big)^{1/\rho} - \lambda\big(p_1x_1+p_2x_2-y\big)$$

> *« Parce que les préférences sont monotones, la contrainte budgétaire sera satisfaite avec **égalité** à la solution. En supposant une **solution intérieure**, les conditions de Kuhn-Tucker coïncident avec les conditions lagrangiennes ordinaires du premier ordre et les équations suivantes doivent tenir aux valeurs de solution $x_1$, $x_2$ et $\lambda$ : »*

$$\frac{\partial\mathcal{L}}{\partial x_1} = \big(x_1^\rho+x_2^\rho\big)^{(1/\rho)-1}\,x_1^{\rho-1} - \lambda p_1 = 0 \tag{E.2}$$

$$\frac{\partial\mathcal{L}}{\partial x_2} = \big(x_1^\rho+x_2^\rho\big)^{(1/\rho)-1}\,x_2^{\rho-1} - \lambda p_2 = 0 \tag{E.3}$$

$$\frac{\partial\mathcal{L}}{\partial\lambda} = p_1x_1+p_2x_2-y = 0 \tag{E.4}$$

> **Le détail du calcul de (E.2)**, laissé implicite par le livre. En posant $S = x_1^\rho+x_2^\rho$, on a $u = S^{1/\rho}$ et, par la règle de la chaîne :
>
> $$\frac{\partial u}{\partial x_1} = \frac{1}{\rho}\,S^{(1/\rho)-1}\cdot \frac{\partial S}{\partial x_1} = \frac{1}{\rho}\,S^{(1/\rho)-1}\cdot \rho\,x_1^{\rho-1} = S^{(1/\rho)-1}\,x_1^{\rho-1}.$$
>
> Les deux $\rho$ se simplifient — c'est ce qui rend la CES commode.

### 5.3 L'élimination de $\lambda$

> *« En réarrangeant (E.2) et (E.3), puis en divisant la première par la seconde et en réarrangeant encore, nous pouvons réduire ces trois équations à trois inconnues à seulement deux équations en les deux inconnues d'intérêt particulier, $x_1$ et $x_2$. »*

**Le détail.** De (E.2) et (E.3) :

$$\frac{S^{(1/\rho)-1}x_1^{\rho-1}}{S^{(1/\rho)-1}x_2^{\rho-1}} = \frac{\lambda p_1}{\lambda p_2} \qquad\Longrightarrow\qquad \left(\frac{x_1}{x_2}\right)^{\rho-1} = \frac{p_1}{p_2}$$

Le facteur commun $S^{(1/\rho)-1}$ **et** le multiplicateur $\lambda$ disparaissent simultanément. En élevant à la puissance $1/(\rho-1)$ :

$$\boxed{\;\frac{x_1}{x_2} = \left(\frac{p_1}{p_2}\right)^{1/(\rho-1)}\;} \tag{E.5}$$

$$y = p_1x_1 + p_2x_2 \tag{E.6}$$

> ⚠️ **Le sens de l'exposant.** Comme $\rho<1$, on a $\rho-1<0$, donc $1/(\rho-1)<0$ : lorsque $p_1$ **augmente**, le rapport $x_1/x_2$ **diminue**. C'est le comportement attendu — et une vérification de signe à faire systématiquement avant de continuer.
>
> **Cette équation, c'est la condition de tangence (1.11).** En effet $\big(x_1/x_2\big)^{\rho-1} = p_1/p_2$ n'est rien d'autre que $\text{TMS}_{12} = p_1/p_2$ pour la CES. L'élimination de $\lambda$ **est** le passage de (1.10) à (1.11) — appliqué à un cas concret.

### 5.4 La résolution

**Substituer (E.5) dans (E.6).** *« D'abord, substituer $x_1$ dans (E.6) à partir de (E.5) pour obtenir l'équation en $x_2$ seul : »*

$$y = p_1 x_2\left(\frac{p_1}{p_2}\right)^{1/(\rho-1)} + p_2 x_2 \;=\; x_2\Big(p_1^{\rho/(\rho-1)} + p_2^{\rho/(\rho-1)}\Big)\,p_2^{-1/(\rho-1)} \tag{E.7}$$

> **Le détail de la mise en facteur**, non explicité par le livre. Le premier terme vaut
>
> $$p_1 \cdot p_1^{1/(\rho-1)} \cdot p_2^{-1/(\rho-1)} = p_1^{1 + 1/(\rho-1)}\,p_2^{-1/(\rho-1)} = p_1^{\rho/(\rho-1)}\,p_2^{-1/(\rho-1)},$$
>
> car $1 + \dfrac{1}{\rho-1} = \dfrac{\rho-1+1}{\rho-1}=\dfrac{\rho}{\rho-1}$. Le second terme vaut $p_2 = p_2^{\,1+1/(\rho-1)}\cdot p_2^{-1/(\rho-1)} = p_2^{\rho/(\rho-1)}\,p_2^{-1/(\rho-1)}$. Le facteur commun $p_2^{-1/(\rho-1)}$ apparaît alors.

**Résoudre (E.7) pour $x_2$ :**

$$x_2 = \frac{p_2^{1/(\rho-1)}\,y}{p_1^{\rho/(\rho-1)} + p_2^{\rho/(\rho-1)}} \tag{E.8}$$

**Puis $x_1$ par (E.5) :**

$$x_1 = \frac{p_1^{1/(\rho-1)}\,y}{p_1^{\rho/(\rho-1)} + p_2^{\rho/(\rho-1)}} \tag{E.9}$$

### 5.5 La forme finale — le changement de variable

> *« Si nous définissons le paramètre $r = \rho/(\rho-1)$, nous pouvons simplifier (E.8) et (E.9) et écrire les demandes marshalliennes comme : »*

$$\boxed{\;x_1(p,y) = \frac{p_1^{\,r-1}\,y}{p_1^{\,r}+p_2^{\,r}}\;} \tag{E.10}$$

$$\boxed{\;x_2(p,y) = \frac{p_2^{\,r-1}\,y}{p_1^{\,r}+p_2^{\,r}}\;} \tag{E.11}$$

> **La vérification du changement de variable**, à savoir refaire : $r-1 = \dfrac{\rho}{\rho-1}-1 = \dfrac{\rho-(\rho-1)}{\rho-1} = \dfrac{1}{\rho-1}$. L'exposant $1/(\rho-1)$ du numérateur devient donc bien $r-1$, et $\rho/(\rho-1)$ au dénominateur devient $r$.

**Le commentaire du livre :**

> *« Notez que les solutions du problème du consommateur ne dépendent **que de ses paramètres**, $p_1$, $p_2$ et $y$. Des prix et un revenu différents, à travers (E.10) et (E.11), donneront des quantités différentes de chaque bien demandées. »*

Et la Fig. 1.12 refait pour la CES la construction de la Fig. 1.11 : le point $\big(p_1,\ x_1(p_1,\bar p_2,\bar y)\big)$ est **un** point de la courbe de demande du bien 1.

<details class="details--riche">
<summary>

**Vérifications à faire systématiquement sur (E.10)-(E.11)**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — les quatre contrôles de cohérence.</span>

</div>

Le livre s'arrête à (E.11). Ces quatre vérifications ne figurent pas dans le texte, mais elles détectent presque toutes les erreurs de calcul possibles sur cet exemple.

**1. La contrainte budgétaire est-elle saturée ?**

$$p_1x_1+p_2x_2 = \frac{p_1^{\,r}y + p_2^{\,r}y}{p_1^{\,r}+p_2^{\,r}} = y \quad$$

C'est le contrôle le plus rentable : il utilise les deux demandes à la fois.

**2. Homogénéité de degré zéro en $(p,y)$.** Remplaçons $(p,y)$ par $(tp,ty)$, $t>0$ :

$$x_1(tp,ty) = \frac{(tp_1)^{r-1}\,ty}{(tp_1)^r+(tp_2)^r} = \frac{t^{r-1}p_1^{r-1}\cdot t\,y}{t^r\big(p_1^r+p_2^r\big)} = \frac{t^{r}}{t^{r}}\cdot x_1(p,y) = x_1(p,y) \quad$$

*(C'est le théorème 1.10, démontré au §1.5 — fiche 503.)*

**3. Signe de $\partial x_1/\partial p_1$.** La demande doit décroître avec son propre prix. Comme $\rho<1$, $r=\rho/(\rho-1)$ est **négatif** lorsque $0<\rho<1$, et compris dans $(0,1)$ lorsque $\rho<0$. Dans les deux cas $r<1$, donc $r-1<0$ : le numérateur $p_1^{r-1}$ décroît en $p_1$. Le dénominateur, lui, varie ; le contrôle rapide se fait sur un cas particulier (voir le point 4).

**4. Le cas $\rho=0$ n'est pas dans le domaine — mais sa limite l'est.** Quand $\rho\to0$, $r=\rho/(\rho-1)\to0$, et (E.10) donne

$$x_1 \to \frac{p_1^{-1}y}{1+1} = \frac{y}{2p_1},$$

c'est-à-dire la demande **Cobb-Douglas** symétrique $u=\sqrt{x_1x_2}$ : le consommateur dépense la moitié de son revenu sur chaque bien. C'est le résultat classique, et il confirme que la formule est bien orientée. *(Ce lien entre CES et Cobb-Douglas à la limite $\rho\to0$ est démontré à l'exercice 3.17 du livre, avec l'indication d'utiliser la règle de L'Hôpital sur $\ln y$.)*

**Deux cas limites à connaître**, obtenus en faisant varier $\rho$ :

| $\rho$ | $u$ tend vers | Type de biens |
|---|---|---|
| $\rho \to 1$ | $x_1+x_2$ | **substituts parfaits** |
| $\rho \to 0$ | $\sqrt{x_1x_2}$ (Cobb-Douglas) | cas intermédiaire |
| $\rho \to -\infty$ | $\min\{x_1,x_2\}$ | **compléments parfaits** |

⚠️ Ces trois cas sont hors du domaine strict $\{\rho<1,\ \rho\neq0\}$ de l'exemple 1.1 — ce sont des **limites**, pas des valeurs admissibles.

</details>

<details class="details--riche">
<summary>

**Exercices 1.20 et 1.21 — la Cobb-Douglas, avec et sans logarithme**

</summary>

**Énoncé 1.20.** Supposons les préférences représentées par la fonction d'utilité Cobb-Douglas $u(x_1,x_2)=Ax_1^\alpha x_2^{1-\alpha}$, avec $0<\alpha<1$ et $A>0$. En supposant une **solution intérieure**, résoudre pour les fonctions de demande marshallienne.

**Énoncé 1.21.** Prendre la transformation logarithmique de la fonction d'utilité précédente ; puis, en l'utilisant comme fonction d'utilité, dériver les demandes marshalliennes et **vérifier qu'elles sont identiques** à celles de l'exercice précédent.

**Le livre ne donne pas d'indication pour ces deux exercices.** Corrigé pédagogique reconstitué.

**Exercice 1.20 — la voie directe.**

$$\mathcal{L} = Ax_1^\alpha x_2^{1-\alpha} - \lambda(p_1x_1+p_2x_2-y)$$

$$\frac{\partial\mathcal{L}}{\partial x_1} = \alpha A x_1^{\alpha-1}x_2^{1-\alpha} - \lambda p_1 = 0 \qquad \frac{\partial\mathcal{L}}{\partial x_2} = (1-\alpha)Ax_1^\alpha x_2^{-\alpha} - \lambda p_2 = 0$$

En divisant la première par la seconde, $A$ et $\lambda$ disparaissent :

$$\frac{\alpha\,x_1^{\alpha-1}x_2^{1-\alpha}}{(1-\alpha)\,x_1^{\alpha}x_2^{-\alpha}} = \frac{p_1}{p_2} \qquad\Longrightarrow\qquad \frac{\alpha}{1-\alpha}\cdot\frac{x_2}{x_1} = \frac{p_1}{p_2} \qquad\Longrightarrow\qquad p_2x_2 = \frac{1-\alpha}{\alpha}\,p_1x_1.$$

En reportant dans $p_1x_1+p_2x_2=y$ :

$$p_1x_1\left(1+\frac{1-\alpha}{\alpha}\right) = y \qquad\Longrightarrow\qquad p_1x_1\cdot\frac{1}{\alpha} = y$$

$$\boxed{\;x_1(p,y)=\frac{\alpha y}{p_1}\qquad\qquad x_2(p,y)=\frac{(1-\alpha)y}{p_2}\;}$$

> **Le résultat à mémoriser.** Sous Cobb-Douglas, le consommateur dépense une **part constante** $\alpha$ de son revenu sur le bien 1 et $1-\alpha$ sur le bien 2, **quels que soient les prix**. La constante $A$ n'apparaît nulle part — elle est éliminée dès la division, ce qui est la manifestation calculatoire de l'ordinalité (théorème 1.2).

**Exercice 1.21 — la voie logarithmique.**

$$v(x) = \ln u(x) = \ln A + \alpha\ln x_1 + (1-\alpha)\ln x_2$$

$$\frac{\partial v}{\partial x_1} = \frac{\alpha}{x_1} \qquad \frac{\partial v}{\partial x_2} = \frac{1-\alpha}{x_2}$$

Les conditions du premier ordre donnent $\dfrac{\alpha}{x_1}=\lambda p_1$ et $\dfrac{1-\alpha}{x_2}=\lambda p_2$, donc

$$\alpha = \lambda p_1x_1 \qquad 1-\alpha = \lambda p_2x_2.$$

En sommant : $1 = \lambda(p_1x_1+p_2x_2) = \lambda y$, donc $\lambda = 1/y$. En reportant :

$$x_1 = \frac{\alpha}{\lambda p_1} = \frac{\alpha y}{p_1} \qquad\qquad x_2 = \frac{(1-\alpha)y}{p_2} \quad$$

**Identiques.** $\blacksquare$

> **La leçon des deux exercices, et pourquoi le livre les met côte à côte.** Le théorème 1.2 garantit que $u$ et $\ln u$ représentent les **mêmes** préférences, donc conduisent aux **mêmes** choix. L'exercice 1.21 le vérifie sur un cas ; l'exercice 1.22 le démontre en général.
>
> **Le gain pratique est considérable :** la version logarithmique remplace un produit de puissances par une somme de logarithmes, dont les dérivées sont $\alpha/x_1$ au lieu de $\alpha Ax_1^{\alpha-1}x_2^{1-\alpha}$. Prenez le réflexe : **devant une Cobb-Douglas ou toute utilité multiplicative, passez au logarithme avant de dériver.**
>
> ⚠️ **Ce qui change et ce qui ne change pas.** Les demandes $x(p,y)$ sont identiques ; le **multiplicateur $\lambda^*$ ne l'est pas**. Ici $\lambda^*_{\ln} = 1/y$, alors que dans la version directe $\lambda^*_{u} = \alpha A x_1^{\alpha-1}x_2^{1-\alpha}/p_1$, une expression tout autre. C'est cohérent : $\lambda^*$ est l'**utilité marginale du revenu** (§1.4), donc une grandeur **cardinale** — elle dépend de la représentation choisie, exactement comme l'utilité marginale (fiche 500, §5.3).

</details>

<details class="details--riche">
<summary>

**Exercice 1.22 — l'invariance des demandes, en toute généralité**

</summary>

**Énoncé.** Supposons les préférences représentées par $u(x)$. En supposant une solution intérieure, les demandes $x(p,y)$ sont déterminées implicitement par les conditions (1.10). Considérer maintenant la fonction d'utilité $f(u(x))$, où $f'>0$, et montrer que les conditions du premier ordre caractérisant la solution **dans les deux cas** peuvent être réduites au **même système d'équations**. En conclure que le comportement de demande du consommateur est invariant aux transformations monotones positives de la fonction d'utilité.

**Indication du livre (p. 631), citée :** *« Utilisez une méthode semblable à celle employée en (1.11) pour éliminer le multiplicateur lagrangien et réduire les $(n+1)$ conditions à seulement $n$ conditions. »*

*Développement pédagogique à partir de cette indication.*

**Cas 1 — avec $u$.** Les conditions (1.10) s'écrivent $\dfrac{\partial u(x)}{\partial x_i} = \lambda p_i$ pour tout $i$, plus $p\cdot x = y$.

En divisant la condition $i$ par la condition $n$ (le multiplicateur disparaît) :

$$\frac{\partial u(x)/\partial x_i}{\partial u(x)/\partial x_n} = \frac{p_i}{p_n}, \qquad i=1,\dots,n-1, \qquad\text{plus}\qquad p\cdot x = y. \tag{S}$$

C'est un système de $n-1$ équations de tangence plus le budget, soit **$n$ équations à $n$ inconnues** $x_1,\dots,x_n$. Le multiplicateur a été éliminé.

**Cas 2 — avec $v = f\circ u$.** Par la règle de la chaîne,

$$\frac{\partial v(x)}{\partial x_i} = f'\big(u(x)\big)\cdot\frac{\partial u(x)}{\partial x_i}.$$

Les conditions du premier ordre pour $v$ s'écrivent $f'(u(x))\,\dfrac{\partial u(x)}{\partial x_i} = \mu\, p_i$, avec un multiplicateur $\mu$ propre à ce problème. En divisant la condition $i$ par la condition $n$ :

$$\frac{f'(u(x))\,\partial u(x)/\partial x_i}{f'(u(x))\,\partial u(x)/\partial x_n} = \frac{p_i}{p_n}.$$

Le facteur $f'(u(x))$, **commun au numérateur et au dénominateur, se simplifie** — c'est possible précisément parce que $f'>0$, donc $f'(u(x))\neq0$. On retrouve :

$$\frac{\partial u(x)/\partial x_i}{\partial u(x)/\partial x_n} = \frac{p_i}{p_n}, \qquad i=1,\dots,n-1,$$

et la contrainte budgétaire est la **même** dans les deux problèmes. Le système réduit est donc **identique** au système (S). $\blacksquare$

**Conclusion.** Les deux problèmes ont exactement le même système réduit, donc les mêmes solutions : $x^u(p,y) = x^v(p,y)$. Le comportement de demande est **invariant** aux transformations monotones positives.

> **Le lien avec le reste de la théorie.** C'est la troisième apparition du même phénomène : — fiche 500, thm 1.2 : $u$ et $f\circ u$ représentent les mêmes préférences ; — fiche 500, §5.3 : le TMS est invariant, car $f'(u)$ se simplifie dans le rapport ; — ici : les demandes sont invariantes, pour exactement la même raison. Le fil commun : **tout ce qui s'écrit comme un rapport d'utilités marginales est ordinal**. Ce qui ne s'écrit pas ainsi — l'utilité marginale seule, le multiplicateur $\lambda^*$ — ne l'est pas.
>
> ⚠️ **Le multiplicateur, lui, change.** En reprenant la condition $i$ : $\mu = f'(u(x))\,\lambda$. Comme $f'>0$, le **signe** est préservé, mais pas la valeur.

</details>

<details class="details--riche">
<summary>

**Exercices 1.25, 1.26, 1.27 — trois utilités à traiter différemment**

</summary>

**Le livre ne donne d'indication que pour 1.27 : *« Sketch out the indifference map »* — esquissez la carte d'indifférence.** Corrigés pédagogiques reconstitués.

**Exercice 1.25.** *Un consommateur aux préférences convexes et monotones consomme des quantités non négatives de $x_1$ et $x_2$. (a) Si $u(x_1,x_2)=x_1^\alpha x_2^{(1/2)-\alpha}$ représente ces préférences, quelles restrictions doivent porter sur $\alpha$ ? Expliquer. (b) Avec ces restrictions, calculer les demandes marshalliennes.*

**(a) Les restrictions.** Posons $\beta \equiv \tfrac12 - \alpha$, de sorte que $u = x_1^\alpha x_2^\beta$.

- **Monotonicité** (strictement croissante en chaque argument) : $\partial u/\partial x_1 = \alpha x_1^{\alpha-1}x_2^\beta > 0$ exige $\alpha>0$ ; de même $\beta>0$, soit $\alpha < \tfrac12$.
- **Convexité** (quasiconcavité de $u$) : une Cobb-Douglas $x_1^\alpha x_2^\beta$ à exposants **positifs** est toujours quasiconcave — sa transformée logarithmique $\alpha\ln x_1+\beta\ln x_2$ est **concave** (somme de concaves), et une transformation strictement croissante d'une fonction concave est quasiconcave.

$$\boxed{\;0 < \alpha < \tfrac12\;}$$

> **Le point subtil, et c'est ce que « Expliquer » demande.** Ici $\alpha+\beta = \tfrac12 < 1$ : la fonction est **homogène de degré $1/2$**, donc elle présente des **rendements décroissants** — elle est même **concave**, pas seulement quasiconcave. Rien dans les axiomes ne l'exige (la concavité est une propriété **cardinale**, non ordinale) ; c'est un accident de la représentation choisie. Ce qui est exigé, c'est seulement $\alpha>0$ et $\beta>0$.

**(b) Les demandes.** Le calcul est celui de l'exercice 1.20 avec les exposants $\alpha$ et $\beta$. En passant au logarithme, $\ln u = \alpha\ln x_1 + \beta\ln x_2$, et les conditions du premier ordre donnent $\alpha = \lambda p_1x_1$, $\beta = \lambda p_2 x_2$. En sommant : $\alpha+\beta = \lambda y$, donc $\lambda = (\alpha+\beta)/y = \tfrac{1}{2y}$.

$$x_1 = \frac{\alpha}{\lambda p_1} = \frac{\alpha}{\alpha+\beta}\cdot\frac{y}{p_1} = \frac{2\alpha\,y}{p_1} \qquad\qquad x_2 = \frac{\beta}{\alpha+\beta}\cdot\frac{y}{p_2} = \frac{(1-2\alpha)\,y}{p_2}$$

**Vérification :** $p_1x_1+p_2x_2 = 2\alpha y + (1-2\alpha)y = y$ , et les parts $2\alpha$ et $1-2\alpha$ somment bien à 1, avec $0<2\alpha<1$ .

> ⚠️ **La faute à ne pas commettre.** Les parts budgétaires sont $\dfrac{\alpha}{\alpha+\beta}$ et $\dfrac{\beta}{\alpha+\beta}$, **pas** $\alpha$ et $\beta$. Elles ne coïncident que si $\alpha+\beta=1$. Ici $\alpha+\beta=\tfrac12$, d'où le facteur 2.

**Exercice 1.26.** *Un consommateur de deux biens fait face à des prix positifs et a un revenu positif. Sa fonction d'utilité est $u(x_1,x_2)=x_1$. Dériver les demandes marshalliennes.*

**Le piège.** Cette fonction **ne satisfait pas l'hypothèse 1.2** : elle n'est pas strictement croissante en $x_2$ (elle en est indépendante), ni strictement quasiconcave. Les conditions (1.10) ne s'appliquent donc pas telles quelles — et **le lagrangien mène droit dans le mur** : la condition $\partial\mathcal{L}/\partial x_2 = 0 - \lambda p_2 = 0$ imposerait $\lambda=0$, ce qui contredirait $\partial\mathcal{L}/\partial x_1 = 1 - \lambda p_1 = 0$.

**Le raisonnement direct.** L'utilité ne dépend que de $x_1$ et croît avec lui. Pour maximiser $x_1$ sous $p_1x_1+p_2x_2\leq y$ avec $x_2\geq0$, il faut manifestement ne rien dépenser en bien 2 :

$$\boxed{\;x_1(p,y)=\frac{y}{p_1}\qquad\qquad x_2(p,y)=0\;}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que cet exercice enseigne.</span>

Les préférences sont **monotones** au sens faible mais pas au sens strict : le bien 2 est *neutre*. La solution est en **coin**, exactement le cas de l'exercice 1.18. Retenez le réflexe : **avant d'écrire un lagrangien, vérifiez que l'hypothèse 1.2 tient.** Sinon, raisonnez directement sur la structure du problème.

*(Notez que la contrainte budgétaire **est** saturée ici, malgré l'absence de monotonicité stricte — mais cela résulte du raisonnement direct, pas de l'exercice 1.16b.)*

</div>

**Exercice 1.27.** *Même cadre. $u(x_1,x_2) = \max[ax_1,\ ax_2] + \min[x_1,x_2]$, avec $0<a<1$. Dériver les demandes marshalliennes.*

**Indication du livre : esquissez la carte d'indifférence.** Suivons-la.

**Simplifier la fonction.** Notons $M=\max\{x_1,x_2\}$ et $m=\min\{x_1,x_2\}$. Alors $\max[ax_1,ax_2] = aM$ (puisque $a>0$), donc

$$u(x_1,x_2) = a\,M + m.$$

Comme $M+m = x_1+x_2$, on peut aussi écrire $u = a(x_1+x_2) + (1-a)\,m$, soit

$$\boxed{\;u(x_1,x_2) = a\,(x_1+x_2) + (1-a)\min\{x_1,x_2\}\;}$$

**Lecture de cette forme — c'est ce que la carte d'indifférence révèle.** $u$ est une **combinaison convexe** entre les substituts parfaits ($x_1+x_2$, poids $a$) et les compléments parfaits ($\min$, poids $1-a$). Les courbes d'indifférence sont des **lignes brisées** avec un coude sur la diagonale $x_1=x_2$ : de pente $-a/1$ d'un côté et $-1/a$ de l'autre. Comme $0<a<1$, on a $a < 1 < 1/a$ : le coude est **convexe** vers l'origine , mais les deux branches sont **linéaires** — donc l'axiome 5 est violé (fiche 500, §3.6).

**Résolution par comparaison des pentes.** Supposons $p_1 \leq p_2$ (le cas inverse est symétrique) et posons $\theta = p_1/p_2 \leq 1$.

| Configuration | Condition sur les prix | Solution |
|---|---|---|
| droite de budget **plus plate** que la branche droite du coude | $\theta < a$ | coin : tout en bien 1, $x=(y/p_1,\ 0)$ |
| pente intermédiaire | $a \leq \theta \leq 1/a$ … ici $a\leq\theta\leq1$ | **au coude** : $x_1=x_2=\dfrac{y}{p_1+p_2}$ |
| — | $\theta > 1/a$ (impossible si $\theta\leq1<1/a$) | — |

Donc, pour $p_1\leq p_2$ :

$$\boxed{\;x = \begin{cases} \left(\dfrac{y}{p_1},\ 0\right) & \text{si } \dfrac{p_1}{p_2} < a\\[3mm] \left(\dfrac{y}{p_1+p_2},\ \dfrac{y}{p_1+p_2}\right) & \text{si } a \leq \dfrac{p_1}{p_2} \leq 1 \end{cases}}$$

et symétriquement, pour $p_2 \leq p_1$ : coin en bien 2 si $p_2/p_1 < a$, coude sinon.

**Vérification du cas frontière $p_1/p_2 = a$.** Les deux solutions donnent la même utilité : — au coin : $u(y/p_1,0) = a\cdot y/p_1 + 0 = ay/p_1$ ; — au coude, avec $p_1 = ap_2$ : $u = a\cdot\dfrac{2y}{p_1+p_2} + (1-a)\dfrac{y}{p_1+p_2} = \dfrac{(1+a)y}{p_1+p_2} = \dfrac{(1+a)y}{ap_2+p_2}=\dfrac{y}{p_2} = \dfrac{ay}{p_1}$ . À la frontière exacte, **tout le segment** entre les deux est optimal — l'unicité tombe, ce qui est cohérent avec la violation de l'axiome 5.

> ⚠️ **Trois raisons pour lesquelles cet exercice résiste au lagrangien.** (i) $u$ n'est **pas différentiable** sur la diagonale ; (ii) elle n'est **pas strictement quasiconcave**, donc l'unicité n'est pas garantie ; (iii) la solution peut être en **coin**. C'est exactement pourquoi le livre indique « esquissez la carte » plutôt que « formez le lagrangien ».

</details>

## 🟠 Concept 6 — Théorème 1.5 : quand la demande est-elle différentiable ?

### 6.1 Le statut du résultat

<div class="callout" data-kind="formel">

<span class="callout__lab">théorème A2.21</span>

*« Enfin, un mot sur les propriétés de la fonction de demande $x(p,y)$ dérivée du problème de maximisation du consommateur. Nous avons fait assez d'hypothèses pour garantir (par le , le théorème du maximum) que $x(p,y)$ sera **continue** sur $\mathbb{R}^n_{++}$. Mais nous voudrons généralement plus que cela. Nous aimerions pouvoir considérer les **pentes des courbes de demande** et donc nous aimerions que $x(p,y)$ soit **différentiable**. À partir de ce point, nous supposerons simplement que $x(p,y)$ est différentiable chaque fois que nous en avons besoin. Mais juste pour vous faire savoir ce que cela implique, nous énonçons **sans démonstration** le résultat suivant. »*

</div>

> **THEOREM 1.5 — Differentiable Demand.** Let $x^*\gg0$ solve the consumer's maximisation problem at prices $p^0\gg0$ and income $y^0>0$. If — $u$ is **twice continuously differentiable** on $\mathbb{R}^n_{++}$, — $\partial u(x^*)/\partial x_i > 0$ for **some** $i=1,\dots,n$, and — the **bordered Hessian** of $u$ has a **non-zero determinant** at $x^*$, then $x(p,y)$ is differentiable at $(p^0,y^0)$.

### 6.2 Comment lire les trois conditions

| Condition | Ce qu'elle assure |
|---|---|
| $u$ deux fois continûment différentiable | on peut écrire le système (1.10) **et** le dériver |
| une utilité marginale strictement positive | garantit $\lambda^*>0$, donc que la contrainte est bien active |
| **hessien bordé** de déterminant non nul en $x^*$ | c'est la condition du **théorème des fonctions implicites** appliqué au système (1.10) |

> **L'idée derrière la troisième condition — pourquoi un hessien *bordé*.** Le système (1.10) définit $(x^*,\lambda^*)$ **implicitement** en fonction des paramètres $(p,y)$. Pour en déduire que $x^*$ dépend de façon différentiable de $(p,y)$, on applique le **théorème des fonctions implicites** : il exige que la matrice jacobienne du système par rapport aux variables $(x,\lambda)$ soit **inversible**. Or cette jacobienne est exactement le **hessien bordé** — le hessien de $u$, bordé d'une ligne et d'une colonne contenant le gradient de la contrainte, c'est-à-dire $-p$ :
>
> $$\begin{pmatrix} 0 & -p^{\mathsf T}\\ -p & H_u(x^*) \end{pmatrix}$$
>
> Un déterminant non nul est précisément la condition d'inversibilité.
>
> ⚠️ **Le théorème 1.5 est un résultat de *régularité*, pas d'existence.** L'existence et l'unicité de $x^*$ sont déjà acquises depuis le §2.2 sans aucune dérivée. Le théorème 1.5 dit seulement que la fonction $x(p,y)$ ainsi définie est **lisse** — ce qui autorisera, au §1.5, à écrire $\partial x_i/\partial p_j$ dans l'équation de Slutsky (fiche 503).

<details class="details--riche">
<summary>

**Exercice 1.29 — un agent à horizon infini : l'escompte et la série géométrique**

</summary>

**Énoncé.** Un agent à vie infinie possède 1 unité d'un bien qu'il consomme sur sa vie entière. Le bien est **parfaitement stockable** et il n'en recevra pas plus qu'il n'en a maintenant. Sa consommation en période $t$ est $x_t$, et son utilité de long terme est

$$u(x_0,x_1,x_2,\dots) = \sum_{t=0}^{\infty}\beta^t\ln(x_t), \qquad 0<\beta<1.$$

Calculer son niveau optimal de consommation à chaque période.

**Indication du livre (p. 631), citée :** *« Posez toutes les conditions du premier ordre. Regardez celle du choix de $x_0^*$. Utilisez la contrainte, et trouvez une série géométrique. Converge-t-elle ? »*

*Développement pédagogique à partir de cette indication.*

**La contrainte.** Le bien est parfaitement stockable et la dotation vaut 1 :

$$\sum_{t=0}^{\infty} x_t = 1.$$

**Le lagrangien.**

$$\mathcal{L} = \sum_{t=0}^{\infty}\beta^t\ln(x_t) - \lambda\left(\sum_{t=0}^{\infty}x_t - 1\right)$$

**Les conditions du premier ordre** (une par période) :

$$\frac{\partial\mathcal{L}}{\partial x_t} = \frac{\beta^t}{x_t} - \lambda = 0 \qquad\Longrightarrow\qquad x_t = \frac{\beta^t}{\lambda}, \qquad t = 0,1,2,\dots$$

**« Regardez celle du choix de $x_0^*$ ».** Pour $t=0$ : $x_0 = 1/\lambda$. Donc

$$x_t = \beta^t\,x_0.$$

La consommation **décroît géométriquement** au taux $\beta$ : l'agent escompte le futur, donc consomme davantage tôt.

**« Utilisez la contrainte, et trouvez une série géométrique. Converge-t-elle ? »**

$$1 = \sum_{t=0}^{\infty}x_t = x_0\sum_{t=0}^{\infty}\beta^t.$$

La série $\sum_{t\geq0}\beta^t$ est géométrique de raison $\beta$. **Elle converge** puisque $0<\beta<1$, et sa somme vaut $\dfrac{1}{1-\beta}$. D'où

$$1 = \frac{x_0}{1-\beta} \qquad\Longrightarrow\qquad x_0 = 1-\beta$$

$$\boxed{\;x_t^* = (1-\beta)\,\beta^t, \qquad t = 0,1,2,\dots\;}$$

**Vérifications.** — $\sum_t x_t^* = (1-\beta)\cdot\dfrac{1}{1-\beta} = 1$ (la dotation est épuisée) ; — $x_t^*>0$ pour tout $t$ (solution intérieure, cohérent avec $\ln$ qui interdit $x_t=0$) ; — quand $\beta\to1$ (agent patient), $x_0^*\to0$ : il étale sa consommation à l'infini ; — quand $\beta\to0$ (agent impatient), $x_0^*\to1$ : il consomme tout immédiatement.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi l'indication insiste sur la convergence.</span>

Si l'on avait $\beta\geq1$, la série divergerait et **aucune** allocation ne satisferait la contrainte avec des $x_t$ proportionnels à $\beta^t$ : le problème n'aurait pas de solution de cette forme. L'hypothèse $0<\beta<1$ n'est donc pas cosmétique — c'est ce qui rend le problème bien posé.

**Ce que l'exercice illustre du §1.3.** Le cadre est **exactement** celui du problème du consommateur, avec une infinité de biens (« consommer en période $t$ » est un bien distinct pour chaque $t$), des prix tous égaux à 1, et un revenu de 1. La méthode ne change pas : lagrangien, conditions du premier ordre, élimination du multiplicateur par la contrainte. C'est le pont vers le §5.4 du livre (« Contingent Plans », fiche 512), où le temps devient un indice de bien à part entière.

</div>

</details>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Une fonction $u$ explicite + « dériver les demandes marshalliennes » | **Résolution directe** | Vérifier l'hypothèse 1.2 → lagrangien → éliminer $\lambda$ par division → substituer dans le budget |
| « Prouver que la solution est unique / que le budget est saturé » | **Structure du problème** | Par l'absurde, avec l'axiome 5 (unicité) ou l'axiome 4 (saturation) |
| « Prouver que $B$ est compact / convexe » | **Propriétés de l'ensemble budgétaire** | Fermé $\cap$ borné ($p\gg0$ !) ; convexité par linéarité de $p\cdot x$ |
| « $x_1^*>0$ et $x_2^*=0$ », ou une $u$ non strictement croissante | **Solution en coin** | Kuhn-Tucker en inégalité : $\text{TMS} \leq$ rapport des prix |
| Une $u$ transformée ($\ln u$, $f\circ u$) | **Invariance** | Diviser deux conditions du premier ordre : $f'(u)$ se simplifie |
| $\min$, $\max$, valeur absolue dans $u$ | **Non-différentiabilité** | Ne pas écrire de lagrangien — dessiner la carte, comparer les pentes |
| Une somme infinie escomptée $\sum \beta^t$ | **Horizon infini** | Une condition du premier ordre par période ; sommer la série géométrique |

**Les trois questions à se poser avant d'écrire quoi que ce soit :**

1. **L'hypothèse 1.2 tient-elle ?** $u$ est-elle continue, strictement croissante, strictement quasiconcave ? Sinon, ni l'unicité ni la saturation ne sont acquises, et le lagrangien peut échouer (exercice 1.26).
2. **La solution est-elle intérieure ?** Si $\partial u/\partial x_i \to\infty$ quand $x_i\to0$ (Cobb-Douglas, CES, log), oui. Sinon, envisager un coin.
3. **$u$ est-elle différentiable partout ?** Un $\min$ ou un $\max$ crée un coude : le calcul différentiel ne s'applique pas au coude.

## Comment résoudre ce type d'exercice — la méthode standard, en six pas

### Le canevas complet

**Pas 0 — vérifier les hypothèses.** Une ligne : *« $u$ est continue, strictement croissante et strictement quasiconcave sur $\mathbb{R}^2_{++}$, donc l'hypothèse 1.2 est satisfaite ; $B$ est compact et convexe puisque $p\gg0$ ; la solution existe, est unique, et sature le budget. »* Cette ligne vaut des points et évite les pièges.

**Pas 1 — simplifier $u$ si possible.** Devant un produit de puissances, **passer au logarithme** (thm 1.2 le permet, exercice 1.22 le justifie). Le gain de calcul est systématique.

**Pas 2 — écrire le lagrangien.**

$$\mathcal{L}(x,\lambda) = u(x) - \lambda\big[p\cdot x - y\big]$$

**Pas 3 — conditions du premier ordre.** $\partial\mathcal{L}/\partial x_i = 0$ pour chaque $i$, plus $p\cdot x = y$. *(L'égalité budgétaire est justifiée par la monotonicité stricte — le dire.)*

**Pas 4 — éliminer $\lambda$.** **Diviser** la condition $i$ par la condition $j$. C'est le geste central : le multiplicateur disparaît, et l'on obtient la condition de tangence

$$\frac{\partial u/\partial x_i}{\partial u/\partial x_j} = \frac{p_i}{p_j}.$$

On en tire une relation entre $x_i$ et $x_j$.

**Pas 5 — substituer dans le budget** et résoudre pour une variable, puis remonter aux autres.

**Pas 6 — vérifier.** Quatre contrôles, dans cet ordre de rentabilité :

| Contrôle | Ce qu'il détecte |
|---|---|
| $p_1x_1+p_2x_2 = y$ | presque toute erreur d'algèbre |
| $x(tp,ty)=x(p,y)$ (homogénéité de degré 0) | une erreur d'exposant |
| $x_i > 0$ | une solution en coin manquée |
| $\partial x_i/\partial p_i < 0$ (cas normal) | une inversion de signe |

### Variante — la solution en coin

Si la solution intérieure donne un $x_i^* \leq 0$, ou si $u$ n'est pas strictement croissante en $x_i$ :

1. Poser $x_i^*=0$ et résoudre le problème restreint aux autres biens.
2. Vérifier la condition de Kuhn-Tucker en inégalité : $$\frac{\partial u(x^*)}{\partial x_i} \ \leq\ \lambda^* p_i.$$
3. Si elle est violée, le coin n'est pas optimal — recommencer.

### Variante — $u$ non différentiable ($\min$, $\max$)

1. **Dessiner** la carte d'indifférence ; identifier les coudes et les segments linéaires.
2. Comparer la **pente de la droite de budget** $-p_1/p_2$ aux pentes des branches.
3. Distinguer les régimes selon la position relative des pentes : coin, coude, ou segment entier.
4. Vérifier les **cas frontières** en comparant les utilités des deux candidats.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut faire |
|---|---|---|---|
| 1 | Croire que le lagrangien démontre l'existence de la solution | L'existence vient de **Weierstrass** sur un compact, avant tout calcul | Établir existence/unicité/saturation **avant** de dériver |
| 2 | Oublier que $p\gg0$ est ce qui rend $B$ **borné** | Avec $p_k=0$, $x_k$ peut croître sans limite et Weierstrass tombe | Citer explicitement « borné parce que tous les prix sont strictement positifs » |
| 3 | Attribuer l'unicité à la convexité de $B$ seule | Il faut **aussi** la stricte quasiconcavité de $u$ | Nommer les **deux** ingrédients |
| 4 | Attribuer la saturation à la convexité | C'est la **monotonicité stricte** (axiome 4) | $p\cdot x^*=y$ ⇐ axiome 4 |
| 5 | Dans la preuve de saturation, augmenter **une seule** coordonnée | L'axiome 4 n'accorde $\succ$ que sous $\gg$ | Augmenter **toutes** les coordonnées : $x'=x^*+\varepsilon e$ |
| 6 | Traiter la complémentarité des écarts (1.9) comme une contrainte active | Sous monotonicité stricte, (1.8) est une égalité, donc (1.9) est **redondante** | Le dire, puis l'oublier |
| 7 | Écrire $\lambda^*\geq0$ et s'arrêter là | On démontre $\lambda^*>0$ **strictement** via $\lambda^*=u_i(x^*)/p_i$ | Justifier la stricte positivité |
| 8 | Inverser (1.11) : $\text{TMS}_{jk}=p_k/p_j$ | Le bien $j$ est au numérateur des deux côtés | $\dfrac{\partial u/\partial x_j}{\partial u/\partial x_k}=\dfrac{p_j}{p_k}$ |
| 9 | Croire que (1.10) ne donne qu'un optimum **local** | C'est vrai en général, **faux ici** : le théorème 1.4 les rend suffisantes | Citer le thm 1.4 |
| 10 | Dans la preuve du thm 1.4, oublier la contraction $t\to1$ | L'hypothèse donne $p\cdot x^0 \leq y$ ; il faut du **strict** pour conclure | Passer par $x^1 = tx^0$ et invoquer la **continuité** |
| 11 | Croire que le thm 1.4 exige la stricte quasiconcavité | Il n'exige que la **quasiconcavité**, et la différentiabilité **au seul point $x^*$** | Recopier les hypothèses exactes |
| 12 | Écrire un lagrangien pour $u=\min\{\cdot,\cdot\}$ ou $u=x_1$ | $u$ n'est pas différentiable, ou pas strictement croissante | Raisonner sur la carte (ex. 1.27) ou directement (ex. 1.26) |
| 13 | Confondre déplacement **le long** de la courbe de demande et **de** la courbe | $x_1(p_1,p_2,y)$ dépend aussi de $p_2$ et $y$ | Un changement de $p_2$ ou $y$ **déplace** la courbe |
| 14 | Croire que $\lambda^*$ est invariant par transformation monotone | $\mu = f'(u)\,\lambda$ : le multiplicateur est **cardinal** | Seules les **demandes** et le **TMS** sont invariants |
| 15 | Sous Cobb-Douglas $x_1^\alpha x_2^\beta$, écrire les parts comme $\alpha$ et $\beta$ | Les parts sont $\dfrac{\alpha}{\alpha+\beta}$ et $\dfrac{\beta}{\alpha+\beta}$ | Elles ne valent $\alpha,\beta$ que si $\alpha+\beta=1$ |
| 16 | Sur la CES, oublier que $r-1 = 1/(\rho-1)$ | C'est l'identité qui rend (E.10)-(E.11) correctes | Vérifier : $\dfrac{\rho}{\rho-1}-1=\dfrac{1}{\rho-1}$ |
| 17 | Utiliser $\rho=0$ dans la CES | Le domaine est $\rho<1$ **et** $\rho\neq0$ ; Cobb-Douglas est une **limite** | Traiter $\rho\to0$ par L'Hôpital (ex. 3.17) |
| 18 | Croire que le thm 1.5 démontre l'existence de $x(p,y)$ | C'est un résultat de **régularité** ; l'existence est acquise depuis Weierstrass | Le présenter comme la condition du **théorème des fonctions implicites** |
| 19 | Oublier de vérifier la saturation en fin de calcul | C'est le contrôle qui attrape le plus d'erreurs | Toujours recalculer $p\cdot x$ |
| 20 | Traiter l'horizon infini sans vérifier la convergence de la série | Si $\beta\geq1$ la contrainte n'est satisfaite par aucune allocation de cette forme | Vérifier $0<\beta<1$ et sommer $\dfrac{1}{1-\beta}$ |

## 📌 Ultimate Review

**L'environnement.** Économie de marché · un marché et un prix $p_i>0$ par bien, donc $p\gg0$ · consommateur **insignifiant**, donc **preneur de prix** · revenu fixe $y\geq0$.

**L'ensemble budgétaire.**

$$B = \{x \mid x\in\mathbb{R}^n_+,\ p\cdot x \leq y\}$$

**non vide** ($0\in B$), **fermé**, **borné** (car $p\gg0$), donc **compact**, et **convexe**.

**Les deux écritures du problème, équivalentes.**

$$\underbrace{x^*\in B \text{ tel que } x^*\succsim x \ \forall x\in B}_{(1.4)} \qquad\Longleftrightarrow\qquad \underbrace{\max_{x\in\mathbb{R}^n_+} u(x) \text{ s.c. } p\cdot x\leq y}_{(1.5)}$$

**Le triptyque.**

| Ingrédient | + | Ingrédient | ⇒ | Résultat |
|---|---|---|---|---|
| $u$ continue | + | $B$ compact non vide | ⇒ | **existence** (Weierstrass, A1.10) |
| $u$ str. quasiconcave | + | $B$ convexe | ⇒ | **unicité** |
| $\succsim$ str. monotone |  |  | ⇒ | **saturation** $p\cdot x^*=y$ |

⇒ $x^*$ est une **fonction** : la **demande marshallienne** $x(p,y)$.

**Le calcul.**

$$\mathcal{L}(x,\lambda)=u(x)-\lambda[p\cdot x-y]$$

Kuhn-Tucker (A2.20) : (1.7) stationnarité · (1.8) réalisabilité · (1.9) complémentarité. Monotonicité stricte ⇒ (1.8) est une **égalité** ⇒ (1.9) **redondante** ⇒ système (1.10), $n+1$ équations, $n+1$ inconnues.

**Les trois conséquences.**

$$\lambda^* = \frac{u_i(x^*)}{p_i} > 0 \qquad \frac{\partial u(x^*)}{\partial x_j}=\lambda^* p_j \qquad \boxed{\text{TMS}_{jk}(x^*)=\frac{p_j}{p_k}} \tag{1.11}$$

Lecture « bang pour l'euro » : $\dfrac{\partial u/\partial x_j}{p_j}=\lambda^*$ pour tout $j$ — le dernier euro rapporte autant partout.

**Théorème 1.4 (suffisance).** $u$ continue et **quasiconcave** sur $\mathbb{R}^n_+$, $(p,y)\gg0$, $u$ différentiable **en $x^*$**, $(x^*,\lambda^*)\gg0$ résout (1.10) ⇒ $x^*$ est l'optimum **global**. *Preuve : fait $(\star)$ de l'exercice 1.28 ($u(x^1)\geq u(x)\Rightarrow\nabla u(x)\cdot(x^1-x)\geq0$) ; par l'absurde, contracter $x^0$ en $tx^0$ pour rendre la contrainte stricte ; contradiction sur le signe de $\nabla u(x^*)\cdot(x^1-x^*)$.*

**Exemple 1.1 — CES.** $u=(x_1^\rho+x_2^\rho)^{1/\rho}$, $\rho<1$, $\rho\neq0$. Avec $r=\dfrac{\rho}{\rho-1}$ et donc $r-1=\dfrac{1}{\rho-1}$ :

$$x_1(p,y)=\frac{p_1^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}} \qquad\qquad x_2(p,y)=\frac{p_2^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}}$$

**Cobb-Douglas $Ax_1^\alpha x_2^{1-\alpha}$.**

$$x_1=\frac{\alpha y}{p_1} \qquad x_2=\frac{(1-\alpha)y}{p_2}$$

Parts budgétaires **constantes** ; $A$ n'intervient pas.

**Théorème 1.5 (demande différentiable).** $u$ deux fois $C^1$ sur $\mathbb{R}^n_{++}$ · une utilité marginale $>0$ · **hessien bordé** de déterminant non nul en $x^*$ ⇒ $x(p,y)$ différentiable en $(p^0,y^0)$. *(Condition du théorème des fonctions implicites appliqué à (1.10).)* Avant cela, le **théorème du maximum** (A2.21) donne déjà la **continuité** de $x(p,y)$.

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quelles sont les quatre hypothèses sur l'environnement économique du consommateur ?**

</summary>

1. Un **marché par bien**, avec un prix $p_i$ qui y prévaut.
2. Les prix sont **strictement positifs** : $p\gg0$.
3. Le consommateur est une **force insignifiante** sur chaque marché — donc **preneur de prix** : $p$ est fixé de son point de vue.
4. Le revenu monétaire $y \geq 0$ est **fixe**.

</details>

<details class="details--riche">
<summary>

**2. Que signifie techniquement « preneur de prix » ?**

</summary>

Que $p$ est un **paramètre** du problème, jamais une variable de choix. C'est ce qui permet d'écrire la solution comme une fonction $x(p,y)$ — donc de parler de courbe de demande.

Économiquement : *« la taille de chaque marché relativement aux achats potentiels du consommateur est si grande que, quelle que soit la quantité qu'il achète, il n'y aura aucun effet perceptible sur aucun prix. »*

</details>

<details class="details--riche">
<summary>

**3. Écrire l'ensemble budgétaire et dire quelle hypothèse le rend borné.**

</summary>

$$B = \{x \mid x\in\mathbb{R}^n_+,\ p\cdot x \leq y\}$$

C'est **$p\gg0$** qui le rend borné : de $p_ix_i \leq p\cdot x \leq y$ et $p_i>0$ on tire $x_i \leq y/p_i$.

⚠️ Si un seul prix valait 0, $B$ serait non borné, Weierstrass ne s'appliquerait plus, et sous monotonicité stricte il n'y aurait **aucun** optimum.

</details>

<details class="details--riche">
<summary>

**4. Pourquoi (1.4) et (1.5) sont-ils exactement équivalents ?**

</summary>

Parce que la définition 1.5 est une **équivalence** : $u(x^*)\geq u(x) \iff x^*\succsim x$. Le livre : *« les solutions de (1.5) sont bien des solutions de (1.4). La réciproque est également vraie. »*

Ce n'est donc ni une approximation ni une simplification, mais une **traduction exacte** — ce qui justifie que tout le reste du chapitre travaille sur $u$ sans jamais revenir à $\succsim$.

</details>

<details class="details--riche">
<summary>

**5. Le triptyque : quelle hypothèse produit quel résultat ?**

</summary>

| Hypothèse sur $\succsim$ | Propriété de $u$ | + propriété de $B$ | ⇒ |
|---|---|---|---|
| continuité (ax. 3) | continue | compact non vide | **existence** |
| convexité stricte (ax. 5) | str. quasiconcave | convexe | **unicité** |
| monotonicité stricte (ax. 4) | str. croissante | — | **saturation** $p\cdot x^*=y$ |

</details>

<details class="details--riche">
<summary>

**6. Démontrer l'unicité de la solution.**

</summary>

Par l'absurde. Soient $x^*\neq x'$ deux solutions ; alors $u(x')=u(x^*)$, donc $x'\succsim x^*$.

- Le point milieu $x^t=\tfrac12x'+\tfrac12x^*$ est **réalisable** car $B$ est **convexe**.
- Par l'**axiome 5** (convexité stricte), $x^t \succ x^*$.

Donc $x^*$ n'était pas optimal. Contradiction. $\blacksquare$

⚠️ Les **deux** ingrédients sont nécessaires : convexité de $B$ (le milieu est disponible) et convexité stricte de $\succsim$ (le milieu est meilleur).

</details>

<details class="details--riche">
<summary>

**7. Démontrer la saturation du budget.**

</summary>

Par l'absurde. Si $p\cdot x^* < y$, posons $\delta = y - p\cdot x^* > 0$ et

$$x' = x^* + \varepsilon e, \qquad e=(1,\dots,1),\qquad \varepsilon = \frac{\delta}{2\sum_i p_i}>0.$$

- $p\cdot x' = p\cdot x^* + \tfrac{\delta}{2} = y - \tfrac{\delta}{2} < y$, donc $x'\in B$.
- $x' \gg x^*$, donc par l'**axiome 4**, $x' \succ x^*$.

Contradiction. $\blacksquare$

⚠️ Il faut augmenter **toutes** les coordonnées : l'axiome 4 de ce livre n'accorde $\succ$ que sous $\gg$.

</details>

<details class="details--riche">
<summary>

**8. Que se passe-t-il si les préférences sont convexes mais pas strictement ?**

</summary>

- L'**existence survit** : l'argument de Weierstrass n'utilise que la continuité de $u$ et la compacité de $B$.
- L'**unicité tombe** : avec l'axiome $5'$ on n'obtient que $x^t \succsim x^*$, compatible avec plusieurs optima.

**Exemple :** $u=x_1+x_2$ avec $p_1=p_2=p$ — toute la droite de budget est optimale.

⚠️ **Conséquence méthodologique** : $x^*$ n'est plus une fonction mais une **correspondance**, et tout le §1.5 (Slutsky, élasticités) devient impossible tel quel.

</details>

<details class="details--riche">
<summary>

**9. Qu'est-ce que la demande marshallienne, et de combien de variables dépend-elle ?**

</summary>

$$x(p,y) = \arg\max_{x\in\mathbb{R}^n_+} u(x) \quad\text{s.c.}\quad p\cdot x\leq y$$

Elle dépend de **$n+1$ variables** : les $n$ prix et le revenu. Le livre l'appelle aussi demande **ordinaire**.

⚠️ La **courbe de demande** n'en est qu'une **coupe** : on fixe $p_{-i}$ et $y$, on fait varier $p_i$. Changer $p_{-i}$ ou $y$ **déplace toute la courbe**.

</details>

<details class="details--riche">
<summary>

**10. Écrire le lagrangien et les trois conditions de Kuhn-Tucker.**

</summary>

$$\mathcal{L}(x,\lambda)=u(x)-\lambda\big[p\cdot x - y\big]$$

$$\frac{\partial u(x^*)}{\partial x_i}-\lambda^* p_i = 0 \ \ (i=1,\dots,n) \tag{1.7}$$

$$p\cdot x^* - y \leq 0 \tag{1.8}$$

$$\lambda^*\big[p\cdot x^* - y\big] = 0 \tag{1.9}$$

Théorème invoqué : **A2.20** (Kuhn-Tucker), sous l'hypothèse $x^*\gg0$.

</details>

<details class="details--riche">
<summary>

**11. Pourquoi (1.9) devient-elle redondante ?**

</summary>

Parce que la **monotonicité stricte** force (1.8) à être satisfaite **avec égalité** : $p\cdot x^* - y = 0$. Le crochet de (1.9) est alors nul quel que soit $\lambda^*$, et la condition n'apporte plus rien.

**Le gain :** on évite la discussion de cas « contrainte active / inactive » qu'exige Kuhn-Tucker en général, et l'on retombe sur les conditions ordinaires de Lagrange avec contrainte d'égalité.

</details>

<details class="details--riche">
<summary>

**12. Combien d'équations et d'inconnues dans le système (1.10) ?**

</summary>

$$\boxed{\ n+1 \text{ équations},\ n+1 \text{ inconnues}\ }$$

Équations : les $n$ conditions de stationnarité $\partial u/\partial x_i = \lambda p_i$, plus la contrainte budgétaire. Inconnues : $x_1^*,\dots,x_n^*$ et $\lambda^*$.

</details>

<details class="details--riche">
<summary>

**13. Pourquoi $\lambda^* > 0$ strictement ?**

</summary>

Par monotonicité stricte, $\partial u(x^*)/\partial x_i > 0$ pour au moins un $i$. Comme $p_i>0$, la condition (1.7) donne

$$\lambda^* = \frac{u_i(x^*)}{p_i} > 0.$$

Il en résulte que **pour tout $j$**, $\partial u(x^*)/\partial x_j = \lambda^* p_j > 0$ : l'utilité marginale est **proportionnelle au prix** à l'optimum.

*(On suppose au passage $\nabla u(x^*)\neq0$ — cas que le livre juge « possible mais assez improbable » sous monotonicité stricte.)*

</details>

<details class="details--riche">
<summary>

**14. Énoncer et interpréter la condition (1.11).**

</summary>

$$\frac{\partial u(x^*)/\partial x_j}{\partial u(x^*)/\partial x_k} = \frac{p_j}{p_k} \qquad\text{c'est-à-dire}\qquad \text{TMS}_{jk}(x^*)=\frac{p_j}{p_k}$$

**Interprétation.** Le TMS est le taux d'échange auquel le consommateur est *indifférent* ; le rapport des prix est celui que le *marché* lui offre. À l'optimum, les deux coïncident — sinon un échange profitable resterait disponible.

**Géométriquement (deux biens) :** la pente de la courbe d'indifférence en $x^*$ égale celle de la droite de budget, et $x^*$ est **sur** la droite, pas à l'intérieur.

</details>

<details class="details--riche">
<summary>

**15. Donner la lecture « bang pour l'euro » des conditions du premier ordre.**

</summary>

De $\partial u/\partial x_j = \lambda^* p_j$ on tire

$$\frac{\partial u/\partial x_j}{p_j} = \lambda^* \qquad \text{pour tout } j.$$

**Le dernier euro dépensé rapporte la même utilité, quel que soit le bien.** Si ce n'était pas le cas, il faudrait transférer de la dépense du bien le moins rentable vers le plus rentable.

$\lambda^*$ est cette utilité marginale commune de l'euro — l'**utilité marginale du revenu**, démontrée comme telle au §1.4.

</details>

<details class="details--riche">
<summary>

**16. Énoncer le théorème 1.4 avec ses hypothèses exactes.**

</summary>

Si $u$ est **continue** et **quasiconcave** sur $\mathbb{R}^n_+$, si $(p,y)\gg0$, si $u$ est **différentiable en $x^*$**, et si $(x^*,\lambda^*)\gg0$ résout (1.10), alors $x^*$ résout le problème de maximisation.

⚠️ Les hypothèses sont **plus faibles** que l'hypothèse 1.2 : $u$ n'est que quasiconcave (pas strictement), n'est pas supposée strictement croissante, et n'est différentiable **qu'au point $x^*$**. En revanche on exige $(x^*,\lambda^*)\gg0$.

</details>

<details class="details--riche">
<summary>

**17. Quel est le fait $(\star)$ sur lequel repose la preuve du théorème 1.4 ?**

</summary>

$$u(x^1)\geq u(x) \quad\Longrightarrow\quad \nabla u(x)\cdot(x^1-x) \geq 0$$

valable dès que $u$ est **quasiconcave** et différentiable en $x$ (exercice 1.28).

**Lecture géométrique :** si $x^1$ est au moins aussi bon que $x$, la direction $x^1-x$ ne s'éloigne pas du gradient — l'angle est au plus droit. C'est ce qui rend une condition du premier ordre **suffisante** sous quasiconcavité.

</details>

<details class="details--riche">
<summary>

**18. Pourquoi la preuve du théorème 1.4 passe-t-elle par $x^1=tx^0$ ?**

</summary>

Parce que l'hypothèse ne donne que $p\cdot x^0 \leq y$, une inégalité **large**, alors que la contradiction finale exige une inégalité **stricte**.

En contractant légèrement le panier ($t$ juste sous 1), on rend la contrainte strictement satisfaite ; la **continuité** de $u$ garantit que $u(tx^0)>u(x^*)$ tient encore pour $t$ assez proche de 1.

C'est le seul endroit de la preuve où la continuité de $u$ sert.

</details>

<details class="details--riche">
<summary>

**19. Dérouler la contradiction finale du théorème 1.4.**

</summary>

Avec $\nabla u(x^*)=\lambda^*p$ (P.1) et $p\cdot x^*=y$ (P.2) et $p\cdot x^1<y$ (P.4) :

$$\nabla u(x^*)\cdot(x^1-x^*) = \lambda^*\big(p\cdot x^1 - p\cdot x^*\big) < \lambda^*(y-y)=0.$$

Or $u(x^1)>u(x^*)$ impose, par $(\star)$, $\nabla u(x^*)\cdot(x^1-x^*)\geq0$. **Contradiction.**

⚠️ Le passage à l'inégalité stricte exige $\lambda^*>0$ — c'est là que sert l'hypothèse $(x^*,\lambda^*)\gg0$.

</details>

<details class="details--riche">
<summary>

**20. Écrire l'utilité CES, son domaine de paramètre, et ses demandes.**

</summary>

$$u(x_1,x_2)=\big(x_1^\rho+x_2^\rho\big)^{1/\rho}, \qquad \rho<1,\ \rho\neq0$$

Avec $r=\dfrac{\rho}{\rho-1}$ (donc $r-1=\dfrac{1}{\rho-1}$) :

$$x_1(p,y)=\frac{p_1^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}} \qquad\qquad x_2(p,y)=\frac{p_2^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}}$$

⚠️ $\rho\neq0$ parce que $1/\rho$ n'aurait pas de sens ; $\rho<1$ parce que c'est ce qui rend $u$ strictement quasiconcave.

</details>

<details class="details--riche">
<summary>

**21. Sur la CES, quelle est l'étape qui fait disparaître à la fois $\lambda$ et le facteur commun ?**

</summary>

La **division de (E.2) par (E.3)** :

$$\frac{S^{(1/\rho)-1}x_1^{\rho-1}}{S^{(1/\rho)-1}x_2^{\rho-1}}=\frac{\lambda p_1}{\lambda p_2} \qquad\Longrightarrow\qquad \left(\frac{x_1}{x_2}\right)^{\rho-1}=\frac{p_1}{p_2}$$

où $S=x_1^\rho+x_2^\rho$. Le facteur $S^{(1/\rho)-1}$ **et** $\lambda$ disparaissent en même temps.

C'est exactement le passage de (1.10) à (1.11) — la condition de tangence appliquée à un cas concret.

</details>

<details class="details--riche">
<summary>

**22. Quels sont les trois cas limites de la CES ?**

</summary>

| $\rho$ | $u$ tend vers | Type de biens |
|---|---|---|
| $\rho\to1$ | $x_1+x_2$ | **substituts parfaits** |
| $\rho\to0$ | $\sqrt{x_1x_2}$ | **Cobb-Douglas** |
| $\rho\to-\infty$ | $\min\{x_1,x_2\}$ | **compléments parfaits** |

⚠️ Ce sont des **limites** : aucun de ces trois cas n'appartient au domaine $\{\rho<1,\ \rho\neq0\}$ de l'exemple 1.1.

Vérification pour $\rho\to0$ : $r\to0$, donc $x_1\to \dfrac{p_1^{-1}y}{2}=\dfrac{y}{2p_1}$ — la moitié du revenu sur chaque bien .

</details>

<details class="details--riche">
<summary>

**23. Donner les demandes Cobb-Douglas et le résultat qualitatif à retenir.**

</summary>

Pour $u=Ax_1^\alpha x_2^{1-\alpha}$, $0<\alpha<1$, $A>0$ :

$$x_1(p,y)=\frac{\alpha y}{p_1} \qquad\qquad x_2(p,y)=\frac{(1-\alpha)y}{p_2}$$

**Le résultat qualitatif :** le consommateur dépense une **part constante** $\alpha$ de son revenu sur le bien 1, **quels que soient les prix**.

La constante $A$ disparaît dès la division des conditions du premier ordre — manifestation calculatoire de l'ordinalité.

⚠️ Pour $u=x_1^\alpha x_2^\beta$ avec $\alpha+\beta\neq1$, les parts sont $\dfrac{\alpha}{\alpha+\beta}$ et $\dfrac{\beta}{\alpha+\beta}$, **pas** $\alpha$ et $\beta$.

</details>

<details class="details--riche">
<summary>

**24. Pourquoi passer au logarithme avant de dériver une Cobb-Douglas ?**

</summary>

Parce que le théorème 1.2 garantit que $u$ et $\ln u$ représentent les **mêmes** préférences, donc donnent les **mêmes** demandes (exercice 1.22).

Le gain : $\ln u = \ln A + \alpha\ln x_1 + \beta \ln x_2$ a pour dérivées $\alpha/x_1$ et $\beta/x_2$ — au lieu de $\alpha Ax_1^{\alpha-1}x_2^{\beta}$.

⚠️ Ce qui change tout de même : le **multiplicateur**. Ici $\lambda^*_{\ln}=1/y$, une expression bien plus simple que $\lambda^*_u$ — normal, $\lambda^*$ est une grandeur **cardinale**.

</details>

<details class="details--riche">
<summary>

**25. Démontrer l'invariance des demandes aux transformations monotones (exercice 1.22).**

</summary>

Avec $v=f\circ u$, $f'>0$ : $\dfrac{\partial v}{\partial x_i}=f'(u(x))\,\dfrac{\partial u}{\partial x_i}$.

Les conditions du premier ordre pour $v$ : $f'(u)\,\dfrac{\partial u}{\partial x_i}=\mu p_i$. En divisant la condition $i$ par la condition $n$, le facteur $f'(u)$ — **commun aux deux membres** — se simplifie :

$$\frac{\partial u/\partial x_i}{\partial u/\partial x_n}=\frac{p_i}{p_n}.$$

Le système réduit ($n-1$ tangences + budget) est **identique** dans les deux cas, donc les solutions le sont. $\blacksquare$

Le multiplicateur, lui, change : $\mu = f'(u)\,\lambda$.

</details>

<details class="details--riche">
<summary>

**26. Comment caractériser une solution en coin $x_1^*>0$, $x_2^*=0$ ?**

</summary>

Kuhn-Tucker donne **égalité pour les biens consommés, inégalité pour les autres** :

$$\frac{\partial u(x^*)}{\partial x_1}=\lambda^* p_1 \qquad\qquad \frac{\partial u(x^*)}{\partial x_2}\ \leq\ \lambda^* p_2$$

En divisant : $\text{TMS}_{21}(x^*) \leq \dfrac{p_2}{p_1}$, plus la saturation $x_1^*=y/p_1$.

**Lecture :** la première unité du bien 2 rapporterait moins qu'elle ne coûte en bien 1 sacrifié. La contrainte $x_2\geq0$ **mord**.

⚠️ Vérifier le sens de l'inégalité sur le dessin avant de la poser : écrite en $\text{TMS}_{12}$, elle s'inverse.

</details>

<details class="details--riche">
<summary>

**27. Pourquoi le cas en coin n'apparaît-il pas dans les exemples du chapitre ?**

</summary>

Parce que les utilités employées (Cobb-Douglas, CES avec $\rho<1$, log) satisfont les **conditions d'Inada** : $\partial u/\partial x_i \to\infty$ quand $x_i\to0$.

Il est alors toujours strictement profitable de consommer un peu de chaque bien, et la solution est **intérieure**. C'est pourquoi le livre écrit systématiquement *« assuming an interior solution »*.

</details>

<details class="details--riche">
<summary>

**28. Comment traiter $u(x_1,x_2)=x_1$ (exercice 1.26) ?**

</summary>

**Pas par le lagrangien.** La condition $\partial\mathcal{L}/\partial x_2 = -\lambda p_2 = 0$ imposerait $\lambda=0$, ce qui contredirait $\partial\mathcal{L}/\partial x_1 = 1-\lambda p_1=0$.

$u$ n'est pas strictement croissante en $x_2$ (le bien 2 est **neutre**) : l'hypothèse 1.2 tombe.

**Raisonnement direct :** maximiser $x_1$ sous $p_1x_1+p_2x_2\leq y$ conduit à ne rien dépenser en bien 2 :

$$x_1=\frac{y}{p_1}, \qquad x_2=0.$$

**Le réflexe à prendre :** vérifier l'hypothèse 1.2 **avant** d'écrire un lagrangien.

</details>

<details class="details--riche">
<summary>

**29. Comment traiter $u=\max[ax_1,ax_2]+\min[x_1,x_2]$ (exercice 1.27) ?**

</summary>

**L'indication du livre :** esquisser la carte d'indifférence.

**Simplification :** $u = a(x_1+x_2)+(1-a)\min\{x_1,x_2\}$ — une combinaison convexe entre substituts parfaits et compléments parfaits. Les courbes d'indifférence sont des **lignes brisées** coudées sur la diagonale, de pentes $-a$ et $-1/a$.

**Résolution par comparaison de pentes** (cas $p_1\leq p_2$) :

| Condition | Solution |
|---|---|
| $p_1/p_2 < a$ | coin : $(y/p_1,\ 0)$ |
| $a \leq p_1/p_2 \leq 1$ | au coude : $x_1=x_2=\dfrac{y}{p_1+p_2}$ |

⚠️ Trois raisons de ne pas dériver : $u$ non différentiable au coude, non strictement quasiconcave, solution possiblement en coin.

</details>

<details class="details--riche">
<summary>

**30. Résoudre le problème à horizon infini (exercice 1.29).**

</summary>

$\max \sum_{t\geq0}\beta^t\ln x_t$ sous $\sum_{t\geq0}x_t = 1$, avec $0<\beta<1$.

Conditions du premier ordre : $\dfrac{\beta^t}{x_t}=\lambda$, donc $x_t = \beta^t x_0$.

Contrainte : $1 = x_0\sum_{t\geq0}\beta^t = \dfrac{x_0}{1-\beta}$ — la série géométrique **converge** puisque $0<\beta<1$.

$$\boxed{x_t^* = (1-\beta)\beta^t}$$

**Lecture :** consommation décroissante géométriquement. $\beta\to1$ (patient) ⇒ étalement ; $\beta\to0$ (impatient) ⇒ tout consommé immédiatement.

</details>

<details class="details--riche">
<summary>

**31. Que dit le théorème 1.5, et que ne dit-il pas ?**

</summary>

**Il dit :** si $u$ est deux fois continûment différentiable sur $\mathbb{R}^n_{++}$, si une utilité marginale est strictement positive en $x^*$, et si le **hessien bordé** de $u$ a un **déterminant non nul** en $x^*$, alors $x(p,y)$ est **différentiable** en $(p^0,y^0)$.

**Il ne dit pas** que la solution existe : cela vient de Weierstrass, sans aucune dérivée. C'est un résultat de **régularité**.

Le livre l'énonce **sans démonstration**, et précise qu'avant cela le **théorème du maximum** (A2.21) donne déjà la **continuité** de $x(p,y)$.

</details>

<details class="details--riche">
<summary>

**32. Pourquoi un hessien *bordé*, et pourquoi son déterminant ?**

</summary>

Le système (1.10) définit $(x^*,\lambda^*)$ **implicitement** en fonction de $(p,y)$. Pour conclure à la différentiabilité de $x(p,y)$, on applique le **théorème des fonctions implicites**, qui exige que la jacobienne du système par rapport à $(x,\lambda)$ soit **inversible**.

Cette jacobienne est le hessien de $u$ **bordé** par le gradient de la contrainte :

$$\begin{pmatrix} 0 & -p^{\mathsf T}\\ -p & H_u(x^*)\end{pmatrix}$$

Un déterminant non nul est exactement la condition d'inversibilité.

</details>

<details class="details--riche">
<summary>

**33. Les quatre contrôles à faire après tout calcul de demande.**

</summary>

| Contrôle | Ce qu'il détecte |
|---|---|
| $p\cdot x(p,y)=y$ | presque toute erreur d'algèbre — **le plus rentable** |
| $x(tp,ty)=x(p,y)$ | une erreur d'exposant (homogénéité de degré 0) |
| $x_i>0$ | une solution en coin manquée |
| $\partial x_i/\partial p_i<0$ | une inversion de signe |

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les quatre hypothèses sur l'environnement ? | Un marché par bien · $p\gg0$ · consommateur **insignifiant** (preneur de prix) · revenu $y\geq0$ fixe |
| Que veut dire « preneur de prix », techniquement ? | $p$ est un **paramètre**, jamais une variable de choix — d'où $x(p,y)$ |
| L'ensemble budgétaire ? | $B=\{x \mid x\in\mathbb{R}^n_+,\ p\cdot x\leq y\}$ |
| Quelle hypothèse rend $B$ **borné** ? | **$p\gg0$** : $p_ix_i\leq y$ donne $x_i\leq y/p_i$ |
| Les cinq propriétés de $B$ ? | Non vide · fermé · borné · donc **compact** · et **convexe** |
| Écriture (1.4) du problème ? | $x^*\in B$ tel que $x^*\succsim x$ pour tout $x\in B$ |
| Écriture (1.5) ? | $\max_{x\in\mathbb{R}^n_+} u(x)$ s.c. $p\cdot x\leq y$ |
| Pourquoi (1.4) $\iff$ (1.5) ? | Parce que la déf. 1.5 est une **équivalence** : $u(x^*)\geq u(x)\iff x^*\succsim x$ |
| Qu'est-ce qui donne l'**existence** ? | $u$ continue + $B$ compact non vide ⇒ **Weierstrass** (thm A1.10) |
| Qu'est-ce qui donne l'**unicité** ? | $u$ **str. quasiconcave** + $B$ **convexe** |
| Qu'est-ce qui donne la **saturation** ? | Préférences **strictement monotones** (axiome 4) ⇒ $p\cdot x^*=y$ |
| Preuve de l'unicité, en une ligne ? | Milieu de deux optima : réalisable ($B$ convexe) et **strictement meilleur** (ax. 5) ⇒ contradiction |
| Preuve de la saturation, en une ligne ? | $x'=x^*+\varepsilon e \gg x^*$, encore réalisable ⇒ $x'\succ x^*$ ⇒ contradiction |
| Dans cette preuve, combien de coordonnées augmenter ? | **Toutes** — l'axiome 4 n'accorde $\succ$ que sous $\gg$ |
| Si $\succsim$ est convexe mais pas strictement ? | Existence **oui**, unicité **non** — ex. $u=x_1+x_2$ avec $p_1=p_2$ |
| Conséquence méthodologique de la non-unicité ? | $x^*$ devient une **correspondance** : plus de Slutsky, plus d'élasticités |
| La demande marshallienne ? | $x(p,y)$ = solution de (1.5), fonction de $n$ prix **et** du revenu |
| Autre nom de la demande marshallienne ? | Demande **ordinaire** |
| Courbe de demande vs fonction de demande ? | La courbe est une **coupe** : $p_{-i}$ et $y$ fixés. Les changer **déplace** la courbe |
| Le lagrangien ? | $\mathcal{L}(x,\lambda)=u(x)-\lambda[p\cdot x-y]$ |
| Condition (1.7) ? | $\partial u(x^*)/\partial x_i - \lambda^* p_i = 0$ — stationnarité |
| Condition (1.8) ? | $p\cdot x^*-y\leq0$ — réalisabilité |
| Condition (1.9) ? | $\lambda^*[p\cdot x^*-y]=0$ — **complémentarité des écarts** |
| Pourquoi (1.9) est-elle redondante ici ? | La monotonicité stricte force (1.8) à l'**égalité** |
| Taille du système (1.10) ? | **$n+1$ équations, $n+1$ inconnues** ($x_1^*,\dots,x_n^*,\lambda^*$) |
| Théorème invoqué pour Kuhn-Tucker ? | **A2.20** |
| Pourquoi $\lambda^*>0$ ? | $\lambda^*=u_i(x^*)/p_i$ avec $u_i>0$ (monotonicité) et $p_i>0$ |
| Que vaut $\partial u(x^*)/\partial x_j$ à l'optimum ? | $\lambda^* p_j$ — l'utilité marginale est **proportionnelle au prix** |
| La condition (1.11) ? | $\text{TMS}_{jk}(x^*)=\dfrac{p_j}{p_k}$ — **tangence** |
| Interprétation de (1.11) ? | Le taux d'échange **indifférent** égale le taux d'échange **du marché** |
| Lecture « bang pour l'euro » ? | $\dfrac{\partial u/\partial x_j}{p_j}=\lambda^*$ pour tout $j$ — le dernier euro rapporte autant partout |
| Que représente $\lambda^*$ ? | L'**utilité marginale du revenu** (démontrée au §1.4) |
| Théorème 1.4 — ce qu'il affirme ? | Les conditions (1.10) sont **suffisantes** pour un optimum **global** |
| Hypothèses exactes du thm 1.4 ? | $u$ continue et **quasiconcave** · $(p,y)\gg0$ · $u$ différentiable **en $x^*$** · $(x^*,\lambda^*)\gg0$ |
| Le thm 1.4 exige-t-il la stricte quasiconcavité ? | **Non** — ni la stricte croissance, ni la différentiabilité partout |
| Le fait $(\star)$ de l'exercice 1.28 ? | $u(x^1)\geq u(x) \Rightarrow \nabla u(x)\cdot(x^1-x)\geq0$ (sous quasiconcavité) |
| Lecture géométrique de $(\star)$ ? | L'angle entre $\nabla u(x)$ et $x^1-x$ est **au plus droit** |
| Pourquoi contracter $x^0$ en $tx^0$ ? | Pour passer de $p\cdot x^0\leq y$ (large) à $p\cdot x^1<y$ (**strict**) — c'est là que sert la continuité |
| L'utilité CES ? | $u=(x_1^\rho+x_2^\rho)^{1/\rho}$, $\rho<1$, $\rho\neq0$ |
| Le changement de variable de la CES ? | $r=\dfrac{\rho}{\rho-1}$, donc $r-1=\dfrac{1}{\rho-1}$ |
| Les demandes CES ? | $x_i=\dfrac{p_i^{\,r-1}y}{p_1^{\,r}+p_2^{\,r}}$ |
| L'étape-clé du calcul CES ? | **Diviser** (E.2) par (E.3) : $\lambda$ **et** le facteur $S^{(1/\rho)-1}$ disparaissent |
| CES quand $\rho\to1$ ? | $x_1+x_2$ — **substituts parfaits** |
| CES quand $\rho\to0$ ? | Cobb-Douglas $\sqrt{x_1x_2}$ |
| CES quand $\rho\to-\infty$ ? | $\min\{x_1,x_2\}$ — **compléments parfaits** |
| Les demandes Cobb-Douglas ? | $x_1=\dfrac{\alpha y}{p_1}$, $x_2=\dfrac{(1-\alpha)y}{p_2}$ |
| Le fait qualitatif à retenir de Cobb-Douglas ? | **Parts budgétaires constantes**, indépendantes des prix |
| Parts pour $x_1^\alpha x_2^\beta$ avec $\alpha+\beta\neq1$ ? | $\dfrac{\alpha}{\alpha+\beta}$ et $\dfrac{\beta}{\alpha+\beta}$ — **pas** $\alpha$ et $\beta$ |
| Pourquoi passer au $\ln$ avant de dériver ? | Mêmes préférences (thm 1.2), mêmes demandes (ex. 1.22), dérivées bien plus simples |
| Ce qui change avec le $\ln$ ? | Le **multiplicateur** : $\lambda^*_{\ln}=1/y$ — $\lambda^*$ est **cardinal** |
| Pourquoi les demandes sont-elles invariantes par $f\circ u$ ? | Le facteur $f'(u)$ se **simplifie** dans le rapport des conditions du premier ordre |
| Condition d'une solution en coin $x_2^*=0$ ? | $\dfrac{\partial u}{\partial x_2}\leq\lambda^*p_2$, soit $\text{TMS}_{21}\leq\dfrac{p_2}{p_1}$ |
| Pourquoi pas de coin dans les exemples du livre ? | Conditions d'**Inada** : $\partial u/\partial x_i\to\infty$ quand $x_i\to0$ |
| Comment traiter $u=x_1$ ? | Pas de lagrangien — raisonnement direct : $x_1=y/p_1$, $x_2=0$ |
| Comment traiter un $\min$ ou un $\max$ dans $u$ ? | **Dessiner** la carte, comparer les pentes — $u$ n'est pas différentiable |
| Théorème 1.5 — les trois conditions ? | $u$ deux fois $C^1$ · une utilité marginale $>0$ · **hessien bordé** de déterminant non nul |
| Ce que donne le thm 1.5 ? | La **différentiabilité** de $x(p,y)$ — un résultat de régularité, pas d'existence |
| Quel théorème donne la **continuité** de $x(p,y)$ ? | Le **théorème du maximum**, A2.21 |
| Pourquoi le hessien **bordé** ? | C'est la jacobienne du système (1.10) — condition du **théorème des fonctions implicites** |
| Solution du problème à horizon infini ? | $x_t^*=(1-\beta)\beta^t$ |
| Le contrôle le plus rentable après un calcul de demande ? | Recalculer $p\cdot x = y$ |
