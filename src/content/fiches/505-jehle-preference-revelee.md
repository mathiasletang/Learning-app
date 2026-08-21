# Fiche 505 — Préférence révélée : WARP, SARP, GARP

|  |  |
|---|---|
| **Matière** | Maths · Microéconomie avancée |
| **Cours source** | Jehle & Reny, *Advanced Microeconomic Theory*, 3ᵉ éd., Pearson 2011 — chapitre 2 « Topics in Consumer Theory », §2.3 « Revealed Preference » (p. 91-97) |
| **Difficulté** | Intermédiaire — courte section, mais conceptuellement décisive |
| **Temps d'étude estimé** | 95 min |
| **Prérequis** | Fiches 500 à 504 (en particulier le théorème d'intégrabilité 2.6 et la matrice de Slutsky) |
| **Concepts clés** | Approche de Samuelson, fonction de **choix** (et non de demande), axiome faible de la préférence révélée (WARP), équilibre budgétaire, homogénéité déduite, compensation à la Slutsky, semi-définie négativité déduite, rationalisation, exception à deux biens, axiome fort (SARP), cycles intransitifs, axiome généralisé (GARP), théorème d'Afriat, données finies, comparaisons hors échantillon, Varian, Knoblauch |
| **Poids à l'examen** | La **définition 2.1 (WARP)** et sa lecture sur la Fig. 2.3 · la **dérivation de l'homogénéité** à partir de WARP + budget · la **dérivation de la semi-définie négativité** (fonction $f(t)$ maximisée en $t=0$) · **pourquoi deux biens font exception** · la **hiérarchie WARP ⊂ GARP ⊂ SARP** · l'**exemple de Hicks** (exercice 2.10). |

## 🎯 Vue d'ensemble

```
LE FIL DU §2.3 : partir des CHOIX OBSERVES, pas des preferences

  L'IDEE DE SAMUELSON (1947)
     « Pourquoi ne pas COMMENCER et FINIR par le comportement observable ? »
     au lieu d'axiomes sur les PREFERENCES (inobservables),
     des axiomes sur la COHERENCE DES CHOIX (observables)

  LE VOCABULAIRE
     x(p,y) est ici une FONCTION DE CHOIX, PAS une fonction de demande :
     aucune utilite n'a ete mentionnee. C'est juste ce qui est achete.

  DEFINITION 2.1  --  WARP  (axiome FAIBLE de la preference revelee)
     pour toute paire distincte x0 choisi a p0 et x1 choisi a p1 :

          p0 . x1 <= p0 . x0     ==>     p1 . x0  >  p1 . x1

     en mots : si x0 est revele prefere a x1, alors x1 n'est JAMAIS
               revele prefere a x0

  CE QUE WARP + EQUILIBRE BUDGETAIRE IMPLIQUENT

     (1) HOMOGENEITE DE DEGRE 0
         si p1 = t p0 et y1 = t y0, le budget donne p0.x1 = p0.x0
         puis p1.x1 = p1.x0 ; WARP interdit deux paniers DISTINCTS -> x1 = x0

     (2) SEMI-DEFINIE NEGATIVITE de la matrice de Slutsky
         compensation a la Slutsky : revenu = p . x0
         WARP donne  p0 . x0 <= p0 . x1
         budget donne p1 . x0 = p1 . x(p1, p1.x0)
         soustraire, poser p1 = p0 + t z, diviser par t
         -> la fonction f(t) = z . x(p0+tz, (p0+tz).x0) est MAXIMISEE en t=0
         -> f'(0) <= 0, ce qui EST la forme quadratique de Slutsky

     il MANQUE la SYMETRIE. Avec elle, le theoreme 2.6 conclurait.

  LA RECIPROQUE  --  une demande issue de la maximisation satisfait WARP
     preferences str. monotones et str. convexes -> panier unique, budget sature
     si x1 etait abordable mais non choisi, c'est que u(x0) > u(x1)
     donc quand x1 est choisi, x0 n'est pas abordable

  L'EXCEPTION A DEUX BIENS
     DEUX biens   : budget + homogeneite ==> SYMETRIE  (exercice 2.9a)
                    donc WARP + budget  ==>  utilite existe
                    equivalent : PAS de cycle intransitif (exercice 2.9b)
     PLUS de deux : WARP + budget n'impliquent NI symetrie NI absence de cycle
                    contre-exemple de HICKS (exercice 2.10)

  SARP  --  axiome FORT
     pour toute SEQUENCE x0 R x1 R x2 R ... R xk,  xk n'est PAS revele
     prefere a x0  ->  interdit tous les cycles intransitifs
     SARP  <==>  maximisation d'utilite   (Houthakker 1950 ; Richter 1966)

  GARP  --  axiome GENERALISE  (Afriat 1967)  --  legerement plus FAIBLE
     concu pour un nombre FINI d'observations
     THEOREME D'AFRIAT : un jeu FINI de donnees satisfait GARP
     <==> il existe une utilite CONTINUE, CROISSANTE et CONCAVE qui le rationalise

     limite : hors echantillon les preferences ne sont PAS determinees
              plusieurs utilites rationalisent les memes donnees
              et peuvent CLASSER DIFFEREMMENT deux paniers hors echantillon
     partiellement resolu : Varian (1982), complete par Knoblauch (1992)
```

> **La question de Samuelson, citée par le livre.** *« Dans son remarquable* Foundations of Economic Analysis*, Paul Samuelson (1947) a suggéré une approche alternative. **Pourquoi ne pas commencer et finir par le comportement observable ?** Samuelson a montré comment virtuellement chaque prédiction que la théorie ordinaire du consommateur fait pour le comportement de marché observable peut aussi (et à la place) être dérivée de **quelques hypothèses simples et sensées sur les choix observables du consommateur lui-même**, plutôt que sur ses préférences inobservables. »*

> ⚠️ **Note de transcription — identique aux fiches 500-504.** Le PDF n'exporte pas $\succsim$, $\succ$, $\gg$, $\sum$ ; il rend l'inégalité vectorielle $\geq$ comme un « + ». Ces symboles sont rétablis depuis la prose et les équations voisines.

## 🔴 Concept 1 — Le renversement de Samuelson

### 1.1 Ce que le livre reproche à l'approche axiomatique

> *« Jusqu'ici, nous avons abordé la théorie de la demande en supposant que le consommateur a des préférences satisfaisant certaines propriétés (complètes, transitives et strictement monotones) ; puis nous avons essayé d'en déduire toutes les propriétés observables de la demande de marché (équilibre budgétaire, symétrie et semi-définie négativité de la matrice de Slutsky). Ainsi, nous avons commencé par **supposer quelque chose sur des choses que nous ne pouvons pas observer** — les préférences — pour finalement faire des prédictions sur quelque chose que nous **pouvons** observer — le comportement de demande. »*

### 1.2 L'idée de base

> *« L'idée de base est simple : **si le consommateur achète un panier plutôt qu'un autre panier abordable, alors le premier panier est considéré comme révélé préféré au second**. La présomption est qu'**en choisissant effectivement un panier plutôt qu'un autre, le consommateur transmet une information importante sur ses goûts**. »*

> *« Au lieu de poser des axiomes sur les préférences d'une personne comme nous l'avons fait avant, **nous faisons des hypothèses sur la cohérence des choix qui sont faits**. »*

$$\boxed{\;p^0\cdot x^1 \leq p^0\cdot x^0 \quad\text{signifie}\quad \text{« } x^0 \text{ est révélé préféré à } x^1 \text{ »}\;}$$

*(Le panier $x^1$ était abordable aux prix $p^0$ ; le consommateur a pourtant choisi $x^0$.)*

### 1.3 Un point de vocabulaire décisif

> *« Soit $x(p,y)$ le choix fait par ce consommateur face aux prix $p$ et au revenu $y$. **Notez bien que ce n'est PAS une fonction de demande**, parce que nous n'avons mentionné ni utilité ni maximisation d'utilité — cela dénote juste les quantités que le consommateur choisit face à $p$ et $y$. Pour garder ce point clair, nous appelons $x(p,y)$ une **fonction de choix**. »*

> ⚠️ **La distinction n'est pas cosmétique.** Une **fonction de demande** est, par définition, la solution d'un programme de maximisation d'utilité — elle **présuppose** la théorie. Une **fonction de choix** ne présuppose rien : c'est une description brute des données. Tout l'enjeu du §2.3 est de savoir **sous quelles conditions une fonction de choix est une fonction de demande**.

## 🔴 Concept 2 — L'axiome faible (WARP)

### 2.1 La définition

<div class="callout" data-kind="formel">

<span class="callout__lab">DEFINITION 2.1 — Weak Axiom of Revealed Preference (WARP).</span>

A consumer's choice behaviour satisfies WARP if for every **distinct** pair of bundles $x^0$, $x^1$ with $x^0$ chosen at prices $p^0$ and $x^1$ chosen at prices $p^1$,

$$\boxed{\;p^0\cdot x^1 \leq p^0\cdot x^0 \quad\Longrightarrow\quad p^1\cdot x^0 > p^1\cdot x^1\;}$$

</div>

> *« En d'autres termes, WARP tient si, **chaque fois que $x^0$ est révélé préféré à $x^1$, $x^1$ n'est jamais révélé préféré à $x^0$**. »*

> ⚠️ **Trois détails de l'énoncé, tous examinables.** — Le mot **« distinct »** : l'axiome ne porte que sur des paniers différents. Sans cela, $x^0=x^1$ donnerait $p^1\cdot x^0>p^1\cdot x^0$, absurde. — L'hypothèse est **large** ($\leq$) : il suffit que $x^1$ ait été **abordable**, même exactement au prix du budget. — La conclusion est **stricte** ($>$) : $x^0$ doit être **inabordable**, pas seulement non choisi.
>
> **Pourquoi cette asymétrie ?** Parce que l'information révélée par le choix de $x^0$ face à $x^1$ abordable est *« $x^0$ est au moins aussi bon »*. Si $x^0$ était encore abordable quand $x^1$ a été choisi, on aurait la même information dans l'autre sens — d'où l'incohérence.

### 2.2 La lecture géométrique (Fig. 2.3)

Dans les deux panneaux, le consommateur choisit $x^0$ face à $p^0$ et $x^1$ face à $p^1$.

| Panneau | Situation | Verdict |
|---|---|---|
| **(a)** | *« $x^0$ est choisi alors que $x^1$ aurait pu l'être, mais ne l'a pas été ; et quand $x^1$ est choisi, le consommateur **ne pouvait pas s'offrir $x^0$** »* | WARP **satisfait** |
| **(b)** | *« $x^0$ est à nouveau choisi alors que $x^1$ aurait pu l'être ; mais quand $x^1$ est choisi, le consommateur **aurait pu choisir $x^0$**, et ne l'a pas fait »* | WARP **violé** |

> **La règle graphique en une phrase.** Tracez les deux droites de budget et marquez les deux paniers choisis. **WARP est violé si et seulement si chaque panier se trouve sur ou sous la droite de budget de l'autre.**

<details class="details--riche">
<summary>

**Exercice 2.8 — quatre paires de données à tester**

</summary>

**Énoncé.** Le consommateur achète le panier $x^i$ aux prix $p^i$, $i=0,1$. Dire, séparément pour chaque cas, si les choix indiqués satisfont WARP.

(a) $p^0=(1,3)$, $x^0=(4,2)$ ; $p^1=(3,5)$, $x^1=(3,1)$ (b) $p^0=(1,6)$, $x^0=(10,5)$ ; $p^1=(3,5)$, $x^1=(8,4)$ (c) $p^0=(1,2)$, $x^0=(3,1)$ ; $p^1=(2,2)$, $x^1=(1,2)$ (d) $p^0=(2,6)$, $x^0=(20,10)$ ; $p^1=(3,5)$, $x^1=(18,4)$

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**La méthode, systématique.** Calculer les **quatre** produits scalaires $p^0\cdot x^0$, $p^0\cdot x^1$, $p^1\cdot x^0$, $p^1\cdot x^1$, puis appliquer la définition.

**(a)** $p^0\cdot x^0 = 4+6=10$ · $p^0\cdot x^1 = 3+3=6$ · $p^1\cdot x^0=12+10=22$ · $p^1\cdot x^1=9+5=14$.

$p^0\cdot x^1 = 6 \leq 10 = p^0\cdot x^0$ ⟹ $x^0$ est révélé préféré à $x^1$. Il faut alors $p^1\cdot x^0 > p^1\cdot x^1$ : $22>14$ .

**WARP satisfait.**

**(b)** $p^0\cdot x^0=10+30=40$ · $p^0\cdot x^1=8+24=32$ · $p^1\cdot x^0=30+25=55$ · $p^1\cdot x^1=24+20=44$.

$32\leq40$ ⟹ $x^0$ révélé préféré à $x^1$. Test : $55>44$ .

**WARP satisfait.**

**(c)** $p^0\cdot x^0=3+2=5$ · $p^0\cdot x^1=1+4=5$ · $p^1\cdot x^0=6+2=8$ · $p^1\cdot x^1=2+4=6$.

$5\leq5$ ⟹ $x^0$ révélé préféré à $x^1$ (l'inégalité **large** suffit). Test : $8>6$ .

**WARP satisfait.**

> ⚠️ **Le piège de (c).** L'égalité $p^0\cdot x^1=p^0\cdot x^0$ compte comme « $x^1$ était abordable ». C'est exactement pourquoi la définition emploie $\leq$ et non $<$.

**(d)** $p^0\cdot x^0=40+60=100$ · $p^0\cdot x^1=36+24=60$ · $p^1\cdot x^0=60+50=110$ · $p^1\cdot x^1=54+20=74$.

$60\leq100$ ⟹ $x^0$ révélé préféré à $x^1$. Test : $110>74$ .

**WARP satisfait.**

> **La marche à suivre en examen, en quatre lignes.**
>
> 1. Calculer $p^0\cdot x^0$ et $p^0\cdot x^1$. Si $p^0\cdot x^1\leq p^0\cdot x^0$, alors $x^0\,R\,x^1$.
> 2. Calculer $p^1\cdot x^1$ et $p^1\cdot x^0$. Si $p^1\cdot x^0\leq p^1\cdot x^1$, alors $x^1\,R\,x^0$.
> 3. **Si les deux tiennent : WARP est violé.**
> 4. Si aucun des deux ne tient, ou un seul, WARP est satisfait.
>
> Notez que le test est **symétrique** : il suffit de repérer si **chaque** panier est abordable au budget de l'autre.

</details>

## 🔴 Concept 3 — Ce que WARP et l'équilibre budgétaire impliquent

> *« En plus de WARP, nous faisons une autre hypothèse sur le comportement de choix du consommateur, à savoir que pour $p\gg0$, le choix $x(p,y)$ satisfait l'**équilibre budgétaire**, c'est-à-dire $p\cdot x(p,y)=y$. **Les implications de ces deux exigences apparemment modestes sont assez remarquables.** »*

### 3.1 Première conséquence — l'homogénéité de degré zéro

**La dérivation, pas à pas.** Supposons $x^0$ choisi aux prix $p^0$ et revenu $y^0$, et $x^1$ choisi aux prix $p^1=tp^0$ et revenu $y^1=ty^0$, avec $t>0$.

| Pas | Affirmation | Justification |
|---|---|---|
| 1 | $p^1\cdot x^1 = t\,p^0\cdot x^0$ | équilibre budgétaire : $p^1\cdot x^1=y^1=ty^0=t\,p^0\cdot x^0$ |
| 2 | En substituant $tp^0$ pour $p^1$ et en divisant par $t$ : $\ p^0\cdot x^1 = p^0\cdot x^0$ (2.3) |  |
| 3 | En substituant $p^1$ pour $tp^0$ dans la même équation : $\ p^1\cdot x^1 = p^1\cdot x^0$ (2.4) |  |
| 4 | Si $x^0$ et $x^1$ étaient **distincts**, (2.3) déclencherait WARP, qui exigerait $p^1\cdot x^0 > p^1\cdot x^1$ — contredisant (2.4) |  |
| 5 | Donc $x^0 = x^1$ |  |

$$\boxed{\;x(tp,ty)=x(p,y) \qquad \forall\,t>0\;}$$

> **Le mécanisme, en une phrase.** L'équilibre budgétaire force les **deux** paniers à coûter exactement le budget aux **deux** systèmes de prix ; WARP interdit alors qu'ils soient distincts.
>
> ⚠️ **Notez ce qui n'est PAS supposé.** Ni utilité, ni préférence, ni convexité. L'homogénéité de degré zéro — que la fiche 503 avait démontrée via l'homogénéité de $v$ et la stricte quasiconcavité — **retombe ici sans aucune de ces hypothèses**.

### 3.2 Seconde conséquence — la semi-définie négativité

C'est la dérivation la plus technique du §2.3 ; le livre la déroule intégralement.

**Le dispositif : la compensation à la Slutsky.**

> *« L'idée est de considérer les choix que le consommateur fait quand les prix varient **arbitrairement** tandis que son revenu est compensé de sorte qu'il puisse **tout juste s'offrir le panier $x^0$**. (Voir Fig. 2.4.) Par conséquent, aux prix $p$, son revenu sera $p\cdot x^0$. Dans ces circonstances, son comportement de choix sera donné par $x(p,\,p\cdot x^0)$. »*

*(C'est la compensation de l'exercice 1.45, fiche 503 — celle qui est **observable**, contrairement à celle de Hicks.)*

**Pas 1 — WARP donne une inégalité.** Fixons $p^0\gg0$, $y^0>0$, et posons $x^0=x(p^0,y^0)$. Soit $p^1$ un autre vecteur de prix et $x^1=x(p^1,\,p^1\cdot x^0)$. Alors

$$p^0\cdot x^0 \ \leq\ p^0\cdot x^1 \tag{2.5}$$

**Justification, en deux cas :** — si $x^1=x^0$, (2.5) est une **égalité** ; — si $x^1\neq x^0$, alors *« parce que $x^1$ a été choisi alors que $x^0$ était abordable (aux prix $p^1$ et revenu $p^1\cdot x^0$), WARP implique que **$x^1$ n'est pas abordable quand $x^0$ est choisi** »* — donc $p^0\cdot x^1>p^0\cdot x^0$, l'inégalité est **stricte**.

**Pas 2 — l'équilibre budgétaire donne une égalité.**

$$p^1\cdot x^0 = p^1\cdot x\big(p^1,\,p^1\cdot x^0\big) \tag{2.6}$$

*(par construction, le revenu compensé est exactement $p^1\cdot x^0$.)*

**Pas 3 — soustraire.** (2.6) $-$ (2.5) donne, pour tout $p^1$ :

$$\big(p^1-p^0\big)\cdot x^0 \ \geq\ \big(p^1-p^0\big)\cdot x\big(p^1,\,p^1\cdot x^0\big) \tag{2.7}$$

**Pas 4 — paramétrer la direction.** Comme (2.7) vaut pour **tous** les prix, posons $p^1=p^0+tz$ avec $t>0$ et $z\in\mathbb{R}^n$ **arbitraire**. Alors $p^1-p^0=tz$ et (2.7) devient

$$t\big[z\cdot x^0\big] \ \geq\ t\big[z\cdot x(p^1,\,p^1\cdot x^0)\big] \tag{2.8}$$

En divisant par $t>0$ :

$$z\cdot x^0 \ \geq\ z\cdot x\big(p^0+tz,\ (p^0+tz)\cdot x^0\big) \tag{2.9}$$

**Pas 5 — reconnaître un problème de maximisation.** Comme $p^0\gg0$, on peut choisir $\bar t>0$ assez petit pour que $p^0+tz\gg0$ pour tout $t\in[0,\bar t\,]$. Posons

$$f(t)\equiv z\cdot x\big(p^0+tz,\ (p^0+tz)\cdot x^0\big), \qquad f:[0,\bar t\,)\to\mathbb{R}$$

Alors (2.9) dit que $f(t)\leq z\cdot x^0$ pour tout $t$, et **(2.9) est une égalité en $t=0$** (puisque $p^0+0\cdot z=p^0$ et $x(p^0,y^0)=x^0$).

$$\boxed{\;f \text{ est MAXIMISÉE sur } [0,\bar t\,) \text{ en } t=0\;}$$

**Pas 6 — la condition du premier ordre.** Un maximum en $t=0$ sur un intervalle dont $0$ est l'extrémité **gauche** impose $f'(0)\leq0$. En supposant $x(\cdot)$ différentiable :

$$f'(0)=\sum_i\sum_j z_i\left[\frac{\partial x_i(p^0,y^0)}{\partial p_j}+x_j(p^0,y^0)\frac{\partial x_i(p^0,y^0)}{\partial y}\right]z_j \ \leq\ 0 \tag{2.10}$$

**Pas 7 — conclure.** *« Or, parce que $z\in\mathbb{R}^n$ était **arbitraire**, (2.10) dit que la matrice dont le $ij$-ème élément est »*

$$\frac{\partial x_i(p^0,y^0)}{\partial p_j}+x_j(p^0,y^0)\frac{\partial x_i(p^0,y^0)}{\partial y} \tag{2.11}$$

*« doit être **semi-définie négative**. Mais cette matrice est **précisément la matrice de Slutsky** associée à la fonction de choix $x(p,y)$ ! »* $\blacksquare$

> **Le point-clé de la démonstration, à savoir énoncer.** WARP dit que le panier initial $x^0$ est **au moins aussi cher que tout autre choix compensé** aux prix initiaux. En faisant varier les prix dans une direction $z$ quelconque, on obtient une fonction $f$ dont le maximum est **au point de départ** — et la condition du premier ordre de ce maximum **est** la forme quadratique de Slutsky.
>
> ⚠️ **Pourquoi $f'(0)\leq0$ et non $f'(0)=0$ ?** Parce que le maximum est atteint à l'**extrémité** de l'intervalle $[0,\bar t\,)$, pas à l'intérieur. Un maximum en bord gauche n'impose que la décroissance vers la droite. C'est exactement ce qu'il faut : une inégalité, pas une égalité.
>
> **Où sert l'arbitraire de $z$ ?** Sans lui, on n'aurait l'inégalité (2.10) que pour un vecteur particulier — donc pas la semi-définie négativité, qui exige **tous** les $z$.

### 3.3 Le bilan — et ce qui manque

> *« Nous avons démontré que si une fonction de choix satisfait WARP et l'équilibre budgétaire, alors elle doit satisfaire **deux autres propriétés impliquées par la maximisation d'utilité**, à savoir l'**homogénéité de degré zéro** et la **semi-définie négativité** de la matrice de Slutsky. »*

> *« Si nous pouvions montrer, en plus, que la matrice de Slutsky de la fonction de choix était **symétrique**, alors par notre résultat d'intégrabilité, cette fonction de choix serait en fait une **fonction de demande**, parce que nous serions alors capables de construire une fonction d'utilité l'engendrant. »*

| Condition du théorème 2.6 | WARP + budget la donnent-ils ? |
|---|---|
| Équilibre budgétaire | **par hypothèse** |
| Semi-définie négativité | **démontré** ci-dessus |
| **Symétrie** | **pas en général** — c'est tout le problème |

> **La question qui structure la fin du §2.3.** WARP suffit-il ? La réponse est *« oui — et non »* : oui à **deux biens**, non au-delà.

## 🔴 Concept 4 — La réciproque : la demande issue d'une utilité satisfait WARP

> *« Il vaut la peine de souligner que si $x(p,y)$ se trouve être une fonction de demande **engendrée par une utilité**, alors $x(p,y)$ **doit** satisfaire WARP. »*

**La démonstration du livre, en entier.** Supposons un consommateur maximisant une utilité, aux préférences **strictement monotones** et **strictement convexes**. Alors :

| Pas | Affirmation | Justification |
|---|---|---|
| 1 | il y a un **panier unique** demandé à chaque système de prix, et ce panier **épuise** le revenu | exercice 1.16 (fiche 501) |
| 2 | soit $x^0$ maximisant l'utilité face à $p^0$, $x^1$ face à $p^1$, et supposons $p^0\cdot x^1\leq p^0\cdot x^0$ | hypothèse de WARP |
| 3 | $x^1$, **quoique abordable**, n'est pas choisi ⟹ $u(x^0)>u(x^1)$ | unicité du maximiseur |
| 4 | donc quand $x^1$ est choisi face à $p^1$, **$x^0$ ne doit pas être disponible** : $p^1\cdot x^0>p^1\cdot x^1$ | sinon $x^0$ aurait été choisi |

$$\text{donc}\qquad p^0\cdot x^1\leq p^0\cdot x^0 \ \Longrightarrow\ p^1\cdot x^0>p^1\cdot x^1 \qquad\text{— WARP est satisfait.} \ \blacksquare$$

> ⚠️ **L'unicité (pas 1) est indispensable.** Sans stricte convexité, il pourrait y avoir **plusieurs** paniers optimaux à $p^0$, et le fait que $x^1$ n'ait pas été choisi ne prouverait plus $u(x^0)>u(x^1)$ — seulement $u(x^0)\geq u(x^1)$. La conclusion stricte de WARP tomberait.

> **L'état des lieux à ce stade.**
>
> $$\text{maximisation d'utilité} \ \Longrightarrow\ \text{WARP}$$
>
> La question restante est la **réciproque** : *« Que se passe-t-il dans l'autre sens ? Si la fonction de choix d'un consommateur satisfait toujours WARP, ce comportement doit-il avoir été engendré par une maximisation d'utilité ? »*

**Le vocabulaire.** *« S'il existe une fonction d'utilité qui produirait les choix observés comme résultat du processus de maximisation, nous disons que la fonction d'utilité **rationalise** le comportement observé. »*

## 🔴 Concept 5 — L'exception à deux biens et l'axiome fort

### 5.1 La réponse du livre : oui et non

> *« Il s'avère que la réponse est **oui — et non**. **S'il n'y a que deux biens**, alors WARP implique qu'il existera une fonction d'utilité qui rationalise les choix ; **s'il y a plus de deux biens**, alors même si WARP tient, il **peut ne pas exister** une telle fonction. »*

### 5.2 Pourquoi deux biens font exception — deux explications

**Explication 1 — par la symétrie de Slutsky.**

> *« Il s'avère que dans le cas à deux biens, **l'équilibre budgétaire avec l'homogénéité impliquent que la matrice de Slutsky doit être symétrique**. (Voir exercice 2.9.) Par conséquent, parce que WARP et l'équilibre budgétaire impliquent l'homogénéité **ainsi que** la semi-définie négativité, alors dans le cas de deux biens **ils impliquent aussi la symétrie**. Donc, pour deux biens, notre théorème d'intégrabilité nous dit que la fonction de choix **doit** être engendrée par une utilité. »*

$$\underbrace{\text{WARP + budget}}_{\text{à 2 biens}} \Longrightarrow \underbrace{\text{homogénéité}}_{§3.1} + \underbrace{\text{SDN}}_{§3.2} + \underbrace{\text{symétrie}}_{\text{ex. 2.9a}} \xRightarrow{\ \text{thm 2.6}\ } \text{utilité existe}$$

**Explication 2 — par les cycles.**

> *« Une explication apparemment distincte, mais ultimement équivalente, est qu'avec deux biens, **le classement par paires impliqué par la préférence révélée n'a pas de cycles intransitifs**. (C'est ce qu'on vous demande de montrer à l'exercice 2.9.) Et quand c'est le cas, il existera une représentation par une utilité engendrant la fonction de choix. »*

> *« Ainsi, comme nous l'avons mentionné plus tôt dans le texte, **il y a une connexion profonde entre la symétrie de la matrice de Slutsky et la transitivité des préférences du consommateur**. »*

> ⚠️ **Ce point est la reprise explicite de la remarque du théorème 1.14** (fiche 503) : *« cette condition de symétrie est intimement liée à la transitivité supposée de la relation de préférence ! »* Le §2.3 en donne enfin la raison : symétrie et absence de cycles sont **deux formulations du même fait**.

### 5.3 Au-delà de deux biens

> *« Pour plus de deux biens, WARP et l'équilibre budgétaire n'impliquent **ni la symétrie de la matrice de Slutsky ni l'absence de cycles intransitifs** dans la relation « révélé préféré à ». Par conséquent, pour plus de deux biens, **WARP et l'équilibre budgétaire ne sont pas équivalents à l'hypothèse de maximisation d'utilité**. »*

<details class="details--riche">
<summary>

**Exercice 2.9 — pourquoi deux biens suffisent**

</summary>

**Énoncé.** Supposons qu'il n'y ait que **deux biens** et que la fonction de choix $x(p,y)$ satisfasse l'équilibre budgétaire, $p\cdot x(p,y)=y$ pour tout $(p,y)$. Montrer que : (a) si $x(p,y)$ est homogène de degré zéro, alors la matrice de Slutsky associée est **symétrique** ; (b) si $x(p,y)$ satisfait WARP, alors la relation « révélé préféré à », $R$, **n'a pas de cycles intransitifs**.

**Indication du livre (p. 632) :** *« Use a diagram »* — servez-vous d'un schéma.

*Corrigé pédagogique reconstitué. La partie (a) se fait mieux par le calcul ; l'indication du livre vise (b).*

**(a) La symétrie à deux biens.**

**Le point de départ — l'exercice 2.2 :** si $x(p,y)$ satisfait budget **et** homogénéité, alors la matrice de Slutsky vérifie

$$s(p,y)\cdot p = 0.$$

*(C'est le théorème d'Euler appliqué à $x$, homogène de degré 0, comme au §4.3 de la fiche 503.)*

**L'autre relation — celle du budget.** En dérivant $p\cdot x(p,y)=y$, on obtient (comme au théorème 1.17) $\sum_i p_i s_{ij}=0$ pour chaque $j$, c'est-à-dire

$$p^{\mathsf T}\,s(p,y)=0.$$

**Le décompte à $n=2$.** La matrice $s$ est $2\times2$ ; elle a **quatre** entrées. Les deux relations ci-dessus donnent :

$$p_1 s_{11}+p_2 s_{12}=0 \qquad p_1 s_{21}+p_2 s_{22}=0 \qquad\text{(lignes, via } s\,p=0)$$

$$p_1 s_{11}+p_2 s_{21}=0 \qquad p_1 s_{12}+p_2 s_{22}=0 \qquad\text{(colonnes, via } p^{\mathsf T}s=0)$$

De la première et de la troisième : $p_2 s_{12}=p_2 s_{21}$, donc — puisque $p_2>0$ —

$$\boxed{\;s_{12}=s_{21}\;}$$

La matrice est symétrique. $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi cela échoue à trois biens ou plus.</span>

À $n$ biens, $s$ a $n^2$ entrées ; les relations $s\,p=0$ et $p^{\mathsf T}s=0$ n'en contraignent que $2n$ (dont certaines redondantes). Pour $n=2$ : $4$ entrées, $4$ équations — c'est **juste assez**. Pour $n=3$ : $9$ entrées, $6$ équations — il reste de la latitude, et la symétrie n'est plus forcée.

**C'est le décompte qui explique tout le §5.2.** Deux biens forment un cas dégénéré, pas un cas représentatif.

</div>

**(b) L'absence de cycles à deux biens.**

**Ce qu'il faut montrer.** Il n'existe pas de suite $x^1\,R\,x^2\,R\,\dots\,R\,x^m\,R\,x^1$ de paniers distincts.

**L'argument géométrique (l'indication du livre).** À deux biens, chaque droite de budget est une droite du plan, de pente $-p_1/p_2$. Le classement révélé induit un **ordre le long de la courbe des choix** : les paniers choisis à des prix relatifs croissants se rangent le long d'une courbe monotone.

Plus précisément : les résultats du §3 donnent l'homogénéité, donc on peut normaliser $y=1$ et paramétrer les prix par le seul rapport $\theta = p_1/p_2$. Le choix devient une fonction $x(\theta)$ d'une **seule** variable.

WARP impose alors que, si $\theta^0<\theta^1$ (le bien 1 devient relativement plus cher), on ne peut pas avoir simultanément $x^0$ abordable en $\theta^1$ et $x^1$ abordable en $\theta^0$. La relation $R$ se réduit donc à une comparaison le long d'un **paramètre unidimensionnel ordonné** — et un ordre sur $\mathbb{R}$ **n'a pas de cycle**.

**Pourquoi cela tombe à trois biens.** L'espace des prix normalisés devient **bidimensionnel** ($\theta_1=p_1/p_3$, $\theta_2=p_2/p_3$). Il n'y a plus d'ordre naturel : on peut « tourner autour » d'un point, et c'est précisément ce que fait le contre-exemple de Hicks (exercice 2.10). $\blacksquare$

</details>

<details class="details--riche">
<summary>

**Exercice 2.10 — le contre-exemple de Hicks (1956)**

</summary>

**Énoncé.** Hicks a offert l'exemple suivant pour montrer comment WARP peut ne pas donner des préférences révélées transitives quand il y a plus de deux biens. Le consommateur choisit $x^i$ aux prix $p^i$, $i=0,1,2$ :

$$p^0=\begin{pmatrix}1\\1\\2\end{pmatrix},\ x^0=\begin{pmatrix}5\\19\\9\end{pmatrix} \qquad p^1=\begin{pmatrix}1\\1\\1\end{pmatrix},\ x^1=\begin{pmatrix}12\\12\\12\end{pmatrix} \qquad p^2=\begin{pmatrix}1\\2\\1\end{pmatrix},\ x^2=\begin{pmatrix}27\\11\\1\end{pmatrix}$$

(a) Montrer que ces données satisfont WARP, en considérant **toutes** les comparaisons par paires et en montrant que dans chaque cas, **un** panier de la paire est révélé préféré à l'autre. (b) Trouver l'**intransitivité** dans les préférences révélées.

**Indication du livre (p. 632) :** *« Pour vous lancer, $x^2$ est révélé préféré à $x^1$. »*

*Développement à partir de cette indication.*

**Étape 0 — les neuf produits scalaires.**

|  | $x^0=(5,19,9)$ | $x^1=(12,12,12)$ | $x^2=(27,11,1)$ |
|---|---|---|---|
| $p^0=(1,1,2)$ | $5+19+18=\mathbf{42}$ | $12+12+24=48$ | $27+11+2=40$ |
| $p^1=(1,1,1)$ | $5+19+9=33$ | $12+12+12=\mathbf{36}$ | $27+11+1=39$ |
| $p^2=(1,2,1)$ | $5+38+9=52$ | $12+24+12=48$ | $27+22+1=\mathbf{50}$ |

*(La diagonale en gras donne les revenus : $y^0=42$, $y^1=36$, $y^2=50$.)*

**Étape 1 — les trois comparaisons par paires.**

**$x^0$ contre $x^1$.** $p^0\cdot x^1 = 48 > 42 = p^0\cdot x^0$ : $x^1$ n'était **pas** abordable en $p^0$. Et $p^1\cdot x^0 = 33 \leq 36 = p^1\cdot x^1$ : $x^0$ **était** abordable en $p^1$, et n'a pas été choisi.

$$\boxed{x^1 \ R \ x^0}$$

Test WARP : il faut que $x^1$ soit inabordable en $p^0$ — c'est le cas ($48>42$) .

**$x^1$ contre $x^2$.** $p^1\cdot x^2 = 39 > 36 = p^1\cdot x^1$ : $x^2$ n'était **pas** abordable en $p^1$. Et $p^2\cdot x^1=48 \leq 50 = p^2\cdot x^2$ : $x^1$ **était** abordable en $p^2$.

$$\boxed{x^2 \ R \ x^1} \qquad \text{— c'est l'indication du livre} \ $$

Test WARP : $x^2$ inabordable en $p^1$ .

**$x^0$ contre $x^2$.** $p^2\cdot x^0 = 52 > 50 = p^2\cdot x^2$ : $x^0$ n'était **pas** abordable en $p^2$. Et $p^0\cdot x^2 = 40 \leq 42 = p^0\cdot x^0$ : $x^2$ **était** abordable en $p^0$.

$$\boxed{x^0 \ R \ x^2}$$

Test WARP : $x^0$ inabordable en $p^2$ .

**(a) WARP est satisfait.** Dans **chacune** des trois paires, exactement **un** panier est révélé préféré à l'autre — jamais les deux. C'est exactement ce que WARP exige.

**(b) L'intransitivité.**

$$x^1 \ R \ x^0 \qquad x^0 \ R \ x^2 \qquad x^2 \ R \ x^1$$

$$\boxed{\;x^1 \ R \ x^0 \ R \ x^2 \ R \ x^1 \;}$$

**Un cycle.** Par transitivité, $x^1\,R\,x^0$ et $x^0\,R\,x^2$ donneraient $x^1\,R\,x^2$ ; or on a $x^2\,R\,x^1$. **Aucune relation de préférence transitive ne peut rationaliser ces données**, donc aucune fonction d'utilité non plus. $\blacksquare$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que l'exemple établit, et c'est le cœur du §2.3.</span>

WARP ne contrôle que les **paires**. Un cycle de longueur 3 passe entre les mailles : chaque paire prise isolément est parfaitement cohérente, et pourtant l'ensemble ne l'est pas.

**C'est exactement ce que SARP corrige** : il interdit les cycles de **toute longueur**, pas seulement de longueur 2.

⚠️ **Un détail de méthode.** Pour construire ou tester un cycle, dressez d'abord le **tableau complet** des $K^2$ produits scalaires, avec les revenus en diagonale. Toutes les comparaisons se lisent alors en comparant une case à la diagonale de sa **ligne**.

</div>

</details>

### 5.4 SARP — l'axiome fort

<div class="callout" data-kind="methode">

<span class="callout__lab">comment devons-nous renforcer WARP pour obtenir une théorie de la préférence révélée équivalente à la théorie de la maximisation d'utilité ?</span>

*« Cela mène naturellement à la question : La réponse réside dans l'"axiome fort de la préférence révélée". »*

</div>

> **SARP (Strong Axiom of Revealed Preference).** *« SARP est satisfait si, pour toute **séquence** de paniers distincts $x^0,x^1,\dots,x^k$, où $x^0$ est révélé préféré à $x^1$, et $x^1$ est révélé préféré à $x^2$, …, et $x^{k-1}$ est révélé préféré à $x^k$, **il n'est pas le cas que $x^k$ soit révélé préféré à $x^0$**. »*

> *« SARP **exclut les préférences révélées intransitives** et peut donc être utilisé pour induire une relation de préférence **complète et transitive** $\succsim$, pour laquelle il existera alors une fonction d'utilité qui rationalise le comportement observé. »*

Le livre omet la démonstration et renvoie à **Houthakker (1950)** pour l'argument original, et à **Richter (1966)** *« pour une preuve élégante »*.

**L'équivalence.**

> *« Il n'est pas difficile de montrer que si un consommateur choisit des paniers pour maximiser une fonction d'utilité **strictement quasiconcave et strictement croissante**, son comportement de demande doit satisfaire SARP (voir exercice 2.11). Ainsi, **une théorie de la demande construite seulement sur SARP — une restriction sur le choix observable — est essentiellement équivalente à la théorie de la demande construite sur la maximisation d'utilité**. »*

> *« Sous SARP comme sous l'hypothèse de maximisation d'utilité, la demande sera **homogène** et la matrice de Slutsky sera **semi-définie négative et symétrique**. »*

$$\boxed{\;\text{SARP} \iff \text{maximisation d'utilité}\;}$$

<details class="details--riche">
<summary>

**Exercice 2.11 — la maximisation d'utilité implique SARP**

</summary>

**Énoncé.** Montrer que si un consommateur choisit des paniers pour maximiser une fonction d'utilité **strictement quasiconcave et strictement croissante**, son comportement de demande satisfait SARP.

**Le livre ne donne pas d'indication.** Corrigé pédagogique reconstitué.

**Le lemme préliminaire.** Sous ces hypothèses, le maximiseur est **unique** et le budget est **saturé** (exercice 1.16). Donc, comme au Concept 4 :

$$p^i\cdot x^{i+1}\leq p^i\cdot x^i \quad\text{et}\quad x^{i+1}\neq x^i \qquad\Longrightarrow\qquad u(x^i)>u(x^{i+1}).$$

*(Si $x^{i+1}$ était abordable et n'a pas été choisi, c'est qu'il est strictement moins bon — l'unicité interdit l'égalité.)*

**La démonstration.** Soit une séquence de paniers distincts $x^0,x^1,\dots,x^k$ avec $x^0\,R\,x^1\,R\,\dots\,R\,x^k$. Par le lemme appliqué à chaque maillon :

$$u(x^0)>u(x^1)>u(x^2)>\dots>u(x^k).$$

Par transitivité de $>$ sur $\mathbb{R}$ : $u(x^0)>u(x^k)$.

**Supposons par l'absurde** que $x^k$ soit révélé préféré à $x^0$, c'est-à-dire $p^k\cdot x^0\leq p^k\cdot x^k$ avec $x^0\neq x^k$. Le lemme donnerait alors $u(x^k)>u(x^0)$ — **contradiction**. $\blacksquare$

> **L'idée en une ligne.** La préférence révélée, sous unicité du maximiseur, **hérite de la transitivité de l'ordre des nombres réels**. Un cycle révélé impliquerait un cycle dans $\mathbb{R}$, ce qui est impossible.
>
> ⚠️ **La stricte quasiconcavité est indispensable.** Sans elle, l'unicité tombe, et « abordable mais non choisi » ne donne plus $u(x^i)>u(x^{i+1})$ mais seulement $\geq$. La chaîne d'inégalités deviendrait large, et un cycle d'égalités serait possible — les données seraient alors rationalisables **avec des indifférences**, mais SARP tel qu'énoncé serait violé.
>
> **C'est d'ailleurs pourquoi GARP existe** : il remplace les inégalités strictes par des inégalités larges, et tolère donc les indifférences.

</details>

## 🟠 Concept 6 — GARP, Afriat, et le problème des données finies

### 6.1 Le changement de cadre

> *« Dans notre analyse jusqu'ici, nous nous sommes concentrés sur des axiomes de préférence révélée et des **fonctions** de choix. En effet, nous avons agi comme si nous disposions d'une **collection infiniment grande** de données de prix et de quantités. »*

> *« Pour beaucoup, l'attrait original de la théorie de la préférence révélée était la promesse de pouvoir **commencer par des données réelles** et travailler à partir des fonctions d'utilité impliquées pour prédire le comportement. Parce que les jeux de données du monde réel ne contiennent jamais plus qu'un **nombre fini** de points, les travaux plus récents ont tenté de traiter directement des problèmes qui surgissent quand le nombre d'observations est fini. »*

### 6.2 GARP et le théorème d'Afriat

> *« À cette fin, **Afriat (1967)** a introduit l'**axiome généralisé de la préférence révélée (GARP)**, une exigence **légèrement plus faible** que SARP, et a prouvé un analogue du théorème d'intégrabilité (théorème 2.6). »*

<div class="callout" data-kind="formel">

<span class="callout__lab">THÉORÈME D'AFRIAT (énoncé par le livre).</span>

*« Un ensemble fini de données observées de prix et de quantités satisfait GARP **si et seulement si** il existe une fonction d'utilité **continue, croissante et concave** qui rationalise les données. »*

</div>

**La définition de GARP** *(donnée par le livre à l'exercice 2.12)* : pour toute séquence finie $(x^{k_1},p^{k_1}),\dots,(x^{k_m},p^{k_m})$ de points du jeu de données $D$, si

$$p^{k_1}\cdot x^{k_1}\geq p^{k_1}\cdot x^{k_2}, \quad p^{k_2}\cdot x^{k_2}\geq p^{k_2}\cdot x^{k_3}, \quad\dots,\quad p^{k_{m-1}}\cdot x^{k_{m-1}}\geq p^{k_{m-1}}\cdot x^{k_m}$$

alors

$$p^{k_m}\cdot x^{k_m} \ \leq\ p^{k_m}\cdot x^{k_1}.$$

> *« En d'autres termes, GARP tient si chaque fois que $x^{k_1}$ est révélé préféré à $x^{k_2}$, et $x^{k_2}$ à $x^{k_3}$, …, et $x^{k_{m-1}}$ à $x^{k_m}$, alors **$x^{k_1}$ est au moins aussi cher que $x^{k_m}$ quand $x^{k_m}$ est choisi**. »*

> *« (Notez que **SARP est plus fort**, exigeant que $x^{k_1}$ soit **strictement plus cher** que $x^{k_m}$.) »*

> **La hiérarchie, à mémoriser.**
>
> | Axiome | Portée | Force | Équivalent à |
> |---|---|---|---|
> | **WARP** | **paires** seulement | le plus faible | maximisation d'utilité **si $n=2$** seulement |
> | **GARP** | séquences, inégalité **large** | intermédiaire | utilité continue, croissante, **concave** (Afriat) — sur données **finies** |
> | **SARP** | séquences, inégalité **stricte** | le plus fort | maximisation d'utilité (Houthakker, Richter) |
>
> ⚠️ **La différence GARP / SARP tient à une inégalité.** SARP exige $p^{k_m}\cdot x^{k_1} > p^{k_m}\cdot x^{k_m}$ (strict) ; GARP se contente de $\geq$. Concrètement, **GARP tolère les indifférences**, SARP non. C'est ce qui rend GARP applicable à des données réelles, où deux paniers peuvent coûter exactement le même montant.

### 6.3 La limite : les préférences hors échantillon

> *« Cependant, avec seulement une **quantité finie** de données, les préférences du consommateur **ne sont pas complètement fixées** aux paniers "hors échantillon". Ainsi, il peut y avoir **beaucoup de fonctions d'utilité différentes** qui rationalisent les données (finies). »*

**Le cas favorable (Fig. 2.5).** *« Supposons qu'on ait observé le consommateur choisir $x^0$ aux prix $p^0$ et $x^1$ aux prix $p^1$. Il est facile de voir que $x^0$ est révélé préféré à $x^1$. Donc, pour **toute** fonction d'utilité rationalisant ces données, on doit avoir $u(x^0)>u(x^1)$. »*

Pour comparer deux paniers **hors échantillon** $x$ et $y$ :

| Étape | Inégalité | Justification |
|---|---|---|
| 1 | $u(x)\geq u(x^0)$ | $x$ contient plus que $x^0$, et $u$ est croissante |
| 2 | $u(x^0)>u(x^1)$ | préférence révélée |
| 3 | $u(x^1)>u(y)$ | *« $y$ coûte moins que $x^1$ quand $x^1$ a été choisi »* |

$$u(x)\geq u(x^0)>u(x^1)>u(y) \qquad\Longrightarrow\qquad u(x)>u(y)$$

*« pour **toute** fonction d'utilité croissante qui aurait pu engendrer les données observées. »*

**Le cas défavorable — le contre-exemple du livre.**

> *« Mais les choses ne s'arrangent pas toujours si bien. »*

Une seule observation : $x^1=(1,1)$ acheté aux prix $p^1=(2,1)$, donc revenu $3$.

| Utilité candidate | Rationalise-t-elle ? | Comparaison hors échantillon $x=(3,1)$ vs $y=(1,7)$ |
|---|---|---|
| $u(x)=x_1^2x_2$ | tangente en $x^1$ à $2x_1+x_2=3$ | $u(3,1)=9$, $u(1,7)=7$ ⟹ **$x\succ y$** |
| $v(x)=x_1(x_2+1)$ | tangente au même point | $v(3,1)=6$, $v(1,7)=8$ ⟹ **$y\succ x$** |

> *« Cela ne serait pas un problème si $u(x)$ et $v(x)$ étaient de simples transformations monotones l'une de l'autre — **mais elles ne le sont pas**. »*

**Les deux utilités rationalisent exactement les mêmes données et donnent des verdicts opposés hors échantillon.**

<details class="details--riche">
<summary>

**Vérifier que les deux utilités rationalisent bien l'observation**

</summary>

<div class="callout" data-kind="plus">

<span class="callout__lab">Enrichissement pédagogique (hors cours) — le livre écrit « comme vous pouvez facilement le vérifier ».</span>

</div>

La donnée : $x^1=(1,1)$ choisi à $p^1=(2,1)$, donc revenu $y=p^1\cdot x^1=3$. La contrainte est $2x_1+x_2=3$, de pente $-2$.

**Pour $u(x)=x_1^2x_2$.**

$$\frac{\partial u}{\partial x_1}=2x_1x_2 \qquad \frac{\partial u}{\partial x_2}=x_1^2 \qquad\Longrightarrow\qquad \text{TMS}_{12}=\frac{2x_1x_2}{x_1^2}=\frac{2x_2}{x_1}$$

En $(1,1)$ : $\text{TMS}_{12}=2=\dfrac{p_1}{p_2}=\dfrac{2}{1}$ — la condition de tangence (1.11) est satisfaite. $u$ est strictement quasiconcave (Cobb-Douglas à exposants positifs), donc le théorème 1.4 conclut : $(1,1)$ **est** l'optimum.

**Pour $v(x)=x_1(x_2+1)$.**

$$\frac{\partial v}{\partial x_1}=x_2+1 \qquad \frac{\partial v}{\partial x_2}=x_1 \qquad\Longrightarrow\qquad \text{TMS}_{12}=\frac{x_2+1}{x_1}$$

En $(1,1)$ : $\text{TMS}_{12}=\dfrac{2}{1}=2$ — **la même tangence**. $v$ est aussi strictement quasiconcave (c'est une Cobb-Douglas translatée). $(1,1)$ est également son optimum.

**Les valeurs hors échantillon.**

| Panier | $u=x_1^2x_2$ | $v=x_1(x_2+1)$ |
|---|---|---|
| $x=(3,1)$ | $9\cdot1=\mathbf{9}$ | $3\cdot2=\mathbf{6}$ |
| $y=(1,7)$ | $1\cdot7=\mathbf{7}$ | $1\cdot8=\mathbf{8}$ |

$u$ classe $x$ au-dessus, $v$ classe $y$ au-dessus.

> **La leçon.** Une **seule** observation ne fixe qu'**un point de tangence**. Toutes les utilités partageant cette tangence rationalisent la donnée, et elles peuvent diverger arbitrairement ailleurs. Il faut **beaucoup** d'observations, à des prix **variés**, pour contraindre les préférences sur une large région.
>
> ⚠️ **Ce n'est pas un défaut de GARP mais une limite d'information.** Aucun axiome ne peut extraire des données ce qu'elles ne contiennent pas.

</details>

### 6.4 Varian et Knoblauch — la solution partielle

> *« Donc, pour un panier donné $y$, peut-on trouver **tous** les paniers $x$ tels que $u(x)>u(y)$ pour **toute** fonction d'utilité rationalisant le jeu de données ? Une solution partielle a été fournie par **Varian (1982)**. Varian a décrit un ensemble de paniers tels que chaque $x$ de l'ensemble satisfait $u(x)>u(y)$ pour toute $u(\cdot)$ rationalisant les données. **Knoblauch (1992)** a ensuite montré que l'ensemble de Varian est une **solution complète** — c'est-à-dire qu'il contient **tous** ces paniers. »*

### 6.5 L'état de la recherche, selon le livre

> *« Malheureusement, les données de consommation contiennent **habituellement des violations de GARP**. Ainsi, la recherche porte maintenant sur des **critères** aidant à décider **quand les violations de GARP sont assez peu importantes pour être ignorées**, et sur des **algorithmes pratiques** qui construiront des fonctions d'utilité appropriées sur des jeux de données présentant des violations mineures de GARP. »*

> ⚠️ **C'est une note d'honnêteté empirique qu'il faut retenir.** Le programme de Samuelson — fonder toute la théorie sur les choix observables — est **théoriquement accompli** (SARP ⟺ maximisation, Afriat pour les données finies), mais il **échoue en pratique** : les données réelles violent GARP. La question n'est donc plus « la théorie est-elle vraie ? » mais « **de combien est-elle fausse, et est-ce grave ?** »

<details class="details--riche">
<summary>

**Exercice 2.13 — deux simplifications utiles de WARP**

</summary>

**Énoncé.** (a) Supposons qu'une fonction de choix $x(p,y)\in\mathbb{R}^n_+$ soit **homogène de degré zéro** en $(p,y)$. Montrer que WARP est satisfait pour tout $(p,y)$ **si et seulement si** il est satisfait sur $\{(p,1) \mid p\in\mathbb{R}^n_{++}\}$. (b) Supposons qu'une fonction de choix satisfasse **homogénéité** et **équilibre budgétaire**. Supposons de plus que, chaque fois que $p^1$ n'est **pas proportionnel** à $p^0$, on ait $(p^1)^{\mathsf T}s(p^0,y)\,p^1<0$. Montrer que $x(p,y)$ satisfait WARP.

**Indication du livre (p. 632), citée verbatim :** *« Let $x^0=x(p^0,1)$, $x^1=x(p^1,1)$, and consider $f(t)\equiv(p^0-p^1)\cdot x\big(p^1+t(p^0-p^1),\ (p^1+t(p^0-p^1))\cdot x^0\big)$ for $t\in[0,1]$. Show that if $x^0$ is revealed preferred to $x^1$ at $(p^0,1)$, then $f$ attains a maximum uniquely at $0$ on $[0,1]$. »*

*Développement pédagogique à partir de cette indication.*

**(a) La réduction au revenu unitaire.**

*Sens $\Rightarrow$ :* trivial — $\{(p,1)\}$ est un sous-ensemble de tous les $(p,y)$.

*Sens $\Leftarrow$ :* soient $x^0=x(p^0,y^0)$ et $x^1=x(p^1,y^1)$ avec $p^0\cdot x^1\leq p^0\cdot x^0$. Par **homogénéité**, $x(p^i,y^i)=x\big(p^i/y^i,\,1\big)$. Posons $\tilde p^i \equiv p^i/y^i$.

En divisant l'hypothèse par $y^0>0$ : $\tilde p^0\cdot x^1\leq \tilde p^0\cdot x^0$. WARP sur $\{(p,1)\}$ donne alors $\tilde p^1\cdot x^0>\tilde p^1\cdot x^1$, qu'on remultiplie par $y^1>0$ : $p^1\cdot x^0>p^1\cdot x^1$ . $\blacksquare$

> **L'intérêt pratique.** Sous homogénéité, on peut **toujours normaliser $y=1$** et ne tester WARP que sur l'espace des prix : la dimension du problème passe de $n+1$ à $n$. C'est ce que la partie (b) utilise d'emblée en posant $x^0=x(p^0,1)$.

**(b) La structure de la preuve — ce que l'indication demande de montrer.**

Posons, comme le livre l'indique,

$$p^t \equiv p^1+t\,(p^0-p^1), \qquad f(t)\equiv (p^0-p^1)\cdot x\Big(p^t,\ p^t\cdot x^0\Big), \qquad t\in[0,1].$$

C'est **la même construction qu'au §3.2** : on fait varier les prix le long du segment joignant $p^1$ à $p^0$, en compensant le revenu de sorte que $x^0$ reste tout juste accessible.

**Le calcul de la dérivée.** En dérivant par rapport à $t$ et en utilisant l'équilibre budgétaire exactement comme aux pas 5-6 du §3.2, on obtient une **forme quadratique de Slutsky** dans la direction $p^0-p^1$ :

$$f'(t)=\big(p^0-p^1\big)^{\mathsf T}\,s\big(p^t,\ p^t\cdot x^0\big)\,\big(p^0-p^1\big).$$

**La conclusion.** Si $p^0$ n'est **pas proportionnel** à $p^1$, alors $p^t$ n'est proportionnel à $p^0-p^1$ pour aucun $t$, et l'hypothèse de l'énoncé donne $f'(t)<0$ **pour tout $t\in[0,1]$**. La fonction $f$ est donc **strictement décroissante**, et atteint son maximum **uniquement en $t=0$** — ce que l'indication demandait d'établir.

**Ce que ce maximum donne.** En $t=1$, $p^t=p^0$ et l'équilibre budgétaire donne $x(p^0,p^0\cdot x^0)=x^0$. La stricte décroissance $f(1)<f(0)$ s'écrit donc

$$\big(p^0-p^1\big)\cdot x^0 \ <\ \big(p^0-p^1\big)\cdot x\big(p^1,\ p^1\cdot x^0\big).$$

Or, par équilibre budgétaire, $p^1\cdot x\big(p^1,p^1\cdot x^0\big)=p^1\cdot x^0$ : les deux termes en $p^1$ **s'annulent**, et il reste

$$\boxed{\;p^0\cdot x^0 \ <\ p^0\cdot x\big(p^1,\ p^1\cdot x^0\big)\;}$$

C'est **exactement l'inégalité (2.5) du §3.2, en version stricte**. Le §3.2 la déduisait de WARP ; ici on la déduit de la semi-définie négativité stricte. En la combinant avec la réduction de la partie (a), on remonte à WARP sur tout $(p,y)$.

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que l'exercice établit.</span>

Une **réciproque partielle** du §3.2 : — §3.2 : WARP + budget $\Longrightarrow$ semi-définie négativité ; — exercice 2.13(b) : semi-définie négativité **stricte hors proportionnalité** + budget + homogénéité $\Longrightarrow$ WARP.

Les deux propriétés sont donc **presque équivalentes**, à la frontière près : les directions **proportionnelles à $p$**, où $s(p,y)\,p=0$ force l'égalité et interdit la stricte négativité. C'est la même singularité que celle signalée à la fiche 503 (§4.3) — la matrice de substitution ne peut jamais être *définie* négative.

</div>

</details>

## Comment reconnaître le type d'exercice

| Signal dans l'énoncé | Famille | Marche à suivre |
|---|---|---|
| Deux couples $(p^i,x^i)$ + « WARP est-il satisfait ? » | **Test numérique** | Tableau des quatre produits scalaires, puis définition 2.1 |
| Trois couples ou plus | **Cycle possible** | Tableau complet $K\times K$, repérer toutes les relations $R$, chercher un cycle |
| « montrer que WARP implique … » | **Dérivation** | Homogénéité (§3.1) ou semi-définie négativité (§3.2) |
| « montrer qu'une demande issue d'une utilité satisfait … » | **Sens direct** | Unicité du maximiseur ⟹ $u(x^0)>u(x^1)$ ⟹ conclusion |
| « à deux biens, montrer que … » | **Cas dégénéré** | Décompte : $s\,p=0$ et $p^{\mathsf T}s=0$ suffisent à forcer la symétrie |
| GARP, SARP, données finies | **Afriat** | Bien identifier laquelle des trois inégalités est en jeu |
| « ces données déterminent-elles le classement de $x$ et $y$ ? » | **Hors échantillon** | Chercher une **chaîne** d'inégalités ; sinon, exhiber deux $u$ opposées |

**Les deux questions de cadrage :**

1. **Combien de biens ?** À $n=2$, WARP suffit ; à $n\geq3$, il ne suffit pas. C'est la première chose à repérer.
2. **Combien d'observations ?** Un nombre **fini** ⟹ cadre d'Afriat (GARP) ; une **fonction** de choix complète ⟹ cadre de Samuelson-Houthakker (WARP/SARP).

## Comment résoudre ce type d'exercice — les quatre méthodes

### Méthode 1 — Tester WARP sur des données

1. **Dresser le tableau** des produits scalaires $p^i\cdot x^j$, avec les **revenus en diagonale**.

|  | $x^0$ | $x^1$ | $x^2$ |
|---|---|---|---|
| $p^0$ | $y^0$ |  |  |
| $p^1$ |  | $y^1$ |  |
| $p^2$ |  |  | $y^2$ |

2. **Lire les relations $R$ ligne par ligne** : si $p^i\cdot x^j \leq p^i\cdot x^i$ (la case est $\leq$ la diagonale de sa ligne), alors $x^i\,R\,x^j$.
3. **Pour chaque paire**, vérifier qu'on n'a **pas** $x^i\,R\,x^j$ **et** $x^j\,R\,x^i$ simultanément.
4. **S'il y a trois observations ou plus**, chercher en plus un **cycle** $x^{i}\,R\,x^{j}\,R\,x^{k}\,R\,x^{i}$ — WARP peut être satisfait et le cycle exister quand même.

### Méthode 2 — Dériver l'homogénéité à partir de WARP

1. Poser $p^1=tp^0$, $y^1=ty^0$.
2. Écrire l'**équilibre budgétaire** aux deux systèmes : $p^1\cdot x^1=ty^0=t\,p^0\cdot x^0$.
3. Diviser par $t$ ⟹ $p^0\cdot x^1=p^0\cdot x^0$.
4. Remultiplier ⟹ $p^1\cdot x^1=p^1\cdot x^0$.
5. **Si les paniers étaient distincts**, l'étape 3 déclencherait WARP, qui contredirait l'étape 4. Donc $x^0=x^1$.

### Méthode 3 — Dériver la semi-définie négativité

1. **Compenser à la Slutsky** : à des prix $p$ quelconques, poser le revenu à $p\cdot x^0$.
2. **WARP** donne $p^0\cdot x^0 \leq p^0\cdot x(p^1,p^1\cdot x^0)$.
3. **Le budget** donne $p^1\cdot x^0 = p^1\cdot x(p^1,p^1\cdot x^0)$.
4. **Soustraire** ⟹ $(p^1-p^0)\cdot x^0 \geq (p^1-p^0)\cdot x(p^1,p^1\cdot x^0)$.
5. **Poser $p^1=p^0+tz$**, $z$ **arbitraire**, diviser par $t>0$.
6. Constater que $f(t)=z\cdot x\big(p^0+tz,(p^0+tz)\cdot x^0\big)$ est **maximisée en $t=0$**, donc $f'(0)\leq0$.
7. Reconnaître dans $f'(0)$ la **forme quadratique de Slutsky** ; conclure par l'arbitraire de $z$.

### Méthode 4 — Comparer deux paniers hors échantillon

1. **Chercher une chaîne** reliant $x$ et $y$ aux observations : — $u(x)\geq u(x^i)$ si $x \geq x^i$ (monotonie) ; — $u(x^i)>u(x^j)$ si $x^i\,R\,x^j$ (préférence révélée) ; — $u(x^j)>u(y)$ si $y$ coûtait moins que $x^j$ quand $x^j$ a été choisi.
2. **Si la chaîne se ferme**, la conclusion vaut pour **toute** utilité croissante rationalisant les données.
3. **Si elle ne se ferme pas**, exhiber **deux** utilités rationalisant les mêmes données et classant $x$ et $y$ en sens opposés — la question est alors **indécidable** sur ces données.

## 🔴 Common mistakes

| # | L'erreur | Pourquoi c'est faux | Ce qu'il faut écrire |
|---|---|---|---|
| 1 | Appeler $x(p,y)$ une « fonction de demande » dans le cadre du §2.3 | Aucune utilité n'a été supposée | C'est une **fonction de choix** |
| 2 | Oublier le mot « distinct » dans WARP | Avec $x^0=x^1$, la conclusion serait absurde | L'axiome ne porte que sur des paniers **différents** |
| 3 | Écrire l'hypothèse de WARP avec $<$ strict | La définition emploie $\leq$ : il suffit que $x^1$ ait été **abordable** | $p^0\cdot x^1\leq p^0\cdot x^0$ |
| 4 | Écrire la conclusion de WARP avec $\geq$ | La conclusion est **stricte** : $x^0$ doit être **inabordable** | $p^1\cdot x^0 > p^1\cdot x^1$ |
| 5 | Croire que WARP interdit les cycles | Il ne contrôle que les **paires** — l'exemple de Hicks le montre | Seul **SARP** interdit tous les cycles |
| 6 | Conclure de WARP à l'existence d'une utilité, sans compter les biens | Vrai à $n=2$, **faux** à $n\geq3$ | Toujours vérifier le nombre de biens |
| 7 | Croire que WARP + budget donnent la symétrie de Slutsky | Ils donnent homogénéité et semi-définie négativité, **pas** la symétrie | C'est exactement ce qui manque |
| 8 | Dans la dérivation §3.2, oublier que $z$ est **arbitraire** | Sans cela, on n'a l'inégalité que pour une direction — pas la semi-définie négativité | Conclure par l'arbitraire de $z$ |
| 9 | Écrire $f'(0)=0$ au lieu de $f'(0)\leq0$ | Le maximum est atteint au **bord gauche** de $[0,\bar t\,)$ | Une **inégalité**, pas une égalité |
| 10 | Oublier la stricte convexité dans la réciproque du Concept 4 | Sans unicité, « abordable mais non choisi » ne donne que $u(x^0)\geq u(x^1)$ | La conclusion **stricte** de WARP tomberait |
| 11 | Croire que l'exception à deux biens est une curiosité | C'est un **cas dégénéré** de décompte : 4 entrées, 4 équations | À $n=3$ : 9 entrées, 6 équations |
| 12 | Confondre GARP et SARP | SARP exige une inégalité **stricte**, GARP une inégalité **large** | GARP **tolère les indifférences** |
| 13 | Croire que GARP est plus fort que SARP | Le livre : GARP est *« légèrement plus faible »* | WARP $\subset$ GARP $\subset$ SARP en force |
| 14 | Énoncer le théorème d'Afriat sans « fini » | Il porte sur un **ensemble fini** de données | C'est tout son intérêt |
| 15 | Oublier « concave » dans l'énoncé d'Afriat | L'utilité obtenue est **continue, croissante et concave** | La concavité est un bonus du théorème |
| 16 | Croire que les données finies déterminent les préférences partout | Hors échantillon, elles ne sont **pas fixées** | Contre-exemple $x_1^2x_2$ vs $x_1(x_2+1)$ |
| 17 | Croire que deux utilités rationalisant les mêmes données sont des transformées monotones l'une de l'autre | Le livre le nie explicitement : *« mais elles ne le sont pas »* | Elles peuvent **inverser** un classement hors échantillon |
| 18 | Présenter la théorie comme empiriquement validée | *« Les données de consommation contiennent habituellement des violations de GARP »* | La recherche porte sur la **tolérance** aux violations |
| 19 | Dans un tableau de test, comparer une case à la mauvaise diagonale | Il faut comparer $p^i\cdot x^j$ à $p^i\cdot x^i$, **même ligne** | La diagonale de la **ligne**, pas de la colonne |
| 20 | Croire que la symétrie et la transitivité sont deux questions séparées | Le livre : *« il y a une connexion profonde »* | Elles sont **deux formulations du même fait** |

## 📌 Ultimate Review

**Le programme de Samuelson (1947).** Fonder la théorie sur des axiomes de **cohérence des choix observables**, et non sur des axiomes de préférences inobservables.

**Vocabulaire.** $x(p,y)$ est ici une **fonction de choix** — pas une fonction de demande, car aucune utilité n'est supposée.

**Préférence révélée :** $p^0\cdot x^1\leq p^0\cdot x^0$ signifie « $x^0$ est révélé préféré à $x^1$ ».

**DÉFINITION 2.1 — WARP.** Pour toute paire **distincte** $x^0$ (choisi à $p^0$) et $x^1$ (choisi à $p^1$) :

$$\boxed{\;p^0\cdot x^1\leq p^0\cdot x^0 \ \Longrightarrow\ p^1\cdot x^0 > p^1\cdot x^1\;}$$

Hypothèse **large**, conclusion **stricte**.

**Ce que WARP + équilibre budgétaire impliquent.**

| Propriété | Dérivation |
|---|---|
| **Homogénéité de degré 0** | budget aux deux systèmes ⟹ $p^0\cdot x^1=p^0\cdot x^0$ **et** $p^1\cdot x^1=p^1\cdot x^0$ ⟹ WARP force $x^0=x^1$ |
| **Semi-définie négativité** de $s(p,y)$ | compensation à la Slutsky ⟹ $f(t)=z\cdot x\big(p^0+tz,(p^0+tz)\cdot x^0\big)$ maximisée en $t=0$ ⟹ $f'(0)\leq0$, qui **est** la forme quadratique de Slutsky |

**Ce qui manque : la SYMÉTRIE.** Avec elle, le théorème 2.6 concluerait immédiatement.

**La réciproque.** Une demande issue d'une utilité **strictement monotone et strictement convexe** satisfait WARP. *(L'unicité du maximiseur donne $u(x^0)>u(x^1)$, donc $x^0$ inabordable quand $x^1$ est choisi.)*

**L'exception à deux biens.**

$$\underbrace{\text{WARP + budget}}_{n=2} \Longrightarrow \text{homogénéité} + \text{SDN} + \underbrace{\text{symétrie}}_{\text{ex. 2.9a}} \xRightarrow{\ \text{thm 2.6}\ } \text{utilité existe}$$

Explication équivalente : à deux biens, la relation $R$ **n'a pas de cycle intransitif**.

*Le décompte :* à $n=2$, les relations $s\,p=0$ et $p^{\mathsf T}s=0$ donnent 4 équations pour 4 entrées — juste assez. À $n=3$ : 6 équations pour 9 entrées — insuffisant.

**Le contre-exemple de Hicks (exercice 2.10).** Trois observations satisfaisant WARP par paires, avec le cycle

$$x^1 \ R \ x^0 \ R \ x^2 \ R \ x^1$$

**SARP.** Pour toute **séquence** $x^0\,R\,x^1\,R\,\dots\,R\,x^k$, il n'est pas le cas que $x^k\,R\,x^0$.

$$\boxed{\;\text{SARP} \iff \text{maximisation d'utilité}\;}$$

*(Houthakker 1950 pour l'argument original ; Richter 1966 pour « une preuve élégante ».)*

**GARP (Afriat 1967)** — légèrement **plus faible** que SARP : la conclusion est $p^{k_m}\cdot x^{k_m}\leq p^{k_m}\cdot x^{k_1}$ (large) au lieu de $<$ (strict). **GARP tolère les indifférences.**

**THÉORÈME D'AFRIAT.** Un ensemble **fini** de données satisfait GARP **si et seulement si** il existe une utilité **continue, croissante et concave** qui le rationalise.

**La hiérarchie.**

| Axiome | Portée | Équivalent à |
|---|---|---|
| **WARP** | paires | maximisation **si $n=2$** seulement |
| **GARP** | séquences, $\leq$ | utilité continue croissante concave, sur données **finies** |
| **SARP** | séquences, $<$ | maximisation d'utilité |

**La limite des données finies.** Hors échantillon, les préférences ne sont pas fixées. Contre-exemple du livre : $x^1=(1,1)$ à $p^1=(2,1)$ est rationalisé **à la fois** par $u=x_1^2x_2$ et par $v=x_1(x_2+1)$, qui classent $(3,1)$ et $(1,7)$ en **sens opposés**. Solution partielle : **Varian (1982)**, complétée par **Knoblauch (1992)**.

**L'état empirique, selon le livre.** *« Malheureusement, les données de consommation contiennent habituellement des violations de GARP. »*

## 🧠 Active Recall

<details class="details--riche">
<summary>

**1. Quelle question Samuelson pose-t-il, et pourquoi ?**

</summary>

> *« Pourquoi ne pas **commencer et finir par le comportement observable** ? »*

Parce que l'approche du chapitre 1 part de **préférences inobservables** pour prédire des choix observables. Samuelson montre que *« virtuellement chaque prédiction »* peut être obtenue à partir d'hypothèses portant directement sur **la cohérence des choix**.

</details>

<details class="details--riche">
<summary>

**2. Pourquoi le livre insiste-t-il sur le terme « fonction de choix » ?**

</summary>

Parce qu'une **fonction de demande** est par définition la solution d'un programme de maximisation — elle **présuppose** la théorie. Une **fonction de choix** ne présuppose rien : *« cela dénote juste les quantités que le consommateur choisit face à $p$ et $y$ »*.

Tout l'enjeu du §2.3 est de savoir **quand une fonction de choix est une fonction de demande**.

</details>

<details class="details--riche">
<summary>

**3. Énoncer WARP en soignant les trois détails.**

</summary>

Pour toute paire **distincte** $x^0$ choisi à $p^0$ et $x^1$ choisi à $p^1$ :

$$p^0\cdot x^1\leq p^0\cdot x^0 \quad\Longrightarrow\quad p^1\cdot x^0 > p^1\cdot x^1$$

| Détail | Raison |
|---|---|
| **« distinct »** | sinon la conclusion serait $p^1\cdot x^0>p^1\cdot x^0$, absurde |
| hypothèse **large** ($\leq$) | il suffit que $x^1$ ait été **abordable** |
| conclusion **stricte** ($>$) | $x^0$ doit être **inabordable**, pas seulement non choisi |

</details>

<details class="details--riche">
<summary>

**4. Quelle est la règle graphique pour tester WARP ?**

</summary>

Tracer les deux droites de budget et marquer les deux paniers choisis.

$$\text{WARP est VIOLÉ} \iff \text{chaque panier est sur ou sous la droite de budget de l'autre.}$$

Sur la Fig. 2.3(a), $x^0$ est inabordable au budget de $p^1$ ⟹ WARP tient. Sur la Fig. 2.3(b), les deux sont mutuellement abordables ⟹ WARP est violé.

</details>

<details class="details--riche">
<summary>

**5. Démontrer que WARP + budget impliquent l'homogénéité de degré zéro.**

</summary>

Soit $x^0$ choisi à $(p^0,y^0)$ et $x^1$ choisi à $(p^1,y^1)=(tp^0,ty^0)$.

L'équilibre budgétaire donne $p^1\cdot x^1=ty^0=t\,p^0\cdot x^0$. En divisant par $t$ :

$$p^0\cdot x^1=p^0\cdot x^0 \tag{2.3}$$

En resubstituant $p^1$ pour $tp^0$ :

$$p^1\cdot x^1=p^1\cdot x^0 \tag{2.4}$$

Si $x^0\neq x^1$, (2.3) déclenche WARP, qui exige $p^1\cdot x^0>p^1\cdot x^1$ — contredisant (2.4). Donc $x^0=x^1$. $\blacksquare$

⚠️ Aucune utilité, aucune convexité n'a été supposée.

</details>

<details class="details--riche">
<summary>

**6. Quelle compensation est utilisée au §3.2, et pourquoi celle-là ?**

</summary>

La compensation **à la Slutsky** : *« les prix varient arbitrairement tandis que son revenu est compensé de sorte qu'il puisse tout juste s'offrir le panier $x^0$ »*. Le revenu compensé est donc $p\cdot x^0$.

**Pourquoi celle-là :** elle est **observable** ($x^0$ et $p$ sont mesurables), contrairement à la compensation de Hicks qui exige de connaître $u$. Dans un cadre où l'on refuse de supposer une utilité, c'est la seule disponible.

</details>

<details class="details--riche">
<summary>

**7. Dérouler la démonstration de la semi-définie négativité.**

</summary>

1. **WARP** : $p^0\cdot x^0 \leq p^0\cdot x^1$ où $x^1=x(p^1,p^1\cdot x^0)$ — (2.5).
2. **Budget** : $p^1\cdot x^0 = p^1\cdot x(p^1,p^1\cdot x^0)$ — (2.6).
3. **Soustraire** : $(p^1-p^0)\cdot x^0 \geq (p^1-p^0)\cdot x(p^1,p^1\cdot x^0)$ — (2.7).
4. **Poser $p^1=p^0+tz$**, $z$ arbitraire, diviser par $t>0$ — (2.9).
5. La fonction $f(t)=z\cdot x\big(p^0+tz,(p^0+tz)\cdot x^0\big)$ est **maximisée en $t=0$** (l'égalité y est atteinte).
6. Donc $f'(0)\leq0$, c'est-à-dire

$$\sum_i\sum_j z_i\left[\frac{\partial x_i}{\partial p_j}+x_j\frac{\partial x_i}{\partial y}\right]z_j\leq0.$$

7. $z$ étant **arbitraire**, la matrice de Slutsky est semi-définie négative. $\blacksquare$

</details>

<details class="details--riche">
<summary>

**8. Pourquoi $f'(0)\leq0$ et non $f'(0)=0$ ?**

</summary>

Parce que le maximum est atteint à l'**extrémité gauche** de l'intervalle $[0,\bar t\,)$, pas à l'intérieur. Un maximum en bord gauche n'impose que la décroissance vers la droite : $f'(0)\leq0$.

Et c'est **exactement ce qu'il faut** : la semi-définie négativité est une **inégalité**, pas une égalité.

</details>

<details class="details--riche">
<summary>

**9. Que manque-t-il à WARP + budget pour conclure par le théorème 2.6 ?**

</summary>

La **symétrie** de la matrice de Slutsky.

| Condition du thm 2.6 | Obtenue ? |
|---|---|
| Équilibre budgétaire | par hypothèse |
| Semi-définie négativité | démontrée (§3.2) |
| **Symétrie** | **pas en général** |

C'est précisément ce qui fait que WARP ne suffit pas au-delà de deux biens.

</details>

<details class="details--riche">
<summary>

**10. Démontrer que la maximisation d'utilité implique WARP.**

</summary>

Sous préférences strictement monotones et **strictement convexes** :

1. Le maximiseur est **unique** et le budget est saturé (exercice 1.16).
2. Si $p^0\cdot x^1\leq p^0\cdot x^0$, alors $x^1$ était **abordable** face à $p^0$ et n'a pas été choisi ⟹ $u(x^0)>u(x^1)$.
3. Donc quand $x^1$ est choisi face à $p^1$, $x^0$ ne peut pas être disponible : $p^1\cdot x^0>p^1\cdot x^1$. $\blacksquare$

⚠️ Sans **unicité**, l'étape 2 ne donnerait que $u(x^0)\geq u(x^1)$ et la conclusion stricte tomberait.

</details>

<details class="details--riche">
<summary>

**11. Que veut dire « rationaliser » ?**

</summary>

> *« S'il existe une fonction d'utilité qui produirait les choix observés comme **résultat du processus de maximisation**, nous disons que la fonction d'utilité **rationalise** le comportement observé. »*

C'est le concept central du §2.3 et du théorème d'Afriat.

</details>

<details class="details--riche">
<summary>

**12. WARP suffit-il à garantir l'existence d'une utilité rationalisante ?**

</summary>

> *« La réponse est **oui — et non**. S'il n'y a que **deux biens**, alors WARP implique qu'il existera une fonction d'utilité qui rationalise les choix ; s'il y a **plus de deux biens**, alors même si WARP tient, il **peut ne pas exister** une telle fonction. »*

</details>

<details class="details--riche">
<summary>

**13. Donner les deux explications de l'exception à deux biens.**

</summary>

**Explication 1 (symétrie).** À deux biens, budget + homogénéité **impliquent la symétrie** de Slutsky (exercice 2.9a). Comme WARP + budget donnent homogénéité et semi-définie négativité, les **trois** conditions du théorème 2.6 sont réunies.

**Explication 2 (cycles).** À deux biens, la relation « révélé préféré à » **n'a pas de cycle intransitif** (exercice 2.9b), donc elle induit un ordre représentable.

> *« Il y a une **connexion profonde** entre la symétrie de la matrice de Slutsky et la transitivité des préférences. »*

</details>

<details class="details--riche">
<summary>

**14. Pourquoi le décompte explique-t-il l'exception à deux biens ?**

</summary>

La matrice $s$ a $n^2$ entrées. Les relations $s\,p=0$ (homogénéité, via Euler) et $p^{\mathsf T}s=0$ (budget) fournissent $2n$ équations.

| $n$ | Entrées | Équations | Symétrie forcée ? |
|---|---|---|---|
| 2 | 4 | 4 | **oui** |
| 3 | 9 | 6 | **non** |

Deux biens forment un **cas dégénéré**, pas un cas représentatif.

</details>

<details class="details--riche">
<summary>

**15. Décrire le contre-exemple de Hicks.**

</summary>

$$p^0=(1,1,2),\ x^0=(5,19,9) \qquad p^1=(1,1,1),\ x^1=(12,12,12) \qquad p^2=(1,2,1),\ x^2=(27,11,1)$$

Revenus : $y^0=42$, $y^1=36$, $y^2=50$.

| Comparaison | Verdict |
|---|---|
| $p^1\cdot x^0=33\leq36$, $p^0\cdot x^1=48>42$ | $x^1\,R\,x^0$ |
| $p^2\cdot x^1=48\leq50$, $p^1\cdot x^2=39>36$ | $x^2\,R\,x^1$ |
| $p^0\cdot x^2=40\leq42$, $p^2\cdot x^0=52>50$ | $x^0\,R\,x^2$ |

**WARP est satisfait** dans chaque paire — mais

$$x^1 \ R \ x^0 \ R \ x^2 \ R \ x^1$$

est un **cycle**. Aucune préférence transitive, donc aucune utilité, ne peut rationaliser ces données.

</details>

<details class="details--riche">
<summary>

**16. Énoncer SARP et dire à quoi il est équivalent.**

</summary>

Pour toute **séquence** de paniers distincts $x^0,x^1,\dots,x^k$ où $x^0\,R\,x^1$, $x^1\,R\,x^2$, …, $x^{k-1}\,R\,x^k$, il **n'est pas le cas** que $x^k\,R\,x^0$.

SARP **exclut tous les cycles intransitifs**, donc induit une relation complète et transitive, donc une utilité.

$$\text{SARP} \iff \text{maximisation d'utilité}$$

Références du livre : **Houthakker (1950)**, **Richter (1966)**.

</details>

<details class="details--riche">
<summary>

**17. Démontrer que la maximisation implique SARP.**

</summary>

Sous stricte quasiconcavité et stricte croissance, le maximiseur est unique, donc

$$x^i \ R \ x^{i+1} \ \text{ et } \ x^i\neq x^{i+1} \quad\Longrightarrow\quad u(x^i)>u(x^{i+1}).$$

Le long de la chaîne : $u(x^0)>u(x^1)>\dots>u(x^k)$, donc $u(x^0)>u(x^k)$ par transitivité de $>$ sur $\mathbb{R}$.

Si $x^k\,R\,x^0$, le même argument donnerait $u(x^k)>u(x^0)$ — contradiction. $\blacksquare$

**L'idée :** la préférence révélée **hérite de la transitivité de l'ordre des réels**.

</details>

<details class="details--riche">
<summary>

**18. Qu'est-ce que GARP, et en quoi diffère-t-il de SARP ?**

</summary>

GARP (Afriat 1967) : si $x^{k_1}\,R\,x^{k_2}\,R\,\dots\,R\,x^{k_m}$, alors

$$p^{k_m}\cdot x^{k_m} \ \leq\ p^{k_m}\cdot x^{k_1}$$

c'est-à-dire *« $x^{k_1}$ est **au moins aussi cher** que $x^{k_m}$ quand $x^{k_m}$ est choisi »*.

**SARP exige la version stricte** ($x^{k_1}$ strictement plus cher). GARP est donc *« légèrement plus faible »* — il **tolère les indifférences**, ce qui le rend applicable à des données réelles où deux paniers peuvent coûter exactement le même montant.

</details>

<details class="details--riche">
<summary>

**19. Énoncer le théorème d'Afriat.**

</summary>

> *« Un ensemble **fini** de données observées de prix et de quantités satisfait GARP **si et seulement si** il existe une fonction d'utilité **continue, croissante et concave** qui rationalise les données. »*

⚠️ Trois mots à ne pas perdre : **fini** (c'est tout l'intérêt), **si et seulement si**, et **concave** (un bonus par rapport à la quasiconcavité du théorème 2.6).

</details>

<details class="details--riche">
<summary>

**20. Classer WARP, GARP et SARP par force croissante.**

</summary>

$$\text{WARP} \ \subset \ \text{GARP} \ \subset \ \text{SARP}$$

| Axiome | Portée | Inégalité | Équivalent à |
|---|---|---|---|
| **WARP** | **paires** | — | maximisation **si $n=2$** |
| **GARP** | séquences | **large** ($\leq$) | utilité continue croissante concave, données **finies** |
| **SARP** | séquences | **stricte** ($<$) | maximisation d'utilité |

</details>

<details class="details--riche">
<summary>

**21. Dans le cas favorable de la figure 2.5, comment compare-t-on deux paniers hors échantillon ?**

</summary>

On construit une **chaîne** :

$$\underbrace{u(x)\geq u(x^0)}_{x\,\geq\,x^0,\ u \text{ croissante}} \ > \ \underbrace{u(x^1)}_{x^0\,R\,x^1} \ > \ \underbrace{u(y)}_{y \text{ coûtait moins que } x^1}$$

Donc $u(x)>u(y)$ **pour toute** utilité croissante rationalisant les données observées.

</details>

<details class="details--riche">
<summary>

**22. Le contre-exemple du livre : quelles sont les deux utilités, et que montrent-elles ?**

</summary>

Une seule observation : $x^1=(1,1)$ à $p^1=(2,1)$, revenu $3$.

| Utilité | TMS en $(1,1)$ | $u(3,1)$ | $u(1,7)$ |
|---|---|---|---|
| $u=x_1^2x_2$ | $2x_2/x_1=2$ | $9$ | $7$ |
| $v=x_1(x_2+1)$ | $(x_2+1)/x_1=2$ | $6$ | $8$ |

Les deux sont tangentes à la même droite de budget en $(1,1)$, donc **rationalisent la même observation**. Mais $u$ classe $(3,1)$ au-dessus et $v$ classe $(1,7)$ au-dessus.

> *« Cela ne serait pas un problème si $u$ et $v$ étaient de simples transformations monotones l'une de l'autre — **mais elles ne le sont pas**. »*

</details>

<details class="details--riche">
<summary>

**23. Qu'ont apporté Varian et Knoblauch ?**

</summary>

**Varian (1982)** a décrit un **ensemble** de paniers $x$ tels que $u(x)>u(y)$ pour **toute** utilité rationalisant les données.

**Knoblauch (1992)** a montré que cet ensemble est une **solution complète** — il contient **tous** ces paniers.

Autrement dit : Varian donne une condition suffisante, Knoblauch montre qu'elle est aussi nécessaire.

</details>

<details class="details--riche">
<summary>

**24. Quel est l'état empirique de la théorie, selon le livre ?**

</summary>

> *« Malheureusement, les données de consommation contiennent **habituellement des violations de GARP**. Ainsi, la recherche porte maintenant sur des **critères** aidant à décider quand les violations sont assez peu importantes pour être ignorées, et sur des **algorithmes pratiques** qui construiront des fonctions d'utilité appropriées sur des jeux de données présentant des violations mineures. »*

Le programme de Samuelson est **théoriquement accompli** mais **empiriquement contredit**. La question devient : *de combien la théorie est-elle fausse, et est-ce grave ?*

</details>

<details class="details--riche">
<summary>

**25. Comment tester WARP sur un jeu de $K$ observations, méthodiquement ?**

</summary>

1. **Dresser le tableau** $K\times K$ des $p^i\cdot x^j$, avec les **revenus en diagonale**.
2. **Lire ligne par ligne** : si la case $(i,j)$ est $\leq$ la diagonale de sa ligne, alors $x^i\,R\,x^j$.
3. **Vérifier chaque paire** : jamais $x^i\,R\,x^j$ **et** $x^j\,R\,x^i$.
4. **Si $K\geq3$**, chercher en plus un **cycle** — WARP peut tenir et un cycle exister (Hicks).

⚠️ Comparer une case à la diagonale de sa **ligne**, jamais de sa colonne.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La question de Samuelson (1947) ? | *« Pourquoi ne pas **commencer et finir** par le comportement observable ? »* |
| Que signifie « $x^0$ révélé préféré à $x^1$ » ? | $p^0\cdot x^1\leq p^0\cdot x^0$ : $x^1$ était **abordable** mais $x^0$ a été choisi |
| Pourquoi « fonction de choix » et non « de demande » ? | Aucune **utilité** n'est supposée — c'est une description brute des données |
| L'énoncé de WARP ? | $p^0\cdot x^1\leq p^0\cdot x^0 \Rightarrow p^1\cdot x^0 > p^1\cdot x^1$ |
| Sur quelles paires porte-t-il ? | Seulement les paires **distinctes** |
| L'hypothèse est-elle large ou stricte ? | **Large** ($\leq$) — il suffit que $x^1$ ait été abordable |
| La conclusion est-elle large ou stricte ? | **Stricte** ($>$) — $x^0$ doit être **inabordable** |
| La règle graphique de test ? | WARP est **violé** ssi chaque panier est sur ou sous la droite de budget de l'autre |
| Que WARP + budget donnent-ils ? | **Homogénéité de degré 0** et **semi-définie négativité** de $s(p,y)$ |
| Ce qu'ils ne donnent PAS ? | La **symétrie** de $s(p,y)$ |
| L'argument pour l'homogénéité ? | Budget aux deux systèmes ⟹ $p^0\cdot x^1=p^0\cdot x^0$ et $p^1\cdot x^1=p^1\cdot x^0$ ⟹ WARP force $x^0=x^1$ |
| Quelle compensation utilise le §3.2 ? | Celle de **Slutsky** : revenu $=p\cdot x^0$ — la seule **observable** |
| La fonction $f(t)$ du §3.2 ? | $f(t)=z\cdot x\big(p^0+tz,\ (p^0+tz)\cdot x^0\big)$ |
| Où est-elle maximisée ? | En **$t=0$** |
| Pourquoi $f'(0)\leq0$ et non $=0$ ? | Le maximum est au **bord gauche** de $[0,\bar t\,)$ |
| Où sert l'arbitraire de $z$ ? | À conclure à la semi-définie négativité **pour tous** les vecteurs |
| La maximisation d'utilité implique-t-elle WARP ? | **Oui** — sous préférences str. monotones et **str. convexes** |
| L'hypothèse indispensable pour cette réciproque ? | L'**unicité** du maximiseur (stricte convexité) |
| Que veut dire « rationaliser » ? | Il existe une $u$ dont la maximisation produit les choix observés |
| WARP suffit-il ? | **Oui à 2 biens**, **non à 3 biens ou plus** |
| Explication 1 de l'exception à 2 biens ? | Budget + homogénéité **impliquent la symétrie** (ex. 2.9a) ⟹ thm 2.6 s'applique |
| Explication 2 ? | À 2 biens, la relation $R$ **n'a pas de cycle intransitif** (ex. 2.9b) |
| Le lien profond que le livre souligne ? | Entre **symétrie de Slutsky** et **transitivité** des préférences |
| Le décompte à $n=2$ ? | 4 entrées, 4 équations ($s\,p=0$ et $p^{\mathsf T}s=0$) — **juste assez** |
| Le décompte à $n=3$ ? | 9 entrées, 6 équations — **insuffisant** |
| Le contre-exemple de Hicks — les données ? | $p^0=(1,1,2),x^0=(5,19,9)$ · $p^1=(1,1,1),x^1=(12,12,12)$ · $p^2=(1,2,1),x^2=(27,11,1)$ |
| Les revenus correspondants ? | $42$, $36$, $50$ |
| Le cycle qu'il exhibe ? | $x^1\,R\,x^0\,R\,x^2\,R\,x^1$ |
| Ce que le cycle prouve ? | WARP peut tenir **par paires** et l'ensemble être **intransitif** |
| L'énoncé de SARP ? | Pour toute **séquence** $x^0\,R\,\dots\,R\,x^k$, il n'est pas le cas que $x^k\,R\,x^0$ |
| SARP est équivalent à quoi ? | La **maximisation d'utilité** |
| Les deux références du livre pour SARP ? | **Houthakker (1950)** · **Richter (1966)** |
| Pourquoi la maximisation implique SARP ? | La préférence révélée **hérite de la transitivité de $>$ sur $\mathbb{R}$** |
| Qui a introduit GARP ? | **Afriat (1967)** |
| L'inégalité de GARP ? | $p^{k_m}\cdot x^{k_m}\leq p^{k_m}\cdot x^{k_1}$ — **large** |
| Celle de SARP ? | **Stricte** : $p^{k_m}\cdot x^{k_m}< p^{k_m}\cdot x^{k_1}$ |
| GARP est-il plus fort ou plus faible que SARP ? | **Plus faible** — il **tolère les indifférences** |
| Le théorème d'Afriat ? | Un ensemble **fini** satisfait GARP **ssi** une utilité **continue, croissante, concave** le rationalise |
| Les trois mots à ne pas perdre dans cet énoncé ? | **fini** · **si et seulement si** · **concave** |
| La hiérarchie des trois axiomes ? | WARP $\subset$ GARP $\subset$ SARP |
| La limite des données finies ? | Hors échantillon, les préférences ne sont **pas fixées** |
| Le contre-exemple du livre ? | $x^1=(1,1)$ à $p^1=(2,1)$ rationalisé par $x_1^2x_2$ **et** par $x_1(x_2+1)$ |
| Que classent-elles différemment ? | $(3,1)$ vs $(1,7)$ — **verdicts opposés** |
| Sont-elles des transformées monotones l'une de l'autre ? | **Non** — c'est précisément le problème |
| L'apport de **Varian (1982)** ? | Un ensemble de $x$ tels que $u(x)>u(y)$ pour **toute** $u$ rationalisante |
| L'apport de **Knoblauch (1992)** ? | Cet ensemble est **complet** — il les contient tous |
| L'état empirique de GARP ? | *« Les données de consommation contiennent **habituellement des violations** »* |
| Sur quoi porte la recherche actuelle ? | Des **critères de tolérance** aux violations mineures et des **algorithmes** de construction |
| Comment tester WARP sur $K$ observations ? | Tableau $K\times K$ des $p^i\cdot x^j$, revenus en **diagonale**, lire **ligne par ligne** |
| À quelle case compare-t-on ? | À la diagonale de la **même ligne**, jamais de la colonne |
